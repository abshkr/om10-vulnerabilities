<?php
require_once(dirname(__FILE__) . '/../vo/BaseProducts.vo.php');
require_once(dirname(__FILE__) . '/../vo/Companies.vo.php');
require_once(dirname(__FILE__) . '/../vo/Journal.vo.php');
require_once(dirname(__FILE__) . '/../vo/Personnel.vo.php');
require_once(dirname(__FILE__) . '/../vo/ProductOwnership.vo.php');
require_once(dirname(__FILE__) . '/../vo/Role.vo.php');
require_once(dirname(__FILE__) . '/../vo/Tank.vo.php');
require_once(dirname(__FILE__) . '/../vo/Tankers.vo.php');
require_once(dirname(__FILE__) . '/../vo/Folio.vo.php');
require_once(dirname(__FILE__) . '/../vo/EquipmentTypes.vo.php');
require_once(dirname(__FILE__) . '/../vo/LoadSchedules.vo.php');
require_once(dirname(__FILE__) . '/../vo/ManualTransactions.vo.php');
require_once(dirname(__FILE__) . '/../vo/UrbacObjects.vo.php');
require_once(dirname(__FILE__) . '/../vo/EquipmentList.vo.php');
require_once(dirname(__FILE__) . '/../vo/Reports.vo.php');
require_once(dirname(__FILE__) . '/../vo/IdentificationAssignment.vo.php');
require_once(dirname(__FILE__) . '/../vo/SiteConfig.vo.php');
require_once(dirname(__FILE__) . '/../vo/CustOrders.vo.php');
require_once(dirname(__FILE__) . '/../vo/Terminal.vo.php');
require_once(dirname(__FILE__) . '/../vo/Transactions.vo.php');
require_once(dirname(__FILE__) . '/../vo/GuiTransactionDetails.vo.php');
require_once(dirname(__FILE__) . '/../vo/GuiMeterDetails.vo.php');
require_once(dirname(__FILE__) . '/../vo/BAMeters.vo.php');
require_once(dirname(__FILE__) . '/../vo/ExpiryDateTitle.vo.php');


if(!defined('GLOBALCLASS')) define('GLOBALCLASS','Global.class');


/*============================================================================*/
/* define return values                                                       */
define ('RETURN_OK', 'Success');
define ('RETURN_FAIL', 'Fail');
define ('DB_RETURN_FAIL', 'Fail_DB');

/* GlogbalCfg.php defines DEBUG as well but GlogbalCfg.php is rarely included (require_once()) in other files */
define ('DEBUG', 'NO'); /* YES or NO */
/*============================================================================*/
/* define the OS for new line character                                       */
if(!defined('OS')) define('OS','linux'); /* windows or linux */

define('DISPLAY_ALL_ERROS', false);
if (DISPLAY_ALL_ERROS) {
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', 0);
    error_reporting(E_ERROR);
}

/*============================================================================*/
/* define the LOGDIR                                                          */
if(defined('OS') && OS =='linux') {
    if(isset($_SERVER['OMEGA_HOME'])) {
        $GLOBALS['LOGDIR'] = $_SERVER['OMEGA_HOME'] . '/logs';
    }
    else {
        $GLOBALS['LOGDIR'] = '/tmp/logs';
    }
}
else {
    $GLOBALS['LOGDIR'] = 'C:\xampp\htdocs\logs';
}

/*============================================================================*/
/* define the module name for calling logMe() to output                       */
/* define the SEPARATOR                                                       */
if(defined('OS') && OS =='linux') {
    $GLOBALS['SEPARATOR'] = '/';
}
else {
    $GLOBALS['SEPARATOR'] = '\\';
}
/* define DB error log file                                                   */
if(!defined('DBERRORLOG')) define('DBERRORLOG',$GLOBALS['LOGDIR'] . $GLOBALS['SEPARATOR'] .'db_error.log');
/* define debug log file                                                      */
if(!defined('TLOG')) define('TLOG',$GLOBALS['LOGDIR'] . $GLOBALS['SEPARATOR'] .'debug.log');
/* define user error log file                                                 */
if(!defined('ERRORLOG')) define('ERRORLOG',$GLOBALS['LOGDIR'] . $GLOBALS['SEPARATOR'] .'error.log');

/*============================================================================*/
/* define the HOST const                                                      */
//if(isset($_SERVER['HTTP_HOST'])) {
//    $GLOBALS['HOST'] = $_SERVER['HTTP_HOST'];
//}
if(isset($_SERVER['SERVER_ADDR'])) {
    $GLOBALS['HOST'] = $_SERVER['SERVER_ADDR'];
}
else {
    $GLOBALS['HOST'] = 'localhost';
}

/*============================================================================*/
/* define the base CGI directory                                              */
define ('CGIDIR','cgi-bin/en/');

