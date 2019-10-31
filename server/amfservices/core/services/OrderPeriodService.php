<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('ORDERPERIOD')) define('ORDERPERIOD','OrderPeriodService.class');

class OrderPeriodService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
select 
	oprd.OPRD_ORDER_ID					as OPRD_ORDER_ID
	, gord.ORDER_SUPP_CODE				as OPRD_SUPP_CODE
	, gord.ORDER_SUPP_NAME				as OPRD_SUPP_NAME
	, gord.ORDER_CUST_ACNT				as OPRD_CUST_ACNT
	, gord.ORDER_CUST_CODE				as OPRD_CUST_CODE
	, gord.ORDER_CUST_NAME				as OPRD_CUST_NAME
	, gord.ORDER_CUST_NO				as OPRD_CUST_NO
	, gord.ORDER_STAT_ID				as OPRD_STAT_ID
	, gord.ORDER_STAT_NAME				as OPRD_STAT_NAME
	, gord.ORDER_APPROVED				as OPRD_APPROVED
	, gord.ORDER_ORD_TIME				as OPRD_ORD_TIME
	, gord.ORDER_EXP_TIME				as OPRD_EXP_TIME
	, oitm.OITEM_PROD_CODE				as OPRD_ITEM_PRODCODE
	, oitm.OITEM_PROD_CMPY				as OPRD_ITEM_PRODCMPY
	, oitm.OITEM_PROD_QTY				as OPRD_ITEM_PRODQTY
	, oitm.OITEM_PROD_UNIT				as OPRD_ITEM_PRODUNIT
	, oprd.OPRD_PROD_CODE				as OPRD_PROD_CODE
	, oprd.OPRD_PROD_CMPY				as OPRD_PROD_CMPY
	, oprd.OPRD_PROD_NAME				as OPRD_PROD_NAME
	, oprd.OPRD_DRWR_NAME				as OPRD_DRWR_NAME
	, oprd.OPRD_PERIOD_NO				as OPRD_PERIOD_NO
	, oprd.OPRD_PERIOD_START			as OPRD_PERIOD_START
	, oprd.OPRD_PERIOD_END				as OPRD_PERIOD_END
	, oprd.OPRD_PROD_UNIT				as OPRD_PROD_UNIT
	, oprd.OPRD_UNIT_NAME				as OPRD_UNIT_NAME
	, oprd.OPRD_PROD_QTY				as OPRD_PROD_QTY
	, oprd.OPRD_PROD_USED				as OPRD_PROD_USED
	, oprd.OPRD_PRICE_FIXED				as OPRD_PRICE_FIXED
	, oprd.OPRD_PROD_PRICE				as OPRD_PROD_PRICE
from 
	GUI_ORDER_PERIODS oprd
	, GUI_ORDERS gord
	, GUI_ORDER_ITEMS oitm
where 
	oprd.OPRD_ORDER_ID = gord.ORDER_SYS_NO 
	and oprd.OPRD_ORDER_ID = oitm.OITEM_ORDER_ID
	and oprd.OPRD_PROD_CODE = oitm.OITEM_PROD_CODE
	and oprd.OPRD_PROD_CMPY = oitm.OITEM_PROD_CMPY
	";
	
	public function __construct()
	{
		session_start();
		
        if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
			if( isset($_SERVER['HTTP_HOST']) )
			{
				$this->host = $_SERVER['HTTP_HOST'];
			}
			else
			{
				$this->host = "localhost";
			}
        }
        
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "cust_ord/order_period.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/cust_ord/order_period.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) OOPERIODS ";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
	
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
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types, 1 );
		} 
		
		$sort = $g->createOrderbyCondition ($sorts, $orders);
        if($sort!='')$sort="ORDER BY $sort";
		else $sort="ORDER BY OPRD_ORDER_ID DESC, OPRD_PROD_CODE, OPRD_PERIOD_NO";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) OOPERIODS ";
		//$query = $query . " $filter $sort ";
		$query = $query . " " . $filter['sql_text'] . " $sort ";

		$low   = ($pageNum-1)*$pageSize+1;
		$high  = $pageNum*$pageSize; 
		//$queryPaged = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		
		$queryPaged = array();
        $queryPaged['sql_text'] = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		$queryPaged['sql_data'] = $filter['sql_data'];
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($queryPaged);
		
		$queryCount = array();
        $queryCount['sql_text'] = $query;
		$queryCount['sql_data'] = $filter['sql_data'];
		
		//$data->count = $mydb->count( $query );
		$data->count = $mydb->count( $queryCount );

		return($data);
    } 

    public function getNextOrderItemPeriodNumber($order, $prod_cmpy, $prod_code)
	{
        $mydb = DB::getInstance();
		/*
        $sql="
				select MAX(p.OPRD_CH_NO)+1 AS NEXT_ID 
				from OPROD_CHILD p, CUST_ORDER o
				where 
					o.ORDER_CUST_ORDNO=$order
					and p.OPB_DAD_OPRODKEY=o.ORDER_NO 
					and p.OPB_DAD_OSPROD_PRODCMPY='$prod_cmpy' 
					and p.OPB_DAD_OSPROD_PRODCODE='$prod_code'
			";
		*/
		$sql = array();
        $sql['sql_text'] = "
				select MAX(p.OPRD_CH_NO)+1 AS NEXT_ID 
				from OPROD_CHILD p, CUST_ORDER o
				where 
					o.ORDER_CUST_ORDNO=:order_num
					and p.OPB_DAD_OPRODKEY=o.ORDER_NO 
					and p.OPB_DAD_OSPROD_PRODCMPY=:order_prod_cmpy 
					and p.OPB_DAD_OSPROD_PRODCODE=:order_prod_code
			";
		$sql['sql_data'] = array( $order, $prod_cmpy, $prod_code );
		
        $rows = $mydb->query($sql, "N");

		if ( is_null($rows[0]->NEXT_ID) == TRUE || $rows[0]->NEXT_ID=="" )
		{
			$next_id = 1;
		}
		else
		{
			$next_id = (integer)$rows[0]->NEXT_ID;
		}
		
		return($next_id);
    }

