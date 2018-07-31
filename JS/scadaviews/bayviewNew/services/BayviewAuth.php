<?php
require_once( dirname(__FILE__) . '/../../../amfservices/core/services/bootstrap.php' );

if(!defined('BAYVIEWAUTH')) define('BAYVIEWAUTH','[AMF]-BayviewAuth.class');

class BayviewAuth
{
    var $username;
    var $password;
    var $server;    
    var $connect;
    var $mylang='ENG';

    public function __construct(){
        session_start();
        $this->username = $_SERVER['OMEGA_USER'];
        $this->password = $_SERVER['OMEGA_PWD'];
        $this->DBPort   = $_SERVER['OMEGA_DBPORT'];
        if ( strlen($this->DBPort) > 0 ){
            $DBPort = ":".$this->DBPort;
        }
        if(isset($_SERVER['DB_ENCRYPT']) && ($_SERVER['DB_ENCRYPT'] == 'YES' || $_SERVER['DB_DECRYPT'] == 'yes')){
            $temp = decrypt_user_pwd($this->password);
            $this->password = $temp;
        }
        $this->server = "localhost".$DBPort."/".$_SERVER['OMEGA_DBASE'];
        
        // determine the charset dynamically 
        $charset = "";
        if ( isset($_SERVER['NLS_LANG']) )
        {
            if ( strtoupper($_SERVER['NLS_LANG']) == "ENGLISH_AUSTRALIA.AL32UTF8" )
            {
                $charset = "utf8";
            }
            else
            if ( strtoupper($_SERVER['NLS_LANG']) == "ENGLISH_AUSTRALIA.ZHS16GBK" )
            {
                $charset = "zhs16gbk";
            }
            else
            {
                $clist = explode( ".", $_SERVER['NLS_LANG'] );
                if ( count( $clist ) >= 2 )
                {
                    $charset = $clist[1];
                }
            }
        }
        if ( strlen($charset) > 0 )
        {
            $this->connect = oci_connect($this->username,$this->password,$this->server, $charset);
        }
        else
        {
            $this->connect = oci_connect($this->username,$this->password,$this->server);
        }

    }


