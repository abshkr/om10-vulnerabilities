<?php

require_once('dmModel.php');
require_once('dmController.php');
require_once('framework-utils.php');

class dmCollection extends dmCore{

	public $payload;
	
	protected $SQLTable;
	protected $preSQL;
	protected $postSQL;
	
	protected $sql;							//the resulting SQL for this collection (after rendition)
	protected $countSQL;					//the resulting count SQL for this collection (after rendition)
	
	public $collection;						//an array for all instances of gatherered models in this ocllection.
	public $count;							//the amount of mdoels in this collection
	public $totalCount;						//the potential ammount (ie. number of records) models in this collection.
	
	public $whiteList;						//an array of fields which will ONLY be rendered into the payloads of this collection's models.
	public $blackist;						//an array of fields which will NOT be rendered into the payloads of this collection's models.
	private $fieldList;

	protected $ctl;							//a reference to the controller singleton
	
	//primary selector
	public $sqlSelect;						//set by the subclass (eg. "SELECT * FROM SOMETABLE");
	public $sqlCount;						//set by the subclass (eg. "SELECT COUNT(*) FROM SOMETABLE")
	
	//groupFilters combine filter and range together
	public $groupFilters;
	// allow multiple orders
	public $orders;
	
	//filter
	public $filter;
	protected $filterPreResult;
	protected $filterPostResult;
	
	//range.
	public $range;
	protected $rangePreResult;
	protected $rangePostResult;
	
	//order
	public $order;
	protected $orderPreResult;
	protected $orderPostResult;
	
	//conditions
	protected $cJoin = "WHERE";
	public $instantiate;					//toggle to determine if the presentation classes (AS3 dm) should fully instance the return as a mapped AS3 class.

	/**
	 * Constructor
	 * 
	 * @param string $params
	 * 
	 */
	public function __construct( $params = false ){

		$this->payload = array();
		$this->collection = array();
		$this->preSQL = "";
		$this->postSQL = "";
		$this->sql = "";
		$this->instantiate = true;

		if( ($params) && (is_object($params)) )
		{
		
			if(isset($params->groupFilters))
			{
				$this->groupFilters = $params->groupFilters;
				new dmMesg(array("dev" => '\n\nHERE IT IS in dmCollections.construct:' . print_r($this->groupFilters, TRUE)));
			}
			if(isset($params->orders))
			{
				$this->orders = $params->orders;
				new dmMesg(array("dev" => '\n\nHERE IT IS in dmCollections.construct:' . print_r($this->orders, TRUE)));
			}
			if(isset($params->filter))		$this->filter = $params->filter;
			if(isset($params->range))		$this->range = $params->range;
			if(isset($params->order))		$this->order = $params->order;
			if(isset($params->whiteList))	$this->whiteList = $params->whiteList;
			if(isset($params->blackList))	$this->blackList = $params->blackList;
			if(isset($params->instantiate))	$this->instantiate = $params->instantiate;
			if(isset($params->needFetchLists))	$this->needFetchLists = $params->needFetchLists;
			if(isset($params->requestMode))	$this->requestMode = $params->requestMode;
			
		}
		
		$this->ctl = dmController::getController();
					
	}

	protected function compileFieldList(){

		//if neither are set, we'll opt to get all fields.
		if( (!isset($this->whiteList)) && (!isset($this->blackList)) ){

			$this->fieldList = array('*');
			return new dmMesg();

		}
		
		//retrieve all available fields for this collection's model.
		//I would rather instance an empty model and invoke it against the model however we'll do it here as there 
		//is some discussion surrounding "modelless collections right now"
		if(!isset($this->SQLTable))
			return new dmError(array("dev" => "No corresponding tablename set for class [" . get_class() . "]"));
		
		$sql = "SELECT column_name \"Name\", nullable \"Null?\", concat(concat(concat(data_type,'('),data_length),')') \"Type\" FROM user_tab_columns WHERE table_name='" . $this->SQLTable . "'";
		
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg) return $chk;
		$rows = $chk->data;
		
		//we have the rows so set up this method.

		$fields = array();
		$this->fieldList = array();

		foreach($rows as $row){
			$fields[] = $row['Name'];
		}


		//deal with the whitelist.only if we have one, if not assign all fields to the field list and we'll move on  to the blacklist.
		if( (isset($this->whiteList)) && (!empty($this->whiteList)) ){

			foreach($this->whiteList as $allowedField){			
			
				foreach($fields as $field){
			
					//if the field is found in the whitelist and the field list push it onto the classes field list.
					if($field == $allowedField)	$this->fieldList[] = $field;
			
				}
			
			}

		}
		else //assign all fields to the field list.
			$this->fieldList = $fields;

		//deal with the blacklist.
		if( (isset($this->blackList)) && (!empty($this->blackList)) ){

			foreach($this->blackList as $disallowedField){

				foreach($this->fieldList as $k => $field){

					if($field == $disallowedField)	unset($this->fieldList[$k]);
				
				}
			}

		}

		//we should hav ea rational field list now.


