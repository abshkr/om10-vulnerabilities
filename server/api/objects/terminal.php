<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class Terminal extends CommonClass
{
    protected $TABLE_NAME = 'TERMINAL';

    public function read()
    {
        $query = "SELECT TERMINAL.*, TERMINAL.TERM_ADDR || ' [' || NVL(DL.DB_ADDR_TEXT, ' ') || ']' ADDRESS_TEXT,
                TERM_CODE || ' - ' || TERM_NAME TERM_DESC
            FROM TERMINAL,
            (
                SELECT DB_ADDR_LINE_ID, 
                    NVL(LISTAGG(DB_ADDR_LINE, ', ') WITHIN GROUP (ORDER BY DB_ADDRLINE_NO), ' ') DB_ADDR_TEXT
                FROM DB_ADDRESS_LINE
                GROUP BY DB_ADDR_LINE_ID
            ) DL
            WHERE TERM_ADDR = DL.DB_ADDR_LINE_ID(+)
            ORDER BY TERM_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_brief()
    {
        $query = "
            SELECT TERM_CODE, TERM_NAME, TERM_CODE||' - '||TERM_NAME AS TERM_DESC
            FROM TERMINAL ORDER BY TERM_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function pre_delete()
    {
        // need delete the child records in TERMINAL_GROUP_LINKS
        $query = "DELETE FROM TERMINAL_GROUP_LINKS WHERE TGL_TERM_CODE = :term_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':term_code', $this->term_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }
}
