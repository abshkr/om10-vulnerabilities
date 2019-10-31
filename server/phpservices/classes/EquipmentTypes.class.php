<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../classes/Thunk.class.php');

/* define the module name for calling logMe() to output */
if(!defined('EQUIPTYPESCLASS')) define('EQUIPTYPESCLASS','EquipmentTypes.class');

class EquipmentTypesClass{
    
    public function EquipmentTypesClass(){
		session_start();
		
        if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
            $this->host ="localhost";
        }
 
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "load_scheds/equip_types.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/load_scheds/equip_types.cgi";
        }
    }
	
	public function getAll($filter,$order,$sort)
	{
       $mydb = DB::getInstance();
	   if($order == '')
		  $order = "ORDER BY ETYP_TITLE ASC"; 
	   $orderBy = "ORDER BY $order $sort";
	   
		// TODO: need change FLEX to pass the var|value instead of sql text from front-end for data binding
		/*
        $sql="SELECT * FROM(
                SELECT res.*, ROW_NUMBER() over ($order) RN
                FROM(SELECT * FROM EQUIP_TYPES_VW $filter) res
             )";
        */
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM(
                SELECT res.*, ROW_NUMBER() over ($order) RN
                FROM(SELECT * FROM EQUIP_TYPES_VW " . $filter['sql_text'] . ") res
             )";
		$sql['sql_data'] = $filter['sql_data'];
		
        //logMe("SQL: " . $sql, EQUIPTYPESCLASS);
		$rows = $mydb->query($sql);
        
        $arr = array();
        foreach($rows as $x){
            $comp = $this->getComposition($x->ETYP_ID);
            $x->composition = $comp;
             $arr[] = $x;
        }
        
        //XarrayEncodingConversion($arr);
        return (prepareForAMF($arr, array(0 => "EQUIP_TYPES_VW")));        
	}
    
    public function getPaged($offset,$tot,$filter='',$sort=''){
        $mydb = DB::getInstance();        
        if($sort!='')$sort="ORDER BY $sort";        
	   
		// TODO: need change FLEX to pass the var|value instead of sql text from front-end for data binding
		/*
        //$sql="SELECT ETYP_ID, ETYP_CLASS, ETYP_N_ITEMS, ETYP_TITLE, ETYP_SCHEDUL, NVL(ETYP_IS_DRUMFILL,'N') as ETYP_IS_DRUMFILL, ETYP_MAX_GROSS, ETYP_ISRIGID, CMPTNU, RN FROM (
        $sql="SELECT * FROM(
                SELECT res.*, ROW_NUMBER() over (order by ETYP_ID) RN
                FROM(SELECT * FROM EQUIP_TYPES_VW $filter) res
             )
             where RN between ".($offset+1)." and ".($offset+$tot)." $sort";
        */
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM(
                SELECT res.*, ROW_NUMBER() over (order by ETYP_ID) RN
                FROM(SELECT * FROM EQUIP_TYPES_VW " . $filter['sql_text'] . ") res
             )
             where RN between ".($offset+1)." and ".($offset+$tot)." $sort";
		$sql['sql_data'] = $filter['sql_data'];
		
        $rows = $mydb->query($sql);
        
        $arr = array();
        foreach($rows as $x){
            $comp = $this->getComposition($x->ETYP_ID);
            $x->composition = $comp;
             $arr[] = $x;
        }
        
        //XarrayEncodingConversion($arr);
        return (prepareForAMF($arr, array(0 => "EQUIP_TYPES_VW")));        
    }
    
    public function getComposition($id){
        $mydb = DB::getInstance();
		/*
        $sql="SELECT EQUIP_VW.* ,COMPTS.CMPT_UNITS, EQUIP_TYPES_VW.CMPTNU, ROW_NUMBER() over (order by EQUIP_TYPES_VW.ETYP_ID) IDX, EQUIP_TYPES.ETYP_SCHEDUL as SUB_ITEM_SCHED_TYPE,
                EQUIP_TYPES.ETYP_ISRIGID as SUB_ITEM_ETYP_ISRIGID, EQUIP_TYPES.ETYP_TITLE as EQC_SUB_ITEM_TITLE, 
				(
                 CASE
                   WHEN EQUIP_VW.EQC_SUB_ITEM IS NOT NULL THEN
                   (
                        SELECT ETYP_CATEGORY
                        FROM EQUIP_TYPES
                        WHERE ETYP_ID = EQUIP_VW.EQC_SUB_ITEM
                   )
                 ELSE
                  (
                       SELECT ETYP_CATEGORY
                       FROM   EQUIP_TYPES
                       WHERE  ETYP_ID = $id
                  )
                 END
                ) AS ETYP_CATEGORY
                FROM  EQUIP_TYPES_VW, EQUIP_VW, EQUIP_TYPES,
                (SELECT  * 
                FROM    (
                        SELECT  EQUIP_TYPES_VW.ETYP_ID, CMPT_UNITS, ROW_NUMBER() OVER (PARTITION BY EQUIP_TYPES_VW.ETYP_ID ORDER BY EQUIP_TYPES_VW.ETYP_ID) AS rn
                        FROM    EQUIP_TYPES_VW
                        LEFT OUTER JOIN CMPT_VW
                        ON   CMPT_VW.ETYP_ID_RT = EQUIP_TYPES_VW.ETYP_ID
                )
                WHERE rn = 1) COMPTS  WHERE EQUIP_TYPES_VW.ETYP_ID= EQUIP_VW.ETYP_ID_RT AND COMPTS. ETYP_ID=EQUIP_VW.ETYP_ID AND EQUIP_VW.EQC_SUB_ITEM=EQUIP_TYPES.ETYP_ID(+) AND EQUIP_VW.ETYP_ID_RT=$id ORDER BY EQUIP_VW.ETYP_ID_RT,EQUIP_VW.EQC_COUNT_RT, EQUIP_VW.LVL, EQUIP_VW.EQC_COUNT
                ";
		*/
		$sql = array();
        $sql['sql_text'] = "
		SELECT EQUIP_VW.* ,COMPTS.CMPT_UNITS, EQUIP_TYPES_VW.CMPTNU, ROW_NUMBER() over (order by EQUIP_TYPES_VW.ETYP_ID) IDX, EQUIP_TYPES.ETYP_SCHEDUL as SUB_ITEM_SCHED_TYPE,
                EQUIP_TYPES.ETYP_ISRIGID as SUB_ITEM_ETYP_ISRIGID, EQUIP_TYPES.ETYP_TITLE as EQC_SUB_ITEM_TITLE, 
				(
                 CASE
                   WHEN EQUIP_VW.EQC_SUB_ITEM IS NOT NULL THEN
                   (
                        SELECT ETYP_CATEGORY
                        FROM EQUIP_TYPES
                        WHERE ETYP_ID = EQUIP_VW.EQC_SUB_ITEM
                   )
                 ELSE
                  (
                       SELECT ETYP_CATEGORY
                       FROM   EQUIP_TYPES
                       WHERE  ETYP_ID = :id
                  )
                 END
                ) AS ETYP_CATEGORY
                FROM  EQUIP_TYPES_VW, EQUIP_VW, EQUIP_TYPES,
                (SELECT  * 
                FROM    (
                        SELECT  EQUIP_TYPES_VW.ETYP_ID, CMPT_UNITS, ROW_NUMBER() OVER (PARTITION BY EQUIP_TYPES_VW.ETYP_ID ORDER BY EQUIP_TYPES_VW.ETYP_ID) AS rn
                        FROM    EQUIP_TYPES_VW
                        LEFT OUTER JOIN CMPT_VW
                        ON   CMPT_VW.ETYP_ID_RT = EQUIP_TYPES_VW.ETYP_ID
                )
                WHERE rn = 1) COMPTS  WHERE EQUIP_TYPES_VW.ETYP_ID= EQUIP_VW.ETYP_ID_RT AND COMPTS. ETYP_ID=EQUIP_VW.ETYP_ID AND EQUIP_VW.EQC_SUB_ITEM=EQUIP_TYPES.ETYP_ID(+) AND EQUIP_VW.ETYP_ID_RT=:id 
		";
		$sql['sql_data'] = array( $id );
        $rows = $mydb->query($sql);
        
        $arr = array();
        foreach($rows as $x){
            if($x->EQUIP_ISLEAF != 0){
                if($x->SUB_ITEM_SCHED_TYPE==null){
                    $comp = $this->getCompartmentsDetails($id);
                }else{
                    if($x->EQC_SUB_ITEM!='') $comp = $this->getCompartmentsDetails($x->EQC_SUB_ITEM);
                    else $comp='';
                }
                $x->compartments = $comp;
                $arr[]=$x;
            }
        }
        
		//XXarrayEncodingConversion($arr);
        return (prepareForAMF($arr, array(0 => 'Composition')));
        //return ($arr);
    }
	
    function getCompartmentsDetails($id){
        $mydb = DB::getInstance();
        //$sql="SELECT * FROM COMPARTMENT WHERE CMPT_ETYP=$id";
		
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM COMPARTMENT WHERE CMPT_ETYP=:id";
		$sql['sql_data'] = array( $id );
		
        $rows = $mydb->query($sql);
        $arr = array();
        foreach($rows as $x){
            $x->unit = $this->getUnitScale($x->CMPT_UNITS);
            $arr[]=$x;
        }        
                
        //XarrayEncodingConversion($arr);
        return (prepareForAMF($arr, array(0 => "Compartment")));
    }
    
    function getCompartmentsAll(){
        $mydb = DB::getInstance();
        $sql="SELECT * FROM COMPARTMENT";
        $rows = $mydb->query($sql);
        $arr = array();
        foreach($rows as $x){
            $x->unit = $this->getUnitScale($x->CMPT_UNITS);
            $arr[]=$x;
        }        
                
        //XarrayEncodingConversion($arr);
        return (prepareForAMF($arr, array(0 => "Compartment")));
    }
	
    function getUnitScale($id){
        $mydb = DB::getInstance();
        //$sql="SELECT description FROM UNIT_SCALE_VW WHERE UNIT_ID=$id";
		
		$sql = array();
        $sql['sql_text'] = "SELECT description FROM UNIT_SCALE_VW WHERE UNIT_ID=:id";
		$sql['sql_data'] = array( $id );
        
		$res = $mydb->query($sql);
        return $res[0]->DESCRIPTION;
    }
    
    function getUnitsLookup(){
        $mydb = DB::getInstance();
        $sql="SELECT * FROM UNIT_SCALE_VW WHERE UNIT_ID IN(5,11,17)";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'UnitsLookup')));
    }

    public function updateCompartments($comp)
	{        
		// update CMPT_N_SEALS
		logMe("Info: Update the number of seals for each compartment.",EQUIPTYPESCLASS);
		$mydb = DB::getInstance();
        for( $i=0; $i<sizeof($comp); $i+=1 )
		{
			$n_seals = urlencode($comp[$i]->cmpt_n_seals);
			if ( $n_seals == "" )
			{
				$n_seals = 0;
			}
			$cmpt_no = urlencode($comp[$i]->cmpt_no);
			$cmpt_etyp = urlencode($comp[$i]->cmpt_etyp);
			//$sql = "UPDATE COMPARTMENT SET CMPT_N_SEALS=". $n_seals . " WHERE CMPT_ETYP=". $cmpt_etyp . " and CMPT_NO=". $cmpt_no;
			
			$sql = array();
			$sql['sql_text'] = "UPDATE COMPARTMENT SET CMPT_N_SEALS=:n_seals WHERE CMPT_ETYP=:cmpt_etyp and CMPT_NO=:cmpt_no";
			$sql['sql_data'] = array( $n_seals, $cmpt_etyp, $cmpt_no );
			
			$updresult = $mydb->update($sql);
			if ( $updresult == RETURN_OK )
			{
				logMe("Info: Update the number of seals for compartment ".($cmpt_no),EQUIPTYPESCLASS);
			}
			else
			{
				logMe("Info: Failed to update the number of seals for compartment ".($cmpt_no),EQUIPTYPESCLASS);
			}
        }
        return "OK";
     }  

    public function create($data, $comp){        
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        /**************************************************************************************************
        Call CGI to add equipment type 
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new equipment type++++++",EQUIPTYPESCLASS);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'canBreak'=>urlencode($data->canBreak),
            'eqpNm'=>urlencode($data->eqpNm),
            'sched'=>urlencode($data->sched),
            'op'=>urlencode("17"),
            'rigid'=>urlencode($data->rigid),
            'etyp_category'=>urlencode($data->etyp_category),
            'callerTyp'=>urlencode('flex')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=27;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add equipment type failed!!!",EQUIPTYPESCLASS);
                return "ERROR";
        }
        logMe("CGI Add equipment type succeeded!!!",EQUIPTYPESCLASS);
                
        $eq_id='';
        if(preg_match("/(var eqpCd=)(\d+)(;)/", $response, $out)) $eq_id=$out[2];
        
        if(($data->canBreak=='1')&&($eq_id!='')){
            /**************************************************************************************************
            Start to add items contained in the combination
            ***************************************************************************************************/                       
            foreach($data->objects as $x){
                logMe("Info: ++++++Adding new equipment type sub-object++++++",EQUIPTYPESCLASS);
                $fields = array(
                    'sess_id'=>urlencode($data->session_id),
                    'canBreak'=>urlencode("1"),
                    'eqpCd'=>urlencode($eq_id),
                    'sched'=>urlencode("y"),
                    'subEtyp'=>urlencode($x->etyp_id),
                    'itemNu'=>urlencode($x->cmptnu),
                    'eqpCdCmpts'=>urlencode($x->etyp_id."_".$x->cmptnu),
                    'op'=>urlencode("13"),
                    'callerTyp'=>urlencode('flex')
                );
                $thunkObj = new Thunk($this->host, $this->cgi, $fields);
                $thunkObj->writeToClient($this->cgi);

                $response = $thunkObj->read();
                $patternSuccess = "var op=27;";
                $isFound = strstr($response, $patternSuccess);
                if ($isFound == false){
                    logMe("Add equipment type sub-object failed!!!",EQUIPTYPESCLASS);
                    return "ERROR";
                }
                logMe("CGI Add equipment type sub-object succeeded!!!",EQUIPTYPESCLASS);
            }
		   
			$this->updateEquipmentTypeTitle( $eq_id, $data->eqpNm );
			
            return "OK";
        }else{
            if(($data->sched=='y')&&($eq_id!='')){
                /**************************************************************************************************
                Call CGI to add compartments
                ***************************************************************************************************/           
                logMe("Info: ++++++Adding compartments++++++",EQUIPTYPESCLASS);
                $fields = array(
                    'sess_id'=>urlencode($data->session_id),
                    'canBreak'=>urlencode($data->canBreak),
                    'sched'=>urlencode("y"),
                    'op'=>urlencode("15"),
                    'unit'=>urlencode($comp[0]->unit),
                    'cmpts'=>urlencode(sizeof($comp)),
                    'eqpCd'=>urlencode($eq_id),
                    'callerTyp'=>urlencode('flex')
                );
                for($i=0; $i<sizeof($comp); $i++){               
                    $fields["cmpt$i"]=urlencode($i);
                    $fields["cmptFill$i"]=urlencode($comp[$i]->cmpt_capacit);
                }

                $thunkObj = new Thunk($this->host, $this->cgi, $fields);
                $thunkObj->writeToClient($this->cgi);

                $patternSuccess = "var op=27;";
                $isFound = strstr($thunkObj->read(), $patternSuccess);
                if ($isFound == false) {
                        logMe("Add equipment type failed!!!",EQUIPTYPESCLASS);
                        return "ERROR";
                }
                logMe("CGI Add compartment succeeded!!!",EQUIPTYPESCLASS);        
				
				// update CMPT_N_SEALS
				//$this->updateCompartments( $comp );
				logMe("Info: Update the number of seals for each compartment.",EQUIPTYPESCLASS);
				$mydb = DB::getInstance();
                for($i=0; $i<sizeof($comp); $i+=1)
				{
					$n_seals = urlencode($comp[$i]->cmpt_n_seals);
					if ( $n_seals == "" )
					{
						$n_seals = 0;
					}
					//$sql = "UPDATE COMPARTMENT SET CMPT_N_SEALS=". $n_seals . " WHERE CMPT_ETYP=". $eq_id . " and CMPT_NO=". ($i+1);
					$sql = array();
					$sql['sql_text'] = "UPDATE COMPARTMENT SET CMPT_N_SEALS=:n_seals WHERE CMPT_ETYP=:eq_id and CMPT_NO=:cmpt_no";
					$sql['sql_data'] = array( $n_seals, $eq_id, $i+1 );
					$updresult = $mydb->update($sql);
					if ( $updresult == RETURN_OK )
					{
						logMe("Info: Update the number of seals for compartment ".($i+1),EQUIPTYPESCLASS);
					}
					else
					{
						logMe("Info: Failed to update the number of seals for compartment ".($i+1),EQUIPTYPESCLASS);
					}
                }
			}
		   
			$this->updateEquipmentTypeTitle( $eq_id, $data->eqpNm );
			
            return "OK";
        }
    }  
    
    public function update($data){
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        logMe("Info: ++++++Adding new equipment type++++++",EQUIPTYPESCLASS);
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'eqpCd'=>urlencode($data->eqpCd),
            'sched'=>urlencode($data->sched),
            'op'=>urlencode("16"),
            'rigid'=>urlencode($data->rigid),
            'callerTyp'=>urlencode('flex')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=26;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Edit equipment type failed!!!",EQUIPTYPESCLASS);
                return "ERROR";
        }
        logMe("CGI Edit equipment type succeeded!!!",EQUIPTYPESCLASS);

        return "OK";
    }

	public function checkDependencies($code){
		logMe("Info: ++++++Checking Dependencies++++++",EQUIPTYPESCLASS);
		$mydb = DB::getInstance();
		
		//$sql = "SELECT * FROM GUI_EQUIPMENT_LIST WHERE EQPT_ETP='$code'";
		//logMe("SQL Is: " . $sql, EQUIPTYPESCLASS);
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM GUI_EQUIPMENT_LIST WHERE EQPT_ETP=:code";
		$sql['sql_data'] = array( $code );
		
		$res = $mydb->query($sql);
		//XarrayEncodingConversion($res);
		logMe("Result lenght is: " . count($res), EQUIPTYPESCLASS);
		if(count($res) > 0) {
			logMe("Error: +++++++Tried to delete equiptype in use by equip list+++++++", EQUIPTYPESCLASS);
			return "DEPENDENCIES";
		}
		
		//$sql = "SELECT * FROM GUI_TANKERS WHERE TNKR_ETP='$code'";
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM GUI_TANKERS WHERE TNKR_ETP=:code";
		$sql['sql_data'] = array( $code );
		
		$res = $mydb->query($sql);
		logMe("Result length is: " . count($res), EQUIPTYPESCLASS);
		if(count($res) > 0) {
			logMe("Error: +++++++Tried to delete equiptype in use by tankers+++++++", EQUIPTYPESCLASS);
			return "DEPENDENCIES";
		}
		
		logMe("Error: +++++++Tried to delete equiptype not in use+++++++", EQUIPTYPESCLASS);
		return "PASS";
	}
    
    public function delete($data){
		if( isset($_SESSION['SESSION']) )
		{
			$data->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$data->session_id = "";
		}
		
        logMe("Info: ++++++Deleting equipment type++++++",EQUIPTYPESCLASS);
		//$ tmp = $this->checkDependencies($data->egpCd);
		if($this->checkDependencies($data->eqpCd) == "DEPENDENCIES") {
			logMe("Error: +++++++Dependent+++++++", EQUIPTYPESCLASS);
			return "DEPENDENCIES";
		}
        $fields = array(
            'sess_id'=>urlencode($data->session_id),
            'eqpCd'=>urlencode($data->eqpCd),
            'canBreak'=>urlencode($data->canBreak),
            'noOfcompts'=>urlencode($data->noOfcompts),
            'op'=>urlencode("18"),
            'callerTyp'=>urlencode('flex')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $fields);
        $thunkObj->writeToClient($this->cgi);

        $response = $thunkObj->read();
        $patternSuccess = "var op=28;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
            logMe("Delete equipment type failed!!!",EQUIPTYPESCLASS);
            $patternFailed = "var op=48;";
            $failed = strstr($response, $patternFailed);            
            if($failed){
                return "DEPENDENCIES";
            }else{                
                return "ERROR";
            }
        }
        logMe("CGI Delete equipment type succeeded!!!",EQUIPTYPESCLASS);

        return "OK";
    }      
    
    public function lookup(){
        $mydb = DB::getInstance();
        $sql="SELECT ETYP_ID,ETYP_TITLE FROM EQUIP_TYPES_VW ORDER BY ETYP_TITLE ASC";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'EqptypeLookup')));
    }
    
    public function lookupByFilter($etype, $cmpts){
        $mydb = DB::getInstance();
		/*
        $sql="
				SELECT 
					ETYP_ID
					, ETYP_TITLE
					, ETYP_CLASS
					, CMPTNU 
				FROM 
					EQUIP_TYPES_VW 
				WHERE 
					(-1=$etype or ETYP_CLASS=$etype) 
					and ('-1'='".$cmpts."' or CMPTNU='".$cmpts."') 
				ORDER BY ETYP_TITLE ASC";
		*/
		$sql = array();
        $sql['sql_text'] = "
				SELECT 
					ETYP_ID
					, ETYP_TITLE
					, ETYP_CLASS
					, CMPTNU 
				FROM 
					EQUIP_TYPES_VW 
				WHERE 
					(-1=:etype or ETYP_CLASS=:etype) 
					and ('-1'=:cmpts or CMPTNU=:cmpts) 
				ORDER BY ETYP_TITLE ASC";
		$sql['sql_data'] = array( $etype, $cmpts );
				
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => 'EqptTypeLookupByFilter')));
    }
	
	public function getByTitle($title)
	{
        $mydb = DB::getInstance();
		
        //$sql="SELECT * FROM EQUIP_TYPES_VW WHERE etyp_title='".$title."' or etyp_title like '%".$title."' ";
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM EQUIP_TYPES_VW WHERE etyp_title=:title or etyp_title like '%'||:title||'' ";
		$sql['sql_data'] = array( $title );
		
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => "EQUIP_TYPES_VW")));
	}	
	
	public function updateEquipmentTypeTitle($etyp_id, $name) 
	{
		
		$mydb = DB::getInstance();
		
		$sql = array();
        $sql['sql_text'] = "UPDATE EQUIP_TYPES SET ETYP_TITLE=:etypname WHERE ETYP_ID=:etypid";
		$sql['sql_data'] = array( $name, $etyp_id );
		
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
}
?>
