<?php
require_once(dirname(__FILE__) . '/../classes/HttpSession.class.php');

class HttpSessionService 
{
	public function killSessions($user, $curr_session_id)
	{
		
        $curr_session_id = $_SESSION['SESSION'];
        $obj = new HttpSessionClass();
        $res = $obj->killSessions($user, $curr_session_id);
        return $res;
		
	}

	public function getSessionStatus($user, $curr_session_id)
	{
        $obj = new HttpSessionClass();
        $res = $obj->getSessionStatus($user, $curr_session_id);
        return $res;
		
	}
}

?>
