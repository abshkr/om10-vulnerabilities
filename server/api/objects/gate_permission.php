<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class GatePermission extends CommonClass
{
    protected $TABLE_NAME = 'ACCDEV';
    
    public $NUMBER_FIELDS = array(
        "RULE_PARENT",
    );

    public $BOOLEAN_FIELDS = array(
        "PRMSSN_ADV_LOCKOUT" => "Y",
        "PRMSSN_ADV_PIN_PASS" => "Y",
        "PRMSSN_EXPIRY_CHECK" => 1,
        "RULE_FIRST" => 1,
        "RULE_EXPIRY_CHECK" => 1,
    );
    
    public function read()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "
        SELECT 
            PRMSSN_K PRMSSN_ID,
            PRMSSN_NAME,
            PRMSSN_CASE,
            PRMSSN_AUTH,
            PRMSSN_ETYP,
            NVL(PRMSSN_EXPIRY_CHECK, 0) PRMSSN_EXPIRY_CHECK,
            GATE_K PRMSSN_GATE,
            G_TCD PRMSSN_GATETCD,
            AREA_K PRMSSN_AREAID,
            AREA_NAME PRMSSN_AREANAME,
            ADV_CODE PRMSSN_ADV_CODE,
            ADV_DEVICE PRMSSN_ADV_DEVICE,
            ADV_PORT PRMSSN_ADV_PORT,
            ADV_LOCKOUT PRMSSN_ADV_LOCKOUT,
            ADV_PIN_PASS PRMSSN_ADV_PIN_PASS
        FROM 
            PRMSSN_RC,
            GATE_RC,
            AREA_RC,
            ACCDEV
        WHERE PRMSSN_GATE = GATE_K
            AND GATE_AREA = AREA_K
            AND GATE_DVCE = ADV_CODE
        ORDER BY PRMSSN_K";
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
        $hook_item['rules'] = $result;
        // write_log(json_encode($hook_item), __FILE__, __LINE__);

        if (!array_key_exists('prmssn_id', $hook_item)) {
            write_log("hook_item does not have prmssn_id item, cannot do read_hook",
                __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $query = "
        SELECT
            PR.PRMSSN_K RULE_ID, 
            PR.PRMSSN_CASE RULE_CASE, 
            DECODE(PR.PRMSSN_CASE, 
                'DEFAULT_EQUIP', 'Default Equip', 
                'PRM_EQPT', 'Equip', 
                'DEFAULT_PERSONNEL', 'Default Personnel', 
                'PRM_PRSSNL', 'Personnel') RULE_CASENAME, 
            DECODE(PR.PRMSSN_CASE, 'DEFAULT_EQUIP', -999, PR.PRMSSN_ETYP) RULE_ETYP, 
            DECODE(PR.PRMSSN_CASE, 'DEFAULT_EQUIP', 'ANY', ET.ETYP_TITLE) RULE_ETYPNAME, 
            PR.PRMSSN_AUTH RULE_AUTH, 
            DECODE(PR.PRMSSN_CASE, 'DEFAULT_PERSONNEL', 'ANY', RT.AUTH_LEVEL_NAME) RULE_AUTHNAME, 
            1 RULE_FIRST, 
            PR.PRMSSN_K RULE_PARENT, 
            NVL(PR.PRMSSN_EXPIRY_CHECK,0) RULE_EXPIRY_CHECK
        FROM PRMSSN_RC PR, EQUIP_TYPES ET, AUTH_LEVEL_TYP RT
        WHERE PR.PRMSSN_AUTH = RT.AUTH_LEVEL_ID(+)
            AND PR.PRMSSN_ETYP = ET.ETYP_ID(+)
            AND PR.PRMSSN_K = :prmssn_k
        UNION
        SELECT PR.PRMT_K RULE_ID,
            PR.PRMT_CLASS RULE_CASE,
            DECODE(PR.PRMT_CLASS, 
                'DEFAULT_EQUIP', 'Default Equip',
                'PRM_EQPT', 'Equip',
                'DEFAULT_PERSONNEL', 'Default Personnel',
                'PRM_PRSSNL', 'Personnel'
            ) RULE_CASENAME,
            DECODE(PR.PRMT_CLASS, 'DEFAULT_EQUIP', -999, PR.PRMT_ETP) RULE_ETYP,
            DECODE(PR.PRMT_CLASS, 'DEFAULT_EQUIP', 'ANY', ET.ETYP_TITLE) RULE_ETYPNAME,
            PR.PRMT_AUTH RULE_AUTH,
            DECODE(PR.PRMT_CLASS, 'DEFAULT_PERSONNEL', 'ANY', RT.AUTH_LEVEL_NAME) RULE_AUTHNAME,
            0 RULE_FIRST,
            PR.PRMT_PRMSSN RULE_PARENT,
            NVL(PR.PRMT_EXPIRY_CHECK,0) RULE_EXPIRY_CHECK
        FROM PRMT_RC PR, EQUIP_TYPES ET, AUTH_LEVEL_TYP RT
        WHERE PR.PRMT_AUTH = RT.AUTH_LEVEL_ID(+)
            AND PR.PRMT_ETP = ET.ETYP_ID(+)
            AND PR.PRMT_PRMSSN = :prmssn_k";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prmssn_k', $hook_item['prmssn_id']);
        if (!oci_execute($stmt)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        //The last $method parameter need to be NonExistHook to prevent 
        Utilities::retrieve($result, $this, $stmt, $method='NonExistHook');
        $hook_item['rules'] = $result;
    }
}