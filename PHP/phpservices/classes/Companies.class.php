<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');

/* define the module name for calling logMe() to output */
if(!defined('COMPCLASS')) define('COMPCLASS','Companies.class');

class CompaniesClass {
    public function getTypes(){
        $mydb = DB::getInstance();
        $sql="SELECT * FROM COMPANY_TYP";
        $res = $mydb->query($sql);
        return $res;        
    }
    
    public function getTransactionCompanyTypes(){
        $mydb = DB::getInstance();
        $sql = "SELECT * FROM COMPANY_TYP WHERE (COMPANY_ID=1 OR COMPANY_ID=2 OR COMPANY_ID=4)";
        
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => "companytypelookup")));
    }
    
    
    public function getCompanies($filter='',$sort='')
    {
        $mydb = DB::getInstance();
        logMe("Sort: " . $sort, COMPCLASS);
        if($sort!='')$sort="ORDER BY $sort";
		else $sort="ORDER BY CMPY_CODE";
        //else $sort="ORDER BY nlssort($sort,'NLS_SORT=BINARY_CI') ASC";
        //$sql="SELECT * FROM gui_companys $filter $sort";
        //logMe("Final SQL: " .$sql, COMPCLASS);
        
        $sql = array();
        $sql['sql_text'] = "SELECT CMPY_CODE,
            CMPY_NAME,
            CMPY_TYPE,
            SITE_MANAGER,
            SUPPLIER,
            CARRIER,
            CUSTOMER,
            DRAWER,
            ISSUER,
            EMPLOYER,
            HOST,
            CMPY_ADD_PROMPT,
            CMPY_AOI,
            CMPY_AUTO_LD,
            CMPY_AUTO_RECONC,
            CMPY_BAY_LOOP_CH,
            CMPY_BLTOL_FLAG,
            CMPY_BOL_VP_NAME,
            CMPY_CHECK_LICEN,
            CMPY_COMMS_OK,
            CMPY_COMPRESS_BL,
            CMPY_DRV_INST_VP,
            CMPY_ENABLE_EXPD,
            CMPY_EXP_CODE,
            CMPY_FLAG_1,
            CMPY_FLAG_2,
            CMPY_FLAG_3,
            CMPY_HOST,
            CMPY_HOST_DOCS,
            CMPY_ISSU,
            CMPY_LD_REP_VP,
            CMPY_LDGO_DELTA,
            CMPY_LDTOL_FLAG,
            CMPY_LOG_LD_DEL,
            CMPY_MOD_DRAWER,
            CMPY_MSG,
            CMPY_MUST_SEALNO,
            CMPY_ORD_CARRIER,
            CMPY_ORD_END,
            CMPY_ORD_LAST,
            CMPY_ORD_STRT,
            CMPY_REQ_PIN_FLAG,
            CMPY_RPT_T_UNIT,
            CMPY_RPT_TEMP,
            CMPY_RTN_PROMPT,
            CMPY_SEAL_NUMBER,
            CMPY_TKR_ACTIVAT,
            CMPY_TKR_CFG,
            CMPY_TRIP_END,
            CMPY_TRIP_LAST,
            CMPY_TRIP_STRT,
            CMPY_VET,
            CMPY_WGH_AUTO_FL,
            CMPY_WGH_COMPLET,
            CMPY_WIPE_ORDETS,
            CMPY_PLANT,
            CMPY_SCHD_REV_REPOST,
            CMPY_SCHD_ARCHIVE,
            CMPY_MOVEMENTS_REV,
            CMPY_REPORT_RECEIVERS,
            CMPY_PERMIT_NO FROM(
                SELECT res.*, ROW_NUMBER() over ($sort) RN
                FROM(SELECT * FROM GUI_COMPANYS " . $filter['sql_text'] . ") res
             )";
        // $sql['sql_text'] = "SELECT * FROM gui_companys " . $filter['sql_text'] . " $sort";
        // echo $sql['sql_text'];
        $sql['sql_data'] = $filter['sql_data'];
        
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => "companys")));
    }
    
    public function getPaged($offset,$tot,$filter='',$sort='')
    {
        $mydb = DB::getInstance();
        logMe("Sort: " . $sort, COMPCLASS);
        if($key=='') $key = getTableKey("companys");
        
        if($sort!='')$sort="ORDER BY nlssort($sort,'NLS_SORT=BINARY_CI') ASC";
        /*
        $sql="SELECT * FROM(
                SELECT res.*, ROW_NUMBER() over ($sort) RN
                FROM(SELECT * FROM gui_companys $filter) res
             )
             where RN between ".($offset+1)." and ".($offset+$tot)." $sort";        
        logMe("Final SQL: " .$sql, COMPCLASS);
        */
        $sql = array();
        $sql['sql_text'] = "SELECT CMPY_CODE
            CMPY_NAME,
            CMPY_TYPE,
            SITE_MANAGER,
            SUPPLIER,
            CARRIER,
            CUSTOMER,
            DRAWER,
            ISSUER,
            EMPLOYER,
            HOST,
            CMPY_ADD_PROMPT,
            CMPY_AOI,
            CMPY_AUTO_LD,
            CMPY_AUTO_RECONC,
            CMPY_BAY_LOOP_CH,
            CMPY_BLTOL_FLAG,
            CMPY_BOL_VP_NAME,
            CMPY_CHECK_LICEN,
            CMPY_COMMS_OK,
            CMPY_COMPRESS_BL,
            CMPY_DRV_INST_VP,
            CMPY_ENABLE_EXPD,
            CMPY_EXP_CODE,
            CMPY_FLAG_1,
            CMPY_FLAG_2,
            CMPY_FLAG_3,
            CMPY_HOST,
            CMPY_HOST_DOCS,
            CMPY_ISSU,
            CMPY_LD_REP_VP,
            CMPY_LDGO_DELTA,
            CMPY_LDTOL_FLAG,
            CMPY_LOG_LD_DEL,
            CMPY_MOD_DRAWER,
            CMPY_MSG,
            CMPY_MUST_SEALNO,
            CMPY_ORD_CARRIER,
            CMPY_ORD_END,
            CMPY_ORD_LAST,
            CMPY_ORD_STRT,
            CMPY_REQ_PIN_FLAG,
            CMPY_RPT_T_UNIT,
            CMPY_RPT_TEMP,
            CMPY_RTN_PROMPT,
            CMPY_SEAL_NUMBER,
            CMPY_TKR_ACTIVAT,
            CMPY_TKR_CFG,
            CMPY_TRIP_END,
            CMPY_TRIP_LAST,
            CMPY_TRIP_STRT,
            CMPY_VET,
            CMPY_WGH_AUTO_FL,
            CMPY_WGH_COMPLET,
            CMPY_WIPE_ORDETS,
            CMPY_PLANT,
            CMPY_SCHD_REV_REPOST,
            CMPY_SCHD_ARCHIVE,
            CMPY_MOVEMENTS_REV,
            CMPY_REPORT_RECEIVERS,
            CMPY_PERMIT_NO
        FROM(
                SELECT res.*, ROW_NUMBER() over ($sort) RN
                FROM(SELECT * FROM gui_companys " . $filter['sql_text'] . ") res
             )
             where RN between ".($offset+1)." and ".($offset+$tot)." $sort";  
        $sql['sql_data'] = $filter['sql_data'];
        
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => "companys")));
    }
    
    public function lookup(){
        $mydb = DB::getInstance();
        $sql="SELECT CMPY_CODE,CMPY_NAME FROM COMPANYS ORDER BY CMPY_NAME ASC";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'CompanyLookup')));
    }
    
    public function getCompany($code, $tblname){
        $mydb = DB::getInstance();
        //$sql = "SELECT * from $tblname where cmpy_code='$code'";
        $sql = array();
        $sql['sql_text'] = "SELECT * from $tblname where cmpy_code=:cmpy_code ";
        $sql['sql_data'] = array( $code );
        
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => $tblname)));
        
    }
    
    /**
    * Get company by its type. By default, type is supplier. 
    * A companay can have multiply roles, as long as it is a supplier, the company will be returned
    * @param cmpp_type: 0: SITE_MANAGER_CMPY;
                        1: SUPPLIER_COMPANY;
                        2: CARRIER_COMPANY;
                        3: CUSTOMER_COMPANY;
                        4: DRAWER_COMPANY;
                        5: ISSUER_COMPANY;
                        6: EMPLOYER_COMPANY;
                        7: HOST_COMPANY;
    */    
    public function lookupByType($cmpy_type = 1)
    {
        $bitAnd = pow(2, $cmpy_type);
        logMe($bitAnd, "COMPANIES");
        $mydb = DB::getInstance();
        //$sql="SELECT CMPY_CODE,CMPY_NAME FROM COMPANYS WHERE BITAND(cmpy_type,$bitAnd)<>0 ORDER BY CMPY_NAME ASC";
        $sql = array();
//        $sql['sql_text'] = "SELECT CMPY_CODE,CMPY_NAME FROM COMPANYS WHERE BITAND(cmpy_type,:type_bitAnd)<>0 ORDER BY CMPY_NAME ASC";
        if ( $cmpy_type != 2 && $cmpy_type != 6 ) 
        {
            $sql['sql_text'] = "SELECT CMPY_CODE,CMPY_NAME FROM GUI_COMPANYS WHERE BITAND(cmpy_type,:type_bitAnd)<>0 ORDER BY CMPY_NAME ASC";
        }
        else
        {
            $sql['sql_text'] = "
                SELECT distinct 
                    CMPY_CODE
                    , CMPY_NAME 
                FROM 
                    GUI_COMPANYS 
                WHERE 
                    BITAND(cmpy_type,:type_bitAnd)<>0 
                    and ( 
                    ( SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N'
                        and ( CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE')
                        or ( CMPY_CODE in (select child_cmpy_code from company_relation where parent_cmpy_code=SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') and parent_cmpy_role=1 and child_cmpy_role=$cmpy_type and status=1) ) ) 
                    )
                    or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
                    or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
                    or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
                ORDER BY CMPY_NAME ASC
            ";
        }
        $sql['sql_data'] = array( $bitAnd );
        
        $rows = $mydb->query($sql);        
        
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'CompanyLookup')));
    }    
    
    /**
    * Get company by its type. By default, type is supplier. 
    * A companay can have multiply roles, as long as it is a supplier, the company will be returned
    * @param cmpp_type: 0: SITE_MANAGER_CMPY;
                        1: SUPPLIER_COMPANY;
                        2: CARRIER_COMPANY;
                        3: CUSTOMER_COMPANY;
                        4: DRAWER_COMPANY;
                        5: ISSUER_COMPANY;
                        6: EMPLOYER_COMPANY;
                        7: HOST_COMPANY;
    */    
    public function lookupByTypeFrmView($cmpy_type = 1)
    {
        $bitAnd = pow(2, $cmpy_type);
        
        $mydb = DB::getInstance();
        //$sql="SELECT CMPY_CODE,CMPY_NAME FROM GUI_COMPANYS WHERE BITAND(cmpy_type,$bitAnd)<>0 ORDER BY CMPY_NAME ASC";
        $sql = array();
        //$sql['sql_text'] = "SELECT CMPY_CODE,CMPY_NAME FROM GUI_COMPANYS WHERE BITAND(cmpy_type,:type_bitAnd)<>0 ORDER BY CMPY_NAME ASC";
        if ( $cmpy_type != 2 && $cmpy_type != 6 ) 
        {
            $sql['sql_text'] = "SELECT CMPY_CODE,CMPY_NAME FROM GUI_COMPANYS WHERE BITAND(cmpy_type,:type_bitAnd)<>0 ORDER BY CMPY_NAME ASC";
        }
        else
        {
            $sql['sql_text'] = "
                SELECT distinct 
                    CMPY_CODE
                    , CMPY_NAME 
                FROM 
                    GUI_COMPANYS 
                WHERE 
                    BITAND(cmpy_type,:type_bitAnd)<>0 
                    and ( 
                    ( SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N'
                        and ( CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE')
                        or ( CMPY_CODE in (select child_cmpy_code from company_relation where parent_cmpy_code=SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') and parent_cmpy_role=1 and child_cmpy_role=$cmpy_type and status=1) ) ) 
                    )
                    or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
                    or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
                    or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
                ORDER BY CMPY_NAME ASC
            ";
        }
        $sql['sql_data'] = array( $bitAnd );
        
        $rows = $mydb->query($sql);        
        
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'CompanyLookup')));
    }    
    
    /**
     * Get company by its carrier code. By default, getting all records for site manager.
     * The normal carrier only return their own companaies, the right companies will be returned
     * @param cmpy_type:
     *        default the carrier is 2 means carrier company
     *        
     * Step 1, select carrier company from GUI_COMPANYS
     * Step 2, 
     *         a. get the additional records from SUPP_LNKD_CMPY(all are carrier) if only one carrier company 
     *            been found in GUI_COMPANYS
     *         b. get all carrier company records only from GUI_COMPANYS if it isnot one carrier company been found 
     *            in GUI_COMPANYS 
     * Step 3, return records      
     */
    public function lookupCarriers($cmpy_type=2)
    {
        $bitAnd = pow(2, $cmpy_type);
       
        $mydb = DB::getInstance();
        $sql="SELECT count(*) REC_COUNT FROM GUI_COMPANYS WHERE BITAND(cmpy_type,$bitAnd)<>0";
        
        $rows = $mydb->query($sql);
        
        /* if it have one record only in GUI_COMPANYS, then return record if it is carrier */
        if( (integer)$rows[0]->REC_COUNT == 1 ){
            $sql="SELECT c.CMPY_CODE,c.CMPY_NAME FROM COMPANYS c, GUI_COMPANYS g " .
                 "Where BITAND(c.cmpy_type,$bitAnd)<>0 " .
                 " and g.CMPY_CODE = c.CMPY_CODE " .
                 "union " .
                 "SELECT c.CMPY_CODE,c.CMPY_NAME FROM COMPANYS c,SUPP_LNKD_CMPY s " .
                 " Where c.CMPY_CODE = s.CMPY_code " .
                 " and BITAND(c.cmpy_type,$bitAnd)<>0 " .
                 "ORDER BY CMPY_NAME ASC";
        }
        else{///* return all carrier companies from GUI_COMPANYS
             $sql="SELECT CMPY_CODE,CMPY_NAME FROM GUI_COMPANYS WHERE BITAND(cmpy_type,$bitAnd)<>0 " .
             "ORDER BY CMPY_NAME ASC";
        }
        
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'CompanyLookup')));
    }
    
    public function getCompanyTypes() {
        logMe("Running", "COMPANIES");
        $mydb = DB::getInstance();
        $sql = "SELECT CMPY_CODE
            , CMPY_NAME
            , DECODE (CMPY_TYPE, 999,'F', (case when (bitand (cmpy_type, power (2,0)) = power (2,0)) then 'Y' else 'F' End)) as SITE_MANAGER 
            , DECODE (CMPY_TYPE, 999,'F', (case when (bitand (cmpy_type, power (2,1)) = power (2,1)) then 'Y' else 'F' End)) as SUPPLIER 
            , DECODE (CMPY_TYPE, 999,'F', (case when (bitand (cmpy_type, power (2,2)) = power (2,2)) then 'Y' else 'F' End)) as CARRIER 
            , DECODE (CMPY_TYPE, 999,'F', (case when (bitand (cmpy_type, power (2,3)) = power (2,3)) then 'Y' else 'F' End)) as CUSTOMER 
            , DECODE (CMPY_TYPE, 999,'F', (case when (bitand (cmpy_type, power (2,4)) = power (2,4)) then 'Y' else 'F' End)) as DRAWER 
            , DECODE (CMPY_TYPE, 999,'F', (case when (bitand (cmpy_type, power (2,5)) = power (2,5)) then 'Y' else 'F' End)) as ISSUER 
            , DECODE (CMPY_TYPE, 999,'F', (case when (bitand (cmpy_type, power (2,6)) = power (2,6)) then 'Y' else 'F' End)) as EMPLOYER 
            , DECODE (CMPY_TYPE, 999,'F', (case when (bitand (cmpy_type, power (2,7)) = power (2,7)) then 'Y' else 'F' End)) as HOST 
            FROM GUI_COMPANYS";
        $res = $mydb->query($sql);
        return (prepareForAMF($res, array(0 => 'Companys')));
    }
    
