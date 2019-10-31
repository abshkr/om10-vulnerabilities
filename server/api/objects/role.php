<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class Role extends CommonClass
{
    protected $TABLE_NAME = 'URBAC_ROLES';
    protected $primary_keys = array("role_id");

    public function read()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "
        SELECT URBAC_ROLES.ROLE_ID, ROLE_CODE, ROLE_TEXT, ROLE_NOTE, ROLE_STATUS
        FROM URBAC_ROLES, URBAC_USER_ROLES, URBAC_USERS
        WHERE URBAC_USERS.USER_ID = URBAC_USER_ROLES.USER_ID
            AND URBAC_ROLES.ROLE_ID = URBAC_USER_ROLES.ROLE_ID
            AND URBAC_USERS.USER_CODE = :user_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':user_code', $this->user_code);
        if (oci_execute($stmt)) {
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
        $hook_item['privilege'] = $result;
        if (!array_key_exists('role_id', $hook_item)) {
            write_log("hook_item does not have role_id item, cannot do read_hook",
                __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $query = "
        SELECT A.DOMAIN_ID, DOMAIN_TEXT, A.OBJECT_ID, OBJECT_TEXT, DOMAIN_OBJECT_ACTIVE,
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
        oci_bind_by_name($stmt, ':role_id', $hook_item['role_id']);
        if (!oci_execute($stmt)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        Utilities::retrieve($result, $hook_item, $stmt);
        $hook_item['privilege'] = $result;
    }
}
