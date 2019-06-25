<?php
//require_once(__DIR__ . "/../dmCollection.php");
require_once(__DIR__ . "/dmPagedCollection.php");
require_once(__DIR__ . "/../models/dmMovementSchedule.php");

class dmMovementSchedules extends dmPagedCollection{

	/**
	 * @param string $params
	 */
	public function __construct( $params = false ){
 
		$this->SQLTable = "GUI_NOM_SCHEDULES";							//the table/view this collection maps to.
		$this->model = "dmMovementSchedule";							//the model that this collection should consist of.
		$this->dmClass = "dmMovementSchedules";							//the class name for Middleware/Front end integration.

		//required data;
		$this->terminals  = array();
		$this->suppliers  = array();
		$this->carriers   = array();
		$this->vehicles   = array();
		$this->operators  = array();

		$this->movItemTypes    = array("Receipt","Disposal","Transfer");
		$this->movSources      = array("Auto From HOST","Manual From Local","Manual From HOST");
		$this->movStatus       = array("NEW","PARTIALLY SCHEDULED","FULLY SCHEDULED","FULLY MOVED","OUTSTANDING","FULLY DELIVERED","EXPIRED","PARTIALLY MOVED","PARTIALLY DELIVERED");

		//ok, let's get more lists for movement items too
		$this->prodUnits  = array();
//		$this->plants     = array();
		$this->drawers    = array();
		$this->products   = array();
		$this->bayarms    = array();
		$this->tripStatus = array();
		$this->trailers   = array();
//		$this->tanks      = array();

		// this is for cross references of base products and drawer products
//		$this->ratios     = array();

		
		parent::__construct($params);		
		
		$this->gather();
		//$this->getData($params);

	}

	public function getInstance($params = false)
	{
		new dmError(array("dev" => "getInstance in dmMovementSchedules "));
		
		$mtObj = new dmMovementSchedules($params);
		$json_flag=1;
        $objData = (json_encode($mtObj));
		if ( $objData === FALSE )
		{
			$zip_on=0;
			$json_flag=0;
        	$objData = $mtObj;
		}
		else
		{
			$zip_mthd="zlib";
			$zip_on=0;
			$org_len = strlen($objData);
			if ( $zip_on == 1 )
			{
				// Do compressing, return compressed string or FALSE if an error occurred. 
				$compress_data = gzcompress($objData, 9);
				//$compress_data = zlib_encode($objData, 15);
				if ( $compress_data === FALSE )
				{
					// no change of data, return JSON string
					$zip_on=0;
				}
				else
				{
					// The compressed data must be binary format, need to encode before transfering online
					$zip_len = strlen($compress_data);
					// Do encoding, return the encoded data as a string or FALSE on failure
					$encode_data = base64_encode( $compress_data );
					if ( $encode_data === FALSE )
					{
						// no change of data, return JSON string
						$zip_on=0;
					}
					else
					{
						// Compress and encode successfully, return new data
						$objData = $encode_data;
						$enc_len = strlen($encode_data);
					}
				}
			}
		}
		
        return new dmMesg(array("data" => $objData, "json_on"=>$json_flag, "zip_on"=>$zip_on, "zip_mthd"=>$zip_mthd, "org_len"=>$org_len, "zip_len"=>$zip_len, "enc_len"=>$enc_len ));
		
        //return new dmMesg(array("data" => $objData, "json_on"=>$json_flag ));

		//return new dmMesg(array("data" => new dmMovementSchedules($params)));
	}
	
