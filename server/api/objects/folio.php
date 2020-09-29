<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/strap_service.php';
include_once 'common_class.php';
include_once 'tank_status.php';

class FolioMeter extends CommonClass
{
    protected $TABLE_NAME = 'CLOSEOUT_METER';
    protected $VIEW_NAME = 'CLOSEOUT_METER';

    protected $primary_keys = array("closeout_nr",
        "meter_code");

    public function post_update()
    {
        $next_folio = $this->closeout_nr + 1;

        $query = "
            UPDATE " . $this->TABLE_NAME . " SET OPEN_MASS_TOT = :open_mass_tot,
                OPEN_STD_TOT = :open_std_tot,
                OPEN_AMB_TOT = :open_amb_tot
            WHERE CLOSEOUT_NR = :closeout_nr
                AND METER_CODE = :meter_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':open_mass_tot', $this->close_mass_tot);
        oci_bind_by_name($stmt, ':open_std_tot', $this->close_std_tot);
        oci_bind_by_name($stmt, ':open_amb_tot', $this->close_amb_tot);
        oci_bind_by_name($stmt, ':closeout_nr', $next_folio);
        oci_bind_by_name($stmt, ':meter_code', $this->meter_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return true;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }
    }
}

class FolioTank extends CommonClass
{
    protected $TABLE_NAME = 'CLOSEOUT_TANK';
    protected $VIEW_NAME = 'CLOSEOUT_TANK';

    protected $primary_keys = array("closeout_nr",
        "tank_code");

    protected $table_view_map = array(
        "TANK_LEVEL" => "TANK_PROD_LVL"
    );

    public function post_update()
    {
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
        if (oci_execute($stmt, $this->commit_mode)) {
            return true;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }
    }
}

class Folio extends CommonClass
{
    protected $TABLE_NAME = 'CLOSEOUTS';
    protected $VIEW_NAME = 'CLOSEOUTS';
     
    public $NUMBER_FIELDS = array(
        "CLOSEOUT_NR",
        "STATUS",
        "REPORT_TRIGGER",
        "OPEN_STD_TOT",
        "OPEN_MASS_TOT",
        "CLOSE_STD_TOT",
        "CLOSE_MASS_TOT",
        "FREEZE_STD_TOT",
        "FREEZE_MASS_TOT",
        "RCPT_VOL",
        "TRF_VOL",
        "OPEN_TEMP",
        "OPEN_DENSITY",
        "FREEZE_TEMP",
        "FREEZE_DENSITY",
        "CLOSE_TEMP",
        "CLOSE_DENSITY",
        "CLOSE_AMB_TOT",
        "OPEN_AMB_TOT",
        "FREEZE_AMB_TOT",
        "ADJ_STD_TOT",
        "ADJ_MASS_TOT",
        "ADJ_AMB_TOT",
        "STREAM_TANKTEMP",
        "STREAM_TANKDEN",
        "BCLASS_DENS_LO",
        "BCLASS_DENS_HI",
        "BCLASS_VCF_ALG",
        "TANK_DENSITY",
        // "TANK_PROD_LVL",
        "CLOSE_STD_TOT",
        "CLOSE_MASS_TOT",
        "CLOSE_AMB_TOT"
    );

