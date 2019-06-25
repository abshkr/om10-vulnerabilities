<?php
//require_once(__DIR__ . "/../dmCollection.php");
require_once(__DIR__ . "/dmPagedCollection.php");
require_once(__DIR__ . "/../models/dmList.php");

class dmLists extends dmPagedCollection{

	/**
	 * @param string $params
	 */
	public function __construct( $params = false )
	{
		$this->SQLTable = "";							//the table/view this collection maps to.
		$this->model = "dmList";							//the model that this collection should consist of.
		$this->dmClass = "dmLists";							//the class name for Middleware/Front end integration.

		$this->listOptions = "";							//the table/view this collection maps to.
	
		if( ($params) && (is_object($params)) )
		{
			if(isset($params->listOptions))
			{
				$this->listOptions = $params->listOptions;
				new dmMesg(array("dev" => '\n\nHERE IT IS in dmLists.construct:' . $this->listOptions));
			}
			else
			{
				$this->listOptions = "";
				new dmError(array("dev" => '\n\nHERE IT IS in dmLists.construct without variable listOptions defined'));
			}
		}

		//required data;
		$this->terminals  = array();
		$this->suppliers  = array();
		$this->drawers    = array();
		$this->carriers   = array();
		$this->customers   = array();
		$this->employers   = array();
		$this->issuers   = array();
		$this->vehicles   = array();
		$this->trailers   = array();
		$this->operators  = array();
		$this->products   = array();
		$this->prodUnits  = array();
		$this->plants     = array();
		$this->tanks      = array();
		$this->bayarms   = array();
		$this->ratios     = array();

		//ok, let's get more lists for movement items too
		$this->tripStatus   = array();
		$this->orderStatus   = array();

		$this->movItemTypes    = array("Receipt","Disposal","Transfer");
		$this->movSources      = array("Auto From HOST","Manual From Local","Manual From HOST", "Local Special Movement");
		$this->movStatus       = array("NEW","PARTIALLY SCHEDULED","FULLY SCHEDULED","FULLY MOVED","OUTSTANDING","FULLY DELIVERED","EXPIRED","PARTIALLY MOVED","PARTIALLY DELIVERED");
		
		parent::__construct($params);		
		
		//$this->gather();
		$this->getData($params);

	}

	public function getInstance($params = false)
	{
		new dmError(array("dev" => "getInstance in dmLists "));

		return new dmMesg(array("data" => new dmLists($params)));
	}
	
