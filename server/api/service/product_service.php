<?php

include_once __DIR__ . '/../shared/log.php';

class ProductService
{
    public function __construct($db, $cmpy_code = null, $auto_commit = false)
    {
        $this->conn = $db;
        $this->cmpy_code = $cmpy_code;
        $this->auto_commit = $auto_commit;

        if ($this->auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
    }

    public function products()
    {
        $query = "
            SELECT PROD_CODE, PROD_NAME
            FROM PRODUCTS
            WHERE PROD_CMPY = :prod_cmpy
            ORDER BY PROD_CODE";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prod_cmpy', $this->cmpy_code);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
