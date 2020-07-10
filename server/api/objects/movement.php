<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/company_service.php';
include_once __DIR__ . '/../service/product_service.php';
include_once __DIR__ . '/../service/site_service.php';
include_once __DIR__ . '/../service/mvitem_service.php';
include_once __DIR__ . '/../service/tank_service.php';
include_once 'common_class.php';

class Movement extends CommonClass
{
    protected $TABLE_NAME = 'MOVEMENTS';
    
    public $NUMBER_FIELDS = array(
        "MVITM_PROD_QTY",
        "MVITM_QTY_SCHD",
        "MVITM_QTY_MOVE",
        "MVITM_QTY_DELV",
        "MSITM_SPECQTY",
        "MSITM_PRLDQTY",
        "MSITM_PRSTQTY",
        "MSITM_DELVQTY",
        "MVITM_MOVE_ID",
        "MVITM_LINE_ID",
        "MVITM_ITEM_ID",
        "MVITM_PERIOD_ID",
        "MVITM_ITEM_KEY",
        "MVITM_TYPE",
        "MVITM_PROD_UNIT",
        "MVITM_RAT_UPTOL",
        "MVITM_QTY_UPTOL",
        "MVITM_UNIT_UPTOL",
        "MVITM_RAT_DNTOL",
        "MVITM_QTY_DNTOL",
        "MVITM_UNIT_DNTOL",
        "MVITM_UNIT_SCHD",
        "MVITM_UNIT_MOVE",
        "MVITM_UNIT_DELV",
        "MVITM_STATUS",
        "MVITM_PACK_SIZE",
        "MVITM_PRICE_TYPE",
        "MVITM_PRICE"
    );

    public $BOOLEAN_FIELDS = array(
        "MVITM_COMPLETED" => 1
    );

