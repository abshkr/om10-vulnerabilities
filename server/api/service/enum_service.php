<?php

include_once __DIR__ . '/../shared/log.php';

class EnumService
{
    public function __construct($db, $auto_commit = false)
    {
        $this->conn = $db;
        
        if ($auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
    }

    public function prod_categories()
    {
        $query = "SELECT * FROM BCLASS_TYP ORDER BY BCLASS_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function corr_mthds()
    {
        $query = "
            SELECT COMPENSATION_ID,
                COMPENSATION_NAME
            FROM COMPENSATION_MTHD
            ORDER BY COMPENSATION_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function schedule_status()
    {
        $query = "
            SELECT *
            FROM SCHEDULE_STATUS_SHORT_LOOKUP
            ORDER BY STATUS_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function tank_status_types()
    {
        $query = "
            SELECT TANK_STATUS_ID, TANK_STATUS_CODE, TANK_STATUS_NAME
            FROM TANK_STATUS_TYP
            ORDER BY TANK_STATUS_ID";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function inv_req_period_types()
    {
        $query = "
            SELECT *
            FROM RQ_PERIOD_TYP
            ORDER BY RQ_PERIOD_ID";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function meter_device_types()
    {
        $query = "
            SELECT *
            FROM MTD_TYP
            ORDER BY MTD_ID";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function movement_types()
    {
        $query = "
            SELECT 
                MOVITEM_TYPE_ID, 
                decode(MOVITEM_TYPE_ID, 0, 'R', 1, 'D', 2, 'T', 'R') as MOVITEM_TYPE_CODE, 
                MOVITEM_TYPE_NAME 
            FROM MOVITEM_TYPES
            ORDER BY MOVITEM_TYPE_ID
        ";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function meter_usages()
    {
        $query = "
            SELECT *
            FROM BAM_USAGE_TYP
            ORDER BY BAM_USAGE_ID";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function meter_types()
    {
        $query = "
            SELECT *
            FROM BA_METER_TYP
            WHERE BA_METER_ID != 0
            ORDER BY BA_METER_ID
        ";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function inv_request_types()
    {
        $query = "
            SELECT *
            FROM RQ_TYP
            ORDER BY RQ_ID";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function gauge_methods()
    {
        $query = "SELECT * FROM GAUGE_METHOD_TYP ORDER BY GAUGE_METHOD_ID ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function prod_movement_classes()
    {
        $query = "
            SELECT *
            FROM PMV_TRANSFER_CLASS_TYP
            ORDER BY PMV_TRANSFER_CLASS_ID";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function prod_movement_types()
    {
        $query = "
            SELECT *
            FROM PMV_TYP
            ORDER BY PMV_ID";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function prod_movement_states()
    {
        $query = "
            SELECT *
            FROM PMV_STATE_TYP
            ORDER BY PMV_STATE_ID";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function report_profile_types()
    {
        $query = "
			select 
				ALLOC_PERIOD_ID												as REPORT_TYPE_ID
				, DECODE(ALLOC_PERIOD_ID, 1, 'D', 2, 'W', 4, 'M', 'N')   	as REPORT_TYPE_CODE 
				, DECODE(ALLOC_PERIOD_ID, 0, ' ', ALLOC_PERIOD_NAME) 		as REPORT_TYPE_NAME
			from ALLOC_PERIOD_TYP 
            where ALLOC_PERIOD_ID in (0,1,2,4)
        ";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function partner_types()
    {
        $query = "
            SELECT *
            FROM PARTNER_TYPES
            ORDER BY PARTNER_TYPE_ID";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function unit_types()
    {
        $query = "
            SELECT *
            FROM QTY_TYP
            ORDER BY QTY_ID";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function transport_types()
    {
        $query = "
            SELECT *
            FROM TRANSPORT_TYP WHERE TRANSPORT_ID = 0
            ORDER BY TRANSPORT_ID";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function document_types()
    {
        $query = "
            SELECT *
            FROM DOCUMENT_TYP
            ORDER BY DOCUMENT_ID";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function pricing_types()
    {
        $query = "
            select 
              CUSTOMER_PRICE_ID as PRICE_TYPE_ID, 
              CUSTOMER_PRICE_NAME as PRICE_TYPE_NAME 
            from CUSTOMER_PRICE_TYP 
            order by CUSTOMER_PRICE_ID
        ";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function invoice_types()
    {
        $query = "
            select 
                CUSTOMER_INV_ID as INVOICE_TYPE_ID, 
                CUSTOMER_INV_NAME as INVOICE_TYPE_NAME 
            from CUSTOMER_INV_TYP 
            order by CUSTOMER_INV_ID
        ";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function sale_types()
    {
        $query = "
            select 
                CUSTOMER_SALE_ID as SALE_TYPE_ID, 
                CUSTOMER_SALE_NAME as SALE_TYPE_NAME 
            from CUSTOMER_SALE_TYP 
            order by CUSTOMER_SALE_ID
        ";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function terms_types()
    {
        $query = "
            select 
                CUSTOMER_TERMS_ID as TERMS_TYPE_ID, 
                CUSTOMER_TERMS_NAME as TERMS_TYPE_NAME 
            from CUSTOMER_TERMS_TYP 
            order by CUSTOMER_TERMS_ID
        ";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function order_status_types()
    {
        $query = "
            select 
                ORDER_STATUS_ID as ORDSTAT_TYPE_ID, 
                ORDER_STATUS_NAME as ORDSTAT_TYPE_NAME 
            from ORDER_STATUS_TYP 
            order by ORDER_STATUS_ID
        ";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function amount_types()
    {
        $query = "
            select 
                CUSTOMER_AMNT_ID as AMOUNT_TYPE_ID, 
                CUSTOMER_AMNT_NAME as AMOUNT_TYPE_NAME 
            from CUSTOMER_AMNT_TYP 
            order by CUSTOMER_AMNT_ID
        ";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
