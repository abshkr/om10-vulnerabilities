<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';
include_once __DIR__ . '/../service/company_service.php';

class CompanyTemplate extends CommonClass
{
    protected $TABLE_NAME = 'TEMPLATE_N_CMPY';
    protected $VIEW_NAME = 'TEMPLATE_N_CMPY';
    public $NUMBER_FIELDS = array(
        
    );

    public $BOOLEAN_FIELDS = array(
        "DEFAULT_FLAG" => "Y",
        "SEND_TO_PRINTER" => "Y",
        "STATUS" => 1,
    );

    public function read()
    {
        $query = "
            SELECT BOL_DN_TEMPLATE.TEMPLATE_CODE, 
                BOL_DN_TEMPLATE.TEMPLATE_NAME, 
                BOL_DN_TEMPLATE.TEMPLATE_TYPE, 
                DECODE(BOL_DN_TEMPLATE.TEMPLATE_TYPE, 0, 'INVALID',
                    1, 'BOL TEMPLATE',
                    2, 'DELIVERY NOTE TEMPLATE',
                    3, 'BILL OF UNLADING TEMPLATE',
                    4, 'LPG BOL TEMPLATE',
                    'INVALID') TEMPLATE_TYPE_DESC,
                BOL_DN_TEMPLATE.FILE_NAME, LOCALE, 
                BOL_DN_TEMPLATE.DESCRIPTION,
                TEMPLATE_N_CMPY.CMPY_CODE, 
                DEFAULT_FLAG, 
                STATUS, 
                EMAIL, 
                COPIES, 
                FOOTERS, 
                WARNING_PERCENT, 
                WARNING_QTY, 
                SEND_TO_PRINTER
            FROM BOL_DN_TEMPLATE, TEMPLATE_N_CMPY
            WHERE BOL_DN_TEMPLATE.TEMPLATE_CODE = TEMPLATE_N_CMPY.TEMPLATE_CODE
                AND TEMPLATE_N_CMPY.CMPY_CODE = :cmpy_code
            ORDER BY BOL_DN_TEMPLATE.TEMPLATE_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}