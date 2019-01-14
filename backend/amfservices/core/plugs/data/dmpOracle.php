<?php
require_once('dmpDatastore.php');
//require_once('IdmpDatastore.php');
//require_once(__DIR__ . "/../../services/bootstrap.php");

class dmpOracle extends dmpDatastore // implements IdmpDatastore
{

    private $username;
    private $password;
	private $database;
	private $port;
    private $server;

    var $conn;
		
		
    public function __construct( $params = false )
	{
		session_start();
        $this->doConnection();
        
        /* setting lang, ismanager and cmpycode to session */
        try
        {
            $session_id = $_SESSION['SESSION'];
            $lang = $_SESSION['LANGUAGE'];
            $ismanager = $_SESSION['MANAGER'];
            $ismanager = ($ismanager == 'T') ? 'Y' : 'N';
            $cmpycode = $_SESSION['COMPANY'];
            $percode = $_SESSION['PERCODE'];
            $clientip = $_SERVER['REMOTE_ADDR'];
        }
        catch (Exception $e) 
		{
            //logMe("Error: Failed to get session data.", DBCLASS);
        }

        $this->setSessionData($lang, $ismanager, $cmpycode, $percode, $clientip);
				/*
                //check to ensure the session has a config.

                $this->username = $_SERVER['OMEGA_USER'];
                $this->password = $_SERVER['OMEGA_PWD'];
                $this->DBPort = $_SERVER['OMEGA_DBPORT'];
                if ( strlen($this->DBPort) > 0 )
                {
                        $DBPort = ":".$this->DBPort;
                }
                if(isset($_SERVER['DB_ENCRYPT']) &&
                        ($_SERVER['DB_ENCRYPT'] == 'YES' || $_SERVER['DB_DECRYPT'] == 'yes'))
                {
					$temp = decrypt_user_pwd($this->password);
					$this->password = $temp;
				}
                $this->server = "localhost".$DBPort."/".$_SERVER['OMEGA_DBASE'];
                $this->conn = oci_connect($this->username,$this->password,$this->server,"zhs16gbk");
				*/
    }
		
    private function doConnection()
    {
        $this->username = $_SERVER['OMEGA_USER'];
        $this->password = $_SERVER['OMEGA_PWD'];
        if ( isset($_SERVER['DB_ENCRYPT']) && ( $_SERVER['DB_ENCRYPT'] == 'YES' || $_SERVER['DB_DECRYPT'] == 'yes' ) ) 
        {
            $temp = decrypt_user_pwd($this->password);
            $this->password = $temp;
        }
        $this->database = $_SERVER['OMEGA_DBASE'];
        $this->port     = $_SERVER['OMEGA_DBPORT'];
		$this->server = 'localhost' . ':' . $this->port . '/' . $this->database;
		
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
			$this->conn = oci_connect($this->username,$this->password,$this->server, $charset);
		}
		else
		{
			$this->conn = oci_connect($this->username,$this->password,$this->server);
		}
        
        if( !($this->conn) )
        {
            $e = oci_error();
            return new dmError(array("Failed to connect to oracle [" . $this->server . "] with:\n" . print_r($e, TRUE) . "]"));
        }
		
