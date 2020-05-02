<?php

include_once __DIR__ . '/../shared/log.php';

class PartnershipService
{
    public function __construct($db, $auto_commit = false)
    {
        $this->conn = $db;
        $this->auto_commit = $auto_commit;

        if ($this->auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
    }

    private function partners($partner_type)
    {
        $query = "
            SELECT CCP.CCP_CMPY_CODE PARTNER_CMPY_CODE,
                CMP.CMPY_NAME PARTNER_CMPY_NAME,
                CCP.CCP_CUST_ACCT PARTNER_CUST_ACCT,
                CCM.CMPY_NAME PARTNER_CUST_NAME,
                CCP.CCP_PRTNR_SEQ PARTNER_SEQ,
                PR.PRTNR_CODE PARTNER_CODE,
                PR.PRTNR_NAME1 PARTNER_NAME1,
                PR.PRTNR_NAME2 PARTNER_NAME2,
                PR.PRTNR_NAME3 PARTNER_NAME3,
                PR.PRTNR_NAME4 PARTNER_NAME4,
                PR.PRTNR_NAME5 PARTNER_NAME5,
                PR.PRTNR_TYPE PARTNER_TYPE,
                PT.PARTNER_TYPE_NAME PARTNER_TYPE_NAME,
                PR.PRTNR_ADDR PARTNER_ADDR_CODE
            FROM 
                CMPY_CUST_PRTNR CCP,
                GUI_COMPANYS CMP,
                CUSTOMER CST,
                COMPANYS CCM,
                PARTNER PR,
                PARTNER_TYPES PT
            WHERE CCP.CCP_PRTNR_SEQ = PR.PRTNR_SEQ
                AND PR.PRTNR_TYPE = PT.PARTNER_TYPE_CODE
                AND CCP.CCP_CMPY_CODE = CMP.CMPY_CODE
                AND CCP.CCP_CUST_ACCT = CST.CUST_ACCT(+)
                AND CST.CUST_CODE = CCM.CMPY_CODE(+)
                AND CCP.CCP_CMPY_CODE = PR.PRTNR_CMPY
                AND PR.PRTNR_TYPE = :partner_type";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':partner_type', $partner_type);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function sold_tos()
    {
        return $this->partners('AG');
    }

    public function ship_tos()
    {
        return $this->partners('WE');
    }
}
