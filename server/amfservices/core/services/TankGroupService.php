<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('TANKGROUP')) define('TANKGROUP','TankGroupService.class');

class TankGroupService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	
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
            $this->cgi = CGIDIR . "stck_mgmt/tank_grp.cgi";
            $this->cgi_items = CGIDIR . "stck_mgmt/tank_grp.cgi";
            $this->cgi_activate = CGIDIR . "stck_mgmt/tank_grp.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/stck_mgmt/tank_grp.cgi";
            $this->cgi_items ="cgi-bin/en/stck_mgmt/tank_grp.cgi";
            $this->cgi_activate = "cgi-bin/en/stck_mgmt/tank_grp.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM GUI_TANK_GROUP";
			
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
		else $sort="ORDER BY TGR_NAME";
		
		//$query = "SELECT * FROM GUI_TANK_GROUP $filter $sort";
		$query = "SELECT * FROM GUI_TANK_GROUP " . $filter['sql_text'] . " $sort";

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
         
    public function initTankGroupItems(  )
	{
		$sql="
			select
				TANKS.TANK_CODE				as TANK_CODE
				, BASE_PRODS.BASE_CODE		as TANK_BASECODE
				, BASE_PRODS.BASE_NAME		as TANK_BASENAME
				, NULL						as TANK_ACTIVE
				, NULL						as TANK_GROUP
				, TANKS.TANK_TERMINAL		as TANK_SITECODE
				, TERMINAL.TERM_NAME		as TANK_SITENAME
			from
				TANKS
				, BASE_PRODS
				, TERMINAL
			where
				1 = 1
				and BASE_PRODS.BASE_CODE = TANKS.TANK_BASE
				and TANKS.TANK_TERMINAL = TERMINAL.TERM_CODE
				and (TANKS.TANK_CODE, TANKS.TANK_TERMINAL) not in (select TGR_TKLK_TANKCODE, TGRLINK.TGR_TKLK_TANKDEPO from TGRLINK)
			order by TANKS.TANK_CODE
		";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
         
    public function getTankGroupItems( $tkgrp )
	{
		/*
		$sql="
			select
				TANK_CODE
				, TANK_BASECODE
				, TANK_BASENAME
				, TANK_ACTIVE
				, TANK_GROUP
				, TANK_SITECODE
				, TANK_SITENAME
			from
				GUI_TANK_GROUP_ITEMS
			where 
				1=1
				and TANK_GROUP='$tkgrp'
			order by
				TANK_GROUP
		";
		*/	
		
		$sql = array();
        $sql['sql_text'] = "
			select
				TANK_CODE
				, TANK_BASECODE
				, TANK_BASENAME
				, TANK_ACTIVE
				, TANK_GROUP
				, TANK_SITECODE
				, TANK_SITENAME
			from
				GUI_TANK_GROUP_ITEMS
			where 
				1=1
				and TANK_GROUP=:tkgrp
			order by
				TANK_GROUP
		";
		$sql['sql_data'] = array( $tkgrp );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}


    public function isTankGroupKeyUsed( $tkgrp )
	{
		//$sql = "select * from TGROUP where TGR_NAME='$tkgrp' ";
		
		$sql = array();
        $sql['sql_text'] = "select * from TGROUP where TGR_NAME=:tkgrp ";
		$sql['sql_data'] = array( $tkgrp );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isTankGroupItemKeyUsed( $tank_code, $tank_terminal )
	{
		//$sql = "select * from TGRLINK where TGR_TKLK_TANKCODE='$tank_code' and TGR_TKLK_TANKDEPO='$tank_terminal'  ";
		
		$sql = array();
        $sql['sql_text'] = "select * from TGRLINK where TGR_TKLK_TANKCODE=:tank_code and TGR_TKLK_TANKDEPO=:tank_terminal ";
		$sql['sql_data'] = array( $tank_code, $tank_terminal );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
    }


	

/*
http://10.1.10.100/cgi-bin/en/stck_mgmt/tank_grp.cgi?preqstr=&tkgrp=tst999&op=17
preqstr	
tkgrp	tst999
op	17

var statusBar="";
var priv=8;
var op=27;
var pg=-1;
var trmnl="-1";
var tkgrp="tst999";
var tk="-1";
var grp_basePrdCd ="-1";
var oerrOraCode=0;
var oerrOraMsg ="";
var debugMsg ="";


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
        Call CGI to CREATE Tank Group
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Tank Group++++++",TANKGROUP);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'tkgrp'=>urlencode($data->tgr_name),
			'op'=>urlencode("17")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccess = "var op=27;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add Tank Group failed!!!",TANKGROUP);
                return "ERROR";
        }
        logMe("CGI Add Tank Group succeeded!!!",TANKGROUP);

		if ( is_array($data->tank_items) === FALSE )
		{
			$data->tank_items = (array)($data->tank_items);
		}
		if( $data->has_items=="1" && sizeof($data->tank_items) > 0 )
		{
			for($i=0; $i<sizeof($data->tank_items); $i++)
			{      
				logMe("Info: ++++++Adding new Tank Group Link++++++",TANKGROUP);
				logMe("Info111: ++++++Adding new Tank Group Link++++++",TANKGROUP."---".sizeof($data->tank_items));
				logMe("Info112: ++++++Adding new Tank Group Link++++++",TANKGROUP."---".gettype($data->tank_items));
				logMe("Info113: ++++++Adding new Tank Group Link++++++",TANKGROUP."---".gettype($data->tank_items[$i]));
				
				$link_item = $data->tank_items[$i];
				$link_item->session_id = $data->session_id;
				$linkResult = "OK";
				$linkResult = $this->createLink( $link_item );
				if ( $linkResult != "OK" )
				{
					return $linkResult;
				}
				
			}
		}
		
        return "OK";
    }  

	
/*
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
		
		// No UPDATE available at group level
		
        /**************************************************************************************************
        Call CGI to modify Tank Group 
        ***************************************************************************************************/
        logMe("Info: ++++++No Need of Updating Tank Group++++++",TANKGROUP);

		// get the original list of tank links
		if( $data->has_items=="1" && sizeof($data->tank_items) > 0 )
		{
			for($i=0; $i<sizeof($data->tank_items); $i++)
			{   
				//$errmsg = $i."\t".$data->tank_items[$i]->aitem_prodcode."\t".$data->tank_items[$i]->aitem_qtylimit."\taction: ".$data->actions[$i]->option."\t".sizeof($data->actions)."*******";
				//error_log( "\n*****ERRMSG_ALLOCS\n".$errmsg, 3, "temp.log");
			
				$link_item = $data->tank_items[$i];
				$link_item->session_id = $data->session_id;
				if ( $data->actions[$i]->option == "1" )
				{ // insert new tank link
					$linkResult = $this->createLink( $link_item );
					if ( $linkResult != "OK" )
					{
						return $linkResult;
					}
				}
				else
				if ( $data->actions[$i]->option == "2" )
				{ // update existing tank link
					// No update action and do nothing
					continue;
			
					//$linkResult = $this->updateLink( $link_item );
					//if ( $linkResult != "OK" )
					//{
					//	return $linkResult;
					//}
				}
				else
				if ( $data->actions[$i]->option == "3" )
				{ // delete existing tank link
					$linkResult = $this->deleteLink( $link_item );
					if ( $linkResult != "OK" )
					{
						return $linkResult;
					}
				}
				else
				{ // do nothing
					continue; 
				}
			
			}
		}
		
        return "OK";
    }  

	
/*
http://10.1.10.100/cgi-bin/en/stck_mgmt/tank_grp.cgi?tkgrp=tkgrp986&pg=-1&preqstr=&op=18
tkgrp	tkgrp986
pg	-1
preqstr	
op	18

var statusBar="";
var priv=8;
var op=28;
var pg=-1;
var trmnl="-1";
var tkgrp="tkgrp986";
var tk="-1";
var grp_basePrdCd ="-1";
var oerrOraCode=0;
var oerrOraMsg ="";
var debugMsg ="";

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
		
        logMe("Info: ++++++Deleting TankGroup++++++",TANKGROUP);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'tkgrp'=>urlencode($data->tgr_name),
			'op'=>urlencode("18")
        );
		
       $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccess = "var op=28;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
            logMe("Delete TankGroup failed!!!",TANKGROUP);
            return "ERROR";
        }
        logMe("CGI Delete TankGroup succeeded!!!",TANKGROUP);

        return "OK";
    }   


/*
http://10.1.10.100/cgi-bin/en/stck_mgmt/tank_grp.cgi?preqstr=&tkgrp=tkgrp986&tk=F902&op=13
preqstr	
tkgrp	tkgrp986
tk	F902
op	13

var statusBar="";
var priv=8;
var op=23;
var pg=-1;
var trmnl="-1";
var tkgrp="tkgrp986";
var tk="F902";
var grp_basePrdCd ="-1";
var oerrOraCode=0;
var oerrOraMsg ="";
var debugMsg ="";

*/
    public function createLink($data)
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
        Call CGI to CREATE Tank Group Link
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new Tank Group Link++++++",TANKGROUP);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'tkgrp'=>urlencode($data->tank_group),
            'tk'=>urlencode($data->tank_code),
			'op'=>urlencode("13")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccess = "var op=23;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add Tank Group Link failed!!!",TANKGROUP);
                return "ERROR";
        }
        logMe("CGI Add Tank Group Link succeeded!!!",TANKGROUP);
		
        return "OK";
    }  


