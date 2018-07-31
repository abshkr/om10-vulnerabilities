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
	
    //include "BayviewServiceMockup.php";
    //include "./amfservices/core/services/BayviewServiceMockup.php";
    //include "./amfservices/core/services/BayviewService.php";
    include "BayviewService.php";
    include "helper.php";
    //$obj = new BayviewServiceMockup();
    $obj = new BayviewService();

	//echo $obj->lookupScadaData("data_config.json", "BAY01");
	//return;
	
    $funcName = getFuncName();
    $tmp = array();

    if ($funcName <> null) {
        //$tmp = json_decode($obj->$funcName(), true);
        switch ($funcName) {
            case "lookupLoadingBayTypes":       // 发油台类型
				// public function lookupLoadingBayTypes($caseType='L', $jsonFlag=1)
                $key = 'bay_type_code';
                $val = getParamVal($key);
				$tmp = json_decode($obj->$funcName(), true);
				$tmp = filter($tmp, $key, $val);
                echo json_encode($tmp);
                break;
            case "lookupLoadingArmTypes":       // 鹤位类型
				// public function lookupLoadingArmTypes($caseType='L', $jsonFlag=1)
                $key = 'arm_type_code';
                $val = getParamVal($key);
				$tmp = json_decode($obj->$funcName(), true);
                $tmp = filter($tmp, $key, $val);
                echo json_encode($tmp);
                break;
            case "lookupBlendTypes":            // 调和类型
				// public function lookupBlendTypes($caseType='L', $jsonFlag=1)
                $key = 'blend_type_code';
                $val = getParamVal($key);
				$tmp = json_decode($obj->$funcName(), true);
				$tmp = filter($tmp, $key, $val);
                echo json_encode($tmp);
                break;
            case "lookupLoadingBayCodes":       // 发油台基本信息
				// public function lookupLoadingBayCodes($type="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'bay_code';
                $key2 = 'bay_type_code';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
				$tmp = json_decode($obj->$funcName( $val2 ), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
                echo json_encode($tmp);
                break;
            case "lookupBaseProducts":          // 基础油品
				// public function lookupBaseProducts($category=-1, $caseType='L', $jsonFlag=1)
                $key1 = 'base_code';
                $key2 = 'baseclass_code';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
				$tmp = json_decode($obj->$funcName( $val2 ), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
                echo json_encode($tmp);
                break;
            case "lookupLoadingBayList":
				// public function lookupLoadingBayList($bay_type="-1", $bay_code="-1", $base_code="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'bay_code';
                $key2 = 'bay_type_code';
                $key3 = 'base_code';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
                $val3 = getParamVal($key3);
				//echo print_r($obj->$funcName( $val2, $val1, $val3 ),TRUE);
				$tmp = json_decode($obj->$funcName($val2, $val1, $val3), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
				$tmp = filterByPartialMatch($tmp, 'bay_bases', $val3, '|');
                echo json_encode($tmp);
                break;
            case "lookupLoadingArmList":
				// public function lookupLoadingArmList($bay_code="-1", $arm_code="-1", $arm_type="-1", $blend_type="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'arm_code';
                $key2 = 'arm_type_code';
                $key3 = 'arm_blendtype_code';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
                $val3 = getParamVal($key3);
				$tmp = json_decode($obj->$funcName('-1', $val1, $val2, $val3), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
				$tmp = filter($tmp, $key3, $val3);
                echo json_encode($tmp);
                break;
            case "lookupLoadingMeterList":
				// public function lookupLoadingMeterList($mtr_code="-1", $usg_type="-1", $mtr_type="-1", $qty_type="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'meter_code';
                $key2 = 'meter_type';
                $key3 = 'meter_qtytype';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
                $val3 = getParamVal($key3);
				$tmp = json_decode($obj->$funcName($val1, '-1', $val2, $val3), true);
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
            case "lookupLoadingTrip":
				// public function lookupLoadingTrip($trip_no, $caseType='L', $jsonFlag=1)
                $key1 = 'trip_no';
                $val1 = getParamVal($key1);
				$tmp = json_decode($obj->$funcName( $val1 ), true);
				$tmp = filter($tmp, "load_number", $val1);
                echo json_encode($tmp);
                break;
            case "lookupLoadingCompartments":
				// public function lookupLoadingCompartments($supplier, $trip_no, $caseType='L', $jsonFlag=1)
                $key1 = 'supplier';
                $key2 = 'trip_no';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
				$tmp = json_decode($obj->$funcName( $val1, $val2 ), true);
				$tmp = filter($tmp, "cmpt_supplier", $val1);
				$tmp = filter($tmp, "cmpt_tripno", $val2);
                echo json_encode($tmp);
                break;
            case "lookupLoadingTanker":
				// public function lookupLoadingTanker($trip_no, $caseType='L', $jsonFlag=1)
                $key1 = 'trip_no';
                $val1 = getParamVal($key1);
				$tmp = json_decode($obj->$funcName( $val1 ), true);
				$tmp = filter($tmp, "load_number", $val1);
                echo json_encode($tmp);
                break;
            case "lookupLoadingBayItemList":
				// public function lookupLoadingBayItemList($bay_code="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'bay_code';
                $key2 = 'bay_type_code';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
				$tmp = json_decode($obj->$funcName( $val1 ), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
                echo json_encode($tmp);
                break;
            case "lookupLoadingBayInterlocks":
				// public function lookupLoadingBayInterlocks($bay_code)
                $key1 = 'bay_code';
                $val1 = getParamVal($key1);
				$tmp = json_decode($obj->$funcName( $val1 ), true);
				$tmp = filter($tmp, $key1, $val1);
                echo json_encode($tmp);
                break;
			// Following is for real-time data service
            case "lookupLoadingBayInterlocks_RT":
				// public function lookupLoadingBayInterlocks_RT($bay_code)
                $key1 = 'bay_code';
                $val1 = getParamVal($key1);
				$tmp = json_decode($obj->$funcName( $val1 ), true);
				$tmp = filter($tmp, $key1, $val1);
                echo json_encode($tmp);
                break;
            case "lookupLoadingBayList_RT":
				// public function lookupLoadingBayList_RT($bay_type="-1", $bay_code="-1", $base_code="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'bay_code';
                $key2 = 'bay_type_code';
                $key3 = 'base_code';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
                $val3 = getParamVal($key3);
				//echo print_r($obj->$funcName( $val2, $val1, $val3 ),TRUE);
				$tmp = json_decode($obj->$funcName($val2, $val1, $val3), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
				$tmp = filterByPartialMatch($tmp, 'bay_bases', $val3, '|');
                echo json_encode($tmp);
                break;
            case "lookupLoadingArmList_RT":
				// public function lookupLoadingArmList_RT($bay_code="-1", $arm_code="-1", $arm_type="-1", $blend_type="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'arm_code';
                $key2 = 'arm_type_code';
                $key3 = 'arm_blendtype_code';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
                $val3 = getParamVal($key3);
				$tmp = json_decode($obj->$funcName('-1', $val1, $val2, $val3), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
				$tmp = filter($tmp, $key3, $val3);
                echo json_encode($tmp);
                break;
            case "lookupLoadingMeterList_RT":
				// public function lookupLoadingMeterList_RT($mtr_code="-1", $usg_type="-1", $mtr_type="-1", $qty_type="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'meter_code';
                $key2 = 'meter_type';
                $key3 = 'meter_qtytype';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
                $val3 = getParamVal($key3);
				$tmp = json_decode($obj->$funcName($val1, '-1', $val2, $val3), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
				$tmp = filter($tmp, $key3, $val3);
                echo json_encode($tmp);
                break;
            case "lookupPipeNodeList_RT":
				// public function lookupPipeNodeList_RT($bay_code="-1", $arm_code="-1", $mtr_code="-1", $bay_type="-1", $arm_type="-1", $blend_type="-1", $caseType='L', $jsonFlag=1)
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
            case "lookupLoadingTrip_RT":
				// public function lookupLoadingTrip_RT($trip_no, $caseType='L', $jsonFlag=1)
                $key1 = 'trip_no';
                $val1 = getParamVal($key1);
				$tmp = json_decode($obj->$funcName( $val1 ), true);
				$tmp = filter($tmp, "load_number", $val1);
                echo json_encode($tmp);
                break;
            case "lookupLoadingCompartments_RT":
				// public function lookupLoadingCompartments_RT($supplier, $trip_no, $caseType='L', $jsonFlag=1)
                $key1 = 'supplier';
                $key2 = 'trip_no';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
				$tmp = json_decode($obj->$funcName( $val1, $val2 ), true);
				$tmp = filter($tmp, "cmpt_supplier", $val1);
				$tmp = filter($tmp, "cmpt_tripno", $val2);
                echo json_encode($tmp);
                break;
            case "lookupLoadingTanker_RT":
				// public function lookupLoadingTanker_RT($trip_no, $caseType='L', $jsonFlag=1)
                $key1 = 'trip_no';
                $val1 = getParamVal($key1);
				$tmp = json_decode($obj->$funcName( $val1 ), true);
				$tmp = filter($tmp, "load_number", $val1);
                echo json_encode($tmp);
                break;
            case "lookupLoadingBayItemList_RT":
				// public function lookupLoadingBayItemList_RT($bay_code="-1", $caseType='L', $jsonFlag=1)
				//$funcName = "lookupLoadingBayItemList";
                $key1 = 'bay_code';
                $key2 = 'bay_type_code';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
				//echo print_r($obj->$funcName( $val1 ),TRUE);
				$tmp = json_decode($obj->$funcName( $val1 ), true);
				$tmp = filter($tmp, $key1, $val1);
				$tmp = filter($tmp, $key2, $val2);
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
