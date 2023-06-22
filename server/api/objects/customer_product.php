<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class CustomerProduct extends CommonClass
{
    protected $TABLE_NAME = 'CUSTOMER_PRODUCT';
    
    /*
        CUST_ACCT	VARCHAR2(40 BYTE)
        PROD_CODE	VARCHAR2(36 BYTE)
        PROD_CMPY	VARCHAR2(16 BYTE)
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
                , prod.PROD_CODE                                as PROD_CODE
                , prod.PROD_NAME                                as PROD_NAME
                , prod.PROD_CMPY                                as PROD_CMPY_CODE
                , dcmp.CMPY_NAME                                as PROD_CMPY_NAME
            from 
                CUSTOMER                cust
                , COMPANYS              scmp
                , COMPANYS              ccmp
                , COMPANYS              dcmp
                , CUSTOMER_PRODUCT      cprd
                , PRODUCTS              prod
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and cust.CUST_ACCT = cprd.CUST_ACCT
                and cprd.PROD_CODE = prod.PROD_CODE
                and cprd.PROD_CMPY = prod.PROD_CMPY
                and prod.PROD_CMPY = dcmp.CMPY_CODE
            order by prod.PROD_CODE, ccmp.CMPY_NAME
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

    public function read_customer_by_product($mode, $prod_code, $supplier="-1")
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
                and (cust.CUST_ACCT $mode (select CUST_ACCT from CUSTOMER_PRODUCT where PROD_CODE=:prod_code and PROD_CMPY=:prod_cmpy))
            order by ccmp.CMPY_NAME         
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $supplier);
        oci_bind_by_name($stmt, ':prod_cmpy', $supplier);
        oci_bind_by_name($stmt, ':prod_code', $prod_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_customer_have_product()
    {
        return $this->read_customer_by_product("in", $this->prod_code, $this->supplier);
    }

    public function read_customer_haveno_product()
    {
        return $this->read_customer_by_product("not in", $this->prod_code, $this->supplier);
    }
    
    public function read_product_customers()
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
                , :prod_code                                    as PROD_CODE
                , :prod_cmpy                                    as PROD_CMPY
            from 
                CUSTOMER                cust
                , COMPANYS              scmp
                , COMPANYS              ccmp
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and ('-1'=:supplier or cust.CUST_SUPP=:supplier) 
                and (cust.CUST_ACCT in (select CUST_ACCT from CUSTOMER_PRODUCT where PROD_CODE=:prod_code and PROD_CMPY=:prod_cmpy))
            union
            select 
                cust.CUST_ACCT                                  as CUST_ACNT 
                , cust.CUST_SUPP                                as CUST_SUPP_CODE
                , scmp.CMPY_NAME                                as CUST_SUPP_NAME
                , cust.CUST_CODE                                as CUST_CMPY_CODE
                , ccmp.CMPY_NAME                                as CUST_CMPY_NAME
                , cust.CUST_ACCT||' - '||ccmp.CMPY_NAME         as CUST_DESC
                , ''                                            as PROD_CODE
                , ''                                            as PROD_CMPY
            from 
                CUSTOMER                cust
                , COMPANYS              scmp
                , COMPANYS              ccmp
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and ('-1'=:supplier or cust.CUST_SUPP=:supplier) 
                and (cust.CUST_ACCT not in (select CUST_ACCT from CUSTOMER_PRODUCT where PROD_CODE=:prod_code and PROD_CMPY=:prod_cmpy))
            ) dc
            where 1=1
            order by CUST_CMPY_NAME         
        ";
        $stmt = oci_parse($this->conn, $query);
        if (!isset($this->supplier) || $this->supplier=='null') {
            $this->supplier = '-1';
        }
        oci_bind_by_name($stmt, ':supplier', $this->supplier);
        oci_bind_by_name($stmt, ':prod_cmpy', $this->supplier);
        oci_bind_by_name($stmt, ':prod_code', $this->prod_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }


    public function read_product_by_customer($mode, $supplier, $customer="-1")
    {
        $query = "
            select 
                prod.PROD_CODE                                  as PROD_CODE
                , prod.PROD_CMPY                                as PROD_CMPY
                , prod.PROD_NAME                                as PROD_NAME
                , dcmp.CMPY_NAME                                as PROD_CMPY_NAME
                , prod.PROD_CODE||' - '||prod.PROD_NAME         as PROD_DESC
            from 
                PRODUCTS                prod
                , COMPANYS              dcmp
            where 
                prod.PROD_CMPY = dcmp.CMPY_CODE 
                and ('-1'=:prod_cmpy or prod.PROD_CMPY=:prod_cmpy) 
                and ((prod.PROD_CODE, prod.PROD_CMPY) $mode (select PROD_CODE, PROD_CMPY from CUSTOMER_PRODUCT where CUST_ACCT=:customer))
            order by PROD_NAME         
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':prod_cmpy', $supplier);
        oci_bind_by_name($stmt, ':customer', $customer);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_product_have_customer()
    {
        return $this->read_product_by_customer("in", $this->supplier, $this->customer);
    }

    public function read_product_haveno_customer()
    {
        return $this->read_product_by_customer("not in", $this->supplier, $this->customer);
    }
    
    public function read_customer_products()
    {
        $query = "
            select ROWNUM as key, dc.* from (
            select 
                prod.PROD_CODE                                  as PROD_CODE
                , prod.PROD_CMPY                                as PROD_CMPY
                , prod.PROD_NAME                                as PROD_NAME
                , dcmp.CMPY_NAME                                as PROD_CMPY_NAME
                , prod.PROD_CODE||' - '||prod.PROD_NAME         as PROD_DESC
                , :customer                                     as CUST_ACCT
            from 
                PRODUCTS                prod
                , COMPANYS              dcmp
            where 
                prod.PROD_CMPY = dcmp.CMPY_CODE 
                and ('-1'=:prod_cmpy or prod.PROD_CMPY=:prod_cmpy) 
                and ((prod.PROD_CODE, prod.PROD_CMPY) in (select PROD_CODE, PROD_CMPY from CUSTOMER_PRODUCT where CUST_ACCT=:customer))
            union
            select 
                prod.PROD_CODE                                  as PROD_CODE
                , prod.PROD_CMPY                                as PROD_CMPY
                , prod.PROD_NAME                                as PROD_NAME
                , dcmp.CMPY_NAME                                as PROD_CMPY_NAME
                , prod.PROD_CODE||' - '||prod.PROD_NAME         as PROD_DESC
                , ''                                            as CUST_ACCT
            from 
                PRODUCTS                prod
                , COMPANYS              dcmp
            where 
                prod.PROD_CMPY = dcmp.CMPY_CODE 
                and ('-1'=:prod_cmpy or prod.PROD_CMPY=:prod_cmpy) 
                and ((prod.PROD_CODE, prod.PROD_CMPY) not in (select PROD_CODE, PROD_CMPY from CUSTOMER_PRODUCT where CUST_ACCT=:customer))
            ) dc
            where 1=1
            order by PROD_NAME         
        ";
        $stmt = oci_parse($this->conn, $query);
        if (!isset($this->supplier) || $this->supplier=='null') {
            $this->supplier = '-1';
        }
        oci_bind_by_name($stmt, ':prod_cmpy', $this->supplier);
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
