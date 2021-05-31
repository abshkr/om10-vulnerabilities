<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class TankOwner extends CommonClass
{
    protected $TABLE_NAME = 'TK_OWNERS';
    protected $VIEW_NAME = 'TANK_OWNERS_VW';
    protected $primary_keys = array("tklink_tankcode", "tklink_tankdepo", "tkcmpy_link");
    protected $view_keys = array("tklink_tankcode", "tklink_tankdepo", "tkcmpy_link");


    /* protected $table_view_map = array(
        "LIMIT_TYPE_ID" => "AXLE_LIMIT_TYPE_ID",
    ); */

    public $NUMBER_FIELDS = array(
        "TKO_PERCENTAGE",
        "TKOWNER_QTY",
        "TKO_STD_LTR",
        "TKO_AMB_LTR",
        "TKO_KG",
        "TKO_IN",
        "TKO_IN_KG",
        "TKO_IN_TOTAL",
        "TKO_OUT",
        "TKO_OUT_KG",
        "TKO_OUT_TOTAL",
        "TKO_OUT_PRMV",
        "TKO_OUT_LD",
        "TKO_ADJ_STD",
        "TKO_ADJ_AMB",
        "TKO_ADJ_KG",
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "AFC_ENABLED" => "Y",
        "TANK_DENS_MODE" => 1,
    );
    
    
    public function check_ownership_by_tank()
    {
        $query = "
            SELECT COUNT(*) AS CNT 
            FROM TK_OWNERS
            WHERE TKLINK_TANKCODE=:code and TKLINK_TANKDEPO=:term 
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $this->tank_code);
        oci_bind_by_name($stmt, ':term', $this->tank_terminal);
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
            FROM TK_OWNERS
            WHERE TKCMPY_LINK=:code 
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
            FROM TK_OWNERS
            WHERE 
                TKCMPY_LINK=:code 
                and TKLINK_TANKCODE=:tank 
                and TKLINK_TANKDEPO=:term 
        ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $this->cmpy_code);
        oci_bind_by_name($stmt, ':tank', $this->tank_code);
        oci_bind_by_name($stmt, ':term', $this->tank_terminal);
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
        if (!isset($this->cmpy_code)) {
            $this->cmpy_code = "-1";
        }
        if (!isset($this->tank_code)) {
            $this->tank_code = "-1";
        }
        if (!isset($this->tank_terminal)) {
            $this->tank_terminal = "-1";
        }
        if (!isset($this->tank_base)) {
            $this->tank_base = "-1";
        }
        if (!isset($this->tank_base_class)) {
            $this->tank_base_class = -1;
        }
        // tko_percentage     float,
        if (!isset($this->start_ratio)) {
            $this->start_ratio = -1;
        }
        if (!isset($this->end_ratio)) {
            $this->end_ratio = -1;
        }

        $query = "
            SELECT * FROM " . $this->VIEW_NAME . "
            WHERE 
                1 = 1
        ";

        if ( $this->start_ratio === -1) {
            $query .= "
                AND (-1 = :start_ratio) 
            ";
        } else {
            $query .= "
                AND (TKO_PERCENTAGE > :start_ratio) 
            ";
        }
        if ( $this->end_ratio === -1) {
            $query .= "
                AND (-1 = :end_ratio)
            ";
        } else {
            $query .= "
                AND (TKO_PERCENTAGE < :end_ratio)
            ";
        }
        $query .= "
                AND ('-1' = :code OR TKCMPY_LINK LIKE '%'||:code||'%')
                AND ('-1' = :tank OR TKLINK_TANKCODE = :tank)
                AND ('-1' = :term OR TKLINK_TANKDEPO = :term)
                AND ('-1' = :base OR TANK_BASE = :base)
                AND (-1 = :catg OR TANK_BASE_CLASS = :catg)
            ORDER BY TKLINK_TANKDEPO, TKLINK_TANKCODE, TKCMPY_LINK
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':start_ratio', $this->start_ratio);
        oci_bind_by_name($stmt, ':end_ratio', $this->end_ratio);
        oci_bind_by_name($stmt, ':code', $this->cmpy_code);
        oci_bind_by_name($stmt, ':tank', $this->tank_code);
        oci_bind_by_name($stmt, ':term', $this->tank_terminal);
        oci_bind_by_name($stmt, ':base', $this->tank_base);
        oci_bind_by_name($stmt, ':catg', $this->tank_base_class);

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
        if (!isset($this->cmpy_code)) {
            $this->cmpy_code = "-1";
        }
        if (!isset($this->tank_base)) {
            $this->tank_base = "-1";
        }

        $query = "
			SELECT 
                tov1.TANK_BASE
                , tov1.TANK_BASE_NAME
                , tov1.CMPY_CODE
                , tov1.CMPY_NAME
                , tov1.TKO_PERCENTAGE2
                , DECODE(tov2.TKOWNER_TOTAL, 0, 100, ROUND(tov1.TKOWNER_QTY/tov2.TKOWNER_TOTAL*100,4) )   AS TKO_PERCENTAGE
                , tov2.TKOWNER_TOTAL
                , tov1.TKOWNER_QTY
                , tov1.TKO_STD_LTR
                , tov1.TKO_AMB_LTR
                , tov1.TKO_KG
			FROM (
                SELECT 
                    TANK_BASE
                    , TANK_BASE_NAME
                    , CMPY_CODE
                    , CMPY_NAME
                    , SUM(TKO_PERCENTAGE)  AS TKO_PERCENTAGE2
                    , SUM(TKOWNER_QTY)     AS TKOWNER_QTY
                    , SUM(TKO_STD_LTR)     AS TKO_STD_LTR
                    , SUM(TKO_AMB_LTR)     AS TKO_AMB_LTR
                    , SUM(TKO_KG)          AS TKO_KG
                FROM TANK_OWNERS_VW
                WHERE 
                    1 = 1
                    AND ('-1' = :code OR TKCMPY_LINK LIKE '%'||:code||'%')
                    AND ('-1' = :base OR TANK_BASE = :base)
                GROUP BY TANK_BASE, TANK_BASE_NAME, CMPY_CODE, CMPY_NAME
			) tov1, (
                SELECT 
                    TANK_BASE
                    , SUM(TKOWNER_QTY)     AS TKOWNER_TOTAL
                FROM TANK_OWNERS_VW
                WHERE 
                    1 = 1
                    AND ('-1' = :code OR TKCMPY_LINK LIKE '%'||:code||'%')
                    AND ('-1' = :base OR TANK_BASE = :base)
                GROUP BY TANK_BASE
			) tov2
			WHERE tov1.TANK_BASE = tov2.TANK_BASE
			ORDER BY TANK_BASE, TANK_BASE_NAME, CMPY_CODE, CMPY_NAME
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':code', $this->cmpy_code);
        oci_bind_by_name($stmt, ':base', $this->tank_base);

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function get_percentages()
    {
        $query = "
            SELECT * 
            FROM TK_OWNERS
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
            update TK_OWNERS A 
            set A.TKO_PERCENTAGE = ROUND(100 * A.TKOWNER_QTY / (
                select sum(B.TKOWNER_QTY) 
                from TK_OWNERS B 
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

}
