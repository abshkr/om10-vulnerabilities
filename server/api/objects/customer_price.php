<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

class CustomerPrice extends CommonClass
{
    protected $TABLE_NAME = 'PRODUCTS';

    public $BOOLEAN_FIELDS = array(
        
    );

    public $NUMBER_FIELDS = array(
        "PROD_PRICE",
        "PROD_PRICE_UNIT"
    );

    // read personnel
    public function read()
    {
        $query = "
            SELECT PRODUCTS.PROD_CMPY,
                COMPANYS.CMPY_NAME,
                PRODUCTS.PROD_CODE,
                PRODUCTS.PROD_NAME,
                PROD_PRICE_UNIT,
                UNIT_SCALE_VW.DESCRIPTION,
                PRODUCTS.PROD_PRICE
            FROM COMPANYS,
                PRODUCTS,
                UNIT_SCALE_VW
            WHERE PRODUCTS.PROD_PRICE_UNIT = UNIT_SCALE_VW.UNIT_ID(+)
                AND PRODUCTS.PROD_CMPY = COMPANYS.CMPY_CODE
            ORDER BY PROD_CMPY, PROD_CODE";

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
