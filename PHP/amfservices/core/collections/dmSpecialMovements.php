<?php
require_once(__DIR__ . "/../dmCollection.php");
require_once(__DIR__ . "/../models/dmSpecialMovement.php");

class dmSpecialMovements extends dmCollection{

	/**
	 * @param string $params
	 */
	public function __construct( $params = false ){
 
 		// this is a relationship table, no particular table is being used.
		$this->model    = "dmSpecialMovement";
		$this->dmClass  = "dmSpecialMovements";

		//required data;
		$this->terminalData = array();
		$this->folios		= array();
		$this->armData		= array();
		$this->tankerData	= array();

		$this->types    	= array("Receipt", "Disposal", "Transfer");
		$this->status   	= array();
		array_push($this->status, array("ID"=>0, "Name"=>"Entering"));
		array_push($this->status, array("ID"=>5, "Name"=>"Completed"));
		array_push($this->status, array("ID"=>9, "Name"=>"Reversed"));

		$this->plantCodes	= array();
		$this->suppliers	= array();
		$this->suppliersIndexed	= array();
		$this->nextID	    = 0;

		$this->pageSize	    = 50;
		$this->currentPage  = 1;
		$this->count        = 0;

		$file      = "/usr/omega/bin/gsap_erpIn/UnitOfMeasure.csv";
		$f         = fopen($file,'rb'); 
		$unitsFile = fread($f,filesize($file)); 
		$units     = explode("\r\n", $unitsFile);

        $this->volumeUnitsAmb = array();

		foreach($units as $unit){

			if($unit!=""){
				$unitline = explode(",", $unit);
				$id         = $unitline[0];
				$symbol     = $unitline[1];
				$multiplier = $unitline[3];
				//if($multiplier!=1)
				array_push($this->volumeUnitsAmb, array("ID"=>$id,  "Name"=>$symbol, "Symbol"=>$symbol));	
			}

			
			$unit = "new";
		}

		parent::__construct($params);
		//$this->getData($params);
		
	}
	public function reverseSpecialMovement($params = false){
		require_once(__DIR__ ."/../../../phpservices/classes/ReverseTransaction.class.php");
		$Manual_tran = new ReverseTransactionClass();
		
		if(!($chk = $this->bind(array("plug" => "dmpSession"))) instanceOf dmMesg){ $this->sane = false; $this->sanityError = $chk; }
		
		$sess   = $this->PLUG->dmpSession;
		$ucode  = $_SESSION['PERCODE'];
		$result = $Manual_tran->do_specmov_reverse($params);

		$protocol = "http";
		if ( $_SERVER["HTTPS"] == "on" )
		{
			$protocol = "https";
		}
		if($result->result_code == 0){
			//file_get_contents($protocol."://".$_SERVER["HTTP_HOST"]."/cgi-bin/en/spcl_mvment.cgi?user_id=".$ucode."&spclmnt_no=".$params);	
			file_get_contents($protocol."://".$_SERVER["SERVER_ADDR"]."/cgi-bin/en/spcl_mvment.cgi?user_id=".$ucode."&spclmnt_no=".$params);	
		}
		return new dmMesg(array("data" => $result));
	}

	public function processSpecialMovement($params = false){
		require_once(__DIR__ ."/../../../phpservices/classes/ManualTransactions.class.php");
		$Manual_tran = new ManualTransactions();    	

		if(!($chk = $this->bind(array("plug" => "dmpSession"))) instanceOf dmMesg){ $this->sane = false; $this->sanityError = $chk; }
		
		$sess = $this->PLUG->dmpSession;
		$ucode = $_SESSION['PERCODE'];
		$result = $Manual_tran->do_special($params);
		
		$protocol = "http";
		if ( $_SERVER["HTTPS"] == "on" )
		{
			$protocol = "https";
		}
		if($result->result_code == 0){
			//file_get_contents($protocol."://".$_SERVER["HTTP_HOST"]."/cgi-bin/en/spcl_mvment.cgi?user_id=".$ucode."&spclmnt_no=".$params);
			file_get_contents($protocol."://".$_SERVER["SERVER_ADDR"]."/cgi-bin/en/spcl_mvment.cgi?user_id=".$ucode."&spclmnt_no=".$params);
		}
    	return new dmMesg(array("data" => $result));
	}

