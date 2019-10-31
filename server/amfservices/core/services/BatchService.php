<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

error_reporting(E_ALL);

/* define the module name for calling logMe() to output */
if(!defined('BATCHSERVICE')) define('BATCHSERVICE','[AMF]BatchService.php');

define ("RETURN_0",     "0");             /* Password is valid */
define ("RETURN_ERR_1", "1");             /* Parameters NOT valid */
define ("RETURN_ERR_2", "2");             /* Two passwords NOT match */
define ("RETURN_ERR_3", "3");             /* Password length invalid */
define ("RETURN_ERR_4", "4");             /* Password complexity invalid */
define ("RETURN_ERR_5", "5");             /* Password changing interval invalid */
define ("RETURN_ERR_6", "6");             /* Password reuse count invalid */
define ("RETURN_ERR_7", "7");             /* Privilege NOT enough*/
define ("RETURN_ERR_8", "8");             /* Personnel operation failed */
define ("RETURN_ERR_EXCEPTION", "-1");    /* Exception */

class BatchService
{
    
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
            $this->cgi = CGIDIR . "access_ctrl/personnel.cgi";
            $this->cgi_eqpt = CGIDIR . "load_scheds/equip_list.cgi";
            $this->cgi_tnkr = CGIDIR . "load_scheds/tanker_list.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/access_ctrl/personnel.cgi";
            $this->cgi_eqpt ="cgi-bin/en/load_scheds/equip_list.cgi";
            $this->cgi_tnkr ="cgi-bin/en/load_scheds/tanker_list.cgi";
        }
    }
	
	
	
	//////////////////////////////////////////////////////////////////////////////
	// Personnel List Batch Service
	/////////////////////////////////////////////////////////////////////////////
    
	
	//get the personnel comment by personnel code
    public function getPersonnelComment($per_code)
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "SELECT PER_COMMENTS FROM GUI_PERSONNEL WHERE PER_CODE=:per_code";
		$sql['sql_data'] = array( $per_code );
		
        $rows = $mydb->query($sql, "N");

		if ( is_null($rows[0]->PER_COMMENTS) == TRUE || $rows[0]->PER_COMMENTS=="" )
		{
			$comments = "";
		}
		else
		{
			$comments = $rows[0]->PER_COMMENTS;
		}
		
		return($comments);
    }
	
	//set the personnel comment by personnel code
    public function setPersonnelComment($per_code, $per_comments)
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "UPDATE PERSONNEL SET PER_COMMENTS=:per_comments WHERE PER_CODE=:per_code ";
		$sql['sql_data'] = array( $per_comments, $per_code );
		
        $comment_res = $mydb->update($sql);
        logMe("Update the personnel comments succeeded!!!",BATCHSERVICE);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
		
		return "OK";
    }
    
    //public function create($perData,$perArray)
    public function createPersonnel($perData)
	{
		if( isset($_SESSION['SESSION']) )
		{
			$perData->session_id = oracle_escape_string($_SESSION['SESSION']);
		}
		else
		{
			$perData->session_id = "";
		}
		
        logMe("Info: ++++++Running into addPersonnel()++++++",BATCHSERVICE);

        /* Validate parameters */
        /*
        $errMsg = '';
        if (!integrityCheck($perData, $errMsg, 'GUI_Personnel')){
            logMe("Invalid parameter. Error message: " . $errMsg,BATCHSERVICE);
            return RETURN_ERR_1;
        }
        */

        /* Check the logon user's privilege */
        /*$service = new ValidateUser($perData->session_id);
        $retArray = $service->getMyScreenPrivs("personnel");
        logMe("Info: PRIV Array [ROLE_ID] " . $retArray[0]['ROLE_ID']);
        logMe("Info: PRIV Array [CGI_ID] " . $retArray[0]['CGI_ID']);
        logMe("Info: PRIV Array [PRIV] " . $retArray[0]['PRIV']);
        if ($retArray[0]['PRIV'] < 6) {
                logMe("Info: Privilege not enough to add Personnel");
                return RETURN_ERR_7;
        } */

        /* Validate password */
        /*
        $pwdChk = new PasswordCheckService();
        $retPwdChk = $pwdChk->checkPwdValidity($perData);
        if ($retPwdChk != 0){
            logMe("Error: checkPwdValidity():" . $retPwdChk,BATCHSERVICE);
            return $retPwdChk;
        }
        */

        logMe("host = " . $this->host,BATCHSERVICE);
        logMe("cgi = " . $this->cgi,BATCHSERVICE);

        /* Call CGI to add personnel */
        $perFields = array(
            'sess_id'=>urlencode($perData->session_id),
            'pers'=>urlencode($perData->per_code),
            'persNm'=>urlencode($perData->per_name),
            'role'=>urlencode($perData->per_auth),
            'dept'=>urlencode($perData->per_department),
            'timeCd'=>urlencode($perData->pt_timecd),
            'persLck'=>urlencode($perData->per_lock),
            'persLcnc'=>urlencode($perData->per_licence_no),
            'area'=>urlencode($perData->perl_ara),
            'op'=>urlencode("18"),
            'cmpy'=>urlencode($perData->per_cmpy),
            'callerTyp'=>urlencode('flex')
            //'newPin'=>urlencode($perData->per_password),
            //'passwd1'=>urlencode($perData->per_passconfirm)
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $perFields);
        $thunkObj->writeToClient($this->cgi);
		$res = $thunkObj->read();
		logMe("************************************************GETTING THAT RESPONSE*******************************************",BATCHSERVICE);
        logMe($res,BATCHSERVICE);
        //$patternSuccess = ">Insert successful</span>";
        $patternSuccess = "var opStatus =180;";
        $isFound = strstr($thunkObj->read(), $patternSuccess);
        if ($isFound == false) {
                logMe("Add personnel failed!!!",BATCHSERVICE);
                return RETURN_ERR_8;
        }
        logMe("CGI Add personnel succeeded!!!",BATCHSERVICE);

        /* Call CGI to add password if it is NOT NULL */
        /* Since creating Personnel always use default password '12345', no need to call it.
        if (strlen($perData->per_password) != 0) {
                $perFields = array(
                        'sess_id'=>urlencode($perData->session_id),
                        'newPin'=>urlencode($perData->per_password),
                        'passwd1'=>urlencode($perData->per_passconfirm),
                        'pers'=>urlencode($perData->per_code),
                        'cmpy'=>urlencode($perData->per_cmpy),
                        'op'=>urlencode("15")
                        );
                $thunkObj = new Thunk($this->host, $this->cgi, $perFields);
                $thunkObj->writeToClient($this->cgi);

                logMe($thunkObj->read());
                $patternSuccess = ">Password set successfully</span>";
                $isFound = strstr($thunkObj->read(), $patternSuccess);
                if ($isFound == false) {
                        logMe("Add password failed!!!");
                        return RETURN_ERR_8;
                }
                logMe("CGI Add password succeeded!!!");
        }
        */

        /* Call CGI to add access number */
        $perFields = array(
            'sess_id'=>urlencode($perData->session_id),
            'lvlNu'=>urlencode($perData->per_level_num),
            'pers'=>urlencode($perData->per_code),
            'cmpy'=>urlencode($perData->per_cmpy),
            'op'=>urlencode("13"),
            'callerTyp'=>urlencode('flex')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $perFields);
        $thunkObj->writeToClient($this->cgi);

        logMe($thunkObj->read(),BATCHSERVICE);
        /*$patternSuccess = "no return string???";*/
		$patternSuccess = "var opStatus =0;";
        $isFound = strstr($thunkObj->read(), $patternSuccess);
        if ($isFound == false) {
                logMe("Add access number failed!!!");
                return RETURN_ERR_8;
        }
        logMe("CGI Add access number succeeded!!!",BATCHSERVICE);

        /* Call CGI to add expiry date */
        $perFields = array(
                'sess_id'=>urlencode($perData->session_id),
                'pers'=>urlencode($perData->per_code),
                'persExp1'=>urlencode($perData->per_exp_d1_dmy),
                'persExp2'=>urlencode($perData->per_exp_d2_dmy),
                'persExp3'=>urlencode($perData->per_exp_d3_dmy),
                'cmpy'=>urlencode($perData->per_cmpy),
                'op'=>urlencode("14"),
                'callerTyp'=>urlencode('flex')
        );
        $thunkObj = new Thunk($this->host, $this->cgi, $perFields);
        $thunkObj->writeToClient($this->cgi);

        logMe($thunkObj->read(),BATCHSERVICE);
        //$patternSuccess = ">Update of expiry date succeeded</span>";
        $patternSuccess = "var opStatus =140;";
        $isFound = strstr($thunkObj->read(), $patternSuccess);
        if ($isFound == false) {
                logMe("Add expiry date failed!!!",BATCHSERVICE);
                return RETURN_ERR_8;
        }
        logMe("CGI Add expiry date succeeded!!!",BATCHSERVICE);

        /* Call CGI to add access area */

        // this clears all lockouts from PERM_OF_AREA table
        /*
        $perOfArea = new Application_Model_DbTable_PERM_OF_AREA();
        $where = $perOfArea->getAdapter()->quoteInto('PERM_PSN = ?', $perData->per_code);
        logMe("delete from PERM_OF_AREA where PERM_PSN = " . $perData->per_code,BATCHSERVICE);
        $count = $perOfArea->delete($where);
        */
        $mydb = DB::getInstance();
        //$sql = "DELETE FROM PERM_OF_AREA WHERE PERM_PSN='" . $perData->per_code . "'";
		$sql = array();
        $sql['sql_text'] = "DELETE FROM PERM_OF_AREA WHERE PERM_PSN=:per_code ";
		$sql['sql_data'] = array( $perData->per_code );
        $rows = $mydb->delete($sql);

        // this add all lockouts to PERM_OF_AREA table
		$sql = array();
		$sql['sql_text'] = "
			INSERT INTO PERM_OF_AREA (PERM_AREA, PERM_PSN) 
			select AREA_K, :per_code from AREA_RC
			";
		$sql['sql_data'] = array( $perData->per_code );
		$res = $mydb->insert($sql);
		
		/*
        $arrCnt = count($perArray);
        logMe("accesslocks array count = ". $arrCnt,BATCHSERVICE);
        for($loop =0; $loop < $arrCnt; $loop++) {
            //$sql = "INSERT INTO PERM_OF_AREA (PERM_AREA, PERM_PSN) VALUES (" . $perArray[$loop]->perm_area .",'" . $perData->per_code ."')";
			$sql = array();
			$sql['sql_text'] = "INSERT INTO PERM_OF_AREA (PERM_AREA, PERM_PSN) VALUES ( :perm_area, :per_code ) ";
			$sql['sql_data'] = array( $perArray[$loop]->perm_area, $perData->per_code );
			$res = $mydb->insert($sql);
        }
		*/
		
        /*$patternSuccess = "no return string???";
        $isFound = strstr($thunkObj->read(), $patternSuccess);
        if ($isFound == false) {
                logMe("Add access area failed!!!");
                return RETURN_ERR_8;
        }*/
        logMe("CGI Add access area succeeded!!!",BATCHSERVICE);
		/*
		// update comments
        //$comment_sql = "UPDATE PERSONNEL SET PER_COMMENTS='" . $perData->per_comments . "' WHERE PER_CODE='" . $perData->per_code ."' ";
		$comment_sql = array();
        $comment_sql['sql_text'] = "UPDATE PERSONNEL SET PER_COMMENTS=:per_comments WHERE PER_CODE=:per_code ";
		$comment_sql['sql_data'] = array( $perData->per_comments, $perData->per_code );
        $comment_res = $mydb->update($comment_sql);
        logMe("Update the personnel comments succeeded!!!",BATCHSERVICE);
		*/
		$this->updatePersonnelName( $perData->per_code, $perData->per_name );
        logMe("Update the personnel name succeeded!!!",BATCHSERVICE);
		$this->updatePersonnelDepartment( $perData->per_code, $perData->per_department );
        logMe("Update the personnel department succeeded!!!",BATCHSERVICE);
		$this->updatePersonnelComments( $perData->per_code, $perData->per_comments );
        logMe("Update the personnel comments succeeded!!!",BATCHSERVICE);
        
        /* Link a role to a user */
        logMe("Info: Linking role to the user...",BATCHSERVICE);
        //$sql = "SELECT USER_ID FROM URBAC_USERS WHERE USER_CODE='" . $perData->per_code . "'";
		$sql = array();
        $sql['sql_text'] = "SELECT USER_ID FROM URBAC_USERS WHERE USER_CODE=:per_code ";
		$sql['sql_data'] = array( $perData->per_code );
        $rows = $mydb->query($sql);
        $user_id = $rows[0]['user_id'];
        $role_id = $perData->per_auth;
        logMe("Info: user_id = ".$user_id,BATCHSERVICE);
        logMe("Info: role_id = ".$role_id,BATCHSERVICE);
        //$sql = "INSERT INTO URBAC_USER_ROLES (USER_ID,ROLE_ID,USER_ROLE_ACTIVE) VALUES(" . $user_id . "," . $role_id . ",1)";
		$sql = array();
        $sql['sql_text'] = "INSERT INTO URBAC_USER_ROLES (USER_ID,ROLE_ID,USER_ROLE_ACTIVE) VALUES( :user_id, :role_id, 1 ) ";
		$sql['sql_data'] = array( $user_id, $role_id );
        $rows = $mydb->insert($sql);
        logMe("Link a role to a user succeeded!!!",BATCHSERVICE);

        logMe("-----------------------------",BATCHSERVICE);
        logMe("Adding personnel succeeded!!!",BATCHSERVICE);
        logMe("-----------------------------",BATCHSERVICE);
        return $rows;
    }
	
	// use this PHP function to update personnel name again so the UTF-8 text will not get corrupted
    public function updatePersonnelName($psnl_code, $psnl_name)
	{
       $mydb = DB::getInstance();

		$sql = array();
        $sql['sql_text'] = "UPDATE PERSONNEL SET PER_NAME=:psnl_name WHERE PER_CODE=:psnl_code ";
		$sql['sql_data'] = array( $psnl_name, $psnl_code );
		
        $result = $mydb->update($sql);
		
        return $result;
    }
	
	// use this PHP function to update personnel department again so the UTF-8 text will not get corrupted
    public function updatePersonnelDepartment($psnl_code, $psnl_dept)
	{
       $mydb = DB::getInstance();

		$sql = array();
        $sql['sql_text'] = "UPDATE PERSONNEL SET PER_DEPARTMENT=:psnl_dept WHERE PER_CODE=:psnl_code ";
		$sql['sql_data'] = array( $psnl_dept, $psnl_code );
		
        $result = $mydb->update($sql);
		
        return $result;
    }
	
	// use this PHP function to update personnel comments again so the UTF-8 text will not get corrupted
    public function updatePersonnelComments($psnl_code, $psnl_note)
	{
       $mydb = DB::getInstance();

		$sql = array();
        $sql['sql_text'] = "UPDATE PERSONNEL SET PER_COMMENTS=:psnl_note WHERE PER_CODE=:psnl_code ";
		$sql['sql_data'] = array( $psnl_note, $psnl_code );
		
        $result = $mydb->update($sql);
		
        return $result;
    }

    public function createBatchPersonnel()
	{
		$fileName=dirname(__FILE__) . "/List_Personnel.csv";
		$contents = "";
		if ( file_exists($fileName) )
		{
			$fd = fopen($fileName, "r");
			$contents = fread($fd, filesize($fileName));
			fclose($fd);
		}
		//return $contents;
		$lines = explode("\r\n", $contents);
		
		$num=0;
		$arr=array();
		$succ_num=0;
		$fail_num=0;
		$fail_codes="";
		foreach( $lines as $row )
		{
			$num += 1;
			if ( $num == 1 ) continue;
			$columns=array();
			$columns = explode(",", $row);
			$data = (object)array();
			$data->per_code 		= trim($columns[0]);
			$data->per_name 		= trim($columns[1]);
			$data->per_auth 		= trim($columns[2]);
			$data->per_department 	= trim($columns[3]);
			$data->pt_timecd 		= trim($columns[4]);
			$data->per_lock 		= trim($columns[5]);
			$data->per_licence_no 	= trim($columns[6]);
			$data->perl_ara 		= trim($columns[7]);
			$data->per_cmpy 		= trim($columns[8]);
			$data->per_exp_d1_dmy 	= $this->convertDateTime($columns[9]);
			$data->per_exp_d2_dmy 	= $this->convertDateTime($columns[10]);
			$data->per_exp_d3_dmy 	= $this->convertDateTime($columns[11]);
			$data->per_level_num 	= 0;
			$data->per_comments 	= "";
			$arr[] = $data;
			$rslt = $this->createPersonnel($data);
			if ( $rslt == RETURN_OK)
			{
				$succ_num += 1;
			}
			else
			{
				$fail_num += 1;
				$fail_codes .= ", " . $data->per_code;
			}
// pers,persNm,role,dept,timeCd,persLck,persLcnc,area,cmpy,persExp1,persExp2,persExp3
		}
		
		return "Success: $succ_num; Failure: $fail_num; Failed: $fail_codes";
		//return $arr;
		//return count($lines);
	}

	public function convertDateTime($dateString)
	{
		if ( strlen(trim($dateString)) == 0 )
		{
			return "";
		}
		
		//$myDateTime = DateTime::createFromFormat('d/m/Y', $dateString);
		//$newDateString = $myDateTime->format('Y-m-d');	
		//return $newDateString;
		$items = explode("/", $dateString);
		$timeInt = mktime(0,0,0, $items[1], $items[0], $items[2]);
		$newDateString = date( 'Y-m-d', $timeInt );
		return $newDateString;
	}
	
	
	
	//////////////////////////////////////////////////////////////////////////////
	// Equipment List Batch Service
	/////////////////////////////////////////////////////////////////////////////
    
    public function createEquipment($data)
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
        Call CGI to add equipment list 
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new equipment list++++++",BATCHSERVICE);
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
        $thunkObj = new Thunk($this->host, $this->cgi_eqpt, $fields);
        $thunkObj->writeToClient($this->cgi_eqpt);

        $response = $thunkObj->read();
        $patternSuccess = "var op=28;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add equipment list failed!!!",BATCHSERVICE);
                return "ERROR";
        }
        logMe("CGI Add equipment list succeeded!!!",BATCHSERVICE);

		
		if( $data->has_cmpt=="1" && sizeof($data->compartments) > 0 )
		{
			/**************************************************************************************************
                Call CGI to modify compartments
			***************************************************************************************************/       
			// Since this is creating process, we need to get the new ID for new equipment with which the cmpt details are updated/created
			
			logMe("Info: ++++++Modifying compartments limit++++++",BATCHSERVICE);
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

			$thunkObj = new Thunk($this->host, $this->cgi_eqpt, $fields);
			$thunkObj->writeToClient($this->cgi_eqpt);

			$patternSuccess = "var op=23;";
			$isFound = strstr($thunkObj->read(), $patternSuccess);
			if ($isFound == false) {
					logMe("Modify compartment limits failed!!!",BATCHSERVICE);
				return "ERROR";
			}
			logMe("CGI Modify compartment limits!!!",BATCHSERVICE);        
		}
		
		$new_id = $this->getEquipmentIdByCode($data->eqpt_code);
		$this->updateEquipmentTitle( $new_id, $data->eqpt_title );
		$this->updateEquipmentComments( $new_id, $data->eqpt_comments );

        return "OK";
