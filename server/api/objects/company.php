<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';
include_once __DIR__ . '/../service/company_service.php';

class Company extends CommonClass
{
    protected $TABLE_NAME = 'COMPANYS';
    protected $VIEW_NAME = 'GUI_COMPANYS';
    public $NUMBER_FIELDS = array(
        "CMPY_ORD_END",
        "CMPY_ORD_LAST",
        "CMPY_ORD_STRT",
        "CMPY_TRIP_END",
        "CMPY_TRIP_LAST",
        "CMPY_TRIP_STRT",
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "TRSA_REVERSE_FLAG" => 1,
        "SITE_MANAGER" => "T",
        "SUPPLIER" => "Y",
        "CARRIER" => "Y",
        "CUSTOMER" => "Y",
        "DRAWER" => "Y",
        "ISSUER" => "Y",
        "EMPLOYER" => "Y",
        "HOST" => "Y",
        "CMPY_AUTO_LD" => "Y",
        "CMPY_AUTO_RECONC" => "Y",
        "CMPY_BAY_LOOP_CH" => "Y",
        "CMPY_BLTOL_FLAG" => 1,
        "CMPY_COMMS_OK" => "Y",
        "CMPY_ENABLE_EXPD" => "Y",
        "CMPY_FLAG_1" => "Y",
        "CMPY_FLAG_2" => "Y",
        "CMPY_FLAG_3" => "Y",
        "CMPY_HOST_DOCS" => "Y",
        "CMPY_LDTOL_FLAG" => 1,
        "CMPY_LOG_LD_DEL" => "Y",
        "CMPY_MOD_DRAWER" => "Y",
        "CMPY_MUST_SEALNO" => "Y",
        "CMPY_ORD_CARRIER" => "Y",
        "CMPY_TKR_ACTIVAT" => "Y",
        "CMPY_TKR_CFG" => "Y",
        "CMPY_WGH_COMPLET" => "Y",
        "CMPY_WIPE_ORDETS" => "Y",
        "CMPY_SCHD_REV_REPOST" => "Y",
        "CMPY_SCHD_ARCHIVE" => "Y",
        "CMPY_MOVEMENTS_REV" => "Y",
        "SEND_TO_PRINTER" => "Y",
        "DEFAULT_FLAG" => "Y",
        "CMPY_ADD_PROMPT" => "Y",
        "CMPY_CHECK_LICEN" => "Y",
        "CMPY_WGH_AUTO_FL" => "Y"
    );

    public function pre_create()
    {
        if (!isset($this->cmpy_trip_strt)) {
            $this->cmpy_trip_strt = 1;
        }
        if (!isset($this->cmpy_trip_end)) {
            $this->cmpy_trip_end = 999999999;
        }
        if (!isset($this->cmpy_ord_strt)) {
            $this->cmpy_ord_strt = 1;
        }
        if (!isset($this->cmpy_ord_end)) {
            $this->cmpy_ord_end = 999999999;
        }
    }

    protected function post_delete()
    {
        $query = "DELETE FROM COMPANY_CONFIG WHERE CMPY_CODE = :cmpy_code";
        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            oci_rollback($this->conn);
            return false;
        }

