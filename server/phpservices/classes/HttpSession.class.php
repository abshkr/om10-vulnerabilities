<?php
require_once(dirname(__FILE__) . '/../bootstrap.php');
require_once(dirname(__FILE__) . '/../classes/Thunk.class.php');

/* define the module name for calling logMe() to output */
if(!defined('HTTPSESSIONCLASS')) define('HTTPSESSIONCLASS','Session.class');

class HttpSessionClass{
    
    public function HttpSessionClass(){
        session_start();
        if(defined('HOST')) {
            $this->host = HOST;
        }
        else{
            $this->host ="localhost";
        }
        
        if(defined('CGIDIR')){
            $this->cgi_logout = CGIDIR . "logout.cgi";
        }
        else{
            $this->cgi_logout = "cgi-bin/en/logout.cgi";
        }
    }

    /*public function getMaxSessionsCount(){
        $mydb = DB::getInstance();
        $sql="SELECT config_value MAX FROM SITE_CONFIG WHERE config_key='URBAC_SESSION_PER_USER'";
        $rows = $mydb->query($sql);
        return $rows[0]->MAX;
    }*/

    public function getSessions($user){
        $mydb = DB::getInstance();
        $sql="SELECT sess_id SESSION_ID FROM HTTP_SESSION_TRACE WHERE per_code='$user' ORDER BY last_active ASC";
        $rows = $mydb->query($sql);
        return $rows;
    }

    public function getActiveSessions($user, $curr_session_id){
        $mydb = DB::getInstance();
        $sql="SELECT sess_id SESSION_ID FROM HTTP_SESSION_TRACE WHERE per_code='$user' and sess_id='$curr_session_id'";
        $rows = $mydb->query($sql);
        return $rows;
    }

    public function killSessions($user, $curr_session_id){
        logMe("Info: ++++++kill old sessions++++++",HTTPSESSIONCLASS);
        //$maxSessCnt = $this->getMaxSessionsCount();
        //logMe("Info: session limitation=".$maxSessCnt,HTTPSESSIONCLASS);

            $curr_session_id = $this->oracle_escape_string($_SESSION['SESSION']);
            $user            = $this->oracle_escape_string($_SESSION['PERCODE']);

        
        $rows = $this->getSessions($user);
        logMe("Info: session count=".sizeof($rows),HTTPSESSIONCLASS);
        
        for ($loop = 0; $loop < sizeof($rows); $loop++)
        {
            $sessid = $rows[$loop]->SESSION_ID;
            if ($sessid == $curr_session_id) continue;
            $fields = array(
                'sess_id'=>urlencode($sessid),
                'usr'=>urlencode($user),
            );
            $thunkObj = new Thunk($this->host, $this->cgi_logout, $fields);
            $thunkObj->writeToClient($this->cgi_logout);
    
            $response = $thunkObj->read();
            logMe($response,HTTPSESSIONCLASS);
            if($response==''){
                logMe("Logout CGI response was empty",HTTPSESSIONCLASS);
                return "ERROR_EMPTY";
            }else{
                $patternSuccess = "logon.html";  // <-fixed message?
                $isFound = strstr($response, $patternSuccess);
                if ($isFound == false) {
                    logMe("Logout failed!!!",HTTPSESSIONCLASS);
                    return "ERROR";
                }
                logMe("CGI logout succeeded!!! Session no.".($loop+1)." killed.",HTTPSESSIONCLASS);
            }
        }
        return "OK";
    }

    public function getSessionStatus($user, $curr_session_id){
        $rows = $this->getActiveSessions($user, $curr_session_id);
        logMe("Info: session id= ".$curr_session_id." session count=".sizeof($rows),HTTPSESSIONCLASS);
        
        if (sizeof($rows) > 0) {
            return 1;  // session active
        }
        else {
            return 0;  // session inactive
        }
    }

    private function oracle_escape_string($str){
        $str = str_replace("'", "\'", $str);
        $str = str_replace(";", "", $str);
        return str_replace("\"", "\\\"", $str);
    }
}
?>