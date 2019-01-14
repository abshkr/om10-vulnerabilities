<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('DANGEROUSGOODS')) define('DANGEROUSGOODS','DangerousGoodsService.class');

class DangerousGoodsService
{
    var $mylang='ENG';
	var $myview="
			select 
				dg.MATERIAL						as DG_MATERIAL
				, dg.ADR_DESC1					as DG_ADR_DESC1
				, dg.ADR_DESC2					as DG_ADR_DESC2
				, dg.ADR_DESC3					as DG_ADR_DESC3
				, dg.ADR_NAME					as DG_ADR_NAME
				, dg.ADR_TYPE					as DG_ADR_TYPE
				, dg.ADR_FAREKLASSE				as DG_ADR_FAREKLASSE
				, dg.PROTECT_FREEZE				as DG_PROTECT_FREEZE
				, dg.CERTIFIC_OF_ANALYSIS		as DG_CERTIFIC_OF_ANALYSIS
				, dg.ADDITIONAL_TXT				as DG_ADDITIONAL_TXT
				, dg.PLACARD_NOTATION1			as DG_PLACARD_NOTATION1
				, dg.PLACARD_NOTATION2			as DG_PLACARD_NOTATION2
				, dg.PLACARD_NOTATION3			as DG_PLACARD_NOTATION3
				, dg.PLACARD_NOTATION4			as DG_PLACARD_NOTATION4
				, dg.STCC_CODE					as DG_STCC_CODE
			from 
				DANGEROUS_GOODS 			dg
			where 
				1 = 1
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
            $this->cgi = CGIDIR . "gantry/hazchem_mod.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/gantry/hazchem_mod.cgi";
        }
		
		
	}
	
	public function getData()
	{
		$sql = "SELECT * FROM ( " . $this->myview . " ) DGVIEW ";
			
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
		else $sort="ORDER BY DG_MATERIAL";
		
		$query = "SELECT * FROM ( " . $this->myview . " ) DGVIEW ";
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

    public function isDangerousGoodsKeyUsed( $dg_id )
	{
		$sql = array();
        $sql['sql_text'] = "select * from DANGEROUS_GOODS where MATERIAL=:dg_id ";
		$sql['sql_data'] = array( $dg_id );
		
        $mydb = DB::getInstance();
		// get the total number of the records
		$count = $mydb->count( $sql );
		
        return $count;
   }

	
    public function create($data)
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			insert into DANGEROUS_GOODS
			( 
				MATERIAL				
				, ADR_DESC1				
				, ADR_DESC2				
				, ADR_DESC3				
				, ADR_NAME				
				, ADR_TYPE				
				, ADR_FAREKLASSE		
				, PROTECT_FREEZE		
				, CERTIFIC_OF_ANALYSIS	
				, ADDITIONAL_TXT		
				, PLACARD_NOTATION1		
				, PLACARD_NOTATION2		
				, PLACARD_NOTATION3		
				, PLACARD_NOTATION4		
				, STCC_CODE				
			) 
			values 
			( 
				:dg_material
				, :dg_adr_desc1
				, :dg_adr_desc2
				, :dg_adr_desc3
				, :dg_adr_name
 				, :dg_adr_type
				, :dg_adr_fareklasse
				, :dg_protect_freeze
				, :dg_certific_of_analysis
				, :dg_additional_txt
				, :dg_placard_notation1
				, :dg_placard_notation2
				, :dg_placard_notation3
 				, :dg_placard_notation4
				, :dg_stcc_code
			) 
		";

		$sql['sql_data'] = array( $data->dg_material, $data->dg_adr_desc1, $data->dg_adr_desc2, $data->dg_adr_desc3, $data->dg_adr_name, $data->dg_adr_type, $data->dg_adr_fareklasse, $data->dg_protect_freeze, $data->dg_certific_of_analysis, $data->dg_additional_txt, $data->dg_placard_notation1, $data->dg_placard_notation2, $data->dg_placard_notation3, $data->dg_placard_notation4, $data->dg_stcc_code );
		
        $res = $mydb->insert($sql);
		
        if ($res == RETURN_OK)
        {
			$keys = array ("MATERIAL"=>($data->dg_material));
			$excludes = array ();
			$ins_journal = new UpdateJournalClass( "Dangerous Goods", "DANGEROUS_GOODS", $keys, $excludes );
			$ins_journal->logOneLine("created a dangerous goods [" . $data->dg_material . " - " . $data->dg_adr_desc1 . "] successfully");
        }
		
        if ($res == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
		
    }
    
    public function update($data)
	{
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// Before the updates                                        ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$keys = array ("MATERIAL"=>($data->dg_material));
		$excludes = array ();
		$upd_journal = new UpdateJournalClass( "Dangerous Goods", "DANGEROUS_GOODS", $keys, $excludes );
		$upd_journal->setOldValues( $upd_journal->getRecordValues() );
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "
			update DANGEROUS_GOODS set 
				ADR_DESC1					= :dg_adr_desc1
				, ADR_DESC2					= :dg_adr_desc2
				, ADR_DESC3					= :dg_adr_desc3
				, ADR_NAME					= :dg_adr_name
				, ADR_TYPE					= :dg_adr_type
				, ADR_FAREKLASSE				= :dg_adr_fareklasse
				, PROTECT_FREEZE				= :dg_protect_freeze
				, CERTIFIC_OF_ANALYSIS		= :dg_certific_of_analysis
				, ADDITIONAL_TXT				= :dg_additional_txt
				, PLACARD_NOTATION1			= :dg_placard_notation1
				, PLACARD_NOTATION2			= :dg_placard_notation2
				, PLACARD_NOTATION3			= :dg_placard_notation3
				, PLACARD_NOTATION4			= :dg_placard_notation4
				, STCC_CODE					= :dg_stcc_code
			where 
				MATERIAL=:dg_material
		";
		$sql['sql_data'] = array( $data->dg_adr_desc1, $data->dg_adr_desc2, $data->dg_adr_desc3, $data->dg_adr_name, $data->dg_adr_type, $data->dg_adr_fareklasse, $data->dg_protect_freeze, $data->dg_certific_of_analysis, $data->dg_additional_txt, $data->dg_placard_notation1, $data->dg_placard_notation2, $data->dg_placard_notation3, $data->dg_placard_notation4, $data->dg_stcc_code, $data->dg_material );
		
        $res = $mydb->update($sql);
		
        if ($res == RETURN_OK)
        {
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// new module to log any changes of any fields on any screen ////////////////////////
		////////////////////// After the updates                                         ////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		$upd_journal->setNewValues( $upd_journal->getRecordValues() );
		$upd_journal->log();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
        }
		
        if ($res == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
    }
    
    public function delete($data)
	{
		$dg_material = $data->dg_material;
        $mydb = DB::getInstance();        
        
		$csql = array();
		$csql['sql_text'] = "select * from DG_LINK where DG_LINK_ID=:dg_material";
		$csql['sql_data'] = array( $dg_material );
        if( sizeof($mydb->query($csql))>0 )
		{
			return "ERROR"; 
		}

		$sql = array();
		$sql['sql_text'] = "delete from DANGEROUS_GOODS where MATERIAL=:dg_material";
		$sql['sql_data'] = array( $dg_material );
		$res = $mydb->delete($sql);
		
        if ($res == RETURN_OK)
        {
			$keys = array ("MATERIAL"=>($data->dg_material));
			$excludes = array ();
			$del_journal = new UpdateJournalClass( "Dangerous Goods", "DANGEROUS_GOODS", $keys, $excludes );
			$del_journal->logOneLine("deleted a dangerous goods [" . $data->dg_material . " - " . $data->dg_adr_desc1 . "] successfully");
        }
		
        if ($res == RETURN_OK)
        {
			return "OK";
        }
		else
		{
			return "ERROR";
		}
    } 
	
}
?>