    // write a function to get CUrrent Session in simplified format
    public function getSessionStatus(){
        if(isset($_SESSION['SESSION']) && isset($_SESSION['PERCODE'])){
            // get the session varible and sanitize it in case somebody hijacked our session
            $curr_session_id = $this->oracle_escape_string($_SESSION['SESSION']);
            $user              = $this->oracle_escape_string($_SESSION['PERCODE']);
            $lang              = $this->oracle_escape_string($_SESSION['LANGUAGE']);
            // initialize the result Object
            $result          = array();
            // insert the Server Time
            $result['SERVER_TIME'] = date('Y-m-d H:i');
            // build the SQL for retrieving a valid session variable then insert it to the result object
            $sql              = "SELECT sess_id SESSION_ID FROM HTTP_SESSION_TRACE WHERE per_code='$user' and sess_id='$curr_session_id'";
            $stid              = oci_parse($this->connect, $sql);
            $valid_session      = array();
            oci_execute($stid);
            while ($row = oci_fetch_object($stid))$valid_session[] = $row;
            $result['VALID_SESSION'] = (sizeof($valid_session)>=1);
            return $result;
        }
        return false;
    }
    // write a function to handle login
    public function login($username, $password, $rev_pass, $langcode='ENG'){
        // first rule og order, the moment this function is being called, clear the session
        //unset($_SESSION);
        // sanitize Username and password
        $username = $this->oracle_escape_string($username);
        $password = $this->oracle_escape_string($password);
        $rev_pass = $this->oracle_escape_string($rev_pass);
        // check if session already exist when username and password are blank
        if(isset($_SESSION['SESSION_OBJECT'])){
            if($username == "" && $password == ""){
                return $_SESSION['SESSION_OBJECT'];
            }else{
                return "VALID SESSION STILL RUNNING";
            }
        }else{
            if($username == "" && $password == ""){
                return "NO VALID SESSION";
            }else{
                $_SESSION     = array();
                // build up the CGI request
                //$url         = 'https://'.$_SERVER['HTTP_HOST'].'/cgi-bin/en/login.cgi';
                $url         = 'https://'.$_SERVER['SERVER_ADDR'].'/cgi-bin/en/login.cgi';
                $clientip    = $_SERVER['REMOTE_ADDR'];
                //$url         = 'https://127.0.0.1/cgi-bin/en/login.cgi';
                $data        = array('lang' => $langcode, 'oput' => 'XML', 'lock' => 'N', 'usr' => $username, 'pwd' => $password, 'clientip' => $clientip, 'hash' => $rev_pass);
                $options     = array(
                    'http'       => array(
                    'header'  => "Content-type: text/xml\r\n",
                    'method'  => 'POST',
                    'content' => http_build_query($data)
                    )
                );
                $context      = stream_context_create($options);
                // create request to CGI
                $result     = file_get_contents($url, false, $context);
                // convert xml to Array
                $xml         = simplexml_load_string($result);
                $json         = json_encode($xml);
                $array         = json_decode($json,TRUE);
                // if login sucessful, lets fill in the session variables;
                if(isset($array['MSG_DESC'])){
                    if($array['MSG_DESC'] == "SUCCESS"){
                        $_SESSION['SESSION']  = $array['USER_DETAIL']['USER_SESSION'];
                        $_SESSION['MANAGER']  = $array['USER_DETAIL']['ISMANAGER_CMPY'];
                        $_SESSION['LANGUAGE'] = $array['USER_DETAIL']['USER_LANG'];
                        $_SESSION['COMPANY']  = $array['USER_DETAIL']['USER_CMPY'];
                        $_SESSION['SITECODE'] = $array['USER_DETAIL']['SITE_CODE'];
                        $_SESSION['PERCODE']  = $array['USER_DETAIL']['USER_CODE'];
                        $_SESSION['PERNAME']  = $array['USER_DETAIL']['USER_NAME'];
                        $_SESSION['CLIENTIP']  = $array['USER_DETAIL']['USER_CLIENTIP'];
                        // kill USER_SESSION
                        unset($array['USER_DETAIL']['USER_SESSION']);
                        // inesrt Auxilary Datas
                        $array["EXPIRY_DATE_TITLES"] = $this->expiryDateTitles();
                        //$array["SITE_CONFIG"]          = $this->siteConfig();
                        $_SESSION['SESSION_OBJECT']  = $array;
                    }else{
                        $_SESSION = array();
                    }
                }
                return $array;
            }
        }
        // never should reach this line
        return "THE WORLD OF PROGRAMMING HAS BEEN DESTROYED";
    }
    // write a function to handle logout
    public function logout(){
        if(isset($_SESSION['SESSION']) && isset($_SESSION['PERCODE'])){
            $sess_id = $this->oracle_escape_string($_SESSION['SESSION']);
            $usr      = $this->oracle_escape_string($_SESSION['PERCODE']);
            // build up the CGI request
            //$url = 'https://'.$_SERVER['HTTP_HOST'].'/cgi-bin/en/logout.cgi';
            $url = 'https://'.$_SERVER['SERVER_ADDR'].'/cgi-bin/en/logout.cgi';
            //$url = 'https://127.0.0.1/cgi-bin/en/logout.cgi';
            $data = array('sess_id' => $sess_id, 'usr' => $usr);
            $options = array(
                'http' => array(
                'header'  => "Content-type: text/xml\r\n",
                'method'  => 'POST',
                'content' => http_build_query($data)
                )
            );
            $context  = stream_context_create($options);
            // create request to CGI
            $result   = file_get_contents($url, false, $context);
            $_SESSION = array();
            return true;
        }
        return false;        
    }
    // write a function to handle passwordchange
    public function updatePassword($oldPassword, $newPassword, $user_id = null){
        if(isset($_SESSION['SESSION']) && isset($_SESSION['PERCODE'])){

            $chown = true;
            // check if user ID is null or not, if null, change own password
            if($user_id == null){
                $usr = $this->oracle_escape_string($_SESSION['PERCODE']);
            }else{
                // check permisiion of this user have user update permision first here <------
                $usr = $this->oracle_escape_string($user_id);
                $chown = false;
            }
            // action decision
            $sess_id         = $this->oracle_escape_string($_SESSION['SESSION']);
            $oldPassword     = $this->oracle_escape_string($oldPassword);
            $newPassword     = $this->oracle_escape_string($newPassword);
            
            // check previous passwords
            $sql             = "SELECT CONFIG_VALUE VAL from SITE_CONFIG where CONFIG_KEY='URBAC_PWD_REUSE'";
            $stid             = oci_parse($this->connect, $sql);
            $data              = array();oci_execute($stid);while (($row = oci_fetch_object($stid))){$data[] = $row;}
            $val             = $data[0]->VAL;
            $sql             = "SELECT PWDTRACE_PWD FROM URBAC_PWD_TRACES,URBAC_USERS,PERSONNEL WHERE PWDTRACE_USERID=USER_ID AND USER_CODE = PER_CODE AND PER_CODE ='$usr' ORDER BY PWDTRACE_LAST_CHG DESC";
            $stid             = oci_parse($this->connect, $sql);
            oci_execute($stid);
            while (($row = oci_fetch_object($stid)) && $val > 0 ){
                $val      = $val-1;
                $pwdHist = $row->PWDTRACE_PWD;
                $pwdCurr = crypt($newPassword,'a1\0');
                // YES! there have to be 3 '=' Like thiss => '==='
                // if you put only  like this "=="  things blow up lah!
                if(strpos($pwdHist, $pwdCurr) === 0){
                    $o = array();
                    $o['MSG_DESC'] = "ERROR";
                    $o['MSG_CODE'] = 2;
                    return $o;
                };
            }
            
            // build up the CGI request
            //$url = 'https://'.$_SERVER['HTTP_HOST'].'/cgi-bin/en/atm/setpass.cgi';
            //$data = array('sess_id' => $sess_id, 'usr' => $usr, 'old_pwd' => $oldPassword, 'pwd' => $newPassword, 'reset' => 'N');
            //$url = 'https://'.$_SERVER['HTTP_HOST'].'/cgi-bin/en/atm/resetpassword.cgi';
            $url = 'https://'.$_SERVER['SERVER_ADDR'].'/cgi-bin/en/atm/resetpassword.cgi';
            //$url = 'https://127.0.0.1/cgi-bin/en/atm/resetpassword.cgi';
            
            if($chown){
                $data = array('sess_id' => $sess_id, 'old_pwd' => $oldPassword, 'new_pwd' => $newPassword);
            }else{
                $data = array('sess_id' => $sess_id, 'usr' => $usr, 'new_pwd' => $newPassword);
            }

            $options = array(
                'http' => array(
                'header'  => "Content-type: text/xml\r\n",
                'method'  => 'POST',
                'content' => http_build_query($data)
                )
            );
            $context      = stream_context_create($options);
            // create request to CGI
            $result       = file_get_contents($url, false, $context);
            $xml         = simplexml_load_string($result);
            $json         = json_encode($xml);
            $array         = json_decode($json,TRUE);
            return $array;
        }
        return false;
    }

