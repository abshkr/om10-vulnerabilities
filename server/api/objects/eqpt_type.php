<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';

class EquipmentType
{
    // database connection and table name
    private $conn;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function equipmentCount($eqpt_etp)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT COUNT(*) CN FROM TRANSP_EQUIP
            WHERE EQPT_ETP = :eqpt_etp ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_etp', $eqpt_etp);
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function subeqptCount($eqpt_etp)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT COUNT(*) CN FROM EQP_CONNECT
            WHERE ECNCT_ETYP = :eqpt_etp ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_etp', $eqpt_etp);
        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function basicInfo($etyp_id)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT ETYP_ID,
                ETYP_TITLE,
                DECODE(SUB_EQYP, 0, 'Y', 'N') EQUIP_ISLEAF,
                CMPT_COUNT,
                ETYP_ISRIGID
                FROM EQUIP_TYPES,
                    (SELECT COUNT(*) SUB_EQYP FROM EQP_CONNECT WHERE ECNCT_ETYP = :etyp_id),
                    (SELECT COUNT(*) CMPT_COUNT FROM COMPARTMENT WHERE CMPT_ETYP = :etyp_id)
                WHERE ETYP_ID = :etyp_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':etyp_id', $etyp_id);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            write_log("DB error:" . oci_error($stmt)['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function composition($etyp_id)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT EQC_SUB_ITEM ETYP_ID,
                ETYP_TITLE,
                ETYP_ISRIGID,
                (SELECT COUNT(*) FROM COMPARTMENT
                WHERE CMPT_ETYP = E.EQC_SUB_ITEM) CMPT_COUNT,
                DECODE(
                    (SELECT COUNT(*) SUB_EQYP FROM EQP_CONNECT
                    WHERE ECNCT_ETYP = E.EQC_SUB_ITEM), 0, 'Y', 'N') EQUIP_ISLEAF
            FROM EQP_CONNECT E, EQUIP_TYPES
            WHERE ECNCT_ETYP = ETYP_ID AND ETYP_ID = :etyp_id
            ORDER BY EQC_COUNT";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':etyp_id', $etyp_id);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function compartments($etyp_id)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT CMPT_NO,
                DECODE(CMPT_UNITS, 11, 'l (cor)', 17, 'kg', 'l (amb)') CMPT_UNITS,
                CMPT_CAPACIT SAFEFILL,
                CMPT_CAPACIT SFL
            FROM COMPARTMENT
            WHERE COMPARTMENT.CMPT_ETYP = :etyp_id
            ORDER BY CMPT_NO";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':etyp_id', $etyp_id);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function equipments($eqpt_etp)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT EQPT_ID,
                EQPT_CODE,
                EQPT_TITLE,
                EQPT_CODE||'['||EQPT_TITLE||']' EQPT_NAME,
                EQPT_OWNER,
                EQPT_LOCK
            FROM TRANSP_EQUIP
            WHERE EQPT_ETP = :eqpt_etp
            ORDER BY EQPT_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_etp', $eqpt_etp);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function searchCount($etyp_title = '%', $cmptnu = null)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT COUNT(*) CN FROM EQUIP_TYPES_VW
            WHERE ETYP_TITLE LIKE :etyp_title ";
        if (isset($cmptnu)) {
            $query = $query . " AND CMPTNU = :cmptnu ";
        }
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':etyp_title', $etyp_title);
        if (isset($cmptnu)) {
            oci_bind_by_name($stmt, ':cmptnu', $cmptnu);
        }

        if (oci_execute($stmt)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    /* Only display non-combine equpment type. because for equipment, the type can
    only be non-combine, but for tanker, the type can be non-combine or combine */
    public function search2()
    {
        // if (!isset($this->end_num)) {
        //     $this->start_num = 1;
        //     $this->end_num = 50;
        // }

        Utilities::sanitize($this);
        $this->etyp_title = isset($this->etyp_title) ? '%' . $this->etyp_title . '%' : '%';

        // $query = "
        //     SELECT ETYP_ID, ETYP_TITLE
        //     FROM EQUIP_TYPES_VW
        //     WHERE ETYP_CLASS = 0 AND ETYP_TITLE like :etyp_title ";
        $query = "
        SELECT EQUIP_TYPES_VW.ETYP_ID, EQUIP_TYPES_VW.ETYP_TITLE,
            NVL(ETYP_CATEGORY,
                DECODE(ECNCT_ETYP,
                    NULL,
                    DECODE(UPPER(EQUIP_TYPES_VW.ETYP_ISRIGID), 'Y', 'R', DECODE(UPPER(EQUIP_TYPES_VW.ETYP_SCHEDUL), 'Y', 'T', 'P')),
                    DECODE(UPPER(FIRST_SUB_ITEM.ETYP_SCHEDUL), 'N', 'P', 'T'))
                ) IMAGE
        FROM EQUIP_TYPES_VW,
            (SELECT NVL(ETYP_SCHEDUL, 'N') ETYP_SCHEDUL, NVL(ETYP_ISRIGID, 'N') ETYP_ISRIGID, CMPTNU, ECNCT_ETYP
            FROM EQUIP_TYPES_VW, EQP_CONNECT
            WHERE EQP_CONNECT.ECNCT_ETYP = EQUIP_TYPES_VW.ETYP_ID
                AND EQC_COUNT = 1) FIRST_SUB_ITEM
        WHERE FIRST_SUB_ITEM.ECNCT_ETYP(+) = EQUIP_TYPES_VW.ETYP_ID
            AND ETYP_TITLE like :etyp_title ";

        if (isset($this->cmptnu)) {
            $query = $query . " AND CMPTNU = :cmptnu ";
        }

        $query = $query . " ORDER BY ETYP_TITLE ASC";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':etyp_title', $this->etyp_title);
        if (isset($this->cmptnu)) {
            oci_bind_by_name($stmt, ':cmptnu', $this->cmptnu);
        }
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function search()
    {
        // if (!isset($this->end_num)) {
        //     $this->start_num = 1;
        //     $this->end_num = 50;
        // }

        Utilities::sanitize($this);

        $query = "
            SELECT ETYP_ID, ETYP_TITLE
            FROM EQUIP_TYPES_VW
            WHERE ETYP_TITLE like :etyp_title ";
        if (isset($this->cmptnu)) {
            $query = $query . " AND CMPTNU = :cmptnu ";
        }

        $query = $query . " ORDER BY ETYP_TITLE ASC";
        $stmt = oci_parse($this->conn, $query);

        if (isset($this->etyp_title)) {
            $this->etyp_title = '%' . $this->etyp_title . '%';
        } else {
            $this->etyp_title = '%';
        }
        oci_bind_by_name($stmt, ':etyp_title', $this->etyp_title);

        if (isset($this->cmptnu)) {
            oci_bind_by_name($stmt, ':cmptnu', $this->cmptnu);
        }

        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
