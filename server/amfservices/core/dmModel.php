<?php
/**
 *
 * @copyright Diamond Key (2012)
 * @author Bren Norris
 *
 */
require_once('dmCore.php');
require_once('dmController.php');

class dmModel extends dmCore{

	public $payload;						//a seperated anonymous array for data 
	protected $SQLTable;					//the SQLTable name for this instance , normall overriden by the subclass.
	protected $payloadWhiteList;			//a payload whitelist for arbitary fields in the payload, such as when you only want 1 field.
	protected $payloadBlackList;			//a payload blacklist for arbitary fields in the payload, such as rownum.
	protected $journalBlacklist;			//a blacklist of items not to monitored by the journal.


	public function __construct( $params = FALSE ){

		//pass paramaters.
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		$this->ctl = dmController::getController();
		
		$this->setWhiteList();
		$this->setBlackList();
		$this->setJournalBlackList();

		if($params){
			
			//did we get data?
			if(isset($params->payload)){
				$this->payload = $params->payload;
			}
			
		}

		//manage white/black lists
		if( !empty($this->payloadBlackList) || !empty($this->payloadWhiteList) ){

			if(!empty($this->payloadWhiteList)){
				
				//iterate the payload, unsetting any item not found in the whitelist
				foreach($this->payload as $k => $v){
				
					if(!isset($this->payloadWhiteList[$k]))	unset($this->payload->$k);
				
				}

			
			}

			//kill off the blacklist.
			if(!empty($this->payload)){

				foreach($this->payload as $k => $v){

					//iterate the blacklist, unsetting each blacklist item.
					foreach($this->payloadBlackList as $bl)
						if($k == $bl)	unset($this->payload->$k);
				}
				
			}

		}
		
	

	}
	
	protected function setWhiteList(){

		//if no whitelist is set, instance an empty array as the whitelist
		if(!is_array($this->payloadWhiteList))	$this->payloadWhiteList = array();



	}

	protected function setBlackList(){
		
		//if no blacklist is set, instance an empty array as the blacklist.
		if(!is_array($this->payloadBlackList))	$this->payloadBlackList = array();
		
		//add RNUM to the blacklist (common table retrievals)
		$this->payloadBlackList[] = "RNUM";

		//if we have a primary key set we were removing instantly blacklisting them... why we're not sure at this point.
		/*if( (isset($this->primaryKey)) && ($this->primaryKey) )
			
			//if this is an array of primary keys 
			if(is_array($this->primaryKey)){

				$this->primaryKeyValue = (object)array();

				//add each 'PK' to the black list; this is a presentation thing.
				foreach($this->primaryKey as $v){				//add each 'PK' to the blacklist.
				
					$this->payloadBlackList[] = $v;				// "
					$this->primaryKeyValue->$v = $this->payload->$v;
					
				}

			}
			else{ //this is a string, add it to the blacklist; move the value out to another value (outside the payload).
			
				$this->payloadBlackList[] = $this->primaryKey;
				$uniqueField = $this->primaryKey;
				$this->primaryKeyValue = $this->payload->$uniqueField;

			}*/
		
	}

	protected function setJournalBlackList( $params = false ){

		if(!isset($this->journalBlackList) || (!is_array($this->journalBlackList)))	$this->journalBlackList = array();

	}
	
	
	/**
	 * Create a record of this model in the database
	 * (non-PHPdoc)
	 * @see dmModel::create()
	 */
	public function create( $params = false ){
	
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg) 
		{
			$chk->opType = "create";
			return $chk;
		}
		$params = $chk->data;
		
		//ensure we have the SQLTable set.
		if(!isset($this->SQLTable)) 
		{
			return new dmError(array("dev" => "No corresponding tablename set for class [" . get_class() . "]", "opType"=>"create"));
		}									
		
		//ensure there are parameters
		//	if( (!isset($params->data)) || (empty($params->data)) )		return new dmError(array("dev" => "No parameters available to create a record with :\n\n" . print_r($this, TRUE)));	
	