		return new dmMesg();
    }

    public function setSessionData($lang, $ismanager, $cmpycode, $percode, $clientip)
    {
        $stid1 = oci_parse($this->conn, "BEGIN adt.SET_LANG(:lang); END;");
        oci_bind_by_name($stid1, ":lang", $lang);
        oci_execute($stid1);
        oci_free_statement($stid1);
        
        $stid2 = oci_parse($this->conn, "BEGIN adt.SET_ISMANAGER(:ismanager); END;");
        oci_bind_by_name($stid2, ":ismanager", $ismanager);
        oci_execute($stid2);
        oci_free_statement($stid2);
        
        $stid3 = oci_parse($this->conn, "BEGIN adt.SET_CMPYCODE(:cmpycode); END;");
        oci_bind_by_name($stid3, ":cmpycode", $cmpycode);
        oci_execute($stid3);
        oci_free_statement($stid3);

        $stid4 = oci_parse($this->conn, "BEGIN adt.SET_PERCODE(:percode); END;");
        oci_bind_by_name($stid4, ":percode", $percode);
        oci_execute($stid4);
        oci_free_statement($stid4);

		$cnt_sql = "select * from user_procedures where object_name='ADT' and procedure_name='SET_CLIENTIP'";
		if ( $this->count($cnt_sql) > 0 )
		{
			//logMe("adt.SET_CLIENTIP exists!", DBCLASS);
			$stid5 = oci_parse($this->conn, "BEGIN adt.SET_CLIENTIP(:clientip); END;");
			oci_bind_by_name($stid5, ":clientip", $clientip);
			oci_execute($stid5);
			oci_free_statement($stid5);
		}
		else
		{
			//logMe("adt.SET_CLIENTIP is not found!", DBCLASS);
		}
    }


    /**
     * Connect the oracle database schema.
     *
     * @param Object $params contains the datasource definition
     *
     * @return dmMesg|dmError On success dmMesg is returned, dmError on failure.
     *
     */
    public function connect( $params = false )
	{
		return;
		
        $connect_way_flag = 0;

        $dbport = $this->dbport;
        if ( $connect_way_flag == 1 )
        {
                if ( $this->dbport == "" )
                {
                        $dbport = "1521";
                }
                $db = "(DESCRIPTION=(ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = ".$this->server.")(PORT = ".$dbport .")))(CONNECT_DATA=(SID=".$this->dbase.")))";
        }
        else
        {
                if ( strlen($this->dbport) > 0 )
                {
                        $dbport = ":".$this->dbport;
                }
                $db = $this->server . $dbport . '/' . $this->dbase;
        }

        if(!$this->conn = oci_connect($this->username, $this->password,  $db, 'UTF8'))  return new dmError(array("Failed to connect to oracle [" . $this->server . "] with:\n" . print_r($e, TRUE) . "]"));

        return new dmMesg(array("dev" => "Connected to Oracle with 1: " . $this->username . " | " . $this->password . " | " . $this->server . $dbport . '/' . $this->dbase));

        //$db = "(DESCRIPTION=(ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = ".$this->server.")(PORT = ".$this->dbport .")))(CONNECT_DATA=(SID=".$this->dbase.")))";
        //if(!$this->conn = oci_connect($this->username, $this->password,  $db, 'UTF8'))        return new dmError(array("Failed to connect to oracle [" . $this->server . "] with:\n" . print_r($e, TRUE) . "]"));

        //if(!$this->conn = oci_connect($this->username, $this->password, $this->server . $this->dbport . '/' . $this->dbase))  return new dmError(array("Failed to connect to oracle [" . $this->server . "] with:\n" . print_r($e, TRUE) . "]"));
        //return new dmMesg(array("dev" => "Connected to Oracle with : " . $this->username . " | " . $this->password . " | " . $this->server . $this->dbport . '/' . $this->dbase));

    }


    /**
     * Retrieve the records.
     *
     * @param Object $params contains the SQL statements
     *
     * @return dmMesg|dmError On success dmMesg is returned, dmError on failure.
     *
     */
    public function query( $params = false )
	{

        //$stid = oci_parse($this->conn, $params->sql);
        $stid = oci_parse($this->conn, $this->stringEncodingConversion($params->sql));

        new dmMesg(array("dev" => "Executed with query in dmpOracle.query " . $params->sql));

        //if(!@oci_execute($stid))
        if(!oci_execute($stid))
		{
            return new dmError(array("dev" => "Execution of SQL upon Oracle failed with:[\n" . print_r(oci_error($stid), TRUE) . "\n] Executing [\n" . $params->sql . "\n]"));
        }

        $retArray = array();
        //while ($row = @oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_NULLS)) 
        while ($row = @oci_fetch_assoc($stid)) 
        //while ($row = oci_fetch_object($stid)) 
		{
            $retArray[] = $row;
            //$retArray[] = (array)$row;
        }
        $this->arrayEncodingConversion($retArray);

        if(!oci_free_statement($stid))
		{
			return new dmError(array("dev" => "Oracle failed releasing resources after execution with:[\n" . print_r(oci_error($stid)) . "\n"));
		}

        if(is_array($retArray)) 
		{
			return new dmMesg(array("data" => $retArray));
		}
        else
		{
			return new dmError(array("data" => "Fell to an exception"));
		}

    }


    /**
     * TODO ??????.
     *
     * @param Object $params contains the SQL statements
     *
     * @return dmMesg|dmError On success dmMesg is returned, dmError on failure.
     *
     */
    public function create( $params = false )
	{

    }


    /**
     * Insert the records.
     *
     * @param Object $params contains the SQL statements
     *
     * @return dmMesg|dmError On success dmMesg is returned, dmError on failure.
     *
     */
    public function insert( $params = false )
	{

        //$stid = oci_parse($this->conn, $params->sql);
        $stid = oci_parse($this->conn, $this->stringEncodingConversion($params->sql));
        new dmError(array("dev" => "Executed with insert " . $params->sql));
		
        if(!oci_execute($stid))
		{
            return new dmError(array("dev" => "Execution of SQL upon Oracle failed with:[\n" . print_r(oci_error($stid), TRUE) . "\n] Executing [\n" . $params->sql . "\n]"));
        }
		
        if(!oci_free_statement($stid))
		{
			return new dmError(array("dev" => "Oracle failed releasing resources after execution with:[\n" . print_r(oci_error($stid)) . "\n"));
		}
        else
		{
			return new dmMesg(array("dev" => "INSERT COMPLETE."));
		}

    }


    /**
     * TODO ??????.
     *
     * @param Object $params contains the SQL statements
     *
     * @return dmMesg|dmError On success dmMesg is returned, dmError on failure.
     *
     */
    public function retrieve( $params = false )
	{

    }


    /**
     * Update the records.
     *
     * @param Object $params contains the SQL statements
     *
     * @return dmMesg|dmError On success dmMesg is returned, dmError on failure.
     *
     */
    public function update( $params = false )
	{

        //$stid = oci_parse($this->conn, $params->sql);
        $stid = oci_parse($this->conn, $this->stringEncodingConversion($params->sql));
        new dmError(array("dev" => "Executed with update " . $params->sql));
		
        if(!oci_execute($stid))
		{
			return new dmError(array("dev" => "Execution of SQL upon Oracle failed with:[\n" . print_r(oci_error($stid), TRUE) . "\n] Executing [\n" . $params->sql . "\n]"));
		}

        if(!oci_free_statement($stid))
		{
			return new dmError(array("dev" => "Oracle failed releasing resources after execution with:[\n" . print_r(oci_error($stid)) . "\n"));
		}
        else
		{
			return new dmMesg(array("dev" => "UPDATE COMPLETE."));
		}

    }


    /**
     * TODO ??????.
     *
     * @param Object $params contains the SQL statements
     *
     * @return dmMesg|dmError On success dmMesg is returned, dmError on failure.
     *
     */
    public function delete( $params = false )
	{

    }


    /**
     * TODO: create WHERE statements for a SQL ??????.
     *
     * @param Object $params contains the SQL statements
     *
     * @return dmMesg|dmError On success dmMesg is returned, dmError on failure.
     *
     */
    public function interpretConditions( $params = false )
	{

        //pass params
        if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)
		{
			return $chk;
		}
        $params = $chk->data;

        //loop each condition
        foreach($params->conditions as $key => $conditionArray)
		{

            $key = $conditionArray[0];
            $eq = $conditionArray[1];
            $value = $conditionArray[2];

        }


    }
    
    private function count($sql)
	{
		$sqlCount = "SELECT COUNT(*) REC_COUNT FROM ($sql)";
		
		$stid = oci_parse($this->conn, $sqlCount);
		
		oci_execute($stid);
		$row = oci_fetch_object($stid);
		$num = $row->REC_COUNT;
        
        return $num;
    }

	/**
	* Recursively process an array to convert all values in the array
	* @param $data the array to be processed. This is pass-by-reference.
	*/
	public function arrayEncodingConversion(&$data, $to = 'UTF-8', $from = 'GB2312')
	{
		$nls_lang_str = strtoupper($_SERVER['NLS_LANG']);
		if ( strpos( $nls_lang_str, "AL32UTF8" ) !== FALSE )
		{
			return;
		}
		
		foreach($data as $key => $value)
		{
			if (is_array($value) || is_object($value))
			{
				if (is_array($data))
					$this->arrayEncodingConversion($data[$key], $to, $from);
				else if (is_object($data))
					$this->arrayEncodingConversion($data->$key, $to, $from);
			}
			else
			{
				if (is_string($value))
				{
					if (is_array($data))
						$data[$key] = mb_convert_encoding($value, $to, $from);
					else if (is_object($data))
						$data->$key = mb_convert_encoding($value, $to, $from);
				}
			}
		}
	}

	public function stringEncodingConversion($data, $to = 'UTF-8', $from = 'GB2312')
	{
		// check to see if the database is encoded as UTF8
		$nls_lang_str = strtoupper($_SERVER['NLS_LANG']);
		$nls_pos = strpos( $nls_lang_str, "AL32UTF8" );
		// check to see if the data is encoded as UTF8
		$is_utf8 = mb_check_encoding( $data, 'UTF-8' );
		
		if ( $nls_pos !== FALSE )
		{
			// database is UTF-8 encoding
			if ( $is_utf8 === TRUE )
			{
				// text is UTF8, no conversion
				return $data;
			}
			else
			{
				// text is GB2312, need conversion
				return mb_convert_encoding($data, $to, $from);
			}
		}
		else
		{
			// database is not UTF-8 encoding
			if ( $is_utf8 === TRUE )
			{
				// text is UTF8, need conversion
				return mb_convert_encoding($data, $from, $to);
			}
			else
			{
				// text is GB2312, no conversion
				return $data;
			}
		}
	}

}
?>
