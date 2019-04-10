<?php
//require_once 'Zend/Session/Namespace.php';
class SetSessionService {


	public function __construct(){
		
		session_start();
	
	}
	
	public function setSessionVar($key, $value)
	{

		$_SESSION['__AMF'][$key] = $value;
		
		return $_SESSION['__AMF'][$key];
	}
	
	public function getSessionVar($key)
	{
		$myvalue = "";
		if ( isset($_SESSION['__AMF']) && isset($_SESSION['__AMF'][$key]) )
		{
			$myvalue = $_SESSION['__AMF'][$key];
		}
		else
		{
			return $myvalue ;
		}
		return $myvalue;
	}

}
/* Following are the testing methods 
$mysession = new SetSessionService();
$mysession->setSessionVar('userstime', strtotime("now"));
echo ($mysession->getSessionVar('userstime'));*/
?>