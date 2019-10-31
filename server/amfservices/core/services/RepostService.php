<?php
class RepostService
{
	var $username;
	var $password;
	var $server;
	var $dbname;
	var $dbport;
	var $connect;
    var $mylang='ENG';

	public function __construct()
	{
		//$this->username = $_SERVER['OMEGA_USER'];
		//$this->password = $_SERVER['OMEGA_PWD'];
		//$this->server = 'localhost/'.$_SERVER['OMEGA_DBASE'];	
		
		$this->username = "";
		if( isset($_SERVER['OMEGA_USER']) ) 
		{
			$this->username = $_SERVER['OMEGA_USER'];
		}
		
		$this->password = "";
		if( isset($_SERVER['OMEGA_PWD']) ) 
		{
			$this->password = $_SERVER['OMEGA_PWD'];
		}
        if ( isset($_SERVER['DB_ENCRYPT']) && ( $_SERVER['DB_ENCRYPT'] == 'YES' || $_SERVER['DB_DECRYPT'] == 'yes' ) ) 
        {
            $temp = decrypt_user_pwd($this->password);
            $this->password = $temp;
        }

		$this->dbname = "OML5K";
		if( isset($_SERVER['OMEGA_DBASE']) ) 
		{
			$this->dbname = $_SERVER['OMEGA_DBASE'];
		}

		$this->dbport = "1521";
		if( isset($_SERVER['OMEGA_DBPORT']) ) 
		{
			$this->dbport = $_SERVER['OMEGA_DBPORT'];
		}
		
		$this->server = 'localhost' . ':' . $this->dbport . '/' . $this->dbname;
		
		$this->connect = oci_connect($this->username,$this->password,$this->server);
	}

	public function getTripTransactions($trip,$supplier)
	{
		$query = "SELECT * from gui_transactions where trsa_trip='$trip' and trsa_supplier='$supplier' and trsa_reverse_flag='0'";
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
	}