/*  
var $usage_sql = 
"   
SELECT
    DECODE(pcu.CMPY, NULL, 'ANY', pcu.CMPY)             as PRT_CMPY,  
    DECODE(cmp.CMPY_NAME, NULL, 'ALL', cmp.CMPY_NAME)   as PRT_CMPY_NAME,
    pcu.USAGE                                           as PRT_USAGE,
    b.MESSAGE                                           as PRT_USAGE_NAME,
    pcu.PRNTR                                           as PRT_PRINTER,
    p.SYS_PRNTR                                         as SYS_PRINTER, 
    p.PRNTR_AREA                                        as PRT_AREA,
    ar.AREA_NAME                                        as AREA_NAME
FROM
    PRNTR_CMPY_USAGE pcu,
    COMPANYS cmp,
    ENUMITEM a,
    MSG_LOOKUP b,
    PRINTER p, 
    AREA_RC ar
WHERE
    ( (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N' and pcu.CMPY = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
        or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
        or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
        or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL
    )
    and cmp.CMPY_CODE (+)  = pcu.CMPY 
    AND b.MSG_ID = a.ENUM_TMM
    AND ( b.LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND b.LANG_ID = 'ENG') ) 
    AND a.ENUM_NO = pcu.USAGE
    AND a.ENUMTYPENAME = 'PRN_USE'
    and p.PRNTR = pcu.PRNTR
    and p.PRNTR_AREA = ar.AREA_K(+) 
";  
*/  
    
    public function lookupDocumentsPrinterLookup($cmpy_code)
    {
        logMe("+++++++++Get Companies Document Printers+++++++++", COMPANIES);
        $mydb = DB::getInstance();
        /*
        $sql = "SELECT distinct P.CMPY, P.PRNTR, CMP.CMPY_BOL_VP_NAME, U.PRNF_USE as USAGE FROM PRNTR_CMPY_USAGE P, PRNT_USE U, COMPANYS CMP WHERE 
            P.USAGE = U.USAGE 
            AND (P.CMPY IN ('$cmpy_code', 'ANY') OR (p.CMPY IS NULL)) 
            AND U.PRNF_USE = 'DOCUMENT'
            AND PRNTR = CMP.CMPY_BOL_VP_NAME(+)";
        */
        $sql = array();
        $sql['sql_text'] = "SELECT distinct P.CMPY, P.PRNTR, CMP.CMPY_BOL_VP_NAME, U.PRNF_USE as USAGE FROM PRNTR_CMPY_USAGE P, PRNT_USE U, COMPANYS CMP WHERE 
            P.USAGE = U.USAGE 
            AND (P.CMPY IN (:cmpy_code, 'ANY') OR (p.CMPY IS NULL)) 
            AND U.PRNF_USE = 'DOCUMENT'
            AND PRNTR = CMP.CMPY_BOL_VP_NAME(+)";
        $sql['sql_data'] = array( $cmpy_code );
        
        /*
        $root_sql = $this->usage_sql;
        $sql = 
        "
            select
                PRT_CMPY                    as CMPY,  
                PRT_PRINTER                 as PRNTR,
                PRT_USAGE_NAME              as CMPY_BOL_VP_NAME
            from ($root_sql) 
            where (PRT_CMPY IN ('$cmpy_code', 'ANY') OR (PRT_CMPY IS NULL))
        ";
        */
        $res = $mydb->query($sql);
        logMe("Result is: " .$res, COMPANIESCLASS);
        return (prepareForAMF($res, array(0 => 'PrintersLookup')));
    }
    
    public function lookupLoadReportPrinter($cmpy_code)
    {
        $mydb = DB::getInstance();
        /*
        $sql = "SELECT distinct P.CMPY, P.PRNTR, CMP.CMPY_LD_REP_VP, U.PRNF_USE as USAGE FROM PRNTR_CMPY_USAGE P, PRNT_USE U, COMPANYS CMP WHERE 
            P.USAGE = U.USAGE 
            AND (P.CMPY IN ('$cmpy_code', 'ANY') OR (p.CMPY IS NULL)) 
            AND U.PRNF_USE = 'LD_REPORT'
            AND PRNTR = CMP.CMPY_LD_REP_VP(+)";
        */
        $sql = array();
        $sql['sql_text'] = "SELECT distinct P.CMPY, P.PRNTR, CMP.CMPY_LD_REP_VP, U.PRNF_USE as USAGE FROM PRNTR_CMPY_USAGE P, PRNT_USE U, COMPANYS CMP WHERE 
            P.USAGE = U.USAGE 
            AND (P.CMPY IN (:cmpy_code, 'ANY') OR (p.CMPY IS NULL)) 
            AND U.PRNF_USE = 'LD_REPORT'
            AND PRNTR = CMP.CMPY_LD_REP_VP(+)";
        $sql['sql_data'] = array( $cmpy_code );
        
        /*
        $root_sql = $this->usage_sql;
        $sql = 
        "
            select
                PRT_CMPY                    as CMPY,  
                PRT_PRINTER                 as PRNTR,
                PRT_USAGE_NAME              as CMPY_LD_REP_VP
            from ($root_sql) 
            where (PRT_CMPY IN ('$cmpy_code', 'ANY') OR (PRT_CMPY IS NULL))
        ";
        */
        $res = $mydb->query($sql);
        return (prepareForAMF($res, array(0 => 'PrintersLookup')));
    }
    
    public function lookupDriverInstructions($cmpy_code)
    {
        $mydb = DB::getInstance();
        /*
        $sql = "SELECT distinct P.CMPY, P.PRNTR, CMP.CMPY_DRV_INST_VP, U.PRNF_USE as USAGE FROM PRNTR_CMPY_USAGE P, PRNT_USE U, COMPANYS CMP WHERE 
            P.USAGE = U.USAGE 
            AND (P.CMPY IN ('$cmpy_code', 'ANY') OR (p.CMPY IS NULL)) 
            AND U.PRNF_USE = 'INSTRUCT'
            AND PRNTR = CMP.CMPY_DRV_INST_VP(+)";
        */
        $sql = array();
        $sql['sql_text'] = "SELECT distinct P.CMPY, P.PRNTR, CMP.CMPY_DRV_INST_VP, U.PRNF_USE as USAGE FROM PRNTR_CMPY_USAGE P, PRNT_USE U, COMPANYS CMP WHERE 
            P.USAGE = U.USAGE 
            AND (P.CMPY IN (:cmpy_code, 'ANY') OR (p.CMPY IS NULL)) 
            AND U.PRNF_USE = 'INSTRUCT'
            AND PRNTR = CMP.CMPY_DRV_INST_VP(+)";
        $sql['sql_data'] = array( $cmpy_code );
        
        /*
        $root_sql = $this->usage_sql;
        $sql = 
        "
            select
                PRT_CMPY                    as CMPY,  
                PRT_PRINTER                 as PRNTR,
                PRT_USAGE_NAME              as CMPY_DRV_INST_VP
            from ($root_sql) 
            where (PRT_CMPY IN ('$cmpy_code', 'ANY') OR (PRT_CMPY IS NULL))
        ";
        */
        $res = $mydb->query($sql);
        return (prepareForAMF($res, array(0 => 'PrintersLookup')));
    }


}
