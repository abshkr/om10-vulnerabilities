<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

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
    );

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
            SELECT * FROM CLOSEOUT_TANK
            WHERE CLOSEOUT_NR = :closeout_nr
            ORDER BY TANK_CODE";
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
            SELECT * FROM CLOSEOUT_METER
            WHERE CLOSEOUT_NR = :closeout_nr
            ORDER BY METER_CODE";
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
        $output = shell_exec($closeout);
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
