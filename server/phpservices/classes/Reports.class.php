<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../vo/Reports.vo.php');

class ReportsClass {
    public function getReports(){
        $mydb = DB::getInstance();
        $sql="SELECT
        REPORT_CMPY.RPT_FILE as rpt_file,
        REPORT_FILES.RPT_NAME  as  rpt_name,
        REPORT_FILES.DESCRIPTION  as  rpt_desc,
        REPORT_FILES.FREQUENCY  as rpt_freq,
        REPORT_FILES.LANG_ID  as  rpt_lang,
        REPORT_FILES.JASPER_FILE  as  jasp_file,
        REPORT_FILES.REPORT_ADDTIVE  as rpt_additive,
        REPORT_FILES.IS_CLOSEOUT_REPORT as rpt_is_closeout,
        REPORT_CMPY.RPT_CMPY as  rpt_cmpy,
        REPORT_CMPY.RPT_ENABLED  as rpt_enable,
        REPORT_CMPY.RPT_ACTIVE  as rpt_active     
                
        FROM
                REPORT_FILES,
                REPORT_CMPY
        WHERE
               REPORT_FILES.RPT_FILE = REPORT_CMPY.RPT_FILE (+)
                and REPORT_FILES.LANG_ID ='ENG'
                order by REPORT_FILES.RPT_NAME asc
                ";
        $res = $mydb->query($sql);
        //XarrayEncodingConversion($res);
        return (prepareForAMF($res, array(0 => 'ReportsLookup')));       
    }
    
    public function isCompanySiteManager()
    {
        $mydb = DB::getInstance();
        $sql="SELECT SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') as FLAG from dual";
               
        $rows = $mydb->query($sql);
        if ( $rows[0]->FLAG == "Y" )
        {
            return 1;
        }
        else
        {
            return 0;
        }
        /*
        session_start();
        if( isset($_SESSION['SESSION']) )
        {
            $cmpy_code      = oracle_escape_string($_SESSION['COMPANY']);
        }
        else
        {
            $cmpy_code      = "NA";
        }
        
        $mydb = DB::getInstance();
        
        $sql = "select count(*) as NUM from COMPANYS where CMPY_CODE='$cmpy_code' and bitand(CMPY_TYPE,1)<>0 ";
               
        $rows = $mydb->query($sql);
        
        return ( (integer)($rows[0]->NUM) );
        */
    }
    
