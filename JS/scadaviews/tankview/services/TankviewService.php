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
	
	public function exportTankItems($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
	{
		$sql = array();
        $sql['sql_text'] = "
			select 
				TANK_SITENAME
				, SYSDATE			as TANK_EXPORT_DATE
				, TANK_CODE
				, TANK_NAME
				, TANK_BASE
				, TANK_BASE_NAME
				, TANK_DENSITY
				, TANK_DTOL_PERCENT
				, TANK_DTOL_VOLUME
				, TANK_MTOL_PERCENT				
				, TANK_MTOL_VOLUME
				, TANK_STATUS_NAME
				, TANK_PROD_LVL
				, TANK_AMB_VOL
				, TANK_TEMP
				, TANK_COR_VOL
				, TANK_LIQUID_KG
				, TANK_ULLAGE
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
				, (
					case 
						when (
							('-1'=:tank_group or TANK_GROUP=:tank_group)
							and ('-1'=:tank_code or TANK_CODE=:tank_code)
							and ('-1'=:tank_base or TANK_BASE=:tank_base)
						)
						then 1
						else 0
					end
				)			TANK_SELECTED
			from 
				GUI_TANKS
			where 
				1=1
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