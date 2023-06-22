<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class CustomerLocation extends CommonClass
{
    protected $TABLE_NAME = 'DELV_FOR_CUST';
    
    /*
        DLC_CUSTOMER	VARCHAR2(40 BYTE)
        DLC_DELV_LOC	VARCHAR2(16 BYTE)
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
                , dloc.DLV_CODE                                 as DELV_CODE
                , dloc.DLV_NAME                                 as DELV_NAME
                , dloc.DLV_CODE||' - '||dloc.DLV_NAME           as DELV_DESC
            from 
                CUSTOMER                cust
                , COMPANYS              scmp
                , COMPANYS              ccmp
                , DELV_FOR_CUST         dlfc
                , DELV_LOCATION         dloc
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and cust.CUST_ACCT = dlfc.DLC_CUSTOMER
                and dlfc.DLC_DELV_LOC = dloc.DLV_CODE
            order by dloc.DLV_CODE, ccmp.CMPY_NAME
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

    public function read_customer_by_location($mode, $location, $supplier="-1")
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
                and (cust.CUST_ACCT $mode (select DLC_CUSTOMER from DELV_FOR_CUST where DLC_DELV_LOC=:location))
            order by ccmp.CMPY_NAME         
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $supplier);
        oci_bind_by_name($stmt, ':location', $location);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_customer_have_location()
    {
        return $this->read_customer_by_location("in", $this->location, $this->supplier);
    }

    public function read_customer_haveno_location()
    {
        return $this->read_customer_by_location("not in", $this->location, $this->supplier);
    }
    
    public function read_location_customers()
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
                , :location                                     as DELV_CODE
            from 
                CUSTOMER                cust
                , COMPANYS              scmp
                , COMPANYS              ccmp
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and ('-1'=:supplier or cust.CUST_SUPP=:supplier) 
                and (cust.CUST_ACCT in (select DLC_CUSTOMER from DELV_FOR_CUST where DLC_DELV_LOC=:location))
            union
            select 
                cust.CUST_ACCT                                  as CUST_ACNT 
                , cust.CUST_SUPP                                as CUST_SUPP_CODE
                , scmp.CMPY_NAME                                as CUST_SUPP_NAME
                , cust.CUST_CODE                                as CUST_CMPY_CODE
                , ccmp.CMPY_NAME                                as CUST_CMPY_NAME
                , cust.CUST_ACCT||' - '||ccmp.CMPY_NAME         as CUST_DESC
                , ''                                            as DELV_CODE
            from 
                CUSTOMER                cust
                , COMPANYS              scmp
                , COMPANYS              ccmp
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and ('-1'=:supplier or cust.CUST_SUPP=:supplier) 
                and (cust.CUST_ACCT not in (select DLC_CUSTOMER from DELV_FOR_CUST where DLC_DELV_LOC=:location))
            ) dc
            where 1=1
            order by CUST_CMPY_NAME         
        ";
        $stmt = oci_parse($this->conn, $query);
        if (!isset($this->supplier) || $this->supplier=='null') {
            $this->supplier = '-1';
        }
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':location', $this->location);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }


    public function read_location_by_customer($mode, $customer="-1")
    {
        $query = "
            select 
                dloc.DLV_CODE                                   as DELV_CODE
                , dloc.DLV_NAME                                 as DELV_NAME
                , dloc.DLV_CODE||' - '||dloc.DLV_NAME           as DELV_DESC
            from 
                DELV_LOCATION                dloc
            where 
                1=1
                and ((dloc.DLV_CODE) $mode (select DLC_DELV_LOC from DELV_FOR_CUST where DLC_CUSTOMER=:customer))
            order by dloc.DLV_NAME         
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

    public function read_location_have_customer()
    {
        return $this->read_location_by_customer("in", $this->customer);
    }

    public function read_location_haveno_customer()
    {
        return $this->read_location_by_customer("not in", $this->customer);
    }
    
    public function read_customer_locations()
    {
        $query = "
            select ROWNUM as key, dc.* from (
            select 
                dloc.DLV_CODE                                   as DELV_CODE
                , dloc.DLV_NAME                                 as DELV_NAME
                , dloc.DLV_CODE||' - '||dloc.DLV_NAME           as DELV_DESC
                , :customer                                     as CUST_ACCT
            from 
                DELV_LOCATION                dloc
            where 
                1=1
                and ((dloc.DLV_CODE) in (select DLC_DELV_LOC from DELV_FOR_CUST where DLC_CUSTOMER=:customer))
            union
            select 
                dloc.DLV_CODE                                   as DELV_CODE
                , dloc.DLV_NAME                                 as DELV_NAME
                , dloc.DLV_CODE||' - '||dloc.DLV_NAME           as DELV_DESC
                , ''                                            as CUST_ACCT
            from 
                DELV_LOCATION                dloc
            where 
                1=1
                and ((dloc.DLV_CODE) not in (select DLC_DELV_LOC from DELV_FOR_CUST where DLC_CUSTOMER=:customer))
            ) dc
            where 1=1
            order by DELV_NAME         
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
