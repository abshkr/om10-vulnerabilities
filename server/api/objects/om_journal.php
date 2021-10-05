<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class OMJournal extends CommonClass
{
    protected $TABLE_NAME = 'GUI_SITE_JOURNAL';
    protected $VIEW_NAME = 'GUI_SITE_JOURNAL';

    public $NUMBER_FIELDS = array(
        "RECORDS",
    );

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
        if (!isset($this->region_code)) {
            $this->region_code = Utilities::getCurrLang();
        }

        $query = "
            SELECT ENUM_TMM, MSG_LOOKUP.MESSAGE
            FROM ENUMITEM
            JOIN MSG_LOOKUP
            ON (ENUMITEM.ENUM_TMM=MSG_LOOKUP.MSG_ID)
            WHERE ENUMITEM.ENUMTYPENAME='JNL_EVENT'
                AND ENUMITEM.ENUM_NO!=0
                AND (MSG_LOOKUP.LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT', 'LANG') IS NULL
                AND MSG_LOOKUP.LANG_ID = :region_code))
            ORDER BY MSG_LOOKUP.MESSAGE";
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

    public function categories()
    {
        if (!isset($this->region_code)) {
            $this->region_code = Utilities::getCurrLang();
        }

        $query = "
            SELECT ENUM_TMM, MSG_LOOKUP.MESSAGE
            FROM ENUMITEM
            JOIN MSG_LOOKUP
            ON (ENUMITEM.ENUM_TMM=MSG_LOOKUP.MSG_ID)
            WHERE ENUMITEM.ENUMTYPENAME='JNL_CLASS'
                AND ENUMITEM.ENUM_NO!=0
                AND (MSG_LOOKUP.LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT', 'LANG') IS NULL
                AND MSG_LOOKUP.LANG_ID = :region_code))
            ORDER BY MSG_LOOKUP.MESSAGE";
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

    public function pagination_count()
    {
        if (!isset($this->start_date) || !isset($this->end_date)) {
            //get journal in 30 min
            $query = "SELECT COUNT(*) CN FROM GUI_SITE_JOURNAL WHERE GEN_DATE >= SYSDATE - 30 / 1440 AND REGION_CODE = :lang ";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':lang', $this->lang);
        } else {
            $query = "SELECT COUNT(*) CN
            FROM GUI_SITE_JOURNAL
            WHERE REGION_CODE = :lang
                AND GEN_DATE >= TO_DATE(:start_date, 'yyyy-mm-dd hh24:mi:ss')
                AND GEN_DATE <= TO_DATE(:end_date, 'yyyy-mm-dd hh24:mi:ss')";
            // write_log(json_encode($query), __FILE__, __LINE__);
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
            oci_bind_by_name($stmt, ':lang', $this->lang);
            if (isset($this->region_code)) {
                oci_bind_by_name($stmt, ':region_code', $this->region_code);
            }
        }

        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    // read personnel
    public function read()
    {
        // write_log(json_encode($this), __FILE__, __LINE__);
        if (!isset($this->lang)) {
            $this->lang = Utilities::getCurrLang();
        }

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
                AND REGION_CODE = :lang
            ORDER BY GEN_DATE DESC";
            if (!(isset($this->pgflag) && $this->pgflag==='N')) {
                //By default, use pagination, unless there is an explicit pgflag=N
                $query = $this->pagination_query($query);
            }
            $stmt = oci_parse($this->conn, $query);
            
            oci_bind_by_name($stmt, ':lang', $this->lang);
            
            if (!(isset($this->pgflag) && $this->pgflag==='N')) {
                $this->pagination_binds($stmt);
            }
        } else {
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
            WHERE REGION_CODE = :lang
                AND GEN_DATE >= TO_DATE(:start_date, 'yyyy-mm-dd hh24:mi:ss')
                AND GEN_DATE <= TO_DATE(:end_date, 'yyyy-mm-dd hh24:mi:ss')
            ORDER BY GEN_DATE DESC";
            if (!(isset($this->pgflag) && $this->pgflag==='N')) {
                $query = $this->pagination_query($query);
            }
            // write_log(json_encode($query), __FILE__, __LINE__);
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
            oci_bind_by_name($stmt, ':lang', $this->lang);
            if (isset($this->region_code)) {
                oci_bind_by_name($stmt, ':region_code', $this->region_code);
            }
            if (!(isset($this->pgflag) && $this->pgflag==='N')) {
                $this->pagination_binds($stmt);
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
        if (!isset($this->lang)) {
            $this->lang = Utilities::getCurrLang();
        }

        $query = "
            SELECT TO_CHAR(GEN_DATE, 'YYYY-MM-DD HH24:MI:SSXFF') GEN_DATE,
                REGION_CODE,
                PRINT_DATE,
                COMPANY_CODE,
                MSG_EVENT,
                MSG_CLASS,
                MESSAGE,
                SEQ,
                JNL_CAT
            FROM GUI_SITE_JOURNAL
            WHERE REGION_CODE = :lang
                AND GEN_DATE >= :start_date
                AND GEN_DATE <= :end_date ";
        if (isset($this->msg_event)) {
            $query .= " AND MSG_EVENT = :msg_event ";
        }
        if (isset($this->msg_class)) {
            $query .= " AND MSG_CLASS = :msg_class ";
        }
        if (isset($this->target_str)) {
            $query .= " AND UPPER(MESSAGE) LIKE UPPER(:target_str) ";
        }
        
        $query .= "ORDER BY GEN_DATE DESC";
        write_log(json_encode($query), __FILE__, __LINE__);
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':start_date', $this->start_date);
        oci_bind_by_name($stmt, ':end_date', $this->end_date);
        oci_bind_by_name($stmt, ':lang', $this->lang);
        if (isset($this->msg_event)) {
            oci_bind_by_name($stmt, ':msg_event', $this->msg_event);
        }
        if (isset($this->msg_class)) {
            oci_bind_by_name($stmt, ':msg_class', $this->msg_class);
        }
        if (isset($this->target_str)) {
            $percent_str = '%' . $this->target_str . '%';
            oci_bind_by_name($stmt, ':target_str', $percent_str);
        }
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function statistics()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        // write_log(json_encode($this), __FILE__, __LINE__);

        if (!isset($this->lang)) {
            $this->lang = Utilities::getCurrLang();
            // if ($this->lang == 'CHN') {
            //     $query = "ALTER SESSION SET NLS_LANGUAGE = 'SIMPLIFIED CHINESE'";
            //     $stmt = oci_parse($this->conn, $query);
            //     if (!oci_execute($stmt, $this->commit_mode)) {
            //         $e = oci_error($stmt);
            //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            //         return;
            //     }
            // }
        }

        $result = array();
        $query = "SELECT COUNT(*) CN FROM GUI_SITE_JOURNAL WHERE GEN_DATE > TRUNC(SYSDATE) AND MSG_EVENT = 'ALARM'";
        if (isset($this->msg_event)) {
            $query .= " AND MSG_EVENT = :msg_event ";
        }
        $stmt = oci_parse($this->conn, $query);
        if (isset($this->msg_event)) {
            oci_bind_by_name($stmt, ':msg_event', $this->msg_event);
        }
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $result = array();
        $result["today"] = intval($row['CN']);

        $query = "SELECT COUNT(*) CN FROM GUI_SITE_JOURNAL 
            WHERE GEN_DATE > TRUNC(SYSDATE) - 1 AND GEN_DATE < TRUNC(SYSDATE) AND MSG_EVENT = 'ALARM'";
        if (isset($this->msg_event)) {
            $query .= " AND MSG_EVENT = :msg_event ";
        }
        $stmt = oci_parse($this->conn, $query);
        if (isset($this->msg_event)) {
            oci_bind_by_name($stmt, ':msg_event', $this->msg_event);
        }
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $result["yesterday"] = intval($row['CN']);

        $query = "SELECT COUNT(*) CN FROM GUI_SITE_JOURNAL WHERE GEN_DATE > SYSDATE - 1";
        if (isset($this->msg_event)) {
            $query .= " AND MSG_EVENT = :msg_event ";
        }
        $stmt = oci_parse($this->conn, $query);
        if (isset($this->msg_event)) {
            oci_bind_by_name($stmt, ':msg_event', $this->msg_event);
        }
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $result["day"] = intval($row['CN']);

        $query = "SELECT COUNT(*) CN FROM GUI_SITE_JOURNAL WHERE GEN_DATE > SYSDATE - 7";
        if (isset($this->msg_event)) {
            $query .= " AND MSG_EVENT = :msg_event ";
        }
        $stmt = oci_parse($this->conn, $query);
        if (isset($this->msg_event)) {
            oci_bind_by_name($stmt, ':msg_event', $this->msg_event);
        }
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $result["week"] = intval($row['CN']);

        $query = "SELECT COUNT(*) CN FROM GUI_SITE_JOURNAL WHERE GEN_DATE > SYSDATE - 30";
        if (isset($this->msg_event)) {
            $query .= " AND MSG_EVENT = :msg_event ";
        }
        $stmt = oci_parse($this->conn, $query);
        if (isset($this->msg_event)) {
            oci_bind_by_name($stmt, ':msg_event', $this->msg_event);
        }
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $result["month"] = intval($row['CN']);

        $catetories = array();
        if (isset($this->msg_event)) {
            $query = "SELECT COUNT(*) RECORDS, 
                TRIM(TO_CHAR(GEN_DATE, 'Day')) DAY, 
                TO_CHAR(GEN_DATE, 'D') DAY_OF_WEEK,
                MSG_CLASS CATEGORY 
            FROM GUI_SITE_JOURNAL 
            WHERE REGION_CODE = 'ENG' AND MSG_EVENT = :msg_event AND GEN_DATE > SYSDATE - 7
            GROUP BY TO_CHAR(GEN_DATE, 'Day'), MSG_CLASS, TO_CHAR(GEN_DATE, 'D')
            ORDER BY TO_CHAR(GEN_DATE, 'D'), MSG_CLASS";
        } else {
            $query = "SELECT COUNT(*) RECORDS, 
                    TRIM(TO_CHAR(GEN_DATE, 'Day')) DAY, 
                    TO_CHAR(GEN_DATE, 'D') DAY_OF_WEEK,
                    MSG_CLASS CATEGORY 
                FROM GUI_SITE_JOURNAL 
                WHERE REGION_CODE = 'ENG' AND GEN_DATE > SYSDATE - 7
                GROUP BY TO_CHAR(GEN_DATE, 'Day'), MSG_CLASS, TO_CHAR(GEN_DATE, 'D')
                ORDER BY TO_CHAR(GEN_DATE, 'D'), MSG_CLASS";
        }
        $stmt = oci_parse($this->conn, $query);
        // oci_bind_by_name($stmt, ':lang', $this->lang);
        if (isset($this->msg_event)) {
            oci_bind_by_name($stmt, ':msg_event', $this->msg_event);
        }
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }
        Utilities::retrieve($catetories, $this, $stmt, $method=__FUNCTION__);
        $result["catetories"] = $catetories;

        $alarms = array();
        $query = " SELECT SKE.FORMATED_DATE, RECORDS, MONTH, MONTH_SEQ, DAY
            FROM
            (
                SELECT TO_CHAR(DT, 'YYYY-MM-DD') FORMATED_DATE,  
                    TO_CHAR(DT, 'Month') MONTH,
                    TO_CHAR(DT, 'MM') MONTH_SEQ, 
                    TO_CHAR(DT, 'DD') DAY
                FROM (SELECT TRUNC (SYSDATE - ROWNUM) DT
                FROM DUAL CONNECT BY ROWNUM < 366)
            ) SKE, 
            (
                SELECT COUNT(*) RECORDS, TO_CHAR(GEN_DATE, 'YYYY-MM-DD') FORMATED_DATE
                FROM GUI_SITE_JOURNAL 
                WHERE REGION_CODE = 'ENG' AND MSG_EVENT = 'ALARM' 
                GROUP BY TO_CHAR(GEN_DATE, 'YYYY-MM-DD')
            ) JOURNAL_INFO
            WHERE SKE.FORMATED_DATE = JOURNAL_INFO.FORMATED_DATE(+)
            ORDER BY MONTH_SEQ, DAY";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }
        Utilities::retrieve($alarms, $this, $stmt, $method=__FUNCTION__);
        $result["alarms"] = $alarms;

        echo json_encode($result, JSON_PRETTY_PRINT);
    }

    // public function alarms()
    // {
    //     $query = "
    //         SELECT * FROM
    //         (
    //             SELECT GEN_DATE,
    //                 REGION_CODE,
    //                 PRINT_DATE,
    //                 COMPANY_CODE,
    //                 MSG_EVENT,
    //                 MSG_CLASS,
    //                 MESSAGE,
    //                 SEQ,
    //                 JNL_CAT
    //             FROM GUI_SITE_JOURNAL
    //             WHERE MSG_EVENT = 'ALARM'
    //                 AND GEN_DATE >= SYSDATE - 1
    //             ORDER BY GEN_DATE DESC
    //         ) 
    //         WHERE ROWNUM <= 5";
    //     // write_log(json_encode($query), __FILE__, __LINE__);
    //     $stmt = oci_parse($this->conn, $query);
    //     if (oci_execute($stmt, $this->commit_mode)) {
    //         return $stmt;
    //     } else {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return null;
    //     }
    // }
}
