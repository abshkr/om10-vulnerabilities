<?php
require_once('dmpBase.php');
require_once(__DIR__ . "/../models/dmJournalEntry.php");
require_once(__DIR__ . "/../dmController.php");				//giving the journal  a data controller

class dmpJournal extends dmpBase{
	
	protected $model;				//the subject model having its data operation journaled.
	protected $oldModel;			//only required for update operations, the model prior to operation (so as to get a "before/after" record.
	private $sess;

	public function __construct( $params = false ){

		//bind the sesison plug
		if(!($chk = $this->bind(array('plug' => 'dmpSession'))) instanceOf dmMesg){ 
			$this->sane = false;
			$this->sanityError = $chk;
		}
		$this->sess = $chk->data->get()->data;
		$this->checkSession();
		
		$this->ctl = dmController::getController();

	}

	
	public function checkSession()
	{
		if( isset($_SESSION['SESSION']) )
		{
			$person_code	= $_SESSION['PERCODE'];
			$person_name	= $_SESSION['PERNAME'];
			$cmpy_code		= $_SESSION['COMPANY'];
			$lang_code		= $_SESSION['LANGUAGE'];
		}
		else
		{
			$person_code	= "NA";
			$person_name	= "NA";
			$cmpy_code		= "NA";
			$lang_code		= "ENG";
		}
		
		if ( !isset( $this->sess->Default ) )
		{
			$this->sess->Default = (object)array();
		}
		
		if ( isset( $this->sess->Default ) )
		{
			if ( !isset( $this->sess->Default->PERNAME ) )
			{
				$this->sess->Default->PERNAME = $person_name;
			}
			if ( !isset( $this->sess->Default->PERCODE ) )
			{
				$this->sess->Default->PERCODE = $person_code;
			}
			if ( !isset( $this->sess->Default->COMPANY ) )
			{
				$this->sess->Default->COMPANY = $cmpy_code;
			}
			if ( !isset( $this->sess->Default->LANGUAGE ) )
			{
				$this->sess->Default->LANGUAGE = $lang_code;
			}
		}
		
		
	}
   /**
    * 
    * 
    */
	public function record( $params = false ){

		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;

		//ensure we have a model and a CRUD operation the model just performed.
		if(!isset($params->model))					return new dmError(array("dev" => "Argue [model], an instance of dmModel"));
		
		//ensure the model is an instance of dmModel
		if(!$params->model instanceOf dmModel)		return new dmError(array("dev" => "[model] was argued however this is not an instance of dmModel, it is[" . print_r($params->nodel, TRUE) . "]"));
		$this->model = $params->model;

		//ensure we have a known operation type
		if(!isset($params->op))						return new dmError(array("dev" => "Argued [op], the operation type this model just performed"));
		$op = $params->op;

		switch(strtolower($op)){

			 case "c":
			 case "create":

			 	//return new dmError(array("dev" => "Journaling of dmModel::create is not implemented at this time"));
                return $this->recordCreate();
			 	break;

			 case "r":
			 case "retrieve":
			 case "g":
			 case "get":
			 	return new dmError(array("dev" => "Journaling of dmModel::retrieve/get is not implemented at this time"));
			 	break;

			 case "u":
			 case "update":
			 	
			 	//ensure we have a model and a CRUD operation the model just performed.
				if(!isset($params->oldModel))					return new dmError(array("dev" => "Argue [oldModel], an instance of dmModel, prior to the update operation."));
			 	$this->oldModel = $params->oldModel;

			 	return $this->recordUpdate();
			 	break;

			 case "d":
			 case "delete":
			 	//return new dmError(array("dev" => "Journaling of dmModel::delete is not implemented at this time"));
                return $this->recordDelete();
			 	break;

			 default:
			 	return new dmError(array("dev" => "Fell to an exception, argued operation [" . $op . "] is unkonwn."));

		}

	}
    
