<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/eqpt_service.php';
include_once 'common_class.php';

class GatePermission extends CommonClass
{
    private $rules_query = "
        SELECT PR.PRMSSN_K RULE_ID, 
            DECODE(PR.PRMSSN_CASE, 'DEFAULT_EQUIP', 'PRM_EQPT', 
                'DEFAULT_PERSONNEL', 'PRM_PRSSNL', 
                PR.PRMSSN_CASE) RULE_CASE, 
            DECODE(PR.PRMSSN_CASE, 
                'DEFAULT_EQUIP', 'Equip', 
                'PRM_EQPT', 'Equip', 
                'DEFAULT_PERSONNEL', 'Personnel', 
                'PRM_PRSSNL', 'Personnel') RULE_CASENAME, 
            DECODE(PR.PRMSSN_CASE, 'DEFAULT_EQUIP', -999, PR.PRMSSN_ETYP) RULE_ETYP, 
            DECODE(PR.PRMSSN_CASE, 'DEFAULT_EQUIP', 'ANY', ET.ETYP_TITLE) RULE_ETYPNAME, 
            PR.PRMSSN_AUTH RULE_AUTH, 
            DECODE(PR.PRMSSN_CASE, 'DEFAULT_PERSONNEL', 'ANY', RT.AUTH_LEVEL_NAME) RULE_AUTHNAME, 
            1 RULE_FIRST, 
            PR.PRMSSN_K RULE_PARENT, 
            NVL(PR.PRMSSN_EXPIRY_CHECK,0) RULE_EXPIRY_CHECK
        FROM PRMSSN_RC PR, EQUIP_TYPES ET, AUTH_LEVEL_TYP RT
        WHERE PR.PRMSSN_AUTH = RT.AUTH_LEVEL_ID(+)
            AND PR.PRMSSN_ETYP = ET.ETYP_ID(+)
            AND PR.PRMSSN_K = :prmssn_k
        UNION
        SELECT PR.PRMT_K RULE_ID,
            DECODE(PR.PRMT_CLASS, 'DEFAULT_EQUIP', 'PRM_EQPT', 
                'DEFAULT_PERSONNEL', 'PRM_PRSSNL', 
                PR.PRMT_CLASS) RULE_CASE, 
            DECODE(PR.PRMT_CLASS, 
                'DEFAULT_EQUIP', 'Equip',
                'PRM_EQPT', 'Equip',
                'DEFAULT_PERSONNEL', 'Personnel',
                'PRM_PRSSNL', 'Personnel'
            ) RULE_CASENAME,
            DECODE(PR.PRMT_CLASS, 'DEFAULT_EQUIP', -999, PR.PRMT_ETP) RULE_ETYP,
            DECODE(PR.PRMT_CLASS, 'DEFAULT_EQUIP', 'ANY', ET.ETYP_TITLE) RULE_ETYPNAME,
            PR.PRMT_AUTH RULE_AUTH,
            DECODE(PR.PRMT_CLASS, 'DEFAULT_PERSONNEL', 'ANY', RT.AUTH_LEVEL_NAME) RULE_AUTHNAME,
            0 RULE_FIRST,
            PR.PRMT_PRMSSN RULE_PARENT,
            NVL(PR.PRMT_EXPIRY_CHECK,0) RULE_EXPIRY_CHECK
        FROM PRMT_RC PR, EQUIP_TYPES ET, AUTH_LEVEL_TYP RT
        WHERE PR.PRMT_AUTH = RT.AUTH_LEVEL_ID(+)
            AND PR.PRMT_ETP = ET.ETYP_ID(+)
            AND PR.PRMT_PRMSSN = :prmssn_k";

    protected $TABLE_NAME = 'PRMSSN_RC';
    protected $VIEW_NAME = 'PRMSSN_RC';

    public $NUMBER_FIELDS = array(
        "RULE_PARENT",
    );

    public $BOOLEAN_FIELDS = array(
        "PRMSSN_ADV_LOCKOUT" => "Y",
        "PRMSSN_ADV_PIN_PASS" => "Y",
        "PRMSSN_EXPIRY_CHECK" => 1,
        "RULE_FIRST" => 1,
        "RULE_EXPIRY_CHECK" => 1,
    );

    protected $table_view_map = array(
        
    );
    