/*    
http://bz.mobhk.om5000/cgi-bin/en/cust_ord/order_period.cgi?termCd=CGPER&op=6317&custAcc=AFGBP&suppCd=AUFG&cmpyCd=AFGBP&pg=1&pg_3=1&orderNo=29106&orderChildNo=-1&prodCmpy=AUFG&prodCd=ADO&frm_item_num=1&frm_start_day=2014-07-11&frm_end_day=2014-07-11&frm_limit=1000&frm_unit=5
*/	
    public function create($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        /**************************************************************************************************
        Call CGI to CREATE Open Order Period
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Open Order Period++++++",ORDERPERIOD);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'termCd'=>'',
            'custAcc'=>urlencode($data->oprd_cust_acnt),
            'suppCd'=>urlencode($data->oprd_supp_code),
            'cmpyCd'=>urlencode($data->oprd_cust_code),
            'orderNo'=>urlencode($data->oprd_order_id),
            'orderChildNo'=>'-1',
            'prodCmpy'=>urlencode($data->oprd_prod_cmpy),
            'prodCd'=>urlencode($data->oprd_prod_code),
            'frm_item_num'=>urlencode($data->oprd_period_no),
            'frm_start_day'=>urlencode($data->oprd_period_start),
            'frm_end_day'=>urlencode($data->oprd_period_end),
            'frm_limit'=>urlencode($data->oprd_prod_qty),
            'frm_unit'=>urlencode($data->oprd_prod_unit),
             'op'=>urlencode("6317")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=6327";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add Open Order Period failed!!!",ORDERPERIOD);
                return "ERROR";
        }
        logMe("CGI Add Open Order Period succeeded!!!",ORDERPERIOD);
		
        return "OK";
    }  


/*
http://bz.mobhk.om5000/cgi-bin/en/cust_ord/order_period.cgi?termCd=CGPER&op=6316&custAcc=AFGBP&suppCd=AUFG&cmpyCd=AFGBP&pg=1&pg_3=1&orderNo=29106&orderChildNo=1&prodCmpy=AUFG&prodCd=ADO&frm_item_num=1&frm_start_day=2014-07-11&frm_end_day=2014-07-11&frm_limit=2000&frm_unit=5
*/	
    public function update($data)
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
		$keys = array ( "OPB_DAD_OPRODKEY"=>($data->oprd_order_id), "OPB_DAD_OSPROD_PRODCODE"=>($data->oprd_prod_code), "OPB_DAD_OSPROD_PRODCMPY"=>($data->oprd_prod_cmpy), "OPRD_CH_NO"=>($data->oprd_period_no) );
		$excludes = array ("OPRD_CH_USED"=>0, "OPRD_CH_FIXEDPRI"=>0, "OPRD_CH_PRICE"=>0);
		$upd_journal = new UpdateJournalClass( "Open Order Periods", "OPROD_CHILD", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to modify Open Order Period 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating Open Order Period++++++",ORDERPERIOD);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'termCd'=>'',
            'custAcc'=>urlencode($data->oprd_cust_acnt),
            'suppCd'=>urlencode($data->oprd_supp_code),
            'cmpyCd'=>urlencode($data->oprd_cust_code),
            'orderNo'=>urlencode($data->oprd_order_id),
            'orderChildNo'=>urlencode($data->oprd_period_no),
            'prodCmpy'=>urlencode($data->oprd_prod_cmpy),
            'prodCd'=>urlencode($data->oprd_prod_code),
            'frm_item_num'=>urlencode($data->oprd_period_no),
            'frm_start_day'=>urlencode($data->oprd_period_start),
            'frm_end_day'=>urlencode($data->oprd_period_end),
            'frm_limit'=>urlencode($data->oprd_prod_qty),
            'frm_unit'=>urlencode($data->oprd_prod_unit),
             'op'=>urlencode("6316")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=6326";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Update Open Order Period!!!",ORDERPERIOD);
                return "ERROR";
        }
        logMe("CGI Update Open Order Period!!!",ORDERPERIOD);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
 		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        return "OK";
    }  

	
/*
http://bz.mobhk.om5000/cgi-bin/en/cust_ord/order_period.cgi?orderChildNo=1&orderNo=29106&prodCmpy=AUFG&prodCd=ADO&custAcc=AFGBP&suppCd=AUFG&cmpyCd=AFGBP&termCd=CGPER&pg=1&pg_3=1&op=6318
*/
    public function delete($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        logMe("Info: ++++++Deleting Open Order Period++++++",ORDERPERIOD);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'orderChildNo'=>urlencode($data->oprd_period_no),
            'orderNo'=>urlencode($data->oprd_order_id),
            'prodCmpy'=>urlencode($data->oprd_prod_cmpy),
            'prodCd'=>urlencode($data->oprd_prod_code),
            'custAcc'=>urlencode($data->oprd_cust_acnt),
            'suppCd'=>urlencode($data->oprd_supp_code),
            'cmpyCd'=>urlencode($data->oprd_cust_code),
            'termCd'=>'',
             'op'=>urlencode("6318")
        );
		$thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var opStatus=6328";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
			logMe("CGI Delete Open Order Period failed!!!",ORDERPERIOD);
			return "ERROR";
        }
        logMe("CGI Delete Open Order Period succeeded!!!",ORDERPERIOD);

        return "OK";
    }   
	
}
?>