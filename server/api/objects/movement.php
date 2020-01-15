<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/company_service.php';
include_once 'common_class.php';

class Movement extends CommonClass
{
    protected $TABLE_NAME = 'MOVEMENT';
    
    public $NUMBER_FIELDS = array(
        "MVITM_PROD_QTY",
        "MVITM_QTY_SCHD",
        "MVITM_QTY_MOVE",
        "MVITM_QTY_DELV"
    );

    public $BOOLEAN_FIELDS = array(
        
    );

    public function suppliers()
    {
        $company_service = new CompanyService($this->conn);
        return $company_service->suppliers();
    }

    public function carriers()
    {
        $company_service = new CompanyService($this->conn);
        return $company_service->carriers();
    }
    
    public function read()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "
        SELECT MV_ID,
            MV_TERMINAL,
            MV_NUMBER,
            MV_KEY,
            MV_IDOC_NUM,
            MV_TYPE,
            MV_CLASS,
            MV_SRCTYPE,
            MOVSOURCE_TYPE_NAME MV_SRCTYPE_NAME,
            MV_STATUS,
            MOVSTATUS_TYPE_NAME MV_STATUS_NAME,
            MV_FOLIO,
            MV_DTIM_CREATE,
            MV_OPER_CREATE,
            MV_DTIM_CHANGE,
            MV_OPER_CHANGE,
            MV_DTIM_EFFECT,
            MV_OPER_EFFECT,
            MV_DTIM_EXPIRY,
            MV_CARRIER,
            MV_SHIPPER,
            MV_DRAWER,
            MV_SUPPLIER,
            MV_CUSTOMER,
            MV_TPPOINT,
            MV_TPP_TEXT,
            MV_SHIPTYPE,
            MV_SHIPTYPE_TEXT,
            MV_SHIPMENT,
            MV_SHIPMENT_TEXT,
            MV_TPMODE,
            MV_TPMODE_TEXT,
            MV_ZVET_SRC,
            MV_ZVET_NUM,
            MV_TPSYSTEM,
            MV_VEHICLE,
            MV_VEH_TYPE,
            MV_VEH_ID,
            MV_COMMENTS,
            MV_TSIT_PLANT,
            MV_TSIT_STORE,
            MV_NMIT_PLANT,
            MV_NMIT_STORE,
            MV_RAT_UPTOL,
            MV_QTY_UPTOL,
            MV_UNIT_UPTOL,
            MV_RAT_DNTOL,
            MV_QTY_DNTOL,
            MV_UNIT_DNTOL,
            MV_CUST_ORDNO,
            MV_DLV_CODE,
            MV_REF_CODE,
            MV_DELDATE,
            MV_APPROVED,
            MV_INV_NO,
            MV_TOTAL,
            MV_LIMIT,
            MV_APPR_NO,
            MV_TRANSFER_TYP,
            MV_PRINT_PRICE,
            MV_PAY_DESC,
            MV_SOURCE
        FROM MOVEMENTS, MOVSTATUS_TYPES, MOVSOURCE_TYPES
        WHERE MV_STATUS = MOVSTATUS_TYPES.MOVSTATUS_TYPE_ID (+)
            AND MV_SRCTYPE = MOVSOURCE_TYPES.MOVSOURCE_TYPE_ID
        ORDER BY MV_ID DESC";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_hook(&$hook_item)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $result = array();
        $hook_item['items'] = $result;
        // write_log(json_encode($hook_item), __FILE__, __LINE__);

