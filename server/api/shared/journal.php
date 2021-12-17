<?php

include_once __DIR__ . '/../config/lookup.php';
include_once 'log.php';

//Also called JNL_TYPE in jnl.h
class JnlEvent
{
    const JNLT_ALL = 0;
    const JNLT_ORD = 1;
    const JNLT_SCHD = 2;
    const JNLT_LOAD = 3;
    const JNLT_BAY = 4;
    const JNLT_DELV = 5;
    const JNLT_PAY = 6;
    const JNLT_MOVE = 7;
    const JNLT_VEHI = 8;
    const JNLT_DOC = 9;
    const JNLT_FAIL = 10;
    const JNLT_CONF = 11;
    const JNLT_COMM = 12;
    const JNLT_ALRM = 13; /* incorrect procedure or malfunction events */
    const JNLT_SYS = 14;
    const JNLT_RSS = 15;
    const JNLT_SCAD = 16;
}

//Also called JNL_CATEGORY in jnl.h
class JnlClass
{
    const JNLC_DEBUG = 0;
    const JNLC_EVENT = 1;
    const JNLC_ERROR = 2;
    const JNLC_ALRM_CRITICAL = 3;
    const JNLC_ALRM_MAJOR = 4;
    const JNLC_ALRM_MINOR = 5;
    const JNLC_ALRM_WARNING = 6;
    const JNLC_ALRM_INCIDENT = 7;
    const JNLC_ALRM_OBS_CRITICAL = 8;
    const JNLC_ALRM_OBS_MAJOR = 9;
    const JNLC_ALRM_OBS_MINOR = 10;
    const JNLC_ALRM_OBS_WARNING = 11;
    const JNLC_ALRM_OBS_INCIDENT = 12;
}

class Journal
{
    private $conn;
    private $autoCommit;

    // the multilingual settings in V9
    private $langColumns;
	private $langMessages;
	private $langEnums;
	private $langColumnEnums;

    // Map of table name and view name
    private $tvmaps = array(
        "GUI_ALLOCATIONS" => "LOCKAL",
        "GUI_ALLOCATION_ITEMS" => "ALLOCS",
        "GUI_ALLOCATION_PERIODS" => "ALL_CHILD",
        "GUI_COMPANYS" => "COMPANYS",
        "GUI_PRODUCTS" => "PRODUCTS",
        "GUI_TANKS" => "TANKS",
        "GUI_REPORT_COMPANY" => "REPORT_CMPY",
        "GUI_REPORT_PROFILE" => "REPORT_FILES",
        "GUI_PERSONNEL" => "PERSONNEL",
        "EXPIRY_DATE_PERSONNEL" => "EXPIRY_DATE_DETAILS",
        "GUI_TANKERS" => "TANKERS",
        "EXPIRY_DATE_TANKERS" => "EXPIRY_DATE_DETAILS",
        "EXPIRY_DATE_TRANSP_EQUIP" => "EXPIRY_DATE_DETAILS",
        "AXLE_WEIGHT_LIMIT_LOOKUP_VW" => "AXLE_WEIGHT_LIMIT_LOOKUP",
        "TANK_BATCHES_VW" => "TANK_BATCHES",
        "TANK_OWNERS_VW" => "TK_OWNERS",
        "GUI_ACCESS_KEYS" => "ACCESS_KEYS"
    );

    //Mainly table name
    private $modules = array(
        "CHN" => array(
            "GUI_TANKS" => "油罐",
            "GUI_REPORT_COMPANY" => "可用报表设置配置",
            "GUI_REPORT_PROFILE" => "基础报表",
            "GUI_PERSONNEL" => "人员",
            "EXPIRY_DATE_PERSONNEL" => "人员有效期",
            "TIMECODE" => "班次",
            "PRINTER" => "物理打印机",
            "GUI_TANKERS" => "油槽车",
            "EXPIRY_DATE_TANKERS" => "油槽车有效期",
            "TRANSP_EQUIP" => "运输设备",
            "EXPIRY_DATE_TRANSP_EQUIP" => "运输设备有效期",
            "EXPIRY_DATE_TANKERS" => "油槽车有效期",
            "EXPIRY_DATE_PERSONNEL" => "人员有效期",
            "GUI_ACCESS_KEYS" => "标识密钥",
            "BASE_PRODS" => "基础油品",
            "EXPIRY_DATE_TYPES" => "有效期类型",
            "URBAC_ROLE_DOMAINS_PRIVILEGES" => "角色访问权限"
        ),
        "ENG" => array(
            "GUI_TANKS" => "Tank",
            "GUI_REPORT_COMPANY" => "Report Configuration",
            "GUI_REPORT_PROFILE" => "Report Profile",
            "GUI_PERSONNEL" => "Personnel",
            "EXPIRY_DATE_PERSONNEL" => "Personnel Expiry Date",
            "TIMECODE" => "Time Code",
            "PRINTER" => "Physical Printer",
            "GUI_TANKERS" => "Tanker",
            "EXPIRY_DATE_TANKERS" => "Tanker Expiry Date",
            "TRANSP_EQUIP" => "Equipment",
            "EXPIRY_DATE_TRANSP_EQUIP" => "Equipment Expiry",
            "EXPIRY_DATE_TANKERS" => "Tanker Expiry",
            "EXPIRY_DATE_PERSONNEL" => "Personnel Expiry",
            "GUI_ACCESS_KEYS" => "ID Assignment",
            "BASE_PRODS" => "Base Product",
            "EXPIRY_DATE_TYPES" => "Expiry Date Type",
            "URBAC_ROLE_DOMAINS_PRIVILEGES" => "Role Access Privilege"
        )
    );

