<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once __DIR__ . '/../service/company_service.php';
include_once __DIR__ . '/../service/tanker_service.php';
include_once __DIR__ . '/../service/unit_service.php';
include_once 'common_class.php';

class Schedule extends CommonClass
{
    protected $TABLE_NAME = 'SCHEDULE';
    protected $VIEW_NAME = 'GUI_SCHEDULES';
    // protected $primary_keys = array("area_k");

    public $NUMBER_FIELDS = array(
        "SHLS_TRIP_NO",
        "ORDER_NO",
        "ORDER_CUST_ORDNO",
        "QTY_AMB",
        "QTY_STD",
        "QTY_KG",
        "QTY_LOADED",
        "QTY_PRELOADED",
        "QTY_SCHEDULED",
        "SCHDSPEC_SHLSTRIP",
        "QTY_PRELOAD",
        "COMPARTMENT"
    );

    //All the fields that should be treated as BOOLEAN in JSON
    public $BOOLEAN_FIELDS = array(
        "CMPY_SCHD_ARCHIVE" => "Y",
        "CMPY_SCHD_REV_REPOST" => "Y"
    );

    public function suppliers()
    {
        $company_service = new CompanyService($this->conn);
        return $company_service->suppliers();
    }

    public function drawers()
    {
        $company_service = new CompanyService($this->conn);
        return $company_service->drawers();
    }

    public function carriers()
    {
        $company_service = new CompanyService($this->conn);
        return $company_service->carriers();
    }

    public function tankers_by_carrier()
    {
        $company_service = new TankerService($this->conn);
        return $company_service->tankers_by_carrier($this->tnkr_carrier);
    }

    public function next_trip_no()
    {
        $company_service = new CompanyService($this->conn, $this->supplier_code, $auto_commit = true);
        $new_cust_order = $company_service->next_trip_no();

        $result = array();
        $result["records"] = array();
        $item = array(
            "next_trip_no" => $new_cust_order,
        );

        array_push($result["records"], $item);

        http_response_code(200);
        echo json_encode($result, JSON_PRETTY_PRINT);
        return array(); //Return array to prevent caller doing extra work
    }

    public function unit_types()
    {
        $unit_service = new UnitService($this->conn);
        return $unit_service->loadable_unit_types();
    }