//        return "OK__".$new_id;
    }  

    public function getEquipmentIdByCode($code)
	{
        $mydb = DB::getInstance();
		
		$sql = array();
        $sql['sql_text'] = "SELECT EQPT_ID FROM TRANSP_EQUIP where EQPT_CODE=:code";
		$sql['sql_data'] = array( $code );
		
        $rows = $mydb->query($sql, "N");
		if ( sizeof($rows) > 0 )
		{
			return ((integer)$rows[0]->EQPT_ID);
		}
		else
		{
			return "";
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
	
	public function updateEquipmentComments($eqpt, $comments) 
	{
		$mydb = DB::getInstance();
		
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

    public function getEquipmentTypeIdByTitle($title)
	{
        $mydb = DB::getInstance();
		
		$sql = array();
        $sql['sql_text'] = "SELECT ETYP_ID FROM EQUIP_TYPES where ETYP_TITLE=:title";
		$sql['sql_data'] = array( $title );
		
        $rows = $mydb->query($sql, "N");
        //return ((integer)$rows[0]->ETYP_ID);
		if ( sizeof($rows) > 0 )
		{
			return ((integer)$rows[0]->ETYP_ID);
		}
		else
		{
			return "";
		}
    }

    public function getEtypCmptCapacity($etyp_id, $etyp_cmpt)
	{
        $mydb = DB::getInstance();
		
		$sql = array();
        $sql['sql_text'] = "SELECT CMPT_CAPACIT FROM COMPARTMENT where CMPT_ETYP=:etyp_id and CMPT_NO=:cmpt_no";
		$sql['sql_data'] = array( $etyp_id, $etyp_cmpt );
		
        $rows = $mydb->query($sql, "N");
        //return ((integer)$rows[0]->CMPT_CAPACIT);
		if ( sizeof($rows) > 0 )
		{
			return ((integer)$rows[0]->CMPT_CAPACIT);
		}
		else
		{
			return 0;
		}
    }

    public function createBatchEquipment()
	{
		$fileName=dirname(__FILE__) . "/List_Equipment.csv";
		$contents = "";
		if ( file_exists($fileName) )
		{
			$fd = fopen($fileName, "r");
			$contents = fread($fd, filesize($fileName));
			fclose($fd);
		}
		//return $contents;
		$lines = explode("\r\n", $contents);
		
		$num=0;
		$arr=array();
		$succ_num=0;
		$fail_num=0;
		$fail_codes="";
		foreach( $lines as $row )
		{
			$num += 1;
			if ( $num == 1 ) continue;
			$columns=array();
			$columns = explode(",", $row);
			$data = (object)array();
			// equipment level
			$data->eqpt_ownername 		= trim($columns[0]);	//Owner Name, NN
			$data->eqpt_owner 			= trim($columns[1]);	//Owner Code
			$data->eqpt_code 			= trim($columns[2]);	//Equipment Code
			$data->eqpt_id				= "";
			$data->eqpt_title			= $data->eqpt_code;
			$data->eqpt_etpname 		= trim($columns[3]);	//Equipment Type Title, NN
			//$data->eqpt_etp 			= trim($columns[14]);	//Equipment Type Id
			$data->eqpt_etp 			= $this->getEquipmentTypeIdByTitle($data->eqpt_etpname);
			$data->eqpt_lock			= 'N';
			$data->eqp_must_tare_in		= 'N';
			$data->eqpt_empty_kg 		= 0;
			$data->eqpt_max_gross		= 0;
            
			$data->eqpt_safefill1 		= trim($columns[4]);	//Actual Safefill Cmpt 1
			$data->eqpt_safefill2 		= trim($columns[5]);	//Actual Safefill Cmpt 2
			$data->eqpt_safefill3 		= trim($columns[6]);	//Actual Safefill Cmpt 3
			$data->eqpt_safefill4 		= trim($columns[7]);	//Actual Safefill Cmpt 4
			$data->eqpt_safefill5 		= trim($columns[8]);	//Actual Safefill Cmpt 5
			$data->eqpt_safefill6 		= trim($columns[9]);	//Actual Safefill Cmpt 6
			$data->eqpt_safefill7 		= trim($columns[10]);	//Actual Safefill Cmpt 7
			$data->eqpt_safefill8 		= trim($columns[11]);	//Actual Safefill Cmpt 8
			
			$data->eqpt_area 			= trim($columns[12]);	//Area
			$data->eqpt_load_type 		= trim($columns[13]);	//Load Type
			if ($data->eqpt_load_type == "Bottom")
			{
				$data->eqpt_load_type = "B";
			}
			else
			{
				$data->eqpt_load_type = "A";
			}
			
			$data->eqpt_exp_d1_dmy 		= $this->convertDateTime($columns[15]);
			$data->eqpt_exp_d2_dmy 		= $this->convertDateTime($columns[16]);
			$data->eqpt_exp_d3_dmy 		= $this->convertDateTime($columns[17]);
			$data->eqpt_comments 		= "";
            
			$data->eqpt_capacity1 		= trim($columns[18]);	//Actual Capacity Cmpt 1
			$data->eqpt_capacity2 		= trim($columns[19]);	//Actual Capacity Cmpt 2
			$data->eqpt_capacity3 		= trim($columns[20]);	//Actual Capacity Cmpt 3
			$data->eqpt_capacity4 		= trim($columns[21]);	//Actual Capacity Cmpt 4
			$data->eqpt_capacity5 		= trim($columns[22]);	//Actual Capacity Cmpt 5
			$data->eqpt_capacity6 		= trim($columns[23]);	//Actual Capacity Cmpt 6
			$data->eqpt_capacity7 		= trim($columns[24]);	//Actual Capacity Cmpt 7
			$data->eqpt_capacity8 		= trim($columns[25]);	//Actual Capacity Cmpt 8
			
			// compartment level
			$data->compartments = array();
			for( $i=0; $i<8; $i++ )
			{
				$eqsf = 'eqpt_safefill'.($i+1);
				$eqcp = 'eqpt_capacity'.($i+1);
				if ( strlen($data->{$eqsf}) == 0 )
				{
					break;
				}
				else
				{
					$data->compartments[$i] = (object)array();
					$data->compartments[$i]->cmpt_no = $i+1;
					//$data->compartments[$i]->cmpt_capacit = $data->{$eqsf};
					$etyp_cmpt_capacit = $this->getEtypCmptCapacity($data->eqpt_etp, ($i+1));
					$data->compartments[$i]->cmpt_capacit = $etyp_cmpt_capacit;
					$data->compartments[$i]->adj_safefill = $data->{$eqsf};
					if ( strlen($data->{$eqcp}) == 0 )
					{
						$data->compartments[$i]->adj_capacity = $data->{$eqsf};
					}
					else
					{
						$data->compartments[$i]->adj_capacity = $data->{$eqcp};
					}
				}
			}
			
			if ( sizeof($data->compartments) > 0 )
			{
				$data->has_cmpt="1";
			}
			else
			{
				$data->has_cmpt="0";
			}
			
			//return "1111111111111111111112".$eqsf."--------".($data->{$eqsf})."$$$$$$$$$";
			$arr[] = $data;
			$rslt = $this->createEquipment($data);
			if ( $rslt == "OK")
			{
				$succ_num += 1;
			}
			else
			{
				$fail_num += 1;
				$fail_codes .= ", " . $data->eqpt_code;
			}

		}
		
		return "Success: $succ_num; Failure: $fail_num; Failed: $fail_codes";
		//return $arr;
		//return count($lines);
	}
	
	
	
	//////////////////////////////////////////////////////////////////////////////
	// Tanker List Batch Service
	/////////////////////////////////////////////////////////////////////////////
    
    public function createTanker($data)
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
        Call CGI to add tanker list 
        ***************************************************************************************************/
        logMe("Info: ++++++Adding new tanker list++++++",BATCHSERVICE);
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
			'remarks'=>urlencode($data->remarks),
            'cmd'=>urlencode("ADD"),
           'op'=>urlencode("18")
        );
        $thunkObj = new Thunk($this->host, $this->cgi_tnkr, $fields);
        $thunkObj->writeToClient($this->cgi_tnkr);

        $response = $thunkObj->read();
        $patternSuccess = "var op=48;";
        $isFound = strstr($response, $patternSuccess);
        if ($isFound == false) {
                logMe("Add tanker list failed!!!",BATCHSERVICE);
                return "ERROR";
        }
        logMe("CGI Add tanker list succeeded!!!",BATCHSERVICE);

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
			logMe("Info: ++++++Modifying tanker equipments++++++",BATCHSERVICE);
			
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

			$thunkObj = new Thunk($this->host, $this->cgi_tnkr, $fields);
			$thunkObj->writeToClient($this->cgi_tnkr);

			$patternSuccess = "var op=14;";
			$isFound = strstr($thunkObj->read(), $patternSuccess);
			if ($isFound == false) {
					logMe("Modify tanker equipments failed!!!",BATCHSERVICE);
				return "ERROR";
			}
			logMe("CGI Modify tanker equipments!!!",BATCHSERVICE);        
		}

		// update tanker name
		$this->updateTankerName( $data->tnkr_code, $data->tnkr_name );

		// update tanker comment
		$this->updateTankerComment( $data->tnkr_code, $data->remarks );

        return "OK";
    }  
	
    public function updateTankerName($code, $name)
	{
        $mydb = DB::getInstance();
		
		$sql = array();
        $sql['sql_text'] = "update TANKERS set TNKR_NAME=:tnkrname where TNKR_CODE=:tnkrcode";
		$sql['sql_data'] = array( $name, $code );
		
        $result = $mydb->update($sql);
		
        return $result;
    }
	
    public function updateTankerComment($code, $note)
	{
        $mydb = DB::getInstance();
		
		$sql = array();
        $sql['sql_text'] = "update TANKERS set REMARKS=:note where TNKR_CODE=:code";
		$sql['sql_data'] = array( $note, $code );
		
        $result = $mydb->update($sql);
		
        return $result;
    }

    public function getEquipmentTypeByCode($code)
	{
        $mydb = DB::getInstance();
		
		$sql = array();
        $sql['sql_text'] = "SELECT EQPT_ETP FROM TRANSP_EQUIP where EQPT_CODE=:code";
		$sql['sql_data'] = array( $code );
		
        $rows = $mydb->query($sql, "N");
        //return ((integer)$rows[0]->EQPT_ETP);
		if ( sizeof($rows) > 0 )
		{
			return ((integer)$rows[0]->EQPT_ETP);
		}
		else
		{
			return "";
		}
    }

    public function createBatchTanker()
	{
		$fileName=dirname(__FILE__) . "/List_Tanker.csv";
		$contents = "";
		if ( file_exists($fileName) )
		{
			$fd = fopen($fileName, "r");
			$contents = fread($fd, filesize($fileName));
			fclose($fd);
		}
		//return $contents;
		$lines = explode("\r\n", $contents);
		
		$num=0;
		$arr=array();
		$succ_num=0;
		$fail_num=0;
		$fail_codes="";
		foreach( $lines as $row )
		{
			$num += 1;
			if ( $num == 1 ) continue;
			$columns=array();
			$columns = explode(",", $row);
			$data = (object)array();
			// tanker level
			$data->tnkr_base_sitename 	= trim($columns[0]);	//Base Depot Name, NN
			$data->tnkr_etpname 		= trim($columns[1]);	//Equipment Type Title, NN
			$data->tnkr_etp 			= $this->getEquipmentTypeIdByTitle($data->tnkr_etpname);//Equipment Type Id
			$data->tnkr_ownername 		= trim($columns[2]);	//Owner Name, NN
			$data->tnkr_carriername 	= trim($columns[3]);	//Carrier Name, NN
			$data->tnkr_carrier 		= trim($columns[4]);	//Carrier Code
			$data->tnkr_code 			= trim($columns[5]);	//Tanker Code
			$data->tnkr_owner 			= trim($columns[6]);	//Owner Code
			$data->eqpt_1 				= trim($columns[7]);	//Equipment A Code
			$data->eqpt_2 				= trim($columns[8]);	//Equipment B Code
			$data->eqpt_3 				= trim($columns[9]);	//Equipment C Code
			$data->eqpt_4 				= trim($columns[10]);	//Equipment D Code
			$data->eqpt_5 				= trim($columns[11]);	//Equipment E Code
			$data->eqpt_6 				= trim($columns[12]);	//Equipment F Code
			$data->eqpt_7 				= trim($columns[13]);	//Equipment G Code
			$data->eqpt_8 				= trim($columns[14]);	//Equipment H Code
			$data->etyp_1 				= $this->getEquipmentTypeByCode($data->eqpt_1);//Equipment A Type Id
			$data->etyp_2 				= $this->getEquipmentTypeByCode($data->eqpt_2);//Equipment B Type Id
			$data->etyp_3 				= $this->getEquipmentTypeByCode($data->eqpt_3);//Equipment C Type Id
			$data->etyp_4 				= $this->getEquipmentTypeByCode($data->eqpt_4);//Equipment D Type Id
			$data->etyp_5 				= $this->getEquipmentTypeByCode($data->eqpt_5);//Equipment E Type Id
			$data->etyp_6 				= $this->getEquipmentTypeByCode($data->eqpt_6);//Equipment F Type Id
			$data->etyp_7 				= $this->getEquipmentTypeByCode($data->eqpt_7);//Equipment G Type Id
			$data->etyp_8 				= $this->getEquipmentTypeByCode($data->eqpt_8);//Equipment H Type Id
			$data->tnkr_base_site 		= trim($columns[15]);	//Base Depot Code
			$data->tnkr_cur_depot		= $data->tnkr_base_site;
			$data->tnkr_last_depot		= $data->tnkr_base_site;
			$data->tnkr_dest_depot		= $data->tnkr_base_site;
			$data->tnkr_name			= $data->tnkr_code;
			$data->tnkr_archive			= 'N';
			$data->tnkr_bay_loop_ch		= 'N';
			$data->tnkr_active			= 'N';
			$data->tnkr_lock			= 'N';
			$data->tnkr_ntrips 			= 0;
			$data->tnkr_max_kg			= 0;
			$data->tnkr_stats 			= "";
			$data->tnkr_own_txt 		= "";
			$data->tnkr_pin 			= "";
			$data->remarks 				= "";
			$data->tnkr_last_trip 		= "";
			$data->tnkr_lic_exp 		= $this->convertDateTime($columns[16]);
			$data->tnkr_dglic_exp 		= $this->convertDateTime($columns[17]);
			$data->tnkr_ins_exp 		= $this->convertDateTime($columns[18]);
			
			// equipment level
			$data->eqpt_count = 0;
			for( $i=0; $i<8; $i++ )
			{
				$eqpt_index = "eqpt_".($i+1);
				$etyp_index = "etyp_".($i+1);
				if ( strlen($data->{$eqpt_index}) > 0 && strlen($data->{$etyp_index}) > 0)
				{
					$data->eqpt_count += 1;
				}
				else
				{
					break;
				}
			}
			
			$arr[] = $data;
			$rslt = $this->createTanker($data);
			if ( $rslt == "OK")
			{
				$succ_num += 1;
			}
			else
			{
				$fail_num += 1;
				$fail_codes .= ", " . $data->tnkr_code;
			}

		}
		
		return "Success: $succ_num; Failure: $fail_num; Failed: $fail_codes";
		//return $arr;
		//return count($lines);
	}
    
	
}
?>