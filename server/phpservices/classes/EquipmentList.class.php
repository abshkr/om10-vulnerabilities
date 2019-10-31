<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../classes/Thunk.class.php');
require_once(dirname(__FILE__) . '/../classes/EquipmentTypes.class.php');
require_once(dirname(__FILE__) . '/../classes/Journal.class.php');

/* define the module name for calling logMe() to output */
if(!defined('EQUIPLISTCLASS')) define('EQUIPLISTCLASS','EquipmentList.class');

class EquipmentListClass
{
    public function EquipmentListClass()
    {
		session_start();
		
        if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
            $this->host ="localhost";
        }
        
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "load_scheds/equip_list.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/load_scheds/equip_list.cgi";
        }
    }
	
    public function getEquipmentList($filter='',$sort='')
	{
        $mydb = DB::getInstance();
        if($sort!='')$sort="ORDER BY $sort";
		else $sort="ORDER BY EQPT_ID";
		/*
		$sql="SELECT EQPT_ID, EQPT_CODE, EQPT_TITLE, EQPT_TANKER, EQPT_OWNER, EQPT_OWNER_NAME, EQPT_ETP, EQPT_ETP_TITLE, DECODE(EQPT_EXP_D1_DMY, NULL, '', TO_CHAR(EQPT_EXP_D1_DMY, 'YYYY-MM-DD')) as EQPT_EXP_D1_DMY, DECODE(EQPT_EXP_D2_DMY, NULL, '', TO_CHAR(EQPT_EXP_D2_DMY, 'YYYY-MM-DD')) as EQPT_EXP_D2_DMY, DECODE(EQPT_EXP_D3_DMY, NULL, '', TO_CHAR(EQPT_EXP_D3_DMY, 'YYYY-MM-DD')) as EQPT_EXP_D3_DMY, EQPT_LOCK, EQPT_EMPTY_KG, EQP_MUST_TARE_IN, EQPT_MAX_GROSS, EQPT_COMMENTS, EQPT_AREA, EQPT_AREA_NAME, EQPT_LOAD_TYPE, EQPT_LOAD_TYPE_NAME, ETYP_CATEGORY, RN  FROM(
                SELECT res.*, ROW_NUMBER() over ($sort) RN
                FROM(SELECT * FROM GUI_EQUIPMENT_LIST $filter) res
             )";
		*/	 
		$sql = array();
        $sql['sql_text'] = "SELECT EQPT_ID, EQPT_CODE, EQPT_TITLE, EQPT_TANKER, EQPT_OWNER, EQPT_OWNER_NAME, EQPT_ETP, EQPT_ETP_TITLE, DECODE(EQPT_EXP_D1_DMY, NULL, '', TO_CHAR(EQPT_EXP_D1_DMY, 'YYYY-MM-DD')) as EQPT_EXP_D1_DMY, DECODE(EQPT_EXP_D2_DMY, NULL, '', TO_CHAR(EQPT_EXP_D2_DMY, 'YYYY-MM-DD')) as EQPT_EXP_D2_DMY, DECODE(EQPT_EXP_D3_DMY, NULL, '', TO_CHAR(EQPT_EXP_D3_DMY, 'YYYY-MM-DD')) as EQPT_EXP_D3_DMY, EQPT_LOCK, EQPT_EMPTY_KG, EQP_MUST_TARE_IN, EQPT_MAX_GROSS, EQPT_COMMENTS, EQPT_AREA, EQPT_AREA_NAME, EQPT_LOAD_TYPE, EQPT_LOAD_TYPE_NAME, ETYP_CATEGORY, RN, EQPT_LAST_MODIFIED, EQPT_LAST_USED  FROM(
                SELECT res.*, ROW_NUMBER() over ($sort) RN
                FROM(SELECT * FROM GUI_EQUIPMENT_LIST " . $filter['sql_text'] . ") res
             )";
		$sql['sql_data'] = $filter['sql_data'];
		
        $rows = $mydb->query($sql);
		
        $arr = array();
        foreach($rows as $x)
		{
           // $comp = $this->getEquipmentComposition( $x->EQPT_ETP, $x->EQPT_OWNER, $x->EQPT_CODE, 0 );
		   $comp=null;
            $x->composition = $comp;
            $arr[] = $x;
        }
        
        //XarrayEncodingConversion($arr);
        return (prepareForAMF($arr, array(0 => "Gui_Equipment_List")));        
	}
	         
    public function getPaged($offset,$tot,$filter='',$sort='')
	{
        $mydb = DB::getInstance();
        if($sort!='')$sort="ORDER BY $sort";
		else $sort="ORDER BY EQPT_ID";
		/*
		$sql="SELECT EQPT_ID, EQPT_CODE, EQPT_TITLE, EQPT_TANKER, EQPT_OWNER, EQPT_OWNER_NAME, EQPT_ETP, EQPT_ETP_TITLE, DECODE(EQPT_EXP_D1_DMY, NULL, '', TO_CHAR(EQPT_EXP_D1_DMY, 'YYYY-MM-DD')) as EQPT_EXP_D1_DMY, DECODE(EQPT_EXP_D2_DMY, NULL, '', TO_CHAR(EQPT_EXP_D2_DMY, 'YYYY-MM-DD')) as EQPT_EXP_D2_DMY, DECODE(EQPT_EXP_D3_DMY, NULL, '', TO_CHAR(EQPT_EXP_D3_DMY, 'YYYY-MM-DD')) as EQPT_EXP_D3_DMY, EQPT_LOCK, EQPT_EMPTY_KG, EQP_MUST_TARE_IN, EQPT_MAX_GROSS, EQPT_COMMENTS, EQPT_AREA, EQPT_AREA_NAME, EQPT_LOAD_TYPE, EQPT_LOAD_TYPE_NAME, ETYP_CATEGORY, RN  FROM(
                SELECT res.*, ROW_NUMBER() over ($sort) RN
                FROM(SELECT * FROM GUI_EQUIPMENT_LIST $filter) res
             )
             where RN between ".($offset+1)." and ".($offset+$tot); //." $sort";
		*/
		$sql = array();
        $sql['sql_text'] = "SELECT EQPT_ID, EQPT_CODE, EQPT_TITLE, EQPT_TANKER, EQPT_OWNER, EQPT_OWNER_NAME, EQPT_ETP, EQPT_ETP_TITLE, DECODE(EQPT_EXP_D1_DMY, NULL, '', TO_CHAR(EQPT_EXP_D1_DMY, 'YYYY-MM-DD')) as EQPT_EXP_D1_DMY, DECODE(EQPT_EXP_D2_DMY, NULL, '', TO_CHAR(EQPT_EXP_D2_DMY, 'YYYY-MM-DD')) as EQPT_EXP_D2_DMY, DECODE(EQPT_EXP_D3_DMY, NULL, '', TO_CHAR(EQPT_EXP_D3_DMY, 'YYYY-MM-DD')) as EQPT_EXP_D3_DMY, EQPT_LOCK, EQPT_EMPTY_KG, EQP_MUST_TARE_IN, EQPT_MAX_GROSS, EQPT_COMMENTS, EQPT_AREA, EQPT_AREA_NAME, EQPT_LOAD_TYPE, EQPT_LOAD_TYPE_NAME, ETYP_CATEGORY, RN, EQPT_LAST_MODIFIED, EQPT_LAST_USED  FROM(
                SELECT res.*, ROW_NUMBER() over ($sort) RN
                FROM(SELECT * FROM GUI_EQUIPMENT_LIST " . $filter['sql_text'] . ") res
             )
             where RN between ".($offset+1)." and ".($offset+$tot); //." $sort";
		$sql['sql_data'] = $filter['sql_data'];
		
        $rows = $mydb->query($sql);
		
        $arr = array();
        foreach($rows as $x)
		{
           // $comp = $this->getEquipmentComposition( $x->EQPT_ETP, $x->EQPT_OWNER, $x->EQPT_CODE, 0 );
		   $comp=null;
            $x->composition = $comp;
            $arr[] = $x;
        }
        
        //XarrayEncodingConversion($arr);
        return (prepareForAMF($arr, array(0 => "Gui_Equipment_List")));        
	}
    
    public function getEquipmentComposition($id, $owner, $code, $option )
	{
        $mydb = DB::getInstance();
		/*
        $sql="SELECT EQUIP_VW.* ,COMPTS.CMPT_UNITS, EQUIP_TYPES_VW.CMPTNU, ROW_NUMBER() over (order by EQUIP_TYPES_VW.ETYP_ID) IDX, EQUIP_TYPES.ETYP_SCHEDUL as SUB_ITEM_SCHED_TYPE,
                EQUIP_TYPES.ETYP_ISRIGID as SUB_ITEM_ETYP_ISRIGID, EQUIP_TYPES.ETYP_TITLE as EQC_SUB_ITEM_TITLE,
							  COMPTS.ETYP_CATEGORY as ETYP_CATEGORY
                FROM  EQUIP_TYPES_VW, EQUIP_VW, EQUIP_TYPES,

                (SELECT  * 
                FROM    (
                        SELECT  EQUIP_TYPES_VW.ETYP_ID, CMPT_UNITS, ROW_NUMBER() OVER (PARTITION BY EQUIP_TYPES_VW.ETYP_ID ORDER BY EQUIP_TYPES_VW.ETYP_ID) AS rn, EQUIP_TYPES_VW.ETYP_CATEGORY
                        FROM    EQUIP_TYPES_VW
                        LEFT OUTER JOIN CMPT_VW
                        ON   CMPT_VW.ETYP_ID_RT = EQUIP_TYPES_VW.ETYP_ID
                )
                WHERE rn = 1) COMPTS  WHERE EQUIP_TYPES_VW.ETYP_ID= EQUIP_VW.ETYP_ID_RT AND COMPTS. ETYP_ID=EQUIP_VW.ETYP_ID AND EQUIP_VW.EQC_SUB_ITEM=EQUIP_TYPES.ETYP_ID(+) AND EQUIP_VW.ETYP_ID_RT=$id ORDER BY EQUIP_VW.ETYP_ID_RT,EQUIP_VW.EQC_COUNT_RT, EQUIP_VW.LVL
                ";
		*/		
		$sql = array();
        $sql['sql_text'] = "SELECT EQUIP_VW.* ,COMPTS.CMPT_UNITS, EQUIP_TYPES_VW.CMPTNU, ROW_NUMBER() over (order by EQUIP_TYPES_VW.ETYP_ID) IDX, EQUIP_TYPES.ETYP_SCHEDUL as SUB_ITEM_SCHED_TYPE,
                EQUIP_TYPES.ETYP_ISRIGID as SUB_ITEM_ETYP_ISRIGID, EQUIP_TYPES.ETYP_TITLE as EQC_SUB_ITEM_TITLE,
							  COMPTS.ETYP_CATEGORY as ETYP_CATEGORY
                FROM  EQUIP_TYPES_VW, EQUIP_VW, EQUIP_TYPES,

                (SELECT  * 
                FROM    (
                        SELECT  EQUIP_TYPES_VW.ETYP_ID, CMPT_UNITS, ROW_NUMBER() OVER (PARTITION BY EQUIP_TYPES_VW.ETYP_ID ORDER BY EQUIP_TYPES_VW.ETYP_ID) AS rn, EQUIP_TYPES_VW.ETYP_CATEGORY
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
					$eqpt_selected = $this->getEquipmentsByTypeAndCode($id, $owner, $code, $option);
                }else
				{
                    if($x->EQC_SUB_ITEM!='') 
					{
						$comp = $eqpType->getCompartmentsDetails($x->EQC_SUB_ITEM);
						$eqpt_list = $this->getEquipmentsByTypeAndOwner($x->EQC_SUB_ITEM, $owner, $option);
						$eqpt_selected = $this->getEquipmentsByTypeAndCode($x->EQC_SUB_ITEM, $owner, $code, $option);
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
        return (prepareForAMF($arr, array(0 => 'EquipmentComposition')));
        //return ($arr);
    }
    
    public function getEquipmentsByTypeAndOwner($id, $owner, $option)
	{
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
		
		return ( $this->getEquipmentsByFilter($sql, $option) );
    }
    
    public function getEquipmentsByTypeAndCode($id, $owner, $code, $option)
	{
		/*
		$sql="
			SELECT EQPT_ID, EQPT_CODE, EQPT_TITLE, DECODE(EQPT_TITLE, NULL, EQPT_CODE, EQPT_CODE||'['||EQPT_TITLE||']') as EQPT_NAME, EQPT_OWNER, EQPT_OWNER_NAME, EQPT_ETP, EQPT_ETP_TITLE, EQPT_LOCK
			FROM GUI_EQUIPMENT_LIST 
			WHERE ( -1=$id or EQPT_ETP=$id ) and ( '-1'='".$owner."' or EQPT_OWNER='".$owner."') and ( '-1'='".$code."' or EQPT_CODE='".$code."') 
			ORDER BY EQPT_CODE 
			";
		*/	
		$sql = array();
        $sql['sql_text'] = "
			SELECT EQPT_ID, EQPT_CODE, EQPT_TITLE, DECODE(EQPT_TITLE, NULL, EQPT_CODE, EQPT_CODE||'['||EQPT_TITLE||']') as EQPT_NAME, EQPT_OWNER, EQPT_OWNER_NAME, EQPT_ETP, EQPT_ETP_TITLE, EQPT_LOCK
			FROM GUI_EQUIPMENT_LIST 
			WHERE ( -1=:id or EQPT_ETP=:id ) and ( '-1'=:owner or EQPT_OWNER=:owner) and ( '-1'=:code or EQPT_CODE=:code) 
			ORDER BY EQPT_CODE 
			";
		$sql['sql_data'] = array( $id, $owner, $code );
		
		return ( $this->getEquipmentsByFilter($sql, $option) );
    }
    
    public function getEquipmentsByFilter($sql, $option)
	{
        $mydb = DB::getInstance();
        $rows = $mydb->query($sql);
        
 		$arr = array();
        foreach($rows as $x)
		{
			if ($option > 0)
			{
				$cmpt = $this->getEquipmentCompartments( $x->EQPT_ID );
				$x->compartments = $cmpt;
			}
            $arr[] = $x;
        }

        //XarrayEncodingConversion($arr);
        return (prepareForAMF($arr, array(0 => 'EquipmentStructure')));
    }
         
    
    function getEquipmentCompartments($id){
        $mydb = DB::getInstance();
        //$sql="SELECT * FROM GUI_EQUIPLIST_CMPT_VW WHERE EQPT_ID=$id";
		
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM GUI_EQUIPLIST_CMPT_VW WHERE EQPT_ID=:id";
		$sql['sql_data'] = array( $id );
		
        $rows = $mydb->query($sql);
        $arr = array();
		
		$arr = $rows;
                
        //XarrayEncodingConversion($arr);
		//return($arr);
        return (prepareForAMF($arr, array(0 => "EquipmentCompartment")));
    }

    public function getSchdType($supplier, $trip_no)
	{
        $mydb = DB::getInstance();
        $conn = $mydb->connect;
        $res = -1; // unknown type
        $stid = oci_parse($conn,"BEGIN :v_res := GUI_Schd_Type(:v_supp,:v_tripno); END;");

        oci_bind_by_name($stid, ':v_res', $res);//, 1);
        oci_bind_by_name($stid, ":v_supp", $supplier);
        oci_bind_by_name($stid, ":v_tripno", $trip_no);
        
		if(oci_execute($stid)){
		    logMe("supplier=".$supplier, EQUIPLISTCLASS);
		    logMe("trip_no=".$trip_no, EQUIPLISTCLASS);
		    logMe("getSchdType==>".$res, EQUIPLISTCLASS);
            oci_free_statement($stid);
            return $res;
        }else{
            logMe(oci_error($stid), EQUIPLISTCLASS);
            oci_free_statement($stid);
            return -1;
        }
	}

    public function getEquipmentIdByCode($code)
	{
        $mydb = DB::getInstance();
        //$sql="SELECT EQPT_ID FROM TRANSP_EQUIP where EQPT_CODE='$code'";
		
		$sql = array();
        $sql['sql_text'] = "SELECT EQPT_ID FROM TRANSP_EQUIP where EQPT_CODE=:code";
		$sql['sql_data'] = array( $code );
		
        $rows = $mydb->query($sql);
        return ((integer)$rows[0]->EQPT_ID);
    }
	
	public function updateEquipmentComments($eqpt, $comments) 
	{
		
		$mydb = DB::getInstance();
		logMe("*********************************************Date is****************************************************************",EQUIPLISTCLASS);
		logMe("Date: " . $phpdate, EQUIPLISTCLASS);
		//$sql = "UPDATE TRANSP_EQUIP SET EQPT_COMMENTS='$comments' WHERE EQPT_ID=$eqpt";
		
		$sql = array();
        $sql['sql_text'] = "UPDATE TRANSP_EQUIP SET EQPT_COMMENTS=:comments WHERE EQPT_ID=:eqpt";
		$sql['sql_data'] = array( $comments, $eqpt );
		
		$res = $mydb->update($sql);
		
		if ( $res == RETURN_OK )
		{
			return "OK";
		}
		else
		{
			return "ERROR";
		}
	}
	
	public function updateEquipmentTitle($eqpt, $name) 
	{
		
		$mydb = DB::getInstance();
		
		$sql = array();
        $sql['sql_text'] = "UPDATE TRANSP_EQUIP SET EQPT_TITLE=:eqptname WHERE EQPT_ID=:eqpt";
		$sql['sql_data'] = array( $name, $eqpt );
		
		$res = $mydb->update($sql);
		
		if ( $res == RETURN_OK )
		{
			return "OK";
		}
		else
		{
			return "ERROR";
		}
	}
    
    public function create($data)
	{
/*
   sscanf(getReqVal("ncmpt"),"%d",&ncmpt); 
   sscanf(getReqVal("pg"),"%d",&pg); 
   depot=getReqVal("depot");
   cmd = getReqVal("cmd");
   regDate = getReqVal("regDate");
   slpDate = getReqVal("slpDate");
   trailerDate = getReqVal("trailerDate");
   cmptID = getReqVal("cmptID");
   drawer = getReqVal("drawer");
   prdcde = getReqVal("prod");
   rtnDate = getReqVal("date");
   reason = getReqVal("reason");
   qty = getReqVal("qty");
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
        Call CGI to add equipment list 
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new equipment list++++++",EQUIPLISTCLASS);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'cmpy'=>urlencode($data->eqpt_owner),
            'equip'=>urlencode($data->eqpt_code),
            'equipID'=>urlencode($data->eqpt_id),
            'equipName'=>urlencode($data->eqpt_title),
            'eqpt_type'=>urlencode($data->eqpt_etp),
            'lock'=>urlencode($data->eqpt_lock),
            'weigh'=>urlencode($data->eqp_must_tare_in),
            'empty'=>urlencode($data->eqpt_empty_kg),
            'pmLimit'=>urlencode($data->eqpt_max_gross),
            'expDate1'=>urlencode($data->eqpt_exp_d1_dmy),
            'expDate2'=>urlencode($data->eqpt_exp_d2_dmy),
            'expDate3'=>urlencode($data->eqpt_exp_d3_dmy),
            'area'=>urlencode($data->eqpt_area),
            'loadtype'=>urlencode($data->eqpt_load_type),
			'remarks'=>urlencode("comments"),
			'op'=>urlencode("18")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=28;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add equipment list failed!!!",EQUIPLISTCLASS);
                return "ERROR";
        }
        logMe("CGI Add equipment list succeeded!!!",EQUIPLISTCLASS);

		
		if( $data->has_cmpt=="1" && sizeof($data->compartments) > 0 )
		{
			/**************************************************************************************************
                Call CGI to modify compartments
			***************************************************************************************************/       
			// Since this is creating process, we need to get the new ID for new equipment with which the cmpt details are updated/created
			
			logMe("Info: ++++++Modifying compartments limit++++++",EQUIPLISTCLASS);
			$fields = array(
				'sess_id'=>urlencode($data->session_id),
				'equipID'=>urlencode( $this->getEquipmentIdByCode($data->eqpt_code) ),
				'cmpy'=>urlencode($data->eqpt_owner),
				'op'=>urlencode("13"),
				'ncmpt'=>urlencode( sizeof($data->compartments) ),
			);
			for($i=0; $i<sizeof($data->compartments); $i++)
			{               
				$fields["cmptcap".$data->compartments[$i]->cmpt_no]=urlencode($data->compartments[$i]->cmpt_capacit);
				$fields["cmptsfl".$data->compartments[$i]->cmpt_no]=urlencode($data->compartments[$i]->adj_safefill);
				$fields["sflcap".$data->compartments[$i]->cmpt_no]=urlencode($data->compartments[$i]->adj_capacity);
			}
/*			
	public $cmpt_no;
	public $cmpt_capacit;
	public $unit_id;
	public $unit_title;
	public $adj_amnt;
	public $adj_capacity;
	public $;

SCRIPT_NAME: /cgi-bin/en/load_scheds/equip_list.cgi
begin: 20120525_11:27:39.124773+08
REQUEST_METHOD: GET
COOKIE: sess_id=LqWGqQRydJRU; language=en; reqId=rRrdjhupYDN
REQUEST: cmptcap1=10000&cmptsfl1=9000&sflcap1=11000&cmptcap2=10000&cmptsfl2=10000&sflcap2=10000&cmptcap3=10000&cmptsfl3=10000&sflcap3=10000&cmptcap4=10000&cmptsfl4=10000&sflcap4=10000&cmptcap5=10000&cmptsfl5=10000&sflcap5=10000&cmptcap6=10000&cmptsfl6=10000&sflcap6=10000&cmptcap7=10000&cmptsfl7=10000&sflcap7=10000&cmptcap8=10000&cmptsfl8=10000&sflcap8=10000&cmptcap9=10000&cmptsfl9=10000&sflcap9=10000&ncmpt=9&cmpy=zzzzzzzzz&equipID=998490597&op=13
*/

			$thunkObj = new Thunk($this->host, $this->cgi, $fields);
			$thunkObj->writeToClient($this->cgi);

			$patternSuccess = "var op=23;";
			$isFound = strstr($thunkObj->read(), $patternSuccess);
			if ($isFound == false) {
					logMe("Modify compartment limits failed!!!",EQUIPLISTCLASS);
				return "ERROR";
			}
			logMe("CGI Modify compartment limits!!!",EQUIPLISTCLASS);        
		}
		
		$new_id = $this->getEquipmentIdByCode($data->eqpt_code);
		$this->updateEquipmentTitle( $new_id, $data->eqpt_title );
		$this->updateEquipmentComments( $new_id, $data->eqpt_comments );

//        return "OK";

		$code = $data->eqpt_code;
						
		$sql['sql_text'] = " UPDATE TRANSP_EQUIP SET EQPT_LAST_MODIFIED=current_date WHERE EQPT_CODE=:code";

		$sql['sql_data'] = array( $code );

		$mydb = DB::getInstance();

		$data = $mydb->update($sql);

        return "OK__".$new_id;
    }  
	
    public function update($data)
	{
/*
   sscanf(getReqVal("ncmpt"),"%d",&ncmpt); 
   sscanf(getReqVal("pg"),"%d",&pg); 
   depot=getReqVal("depot");
   cmd = getReqVal("cmd");
   regDate = getReqVal("regDate");
   slpDate = getReqVal("slpDate");
   trailerDate = getReqVal("trailerDate");
   cmptID = getReqVal("cmptID");
   drawer = getReqVal("drawer");
   prdcde = getReqVal("prod");
   rtnDate = getReqVal("date");
   reason = getReqVal("reason");
   qty = getReqVal("qty");
*/
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
		$keys = array ("EQPT_ID"=>($data->eqpt_id));
		$excludes = array ("EQPT_ID"=>0,"EQPT_COMMENTS"=>0);
		$upd_journal = new UpdateJournalClass( "Equipment List", "TRANSP_EQUIP", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        /**************************************************************************************************
        Call CGI to update equipment list 
        ***************************************************************************************************/
        logMe("Info: ++++++Add Modifyinging new equipment list++++++",EQUIPLISTCLASS);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'cmpy'=>urlencode($data->eqpt_owner),
            'equip'=>urlencode($data->eqpt_code),
            'equipID'=>urlencode($data->eqpt_id),
            'equipName'=>urlencode($data->eqpt_title),
            'eqpt_type'=>urlencode($data->eqpt_etp),
            'lock'=>urlencode($data->eqpt_lock),
            'weigh'=>urlencode($data->eqp_must_tare_in),
            'empty'=>urlencode($data->eqpt_empty_kg),
            'pmLimit'=>urlencode($data->eqpt_max_gross),
            'expDate1'=>urlencode($data->eqpt_exp_d1_dmy),
            'expDate2'=>urlencode($data->eqpt_exp_d2_dmy),
            'expDate3'=>urlencode($data->eqpt_exp_d3_dmy),
            'area'=>urlencode($data->eqpt_area),
            'loadtype'=>urlencode($data->eqpt_load_type),
			'remarks'=>urlencode("comments"),
           'op'=>urlencode("17")
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=27;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Modify equipment list failed!!!",EQUIPLISTCLASS);
                return "ERROR";
        }
        logMe("CGI Modify equipment list succeeded!!!",EQUIPLISTCLASS);
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

		if( sizeof($data->compartments) > 0 )
		{
			//////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////// new module to log any changes of any fields on any screen ////////////////////////
			////////////////////// Before the updates                                        ////////////////////////
			/////////////////////////////////////////////////////////////////////////////////////////////////////////
			$keys2 = array ("ADJ_EQP"=>($data->eqpt_id), "ADJ_CMPT"=>0);
			$excludes2 = array ("ADJ_EQP"=>0);
			$upd_journal2 = new UpdateJournalClass( "Equipment List", "SFILL_ADJUST", $keys2, $excludes2 );
			// get the old values
			$old_array = array();
			for($i=0; $i<sizeof($data->compartments); $i++)
			{               
				$keys2["ADJ_CMPT"] = $data->compartments[$i]->cmpt_no;
				$upd_journal2->setKeyValues( $keys2 );
				//$sql_txt = "select c.cmpt_capacit+s.adj_amnt as safefill, s.adj_capacity as capacity from compartment c, sfill_adjust s, transp_equip e where c.cmpt_etyp=e.eqpt_etp and e.eqpt_id=s.adj_eqp and c.cmpt_no=s.adj_cmpt and s.adj_eqp=$data->eqpt_id and s.adj_cmpt=".$keys2["ADJ_CMPT"];
				$sql_txt = array();
				$sql_txt['sql_text'] = "select c.cmpt_capacit+s.adj_amnt as safefill, s.adj_capacity as capacity from compartment c, sfill_adjust s, transp_equip e where c.cmpt_etyp=e.eqpt_etp and e.eqpt_id=s.adj_eqp and c.cmpt_no=s.adj_cmpt and s.adj_eqp=:eqpt_id and s.adj_cmpt=:adj_cmpt";
				$sql_txt['sql_data'] = array($data->eqpt_id, $keys2["ADJ_CMPT"]);
				$old_array[$i] = $upd_journal2->getRecordValues($sql_txt);
			}
			/////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			/**************************************************************************************************
                Call CGI to modify compartments
			***************************************************************************************************/           
			logMe("Info: ++++++Modifying compartments limit++++++",EQUIPLISTCLASS);
			$fields = array(
				'sess_id'=>urlencode($data->session_id),
				'equipID'=>urlencode($data->eqpt_id),
				'cmpy'=>urlencode($data->eqpt_owner),
				'op'=>urlencode("13"),
				'ncmpt'=>urlencode( sizeof($data->compartments) ),
			);
			for($i=0; $i<sizeof($data->compartments); $i++)
			{               
				$fields["cmptcap".$data->compartments[$i]->cmpt_no]=urlencode($data->compartments[$i]->cmpt_capacit);
				$fields["cmptsfl".$data->compartments[$i]->cmpt_no]=urlencode($data->compartments[$i]->adj_safefill);
				$fields["sflcap".$data->compartments[$i]->cmpt_no]=urlencode($data->compartments[$i]->adj_capacity);
			}
/*			
	public $cmpt_no;
	public $cmpt_capacit;
	public $unit_id;
	public $unit_title;
	public $adj_amnt;
	public $adj_capacity;
	public $;

SCRIPT_NAME: /cgi-bin/en/load_scheds/equip_list.cgi
begin: 20120525_11:27:39.124773+08
REQUEST_METHOD: GET
COOKIE: sess_id=LqWGqQRydJRU; language=en; reqId=rRrdjhupYDN
REQUEST: cmptcap1=10000&cmptsfl1=9000&sflcap1=11000&cmptcap2=10000&cmptsfl2=10000&sflcap2=10000&cmptcap3=10000&cmptsfl3=10000&sflcap3=10000&cmptcap4=10000&cmptsfl4=10000&sflcap4=10000&cmptcap5=10000&cmptsfl5=10000&sflcap5=10000&cmptcap6=10000&cmptsfl6=10000&sflcap6=10000&cmptcap7=10000&cmptsfl7=10000&sflcap7=10000&cmptcap8=10000&cmptsfl8=10000&sflcap8=10000&cmptcap9=10000&cmptsfl9=10000&sflcap9=10000&ncmpt=9&cmpy=zzzzzzzzz&equipID=998490597&op=13
*/

			$thunkObj = new Thunk($this->host, $this->cgi, $fields);
			$thunkObj->writeToClient($this->cgi);

			$patternSuccess = "var op=23;";
			$isFound = strstr($thunkObj->read(), $patternSuccess);
			if ($isFound == false) {
					logMe("Modify compartment limits failed!!!",EQUIPLISTCLASS);
				return "ERROR";
			}
			logMe("CGI Modify compartment limits!!!",EQUIPLISTCLASS);  
		
			//////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////// new module to log any changes of any fields on any screen ////////////////////////
			////////////////////// After the updates                                         ////////////////////////
			/////////////////////////////////////////////////////////////////////////////////////////////////////////
			// get the new values and record the journal if there were any changes
			$new_array = array();
			for($i=0; $i<sizeof($data->compartments); $i++)
			{               
				$keys2["ADJ_CMPT"] = $data->compartments[$i]->cmpt_no;
				$upd_journal2->setKeyValues( $keys2 );
				//$sql_txt = "select c.cmpt_capacit+s.adj_amnt as safefill, s.adj_capacity as capacity from compartment c, sfill_adjust s, transp_equip e where c.cmpt_etyp=e.eqpt_etp and e.eqpt_id=s.adj_eqp and c.cmpt_no=s.adj_cmpt and s.adj_eqp=$data->eqpt_id and s.adj_cmpt=".$keys2["ADJ_CMPT"];
				$sql_txt = array();
				$sql_txt['sql_text'] = "select c.cmpt_capacit+s.adj_amnt as safefill, s.adj_capacity as capacity from compartment c, sfill_adjust s, transp_equip e where c.cmpt_etyp=e.eqpt_etp and e.eqpt_id=s.adj_eqp and c.cmpt_no=s.adj_cmpt and s.adj_eqp=:eqpt_id and s.adj_cmpt=:adj_cmpt";
				$sql_txt['sql_data'] = array($data->eqpt_id, $keys2["ADJ_CMPT"]);
				$new_array[$i] = $upd_journal2->getRecordValues($sql_txt);
				$upd_journal2->setOldValues( $old_array[$i] );
				$upd_journal2->setNewValues( $new_array[$i] );
				$upd_journal2->log();
			}
			/////////////////////////////////////////////////////////////////////////////////////////////////////////
			
		}
		
		$this->updateEquipmentTitle( $data->eqpt_id, $data->eqpt_title );
		$this->updateEquipmentComments( $data->eqpt_id, $data->eqpt_comments );
		
		if ( $data->eqpt_exp_d1_dmy == "" )
		{
			$this->nullEquipmentDate( $data->eqpt_id, "EQPT_EXP_D1_DMY" );
		}
 		if ( $data->eqpt_exp_d2_dmy == "" )
		{
			$this->nullEquipmentDate( $data->eqpt_id, "EQPT_EXP_D2_DMY" );
		}
		if ( $data->eqpt_exp_d3_dmy == "" )
		{
			$this->nullEquipmentDate( $data->eqpt_id, "EQPT_EXP_D3_DMY" );
		}
		
		$code = $data->eqpt_code;
				
		$sql['sql_text'] = " UPDATE TRANSP_EQUIP SET EQPT_LAST_MODIFIED=current_date WHERE EQPT_CODE=:code";

		$sql['sql_data'] = array( $code );

		$mydb = DB::getInstance();

		$data = $mydb->update($sql);

        return "OK";
    }   
	
	public function nullEquipmentDate($eqpt, $column) 
	{
		
		$mydb = DB::getInstance();
		logMe("*********************************************Date is****************************************************************",EQUIPLISTCLASS);
		logMe("Date: " . $phpdate, EQUIPLISTCLASS);
		//$sql = "UPDATE TRANSP_EQUIP SET $column=NULL WHERE EQPT_ID=$eqpt";
		
		$sql = array();
        $sql['sql_text'] = "UPDATE TRANSP_EQUIP SET $column=NULL WHERE EQPT_ID=:eqpt";
		$sql['sql_data'] = array( $eqpt );
		
		$res = $mydb->update($sql);
		
		if ( $res == RETURN_OK )
		{
			return "OK";
		}
		else
		{
			return "ERROR";
		}
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
		
        logMe("Info: ++++++Deleting equipment list++++++",EQUIPLISTCLASS);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'cmpy'=>urlencode($data->eqpt_owner),
            'equip'=>urlencode($data->eqpt_code),
            'equipID'=>urlencode($data->eqpt_id),
            'cmd'=>urlencode("DEL"),
            'depot'=>urlencode("-1"),
             'op'=>urlencode("19")
        );
//  depot=-1&cmpy=zzzzzzzzz&equip=ZZZZ&equipID=998490592&op=19&cmd=DEL
       $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=29;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) 
		{
			$patternSuccess2 = "var op=14;";
			$isFound2 = strstr($response, $patternSuccess2);
			if ($isFound2 == false) 
			{
				logMe("Delete equipment list failed!!!",EQUIPLISTCLASS);
				$patternFailed = "var op=39;";
				$failed = strstr($response, $patternFailed);            
				if($failed)
				{
					return "DEPENDENCIES";
				}
				else
				{                
//					return "ERROR";
					$patternFailed2 = "var op=24;";
					$failed2 = strstr($response, $patternFailed2);            
					if($failed2)
					{
						return "DEPENDENCIES";
					}
					else
					{                
						return "ERROR";
					}
				}
			}
		
         }
        logMe("CGI Delete equipment list succeeded!!!",EQUIPLISTCLASS);

        return "OK";
    }      

    public function eqLoadTypes()
	{
        $mydb = DB::getInstance();
        $sql="SELECT * FROM EQUIP_LIST_LD_TYPE_LOOKUP";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
		return $rows;
    }
	
	public function toggleCompartmentLock($eqpt, $cmpt) 
	{
		$keys = array("ADJ_EQP"=>urlencode($eqpt), "ADJ_CMPT"=>urlencode($cmpt));
		$excludes = array ("ADJ_EQP"=>0, "ADJ_CMPT"=>0);   
		$upd = new UpdateJournalClass("COMPARTMENTS", "SFILL_ADJUST", $keys, $excludes);
		$upd->setOldValues($upd->getRecordValues());
		
		$mydb = DB::getInstance();
		logMe("*********************************************Date is****************************************************************",EQUIPLISTCLASS);
		logMe("Date: " . $phpdate, EQUIPLISTCLASS);
		//$sql = "UPDATE SFILL_ADJUST SET ADJ_CMPT_LOCK=1-ADJ_CMPT_LOCK WHERE ADJ_EQP=$eqpt and ADJ_CMPT=$cmpt";
		
		$sql = array();
        $sql['sql_text'] = "UPDATE SFILL_ADJUST SET ADJ_CMPT_LOCK=1-ADJ_CMPT_LOCK WHERE ADJ_EQP=:eqpt and ADJ_CMPT=:cmpt";
		$sql['sql_data'] = array( $eqpt, $cmpt );
		
		$res = $mydb->update($sql);
		$upd->setNewValues($upd->getRecordValues());
		$upd->log();
		
		if ( $res == RETURN_OK )
		{
			return "OK";
		}
		else
		{
			return "ERROR";
		}
	}
	
	public function unlockEquipmentCompartments($eqpt) 
	{
		$keys = array("ADJ_EQP"=>urlencode($eqpt));
		$excludes = array ("ADJ_EQP"=>0);   
		$upd = new UpdateJournalClass("EQUIPMENTS", "SFILL_ADJUST", $keys, $excludes);
		// $upd->setOldValues($upd->getRecordValues());
		
		$mydb = DB::getInstance();
		logMe("*********************************************Date is****************************************************************",EQUIPLISTCLASS);
		logMe("Date: " . $phpdate, EQUIPLISTCLASS);
		//$sql = "UPDATE SFILL_ADJUST SET ADJ_CMPT_LOCK=0 WHERE ADJ_EQP=$eqpt";
		
		$sql = array();
        $sql['sql_text'] = "UPDATE SFILL_ADJUST SET ADJ_CMPT_LOCK=0 WHERE ADJ_EQP=:eqpt";
		$sql['sql_data'] = array( $eqpt );
		
		$res = $mydb->update($sql);
		//$upd->setNewValues($upd->getRecordValues());
		$upd->logOneLine(" Unlocked all compartments in equipment [".$eqpt."] ");
		
		if ( $res == RETURN_OK )
		{
			return "OK";
		}
		else
		{
			return "ERROR";
		}
	}
	
	public function unlockTankerCompartments($tnkr) 
	{
		// $keys = array("ADJ_EQP"=>urlencode($eqpt), "ADJ_CMPT"=>urlencode($cmpt));
		// $excludes = array ("ADJ_EQP"=>0, "ADJ_CMPT"=>0);   
		// $upd = new UpdateJournalClass("COMPARTMENT LOCKS", "SFILL_ADJUST", $keys, $excludes);
		// $upd->setOldValues($upd->getRecordValues());
		
		$mydb = DB::getInstance();
		logMe("*********************************************Date is****************************************************************",EQUIPLISTCLASS);
		logMe("Date: " . $phpdate, EQUIPLISTCLASS);
		//$sql = "UPDATE SFILL_ADJUST SET ADJ_CMPT_LOCK=0 WHERE ADJ_EQP in (select TC_EQPT from TNKR_EQUIP where TC_TANKER='$tnkr' ) ";
		
		$sql = array();
        $sql['sql_text'] = "UPDATE SFILL_ADJUST SET ADJ_CMPT_LOCK=0 WHERE ADJ_EQP in (select TC_EQPT from TNKR_EQUIP where TC_TANKER=:tnkr ) ";
		$sql['sql_data'] = array( $tnkr );
		
		$res = $mydb->update($sql);
		//$upd->setNewValues($upd->getRecordValues());
		//$upd->log();
		
		if ( $res == RETURN_OK )
		{
			return "OK";
		}
		else
		{
			return "ERROR";
		}
	}

}
?>
