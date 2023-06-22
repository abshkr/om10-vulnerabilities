<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class CustomerCarrier extends CommonClass
{
    protected $TABLE_NAME = 'CUSTOMER_CARRIER';
    
    /*
        CUST_ACCT	VARCHAR2(40 BYTE)
        CMPY_CODE	VARCHAR2(16 BYTE)
        COMMENT	VARCHAR2(40 BYTE)
    */

    public $NUMBER_FIELDS = array(
    );
    
    //Because base cannot be too many, do not do limit
    public function read()
    {
        // if (!isset($this->end_num)) {
        //     $this->start_num = 1;
        //     $this->end_num = $this->count();
        // }

        $query = "
            select 
                cust.CUST_ACCT                                  as CUST_ACNT 
                , cust.CUST_SUPP                                as CUST_SUPP_CODE
                , scmp.CMPY_NAME                                as CUST_SUPP_NAME
                , cust.CUST_CODE                                as CUST_CMPY_CODE
                , ccmp.CMPY_NAME                                as CUST_CMPY_NAME
                , cust.CUST_ACCT||' - '||ccmp.CMPY_NAME         as CUST_DESC
                , carr.CMPY_CODE                                as CMPY_CODE
                , carr.CMPY_NAME                                as CMPY_NAME
                , carr.CMPY_CODE||' - '||carr.CMPY_NAME         as CMPY_DESC
            from 
                CUSTOMER                cust
                , COMPANYS              scmp
                , COMPANYS              ccmp
                , CUSTOMER_CARRIER      ccrr
                , COMPANYS              carr
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and cust.CUST_ACCT = ccrr.CUST_ACCT
                and ccrr.CMPY_CODE = carr.CMPY_CODE
            order by carr.CMPY_NAME
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_customer_by_carrier($mode, $carrier, $supplier="-1")
    {
        $query = "
            select 
                cust.CUST_ACCT                                  as CUST_ACNT 
                , cust.CUST_SUPP                                as CUST_SUPP_CODE
                , scmp.CMPY_NAME                                as CUST_SUPP_NAME
                , cust.CUST_CODE                                as CUST_CMPY_CODE
                , ccmp.CMPY_NAME                                as CUST_CMPY_NAME
                , cust.CUST_ACCT||' - '||ccmp.CMPY_NAME         as CUST_DESC
            from 
                CUSTOMER                cust
                , COMPANYS              scmp
                , COMPANYS              ccmp
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and ('-1'=:supplier or cust.CUST_SUPP=:supplier) 
                and (cust.CUST_ACCT $mode (select CUST_ACCT from CUSTOMER_CARRIER where CMPY_CODE=:carrier))
            order by ccmp.CMPY_NAME         
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $supplier);
        oci_bind_by_name($stmt, ':carrier', $carrier);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_customer_have_carrier()
    {
        return $this->read_customer_by_carrier("in", $this->carrier, $this->supplier);
    }

    public function read_customer_haveno_carrier()
    {
        return $this->read_customer_by_carrier("not in", $this->carrier, $this->supplier);
    }
    
    public function read_carrier_customers()
    {
        $query = "
            select ROWNUM as key, dc.* from (
            select 
                cust.CUST_ACCT                                  as CUST_ACNT 
                , cust.CUST_SUPP                                as CUST_SUPP_CODE
                , scmp.CMPY_NAME                                as CUST_SUPP_NAME
                , cust.CUST_CODE                                as CUST_CMPY_CODE
                , ccmp.CMPY_NAME                                as CUST_CMPY_NAME
                , cust.CUST_ACCT||' - '||ccmp.CMPY_NAME         as CUST_DESC
                , :carrier                                      as CMPY_CODE
            from 
                CUSTOMER                cust
                , COMPANYS              scmp
                , COMPANYS              ccmp
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and ('-1'=:supplier or cust.CUST_SUPP=:supplier) 
                and (cust.CUST_ACCT in (select CUST_ACCT from CUSTOMER_CARRIER where CMPY_CODE=:carrier))
            union
            select 
                cust.CUST_ACCT                                  as CUST_ACNT 
                , cust.CUST_SUPP                                as CUST_SUPP_CODE
                , scmp.CMPY_NAME                                as CUST_SUPP_NAME
                , cust.CUST_CODE                                as CUST_CMPY_CODE
                , ccmp.CMPY_NAME                                as CUST_CMPY_NAME
                , cust.CUST_ACCT||' - '||ccmp.CMPY_NAME         as CUST_DESC
                , ''                                            as CMPY_CODE
            from 
                CUSTOMER                cust
                , COMPANYS              scmp
                , COMPANYS              ccmp
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and ('-1'=:supplier or cust.CUST_SUPP=:supplier) 
                and (cust.CUST_ACCT not in (select CUST_ACCT from CUSTOMER_CARRIER where CMPY_CODE=:carrier))
            ) dc
            where 1=1
            order by CUST_CMPY_NAME         
        ";
        $stmt = oci_parse($this->conn, $query);
        if (!isset($this->supplier) || $this->supplier=='null') {
            $this->supplier = '-1';
        }
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':carrier', $this->carrier);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }


    public function read_carrier_by_customer($mode, $customer="-1")
    {
        $query = "
            select 
                carr.CMPY_CODE                                  as CMPY_CODE
                , carr.CMPY_NAME                                as CMPY_NAME
                , carr.CMPY_CODE||' - '||carr.CMPY_NAME         as CMPY_DESC
            from 
                COMPANYS                carr
            where 
                BITAND(carr.CMPY_TYPE, POWER(2, 2)) != 0
                and ((carr.CMPY_CODE) $mode (select CMPY_CODE from CUSTOMER_CARRIER where CUST_ACCT=:customer))
            order by carr.CMPY_NAME         
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':customer', $customer);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_carrier_have_customer()
    {
        return $this->read_carrier_by_customer("in", $this->customer);
    }

    public function read_carrier_haveno_customer()
    {
        return $this->read_carrier_by_customer("not in", $this->customer);
    }
    
    public function read_customer_carriers()
    {
        $query = "
            select ROWNUM as key, dc.* from (
            select 
                carr.CMPY_CODE                                  as CMPY_CODE
                , carr.CMPY_NAME                                as CMPY_NAME
                , carr.CMPY_CODE||' - '||carr.CMPY_NAME         as CMPY_DESC
                , :customer                                     as CUST_ACCT
            from 
                COMPANYS                carr
            where 
                BITAND(carr.CMPY_TYPE, POWER(2, 2)) != 0
                and ((carr.CMPY_CODE) in (select CMPY_CODE from CUSTOMER_CARRIER where CUST_ACCT=:customer))
            union
            select 
                carr.CMPY_CODE                                  as CMPY_CODE
                , carr.CMPY_NAME                                as CMPY_NAME
                , carr.CMPY_CODE||' - '||carr.CMPY_NAME         as CMPY_DESC
                , ''                                            as CUST_ACCT
            from 
                COMPANYS                carr
            where 
                BITAND(carr.CMPY_TYPE, POWER(2, 2)) != 0
                and ((carr.CMPY_CODE) not in (select CMPY_CODE from CUSTOMER_CARRIER where CUST_ACCT=:customer))
            ) dc
            where 1=1
            order by CMPY_NAME         
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':customer', $this->customer);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

}
