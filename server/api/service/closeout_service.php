<?php

include_once __DIR__ . '/../shared/log.php';

class CloseoutService
{
     public function __construct($db, $auto_commit = false)
    {
        $this->conn = $db;
        
        if ($auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
    }

    public function closeout_nrs($start_date = null, $end_date = null)
    {
        Utilities::sanitize($this);

        if (isset($start_date) && isset($end_date)) {
            $query = "
            SELECT CLOSEOUT_NR,
                CLOSEOUT_DATE END_DATE,
                PREV_CLOSEOUT_DATE START_DATE,
                STATUS,
                DECODE(STATUS,
                    0, 'OPEN',
                    1, 'FROZEN',
                    2, 'CLOSE') STATUS_DESC
            FROM CLOSEOUTS
            WHERE PREV_CLOSEOUT_DATE > :start_date
                AND PREV_CLOSEOUT_DATE < :end_date
            ORDER BY CLOSEOUT_NR DESC";

            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':start_date', $start_date);
            oci_bind_by_name($stmt, ':end_date', $end_date);
        } else {
            $query = "
            SELECT CLOSEOUT_NR,
                PREV_CLOSEOUT_DATE START_DATE,
                CLOSEOUT_DATE END_DATE,
                STATUS,
                DECODE(STATUS,
                    0, 'OPEN',
                    1, 'FROZEN',
                    2, 'CLOSE') STATUS_DESC
            FROM CLOSEOUTS
            ORDER BY CLOSEOUT_NR DESC";
            $stmt = oci_parse($this->conn, $query);
        }

        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // public function carriers($plus_any = false)
    // {
    //     $query = "";
    //     if ($plus_any) {
    //         $query .= " SELECT 'ANY' CMPY_CODE, 'ALL' CMPY_NAME FROM DUAL UNION ";
    //     }
    //     $query .= "
    //         SELECT CMPY_CODE, CMPY_NAME
    //         FROM GUI_COMPANYS
    //         WHERE BITAND(CMPY_TYPE, POWER(2, 2)) != 0
    //         ORDER BY CMPY_NAME ASC";
    //     // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
    //     $stmt = oci_parse($this->conn, $query);
    //     if (oci_execute($stmt)) {
    //         return $stmt;
    //     } else {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return null;
    //     }
    // }
}