    private function getAuxWidgetData(){
        $data = array();
        // getting Tankers Count
        $sql   = "SELECT (SELECT count(tnkr_code) FROM tankers) TANKER_TOTAL ,
                         (SELECT count(tnkr_code) FROM tankers WHERE TNKR_ACTIVE = 'Y') TANKER_ACTIVE 
                         FROM dual";
        $stid  = oci_parse($this->connect, $sql);
        oci_execute($stid);
        $row   = oci_fetch_object($stid);
        $data["TANKER_TOTAL"]     = $row->TANKER_TOTAL;
        $data["TANKER_ACTIVE"]     = $row->TANKER_ACTIVE;
        // Getting Personnels COunt
        $sql   = "SELECT (SELECT count(user_code) FROM URBAC_USERS) PERSONNEL_TOTAL,
                         (SELECT count(user_code) FROM URBAC_USERS WHERE user_status_flag = 1) PERSONNEL_ACTIVE
                         FROM dual";
        $stid  = oci_parse($this->connect, $sql);
        oci_execute($stid);
        $row   = oci_fetch_object($stid);
        $data["PERSONNEL_TOTAL"]  = $row->PERSONNEL_TOTAL;
        $data["PERSONNEL_ACTIVE"] = $row->PERSONNEL_ACTIVE;
        // Getting Active IDs
        //$sql   = "SELECT count(*) AID FROM (SELECT kya_key_no, kya_key_issuer FROM access_keys)";
        $sql = "SELECT upper(ktyp.key_name) key_type_name ,count(akey.kya_key_no) key_count
                FROM access_keys akey, key_typ ktyp
                WHERE akey.kya_type = ktyp.key_id(+)
                GROUP BY ktyp.key_name
                ORDER BY key_type_name";
        $stid  = oci_parse($this->connect, $sql);
        oci_execute($stid);

        $ActiveID = array();
        while ($row = oci_fetch_object($stid)){$ActiveID[] = $row;}
        $data["ActiveID"] = $ActiveID;
        // getting Current Folio Information
        $sql = "SELECT TRANS.TRSA_BAY_CD AS \"bay_number\"
            ,COUNT(DISTINCT TRSALDID_LOAD_ID) AS \"com_un_loads\"
            ,CASE 
                WHEN MAX(TRSF.TRSF_IOTYPE) = - 1
                    THEN CASE MAX(TRSF_UNIT)
                            WHEN 5
                                THEN SUM(TRSF_QTY_AMB)
                            WHEN 11
                                THEN SUM(TRSF_QTY_COR)
                            WHEN 17
                                THEN SUM(TRSF_LOAD_KG)
                            WHEN 28
                                THEN SUM(TRSF_QTY_AMB)
                            END
                --WHEN MAX(TRSF.TRSF_IOTYPE) <> - 1
                --        THEN SUM(TRSF_DELIVERED)
                ELSE CASE MAX(TRSF_UNIT)
                        WHEN 5
                            THEN SUM(TRSF_QTY_AMB)
                        WHEN 11
                            THEN SUM(TRSF_QTY_COR)
                        WHEN 17
                            THEN SUM(TRSF_LOAD_KG)
                        WHEN 28
                            THEN SUM(TRSF_QTY_AMB)
                        END
                END AS \"total_products\"
            ,CASE 
                WHEN MAX(TRSF.TRSF_IOTYPE) = - 1
                    THEN CASE MAX(TRSF_UNIT)
                            WHEN 5
                                THEN ROUND(SUM(TRSF_QTY_AMB) / COUNT(DISTINCT TRSALDID_LOAD_ID))
                            WHEN 11
                                THEN ROUND(SUM(TRSF_QTY_COR) / COUNT(DISTINCT TRSALDID_LOAD_ID))
                            WHEN 17
                                THEN ROUND(SUM(TRSF_LOAD_KG) / COUNT(DISTINCT TRSALDID_LOAD_ID))
                            WHEN 28
                                THEN ROUND(SUM(TRSF_QTY_AMB) / COUNT(DISTINCT TRSALDID_LOAD_ID))
                            END
                --WHEN MAX(TRSF.TRSF_IOTYPE) <> - 1
                --        THEN ROUND(SUM(TRSF_DELIVERED) / COUNT(DISTINCT TRSALDID_LOAD_ID))
                ELSE CASE MAX(TRSF_UNIT)
                        WHEN 5
                            THEN ROUND(SUM(TRSF_QTY_AMB) / COUNT(DISTINCT TRSALDID_LOAD_ID))
                        WHEN 11
                            THEN ROUND(SUM(TRSF_QTY_COR) / COUNT(DISTINCT TRSALDID_LOAD_ID))
                        WHEN 17
                            THEN ROUND(SUM(TRSF_LOAD_KG) / COUNT(DISTINCT TRSALDID_LOAD_ID))
                        WHEN 28
                            THEN ROUND(SUM(TRSF_QTY_AMB) / COUNT(DISTINCT TRSALDID_LOAD_ID))
                        END
                END AS \"avg_qty_per_load\"
        FROM TRANSFERS TRSF
            ,(
                SELECT *
                FROM TRANSACTIONS
                WHERE TRSA_ST_DMY > (
                        SELECT *
                        FROM (
                            SELECT PREV_CLOSEOUT_DATE
                            FROM CLOSEOUTS CLS
                            WHERE CLS.CLOSEOUT_DATE IS NULL
                                AND CLS.STATUS = 0
                            ORDER BY CLS.CLOSEOUT_NR DESC
                            )
                        WHERE ROWNUM = 1
                        )
                ) TRANS
        WHERE TRANS.TRSA_ID = TRSF.TRSFTRID_TRSA_ID
            AND TRANS.TRSA_TERMINAL = TRSF.TRSFTRID_TRSA_TRM
        GROUP BY TRANS.TRSA_BAY_CD
        ORDER BY TRANS.TRSA_BAY_CD";

        /// Remove this on release /////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /*$sql = "SELECT trans.trsa_bay_cd AS \"bay_number\"
                    ,count(DISTINCT trsaldid_load_id) AS \"com_un_loads\"
                    ,sum(trsf_delivered) AS \"total_products\"
                    ,round(sum(trsf_delivered) / count(DISTINCT trsaldid_load_id)) AS \"avg_qty_per_load\"
                FROM transfers trsf
                ,(
                       SELECT *
                       FROM transactions
                       WHERE trsa_st_dmy > (to_date('01/01/2010 00:00:00', 'dd/mm/yyyy hh24:mi:ss'))
                       ) trans
                WHERE trans.trsa_id = trsf.trsftrid_trsa_id
                AND trans.trsa_terminal = trsf.trsftrid_trsa_trm
                GROUP BY trans.trsa_bay_cd";
        */
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        $stid  = oci_parse($this->connect, $sql);
        oci_execute($stid);
        $currentFolio = array();
        while ($row = oci_fetch_object($stid)){$currentFolio[] = $row;}
        $data["CurrentFolio"] = $currentFolio;
        // getting Tanker Movement Details
        $sql = "SELECT baysperload
                    ,count(DISTINCT trsaldid_load_id) noofloads
                    ,sum(delivered) quantity
                    ,round(count(DISTINCT trsaldid_load_id) / (SELECT sum(noofloads) tolalnoofloads
                                                            FROM (SELECT count(DISTINCT trsaldid_load_id) noofloads
                                                                   FROM (SELECT trsaldid_load_id
                                                                          ,count(DISTINCT trsa_bay_cd) AS baysperload
                                                                          ,sum(trsf_delivered) AS delivered
                                                                        FROM transactions trans,transfers trsf
                                                                        WHERE trans.trsa_id = trsf.trsftrid_trsa_id
                                                                       AND trans.trsa_terminal = trsf.trsftrid_trsa_trm
                                                                       GROUP BY trsaldid_load_id)
                                                               GROUP BY baysperload)
                                                        ),4) * 100 percentage_noofloads
                FROM (SELECT trsaldid_load_id
                        ,count(DISTINCT trsa_bay_cd) AS baysperload
                           ,sum(trsf_delivered) AS delivered
                      FROM transactions trans,transfers trsf
                      WHERE trans.trsa_id = trsf.trsftrid_trsa_id
                           AND trans.trsa_terminal = trsf.trsftrid_trsa_trm
                      GROUP BY trsaldid_load_id) 
                GROUP BY baysperload
                ORDER BY baysperload";
        $stid  = oci_parse($this->connect, $sql);
        oci_execute($stid);
        $tankerMovement = array();
        // initialize data
        $tankerMovement[0] = array("BAYSPERLOAD"=>"1", "NOOFLOADS"=>0, "QUANTITY"=>0, "PERCENTAGE_NOOFLOADS" => 0);
        $tankerMovement[1] = array("BAYSPERLOAD"=>"2", "NOOFLOADS"=>0, "QUANTITY"=>0, "PERCENTAGE_NOOFLOADS" => 0);
        $tankerMovement[2] = array("BAYSPERLOAD"=>"3", "NOOFLOADS"=>0, "QUANTITY"=>0, "PERCENTAGE_NOOFLOADS" => 0);
        $tankerMovement[3] = array("BAYSPERLOAD"=>"4 or more", "NOOFLOADS"=>0, "QUANTITY"=>0, "PERCENTAGE_NOOFLOADS" => 0);
        while ($row = oci_fetch_object($stid)){
            $idx = (int)$row->BAYSPERLOAD-1;
            if($idx>3)$idx = 3;
            $tankerMovement[$idx]["NOOFLOADS"]                 += (int)$row->NOOFLOADS;
            $tankerMovement[$idx]["QUANTITY"]                 += (float)$row->QUANTITY;
            $tankerMovement[$idx]["PERCENTAGE_NOOFLOADS"]     += (float)$row->PERCENTAGE_NOOFLOADS;
        }

        $data["TankerMovement"] = $tankerMovement;


        // Max Transaction ID
        $sql  = "SELECT TRSA_BAY_CD BAY_CODE, max(TRSA_ID) MAX_TRANSACTION_ID, count(TRSA_ID) CNT_TRANSACTION_ID FROM TRANSACTIONS GROUP BY TRSA_BAY_CD ORDER BY TRSA_BAY_CD";
        $stid = oci_parse($this->connect, $sql);
        oci_execute($stid);
        $transID = array();
        while ($row = oci_fetch_object($stid)){$transID[] = $row;}
        $data["MaxTransactionID"] = $transID;

        return $data;
    }


