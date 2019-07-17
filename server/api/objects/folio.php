<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class FolioMeter extends CommonClass
{
    protected $TABLE_NAME = 'CLOSEOUT_METER';
    protected $VIEW_NAME = 'CLOSEOUT_METER';

    protected $primary_keys = array("closeout_nr",
        "meter_code");
}

class FolioTank extends CommonClass
{
    protected $TABLE_NAME = 'CLOSEOUT_TANK';
    protected $VIEW_NAME = 'CLOSEOUT_TANK';

    protected $primary_keys = array("closeout_nr",
        "tank_code");
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
        Utilities::sanitize($this);

        session_start();

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
            $item->real_litre = $real_litre;
            $item->real_litre15 = $real_litre15;
            $item->real_kg = $real_kg;

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
        Utilities::sanitize($this);

        $cgi_response = Utilities::http_cgi_invoke("cgi-bin/en/calcvcf.cgi");
        write_log(json_encode($cgi_response), __FILE__, __LINE__);

        $result = array();
        $result["records"] = array();

        http_response_code(200);
        if (strpos($cgi_response, "<Result>0<")) {
            $result["result"] = 0;
            $result["message"] = "PDS message sent";
        } else {
            $result["result"] = -1;
            $result["message"] = $cgi_response;
        }

        echo json_encode($result, JSON_PRETTY_PRINT);