    public function read()
    {
        $query = "
        SELECT 
            PRMSSN_K,
            PRMSSN_NAME,
            PRMSSN_CASE,
            PRMSSN_AUTH,
            PRMSSN_ETYP,
            NVL(PRMSSN_EXPIRY_CHECK, 0) PRMSSN_EXPIRY_CHECK,
            GATE_K PRMSSN_GATE,
            G_TCD PRMSSN_GATETCD,
            AREA_K PRMSSN_AREAID,
            AREA_NAME PRMSSN_AREANAME,
            ADV_CODE PRMSSN_ADV_CODE,
            ADV_DEVICE PRMSSN_ADV_DEVICE,
            ADV_PORT PRMSSN_ADV_PORT,
            ADV_LOCKOUT PRMSSN_ADV_LOCKOUT,
            ADV_PIN_PASS PRMSSN_ADV_PIN_PASS
        FROM 
            PRMSSN_RC,
            GATE_RC,
            AREA_RC,
            ACCDEV
        WHERE PRMSSN_GATE = GATE_K
            AND GATE_AREA = AREA_K
            AND GATE_DVCE = ADV_CODE
        ORDER BY PRMSSN_K";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    private function get_enum_text()
    {
        $query = "
			select MSG_ID, MESSAGE from MSG_LOOKUP 
			where 
				MSG_ID IN (147, 183, 1900)  
				and (LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG')) 
        ";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            return null;
        }

        $rows = array();
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $rows[] = $row;
        }

        return $rows;
    }

    private function make_rules_query()
    {
		$pmsg = $this->get_enum_text();
		
		$any_psnl = "Personnel";
		$any_eqpt = "Transport Equipment";
		$any_text = "ANY";
		
		foreach( $pmsg as $row ) {
			if ( $row['MSG_ID'] == 147 ) {
				$any_psnl = $row['MESSAGE'];
			}
			if ( $row['MSG_ID'] == 183 ) {
				$any_eqpt = $row['MESSAGE'];
			}
			if ( $row['MSG_ID'] == 1900 ) {
				$any_text = $row['MESSAGE'];
			}
        }
        
        $query = "
            SELECT PR.PRMSSN_K RULE_ID, 
                DECODE(PR.PRMSSN_CASE, 'DEFAULT_EQUIP', 'PRM_EQPT', 
                    'DEFAULT_PERSONNEL', 'PRM_PRSSNL', 
                    PR.PRMSSN_CASE) RULE_CASE, 
                DECODE(PR.PRMSSN_CASE, 
                    'DEFAULT_EQUIP', '$any_eqpt', 
                    'PRM_EQPT', '$any_eqpt', 
                    'DEFAULT_PERSONNEL', '$any_psnl', 
                    'PRM_PRSSNL', '$any_psnl') RULE_CASENAME, 
                DECODE(PR.PRMSSN_CASE, 'DEFAULT_EQUIP', -999, PR.PRMSSN_ETYP) RULE_ETYP, 
                DECODE(PR.PRMSSN_CASE, 'DEFAULT_EQUIP', '$any_text', ET.ETYP_TITLE) RULE_ETYPNAME, 
                PR.PRMSSN_AUTH RULE_AUTH, 
                DECODE(PR.PRMSSN_CASE, 'DEFAULT_PERSONNEL', '$any_text', RT.AUTH_LEVEL_NAME) RULE_AUTHNAME, 
                1 RULE_FIRST, 
                PR.PRMSSN_K RULE_PARENT, 
                NVL(PR.PRMSSN_EXPIRY_CHECK,0) RULE_EXPIRY_CHECK
            FROM PRMSSN_RC PR, EQUIP_TYPES ET, AUTH_LEVEL_TYP RT
            WHERE PR.PRMSSN_AUTH = RT.AUTH_LEVEL_ID(+)
                AND PR.PRMSSN_ETYP = ET.ETYP_ID(+)
                AND PR.PRMSSN_K = :prmssn_k
            UNION
            SELECT PR.PRMT_K RULE_ID,
                DECODE(PR.PRMT_CLASS, 'DEFAULT_EQUIP', 'PRM_EQPT', 
                    'DEFAULT_PERSONNEL', 'PRM_PRSSNL', 
                    PR.PRMT_CLASS) RULE_CASE, 
                DECODE(PR.PRMT_CLASS, 
                    'DEFAULT_EQUIP', '$any_eqpt',
                    'PRM_EQPT', '$any_eqpt',
                    'DEFAULT_PERSONNEL', '$any_psnl',
                    'PRM_PRSSNL', '$any_psnl'
                ) RULE_CASENAME,
                DECODE(PR.PRMT_CLASS, 'DEFAULT_EQUIP', -999, PR.PRMT_ETP) RULE_ETYP,
                DECODE(PR.PRMT_CLASS, 'DEFAULT_EQUIP', '$any_text', ET.ETYP_TITLE) RULE_ETYPNAME,
                PR.PRMT_AUTH RULE_AUTH,
                DECODE(PR.PRMT_CLASS, 'DEFAULT_PERSONNEL', '$any_text', RT.AUTH_LEVEL_NAME) RULE_AUTHNAME,
                0 RULE_FIRST,
                PR.PRMT_PRMSSN RULE_PARENT,
                NVL(PR.PRMT_EXPIRY_CHECK,0) RULE_EXPIRY_CHECK
            FROM PRMT_RC PR, EQUIP_TYPES ET, AUTH_LEVEL_TYP RT
            WHERE PR.PRMT_AUTH = RT.AUTH_LEVEL_ID(+)
                AND PR.PRMT_ETP = ET.ETYP_ID(+)
                AND PR.PRMT_PRMSSN = :prmssn_k
        ";

        return $query;
    }

