<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once __DIR__ . '/../service/company_service.php';
include_once __DIR__ . '/../service/site_service.php';
include_once 'common_class.php';

class ReportProfile extends CommonClass
{
    // public $check_exists = false; //Do not check existence when creating

    protected $TABLE_NAME = 'REPORT_FILES';
    protected $VIEW_NAME = 'GUI_REPORT_PROFILE';
    public $desc = "report profile";
    protected $primary_keys = array("rpt_file");
    protected $view_keys = array("report_file");
    protected $table_view_map = array(
        "RPT_NAME" => "REPORT_NAME",
        "RPT_FILE" => "REPORT_FILE",
        "FREQUENCY" => "REPORT_TYPE",
        "DESCRIPTION" => "REPORT_DESC",
        "JASPER_FILE" => "REPORT_JASPER_FILE",
        "ONDEMAND_TITLE" => "REPORT_ONDEMAND_TITLE",
        "IS_CLOSEOUT_REPORT" => "REPORT_CLOSEOUT_FLAG2",
        "LANG_ID" => "REPORT_LANG",
    );
    public $NUMBER_FIELDS = array(
        "REPORT_ONDEMAND_FLAG",
        "REPORT_CLOSEOUT_FLAG",
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "REPORT_CLOSEOUT_FLAG2" => 1,
        "REPORT_ONDEMAND_FLAG" => 1,
        "REPORT_CLOSEOUT_FLAG" => 1,
        "REPORT_ADDITIVE_FLAG" => 1,
        "JOB_ENABLED" => 'Y'
    );
    
    //This is because we need to keep Job ID
    protected $del_n_ins_children = false;

