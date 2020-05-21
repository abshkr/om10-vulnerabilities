<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once __DIR__ . '/../shared/utilities.php';
include_once 'common_class.php';

class CustomerDelvLocation extends CommonClass
{
    protected $TABLE_NAME = 'DELV_FOR_CUST';
    
    protected $table_view_map = array(
        "DLC_CUSTOMER" => "CUST_ACNT",
        "DLC_DELV_LOC" => "DELV_CODE",
    );

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
                , cust.CUST_CATEGORY                            as CUST_CTGR_CODE
                , catg.CATEG_DESCRIPT                           as CUST_CTGR_TEXT
                , dloc.DLV_CODE                                 as DELV_CODE
                , dloc.DLV_NAME                                 as DELV_NAME
            from 
                CUSTOMER                cust
                , COMPANYS              scmp
                , COMPANYS              ccmp
                , CST_PRCE_CATEGOR      catg
                , DELV_FOR_CUST         dlfc
                , DELV_LOCATION         dloc
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and cust.CUST_CATEGORY = catg.CATEG_CODE(+)
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

    public function read_customer_by_delvloc($mode, $delv_code, $supplier="-1", $category="-1")
    {
        $query = "
            select 
                cust.CUST_ACCT                                  as CUST_ACNT 
                , cust.CUST_SUPP                                as CUST_SUPP_CODE
                , scmp.CMPY_NAME                                as CUST_SUPP_NAME
                , cust.CUST_CODE                                as CUST_CMPY_CODE
                , ccmp.CMPY_NAME                                as CUST_CMPY_NAME
                , cust.CUST_ACCT||' - '||ccmp.CMPY_NAME         as CUST_DESC
                , cust.CUST_CATEGORY                            as CUST_CTGR_CODE
                , catg.CATEG_DESCRIPT                           as CUST_CTGR_TEXT
            from 
                CUSTOMER                cust
                , COMPANYS              scmp
                , COMPANYS              ccmp
                , CST_PRCE_CATEGOR      catg
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and cust.CUST_CATEGORY = catg.CATEG_CODE(+)
                and ('-1'=:supplier or cust.CUST_SUPP=:supplier) 
                and ('-1'=:category or cust.CUST_CATEGORY=:category) 
                and (cust.CUST_ACCT $mode (select DLC_CUSTOMER from DELV_FOR_CUST where DLC_DELV_LOC=:delv_code))
            order by CUST_CMPY_NAME         
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $supplier);
        oci_bind_by_name($stmt, ':category', $category);
        oci_bind_by_name($stmt, ':delv_code', $delv_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function read_customer_have_delvloc()
    {
        return $this->read_customer_by_delvloc("in", $this->delv_code, $this->delv_cust_suppcode, $this->delv_cust_catgcode);
    }

    public function read_customer_haveno_delvloc()
    {
        return $this->read_customer_by_delvloc("not in", $this->delv_code, $this->delv_cust_suppcode, $this->delv_cust_catgcode);
    }
    
    public function read_customers()
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
                , cust.CUST_CATEGORY                            as CUST_CTGR_CODE
                , catg.CATEG_DESCRIPT                           as CUST_CTGR_TEXT
                , :delv_code                                    as DELV_CODE
            from 
                CUSTOMER                cust
                , COMPANYS              scmp
                , COMPANYS              ccmp
                , CST_PRCE_CATEGOR      catg
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and cust.CUST_CATEGORY = catg.CATEG_CODE(+)
                and ('-1'=:supplier or cust.CUST_SUPP=:supplier) 
                and ('-1'=:category or cust.CUST_CATEGORY=:category) 
                and (cust.CUST_ACCT in (select DLC_CUSTOMER from DELV_FOR_CUST where DLC_DELV_LOC=:delv_code))
            union
            select 
                cust.CUST_ACCT                                  as CUST_ACNT 
                , cust.CUST_SUPP                                as CUST_SUPP_CODE
                , scmp.CMPY_NAME                                as CUST_SUPP_NAME
                , cust.CUST_CODE                                as CUST_CMPY_CODE
                , ccmp.CMPY_NAME                                as CUST_CMPY_NAME
                , cust.CUST_ACCT||' - '||ccmp.CMPY_NAME         as CUST_DESC
                , cust.CUST_CATEGORY                            as CUST_CTGR_CODE
                , catg.CATEG_DESCRIPT                           as CUST_CTGR_TEXT
                , ''                                            as DELV_CODE
            from 
                CUSTOMER                cust
                , COMPANYS              scmp
                , COMPANYS              ccmp
                , CST_PRCE_CATEGOR      catg
            where 
                cust.CUST_SUPP = scmp.CMPY_CODE 
                and cust.CUST_CODE = ccmp.CMPY_CODE
                and cust.CUST_CATEGORY = catg.CATEG_CODE(+)
                and ('-1'=:supplier or cust.CUST_SUPP=:supplier) 
                and ('-1'=:category or cust.CUST_CATEGORY=:category) 
                and (cust.CUST_ACCT not in (select DLC_CUSTOMER from DELV_FOR_CUST where DLC_DELV_LOC=:delv_code))
            ) dc
            where 1=1
            order by CUST_CMPY_NAME         
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':supplier', $this->delv_cust_suppcode);
        oci_bind_by_name($stmt, ':category', $this->delv_cust_catgcode);
        oci_bind_by_name($stmt, ':delv_code', $this->delv_code);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
