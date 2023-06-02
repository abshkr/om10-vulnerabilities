<?php

include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/order_service.php';
include_once __DIR__ . '/schedule_service.php';
include_once __DIR__ . '/site_service.php';

class CompanyService
{
    public function __construct($db, $cmpy_code = null, $auto_commit = false)
    {
        $this->conn = $db;
        $this->cmpy_code = $cmpy_code;
        $this->auto_commit = $auto_commit;

        if ($this->auto_commit) {
            $this->commit_mode = OCI_COMMIT_ON_SUCCESS;
        } else {
            $this->commit_mode = OCI_NO_AUTO_COMMIT;
        }
    }

    public function is_trip_oo_used($num)
    {
        $trip_service = new ScheduleService($this->conn, $auto_commit = false);
        $trip_used = $trip_service->is_trip_used_by_any_supplier($num);

        $order_service = new OrderService($this->conn, $order_no = 0, $auto_commit = false);
        $order_used = $order_service->is_cust_order_used($num);

        $used = $trip_used || $order_used;
        return $used;
    }

    public function next_cust_ordno()
    {
        $order_range = $this->get_order_range();
        if ($order_range === null) {
            return 0;
        }

        // get the site setting for unique triporder number
        $serv = new SiteService($this->conn);
        $config_value = $serv->site_config_value("SITE_UNIQUE_TRIP_OO_NUM", "N");
        $unique_flag = ($config_value === 'Y' || $config_value === 'y');

        $order_start = $order_range['CMPY_ORD_STRT'];
        $order_end = $order_range['CMPY_ORD_END'];
        $last_order = $order_range['CMPY_ORD_LAST'];
        if ($unique_flag && $order_end < 999999999) {
            // may need a big end number
            $order_end = 999999999;
        }

        if ($order_end <= $order_start) {
            write_log(sprintf("Invalid open order range. start:%d, end:%d, current:%d", $order_start, $order_end, $last_order),
                __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }

        if ($last_order < $order_start || $last_order > $order_end) {
            write_log(sprintf("last order is out of range. start:%d, end:%d, current:%d", $order_start, $order_end, $last_order),
                __FILE__, __LINE__, LogLevel::WARNING);
            $last_order = $order_start;
        }

        $start_mark = $last_order;
        $new_order = $last_order + 1;
        while (true) {
            if ($new_order > $order_end) {
                $new_order = $order_start;
            }

            if ($new_order == $start_mark) {
                write_log(sprintf("No valid order number in range. start:%d, end:%d", $order_start, $order_end),
                    __FILE__, __LINE__, LogLevel::ERROR);

                $journal = new Journal($this->conn, $autocommit = $this->auto_commit);
                $jnl_data[0] = sprintf("No valid order number in range. start:%d, end:%d", $order_start, $order_end);

                if (!$journal->jnlLogEvent(
                    Lookup::TMM_TEXT_ONLY, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    if (!$this->auto_commit) {
                        oci_rollback($this->conn);
                    }
                    return false;
                }

                return 0;
            }

            if ($unique_flag) {
                $used = $this->is_trip_oo_used($new_order);
                if (!$used) {
                    return $new_order;
                }
            } else {
                $order_service = new OrderService($this->conn, $order_no = 0, $auto_commit = false);
                if (!$order_service->is_cust_order_used($new_order)) {
                    return $new_order;
                }
            }

            $new_order += 1;
        }

        return 0;
    }

    public function set_last_order($last_order)
    {
        $query = "
            UPDATE COMPANYS
            SET CMPY_ORD_LAST = :cmpy_ord_last
            WHERE CMPY_CODE = :cmpy_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_ord_last', $last_order);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
    }

    private function get_order_range()
    {
        $query = "
            SELECT NVL(CMPY_ORD_STRT, 1) CMPY_ORD_STRT, 
                NVL(CMPY_ORD_END, 999999999) CMPY_ORD_END, 
                NVL(CMPY_ORD_LAST, 0) CMPY_ORD_LAST
            FROM COMPANYS
            WHERE CMPY_CODE = :cmpy_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row;
    }

    public function next_trip_no()
    {
        $order_range = $this->get_trip_range();
        if ($order_range === null) {
            return 0;
        }

        // get the site setting for unique triporder number
        $serv = new SiteService($this->conn);
        $config_value = $serv->site_config_value("SITE_UNIQUE_TRIP_OO_NUM", "N");
        $unique_flag = ($config_value === 'Y' || $config_value === 'y');

        $order_start = $order_range['CMPY_TRIP_STRT'];
        $order_end = $order_range['CMPY_TRIP_END'];
        $last_order = $order_range['CMPY_TRIP_LAST'];
        if ($unique_flag && $order_end < 999999999) {
            // may need a big end number
            $order_end = 999999999;
        }

        if ($order_end <= $order_start) {
            write_log(sprintf("Invalid trip range. start:%d, end:%d, current:%d", $order_start, $order_end, $last_order),
                __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }

        if ($last_order < $order_start || $last_order > $order_end) {
            write_log(sprintf("last trip is out of range. start:%d, end:%d, current:%d", $order_start, $order_end, $last_order),
                __FILE__, __LINE__, LogLevel::WARNING);
            $last_order = $order_start;
        }

        $start_mark = $last_order;
        $new_order = $last_order + 1;
        while (true) {
            if ($new_order > $order_end) {
                $new_order = $order_start;
            }

            if ($new_order == $start_mark) {
                write_log(sprintf("No valid trip number in range. start:%d, end:%d", $order_start, $order_end),
                    __FILE__, __LINE__, LogLevel::ERROR);

                $journal = new Journal($this->conn, $autocommit = $this->auto_commit);
                $jnl_data[0] = sprintf("No valid trip number in range. start:%d, end:%d", $order_start, $order_end);

                if (!$journal->jnlLogEvent(
                    Lookup::TMM_TEXT_ONLY, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    if (!$this->auto_commit) {
                        oci_rollback($this->conn);
                    }
                    return false;
                }

                return 0;
            }

            if ($unique_flag) {
                $used = $this->is_trip_oo_used($new_order);
                if (!$used) {
                    return $new_order;
                }
            } else {
                $order_service = new ScheduleService($this->conn, $auto_commit = false);
                if (!$order_service->is_trip_used($new_order, $this->cmpy_code)) {
                    return $new_order;
                }
            }

            $new_order += 1;
        }

        return 0;
    }

    public function set_last_trip($last_trip)
    {
        $query = "
            UPDATE COMPANYS
            SET CMPY_TRIP_LAST = :cmpy_ord_last
            WHERE CMPY_CODE = :cmpy_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_ord_last', $last_trip);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }
    }

    private function get_trip_range()
    {
        $query = "
            SELECT NVL(CMPY_TRIP_STRT, 1) CMPY_TRIP_STRT, 
                NVL(CMPY_TRIP_END, 999999999) CMPY_TRIP_END, 
                NVL(CMPY_TRIP_LAST, 0) CMPY_TRIP_LAST
            FROM COMPANYS
            WHERE CMPY_CODE = :cmpy_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row;
    }



    private function get_company_config($key_code)
    {
        $query = "
            SELECT CONFIG_VALUE
            FROM COMPANY_CONFIG
            WHERE CMPY_CODE = :cmpy_code AND CONFIG_KEY = :key_code 
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        oci_bind_by_name($stmt, ':key_code', $key_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row != false && is_array($row)) {
            return $row['CONFIG_VALUE'];
        } else {
            return false;
        }
    }

    public function put_company_config($key_code, $key_value)
    {
        $value = $this->get_company_config($key_code);
        if ($value == false) {
           // do INSERT
            $query = "
                INSERT INTO COMPANY_CONFIG (CMPY_CODE, CONFIG_KEY, CONFIG_VALUE) 
                VALUES (:cmpy_code, :key_code, :key_value)
            ";
        } else {
            // do UPDATE
            $query = "
                UPDATE COMPANY_CONFIG
                SET CONFIG_VALUE = :key_value
                WHERE CMPY_CODE = :cmpy_code AND CONFIG_KEY = :key_code
            ";
        }

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        oci_bind_by_name($stmt, ':key_code', $key_code);
        oci_bind_by_name($stmt, ':key_value', $key_value);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }

    public function set_last_pickup($last_trip)
    {
        return $this->put_company_config("CMPY_PICKUP_TRIP_LAST", $last_trip);
        /*
        // CMPY_PICKUP_TRIP_LAST may not exist yet
        $last = $this->get_company_config("CMPY_PICKUP_TRIP_LAST");
        if ($last == false) {
           // do INSERT
            $query = "
                INSERT INTO COMPANY_CONFIG (CMPY_CODE, CONFIG_KEY, CONFIG_VALUE) 
                VALUES (:cmpy_code, 'CMPY_PICKUP_TRIP_LAST', :cmpy_pickup_last)
            ";
        } else {
            // do UPDATE
            $query = "
                UPDATE COMPANY_CONFIG
                SET CONFIG_VALUE = :cmpy_pickup_last
                WHERE CMPY_CODE = :cmpy_code AND CONFIG_KEY='CMPY_PICKUP_TRIP_LAST'
            ";
        }

        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_pickup_last', $last_trip);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true; */
    }

    private function get_site_config($key_code)
    {
        $query = "
            SELECT CONFIG_VALUE
            FROM SITE_CONFIG
            WHERE CONFIG_KEY = :key_code 
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':key_code', $key_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row != false && is_array($row)) {
            return $row['CONFIG_VALUE'];
        } else {
            return false;
        }
    }

    private function get_pickup_range()
    {
        $start = $this->get_company_config("CMPY_PICKUP_TRIP_START");
        if ($start == false) {
            $start = $this->get_site_config("SITE_PICKUP_TRIP_START");
            if ($start == false) {
                $start = 800000000;
            }
            // create a company config
            $this->put_company_config("CMPY_PICKUP_TRIP_START", $start);
        }
        $end = $this->get_company_config("CMPY_PICKUP_TRIP_END");
        if ($end == false) {
            $end = $this->get_site_config("SITE_PICKUP_TRIP_END");
            if ($end == false) {
                $end = 999999999;
            }
            // create a company config
            $this->put_company_config("CMPY_PICKUP_TRIP_END", $end);
        }
        $last = $this->get_company_config("CMPY_PICKUP_TRIP_LAST");
        if ($last == false) {
            $last = $start;
            // create a company config
            $this->put_company_config("CMPY_PICKUP_TRIP_LAST", $last);
        }

        $range = array(
            'CMPY_PICKUP_TRIP_START' => $start,
            'CMPY_PICKUP_TRIP_END' => $end,
            'CMPY_PICKUP_TRIP_LAST' => $last,
        );

        return $range;
    }

    public function next_pickup_no()
    {
        $pickup_range = $this->get_pickup_range();
        if ($pickup_range === null) {
            return 0;
        }

        // get the site setting for unique triporder number
        $serv = new SiteService($this->conn);
        $config_value = $serv->site_config_value("SITE_UNIQUE_TRIP_OO_NUM", "N");
        $unique_flag = ($config_value === 'Y' || $config_value === 'y');

        $pickup_start = $pickup_range['CMPY_PICKUP_TRIP_START'];
        $pickup_end = $pickup_range['CMPY_PICKUP_TRIP_END'];
        $last_pickup = $pickup_range['CMPY_PICKUP_TRIP_LAST'];
        if ($unique_flag && $pickup_end < 999999999) {
            // may need a big end number
            $pickup_end = 999999999;
        }
        if ($unique_flag && $pickup_start < 800000000) {
            // may need a big start number
            $pickup_start = 800000000;
        }

        if ($pickup_end <= $pickup_start) {
            write_log(sprintf("Invalid pickup range. start:%d, end:%d, current:%d", $pickup_start, $pickup_end, $last_pickup),
                __FILE__, __LINE__, LogLevel::ERROR);
            return 0;
        }

        if ($last_pickup < $pickup_start || $last_pickup > $pickup_end) {
            write_log(sprintf("last pickup is out of range. start:%d, end:%d, current:%d", $pickup_start, $pickup_end, $last_pickup),
                __FILE__, __LINE__, LogLevel::WARNING);
            $last_pickup = $pickup_start;
        }

        $start_mark = $last_pickup;
        $new_pickup = $last_pickup + 1;
        while (true) {
            if ($new_pickup > $pickup_end) {
                $new_pickup = $pickup_start;
            }

            if ($new_pickup == $start_mark) {
                write_log(sprintf("No valid pickup number in range. start:%d, end:%d", $pickup_start, $pickup_end),
                    __FILE__, __LINE__, LogLevel::ERROR);

                $journal = new Journal($this->conn, $autocommit = $this->auto_commit);
                $jnl_data[0] = sprintf("No valid pickup number in range. start:%d, end:%d", $pickup_start, $pickup_end);

                if (!$journal->jnlLogEvent(
                    Lookup::TMM_TEXT_ONLY, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
                    $e = oci_error($stmt);
                    write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                    if (!$this->auto_commit) {
                        oci_rollback($this->conn);
                    }
                    return false;
                }

                return 0;
            }

            if ($unique_flag) {
                $used = $this->is_trip_oo_used($new_pickup);
                if (!$used) {
                    // $this->set_last_pickup($new_pickup);
                    return $new_pickup;
                }
            } else {
                $pickup_service = new ScheduleService($this->conn, $auto_commit = false);
                if (!$pickup_service->is_trip_used($new_pickup, $this->cmpy_code)) {
                    // $this->set_last_pickup($new_pickup);
                    return $new_pickup;
                }
            }

            $new_pickup += 1;
        }

        return 0;
    }




    private function get_last_order()
    {
        $query = "SELECT CMPY_ORD_LAST
            FROM COMPANYS
            WHERE CMPY_CODE = :cmpy_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':cmpy_code', $this->cmpy_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['CMPY_ORD_LAST'];
    }

    public function suppliers($plus_any = false)
    {
        $query = "";
        if ($plus_any) {
            $query .= " SELECT 'ANY' CMPY_CODE, 'ALL' CMPY_NAME, 'ANY - ALL' CMPY_DESC FROM DUAL UNION ";
        }
        $query .= "
            SELECT CMPY_CODE, CMPY_NAME,
                CMPY_CODE||' - '||CMPY_NAME AS CMPY_DESC
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 1)) != 0
            ORDER BY CMPY_NAME ASC";
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

    public function customers($plus_any = false)
    {
        $query = "";
        if ($plus_any) {
            $query .= " SELECT 'ANY' CMPY_CODE, 'ALL' CMPY_NAME, 'ANY - ALL' CMPY_DESC FROM DUAL UNION ";
        }
        $query .= "
            SELECT CMPY_CODE, CMPY_NAME,
                CMPY_CODE||' - '||CMPY_NAME AS CMPY_DESC
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 3)) != 0
            ORDER BY CMPY_NAME ASC";
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

    public function drawers($plus_any = false)
    {
        $query = "";
        if ($plus_any) {
            $query .= " SELECT 'ANY' CMPY_CODE, 'ALL' CMPY_NAME, 'ANY - ALL' CMPY_DESC FROM DUAL UNION ";
        }
        $query .= "
            SELECT CMPY_CODE, CMPY_NAME,
                CMPY_CODE||' - '||CMPY_NAME AS CMPY_DESC
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 4)) != 0
            ORDER BY CMPY_NAME ASC";
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

    public function carriers($plus_any = false)
    {
        $query = "";
        if ($plus_any) {
            $query .= " SELECT 'ANY' CMPY_CODE, 'ALL' CMPY_NAME, 'ANY - ALL' CMPY_DESC FROM DUAL UNION ";
        }
        $query .= "
            SELECT CMPY_CODE, CMPY_NAME,
                CMPY_CODE||' - '||CMPY_NAME AS CMPY_DESC
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, 2)) != 0
            ORDER BY CMPY_NAME ASC";
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

    public function plants()
    {
        $query = "
            SELECT DISTINCT CMPY_PLANT
            FROM GUI_COMPANYS
            WHERE CMPY_PLANT IS NOT NULL
            ORDER BY CMPY_PLANT ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function companys_by_role($cmpy_role_id)
    {
        $query = "
            SELECT CMPY_CODE, CMPY_NAME,
                CMPY_CODE||' - '||CMPY_NAME AS CMPY_DESC
            FROM GUI_COMPANYS
            WHERE BITAND(CMPY_TYPE, POWER(2, :role_id)) != 0
            ORDER BY CMPY_NAME ASC";
        // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':role_id', $cmpy_role_id);
        if (oci_execute($stmt)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
