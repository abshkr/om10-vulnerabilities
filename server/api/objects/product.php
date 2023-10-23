<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/company_service.php';
include_once __DIR__ . '/../service/base_service.php';
include_once 'common_class.php';

class Product extends CommonClass
{
    protected $TABLE_NAME = 'PRODUCTS';
    protected $VIEW_NAME = 'GUI_PRODUCTS';
    public $NUMBER_FIELDS = array(
        "PITEM_RATIO_PERCENT_PPM",
        "PITEM_RATIO_VALUE",
        "PITEM_RATIO_TOTAL",
        "PITEM_BCLASS_DENS_LO",
        "PITEM_BCLASS_DENS_HI",
        "PITEM_BCLASS_TEMP_LO",
        "PITEM_BCLASS_TEMP_HI",
        "PITEM_LDTOL_PTOL",
        "PITEM_LDTOL_NTOL",
        "PITEM_BLTOL_PTOL",
        "PITEM_BLTOL_NTOL",
        "PROD_LDTOL_PTOL",
        "PROD_LDTOL_NTOL"
    );

    protected $table_view_map = array(
        "PROD_CMPY" => "PROD_CMPYCODE",
        "PROD_PROD_GROUP" => "PROD_GROUP",
        "PROD_TXT_COLOUR" => "PROD_TEXTCOLOR",
        "PROD_BACK_COLOUR" => "PROD_BACKCOLOR",
        "PROD_RPT_TEMP" => "PROD_RPTTEMP",
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "PROD_LDTOL_FLAG" => 1,
        "PROD_CHECK_HOT_VOLUME" => 1,
        "PITEM_LDTOL_FLAG" => 1,
        "PITEM_BLTOL_FLAG" => 1,
        "PITEM_ADTV_FLAG" => 1,
        "PITEM_HOT_MAIN" => "Y",
        "PITEM_HOT_CHECK" => 1,
        "PROD_IS_COMPLIANT" => 1,
        "PROD_IS_LOCKED" => 1,
        "PROD_IS_BLEND" => "Y",
        "PROD_WRI_REQD" => 1,
    );
    
    //Because base cannot be too many, do not do limit
    public function read()
    {
        $query = "
            SELECT GUI_PRODUCTS.*, DG_LINK_ID 
            FROM GUI_PRODUCTS, DG_LINK
            WHERE PROD_CMPYCODE = DG_LINK.DGLNK_SP_PRODCMPY(+) AND PROD_CODE = DG_LINK.DGLNK_SP_PRODCODE(+) 
            ORDER BY PROD_CMPYCODE, PROD_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    protected function retrieve_children_data()
    {
        $query = "
            SELECT * FROM GUI_PRODUCT_ITEMS 
            WHERE PITEM_PROD_CODE = :prod_code
                AND PITEM_CMPY_CODE = :prod_cmpy
            ORDER BY PITEM_BASE_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prod_code', $this->prod_code);
        oci_bind_by_name($stmt, ':prod_cmpy', $this->prod_cmpy);

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $tank_max_flows = array();
        while ($flow_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $tank_max_flows[$flow_row['PITEM_BASE_CODE']] = $flow_row;
            // array_push($tank_max_flows, $base_item);
        }

        // write_log(json_encode($tank_max_flows), __FILE__, __LINE__);
        return $tank_max_flows;
    }

    protected function journal_children_change($journal, $old, $new)
    {
        $module = "product ratio";
        foreach ($old as $item_key => $item_array) {
            if (isset($new[$item_key])) {
                foreach ($item_array as $field => $value) {
                    if ($new[$item_key][$field] != $value) {
                        $record = sprintf("product:%s, cmpy:%s, base:%s",
                            $this->prod_code, $this->prod_cmpy, $item_key);
                        $journal->valueChange($module, $record, $field, $value, $new[$item_key][$field]);
                    }
                }
            }

             if (!isset($new[$item_key])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("product:%s, cmpy:%s", $this->prod_code, $this->prod_cmpy);
                $jnl_data[3] = sprintf("base product:%s", $item_key);

                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_DELETED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'],
                        __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        //In new but not in old.
        foreach ($new as $item_key => $item_array) {
            if (!isset($old[$item_key])) {
                $jnl_data[0] = Utilities::getCurrPsn();
                $jnl_data[1] = $module;
                $jnl_data[2] = sprintf("product:%s, cmpy:%s", $this->prod_code, $this->prod_cmpy);
                $jnl_data[3] = sprintf("base product:%s", $item_key);

                if (!$journal->jnlLogEvent(
                    Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'],
                        __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }
    }

    protected function delete_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $query = "
            DELETE FROM DG_LINK
            WHERE DGLNK_SP_PRODCODE = :rat_prod_prodcode
                AND DGLNK_SP_PRODCMPY = :rat_prod_prodcmpy";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':rat_prod_prodcode', $this->prod_code);
            oci_bind_by_name($stmt, ':rat_prod_prodcmpy', $this->prod_cmpy);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        $query = "
            DELETE FROM RATIOS
            WHERE RAT_PROD_PRODCODE = :rat_prod_prodcode
                AND RAT_PROD_PRODCMPY = :rat_prod_prodcmpy";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':rat_prod_prodcode', $this->prod_code);
            oci_bind_by_name($stmt, ':rat_prod_prodcmpy', $this->prod_cmpy);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        $query = "
            DELETE FROM HZ_LINK
            WHERE HZLNK_SP_PRODCODE = :rat_prod_prodcode
                AND HZLNK_SP_PRODCMPY = :rat_prod_prodcmpy";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':rat_prod_prodcode', $this->prod_code);
        oci_bind_by_name($stmt, ':rat_prod_prodcmpy', $this->prod_cmpy);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        return true;
    }

    protected function insert_children()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        if (isset($this->dg_link_id)) {
            $query = "INSERT INTO DG_LINK (
                DGLNK_SP_PRODCODE,
                DGLNK_SP_PRODCMPY,
                DG_LINK_ID)
            VALUES (
                :dglnk_sp_prodcode,
                :dglnk_sp_prodcmpy,
                :dg_link_id
            )";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':dglnk_sp_prodcode', $this->prod_code);
            oci_bind_by_name($stmt, ':dglnk_sp_prodcmpy', $this->prod_cmpy);
            oci_bind_by_name($stmt, ':dg_link_id', $this->dg_link_id);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        if (!isset($this->bases)) {
            return true;
        }
        
        foreach ($this->bases as $value) {
            // write_log(json_encode($value), __FILE__, __LINE__);
            $query = "INSERT INTO RATIOS (
                RATIO_BASE,
                RAT_PROD_PRODCODE,
                RAT_PROD_PRODCMPY,
                RATIO_VALUE,
                RATIO_PERCENT_PPM,
                RAT_BLTOL_FLAG,
                RAT_BLTOL_PTOL,
                RAT_BLTOL_NTOL,
                RAT_HOT_MAIN)
            VALUES (
                :ratio_base,
                :rat_prod_prodcode,
                :rat_prod_prodcmpy,
                :ratio_value,
                :ratio_percent_ppm,
                :rat_bltol_flag,
                :rat_bltol_ptol,
                :rat_bltol_ntol,
                :rat_hot_main
            )";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':ratio_base', $value->pitem_base_code);
            oci_bind_by_name($stmt, ':rat_prod_prodcode', $this->prod_code);
            oci_bind_by_name($stmt, ':rat_prod_prodcmpy', $this->prod_cmpy);
            oci_bind_by_name($stmt, ':ratio_value', $value->pitem_ratio_value);
            oci_bind_by_name($stmt, ':ratio_percent_ppm', $value->pitem_ratio_percent_ppm);
            oci_bind_by_name($stmt, ':rat_bltol_flag', $value->pitem_bltol_flag);
            oci_bind_by_name($stmt, ':rat_bltol_ptol', $value->pitem_bltol_ptol);
            oci_bind_by_name($stmt, ':rat_bltol_ntol', $value->pitem_bltol_ntol);
            oci_bind_by_name($stmt, ':rat_hot_main', $value->pitem_hot_main);

            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            }
        }

        $query = "INSERT INTO HZ_LINK (HZLNK_SP_PRODCMPY, HZLNK_SP_PRODCODE, HZ_LINK_ID)
            VALUES (:hzlnk_sp_prodcmpy, :hzlnk_sp_prodcode, :hz_link_id)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':hzlnk_sp_prodcode', $this->prod_code);
        oci_bind_by_name($stmt, ':hzlnk_sp_prodcmpy', $this->prod_cmpy);
        oci_bind_by_name($stmt, ':hz_link_id', $this->prod_hazid);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);

            throw new DatabaseException($e['message']);
            return false;
        }

