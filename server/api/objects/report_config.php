<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/company_service.php';
include_once __DIR__ . '/../service/site_service.php';
include_once 'common_class.php';

class ReportConfig extends CommonClass
{
    protected $TABLE_NAME = 'REPORT_CMPY';
    protected $VIEW_NAME = 'GUI_REPORT_COMPANY';
    public $desc = "report configuration";
    protected $primary_keys = array("rpt_cmpy", "rpt_file");
    protected $view_keys = array("report_cmpycode", "report_file");
    protected $table_view_map = array(
        "RPT_CMPY" => "REPORT_CMPYCODE",
        "RPT_FILE" => "REPORT_FILE",
        "RPT_ENABLED" => "REPORT_ENABLED",
        "RPT_ACTIVE" => "REPORT_ACTIVE",
        "RPT_CANPRINT" => "REPORT_CANPRINT",
        "RPT_CANEMAIL" => "REPORT_CANEMAIL",
        "RPT_EMAIL" => "REPORT_CMPYEMAIL",
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "REPORT_CLOSEOUT_FLAG2" => 1,
        "REPORT_ONDEMAND_FLAG" => 1,
        "REPORT_CLOSEOUT_FLAG" => 1,
        "REPORT_ENABLED" => "Y",
        "REPORT_ACTIVE" => "Y",
        "REPORT_CANPRINT" => "Y",
        "REPORT_CANEMAIL" => "Y",
        "JOB_ENABLED" => 'Y',
    );
    
    //This is because we need to keep Job ID
    protected $del_n_ins_children = false;

