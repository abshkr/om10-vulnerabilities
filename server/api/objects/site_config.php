<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once 'common_class.php';

class SiteConfig extends CommonClass
{
    protected $TABLE_NAME = 'SITE_CONFIG';

    private $CNH_DESC = array(
        "SITE_2FA_DOMAINS" => "验证邮件域名",
        "SITE_2FA_ENABLED" => "启用两步验证",
        "SITE_DATETIME_FORMAT" => "默认日期显示格式",
        "SITE_DEFAULT_DATERANGE_AUDIT" => "审计报表默认日期范围. (X~~Y): X: 今天之前的天数; Y: 今天之后的天数. ",
        "URBAC_PWD_LEN_MIN" => "人员密码长度下限值(仅限于新密码)",
        "URBAC_PWD_LEN_MAX" => "人员密码长度上限值(仅限于新密码)",
        "URBAC_PWD_COMPLEXITY" => "设定密码的复杂度(仅限于新密码)",
        "URBAC_PWD_AUTO_LOCK" => "人员帐户锁定之前允许密码尝试出错次数",
        "URBAC_PWD_AUTO_EXPIRE" => "人员密码有效天数",
        "URBAC_PWD_UPD_INTERVAL" => "密码修改之后，再次允许修改需要等待的分钟数",
        "URBAC_PWD_REUSE" => "人员旧密码何时可以重复使用",
        "URBAC_AUTO_LOGOFF" => "系统处于闲置状态多少分钟将自动退出",
        "URBAC_SESSION_PER_USER" => "系统允许同时进行的最多进程数",
        "URBAC_USER_AUTO_LOCK" => "用户处于非活跃状态多少天之后将被锁定",
        "URBAC_USER_AUTO_DELETE" => "用户处于非活跃状态多少天之后将被删除",
        "DRIVER_PIN_AUTO_EXPIRE" => "PIN修改的最低频率 ",
        "DRIVER_PIN_AUTO_LOCK" => "身份标识锁定之前允许PIN尝试出错次数 [修改该项需要客服人员修改发油台的配置]",
        "REGION_MAJOR_LANGUAGE" => "油库使用语言",
        "REPORT_OUTPUT_DOC_FOLDER" => "定义报表文件保存的文件夹",
        "CLOSEOUT_AUTO_CLOSE" => "盘点运行的时候冻结并关闭FOLIO",
        "CLOSEOUT_REP_GEN_AT_FREEZE" => "盘点进程冻结FOLIO的时候生成报表",
        "CLOSEOUT_REP_GEN_AT_CLOSE" => "盘点进程关闭FOLIO的时候生成报表",
        "HOST_COMM_MNTH_END" => "决定月底是否停止向主机系统发送油库数据",
        "ID_ADHOC_FLAG_ENABLED" => "用户是否可以在身份标识管理屏幕查看并修改临时车卡标志",
        "SITE_SHLS_REQ_DRVR" => "开票员是否需要为提单新增司机",
        "TRIPNUM_AS_PASSWORD" => "提单号由序列号和随机数组合以模拟提单密码",
        "SCHEDUNITS" => "发油计量单位是标准升还是视量升",
        "one_trip" => "设定一辆油罐车是否允许持有多张提单",
        "ld_qty_chk" => "置空",
        "ld_qty_err" => "置空",
        "OMEGA_DATETIME_FMT" => "系统默认日期时间格式",
        "SITE_OWNSHIP_UNIT" => "油库油品所有权计量单位编号",
        "OO__TO_ONE_TRIP" => "S:一个客户订单分配给一个提单; M:多个客户订单分配给一个提单",
        "SEAL_POSTFIX" => "油库封签后缀",
        "SEAL_PREFIX" => "油库封签前缀",
        "SEAL_NUMBER" => "下一个封签号",
        "SEAL_RANGE_SEPARATOR" => "封签范围分隔符",
        "SHLS_SEAL_FMT" => "封签格式：范围式(100024=26)或者分隔式(100024, 100025, 100026)",
        "SITE_AUDIT_SCREEN_ENABLED" => "是否启用审计管理屏幕",
        "SITE_AUTO_COMPLETE_TRANSACTOIN" => "自动终结发油进程",
        "SITE_MAX_TAGS" => "油库允许的身份识别标记卡数上限",
        "MONTHLY_REPORT_INCLUSIVE" => "月度总计报表是否包括该月之前开始该月中结束的FOLIO",
        "THIRD_PARTY_LOADING" => "第三方提油必须使用属于油库管理公司的开放客户订单",
        "LIVE_JOURNAL_SORT" => "显示实时日志记录时把最新发生的事件列在底部",
        "HOT_LITRE_SFL_FACTOR" => "油库范围生效的百分比，用以减少高温提油时的预设发油亮，有效数值：0.0 - 1.0。",
        "SAFEFILL_TOLERANCE_QTY" => "车辆安全容量允许误差数量 (0 - 10000 L)",
        "SAFEFILL_TOLERANCE_PERCENT" => "车辆安全容量允许误差百分比(0.00 - 100.00%)",
        "HOST_MESSAGING_IN_EDIT_ON" => "编辑接收信息",
        "HOST_MESSAGING_IN_SUBMIT_ON" => "提交接收信息",
        "HOST_MESSAGING_OUT_EDIT_ON" => "编辑发送信息",
        "HOST_MESSAGING_OUT_SUBMIT_ON" => "提交发送信息",
    );