		//iterate through the values creating a stack for each
		$fieldStack = array();
		$valueStack = array();
		
		foreach($this->payload as $field => $value)
		{
			
			$fieldStack[] = $field;
			$valueStack[] = $value;
		
		}
		
		//generate the SQL -- this could ship off to a new method and not be encapsulated here.
		$sql = "INSERT INTO " . $this->SQLTable . " (";
		
		foreach($fieldStack as $field)	$sql.= $field . ", ";
		$sql = substr($sql, 0, -2);					//trim off the comma and space
		$sql.= ") VALUES (";
		
		foreach($valueStack as $value)	$sql.= "'" . $value . "', ";
		$sql = substr($sql, 0, -2);					//trim off the comma and space
		$sql.= ")";
		
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	
		{
			$chk->opType = "create";
			return $chk;
		}
		
		//journal this creation
        if ($this->dmClass != "dmJournalEntry") {
            if(!($chk = $this->bind(array("plug" => "dmpJournal"))) instanceOf dmMesg) 
			{
				$chk->opType = "create";
				return $chk;
			}
            $jnl = $chk->data;

            if(!($chk = $jnl->record((object)array(
                "model" => $this,
                "op" => "create"
            ))) instanceOf dmMesg) 
			{
				$chk->opType = "create";
				return $chk;
			}
        }