/*============================================================================*/
/* define the Oracle database const                                           */
/* if debugging in Windows you may need to set these variables accordingly    */
if(!defined('ORA_USER')) define ('ORA_USER','sf');
if(!defined('ORA_PWD')) define ('ORA_PWD','abcd1234');
if(!defined('DBASE')) define ('DBASE','OML5K'); 
if(!defined('DBPORT')) define ('DBPORT','1521');
if(isset($_SERVER['OMEGA_USER'])) {
    $GLOBALS['DB_USER'] = $_SERVER['OMEGA_USER'];
}
else {
    $GLOBALS['DB_USER'] = ORA_USER;
}
if(isset($_SERVER['OMEGA_PWD'])) {
    $GLOBALS['DB_PWD'] = $_SERVER['OMEGA_PWD'];
}
else {
    $GLOBALS['DB_PWD'] = ORA_PWD;
}
if(isset($_SERVER['OMEGA_DBASE'])) {
    $GLOBALS['DB_DBASE'] = $_SERVER['OMEGA_DBASE'];
}
else {
    $GLOBALS['DB_DBASE'] = DBASE;
}
if(isset($_SERVER['OMEGA_DBPORT'])) {
    $GLOBALS['DB_PORT'] = $_SERVER['OMEGA_DBPORT'];
}
else {
    $GLOBALS['DB_PORT'] = DBPORT;
}

/* if debugging in Windows you may need to replace 'localhost'                */
/* with ip address.                                                           */
$GLOBALS['DB_NAME'] = 'localhost' . ':' . $GLOBALS['DB_PORT'] . '/' . $GLOBALS['DB_DBASE'];

/*============================================================================*/
/* define the HOST for calling CGI                                            */
define ('HOST', $GLOBALS['HOST']);

//if(defined('DEBUG') && DEBUG =='YES') {
//    logMe("HOST:[" . HOST . "]",GLOBALCLASS);
//   logMe("Got DB_USER:[" . $GLOBALS["DB_USER"] . "] and assigned to GLOBAL array",GLOBALCLASS);
//    logMe("Got DB_PWD:[" . $GLOBALS["DB_PWD"] . "] and assigned to GLOBAL array",GLOBALCLASS);
//    logMe("Got DB_NAME:[" . $GLOBALS["DB_NAME"] . "] and assigned to GLOBAL array",GLOBALCLASS);
//}

/* debug info output */
function logMe($var, $module, $file = NULL, $line = NULL) 
{
    if(defined('DEBUG') && DEBUG =='NO') return;

    /* newline "\r\n" for windows, default "\n" for linux  */
    $newline = "\n";

    if(defined('OS') && OS =='windows') 
        $newline = "\r\n";
    
    $message = "[".date("y-m-d H:i:s")."] ".$module ." - ".$var.$newline;
    error_log ( $message, 3 , TLOG );
}

/* Added for logout user error information */
function logUserError($text){
    /* newline "\r\n" for windows, default "\n" for linux  */
    $newline = "\n";

    if(defined('OS') && OS =='windows')
        $newline = "\r\n";

    $message = "[" . date("y-m-d H:i:s") . "] " . $text . $newline;
    error_log ( $message, 3 , ERRORLOG );
}

/* defined a custom error */
function customError($errno, $errstr)
{
    echo "<b>Error:</b> [$errno] $errstr<br />";
    echo "Process has been notified";
    $text = "errno=[$errno] errstr:$errstr";
    logUserError($text);
}

/* define E_ERROR, E_WARNING and E_PARSE */
error_reporting(E_ERROR | E_WARNING | E_PARSE);

/* set error handler */
set_error_handler("customError",E_USER_WARNING);

class GlobalClass {
    public function count($tbl_name, $filter=''){
        $mydb = DB::getInstance();
		
		// prepare SQL statement according to the type and content of filter
        //$sql="SELECT count(*) REC_COUNT FROM $tbl_name $filter";
		if ( is_string( $filter ) === TRUE )
		{
			$sql="SELECT count(*) REC_COUNT FROM $tbl_name $filter";
		}
		else
		{
			// if the filter is an array, it must contains two elements: sql_text for a sql base and sql_data for a parameter array, now we make filter by binding
			if ( is_array( $filter ) === TRUE )
			{
				$sql = array();
				$sql['sql_text'] = "";
				if ( array_key_exists( 'sql_text', $filter ) ) 
				{
					$sql['sql_text'] = "SELECT count(*) REC_COUNT FROM $tbl_name " . $filter['sql_text'];
				}
				$sql['sql_data'] = array();
				if ( array_key_exists( 'sql_data', $filter ) ) 
				{
					$sql['sql_data'] = $filter['sql_data'];
				}
			}
			else
			{
				$sql="SELECT count(*) REC_COUNT FROM $tbl_name $filter";
			}
		}
		
        $rows = $mydb->query($sql);
        return ((integer)$rows[0]->REC_COUNT);
    }
    