		return new dmMesg(array("dev" => "Fields were:" . print_r($fields, TRUE)));

	}

	/**
	 * Instance all models inside this collection.
	 * 
	 * @param [NONE]
	 * 
	 * @return dmMesg|dmError On success, dmMesg with the data attribute set to null; dmError on failure.
	 * 
	 */
	public function instance( $params = false ){
		
		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//if no model was set, through an error.
		if(!isset($this->model))			return new dmError(array("dev" => "No model is set for this collection [" . get_class() . "], please rectify this."));
		
		//if the class doesn't exist 
		if(!class_exists($this->model)){
			
			//attempt to include it, if it still doesn't exist die.
			if(file_exists(__DIR__ . "/models/" . $this->model . ".php")){
				
				require_once(__DIR__ . "/models/" . $this->model . ".php");
				if(!class_exists($this->model))	return new dmError(array("dev" => "The model [" . $this->model . "] was found as a class file at [" . __DIR__ . "/models/" . $this->model . ".php but the class does not exist"));
		
			}
			else
				return new dmError(array("dev" => "The model [" . $this->model . "] does not exist as a class nor as a file at [" . __DIR__ . "/models/" . $this->model . ".php],  please rectify this"));
		
		}
		
		
		//we have a model, ensure we have a collection
		$model = $this->model;
		$tArray = array();
		foreach($this->collection as $modelPayload){
				
			$tArray[] = new $model((object)array("payload" => $modelPayload));
		
		}
		
		$this->collection = $tArray;
		return new dmMesg();
		
	}
	
	/**
	 * Gather all models, applying the collection's search parameters, retrieving the data and returning a populated collection.
	 * 
	 * @return dmMesg|dmError; dmMesg with the data attribute set to null, dmError on failure.
	 * 
	 */
	public function gather( $params = false ){
		
		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)		return $chk;
		$params = $chk->data;
		
		//gather fields by parsing the white and blacklists.
		if(!($chk = $this->compileFieldList()) instanceOf dmMesg)			return $chk;
		
		//process all siblings
		if(!($chk = $this->getData($params)) instanceOf dmMesg)				return $chk;
		
		if(!($chk = $this->compile($params)) instanceOf dmMesg)				return $chk;

		if(!($chk = $this->processSQL()) instanceOf dmMesg)					return $chk;
		
		if(!($chk = $this->instance()) instanceOf dmMesg)					return $chk;

		if($this->filter)
			new dmMesg(array("dev" => '\n\nHERE IT IS:' . print_r($this->filter, TRUE)));
		
		if($this->groupFilters)
			new dmMesg(array("dev" => '\n\nHERE IT IS:' . print_r($this->groupFilters, TRUE)));

		return new dmMesg();
		
	}
	
	/**
	 * 
	 * @param string $params
	 * @return Ambigous <dmMesg, dmError>|dmError|Ambigous <dmMesg, dmError, unknown, Ambigous>|dmMesg
	 */
	public function getData( $params = false ){
		
		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		if(!isset($this->sqlSelect)){
		
			$fields = "";
			foreach($this->fieldList as $field)
				$fields .= $field . ", ";

			$fields = substr($fields, 0, -2);

			//set the sqlSelector and counter
			$this->sqlSelect = "SELECT " . $fields . " FROM " . $this->SQLTable;

			$this->sqlCount = "SELECT COUNT(*) FROM " . $this->SQLTable;
			
		}
		
		//set the filter
		if(!isset($this->groupFilters) || (!$this->groupFilters))
		{
			// groupFilters not defined, then use the old filter and range
			if(!($chk = $this->parseFilter()) instanceOf dmMesg)			return $chk;
			if(!($chk = $this->parseRange()) instanceOf dmMesg)				return $chk;
		}
		else
		{
			if( !isset( $this->groupFilters->filters ) || ( !$this->groupFilters->filters ) )
			{
				// groupFilters defined but no filtering details, then use the old filter and range
				if(!($chk = $this->parseFilter()) instanceOf dmMesg)			return $chk;
				if(!($chk = $this->parseRange()) instanceOf dmMesg)				return $chk;
			}
			else
			{
				if(!($chk = $this->parseGroupFilters()) instanceOf dmMesg)			return $chk;
			}
		}
		
		//set the order
		if(!isset($this->orders) || (!$this->orders))
		{
			// orders not defined, then use the old order
			if(!($chk = $this->parseOrder()) instanceOf dmMesg)				return $chk;
		}
		else
		{
			if(!($chk = $this->parseOrders()) instanceOf dmMesg)				return $chk;
		}

		//if(!($chk = $this->parseFilter()) instanceOf dmMesg)			return $chk;
		//if(!($chk = $this->parseOrder()) instanceOf dmMesg)				return $chk;
		//if(!($chk = $this->parseRange()) instanceOf dmMesg)				return $chk;

		
		return new dmMesg(array("dev" => "Query Compilation for Collection complete."));
		
	}
	
	/**
	 * Compile SQL in the class context.
	 * 
	 * @param string $params
	 * 
	 * @return Ambigous <dmMesg, dmError>|dmMesg
	 */
	protected function compile( $params = false ){
		
		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		$this->sql  = "";
		$this->countSQL = "";
		
		$this->sql .= $this->sqlSelect;
		$this->countSQL .= $this->sqlCount;
		
		//are we doing any conditions at all?		if not return, we're done.
		if(
			(!$this->filterPreResult)	&&
			(!$this->filterPostResult)	&&
			(!$this->rangePreResult)	&&
			(!$this->rangePostResult)	&&
			(!$this->orderPreResult)	&&
			(!$this->orderPostResult)						
		){
			
		
			return new dmMesg(array("dev" => "SQL COLLECTION Compilation complete - nothing to do."));
		}
		//compile filters if required.
		if( (isset($this->filterPostResult))	&& (!empty($this->filterPostResult)) ){
			
			$this->sql .= " " . $this->cJoin . " " . $this->filterPostResult;
			$this->countSQL .= " " . $this->cJoin . " " . $this->filterPostResult;
			$this->cJoin = "AND";
		}
		
		//compile ranges if required.
		if( (isset($this->rangePostResult)) && (!empty($this->rangePostResult)) ){
			$this->sql .= " " . $this->cJoin . " " . $this->rangePostResult;
			$this->countSQL .= " " . $this->cJoin . " " . $this->rangePostResult;
			$this->cJoin = "AND";
		}	
		
		//compile ORDER if required.
		
		//first up, check to ensure we're not a calander collection (else we'll try to order by before doing a conditional time (GEN_DATE < '2013-02-20 12:35:33')
		
		if( (isset($this->orderPostResult)) && (!empty($this->orderPostResult)) ){
		
			if(!$this instanceOf dmCalendarCollection){

				$this->sql .= " " . $this->orderPostResult;
				$this->countSQL .= " " . $this->orderPostResult;
				$this->cJoin = "AND";
			
			}
			else{
			$this->CCorderResult = $this->orderPostResult;
		  }
		  
		}
		
	
		
		return new dmMesg(array("dev" => "SQL COLLECTION Compilation complete."));
		
	}




	/**
	 * Get the proper operators for a filter operation
	 * 
	 * @return a filter operators as an Array
	 */
    protected function getFilterOperators( $operator, $len, $delimiter )
    {
        $ops = explode( $delimiter, $operator );
		$op_len = count( $ops );
		
		// get the proper operators for values
        if ( $len <= 0 )
        {
            // extreme case
			if ( $op_len <= 0 )
			{
				$ops = array();
			}
       }
        else
        if ( $len == 1 )
        {
			if ( $op_len <= 0 )
			{
				$ops = array();
				$ops[0] = "=";
			}
		}
        else
        {
            // no delimiter, no comparison
			if ( $op_len <= 0 )
			{
				$ops = array();
				$ops[0] = ">=";
				$ops[1] = "<";
			}
			else
			if ( $op_len == 1 )
			{
				$ops[1] = "<";
			}
			else
			{
				// use the first 2 operators
			}
		}
        
		return $ops;
    }

	/**
	 * Make the filter statement for a NUMBER field in a sql in Oracle
	 * 
	 * @return a filter statement as a String
	 */
    protected function createNumberFilterStatement( $variable, $value, $operator, $delimiter )
    {
    	if ( strlen( $delimiter ) <= 0 )
    	{
    		$ranges = array( $value );
    		$ops = array( $operator );
    		$len = 1;
    	}
    	else
    	{
        	$ranges = explode( $delimiter, $value );
        	$len = count( $ranges );
			// get the proper operators for values
			$ops = $this->getFilterOperators( $operator, $len, $delimiter );
    	}
		
		// construct the conditions
        $condition = "";
        if ( $len <= 0 )
        {
            // extreme case
            $condition = " 1=1 ";
        }
        else
        if ( $len == 1 )
        {
            // no range
			if ( strtoupper($ops[0]) == "LIKE" )
			{
				$condition = " (TO_CHAR(".$variable . ") LIKE '%" . $value . "%') ";
			}
			else
			if ( strtoupper($ops[0]) == "LIKE2" )
			{
				$condition = " ('" . $value . "' LIKE '%'||" . "TO_CHAR(".$variable . ")||'%') ";
				//$condition = " (" . "UPPER('".$value . "') LIKE '%'||" . "UPPER(".$variable . ")||'%') ";
			}
			else
			{
				$condition = " (" . $variable . $ops[0] . $value . ") ";
			}
         }
        else
        {
            if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) > 0 )
            {
                // value: value1~value2
                $condition = " (" . $variable . $ops[0] . $ranges[0] . " AND " . $variable . $ops[1] . $ranges[1] . ") ";
            }
            else
            {
                if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) <= 0 )
                {
                    //value: value1~
                    $condition = " (" . $variable . $ops[0] . $ranges[0] . ") ";
                }
                else
                if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] ) > 0 )
                {
                    //value: ~value2
                    $condition = " (" . $variable . $ops[1] . $ranges[1] . ") ";
                }
                else
                //if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] )<=0 )
                {
                    //value: ~
                    $condition = " 1=1 ";
                }
            }
        }
        new dmMesg(array("dev" => "NUMBER ============ " . $condition));

        return $condition;
    }

	/**
	 * Make the filter statement for a STRING field in a sql in Oracle
	 * 
	 * @return a filter statement as a String
	 */
    protected function createStringFilterStatement( $variable, $value, $operator, $delimiter )
    {
    	if ( strlen( $delimiter ) <= 0 )
    	{
    		$ranges = array( $value );
    		$ops = array( $operator );
    		$len = 1;
    	}
    	else
    	{
        	$ranges = explode( $delimiter, $value );
        	$len = count( $ranges );
			// get the proper operators for values
			$ops = $this->getFilterOperators( $operator, $len, $delimiter );
    	}
        
		// construct the conditions
        $condition = "";
        if ( $len <= 0 )
        {
            // extreme case
            $condition = " 1=1 ";
        }
        else
        if ( $len == 1 )
        {
            // no range
			if ( strtoupper($ops[0]) == "LIKE" )
			{
				$condition = " (UPPER(".$variable . ") LIKE UPPER('%" . $value . "%')) ";
			}
			else
			if ( strtoupper($ops[0]) == "LIKE2" )
			{
				$condition = " (" . "UPPER('".$value . "') LIKE '%'||" . "UPPER(".$variable . ")||'%') ";
			}
			else
			{
				$condition = " UPPER(".$variable . ")" . $ops[0] . "UPPER('" . $value . "') ";
			}
         }
        else
        {
            if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) > 0 )
            {
                // value: value1~value2
                $condition = " (" . $variable . $ops[0] . "'" . $ranges[0] . "' AND " . $variable . $ops[1] . "'" . $ranges[1] . "') ";
            }
            else
            {
                if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) <= 0 )
                {
                    //value: value1~
                    $condition = " (" . $variable . $ops[0] . "'" . $ranges[0] . "') ";
                }
                else
                if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] ) > 0 )
                {
                    //value: ~value2
                    $condition = " (" . $variable . $ops[1] . "'" . $ranges[1] . "') ";
                }
                else
                //if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] )<=0 )
                {
                    //value: ~
                    $condition = " 1=1 ";
                }
            }
        }
        new dmMesg(array("dev" => "STRING ============ " . $condition));
        
        return $condition;
    }

	/**
	 * Make the filter statement for a DATETIME field in a sql in Oracle
	 * 
	 * @return a filter statement as a String
	 */
    protected function createDatetimeFilterStatement( $variable, $value, $operator, $delimiter, $format )
    {
    	if ( strlen( $delimiter ) <= 0 )
    	{
    		$ranges = array( $value );
    		$ops = array( $operator );
    		$len = 1;
    	}
    	else
    	{
        	$ranges = explode( $delimiter, $value );
        	$len = count( $ranges );
			// get the proper operators for values
			$ops = $this->getFilterOperators( $operator, $len, $delimiter );
    	}
        new dmMesg(array("dev" => "RANGES ============ " . print_r($ranges, TRUE)));
        new dmMesg(array("dev" => "OPS ============ " . print_r($ops, TRUE)));
        
		// construct the conditions
        $condition = "";
        if ( $len <= 0 )
        {
            // extreme case
            $condition = " 1=1 ";
        }
        else
        if ( $len == 1 )
        {
            // no range
			if ( strtoupper($ops[0]) == "LIKE" )
			{
				$condition = " (UPPER(TO_CHAR(".$variable . ", '" . $format . "')) LIKE UPPER('%" . $value . "%')) ";
			}
			else
			{
				$condition = " (" . $variable . $ops[0] . "TO_DATE('" . $value . "', '" . $format . "')) ";
			}
         }
        else
        {
            if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) > 0 )
            {
                // value: value1~value2
                $condition = " (" . $variable . $ops[0] . "TO_DATE('" . $ranges[0] . "', '" . $format . "')" . " AND " . $variable . $ops[1] . "TO_DATE('" . $ranges[1] . "', '" . $format . "')) ";
        new dmMesg(array("dev" => "DATETIME 0+1============ " . $condition));
            }
            else
            {
                if ( strlen( $ranges[0] ) > 0 && strlen( $ranges[1] ) <= 0 )
                {
                    //value: value1~
                    $condition = " (" . $variable . $ops[0] . "TO_DATE('" . $ranges[0] . "', '" . $format . "')) ";
                }
                else
                if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] ) > 0 )
                {
                    //value: ~value2
                    $condition = " (" . $variable . $ops[1] . "TO_DATE('" . $ranges[1] . "', '" . $format . "')) ";
                }
                else
                //if ( strlen( $ranges[0] ) <= 0 && strlen( $ranges[1] )<=0 )
                {
                    //value: ~
                    $condition = " 1=1 ";
                }
            }
        }
        new dmMesg(array("dev" => "DATETIME ============ " . $condition));
        
        return $condition;
    }

	/**
	 * Parses the group of filters args to an SQL string, and returns it; does not paramatise the class at all.
	 * 
	 * @return dmError|dmMesg
	 */
	protected function parseGroupFilters(){
		
		/*
		 * groupFilters : {
		 *      "logicalOps"     : "AND" | "OR" | "( {0} AND {1} AND ( {2} OR {3}) )"
		 * 
		* 		"filters" : {
		*         0: {
		*               "field"      : "field name|field1,field2,..."
		*               "value"      : "field value: x|x~|x~y|~y"
		*               "type"       : "field data type:NUMBER|STRING|DATETIME|BINARY"
		*               "format"     : "format pattern for the field value"
		*               "delimiter"  : "delimiter for range: N/A|~"
		*               "operator"   : "operator for filter: =|>=~<|like|is not"
		*               "logic"      : "N/A|AND|OR"
		*          },
		*        1: {
		*               "field"      : "field name|field1,field2,..."
		*               "value"      : "field value: x|x~|x~y|~y"
		*               "type"       : "field data type:NUMBER|STRING|DATETIME|BINARY"
		*               "format"     : "format pattern for the field value"
		*               "delimiter"  : "delimiter for range: N/A|~"
		*               "operator"   : "operator for filter: =|>=~<=|like|is not"
		*               "logic"      : "N/A|AND|OR"
		*          },
		*          ......
		* 		}
		 * 
		 * }
		 * 
		 */
		
		//do nothing.
		if(!isset($this->groupFilters) || (!$this->groupFilters))
		{
			return new dmMesg();
		}
		if(!is_array($this->groupFilters) && !is_object($this->groupFilters))
		{
			return new dmError(array("dev" => "Found the groupFilters set but neither an array nor a object, it is:\n" . print_r($this->groupFilters, TRUE)));
		}				
		
		if( !isset( $this->groupFilters->filters ) || ( !$this->groupFilters->filters ) )
		{
			return new dmMesg(array("dev" => "No filters are specified"));
		}
		else
		{
			$filters = $this->groupFilters->filters;
		}
		
		if( !isset( $this->groupFilters->logicalOps ) || ( !$this->groupFilters->logicalOps ) )
		{
			$logicalOps = "AND";
		}
		else
		{
			$logicalOps = $this->groupFilters->logicalOps;
		}
		
		$strFilters = array();
		foreach( $filters as $id => $filter)
		{
			// initialize the filter settings
			//		 *               "field"      : "field name|field1,field2,..."  -- multiple fields will require logic operator
			if( !isset($filter->field) || (!$filter->field) )
			{
				new dmError(array("dev" => "When using filters, the field must be specified."));
				$strFilters[ $id ] = " 1=1 ";
				continue;
			}
			else
			{
				$field = $filter->field;
			}
			//		 *               "value"      : "field value: x|x~|x~y|~y"      -- range of values will require delimiter
			if( !isset($filter->value) || (is_null($filter->value) == TRUE || trim($filter->value)=="") )
			{
				new dmError(array("dev" => "When using filters, the value must be specified."));
				$strFilters[ $id ] = " 1=1 ";
				continue;
			}
			else
			{
				$value = $filter->value;
			}
			//		 *               "type"       : "field data type:NUMBER|STRING|DATETIME|BINARY"   -- all fields share one type
			if( !isset($filter->type) || (!$filter->type) )
			{
				$type = "STRING";
			}
			else
			{
				$type = $filter->type;
			}
			//		 *               "format"     : "format pattern for the field value"              -- all fields share one format
			if( !isset($filter->format) || (!$filter->format) )
			{
				$format = "";
				if( $type == "DATETIME" )
				{
					$format = "YYYY-MM-DD HH24:MI:SS";
				}
			}
			else
			{
				$format = $filter->format;
			}
			//		 *               "delimiter"  : "delimiter for range: N/A|~"        -- delimiter serves for range of values and operators
			if( !isset($filter->delimiter) || (!$filter->delimiter) )
			{
				$delimiter = "";
			}
			else
			{
				$delimiter = $filter->delimiter;
				if ( $delimiter == "N/A" )
				{
					$delimiter = "";
				}
			}
			//		 *               "operator"   : "operator for filter: =|>=~<=|like"     -- range of operators will require delimiter
			if( !isset($filter->operator) || (!$filter->operator) )
			{
				$operator = "=";
			}
			else
			{
				$operator = $filter->operator;
			}
			//		 *               "logic"      : "N/A|AND|OR"              -- logic operator serves for multiple fields
			if( !isset($filter->logic) || (!$filter->logic) )
			{
				$logic = "";
				if ( strstr($field, ",") === FALSE )
				{
					$logic = "AND";
				}
			}
			else
			{
				$logic = $filter->logic;
				if ( $logic == "N/A" )
				{
					$logic = "";
					if ( strstr($field, ",") === FALSE )
					{
						$logic = "AND";
					}
				}
			}

			if ( strstr($field, ",") === FALSE )
			{
				// single field
				$line_condition = "";
				switch ( $type )
				{
					case "BINARY": // Bit operation
						$line_condition = " ( bitand(" . $field . ", " . $value . ") = " . $value . " ) ";
						break;
					case "STRING": // string
						$line_condition = $this->createStringFilterStatement( $field, $value, $operator, $delimiter );
						break;
					case "DATETIME": // date time
						$line_condition = $this->createDatetimeFilterStatement( $field, $value, $operator, $delimiter, $format );
						break;
					case "NUMBER": // float, long, int, double, long long
						$line_condition = $this->createNumberFilterStatement( $field, $value, $operator, $delimiter );
						break;
					default: // default is always a string 
						$line_condition = $this->createStringFilterStatement( $field, $value, $operator, $delimiter );
						break;
				}
			}
			else
			{
				// multiple fields
				$sub_fields = explode( ",", $field );
				$num_fields = count( $sub_fields );
				$line_condition = " (";
				for ( $i=0; $i<$num_fields; $i++)
				{
					$temp_line = "";
					switch ( $type )
					{
						case "BINARY": // Bit operation
							$temp_line = " ( bitand(" . $sub_fields[$i] . ", " . $value . ") = " . $value . " ) ";
							break;
						case "STRING": // string
							$temp_line = $this->createStringFilterStatement( $sub_fields[$i], $value, $operator, $delimiter );
							break;
						case "DATETIME": // date time
							$temp_line = $this->createDatetimeFilterStatement( $sub_fields[$i], $value, $operator, $delimiter, $format );
							break;
						case "NUMBER": // float, long, int, double, long long
							$temp_line = $this->createNumberFilterStatement( $sub_fields[$i], $value, $operator, $delimiter );
							break;
						default: // default is always a string 
							$temp_line = $this->createStringFilterStatement( $sub_fields[$i], $value, $operator, $delimiter );
							break;
					}
					
					if ( $i > 0 )
					{
						$line_condition .= $logic;
					}
					$line_condition .= $temp_line;
				}
				$line_condition .= ") ";
			}
			
			$strFilters[ $id ] = $line_condition;
		}
		
		$final_filters = "";
		if ( strtoupper($logicalOps) == "AND" || strtoupper($logicalOps) == "OR" )
		{
			foreach((object)$strFilters as $id => $strFilter)
			{
				$final_filters .= " " . $logicalOps . " " . $strFilter;
			}
			$final_filters = substr( $final_filters, strlen($logicalOps)+2 );
		}
		else
		{
			//"( {0} AND {1} AND ( {2} OR {3}) )"
			$final_filters = $logicalOps;
			foreach((object)$strFilters as $id => $strFilter)
			{
				$final_filters = str_replace( "{".$id."}", $strFilter, $final_filters );
			}
		}
		
		//assign the WHERE iterations to the postResult
		$this->filterPostResult = $final_filters;
		
		
		return new dmMesg(array("dev" => "Group Filters processing complete.", "data" => $final_filters));
		
	}
	
	/**
	 * sets up an order by string.
	 * 
	 * # order, ascending, a single field
	 * order : 'myField' 
	 * # or
	 * order : 'myField DESC' 
	 * 
	 * # order a field descending
	 * order : {
	 * 		field : 'myField',
	 * 		order : 'DESC'
	 * }
	 * 
	 * # order a set of fields descending
	 * order : {
	 * 		field : ['myField1' , 'myField2']
	 * 		order : 'DESC'
	 * }
	 * # or
	 * order : {
	 * 		field : 'myField1,myField2,myField3'
	 * 		order : 'DESC'
	 * }
	 * 
	 * @todo allow for an array of orders so devs can specify and array of fields matching an array of orders eg, myfield DESC, thatfield ASC /
	 * 
	 * @return Ambigous <dmMesg, dmError>
	 */
	protected function parseOneOrder($order)
	{
		//do nothing; set the orderResult as an empty string.
		if(!isset($order) || (!$order))
		{
			return "";
		}
		
		//if it's not an object, not an array; assume it's a string.
		if( !is_array($order) && !is_object($order))
		{
			//make sure it's not an empty string.
			if( empty($order) )
			{
				return "";
			}
			else
			{
				return $order;
			}
		}
		
		$tmpStr = "";
		
		//if it's not set - return an empty string
		if( !isset($order->field) )
		{
			return "";
		}
		
		//if it's an empty string - return it
		if( empty($order->field) )
		{
			return "";
		}
		
		//if order is not provided, assume ASC
		if( !isset($order->order) ) 
		{				
			$order->order = "ASC";
		}

		//set the SQL.
		if( is_array($order->field) )
		{
			foreach( $order->field as $field ) 
			{			
				$tmpStr.= $field . " " . $order->order . ", ";
			}
			$tmpStr = substr( $tmpStr, 0, -2 );
		}
		else
		{
			if ( strstr($order->field, ",") === FALSE )
			{
				$tmpStr.= $order->field . " " . $order->order;
			}
			else
			{
				$sub_fields = explode( ",", $order->field );
				$num_fields = count( $sub_fields );
				for ( $i=0; $i<$num_fields; $i++)
				{
					$tmpStr.= $sub_fields[$i] . " " . $order->order . ", ";
				}
				$tmpStr = substr( $tmpStr, 0, -2 );
			}
			
		}

		return $tmpStr;
	}
	
	/**
	 * sets up an order by string.
	 * 
	 * # order, ascending, a single field
	 * orders : 'myField' 
	 * 
	 * # order, descending, a single field
	 * orders : 'myField DESC' 
	 * 
	 * 
	 * # order a field descending
	 * orders : {
	 * 		field : 'myField',
	 * 		order : 'DESC'
	 * }
	 * 
	 * # order a set of fields descending
	 * orders : {
	 * 		field : ['myField1' , 'myField2']
	 * 		order : 'DESC'
	 * }
	 * # or
	 * orders : {
	 * 		field : 'myField1,myField2,myField3'
	 * 		order : 'DESC'
	 * }
	 * 
	 * 
	 * # order a set of fields ascending or descending
	 * orders : {
	 *	0 : {
	 * 		    field : ['myField1' , 'myField2']
	 * 		    order : 'DESC'
	 *      },
	 *  1 : {
	 * 		    field : 'myField3,myField4,myField5'
	 * 		    order : 'ASC'
	 *      },
	 *  2 : {
	 * 		    field : 'myField6'
	 * 		    order : 'DESC'
	 *      },
	 *  3 : {
	 * 		    field : 'myField7'
	 * 		    order : 'ASC'
	 *      },
	 *  4 : {
	 * 		    'myField8'
	 *      },
	 *  5 : {
	 * 		    'myField9 DESC'
	 *      },
	 *     ......
	 * }
	 * 
	 * @todo allow for an array of orders so devs can specify and array of fields matching an array of orders eg, myfield DESC, thatfield ASC /
	 * 
	 * @return Ambigous <dmMesg, dmError>
	 */
	protected function parseOrders(){
		
		//do nothing; set the orderResult as an empty string.
		if(!isset($this->orders) || (!$this->orders))	
		{
			return new dmMesg();
		}
		
		//if it's not an object, not an array; assume it's a string.
		if( !is_array($this->orders) && !is_object($this->orders) )
		{
			//make sure it's not an empty string.
			if( empty($this->orders) ) 
			{
				return new dmMesg();
			}
			
			//create an object from this { field : <thisString> , order : ASC }
			$tmpObj = (object)array("0" => $this->orders);
			$this->orders = $tmpObj;
		}
		else
		{
			// if this is a single object
			if (  isset($this->orders->field) )
			{
				$tmpObj = (object)array("0" => $this->orders);
				$this->orders = $tmpObj;
			}
		}
		
		new dmMesg(array("dev" => ".......................".print_r($this->orders,TRUE) ));
		// now it is an object/array with multiple orders
		$tmpStr = "";
		foreach( $this->orders as $theOrder ) 
		{
			$currStr = $this->parseOneOrder( $theOrder );
			$tmpStr .= $currStr;
			if ( $currStr != "")
			{
				$tmpStr.= ", ";
			}
		}
		if ( $tmpStr != "" )
		{
			$tmpStr = " ORDER BY " . substr($tmpStr, 0, -2);
		}

		$this->orderPostResult = $tmpStr;

		return new dmMesg(array("dev" => "ORDER PROCESSING complete.", "data" => $tmpStr));
	}
	
	/**
	 * Parses the filter args to an SQL string, and returns it; does not paramatise the class at all.
	 * 
	 * @return dmError|dmMesg
	 */
	protected function parseFilter(){
		
		/*
		 * filter : {
		 * 
		 * 		<searchString> : {
		 * 
		 * 			"fields" : ["field1", "field2" .... ],
		 * 			"equality : "like"
		 * 
		 * 		},
		 * 		<searchString2> : {
		 * 
		 * 			"fields" : ["field1" , "field3", ... ],
		 * 			"equality" : "exact"			
		 * 
		 * 		}
		 * 
		 * }
		 * 
		 * @todo, deal with fields so that you can different logical ops (OR/AND) for the field list.
		 * 
		 */
		$tmpStr = " 1=1 ";			//set the sql filterString empty.
		
		//do nothing.
		if(!isset($this->filter) || (!$this->filter))							return new dmMesg();
		if(!is_array($this->filter) && !is_object($this->filter))				return new dmError(array("dev" => "Found the filter set but neither an array nor a object, it is:\n" . print_r($this->filter, TRUE)));
		
		foreach((object)$this->filter as $filter => $fArray){
		
			if(!isset($fArray->fields))				return new dmError(array("dev" => "When using filters, the fields must be specified."));
			if(!isset($fArray->equality))			$fArray->equality = "like";
		
			if($fArray->equality == "like"){
				
				if(!isset($fArray->fields))		return new dmError(array("dev" => "Retrieval for [" . get_class($this) . "] failed, no fields were specified in the filter, please check the paramaters"));
				
				if(is_string($fArray->fields))	$fArray->fields = array($fArray->fields);
				
				foreach($fArray->fields as $field){
		
					$tmpStr.= " and (upper(" . $field . ") LIKE upper('%" . $filter . "%')) ";
						
				}
		
			}
			elseif($fArray->equality == "exact"){
				
				if(!isset($fArray->fields))		return new dmError(array("dev" => "Retrieval for [" . get_class($this) . "] failed, no fields were specified in the filter, please check the paramaters"));

				if(is_string($fArray->fields))	$fArray->fields = array($fArray->fields);
				foreach($fArray->fields as $field){

					$tmpStr.= " and (upper(" . $field . ") = upper('" . $filter . "')) ";

						
				}
		
			}
			else

				return new dmError(array("dev" => "Equality type [" . $fArray->equality . "] unknown"));
		
		
		}
		

		//assign the WHERE iterations to the postResult
		$this->filterPostResult = $tmpStr;
		
		
		return new dmMesg(array("dev" => "Filter processing complete.", "data" => $tmpStr));
		
	}
	
	/**
	 * sets up an order by string.
	 * 
	 * order, ascending, a single field
	 * order : 'myField' 
	 * 
	 * 
	 * # order a field descending
	 * order : {
	 * 		field : 'myField',
	 * 		order : 'DESC'
	 * }
	 * 
	 * # order a set of fields descending
	 * order : {
	 * 		field : ['myField1' , 'myField2']
	 * 		order : 'DESC'
	 * }
	 * 
	 * @todo allow for an array of orders so devs can specify and array of fields matching an array of orders eg, myfield DESC, thatfield ASC /
	 * 
	 * @return Ambigous <dmMesg, dmError>
	 */
	protected function parseOrder(){
		
		//do nothing; set the orderResult as an empty string.
		if(!isset($this->order) || (!$this->order))								return new dmMesg();
		
		
		//if it's not an object, not an array; assume it's a string.
		if(!is_array($this->order) && !is_object($this->order)){
		
			//make sure it's not an empty string.
			if(empty($this->order))												return new dmError(array("dev" => "Order was provided an empty string"));
			
			//create an object from this { field : <thisString> , order : ASC }
			$tmpObj = (object)array("field" => $this->order, "order" => "ASC");
			$this->order = $tmpObj;
			
		}
		
		$tmpStr = "";
		
		//if it's not set - fling
		//if(!isset($this->order->field))	return new dmError(array("dev" => "When using ordering returns, the ordering field must be specified:\n" . print_r($this, TRUE)));
		if(!isset($this->order->field))	return new dmMesg();
		
		//if it's an empty string - fling
		//if(empty($this->order->field))	return new dmError(array("dev" => "Ordering field was found to an empty string, please provide what field you wish to order by."));
		if(empty($this->order->field))	return new dmMesg();
		
		//if order is not provided, assume ASC
		if(!isset($this->order->order))				$this->order->order = "ASC";


		//set the SQL.
		if(is_array($this->order->order)){
		
			$tmpStr.= " ORDER BY ";
			foreach($this->order->field as $field)			$tmpStr.= $field . ", ";
			$tmpStr = substr($tmpStr, 0, -2);
			
		}
		else{
			
			$tmpStr.= " ORDER BY " . $this->order->field;
		}
		$tmpStr.= " " . $this->order->order;
		$this->orderPostResult = $tmpStr;

		return new dmMesg(array("dev" => "ORDER PROCESSING complete.", "data" => $tmpStr));
		
			
	}
	
	/**
	 * 
	 * @return Ambigous <dmMesg, dmError>
	 */
	protected function parseRange(){

		/*
		 * range : {
		 *  
		 *   	field : "<fieldname>",			//manditory
		 *      range : {
		 *      	start : startVal,			//optional, if not provided it will be treated as "the beginning of time" or zero or alpha-A
		 *      	end : endVal				//optional, if not provided it will be treated as "the end of time" or infinity or alpha-Z
		 *      }
		 * 
		 * }
		 * 
		 * 
		 * ranges : [{
		 * 
		 *     field : "<fieldname>",
		 *     range :{
 		 *      start :startVal,
		 *      end : endVal
		 *     },{
		 *     
		 *     field : "<fieldname>",
		 *     range :{
 		 *      start :startVal,
		 *      end : endVal
		 *     }]
		 *     
		 */
		
		
		//do nothing; set the orderResult as an empty string.
		if(!isset($this->range) || (!$this->range))						return new dmMesg();
		
		//if its not an array nor an object; schwing off an error.
		if(!is_array($this->range) && !is_object($this->range))			return new dmError(array("dev" => "range should be argued as an object or an array, and is not"));
		
		//if it's an array, typecast it to an object - although this should never happen in theory.
		if(is_array($this->range))	$this->range = (object)$this->range;
		
		//ensure we have a field and it's sane
		if(!isset($this->range->field))									return new dmError(array("dev" => "range has no field"));
		if(empty($this->range->field))									return new dmError(array("dev" => "range has an empty field"));
		
		//ensure we have range values and their sane.
		if(!is_object($this->range->range))								return new dmError(array("dev" => "range is not a parametised object"));
		
		//iterate the range -- work out what we're doing here, a date range, a numeric range, an alpha range.
		$rangeType = false;
		$tmpStr = "";
		foreach($this->range->range as $rKey => $rVal){
			
			switch($rVal){

				//doing an integer range.
				case is_numeric($rVal):
					
					$rangeType = "NUMERIC";
					break;
					
				case is_string($rVal):
					
					//doing a date range - if the stringlength is exactly 10 and the first 4 chars are a numeric value
					//then this must be a date; documented so this can be refined if need be.
					if( (strlen($rVal) == 10) && (is_numeric(substr($rVal, 0, 4))) ){

						$rangeType = "DATE";
						break;
					
					}
					elseif( (strlen($rVal) == 19) && (is_numeric(substr($rVal, 0, 4))) ){

						$rangeType = "DATE";
						break;
					
					}
					else{			//assume its alpha
						
						$rangeType = "ALPHA";
						break;
					
					}
					break;
				
				default :
					return new dmError(array("dev" => "range type could not be evaluated from [" . $rVal . "]"));
				
			}
			
			if($rangeType == "ALPHA"){
				
				if($rKey == "start")	$tmpStr.= $this->range->field . " > '" . $rVal . "' AND ";
				if($rKey == "end")		$tmpStr.= $this->range->field . " < '" . $rVal . "' AND ";
				
			}
			elseif($rangeType == "DATE"){
				
				if($rKey == "start")	$tmpStr.= $this->range->field . " > to_date('" . $rVal . "', 'YYYY-MM-DD HH24:MI:SS' ) AND ";
				if($rKey == "end")		$tmpStr.= $this->range->field . " < to_date('" . $rVal . "', 'YYYY-MM-DD HH24:MI:SS' ) AND ";
			}
			else{
				
				if($rKey == "start")	$tmpStr.= $this->range->field . " > " . $rVal . " AND ";
				if($rKey == "end")		$tmpStr.= $this->range->field . " < " . $rVal . " AND ";
				
			}
			
		}
		
		//trim the last AND
		$tmpStr = substr($tmpStr,0, -5);			//set the sql filterString empty.
		$this->rangePostResult = $tmpStr;
		
		return new dmMesg(array("dev" => "Range processing complete. " . $this->rangePostResult, "data" => $tmpStr));
		
	}
	
	/**
	 * 
	 */
	protected function processSQL(){
		
		
		if(!($chk = $this->ctl->query(array("sql" => $this->sql))) instanceOf dmMesg)	return $chk;
		$this->collection = (object)$chk->data;
		
		if(!($chk = $this->ctl->query(array("sql" => $this->countSQL))) instanceOf dmMesg)	return $chk;
		$this->totalCount = $chk->data[0]['COUNT(*)'];
		
		return new dmMesg();
		
	}
	
	/**
	 * 
	 * @param string $params
	 * @return Ambigous <dmMesg, dmError>
	 * 
	 */
	protected function generateFilterStack( $params = false ){
		
		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;

		//if no filter exists on the object, return safely with a message.
		if(!isset($params->filter))					return new dmMesg(array("dev" => "filterstack generated with no filters."));
		
		//if we're argued an array; typecast to an object.
		if(is_array($params->filter))				$params->filter = (object)$params->filter;
		if(!is_object($params->filter))				return new dmError(array("dev" => "filter is invalid; filter is not an object or array [" . $params->filter . "]"));
		if(empty($params->filter))					return new dmMesg(array("dev" => "filterstack was an empty object or empty array"));
		
		$filterCnt = count($params->filter);
		$i = 0;
		
		$sql = " WHERE ";
		foreach($param->filter as $a => $v){
			
			$sql .= $v[0] . "= '" . $v[1] . "'";
			if( ($i + 1) != $filterCnt ) $sql .= " " . $v[2];
			$i++;
				
		}
		$sql.= $this->postSQL;
		$this->postSQL = $sql;
		
		new dmMesg(array("dev" => "SQL FILTERED : " . $this->postSQL));
		
	}
	
	/**
	 * 
	 * @param string $params
	 * @return dmMesg|dmError
	 */
	protected function generateRangeStack( $params = false ){
		
		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//if no range exists on the object, return safely with a message.
		if(!isset($params->range))					return new dmMesg(array("dev" => "rangestack generated with infinite range, nothing specified."));
		
		//if we're argued an array; typecast to an object.
		if(is_array($params->range))				$params->range = (object)$params->range;
		if(!is_object($params->range))				return new dmError(array("dev" => "range is invalid; range is not an object or array [" . $params->range . "]"));
		if(empty($params->range))					return new dmMesg(array("dev" => "rangestack was an empty object or empty array"));
		
		if(!strstr('WHERE', $this->postSQL))		$sql = " WHERE ";
		else										$sql = "";
		
		$sql .= " " . $params->range->key . " > " . $params->range->start . " AND " . $params->range->key . " < " . $params->range->end;
		$sql.= $this->postSQL;
		$this->postSQL = $sql;
		
	}

	/**
	 * Add a model to the end of this collection.
	 * 
	 * model dmModel : 
	 * 
	 * @param string $params
	 */
	public function addModel( $params = false ){
		
		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		if(!isset($params->model))							return new dmError(array("dev" => "Requires a model be argued to param->model"));
		if(!$params->model instanceof $this->model)			return new dmError(array("dev" => "Requires a mode of class [" . $this->model . "] be argued."));
		
		$this->collection[] = $params->model;
		
		return new dmMesg();
		
	}
	
	public function export(){
		
	//	new dmMesg(array("dev" => "COLLEC-EXPORT::" . print_r(debug_backtrace(), TRUE)));
		
		
	}

	public function getNumberOfRecords($params = false)
	{
		$num = 0;

		if($params)
		{
			if(isset($params->field) && isset($params->value))
			{
				$sql = "SELECT COUNT(*) as REC_NUM FROM " . $this->SQLTable . " where " . $params->field . "='". $params->value. "' ";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg) 
				{
					$num = 0;
				}
				else
				{
					$num = $chk->data[0]["REC_NUM"];
				}
			}
		}

		return new dmMesg(array("data" => $num));
	}

	public function getNumberOfIndexedRecords($params = false)
	{
		$num = 0;
		$index = -1;

		if($params)
		{
			if(isset($params->field) && isset($params->value))
			{
				$sql = "SELECT COUNT(*) as REC_NUM FROM " . $this->SQLTable . " where " . $params->field . "='". $params->value. "' ";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg) 
				{
					$num = 0;
				}
				else
				{
					$num = $chk->data[0]["REC_NUM"];
				}
			}
			if(isset($params->index) )
			{
				$index = $params->index;
			}
		}
		
		return new dmMesg(array("data" =>(object)array("num"=>$num, "id"=>$index)));
	}
	
}
	
?>