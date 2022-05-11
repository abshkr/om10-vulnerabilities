<?php
require_once('Global.class.php');
require_once('SetSessionService.php');
require_once('SecureAuth.php');
require_once(dirname(__FILE__) . '/../plugs/libs/PHP-SQL-Parser/src/PHPSQLParser.php');

if(!defined('DBCLASS')) define('DBCLASS','[AMF]-DB.class');

class DB{
    private static $dbInstance;
    private $tokendata;
    var $username;
    var $password;
    var $database;
    var $port;
    var $server;
    var $connect;

    private function doConnection()
    {
        $this->username = $GLOBALS['DB_USER'];
        $this->password = $GLOBALS['DB_PWD'];
        if ( isset($_SERVER['DB_ENCRYPT']) && ( $_SERVER['DB_ENCRYPT'] == 'YES' || $_SERVER['DB_DECRYPT'] == 'yes' ) ) 
        {
            $temp = decrypt_user_pwd($this->password);
            $this->password = $temp;
        }
        $this->database = $GLOBALS['DB_DBASE'];
        $this->port     = $GLOBALS['DB_PORT'];
        $this->server   = $GLOBALS['DB_NAME'];
		
        if(defined('DEBUG') && DEBUG =='YES') {
            logMe("GLOBAL DB_USER:" . "[" . $this->username . "], DB_PWD:" . "[" . $this->password . "], DB_NAME:" . "[" . $this->server . "]", DBCLASS);
        }
        
        if( $GLOBALS['DB_USER'] = NULL or $GLOBALS['DB_PWD'] = NULL or $GLOBALS['DB_NAME'] = NULL )
        {
            logMe("Connect DB has not got all valid params",DBCLASS);
            return DB_RETURN_FAIL;
        }
		
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
		
        if( !($this->connect) )
        {
            $e = oci_error();
            $this->logError($e);
            logMe("Connect DB failed:" . $e['message'], DBCLASS);
            return DB_RETURN_FAIL;
        }
    }
    
    private function __construct(){
        $a = func_get_args();
        $i = func_num_args();
        if (method_exists($this, $f='__construct'.$i)) {
            call_user_func_array(array($this,$f), $a);
        } 
    }

    private function __construct0() {
		session_start();
        $this->doConnection();
        
        /* setting lang, ismanager and cmpycode to session */
        try
        {
            // Get session data
            /* Obsoleted
            $sess_obj = new SetSessionService();
            $session_id = $sess_obj->getSessionVar('SESSION');
            $lang = $sess_obj->getSessionVar('LANGUAGE');
            $ismanager = $sess_obj->getSessionVar('MANAGER');
            $ismanager = ($ismanager == 'T') ? 'Y' : 'N';
            $cmpycode = $sess_obj->getSessionVar('COMPANY');
            */
            $session_id = $_SESSION['SESSION'];
            $lang = $_SESSION['LANGUAGE'];
            $ismanager = $_SESSION['MANAGER'];
            $ismanager = ($ismanager == 'T') ? 'Y' : 'N';
            $cmpycode = $_SESSION['COMPANY'];
            $percode = $_SESSION['PERCODE'];
            $clientip = $_SERVER['REMOTE_ADDR'];

            logMe("Info: SESSION_DATA -- session id=".$session_id.",lang=".$lang.",ismanager=".$ismanager.",cmpycode=".$cmpycode.",percode=".$percode.",client ip=".$clientip, DBCLASS);
        }
        catch (Exception $e) {
            logMe("Error: Failed to get session data.", DBCLASS);
        }

        $this->setSessionData($lang, $ismanager, $cmpycode, $percode, $clientip);
    }