    public function getAll($tbl_name){
        $mydb = DB::getInstance();
        $sql="SELECT * FROM $tbl_name";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => $tbl_name)));
    }

    public function getAllwithoutLogin($tbl_name){
        $mydb = DB::getInstanceWithoutAuth();
        $sql="SELECT * FROM $tbl_name";
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => $tbl_name)));
    }
   
    public function getPaged($tbl_name,$offset,$tot,$filter='',$sort='')
    {
        $mydb = DB::getInstance();
        
        if($key=='') $key = getTableKey($tbl_name);
        
        if($sort!='')$sort="ORDER BY $sort";
		
		// prepare SQL statement according to the type and content of filter
        //$sql="SELECT * FROM(
        //        SELECT res.*, ROW_NUMBER() over ($sort) RN
        //        FROM(SELECT * FROM $tbl_name $filter) res
        //     )
        //     where RN between ".($offset+1)." and ".($offset+$tot)." $sort";        
		if ( is_string( $filter ) === TRUE )
		{
			$sql="SELECT * FROM(
					SELECT res.*, ROW_NUMBER() over ($sort) RN
					FROM(SELECT * FROM $tbl_name $filter) res
				)
				where RN between ".($offset+1)." and ".($offset+$tot)." $sort";        
		}
		else
		{
			// if the filter is an array, it must contains two elements: sql_text for a sql base and sql_data for a parameter array, now we make filter by binding
			if ( is_array( $filter ) === TRUE )
			{
				$sql = array();
				$sql['sql_text'] = "";
				if ( array_key_exists( 'sql_text', $filter ) ) 
				{
					$sql['sql_text'] = "SELECT * FROM(
							SELECT res.*, ROW_NUMBER() over ($sort) RN
							FROM(SELECT * FROM $tbl_name " . $filter['sql_text'] . ") res
						)
						where RN between ".($offset+1)." and ".($offset+$tot)." $sort";        
				}
				$sql['sql_data'] = array();
				if ( array_key_exists( 'sql_data', $filter ) ) 
				{
					$sql['sql_data'] = $filter['sql_data'];
				}
			}
			else
			{
				$sql="SELECT * FROM(
						SELECT res.*, ROW_NUMBER() over ($sort) RN
						FROM(SELECT * FROM $tbl_name $filter) res
					)
					where RN between ".($offset+1)." and ".($offset+$tot)." $sort";        
			}
		}
		
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => $tbl_name)));
    }
    
    public function getRecord($tbl_name,$code){
        $mydb = DB::getInstance();
        $key = getTableKey($tbl_name);
		
        //$sql="SELECT * FROM $tbl_name WHERE $key='$code'";
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM $tbl_name WHERE $key=:code";
		$sql['sql_data'] = array( $code );
		
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => $tbl_name)));
    } 
    
    public function create($tbl_name,$data){
        if (!$data) return RETURN_FAIL;
        
        $errMsg = '';
        if (!integrityCheck($data, $errMsg, $tbl_name)){
            logMe("Invalid parameter. Error message: " . $errMsg,GLOBALCLASS);
            return RETURN_FAIL;
        }
        
        //$values = getInsertString($data);

        $mydb = DB::getInstance();
        //$sql="INSERT INTO $tbl_name $values";
		
        $values = getInsertString($data, 1);
		$sql = array();
        $sql['sql_text'] = "INSERT INTO $tbl_name " . $values['sql_text'];
		$sql['sql_data'] = $values['sql_data'];
		
        $res = $mydb->insert($sql);
		logMe("Res is: " . $res, GLOBALCLASS);
        return $res;
    }    
    
    public function update($tbl_name,$code,$data){
        if (!$data) return RETURN_FAIL;
        
        $errMsg = '';
        if (!integrityCheck($data, $errMsg, $tbl_name)){
            logMe("Invalid parameter. Error message: " . $errMsg,GLOBALCLASS);
            return RETURN_FAIL;
        }
        
        //$values = getUpdateString($data);
        $key = getTableKey($tbl_name);

        $mydb = DB::getInstance();
        //$sql="UPDATE $tbl_name SET $values WHERE $key='$code'";
		
        $values = getUpdateString($data, 1);
		$sql = array();
        $sql['sql_text'] = "UPDATE $tbl_name SET " . $values['sql_text'] . " WHERE $key=:code";
		$sql['sql_data'] = array_merge( $values['sql_data'], array($code) );
		
        $res = $mydb->update($sql);
        return $res;
    }
    
    public function delete($tbl_name,$code){
        logMe('Deleting Object: ' . $code, GLOBALCLASS);
		if (!$code) return RETURN_FAIL;
        $key = getTableKey($tbl_name);
		logMe('Deleting Key: ' . $key, GLOBALCLASS);

        $mydb = DB::getInstance();
		
        //$sql="DELETE FROM $tbl_name WHERE $key='$code'";
		$sql = array();
        $sql['sql_text'] = "DELETE FROM $tbl_name WHERE $key=:code";
		$sql['sql_data'] = array( $code );
		
        $res = $mydb->delete($sql); 
		logMe('Res is: ' . $res, GLOBALCLASS);
        return $res;
    }

    /*============================================================================*/
    // The following functions are used to create WHERE statements dynamically
    /*============================================================================*/

    /**
    * Prepare the numeric filter.
    *
    * @param string 				$variable      	The name of the variable 
    * @param integer or string 		$value      	The value of the variable, could be a single value (integer) or a range (string) 
    * @param string 				$delimiter      The delimiter to separate the value range. The default one is ~~
    * @return                   					Returns a filter string to be used in WHERE statement
    */
    public function createConditionWithNumberNoBinding( $variable, $value, $delimiter )
    {
        $ranges = explode( $delimiter, $value );
        $len = count( $ranges );
        
        $condition = "";
        if ( $len <= 0 )
        {
            // extreme case
            $condition = "1=1";
        }
        else
        if ( $len == 1 )
        {
            // no delimiter, no comparison
            $condition = $variable . "=" . $value;
        }
        else
        {
            if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) > 0 )
            {
                // value: value1~value2
                $condition = "(" . $variable . ">=" . $ranges[0] . " and " . $variable . "<" . $ranges[1] . ")";
            }
            else
            {
                if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) <= 0 )
                {
                    //value: value1~
                    $condition = "(" . $variable . ">=" . $ranges[0] . ")";
                }
                else
                if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] ) > 0 )
                {
                    //value: ~value2
                    $condition = "(" . $variable . "<" . $ranges[1] . ")";
                }
                else
                //if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] )<=0 )
                {
                    //value: ~
                    $condition = "1=1";
                }
            }
        }
        
        return $condition;
    }

    /**
    * Prepare the numeric filter for binding.
    *
    * @param string 				$variable      	The name of the variable 
    * @param integer or string 		$value      	The value of the variable, could be a single value (integer) or a range (string) 
    * @param string 				$delimiter      The delimiter to separate the value range. The default one is ~~
    * @return                   					Returns a filter object containing binding statement and parameters to be used in WHERE statement
    */
    public function createConditionWithNumberForBinding( $variable, $value, $delimiter )
    {
        $ranges = explode( $delimiter, $value );
        $len = count( $ranges );
		
		$filterObj = array();
        $filterObj['sql_text'] = "";
		$filterObj['sql_data'] = $ranges;
        
        $condition = "";
        if ( $len <= 0 )
        {
            // extreme case
            $condition = "1=1";
			$filterObj['sql_data'] = array();
        }
        else
        if ( $len == 1 )
        {
            // no delimiter, no comparison
            $condition = $variable . "=:" . strtolower($variable);
			$filterObj['sql_data'] = array($value);
        }
        else
        {
            if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) > 0 )
            {
                // value: value1~value2
                $condition = "(" . $variable . ">=:" . strtolower($variable) . "1 and " . $variable . "<:" . strtolower($variable) . "2)";
            }
            else
            {
                if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) <= 0 )
                {
                    //value: value1~
                    $condition = "(" . $variable . ">=:" . strtolower($variable) . ")";
					$filterObj['sql_data'] = array($ranges[0]);
                }
                else
                if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] ) > 0 )
                {
                    //value: ~value2
                    $condition = "(" . $variable . "<:" . strtolower($variable) . ")";
					$filterObj['sql_data'] = array($ranges[1]);
                }
                else
                //if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] )<=0 )
                {
                    //value: ~
                    $condition = "1=1";
					$filterObj['sql_data'] = array();
                }
            }
        }
		
        $filterObj['sql_text'] = $condition;
        
        return $filterObj;
    }
		


    /**
    * Prepare the date time filter.
    *
    * @param string 				$variable      	The name of the variable 
    * @param string 				$value      	The value of the variable, could be a single date/time or a range of date time  
    * @param string 				$delimiter      The delimiter to separate the range. The default one is ~~
    * @return                   					Returns a filter string to be used in WHERE statement
    */
    public function createConditionWithDatetimeNoBinding( $variable, $value, $delimiter )
    {
        $ranges = explode( $delimiter, $value );
        $len = count( $ranges );
        
        $format = "rrrr-MM-DD hh24:mi:ss";
        $condition = "";
        if ( $len <= 0 )
        {
            // extreme case
            $condition = "1=1";
        }
        else
        if ( $len == 1 )
        {
            // no delimiter, no comparison
            $condition = $variable . "=TO_DATE('" . $value . "', '" . $format . "')";
        }
        else
        {
            if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) > 0 )
            {
                // value: value1~value2
                $condition = "(" . $variable . ">=TO_DATE('" . $ranges[0] . "', '" . $format . "')" . " and " . $variable . "<TO_DATE('" . $ranges[1] . "', '" . $format . "')" . ")";
            }
            else
            {
                if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) <= 0 )
                {
                    //value: value1~
                    $condition = "(" . $variable . ">=TO_DATE('" . $ranges[0] . "', '" . $format . "')" . ")";
                }
                else
                if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] ) > 0 )
                {
                    //value: ~value2
                    $condition = "(" . $variable . "<TO_DATE('" . $ranges[1] . "', '" . $format . "')" . ")";
                }
                else
                //if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] )<=0 )
                {
                    //value: ~
                    $condition = "1=1";
                }
            }
        }
        
        return $condition;
    }

    /**
    * Prepare the date time filter for binding.
    *
    * @param string 				$variable      	The name of the variable 
    * @param string 				$value      	The value of the variable, could be a single date/time or a range of date time  
    * @param string 				$delimiter      The delimiter to separate the range. The default one is ~~
    * @return                   					Returns a filter object containing binding statement and parameters to be used in WHERE statement
    */
    public function createConditionWithDatetimeForBinding( $variable, $value, $delimiter )
    {
        $ranges = explode( $delimiter, $value );
        $len = count( $ranges );
		
		$filterObj = array();
        $filterObj['sql_text'] = "";
		$filterObj['sql_data'] = $ranges;
        
        
        $format = "rrrr-MM-DD hh24:mi:ss";
        $condition = "";
        if ( $len <= 0 )
        {
            // extreme case
            $condition = "1=1";
			$filterObj['sql_data'] = array();
        }
        else
        if ( $len == 1 )
        {
            // no delimiter, no comparison
            $condition = $variable . "=TO_DATE(:" . strtolower($variable) . ", '" . $format . "')";
			$filterObj['sql_data'] = array($value);
        }
        else
        {
            if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) > 0 )
            {
                // value: value1~value2
                $condition = "(" . $variable . ">=TO_DATE(:" . strtolower($variable) . "1, '" . $format . "')" . " and " . $variable . "<TO_DATE(:" . strtolower($variable) . "2, '" . $format . "')" . ")";
            }
            else
            {
                if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) <= 0 )
                {
                    //value: value1~
                    $condition = "(" . $variable . ">=TO_DATE(:" . strtolower($variable) . ", '" . $format . "')" . ")";
					$filterObj['sql_data'] = array($ranges[0]);
                }
                else
                if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] ) > 0 )
                {
                    //value: ~value2
                    $condition = "(" . $variable . "<TO_DATE(:" . strtolower($variable) . ", '" . $format . "')" . ")";
					$filterObj['sql_data'] = array($ranges[1]);
                }
                else
                //if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] )<=0 )
                {
                    //value: ~
                    $condition = "1=1";
					$filterObj['sql_data'] = array();
                }
            }
        }
		
        $filterObj['sql_text'] = $condition;
        
        return $filterObj;
    }
		


    /**
    * Prepare the string filter.
    *
    * @param string 				$variable      	The name of the variable 
    * @param string 				$value      	The value of the variable, could be a single string or a range of string  
    * @param string 				$delimiter      The delimiter to separate the range. The default one is ~~
    * @return                   					Returns a filter string to be used in WHERE statement
    */
    public function createConditionWithStringNoBinding( $variable, $value, $delimiter )
    {
        $ranges = explode( $delimiter, $value );
        $len = count( $ranges );
        
        $condition = "";
        if ( $len <= 0 )
        {
            // extreme case
            $condition = "1=1";
        }
        else
        if ( $len == 1 )
        {
            // no delimiter, no comparison
            $condition = "(" . $variable . "='" . $value . "' or (UPPER(" . $variable . ") LIKE UPPER('%" . $value . "%')) )";
			if ( $value == "NULL" )
			{
				$condition = "(" .$variable . " is NULL) ";
			}
        }
        else
        {
            if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) > 0 )
            {
                // value: value1~value2
                $condition = "(" . $variable . ">='" . $ranges[0] . "' and " . $variable . "<'" . $ranges[1] . "')";
            }
            else
            {
                if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) <= 0 )
                {
                    //value: value1~
                    $condition = "(" . $variable . ">='" . $ranges[0] . "')";
                }
                else
                if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] ) > 0 )
                {
                    //value: ~value2
                    $condition = "(" . $variable . "<'" . $ranges[1] . "')";
                }
                else
                //if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] )<=0 )
                {
                    //value: ~
                    $condition = "1=1";
                }
            }
        }
        
        return $condition;
    }

    /**
    * Prepare the string filter for binding.
    *
    * @param string 				$variable      	The name of the variable 
    * @param string 				$value      	The value of the variable, could be a single string or a range of string  
    * @param string 				$delimiter      The delimiter to separate the range. The default one is ~~
    * @return                   					Returns a filter object containing binding statement and parameters to be used in WHERE statement
    */
    public function createConditionWithStringForBinding( $variable, $value, $delimiter )
    {
        $ranges = explode( $delimiter, $value );
        $len = count( $ranges );
		
		$filterObj = array();
        $filterObj['sql_text'] = "";
		$filterObj['sql_data'] = $ranges;
        
        
        $condition = "";
        if ( $len <= 0 )
        {
            // extreme case
            $condition = "1=1";
			$filterObj['sql_data'] = array();
        }
        else
        if ( $len == 1 )
        {
            // no delimiter, no comparison
            $condition = "(" . $variable . "=:" . strtolower($variable) . " or (UPPER(" . $variable . ") LIKE UPPER('%'||:" . strtolower($variable) . "||'%')) )";
			$filterObj['sql_data'] = array($value);
			if ( $value == "NULL" )
			{
				$condition = "(" .$variable . " is NULL) ";
				$filterObj['sql_data'] = array();
			}
        }
        else
        {
            if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) > 0 )
            {
                // value: value1~value2
                $condition = "(" . $variable . ">=:" . strtolower($variable) . "1 and " . $variable . "<:" . strtolower($variable) . "2)";
            }
            else
            {
                if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) <= 0 )
                {
                    //value: value1~
                    $condition = "(" . $variable . ">=:" . strtolower($variable) . ")";
					$filterObj['sql_data'] = array($ranges[0]);
                }
                else
                if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] ) > 0 )
                {
                    //value: ~value2
                    $condition = "(" . $variable . "<:" . strtolower($variable) . ")";
					$filterObj['sql_data'] = array($ranges[1]);
                }
                else
                //if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] )<=0 )
                {
                    //value: ~
                    $condition = "1=1";
					$filterObj['sql_data'] = array();
                }
            }
        }
		
        $filterObj['sql_text'] = $condition;
        
        return $filterObj;
    }

	
	
    /**
    * get the data type of a column.
    *
    * @param string 				$column      	The name of the column 
    * @param array 					$types      	The list of types 
    * @return                   					Returns the type of the column: BINARY, STRING, DATETIME, NUMBER, EXACT_STRING
    */
    public function getDataTypeOfColumn( $column, $types )
    {
        $data_type = "STRING";
        
        foreach ($types as $key => $type) 
        {
            if ( $key == $column )
            {
                $data_type = $type;
                break;
            }
        }
         
        return $data_type;
    }


	
    /**
    * Prepare the where clause according to columns, values and data types.
    *
    * @param array 				$fields      	The array of field=>value 
    * @param array 				$field_types    The array of field=>type  
    * @return                   				Returns the where clause
    */
    public function createWhereConditionNoBinding( $fields, $field_types )
    {
		// this is the delimiter to separate the multiple columns/values/types
		$field_delimiter = "||";
		// this is the delimiter for the range of values
        $value_delimiter = "~~";
		
        $where_and_str = "";
		
		// go through the code and value for each item, which could be a single code/value or multiple codes/values, such as: CMPY_CODE, aaa, or CMPY_CODE||CMPY_NAME, aaa||bbb
        foreach ($fields as $field_code => $field_value) 
        {
            if ( $field_value == "null" || $field_value == "(null)" || $field_value == "-1" || $field_value == "" || is_null($field_value) )
            {
                continue;
            }
			// get the type for current item, which could be a single type or multiple types, such as: STRING, or STRING||NUMBER
            $field_type = $this->getDataTypeOfColumn( $field_code, $field_types );
			
			// tokenize the string 
			$codes = explode( $field_delimiter, $field_code );
			$values = explode( $field_delimiter, $field_value );
			$types = explode( $field_delimiter, $field_type );
			
			$len = count( $codes );
			$vlen = count( $values );
			$tlen = count( $types );
			
			$where_or_str = "";
			for ( $i=0; $i<$len; $i++ )
			{
				// note: loop will be based on length of codes, if length of values and types are less, use the value and type in previous loop
				$code = $codes[$i];
				if ( $i < $vlen )
				{
					$value = $values[$i];
				}
				if ( $i < $tlen )
				{
					$type = $types[$i];
				}
				
				switch ( $type )
				{
					case "BINARY": // Bit operation
						$where_or_str .= " or ( bitand(" . $code . ", " . $value . ") = " . $value . " ) ";
						break;
					case "STRING": // string
						$where_or_str .= " or " . $this->createConditionWithStringNoBinding( $code, $value, $value_delimiter );
						break;
					case "DATETIME": // date time
						$where_or_str .= " or " . $this->createConditionWithDatetimeNoBinding( $code, $value, $value_delimiter );
						break;
					case "NUMBER": // float, long, int, double, long long
						$where_or_str .= " or " . $this->createConditionWithNumberNoBinding( $code, $value, $value_delimiter );
						break;
					case "EXACT_STRING": // string to match exactly
						$where_or_str .= " or ( " . $code . "='" . $value . "' ) ";
						break;
					default: // default is always a string to match exactly
						$where_or_str .= " or ( " . $code . "='" . $value . "' ) ";
						break;
				}
			}
			
			if ( strlen($where_or_str) > 0 )
			{
				//$where_or_str = "1=0 " . $where_or_str;
				$where_or_str = substr($where_or_str, 4);
			}
			else
			{
				$where_or_str = "1=1 ";
			}
			
			$where_and_str .= "and ( " . $where_or_str . " ) \n";
        }
        
        $filter = "WHERE 1=1 " . $where_and_str;
        $filter .= "\n";
        
// Modified the log out put to LOG        
        //error_log ( $filter, 3, "temp.log");
        logMe( "NO-BINDING::::  ".$filter,GLOBALCLASS);
        
        return $filter;
    }
	
    /**
    * Prepare the where clause according to columns, values and data types for binding.
    *
    * @param array 				$fields      	The array of field=>value 
    * @param array 				$field_types    The array of field=>type  
    * @return                   				Returns the object containing where clause and binding values
    */
    public function createWhereConditionForBinding( $fields, $field_types )
    {
		// this is the delimiter to separate the multiple columns/values/types
		$field_delimiter = "||";
		// this is the delimiter for the range of values
        $value_delimiter = "~~";
		
        $where_and_str = "";
		$where_and_arr = array();
		
		// go through the code and value for each item, which could be a single code/value or multiple codes/values, such as: CMPY_CODE, aaa, or CMPY_CODE||CMPY_NAME, aaa||bbb
        foreach ($fields as $field_code => $field_value) 
        {
            if ( $field_value == "null" || $field_value == "(null)" || $field_value == "-1" || $field_value == "" || is_null($field_value) )
            {
                continue;
            }
			// get the type for current item, which could be a single type or multiple types, such as: STRING, or STRING||NUMBER
            $field_type = $this->getDataTypeOfColumn( $field_code, $field_types );
			
			// tokenize the string 
			$codes = explode( $field_delimiter, $field_code );
			$values = explode( $field_delimiter, $field_value );
			$types = explode( $field_delimiter, $field_type );
			
			$len = count( $codes );
			$vlen = count( $values );
			$tlen = count( $types );
			
			$where_or_str = "";
			$where_or_arr = array();
			for ( $i=0; $i<$len; $i++ )
			{
				// note: loop will be based on length of codes, if length of values and types are less, use the value and type in previous loop
				$code = $codes[$i];
				if ( $i < $vlen )
				{
					$value = $values[$i];
				}
				if ( $i < $tlen )
				{
					$type = $types[$i];
				}
		
				$filterObj = array();
				$filterObj['sql_text'] = "";
				$filterObj['sql_data'] = array();
				
				switch ( $type )
				{
					case "BINARY": // Bit operation
						//$where_or_str .= " or ( bitand(" . $code . ", " . $value . ") = " . $value . " ) ";
						$filterObj['sql_text'] = "( bitand(" . $code . ", :" . strtolower($code) . ") = :" . strtolower($code) . " ) ";
						$filterObj['sql_data'] = array($value);
						$where_or_str .= " or " . $filterObj['sql_text'];
						break;
					case "STRING": // string
						//$where_or_str .= " or " . $this->createConditionWithStringForBinding( $code, $value, $value_delimiter );
						$filterObj = $this->createConditionWithStringForBinding( $code, $value, $value_delimiter );
						$where_or_str .= " or " . $filterObj['sql_text'];
						break;
					case "DATETIME": // date time
						//$where_or_str .= " or " . $this->createConditionWithDatetimeForBinding( $code, $value, $value_delimiter );
						$filterObj = $this->createConditionWithDatetimeForBinding( $code, $value, $value_delimiter );
						$where_or_str .= " or " . $filterObj['sql_text'];
						break;
					case "NUMBER": // float, long, int, double, long long
						//$where_or_str .= " or " . $this->createConditionWithNumberForBinding( $code, $value, $value_delimiter );
						$filterObj = $this->createConditionWithNumberForBinding( $code, $value, $value_delimiter );
						$where_or_str .= " or " . $filterObj['sql_text'];
						break;
					case "EXACT_STRING": // string to match exactly
						//$where_or_str .= " or ( " . $code . "='" . $value . "' ) ";
						$filterObj['sql_text'] = "( " . $code . "=:" . strtolower($code) . " ) ";
						$filterObj['sql_data'] = array($value);
						$where_or_str .= " or " . $filterObj['sql_text'];
						break;
					default: // default is always a string to match exactly
						//$where_or_str .= " or ( " . $code . "='" . $value . "' ) ";
						$filterObj['sql_text'] = "( " . $code . "=:" . strtolower($code) . " ) ";
						$filterObj['sql_data'] = array($value);
						$where_or_str .= " or " . $filterObj['sql_text'];
						break;
				}
				
				$where_or_arr = array_merge( $where_or_arr, $filterObj['sql_data'] );
			}
			
			if ( strlen($where_or_str) > 0 )
			{
				//$where_or_str = "1=0 " . $where_or_str;
				$where_or_str = substr($where_or_str, 4);
			}
			else
			{
				$where_or_str = "1=1 ";
				$where_or_arr = array();
			}
			
			$where_and_str .= "and ( " . $where_or_str . " ) \n";
			$where_and_arr = array_merge( $where_and_arr, $where_or_arr );
        }
        
        $filter = "WHERE 1=1 " . $where_and_str;
        $filter .= "\n";
		
		$whereObj = array();
        $whereObj['sql_text'] = $filter;
		$whereObj['sql_data'] = $where_and_arr;

        logMe( "DO-BINDING::::  ".$filter,GLOBALCLASS);
        
        return $whereObj;
    }
	
    /**
    * Prepare the where clause according to columns, values and data types.
    *
    * @param array 				$fields      	The array of field=>value 
    * @param array 				$field_types    The array of field=>type  
    * @param integer			$field_binding  =1, do binding ; =0, no binding 
    * @return                   				Returns the object containing where clause and binding values or just where clause when no binding required
    */
    public function createWhereCondition( $fields, $field_types, $field_binding=0 )
    {
		if( $field_binding > 0 ) 
		{
			return $this->createWhereConditionForBinding( $fields, $field_types );
		}
		else
		{
			return $this->createWhereConditionNoBinding( $fields, $field_types );
		}
	}
	
	
	
