<?php

include_once __DIR__ . '/../config/journal.php';
include_once __DIR__ . '/../config/log.php';
include_once __DIR__ . '/../shared/utilities.php';

class IDAssignment
{
    // database connection and table name
    private $conn;

    public $kya_key_no = '-1';
    public $kya_key_issuer = '-1';
    public $kya_issuer_name = '-1';
    public $kya_type = '-1';
    public $kya_type_name = '-1';
    public $kya_phys_type = '-1';
    public $kya_phys_name = '-1';
    public $kya_timecode = '-1';
    public $kya_lock = '-1';
    public $kya_adhoc = '-1';
    public $kya_txt = '-1';
    public $kya_key_created = '-1';
    public $kya_pin = '-1';
    public $kya_personnel = '-1';
    public $kya_psnl_name = '-1';
    public $kya_psnl_cmpy = '-1';
    public $kya_psnl_cmpy_name = '-1';
    public $kya_role = '-1';
    public $kya_role_name = '-1';
    public $kya_drawer = '-1';
    public $kya_draw_name = '-1';
    public $kya_supplier = '-1';
    public $kya_supp_name = '-1';
    public $kya_tanker = '-1';
    public $kya_tnkr_name = '-1';
    public $kya_tnkr_desc = '-1';
    public $kya_tnkr_cmpy = '-1';
    public $kya_tnkr_cmpy_name = '-1';
    public $kya_equipment = '-1';
    public $kya_eqpt_name = '-1';
    public $kya_eqpt_desc = '-1';
    public $kya_eqpt_cmpy = '-1';
    public $kya_eqpt_cmpy_name = '-1';
    public $kya_etyp_name = '-1';
    public $kya_cust_ordno = '-1';
    public $kya_cust_name = '-1';

    public $kya_sp_supplier = '-1';

    public $resetpin = null;
    public $removepin = null;

