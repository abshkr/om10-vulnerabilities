<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/role_service.php';
include_once 'common_class.php';

class Role extends CommonClass
{
    protected $TABLE_NAME = 'URBAC_ROLES';
    protected $primary_keys = array("role_code");   //ROLE_ID is a self-increment number

    public $BOOLEAN_FIELDS = array(
        "DOMAIN_OBJECT_ACTIVE" => 1,
        "PRIV_UPDATE" => 1,
        "PRIV_VIEW" => 1,
        "PRIV_CREATE" => 1,
        "PRIV_DELETE" => 1,
        "PRIV_PROTECT" => 1,
        "PRIV_EXTRA" => 1,
        "LOCK_CHECK" => "Y",
        "DELETE_CHECK" => "Y",
    );

    protected $table_view_map = array(
        "" => ""
    );
    
    public function read()
    {
        $query = "
        SELECT 
            ROLE_ID,
            ROLE_CODE,
            ROLE_TEXT           as AUTH_LEVEL_KEY,
            (
                CASE 
                    WHEN AUTH_LEVEL_NAME = ROLE_TEXT 
                    THEN ROLE_TEXT 
                    ELSE ROLE_TEXT||' - '||AUTH_LEVEL_NAME
                END
            )                   as AUTH_LEVEL_NAME,
            ROLE_NOTE,
            ROLE_RANK,
            ROLE_TYPE,
            ROLE_STATUS,
            RECORD_SWITCH,
            RECORD_ORDER,
            LOCK_CHECK,
            DELETE_CHECK
        FROM URBAC_ROLES,
            AUTH_LEVEL_TYP
        WHERE ROLE_ID = AUTH_LEVEL_ID
        ORDER BY ROLE_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function privileges()
    {
        $query = "
            SELECT A.DOMAIN_ID, DOMAIN_TEXT, A.OBJECT_ID, OBJECT_PARENT_ID,
                OBJECT_TEXT, DOMAIN_OBJECT_ACTIVE,
                0 PRIV_VIEW,
                0 PRIV_UPDATE,
                0 PRIV_CREATE,
                0 PRIV_DELETE,
                0 PRIV_PROTECT
            FROM URBAC_DOMAIN_OBJECTS A, URBAC_DOMAINS, URBAC_OBJECTS
            WHERE A.DOMAIN_ID != 1
                AND A.DOMAIN_ID = URBAC_DOMAINS.DOMAIN_ID
                AND A.OBJECT_ID = URBAC_OBJECTS.OBJECT_ID
            ORDER BY DOMAIN_ID, OBJECT_ID";
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
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);

        $result = array();
        $hook_item['privilege'] = $result;
        if (!array_key_exists('role_id', $hook_item)) {
            write_log("hook_item does not have role_id item, cannot do read_hook",
                __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $query = "SELECT A.DOMAIN_ID, DOMAIN_TEXT, A.OBJECT_ID, OBJECT_PARENT_ID,
                    OBJECT_TEXT, DOMAIN_OBJECT_ACTIVE,
                    CASE WHEN (SELECT COUNT(*) FROM URBAC_ROLE_DOMAINS_PRIVILEGES B
                    WHERE ROLE_ID = :role_id AND DOMAIN_ROLE_ACTIVE = 1 AND PRIVILEGE_ID = 1
                        AND B.DOMAIN_ID = A.DOMAIN_ID AND B.OBJECT_ID = A.OBJECT_ID) > 0 THEN 1 ELSE 0 END PRIV_VIEW,
                    CASE WHEN (SELECT COUNT(*) FROM URBAC_ROLE_DOMAINS_PRIVILEGES C
                    WHERE ROLE_ID = :role_id AND DOMAIN_ROLE_ACTIVE = 1 AND PRIVILEGE_ID = 2
                        AND C.DOMAIN_ID = A.DOMAIN_ID AND C.OBJECT_ID = A.OBJECT_ID) > 0 THEN 1 ELSE 0 END PRIV_UPDATE,
                        CASE WHEN (SELECT COUNT(*) FROM URBAC_ROLE_DOMAINS_PRIVILEGES D
                    WHERE ROLE_ID = :role_id AND DOMAIN_ROLE_ACTIVE = 1 AND PRIVILEGE_ID = 3
                        AND D.DOMAIN_ID = A.DOMAIN_ID AND D.OBJECT_ID = A.OBJECT_ID) > 0 THEN 1 ELSE 0 END PRIV_CREATE,
                    CASE WHEN (SELECT COUNT(*) FROM URBAC_ROLE_DOMAINS_PRIVILEGES E
                    WHERE ROLE_ID = :role_id AND DOMAIN_ROLE_ACTIVE = 1 AND PRIVILEGE_ID = 4
                        AND E.DOMAIN_ID = A.DOMAIN_ID AND E.OBJECT_ID = A.OBJECT_ID) > 0 THEN 1 ELSE 0 END PRIV_DELETE,
                    CASE WHEN (SELECT COUNT(*) FROM URBAC_ROLE_DOMAINS_PRIVILEGES F
                    WHERE ROLE_ID = :role_id AND DOMAIN_ROLE_ACTIVE = 1 AND PRIVILEGE_ID = 5
                        AND F.DOMAIN_ID = A.DOMAIN_ID AND F.OBJECT_ID = A.OBJECT_ID) > 0 THEN 1 ELSE 0 END PRIV_PROTECT,
                    CASE WHEN (SELECT COUNT(*) FROM URBAC_ROLE_DOMAINS_PRIVILEGES F
                    WHERE ROLE_ID = :role_id AND DOMAIN_ROLE_ACTIVE = 1 AND PRIVILEGE_ID = 6
                        AND F.DOMAIN_ID = A.DOMAIN_ID AND F.OBJECT_ID = A.OBJECT_ID) > 0 THEN 1 ELSE 0 END PRIV_EXTRA    
                FROM URBAC_DOMAIN_OBJECTS A, URBAC_DOMAINS, URBAC_OBJECTS
                WHERE A.DOMAIN_ID != 1
                    AND A.DOMAIN_ID = URBAC_DOMAINS.DOMAIN_ID
                    AND A.OBJECT_ID = URBAC_OBJECTS.OBJECT_ID
                ORDER BY DOMAIN_ID, OBJECT_ID";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':role_id', $hook_item['role_id']);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        //The last $method parameter need to be set to prevent further invocation
        Utilities::retrieve($result, $this, $stmt, $method = __FUNCTION__);
        $hook_item['privilege'] = $result;
    }

    public function pre_create()
    {
        if (!isset($this->role_text)) {
            $this->role_text = $this->auth_level_name;
        }

        if (!isset($this->role_code)) {
            $query = "SELECT SUBSTR(MAX(ROLE_CODE), 0, 5) || (SUBSTR(MAX(ROLE_CODE), -2) + 1) ROLE_CODE FROM URBAC_ROLES";
            $stmt = oci_parse($this->conn, $query);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return null;
            }

            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $this->role_code = $row['ROLE_CODE'];
        }
    }

    public function pre_update()
    {
        if (!isset($this->role_text)) {
            $this->role_text = $this->auth_level_name;
        }

        if (!isset($this->role_id)) {
            $this->role_id = $this->get_id_by_code();
        }
    }

    public function check_existence()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "SELECT COUNT(*) CN FROM URBAC_ROLES WHERE ROLE_CODE = :role_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':role_code', $this->role_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['CN'] > 0;
    }

