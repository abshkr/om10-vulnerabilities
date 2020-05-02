<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/lang_service.php';
include_once 'common_class.php';

//Old php: amf ComplianceMessageGroupService.php
class ComplianceGroup extends CommonClass
{
    protected $TABLE_NAME = 'COMPLIANCE_PRODGROUP_2_MSG';
    protected $VIEW_NAME = 'COMPLIANCE_PRODGROUP_2_MSG';

    public $BOOLEAN_FIELDS = array(
        "CM_REQ_WHOLE_LD" => 1,
    );

    //Because base cannot be too many, do not do limit
    public function read()
    {
        $query = "SELECT 
                CPM_PGR_CODE,
                PG.PGR_DESCRIPTION,
                PGR_CODE || ' - ' || PGR_DESCRIPTION AS CPM_GROUP_DESC,
                GM.CPM_MSG_ID,
                CM.CM_MSG_NAME,
                CM.CM_MSG_ID||' - '||CM.CM_MSG_NAME AS CPM_MESSAGE_DESC,
                CM.CM_REQ_WHOLE_LD,
                CM.CM_MSG,
                CM.CM_LOCALE,
                LOCALE_NAME
            FROM COMPLIANCE_PRODGROUP_2_MSG GM,
                PRODUCT_GROUP PG,
                COMPLIANCE_MSG CM, 
                LOCALE_LANGUAGES
            WHERE GM.CPM_PGR_CODE = PG.PGR_CODE
                AND GM.CPM_MSG_ID = CM.CM_MSG_ID
                AND CM.CM_LOCALE = LOCALE_CODE(+)";
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
