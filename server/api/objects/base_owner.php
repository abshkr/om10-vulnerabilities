<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class BaseOwner extends CommonClass
{
    protected $TABLE_NAME = 'BASE_PROD_OWNSHIP';
    // protected $VIEW_NAME = 'GUI_BASE_PROD_OWNSHIP';
    // protected $primary_keys = array("ownship_no");
    protected $primary_keys = array("ownship_terminal", "base_prod_code", "supp_cmpy");
    // protected $view_keys = array("base_prod_code", "supp_cmpy");


    public $NUMBER_FIELDS = array(
        "OWNSHIP_NO",
        "OWNSHIP_QTY",
        "OWNSHIP_DENSITY",
        "OWNSHIP_UNIT",
        "BASE_CAT",
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
    );
    
    
    public function check_ownership_by_base()
    {
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND OWNSHIP_TERMINAL = :term_code ";
        }
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM BASE_PROD_OWNSHIP
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
            FROM BASE_PROD_OWNSHIP
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
            FROM BASE_PROD_OWNSHIP
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

    public function read()
    {
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND bro.OWNSHIP_TERMINAL = :term_code ";
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
            select bro.*, bpd.*, bpc.*, cmp.*, unt.*
                , bso.TOTAL_QTY
                , DECODE(bso.TOTAL_QTY, 0, 0, ROUND(bro.OWNSHIP_QTY/bso.TOTAL_QTY*100, 4))   AS BPO_PERCENTAGE
                , bro.OWNSHIP_TERMINAL || ' - ' || trm.TERM_NAME   AS BPO_SITEDESC
            from
                BASE_PROD_OWNSHIP   bro
                , (
                    select 
                        OWNSHIP_TERMINAL
                        , BASE_PROD_CODE
                        , SUM(OWNSHIP_QTY) as TOTAL_QTY
                    from 
                        BASE_PROD_OWNSHIP
                    where 
                        1=1
                    group by OWNSHIP_TERMINAL, BASE_PROD_CODE
                )                   bso
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
                bso.OWNSHIP_TERMINAL = bro.OWNSHIP_TERMINAL
                and bso.BASE_PROD_CODE = bro.BASE_PROD_CODE
                and bro.BASE_PROD_CODE = bpd.BASE_CODE(+)
                and bpd.BASE_CAT = bpc.BCLASS_NO(+)
                and bro.SUPP_CMPY = cmp.CMPY_CODE(+)
                and bro.OWNSHIP_UNIT = unt.UNIT_ID(+)
                and bro.OWNSHIP_TERMINAL = trm.TERM_CODE(+)
        ";

        $query .= "
                and ('-1' = :base OR bro.BASE_PROD_CODE = :base)
                and ('-1' = :cmpy OR bro.SUPP_CMPY = :cmpy)
                and (-1 = :catg OR bpd.BASE_CAT = :catg)
                $terminal_condition
            ORDER BY bro.OWNSHIP_TERMINAL, bro.BASE_PROD_CODE, bro.SUPP_CMPY
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

    public function read_by_summary()
    {
        $terminal_condition = "";
        if (isset($this->terminal) && $this->terminal != 'undefined' && strlen($this->terminal) > 0) {
            $terminal_condition = " AND OWNSHIP_TERMINAL = :term_code ";
        }
        if (!isset($this->base_code)) {
            $this->base_code = "-1";
        }

        $query = "
            SELECT 
                OWNSHIP_TERMINAL
                , OWNSHIP_SITEDESC
                , BASE_CODE         AS BASE_PROD_CODE
                , BASE_NAME
                , SUM(OWNSHIP_QTY)  AS OWNSHIP_QTY
                , SUM(OWNSHIP_QTY*OWNSHIP_DENSITY)  AS OWNSHIP_MASS
            FROM (
                select bro.*, bpd.*, bpc.*, cmp.*, unt.*
                    , bro.OWNSHIP_TERMINAL || ' - ' || trm.TERM_NAME   AS OWNSHIP_SITEDESC
                from
                    BASE_PROD_OWNSHIP   bro
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
                    bro.BASE_PROD_CODE = bpd.BASE_CODE(+)
                    and bpd.BASE_CAT = bpc.BCLASS_NO(+)
                    and bro.SUPP_CMPY = cmp.CMPY_CODE(+)
                    and bro.OWNSHIP_UNIT = unt.UNIT_ID(+)
                    and bro.OWNSHIP_TERMINAL = trm.TERM_CODE(+)
            )
            WHERE 
                1 = 1
                AND ('-1' = :base OR BASE_CODE = :base)
                $terminal_condition
            GROUP BY OWNSHIP_TERMINAL, OWNSHIP_SITEDESC, BASE_CODE, BASE_NAME
            ORDER BY OWNSHIP_TERMINAL, OWNSHIP_SITEDESC, BASE_CODE, BASE_NAME
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

    public function pre_create()
    {
        // get the next sequence ID from BASE_PROD_OWNSHIP_SEQ
        $this->ownship_no = 1;

        $query = "
            SELECT BASE_PROD_OWNSHIP_SEQ.NEXTVAL ID FROM DUAL
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $this->ownship_no = $row['ID'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    //If resverse in a fronzen folio, change CLOSEOUT_PRODOWNSHIP
    protected function post_update()
    {
        // return true;
        if ($this->action !== "REVERSE") {
            return;
        }

        write_log("Checking if reversal in fronzen folio", __FILE__, __LINE__);

        $query = "
            SELECT NVL(STATUS, 0) STATUS, NVL(CLOSEOUT_NR, 99999) CLOSEOUT_NR
            FROM CLOSEOUTS 
            WHERE (CLOSEOUT_DATE IS NULL AND
                    PREV_CLOSEOUT_DATE <= (SELECT TRSA_TIME FROM PRODOWNSHIP_TRANSACT WHERE OWNSHIP_TRSA_NO = :ownship_trsa_no))
                OR (CLOSEOUT_DATE > (SELECT TRSA_TIME FROM PRODOWNSHIP_TRANSACT WHERE OWNSHIP_TRSA_NO = :ownship_trsa_no) AND 
                    PREV_CLOSEOUT_DATE <= (SELECT TRSA_TIME FROM PRODOWNSHIP_TRANSACT WHERE OWNSHIP_TRSA_NO = :ownship_trsa_no))
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':ownship_trsa_no', $this->ownship_trsa_no);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        $status = $row['STATUS'];
        $closeout_nr = $row['CLOSEOUT_NR'];

        if ($status != 1) {
            return;
        }

        $this->qty = $this->qty * -1;
        write_log(sprintf("Folio %d is frozen, do reversal with quantity %f", $closeout_nr, $this->qty), __FILE__, __LINE__);
        $query = "
            UPDATE CLOSEOUT_PRODOWNSHIP
            SET CLOSE_QTY = CLOSE_QTY - :qty,
                FREEZE_QTY = FREEZE_QTY - :qty
            WHERE CLOSEOUT_NR = :closeout_nr 
                AND CMPY_CODE = :supp_cmpy
                AND BASE_CODE = :base_prod_code
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':closeout_nr', $closeout_nr);
        oci_bind_by_name($stmt, ':qty', $this->qty);
        oci_bind_by_name($stmt, ':supp_cmpy', $this->supp_cmpy);
        oci_bind_by_name($stmt, ':base_prod_code', $this->base_prod_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }
        
        $query = "
            UPDATE CLOSEOUT_PRODOWNSHIP
            SET CLOSE_QTY = CLOSE_QTY - :qty
            WHERE CLOSEOUT_NR > :closeout_nr 
                AND CMPY_CODE = :supp_cmpy
                AND BASE_CODE = :base_prod_code
                AND CLOSE_QTY IS NOT NULL
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':closeout_nr', $closeout_nr);
        oci_bind_by_name($stmt, ':qty', $this->qty);
        oci_bind_by_name($stmt, ':supp_cmpy', $this->supp_cmpy);
        oci_bind_by_name($stmt, ':base_prod_code', $this->base_prod_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $query = "
            UPDATE CLOSEOUT_PRODOWNSHIP
            SET OPEN_QTY = OPEN_QTY - :qty
            WHERE CLOSEOUT_NR > :closeout_nr 
                AND CMPY_CODE = :supp_cmpy
                AND BASE_CODE = :base_prod_code
                AND OPEN_QTY IS NOT NULL
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':closeout_nr', $closeout_nr);
        oci_bind_by_name($stmt, ':qty', $this->qty);
        oci_bind_by_name($stmt, ':supp_cmpy', $this->supp_cmpy);
        oci_bind_by_name($stmt, ':base_prod_code', $this->base_prod_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        $query = "
            UPDATE CLOSEOUT_PRODOWNSHIP
            SET FREEZE_QTY = FREEZE_QTY - :qty
            WHERE CLOSEOUT_NR > :closeout_nr 
                AND CMPY_CODE = :supp_cmpy
                AND BASE_CODE = :base_prod_code
                AND FREEZE_QTY IS NOT NULL
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':closeout_nr', $closeout_nr);
        oci_bind_by_name($stmt, ':qty', $this->qty);
        oci_bind_by_name($stmt, ':supp_cmpy', $this->supp_cmpy);
        oci_bind_by_name($stmt, ':base_prod_code', $this->base_prod_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        }

        oci_commit($this->conn);
    }

/*
    protected function get_percentages()
    {
        $query = "
            SELECT * 
            FROM BASE_PROD_OWNSHIP
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
            update BASE_PROD_OWNSHIP A 
            set A.TKO_PERCENTAGE = ROUND(100 * A.TKOWNER_QTY / (
                select sum(B.TKOWNER_QTY) 
                from BASE_PROD_OWNSHIP B 
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