    public function drawer_products()
    {
        $query = "
            SELECT PROD_CODE, PROD_NAME FROM PRODUCTS 
            WHERE PROD_CMPY = :cmpy_code
            ORDER BY PROD_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->drawer_code);
        
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function search()
    {
        if (isset($this->shls_trip_no)) {
            $shls_trip_no = '%' . $this->shls_trip_no . '%';
        }

        $query = "
                SELECT * FROM " . $this->VIEW_NAME . "
                WHERE SHLS_TRIP_NO LIKE :shls_trip_no
                ORDER BY SHLS_TRIP_NO";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':shls_trip_no', $shls_trip_no);
        
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read()
    {
        if (!isset($this->start_date)) {
            $query = "
            SELECT * FROM " . $this->VIEW_NAME . "
            WHERE SHLS_CALDATE > TO_CHAR(SYSDATE - 7, 'YYYY-MM-DD HH24:MI:SS')
            ORDER BY SHLS_CALDATE DESC";
            $stmt = oci_parse($this->conn, $query);
        
        } else {
            $query = "
                SELECT * FROM " . $this->VIEW_NAME . "
                WHERE SHLS_CALDATE > :start_date AND SHLS_CALDATE < :end_date
                ORDER BY SHLS_CALDATE DESC";
            $stmt = oci_parse($this->conn, $query);
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

    public function get_product_details()
    {
        write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);

        $sched_service = new ScheduleService($this->conn);
        $this->drawer_code = $sched_service->shls_drawer($this->shls_trip_no, $this->supplier_code);

        write_log(json_encode($this), __FILE__, __LINE__);

        $query = "
        SELECT UNIT_CODE,
            QTY_SCHEDULED,
            NVL(PRODUCTS.PROD_CODE, LOADED.PROD_CODE) PROD_CODE,
            NVL(PRODUCTS.PROD_NAME, LOADED.PROD_NAME) PROD_NAME,
            NVL(PRODUCTS.PROD_CMPY, LOADED.PROD_CMPY) PROD_CMPY,
            QTY_LOADED,
            UNIT_NAME, 
            QTY_PRELOADED,
            QTY_AMB,
            QTY_STD,
            QTY_KG
        FROM PRODUCTS,
        (
            SELECT SPEC_PR.UNIT_CODE, 
                SPEC_PR.QTY_SCHEDULED, 
                SPEC_PR.PROD_CODE, 
                SPEC_PR.PROD_NAME, 
                SPEC_PR.PROD_CMPY, 
                DECODE(SPEC_PR.SCHP_UNITS, 5, TRSF.TRIP_QTY_AMB, 11, TRSF.TRIP_QTY_STD, 17, TRSF.TRIP_QTY_KG, TRSF.TRIP_QTY_DELIVERED) 
                    AS QTY_LOADED, 
                UV.DESCRIPTION AS UNIT_NAME, 
                CMPT.TRIP_QTY_PRELOAD QTY_PRELOADED, 
                TRSF.TRIP_QTY_AMB QTY_AMB, 
                TRSF.TRIP_QTY_STD QTY_STD, 
                TRSF.TRIP_QTY_KG QTY_KG
            FROM
                (
                    SELECT SCHPSPID_SHLSTRIP, 
                        SCHPSPID_SHLSSUPP,
                        SCHP_UNITS,
                        PROD_CLASS,
                        SPEC.SCHP_UNITS AS UNIT_CODE,
                        SPEC.SCHP_SPECQTY AS QTY_SCHEDULED,
                        PR.PROD_CODE AS PROD_CODE,
                        PR.PROD_NAME AS PROD_NAME,
                        PR.PROD_CMPY AS PROD_CMPY
                    FROM SPECPROD SPEC, PRODUCTS PR
                    WHERE SPEC.SCHPPROD_PRODCMPY = PR.PROD_CMPY
                        AND SPEC.SCHPPROD_PRODCODE = PR.PROD_CODE
                        AND SPEC.SCHPSPID_SHLSTRIP = :shls_trip_no
                        AND SPEC.SCHPSPID_SHLSSUPP = :shls_supp
                ) SPEC_PR, 
                UNIT_SCALE_VW UV, 
                (
                    SELECT SPECDETS.SCHDSPEC_SHLSSUPP AS TRIP_SUPPLIER,
                        SPECDETS.SCHDSPEC_SHLSTRIP AS TRIP_NO,
                        SPECDETS.SCHDPROD_PRODCMPY AS TRIP_PRODCMPY,
                        SPECDETS.SCHDPROD_PRODCODE AS TRIP_PRODCODE,
                        SUM(SPECDETS.SCHD_PRESETQTY) AS TRIP_QTY_PRESET,
                        SUM(SPECDETS.SCHD_PRLDQTY) AS TRIP_QTY_PRELOAD,
                        SUM(SPECDETS.SCHD_SPECQTY) AS TRIP_QTY_SCHED,
                        SUM(SPECDETS.SCHD_DELIVERED) AS TRIP_QTY_LOADED,
                        PRODUCTS.PROD_CLASS
                    FROM SPECDETS, PRODUCTS
                    WHERE SCHDPROD_PRODCMPY = PRODUCTS.PROD_CMPY AND SCHDPROD_PRODCODE = PROD_CODE
                    GROUP BY SCHDSPEC_SHLSSUPP, SCHDSPEC_SHLSTRIP, SCHDPROD_PRODCMPY, SCHDPROD_PRODCODE, PROD_CLASS
                ) CMPT, 
                (
                    SELECT SCHEDULE.SHLS_SUPP AS TRIP_SUPPLIER, PROD_CLASS,
                        SCHEDULE.SHLS_TRIP_NO AS TRIP_NO,
                        TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY,
                        TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE,
                        SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB,
                        SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD,
                        SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG,
                        SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN,
                        SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG,
                        SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
                    FROM SCHEDULE, LOADS, TRANSACTIONS, TRANSFERS, PRODUCTS
                    WHERE SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
                        AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
                        AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
                        AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
                        AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
                        AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
                        AND TRSFPROD_PRODCODE = PROD_CODE AND TRSFPROD_PRODCMPY = PROD_CMPY
                    GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSFPROD_PRODCMPY, 
                        TRANSFERS.TRSFPROD_PRODCODE, PROD_CLASS
                ) TRSF
            WHERE SPEC_PR.SCHPSPID_SHLSSUPP = CMPT.TRIP_SUPPLIER (+)
                AND SPEC_PR.SCHPSPID_SHLSTRIP = CMPT.TRIP_NO (+)
                AND SPEC_PR.PROD_CLASS = CMPT.PROD_CLASS (+)
                AND CMPT.TRIP_SUPPLIER = TRSF.TRIP_SUPPLIER (+)
                AND CMPT.TRIP_NO = TRSF.TRIP_NO (+)
                AND CMPT.PROD_CLASS = TRSF.PROD_CLASS (+)
                AND UV.UNIT_ID = SPEC_PR.SCHP_UNITS
        ) LOADED
        WHERE PRODUCTS.PROD_CMPY = LOADED.PROD_CMPY(+)
            AND PRODUCTS.PROD_CODE = LOADED.PROD_CODE(+)
            AND PRODUCTS.PROD_CMPY = :drawer_code
        ORDER BY PRODUCTS.PROD_CODE";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':shls_trip_no', $this->shls_trip_no);
        oci_bind_by_name($stmt, ':shls_supp', $this->supplier_code);
        oci_bind_by_name($stmt, ':drawer_code', $this->drawer_code);
        
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_cmpt_details()
    {
        write_log(json_encode($this), __FILE__, __LINE__);
        $query = "
        SELECT SPEC_PROD.COMPARTMENT, 
            SPEC_PROD.PROD_CODE, 
            SPEC_PROD.PROD_NAME, 
            SPEC_PROD.PROD_CMPY,
            SPEC_PROD.UNIT_CODE, 
            SPEC_PROD.UNIT_NAME, 
            SPEC_PROD.QTY_SCHEDULED, 
            SPEC_PROD.QTY_PRELOAD,
            SPEC_PROD.SCHDSPEC_SHLSTRIP, 
            SPEC_PROD.SCHDSPEC_SHLSSUPP, 
            SPEC_PROD.SCHD_SOLD_TO_NUM,
            SPEC_PROD.SCHD_SHIP_TO_NUM, 
            SPEC_PROD.SCHD_DELIV_NUM, 
            SPEC_PROD.PROD_CLASS, 
            DECODE(SPEC_PROD.UNIT_CODE, 5, TRSF.TRIP_QTY_AMB, 11, TRSF.TRIP_QTY_STD, 17, TRSF.TRIP_QTY_KG, TRSF.TRIP_QTY_DELIVERED) 
                AS QTY_LOADED, 
            TRSF.TRIP_QTY_AMB QTY_AMB, 
            TRSF.TRIP_QTY_STD QTY_STD, 
            TRSF.TRIP_QTY_KG QTY_KG        
        FROM
            (
                SELECT SPEC.SCHD_COMP_ID AS COMPARTMENT,
                    PR.PROD_CODE AS PROD_CODE,
                    PR.PROD_NAME AS PROD_NAME,
                    PR.PROD_CMPY AS PROD_CMPY,
                    SPEC.SCHD_UNITS AS UNIT_CODE,
                    UV.DESCRIPTION AS UNIT_NAME,
                    SPEC.SCHD_SPECQTY AS QTY_SCHEDULED,
                    SPEC.SCHD_PRLDQTY QTY_PRELOAD,
                    SPEC.SCHDSPEC_SHLSTRIP,
                    SPEC.SCHDSPEC_SHLSSUPP,
                    SPEC.SCHD_SOLD_TO_NUM,
                    SPEC.SCHD_SHIP_TO_NUM,
                    SPEC.SCHD_DELIV_NUM,
                    PR.PROD_CLASS
                FROM SPECDETS SPEC,
                PRODUCTS PR,
                UNIT_SCALE_VW UV
                        WHERE SPEC.SCHDPROD_PRODCMPY = PR.PROD_CMPY
                            AND SPEC.SCHDPROD_PRODCODE = PR.PROD_CODE
                            AND UV.UNIT_ID = SPEC.SCHD_UNITS
                            AND SPEC.SCHDSPEC_SHLSTRIP = :shls_trip_no 
                            AND SPEC.SCHDSPEC_SHLSSUPP = :shls_supp
            ) SPEC_PROD, 
            (
                SELECT SCHEDULE.SHLS_SUPP AS TRIP_SUPPLIER,
                    PRODUCTS.PROD_CLASS AS PROD_CLASS,
                    SCHEDULE.SHLS_TRIP_NO AS TRIP_NO,
                    TRANSFERS.TRSF_DES AS TRIP_COMPARTMENT,
                    TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY,
                    TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE,
                    SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB,
                    SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD,
                    SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG,
                    SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN,
                    SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG,
                    SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
                FROM SCHEDULE, LOADS, TRANSACTIONS, TRANSFERS, PRODUCTS
                WHERE SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
                    AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
                    AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
                    AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
                    AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
                    AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
                    AND TRSFPROD_PRODCMPY = PRODUCTS.PROD_CMPY AND TRSFPROD_PRODCODE = PRODUCTS.PROD_CODE
                GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, 
                    TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE, PROD_CLASS
            ) TRSF
        WHERE
            SPEC_PROD.SCHDSPEC_SHLSSUPP = TRSF.TRIP_SUPPLIER (+)
            AND SPEC_PROD.SCHDSPEC_SHLSTRIP = TRSF.TRIP_NO (+)
            AND SPEC_PROD.COMPARTMENT = TRSF.TRIP_COMPARTMENT (+)
            AND SPEC_PROD.PROD_CLASS = TRSF.PROD_CLASS (+)
        ORDER BY SPEC_PROD.SCHDSPEC_SHLSSUPP, SPEC_PROD.SCHDSPEC_SHLSTRIP, SPEC_PROD.COMPARTMENT
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':shls_trip_no', $this->shls_trip_no);
        oci_bind_by_name($stmt, ':shls_supp', $this->supplier_code);
        
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
