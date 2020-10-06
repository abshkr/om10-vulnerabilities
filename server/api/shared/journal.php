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
            "GUI_TANKS" => "tank",
            "GUI_REPORT_COMPANY" => "report configuration",
            "GUI_REPORT_PROFILE" => "report profile",
            "GUI_PERSONNEL" => "personnel",
            "EXPIRY_DATE_PERSONNEL" => "personnel expiry date",
            "TIMECODE" => "time code",
            "PRINTER" => "physical printer",
            "GUI_TANKERS" => "tanker",
            "EXPIRY_DATE_TANKERS" => "tanker expiry date",
            "TRANSP_EQUIP" => "equipment",
            "EXPIRY_DATE_TRANSP_EQUIP" => "equipment expiry",
            "EXPIRY_DATE_TANKERS" => "tanker expiry",
            "EXPIRY_DATE_PERSONNEL" => "personnel expiry",
            "GUI_ACCESS_KEYS" => "id assignment",
            "BASE_PRODS" => "base product",
            "EXPIRY_DATE_TYPES" => "expiry date type",
            "URBAC_ROLE_DOMAINS_PRIVILEGES" => "role access privilege"
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
                "BASE_LIMIT_PRESET_HT" => "limit_preset_ht",
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
                "PRIV_VIEW" => "view privilege",
                "PRIV_CREATE" => "create privilege",
                "PRIV_UPDATE" => "update privilege",
                "PRIV_DELETE" => "delete privilege",
                "PRIV_PROTECT" => "password",
            )
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
		
		if ( $value !== $map_value ) {
            if ($map_value != "" && $map_value != null) {
                $map_value = $value . '::' . $map_value;
            } else {
                $map_value = $value;
            }
		}
		
		return $map_value;
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

    //For example: RECORD_ALTERED, userTxt, recordnmTxt, keyTxt
    public function jnlLogEvent($template, $data, $jnl_event, $jnl_class)
    {
        $query = "SELECT MESSAGE, LANG_ID FROM MSG_LOOKUP 
            WHERE MSG_ID = :msg_id AND LANG_ID IN (SELECT LANG_ID from LANG_TYP)";
        $stmt = oci_parse($this->conn, $query);
        oci_bind_by_name($stmt, ':msg_id', $template);
        if (!oci_execute($stmt, OCI_NO_AUTO_COMMIT)) {
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return null;
        }

        $curr_table = $data[1];
        if (isset($this->tvmaps[$data[1]])) {
            $curr_table = $this->tvmaps[$data[1]];
        }
        $curr_column = strtoupper($data[3]);
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
                    if ($template == Lookup::RECORD_CHANGED) {
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
            write_log(sprintf("%s::%s LOOP. key:%s, value:%s", __CLASS__, __FUNCTION__, $key, $value),
            __FILE__, __LINE__);
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
        $jnl_data[5] = $new_value;

        if (!$this->jnlLogEvent(
            Lookup::RECORD_CHANGED, $jnl_data, JnlEvent::JNLT_CONF, JnlClass::JNLC_EVENT)) {
            $e = oci_error($stmt);
            write_log("DB error:" . $e['message'], __FILE__, __LINE__, LogLevel::ERROR);
            return false;
        }

        return true;
    }
}
