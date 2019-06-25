<?php
require_once( 'bootstrap.php' );
//require_once( 'Thunk.class.php' );
//require_once( 'Journal.class.php' );

if(!defined('LOADSCHEDULE')) define('LOADSCHEDULE','[AMF]-LoadSchedleService.class');

//$ls = new LoadScheduleService();
//print_r($ls->getLoad(4373230,'1001'));
/*
$c = new testobj;
$c->supplier_code='0006';
$c->shls_terminal='CGPER';
$c->status='D';
$d= new testobj;
$d->supplier_code='STRING';
$d->shls_terminal='STRING';
$d->status='D';

print_r($ls->getPaged($c, $d, null, null, 1, 50));

class testobj
{
    var $supplier_code;
    var $shls_terminal;
    var $status;
}
*/
class LoadScheduleService
{
    var $username;
    var $password;
    var $server;
    var $connect;
    var $mylang='ENG';

    public function __construct()
    {
        //logMe("LoadScheduleService->construct() done", LOADSCHEDULE);
    }

    public function getData()
    {
        $query = "SELECT * FROM GUI_SCHEDULES";
        $mydb = DB::getInstance();
        $res = $mydb->retrieve($query);
        logMe("getData() done", LOADSCHEDULE);
        return $res;
    }

    /**
    * SQL INJECTION MITIGATED
    *
    *  29/07/2015    Added variable binding execution
    *
    */
    public function getLoad($tn, $sc){
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM GUI_SCHEDULES WHERE shls_trip_no = :tn AND supplier_code = :sc";
		$sql['sql_data'] = array( $tn, $sc );
			
        $mydb = DB::getInstance();
		$data = $mydb->query($sql);
		
		return array_pop($data);
    }

    /**
    * SQL INJECTION MITIGATED
    *
    *  11/08/2015    Added variable binding execution
    *
    */
    public function getPaged($values, $dtypes, $sorts, $orders, $pageNum = 1, $pageSize = 50)
    {
        $g = new GlobalClass();

        if ($values == "" || is_string($values) )
        {
            //$filter = $values;
            $filterObj = array();
            $filterObj['sql_text'] = $values;
            $filterObj['sql_data'] = array();
            $filter = $filterObj;
            logMe("getPaged() -> value is string", LOADSCHEDULE);
        }
        else
        {
            $fields = get_object_vars( $values );
            $types = get_object_vars( $dtypes );
            $filter = $g->createWhereCondition( $fields, $types, 1 );
            logMe("getPaged() -> value is OBJECT", LOADSCHEDULE);
        }
        
        $sort = $g->createOrderbyCondition ($sorts, $orders);
        if($sort!='')$sort="ORDER BY $sort";
        else $sort="ORDER BY LAST_CHG_TIME DESC";
        
        $query = "SELECT * FROM GUI_SCHEDULES " . $filter['sql_text'] . " $sort";
        logMe("getPaged() -> query is:".$query, LOADSCHEDULE);
        $low   = ($pageNum-1)*$pageSize+1;
        $high  = $pageNum*$pageSize;

        $queryPaged = array();
        $queryPaged['sql_text'] = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
        $queryPaged['sql_data'] = $filter['sql_data'];

        /*
        $sqlCount = "SELECT COUNT(*) TOTAL_COUNT FROM ($query)";
         $stid = oci_parse($this->connect, $sqlCount);
        oci_execute($stid);
        
        $row = oci_fetch_object($stid);
        $count = $row->TOTAL_COUNT;
        $stid = oci_parse($this->connect, $queryPaged);
        
        oci_execute($stid);
        while (($row = oci_fetch_object($stid)))
        {
            $res[] = $this->upperArray($row);
        }
         $data->count = $count;
        $data->sqls = $queryPaged;
        $data->data = (json_encode($res));
        */

        $mydb = DB::getInstance();
        $data = $mydb->retrieve($queryPaged);

        $queryCount = array();
        $queryCount['sql_text'] = $query;
        $queryCount['sql_data'] = $filter['sql_data'];
        //$data->count = $mydb->count($query);
        $data->count = $mydb->count($queryCount);

        logMe("[SQL INJECTION MITIGATION]-getPaged() done", LOADSCHEDULE);

        return $data;
    }

