<?php

include_once __DIR__ . '/../shared/log.php';

class AreaService
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
            SELECT AREA_K,
                AREA_NAME
            FROM AREA_RC
            ORDER BY AREA_K";
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