    public function read()
    {
        if (isset($this->config_required_by_gui)) {
            $query = "SELECT *
                FROM SITE_CONFIG
                WHERE CONFIG_REQUIRED_BY_GUI = :config_required_by_gui
                ORDER BY CONFIG_KEY";
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':config_required_by_gui', $this->config_required_by_gui);
        } else {
            $query = "SELECT * FROM SITE_CONFIG 
                ORDER BY CONFIG_KEY";
            //    -- WHERE CONFIG_REQUIRED_BY_GUI IS NOT NULl
            $stmt = oci_parse($this->conn, $query);
        }
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        } else {
            return $stmt;
        }
    }

    //These fields are in SITE table
    public function check_existence()
    {
        if ($this->config_key === "SITE_NEXT_SEAL" ||
            $this->config_key === "SITE_AL_ADJ" ||
            $this->config_key === "SITE_CL_ADJ" ||
            $this->config_key === "SITE_KG_ADJ" ||
            $this->config_key === "SITE_LD_RETNPRD" ||
            $this->config_key === "SITE_EXP_MONTHS" ||
            $this->config_key === "SITE_LD_RETN_NEWLDS" ||
            $this->config_key === "SITE_LD_RETNPRD_NEW_MOV" ||
            $this->config_key === "SITE_SEAL_MODE" ||
            $this->config_key === "SITE_LD_RETNPRD_USED_MOV") {
            return true;
        }
        // These two settings are created by source code and do not exist in any tables
        // But need to pretend they exist first
        // Then do nothing when updating
        if ($this->config_key === "SITE_IDENTIFIER" ||
            $this->config_key === "SERVER_TIME_OFFSET" ) {
            // write_log("DB error1:" . $this->config_key."<<<<<<<<<<<<<<<<<<<<<<<", __FILE__, __LINE__, LogLevel::ERROR);
            return true;
        }
        return parent::check_existence();
    }

    //site_al_adj, site_cl_adj, site_kg_adj are in SITE table. 
    public function update() 
    {
        // These two settings are created by source code and do not exist in any tables
        // Do nothing when updating
        if ($this->config_key === "SITE_IDENTIFIER" ||
            $this->config_key === "SERVER_TIME_OFFSET" ) {
            // write_log("DB error:" . $this->config_key."<<<<<<<<<<<<<<<<<<<<<<<", __FILE__, __LINE__, LogLevel::ERROR);
            return true;
        }
    
        $this->commit_mode = OCI_NO_AUTO_COMMIT;

        if ($this->config_key === "SITE_NEXT_SEAL" ||
            $this->config_key === "SITE_AL_ADJ" ||
            $this->config_key === "SITE_CL_ADJ" ||
            $this->config_key === "SITE_KG_ADJ" ||
            $this->config_key === "SITE_LD_RETNPRD" ||
            $this->config_key === "SITE_EXP_MONTHS" ||
            $this->config_key === "SITE_LD_RETN_NEWLDS" ||
            $this->config_key === "SITE_LD_RETNPRD_NEW_MOV" ||
            $this->config_key === "SITE_SEAL_MODE" ||
            $this->config_key === "SITE_LD_RETNPRD_USED_MOV") {
            
            $query = "SELECT SITE_NEXT_SEAL, SITE_AL_ADJ, SITE_CL_ADJ, SITE_KG_ADJ, SITE_LD_RETNPRD, 
                SITE_EXP_MONTHS, SITE_LD_RETN_NEWLDS, SITE_LD_RETNPRD_NEW_MOV, SITE_LD_RETNPRD_USED_MOV,
                SITE_SEAL_MODE FROM SITE";
            $stmt = oci_parse($this->conn, $query);
            if (!oci_execute($stmt, $this->commit_mode)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                return false;
            } 
    
            $old_row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);

            $query = "UPDATE SITE SET " . $this->config_key . " = :new_adjustment";
            // write_log($query, __FILE__, __LINE__, LogLevel::ERROR);
            
            $stmt = oci_parse($this->conn, $query);
            oci_bind_by_name($stmt, ':new_adjustment', $this->config_value);
            
            if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
                $e = oci_error($stmt);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                
                $error = new EchoSchema(500, response("__UPDATE_FAILED__"));
                echo json_encode($error, JSON_PRETTY_PRINT);
                return false;
            }

            if ($old_row[$this->config_key] != $this->config_value) {
                $journal = new Journal($this->conn, false);
                $curr_psn = Utilities::getCurrPsn();
                $module = $this->VIEW_NAME;
                $record = "SITE";
                if (!$journal->valueChange(
                    $module, $record, $this->config_key, $old_row[$this->config_key], $this->config_value)) {
                    oci_rollback($this->conn);
                    return false;
                }
            }

            oci_commit($this->conn);
            return true;
        }
        return parent::update();
    }

    private function translate_chn(&$result_array)
    {
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);

        $lang = Utilities::getCurrLang();
        if ($lang !== 'CHN') {
            return;
        }

        foreach ($result_array as $key => $item) {
            // write_log($item['config_key'], __FILE__, __LINE__);
            if (array_key_exists($item['config_key'], $this->CNH_DESC)) {
                // write_log($this->CNH_DESC[$item['config_key']], __FILE__, __LINE__);
                $result_array[$key]['config_comment'] = $this->CNH_DESC[$item['config_key']];
            }
        }
    }

    public function read_decorate(&$result_array)
    {
        $query = "SELECT SITE_NEXT_SEAL, SITE_AL_ADJ, SITE_CL_ADJ, SITE_KG_ADJ, SITE_LD_RETNPRD, 
            SITE_EXP_MONTHS, SITE_LD_RETN_NEWLDS, SITE_LD_RETNPRD_NEW_MOV, SITE_LD_RETNPRD_USED_MOV,
            SITE_CODE, SITE_NAME,
            TZ_OFFSET(SESSIONTIMEZONE) SERVER_TIME_OFFSET,
            SYSDATE SERVER_TIME,
            SITE_SEAL_MODE
            FROM SITE";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, $this->commit_mode)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return;
        } 

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        array_push($result_array, array(
            "config_key" => "SITE_NEXT_SEAL",
            "config_value" => $row['SITE_NEXT_SEAL'],
            "config_comment" => response("__SITE_NEXT_SEAL__"),
            "config_required_by_gui" => "S",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_AL_ADJ",
            "config_value" => $row['SITE_AL_ADJ'],
            "config_comment" => response("__AMB_ADJUSTMENT__"),
            "config_required_by_gui" => "R",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_CL_ADJ",
            "config_value" => $row['SITE_CL_ADJ'],
            "config_comment" => response("__STD_ADJUSTMENT__"),
            "config_required_by_gui" => "R",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_KG_ADJ",
            "config_value" => $row['SITE_KG_ADJ'],
            "config_comment" => response("__MASS_ADJUSTMENT__"),
            "config_required_by_gui" => "R",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_LD_RETNPRD",
            "config_value" => $row['SITE_LD_RETNPRD'],
            "config_comment" => response("__LOAD_RETENTION__"),
            "config_required_by_gui" => "M",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_EXP_MONTHS",
            "config_value" => $row['SITE_EXP_MONTHS'],
            "config_comment" => response("__PERSONNEL_EXP_MONTHS__"),
            "config_required_by_gui" => "M",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_LD_RETN_NEWLDS",
            "config_value" => $row['SITE_LD_RETN_NEWLDS'],
            "config_comment" => response("__LOAD_NEW_RETENTION__"),
            "config_required_by_gui" => "M",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_LD_RETNPRD_NEW_MOV",
            "config_value" => $row['SITE_LD_RETNPRD_NEW_MOV'],
            "config_comment" => response("__LOAD_NEW_MOV_RETENTION__"),
            "config_required_by_gui" => "M",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_LD_RETNPRD_USED_MOV",
            "config_value" => $row['SITE_LD_RETNPRD_USED_MOV'],
            "config_comment" => response("__LOAD_MOV_RETENTION__"),
            "config_required_by_gui" => "M",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_SEAL_MODE",
            "config_value" => $row['SITE_SEAL_MODE'],
            "config_comment" => response("__SITE_SEAL_MODE__"),
            "config_required_by_gui" => "S",
            ));
        array_push($result_array, array(
            "config_key" => "SITE_IDENTIFIER",
            "config_value" => $row['SITE_CODE'] . "/" . $row['SITE_NAME'],
            "config_comment" => "",
            "config_required_by_gui" => "",
            ));
        array_push($result_array, array(
            "config_key" => "SERVER_TIME_OFFSET",
            "config_value" => $row['SERVER_TIME_OFFSET'],
            "config_comment" => "",
            "config_required_by_gui" => "",
            ));
        array_push($result_array, array(
            "config_key" => "SERVER_TIME",
            "config_value" => $row['SERVER_TIME'],
            "config_comment" => "",
            "config_required_by_gui" => "",
            ));
        
        $this->translate_chn($result_array);
    }
    
    public function read_by_key()
    {
        $query = "
            SELECT * FROM SITE_CONFIG WHERE CONFIG_KEY = :config_key
        ";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':config_key', $this->config_key);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
