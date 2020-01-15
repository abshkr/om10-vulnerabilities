<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class ComplianceMsg extends CommonClass
{
    protected $TABLE_NAME = 'COMPLIANCE_MSG';
    protected $VIEW_NAME = 'COMPLIANCE_MSG';

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "CM_REQ_WHOLE_LD" => 1,
    );
    

    //Because base cannot be too many, do not do limit
    public function read()
    {
        Utilities::sanitize($this);

        $query = "
            SELECT * 
            FROM COMPLIANCE_MSG
            ORDER BY CM_MSG_ID";
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
