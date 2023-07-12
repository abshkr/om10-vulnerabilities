<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../config/setups.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/closeout_service.php';
include_once __DIR__ . '/../service/company_service.php';
include_once 'common_class.php';

class OndemandReport extends CommonClass
{
    protected $TABLE_NAME = 'GUI_REPORT_PROFILE';
    private $curr_cmpy = null;
    private $is_manager = true;

    public $BOOLEAN_FIELDS = array(
        "FOLIO_NUMBER_PARAMETERS" => 1,
    );

    public $NUMBER_FIELDS = array(
        "closeout_nr",
        "MVITM_QTY_SCHD",
        "MVITM_QTY_MOVE",
        "MVITM_QTY_DELV"
    );

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
        $this->initilize();
    }

    private function initilize()
    {
        if (AUTH_CHECK) {
            if (JWT_AUTH) {
                $token = check_token(get_http_token());
                if (!$token) {
                    write_log("Authentication check failed, cannot continue", __FILE__, __LINE__);
                } else {
                    $token->per_code;

                    $query = "
                        SELECT PER_CMPY, SITE_MNGR, DECODE(SITE_MNGR, PER_CMPY, 'Y', 'F') IS_MANAGER
                        FROM PERSONNEL, SITE
                        WHERE PER_CODE = :curr_per";

                    $stmt = oci_parse($this->conn, $query);
                    oci_bind_by_name($stmt, ':curr_per', $token->per_code);
                    if (oci_execute($stmt, $this->commit_mode)) {
                        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
                        $this->curr_cmpy = $row['PER_CMPY'];
                        $this->is_manager = ($row['IS_MANAGER'] === 'Y');

                        write_log("curr_cmpy:" . $this->curr_cmpy .
                            ", is_manager:" . $this->is_manager,
                            __FILE__, __LINE__);
                    } else {
                        $e = oci_error($stmt);
                        write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    }
                }
            } else {
                if (isset($_SESSION['SESSION'])) {
                    $this->curr_cmpy = strip_tags($_SESSION['COMPANY']);
                    $this->is_manager = (strip_tags($_SESSION['MANAGER']) === 'T' ||
                        strip_tags($_SESSION['MANAGER']) === 'Y');
                    write_log("sess_id:" . $_SESSION['SESSION'] . ", curr_cmpy:" .
                        $this->curr_cmpy . ", is_manager:" . $this->is_manager,
                        __FILE__, __LINE__);
                }
            }
        }
    }

    public function create_report()
    {
        write_log(__METHOD__ . " START." . __FILE__, __LINE__);
        $rpt_file = rawurlencode(strip_tags($this->report));
        $query = "
            SELECT ARGUMENT_NAME, ARGUMENT_TYPE, REPORT_FILES.JASPER_FILE, LANG_ID
            FROM REPORT_FILTER, REPORT_FILES
            WHERE REPORT_FILTER.JASPER_FILE = REPORT_FILES.JASPER_FILE AND RPT_FILE = :rpt_file 
            ORDER BY ARGUMENT_SEQ
            ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':rpt_file', $rpt_file);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return -1;
        }

        $bin = "/usr/omega/bin/";
        if (isset($_SERVER["BIN"])) {
            $bin = $_SERVER["BIN"];
        }

        if (strpos($this->report, ".jrxml") !== false) {
            $this->report = substr($this->report, 0, strpos($this->report, ".jrxml"));
        }
        $output_file = $_SERVER['DOCUMENT_ROOT'] . "/reports/" . $this->report . "." . $this->output;

        $params_str = "";
        $jasper_file = "";
        $lang = "ENG";
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $filter = $row['ARGUMENT_NAME'];
            $filter_type = $row['ARGUMENT_TYPE'];
            $jasper_file = $row['JASPER_FILE'];
            $lang = $row['LANG_ID'];
            if ($filter === "START_DATE") {
                $params_str .= sprintf(" START_DATE:'%s'", $this->start_date);
            } else if ($filter === "END_DATE") {
                $params_str .= sprintf(" END_DATE:'%s'", $this->end_date);
            } else if ($filter === "START_NR") {
                $params_str .= sprintf(" START_NR:'%s'", $this->start_date);
            } else if ($filter === "END_NR") {
                $params_str .= sprintf(" END_NR:'%s'", $this->end_date);
            } else {
                $lowercase = strtolower($filter);
                if (isset($this->$lowercase)) {
                    $params_str .= " " . $filter . ":" . $this->$lowercase;
                } else {
                    if ($filter_type != "LIST") {
                        $params_str .= " \"" . $filter . ":%\"";
                    }
                }
            }
        }
        
        if ($lang == "CHN") {
            $params_str .= " REPORT_LOCALE:zh_CN ";
        }

        //Sample: ./JReport.sh /usr/omega/bin/jasper/Carr_Loadings.jasper /var/www/htdocs/reports/1636338933ANYcarr_loadings_e.pdf pdf CARRIER_CODE:%START_DATE:2021-10-24 13:28:28END_DATE:2021-11-08 13:28:28
        $jasper_file = $bin . "/jasper/" . $jasper_file;
        if (!file_exists($jasper_file)) {
            write_log(sprintf("jasper file %s does not exist", $jasper_file), __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__JASPER_FILE_NOT_EXIST__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
            return;
        }

        $script_path = $bin . "/JReport.sh";
        $jreport_cmd = $script_path . " " . $jasper_file . " " . $output_file . " " . $this->output . " " .  $params_str;
        
        write_log(sprintf("to run %s", $jreport_cmd), __FILE__, __LINE__, LogLevel::INFO);
        foreach ($_SERVER as $env_key => $env_value) {
            putenv("$env_key=$env_value");
        }

        $output = shell_exec($jreport_cmd);
        // write_log(sprintf("result %s", $output), __FILE__, __LINE__, LogLevel::INFO);
        if (strpos($output, "Created file")) {
            $jasper_result = array(
                'result' => $array['result'],
                'filepath' => 'reports/' . $this->report . '.' . $this->output);
            echo json_encode($jasper_result, JSON_PRETTY_PRINT);
        } else {
            write_log("Jasper report creation failed. output: " . $output, __FILE__, __LINE__, LogLevel::ERROR);
            $error = new EchoSchema(400, response("__CGI_FAILED__"));
            echo json_encode($error, JSON_PRETTY_PRINT);
        }
    }

    // get all suppliers
    public function suppliers()
    {
        write_log(__METHOD__ . " START. is_manager:" . $this->is_manager, __FILE__, __LINE__);
        
        if ($this->is_manager) {
            $query = "
                SELECT DISTINCT CMPY_CODE,
                    CMPY_NAME
                FROM
                    COMPANYS, REPORT_CMPY
                WHERE REPORT_CMPY.RPT_CMPY = COMPANYS.CMPY_CODE
                ORDER BY CMPY_CODE";

            $stmt = oci_parse($this->conn, $query);
        } else {
            $query = "
                SELECT CMPY_CODE, CMPY_NAME
                FROM
                    COMPANYS
                WHERE COMPANYS.CMPY_CODE = :curr_cmpy
                ORDER BY CMPY_CODE";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':curr_cmpy', $this->curr_cmpy);
        }

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all drawers
    public function drawers()
    {
        $query = "
            SELECT CMPY_CODE,
                CMPY_NAME,
                CMPY_CODE||' - '||CMPY_NAME AS CMPY_DESC
            FROM
                COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 4)) <> 0
            ORDER BY CMPY_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all carriers
    public function carriers()
    {
        $serv = new CompanyService($this->conn);
        return $serv->carriers($plus_any = true);

        // write_log(__METHOD__ . " START. is_manager:" . $this->is_manager, __FILE__, __LINE__);

        // $query = " SELECT 'ANY' CMPY_CODE, 'ALL' CMPY_NAME, 'ANY - ALL' CMPY_DESC FROM DUAL UNION ";
        // if ($this->is_manager) {
        //     $query .= "
        //         SELECT CMPY_CODE,
        //             CMPY_NAME,
        //             CMPY_CODE||' - '||CMPY_NAME AS CMPY_DESC
        //         FROM
        //             COMPANYS
        //         WHERE BITAND(CMPY_TYPE, POWER(2, 2)) <> 0
        //         ORDER BY CMPY_NAME DESC";
        //     $stmt = oci_parse($this->conn, $query);
        // } else {
        //     // CHILD_CMPY_ROLE == 2 means carrier
        //     $query .= "
        //         SELECT CMPY_CODE,
        //             CMPY_NAME,
        //             CMPY_CODE||' - '||CMPY_NAME AS CMPY_DESC
        //         FROM COMPANY_RELATION, COMPANYS
        //         WHERE PARENT_CMPY_CODE = :curr_cmpy
        //             AND CHILD_CMPY_ROLE = 2
        //             AND CHILD_CMPY_CODE = COMPANYS.CMPY_CODE
        //             ORDER BY CMPY_NAME DESC";
        //     $stmt = oci_parse($this->conn, $query);
        //     oci_bind_by_name($stmt, ':curr_cmpy', $this->curr_cmpy);
        // }

        // if (oci_execute($stmt, $this->commit_mode)) {
        //     return $stmt;
        // } else {
        //     return null;
        // }
    }

    // get all customers
    public function customers()
    {
        $serv = new CompanyService($this->conn);
        return $serv->customers($plus_any = true);
    }

    // get all drawers
    public function terminals()
    {
        $query = "
            SELECT TERM_CODE, TERM_NAME
                TERM_NAME,
                TERM_CODE||' - '||TERM_NAME AS TERM_DESC
            FROM
                TERMINAL
            ORDER BY TERM_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all reports of supplier
    public function reports()
    {
        $query = "
            SELECT ONDEMAND_TITLE,
                REPORT_FILES.RPT_FILE,
                JASPER_FILE,
                IS_CLOSEOUT_REPORT FOLIO_NUMBER_PARAMETERS
            FROM REPORT_FILES, REPORT_CMPY
            WHERE REPORT_FILES.RPT_FILE = REPORT_CMPY.RPT_FILE
                AND RPT_CMPY = :cmpy_code
                AND BITAND(ONDEMAND_FLAG, 1) = 1
            ORDER BY ONDEMAND_TITLE";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all parameters of report
    public function filters()
    {
        if (isset($this->jasper_file)) {
            $query = "SELECT DECODE(ARGUMENT_NAME,
                            'CMPY_CODE', 'SUPP_CODE',
                            'SUPPLIER_CODE', 'SUPP_CODE',
                            ARGUMENT_NAME) ARGUMENT_NAME
                    FROM REPORT_FILTER
                    WHERE JASPER_FILE = :jasper_file
                    ORDER BY ARGUMENT_SEQ";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':jasper_file', $this->jasper_file);
        } else {
            $query = "SELECT DECODE(ARGUMENT_NAME,
                            'CMPY_CODE', 'SUPP_CODE',
                            'SUPPLIER_CODE', 'SUPP_CODE',
                            ARGUMENT_NAME) ARGUMENT_NAME
                    FROM REPORT_FILTER, REPORT_FILES
                    WHERE REPORT_FILTER.JASPER_FILE = REPORT_FILES.JASPER_FILE
                        AND REPORT_FILES.RPT_FILE = :rpt_file
                    ORDER BY ARGUMENT_SEQ";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':rpt_file', $this->rpt_file);
        }
        
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all reports of supplier
    public function closeout_nrs()
    {
        $serv = new CloseoutService($this->conn);
        if (isset($this->start_date) && isset($this->end_date)) {
            return $serv->closeout_nrs($this->start_date, $this->end_date);
        }
        
        return $serv->closeout_nrs();
    }
}
