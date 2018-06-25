<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../classes/Thunk.class.php');
require_once(dirname(__FILE__) . '/../classes/EquipmentTypes.class.php');
require_once(dirname(__FILE__) . '/../classes/EquipmentList.class.php');
require_once(dirname(__FILE__) . '/../classes/Journal.class.php');

/* define the module name for calling logMe() to output */
if(!defined('TANKERSCLASS')) define('TANKERSCLASS','Tankers.class');

class TankersClass{
    public function TankersClass()
    {
		session_start();
		
        if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
            $this->host ="localhost";
        }
        
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "load_scheds/tanker_list.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/load_scheds/tanker_list.cgi";
        }
    }
	
	public function getTankers($filter,$sort)
	{
        $mydb = DB::getInstance();
        if($sort!='')$sort="ORDER BY $sort";
		else $sort="ORDER BY TNKR_CODE";
		/*
		$sql="
			select
				TNKR_CODE
				, TNKR_NAME
				, TNKR_CARRIER
				, TNKR_CARRIER_NAME
				, TNKR_OWNER
				, TNKR_OWNER_NAME
				, TNKR_ETP
				, TNKR_EQPT_NAME
				, TNKR_BASE_SITE
				, TNKR_BASE_SITE_NAME
				, TNKR_DEST_DEPOT
				, TNKR_DEST_DEPOT_NAME
				, TNKR_LAST_DEPOT
				, TNKR_LAST_DEPOT_NAME
				, TNKR_CUR_DEPOT
				, TNKR_CUR_DEPOT_NAME
				, TNKR_PIN
				, TNKR_LOCK
				, TNKR_ACTIVE
				, TNKR_BAY_LOOP_CH
				, TNKR_ARCHIVE
				, TNKR_NTRIPS
				, TNKR_OWN_TXT
				, DECODE(TNKR_LIC_EXP, NULL, '', TO_CHAR(TNKR_LIC_EXP, 'YYYY-MM-DD')) as TNKR_LIC_EXP
				, DECODE(TNKR_DGLIC_EXP, NULL, '', TO_CHAR(TNKR_DGLIC_EXP, 'YYYY-MM-DD')) as TNKR_DGLIC_EXP
				, DECODE(TNKR_INS_EXP, NULL, '', TO_CHAR(TNKR_INS_EXP, 'YYYY-MM-DD')) as TNKR_INS_EXP
				, TNKR_STATS
				, TNKR_LAST_TRIP
				, TNKR_MAX_KG
				, RN
				, REMARKS
				, ETYP_CATEGORY
			from
				(
                SELECT res.*, ROW_NUMBER() over ($sort) RN
                FROM(SELECT * FROM GUI_TANKERS $filter) res
				)";
		*/
		$sql = array();
        $sql['sql_text'] = "
			select
				TNKR_CODE
				, TNKR_NAME
				, TNKR_CARRIER
				, TNKR_CARRIER_NAME
				, TNKR_OWNER
				, TNKR_OWNER_NAME
				, TNKR_ETP
				, TNKR_EQPT_NAME
				, TNKR_BASE_SITE
				, TNKR_BASE_SITE_NAME
				, TNKR_DEST_DEPOT
				, TNKR_DEST_DEPOT_NAME
				, TNKR_LAST_DEPOT
				, TNKR_LAST_DEPOT_NAME
				, TNKR_CUR_DEPOT
				, TNKR_CUR_DEPOT_NAME
				, TNKR_PIN
				, TNKR_LOCK
				, TNKR_ACTIVE
				, TNKR_BAY_LOOP_CH
				, TNKR_ARCHIVE
				, TNKR_NTRIPS
				, TNKR_OWN_TXT
				, DECODE(TNKR_LIC_EXP, NULL, '', TO_CHAR(TNKR_LIC_EXP, 'YYYY-MM-DD')) as TNKR_LIC_EXP
				, DECODE(TNKR_DGLIC_EXP, NULL, '', TO_CHAR(TNKR_DGLIC_EXP, 'YYYY-MM-DD')) as TNKR_DGLIC_EXP
				, DECODE(TNKR_INS_EXP, NULL, '', TO_CHAR(TNKR_INS_EXP, 'YYYY-MM-DD')) as TNKR_INS_EXP
				, TNKR_STATS
				, TNKR_LAST_TRIP
				, TNKR_MAX_KG
				, RN
				, REMARKS
				, ETYP_CATEGORY
			from
				(
                SELECT res.*, ROW_NUMBER() over ($sort) RN
                FROM(SELECT * FROM GUI_TANKERS  " . $filter['sql_text'] . ") res
				)";
		$sql['sql_data'] = $filter['sql_data'];
		
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => "GUI_Tankers")));        
	
	}
         
    public function getPaged($offset,$tot,$filter='',$sort='')
	{
        $mydb = DB::getInstance();
		
        if($sort!='')$sort="ORDER BY $sort";
		else $sort="ORDER BY TNKR_CODE";
		/*
		$sql="
			select
				TNKR_CODE
				, TNKR_NAME
				, TNKR_CARRIER
				, TNKR_CARRIER_NAME
				, TNKR_OWNER
				, TNKR_OWNER_NAME
				, TNKR_ETP
				, TNKR_EQPT_NAME
				, TNKR_BASE_SITE
				, TNKR_BASE_SITE_NAME
				, TNKR_DEST_DEPOT
				, TNKR_DEST_DEPOT_NAME
				, TNKR_LAST_DEPOT
				, TNKR_LAST_DEPOT_NAME
				, TNKR_CUR_DEPOT
				, TNKR_CUR_DEPOT_NAME
				, TNKR_PIN
				, TNKR_LOCK
				, TNKR_ACTIVE
				, TNKR_BAY_LOOP_CH
				, TNKR_ARCHIVE
				, TNKR_NTRIPS
				, TNKR_OWN_TXT
				, DECODE(TNKR_LIC_EXP, NULL, '', TO_CHAR(TNKR_LIC_EXP, 'YYYY-MM-DD')) as TNKR_LIC_EXP
				, DECODE(TNKR_DGLIC_EXP, NULL, '', TO_CHAR(TNKR_DGLIC_EXP, 'YYYY-MM-DD')) as TNKR_DGLIC_EXP
				, DECODE(TNKR_INS_EXP, NULL, '', TO_CHAR(TNKR_INS_EXP, 'YYYY-MM-DD')) as TNKR_INS_EXP
				, TNKR_STATS
				, TNKR_LAST_TRIP
				, TNKR_MAX_KG
				, RN
				, REMARKS
			from
				(
                SELECT res.*, ROW_NUMBER() over ($sort) RN
                FROM(SELECT * FROM GUI_TANKERS $filter) res
				)
			where RN between ".($offset+1)." and ".($offset+$tot); //." $sort";
		*/
		
		$sql = array();
        $sql['sql_text'] = "
			select
				TNKR_CODE
				, TNKR_NAME
				, TNKR_CARRIER
				, TNKR_CARRIER_NAME
				, TNKR_OWNER
				, TNKR_OWNER_NAME
				, TNKR_ETP
				, TNKR_EQPT_NAME
				, TNKR_BASE_SITE
				, TNKR_BASE_SITE_NAME
				, TNKR_DEST_DEPOT
				, TNKR_DEST_DEPOT_NAME
				, TNKR_LAST_DEPOT
				, TNKR_LAST_DEPOT_NAME
				, TNKR_CUR_DEPOT
				, TNKR_CUR_DEPOT_NAME
				, TNKR_PIN
				, TNKR_LOCK
				, TNKR_ACTIVE
				, TNKR_BAY_LOOP_CH
				, TNKR_ARCHIVE
				, TNKR_NTRIPS
				, TNKR_OWN_TXT
				, DECODE(TNKR_LIC_EXP, NULL, '', TO_CHAR(TNKR_LIC_EXP, 'YYYY-MM-DD')) as TNKR_LIC_EXP
				, DECODE(TNKR_DGLIC_EXP, NULL, '', TO_CHAR(TNKR_DGLIC_EXP, 'YYYY-MM-DD')) as TNKR_DGLIC_EXP
				, DECODE(TNKR_INS_EXP, NULL, '', TO_CHAR(TNKR_INS_EXP, 'YYYY-MM-DD')) as TNKR_INS_EXP
				, TNKR_STATS
				, TNKR_LAST_TRIP
				, TNKR_MAX_KG
				, RN
				, REMARKS
			from
				(
                SELECT res.*, ROW_NUMBER() over ($sort) RN
                FROM(SELECT * FROM GUI_TANKERS " . $filter['sql_text'] . ") res
				)
			where RN between ".($offset+1)." and ".($offset+$tot); //." $sort";
		$sql['sql_data'] = $filter['sql_data'];
		
        $rows = $mydb->query($sql);
		//error_log( "\n".$sql, 3, "temp.log");
		
        $arr = array();
        foreach($rows as $x){
            $comp = null;
            //$comp = $this->getTankerComposition( $x->TNKR_ETP, $x->TNKR_CODE, $x->TNKR_OWNER, 0 );
            $x->composition = $comp;
            $arr[] = $x;
        }
        
        //XarrayEncodingConversion($arr);
        return (prepareForAMF($arr, array(0 => "GUI_Tankers")));        
	}
    
    public function getTankerComposition($id, $tanker, $owner, $option ){
        $mydb = DB::getInstance();
		/*
        $sql="SELECT EQUIP_VW.* ,COMPTS.CMPT_UNITS, EQUIP_TYPES_VW.CMPTNU, ROW_NUMBER() over (order by EQUIP_VW.EQC_COUNT) IDX, EQUIP_TYPES.ETYP_SCHEDUL as SUB_ITEM_SCHED_TYPE,
                EQUIP_TYPES.ETYP_ISRIGID as SUB_ITEM_ETYP_ISRIGID, EQUIP_TYPES.ETYP_TITLE as EQC_SUB_ITEM_TITLE, EQUIP_TYPES.ETYP_CATEGORY
                FROM  EQUIP_TYPES_VW, EQUIP_VW, EQUIP_TYPES,

                (SELECT  * 
                FROM    (
                        SELECT  EQUIP_TYPES_VW.ETYP_ID, CMPT_UNITS, ROW_NUMBER() OVER (PARTITION BY EQUIP_TYPES_VW.ETYP_ID ORDER BY EQUIP_TYPES_VW.ETYP_ID) AS rn
                        FROM    EQUIP_TYPES_VW
                        LEFT OUTER JOIN CMPT_VW
                        ON   CMPT_VW.ETYP_ID_RT = EQUIP_TYPES_VW.ETYP_ID
                )
                WHERE rn = 1) COMPTS  WHERE EQUIP_TYPES_VW.ETYP_ID= EQUIP_VW.ETYP_ID_RT AND COMPTS. ETYP_ID=EQUIP_VW.ETYP_ID AND EQUIP_VW.EQC_SUB_ITEM=EQUIP_TYPES.ETYP_ID(+) AND EQUIP_VW.ETYP_ID_RT=$id ORDER BY EQUIP_VW.ETYP_ID_RT,EQUIP_VW.EQC_COUNT_RT, EQUIP_VW.LVL
                ";
		*/		
		$sql = array();
        $sql['sql_text'] = "SELECT EQUIP_VW.* ,COMPTS.CMPT_UNITS, EQUIP_TYPES_VW.CMPTNU, ROW_NUMBER() over (order by EQUIP_VW.EQC_COUNT) IDX, EQUIP_TYPES.ETYP_SCHEDUL as SUB_ITEM_SCHED_TYPE,
                EQUIP_TYPES.ETYP_ISRIGID as SUB_ITEM_ETYP_ISRIGID, EQUIP_TYPES.ETYP_TITLE as EQC_SUB_ITEM_TITLE, 
				NVL(EQUIP_TYPES.ETYP_CATEGORY, EQUIP_TYPES_VW.ETYP_CATEGORY) as ETYP_CATEGORY
                FROM  EQUIP_TYPES_VW, EQUIP_VW, EQUIP_TYPES,

                (SELECT  * 
                FROM    (
                        SELECT  EQUIP_TYPES_VW.ETYP_ID, CMPT_UNITS, ROW_NUMBER() OVER (PARTITION BY EQUIP_TYPES_VW.ETYP_ID ORDER BY EQUIP_TYPES_VW.ETYP_ID) AS rn
                        FROM    EQUIP_TYPES_VW
                        LEFT OUTER JOIN CMPT_VW
                        ON   CMPT_VW.ETYP_ID_RT = EQUIP_TYPES_VW.ETYP_ID
                )
                WHERE rn = 1) COMPTS  WHERE EQUIP_TYPES_VW.ETYP_ID= EQUIP_VW.ETYP_ID_RT AND COMPTS. ETYP_ID=EQUIP_VW.ETYP_ID AND EQUIP_VW.EQC_SUB_ITEM=EQUIP_TYPES.ETYP_ID(+) AND EQUIP_VW.ETYP_ID_RT=:id ORDER BY EQUIP_VW.ETYP_ID_RT,EQUIP_VW.EQC_COUNT_RT, EQUIP_VW.LVL
                ";
		$sql['sql_data'] = array( $id );
		
        $rows = $mydb->query($sql);
        
        $eqpType = new EquipmentTypesClass();
		//$owner = "-1";
        $arr = array();
        foreach($rows as $x){
            if($x->EQUIP_ISLEAF != 0){
                if($x->SUB_ITEM_SCHED_TYPE==null)
				{
                    $comp = $eqpType->getCompartmentsDetails($id);
					$eqpt_list = $this->getEquipmentsByTypeAndOwner($id, $owner, $option);
					$eqpt_selected = $this->getEquipmentsByTypeAndTanker($id, $owner, $tanker, $x->IDX, $option);
                }else
				{
                    if($x->EQC_SUB_ITEM!='') 
					{
						$comp = $eqpType->getCompartmentsDetails($x->EQC_SUB_ITEM);
						$eqpt_list = $this->getEquipmentsByTypeAndOwner($x->EQC_SUB_ITEM, $owner, $option);
						$eqpt_selected = $this->getEquipmentsByTypeAndTanker($x->EQC_SUB_ITEM, $owner, $tanker, $x->IDX, $option);
					}
                    else 
					{
						$comp='';
						$eqpt_list = '';
						$eqpt_selected = '';
					}
                }
                $x->compartments = $comp;
				$x->equip_list = $eqpt_list;
				$x->equipment = $eqpt_selected;
                $arr[]=$x;
            }
        }
		
		//XarrayEncodingConversion($arr);
        return (prepareForAMF($arr, array(0 => 'TankerComposition')));
        //return ($arr);
    }
    
    public function getEquipmentsByTypeAndOwner($id, $owner, $option)
	{
		$owner = "-1";
		/*
		$sql="
			SELECT EQPT_ID, EQPT_CODE, EQPT_TITLE, DECODE(EQPT_TITLE, NULL, EQPT_CODE, EQPT_CODE||'['||EQPT_TITLE||']') as EQPT_NAME, EQPT_OWNER, EQPT_OWNER_NAME, EQPT_ETP, EQPT_ETP_TITLE, EQPT_LOCK
			FROM GUI_EQUIPMENT_LIST 
			WHERE ( -1=$id or EQPT_ETP=$id ) and ( '-1'='".$owner."' or EQPT_OWNER='".$owner."') 
			ORDER BY EQPT_CODE 
			";
		*/
		$sql = array();
        $sql['sql_text'] = "
			SELECT EQPT_ID, EQPT_CODE, EQPT_TITLE, DECODE(EQPT_TITLE, NULL, EQPT_CODE, EQPT_CODE||'['||EQPT_TITLE||']') as EQPT_NAME, EQPT_OWNER, EQPT_OWNER_NAME, EQPT_ETP, EQPT_ETP_TITLE, EQPT_LOCK
			FROM GUI_EQUIPMENT_LIST 
			WHERE ( -1=:id or EQPT_ETP=:id ) and ( '-1'=:owner or EQPT_OWNER=:owner) 
			ORDER BY EQPT_CODE 
			";
		$sql['sql_data'] = array( $id, $owner );
		
        $eqpList = new EquipmentListClass();
		
		return ( $eqpList->getEquipmentsByFilter($sql, $option) );
    }
    
    public function getEquipmentsByTypeAndTanker($id, $owner, $tanker, $idx, $option)
	{
		$owner = "-1";
		/*
		$sql="
			select el.EQPT_ID, el.EQPT_CODE, el.EQPT_TITLE, DECODE(el.EQPT_TITLE, NULL, el.EQPT_CODE, el.EQPT_CODE||'['||el.EQPT_TITLE||']') as EQPT_NAME, el.EQPT_OWNER, el.EQPT_OWNER_NAME, el.EQPT_ETP, el.EQPT_ETP_TITLE, el.EQPT_LOCK
			from TNKR_EQUIP te, GUI_EQUIPMENT_LIST el 
			where
				( te.TC_TANKER='".$tanker."') 
				and te.TC_EQPT = el.EQPT_ID
				and te.TC_SEQNO = $idx
				and el.EQPT_ETP = $id			
				and ( '-1'='".$owner."' or el.EQPT_OWNER='".$owner."')
			ORDER BY EQPT_CODE 
			";
		*/
		$sql = array();
        $sql['sql_text'] = "
			select el.EQPT_ID, el.EQPT_CODE, el.EQPT_TITLE, DECODE(el.EQPT_TITLE, NULL, el.EQPT_CODE, el.EQPT_CODE||'['||el.EQPT_TITLE||']') as EQPT_NAME, el.EQPT_OWNER, el.EQPT_OWNER_NAME, el.EQPT_ETP, el.EQPT_ETP_TITLE, el.EQPT_LOCK
			from TNKR_EQUIP te, GUI_EQUIPMENT_LIST el 
			where
				( te.TC_TANKER=:tanker ) 
				and te.TC_EQPT = el.EQPT_ID
				and te.TC_SEQNO = :idx
				and el.EQPT_ETP = :id			
				and ( '-1'=:owner or el.EQPT_OWNER=:owner )
			ORDER BY EQPT_CODE 
			";
		$sql['sql_data'] = array( $tanker, $idx, $id, $owner );
		
        $eqpList = new EquipmentListClass();
		
		return ( $eqpList->getEquipmentsByFilter($sql, $option) );
    }

    public function lookup(){
        $mydb = DB::getInstance();
        $sql="SELECT TNKR_CODE, TNKR_EQPT_NAME, TNKR_CARRIER_NAME FROM GUI_TANKERS order by tnkr_code";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'TankersLookup')));
    }
    
    public function terminalLookup(){
        $mydb = DB::getInstance();
        $sql="SELECT TERM_CODE, TERM_NAME, TERM_CODE||' - '||TERM_NAME as TERM_DESC FROM TERMINAL order by term_code";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'TerminalLookup')));
    }
    
    public function lookupByCarrier($carrier){
        $mydb = DB::getInstance();
		/*
        $sql="
				SELECT gui_tnkr2.TNKR_CODE as TNKR_CODE, gui_tnkr2.TNKR_EQPT_NAME as TNKR_EQPT_NAME, gui_tnkr2.TNKR_CARRIER_NAME as TNKR_CARRIER_NAME 
				FROM 
					(
SELECT tnkr.TNKR_CODE             AS TNKR_CODE ,
    tnkr.TNKR_NAME                  AS TNKR_NAME ,
    tnkr.TNKR_CARRIER               AS TNKR_CARRIER ,
    carr.CMPY_NAME                  AS TNKR_CARRIER_NAME ,
    tnkr.TNKR_OWNER                 AS TNKR_OWNER ,
    mngr.CMPY_NAME                  AS TNKR_OWNER_NAME ,
    tnkr.TNKR_ETP                   AS TNKR_ETP ,
    etyp.ETYP_TITLE                 AS TNKR_EQPT_NAME ,
    tnkr.TNKR_BASE_SITE             AS TNKR_BASE_SITE ,
    base.TERM_NAME                  AS TNKR_BASE_SITE_NAME ,
    tnkr.TNKR_DEST_DEPOT            AS TNKR_DEST_DEPOT ,
    dest.TERM_NAME                  AS TNKR_DEST_DEPOT_NAME ,
    tnkr.TNKR_LAST_DEPOT            AS TNKR_LAST_DEPOT ,
    prev.TERM_NAME                  AS TNKR_LAST_DEPOT_NAME ,
    tnkr.TNKR_CUR_DEPOT             AS TNKR_CUR_DEPOT ,
    curr.TERM_NAME                  AS TNKR_CUR_DEPOT_NAME ,
    tnkr.TNKR_PIN                   AS TNKR_PIN ,
    NVL(tnkr.TNKR_LOCK, 'N')        AS TNKR_LOCK ,
    NVL(tnkr.TNKR_ACTIVE, 'N')      AS TNKR_ACTIVE ,
    NVL(tnkr.TNKR_BAY_LOOP_CH, 'N') AS TNKR_BAY_LOOP_CH ,
    NVL(tnkr.TNKR_ARCHIVE, 'N')     AS TNKR_ARCHIVE ,
    tnkr.TNKR_NTRIPS                AS TNKR_NTRIPS ,
    tnkr.TNKR_OWN_TXT               AS TNKR_OWN_TXT ,
    tnkr.TNKR_LIC_EXP               AS TNKR_LIC_EXP ,
    tnkr.TNKR_DGLIC_EXP             AS TNKR_DGLIC_EXP ,
    tnkr.TNKR_INS_EXP               AS TNKR_INS_EXP ,
    tnkr.STATS                      AS TNKR_STATS ,
    tnkr.LAST_TRIP                  AS TNKR_LAST_TRIP ,
    tnkr.TNKR_MAX_KG                AS TNKR_MAX_KG
  FROM TANKERS tnkr ,
    EQUIP_TYPES etyp ,
    COMPANYS carr ,
    COMPANYS mngr ,
    TERMINAL base ,
    TERMINAL dest ,
    TERMINAL prev ,
    TERMINAL curr
  WHERE tnkr.TNKR_ETP                                  = etyp.ETYP_ID(+)
  AND tnkr.TNKR_CARRIER                              = carr.CMPY_CODE(+)
  AND tnkr.TNKR_OWNER                                = mngr.CMPY_CODE(+)
  AND tnkr.TNKR_BASE_SITE                            = base.TERM_CODE(+)
  AND tnkr.TNKR_DEST_DEPOT                           = dest.TERM_CODE(+)
  AND tnkr.TNKR_LAST_DEPOT                           = prev.TERM_CODE(+)
  AND tnkr.TNKR_CUR_DEPOT                            = curr.TERM_CODE(+) 
					) gui_tnkr2 
				WHERE 
					gui_tnkr2.tnkr_carrier='$carrier' 
				order by gui_tnkr2.tnkr_code
			";     
		*/	
		$sql = array();
        $sql['sql_text'] = "
				SELECT gui_tnkr2.TNKR_CODE as TNKR_CODE, gui_tnkr2.TNKR_EQPT_NAME as TNKR_EQPT_NAME, gui_tnkr2.TNKR_CARRIER_NAME as TNKR_CARRIER_NAME 
				FROM 
					(
SELECT tnkr.TNKR_CODE             AS TNKR_CODE ,
    tnkr.TNKR_NAME                  AS TNKR_NAME ,
    tnkr.TNKR_CARRIER               AS TNKR_CARRIER ,
    carr.CMPY_NAME                  AS TNKR_CARRIER_NAME ,
    tnkr.TNKR_OWNER                 AS TNKR_OWNER ,
    mngr.CMPY_NAME                  AS TNKR_OWNER_NAME ,
    tnkr.TNKR_ETP                   AS TNKR_ETP ,
    etyp.ETYP_TITLE                 AS TNKR_EQPT_NAME ,
    tnkr.TNKR_BASE_SITE             AS TNKR_BASE_SITE ,
    base.TERM_NAME                  AS TNKR_BASE_SITE_NAME ,
    tnkr.TNKR_DEST_DEPOT            AS TNKR_DEST_DEPOT ,
    dest.TERM_NAME                  AS TNKR_DEST_DEPOT_NAME ,
    tnkr.TNKR_LAST_DEPOT            AS TNKR_LAST_DEPOT ,
    prev.TERM_NAME                  AS TNKR_LAST_DEPOT_NAME ,
    tnkr.TNKR_CUR_DEPOT             AS TNKR_CUR_DEPOT ,
    curr.TERM_NAME                  AS TNKR_CUR_DEPOT_NAME ,
    tnkr.TNKR_PIN                   AS TNKR_PIN ,
    NVL(tnkr.TNKR_LOCK, 'N')        AS TNKR_LOCK ,
    NVL(tnkr.TNKR_ACTIVE, 'N')      AS TNKR_ACTIVE ,
    NVL(tnkr.TNKR_BAY_LOOP_CH, 'N') AS TNKR_BAY_LOOP_CH ,
    NVL(tnkr.TNKR_ARCHIVE, 'N')     AS TNKR_ARCHIVE ,
    tnkr.TNKR_NTRIPS                AS TNKR_NTRIPS ,
    tnkr.TNKR_OWN_TXT               AS TNKR_OWN_TXT ,
    tnkr.TNKR_LIC_EXP               AS TNKR_LIC_EXP ,
    tnkr.TNKR_DGLIC_EXP             AS TNKR_DGLIC_EXP ,
    tnkr.TNKR_INS_EXP               AS TNKR_INS_EXP ,
    tnkr.STATS                      AS TNKR_STATS ,
    tnkr.LAST_TRIP                  AS TNKR_LAST_TRIP ,
    tnkr.TNKR_MAX_KG                AS TNKR_MAX_KG
  FROM TANKERS tnkr ,
    EQUIP_TYPES etyp ,
    COMPANYS carr ,
    COMPANYS mngr ,
    TERMINAL base ,
    TERMINAL dest ,
    TERMINAL prev ,
    TERMINAL curr
  WHERE tnkr.TNKR_ETP                                  = etyp.ETYP_ID(+)
  AND tnkr.TNKR_CARRIER                              = carr.CMPY_CODE(+)
  AND tnkr.TNKR_OWNER                                = mngr.CMPY_CODE(+)
  AND tnkr.TNKR_BASE_SITE                            = base.TERM_CODE(+)
  AND tnkr.TNKR_DEST_DEPOT                           = dest.TERM_CODE(+)
  AND tnkr.TNKR_LAST_DEPOT                           = prev.TERM_CODE(+)
  AND tnkr.TNKR_CUR_DEPOT                            = curr.TERM_CODE(+) 
					) gui_tnkr2 
				WHERE 
					gui_tnkr2.tnkr_carrier=:carrier 
				order by gui_tnkr2.tnkr_code
			";     
		$sql['sql_data'] = array( $carrier );
		
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'TankersLookup')));
    }
    
	/*
    public function getEquipmentShape($tnkr_code){
        $mydb = DB::getInstance();
        $sql="SELECT etyp_id FROM EQUIP_TYPES_VW WHERE etyp_title IN (
                SELECT tnkr_eqpt_name FROM GUI_TANKERS WHERE tnkr_code='$tnkr_code'
              )";
        $rows = $mydb->query($sql);
        $etyp_id = $rows[0]->ETYP_ID;
        
        $et = new EquipmentTypesClass();
        $composition = $et->getComposition($etyp_id);

        return $composition;
    }
	*/
    public function getEquipmentShape($tnkr_code){
        $mydb = DB::getInstance();
        //$sql="SELECT tnkr_etp, tnkr_owner FROM GUI_TANKERS WHERE tnkr_code='$tnkr_code'";
		
		$sql = array();
        $sql['sql_text'] = "SELECT tnkr_etp, tnkr_owner FROM GUI_TANKERS WHERE tnkr_code=:tnkr_code ";
		$sql['sql_data'] = array( $tnkr_code );
		
        $rows = $mydb->query($sql);
        $tnkr_etp = $rows[0]->TNKR_ETP;
        $tnkr_owner = $rows[0]->TNKR_OWNER;
        
		// get composition for an equipment type
        $et = new EquipmentTypesClass();
        $composition = $et->getComposition($tnkr_etp);
		// get composition for a tanker
		$tanker_comp = $this->getTankerComposition( $tnkr_etp, $tnkr_code, $tnkr_owner, 1 );

		// try to replace eqpt type safefill/capacity with eqpt list safefill/capacity
        foreach($composition as $x)
		{
			foreach($x->compartments as $y)
			{
				$y->cmpt_capacit = $this->getTankerCompartmentSafefill($x->idx, $x->etyp_id, 
				$y->cmpt_etyp, $y->cmpt_no, $y->cmpt_capacit, $tanker_comp);  // need adjust according to eqpt list
				//$y->cmpt_capacit = 32145;  // need adjust according to eqpt list
			}
        }
        return $composition;
    }
	
    public function getTankerCompartmentSafefill($idx, $etyp_id, $cmpt_etyp, $cmpt_no, $cmpt_capacit, $tanker_comp)
	{
		$safefill = $cmpt_capacit;
		
		foreach($tanker_comp as $tx)
		{
			if ( $tx->idx==$idx && $tx->etyp_id == $etyp_id )
			{
				foreach($tx->equipment as $ty)
				{
					if ($ty->eqpt_etp == $cmpt_etyp)
					{
						foreach($ty->compartments as $tz)
						{
							if ( $tz->etyp_id == $cmpt_etyp && $tz->cmpt_no == $cmpt_no && $tz->cmpt_capacit == $cmpt_capacit )
							{
								$safefill = $tz->adj_safefill;
								return $safefill;
							}
						}
					}
				}
			}
		}
				
		return $safefill;
	}

