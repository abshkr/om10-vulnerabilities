<?php
require_once( dirname(__FILE__) . '/../../../amfservices/core/services/bootstrap.php' );
//require_once( 'Thunk.class.php' );
//require_once( 'Journal.class.php' );

if(!defined('TANKVIEWSERVICE')) define('TANKVIEWSERVICE','TankviewService.class');

class TankviewServiceMockup
{
	var $useCGI=0;
    var $mylang='ENG';
	var $myview="
	";
	var $DATA_ONLY=1;
	var $mainCfgFile="data_config.json";
	
	var $bayviewServers=array();
	
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
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) DLVIEW ";
			
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
		else $sort="ORDER BY DELV_CODE";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) DLVIEW ";
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
		$data->sql2=$queryPaged['sql_text'];
		
		$queryCount = array();
        $queryCount['sql_text'] = $query;
		$queryCount['sql_data'] = $filter['sql_data'];
		
		//$data->count = $mydb->count( $query );
		$data->count = $mydb->count( $queryCount );

		return($data);
    } 
	
	
	
	
	
	public function lookupTankStatusTypes($caseType='L', $jsonFlag=1)
	{
		$data = file_get_contents('tankStatusTypes.json');
		return $data;
	} 
	
	public function lookupTankGaugeTypes($caseType='L', $jsonFlag=1)
	{
		$data = file_get_contents('tankGaugeTypes.json');
		return $data;
	} 
	
	public function lookupTankLevelAlarms($caseType='L', $jsonFlag=1)
	{
		$data = file_get_contents('tankLevelAlarms.json');
		return $data;
	} 
	
	public function lookupTankAreas($caseType='L', $jsonFlag=1)
	{
		$data = file_get_contents('tankAreas.json');
		return $data;
	} 
	
	
	public function lookupTankNames($tankGroup="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
	{
		$data = file_get_contents('tankNames.json');
		return $data;
    } 
	
	public function lookupTankGroups($tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
	{
		$data = file_get_contents('tankGroups.json');
		return $data;
    } 
	
	public function lookupTankProducts($category=-1, $tankCode="-1", $caseType='L', $jsonFlag=1)
	{
		$data = file_get_contents('tankProducts.json');
		return $data;
    } 
	
	public function lookupTankProductInventory($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
	{
		$data = file_get_contents('tankProductInventory.json');
		return $data;
    } 
	
	public function lookupTankList($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
	{
		$data = file_get_contents('tankList.json');
		return $data;
    } 
	
	public function lookupTankItems($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
	{
		$data = file_get_contents('tankItems.json');
		return $data;
    } 
	
	public function exportTankItems($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
	{
		$data = file_get_contents('exportTankItems.json');
		return $data;
    } 
	
	
	
	public function lookupBayTankProducts($bay_code="-1", $arm_code="-1", $mtr_code="-1", $inj_code="-1", $caseType='L', $jsonFlag=1)
	{
		$data = file_get_contents('bayTankProducts.json');
		return $data;
    } 
	
	
	
	public function lookupPipeNodeList($bay_code="-1", $arm_code="-1", $mtr_code="-1", $bay_type="-1", $arm_type="-1", $blend_type="-1", $caseType='L', $jsonFlag=1)
	{
		$data = file_get_contents('pipenodeList.json');
		return $data;
    } 
	
	
	
	public function lookupTankProductInventory_RT($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
	{
		$rtnval = $this->lookupTankProductInventory($tankGroup, $tankCode, $tankBase, $caseType, $jsonFlag);
		return $rtnval;
	}
	
	public function lookupTankList_RT($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
	{
		$rtnval = $this->lookupTankList($tankGroup, $tankCode, $tankBase, $caseType, $jsonFlag);
		return $rtnval;
	}
	
	public function lookupTankItems_RT($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
	{
		$rtnval = $this->lookupTankItems($tankGroup, $tankCode, $tankBase, $caseType, $jsonFlag);
		return $rtnval;
	}
}
?>