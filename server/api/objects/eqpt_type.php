<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/eqpt_service.php';
include_once 'common_class.php';

//Old code: EquipmentTypes.class.php
class EquipmentType extends CommonClass
{
    protected $TABLE_NAME = "EQUIP_TYPES";

    public $BOOLEAN_FIELDS = array(
        "ETYP_SCHEDUL" => "Y",
        "ETYP_ISRIGID" => "Y",
        "ETYP_IS_DRUMFILL" => "Y",
    );

    public $NUMBER_FIELDS = array(
        "ETYP_N_ITEMS",
        "ETYP_MAX_GROSS",
        "CMPTNU",
        "SAFEFILL",
        "SFL",
        "CMPT_NO",
        "ETYP_ID"
    );

    public function equipmentCount($eqpt_etp)
    {
        Utilities::sanitize($this);

        $query = "
            SELECT COUNT(*) CN FROM TRANSP_EQUIP
            WHERE EQPT_ETP = :eqpt_etp ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':eqpt_etp', $eqpt_etp);
        if (oci_execute($stmt, $this->commit_mode)) {
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
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    public function basicInfo($etyp_id)
    {
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
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function composition()
    {
        $query = "
            SELECT NVL(EQC_SUB_ITEM, ETYP_ID_RT) ETYP_ID,
                EQUIP_TYPES_VW.ETYP_TITLE,
                EQUIP_TYPES_VW.ETYP_ISRIGID,
                EQUIP_TYPES_VW.CMPTNU,
                NVL(EQUIP_TYPES_VW.ETYP_CATEGORY,
                    DECODE(FIRST_SUB_ITEM.ECNCT_ETYP,
                        NULL,
                        DECODE(UPPER(EQUIP_TYPES_VW.ETYP_ISRIGID), 'Y', 'R', DECODE(UPPER(EQUIP_TYPES_VW.ETYP_SCHEDUL), 'Y', 'T', 'P')),
                        DECODE(UPPER(FIRST_SUB_ITEM.ETYP_SCHEDUL), 'N', 'P', 'T'))
                    ) ETYP_CATEGORY,
                NVL(EQUIP_TYPES_VW.ETYP_CATEGORY,
                    DECODE(FIRST_SUB_ITEM.ECNCT_ETYP,
                        NULL,
                        DECODE(UPPER(EQUIP_TYPES_VW.ETYP_ISRIGID), 'Y', 'R', DECODE(UPPER(EQUIP_TYPES_VW.ETYP_SCHEDUL), 'Y', 'T', 'P')),
                        DECODE(UPPER(FIRST_SUB_ITEM.ETYP_SCHEDUL), 'N', 'P', 'T'))
                    ) IMAGE
            FROM EQUIP_VW, EQUIP_TYPES_VW,
                (SELECT NVL(ETYP_SCHEDUL, 'N') ETYP_SCHEDUL, NVL(ETYP_ISRIGID, 'N') ETYP_ISRIGID, ECNCT_ETYP
                FROM EQUIP_TYPES_VW, EQP_CONNECT
                WHERE EQP_CONNECT.ECNCT_ETYP = EQUIP_TYPES_VW.ETYP_ID
                    AND EQC_COUNT = 1) FIRST_SUB_ITEM
            WHERE ((EQC_SUB_ITEM IS NOT NULL AND EQC_SUB_ITEM = EQUIP_TYPES_VW.ETYP_ID) OR (
                    EQC_SUB_ITEM IS NULL AND ETYP_ID_RT = EQUIP_TYPES_VW.ETYP_ID ))
                AND FIRST_SUB_ITEM.ECNCT_ETYP(+) = EQUIP_TYPES_VW.ETYP_ID
                AND ETYP_ID_RT = :etyp_id
                AND EQUIP_ISLEAF = 1
            ORDER BY EQC_COUNT_RT, EQC_COUNT";
        // $query = "
        //     SELECT NVL(EQC_SUB_ITEM, ETYP_ID_RT) ETYP_ID,
        //         EQUIP_TYPES_VW.ETYP_TITLE,
        //         EQUIP_TYPES_VW.ETYP_ISRIGID,
        //         EQUIP_TYPES_VW.CMPTNU,
        //         EQUIP_TYPES_VW.ETYP_CATEGORY
        //     FROM EQUIP_VW, EQUIP_TYPES_VW
        //     WHERE ((EQC_SUB_ITEM IS NOT NULL AND EQC_SUB_ITEM = EQUIP_TYPES_VW.ETYP_ID) OR (
        //             EQC_SUB_ITEM IS NULL AND ETYP_ID_RT = EQUIP_TYPES_VW.ETYP_ID ))
        //         AND ETYP_ID_RT = :etyp_id
        //         AND EQUIP_ISLEAF = 1
        //     ORDER BY EQC_COUNT_RT, EQC_COUNT";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':etyp_id', $this->etyp_id);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function composition_hook(&$hook_item)
    {
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);

        $result = array();
        $hook_item['compartments'] = $result;

        if (!array_key_exists('etyp_id', $hook_item)) {
            write_log("hook_item does not have etyp_id item, cannot do composition_hook",
                __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $query = "
            SELECT CMPT_NO,
                CMPT_UNITS CMPT_UNIT_ID,
                DECODE(CMPT_UNITS, 11, 'l (cor)', 17, 'kg', 'l (amb)') CMPT_UNITS2,
                UNIT_SCALE_VW.DESCRIPTION CMPT_UNITS,
                CMPT_CAPACIT,
                CMPT_CAPACIT SAFEFILL,
                CMPT_CAPACIT SFL,
                COMPARTMENT.CMPT_ETYP ETYP_ID,
                CMPT_N_SEALS
            FROM COMPARTMENT, UNIT_SCALE_VW
            WHERE COMPARTMENT.CMPT_ETYP = :etyp_id
                and COMPARTMENT.CMPT_UNITS = UNIT_SCALE_VW.UNIT_ID
            ORDER BY CMPT_NO";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':etyp_id', $hook_item['etyp_id']);
        
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        Utilities::retrieve($result, $this, $stmt, $method = __FUNCTION__);
        $hook_item['compartments'] = $result;

        $eqpt_types = new EquipmentType($this->conn);
        $stmt = $eqpt_types->equipments($hook_item['etyp_id']);
        $result = array();
        Utilities::retrieve($result, $eqpt_types, $stmt, $method = 'equipments');
        // write_log(json_encode($result), __FILE__, __LINE__);
        $hook_item['eqpt_list'] = $result;
    }

    public function compartments($etyp_id = null)
    {
        $query = "
            SELECT CMPT_NO,
                CMPT_UNITS CMPT_UNIT_ID,
                DECODE(CMPT_UNITS, 11, 'l (cor)', 17, 'kg', 'l (amb)') CMPT_UNITS2,
                UNIT_SCALE_VW.DESCRIPTION CMPT_UNITS,
                CMPT_CAPACIT,
                COMPARTMENT.CMPT_ETYP ETYP_ID,
                CMPT_N_SEALS
            FROM COMPARTMENT, UNIT_SCALE_VW
            WHERE COMPARTMENT.CMPT_ETYP = :etyp_id
                and COMPARTMENT.CMPT_UNITS = UNIT_SCALE_VW.UNIT_ID
            ORDER BY CMPT_NO";
        $stmt = oci_parse($this->conn, $query);
        if ($etyp_id) {
            oci_bind_by_name($stmt, ':etyp_id', $etyp_id);
        } else {
            oci_bind_by_name($stmt, ':etyp_id', $this->etyp_id);
        }

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function equipments($eqpt_etp)
    {
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
        if (oci_execute($stmt, $this->commit_mode)) {
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

        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return (int) $row['CN'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }
    }

    /**
     * Get imege of equipment type. equipment type cannot be a composition
     */
    public function get_image($etyp_id)
    {
        $query = "
        SELECT NVL(ETYP_CATEGORY,
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
            AND ETYP_ID = :etyp_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':etyp_id', $etyp_id);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            return $row['IMAGE'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    //Old old: EqupipmentTypes.class.php::getAll()
    //Category: C means combo, T means trailer, R means Rigid, S means ship, E means Rail Tank
    public function read()
    {
        $this->etyp_title = isset($this->etyp_title) ? '%' . $this->etyp_title . '%' : '%';

        $query = "
            SELECT EQUIP_TYPES_VW.ETYP_ID,
                EQUIP_TYPES_VW.ETYP_TITLE,
                EQUIP_TYPES_VW.ETYP_CLASS,
                EQUIP_TYPES_VW.ETYP_N_ITEMS,
                EQUIP_TYPES_VW.ETYP_IS_DRUMFILL,
                EQUIP_TYPES_VW.ETYP_MAX_GROSS,
                EQUIP_TYPES_VW.ETYP_ISRIGID,
                EQUIP_TYPES_VW.ETYP_SCHEDUL,
                NVL(ETYP_CATEGORY,
                    DECODE(ECNCT_ETYP,
                        NULL,
                        DECODE(UPPER(EQUIP_TYPES_VW.ETYP_ISRIGID), 'Y', 'R', DECODE(UPPER(EQUIP_TYPES_VW.ETYP_SCHEDUL), 'Y', 'T', 'P')),
                        DECODE(UPPER(FIRST_SUB_ITEM.ETYP_SCHEDUL), 'N', 'P', 'T'))
                    ) ETYP_CATEGORY,
                NVL(IMAGES, NVL(ETYP_CATEGORY,
                    DECODE(ECNCT_ETYP, 
                        NULL,
                        DECODE(UPPER(EQUIP_TYPES_VW.ETYP_ISRIGID), 'Y', 'R', DECODE(UPPER(EQUIP_TYPES_VW.ETYP_SCHEDUL), 'Y', 'T', 'P')),
                        DECODE(UPPER(FIRST_SUB_ITEM.ETYP_SCHEDUL), 'N', 'P', 'T'))
                    )) IMAGE,
                NVL(EQUIP_CMPTS.CMPTS, EQUIP_TYPES_VW.ETYP_N_ITEMS) CMPTS,
                EQUIP_TYPES_VW.CMPTNU,
                NVL(EQPT_COUNTS.EQPT_COUNT, 0)  EQPT_COUNT,
                NVL(TNKR_COUNTS.TNKR_COUNT, 0)  TNKR_COUNT
            FROM EQUIP_TYPES_VW,
                (SELECT NVL(ETYP_SCHEDUL, 'N') ETYP_SCHEDUL, NVL(ETYP_ISRIGID, 'N') ETYP_ISRIGID, CMPTNU, ECNCT_ETYP
                FROM EQUIP_TYPES_VW, EQP_CONNECT
                WHERE EQP_CONNECT.ECNCT_ETYP = EQUIP_TYPES_VW.ETYP_ID
                    AND EQC_COUNT = 1) FIRST_SUB_ITEM,
                (
                    SELECT ETYP_ID_RT COMBO_ETYP, LISTAGG(ETYP_CATEGORY, ',') WITHIN GROUP(ORDER BY EQC_COUNT_RT, EQC_COUNT) IMAGES
                    FROM
                    (
                        SELECT ETYP_ID_RT, 
                            EQUIP_TYPES.ETYP_ID, 
                            NVL(EQUIP_TYPES.ETYP_CATEGORY,
                                DECODE(UPPER(EQUIP_TYPES.ETYP_ISRIGID), 'Y', 'R', 
                                DECODE(UPPER(EQUIP_TYPES.ETYP_SCHEDUL), 'Y', 'T', 'P'))) ETYP_CATEGORY, 
                            EQC_COUNT_RT, 
                            EQC_COUNT
                        FROM EQUIP_VW, EQUIP_TYPES
                        WHERE EQC_SUB_ITEM = EQUIP_TYPES.ETYP_ID AND EQUIP_ISLEAF = 1
                    )
                    GROUP BY ETYP_ID_RT
                ) EQUIP_IMAGES,
                (
                    SELECT ETYP_ID_RT COMBO_ETYP, LISTAGG(CMPTNUM, ',') WITHIN GROUP(ORDER BY EQC_COUNT_RT, EQC_COUNT) CMPTS
                    FROM
                    (
                        SELECT ETYP_ID_RT, 
                            EQUIP_TYPES.ETYP_ID, 
                            EQUIP_TYPES.ETYP_N_ITEMS CMPTNUM,
                            EQC_COUNT_RT, 
                            EQC_COUNT
                        FROM EQUIP_VW, EQUIP_TYPES
                        WHERE EQC_SUB_ITEM = EQUIP_TYPES.ETYP_ID AND EQUIP_ISLEAF = 1
                    )
                    GROUP BY ETYP_ID_RT
                ) EQUIP_CMPTS,
                (
                    SELECT EQPT_ETP, COUNT(*) EQPT_COUNT
                    FROM TRANSP_EQUIP
                    GROUP BY EQPT_ETP
                ) EQPT_COUNTS,
                (
                    SELECT TNKR_ETP, COUNT(*) TNKR_COUNT
                    FROM TANKERS
                    GROUP BY TNKR_ETP
                ) TNKR_COUNTS
            WHERE FIRST_SUB_ITEM.ECNCT_ETYP(+) = EQUIP_TYPES_VW.ETYP_ID
                AND EQUIP_TYPES_VW.ETYP_ID = EQUIP_IMAGES.COMBO_ETYP(+)
                AND EQUIP_TYPES_VW.ETYP_ID = EQUIP_CMPTS.COMBO_ETYP(+)
                AND EQUIP_TYPES_VW.ETYP_ID = EQPT_COUNTS.EQPT_ETP(+)
                AND EQUIP_TYPES_VW.ETYP_ID = TNKR_COUNTS.TNKR_ETP(+)
                AND ETYP_TITLE like :etyp_title";

        if (isset($this->cmptnu)) {
            $query = $query . " AND CMPTNU = :cmptnu ";
        }

        $query = $query . " ORDER BY UPPER(ETYP_TITLE) ASC";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':etyp_title', $this->etyp_title);
        if (isset($this->cmptnu)) {
            oci_bind_by_name($stmt, ':cmptnu', $this->cmptnu);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    //Overwrite super class, because it has its own create
    public function mandatory_fields_check()
    {
        if (!isset($this->etyp_title)) {
            return false;
        };

        return true;
    }

    public function check_existence()
    {
        if (isset($this->etyp_title)) {
            $query = "SELECT COUNT(*) CN
                FROM EQUIP_TYPES_VW
                WHERE ETYP_TITLE = :etyp_title";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':etyp_title', $this->etyp_title);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return;
            }
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            if ($row['CN'] >= 1) {
                return true;
            } else {
                return false;
            }
        }

        if (isset($this->etyp_id)) {
            $query = "SELECT COUNT(*) CN
                FROM EQUIP_TYPES_VW
                WHERE ETYP_ID = :etyp_id";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':etyp_id', $this->etyp_id);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return;
            }
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            if ($row['CN'] >= 1) {
                return true;
            } else {
                return false;
            }
        }
    }

    protected function post_create()
    {
        // in case CGI wrote the text in non-utf8
        $query = "UPDATE EQUIP_TYPES SET ETYP_TITLE =:etyp_title WHERE ETYP_ID = :etyp_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':', $this->etyp_title);
        oci_bind_by_name($stmt, ':', $this->etyp_id);
        if (!oci_execute($stmt)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            // $error = new EchoSchema(500, response("__INTERNAL_ERROR__", "Internal Error: " . $e['message']));
            // echo json_encode($error, JSON_PRETTY_PRINT);
            false;
        };

        return true;
    }

    //sess_id=LWWRTniwSbdD&canBreak=0&eqpNm=CW&sched=n&op=17&rigid=n&etyp_category=P&callerTyp=flex
    public function create()
    {
        $etyp_schedul = ((isset($this->etyp_schedul) && $this->etyp_schedul == "Y") ? "y" : "n");
        $etyp_isrigid = ((isset($this->etyp_isrigid) && $this->etyp_isrigid  == "Y") ? "y" : "n");
        $is_combo = (isset($this->composition) && count($this->composition) > 0) ? 1 : 0;
        $query_string = "canBreak=" . rawurlencode(strip_tags($is_combo)) . 
            "&eqpNm=" . rawurlencode(strip_tags($this->etyp_title)) . 
            "&sched=" . rawurlencode(strip_tags($etyp_schedul)) . 
            "&rigid=" . rawurlencode(strip_tags($etyp_isrigid)) . 
            "&etyp_category=" . rawurlencode(strip_tags($this->etyp_category)) . 
            "&op=17&callerTyp=flex";
        $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/equip_types.cgi", $query_string);
        
        if (!(strpos($res, "var op=27;") !== false)) {
            // $error = new EchoSchema(500,"Failed to delete equipment type");
            // echo json_encode($error, JSON_PRETTY_PRINT);
            write_log(sprintf("CGI returns %s", $res), __FILE__, __LINE__, LogLevel::ERROR);
            return false;
            
        }
    
        if (isset($this->compartments) && count($this->compartments) > 0) {
            $this->etyp_id = null;
            if (preg_match("/(var eqpCd=)(\d+)(;)/", $res, $out)) {
                $this->etyp_id = $out[2];
            }

            if (!isset($this->etyp_id)) {
                write_log("Failed to get equipment type id. res: " . $res, __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }

            write_log("Adding compartments ...", __FILE__, __LINE__);
            $query_string = "canBreak=" . rawurlencode(strip_tags($is_combo)) . 
                "&sched=" . rawurlencode(strip_tags($etyp_schedul)) . 
                "&eqpCd=" . rawurlencode(strip_tags($this->etyp_id)) . 
                "&cmpts=" . count($this->compartments) . 
                "&op=15";

            $i = 0;
            foreach ($this->compartments as $compartment) {
                $query_string .= sprintf("&cmpt%d=%d&cmptFill%d=%d&unit=%s", 
                    $i, $i, $i, $compartment->cmpt_capacit, $compartment->cmpt_units);
                $i += 1;
            }

            $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/equip_types.cgi", $query_string);
            
            if (!(strpos($res, "var op=27;") !== false)) {
                write_log(sprintf("CGI returns %s", $res), __FILE__, __LINE__, LogLevel::ERROR);
                return false;
                
            }
        } else if (isset($this->composition) && count($this->composition) > 0) {
            $this->etyp_id = null;
            if (preg_match("/(var eqpCd=)(\d+)(;)/", $res, $out)) {
                $this->etyp_id = $out[2];
            }

            if (!isset($this->etyp_id)) {
                write_log("Failed to get equipment type id. res: " . $res, __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }

            write_log("Adding composition ...", __FILE__, __LINE__);
            $basic_string = "canBreak=1" . 
                "&sched=" . rawurlencode(strip_tags($etyp_schedul)) . 
                "&eqpCd=" . rawurlencode(strip_tags($this->etyp_id)) . 
                "&op=13";

            foreach ($this->composition as $sub_etyp) {
                $query_string = $basic_string . sprintf("&subEtyp=%d", $sub_etyp->etyp_id);
                $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/equip_types.cgi", $query_string);
            
                if (!(strpos($res, "var op=27;") !== false)) {
                    write_log(sprintf("CGI returns %s", $res), __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }
            }
        }

        return true;
    }

    public function delete()
    {
        //sess_id=LWWRTniwSbdD&eqpCd=40&canBreak=0&noOfcompts=0&op=18&callerTyp=flex
        if (!isset($this->etyp_id)) {
            // $error = new EchoSchema(400, "parameter missing: etyp_id not provided");
            // echo json_encode($error, JSON_PRETTY_PRINT);
            write_log("parameter missing: etyp_id not provided", __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $query = "SELECT COUNT(*) CN FROM EQP_CONNECT WHERE ECNCT_ETYP = :etyp_id";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':etyp_id', $this->etyp_id);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }
        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row['CN'] >= 1) {
            $can_break = 1;
        } else {
            $can_break = 0;
        }
        
        $query_string = "eqpCd=" . rawurlencode(strip_tags($this->etyp_id)) . 
            "&canBreak=" . rawurlencode(strip_tags($can_break)) . 
            "&noOfcompts=0&op=18&callerTyp=flex";

        $res = Utilities::http_cgi_invoke("cgi-bin/en/load_scheds/equip_types.cgi", $query_string);
        
        if (strpos($res, "var op=28;") !== false) {
            // $error = new EchoSchema(500, "Failed to delete equipment type");
            // echo json_encode($error, JSON_PRETTY_PRINT);
            return true;
        }
    
        write_log(sprintf("CGI returns %s", $res), __FILE__, __LINE__, LogLevel::ERROR);
        return false;
    }

    /* Only display non-combine equpment type. because for equipment, the type can
    only be non-combine, but for tanker, the type can be non-combine or combine */
    public function non_combo_only()
    {
        Utilities::sanitize($this);
        $this->etyp_title = isset($this->etyp_title) ? '%' . $this->etyp_title . '%' : '%';

        $query = "
        SELECT EQUIP_TYPES_VW.ETYP_ID,
            EQUIP_TYPES_VW.ETYP_TITLE,
            EQUIP_TYPES_VW.ETYP_CLASS,
            EQUIP_TYPES_VW.ETYP_N_ITEMS,
            EQUIP_TYPES_VW.ETYP_IS_DRUMFILL,
            EQUIP_TYPES_VW.ETYP_MAX_GROSS,
            EQUIP_TYPES_VW.ETYP_ISRIGID,
            EQUIP_TYPES_VW.ETYP_SCHEDUL,
            EQUIP_TYPES_VW.CMPTNU,
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
            AND ETYP_CLASS = 0
            AND ETYP_TITLE like :etyp_title ";

        if (isset($this->cmptnu)) {
            $query = $query . " AND EQUIP_TYPES_VW.CMPTNU = :cmptnu ";
        }

        $query = $query . " ORDER BY ETYP_TITLE ASC";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':etyp_title', $this->etyp_title);
        if (isset($this->cmptnu)) {
            oci_bind_by_name($stmt, ':cmptnu', $this->cmptnu);
        }
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

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function dropdown_eqpt_types()
    {
        $serv = new EqptService($this->conn);
        return $serv->dropdown_eqpt_types();
    }

    public function update_compartment_seals()
    {
        $query = "
            UPDATE COMPARTMENT
            SET CMPT_N_SEALS = :num_seals
            WHERE CMPT_ETYP = :etyp_id AND CMPT_NO = :cmpt_id
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':num_seals', $this->cmpt_n_seals);
        oci_bind_by_name($stmt, ':etyp_id', $this->etyp_id);
        oci_bind_by_name($stmt, ':cmpt_id', $this->cmpt_no);

        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }
}