	/**
	 * (non-PHPdoc)
	 * @see dmCollection::getData()
	 */
	public function getData( $params = false )
	{
				new dmMesg(array("dev" => '\n\nHERE IT IS in dmLists.getData:' . $this->listOptions));
		$options = explode( "|", $this->listOptions );
		foreach( $options as $opt ) 
		{
			if ( $opt == "ALL" || $opt == "TERMINALS" )
			{
				// SQL to get all Terminal data
				$sql = "SELECT * FROM TERMINAL WHERE TERM_CODE in (select SITE_CODE from SITE)";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->terminals = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "SUPPLIERS" )
			{
				// SQL to get all supplier data
				$sql = "SELECT * FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,2)<>0 ORDER BY CMPY_NAME ASC";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->suppliers = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "DRAWERS" )
			{
				// SQL to get all drawer data
				$sql = "SELECT * FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,16)<>0 ORDER BY CMPY_NAME ASC";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->drawers = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "CARRIERS" )
			{
				// SQL to get all carrier data
				$sql = "SELECT * FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,4)<>0 ORDER BY CMPY_NAME ASC";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->carriers = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "CUSTOMERS" )
			{
				// SQL to get all customer data
				$sql = "SELECT * FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,8)<>0 ORDER BY CMPY_NAME ASC";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->customers = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "EMPLOYERS" )
			{
				// SQL to get all employer data
				$sql = "SELECT * FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,64)<>0 ORDER BY CMPY_NAME ASC";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->employers = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "ISSUERS" )
			{
				// SQL to get all issuer data
				$sql = "SELECT * FROM GUI_COMPANYS WHERE BITAND(CMPY_TYPE,32)<>0 ORDER BY CMPY_NAME ASC";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->issuers = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "VEHICLES" )
			{
				// SQL to get all vehicle data
				$sql = "SELECT * FROM GUI_TANKERS";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->vehicles = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "TRAILERS" )
			{
				// SQL to get all trailer data
				$sql = "SELECT * FROM GUI_EQUIPMENT_LIST";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->trailers = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "OPERATORS" )
			{
				// SQL to get all personnel data
				//$sql = "SELECT * FROM GUI_PERSONNEL";
				$sql = "SELECT * FROM PERSONNEL";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->operators = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "PRODUCTS" )
			{
				// SQL to get all drawer products data
				$sql = "SELECT * FROM PRODUCTS WHERE PROD_CMPY!='BaSePrOd'";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->products = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "PRODUNITS" )
			{
				// SQL to get all product units data
				$sql = "SELECT * FROM UNIT_SCALE_VW WHERE UNIT_ID in (5, 11, 17)";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->prodUnits = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "PLANTS" )
			{
				// SQL to get all Plant data
				$sql = "SELECT DISTINCT CMPY_PLANT as TERM_CODE, CMPY_NAME as TERM_NAME, CMPY_CODE, CMPY_TYPE FROM COMPANYS WHERE CMPY_PLANT IS NOT NULL ORDER BY CMPY_NAME";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->plants = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "TANKS" )
			{
				// SQL to get all tanks data
				$sql = "SELECT * FROM TANKS";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->tanks = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "BAYARMS" )
			{
				// SQL to get all bay arms data
				$sql = "SELECT * FROM BA_ARMS";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->bayarms = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "RATIOS" )
			{
				// SQL to get all ratios data
				$sql = "SELECT * FROM RATIOS ORDER BY RAT_PROD_PRODCMPY, RAT_PROD_PRODCODE, RATIO_BASE";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->ratios = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "TRIPSTATUS" )
			{
				// SQL to get all schedule status data
				$sql = "SELECT * FROM SCHEDULE_STATUS_SHORT_LOOKUP";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->tripStatus = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "ORDERSTATUS" )
			{
				// SQL to get all order status data
				$sql = "SELECT * FROM ORDER_STATUS_TYP";
				if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
				$this->orderStatus = $chk->data;
			}
			if ( $opt == "ALL" || $opt == "MOVITEMTYPES" )
			{
				//$this->movItemTypes    = array("Receipt","Disposal","Transfer");
				$this->movItemTypes = array();
				$this->movItemTypes[0] = (object)array("MOVITEM_TYPE_ID"=>0, "MOVITEM_TYPE_NAME"=>"Receipt");
				$this->movItemTypes[1] = (object)array("MOVITEM_TYPE_ID"=>1, "MOVITEM_TYPE_NAME"=>"Disposal");
				$this->movItemTypes[2] = (object)array("MOVITEM_TYPE_ID"=>2, "MOVITEM_TYPE_NAME"=>"Transfer");
			}
			if ( $opt == "ALL" || $opt == "MOVSOURCES" )
			{
				//$this->movSources      = array("Auto From HOST","Manual From Local","Manual From HOST", "Local Special Movement");
				$this->movSources = array();
				$this->movSources[0] = (object)array("MOVSOURCE_TYPE_ID"=>0, "MOVSOURCE_TYPE_NAME"=>"Auto From HOST");
				$this->movSources[1] = (object)array("MOVSOURCE_TYPE_ID"=>1, "MOVSOURCE_TYPE_NAME"=>"Manual From Local");
				$this->movSources[2] = (object)array("MOVSOURCE_TYPE_ID"=>2, "MOVSOURCE_TYPE_NAME"=>"Manual From HOST");
				$this->movSources[3] = (object)array("MOVSOURCE_TYPE_ID"=>3, "MOVSOURCE_TYPE_NAME"=>"Local Special Movement");
		}
			if ( $opt == "ALL" || $opt == "MOVSTATUS" )
			{
				$this->movStatus       = array("NEW","PARTIALLY SCHEDULED","FULLY SCHEDULED","FULLY MOVED","OUTSTANDING","FULLY DELIVERED","EXPIRED","PARTIALLY MOVED","PARTIALLY DELIVERED");
				$this->movStatus = array();
				$this->movStatus[0] = (object)array("MOVSTATUS_TYPE_ID"=>0, "MOVSTATUS_TYPE_NAME"=>"NEW");
				$this->movStatus[1] = (object)array("MOVSTATUS_TYPE_ID"=>1, "MOVSTATUS_TYPE_NAME"=>"PARTIALLY SCHEDULED");
				$this->movStatus[2] = (object)array("MOVSTATUS_TYPE_ID"=>2, "MOVSTATUS_TYPE_NAME"=>"FULLY SCHEDULED");
				$this->movStatus[3] = (object)array("MOVSTATUS_TYPE_ID"=>3, "MOVSTATUS_TYPE_NAME"=>"FULLY MOVED");
				$this->movStatus[4] = (object)array("MOVSTATUS_TYPE_ID"=>4, "MOVSTATUS_TYPE_NAME"=>"OUTSTANDING");
				$this->movStatus[5] = (object)array("MOVSTATUS_TYPE_ID"=>5, "MOVSTATUS_TYPE_NAME"=>"FULLY DELIVERED");
				$this->movStatus[6] = (object)array("MOVSTATUS_TYPE_ID"=>6, "MOVSTATUS_TYPE_NAME"=>"EXPIRED");
				$this->movStatus[7] = (object)array("MOVSTATUS_TYPE_ID"=>7, "MOVSTATUS_TYPE_NAME"=>"PARTIALLY MOVED");
				$this->movStatus[8] = (object)array("MOVSTATUS_TYPE_ID"=>8, "MOVSTATUS_TYPE_NAME"=>"PARTIALLY DELIVERED");
			}
		}
		

		//return new dmMesg();	
		return new dmMesg(array("dev" => "Query Compilation for dmLists complete."));
	}
	
}
?>