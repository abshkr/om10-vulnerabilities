<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

class Partner extends CommonClass
{
    protected $TABLE_NAME = 'PRODUCTS';

    public $BOOLEAN_FIELDS = array(
        
    );

    public $NUMBER_FIELDS = array(
        "PROD_PRICE",
        "PROD_PRICE_UNIT"
    );

    public function partner_types()
    {
        $serv = new EnumService($this->conn);
        return $serv->partner_types();
    }

    // read personnel
    public function read()
    {
        $query = "
            SELECT 
                PR.PRTNR_SEQ PARTNER_SEQ,
                PR.PRTNR_CMPY PARTNER_CMPY_CODE,
                CM.CMPY_NAME PARTNER_CMPY_NAME,
                PR.PRTNR_CODE PARTNER_CODE,
                PR.PRTNR_NAME1 PARTNER_NAME1,
                PR.PRTNR_NAME2 PARTNER_NAME2,
                PR.PRTNR_NAME3 PARTNER_NAME3,
                PR.PRTNR_NAME4 PARTNER_NAME4,
                PR.PRTNR_NAME5 PARTNER_NAME5,
                PR.PRTNR_TYPE PARTNER_TYPE,
                PT.PARTNER_TYPE_NAME  PARTNER_TYPE_NAME,
                PR.PRTNR_ADDR PARTNER_ADDR_CODE,
                NVL(DL.DB_ADDR_TEXT, ' ') PARTNER_ADDR_TEXT,
                PR.PRTNR_SEQ || ' - ' || PR.PRTNR_CODE || ' - ' || PR.PRTNR_NAME1 PARTNER_DESC
            FROM PARTNER PR,
                GUI_COMPANYS CM,
                PARTNER_TYPES PT,
                DB_ADDRESS DA,
                (
                SELECT 
                    DB_ADDR_LINE_ID,
                    NVL(LISTAGG(DB_ADDR_LINE, ', ') WITHIN GROUP (ORDER BY DB_ADDRLINE_NO), ' ') DB_ADDR_TEXT
                FROM DB_ADDRESS_LINE
                GROUP BY DB_ADDR_LINE_ID
                ) DL
            WHERE PR.PRTNR_TYPE = PT.PARTNER_TYPE_CODE
                AND PR.PRTNR_CMPY = CM.CMPY_CODE
                AND PR.PRTNR_ADDR = DA.DB_ADDRESS_KEY(+)
                AND DA.DB_ADDRESS_KEY = DL.DB_ADDR_LINE_ID(+)
            ORDER BY PRTNR_SEQ
            ";

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
