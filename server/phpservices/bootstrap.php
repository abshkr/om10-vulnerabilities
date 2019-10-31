<?php
require_once(dirname(__FILE__) . '/classes/DB.class.php');
require_once 'Zend/Db.php';
require_once 'Zend/Db/Table/Abstract.php';


/* define the module name for calling logMe() to output */
if(!defined('BOOTSTRAP')) define('BOOTSTRAP','bootstrap');

/*** Not used anymore ***
$options = array(Zend_Db::AUTO_QUOTE_IDENTIFIERS => false);
$db = Zend_Db::factory('oracle', array(
    'username' => $DB_USER,
    'password' => $DB_PWD,
    'dbname'   => $DB_NAME,
	'options'  => $options));

Zend_DB_Table_Abstract::setDefaultAdapter($db);
***/

function prepareForAMF($data, $arrTypes, $arrDates = NULL){
    if(count($data)==0) return $data;
    $ret=array();
    $substract=false;

    if (!array_key_exists('0', $data)){
        $data=array($data);
        $substract=true;
    }
    
    for($i=0; $i<count($data); $i++){
        $o = new $arrTypes[0]();
        foreach ($data[$i] as $property=>$value){
            $pproperty = strtolower($property);
            if ($arrDates && array_key_exists($pproperty, $arrDates)){
                $o->$pproperty = new DateTime($value);
            }else{
                $o->$pproperty = $value;
            }
        }
        $ret[] = $o;
    }
    if ($substract) $ret = $ret[0];
    return $ret;
}

/**
* Recursively process an array to convert all values in the array
* @param $data the array to be processed. This is pass-by-reference.
*/
function arrayEncodingConversion(&$data, $to = 'UTF-8', $from = 'GB2312')
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
                arrayEncodingConversion($data[$key], $to, $from);
            else if (is_object($data))
                arrayEncodingConversion($data->$key, $to, $from);
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

function stringEncodingConversion($data, $to = 'UTF-8', $from = 'GB2312')
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

/**
* Check whether an array contains invalid key by comparing to BaseProducts class.
* @param $data an arry to be checked.
* @param $errMsg once invalid key found, this parameter passes error message to caller.
* @retval: TRUE or FALSE
*/
function integrityCheck($data, &$errMsg, $className)
{
    $class = new $className();
    foreach ($data as $key=>$value)
    {
        $key = strtolower($key);
        if (!property_exists($class, $key))
        {
            $errMsg = "$key does not exist in $data";
            return FALSE;
        }
    }
    
    return TRUE;
}

/**
* Convert a class object to array
*/
function classToArray($data)
{
    $ret = array();
    foreach ($data as $key=>$value)
    {
        if (!is_null($value))
        {
            //logMe("in classToArray, " . $key . " " . $value);
            $ret["$key"] = $value;
        }
    }
    return $ret;
}

function makeArrayFromObject($data, $arrDates=NULL) 
{
	$data = (array)$data;
	foreach ($data as $k => $v) {
		if (is_array($v)) {
			$data[$k] = makeArrayFromObject($v, $arrDates);
		} else {
			if ($arrDates && array_key_exists($k, $arrDates)) {
				if ($v instanceof DateTime) {
					$data[$k] = $v->format('Y-m-d');
				} else {
					$data[$k] = $v->toString('Y-M-d');
				}
			} else if (is_object($v)) {
				$data[$k] = (array)$v;
			}
		}
	}
	return $data;
}

function cleanRefences($data, $references) 
{
	foreach ($references as $key => $val) {
		if (array_key_exists($key, $data)) {
			$data[$key] = NULL;
		}
	}
	return $data;
}

function objectToArray( $object ){
    if(!is_object($object) && !is_array($object)){
        return $object;
    }
    if(is_object($object)){
        $object=get_object_vars($object);
    }
    return array_map( 'objectToArray', $object);
}


function oracle_escape_string($str)
{
	$str = str_replace("'", "\'", $str);
	$str = str_replace(";", "", $str);
	return str_replace("\"", "\\\"", $str);
}

/*
 * This function returns the primary key of a table, generally identified by the suffix '_code'.
 * Be aware that this logic is not valid for every table in the db, because sometimes the primary key has a different name.
 */
function getTableKey($tbl_name){
    $vars = get_class_vars($tbl_name);
    $key = '';
    foreach ($vars as $name => $value){
        if(preg_match("/_code/", $name)) $key=$name;
    }
    return $key;
}

/*
 * Builds a generic string for the INSERT query
 */
