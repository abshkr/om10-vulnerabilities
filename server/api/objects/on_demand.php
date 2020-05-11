<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../config/setups.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/closeout_service.php';
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
                        $this->is_manager = $row['IS_MANAGER'];

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

        if (!isset($this->company)) {
            $this->company = "";
        }
        
        $query_string = "output=" . $this->output . "&company=" . $this->company .
            "&report=" . $this->report;
        if (isset($this->start_date)) {
            $query_string = $query_string . "&startdate=" . rawurlencode(strip_tags($this->start_date));
        }
        if (isset($this->end_date)) {
            $query_string = $query_string . "&enddate=" . rawurlencode(strip_tags($this->end_date));
        }
 
        $cgi_result = Utilities::http_cgi_invoke("cgi-bin/en/rpt_adm/jasper_reports.cgi", $query_string);
        $xml = simplexml_load_string($cgi_result);
        // echo json_encode($xml, JSON_PRETTY_PRINT);
        $json = json_encode($xml);
        $array = json_decode($json, TRUE);
        if ($array['result'] === 'OK') {
            write_log("Jasper report created. report:" . $array['report'] . ", created:" . $array['filepath'], __FILE__, __LINE__, LogLevel::INFO);
            $jasper_result = array(
                'result' => $array['result'],
                'filepath' => JASPERREPORT_DIR . $array['filepath']);

            echo json_encode($jasper_result, JSON_PRETTY_PRINT);
        } else {
            write_log("Jasper report creation failed. report:" . $array['report'] . ", created:" . $array['filepath'], __FILE__, __LINE__, LogLevel::ERROR);
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
                CMPY_NAME
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
        write_log(__METHOD__ . " START. is_manager:" . $this->is_manager, __FILE__, __LINE__);

        if ($this->is_manager) {
            $query = "
                SELECT CMPY_CODE,
                    CMPY_NAME
                FROM
                    COMPANYS
                WHERE BITAND(CMPY_TYPE, POWER(2, 2)) <> 0
                ORDER BY CMPY_CODE";

            $stmt = oci_parse($this->conn, $query);
        } else {
            // CHILD_CMPY_ROLE == 2 means carrier
            $query = "
                SELECT CMPY_CODE,
                    CMPY_NAME
                FROM COMPANY_RELATION, COMPANYS
                WHERE PARENT_CMPY_CODE = :curr_cmpy
                    AND CHILD_CMPY_ROLE = 2
                    AND CHILD_CMPY_CODE = COMPANYS.CMPY_CODE
            ";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':curr_cmpy', $this->curr_cmpy);
        }

        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all customers
    public function customers()
    {
        $query = "
            SELECT CMPY_CODE,
                CMPY_NAME
            FROM
                COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 3)) <> 0
            ORDER BY CMPY_CODE";

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
    public function parameters()
    {
        $query = "
            SELECT DECODE(ARGUMENT_NAME,
                'CMPY_CODE', 'SUPP_CODE',
                'SUPPLIER_CODE', 'SUPP_CODE',
                ARGUMENT_NAME) ARGUMENT_NAME
            FROM REPORT_FILTER
            WHERE JASPER_FILE = :jasper_file
            ORDER BY ARGUMENT_SEQ";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':jasper_file', $this->jasper_file);
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
