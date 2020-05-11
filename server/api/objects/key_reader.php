<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class KeyReader extends CommonClass
{
    protected $TABLE_NAME = 'KRD_CFG';
    protected $VIEW_NAME = 'KRD_CFG';
    
    protected $table_view_map = array(
        "KRDC_NAME" => "ADV_CODE"
    );
    
    public function read()
    {
        $query = "SELECT DA.DEV_TYPE,
                KCFG.KRDC_TYPE,
                KCFG.KRDC_USE,
                KCFG.KRDC_NAME ADV_CODE,
                DA.AREA_NAME
            FROM KRD_CFG KCFG, 
                (
                    SELECT D.DEV_TYPE,
                        ADV.ADV_CODE,
                        A.AREA_NAME
                    FROM ACCDEV ADV, DEVICES D, AREA_RC A
                    WHERE ADV.ADV_DEVICE = D.DEV_TYPE
                        AND A.AREA_K(+) = ADV.ADV_AREA
                ) DA
            WHERE KCFG.KRDC_NAME = DA.ADV_CODE(+)";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function types()
    {
        $query = "SELECT 0 ID, 'ACCU_TYPE' READER_TYPE FROM DUAL
            UNION SELECT 1 ID, 'BLC_TYPE' READER_TYPE FROM DUAL
            UNION SELECT 2 ID, 'KIKI_TYPE' READER_TYPE FROM DUAL
            UNION SELECT 3 ID, 'CONTREC_TYPE' READER_TYPE FROM DUAL
            UNION SELECT 4 ID, 'SCUP_TYPE' READER_TYPE FROM DUAL
            UNION SELECT 5 ID, 'LAWN_TYPE' READER_TYPE FROM DUAL
            UNION SELECT 6 ID, 'AWAL_TYPE' READER_TYPE FROM DUAL
            UNION SELECT 7 ID, 'UMD_TYPE' READER_TYPE FROM DUAL
            UNION SELECT 8 ID, 'TTLED_TYPE' READER_TYPE FROM DUAL
            UNION SELECT 9 ID, '?' READER_TYPE FROM DUAL
            ";
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
        $query = "SELECT 0 ID, 'LDC_ACCESS' USAGE FROM DUAL
            UNION SELECT 1 ID, 'DOCKET_REQ' USAGE FROM DUAL
            UNION SELECT 2 ID, 'WGH_ACCESS' USAGE FROM DUAL
            UNION SELECT 3 ID, '?' USAGE FROM DUAL
            ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    //selDevCode=TT&op=401&sess_id=rFIEVICISGiV
    public function delete()
    {
        write_log(sprintf("%s::%s() START.", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        
        $op = 401;
        $query_string = "selDevCode=" . rawurlencode(strip_tags($this->adv_code)) . "&op=" . $op;

        $res = Utilities::http_cgi_invoke("cgi-bin/en/access_ctrl/krdcfg.cgi", $query_string);
        // write_log($res, __FILE__, __LINE__);

        $op_response = $op + 10;
        if (strpos($res, "var op=\"" . $op_response . "\"") === false) {
            throw new DatabaseException("load_scheds CGI error");
        }

        $journal = new Journal($this->conn, true);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->VIEW_NAME;
        $jnl_data[2] = sprintf("krdc_name:%s", $this->adv_code);

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_DELETE, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }
    
    //op=202&selDevCode=ADD&selDevType=0&selDevUse=0&sess_id=rFIEVICISGiV SCRIPT_NAME: /cgi-bin/en/access_ctrl/krdcfg.cgi
    public function create()
    {
        write_log(sprintf("%s::%s() START.", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        
        $op = 202;
        $query_string = "selDevCode=" . rawurlencode(strip_tags($this->adv_code)) . 
            "&selDevType=" . rawurlencode(strip_tags($this->krdc_type)) . 
            "&selDevUse=" . rawurlencode(strip_tags($this->krdc_use)) . 
            "&op=" . $op;

        $res = Utilities::http_cgi_invoke("cgi-bin/en/access_ctrl/krdcfg.cgi", $query_string);
        // write_log($res, __FILE__, __LINE__);

        $op_response = $op + 10;
        if (strpos($res, "var op=\"" . $op_response . "\"") === false) {
            throw new DatabaseException("load_scheds CGI error");
        }

        $journal = new Journal($this->conn, true);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->VIEW_NAME;
        $jnl_data[2] = sprintf("krdc_name:%s", $this->adv_code);

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ADD, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }
}