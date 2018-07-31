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
	
    include "TankviewServiceMockup.php";
    //include "./amfservices/core/services/TankviewServiceMockup.php";
    //include "./amfservices/core/services/TankviewService.php";
    //include "TankviewService.php";
    include "helper.php";
    $obj = new TankviewServiceMockup();
    //$obj = new TankviewService();
	
    $funcName = getFuncName();
    $tmp = array();

    if ($funcName <> null) {
        //$tmp = json_decode($obj->$funcName(), true);
        switch ($funcName) {
            case "lookupTankStatusTypes":
				// public function lookupTankStatusTypes($caseType='L', $jsonFlag=1)
                $key = 'tank_status_id';
                $val = getParamVal($key);
				$tmp = json_decode($obj->$funcName(), true);
				$tmp = filter($tmp, $key, $val);
                echo json_encode($tmp);
                break;
            case "lookupTankGaugeTypes": 
				// public function lookupTankGaugeTypes($caseType='L', $jsonFlag=1)
                $key = 'gauge_method_id';
                $val = getParamVal($key);
				$tmp = json_decode($obj->$funcName(), true);
                $tmp = filter($tmp, $key, $val);
                echo json_encode($tmp);
                break;
            case "lookupTankLevelAlarms":
				// public function lookupTankLevelAlarms($caseType='L', $jsonFlag=1)
                $key = 'level_alarms_id';
                $val = getParamVal($key);
				$tmp = json_decode($obj->$funcName(), true);
				$tmp = filter($tmp, $key, $val);
                echo json_encode($tmp);
                break;
            case "lookupTankAreas":
				// public function lookupTankAreas($caseType='L', $jsonFlag=1)
                $key = 'area_k';
                $val = getParamVal($key);
				$tmp = json_decode($obj->$funcName(), true);
				$tmp = filter($tmp, $key, $val);
                echo json_encode($tmp);
                break;
            case "lookupTankNames":
				// public function lookupTankNames($tankGroup="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'tank_code';
                $key2 = 'tank_group';
                $key3 = 'tank_base';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
                $val3 = getParamVal($key3);
				$tmp = json_decode($obj->$funcName( $val2, $val3 ), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
				$tmp = filter($tmp, $key3, $val3);
                echo json_encode($tmp);
                break;
            case "lookupTankGroups":
				// lookupTankGroups($tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'tank_group';
                $key2 = 'tank_code';
                $key3 = 'tank_base';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
                $val3 = getParamVal($key3);
				$tmp = json_decode($obj->$funcName( $val2, $val3 ), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filterByPartialMatch($tmp, 'tgr_tanklist', $val2, ', ');
				//$tmp = filter($tmp, $key2, $val2);
				$tmp = filter($tmp, $key3, $val3);
                echo json_encode($tmp);
                break;
            case "lookupTankProducts":
				// lookupTankProducts($category=-1, $tankCode="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'base_code';
                $key2 = 'baseclass_code';
                $key3 = 'tank_code';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
                $val3 = getParamVal($key3);
				$tmp = json_decode($obj->$funcName( $val2, $val3 ), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
				$tmp = filterByPartialMatch($tmp, 'base_tank_list', $val3, ', ');
                echo json_encode($tmp);
                break;
            case "lookupTankProductInventory":
            case "lookupTankProductInventory_RT":
				// lookupTankProductInventory($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
 				// lookupTankProductInventory_RT($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
               $key1 = 'tank_group';
                $key2 = 'tank_code';
                $key3 = 'tank_base';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
                $val3 = getParamVal($key3);
				$tmp = json_decode($obj->$funcName( $val1, $val2, $val3 ), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
				$tmp = filter($tmp, $key3, $val3);
                echo json_encode($tmp);
                break;
            case "lookupTankList":
            case "lookupTankList_RT":
				// lookupTankList($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
				// lookupTankList_RT($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'tank_group';
                $key2 = 'tank_code';
                $key3 = 'tank_base';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
                $val3 = getParamVal($key3);
				$tmp = json_decode($obj->$funcName( $val1, $val2, $val3 ), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
				$tmp = filter($tmp, $key3, $val3);
                echo json_encode($tmp);
                break;
            case "lookupTankItems":
            case "lookupTankItems_RT":
				// lookupTankItems($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
				// lookupTankItems_RT($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'tank_group';
                $key2 = 'tank_code';
                $key3 = 'tank_base';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
                $val3 = getParamVal($key3);
				$tmp = json_decode($obj->$funcName( $val1, $val2, $val3 ), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
				$tmp = filter($tmp, $key3, $val3);
                echo json_encode($tmp);
                break;
            case "lookupBayTankProducts":
				// public function lookupBayTankProducts($bay_code="-1", $arm_code="-1", $mtr_code="-1", $inj_code="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'bay_code';
                $key2 = 'arm_code';
                $key3 = 'meter_code';
                $key4 = 'injector_code';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
                $val3 = getParamVal($key3);
                $val4 = getParamVal($key4);
				$tmp = json_decode($obj->$funcName($val1, $val2, $val3, $val4), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
				$tmp = filter($tmp, $key3, $val3);
				$tmp = filter($tmp, $key4, $val4);
                echo json_encode($tmp);
                break;
            case "lookupPipeNodeList":
				// public function lookupPipeNodeList($bay_code="-1", $arm_code="-1", $mtr_code="-1", $bay_type="-1", $arm_type="-1", $blend_type="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'bay_code';
                $key2 = 'arm_code';
                $key3 = 'meter_code';
                $key4 = 'bay_type_code';
                $key5 = 'arm_type_code';
                $key6 = 'arm_blendtype_code';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
                $val3 = getParamVal($key3);
                $val4 = getParamVal($key4);
                $val5 = getParamVal($key5);
                $val6 = getParamVal($key6);
				//echo print_r($obj->$funcName($val1, $val2, $val3, $val4, $val5, $val6), TRUE);
				$tmp = json_decode($obj->$funcName($val1, $val2, $val3, $val4, $val5, $val6), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
				$tmp = filter($tmp, $key3, $val3);
				$tmp = filter($tmp, $key4, $val4);
				$tmp = filter($tmp, $key5, $val5);
				$tmp = filter($tmp, $key6, $val6);
                echo json_encode($tmp);
                break;
            case "exportTankItems":
				// exportTankItems($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'tank_group';
                $key2 = 'tank_code';
                $key3 = 'tank_base';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
                $val3 = getParamVal($key3);
				$tmp = json_decode($obj->$funcName( $val1, $val2, $val3 ), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
				$tmp = filter($tmp, $key3, $val3);
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