    /* This function can be directly called to write a journal message*/
    public function recordMsg($msg)
    {
        if (!isset($msg))
            return;
            
        $currentUser = $_SESSION['PERNAME'];
		$companyCode = $_SESSION['COMPANY'];
        
        if(!isset($_SESSION['LANGUAGE'])) $regionCode = 'ENG';
		else $regionCode = $_SESSION['LANGUAGE'];
        
        if(!($chk = $this->getNextSEQ()) instanceOf dmMesg)			return $chk;
        $seq = $chk->data;
        
        $je = new dmJournalEntry((object)array(
            "payload" => (object)array(
                "COMPANY_CODE" => $companyCode,
                "REGION_CODE" => $regionCode,
                "MSG_EVENT" => "CONF",
                "MSG_CLASS" => "EVENT",
                "MESSAGE" => $msg,
                "SEQ" => $seq
                )
            ));
        
        if(!($chk = $je->create()) instanceOf dmMesg)	return $chk;
        
        return new dmMesg();
    }

	private function recordCreate( $params = false ){

		//just a quick check for my sanity, this is a priv method so these should be set; but anyway.
		if( (!isset($this->model)) || (!$this->model instanceOf dmModel) )
			return new dmError(array("dev" => "Attempted to perform a journaling of a model/record creation without a valid isntance of " . print_r($this->model, TRUE)));
            
        $msg = "[" . $this->model->dmClass ."] has been created ; ";
        if (is_array($this->model->primaryKey)) {
            foreach ($this->model->primaryKey as $k => $v) {
                foreach ($this->model->payload as $col => $val) {
                    if ($v == $col) {
                        $msg .= "[" . $col . "] = " . $val . " ";
                    } 
                }
            }
        }
        else {
            foreach ($this->model->payload as $col => $val) {
                if ($this->model->primaryKey == $col) {
                    $msg .= "[" . $col . "] = " . $val . " ";
                } 
            }
        }
        
        $time = date('Y-m-d H:i:s', mktime()); //$mysqldate = date( 'Y-m-d H:i:s', $phpdate );
        $currentUser = $_SESSION['PERNAME'];
		$companyCode = $_SESSION['COMPANY'];
        
        if(!isset($_SESSION['LANGUAGE'])) $regionCode = 'ENG';
		else $regionCode = $_SESSION['LANGUAGE'];
        
        if(!($chk = $this->getNextSEQ()) instanceOf dmMesg)			return $chk;
        $seq = $chk->data;
        
        $je = new dmJournalEntry((object)array(
            "payload" => (object)array(
                "COMPANY_CODE" => $companyCode,
                "REGION_CODE" => $regionCode,
                "MSG_EVENT" => "CONF",
                "MSG_CLASS" => "EVENT",
                "MESSAGE" => $msg,
                "SEQ" => $seq
                )
            ));
        
        if(!($chk = $je->create()) instanceOf dmMesg)	return $chk;
        
        return new dmMesg();

	}
    
    private function recordDelete() {
        if( (!isset($this->model)) || (!$this->model instanceOf dmModel) )
			return new dmError(array("dev" => "Attempted to perform a journaling of a model/record creation without a valid isntance of " . print_r($this->model, TRUE)));
        
        $msg = "[" . $this->model->dmClass ."] has been deleted ; ";
        if (is_array($this->model->primaryKey)) {
            foreach ($this->model->primaryKey as $k => $v) {
                foreach ($this->model->payload as $col => $val) {
                    if ($v == $col) {
                        $msg .= "[" . $col . "] = " . $val . " ";
                    } 
                }
            }
        }
        else 
		{
            foreach ($this->model->payload as $col => $val) {
                if ($this->model->primaryKey == $col) {
                    $msg .= "[" . $col . "] = " . $val . " ";
                } 
            }
        }
		
        
        $time = date('Y-m-d H:i:s', mktime()); //$mysqldate = date( 'Y-m-d H:i:s', $phpdate );
        $currentUser = $_SESSION['PERNAME'];
		$companyCode = $_SESSION['COMPANY'];
        
        if(!isset($_SESSION['LANGUAGE'])) $regionCode = 'ENG';
		else $regionCode = $_SESSION['LANGUAGE'];
        
        
        if(!($chk = $this->getNextSEQ()) instanceOf dmMesg)			return $chk;
        $seq = $chk->data;
        
        $je = new dmJournalEntry((object)array(
            "payload" => (object)array(
                "COMPANY_CODE" => $companyCode,
                "REGION_CODE" => $regionCode,
                "MSG_EVENT" => "CONF",
                "MSG_CLASS" => "EVENT",
                "MESSAGE" => $msg,
                "SEQ" => $seq
                )
            ));
        
        if(!($chk = $je->create()) instanceOf dmMesg)	return $chk;
        
        return new dmMesg();
    }

