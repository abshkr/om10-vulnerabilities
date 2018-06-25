<?php
require_once 'Zend/Session/Namespace.php';
class SetSessionService {

	public function setSessionVar($key, $value){
		$namespace = new Zend_Session_Namespace(); // default namespace
		/* This is for testing just leave it hear */
		$namespace->curtime = strtotime("now");
		$namespace->$key = $value;

	}
	
	public function getSessionVar($key){
		$myvalue = "";
		$namespace = new Zend_Session_Namespace(); // default namespace
		if (!isset($namespace->$key)) {
			return $myvalue ;
		}
		else
		{
			$myvalue = $namespace->$key;
		}
		return $myvalue;
	}

}
/* Following are the testing methods 
$mysession = new SetSessionService();
$mysession->setSessionVar('userstime', strtotime("now"));
echo ($mysession->getSessionVar('userstime'));*/
