<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );
require_once( 'PartnershipService.php' );

if(!defined('PARTNER')) define('PARTNER','PartnerService.class');

class PartnerService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				pr.PRTNR_SEQ					as PARTNER_SEQ
				, pr.PRTNR_CMPY					as PARTNER_CMPY_CODE
				, cm.CMPY_NAME					as PARTNER_CMPY_NAME
				, pr.PRTNR_CODE					as PARTNER_CODE
				, pr.PRTNR_NAME1				as PARTNER_NAME1
				, pr.PRTNR_NAME2				as PARTNER_NAME2
				, pr.PRTNR_NAME3				as PARTNER_NAME3
				, pr.PRTNR_NAME4				as PARTNER_NAME4
				, pr.PRTNR_NAME5				as PARTNER_NAME5
				, pr.PRTNR_TYPE					as PARTNER_TYPE
				, pt.PARTNER_TYPE_NAME			as PARTNER_TYPE_NAME
				, pr.PRTNR_ADDR					as PARTNER_ADDR_CODE
				, NVL(dl.DB_ADDR_TEXT, ' ')		as PARTNER_ADDR_TEXT
				, pr.PRTNR_SEQ||' - '||pr.PRTNR_CODE||' - '||pr.PRTNR_NAME1		as PARTNER_DESC
			from 
				PARTNER				pr
				, GUI_COMPANYS		cm
				, PARTNER_TYPES 	pt
				, DB_ADDRESS		da
				, (
					select 
						DB_ADDR_LINE_ID
						, NVL(LISTAGG(DB_ADDR_LINE, ', ') WITHIN group (order by DB_ADDRLINE_NO), ' ')	 as DB_ADDR_TEXT
					from 
						DB_ADDRESS_LINE
					where 
						1 = 1 
					group by 
						DB_ADDR_LINE_ID
				) dl
			where 
				1 = 1
				and pr.PRTNR_TYPE = pt.PARTNER_TYPE_CODE
				and pr.PRTNR_CMPY = cm.CMPY_CODE
				and pr.PRTNR_ADDR = da.DB_ADDRESS_KEY(+)
				and da.DB_ADDRESS_KEY = dl.DB_ADDR_LINE_ID(+)
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
        /*
        if(defined('CGIDIR')){
            $this->cgi = CGIDIR . "gantry/baseprods_mod.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/gantry/baseprods_mod.cgi";
        }
		*/
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) PRVIEW ";
			
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
	}
	
	public function getPartners($prtnr_cmpy="-1")
	{
		$sql = array();
        $sql['sql_text'] = "SELECT * FROM ( " . $this->myview . " ) PRVIEW where (:cmpy='-1' or PRVIEW.PARTNER_CMPY_CODE=:cmpy)   ";
		$sql['sql_data'] = array( $prtnr_cmpy );
			
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

    public function isPartnerExisted( $prtnr_cmpy, $prtnr_code, $prtnr_type )
	{
		$sql = array();
        $sql['sql_text'] = "select * from PARTNER where PRTNR_CMPY=:prtnr_cmpy and PRTNR_CODE=:prtnr_code and PRTNR_TYPE=:prtnr_type ";
		$sql['sql_data'] = array( $prtnr_cmpy, $prtnr_code, $prtnr_type );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isPartnerHasPartnership( $prtnr_cmpy, $prtnr_code, $prtnr_type )
	{
		$sql = array();
        $sql['sql_text'] = "select * from CMPY_CUST_PRTNR where CCP_PRTNR_SEQ in (select PRTNR_SEQ from PARTNER where PRTNR_CMPY=:prtnr_cmpy and PRTNR_CODE=:prtnr_code and PRTNR_TYPE=:prtnr_type) ";
		$sql['sql_data'] = array( $prtnr_cmpy, $prtnr_code, $prtnr_type );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
    }

    public function isPartnerExistedByCode( $prtnr_code )
	{
		$sql = array();
        $sql['sql_text'] = "select * from PARTNER where PRTNR_CODE=:prtnr_code ";
		$sql['sql_data'] = array( $prtnr_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
    }

   
    public function lookupPartnerType()
    {
	    /*
        $sql="
			select 1 as PARTNER_TYPE_ID, 'AG' as PARTNER_TYPE_CODE, 'Sold To' as PARTNER_TYPE_NAME from DUAL
			union 
			select 2 as PARTNER_TYPE_ID, 'WE' as PARTNER_TYPE_CODE, 'Ship To' as PARTNER_TYPE_NAME from DUAL
			union 
			select 3 as PARTNER_TYPE_ID, 'SP' as PARTNER_TYPE_CODE, 'Carrier' as PARTNER_TYPE_NAME from DUAL
		";
		*/
		$sql = "select * from PARTNER_TYPES where 1=1 order by PARTNER_TYPE_ID";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
    }
	
	public function lookupAddressHeader()
	{
        $sql="SELECT DB_ADDRESS_KEY as ADDRESS_CODE, DB_ADDRESS_KEY as ADDRESS_TEXT	FROM DB_ADDRESS";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);

		return($data);
    } 
	
	public function lookupAddressContent()
	{
/*			select 
				DB_ADDR_LINE_ID															as ADDRESS_CODE
				, DB_ADDR_LINE_ID||'['||NVL(LISTAGG(DB_ADDR_LINE, ', ') WITHIN group (order by DB_ADDRLINE_NO), ' ')||']' 	as ADDRESS_TEXT
			from 
				DB_ADDRESS_LINE
			where 
				1 = 1 
			group by 
				DB_ADDR_LINE_ID
*/				
        $sql="
			select 
				da.DB_ADDRESS_KEY						as ADDRESS_CODE
				, da.DB_ADDRESS_KEY||'['||NVL(dl.DB_ADDR_TEXT, ' ')||']' 	as ADDRESS_TEXT
			from 
				DB_ADDRESS		da
				, (
					select 
						DB_ADDR_LINE_ID
						, NVL(LISTAGG(DB_ADDR_LINE, ', ') WITHIN group (order by DB_ADDRLINE_NO), ' ')	 as DB_ADDR_TEXT
					from 
						DB_ADDRESS_LINE
					where 
						1 = 1 
					group by 
						DB_ADDR_LINE_ID
				) dl
			where 
				1 = 1
				and da.DB_ADDRESS_KEY = dl.DB_ADDR_LINE_ID(+)
		";
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);
		//$data = $mydb->retrieveArray($sql);

		return($data);
    } 


  
    
    public function getNextPartnerSeq2(  )
	{
        $mydb = DB::getInstance();

		$sql = array();
        $sql['sql_text'] = "select MAX(PRTNR_SEQ)+1 AS NEXT_ID from PARTNER";
		$sql['sql_data'] = array();
		
        $rows = $mydb->query($sql, "N");

		if ( is_null($rows[0]->NEXT_ID) == TRUE || $rows[0]->NEXT_ID=="" )
		{
			$next_id = 1;
		}
		else
		{
			$next_id = (integer)$rows[0]->NEXT_ID;
		}
		
		return($next_id);
    }
    
    public function readNextPartnerSequence(  )
	{
        $mydb = DB::getInstance();

		$sql = array();
        $sql['sql_text'] = "select SEQ_PARTNER.NEXTVAL AS NEXT_ID from DUAL";
		$sql['sql_data'] = array();
		
        $rows = $mydb->query($sql, "N");

		if ( is_null($rows[0]->NEXT_ID) == TRUE || $rows[0]->NEXT_ID=="" )
		{
			$next_id = 1;
		}
		else
		{
			$next_id = (integer)$rows[0]->NEXT_ID;
		}
		
		return($next_id);
    }

    public function isPartnerSequenceExisted( $prtnr_seq )
	{
		$sql = array();
        $sql['sql_text'] = "select * from PARTNER where PRTNR_SEQ=:prtnr_seq ";
		$sql['sql_data'] = array( $prtnr_seq );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
	}
    
    public function getNextPartnerSeq(  )
	{
		$next_id = 1;
		
		for( $i=0; $i<1000; $i++ )
		{
			$next_id = $this->readNextPartnerSequence();
			$existed = $this->isPartnerSequenceExisted( $next_id );
			if ( $existed == 0 )
			{
				break;
			}
		}

		return($next_id);
    }


	public function create( $data )
	{
		$next_seq = $data->partner_seq;
		if ( $next_seq=="" || $next_seq<=0 )
		{
			$next_seq = $this->getNextPartnerSeq();
		}
		
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into PARTNER
			( 
				PRTNR_SEQ
				, PRTNR_CODE
				, PRTNR_NAME1 
				, PRTNR_NAME2 
				, PRTNR_NAME3 
				, PRTNR_NAME4 
				, PRTNR_NAME5 
				, PRTNR_TYPE  
				, PRTNR_ADDR  
				, PRTNR_CMPY
			) 
			values 
			( 
				:prtnr_seq
				, :prtnr_code
				, :prtnr_name1 
				, :prtnr_name2 
				, :prtnr_name3 
				, :prtnr_name4 
				, :prtnr_name5 
				, :prtnr_type  
				, :prtnr_addr 
				, :prtnr_cmpy
			) 
		";
		$sql['sql_data'] = array( $next_seq, $data->partner_code, $data->partner_name1, $data->partner_name2, $data->partner_name3, $data->partner_name4, $data->partner_name5, $data->partner_type, $data->partner_addr_code, $data->partner_cmpy_code );
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the partner succeeded!!!",PARTNER);

		// write journal
		$keys = array ("PRTNR_SEQ"=>($next_seq) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Partner", "PARTNER", $keys, $excludes );
		$ins_journal->logOneLine("created a partner [" . $next_seq . ":" . $data->partner_cmpy_code . "," . $data->partner_code . "," . $data->partner_type . "] successfully");
		
		// create the default partnership
		$ps = new PartnershipService();
		$data->partner_cust_acct = "";
		$data->partner_seq = $next_seq;
		if ( $ps->createOneRecord($data) == "ERROR" )
		{
			logMe("Create the default partnership failed!!!",PARTNER);
			return "ERROR";
		}
		
		return "OK";
	}
    
	public function update( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update PARTNER set 
				PRTNR_CODE = :prtnr_code
				, PRTNR_NAME1 = :prtnr_name1 
				, PRTNR_NAME2 = :prtnr_name2
				, PRTNR_NAME3 = :prtnr_name3
				, PRTNR_NAME4 = :prtnr_name4 
				, PRTNR_NAME5 = :prtnr_name5 
				, PRTNR_TYPE = :prtnr_type 
				, PRTNR_ADDR = :prtnr_addr 
				, PRTNR_CMPY = :prtnr_cmpy 
			where 
				PRTNR_SEQ = :prtnr_seq
		";
		$sql['sql_data'] = array( $data->partner_code, $data->partner_name1, $data->partner_name2, $data->partner_name3, $data->partner_name4, $data->partner_name5, $data->partner_type, $data->partner_addr_code, $data->partner_cmpy_code, $data->partner_seq );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the partner succeeded!!!",PARTNER);
		
		$keys = array ("PRTNR_SEQ"=>($data->partner_seq) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Partner", "PARTNER", $keys, $excludes );
		$upd_journal->logOneLine("updated a partner [" . $data->partner_seq . ":" . $data->partner_cmpy_code . "," . $data->partner_code . "," . $data->partner_type . "] successfully");
		
		return "OK";
	}
    
	public function delete( $data )
	{
		/*
		// delete the default partnership
		$ps = new PartnershipService();
		$data->partner_cust_acct = "";
		if ( $ps->deleteOneRecord($data) == "ERROR" )
		{
			logMe("Delete the default partnership failed!!!",PARTNER);
			return "ERROR";
		}
		*/
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from PARTNER 
			where 
				PRTNR_SEQ = :prtnr_seq
		";
		$sql['sql_data'] = array( $data->partner_seq );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the partner succeeded!!!",PARTNER);

		// write journal
		$keys = array ("PRTNR_SEQ"=>($data->partner_seq) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Partner", "PARTNER", $keys, $excludes );
		$del_journal->logOneLine("deleted a partner [" . $data->partner_seq . ":" . $data->partner_cmpy_code . "," . $data->partner_code . "," . $data->partner_type . "] successfully");
		
		return "OK";
	}
	
}
?>