    public function read_hook(&$hook_item)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $result = array();
        $hook_item['rules'] = $result;
        // write_log(json_encode($hook_item), __FILE__, __LINE__);

        if (!array_key_exists('prmssn_k', $hook_item)) {
            write_log("hook_item does not have prmssn_id item, cannot do read_hook",
                __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $stmt = oci_parse($this->conn, $this->make_rules_query()); // rules_query);
        oci_bind_by_name($stmt, ':prmssn_k', $hook_item['prmssn_k']);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        //The last $method parameter need to be NonExistHook to prevent 
        Utilities::retrieve($result, $this, $stmt, $method='NonExistHook');
        $hook_item['rules'] = $result;
    }

    protected function retrieve_children_data()
    {
        $stmt = oci_parse($this->conn, $this->make_rules_query()); // rules_query);
        oci_bind_by_name($stmt, ':prmssn_k', $this->prmssn_k);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $children = array();
        while ($flow_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $children[$flow_row['RULE_ID']] = $flow_row;
            // array_push($tank_max_flows, $base_item);
        }

        // write_log(json_encode($tank_max_flows), __FILE__, __LINE__);
        return $children;
    }

    protected function delete_children()
    {
        write_log(sprintf("%s::%s() START, prmssn_k:%d", __CLASS__, __FUNCTION__, $this->prmssn_k),
            __FILE__, __LINE__);

        $query = "
            DELETE FROM PRMT_RC
            WHERE PRMT_PRMSSN = :prmt_k";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prmt_k', $this->prmssn_k);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        return true;
    }

    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (isset($this->rules)) {
            $lineno = 1;
            foreach ($this->rules as $value) {
                // write_log($lineno, __FILE__, __LINE__);
                // write_log(json_encode($value), __FILE__, __LINE__);
                if ($lineno == 1) {
                    $query = "
                        UPDATE PRMSSN_RC 
                        SET PRMSSN_CASE = :prmssn_case, 
                            PRMSSN_ETYP = :prmssn_etyp,
                            PRMSSN_AUTH = :prmssn_auth,
                            PRMSSN_EXPIRY_CHECK = :prmssn_expiry_check
                        WHERE PRMSSN_K = :prmssn_k
                    ";
                    $prmt_k = $value->rule_parent * 1000 + $lineno;
                    $stmt = oci_parse($this->conn, $query);
                    oci_bind_by_name($stmt, ':prmssn_k', $value->rule_id);
                    oci_bind_by_name($stmt, ':prmssn_case', $value->rule_case);
                    oci_bind_by_name($stmt, ':prmssn_auth', $value->rule_auth);
                    oci_bind_by_name($stmt, ':prmssn_etyp', $value->rule_etyp);
                    oci_bind_by_name($stmt, ':prmssn_expiry_check', $value->rule_expiry_check);
    
                    if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                        throw new DatabaseException($e['message']);
                        return false;
                    }

                    $lineno += 1;
                    continue;
                }

                write_log(json_encode($value), __FILE__, __LINE__);

                $query = "INSERT INTO PRMT_RC (
                    PRMT_K,
                    PRMT_PRMSSN,
                    PRMT_CLASS,
                    PRMT_AUTH,
                    PRMT_ETP,
                    PRMT_PSEQ,
                    PRMT_EXPIRY_CHECK)
                VALUES (
                    :prmt_k,
                    :prmt_prmssn,
                    :prmt_class,
                    :prmt_auth,
                    :prmt_etp,
                    :prmt_pseq,
                    :prmt_expiry_check
                )";
                $prmt_k = $value->rule_parent * 1000 + $lineno;
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':prmt_k', $prmt_k);
                oci_bind_by_name($stmt, ':prmt_prmssn', $value->rule_parent);
                oci_bind_by_name($stmt, ':prmt_class', $value->rule_case);
                oci_bind_by_name($stmt, ':prmt_auth', $value->rule_auth);
                oci_bind_by_name($stmt, ':prmt_etp', $value->rule_etyp);
                oci_bind_by_name($stmt, ':prmt_pseq', $lineno);
                oci_bind_by_name($stmt, ':prmt_expiry_check', $value->rule_expiry_check);