// Builds an insert string without binding
function getInsertStringNoBinding($data){
    $fields = "";
    $values = "";
    foreach ($data as $key=>$value){
        if (!is_null($value)){
            $fields .= $key.",";
            $values .= "'$value',";
        }
    }
    $fields = preg_replace("/,$/", "", $fields);
    $values = preg_replace("/,$/", "", $values);    
    $ret = "($fields) VALUES($values)";
    return $ret;    
}

// Builds an insert string for binding
function getInsertStringForBinding($data){
    $fields = "";
    $values = "";
	$params = array();
    foreach ($data as $key=>$value){
        if (!is_null($value)){
            $fields .= $key.",";
            $values .= ":" . strtolower($key) . ",";
			$params[] = $value;
        }
    }
    $fields = preg_replace("/,$/", "", $fields);
    $values = preg_replace("/,$/", "", $values);    
    $ret = "($fields) VALUES($values)";
	
	$ret_arr = array();
	$ret_arr['sql_text'] = $ret;
	$ret_arr['sql_data'] = $params;
	
    return $ret_arr;    
}

function getInsertString($data, $binding=0)
{
	if ( $binding > 0 )
	{
		return getInsertStringForBinding( $data );
	}
	else
	{
		return getInsertStringNoBinding( $data );
	}
}


/*
 * Builds a generic string for the UPDATE query
 */
// Builds an update string without binding
function getUpdateStringNoBinding($data){
    $values = "";
    foreach ($data as $key=>$value){
        if (!is_null($value)){
            $values .= "$key='$value',";
        }
    }
    $values = preg_replace("/,$/", "", $values);    
    return $values;
}

// Builds an update string for binding
function getUpdateStringForBinding($data){
    $values = "";
	$params = array();
    foreach ($data as $key=>$value){
        if (!is_null($value)){
            $values .= "$key=:" . strtolower($key) . ",";
			$params[] = $value;
        }
    }
    $values = preg_replace("/,$/", "", $values);    
	
	$ret_arr = array();
	$ret_arr['sql_text'] = $values;
	$ret_arr['sql_data'] = $params;
	
    return $ret_arr;
}

function getUpdateString($data, $binding=0)
{
	if ( $binding > 0 )
	{
		return getUpdateStringForBinding( $data );
	}
	else
	{
		return getUpdateStringNoBinding( $data );
	}
}



function getMonthNumber($str){
    $ret=0;
    switch ($str){
        case 'JAN': $ret=1;break;
        case 'FEB': $ret=2;break;
        case 'MAR': $ret=3;break;
        case 'APR': $ret=4;break;
        case 'MAY': $ret=5;break;
        case 'JUN': $ret=6;break;
        case 'JUL': $ret=7;break;
        case 'AUG': $ret=8;break;
        case 'SEP': $ret=9;break;
        case 'OCT': $ret=10;break;
        case 'NOV': $ret=11;break;
        case 'DEC': $ret=12;break;
    }
    return $ret;
}
 /**
    * date_time_is_valid function is there to validate
    * all the date time stamps
    * This function can validate two types of time stamps
    * 1) YYYY-MM-DD HH24:mm [Date & Time]
    * 2) YYYY-MM-DD [Date Only]
    * input 
    * @param $str: This is the YYYY-MM-DD HH24:mm date time stamp;
    * @param $checktime: Set this to False for YYYY-MM-DD string; 
                   
    */    
function date_time_is_valid($str, $checktime=true) {
   
    $timeValid = true;
    //True means we also need to validate time
    if ($checktime && (strlen($str)>0))
    {
        $timeValid = false;
        if (substr_count($str, ' ') == 1) {
            list ($dateStr, $timeStr) = explode(' ', $str);
            $timeValid = preg_match("#([0-1]{1}[0-9]{1}|[2]{1}[0-3]{1}):[0-5]{1}[0-9]{1}#", $timeStr);
            }
           
    }
        
    //only comes here when Time is already valid
    //OR time check is not required
    if ((!$checktime || ($timeValid==true))&& (strlen($str)>0))
    {
        //only interested in getting YYYY-MM-DD
        $dateStr = substr($str, 0, 10);
        if ( preg_match('/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/', $dateStr) ) {
                list($year , $month , $day) = explode('-',$dateStr);
                return checkdate($month , $day , $year);
            }
    }

    // Output the error information to ERRORLOG
    trigger_error(" [$str] is invalid date in function date_time_is_valid()",E_USER_WARNING);
    return false;
}
