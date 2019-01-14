<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

if(!defined('EQUIPTYPESCLASS')) define('EQUIPTYPESCLASS','EquipmentTypeService');

class EquipmentTypeService
{
	var $username;
	var $password;
	var $server;	
	var $connect;
    var $mylang='ENG';
	
	public function __construct()
	{
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
            $this->cgi = CGIDIR . "load_scheds/equip_types.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/load_scheds/equip_types.cgi";
        }
		
	}

    public function getMaxNumberOfSeals()
	{
        $mydb = DB::getInstance();
        $sql="
			select CONFIG_VALUE from SITE_CONFIG where CONFIG_KEY='SITE_MAX_SEALS_PER_CMPT' 
			";
        $rows = $mydb->query($sql, "N");
        return ((integer)$rows[0]->CONFIG_VALUE);
    }

    public function updateCompartments($comp)
	{        
		// update CMPT_N_SEALS
		logMe("Info: Update the number of seals for each compartment.",EQUIPTYPESCLASS);
		$mydb = DB::getInstance();
        for( $i=0; $i<sizeof($comp); $i+=1 )
		{
			$n_seals = urlencode($comp[$i]->cmpt_n_seals);
			if ( $n_seals == "" )
			{
				$n_seals = 0;
			}
			$cmpt_no = urlencode($comp[$i]->cmpt_no);
			$cmpt_etyp = urlencode($comp[$i]->cmpt_etyp);
			
			//$sql = "UPDATE COMPARTMENT SET CMPT_N_SEALS=". $n_seals . " WHERE CMPT_ETYP=". $cmpt_etyp . " and CMPT_NO=". $cmpt_no;
			$sql = array();
			$sql['sql_text'] = "UPDATE COMPARTMENT SET CMPT_N_SEALS=:n_seals WHERE CMPT_ETYP=:cmpt_etyp and CMPT_NO=:cmpt_no";
			$sql['sql_data'] = array( $n_seals, $cmpt_etyp, $cmpt_no );
		
			$updresult = $mydb->update($sql);
			
			if ( $updresult == RETURN_OK )
			{
				logMe("Info: Update the number of seals for compartment ".($cmpt_no),EQUIPTYPESCLASS);
			}
			else
			{
				logMe("Info: Failed to update the number of seals for compartment ".($cmpt_no),EQUIPTYPESCLASS);
				return "ERROR";
			}
        }
        return "OK";
    }
	
	public function updateEqptTypeCategory($type_id, $type_catg) 
	{
        $mydb = DB::getInstance();
		
 		$sql = array();
        $sql['sql_text'] = "
			update EQUIP_TYPES 
			set 
				ETYP_CATEGORY = :etyp_catg 
			where 
				ETYP_ID=:etyp_id 
		";
		$sql['sql_data'] = array( $type_catg, $type_id );
		
        $result = $mydb->update($sql);
		
        if ($result == RETURN_OK)
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