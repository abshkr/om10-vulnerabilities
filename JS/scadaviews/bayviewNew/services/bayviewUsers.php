<?php
	session_start();
	
    header('Access-Control-Allow-Origin: *');
    //header('Content-Type: application/json');
    header('Content-Type: text/html;charset=utf-8');

	if ( ! (isset($_SESSION['SESSION']) && isset($_SESSION['SESSION_OBJECT'])) )
	{
		//echo "No Valid Session!";
		//return;
	}
	
    //include "./amfservices/core/services/BayviewAuth.php";
    include "BayviewAuth.php";
    include "helper.php";
    $obj = new BayviewAuth();
	
    $funcName = getFuncName();
    $tmp = array();

    if ($funcName <> null) {
        //$tmp = json_decode($obj->$funcName(), true);
        switch ($funcName) {
            case "getSessionStatus":       
				//  public function getSessionStatus()
                //$key = 'bay_type_code';
                //$val = getParamVal($key);
				//$tmp = json_decode($obj->$funcName(), true);
				$tmp = $obj->$funcName();
				//$tmp = filter($tmp, $key, $val);
                echo json_encode($tmp);
                break;
            case "login":
				//  public function login($username, $password, $rev_pass, $langcode='ENG')
				// bayviewUsers.php?func=login&lang=ENG或CHN&user=用户名$psw=无法解密的加密后密码&hash=可以解密的加密后密码
                $key1 = 'lang';
                $key2 = 'user';
                $key3 = 'psw';
                $key4 = 'hash';
                $val1 = getParamValByPost($key1);
                $val2 = getParamValByPost($key2);
                $val3 = getParamValByPost($key3);
                $val4 = getParamValByPost($key4);
				//echo print_r($obj->$funcName( $val2, $val1, $val3 ),TRUE);
				$tmp = $obj->$funcName($val2, $val3, $val4, $val1);
				//$tmp = filter($tmp, $key1, $val1);
				//$tmp = filter($tmp, $key2, $val2);
				//$tmp = filterByPartialMatch($tmp, 'bay_bases', $val3, '|');
                echo json_encode($tmp);
                break;
            default:
                break;
        }
    }
    else {
        $res = array(
            "errMsg" => "No such function name!"
        );
        echo json_encode($res);
    }
?>