    private function oracle_escape_string($str){
        $str = str_replace("'", "\'", $str);
        $str = str_replace(";", "", $str);
        return str_replace("\"", "\\\"", $str);
    }

    private function expiryDateTitles()
	{
		// get SITE_EXPIRY_DATE_MANAGE_MODE
        $sql = "SELECT CONFIG_VALUE FROM SITE_CONFIG where CONFIG_KEY='SITE_EXPIRY_DATE_MANAGE_MODE'";
        $stid  = oci_parse($this->connect, $sql);
        oci_execute($stid);
        $data = array();
        while ($row = oci_fetch_object($stid))
		{
			$data[] = $row;
		}
		if ( count($data) == 0 )
		{
			$EXP_DATE_MODE = 1;
		}
		else
		{
			$EXP_DATE_MODE = $data[0]->CONFIG_VALUE;
		}
        
		if ( $EXP_DATE_MODE <= 1 )
		{
			$sql = "SELECT * FROM EXPIRY_DATE";
			$stid  = oci_parse($this->connect, $sql);
			oci_execute($stid);
			$data = array();
			while ($row = oci_fetch_object($stid))
			{
				$data[] = $row;
			}
			return $data;
		}
		else
		{
			$sql = "SELECT * FROM EXPIRY_DATE_TYPES where EDT_DEFAULT>0";
			$stid  = oci_parse($this->connect, $sql);
			oci_execute($stid);
			$data = array();
			while ($row = oci_fetch_object($stid))
			{
				$newrow=array();
				// default equipment exp types
				if ( $row->EDT_TARGET_CODE=="TRANSP_EQUIP" && $row->EDT_TYPE_CODE=="EQPT_EXPIRY_DATE_1" )
				{
					$newrow['EXPIRY_DATE_NO'] = 1;
				}
				if ( $row->EDT_TARGET_CODE=="TRANSP_EQUIP" && $row->EDT_TYPE_CODE=="EQPT_EXPIRY_DATE_2" )
				{
					$newrow['EXPIRY_DATE_NO'] = 2;
				}
				if ( $row->EDT_TARGET_CODE=="TRANSP_EQUIP" && $row->EDT_TYPE_CODE=="EQPT_EXPIRY_DATE_3" )
				{
					$newrow['EXPIRY_DATE_NO'] = 3;
				}
				// default personnel exp types
				if ( $row->EDT_TARGET_CODE=="PERSONNEL" && $row->EDT_TYPE_CODE=="PSNL_EXPIRY_DATE_1" )
				{
					$newrow['EXPIRY_DATE_NO'] = 4;
				}
				if ( $row->EDT_TARGET_CODE=="PERSONNEL" && $row->EDT_TYPE_CODE=="PSNL_EXPIRY_DATE_2" )
				{
					$newrow['EXPIRY_DATE_NO'] = 5;
				}
				if ( $row->EDT_TARGET_CODE=="PERSONNEL" && $row->EDT_TYPE_CODE=="PSNL_EXPIRY_DATE_3" )
				{
					$newrow['EXPIRY_DATE_NO'] = 6;
				}
				// default tanker exp types
				if ( $row->EDT_TARGET_CODE=="TANKERS" && $row->EDT_TYPE_CODE=="TNKR_EXPIRY_DATE_1" )
				{
					$newrow['EXPIRY_DATE_NO'] = 7;
				}
				if ( $row->EDT_TARGET_CODE=="TANKERS" && $row->EDT_TYPE_CODE=="TNKR_EXPIRY_DATE_2" )
				{
					$newrow['EXPIRY_DATE_NO'] = 8;
				}
				if ( $row->EDT_TARGET_CODE=="TANKERS" && $row->EDT_TYPE_CODE=="TNKR_EXPIRY_DATE_3" )
				{
					$newrow['EXPIRY_DATE_NO'] = 9;
				}
				$newrow['EXPIRY_DATE_TITL'] = $row->EDT_TYPE_DESC;
				$newrow['EXPIRY_DATE_REJA'] = ($row->EDT_REJECT>0?'Y':'N');
				$newrow['EXPIRY_DATE_DESC'] = $row->EDT_TYPE_CODE;
				$index = $newrow['EXPIRY_DATE_NO']-1;
				$data[$index] = (object)$newrow;
			}
			
			return $data;
		}
		
    }

    private function expiryDateTitlesOld(){
        $sql = "SELECT * FROM EXPIRY_DATE";
        $stid  = oci_parse($this->connect, $sql);
        oci_execute($stid);
        $data = array();
        while ($row = oci_fetch_object($stid)){$data[] = $row;}
        return $data;
    }
    private function siteConfig(){
        $sql = "SELECT * FROM SITE_CONFIG";
        $stid  = oci_parse($this->connect, $sql);
        oci_execute($stid);
        $data = array();
        while ($row = oci_fetch_object($stid)){$data[] = $row;}
        return $data;
    }
    private function userRole(){
        
    }

    
}