    //Mainly fields in table
    private $keys = array(
        "CHN" => array(
            "GUI_TANKS" => array(
                "TANK_GAUGINGMTHD_DESC" => "测量方法",
                "TANK_ULLAGE" => "罐空余量",
                "TANK_API" => "API",
                "TANK_SG" => "比重",
                "TANK_15_DENSITY" => "密度",
                "TANK_SULPHUR" => "含硫率(重量%)",
                "TANK_FLASHPOINT" => "闪点",
                "TANK_STATUS_NAME" => "油罐状态",
                "TANK_HH_LEVEL" => "高高报警点液位",
                "TANK_H_LEVEL" => "高报警点液位",
                "TANK_L_LEVEL" => "低报警点液位",
                "TANK_LL_LEVEL" => "低低报警点液位",
                "TANK_UH_LEVEL" => "用户高报警点液位",
                "TANK_UL_LEVEL" => "用户低报警点液位",
                "TANK_AMB_VOL" => "视量容积",
                "TANK_PROD_C_OF_E" => "校正系数",
                "TANK_PROD_LVL" => "油品液位",
                "TANK_COR_VOL" => "标量容积",
                "TANK_LEAKDTCT_ON" => "泄露监测",
                "TANK_BASE" => "油罐油品代码",
                "TANK_TEMP" => "视温度",
                "TANK_LIQUID_KG" => "油品重量",
                "TANK_DENSITY" => "标准密度",
                "TANK_INSTANCE" => "设备使用口号码",
                "TANK_DRV_TYPE" => "界面类型",
                "TANK_CHANNEL" => "通讯频道",
                "TANK_ADDRESS" => "油罐地址",
                "TANK_DRV_AUX" => "电子地址",
                "TANK_POLL_GAP" => "轮询间隔(秒)",
                "TANK_IDENTIFIER" => "测量标识号",
            ),
            "GUI_PERSONNEL" => array(
                "PER_NAME" => "人员名称",
                "PER_LOCK" => "锁定",
                "PER_DEPARTMENT" => "部门",
                "PER_LICENCE_NO" => "司机执照",
                "PER_COMMENTS" => "备注",
                "PT_TIMECD" => "班次",
                "USER_STATUS_FLAG" => "用户状态",
                "PER_CMPY" => "雇主",
                "CMPY_NAME" => "雇主",
                "PER_EMAIL" => "电子邮件",
            ),
            "EXPIRY_DATE_DETAILS" => array(

            ),
            "TIMECODE" => array(
                "TCD_MON" => "星期一",
                "TCD_TUE" => "星期二",
                "TCD_WED" => "星期三",
                "TCD_THU" => "星期四",
                "TCD_FRI" => "星期五",
                "TCD_SAT" => "星期六",
                "TCD_SUN" => "星期日",
            ),
            "PRINTER" => array(
                "SYS_PRNTR" => "系统/物理打印机",
                "AREA_NAME" => "区域地点",
                "PRNTR_LOCK" => "锁定",
                "PRNTR_AREA" => "打印机区域",
            ),
            "GUI_TANKERS" => array(
                "ADJ_CMPT_LOCK" => "油仓锁定状态",
                "TNKR_LOCK" => "油槽车锁定标志",
                "TNKR_ACTIVE" => "油槽车激活标志",
                "TNKR_MAX_KG" => "最大重量",
                "TNKR_BAY_LOOP_CH" => "发油台检查标志",
                "TNKR_NTRIPS" => "总提单数",
                "STATS" => "油槽车状态",
                "LAST_TRIP" => "最近提单",
                "TNKR_NAME" => "油槽车名称",
                "TNKR_PIN" => "密码",
                "TNKR_ARCHIVE" => "油槽车归档标志",
                "REMARKS" => "备注",
                "TNKR_OWN_TXT" => "提示",
            ),
            "TRANSP_EQUIP" => array(
                "EQPT_TITLE" => "运输设备名称",
                "EQPT_LOCK" => "锁定标志",
                "EQPT_EMPTY_KG" => "空仓重量",
                "EQP_MUST_TARE_IN" => "预称重标志",
                "EQPT_MAX_GROSS" => "车头承重",
                "EQPT_COMMENTS" => "备注",
                "EQPT_AREA" => "运输设备区域",
                "EQPT_LOAD_TYPE" => "装载方式",
            ),
            "GUI_ACCESS_KEYS" => array(
                "KYA_LOCK" => "锁定标志",
                "KYA_TIMECD" => "标识班次",
                "KYA_TXT" => "标识序列码",
                "KYA_ADHOC" => "临时标识",
                "KYA_PSN" => "标识人员",
                "KYA_ROLE" => "标识角色",
                "KYA_DRAWER" => "油品调配商",
                "KYA_TANKER" => "油槽车",
                "KYA_EQUIPMENT" => "运输设备",
                "KYA_SP_SUPPLIER" => "供应商",
                "KYA_PHYS_NAME" => "标识物理类型",
            ),
            "BASE_PRODS" => array(
                "BASE_NAME" => "基础油品名称",
                "BASE_PROD_GROUP" => "基础油品分组",
                "BASE_CORR_MTHD" => "校准方式",
                "BASE_REF_TEMP" => "参照温度",
                "BASE_DENS_HI" => "基础油品密度上限",
                "BASE_DENS_LO" => "基础油品密度下限",
                "BASE_CAT" => "基础油品类别",
                "BASE_REF_TUNT" => "报表温度单位",
                "BASE_LIMIT_PRESET_HT" => "高温车容预检标志",
                "BASE_REF_TEMP_SPEC" => "参照温度种类",
            ),
            "EXPIRY_DATE_TYPES" => array(
                "EDT_TIME_ENABLED" => "编辑时间允许标志",
                "EDT_STATUS" => "类别启用标志",
                "EDT_REJECT" => "拒绝授权标志",
                "EDT_DEFAULT" => "系统默认标志",
                "EDT_TYPE_DESC" => "有效期类别描述",
                "EDT_DEF_EXP_DATE" => "默认有效期值",
            ),
            "PRMSSN_RC" => array (
                "PRMSSN_NAME" => "许可权限名称",
                "RULE_CASE" => "许可权限规则类别",
                "RULE_ETYP" => "运输设备类型",
                "RULE_AUTH" => "授权级别",
                "RULE_EXPIRY_CHECK" => "检查有效期标志"
            ),
            "URBAC_ROLE_DOMAINS_PRIVILEGES" => array(
                "PRIV_VIEW" => "查看权限",
                "PRIV_CREATE" => "新增权限",
                "PRIV_UPDATE" => "修改权限",
                "PRIV_DELETE" => "删除权限",
                "PRIV_PROTECT" => "密码保护",
                "PRIV_EXTRA" => "额外权限",
                "PRIV_SCHEDPROD" => "调度油品权限",
                "PRIV_FREEZEFOLIO" => "结束/冻结预盘权限",
            )
        ),
        "ENG" => array(
            "GUI_TANKS" => array(
                "TANK_GAUGINGMTHD_DESC" => "gauging method",
                "TANK_ULLAGE" => "ullage",
                "TANK_API" => "API",
                "TANK_SG" => "specific gravity",
                "TANK_15_DENSITY" => "density",
                "TANK_SULPHUR" => "sulphur(wt%)",
                "TANK_FLASHPOINT" => "flash point",
                "TANK_STATUS_NAME" => "tank status",
                "TANK_HH_LEVEL" => "HH",
                "TANK_H_LEVEL" => "H",
                "TANK_L_LEVEL" => "L",
                "TANK_LL_LEVEL" => "LL",
                "TANK_UH_LEVEL" => "user H",
                "TANK_UL_LEVEL" => "user L",
                "TANK_AMB_VOL" => "AMB volume",
                "TANK_PROD_C_OF_E" => "Exp.Coeff",
                "TANK_PROD_LVL" => "product level",
                "TANK_COR_VOL" => "std volume",
                "TANK_LEAKDTCT_ON" => "leak detection",
                "TANK_BASE" => "product code",
                "TANK_TEMP" => "observed temperature",
                "TANK_LIQUID_KG" => "liquid mass",
                "TANK_DENSITY" => "density",
                "TANK_INSTANCE" => "instance",
                "TANK_DRV_TYPE" => "interface type",
                "TANK_CHANNEL" => "channel",
                "TANK_ADDRESS" => "register offset",
                "TANK_DRV_AUX" => "auxiliary",
                "TANK_POLL_GAP" => "poll interval",
                "TANK_IDENTIFIER" => "identifer for gauge",
            ),
            "GUI_PERSONNEL" => array(
                "PER_NAME" => "name",
                "PER_LOCK" => "lock out",
                "PER_DEPARTMENT" => "department",
                "PER_LICENCE_NO" => "driver license no.",
                "PER_COMMENTS" => "comments",
                "PT_TIMECD" => "time code",
                "USER_STATUS_FLAG" => "status",
                "PER_CMPY" => "employer",
                "CMPY_NAME" => "employer",
                "PER_EMAIL" => "personnel email",
            ),
            "EXPIRY_DATE_DETAILS" => array(

            ),
            "TIMECODE" => array(
                "TCD_MON" => "Monday",
                "TCD_TUE" => "Thuesday",
                "TCD_WED" => "Wednesday",
                "TCD_THU" => "Thursday",
                "TCD_FRI" => "Friday",
                "TCD_SAT" => "Saturday",
                "TCD_SUN" => "Sunday",
            ),
            "PRINTER" => array(
                "SYS_PRNTR" => "system/physical printer",
                "AREA_NAME" => "area location",
                "PRNTR_LOCK" => "lock",
                "PRNTR_AREA" => "printer area",
            ),
            "GUI_TANKERS" => array(
                "ADJ_CMPT_LOCK" => "compartment lock status",
                "TNKR_LOCK" => "lock status",
                "TNKR_ACTIVE" => "active status",
                "TNKR_MAX_KG" => "max kg",
                "TNKR_BAY_LOOP_CH" => "bay check status",
                "TNKR_NTRIPS" => "total trips",
                "STATS" => "status",
                "LAST_TRIP" => "last trip",
                "TNKR_NAME" => "name",
                "TNKR_PIN" => "pin",
                "TNKR_ARCHIVE" => "archive status",
                "REMARKS" => "comments",
                "TNKR_OWN_TXT" => "tanker prompt",
            ),
            "TRANSP_EQUIP" => array(
                "EQPT_TITLE" => "title",
                "EQPT_LOCK" => "lock",
                "EQPT_EMPTY_KG" => "empty weight",
                "EQP_MUST_TARE_IN" => "tare_in status",
                "EQPT_MAX_GROSS" => "pulling limit",
                "EQPT_COMMENTS" => "comments",
                "EQPT_AREA" => "area",
                "EQPT_LOAD_TYPE" => "load type",
            ),
            "GUI_ACCESS_KEYS" => array(
                "KYA_LOCK" => "lock status",
                "KYA_TIMECD" => "time code",
                "KYA_TXT" => "tag",
                "KYA_ADHOC" => "adhoc",
                "KYA_PSN" => "personnel",
                "KYA_ROLE" => "role",
                "KYA_DRAWER" => "drawer",
                "KYA_TANKER" => "tanker",
                "KYA_EQUIPMENT" => "equipment",
                "KYA_SP_SUPPLIER" => "supplier",
                "KYA_PHYS_NAME" => "physical type",
            ),
            "BASE_PRODS" => array(
                "BASE_NAME" => "base name",
                "BASE_PROD_GROUP" => "product group",
                "BASE_CORR_MTHD" => "correction method",
                "BASE_REF_TEMP" => "reference temperature",
                "BASE_DENS_HI" => "density high",
                "BASE_DENS_LO" => "density low",
                "BASE_CAT" => "classification",
                "BASE_REF_TUNT" => "base ref tunt",
                "BASE_LIMIT_PRESET_HT" => "limit preset high temp",
                "BASE_REF_TEMP_SPEC" => "ref temp spec",
            ),
            "EXPIRY_DATE_TYPES" => array(
                "EDT_TIME_ENABLED" => "enabled",
                "EDT_STATUS" => "status",
                "EDT_REJECT" => "reject authorization",
                "EDT_DEFAULT" => "default flag",
                "EDT_TYPE_DESC" => "type description",
                "EDT_DEF_EXP_DATE" => "default value",
            ),
            "PRMSSN_RC" => array (
                "PRMSSN_NAME" => "permission name",
                "RULE_CASE" => "permission rule class",
                "RULE_ETYP" => "equipment type",
                "RULE_AUTH" => "authority type",
                "RULE_EXPIRY_CHECK" => "expiry check"
            ),
            "URBAC_ROLE_DOMAINS_PRIVILEGES" => array(
                "PRIV_VIEW" => "View Privilege",
                "PRIV_CREATE" => "Create Privilege",
                "PRIV_UPDATE" => "Update Privilege",
                "PRIV_DELETE" => "Delete Privilege",
                "PRIV_PROTECT" => "Password",
                "PRIV_EXTRA" => "Extra Privilege",
                "PRIV_SCHEDPROD" => "Schedule Product",
                "PRIV_FREEZEFOLIO" => "Close/Freeze Folio",
            )
        )
    );