        return true;
    }

    private function increment_site()
    {
        $query = "UPDATE SITE SET SITE_BAI_UPDATE = SITE_BAI_UPDATE + 1";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return true;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }
    }

    protected function post_create()
    {
        return $this->increment_site();
    }

    protected function post_update()
    {
        return $this->increment_site();
    }

    protected function post_delete()
    {
        return $this->increment_site();
    }

    public function drawers()
    {
        $serv = new CompanyService($this->conn);
        return $serv->drawers(false);
    }

    public function base_products()
    {
        $serv = new BaseService($this->conn);
        return $serv->read_brief();
    }

    public function prod_ratios()
    {
        $query = "
            SELECT * FROM GUI_PRODUCT_ITEMS 
            WHERE PITEM_PROD_CODE = :prod_code
                AND PITEM_CMPY_CODE = :prod_cmpy
            ORDER BY PITEM_BASE_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prod_code', $this->prod_code);
        oci_bind_by_name($stmt, ':prod_cmpy', $this->prod_cmpycode);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function generic_prods()
    {
        $query = "
            select 
                gp.GEN_PROD_CODE
                , decode( gu.PROD_COUNT, NULL, 0, gu.PROD_COUNT) 									as PROD_COUNT
                , gp.GEN_PROD_CODE||' ('||decode( gu.PROD_COUNT, NULL, 0, gu.PROD_COUNT)||') ' 		as GEN_PROD_DESC
            from 
                GENERIC_PROD  gp
                , (
                    select PROD_CLASS, count(PROD_CODE) as PROD_COUNT from PRODUCTS where 1=1 group by PROD_CLASS
                ) gu
            where
                gp.GEN_PROD_CODE = gu.PROD_CLASS(+) 
            order by gp.GEN_PROD_CODE
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function pipenode_bases()
    {
        $query = "
            SELECT * FROM GUI_PIPENODE 
            WHERE 1=1
            ORDER BY STREAM_INDEX, STREAM_SEQ, STREAM_BCLASS_CODE
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function product_qualitys()
    {
        $query = "
            SELECT * FROM PRODUCT_QUALITYS 
            WHERE QUALITY_ACTIVE='Y'
            ORDER BY QUALITY_NAME
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
