<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/site_service.php';
include_once 'common_class.php';

class TerminalGroup extends CommonClass
{
    protected $TABLE_NAME = 'TERMINAL_GROUPS';
    protected $VIEW_NAME = 'GUI_TERMINAL_GROUPS';

    public $BOOLEAN_FIELDS = array(
        "TRMGRP_ACTIVE" => 1,
        "TGL_LINK_ACTIVE" => 1,
    );

    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (!isset($this->terminal_items)) {
            return true;
        }

        $serv = new SiteService($this->conn);
        $site_code = $serv->site_code();
        
        foreach ($this->terminal_items as $value) {
            // write_log(json_encode($value), __FILE__, __LINE__);
            // write_log($site_code, __FILE__, __LINE__);
            $query = "
            INSERT INTO TERMINAL_GROUP_LINKS (
                TGL_GROUP_CODE,
                TGL_TERM_CODE,
                TGL_LINK_ACTIVE
            ) VALUES (
                :group_code,
                :term_code,
                :link_active
            )";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':group_code', $this->trmgrp_code);
            oci_bind_by_name($stmt, ':term_code', $value->tgl_term_code);
            oci_bind_by_name($stmt, ':link_active', $value->tgl_link_active);
            
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
            DELETE FROM TERMINAL_GROUP_LINKS
            WHERE TGL_GROUP_CODE = :group_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':group_code', $this->trmgrp_code);
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
        $query = "
            SELECT * FROM TERMINAL_GROUP_LINKS
            WHERE TGL_GROUP_CODE = :group_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':group_code', $this->trmgrp_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $group_site_items = array();
        while ($site_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $group_site_items[$site_row['TGL_TERM_CODE']] = $site_row;
            // array_push($group_site_items, $base_item);
        }

        // write_log(json_encode($group_site_items), __FILE__, __LINE__);
        return $group_site_items;
    }

    protected function journal_children_change($journal, $old, $new)
    {
        $module = "TERMINAL_GROUP_LINKS";
        foreach ($old as $term_code => $alloc_item) {
            if (!isset($new[$term_code])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("tgl_group_code:%s", $this->trmgrp_code);
                $jnl_data[3] = sprintf("tgl_term_code:%s", $term_code);

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
        foreach ($new as $term_code => $alloc_item) {
            if (!isset($old[$term_code])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("tgl_group_code:%s", $this->trmgrp_code);
                $jnl_data[3] = sprintf("tgl_term_code:%s", $term_code);

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
            SELECT * FROM GUI_TERMINAL_GROUPS ORDER BY TRMGRP_CODE
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

    public function available_terminals()
    {
        if (!isset($this->trmgrp_code)) {
            $this->trmgrp_code = "NoNExIsT";
        }
        $query = "
            SELECT 
                TERMINAL.*
                , TERMINAL.TERM_ADDR || ' [' || NVL(DL.DB_ADDR_TEXT, ' ') || ']'   AS ADDRESS_TEXT
                , TERM_CODE || ' - ' || TERM_NAME   AS TERM_DESC
            FROM 
                TERMINAL
                , (
                    SELECT DB_ADDR_LINE_ID, 
                        NVL(LISTAGG(DB_ADDR_LINE, ', ') WITHIN GROUP (ORDER BY DB_ADDRLINE_NO), ' ') DB_ADDR_TEXT
                    FROM DB_ADDRESS_LINE
                    GROUP BY DB_ADDR_LINE_ID
                ) DL
            WHERE 
                TERM_ADDR = DL.DB_ADDR_LINE_ID(+)
                AND (TERMINAL.TERM_CODE NOT IN (SELECT TGL_TERM_CODE FROM TERMINAL_GROUP_LINKS)
                    OR TERMINAL.TERM_CODE IN (SELECT TGL_TERM_CODE FROM TERMINAL_GROUP_LINKS WHERE TGL_GROUP_CODE = :trmgrp_code))
            ORDER BY TERMINAL.TERM_CODE
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trmgrp_code', $this->trmgrp_code);
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
        $query = "
            SELECT *
            FROM GUI_TERMINAL_GROUP_ITEMS
            WHERE TRMGRP_CODE = :trmgrp_code
            ORDER BY TERM_CODE
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trmgrp_code', $this->trmgrp_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // note: any exec function needs be public
    public function toggle_terminal()
    {
        write_log(sprintf("toggle start %s:%s", $this->trmgrp_code, $this->tgl_term_code ), __FILE__, __LINE__);
        $query = "
            UPDATE TERMINAL_GROUP_LINKS 
            SET TGL_LINK_ACTIVE = 1 - TGL_LINK_ACTIVE
            WHERE TGL_GROUP_CODE = :group_code AND TGL_TERM_CODE = :term_code
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':group_code', $this->trmgrp_code);
        oci_bind_by_name($stmt, ':term_code', $this->tgl_term_code);
        
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            $error = new EchoSchema(400, response("__UPDATE_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return false;
        }
        oci_commit($this->conn);

        $journal = new Journal($this->conn);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "TERMINAL_GROUP_LINKS";
        $jnl_data[2] = sprintf("tgl_group_code:%s, tgl_term_code:%s", $this->trmgrp_code, $this->tgl_term_code);

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $echo = new EchoSchema(200, response("__UPDATE_SUCCEEDED__"));
        echo json_encode($echo, JSON_PRETTY_PRINT);
        return true;
    }
}
