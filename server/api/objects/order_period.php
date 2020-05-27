<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/company_service.php';
include_once __DIR__ . '/../service/site_service.php';
include_once __DIR__ . '/../service/partnership_service.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

class OrderPeriod extends CommonClass
{
    protected $TABLE_NAME = 'OPROD_CHILD';
    protected $VIEW_NAME = 'GUI_ORDER_PERIODS';
    // protected $primary_keys = array("order_no");
    protected $table_view_map = array(
        "OPB_DAD_OPRODKEY" => "OPRD_ORDER_ID",
        "OPB_DAD_OSPROD_PRODCODE" => "OPRD_PROD_CODE",
        "OPB_DAD_OSPROD_PRODCMPY" => "OPRD_PROD_CMPY",
        "PROD_NAME" => "OPRD_PROD_NAME",
        "OPRD_CH_NO" => "OPRD_PERIOD_NO",
        "OPRD_CH_ST_DAY" => "OPRD_PERIOD_START",
        "OPRD_CH_ED_DAY" => "OPRD_PERIOD_END",
        "OPRD_CH_UNIT" => "OPRD_PROD_UNIT",
        "OPRD_CH_QTY" => "OPRD_PROD_QTY",
        "OPRD_CH_USED" => "OPRD_PROD_USED",
        "OPRD_CH_FIXEDPRI" => "OPRD_PRICE_FIXED",
        "OPRD_CH_PRICE" => "OPRD_PROD_PRICE",
    );
    public $NUMBER_FIELDS = array(
        "OPRD_ORDER_ID",
        "OPRD_PROD_QTY",
        "OPRD_PROD_USED",
    );
    public $BOOLEAN_FIELDS = array(
        
    );

    public function read()
    {
        $query = "
            SELECT *
            FROM " . $this->VIEW_NAME . " 
            WHERE OPRD_ORDER_ID = :oprd_order_id
                AND OPRD_PROD_CODE = :oprd_prod_code
                AND OPRD_PROD_CMPY = :oprd_prod_cmpy
            ORDER BY OPRD_ORDER_ID";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':oprd_order_id', $this->oprd_order_id);
        oci_bind_by_name($stmt, ':oprd_prod_code', $this->oprd_prod_code);
        oci_bind_by_name($stmt, ':oprd_prod_cmpy', $this->oprd_prod_cmpy);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }


    
}
