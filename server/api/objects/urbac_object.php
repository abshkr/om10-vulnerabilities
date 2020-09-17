<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class UrbacObject extends CommonClass
{
    protected $TABLE_NAME = 'URBAC_OBJECTS';
    protected $VIEW_NAME = 'URBAC_OBJECTS';
    //protected $VIEW_NAME = 'DB_ADDRESS_LINE';
    
    public $BOOLEAN_FIELDS = array(
        "RECORD_SWITCH" => 1,
        "DOMAIN_OBJECT_ACTIVE" => 1,
    );

    public function read()
    {
        $query = "
            SELECT URBAC_OBJECTS.OBJECT_ID,
                OBJECT_TEXT,
                NVL(RECORD_SWITCH, 1) RECORD_SWITCH,
                NVL(DOMAIN_OBJECT_ACTIVE, 1) DOMAIN_OBJECT_ACTIVE
            FROM URBAC_OBJECTS, URBAC_DOMAIN_OBJECTS
            WHERE URBAC_OBJECTS.OBJECT_ID = URBAC_DOMAIN_OBJECTS.OBJECT_ID";
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