//multi trailer
//http://10.2.20.9/cgi-bin/en/load_scheds/tanker_list.cgi?tanker=ttttttt&carrier=zzzzzzzzz&eqpt_type=45&trips=0&lic_expr=2013-06-01&lock=on&delv_expr=2013-06-01&active=on&ins_expr=2013-06-01&last_depot=CGPER&dest_depot=CGPER&cur_depot=CGPER&depot=CGPER&cmpy=zzzzzzzzz&op=18&cmd=ADD
//http://10.2.20.9/cgi-bin/en/load_scheds/tanker_list.cgi?carrier=zzzzzzzzz&eqpt_type=45&trips=0&lic_expr=2013-06-01&delv_expr=2013-06-01&ins_expr=2013-06-01&lock=Y&active=Y&bay_check=N&last_depot=CGPER&dest_depot=CGPER&cur_depot=CGPER&prompt=-1&cmd=ADD&eqpt_1=testPM&eqpt_2=NP038&eqpt_3=GN7966&depot=CGPER&cmpy=zzzzzzzzz&tanker=ttttttt&eqpt_type=45&n_comp=3&op=54

//single trailer
//http://10.2.20.9/cgi-bin/en/load_scheds/tanker_list.cgi?tanker=tttt&carrier=zzzzzzzzz&eqpt_type=43&trips=0&lic_expr=2013-06-01&delv_expr=2013-06-01&ins_expr=2013-06-01&last_depot=CGPER&dest_depot=CGPER&cur_depot=CGPER&depot=CGPER&cmpy=zzzzzzzzz&op=18&cmd=CREATE