		return new dmMesg(array("dev" => "The Data Created Successfully!", "opType"=>"create"));
		
	}
	
	/**
	 * Update a model upon the database.
	 * MC->BN : please check SQL builder if there is a better way than putting a ban list, also I added commas to make SQL works.
	 * @param string $params
	 */
	public function update( $params = false ){
		
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)
		{
			$chk->opType = "update";
			return $chk;
		}
		$params = $chk->data;
		
		//ensure we have the SQLTable set.
		if(!isset($this->SQLTable))	
		{
			return new dmError(array("dev" => "No corresponding tablename set for class [" . get_class() . "]", "opType"=>"update"));
		}
		
		//assume the UID field is "ID"; this needs to be discussed (is this the norm?).
		if(!isset($this->primaryKey)) 
		{
			$this->primaryKey = "ID";
		}	

		//ensure we have a UniqueID, when setting the blacklist we remove the PK from retrievals, keeping the value in dmModel::primaryKeyValue;
		$uniqueField = $this->primaryKey;
		$uniqueValue = $this->primaryKeyValue;

		//start SQL rendition
		$sql = "UPDATE " . $this->SQLTable . " SET ";
		
		//set the intial comma Toggle to true.
		$initialComma = true;
		
		foreach((array)$this->payload as $k => $v )
		{
			
			//deal with the blacklist array
			$blackListPass = true;
			foreach($this->payloadBlackList as $bl)
			{
				if($k == $bl)	$blackListPass = false;
			}
			if(!$blackListPass)	continue;

			// deal with SETTING PKs --- mc
			$blackListPass = true;
			if(is_array($uniqueField))
			{
				foreach($uniqueField as $bl)
				{
					if($k == $bl)	$blackListPass = false;
				}			
			}
			else
			{
				if($k == $uniqueField)$blackListPass = false;
			}
			if(!$blackListPass)	continue;

			
			// Comma insert
			if($initialComma)	$initialComma = false;
			else				$sql.= ", ";
			
			//SQL Builder
			if(is_numeric($v) && $v{0} != '0')	$sql.= $k . " = " . $v ;
			else				$sql.= $k . " = '" . $v . "'";
			
		}

		$sql.= " WHERE ";
		//accept multiple unique fields (FKs)
		if(is_array($uniqueField))
		{
			
			foreach($uniqueField as $key)
			{
			
			//	if(is_numeric($this->payload->$key) && $this->payload->$key{0} != '0')			
			//		$sql.= $key . " = " . $this->payload->$key . " AND ";
			//	else											
					$sql.= $key . " = '" . $this->payload->$key . "' AND ";
			}
			$sql = substr($sql, 0, -5);
		
		}
		else
		{

			//if(is_numeric($this->payload->$uniqueField) && $this->payload->$uniqueField{0} != '0')	
			//	$sql .=  $uniqueField . " = " . $this->payload->$uniqueField;
			//else
				$sql .=  $uniqueField . " = '" . $this->payload->$uniqueField . "'";
		}

		/**
		 * 
		 *Journaling this operation requires the original model prior to updating and the result, as to produce a "before and after"
		 * report for the journal.
		 * 
		 * We're going to retrieve this model prior to this operation as to determine what will change between the two.
		 * 
		 */
		if(!($chk = $this->retrieveStored()) instanceOf dmMesg)	
		{
			$chk->opType = "update";
			return $chk;
		}
		$oldModel = $chk->data;

		//plug the journal
		if(!($chk = $this->bind(array("plug" => "dmpJournal"))) instanceOf dmMesg)
		{
			$chk->opType = "update";
			return $chk;
		}
		$jnl = $chk->data;
		
		//new dmError(array("dev" => "Executed with query in dmModel.update " . $sql));

		//execute the query.
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)
		{
			$chk->opType = "update";
			return $chk;
		}

		
		//journal this update
		if(!($chk = $this->bind(array("plug" => "dmpJournal"))) instanceOf dmMesg)
		{
			$chk->opType = "update";
			return $chk;
		}
		$jnl = $chk->data;

		//send to the journal.
		
		if(!($chk = $jnl->record((object)array(

			"model" => $this,
			"oldModel" => $oldModel,
			"op" => "update"

		))) instanceOf dmMesg)
		{
			$chk->opType = "update";
			return $chk;
		}

		return new dmMesg(array("dev" => "The Data Modified Successfully!", "opType"=>"update"));
		
	}
	
	protected function retrieveStored( $params = false ){
		
		if(!isset($this->dmClass))			return new dmError(array("dev" => "This model has no class specified."));
		$class = $this->dmClass;

		//assume the UID field is "ID"; this needs to be discussed (is this the norm?).
		if(!isset($this->primaryKey))	$this->primaryKey = "ID";

		//ensure we have a UniqueID.
		$uniqueField = $this->primaryKey;

		if(!isset($this->SQLTable))			return new dmError(array("dev" => "No table is set for this model , set dmModel::SQLTable (case sensitive)"));

		//reqieve this model
		$sql = "SELECT * FROM " . $this->SQLTable . " WHERE ";

		//accept multiple unique fields (FKs)
		if(is_array($uniqueField)){
			
			foreach($uniqueField as $key){
			
				//if(is_numeric($this->payload->$key) && $this->payload->$key{0} != '0')			
			//		$sql.= $key . " = " . $this->payload->$key . " AND ";
				//else											
					$sql.= $key . " = '" . $this->payload->$key . "' AND ";
			}
			$sql = substr($sql, 0, -5);
		
		}
		else{

			//if(is_numeric($this->payload->$uniqueField) && $this->payload->$uniqueField{0} != '0')	
			//	$sql .= $uniqueField . " = " . $this->payload->$uniqueField;
			//else                             				
				$sql .= $uniqueField . " = '" . $this->payload->$uniqueField . "'";
		}

		//execute the query.
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)		return $chk;
		if(count($chk->data) != 1)			return new dmError(array("dev" => "Retrieved more than 1 model, where we should have one and only one.; got" . print_r($chk->data, TRUE) . ">>>".$sql));
		$data = $chk->data[0];

		//if the class doesn't exist 
		if(!class_exists($class)){
			
			//attempt to include it, if it still doesn't exist die.
			if(file_exists(__DIR__ . "/models/" . $class . ".php")){
				
				require_once(__DIR__ . "/models/" . $class . ".php");
				if(!class_exists($class))	return new dmError(array("dev" => "The model [" . $class . "] was found as a class file at [" . __DIR__ . "/models/" . $class . ".php but the class does not exist"));
		
			}
			else
				return new dmError(array("dev" => "The model [" . $class . "] does not exist as a class nor as a file at [" . __DIR__ . "/models/" . $class . ".php],  please rectify this"));
		
		}

		//instance this
		$model = new $class((object)array("payload" => $data));

		if($model instanceOf $class)
				return new dmMesg(array("data" => $model));

		return new dmError(array("dev" => "Fell to an exception."));

	}

	/**
	 * Delete this model from the database.
	 * 
	 * @param string $params
	 * @return Ambigous <dmMesg, dmError>|dmError|Ambigous <dmMesg, dmError, unknown, Ambigous>|dmMesg
	 */
	public function delete( $params = false ){

		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)
		{
			$chk->opType = "delete";
			return $chk;
		}
		$params = $chk->data;
		
		//ensure we have the SQLTable set.
		if(!isset($this->SQLTable)) 
		{
			return new dmError(array("dev" => "No corresponding tablename set for class [" . get_class() . "]", "opType"=>"delete"));
		}									
		
		//assume the UID field is "ID"; this needs to be discussed (is this the norm?).
		if(!isset($this->primaryKey))	$this->primaryKey = "ID";
			
		//ensure we have a UniqueID.
		$uniqueField = $this->primaryKey;
		//accept multiple unique fields (FKs)

		$sql = "DELETE FROM " . $this->SQLTable . " WHERE ";

		if(is_array($uniqueField))
		{
			
			foreach($uniqueField as $key)
				//if(is_numeric($this->payload->$key) && $this->payload->$key{0} != '0')			
				//	$sql.= $key . " = " . $this->payload->$key . " AND ";
				//else											
					$sql.= $key . " = '" . $this->payload->$key . "' AND ";
			$sql = substr($sql, 0, -5);
		
		}
		else
		{
			//if(is_numeric($this->payload->$uniqueField) && $this->payload->$uniqueField{0} != '0')	
			//	$sql .=  $uniqueField . " = " . $this->payload->$uniqueField;
			//else                             				
				$sql .=  $uniqueField . " = '" . $this->payload->$uniqueField . "'";
		}
			

		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	
		{
			$chk->opType = "delete";
			return $chk;
		}
        
        if(!($chk = $this->bind(array("plug" => "dmpJournal"))) instanceOf dmMesg)
		{
			$chk->opType = "delete";
			return $chk;
		}
		$jnl = $chk->data;
        if(!($chk = $jnl->record((object)array(
			"model" => $this,
			"op" => "delete"
		))) instanceOf dmMesg)
		{
			$chk->opType = "delete";
			return $chk;
		}
		
		return new dmMesg(array("dev" => "The Data Removed Successfully!", "opType"=>"delete"));
		
	}
	
	// ??????  looks like this function is not used yet
	public function getData( $params = false ){
		
		if(!isset($this->SQLTable))			return new dmError(array("dev" => "No corresponding tablename set for class [" . get_class() . "]"));
		
		$sql = "SELECT * FROM " . $this->SQLTable; // REGION_CODE='ENG'";
		
	}
	
	public function exposeModel( $params = false ){
		
		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
		
		//ensure we have the SQLTable set.
		if(!isset($this->SQLTable))									return new dmError(array("dev" => "No corresponding tablename set for class [" . get_class() . "]"));
		
		$sql = "SELECT column_name \"Name\", nullable \"Null?\", concat(concat(concat(data_type,'('),data_length),')') \"Type\" FROM user_tab_columns WHERE table_name='" . $this->SQLTable . "'";
		
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg) return $chk;
		
		return new dmMesg(array("data" => $chk->data));
		
	}
	
	/**
	 * This moves all attributes outside the payload attribute from attributeName to _attributeName and pulls the payload to the first level.
	 * @param string $params
	 */
	public function export( $params = false ){
		
		new dmMesg(array("dev" => "MODEL-EXPORT::" . print_r(debug_backtrace(), TRUE)));
		
	}
	
	public function getCreator($params = false ){}
	public function getCreatedTime($params = false ){}
	public function getLastModifiedTime($params = false ){}
	public function getLastModifiedUser($params = false ){}
	
}