    private function __construct4($username, $password, $server, $sessionid) {
        logMe("calling __construct4()", DBCLASS);
        $this->username = $username;
        $this->password = $password;
        $this->server = $server;
        $this->doConnection();
        
        // Get session settings from session table.
        $lang = $this->getSessionData("LANG", $sessionid);
        $lang = ($lang == null) ? 'ENG' : $lang;
        $ismanager = $this->getSessionData("ISMANAGER", $sessionid);
        $ismanager = ($ismanager == 'T') ? 'Y' : 'N';
        $cmpycode = $this->getSessionData("CMPYCODE", $sessionid);
        $percode = $this->getSessionData("PERCODE", $sessionid);
        $clientip = $_SERVER['REMOTE_ADDR'];
        $this->logInfo("LANG==>".$lang);
        $this->logInfo("ISMANAGER==>".$ismanager);
        $this->logInfo("CMPYCODE==>".$cmpycode);
        $this->logInfo("PERCODE==>".$percode);
        $this->logInfo("CLIENT IP==>".$clientip);
                                
        $this->setSessionData($lang, $ismanager, $cmpycode, $percode, $clientip);
    }
    
    public function getSessionData($field, $sessionid) {
        $sql = "";
        $resArray = array();
        switch ($field) {
        case "LANG":
            $sql = "SELECT LANG FIELD FROM HTTP_SESSION_TRACE WHERE SESS_ID='" . $sessionid . "'";
            break;                                   
        case "ISMANAGER":
            $sql = "SELECT ISMANAGER FIELD FROM HTTP_SESSION_TRACE WHERE SESS_ID='" . $sessionid . "'";
            break;
        case "CMPYCODE":
            $sql = "SELECT CMPY_CODE FIELD FROM HTTP_SESSION_TRACE WHERE SESS_ID='" . $sessionid . "'";
            break;
        case "PERCODE":
            $sql = "SELECT PER_CODE FIELD FROM HTTP_SESSION_TRACE WHERE SESS_ID='" . $sessionid . "'";
            break;
        default:
            return null;
        }
        
        logMe("SQL==>" . $sql, DBCLASS);
        $stid = oci_parse($this->connect, $sql);
        if (oci_execute($stid)) {
            while (($row = oci_fetch_object($stid))) {
                $resArray[] = $row;
            }
            return ($resArray[0]->FIELD);
        }
        else {
            return null;
        }
    }

    public function setSessionData($lang, $ismanager, $cmpycode, $percode, $clientip) {
        $stid1 = oci_parse($this->connect, "BEGIN adt.SET_LANG(:lang); END;");
        oci_bind_by_name($stid1, ":lang", $lang);
        oci_execute($stid1);
        oci_free_statement($stid1);
        
        $stid2 = oci_parse($this->connect, "BEGIN adt.SET_ISMANAGER(:ismanager); END;");
        oci_bind_by_name($stid2, ":ismanager", $ismanager);
        oci_execute($stid2);
        oci_free_statement($stid2);
        
        $stid3 = oci_parse($this->connect, "BEGIN adt.SET_CMPYCODE(:cmpycode); END;");
        oci_bind_by_name($stid3, ":cmpycode", $cmpycode);
        oci_execute($stid3);
        oci_free_statement($stid3);

        $stid4 = oci_parse($this->connect, "BEGIN adt.SET_PERCODE(:percode); END;");
        oci_bind_by_name($stid4, ":percode", $percode);
        oci_execute($stid4);
        oci_free_statement($stid4);

		$cnt_sql = "select * from user_procedures where object_name='ADT' and procedure_name='SET_CLIENTIP'";
		if ( $this->count($cnt_sql) > 0 )
		{
			logMe("adt.SET_CLIENTIP exists!", DBCLASS);
			$stid5 = oci_parse($this->connect, "BEGIN adt.SET_CLIENTIP(:clientip); END;");
			oci_bind_by_name($stid5, ":clientip", $clientip);
			oci_execute($stid5);
			oci_free_statement($stid5);
		}
		else
		{
			logMe("adt.SET_CLIENTIP is not found!", DBCLASS);
		}
    }
    