        return true;
    }

    protected function post_update()
    {
        if (isset($this->company_configs)) {
            foreach($this->company_configs as $config) {
                $query = "SELECT COUNT(*) CN FROM COMPANY_CONFIG
                    WHERE CONFIG_KEY = :config_key AND CMPY_CODE = :cmpy_code";
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
                oci_bind_by_name($stmt, ':config_key', $config->confic_key);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    return false;
                }

                $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
                if ($row['CN'] > 0) {
                    // write_log("Update COMPANY_CONFIG.", __FILE__, __LINE__, LogLevel::ERROR);
                    $query = "UPDATE COMPANY_CONFIG
                        SET CONFIG_VALUE = :config_value
                        WHERE CONFIG_KEY = :config_key AND CMPY_CODE = :cmpy_code";
                } else {
                    // write_log("Insert COMPANY_CONFIG.", __FILE__, __LINE__, LogLevel::ERROR);
                    $query = "INSERT INTO COMPANY_CONFIG (CMPY_CODE, CONFIG_KEY, CONFIG_VALUE) 
                        VALUES (:cmpy_code, :config_key, :config_value)";
                }
                $stmt = oci_parse($this->conn, $query);
                oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
                oci_bind_by_name($stmt, ':config_key', $config->config_key);
                oci_bind_by_name($stmt, ':config_value', $config->config_value);
                if (!oci_execute($stmt, $this->commit_mode)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        return true;
    }

    public function read()
    {
        $query = "
            SELECT * FROM " . $this->VIEW_NAME . " ORDER BY CMPY_CODE";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    // public function read_hook(&$hook_item)
    // {
    //     write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
    //         __FILE__, __LINE__);

    //     $result = array();
    //     $hook_item['company_configs'] = $result;
    //     // write_log(json_encode($hook_item), __FILE__, __LINE__);

    //     if (!array_key_exists('cmpy_code', $hook_item)) {
    //         write_log("hook_item does not have cmpy_code item, cannot do read_hook",
    //             __FILE__, __LINE__, LogLevel::ERROR);
    //         return;
    //     }

    //     $query = "
    //         SELECT * FROM COMPANY_CONFIG 
    //         WHERE CMPY_CODE = :cmpy_code";
    //     $stmt = oci_parse($this->conn, $query);
    //     oci_bind_by_name($stmt, ':cmpy_code', $hook_item['cmpy_code']);
    //     if (!oci_execute($stmt, $this->commit_mode)) {
    //         $e = oci_error($stmt);
    //         write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return;
    //     }

    //     Utilities::retrieve($result, $this, $stmt, $method=__FUNCTION__);
    //     $hook_item['company_configs'] = $result;
    // }

    public function document_printers()
    {
        $query = "
            SELECT DISTINCT P.CMPY, P.PRNTR, CMP.CMPY_BOL_VP_NAME, U.PRNF_USE AS USAGE 
            FROM PRNTR_CMPY_USAGE P, PRNT_USE U, COMPANYS CMP 
            WHERE P.USAGE = U.USAGE
                AND (P.CMPY IN (:cmpy_code, 'ANY') OR (P.CMPY IS NULL))
                AND U.PRNF_USE = 'DOCUMENT'
                AND PRNTR = CMP.CMPY_BOL_VP_NAME(+)";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function report_printers()
    {
        $query = "
            SELECT DISTINCT P.CMPY, P.PRNTR, CMP.CMPY_BOL_VP_NAME, U.PRNF_USE AS USAGE 
            FROM PRNTR_CMPY_USAGE P, PRNT_USE U, COMPANYS CMP 
            WHERE P.USAGE = U.USAGE
                AND (P.CMPY IN (:cmpy_code, 'ANY') OR (P.CMPY IS NULL))
                AND U.PRNF_USE = 'LD_REPORT'
                AND PRNTR = CMP.CMPY_BOL_VP_NAME(+)";

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function dli_printers()
    {
        $query = "
            SELECT DISTINCT P.CMPY, P.PRNTR, CMP.CMPY_BOL_VP_NAME, U.PRNF_USE AS USAGE 
            FROM PRNTR_CMPY_USAGE P, PRNT_USE U, COMPANYS CMP 
            WHERE P.USAGE = U.USAGE
                AND (P.CMPY IN (:cmpy_code, 'ANY') OR (P.CMPY IS NULL))
                AND U.PRNF_USE = 'INSTRUCT'
                AND PRNTR = CMP.CMPY_BOL_VP_NAME(+)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function cmpy_configs()
    {
        write_log($this->cmpy_code, __FILE__, __LINE__);

        $query = "
            SELECT * FROM COMPANY_CONFIG
            WHERE CMPY_CODE = :cmpy_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
    
    
    public function issuers()
    {
        //5 == issuer
        $query = "
            SELECT CMPY_CODE, CMPY_NAME
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 5)) != 0
            ORDER BY CMPY_NAME ASC";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function drawers()
    {
        //5 == issuer
        $query = "
            SELECT CMPY_CODE, CMPY_NAME
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 4)) != 0
            ORDER BY CMPY_NAME ASC";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function suppliers()
    {
        //5 == issuer
        $query = "
            SELECT CMPY_CODE, CMPY_NAME
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 1)) != 0
            ORDER BY CMPY_NAME ASC";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function supp_customers()
    {
        $query = "
            SELECT CUST.CUST_ACCT AS CUST_ACNT,
                CUST.CUST_SUPP AS CUST_SUPP_CODE,
                SCMP.CMPY_NAME AS CUST_SUPP_NAME,
                CUST.CUST_CODE AS CUST_CMPY_CODE,
                CCMP.CMPY_NAME AS CUST_CMPY_NAME,
                CUST.CUST_ACCT||' - '||CCMP.CMPY_NAME AS CUST_DESC
            FROM CUSTOMER CUST, COMPANYS SCMP, COMPANYS CCMP
            WHERE CUST.CUST_SUPP = SCMP.CMPY_CODE
                AND CUST.CUST_CODE = CCMP.CMPY_CODE
                AND (:supplier = '-1' OR CUST_SUPP = :supplier)
            ORDER BY CUST_ACCT";
        $stmt = oci_parse($this->conn, $query);
        if (!isset($this->supplier)) {
            $this->supplier = '-1';
        }
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            return null;
        }
    }

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

    public function employers()
    {
        //5 == issuer
        $query = "
            SELECT CMPY_CODE, CMPY_NAME
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 6)) != 0
            ORDER BY CMPY_NAME ASC";

        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function carriers()
    {
        $query = "
            SELECT CMPY_CODE, CMPY_NAME
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 2)) != 0
            ORDER BY CMPY_NAME ASC";

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
