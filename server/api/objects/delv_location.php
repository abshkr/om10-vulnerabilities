<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

class DelvLocation extends CommonClass
{
    protected $TABLE_NAME = 'DELV_LOCATION';
    
    protected $table_view_map = array(
        "DLV_CODE" => "DELV_CODE",
        "DLV_NAME" => "DELV_NAME",
        "DLV_ADDR" => "DELV_ADDR",
        "DLV_GRID" => "DELV_GRID",
        "DLV_TRANSTYPE" => "DELV_TRSP_TYPEID",
        "DLV_DOC_TYPE" => "DELV_DOC_TYPEID",
        "DLV_QTY_TYPE" => "DELV_QTY_TYPEID",
        "DLV_ETYP_ID" => "DELV_ETYP_ID",
        "DLV_PHONE" => "DELV_PHONE",
        "DLV_TRIP_TIME" => "DELV_TRIP_TIME",
        "DLV_TARRIF" => "DELV_TARRIF",
        "DLV_DISTANCE" => "DELV_DISTANCE",
        "DLV_CONTACT_NAME" => "DELV_CONTACT",
        "DLV_PROF" => "DELV_PRF_CODE",
    );

    public $NUMBER_FIELDS = array(
        "DELV_TRSP_TYPEID",
        "DELV_DOC_TYPEID",
        "DELV_QTY_TYPEID",
        "DELV_ETYP_ID",
        "DELV_TRIP_TIME",
        "DELV_TARRIF",
        "DELV_DISTANCE",
        "DELV_CUST_COUNT",
        "DELV_ORDER_COUNT"
    );

    public $BOOLEAN_FIELDS = array(
        
    );

    public function unit_types()
    {
        $enum_service = new EnumService($this->conn);
        return $enum_service->unit_types();
    }

    public function document_types()
    {
        $enum_service = new EnumService($this->conn);
        return $enum_service->document_types();
    }

    public function transport_types()
    {
        $enum_service = new EnumService($this->conn);
        return $enum_service->transport_types();
    }