    //Mainly site configuration
    private $siteConfigs = array(
        "CHN" => array(
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
            "CLOSEOUT_AUTO_CLOSE" => "盘点运行的时候冻结并关闭预盘",
            "CLOSEOUT_REP_GEN_AT_FREEZE" => "盘点进程冻结预盘的时候生成报表",
            "CLOSEOUT_REP_GEN_AT_CLOSE" => "盘点进程关闭预盘的时候生成报表",
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
            "SITE_AFC_ARM_PRIORITY" => "油库范围适应性鹤管优先级(LILO/LIFO)",
            "SITE_USE_ADAPTIVE_FLOW_CONTROL" => "启用适应性油品流动控制",
            "MONTHLY_REPORT_INCLUSIVE" => "月度总计报表是否包括该月之前开始该月中结束的FOLIO",
            "THIRD_PARTY_LOADING" => "第三方提油必须使用属于油库管理公司的开放客户订单",
            "LIVE_JOURNAL_SORT" => "显示实时日志记录时把最新发生的事件列在底部",
            "HOT_LITRE_SFL_FACTOR" => "油库范围生效的百分比，用以减少高温提油时的预设发油量，有效数值：0.0 - 1.0。",
            "SAFEFILL_TOLERANCE_QTY" => "车辆安全容量允许误差数量 (0 - 10000 L)",
            "SAFEFILL_TOLERANCE_PERCENT" => "车辆安全容量允许误差百分比(0.00 - 100.00%)",
            "HOST_MESSAGING_IN_EDIT_ON" => "编辑接收信息",
            "HOST_MESSAGING_IN_SUBMIT_ON" => "提交接收信息",
            "HOST_MESSAGING_OUT_EDIT_ON" => "编辑发送信息",
            "HOST_MESSAGING_OUT_SUBMIT_ON" => "提交发送信息",
            "SITE_USE_SG" => "启用油罐比重字段",
            "SITE_USE_ADAPTIVE_FLOW_CONTROL" => "启用适应性油品流动控制",
            "SITE_USE_SHLS_SPEC_INS" => "启用提单特殊指令字段",
            "SITE_USE_SAFEFILL_ONLY" => "只用油仓安全容量",
            "SITE_USE_AXLE_WEIGHT_LIMIT" => "启用车轴承重上限检查",
            "AXLE_WEIGHT_LIMIT_TYPE" => "油库车轴承重上限类型",
        ),
        "ENG" => array(
            "AIR_BUOYANCY_FACTOR" => "Air Buoyancy",
            "ARCHIVE_CMPY_CODE" => "The company code for archived trips.",
            "BOL_DN_FORCE_EMAIL" => "",
            "BOL_DN_PROCESS_CONTROL" => "Whether to view or print BOL/DN separately",
            "BOL_DN_TEMPLATE_GUI_ENABLED" => "Enable BOL/Delivery Note Template Screen.",
            "BOL_VERSION" => "",
            "CLOSEOUT_AUTO_CLOSE" => "Freeze and close folio when closeout runs.",
            "CLOSEOUT_CSV_REPORTS" => "CSV report flag for closeout",
            "DRIVER_PIN_AUTO_EXPIRE" => "PIN must be changed every X days: ",
            "DRIVER_PIN_AUTO_LOCK" => "Lock Card after X incorrect PIN attempts [Updating this requires CCC to update config at the BAY]:",
            "HOST_COMM_IN_MSG_AGE_DAYS" => "Parameter to define number for days for incoming message acceptability criteria.",
            "HOST_COMM_MNTH_END" => "Its about month end and stop sending details to host",
            "HOST_MESSAGING_IN_EDIT_ON" => "Edit incoming messages",
            "HOST_MESSAGING_IN_SUBMIT_ON" => "Submit incoming messages",
            "HOST_MESSAGING_OUT_EDIT_ON" => "Edit outgoing messages",
            "HOST_MESSAGING_OUT_SUBMIT_ON" => "Submit outgoing messages",
            "HOT_LITRE_SFL_FACTOR" => "Site-wide percentage to be used to reduce preset for hot litres, valid range [0.0 - 1.0]",
            "ID_ADHOC_FLAG_ENABLED" => "allow the user to view and update the KYA_ADHOC flag in ID Assignment screen",
            "LIMIT_TO_SERVER_DATETIME" => "DEFAULT TIME TO SERVER OR LOCAL CLIENT PC",
            "LIVE_JOURNAL_SORT" => "Show Live Journal results with the latest at bottom",
            "MONTHLY_REPORT_INCLUSIVE" => "Whether accumulative monthly report includes the folio that stride the start of the calendar month.",
            "OMEGA_DATETIME_FMT" => "application default datetime format",
            "OO_TO_ONE_TRIP" => "S: allow single open order in one trip; M: allow multiple open orders in one trip",
            "REGION_CPP_DATEMONTH_FORMAT" => "%b/%Y|%m/%Y|%Y-%m",
            "REGION_CPP_DATEONLY_FORMAT" => "%d/%b/%Y|%d/%m/%Y|%Y-%m-%d",
            "REGION_CPP_DATETIME_FORMAT" => "%d/%b/%Y %H:%M:%S|%d/%m/%Y %H:%M:%S|%Y-%m-%d %H:%M:%S|%Y年%m月%d日 %H:%M:%S",
            "REGION_CPP_DATEWEEK_FORMAT" => "%W/%Y|%Y,%W",
            "REGION_DB_DATEMONTH_FORMAT" => "MON/YYYY|MM/rrrr|rrrr-MM",
            "REGION_DB_DATEONLY_FORMAT" => "DD/MON/YYYY|dd/MM/rrrr|rrrr-MM-dd",
            "REGION_DB_DATETIME_FORMAT" => "DD/MON/YYYY hh24:mi:ss|dd/MM/rrrr hh24:mi:ss|rrrr-MM-dd hh24:mi:ss|YYYY年MM月DD日 hh24:mi:ss",
            "REGION_DB_DATEWEEK_FORMAT" => "WW/rrrr|YYYY,WW",
            "REGION_MAJOR_LANGUAGE" => "The language used by the site",
            "REPORT_OUTPUT_DOC_FOLDER" => "the folder where the report output file is saved",
            "SAFEFILL_TOLERANCE_PERCENT" => "Safefill Tolerance Percentage (0.00 - 100.00%)",
            "SAFEFILL_TOLERANCE_QTY" => "Safefill Tolerance Quantity (0 - 10000 L)",
            "SCHD_RESET_DRIVER" => "Y - Omega allow to update driver on non-authorised schedule; Otherwise N not allowed.",
            "SCHEDUNITS" => "either corercted litres or ambient litres loading",
            "SEALNUM_SOURCE" => "Count of Seal:EXTERNAL(from Seals Assignment screen manually), Otherwise(from eqp type definition)",
            "SEAL_POSTFIX" => "Site seals suffix",
            "SEAL_PREFIX" => "Site seals prefix",
            "SEAL_RANGE_SEPARATOR" => "Character to be used in Seal Number range",
            "SHLS_SEAL_FMT" => "Schedule-SHLS_SEAL_NO format: RANGE(100234=36) vs NULL(100234,100235,100236)",
            "SITE_2FA_DOMAINS" => "Approved domains for Two-factor authentication email",
            "SITE_2FA_ENABLED" => "Two-factor authentication flag",
            "SITE_2FA_TIMEOUT" => "Timeout for Two-factor authentication code",
            "SITE_ADDRESS_TEMPLATE" => "Set the default template for address details if it is not null.",
            "SITE_AUDIT_RETENTION" => "Site audit retention period.(Month)",
            "SITE_AUDIT_SCREEN_ENABLED" => "Determine whether the Audit screen is enabled.",
            "SITE_AUTO_COMPLETE_TRANSACTION" => "",
            "SITE_AUTO_COMPLETE_TRANSACTOIN" => "Auto complete loading process",
            "SITE_AUTO_FILTER_WHEN_OPEN_SCREEN" => "determine if auto filtering is allowed when screen opens",
            "SITE_CANCEL_LOAD_ENABLED" => "Site Level, Load cancellation, Y-Enabled N-Disabled",
            "SITE_CLEAR_FILTER_BLANK" => "determine if the date range will be cleared or reset to default value",
            "SITE_CMPT_DOR_NUMBER_EDITABLE" => "The Host DOR number can be updated in load schedule compartment.",
            "SITE_COMPANY_RELATION_ALLOWED" => "Determine whether the Company Relation screen is enabled.",
            "SITE_COMPANY_RELATION_CHILD_ROLES" => "The default child company roles available to choose",
            "SITE_COMPANY_RELATION_PARENT_ROLES" => "The default parent company roles available to choose",
            "SITE_DATETIME_FORMAT" => "The default date time format for Frontend",
            "SITE_DEFAULT_DATERANGE_ALLOCATION" => "The default date ranges in allocation. X~~Y: X days before today, Y days after today. -1: blank ",
            "SITE_DEFAULT_DATERANGE_AUDIT" => "The default date ranges in audit reporting. X~~Y: X days before today, Y days after today. -1: blank ",
            "SITE_DEFAULT_DATERANGE_CUSTORDER" => "The default date ranges in open orders. X~~Y: X days before today, Y days after today. -1: blank ",
            "SITE_DEFAULT_DATERANGE_JOURNAL" => "The default date ranges in live journals. X~~Y: X days before today, Y days after today. -1: blank ",
            "SITE_DEFAULT_DATERANGE_NOMINATION" => "The default date ranges in movement nominations screen. X~~Y: X days before today, Y days after today. -1: blank ",
            "SITE_DEFAULT_DATERANGE_SCHEDULE" => "The default date ranges in load schedules screen. X~~Y: X days before today, Y days after today. -1: blank ",
            "SITE_DEFAULT_DATERANGE_TRANSACTION" => "The default date ranges in transactions. X~~Y: X days before today, Y days after today. -1: blank ",
            "SITE_DEFAULT_EQPT_EXPIRY" => "determine the default expiry date for equipment",
            "SITE_DEFAULT_PRECISION_ADDITIVE" => "Additive Precision",
            "SITE_DEFAULT_PRECISION_API" => "API Precision",
            "SITE_DEFAULT_PRECISION_DENSITY" => "Density Precision",
            "SITE_DEFAULT_PRECISION_LEVEL" => "Level Precision",
            "SITE_DEFAULT_PRECISION_MASS" => "Mass Quantity Precision",
            "SITE_DEFAULT_PRECISION_SG" => "SG Precision",
            "SITE_DEFAULT_PRECISION_TEMPERATURE" => "Temperature Precision",
            "SITE_DEFAULT_PRECISION_VOLUME" => "Volume Quantity Precision",
            "SITE_DEFAULT_TIME_LENGTH" => "The length of time string. 3: HH, 6: HH:MM, 9: HH:MM:SS",
            "SITE_DEFAULT_TIME_STRING" => "default time part if the datetime value has date part only",
            "SITE_DEFAULT_TNKR_EXPIRY" => "determine the default expiry date for tankers",
            "SITE_DOR_HISTORY_AVAILABLE" => "Enable the Additional Host DOR screen.",
            "SITE_DOR_NUMBER_EDITABLE" => "The Host DOR number can be updated in load schedule screen.",
            "SITE_DOR_NUMBER_VISIBLE" => "Show Host DOR number in load schedule screen.",
            "SITE_EXPIRY_DATE_MANAGE_MODE" => "1: Legacy Expiry Date only; 2: New Generic Expiry Date Types; 3: Both",
            "SITE_EXTERNAL_BLENDING_ALLOWED" => "Determine whether it is requred to determine base product quantities based on recipes when blending is performed externally.",
            "SITE_IDASSN_DUPLICATE" => "determine if id assignemnt allows duplicated key number for different issuers",
            "SITE_ISOTAINER_ENABLED" => "Site Level, Isotainer/Container field, Y-Enabled N-Disabled",
            "SITE_JOURNAL_RETENTION" => "Site journal retention period.(Month)",
            "SITE_LOAD_SAFEFILL_CHECK_BY_HIGHTEMP" => "Determine whether it is requred to check the capacity limiting of loads.",
            "SITE_MAX_SEALS_PER_CMPT" => "the maximum number of seals allowed in a compartment",
            "SITE_MAX_TAGS" => "Maximum number of tags allowed on site",
            "SITE_MOVEMENTS_REV_ENABLED" => "Site Level, Movements Rev/Repost Y-Enabled N-Not",
            "SITE_NOM_FILTER_BY_EXPIRY" => "determine if nominations are filtered by expired after date or effective from date",
            "SITE_OO_ASSN_FROM_SCHD_CMPT" => "determine if user can access open order screen from load schedules screen",
            "SITE_OO_FILTER_BY_EXPIRY" => "determine if open order is filtered by expiry date or ordered date",
            "SITE_ORDER_LISTING_CLOSE_ALL_LOADS_VISIBLE" => "The visible flag for Close All Loads button in Order Listing screen",
            "SITE_ORDER_LISTING_RESET_ORDER_VISIBLE" => "The visible flag for Reset Order button in Order Listing screen",
            "SITE_OWNSHIP_UNIT" => "Site product ownership unit id",
            "SITE_PARTNERSHIP_ENABLED" => "Enable Partners and Partnership.",
            "SITE_PRICING_ENABLED" => "Enable Pricing related screens.",
            "SITE_RAIL_TANK_AVAILABLE" => "Determine whether eqipment type can have rail tank car.",
            "SITE_RIGID_SHIP_AVAILABLE" => "Determine whether eqipment type can have rigid ship.",
            "SITE_SCHD_ARCHIVE_ENABLED" => "Site Level, Schedule Rev/Repost Y-Enabled N-Not",
            "SITE_SCHD_REV_REPOST_ENABLED" => "Site Level, Schedule Rev/Repost Y-Enabled N-Not",
            "SITE_SHLS_REQ_DRVR" => "dispatcher require to add the driver to schedule",
            "SITE_TANK_STATUS_ENFORCEMENT_FLAG" => "The Tank Status Enforcement flag",
            "SITE_TKRCODE_LEN_LIMIT" => "If Y tanker code length max 20 chars; N then max 40 chars",
            "SITE_AFC_ARM_PRIORITY" => "Site-wide Arm Priority for all arms (LILO/LIFO)",
            "SITE_USE_ADAPTIVE_FLOW_CONTROL" => "Use Adaptive Flow Control",
            "SITE_USE_LSI" => "Load Security Info in Manual Transactions",
            "SITE_USE_SEAL" => "Site Level, whether security seal is used on site",
            "SITE_USE_WEIGHBRIDGE" => "Site Level, whether weighbridge is used on site",
            "SLP_EXPIRY_CODE_PERSONNEL" => "SLP mapping for PERSONNEL expiry",
            "SLP_EXPIRY_CODE_VEHICLE" => "SLP mapping for VEHICLE expiry",
            "THIRD_PARTY_LOADING" => "3rd party loads must authorise against a site manager open order.",
            "TRIPNUM_AS_PASSWORD" => "make trip num with combination of sequential number and randome number",
            "URBAC_AUTO_LOGOFF" => "Inactive session time out (Minutes):",
            "URBAC_PWD_AUTO_EXPIRE" => "Personnel Password expires after X number of days:",
            "URBAC_PWD_AUTO_LOCK" => "Lock Personnel account after X incorrect password attempts:",
            "URBAC_PWD_COMPLEXITY" => "Select a password complexity level(FOR NEW PASSWORDS ONLY):",
            "URBAC_PWD_LEN_MAX" => "Maximum Personnel password length required (FOR NEW PASSWORDS ONLY):",
            "URBAC_PWD_LEN_MIN" => "Minimum Personnel password length required (FOR NEW PASSWORDS ONLY):",
            "URBAC_PWD_REUSE" => "X number of previous passwords cannot be re-used by the Personnel:",
            "URBAC_PWD_UPD_INTERVAL" => "Minutes before Personnel can change their password again:",
            "URBAC_SESSION_PER_USER" => "Maximum Number of concurrent sessions permitted by the system:",
            "URBAC_USER_AUTO_DELETE" => "Delete unused Personnel after X number of days:",
            "URBAC_USER_AUTO_LOCK" => "Lock unused Personnel after X number of days:",
            "ld_qty_chk" => "",
            "ld_qty_err" => "",
            "one_trip" => "to set if one tanker allow multiple trips or not",
            "SITE_USE_SG" => "Enable tank specific gravity field",
            "SITE_USE_ADAPTIVE_FLOW_CONTROL" => "Enable Adaptive Flow Control",
            "SITE_USE_SHLS_SPEC_INS" => "Use special instruction in load schedules",
            "SITE_USE_SAFEFILL_ONLY" => "Use the safefill only",
            "SITE_USE_AXLE_WEIGHT_LIMIT" => "Enable the axle weight limit check",
            "AXLE_WEIGHT_LIMIT_TYPE" => "Site Axle Weight Limit Type",
        )
    );

