<?php

include_once __DIR__ . '/../shared/log.php';

class RoleService
{
    public function __construct($db, $auto_commit = false)
    {
        $this->conn = $db;
        $this->auto_commit = $auto_commit;

        if ($this->auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
    }

    public function dropdown_role_types($include_any = true)
    {
        if ($include_any) {
            $query = "
            SELECT ROLE_ID, AUTH_LEVEL_NAME 
            FROM
            (
                SELECT 999 ROLE_ID, 'ANY' AUTH_LEVEL_NAME, 1 UNION_ROW FROM DUAL
                UNION 
                SELECT 
                    ROLE_ID,
                    AUTH_LEVEL_NAME,
                    2 UNION_ROW
                FROM URBAC_ROLES,
                    AUTH_LEVEL_TYP
                WHERE ROLE_ID = AUTH_LEVEL_ID
                ORDER BY UNION_ROW, ROLE_ID
            )";
        } else {
            $query = "
                SELECT 
                    ROLE_ID,
                    AUTH_LEVEL_NAME
                FROM URBAC_ROLES,
                    AUTH_LEVEL_TYP
                WHERE ROLE_ID = AUTH_LEVEL_ID
                ORDER BY ROLE_ID";
        }
        
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
