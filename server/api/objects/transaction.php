<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class Transaction extends CommonClass
{
    protected $TABLE_NAME = 'TRANSACTIONS';
    protected $VIEW_NAME = 'GUI_TRANSACTIONS';
    public $NUMBER_FIELDS = array(
        "TRSA_ID",
        "TRSA_TRIP",
        "LOAD_ID",
        "TRSF_OPN_AMB",
        "TRSF_CLS_AMB",
        "TRSF_OPN_COR",
        "TRSF_CLS_COR",
        "TRSF_OPEN_KG",
        "TRSF_CLOSE_KG",
        "TRSFTRID_TRSA_ID"
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "TRSA_REVERSE_FLAG" => 1,
        "IS_INJECTOR" => "Y"
    );

    //SCRIPT_NAME: /cgi-bin/en/load_scheds/trans_cur_list.cgi
    //REQUEST: sess_id=&cmpy_typ_id=-1&cmpyCd=-1&tankTerm=P251&bay_code=BAY999&op=13&trans_id=9000880&tk=Generic+Nom+Vol&callerTyp=flex
    public function close_trsa()
    {
        if (!isset($this->trsa_id)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: trsa_id not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $this->commit_mode = OCI_NO_AUTO_COMMIT;

        $query = "SELECT COUNT(*) CN FROM TRANSACTIONS WHERE TRSA_ID = :trsa_id ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trsa_id', $this->trsa_id);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['CN'] <= 0) {
            $error = new EchoSchema(500, response("__NOT_EXIST__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $query = "SELECT COUNT(*) CN FROM TRANSACTIONS
            WHERE TRSA_ID = :trsa_id AND TRSA_ED_DMY IS NOT NULL";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trsa_id', $this->trsa_id);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['CN'] > 0) {
            $error = new EchoSchema(500, response("__TRANSACTION_ALREADY_ENDED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $query = "UPDATE TRANSACTIONS
            SET TRSA_ED_DMY = SYSDATE
            WHERE TRSA_ID = :trsa_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trsa_id', $this->trsa_id);

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $query = "UPDATE SCHEDULE
            SET STATS = 'A'
            WHERE SHLSLOAD_LOAD_ID = (SELECT TRSALDID_LOAD_ID FROM TRANSACTIONS WHERE TRSA_ID = :trsa_id)
                AND STATS = 'L'";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trsa_id', $this->trsa_id);

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = sprintf("User %s ended transaction %d", Utilities::getCurrPsn(), $this->trsa_id);
        if (!$journal->jnlLogEvent(Lookup::TMM_TEXT_ONLY, $jnl_data,
            JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);

            $error = new EchoSchema(500, response("__JOURNAL_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);

            oci_rollback($this->conn);
            
            return;
        }

        oci_commit($this->conn);

        $error = new EchoSchema(200, response("__TRANSACTION_ENDED__",
            sprintf("Transaction %s ended", $this->trsa_id)));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }

    public function get_meter_details()
    {
        $query = "
            SELECT * FROM GUI_METER_DETAILS 
            WHERE TRSFTRID_TRSA_ID = :trsa_id 
            ORDER BY TRSB_METER ASC";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trsa_id', $this->trsa_id);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_trsa_details()
    {
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);
        
        $query = "
            SELECT * FROM GUI_TRANSACTION_DETAILS 
            WHERE TRSFTRID_TRSA_ID = :trsa_id 
            ORDER BY TRSF_ID ASC";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trsa_id', $this->trsa_id);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function search()
    {
        // write_log(json_encode($this), __FILE__, __LINE__);

        if (isset($this->trsa_id)) {
            $trsa_id = '%' . $this->trsa_id . '%';
        } else {
            $trsa_id = '%';
        }

        $query = "
            SELECT * FROM " . $this->VIEW_NAME . "
            WHERE TRSA_ID LIKE :trsa_id " ;

        if (isset($this->trsa_trip)) {
            $query = $query . " AND TRSA_TRIP LIKE :trsa_trip";
        }

        if (isset($this->trsa_tanker)) {
            $query = $query . " AND TRSA_TANKER LIKE :trsa_tanker";
        }

        if (isset($this->load_id)) {
            $query = $query . " AND LOAD_ID LIKE :load_id";
        }

        $query = $query . " ORDER BY TRSA_ST_DMY DESC";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trsa_id', $trsa_id);

        if (isset($this->trsa_trip)) {
            $trsa_trip = '%' . $this->trsa_trip . '%';
            oci_bind_by_name($stmt, ':trsa_trip', $trsa_trip);
        }

        if (isset($this->trsa_tanker)) {
            $trsa_tanker = '%' . $this->trsa_tanker . '%';
            oci_bind_by_name($stmt, ':trsa_tanker', $trsa_tanker);
        }

        if (isset($this->load_id)) {
            $load_id = '%' . $this->load_id . '%';
            oci_bind_by_name($stmt, ':load_id', $load_id);
        }
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read()
    {
        if (!isset($this->start_date)) {
            $query = "
                SELECT * FROM " . $this->VIEW_NAME . "
                WHERE TRSA_ST_DMY > TO_CHAR(SYSDATE - 7, 'YYYY-MM-DD HH24:MI:SS')
                ORDER BY TRSA_ST_DMY DESC";
            $stmt = oci_parse($this->conn, $query);
        
        } else {
            $query = "
                SELECT * FROM " . $this->VIEW_NAME . "
                WHERE TRSA_ST_DMY > :start_date AND TRSA_ST_DMY < :end_date
                ORDER BY TRSA_ST_DMY DESC";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
        }
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // public function read_hook(&$hook_item)
    // {
    //     write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
    //         __FILE__, __LINE__);

    //     $result = array();
    //     $hook_item['transfers'] = $result;
    //     // write_log(json_encode($hook_item), __FILE__, __LINE__);

    //     if (!array_key_exists('trsa_id', $hook_item)) {
    //         write_log("hook_item does not have trsa_id item, cannot do transactions_hook",
    //             __FILE__, __LINE__, LogLevel::ERROR);
    //         return;
    //     }

    //     $query = "
    //         SELECT * FROM GUI_TRANSACTION_DETAILS 
    //         WHERE TRSFTRID_TRSA_ID = :trsa_id
    //         ORDER BY TRSFTRID_TRSA_ID
    //     ";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':trsa_id', $hook_item['trsa_id']);
    //     if (!oci_execute($stmt, $this->commit_mode)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return;
    //     }

    //     Utilities::retrieve($result, $this, $stmt, $method=__FUNCTION__);
    //     $hook_item['transfers'] = $result;
    // }

    // public function read_hook_hook(&$hook_item)
    // {
    //     write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
    //         __FILE__, __LINE__);

    //     $result = array();
    //     $hook_item['base_prods'] = $result;
    //     // write_log(json_encode($hook_item), __FILE__, __LINE__);

    //     if (!array_key_exists('trsf_id', $hook_item)) {
    //         write_log("hook_item does not have mv_id item, cannot do transactions_hook",
    //             __FILE__, __LINE__, LogLevel::ERROR);
    //         return;
    //     }

    //     $query = "
    //         SELECT TRANBASE.TRSB_CVL, TRANBASE.TRSB_AVL, TRANBASE.TRSB_TMP, TRANBASE.TRSB_DNS, TRANBASE.TRSB_TMP_F, 
    //             TRANBASE.TRSB_API, TRANBASE.TRSB_TK_TANKCODE, TRANBASE.TRSB_KG, TRANBASE.TRSB_UNT, BASE_PRODS.BASE_CODE, 
    //             BASE_PRODS.BASE_NAME , BASE_PRODS.BASE_CAT
    //         FROM TRANBASE, BASE_PRODS
    //         WHERE BASE_PRODS.BASE_CODE = TRANBASE.TRSB_BS AND 
    //             TRANBASE.TRSB_ID_TRSF_ID = :trsf_id
    //         ORDER BY BASE_PRODS.BASE_CAT DESC
    //     ";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':trsf_id', $hook_item['trsf_id']);
    //     if (!oci_execute($stmt, $this->commit_mode)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return;
    //     }

    //     //The last $method parameter need to be NonExistHook to prevent 
    //     Utilities::retrieve($result, $this, $stmt, $method='NonExistHook');
    //     $hook_item['base_prods'] = $result;

    //     //Another hook
    //     $result = array();
    //     $hook_item['meters'] = $result;
        
    //     $query = "
    //         SELECT MIN(TRSB_OPN_AMB) TRSB_OPN_AMB,
    //             MIN(TRSB_OPN_COR) TRSB_OPN_COR,
    //             MIN(TRSB_OPN_KG) TRSB_OPN_KG,
    //             MAX(TRSB_CLS_AMB) TRSB_CLS_AMB, 
    //             MAX(TRSB_CLS_COR) TRSB_CLS_COR,
    //             MAX(TRSB_CLS_KG) TRSB_CLS_KG,
    //             TRSB_METER,
    //             TRSB_ID_TRSF_ID
    //         FROM TRANBASE
    //         WHERE TRSB_ID_TRSF_ID = :trsf_id
    //             AND TRSB_INJECTOR IS NULL
    //         GROUP BY TRSB_METER, TRSB_ID_TRSF_ID
    //         ORDER BY TRSB_METER
    //     ";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':trsf_id', $hook_item['trsf_id']);
    //     if (!oci_execute($stmt, $this->commit_mode)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return;
    //     }

    //     //The last $method parameter need to be NonExistHook to prevent 
    //     Utilities::retrieve($result, $this, $stmt, $method='NonExistHook');
    //     $hook_item['meters'] = $result;
    // }
}
