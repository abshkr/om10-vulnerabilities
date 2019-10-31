<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../classes/Thunk.class.php');
require_once(dirname(__FILE__) . '/../classes/EquipmentTypes.class.php');
require_once(dirname(__FILE__) . '/../classes/EquipmentList.class.php');
require_once(dirname(__FILE__) . '/../classes/Journal.class.php');

/* define the module name for calling logMe() to output */
if(!defined('TANKERSHAPESCLASS')) define('TANKERSHAPESCLASS','TankerShapes.class');

class TankerShapesClass{
    public function TankerShapesClass()
    {
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
    
    public function getTankerComposition($id, $tanker, $owner, $option ){
        $mydb = DB::getInstance();
		/*
        $sql="SELECT EQUIP_VW.* ,COMPTS.CMPT_UNITS, EQUIP_TYPES_VW.CMPTNU, ROW_NUMBER() over (order by EQUIP_VW.EQC_COUNT) IDX, EQUIP_TYPES.ETYP_SCHEDUL as SUB_ITEM_SCHED_TYPE,
                EQUIP_TYPES.ETYP_ISRIGID as SUB_ITEM_ETYP_ISRIGID, EQUIP_TYPES.ETYP_TITLE as EQC_SUB_ITEM_TITLE
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
                EQUIP_TYPES.ETYP_ISRIGID as SUB_ITEM_ETYP_ISRIGID, EQUIP_TYPES.ETYP_TITLE as EQC_SUB_ITEM_TITLE, EQUIP_TYPES.ETYP_CATEGORY
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
			FROM GUI_EQUIPMENT_SHAPES 
			WHERE ( -1=$id or EQPT_ETP=$id ) and ( '-1'='".$owner."' or EQPT_OWNER='".$owner."') 
			ORDER BY EQPT_CODE 
			";
		*/
		$sql = array();
        $sql['sql_text'] = "
			SELECT EQPT_ID, EQPT_CODE, EQPT_TITLE, DECODE(EQPT_TITLE, NULL, EQPT_CODE, EQPT_CODE||'['||EQPT_TITLE||']') as EQPT_NAME, EQPT_OWNER, EQPT_OWNER_NAME, EQPT_ETP, EQPT_ETP_TITLE, EQPT_LOCK
			FROM GUI_EQUIPMENT_SHAPES 
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
			from TNKR_EQUIP te, GUI_EQUIPMENT_SHAPES el 
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
			from TNKR_EQUIP te, GUI_EQUIPMENT_SHAPES el 
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

    public function getEquipmentShape($tnkr_code){
        $mydb = DB::getInstance();
        //$sql="SELECT tnkr_etp, tnkr_owner FROM GUI_TANKER_SHAPES WHERE tnkr_code='$tnkr_code'";
		
		$sql = array();
        $sql['sql_text'] = "SELECT tnkr_etp, tnkr_owner FROM GUI_TANKER_SHAPES WHERE tnkr_code=:tnkr_code ";
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
				
				$y->etyp_title = $this->getTankerEquipmentCode($x->idx, $x->etyp_id, 
				$y->cmpt_etyp, $y->cmpt_no, $y->cmpt_capacit, $tanker_comp);  // need adjust according to eqpt list
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
	
    public function getTankerEquipmentCode($idx, $etyp_id, $cmpt_etyp, $cmpt_no, $cmpt_capacit, $tanker_comp)
	{
		$eqpt_code = "";
		
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
							if ( $tz->etyp_id == $cmpt_etyp && $tz->cmpt_no == $cmpt_no  )
							{
								$eqpt_code = $ty->eqpt_code;
								return $eqpt_code;
							}
						}
					}
				}
			}
		}
				
		return $eqpt_code;
	}

}
?>