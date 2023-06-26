<?php

include_once __DIR__ . '/../shared/journal.php';
include_once __DIR__ . '/../shared/log.php';
include_once 'common_class.php';

class SiteConfig extends CommonClass
{
    public $create_in_update = true;
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
        "SITE_DEFAULT_PRECISION_ADDITIVE" => "添加剂数值精度",
        "SITE_DEFAULT_PRECISION_API" => "API数值精度",
        "SITE_DEFAULT_PRECISION_DENSITY" => "密度数值精度",
        "SITE_DEFAULT_PRECISION_LEVEL" => "液位数值精度",
        "SITE_DEFAULT_PRECISION_MASS" => "重量数值精度",
        "SITE_DEFAULT_PRECISION_SG" => "比重数值精度",
        "SITE_DEFAULT_PRECISION_TEMPERATURE" => "温度数值精度",
        "SITE_DEFAULT_PRECISION_VISCOSITY" => "粘度数值精度",
        "SITE_DEFAULT_PRECISION_VOLUME" => "体积数值精度",
        "SITE_MAXLEN_BASECODE" => "基础油品代码最大长度(9~20)",
        "SITE_MAXLEN_CMPYCODE" => "公司代码最大长度(8~16)",
        "SITE_MAXLEN_CUSTACCT" => "客户账号代码最大长度(20~40)",
        "SITE_MAXLEN_EMAIL" => "电子邮件地址最大长度(64~512)",
        "SITE_MAXLEN_EQPTCODE" => "运输设备代码最大长度(20~40)",
        "SITE_MAXLEN_ORDREFCODE" => "客户订单参考代码最大长度(16~32)",
        "SITE_MAXLEN_PRODCODE" => "调配油品代码最大长度(9~36)",
        "SITE_MAXLEN_PSNLCODE" => "人员代码最大长度(6~12)",
        "SITE_MAXLEN_SLP" => "SLP ID/VIN编号最大长度(40~120)",
        "SITE_MAXLEN_TANKCODE" => "油罐代码最大长度(10~24)",
        "SITE_MAXLEN_TNKRCODE" => "油槽车代码最大长度(20~40)",
        "SITE_CUSTOM_COLUMN_SCHEDULE" => "在发油提单管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_CUSTORDER" => "在客户订单管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_NOMINATION" => "在大宗货单管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_NOMSCHEDULE" => "在大宗货单提单管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_SPECMOVEMENT" => "在特殊货单交易管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_PRODMOVEMENT" => "在油品出入库管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_TRNSLIST" => "在油品交易明细屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_EQPTTYPE" => "在运输设备类型管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_EQPTLIST" => "在运输设备管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_TNKRLIST" => "在油槽车管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_TANKSTATUS" => "在油罐状态查看屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_SITEBALANCE" => "在库存平衡查看屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_TANKSTOCK" => "在油罐存油量查看屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_PRODSTOCK" => "在油品存货量查看屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_PERSONNEL" => "在人员信息管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_IDASSIGN" => "在标识密钥管理管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_BASEPROD" => "在基础油品管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_DRAWPROD" => "在调配油品管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_COMPANYS" => "在公司管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_ALLOCATION" => "在油品配额管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_CUSTOMERS" => "在客户管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_DLVRYLOC" => "在配送地点管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_PARTNERS" => "在合作伙伴管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_PARTNERSHIP" => "在合作伙伴关系管理屏幕启用可定制化表列",
        "SITE_CUSTOM_COLUMN_TANKCONFIG" => "在油罐配置管理屏幕启用可定制化表列",
        "SITE_TYPE_UNTICK_CHECK" => "当任何公司类型被取消选择时检查该类型的公司是否拥有子记录",
        "SITE_TYPE_UNTICK_CHECK_1MANAGER" => "当油库管理公司类型被取消选择时检查该类型的公司是否拥有子记录",
        "SITE_TYPE_UNTICK_CHECK_2SUPPLIER" => "当供应商公司类型被取消选择时检查该类型的公司是否拥有子记录",
        "SITE_TYPE_UNTICK_CHECK_3CARRIER" => "当承运商公司类型被取消选择时检查该类型的公司是否拥有子记录",
        "SITE_TYPE_UNTICK_CHECK_4CUSTOMER" => "当客户公司类型被取消选择时检查该类型的公司是否拥有子记录",
        "SITE_TYPE_UNTICK_CHECK_5DRAWER" => "当油品调配公司类型被取消选择时检查该类型的公司是否拥有子记录",
        "SITE_TYPE_UNTICK_CHECK_6ISSUER" => "当标识发放公司类型被取消选择时检查该类型的公司是否拥有子记录",
        "SITE_TYPE_UNTICK_CHECK_7EMPLOYER" => "当雇主公司类型被取消选择时检查该类型的公司是否拥有子记录",
        "SITE_TYPE_UNTICK_CHECK_8HOST" => "当上级公司类型被取消选择时检查该类型的公司是否拥有子记录",
        "SITE_TYPE_UNTICK_FORCED" => "允许用户在某类型的公司拥有子记录的情况下仍然可以强行取消公司的类型",
        "SITE_USE_STAGING_BAY" => "启用/禁用单据组合发油台在油库的使用",
        "SITE_CMPY_LOAD_OPTIONS_DEFAULT" => "当启用单据组合发油台时，公司提油方式(普通提单/组合提单，基于公司类型)的默认值",
        "SITE_CMPY_LOAD_OPTIONS_EDITABLE" => "当启用单据组合发油台时，公司提油方式(普通提单/组合提单，基于公司类型)的可编辑开关",
        "SITE_PICKUP_TRIP_START" => "油库范围内组合提单的默认起始单号",
        "SITE_PICKUP_TRIP_END" => "油库范围内组合提单的默认终止单号",
        "SITE_LIST_PICKUP_LOAD" => "显示/隐藏发油提单列表中的组合提单",
    );

    private $ENG_DESC = array(
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
        "SITE_DEFAULT_PRECISION_VISCOSITY" => "Viscosity Precision",
        "SITE_DEFAULT_PRECISION_VOLUME" => "Volume Quantity Precision",
        "SITE_MAXLEN_BASECODE" => "Base Product Code Maximum Length (9~20)",
        "SITE_MAXLEN_CMPYCODE" => "Company Code Maximum Length (8~16)",
        "SITE_MAXLEN_CUSTACCT" => "Customer Account Maximum Length (20~40)",
        "SITE_MAXLEN_EMAIL" => "Email Address Maximum Length (64~512)",
        "SITE_MAXLEN_EQPTCODE" => "Equipment Code Maximum Length (20~40)",
        "SITE_MAXLEN_ORDREFCODE" => "Order Reference Code Maximum Length (16~32)",
        "SITE_MAXLEN_PRODCODE" => "Drawer Product Code Maximum Length (9~36)",
        "SITE_MAXLEN_PSNLCODE" => "Personnel Code Maximum Length (6~12)",
        "SITE_MAXLEN_SLP" => "SLP ID/VIN Number Maximum Length (40~120)",
        "SITE_MAXLEN_TANKCODE" => "Tank Code Maximum Length (10~24)",
        "SITE_MAXLEN_TNKRCODE" => "Tanker Code Maximum Length (20~40)",
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
        "SITE_CUSTOM_COLUMN_SCHEDULE" => "Enable the customisable columns in the page Load Schedules",
        "SITE_CUSTOM_COLUMN_CUSTORDER" => "Enable the customisable columns in the page Order Listing",
        "SITE_CUSTOM_COLUMN_NOMINATION" => "Enable the customisable columns in the page Movement Nomination",
        "SITE_CUSTOM_COLUMN_NOMSCHEDULE" => "Enable the customisable columns in the page Nomination Schedules",
        "SITE_CUSTOM_COLUMN_SPECMOVEMENT" => "Enable the customisable columns in the page Special Movement",
        "SITE_CUSTOM_COLUMN_PRODMOVEMENT" => "Enable the customisable columns in the page Product Movement",
        "SITE_CUSTOM_COLUMN_TRNSLIST" => "Enable the customisable columns in the page Transaction List",
        "SITE_CUSTOM_COLUMN_EQPTTYPE" => "Enable the customisable columns in the page Equipment Types",
        "SITE_CUSTOM_COLUMN_EQPTLIST" => "Enable the customisable columns in the page Equipment List",
        "SITE_CUSTOM_COLUMN_TNKRLIST" => "Enable the customisable columns in the page Tanker List",
        "SITE_CUSTOM_COLUMN_TANKSTATUS" => "Enable the customisable columns in the page Tank Status",
        "SITE_CUSTOM_COLUMN_SITEBALANCE" => "Enable the customisable columns in the page Site Balance",
        "SITE_CUSTOM_COLUMN_TANKSTOCK" => "Enable the customisable columns in the page Tank Inventory",
        "SITE_CUSTOM_COLUMN_PRODSTOCK" => "Enable the customisable columns in the page Product Inventory",
        "SITE_CUSTOM_COLUMN_PERSONNEL" => "Enable the customisable columns in the page Personnel",
        "SITE_CUSTOM_COLUMN_IDASSIGN" => "Enable the customisable columns in the page ID Assignment",
        "SITE_CUSTOM_COLUMN_BASEPROD" => "Enable the customisable columns in the page Base Products",
        "SITE_CUSTOM_COLUMN_DRAWPROD" => "Enable the customisable columns in the page Drawer Products",
        "SITE_CUSTOM_COLUMN_COMPANYS" => "Enable the customisable columns in the page Companies",
        "SITE_CUSTOM_COLUMN_ALLOCATION" => "Enable the customisable columns in the page Allocations",
        "SITE_CUSTOM_COLUMN_CUSTOMERS" => "Enable the customisable columns in the page Customers",
        "SITE_CUSTOM_COLUMN_DLVRYLOC" => "Enable the customisable columns in the page Delivery Locations",
        "SITE_CUSTOM_COLUMN_PARTNERS" => "Enable the customisable columns in the page Partners",
        "SITE_CUSTOM_COLUMN_PARTNERSHIP" => "Enable the customisable columns in the page Partnership",
        "SITE_CUSTOM_COLUMN_TANKCONFIG" => "Enable the customisable columns in the page Tank Configuration",
        "SITE_TYPE_UNTICK_CHECK" => "Check if the type of company has the child records when any of types is unticked",
        "SITE_TYPE_UNTICK_CHECK_1MANAGER" => "Check if the SITE MANAGER company has the child records when the SITE MANAGER type is unticked",
        "SITE_TYPE_UNTICK_CHECK_2SUPPLIER" => "Check if the SUPPLIER company has the child records when the SUPPLIER type is unticked",
        "SITE_TYPE_UNTICK_CHECK_3CARRIER" => "Check if the CARRIER company has the child records when the CARRIER type is unticked",
        "SITE_TYPE_UNTICK_CHECK_4CUSTOMER" => "Check if the CUSTOMER company has the child records when the CUSTOMER type is unticked",
        "SITE_TYPE_UNTICK_CHECK_5DRAWER" => "Check if the DRAWER company has the child records when the DRAWER type is unticked",
        "SITE_TYPE_UNTICK_CHECK_6ISSUER" => "Check if the ISSUER company has the child records when the ISSUER type is unticked",
        "SITE_TYPE_UNTICK_CHECK_7EMPLOYER" => "Check if the EMPLOYER company has the child records when the EMPLOYER type is unticked",
        "SITE_TYPE_UNTICK_CHECK_8HOST" => "Check if the HOST company has the child records when the HOST type is unticked",
        "SITE_TYPE_UNTICK_FORCED" => "Allow the user to untick the type even if the type of company has the child records",
        "SITE_USE_STAGING_BAY" => "Enable the Staging Bay for the site",
        "SITE_CMPY_LOAD_OPTIONS_DEFAULT" => "The default value of the company load options when Staging Bay enabled",
        "SITE_CMPY_LOAD_OPTIONS_EDITABLE" => "The editibility of company load options when Staging Bay enabled",
        "SITE_PICKUP_TRIP_START" => "Default start trip number for pickup load at site level",
        "SITE_PICKUP_TRIP_END" => "Default end trip number for pickup load at site level",
        "SITE_LIST_PICKUP_LOAD" => "Show/Hide Pickup Loads in Load Schedule list",
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
            $this->config_key === "SITE_SHLS_EXP_H" ||
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
            $this->config_key === "SITE_SHLS_EXP_H" ||
            $this->config_key === "SITE_AL_ADJ" ||
            $this->config_key === "SITE_CL_ADJ" ||
            $this->config_key === "SITE_KG_ADJ" ||
            $this->config_key === "SITE_LD_RETNPRD" ||
            $this->config_key === "SITE_EXP_MONTHS" ||
            $this->config_key === "SITE_LD_RETN_NEWLDS" ||
            $this->config_key === "SITE_LD_RETNPRD_NEW_MOV" ||
            $this->config_key === "SITE_SEAL_MODE" ||
            $this->config_key === "SITE_LD_RETNPRD_USED_MOV") {
            
            $query = "SELECT SITE_CODE, SITE_NEXT_SEAL, SITE_SHLS_EXP_H, SITE_AL_ADJ, SITE_CL_ADJ, SITE_KG_ADJ, SITE_LD_RETNPRD, 
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
                // $module = $this->VIEW_NAME;
                // $record = "SITE";
                $module = "SITE";
                $record = sprintf("site_code:%s", $old_row['SITE_CODE']);
                if (!$journal->valueChange(
                    $module, $record, $this->config_key, $old_row[$this->config_key], $this->config_value)) {
                    oci_rollback($this->conn);
                    return false;
                }
            }

            oci_commit($this->conn);
            return true;
        }

        if ($this->config_key === "SITE_AFC_ARM_PRIORITY") {
            $this->update_base_arm_priorities($this->config_key, $this->config_value);
        }

        // Now call the parent function to update settings in SITE_CONFIG
        // We need to unset the config_comment because it should not be changed in any circumstances.
        unset($this->config_comment);
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

    private function translate_by_lang(&$result_array)
    {
        // write_log(sprintf("%s::%s() START", __CLASS__, __FUNCTION__),
        //     __FILE__, __LINE__);

        $lang = Utilities::getCurrLang();
        if ($lang === 'CHN') {
            foreach ($result_array as $key => $item) {
                // write_log($item['config_key'], __FILE__, __LINE__);
                if (array_key_exists($item['config_key'], $this->CNH_DESC)) {
                    // write_log($this->CNH_DESC[$item['config_key']], __FILE__, __LINE__);
                    $result_array[$key]['config_comment'] = $this->CNH_DESC[$item['config_key']];
                }
            }
        }
        if ($lang === 'ENG') {
            foreach ($result_array as $key => $item) {
                // write_log($item['config_key'], __FILE__, __LINE__);
                if (array_key_exists($item['config_key'], $this->ENG_DESC)) {
                    // write_log($this->ENG_DESC[$item['config_key']], __FILE__, __LINE__);
                    $result_array[$key]['config_comment'] = $this->ENG_DESC[$item['config_key']];
                }
            }
        }

    }

    public function read_decorate(&$result_array)
    {
        $query = "SELECT SITE_NEXT_SEAL, SITE_SHLS_EXP_H, SITE_AL_ADJ, SITE_CL_ADJ, SITE_KG_ADJ, SITE_LD_RETNPRD, 
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
            "config_key" => "SITE_SHLS_EXP_H",
            "config_value" => $row['SITE_SHLS_EXP_H'],
            "config_comment" => response("__SITE_TRIP_EXPIRY_HOURS__"),
            "config_required_by_gui" => "R",
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
        
        $this->translate_by_lang($result_array);
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

    // need update arm priority value in all base products to the site-wide setting
    protected function update_base_arm_priorities($key, $value)
    {
        // check if the flag is turned on

        $query = "
            UPDATE BASE_PRODS 
            SET AFC_PRIORITY = :arm_priority 
            WHERE 1=1
        ";
        write_log(
            sprintf("%s::%s BASE_PRODS. key:%s, value:%s", __CLASS__, __FUNCTION__, 
                $key, $value),
            __FILE__, __LINE__
        );
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':arm_priority', $value);
        if (!oci_execute($stmt)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            // $error = new EchoSchema(500, response("__INTERNAL_ERROR__", "Internal Error: " . $e['message']));
            // echo json_encode($error, JSON_PRETTY_PRINT);
            return false;
        };

        return true;
    }

    public function decimalThousandOperator()
    {
        $query = "SELECT * FROM SITE_CONFIG WHERE CONFIG_KEY = 'SITE_DEC_TH_SEPERATORS'";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }

    public function get_server_data()
    {
        $query = "
            SELECT 
                TZ_OFFSET(SESSIONTIMEZONE) SERVER_TIME_OFFSET,
                SYSDATE SERVER_TIME
            FROM DUAL 
        ";
        $stmt = oci_parse($this->conn, $query);
        if (oci_execute($stmt, $this->commit_mode)) {
            return $stmt;
        } else {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }
    }
}
