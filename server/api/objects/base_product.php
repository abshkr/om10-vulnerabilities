<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';

class Base
{
    // database connection and table name
    private $conn;

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "AFC_ENABLED" => "Y",
    );

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

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
                BASE_NAME
            FROM BASE_PRODS
            ORDER BY BASE_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
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

        Utilities::sanitize($this);

        $query = "
            SELECT
                BP.BASE_CODE,
                BP.BASE_NAME,
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
                BP.BASE_REF_TEMP,
                BP.BASE_REF_TUNT,
                BP.BASE_LIMIT_PRESET_HT,
                BP.BASE_CORR_MTHD,
                BP.BASE_REF_TEMP_SPEC,
                BP.AFC_ENABLED,
                BP.AFC_PRIORITY,
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
                UNIT_SCALE_VW UV,
                COMPENSATION_MTHD CM,
                REF_TEMP_SPEC RTS
            WHERE
                ((SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL)
                    OR (SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y')
                    OR (SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL)
                )
                AND BP.BASE_CAT = BC.BCLASS_NO
                AND BP.BASE_PROD_GROUP = BG.PGR_CODE(+)
                AND BP.BASE_CODE = BT.TANK_BASE(+)
                AND BP.BASE_REF_TUNT = UV.UNIT_ID(+)
                AND BP.BASE_CORR_MTHD = CM.COMPENSATION_ID(+)
                AND BP.BASE_REF_TEMP_SPEC = RTS.REF_TEMP_SPEC_ID(+)";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function create()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        Utilities::sanitize($this);

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
                BASE_CODE)
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
        oci_bind_by_name($stmt, ':base_code', $this->base_code);

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
            oci_rollback($this->conn);
            return false;
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
        $jnl_data[1] = "Base product";
        $jnl_data[2] = $this->base_code;
        $jnl_data[3] = sprintf(
            "name:%s, group:%s", $this->base_name, $this->base_prod_group);

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
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        Utilities::sanitize($this);

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

        $query = "
            UPDATE BASE_PRODS
            SET BASE_COLOR = :base_color,
                BASE_NAME = :base_name,
                BASE_PROD_GROUP = :base_prod_group,
                BASE_CORR_MTHD = :base_corr_mthd,
                BASE_REF_TEMP = :base_ref_temp,
                BASE_DENS_HI = :base_dens_hi,
                BASE_DENS_LO = :base_dens_lo,
                BASE_CAT = :base_cat,
                BASE_REF_TUNT = :base_ref_tunt,
                BASE_LIMIT_PRESET_HT = :base_limit_preset_ht,
                BASE_REF_TEMP_SPEC = :base_ref_temp_spec,
                AFC_ENABLED = :afc_enabled,
                AFC_PRIORITY = :afc_priority
            WHERE BASE_CODE = :base_code";
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
        oci_bind_by_name($stmt, ':base_code', $this->base_code);
        oci_bind_by_name($stmt, ':afc_enabled', $this->afc_enabled);
        oci_bind_by_name($stmt, ':afc_priority', $this->afc_priority);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
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
        $jnl_data[1] = "Base product";
        $jnl_data[2] = $this->base_code;

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

        $module = "BASE_PRODS";
        $record = sprintf("code:%s", $this->base_code);

        if (!$journal->updateChanges($row, $row2, $module, $record)) {
            oci_rollback($this->conn);
            return false;
        }

        oci_commit($this->conn);
        return true;
    }

    public function delete()
    {
        write_log(sprintf("%s::%s() START. base_code:%s", __CLASS__, __FUNCTION__, $this->base_code),
            __FILE__, __LINE__);

        Utilities::sanitize($this);

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
            $e = oci_error($stmt)['message'];
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
        $jnl_data[1] = "Base product";
        $jnl_data[2] = $this->base_code;

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
}
