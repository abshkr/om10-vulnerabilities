<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

class TransactionListService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';

	public function __construct()
	{
		session_start();
		
		if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
            $this->host ="localhost";
        }
		
		if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "load_scheds/trans_cur_list.cgi";
		} else {
            $this->cgi ="cgi-bin/en/load_scheds/trans_cur_list.cgi";
		}
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM GUI_TRANSACTIONS";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
	
	public function getPaged($values, $dtypes, $sorts, $orders, $pageNum = 1, $pageSize = 500)
	{
        $g = new GlobalClass();
	
		if ($values == "" || is_string($values) )
		{
			//$filter = $values;
			$filterObj = array();
			$filterObj['sql_text'] = $values;
			$filterObj['sql_data'] = array();
			$filter = $filterObj;
		}
		else
		{
			$fields = get_object_vars( $values );
			$types = get_object_vars( $dtypes );
			$filter = $g->createWhereCondition( $fields, $types, 1 );
		} 
		
		$sort = $g->createOrderbyCondition ($sorts, $orders);
        if($sort!='')$sort="ORDER BY $sort";
		else $sort="ORDER BY TRSA_ID DESC";
		
		//$query = "SELECT * FROM GUI_TRANSACTIONS $filter $sort";
		$query = "SELECT * FROM GUI_TRANSACTIONS " . $filter['sql_text'] . " $sort";

		$low   = ($pageNum-1)*$pageSize+1;
		$high  = $pageNum*$pageSize; 
		//$queryPaged = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		
		$queryPaged = array();
        $queryPaged['sql_text'] = "SELECT * FROM (SELECT a.*, ROWNUM rn FROM ($query) a) WHERE rn BETWEEN $low AND $high";
		$queryPaged['sql_data'] = $filter['sql_data'];
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($queryPaged);
		
		$queryCount = array();
        $queryCount['sql_text'] = $query;
		$queryCount['sql_data'] = $filter['sql_data'];
		
		//$data->count = $mydb->count( $query );
		$data->count = $mydb->count( $queryCount );

		return($data);
    } 

	public function getTransactionDetails($txn_id) 
	{
		//$sql ="SELECT * FROM GUI_TRANSACTION_DETAILS WHERE trsftrid_trsa_id=$txn_id";
		
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM GUI_TRANSACTION_DETAILS WHERE trsftrid_trsa_id=:txn_id order by TRSF_ID ASC";
		$sql['sql_data'] = array( $txn_id );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}

	public function getTransactionMeterDetails($txn_id)
	{
		//$sql = "SELECT * FROM GUI_METER_DETAILS WHERE TRSFTRID_TRSA_ID='$txn_id'";
		
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM GUI_METER_DETAILS WHERE TRSFTRID_TRSA_ID=:txn_id";
		$sql['sql_data'] = array( $txn_id );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
	
	public function getTripTransactions($trip, $supplier)
	{
		//$sql = "SELECT * from gui_transactions where trsa_trip='$trip' and trsa_supplier='$supplier'";
		
		$sql = array();
        $sql['sql_text'] = "SELECT * from gui_transactions where trsa_trip=:trip and trsa_supplier=:supplier";
		$sql['sql_data'] = array( $trip, $supplier );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
	
	public function getMovementTransactions($move_id, $line_id)
	{
		//$sql = "SELECT * from gui_transactions where (trsa_trip, trsa_supplier) in (select MS_SHLSTRIP, MS_SHLSSUPP from MOV_SCHEDULES where MS_MOVEID='$move_id') ";
		//$sql = "SELECT * from gui_transactions where (trsa_trip, trsa_supplier) in (select ms.MS_SHLSTRIP, ms.MS_SHLSSUPP from MOV_SCHEDULES ms, MOV_SCHD_ITEMS mi where ms.MS_SHLSTRIP=mi.MSITM_SHLSTRIP and ms.MS_SHLSSUPP=mi.MSITM_SHLSSUPP and mi.MSITM_MOVEID='$move_id' and mi.MSITM_MOVITEM='$line_id') ";
		
		$sql = array();
        $sql['sql_text'] = "SELECT * from gui_transactions where (trsa_trip, trsa_supplier) in (select ms.MS_SHLSTRIP, ms.MS_SHLSSUPP from MOV_SCHEDULES ms, MOV_SCHD_ITEMS mi where ms.MS_SHLSTRIP=mi.MSITM_SHLSTRIP and ms.MS_SHLSSUPP=mi.MSITM_SHLSSUPP and mi.MSITM_MOVEID=:move_id and mi.MSITM_MOVITEM=:line_id) ";
		$sql['sql_data'] = array( $move_id, $line_id );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
	
	public function getAllByCompany($code, $type) {
		//$sql = "SELECT * FROM gui_transactions where ($type=1 and trsa_supplier='$code') or ($type=2 and trsa_carrier='$code') or ($type=4 and trsa_drawer='$code') ";
		
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM gui_transactions where ($type=1 and trsa_supplier=:cmpy_code) or ($type=2 and trsa_carrier=:cmpy_code) or ($type=4 and trsa_drawer=:cmpy_code) ";
		$sql['sql_data'] = array( $code );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
	
	
	public function update( $data )
	{
		// update load details
		$res = $this->updateLoadSelf( $data );
		if ( $res != "OK" )
		{
			return "ERROR";
		}
		
		// update transaction items
		if ( is_array($data->trsa_items) === FALSE )
		{
			$data->trsa_items = (array)($data->trsa_items);
		}
		if( $data->has_items_trsa=="1" && sizeof($data->trsa_items) > 0 )
		{
			for($i=0; $i<sizeof($data->trsa_items); $i++)
			{   
				$trsa_line = $data->trsa_items[$i];
				$trsa_line_result = $this->updateTransaction( $trsa_line );
				if ( $trsa_line_result != "OK" )
				{
					return $trsa_line_result;
				}
			}
		}
		
        return "OK";
	}
    
	public function updateLoadSelf( $data )
	{
		return "OK";
	}
	
	public function updateTransaction( $data )
	{
		// update transaction details
		$res = $this->updateTransactionSelf( $data );
		if ( $res != "OK" )
		{
			return "ERROR";
		}
		
		// update transfer items
		if ( is_array($data->trsf_items) === FALSE )
		{
			$data->trsf_items = (array)($data->trsf_items);
		}
		if( $data->has_items_trsf=="1" && sizeof($data->trsf_items) > 0 )
		{
			for($i=0; $i<sizeof($data->trsf_items); $i++)
			{   
				$trsf_line = $data->trsf_items[$i];
				$trsf_line_result = $this->updateTransfer( $trsf_line );
				if ( $trsf_line_result != "OK" )
				{
					return $trsf_line_result;
				}
			}
		}
		
		// update trans_total items - TODO
		
        return "OK";
	}
    
	public function updateTransactionSelf( $data )
	{
		return "OK";
	}
	
	public function updateTransfer( $data )
	{
		// update transaction details
		$res = $this->updateTransferSelf( $data );
		if ( $res != "OK" )
		{
			return "ERROR";
		}
		
		// update tranbase items
		if ( is_array($data->trsb_items) === FALSE )
		{
			$data->trsb_items = (array)($data->trsb_items);
		}
		if( $data->has_items_trsb=="1" && sizeof($data->trsb_items) > 0 )
		{
			for($i=0; $i<sizeof($data->trsb_items); $i++)
			{   
				$trsb_line = $data->trsb_items[$i];
				$trsb_line_result = $this->updateTranbaseSelf( $trsb_line );
				if ( $trsb_line_result != "OK" )
				{
					return $trsb_line_result;
				}
			}
		}
		
		// update trforders items - TODO
		
        return "OK";
	}
    
	public function updateTransferSelf( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
/*
TRSF_DEVICE
TRSF_SRC
TRSF_DES
TRSFPROD_PRODCODE
TRSFPROD_PRODCMPY
TRSF_QTY_COR
TRSF_QTY_AMB
TRSF_TEMP
TRSF_DENSITY
TRSF_OPN_AMB
TRSF_OPN_COR
TRSF_CLS_AMB
TRSF_CLS_COR
TRSF_UNIT
TRSF_DELIVERED
TRSF_ORDER
TRSF_TRAILER
TRSF_TRAILERCOMP
TRSF_BAA_CODE
TRSF_LOAD_KG
TRSF_OPEN_KG
TRSF_CLOSE_KG
TRSF_ID
TRSF_TERMINAL
TRSFTRID_TRSA_ID
TRSFTRID_TRSA_TRM
TRSF_API
TRSF_TEMP_F
*/		
        $sql['sql_text'] = "
			update TRANSFERS set 
				TRSF_QTY_AMB     	= :trsf_qty_amb
				,TRSF_QTY_COR       = :trsf_qty_cor
				,TRSF_LOAD_KG       = :trsf_load_kg
				,TRSF_DENSITY       = :trsf_density
				,TRSF_TEMP        	= :trsf_temp
 				,TRSF_API        	= :trsf_api
 				,TRSF_TEMP_F        = :trsf_temp_f
			where 
				TRSF_ID     		= :trsf_id
				and TRSF_TERMINAL   = :trsf_terminal
				and TRSFPROD_PRODCODE  = :trsfprod_prodcode
				and TRSFPROD_PRODCMPY  = :trsfprod_prodcmpy
		";
		
		$sql['sql_data'] = array(  
				$data->trsf_qty_amb
				, $data->trsf_qty_cor
				, $data->trsf_load_kg
				, $data->trsf_density
				, $data->trsf_temp
				, $data->trsf_api
				, $data->trsf_temp_f
				, $data->trsf_id
				, $data->trsf_terminal
				, $data->trsfprod_prodcode
				, $data->trsfprod_prodcmpy
		);
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the transfer succeeded!!!",DELIVERYDETAIL);
		
		$keys = array ( "TRSF_ID"=>($data->trsf_id), "TRSF_TERMINAL"=>($data->trsf_terminal), "TRSFPROD_PRODCODE"=>($data->trsfprod_prodcode), "TRSFPROD_PRODCMPY"=>($data->trsfprod_prodcmpy) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Transactions::Transfers", "TRANSFERS", $keys, $excludes );
		$upd_journal->logOneLine("updated a transfer [" . $data->trsf_id . ", " . $data->trsf_terminal . ", " . $data->trsfprod_prodcode . ", " . $data->trsfprod_prodcmpy . "] successfully");
		
		return "OK";
	}
    
	public function updateTranbaseSelf( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
/*
TRSB_METER
TRSB_INJECTOR
TRSB_BS
TRSB_CVL
TRSB_AVL
TRSB_TMP
TRSB_DNS
TRSB_UNT
TRSB_RVL
TRSB_RTMP
TRSB_RUNT
TRSB_TK_TANKCODE
TRSB_TK_TANKDEPO
TRSB_ID_TRSF_ID
TRSB_ID_TRSF_TRM
TRSB_KG
TRSB_OPN_AMB
TRSB_OPN_COR
TRSB_OPN_KG
TRSB_CLS_AMB
TRSB_CLS_COR
TRSB_CLS_KG
TRSB_API
TRSB_TMP_F
*/
        $sql['sql_text'] = "
			update TRANBASE set 
				TRSB_TK_TANKCODE     	= :trsb_tk_tankcode
				,TRSB_AVL      			= :trsb_avl
				,TRSB_CVL       		= :trsb_cvl
				,TRSB_KG       			= :trsb_kg
				,TRSB_DNS       		= :trsb_dns
				,TRSB_TMP        		= :trsb_tmp
 				,TRSB_API        		= :trsb_api
 				,TRSB_TMP_F        		= :trsb_tmp_f
			where 
				TRSB_ID_TRSF_ID     	= :trsb_id_trsf_id
				and TRSB_ID_TRSF_TRM   	= :trsb_id_trsf_trm
				and TRSB_BS  			= :trsb_bs
		";
		$sql['sql_data'] = array(  
				$data->trsb_tk_tankcode
				, $data->trsb_avl
				, $data->trsb_cvl
				, $data->trsb_kg
				, $data->trsb_dns
				, $data->trsb_tmp
				, $data->trsb_api
				, $data->trsb_tmp_f
				, $data->trsb_id_trsf_id
				, $data->trsb_id_trsf_trm
				, $data->trsb_bs
		);
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the tranbase succeeded!!!",DELIVERYDETAIL);
		
		$keys = array ( "TRSB_ID_TRSF_ID"=>($data->trsb_id_trsf_id), "TRSB_ID_TRSF_TRM"=>($data->trsb_id_trsf_trm), "TRSB_BS"=>($data->trsb_bs) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Transactions::Transfers::Base Products", "TRANBASE", $keys, $excludes );
		$upd_journal->logOneLine("updated a transfer base product [" . $data->trsb_id_trsf_id . ", " . $data->trsb_id_trsf_trm . ", " . $data->trsb_bs . "] successfully");
		
		return "OK";
	}

    public function isTripLinked( $trip_no, $supp_code )
	{
/*
LS_SUPP_TRIP_NO
LS_SUPP_SUPP
LS_LINKED_TRIP_NO
LS_LINKED_SUPP
LS_COMPLETABLE		
*/
		$sql = array();
        $sql['sql_text'] = "
			select * 
			from LINKED_SCHEDULES 
			where 
				LS_LINKED_TRIP_NO=:linked_trip_no
				and LS_LINKED_SUPP=:linked_supp
		";
		$sql['sql_data'] = array( $trip_no, $supp_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}

}
?>