        if (!array_key_exists('mv_id', $hook_item)) {
            write_log("hook_item does not have mv_id item, cannot do read_hook",
                __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $query = "
        SELECT MVITM_MOVE_ID,
            MVITM_LINE_ID,
            MVITM_ITEM_ID,
            MVITM_PERIOD_ID,
            MVITM_ITEM_KEY,
            MVITM_IDOC_NUM,
            MVITM_CATEGORY,
            MVITM_TYPE,
            MOVITEM_TYPE_NAME MVITM_TYPE_NAME,
            MVITM_DTIM_EFFECT,
            MVITM_OPER_EFFECT,
            MVITM_DTIM_EXPIRY,
            MVITM_DTIM_CHANGE,
            MVITM_OPER_CHANGE,
            MVITM_PLANT_FROM,
            MVITM_TANK_FROM,
            MVITM_PRODCMPY_FROM,
            MVITM_PRODCODE_FROM,
            MVITM_PRODNAME_FROM,
            MVITM_SHIPCODE_FROM,
            MVITM_SHIPTEXT_FROM,
            MVITM_SHIPLOC_FROM,
            MVITM_PLANT_TO,
            MVITM_TANK_TO,
            MVITM_PRODCMPY_TO,
            MVITM_PRODCODE_TO,
            MVITM_PRODNAME_TO,
            MVITM_SHIPCODE_TO,
            MVITM_SHIPTEXT_TO,
            MVITM_SHIPLOC_TO,
            MVITM_PROD_QTY,
            MVITM_PROD_UNIT,
            U1.DESCRIPTION MVITM_PROD_UNIT_STR,
            MVITM_RAT_UPTOL,
            MVITM_QTY_UPTOL,
            MVITM_UNIT_UPTOL,
            MVITM_RAT_DNTOL,
            MVITM_QTY_DNTOL,
            MVITM_UNIT_DNTOL,
            MVITM_QTY_SCHD,
            MVITM_UNIT_SCHD,
            U2.DESCRIPTION MVITM_UNIT_SCHD_STR,
            MVITM_QTY_MOVE,
            MVITM_UNIT_MOVE,
            U3.DESCRIPTION MVITM_UNIT_MOVE_STR,
            MVITM_QTY_DELV,
            MVITM_UNIT_DELV,
            U4.DESCRIPTION MVITM_UNIT_DELV_STR,
            MVITM_COMMENTS,
            MVITM_TERMINAL,
            MVITM_NUMBER,
            MVITM_KEY,
            MVITM_STATUS,
            MOVSTATUS_TYPE_NAME MVITM_STATUS_NAME,
            MVITM_FOLIO,
            MVITM_LOCIT_PLANT,
            MVITM_LOCIT_STORE,
            MVITM_BY_PACKS,
            MVITM_PACK_SIZE,
            MVITM_EXEMPT_NO,
            MVITM_EXEMPT_OFF,
            MVITM_PRICE_TYPE,
            MVITM_FIXEDPRI,
            MVITM_PRICE,
            MVITM_COMPLETED,
            MVITM_SHIPTEXT_FROM2,
            MVITM_SHIPTEXT_TO2
        FROM MOVEMENT_ITEMS, 
            UNIT_SCALE_VW U1, UNIT_SCALE_VW U2, UNIT_SCALE_VW U3, UNIT_SCALE_VW U4,
            MOVSTATUS_TYPES,
            MOVITEM_TYPES
        WHERE MVITM_MOVE_ID = :mvitm_line_id
            AND MVITM_PROD_UNIT = U1.UNIT_ID (+)
            AND MVITM_UNIT_SCHD = U2.UNIT_ID (+)
            AND MVITM_UNIT_MOVE = U3.UNIT_ID (+)
            AND MVITM_UNIT_DELV = U4.UNIT_ID (+)
            AND MVITM_TYPE = MOVITEM_TYPES.MOVITEM_TYPE_ID (+)
            AND MVITM_STATUS = MOVSTATUS_TYPES.MOVSTATUS_TYPE_ID (+)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mvitm_line_id', $hook_item['mv_id']);
        if (!oci_execute($stmt)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        //The last $method parameter need to be NonExistHook to prevent 
        Utilities::retrieve($result, $this, $stmt, $method='NonExistHook');
        $hook_item['items'] = $result;
    }

    public function products()
    {
        $query = "
            SELECT PROD_CODE, PROD_NAME FROM PRODUCTS 
            WHERE PROD_CMPY = :cmpy_code
            ORDER BY PROD_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->supplier_code);
        
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}