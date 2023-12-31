<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/company_service.php';
include_once __DIR__ . '/../service/site_service.php';
include_once 'common_class.php';

//Old php: amfphp LogicalPrinterService
class LogicalPrinter extends CommonClass
{
    public $desc = "logical printer";

    protected $VIEW_NAME = "PRNTR_CMPY_USAGE";
    protected $TABLE_NAME = "PRNTR_CMPY_USAGE";

    protected $primary_keys = array(    
        "cmpy",
        "usage",
        "prntr"
    );

    protected $table_view_map = array(
        "CMPY" => "PRT_CMPY",
        "USAGE" => "PRT_USAGE",
        "PRNTR" => "PRT_PRINTER"
    );

    public function companys()
    {
        $site_service = new SiteService($this->conn);
        if ($site_service->site_carrier_printer()) {
            $query .= "
                SELECT 'ANY' CMPY_CODE, 'ALL' CMPY_NAME FROM DUAL UNION
                SELECT CMPY_CODE, CMPY_NAME
                FROM GUI_COMPANYS
                WHERE BITAND(CMPY_TYPE, POWER(2, 1)) != 0 OR BITAND(CMPY_TYPE, POWER(2, 2)) != 0
                ORDER BY CMPY_NAME ASC";
            // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
            $stmt = oci_parse($this->conn, $query);
            if (oci_execute($stmt, $this->commit_mode)) {
                return $stmt;
            } else {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return null;
            }
            
        } else {
            $company_service = new CompanyService($this->conn);
            return $company_service->suppliers($plus_any = true);
        }
    }

    public function printers()
    {
        $query = "
            SELECT PRNTR, SYS_PRNTR,
                PRNTR || ' - ' || SYS_PRNTR PRNTR_DESC
            FROM PRINTER
            ORDER BY PRNTR";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function usages()
    {
        $query = "
            SELECT PRINT_USE.*,
                USE_ID || ' - ' || USE_NAME USE_DESC
            FROM PRINT_USE
            ORDER BY USE_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // read personnel
    public function read()
    {
        $query = "
            SELECT
                DECODE(PCU.CMPY, NULL, 'ANY', PCU.CMPY) AS PRT_CMPY,
                DECODE(CMP.CMPY_NAME, NULL, 'ALL', CMP.CMPY_NAME) AS PRT_CMPY_NAME,
                PCU.USAGE AS PRT_USAGE,
                B.MESSAGE AS PRT_USAGE_NAME,
                PCU.PRNTR AS PRT_PRINTER,
                P.SYS_PRNTR AS SYS_PRINTER,
                P.PRNTR_AREA AS PRT_AREA,
                AR.AREA_NAME AS AREA_NAME
            FROM
                PRNTR_CMPY_USAGE PCU,
                COMPANYS CMP,
                ENUMITEM A,
                MSG_LOOKUP B,
                PRINTER P,
                AREA_RC AR
            WHERE
                ((SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N' AND PCU.CMPY = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
                    OR SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
                    OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
                    OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL
                )
                AND CMP.CMPY_CODE (+)  = PCU.CMPY
                AND B.MSG_ID = A.ENUM_TMM
                AND ( B.LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND B.LANG_ID = 'ENG') )
                AND A.ENUM_NO = PCU.USAGE
                AND A.ENUMTYPENAME = 'PRN_USE'
                AND P.PRNTR = PCU.PRNTR
                AND P.PRNTR_AREA = AR.AREA_K(+)
            ORDER BY PCU.CMPY, PCU.USAGE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }


    public function check_logical_printer()
    {
        /*
            data from frontend form
            {
                "prt_cmpy": "ANY",
                "prt_usage": "0",
                "prt_printer": "P01"
            }        
        */
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM PRNTR_CMPY_USAGE
            WHERE 
                CMPY = :prt_cmpy
                AND USAGE = :prt_usage
                AND PRNTR = :prt_printer
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prt_cmpy', $this->prt_cmpy);
        oci_bind_by_name($stmt, ':prt_usage', $this->prt_usage);
        oci_bind_by_name($stmt, ':prt_printer', $this->prt_printer);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function update()
    {
        write_log(sprintf("%s::%s() START, class:%s, method:%s",
            __CLASS__, __FUNCTION__, $class, $method),
            __FILE__, __LINE__);
        /*
            {
                "prt_cmpy": "ANY",
                "prt_usage": "0",
                "prt_new": "P02",
                "prt_printer": "P01"
            }        
        */
        //Old data
        $row = array();
        $row["CMPY"] = $this->prt_cmpy;
        $row["USAGE"] = $this->prt_usage;
        $row["PRNTR"] = $this->prt_printer;
        /* $query = "
            SELECT * FROM PRNTR_CMPY_USAGE
            WHERE CMPY = :prt_cmpy AND USAGE = :prt_usage AND PRNTR = :prt_printer
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prt_cmpy', $this->prt_cmpy);
        oci_bind_by_name($stmt, ':prt_usage', $this->prt_usage);
        oci_bind_by_name($stmt, ':prt_printer', $this->prt_printer);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        } */


        $query = "
            UPDATE PRNTR_CMPY_USAGE 
            SET PRNTR = :prt_new
            WHERE CMPY = :prt_cmpy AND USAGE = :prt_usage AND PRNTR = :prt_printer
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prt_cmpy', $this->prt_cmpy);
        oci_bind_by_name($stmt, ':prt_usage', $this->prt_usage);
        oci_bind_by_name($stmt, ':prt_new', $this->prt_new);
        oci_bind_by_name($stmt, ':prt_printer', $this->prt_printer);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }


        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "PRNTR_CMPY_USAGE";
        $jnl_data[2] = sprintf("cmpy:%s, usage:%d, prntr:%s", $this->prt_cmpy, $this->prt_usage, $this->prt_printer);
        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        //New data
        $row2 = array();
        $row2["CMPY"] = $this->prt_cmpy;
        $row2["USAGE"] = $this->prt_usage;
        $row2["PRNTR"] = $this->prt_new;
        /* $query = "
            SELECT * FROM PRNTR_CMPY_USAGE
            WHERE CMPY = :prt_cmpy AND USAGE = :prt_usage AND PRNTR = :prt_new
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prt_cmpy', $this->prt_cmpy);
        oci_bind_by_name($stmt, ':prt_usage', $this->prt_usage);
        oci_bind_by_name($stmt, ':prt_new', $this->prt_new);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row2 = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        } */

        $module = "PRNTR_CMPY_USAGE";
        $record = sprintf("cmpy:%s, usage:%d, prntr:%s", $this->prt_cmpy, $this->prt_usage, $this->prt_printer);
        // write_log(json_encode($row), __FILE__, __LINE__, LogLevel::ERROR);
        // write_log(json_encode($row2), __FILE__, __LINE__, LogLevel::ERROR);
        if (!$journal->updateChanges($row, $row2, $module, $record)) {
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

}
