<?php
class OpenOrderService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	
	public function __construct()
	{
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
		//$this->server = "localhost".$DBPort."/".$_SERVER['OMEGA_DBASE'];     		
		//$this->connect = oci_connect("DF_COOGEE","abcd1234","localhost/OML5K","zhs16gbk");
		$this->server = "localhost".$DBPort."/".$_SERVER['OMEGA_DBASE'];     		
		$this->connect = oci_connect($this->username,$this->password,$this->server,"zhs16gbk");
	}
	
	public function getData()
	{
		$query = "SELECT * FROM GUI_ORDERS";
 		$stid = oci_parse($this->connect, $sqlCount);
		oci_execute($stid);
		$row = oci_fetch_object($stid);
		$count = $row->TOTAL_COUNT;
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);

		while (($row = oci_fetch_object($stid)))
		{
			//XarrayEncodingConversion($row);
			$res[] = $row;
		}
		return $res;
	}
	
   public function getPaged($values, $dtypes, $sorts, $orders, $pageNum = 1, $pageSize = 50)
	{
		if ($values == "" || is_string($values) )
		{
			$filter = $values;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $this->createWhereCondition( $fields, $types );
		} 
		
		$sort = $this->createOrderbyCondition ($sorts, $orders);
        if($sort!='')$sort="ORDER BY $sort";
		else $sort="ORDER BY ORDER_SYS_NO DESC";
		
		$query = "SELECT * FROM GUI_ORDERS $filter $sort";
		//$query = "SELECT * FROM GUI_ORDERS ";

		$low   = ($pageNum-1)*$pageSize+1;
		$high  = $pageNum*$pageSize; 
		$queryPaged = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		
		$sqlCount = "SELECT COUNT(*) TOTAL_COUNT FROM ($query)";
 		$stid = oci_parse($this->connect, $sqlCount);
		oci_execute($stid);
		$row = oci_fetch_object($stid);
		$count = $row->TOTAL_COUNT;
		
		
		$stid = oci_parse($this->connect, $queryPaged);
		oci_execute($stid);
		

		while (($row = oci_fetch_object($stid)))
		{
			$res[] = $this->upperArray($row);
		}
		
		$data->count = $count;
		$data->data = (json_encode($res));

		return($data);
    } 

    public function upperArray($data)
	{
		$arr = array();
		foreach ( $data as $key=>$value )
		{
			$arr[ strtolower($key) ] = $value;
		}
		
		return $arr;
	}

    public function createConditionWithNumber( $variable, $value, $delimiter )
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
		

    /*============================================================================*/
    // Make the condition containing datetime for a sql in Oracle database
    /*============================================================================*/
    public function createConditionWithDatetime( $variable, $value, $delimiter )
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

    /*============================================================================*/
    // Make the condition containing strings for a sql in Oracle database
    /*============================================================================*/
    public function createConditionWithString( $variable, $value, $delimiter )
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

    /*============================================================================*/
    // get the data type of a column
    /*============================================================================*/
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

    /*============================================================================*/
    // Make the where clause according to columns, values and data types
    /*============================================================================*/
    public function createWhereCondition( $fields, $field_types )
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
						$where_or_str .= " or " . $this->createConditionWithString( $code, $value, $value_delimiter );
						break;
					case "DATETIME": // date time
						$where_or_str .= " or " . $this->createConditionWithDatetime( $code, $value, $value_delimiter );
						break;
					case "NUMBER": // float, long, int, double, long long
						$where_or_str .= " or " . $this->createConditionWithNumber( $code, $value, $value_delimiter );
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
        return $filter;
    }

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
//        logMe("orderby ---- ".$orderby_str,GLOBALCLASS);
        
        return $orderby_str;
    }	
}
?>