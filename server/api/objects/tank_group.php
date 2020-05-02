<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/site_service.php';
include_once 'common_class.php';

class TankGroup extends CommonClass
{
    protected $TABLE_NAME = 'TGROUP';
    protected $VIEW_NAME = 'TGROUP';

    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (!isset($this->tank_items)) {
            return true;
        }

        $serv = new SiteService($this->conn);
        $site_code = $serv->site_code();
        
        foreach ($this->tank_items as $value) {
            // write_log(json_encode($value), __FILE__, __LINE__);
            // write_log($site_code, __FILE__, __LINE__);
            $query = "INSERT INTO TGRLINK (
                TGR_GRLK,
                TGR_NTK,
                TGR_TKLK_TANKCODE,
                TGR_TKLK_TANKDEPO)
            VALUES (
                :tgr_grlk,
                0,
                :tgr_tklk_tankcode,
                :site_code
            )";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':tgr_grlk', $this->tgr_name);
            oci_bind_by_name($stmt, ':tgr_tklk_tankcode', $value->tgr_tankcode);
            oci_bind_by_name($stmt, ':site_code', $site_code);
            
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        return true;
    }

    protected function delete_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "
            DELETE FROM TGRLINK
            WHERE TGR_GRLK = :tgr_grlk";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tgr_grlk', $this->tgr_name);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        return true;
    }

    protected function retrieve_children_data()
    {
        $query = "SELECT * FROM TGRLINK
            WHERE TGR_GRLK = :tgr_grlk";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tgr_grlk', $this->tgr_name);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $tank_max_flows = array();
        while ($flow_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $tank_max_flows[$flow_row['TGR_TKLK_TANKCODE']] = $flow_row;
            // array_push($tank_max_flows, $base_item);
        }

        // write_log(json_encode($tank_max_flows), __FILE__, __LINE__);
        return $tank_max_flows;
    }

    protected function journal_children_change($journal, $old, $new)
    {
        $module = "tank group";
        foreach ($old as $tank_code => $alloc_item) {
            if (!isset($new[$tank_code])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("tank group:%s", $this->tgr_name);
                $jnl_data[3] = sprintf("tank code:%s", $tank_code);

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
        foreach ($new as $tank_code => $alloc_item) {
            if (!isset($old[$tank_code])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("tank group:%s", $this->tgr_name);
                $jnl_data[3] = sprintf("tank code:%s", $tank_code);

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

    public function read()
    {
        $query = "
            SELECT * FROM GUI_TANK_GROUP ORDER BY TGR_NAME";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function tank_items()
    {
        $query = "SELECT
                TANKS.TANK_CODE AS TANK_CODE,
                BASE_PRODS.BASE_CODE AS TANK_BASECODE,
                BASE_PRODS.BASE_NAME AS TANK_BASENAME
            FROM TANKS, BASE_PRODS
            WHERE BASE_PRODS.BASE_CODE = TANKS.TANK_BASE
                AND (TANKS.TANK_CODE, TANKS.TANK_TERMINAL) NOT IN (SELECT TGR_TKLK_TANKCODE, TGRLINK.TGR_TKLK_TANKDEPO FROM TGRLINK)
            ORDER BY TANKS.TANK_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
