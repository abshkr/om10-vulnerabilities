<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../config/setups.php';
include_once __DIR__ . '/../service/site_service.php';
include_once 'common_class.php';

class TankStrap extends CommonClass
{
    protected $TABLE_NAME = 'STRAPS';
    protected $VIEW_NAME = 'STRAPS';

    public $NUMBER_FIELDS = array(
        "STRAP_HEIGHT",
        "STRAP_VOLUME",
        "STRAP_TANKLEVEL"
    );

    protected $table_view_map = array(
        "STRAP_VOL" => "STRAP_VOLUME",
        "STR_TK_TANKCODE" => "STRAP_TANKCODE",
        "STR_TK_TANKDEPO" => "STRAP_SITECODE",
    );

    //[{"strap_height":"500","strap_volume":"550","strap_tankcode":"T1","strap_tankname":"T1","strap_sitecode":"TGI","strap_sitename":"Shell TanjungGelang","strap_basecode":"400003030","strap_basename":"U95 BASE","strap_baseclass":"2","strap_bsclsname":"Gasolines","strap_tanklevel":"8807"}]
    public function read()
    {
        $query = "
            SELECT STRAP_HEIGHT AS STRAP_HEIGHT,
                STRAP_VOL AS STRAP_VOLUME,
                STR_TK_TANKCODE AS STRAP_TANKCODE,
                TANK_NAME AS STRAP_TANKNAME,
                STR_TK_TANKDEPO AS STRAP_SITECODE,
                TANK_SITENAME AS STRAP_SITENAME,
                TANK_BASE AS STRAP_BASECODE,
                TANK_BASE_NAME AS STRAP_BASENAME,
                TANK_BASE_CLASS AS STRAP_BASECLASS,
                TANK_BCLASS_NAME AS STRAP_BSCLSNAME,
                TANK_PROD_LVL AS STRAP_TANKLEVEL
            FROM STRAPS, GUI_TANKS
            WHERE
                STR_TK_TANKCODE = TANK_CODE
                AND STR_TK_TANKDEPO = TANK_TERMINAL
            ";

        if (isset($this->strap_tankcode)) {
            $query = $query . " AND STR_TK_TANKCODE = :strap_tankcode ";
        }
        if (isset($this->start_height)) {
            $query = $query . " AND STRAP_HEIGHT >= :start_height ";
        }
        if (isset($this->end_height)) {
            $query = $query . " AND STRAP_HEIGHT <= :end_height ";
        }

        $query = $query . " ORDER BY STRAP_TANKCODE, STRAP_SITECODE, STRAP_HEIGHT";
        // write_log($query, __FILE__, __LINE__);
        $stmt = oci_parse($this->conn, $query);
        if (isset($this->strap_tankcode)) {
            oci_bind_by_name($stmt, ':strap_tankcode', $this->strap_tankcode);
        }
        if (isset($this->start_height)) {
            oci_bind_by_name($stmt, ':start_height', $this->start_height);
        }
        if (isset($this->end_height)) {
            oci_bind_by_name($stmt, ':end_height', $this->end_height);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function count_tank_straps()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM STRAPS 
			WHERE 
				STR_TK_TANKCODE = :str_tk_tankcode 
				and STR_TK_TANKDEPO = :str_tk_tankdepo 
       ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':str_tk_tankcode', $this->tank_code);
        oci_bind_by_name($stmt, ':str_tk_tankdepo', $this->tank_terminal);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function pre_create()
    {
        if (!isset($this->strap_sitecode)) {
            $serv = new SiteService($this->conn);
            $this->str_tk_tankdepo = $serv->site_code();
        }
    }

    public function pre_update()
    {
        $this->pre_create();
    }

    public function pre_delete()
    {
        $this->pre_create();
    }

    // public function create()
    // {
    //     $query = "
    //         INSERT INTO STRAPS (
    //             STRAP_HEIGHT,
    //             STRAP_VOL,
    //             STR_TK_TANKCODE,
    //             STR_TK_TANKDEPO )
    //         VALUES (
    //             :strap_height,
    //             :strap_volume,
    //             :strap_tankcode,
    //             :strap_sitecode
    //         )";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':strap_height', $this->strap_height);
    //     oci_bind_by_name($stmt, ':strap_volume', $this->strap_volume);
    //     oci_bind_by_name($stmt, ':strap_tankcode', $this->strap_tankcode);
    //     oci_bind_by_name($stmt, ':strap_sitecode', $this->strap_sitecode);
    //     if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         oci_rollback($this->conn);
    //         return false;
    //     }

    //     $journal = new Journal($this->conn, false);
    //     $curr_psn = Utilities::getCurrPsn();
    //     $jnl_data[0] = $curr_psn;
    //     $jnl_data[1] = "Tank strap";
    //     $jnl_data[2] = $this->strap_tankcode;
    //     $jnl_data[3] = sprintf("height:%d", $this->strap_height);

    //     if (!$journal->jnlLogEvent(
    //         Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         oci_rollback($this->conn);
    //         return false;
    //     }

    //     oci_commit($this->conn);
    //     return true;
    // }

    // public function update()
    // {
    //     $query = "
    //         SELECT STRAP_VOL AS STRAP_VOLUME FROM STRAPS
    //         WHERE STR_TK_TANKCODE = :strap_tankcode AND STRAP_HEIGHT = :strap_height";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':strap_height', $this->strap_height);
    //     oci_bind_by_name($stmt, ':strap_tankcode', $this->strap_tankcode);
    //     if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
    //         $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
    //     } else {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //     }

    //     $query = "
    //         UPDATE STRAPS
    //         SET STRAP_VOL = :strap_volume
    //         WHERE STR_TK_TANKCODE = :strap_tankcode AND STRAP_HEIGHT = :strap_height";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':strap_height', $this->strap_height);
    //     oci_bind_by_name($stmt, ':strap_volume', $this->strap_volume);
    //     oci_bind_by_name($stmt, ':strap_tankcode', $this->strap_tankcode);
    //     if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         oci_rollback($this->conn);
    //         return false;
    //     }

    //     $journal = new Journal($this->conn, false);
    //     $curr_psn = Utilities::getCurrPsn();
    //     $jnl_data[0] = $curr_psn;
    //     $jnl_data[1] = "Tank strap";
    //     $jnl_data[2] = $this->strap_tankcode;

    //     if (!$journal->jnlLogEvent(
    //         Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         oci_rollback($this->conn);
    //         return false;
    //     }

    //     $module = "Tank strap";
    //     $record = sprintf("tank code:%s, height:%d", $this->strap_tankcode, $this->strap_height);
    //     foreach ($this as $key => $value) {
    //         if (isset($row[strtoupper($key)]) && $value != $row[strtoupper($key)] &&
    //             !$journal->valueChange(
    //                 $module, $record, $key, $row[strtoupper($key)], $value)) {
    //             oci_rollback($this->conn);
    //             return false;
    //         }
    //     }

    //     oci_commit($this->conn);
    //     return true;
    // }

    // public function delete()
    // {
    //     $query = "
    //         DELETE FROM STRAPS
    //         WHERE STR_TK_TANKCODE = :strap_tankcode
    //            AND STRAP_HEIGHT = :strap_height ";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':strap_height', $this->strap_height);
    //     oci_bind_by_name($stmt, ':strap_tankcode', $this->strap_tankcode);
    //     if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return false;
    //     }

    //     $journal = new Journal($this->conn, false);
    //     $curr_psn = Utilities::getCurrPsn();
    //     $jnl_data[0] = $curr_psn;
    //     $jnl_data[1] = "Tank strap";
    //     $jnl_data[2] = sprintf("tank code:%s, height:%d", $this->strap_tankcode, $this->strap_height);
    //     $jnl_data[3] = "";

    //     if (!$journal->jnlLogEvent(
    //         Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         oci_rollback($this->conn);
    //         return false;
    //     }

    //     oci_commit($this->conn);
    //     return true;
    // }

    public function batch_import() {
        
    }
}

