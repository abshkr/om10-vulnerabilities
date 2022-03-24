<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/strap_service.php';
include_once 'common_class.php';
include_once 'tank_status.php';

class FolioTankBase extends CommonClass
{
    protected $TABLE_NAME = 'CLOSEOUT_TANK_BASES';
    protected $VIEW_NAME = 'CLOSEOUT_TANK_BASES';

    protected $primary_keys = array("closeout_nr", "tank_terminal", "tank_code", "base_period_index");

    protected $table_view_map = array(
        "TANK_LEVEL" => "TANK_PROD_LVL"
    );

    public function post_update()
    {
        // TODO
        $next_folio = $this->closeout_nr + 1;

        $query = "
            UPDATE " . $this->TABLE_NAME . " SET OPEN_MASS_TOT = :open_mass_tot,
                OPEN_DENSITY = :open_density,
                OPEN_STD_TOT = :open_std_tot,
                OPEN_AMB_TOT = :open_amb_tot,
                OPEN_TEMP = :open_temp
            WHERE CLOSEOUT_NR = :closeout_nr
                AND TANK_CODE = :tank_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':open_mass_tot', $this->close_mass_tot);
        oci_bind_by_name($stmt, ':open_std_tot', $this->close_std_tot);
        oci_bind_by_name($stmt, ':open_density', $this->close_density);
        oci_bind_by_name($stmt, ':open_amb_tot', $this->close_amb_tot);
        oci_bind_by_name($stmt, ':open_temp', $this->close_temp);
        oci_bind_by_name($stmt, ':closeout_nr', $next_folio);
        oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
        //         , TANK_BASECODE = :base_code
        //         , TANK_BASENAME = :base_name
        // oci_bind_by_name($stmt, ':base_code', $this->tank_basecode);
        // oci_bind_by_name($stmt, ':base_name', $this->tank_basename);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        if ($this->record_updated) {
            $cur_user = Utilities::getCurrPsn();
            $query = "
                UPDATE " . $this->TABLE_NAME . " SET USER_CODE = :user_code,
                    LAST_CHG_TIME = SYSDATE
                WHERE CLOSEOUT_NR = :closeout_nr
                    AND TANK_CODE = :tank_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':user_code', $cur_user);
            oci_bind_by_name($stmt, ':closeout_nr', $this->closeout_nr);
            oci_bind_by_name($stmt, ':tank_code', $this->tank_code);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return false;
            }
        }

        return true;
    }

    public function get_tanks()
    {
        $query = "
        SELECT 
            ctb.*,
            NVL(ctb.TANK_BASECODE, TANKS.TANK_BASE)  TANK_BASECODE2,
            NVL(ctb.TANK_BASENAME, BASE_PRODS.BASE_NAME)  TANK_BASENAME2,
            TANKS.TANK_BASE  CURR_BASECODE,
            TANK_LEVEL TANK_PROD_LVL,
            TANKS.TANK_GAUGINGMTHD,
            GAUGE_METHOD_NAME TANK_GAUGINGMTHD_DESC,
            BASE_PRODS.BASE_NAME  CURR_BASENAME,
            BASECLASS.BCLASS_DESC,
            BASECLASS.BCLASS_NO,
            BASECLASS.BCLASS_DENS_LO,
            BASECLASS.BCLASS_DENS_HI,
            BASECLASS.BCLASS_VCF_ALG,
            TANKS.TANK_DENSITY
        FROM 
            CLOSEOUT_TANK_BASES ctb, 
            TANKS, 
            BASE_PRODS, 
            (
                SELECT
                    BS.BCLASS_NO,
                    NVL(BM.BCLASS_NAME, BS.BCLASS_DESC)           AS BCLASS_DESC,
                    BS.BCLASS_DENS_LO,
                    BS.BCLASS_DENS_HI,
                    BS.BCLASS_VCF_ALG,
                    BS.BCLASS_TEMP_LO,
                    BS.BCLASS_TEMP_HI
                FROM BASECLASS BS,
                    BCLASS_TYP BM
                WHERE BS.BCLASS_NO = BM.BCLASS_ID(+)
            ) BASECLASS, 
            GAUGE_METHOD_TYP
        WHERE ctb.TANK_CODE = TANKS.TANK_CODE
            AND NVL(ctb.TANK_BASECODE, TANKS.TANK_BASE) = BASE_PRODS.BASE_CODE
            AND BASE_PRODS.BASE_CAT = BASECLASS.BCLASS_NO
            AND TANK_GAUGINGMTHD = GAUGE_METHOD_ID(+)
            AND ctb.CLOSEOUT_NR = :closeout_nr
        ORDER BY BASECLASS.BCLASS_NO, ctb.TANK_CODE
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':closeout_nr', $this->closeout_nr);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
    
    protected function count_folio_tank_bases($closeout_nr, $tank_terminal, $tank_code)
    {
        $nrecs = 0;
        $query = "
            SELECT COUNT(*) as NRECS 
            FROM CLOSEOUT_TANK_BASES
            WHERE CLOSEOUT_NR = :closeout_nr
            AND TANK_TERMINAL = :tank_terminal
            AND TANK_CODE = :tank_code
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':closeout_nr', $closeout_nr);
        oci_bind_by_name($stmt, ':tank_terminal', $tank_terminal);
        oci_bind_by_name($stmt, ':tank_code', $tank_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        } else {
            $row = oci_fetch_array($stmt, OCI_NO_AUTO_COMMIT);
            $nrecs = (int)$row['NRECS'];
        }
        
        return $nrecs;
    }
    
    protected function get_first_folio_tank_base($closeout_nr, $tank_terminal, $tank_code)
    {
        $row = null;
        $query = "
            SELECT ct.* 
                , 1                      as BASE_PERIOD_INDEX
                , cl.PREV_CLOSEOUT_DATE  as BASE_PERIOD_OPEN
                , NULL                   as BASE_PERIOD_CLOSE
            FROM CLOSEOUT_TANK ct, CLOSEOUTS cl
            WHERE ct.CLOSEOUT_NR = :closeout_nr
            AND ct.TANK_TERMINAL = :tank_terminal
            AND ct.TANK_CODE = :tank_code
            AND ct.CLOSEOUT_NR = cl.CLOSEOUT_NR
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':closeout_nr', $closeout_nr);
        oci_bind_by_name($stmt, ':tank_terminal', $tank_terminal);
        oci_bind_by_name($stmt, ':tank_code', $tank_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        } else {
            // there should be only one
            $row = oci_fetch_array($stmt, OCI_NO_AUTO_COMMIT);
        }
        
        return $row;
    }
    
    protected function get_last_folio_tank_base($closeout_nr, $tank_terminal, $tank_code)
    {
        $row = null;
        $query = "
            SELECT * 
            FROM CLOSEOUT_TANK_BASES
            WHERE CLOSEOUT_NR = :closeout_nr
            AND TANK_TERMINAL = :tank_terminal
            AND TANK_CODE = :tank_code
            ORDER BY BASE_PERIOD_INDEX DESC
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':closeout_nr', $closeout_nr);
        oci_bind_by_name($stmt, ':tank_terminal', $tank_terminal);
        oci_bind_by_name($stmt, ':tank_code', $tank_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        } else {
            // get the last one
            $row = oci_fetch_array($stmt, OCI_NO_AUTO_COMMIT);
        }
        
        return $row;
    }

    public function create_folio_base_tank($row) {

        $query = "
        INSERT INTO CLOSEOUT_TANK_BASES (
            CLOSEOUT_NR
            , TANK_TERMINAL
            , TANK_CODE
            , BASE_PERIOD_INDEX
            , BASE_PERIOD_OPEN
            , BASE_PERIOD_CLOSE
            , TANK_BASECODE
            , TANK_BASENAME
            , OPEN_STD_TOT
            , OPEN_MASS_TOT
            , LAST_GAUGE_TIME
            , CLOSE_STD_TOT
            , CLOSE_MASS_TOT
            , FREEZE_STD_TOT
            , FREEZE_MASS_TOT
            , RCPT_VOL
            , TRF_VOL
            , OPEN_TEMP
            , OPEN_DENSITY
            , FREEZE_TEMP
            , FREEZE_DENSITY
            , CLOSE_TEMP
            , CLOSE_DENSITY
            , DESCRIPTION
            , USER_CODE
            , LAST_CHG_TIME
            , OPEN_AMB_TOT
            , CLOSE_AMB_TOT
            , FREEZE_AMB_TOT
            , TANK_LEVEL
            , TANK_WATER_LVL
            , TANK_WATER
            , TANK_ROOF_WEIGHT
            , TANK_IFC
        ) VALUES (
            :closeout_nr
            , :tank_terminal
            , :tank_code
            , :base_period_index
            , :base_period_open
            , :base_period_close
            , :tank_basecode
            , :tank_basename
            , :open_std_tot
            , :open_mass_tot
            , :last_gauge_time
            , :close_std_tot
            , :close_mass_tot
            , :freeze_std_tot
            , :freeze_mass_tot
            , :rcpt_vol
            , :trf_vol
            , :open_temp
            , :open_density
            , :freeze_temp
            , :freeze_density
            , :close_temp
            , :close_density
            , :description
            , :user_code
            , SYSTIMESTAMP
            , :open_amb_tot
            , :close_amb_tot
            , :freeze_amb_tot
            , :tank_level
            , :tank_water_lvl
            , :tank_water
            , :tank_roof_weight
            , :tank_ifc
        )
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':closeout_nr',            $row['CLOSEOUT_NR']);
        oci_bind_by_name($stmt, ':tank_terminal',          $row['TANK_TERMINAL']);
        oci_bind_by_name($stmt, ':tank_code',              $row['TANK_CODE']);
        oci_bind_by_name($stmt, ':base_period_index',      $row['BASE_PERIOD_INDEX']);
        oci_bind_by_name($stmt, ':base_period_open',       $row['BASE_PERIOD_OPEN']);
        oci_bind_by_name($stmt, ':base_period_close',      $row['BASE_PERIOD_CLOSE']);
        oci_bind_by_name($stmt, ':tank_basecode',          $row['TANK_BASECODE']);
        oci_bind_by_name($stmt, ':tank_basename',          $row['TANK_BASENAME']);
        oci_bind_by_name($stmt, ':open_std_tot',           $row['OPEN_STD_TOT']);
        oci_bind_by_name($stmt, ':open_mass_tot',          $row['OPEN_MASS_TOT']);
        oci_bind_by_name($stmt, ':last_gauge_time',        $row['LAST_GAUGE_TIME']);
        oci_bind_by_name($stmt, ':close_std_tot',          $row['CLOSE_STD_TOT']);
        oci_bind_by_name($stmt, ':close_mass_tot',         $row['CLOSE_MASS_TOT']);
        oci_bind_by_name($stmt, ':freeze_std_tot',         $row['FREEZE_STD_TOT']);
        oci_bind_by_name($stmt, ':freeze_mass_tot',        $row['FREEZE_MASS_TOT']);
        oci_bind_by_name($stmt, ':rcpt_vol',               $row['RCPT_VOL']);
        oci_bind_by_name($stmt, ':trf_vol',                $row['TRF_VOL']);
        oci_bind_by_name($stmt, ':open_temp',              $row['OPEN_TEMP']);
        oci_bind_by_name($stmt, ':open_density',           $row['OPEN_DENSITY']);
        oci_bind_by_name($stmt, ':freeze_temp',            $row['FREEZE_TEMP']);
        oci_bind_by_name($stmt, ':freeze_density',         $row['FREEZE_DENSITY']);
        oci_bind_by_name($stmt, ':close_temp',             $row['CLOSE_TEMP']);
        oci_bind_by_name($stmt, ':close_density',          $row['CLOSE_DENSITY']);
        oci_bind_by_name($stmt, ':description',            $row['DESCRIPTION']);
        oci_bind_by_name($stmt, ':user_code',              $row['USER_CODE']);
        // oci_bind_by_name($stmt, ':last_chg_time',          $row['LAST_CHG_TIME']);
        oci_bind_by_name($stmt, ':open_amb_tot',           $row['OPEN_AMB_TOT']);
        oci_bind_by_name($stmt, ':close_amb_tot',          $row['CLOSE_AMB_TOT']);
        oci_bind_by_name($stmt, ':freeze_amb_tot',         $row['FREEZE_AMB_TOT']);
        oci_bind_by_name($stmt, ':tank_level',             $row['TANK_LEVEL']);
        oci_bind_by_name($stmt, ':tank_water_lvl',         $row['TANK_WATER_LVL']);
        oci_bind_by_name($stmt, ':tank_water',             $row['TANK_WATER']);
        oci_bind_by_name($stmt, ':tank_roof_weight',       $row['TANK_ROOF_WEIGHT']);
        oci_bind_by_name($stmt, ':tank_ifc',               $row['TANK_IFC']);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    // mainly close the base record
    public function update_folio_base_tank($row) {

        $query = "
        UPDATE CLOSEOUT_TANK_BASES SET
              BASE_PERIOD_OPEN            = :base_period_open
            , BASE_PERIOD_CLOSE           = SYSTIMESTAMP
            , TANK_BASECODE               = :tank_basecode
            , TANK_BASENAME               = :tank_basename
            , OPEN_STD_TOT                = :open_std_tot
            , OPEN_MASS_TOT               = :open_mass_tot
            , LAST_GAUGE_TIME             = :last_gauge_time
            , CLOSE_STD_TOT               = :close_std_tot
            , CLOSE_MASS_TOT              = :close_mass_tot
            , FREEZE_STD_TOT              = :freeze_std_tot
            , FREEZE_MASS_TOT             = :freeze_mass_tot
            , RCPT_VOL                    = :rcpt_vol
            , TRF_VOL                     = :trf_vol
            , OPEN_TEMP                   = :open_temp
            , OPEN_DENSITY                = :open_density
            , FREEZE_TEMP                 = :freeze_temp
            , FREEZE_DENSITY              = :freeze_density
            , CLOSE_TEMP                  = :close_temp
            , CLOSE_DENSITY               = :close_density
            , DESCRIPTION                 = :description
            , USER_CODE                   = :user_code
            , LAST_CHG_TIME               = SYSTIMESTAMP
            , OPEN_AMB_TOT                = :open_amb_tot
            , CLOSE_AMB_TOT               = :close_amb_tot
            , FREEZE_AMB_TOT              = :freeze_amb_tot
            , TANK_LEVEL                  = :tank_level
            , TANK_WATER_LVL              = :tank_water_lvl
            , TANK_WATER                  = :tank_water
            , TANK_ROOF_WEIGHT            = :tank_roof_weight
            , TANK_IFC                    = :tank_ifc
        WHERE
            CLOSEOUT_NR                   = :closeout_nr
            AND TANK_TERMINAL             = :tank_terminal
            AND TANK_CODE                 = :tank_code
            AND BASE_PERIOD_INDEX         = :base_period_index
        ";
        $stmt = oci_parse($this->conn, $query);

        oci_bind_by_name($stmt, ':closeout_nr',            $row['CLOSEOUT_NR']);
        oci_bind_by_name($stmt, ':tank_terminal',          $row['TANK_TERMINAL']);
        oci_bind_by_name($stmt, ':tank_code',              $row['TANK_CODE']);
        oci_bind_by_name($stmt, ':base_period_index',      $row['BASE_PERIOD_INDEX']);
        oci_bind_by_name($stmt, ':base_period_open',       $row['BASE_PERIOD_OPEN']);
        oci_bind_by_name($stmt, ':base_period_close',      $row['BASE_PERIOD_CLOSE']);
        oci_bind_by_name($stmt, ':tank_basecode',          $row['TANK_BASECODE']);
        oci_bind_by_name($stmt, ':tank_basename',          $row['TANK_BASENAME']);
        oci_bind_by_name($stmt, ':open_std_tot',           $row['OPEN_STD_TOT']);
        oci_bind_by_name($stmt, ':open_mass_tot',          $row['OPEN_MASS_TOT']);
        oci_bind_by_name($stmt, ':last_gauge_time',        $row['LAST_GAUGE_TIME']);
        oci_bind_by_name($stmt, ':close_std_tot',          $row['CLOSE_STD_TOT']);
        oci_bind_by_name($stmt, ':close_mass_tot',         $row['CLOSE_MASS_TOT']);
        oci_bind_by_name($stmt, ':freeze_std_tot',         $row['FREEZE_STD_TOT']);
        oci_bind_by_name($stmt, ':freeze_mass_tot',        $row['FREEZE_MASS_TOT']);
        oci_bind_by_name($stmt, ':rcpt_vol',               $row['RCPT_VOL']);
        oci_bind_by_name($stmt, ':trf_vol',                $row['TRF_VOL']);
        oci_bind_by_name($stmt, ':open_temp',              $row['OPEN_TEMP']);
        oci_bind_by_name($stmt, ':open_density',           $row['OPEN_DENSITY']);
        oci_bind_by_name($stmt, ':freeze_temp',            $row['FREEZE_TEMP']);
        oci_bind_by_name($stmt, ':freeze_density',         $row['FREEZE_DENSITY']);
        oci_bind_by_name($stmt, ':close_temp',             $row['CLOSE_TEMP']);
        oci_bind_by_name($stmt, ':close_density',          $row['CLOSE_DENSITY']);
        oci_bind_by_name($stmt, ':description',            $row['DESCRIPTION']);
        oci_bind_by_name($stmt, ':user_code',              $row['USER_CODE']);
        oci_bind_by_name($stmt, ':last_chg_time',          $row['LAST_CHG_TIME']);
        oci_bind_by_name($stmt, ':open_amb_tot',           $row['OPEN_AMB_TOT']);
        oci_bind_by_name($stmt, ':close_amb_tot',          $row['CLOSE_AMB_TOT']);
        oci_bind_by_name($stmt, ':freeze_amb_tot',         $row['FREEZE_AMB_TOT']);
        oci_bind_by_name($stmt, ':tank_level',             $row['TANK_LEVEL']);
        oci_bind_by_name($stmt, ':tank_water_lvl',         $row['TANK_WATER_LVL']);
        oci_bind_by_name($stmt, ':tank_water',             $row['TANK_WATER']);
        oci_bind_by_name($stmt, ':tank_roof_weight',       $row['TANK_ROOF_WEIGHT']);
        oci_bind_by_name($stmt, ':tank_ifc',               $row['TANK_IFC']);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    /*
        closeout_nr: closeout,
        tank_terminal: value?.tank_terminal,
        tank_code: value?.tank_code,
        tank_basecode: base?.base_code,
        tank_basename: base?.base_name,
        tank_basecode_old: baseOld?.base_code,
        tank_basename_old: baseOld?.base_name,
        tank_density_old: oldDensity,
        tank_density_new: newDensity,
    */
    /*
    CLOSEOUT_NR   TANK_TERMINAL    TANK_CODE   BASE_PERIOD_INDEX   BASE_PERIOD_OPEN (open time)    BASE_PERIOD_CLOSE(close time)    OPEN_STD_TOT   OPEN_DENSITY   CLOSE_STD_TOT   CLOSE_DENSITY    TANK_BASECODE   
    1001          TRM001           TK001       1                   ot1                             ct1                              OSTD1          OD1            CSTD1           CD1              B001     
    1001          TRM001           TK001       2                   ot2                             ct2                              OSTD2          OD1            CSTD2           CD2              B002     
    1001          TRM001           TK001       3                   ot3                             ct3                              OSTD3          OD1            CSTD3           CD3              B003     
    1001          TRM001           TK001       4                   ot4                             ct4                              OSTD4          OD1            CSTD4           CD4              B004     
    1001          TRM001           TK001       5                   ot5                             ct5                              OSTD5          OD1            CSTD5           CD5              B005     
    1001          TRM001           TK001       6                   ot6                             ct6                              OSTD6          OD1            CSTD6           CD6              B006     
    1001          TRM001           TK001       7                   ot7                             ct7                              OSTD7          OD1            CSTD7           CD7              B007     
    1001          TRM001           TK001       8                   ot8                             ct8                              OSTD8          OD1            CSTD8           CD8              B008     

    t1 -> open date-time for the folio 1001
    t2 to t8  the time of changing product
    ct1 =ot2 
    ct2 =ot3
    …….

    ct7=ot8

    ct8 = closing date-time of the folio 1001

    ODi = the density of product B00i  @ oti
    CDi  = the density of product B00i @ cti

    OSTD1 = opening stock of the folio 1001
    OSTD2 to OSTD7  = 0

    CSTD2 to CSTD7 = 0

    CSTD8 = closing stock of the folio 1001

    B00i = tank product @ oti
    */
    public function adjust()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $cur_user = Utilities::getCurrPsn();

        // find if there is record in CLOSEOUT_TANK_BASES for current closeout_nr and tank
        $nrec = $this->count_folio_tank_bases($this->closeout_nr, $this->tank_terminal, $this->tank_code);

        if ($nrec > 0) {
            // it is not the 1st time change, get the last record of current closeout_nr and tank
            $row_prev_base = $this->get_last_folio_tank_base($this->closeout_nr, $this->tank_terminal, $this->tank_code);
            $row_prev_base['USER_CODE'] = $cur_user;
        } else {
            // it is the 1st time to change the base product,  copy the record from CLOSEOUT_TANK 
            // get the current record of current closeout_nr and tank from CLOSEOUT_TANK, 
            // need assign values to BASE_PERIOD_INDEX, BASE_PERIOD_OPEN, and BASE_PERIOD_CLOSE
            $row_prev_base = $this->get_first_folio_tank_base($this->closeout_nr, $this->tank_terminal, $this->tank_code);
            $row_prev_base['USER_CODE'] = $cur_user;
            // then insert this record to CLOSEOUT_TANK_BASES
            if ($this->create_folio_base_tank($row_prev_base) == false) {
                return false;
            }
        }

        $row_old_base = array();
        foreach($row_prev_base as $k => $v) {
            $row_old_base[$k] = $v;
        }
        $row_new_base = array();
        foreach($row_prev_base as $k => $v) {
            $row_new_base[$k] = $v;
        }

        /* , OPEN_STD_TOT                = :open_std_tot
        , OPEN_MASS_TOT               = :open_mass_tot
        , OPEN_TEMP                   = :open_temp
        , OPEN_DENSITY                = :open_density
        , OPEN_AMB_TOT                = :open_amb_tot
        
        , CLOSE_STD_TOT               = :close_std_tot
        , CLOSE_MASS_TOT              = :close_mass_tot
        , CLOSE_TEMP                  = :close_temp
        , CLOSE_DENSITY               = :close_density
        , CLOSE_AMB_TOT               = :close_amb_tot
        
        , FREEZE_STD_TOT              = :freeze_std_tot
        , FREEZE_MASS_TOT             = :freeze_mass_tot
        , FREEZE_TEMP                 = :freeze_temp
        , FREEZE_DENSITY              = :freeze_density
        , FREEZE_AMB_TOT              = :freeze_amb_tot */

        // close the old base
        // set the base code and name here in case the major opening record does not have the values
        $row_old_base['TANK_BASECODE']     = $this->tank_basecode_old;
        $row_old_base['TANK_BASENAME']     = $this->tank_basename_old;
        $row_old_base['OPEN_DENSITY']      = $this->tank_density_old;

        $row_old_base['CLOSE_STD_TOT']   = 0; // $row_old_base['OPEN_STD_TOT'];
        $row_old_base['CLOSE_MASS_TOT']  = 0; // $row_old_base['OPEN_MASS_TOT'];
        $row_old_base['CLOSE_TEMP']      = $row_old_base['OPEN_TEMP'];
        $row_old_base['CLOSE_DENSITY']   = $row_old_base['OPEN_DENSITY'];
        $row_old_base['CLOSE_AMB_TOT']   = 0; // $row_old_base['OPEN_AMB_TOT'];

        $row_old_base['FREEZE_STD_TOT']  = $row_old_base['CLOSE_STD_TOT'];
        $row_old_base['FREEZE_MASS_TOT'] = $row_old_base['CLOSE_MASS_TOT'];
        $row_old_base['FREEZE_TEMP']     = $row_old_base['CLOSE_TEMP'];
        $row_old_base['FREEZE_DENSITY']  = $row_old_base['CLOSE_DENSITY'];
        $row_old_base['FREEZE_AMB_TOT']  = $row_old_base['CLOSE_AMB_TOT'];

        if ($this->update_folio_base_tank($row_old_base) == false) {
            return false;
        } else {
            // get the closing time
            $row_prev_closed = $this->get_last_folio_tank_base($this->closeout_nr, $this->tank_terminal, $this->tank_code);
        }

        // open the new base, and leave it open
        $row_new_base['BASE_PERIOD_INDEX'] = $row_old_base['BASE_PERIOD_INDEX']+1;
        $row_new_base['TANK_BASECODE']     = $this->tank_basecode;
        $row_new_base['TANK_BASENAME']     = $this->tank_basename;
        $row_new_base['BASE_PERIOD_OPEN']  = $row_prev_closed['BASE_PERIOD_CLOSE'];
        $row_new_base['BASE_PERIOD_CLOSE'] = null; // $row_prev_closed['BASE_PERIOD_CLOSE'];

        $row_new_base['OPEN_STD_TOT']    = $row_old_base['CLOSE_STD_TOT'];
        $row_new_base['OPEN_MASS_TOT']   = $row_old_base['CLOSE_MASS_TOT'];
        $row_new_base['OPEN_TEMP']       = $row_old_base['CLOSE_TEMP'];
        $row_new_base['OPEN_DENSITY']    = $this->tank_density_new; // $row_old_base['CLOSE_DENSITY'];
        $row_new_base['OPEN_AMB_TOT']    = $row_old_base['CLOSE_AMB_TOT'];

        $row_new_base['CLOSE_STD_TOT']   = null; // $row_old_base['OPEN_STD_TOT'];
        $row_new_base['CLOSE_MASS_TOT']  = null; // $row_old_base['OPEN_MASS_TOT'];
        $row_new_base['CLOSE_TEMP']      = null; // $row_old_base['OPEN_TEMP'];
        $row_new_base['CLOSE_DENSITY']   = null; // $row_new_base['OPEN_DENSITY'];
        $row_new_base['CLOSE_AMB_TOT']   = null; // $row_old_base['OPEN_AMB_TOT'];

        $row_new_base['FREEZE_STD_TOT']  = $row_new_base['CLOSE_STD_TOT'];
        $row_new_base['FREEZE_MASS_TOT'] = $row_new_base['CLOSE_MASS_TOT'];
        $row_new_base['FREEZE_TEMP']     = $row_new_base['CLOSE_TEMP'];
        $row_new_base['FREEZE_DENSITY']  = $row_new_base['CLOSE_DENSITY'];
        $row_new_base['FREEZE_AMB_TOT']  = $row_new_base['CLOSE_AMB_TOT'];

        if ($this->create_folio_base_tank($row_new_base) == false) {
            return false;
        }

        oci_commit($this->conn);

        $error = new EchoSchema(200, response("__SAVE_SUCCEEDED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);

        return true;
    }

    /*
        closeout_nr: closeout,
        tank_terminal: value?.tank_terminal,
        tank_code: value?.tank_code,
        tank_basecode: base?.base_code,
        tank_basename: base?.base_name,
        tank_basecode_old: baseOld?.base_code,
        tank_basename_old: baseOld?.base_name,
        tank_density_old: oldDensity,
        tank_density_new: newDensity,
    */
    public function adjust_3row()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $cur_user = Utilities::getCurrPsn();

        // find if there is record in CLOSEOUT_TANK_BASES for current closeout_nr and tank
        $nrec = $this->count_folio_tank_bases($this->closeout_nr, $this->tank_terminal, $this->tank_code);

        if ($nrec > 0) {
            // it is not the 1st time change, get the last record of current closeout_nr and tank
            $row_prev_base = $this->get_last_folio_tank_base($this->closeout_nr, $this->tank_terminal, $this->tank_code);
            $row_prev_base['USER_CODE'] = $cur_user;
        } else {
            // copy the record from CLOSEOUT_TANK 
            // get the current record of current closeout_nr and tank from CLOSEOUT_TANK, 
            // need assign values to BASE_PERIOD_INDEX, BASE_PERIOD_OPEN, and BASE_PERIOD_CLOSE
            $row_prev_base = $this->get_first_folio_tank_base($this->closeout_nr, $this->tank_terminal, $this->tank_code);
            $row_prev_base['USER_CODE'] = $cur_user;
            // then insert this record to CLOSEOUT_TANK_BASES
            if ($this->create_folio_base_tank($row_prev_base) == false) {
                return false;
            }
        }

        $row_old_base = array();
        foreach($row_prev_base as $k => $v) {
            $row_old_base[$k] = $v;
        }
        $row_new_base = array();
        foreach($row_prev_base as $k => $v) {
            $row_new_base[$k] = $v;
        }
        $row_cur_base = array();
        foreach($row_prev_base as $k => $v) {
            $row_cur_base[$k] = $v;
        }

        /* , OPEN_STD_TOT                = :open_std_tot
        , OPEN_MASS_TOT               = :open_mass_tot
        , OPEN_TEMP                   = :open_temp
        , OPEN_DENSITY                = :open_density
        , OPEN_AMB_TOT                = :open_amb_tot
        
        , CLOSE_STD_TOT               = :close_std_tot
        , CLOSE_MASS_TOT              = :close_mass_tot
        , CLOSE_TEMP                  = :close_temp
        , CLOSE_DENSITY               = :close_density
        , CLOSE_AMB_TOT               = :close_amb_tot
        
        , FREEZE_STD_TOT              = :freeze_std_tot
        , FREEZE_MASS_TOT             = :freeze_mass_tot
        , FREEZE_TEMP                 = :freeze_temp
        , FREEZE_DENSITY              = :freeze_density
        , FREEZE_AMB_TOT              = :freeze_amb_tot */

        // close the old base
        // set the base code and name here in case the major opening record does not have the values
        $row_old_base['TANK_BASECODE']     = $this->tank_basecode_old;
        $row_old_base['TANK_BASENAME']     = $this->tank_basename_old;
        $row_old_base['OPEN_DENSITY']      = $this->tank_density_old;

        $row_old_base['CLOSE_STD_TOT']   = 0; // $row_old_base['OPEN_STD_TOT'];
        $row_old_base['CLOSE_MASS_TOT']  = 0; // $row_old_base['OPEN_MASS_TOT'];
        $row_old_base['CLOSE_TEMP']      = $row_old_base['OPEN_TEMP'];
        $row_old_base['CLOSE_DENSITY']   = $row_old_base['OPEN_DENSITY'];
        $row_old_base['CLOSE_AMB_TOT']   = 0; // $row_old_base['OPEN_AMB_TOT'];

        $row_old_base['FREEZE_STD_TOT']  = $row_old_base['CLOSE_STD_TOT'];
        $row_old_base['FREEZE_MASS_TOT'] = $row_old_base['CLOSE_MASS_TOT'];
        $row_old_base['FREEZE_TEMP']     = $row_old_base['CLOSE_TEMP'];
        $row_old_base['FREEZE_DENSITY']  = $row_old_base['CLOSE_DENSITY'];
        $row_old_base['FREEZE_AMB_TOT']  = $row_old_base['CLOSE_AMB_TOT'];

        if ($this->update_folio_base_tank($row_old_base) == false) {
            return false;
        } else {
            // get the closing time
            $row_prev_closed = $this->get_last_folio_tank_base($this->closeout_nr, $this->tank_terminal, $this->tank_code);
        }

        // open the new base, and close it immediately with the qty of old base
        $row_new_base['BASE_PERIOD_INDEX'] = $row_old_base['BASE_PERIOD_INDEX']+1;
        $row_new_base['TANK_BASECODE']     = $this->tank_basecode;
        $row_new_base['TANK_BASENAME']     = $this->tank_basename;
        $row_new_base['BASE_PERIOD_OPEN']  = $row_prev_closed['BASE_PERIOD_CLOSE'];
        $row_new_base['BASE_PERIOD_CLOSE'] = $row_prev_closed['BASE_PERIOD_CLOSE'];

        $row_new_base['OPEN_STD_TOT']    = $row_old_base['CLOSE_STD_TOT'];
        $row_new_base['OPEN_MASS_TOT']   = $row_old_base['CLOSE_MASS_TOT'];
        $row_new_base['OPEN_TEMP']       = $row_old_base['CLOSE_TEMP'];
        $row_new_base['OPEN_DENSITY']    = $this->tank_density_new; // $row_old_base['CLOSE_DENSITY'];
        $row_new_base['OPEN_AMB_TOT']    = $row_old_base['CLOSE_AMB_TOT'];

        $row_new_base['CLOSE_STD_TOT']   = $row_old_base['OPEN_STD_TOT'];
        $row_new_base['CLOSE_MASS_TOT']  = $row_old_base['OPEN_MASS_TOT'];
        $row_new_base['CLOSE_TEMP']      = $row_old_base['OPEN_TEMP'];
        $row_new_base['CLOSE_DENSITY']   = $row_new_base['OPEN_DENSITY'];
        $row_new_base['CLOSE_AMB_TOT']   = $row_old_base['OPEN_AMB_TOT'];

        $row_new_base['FREEZE_STD_TOT']  = $row_new_base['CLOSE_STD_TOT'];
        $row_new_base['FREEZE_MASS_TOT'] = $row_new_base['CLOSE_MASS_TOT'];
        $row_new_base['FREEZE_TEMP']     = $row_new_base['CLOSE_TEMP'];
        $row_new_base['FREEZE_DENSITY']  = $row_new_base['CLOSE_DENSITY'];
        $row_new_base['FREEZE_AMB_TOT']  = $row_new_base['CLOSE_AMB_TOT'];

        if ($this->create_folio_base_tank($row_new_base) == false) {
            return false;
        }

        // open the cur base, and leave it open
        $row_cur_base['BASE_PERIOD_INDEX'] = $row_new_base['BASE_PERIOD_INDEX']+1;
        $row_cur_base['TANK_BASECODE']     = $this->tank_basecode;
        $row_cur_base['TANK_BASENAME']     = $this->tank_basename;
        $row_cur_base['BASE_PERIOD_OPEN']  = $row_prev_closed['BASE_PERIOD_CLOSE'];
        $row_cur_base['BASE_PERIOD_CLOSE'] = null;

        $row_cur_base['OPEN_STD_TOT']    = $row_new_base['CLOSE_STD_TOT'];
        $row_cur_base['OPEN_MASS_TOT']   = $row_new_base['CLOSE_MASS_TOT'];
        $row_cur_base['OPEN_TEMP']       = $row_new_base['CLOSE_TEMP'];
        $row_cur_base['OPEN_DENSITY']    = $row_new_base['CLOSE_DENSITY'];
        $row_cur_base['OPEN_AMB_TOT']    = $row_new_base['CLOSE_AMB_TOT'];

        $row_cur_base['CLOSE_STD_TOT']   = null; // $row_new_base[''];
        $row_cur_base['CLOSE_MASS_TOT']  = null; // $row_new_base[''];
        $row_cur_base['CLOSE_TEMP']      = null; // $row_new_base[''];
        $row_cur_base['CLOSE_DENSITY']   = null; // $row_new_base[''];
        $row_cur_base['CLOSE_AMB_TOT']   = null; // $row_new_base[''];

        $row_cur_base['FREEZE_STD_TOT']  = $row_cur_base['CLOSE_STD_TOT'];
        $row_cur_base['FREEZE_MASS_TOT'] = $row_cur_base['CLOSE_MASS_TOT'];
        $row_cur_base['FREEZE_TEMP']     = $row_cur_base['CLOSE_TEMP'];
        $row_cur_base['FREEZE_DENSITY']  = $row_cur_base['CLOSE_DENSITY'];
        $row_cur_base['FREEZE_AMB_TOT']  = $row_cur_base['CLOSE_AMB_TOT'];

        if ($this->create_folio_base_tank($row_cur_base) == false) {
            return false;
        }

        oci_commit($this->conn);

        $error = new EchoSchema(200, response("__SAVE_SUCCEEDED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);

        return true;
    }

    /*
        closeout_nr: closeout,
        tank_terminal: value?.tank_terminal,
        tank_code: value?.tank_code,
        tank_basecode: base?.base_code,
        tank_basename: base?.base_name,
        tank_basecode_old: baseOld?.base_code,
        tank_basename_old: baseOld?.base_name,
        tank_density_old: oldDensity,
        tank_density_new: newDensity,
    */
    public function adjust_2row()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $cur_user = Utilities::getCurrPsn();

        // find if there is record in CLOSEOUT_TANK_BASES for current closeout_nr and tank
        $nrec = $this->count_folio_tank_bases($this->closeout_nr, $this->tank_terminal, $this->tank_code);

        if ($nrec > 0) {
            // it is not the 1st time change, get the last record of current closeout_nr and tank
            $row_prev_base = $this->get_last_folio_tank_base($this->closeout_nr, $this->tank_terminal, $this->tank_code);
            $row_prev_base['USER_CODE'] = $cur_user;
        } else {
            // copy the record from CLOSEOUT_TANK 
            // get the current record of current closeout_nr and tank from CLOSEOUT_TANK, 
            // need assign values to BASE_PERIOD_INDEX, BASE_PERIOD_OPEN, and BASE_PERIOD_CLOSE
            $row_prev_base = $this->get_first_folio_tank_base($this->closeout_nr, $this->tank_terminal, $this->tank_code);
            $row_prev_base['USER_CODE'] = $cur_user;
            // then insert this record to CLOSEOUT_TANK_BASES
            if ($this->create_folio_base_tank($row_prev_base) == false) {
                return false;
            }
        }

        $row_old_base = array();
        foreach($row_prev_base as $k => $v) {
            $row_old_base[$k] = $v;
        }
        $row_new_base = array();
        foreach($row_prev_base as $k => $v) {
            $row_new_base[$k] = $v;
        }
        $row_cur_base = array();
        foreach($row_prev_base as $k => $v) {
            $row_cur_base[$k] = $v;
        }

        /* , OPEN_STD_TOT                = :open_std_tot
        , OPEN_MASS_TOT               = :open_mass_tot
        , OPEN_TEMP                   = :open_temp
        , OPEN_DENSITY                = :open_density
        , OPEN_AMB_TOT                = :open_amb_tot
        
        , CLOSE_STD_TOT               = :close_std_tot
        , CLOSE_MASS_TOT              = :close_mass_tot
        , CLOSE_TEMP                  = :close_temp
        , CLOSE_DENSITY               = :close_density
        , CLOSE_AMB_TOT               = :close_amb_tot
        
        , FREEZE_STD_TOT              = :freeze_std_tot
        , FREEZE_MASS_TOT             = :freeze_mass_tot
        , FREEZE_TEMP                 = :freeze_temp
        , FREEZE_DENSITY              = :freeze_density
        , FREEZE_AMB_TOT              = :freeze_amb_tot */

        // close the old base
        // set the base code and name here in case the major opening record does not have the values
        $row_old_base['TANK_BASECODE']     = $this->tank_basecode_old;
        $row_old_base['TANK_BASENAME']     = $this->tank_basename_old;
        $row_old_base['OPEN_DENSITY']      = $this->tank_density_old;

        $row_old_base['CLOSE_STD_TOT']   = 0; // $row_old_base['OPEN_STD_TOT'];
        $row_old_base['CLOSE_MASS_TOT']  = 0; // $row_old_base['OPEN_MASS_TOT'];
        $row_old_base['CLOSE_TEMP']      = $row_old_base['OPEN_TEMP'];
        $row_old_base['CLOSE_DENSITY']   = $row_old_base['OPEN_DENSITY'];
        $row_old_base['CLOSE_AMB_TOT']   = 0; // $row_old_base['OPEN_AMB_TOT'];

        $row_old_base['FREEZE_STD_TOT']  = $row_old_base['CLOSE_STD_TOT'];
        $row_old_base['FREEZE_MASS_TOT'] = $row_old_base['CLOSE_MASS_TOT'];
        $row_old_base['FREEZE_TEMP']     = $row_old_base['CLOSE_TEMP'];
        $row_old_base['FREEZE_DENSITY']  = $row_old_base['CLOSE_DENSITY'];
        $row_old_base['FREEZE_AMB_TOT']  = $row_old_base['CLOSE_AMB_TOT'];

        if ($this->update_folio_base_tank($row_old_base) == false) {
            return false;
        } else {
            // get the closing time
            $row_prev_closed = $this->get_last_folio_tank_base($this->closeout_nr, $this->tank_terminal, $this->tank_code);
        }

        // open the new base, 
        $row_new_base['BASE_PERIOD_INDEX'] = $row_old_base['BASE_PERIOD_INDEX']+1;
        $row_new_base['TANK_BASECODE']     = $this->tank_basecode;
        $row_new_base['TANK_BASENAME']     = $this->tank_basename;
        $row_new_base['BASE_PERIOD_OPEN']  = $row_prev_closed['BASE_PERIOD_CLOSE'];
        $row_new_base['BASE_PERIOD_CLOSE'] = null;

        $row_new_base['OPEN_STD_TOT']    = $row_old_base['OPEN_STD_TOT'];
        $row_new_base['OPEN_MASS_TOT']   = $row_old_base['OPEN_MASS_TOT'];
        $row_new_base['OPEN_TEMP']       = $row_old_base['OPEN_TEMP'];
        $row_new_base['OPEN_DENSITY']    = $this->tank_density_new; // $row_old_base['OPEN_DENSITY'];
        $row_new_base['OPEN_AMB_TOT']    = $row_old_base['OPEN_AMB_TOT'];

        $row_new_base['CLOSE_STD_TOT']   = null; // $row_old_base['OPEN_STD_TOT'];
        $row_new_base['CLOSE_MASS_TOT']  = null; // $row_old_base['OPEN_MASS_TOT'];
        $row_new_base['CLOSE_TEMP']      = null; // $row_old_base['OPEN_TEMP'];
        $row_new_base['CLOSE_DENSITY']   = null; // $row_old_base['OPEN_DENSITY'];
        $row_new_base['CLOSE_AMB_TOT']   = null; // $row_old_base['OPEN_AMB_TOT'];

        $row_new_base['FREEZE_STD_TOT']  = $row_new_base['CLOSE_STD_TOT'];
        $row_new_base['FREEZE_MASS_TOT'] = $row_new_base['CLOSE_MASS_TOT'];
        $row_new_base['FREEZE_TEMP']     = $row_new_base['CLOSE_TEMP'];
        $row_new_base['FREEZE_DENSITY']  = $row_new_base['CLOSE_DENSITY'];
        $row_new_base['FREEZE_AMB_TOT']  = $row_new_base['CLOSE_AMB_TOT'];

        if ($this->create_folio_base_tank($row_new_base) == false) {
            return false;
        }

        oci_commit($this->conn);

        $error = new EchoSchema(200, response("__SAVE_SUCCEEDED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);

        return true;
    }

    /*
        closeout_nr: closeout,
        tank_terminal: value?.tank_terminal,
        tank_code: value?.tank_code,
        tank_basecode: base?.base_code,
        tank_basename: base?.base_name,
        tank_basecode_old: baseOld?.base_code,
        tank_basename_old: baseOld?.base_name,
        tank_density_old: oldDensity,
        tank_density_new: newDensity,
    */
    public function adjust_new()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $cur_user = Utilities::getCurrPsn();

        // find if there is record in CLOSEOUT_TANK_BASES for current closeout_nr and tank
        $nrec = $this->count_folio_tank_bases($this->closeout_nr, $this->tank_terminal, $this->tank_code);

        if ($nrec > 0) {
            // it is not the 1st time change, get the last record of current closeout_nr and tank
            $row_prev_base = $this->get_last_folio_tank_base($this->closeout_nr, $this->tank_terminal, $this->tank_code);
            $row_prev_base['USER_CODE'] = $cur_user;
        } else {
            // copy the record from CLOSEOUT_TANK 
            // get the current record of current closeout_nr and tank from CLOSEOUT_TANK, 
            // need assign values to BASE_PERIOD_INDEX, BASE_PERIOD_OPEN, and BASE_PERIOD_CLOSE
            $row_prev_base = $this->get_first_folio_tank_base($this->closeout_nr, $this->tank_terminal, $this->tank_code);
            $row_prev_base['USER_CODE'] = $cur_user;
            // then insert this record to CLOSEOUT_TANK_BASES
            if ($this->create_folio_base_tank($row_prev_base) == false) {
                return false;
            }
        }

        $row_old_base = array();
        foreach($row_prev_base as $k => $v) {
            $row_old_base[$k] = $v;
        }
        $row_cur_base = array();
        foreach($row_prev_base as $k => $v) {
            $row_cur_base[$k] = $v;
        }

        /* , OPEN_STD_TOT                = :open_std_tot
        , OPEN_MASS_TOT               = :open_mass_tot
        , OPEN_TEMP                   = :open_temp
        , OPEN_DENSITY                = :open_density
        , OPEN_AMB_TOT                = :open_amb_tot
        
        , CLOSE_STD_TOT               = :close_std_tot
        , CLOSE_MASS_TOT              = :close_mass_tot
        , CLOSE_TEMP                  = :close_temp
        , CLOSE_DENSITY               = :close_density
        , CLOSE_AMB_TOT               = :close_amb_tot
        
        , FREEZE_STD_TOT              = :freeze_std_tot
        , FREEZE_MASS_TOT             = :freeze_mass_tot
        , FREEZE_TEMP                 = :freeze_temp
        , FREEZE_DENSITY              = :freeze_density
        , FREEZE_AMB_TOT              = :freeze_amb_tot */

        // close the old base
        // set the base code and name here in case the major opening record does not have the values
        $row_old_base['TANK_BASECODE']     = $this->tank_basecode_old;
        $row_old_base['TANK_BASENAME']     = $this->tank_basename_old;
        $row_old_base['OPEN_DENSITY']      = $this->tank_density_old;

        $row_old_base['CLOSE_STD_TOT']   = $row_old_base['OPEN_STD_TOT'];
        $row_old_base['CLOSE_MASS_TOT']  = $row_old_base['OPEN_MASS_TOT'];
        $row_old_base['CLOSE_TEMP']      = $row_old_base['OPEN_TEMP'];
        $row_old_base['CLOSE_DENSITY']   = $row_old_base['OPEN_DENSITY'];
        $row_old_base['CLOSE_AMB_TOT']   = $row_old_base['OPEN_AMB_TOT'];

        $row_old_base['FREEZE_STD_TOT']  = $row_old_base['CLOSE_STD_TOT'];
        $row_old_base['FREEZE_MASS_TOT'] = $row_old_base['CLOSE_MASS_TOT'];
        $row_old_base['FREEZE_TEMP']     = $row_old_base['CLOSE_TEMP'];
        $row_old_base['FREEZE_DENSITY']  = $row_old_base['CLOSE_DENSITY'];
        $row_old_base['FREEZE_AMB_TOT']  = $row_old_base['CLOSE_AMB_TOT'];

        if ($this->update_folio_base_tank($row_old_base) == false) {
            return false;
        } else {
            // get the closing time
            $row_prev_closed = $this->get_last_folio_tank_base($this->closeout_nr, $this->tank_terminal, $this->tank_code);
        }

        // open the cur base, and leave it open
        $row_cur_base['BASE_PERIOD_INDEX'] = $row_old_base['BASE_PERIOD_INDEX']+1;
        $row_cur_base['TANK_BASECODE']     = $this->tank_basecode;
        $row_cur_base['TANK_BASENAME']     = $this->tank_basename;
        $row_cur_base['BASE_PERIOD_OPEN']  = $row_prev_closed['BASE_PERIOD_CLOSE'];
        $row_cur_base['BASE_PERIOD_CLOSE'] = null;

        $row_cur_base['OPEN_STD_TOT']    = $row_old_base['CLOSE_STD_TOT'];
        $row_cur_base['OPEN_MASS_TOT']   = $row_old_base['CLOSE_MASS_TOT'];
        $row_cur_base['OPEN_TEMP']       = $row_old_base['CLOSE_TEMP'];
        $row_cur_base['OPEN_DENSITY']    = $this->tank_density_new; // $row_old_base['CLOSE_DENSITY'];
        $row_cur_base['OPEN_AMB_TOT']    = $row_old_base['CLOSE_AMB_TOT'];

        $row_cur_base['CLOSE_STD_TOT']   = null;
        $row_cur_base['CLOSE_MASS_TOT']  = null;
        $row_cur_base['CLOSE_TEMP']      = null;
        $row_cur_base['CLOSE_DENSITY']   = null;
        $row_cur_base['CLOSE_AMB_TOT']   = null;

        $row_cur_base['FREEZE_STD_TOT']  = $row_cur_base['CLOSE_STD_TOT'];
        $row_cur_base['FREEZE_MASS_TOT'] = $row_cur_base['CLOSE_MASS_TOT'];
        $row_cur_base['FREEZE_TEMP']     = $row_cur_base['CLOSE_TEMP'];
        $row_cur_base['FREEZE_DENSITY']  = $row_cur_base['CLOSE_DENSITY'];
        $row_cur_base['FREEZE_AMB_TOT']  = $row_cur_base['CLOSE_AMB_TOT'];

        if ($this->create_folio_base_tank($row_cur_base) == false) {
            return false;
        }

        oci_commit($this->conn);

        $error = new EchoSchema(200, response("__SAVE_SUCCEEDED__"));
        echo json_encode($error, JSON_PRETTY_PRINT);

        return true;
    }
}