/*
    public function createWhereCondition( $fields, $types )
    {
        $delimiter = "~";
        $where_str = "";
        foreach ($fields as $field => $value) 
        {
            if ( $value == "null" || $value == "(null)" || $value == "-1" || $value == "" || is_null($value) )
            {
                continue;
            }
            $data_type = $this->getDataTypeOfColumn( $field, $types );
            switch ( $data_type )
            {
                case "BINARY": // Bit operation
                    $where_str .= " and ( bitand(" . $field . ", " . $value . ") = " . $value . " ) ";
                    break;
                case "STRING": // string
                    $where_str .= " and " . $this->createConditionWithString( $field, $value, $delimiter );
                    break;
                case "DATETIME": // date time
                    $where_str .= " and " . $this->createConditionWithDatetime( $field, $value, $delimiter );
                    break;
                case "NUMBER": // float, long, int, double, long long
                    $where_str .= " and " . $this->createConditionWithNumber( $field, $value, $delimiter );
                    break;
                default: // default is always string
                    $where_str .= " and " . $this->createConditionWithString( $field, $value, $delimiter );
                    break;
            }
        }
        
        $filter = "WHERE 1=1 " . $where_str;
        $filter .= "\n";
        
// Modified the log out put to LOG        
//        error_log ( $filter, 3, "db_transactions.log");
        logMe($filter,GLOBALCLASS);
        
        return $filter;
    }
*/


    /*============================================================================*/
    // Make the orderby clause according to sorts and orders
    /*============================================================================*/
    public function createOrderbyCondition( $sorts, $orders )
    {
        $orderby_str = "";
        if ( $sorts == "" || is_string($sorts) )
        {
            $orderby_str = $sorts;
            return $orderby_str;
        }
        
        $new_orders = get_object_vars($orders);
        asort( $new_orders );
        foreach ($sorts as $field => $sort) 
        {
            $new_orders[$field]= $sort;
        }
        
        foreach ($new_orders as $field => $sort) 
//        foreach ($sorts as $field => $sort) 
        {
            $orderby_str .= ", " . $field . " " . $sort;
        }
        if ( strlen( $orderby_str ) > 0)
        {
            $orderby_str = substr( $orderby_str, 2 );
        }

        // Modified the log out put to LOG
//        error_log ( "\n----".$orderby_str, 3, "temp.log");
        logMe("orderby ---- ".$orderby_str,GLOBALCLASS);
        
        return $orderby_str;
    }
}
?>
