<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('ADDRESSES')) define('ADDRESSES','AddressService.class');

class AddressService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	var $myview="
			select 
				da.DB_ADDRESS_KEY						as ADDRESS_CODE
				, NVL(dl.DB_ADDR_TEXT, ' ')				as ADDRESS_TEXT
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
		$sql = "SELECT * FROM ( " . $this->myview . " ) ADDRVIEW ";
			
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
		else $sort="ORDER BY ADDRESS_CODE";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) ADDRVIEW ";
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
		//$data = $mydb->retrieveArray($queryPaged);
		
		$queryCount = array();
        $queryCount['sql_text'] = $query;
		$queryCount['sql_data'] = $filter['sql_data'];
		
		//$data->count = $mydb->count( $query );
		$data->count = $mydb->count( $queryCount );

		return($data);
    } 
         
    public function getAddressLines( $addr_code )
	{
		$sql = array();
        $sql['sql_text'] = "
			select
				dl.DB_ADDR_LINE_ID
				, dl.DB_ADDRLINE_NO
				, dl.DB_ADDR_LINE
				, dl.DB_ADDR_LINE_TYPE			
				, dt.ADDRESS_TYPE_NAME			as DB_ADDR_LINE_TYPENAME
			from
				DB_ADDRESS_LINE dl
				, (
					select 
						(MSG_ID-3023+1) 		as ADDRESS_TYPE_ID
						, MESSAGE 				as ADDRESS_TYPE_NAME 
					from 
						MSG_LOOKUP 
					where 
						MSG_ID>=3023 and MSG_ID<=3034  
						and (LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG')) 
				) dt
			where 
				1=1
				and dl.DB_ADDR_LINE_ID=:addr_code
				and dl.DB_ADDR_LINE_TYPE=dt.ADDRESS_TYPE_ID(+)
			order by
				dl.DB_ADDRLINE_NO
		";
		$sql['sql_data'] = array( $addr_code );
		
        $mydb = DB::getInstance();
		$data = $mydb->retrieve($sql);
		//$data = $mydb->retrieveArray($sql);

		return($data);
	}

    public function isAddressExisted( $addr_code )
	{
		$sql = array();
        $sql['sql_text'] = "select * from DB_ADDRESS where DB_ADDRESS_KEY=:addr_code ";
		$sql['sql_data'] = array( $addr_code );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

    public function isAddressLineExisted( $addr_code, $addr_line )
	{
		$sql = array();
        $sql['sql_text'] = "select * from DB_ADDRESS_LINE where DB_ADDR_LINE_ID=:addr_code and DB_ADDRLINE_NO=:addr_line ";
		$sql['sql_data'] = array( $addr_code, $addr_line );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

   
   public function lookupAddressType()
   {
        $sql="
			select 
				(MSG_ID-3023+1) 		as ADDRESS_TYPE_ID
				, MESSAGE 				as ADDRESS_TYPE_NAME 
			from 
				MSG_LOOKUP 
			where 
				MSG_ID>=3023 and MSG_ID<=3034  
				and (LANG_ID=SYS_CONTEXT('CONN_CONTEXT','LANG') OR (SYS_CONTEXT('CONN_CONTEXT','LANG') IS NULL AND LANG_ID = 'ENG')) 
		";
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


  
    
	public function createMain( $data )
	{
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into DB_ADDRESS
			( 
				DB_ADDRESS_KEY
			) 
			values 
			( 
				:addr_key
			) 
		";
		$sql['sql_data'] = array( $data->db_address_key );
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the address key succeeded!!!",ADDRESSES);

		// write journal
		$keys = array ("DB_ADDRESS_KEY"=>($data->db_address_key) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Addresses", "DB_ADDRESS", $keys, $excludes );
		$ins_journal->logOneLine("created a key of address [" . $data->db_address_key . "] successfully");
		
		return "OK";
	}
    
	public function updateMain( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update DB_ADDRESS set 
				DB_ADDRESS_KEY = :new_key 
			where 
				DB_ADDRESS_KEY = :old_key
		";
		$sql['sql_data'] = array( $data->db_address_key_new, $data->db_address_key_old );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the address key succeeded!!!",ADDRESSES);
		
		$keys = array ("DB_ADDRESS_KEY"=>($data->db_address_key_new) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Addresses", "DB_ADDRESS", $keys, $excludes );
		$upd_journal->logOneLine("updated a key of address from [" . $data->db_address_key_old . "] to [" . $data->db_address_key_new . "] successfully");
		
		return "OK";
	}
    
	public function deleteMain( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from DB_ADDRESS 
			where 
				DB_ADDRESS_KEY = :addr_key
		";
		$sql['sql_data'] = array( $data->db_address_key );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the address key succeeded!!!",ADDRESSES);

		// write journal
		$keys = array ("DB_ADDRESS_KEY"=>($data->db_address_key) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Addresses", "DB_ADDRESS", $keys, $excludes );
		$del_journal->logOneLine("deleted a key of address [" . $data->db_address_key . "] successfully");
		
		return "OK";
	}

  
    
	public function createLine( $data )
	{
		$mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into DB_ADDRESS_LINE
			( 
				DB_ADDR_LINE_ID
				, DB_ADDRLINE_NO 
				, DB_ADDR_LINE 
				, DB_ADDR_LINE_TYPE 
			) 
			values 
			( 
				:addr_line_id
				, :addrline_no 
				, :addr_line 
				, :addr_line_type 
			) 
		";
		$sql['sql_data'] = array( $data->db_addr_line_id, $data->db_addrline_no, $data->db_addr_line, $data->db_addr_line_type );
		
		
        $comment_res = $mydb->insert($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Insert the address line succeeded!!!",ADDRESSES);

		// write journal
		$keys = array ( "DB_ADDR_LINE_ID"=>($data->db_addr_line_id), "DB_ADDRLINE_NO"=>($data->db_addrline_no) );
		$excludes = array ();
		$ins_journal = new UpdateJournalClass( "Addresses", "DB_ADDRESS_LINE", $keys, $excludes );
		$ins_journal->logOneLine("created a line of address [" . $data->db_addr_line_id . ", " . $data->db_addrline_no . ", " . $data->db_addr_line . "] successfully");
		
		return "OK";
	}
    
	public function updateLine( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update DB_ADDRESS_LINE set 
				DB_ADDR_LINE = :addr_line 
				, DB_ADDR_LINE_TYPE = :addr_line_type
			where 
				DB_ADDR_LINE_ID = :addr_line_id
				and DB_ADDRLINE_NO = :addrline_no
		";
		$sql['sql_data'] = array( $data->db_addr_line, $data->db_addr_line_type, $data->db_addr_line_id, $data->db_addrline_no );
		
        $comment_res = $mydb->update($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Update the address line succeeded!!!",ADDRESSES);
		
		$keys = array ( "DB_ADDR_LINE_ID"=>($data->db_addr_line_id), "DB_ADDRLINE_NO"=>($data->db_addrline_no) );
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Addresses", "DB_ADDRESS_LINE", $keys, $excludes );
		$upd_journal->logOneLine("updated a line of address [" . $data->db_addr_line_id . ", " . $data->db_addrline_no . ", " . $data->db_addr_line . "] successfully");
		
		return "OK";
	}
    
	public function deleteLine( $data )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from DB_ADDRESS_LINE 
			where 
				DB_ADDR_LINE_ID = :addr_line_id
				and DB_ADDRLINE_NO = :addrline_no
		";
		$sql['sql_data'] = array( $data->db_addr_line_id, $data->db_addrline_no );
		
        $comment_res = $mydb->delete($sql);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the address line succeeded!!!",ADDRESSES);

		// write journal
		$keys = array ( "DB_ADDR_LINE_ID"=>($data->db_addr_line_id), "DB_ADDRLINE_NO"=>($data->db_addrline_no) );
		$excludes = array ();
		$del_journal = new UpdateJournalClass( "Addresses", "DB_ADDRESS_LINE", $keys, $excludes );
		$del_journal->logOneLine("deleted a line of address [" . $data->db_addr_line_id . ", " . $data->db_addrline_no . ", " . $data->db_addr_line . "] successfully");
		
		return "OK";
	}

  
    
	public function create( $data )
	{
		// add address header
		$res = $this->createMain( $data );
		if ( $res != "OK" )
		{
			return "ERROR";
		}
		
		// add address line
		if ( is_array($data->addr_items) === FALSE )
		{
			$data->addr_items = (array)($data->addr_items);
		}
		if( $data->has_items=="1" && sizeof($data->addr_items) > 0 )
		{
			for($i=0; $i<sizeof($data->addr_items); $i++)
			{      
				$line_item = $data->addr_items[$i];
				$lineResult = $this->createLine( $line_item );
				if ( $lineResult != "OK" )
				{
					return $lineResult;
				}
			}
		}
		
        return "OK";
	}
    
	public function update( $data )
	{
		// should not update the address header
		
		// update address line
		if ( is_array($data->addr_items) === FALSE )
		{
			$data->addr_items = (array)($data->addr_items);
		}
		if( $data->has_items=="1" && sizeof($data->addr_items) > 0 )
		{
			for($i=0; $i<sizeof($data->addr_items); $i++)
			{   
				$line_item = $data->addr_items[$i];
				if ( $data->actions[$i]->option == "1" )
				{ // insert new address line
					$lineResult = $this->createLine( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
				}
				else
				if ( $data->actions[$i]->option == "2" )
				{ // update existing address line
					$lineResult = $this->updateLine( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
				}
				else
				if ( $data->actions[$i]->option == "3" )
				{ // delete existing address line
					$lineResult = $this->deleteLine( $line_item );
					if ( $lineResult != "OK" )
					{
						return $lineResult;
					}
				}
				else
				{ // do nothing
					continue; 
				}
			
			}
		}
		
        return "OK";
	}
    
	public function delete( $data )
	{
		// delete all address lines
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			delete from DB_ADDRESS_LINE 
			where 
				DB_ADDR_LINE_ID = :addr_line_id
		";
		$sql['sql_data'] = array( $data->db_address_key );
		
        $comment_res = $mydb->delete($sql, OCI_NO_AUTO_COMMIT);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
        logMe("Delete the address lines succeeded!!!",ADDRESSES);
		
		// delete address header
		$res = @$this->deleteMain( $data );
		if ( $res != "OK" )
		{
			return "ERROR";
		}
		
		return "OK";
	}
    

	public function updateAddressTemplate( $value )
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "UPDATE SITE_CONFIG SET CONFIG_VALUE=:cfg_value WHERE CONFIG_KEY='SITE_ADDRESS_TEMPLATE' ";
		$sql['sql_data'] = array( $value );
		
        $comment_res = $mydb->update($sql);
        logMe("Update the address template succeeded!!!",ADDRESSES);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
		
		return "OK";
	}
	
	//get the company address code by company code
    public function getCompanyAddress($cmpy_code)
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "SELECT CMPY_ADDR FROM COMPANYS WHERE CMPY_CODE=:cmpy_code";
		$sql['sql_data'] = array( $cmpy_code );
		
        $rows = $mydb->query($sql, "N");

		if ( is_null($rows[0]->CMPY_ADDR) == TRUE || $rows[0]->CMPY_ADDR=="" )
		{
			$address = "";
		}
		else
		{
			$address = $rows[0]->CMPY_ADDR;
		}
		
		return($address);
    }
	
	//set the company address code by company code
    public function setCompanyAddress($cmpy_code, $cmpy_addr)
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "UPDATE COMPANYS SET CMPY_ADDR=:cmpy_addr WHERE CMPY_CODE=:cmpy_code ";
		$sql['sql_data'] = array( $cmpy_addr, $cmpy_code );
		
        $comment_res = $mydb->update($sql);
        logMe("Update the company address succeeded!!!",ADDRESSES);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
		
		return "OK";
    }
	
}
?>