<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class Product extends CommonClass
{
    protected $TABLE_NAME = 'PRODUCTS';
    protected $VIEW_NAME = 'GUI_PRODUCTS';
    public $NUMBER_FIELDS = array(
        "PITEM_RATIO_VALUE",
        "PITEM_RATIO_TOTAL",
        "PITEM_BCLASS_DENS_LO",
        "PITEM_BCLASS_DENS_HI",
        "PITEM_BCLASS_TEMP_LO",
        "PITEM_BCLASS_TEMP_HI",
        "PITEM_LDTOL_PTOL",
        "PITEM_LDTOL_NTOL",
        "PITEM_BLTOL_PTOL",
        "PITEM_BLTOL_NTOL",
        "PROD_LDTOL_PTOL",
        "PROD_LDTOL_NTOL"
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "PROD_LDTOL_FLAG" => 1,
        "PROD_CHECK_HOT_VOLUME" => 1,
        "PITEM_LDTOL_FLAG" => 1,
        "PITEM_BLTOL_FLAG" => 1,
        "PITEM_ADTV_FLAG" => 1,
        "PITEM_HOT_MAIN" => "Y",
        "PITEM_HOT_CHECK" => 1,
    );
    
    //Because base cannot be too many, do not do limit
    public function read()
    {
        $query = "
            SELECT * FROM " . $this->VIEW_NAME . " ORDER BY PROD_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function prod_ratios()
    {
        $query = "
            SELECT * FROM GUI_PRODUCT_ITEMS 
            WHERE PITEM_PROD_CODE = :prod_code
                AND PITEM_CMPY_CODE = :prod_cmpy
            ORDER BY PITEM_BASE_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prod_code', $this->prod_code);
        oci_bind_by_name($stmt, ':prod_cmpy', $this->prod_cmpycode);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function generic_prods()
    {
        $query = "
            SELECT * FROM GENERIC_PROD 
            ORDER BY GEN_PROD_CODE";
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