        return $result;
    }

    public function calc_tank_vcfs()
    {
        Utilities::sanitize($this);

        write_log(json_encode($this), __FILE__, __LINE__);

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
            if (!isset($value->frm_which_type)) {
                //ReactJS only set frm_which_type if somebody changed something.
                array_push($vcf_response, $value);
                continue;
            }
            $url .= "frm_which_type=" . rawurlencode(strip_tags($value->frm_which_type)) . "&";
            if ($value->frm_which_type === "KG") {
                $url .= "frm_real_amount=" . $value->close_mass_tot . "&";
            } else if ($value->frm_which_type === "L15") {
                $url .= "frm_real_amount=" . $value->close_std_tot . "&";
            } else if ($value->frm_which_type === "LT") {
                $url .= "frm_real_amount=" . $value->close_amb_tot . "&";
            }
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

            $real_cvf = Utilities::get_cgi_xml_value($result, 'REAL_VCF');
            $real_litre = Utilities::get_cgi_xml_value($result, 'REAL_LITRE');
            $real_litre15 = Utilities::get_cgi_xml_value($result, 'REAL_LITRE15');
            $real_kg = Utilities::get_cgi_xml_value($result, 'REAL_KG');

            $value->real_cvf = $real_cvf;
            $value->close_mass_tot = $real_kg;
            $value->close_std_tot = $real_litre15;
            $value->close_amb_tot = $real_litre;

            array_push($vcf_response, $value);
        }

        http_response_code(200);

        echo json_encode($vcf_response, JSON_PRETTY_PRINT);

        //return an arrary to stop caller to do follow-up work
        return $vcf_response;
    }

    public function pds()
    {
        Utilities::sanitize($this);

        $cgi_response = Utilities::http_cgi_invoke("cgi-bin/en/pds.cgi");
        write_log(json_encode($cgi_response), __FILE__, __LINE__);

        $result = array();
        $result["records"] = array();

        http_response_code(200);
        if (strpos($cgi_response, "<Result>0<")) {
            $result["result"] = 0;
            $result["message"] = "PDS message sent";
        } else {
            $result["result"] = -1;
            $result["message"] = $cgi_response;
        }

        echo json_encode($result, JSON_PRETTY_PRINT);

        return $result;
    }

    public function read()
    {
        Utilities::sanitize($this);
        // write_log(json_encode($this), __FILE__, __LINE__);

        $query = "
            SELECT CLOSEOUT_NR,
                CLOSEOUT_DATE,
                PREV_CLOSEOUT_DATE,
                STATUS,
                DECODE(STATUS, 0, 'OPEN',
                    1, 'FROZEN',
                    'CLOSED') STATUS_STR,
                REPORT_TRIGGER,
                USER_CODE,
                LAST_CHG_TIME,
                CLOSEOUT_NAME
             FROM " . $this->VIEW_NAME;
        if (isset($this->start_date) && isset($this->end_date)) {
            $query .= " WHERE CLOSEOUT_DATE >= :start_date
                AND CLOSEOUT_DATE < :end_date ";
        }
        $query .= " ORDER BY CLOSEOUT_NR DESC";
        $stmt = oci_parse($this->conn, $query);
        if (isset($this->start_date) && isset($this->end_date)) {
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);
        }
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_tanks()
    {
        Utilities::sanitize($this);
        // write_log(json_encode($this), __FILE__, __LINE__);

        $query = "
        SELECT CLOSEOUT_TANK.*,
            TANKS.TANK_BASE,
            BASE_PRODS.BASE_NAME,
            BASECLASS.BCLASS_DESC,
            BASECLASS.BCLASS_NO,
            BASECLASS.BCLASS_DENS_LO,
            BASECLASS.BCLASS_DENS_HI,
            BASECLASS.BCLASS_VCF_ALG,
            TANKS.TANK_DENSITY
        FROM CLOSEOUT_TANK, TANKS, BASE_PRODS, BASECLASS
        WHERE CLOSEOUT_TANK.TANK_CODE = TANKS.TANK_CODE
            AND TANKS.TANK_BASE = BASE_PRODS.BASE_CODE
            AND BASE_PRODS.BASE_CAT = BASECLASS.BCLASS_NO
            AND CLOSEOUT_TANK.CLOSEOUT_NR = :closeout_nr
        ORDER BY BASECLASS.BCLASS_DESC";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':closeout_nr', $this->closeout_nr);

        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_meters()
    {
        Utilities::sanitize($this);
        // write_log(json_encode($this), __FILE__, __LINE__);

        $query = "
            SELECT DISTINCT CLOSEOUT_METER.*,
                BA_METERS.BAM_QTY_TYPE,
                DECODE(BAM_QTY_TYPE, 1, 'KG', 'VOL') BAM_QTY_TYPE_STR,
                GUI_PIPENODE.STREAM_BASECODE,
                GUI_PIPENODE.STREAM_BASENAME,
                GUI_PIPENODE.STREAM_TANKCODE,
                GUI_PIPENODE.STREAM_TANKTEMP,
                GUI_PIPENODE.STREAM_TANKDEN
            FROM CLOSEOUT_METER, BA_METERS, GUI_PIPENODE
            WHERE CLOSEOUT_METER.METER_CODE = BA_METERS.BAM_CODE
                AND CLOSEOUT_METER.METER_CODE = GUI_PIPENODE.STREAM_MTRCODE
                AND BA_METERS.BAM_CODE = GUI_PIPENODE.STREAM_MTRCODE
                AND CLOSEOUT_METER.CLOSEOUT_NR = :closeout_nr
            ORDER BY CLOSEOUT_NR, METER_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':closeout_nr', $this->closeout_nr);

        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function create_reports()
    {
        Utilities::sanitize($this);

        $query = "SELECT SITE_CODE FROM SITE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
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
        if (oci_execute($stmt)) {
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
        Utilities::sanitize($this);

        $query = "SELECT SITE_CODE FROM SITE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
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
            $result["message"] = "folio folder does not exist.";
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
        // write_log(json_encode($reports), __FILE__, __LINE__);
        $result = array();
        $result["records"] = $reports;

        http_response_code(200);
        if ($count > 0) {
            echo json_encode($result, JSON_PRETTY_PRINT);
        } else {
            $result["message"] = "No record found.";
            echo json_encode($result, JSON_PRETTY_PRINT);
        }

        return $reports;
    }
}
