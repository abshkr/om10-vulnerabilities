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
	
	$std_temp = getenv( "VSM_COMPENSATION_PT" );
	if ( $std_temp === FALSE )
	{
		$std_temp = 15.0;
	}
	
	$expTitles = array();

	$expTitles["ENG"] = array();
	$expTitles["ENG"]["tank_sitename"] = "Terminal";
	$expTitles["ENG"]["tank_export_date"] = "Date time";
	$expTitles["ENG"]["tank_code"] = "Tank Code";
	$expTitles["ENG"]["tank_name"] = "Tank Name";
	$expTitles["ENG"]["tank_base"] = "Base Product Code";
	$expTitles["ENG"]["tank_base_name"] = "Base Product Name";
	$expTitles["ENG"]["tank_density"] = "Reference Density (Kg/m3)";
	$expTitles["ENG"]["tank_dtol_percent"] = "Tank Daily Variance Limit (%)";
	$expTitles["ENG"]["tank_dtol_volume"] = "Tank Daily Variance Limit (vol)";
	$expTitles["ENG"]["tank_mtol_percent"] = "Tank Monthly Variance Limit (%)";
	$expTitles["ENG"]["tank_mtol_volume"] = "Tank Monthly Variance Limit (vol)";
	$expTitles["ENG"]["tank_status_name"] = "Tank Status";
	$expTitles["ENG"]["tank_prod_lvl"] = "Tank Level (mm)";
	$expTitles["ENG"]["tank_amb_vol"] = "OBS quantity (L)";
	$expTitles["ENG"]["tank_temp"] = "Tank Average temperature (C)";
	$expTitles["ENG"]["tank_cor_vol"] = "STD quantity (L@".$std_temp."C)";
	$expTitles["ENG"]["tank_liquid_kg"] = "Mass quantity (Kg)";
	$expTitles["ENG"]["tank_ullage"] = "Ullage(L)";
	$expTitles["ENG"]["tank_hh_level"] = "Value of HH";
	$expTitles["ENG"]["tank_h_level"] = "Value of H";
	$expTitles["ENG"]["tank_l_level"] = "Value of L";
	$expTitles["ENG"]["tank_ll_level"] = "Value of LL";
	$expTitles["ENG"]["tank_uh_level"] = "Value of User H";
	$expTitles["ENG"]["tank_ul_level"] = "Value of User L";
	$expTitles["ENG"]["tank_hh_state"] = "State of HH";
	$expTitles["ENG"]["tank_h_state"] = "State of H";
	$expTitles["ENG"]["tank_l_state"] = "State of L";
	$expTitles["ENG"]["tank_ll_state"] = "State of LL";
	$expTitles["ENG"]["tank_uh_state"] = "State of User H";
	$expTitles["ENG"]["tank_ul_state"] = "State of User L";
	$expTitles["ENG"]["tank_selected"] = "Selected by the filters?";

	$expTitles["CHN"] = array();
	$expTitles["CHN"]["tank_sitename"] = "油库";
	$expTitles["CHN"]["tank_export_date"] = "日期时间";
	$expTitles["CHN"]["tank_code"] = "油罐代码";
	$expTitles["CHN"]["tank_name"] = "油罐名称";
	$expTitles["CHN"]["tank_base"] = "基础油品代码";
	$expTitles["CHN"]["tank_base_name"] = "基础油品名称";
	$expTitles["CHN"]["tank_density"] = "标准密度(Kg/m3)";
	$expTitles["CHN"]["tank_dtol_percent"] = "日可变范围(%)";
	$expTitles["CHN"]["tank_dtol_volume"] = "日可变范围(容积)";
	$expTitles["CHN"]["tank_mtol_percent"] = "月可变范围(%)";
	$expTitles["CHN"]["tank_mtol_volume"] = "月可变范围(容积)";
	$expTitles["CHN"]["tank_status_name"] = "油罐状态";
	$expTitles["CHN"]["tank_prod_lvl"] = "油罐液位(mm)";
	$expTitles["CHN"]["tank_amb_vol"] = "油罐视量容积(L)";
	$expTitles["CHN"]["tank_temp"] = "油罐平均温度(C)";
	$expTitles["CHN"]["tank_cor_vol"] = "油罐标准容积(L@".$std_temp."C)";
	$expTitles["CHN"]["tank_liquid_kg"] = "油罐油品质量(Kg)";
	$expTitles["CHN"]["tank_ullage"] = "罐空余量(L)";
	$expTitles["CHN"]["tank_hh_level"] = "高高位报警点液位";
	$expTitles["CHN"]["tank_h_level"] = "高位报警点液位";
	$expTitles["CHN"]["tank_l_level"] = "低位报警点液位";
	$expTitles["CHN"]["tank_ll_level"] = "低低位报警点液位";
	$expTitles["CHN"]["tank_uh_level"] = "用户高位报警点液位";
	$expTitles["CHN"]["tank_ul_level"] = "用户低位报警点液位";
	$expTitles["CHN"]["tank_hh_state"] = "高高位报警点状态";
	$expTitles["CHN"]["tank_h_state"] = "高位报警点状态";
	$expTitles["CHN"]["tank_l_state"] = "低位报警点状态";
	$expTitles["CHN"]["tank_ll_state"] = "低低位报警点状态";
	$expTitles["CHN"]["tank_uh_state"] = "用户高位报警点状态";
	$expTitles["CHN"]["tank_ul_state"] = "用户低位报警点状态";
	$expTitles["CHN"]["tank_selected"] = "是否被过滤器选中？";

	$expColumns = array();
	$expColumns["tank_sitename"] = true;
	$expColumns["tank_export_date"] = true;
	$expColumns["tank_code"] = true;
	$expColumns["tank_name"] = true;
	$expColumns["tank_base"] = true;
	$expColumns["tank_base_name"] = true;
	$expColumns["tank_density"] = true;
	$expColumns["tank_dtol_percent"] = true;
	$expColumns["tank_dtol_volume"] = true;
	$expColumns["tank_mtol_percent"] = true;
	$expColumns["tank_mtol_volume"] = true;
	$expColumns["tank_status_name"] = true;
	$expColumns["tank_prod_lvl"] = true;
	$expColumns["tank_amb_vol"] = true;
	$expColumns["tank_temp"] = true;
	$expColumns["tank_cor_vol"] = true;
	$expColumns["tank_liquid_kg"] = true;
	$expColumns["tank_ullage"] = true;
	$expColumns["tank_hh_level"] = true;
	$expColumns["tank_h_level"] = true;
	$expColumns["tank_l_level"] = true;
	$expColumns["tank_ll_level"] = true;
	$expColumns["tank_uh_level"] = true;
	$expColumns["tank_ul_level"] = true;
	$expColumns["tank_hh_state"] = true;
	$expColumns["tank_h_state"] = true;
	$expColumns["tank_l_state"] = true;
	$expColumns["tank_ll_state"] = true;
	$expColumns["tank_uh_state"] = true;
	$expColumns["tank_ul_state"] = true;
	$expColumns["tank_selected"] = true;
	
	
    //include "./amfservices/core/services/TankviewService.php";
    include "TankviewService.php";
    include "helper.php";
    $obj = new TankviewService();
	
    $funcName = "exportTankItems";
    $tmp = array();

    if ($funcName <> null) {
        //$tmp = json_decode($obj->$funcName(), true);
        switch ($funcName) {
            case "exportTankItems":
				// public function exportTankItems($tankGroup="-1", $tankCode="-1", $tankBase="-1", $caseType='L', $jsonFlag=1)
                $key1 = 'tank_group';
                $key2 = 'tank_code';
                $key3 = 'tank_base';
                $val1 = getParamVal($key1);
                $val2 = getParamVal($key2);
                $val3 = getParamVal($key3);
				$tmp = json_decode($obj->$funcName( $val1, $val2, $val3 ), true);

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
				foreach( $tmp as $tmp_id=>$tankItem )
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
							if ( $key == "tank_export_date")
							{
								$expTxt .= "\"".date("d/m/Y H:i:s")."\"";
							}
							else
							{
								$expTxt .= "\"".$tankItem[$key]."\"";
							}
							$clnCnt += 1;
						}
					}
					$expTxt .= "\n";
				}
				
				exec( "rm tankviewExport*.csv", $outputs );
				$expFileName = "tankviewExport_".date("YmdHis").".csv";
				file_put_contents( $expFileName, $expTxt );
				echo "<!DOCTYPE html><html><head><meta http-equiv=\"refresh\" content=\"1; URL=".$expFileName."\"><title>tankview export data</title></head><body></body></html>";
				
//				echo $expTxt;
//                echo json_encode($expTxt);
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