    //Fields that do not count in valueChange.
    private $fields_excluded = array(
        // "GUI_ACCESS_KEYS" => array("KYA_ROLE", "KYA_TYPE", "KYA_KEY_CREATED", "KYA_PHYS_TYPE"),
        "GUI_ACCESS_KEYS" => array("KYA_KEY_CREATED"),
        "TRANSP_EQUIP" => array("EQPT_LAST_MODIFIED"),
        "GUI_TANKERS" => array("TNKR_LAST_MODIFIED"),
        "GUI_PERSONNEL" => array("PER_LAST_MODIFIED"),
        "GUI_COMPANYS" => array("SITE_MANAGER", "SUPPLIER", "CARRIER", "CUSTOMER", "DRAWER", "ISSUER", "EMPLOYER", "HOST"),
        "SITE_CONFIG" => array("CONFIG_COMMENT", "CONFIG_REQUIRED_BY_GUI", "CONFIG_VAL_LAST_CHG"),
    );

    // constructor with $db as database connection
    public function __construct($db, $autocommit = true)
    {
        $this->conn = $db;
        $this->autoCommit = $autocommit;

        $this->getJournalSettings();
    }

    private function getJournalSettings()
    {
        // $langClnFile = __DIR__ . "/../config/langColumns.json";
        $langClnFile = dirname(__FILE__) . "/../config/langColumns.json";
		$jsonColumns = file_get_contents($langClnFile);
		// convert json to an associated array
		$this->langColumns = json_decode( $jsonColumns, true );
		
		$langMsgFile = dirname(__FILE__) . "/../config/langMessages.json";
		$jsonMessages = file_get_contents($langMsgFile);
		// convert json to an associated array
		$this->langMessages = json_decode( $jsonMessages, true );
		
		$langEnumFile = dirname(__FILE__) . "/../config/langEnums.json";
		$jsonEnums = file_get_contents($langEnumFile);
		// convert json to an associated array
		$this->langEnums = json_decode( $jsonEnums, true );
		
		$langClnEnumFile = dirname(__FILE__) . "/../config/langColumnEnums.json";
		$jsonClnEnums = file_get_contents($langClnEnumFile);
		// convert json to an associated array
		$this->langColumnEnums = json_decode( $jsonClnEnums, true );

    }

