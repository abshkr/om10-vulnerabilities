<?php

include_once __DIR__ . '/../shared/log.php';

class EqptService
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

    public function dropdown_eqpt_types()
    {
        $query = "
            SELECT -999 ETYP_ID, 'ANY' ETYP_TITLE FROM DUAL
            UNION 
            SELECT EQUIP_TYPES_VW.ETYP_ID, EQUIP_TYPES_VW.ETYP_TITLE 
            FROM EQUIP_TYPES_VW WHERE ETYP_CLASS = 0 
            ORDER BY ETYP_TITLE";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
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