	private function recordUpdate( $params = false ){

		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;

		//just a quick check for my sanity, this is a priv method so these should be set; but anyway.
		if( (!isset($this->model)) || (!isset($this->oldModel)) || (!$this->model instanceOf dmModel) || (!$this->oldModel instanceOf dmModel) )
			return new dmError(array("dev" => "Attempted to perform recordUpdate without a valid instance, models arent instances of dmModel: old: " . print_r($this->model, TRUE) . " new: " . print_r($this->oldModel, TRUE)));	

		$chgArray = (object)array();

		//iterate the model payload
		foreach($this->model->payload as $k => $v){
			
			//if an item appears in the payload of the new model, but not the old; seriously blow it off.
			if(!isset($this->oldModel->payload->$k)) continue; //			return new dmError(array("dev" => "Old and new models [" . $k ."]  was not found and models appear structurally different [OLD]\n". print_r($this->oldModel, TRUE) . "\n[NEW]\n" . print_r($this->model, TRUE)));

			//if they don't forge equality (place it in the change array.
			if($this->model->payload->$k !== $this->oldModel->payload->$k)
				$chkArray->$k = array($this->model->payload->$k, $this->oldModel->payload->$k); //as { key : [ to, from]}

		}

		if(!empty($chkArray)){

			$time = date('Y-m-d H:i:s', mktime()); //$mysqldate = date( 'Y-m-d H:i:s', $phpdate );
        $currentUser = $_SESSION['PERNAME'];
		$companyCode = $_SESSION['COMPANY'];
        
        if(!isset($_SESSION['LANGUAGE'])) $regionCode = 'ENG';
		else $regionCode = $_SESSION['LANGUAGE'];
        


			foreach($chkArray as $k => $v){

				$msg = "[" . $this->model->dmClass ."] has been modifed ; ";
				$whiteKey =	true;

				//ensure this key is not in the model's journal blacklist
				foreach($this->model->journalBlackList as $bl){
					if($bl == $k)	$whiteKey = false;
				}

				if( $whiteKey && ($v[1] != $v[0]) )
				{
					//  only the value changed gets journalled
					$msg.= "[" . $k . "] changed from [" . $v[1] . "] to [" . $v[0] . "]";
					$msg.= " - performed by [" . $currentUser  . "]";

					if(!($chk = $this->getNextSEQ()) instanceOf dmMesg)			return $chk;
					$seq = $chk->data;

					$je = new dmJournalEntry((object)array(
						"payload" => (object)array(
							"COMPANY_CODE" => $companyCode,
							"REGION_CODE" => $regionCode,
							"MSG_EVENT" => "CONF",
							"MSG_CLASS" => "EVENT",
							"MESSAGE" => $msg,
							"SEQ" => $seq
						)
					));

					
					if(!($chk = $je->create()) instanceOf dmMesg)	return $chk;

				}
	
			}
			
		}

		return new dmMesg();

	}

	/**
	 * 
	 * Gets the next sequence for the journal.
	 * 
	 * @param NULL
	 * 
	 * @return dmMesg|dmError dmMesg with the data attribute set to the next seq available in the journal (integer), dmError on failure.
	 * 
	 */
	private function getNextSEQ( $params = false ){

		//pass parameters
		if(!($chk = dmUtils::passParams($params)) instanceOf dmMesg)	return $chk;
		$params = $chk->data;
        
        $sql = "select journal_seq.nextval from dual";
        
        //execute
	    if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg) return $chk;
	  	$nextSeq = $chk->data[0]['NEXTVAL'];
	    
        return new dmMesg(array("data" => $nextSeq));

	}

}
?>