    private function getLanguages()
    {
        $query = "
			select 
				LANG_ID, LANG_NAME
			from 
				LANG_TYP
        ";
        $stmt = oci_parse($this->conn, $query);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            return null;
        }

        $rows = array();
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $rows[$row['LANG_ID']] = $row;
        }

        return $rows;
    }
	
	private function getValueFromTable($src_name, $cln_lang, $cln_inpt, $cln_otpt, $in_lang, $in_value)
	{
		$query = "";
		if ( $cln_lang === 'NA' ) {
			$query = "
				select 
					$cln_otpt
				from 
					$src_name
				where 
					1=1
					and $cln_inpt = :in_value
			";
		} else {
			$query = "
				select 
					$cln_otpt
				from 
					$src_name
				where 
					1=1
					and $cln_inpt = :in_value
					and $cln_lang = :in_lang
			";
        }
        
        $stmt = oci_parse($this->conn, $query);
			
		if ( $cln_lang === 'NA' ) {
            oci_bind_by_name($stmt, ':in_value', $in_value);
        } else {
            oci_bind_by_name($stmt, ':in_value', $in_value);
            oci_bind_by_name($stmt, ':in_lang', $in_lang);
        }

        $str = $in_value;

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            return $str;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row !== FALSE) {
            $str = $row[$cln_otpt];
        }

        return $str;
    } 
	
	private function getValueFromEnum($src_name, $cln_lang, $cln_inpt, $cln_otpt, $in_lang, $in_value)
	{
        $query = "
			select 
				$cln_otpt
			from 
			(
				select
					mlu.LANG_ID		as $cln_lang
					, eit.ENUMTYPENAME	as ENUM_TYPE
					, eit.ENUM_NO		as $cln_inpt
					, mlu.MESSAGE 		as $cln_otpt
				from 
					ENUMITEM		eit
					, MSG_LOOKUP	mlu
				where 
					eit.ENUM_TMM = mlu.MSG_ID
			)
			where 
				1=1
				and ENUM_TYPE = :enum_type
				and $cln_lang = :enum_lang
				and $cln_inpt = :enum_no
		";
        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':enum_type', $src_name);
        oci_bind_by_name($stmt, ':enum_lang', $in_lang);
        oci_bind_by_name($stmt, ':enum_no', $in_value);

        $str = $in_value;

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            return $str;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row !== FALSE) {
            $str = $row[$cln_otpt];
        }

        return $str;
    } 
	
	private function getBinaryValueFromEnum($src_name, $cln_lang, $cln_inpt, $cln_otpt, $in_lang, $in_value)
	{
        $query = "
			select 
				LISTAGG($cln_otpt, ',') WITHIN group (order by $cln_inpt) as $cln_otpt
			from 
			(
				select
					mlu.LANG_ID		as $cln_lang
					, eit.ENUMTYPENAME	as ENUM_TYPE
					, eit.ENUM_NO		as $cln_inpt
					, mlu.MESSAGE 		as $cln_otpt
				from 
					ENUMITEM		eit
					, MSG_LOOKUP	mlu
				where 
					eit.ENUM_TMM = mlu.MSG_ID
			)
			where 
				1=1
				and ENUM_TYPE = :enum_type
				and $cln_lang = :enum_lang
				and BITAND(POWER(2,$cln_inpt), :enum_no)>0
			group by ENUM_TYPE, $cln_lang
		";
        
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':enum_type', $src_name);
        oci_bind_by_name($stmt, ':enum_lang', $in_lang);
        oci_bind_by_name($stmt, ':enum_no', $in_value);

        $str = $in_value;

        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            return $str;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        if ($row !== FALSE) {
            $str = $row[$cln_otpt];
        }

        return $str;
    } 

	private function mapColumnValue( $cln_src, $lang_code, $value )
	{
		// check if the column has enum type
		// possible settings:
		// 1. 'NA'
		// 2. 'ENUM_TYPE_NAME'
		// 3. 'ENUM|ENUM_TYPE_NAME|LANG_OPTION|INP_CLN|OUT_CLN'
		// 4. 'TABLE|TABLE_NAME|LANG_OPTION|INP_CLN|OUT_CLN'
		// 5. 'ENUMBIT|ENUM_TYPE_NAME|LANG_OPTION|INP_CLN|OUT_CLN'
		$map_value = "";
		if ( $cln_src === 'NA' ) {
            // 1. 'NA': Not enum type, the value is directly used
			$map_value = $value;
		} else {
			if ( strpos( $cln_src, '|' ) === FALSE ) {
                // 2. 'ENUM_TYPE_NAME': look up the enum value from array langEnums
				$map_value = $this->langEnums[$lang_code][$cln_src]['NO__'.$value];
			} else {
                // multiple parameters
				$arr = explode( '|', $cln_src );
				if ( count($arr) !== 5 ) {
                    // Not match to any patterns, the value is directly used
					$map_value = $value;
				} else {
					$src_type = $arr[0];
					$src_name = $arr[1];
					$cln_lang = $arr[2];
					$cln_inpt = $arr[3];
					$cln_otpt = $arr[4];
					if ( $src_type === 'ENUM' ) {
		                // 3. 'ENUM|ENUM_TYPE_NAME|LANG_OPTION|INP_CLN|OUT_CLN'
						$map_value = $this->getValueFromEnum($src_name, $cln_lang, $cln_inpt, $cln_otpt, $lang_code, $value);
					}
					else if ( $src_type === 'TABLE' ) {
                        // 4. 'TABLE|TABLE_NAME|LANG_OPTION|INP_CLN|OUT_CLN'
						$map_value = $this->getValueFromTable($src_name, $cln_lang, $cln_inpt, $cln_otpt, $lang_code, $value);
					}
					else if ( $src_type === 'ENUMBIT' ) {
                        // 5. 'ENUMBIT|ENUM_TYPE_NAME|LANG_OPTION|INP_CLN|OUT_CLN'
						$map_value = $this->getBinaryValueFromEnum($src_name, $cln_lang, $cln_inpt, $cln_otpt, $lang_code, $value);
					} else {
                        // Not match to any patterns, the value is directly used
						$map_value = $value;
					}
				}
			}
		}
        write_log(sprintf("[%s:%s:%s] mapColumnValue", $cln_src, $value, $map_value),
        __FILE__, __LINE__, LogLevel::WARNING);

		if ( $value !== $map_value ) {
            if ($map_value != "" && $map_value != null) {
                $map_value = $value . '::' . $map_value;
            } else {
                $map_value = $value;
            }
		}
		
		return $map_value;
	}

    private function getUserName($user_code)
    {
        $query = "SELECT PER_NAME FROM PERSONNEL WHERE PER_CODE = :user_code";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':user_code', $user_code);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            return $user_code;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['PER_NAME'];
    }

    private function getEventStr($jnl_event, $lang)
    {
        $query = "SELECT B.MESSAGE
            FROM ENUMITEM A,MSG_LOOKUP B
            WHERE B.MSG_ID = A.ENUM_TMM
                AND ENUMTYPENAME = 'JNL_EVENT'
                AND ENUM_NO = :enum_no
                AND LANG_ID = :lang";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':enum_no', $jnl_event);
        oci_bind_by_name($stmt, ':lang', $lang);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['MESSAGE'];
    }

    private function getClassStr($jnl_class, $lang)
    {
        $query = "SELECT B.MESSAGE
            FROM ENUMITEM A,MSG_LOOKUP B
            WHERE B.MSG_ID = A.ENUM_TMM
                AND ENUMTYPENAME = 'JNL_CLASS'
                AND ENUM_NO = :enum_no
                AND LANG_ID = :lang";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':enum_no', $jnl_class);
        oci_bind_by_name($stmt, ':lang', $lang);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            return null;
        }

        $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        return $row['MESSAGE'];
    }

    private function translate_primary_key_identifier($identifier, $lang, $tbl) {
        if (!isset($identifier)) {
            return "";
        }

        $new_id = "";
        $items = explode(', ', $identifier);
        foreach ($items as $item) {
            $pairs = explode(':', $item);
            if (count($pairs) >= 2) {
                $key = strtoupper($pairs[0]);
                $value = $pairs[1];
                // translate the key
                $new_key = $key;
                if (isset($this->langColumns[$lang][$tbl][$key])) {
                    $new_key = $this->langColumns[$lang][$tbl][$key];
                }
                $new_value = "";
                if ($tbl == "SITE_CONFIG") {
                    $new_value = $this->siteConfigs[$lang][$value];
                }
                if ($new_value == "") {
                    $new_id .= $new_key . ':' . $value . ', ';
                } else {
                    $new_id .= $new_key . ':' . $value . '(' . $new_value . '), ';
                }
            } else {
                $new_id .= $item . ', ';
            }
        }

        return rtrim($new_id, ', ');
    }

    private function jnlLogEvent2($template, $data, $jnl_event, $jnl_class)
    {
        $query = "SELECT MESSAGE, LANG_ID FROM MSG_LOOKUP 
            WHERE MSG_ID = :msg_id AND LANG_ID IN (SELECT LANG_ID from LANG_TYP)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':msg_id', $template);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
        // $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $template_str = $row['MESSAGE'];
            $lang = $row['LANG_ID'];

            $hit = 0;
            $message = "";
            for ($i = 0; $i < strlen($template_str); $i++) {
                if ($template_str[$i] === '%') {
                    if ($hit === 1 && (
                        $template == Lookup::RECORD_ALTERED
                        || $template == Lookup::RECORD_ADD
                        || $template == Lookup::RECORD_DELETE
                    )) {
                        if (isset($this->modules[$data[1]])) {
                            $data[1] = $this->modules[$data[1]];
                        }
                    }
                    $message = $message . $data[$hit];
                    $hit += 1;
                } else {
                    $message = $message . $template_str[$i];
                }
            }
            write_log("Write journal: " . $message, __FILE__, __LINE__, LogLevel::INFO);
            
            $jnl_event_str = $this->getEventStr($jnl_event, $lang);
            $jnl_class_str = $this->getClassStr($jnl_class, $lang);
            
            $query = "INSERT INTO SITE_JOURNAL
                    (GEN_DATE,
                    REGION_CODE,
                    COMPANY_CODE,
                    MSG_EVENT,
                    MSG_CLASS,
                    MESSAGE,
                    SEQ)
            SELECT SYSDATE,
                    :lang,
                    SITE_MNGR,
                    :jnl_event,
                    :jnl_class,
                    :message,
                    JOURNAL_SEQ.NEXTVAL
            FROM SITE";
            $stmt2 = oci_parse($this->conn, $query);

            oci_bind_by_name($stmt2, ':lang', $lang);
            oci_bind_by_name($stmt2, ':jnl_event', $jnl_event_str);
            oci_bind_by_name($stmt2, ':jnl_class', $jnl_class_str);
            oci_bind_by_name($stmt2, ':message', $message);

            if ($this->autoCommit) {
                $mode = OCI_COMMIT_ON_SUCCESS;
            } else {
                $mode = OCI_NO_AUTO_COMMIT;
            }

            if (!oci_execute($stmt2, $mode)) {
                $e = oci_error($stmt2);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                write_log("Failed to write journal", __FILE__, __LINE__);
                oci_free_statement($stmt);
                return false;
            }
        }

        return true;
    }

    /*
        RECORD_ADDED      22	CHN	[%] 新增 [%] 记录 [%]: [%]
        RECORD_ADDED      22	ENG	[%] added [%] record with [%]: [%] 
        RECORD_CHANGED    23	CHN	[%] 改变 [%] 记录 [%] [%] [%] 到 [%]
        RECORD_CHANGED    23	ENG	[%] changed [%] of record [%] with [%]  [%] to [%] 
        RECORD_DELETED    24	CHN	[%] 删除 [%] 记录 [%]: [%]
        RECORD_DELETED    24	ENG	[%] deleted [%] record with [%]: [%] 
        RECORD_ALTERED  1872	CHN	[%] 修改 [%] 记录 [%]
        RECORD_ALTERED  1872	ENG	[%] altered [%] record [%]
        RECORD_ADD      1873	CHN	[%] 新增 [%] 记录 [%]
        RECORD_ADD      1873	ENG	[%] added [%] record [%]
        RECORD_DELETE   1874	CHN	[%] 删除 [%] 记录 [%]
        RECORD_DELETE   1874	ENG	[%] deleted [%] record [%]

        RECORD_ADDED:   0 - User, 1 - Table, 2 - Record Key, 3 - Record Details
        RECORD_CHANGED: 0 - User, 1 - Table, 2 - Record Key, 3 - Changed Column, 4 - Old Value, 5 - New Value
        RECORD_DELETED: 0 - User, 1 - Table, 2 - Record Key, 3 - Record Details
        RECORD_ALTERED: 0 - User, 1 - Table, 2 - Record Key
        RECORD_ADD:     0 - User, 1 - Table, 2 - Record Key
        RECORD_DELETE:  0 - User, 1 - Table, 2 - Record Key
        
    */
    //For example: RECORD_ALTERED, userTxt, recordnmTxt, keyTxt
    public function jnlLogEvent($template, $data, $jnl_event, $jnl_class)
    {
        if ($template !== Lookup::RECORD_ALTERED
            && $template !== Lookup::RECORD_ADD
            && $template !== Lookup::RECORD_DELETE
            && $template !== Lookup::RECORD_ADDED
            && $template !== Lookup::RECORD_DELETED
            && $template !== Lookup::RECORD_CHANGED) {
            return $this->jnlLogEvent2($template, $data, $jnl_event, $jnl_class);
        }

        $query = "SELECT MESSAGE, LANG_ID FROM MSG_LOOKUP 
            WHERE MSG_ID = :msg_id AND LANG_ID IN (SELECT LANG_ID from LANG_TYP)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':msg_id', $template);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $curr_user = $this->getUserName($data[0]);
        $curr_table = $data[1];
        if (isset($this->tvmaps[$data[1]])) {
            $curr_table = $this->tvmaps[$data[1]];
        }
        
        $msg_data = array();
        // $row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS);
        while ($row = oci_fetch_array($stmt, OCI_ASSOC + OCI_RETURN_NULLS)) {
            $template_str = $row['MESSAGE'];
            $lang = $row['LANG_ID'];

            $hit = 0;
            $message = "";
            for ($i = 0; $i < strlen($template_str); $i++) {
                if ($template_str[$i] === '%') {
                    if (!isset($data[$hit])) {
                        $data[$hit] = "";
                    }

                    $msg_data[$hit] = $data[$hit];
                    if ($hit === 0) {
                        $msg_data[0] = $curr_user;
                    }
                    
                    if ($hit === 1 && (
                        $template == Lookup::RECORD_ALTERED
                        || $template == Lookup::RECORD_ADD
                        || $template == Lookup::RECORD_DELETE
                        || $template == Lookup::RECORD_ADDED
                        || $template == Lookup::RECORD_DELETED
                        || $template == Lookup::RECORD_CHANGED
                    )) {
                        if (isset($this->modules[$lang][$data[1]])) {
                            $msg_data[1] = $this->modules[$lang][$data[1]];
                        } else {
                            if (isset($this->langMessages[$lang]["SCREENS"][$curr_table])) {
                                $msg_data[1] = $this->langMessages[$lang]["SCREENS"][$curr_table];
                            }
                        }
                    }

                    if ($hit === 2) {
                        $msg_data[2] = $this->translate_primary_key_identifier($data[2], $lang, $curr_table);
                    }

                    if ($hit === 3 && (
                        $template == Lookup::RECORD_ADDED
                        || $template == Lookup::RECORD_DELETED
                    )) {
                        $msg_data[3] = $this->translate_primary_key_identifier($data[3], $lang, $curr_table);
                    }

                    if ($template == Lookup::RECORD_CHANGED) {
                        $curr_column = strtoupper($data[3]);
                        // 0: user, 1: table/view, 2: record key, 3: column, 4: orig value, 5: new value
                        if ($hit === 3) {
                            if (isset($this->keys[$lang][$data[1]][$curr_column])) {
                                $msg_data[3] = $this->keys[$lang][$data[1]][$curr_column];
                            } else {
                                if (isset($this->langColumns[$lang][$curr_table][$curr_column])) {
                                    $msg_data[3] = $this->langColumns[$lang][$curr_table][$curr_column];
                                }
                            }
                        }
                        if ($hit === 4) {
                            $cln_src = $this->langColumnEnums[$curr_table][$curr_column];
							$msg_data[4] = $this->mapColumnValue($cln_src, $lang, $data[4]);
                        }
                        if ($hit === 5) {
                            $cln_src = $this->langColumnEnums[$curr_table][$curr_column];
							$msg_data[5] = $this->mapColumnValue($cln_src, $lang, $data[5]);
                        }
                    }
                    $message = $message . $msg_data[$hit];
                    $hit += 1;
                } else {
                    $message = $message . $template_str[$i];
                }
            }
            write_log("Write journal: " . $message, __FILE__, __LINE__, LogLevel::INFO);
            
            $jnl_event_str = $this->getEventStr($jnl_event, $lang);
            $jnl_class_str = $this->getClassStr($jnl_class, $lang);
            
            $query = "INSERT INTO SITE_JOURNAL
                    (GEN_DATE,
                    REGION_CODE,
                    COMPANY_CODE,
                    MSG_EVENT,
                    MSG_CLASS,
                    MESSAGE,
                    SEQ)
            SELECT SYSDATE,
                    :lang,
                    SITE_MNGR,
                    :jnl_event,
                    :jnl_class,
                    :message,
                    JOURNAL_SEQ.NEXTVAL
            FROM SITE";
            $stmt2 = oci_parse($this->conn, $query);

            oci_bind_by_name($stmt2, ':lang', $lang);
            oci_bind_by_name($stmt2, ':jnl_event', $jnl_event_str);
            oci_bind_by_name($stmt2, ':jnl_class', $jnl_class_str);
            oci_bind_by_name($stmt2, ':message', $message);

            if ($this->autoCommit) {
                $mode = OCI_COMMIT_ON_SUCCESS;
            } else {
                $mode = OCI_NO_AUTO_COMMIT;
            }

            if (!oci_execute($stmt2, $mode)) {
                $e = oci_error($stmt2);
                write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
                write_log("Failed to write journal", __FILE__, __LINE__);
                oci_free_statement($stmt);
                return false;
            }
        }

        return true;
    }

    public function tryMe()
    {
        return;
    }

    /*
    use RECORD_ADDED % added % record with %: %
    Example [DKI_SUPER_USER] added [personnel area access control] record with [personnel code: cw3]: [area name:test]
     */
    // public function valueAdd($term, $record, $value)
    // {
    //     $jnl_data[0] = Utilities::getCurrPsn();
    //     $jnl_data[1] = $term;
    //     $jnl_data[2] = $record;
    //     $jnl_data[3] = $value;

    //     if (!$this->jnlLogEvent(
    //         Lookup::RECORD_ADDED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT))
    //     {
    //         write_log("DB error:" . (oci_error($stmt))['message'], __FILE__, __LINE__, LogLevel::ERROR);
    //         return false;
    //     }

    //     return true;
    // }

    //Call valueChange() to journal all the value changes. Normally in an update.
    public function updateChanges($set_old, $set_new, $module, $record)
    {
        write_log(sprintf("%s::%s START. module:%s, record:%s", __CLASS__, __FUNCTION__, $module, $record),
            __FILE__, __LINE__);

        // write_log(json_decode($set_new), __FILE__, __LINE__);
        // write_log(json_decode($set_old), __FILE__, __LINE__);

        foreach ($set_new as $key => $value) {
            // write_log(sprintf("%s::%s LOOP. key:%s, value:%s", __CLASS__, __FUNCTION__, $key, $value),
            // __FILE__, __LINE__);
            if (array_key_exists($module, $this->fields_excluded) &&
                in_array(strtoupper($key), $this->fields_excluded[$module])) {
                continue;
            }

            if ($value != $set_old[strtoupper($key)]) {
                if (!$this->valueChange(
                    $module, $record, $key, $set_old[strtoupper($key)], $value)) {
                    oci_rollback($this->conn);
                    return false;
                }
            }
        }

        return true;
    }

    /* Use RECORD_CHANGED to write a journal indicating value changes
    % changed % of record % with % % to %
    Sample: [DKI_SUPER_USER] changed [Terminal] of record [1] with [URBAC_PWD_LEN_MAX] [19] to [20]
    Parameters
    module: CGI module, indicates in which the change happens, or TABLE name
    record: mainly table primary key and a string identifying the table record
    term: which item (field) of this record has been changed, or KEY name
    orig_value:
    new_value:
    For example:
    [DKI_SUPER_USER] changed [Tank status] of record [code:T1] with [gauging method]  [MANUAL] to [AUTOMATIC]
    $module == Tank status
    $record == code:T1
    $term == "gauging method"
     */
    public function valueChange($module, $record, $term, $orig_value, $new_value)
    {
        write_log(sprintf("%s::%s START. module:%s, record:%s, term:%s, orig:%s, new:%s",
            __CLASS__, __FUNCTION__, $module, $record, $term, $orig_value, $new_value),
            __FILE__, __LINE__);

        if (array_key_exists($module, $this->fields_excluded) &&
            in_array(strtoupper($term), $this->fields_excluded[$module])) {
            return true;
        }
        if ($orig_value === $new_value) {
            return true;
        }

        $jnl_data[0] = Utilities::getCurrPsn();
        $jnl_data[1] = $module; // do lookup when logging journal by the language
        /* if (isset($this->modules[$module])) {
            $jnl_data[1] = $this->modules[$module];
        } else {
            $jnl_data[1] = $module;
        } */

        $jnl_data[2] = $record;

        $jnl_data[3] = $term; // do lookup when logging journal by the language
        /* if (isset($this->keys[$module][strtoupper($term)])) {
            $jnl_data[3] = $this->keys[$module][strtoupper($term)];
        } else {
            $jnl_data[3] = $term;
            write_log(sprintf("[%s:%s] not defined in journal::keys, use term instead", $module, $term),
                __FILE__, __LINE__, LogLevel::WARNING);
        } */

        $jnl_data[4] = $orig_value;
        if (strlen($jnl_data[4]) > 200) {
            $jnl_data[4] = substr($orig_value, 0, 200) . " ...";
        }
        $jnl_data[5] = $new_value;
        if (strlen($jnl_data[5]) > 200) {
            $jnl_data[5] = substr($new_value, 0, 200) . " ...";
        }

        if (!$this->jnlLogEvent(
            Lookup::RECORD_CHANGED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }
}
