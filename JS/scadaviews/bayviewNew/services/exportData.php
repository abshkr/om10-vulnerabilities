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
	
	if ( array_key_exists('LANGUAGE', $_SESSION) === TRUE )
	{
		$lang = $_SESSION['LANGUAGE'];
	}
	else
	{
		$lang = "ENG";
	}
	if ( $lang == "" || $lang == null )
	{
		$lang = "ENG";
	}
	
	$expTitles = array();

	$expTitles["ENG"] = array();
	$expTitles["ENG"]["bay_date"] = "Date";
	$expTitles["ENG"]["bay_time"] = "Time";
	$expTitles["ENG"]["bay_code"] = "Loading Bay Code";
	$expTitles["ENG"]["bay_name"] = "Loading Bay Name";
	$expTitles["ENG"]["bay_lock"] = "Bay Locked?";
	$expTitles["ENG"]["bay_status"] = "Bay Status";
	$expTitles["ENG"]["bay_seq"] = "Bay Seq No.";
	$expTitles["ENG"]["bay_area"] = "Bay Area Id";
	$expTitles["ENG"]["bay_area_name"] = "Bay Area";
	$expTitles["ENG"]["bay_type"] = "Loading Bay Type ID";
	$expTitles["ENG"]["bay_type_code"] = "Loading Bay Type Code";
	$expTitles["ENG"]["bay_type_desc"] = "Loading Bay Type";
	$expTitles["ENG"]["bay_esd"] = "Emergency Shutdown State";
	$expTitles["ENG"]["bay_load_id"] = "Load ID";
	$expTitles["ENG"]["bay_tnkr_code"] = "Tanker ID";
	$expTitles["ENG"]["bay_tnkr_name"] = "Tanker Name";
	$expTitles["ENG"]["bay_tanks"] = "Bay Tanks";
	$expTitles["ENG"]["bay_bases"] = "Bay Base Products";

	$expTitles["CHN"] = array();
	$expTitles["CHN"]["bay_date"] = "日期";
	$expTitles["CHN"]["bay_time"] = "时间";
	$expTitles["CHN"]["bay_code"] = "发油台代码";
	$expTitles["CHN"]["bay_name"] = "发油台名称";
	$expTitles["CHN"]["bay_lock"] = "发油台锁定";
	$expTitles["CHN"]["bay_status"] = "发油台状态";
	$expTitles["CHN"]["bay_seq"] = "发油台序号";
	$expTitles["CHN"]["bay_area"] = "发油台区域编号";
	$expTitles["CHN"]["bay_area_name"] = "发油台区域";
	$expTitles["CHN"]["bay_type"] = "发油台类型编号";
	$expTitles["CHN"]["bay_type_code"] = "发油台类型代码";
	$expTitles["CHN"]["bay_type_desc"] = "发油台类型";
	$expTitles["CHN"]["bay_esd"] = "紧急停车状态";
	$expTitles["CHN"]["bay_load_id"] = "提单号";
	$expTitles["CHN"]["bay_tnkr_code"] = "车辆代码";
	$expTitles["CHN"]["bay_tnkr_name"] = "车辆牌照";
	$expTitles["CHN"]["bay_tanks"] = "发油台可用油罐";
	$expTitles["CHN"]["bay_bases"] = "发油台可提基础油品";

	$expColumns = array();
	$expColumns["bay_date"] = true;
	$expColumns["bay_time"] = true;
	$expColumns["bay_code"] = true;
	$expColumns["bay_name"] = false;
	$expColumns["bay_lock"] = true;
	$expColumns["bay_status"] = false;
	$expColumns["bay_seq"] = true;
	$expColumns["bay_area"] = false;
	$expColumns["bay_area_name"] = true;
	$expColumns["bay_type"] = false;
	$expColumns["bay_type_code"] = false;
	$expColumns["bay_type_desc"] = true;
	$expColumns["bay_esd"] = true;
	$expColumns["bay_load_id"] = true;
	$expColumns["bay_tnkr_code"] = true;
	$expColumns["bay_tnkr_name"] = true;
	$expColumns["bay_tanks"] = true;
	$expColumns["bay_bases"] = true;

	
	
    //include "./amfservices/core/services/BayviewService.php";
    include "BayviewService.php";
    include "helper.php";
    $obj = new BayviewService();
	
    $funcName = "lookupLoadingBayList_RT";
    $tmp = array();

    if ($funcName <> null) {
        //$tmp = json_decode($obj->$funcName(), true);
        switch ($funcName) {
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
            case "lookupLoadingBayList_RT":
				// public function lookupLoadingBayList_RT($bay_type="-1", $bay_code="-1", $base_code="-1", $caseType='L', $jsonFlag=1)
                //$key1 = 'bay_code';
                //$key2 = 'bay_type_code';
                //$key3 = 'base_code';
                //$val1 = getParamVal($key1);
                //$val2 = getParamVal($key2);
                //$val3 = getParamVal($key3);
				//$tmp = json_decode($obj->$funcName($val2, $val1, $val3), true);
				$tmp = json_decode($obj->$funcName('-1', '-1', '-1'), true);
				//$tmp = filter($tmp, $key1, $val1);
				//$tmp = filter($tmp, $key2, $val2);
				//$tmp = filterByPartialMatch($tmp, 'bay_bases', $val3, '|');

				$expTxt = "";
				$clnCnt = 0;
				foreach( $expColumns as $key=>$value )
				{
					if ( $value === true )
					{
						if ( $clnCnt > 0 )
						{
							$expTxt .= ",";
						}
						$expTxt .= "\"".$expTitles[$lang][$key]."\"";
						$clnCnt += 1;
					}
				}
				$expTxt .= "\n";
				/*
					$expTxt .= "\"".$expTitles[$lang]["bay_date"]."\"";
					$expTxt .= ",\"".$expTitles[$lang]["bay_time"]."\"";
					$expTxt .= ",\"".$expTitles[$lang]["bay_code"]."\"";
					$expTxt .= ",\"".$expTitles[$lang]["bay_name"]."\"";
					$expTxt .= ",\"".$expTitles[$lang]["bay_lock"]."\"";
					//$expTxt .= ",\"".$expTitles[$lang]["bay_status"]."\"";
					$expTxt .= ",\"".$expTitles[$lang]["bay_seq"]."\"";
					$expTxt .= ",\"".$expTitles[$lang]["bay_area"]."\"";
					$expTxt .= ",\"".$expTitles[$lang]["bay_area_name"]."\"";
					$expTxt .= ",\"".$expTitles[$lang]["bay_type"]."\"";
					$expTxt .= ",\"".$expTitles[$lang]["bay_type_code"]."\"";
					$expTxt .= ",\"".$expTitles[$lang]["bay_type_desc"]."\"";
					$expTxt .= ",\"".$expTitles[$lang]["bay_esd"]."\"";
					$expTxt .= ",\"".$expTitles[$lang]["bay_load_id"]."\"";
					$expTxt .= ",\"".$expTitles[$lang]["bay_tnkr_code"]."\"";
					$expTxt .= ",\"".$expTitles[$lang]["bay_tnkr_name"]."\"";
					$expTxt .= ",\"".$expTitles[$lang]["bay_tanks"]."\"";
					$expTxt .= ",\"".$expTitles[$lang]["bay_bases"]."\"";
					$expTxt .= "\n";
				*/
				foreach( $tmp as $tmp_id=>$bayItem )
				{
					$clnCnt = 0;
					foreach( $expColumns as $key=>$value )
					{
						if ( $value === true )
						{
							if ( $clnCnt > 0 )
							{
								$expTxt .= ",";
							}
							if ( $key == "bay_date")
							{
								$expTxt .= "\"".date("d/m/Y")."\"";
							}
							else if ( $key == "bay_time")
							{
								$expTxt .= "\"".date("H:i:s")."\"";
							}
							else
							{
								$expTxt .= "\"".$bayItem[$key]."\"";
							}
							$clnCnt += 1;
						}
					}
					/*
					$expTxt .= "\"".date("d/m/Y")."\"";
					$expTxt .= ",\"".date("H:i:s")."\"";
					$expTxt .= ",\"".$bayItem["bay_code"]."\"";
					$expTxt .= ",\"".$bayItem["bay_name"]."\"";
					$expTxt .= ",\"".$bayItem["bay_lock"]."\"";
					//$expTxt .= ",\"".$bayItem["bay_status"]."\"";
					$expTxt .= ",\"".$bayItem["bay_seq"]."\"";
					$expTxt .= ",\"".$bayItem["bay_area"]."\"";
					$expTxt .= ",\"".$bayItem["bay_area_name"]."\"";
					$expTxt .= ",\"".$bayItem["bay_type"]."\"";
					$expTxt .= ",\"".$bayItem["bay_type_code"]."\"";
					$expTxt .= ",\"".$bayItem["bay_type_desc"]."\"";
					$expTxt .= ",\"".$bayItem["bay_esd"]."\"";
					$expTxt .= ",\"".$bayItem["bay_load_id"]."\"";
					$expTxt .= ",\"".$bayItem["bay_tnkr_code"]."\"";
					$expTxt .= ",\"".$bayItem["bay_tnkr_name"]."\"";
					$expTxt .= ",\"".$bayItem["bay_tanks"]."\"";
					$expTxt .= ",\"".$bayItem["bay_bases"]."\"";
					*/
					$expTxt .= "\n";
				}
				
				exec( "rm bayviewExport*.csv", $outputs );
				$expFileName = "bayviewExport_".date("YmdHis").".csv";
				file_put_contents( $expFileName, $expTxt );
				echo "<!DOCTYPE html><html><head><meta http-equiv=\"refresh\" content=\"1; URL=".$expFileName."\"><title>bayview export data</title></head><body></body></html>";
				
//				echo $expTxt;
//                echo json_encode($expTxt);
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