    public function profiles()
    {
        $query = "
            SELECT
                PR.PRF_CODE
                , PR.PRF_ETYP
                , PR.PRF_SUPP
                , ET.ETYP_TITLE             AS PRF_ETYP_NAME
                , SC.CMPY_NAME              AS PRF_SUPP_NAME
                , (PR.PRF_CODE||' - '||PR.PRF_ETYP||', '||ET.ETYP_TITLE||' - '||PR.PRF_SUPP||', '||SC.CMPY_NAME)            AS PRF_DESC
            FROM 
                PROFILE                 PR
                , EQUIP_TYPES           ET
                , COMPANYS              SC
            WHERE 
                PR.PRF_ETYP = ET.ETYP_ID
                AND PR.PRF_SUPP = SC.CMPY_CODE
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_delvloc_existence()
    {
        $query = "
            SELECT COUNT(*) AS CNT FROM DELV_LOCATION WHERE DLV_CODE=:delv_code
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':delv_code', $this->delv_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_delvloc_usage()
    {
        $query = "
            SELECT COUNT(*) AS CNT FROM DELV_FOR_CUST WHERE DLC_CUSTOMER=:acct_no AND DLC_DELV_LOC=:delv_no
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':acct_no', $this->cust_acnt);
        oci_bind_by_name($stmt, ':delv_no', $this->delv_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // read delivery locations
    public function read()
    {
        if (isset($this->delv_cust_acct) && $this->delv_cust_acct != '') {
            return $this->read_include_customer();
        }
        else {
            return $this->read_exclude_customer();
        }
    }

    // read delivery locations links to customers
    public function read_include_customer()
    {
        $query = "
            SELECT 
                DL.DLV_CODE DELV_CODE,
                DL.DLV_NAME DELV_NAME,
                DL.DLV_ADDR DELV_ADDR_CODE,
                NVL(AL.DB_ADDR_TEXT, ' ') DELV_ADDR_TEXT,
                DECODE(DA.DB_ADDRESS_KEY, NULL, ' ', DA.DB_ADDRESS_KEY||'['||NVL(AL.DB_ADDR_TEXT, ' ')||']') DELV_ADDR_DESC,
                DL.DLV_GRID DELV_GRID,
                DL.DLV_TRANSTYPE DELV_TRSP_TYPEID,
                TT.TRANSPORT_NAME DELV_TRSP_TYPENAME,
                DL.DLV_DOC_TYPE DELV_DOC_TYPEID,
                DT.DOCUMENT_NAME DELV_DOC_TYPENAME,
                DL.DLV_QTY_TYPE DELV_QTY_TYPEID,
                QT.QTY_NAME DELV_QTY_TYPENAME,
                DL.DLV_ETYP_ID DELV_ETYP_ID,
                ET.ETYP_TITLE DELV_ETYP_TITLE,
                DL.DLV_PHONE DELV_PHONE,
                DL.DLV_TRIP_TIME DELV_TRIP_TIME,
                DL.DLV_TARRIF DELV_TARRIF,
                DL.DLV_DISTANCE DELV_DISTANCE,
                DL.DLV_CONTACT_NAME DELV_CONTACT,
                DL.DLV_PROF DELV_PRF_CODE,
                DECODE(DL.DLV_PROF, NULL, ' ', PR.PRF_DESC) DELV_PRF_DESC,
                DC.DLC_CUSTOMER DELV_CUST_ACCT,
                CU.CUST_DESC DELV_CUST_ACCTDESC,
                CU.CUST_SUPP_CODE DELV_CUST_SUPPCODE,
                CU.CUST_SUPP_NAME DELV_CUST_SUPPNAME,
                CU.CUST_CMPY_CODE DELV_CUST_CMPYCODE,
                CU.CUST_CMPY_NAME DELV_CUST_CMPYNAME,
                CU.CUST_CTGR_CODE DELV_CUST_CATGCODE,
                CU.CUST_CTGR_TEXT DELV_CUST_CATGTEXT,
                NVL(DCNT.DELV_CUST_COUNT, 0) DELV_CUST_COUNT,
                NVL(CO.DELV_ORDER_COUNT, 0) DELV_ORDER_COUNT
            FROM 
                DELV_LOCATION DL,
                TRANSPORT_TYP TT,
                DOCUMENT_TYP DT,
                QTY_TYP QT,
                EQUIP_TYPES ET,
                DB_ADDRESS DA,
                (
                    SELECT 
                    DB_ADDR_LINE_ID,
                    NVL(LISTAGG(DB_ADDR_LINE, ', ') WITHIN GROUP (ORDER BY DB_ADDRLINE_NO), ' ') DB_ADDR_TEXT
                    FROM DB_ADDRESS_LINE
                    GROUP BY DB_ADDR_LINE_ID
                ) AL,
                (
                    SELECT
                        PROFILE.PRF_CODE,
                        (PROFILE.PRF_CODE||' - '||PROFILE.PRF_ETYP||', '||EQUIP_TYPES.ETYP_TITLE||' - '||PROFILE.PRF_SUPP||', '||COMPANYS.CMPY_NAME) PRF_DESC
                    FROM PROFILE,
                        EQUIP_TYPES,
                        COMPANYS
                    WHERE PROFILE.PRF_ETYP = EQUIP_TYPES.ETYP_ID
                        AND PROFILE.PRF_SUPP = COMPANYS.CMPY_CODE
                ) PR,
                DELV_FOR_CUST DC,
                (
                    SELECT 
                        CUST.CUST_ACCT CUST_ACNT,
                        CUST.CUST_SUPP CUST_SUPP_CODE,
                        SCMP.CMPY_NAME CUST_SUPP_NAME,
                        CUST.CUST_CODE CUST_CMPY_CODE,
                        CCMP.CMPY_NAME CUST_CMPY_NAME,
                        CUST.CUST_ACCT||' - '||CCMP.CMPY_NAME CUST_DESC,
                        CUST.CUST_CATEGORY CUST_CTGR_CODE,
                        CATG.CATEG_DESCRIPT CUST_CTGR_TEXT
                    FROM 
                        CUSTOMER CUST,
                        COMPANYS SCMP,
                        COMPANYS CCMP,
                        CST_PRCE_CATEGOR CATG
                    WHERE CUST.CUST_SUPP = SCMP.CMPY_CODE 
                        AND CUST.CUST_CODE = CCMP.CMPY_CODE
                        AND CUST.CUST_CATEGORY = CATG.CATEG_CODE(+)
                ) CU,
                (
                    SELECT DLC_DELV_LOC,
                        COUNT(*) DELV_CUST_COUNT
                    FROM DELV_FOR_CUST
                    GROUP BY DLC_DELV_LOC
                ) DCNT,
                (
                    SELECT ORDER_DLV_CODE,
                        COUNT(*) DELV_ORDER_COUNT
                    FROM CUST_ORDER
                    GROUP BY ORDER_DLV_CODE
                ) CO
            WHERE DL.DLV_CODE = DC.DLC_DELV_LOC(+)
                AND DC.DLC_CUSTOMER = CU.CUST_ACNT(+)
                AND DL.DLV_ADDR = DA.DB_ADDRESS_KEY(+)
                AND DA.DB_ADDRESS_KEY = AL.DB_ADDR_LINE_ID(+)
                AND DL.DLV_TRANSTYPE = TT.TRANSPORT_ID(+)
                AND DL.DLV_DOC_TYPE = DT.DOCUMENT_ID(+)
                AND DL.DLV_QTY_TYPE = QT.QTY_ID(+)
                AND DL.DLV_ETYP_ID = ET.ETYP_ID(+)
                AND DL.DLV_PROF = PR.PRF_CODE(+)
                AND DL.DLV_CODE = DCNT.DLC_DELV_LOC(+)
                AND DL.DLV_CODE = CO.ORDER_DLV_CODE(+)
                and ('-1' = :customer OR DC.DLC_CUSTOMER = :customer)
            ORDER BY DELV_CODE
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':customer', $this->delv_cust_acct);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // read delivery locations disragarding the customers
    public function read_exclude_customer()
    {
        $query = "
            SELECT 
                DL.DLV_CODE                                     AS DELV_CODE
                , DL.DLV_NAME                                   AS DELV_NAME 
                , DL.DLV_ADDR                                   AS DELV_ADDR_CODE
                , NVL(AL.DB_ADDR_TEXT, ' ')                     AS DELV_ADDR_TEXT
                , DECODE(DA.DB_ADDRESS_KEY, NULL, ' ', DA.DB_ADDRESS_KEY||'['||NVL(AL.DB_ADDR_TEXT, ' ')||']')      AS DELV_ADDR_DESC
                , DL.DLV_GRID                                   AS DELV_GRID 
                , DL.DLV_TRANSTYPE                              AS DELV_TRSP_TYPEID
                , TT.TRANSPORT_NAME                             AS DELV_TRSP_TYPENAME
                , DL.DLV_DOC_TYPE                               AS DELV_DOC_TYPEID
                , DT.DOCUMENT_NAME                              AS DELV_DOC_TYPENAME
                , DL.DLV_QTY_TYPE                               AS DELV_QTY_TYPEID 
                , QT.QTY_NAME                                   AS DELV_QTY_TYPENAME 
                , DL.DLV_ETYP_ID                                AS DELV_ETYP_ID 
                , ET.ETYP_TITLE                                 AS DELV_ETYP_TITLE 
                , DL.DLV_PHONE                                  AS DELV_PHONE 
                , DL.DLV_TRIP_TIME                              AS DELV_TRIP_TIME 
                , DL.DLV_TARRIF                                 AS DELV_TARRIF 
                , DL.DLV_DISTANCE                               AS DELV_DISTANCE 
                , DL.DLV_CONTACT_NAME                           AS DELV_CONTACT 
                , DL.DLV_PROF                                   AS DELV_PRF_CODE 
                , DECODE(DL.DLV_PROF, NULL, ' ', PR.PRF_DESC)   AS DELV_PRF_DESC 
                , '-1'                                          AS DELV_CUST_ACCT
                , ''                                            AS DELV_CUST_ACCTDESC
                , '-1'                                          AS DELV_CUST_SUPPCODE
                , ''                                            AS DELV_CUST_SUPPNAME
                , '-1'                                          AS DELV_CUST_CMPYCODE
                , ''                                            AS DELV_CUST_CMPYNAME
                , '-1'                                          AS DELV_CUST_CATGCODE
                , ''                                            AS DELV_CUST_CATGTEXT
                , NVL(DC.DELV_CUST_COUNT, 0)                    AS DELV_CUST_COUNT
                , NVL(CO.DELV_ORDER_COUNT, 0)                   AS DELV_ORDER_COUNT
            FROM 
                DELV_LOCATION                   DL
                , TRANSPORT_TYP                 TT
                , DOCUMENT_TYP                  DT
                , QTY_TYP                       QT
                , EQUIP_TYPES                   ET
                , DB_ADDRESS                    DA
                , (
                    SELECT 
                        DB_ADDR_LINE_ID
                        , NVL(LISTAGG(DB_ADDR_LINE, ', ') WITHIN GROUP (ORDER BY DB_ADDRLINE_NO), ' ')   AS DB_ADDR_TEXT
                    FROM 
                        DB_ADDRESS_LINE
                    WHERE 
                        1 = 1 
                    GROUP BY 
                        DB_ADDR_LINE_ID
                )                               AL
                , (
                    SELECT
                        PROFILE.PRF_CODE
                        , (PROFILE.PRF_CODE||' - '||PROFILE.PRF_ETYP||', '||EQUIP_TYPES.ETYP_TITLE||' - '||PROFILE.PRF_SUPP||', '||COMPANYS.CMPY_NAME)          AS PRF_DESC
                    FROM 
                        PROFILE
                        , EQUIP_TYPES
                        , COMPANYS
                    WHERE 
                        PROFILE.PRF_ETYP = EQUIP_TYPES.ETYP_ID
                        AND PROFILE.PRF_SUPP = COMPANYS.CMPY_CODE
                )                               PR
                , (
                    SELECT 
                        DLC_DELV_LOC
                        , COUNT(*)              AS DELV_CUST_COUNT
                    FROM DELV_FOR_CUST
                    WHERE 1=1
                    GROUP BY DLC_DELV_LOC
                )                   DC
                , (
                    SELECT
                        ORDER_DLV_CODE
                        , COUNT(*)          AS DELV_ORDER_COUNT
                    FROM 
                        CUST_ORDER
                    WHERE 
                        1=1
                    GROUP BY ORDER_DLV_CODE
                )                       CO
            WHERE
                DL.DLV_ADDR         = DA.DB_ADDRESS_KEY(+)
                AND DA.DB_ADDRESS_KEY   = AL.DB_ADDR_LINE_ID(+)
                AND DL.DLV_TRANSTYPE    = TT.TRANSPORT_ID(+)
                AND DL.DLV_DOC_TYPE     = DT.DOCUMENT_ID(+)
                AND DL.DLV_QTY_TYPE     = QT.QTY_ID(+)
                AND DL.DLV_ETYP_ID      = ET.ETYP_ID(+)
                AND DL.DLV_PROF         = PR.PRF_CODE(+)
                AND DL.DLV_CODE         = DC.DLC_DELV_LOC(+)
                AND DL.DLV_CODE         = CO.ORDER_DLV_CODE(+)
                ORDER BY DELV_CODE
        ";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_customer_by_delvloc($mode, $delv_code, $supplier="-1", $category="-1")
    {
        $query = "
            select 
                cust.CUST_ACCT                                  as CUST_ACNT 
                , cust.CUST_SUPP                                as CUST_SUPP_CODE
                , scmp.CMPY_NAME                                as CUST_SUPP_NAME
                , cust.CUST_CODE                                as CUST_CMPY_CODE
                , ccmp.CMPY_NAME                                as CUST_CMPY_NAME
                , cust.CUST_ACCT||' - '||ccmp.CMPY_NAME         as CUST_DESC
                , cust.CUST_CATEGORY                            as CUST_CTGR_CODE
                , catg.CATEG_DESCRIPT                           as CUST_CTGR_TEXT
            from 
                CUSTOMER                cust
                , COMPANYS              scmp
                , COMPANYS              ccmp
                , CST_PRCE_CATEGOR      catg
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and cust.CUST_CATEGORY = catg.CATEG_CODE(+)
                and ('-1'=:supplier or cust.CUST_SUPP=:supplier) 
                and ('-1'=:category or cust.CUST_CATEGORY=:category) 
                and (cust.CUST_ACCT $mode (select DLC_CUSTOMER from DELV_FOR_CUST where DLC_DELV_LOC=:delv_code))
            order by CUST_CMPY_NAME         
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $supplier);
        oci_bind_by_name($stmt, ':category', $category);
        oci_bind_by_name($stmt, ':delv_code', $delv_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_customer_have_delvloc()
    {
        return $this->read_customer_by_delvloc("in", $this->delv_code, $this->delv_cust_suppcode, $this->delv_cust_catgcode);
    }

    public function read_customer_haveno_delvloc()
    {
        return $this->read_customer_by_delvloc("not in", $this->delv_code, $this->delv_cust_suppcode, $this->delv_cust_catgcode);
    }

    protected function insert_one_link($delv_code, $delv_name, $cust_acct, $cust_desc)
    {
        if (!isset($value)) {
            return true;
        }
        
        $query = "
            INSERT INTO DELV_FOR_CUST
            ( 
                DLC_CUSTOMER
                , DLC_DELV_LOC
            ) 
            VALUES 
            (
                :cust_acct
                , :delv_code
            )
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cust_acct', $cust_acct);
        oci_bind_by_name($stmt, ':delv_code', $delv_code);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    protected function delete_one_link($delv_code, $delv_name, $cust_acct, $cust_desc)
    {
        if (!isset($value)) {
            return true;
        }
        
        $query = "
            DELETE FROM DELV_FOR_CUST
            WHERE 
            ( 
                DLC_CUSTOMER = :cust_acct
                AND DLC_DELV_LOC = :delv_code
            ) 
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cust_acct', $cust_acct);
        oci_bind_by_name($stmt, ':delv_code', $delv_code);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    public function insert_links()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (!isset($this->cust_items)) {
            return true;
        }
        
        foreach ($this->cust_items as $value) {
            $result = $this->insert_one_link( $this->delv_code, $this->delv_name, $value->cust_acnt, $value->cust_desc );
            if ( $result === false )
            {
                return false;
            }
        }

        return true;
    }

    public function delete_links()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (!isset($this->cust_items)) {
            return true;
        }
        
        foreach ($this->cust_items as $value) {
            $result = $this->delete_one_link( $this->delv_code, $this->delv_name, $value->cust_acnt, $value->cust_desc );
            if ( $result === false )
            {
                return false;
            }
        }

        return true;
    }
}
