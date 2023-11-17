<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

class BaseProduct extends CommonClass
{
    protected $TABLE_NAME = 'BASE_PRODS';

    public $desc = "base product";

    protected $primary_keys = array("base_code");

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "AFC_ENABLED" => "Y",
        "BASE_MANUAL" => "Y",
        "BASE_ADTV" => 1,
        "BASE_LIMIT_PRESET_HT" => 1
    );

    //Give a simple list of base product
    public function simple_list()
    {
        // if (!isset($this->end_num)) {
        //     $this->start_num = 1;
        //     $this->end_num = $this->count();
        // }

        Utilities::sanitize($this);

        $query = "
            SELECT BASE_CODE,
                BASE_NAME,
                BASE_CODE||' - '||BASE_NAME AS BASE_DESC
            FROM BASE_PRODS
            ORDER BY BASE_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function corr_mthds()
    {
        $serv = new EnumService($this->conn);
        return $serv->corr_mthds();
    }

    public function stock_units()
    {
        $serv = new EnumService($this->conn);
        return $serv->stock_units();
    }

    //Because base cannot be too many, do not do limit
    //Old sample from amf BaseProductService.php::getPaged():
    // "base_code":"TEST","base_name":"TESTNAME","base_prod_group":"COMPLIES","base_group_name":"Subject to Fuel Standard with Compliance","base_cat":"1","base_class_desc":"Jet Fuels\/Kerosines","base_rpt_tunt":null,"base_rpt_temp":null,"base_dens_lo":"789.5195","base_dens_hi":"811.3127","base_color":"#40FE76","base_adtv":"0","base_text":"TEST - TESTNAME","base_desc":"TEST - TESTNAME (Jet Fuels\/Kerosines) ","base_class_dens_lo":"787.5195","base_class_dens_hi":"838.3127","base_class_vcf_alg":"2","base_class_temp_lo":"-50","base_class_temp_hi":"150","base_tank_count":null,"base_tank_list":null,"base_ref_temp":"15","base_ref_tunt":"0","base_limit_preset_ht":"0","base_corr_mthd":"0","base_ref_temp_spec":"1","base_ref_tunt_name":"C","base_corr_mthd_name":"UNSPECIFIED","base_ref_temp_spec_name":"COMPENSTN_PT","rn":"32"
    public function read()
    {
        // if (!isset($this->end_num)) {
        //     $this->start_num = 1;
        //     $this->end_num = $this->count();
        // }

        $query = "
            SELECT
                BP.BASE_CODE,
                BP.BASE_NAME,
                BP.BASE_REF_CODE,
                BP.BASE_MANUAL,
                BP.BASE_PIDX_CODE,
                DECODE(BP.BASE_PROD_GROUP, 'NULL', '', BP.BASE_PROD_GROUP) AS BASE_PROD_GROUP,
                BG.PGR_DESCRIPTION AS BASE_GROUP_NAME,
                BP.BASE_CAT,
                BC.BCLASS_DESC AS BASE_CLASS_DESC,
                BP.BASE_RPT_TUNT,
                BP.BASE_RPT_TEMP,
                BP.BASE_DENS_LO,
                BP.BASE_DENS_HI,
                BP.BASE_COLOR,
                DECODE(BP.BASE_CAT, 6, 1, 0) AS BASE_ADTV,
                BP.BASE_CODE||' - '||BP.BASE_NAME AS BASE_TEXT,
                BP.BASE_CODE||' - '||BP.BASE_NAME||' ('||BC.BCLASS_DESC||') ' AS BASE_DESC,
                BC.BCLASS_DENS_LO AS BASE_CLASS_DENS_LO,
                BC.BCLASS_DENS_HI AS BASE_CLASS_DENS_HI,
                BC.BCLASS_VCF_ALG AS BASE_CLASS_VCF_ALG,
                BC.BCLASS_TEMP_LO AS BASE_CLASS_TEMP_LO,
                BC.BCLASS_TEMP_HI AS BASE_CLASS_TEMP_HI,
                BT.BASE_TANK_COUNT AS BASE_TANK_COUNT,
                BT.BASE_TANK_LIST AS BASE_TANK_LIST,
                BP.BASE_PUB_DENS_STD,
                BP.BASE_PRORATE_DENS,
                BP.BASE_REF_TEMP,
                BP.BASE_REF_TUNT,
                BP.BASE_LIMIT_PRESET_HT,
                BP.BASE_CORR_MTHD,
                BP.BASE_REF_TEMP_SPEC,
                BP.AFC_ENABLED,
                BP.AFC_PRIORITY,
                BP.BASE_STOCK_UNIT,
                SUV.STOCK_UNIT_CODE AS BASE_STOCK_UNIT_CODE,
                SUV.STOCK_UNIT_NAME AS BASE_STOCK_UNIT_NAME,
                BP.BASE_GAINLOSS_UNIT,
                GLUV.STOCK_UNIT_CODE AS BASE_GAINLOSS_UNIT_CODE,
                GLUV.STOCK_UNIT_NAME AS BASE_GAINLOSS_UNIT_NAME,
                UV.DESCRIPTION AS BASE_REF_TUNT_NAME,
                CM.COMPENSATION_NAME AS BASE_CORR_MTHD_NAME,
                RTS.REF_TEMP_SPEC_NAME AS BASE_REF_TEMP_SPEC_NAME
            FROM
                BASE_PRODS BP,
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
                ) BC,
                PRODUCT_GROUP BG,
                (
                SELECT
                    TANKS.TANK_BASE,
                    COUNT(TANKS.TANK_CODE) AS BASE_TANK_COUNT,
                    LISTAGG(TANKS.TANK_CODE, ', ') WITHIN GROUP (ORDER BY TANKS.TANK_CODE) AS BASE_TANK_LIST
                FROM TANKS
                GROUP BY TANKS.TANK_BASE
                ) BT,
                STOCK_UNIT_VW SUV,
                STOCK_UNIT_VW GLUV,
                UNIT_SCALE_VW UV,
                COMPENSATION_MTHD CM,
                REF_TEMP_SPEC RTS
            WHERE
                ((SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL)
                    OR (SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y')
                    OR (SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL)
                )
                AND BP.BASE_CAT = BC.BCLASS_NO(+)
                AND BP.BASE_PROD_GROUP = BG.PGR_CODE(+)
                AND BP.BASE_CODE = BT.TANK_BASE(+)
                AND BP.BASE_STOCK_UNIT = SUV.STOCK_UNIT_ID(+)
                AND BP.BASE_GAINLOSS_UNIT = GLUV.STOCK_UNIT_ID(+)
                AND BP.BASE_REF_TUNT = UV.UNIT_ID(+)
                AND BP.BASE_CORR_MTHD = CM.COMPENSATION_ID(+)
                AND BP.BASE_REF_TEMP_SPEC = RTS.REF_TEMP_SPEC_ID(+)
        ";
        if (isset($this->base_code)) {
            $query .= "AND BP.BASE_CODE=:base_code";
        }
        $stmt = oci_parse($this->conn, $query);
        if (isset($this->base_code)) {
            oci_bind_by_name($stmt, ':base_code', $this->base_code);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function create()
    {
        $query = "
            INSERT INTO BASE_PRODS (
                BASE_COLOR,
                BASE_NAME,
                BASE_PROD_GROUP,
                BASE_CORR_MTHD,
                BASE_REF_TEMP,
                BASE_DENS_HI,
                BASE_DENS_LO,
                BASE_CAT,
                BASE_REF_TUNT,
                BASE_LIMIT_PRESET_HT,
                BASE_REF_TEMP_SPEC,
                AFC_ENABLED,
                AFC_PRIORITY,
                BASE_STOCK_UNIT,
                BASE_GAINLOSS_UNIT,
                BASE_PIDX_CODE,
                BASE_REF_CODE,
                BASE_MANUAL,
                BASE_CODE
            )
            VALUES (
                :base_color,
                :base_name,
                :base_prod_group,
                :base_corr_mthd,
                :base_ref_temp,
                :base_dens_hi,
                :base_dens_lo,
                :base_cat,
                :base_ref_tunt,
                :base_limit_preset_ht,
                :base_ref_temp_spec,
                :afc_enabled,
                :afc_priority,
                :base_stock_unit,
                :base_gainloss_unit,
                :base_pidx_code,
                :base_ref_code,
                :base_manual,
                :base_code
            )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base_color', $this->base_color);
        oci_bind_by_name($stmt, ':base_name', $this->base_name);
        oci_bind_by_name($stmt, ':base_prod_group', $this->base_prod_group);
        oci_bind_by_name($stmt, ':base_corr_mthd', $this->base_corr_mthd);
        oci_bind_by_name($stmt, ':base_ref_temp', $this->base_ref_temp);
        oci_bind_by_name($stmt, ':base_dens_hi', $this->base_dens_hi);
        oci_bind_by_name($stmt, ':base_dens_lo', $this->base_dens_lo);
        oci_bind_by_name($stmt, ':base_cat', $this->base_cat);
        oci_bind_by_name($stmt, ':base_ref_tunt', $this->base_ref_tunt);
        oci_bind_by_name($stmt, ':base_limit_preset_ht', $this->base_limit_preset_ht);
        oci_bind_by_name($stmt, ':base_ref_temp_spec', $this->base_ref_temp_spec);
        oci_bind_by_name($stmt, ':afc_enabled', $this->afc_enabled);
        oci_bind_by_name($stmt, ':afc_priority', $this->afc_priority);
        oci_bind_by_name($stmt, ':base_stock_unit', $this->base_stock_unit);
        oci_bind_by_name($stmt, ':base_gainloss_unit', $this->base_gainloss_unit);
        oci_bind_by_name($stmt, ':base_code', $this->base_code);
        oci_bind_by_name($stmt, ':base_pidx_code', $this->base_pidx_code);
        oci_bind_by_name($stmt, ':base_ref_code', $this->base_ref_code);
        oci_bind_by_name($stmt, ':base_manual', $this->base_manual);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            INSERT INTO GENERIC_PROD (GEN_PROD_CODE)
            VALUES (:base_code)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base_code', $this->base_code);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            // oci_rollback($this->conn);
            // return false;
        }

        $query = "
            INSERT INTO PRODUCTS (
                PROD_CODE,
                PROD_NAME,
                PROD_CMPY,
                PROD_CLASS)
            VALUES(
                :base_code,
                :base_name,
                'BaSePrOd',
                :base_code
            )";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base_code', $this->base_code);
        oci_bind_by_name($stmt, ':base_name', $this->base_name);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            INSERT INTO RATIOS (
                RATIO_BASE,
                RATIO_VALUE,
                RAT_PROD_PRODCMPY,
                RAT_PROD_PRODCODE)
            VALUES(
                :base_code,
                '1',
                'BaSePrOd',
                :base_code)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base_code', $this->base_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->TABLE_NAME; // "BASE_PRODS";
        $jnl_data[2] = sprintf("base_code:%s", $this->base_code); // $this->base_code;
        $jnl_data[3] = sprintf(
            "base_name:%s, base_prod_group:%s", $this->base_name, $this->base_prod_group);

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
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
            SELECT *
            FROM BASE_PRODS
            WHERE BASE_CODE = :base_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base_code', $this->base_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $stmt = $this->prepare_update($stmt);
        if (!$stmt) {
            return false;
        } else if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            UPDATE PRODUCTS
            SET PROD_NAME = :base_name
            WHERE PROD_CODE = :base_code AND PROD_CMPY = 'BaSePrOd'";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base_name', $this->base_name);
        oci_bind_by_name($stmt, ':base_code', $this->base_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->TABLE_NAME; // "BASE_PRODS";
        $jnl_data[2] = sprintf("base_code:%s", $this->base_code); // $this->base_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            SELECT *
            FROM BASE_PRODS
            WHERE BASE_CODE = :base_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base_code', $this->base_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row2 = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $module = $this->TABLE_NAME; // "BASE_PRODS";
        $record = sprintf("base_code:%s", $this->base_code);
        if (!$journal->updateChanges($row, $row2, $module, $record)) {
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    public function update_color()
    {
        $query = "
            SELECT BASE_CODE, BASE_COLOR
            FROM BASE_PRODS
            WHERE BASE_CODE = :base_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base_code', $this->base_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $query = "
            UPDATE BASE_PRODS
            SET BASE_COLOR = :base_color
            WHERE BASE_CODE = :base_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base_color', $this->base_color);
        oci_bind_by_name($stmt, ':base_code', $this->base_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->TABLE_NAME; // "BASE_PRODS";
        $jnl_data[2] = sprintf("base_code:%s", $this->base_code); // $this->base_code;

        if (!$journal->jnlLogEvent(
            Lookup::RECORD_ALTERED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            SELECT BASE_CODE, BASE_COLOR
            FROM BASE_PRODS
            WHERE BASE_CODE = :base_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base_code', $this->base_code);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row2 = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        }

        $module = $this->TABLE_NAME; // "BASE_PRODS";
        $record = sprintf("base_code:%s", $this->base_code);
        if (!$journal->updateChanges($row, $row2, $module, $record)) {
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    public function delete()
    {
        $query = "
            DELETE FROM RATIOS
            WHERE RATIO_BASE = :base_code
                AND RAT_PROD_PRODCMPY = 'BaSePrOd'";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base_code', $this->base_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $query = "
            DELETE FROM PRODUCTS
            WHERE PROD_CODE = :base_code AND PROD_CMPY='BaSePrOd'";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base_code', $this->base_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        // $query = "
        //     DELETE FROM GENERIC_PROD WHERE GEN_PROD_CODE = :base_code";
        // $stmt = oci_parse($this->conn, $query);
        // oci_bind_by_name($stmt, ':base_code', $this->base_code);
        // if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
        //     $e = oci_error($stmt);
        //     write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        //     oci_rollback($this->conn);
        //     return false;
        // }

        $query = "
            DELETE FROM BASE_PRODS WHERE BASE_CODE = :base_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base_code', $this->base_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $query = "
            UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        $journal = new Journal($this->conn, false);
        $curr_psn = Utilities::getCurrPsn();
        $jnl_data[0] = $curr_psn;
        $jnl_data[1] = $this->TABLE_NAME; // "BASE_PRODS";
        $jnl_data[2] = sprintf("base_code:%s", $this->base_code); // $this->base_code;

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

    /*
        The child tables and columns which refers to BASE_PRODS
        BAM_PRODUCT             2	BAP_BASEPROD	
        BASE_PROD_OWNSHIP       2	BASE_PROD_CODE	
        BASE_TRANSLATE          2	BASE_TRANS_CODE	
        BA_METERS               18	BAM_BASE_PROD	
        BL_HISTORY              7	BL_PRODUCT	    
        DELV_PUBDATA            2	BASE_CODE	    
        INVPROD_BASE            4	IPB_BASE_PROD	
        MOV_LOAD_ITEMS          15	MLITM_BASECODE	
        MOV_TRSF_ITEMS          15	MTITM_BASECODE	
        O_CLOSEOUT              3	OC_BASEPROD	    
        PRODOWNSHIP_TRANSACT    2	BASE_PROD_CODE	
        PRODUCT_MVMNTS          7	PMV_PRDCTLNK	
        PRODUCT_SWAP            11	PRDS_BASE_CODE	
        RATIOS                  1	RATIO_BASE	    
        TANKS                   1	TANK_BASE	    
        TRANBASE                3	TRSB_BS	        
        TRANSFERS               15	TRSF_BASE_P	    
    */

    // check if the base product has been used by drawer product ratios
    //  RATIOS                  1	RATIO_BASE
    // note: need exclude the default drawer product belongs to default supplier BaSePrOd
    public function check_base_ratios()
    {
        $query = "
            SELECT COUNT(*) AS CNT FROM RATIOS WHERE RATIO_BASE=:base_code and RAT_PROD_PRODCMPY!='BaSePrOd'
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base_code', $this->base_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // check if the base product has been used by tanks
    //  TANKS                   1	TANK_BASE
    public function check_base_tanks()
    {
        $query = "
            SELECT COUNT(*) AS CNT FROM TANKS WHERE TANK_BASE=:base_code
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base_code', $this->base_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // check if the base product has been used by tranbases
    //  TRANBASE                3	TRSB_BS
    public function check_base_trans()
    {
        $query = "
            SELECT COUNT(*) AS CNT FROM TRANBASE WHERE TRSB_BS=:base_code
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base_code', $this->base_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