/*
http://10.1.10.100/cgi-bin/en/stck_mgmt/tank_grp.cgi?tk=D801&tkgrp=tkgrp986&tkActive=D801&tkOldActive=D801&op=14
tk	D801                       tk	D803                               tk	D804
tkgrp	tkgrp986               tkgrp	tkgrp986                       tkgrp	tkgrp986
tkActive	D801               tkActive	D803                           tkActive	D804
tkOldActive	D801               tkOldActive	D801                       tkOldActive	D803
op	14                         op	14                                 op	14

var statusBar="";
var priv=8;
var op=24;
var pg=-1;
var trmnl="-1";
var tkgrp="tkgrp986";
var tk="D801";
var grp_basePrdCd ="-1";
var oerrOraCode=0;
var oerrOraMsg ="";
var debugMsg ="";

*/	
    public function activateLink($data)
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
        Call CGI to activate Tank Group Link 
        ***************************************************************************************************/
        logMe("Info: ++++++Activating Tank Group Link++++++",TANKGROUP);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'tk'=>urlencode($data->tank_code),
            'tkgrp'=>urlencode($data->tank_group),
            'tkActive'=>urlencode($data->tank_active_new),
            'tkOldActive'=>urlencode($data->tank_active_old),
			'op'=>urlencode("14")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccess = "var op=24;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Activate Tank Group Link!!!",TANKGROUP);
                return "ERROR";
        }
        logMe("CGI Activate Tank Group Link!!!",TANKGROUP);
		
        return "OK";
    }  

	
/*
http://10.1.10.100/cgi-bin/en/stck_mgmt/tank_grp.cgi?tk=F905&tkgrp=tkgrp986&pg=-1&preqstr=&op=15
tk	F905
tkgrp	tkgrp986
pg	-1
preqstr	
op	15

var statusBar="";
var priv=8;
var op=25;
var pg=-1;
var trmnl="-1";
var tkgrp="tkgrp986";
var tk="F905";
var grp_basePrdCd ="-1";
var oerrOraCode=0;
var oerrOraMsg ="";
var debugMsg ="";
*/	
    public function deleteLink($data)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        logMe("Info: ++++++Deleting Tank Group Link++++++",TANKGROUP);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'tk'=>urlencode($data->tank_code),
            'tkgrp'=>urlencode($data->tank_group),
			'op'=>urlencode("15")
        );

		$thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
		//return $response;
        $patternSuccess = "var op=25;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
            logMe("Delete Tank Group Link failed!!!",TANKGROUP);
            return "ERROR";
        }
        logMe("CGI Delete Tank Group Link succeeded!!!",TANKGROUP);

        return "OK";
    }   
	
}
?>