<?php

include_once __DIR__ . '/../shared/log.php';

class BaseService
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

    public function read_brief()
    {
        $query = "
            SELECT BASE_CODE,
                BASE_NAME,
                BCLASS_NO,
                BCLASS_DESC,
                BCLASS_DENS_LO,
                BCLASS_DENS_HI,
                BASE_CODE || ' - ' || BASE_NAME || '(' || BCLASS_DESC || ')' BASE_DETAIL
            FROM BASE_PRODS, BASECLASS 
            where BASE_CAT = BCLASS_NO(+)
            ORDER BY BASE_CODE";
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