    public static function getInstance(){ 
        if (!self::$dbInstance){ 
            self::$dbInstance = new DB(); 
        }
        
        $secAu = new SecureAuth();
        if (!($secAu->getSessionStatus()))
        {
            logMe("Session ID not valid any more", DBCLASS);
            return null;
        }
        
        return self::$dbInstance;
    }

    /* getInstance with 4 parameters */
    public static function getInstance4p($username, $password, $server, $sessionid) {
        if (!self::$dbInstance) { 
            self::$dbInstance = new DB($username, $password, $server, $sessionid);
        } 
        return self::$dbInstance; 
    }
	
	
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // SQL Injection Mitigation [START]                                                          //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // A PHP SQL Parser(php-sql-parser) is used in these functions.                              //
    // https://code.google.com/p/php-sql-parser/                                                 //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
    * Run a query by binding parameters to its tokens to get the row count.
    *
    * @param string $sql        The SQL query
    * @param array  $param_arr  The parameter array used in the query
    * @return                   Row count 
    */
    public function auto_binding_count($sql, $param_arr) {
        $parser = new PHPSQLParser();

        $sqlCount = "SELECT COUNT(*) REC_COUNT FROM ($sql)";

        // Clear previous token data array.
        $this->tokendata = array();

        // Parse the query.
        $parsed = $parser->parse($sqlCount);

        // Find the tokens in the query.
        $token_arr = $this->findToken($parsed);
        //logMe("token_arr count=" . count($token_arr), DBCLASS); $it = 0; foreach ($token_arr as $t) {logMe("token_arr[" . $it ."]=" . $token_arr[$it++], DBCLASS);}
        //logMe("param_arr count=" . count($param_arr), DBCLASS); $it = 0; foreach ($param_arr as $t) {logMe("param_arr[" . $it ."]=" . $param_arr[$it++], DBCLASS);}

        $stid = oci_parse($this->connect, $sqlCount);

        // Perform the auto binding.
        $idx = 0;
        foreach ($token_arr as $token) {
            oci_bind_by_name($stid, $token, $param_arr[$idx++]);
        }

        // Execute and fetch data.
        oci_execute($stid);
        $row = oci_fetch_object($stid);
        $num = $row->REC_COUNT;

        // Free resources.
        oci_free_statement($stid);

        return $num;
    }

    /**
    * Run a query by binding parameters to its tokens.
    *
    * @param string $query      The SQL query
    * @param array  $param_arr  The parameter array used in the query
    * @param string $type       The flag for converting to upper or lower case
    * @param string $mode       The flag for OCI commit mode
    * @return                   Data array
    */
    public function auto_binding_exec($query, $param_arr, $type="L", $mode = OCI_COMMIT_ON_SUCCESS) {
        $parser = new PHPSQLParser();

        //$row_count = $this->auto_binding_count($query, $param_arr);

        // Parse the query.
        $parsed = $parser->parse($query);

        // Clear previous token data array.
        $this->tokendata = array();

        // Find the tokens in the query.
        $token_arr = $this->findToken($parsed);
        logMe("token_arr count=" . count($token_arr), DBCLASS); $it = 0; foreach ($token_arr as $t) {logMe("token_arr[" . $it ."]=" . $token_arr[$it++], DBCLASS);}
        logMe("param_arr count=" . count($param_arr), DBCLASS); $it = 0; foreach ($param_arr as $t) {logMe("param_arr[" . $it ."]=" . $param_arr[$it++], DBCLASS);}

        $stid = oci_parse($this->connect, $query);

        // Perform the auto binding.
        $idx = 0;
        foreach ($token_arr as $token) {
            oci_bind_by_name($stid, $token, $param_arr[$idx++]);
        }

        // Execute and fetch data.
        if(oci_execute($stid, $mode)) {
            $row = oci_fetch_object($stid);
        } else {
            $this->logError(oci_error($stid));
            return DB_RETURN_FAIL;
        }
        /*$resArray = array();
        if(oci_execute($stid, $mode)) {
            while (($row = oci_fetch_object($stid))) {
                if ($type == "N") {
                    $resArray[] = $row;
                } else {
                    $resArray[] = convertKeyCase($row, $type);
                }
            }
        } else {
            $this->logError(oci_error($stid));
            return DB_RETURN_FAIL;
        }*/

        //$data->count = $row_count;
        //$data->sqls = $query;

        // Conversion and encoding.
        //XarrayEncodingConversion($resArray);
        //$data->data = (json_encode($resArray));

        // Free resources.
        oci_free_statement($stid);

        //return $data;
        return $row;
    }

