<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class Dashboard extends CommonClass
{
    protected $TABLE_NAME = 'DUMMY';

    public $NUMBER_FIELDS = array(
        "TANKER_TOTAL",
        "TANKER_ACTIVE",
        "PERSONNEL_TOTAL",
        "PERSONNEL_ACTIVE",
        "KEY_AVAILABLE",
        "KEY_USED",
        "KEY_TANKER",
        "KEY_COMBO",
        "KEY_PERSON",
        "KEY_OTHER"
    );
    
    public function read()
    {
        $query = "SELECT (SELECT COUNT(TNKR_CODE) FROM TANKERS) TANKER_TOTAL ,
            (SELECT COUNT(TNKR_CODE) FROM TANKERS WHERE TNKR_ACTIVE = 'Y') TANKER_ACTIVE,
            (SELECT COUNT(USER_CODE) FROM URBAC_USERS) PERSONNEL_TOTAL,
            (SELECT COUNT(USER_CODE) FROM URBAC_USERS WHERE USER_STATUS_FLAG = 1) PERSONNEL_ACTIVE,
            4000 KEY_AVAILABLE,
            (SELECT COUNT(*) FROM ACCESS_KEYS) KEY_USED,
            (SELECT COUNT(*) FROM ACCESS_KEYS WHERE KYA_TYPE = 4) KEY_TANKER,
            (SELECT COUNT(*) FROM ACCESS_KEYS WHERE KYA_TYPE = 5) KEY_COMBO,
            (SELECT COUNT(*) FROM ACCESS_KEYS WHERE KYA_TYPE = 3) KEY_PERSON,
            (SELECT COUNT(*) FROM ACCESS_KEYS WHERE KYA_TYPE NOT IN (3, 4, 5)) KEY_OTHER
            FROM DUAL";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_hook(&$hook_item)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $result = array();
        $query = "
            SELECT BAYS_PER_LOAD, 
                LOADS,
                (SELECT COUNT(DISTINCT trsaldid_load_id) 
                FROM TRANSACTIONS, transfers where trsa_id = trsftrid_trsa_id)  TOTAL
            FROM
            (
                SELECT BAYS_PER_LOAD, COUNT(*) LOADS
                FROM 
                (
                    SELECT TRSALDID_LOAD_ID, COUNT(DISTINCT TRSA_BAY_CD) BAYS_PER_LOAD  
                    FROM TRANSACTIONS, TRANSFERS WHERE TRSA_ID = TRSFTRID_TRSA_ID 
                    GROUP BY TRSALDID_LOAD_ID
                )
                GROUP BY BAYS_PER_LOAD
                ORDER BY BAYS_PER_LOAD
            ) TMP
        ";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        Utilities::retrieve($result, $this, $stmt, $method=__FUNCTION__);
        $i = 0;
        foreach ($result as $key => $value) {
            $percent = $value['loads'] / $value['total'];
            $result[$i]['percent'] = round($percent, 4) * 100;
            $i += 1;
        }
        $hook_item['tanker_movement'] = $result;

        $result = array();
        $query = "
            SELECT TRSA_BAY_CD BAY_CODE, 
                MAX(TRSA_ID) MAX_TRANSACTION_ID, 
                COUNT(TRSA_ID) CNT_TRANSACTION_ID 
            FROM TRANSACTIONS 
            GROUP BY TRSA_BAY_CD 
            ORDER BY TRSA_BAY_CD";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        Utilities::retrieve($result, $this, $stmt, $method=__FUNCTION__);
        $hook_item['transaction_ids'] = $result;

        $result = array();
        $query = "
            SELECT TRSA_BAY_CD, 
                COUNT(TRSALDID_LOAD_ID) LOADS, 
                SUM(TRSF_QTY_AMB) SUM_AMB, 
                SUM(TRSF_QTY_COR) SUM_COR, 
                SUM(TRSF_LOAD_KG) SUM_KG,
                SUM(TRSF_QTY_AMB) / COUNT(TRSALDID_LOAD_ID) AVGAMB_PER_LOAD
            FROM TRANSACTIONS, TRANSFERS, CLOSEOUTS
            WHERE TRSA_ID = TRSFTRID_TRSA_ID
                AND STATUS = 0
                AND TRSA_ED_DMY > PREV_CLOSEOUT_DATE
            GROUP BY TRSA_BAY_CD
            ORDER BY TRSA_BAY_CD";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        Utilities::retrieve($result, $this, $stmt, $method=__FUNCTION__);
        $hook_item['folio_loads'] = $result;
    }

    public function overview()
    {
        $query = "SELECT NULL OVERVIEW FROM DUAL";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function overview_hook(&$hook_item)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        // $result = array();
        // $query = "
        //     SELECT
        //     (
        //         SELECT NVL(SUM(TRSF_QTY_AMB), 0) / 1000
        //         FROM TRANSACTIONS, TRANSFERS, CLOSEOUTS
        //         WHERE TRSA_ID = TRSFTRID_TRSA_ID
        //             AND STATUS = 0
        //             AND TRSA_ED_DMY > PREV_CLOSEOUT_DATE
        //     ) CUR_FOLIO_AMB,
        //     (
        //         SELECT NVL(SUM(TRSF_QTY_AMB), 0)  / 1000
        //         FROM TRANSACTIONS, TRANSFERS, CLOSEOUTS

        //         WHERE TRSA_ID = TRSFTRID_TRSA_ID
        //         AND CLOSEOUT_NR = 
        //             (SELECT NVL(CLOSEOUT_NR, 0) - 1 PREV_NR
        //             FROM CLOSEOUTS WHERE STATUS = 0)
        //             AND TRSA_ED_DMY > PREV_CLOSEOUT_DATE AND TRSA_ED_DMY < CLOSEOUT_DATE
        //     ) PREV_FOLIO_AMB,
        //     (
        //         SELECT NVL(SUM(TRSF_QTY_AMB), 0)  / 1000
        //         FROM TRANSACTIONS, TRANSFERS
        //         WHERE TRSA_ID = TRSFTRID_TRSA_ID
        //             AND TRSA_ED_DMY > SYSDATE - 7
        //     ) CUR_WEEK_AMB,
        //     (
        //         SELECT NVL(SUM(TRSF_QTY_AMB), 0)  / 1000
        //         FROM TRANSACTIONS, TRANSFERS
        //         WHERE TRSA_ID = TRSFTRID_TRSA_ID
        //             AND TRSA_ED_DMY > SYSDATE - 14 AND TRSA_ED_DMY < SYSDATE - 7 
        //     ) PREV_WEEK_AMB
        //     FROM DUAL
        // ";
        // $stmt = oci_parse($this->conn, $query);
        // if (!oci_execute($stmt, $this->commit_mode)) {
        //     $e = oci_error($stmt);
        //     write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     return;
        // }

        // Utilities::retrieve($result, $this, $stmt, $method=__FUNCTION__);
        // $hook_item['throughput'] = $result;

        $result = array();
        $query = "
            SELECT TRUNC(TRSA_ED_DMY) AS DMY,
                SUM(TRSF_QTY_COR)/1000 AS QTY_COR,
                SUM(TRSF_QTY_AMB)/1000 AS QTY_AMB
            FROM TRANSACTIONS TRSA, TRANSFERS TRSF 
            WHERE TRSA.TRSA_ID = TRSF.TRSFTRID_TRSA_ID 
                AND TRSA_ED_DMY >= (SELECT TRUNC(SYSDATE-6) FROM DUAL)
            GROUP BY TRUNC(TRSA_ED_DMY)";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        Utilities::retrieve($result, $this, $stmt, $method=__FUNCTION__);
        $hook_item['throughput'] = $result;

        $result = array();
        $query = "
            SELECT SUM(TANK_AMB_VOL) / 1000 QTY_ABM, 
                SUM(TANK_COR_VOL) / 1000 QTY_COR,
                TANK_BASE, 
                BASE_NAME
            FROM TANKS, BASE_PRODS
            WHERE TANK_BASE = BASE_CODE
            GROUP BY TANK_BASE, BASE_NAME
            ORDER BY BASE_NAME";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        Utilities::retrieve($result, $this, $stmt, $method=__FUNCTION__);
        $hook_item['storage'] = $result;

        $result = array();
        // $query = "
        //     SELECT NVL(DECODE(TRSB_UNT, 34, SUM(TRSB_AVL) / 1000, SUM(TRSB_AVL)), 0) / 1000 QTY_AMB, 
        //         NVL(DECODE(TRSB_UNT, 34, SUM(TRSB_CVL) / 1000, SUM(TRSB_CVL)), 0) / 1000 QTY_CMB, 
        //         BASE_CODE TRSF_BASE_P, 
        //         BASE_NAME
        //     FROM TRANSACTIONS, TRANSFERS, CLOSEOUTS, TRANBASE, BASE_PRODS
        //     WHERE TRSA_ID = TRSFTRID_TRSA_ID
        //         AND STATUS = 0
        //         AND TRSB_ID_TRSF_ID = TRSF_ID
        //         AND TRSB_BS = BASE_CODE
        //         AND TRSA_ED_DMY > PREV_CLOSEOUT_DATE
        //     GROUP BY BASE_CODE, BASE_NAME, TRSB_UNT
        //     ORDER BY BASE_NAME";
        $query = "
            SELECT NVL(DECODE(TRSB_UNT, 34, SUM(TRSB_AVL) / 1000, SUM(TRSB_AVL)), 0) / 1000 QTY_AMB, 
                NVL(DECODE(TRSB_UNT, 34, SUM(TRSB_CVL) / 1000, SUM(TRSB_CVL)), 0) / 1000 QTY_CMB, 
                BASE_CODE TRSF_BASE_P, 
                BASE_NAME
            FROM TRANSACTIONS, TRANSFERS, CLOSEOUTS, TRANBASE, BASE_PRODS
            WHERE TRSA_ID = TRSFTRID_TRSA_ID
                AND STATUS = 0
                AND TRSB_ID_TRSF_ID = TRSF_ID
                AND TRSB_BS = BASE_CODE
                AND TRSA_ED_DMY > PREV_CLOSEOUT_DATE
            GROUP BY BASE_CODE, BASE_NAME, TRSB_UNT
            ORDER BY BASE_NAME";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        Utilities::retrieve($result, $this, $stmt, $method=__FUNCTION__);
        $hook_item['folio_throughput'] = $result;

        $result = array();
        // $query = "
        //     SELECT WEEK WK, 
        //         NVL(AMB_SUM, 0) /1000 QTY_AMB, 
        //         NVL(COR_SUM, 0) /1000 QTY_COR,
        //         WEEKS.BASE_CODE TRSF_BASE_P, WEEKS.BASE_NAME
        //     FROM
        //     (
        //         SELECT WEEK, BASE_CODE, BASE_NAME
        //         FROM
        //         (
        //             SELECT N WEEK FROM
        //             (SELECT ROWNUM N FROM DUAL CONNECT BY LEVEL <= TO_CHAR(SYSDATE, 'WW'))
        //             WHERE N >= TO_CHAR(SYSDATE - 70, 'WW')
        //         ),
        //         (
        //             SELECT DISTINCT BASE_CODE, BASE_NAME FROM TRANSACTIONS, TRANSFERS, TRANBASE, BASE_PRODS
        //                 WHERE TRSA_ID = TRSFTRID_TRSA_ID
        //                     AND TRSB_ID_TRSF_ID = TRSF_ID
        //                     AND TRSB_BS = BASE_CODE
        //                     AND TRSA_ED_DMY > SYSDATE - 70
        //                 GROUP BY BASE_CODE, BASE_NAME
        //         )
        //     ) WEEKS,
        //     (
        //         SELECT SUM(AMB_SUM) AMB_SUM, SUM(COR_SUM) COR_SUM, 
        //             BASE_CODE, BASE_NAME, LOAD_WEEK
        //         FROM 
        //         (
        //             SELECT NVL(DECODE(TRSB_UNT, 34, SUM(TRSB_AVL) / 1000, SUM(TRSB_AVL)), 0) AMB_SUM, 
        //                 NVL(DECODE(TRSB_UNT, 34, SUM(TRSB_CVL) / 1000, SUM(TRSB_CVL)), 0) COR_SUM, 
        //                 BASE_CODE, 
        //                 BASE_NAME, 
        //                 TO_CHAR(TRSA_ED_DMY, 'WW') LOAD_WEEK
        //             FROM TRANSACTIONS, TRANSFERS, TRANBASE, BASE_PRODS
        //             WHERE TRSA_ID = TRSFTRID_TRSA_ID
        //                 AND TRSB_ID_TRSF_ID = TRSF_ID
        //                 AND TRSB_BS = BASE_CODE
        //                 AND TRSA_ED_DMY > SYSDATE - 70
        //             GROUP BY BASE_CODE, BASE_NAME, TRSA_ED_DMY, TRSB_UNT
        //             ORDER BY BASE_NAME
        //         ) GROUP BY BASE_CODE, BASE_NAME, LOAD_WEEK
        //     ) LOAD_DATE
        //     WHERE WEEK = LOAD_WEEK(+)
        //         AND WEEKS.BASE_CODE = LOAD_DATE.BASE_CODE(+)
        //     ORDER BY WEEK, BASE_NAME";
        $query = " 	
            SELECT TO_CHAR(TRSA_ST_DMY,'IW') AS WK,
                TRSF_BASE_P,
                BASE_NAME,
                SUM(TRSF_QTY_COR)/1000 AS QTY_COR,
                SUM(TRSF_QTY_AMB)/1000 AS QTY_AMB
            FROM
                TRANSACTIONS TRSA INNER JOIN
                TRANSFERS TRSF ON
                TRSA.TRSA_ID = TRSF.TRSFTRID_TRSA_ID AND TRSA.TRSA_TERMINAL = TRSF.TRSFTRID_TRSA_TRM LEFT JOIN
                BASE_PRODS PR_BASE ON
                TRSF.TRSF_BASE_P = PR_BASE.BASE_CODE
            WHERE TRSA_ST_DMY >= (SELECT TRUNC(SYSDATE,'YEAR') FROM DUAL)
            GROUP BY TO_CHAR(TRSA_ST_DMY, 'IW'), TRSF_BASE_P, BASE_NAME
            ORDER BY TO_CHAR(TRSA_ST_DMY, 'IW'), BASE_NAME";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        Utilities::retrieve($result, $this, $stmt, $method=__FUNCTION__);
        $hook_item['weekly_throughput'] = $result;
    }

    public function system()
    {
        $feature_array = array();

        $temp = shell_exec("cat /proc/cpuinfo | grep model\ name");
        $pieces = explode(":", $temp);
        $cpu_model = $pieces[1];
        $feature_array['cpu_model'] =  preg_replace("/\r|\n/", "", $pieces[1]);

        $temp = shell_exec("free -m | grep Mem");
        $pieces = preg_split("/[\s,]+/", $temp);
        $mem_total = $pieces[1];
        $mem_used = $pieces[1] - $pieces[3];
        $mem_free = $pieces[3];
        $mem_shared = $pieces[4];
        $mem_cache = $pieces[5];
        $mem_available = $pieces[6];

        $feature_array['mem_total'] = $mem_total . " MB"; 
        $feature_array['mem_used'] = $mem_used . " MB"; 
        $feature_array['mem_free'] = $mem_free . " MB"; 
        $feature_array['mem_usage_percent'] = round(($mem_used / $mem_total), 4)* 100; 
        
        $temp = shell_exec("free -m | grep Swap");
        // echo $temp;
        $pieces = preg_split("/[\s,]+/", $temp);
        $swap_total = $pieces[1];
        $swap_used = $pieces[2];
        $swap_free = $pieces[3];
        $feature_array['swap_total'] = $swap_total . " MB"; 
        $feature_array['swap_used'] = $swap_used . " MB"; 
        $feature_array['swap_free'] = $swap_free . " MB"; 
        $feature_array['swap_usage_percent'] = round(($swap_used / $swap_total), 4)* 100; 

        $feature_array['hdd_free'] = round(disk_free_space("/") / 1024 / 1024 / 1024, 2) . " GB";
        $feature_array['hdd_total'] = round(disk_total_space("/") / 1024 / 1024/ 1024, 2) . " GB";
        $feature_array['hdd_usage_percent'] = round((($feature_array['hdd_total'] - $feature_array['hdd_free']) /
            $feature_array['hdd_total']), 4)* 100;

        $feature_array['up_time'] = preg_replace("/\r|\n/", "", shell_exec("uptime")) ; 
        $feature_array['linux_version'] = preg_replace("/\r|\n/", "", shell_exec("uname -mrs")); 
        $os_release = shell_exec("cat /etc/os-release | grep PRETTY_NAME");
        $pieces = explode("=", $os_release);
        $os_release = str_replace('"', "", preg_replace("/\r|\n/", "", $pieces[1]));
        $feature_array['os_release'] = $os_release; 

        $result = array();
        $result["records"] = $feature_array;
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

    public function alarms()
    {
        $query = "SELECT * FROM SITE_JOURNAL WHERE ";
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
