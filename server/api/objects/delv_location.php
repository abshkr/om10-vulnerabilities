<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

class DelvLocation extends CommonClass
{
    protected $TABLE_NAME = 'DELV_LOCATION';

    public $BOOLEAN_FIELDS = array(
        
    );

    public $NUMBER_FIELDS = array(
        "DELV_CUST_COUNT",
        "DELV_ORDER_COUNT"
    );

    public function unit_types()
    {
        $enum_service = new EnumService($this->conn);
        return $enum_service->document_types();
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

    // read personnel
    public function read()
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
            ORDER BY DELV_CODE";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // pure php function
    public function create()
    {
        $query = "INSERT INTO CST_PRCE_CATEGOR
                (CATEG_CODE,
                CATEG_DESCRIPT)
        VALUES (:categ_code,
                :categ_descript)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':categ_code', $this->category_code);
        oci_bind_by_name($stmt, ':categ_descript', $this->category_name);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "customer catetory";
        $jnl_data[2] = $this->category_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ADD, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    public function update()
    {
        $query = "
            SELECT CATEG_CODE CATEGORY_CODE,
                CATEG_DESCRIPT CATEGORY_NAME
            FROM CST_PRCE_CATEGOR
            WHERE CATEG_CODE = :categ_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':categ_code', $this->category_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            // write_log(json_encode($row), __FILE__, __LINE__);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "UPDATE CST_PRCE_CATEGOR
                SET CATEG_DESCRIPT = :categ_descript
                WHERE CATEG_CODE = :categ_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':categ_code', $this->category_code);
        oci_bind_by_name($stmt, ':categ_descript', $this->category_name);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "customer category";
        $jnl_data[2] = $this->category_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $module = "customer category";
        $record = sprintf("code:%s", $this->category_code);
        foreach ($this as $key => $value) {
            if (isset($row[strtoupper($key)]) && $value != $row[strtoupper($key)] &&
                !$journal->valueChange(
                    $module, $record, $key, $row[strtoupper($key)], $value)) {
                return false;
            }
        }

        oci_commit($this->conn);
        return true;
    }

    public function delete()
    {
        $query = "DELETE FROM CST_PRCE_CATEGOR
                WHERE CATEG_CODE = :categ_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':categ_code', $this->category_code);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $journal = new Journal($this->conn, $autocommit = false);
        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = "customer category";
        $jnl_data[2] = $this->category_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_DELETE, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }
}