    /**
    * Run a query by binding parameters to its tokens.(for Zend PHP)
    *
    * @param string $query      The SQL query
    * @param array  $param_arr  The parameter array used in the query
    * @param string $type       The flag for converting to upper or lower case
    * @param string $mode       The flag for OCI commit mode
    * @return                   Data array
    */
    public function auto_binding_exec_zend($query, $param_arr, $type="L", $mode = OCI_COMMIT_ON_SUCCESS) {
        $parser = new PHPSQLParser();

        // Parse the query.
        $parsed = $parser->parse($query);

        // Clear previous token data array.
        $this->tokendata = array();

        // Find the tokens in the query.
        $token_arr = $this->findToken($parsed);
        // logMe("token_arr count=" . count($token_arr), DBCLASS); $it = 0; foreach ($token_arr as $t) {logMe("token_arr[" . $it ."]=" . $token_arr[$it++], DBCLASS);}
        // logMe("param_arr count=" . count($param_arr), DBCLASS); $it = 0; foreach ($param_arr as $t) {logMe("param_arr[" . $it ."]=" . $param_arr[$it++], DBCLASS);}

        $stid = oci_parse($this->connect, $query);

        // Perform the auto binding.
        $idx = 0;
        foreach ($token_arr as $token) {
            oci_bind_by_name($stid, $token, $param_arr[$idx++]);
        }

        // Execute and fetch data.
        $resArray = array();
        if(oci_execute($stid, $mode)) {
            while (($row = oci_fetch_object($stid))) {
                if ($type == "N") {
                    $resArray[] = $row;
                } else {
                    //$resArray[] = convertKeyCase($row, $type);
                    $resArray[] = $row;
                }
            }
        } else {
            $this->logError(oci_error($stid));
            return DB_RETURN_FAIL;
        }

        // Free resources.
        oci_free_statement($stid);

        return $resArray;
    }

    /**
    * Run an insert query by binding parameters to its tokens.
    *
    * Obsoleted.
    * Use insert() instead.
    *
    * @param string $query      The SQL query
    * @param array  $param_arr  The parameter array used in the query
    * @param string $mode       The flag for OCI commit mode
    * @return                   String (Success or Fail_DB)
    */
    public function auto_binding_insert($query, $param_arr, $mode = OCI_COMMIT_ON_SUCCESS) {
        $parser = new PHPSQLParser();

        // Parse the query.
        $parsed = $parser->parse($query);

        // Clear previous token data array.
        $this->tokendata = array();

        // Find the tokens in the query.
        $token_arr = $this->findToken($parsed);
        logMe("token_arr count=" . count($token_arr), DBCLASS); $it = 0; foreach ($token_arr as $t) {logMe("token_arr[" . $it ."]=" . $token_arr[$it++], DBCLASS);}
        logMe("param_arr count=" . count($param_arr), DBCLASS); $it = 0; foreach ($param_arr as $t) {logMe("param_arr[" . $it ."]=" . $param_arr[$it++], DBCLASS);}

        $stid = oci_parse($this->connect, $query);

        // Perform the auto binding.
        $idx = 0;
        foreach ($token_arr as $token) {
            oci_bind_by_name($stid, $token, $param_arr[$idx++]);
        }

        // Execute the query.
        if(oci_execute($stid, $mode) && oci_num_rows($stid) > 0) {
            return RETURN_OK;
        } else {
            $this->logError(oci_error($stid));
            return DB_RETURN_FAIL;
        }
    }

