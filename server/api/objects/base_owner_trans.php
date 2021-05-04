<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/enum_service.php';
include_once 'common_class.php';

class BaseOwnerTrans extends CommonClass
{
    protected $TABLE_NAME = 'PRODOWNSHIP_TRANSACT';
    // protected $VIEW_NAME = 'PRODOWNSHIP_TRANSACT';
    protected $primary_keys = array("ownship_trsa_no");
    // protected $primary_keys = array("ownship_trsa_no", "base_prod_code", "supp_cmpy");
    // protected $view_keys = array("ownship_trsa_no", "base_prod_code", "supp_cmpy");


    public $NUMBER_FIELDS = array(
        "OWNSHIP_TRSA_NO",
        "QTY",
        "REASON",
        "TRSA_DENSITY",
        "TRSA_UNIT",
        "TRSA_QTY_OWNED",
        "TRSA_DENSITY_OWNED",
        "TRSA_QTY_OWNED_TO",
        "TRSA_DENSITY_OWNED_TO",
        "OWNSHIP_QTY",
        "OWNSHIP_DENSITY",
        "OWNSHIP_UNIT",
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "TRSA_APPROVED" => 1,
        "TRSA_REVERSED" => 1,
    );
    

    public function amount_types()
    {
        $enum_service = new EnumService($this->conn);
        return $enum_service->amount_types();
    }
    