//http://10.2.20.9/cgi-bin/en/load_scheds/tanker_list.cgi?eqpt_1=FINB+9&eqpt_2=NP038&eqpt_3=GN7966&depot=CGPER&cmpy=zzzzzzzzz&tanker=ttttttt&eqpt_type=45&n_comp=3&op=54	
//http://10.2.20.9/cgi-bin/en/load_scheds/tanker_list.cgi?tanker=ttttttt&carrier=zzzzzzzzz&prompt=&trips=0&lic_expr=2013-06-01&lock=on&delv_expr=2013-06-01&active=on&ins_expr=2013-06-01&bay_check=on&last_depot=CGPER&dest_depot=CGPER&cur_depot=CGPER&depot=CGPER&cmpy=zzzzzzzzz&tanker=ttttttt&op=17&cmd=MOD

//http://10.2.20.9/cgi-bin/en/load_scheds/tanker_list.cgi?depot=CGPER&cmpy=zzzzzzzzz&tanker=tttt&eqpt_type=43&op=42
//http://10.2.20.9/cgi-bin/en/load_scheds/tanker_list.cgi?eqpt_1=tttt&depot=CGPER&cmpy=zzzzzzzzz&tanker=tttt&eqpt_type=43&n_comp=1&op=54

/*
tnkr_code=tanker
tnkr_name=tnkr_name
tnkr_own_txt=prompt
tnkr_lic_exp=lic_expr
tnkr_dglic_exp=delv_expr
tnkr_ins_exp=ins_expr
tnkr_pin=pin
tnkr_lock=lock
tnkr_active=active
tnkr_bay_loop_ch=bay_check
tnkr_archive=archive

tnkr_etp=eqpt_type
tnkr_base_site=depot
tnkr_carrier=carrier
tnkr_owner=cmpy
tnkr_dest_depot=dest_depot
tnkr_last_depot=last_depot
tnkr_cur_depot=cur_depot
tnkr_ntrips=trips
tnkr_last_trip=last_trip
tnkr_stats=stats
tnkr_max_kg=max_kg
*/
    
    public function create($data)
	{
        /**************************************************************************************************
        Call CGI to CREATE tanker list
			This will create a default equipment for a simple equipment type
        ***************************************************************************************************/
		/*
        logMe("Info: ++++++Adding new tanker list++++++",TANKERSCLASS);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'tanker'=>urlencode($data->tnkr_code),
            'tnkr_name'=>urlencode($data->tnkr_name),
            'prompt'=>urlencode($data->tnkr_own_txt),
            'lic_expr'=>urlencode($data->tnkr_lic_exp),
            'delv_expr'=>urlencode($data->tnkr_dglic_exp),
            'ins_expr'=>urlencode($data->tnkr_ins_exp),
            'pin'=>urlencode($data->tnkr_pin),
            'lock'=>urlencode($data->tnkr_lock),
            'active'=>urlencode($data->tnkr_active),
            'bay_check'=>urlencode($data->tnkr_bay_loop_ch),
            'archive'=>urlencode($data->tnkr_archive),
            'eqpt_type'=>urlencode($data->tnkr_etp),
            'depot'=>urlencode($data->tnkr_base_site),
            'carrier'=>urlencode($data->tnkr_carrier),
            'cmpy'=>urlencode($data->tnkr_owner),
            'dest_depot'=>urlencode($data->tnkr_dest_depot),
            'last_depot'=>urlencode($data->tnkr_last_depot),
            'cur_depot'=>urlencode($data->tnkr_cur_depot),
            'trips'=>urlencode($data->tnkr_ntrips),
            'last_trip'=>urlencode($data->tnkr_last_trip),
            'stats'=>urlencode($data->tnkr_stats),
            'max_kg'=>urlencode($data->tnkr_max_kg),
//            'cmd'=>urlencode("ADD"),
            'cmd'=>urlencode("CREATE"),
           'op'=>urlencode("18")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=28;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add tanker list failed!!!",TANKERSCLASS);
                return "ERROR";
        }
        logMe("CGI Add tanker list succeeded!!!",TANKERSCLASS);

        return "OK";
		*/
		
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        /**************************************************************************************************
        Call CGI to add tanker list 
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new tanker list++++++",TANKERSCLASS);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'tanker'=>urlencode($data->tnkr_code),
            'tnkr_name'=>urlencode($data->tnkr_name),
            'prompt'=>urlencode($data->tnkr_own_txt),
            'lic_expr'=>urlencode($data->tnkr_lic_exp),
            'delv_expr'=>urlencode($data->tnkr_dglic_exp),
            'ins_expr'=>urlencode($data->tnkr_ins_exp),
            'pin'=>urlencode($data->tnkr_pin),
            'lock'=>urlencode($data->tnkr_lock),
            'active'=>urlencode($data->tnkr_active),
            'bay_check'=>urlencode($data->tnkr_bay_loop_ch),
            'archive'=>urlencode($data->tnkr_archive),
            'eqpt_type'=>urlencode($data->tnkr_etp),
            'depot'=>urlencode($data->tnkr_base_site),
            'carrier'=>urlencode($data->tnkr_carrier),
            'cmpy'=>urlencode($data->tnkr_owner),
            'dest_depot'=>urlencode($data->tnkr_dest_depot),
            'last_depot'=>urlencode($data->tnkr_last_depot),
            'cur_depot'=>urlencode($data->tnkr_cur_depot),
            'trips'=>urlencode($data->tnkr_ntrips),
            'last_trip'=>urlencode($data->tnkr_last_trip),
            'stats'=>urlencode($data->tnkr_stats),
            'max_kg'=>urlencode($data->tnkr_max_kg),
			'remarks'=>urlencode("comments"),
            'cmd'=>urlencode("ADD"),
           'op'=>urlencode("18")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=48;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add tanker list failed!!!",TANKERSCLASS);
                return "ERROR";
        }
        logMe("CGI Add tanker list succeeded!!!",TANKERSCLASS);

		// update tanker name
		$this->updateTankerName( $data->tnkr_code, $data->tnkr_name );

		// update tanker comment
		$this->updateTankerComment( $data->tnkr_code, $data->remarks );

		if( $data->eqpt_count > 0 )
		{
			/**************************************************************************************************
                Call CGI to modify tanker equipments
			***************************************************************************************************/           
//multi trailer
//http://10.2.20.9/cgi-bin/en/load_scheds/tanker_list.cgi?carrier=zzzzzzzzz&eqpt_type=45&trips=0&lic_expr=2013-06-01&delv_expr=2013-06-01&ins_expr=2013-06-01&lock=Y&active=Y&bay_check=N&last_depot=CGPER&dest_depot=CGPER&cur_depot=CGPER&prompt=-1&cmd=ADD&eqpt_1=testPM&eqpt_2=NP038&eqpt_3=GN7966&depot=CGPER&cmpy=zzzzzzzzz&tanker=ttttttt&eqpt_type=45&n_comp=3&op=54

//http://bz.mobhk.om5000/cgi-bin/en/load_scheds/tanker_list.cgi?carrier=0014&eqpt_type=53&trips=0&lic_expr=-1&delv_expr=-1&ins_expr=-1&lock=N&active=Y&bay_check=N&last_depot=-1&dest_depot=-1&cur_depot=-1&prompt=-1&cmd=ADD&eqpt_1=1BDT388&eqpt_2=30719S&eqpt_3=N5784&depot=CGPER&cmpy=0014&tanker=zzz123&eqpt_type=53&n_comp=3&op=54
			logMe("Info: ++++++Modifying tanker equipments++++++",TANKERSCLASS);
			
			// NOTE: continue using the $fields, do not create the new array!!!
			$fields[ 'sess_id' ] = urlencode($data->session_id);
			$fields[ 'tanker' ] = urlencode($data->tnkr_code);
			$fields[ 'eqpt_type' ] = urlencode($data->tnkr_etp);
			$fields[ 'depot' ] = urlencode($data->tnkr_base_site);
			$fields[ 'cmpy' ] = urlencode($data->tnkr_owner);
			$fields[ 'n_comp' ] = urlencode($data->eqpt_count);
			$fields[ 'op' ] = urlencode("54");
			for($i=0; $i<$data->eqpt_count ; $i++)
			{
				$eqpt_index = "eqpt_".($i+1);
				$fields[ $eqpt_index ]=urlencode($data->{$eqpt_index});
				//error_log( "\n".$eqpt_index, 3, "temp.log");
				//error_log( "\n".$data->{$eqpt_index}, 3, "temp.log");
				
				$etyp_index = "etyp_".($i+1);
				$fields[ $etyp_index ]=urlencode($data->{$etyp_index});
				//error_log( "\n".$etyp_index, 3, "temp.log");
				//error_log( "\n".$data->{$etyp_index}, 3, "temp.log");
			}

			$thunkObj = new Thunk($this->host, $this->cgi, $fields);
			$thunkObj->writeToClient($this->cgi);

			$patternSuccess = "var op=14;";
			$isFound = strstr($thunkObj->read(), $patternSuccess);
			if ($isFound == false) {
					logMe("Modify tanker equipments failed!!!",TANKERSCLASS);
				return "ERROR";
			}
			logMe("CGI Modify tanker equipments!!!",TANKERSCLASS);        
		}

		// update tanker name
		$this->updateTankerName( $data->tnkr_code, $data->tnkr_name );

		// update tanker comment
		$this->updateTankerComment( $data->tnkr_code, $data->remarks );

        return "OK";
    }  
    
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
		$keys = array ("TNKR_CODE"=>($data->tnkr_code));
		$excludes = array ("TNKR_PIN"=>0,"REMARKS"=>0);
		$upd_journal = new UpdateJournalClass( "Tankers List", "TANKERS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to add tanker list 
        ***************************************************************************************************/
        logMe("Info: ++++++Updating new tanker list++++++",TANKERSCLASS);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'tanker'=>urlencode($data->tnkr_code),
            'tnkr_name'=>urlencode($data->tnkr_name),
            'prompt'=>urlencode($data->tnkr_own_txt),
            'lic_expr'=>urlencode($data->tnkr_lic_exp),
            'delv_expr'=>urlencode($data->tnkr_dglic_exp),
            'ins_expr'=>urlencode($data->tnkr_ins_exp),
            'pin'=>urlencode($data->tnkr_pin),
            'lock'=>urlencode($data->tnkr_lock),
            'active'=>urlencode($data->tnkr_active),
            'bay_check'=>urlencode($data->tnkr_bay_loop_ch),
            'archive'=>urlencode($data->tnkr_archive),
            'eqpt_type'=>urlencode($data->tnkr_etp),
            'depot'=>urlencode($data->tnkr_base_site),
            'carrier'=>urlencode($data->tnkr_carrier),
            'cmpy'=>urlencode($data->tnkr_owner),
            'dest_depot'=>urlencode($data->tnkr_dest_depot),
            'last_depot'=>urlencode($data->tnkr_last_depot),
            'cur_depot'=>urlencode($data->tnkr_cur_depot),
            'trips'=>urlencode($data->tnkr_ntrips),
            'last_trip'=>urlencode($data->tnkr_last_trip),
            'stats'=>urlencode($data->tnkr_stats),
            'max_kg'=>urlencode($data->tnkr_max_kg),
            'cmd'=>urlencode("MOD"),
			'remarks'=>urlencode("comments"),
			'op'=>urlencode("17")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=27;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Update tanker list failed!!!",TANKERSCLASS);
                return "ERROR";
        }
        logMe("CGI Update tanker list succeeded!!!",TANKERSCLASS);

		// update tanker name
		$this->updateTankerName( $data->tnkr_code, $data->tnkr_name );

		// update tanker comment
		$this->updateTankerComment( $data->tnkr_code, $data->remarks );
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

		if( $data->eqpt_count > 0 )
		{
			//////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////// new module to log any changes of any fields on any screen ////////////////////////
			////////////////////// Before the updates                                        ////////////////////////
			/////////////////////////////////////////////////////////////////////////////////////////////////////////
			$keys2 = array ("TC_TANKER"=>($data->tnkr_code), "TC_SEQNO"=>0);
			$excludes2 = array ("TC_TANKER"=>0);
			$upd_journal2 = new UpdateJournalClass( "Tankers List", "TNKR_EQUIP", $keys2, $excludes2 );
			// get the old values
			$old_array = array();
			for($i=0; $i<$data->eqpt_count; $i++)
			{               
				$keys2["TC_SEQNO"] = $i+1;
				$upd_journal2->setKeyValues( $keys2 );
				//$sql_txt = "select e.eqpt_id ||':'||e.eqpt_code as equipment from transp_equip e, tnkr_equip t where e.eqpt_id=t.tc_eqpt and t.tc_tanker='$data->tnkr_code' and t.tc_seqno=".$keys2["TC_SEQNO"];
				$sql_txt = array();
				$sql_txt['sql_text'] = "select e.eqpt_id ||':'||e.eqpt_code as equipment from transp_equip e, tnkr_equip t where e.eqpt_id=t.tc_eqpt and t.tc_tanker=:tnkr_code and t.tc_seqno=:tc_seq";
				$sql_txt['sql_data'] = array($data->tnkr_code, $keys2["TC_SEQNO"]);
				$old_array[$i] = $upd_journal2->getRecordValues($sql_txt);
			}

			/**************************************************************************************************
                Call CGI to modify tanker equipments
			***************************************************************************************************/           
			logMe("Info: ++++++Modifying tanker equipments++++++",TANKERSCLASS);
			
			// NOTE: Need to create a new array here
			$fields = array();
			$fields[ 'sess_id' ] = urlencode($data->session_id);
			$fields[ 'tanker' ] = urlencode($data->tnkr_code);
			$fields[ 'eqpt_type' ] = urlencode($data->tnkr_etp);
			$fields[ 'depot' ] = urlencode($data->tnkr_base_site);
			$fields[ 'cmpy' ] = urlencode($data->tnkr_owner);
			$fields[ 'n_comp' ] = urlencode($data->eqpt_count);
			$fields[ 'op' ] = urlencode("54");
			for($i=0; $i<$data->eqpt_count ; $i++)
			{
				$eqpt_index = "eqpt_".($i+1);
				$fields[ $eqpt_index ]=urlencode($data->{$eqpt_index});
				//error_log( "\n".$eqpt_index, 3, "temp.log");
				//error_log( "\n".$data->{$eqpt_index}, 3, "temp.log");
				
				$etyp_index = "etyp_".($i+1);
				$fields[ $etyp_index ]=urlencode($data->{$etyp_index});
				//error_log( "\n".$etyp_index, 3, "temp.log");
				//error_log( "\n".$data->{$etyp_index}, 3, "temp.log");
			}

			$thunkObj = new Thunk($this->host, $this->cgi, $fields);
			$thunkObj->writeToClient($this->cgi);

			$patternSuccess = "var op=14;";
			$isFound = strstr($thunkObj->read(), $patternSuccess);
			if ($isFound == false) {
					logMe("Modify tanker equipments failed!!!",TANKERSCLASS);
				return "ERROR";
			}
			logMe("CGI Modify tanker equipments!!!",TANKERSCLASS);        
		
			//////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////// new module to log any changes of any fields on any screen ////////////////////////
			////////////////////// After the updates                                         ////////////////////////
			/////////////////////////////////////////////////////////////////////////////////////////////////////////
			// get the new values and record the journal if there were any changes
			$new_array = array();
			for($i=0; $i<$data->eqpt_count; $i++)
			{               
				$keys2["TC_SEQNO"] = $i+1;
				$upd_journal2->setKeyValues( $keys2 );
				//$sql_txt = "select e.eqpt_id ||':'||e.eqpt_code as equipment from transp_equip e, tnkr_equip t where e.eqpt_id=t.tc_eqpt and t.tc_tanker='$data->tnkr_code' and t.tc_seqno=".$keys2["TC_SEQNO"];
				$sql_txt = array();
				$sql_txt['sql_text'] = "select e.eqpt_id ||':'||e.eqpt_code as equipment from transp_equip e, tnkr_equip t where e.eqpt_id=t.tc_eqpt and t.tc_tanker=:tnkr_code and t.tc_seqno=:tc_seq";
				$sql_txt['sql_data'] = array($data->tnkr_code, $keys2["TC_SEQNO"]);
				$new_array[$i] = $upd_journal2->getRecordValues($sql_txt);
				$upd_journal2->setOldValues( $old_array[$i] );
				$upd_journal2->setNewValues( $new_array[$i] );
				$upd_journal2->log();
			}
			/////////////////////////////////////////////////////////////////////////////////////////////////////////
		}

        return "OK";
    }  


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
		
        logMe("Info: ++++++Deleting tanker list++++++",TANKERSCLASS);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'depot'=>urlencode($data->tnkr_base_site),
            'cmpy'=>urlencode($data->tnkr_owner),
            'tanker'=>urlencode($data->tnkr_code),
            'eqpt_type'=>urlencode($data->tnkr_etp),
             'op'=>urlencode("19")
        );
       $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=29;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
            logMe("Delete tanker list failed!!!",TANKERSCLASS);
            $patternFailed = "var op=39;";
            $failed = strstr($response, $patternFailed);            
            if($failed){
                return "DEPENDENCIES";
            }else{                
                return "ERROR";
            }
        }
        logMe("CGI Delete tanker list succeeded!!!",TANKERSCLASS);

        return "OK";
    }      
	
	public function unlockTankerCompartments($tnkr) 
	{
		$keys = array("TANKER"=>urlencode($tnkr));
		$excludes = array ("TANKER"=>0);   
		$upd = new UpdateJournalClass("TANKERS", "SFILL_ADJUST", $keys, $excludes);
		// $upd->setOldValues($upd->getRecordValues());
		
		$mydb = DB::getInstance();
		logMe("*********************************************Date is****************************************************************",TANKERSCLASS);
		logMe("Date: " . $phpdate, TANKERSCLASS);
		
		//$sql = "UPDATE SFILL_ADJUST SET ADJ_CMPT_LOCK=0 WHERE ADJ_EQP in (select TC_EQPT from TNKR_EQUIP where TC_TANKER='$tnkr' ) ";
		$sql = array();
        $sql['sql_text'] = "UPDATE SFILL_ADJUST SET ADJ_CMPT_LOCK=0 WHERE ADJ_EQP in (select TC_EQPT from TNKR_EQUIP where TC_TANKER=:tnkr ) ";
		$sql['sql_data'] = array( $tnkr );
		
		$res = $mydb->update($sql);
		//$upd->setNewValues($upd->getRecordValues());
		$upd->logOneLine(" Unlocked all compartments in tanker [".$tnkr."] ");
		
		if ( $res == RETURN_OK )
		{
			return "OK";
		}
		else
		{
			return "ERROR";
		}
	}
	
    public function updateTankerName($code, $name)
	{
        $mydb = DB::getInstance();
		
        //$sql="update TANKERS set TNKR_NAME='".$name."' where TNKR_CODE='$code'";
		$sql = array();
        $sql['sql_text'] = "update TANKERS set TNKR_NAME=:tnkrname where TNKR_CODE=:tnkrcode";
		$sql['sql_data'] = array( $name, $code );
		
        $result = $mydb->update($sql);
		
        return $result;
    }
	
    public function updateTankerComment($code, $note)
	{
        $mydb = DB::getInstance();
		
        //$sql="update TANKERS set REMARKS='".$note."' where TNKR_CODE='$code'";
		$sql = array();
        $sql['sql_text'] = "update TANKERS set REMARKS=:note where TNKR_CODE=:code";
		$sql['sql_data'] = array( $note, $code );
		
        $result = $mydb->update($sql);
		
        return $result;
    }
}
?>
