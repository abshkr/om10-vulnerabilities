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

    public $BOOLEAN_FIELDS = array(
        "TANK_ACTIVE" => 1,
    );

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
                :tgr_ntk,
                :tgr_tklk_tankcode,
                :site_code
            )";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':tgr_grlk', $this->tgr_name);
            oci_bind_by_name($stmt, ':tgr_ntk', $value->tgr_ntk);
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

    public function available_tanks()
    {
        if (!isset($this->tgr_name)) {
            $this->tgr_name = "NoNExIsT";
        }
        $query = "SELECT
                TANKS.TANK_CODE AS TANK_CODE,
                BASE_PRODS.BASE_CODE AS TANK_BASECODE,
                BASE_PRODS.BASE_NAME AS TANK_BASENAME
            FROM TANKS, BASE_PRODS
            WHERE BASE_PRODS.BASE_CODE = TANKS.TANK_BASE
                AND ((TANKS.TANK_CODE, TANKS.TANK_TERMINAL) NOT IN (SELECT TGR_TKLK_TANKCODE, TGRLINK.TGR_TKLK_TANKDEPO FROM TGRLINK)
                    OR (TANKS.TANK_CODE, TANKS.TANK_TERMINAL) IN 
                    (SELECT TGR_TKLK_TANKCODE, TGRLINK.TGR_TKLK_TANKDEPO FROM TGRLINK WHERE TGR_GRLK = :tgr_name))
            ORDER BY TANKS.TANK_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tgr_name', $this->tgr_name);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function group_items()
    {
        $query = "SELECT TANK_CODE, 
                TANK_BASECODE, 
                TANK_BASENAME, 
                TANK_ACTIVE, 
                TANK_GROUP, 
                TANK_SITECODE, 
                TANK_SITENAME
            FROM GUI_TANK_GROUP_ITEMS
            WHERE TANK_GROUP = :tank_group
            ORDER BY TANK_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_group', $this->tgr_name);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    //SCRIPT_NAME: /cgi-bin/en/stck_mgmt/tank_grp.cgi
    //sess_id=LcLcWNVvmPxe&tk=SP-16&tkgrp=W&tkActive=SP-16&tkOldActive=SP-16&op=14
    public function activate_tank()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        //Cannot have this because when there is no active tank, old and new tank is the same
        //frontend already take care of only allowing activate a differnt tank 
        // if ($this->tgr_tankcode == $this->old_active) {
        //     write_log(sprintf("new:%s, old:%s", $this->tgr_tankcode, $this->old_active), LogLevel::ERROR);
        //     $echo = new EchoSchema(400, response("__ALREADY_ACTIVATED_TANK__", null, array($this->tgr_tankcode)));
        //     echo json_encode($echo, JSON_PRETTY_PRINT);
        //     return;
        // }

        $query_string = "tk=" . rawurlencode(strip_tags($this->tgr_tankcode)) . 
            "&tkgrp=" . rawurlencode(strip_tags($this->tgr_name)) .
            "&tkActive=" . rawurlencode(strip_tags($this->tgr_tankcode)) .
            "&tkOldActive=" . rawurlencode(strip_tags($this->old_active)) .
            "&op=14";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/stck_mgmt/tank_grp.cgi", $query_string);
        // write_log($res, __FILE__, __LINE__, LogLevel::ERROR);
        if (strpos($res, "Failed") === false) {
            $journal = new Journal($this->conn, true);
            $jnl_data[0] = $this->tgr_tankcode;
            $jnl_data[1] = $this->tgr_name;
            if (!$journal->jnlLogEvent(
                Lookup::TMM_TANK_IS_ACTIVE, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            }

            $echo = new EchoSchema(200, response("__ACTIVATE_TANK__", null, array($this->tgr_tankcode)));
            echo json_encode($echo, JSON_PRETTY_PRINT);
            return;
        }
    
        // write_log(sprintf("CGI returns %s", $res), __FILE__, __LINE__, LogLevel::ERROR);
        $error = new EchoSchema(400, response("__CGI_FAILED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }
}