    public function lookupCompanysByReports($report)
    {
        $mydb = DB::getInstance();
/*        
       $sql="
            SELECT
                unique 
                REPORT_CMPY.RPT_CMPY as rpt_cmpy_code,
                COMPANYS.CMPY_NAME  as  rpt_cmpy_name
            FROM
                COMPANYS,
                REPORT_CMPY
            WHERE
               REPORT_CMPY.RPT_CMPY=COMPANYS.CMPY_CODE 
               and ('-1'='$report' or REPORT_CMPY.RPT_FILE='$report') 
            order by COMPANYS.CMPY_NAME asc
               ";
*/        
       $sql="
            SELECT
                unique 
                rc.RPT_CMPY as rpt_cmpy_code,
                cp.CMPY_NAME  as  rpt_cmpy_name
            FROM
                COMPANYS cp,
                REPORT_CMPY rc
            WHERE
                rc.RPT_CMPY=cp.CMPY_CODE
                AND cp.CMPY_CODE != 'ANY'
                and ('-1'='$report' or rc.RPT_FILE='$report') 
                and ( (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N' AND cp.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
                        OR SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE')       IS NULL
                        OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER')       = 'Y'
                        OR SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER')      IS NULL
                )
            order by cp.CMPY_NAME asc
               ";
               
        $res = $mydb->query($sql);
        if ( $this->isCompanySiteManager() > 0 )
        {
            array_unshift($res, (object)(array(RPT_CMPY_CODE=>'ANY', RPT_CMPY_NAME=>'ALL')));
        }
        //XarrayEncodingConversion($res);
        return (prepareForAMF($res, array(0 => 'ReportsCompanys'))); 
    }    
    public function getCompanysByRptsIsManager($isManger, $cmpyCd)
    {
        $mydb = DB::getInstance();
        
       if ($isManger=='Y')
       {
           $sql="
                SELECT
                    unique 
                    REPORT_CMPY.RPT_CMPY as rpt_cmpy_code,
                    COMPANYS.CMPY_NAME  as  rpt_cmpy_name
                FROM
                    COMPANYS,
                    REPORT_CMPY
                WHERE
                   REPORT_CMPY.RPT_CMPY=COMPANYS.CMPY_CODE 
                order by COMPANYS.CMPY_NAME asc
                   ";
        }
        else
        {
            $sql="
                SELECT
                    unique 
                    REPORT_CMPY.RPT_CMPY as rpt_cmpy_code,
                    COMPANYS.CMPY_NAME  as  rpt_cmpy_name
                FROM
                    COMPANYS,
                    REPORT_CMPY
                WHERE
                   REPORT_CMPY.RPT_CMPY=COMPANYS.CMPY_CODE 
                   and (REPORT_CMPY.RPT_CMPY = '$cmpyCd')
                order by COMPANYS.CMPY_NAME asc
                   ";
        }
        $res = $mydb->query($sql);
        //XarrayEncodingConversion($res);
        return (prepareForAMF($res, array(0 => 'ReportsCompanys'))); 
    }       
    
    /**
    * Get Reports List by Company will only give the reports for a company
    * input 
    * @param $cmpy_code: Company Code from the Companies GUI View;
                   
    */    
    public function lookupRptsByCompany($cmpy_code)
    {
        $mydb = DB::getInstance();
        
       $sql="SELECT
        REPORT_CMPY.RPT_FILE as rpt_file,
        REPORT_FILES.ONDEMAND_TITLE as  rpt_name,
        REPORT_FILES.DESCRIPTION  as  rpt_desc,
        REPORT_FILES.FREQUENCY  as rpt_freq,
        REPORT_FILES.LANG_ID  as  rpt_lang,
        REPORT_FILES.JASPER_FILE  as  jasp_file,
        REPORT_FILES.REPORT_ADDTIVE  as rpt_additive,
        REPORT_FILES.IS_CLOSEOUT_REPORT as rpt_is_closeout,
        REPORT_CMPY.RPT_CMPY as  rpt_cmpy,
        REPORT_CMPY.RPT_ENABLED  as rpt_enable,
        REPORT_CMPY.RPT_ACTIVE  as rpt_active     
                
        FROM
                REPORT_FILES,
                REPORT_CMPY
        WHERE
               REPORT_CMPY.RPT_CMPY='$cmpy_code'
                and REPORT_FILES.RPT_FILE = REPORT_CMPY.RPT_FILE (+)
                and (REPORT_FILES.ONDEMAND_FLAG = 1 OR REPORT_FILES.ONDEMAND_FLAG = 3)
                and (( REPORT_FILES.LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND REPORT_FILES.LANG_ID = 'ENG') ))
                order by REPORT_FILES.ONDEMAND_TITLE asc
                ";
        $res = $mydb->query($sql);
        //XarrayEncodingConversion($res);
        return (prepareForAMF($res, array(0 => 'ReportsLookup'))); 
    }    
  /**
    * Get Reports Filtes From table where Filters arelisted
    * by a link to the Reprots Jasper File by Jasper File
    * 
    * input 
    * @param $rpt_jasp_fileName: This the Jasper File Name a Foreign Key;
                   
    */    
    public function getRptsFiltersByRpt($rpt_jasp_fileName)
    {
        $mydb = DB::getInstance();
        
       $sql="SELECT
        JASPER_FILE as jasp_file,
        ARGUMENT_SEQ as filter_seq,
        ARGUMENT_NAME as filter_name,
        ARGUMENT_TYPE as filter_type
            FROM
                REPORT_FILTER
        WHERE
               REPORT_FILTER.JASPER_FILE='$rpt_jasp_fileName'
                order by ARGUMENT_SEQ asc
                ";
        $res = $mydb->query($sql);
        //XarrayEncodingConversion($res);
        return (prepareForAMF($res, array(0 => 'ReportsFilters'))); 
    }    
 
    
    public function lookupCloseouts()
    {
        $mydb = DB::getInstance();
        $sql="
            select 
                CLOSEOUT_NR
                , to_CHAR(CLOSEOUT_DATE, 'rrrr-MM-DD hh24:mi:ss') as CLOSEOUT_DATE 
                , to_CHAR(PREV_CLOSEOUT_DATE, 'rrrr-MM-DD hh24:mi:ss') as PREV_CLOSEOUT_DATE 
                , STATUS
                , (CLOSEOUT_NR||':  '||to_CHAR(PREV_CLOSEOUT_DATE, 'rrrr-MM-DD hh24:mi:ss')||' ~ '||to_CHAR(CLOSEOUT_DATE, 'rrrr-MM-DD hh24:mi:ss')) as CLOSEOUT_FOLIO 
            from CLOSEOUTS 
            order by CLOSEOUT_NR
            ";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'CloseoutsFolios')));
    }

    
    public function lookupCloseoutsByDates($start, $end)
    {
        $format = "rrrr-MM-DD hh24:mi:ss";

        $mydb = DB::getInstance();
        $sql="
            select 
                CLOSEOUT_NR
                , to_CHAR(CLOSEOUT_DATE, 'rrrr-MM-DD hh24:mi:ss') as CLOSEOUT_DATE 
                , to_CHAR(PREV_CLOSEOUT_DATE, 'rrrr-MM-DD hh24:mi:ss') as PREV_CLOSEOUT_DATE 
                , STATUS
                , (CLOSEOUT_NR||':  '||to_CHAR(PREV_CLOSEOUT_DATE, 'rrrr-MM-DD hh24:mi:ss')||' ~ '||to_CHAR(CLOSEOUT_DATE, 'rrrr-MM-DD hh24:mi:ss')) as CLOSEOUT_FOLIO 
            from CLOSEOUTS 
            where 
                ( ('-1'='$start' or PREV_CLOSEOUT_DATE>=to_date('$start', '$format')) 
                and ('-1'='$end' or CLOSEOUT_DATE<=to_date('$end', '$format'))) 
            order by CLOSEOUT_NR
            ";
            
        //error_log( "\n".$sql, 3, "temp.log");
        
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'CloseoutsFolios')));
    }

}

?>
