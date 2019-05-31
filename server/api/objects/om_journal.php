<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';

class OMJournal
{
    // database connection and table name
    private $conn;

    public $gen_date;
    public $region_code;
    public $print_date;
    public $company_code;
    public $msg_event;
    public $msg_class;
    public $message;
    public $seq;
    public $jnl_cat;

    public $start_num;
    public $end_num;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
        $this->region_code = 'ENG';
    }

    public function get_max_seq()
    {
        $query = "
            SELECT NVL(MAX(SEQ), 0) AS MAX_SEQ
            FROM GUI_SITE_JOURNAL WHERE GEN_DATE > SYSDATE - 1";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return $row['MAX_SEQ'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function types()
    {
        Utilities::sanitize($this);

        $query = "
            SELECT ENUM_TMM, MSG_LOOKUP.MESSAGE
            FROM ENUMITEM
            JOIN MSG_LOOKUP
            ON (ENUMITEM.ENUM_TMM=MSG_LOOKUP.MSG_ID)
            WHERE ENUMITEM.ENUMTYPENAME='JNL_EVENT'
                AND ENUMITEM.ENUM_NO!=0
                AND (MSG_LOOKUP.LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT', 'LANG') IS NULL
                AND MSG_LOOKUP.LANG_ID = :region_code))";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':region_code', $this->region_code);
        if (oci_execute($stmt)) {
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
        if (!isset($this->end_num)) {
            $this->end_num = $this->get_max_seq();
            $this->start_num = $this->end_num - 500;
        }

        Utilities::sanitize($this);

        $query = "
            SELECT GEN_DATE,
                REGION_CODE,
                PRINT_DATE,
                COMPANY_CODE,
                MSG_EVENT,
                MSG_CLASS,
                MESSAGE,
                SEQ,
                JNL_CAT
            FROM GUI_SITE_JOURNAL
            WHERE SEQ >= :start_num
                AND SEQ <= :end_num
                AND REGION_CODE = :region_code
            ORDER BY GEN_DATE ASC";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':start_num', $this->start_num);
        oci_bind_by_name($stmt, ':end_num', $this->end_num);
        oci_bind_by_name($stmt, ':region_code', $this->region_code);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function search_count($types, $start_date, $end_date, $target_str)
    {
        Utilities::sanitize($this);

        if (isset($types)) {
            $tmp_arr = explode(':', $types);

            $types_str = null;
            foreach ($tmp_arr as $type) {
                if (isset($types_str)) {
                    $types_str = $types_str . ", '" . $type . "'";
                } else {
                    $types_str = "'" . $type . "'";
                }

            }
        }

        $query = "
            SELECT COUNT(*) CN
            FROM GUI_SITE_JOURNAL
            WHERE GEN_DATE >= TO_DATE(:start_date, 'yyyy-mm-dd hh24:mi')
                AND GEN_DATE <= TO_DATE(:end_date, 'yyyy-mm-dd hh24:mi')
                AND REGION_CODE = :region_code
                AND MESSAGE LIKE :target_str";
        if (isset($types_str)) {
            $query = $query . " AND MSG_EVENT IN (" . $types_str . ")";
        }

        // write_log("search query:" . $query, __FILE__, __LINE__, LogLevel::DEBUG);
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':start_date', $start_date);
        oci_bind_by_name($stmt, ':end_date', $end_date);
        oci_bind_by_name($stmt, ':region_code', $this->region_code);
        oci_bind_by_name($stmt, ':target_str', $target_str);
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function search($types, $start_date, $end_date, $target_str)
    {
        if (!isset($this->end_num)) {
            $this->start_num = 1;
            $this->end_num = 500;
        }

        Utilities::sanitize($this);

        if (isset($types)) {
            $tmp_arr = explode(':', $types);

            $types_str = null;
            foreach ($tmp_arr as $type) {
                if (isset($types_str)) {
                    $types_str = $types_str . ", '" . $type . "'";
                } else {
                    $types_str = "'" . $type . "'";
                }

            }
        }

        $query = "
            SELECT *
            FROM
            (
                SELECT RES.*, ROWNUM RN
                FROM
                (
                    SELECT GEN_DATE,
                        REGION_CODE,
                        PRINT_DATE,
                        COMPANY_CODE,
                        MSG_EVENT,
                        MSG_CLASS,
                        MESSAGE,
                        SEQ,
                        JNL_CAT
                    FROM GUI_SITE_JOURNAL
                    WHERE GEN_DATE >= TO_DATE(:start_date, 'yyyy-mm-dd hh24:mi')
                        AND GEN_DATE <= TO_DATE(:end_date, 'yyyy-mm-dd hh24:mi')
                        AND REGION_CODE = :region_code
                        AND MESSAGE LIKE :target_str
                    ORDER BY GEN_DATE
                ) RES
            )
            WHERE RN >= :start_num AND RN <= :end_num
            ";
        if (isset($types_str)) {
            $query = $query . " AND MSG_EVENT IN (" . $types_str . ")";
        }

        $query = $query . " ORDER BY GEN_DATE ASC";
        // write_log("search query:" . $query, __FILE__, __LINE__, LogLevel::DEBUG);

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':start_date', $start_date);
        oci_bind_by_name($stmt, ':end_date', $end_date);
        oci_bind_by_name($stmt, ':region_code', $this->region_code);
        oci_bind_by_name($stmt, ':target_str', $target_str);
        oci_bind_by_name($stmt, ':start_num', $this->start_num);
        oci_bind_by_name($stmt, ':end_num', $this->end_num);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

}