	public function getTransactions($trip,$supplier,$user)
	{
		$query = "SELECT * from gui_transactions where trsa_trip='$trip' and trsa_supplier='$supplier' and trsa_reverse_flag='1'";
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$txn_id = $row->TRSA_ID;
			$row->order_trip_ind = 0;    
			$row->Load_Number = $trip;
			$row->Supplier = $supplier;   
			$row->Tanker_Code = $row->TRSA_TANKER; 
			$row->Operator_Code = $user;
			$row->Start_Time =  ''; 
			$row->Finish_Time = '';
			$row->isnomi=0;
			
			$transArray = array();
			$query3 ="SELECT * FROM GUI_METER_DETAILS WHERE TRSFTRID_TRSA_ID='$txn_id'";
			$stid3 = oci_parse($this->connect, $query3);
			oci_execute($stid3);
			$meterArray = array();
			while (($row_meter = oci_fetch_object($stid3)))
			{
				$row_meter->Injector_or_meter=$row_meter->IS_INJECTOR;
				$row_meter->Meter_Injector_Code = $row_meter->TRSB_METER;
				$row_meter->open_amb = abs($row_meter->TRSF_OPN_AMB);
				$row_meter->open_cor = abs($row_meter->TRSF_OPN_COR);
				$row_meter->open_kg = abs($row_meter->TRSF_OPEN_KG);
				$row_meter->close_amb = abs($row_meter->TRSF_CLS_AMB);
				$row_meter->close_cor = abs($row_meter->TRSF_CLS_COR);
				$row_meter->close_kg = abs($row_meter->TRSF_CLOSE_KG);
				$row_meter->TRSF_OPN_AMB = abs($row_meter->TRSF_OPN_AMB);
				$row_meter->TRSF_OPN_COR = abs($row_meter->TRSF_OPN_COR);
				$row_meter->TRSF_OPEN_KG = abs($row_meter->TRSF_OPEN_KG);
				$row_meter->TRSF_CLS_AMB = abs($row_meter->TRSF_CLS_AMB);
				$row_meter->TRSF_CLS_COR = abs($row_meter->TRSF_CLS_COR);
				$row_meter->TRSF_CLOSE_KG = abs($row_meter->TRSF_CLOSE_KG);
				$meterArray[] = $row_meter;
			}
			$row->meter=$meterArray;
			$query2 ="SELECT * FROM GUI_TRANSACTION_DETAILS WHERE trsftrid_trsa_id='$txn_id'";
			$stid2 = oci_parse($this->connect, $query2);
			oci_execute($stid2);
			while (($row_trans = oci_fetch_object($stid2)))
			{
				$row_trans->bases = $this->getBases($row_trans->TRSF_ID);
				$row_trans->Number_of_Bases = sizeof($row_trans->bases);
				$tmpArray = array();
				$row_trans->meter = array();
				foreach($meterArray as $item) 
				{
					if ($item->BAA_BAY_SEQ == $row_trans->BAA_BAY_SEQ)
					{
						$tmpArray[]=$item;
					}	
				}
				$row_trans->meter = $tmpArray;
				$row_trans->Arm_code = $row_trans->BAA_BAY_SEQ;
				$row_trans->nr_in_tkr =0;
				$row_trans->drawer_code = '';
				$row_trans->product_Code = TRSFPROD_PRODCODE;
				$row_trans->dens = abs($row_trans->TRSF_DENSITY);
				$row_trans->Temperature = abs($row_trans->TRSF_TEMP);
				$row_trans->amb_vol = abs($row_trans->TRSF_QTY_AMB);
				$row_trans->cor_vol = abs($row_trans->TRSF_QTY_COR);
				$row_trans->lig_kg = abs($row_trans->TRSF_LOAD_KG);
				$row_trans->Equipment_ID = $row_trans->TRSF_TK_TANKCODE;
				$row_trans->Planned_Qty = 0;
				
				$row_trans->num_of_meters = sizeof($tmpArray);
				$transArray[] = $row_trans;
			}
			$row->transfer = $transArray;
			$row->numtrans = sizeof($transArray);
			
			$resArray[] = $row;
		}
		return($resArray);
	}
	
	// public function getTransactions($trip,$supplier)
	// {
		// $query = "SELECT * from gui_transactions where trsa_trip='$trip' and trsa_supplier='$supplier' and trsa_reverse_flag='0'";
		// $stid = oci_parse($this->connect, $query);
		// oci_execute($stid);
		// while (($row = oci_fetch_object($stid)))
		// {
			// $txn_id = $row->TRSA_ID;
			// $transArray = array();
			// $query3 ="SELECT * FROM GUI_METER_DETAILS WHERE TRSFTRID_TRSA_ID='$txn_id'";
			// $stid3 = oci_parse($this->connect, $query3);
			// oci_execute($stid3);
			// $meterArray = array();
			// while (($row_meter = oci_fetch_object($stid3)))
			// {
				// $meterArray[] = $row_meter;
			// }
			// $row->meter=$meterArray;
			// $query2 ="SELECT * FROM GUI_TRANSACTION_DETAILS WHERE trsftrid_trsa_id='$txn_id'";
			// $stid2 = oci_parse($this->connect, $query2);
			// oci_execute($stid2);
			// while (($row_trans = oci_fetch_object($stid2)))
			// {
				// $row_trans->bases = $this->getBases($row_trans->TRSF_ID);
				// $row_trans->numbase = sizeof($row_trans->bases);
				// $tmpArray = array();
				// $row_trans->meter = array();
				// foreach($meterArray as $item) 
				// {
					// if ($item->BAA_BAY_SEQ == $row_trans->BAA_BAY_SEQ)
					// {
						// $tmpArray[]=$item;
					// }	
				// }
				// $row_trans->meter = $tmpArray;
				// $row_trans->num_of_meters = sizeof($tmpArray);
				// $transArray[] = $row_trans;
			// }
			// $row->transfer = $transArray;
			// $row->numtrans = sizeof($transArray);
			
			// $resArray[] = $row;
		// }
		// return($resArray);
	// }

	public function getTransactionDetails($txn_id) 
	{
		$query ="SELECT * FROM GUI_TRANSACTION_DETAILS WHERE trsftrid_trsa_id='$txn_id'";
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
	}
	
	public function getMeterDetails($txn_code) 
	{
		$query ="SELECT * FROM GUI_METER_DETAILS WHERE TRSFTRID_TRSA_ID='$txn_code'";
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
	}
	
	public function getBaseDetails($drawer, $drawerprod, $arm) 
	{
		$query ="select R.RAT_PROD_PRODCMPY, R.RAT_PROD_PRODCODE, B.STREAM_ARMCODE, B.STREAM_MTRCODE, B.STREAM_INJCODE, B.STREAM_BASECODE, B.STREAM_BASENAME, B.STREAM_BCLASS_CODE, 
                 decode(B.STREAM_BCLASS_CODE, 6, 'T', 11,'T','F') METER_TYPE_CODE, decode(B.STREAM_BCLASS_CODE, 6, 'Inject', 11,'Inject','Meter') METER_TYPE_DESC, B.STREAM_BCLASS_NMAE,
                 B.STREAM_TANKCODE, B.STREAM_TANKDEN, STREAM_TANKTEMP as BASE_RPT_TEMP, BP.BASE_RPT_TEMP as BASE_RPT_TEMP2, R.RATIO_VALUE
                 from 
				 RATIOS R,GUI_PIPENODE B,BASE_PRODS BP
                 where
                 B.STREAM_BASECODE = R.RATIO_BASE(+)
                 and B.STREAM_BASECODE = BP.BASE_CODE(+) and RAT_PROD_PRODCMPY = '$drawer' and RAT_PROD_PRODCODE = '$drawerprod' and STREAM_ARMCODE='$arm'
                 order by R.RAT_PROD_PRODCMPY, METER_TYPE_CODE, B.STREAM_ARMCODE, B.STREAM_BASECODE	";
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			$resArray[] = $row;
		}
		return($resArray);
	}


	public function getBases($txn_code) 
	{
		$query = "SELECT TRANBASE.TRSB_CVL, TRANBASE.TRSB_AVL, TRANBASE.TRSB_TMP, TRANBASE.TRSB_DNS, TRANBASE.TRSB_TMP_F, TRANBASE.TRSB_API, TRANBASE.TRSB_TK_TANKCODE, TRANBASE.TRSB_KG, TRANBASE.TRSB_UNT, BASE_PRODS.BASE_CODE, BASE_PRODS.BASE_NAME , BASE_PRODS.BASE_CAT
				  FROM TRANBASE, BASE_PRODS
				  WHERE BASE_PRODS.BASE_CODE = TRANBASE.TRSB_BS AND 
				        TRANBASE.TRSB_ID_TRSF_ID = $txn_code
				  ORDER BY BASE_PRODS.BASE_CAT DESC
		";
		$stid  = oci_parse($this->connect, $query);
		oci_execute($stid);
		while (($row = oci_fetch_object($stid)))
		{
			if($row->TRSB_UNT == 34){
				$row->TRSB_CVL = $row->TRSB_CVL/1000;
				$row->TRSB_AVL = $row->TRSB_AVL/1000;
			}
			$row->Tank_Code = $row->TRSB_TK_TANKCODE;
			$row->product_code = $row->BASE_CODE;
			$row->product_class = $row->BASE_CAT;
			$row->dens = $row->TRSB_DNS;
			$row->Temperature = $row->TRSB_TMP;
			$row->amb_vol = $row->TRSB_AVL;
			$row->cor_vol = $row->TRSB_CVL;
			$row->liq_kg = $row->TRSB_KG;
			$resArray[] = $row;
		}
		return($resArray);
	}
	
	public function setFolioUpdated($user)
	{
		$query ="UPDATE  closeouts SET user_code='$user' WHERE closeout_nr=(SELECT min(closeout_nr) FROM closeouts where status='1')";
		$stid = oci_parse($this->connect, $query);
		oci_execute($stid);
		return('OK');
	}	
}
?>