<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/role_service.php';
include_once 'common_class.php';

class IDAssignment extends CommonClass
{
    protected $TABLE_NAME = 'ACCESS_KEYS';

    public $kya_sp_supplier = '-1';

    public $start_num = 1;
    public $end_num = null;

    public $BOOLEAN_FIELDS = array(
        "KYA_LOCK" => "Y",
        "KYA_ADHOC" => "Y",
    );

    public $NUMBER_FIELDS = array(
        
    );

    public function check_assn_num()
    {
        $query = "
            SELECT COUNT(*) AS CNT FROM ACCESS_KEYS WHERE KYA_KEY_NO=:key_no
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':key_no', $this->kya_key_no);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function count()
    {
        $query = "
            SELECT COUNT(*) CN
            FROM GUI_ACCESS_KEYS";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function kyaList()
    {
        $query = "
            SELECT KYA_TXT
            FROM GUI_ACCESS_KEYS
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

    public function adhoc_keys()
    {
        $query = "
            SELECT 
                kya_key_no
                , kya_txt
                , kya_tanker 
            FROM 
                gui_access_keys 
            WHERE 
                kya_type=4 
                and kya_lock='N'
                and kya_adhoc='Y'
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

    // read personnel
    public function read()
    {
        if (!isset($this->end_num)) {
            $this->start_num = 1;
            $this->end_num = $this->count();
        }

        $query = "
            SELECT KYA_KEY_NO,
                KYA_KEY_ISSUER,
                KYA_ISSUER_NAME,
                KYA_TYPE,
                KYA_TYPE_NAME,
                KYA_PHYS_TYPE,
                KYA_PHYS_NAME,
                KYA_TIMECODE,
                KYA_LOCK,
                KYA_ADHOC,
                KYA_TXT,
                KYA_KEY_CREATED,
                KYA_PIN,
                KYA_PIN_CHANGED,
                KYA_PERSONNEL KYA_PERSONNEL,
                KYA_PSNL_NAME KYA_PSNL_NAME,
                KYA_PSNL_CMPY,
                KYA_PSNL_CMPY_NAME,
                KYA_ROLE,
                KYA_ROLE_NAME KYA_ROLE_NAME,
                KYA_DRAWER,
                KYA_DRAW_NAME,
                KYA_SUPPLIER,
                KYA_SUPP_NAME,
                KYA_TANKER,
                KYA_TNKR_NAME,
                DECODE(KYA_TNKR_NAME, NULL, KYA_TANKER,
                    KYA_TANKER||'['||KYA_TNKR_NAME||']') KYA_TNKR_DESC,
                KYA_TNKR_CMPY,
                KYA_TNKR_CMPY_NAME,
                KYA_EQUIPMENT,
                KYA_EQPT_NAME,
                DECODE(KYA_EQPT_NAME, NULL, TO_CHAR(KYA_EQPT_CODE),
                    KYA_EQPT_CODE||'['||KYA_EQPT_NAME||']') KYA_EQPT_DESC,
                KYA_EQPT_CMPY,
                KYA_EQPT_CMPY_NAME,
                KYA_ETYP_NAME,
                KYA_LOAD_SITE,
                KYA_SITE_NAME,
                KYA_LOAD_ID,
                KYA_TRIP_NO ,
                KYA_ALLOC_TYPE,
                KYA_ALLOC_TYPE_NAME,
                KYA_ALLOC_CMPY,
                KYA_ALLOC_CMPY_NAME,
                KYA_ORDER_NO,
                KYA_CUST_ORDNO,
                KYA_CUST_NAME,
                DECODE(KYA_ORDER_NO, NULL, NULL, (KYA_ORDER_NO ||'['||KYA_CUST_NAME||':'||KYA_CUST_ORDNO||']')) KYA_ORDER_DESC
            FROM
            (
                SELECT RES.*, ROWNUM RN
                FROM
                (
                    SELECT GUI_ACCESS_KEYS.*
                    FROM GUI_ACCESS_KEYS
                    ORDER BY KYA_KEY_ISSUER, KYA_KEY_NO
                ) RES
            )
            WHERE RN >= :start_num
                AND RN <= :end_num";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':start_num', $this->start_num);
        oci_bind_by_name($stmt, ':end_num', $this->end_num);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function tanker_count($tnkr_owner)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT COUNT(*) CN
            FROM GUI_TANKERS
            WHERE TNKR_OWNER LIKE :tnkr_owner";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tnkr_owner', $tnkr_owner);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function tankers()
    {
        $query = "
            SELECT TNKR_CODE,
                TNKR_NAME,
                TNKR_ETP AS TNKR_ETYP_ID,
                TNKR_EQPT_NAME AS TNKR_ETYP_NAME,
                TNKR_CARRIER,
                TNKR_CARRIER_NAME,
                TNKR_OWNER,
                TNKR_OWNER_NAME,
                DECODE(TNKR_NAME, NULL, TNKR_CODE, TNKR_CODE||'['||TNKR_NAME||']') AS TNKR_DESC
            FROM GUI_TANKERS
            WHERE TNKR_OWNER LIKE :tnkr_owner
            ORDER BY TNKR_CODE ASC";

        $stmt = oci_parse($this->conn, $query);
        if (isset($this->tnkr_owner)) {
            $this->tnkr_owner = '%' . $this->tnkr_owner . '%';
        } else {
            $this->tnkr_owner = '%';
        }

        oci_bind_by_name($stmt, ':tnkr_owner', $this->tnkr_owner);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function schedulables_count($owner)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT COUNT(*) CN
            FROM
                GUI_EQUIPMENT_LIST EL, EQUIP_TYPES ET
            WHERE ";
        if (isset($owner)) {
            $query = $query . " EL.EQPT_OWNER = :owner AND ";
        }

        $query = $query . " EL.EQPT_ETP = ET.ETYP_ID
                AND UPPER(ET.ETYP_SCHEDUL)= 'Y'
            ORDER BY EQPT_CODE";

        $stmt = oci_parse($this->conn, $query);
        if (isset($owner)) {
            oci_bind_by_name($stmt, ':owner', $owner);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function schedulables()
    {
        $query = "
            SELECT EL.EQPT_ID,
                EL.EQPT_CODE,
                EL.EQPT_TITLE AS EQPT_NAME,
                EL.EQPT_ETP AS EQPT_ETYP_ID,
                EL.EQPT_ETP_TITLE AS EQPT_ETYP_NAME,
                EL.EQPT_OWNER AS EQPT_OWNR_CODE,
                EL.EQPT_OWNER_NAME AS EQPT_OWNR_NAME,
                DECODE(EL.EQPT_TITLE, NULL, EL.EQPT_CODE,
                    EL.EQPT_CODE||'['||EL.EQPT_TITLE||']') AS EQPT_DESC
            FROM
                GUI_EQUIPMENT_LIST EL, EQUIP_TYPES ET
            WHERE ";
        if (isset($this->owner)) {
            $query = $query . " EL.EQPT_OWNER = :owner AND ";
        }

        $query = $query . " EL.EQPT_ETP = ET.ETYP_ID
                AND UPPER(ET.ETYP_SCHEDUL)= 'Y'
            ORDER BY EQPT_CODE";

        $stmt = oci_parse($this->conn, $query);
        if (isset($this->owner)) {
            oci_bind_by_name($stmt, ':owner', $this->owner);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function non_schedulables_count($owner)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT COUNT(*) CN
            FROM
                GUI_EQUIPMENT_LIST EL, EQUIP_TYPES ET
            WHERE ";
        if (isset($owner)) {
            $query = $query . " EL.EQPT_OWNER = :owner AND ";
        }

        $query = $query . " EL.EQPT_ETP = ET.ETYP_ID
                AND UPPER(ET.ETYP_SCHEDUL) = 'N'
            ORDER BY EQPT_CODE";

        $stmt = oci_parse($this->conn, $query);
        if (isset($owner)) {
            oci_bind_by_name($stmt, ':owner', $owner);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function non_schedulables()
    {
        $query = "
            SELECT EL.EQPT_ID,
                EL.EQPT_CODE,
                EL.EQPT_TITLE AS EQPT_NAME,
                EL.EQPT_ETP AS EQPT_ETYP_ID,
                EL.EQPT_ETP_TITLE AS EQPT_ETYP_NAME,
                EL.EQPT_OWNER AS EQPT_OWNR_CODE,
                EL.EQPT_OWNER_NAME AS EQPT_OWNR_NAME,
                DECODE(EL.EQPT_TITLE, NULL, EL.EQPT_CODE,
                    EL.EQPT_CODE||'['||EL.EQPT_TITLE||']') AS EQPT_DESC
            FROM
                GUI_EQUIPMENT_LIST EL, EQUIP_TYPES ET
            WHERE ";
        if (isset($this->owner)) {
            $query = $query . " EL.EQPT_OWNER = :owner AND ";
        }

        $query = $query . " EL.EQPT_ETP = ET.ETYP_ID
                AND UPPER(ET.ETYP_SCHEDUL) = 'N'
            ORDER BY EQPT_CODE";

        $stmt = oci_parse($this->conn, $query);
        if (isset($this->owner)) {
            oci_bind_by_name($stmt, ':owner', $this->owner);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function assignmentTypes()
    {
        $query = "
            SELECT KEY_ID AS TYPE_ID,
                KEY_NAME AS TYPE_NAME
            FROM KEY_TYP
            WHERE KEY_ID IN (1,3,4,5,8,9)
            ORDER BY KEY_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function searchCount($tanker, $personnel, $tag)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT COUNT(*) CN
            FROM GUI_ACCESS_KEYS
            WHERE (KYA_TANKER LIKE :kya_tanker OR KYA_TANKER IS NULL)
                AND (KYA_PERSONNEL LIKE :kya_personnel OR KYA_PERSONNEL IS NULL)
                AND KYA_TXT LIKE :kya_txt";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':kya_tanker', $tanker);
        oci_bind_by_name($stmt, ':kya_personnel', $personnel);
        oci_bind_by_name($stmt, ':kya_txt', $tag);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function roles()
    {
        $serv = new RoleService($this->conn);
        return $serv->dropdown_role_types($include_any = false);
        // $query = "
        //     SELECT AUTH_LEVEL_ID ROLE_ID,
        //         AUTH_LEVEL_NAME ROLE_NAME
        //     FROM AUTH_LEVEL_TYP
        //     ORDER BY AUTH_LEVEL_ID";
        // $stmt = oci_parse($this->conn, $query);
        // if (oci_execute($stmt, $this->commit_mode)) {
        //     return $stmt;
        // } else {
        //     $e = oci_error($stmt);
        //     write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     return null;
        // }
    }

    public function physicalTypes()
    {
        $query = "
            SELECT KEY_PHYS_ID,
                KEY_PHYS_NAME
            FROM KEY_PHYS_TYP
            ORDER BY KEY_PHYS_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function lookupPsnCount($employer, $role)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT COUNT(*) CN
            FROM GUI_PERSONNEL, AUTH_LEVEL_TYP
            WHERE ";
        if (isset($employer)) {
            $query = $query . " PER_CMPY LIKE :employer AND ";
        }

        $query = $query . "PER_AUTH LIKE :role
                AND PER_AUTH = AUTH_LEVEL_ID(+)
            ORDER BY PER_CODE ASC
            ";
        $stmt = oci_parse($this->conn, $query);
        if (isset($employer)) {
            oci_bind_by_name($stmt, ':employer', $employer);
        }
        oci_bind_by_name($stmt, ':role', $role);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function lookupPersonnel()
    {
        $query = "
            SELECT PER_CODE,
                PER_NAME,
                PER_AUTH ROLE_ID,
                AUTH_LEVEL_NAME ROLE_NAME,
                PER_CMPY,
                CMPY_NAME,
                PER_DEPARTMENT
            FROM GUI_PERSONNEL, AUTH_LEVEL_TYP
            WHERE ";
        if (isset($this->employer)) {
            $query = $query . " PER_CMPY LIKE :employer AND ";
        }
        if (isset($this->role)) {
            $query = $query . " PER_AUTH LIKE :role AND ";
        }
        $query = $query . "PER_AUTH = AUTH_LEVEL_ID(+)
            ORDER BY PER_CODE ASC
            ";
        $stmt = oci_parse($this->conn, $query);
        if (isset($this->employer)) {
            $this->employer = '%' . $this->employer . '%';
            oci_bind_by_name($stmt, ':employer', $this->employer);
        }
        if (isset($this->role)) {
            $this->role = '%' . $this->role . '%';
            oci_bind_by_name($stmt, ':role', $this->role);
        }

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function search($tanker, $personnel, $tag)
    {
        if (!isset($this->end_num)) {
            $this->start_num = 1;
            $this->end_num = $this->searchCount($tanker, $personnel, $tag);
        }

        Utilities::sanitize($this);

        $query = "
            SELECT KYA_KEY_NO,
                KYA_KEY_ISSUER,
                KYA_ISSUER_NAME,
                KYA_TYPE,
                KYA_TYPE_NAME,
                KYA_PHYS_TYPE,
                KYA_PHYS_NAME,
                KYA_TIMECODE,
                KYA_LOCK,
                KYA_ADHOC,
                KYA_TXT,
                DECODE(KYA_KEY_CREATED, NULL, '',
                    TO_CHAR(KYA_KEY_CREATED, 'YYYY-MM-DD')) KYA_KEY_CREATED,
                KYA_PIN,
                DECODE(KYA_PIN_CHANGED, NULL, '',
                    TO_CHAR(KYA_PIN_CHANGED, 'YYYY-MM-DD')) KYA_PIN_CHANGED,
                NVL(KYA_PERSONNEL, '') KYA_PERSONNEL,
                NVL(KYA_PSNL_NAME, '') KYA_PSNL_NAME,
                KYA_PSNL_CMPY,
                KYA_PSNL_CMPY_NAME,
                NVL(KYA_ROLE, '') KYA_ROLE,
                NVL(KYA_ROLE_NAME, '') KYA_ROLE_NAME,
                KYA_DRAWER,
                KYA_DRAW_NAME,
                KYA_SUPPLIER,
                KYA_SUPP_NAME,
                KYA_TANKER,
                KYA_TNKR_NAME,
                DECODE(KYA_TNKR_NAME, NULL, KYA_TANKER,
                    KYA_TANKER||'['||KYA_TNKR_NAME||']') KYA_TNKR_DESC,
                KYA_TNKR_CMPY,
                KYA_TNKR_CMPY_NAME,
                KYA_EQUIPMENT,
                KYA_EQPT_NAME,
                DECODE(KYA_EQPT_NAME, NULL, TO_CHAR(KYA_EQPT_CODE),
                    KYA_EQPT_CODE||'['||KYA_EQPT_NAME||']') KYA_EQPT_DESC,
                KYA_EQPT_CMPY,
                KYA_EQPT_CMPY_NAME,
                KYA_ETYP_NAME,
                KYA_LOAD_SITE,
                KYA_SITE_NAME,
                KYA_LOAD_ID,
                KYA_TRIP_NO ,
                KYA_ALLOC_TYPE,
                KYA_ALLOC_TYPE_NAME,
                KYA_ALLOC_CMPY,
                KYA_ALLOC_CMPY_NAME,
                KYA_ORDER_NO,
                KYA_CUST_ORDNO,
                KYA_CUST_NAME,
                DECODE(KYA_ORDER_NO, NULL, NULL,
                    (KYA_ORDER_NO ||'['||KYA_CUST_NAME||':'||KYA_CUST_ORDNO||']')) KYA_ORDER_DESC
            FROM
            (
                SELECT RES.*, ROWNUM RN
                FROM
                (
                    SELECT GUI_ACCESS_KEYS.*
                    FROM GUI_ACCESS_KEYS
                    WHERE (KYA_TANKER LIKE :kya_tanker OR KYA_TANKER IS NULL)
                        AND (KYA_PERSONNEL LIKE :kya_personnel OR KYA_PERSONNEL IS NULL)
                        AND KYA_TXT LIKE :kya_txt
                    ORDER BY KYA_KEY_ISSUER, KYA_KEY_NO
                ) RES
            )
            WHERE RN >= :start_num
                AND RN <= :end_num";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':kya_tanker', $tanker);
        oci_bind_by_name($stmt, ':kya_personnel', $personnel);
        oci_bind_by_name($stmt, ':kya_txt', $tag);
        oci_bind_by_name($stmt, ':start_num', $this->start_num);
        oci_bind_by_name($stmt, ':end_num', $this->end_num);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    private function key_history($category, $sub_cat = '-1')
    {
        $curr_psn = Utilities::getCurrPsn();
        Utilities::sanitize($this);

        $query = "
        INSERT INTO ACCESS_KEYS_HISTORY
            (KYA_KEY_NO,
            KYA_KEY_ISSUER,
            KYA_TANKER,
            KYA_PSN,
            KYA_NAME,
            KYA_OPERATOR,
            KYA_DMY,
            KYA_CATEGORY,
            KYA_SUBCATEGORY,
            KYA_DRAWER,
            KYA_SP_SUPPLIER,
            KYA_PHYS_TYPE,
            KYA_TYPE,
            KYA_TXT)
        SELECT
            KYA_KEY_NO,
            KYA_KEY_ISSUER,
            KYA_TANKER,
            KYA_PSN,
            PER_NAME,
            :operator,
            SYSDATE,
            :category,
            DECODE(:sub_cat, '-1', NULL, :sub_cat),
            KYA_DRAWER,
            KYA_SP_SUPPLIER,
            KYA_PHYS_TYPE,
            KYA_TYPE,
            KYA_TXT
        FROM ACCESS_KEYS, PERSONNEL
        WHERE KYA_KEY_NO = :kya_key_no AND KYA_KEY_ISSUER = :kya_key_issuer
            AND KYA_PSN = PER_CODE(+)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':kya_key_no', $this->kya_key_no);
        oci_bind_by_name($stmt, ':kya_key_issuer', $this->kya_key_issuer);
        oci_bind_by_name($stmt, ':operator', $curr_psn);
        oci_bind_by_name($stmt, ':category', $category);
        oci_bind_by_name($stmt, ':sub_cat', $sub_cat);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    public function create()
    {
        $curr_psn = Utilities::getCurrPsn();

        $query = "
            SELECT NVL(CMPY_REQ_PIN_FLAG, 0) CMPY_REQ_PIN_FLAG
            FROM COMPANYS
            WHERE CMPY_CODE = :key_cmpy";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':key_cmpy', $this->kya_key_issuer);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        /* 3 -- KEY_PERSONNEL; 5 -- KEY_COMBINATION
        if CMPY_REQ_PIN_FLAG is 1 && it's a personnel card or combination card,
        set PIN as default 0000, otherwise use NULL */
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $default_pin = "-1";
        if ($row['CMPY_REQ_PIN_FLAG'] == 1 &&
            ($this->kya_key_issuer == 3 || $this->kya_key_issuer == 5)) {
            $default_pin = "bHUA7XfvOYA2";
        }

        if (!isset($this->kya_lock)) {
            $this->kya_lock = 'N';
        }

        if (!isset($this->kya_adhoc)) {
            $this->kya_adhoc = 'N';
        }

        if (isset($this->kya_txt)) {
            $this->kya_txt = strtoupper($this->kya_txt);
        }

        $query = "INSERT INTO ACCESS_KEYS
        (   KYA_KEY_NO,
            KYA_KEY_ISSUER,
            KYA_TXT,
            KYA_PHYS_TYPE,
            KYA_TYPE,
            KYA_TIMECD,
            KYA_LOCK,
            KYA_ADHOC,
            KYA_PSN,
            KYA_ROLE,
            KYA_DRAWER,
            KYA_TANKER,
            KYA_EQUIPMENT,
            KYA_PIN,
            KYA_SP_SUPPLIER,
            KYA_DMY )
        VALUES
        (   :kya_key_no,
            :kya_key_issuer,
            :kya_txt,
            :kya_phys_type,
            :kya_type,
            :kya_timecd,
            :kya_lock,
            :kya_adhoc,
            DECODE(:kya_psn, '-1', NULL, :kya_psn),
            DECODE(:kya_role, -1, NULL, :kya_role),
            DECODE(:kya_drawer, '-1', NULL, :kya_drawer),
            DECODE(:kya_tanker, '-1', NULL, :kya_tanker),
            DECODE(:kya_equipment, -1, NULL, :kya_equipment),
            DECODE(:default_pin, '-1', NULL, :default_pin),
            DECODE(:kya_sp_supplier, '-1', NULL, :kya_sp_supplier),
            SYSDATE)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':kya_key_no', $this->kya_key_no);
        oci_bind_by_name($stmt, ':kya_key_issuer', $this->kya_key_issuer);
        oci_bind_by_name($stmt, ':kya_txt', $this->kya_txt);
        oci_bind_by_name($stmt, ':kya_phys_type', $this->kya_phys_type);
        oci_bind_by_name($stmt, ':kya_type', $this->kya_type);
        oci_bind_by_name($stmt, ':kya_timecd', $this->kya_timecode);
        oci_bind_by_name($stmt, ':kya_lock', $this->kya_lock);
        oci_bind_by_name($stmt, ':kya_adhoc', $this->kya_adhoc);
        oci_bind_by_name($stmt, ':kya_psn', $this->kya_personnel);
        oci_bind_by_name($stmt, ':kya_role', $this->kya_role);
        oci_bind_by_name($stmt, ':kya_drawer', $this->kya_drawer);
        oci_bind_by_name($stmt, ':kya_tanker', $this->kya_tanker);
        oci_bind_by_name($stmt, ':kya_equipment', $this->kya_equipment);
        oci_bind_by_name($stmt, ':default_pin', $default_pin);
        oci_bind_by_name($stmt, ':kya_sp_supplier', $this->kya_supplier);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            UPDATE SITE
            SET KYA_CHANGE_DMY = SYSDATE, SITE_KYA_UPDATE = SITE_KYA_UPDATE + 1";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $this->key_history("ADD");

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->kya_key_issuer;
        $jnl_data[2] = $this->kya_key_no;

        if (!$journal->jnlLogEvent(
            Lookup::ID_KEY_ADD, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
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
        $journal = new Journal($this->conn, false);

        $module = "ID Assignment";
        $record = sprintf("No:%s, issuer:%s", $this->kya_key_no, $this->kya_key_issuer);

        $curr_psn = Utilities::getCurrPsn();
        $this->key_history("MODIFIED", "BEFORE");

        $query = "
            SELECT *
            FROM GUI_ACCESS_KEYS
            WHERE KYA_KEY_ISSUER = :kya_key_issuer AND KYA_KEY_NO = :kya_key_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':kya_key_no', $this->kya_key_no);
        oci_bind_by_name($stmt, ':kya_key_issuer', $this->kya_key_issuer);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        if (isset($this->kya_txt)) {
            $this->kya_txt = strtoupper($this->kya_txt);
        }
        
        $query = "
            UPDATE ACCESS_KEYS
            SET KYA_PHYS_TYPE = :kya_phys_type,
                KYA_TXT = :kya_txt,
                KYA_LOCK = :kya_lock,
                KYA_ADHOC = :kya_adhoc,
                KYA_PSN = DECODE(:kya_psn, '-1', NULL, :kya_psn),
                KYA_ROLE = DECODE(:kya_role, -1, NULL, :kya_role),
                KYA_DRAWER = DECODE(:kya_drawer, '-1', NULL, :kya_drawer),
                KYA_TANKER = DECODE(:kya_tanker, '-1', NULL, :kya_tanker),
                KYA_EQUIPMENT = DECODE(:kya_equipment,-1, NULL, :kya_equipment),
                KYA_SP_SUPPLIER = DECODE(:kya_sp_supplier, '-1', NULL, :kya_sp_supplier),
                KYA_TIMECD = :kya_timecode,
                KYA_DMY = SYSDATE
            WHERE KYA_KEY_ISSUER = :kya_key_issuer AND KYA_KEY_NO = :kya_key_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':kya_key_no', $this->kya_key_no);
        oci_bind_by_name($stmt, ':kya_key_issuer', $this->kya_key_issuer);
        oci_bind_by_name($stmt, ':kya_txt', $this->kya_txt);
        oci_bind_by_name($stmt, ':kya_phys_type', $this->kya_phys_type);
        oci_bind_by_name($stmt, ':kya_lock', $this->kya_lock);
        oci_bind_by_name($stmt, ':kya_adhoc', $this->kya_adhoc);
        oci_bind_by_name($stmt, ':kya_psn', $this->kya_personnel);
        oci_bind_by_name($stmt, ':kya_role', $this->kya_role);
        oci_bind_by_name($stmt, ':kya_drawer', $this->kya_drawer);
        oci_bind_by_name($stmt, ':kya_tanker', $this->kya_tanker);
        oci_bind_by_name($stmt, ':kya_equipment', $this->kya_equipment);
        oci_bind_by_name($stmt, ':kya_sp_supplier', $this->kya_supplier);
        oci_bind_by_name($stmt, ':kya_timecode', $this->kya_timecode);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $this->key_history("MODIFIED", "AFTER");

        if (isset($this->remove_pin) && $this->remove_pin) {
            $query = "
                UPDATE ACCESS_KEYS SET KYA_PIN = NULL
                WHERE KYA_KEY_ISSUER = :kya_key_issuer AND KYA_KEY_NO = :kya_key_no";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':kya_key_no', $this->kya_key_no);
            oci_bind_by_name($stmt, ':kya_key_issuer', $this->kya_key_issuer);

            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }

            $jnl_data[0] = $curr_psn;
            $jnl_data[0] = $record;
            if (!$journal->jnlLogEvent(
                Lookup::PIN_REMOVED_FROM_KEY, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }

        if (isset($this->reset_pin) && $this->reset_pin) {
            $default_pin = "bHUA7XfvOYA2"; /* encrypted "0000" */
            $query = "
                UPDATE ACCESS_KEYS SET KYA_PIN = :default_pin
                WHERE KYA_KEY_ISSUER = :kya_key_issuer AND KYA_KEY_NO = :kya_key_no";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':kya_key_no', $this->kya_key_no);
            oci_bind_by_name($stmt, ':kya_key_issuer', $this->kya_key_issuer);
            oci_bind_by_name($stmt, ':default_pin', $default_pin);

            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }

            $jnl_data[0] = $curr_psn;
            $jnl_data[1] = $record;
            if (!$journal->jnlLogEvent(
                Lookup::PIN_RESET_FROM_KEY, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }

        $query = "
            UPDATE SITE
            SET KYA_CHANGE_DMY = SYSDATE, SITE_KYA_UPDATE = SITE_KYA_UPDATE + 1";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->kya_key_issuer;
        $jnl_data[2] = $this->kya_key_no;

        if (!$journal->jnlLogEvent(
            Lookup::ID_KEY_UPDATE, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            SELECT *
            FROM GUI_ACCESS_KEYS
            WHERE KYA_KEY_ISSUER = :kya_key_issuer AND KYA_KEY_NO = :kya_key_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':kya_key_no', $this->kya_key_no);
        oci_bind_by_name($stmt, ':kya_key_issuer', $this->kya_key_issuer);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row2 = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $module = "GUI_ACCESS_KEYS";
        $record = sprintf("kya_key_no:%s", $this->kya_key_no);
        if (!$journal->updateChanges($row, $row2, $module, $record)) {
            oci_rollback($this->conn);
            return false;
        }

        // if ($kya_lock != $this->kya_lock &&
        //     !$journal->valueChange(
        //         $module, $record, "lock_status", $kya_lock, $this->kya_lock)) {
        //     $e = oci_error($stmt); write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_timecd != $this->kya_timecd &&
        //     !$journal->valueChange(
        //         $module, $record, "time_code", $kya_timecd, $this->kya_timecd)) {
        //     $e = oci_error($stmt); write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_phys_type != $this->kya_phys_type &&
        //     !$journal->valueChange(
        //         $module, $record, "physical type", $kya_phys_type, $this->kya_phys_type)) {
        //     $e = oci_error($stmt); write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_txt != $this->kya_txt &&
        //     !$journal->valueChange(
        //         $module, $record, "tag", $kya_txt, $this->kya_txt)) {
        //     $e = oci_error($stmt); write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_adhoc != $this->kya_adhoc &&
        //     !$journal->valueChange(
        //         $module, $record, "adhoc", $kya_adhoc, $this->kya_adhoc)) {
        //     $e = oci_error($stmt); write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_psn != $this->kya_psn &&
        //     !$journal->valueChange(
        //         $module, $record, "personnel", $kya_psn, $this->kya_psn)) {
        //     $e = oci_error($stmt); write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_role != $this->kya_role &&
        //     !$journal->valueChange(
        //         $module, $record, "role", $kya_role, $this->kya_role)) {
        //     $e = oci_error($stmt); write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_drawer != $this->kya_drawer &&
        //     !$journal->valueChange(
        //         $module, $record, "drawer", $kya_drawer, $this->kya_drawer)) {
        //     $e = oci_error($stmt); write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_tanker != $this->kya_tanker &&
        //     !$journal->valueChange(
        //         $module, $record, "tanker", $kya_tanker, $this->kya_tanker)) {
        //     $e = oci_error($stmt); write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_equipment != $this->kya_equipment &&
        //     !$journal->valueChange(
        //         $module, $record, "equipment", $kya_equipment, $this->kya_equipment)) {
        //     $e = oci_error($stmt); write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_sp_supplier != $this->kya_sp_supplier &&
        //     !$journal->valueChange(
        //         $module, $record, "supplier", $kya_sp_supplier, $this->kya_sp_supplier)) {
        //     $e = oci_error($stmt); write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        oci_commit($this->conn);
        return true;
    }

    public function delete()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        $curr_psn = Utilities::getCurrPsn();
        $this->key_history("DELETED");

        $query = "
            DELETE ACCESS_KEYS
            WHERE KYA_KEY_ISSUER = :kya_key_issuer AND KYA_KEY_NO = :kya_key_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':kya_key_no', $this->kya_key_no);
        oci_bind_by_name($stmt, ':kya_key_issuer', $this->kya_key_issuer);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            UPDATE SITE
            SET KYA_CHANGE_DMY = SYSDATE, SITE_KYA_UPDATE = SITE_KYA_UPDATE + 1";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->kya_key_issuer;
        $jnl_data[2] = $this->kya_key_no;

        if (!$journal->jnlLogEvent(
            Lookup::ID_KEY_DELETE, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    public function personnel_by_role()
    {
        $query = "
            SELECT 
                PER_CODE,
                PER_NAME
            FROM PERSONNEL
            WHERE PER_AUTH = :per_auth AND PER_CMPY = :per_cmpy
                AND PER_CODE != '8888'
            ORDER BY PER_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':per_auth', $this->kya_role);
        oci_bind_by_name($stmt, ':per_cmpy', $this->kya_psnl_cmpy);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // This function links the tanker with an adhoc tanker key
    // The data sent from GUI include kya_txt and kya_tanker
    public function update_adhoc_key()
    {
        $journal = new Journal($this->conn, false);

        if (isset($this->kya_txt)) {
            $this->kya_txt = strtoupper($this->kya_txt);
        }

        // use kya_txt as a key to find a tag record
        $query = "
            SELECT *
            FROM GUI_ACCESS_KEYS
            WHERE KYA_TXT = :kya_txt and ROWNUM=1
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':kya_txt', $this->kya_txt);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        // get the PKEY from the tag record found
        $this->kya_key_no = $row['KYA_KEY_NO'];
        $this->kya_key_issuer = $row['KYA_KEY_ISSUER'];

        $curr_psn = Utilities::getCurrPsn();
        $this->key_history("MODIFIED", "BEFORE");
        
        // update the link of tanker and adhoc key
        $query = "
            UPDATE ACCESS_KEYS SET
                KYA_TANKER = :kya_tanker,
                KYA_DMY = SYSDATE
            WHERE KYA_KEY_ISSUER = :kya_key_issuer AND KYA_KEY_NO = :kya_key_no AND KYA_TXT = :kya_txt";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':kya_key_no', $this->kya_key_no);
        oci_bind_by_name($stmt, ':kya_key_issuer', $this->kya_key_issuer);
        oci_bind_by_name($stmt, ':kya_txt', $this->kya_txt);
        oci_bind_by_name($stmt, ':kya_tanker', $this->kya_tanker);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $this->key_history("MODIFIED", "AFTER");

        // This is to notify the process to upload the changes to RTC/OBP
        $query = "
            UPDATE SITE
            SET KYA_CHANGE_DMY = SYSDATE, SITE_KYA_UPDATE = SITE_KYA_UPDATE + 1";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->kya_key_issuer;
        $jnl_data[2] = $this->kya_key_no;

        if (!$journal->jnlLogEvent(
            Lookup::ID_KEY_UPDATE, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            SELECT *
            FROM GUI_ACCESS_KEYS
            WHERE KYA_KEY_ISSUER = :kya_key_issuer AND KYA_KEY_NO = :kya_key_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':kya_key_no', $this->kya_key_no);
        oci_bind_by_name($stmt, ':kya_key_issuer', $this->kya_key_issuer);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row2 = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $module = "GUI_ACCESS_KEYS";
        $record = sprintf("kya_key_no:%s", $this->kya_key_no);
        if (!$journal->updateChanges($row, $row2, $module, $record)) {
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }
}
