<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

//Old PHP: amf PartnerService.php
class Partner extends CommonClass
{
    protected $TABLE_NAME = 'PARTNER';
    protected $VIEWER_NAME = 'PARTNER';
    protected $check_mandatory = false;

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

    // 
    public function read()
    {
        $query = "
            SELECT 
                PR.PRTNR_SEQ,
                PR.PRTNR_CMPY,
                CM.CMPY_NAME PRTNR_CMPY_NAME,
                PR.PRTNR_CODE,
                PR.PRTNR_NAME1,
                PR.PRTNR_NAME2,
                PR.PRTNR_NAME3,
                PR.PRTNR_NAME4,
                PR.PRTNR_NAME5,
                PR.PRTNR_TYPE,
                PT.PARTNER_TYPE_NAME PRTNR_TYPE_NAME,
                PR.PRTNR_ADDR,
                NVL(DL.DB_ADDR_TEXT, ' ') PRTNR_ADDR_TEXT,
                PR.PRTNR_SEQ || ' - ' || PR.PRTNR_CODE || ' - ' || PR.PRTNR_NAME1 PRTNR_DESC
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
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function pre_create()
    {
        $query = "SELECT NVL(MAX(PRTNR_SEQ), 0) + 1 NEXT_ID FROM PARTNER";

        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 1;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $this->prtnr_seq = intval($row['NEXT_ID']);
    }

    // public function post_create()
    // {
    //     $query = "INSERT INTO CMPY_CUST_PRTNR(CCP_CMPY_CODE, CCP_CUST_ACCT, CCP_PRTNR_SEQ)
    //         VALUES (:ccp_cmpy_code, NULL, :ccp_prtnr_seq)";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':ccp_cmpy_code', $this->prtnr_cmpy);
    //     oci_bind_by_name($stmt, ':ccp_prtnr_seq', $this->prtnr_seq);
    //     if (oci_execute($stmt, $this->commit_mode)) {
    //         return true;
    //     } else {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         oci_rollback($this->conn);
    //         return false;
    //     }
    // }

    protected function check_deletable()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "
            SELECT COUNT(*) CN
            FROM CMPY_CUST_PRTNR
            WHERE CCP_PRTNR_SEQ = :ccp_prtnr_seq";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ccp_prtnr_seq', $this->prtnr_seq);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['CN'] > 0) {
            throw new UndeletableException(sprintf("Partner %s cannot be deleted because it partnership", $this->prtnr_seq));
        }

        return true;
    }
}