    public function read()
    {
        $query = "
            SELECT * FROM " . $this->VIEW_NAME . " ORDER BY REPORT_NAME";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function report_profile_types()
    {
        $serv = new EnumService($this->conn);
        return $serv->report_profile_types();
    }

    public function jasper_files()
    {
        $result = array();
        $result["records"] = array();

        $dir = $_SERVER['OMEGA_HOME'] . '/bin/jasper';
        $files = scandir($dir);

        $jasper_files = array();
        $num = 0;
        foreach ($files as $name) {
            if (!(substr($name, -7) === '.jasper')) {
                continue;
            }
            $num += 1;
            array_push($result["records"], $name);
        }

        http_response_code(200);
        if ($num > 0) {
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $result["message"] = "No record found.";
            echo json_encode($result, JSON_PRETTY_PRINT);
        }
    }

    public function read_decorate(&$result_array)
    {
        $dir = $_SERVER['OMEGA_HOME'] . '/bin/jasper';
        $files = scandir($dir);

        $jasper_files = array();
        foreach ($files as $name) {
            if (strpos($name, '.jasper') === false) {
                continue;
            }
            $jasper_files[] = $name;
        }

        foreach ($result_array as $key => $value) {
            // write_log($value['report_file'], __FILE__, __LINE__);
            if (in_array($value['report_jasper_file'], $jasper_files)) {
                $result_array[$key]['source_exists'] = true;
            } else {
                $result_array[$key]['source_exists'] = false;
            }
        }
    }

    protected function post_create()
    {
        return $this->post_update();
    }

    public function pre_update()
    {
        if (!isset($this->report_ondemand_title) && isset($this->report_name)) {
            $this->ondemand_title = $this->report_name;
        }
    }

    public function post_update()
    {
        $ondemand_flag = 0;
        if (isset($this->report_ondemand_flag) && $this->report_ondemand_flag == 1) {
            $ondemand_flag |= 1;
        }

        if (isset($this->report_closeout_flag) && $this->report_closeout_flag == 1) {
            $ondemand_flag |= 1 << 1;
        }

        $query = "
            UPDATE " . $this->TABLE_NAME . " SET ONDEMAND_FLAG = :ondemand_flag
            WHERE RPT_FILE = :rpt_file";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ondemand_flag', $ondemand_flag);
        oci_bind_by_name($stmt, ':rpt_file', $this->rpt_file);
        if (oci_execute($stmt, $this->commit_mode)) {
            return true;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }
    }

    public function pre_create()
    {
        if (!isset($this->rpt_file)) {
            $this->rpt_file = substr($this->report_jasper_file, 0, -7) . '_' . $this->report_type . ".jrxml";
        }
        if (!isset($this->lang_id)) {
            $this->lang_id = 'ENG';
        }

        if (!isset($this->ondemand_title)) {
            $this->ondemand_title = $this->report_name;
        }
    }

    public function closeout_jobs()
    {
        $query = "SELECT * FROM REPORT_CLOSEOUT_JOB WHERE RPT_FILE = :rpt_file";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':rpt_file', $this->rpt_file);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function suppliers()
    {
        $company_service = new CompanyService($this->conn);
        return $company_service->suppliers($plus_any = true);
    }

    // protected function delete_children()
    // {
    //     write_log(sprintf("%s::%s() START, report_file:%s", __CLASS__, __FUNCTION__, $this->report_file),
    //         __FILE__, __LINE__);

    //     $serv = new SiteService($this->conn);
    //     if (!$serv->reports_closeout_job()) {
    //         write_log("Do not continue because REPORTS_CLOSEOUT_JOB flag is off", __FILE__, __LINE__);
    //         return true;
    //     }

    //     $query = "
    //         DELETE FROM REPORT_CLOSEOUT_JOB
    //         WHERE RPT_FILE = :rpt_file";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':rpt_file', $this->report_file);
    //     if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         oci_rollback($this->conn);

    //         throw new DatabaseException($e['message']);
    //         return false;
    //     }

    //     return true;
    // }

    // protected function insert_children()
    // {
    //     write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
    //         __FILE__, __LINE__);

    //     $serv = new SiteService($this->conn);
    //     if (!$serv->reports_closeout_job()) {
    //         write_log("Do not continue because REPORTS_CLOSEOUT_JOB flag is off", __FILE__, __LINE__);
    //         return true;
    //     }

    //     $owner = Utilities::getCurrPsn();
    //     if (isset($this->jobs)) {
    //         foreach ($this->jobs as $value) {
    //             $query = "INSERT INTO REPORT_CLOSEOUT_JOB (
    //                 RPT_FILE,
    //                 JOB_NAME,
    //                 JOB_ENABLED,
    //                 JOB_OWNER,
    //                 JOB_CREATED,
    //                 JOB_MODIFIED,
    //                 RECURRENCE,
    //                 OUTPUT_FORMAT,
    //                 EMAIL_RECEIVERS,
    //                 EMAIL_SUBJECT,
    //                 JOB_LASTRUN,
    //                 PARAM1,
    //                 PARAM2, 
    //                 PARAM3,
    //                 PARAM4,
    //                 PARAM5,
    //                 PARAM6
    //                 )
    //             VALUES (
    //                 :rpt_file,
    //                 :job_name,
    //                 :job_enabled,
    //                 :job_owner,
    //                 :job_created,
    //                 SYSDATE,
    //                 :recurrence,
    //                 :output_format,
    //                 :email_receivers,
    //                 :email_subject,
    //                 :job_lastrun,
    //                 :param1,
    //                 :param2,
    //                 :param3,
    //                 :param4,
    //                 :param5,
    //                 :param6
    //             )";
    //             $stmt = oci_parse($this->conn, $query);
    //             oci_bind_by_name($stmt, ':rpt_file', $this->report_file);
    //             oci_bind_by_name($stmt, ':job_name', $value->job_name);
    //             oci_bind_by_name($stmt, ':job_enabled', $value->job_enabled);
    //             oci_bind_by_name($stmt, ':job_owner', $owner);
    //             oci_bind_by_name($stmt, ':job_created', $value->job_created);
    //             oci_bind_by_name($stmt, ':job_lastrun', $value->job_lastrun);
    //             oci_bind_by_name($stmt, ':recurrence', $value->recurrence);
    //             oci_bind_by_name($stmt, ':output_format', $value->output_format);
    //             oci_bind_by_name($stmt, ':email_receivers', $value->email_receivers);
    //             oci_bind_by_name($stmt, ':email_subject', $value->email_subject);
    //             oci_bind_by_name($stmt, ':param1', $value->param1);
    //             oci_bind_by_name($stmt, ':param2', $value->param2);
    //             oci_bind_by_name($stmt, ':param3', $value->param3);
    //             oci_bind_by_name($stmt, ':param4', $value->param4);
    //             oci_bind_by_name($stmt, ':param5', $value->param5);
    //             oci_bind_by_name($stmt, ':param6', $value->param6);

    //             if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
    //                 $e = oci_error($stmt);
    //                 write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //                 throw new DatabaseException($e['message']);
    //                 return false;
    //             }
    //         }
    //     }

    //     return true;
    // }

    protected function retrieve_children_data()
    {
        $query = "SELECT * FROM REPORT_CLOSEOUT_JOB WHERE RPT_FILE = :rpt_file";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':rpt_file', $this->report_file);

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $gates_data = array();
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $gates_data[$row['JOB_ID']] = $row;
        }

        // write_log(json_encode($tank_max_flows), __FILE__, __LINE__);
        return $gates_data;
    }

    protected function journal_children_change($journal, $old, $new)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        
        $module = "report closeout jobs";
        foreach ($old as $item_key => $item_array) {
            
            if (isset($new[$item_key])) {
                foreach ($item_array as $field => $value) {
                    if ($field == 'JOB_MODIFIED') {
                        continue;
                    }

                    if ($new[$item_key][$field] != $value) {
                        $record = sprintf("report:%s, job id:%s", $this->rpt_file, $item_key);
                        $journal->valueChange($module, $record, $field, $value, $new[$item_key][$field]);
                    }
                }
            } 

            if (!isset($new[$item_key])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("area:%s", $this->area_k);
                $jnl_data[3] = sprintf("gate:%s", $item_key);
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
                $jnl_data[2] = sprintf("area:%s", $this->area_k);
                $jnl_data[3] = sprintf("gate:%s", $item_key);
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
                            PARAM6 = :param6
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
                PARAM6
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
                :param6
            )";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':rpt_file', $this->report_file);
            oci_bind_by_name($stmt, ':job_name', $item->job_name);
            oci_bind_by_name($stmt, ':job_enabled', $item->job_enabled);
            oci_bind_by_name($stmt, ':job_owner', $owner);
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
            
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        return true;
    }

}
