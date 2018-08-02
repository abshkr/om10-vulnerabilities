<?php
require_once( 'bootstrap.php' );
require_once( 'Thunk.class.php' );
require_once( 'Journal.class.php' );

/* define the module name for calling logMe() to output */
if(!defined('PERSONNELSERVICE')) define('PERSONNELSERVICE','[AMF]PersonnelService.class');

class PersonnelService
{
    
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
            $this->cgi = CGIDIR . "access_ctrl/personnel.cgi";
        }
        else{
            $this->cgi ="cgi-bin/en/access_ctrl/personnel.cgi";
        }
    }
	
	//get the personnel comment by personnel code
    public function getPersonnelComment($per_code)
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "SELECT PER_COMMENTS FROM GUI_PERSONNEL WHERE PER_CODE=:per_code";
		$sql['sql_data'] = array( $per_code );
		
        $rows = $mydb->query($sql, "N");

		if ( is_null($rows[0]->PER_COMMENTS) == TRUE || $rows[0]->PER_COMMENTS=="" )
		{
			$comments = "";
		}
		else
		{
			$comments = $rows[0]->PER_COMMENTS;
		}
		
		return($comments);
    }
	
	//set the personnel comment by personnel code
    public function setPersonnelComment($per_code, $per_comments)
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "UPDATE PERSONNEL SET PER_COMMENTS=:per_comments WHERE PER_CODE=:per_code ";
		$sql['sql_data'] = array( $per_comments, $per_code );
		
        $comment_res = $mydb->update($sql);
        logMe("Update the personnel comments succeeded!!!",PERSONNELSERVICE);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
		
		return "OK";
    }

    //get the personnel comment by personnel code
    public function getPersonnelEmail($per_code)
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "SELECT PER_EMAIL FROM GUI_PERSONNEL WHERE PER_CODE=:per_code";
		$sql['sql_data'] = array( $per_code );
		
        $rows = $mydb->query($sql, "N");

		if ( is_null($rows[0]->PER_EMAIL) == TRUE || $rows[0]->PER_EMAIL=="" )
		{
			$comments = "";
		}
		else
		{
			$comments = $rows[0]->PER_EMAIL;
		}
		
		return($comments);
    }
	
	//set the personnel comment by personnel code
    public function setPersonnelEmail($per_code, $per_email)
	{
        $mydb = DB::getInstance();
		$sql = array();
        $sql['sql_text'] = "UPDATE PERSONNEL SET PER_EMAIL=:per_email WHERE PER_CODE=:per_code ";
		$sql['sql_data'] = array( $per_email, $per_code );
		
        $comment_res = $mydb->update($sql);
        logMe("Update the personnel email succeeded!!!",PERSONNELSERVICE);
		
		if ( $comment_res != RETURN_OK )
		{
			return "ERROR";
		}
		
		return "OK";
    }
	
}
?>