    /**
    * Run an update query by binding parameters to its tokens.
    *
    * Obsoleted.
    * Use update() instead.
    *
    * @param string $query      The SQL query
    * @param array  $param_arr  The parameter array used in the query
    * @param string $mode       The flag for OCI commit mode
    * @return                   String (Success or Fail_DB)
    */
    public function auto_binding_update($query, $param_arr, $mode = OCI_COMMIT_ON_SUCCESS) {
        $parser = new PHPSQLParser();

        // Parse the query.
        $parsed = $parser->parse($query);

        // Clear previous token data array.
        $this->tokendata = array();

        // Find the tokens in the query.
        $token_arr = $this->findToken($parsed);
        logMe("token_arr count=" . count($token_arr), DBCLASS); $it = 0; foreach ($token_arr as $t) {logMe("token_arr[" . $it ."]=" . $token_arr[$it++], DBCLASS);}
        logMe("param_arr count=" . count($param_arr), DBCLASS); $it = 0; foreach ($param_arr as $t) {logMe("param_arr[" . $it ."]=" . $param_arr[$it++], DBCLASS);}

        $stid = oci_parse($this->connect, $query);

        // Perform the auto binding.
        $idx = 0;
        foreach ($token_arr as $token) {
            oci_bind_by_name($stid, $token, $param_arr[$idx++]);
        }

        // Execute the query.
        if(oci_execute($stid, $mode) && oci_num_rows($stid) > 0) {
            return RETURN_OK;
        } else {
            $this->logError(oci_error($stid));
            return DB_RETURN_FAIL;
        }
    }

    /**
    * Run a delete query by binding parameters to its tokens.
    *
    * Obsoleted.
    * Use delete() instead.
    *
    * @param string $query      The SQL query
    * @param array  $param_arr  The parameter array used in the query
    * @param string $mode       The flag for OCI commit mode
    * @return                   String (Success or Fail_DB)
    */
    public function auto_binding_delete($query, $param_arr, $mode = OCI_COMMIT_ON_SUCCESS) {
        $parser = new PHPSQLParser();

        // Parse the query.
        $parsed = $parser->parse($query);

        // Clear previous token data array.
        $this->tokendata = array();

        // Find the tokens in the query.
        $token_arr = $this->findToken($parsed);
        logMe("token_arr count=" . count($token_arr), DBCLASS); $it = 0; foreach ($token_arr as $t) {logMe("token_arr[" . $it ."]=" . $token_arr[$it++], DBCLASS);}
        logMe("param_arr count=" . count($param_arr), DBCLASS); $it = 0; foreach ($param_arr as $t) {logMe("param_arr[" . $it ."]=" . $param_arr[$it++], DBCLASS);}

        $stid = oci_parse($this->connect, $query);

        // Perform the auto binding.
        $idx = 0;
        foreach ($token_arr as $token) {
            oci_bind_by_name($stid, $token, $param_arr[$idx++]);
        }

        // Execute the query.
        if(oci_execute($stid, $mode) && oci_num_rows($stid) > 0) {
            return RETURN_OK;
        } else {
            $this->logError(oci_error($stid));
            return DB_RETURN_FAIL;
        }
    }

