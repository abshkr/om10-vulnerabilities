<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('PARTNERSHIP')) define('PARTNERSHIP','PartnershipService.class');

class PartnershipService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
			    ccp.CCP_CMPY_CODE				as PARTNER_CMPY_CODE
				, cmp.CMPY_NAME					as PARTNER_CMPY_NAME
				, ccp.CCP_CUST_ACCT				as PARTNER_CUST_ACCT
				, ccm.CMPY_NAME					as PARTNER_CUST_NAME
				, ccp.CCP_PRTNR_SEQ				as PARTNER_SEQ
				, pr.PRTNR_CODE					as PARTNER_CODE
				, pr.PRTNR_NAME1				as PARTNER_NAME1
				, pr.PRTNR_NAME2				as PARTNER_NAME2
				, pr.PRTNR_NAME3				as PARTNER_NAME3
				, pr.PRTNR_NAME4				as PARTNER_NAME4
				, pr.PRTNR_NAME5				as PARTNER_NAME5
				, pr.PRTNR_TYPE					as PARTNER_TYPE
				, pt.PARTNER_TYPE_NAME			as PARTNER_TYPE_NAME
				, pr.PRTNR_ADDR					as PARTNER_ADDR_CODE
				, dl.DB_ADDR_TEXT				as PARTNER_ADDR_TEXT
			from 
				CMPY_CUST_PRTNR		ccp
				, GUI_COMPANYS				cmp
				, CUSTOMER				cst
				, COMPANYS				ccm
				, PARTNER				pr
				, PARTNER_TYPES 		pt
				, DB_ADDRESS		da
				, (
					select 
						DB_ADDR_LINE_ID
						, LISTAGG(DB_ADDR_LINE, ', ') WITHIN group (order by DB_ADDRLINE_NO) as DB_ADDR_TEXT
					from 
						DB_ADDRESS_LINE
					where 
						1 = 1 
					group by 
						DB_ADDR_LINE_ID
				) dl
			where 
				1 = 1
				and ccp.CCP_PRTNR_SEQ = pr.PRTNR_SEQ
				and pr.PRTNR_TYPE = pt.PARTNER_TYPE_CODE
				and pr.PRTNR_ADDR = da.DB_ADDRESS_KEY(+)
				and da.DB_ADDRESS_KEY = dl.DB_ADDR_LINE_ID(+)
				and ccp.CCP_CMPY_CODE = cmp.CMPY_CODE
				and ccp.CCP_CUST_ACCT = cst.CUST_ACCT(+)
				and cst.CUST_CODE = ccm.CMPY_CODE(+)
				and ccp.CCP_CMPY_CODE = pr.PRTNR_CMPY
	";
	
	
	public function __construct()
	{
		session_start();
		
        if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
			if( isset($_SERVER['HTTP_HOST']) )
			{
				$this->host = $_SERVER['HTTP_HOST'];
			}
			else
			{
				$this->host = "localhost";
			}
        }
        
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "gantry/baseprods_mod.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/gantry/baseprods_mod.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) PRVIEW ";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
	
	public function getPaged($values, $dtypes, $sorts, $orders, $pageNum = 1, $pageSize = 50)
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
		else $sort="ORDER BY PARTNER_CMPY_CODE, PARTNER_CODE";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) PRVIEW ";
		//$query = $query . " $filter $sort ";
		$query = $query . " " . $filter['sql_text'] . " $sort ";

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

    public function isPartnershipExistedBySeq( $cmpy_code, $cust_acct, $prtnr_seq )
	{
		$sql = array();
        //$sql['sql_text'] = "select * from CMPY_CUST_PRTNR where CCP_CMPY_CODE=:cmpy_code and CCP_CUST_ACCT=:cust_acct and CCP_PRTNR_SEQ=:prtnr_seq ";
        $sql['sql_text'] = "
			select * from CMPY_CUST_PRTNR 
			where 
				((:cmpy_code is null and CCP_CMPY_CODE is null) or CCP_CMPY_CODE=:cmpy_code) 
				and ((:cust_acct is null and CCP_CUST_ACCT is null) or CCP_CUST_ACCT=:cust_acct) 
				and CCP_PRTNR_SEQ=:prtnr_seq 
		";
		
		$sql['sql_data'] = array( $cmpy_code, $cust_acct, $prtnr_seq );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isPartnershipExistedByCode( $cmpy_code, $cust_acct, $prtnr_code )
	{
		$sql = array();
		$sql['sql_text'] = "
			select * 
			from 
				CMPY_CUST_PRTNR 	ccp
				, PARTNER			pnr
			where 
				(ccp.CCP_CMPY_CODE=:cmpy_code) 
				and ccp.CCP_CMPY_CODE=pnr.PRTNR_CMPY
				and ((:cust_acct is null and ccp.CCP_CUST_ACCT is null) or ccp.CCP_CUST_ACCT=:cust_acct) 
				and ccp.CCP_PRTNR_SEQ=pnr.PRTNR_SEQ
				and pnr.PRTNR_CODE=:prtnr_code 
		";
		$sql['sql_data'] = array( $cmpy_code, $cust_acct, $prtnr_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isPartnershipExisted2( $cmpy_code, $cust_acct, $prtnr_seq, $prtnr_code="" )
	{
		if ( $prtnr_code == "" )
		{
			return $this->isPartnershipExistedBySeq( $cmpy_code, $cust_acct, $prtnr_seq );
		}
		else
		{
			return $this->isPartnershipExistedByCode( $cmpy_code, $cust_acct, $prtnr_code, $prtnr_seq );
		}
   }

    public function isPartnershipExisted( $cmpy_code, $cust_acct, $prtnr_seq, $prtnr_code="" )
	{
		$sql = array();
        $sql['sql_text'] = "
			select * 
			from  PARTNER pr0
			where
				pr0.PRTNR_SEQ=:seq
				and 
				(pr0.PRTNR_CMPY, pr0.PRTNR_CODE, pr0.PRTNR_TYPE) in
				(
					select pr.PRTNR_CMPY, pr.PRTNR_CODE, pr.PRTNR_TYPE 
					from PARTNER pr
					where pr.PRTNR_SEQ in 
					(
						select ccp.CCP_PRTNR_SEQ 
						from CMPY_CUST_PRTNR ccp 
						where 
							ccp.CCP_CMPY_CODE=:cmpy_code
							and ccp.CCP_CMPY_CODE=pr.prtnr_cmpy
							and ((:cust_acct is null and ccp.CCP_CUST_ACCT is null) or ccp.CCP_CUST_ACCT=:cust_acct) 
					)
				)
		";
		
		$sql['sql_data'] = array( $prtnr_seq, $cmpy_code, $cust_acct );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

  
    public function create( $data )
	{
		// check to see if parameter is an array or an object
		if ( is_object( $data ) )
		{
			// one row as object, one record
			return $this->createOneRecord( $data );
		}
		else if ( is_array( $data ) )
		{
			// more than one rows as an array, multiple records
			$ok_num = 0;
			foreach( $data as $rowobj )
			{
				$rtn = $this->createOneRecord( $rowobj );
				if ( $rtn == "OK" )
				{
					$ok_num += 1;
				}
			}
			if ( $ok_num > 0 )
			{
				return "OK";
			}
			else
			{
				return "ERROR";
			}			
		}
		else
		{
			return "ERROR";
		}			
		
	}
	
	public function createOneRecord( $data )
	{
		$rec_count = $this->isPartnershipExisted( $data->partner_cmpy_code, $data->partner_cust_acct, $data->partner_seq, $data->partner_code );
		if ( $rec_count > 0 )
		{
			logMe("The partnership exists already therefore no INSERT action!!!",PARTNERSHIP);
			return "ERROR";
		}

		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into CMPY_CUST_PRTNR
			( 
				CCP_CMPY_CODE
				, CCP_CUST_ACCT 
				, CCP_PRTNR_SEQ 
			) 
			values 
			( 
				:cmpy_code
				, :cust_acct 
				, :prtnr_seq 
			) 
		";

		$sql['sql_data'] = array( $data->partner_cmpy_code, $data->partner_cust_acct, $data->partner_seq );
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the partnership succeeded!!!",PARTNERSHIP);

		// write journal
		$keys = array ("CCP_CMPY_CODE"=>($data->partner_cmpy_code), "CCP_CUST_ACCT"=>($data->partner_cust_acct), "CCP_PRTNR_SEQ"=>($data->partner_seq) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Partnership", "CMPY_CUST_PRTNR", $keys, $excludes );
		$ins_journal->logOneLine("created a partnership with [" . $data->partner_cmpy_code . ", " . $data->partner_cust_acct . ", " . $data->partner_seq . "-" . $data->partner_code . "] successfully");
		
		return "OK";
	}
    
	public function update( $data )
	{
		$data1 = $data->oldobj;
		$data2 = $data->newobj;
		
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update CMPY_CUST_PRTNR set 
				CCP_CMPY_CODE = :cmpy_code2 
				, CCP_CUST_ACCT = :cust_acct2
				, CCP_PRTNR_SEQ = :prtnr_seq2
			where 
				((:cmpy_code is null and CCP_CMPY_CODE is null) or CCP_CMPY_CODE=:cmpy_code) 
				and ((:cust_acct is null and CCP_CUST_ACCT is null) or CCP_CUST_ACCT=:cust_acct) 
				and CCP_PRTNR_SEQ=:prtnr_seq 
		";
		$sql['sql_data'] = array( $data2->partner_cmpy_code, $data2->partner_cust_acct, $data2->partner_seq,  $data1->partner_cmpy_code, $data1->partner_cust_acct, $data1->partner_seq );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the partnership succeeded!!!",PARTNERSHIP);
		
		$keys = array ("CCP_CMPY_CODE"=>($data2->partner_cmpy_code), "CCP_CUST_ACCT"=>($data2->partner_cust_acct), "CCP_PRTNR_SEQ"=>($data2->partner_seq) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Partnership", "CMPY_CUST_PRTNR", $keys, $excludes );
		$upd_journal->logOneLine("updated a partnership from [" . $data1->partner_cmpy_code . ", " . $data1->partner_cust_acct . ", " . $data1->partner_seq . "-" . $data1->partner_code . "] to [" . $data2->partner_cmpy_code . ", " . $data2->partner_cust_acct . ", " . $data2->partner_seq . "-" . $data2->partner_code . "] successfully");
		
		return "OK";
	}
    
    public function delete( $data )
	{
		// check to see if parameter is an array or an object
		if ( is_object( $data ) )
		{
			// one row as object, one record
			return $this->deleteOneRecord( $data );
		}
		else if ( is_array( $data ) )
		{
			// more than one rows as an array, multiple records
			$ok_num = 0;
			foreach( $data as $rowobj )
			{
				$rtn = $this->deleteOneRecord( $rowobj );
				if ( $rtn == "OK" )
				{
					$ok_num += 1;
				}
			}
			if ( $ok_num > 0 )
			{
				return "OK";
			}
			else
			{
				return "ERROR";
			}			
		}
		else
		{
			return "ERROR";
		}			
		
	}
	
	public function deleteOneRecord( $data )
	{
		$rec_count = $this->isPartnershipExisted( $data->partner_cmpy_code, $data->partner_cust_acct, $data->partner_seq, $data->partner_code );
		if ( $rec_count == 0 )
		{
			logMe("The partnership does not exist therefore no DELETE action!!!",PARTNERSHIP);
			return "ERROR";
		}

        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from CMPY_CUST_PRTNR 
			where 
				((:cmpy_code is null and CCP_CMPY_CODE is null) or CCP_CMPY_CODE=:cmpy_code) 
				and ((:cust_acct is null and CCP_CUST_ACCT is null) or CCP_CUST_ACCT=:cust_acct) 
				and CCP_PRTNR_SEQ=:prtnr_seq 
		";
		$sql['sql_data'] = array( $data->partner_cmpy_code, $data->partner_cust_acct, $data->partner_seq );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the partnership succeeded!!!",PARTNERSHIP);

		// write journal
		$keys = array ("CCP_CMPY_CODE"=>($data->partner_cmpy_code), "CCP_CUST_ACCT"=>($data->partner_cust_acct), "CCP_PRTNR_SEQ"=>($data->partner_seq) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Partnership", "CMPY_CUST_PRTNR", $keys, $excludes );
		$del_journal->logOneLine("deleted a partnership with [" . $data->partner_cmpy_code . ", " . $data->partner_cust_acct . ", " . $data->partner_seq . ", " . $data->partner_code . "] successfully");
		
		return "OK";
	}
	
}
?>