    public function check_nomination_key()
    {
        $query = "
            SELECT COUNT(*) AS CNT FROM MOVEMENTS WHERE MV_KEY=:mv_key
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mv_key', $this->nomination_key);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function alternate_units()
    {
        $query = "SELECT 'BB6' UNIT FROM DUAL
            UNION SELECT 'BBL' UNIT FROM DUAL
            UNION SELECT 'KG' UNIT FROM DUAL
            UNION SELECT 'L' UNIT FROM DUAL
            UNION SELECT 'L15' UNIT FROM DUAL
            UNION SELECT 'L20' UNIT FROM DUAL
            UNION SELECT 'L30' UNIT FROM DUAL
            UNION SELECT 'LB' UNIT FROM DUAL
            UNION SELECT 'GAL' UNIT FROM DUAL
            UNION SELECT 'UGL' UNIT FROM DUAL
            UNION SELECT 'M3' UNIT FROM DUAL
            UNION SELECT 'M15' UNIT FROM DUAL
            UNION SELECT 'TO' UNIT FROM DUAL";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function arms()
    {
        $query = "SELECT DISTINCT STREAM_ARMCODE 
            FROM GUI_PIPENODE 
            WHERE STREAM_BASECODE = :tank_base
            ORDER BY STREAM_ARMCODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_base', $this->tank_base);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function tanks()
    {
        $query = "SELECT TANK_CODE 
            FROM TANKS
            WHERE TANK_BASE = :tank_base
            ORDER BY TANK_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank_base', $this->tank_base);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function tank_proddata()
    {
        $serv = new TankService($this->conn, $this->tank_code);
        return $serv->tank_proddata();
    }

    public function tanks_by_drawprod()
    {
        $query = "SELECT TK.TANK_CODE, 
            TK.TANK_DENSITY, 
            TK.TANK_TEMP, 
            TK.TANK_NAME, 
            TL.TERM_CODE,  
            TL.TERM_NAME,
            DP.PROD_CMPY, 
            DP.PROD_CODE, 
            DP.PROD_NAME, 
            BP.BASE_CODE, 
            BP.BASE_NAME, 
            PR.RATIO_VALUE, 
            PR.RAT_PROD_PRODCODE,
            BS.BCLASS_DESC,
            BS.BCLASS_NO,
            BS.BCLASS_DENS_LO,
            BS.BCLASS_DENS_HI,
            BS.BCLASS_TEMP_LO,
            BS.BCLASS_TEMP_HI,
            BS.BCLASS_VCF_ALG					
        FROM PRODUCTS DP, RPTOBJ_PROD_RATIOS_VW PR, BASE_PRODS BP, TANKS TK, TERMINAL TL, BASECLASS BS 
        WHERE DP.PROD_CMPY  = PR.RAT_PROD_PRODCMPY 
        AND DP.PROD_CODE  = PR.RAT_PROD_PRODCODE 
        AND PR.RATIO_BASE = BP.BASE_CODE 
        AND BP.BASE_CODE  = TK.TANK_BASE 
        AND TL.TERM_CODE  = TK.TANK_TERMINAL
        AND PR.RAT_COUNT  = 1 
        AND DP.PROD_CMPY  != 'BaSePrOd'
        AND DP.PROD_CMPY = :supplier
        AND DP.PROD_CODE = :product
        AND BP.BASE_CAT = BS.BCLASS_NO
        ORDER BY TL.TERM_CODE, DP.PROD_CMPY, TK.TANK_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':product', $this->product);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function carrier_by_tanker()
    {
        $query = "
            SELECT TNKR_CARRIER, TNKR_CODE, TNKR_OWNER
            FROM TANKERS
            WHERE TNKR_CODE = :tnkr_code
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_code', $this->tnkr_code);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function nomination_tanks()
    {
        $query = "SELECT TK.TANK_CODE, 
            TK.TANK_DENSITY, 
            TK.TANK_TEMP, 
            TK.TANK_NAME, 
            TL.TERM_CODE,  
            TL.TERM_NAME,
            DP.PROD_CMPY, 
            DP.PROD_CODE, 
            DP.PROD_NAME, 
            BP.BASE_CODE, 
            BP.BASE_NAME, 
            PR.RATIO_VALUE, 
            PR.RAT_PROD_PRODCODE,
            BS.BCLASS_DESC,
            BS.BCLASS_NO,
            BS.BCLASS_DENS_LO,
            BS.BCLASS_DENS_HI,
            BS.BCLASS_TEMP_LO,
            BS.BCLASS_TEMP_HI,
            BS.BCLASS_VCF_ALG					
        FROM PRODUCTS DP, RPTOBJ_PROD_RATIOS_VW PR, BASE_PRODS BP, TANKS TK, TERMINAL TL, BASECLASS BS 
        WHERE DP.PROD_CMPY  = PR.RAT_PROD_PRODCMPY 
        AND DP.PROD_CODE  = PR.RAT_PROD_PRODCODE 
        AND PR.RATIO_BASE = BP.BASE_CODE 
        AND BP.BASE_CODE  = TK.TANK_BASE 
        AND TL.TERM_CODE  = TK.TANK_TERMINAL
        AND PR.RAT_COUNT  = 1 
        AND DP.PROD_CMPY  != 'BaSePrOd'
        AND BP.BASE_CAT = BS.BCLASS_NO
        ORDER BY TL.TERM_CODE, DP.PROD_CMPY, TK.TANK_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function nomination_products()
    {
        $query = "
            SELECT *
            FROM PRODUCTS
            WHERE 1=1
            ORDER BY PROD_CODE";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
    
    public function item_instance()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "SELECT MVITM_MOVE_ID,
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
            WHERE MVITM_MOVE_ID = :mvitm_move_id
                AND MVITM_LINE_ID = :mvitm_line_id
                AND MVITM_PROD_UNIT = U1.UNIT_ID (+)
                AND MVITM_UNIT_SCHD = U2.UNIT_ID (+)
                AND MVITM_UNIT_MOVE = U3.UNIT_ID (+)
                AND MVITM_UNIT_DELV = U4.UNIT_ID (+)
                AND MVITM_TYPE = MOVITEM_TYPES.MOVITEM_TYPE_ID (+)
                AND MVITM_STATUS = MOVSTATUS_TYPES.MOVSTATUS_TYPE_ID (+)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mvitm_move_id', $this->mvitm_move_id);
        oci_bind_by_name($stmt, ':mvitm_line_id', $this->mvitm_line_id);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

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
        // write_log("DB error111:>>>" . $this->start_date . "<<< >>>>".$this->end_date."<<<<", __FILE__, __LINE__, LogLevel::ERROR);
        if (!isset($this->time_option)) {
            $this->time_option = "MV_DTIM_EFFECT";
        }
        if (!isset($this->mv_key)) {
            $this->mv_key = "-1";
        }
        if (!isset($this->mv_number)) {
            $this->mv_number = "-1";
        }
        if (!isset($this->mv_status)) {
            $this->mv_status = -1;
        }
        if (!isset($this->mv_srctype)) {
            $this->mv_srctype = -1;
        }
        if (!isset($this->mv_terminal)) {
            $this->mv_terminal = "-1";
        }
        if (!isset($this->start_date)) {
            $this->start_date = "-1";
        }
        if (!isset($this->end_date)) {
            $this->end_date = "-1";
        }
        if (isset($this->mv_key) && $this->mv_key !== "-1") {
            $this->start_date = "-1";
            $this->end_date = "-1";
        }
        if (isset($this->mv_number) && $this->mv_number !== "-1") {
            $this->start_date = "-1";
            $this->end_date = "-1";
        }
        if (isset($this->start_date) && $this->start_date === -1) {
            $this->start_date = "-1";
        }
        if (isset($this->end_date) && $this->end_date === -1) {
            $this->end_date = "-1";
        }
        $this->start_date = trim($this->start_date);
        $this->end_date = trim($this->end_date);

        $query = "
            SELECT 
                MV_ID,
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
            FROM 
                MOVEMENTS, 
                MOVSTATUS_TYPES, 
                MOVSOURCE_TYPES
            WHERE 
                1 = 1 
                AND MV_SRCTYPE = MOVSOURCE_TYPES.MOVSOURCE_TYPE_ID
        ";

        //        AND ('-1' = :start_date OR " . $this->time_option . " > TO_DATE(:start_date, 'YYYY-MM-DD HH24:MI:SS')) 
        if ( $this->start_date === "-1") {
            $query .= "
                AND ('-1' = :start_date) 
            ";
        } else {
            $query .= "
                AND (" . $this->time_option . " > TO_DATE(:start_date, 'YYYY-MM-DD HH24:MI:SS')) 
            ";
        }
        //        AND ('-1' = :end_date OR " . $this->time_option . " < TO_DATE(:end_date, 'YYYY-MM-DD HH24:MI:SS'))
        if ( $this->end_date === "-1") {
            $query .= "
                AND ('-1' = :end_date)
            ";
        } else {
            $query .= "
                AND (" . $this->time_option . " < TO_DATE(:end_date, 'YYYY-MM-DD HH24:MI:SS'))
            ";
        }
        $query .= "
                AND MV_STATUS = MOVSTATUS_TYPES.MOVSTATUS_TYPE_ID(+)
                AND ('-1' = :mv_key OR MV_KEY LIKE '%'||:mv_key||'%')
                AND ('-1' = :mv_number OR MV_NUMBER LIKE '%'||:mv_number||'%')
                AND (-1 = :mv_status OR MV_STATUS = :mv_status)
                AND (-1 = :mv_srctype OR MV_SRCTYPE = :mv_srctype)
                AND (-1 = :mv_terminal OR MV_TERMINAL = :mv_terminal)
            ORDER BY " . $this->time_option . " DESC
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':start_date', $this->start_date);
        oci_bind_by_name($stmt, ':end_date', $this->end_date);
        oci_bind_by_name($stmt, ':mv_key', $this->mv_key);
        oci_bind_by_name($stmt, ':mv_number', $this->mv_number);
        oci_bind_by_name($stmt, ':mv_status', $this->mv_status);
        oci_bind_by_name($stmt, ':mv_srctype', $this->mv_srctype);
        oci_bind_by_name($stmt, ':mv_terminal', $this->mv_terminal);
        // write_log("DB error2:>>>" . $this->start_date . "<<< >>>>".$this->end_date."<<<<", __FILE__, __LINE__, LogLevel::ERROR);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
    
    public function search()
    {
        if (!isset($this->mv_key)) {
            $this->mv_key = "-1";
        }
        if (!isset($this->mv_number)) {
            $this->mv_number = "-1";
        }
        if (!isset($this->mv_status)) {
            $this->mv_status = -1;
        }
        if (!isset($this->mv_srctype)) {
            $this->mv_srctype = -1;
        }
        if (!isset($this->mv_terminal)) {
            $this->mv_terminal = "-1";
        }
        if (!isset($this->start_date)) {
            $this->start_date = "-1";
        }
        if (!isset($this->end_date)) {
            $this->end_date = "-1";
        }
        if (!isset($this->time_option)) {
            $this->time_option = "MV_DTIM_EFFECT";
        }

        $query = "
            SELECT 
                MV_ID,
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
            FROM 
                MOVEMENTS, 
                MOVSTATUS_TYPES, 
                MOVSOURCE_TYPES
            WHERE MV_STATUS = MOVSTATUS_TYPES.MOVSTATUS_TYPE_ID(+)
                AND MV_SRCTYPE = MOVSOURCE_TYPES.MOVSOURCE_TYPE_ID
                AND ('-1' = :mv_key OR MV_KEY LIKE '%'||:mv_key||'%')
                AND ('-1' = :mv_number OR MV_NUMBER LIKE '%'||:mv_number||'%')
                AND (-1 = :mv_status OR MV_STATUS = :mv_status)
                AND (-1 = :mv_srctype OR MV_SRCTYPE = :mv_srctype)
                AND (-1 = :mv_terminal OR MV_TERMINAL = :mv_terminal)
                AND ('-1' = :start_date OR " . $this->time_option . " > :start_date)
                AND ('-1' = :end_date OR " . $this->time_option . " < :end_date)
            ORDER BY MV_ID DESC
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mv_key', $this->mv_key);
        oci_bind_by_name($stmt, ':mv_number', $this->mv_number);
        oci_bind_by_name($stmt, ':mv_status', $this->mv_status);
        oci_bind_by_name($stmt, ':mv_srctype', $this->mv_srctype);
        oci_bind_by_name($stmt, ':mv_terminal', $this->mv_terminal);
        oci_bind_by_name($stmt, ':start_date', $this->start_date);
        oci_bind_by_name($stmt, ':end_date', $this->end_date);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            write_log("DB error2:" . $this->start_date . $this->end_date, __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
    
    public function read_by_time()
    {
        if (isset($this->start_date)) {
            if (!isset($this->time_option)) {
                $this->time_option = "MV_DTIM_EFFECT";
            }
            
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
                WHERE MV_STATUS = MOVSTATUS_TYPES.MOVSTATUS_TYPE_ID(+)
                    AND MV_SRCTYPE = MOVSOURCE_TYPES.MOVSOURCE_TYPE_ID
                    AND " . $this->time_option . " > :start_date
                    AND " . $this->time_option . " < :end_date
                ORDER BY MV_ID DESC";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
        } else {
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
                WHERE MV_STATUS = MOVSTATUS_TYPES.MOVSTATUS_TYPE_ID(+)
                    AND MV_SRCTYPE = MOVSOURCE_TYPES.MOVSOURCE_TYPE_ID
                ORDER BY MV_ID DESC";
            $stmt = oci_parse($this->conn, $query);
        }
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // public function read_hook(&$hook_item)
    // {
    //     write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
    //         __FILE__, __LINE__);

    //     $result = array();
    //     $hook_item['items'] = $result;
    //     // write_log(json_encode($hook_item), __FILE__, __LINE__);

    //     if (!array_key_exists('mv_id', $hook_item)) {
    //         write_log("hook_item does not have mv_id item, cannot do read_hook",
    //             __FILE__, __LINE__, LogLevel::ERROR);
    //         return;
    //     }

    //     $query = "
    //     SELECT MVITM_MOVE_ID,
    //         MVITM_LINE_ID,
    //         MVITM_ITEM_ID,
    //         MVITM_PERIOD_ID,
    //         MVITM_ITEM_KEY,
    //         MVITM_IDOC_NUM,
    //         MVITM_CATEGORY,
    //         MVITM_TYPE,
    //         MOVITEM_TYPE_NAME MVITM_TYPE_NAME,
    //         MVITM_DTIM_EFFECT,
    //         MVITM_OPER_EFFECT,
    //         MVITM_DTIM_EXPIRY,
    //         MVITM_DTIM_CHANGE,
    //         MVITM_OPER_CHANGE,
    //         MVITM_PLANT_FROM,
    //         MVITM_TANK_FROM,
    //         MVITM_PRODCMPY_FROM,
    //         MVITM_PRODCODE_FROM,
    //         MVITM_PRODNAME_FROM,
    //         MVITM_SHIPCODE_FROM,
    //         MVITM_SHIPTEXT_FROM,
    //         MVITM_SHIPLOC_FROM,
    //         MVITM_PLANT_TO,
    //         MVITM_TANK_TO,
    //         MVITM_PRODCMPY_TO,
    //         MVITM_PRODCODE_TO,
    //         MVITM_PRODNAME_TO,
    //         MVITM_SHIPCODE_TO,
    //         MVITM_SHIPTEXT_TO,
    //         MVITM_SHIPLOC_TO,
    //         MVITM_PROD_QTY,
    //         MVITM_PROD_UNIT,
    //         U1.DESCRIPTION MVITM_PROD_UNIT_STR,
    //         MVITM_RAT_UPTOL,
    //         MVITM_QTY_UPTOL,
    //         MVITM_UNIT_UPTOL,
    //         MVITM_RAT_DNTOL,
    //         MVITM_QTY_DNTOL,
    //         MVITM_UNIT_DNTOL,
    //         MVITM_QTY_SCHD,
    //         MVITM_UNIT_SCHD,
    //         U2.DESCRIPTION MVITM_UNIT_SCHD_STR,
    //         MVITM_QTY_MOVE,
    //         MVITM_UNIT_MOVE,
    //         U3.DESCRIPTION MVITM_UNIT_MOVE_STR,
    //         MVITM_QTY_DELV,
    //         MVITM_UNIT_DELV,
    //         U4.DESCRIPTION MVITM_UNIT_DELV_STR,
    //         MVITM_COMMENTS,
    //         MVITM_TERMINAL,
    //         MVITM_NUMBER,
    //         MVITM_KEY,
    //         MVITM_STATUS,
    //         MOVSTATUS_TYPE_NAME MVITM_STATUS_NAME,
    //         MVITM_FOLIO,
    //         MVITM_LOCIT_PLANT,
    //         MVITM_LOCIT_STORE,
    //         MVITM_BY_PACKS,
    //         MVITM_PACK_SIZE,
    //         MVITM_EXEMPT_NO,
    //         MVITM_EXEMPT_OFF,
    //         MVITM_PRICE_TYPE,
    //         MVITM_FIXEDPRI,
    //         MVITM_PRICE,
    //         MVITM_COMPLETED,
    //         MVITM_SHIPTEXT_FROM2,
    //         MVITM_SHIPTEXT_TO2
    //     FROM MOVEMENT_ITEMS, 
    //         UNIT_SCALE_VW U1, UNIT_SCALE_VW U2, UNIT_SCALE_VW U3, UNIT_SCALE_VW U4,
    //         MOVSTATUS_TYPES,
    //         MOVITEM_TYPES
    //     WHERE MVITM_MOVE_ID = :mvitm_line_id
    //         AND MVITM_PROD_UNIT = U1.UNIT_ID (+)
    //         AND MVITM_UNIT_SCHD = U2.UNIT_ID (+)
    //         AND MVITM_UNIT_MOVE = U3.UNIT_ID (+)
    //         AND MVITM_UNIT_DELV = U4.UNIT_ID (+)
    //         AND MVITM_TYPE = MOVITEM_TYPES.MOVITEM_TYPE_ID (+)
    //         AND MVITM_STATUS = MOVSTATUS_TYPES.MOVSTATUS_TYPE_ID (+)";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':mvitm_line_id', $hook_item['mv_id']);
    //     if (!oci_execute($stmt, $this->commit_mode)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return;
    //     }

    //     //The last $method parameter need to be NonExistHook to prevent 
    //     Utilities::retrieve($result, $this, $stmt, $method='NonExistHook');
    //     $hook_item['items'] = $result;
    // }

    // public function products()
    // {
    //     $query = "
    //         SELECT PROD_CODE, PROD_NAME FROM PRODUCTS 
    //         WHERE PROD_CMPY = :cmpy_code
    //         ORDER BY PROD_CODE";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':cmpy_code', $this->supplier_code);
        
    //     if (oci_execute($stmt, $this->commit_mode)) {
    //         return $stmt;
    //     } else {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return null;
    //     }
    // }

    public function nomination_items()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

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
        oci_bind_by_name($stmt, ':mvitm_line_id', $this->mv_id);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function nomination_status()
    {
        $query = "
            SELECT * FROM MOVSTATUS_TYPES 
            ORDER BY MOVSTATUS_TYPE_ID";
        $stmt = oci_parse($this->conn, $query);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function nomination_types()
    {
        $query = "
            SELECT * FROM MOVITEM_TYPES 
            ORDER BY MOVITEM_TYPE_ID";
        $stmt = oci_parse($this->conn, $query);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function nomination_sources()
    {
        $query = "
            SELECT * FROM MOVSOURCE_TYPES 
            ORDER BY MOVSOURCE_TYPE_ID";
        $stmt = oci_parse($this->conn, $query);
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function plants()
    {
        $cmpy_service = new CompanyService($this->conn);
        return $cmpy_service->plants();
    }

    public function products()
    {
        $serv = new ProductService($this->conn, $this->prod_cmpy);
        return $serv->products();
    }

    public function pre_create()
    {
        $query = "SELECT NVL(MAX(MV_ID), 0) + 1 NEXT_ID FROM MOVEMENTS";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $this->mv_id = $row['NEXT_ID'];
    }

    protected function delete_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "
            DELETE FROM MOVEMENT_ITEMS
            WHERE MVITM_MOVE_ID = :mv_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mv_id', $this->mv_id);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        return true;
    }

    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (isset($this->items)) {
            $lineno = 1;
            foreach ($this->items as $value) {
                // write_log(json_encode($value), __FILE__, __LINE__);
                $mvitm_item_id = $this->mv_id * 100 + $lineno;
                $query = "INSERT INTO MOVEMENT_ITEMS (
                    MVITM_MOVE_ID,
                    MVITM_LINE_ID,
                    MVITM_ITEM_ID,
                    MVITM_PERIOD_ID,
                    MVITM_ITEM_KEY,
                    MVITM_IDOC_NUM,
                    MVITM_CATEGORY,
                    MVITM_TYPE,
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
                    MVITM_RAT_UPTOL,
                    MVITM_QTY_UPTOL,
                    MVITM_UNIT_UPTOL,
                    MVITM_RAT_DNTOL,
                    MVITM_QTY_DNTOL,
                    MVITM_UNIT_DNTOL,
                    MVITM_QTY_SCHD,
                    MVITM_UNIT_SCHD,
                    MVITM_QTY_MOVE,
                    MVITM_UNIT_MOVE,
                    MVITM_QTY_DELV,
                    MVITM_UNIT_DELV,
                    MVITM_COMMENTS,
                    MVITM_TERMINAL,
                    MVITM_NUMBER,
                    MVITM_KEY,
                    MVITM_STATUS,
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
                    MVITM_SHIPTEXT_FROM2)
                VALUES (
                    :mv_id,
                    :lineno,
                    :mvitm_item_id,
                    :mvitm_period_id,
                    :mvitm_item_key,
                    :mvitm_idoc_num,
                    :mvitm_category,
                    :mvitm_type,
                    :mvitm_dtim_effect,
                    :mvitm_oper_effect,
                    :mvitm_dtim_expiry,
                    :mvitm_dtim_change,
                    :mvitm_oper_change,
                    :mvitm_plant_from,
                    :mvitm_tank_from,
                    :mvitm_prodcmpy_from,
                    :mvitm_prodcode_from,
                    :mvitm_prodname_from,
                    :mvitm_shipcode_from,
                    :mvitm_shiptext_from,
                    :mvitm_shiploc_from,
                    :mvitm_plant_to,
                    :mvitm_tank_to,
                    :mvitm_prodcmpy_to,
                    :mvitm_prodcode_to,
                    :mvitm_prodname_to,
                    :mvitm_shipcode_to,
                    :mvitm_shiptext_to,
                    :mvitm_shiploc_to,
                    :mvitm_prod_qty,
                    :mvitm_prod_unit,
                    :mvitm_rat_uptol,
                    :mvitm_qty_uptol,
                    :mvitm_unit_uptol,
                    :mvitm_rat_dntol,
                    :mvitm_qty_dntol,
                    :mvitm_unit_dntol,
                    :mvitm_qty_schd,
                    :mvitm_unit_schd,
                    :mvitm_qty_move,
                    :mvitm_unit_move,
                    :mvitm_qty_delv,
                    :mvitm_unit_delv,
                    :mvitm_comments,
                    :mvitm_terminal,
                    :mvitm_number,
                    :mvitm_key,
                    0,
                    :mvitm_folio,
                    :mvitm_locit_plant,
                    :mvitm_locit_store,
                    :mvitm_by_packs,
                    :mvitm_pack_size,
                    :mvitm_exempt_no,
                    :mvitm_exempt_off,
                    :mvitm_price_type,
                    :mvitm_fixedpri,
                    :mvitm_price,
                    :mvitm_completed,
                    :mvitm_shiptext_from2
                )";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':mv_id', $this->mv_id);
                oci_bind_by_name($stmt, ':lineno', $lineno);
                oci_bind_by_name($stmt, ':mvitm_item_id', $mvitm_item_id);
                
                oci_bind_by_name($stmt, ':mvitm_period_id', $value->mvitm_period_id);
                oci_bind_by_name($stmt, ':mvitm_item_key', $value->mvitm_item_key);
                oci_bind_by_name($stmt, ':mvitm_idoc_num', $value->mvitm_idoc_num);
                oci_bind_by_name($stmt, ':mvitm_category', $value->mvitm_category);
                oci_bind_by_name($stmt, ':mvitm_type', $value->mvitm_type);
                oci_bind_by_name($stmt, ':mvitm_dtim_effect', $value->mvitm_dtim_effect);
                oci_bind_by_name($stmt, ':mvitm_oper_effect', $value->mvitm_oper_effect);
                oci_bind_by_name($stmt, ':mvitm_dtim_expiry', $value->mvitm_dtim_expiry);
                oci_bind_by_name($stmt, ':mvitm_dtim_change', $value->mvitm_dtim_change);
                oci_bind_by_name($stmt, ':mvitm_oper_change', $value->mvitm_oper_change);
                oci_bind_by_name($stmt, ':mvitm_plant_from', $value->mvitm_plant_from);
                oci_bind_by_name($stmt, ':mvitm_tank_from', $value->mvitm_tank_from);
                oci_bind_by_name($stmt, ':mvitm_prodcmpy_from', $value->mvitm_prodcmpy_from);
                oci_bind_by_name($stmt, ':mvitm_prodcode_from', $value->mvitm_prodcode_from);
                oci_bind_by_name($stmt, ':mvitm_prodname_from', $value->mvitm_prodname_from);
                oci_bind_by_name($stmt, ':mvitm_shipcode_from', $value->mvitm_shipcode_from);
                oci_bind_by_name($stmt, ':mvitm_shiptext_from', $value->mvitm_shiptext_from);
                oci_bind_by_name($stmt, ':mvitm_shiploc_from', $value->mvitm_shiploc_from);
                oci_bind_by_name($stmt, ':mvitm_plant_to', $value->mvitm_plant_to);
                oci_bind_by_name($stmt, ':mvitm_tank_to', $value->mvitm_tank_to);
                oci_bind_by_name($stmt, ':mvitm_prodcmpy_to', $value->mvitm_prodcmpy_to);
                oci_bind_by_name($stmt, ':mvitm_prodcode_to', $value->mvitm_prodcode_to);
                oci_bind_by_name($stmt, ':mvitm_prodname_to', $value->mvitm_prodname_to);
                oci_bind_by_name($stmt, ':mvitm_shipcode_to', $value->mvitm_shipcode_to);
                oci_bind_by_name($stmt, ':mvitm_shiptext_to', $value->mvitm_shiptext_to);
                oci_bind_by_name($stmt, ':mvitm_shiploc_to', $value->mvitm_shiploc_to);
                oci_bind_by_name($stmt, ':mvitm_prod_qty', $value->mvitm_prod_qty);
                oci_bind_by_name($stmt, ':mvitm_prod_unit', $value->mvitm_prod_unit);
                oci_bind_by_name($stmt, ':mvitm_rat_uptol', $value->mvitm_rat_uptol);
                oci_bind_by_name($stmt, ':mvitm_qty_uptol', $value->mvitm_qty_uptol);
                oci_bind_by_name($stmt, ':mvitm_unit_uptol', $value->mvitm_unit_uptol);
                oci_bind_by_name($stmt, ':mvitm_rat_dntol', $value->mvitm_rat_dntol);
                oci_bind_by_name($stmt, ':mvitm_qty_dntol', $value->mvitm_qty_dntol);
                oci_bind_by_name($stmt, ':mvitm_unit_dntol', $value->mvitm_unit_dntol);
                oci_bind_by_name($stmt, ':mvitm_qty_schd', $value->mvitm_qty_schd);
                oci_bind_by_name($stmt, ':mvitm_unit_schd', $value->mvitm_unit_schd);
                oci_bind_by_name($stmt, ':mvitm_qty_move', $value->mvitm_qty_move);
                oci_bind_by_name($stmt, ':mvitm_unit_move', $value->mvitm_unit_move);
                oci_bind_by_name($stmt, ':mvitm_qty_delv', $value->mvitm_qty_delv);
                oci_bind_by_name($stmt, ':mvitm_unit_delv', $value->mvitm_unit_delv);
                oci_bind_by_name($stmt, ':mvitm_comments', $value->mvitm_comments);
                oci_bind_by_name($stmt, ':mvitm_terminal', $value->mvitm_terminal);
                oci_bind_by_name($stmt, ':mvitm_number', $value->mvitm_number);
                oci_bind_by_name($stmt, ':mvitm_key', $value->mvitm_key);
                oci_bind_by_name($stmt, ':mvitm_folio', $value->mvitm_folio);
                oci_bind_by_name($stmt, ':mvitm_locit_plant', $value->mvitm_locit_plant);
                oci_bind_by_name($stmt, ':mvitm_locit_store', $value->mvitm_locit_store);
                oci_bind_by_name($stmt, ':mvitm_by_packs', $value->mvitm_by_packs);
                oci_bind_by_name($stmt, ':mvitm_pack_size', $value->mvitm_pack_size);
                oci_bind_by_name($stmt, ':mvitm_exempt_no', $value->mvitm_exempt_no);
                oci_bind_by_name($stmt, ':mvitm_exempt_off', $value->mvitm_exempt_off);
                oci_bind_by_name($stmt, ':mvitm_price_type', $value->mvitm_price_type);
                oci_bind_by_name($stmt, ':mvitm_fixedpri', $value->mvitm_fixedpri);
                oci_bind_by_name($stmt, ':mvitm_price', $value->mvitm_price);
                oci_bind_by_name($stmt, ':mvitm_completed', $value->mvitm_completed);
                oci_bind_by_name($stmt, ':mvitm_shiptext_from2', $value->mvitm_shiptext_from2);

                if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    throw new DatabaseException($e['message']);
                    return false;
                }

                $lineno += 1;
            }
        }

        if (isset($this->order_instruction)) {
            $query = "INSERT INTO ORD_INSTRUCT (OI_ORDER_NO, OI_INSTR_COUNTER, OI_INSTRUCTION)
                VALUES (:oi_order_no, 1, :oi_instruction)";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':oi_order_no', $this->order_sys_no);
            oci_bind_by_name($stmt, ':oi_instruction', $this->order_instruction);

            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                throw new DatabaseException($e['message']);
                return false;
            }
        }

        return true;
    }

    protected function retrieve_children_data()
    {
        $query = "SELECT * FROM MOVEMENT_ITEMS
            WHERE MVITM_MOVE_ID = :mv_id
            ORDER BY MVITM_LINE_ID";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':mv_id', $this->mv_id);
        
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $tank_max_flows = array();
        while ($flow_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $tank_max_flows[$flow_row['MVITM_ITEM_KEY']] = $flow_row;
        }

        // write_log(json_encode($tank_max_flows), __FILE__, __LINE__);
        return $tank_max_flows;
    }

    protected function journal_children_change($journal, $old, $new)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
            
        // write_log(json_encode($old), __FILE__, __LINE__);
        // write_log(json_encode($new), __FILE__, __LINE__);
        $module = "movement item";
        foreach ($old as $item_key => $item_array) {
            // write_log($item_key, __FILE__, __LINE__);
            // write_log($value, __FILE__, __LINE__);
            if (isset($new[$item_key])) {
                foreach ($item_array as $field => $value) {
                    if ($new[$item_key][$field] != $value) {
                        $record = sprintf("mv_id:%s, item key:%s", $this->mv_id, $item_key);
                        $journal->valueChange($module, $record, $field, $value, $new[$item_key][$field]);
                    }
                }
            } 

            if (!isset($new[$item_key])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("mv_id:%s, item key:%s", $this->mv_id, $item_key);
                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'],
                        __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        //In new but not in old.
        foreach ($new as $item_key => $alloc_item) {
            if (!isset($old[$item_key])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("mv_id:%s, item key:%s", $this->mv_id, $item_key);

                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'],
                        __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }
    }

    public function schedules()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (isset($this->mv_key)) {
            $query = "
                SELECT *
                FROM GUI_NOM_SCHEDULES
                WHERE MV_KEY = :mv_key
                ORDER BY SHLS_TRIP_NO";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':mv_key', $this->mv_key); 
        } else {
            $query = "
                SELECT *
                FROM GUI_NOM_SCHEDULES
                ORDER BY SHLS_TRIP_NO";
            $stmt = oci_parse($this->conn, $query);
        }
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function schedule_items()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "
            SELECT MSITM_LINEID,
                MVITM_ITEM_ID,
                MSITM_TRAILER,
                EQPT_CODE,
                MSITM_TRAILERCOMP EQPT_CMPT,
                MSITM_TRAILERCOMP CMPT,
                MSITM_SPECQTY SCHED_QTY,
                MSITM_PRLDQTY PRELOAD_QTY,
                MSITM_DELVQTY LOADED_QTY,
                MSITM_PRSTQTY PRESET_QTY,
                MSITM_UNITID,
                UNIT_SCALE_VW.DESCRIPTION UNITTYPE,
                MSITM_BAYARM
            FROM MOV_SCHD_ITEMS, MOVEMENT_ITEMS, TRANSP_EQUIP, UNIT_SCALE_VW
            WHERE MSITM_SHLSTRIP = :shls_trip_no
                AND MSITM_SHLSSUPP = :supplier_code
                AND MSITM_TRAILER = EQPT_ID(+)
                AND MSITM_MOVEID = MVITM_MOVE_ID
                AND MSITM_MOVITEM = MVITM_LINE_ID
                AND MSITM_UNITID = UNIT_ID(+)
            ORDER BY MSITM_TRAILER, MSITM_TRAILERCOMP";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':shls_trip_no', $this->trip_no); 
        oci_bind_by_name($stmt, ':supplier_code', $this->supplier); 
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function transactions()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (isset($this->mv_id)) {
            $query = "
                SELECT * FROM GUI_TRANSACTIONS 
                WHERE (TRSA_TRIP, TRSA_SUPPLIER) IN 
                    (SELECT MS.MS_SHLSTRIP, MS.MS_SHLSSUPP FROM MOV_SCHEDULES MS, MOV_SCHD_ITEMS MI 
                    WHERE MS.MS_SHLSTRIP = MI.MSITM_SHLSTRIP AND MS.MS_SHLSSUPP = MI.MSITM_SHLSSUPP 
                        AND MI.MSITM_MOVEID = :move_id AND MI.MSITM_MOVITEM = :line_id) 
                ORDER BY TRSA_ID";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':move_id', $this->mv_id); 
            oci_bind_by_name($stmt, ':line_id', $this->line_id); 
        } else {
            $query = "
                SELECT * FROM GUI_TRANSACTIONS 
                WHERE TRSA_TRIP = :trip_no
                    AND TRSA_SUPPLIER = :supplier
                ORDER BY TRSA_ID";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':trip_no', $this->trip_no); 
            oci_bind_by_name($stmt, ':supplier', $this->supplier); 
        }
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function transactions_hook(&$hook_item)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $result = array();
        $hook_item['transfers'] = $result;
        // write_log(json_encode($hook_item), __FILE__, __LINE__);

        if (!array_key_exists('trsa_id', $hook_item)) {
            write_log("hook_item does not have trsa_id item, cannot do transactions_hook",
                __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $query = "
            SELECT * FROM GUI_TRANSACTION_DETAILS 
            WHERE TRSFTRID_TRSA_ID = :trsa_id
            ORDER BY TRSFTRID_TRSA_ID
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trsa_id', $hook_item['trsa_id']);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        Utilities::retrieve($result, $this, $stmt, $method=__FUNCTION__);
        $hook_item['transfers'] = $result;
    }

    public function transactions_hook_hook(&$hook_item)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $result = array();
        $hook_item['base_prods'] = $result;
        // write_log(json_encode($hook_item), __FILE__, __LINE__);

        if (!array_key_exists('trsf_id', $hook_item)) {
            write_log("hook_item does not have mv_id item, cannot do transactions_hook",
                __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $query = "
            SELECT TRANBASE.TRSB_CVL, TRANBASE.TRSB_AVL, TRANBASE.TRSB_TMP, TRANBASE.TRSB_DNS, TRANBASE.TRSB_TMP_F, 
                TRANBASE.TRSB_API, TRANBASE.TRSB_TK_TANKCODE, TRANBASE.TRSB_KG, TRANBASE.TRSB_UNT, BASE_PRODS.BASE_CODE, 
                BASE_PRODS.BASE_NAME , BASE_PRODS.BASE_CAT
            FROM TRANBASE, BASE_PRODS
            WHERE BASE_PRODS.BASE_CODE = TRANBASE.TRSB_BS AND 
                TRANBASE.TRSB_ID_TRSF_ID = :trsf_id
            ORDER BY BASE_PRODS.BASE_CAT DESC
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trsf_id', $hook_item['trsf_id']);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        //The last $method parameter need to be NonExistHook to prevent 
        Utilities::retrieve($result, $this, $stmt, $method='NonExistHook');
        $hook_item['base_prods'] = $result;

        //Another hook
        $result = array();
        $hook_item['meters'] = $result;
        
        $query = "
            SELECT MIN(TRSB_OPN_AMB) TRSB_OPN_AMB,
                MIN(TRSB_OPN_COR) TRSB_OPN_COR,
                MIN(TRSB_OPN_KG) TRSB_OPN_KG,
                MAX(TRSB_CLS_AMB) TRSB_CLS_AMB, 
                MAX(TRSB_CLS_COR) TRSB_CLS_COR,
                MAX(TRSB_CLS_KG) TRSB_CLS_KG,
                TRSB_METER,
                TRSB_ID_TRSF_ID
            FROM TRANBASE
            WHERE TRSB_ID_TRSF_ID = :trsf_id
                AND TRSB_INJECTOR IS NULL
            GROUP BY TRSB_METER, TRSB_ID_TRSF_ID
            ORDER BY TRSB_METER
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trsf_id', $hook_item['trsf_id']);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        //The last $method parameter need to be NonExistHook to prevent 
        Utilities::retrieve($result, $this, $stmt, $method='NonExistHook');
        $hook_item['meters'] = $result;
    }

    public function view_bol()
    {
        // tankTerm=C860&supp=1565102&tripNo=900000027&rpt_type=0&ftsize=16&forms=1&rows=1&transdoc=BOL
        if (!isset($this->trip_no)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: trip_no not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if (!isset($this->supplier)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: supplier not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $serv = new SiteService($this->conn);
        $site_code = $serv->site_code();
        $query_string = "tankTerm=" . $site_code . "&supp=" . $this->supplier .
            "&tripNo=" . $this->trip_no . "&rpt_type=0&ftsize=16&forms=1&rows=1&transdoc=BOL";
        
        if (isset($this->supermode)) {
            $query_string = $query_string . "&supermode=" . $this->supermode;
        }   

        $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/bill_of_lading_popup.cgi", $query_string);
        if (strpos($res, "redirectToLoginPage") !== false) {
            $error = new EchoSchema(400, response("__INVALID_SESSION__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        /**
         * Because CGI output tempx.php in /var/www/htdocs/phpwrapper/ folder.
         * orginal output sample: 
         * <html><body><embed src='temp0.php' width='100%' height='100%' type='application/pdf'></body></html>
         * so here change it to:
         * <html><body><embed src='../../../phpwrapper/temp0.php' width='100%' height='100%' type='application/pdf'></body></html>
        */
        $new_res = str_replace("embed src='", "embed src='../../../phpwrapper/", $res);
        
        echo $new_res;
    }

    public function print_bol()
    {
        // tankTerm=C860&supp=1565102&tripNo=900000026&tanker=11&op=18&transdoc=BOL
        if (!isset($this->trip_no)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: trip_no not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if (!isset($this->supplier)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: supplier not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $serv = new SiteService($this->conn);
        $site_code = $serv->site_code();
        $query_string = "tankTerm=" . $site_code . "&supp=" . $this->supplier .
            "&tripNo=" . $this->trip_no . "&op=18&transdoc=BOL";

        if (isset($this->supermode)) {
            $query_string = $query_string . "&supermode=" . $this->supermode;
        }

        $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/bill_of_lading.cgi", $query_string);
        if (strpos($res, "redirectToLoginPage") !== false) {
            $error = new EchoSchema(400, response("__INVALID_SESSION__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        } else {
            if (strpos($res, "op=28")) {
                $error = new EchoSchema(200, response("__BOL_PRINTED__"));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            } else {
                $error = new EchoSchema(500, response("__CGI_FAILED__"));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            }
        }
        
        echo $res;
    }

    public function view_loadreport()
    {
        // bill_of_lading_popup.php?tankTerm=C860&supp=1565102&tripNo=900000026&rpt_type=1&ftsize=15&forms=1&rows=1
        if (!isset($this->trip_no)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: trip_no not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if (!isset($this->supplier)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: supplier not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $serv = new SiteService($this->conn);
        $site_code = $serv->site_code();
        $query_string = "tankTerm=" . $site_code . "&supp=" . $this->supplier .
            "&tripNo=" . $this->trip_no . "&rpt_type=1&ftsize=15&forms=1&rows=1";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/bill_of_lading_popup.cgi", $query_string);
        if (strpos($res, "redirectToLoginPage") !== false) {
            $error = new EchoSchema(400, response("__INVALID_SESSION__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }
        
        /**
         * Because CGI output tempx.php in /var/www/htdocs/phpwrapper/ folder.
         * orginal output sample: 
         * <html><body><embed src='temp0.php' width='100%' height='100%' type='application/pdf'></body></html>
         * so here change it to:
         * <html><body><embed src='../../../phpwrapper/temp0.php' width='100%' height='100%' type='application/pdf'></body></html>
        */
        $new_res = str_replace("embed src='", "embed src='../../../phpwrapper/", $res);
        
        echo $new_res;
    }

    public function print_loadreport()
    {
        //bill_of_lading.php?&rpt_type=1&tankTerm=C860&supp=1565102&tripNo=900000026&tanker=11&op=18
        if (!isset($this->trip_no)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: trip_no not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        if (!isset($this->supplier)) {
            $error = new EchoSchema(400, response("__PARAMETER_EXCEPTION__", "parameter missing: supplier not provided"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $serv = new SiteService($this->conn);
        $site_code = $serv->site_code();
        $query_string = "tankTerm=" . $site_code . "&supp=" . $this->supplier .
            "&tripNo=" . $this->trip_no . "&op=18";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/bill_of_lading.cgi", $query_string);
        if (strpos($res, "redirectToLoginPage") !== false) {
            $error = new EchoSchema(400, response("__INVALID_SESSION__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        } else {
            if (strpos($res, "op=28")) {
                $error = new EchoSchema(200, response("__LOAD_REPORT_PRINTED__"));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            } else {
                $error = new EchoSchema(500, response("__CGI_FAILED__"));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return;
            }
        }
        
        echo $res;
    }

    public function reverse()
    {
        $serv = new ManualTransactionService($this->conn, $this->supplier, $this->trip_no);
        $serv->set_property('supplier', $this->supplier);
        $serv->set_property('trip_no', $this->trip_no);
        $error_msg = null;
        if (!$serv->reverse_trip($error_msg)) {
            if ($error_msg) {
                $error = new EchoSchema(500, response("__SCHEDULE_REVERSE_FAILED__", "Reverse failed: " . $error_msg));
            } else {
                $error = new EchoSchema(500, response("__SCHEDULE_REVERSE_FAILED__"));
            }
            
            echo json_encode($error, JSON_PRETTY_PRINT);
            write_log("reverse_trip failed", __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $error = new EchoSchema(200, response("__SCHEDULE_REVERSED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);
    }

    /**
     * Old PHP: dmSpecialMovements.processManualMovement -> ManualTransactions.class.php::do_nomination
     */
    public function submit()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        // write_log(json_encode($this), __FILE__, __LINE__);
        
        $serv = new MvitemService($this->conn, $this->mvitm_item_id);

        //Copy all parameters to serv
        // $serv->operator_code = $this->operator_code;
        $serv->operator_code = "8888";  //Force to use 8888 because baiman uses 8888
        $serv->tanker_code = $this->tanker_code;
        $serv->mvitm_item_id = $this->mvitm_item_id;
        $serv->temperature = $this->temperature;
        $serv->amb_vol = $this->amb_vol;
        $serv->cor_vol = $this->cor_vol;
        $serv->liq_kg = $this->liq_kg;
        $serv->density = $this->density;
        $serv->start_time = $this->start_time;
        $serv->end_time = $this->end_time;
        
        if (isset($this->from_tank)) {
            $serv->from_tank = $this->from_tank;
            $serv->from_supplier = $this->from_supplier;
            $serv->from_product = $this->from_product;
        }

        if (isset($this->to_tank)) {
            $serv->to_tank = $this->to_tank;
            $serv->to_supplier = $this->to_supplier;
            $serv->to_product = $this->to_product;
        }

        if (isset($this->alternate_qty)) {
            $serv->alternate_qty = $this->alternate_qty;
        }
        if (isset($this->alternate_unit)) {
            $serv->alternate_unit = $this->alternate_unit;
        }
        
        $error_msg = null;
        if ($serv->submit($error_msg)) {
            $result = new EchoSchema(200, response("__MANUAL_TRANS_SUBMITTED__",
                sprintf("Manual transaction for nomination %d submitted", $this->mvitm_item_id)));
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $result = new EchoSchema(500, response("__MANUAL_TRANS_FAILED__",
                "Failed to submit manual transaction for nomination, error message: " . $error_msg));
            echo json_encode($result, JSON_PRETTY_PRINT);
        }
    }
}