<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/lang_service.php';
include_once 'common_class.php';

//Old php: amf ComplianceMessageService.php
class ComplianceMsg extends CommonClass
{
    protected $TABLE_NAME = 'COMPLIANCE_MSG';
    protected $VIEW_NAME = 'COMPLIANCE_MSG';

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "CM_REQ_WHOLE_LD" => 1,
    );
    
    public function languages()
    {
        $serv = new LangService($this->conn);
        return $serv->languages();
    }

    //Because base cannot be too many, do not do limit
    public function read()
    {
        $query = "SELECT 
                CM.CM_MSG_ID,
                CM.CM_MSG_NAME,
                CM.CM_MSG_ID || ' - ' || CM.CM_MSG_NAME AS CM_MESSAGE_DESC,
                CM.CM_REQ_WHOLE_LD,
                CM.CM_MSG,
                CM.CM_LOCALE,
                CL.LOCALE_NAME
            FROM COMPLIANCE_MSG CM, LOCALE_LANGUAGES CL
            WHERE CM.CM_LOCALE = CL.LOCALE_CODE(+)
            ORDER BY CM_MSG_ID";
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