	public function processManualMovement($params = false){
		require_once(__DIR__ ."/../../../phpservices/classes/ManualTransactions.class.php");  	
		$Manual_tran = new ManualTransactions();  
    	return new dmMesg(array("data" => $Manual_tran->do_nomination($params->orderNumber, $params->paraTrans, $params->numTrans, $params->trans, $params->from, $params->to , $params->alt)));
    	//return new dmMesg(array("data" => $Manual_tran->do_create("06301", $params->paraTrans, 0, null, 1)));
	}

	public function getInstance($params = false){
		//return new dmMesg(array("data" => new dmSpecialMovements($params)));
		
		$smObj = new dmSpecialMovements($params);
		$smObj->getData($params);
		
		$json_flag=1;
        $objData = (json_encode($smObj));
		if ( $objData === FALSE )
		{
			$zip_on=0;
			$json_flag=0;
        	$objData = $smObj;
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
        //return new dmMesg(array("data" => $smObj));
	}


	public function getBases($drawCode, $ammount = 1){
        $arr = explode( "___", $drawCode );
        $len = count( $arr );
		
        if ( $len <= 0 )
        {
			$prodcode = "";
			$prodcmpy = "";
        }
        else
        if ( $len == 1 )
        {
			$prodcode = $arr[0];
			$prodcmpy = "";
        }
        else
        {
			$prodcode = $arr[0];
			$prodcmpy = $arr[1];
		}
	
		$sql = "SELECT DISTINCT RATIOS.RATIO_VALUE, BASE_PRODS.BASE_CODE, BASE_PRODS.BASE_NAME, BASECLASS.BCLASS_DESC, BASECLASS.BCLASS_NO 		
					, BASECLASS.BCLASS_DENS_LO
					, BASECLASS.BCLASS_DENS_HI
					, BASECLASS.BCLASS_VCF_ALG					
		FROM RATIOS, BASE_PRODS, BASECLASS 
		WHERE  RATIOS.RATIO_BASE   = BASE_PRODS.BASE_CODE 
		   AND BASECLASS.BCLASS_NO = BASE_PRODS.BASE_CAT 
		   AND RAT_PROD_PRODCMPY   = '$prodcmpy' 
		   AND RAT_PROD_PRODCODE   = '$prodcode'";
 		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;

		$TOTAL_RATIO 	= 0;
		$result 		= array();

		foreach($chk->data as $base){
			$TOTAL_RATIO 		   += $base["RATIO_VALUE"];
			$base["BASE_NAME"] 	    = $base["BASE_NAME"];
			$base["RATIO"] 			= $base["RATIO_VALUE"]*$ammount;
			$base["DRAW_AMMOUNT"] 	= $ammount;
			$result[]				= $base;			
		}
		foreach ($result as $key => $value) {
			$result[$key]["RATIO"] /= $TOTAL_RATIO;
		}
		return new dmMesg(array("data" => $result));
	}


	/**
	 * (non-PHPdoc)
	 * @see dmCollection::getData()
	 */
	public function getData( $params = false ){
		
		$sql = "SELECT MOVITEM_TYPE_ID, decode(MOVITEM_TYPE_ID, 0, 'R', 1, 'D', 2, 'T', 'R') as MOVITEM_TYPE_CODE, MOVITEM_TYPE_NAME FROM MOVITEM_TYPES order by MOVITEM_TYPE_ID";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$this->types = $chk->data;

 		$sql="SELECT CMPY_CODE,CMPY_NAME,CMPY_PLANT,CMPY_MOVEMENTS_REV FROM COMPANYS WHERE BITAND(cmpy_type,2)<>0 ORDER BY CMPY_NAME ASC";
        if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		// grab data
		$this->suppliers = array();
		$suppliers = array();
		foreach($chk->data as $supplier){
			//if(!$supplier["CMPY_PLANT"])$supplier["CMPY_PLANT"] = $supplier["CMPY_NAME"];
			////$supplier["PLANT_GUI"] = $supplier["CMPY_PLANT"]. " - " .$supplier["CMPY_NAME"];
			//$supplier["PLANT_GUI"] = $supplier["CMPY_PLANT"] . " - " . $supplier["CMPY_CODE"];
			if(!$supplier["CMPY_PLANT"])$supplier["CMPY_PLANT"] = $supplier["CMPY_CODE"];
			$supplier["PLANT_GUI"] = $supplier["CMPY_PLANT"] . " - " . $supplier["CMPY_CODE"]. " - " .$supplier["CMPY_NAME"];
			

			$suppliers[$supplier["CMPY_CODE"]] = $supplier;
			array_push($this->suppliers,$supplier);
		}
		$this->suppliersIndexed = $suppliers;


		$sql = "SELECT DISTINCT TNKR_CODE, CMPY_NAME FROM TANKERS, COMPANYS WHERE TNKR_CARRIER = CMPY_CODE ORDER BY CMPY_NAME, TNKR_CODE";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		// grab data
		$this->tankerData = array();
		$result = $chk->data;
		$carrier = "";$i =-1;
		foreach($result as $tanker){
			if($carrier != $tanker["CMPY_NAME"]){
				$carrier = $tanker["CMPY_NAME"];
				$i++;
				$this->tankerData[$i]["carrier"] = $carrier;
				$this->tankerData[$i]["tankers"] = array();
			}
			array_push($this->tankerData[$i]["tankers"], $tanker["TNKR_CODE"]);
		}



		$sql = "SELECT DISTINCT CMPY_PLANT FROM COMPANYS WHERE CMPY_PLANT IS NOT NULL";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		// grab data
		$this->plantCodes = $chk->data;

		// grab frozen folios dates

		$sql    = "SELECT * FROM CLOSEOUTS WHERE STATUS != 2";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		// grab data
		$result = $chk->data;

		$this->folios = array();

		foreach($result as $folios){
			array_push($this->folios, array("folioID"  => $folios["CLOSEOUT_NR"], 
											"fromDate" => $folios["PREV_CLOSEOUT_DATE"],
											"toDate"   => $folios["CLOSEOUT_DATE"],
											"status"   => $folios["STATUS"],
											"nameUI"   => $folios["CLOSEOUT_NAME"]));
		}

		
		// tank data
		$sql = "SELECT dp.prod_cmpy, dp.prod_code, dp.prod_name, 
		               bp.base_code, bp.base_name, 
		               pr.ratio_value, pr.rat_prod_prodcode,
		               tk.tank_code, tk.tank_density, tk.tank_temp , tk.tank_name, 
		               tl.term_code,  tl.term_name
					, bs.BCLASS_DESC
					, bs.BCLASS_NO
					, bs.BCLASS_DENS_LO
					, bs.BCLASS_DENS_HI
					, bs.BCLASS_VCF_ALG					
				FROM products dp, rptobj_prod_ratios_vw pr, base_prods bp, tanks tk, terminal tl, baseclass bs 
				WHERE dp.prod_cmpy  = pr.rat_prod_prodcmpy 
  				  AND dp.prod_code  = pr.rat_prod_prodcode 
  				  AND pr.ratio_base = bp.base_code 
  				  AND bp.base_code  = tk.tank_base 
  				  AND tl.term_code  = tk.tank_terminal
    			  AND pr.rat_count  = 1 
  				  AND dp.prod_cmpy  != 'BaSePrOd' 
				  AND bp.BASE_CAT = bs.BCLASS_NO
				ORDER BY tl.term_code, dp.prod_cmpy, tk.tank_code";

		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		// grab data
		$result = $chk->data;
		// prepare data
		$terminalCounter    = -1;
		$lastTerminalCode   = null;
		$supplierCounter 	= -1;
		$lastSupplierCode	= null;
		$tankCounter 		= -1;
		$lastTankCode		= null;
		// empty the current data
		$this->terminalData = array();
		// the loop
		foreach($result as $terminal){
			$terminalCode = $terminal["TERM_CODE"];
			$supplierCode = $terminal["PROD_CMPY"];
			$tankCode 	  = $terminal["TANK_CODE"];
			$plantCode    = $suppliers[$supplierCode]["CMPY_PLANT"];
			$companyName  = $suppliers[$supplierCode]["CMPY_NAME"];
			$canReverse   = $suppliers[$supplierCode]["CMPY_MOVEMENTS_REV"];
			$terminal["PLANT_CODE"] = $plantCode;
			
			if($lastTerminalCode != $terminalCode){
				$lastTerminalCode = $terminalCode;
				$terminalCounter  = $terminalCounter+1;
				$supplierCounter  = -1;
				$tankCounter      = -1;
				$this->terminalData[$terminalCounter] = array("terminalCode" => $terminal["TERM_CODE"], 
					  										  "terminalName" => $terminal["TERM_NAME"], 
					  										  "terminalUI"   => $terminal["TERM_CODE"] . ' - ' . $terminal["TERM_NAME"]);
			}

			if($lastSupplierCode != $supplierCode){
				$lastSupplierCode = $supplierCode;
				$supplierCounter  = $supplierCounter+1;
				$tankCounter      = -1;
				$this->terminalData[$terminalCounter]["suppliers"][$supplierCounter] = array("supplierCode"  => $supplierCode,
																					         "supplierName"  => $companyName,
																					         "supplierPlant" => $plantCode,
																					         "canReverse"    => $canReverse,
																					         "supplierUI" 	 => $plantCode . " - " . $supplierCode . " - " . $companyName);
			}
			if($lastTankCode != $tankCode){
				$lastTankCode = $tankCode;
				$tankCounter  = $tankCounter+1;
				$this->terminalData[$terminalCounter]["suppliers"][$supplierCounter]["tanks"][$tankCounter] = array("tankCode" 		=> $terminal["TANK_CODE"],
																					                               "tankName" 		=> $terminal["TANK_NAME"],
																					                               "tankTemp" 		=> $terminal["TANK_TEMP"],
																					                               "tankDens" 		=> $terminal["TANK_DENSITY"],
																					                               "baseCode" 		=> $terminal["BASE_CODE"],
																					                               "BCLASS_DESC" 	=> $terminal["BCLASS_DESC"],
																					                               "BCLASS_NO" 		=> $terminal["BCLASS_NO"],
																					                               "BCLASS_DENS_LO" => $terminal["BCLASS_DENS_LO"],
																					                               "BCLASS_DENS_HI" => $terminal["BCLASS_DENS_HI"],
																					                               "BCLASS_VCF_ALG" => $terminal["BCLASS_VCF_ALG"],
																					                               "tankUI"   		=> $terminal["TANK_CODE"] . 
																					                               " - " . $terminal["TANK_NAME"],
																			                                       "tankData" 		=> array());
			}
			
			$terminal["prodUI"] = $terminal["PROD_CODE"] . " - " .  $terminal["PROD_NAME"];
			array_push($this->terminalData[$terminalCounter]["suppliers"][$supplierCounter]["tanks"][$tankCounter]["tankData"], $terminal);
		}






		$this->armData = array();
		$sql = "SELECT distinct R.RAT_PROD_PRODCMPY, R.RAT_PROD_PRODCODE, B.STREAM_BAYCODE, B.STREAM_ARMCODE, B.STREAM_BASECODE, B.STREAM_TANKCODE, B.STREAM_TANKDEN, B.STREAM_MTRCODE
				FROM RATIOS R, GUI_PIPENODE B
				WHERE B.STREAM_BASECODE = R.RATIO_BASE(+)
				ORDER BY R.RAT_PROD_PRODCMPY, B.STREAM_ARMCODE";

		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		// grab data
		$result = $chk->data;
		// prepare data
		$companyCounter     = -1;
		$lastCompanyCode   = null;
		$armCounter 	    = -1;
		$lastArmCode		= null;
		
		foreach($result as $arm){
			$companyCode  = $arm["RAT_PROD_PRODCMPY"];
			$armCode 	  = $arm["STREAM_ARMCODE"];
			$bayCode 	  = $arm["STREAM_BAYCODE"];

			if($lastCompanyCode != $companyCode){
				$lastCompanyCode = $companyCode;
				$companyCounter  = $companyCounter+1;
				$armCounter  	 = -1;
				$this->armData[$companyCounter] = array("companyCode" => $companyCode);
			}

			if($lastArmCode != $armCode){
				$lastArmCode = $armCode;
				$armCounter  = $armCounter+1;
				$tankCounter      = -1;
  		    	$this->armData[$companyCounter]["arms"][$armCounter] = array("armCode"  => $armCode, 
  		    																 "bayCode"  => $bayCode, 
  		    																 "armData" => array());
 			}
			array_push($this->armData[$companyCounter]["arms"][$armCounter]["armData"], $arm);
		}


		$sql = "SELECT MAX(MLITM_ID) as NUM FROM MOV_LOAD_ITEMS";
		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		$this->nextID = $chk->data[0]["NUM"]+1;


        /*

		$sql = "SELECT MLITM_ID, MLITM_TERMINAL, MLITM_MOV_NUM, MLITM_TYPE, MLITM_PRODCODE, MLITM_TANKCODE, MLITM_QTY_AMB, MLITM_MOV_TYPE, MLITM_MOV_KEY,
		 MLITM_UNIT_AMB, MLITM_TEMP_AMB, MLITM_TMPUNIT_AMB, MLITM_DENS_COR, MLITM_DNSUNIT_COR, MLITM_DTIM_START, MLITM_REASON_CODE,  MLITM_TANKDEPO, MLITM_PRODCMPY_TO, MLITM_PRODCMPY, 
		 MLITM_TANKDEPO_TO, MLITM_PRODCODE_TO, MLITM_TANKCODE_TO, MLITM_QTY_COR, MLITM_QTY_KG, MLITM_UNIT_COR, MLITM_TEMP_COR, MLITM_TMPUNIT_COR,  
		 MLITM_QTY_RPT, MLITM_UNIT_RPT, MLITM_STATUS, MLITM_DTIM_POSTED, MLITM_OPER_POSTED, MLITM_COMMENT FROM MOV_LOAD_ITEMS WHERE MLITM_REASON_CODE IS NOT NULL ";


		 $range = $params->range;
		 if($range!=null){
		 	if($range->startRange){
		 	  $sql .= " AND MLITM_DTIM_START > TO_DATE('".$range->startRange."', 'YYYY-MM-DD HH24:MI:SS') ";
			}
		    if($range->endRange){
		 	  $sql .= " AND MLITM_DTIM_START < TO_DATE('".$range->endRange."', 'YYYY-MM-DD HH24:MI:SS') ";
		    }
		 }

		 //if($)
		 
		
		 $sql = "SELECT * FROM (SELECT a.*, b.TOTAL_COUNT, ROWNUM rn FROM ($sql) a, (SELECT COUNT(*) TOTAL_COUNT FROM ($sql)) b) WHERE rn BETWEEN 1 AND 30";

		if(!($chk = $this->ctl->query(array("sql" => $sql))) instanceOf dmMesg)	return $chk;
		// grab data

		
		$this->collection = $chk->data;
		
		// type casting
		$tArray = array();
		foreach($this->collection as $specialMovement){	
			$tArray[] = new dmSpecialMovement((object)array("payload" => (object)$specialMovement));

		}*/


		$this->getPaged($params);
		
		return new dmMesg();	
	}

	public function getPaged($params = false){
		


         $start = microtime(true);
		 $sql = "SELECT MLITM_ID, MLITM_TERMINAL, MLITM_MOV_NUM, MLITM_TYPE, MLITM_PRODCODE, MLITM_TANKCODE, MLITM_QTY_AMB, MLITM_MOV_TYPE, MLITM_MOV_KEY,
		 MLITM_UNIT_AMB, MLITM_TEMP_AMB, MLITM_TMPUNIT_AMB, MLITM_DENS_COR, MLITM_DNSUNIT_COR, MLITM_DTIM_START, MLITM_REASON_CODE,  MLITM_TANKDEPO, MLITM_PRODCMPY_TO, MLITM_PRODCMPY, 
		 MLITM_TANKDEPO_TO, MLITM_PRODCODE_TO, MLITM_TANKCODE_TO, MLITM_QTY_COR, MLITM_QTY_KG, MLITM_UNIT_COR, MLITM_TEMP_COR, MLITM_TMPUNIT_COR,  
		 MLITM_QTY_RPT, MLITM_UNIT_RPT, MLITM_STATUS, MLITM_DTIM_POSTED, MLITM_OPER_POSTED, MLITM_COMMENT FROM MOV_LOAD_ITEMS WHERE MLITM_REASON_CODE IS NOT NULL";


		 if(isset($params->range)){
			 $range = $params->range;
		 	if($range->startRange){
		 	  $sql .= " AND MLITM_DTIM_START > TO_DATE('".$range->startRange."', 'YYYY-MM-DD HH24:MI:SS') ";
			}
		    if($range->endRange){
		 	  $sql .= " AND MLITM_DTIM_START < TO_DATE('".$range->endRange."', 'YYYY-MM-DD HH24:MI:SS') ";
		    }
		    if(isset($range->pageSize)){
		    	$this->pageSize = $range->pageSize;
		    }
		    if(isset($range->currentPage)){
		    	$this->currentPage = $range->currentPage;
		    }
		 }


		 $low  = ($this->currentPage-1)*$this->pageSize+1;
		 $high = $this->currentPage*$this->pageSize; 

		 $sql .= "ORDER BY MLITM_ID DESC";


		 $sqlPaged = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($sql) a) WHERE rn BETWEEN $low AND $high";


		 $test->sqlPaged = $sqlPaged;
		 $sqlCount = "SELECT COUNT(*) TOTAL_COUNT FROM ($sql)";
		
		if(!($chk = $this->ctl->query(array("sql" => $sqlCount))) instanceOf dmMesg)	return $chk;
		$this->count = $chk->data[0]["TOTAL_COUNT"];
		
		if(!($chk = $this->ctl->query(array("sql" => $sqlPaged))) instanceOf dmMesg)	return $chk;
		$this->collection = $chk->data;
		

		




		$tArray = array();
		foreach($this->collection as $specialMovement){	
			$prod    = $this->suppliersIndexed[$specialMovement["MLITM_PRODCMPY"]]["CMPY_MOVEMENTS_REV"];
			$prod_to = $this->suppliersIndexed[$specialMovement["MLITM_PRODCMPY_TO"]]["CMPY_MOVEMENTS_REV"];
			$specialMovement["CAN_REVERSE"] = (($prod == "Y") || ($prod_to == "Y"))?"Y":"N";
			$tArray[] = new dmSpecialMovement((object)array("payload" => (object)$specialMovement));

		}
		$this->collection = $tArray;
		$test->count = $this->count;
		$test->collection = $tArray;
		$test->dmClass = $this->dmClass;
		$test->time_taken = microtime(true) - $start;
		
		return new dmMesg(array("data" => $test));
	}
}
?>
