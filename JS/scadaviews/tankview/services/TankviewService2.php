<?php
require_once( dirname(__FILE__) . '/../../../amfservices/core/services/bootstrap.php' );
//require_once( 'Thunk.class.php' );
//require_once( 'Journal.class.php' );

if(!defined('TANKVIEWSERVICE')) define('TANKVIEWSERVICE','TankviewService.class');

class TankviewService
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
		$sql = array();
        $sql['sql_text'] = "
			select 
				TANK_STATUS_ID
				, TANK_STATUS_CODE
				, TANK_STATUS_NAME
			from 
				TANK_STATUS_TYP
			where 
				1=1	
			order by TANK_STATUS_ID
		";
		$sql['sql_data'] = array();
			
        $mydb = DB::getInstance();
		if ( $jsonFlag == 1 )
		{
			$data = $mydb->retrieve($sql, $caseType);
		}
		else
		{
			$data = $mydb->retrieveArray($sql, $caseType);
		}

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
	} 
	
	public function lookupTankGaugeTypes($caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				GAUGE_METHOD_ID
				, GAUGE_METHOD_NAME
			from 
				GAUGE_METHOD_TYP
			where 
				1=1			
			order by GAUGE_METHOD_ID
		";
		$sql['sql_data'] = array();
			
        $mydb = DB::getInstance();
		if ( $jsonFlag == 1 )
		{
			$data = $mydb->retrieve($sql, $caseType);
		}
		else
		{
			$data = $mydb->retrieveArray($sql, $caseType);
		}

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
	} 
	
	public function lookupTankLevelAlarms($caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				LEVEL_ALARMS_ID
				, LEVEL_ALARMS_NAME
			from 
				LEVEL_ALARMS_TYP
			where 
				1=1			
			order by LEVEL_ALARMS_ID
		";
		$sql['sql_data'] = array();
			
        $mydb = DB::getInstance();
		if ( $jsonFlag == 1 )
		{
			$data = $mydb->retrieve($sql, $caseType);
		}
		else
		{
			$data = $mydb->retrieveArray($sql, $caseType);
		}

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
	} 
	
	public function lookupTankAreas($caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				AREA_K
				, AREA_NAME
-- 				, AREA_CPCTY
-- 				, AREA_EQP_SFT_LNK
			from 
				AREA_RC
			where 
				1=1			
			order by AREA_NAME
		";
		$sql['sql_data'] = array();
			
        $mydb = DB::getInstance();
		if ( $jsonFlag == 1 )
		{
			$data = $mydb->retrieve($sql, $caseType);
		}
		else
		{
			$data = $mydb->retrieveArray($sql, $caseType);
		}

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
	} 
	
	
	public function lookupTankNames($tankGroup="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				TANK_CODE
				, TANK_NAME
				, TANK_TERMINAL
				, TANK_SITENAME
				, TANK_BASE
				, TANK_BASE_NAME
				, TANK_BASE_CLASS
				, TANK_BCLASS_NAME	
				, TANK_LOCATION
				, TANK_GAUGINGMTHD
				, TANK_GROUP
				, TANK_ACTIVE
				, TANK_ATG_STATUS
			from 
				GUI_TANKS
			where 
				1=1
				and ('-1'=:tank_group or TANK_GROUP=:tank_group)
				and ('-1'=:tank_base or TANK_BASE=:tank_base)
			order by TANK_NAME 
			";
		$sql['sql_data'] = array($tankGroup, $tankBase);
			
        $mydb = DB::getInstance();
		if ( $jsonFlag == 1 )
		{
			$data = $mydb->retrieve($sql, $caseType);
		}
		else
		{
			$data = $mydb->retrieveArray($sql, $caseType);
		}

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 
	
	public function lookupTankGroups($tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				TGR_NAME
				, TGR_TANKCOUNT
				, TGR_TANKLIST
				, TGR_TANKCODE
				, TGR_BASECODE
				, TGR_BASENAME
				, TGR_SITECODE
				, TGR_SITENAME			
			from 
				GUI_TANK_GROUP
			where
				1=1
				and ('-1'=:tank_code or (TGR_TANKLIST like '%'||:tank_code||'%'))
				and ('-1'=:tank_base or TGR_BASECODE=:tank_base)
			order by TGR_NAME 
			";
		$sql['sql_data'] = array($tankCode, $tankBase);
			
        $mydb = DB::getInstance();
		if ( $jsonFlag == 1 )
		{
			$data = $mydb->retrieve($sql, $caseType);
		}
		else
		{
			$data = $mydb->retrieveArray($sql, $caseType);
		}

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 
	
	public function lookupTankProducts($category=-1, $tankCode="-1", $caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				bp.BASE_CODE
				, bp.BASE_NAME
				, bp.BASE_CAT
				, bc.BCLASS_DESC													as BASE_CLASS_DESC
				, bp.BASE_DENS_LO	
				, bp.BASE_DENS_HI	
				, bp.BASE_COLOR
				, decode(bp.BASE_CAT, 6, 1, 0)										as BASE_ADTV
				, bp.BASE_CODE||' - '||bp.BASE_NAME									as BASE_TEXT
				, bp.BASE_CODE||' - '||bp.BASE_NAME||' ('||bc.BCLASS_DESC||') ' 	as BASE_DESC
				, bc.BCLASS_DENS_LO													as BASE_CLASS_DENS_LO
				, bc.BCLASS_DENS_HI													as BASE_CLASS_DENS_HI
				, bc.BCLASS_VCF_ALG													as BASE_CLASS_VCF_ALG
				, bc.BCLASS_TEMP_LO													as BASE_CLASS_TEMP_LO
				, bc.BCLASS_TEMP_HI													as BASE_CLASS_TEMP_HI
				, bt.BASE_TANK_COUNT												as BASE_TANK_COUNT
				, bt.BASE_TANK_LIST													as BASE_TANK_LIST
			from 
				BASE_PRODS 			bp
				, (
					select 
						bs.BCLASS_NO
						, NVL(bm.BCLASS_NAME, bs.BCLASS_DESC)			as BCLASS_DESC
						, bs.BCLASS_DENS_LO
						, bs.BCLASS_DENS_HI
						, bs.BCLASS_VCF_ALG
						, bs.BCLASS_TEMP_LO
						, bs.BCLASS_TEMP_HI			
					from 
						BASECLASS 			bs
						, BCLASS_TYP		bm
					where 
						1=1	
						and bs.BCLASS_NO = bm.BCLASS_ID(+)
				) 					bc
				, (
					select
						TANKS.TANK_BASE
						, COUNT(TANKS.TANK_CODE) 													as BASE_TANK_COUNT
						, LISTAGG(TANKS.TANK_CODE, ', ') WITHIN GROUP (ORDER BY TANKS.TANK_CODE) 	as BASE_TANK_LIST
					from
						TANKS
					where
						1=1
					group by TANKS.TANK_BASE
				) bt
			where 
				( ( SYS_CONTEXT('CONN_CONTEXT', 'CMPYCODE') IS NULL )
				or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') = 'Y' )
				or ( SYS_CONTEXT('CONN_CONTEXT', 'ISMANAGER') IS NULL) )
				and bp.BASE_CAT = bc.BCLASS_NO
				and bp.BASE_CODE = bt.TANK_BASE(+) 
				and (-1=:category or bp.BASE_CAT=:category) 
				and ('-1'=:tank_code or (bt.BASE_TANK_LIST like '%'||:tank_code||'%'))
			order by bp.BASE_CODE 
		";
		$sql['sql_data'] = array( $category, $tankCode );
			
        $mydb = DB::getInstance();
		if ( $jsonFlag == 1 )
		{
			$data = $mydb->retrieve($sql, $caseType);
		}
		else
		{
			$data = $mydb->retrieveArray($sql, $caseType);
		}

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 
	
	public function lookupTankProductInventory($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				TANK_BASE
				, TANK_BASE_NAME
				, TANK_BASE_CLASS
				, TANK_BCLASS_NAME	
				, count(TANK_CODE)								as TANK_COUNT
				, sum( TANK_AMB_VOL + TANK_ULLAGE )				as TANK_CAPACITY
				, sum( TANK_AMB_VOL )							as TANK_AMB_VOL
				, sum( TANK_COR_VOL )							as TANK_COR_VOL
				, sum( TANK_LIQUID_KG )							as TANK_LIQUID_KG
				, sum( TANK_ULLAGE )							as TANK_ULLAGE
				, trunc( (sum( TANK_AMB_VOL ) / decode(sum( TANK_AMB_VOL + TANK_ULLAGE ), 0, 1, sum( TANK_AMB_VOL + TANK_ULLAGE ) )) * 100, 2 )		as TANK_FULLRATE
			from 
				GUI_TANKS
			where 
				1=1
				and ('-1'=:tank_group or TANK_GROUP=:tank_group)
				and ('-1'=:tank_code or TANK_CODE=:tank_code)
				and ('-1'=:tank_base or TANK_BASE=:tank_base)
			group by TANK_BASE, TANK_BASE_NAME, TANK_BASE_CLASS, TANK_BCLASS_NAME 
		";
		$sql['sql_data'] = array($tankGroup, $tankCode, $tankBase);
			
        $mydb = DB::getInstance();
		if ( $jsonFlag == 1 )
		{
			$data = $mydb->retrieve($sql, $caseType);
		}
		else
		{
			$data = $mydb->retrieveArray($sql, $caseType);
		}

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 
	
	public function lookupTankList($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				TANK_CODE
				, TANK_NAME
				, TANK_TERMINAL
				, TANK_SITENAME
				, TANK_BASE
				, TANK_BASE_NAME
				, TANK_BASE_COLOR
				, TANK_BASE_CLASS
				, TANK_BCLASS_NAME	
				, TANK_LVL_ALARM
				, TANK_GROUP
				, TANK_ACTIVE
				, TANK_STATUS
				, TANK_STATUS_NAME
				, TANK_AMB_VOL
				, TANK_COR_VOL
				, TANK_LIQUID_KG
				, TANK_ULLAGE
				, (TANK_AMB_VOL + TANK_ULLAGE)				as TANK_CAPACITY
				, TANK_PROD_LVL
				, TANK_HH_LEVEL
				, TANK_HH_STATE
				, TANK_H_LEVEL
				, TANK_H_STATE
				, TANK_L_LEVEL
				, TANK_L_STATE
				, TANK_LL_LEVEL
				, TANK_LL_STATE
			from 
				GUI_TANKS
			where 
				1=1
				and ('-1'=:tank_group or TANK_GROUP=:tank_group)
				and ('-1'=:tank_code or TANK_CODE=:tank_code)
				and ('-1'=:tank_base or TANK_BASE=:tank_base)
			order by TANK_NAME 
			";
		$sql['sql_data'] = array($tankGroup, $tankCode, $tankBase);
			
        $mydb = DB::getInstance();
		if ( $jsonFlag == 1 )
		{
			$data = $mydb->retrieve($sql, $caseType);
		}
		else
		{
			$data = $mydb->retrieveArray($sql, $caseType);
		}

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 
	
	public function getStandardTemperature()
	{
		$std_temp = getenv( "VSM_COMPENSATION_PT" );
		if ( $std_temp === FALSE )
		{
			$std_temp = 15.0;
		}
		
		// for testing
		//$std_temp = 30.0;
		
		return $std_temp;
	}
	
	/*
TANK_BCLASS_DENS_LO
TANK_BCLASS_DENS_HI
TANK_BCLASS_TEMP_LO
TANK_BCLASS_TEMP_HI
TANK_LOCATION
TANK_OUTFLOW_OPE
TANK_INFLOW_OPEN
TANK_ADHOC_IVRQ
TANK_INV_NEEDED
TANK_DIPPING_ON
TANK_LEAKDTCT_ON
TANK_ALARMED
TANK_RCPTS
TANK_TRFS
TANK_ALARM_STATE
TANK_GAUGINGMTHD
TANK_GAUGINGMTHD_DESC
TANK_ETH_CONTENT
TANK_LTR_CLOSE
TANK_KG_CLOSE
TANK_CLOSE_DENS
TANK_RPTVCFCLOSE
TANK_INFLOW_RATE
TANK_RCPT_VOL
TANK_TRF_VOL
TANK_RCPT_KG
TANK_TRF_KG
TANK_VAPOUR_KG
TANK_PROD_C_OF_E
TANK_60_86_VCF
TANK_RPTVCF
TANK_AMB_DENSITY
TANK_DTOL_VOLUME
TANK_DTOL_PERCENT
TANK_MTOL_VOLUME
TANK_MTOL_PERCENT
TANK_GROUP
TANK_BASE_REF_TEMP
TANK_BASE_REF_TUNT
TANK_BASE_CORR_MTHD
TANK_BASE_REF_TEMP_SPEC
TANK_BASE_LIMIT_PRESET_HT
TANK_BASE_DENS_LO
TANK_BASE_DENS_HI
	*/
	public function lookupTankItems($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
	{
		$ref_temp = $this->getStandardTemperature();
		
		$sql = array();
        $sql['sql_text'] = "
			select 
				TANK_CODE
				, TANK_NAME
				, TANK_TERMINAL
				, TANK_SITENAME
				, TANK_BASE
				, TANK_BASE_NAME
				, TANK_BASE_CLASS
				, TANK_BCLASS_NAME	
				, TANK_BASE_COLOR
				, TANK_TEMP
				, TANK_DENSITY
				, TANK_API
				, TANK_15_DENSITY
				, $ref_temp                                 as TANK_REF_TEMP
				, (TANK_AMB_VOL + TANK_ULLAGE)              as TANK_CAPACITY
				, TANK_PROD_LVL
				, TANK_AMB_VOL
				, TANK_COR_VOL
				, TANK_LIQUID_KG
-- 				, trunc(TANK_DENSITY*(1+0.0011)*TANK_COR_VOL/1000)     as TANK_VACUUM_KG
				, trunc((TANK_DENSITY+1.2)*TANK_COR_VOL/1000)          as TANK_VACUUM_KG
				, TANK_ULLAGE
				, TANK_PUMP_VOL
				, TANK_WATER_LVL
				, TANK_WATER
				, TANK_LVL_ALARM
				, TANK_LVLALARM_DESC
				, TANK_STATUS
				, TANK_STATUS_NAME
				, TANK_HH_LEVEL
				, TANK_H_LEVEL
				, TANK_L_LEVEL
				, TANK_LL_LEVEL
				, TANK_UH_LEVEL
				, TANK_UL_LEVEL
				, TANK_HH_STATE
				, TANK_H_STATE
				, TANK_L_STATE
				, TANK_LL_STATE
				, TANK_UH_STATE
				, TANK_UL_STATE
				, TANK_ACTIVE
				, TANK_ATG_STATUS
				, TANK_DATE
			from 
				GUI_TANKS
			where 
				1=1
				and ('-1'=:tank_group or TANK_GROUP=:tank_group)
				and ('-1'=:tank_code or TANK_CODE=:tank_code)
				and ('-1'=:tank_base or TANK_BASE=:tank_base)
			order by TANK_CODE 
			";
		$sql['sql_data'] = array($tankGroup, $tankCode, $tankBase);
			
        $mydb = DB::getInstance();
		if ( $jsonFlag == 1 )
		{
			$data = $mydb->retrieve($sql, $caseType);
		}
		else
		{
			$data = $mydb->retrieveArray($sql, $caseType);
		}

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 
	
	
	public function lookupLoadingBayList($bay_type="-1", $bay_code="-1", $base_code="-1", $caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select distinct
				ba.BA_CODE			as BAY_CODE
				, bd.BAD_NAME		as BAY_NAME
				, ba.BA_LOCK		as BAY_LOCK
				, ba.STATS			as BAY_STATUS
				, ba.BA_SEQ			as BAY_SEQ
				, ba.BA_AREA		as BAY_AREA
				, ar.AREA_NAME		as BAY_AREA_NAME
				, ba.BA_PHYSTYPE	as BAY_TYPE
				, bt.BAY_TYPE_CODE	as BAY_TYPE_CODE
				, bt.BAY_TYPE_DESC	as BAY_TYPE_DESC
				, 0					as BAY_ESD
				, 0					as BAY_INTERLOCKS
				, ba.LAST_TRIP		as BAY_LOAD_ID
				, ba.LAST_TRIP		as BAY_LOAD_TRIP
-- 				, os.OS_ORDER_NO	as BAY_LOAD_ORDER
				, co.ORDER_CUST_ORDNO	as BAY_LOAD_ORDER
				, tk.TNKR_CODE		as BAY_TNKR_CODE
				, tk.TNKR_NAME		as BAY_TNKR_NAME
				, bp.BAY_TANKS		as BAY_TANKS
				, bp.BAY_BASES		as BAY_BASES
			from 
				BAY_AREA		ba
				, AREA_RC		ar
				, BAD_BA		bb
				, BA_DEVICE		bd
				, (
					select 
						BAY_TYPE_ID
						, decode(BAY_TYPE_ID, 1, 'B_TRUCK', 2, 'T_TRUCK', 3, 'TRAIN', 4, 'SHIP', 5, 'UNLOAD', 'UNKNOWN')		as BAY_TYPE_CODE
						, BAY_TYPE_DESC
					from 
						LOAD_BAY_TYP				
				)				bt
				, SCHEDULE		sd
				, ORD_SCHEDULE	os
				, CUST_ORDER	co
				, TANKERS		tk
				, (
					select 
						gpn.STREAM_BAYCODE				as BAY_CODE
						, LISTAGG(gpn.STREAM_TANKCODE, '|') WITHIN group (order by gpn.STREAM_BCLASS_CODE) as BAY_TANKS
						, LISTAGG(gpn.STREAM_BASECODE, '|') WITHIN group (order by gpn.STREAM_BCLASS_CODE) as BAY_BASES
					from 
						(select unique STREAM_BAYCODE, STREAM_TANKCODE, STREAM_BASECODE, STREAM_BCLASS_CODE from GUI_PIPENODE)	gpn
					group by gpn.STREAM_BAYCODE
				)				bp
			where 
				ba.BA_AREA = ar.AREA_K(+)
				and ba.BA_CODE=bb.BA_CODE_LNK
				and bb.BAD_LNK=bd.BAD_PHYSCODE
				and ba.BA_PHYSTYPE=bt.BAY_TYPE_ID(+)
				and ba.LAST_TRIP=sd.SHLS_TRIP_NO(+)
				and sd.SHL_TANKER=tk.TNKR_CODE(+)
				and sd.SHLS_TRIP_NO=os.OS_SHL_SHLSTRIP(+)
				and sd.SHLS_SUPP=os.OS_SHL_SHLSSUPP(+)
				and os.OS_ORDER_NO=co.ORDER_NO(+)
				and ba.BA_CODE=bp.BAY_CODE(+)
 				and (sd.SHLS_SUPP not in (select CONFIG_VALUE from COMPANY_CONFIG where CONFIG_KEY='CMPY_2ND_DRAWER' and CONFIG_VALUE is not NULL))
-- 				and (-1=:bay_type or ba.BA_PHYSTYPE=:bay_type)
				and ('-1'=:bay_type or bt.BAY_TYPE_CODE=:bay_type)
				and ('-1'=:bay_code or ba.BA_CODE=:bay_code)
				and ('-1'=:base_code or (bp.BAY_BASES||'|') like ('%'||:base_code||'|%'))
			order by ba.BA_SEQ 
			";
		$sql['sql_data'] = array($bay_type, $bay_code, $base_code);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		$rows = $data->data;
		
		if ( array_key_exists('bayList', $_SESSION) === FALSE )
		//if ( !isset($_SESSION['bayList']) )
		{
			$_SESSION['bayList'] = array();
		}
		else
		{
			if ( gettype($_SESSION['bayList']) != 'array' )
			{
				$_SESSION['bayList'] = array();
			}
		}

		// add interlocks as an object
		// bay_interlocks: {site_esd:true, bay_esd:false, bay_overfill:true, bay_earth:true, bay_vapour:true} 
		foreach( $rows as $key=>$line )
		{
			$line['bay_interlocks'] = $this->lookupLoadingBayInterlocks($line['bay_code']);
			$line['bay_esd'] = $line['bay_interlocks']['bay_esd'];
			$rows[$key] = $line;
			$_SESSION['bayList'][$line['bay_code']] = $line;
		}
		
		if ( $jsonFlag == 1 )
		{
			$data->json_on=1;
			//$data->data = (json_encode($rows, JSON_PRETTY_PRINT));
			$data->data = (json_encode($rows));
			if ( $data->data === FALSE )
			{
				$data->json_on=0;
				$data->data = $rows;
			}
		}
		else
		{
			$data->data = $rows;
		}
        
		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 
	
	public function lookupLoadingArmList($bay_code="-1", $arm_code="-1", $arm_type="-1", $blend_type="-1", $caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				ba.BAA_CODE				as ARM_CODE
				, ba.ARM_NAME			as ARM_NAME
				, ba.BAA_BAY_SEQ		as ARM_NUMBER
				, ba.BAA_LOCK			as ARM_LOCK
				, ba.BAA_TYPE			as ARM_TYPE
				, at.ARM_TYPE_CODE		as ARM_TYPE_CODE
				, at.ARM_TYPE_NAME		as ARM_TYPE_NAME
				, ba.BAA_BLENDTYPE		as ARM_BLENDTYPE
				, bt.BLEND_TYPE_CODE	as ARM_BLENDTYPE_CODE
				, bt.BLEND_TYPE_NAME	as ARM_BLENDTYPE_NAME
				, NVL(ba.BAA_ACTIVE, 'L')			as ARM_STATUS
				, ba.BAA_PARKTYPE		as ARM_PARKTYPE
-- 				, ba.STATS				as ARM_STATUS
				, ic.STREAM_INJCNT		as ARM_INJECTORS
				, ROUND(DBMS_RANDOM.value(10,40), 1)		as ARM_TEMPERATURE
-- 				, 10+ROUND(DBMS_RANDOM.value*30, 1)		as ARM_TEMPERATURE
			from 
				BA_ARMS			ba
				, (
					select 
						ARM_TYPE_ID
						, decode(ARM_TYPE_ID, 1, 'B', 2, 'T', 0, 'A', '')		as ARM_TYPE_CODE
						, ARM_TYPE_NAME
					from 
						LOAD_ARM_TYP
				)				at
				, (
					select 
						BLEND_TYPE_ID
						, decode(BLEND_TYPE_ID, 1, 'STRAIGHT', 2, 'SIDESTREAM', 3, 'RATIO', 4, 'SEQUENTIAL', 0, 'UNKNOWN', '')		as BLEND_TYPE_CODE
						, BLEND_TYPE_NAME
					from 
						BLEND_TYP
				)				bt
				, (
					select 
						STREAM_ARMCODE
						, count(STREAM_INJCODE) 	as STREAM_INJCNT
					from 
						GUI_PIPENODE 
					group by STREAM_ARMCODE
				)				ic
			where 
				ba.BAA_CODE = ic.STREAM_ARMCODE
				and ba.BAA_TYPE=at.ARM_TYPE_ID(+)
				and ba.BAA_BLENDTYPE=bt.BLEND_TYPE_ID(+)
				and ('-1'=:bay_code or ba.BAA_BAD_LNK=:bay_code)
				and ('-1'=:arm_code or ba.BAA_CODE=:arm_code)
-- 				and (-1=:arm_type or ba.BAA_TYPE=:arm_type)
-- 				and (-1=:blend_type or ba.BAA_BLENDTYPE=:blend_type)
				and ('-1'=:arm_type or at.ARM_TYPE_CODE=:arm_type)
				and ('-1'=:blend_type or bt.BLEND_TYPE_CODE=:blend_type)
			";
		$sql['sql_data'] = array($bay_code, $arm_code, $arm_type, $blend_type);
			
        $mydb = DB::getInstance();
		if ( $jsonFlag == 1 )
		{
			$data = $mydb->retrieve($sql, $caseType);
		}
		else
		{
			$data = $mydb->retrieveArray($sql, $caseType);
		}
		
		$_SESSION['bayArms'] = $data->data;

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 
	
	public function lookupLoadingMeterList($mtr_code="-1", $usg_type="-1", $mtr_type="-1", $qty_type="-1", $caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
				select 
					bm.BAM_CODE 									as METER_CODE 
					, bm.BAM_NAME 									as METER_NAME 
					, bm.BAM_TYPE	 								as METER_TYPE 
					, bt.BA_METER_NAME 								as METER_TYPE_NAME 
					, bm.BAM_QTY_TYPE								as METER_QTYTYPE 
					, bq.QTY_NAME 									as METER_QTYTYPE_NAME 
					, bm.BAM_LAST_ATOTAL							as METER_AVOL_TOTAL
					, bm.BAM_LAST_CTOTAL							as METER_CVOL_TOTAL
					, bm.BAM_LAST_MTOTAL							as METER_MASS_TOTAL
-- 					, bm.BAM_OPL_ATOTAL								as METER_AVOL_TOTAL
-- 					, bm.BAM_OPL_CTOTAL								as METER_CVOL_TOTAL
-- 					, bm.BAM_OPL_MTOTAL								as METER_MASS_TOTAL
					, bm.BAM_MIN_FLOW 								as METER_MIN_FLOW 
					, bm.BAM_MAX_FLOW 								as METER_MAX_FLOW 
					, bm.BAM_KFA 									as METER_KFA
					, bu.BAM_USAGE_ID 								as METER_USAGE_ID
					, bu.BAM_USAGE_NAME 							as METER_USAGE_NAME
				from 
					BA_METERS 			bm 
					, BAM_USAGE_TYP 	bu 
					, QTY_TYP 			bq 
					, BA_METER_TYP 		bt 
				where 
					bm.BAM_USAGE = bu.BAM_USAGE_ID(+) 
					and bm.BAM_TYPE = bt.BA_METER_ID(+) 
					and bm.BAM_QTY_TYPE = bq.QTY_ID(+) 
					and bu.BAM_USAGE_ID IN (1,2,3,7,8) 
					and ('-1'=:mtr_code or bm.BAM_CODE=:mtr_code)
					and (-1=:usg_type or bm.BAM_USAGE=:usg_type)
					and (-1=:mtr_type or bm.BAM_TYPE=:mtr_type)
					and (-1=:qty_type or bm.BAM_QTY_TYPE=:qty_type)
			";
		$sql['sql_data'] = array($mtr_code, $usg_type, $mtr_type, $qty_type);
			
        $mydb = DB::getInstance();
		if ( $jsonFlag == 1 )
		{
			$data = $mydb->retrieve($sql, $caseType);
		}
		else
		{
			$data = $mydb->retrieveArray($sql, $caseType);
		}
		
		$_SESSION['bayMeters'] = $data->data;

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 
	
	
	
	public function lookupBayTankProducts($bay_code="-1", $arm_code="-1", $mtr_code="-1", $inj_code="-1", $caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				gpn.STREAM_INDEX
				, gpn.STREAM_BAYCODE				as BAY_CODE
				, gpn.STREAM_BAYNAME				as BAY_NAME
				, gpn.STREAM_ARMCODE				as ARM_CODE
				, gpn.STREAM_ARMNAME				as ARM_NAME
				, gpn.STREAM_MTRCODE				as METER_CODE
				, gpn.STREAM_MTRNAME				as METER_NAME
				, gpn.STREAM_INJCODE				as INJECTOR_CODE
				, gpn.STREAM_INJNAME				as INJECTOR_NAME
				, gpn.STREAM_TANKCODE				as TANK_CODE
				, gpn.STREAM_TANKSITE				as TANK_SITE
				, gpn.STREAM_TANKNAME				as TANK_NAME
				, gpn.STREAM_TANKDEN				as TANK_DENSITY
				, gpn.STREAM_TANKTEMP				as TANK_TEMPERATURE
				, gpn.STREAM_BASECODE				as BASE_CODE
				, gpn.STREAM_BASENAME				as BASE_NAME
				, gpn.STREAM_BCLASS_CODE			as BASECLASS_CODE
				, gpn.STREAM_BCLASS_NMAE			as BASECLASS_NAME
				, gpn.STREAM_BCLASS_LODENS			as BASECLASS_LODENS
				, gpn.STREAM_BCLASS_HIDENS			as BASECLASS_HIDENS
				, gpn.STREAM_SEQ					as STREAM_SEQ
			from 
				GUI_PIPENODE	gpn
			where 
				1 = 1 
				and ('-1'=:bay_code or gpn.STREAM_BAYCODE=:bay_code)
				and ('-1'=:arm_code or gpn.STREAM_ARMCODE=:arm_code)
				and ('-1'=:mtr_code or gpn.STREAM_MTRCODE=:mtr_code)
				and ('-1'=:inj_code or gpn.STREAM_INJCODE=:inj_code)
			order by gpn.STREAM_BAYCODE, gpn.STREAM_ARMCODE
			";
		$sql['sql_data'] = array($bay_code, $arm_code, $mtr_code, $inj_code);
			
        $mydb = DB::getInstance();
		if ( $jsonFlag == 1 )
		{
			$data = $mydb->retrieve($sql, $caseType);
		}
		else
		{
			$data = $mydb->retrieveArray($sql, $caseType);
		}

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 
	
	
	
	public function lookupPipeNodeList($bay_code="-1", $arm_code="-1", $mtr_code="-1", $bay_type="-1", $arm_type="-1", $blend_type="-1", $caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				gpn.STREAM_INDEX
				, gpn.STREAM_BAYCODE				as BAY_CODE
				, gpn.STREAM_BAYNAME				as BAY_NAME
				, gpn.STREAM_ARMCODE				as ARM_CODE
				, gpn.STREAM_ARMNAME				as ARM_NAME
				, gpn.STREAM_MTRCODE				as METER_CODE
				, gpn.STREAM_MTRNAME				as METER_NAME
				, gpn.STREAM_INJCODE				as INJECTOR_CODE
				, gpn.STREAM_INJNAME				as INJECTOR_NAME
				, gpn.STREAM_TANKCODE				as TANK_CODE
				, gpn.STREAM_TANKSITE				as TANK_SITE
				, gpn.STREAM_TANKNAME				as TANK_NAME
				, gpn.STREAM_TANKDEN				as TANK_DENSITY
				, gpn.STREAM_TANKTEMP				as TANK_TEMPERATURE
				, gpn.STREAM_BASECODE				as BASE_CODE
				, gpn.STREAM_BASENAME				as BASE_NAME
				, gpn.STREAM_BCLASS_CODE			as BASECLASS_CODE
				, gpn.STREAM_BCLASS_NMAE			as BASECLASS_NAME
				, gpn.STREAM_BCLASS_LODENS			as BASECLASS_LODENS
				, gpn.STREAM_BCLASS_HIDENS			as BASECLASS_HIDENS
				, gpn.STREAM_SEQ					as STREAM_SEQ
-- 				
				, bay.BAY_LOCK						as BAY_LOCK
				, bay.BAY_STATUS					as BAY_STATUS
				, bay.BAY_SEQ						as BAY_SEQ
				, bay.BAY_AREA						as BAY_AREA
				, bay.BAY_AREA_NAME					as BAY_AREA_NAME
				, bay.BAY_TYPE						as BAY_TYPE
				, bay.BAY_TYPE_CODE					as BAY_TYPE_CODE
				, bay.BAY_TYPE_DESC					as BAY_TYPE_DESC
-- 				
				, arm.ARM_NUMBER					as ARM_NUMBER
				, arm.ARM_LOCK						as ARM_LOCK
				, arm.ARM_TYPE						as ARM_TYPE
				, arm.ARM_TYPE_CODE					as ARM_TYPE_CODE 
				, arm.ARM_TYPE_NAME					as ARM_TYPE_NAME
				, arm.ARM_BLENDTYPE					as ARM_BLENDTYPE
				, arm.ARM_BLENDTYPE_CODE			as ARM_BLENDTYPE_CODE
				, arm.ARM_BLENDTYPE_NAME			as ARM_BLENDTYPE_NAME
				, arm.ARM_STATUS					as ARM_STATUS
				, arm.ARM_PARKTYPE					as ARM_PARKTYPE
				, arm.ARM_INJECTORS					as ARM_INJECTORS2
-- 
				, mtr.METER_TYPE					as METER_TYPE
				, mtr.METER_TYPE_NAME				as METER_TYPE_NAME
				, mtr.METER_QTYTYPE					as METER_QTYTYPE
				, mtr.METER_QTYTYPE_NAME			as METER_QTYTYPE_NAME
				, mtr.METER_AVOL_TOTAL				as METER_AVOL_TOTAL
				, mtr.METER_CVOL_TOTAL				as METER_CVOL_TOTAL
				, mtr.METER_MASS_TOTAL				as METER_MASS_TOTAL
-- 				, mtr.METER_USAGE 					as METER_USAGE
-- 				, mtr.METER_USAGE_NAME 				as METER_USAGE_NAME
-- 
				, 0									as INJECTOR_STATUS
				, gpic.STREAM_INJCNT				as ARM_INJECTORS
			from 
				GUI_PIPENODE	gpn
				, (
					select 
						STREAM_ARMCODE
						, STREAM_SEQ
						, count(STREAM_INJCODE) 	as STREAM_INJCNT
					from 
						GUI_PIPENODE 
					group by STREAM_ARMCODE, STREAM_SEQ
				)				gpic
				, (
					select 
						ba.BA_CODE			as BAY_CODE
						, bd.BAD_NAME		as BAY_NAME
						, ba.BA_LOCK		as BAY_LOCK
						, ba.STATS			as BAY_STATUS
						, ba.BA_SEQ			as BAY_SEQ
						, ba.BA_AREA		as BAY_AREA
						, ar.AREA_NAME		as BAY_AREA_NAME
						, ba.BA_PHYSTYPE	as BAY_TYPE
						, bt.BAY_TYPE_CODE	as BAY_TYPE_CODE
						, bt.BAY_TYPE_DESC	as BAY_TYPE_DESC
					from 
						BAY_AREA		ba
						, AREA_RC		ar
						, BAD_BA		bb
						, BA_DEVICE		bd
						, (
							select 
								BAY_TYPE_ID
								, decode(BAY_TYPE_ID, 1, 'B_TRUCK', 2, 'T_TRUCK', 3, 'TRAIN', 4, 'SHIP', 5, 'UNLOAD', 'UNKNOWN')		as BAY_TYPE_CODE
								, BAY_TYPE_DESC
							from 
								LOAD_BAY_TYP				
						)				bt
					where 
						ba.BA_AREA = ar.AREA_K(+)
						and ba.BA_CODE=bb.BA_CODE_LNK(+)
						and bb.BAD_LNK=bd.BAD_PHYSCODE(+)
						and ba.BA_PHYSTYPE=bt.BAY_TYPE_ID(+)
				)				bay
				, (
					select 
						ba.BAA_CODE				as ARM_CODE
						, ba.ARM_NAME			as ARM_NAME
						, ba.BAA_BAY_SEQ		as ARM_NUMBER
						, ba.BAA_LOCK			as ARM_LOCK
						, ba.BAA_TYPE			as ARM_TYPE
						, at.ARM_TYPE_CODE		as ARM_TYPE_CODE
						, at.ARM_TYPE_NAME		as ARM_TYPE_NAME
						, ba.BAA_BLENDTYPE		as ARM_BLENDTYPE
						, bt.BLEND_TYPE_CODE	as ARM_BLENDTYPE_CODE
						, bt.BLEND_TYPE_NAME	as ARM_BLENDTYPE_NAME
						, ba.BAA_ACTIVE			as ARM_STATUS
						, ba.BAA_PARKTYPE		as ARM_PARKTYPE
		-- 				, ba.STATS				as ARM_STATUS
						, ic.STREAM_INJCNT		as ARM_INJECTORS
					from 
						BA_ARMS			ba
						, (
							select 
								ARM_TYPE_ID
								, decode(ARM_TYPE_ID, 1, 'B', 2, 'T', 0, 'A', '')		as ARM_TYPE_CODE
								, ARM_TYPE_NAME
							from 
								LOAD_ARM_TYP
						)				at
						, (
							select 
								BLEND_TYPE_ID
								, decode(BLEND_TYPE_ID, 1, 'STRAIGHT', 2, 'SIDESTREAM', 3, 'RATIO', 4, 'SEQUENTIAL', 0, 'UNKNOWN', '')		as BLEND_TYPE_CODE
								, BLEND_TYPE_NAME
							from 
								BLEND_TYP
						)				bt
						, (
							select 
								STREAM_ARMCODE
								, count(STREAM_INJCODE) 	as STREAM_INJCNT
							from 
								GUI_PIPENODE 
							group by STREAM_ARMCODE
						)				ic
					where 
						ba.BAA_CODE = ic.STREAM_ARMCODE
						and ba.BAA_TYPE=at.ARM_TYPE_ID(+)
						and ba.BAA_BLENDTYPE=bt.BLEND_TYPE_ID(+)
				)				arm
				, (
					select 
						bm.BAM_CODE 									as METER_CODE 
						, bm.BAM_NAME 									as METER_NAME 
						, bm.BAM_TYPE	 								as METER_TYPE 
						, bt.BA_METER_NAME 								as METER_TYPE_NAME 
						, bm.BAM_QTY_TYPE								as METER_QTYTYPE 
						, bq.QTY_NAME 									as METER_QTYTYPE_NAME 
						, bm.BAM_LAST_ATOTAL							as METER_AVOL_TOTAL
						, bm.BAM_LAST_CTOTAL							as METER_CVOL_TOTAL
						, bm.BAM_LAST_MTOTAL							as METER_MASS_TOTAL
-- 						, bm.BAM_OPL_ATOTAL								as METER_AVOL_TOTAL
-- 						, bm.BAM_OPL_CTOTAL								as METER_CVOL_TOTAL
-- 						, bm.BAM_OPL_MTOTAL								as METER_MASS_TOTAL
						, bm.BAM_MIN_FLOW 								as METER_MIN_FLOW 
						, bm.BAM_MAX_FLOW 								as METER_MAX_FLOW 
						, bm.BAM_KFA 									as METER_KFA
						, bu.BAM_USAGE_ID 								as METER_USAGE
						, bu.BAM_USAGE_NAME 							as METER_USAGE_NAME
					from 
						BA_METERS 			bm 
						, BAM_USAGE_TYP 	bu 
						, QTY_TYP 			bq 
						, BA_METER_TYP 		bt 
					where 
						bm.BAM_TYPE = bt.BA_METER_ID(+) 
						and bm.BAM_QTY_TYPE = bq.QTY_ID(+) 
						and bm.BAM_USAGE = bu.BAM_USAGE_ID(+) 
-- 						and bu.BAM_USAGE_ID IN (1,2,3,7,8) 
				)				mtr
			where 
				gpn.STREAM_BAYCODE=bay.BAY_CODE
				and gpn.STREAM_ARMCODE=gpic.STREAM_ARMCODE
				and gpn.STREAM_SEQ=gpic.STREAM_SEQ
				and gpn.STREAM_ARMCODE=arm.ARM_CODE
				and gpn.STREAM_MTRCODE=mtr.METER_CODE(+)
				and ('-1'=:bay_code or gpn.STREAM_BAYCODE=:bay_code)
				and ('-1'=:arm_code or gpn.STREAM_ARMCODE=:arm_code)
				and ('-1'=:mtr_code or gpn.STREAM_MTRCODE=:mtr_code)
-- 				and (-1=:bay_type or bay.BAY_TYPE=:bay_type)
-- 				and (-1=:arm_type or arm.ARM_TYPE=:arm_type)
-- 				and (-1=:blend_type or arm.ARM_BLENDTYPE=:blend_type)
				and ('-1'=:bay_type or bay.BAY_TYPE_CODE=:bay_type)
				and ('-1'=:arm_type or arm.ARM_TYPE_CODE=:arm_type)
				and ('-1'=:blend_type or arm.ARM_BLENDTYPE_CODE=:blend_type)
			order by gpn.STREAM_BAYCODE, gpn.STREAM_ARMCODE
			";
		$sql['sql_data'] = array($bay_code, $arm_code, $mtr_code, $bay_type, $arm_type, $blend_type);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		$rows = $data->data;
		
		if ( array_key_exists('pipeNodes', $_SESSION) === FALSE )
		//if ( !isset($_SESSION['pipeNodes']) )
		{
			$_SESSION['pipeNodes'] = array();
		}
		else
		{
			if ( gettype($_SESSION['pipeNodes']) != 'array' )
			{
				$_SESSION['pipeNodes'] = array();
			}
		}

		$initFlags = array();
		foreach( $rows as $key=>$line )
		{
			$line_bay = $line['bay_code'];
			if ( array_key_exists($line_bay, $initFlags) === FALSE )
			{
				$initFlags[$line_bay] = FALSE;
			}
			if ( $initFlags[$line_bay] === FALSE )
			{
				$_SESSION['pipeNodes'][$line_bay] = array();
				$initFlags[$line_bay] = TRUE;
			}
			/*
			if ( !isset($_SESSION['pipeNodes'][$line_bay]) )
			{
				$_SESSION['pipeNodes'][$line_bay] = array();
			}
			else
			{
				if ( gettype($_SESSION['pipeNodes'][$line_bay]) != 'array' )
				{
					$_SESSION['pipeNodes'][$line_bay] = array();
				}
			}
			*/
			$line['cmpt_no'] = 0;
			$line['cmpt_prod_name'] = "N/A";
			$line['meter_totalizer'] = 0;
			
			$_SESSION['pipeNodes'][$line_bay][] = $line;
		}
		
		if ( $jsonFlag == 1 )
		{
			$data->json_on=1;
			$data->data = (json_encode($rows));
			if ( $data->data === FALSE )
			{
				$data->json_on=0;
				$data->data = $rows;
			}
		}
		else
		{
			$data->data = $rows;
		}
		
		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 
	
	
	
	public function lookupLoadingTrip($trip_no, $caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
				select 
					sc.CMPY_CODE 												as LOAD_CMPYCODE 
					, sc.CMPY_NAME												as LOAD_CMPYNAME
					, sh.SHLS_TRIP_NO											as LOAD_NUMBER
					, sh.SHLS_TRIP_NO											as LOAD_TRIP
-- 					, os.OS_ORDER_NO											as LOAD_ORDER
 					, co.ORDER_CUST_ORDNO										as LOAD_ORDER
					, sh.SHLS_DRIVER											as LOAD_OPERCODE
					, dr.PER_NAME												as LOAD_OPERNAME
					, tk.TNKR_CODE 												as LOAD_TANKER
					, tk.TNKR_NAME 												as LOAD_TNKR_NAME
					, NVL(sh.STATS, 'F') 										as LOAD_STATUS_ID
					, decode(st.STATUS_TEXT, NULL, 'UNKNOWN', st.STATUS_TEXT)	as LOAD_STATUS
				from 
					SCHEDULE 							sh
					, ORD_SCHEDULE						os
					, CUST_ORDER						co
					, COMPANYS 							sc
					, PERSONNEL 						dr
					, TANKERS 							tk
					, SCHEDULE_STATUS_SHORT_LOOKUP 		st
				where  
					sh.SHLS_TRIP_NO = :trip_no
					and sh.SHL_TANKER = tk.TNKR_CODE
					and sh.SHLS_SUPP = sc.CMPY_CODE
					and sh.SHLS_DRIVER = dr.PER_CODE(+)
					and sh.SHLS_TRIP_NO=os.OS_SHL_SHLSTRIP(+)
					and sh.SHLS_SUPP=os.OS_SHL_SHLSSUPP(+)
					and os.OS_ORDER_NO=co.ORDER_NO(+)
 				and (sh.SHLS_SUPP not in (select CONFIG_VALUE from COMPANY_CONFIG where CONFIG_KEY='CMPY_2ND_DRAWER' and CONFIG_VALUE is not NULL))
					and NVL(sh.STATS, 'F') = st.STATUS_CODE(+)
					and ( (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N'
						and sc.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
						or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
						or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
						or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
			";
		$sql['sql_data'] = array($trip_no);
			
        $mydb = DB::getInstance();
		if ( $jsonFlag == 1 )
		{
			$data = $mydb->retrieve($sql, $caseType);
		}
		else
		{
			$data = $mydb->retrieveArray($sql, $caseType);
		}

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 

    public function lookupLoadingCompartments($supplier, $trip_no, $caseType='L', $jsonFlag=1) 
	{
        $mydb = DB::getInstance();
        
        $conn = $mydb->connect;
        $curs = oci_new_cursor($conn);
        $stid = oci_parse($conn,"BEGIN :v_res := GUI_TRIP_CMPTS(:v_supp,:v_tripno); END;");
        
        oci_bind_by_name($stid, ':v_res', $curs, -1, OCI_B_CURSOR);
        oci_bind_by_name($stid, ":v_supp", $supplier);
        oci_bind_by_name($stid, ":v_tripno", $trip_no);
        
        oci_execute($stid);
        oci_execute($curs);

        $rows=array();
        while ($row = oci_fetch_assoc($curs))
		{
            //$rows[] = $data;
			$cmpt = array();
			$cmpt['cmpt_no'] 		= $row['TNKR_CMPT_NO'];
			$cmpt['arm_code'] 	= $row['ARMCODE'];
			$cmpt['arm_number'] 	= $row['ARM_NUMBER'];
			if ($cmpt['arm_number'] == null )
			{
				//$cmpt['arm_number'] = ((int)$row['TNKR_CMPT_NO']%7);
				$cmpt['arm_number'] = rand(1, 6);
			}
			$cmpt['prod_code'] 		= $row['PROD_CODE'];
			$cmpt['prod_name'] 		= $row['PROD_NAME'];
			$cmpt['prod_cmpycode'] 	= $row['PROD_CMPY_CODE'];
			$cmpt['prod_cmpyname'] 	= $row['PROD_CMPY_NAME'];
			$cmpt['qty_preset'] 	= $row['ALLOWED_QTY'];
			$cmpt['qty_obs'] 		= $row['LOAD_QTY'];
			$cmpt['prod_color'] 	= $row['PROD_COLOR'];
			$cmpt['prod_txt_color'] = $row['PROD_TXT_COLOR'];
			$cmpt['prod_unit'] 		= $row['CMPT_UNITS'];
			$cmpt['prod_unit_desc'] = $row['UNIT'];
			if ( $cmpt['prod_unit'] == null || $cmpt['prod_unit'] == "" )
			{
				$cmpt['prod_unit'] 		= $row['CMPT_UNIT_CODE'];
				$cmpt['prod_unit_desc'] = $row['CMPT_UNIT_DESC'];
			}
			
			$cmpt['cmpt_supplier'] = $supplier;
			$cmpt['cmpt_tripno'] = $trip_no;
			$rows[] = $cmpt;
        }

        oci_free_statement($stid);
        oci_free_statement($curs);

        arrayEncodingConversion($rows);

        return $rows;
    }
	
	public function lookupLoadingTanker($trip_no, $caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
				select 
					sc.CMPY_CODE 												as LOAD_CMPYCODE 
					, sc.CMPY_NAME												as LOAD_CMPYNAME
					, sh.SHLS_TRIP_NO											as LOAD_NUMBER
					, sh.SHLS_TRIP_NO											as LOAD_TRIP
-- 					, os.OS_ORDER_NO											as LOAD_ORDER
 					, co.ORDER_CUST_ORDNO										as LOAD_ORDER
					, sh.SHLS_DRIVER											as LOAD_OPERCODE
					, dr.PER_NAME												as LOAD_OPERNAME
					, NVL(sh.STATS, 'F') 										as LOAD_STATUS_ID
					, decode(st.STATUS_TEXT, NULL, 'UNKNOWN', st.STATUS_TEXT)	as LOAD_STATUS
					, tk.TNKR_CODE 												as TNKR_CODE
					, tk.TNKR_NAME 												as TNKR_NAME
					, tk.TNKR_OWNER												as TNKR_OWNER_CODE
					, oc.CMPY_NAME												as TNKR_OWNER
					, tk.TNKR_CARRIER											as TNKR_CARRIER_CODE
					, cc.CMPY_NAME												as TNKR_CARRIER
				from 
					SCHEDULE 							sh
					, ORD_SCHEDULE						os
					, CUST_ORDER						co
					, COMPANYS 							sc
					, PERSONNEL 						dr
					, TANKERS 							tk
					, SCHEDULE_STATUS_SHORT_LOOKUP 		st
					, COMPANYS 							oc
					, COMPANYS 							cc
				where  
					sh.SHLS_TRIP_NO = :trip_no
					and sh.SHL_TANKER = tk.TNKR_CODE
					and sh.SHLS_SUPP = sc.CMPY_CODE
					and sh.SHLS_TRIP_NO=os.OS_SHL_SHLSTRIP(+)
					and sh.SHLS_SUPP=os.OS_SHL_SHLSSUPP(+)
					and os.OS_ORDER_NO=co.ORDER_NO(+)
 				and (sh.SHLS_SUPP not in (select CONFIG_VALUE from COMPANY_CONFIG where CONFIG_KEY='CMPY_2ND_DRAWER' and CONFIG_VALUE is not NULL))
					and tk.TNKR_OWNER = oc.CMPY_CODE
					and tk.TNKR_CARRIER = cc.CMPY_CODE
					and sh.SHLS_DRIVER = dr.PER_CODE(+)
					and NVL(sh.STATS, 'F') = st.STATUS_CODE(+)
					and ( (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N'
						and sc.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
						or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
						or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
						or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
			";
		$sql['sql_data'] = array($trip_no);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		$rows = $data->data;

		// add interlocks as an object
		// bay_interlocks: {site_esd:true, bay_esd:false, bay_overfill:true, bay_earth:true, bay_vapour:true} 
		foreach( $rows as $key=>$line )
		{
			$tc1 = $this->lookupLoadingCompartments($line['load_cmpycode'], $trip_no, 'L', 0); 
			$tc2 = $this->lookupAdhocTripCompartments($trip_no, $line['load_cmpycode'], 'L');

			$line['tnkr_cmpts'] = $this->mergeLoadingCompartments($tc1, $tc2); 
			$rows[$key] = $line;
		}
		
		if ( $jsonFlag == 1 )
		{
			$data->json_on=1;
			//$data->data = (json_encode($rows, JSON_PRETTY_PRINT));
			$data->data = (json_encode($rows));
			if ( $data->data === FALSE )
			{
				$data->json_on=0;
				$data->data = $rows;
			}
		}
		else
		{
			$data->data = $rows;
		}

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 
	
	
	public function mergeLoadingCompartments($tc1, $tc2)
	{
		$cmpts = array();
		foreach( $tc1 as $key=>$line )
		{
			// get the quantity in compartment
			/* 
			       tc1                   tc2 
			['cmpt_supplier']       shls_supp_code
			['cmpt_tripno']         shls_trip_no
			['cmpt_no']             cmpt_no
			['prod_code']           prod_code
			['prod_name']           prod_name
			['prod_cmpycode']       prod_cmpy_code
			['prod_cmpyname'] 	
			['qty_preset']          qty_preset
			['qty_obs']             qty_loaded
			['prod_unit']           prod_unit
			['prod_unit_desc']      prod_unit_desc
			                        qty_preload
			                        cmpt_amb_load
			                        cmpt_std_load
			                        cmpt_mass_load
			*/
			$line['qty_in_cmpt'] = 0;
			$line['amb_in_cmpt'] = 0;
			$line['std_in_cmpt'] = 0;
			$line['mass_in_cmpt'] = 0;
			$line['preset_in_cmpt'] = 0;
			foreach( $tc2 as $key2=>$line2 )
			{
				$line['tst1'] = $line['cmpt_supplier'].'|'.$line['cmpt_tripno'].'|'.$line['cmpt_no'].'|'.$line['prod_code'].'|'.$line['prod_cmpycode'];
				$line['tst2'] = $line2['shls_supp_code'].'|'.$line2['shls_trip_no'].'|'.$line2['cmpt_no'].'|'.$line2['prod_code'].'|'.$line2['prod_cmpy_code'];
				if ( $line['cmpt_supplier'] == $line2['shls_supp_code'] 
				  && $line['cmpt_tripno'] == $line2['shls_trip_no']
				  && $line['cmpt_no'] == $line2['cmpt_no']
				  && $line['prod_code'] == $line2['prod_code']
				  && $line['prod_cmpycode'] == $line2['prod_cmpy_code']
				) 
				{
					$line['qty_in_cmpt'] = $line2['qty_loaded'];
					$line['amb_in_cmpt'] = $line2['cmpt_amb_load'];
					$line['std_in_cmpt'] = $line2['cmpt_std_load'];
					$line['mass_in_cmpt'] = $line2['cmpt_mass_load'];
					$line['preset_in_cmpt'] = $line2['qty_preset'];
					if ( $line['preset_in_cmpt'] < $line2['qty_preschd'] )
					{
						$line['preset_in_cmpt'] = $line2['qty_preschd'];
					}
					break;
				}
			}
			$cmpts[$key] = $line;
		}
		
		return $cmpts;
	}
	
	public function lookupLoadingTripByLoadNumber($trip_no, $caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
				select 
					sc.CMPY_CODE 												as LOAD_CMPYCODE 
					, sc.CMPY_NAME												as LOAD_CMPYNAME
					, sh.SHLS_TRIP_NO											as LOAD_NUMBER
					, sh.SHLS_DRIVER											as LOAD_OPERCODE
					, dr.PER_NAME												as LOAD_OPERNAME
					, tk.TNKR_CODE 												as LOAD_TANKER
					, tk.TNKR_NAME 												as LOAD_TNKR_NAME
					, NVL(sh.STATS, 'F') 										as LOAD_STATUS_ID
					, decode(st.STATUS_TEXT, NULL, 'UNKNOWN', st.STATUS_TEXT)	as LOAD_STATUS
				from 
					SCHEDULE 							sh
					, COMPANYS 							sc
					, PERSONNEL 						dr
					, TANKERS 							tk
					, SCHEDULE_STATUS_SHORT_LOOKUP 		st
					, LOADS								ld
				where  
					ld.LOAD_NUMBER = :load_num
					and sh.SHLSLOAD_LOAD_ID = ld.LOAD_ID
					and sh.SHLSLOAD_LD_TRM = ld.LD_TERMINAL
					and sh.SHL_TANKER = ld.LOAD_TANKER
					and sh.SHLS_DRIVER = ld.LOAD_OPER
-- 					sh.SHLS_TRIP_NO = :trip_no
					and sh.SHL_TANKER = tk.TNKR_CODE
					and sh.SHLS_SUPP = sc.CMPY_CODE
					and sh.SHLS_DRIVER = dr.PER_CODE(+)
					and NVL(sh.STATS, 'F') = st.STATUS_CODE(+)
					and ( (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N'
						and sc.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
						or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
						or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
						or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
				order by sh.SHLS_CALDATE DESC
			";
		$sql['sql_data'] = array($trip_no);
			
        $mydb = DB::getInstance();
		if ( $jsonFlag == 1 )
		{
			$data = $mydb->retrieve($sql, $caseType);
		}
		else
		{
			$data = $mydb->retrieveArray($sql, $caseType);
		}

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 
	
	public function lookupLoadingTankerByLoadNumber($trip_no, $caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
				select 
					sc.CMPY_CODE 												as LOAD_CMPYCODE 
					, sc.CMPY_NAME												as LOAD_CMPYNAME
					, sh.SHLS_TRIP_NO											as LOAD_NUMBER
					, sh.SHLS_DRIVER											as LOAD_OPERCODE
					, dr.PER_NAME												as LOAD_OPERNAME
					, NVL(sh.STATS, 'F') 										as LOAD_STATUS_ID
					, decode(st.STATUS_TEXT, NULL, 'UNKNOWN', st.STATUS_TEXT)	as LOAD_STATUS
					, tk.TNKR_CODE 												as TNKR_CODE
					, tk.TNKR_NAME 												as TNKR_NAME
					, tk.TNKR_OWNER												as TNKR_OWNER_CODE
					, oc.CMPY_NAME												as TNKR_OWNER
					, tk.TNKR_CARRIER											as TNKR_CARRIER_CODE
					, cc.CMPY_NAME												as TNKR_CARRIER
				from 
					SCHEDULE 							sh
					, COMPANYS 							sc
					, PERSONNEL 						dr
					, TANKERS 							tk
					, SCHEDULE_STATUS_SHORT_LOOKUP 		st
					, COMPANYS 							oc
					, COMPANYS 							cc
					, LOADS								ld
				where  
					ld.LOAD_NUMBER = :load_num
					and sh.SHLSLOAD_LOAD_ID = ld.LOAD_ID
					and sh.SHLSLOAD_LD_TRM = ld.LD_TERMINAL
					and sh.SHL_TANKER = ld.LOAD_TANKER
					and sh.SHLS_DRIVER = ld.LOAD_OPER
					and tk.TNKR_CARRIER = ld.LOAD_CARRIER
-- 					sh.SHLS_TRIP_NO = :trip_no
					and sh.SHL_TANKER = tk.TNKR_CODE
					and sh.SHLS_SUPP = sc.CMPY_CODE
					and tk.TNKR_OWNER = oc.CMPY_CODE
					and tk.TNKR_CARRIER = cc.CMPY_CODE
					and sh.SHLS_DRIVER = dr.PER_CODE(+)
					and NVL(sh.STATS, 'F') = st.STATUS_CODE(+)
					and ( (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N'
						and sc.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
						or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
						or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
						or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
				order by sh.SHLS_CALDATE DESC
			";
		$sql['sql_data'] = array($trip_no);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		$rows = $data->data;

		// add interlocks as an object
		// bay_interlocks: {site_esd:true, bay_esd:false, bay_overfill:true, bay_earth:true, bay_vapour:true} 
		foreach( $rows as $key=>$line )
		{
			$line['tnkr_cmpts'] = $this->lookupLoadingCompartments($line['load_cmpycode'], $trip_no, 'L', 0); 
			$rows[$key] = $line;
		}
		
		if ( $jsonFlag == 1 )
		{
			$data->json_on=1;
			//$data->data = (json_encode($rows, JSON_PRETTY_PRINT));
			$data->data = (json_encode($rows));
			if ( $data->data === FALSE )
			{
				$data->json_on=0;
				$data->data = $rows;
			}
		}
		else
		{
			$data->data = $rows;
		}

		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 
	
	public function lookupLoadingBayItemList($bay_code="-1", $caseType='L', $jsonFlag=1)
	{
		// get the bay information
		$sql = array();
        $sql['sql_text'] = "
			select 
				ba.BA_CODE			as BAY_CODE
				, bd.BAD_NAME		as BAY_NAME
				, ba.BA_LOCK		as BAY_LOCK
				, ba.STATS			as BAY_STATUS
				, ba.BA_SEQ			as BAY_SEQ
				, ba.BA_AREA		as BAY_AREA
				, ar.AREA_NAME		as BAY_AREA_NAME
				, ba.BA_PHYSTYPE	as BAY_TYPE
				, bt.BAY_TYPE_CODE	as BAY_TYPE_CODE
				, bt.BAY_TYPE_DESC	as BAY_TYPE_DESC
				, 0					as BAY_ESD
				, 0					as BAY_INTERLOCKS
				, ba.LAST_TRIP		as BAY_LOAD_ID
				, ba.LAST_TRIP		as BAY_LOAD_TRIP
-- 				, os.OS_ORDER_NO	as BAY_LOAD_ORDER
				, co.ORDER_CUST_ORDNO	as BAY_LOAD_ORDER
				, tk.TNKR_CODE		as BAY_TNKR_CODE
				, tk.TNKR_NAME		as BAY_TNKR_NAME
			from 
				BAY_AREA		ba
				, AREA_RC		ar
				, BAD_BA		bb
				, BA_DEVICE		bd
				, (
					select 
						BAY_TYPE_ID
						, decode(BAY_TYPE_ID, 1, 'B_TRUCK', 2, 'T_TRUCK', 3, 'TRAIN', 4, 'SHIP', 5, 'UNLOAD', 'UNKNOWN')		as BAY_TYPE_CODE
						, BAY_TYPE_DESC
					from 
						LOAD_BAY_TYP				
				)				bt
				, SCHEDULE		sd
				, ORD_SCHEDULE	os
				, CUST_ORDER	co
				, TANKERS		tk
			where 
				ba.BA_AREA = ar.AREA_K(+)
				and ba.BA_CODE=bb.BA_CODE_LNK(+)
				and bb.BAD_LNK=bd.BAD_PHYSCODE(+)
				and ba.BA_PHYSTYPE=bt.BAY_TYPE_ID(+)
				and ba.LAST_TRIP=sd.SHLS_TRIP_NO(+)
				and sd.SHL_TANKER=tk.TNKR_CODE(+)
				and sd.SHLS_TRIP_NO=os.OS_SHL_SHLSTRIP(+)
				and sd.SHLS_SUPP=os.OS_SHL_SHLSSUPP(+)
				and os.OS_ORDER_NO=co.ORDER_NO(+)
 				and (sd.SHLS_SUPP not in (select CONFIG_VALUE from COMPANY_CONFIG where CONFIG_KEY='CMPY_2ND_DRAWER' and CONFIG_VALUE is not NULL))
				and ('-1'=:bay_code or ba.BA_CODE=:bay_code)
			";
		$sql['sql_data'] = array($bay_code);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		$rows = $data->data;
		
		if ( array_key_exists('bayItems', $_SESSION) === FALSE )
		//if ( !isset($_SESSION['bayItems']) )
		{
			$_SESSION['bayItems'] = array();
		}
		else
		{
			if ( gettype($_SESSION['bayItems']) != 'array' )
			{
				$_SESSION['bayItems'] = array();
			}
		}

		foreach( $rows as $key=>$line )
		{
			// add the object of bay_interlocks
			$line['bay_interlocks'] = $this->lookupLoadingBayInterlocks($line['bay_code']);
			$line['bay_esd'] = $line['bay_interlocks']['bay_esd'];
			
			// add the list of bay_arms
			$arm_data = $this->lookupLoadingArmList($line['bay_code'], "-1", "-1", "-1", 'L', 0);
			
			if ( (int)$line['bay_load_id'] > 0 )
			{
				// add the object of bay_load
				$load_data = $this->lookupLoadingTrip($line['bay_load_id'], 'L', 0);
				// add the object of bay_tanker
				$tnkr_data = $this->lookupLoadingTanker($line['bay_load_id'], 'L', 0);
			}
			else
			{
				$line['bay_load_id'] = 0;
				$line['bay_load_trip'] = null;
				$line['bay_load_order'] = null;
				$line['bay_tnkr_code'] = "";
				$line['bay_tnkr_name'] = null;
	
				$load_data = array();
				$load_data[0] = array();
				$load_data[0]['load_cmpycode'] = "        ";
				$load_data[0]['load_cmpyname'] = "                    ";
				$load_data[0]['load_number'] = 0;
				$load_data[0]['load_trip'] = null;
				$load_data[0]['load_order'] = null;
				$load_data[0]['load_opercode'] = "      ";
				$load_data[0]['load_opername'] = "                                                  ";
				$load_data[0]['load_tanker'] = "                    ";
				$load_data[0]['load_tnkr_name'] = null;
				$load_data[0]['load_status_id'] = "D";
				$load_data[0]['load_status'] = "DELIVERED OK";

				$tnkr_data = array();
				$tnkr_data[0] = array();
				$tnkr_data[0]['load_cmpycode'] = "        ";
				$tnkr_data[0]['load_cmpyname'] = "                    ";
				$tnkr_data[0]['load_number'] = 0;
				$tnkr_data[0]['load_trip'] = null;
				$tnkr_data[0]['load_order'] = null;
				$tnkr_data[0]['load_opercode'] = "      ";
				$tnkr_data[0]['load_opername'] = "                                                  ";
				$tnkr_data[0]['tnkr_code'] = "                    ";
				$tnkr_data[0]['tnkr_name'] = null;
				$tnkr_data[0]['load_status_id'] = "D";
				$tnkr_data[0]['load_status'] = "DELIVERED OK";
				$tnkr_data[0]['tnkr_cmpts'] = array();
				$tnkr_data[0]['tnkr_cmpts'][0]=array(); 
				$tnkr_data[0]['tnkr_cmpts'][0]['cmpt_no']="1"; 
				$tnkr_data[0]['tnkr_cmpts'][0]['arm_code']=null; 
				$tnkr_data[0]['tnkr_cmpts'][0]['arm_number']=1; 
				$tnkr_data[0]['tnkr_cmpts'][0]['prod_code']=""; 
				$tnkr_data[0]['tnkr_cmpts'][0]['prod_name']=""; 
				$tnkr_data[0]['tnkr_cmpts'][0]['prod_cmpycode']=""; 
				$tnkr_data[0]['tnkr_cmpts'][0]['prod_cmpyname']=""; 
				$tnkr_data[0]['tnkr_cmpts'][0]['qty_preset']=null; 
				$tnkr_data[0]['tnkr_cmpts'][0]['qty_obs']=0; 
				$tnkr_data[0]['tnkr_cmpts'][0]['prod_color']="#F9E000"; 
				$tnkr_data[0]['tnkr_cmpts'][0]['prod_txt_color']="#110B00"; 
				$tnkr_data[0]['tnkr_cmpts'][0]['prod_unit']="5"; 
				$tnkr_data[0]['tnkr_cmpts'][0]['prod_unit_desc']="l (amb)"; 
				$tnkr_data[0]['tnkr_cmpts'][0]['cmpt_supplier']=""; 
				$tnkr_data[0]['tnkr_cmpts'][0]['cmpt_tripno']=""; 
				
			}
			
			if ( $this->DATA_ONLY == 1 )
			{
				$line['bay_arms'] = $arm_data;
				$line['bay_load'] = $load_data;
				$line['bay_tanker'] = $tnkr_data;
			}
			else
			{
				$line['bay_arms'] = $arm_data->data;
				$line['bay_load'] = $load_data->data;
				$line['bay_tanker'] = $tnkr_data->data;
			}
			
			$rows[$key] = $line;
			$_SESSION['bayItems'][$line['bay_code']] = $line;
		}
		
		if ( $jsonFlag == 1 )
		{
			$data->json_on=1;
			//$data->data = (json_encode($rows, JSON_PRETTY_PRINT));
			$data->data = (json_encode($rows));
			if ( $data->data === FALSE )
			{
				$data->json_on=0;
				$data->data = $rows;
			}
		}
		else
		{
			$data->data = $rows;
		}
		
		if ( $this->DATA_ONLY == 1 )
		{
			return($data->data);
		}
		else
		{
			return($data);
		}
    } 

	
	
	/*
		The following section is for the services to retrieve real-time data from SCADAMAN
	*/
	
	
	/*
	 bayList, partially real-time data, the follwoing fields require refreshing in every 2-10 seconds:
		bay_lock:false,
		bay_status:'L'
		bay_esd:false,
		bay_tnkr_code:'TST001',
		bay_tnkr_name: "??A12345",
		bay_load_id:987654321,
		bay_interlocks: {site_esd:true, bay_esd:false, bay_overfill:true, bay_earth:true, bay_vapour:true} 
	*/
	public function lookupLoadingBayList_RT($bay_type="-1", $bay_code="-1", $base_code="-1", $caseType='L', $jsonFlag=1)
	{
		// get data from scada server
		// Note: $_SESSION['scadaData'] is an Array of Objects, $bay_data is an Object
		//$bay_code="BAY01";
		$this->retrieveScadaData($bay_code);
		/*
		if ( array_key_exists('scadaData', $_SESSION) === FALSE 
		|| count($_SESSION['scadaData'])== 0 
		//|| $this->bayviewServers[$bay_code]['active'] === FALSE
		)
		{
			return $this->lookupLoadingBayList($bay_type, $bay_code, $base_code, $caseType, $jsonFlag);
		}
		*/
		$scada_data = $_SESSION['scadaData'];
		
		$rtBays = array();
		$_SESSION['bayListRT'] = $_SESSION['bayList'];
		foreach( $_SESSION['bayListRT'] as $key=>$line )
		{
			// bay_item: Array, bay_data: Object
			$bay_item = $line;
			$bay_data = $scada_data[$key];
		
			// get data from database
			$db_bays = $this->lookupAdhocBayList($key);
			$db_trip = $this->lookupAdhocTripTanker($bay_data->bay_load_id, trim($bay_data->bay_tnkr_code));
			//$db_tanker = $this->lookupAdhocTanker(trim($bay_data->bay_tnkr_code));
			
			// bay details
			// [1] bay_item:								array 	
			// [1] bay_data:								object 
			$bay_item['bay_code'] = trim($bay_data->bay_code);
			$bay_item['bay_esd'] = !$bay_data->bay_esd;
			$bay_item['bay_load_id'] = $bay_data->bay_load_id;
			$bay_item['bay_load_trip'] = $db_trip[0]['load_trip'];
			$bay_item['bay_load_order'] = $db_trip[0]['load_order'];
			$bay_item['bay_tnkr_code'] = $bay_data->bay_tnkr_code;
			$bay_item['bay_lock'] = $db_bays[0]['bay_lock'];
			$bay_item['bay_status'] = $db_bays[0]['bay_status'];
			//$bay_item['bay_tnkr_name'] = $db_tanker[0]['tnkr_name'];
			$bay_item['bay_tnkr_name'] = $db_trip[0]['tnkr_name'];
			
			// bay interlocks
			// [2] bay_item[bay_interlocks]:				array   
			// [2] bay_data->bay_interlocks:				object 
			$bay_item['bay_interlocks']['site_esd'] = !$bay_data->bay_interlocks->site_esd;
			$bay_item['bay_interlocks']['bay_esd'] = !$bay_data->bay_interlocks->bay_esd;
			$bay_item['bay_interlocks']['bay_overfill'] = $bay_data->bay_interlocks->bay_overfill;
			$bay_item['bay_interlocks']['bay_earth'] = $bay_data->bay_interlocks->bay_earth;
			$bay_item['bay_interlocks']['bay_vapour'] = $bay_data->bay_interlocks->bay_vapour;
			
			$bay_item['bay_interlocks']['bay_earth_overfill_unpark'] = $bay_data->bay_interlocks->bay_earth_overfill_unpark;
			$bay_item['bay_interlocks']['bay_earth_overfill_connect'] = $bay_data->bay_interlocks->bay_earth_overfill_connect;
			$bay_item['bay_interlocks']['bay_vapour_unpark'] = $bay_data->bay_interlocks->bay_vapour_unpark;
			$bay_item['bay_interlocks']['bay_vapour_connect'] = $bay_data->bay_interlocks->bay_vapour_connect;
			$bay_item['bay_interlocks']['bay_overfill_unpark'] = $bay_data->bay_interlocks->bay_overfill_unpark;
			$bay_item['bay_interlocks']['bay_overfill_connect'] = $bay_data->bay_interlocks->bay_overfill_connect;
			$bay_item['bay_interlocks']['bay_earth_unpark'] = $bay_data->bay_interlocks->bay_earth_unpark;
			$bay_item['bay_interlocks']['bay_earth_connect'] = $bay_data->bay_interlocks->bay_earth_connect;
			$bay_item['bay_interlocks']['bay_trans_switch'] = $bay_data->bay_interlocks->bay_trans_switch;
			$bay_item['bay_interlocks']['bay_drum_in_position'] = $bay_data->bay_interlocks->bay_drum_in_position;
			$bay_item['bay_interlocks']['bay_spear_down'] = $bay_data->bay_interlocks->bay_spear_down;
			$bay_item['bay_interlocks']['bay_no_type'] = $bay_data->bay_interlocks->bay_no_type;
			$bay_item['bay_interlocks']['bay_deadman'] = $bay_data->bay_interlocks->bay_deadman;
			$bay_item['bay_interlocks']['bay_issteady'] = $bay_data->bay_interlocks->bay_issteady;
			
			// refresh bay item in session
			$_SESSION['bayListRT'][$key] = $bay_item;
			$rtBays[] = $bay_item;
		}
		
		//return $_SESSION['bayListRT'];
		if ( $jsonFlag == 1 )
		{
			$data = json_encode($rtBays);
			if ( $data === FALSE )
			{
				$data->json_on=0;
				$data = $rtBays;
			}
		}
		else
		{
			$data = $rtBays;
		}
		
		return($data);
    } 
	
	/*
	armList, , partially real-time data, the follwoing fields require refreshing in every 2-10 seconds:
			arm_lock:'N',
			arm_temperature:21.4
			arm_status
	*/
	public function lookupLoadingArmList_RT($bay_code="-1", $arm_code="-1", $arm_type="-1", $blend_type="-1", $caseType='L', $jsonFlag=1)
	{
		$_SESSION['bayArmsRT'] = $_SESSION['bayArms'];
		$data = $_SESSION['bayArmsRT'];
		
		return($data);
    } 
	
	
	/*
	meterList, , partially real-time data, the follwoing fields require refreshing in every 2-10 seconds:
		meter_avol_total
		meter_cvol_total
		meter_mass_total
	*/
	public function lookupLoadingMeterList_RT($mtr_code="-1", $usg_type="-1", $mtr_type="-1", $qty_type="-1", $caseType='L', $jsonFlag=1)
	{
		$_SESSION['bayMetersRT'] = $_SESSION['bayMeters'];
		$data = $_SESSION['bayMetersRT'];
		
		return($data);
    } 
	
	
	
	/*
	pipeNodeList, , partially real-time data, the follwoing fields require refreshing in every 2-10 seconds:
		bay_lock:false,
		bay_status:'L'
		arm_lock:'N',
		arm_status:true,
		meter_avol_total:118530154,
		meter_cvol_total:117590494,
		meter_mass_total:98519218,
		injector_status:true,
		tank_density:729.10,
		tank_temperature:21.1,
	*/
	public function lookupPipeNodeList_RT($bay_code="-1", $arm_code="-1", $mtr_code="-1", $bay_type="-1", $arm_type="-1", $blend_type="-1", $caseType='L', $jsonFlag=1)
	{
		// get data from scada server
		// Note: $_SESSION['scadaData'] is an Array of Objects, $bay_data is an Object
		
		$this->retrieveScadaData($bay_code);
		/*
		if ( array_key_exists('scadaData', $_SESSION) === FALSE 
		|| count($_SESSION['scadaData'])== 0 
		|| $this->bayviewServers[$bay_code]['active'] === FALSE
//		|| ($bay_code!='-1' && array_key_exists($bay_code, $_SESSION['scadaData']) === FALSE)
		)
		{
			return $this->lookupPipeNodeList($bay_code, $arm_code, $mtr_code, $bay_type, $arm_type, $blend_type, $caseType, $jsonFlag);
		}
		*/
		$scada_data = $_SESSION['scadaData'];
		
		$rtNodes = array();
		$_SESSION['pipeNodesRT'] = $_SESSION['pipeNodes'];
		foreach( $_SESSION['pipeNodesRT'] as $key=>$line )
		{
			if ( $bay_code != '-1' && $bay_code != $key )
			{
				continue;
			}
			
			// get data from database
			$db_bays = $this->lookupAdhocBayList($key);
			$db_arms = $this->lookupAdhocArmList($key);
			
			// bay_item: Array, bay_data: Object
			$bay_item = $line;
			$bay_data = $scada_data[$key];
			foreach( $bay_item as $node_key=>$node_item )
			{
				if ( $node_item['bay_code'] == $key )
				{
					//$node_item['tank_name'] = 'T123';
					$node_item['bay_lock'] = $db_bays[0]['bay_lock'];
					$node_item['bay_status'] = $db_bays[0]['bay_status'];
					
					$arm_id = $node_item['arm_number'] - 1;
					$arm_item_scada = $bay_data->bay_arms[$arm_id];
					
					$node_item['cmpt_no'] = $arm_item_scada->arm_compartment;
					$cmpt_id = $node_item['cmpt_no'] - 1;
					$cmpt_item_scada = $bay_data->bay_tanker[0]->tnkr_cmpts[$cmpt_id];

					if ( strlen(trim($cmpt_item_scada->prod_name)) == 0 )
					{
						//$cmpt_item_scada->prod_code = $cmpt2armprod[$cmpt_item['cmpt_no']];
						$cmpt_item_scada->prod_name = trim($arm_item_scada->arm_prodname);
					}
					$node_item['cmpt_prod_code'] = $cmpt_item_scada->prod_code;
					$node_item['cmpt_prod_name'] = $cmpt_item_scada->prod_name;
					$node_item['cmpt_qty_preset'] = round($cmpt_item_scada->qty_preset);
					$node_item['cmpt_qty_obs'] = round($cmpt_item_scada->qty_obs);
					$node_item['cmpt_amb_schd'] = round($cmpt_item_scada->cmpt_amb_schd);
					$node_item['cmpt_std_schd'] = round($cmpt_item_scada->cmpt_std_schd);
					$node_item['cmpt_mass_schd'] = round($cmpt_item_scada->cmpt_mass_schd);
					$node_item['cmpt_amb_load'] = round($cmpt_item_scada->cmpt_amb_load);
					$node_item['cmpt_std_load'] = round($cmpt_item_scada->cmpt_std_load);
					$node_item['cmpt_mass_load'] = round($cmpt_item_scada->cmpt_mass_load);
				
					$node_item['qty_in_cmpt'] = 0;//round($cmpt_item_scada->qty_in_cmpt);
					$node_item['amb_in_cmpt'] = 0;//round($cmpt_item_scada->amb_in_cmpt);
					$node_item['std_in_cmpt'] = 0;//round($cmpt_item_scada->std_in_cmpt);
					$node_item['mass_in_cmpt'] = 0;//round($cmpt_item_scada->mass_in_cmpt);
					$node_item['preset_in_cmpt'] = 0;//round($cmpt_item_scada->preset_in_cmpt);

				// cmpt qty fields are not populated, so we need to get them from arm qty fields
					if ( $node_item['meter_qtytype'] == 2 )
					{
						$node_item['qty_preset'] = $node_item['cmpt_mass_schd'];
						//$node_item['qty_obs'] = $node_item['cmpt_mass_load']+round($arm_item_scada->arm_qty_mass);
						$node_item['qty_obs'] = $node_item['mass_in_cmpt']+round($arm_item_scada->arm_qty_mass);
						$node_item['cmpt_mass_load'] = $node_item['qty_obs'];
					}
					else if ( $node_item['meter_qtytype'] == 1 )
					{
						$node_item['qty_preset'] = $node_item['cmpt_std_schd'];
						//$node_item['qty_obs'] = $node_item['cmpt_std_load']+round($arm_item_scada->arm_qty_std);
						$node_item['qty_obs'] = $node_item['std_in_cmpt']+round($arm_item_scada->arm_qty_std);
						$node_item['cmpt_std_load'] = $node_item['qty_obs'];
					}
					else
					{
						$node_item['qty_preset'] = $node_item['cmpt_amb_schd'];
						//$node_item['qty_obs'] = $node_item['cmpt_amb_load']+round($arm_item_scada->arm_qty_amb);
						$node_item['qty_obs'] = $node_item['amb_in_cmpt']+round($arm_item_scada->arm_qty_amb);
						$node_item['cmpt_amb_load'] = $node_item['qty_obs'];
					}
					
					$node_item['arm_status'] = $arm_item_scada->arm_unpark?'L':'A';
					if ( $node_item['arm_parktype']==1 || $node_item['bay_type_code'] == "UNLOAD" ) {
						$node_item['arm_status'] = 'L';
					}
					$node_item['arm_lock'] = $db_arms[$arm_id]['arm_lock'];
					
					$mtr_num = $node_item['stream_seq'];
					if ( strlen($node_item['meter_code'])>0 
					&& strlen($node_item['injector_code'])==0 
					)
					{
						// this is the meter line
						// arm_mtrXtotalizer - X: 1,2
						$mtr_totalizer = "arm_mtr".$mtr_num."totalizer";
						$node_item['meter_totalizer'] = $arm_item_scada->$mtr_totalizer;
						$node_item['meter_avol_total'] = $arm_item_scada->$mtr_totalizer;
						$node_item['meter_cvol_total'] = $arm_item_scada->$mtr_totalizer;
						$node_item['meter_mass_total'] = $arm_item_scada->$mtr_totalizer;
						// arm_mtrXpumpreq - X: 1,2
						$mtr_pump = "arm_mtr".$mtr_num."pumpreq";
						$node_item['meter_status'] = $arm_item_scada->$mtr_pump;
						// arm_mtrXgrossvolume - X: 1,2
						$mtr_grossvolume = "arm_mtr".$mtr_num."grossvolume";
						$node_item['meter_grossvolume'] = round($arm_item_scada->$mtr_grossvolume);
						// arm_mtrXtemperature - X: 1,2
						$mtr_temperature = "arm_mtr".$mtr_num."temperature";
						$node_item['meter_temperature'] = round($arm_item_scada->$mtr_temperature,1);
						
						$prod_temp  = "arm_prd".$mtr_num."temperature";
						$node_item['prod_temperature'] = round($arm_item_scada->$prod_temp,1);
						$prod_dens  = "arm_prd".$mtr_num."density";
						$node_item['prod_density'] = round($arm_item_scada->$prod_dens,2);
						$prod_flow  = "arm_prd".$mtr_num."flowrate";
						$node_item['prod_flowrate'] = round($arm_item_scada->$prod_flow);
					}
					if ( strlen($node_item['meter_code'])>0 
					&& strlen($node_item['injector_code'])>0
					&& $node_item['meter_code'] = $node_item['injector_code']
					)
					{
						// this is the injector line
						// arm_mtrXinjYpumpreq - X: 1,2; Y: 1,2,3,4
						$inj_num = substr($node_item['injector_code'], -1);
						$inj_pump = "arm_mtr".$node_item['stream_seq']."inj".$inj_num."pumpreq";
						$node_item['injector_status'] = $arm_item_scada->$inj_pump;
					}
				}
				$bay_item[$node_key] = $node_item;
				$rtNodes[] = $node_item;
			}
		
			// refresh bay item in session
			$_SESSION['pipeNodesRT'][$key] = $bay_item;
		}
		
		//return $_SESSION['pipeNodesRT'];
		if ( $jsonFlag == 1 )
		{
			$data = json_encode($rtNodes);
			if ( $data === FALSE )
			{
				$data->json_on=0;
				$data = $rtNodes;
			}
		}
		else
		{
			$data = $rtNodes;
		}
		
		return($data);
    } 
	
	
	
	public function lookupLoadingTrip_RT($trip_no, $caseType='L', $jsonFlag=1)
	{
		return($data);

    } 

    public function lookupLoadingCompartments_RT($supplier, $trip_no, $caseType='L', $jsonFlag=1) 
	{
        return $rows;
    }
	
	public function lookupLoadingTanker_RT($trip_no, $caseType='L', $jsonFlag=1)
	{
		return($data);
    } 
	
	/*
	bayItemList, , partially real-time data, the follwoing fields require refreshing in every 2-10 seconds:
	bay_lock:false,
	bay_status:'L'
	bay_esd:false,
	bay_tnkr_code:'TST00n',
	bay_tnkr_name: "??A1234n",
	bay_load_id:987654321,
	bay_interlocks: {
		site_esd:true, 
		bay_esd:false, 
		bay_overfill:true, 
		bay_earth:true, 
		bay_vapour:true
	},
	bay_arms: [
		{
			arm_lock:'N',
			arm_status:
			arm_temperature:21.4
		}, 
		{
			arm_lock:'N',
			arm_status:
			arm_temperature:21.4
		}, 
		{
			arm_lock:'N',
			arm_status:
			arm_temperature:21.4
		}, 
		{
			arm_lock:'N',
			arm_status:
			arm_temperature:21.4
		} 
	],
	bay_load: {
		load_cmpycode:'ABCD1234',
		load_cmpyname:'abcd1234',
		load_number:987654321,
		load_opercode:'1234',
		load_opername:'David D',
		load_tanker:'TST00n',
		load_tnkr_name: "??A12345",
		load_status_id:2,
		load_status:'Loading'
	},
	bay_tanker:{
		tnkr_code:'TST00n',
		tnkr_name: "??A1234n",
		tnkr_owner_code:'ABCD1234',
		tnkr_owner:'abcd1234',
		tnkr_carrier_code:'ABCD1234',
		tnkr_carrier:'abcd1234',
		tnkr_cmpts: [
			{
				cmpt_no:1,
				arm_number:1,
				prod_code:'GAS001',
				prod_name:'ULP 98',
				prod_cmpycode:'ABCD1234',
				prod_cmpyname:'abcd1234',
				prod_color:0x00FF00,
				qty_preset:10000,
				qty_obs:7000
			}, 
			{
				cmpt_no:2,
				arm_number:2,
				prod_code:'ADO001',
				prod_name:'ADO',
				prod_cmpycode:'ABCD1234',
				prod_cmpyname:'abcd1234',
				prod_color:0x0000FF,
				qty_preset:12000,
				qty_obs:8000
			}, 
			{
				cmpt_no:3,
				arm_number:3,
				prod_code:'ADO001',
				prod_name:'ADO',
				prod_cmpycode:'ABCD1234',
				prod_cmpyname:'abcd1234',
				prod_color:0x0000FF,
				qty_preset:15000,
				qty_obs:10000
			}, 
			{
				cmpt_no:4,
				arm_number:4,
				prod_code:'GAS001',
				prod_name:'ULP 98',
				prod_cmpycode:'ABCD1234',
				prod_cmpyname:'abcd1234',
				prod_color:0x00FF00,
				qty_preset:9000,
				qty_obs:7500
			}, 
		]
	}
	*/
	public function lookupLoadingBayItemList_RT($bay_code="-1", $caseType='L', $jsonFlag=1)
	{
		// get data from scada server
		// Note: $_SESSION['scadaData'] is an Array of Objects, $bay_data is an Object
		$this->retrieveScadaData($bay_code);
		/*
		if ( array_key_exists('scadaData', $_SESSION) === FALSE 
		|| count($_SESSION['scadaData'])== 0 
		|| $this->bayviewServers[$bay_code]['active'] === FALSE
//		|| ($bay_code!='-1' && array_key_exists($bay_code, $_SESSION['scadaData']) === FALSE)
		)
		{
			return $this->lookupLoadingBayItemList($bay_code, $caseType, $jsonFlag);
		}
		*/
		$scada_data = $_SESSION['scadaData'];
		$bay_data = $scada_data[$bay_code];
		/*
		return array(
		'bay_data levels'
		, 'bay_data:'.gettype($bay_data)
		, 'bay_data->bay_interlocks:'.gettype($bay_data->bay_interlocks)
		, 'bay_data->bay_arms:'.gettype($bay_data->bay_arms)
		, 'bay_data->bay_arms[0]:'.gettype($bay_data->bay_arms[0])
		, 'bay_data->bay_load:'.gettype($bay_data->bay_load)
		, 'bay_data->bay_load[0]:'.gettype($bay_data->bay_load[0])
		, 'bay_data->bay_tanker:'.gettype($bay_data->bay_tanker)
		, 'bay_data->bay_tanker[0]:'.gettype($bay_data->bay_tanker[0])
		, 'bay_data->bay_tanker[0]->tnkr_cmpts:'.gettype($bay_data->bay_tanker[0]->tnkr_cmpts)
		, 'bay_data->bay_tanker[0]->tnkr_cmpts[0]:'.gettype($bay_data->bay_tanker[0]->tnkr_cmpts[0])
		);
		*/
		//return $bay_data;
		if ( array_key_exists('bayItemsRT', $_SESSION) === FALSE )
		//if ( !isset($_SESSION['bayItemsRT']) )
		{
			$_SESSION['bayItemsRT'] = array();
		}
		else
		{
			if ( gettype($_SESSION['bayItemsRT']) != 'array' )
			{
				$_SESSION['bayItemsRT'] = array();
			}
		}
		$_SESSION['bayItemsRT'][$bay_code] = $_SESSION['bayItems'][$bay_code];
		$bay_item = "";
		foreach( $_SESSION['bayItemsRT'] as $key=>$line )
		{
			if ( $key == $bay_code )
			{
				$bay_item = $line;
			}
		}
		//return $bay_item;
		/*
		return array(
		'bay_item levels'
		, 'bay_item:'.gettype($bay_item)
		, 'bay_item[bay_interlocks]:'.gettype($bay_item['bay_interlocks'])
		, 'bay_item[bay_arms]:'.gettype($bay_item['bay_arms'])
		, 'bay_item[bay_arms][0]:'.gettype($bay_item['bay_arms'][0])
		, 'bay_item[bay_load]:'.gettype($bay_item['bay_load'])
		, 'bay_item[bay_load][0]:'.gettype($bay_item['bay_load'][0])
		, 'bay_item[bay_tanker]:'.gettype($bay_item['bay_tanker'])
		, 'bay_item[bay_tanker][0]:'.gettype($bay_item['bay_tanker'][0])
		, 'bay_item[bay_tanker][0][tnkr_cmpts]:'.gettype($bay_item['bay_tanker'][0]['tnkr_cmpts'])
		, 'bay_item[bay_tanker][0][tnkr_cmpts][0]:'.gettype($bay_item['bay_tanker'][0]['tnkr_cmpts'][0])
		);
		*/
		//return json_encode(array('A'.is_object($bay_item).'A', 'B'.is_array($bay_item).'B',  'C'.is_object($bay_data).'C', 'D'.is_array($bay_data).'D'));
		
		// bay_item: Array, bay_data: Object
		/*
		[1] bay_item:								array 	[1] bay_data:									object 
		[2] bay_item[bay_interlocks]:				array   [2] bay_data->bay_interlocks:					object 
		[3] bay_item[bay_arms]:						array   [3] bay_data->bay_arms:							array 
		[4] bay_item[bay_arms][0]:					array   [4] bay_data->bay_arms[0]:						object 
		[5] bay_item[bay_load]:						array   [5] bay_data->bay_load:							array 
		[6] bay_item[bay_load][0]:					array   [6] bay_data->bay_load[0]:						object 
		[7] bay_item[bay_tanker]:					array   [7] bay_data->bay_tanker:						array 
		[8] bay_item[bay_tanker][0]:				array   [8] bay_data->bay_tanker[0]:					object 
		[9] bay_item[bay_tanker][0][tnkr_cmpts]:	array   [9] bay_data->bay_tanker[0]->tnkr_cmpts:		array 
		[10]bay_item[bay_tanker][0][tnkr_cmpts][0]:	array   [10] bay_data->bay_tanker[0]->tnkr_cmpts[0]:	object
		*/
		if ( $bay_item !="" 
		//&& ($bay_data->bay_load_id!=0 && $bay_data->bay_load_id!=null && $bay_data->bay_load_id!="") 
		//&& ($bay_data->bay_tnkr_code!=null && $bay_data->bay_tnkr_code!="")
		)
		//if ( is_object($bay_item) || is_array($bay_item) )
		{
			// get data from database
			$db_bays = $this->lookupAdhocBayList($bay_code);
			$db_arms = $this->lookupAdhocArmList($bay_code);
			//$db_trip = $this->lookupAdhocTripTanker($bay_data->bay_load_id, $bay_data->bay_tnkr_code);
			//$db_tanker = $this->lookupAdhocTanker($bay_data->bay_tnkr_code);
			$db_products = $this->lookupAdhocDrawerProducts();
/*
			$oo_supp = trim($bay_data->bay_load[0]->load_cmpycode);
			$oo_order = $bay_data->bay_load[0]->load_number;
			$oo_driver = trim($bay_data->bay_load[0]->load_opercode);
			$oo_tanker = trim($bay_data->bay_load[0]->load_tanker);
			$oo_trip = $this->getTripNumberFromOrder($oo_order, $oo_tanker, $oo_driver, $oo_supp );
			if ($oo_trip != -1)
			{
				$bay_data->bay_load_id = $oo_trip;
				$bay_data->bay_load[0]->load_number = $oo_trip;
				$bay_data->bay_tanker[0]->load_number = $oo_trip;
			}
*/
/*
			$ld_supp = trim($bay_data->bay_load[0]->load_cmpycode);
			$ld_num = $bay_data->bay_load[0]->load_number;
			$ld_driver = trim($bay_data->bay_load[0]->load_opercode);
			$ld_tanker = trim($bay_data->bay_load[0]->load_tanker);
			$ld_trip = $this->getTripNumberFromLoad($ld_num, $ld_tanker, $ld_driver, $ld_supp );
			if ($ld_trip != -1)
			{
				$bay_data->bay_load_id = $ld_trip;
				$bay_data->bay_load[0]->load_number = $ld_trip;
				$bay_data->bay_tanker[0]->load_number = $ld_trip;
			}
*/
			
			// add the object of bay_load
			$load_data = $this->lookupLoadingTrip($bay_data->bay_load_id, 'L', 0);
			// add the object of bay_tanker
			$tnkr_data = $this->lookupLoadingTanker($bay_data->bay_load_id, 'L', 0);
			if ( $this->DATA_ONLY == 1 )
			{
				$bay_item['bay_load'] = $load_data;
				$bay_item['bay_tanker'] = $tnkr_data;
			}
			else
			{
				$bay_item['bay_load'] = $load_data->data;
				$bay_item['bay_tanker'] = $tnkr_data->data;
			}
			
			// do data mappiong
			
			// bay details
			// [1] bay_item:								array 	
			// [1] bay_data:								object 
			$bay_item['bay_code'] = trim($bay_data->bay_code);
			$bay_item['bay_esd'] = !$bay_data->bay_esd;
			$bay_item['bay_load_id'] = $bay_data->bay_load_id;
			$bay_item['bay_load_trip'] = $load_data[0]['load_trip'];
			$bay_item['bay_load_order'] = $load_data[0]['load_order'];
			$bay_item['bay_tnkr_code'] = trim($bay_data->bay_tnkr_code);
			$bay_item['bay_lock'] = $db_bays[0]['bay_lock'];
			$bay_item['bay_status'] = $db_bays[0]['bay_status'];
			$bay_item['bay_tnkr_name'] = $load_data[0]['load_tnkr_name'];
			
			// bay interlocks
			// [2] bay_item[bay_interlocks]:				array   
			// [2] bay_data->bay_interlocks:				object 
			$bay_item['bay_interlocks']['site_esd'] = !$bay_data->bay_interlocks->site_esd;
			$bay_item['bay_interlocks']['bay_esd'] = !$bay_data->bay_interlocks->bay_esd;
			$bay_item['bay_interlocks']['bay_overfill'] = true;//$bay_data->bay_interlocks->bay_overfill;
			$bay_item['bay_interlocks']['bay_earth'] = $bay_data->bay_interlocks->bay_earth;
			$bay_item['bay_interlocks']['bay_vapour'] = $bay_data->bay_interlocks->bay_vapour;
			
			$bay_item['bay_interlocks']['bay_earth_overfill_unpark'] = $bay_data->bay_interlocks->bay_earth_overfill_unpark;
			$bay_item['bay_interlocks']['bay_earth_overfill_connect'] = $bay_data->bay_interlocks->bay_earth_overfill_connect;
			$bay_item['bay_interlocks']['bay_vapour_unpark'] = $bay_data->bay_interlocks->bay_vapour_unpark;
			$bay_item['bay_interlocks']['bay_vapour_connect'] = $bay_data->bay_interlocks->bay_vapour_connect;
			$bay_item['bay_interlocks']['bay_overfill_unpark'] = $bay_data->bay_interlocks->bay_overfill_unpark;
			$bay_item['bay_interlocks']['bay_overfill_connect'] = $bay_data->bay_interlocks->bay_overfill_connect;
			$bay_item['bay_interlocks']['bay_earth_unpark'] = $bay_data->bay_interlocks->bay_earth_unpark;
			$bay_item['bay_interlocks']['bay_earth_connect'] = $bay_data->bay_interlocks->bay_earth_connect;
			$bay_item['bay_interlocks']['bay_trans_switch'] = $bay_data->bay_interlocks->bay_trans_switch;
			$bay_item['bay_interlocks']['bay_drum_in_position'] = $bay_data->bay_interlocks->bay_drum_in_position;
			$bay_item['bay_interlocks']['bay_spear_down'] = $bay_data->bay_interlocks->bay_spear_down;
			$bay_item['bay_interlocks']['bay_no_type'] = $bay_data->bay_interlocks->bay_no_type;
			$bay_item['bay_interlocks']['bay_deadman'] = $bay_data->bay_interlocks->bay_deadman;
			$bay_item['bay_interlocks']['bay_issteady'] = $bay_data->bay_interlocks->bay_issteady;

			// bay arms
			// [3] bay_item[bay_arms]:						array   
			// [3] bay_data->bay_arms:						array 
			$cmpt2armnum = array();
			$cmpt2armcode = array();
			$cmpt2armamb = array(); 
			$cmpt2armstd = array(); 
			$cmpt2armmass = array(); 
			$cmpt2armpreset = array(); 
			$cmpt2armprod = array(); 
			foreach( $bay_item['bay_arms'] as $arm_key=>$arm_item )
			{
				// [4] bay_item[bay_arms][0]:					array		--- $arm_item
				// [4] bay_data->bay_arms[0]:					object		--- $arm_item_scada
				$id = $arm_item['arm_number'] - 1;
				$arm_item_scada = $bay_data->bay_arms[$id];
				
				$arm_item['arm_prodname'] = trim($arm_item_scada->arm_prodname);
				$arm_item['arm_status'] = $arm_item_scada->arm_unpark?'L':'A';
				if ( $arm_item['arm_parktype']==1 || $bay_item['bay_type_code'] == "UNLOAD" ) {
					$arm_item['arm_status'] = 'L';
				}
				$arm_item['arm_temperature'] = round($arm_item_scada->arm_temperature, 1);
				$arm_item['arm_compartment'] = $arm_item_scada->arm_compartment;
				$arm_item['arm_currentbay'] = $arm_item_scada->arm_currentbay;
				$arm_item['arm_mtr1totalizer'] = $arm_item_scada->arm_mtr1totalizer;
				$arm_item['arm_mtr2totalizer'] = $arm_item_scada->arm_mtr2totalizer;
				$arm_item['arm_qty_amb'] = round($arm_item_scada->arm_qty_amb);
				$arm_item['arm_qty_std'] = round($arm_item_scada->arm_qty_std);
				$arm_item['arm_qty_mass'] = round($arm_item_scada->arm_qty_mass);
				$arm_item['arm_qty_preset'] = round($arm_item_scada->arm_qty_preset);
				$arm_item['arm_lock'] = $db_arms[$id]['arm_lock'];
				
				// get the arm meter pump request
				$arm_item['arm_mtr1pumpreq'] = $arm_item_scada->arm_mtr1pumpreq;
				$arm_item['arm_mtr2pumpreq'] = $arm_item_scada->arm_mtr2pumpreq;
				$arm_item['arm_pumpreq'] = false;
				if ( $arm_item['arm_mtr1pumpreq'] == true || $arm_item['arm_mtr2pumpreq'] == true )
				{
					$arm_item['arm_pumpreq'] = true;
				}
				// get the arm flowrate
				$arm_item['arm_prd1flowrate'] = $arm_item_scada->arm_prd1flowrate;
				$arm_item['arm_prd2flowrate'] = $arm_item_scada->arm_prd2flowrate;
				$arm_item['arm_prd3flowrate'] = $arm_item_scada->arm_prd3flowrate;
				$arm_item['arm_prd4flowrate'] = $arm_item_scada->arm_prd4flowrate;
				$arm_item['arm_prd5flowrate'] = $arm_item_scada->arm_prd5flowrate;
				$arm_item['arm_prd6flowrate'] = $arm_item_scada->arm_prd6flowrate;
				$arm_item['arm_flowing'] = false;
				if ( $arm_item['arm_prd1flowrate'] > 0 
				  || $arm_item['arm_prd2flowrate'] > 0 
				  || $arm_item['arm_prd3flowrate'] > 0 
				  || $arm_item['arm_prd4flowrate'] > 0 
				  || $arm_item['arm_prd5flowrate'] > 0 
				  || $arm_item['arm_prd6flowrate'] > 0 
				)
				{
					$arm_item['arm_flowing'] = true;
				}
				
				$bay_item['bay_arms'][$arm_key] = $arm_item;
				
				if ( $arm_item['arm_compartment'] > 0 )
				{
					$cmpt2armnum[$arm_item['arm_compartment']] = $arm_item['arm_number'];
					$cmpt2armcode[$arm_item['arm_compartment']] = $arm_item['arm_code'];
					// cmpt qty fields are not populated, so we need to get them from arm qty fields
					$cmpt2armamb[$arm_item['arm_compartment']] = $arm_item['arm_qty_amb'];
					$cmpt2armstd[$arm_item['arm_compartment']] = $arm_item['arm_qty_std'];
					$cmpt2armmass[$arm_item['arm_compartment']] = $arm_item['arm_qty_mass'];
					$cmpt2armpreset[$arm_item['arm_compartment']] = $arm_item['arm_qty_preset'];
					$cmpt2armprod[$arm_item['arm_compartment']] = $arm_item['arm_prodname'];
				}
			}
			
			// bay load
			// [5] bay_item[bay_load]:						array   
			// [5] bay_data->bay_load:						array 
			// [6] bay_item[bay_load][0]:					array   
			// [6] bay_data->bay_load[0]:					object 
			$bay_item['bay_load'][0]['load_cmpycode'] = $bay_data->bay_load[0]->load_cmpycode;
			$bay_item['bay_load'][0]['load_cmpyname'] = $bay_data->bay_load[0]->load_cmpyname;
			$bay_item['bay_load'][0]['load_number'] = $bay_data->bay_load[0]->load_number;
			$bay_item['bay_load'][0]['load_trip'] = $load_data[0]['load_trip'];
			$bay_item['bay_load'][0]['load_order'] = $load_data[0]['load_order'];
			$bay_item['bay_load'][0]['load_opercode'] = $bay_data->bay_load[0]->load_opercode;
			$bay_item['bay_load'][0]['load_opername'] = $bay_data->bay_load[0]->load_opername;
			$bay_item['bay_load'][0]['load_tanker'] = $bay_data->bay_load[0]->load_tanker;
			//$bay_item['bay_load'][0]['load_tnkr_name'] = $db_trip[0]['tnkr_name'];
			//$bay_item['bay_load'][0]['load_status_id'] = $db_trip[0]['load_status_id'];
			//$bay_item['bay_load'][0]['load_status'] = $db_trip[0]['load_status'];
			//$cmpt_data = $this->lookupAdhocTripCompartments($bay_data->bay_load_id, $bay_data->bay_load[0]->load_cmpycode, 'L');
			
			//$bay_item['bay_load'][0]['load_status_id'] = 'L';
			
			// bay tanker
			// [7] bay_item[bay_tanker]:					array   
			// [7] bay_data->bay_tanker:					array 
			// [8] bay_item[bay_tanker][0]:					array   
			// [8] bay_data->bay_tanker[0]:					object 
			$bay_item['bay_tanker'][0]['load_cmpycode'] = $bay_data->bay_tanker[0]->load_cmpycode;
			$bay_item['bay_tanker'][0]['load_cmpyname'] = $bay_data->bay_tanker[0]->load_cmpyname;
			$bay_item['bay_tanker'][0]['load_number'] = $bay_data->bay_tanker[0]->load_number;
			$bay_item['bay_tanker'][0]['load_trip'] = $load_data[0]['load_trip'];
			$bay_item['bay_tanker'][0]['load_order'] = $load_data[0]['load_order'];
			$bay_item['bay_tanker'][0]['load_opercode'] = $bay_data->bay_tanker[0]->load_opercode;
			$bay_item['bay_tanker'][0]['load_opername'] = $bay_data->bay_tanker[0]->load_opername;
			$bay_item['bay_tanker'][0]['tnkr_code'] = $bay_data->bay_tanker[0]->tnkr_code;
			//$bay_item['bay_tanker'][0]['load_status_id'] = $db_trip[0]['load_status_id'];
			//$bay_item['bay_tanker'][0]['load_status'] = $db_trip[0]['load_status'];
			//$bay_item['bay_tanker'][0]['tnkr_name'] = $db_trip[0]['tnkr_name'];
			//$bay_item['bay_tanker'][0]['tnkr_owner_code'] = $db_trip[0]['tnkr_owner_code'];
			//$bay_item['bay_tanker'][0]['tnkr_owner'] = $db_trip[0]['tnkr_owner'];
			//$bay_item['bay_tanker'][0]['tnkr_carrier_code'] = $db_trip[0]['tnkr_carrier_code'];
			//$bay_item['bay_tanker'][0]['tnkr_carrier'] = $db_trip[0]['tnkr_carrier'];
			
			// bay tanker compartments
			// [9] bay_item[bay_tanker][0][tnkr_cmpts]:		array   
			// [9] bay_data->bay_tanker[0]->tnkr_cmpts:		array 
			foreach( $bay_item['bay_tanker'][0]['tnkr_cmpts'] as $cmpt_key=>$cmpt_item )
			{
				// [10]bay_item[bay_tanker][0][tnkr_cmpts][0]:		array		--- $cmpt_item
				// [10] bay_data->bay_tanker[0]->tnkr_cmpts[0]:		object		--- $cmpt_item_scada
				$id = $cmpt_item['cmpt_no'] - 1;
				$cmpt_item_scada = $bay_data->bay_tanker[0]->tnkr_cmpts[$id];
				//$db_cmpt_data = $cmpt_data[$id];
				
				$cmpt_item['arm_code'] = $cmpt2armcode[$cmpt_item['cmpt_no']];
				$cmpt_item['arm_number'] = $cmpt2armnum[$cmpt_item['cmpt_no']];
				//if ( strlen(trim($cmpt_item_scada->prod_code)) == 0 )
				if ( strlen(trim($cmpt_item_scada->prod_name)) == 0 )
				{
					//$cmpt_item_scada->prod_code = $cmpt2armprod[$cmpt_item['cmpt_no']];
					$cmpt_item_scada->prod_name = $cmpt2armprod[$cmpt_item['cmpt_no']];
				}
				$cmpt_item['prod_code'] = $cmpt_item_scada->prod_code;
				$cmpt_item['prod_name'] = $cmpt_item_scada->prod_name;
				
				$cmpt_item['qty_preset'] = round($cmpt_item_scada->qty_preset);
				$cmpt_item['qty_obs'] = round($cmpt_item_scada->qty_obs);
				$cmpt_item['cmpt_amb_schd'] = round($cmpt_item_scada->cmpt_amb_schd);
				$cmpt_item['cmpt_std_schd'] = round($cmpt_item_scada->cmpt_std_schd);
				$cmpt_item['cmpt_mass_schd'] = round($cmpt_item_scada->cmpt_mass_schd);
				$cmpt_item['cmpt_amb_load'] = round($cmpt_item_scada->cmpt_amb_load);
				$cmpt_item['cmpt_std_load'] = round($cmpt_item_scada->cmpt_std_load);
				$cmpt_item['cmpt_mass_load'] = round($cmpt_item_scada->cmpt_mass_load);
				$cmpt_item['cmpt_temperature'] = round($cmpt_item_scada->cmpt_temperature,1);
				$cmpt_item['cmpt_density'] = round($cmpt_item_scada->cmpt_density,2);
				
				//$cmpt_item['qty_in_cmpt'] = round($cmpt_item_scada->qty_in_cmpt);
				//$cmpt_item['amb_in_cmpt'] = round($cmpt_item_scada->amb_in_cmpt);
				//$cmpt_item['std_in_cmpt'] = round($cmpt_item_scada->std_in_cmpt);
				//$cmpt_item['mass_in_cmpt'] = round($cmpt_item_scada->mass_in_cmpt);
				//$cmpt_item['preset_in_cmpt'] = round($cmpt_item_scada->preset_in_cmpt);

				$cmpt_item['prod_unit'] = $this->bayviewServers[$bay_code]['bay_unit'];
				// cmpt qty fields are not populated, so we need to get them from arm qty fields
				//if ( (int)($cmpt2armpreset[$cmpt_item['cmpt_no']]) > 0 )
				{
					$cmpt_item['qty_preset'] = $cmpt2armpreset[$cmpt_item['cmpt_no']];
				}
				if ( $cmpt_item['qty_preset'] < $cmpt_item['preset_in_cmpt'] )
				{
					$cmpt_item['qty_preset'] = $cmpt_item['preset_in_cmpt'];
				}
				//$cmpt_item['qty_preset'] = 10000;
				/*
				$cmpt_item['cmpt_amb_load'] = $cmpt2armamb[$cmpt_item['cmpt_no']] + $db_cmpt_data['cmpt_amb_load'];
				$cmpt_item['cmpt_std_load'] = $cmpt2armstd[$cmpt_item['cmpt_no']] + $db_cmpt_data['cmpt_std_load'];
				$cmpt_item['cmpt_mass_load'] = $cmpt2armmass[$cmpt_item['cmpt_no']] + $db_cmpt_data['cmpt_mass_load'];
				*/
				/*
					"qty_in_cmpt": "6690",
					"amb_in_cmpt": "6690",
					"std_in_cmpt": "6641",
					"mass_in_cmpt": "4842",
				*/
				if ( $cmpt_item['prod_unit'] == 17 )
				{
					//$cmpt_item['qty_preset'] = $cmpt_item['cmpt_mass_schd'];
					$cmpt_item['cmpt_mass_schd'] = $cmpt_item['qty_preset'];
					if ( $bay_item['bay_load'][0]['load_status_id'] == 'L' )
					{
						//$cmpt_item['qty_obs'] = $cmpt_item['cmpt_mass_load']+$cmpt2armmass[$cmpt_item['cmpt_no']];
						$cmpt_item['qty_obs'] = $cmpt_item['mass_in_cmpt']+$cmpt2armmass[$cmpt_item['cmpt_no']];
						$cmpt_item['cmpt_mass_load'] = $cmpt_item['qty_obs'];
					}
					else
					{
						//$cmpt_item['qty_obs'] = $cmpt_item['cmpt_mass_load'];
						$cmpt_item['qty_obs'] = $cmpt_item['mass_in_cmpt'];
						$cmpt_item['cmpt_mass_load'] = $cmpt_item['qty_obs'];
					}
				}
				else if ( $cmpt_item['prod_unit'] == 11 )
				{
					//$cmpt_item['qty_preset'] = $cmpt_item['cmpt_std_schd'];
					$cmpt_item['cmpt_std_schd'] = $cmpt_item['qty_preset'];
					if ( $bay_item['bay_load'][0]['load_status_id'] == 'L' )
					{
						//$cmpt_item['qty_obs'] = $cmpt_item['cmpt_std_load']+$cmpt2armstd[$cmpt_item['cmpt_no']];
						$cmpt_item['qty_obs'] = $cmpt_item['std_in_cmpt']+$cmpt2armstd[$cmpt_item['cmpt_no']];
						$cmpt_item['cmpt_std_load'] = $cmpt_item['qty_obs'];
					}
					else
					{
						//$cmpt_item['qty_obs'] = $cmpt_item['cmpt_std_load'];
						$cmpt_item['qty_obs'] = $cmpt_item['std_in_cmpt'];
						$cmpt_item['cmpt_std_load'] = $cmpt_item['qty_obs'];
					}
				}
				else
				{
					//$cmpt_item['qty_preset'] = $cmpt_item['cmpt_amb_schd'];
					$cmpt_item['cmpt_amb_schd'] = $cmpt_item['qty_preset'];
					if ( $bay_item['bay_load'][0]['load_status_id'] == 'L' )
					{
						//$cmpt_item['qty_obs'] = $cmpt_item['cmpt_amb_load']+$cmpt2armamb[$cmpt_item['cmpt_no']];
						$cmpt_item['qty_obs'] = $cmpt_item['amb_in_cmpt']+$cmpt2armamb[$cmpt_item['cmpt_no']];
						$cmpt_item['cmpt_amb_load'] = $cmpt_item['qty_obs'];
					}
					else
					{
						//$cmpt_item['qty_obs'] = $cmpt_item['cmpt_amb_load'];
						$cmpt_item['qty_obs'] = $cmpt_item['amb_in_cmpt'];
						$cmpt_item['cmpt_amb_load'] = $cmpt_item['qty_obs'];
					}
				}
				
				$cmpt_item['cmpt_supplier'] = $load_data[0]['load_cmpycode'];
				$cmpt_item['cmpt_tripno'] = $load_data[0]['load_number'];
				$cmpt_item['cmpt_orderno'] = $load_data[0]['load_order'];
				$cmpt_item['cmpt_baytype'] = $bay_item['bay_type_code'];
				
				/*
				if ( strlen($cmpt_item['prod_color']) == 0 )
				//if ( $cmpt_item['prod_color'] == null )
				{
					$temp_prod=$this->lookupAdhocDrawerProducts(trim($cmpt_item['prod_code']), trim($load_data[0]['load_cmpycode']));
					$cmpt_item['prod_color'] = $temp_prod[0]['prod_bgcolor'];
				}
				*/
				$cmpt_item['prod_color'] = "#666666";
				foreach( $db_products as $prod_key=>$prod_item )
				{
					if ( $prod_item['prod_cmpycode'] == trim($bay_data->bay_tanker[0]->load_cmpycode)
//					&& $prod_item['prod_code'] == trim($cmpt_item_scada->prod_code) )
					&& $prod_item['prod_name'] == trim($cmpt_item_scada->prod_name) )
					{
						$cmpt_item['prod_cmpycode'] = $prod_item['prod_cmpycode'];
						$cmpt_item['prod_cmpyname'] = $prod_item['prod_cmpyname'];
						$cmpt_item['prod_color'] = $prod_item['prod_color'];
						$cmpt_item['prod_txt_color'] = $prod_item['prod_txt_color'];
						break;
					}
				}
				
				$bay_item['bay_tanker'][0]['tnkr_cmpts'][$cmpt_key] = $cmpt_item;
			}
			
			
			// refresh bay item in session
			$_SESSION['bayItemsRT'][$bay_code] = $bay_item;
		}
		
		if ( $jsonFlag == 1 )
		{
			$data = json_encode(array($_SESSION['bayItemsRT'][$bay_code]));
			if ( $data === FALSE )
			{
				$data->json_on=0;
				$data = array($_SESSION['bayItemsRT'][$bay_code]);
			}
		}
		else
		{
			$data = array($_SESSION['bayItemsRT'][$bay_code]);
		}
		
		return($data);
    } 
	
	public function lookupLoadingBayInterlocks_RT($bay_code)
	{
		// get data from scada server
		$this->retrieveScadaData($bay_code);
		/*
		if ( array_key_exists('scadaData', $_SESSION) === FALSE 
		|| count($_SESSION['scadaData'])== 0 )
		//|| $this->bayviewServers[$bay_code]['active'] === FALSE
		{
			return $this->lookupLoadingBayInterlocks($bay_code);
		}
		*/
		$scada_data = $_SESSION['scadaData'];
		$interlocks = array();
		$interlocks['site_esd'] 	= true;
		$interlocks['bay_esd'] 		= true;
		$interlocks['bay_overfill']	= false;
		$interlocks['bay_earth'] 	= false;
		$interlocks['bay_vapour'] 	= false;
		
		$interlocks['bay_earth_overfill_unpark'] = false;
		$interlocks['bay_earth_overfill_connect'] = false;
		$interlocks['bay_vapour_unpark'] = false;
		$interlocks['bay_vapour_connect'] = false;
		$interlocks['bay_overfill_unpark'] = false;
		$interlocks['bay_overfill_connect'] = false;
		$interlocks['bay_earth_unpark'] = false;
		$interlocks['bay_earth_connect'] = false;
		
		$interlocks['bay_trans_switch'] = false;
		$interlocks['bay_drum_in_position'] = false;
		$interlocks['bay_spear_down'] = false;
		$interlocks['bay_no_type'] = false;
		$interlocks['bay_deadman'] = false;
		$interlocks['bay_issteady'] = false;
		
		if ( $bay_code != '-1' )
		{
			if ( isset($scada_data[$bay_code]) )
			{
				$bay_data = $scada_data[$bay_code];
				$bay_interlocks = $bay_data->bay_interlocks;
				// bay_interlocks: {site_esd:true, bay_esd:false, bay_overfill:true, bay_earth:true, bay_vapour:true} 
				$interlocks['site_esd'] 	= !$bay_interlocks->site_esd;
				$interlocks['bay_esd'] 		= !$bay_interlocks->bay_esd;
				$interlocks['bay_overfill']	= $bay_interlocks->bay_overfill;
				$interlocks['bay_earth'] 	= $bay_interlocks->bay_earth;
				$interlocks['bay_vapour'] 	= $bay_interlocks->bay_vapour;
				
				$interlocks['bay_earth_overfill_unpark'] = $bay_interlocks->bay_earth_overfill_unpark;
				$interlocks['bay_earth_overfill_connect'] = $bay_interlocks->bay_earth_overfill_connect;
				$interlocks['bay_vapour_unpark'] = $bay_interlocks->bay_vapour_unpark;
				$interlocks['bay_vapour_connect'] = $bay_interlocks->bay_vapour_connect;
				$interlocks['bay_overfill_unpark'] = $bay_interlocks->bay_overfill_unpark;
				$interlocks['bay_overfill_connect'] = $bay_interlocks->bay_overfill_connect;
				$interlocks['bay_earth_unpark'] = $bay_interlocks->bay_earth_unpark;
				$interlocks['bay_earth_connect'] = $bay_interlocks->bay_earth_connect;
				$interlocks['bay_trans_switch'] = $bay_interlocks->bay_trans_switch;
				$interlocks['bay_drum_in_position'] = $bay_interlocks->bay_drum_in_position;
				$interlocks['bay_spear_down'] = $bay_interlocks->bay_spear_down;
				$interlocks['bay_no_type'] = $bay_interlocks->bay_no_type;
				$interlocks['bay_deadman'] = $bay_interlocks->bay_deadman;
				$interlocks['bay_issteady'] = $bay_interlocks->bay_issteady;
			}
		}
		
		return $interlocks;
	}
	
	public function lookupAdhocBayList($bay_code="-1", $caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				ba.BA_CODE			as BAY_CODE
				, ba.BA_LOCK		as BAY_LOCK
				, ba.STATS			as BAY_STATUS
				, ba.BA_SEQ			as BAY_SEQ
				, ba.BA_AREA		as BAY_AREA
				, ba.BA_PHYSTYPE	as BAY_TYPE
			from 
				BAY_AREA		ba
			where 
				1=1
				and ('-1'=:bay_code or ba.BA_CODE=:bay_code)
			";
		$sql['sql_data'] = array($bay_code);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);

		return($data->data);
    } 
	
	public function lookupAdhocArmList($bay_code="-1", $caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				ba.BAA_CODE				as ARM_CODE
				, ba.ARM_NAME			as ARM_NAME
				, ba.BAA_BAY_SEQ		as ARM_NUMBER
				, ba.BAA_LOCK			as ARM_LOCK
				, ba.BAA_TYPE			as ARM_TYPE
				, ba.BAA_BLENDTYPE		as ARM_BLENDTYPE
				, NVL(ba.BAA_ACTIVE, 'A')			as ARM_STATUS
				, ba.BAA_PARKTYPE		as ARM_PARKTYPE
-- 				, ba.STATS				as ARM_STATUS
				, ba.BAA_BAD_LNK			as BAY_CODE
			from 
				BA_ARMS			ba
			where 
				1=1
				and ('-1'=:bay_code or ba.BAA_BAD_LNK=:bay_code)
			order by ba.BAA_BAD_LNK, ba.BAA_BAY_SEQ
			";
		$sql['sql_data'] = array($bay_code);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		
		return($data->data);
    } 
	
	public function lookupAdhocTanker($tnkr_code, $caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				tnkr.TNKR_CODE 						as TNKR_CODE
				, tnkr.TNKR_NAME 					as TNKR_NAME
				, tnkr.TNKR_CARRIER 				as TNKR_CARRIER_CODE
				, carr.CMPY_NAME 					as TNKR_CARRIER
				, tnkr.TNKR_OWNER 					as TNKR_OWNER_CODE
				, mngr.CMPY_NAME 					as TNKR_OWNER
				, tnkr.TNKR_ETP 					as TNKR_ETP
				, NVL(tnkr.TNKR_LOCK, 'N') 			as TNKR_LOCK
				, NVL(tnkr.TNKR_ACTIVE, 'N') 		as TNKR_ACTIVE
				, NVL(tnkr.TNKR_BAY_LOOP_CH, 'N') 	as TNKR_BAY_LOOP_CH
				, NVL(tnkr.TNKR_ARCHIVE, 'N') 		as TNKR_ARCHIVE
				, tnkr.STATS 						as TNKR_STATS
			from
				TANKERS tnkr
				, COMPANYS carr
				, COMPANYS mngr
			where
				1=1
				and tnkr.TNKR_CODE=:tnkr_code
				and tnkr.TNKR_CARRIER = carr.CMPY_CODE(+)
				and tnkr.TNKR_OWNER = mngr.CMPY_CODE(+)
			";
		$sql['sql_data'] = array($tnkr_code);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		
		return($data->data);
    } 
	
	public function lookupAdhocTripTanker($trip_no, $tnkr_code, $caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
				select 
					sc.CMPY_CODE 												as LOAD_CMPYCODE 
					, sc.CMPY_NAME												as LOAD_CMPYNAME
					, sh.SHLS_TRIP_NO											as LOAD_NUMBER
					, sh.SHLS_TRIP_NO											as LOAD_TRIP
-- 					, os.OS_ORDER_NO											as LOAD_ORDER
 					, co.ORDER_CUST_ORDNO										as LOAD_ORDER
					, sh.SHLS_DRIVER											as LOAD_OPERCODE
					, dr.PER_NAME												as LOAD_OPERNAME
					, NVL(sh.STATS, 'F') 										as LOAD_STATUS_ID
					, decode(st.STATUS_TEXT, NULL, 'UNKNOWN', st.STATUS_TEXT)	as LOAD_STATUS
					, tk.TNKR_CODE 												as TNKR_CODE
					, tk.TNKR_NAME 												as TNKR_NAME
					, tk.TNKR_OWNER												as TNKR_OWNER_CODE
					, oc.CMPY_NAME												as TNKR_OWNER
					, tk.TNKR_CARRIER											as TNKR_CARRIER_CODE
					, cc.CMPY_NAME												as TNKR_CARRIER
				from 
					SCHEDULE 							sh
					, ORD_SCHEDULE						os
					, CUST_ORDER						co
					, COMPANYS 							sc
					, PERSONNEL 						dr
					, TANKERS 							tk
					, SCHEDULE_STATUS_SHORT_LOOKUP 		st
					, COMPANYS 							oc
					, COMPANYS 							cc
				where  
					sh.SHLS_TRIP_NO = :trip_no
					and sh.SHL_TANKER = :trip_tanker
					and sh.SHL_TANKER = tk.TNKR_CODE
					and sh.SHLS_SUPP = sc.CMPY_CODE
					and sh.SHLS_TRIP_NO=os.OS_SHL_SHLSTRIP(+)
					and sh.SHLS_SUPP=os.OS_SHL_SHLSSUPP(+)
					and os.OS_ORDER_NO=co.ORDER_NO(+)
 				and (sh.SHLS_SUPP not in (select CONFIG_VALUE from COMPANY_CONFIG where CONFIG_KEY='CMPY_2ND_DRAWER' and CONFIG_VALUE is not NULL))
					and tk.TNKR_OWNER = oc.CMPY_CODE
					and tk.TNKR_CARRIER = cc.CMPY_CODE
					and sh.SHLS_DRIVER = dr.PER_CODE(+)
					and NVL(sh.STATS, 'F') = st.STATUS_CODE(+)
					and ( (SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'N'
						and sc.CMPY_CODE = SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE'))
						or SYS_CONTEXT ('CONN_CONTEXT', 'CMPYCODE') IS NULL
						or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') = 'Y'
						or SYS_CONTEXT ('CONN_CONTEXT', 'ISMANAGER') IS NULL)
			";
		$sql['sql_data'] = array($trip_no, $tnkr_code);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		
		return($data->data);
    } 
	
	public function lookupAdhocTripCompartments($trip_no, $supp_code, $caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
            SELECT
                SPEC_PROD.COMPARTMENT		as CMPT_NO
				, SPEC_PROD.PROD_CODE		as PROD_CODE
				, SPEC_PROD.PROD_NAME		as PROD_NAME
				, SPEC_PROD.PROD_CMPY		as PROD_CMPY_CODE
				, SPEC_PROD.UNIT_CODE		as PROD_UNIT
				, SPEC_PROD.UNIT_NAME		as PROD_UNIT_DESC
				, SPEC_PROD.QTY_PRESCHD		as QTY_PRESCHD
				, SPEC_PROD.QTY_PRESET		as QTY_PRESET
				, SPEC_PROD.QTY_PRELOAD		as QTY_PRELOAD
				, DECODE(SPEC_PROD.UNIT_CODE, 5, TRSF.TRIP_QTY_AMB, 11, TRSF.TRIP_QTY_STD, 17, TRSF.TRIP_QTY_KG, TRSF.TRIP_QTY_DELIVERED) AS QTY_LOADED
                , TRSF.TRIP_QTY_AMB 		as CMPT_AMB_LOAD
                , TRSF.TRIP_QTY_STD 		as CMPT_STD_LOAD
                , TRSF.TRIP_QTY_KG 			as CMPT_MASS_LOAD
				, SPEC_PROD.SCHDSPEC_SHLSTRIP	as SHLS_TRIP_NO
				, SPEC_PROD.SCHDSPEC_SHLSSUPP	as SHLS_SUPP_CODE
            FROM
                (
                SELECT SPEC.SCHD_COMP_ID AS COMPARTMENT
                    , PR.PROD_CODE AS PROD_CODE
                    , PR.PROD_NAME AS PROD_NAME
                    , PR.PROD_CMPY AS PROD_CMPY
                    , SPEC.SCHD_UNITS AS UNIT_CODE
                    , UV.DESCRIPTION AS UNIT_NAME
                    , SPEC.SCHD_SPECQTY AS QTY_PRESCHD
                    , SPEC.SCHD_PRESETQTY AS QTY_PRESET
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
		$sql['sql_data'] = array($trip_no, $supp_code);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		
		return($data->data);
    } 
	
	public function lookupAdhocTripProducts($trip_no, $supp_code, $caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
            SELECT 
                SPEC_PR.PROD_CODE			as PROD_CODE
                , SPEC_PR.PROD_NAME			as PROD_NAME
                , SPEC_PR.PROD_CMPY			as PROD_CMPY_CODE
                , SPEC_PR.UNIT_CODE			as PROD_UNIT
                , UV.DESCRIPTION			as PROD_UNIT_DESC
                , SPEC_PR.QTY_SCHEDULED		as QTY_PRESET
                , CMPT.TRIP_QTY_PRELOAD		as QTY_PRELOAD 
                , DECODE(SPEC_PR.SCHP_UNITS, 5, TRSF.TRIP_QTY_AMB, 11, TRSF.TRIP_QTY_STD, 17, TRSF.TRIP_QTY_KG, TRSF.TRIP_QTY_DELIVERED) AS QTY_LOADED
                , TRSF.TRIP_QTY_AMB 		as PROD_AMB_LOAD
                , TRSF.TRIP_QTY_STD 		as PROD_STD_LOAD
                , TRSF.TRIP_QTY_KG 			as PROD_MASS_LOAD
				, SPEC_PR.SCHPSPID_SHLSTRIP	as SHLS_TRIP_NO
				, SPEC_PR.SCHPSPID_SHLSSUPP	as SHLS_SUPP_CODE
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
		$sql['sql_data'] = array($trip_no, $supp_code);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		
		return($data->data);
    } 
	
	public function lookupAdhocProducts($prod_code='-1', $prod_cmpy='-1', $caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			select
				prod.PROD_CODE					as PROD_CODE
				, prod.PROD_NAME				as PROD_NAME
				, prod.PROD_CMPY				as PROD_CMPYCODE
				, dcmp.CMPY_NAME				as PROD_CMPYNAME
				, prod.PROD_CLASS				as PROD_CLASS
				, prod.PROD_TXT_COLOUR			as PROD_TXT_COLOR
				, prod.PROD_BACK_COLOUR			as PROD_COLOR
				, prod.PROD_RPT_UNIT			as PROD_UNIT
				, unit.DESCRIPTION				as PROD_UNIT_DESC
				, hzch.HZCF_ID					as PROD_HAZID
				, hzch.HZCF_NAME				as PROD_HAZNAME
				, hzch.HZCF_CLASS				as PROD_HAZCLASS
				, hzch.HZCF_HZ_CODE				as PROD_HAZCODE
				, hzch.HZCF_SUB_RISK			as PROD_HAZRISK
				, hzch.HZCF_EMRG				as PROD_HAZEMRG
				, hzch.HZCF_PACK_GROUP			as PROD_HAZPACKGRP
				, hzch.HZCF_PACK_METHOD			as PROD_HAZPACKMTHD
			from
				PRODUCTS						prod
				, COMPANYS						dcmp
				, UNIT_SCALE_VW					unit
				, HZ_LINK						hzlk
				, HAZCHEM						hzch
			where
				1=1
				and ('-1'=:prod_code or prod.PROD_CODE=:prod_code)
				and ('-1'=:prod_cmpy or prod.PROD_CMPY=:prod_cmpy)
				and prod.PROD_CMPY = dcmp.CMPY_CODE
				and prod.PROD_RPT_UNIT = unit.UNIT_ID(+)
				and prod.PROD_CMPY = hzlk.HZLNK_SP_PRODCMPY(+)
				and prod.PROD_CODE = hzlk.HZLNK_SP_PRODCODE(+)
				and hzlk.HZ_LINK_ID = hzch.HZCF_ID(+)
			";
		$sql['sql_data'] = array($prod_code, $prod_cmpy);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		
		return($data->data);
    } 
	
	public function lookupAdhocDrawerProducts($prod_code='-1', $prod_cmpy='-1', $caseType='L')
	{
		$sql = array();
        $sql['sql_text'] = "
			select
				prod.PROD_CODE					as PROD_CODE
				, prod.PROD_NAME				as PROD_NAME
				, prod.PROD_CMPY				as PROD_CMPYCODE
				, dcmp.CMPY_NAME				as PROD_CMPYNAME
				, prod.PROD_CLASS				as PROD_CLASS
				, prod.PROD_TXT_COLOUR			as PROD_TXT_COLOR
				, prod.PROD_BACK_COLOUR			as PROD_COLOR
			from
				PRODUCTS						prod
				, COMPANYS						dcmp
			where
				1=1
				and ('-1'=:prod_code or prod.PROD_CODE=:prod_code)
				and ('-1'=:prod_cmpy or prod.PROD_CMPY=:prod_cmpy)
				and prod.PROD_CMPY = dcmp.CMPY_CODE
			";
		$sql['sql_data'] = array($prod_code, $prod_cmpy);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		
		return($data->data);
    } 
	
	public function getTripNumberFromOrder($order, $tanker,$driver, $supplier )
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				sc.SHLS_SUPP
				, sc.SHLS_TRIP_NO	as LOAD_NUMBER
			from 
				SCHEDULE 		sc
				, ORD_SCHEDULE	os
				, CUST_ORDER	co
			where 
				sc.SHLS_SUPP = os.OS_SHL_SHLSSUPP
				and sc.SHLS_TRIP_NO = os.OS_SHL_SHLSTRIP
				and os.OS_ORDER_NO = co.ORDER_NO
				and co.ORDER_CUST_ORDNO = :order_no
				and sc.SHL_TANKER = :tnkr_code
				and sc.SHLS_DRIVER = :driver_code
				and sc.SHLS_SUPP = :supp_code
			order by sc.SHLS_CALDATE DESC
		";
		$sql['sql_data'] = array($order, $tanker,$driver, $supplier);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		
		if ( count($data->data)>0 )
		{
			return($data->data[0]['load_number']);
		}
		else
		{
			return -1;
		}
    } 
	
	public function getTripNumberFromLoad($load_num, $tanker, $driver, $supplier )
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				s.SHLS_TRIP_NO				as LOAD_NUMBER
				, s.SHLS_TRIP_NO											as LOAD_TRIP
-- 				, os.OS_ORDER_NO											as LOAD_ORDER
 				, co.ORDER_CUST_ORDNO										as LOAD_ORDER
				, s.SHLS_SUPP				as LOAD_CMPYCODE
				, s.SHLS_DRAWER				as LOAD_DRAWER
				, l.LOAD_TANKER				as LOAD_TANKER
				, l.LOAD_CARRIER			as LOAD_CARRIER
				, l.LOAD_OPER				as LOAD_DRIVER
				, l.LD_TERMINAL				as LOAD_TERMINAL
				, l.LOAD_ID					as LOAD_ID
			from 
				LOADS l
				, SCHEDULE s
				, ORD_SCHEDULE						os
				, CUST_ORDER						co
			where 
				l.LOAD_NUMBER = :load_num
				and s.SHL_TANKER = :tnkr_code
				and s.SHLS_DRIVER = :driver_code
				and s.SHLS_SUPP = :supp_code
				and s.SHLSLOAD_LOAD_ID=l.LOAD_ID
				and s.SHLSLOAD_LD_TRM = l.LD_TERMINAL
					and s.SHLS_TRIP_NO=os.OS_SHL_SHLSTRIP(+)
					and s.SHLS_SUPP=os.OS_SHL_SHLSSUPP(+)
					and os.OS_ORDER_NO=co.ORDER_NO(+)
 				and (s.SHLS_SUPP not in (select CONFIG_VALUE from COMPANY_CONFIG where CONFIG_KEY='CMPY_2ND_DRAWER' and CONFIG_VALUE is not NULL))
				order by s.SHLS_CALDATE desc
		";
		$sql['sql_data'] = array($load_num, $tanker, $driver, $supplier);
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieveArray($sql, $caseType);
		
		if ( count($data->data)>0 )
		{
			return($data->data[0]['load_number']);
		}
		else
		{
			return -1;
		}
    } 


}
?>