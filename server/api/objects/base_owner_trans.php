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
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND OWNSHIP_TERMINAL = :term_code ";
        }
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM PRODOWNSHIP_TRANSACT
            WHERE BASE_PROD_CODE=:code 
            $terminal_condition
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $this->base_code);
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            oci_bind_by_name($stmt, ':term_code', $this->terminal);
        }
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
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND OWNSHIP_TERMINAL = :term_code ";
        }
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM PRODOWNSHIP_TRANSACT
            WHERE SUPP_CMPY=:code 
            $terminal_condition
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $this->cmpy_code);
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            oci_bind_by_name($stmt, ':term_code', $this->terminal);
        }
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
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND OWNSHIP_TERMINAL = :term_code ";
        }
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM PRODOWNSHIP_TRANSACT
            WHERE 
                BASE_PROD_CODE=:base 
                and SUPP_CMPY=:cmpy 
                $terminal_condition
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base', $this->base_code);
        oci_bind_by_name($stmt, ':cmpy', $this->cmpy_code);
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            oci_bind_by_name($stmt, ':term_code', $this->terminal);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function check_ownership_by_ukey()
    {
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND OWNSHIP_TERMINAL = :term_code ";
        }
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM PRODOWNSHIP_TRANSACT
            WHERE TRSA_KEY=:trsa_key
            $terminal_condition
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':trsa_key', $this->trsa_key);
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            oci_bind_by_name($stmt, ':term_code', $this->terminal);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function direct_report()
    {
        write_log(json_encode($this), __FILE__, __LINE__);

        if (isset($_SERVER["BIN"])) {
            $bin = $_SERVER["BIN"];
        } else {
            $bin = "/usr/omega/bin";
        }

        if (!isset($this->report)) {
            $this->report = 'LHC_CPO';
        }

        //Sample: ./JReport.sh /usr/omega/bin/jasper/Carr_Loadings.jasper /var/www/htdocs/reports/1636338933ANYcarr_loadings_e.pdf pdf CARRIER_CODE:%START_DATE:2021-10-24 13:28:28END_DATE:2021-11-08 13:28:28
        $jasper_file = $bin . "/jasper/" . $this->report . ".jasper";
        if (!file_exists($jasper_file)) {
            write_log(sprintf("jasper file %s does not exist", $jasper_file), __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__JASPER_FILE_NOT_EXIST__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $output_file = $_SERVER['DOCUMENT_ROOT'] . "/reports/" . $this->report . ".pdf";
        $jreport_cmd = $bin . "/JReport.sh " . $jasper_file . " " . $output_file . " pdf OWNSHIP_TRSA_NO:" . $this->ownship_trsa_no;
        
        write_log(sprintf("to run %s", $jreport_cmd), __FILE__, __LINE__, LogLevel::INFO);
        foreach ($_SERVER as $env_key => $env_value) {
            putenv("$env_key=$env_value");
        }
        $output = shell_exec($jreport_cmd);
        // write_log(sprintf("result %s", $output), __FILE__, __LINE__, LogLevel::INFO);
        if (strpos($output, "Created file")) {
            $jasper_result = array(
                'result' => $array['result'],
                'filepath' => 'reports/' . $this->report . '.pdf');
            echo json_encode($jasper_result, JSON_PRETTY_PRINT);
        } else {
            write_log("Jasper report creation failed. output: " . $output, __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
        }
    }

    public function read()
    {
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND tra.OWNSHIP_TERMINAL = :term_code ";
        }
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
                , tra.OWNSHIP_TERMINAL
                , tra.TRSA_KEY
                , tra.TRSA_NUMBER
                , tra.BASE_PROD_CODE
                , bpd.BASE_NAME
                , bpd.BASE_CAT
                , bpc.*
                , tra.SUPP_CMPY
                , cmp.CMPY_NAME
                , tra.QTY
                , tra.REASON
                , otr.OTR_TEXT     REASON_TEXT
                , tra.TRSA_TIME
                , tra.TRSA_DENSITY
                , tra.TRSA_UNIT
                , unt.*
                , tra.TRSA_TERMINAL
                , tra.TRSA_TERMINAL_TO
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
                , tra.OWNSHIP_TERMINAL || ' - ' || trm.TERM_NAME   AS OWNSHIP_SITEDESC
                , tra.TRSA_TERMINAL || ' - ' || trm2.TERM_NAME     AS TRSA_SITEDESC
                , tra.TRSA_TERMINAL_TO || ' - ' || trm3.TERM_NAME  AS TRSA_SITEDESC_TO
            from 
                PRODOWNSHIP_TRANSACT        tra
                , OWNER_TRSA_REASONS        otr
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
                , TERMINAL                  trm
                , TERMINAL                  trm2
                , TERMINAL                  trm3
            where
                tra.REASON = otr.OTR_ID(+)
                and tra.BASE_PROD_CODE = bpd.BASE_CODE(+)
                and bpd.BASE_CAT = bpc.BCLASS_NO(+)
                and tra.TRSA_UNIT = unt.UNIT_ID(+)
                and tra.SUPP_CMPY = cmp.CMPY_CODE(+)
                and tra.SUPP_CMPY_TO = cmp2.CMPY_CODE(+)
                and tra.OWNSHIP_TERMINAL = trm.TERM_CODE(+)
                and tra.TRSA_TERMINAL = trm2.TERM_CODE(+)
                and tra.TRSA_TERMINAL_TO = trm3.TERM_CODE(+)
        ";

        $query .= "
                and ('-1' = :base OR tra.BASE_PROD_CODE = :base)
                and ('-1' = :cmpy OR tra.SUPP_CMPY = :cmpy OR tra.SUPP_CMPY_TO = :cmpy)
                and (-1 = :catg OR bpd.BASE_CAT = :catg)
                $terminal_condition
            ORDER BY tra.OWNSHIP_TERMINAL, tra.OWNSHIP_TRSA_NO, tra.BASE_PROD_CODE, tra.SUPP_CMPY, tra.SUPP_CMPY_TO
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base', $this->base_code);
        oci_bind_by_name($stmt, ':cmpy', $this->cmpy_code);
        oci_bind_by_name($stmt, ':catg', $this->base_class);
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            oci_bind_by_name($stmt, ':term_code', $this->terminal);
        }

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
                        , tra.TRSA_KEY
                        , tra.TRSA_NUMBER
                        , tra.QTY
                        , tra.TRSA_DENSITY
                        , tra.TRSA_UNIT
                        , tra.TRSA_QTY_OWNED
                        , tra.TRSA_DENSITY_OWNED
                        , tra.REASON
                        , otr.OTR_TEXT     REASON_TEXT
                        , tra.TRSA_TIME
                        , (tra.TRSA_QTY_OWNED + tra.QTY * tra.REASON)  as TRSA_QTY_AFTER
                        , (tra.TRSA_QTY_OWNED * tra.TRSA_DENSITY_OWNED + tra.QTY * tra.REASON * tra.TRSA_DENSITY) 
                        / (tra.TRSA_QTY_OWNED + tra.QTY * tra.REASON) as TRSA_DENSITY_AFTER
                    from 
                        BASE_PROD_OWNSHIP           bro
                        , PRODOWNSHIP_TRANSACT      tra
                        , OWNER_TRSA_REASONS        otr
                    where
                        bro.BASE_PROD_CODE = tra.BASE_PROD_CODE(+)
                        and bro.SUPP_CMPY = tra.SUPP_CMPY(+)
                        and tra.REASON = otr.OTR_ID(+)
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
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND OWNSHIP_TERMINAL = :term_code ";
        }
        if (!isset($this->base_code)) {
            $this->base_code = "-1";
        }
        if (!isset($this->cmpy_code)) {
            $this->cmpy_code = "-1";
        }

        $query = "
            SELECT 
                OWNSHIP_TERMINAL
                , OWNSHIP_SITEDESC
                , BASE_CODE         AS BASE_PROD_CODE
                , BASE_NAME
                , CMPY_CODE         AS SUPP_CMPY
                , CMPY_NAME
                , SUM(OWNSHIP_QTY)  AS OWNSHIP_QTY
                , SUM(QTY)          AS QTY
            FROM (
                select bot.*, bpd.*, bpc.*, cmp.*, unt.*
                    , bot.OWNSHIP_TERMINAL || ' - ' || trm.TERM_NAME   AS OWNSHIP_SITEDESC
                from
                    (
                        select
                            bro.OWNSHIP_NO
                            , bro.OWNSHIP_TERMINAL
                            , bro.BASE_PROD_CODE
                            , bro.SUPP_CMPY
                            , bro.OWNSHIP_QTY
                            , bro.OWNSHIP_DENSITY
                            , bro.OWNSHIP_UNIT
                            , tra.OWNSHIP_TRSA_NO
                            , tra.TRSA_KEY
                            , tra.TRSA_NUMBER
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
                            and bro.OWNSHIP_TERMINAL = tra.OWNSHIP_TERMINAL(+)
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
                    , TERMINAL          trm
                where
                    bot.BASE_PROD_CODE = bpd.BASE_CODE(+)
                    and bpd.BASE_CAT = bpc.BCLASS_NO(+)
                    and bot.SUPP_CMPY = cmp.CMPY_CODE(+)
                    and bot.TRSA_UNIT = unt.UNIT_ID(+)
                    and bot.OWNSHIP_TRSA_NO is not NULL
                    and bot.OWNSHIP_TERMINAL = trm.TERM_CODE(+)
            )
            WHERE 
                1 = 1
                AND ('-1' = :base OR BASE_CODE = :base)
                AND ('-1' = :cmpy OR CMPY_CODE = :cmpy)
                $terminal_condition
            GROUP BY OWNSHIP_TERMINAL, OWNSHIP_SITEDESC, BASE_CODE, BASE_NAME, CMPY_CODE, CMPY_NAME
            ORDER BY OWNSHIP_TERMINAL, OWNSHIP_SITEDESC, BASE_CODE, BASE_NAME, CMPY_CODE, CMPY_NAME
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base', $this->base_code);
        oci_bind_by_name($stmt, ':cmpy', $this->cmpy_code);
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            oci_bind_by_name($stmt, ':term_code', $this->terminal);
        }

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // get qunatities from tank closeout for the prorate density
    public function get_base_summary()
    {
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND TANK_TERMINAL = :term_code ";
        }
        if (!isset($this->base_code)) {
            $this->base_code = "-1";
        }

        $query = "
            SELECT 
                TANK_TERMINAL,
                TANK_BASE,
                SUM(TANK_COR_VOL)                                   AS TANK_COR_VOL,
                SUM(TANK_LIQUID_KG)                                 AS TANK_LIQUID_KG2,
                SUM(TANK_COR_VOL*TANK_DENSITY/1000.0)               AS TANK_LIQUID_KG,
                SUM(TANK_DENSITY)                                   AS TANK_DENS,
                COUNT(TANK_CODE)                                    AS TANK_COUNT,
                NVL(SUM(TANK_COR_VOL*TANK_15_DENSITY/1000.0), 0)    AS TANK_LIQUID_KG15
            FROM  (
              select 
                CS.CLOSEOUT_NR
                , CT.TANK_CODE
                , CT.TANK_TERMINAL
                , TK.TANK_BASE
                , CT.OPEN_STD_TOT    AS TANK_COR_VOL
                , CT.OPEN_DENSITY    AS TANK_DENSITY
            	, CT.OPEN_MASS_TOT   AS TANK_LIQUID_KG
            	, CT.OPEN_AMB_TOT
				, TK.TANK_15_DENSITY
              from 
                CLOSEOUT_TANK CT 
                , (
                  select * 
              	from (select * from CLOSEOUTS where STATUS = 0 order by CLOSEOUT_NR desc) temp 
              	where ROWNUM=1
                )  CS
                , TANKS TK
              where
                CT.CLOSEOUT_NR = CS.CLOSEOUT_NR
                and CT.TANK_TERMINAL = TK.TANK_TERMINAL
                and CT.TANK_CODE = TK.TANK_CODE
            )  CTK
            WHERE 
                1 = 1
                AND ('-1' = :base OR TANK_BASE = :base)
                $terminal_condition
            GROUP BY TANK_TERMINAL, TANK_BASE
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':base', $this->base_code);
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            oci_bind_by_name($stmt, ':term_code', $this->terminal);
        }

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // get qunatities from tank for the prorate density
    public function get_base_summary2()
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
                SUM(TANK_DENSITY) AS TANK_DENS,
                COUNT(TANK_CODE)  AS TANK_COUNT,
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

    protected function post_update()
    {
        write_log("post_update START", __FILE__, __LINE__);

        //If it is a reversal and this transaction is in a fronzen folio, update all CLOSEOUT_PRODOWNSHIP
        if ($this->trsa_reversed) {
            $query = "
                SELECT NVL(STATUS, 0) STATUS, NVL(CLOSEOUT_NR, 99999) CLOSEOUT_NR 
                FROM CLOSEOUTS 
                WHERE CLOSEOUT_DATE > (SELECT TRSA_TIME_APPROVED FROM PRODOWNSHIP_TRANSACT WHERE OWNSHIP_TRSA_NO = :trsa_no) 
                    AND PREV_CLOSEOUT_DATE <= (SELECT TRSA_TIME_APPROVED FROM PRODOWNSHIP_TRANSACT WHERE OWNSHIP_TRSA_NO = :trsa_no)
            ";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':trsa_no', $this->ownship_trsa_no);

            if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            } else {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            }

            if ($row['STATUS'] == null || $row['CLOSEOUT_NR'] == null) {
                write_log("No suitable folio found", __FILE__, __LINE__);
                return;
            }

            //1 - Fronzen.
            if ($row['STATUS'] != 1) {
                write_log(sprintf("Target folio %s, status %s, do not update CLOSEOUT_PRODOWNSHIP", 
                    $row['CLOSEOUT_NR'], $row['STATUS']), __FILE__, __LINE__);
                return;
            }
            
            write_log(sprintf("Target folio %s, status %s", $row['CLOSEOUT_NR'], $row['STATUS']), __FILE__, __LINE__);

            //From company 
            $query = "
                UPDATE CLOSEOUT_PRODOWNSHIP
                SET CLOSE_QTY = CLOSE_QTY + :changed,
                    FREEZE_QTY = FREEZE_QTY + :changed
                WHERE CLOSEOUT_NR = :folio_nr 
                    AND CMPY_CODE = :cmpy_code
                    AND BASE_CODE = :base_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':changed', $this->qty);
            oci_bind_by_name($stmt, ':folio_nr', $row['CLOSEOUT_NR']);
            oci_bind_by_name($stmt, ':cmpy_code', $this->supp_cmpy);
            oci_bind_by_name($stmt, ':base_code', $this->base_prod_code);
            if (!oci_execute($stmt)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }

            $query = "
                UPDATE CLOSEOUT_PRODOWNSHIP
                SET OPEN_QTY = OPEN_QTY + :changed,
                    CLOSE_QTY = CLOSE_QTY + :changed,
                    FREEZE_QTY = FREEZE_QTY + :changed
                WHERE CLOSEOUT_NR > :folio_nr 
                    AND CMPY_CODE = :cmpy_code
                    AND BASE_CODE = :base_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':changed', $this->qty);
            oci_bind_by_name($stmt, ':folio_nr', $row['CLOSEOUT_NR']);
            oci_bind_by_name($stmt, ':cmpy_code', $this->supp_cmpy);
            oci_bind_by_name($stmt, ':base_code', $this->base_prod_code);
            if (!oci_execute($stmt)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }

            //To company 
            $query = "
                UPDATE CLOSEOUT_PRODOWNSHIP
                SET CLOSE_QTY = CLOSE_QTY - :changed,
                    FREEZE_QTY = FREEZE_QTY - :changed
                WHERE CLOSEOUT_NR = :folio_nr 
                    AND CMPY_CODE = :cmpy_code
                    AND BASE_CODE = :base_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':changed', $this->qty);
            oci_bind_by_name($stmt, ':folio_nr', $row['CLOSEOUT_NR']);
            oci_bind_by_name($stmt, ':cmpy_code', $this->supp_cmpy_to);
            oci_bind_by_name($stmt, ':base_code', $this->base_prod_code);
            if (!oci_execute($stmt)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }

            $query = "
                UPDATE CLOSEOUT_PRODOWNSHIP
                SET OPEN_QTY = OPEN_QTY - :changed,
                    CLOSE_QTY = CLOSE_QTY - :changed,
                    FREEZE_QTY = FREEZE_QTY - :changed
                WHERE CLOSEOUT_NR > :folio_nr 
                    AND CMPY_CODE = :cmpy_code
                    AND BASE_CODE = :base_code";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':changed', $this->qty);
            oci_bind_by_name($stmt, ':folio_nr', $row['CLOSEOUT_NR']);
            oci_bind_by_name($stmt, ':cmpy_code', $this->supp_cmpy_to);
            oci_bind_by_name($stmt, ':base_code', $this->base_prod_code);
            if (!oci_execute($stmt)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }
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
