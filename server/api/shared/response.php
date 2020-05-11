<?php

include_once __DIR__ . '/utilities.php';

//Reponse mssage with multiple lang support
function response($case_name, $default = null, $params = null) 
{
    $case_response_map = array(
        "__NOT_EXIST__" => array(
            "ENG" => "Record does not not exist",
            "CHN" => "记录不存在"
        ),
        "__ALREADY_EXIST__" => array(
            "ENG" => "Record already exists",
            "CHN" => "记录已经存在"
        ),
        "__FOLDER_NOT_EXIST__" => array(
            "ENG" => "Folder does not not exist",
            "CHN" => "目录不存在"
        ),
        "__FILE_NOT_EXIST__" => array(
            "ENG" => "File does not not exist",
            "CHN" => "文件不存在"
        ),
        "__FILE_ALREADY_EXIST__" => array(
            "ENG" => "File already exists",
            "CHN" => "文件已经存在"
        ),
        "__FILE_TOO_LARGE__" => array(
            "ENG" => "File is too large",
            "CHN" => "文件大小超过规定"
        ),
        "__NOT_IMAGE__" => array(
            "ENG" => "File is not an image",
            "CHN" => "该文件不是图像文件"
        ),
        "__FILE_UPLOADED__" => array(
            "ENG" => "File uploaded",
            "CHN" => "文件已上传"
        ),
        "__FILE_UPLOAD_FAILED__" => array(
            "ENG" => "Failed to upload file",
            "CHN" => "文件上传失败"
        ),
        "__CREATE_FAILED__" => array(
            "ENG" => "Unable to create. Check logs/php_rest_*.log file for details",
            "CHN" => "创建失败，请检查日志文件获取详情"
        ),
        "__CREATE_SUCCEEDED__" => array(
            "ENG" => "Successfully created",
            "CHN" => "创建成功"
        ),
        "__ADD_FAILED__" => array(
            "ENG" => "Unable to add. Check logs/php_rest_*.log file for details",
            "CHN" => "创建失败，请检查日志文件获取详情"
        ),
        "__ADD_SUCCEEDED__" => array(
            "ENG" => "Successfully added",
            "CHN" => "创建成功"
        ),
        "__UPDATE_FAILED__" => array(
            "ENG" => "Unable to update. Check logs/php_rest_*.log file for details",
            "CHN" => "修改失败，请检查日志文件获取详情"
        ),
        "__UPDATE_SUCCEEDED__" => array(
            "ENG" => "Successfully updated",
            "CHN" => "修改成功"
        ),
        "__DELETE_FAILED__" => array(
            "ENG" => "Unable to delete. Check logs/php_rest_*.log file for details",
            "CHN" => "删除失败，请检查日志文件获取详情"
        ),
        "__DELETE_SUCCEEDED__" => array(
            "ENG" => "Successfully deleted",
            "CHN" => "删除成功"
        ),
        "__SAVE_FAILED__" => array(
            "ENG" => "Unable to save. Check logs/php_rest_*.log file for details",
            "CHN" => "保存失败，请检查日志文件获取详情"
        ),
        "__SAVE_SUCCEEDED__" => array(
            "ENG" => "Successfully saved",
            "CHN" => "保存成功"
        ),
        "__JOURNAL_FAILED__" => array(
            "ENG" => "Failed to write journal",
            "CHN" => "保存日志失败，请检查日志文件获取详情"
        ),
        "__TRANSACTION_ENDED__" => array(
            "ENG" => "Transaction ended",
            "CHN" => "油品交易终止"
        ),
        "__TRANSACTION_ALREADY_ENDED__" => array(
            "ENG" => "Transaction already ended",
            "CHN" => "油品交易已经终止"
        ),
        "__CLOSEOUT_FREEZE__" => array(
            "ENG" => "Manual closeout freeze triggered",
            "CHN" => "人工盘点启动"
        ),
        "__CLOSEOUT_CLOSE__" => array(
            "ENG" => "Triggered to close first frozen folio",
            "CHN" => "结束首个冻结预盘"
        ),
        "__PDS_SENT__" => array(
            "ENG" => "PDS message sent",
            "CHN" => "PDS消息已发送"
        ),
        "__NOT_AUTH__" => array(
            "ENG" => "Authentication fails",
            "CHN" => "数据验证错误"
        ),
        "__INVALID_PRIV__" => array(
            "ENG" => "Current user does not have privilege",
            "CHN" => "当前用户没有权限"
        ),
        "__INVALID_SESSION__" => array(
            "ENG" => "Not valid session",
            "CHN" => "无效会话"
        ),
        "__NO_RECORD_FOUND__" => array(
            "ENG" => "No record found",
            "CHN" => "无数据"
        ),
        "__ALL_LOCKS_REMOVED__" => array(
            "ENG" => "All locks removed",
            "CHN" => "所有油台锁定已经去除"
        ),
        "__BAY_LOCK_TOGGLED__" => array(
            "ENG" => "Bay lock toggled",
            "CHN" => "油台锁已切换"
        ),
        "__TANKER_DETERMINATION_TOGGLED__" => array(
            "ENG" => "Bay tanker determination toggled",
            "CHN" => "油台车结束状态已切换"
        ),
        "__BAY_AUTO_COMPLETE_TOGGLED__" => array(
            "ENG" => "Bay auto complete toggled",
            "CHN" => "油台自动结束状态已切换"
        ),
        "__BAY_DEVICELOCK_TOGGLED__" => array(
            "ENG" => "Bay device lock toggled",
            "CHN" => "油台设备锁状态已切换"
        ),
        "__BAY_ARMLOCK_TOGGLED__" => array(
            "ENG" => "Bay arm lock toggled",
            "CHN" => "油台鹤管锁状态已切换"
        ),
        "__SCHEDULE_REVERSE_FAILED__" => array(
            "ENG" => "Failed to reverse schedule",
            "CHN" => "发油账单回滚失败"
        ),
        "__SCHEDULE_REVERSED__" => array(
            "ENG" => "Schedule reversed",
            "CHN" => "发油账单已回滚"
        ),
        "__GATE_OPENED__" => array(
            "ENG" => "Gate opened",
            "CHN" => "门已经打开"
        ),
        "__MANUAL_TRANS_SUBMITTED__" => array(
            "ENG" => "Manual transaction submitted",
            "CHN" => "手工发油已经提交"
        ),
        "__MANUAL_TRANS_FAILED__" => array(
            "ENG" => "Manual transaction failed",
            "CHN" => "手工发油提交失败"
        ),
        "__BOL_PRINTED__" => array(
            "ENG" => "Bill of lading printed",
            "CHN" => "发油账单已经打印"
        ),
        "__LOAD_REPORT_PRINTED__" => array(
            "ENG" => "Load report printed",
            "CHN" => "发油报告已经打印"
        ),
        "__PWD_RECENTLY_USED__" => array(
            "ENG" => "Cannot change to this password because it is recently used",
            "CHN" => "该密码最近被使用过"
        ),
        "__PWD_UPDATED__" => array(
            "ENG" => "Password updated",
            "CHN" => "密码修改成功"
        ),
        "__INVALID_PASSWORD__" => array(
            "ENG" => "Invalid password",
            "CHN" => "密码错误"
        ),
        "__PASS__" => array(
            "ENG" => "Pass",
            "CHN" => "检查通过"
        ),
        "__PWD_UPDATE_FAILED__" => array(
            "ENG" => "Failed to update password",
            "CHN" => "密码修改失败"
        ),
        "__PRODUCTMOVEMENT_STARTED__" => array(
            "ENG" => "Product movment started",
            "CHN" => "产品移动开始"
        ),
        "__PRODUCTMOVEMENT_HALTED__" => array(
            "ENG" => "Product movment halted",
            "CHN" => "产品移动停止"
        ),
        "__INVALID_SPECIAL_MOVEMENT__" => array(
            "ENG" => "Invalid special movement",
            "CHN" => "特殊货单状态错误"
        ),
        "__SPECIAL_MOVEMENT_REVERSED__" => array(
            "ENG" => "Special movement reversed",
            "CHN" => "特殊货单回滚完成"
        ),
        "__SPECIAL_MOVEMENT_SUBMITTED__" => array(
            "ENG" => "Special movement submitted",
            "CHN" => "特殊货单提交完成"
        ),
        "__SPECIAL_MOVEMENT_FAILED__" => array(
            "ENG" => "Failed to submit special movement",
            "CHN" => "特殊货单提交失败"
        ),
        "__VCF_TANKLVL_AMB_NOT_SET__" => array(
            "ENG" => "Both tank_prod_lvl and close_amb_tot not set, skip this calculation. tank:%s",
            "CHN" => "油罐液位和盘点总量(视量)均未设置，无法计算. 油罐:%s"
        ),
        "__VCF_CANNOT_GET_AMB_FROM_STRAP__" => array(
            "ENG" => "Cannot get ambient liter from strap. tank:%s",
            "CHN" => "盘点总量(视量)未设置. 油罐:%s"
        ),
        "__ACTIVATE_TANK__" => array(
            "ENG" => "Tank %s activated",
            "CHN" => "油罐%s已激活"
        ),
        "__ALREADY_ACTIVATED_TANK__" => array(
            "ENG" => "Cannot activate tank %s because it is already activated",
            "CHN" => "油罐%s已激活，不能重新激活"
        ),
        "__VCF_FAILED__" => array(
            "ENG" => "Cannot get ambient liter from strap. tank:%s",
            "CHN" => "VCF计算错误. 油罐:%s"
        ),
        "__CGI_FAILED__" => array(
            "ENG" => "CGI invocation error, check logs/php_rest_*.log file for details",
            "CHN" => "内部CGI异常，请检查日志文件获取详情"
        ),
        "__GENERAL_EXCEPTION__" => array(
            "ENG" => "Exception caught",
            "CHN" => "内部异常，请检查日志文件获取详情"
        ),
        "__DATABASE_EXCEPTION__" => array(
            "ENG" => "Database exception caught",
            "CHN" => "数据库异常，请检查日志文件获取详情"
        ),
        "__PARAMETER_EXCEPTION__" => array(
            "ENG" => "Parameter exception caught",
            "CHN" => "参数异常，请检查日志文件获取详情"
        ),
        "__INTERNAL_ERROR__" => array(
            "ENG" => "Internal error, check logs/php_rest_*.log file for details",
            "CHN" => "内部错误，请检查日志文件获取详情"
        ),
    );

    $lang = Utilities::getCurrLang();

    if ($lang == 'ENG' && isset($default)) {
        return $default;
    }
    
    if (!array_key_exists($case_name, $case_response_map)) {
        $case_name = "__INTERNAL_ERROR__";
    }

    return vsprintf($case_response_map[$case_name][$lang], $params);
    // return $case_response_map[$case_name][$lang];
}
