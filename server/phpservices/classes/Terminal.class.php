<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');

/* define the module name for calling logMe() to output */
if(!defined('TERMCLASS')) define('TERMCLASS','Terminal.class');

class TerminalClass
{
	public function getTerminal($term_address)
	{
		$mydb = DB::getInstance();
		
		$sql = "SELECT * FROM TERMINAL WHERE TERM_ADDR='$term_address'";
		$rows = $mydb->query($sql);
		return (prepareForAMF($rows, array(0 => "terminal")));
	}
	
	public function getAll()
	{
		$mydb = DB::getInstance();
		
		$sql = "SELECT * FROM TERMINAL";
		$rows = $mydb->query($sql);
		return (prepareForAMF($rows, array(0 => "terminal")));
	}

	public function getDBAddress()
	{
		$mydb = DB::getInstance();
		$sql = "SELECT * FROM DB_ADDRESS";
		$rows = $mydb->query($sql);
		return (prepareForAMF($rows, array(0 => "DB_Address")));
	}
	
	
	public function getPaged($offset,$tot,$filter='',$sort='')
	{
        $mydb = DB::getInstance();
		
		 if($key=='') $key = getTableKey("terminal");
        
        if($sort!='')$sort="ORDER BY $sort";
        
        $sql="SELECT * FROM(
                SELECT res.*, ROW_NUMBER() over ($sort) RN
                FROM(SELECT * FROM terminal $filter) res
             )
             where RN between ".($offset+1)." and ".($offset+$tot)." $sort";        
        
        $rows = $mydb->query($sql);
        //XarrayEncodingConversion($rows);
        return (prepareForAMF($rows, array(0 => "terminal")));
    }
	
}