<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class OMJournal extends CommonClass
{
    protected $TABLE_NAME = 'GUI_SITE_JOURNAL';
    protected $VIEW_NAME = 'GUI_SITE_JOURNAL';

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

    public function get_max_seq()
    {
        $query = "
            SELECT NVL(MAX(SEQ), 0) AS MAX_SEQ
            FROM GUI_SITE_JOURNAL WHERE GEN_DATE > SYSDATE - 1";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
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
        // write_log(json_encode($this), __FILE__, __LINE__);
        if (!isset($this->start_date) || !isset($this->end_date)) {
            //get journal in 30 min
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
            WHERE GEN_DATE >= SYSDATE - 30 / 1440
            ORDER BY GEN_DATE DESC";
            $stmt = oci_parse($this->conn, $query);
            // oci_bind_by_name($stmt, ':start_num', $this->start_num);
        } else {
            if (isset($this->types)) {
                $tmp_arr = explode(':', $this->types);

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
            WHERE GEN_DATE >= TO_DATE(:start_date, 'yyyy-mm-dd hh24:mi:ss')
                AND GEN_DATE <= TO_DATE(:end_date, 'yyyy-mm-dd hh24:mi:ss')";
            if (isset($types_str)) {
                $query .= " AND MSG_EVENT IN (" . $types_str . ")";
            }
            if (isset($this->region_code)) {
                $query .= " AND REGION_CODE = :region_code ";
            }
            if (isset($this->target_str)) {
                $query .= " AND MESSAGE LIKE :target_str ";
            }

            $query .= "ORDER BY GEN_DATE DESC";
            // write_log(json_encode($query), __FILE__, __LINE__);
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
            if (isset($this->region_code)) {
                oci_bind_by_name($stmt, ':region_code', $this->region_code);
            }
            if (isset($this->target_str)) {
                $percent_str = '%' . $this->target_str . '%';
                oci_bind_by_name($stmt, ':target_str', $percent_str);
            }
        }

        if (oci_execute($stmt, $this->commit_mode)) {
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
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function search()
    {
        return $this->read();
    }

}