    public function check_ownership_by_base()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM PRODOWNSHIP_TRANSACT
            WHERE BASE_PROD_CODE=:code 
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $this->base_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_ownership_by_cmpy()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM PRODOWNSHIP_TRANSACT
            WHERE SUPP_CMPY=:code 
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $this->cmpy_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_ownership_by_pkey()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM PRODOWNSHIP_TRANSACT
            WHERE 
                BASE_PROD_CODE=:base 
                and SUPP_CMPY=:cmpy 
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base', $this->base_code);
        oci_bind_by_name($stmt, ':cmpy', $this->cmpy_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read()
    {
        if (!isset($this->base_code)) {
            $this->base_code = "-1";
        }
        if (!isset($this->cmpy_code)) {
            $this->cmpy_code = "-1";
        }
        if (!isset($this->base_class)) {
            $this->base_class = -1;
        }

        $query = "
            select
                tra.OWNSHIP_TRSA_NO
                , tra.BASE_PROD_CODE
                , bpd.BASE_NAME
                , bpd.BASE_CAT
                , bpc.*
                , tra.SUPP_CMPY
                , cmp.CMPY_NAME
                , tra.QTY
                , tra.REASON
                , typ.MOVITEM_TYPE_NAME     REASON_TEXT
                , tra.TRSA_TIME
                , tra.TRSA_DENSITY
                , tra.TRSA_UNIT
                , unt.*
                , tra.TRSA_QTY_OWNED
                , tra.TRSA_DENSITY_OWNED
                , tra.SUPP_CMPY_TO
                , cmp2.CMPY_NAME            CMPY_NAME_TO
                , tra.TRSA_QTY_OWNED_TO
                , tra.TRSA_DENSITY_OWNED_TO
                , (NVL(tra.TRSA_QTY_OWNED,0) - NVL(tra.QTY,0))  as TRSA_QTY_AFTER
                , (NVL(tra.TRSA_QTY_OWNED_TO,0) + NVL(tra.QTY,0))  as TRSA_QTY_AFTER_TO
                , tra.TRSA_DENSITY as TRSA_DENSITY_AFTER
                , tra.TRSA_DENSITY as TRSA_DENSITY_AFTER_TO
                , tra.TRSA_COMMENTS
                , tra.TRSA_APPROVED
                , tra.TRSA_REVERSED
                , tra.TRSA_TIME_UPDATED
                , tra.TRSA_TIME_APPROVED
                , tra.TRSA_TIME_REVERSED
            from 
                PRODOWNSHIP_TRANSACT        tra
                , MOVITEM_TYPES             typ
                , BASE_PRODS                bpd
                , (
                    select
                        bcls.BCLASS_NO
                        , NVL(bctyp.BCLASS_NAME, bcls.BCLASS_DESC)			as BCLASS_DESC
                        , bcls.BCLASS_DENS_LO
                        , bcls.BCLASS_DENS_HI
                        , bcls.BCLASS_VCF_ALG
                        , bcls.BCLASS_TEMP_LO
                        , bcls.BCLASS_TEMP_HI
                    from
                        BASECLASS 			bcls
                        , BCLASS_TYP		bctyp
                    where
                        1=1
                        and bcls.BCLASS_NO = bctyp.BCLASS_ID(+)
                ) 					        bpc
                , UNIT_SCALE_VW             unt
                , GUI_COMPANYS              cmp
                , GUI_COMPANYS              cmp2
            where
                tra.REASON = typ.MOVITEM_TYPE_ID(+)
                and tra.BASE_PROD_CODE = bpd.BASE_CODE(+)
                and bpd.BASE_CAT = bpc.BCLASS_NO(+)
                and tra.TRSA_UNIT = unt.UNIT_ID(+)
                and tra.SUPP_CMPY = cmp.CMPY_CODE(+)
                and tra.SUPP_CMPY_TO = cmp2.CMPY_CODE(+)
        ";

        $query .= "
                and ('-1' = :base OR tra.BASE_PROD_CODE = :base)
                and ('-1' = :cmpy OR tra.SUPP_CMPY = :cmpy OR tra.SUPP_CMPY_TO = :cmpy)
                and (-1 = :catg OR bpd.BASE_CAT = :catg)
            ORDER BY tra.OWNSHIP_TRSA_NO, tra.BASE_PROD_CODE, tra.SUPP_CMPY, tra.SUPP_CMPY_TO
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base', $this->base_code);
        oci_bind_by_name($stmt, ':cmpy', $this->cmpy_code);
        oci_bind_by_name($stmt, ':catg', $this->base_class);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read2()
    {
        if (!isset($this->base_code)) {
            $this->base_code = "-1";
        }
        if (!isset($this->cmpy_code)) {
            $this->cmpy_code = "-1";
        }
        if (!isset($this->base_class)) {
            $this->base_class = -1;
        }

        $query = "
            select bot.*, bpd.*, bpc.*, cmp.*, unt.*
            from
                (
                    select
                        bro.OWNSHIP_NO
                        , bro.BASE_PROD_CODE
                        , bro.SUPP_CMPY
                        , bro.OWNSHIP_QTY
                        , bro.OWNSHIP_DENSITY
                        , bro.OWNSHIP_UNIT
                        , tra.OWNSHIP_TRSA_NO
                        , tra.QTY
                        , tra.TRSA_DENSITY
                        , tra.TRSA_UNIT
                        , tra.TRSA_QTY_OWNED
                        , tra.TRSA_DENSITY_OWNED
                        , tra.REASON
                        , typ.MOVITEM_TYPE_NAME     REASON_TEXT
                        , tra.TRSA_TIME
                        , (tra.TRSA_QTY_OWNED + tra.QTY * tra.REASON)  as TRSA_QTY_AFTER
                        , (tra.TRSA_QTY_OWNED * tra.TRSA_DENSITY_OWNED + tra.QTY * tra.REASON * tra.TRSA_DENSITY) 
                        / (tra.TRSA_QTY_OWNED + tra.QTY * tra.REASON) as TRSA_DENSITY_AFTER
                    from 
                        BASE_PROD_OWNSHIP           bro
                        , PRODOWNSHIP_TRANSACT      tra
                        , MOVITEM_TYPES             typ
                    where
                        bro.BASE_PROD_CODE = tra.BASE_PROD_CODE(+)
                        and bro.SUPP_CMPY = tra.SUPP_CMPY(+)
                        and tra.REASON = typ.MOVITEM_TYPE_ID(+)
                )   bot
                , BASE_PRODS        bpd
                , GUI_COMPANYS      cmp
                , (
                    select
                        bcls.BCLASS_NO
                        , NVL(bctyp.BCLASS_NAME, bcls.BCLASS_DESC)			as BCLASS_DESC
                        , bcls.BCLASS_DENS_LO
                        , bcls.BCLASS_DENS_HI
                        , bcls.BCLASS_VCF_ALG
                        , bcls.BCLASS_TEMP_LO
                        , bcls.BCLASS_TEMP_HI
                    from
                        BASECLASS 			bcls
                        , BCLASS_TYP		bctyp
                    where
                        1=1
                        and bcls.BCLASS_NO = bctyp.BCLASS_ID(+)
                ) 					bpc
                , UNIT_SCALE_VW     unt
            where
                bot.BASE_PROD_CODE = bpd.BASE_CODE(+)
                and bpd.BASE_CAT = bpc.BCLASS_NO(+)
                and bot.SUPP_CMPY = cmp.CMPY_CODE(+)
                and bot.TRSA_UNIT = unt.UNIT_ID(+)
                and bot.OWNSHIP_TRSA_NO is not NULL
        ";

        $query .= "
                and ('-1' = :base OR bot.BASE_PROD_CODE = :base)
                and ('-1' = :cmpy OR bot.SUPP_CMPY = :cmpy)
                and (-1 = :catg OR bpd.BASE_CAT = :catg)
            ORDER BY bot.OWNSHIP_TRSA_NO, bot.BASE_PROD_CODE, bot.SUPP_CMPY
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base', $this->base_code);
        oci_bind_by_name($stmt, ':cmpy', $this->cmpy_code);
        oci_bind_by_name($stmt, ':catg', $this->base_class);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_by_summary()
    {
        if (!isset($this->base_code)) {
            $this->base_code = "-1";
        }
        if (!isset($this->cmpy_code)) {
            $this->cmpy_code = "-1";
        }

        $query = "
            SELECT 
                BASE_CODE           AS BASE_PROD_CODE
                , BASE_NAME
                , CMPY_CODE         AS SUPP_CMPY
                , CMPY_NAME
                , SUM(OWNSHIP_QTY)  AS OWNSHIP_QTY
                , SUM(QTY)          AS QTY
            FROM (
                select bot.*, bpd.*, bpc.*, cmp.*, unt.*
                from
                    (
                        select
                            bro.OWNSHIP_NO
                            , bro.BASE_PROD_CODE
                            , bro.SUPP_CMPY
                            , bro.OWNSHIP_QTY
                            , bro.OWNSHIP_DENSITY
                            , bro.OWNSHIP_UNIT
                            , tra.OWNSHIP_TRSA_NO
                            , tra.QTY
                            , tra.TRSA_DENSITY
                            , tra.TRSA_UNIT
                            , tra.TRSA_QTY_OWNED
                            , tra.TRSA_DENSITY_OWNED
                            , tra.REASON
                            , tra.TRSA_TIME
                        from 
                            BASE_PROD_OWNSHIP           bro
                            , PRODOWNSHIP_TRANSACT      tra
                        where
                            bro.BASE_PROD_CODE = tra.BASE_PROD_CODE(+)
                            and bro.SUPP_CMPY = tra.SUPP_CMPY(+)
                    )   bot
                    , BASE_PRODS        bpd
                    , GUI_COMPANYS      cmp
                    , (
                        select
                            bcls.BCLASS_NO
                            , NVL(bctyp.BCLASS_NAME, bcls.BCLASS_DESC)			as BCLASS_DESC
                            , bcls.BCLASS_DENS_LO
                            , bcls.BCLASS_DENS_HI
                            , bcls.BCLASS_VCF_ALG
                            , bcls.BCLASS_TEMP_LO
                            , bcls.BCLASS_TEMP_HI
                        from
                            BASECLASS 			bcls
                            , BCLASS_TYP		bctyp
                        where
                            1=1
                            and bcls.BCLASS_NO = bctyp.BCLASS_ID(+)
                    ) 					bpc
                    , UNIT_SCALE_VW     unt
                where
                    bot.BASE_PROD_CODE = bpd.BASE_CODE(+)
                    and bpd.BASE_CAT = bpc.BCLASS_NO(+)
                    and bot.SUPP_CMPY = cmp.CMPY_CODE(+)
                    and bot.TRSA_UNIT = unt.UNIT_ID(+)
                    and bot.OWNSHIP_TRSA_NO is not NULL
            )
            WHERE 
                1 = 1
                AND ('-1' = :base OR BASE_CODE = :base)
                AND ('-1' = :cmpy OR CMPY_CODE = :cmpy)
            GROUP BY BASE_CODE, BASE_NAME, CMPY_CODE, CMPY_NAME
            ORDER BY BASE_CODE, BASE_NAME, CMPY_CODE, CMPY_NAME
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base', $this->base_code);
        oci_bind_by_name($stmt, ':cmpy', $this->cmpy_code);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_base_summary()
    {
        if (!isset($this->base_code)) {
            $this->base_code = "-1";
        }

        $query = "
            SELECT 
                TANK_BASE,
                SUM(TANK_COR_VOL) AS TANK_COR_VOL,
                SUM(TANK_LIQUID_KG) AS TANK_LIQUID_KG2,
                SUM(TANK_COR_VOL*TANK_DENSITY/1000.0) AS TANK_LIQUID_KG,
                NVL(SUM(TANK_COR_VOL*TANK_15_DENSITY/1000.0), 0) AS TANK_LIQUID_KG15
            FROM TANKS
            WHERE 
                1 = 1
                AND ('-1' = :base OR TANK_BASE = :base)
            GROUP BY TANK_BASE
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base', $this->base_code);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function pre_create()
    {
        // get the next sequence ID from PRODOWNSHIP_TRANSACT_SEQ
        $this->ownship_trsa_no = 1;

        $query = "
            SELECT PRODOWNSHIP_TRANSACT_SEQ.NEXTVAL ID FROM DUAL
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $this->ownship_trsa_no = $row['ID'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

/*
    protected function get_percentages()
    {
        $query = "
            SELECT * 
            FROM PRODOWNSHIP_TRANSACT
            WHERE 
                TKLINK_TANKCODE=:tank 
                and TKLINK_TANKDEPO=:term 
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':tank', $this->tklink_tankcode);
        oci_bind_by_name($stmt, ':term', $this->tklink_tankdepo);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $percentages = array();
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $percentages[$row['TKCMPY_LINK']] = $row['TKO_PERCENTAGE'];
        }

        return $percentages;
    }

    protected function journal_percentages($old, $new)
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
            
        $journal = new Journal($this->conn, false);
        $module = $this->TABLE_NAME;
        foreach ($old as $item_key => $item_value) {
            // write_log($item_key, __FILE__, __LINE__);
            // write_log($value, __FILE__, __LINE__);
            // the change of current owner was journaled already in create, update, or delete
            // if (isset($new[$item_key])) {
            if (isset($new[$item_key]) && $item_key != $this->tkcmpy_link) {
                $old_value = number_format($item_value, 4, '.', '');
                $new_value = number_format($new[$item_key], 4, '.', '');
                if ($old_value != $new_value) {
                    $record = sprintf("tklink_tankcode:%s, tklink_tankdepo:%s, tkcmpy_link:%s", 
                        $this->tklink_tankcode, $this->tklink_tankdepo, $item_key);
                    $journal->valueChange($module, $record, 'TKO_PERCENTAGE', $old_value, $new_value);
                }
            } 
        }
    }

    public function update_percentages()
    {
        $old = $this->get_percentages();

        $query = "
            update PRODOWNSHIP_TRANSACT A 
            set A.TKO_PERCENTAGE = TRUNC(100 * A.TKOWNER_QTY / (
                select sum(B.TKOWNER_QTY) 
                from PRODOWNSHIP_TRANSACT B 
                where B.TKLINK_TANKDEPO=:term and B.TKLINK_TANKCODE=:code
            ), 4)
            where A.TKLINK_TANKDEPO=:term and A.TKLINK_TANKCODE=:code
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $this->tklink_tankcode);
        oci_bind_by_name($stmt, ':term', $this->tklink_tankdepo);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        $new = $this->get_percentages();
        $this->journal_percentages($old, $new);

        return true;
    }

    protected function post_create()
    {
        // return true;
        return $this->update_percentages();
    }

    protected function post_update()
    {
        // return true;
        return $this->update_percentages();
    }

    protected function post_delete()
    {
        // return true;
        return $this->update_percentages();
    }
*/
}