    /**
    * Get the distinct tokens from a parsed SQL array.
    *
    * @param array $arr        The parsed SQL array
    * @return                  The distinct token array
    */
    public function findToken($arr) {
        // Regular expression for getting the token ':xxxxx'.
        $regex = '/^:.*/';

        if (!is_array($arr)) {
            return $this->tokendata;
        }
        foreach ($arr as $key => $val) {
            if (is_array($val)) {
                $this->findToken($val);
            } else {
                $trim_val = trim($val);
                // Find tokens having the key 'base_expr' and it must start with symbol ':'.
                if (strcasecmp($key, 'base_expr') == 0 && preg_match($regex, $trim_val) != 0) {
                    // Remove repeated token as we only need it once.
                    // If the token doesn't exist in the return array, add it to the array.
                    $found = false;
                    foreach ($this->tokendata as $repeat) {
                        if (strcasecmp($repeat, $trim_val) == 0) {
                           $found = true;
                           break;
                        }
                    }
                    if ($found == false) {
                        $this->tokendata[] = $trim_val;
                    }
                }
            }
        }

        return $this->tokendata;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // SQL Injection Mitigation [END]                                                            //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
    * Prepare a sql statement handler by binding parameters to its tokens.
    *
    * @param string $query      The SQL query
    * @param array  $param_arr  The parameter array used in the query
    * @return                   Returns a statement handler on success, or FALSE on error
    */
    public function prepare_sql_handler_by_binding($query, $param_arr) 
	{
        $parser = new PHPSQLParser();

        // Parse the query.
        $parsed = $parser->parse($query);

        // Clear previous token data array.
        $this->tokendata = array();

        // Find the tokens in the query.
		// logMe("query raw=" . $query, DBCLASS);
        $token_arr = $this->findToken($parsed);
        logMe("token_arr count=" . count($token_arr), DBCLASS); $it = 0; foreach ($token_arr as $t) {logMe("token_arr[" . $it ."]=" . $token_arr[$it++], DBCLASS);}
        logMe("param_arr count=" . count($param_arr), DBCLASS); $it = 0; foreach ($param_arr as $t) {logMe("param_arr[" . $it ."]=" . $param_arr[$it++], DBCLASS);}

        $stid = oci_parse($this->connect, $query);

        // Perform the auto binding.
        $idx = 0;
        foreach ($token_arr as $token) {
            //oci_bind_by_name($stid, $token, $param_arr[$idx++]);
            //oci_bind_by_name($stid, $token, stringEncodingConversion($param_arr[$idx++]));
			$param_value = stringEncodingConversion($param_arr[$idx++]);
			logMe("query binding index=" . $idx, DBCLASS);
			logMe("query binding token=" . $token, DBCLASS);
			logMe("query binding value=" . $param_value, DBCLASS);
            $bind_result = oci_bind_by_name($stid, $token, $param_value);
			logMe("query binding result=" . $bind_result, DBCLASS);
        }

		return $stid;
    }

    /**
    * Prepare a sql statement handler either by binding parameters to its tokens or directly without binding.
    *
    * @param string or array 	$query_object      	The SQL query if it is a String, otherwise it is an array containing sql and parameters for binding
    * @return                   					Returns a statement handler on success, or FALSE on error
    */
    public function prepare_sql_handler($query_object) 
	{
		// if the query_object is a string, we do the normal sql handler without binding
		if ( is_string( $query_object ) === TRUE )
		{
			$stid = oci_parse($this->connect, $query_object);
		}
		else
		{
			// if the query_object is an array, it must contains two elements: sql_text for a sql base and sql_data for a parameter array, now we do the sql handler by binding
			if ( is_array( $query_object ) === TRUE )
			{
				if ( array_key_exists( 'sql_text', $query_object ) ) 
				{
					$sql_text = $query_object['sql_text'];
				}
				else
				{
					$sql_text = "";
				}
				if ( array_key_exists( 'sql_data', $query_object ) ) 
				{
					$sql_data = $query_object['sql_data'];
				}
				else
				{
					$sql_data = array();
				}
				
				$stid = $this->prepare_sql_handler_by_binding( $sql_text, $sql_data );
			}
			else
			{
				$stid = oci_parse($this->connect, $query_object);
			}
		}
			
		return $stid;
    }
    
    public function count($sql)
	{
		// prepare SQL statement according to the type and content of $sql
		if ( is_string( $sql ) === TRUE )
		{
			$sqlCount = "SELECT COUNT(*) REC_COUNT FROM ($sql)";
        //logMe("0000SQL base=" . $sqlCount, DBCLASS );
		}
		else
		{
			// if the $sql is an array, it must contains two elements: sql_text for a sql base and sql_data for a parameter array, now we make $sqlCount by binding
			if ( is_array( $sql ) === TRUE )
			{
				$sqlCount = array();
				$sqlCount['sql_text'] = "";
				if ( array_key_exists( 'sql_text', $sql ) ) 
				{
					$sqlCount['sql_text'] = "SELECT COUNT(*) REC_COUNT FROM (" . $sql['sql_text'] . ")";
				}
				$sqlCount['sql_data'] = array();
				if ( array_key_exists( 'sql_data', $sql ) ) 
				{
					$sqlCount['sql_data'] = $sql['sql_data'];
				}
        //logMe("1111SQL base=" . $sqlCount['sql_text'], DBCLASS );
				
			}
			else
			{
				$sqlCount = "SELECT COUNT(*) REC_COUNT FROM ($sql)";
        //logMe("22222SQL base=" . $sqlCount, DBCLASS );
			}
		}
		
		//$stid = oci_parse($this->connect, $sqlCount);
		$stid = $this->prepare_sql_handler( $sqlCount );
		
		oci_execute($stid);
		$row = oci_fetch_object($stid);
		$num = $row->REC_COUNT;
        
        return $num;
    }

    public function query($query, $type="L", $mode = OCI_COMMIT_ON_SUCCESS){
        //$stid = oci_parse($this->connect, $query);
		$stid = $this->prepare_sql_handler( $query );
        if(oci_execute($stid, $mode)){
            $resArray=array();
            while (($row = oci_fetch_object($stid))){
                if ( $type == "N" )
                {
                    $resArray[] = $row;
                }
                else
                {
                    $resArray[] = convertKeyCase( $row, $type );
                }
            }
			arrayEncodingConversion($resArray);
            return($resArray);
        }else{
            $this->logError(oci_error($stid));
            return DB_RETURN_FAIL;
        }
    }

    public function retrieve($sql, $type="L", $mode = OCI_COMMIT_ON_SUCCESS)
    {
        // logMe("1.before count retrieve=" . $sql, DBCLASS );
        // get the total number of the records
        $count = $this->count( $sql );
        // get the records
        $rows = $this->query($sql, $type, $mode);
        // logMe("1.after query retrieve=" . $type, DBCLASS );
        // logMe("1.count retrieve=" . $count, DBCLASS );
        // logMe("1.query retrieve=" . print_r($rows, true), DBCLASS );

		$data = (object)array();
        $data->count = $count;
        $data->sqls = "OK";//$sql;
        //XarrayEncodingConversion($rows);
		$data->json_on=1;
        $data->data = (json_encode($rows));
		if ( $data->data === FALSE )
		{
			$data->zip_on=0;
			$data->json_on=0;
        	$data->data = $rows;
		}
		else
		{
			$data->zip_mthd="zlib";
			$data->zip_on=0;
			$data->org_len = strlen($data->data);
			if ( $data->zip_on == 1 )
			{
				// Do compressing, return compressed string or FALSE if an error occurred. 
				$compress_data = gzcompress($data->data, 9);
				//$compress_data = zlib_encode($data->data, 15);
				if ( $compress_data === FALSE )
				{
					// no change of data, return JSON string
					$data->zip_on=0;
				}
				else
				{
					// The compressed data must be binary format, need to encode before transfering online
					$data->zip_len = strlen($compress_data);
					// Do encoding, return the encoded data as a string or FALSE on failure
					$encode_data = base64_encode( $compress_data );
					if ( $encode_data === FALSE )
					{
						// no change of data, return JSON string
						$data->zip_on=0;
					}
					else
					{
						// Compress and encode successfully, return new data
						$data->data = $encode_data;
						$data->enc_len = strlen($encode_data);
					}
				}
			}
		}

        return($data);
    }

    public function retrieveArray($sql, $type="L", $mode = OCI_COMMIT_ON_SUCCESS)
    {
        // logMe("2.before count retrieve=" . $sql, DBCLASS );
        // get the total number of the records
        $count = $this->count( $sql );
        // get the records
        $rows = $this->query($sql, $type, $mode);
        // logMe("2.after query retrieve=" . $type, DBCLASS );
        // logMe("2.count retrieve=" . $count, DBCLASS );
        // logMe("2.query retrieve=" . print_r($rows, true), DBCLASS );
        
		$data = (object)array();
        $data->count = $count;
        $data->sqls = "OK";//$sql;
        //XarrayEncodingConversion($rows);
        //$data->data = (json_encode($rows));
		$data->json_on=0;
		$data->zip_on=0;
        $data->data = $rows;

        return($data);
    }

    public function report($query, $mode = OCI_COMMIT_ON_SUCCESS){
        //$stid = oci_parse($this->connect, $query);
		$stid = $this->prepare_sql_handler( $query );
        if(oci_execute($stid, $mode)){
            $resArray=array();

            $filename="temp.log";
            while (($row = oci_fetch_object($stid))){
                $str="";
                foreach ( $row as $key=>$value )
                {
                    $str .= '"'.$value.'",';
                }
                $this->appendContents( $filename, $str."\n" );
            }
            
            return($resArray);
        }else{
            $this->logError(oci_error($stid));
            return DB_RETURN_FAIL;
        }
    }

    public function appendContents($fileName, $contents)
    {
        if ( file_exists($fileName) )
        {
            //chmod($fileName, 0744);
        }

        $fd = fopen($fileName, "a+");
        $fout = fwrite($fd, $contents);
        if ($fout == FALSE)
        {
            echo "Cannot append to file " . $fileName . "<br>";
        }
        fclose($fd);
        //chmod($fileName, 0644);

        return $fout;
    }

    public function insert($query, $mode = OCI_COMMIT_ON_SUCCESS){
        //$stid = oci_parse($this->connect, $query);
		$stid = $this->prepare_sql_handler( $query );
        if(oci_execute($stid, $mode)){
            return RETURN_OK;
        }else{
            $this->logError(oci_error($stid));
            return DB_RETURN_FAIL;
        }
    }

    public function update($query, $mode = OCI_COMMIT_ON_SUCCESS){
        //$stid = oci_parse($this->connect, $query);
		$stid = $this->prepare_sql_handler( $query );
        logMe("Query is: " . $query, DBCLASS);
        oci_execute($stid, $mode);
        if(oci_num_rows($stid)>0){
            return RETURN_OK;
        }else{
            $this->logError(oci_error($stid));
            return DB_RETURN_FAIL;
        }
    }

    public function delete($query, $mode = OCI_COMMIT_ON_SUCCESS){
        //$stid = oci_parse($this->connect, $query);
		$stid = $this->prepare_sql_handler( $query );
        $res = oci_execute($stid, $mode);
		
        //if(oci_num_rows($stid)>0)
        if( $res === TRUE )
		{
            return RETURN_OK;
        }else{
            $this->logError(oci_error($stid));
            return DB_RETURN_FAIL;
        }
    }

    public function logError($txt){
        /* newline "\r\n" for windows, default "\n" for lunix  */
        $newline = "\n";
        
        if(defined('OS') && OS =="windows")
            $newline = "\r\n";
                  
        $message = "[".date("y-m-d H:i:s")."] - ".$txt['sqltext']."; ".$txt['message'].$newline;
        error_log ( $message, 3 , DBERRORLOG );        
    }
    
    public function rollback()
    {
        oci_rollback($this->connect);
    }
    
    public function commit()
    {
        oci_commit($this->connect);
    }
}
?>