    public function manual_close()
    {
        $query = "UPDATE SITE SET NEXT_MANUAL_CLOSE = 'Y', NEXT_CLOSEOUT_REQ_USER = :user_code";
        $stmt = oci_parse($this->conn, $query);
        $cur_user = Utilities::getCurrPsn();
        oci_bind_by_name($stmt, ':user_code', $cur_user);
        if (oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $journal = new Journal($this->conn, false);
            $jnl_data[0] = sprintf("user %s triggers to close first frozen folio", $cur_user);
            if (!$journal->jnlLogEvent(Lookup::TMM_TEXT_ONLY, $jnl_data,
                JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                oci_rollback($this->conn);
                return null;
            }
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        oci_commit($this->conn);

        $result = array();
        $result["records"] = array();
        $result["result"] = 0;
        $result["message"] = sprintf("user %s triggers to close first frozen folio", $cur_user);
        echo json_encode($result, JSON_PRETTY_PRINT);
        return $result;
    }

    //calculates an array of vcf
    public function calc_vcfs()
    {
        if (!isset($_SESSION)) {
            session_start();
        }

        $vcf_response = array();
        foreach ($this as $key => $value) {
            // write_log($key, __FILE__, __LINE__);
            // write_log(json_encode($value), __FILE__, __LINE__);
            if (!is_numeric($key)) {
                continue;
            }

            $url = URL_PROTOCOL . $_SERVER['SERVER_ADDR'] . "/cgi-bin/en/calcvcf.cgi?";
            foreach ($value as $cgi_key => $cgi_value) {
                $url .= $cgi_key . "=" . rawurlencode(strip_tags($cgi_value)) . "&";
            }

            if (isset($_SESSION["SESSION"])) {
                $url .= "sess_id=" . $_SESSION["SESSION"];
            }
            write_log(sprintf("%s::%s(), url:%s", __CLASS__, __FUNCTION__, $url),
                __FILE__, __LINE__);

            $result = @file_get_contents($url);
            if ($result === false) {
                $e = error_get_last();
                write_log($e['message'], __FILE__, __LINE__);
            }
            // write_log(json_encode($result), __FILE__, __LINE__);

            $real_cvf = Utilities::get_cgi_xml_value($result, 'REAL_VCF');
            $real_litre = Utilities::get_cgi_xml_value($result, 'REAL_LITRE');
            $real_litre15 = Utilities::get_cgi_xml_value($result, 'REAL_LITRE15');
            $real_kg = Utilities::get_cgi_xml_value($result, 'REAL_KG');

            $item = new stdClass();
            $item->real_cvf = $real_cvf;
            $item->real_litre = intval($real_litre);
            $item->real_litre15 = intval($real_litre15);
            $item->real_kg = intval($real_kg);

            array_push($vcf_response, $item);
        }

        // $cgi_response = Utilities::http_cgi_invoke("cgi-bin/en/calcvcf.cgi");
        // write_log(json_encode($cgi_response), __FILE__, __LINE__);

        // $result = array();
        // $result["records"] = array();

        http_response_code(200);
        // if (strpos($cgi_response, "<Result>0<")) {
        //     $result["result"] = 0;
        //     $result["message"] = "PDS message sent";
        // } else {
        //     $result["result"] = -1;
        //     $result["message"] = $cgi_response;
        // }

        echo json_encode($vcf_response, JSON_PRETTY_PRINT);

        //return an arrary to stop caller to do follow-up work
        return $vcf_response;
    }

    public function calc_vcf()
    {
        $query = "frm_baseCd=" . $this->frm_baseCd . 
            "&frm_which_type=" . $this->frm_which_type . 
            "&frm_real_amount=" . $this->frm_real_amount . 
            "&frm_real_temp=" . $this->frm_real_temp . 
            "&frm_real_dens=" . $this->frm_real_dens;
        $cgi_response = Utilities::http_cgi_invoke("cgi-bin/en/calcvcf.cgi", $query);
        write_log(json_encode($cgi_response), __FILE__, __LINE__);

        $real_cvf = Utilities::get_cgi_xml_value($cgi_response, 'REAL_VCF');
        $real_litre = Utilities::get_cgi_xml_value($cgi_response, 'REAL_LITRE');
        $real_litre15 = Utilities::get_cgi_xml_value($cgi_response, 'REAL_LITRE15');
        $real_kg = Utilities::get_cgi_xml_value($cgi_response, 'REAL_KG');
        
        $item = new stdClass();
        $item->real_cvf = $real_cvf;
        $item->real_litre = $real_litre;
        $item->real_litre15 = $real_litre15;
        $item->real_kg = $real_kg;

        echo json_encode($item, JSON_PRETTY_PRINT);
    }

    public function calc_tank_vcfs()
    {
        $vcf_response = array();
        $calc_in_trouble = 0;
        $desc_array = array();
        foreach ($this as $key => $value) {
            // write_log($key, __FILE__, __LINE__);
            // write_log(json_encode($value), __FILE__, __LINE__);
            if (!is_numeric($key)) {
                continue;
            }

            $url = URL_PROTOCOL . $_SERVER['SERVER_ADDR'] . "/cgi-bin/en/calcvcf.cgi?";
            if (!isset($value->frm_which_type)) {
                //ReactJS only set frm_which_type if somebody changed something.
                write_log("frm_which_type not set, assume LT", __FILE__, __LINE__);
                $value->frm_which_type = "LT";
                // array_push($vcf_response, $value);
                // continue;
            }
            $url .= "frm_which_type=" . rawurlencode(strip_tags($value->frm_which_type)) . "&";

            if (!isset($value->tank_prod_lvl)) {
                write_log(sprintf("tank %s tank_prod_lvl not set, use close_amb_tot directly", $value->tank_code), __FILE__, __LINE__);
                if (!isset($value->close_amb_tot)) {
                    write_log(sprintf("both tank_prod_lvl and close_amb_tot not set, skip this calculation. tank:%s", $value->tank_code), 
                        __FILE__, __LINE__, LogLevel::WARNING);
                    $calc_in_trouble += 1;

                    $err_msg = response("__VCF_TANKLVL_AMB_NOT_SET__", null, array($value->tank_code));
                    
                    array_push($desc_array, $err_msg);
                    array_push($vcf_response, $value);
                    continue;
                } 
            } else {
                $strap_service = new StrapService($this->conn);
                $strap_vol = $strap_service->get_amb($value->tank_code, $value->tank_prod_lvl);
                if ($strap_vol <= 0) {
                    if ($value->close_amb_tot <= 0) {
                        write_log(sprintf("Tank %s: failed to get ambient liter from strap", $value->tank_code), 
                            __FILE__, __LINE__, LogLevel::WARNING);
                        $calc_in_trouble += 1;
                        $err_msg = response("__VCF_CANNOT_GET_AMB_FROM_STRAP__", null, array($value->tank_code));
                        
                        array_push($desc_array, $err_msg);
                        array_push($vcf_response, $value);
                        continue;
                    } else {
                        write_log("Failed to get ambient liter from strap, use close_amb_tot instead", 
                            __FILE__, __LINE__, LogLevel::WARNING);
                    }
                } else {
                    $value->close_amb_tot = $strap_vol;
                }
            }

            if ($value->frm_which_type === "KG") {
                $amount = $value->close_mass_tot;
            } else if ($value->frm_which_type === "L15") {
                $amount = $value->close_std_tot;
            } else if ($value->frm_which_type === "LT") {
                $amount = $value->close_amb_tot;
            }
            $url .= "frm_real_amount=" . $amount . "&";
            $url .= "frm_baseCd=" . $value->tank_base . "&";
            $url .= "frm_real_temp=" . $value->close_temp . "&";
            $url .= "frm_real_dens=" . $value->close_density;
            if (isset($_SESSION["SESSION"])) {
                $url .= "&sess_id=" . $_SESSION["SESSION"];
            }

            write_log(sprintf("%s::%s(), url:%s", __CLASS__, __FUNCTION__, $url),
                __FILE__, __LINE__);

            $result = @file_get_contents($url);
            if ($result === false) {
                $e = error_get_last();
                write_log($e['message'], __FILE__, __LINE__);
            }

            write_log(json_encode($result), __FILE__, __LINE__);

            if (Utilities::get_cgi_xml_value($result, 'MSG_CODE') > 0) {
                $calc_in_trouble += 1;
                $msg = Utilities::get_cgi_xml_value($result, 'MSG_DESC');
                $err_msg = response("__VCF_FAILED__", sprintf("%s. tank:%s", $msg, $value->tank_code), array($value->tank_code));

                write_log(sprintf("%s, tank:%s, base: %s, temp:%f, density:%f, from:%s, quantity:%d", 
                    $msg, $value->tank_code, $value->tank_base, $value->close_temp, $value->close_density, 
                        $value->frm_which_type, $amount), __FILE__, __LINE__);
                
                array_push($desc_array, $err_msg);
            }

            $real_cvf = Utilities::get_cgi_xml_value($result, 'REAL_VCF');
            $real_litre = Utilities::get_cgi_xml_value($result, 'REAL_LITRE');
            $real_litre15 = Utilities::get_cgi_xml_value($result, 'REAL_LITRE15');
            $real_kg = Utilities::get_cgi_xml_value($result, 'REAL_KG');

            if ($real_cvf !== "") {
                $value->real_cvf = $real_cvf;
                $value->close_mass_tot = round($real_kg);
                $value->close_std_tot = round($real_litre15);
                $value->close_amb_tot = round($real_litre);
            }

            array_push($vcf_response, $value);
        }

        http_response_code(200);

        // echo json_encode($vcf_response, JSON_PRETTY_PRINT);
        $restReponse = new stdClass();
        $restReponse->calc_issues = $calc_in_trouble;
        $restReponse->desc = $desc_array;
        $restReponse->data = $vcf_response;
        echo json_encode($restReponse, JSON_PRETTY_PRINT);
    }

    public function pds()
    {
        $cgi_response = Utilities::http_cgi_invoke("cgi-bin/en/pds.cgi");
        write_log(json_encode($cgi_response), __FILE__, __LINE__);

        $result = array();
        $result["records"] = array();

        http_response_code(200);
        if (strpos($cgi_response, "<Result>0<")) {
            $result["result"] = 0;
            $result["message"] = response("__PDS_SENT__");
        } else {
            $result["result"] = -1;
            $result["message"] = response("__CGI_FAILED__", $cgi_response);
        }

        echo json_encode($result, JSON_PRETTY_PRINT);

        return $result;
    }

    public function read()
    {
        $query = "
            SELECT CLOSEOUT_NR,
                CLOSEOUT_DATE,
                PREV_CLOSEOUT_DATE,
                STATUS,
                FOLIO_STATUS_TYPES.FOLIO_STATUS_NAME  as STATUS_STR,
                DECODE(STATUS, 0, 'OPEN',
                    1, 'FROZEN',
                    'CLOSED') STATUS_STR2,
                REPORT_TRIGGER,
                USER_CODE,
                LAST_CHG_TIME,
                CLOSEOUT_NAME
             FROM " . $this->VIEW_NAME . ", FOLIO_STATUS_TYPES 
             WHERE STATUS = FOLIO_STATUS_TYPES.FOLIO_STATUS_ID
        ";
        if (isset($this->start_date) && isset($this->end_date)) {
            $query .= " AND PREV_CLOSEOUT_DATE >= :start_date
                AND PREV_CLOSEOUT_DATE < :end_date ";
        }
        $query .= " ORDER BY CLOSEOUT_NR DESC";
        $stmt = oci_parse($this->conn, $query);
        if (isset($this->start_date) && isset($this->end_date)) {
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
        }
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_tanks()
    {
        $query = "
        SELECT CLOSEOUT_TANK.*,
            TANKS.TANK_BASE,
            TANK_LEVEL TANK_PROD_LVL,
            TANKS.TANK_GAUGINGMTHD,
            GAUGE_METHOD_NAME TANK_GAUGINGMTHD_DESC,
            BASE_PRODS.BASE_NAME,
            BASECLASS.BCLASS_DESC,
            BASECLASS.BCLASS_NO,
            BASECLASS.BCLASS_DENS_LO,
            BASECLASS.BCLASS_DENS_HI,
            BASECLASS.BCLASS_VCF_ALG,
            TANKS.TANK_DENSITY
        FROM 
            CLOSEOUT_TANK, 
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
        WHERE CLOSEOUT_TANK.TANK_CODE = TANKS.TANK_CODE
            AND TANKS.TANK_BASE = BASE_PRODS.BASE_CODE
            AND BASE_PRODS.BASE_CAT = BASECLASS.BCLASS_NO
            AND TANK_GAUGINGMTHD = GAUGE_METHOD_ID(+)
            AND CLOSEOUT_TANK.CLOSEOUT_NR = :closeout_nr
        ORDER BY BASECLASS.BCLASS_NO
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

    //Old php: dmFolio.getMeters
    public function get_meters()
    {
        $query = "
            SELECT DISTINCT CLOSEOUT_METER.*,
                BA_METERS.BAM_QTY_TYPE,
                QTY_TYP.QTY_NAME  as BAM_QTY_TYPE_STR,
                DECODE(BAM_QTY_TYPE, 1, 'KG', 'VOL') BAM_QTY_TYPE_STR2,
                GUI_PIPENODE.STREAM_BASECODE,
                GUI_PIPENODE.STREAM_BASENAME,
                GUI_PIPENODE.STREAM_TANKCODE,
                GUI_PIPENODE.STREAM_TANKTEMP,
                GUI_PIPENODE.STREAM_TANKDEN
            FROM CLOSEOUT_METER, BA_METERS, GUI_PIPENODE, QTY_TYP
            WHERE CLOSEOUT_METER.METER_CODE = BA_METERS.BAM_CODE
                AND BA_METERS.BAM_QTY_TYPE = QTY_TYP.QTY_ID
                AND CLOSEOUT_METER.METER_CODE = GUI_PIPENODE.STREAM_MTRCODE
                AND BA_METERS.BAM_CODE = GUI_PIPENODE.STREAM_MTRCODE
                AND CLOSEOUT_METER.CLOSEOUT_NR = :closeout_nr
            ORDER BY CLOSEOUT_NR, METER_CODE";
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

    /* Returns a json indicating if closeout is idle.
       Closeout is considered idle if:
       1. it is not scheduled to freeze folio (NEXT_MANUAL_FREEZE_DATETIME is set), AND
       2. it is not scheduled to close folio (NEXT_MANUAL_CLOSE is set to "Y")
    */
    public function closeout_is_idle()
    {
        $result = array();
        $result["records"] = TRUE;

        $query = "SELECT NEXT_MANUAL_FREEZE_DATETIME FROM SITE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $freezetime = $row["NEXT_MANUAL_FREEZE_DATETIME"];
            if ($freezetime) {
                $result["records"] = FALSE;
            }
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        		$result["records"] = FALSE;
        }

        $query = "SELECT NEXT_MANUAL_CLOSE FROM SITE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $close = $row["NEXT_MANUAL_CLOSE"];

            /* Closeout only recognises "Y" */
            if ($close && $close == "Y") {
                $result["records"] = FALSE;
			}
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
        		$result["records"] = FALSE;
        }

        http_response_code(200);
        echo json_encode($result, JSON_PRETTY_PRINT);
        return $result;
    }

    public function create_reports()
    {
        $query = "SELECT SITE_CODE FROM SITE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $site_code = $row['SITE_CODE'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        if (isset($_SERVER['REPORT_DIR'])) {
            $report_dir = $_SERVER['REPORT_DIR'];
        } else {
            $report_dir = "/var/www/htdocs/folio_rpts/";
        }

        $result = array();
        $result["records"] = array();

        if (!isset($this->closeout_nr)) {
            write_log("parameter closeout_nr is not set", __FILE__, __LINE__, LogLevel::ERROR);
            $result["message"] = "parameter closeout_nr is not set.";
            echo json_encode($result, JSON_PRETTY_PRINT);
            return $result;
        }

        $folder = $report_dir . $site_code . "/" . $this->closeout_nr;
        if (!file_exists($folder)) {
            write_log("create folder " . $folder, __FILE__, __LINE__);
            mkdir($folder, 0755, true);
        }

        $query = "SELECT STATUS FROM CLOSEOUTS
            WHERE CLOSEOUT_NR = :closeout_nr";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':closeout_nr', $this->closeout_nr);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $status = intval($row['STATUS']);
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        if (isset($_SERVER["BIN"])) {
            $bin = $_SERVER["BIN"];
        } else {
            $bin = "/usr/omega/bin";
        }

        if ($status == 0) //OPEN
        {
            $closeout = $bin . "/closeout -c FREEZE -o -D -a -d 32767 -f /tmp/clsout" . "  1>/dev/null 2>&1";
        } else {
            $closeout = $bin . "/closeout -r -g " . $folder . " -F " . $this->closeout_nr . " -d 32767 -f /tmp/clsout" . "  1>/dev/null 2>&1";
        }

        write_log(sprintf("to run %s", $closeout), __FILE__, __LINE__, LogLevel::INFO);
        foreach ($_SERVER as $env_key => $env_value) {
            putenv("$env_key=$env_value");
        }

        $output = shell_exec($closeout);
        write_log(sprintf("result %s", $output), __FILE__, __LINE__, LogLevel::INFO);
        return $this->get_reports();
    }

    public function get_reports()
    {
        $query = "SELECT SITE_CODE FROM SITE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
            $site_code = $row['SITE_CODE'];
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        if (isset($_SERVER['REPORT_DIR'])) {
            $report_dir = $_SERVER['REPORT_DIR'];
        } else {
            $report_dir = "/var/www/htdocs/folio_rpts/";
        }

        $result = array();
        $result["records"] = array();

        if (!isset($this->closeout_nr)) {
            write_log("parameter closeout_nr is not set", __FILE__, __LINE__, LogLevel::ERROR);
            $result["message"] = "parameter closeout_nr is not set.";
            echo json_encode($result, JSON_PRETTY_PRINT);
            return $result;
        }

        $folder = $report_dir . $site_code . "/" . $this->closeout_nr;
        if (!file_exists($folder)) {
            write_log("folder " . $folder . " does not exist",
                __FILE__, __LINE__, LogLevel::ERROR);
            $result["message"] = response("__FOLDER_NOT_EXIST__", "folio folder does not exist.");
            echo json_encode($result, JSON_PRETTY_PRINT);
            return $result;
        }

        $cdir = scandir($folder);
        $reports = array();
        $count = 0;
        foreach ($cdir as $key => $value) {
            if (!in_array($value, array(".", ".."))) {
                array_push($reports, $value);
                $count += 1;
            }
        }
        sort($reports);

        // write_log(json_encode($reports), __FILE__, __LINE__);
        $result = array();
        $result["records"] = $reports;

        http_response_code(200);
        if ($count > 0) {
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $result["message"] = response("__NO_RECORD_FOUND__");
            echo json_encode($result, JSON_PRETTY_PRINT);
        }

        return $reports;
    }

    public function save_to_tanks()
    {
        // write_log(sprintf("%s::%s() START.", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);
        write_log(json_encode($this), __FILE__, __LINE__);

        if (!isset($this->folio_tanks)) {
            $error = new EchoSchema(400, "parameter missing: folio_tanks not provided");
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        foreach ($this->folio_tanks as $value) {
            $tank_staus = new TankStatus($this->conn);
            if (!isset($value->tank_code)) {
                write_log(sprintf("tank_code not provide, skip."), __FILE__, __LINE__, LogLevel::WARNING);
                write_log(json_encode($value), __FILE__, __LINE__, LogLevel::WARNING);
                continue;
            } else {
                $tank_staus->tank_code = $value->tank_code;
            }

            if (!isset($value->tank_terminal)) {
                write_log(sprintf("tank_terminal not provide, skip."), __FILE__, __LINE__, LogLevel::WARNING);
                write_log(json_encode($value), __FILE__, __LINE__, LogLevel::WARNING);
                continue;
            } else {
                $tank_staus->tank_terminal = $value->tank_terminal;
            }
            
            if (isset($value->close_amb_tot)) {
                $tank_staus->tank_amb_vol = $value->close_amb_tot;
            }
            if (isset($value->close_std_tot)) {
                $tank_staus->tank_cor_vol = $value->close_std_tot;
            }
            if (isset($value->close_mass_tot)) {
                $tank_staus->tank_liquid_kg = $value->close_mass_tot;
            }
            if (isset($value->close_temp)) {
                $tank_staus->tank_temp = $value->close_temp;
            }
            if (isset($value->close_density)) {
                $tank_staus->tank_density = $value->close_density;
            }
            if (isset($value->tank_prod_lvl)) {
                $tank_staus->tank_prod_lvl = $value->tank_prod_lvl;
            }
            if (!$tank_staus->update()) {
                return false;
            }
        }

        http_response_code(200);
        $result = new EchoSchema(200, response("__SAVE_SUCCEEDED__", "Data saved to tanks."));
        echo json_encode($result, JSON_PRETTY_PRINT);
    }
}
