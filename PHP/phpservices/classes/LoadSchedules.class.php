<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/EquipmentTypes.class.php');
require_once(dirname(__FILE__) . '/EquipmentList.class.php');
require_once(dirname(__FILE__) . '/Companies.class.php');
require_once(dirname(__FILE__) . '/Tankers.class.php');
require_once(dirname(__FILE__) . '/Journal.class.php');

/* define the module name for calling logMe() to output */
if(!defined('LOADSCHEDCLASS')) define('LOADSCHEDCLASS','LoadSchedules.class');

//$ls = new LoadSchedulesClass();
//print_r($ls->getCompartmentList('1001', 'C74601FA'));
//print_r($ls->getDetailsByCompartments('1001', 4373241));
//print_r($ls->checkTripNumber('1001', 4373241));
//print_r($ls->productsLookup('1001'));
//print_r($ls->getOrders('1001'));
//print_r($ls->getOrderDetails('1001', 21));
//print_r($ls->getOrderDetails('0003',27521));
//print_r($ls->updateSchedule(8000020, '0006', ':/soldto3', ',:shipto3', 'MJM'));
//print_r($ls->updateSchedule(8000015, '0006', 'soldto', 'shipto'));bzenv
//print_r($ls->updateScheduleCmpts(10000009, '1001', 2, 'delnum2', ':/soldto2', ',:shipto2'));
//print_r($ls->updateScheduleCmpts(8000020, '0006', 2, 'delnum2', ':/soldto2', ',:shipto2'));
//print_r($ls->deleteSpecProduct(10000009, '1001', 200001735, '1001'));


class LoadSchedulesClass 
{
    var $tbl_name = "GUI_SCHEDULES";
    