    public $start_num = 1;
    public $end_num = null;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function count()
    {
        $query = "
            SELECT COUNT(*) CN
            FROM GUI_ACCESS_KEYS";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'],
                __FILE__, __LINE__, LogLevel::ERROR);
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
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function tankers()
    {
        Utilities::sanitize($this);

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
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function schedulables()
    {
        Utilities::sanitize($this);

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
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function non_schedulables()
    {
        Utilities::sanitize($this);

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
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function roles()
    {
        $query = "
            SELECT AUTH_LEVEL_ID ROLE_ID,
                AUTH_LEVEL_NAME ROLE_NAME
            FROM AUTH_LEVEL_TYP
            ORDER BY AUTH_LEVEL_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function physicalTypes()
    {
        $query = "
            SELECT KEY_PHYS_ID,
                KEY_PHYS_NAME
            FROM KEY_PHYS_TYP
            ORDER BY KEY_PHYS_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function lookupPersonnel()
    {
        Utilities::sanitize($this);

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

        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    public function create()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        Utilities::sanitize($this);

        $curr_psn = Utilities::getCurrPsn();

        $query = "
            SELECT NVL(CMPY_REQ_PIN_FLAG, 0) CMPY_REQ_PIN_FLAG
            FROM COMPANYS
            WHERE CMPY_CODE = :key_cmpy";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':key_cmpy', $this->kya_key_issuer);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
        oci_bind_by_name($stmt, ':kya_timecd', $this->kya_timecd);
        oci_bind_by_name($stmt, ':kya_lock', $this->kya_lock);
        oci_bind_by_name($stmt, ':kya_adhoc', $this->kya_adhoc);
        oci_bind_by_name($stmt, ':kya_psn', $this->kya_psn);
        oci_bind_by_name($stmt, ':kya_role', $this->kya_role);
        oci_bind_by_name($stmt, ':kya_drawer', $this->kya_drawer);
        oci_bind_by_name($stmt, ':kya_tanker', $this->kya_tanker);
        oci_bind_by_name($stmt, ':kya_equipment', $this->kya_equipment);
        oci_bind_by_name($stmt, ':default_pin', $default_pin);
        oci_bind_by_name($stmt, ':kya_sp_supplier', $this->kya_sp_supplier);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            UPDATE SITE
            SET KYA_CHANGE_DMY = SYSDATE, SITE_KYA_UPDATE = SITE_KYA_UPDATE + 1";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    public function update()
    {
        write_log(__CLASS__ . "::" . __FUNCTION__ . "() START", __FILE__, __LINE__);

        Utilities::sanitize($this);

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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "
            UPDATE ACCESS_KEYS
            SET KYA_PHYS_TYPE = :kya_phys_type,
                KYA_TXT = :kya_txt,
                KYA_LOCK = :kya_lock,
                KYA_ADHOC = :kya_adhoc,
                KYA_TIMECD = :kya_timecd,
                KYA_PSN = DECODE(:kya_psn, '-1', NULL, :kya_psn),
                KYA_ROLE = DECODE(:kya_role, -1, NULL, :kya_role),
                KYA_DRAWER = DECODE(:kya_drawer, '-1', NULL, :kya_drawer),
                KYA_TANKER = DECODE(:kya_tanker, '-1', NULL, :kya_tanker),
                KYA_EQUIPMENT = DECODE(:kya_equipment,-1, NULL, :kya_equipment),
                KYA_SP_SUPPLIER = DECODE(:kya_sp_supplier, '-1', NULL, :kya_sp_supplier),
                KYA_DMY = SYSDATE
            WHERE KYA_KEY_ISSUER = :kya_key_issuer AND KYA_KEY_NO = :kya_key_no";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':kya_key_no', $this->kya_key_no);
        oci_bind_by_name($stmt, ':kya_key_issuer', $this->kya_key_issuer);
        oci_bind_by_name($stmt, ':kya_txt', $this->kya_txt);
        oci_bind_by_name($stmt, ':kya_phys_type', $this->kya_phys_type);
        oci_bind_by_name($stmt, ':kya_timecd', $this->kya_timecd);
        oci_bind_by_name($stmt, ':kya_lock', $this->kya_lock);
        oci_bind_by_name($stmt, ':kya_adhoc', $this->kya_adhoc);
        oci_bind_by_name($stmt, ':kya_psn', $this->kya_psn);
        oci_bind_by_name($stmt, ':kya_role', $this->kya_role);
        oci_bind_by_name($stmt, ':kya_drawer', $this->kya_drawer);
        oci_bind_by_name($stmt, ':kya_tanker', $this->kya_tanker);
        oci_bind_by_name($stmt, ':kya_equipment', $this->kya_equipment);
        oci_bind_by_name($stmt, ':kya_sp_supplier', $this->kya_sp_supplier);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $this->key_history("MODIFIED", "AFTER");

        if ($this->removepin === "on") {
            $query = "
                UPDATE ACCESS_KEYS SET KYA_PIN = NULL
                WHERE KYA_KEY_ISSUER = :kya_key_issuer AND KYA_KEY_NO = :kya_key_no";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':kya_key_no', $this->kya_key_no);
            oci_bind_by_name($stmt, ':kya_key_issuer', $this->kya_key_issuer);

            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }

            $jnl_data[0] = sprintf("%s removed pin for key [%s]", $curr_psn, $record);
            if (!$journal->jnlLogEvent(
                Lookup::TMM_TEXT_ONLY, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }

        if ($this->resetpin === "on") {
            $default_pin = "bHUA7XfvOYA2"; /* encrypted "0000" */
            $query = "
                UPDATE ACCESS_KEYS SET KYA_PIN = :default_pin
                WHERE KYA_KEY_ISSUER = :kya_key_issuer AND KYA_KEY_NO = :kya_key_no";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':kya_key_no', $this->kya_key_no);
            oci_bind_by_name($stmt, ':kya_key_issuer', $this->kya_key_issuer);
            oci_bind_by_name($stmt, ':default_pin', $default_pin);

            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }

            $jnl_data[0] = sprintf("%s reset pin for key [%s]", $curr_psn, $record);
            if (!$journal->jnlLogEvent(
                Lookup::TMM_TEXT_ONLY, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }

        $query = "
            UPDATE SITE
            SET KYA_CHANGE_DMY = SYSDATE, SITE_KYA_UPDATE = SITE_KYA_UPDATE + 1";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->kya_key_issuer;
        $jnl_data[2] = $this->kya_key_no;

        if (!$journal->jnlLogEvent(
            Lookup::ID_KEY_UPDATE, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $module = "GUI_ACCESS_KEYS";
        $record = sprintf("id:%s", $this->kya_key_no);
        if (!$journal->updateChanges($row, $row2, $module, $record)) {
            oci_rollback($this->conn);
            return false;
        }

        // if ($kya_lock != $this->kya_lock &&
        //     !$journal->valueChange(
        //         $module, $record, "lock_status", $kya_lock, $this->kya_lock)) {
        //     write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_timecd != $this->kya_timecd &&
        //     !$journal->valueChange(
        //         $module, $record, "time_code", $kya_timecd, $this->kya_timecd)) {
        //     write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_phys_type != $this->kya_phys_type &&
        //     !$journal->valueChange(
        //         $module, $record, "physical type", $kya_phys_type, $this->kya_phys_type)) {
        //     write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_txt != $this->kya_txt &&
        //     !$journal->valueChange(
        //         $module, $record, "tag", $kya_txt, $this->kya_txt)) {
        //     write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_adhoc != $this->kya_adhoc &&
        //     !$journal->valueChange(
        //         $module, $record, "adhoc", $kya_adhoc, $this->kya_adhoc)) {
        //     write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_psn != $this->kya_psn &&
        //     !$journal->valueChange(
        //         $module, $record, "personnel", $kya_psn, $this->kya_psn)) {
        //     write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_role != $this->kya_role &&
        //     !$journal->valueChange(
        //         $module, $record, "role", $kya_role, $this->kya_role)) {
        //     write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_drawer != $this->kya_drawer &&
        //     !$journal->valueChange(
        //         $module, $record, "drawer", $kya_drawer, $this->kya_drawer)) {
        //     write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_tanker != $this->kya_tanker &&
        //     !$journal->valueChange(
        //         $module, $record, "tanker", $kya_tanker, $this->kya_tanker)) {
        //     write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_equipment != $this->kya_equipment &&
        //     !$journal->valueChange(
        //         $module, $record, "equipment", $kya_equipment, $this->kya_equipment)) {
        //     write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        // if ($kya_sp_supplier != $this->kya_sp_supplier &&
        //     !$journal->valueChange(
        //         $module, $record, "supplier", $kya_sp_supplier, $this->kya_sp_supplier)) {
        //     write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
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
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            UPDATE SITE
            SET KYA_CHANGE_DMY = SYSDATE, SITE_KYA_UPDATE = SITE_KYA_UPDATE + 1";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->kya_key_issuer;
        $jnl_data[2] = $this->kya_key_no;

        if (!$journal->jnlLogEvent(
            Lookup::ID_KEY_DELETE, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }
}