    public function getLookups()
    {
        $mydb = DB::getInstance();

        $querysupp = "select CMPY_CODE,CMPY_NAME from GUI_COMPANYS WHERE SUPPLIER='Y' order by CMPY_NAME";
        $row = $mydb->retrieve($querysupp);
        $sup = $this->upperArray($row);
        
        $querydrwr = "select CMPY_CODE,CMPY_NAME from GUI_COMPANYS WHERE DRAWER='Y' order by CMPY_NAME";
        $row = $mydb->retrieve($querydrwr);
        $drw = $this->upperArray($row);
        
        $querycarr = "select CMPY_CODE,CMPY_NAME from GUI_COMPANYS WHERE CARRIER='Y' order by CMPY_NAME";
        $row = $mydb->retrieve($querycarr);
        $car = $this->upperArray($row);
        
        $querytnkr = "SELECT tnkr_code,tnkr_carrier FROM TANKERS WHERE 1=1 ORDER BY tnkr_code ASC";
        $row = $mydb->retrieve($querytnkr);
        $tnk = $this->upperArray($row);
        
        $querystat = "SELECT * FROM SCHEDULE_STATUS_SHORT_LOOKUP";
        $row = $mydb->retrieve($querystat);
        $sta = $this->upperArray($row);
        
        $queryterm = "SELECT TERM_CODE, TERM_NAME, TERM_CODE||' - '||TERM_NAME as TERM_DESC FROM TERMINAL order by term_code";
        $row = $mydb->retrieve($queryterm);
        $trm = $this->upperArray($row);
        
        $queryprds = "select * from PRODUCTS";
        $row = $mydb->retrieve($queryprds);
        $prd = $this->upperArray($row);

        $data->querysupp = $querysupp;
        $data->querydrwr = $querydrwr;
        $data->querycarr = $querycarr;
        $data->querytnkr = $querytnkr;
        $data->querystat = $querystat;
        $data->queryterm = $queryterm;
        $data->queryprds = $queryprds;
        $data->supp = $sup;
        $data->drwr = $drw;
        $data->carr = $car;
        $data->tnkr = $tnk;
        $data->stat = $sta;
        $data->term = $trm;
        $data->prod = $prd;
        return $data;
    }

    public function upperArray($data)
    {
        $arr = array();
        foreach ( $data as $key=>$value )
        {
            $arr[ strtolower($key) ] = $value;
        }
        return $arr;
    }
    
    public function getNextSeal()
    {
        $sql = "SELECT SITE_NEXT_SEAL FROM SITE";
		
        $mydb = DB::getInstance();
        $rows = $mydb->query($sql, "N");

		if ( is_null($rows[0]->SITE_NEXT_SEAL) == TRUE || $rows[0]->SITE_NEXT_SEAL=="" )
		{
			$nextseal = '0000001';
		}
		else
		{
			$nextseal = $rows[0]->SITE_NEXT_SEAL;
		}
		
		return($nextseal);
    }
    
    public function getTripSeal($trip, $supp)
    {
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "SELECT s.SHLS_SEAL_NO FROM SCHEDULE s WHERE s.SHLS_TRIP_NO=:trip_no and s.SHLS_SUPP=:supp_code ";
		$sql['sql_data'] = array( $trip, $supp );
		
        $rows = $mydb->query($sql, "N");

		if ( is_null($rows[0]->SHLS_SEAL_NO) == TRUE || $rows[0]->SHLS_SEAL_NO=="" )
		{
			$tripseal = '';
		}
		else
		{
			$tripseal = $rows[0]->SHLS_SEAL_NO;
		}
		
		return($tripseal);
    }

}
?>