    public function LoadSchedulesClass(){
		session_start();
		
        if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
            $this->host ="localhost";
        }
        
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "load_scheds/load_scheds.cgi";
            $this->cgi_cmpts = CGIDIR . "load_scheds/load_spec_compt.cgi";
            $this->cgi_prod = CGIDIR . "load_scheds/load_spec_prod.cgi";
            $this->cgi_adhoc = CGIDIR . "access_ctrl/id_assignment.cgi";
       }
        else{
            $this->cgi ="cgi-bin/en/load_scheds/load_scheds.cgi";
            $this->cgi_cmpts = "cgi-bin/en/load_scheds/load_spec_compt.cgi";
            $this->cgi_prod = "cgi-bin/en/load_scheds/load_spec_prod.cgi";
			$this->cgi_adhoc = "cgi-bin/en/access_ctrl/id_assignment.cgi";
        }
    }
    
    public function getPaged($offset,$tot,$filter='',$sort='')
    {
        $mydb = DB::getInstance();
        //$order="ORDER BY shls_trip_no DESC";
        //$where='';
        //if($filter != null) 
        //{
        //  if ($filter->filter != '') $where = 'WHERE '.$filter->filter;
        //  if ($filter->order  != '') $order = 'ORDER BY '.$filter->order;
        //}
        if($sort!='')$sort="ORDER BY $sort";
		else $sort="ORDER BY LAST_CHG_TIME DESC";
		
        $sql="SELECT * FROM(
                SELECT res.*, ROW_NUMBER() over ($sort) RN
                FROM(SELECT * FROM GUI_SCHEDULES $filter) res
             )
             where RN between ".($offset+1)." and ".($offset+$tot); //." $sort" ;        
		
		/*
        $sql="select * from (SELECT * FROM(
                SELECT res.*, ROW_NUMBER() over (order by SHLS_TRIP_NO DESC, SUPPLIER_CODE) RN
                FROM(SELECT * FROM GUI_SCHEDULES $filter) res
             ) $sort) 
             where RN between ".($offset+1)." and ".($offset+$tot); //." $sort" ;        
        */
        $rows = $mydb->query($sql);
        //error_log( "\n".$sql, 3, "temp.log");
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'GuiSchedules')));
    }
    
    public function getReport($filter='',$sort='')
    {
        $mydb = DB::getInstance();
        if($sort!='')$sort="ORDER BY $sort";
        else $sort="ORDER BY SHLS_TRIP_NO DESC";
        
        $sql="SELECT * FROM GUI_SCHEDULES $filter $sort";
        $rows = $mydb->query($sql);
        //error_log( "\n".$sql, 3, "temp.log");
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'GuiSchedules')));
    }

    public function tankersLookup(){
        $mydb = DB::getInstance();
        //$sql="SELECT tnkr_code FROM TANKERS WHERE TNKR_ACTIVE = 'Y' AND TNKR_LOCK = 'N' ORDER BY tnkr_code ASC";
        $sql="SELECT tnkr_code FROM TANKERS WHERE 1=1 ORDER BY tnkr_code ASC";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'ScheduleTankersLookup')));
    }
 
    public function tankersLookupByCarrier($carrier){
        $obj = new TankersClass();
        $res = $obj->lookupByCarrier($carrier);
        return $res;
    }
    
    public function suppliersLookup(){
        /*
        $mydb = DB::getInstance();
        $sql="SELECT CMPY_CODE, CMPY_NAME FROM COMPANYS WHERE upper(CMPY_CODE) <> 'ANY' AND (bitand (cmpy_type, power (2,1)) = power (2,1))";
        $rows = $mydb->query($sql);
        foreach($rows as $x){
            $x->SUPPLIER_DESC = $x->SUPPLIER_CODE." - ".$x->SUPPLIER;
        }
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'SuppliersLookup')));
        */
        $obj = new CompaniesClass();
        $res = $obj->lookupByTypeFrmView(1);
        return $res;
    }
    
     public function drawersLookup(){
       $obj = new CompaniesClass();
       $rows = $obj->lookupByTypeFrmView(4);
       //XarrayEncodingConversion($rows);
       return (prepareForAMF($rows, array(0 => 'DrawersLookup')));
    }     

    public function carriersLookup(){
        $mydb = DB::getInstance();
        $sql="SELECT CMPY_CODE, CMPY_NAME FROM COMPANYS WHERE upper(CMPY_CODE) <> 'ANY' AND (bitand (cmpy_type, power (2,2)) = power (2,2)) ORDER BY CMPY_NAME ASC";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'CarriersLookup')));
        /*
        SELECT CMPY_CODE, CMPY_NAME
                FROM COMPANYS
                WHERE upper(CMPY_CODE) <> 'ANY'
                AND (-1 = :cmpy_typ_id  OR bitand (cmpy_type, power (2,:cmpy_typ_id)) = power (2,:cmpy_typ_id))
                ORDER BY CMPY_NAME ASC;
        
        $obj = new CompaniesClass();
           $res = $obj->lookupByTypeFrmView(2);
       return $res;
       */

    
    }

    /**
    * SQL INJECTION MITIGATED
    *
    *  29/07/2015    Added variable binding execution
    *
    */
    public function productsLookup($cmpy_code) {
        $mydb = DB::getInstance();
        $sql = array();
        $sql['sql_text'] ="SELECT prod_code,prod_name FROM PRODUCTS WHERE prod_cmpy= :cmpy_code";
        $sql['sql_data'] = array($cmpy_code);
		$rows = $mydb->query($sql);
        //$rows = $mydb->aXuto_binding_exec_zend($sql, $param_arr);
        logMe("[SQL INJECTION MITIGATION]-productsLookup() done", LOADSCHEDCLASS);
        //XarrayEncodingConversion($rows);
		
        return (prepareForAMF($rows, array(0 => 'ProductsLookup')));
    }
    
    public function getLastCompartmentProducts($supplier,$tanker){
        $mydb = DB::getInstance();
        
        $conn = $mydb->connect;
        $curs = oci_new_cursor($conn);
        $stid = oci_parse($conn,"BEGIN :v_res := Load_Schd_Cmpt(:v_supp,:v_tanker); END;");
        
        oci_bind_by_name($stid, ':v_res', $curs, -1, OCI_B_CURSOR);
        oci_bind_by_name($stid, ":v_supp", $supplier);
        oci_bind_by_name($stid, ":v_tanker", $tanker);
        
        oci_execute($stid);
        oci_execute($curs);

        $rows=array();
        while ($data = oci_fetch_assoc($curs)){
            $rows[] = $data;
        }

        oci_free_statement($stid);
        oci_free_statement($curs);

        arrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'LastLoadedProduct')));
    }
    
    public function getSeqNum($sess_id,$terminal,$supplier){
        $fields = array(
            'sess_id'=>urlencode($sess_id),
            'op'=>urlencode("8"),
            'tankTerm'=>urlencode($terminal),
            'supp'=>urlencode($supplier),
            'callerTyp'=>urlencode('flex')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $tripNo='';
        if(preg_match("/(var tripNo=)(\d+)(;)/", $response, $out)){
            $tripNo=$out[2];
            return $tripNo;
        }else{
            return "ERROR";
        }
    }

    /**
    * SQL INJECTION MITIGATED
    *
    *  29/07/2015    Added variable binding execution
    *
    */
    public function getOrders($cmpy_code) {
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] ="SELECT CUSTOMER.CUST_CODE, CUSTOMER.CUST_ACCT, CUST_ORDER.ORDER_NO as ORDERID, CUST_ORDER.ORDER_CUST_ORDNO as CMPY_ORDERID, CUST_ORDER.ORDER_REF_CODE, CUST_ORDER.ORDER_EXP_DATE
                FROM CUSTOMER, CUST_ORDER, COMPANYS
                WHERE
                CUST_ORDER.ORDER_CUST = CUSTOMER.CUST_ACCT
                and CUST_ORDER.ORDER_DRAWER = COMPANYS.CMPY_CODE
                and CUSTOMER.CUST_SUPP = :cmpy_code
                and CUST_ORDER.ORDER_APPROVED = 'Y'
                and CUST_ORDER.ORDER_STAT != 6
                and COMPANYS.CMPY_CODE = :cmpy_code";
        $sql['sql_data'] = array($cmpy_code);
		$rows = $mydb->query($sql);
        //$rows = $mydb->aXuto_binding_exec_zend($sql, $param_arr);
        logMe("[SQL INJECTION MITIGATION]-getOrders() done", LOADSCHEDCLASS);
        foreach($rows as $x){
            $x->DESCRIPTION = $x->CMPY_ORDERID." [".$x->CUST_CODE."]";
        }
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'Order')));        
    }

    /**
    * SQL INJECTION MITIGATED
    *
    *  29/07/2015    Added variable binding execution
    *
    */
    public function getOrderDetails($cmpy_code, $order_id) {
        $mydb = DB::getInstance();
        $sql = array();
        $sql['sql_text'] ="SELECT OPRODMTD.ORDER_PROD_KEY as order_id, OPRODMTD.ORDER_PROD_QTY, OPRODMTD.ORDER_PROD_UNIT, OPRODMTD.OPROD_SCHEDULED, OPRODMTD.OPROD_LOADED, OSPROD_PRODCODE as prod_code, PRODUCTS.PROD_NAME,
            UNIT_SCALE_VW.DESCRIPTION as unit_desc, (OPRODMTD.ORDER_PROD_QTY-OPRODMTD.OPROD_SCHEDULED) as available, CUST_ORDER.ORDER_CUST_ORDNO as CMPY_ORDERID
            FROM OPRODMTD,PRODUCTS,UNIT_SCALE_VW,CUST_ORDER
            WHERE ORDER_PROD_KEY =:order_id
            AND OSPROD_PRODCMPY =:cmpy_code
            AND OSPROD_PRODCODE=PRODUCTS.PROD_CODE
            AND OPRODMTD.ORDER_PROD_UNIT=UNIT_SCALE_VW.UNIT_ID
            AND CUST_ORDER.ORDER_NO = OPRODMTD.ORDER_PROD_KEY";
        $sql['sql_data'] = array($order_id, $cmpy_code);
		$rows = $mydb->query($sql);
        //$rows = $mydb->aXuto_binding_exec_zend($sql, $param_arr);
        logMe("[SQL INJECTION MITIGATION]-getOrderDetails() done", LOADSCHEDCLASS);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'OrderDetails')));
    }

    public function getScheduledCompartments($supplier, $trip_no) {
        $mydb = DB::getInstance();
        
        $conn = $mydb->connect;
        $curs = oci_new_cursor($conn);
        $stid = oci_parse($conn,"BEGIN :v_res := GUI_Schd_Cmpt(:v_supp,:v_tripno); END;");
        
        oci_bind_by_name($stid, ':v_res', $curs, -1, OCI_B_CURSOR);
        oci_bind_by_name($stid, ":v_supp", $supplier);
        oci_bind_by_name($stid, ":v_tripno", $trip_no);
        
        oci_execute($stid);
        oci_execute($curs);

        $rows=array();
        while ($data = oci_fetch_assoc($curs)){
            $rows[] = $data;
        }

        oci_free_statement($stid);
        oci_free_statement($curs);

        arrayEncodingConversion($rows);

        logMe("getScheduledCompartments() done",LOADSCHEDCLASS);

        return (prepareForAMF($rows, array(0 => 'ScheduledCompartments')));
    }

    /**
    * SQL INJECTION MITIGATED
    *
    *  29/07/2015    Added variable binding execution
    *
    */
    public function getDetailsByProducts($supplier, $trip_no) {
        $mydb = DB::getInstance();
        $sql = array();
        $sql['sql_text'] =
            "
            SELECT 
                SPEC_PR.UNIT_CODE
                , SPEC_PR.QTY_SCHEDULED
                , SPEC_PR.PROD_CODE
                , SPEC_PR.PROD_NAME
                , SPEC_PR.PROD_CMPY
                , DECODE(SPEC_PR.SCHP_UNITS, 5, TRSF.TRIP_QTY_AMB, 11, TRSF.TRIP_QTY_STD, 17, TRSF.TRIP_QTY_KG, TRSF.TRIP_QTY_DELIVERED) AS QTY_LOADED
                , UV.DESCRIPTION AS UNIT_NAME
                , CMPT.TRIP_QTY_PRELOAD QTY_PRELOADED 
                , TRSF.TRIP_QTY_AMB QTY_AMB
                , TRSF.TRIP_QTY_STD QTY_STD
                , TRSF.TRIP_QTY_KG QTY_KG
            FROM
                (SELECT SCHPSPID_SHLSTRIP
                , SCHPSPID_SHLSSUPP
                , SCHP_UNITS
                , PROD_CLASS
                , SPEC.SCHP_UNITS AS UNIT_CODE
                , SPEC.SCHP_SPECQTY AS QTY_SCHEDULED
                , PR.PROD_CODE AS PROD_CODE
                , PR.PROD_NAME AS PROD_NAME
                , PR.PROD_CMPY AS PROD_CMPY
                FROM SPECPROD SPEC, PRODUCTS PR
                WHERE 
                SPEC.SCHPPROD_PRODCMPY = PR.PROD_CMPY
                AND SPEC.SCHPPROD_PRODCODE = PR.PROD_CODE
                AND SPEC.SCHPSPID_SHLSTRIP = :trip 
                AND SPEC.SCHPSPID_SHLSSUPP = :supp
                ) SPEC_PR
                , UNIT_SCALE_VW UV
                , (
                    SELECT 
                        SPECDETS.SCHDSPEC_SHLSSUPP AS TRIP_SUPPLIER
                        , SPECDETS.SCHDSPEC_SHLSTRIP AS TRIP_NO
                        , SPECDETS.SCHDPROD_PRODCMPY AS TRIP_PRODCMPY
                        , SPECDETS.SCHDPROD_PRODCODE AS TRIP_PRODCODE
                        , SUM(SPECDETS.SCHD_PRESETQTY) AS TRIP_QTY_PRESET
                        , SUM(SPECDETS.SCHD_PRLDQTY) AS TRIP_QTY_PRELOAD
                        , SUM(SPECDETS.SCHD_SPECQTY) AS TRIP_QTY_SCHED
                        , SUM(SPECDETS.SCHD_DELIVERED) AS TRIP_QTY_LOADED
                        , PRODUCTS.PROD_CLASS
                    FROM SPECDETS, PRODUCTS
                    WHERE SCHDPROD_PRODCMPY = PRODUCTS.PROD_CMPY AND SCHDPROD_PRODCODE = PROD_CODE
                    GROUP BY SCHDSPEC_SHLSSUPP, SCHDSPEC_SHLSTRIP, SCHDPROD_PRODCMPY, SCHDPROD_PRODCODE, PROD_CLASS
                ) CMPT
                , (
                    SELECT 
                        SCHEDULE.SHLS_SUPP AS TRIP_SUPPLIER, PROD_CLASS
                        , SCHEDULE.SHLS_TRIP_NO AS TRIP_NO
                        , TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY
                        , TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE
                        , SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB
                        , SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD
                        , SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG
                      , SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN
                      , SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG
                      , SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
                    FROM 
                      SCHEDULE, LOADS, TRANSACTIONS, TRANSFERS, PRODUCTS
                    WHERE
                        SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
                        AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
                        AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
                        AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
                        AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
                        AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
                        AND TRSFPROD_PRODCODE = PROD_CODE AND TRSFPROD_PRODCMPY = PROD_CMPY
                    GROUP BY SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE, PROD_CLASS
                ) TRSF
            WHERE 
                SPEC_PR.SCHPSPID_SHLSSUPP = CMPT.TRIP_SUPPLIER (+)
                AND SPEC_PR.SCHPSPID_SHLSTRIP = CMPT.TRIP_NO (+)
                AND SPEC_PR.PROD_CLASS = CMPT.PROD_CLASS (+)
                AND CMPT.TRIP_SUPPLIER = TRSF.TRIP_SUPPLIER (+)
                AND CMPT.TRIP_NO = TRSF.TRIP_NO (+)
                AND CMPT.PROD_CLASS = TRSF.PROD_CLASS (+)
                AND UV.UNIT_ID = SPEC_PR.SCHP_UNITS
            ORDER BY SPEC_PR.SCHPSPID_SHLSSUPP, SPEC_PR.SCHPSPID_SHLSTRIP, SPEC_PR.PROD_NAME
            ";
        $sql['sql_data'] = array($trip_no, $supplier);
		$rows = $mydb->query($sql);
        //$rows = $mydb->aXuto_binding_exec_zend($sql, $param_arr);
        logMe("[SQL INJECTION MITIGATION]-getDetailsByProducts() done", LOADSCHEDCLASS);

        //XarrayEncodingConversion($rows);

        //logMe("getDetailsByProducts() done",LOADSCHEDCLASS);

        return (prepareForAMF($rows, array(0 => 'ScheduleProductDetails')));     
    }

    /**
    * SQL INJECTION MITIGATED
    *
    *  29/07/2015    Added variable binding execution
    *
    */
    public function getDetailsByCompartments($supplier, $trip_no) {
        $mydb = DB::getInstance();
        $sql = array();
        $sql['sql_text'] =
            "
            SELECT
                SPEC_PROD.COMPARTMENT, SPEC_PROD.PROD_CODE, SPEC_PROD.PROD_NAME, SPEC_PROD.PROD_CMPY,
                SPEC_PROD.UNIT_CODE, SPEC_PROD.UNIT_NAME, SPEC_PROD.QTY_SCHEDULED, SPEC_PROD.QTY_PRELOAD,
                SPEC_PROD.SCHDSPEC_SHLSTRIP, SPEC_PROD.SCHDSPEC_SHLSSUPP, SPEC_PROD.SCHD_SOLD_TO_NUM,
                SPEC_PROD.SCHD_SHIP_TO_NUM, SPEC_PROD.SCHD_DELIV_NUM, SPEC_PROD.PROD_CLASS
                , DECODE(SPEC_PROD.UNIT_CODE, 5, TRSF.TRIP_QTY_AMB, 11, TRSF.TRIP_QTY_STD, 17, TRSF.TRIP_QTY_KG, TRSF.TRIP_QTY_DELIVERED) AS QTY_LOADED
                , TRSF.TRIP_QTY_AMB QTY_AMB
                , TRSF.TRIP_QTY_STD QTY_STD
                , TRSF.TRIP_QTY_KG QTY_KG
                
            FROM
                (
                SELECT SPEC.SCHD_COMP_ID AS COMPARTMENT
                    , PR.PROD_CODE AS PROD_CODE
                    , PR.PROD_NAME AS PROD_NAME
                    , PR.PROD_CMPY AS PROD_CMPY
                    , SPEC.SCHD_UNITS AS UNIT_CODE
                    , UV.DESCRIPTION AS UNIT_NAME
                    , SPEC.SCHD_SPECQTY AS QTY_SCHEDULED
                    , SPEC.SCHD_PRLDQTY QTY_PRELOAD
                    , SPEC.SCHDSPEC_SHLSTRIP
                    , SPEC.SCHDSPEC_SHLSSUPP
                    , SPEC.SCHD_SOLD_TO_NUM
                    , SPEC.SCHD_SHIP_TO_NUM
                    , SPEC.SCHD_DELIV_NUM
                    , PR.PROD_CLASS
                FROM SPECDETS SPEC
                    , PRODUCTS PR
                    , UNIT_SCALE_VW UV
                WHERE SPEC.SCHDPROD_PRODCMPY = PR.PROD_CMPY
                    AND SPEC.SCHDPROD_PRODCODE = PR.PROD_CODE
                    AND UV.UNIT_ID = SPEC.SCHD_UNITS
                    AND SPEC.SCHDSPEC_SHLSTRIP = :trip 
                    AND SPEC.SCHDSPEC_SHLSSUPP = :supp
                ) SPEC_PROD
                , (
                    SELECT
                        SCHEDULE.SHLS_SUPP AS TRIP_SUPPLIER
                        , PRODUCTS.PROD_CLASS AS PROD_CLASS
                        , SCHEDULE.SHLS_TRIP_NO AS TRIP_NO
                        , TRANSFERS.TRSF_DES AS TRIP_COMPARTMENT
                        , TRANSFERS.TRSFPROD_PRODCMPY AS TRIP_PRODCMPY
                        , TRANSFERS.TRSFPROD_PRODCODE AS TRIP_PRODCODE
                        , SUM(TRANSFERS.TRSF_QTY_AMB) AS TRIP_QTY_AMB
                        , SUM(TRANSFERS.TRSF_QTY_COR) AS TRIP_QTY_STD
                        , SUM(TRANSFERS.TRSF_LOAD_KG) AS TRIP_QTY_KG
                        , SUM(TRANSFERS.TRSF_RETURNS) AS TRIP_QTY_RTN
                        , SUM(TRANSFERS.TRSF_PRELOAD_KG) AS TRIP_QTY_PKG
                        , SUM(TRANSFERS.TRSF_DELIVERED) AS TRIP_QTY_DELIVERED
                    FROM
                        SCHEDULE, LOADS, TRANSACTIONS, TRANSFERS, PRODUCTS
                    WHERE
                        SCHEDULE.SHLSLOAD_LD_TRM = LOADS.LD_TERMINAL
                        AND SCHEDULE.SHLSLOAD_LOAD_ID = LOADS.LOAD_ID
                        AND LOADS.LOAD_ID = TRANSACTIONS.TRSALDID_LOAD_ID
                        AND LOADS.LD_TERMINAL = TRANSACTIONS.TRSALDID_LD_TRM
                        AND TRANSACTIONS.TRSA_ID = TRANSFERS.TRSFTRID_TRSA_ID
                        AND TRANSACTIONS.TRSA_TERMINAL = TRANSFERS.TRSFTRID_TRSA_TRM
                        AND TRSFPROD_PRODCMPY = PRODUCTS.PROD_CMPY AND TRSFPROD_PRODCODE = PRODUCTS.PROD_CODE
                    GROUP BY 
                        SCHEDULE.SHLS_SUPP, SCHEDULE.SHLS_TRIP_NO, TRANSFERS.TRSF_DES, 
                        TRANSFERS.TRSFPROD_PRODCMPY, TRANSFERS.TRSFPROD_PRODCODE, PROD_CLASS
                        ) TRSF
            WHERE
                SPEC_PROD.SCHDSPEC_SHLSSUPP = TRSF.TRIP_SUPPLIER (+)
                AND SPEC_PROD.SCHDSPEC_SHLSTRIP = TRSF.TRIP_NO (+)
                AND SPEC_PROD.COMPARTMENT = TRSF.TRIP_COMPARTMENT (+)
                AND SPEC_PROD.PROD_CLASS = TRSF.PROD_CLASS (+)
            ORDER BY SPEC_PROD.SCHDSPEC_SHLSSUPP, SPEC_PROD.SCHDSPEC_SHLSTRIP, SPEC_PROD.COMPARTMENT
            ";
        $sql['sql_data'] = array($trip_no, $supplier);
		$rows = $mydb->query($sql);
        //$rows = $mydb->aXuto_binding_exec_zend($sql, $param_arr);
        logMe("[SQL INJECTION MITIGATION]-getDetailsByCompartments() done", LOADSCHEDCLASS);

        //XarrayEncodingConversion($rows);

        //logMe("getDetailsByCompartments() done",LOADSCHEDCLASS);

        return (prepareForAMF($rows, array(0 => 'ScheduleCompartmentDetails')));
    }

    /**
    * SQL INJECTION MITIGATED
    *
    *  29/07/2015    Added variable binding execution
    *
    */
    public function checkTripNumber($trip_no, $supplier) {
        $mydb = DB::getInstance();
        $sql = array();
        $sql['sql_text'] ="select SHLS_TRIP_NO, SHLS_SUPP 
            from SCHEDULE
            where SHLS_TRIP_NO = :trip 
            and SHLS_SUPP = :supp";
        $sql['sql_data'] = array($trip_no, $supplier);
		$rows = $mydb->query($sql);
        //$rows = $mydb->aXuto_binding_exec_zend($sql, $param_arr);
        logMe("[SQL INJECTION MITIGATION]-checkTripNumber() done", LOADSCHEDCLASS);

        if(sizeof($rows)>0) return "KO";
        else return "OK";
    }
    
    public function create($data){
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        logMe("Info: ++++++Adding new load schedule++++++",LOADSCHEDCLASS);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'sched_type'=>urlencode($data->sched_type),
            'tripNo'=>urlencode($data->tripNo),
            'carr'=>urlencode($data->carr),
            'tanker'=>urlencode($data->tanker),
            'date'=>urlencode($data->date),
            'shift'=>urlencode($data->shift),
            'priority'=>urlencode($data->priority),
            'tankTerm'=>urlencode($data->tankTerm),
            'tripExpirDteTime'=>urlencode($data->tripExpirDteTime),
            'supp'=>urlencode($data->supp),
            'container'=>urlencode($data->container),
            'op'=>urlencode("18"),
            'cmd'=>urlencode("ADD"),
            'callerTyp'=>urlencode('flex')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        logMe($response,LOADSCHEDCLASS);
        if($response==''){
            logMe("Load schedule CGI response was empty",LOADSCHEDCLASS);
            return "ERROR_EMPTY";
        }else{
            $patternSuccess = "var op=28;";
            $isFound = strstr($response, $patternSuccess);
            if ($isFound == false) {
                logMe("Add load schedule failed!!!",LOADSCHEDCLASS);
                return "ERROR";
            }
            logMe("CGI Add load schedule succeeded!!!",LOADSCHEDCLASS);
        }
        
        $this->updateSchedule($data->tripNo,$data->supp,$data->soldto,$data->shipto, '');
        
        if($data->type_of_schedule=='COMPARTMENTS'){
            foreach($data->compartments as $x){
                logMe("Info: ++++++Adding new load schedule compartment++++++",LOADSCHEDCLASS);
                $fields = array(
                    'sess_id'=>urlencode($data->session_id),
                    'sched_type'=>urlencode($data->sched_type),
                    'prod'=>urlencode($x->prod),
                    'unit'=>urlencode($x->unit),
                    'sched'=>urlencode($x->sched),
                    'order'=>urlencode($x->order),
                    'bay_armCd'=>urlencode($x->bay_armCd),
                    'tankTerm'=>urlencode($data->tankTerm),
                    'supp'=>urlencode($data->supp),
                    'tripNo'=>urlencode($data->tripNo),
                    'tanker'=>urlencode($data->tanker),
                    /*********CHECK*********************/
                    'drawer'=>urlencode($data->supp),
                    /***********************************/
                    'cmptID'=>urlencode($x->cmptID),
                    'tlrcmpt'=>urlencode($x->tlrcmpt),
                    'op'=>urlencode("17"),
                    'cmd'=>urlencode("MOD"),
                    'callerTyp'=>urlencode('flex')
                );
                $thunkObj = new Thunk($this->host, $this->cgi_cmpts, $fields);
                $thunkObj->writeToClient($this->cgi_cmpts);

                $response = $thunkObj->read();
                logMe($response,LOADSCHEDCLASS);
                if($response==''){
                    logMe("Load schedule CGI(1 COMPARTMENT) response was empty",LOADSCHEDCLASS);
                    // Rollback
                    if ($this->delete($data) == "OK"){
                        return "ERROR_ROLLBACK_OCCURED";
                    }else{
                        return "ERROR_FATAL";
                    }
                }else{
					/*
                    $patternSuccess = "Success!";
                    $isFound = strstr($response, $patternSuccess);
                    if ($isFound == false) {
					*/
					$patternSuccessEng = "Success!";
					$patternSuccessChn = "成功";
					$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
					$isFoundEng = strpos($response, $patternSuccessEng);
					$isFoundChn = strpos($response, $patternSuccessChn);
					$isFoundUtf = strpos($response, $patternSuccessUtf);
					if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
                       logMe("Add load schedule(1 COMPARTMENT) failed!!!",LOADSCHEDCLASS);
                        // Rollback
                        if ($this->delete($data) == "OK"){
                            return "ERROR_ROLLBACK_OCCURED";
                        }else{
                            return "ERROR_FATAL";
                        }
                    }
                    logMe("CGI Add load schedule(1 COMPARTMENT) succeeded!!!",LOADSCHEDCLASS);
                }
                $this->updateScheduleCmpts($data->tripNo,$data->supp,$x->cmptID, $x->delnum,$x->soldto,$x->shipto);
           }
            logMe("CGI Add load schedule compartment succeeded!!!",LOADSCHEDCLASS);
        }else{
            foreach($data->products as $x){
                logMe("Info: ++++++Adding new load schedule product++++++",LOADSCHEDCLASS);
                $fields = array(
                    'sess_id'=>urlencode($data->session_id),
                    'sched_type'=>urlencode($data->sched_type),
                    'prod'=>urlencode($x->prod),
                    'unit'=>urlencode($x->unit),
                    'sched'=>urlencode($x->sched),
                    'tankTerm'=>urlencode($data->tankTerm),
                    'supp'=>urlencode($data->supp),
                    'tripNo'=>urlencode($data->tripNo),
                    'tanker'=>urlencode($data->tanker),
                    /*********CHECK*********************/
                    'drawer'=>urlencode($data->supp),
                    /***********************************/
                    'op'=>urlencode("18"),
                    'cmd'=>urlencode("ADD"),
                    'callerTyp'=>urlencode('flex')
                );
                $thunkObj = new Thunk($this->host, $this->cgi_prod, $fields);
                $thunkObj->writeToClient($this->cgi_prod);

                $response = $thunkObj->read();
                logMe($response,LOADSCHEDCLASS);
                if($response==''){
                    logMe("Load schedule CGI(1 PRODUCT) response was empty",LOADSCHEDCLASS);
                    // Rollback
                    if ($this->delete($data) == "OK"){
                        return "ERROR_ROLLBACK_OCCURED";
                    }else{
                        return "ERROR_FATAL";
                    }
                }else{
					/*
                    $patternSuccess = "Success!";
                    $isFound = strstr($response, $patternSuccess);
                    if ($isFound == false) {
					*/
					$patternSuccessEng = "Success!";
					$patternSuccessChn = "成功";
					$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
					$isFoundEng = strpos($response, $patternSuccessEng);
					$isFoundChn = strpos($response, $patternSuccessChn);
					$isFoundUtf = strpos($response, $patternSuccessUtf);
					if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
                        logMe("Add load schedule(1 PRODUCT) failed!!!",LOADSCHEDCLASS);
                        // Rollback
                        if ($this->delete($data) == "OK"){
                            return "ERROR_ROLLBACK_OCCURED";
                        }else{
                            return "ERROR_FATAL";
                        }
                    }
                    logMe("CGI Add load schedule(1 PRODUCT) succeeded!!!",LOADSCHEDCLASS);
                }
            }
            logMe("CGI Add load schedule product succeeded!!!",LOADSCHEDCLASS);
        }
        return "OK";
    }

    public function checkCurrentTripStatus($trip_no, $supplier)
	{
        $mydb = DB::getInstance();
		
		$sql = array();
        $sql['sql_text'] = "SELECT NVL(STATS, 'F') as TRIP_STATUS FROM SCHEDULE where SHLS_TRIP_NO = :trip_num and SHLS_SUPP = :supp_code";
		$sql['sql_data'] = array( $trip_no, $supplier );
		
        $rows = $mydb->query($sql);
        return ($rows[0]->TRIP_STATUS);
    }

    public function update($data){
		
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
		// check trip status
		$curr_status = $this->checkCurrentTripStatus( $data->tripNo, $data->supp );
		if ( $curr_status != "F" )
		{
                return "ERROR";
		}
		
        logMe("Info: ++++++Updating load schedule++++++",LOADSCHEDCLASS);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'tripNo'=>urlencode($data->tripNo),
            'carr'=>urlencode($data->carr),
            'tanker'=>urlencode($data->tanker),
            'date'=>urlencode($data->date),
            'shift'=>urlencode($data->shift),
            'priority'=>urlencode($data->priority),
            'tankTerm'=>urlencode($data->tankTerm),
            'tripExpirDteTime'=>urlencode($data->tripExpirDteTime),
            'supp'=>urlencode($data->supp),
            'container'=>urlencode($data->container),
            'op'=>urlencode("17"),
            'cmd'=>urlencode("MOD"),
            'callerTyp'=>urlencode('flex')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        logMe($response,LOADSCHEDCLASS);
        if($response==''){
            logMe("Load schedule CGI response was empty",LOADSCHEDCLASS);
            return "ERROR_EMPTY";
        }else{
            $patternSuccess = "var op=27;"; // js=>l_opInf[27]= ml(t__Successfully_Updated)+"!";
            $isFound = strstr($response, $patternSuccess);
            if ($isFound == false) {
                logMe("Update load schedule failed!!!",LOADSCHEDCLASS);
                return "ERROR";
            }
            logMe("CGI Update load schedule succeeded!!!",LOADSCHEDCLASS);
        }
        $this->updateSchedule($data->tripNo,$data->supp,$data->soldto,$data->shipto, $data->driver);

        if($data->type_of_schedule=='COMPARTMENTS'){        
            foreach($data->compartments as $x){
                logMe("Info: ++++++Updating new load schedule compartment++++++",LOADSCHEDCLASS);
                $fields = array(
                    'sess_id'=>urlencode($data->session_id),
                    'prod'=>urlencode($x->prod),
                    'unit'=>urlencode($x->unit),
                    'sched'=>urlencode($x->sched),
                    'order'=>urlencode($x->order),
                    'bay_armCd'=>urlencode($x->bay_armCd),
                    'tankTerm'=>urlencode($data->tankTerm),
                    'supp'=>urlencode($data->supp),
                    'tripNo'=>urlencode($data->tripNo),
                    'tanker'=>urlencode($data->tanker),
                    /*********CHECK*********************/
                    'drawer'=>urlencode($data->supp),
                    /***********************************/
                    'cmptID'=>urlencode($x->cmptID),
                    'tlrcmpt'=>urlencode($x->tlrcmpt),
                    'delnum'=>urlencode($x->delnum),
                    'shipto'=>urlencode($x->shipto),
                    'soldto'=>urlencode($x->soldto),
                    'op'=>urlencode("17"),
                    'cmd'=>urlencode("MOD"),
                    'callerTyp'=>urlencode('flex')
                );
                $thunkObj = new Thunk($this->host, $this->cgi_cmpts, $fields);
                $thunkObj->writeToClient($this->cgi_cmpts);

                $response = $thunkObj->read();
                logMe($response,LOADSCHEDCLASS);
                if($response==''){
                    logMe("Load schedule CGI(1 COMPARTMENT) response was empty",LOADSCHEDCLASS);
                    return "ERROR";
                }else{
					/*
                    $patternSuccess = "Success!"; // <- fixed message? what about other languages?
                    $isFound = strstr($response, $patternSuccess);
                    if ($isFound == false) {
					*/
					$patternSuccessEng = "Success!";
					$patternSuccessChn = "成功";
					$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
					$isFoundEng = strpos($response, $patternSuccessEng);
					$isFoundChn = strpos($response, $patternSuccessChn);
					$isFoundUtf = strpos($response, $patternSuccessUtf);
					if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
                        logMe("Update load schedule(1 COMPARTMENT) failed!!!",LOADSCHEDCLASS);
                        return "ERROR";
                    }
                    logMe("CGI Update load schedule(1 COMPARTMENT) succeeded!!!",LOADSCHEDCLASS);
                 $this->updateScheduleCmpts($data->tripNo,$data->supp,$x->cmptID, $x->delnum,$x->soldto,$x->shipto);
               }                
                logMe("CGI Update load schedule compartment succeeded!!!",LOADSCHEDCLASS);
            }
        }
        else
        {
            // Check schedule type before updating by PRODUCT
            $obj = new EquipmentListClass();
            $res = $obj->getSchdType($data->supp, $data->tripNo);
            logMe("Info: Load Schedule type(getSchdType)=".$res, LOADSCHEDCLASS);
            if ($res == 1)
            { //Load Schedule by Compartment
                return "ERROR_MISMATCH_UPDATE";
            }

            foreach($data->products as $x)
            {
                logMe("Info: ++++++Updating new load schedule product++++++",LOADSCHEDCLASS);
                $fields = array(
                    'sess_id'=>urlencode($data->session_id),
                    'prod'=>urlencode($x->prod),
                    'unit'=>urlencode($x->unit),
                    'sched'=>urlencode($x->sched),
                    'tankTerm'=>urlencode($data->tankTerm),
                    'supp'=>urlencode($data->supp),
                    'tripNo'=>urlencode($data->tripNo),
                    'tanker'=>urlencode($data->tanker),
                    /*********CHECK*********************/
                    'drawer'=>urlencode($data->supp),
                    /***********************************/
                    'op'=>urlencode("17"),
                    'cmd'=>urlencode("MOD"),
                    'callerTyp'=>urlencode('flex')
                );
                $thunkObj = new Thunk($this->host, $this->cgi_prod, $fields);
                $thunkObj->writeToClient($this->cgi_prod);

                $response = $thunkObj->read();
                logMe($response,LOADSCHEDCLASS);
                if($response=='')
                {
                    logMe("Load schedule CGI(1 PRODUCT) response was empty",LOADSCHEDCLASS);
                    return "ERROR";
                }
                else
                {
                    $patternSuccess = "var op=27;"; //js==>l_opInf[27]= ml(t__Successfully_Updated)+"!";
                    $isFound = strstr($response, $patternSuccess);
                    if ($isFound == false) 
                    {
                        logMe("Update load schedule(1 PRODUCT) failed!!!",LOADSCHEDCLASS);
                        // In this case the product you are tring to update may be a new one, so CGI failed.
                        // Try to add it.
                        $fields2 = array(
                            'sess_id'=>urlencode($data->session_id),
                            'prod'=>urlencode($x->prod),
                            'unit'=>urlencode($x->unit),
                            'sched'=>urlencode($x->sched),
                            'tankTerm'=>urlencode($data->tankTerm),
                            'supp'=>urlencode($data->supp),
                            'tripNo'=>urlencode($data->tripNo),
                            'tanker'=>urlencode($data->tanker),
                            /*********CHECK*********************/
                            'drawer'=>urlencode($data->supp),
                            /***********************************/
                            'op'=>urlencode("18"),
                            'cmd'=>urlencode("ADD"),
                            'callerTyp'=>urlencode('flex')
                        );
                        $thunkObj2 = new Thunk($this->host, $this->cgi_prod, $fields2);
                        $thunkObj2->writeToClient($this->cgi_prod);
                
                        $response2 = $thunkObj2->read();
                        logMe($response2,LOADSCHEDCLASS);
                        if($response2=='')
                        {
                            logMe("Load schedule CGI(1 PRODUCT) response was empty(update->add)",LOADSCHEDCLASS);
                            return "ERROR";
                        }
                        else
                        {
							/*
                            $patternSuccess2 = "Success!";
                            $isFound2 = strstr($response2, $patternSuccess2);
                            if ($isFound2 == false) 
							*/
							$patternSuccess2Eng = "Success!";
							$patternSuccess2Chn = "成功";
							$patternSuccess2Utf = mb_convert_encoding($patternSuccess2Chn, 'UTF-8', 'GB2312');
							$isFound2Eng = strpos($response2, $patternSuccess2Eng);
							$isFound2Chn = strpos($response2, $patternSuccess2Chn);
							$isFound2Utf = strpos($response2, $patternSuccess2Utf);
							if ($isFound2Eng === FALSE && $isFound2Chn === FALSE && $isFound2Utf === FALSE) {
							/*
							$isFound2Eng = strstr($response2, $patternSuccess2Eng);
							$isFound2Chn = strstr($response2, $patternSuccess2Chn);
							if ($isFound2Eng == false && $isFound2Chn == false) 
                            {*/
                                logMe("Add load schedule(1 PRODUCT) failed!!!(update->add)",LOADSCHEDCLASS);
                                return "ERROR";
                            }
                            logMe("CGI Add load schedule(1 PRODUCT) succeeded!!!(update->add)",LOADSCHEDCLASS);
                        }
                    }
                    else
                    {
                        logMe("CGI Update load schedule(1 PRODUCT) succeeded!!!",LOADSCHEDCLASS);
                    }
                }
                
                // delete the product if its sched=0
                if ($x->sched == 0 || $x->sched == "")
                {
                    $this->deleteSpecProduct($data->tripNo, $data->supp, $x->prod, $data->supp);
                }
            }
            logMe("CGI Update load schedule product succeeded!!!",LOADSCHEDCLASS);
        }

        return "OK";
    }

    /**
    * SQL INJECTION MITIGATED
    *
    *  29/07/2015    Added variable binding execution
    *
    */
    public function updateSchedule($trip, $supp, $soldto, $shipto, $driver='') {
        $mydb = DB::getInstance();
        $sql = array();
        $sql['sql_text'] ="update SCHEDULE set SHLS_SOLD_TO_NUM= :soldto, SHLS_SHIP_TO_NUM= :shipto, SHLS_DRIVER= :driver where SHLS_SUPP= :supp and SHLS_TRIP_NO= :trip";
        $sql['sql_data'] = array($soldto, $shipto, $driver, $supp, $trip);
        $result = $mydb->update($sql);
        //$result = $mydb->aXuto_binding_update($sql, $param_arr);
        logMe("[SQL INJECTION MITIGATION]-updateSchedule() done", LOADSCHEDCLASS);
        return $result;
    }

    /**
    * SQL INJECTION MITIGATED
    *
    *  29/07/2015    Added variable binding execution
    *
    */
    public function updateScheduleCmpts($trip, $supp, $cmpt, $delnum, $soldto, $shipto) {
        $mydb = DB::getInstance();
        $sql = array();
        $sql['sql_text'] ="update SPECDETS set SCHD_DELIV_NUM= :delnum, SCHD_SOLD_TO_NUM= :soldto, SCHD_SHIP_TO_NUM= :shipto where SCHDSPEC_SHLSSUPP= :supp and SCHDSPEC_SHLSTRIP= :trip and SCHD_COMP_ID= :cmpt";
        $sql['sql_data'] = array($delnum, $soldto, $shipto, $supp, $trip, $cmpt);
        $result = $mydb->update($sql);
        //$result = $mydb->aXuto_binding_update($sql, $param_arr);
        logMe("[SQL INJECTION MITIGATION]-updateScheduleCmpts() done", LOADSCHEDCLASS);
        return $result;
    }

    /**
    * SQL INJECTION MITIGATED
    *
    *  29/07/2015    Added variable binding execution
    *
    */
    public function deleteSpecProduct($trip, $supp, $prod, $cmpy) {
        $mydb = DB::getInstance();
        logMe("**********************************Delete from specprod*********************************************",LOADSCHEDCLASS);
        logMe("Date: " . $phpdate, LOADSCHEDCLASS);
        $sql = array();
        $sql['sql_text'] = "delete from SPECPROD where SCHPSPID_SHLSTRIP= :trip and SCHPSPID_SHLSSUPP= :supp and SCHPPROD_PRODCODE= :prod and SCHPPROD_PRODCMPY= :cmpy";
        $sql['sql_data'] = array($trip, $supp, $prod, $cmpy);
        $result = $mydb->delete($sql);
        //$result = $mydb->aXuto_binding_delete($sql, $param_arr);
        logMe("[SQL INJECTION MITIGATION]-deleteSpecProduct() done", LOADSCHEDCLASS);
        if ( $result == RETURN_OK )
        {
            return "OK";
        }
        else
        {
            return "ERROR";
        }
    }

    public function delete($data){
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        logMe("Info: ++++++Deleting load schedule++++++",LOADSCHEDCLASS);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'tankTerm'=>urlencode($data->tankTerm),
            'supp'=>urlencode($data->supp),
            'tripNo'=>urlencode($data->tripNo),
            'op'=>urlencode("19"),
            'cmd'=>urlencode("DEL"),
            'callerTyp'=>urlencode('flex')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        logMe($response,LOADSCHEDCLASS);
        if($response==''){
            logMe("Load schedule CGI response was empty",LOADSCHEDCLASS);
            return "ERROR_EMPTY";
        }else{
			/*
            $patternSuccess = "Successfully Deleted";  // <-fixed message?
            $isFound = strstr($response, $patternSuccess);
            if ($isFound == false) {
			*/	
			$patternSuccessEng = "Successfully Deleted";
			$patternSuccessChn = "成功删除";
			$patternSuccessUtf = mb_convert_encoding($patternSuccessChn, 'UTF-8', 'GB2312');
			$isFoundEng = strpos($response, $patternSuccessEng);
			$isFoundChn = strpos($response, $patternSuccessChn);
			$isFoundUtf = strpos($response, $patternSuccessUtf);
			if ($isFoundEng === FALSE && $isFoundChn === FALSE && $isFoundUtf === FALSE) {
                logMe("Delete load schedule failed!!!",LOADSCHEDCLASS);
                return "ERROR";
            }
            logMe("CGI Delete load schedule succeeded!!!",LOADSCHEDCLASS);
        }

        return "OK";
    }    

    public function schedStatus()
    {
        $mydb = DB::getInstance();
        $sql="SELECT * FROM SCHEDULE_STATUS_SHORT_LOOKUP order by STATUS_ID";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return $rows;
    }
    
    public function updateAdhocKey($data)
    {
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////// new module to log any changes of any fields on any screen ////////////////////////
        ////////////////////// Before the updates                                        ////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        $keys = array ("KYA_TXT"=>($data->kya_txt));
        $excludes = array ("KYA_DMY"=>0, "KYA_PIN"=>0, "KYA_LAST_PIN_CHG"=>0);
        $upd_journal = new UpdateJournalClass( "Load Schedules", "ACCESS_KEYS", $keys, $excludes );
        $upd_journal->setOldValues( $upd_journal->getRecordValues() );
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        /**************************************************************************************************
        Call CGI to add ID Assignment 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Adhoc ID Assignment++++++",IDASSIGNMENTCLASS);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
//            'selKeyNo'=>urlencode($data->kya_key_no),
//            'selKeyCo'=>urlencode($data->kya_key_issuer),
            'selKeyText'=>urlencode($data->kya_txt),
            'selKeyTanker'=>urlencode($data->kya_tanker),

            'op'=>urlencode("601"),
            'callerTyp'=>urlencode('flex')
        );
        $thunkObj = new Thunk($this->host, $this->cgi_adhoc, $fields);
        $thunkObj->writeToClient($this->cgi_adhoc);

        $response = $thunkObj->read();
        $patternSuccess = "var op=611;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Update Adhoc ID Assignment!!!",IDASSIGNMENTCLASS);
                return "ERROR";
        }
        logMe("CGI Update Adhoc ID Assignment!!!",IDASSIGNMENTCLASS);

        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////// new module to log any changes of any fields on any screen ////////////////////////
        ////////////////////// After the updates                                         ////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        $upd_journal->setNewValues( $upd_journal->getRecordValues() );
        $upd_journal->log();
        /////////////////////////////////////////////////////////////////////////////////////////////////////////

        return "OK";
    }

    public function getAdhocKeys()
    {
        $mydb = DB::getInstance();
        $sql="
            SELECT 
                kya_key_no
                , kya_txt
                , kya_tanker 
            FROM 
                gui_access_keys 
            WHERE 
                kya_type=4 
                and kya_lock='N'
                and kya_adhoc='Y'";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return ($rows);
    }

}
?>
