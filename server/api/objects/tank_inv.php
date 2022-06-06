<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../service/strap_service.php';
include_once 'common_class.php';

class TankInv extends CommonClass
{
    protected $TABLE_NAME = 'TANKS';

    public $NUMBER_FIELDS = array(
        "NETVOL",
        "GROSSVOL",
        "TANK_TEMP",
        "TANK_WATER_LVL",
        "TANK_WATER",
        "TANK_PROD_LVL",
        "TANK_IFC",
        "PUMPABLEVOL",
        "USABLEVOL",
        "BOOKBALANCE"
    );

    // read personnel
    public function read()
    {
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND TERMINAL.TERM_CODE = :term_code ";
        }
        $query = "
            SELECT 
                TANKS.TANK_TERMINAL                                AS TANK_SITE,
                TERMINAL.TERM_CODE || ' - ' || TERMINAL.TERM_NAME  AS TANK_SITENAME,
                TANKS.TANK_CODE                                    AS TANK_CODE,
                TANKS.TANK_LOCATION                                AS TANK_LOCATION,
                BASE_PRODS.BASE_NAME                               AS BASE_NAME,
                TANKS.TANK_WATER_LVL                               AS TANK_WATER_LVL,
                TANKS.TANK_WATER                                   AS TANK_WATER,
                TANKS.TANK_PROD_LVL                                AS TANK_PROD_LVL,
                TANKS.TANK_IFC                                     AS TANK_IFC,
                TANKS.TANK_TEMP                                    AS TANK_TEMP,
                NVL(TANKS.TANK_TOTAL_VOL, (NVL(TANKS.TANK_AMB_VOL,0) + NVL(TANKS.TANK_WATER,0) + NVL(TANKS.TANK_IFC,0))) 
                                                                   AS TANK_TOTAL_VOL,
                DECODE(NVL(TANK_ULLAGE,0), 0,
                    NVL(TANKS.TANK_SAFE_CAPACITY,0)
                        - NVL(TANKS.TANK_TOTAL_VOL, (NVL(TANKS.TANK_AMB_VOL,0) + NVL(TANKS.TANK_WATER,0) + NVL(TANKS.TANK_IFC,0))),
                    NVL(TANK_ULLAGE,0))                            AS TANK_ULLAGE,
                TANKS.TANK_AMB_VOL                                 AS TANK_AMB_VOL,
                TANKS.TANK_UL_LEVEL                                AS TANK_UL_LEVEL,
                TANK_COR_VOL * TANK_RPTVCF                         AS NETVOL,
                TANK_AMB_VOL * TANK_RPTVCF                         AS GROSSVOL,
                TANK_PUMP_VOL                                      AS PUMPABLEVOL,
                TANK_LTR_CLOSE * TANK_RPTVCF                       AS USABLEVOL,
                (TANK_LTR_CLOSE * TANK_RPTVCFCLOSE 
                    + TANK_RCPT_VOL * TANK_RPTVCF 
                    - TANK_TRF_VOL * TANK_RPTVCF)                  AS BOOKBALANCE
            FROM 
                TANKS, 
                TERMINAL,
                BASE_PRODS
            WHERE 
                BASE_PRODS.BASE_CODE = TANKS.TANK_BASE
                AND TANKS.TANK_TERMINAL = TERMINAL.TERM_CODE
                $terminal_condition
            ORDER BY TANKS.TANK_TERMINAL, TANKS.TANK_CODE
        ";

        $stmt = oci_parse($this->conn, $query);
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            oci_bind_by_name($stmt, ':term_code', $this->terminal);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return $stmt;
        } else {
            return null;
        }
    }

    public function calc_pumpable($item) {
        // get the value of TOV,
        $TOV = 0;
        if (!isset($item['tank_total_vol'])) {
            $TOV = (float)$item['tank_amb_vol'];
        } else {
            $TOV = (float)$item['tank_total_vol'];
        }

        // get the volume from User L-level
        $ULV = 0;
        if (!isset($item['tank_ul_level'])) {
            $ULV = 0;
        } else {
            $strap_service = new StrapService($this->conn);
            $ULV = $strap_service->get_amb($item['tank_code'], (float)$item['tank_ul_level']);
        }

        $pumpable = $TOV - $ULV;
        if ($pumpable < 0 || !is_numeric($pumpable)) {
            $pumpable = 0;
        }

        return $pumpable;
    }

    //calculate the pumpable volumes adhoc for each tank
    public function read_decorate(&$result_array)
    {
        foreach ($result_array as $key => $tank_item) {
            // calculate pumpable
            $result_array[$key]['pumpablevol'] = $this->calc_pumpable($tank_item);
        }
    }
}