    public function read()
    {
        $query = "
            SELECT * FROM " . $this->VIEW_NAME . " ORDER BY REPORT_CMPYCODE, REPORT_FILE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function copmanys()
    {
        $query = "
            SELECT CMPY_CODE, CMPY_NAME
            FROM COMPANYS
            ORDER BY DECODE(CMPY_CODE, 'ANY', 0, 1), CMPY_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function reports()
    {
        $query = "
            SELECT * FROM GUI_REPORT_PROFILE ORDER BY REPORT_NAME";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_decorate(&$result_array)
    {
        $serv = new SiteService($this->conn);
        $reports_closeout_job = $serv->reports_closeout_job();

        foreach ($result_array as $key => $value) {
            if ($reports_closeout_job) {
                $query = "SELECT COUNT(*) CN
                    FROM REPORT_CLOSEOUT_JOB WHERE RPT_FILE = :rpt_file AND JOB_OWNER = :rpt_cmpy";
                $stmt = oci_parse($this->conn, $query);
                // oci_bind_by_name($stmt, ':default', $default);
                oci_bind_by_name($stmt, ':rpt_file', $value['report_file']);
                oci_bind_by_name($stmt, ':rpt_cmpy', $value['report_cmpycode']);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                }

                $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
                $result_array[$key]['closeout_jobs'] = intval($row['CN']) > 0;
            }
        }
    }

    public function closeout_jobs()
    {
        $query = "SELECT * FROM REPORT_CLOSEOUT_JOB WHERE RPT_FILE = :rpt_file AND JOB_OWNER = :rpt_cmpy ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':rpt_file', $this->rpt_file);
        oci_bind_by_name($stmt, ':rpt_cmpy', $this->rpt_cmpy);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function retrieve_children_data()
    {
        $query = "SELECT * FROM REPORT_CLOSEOUT_JOB WHERE RPT_FILE = :rpt_file AND JOB_OWNER = :rpt_cmpy ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':rpt_file', $this->report_file);
        oci_bind_by_name($stmt, ':rpt_cmpy', $this->report_cmpycode);

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $gates_data = array();
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $gates_data[$row['JOB_ID']] = $row;
        }

        return $gates_data;
    }

    protected function journal_children_change($journal, $old, $new)
    {
        $serv = new SiteService($this->conn);
        if (!$serv->reports_closeout_job()) {
            return true;
        }
        
        $module = "REPORT_CLOSEOUT_JOB";
        foreach ($old as $item_key => $item_array) {
            
            if (isset($new[$item_key])) {
                foreach ($item_array as $field => $value) {
                    if ($field == 'JOB_MODIFIED') {
                        continue;
                    }

                    if ($new[$item_key][$field] != $value) {
                        $record = sprintf("rpt_file:%s, job_owner:%s, job_id:%s", $this->rpt_file, $this->rpt_cmpy, $item_key);
                        $journal->valueChange($module, $record, $field, $value, $new[$item_key][$field]);
                    }
                }
            } 

            if (!isset($new[$item_key])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("rpt_file:%s, job_owner:%s", $this->rpt_file, $this->rpt_cmpy);
                $jnl_data[3] = sprintf("job_id:%s", $item_key);
                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'],
                        __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        //In new but not in old.
        foreach ($new as $item_key => $alloc_item) {
            if (!isset($old[$item_key])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("rpt_file:%s, job_owner:%s", $this->rpt_file, $this->rpt_cmpy);
                $jnl_data[3] = sprintf("job_id:%s", $item_key);
                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'],
                        __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }
    }

    protected function update_children($old_children = null)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $serv = new SiteService($this->conn);
        if (!$serv->reports_closeout_job()) {
            write_log("Do not continue because REPORTS_CLOSEOUT_JOB flag is off", __FILE__, __LINE__);
            return true;
        }
        
        foreach ($old_children as $job_id => $item_array) {
            $still_exist = false;
            foreach ($this->jobs as $item) {
                if ($item->job_id == $job_id) {
                    $query = "UPDATE REPORT_CLOSEOUT_JOB
                        SET JOB_NAME = :job_name,
                            JOB_ENABLED = :job_enabled,
                            JOB_MODIFIED = SYSDATE,
                            RECURRENCE = :recurrence,
                            OUTPUT_FORMAT = :output_format,
                            EMAIL_RECEIVERS = :email_receivers,
                            EMAIL_SUBJECT = :email_subject,
                            PARAM1 = :param1,
                            PARAM2 = :param2,
                            PARAM3 = :param3,
                            PARAM4 = :param4,
                            PARAM5 = :param5,
                            PARAM6 = :param6,
                            PARAM7 = :param7,
                            PARAM8 = :param8,
                            PARAM9 = :param9,
                            PARAM10 = :param10
                        WHERE JOB_ID = :job_id";
                    $stmt = oci_parse($this->conn, $query);
                    oci_bind_by_name($stmt, ':job_id', $item->job_id);
                    oci_bind_by_name($stmt, ':job_name', $item->job_name);
                    oci_bind_by_name($stmt, ':job_enabled', $item->job_enabled);
                    oci_bind_by_name($stmt, ':recurrence', $item->recurrence);
                    oci_bind_by_name($stmt, ':output_format', $item->output_format);
                    oci_bind_by_name($stmt, ':email_receivers', $item->email_receivers);
                    oci_bind_by_name($stmt, ':email_subject', $item->email_subject);
                    oci_bind_by_name($stmt, ':param1', $item->param1);
                    oci_bind_by_name($stmt, ':param2', $item->param2);
                    oci_bind_by_name($stmt, ':param3', $item->param3);
                    oci_bind_by_name($stmt, ':param4', $item->param4);
                    oci_bind_by_name($stmt, ':param5', $item->param5);
                    oci_bind_by_name($stmt, ':param6', $item->param6);
                    oci_bind_by_name($stmt, ':param7', $item->param7);
                    oci_bind_by_name($stmt, ':param8', $item->param8);
                    oci_bind_by_name($stmt, ':param9', $item->param9);
                    oci_bind_by_name($stmt, ':param10', $item->param10);
               
                    if (!oci_execute($stmt, $this->commit_mode)) {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                        return false;
                    }
                    $still_exist = true;
                    break;
                }
            }
            
            if ($still_exist == false) {
                $query = "DELETE FROM REPORT_CLOSEOUT_JOB 
                    WHERE JOB_ID = :job_id";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':job_id', $job_id);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }
            }
        }

        //In new but not in old.
        $owner = Utilities::getCurrPsn();
        foreach ($this->jobs as $item) {
            if (isset($old_children[$item->job_id])) {
                continue;
            }

            $query = "INSERT INTO REPORT_CLOSEOUT_JOB (
                RPT_FILE,
                JOB_NAME,
                JOB_ENABLED,
                JOB_OWNER,
                JOB_CREATED,
                JOB_MODIFIED,
                RECURRENCE,
                OUTPUT_FORMAT,
                EMAIL_RECEIVERS,
                EMAIL_SUBJECT,
                PARAM1,
                PARAM2, 
                PARAM3,
                PARAM4,
                PARAM5,
                PARAM6,
                PARAM7,
                PARAM8,
                PARAM9,
                PARAM10
                )
            VALUES (
                :rpt_file,
                :job_name,
                :job_enabled,
                :job_owner,
                SYSDATE,
                SYSDATE,
                :recurrence,
                :output_format,
                :email_receivers,
                :email_subject,
                :param1,
                :param2,
                :param3,
                :param4,
                :param5,
                :param6,
                :param7,
                :param8,
                :param9,
                :param10
            )";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':rpt_file', $this->report_file);
            oci_bind_by_name($stmt, ':job_name', $item->job_name);
            oci_bind_by_name($stmt, ':job_enabled', $item->job_enabled);
//            oci_bind_by_name($stmt, ':job_owner', $owner);
            oci_bind_by_name($stmt, ':job_owner', $this->report_cmpycode);
            oci_bind_by_name($stmt, ':recurrence', $item->recurrence);
            oci_bind_by_name($stmt, ':output_format', $item->output_format);
            oci_bind_by_name($stmt, ':email_receivers', $item->email_receivers);
            oci_bind_by_name($stmt, ':email_subject', $item->email_subject);
            oci_bind_by_name($stmt, ':param1', $item->param1);
            oci_bind_by_name($stmt, ':param2', $item->param2);
            oci_bind_by_name($stmt, ':param3', $item->param3);
            oci_bind_by_name($stmt, ':param4', $item->param4);
            oci_bind_by_name($stmt, ':param5', $item->param5);
            oci_bind_by_name($stmt, ':param6', $item->param6);
            oci_bind_by_name($stmt, ':param7', $item->param7);
            oci_bind_by_name($stmt, ':param8', $item->param8);
            oci_bind_by_name($stmt, ':param9', $item->param9);
            oci_bind_by_name($stmt, ':param10', $item->param10);
            
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        return true;
    }
}
