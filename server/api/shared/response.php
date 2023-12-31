<?php

include_once __DIR__ . '/utilities.php';

//Reponse mssage with multiple lang support
function response($case_name, $default = null, $params = null) 
{
    // write_log(sprintf("%s() START. case_name:%s, default:%s", __FUNCTION__, $case_name, $default),
    //     __FILE__, __LINE__);

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
            "ENG" => "Unable to create. Internal server error",
            "CHN" => "创建失败，请检查日志文件获取详情"
        ),
        "__CREATE_SUCCEEDED__" => array(
            "ENG" => "Successfully created",
            "CHN" => "创建成功"
        ),
        "__ADD_FAILED__" => array(
            "ENG" => "Unable to add. Internal server error",
            "CHN" => "创建失败，请检查日志文件获取详情"
        ),
        "__ADD_SUCCEEDED__" => array(
            "ENG" => "Successfully added",
            "CHN" => "创建成功"
        ),
        "__UPDATE_FAILED__" => array(
            "ENG" => "Unable to update. Internal server error",
            "CHN" => "修改失败，请检查日志文件获取详情"
        ),
        "__UPDATE_SUCCEEDED__" => array(
            "ENG" => "Successfully updated",
            "CHN" => "修改成功"
        ),
        "__DELETE_FAILED__" => array(
            // "ENG" => "Unable to delete. Internal server error",
            // "CHN" => "删除失败，请检查日志文件获取详情"
            "ENG" => "Unable to delete. Most likely this record may have child record(s).",
            "CHN" => "删除失败，很可能该记录仍有子记录存在，请联系客服人员获取帮助。"
        ),
        "__DELETE_SUCCEEDED__" => array(
            "ENG" => "Successfully deleted",
            "CHN" => "删除成功"
        ),
        "__SAVE_FAILED__" => array(
            "ENG" => "Unable to save. Internal server error",
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
            "CHN" => "油品入库开始"
        ),
        "__PRODUCTMOVEMENT_COMPLETED__" => array(
            "ENG" => "Product movment completed",
            "CHN" => "油品入库已结束"
        ),
        "__PRODUCTMOVEMENT_START_FAIL3__" => array(
            "ENG" => "A movement is already in progress for an associated tank",
            "CHN" => "一个相关的油罐正在进行中，不能开始新的油品入库"
        ),
        "__PRODUCTMOVEMENT_START_FAIL2__" => array(
            "ENG" => "Movement is automatic -  controlled via a process - and cannot be started",
            "CHN" => "不能开始油品入库"
        ),
        "__PRODUCTMOVEMENT_START_FAIL__" => array(
            "ENG" => "Could not Start Product Movement",
            "CHN" => "不能开始油品入库"
        ),
        "__PRODUCTMOVEMENT_ALREADY_COMPLETED__" => array(
            "ENG" => "This Batch is already completed",
            "CHN" => "油品入库已经完成"
        ),
        "__PRODUCTMOVEMENT_BATCH_COMPLETE_FAIL__" => array(
            "ENG" => "Batch could not complete due to some product movement is not in COMPLETE",
            "CHN" => "结束油品入库失败"
        ),
        "__PRODUCTMOVEMENT_BATCH_COMPLETED__" => array(
            "ENG" => "Batch successfully completed",
            "CHN" => "结束油品入库"
        ),
        "__PRODUCTMOVEMENT_HALTED__" => array(
            "ENG" => "Product movment halted",
            "CHN" => "油品入库停止"
        ),
        "__PRODUCTMOVEMENT_CREATED__" => array(
            "ENG" => "Product movment created",
            "CHN" => "油品入库已经创建"
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
        "__VCF_TANKLVL_QTY_NOT_SET__" => array(
            "ENG" => "Both tank_prod_lvl and amb|cor|kg quantities not set, skip this calculation. tank:%s",
            "CHN" => "油罐液位和盘点总量(视量、标量或重量)均未设置，无法计算. 油罐:%s"
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
            "ENG" => "CGI invocation error. Internal server error",
            "CHN" => "内部CGI异常，请检查日志文件获取详情"
        ),
        "__GENERAL_EXCEPTION__" => array(
            "ENG" => "Exception caught",
            "CHN" => "内部异常，请检查日志文件获取详情"
        ),
        "__DATABASE_EXCEPTION__" => array(
            "ENG" => "Database exception caught. Internal server error",
            "CHN" => "数据库异常，请检查日志文件获取详情"
        ),
        "__PARAMETER_EXCEPTION__" => array(
            "ENG" => "Parameter exception caught",
            "CHN" => "参数异常，请检查日志文件获取详情"
        ),
        "__SEAL_ALLOCATED__" => array(
            "ENG" => "Seal numbers allocated",
            "CHN" => "已完成分配"
        ),
        "__SEAL_ALLOCATED_ONE__" => array(
            "ENG" => "One seal allocated",
            "CHN" => "已完成分配"
        ),
        "__SCHED_ARCHIVED__" => array(
            "ENG" => "Schedule has been archived",
            "CHN" => "发油单已归档"
        ),
        "__SET_NEXT_SEAL__" => array(
            "ENG" => "Next seal saved",
            "CHN" => "下一个密封号已经保存"
        ),
        "__SET_DELETED__" => array(
            "ENG" => "Seal number deleted",
            "CHN" => "密封号已经删除"
        ),
        "__SET_REALLOCATED__" => array(
            "ENG" => "Seal number reallocated",
            "CHN" => "密封号已经重新分配"
        ),
        "__SEAL_ALL_DEALLOCATED__" => array(
            "ENG" => "Seal numbers deallocated",
            "CHN" => "密封号已经取消"
        ),
        "__SEAL_PREFIX_SET__" => array(
            "ENG" => "Seal prefix set",
            "CHN" => "密封号前缀已经设置"
        ),
        "__SEAL_SUFFIX_SET__" => array(
            "ENG" => "Seal suffix set",
            "CHN" => "密封号后缀已经设置"
        ),
        "__INTERNAL_ERROR__" => array(
            "ENG" => "Internal server error, please check log file for details",
            "CHN" => "内部错误，请检查日志文件获取详情"
        ),
        "__SITE_NEXT_SEAL__" => array(
            "ENG" => "Next seal number",
            "CHN" => "下一个封签号"
        ),
        "__SITE_TRIP_EXPIRY_HOURS__" => array(
            "ENG" => "Default Expiry Hours of a Schedule",
            "CHN" => "油库提单的默认有效时间(小时)"
        ),
        "__AMB_ADJUSTMENT__" => array(
            "ENG" => "Ambient Quantity Adjustment (L)",
            "CHN" => "视量调整(升)"
        ),
        "__STD_ADJUSTMENT__" => array(
            "ENG" => "Standard Quantity Adjustment (L)",
            "CHN" => "标量调整(升)"
        ),
        "__MASS_ADJUSTMENT__" => array(
            "ENG" => "Mass Quantity Adjustment (KG)",
            "CHN" => "质量调整(公斤)"
        ),
        "__LOAD_RETENTION__" => array(
            "ENG" => "Load Retention Period (days) [60 - 1830]",
            "CHN" => "发油账单保存时间(天)"
        ),
        "__LOAD_NEW_RETENTION__" => array(
            "ENG" => "Load Retention New Loads (days) [1 - 365]",
            "CHN" => "新发油账单保存时间(天)"
        ),
        "__LOAD_NEW_MOV_RETENTION__" => array(
            "ENG" => "Load Retention New Movement (days) [60 - 1830]",
            "CHN" => "新货单保存时间(天)"
        ),
        "__LOAD_MOV_RETENTION__" => array(
            "ENG" => "Load Retention Used Movement (days) [60 - 1830]",
            "CHN" => "已使用货单保存时间(天)"
        ),
        "__SITE_SEAL_MODE__" => array(
            "ENG" => "Seal allocation mode",
            "CHN" => "封条分配方式"
        ),
        "__PERSONNEL_EXP_MONTHS__" => array(
            "ENG" => "Personnel Expiry Months [0 - 12]",
            "CHN" => "用户过期时间(月)"
        ),
        "__PARTNERSHIP_EXISTS__" => array(
            "ENG" => "Cannot delete partner because there are partnership under it",
            "CHN" => "不能删除合作商，存在有合作商关系"
        ),
        "__STRAPS_IMPORTED__" => array(
            "ENG" => "Tank strap imported",
            "CHN" => "油罐数据已经导入"
        ),
        "__WRIS_IMPORTED__" => array(
            "ENG" => "WRI data imported",
            "CHN" => "废品记录编号数据已经导入"
        ),
        "__SESSIONS_KILLED__" => array(
            "ENG" => "All seesions killed",
            "CHN" => "其余会话已经删除"
        ),
        "__SESSIONS_KILL_FAILED__" => array(
            "ENG" => "Cannnot kill other seesions",
            "CHN" => "不能删除其他会话"
        ),
        "__LOGIN_USER_LOCKED__" => array(
            "ENG" => "Current user is locked, cannot log in",
            "CHN" => "当前用户被锁定，不能登录"
        ),
        "__ACTION_SUCCEED__" => array(
            "ENG" => "Action succeeded",
            "CHN" => "成功"
        ),
        "__2FA_FAILED__" => array(
            "ENG" => "2FA authentication failed",
            "CHN" => "验证失败"
        ),
        "__2FA_TIMEOUT__" => array(
            "ENG" => "2FA authentication time out",
            "CHN" => "验证超时"
        ),
        "__2FA_EMAIL_NOT_SET__" => array(
            "ENG" => "2FA authentication: email not set",
            "CHN" => "验证码失败：邮件地址未设置"
        ),
        "__2FA_EMAIL_NOT_VALID__" => array(
            "ENG" => "2FA authentication: email not valid",
            "CHN" => "验证码失败：不正确的邮件地址"
        ),
        "__JASPER_FILE_NOT_EXIST__" => array(
            "ENG" => "Jasper file does not not exist",
            "CHN" => "Jasper文件不存在"
        ),
        "__PRODUCTMOVEMENT_NOMI_CREATED__" => array(
            "ENG" => "Product movment nomination created and completed",
            "CHN" => "已为油品入库产生大宗货单"
        ),
        "__INVALID_PRODUCT_MVMNT_REQ__" => array(
            "ENG" => "Invalid product movement response message, please check journal or BAY999 debug",
            "CHN" => "错误的返回信息"
        ),
        "__COMPATIBLE_SITEMANAGER_PROD_NOTFOUND__" => array(
            "ENG" => "Cannot find suitable site manager product for this base product",
            "CHN" => "没有匹配的供货商产品"
        ),
        "__NOMINATION_ALREADY_EXISTS__" => array(
            "ENG" => "Nomination already exist for this product movement. Nomination ID:",
            "CHN" => "大宗货单已经存在："
        ),
        "__BAY999_ERROR__" => array(
            "ENG" => "Virtual bay error, please check status of BAY999",
            "CHN" => "虚拟油台错误，请检查虚拟油台状态"
        ),
        "__CLOSEOUT_RUNNING__" => array(
            "ENG" => "Another closeout processing is running, please redo later",
            "CHN" => "已经有一个进程在运行，请稍后重试"
        )
    );

    $lang = Utilities::getCurrLang();
        
    if ($lang == 'ENG' && isset($default)) {
        return $default;
    }
    
    if (!array_key_exists($case_name, $case_response_map)) {
        $case_name = "__INTERNAL_ERROR__";
    }

    // write_log(sprintf("lang:%s, case:%s, value:%s", $lang, $case_name, $case_response_map[$case_name][$lang]),
    //     __FILE__, __LINE__);

    /* try {
        $tmpp = vsprintf($case_response_map[$case_name][$lang], $params);
    } catch (Exception $e) {
        //write_log(sprintf("Caught exception: %s", $e->getMessage()), __FILE__, __LINE__, LogLevel::ERROR);
        write_log(sprintf("%s::%s() STARTaaa, class:%s, method:%s",
            __CLASS__, __FUNCTION__, $class, $method),
            __FILE__, __LINE__);
    } */

    if (isset($params) && is_array($params) && count($params) > 0) {
        return vsprintf($case_response_map[$case_name][$lang], $params);
    } else {
        return $case_response_map[$case_name][$lang];
    }
}

//Reponse type with multiple lang support
function response_type($code) 
{
    $case_response_map = array(
        "__CODE_200__" => array(
            "ENG" => "OK",
            "CHN" => "成功"
        ),
        "__CODE_400__" => array(
            "ENG" => "Bad Request",
            "CHN" => "错误的请求"
        ),
        "__CODE_401__" => array(
            "ENG" => "Unauthorized",
            "CHN" => "未经授权"
        ),
        "__CODE_405__" => array(
            "ENG" => "Method Not Allowed",
            "CHN" => "不允许的方法"
        ),
        "__CODE_498__" => array(
            "ENG" => "Invalid Token",
            "CHN" => "令牌无效"
        ),
        "__CODE_500__" => array(
            "ENG" => "Internal Server Error",
            "CHN" => "内部服务器错误"
        ),
        "__CODE_DEF__" => array(
            "ENG" => "Unknown Error",
            "CHN" => "未知错误"
        ),
    );

    $lang = Utilities::getCurrLang();
    
    $case_name = "__CODE_" . $code . "__";
    if (!array_key_exists($case_name, $case_response_map)) {
        $case_name = "__CODE_DEF__";
    }

    return $case_response_map[$case_name][$lang];
}
