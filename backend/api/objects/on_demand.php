<?php

include_once __DIR__  . '/../config/journal.php';
include_once __DIR__  . '/../config/log.php';
include_once __DIR__  . '/../config/setups.php';
include_once __DIR__  . '/../shared/utilities.php';

class OndemandReport 
{
    // database connection and table name
    private $conn;
    // private $table_name = "GUI_PERSONNEL";
    private $curr_cmpy = null;
    private $is_manager = true;
    
 
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
                    if (oci_execute($stmt)) {
                        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
                        $this->curr_cmpy = $row['PER_CMPY'];
                        $this->is_manager = $row['IS_MANAGER'];

                        write_log("curr_cmpy:" . $this->curr_cmpy . 
                            ", is_manager:" . $this->is_manager,
                            __FILE__, __LINE__);
                    } else {
                        write_log(oci_error($stmt)['message'], __FILE__, __LINE__);
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

    // get all suppliers
    public function suppliers()
    {
        write_log(__METHOD__ . " START. is_manager:" . $this->is_manager, __FILE__, __LINE__);
        Utilities::sanitize($this);
        
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

        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all drawers
    function drawers()
    {
        $query = "
            SELECT CMPY_CODE, 
                CMPY_NAME                    
            FROM
                COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 4)) <> 0
            ORDER BY CMPY_CODE";
        
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all carriers
    function carriers()
    {
        write_log(__METHOD__ . " START. is_manager:" . $this->is_manager, __FILE__, __LINE__);
        
        Utilities::sanitize($this);

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
        
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all customers
    function customers()
    {
        $query = "
            SELECT CMPY_CODE, 
                CMPY_NAME                    
            FROM
                COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 3)) <> 0
            ORDER BY CMPY_CODE";
        
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all reports of supplier
    function reports()
    {
        Utilities::sanitize($this);

        $query = "
            SELECT ONDEMAND_TITLE, 
                REPORT_FILES.RPT_FILE,
                JASPER_FILE
            FROM REPORT_FILES, REPORT_CMPY
            WHERE REPORT_FILES.RPT_FILE = REPORT_CMPY.RPT_FILE
                AND RPT_CMPY = :cmpy_code
            ORDER BY ONDEMAND_TITLE";
        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all parameters of report
    function parameters()
    {
        Utilities::sanitize($this);

        $query = "
            SELECT DECODE(ARGUMENT_NAME, 
                'CMPY_CODE', 'SUPP_CODE',
                'SUPPLIER_CODE', 'SUPP_CODE',
                ARGUMENT_NAME) ARGUMENT_NAME,
                ARGUMENT_SEQ
            FROM REPORT_FILTER 
            WHERE JASPER_FILE = :jasper_file
            ORDER BY ARGUMENT_SEQ";
        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':jasper_file', $this->jasper_file);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }

    // get all reports of supplier
    function closeout_nrs()
    {
        Utilities::sanitize($this);

        if (isset($this->start_date) && isset($this->end_date)) {
            $query = "
            SELECT CLOSEOUT_NR,
                CLOSEOUT_DATE END_DATE,
                PREV_CLOSEOUT_DATE START_DATE,
                DECODE(STATUS, 
                    0, 'OPEN',
                    1, 'FROZEN',
                    2, 'CLOSE') STATUS
            FROM CLOSEOUTS
            WHERE CLOSEOUT_DATE > :start_date
                AND CLOSEOUT_DATE < :end_date
            ORDER BY CLOSEOUT_NR DESC";
            
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':start_date', $this->start_date);
            oci_bind_by_name($stmt, ':end_date', $this->end_date);         
        } else {
            $query = "
            SELECT CLOSEOUT_NR,
                PREV_CLOSEOUT_DATE START_DATE,
                CLOSEOUT_DATE END_DATE,
                DECODE(STATUS, 
                    0, 'OPEN',
                    1, 'FROZEN',
                    2, 'CLOSE') STATUS
            FROM CLOSEOUTS
            ORDER BY CLOSEOUT_NR DESC";
            $stmt = oci_parse($this->conn, $query);
        }
        
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            return null;
        }
    }
}