                if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    throw new DatabaseException($e['message']);
                    return false;
                }

                $lineno += 1;
            }
        }

        return true;
    }

    protected function journal_children_change($journal, $old, $new)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        // write_log(json_encode($old), __FILE__, __LINE__);
        // write_log(json_encode($new), __FILE__, __LINE__);

        $module = $this->VIEW_NAME;
        foreach ($old as $rule_id => $rule) {
            if (isset($new[$rule_id]) &&
                $rule['RULE_CASE'] != $new[$rule_id]['RULE_CASE']) {
                $record = sprintf("permission rule id:%s", $rule_id);
                $journal->valueChange($module, $record, "RULE_CASE", $rule['RULE_CASENAME'], $new[$rule_id]['RULE_CASENAME']);
            }

            if (isset($new[$rule_id]) &&
                $rule['RULE_ETYP'] != $new[$rule_id]['RULE_ETYP']) {
                $record = sprintf("permission rule id:%s", $rule_id);
                $journal->valueChange($module, $record, "RULE_ETYP", $rule['RULE_ETYPNAME'], $new[$rule_id]['RULE_ETYPNAME']);
            }

            if (isset($new[$rule_id]) &&
                $rule['RULE_AUTH'] != $new[$rule_id]['RULE_AUTH']) {
                $record = sprintf("permission rule id:%s", $rule_id);
                $journal->valueChange($module, $record, "RULE_AUTH", $rule['RULE_AUTHNAME'], $new[$rule_id]['RULE_AUTHNAME']);
            }

            if (isset($new[$rule_id]) &&
                $rule['RULE_EXPIRY_CHECK'] != $new[$rule_id]['RULE_EXPIRY_CHECK']) {
                $record = sprintf("permission rule id:%s", $rule_id);
                $journal->valueChange($module, $record, "RULE_EXPIRY_CHECK", $rule['RULE_EXPIRY_CHECK'], $new[$rule_id]['RULE_EXPIRY_CHECK']);
            }

            if (!isset($new[$rule_id])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("permission rule id:%s", $rule_id);
                $jnl_data[3] = "";

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
        foreach ($new as $rule_id => $rule) {
            if (!isset($old[$rule_id])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("permission rule id:%s", $rule_id);
                $jnl_data[3] = "";

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

    private function next_id()
    {
        $query = "SELECT NVL(MAX(PRMSSN_K), 0) + 1 NEXT_NO
            FROM PRMSSN_RC";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['NEXT_NO'];
    }

    public function next_prm_id()
    {
        $query = "SELECT NVL(MAX(PRMSSN_K), 0) + 1 NEXT_PRM_ID
            FROM PRMSSN_RC";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function pre_create()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        if (!isset($this->prmssn_k)) {
            $this->prmssn_k = $this->next_id();
        }

        return $this->pre_update();
    }

    public function pre_update()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
    
        //Because -999 is in read.php, and for ReactJs use, In db, it is NULL. 
        write_log(json_encode($this->rules), __FILE__, __LINE__);
        foreach ($this->rules as $i => $rule) {
            if ($this->rules[$i]->rule_etyp == "-999" || $this->rules[$i]->rule_etyp == "") {
                $this->rules[$i]->rule_etyp = "";
                if ($this->rules[$i]->rule_case == "PRM_EQPT") {
                    write_log("Changed default equip", __FILE__, __LINE__);
                    $this->rules[$i]->rule_case = "DEFAULT_EQUIP";
                }
            }

            if ($this->rules[$i]->rule_auth == "999") {
                if ($this->rules[$i]->rule_case == "PRM_PRSSNL") {
                    write_log("Changed default personnel", __FILE__, __LINE__);
                    $this->rules[$i]->rule_case = "DEFAULT_PERSONNEL";
                }
            }

            // foreach ($rule as $key => $value) {
            //     if ($key == "rule_etyp" && $value == "-999") {
            //         $this->rules[$i]->rule_etyp = "";
            //     }

            // }
        }
        write_log(json_encode($this->rules), __FILE__, __LINE__);
    }

    public function delete_rule()
    {
        write_log(sprintf("%s::%s() START, rule_id:%d", __CLASS__, __FUNCTION__, $this->rule_id),
            __FILE__, __LINE__);

        $query = "
            SELECT COUNT(*) CN FROM PRMT_RC
            WHERE PRMT_K = :prmt_k";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prmt_k', $this->rule_id);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);

            $error = new EchoSchema(400, response("__DELETE_FAILED__", 
                sprintf("failed to delete rule id %s. err: %s", $this->rule_id, $e['message'])));
            echo json_encode($error, JSON_PRETTY_PRINT);
            oci_rollback($this->conn);

            return;
        } else {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            if ($row['CN'] <= 0) {
                write_log(sprintf("permission rule %d not found", $this->rule_id), LogLevel::WARNING);

                $error = new EchoSchema(400, response("__NOT_EXIST__", sprintf("permission rule %d not found", $this->rule_id)));
                echo json_encode($error, JSON_PRETTY_PRINT);

                oci_rollback($this->conn);

                return; 
            }
        }

        $query = "
            DELETE FROM PRMT_RC
            WHERE PRMT_K = :prmt_k";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prmt_k', $this->rule_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(500, response("__DATABASE_EXCEPTION__", "Database Error: " . $e->getMessage()));
            echo json_encode($error, JSON_PRETTY_PRINT);

            oci_rollback($this->conn);

            return;
        } else {
            $result = array();
            $result["result"] = 0;
            $result["message"] = sprintf("rule id %s has been deleted", $this->rule_id);

            $journal = new Journal($this->conn, false);
            $jnl_data[0] = Utilities::getCurrPsn();
            $jnl_data[1] = $this->VIEW_NAME;;
            $jnl_data[2] = sprintf("permission rule id:%s", $this->rule_id);
            $jnl_data[3] = "";

            if (!$journal->jnlLogEvent(
                Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'],
                    __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return;
            }

            oci_commit($this->conn);
        }

        echo json_encode($result, JSON_PRETTY_PRINT);
    }

    public function rule_cases()
    {
        // $query = "
        //     SELECT 'DEFAULT_PERSONNEL' CASE_CODE, 'Default Personnel' CASE_NAME FROM DUAL
        //     UNION 
        //     SELECT 'PRM_PRSSNL' CASE_CODE, 'Personnel' CASE_NAME FROM DUAL
        //     UNION 
        //     SELECT 'DEFAULT_EQUIP' CASE_CODE, 'Default Equip' CASE_NAME FROM DUAL
        //     UNION 
        //     SELECT 'PRM_EQPT' CASE_CODE, 'Default Equip' CASE_NAME FROM DUAL
        //     ";
        // $query = "
        //     select 
        //         DECODE( MSG_ID, 147, 1, 183, 2, 0 )									as PERMISSION_CLASS_ID
        //         , DECODE( MSG_ID, 147, 'PERSONNEL|DEFAULT_PERSONNEL|PRM_PRSSNL', 183, 'EQUIPMENT|DEFAULT_EQUIP|PRM_EQPT', ' ' )			
        //                                                                             as PERMISSION_CLASS_CODE
        //         , MESSAGE 															as PERMISSION_CLASS_NAME 
        //     from 
        //         MSG_LOOKUP 
        //     where 
        //         (MSG_ID=147 or MSG_ID=183 )  
        //         and (LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG')) 
        // ";

        $query = "
            select 
                DECODE( MSG_ID, 147, 1, 183, 2, 0 )									as CASE_ID
                , DECODE( MSG_ID, 147, 'PRM_PRSSNL', 183, 'PRM_EQPT', ' ' )			as CASE_CODE
                , MESSAGE 															as CASE_NAME 
            from 
                MSG_LOOKUP 
            where 
                (MSG_ID=147 or MSG_ID=183 )  
                and (LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG')) 
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

    public function eqpt_types()
    {
        $serv = new EqptService($this->conn);
        return $serv->eqpt_types();
    }
}