    private function get_id_by_code()
    {
        $query = "SELECT ROLE_ID FROM URBAC_ROLES WHERE ROLE_CODE = :role_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':role_code', $this->role_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if (!$row) {
            write_log(sprintf("Failed to find data. role_code:%s", $this->role_code), __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        return $row['ROLE_ID'];
    }

    public function delete()
    {
        $this->role_id = $this->get_id_by_code();
        if ($this->role_id == null) {
            throw new DatabaseException("Cannot find role");
        }

        if ($this->role_id <= 9) {
            throw new DatabaseException("Cannot delete predefined role");
        }

        $query = "
            DELETE FROM URBAC_ROLE_DOMAINS_PRIVILEGES WHERE ROLE_ID = :role_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':role_id', $this->role_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        $query = "
        DELETE FROM URBAC_ROLES WHERE ROLE_ID = :role_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':role_id', $this->role_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "URBAC_ROLES";
        $jnl_data[2] = $this->role_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_DELETE, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    protected function delete_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "
            DELETE FROM URBAC_ROLE_DOMAINS_PRIVILEGES
            WHERE ROLE_ID = :role_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':role_id', $this->role_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        return true;
    }

    private function insert_into_priv($item, $privilege_id) 
    {
        $query = "INSERT INTO URBAC_ROLE_DOMAINS_PRIVILEGES (
            ROLE_ID,
            DOMAIN_ID,
            OBJECT_ID,
            PRIVILEGE_ID,
            DOMAIN_ROLE_ACTIVE)
        VALUES (
            :role_id,
            :domain_id,
            :object_id,
            :privilege_id,
            1
        )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':role_id', $this->role_id);
        oci_bind_by_name($stmt, ':domain_id', $item->domain_id);
        oci_bind_by_name($stmt, ':object_id', $item->object_id);
        oci_bind_by_name($stmt, ':privilege_id', $privilege_id);
        // write_log($this->role_id, __FILE__, __LINE__);
        // write_log($item->domain_id, __FILE__, __LINE__);
        // write_log($item->object_id, __FILE__, __LINE__);
        // write_log($privilege_id, __FILE__, __LINE__);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            throw new DatabaseException($e['message']);
        }
    }

    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (!isset($this->role_id)) {
            $query = "SELECT ROLE_ID FROM URBAC_ROLES WHERE ROLE_CODE = :role_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':role_code', $this->role_code);
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            write_log(json_encode($row), __FILE__, __LINE__);
            $this->role_id = $row['ROLE_ID'];
        }

        if (isset($this->privilege)) {
            $lineno = 1;
            foreach ($this->privilege as $value) {
                if ($value->priv_view == 1) {
                    $this->insert_into_priv($value, 1);
                }

                if ($value->priv_update == 1) {
                    $this->insert_into_priv($value, 2);
                }

                if ($value->priv_create == 1) {
                    $this->insert_into_priv($value, 3);
                }

                if ($value->priv_delete == 1) {
                    $this->insert_into_priv($value, 4);
                }

                if ($value->priv_protect == 1) {
                    $this->insert_into_priv($value, 5);
                }

                if ($value->priv_extra == 1) {
                    $this->insert_into_priv($value, 6);
                }

                $lineno += 1;
            }
        }

        return true;
    }

    protected function retrieve_children_data()
    {
        $query = "SELECT A.DOMAIN_ID, DOMAIN_TEXT, A.OBJECT_ID, OBJECT_TEXT, DOMAIN_OBJECT_ACTIVE,
            (SELECT COUNT(*) FROM URBAC_ROLE_DOMAINS_PRIVILEGES B
            WHERE ROLE_ID = :role_id AND DOMAIN_ROLE_ACTIVE = 1 AND PRIVILEGE_ID = 1
                AND B.DOMAIN_ID = A.DOMAIN_ID AND B.OBJECT_ID = A.OBJECT_ID) PRIV_VIEW,
            (SELECT COUNT(*) FROM URBAC_ROLE_DOMAINS_PRIVILEGES C
            WHERE ROLE_ID = :role_id AND DOMAIN_ROLE_ACTIVE = 1 AND PRIVILEGE_ID = 2
                AND C.DOMAIN_ID = A.DOMAIN_ID AND C.OBJECT_ID = A.OBJECT_ID) PRIV_UPDATE,
            (SELECT COUNT(*) FROM URBAC_ROLE_DOMAINS_PRIVILEGES D
            WHERE ROLE_ID = :role_id AND DOMAIN_ROLE_ACTIVE = 1 AND PRIVILEGE_ID = 3
                AND D.DOMAIN_ID = A.DOMAIN_ID AND D.OBJECT_ID = A.OBJECT_ID) PRIV_CREATE,
            (SELECT COUNT(*) FROM URBAC_ROLE_DOMAINS_PRIVILEGES E
            WHERE ROLE_ID = :role_id AND DOMAIN_ROLE_ACTIVE = 1 AND PRIVILEGE_ID = 4
                AND E.DOMAIN_ID = A.DOMAIN_ID AND E.OBJECT_ID = A.OBJECT_ID) PRIV_DELETE,
            (SELECT COUNT(*) FROM URBAC_ROLE_DOMAINS_PRIVILEGES F
            WHERE ROLE_ID = :role_id AND DOMAIN_ROLE_ACTIVE = 1 AND PRIVILEGE_ID = 5
                AND F.DOMAIN_ID = A.DOMAIN_ID AND F.OBJECT_ID = A.OBJECT_ID) PRIV_PROTECT
        FROM URBAC_DOMAIN_OBJECTS A, URBAC_DOMAINS, URBAC_OBJECTS
        WHERE A.DOMAIN_ID != 1
            AND A.DOMAIN_ID = URBAC_DOMAINS.DOMAIN_ID
            AND A.OBJECT_ID = URBAC_OBJECTS.OBJECT_ID
        ORDER BY DOMAIN_ID, OBJECT_ID";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':role_id', $this->role_id);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $tank_max_flows = array();
        while ($flow_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $tank_max_flows[$flow_row['OBJECT_TEXT']] = $flow_row;
            // array_push($tank_max_flows, $flow_row);
        }

        // write_log(json_encode($tank_max_flows), __FILE__, __LINE__);
        return $tank_max_flows;
    }

    protected function journal_children_change($journal, $old, $new)
    {
        // write_log(json_encode($old), __FILE__, __LINE__);
        // write_log(json_encode($new), __FILE__, __LINE__);

        $module = "URBAC_ROLE_DOMAINS_PRIVILEGES";
        foreach ($old as $OBJECT_ID => $priv) {
            // write_log(sprintf("Check object %s, prev:%s", $OBJECT_ID, $priv['PRIV_VIEW']), __FILE__, __LINE__);
            if ($priv['PRIV_VIEW'] != $new[$OBJECT_ID]['PRIV_VIEW']) {
                $record = sprintf("role code:%s, object:%s",
                    $this->role_code, $priv['OBJECT_TEXT']);
                $journal->valueChange($module, $record, "PRIV_VIEW", $priv['PRIV_VIEW'], $new[$OBJECT_ID]['PRIV_VIEW']);
            }

            if ($priv['PRIV_UPDATE'] != $new[$OBJECT_ID]['PRIV_UPDATE']) {
                $record = sprintf("role code:%s, object:%s",
                    $this->role_code, $priv['OBJECT_TEXT']);
                $journal->valueChange($module, $record, "PRIV_UPDATE", $priv['PRIV_UPDATE'], $new[$OBJECT_ID]['PRIV_UPDATE']);
            }

            if ($priv['PRIV_CREATE'] != $new[$OBJECT_ID]['PRIV_CREATE']) {
                $record = sprintf("role code:%s, object:%s",
                    $this->role_code, $priv['OBJECT_TEXT']);
                $journal->valueChange($module, $record, "PRIV_CREATE", $priv['PRIV_CREATE'], $new[$OBJECT_ID]['PRIV_CREATE']);
            }

            if ($priv['PRIV_DELETE'] != $new[$OBJECT_ID]['PRIV_DELETE']) {
                $record = sprintf("role code:%s, object:%s",
                    $this->role_code, $priv['OBJECT_TEXT']);
                $journal->valueChange($module, $record, "PRIV_DELETE", $priv['PRIV_DELETE'], $new[$OBJECT_ID]['PRIV_DELETE']);
            }

            if ($priv['PRIV_PROTECT'] != $new[$OBJECT_ID]['PRIV_PROTECT']) {
                $record = sprintf("role code:%s, object:%s",
                    $this->role_code, $priv['OBJECT_TEXT']);
                $journal->valueChange($module, $record, "PRIV_PROTECT", $priv['PRIV_PROTECT'], $new[$OBJECT_ID]['PRIV_PROTECT']);
            }
        }
    }

    public function dropdown_role_types()
    {
        $serv = new RoleService($this->conn);
        return $serv->dropdown_role_types();
    }
}