	/**
	 * (non-PHPdoc)
	 * @see dmCollection::getData()
	 */
	public function getData( $params = false )
	{
		if ( $this->needFetchLists == false )
		{
			parent::getData($params);		

			//return new dmMesg();	
			return new dmMesg(array("dev" => "Query Compilation for dmMovements complete without retrieving dropdown lists when needFetchLists=".$this->needFetchLists ));
		}
		
		$asynServiceCall = false;
		if ( $asynServiceCall == false )
		{
			// SQL to get all Terminal data
			$sql = "SELECT * FROM TERMINAL WHERE TERM_CODE in (select SITE_CODE from SITE)";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			$this->terminals = $chk->data;

			// SQL to get all supplier data
			$sql = "SELECT * FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,2)<>0 ORDER BY CMPY_NAME ASC";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			$this->suppliers = $chk->data;

			// SQL to get all carrier data
			$sql = "SELECT * FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,4)<>0 ORDER BY CMPY_NAME ASC";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			$this->carriers = $chk->data;

			// SQL to get all vehicle data
			$sql = "SELECT * FROM GUI_TANKERS";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			$this->vehicles = $chk->data;

			// SQL to get all personel data
			//$sql = "SELECT * FROM GUI_PERSONNEL";
			$sql = "SELECT * FROM PERSONNEL";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			$this->operators = $chk->data;

			//ok, let's get more lists for movement items too

			// SQL to get all product units data
			$sql = "SELECT * FROM UNIT_SCALE_VW WHERE UNIT_ID in (5, 11, 17)";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			$this->prodUnits = $chk->data;

			// SQL to get all Plant data
			//$sql = "SELECT DISTINCT CMPY_PLANT_CODE as TERM_CODE, CMPY_NAME as TERM_NAME, CMPY_CODE, CMPY_TYPE FROM COMPANYS WHERE CMPY_PLANT_CODE IS NOT NULL ORDER BY CMPY_NAME";
			//if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			//$this->plants = $chk->data;
			
			// SQL to get all drawer data
			$sql = "SELECT * FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,16)<>0 ORDER BY CMPY_NAME ASC";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			$this->drawers = $chk->data;
			
			// SQL to get all drawer products data
			$sql = "SELECT * FROM PRODUCTS WHERE PROD_CMPY!='BaSePrOd'";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			$this->products = $chk->data;
			
			// SQL to get all bay arms data
			$sql = "SELECT * FROM BA_ARMS";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			$this->bayarms = $chk->data;

			// SQL to get all schedule status data
			$sql = "SELECT * FROM SCHEDULE_STATUS_SHORT_LOOKUP order by STATUS_ID";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			$this->tripStatus = $chk->data;

			// SQL to get all trailer data
			$sql = "SELECT * FROM GUI_EQUIPMENT_LIST";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			$this->trailers = $chk->data;

			//$this->movItemTypes    = array("Receipt","Disposal","Transfer");
			$sql = "SELECT MOVITEM_TYPE_ID, decode(MOVITEM_TYPE_ID, 0, 'R', 1, 'D', 2, 'T', 'R') as MOVITEM_TYPE_CODE, MOVITEM_TYPE_NAME FROM MOVITEM_TYPES order by MOVITEM_TYPE_ID";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			$this->movItemTypes = $chk->data;
		
			//$this->movSources      = array("Auto From HOST","Manual From Local","Manual From HOST", "Local Special Movement");
			$sql = "SELECT MOVSOURCE_TYPE_ID, MOVSOURCE_TYPE_NAME FROM MOVSOURCE_TYPES order by MOVSOURCE_TYPE_ID";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			$this->movSources = $chk->data;
	
			//$this->movStatus       = array("NEW","PARTIALLY SCHEDULED","FULLY SCHEDULED","FULLY MOVED","OUTSTANDING","FULLY DELIVERED","EXPIRED","PARTIALLY MOVED","PARTIALLY DELIVERED");
			$sql = "SELECT MOVSTATUS_TYPE_ID, MOVSTATUS_TYPE_NAME FROM MOVSTATUS_TYPES order by MOVSTATUS_TYPE_ID";
			if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			$this->movStatus = $chk->data;
	
			$types = $this->movItemTypes;
			$this->movItemTypes = array();
			foreach( $types as $value )
			{
				$this->movItemTypes[] = $value['MOVITEM_TYPE_NAME'];
			}
	
			$types = $this->movSources;
			$this->movSources = array();
			foreach( $types as $value )
			{
				$this->movSources[] = $value['MOVSOURCE_TYPE_NAME'];
			}
	
			$types = $this->movStatus;
			$this->movStatus = array();
			foreach( $types as $value )
			{
				$this->movStatus[] = $value['MOVSTATUS_TYPE_NAME'];
			}
		
			// SQL to get all tanks data
			//$sql = "SELECT * FROM TANKS";
			//if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			//$this->tanks = $chk->data;
			
			// SQL to get all ratios data
			//$sql = "SELECT * FROM RATIOS";
			//if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
			//$this->ratios = $chk->data;
		}

		parent::getData($params);		

		//return new dmMesg();	
		return new dmMesg(array("dev" => "Query Compilation for dmMovements complete."));
	}
	
}
?>