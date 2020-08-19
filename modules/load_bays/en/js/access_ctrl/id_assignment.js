// @(#) $Id: id_assignment.js,v 1.45 2012/06/26 02:31:47 cw Exp $";
/******************************************************************************/
/* COPYRIGHT (c) 2005 Diamond Key International Pty Ltd.                      */
/* This document is copyright and may not be reproduced in whole or in part   */
/* without the prior written consent of Diamond Key International Pty Ltd.    */
/******************************************************************************/
/* Some text is defined at the top of this module                             */
/* while the rest is in comm_Html.js                                           */
/******************************************************************************/
//op = 1 ->view
	var myColumns = [
		];

	var t__ViewPageHeader = ["IDENTIFICATION ASSIGNMENT", "标识管理" ];
	var t__AddPageHeader = ["ADD IDENTIFICATION ASSIGNMENT", "新增标识" ];
	var t__ModPageHeader = ["MODIFY IDENTIFICATION ASSIGNMENT", "修改标识" ];
	var headings = new Array();
	headings["ViewPageHeader"] = ml(t__ViewPageHeader);
	headings["AddPageHeader"] = ml(t__AddPageHeader);
	headings["ModPageHeader"] = ml(t__ModPageHeader);

	var t__ReportTitle = [ "Id Assignments Report", "身份标识管理记录报表" ];
	headings["ReportTitle"] = ml(t__ReportTitle);
	
	var t__youraction = ["YOUR ACTION", "请选择" ];
	var t__msg_del_confirm = ["Are you sure you want to delete?", "您是否确定要删除本记录?" ];
	var t__Issuer = ["Issuer", "发行单位" ];
	var t__issuer_ass_details = ["issuer and assignment details", "发行单位和标识分配信息" ];
	var t__SelIssuer = ["Select an Issuer.", "选择发行单位" ];
	var t__KeyType = ["Assignment Type", "标识类型" ];
	var t__SearchID = ["Search by ID", "通过编号查找" ];
	var t__SearchTankerID = ["Search by Tanker ID", "通过油槽车号查找" ];
	var t__SearchPersonnelID = ["Search by Personnel Name", "通过人员名称查找" ];
	var t__SearchKeyTxt = ["Search by Physical Tag", "通过密钥文本查找" ];
	var otherText = new Array();
	otherText["youraction"] = ml(t__youraction) ;
	otherText["msg_del_confirm"] = ml(t__msg_del_confirm) ;
	otherText["Issuer"] = ml(t__Issuer);
	otherText["issuer_ass_details"] = ml(t__issuer_ass_details);
	otherText["SelIssuer"] = ml(t__SelIssuer);
	otherText["KeyType"] = ml(t__KeyType);
	otherText["SearchID"] = ml(t__SearchID);
	otherText["SearchTankerID"] = ml(t__SearchTankerID);
	otherText["SearchPersonnelID"] = ml(t__SearchPersonnelID);
	otherText["SearchKeyTxt"] = ml(t__SearchKeyTxt);
	
	var t__ResetPIN = ['Reset PIN', '重置密码'];
	var t__RemovePIN = ['Remove PIN', '删除密码'];
	otherText["ResetPIN"] = ml(t__ResetPIN);
	otherText["RemovePIN"] = ml(t__RemovePIN);
	

	var t__SelKeyType = ["Select an Identifier Type.", "选择标识类型" ];
	var t__SpecifyKeyNr = ["Specify the Key Number.", "生成密钥数值" ];
	var t__EnterKeyPin = ["Enter Valid Key PIN.", "请输入有效的密钥" ];
	var t__SpecifyKeyText = ["Specify the Key Text.", "生成密钥文本" ];
	var t__SelPhysType = ["Select the Physical Reader Type.", "选择密钥校验仪器的类型" ];
	var t__SelTcd = ["Select the Access Time Code.", "选择权限班次" ];
	var t__SelKeyLock = ["Select a Lock Type.", "选择锁定类型" ];
	var t__SelKeyPsn = ["Select an associated Personnel.", "选择相关人员" ];
	var t__SelEmployer = ["Select an Employer.", "选择雇主" ];
	var t__SelRole = ["Select a Role.", "选择角色" ];
	var t__SelDrawer = ["Select a Drawer.", "选择油品调配公司" ];
	var t__SelTanker = ["Select a Tanker.", "选择油槽车" ];
	var t__SelEquipment = ["Select associated Transport Equipment.", "选择相关的运输设备" ];
	var t__SelValidTanker = ["Select a valid tanker.", "选择有效的油槽车" ];
	var t__SelKeyPin = ["Select associated Transport Equipment.", "选择密钥密码" ];
	var t__SelSpSupplier = ["Select the default Supplier.", "选择默认供应商" ];
	otherText["SelKeyType"] = ml(t__SelKeyType);
	otherText["SpecifyKeyNr"] = ml(t__SpecifyKeyNr);
    otherText["EnterKeyPin"] = ml(t__EnterKeyPin);
	otherText["SpecifyKeyText"] = ml(t__SpecifyKeyText);
	otherText["SelPhysType"] = ml(t__SelPhysType);
	otherText["SelTcd"] = ml(t__SelTcd);
	otherText["SelKeyLock"] = ml(t__SelKeyLock);
	otherText["SelKeyPsn"] = ml(t__SelKeyPsn);
	otherText["SelEmployer"] = ml(t__SelEmployer);
	otherText["SelRole"] = ml(t__SelRole);
	otherText["SelDrawer"] = ml(t__SelDrawer);
	otherText["SelTanker"] = ml(t__SelTanker);
	otherText["SelEquipment"] = ml(t__SelEquipment);
	otherText["SelValidTanker"] = ml(t__SelValidTanker);
	otherText["SelKeyPin"] = ml(t__SelKeyPin);
	otherText["SelSpSupplier"] = ml(t__SelSpSupplier);

	var t__GlblFrmInstr = [ "To view the assigments, Please select the Issuer and Assignment Type", " 选择发行单位和标识类型, 查看标识分配详情" ];
	var t__AddInstr = ["Fill the form and submit", "完成并提交标识信息" ];
	var t__ModInstr = ["Fill the form and submit", "修改并提交标识信息" ];
	var t__Add = ["Add Assignment", "新增标识" ];
	var t__Mod = ["Modify Assignment", "修改标识" ];
	var t__ViewDetails = ["Assignment Details", "标识信息" ];
	otherText["GlblFrmInstr"] = ml(t__GlblFrmInstr);
	otherText["AddInstr"] = ml(t__AddInstr);
	otherText["ModInstr"] = ml(t__ModInstr);
	otherText["Add"] = ml(t__Add);
	otherText["Mod"] = ml(t__Mod);
	otherText["ViewDetails"] = ml(t__ViewDetails);

	var t__AddNew = ["Add New Assignment", "新增标识" ];
	var t__backToMain = ["Back", "返回" ];
	var t__createReport = ["Report", "生成报表" ];
	var buttonsTxt = new Array();
	buttonsTxt["AddNew"] = ml(t__AddNew);
	buttonsTxt["backToMain"] = ml(t__backToMain);
	buttonsTxt["createReport"] = ml(t__createReport);


	var columnHdrs = new Array();
	var t__Nr = ["Assignment Number", "标识号" ];
	var t__IssuerT = ["Issuer", "发行单位" ];
	var t__PhysType = ["Physical Type", "密钥种类" ];
	var t__KeyText = ["Physical Tag", "密钥文本" ];
	var t__TimeCode = ["Time Code", "班次" ];
	var t__Tanker = ["Tanker", "油槽车" ];
	var t__Drawer = ["Drawer", "油品调配公司" ];
	var t__DefaultSupplier = ["Default Supplier", "默认供应商" ];
	var t__PsnName = ["Personnel Name", "人员名称" ];
	var t__Role = ["Role", "角色" ];
	var t__KeyLock = ["Key Lock", "密钥锁定" ];
	var t__KeyTypeT = ["Assignment Type", "标识类型" ];
	var t__Employer = ["Employer", "雇主" ];
	var t__Equipment = ["Transport Equipment", "运输设备" ];
	var t__KeyPin = ["P.I.N.", "密码" ];
	var t_Expiry = ["Days before expiration", "过期天数"];
	columnHdrs["Nr"] = ml(t__Nr);
	columnHdrs["Issuer"] = ml(t__IssuerT);
	columnHdrs["PhysType"] = ml(t__PhysType);
	columnHdrs["KeyText"] = ml(t__KeyText);
	columnHdrs["TimeCode"] = ml(t__TimeCode);
	columnHdrs["Tanker"] = ml(t__Tanker);
	columnHdrs["Drawer"] = ml(t__Drawer);
	columnHdrs["DefaultSupplier"] = ml(t__DefaultSupplier);
	columnHdrs["PsnName"] = ml(t__PsnName);
	columnHdrs["Role"] = ml(t__Role);
	columnHdrs["KeyLock"] = ml(t__KeyLock);
	columnHdrs["KeyType"] = ml(t__KeyTypeT);
	columnHdrs["Employer"] = ml(t__Employer);
	columnHdrs["Equipment"] = ml(t__Equipment);
	columnHdrs["KeyPin"] = ml(t__KeyPin);
	columnHdrs["Expiration"] = ml(t_Expiry);

	var alertMsgs = new Array();
	var t__InsufficientPriv = ["Insufficient Privilege", "权限不够" ];
	var t__opFailed = ["Operation Failed", "操作失败" ];
	var t__drawerRequired = ["A Drawer must be specified!", "必须指定一个油品调配公司!" ];
	var t__supplierRequired = ["A Supplier must be specified!", "必须指定一个供应商!" ];
	var t__personRequired = ["A Person must be specified!", "必须指定专人!" ];
	var t__invalidData = ["Invalid Data!", "无效数据!" ];
	var t__alreadyPresent = ["Check database. Already present!", "已经存在!" ];
	var t__invalidSearchStr = ["Enter valid search text!", "请输入有效的搜索字符串!" ];
	alertMsgs["InsufficientPriv"] = ml(t__InsufficientPriv);
	alertMsgs["opFailed"] = ml(t__opFailed);
	alertMsgs["drawerRequired"] = ml(t__drawerRequired);
	alertMsgs["supplierRequired"] = ml(t__supplierRequired);
	alertMsgs["personRequired"] = ml(t__personRequired);
	alertMsgs["invalidData"] = ml(t__invalidData);
	alertMsgs["invalidSearchStr"] = ml(t__invalidSearchStr);
	alertMsgs["alreadyPresent"] = ml(t__alreadyPresent); // Bugzilla 1031

	var opValues = new Array();
	opValues["search"] = 102;
	opValues["viewDetails"] = 300;
	opValues["add"] = 200;
	opValues["addSubmit"] = 201;
	opValues["delete"] = 401;
	opValues["modify"] = 500;
	opValues["modifySubmit"] = 501;
	opValues["report"] = 600;

	var t__opDeleteSucc = ["Successfully Deleted!", "删除成功!" ];
var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[411]= ml(t__opDeleteSucc); //bug zilla id 1180

	/*
	var myColumns = [
		];

	var headings = new Array();
	headings["ViewPageHeader"] = "IDENTIFICATION ASSIGNMENT";
	headings["AddPageHeader"] = "ADD IDENTIFICATION ASSIGNMENT";
	headings["ModPageHeader"] = "MODIFY IDENTIFICATION ASSIGNMENT";

	var otherText = new Array();
	otherText["youraction"] =  "YOUR ACTION";
	otherText["msg_del_confirm"] =  "Are you sure you want to delete?";
	otherText["Issuer"] = "Issuer";
	otherText["issuer_ass_details"] = "issuer and assignment details"
	otherText["SelIssuer"] = "Select an Issuer.";
	otherText["KeyType"] = "Assignment Type";
	otherText["SearchID"] = "Search by ID";
	otherText["SearchTankerID"] = "Search by Tanker ID";
	otherText["SearchPersonnelID"] = "Search by Personnel Name";
	otherText["SearchKeyTxt"] = "Search by Physical Tag";

	otherText["SelKeyType"] = "Select an Identifier Type.";
	otherText["SpecifyKeyNr"] = "Specify the Key Number.";
        otherText["EnterKeyPin"] = "Enter Valid Key PIN.";
	otherText["SpecifyKeyText"] = "Specify the Key Text.";
	otherText["SelPhysType"] = "Select the Physical Reader Type.";
	otherText["SelTcd"] = "Select the Access Time Code.";
	otherText["SelKeyLock"] = "Select a Lock Type.";
	otherText["SelKeyPsn"] = "Select an associated Personnel.";
	otherText["SelEmployer"] = "Select an Employer.";
	otherText["SelRole"] = "Select a Role.";
	otherText["SelDrawer"] = "Select a Drawer.";
	otherText["SelTanker"] = "Select a Tanker.";
	otherText["SelEquipment"] = "Select associated Transport Equipment.";
	otherText["SelValidTanker"] = "Select a valid tanker.";
	otherText["SelKeyPin"] = "Select associated Transport Equipment.";
	otherText["SelSpSupplier"] = "Select the default Supplier.";

	otherText["GlblFrmInstr"] = "To view the assigments,"
			+ " Please select the Issuer and Assignment Type";
	otherText["AddInstr"] = "Fill the form and submit";
	otherText["ModInstr"] = "Fill the form and submit";
	otherText["Add"] = "Add Assignment";
	otherText["Mod"] = "Modify Assignment";
	otherText["ViewDetails"] = "Assignment Details";

	var buttonsTxt = new Array();
	buttonsTxt["AddNew"] = "Add New Assignment";
	buttonsTxt["backToMain"] = "Back";
	buttonsTxt["createReport"] = "Report";


	var columnHdrs = new Array();
	columnHdrs["Nr"] = "Assignment Number";
	columnHdrs["Issuer"] = "Issuer";
	columnHdrs["PhysType"] = "Physical Type";
	columnHdrs["KeyText"] = "Physical Tag";
	columnHdrs["Employer"] = "Employer";
	columnHdrs["PsnName"] = "Personnel Name";
	columnHdrs["Role"] = "Role";
	columnHdrs["TimeCode"] = "Time Code";
	columnHdrs["Tanker"] = "Tanker";
	columnHdrs["Drawer"] = "Drawer";
	columnHdrs["DefaultSupplier"] = "Default Supplier";
	columnHdrs["KeyLock"] = "Key Lock";
	columnHdrs["Equipment"] = "Transport Equipment";
	columnHdrs["KeyPin"] = "P.I.N.";
	

	var alertMsgs = new Array();
	alertMsgs["InsufficientPriv"] = "Insufficient Privilege";
	alertMsgs["opFailed"] = "Operation Failed";
	alertMsgs["drawerRequired"] = "A Drawer must be specified!";
	alertMsgs["supplierRequired"] = "A Supplier must be specified!";
	alertMsgs["personRequired"] = "A Person must be specified!";
	alertMsgs["invalidData"] = "Invalid Data!";
	alertMsgs["invalidSearchStr"] = "Enter valid search text!";
	alertMsgs["alreadyPresent"] = "Check database. Already present!"; // Bugzilla 1031

	var opValues = new Array();
	opValues["search"] = 102;
	opValues["viewDetails"] = 300;
	opValues["add"] = 200;
	opValues["addSubmit"] = 201;
	opValues["delete"] = 401;
	opValues["modify"] = 500;
	opValues["modifySubmit"] = 501;
	opValues["report"] = 600;

var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[411]= "Successfully Deleted!"; //bug zilla id 1180
*/

/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
var ops_req_print = [-1,1,18,28, 26,36,27,37];
var ops_req_search = [-1,1,18,28, 26,36,27,37];// search never required on this page
var issuerCd;
var key_typ_id;
var key_no;
var ptype;
var kTxt;
var Tcd;
var lock;
var psn;
var employer;
var drawer;
var role;
var tanker;
var pin;
var expiry;
var equipment;
var spsupp;
//how many items Should be displayed on 1 Page
var items_per_page = 10;
/*============================================================================*/
function preqstr_field ()
{
	var fieldHTML ="";
	fieldHTML += "<input name=\"preqstr\" id=\"preqstr\" value=\"\" type=\"hidden\">\n";

	return fieldHTML;
}
/*============================================================================*/
function
pgHeader( curViewDetailState,pageTitle , lang)
{
	var hdr = "";
  hdr += printHdr(hdr,updatePageTitle(curViewDetailState,pageTitle), lang);
	return( hdr );
}
/*============================================================================*/
function
displayGlblFrm()
{
	var glblFrm = "";

	glblFrm += fieldst_HTML(otherText["issuer_ass_details"]);
	glblFrm += "<form name=\"glblFrm\" method =\"post\" id=\"glblFrm\" >\n";
	glblFrm += "<input type=\"hidden\" name=\"op\" value=\"1\">\n";
	glblFrm += "<input type=\"hidden\" name=\"pg\" value=\"1\">\n";
	glblFrm += "<div class=\"adminform\">\n";
	glblFrm += otherText["GlblFrmInstr"];
	glblFrm += "<table>\n";
	glblFrm += "<tr>\n";
	glblFrm += "<td class=\"infotextheading\">" + otherText["Issuer"] + "</td>";
	glblFrm += "<td class=\"infotextheading\">:</td>\n";
	glblFrm += "<td>\n";
	glblFrm += "<select id=\"issuerCd\" dataType=\"Require\" name=\"issuerCd\"";
	glblFrm += " msg=\"" + otherText["SelIssuer"] + "\">\n";
	glblFrm += displayDrop_ShowDefSelected(issuerCd, issuers_jslist,otherText["SelIssuer"]);
	glblFrm += "</td>\n";
	glblFrm += "<td>\n";
	glblFrm += "&nbsp;\n";
	glblFrm += "</td>\n";
	glblFrm += "</tr>\n";

	glblFrm += "<tr>\n";
	glblFrm += "<td class=\"infotextheading\">" + otherText["KeyType"] + "</td>";
	glblFrm += "<td class=\"infotextheading\">:</td>\n";
	glblFrm += "<td>\n";
	glblFrm += "<select name=\"key_typ_id\" dataType=\"Require\" id=\"key_typ_id\"";
	glblFrm += " msg=\"" + otherText["SelKeyType"] + "\" onchange=\"adjustSearchFields();\">\n";
	glblFrm += displayDropList(key_typ_id, keyType_jslist, otherText["SelKeyType"]);
	glblFrm += "</td>\n";
	glblFrm += "<td>\n";
	glblFrm += "<input type=\"button\" style=\"FONT-SIZE:0.75em; WIDTH:  6.5em; HEIGHT:  2.2em;\" value=\"" + commBtnText["View"] + "\"";
	glblFrm += "onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" onclick=\"document.glblFrm.op.value=-1;submitmyform(glblFrm);\"/>";
	glblFrm += "</td>\n";

	glblFrm += "</tr>\n";

	glblFrm += "<tr>\n";
	glblFrm += "<td class=\"infotextheading\">" + otherText["SearchID"] + "</td>";
	glblFrm += "<td class=\"infotextheading\">:</td>\n";
	glblFrm += "<td>\n";
	key_no = key_no!='-1'?key_no :"";
	glblFrm += "<input type=\"text\"  name=\"key_no\" value=\""+key_no+"\"\"/>\n";
	glblFrm += "</td>\n";
	glblFrm += "<td>\n";
	//glblFrm += "<input type=\"button\" style=\"FONT-SIZE:0.75em; WIDTH:  6.5em; HEIGHT:  2.2em;\" value=\"" + commText["Search"] + "\"";
	//glblFrm += " onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" msg=\"" + otherText["SpecifyKeyNr"] + "\"";
	//glblFrm += " onclick=\"glblFrm.op.value=";
	//glblFrm += opValues["search"] + ";glblFrm.submit();\">\n";
	glblFrm += "</td>\n";
	glblFrm += "</tr>\n";

//alert("key_typ_id:"+key_typ_id);
	glblFrm += "<tr>\n";
	glblFrm += "<td class=\"infotextheading\">" + otherText["SearchTankerID"] + "</td>";
	glblFrm += "<td class=\"infotextheading\">:</td>\n";
	glblFrm += "<td>\n";
	tanker_id_search = tanker_id_search!='-1'?tanker_id_search :"";
	if (key_typ_id == "4" || key_typ_id == "5" || key_typ_id=="" || key_typ_id=="-1")
	{
		glblFrm += "<input type=\"text\" id=\"tanker_id_search\" name=\"tanker_id_search\" value=\""+tanker_id_search+"\"\"/>\n";
	}
	else
	{
		glblFrm += "<input type=\"text\" id=\"tanker_id_search\" name=\"tanker_id_search\" value=\""+tanker_id_search+"\"\"/ disabled>\n";
	}
	glblFrm += "</td>\n";
	glblFrm += "<td>\n";
	//glblFrm += "<input type=\"button\" style=\"FONT-SIZE:0.75em; WIDTH:  6.5em; HEIGHT:  2.2em;\" value=\"" + commText["Search"] + "\"";
	//glblFrm += " onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" msg=\"" + otherText["SpecifyKeyNr"] + "\"";
	//glblFrm += " onclick=\"glblFrm.op.value=";
	//glblFrm += opValues["search"] + ";glblFrm.submit();\">\n";
	glblFrm += "</td>\n";
	glblFrm += "</tr>\n";

	glblFrm += "<tr>\n";
	glblFrm += "<td class=\"infotextheading\">" + otherText["SearchPersonnelID"] + "</td>";
	glblFrm += "<td class=\"infotextheading\">:</td>\n";
	glblFrm += "<td>\n";
	personnel_id_search = personnel_id_search!='-1'?personnel_id_search :"";
	if (key_typ_id == "3" || key_typ_id == "5" || key_typ_id=="" || key_typ_id=="-1")
	{
		glblFrm += "<input type=\"text\" id=\"personnel_id_search\" name=\"personnel_id_search\" value=\""+personnel_id_search+"\"\"/>\n";
	}
	else
	{
		glblFrm += "<input type=\"text\" id=\"personnel_id_search\" name=\"personnel_id_search\" value=\""+personnel_id_search+"\"\"/ disabled>\n";
	}
	glblFrm += "</td>\n";
	glblFrm += "<td>\n";
	//glblFrm += "<input type=\"button\" style=\"FONT-SIZE:0.75em; WIDTH:  6.5em; HEIGHT:  2.2em;\" value=\"" + commText["Search"] + "\"";
	//glblFrm += " onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" msg=\"" + otherText["SpecifyKeyNr"] + "\"";
	//glblFrm += " onclick=\"glblFrm.op.value=";
	//glblFrm += opValues["search"] + ";glblFrm.submit();\">\n";
	glblFrm += "</td>\n";
	glblFrm += "</tr>\n";

	glblFrm += "<tr>\n";
	glblFrm += "<td class=\"infotextheading\">" + otherText["SearchKeyTxt"] + "</td>";
	glblFrm += "<td class=\"infotextheading\">:</td>\n";
	glblFrm += "<td>\n";
	key_txt_search = key_txt_search!='-1'?key_txt_search :"";
	glblFrm += "<input type=\"text\"  name=\"key_txt_search\" value=\""+key_txt_search+"\"\"/>\n";
	glblFrm += "</td>\n";
	glblFrm += "<td>\n";
	
	glblFrm += "<input type=\"button\" style=\"FONT-SIZE:0.75em; WIDTH:  6.5em; HEIGHT:  2.2em;\" value=\"" + commText["Search"] + "\"";
	glblFrm += " onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" msg=\"" + otherText["SpecifyKeyNr"] + "\"";
	glblFrm += " onclick=\"glblFrm.op.value=";
	glblFrm += opValues["search"] + ";submitsearchFrm(glblFrm);\">\n";
	
	glblFrm += "<input type=\"button\" style=\"FONT-SIZE:0.75em; WIDTH:  6.5em; HEIGHT:  2.2em;\" value=\"" + buttonsTxt["createReport"] + "\"";
	glblFrm += " onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" msg=\"" + otherText["SpecifyKeyNr"] + "\"";
	glblFrm += " onclick=\"glblFrm.op.value=";
	glblFrm += opValues["search"] + ";submitreportFrm(glblFrm);\">\n";
	
//	glblFrm += "<span class=\"button\"><a href=\"id_assignment.cgi?issuerCd="+issuerCd+"&key_typ_id="+key_typ_id+"&key_no="+key_no+"&tanker_id_search="+tanker_id_search+"&personnel_id_search="+personnel_id_search+"&key_txt_search="+key_txt_search+"&ftsize="+"16"+"\" target=\"_blank\">"+buttonsTxt["createReport"]+"</a>\n";
//	glblFrm += "</span>\n";
	
	
	glblFrm += "</td>\n";
	glblFrm += "</tr>\n";


	glblFrm += "</table>\n";

	glblFrm += "</table>\n";
	glblFrm += "\n";
	glblFrm += "</div>\n";
	glblFrm += "</form>\n";
	glblFrm += fieldstFoot_HTML();


	return glblFrm;
}
/*============================================================================*/
function
updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	switch( Math.floor(op/100) )
	{
		case Math.floor(opValues["add"]/100):
			pageHeading += headings["AddPageHeader"];
			break;
		case Math.floor(opValues["modify"]/100):
			pageHeading += headings["ModPageHeader"];
			break;
		default:
			pageHeading += headings["ViewPageHeader"];
			break;
	}
	return pageHeading;   
}
/*============================================================================*/
function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	pageTitle +="DKI Omega Menu :: ACCESS CONTROL, Identification Assignment Page";

	return pageTitle;
}
/*============================================================================*/
// function that converts a numeric value to a returned description
function
pt_to_name( type_enum )
{
	var desc = "";
	var i = 0;

	for( i = 0; i < phys_types_jslist.length; ++i )
	{
		if( phys_types_jslist[i][0] == type_enum )
		{
			desc = phys_types_jslist[i][1];
		}
	}
	return desc;
}
/*============================================================================*/
// function that converts a numeric value to a returned description
function
kt_to_name( type_enum )
{
	var desc = "";
	var i = 0;

	for( i = 0; i < keyType_jslist.length; ++i )
	{
		if( keyType_jslist[i][0] == type_enum )
		{
			desc = keyType_jslist[i][1];
		}
	}
	return desc;
}
/*============================================================================*/
// function that converts a numeric value to a returned description
function
lock_to_name( type_enum )
{
	var desc = "";
	var i = 0;

	for( i = 0; i < lock_jslist.length; ++i )
	{
		if( lock_jslist[i][0] == type_enum )
		{
			desc = lock_jslist[i][1];
		}
	}
	return desc;
}
/*============================================================================*/
function
issuerName( issuer_code )
{
	var name = "";

	for( i = 0; i < issuers_jslist.length; ++i )
	{
		if( issuers_jslist[i][0] == issuer_code )
		{
			name = issuers_jslist[i][1];
		}
	}
	return name;
}
/*============================================================================*/
function
employerName( employer_code )
{
	var name = "";

	for( i = 0; i < employers_jslist.length; ++i )
	{
		if( employers_jslist[i][0] == employer_code )
		{
			name = employers_jslist[i][1];
		}
	}
	return name;
}
/*============================================================================*/
// function that converts a numeric value to a returned description
function
roleDesc( role_enum )
{
	var desc = "";
	var i = 0;

	for( i = 0; i < roles_jslist.length; ++i )
	{
		if( roles_jslist[i][0] == role_enum )
		{
			desc = roles_jslist[i][1];
		}
	}
	return desc;
}
/*============================================================================*/
function
op_list( curPriv, thisFrmNum )
{
	var ops_list = "";

	//alert("op_list(" + curPriv + "," + thisFrmNum + ")");
	ops_list += "<select name=\"op\" id=\"op\"";
	ops_list += " onchange=\"submitAction(this, '" +thisFrmNum+ "');\">          ";
	ops_list += "<option value=\"" + opValues["viewDetails"];
	ops_list += "\">" + commText["View"] + "</option>\n";
	ops_list += "<option value=\"" + opValues["delete"];
	ops_list += "\">" + commText["Delete"] + "</option>\n";
	ops_list += "<option value=\"" + opValues["modify"];
	ops_list += "\">" + commText["Modify"] + "</option>\n";
	ops_list += "<option value=0 selected>--\t" + otherText["youraction"];
	ops_list += "\t--</option>";
	ops_list += "</select>";

	return ops_list;
}
/*============================================================================*/
// function that uses the drawers_jslist to map to name
function
drawerNameFromCode( code )
{
	var name = "";
	var i = 0;

	for( i = 0; i < drawers_jslist.length; ++i )
	{
		if( drawers_jslist[i][0] == code )
		{
			name = drawers_jslist[i][1];
			break;
		}
	}
	return name;
}
/*============================================================================*/
// function that uses the suppliers_jslist to map to name
function
supplierNameFromCode( code )
{
	var name = "";
	var i = 0;

	for( i = 0; i < suppliers_jslist.length; ++i )
	{
		if( suppliers_jslist[i][0] == code )
		{
			name = suppliers_jslist[i][1];
			break;
		}
	}
	return name;
}
/*============================================================================*/
function
ptype_desc( ptype )
{
	var desc = "";
	var i = 0;

	for( i = 0; i < phys_types_jslist.length; ++i )
	{
		if( phys_types_jslist[i][0] == ptype )
		{
			desc = phys_types_jslist[i][1];
			break;
		}
	}
	return desc;
}
/*============================================================================*/
function
roleText( role )
{
	var txt = "";
	var i = 0;

	for( i = 0; i < roles_jslist.length; ++i )
	{
		if( roles_jslist[i][0] == role )
		{
			txt = roles_jslist[i][1];
			break;
		}
	}
	return txt;
}
/*============================================================================*/
function
equipment_code( eqp )
{
	var cd = "";
	var i = 0;

	// Bugzilla #1259
	if( has_sched == "Y" )
	{
		for( i = 0; i < scheds_jslist.length; ++i )
		{
			if( scheds_jslist[i][0] == eqp )
			{
				cd = scheds_jslist[i][1];
				break;
			}
		}
	}
	else
	{
		for( i = 0; i < nonscheds_jslist.length; ++i )
		{
			if( nonscheds_jslist[i][0] == eqp )
			{
				cd = nonscheds_jslist[i][1];
				break;
			}
		}
	}
	return cd;
}
/*============================================================================*/
function
viewSummary()
{
	var vs = "";
	var i = 0;

	//alert("viewSummary");
	vs += "<div id=\"printReady\">\n";
	vs += table_begin("M", 0,"");
	vs += "<tbody>\n";
	vs += "<!-- this is the Table Heading Row\n";
	vs += "                              -->\n";
	vs += "<tr>\n";
	vs += "<td width=\"10%\">" + columnHdrs["Nr"] + "</td>\n";
	vs += "<td width=\"10%\">" + columnHdrs["Issuer"] + "</td>\n";
	//vs += "<td width=\"10%\">" + columnHdrs["PhysType"] + "</td>\n";
	//vs += "<td width=\"10%\">" + columnHdrs["KeyText"]  + "</td>\n";
	vs += "<td width=\"10%\">" + columnHdrs["TimeCode"]  + "</td>\n";
	vs += "<td width=\"10%\">";
	vs += columnHdrs["Tanker"] + "</td>\n";
	vs += "<td width=\"10%\">";
	vs += columnHdrs["Drawer"] + "</td>\n";
	vs += "<td width=\"10%\">";
	vs += columnHdrs["DefaultSupplier"] + "</td>\n";
	vs += "<td width=\"10%\">";
	vs += columnHdrs["PsnName"] + "</td>\n";
	vs += "<td width=\"10%\">";
	vs += columnHdrs["Role"] + "</td>\n";
	vs += "<td width=\"10%\">";
	vs += columnHdrs["Equipment"] + "</td>\n";
	vs += "</tr>\n";
	for( i = 1; i < assignments_tab.length; ++i )
	{

		vs += "<tr class=\"row1\">\n";
		// number
		vs += "<td width=\"30%\" >\n";
		//alert("form name set to select_action_" + i);
		vs += "<form name=\"select_action_"+i+"\"";
		vs += " method=\"post\" id=\"select_action_"+i+"\" >\n";
		vs += "<table border=\"0\">\n";
		vs += "<tr>\n";
		vs += "<td width=\"50%\">\n";
		vs += assignments_tab[i][0] + "\n";
		vs += " <input type=\"hidden\" name=\"selKeyNo\"";
		vs += " id=\"selKeyNo\"";
		vs += " value=\""+ assignments_tab[i][0] +"\">\n";
		vs += " <input type=\"hidden\" name=\"selKeyCo\"";
		vs += " id=\"selKeyCo\"";
		vs += " value=\""+ assignments_tab[i][1] +"\">\n";
		//vs += preqstr_field();
		vs += "</td>\n";
		vs += "<input type=\"hidden\" name=\"issuerCd\" value=\"";
		vs += assignments_tab[i][1] +  "\">\n";
		vs += "<input type=\"hidden\" name=\"key_typ_id\" value=\"";
		vs += assignments_tab[i][11] +  "\">\n";
		vs += "<td width=\"50%\">\n";
		vs += op_list( priv, i );
		vs += "</td>\n";
		vs += "</tr>\n";
		vs += "</table>\n";
		vs += "</form>\n";
		vs += "</td>\n";
		// issuer
		vs += "<td width=\"10%\" >";
		vs += issuerName(assignments_tab[i][1]) + "</td>\n";
		// physical type enum - convert to string
		//vs += "<td width=\"10%\" >";
		//vs += pt_to_name(assignments_tab[i][2]) + "</td>\n";
		for( j = 4; j <= 8; ++j )
		{
			vs += "<td width=\"10%\" >";
			if( assignments_tab[i][j] != "NULL" )
			{
				if( j == 6 ) // drawer
				{
					vs += drawerNameFromCode(assignments_tab[i][j]);
				}
				else if( j == 7 ) // default supplier
				{
					vs += supplierNameFromCode(assignments_tab[i][j]);
				}
				else
				{
					vs += assignments_tab[i][j]+ "</td>\n";
				}
			}
			else
			{
				vs += "</td>\n";
			}
		}
		// role enum - convert to string
		vs += "<td width=\"10%\" >";
		vs += roleDesc(assignments_tab[i][9]) + "</td>\n";
		//Transport Equipment
		vs += "<td width=\"10%\" >";
		//if 'NULL' value in assignments_tab array then print nothing
		//else print the equipment name
		var myEquipment = assignments_tab[i][13] == '0'? "":assignments_tab[i][13];
		vs += myEquipment + "</td>\n";
		vs += "</tr>\n";
	}
	vs += "</tbody>\n";
	vs += "</div>\n";
	return vs;
}
/*============================================================================*/
function
viewHTML()
{
	//alert("vHTML");
	key_no = assignments_tab[1][0];
	issuerCd = assignments_tab[1][1];
	ptype = assignments_tab[1][2];
	if( assignments_tab[1][3] != "NULL" )
	{
		kTxt = assignments_tab[1][3];
	}
	else
	{
		kTxt = "";
	}
	if( assignments_tab[1][4] != "NULL" )
	{
		Tcd = assignments_tab[1][4];
	}
	else
	{
		Tcd = "";
	}
	tanker = assignments_tab[1][5];
	if( assignments_tab[1][6] != "NULL" )
	{
		drawer = assignments_tab[1][6];
	}
	else
	{
		drawer = "";
	}
	if( assignments_tab[1][7] != "NULL" )
	{
		spsupp = assignments_tab[1][7];
	}
	else
	{
		spsupp = "";
	}
	psn = assignments_tab[1][8];
	role = assignments_tab[1][9];
	if( assignments_tab[1][10] != "NULL" )
	{
		lock = assignments_tab[1][10];
	}
	else
	{
		lock = "";
	}
	key_typ_id = assignments_tab[1][11];
	employer = assignments_tab[1][12];
	equipment = assignments_tab[1][13];
	if( assignments_tab[1][14] != "NULL" )
	{
		pin = assignments_tab[1][14];
	}
	else
	{
		pin = "";
	}
	if( assignments_tab[1][15] != "NULL" )
	{
		expiry = assignments_tab[1][15];
	}
	else
	{
		expiry = "";
	}

	var vFrmhtml ="";

	vFrmhtml += fieldst_HTML(otherText["ViewDetails"]);

	vFrmhtml += " <form name=\"detsView\" method =\"post\" id=\"detsView\"";
	vFrmhtml += " action=\"id_assignment.cgi\" onsubmit=\"return submitmyform(this)\">\n";
	vFrmhtml += "<input type=\"hidden\" name=\"selKeyNo\" value=\"" + key_no + "\">\n";
	vFrmhtml += "<input type=\"hidden\" name=\"selKeyCo\" value=\"" + issuerCd + "\">\n";
	vFrmhtml += "<input type=\"hidden\" name=\"selKeyType\" value=\"" + key_typ_id +  "\">\n";
	vFrmhtml += "<input type=\"hidden\" name=\"issuerCd\" value=\"" + issuerCd +  "\">\n";
	vFrmhtml += "<input type=\"hidden\" name=\"key_typ_id\" value=\"" + key_typ_id +  "\">\n";
	vFrmhtml += "<div id=\"helparea\">\n";
	vFrmhtml += "<table width=\"100%\">\n";

	vFrmhtml += " <tr>\n";
	vFrmhtml += "<td width=\"100%\">\n";

	vFrmhtml += "<table>\n";

	// First row in form
	vFrmhtml += " <tr>\n";

	vFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Nr"] + "</td>\n";
	vFrmhtml += "<td>:</td>\n";
	vFrmhtml +="<td>" + key_no + "</td>\n";

	vFrmhtml += "&nbsp;&nbsp;<td class=\"infotextheading\">" + columnHdrs["Issuer"] + "</td>\n";
	vFrmhtml += "<td>:</td>\n";
	vFrmhtml +="<td>" + issuerCd + "</td>\n";

	vFrmhtml += " </tr>\n";

	// Second row in form
	vFrmhtml += " <tr>\n";

	vFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["PhysType"] + "</td>\n";
	vFrmhtml += "<td>:</td>\n";
	vFrmhtml +="<td>" + ptype_desc(ptype) + "</td>\n";

	vFrmhtml += "&nbsp;&nbsp;<td class=\"infotextheading\">" + columnHdrs["KeyText"] + "</td>\n";
	vFrmhtml += "<td>:</td>\n";
	vFrmhtml +="<td>" + kTxt + "</td>\n";

	vFrmhtml += " </tr>\n";

	// Third row in form
	vFrmhtml += " <tr>\n";

	vFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["TimeCode"] + "</td>\n";
	vFrmhtml += "<td>:</td>\n";
	vFrmhtml +="<td>" + Tcd + "</td>\n";

	vFrmhtml += "&nbsp;&nbsp;<td class=\"infotextheading\">" + columnHdrs["KeyLock"] + "</td>\n";
	vFrmhtml += "<td>:</td>\n";
	vFrmhtml +="<td>" + lock + "</td>\n";

	vFrmhtml += " </tr>\n";
	if( has_personnel == "Y" )
	{
		// Fourth row in form
		vFrmhtml += " <tr>\n";

		vFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Employer"] + "</td>\n";
		vFrmhtml += "<td>:</td>\n";
		vFrmhtml +="<td>" + employer + "</td>\n";

		vFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["PsnName"] + "</td>\n";
		vFrmhtml += "<td>:</td>\n";
		vFrmhtml +="<td>" + psn + "</td>\n";

		vFrmhtml += " </tr>\n";

		// Fifth row in form
		vFrmhtml += " <tr>\n";

		vFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Role"] + "</td>\n";
		vFrmhtml += "<td>:</td>\n";
		vFrmhtml +="<td>" + roleText(role) + "</td>\n";


		vFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Drawer"] + "</td>\n";
		vFrmhtml += "<td>:</td>\n";
		vFrmhtml +="<td>" + drawerNameFromCode(drawer) + "</td>\n";

		// Sixth row in form
		vFrmhtml += " <tr>\n";

		vFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["DefaultSupplier"] + "</td>\n";
		vFrmhtml += "<td>:</td>\n";
		vFrmhtml +="<td>" + supplierNameFromCode(spsupp) + "</td>\n";
	}
	else
	{
		// Sixth row in form
		vFrmhtml += " <tr>\n";
	}

	if( has_tanker == "Y" )
	{
		//vFrmhtml += " <tr>\n";

		vFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Tanker"] + "</td>\n";
		vFrmhtml += "<td>:</td>\n";
		vFrmhtml +="<td>" + tanker + "</td>\n";

		if( has_personnel == "Y" )
		{
			vFrmhtml += " </tr>\n";
			vFrmhtml += "<tr>\n";
		}
	}

	if( has_sched == "Y" || has_non_sched == "Y" )
	{
		vFrmhtml += " <tr>\n";

		vFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Equipment"] + "</td>\n";
		vFrmhtml += "<td>:</td>\n";
		vFrmhtml +="<td>" + equipment_code(equipment) + "</td>\n";
		if( has_tanker == "Y" )
		{
			vFrmhtml += " </tr>\n";
			vFrmhtml += "<tr>\n";
		}
	}
	vFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["KeyPin"] + "</td>\n";
	vFrmhtml += "<td>:</td>\n";
        if (pin.length > 0)
            vFrmhtml +="<td>****</td>\n";

    if (enable_expiry == "Y")
    {
        vFrmhtml += "<tr><td class=\"infotextheading\">" + columnHdrs["Expiration"] + "</td>\n";
        vFrmhtml += "<td>:</td>\n";
        vFrmhtml +="<td>" + expiry + "</td></tr>\n";
    }

	vFrmhtml += " </tr>\n";
	vFrmhtml += "</table>\n";

	vFrmhtml +="</td>\n";
	vFrmhtml += " </tr>\n";

	//vFrmhtml += frmButtRow_HTML(commBtnText["Modify"], 1);

	vFrmhtml +="</td>\n";
	vFrmhtml +="</tr>\n";

	vFrmhtml +="</table>\n";
	vFrmhtml += "<\/div>\n";
	vFrmhtml += "</form>\n";
	vFrmhtml += fieldstFoot_HTML();

	return vFrmhtml;
}
/*============================================================================*/
function
modHTML()
{
	//alert("modHTML");
	key_no = assignments_tab[1][0];
	issuerCd = assignments_tab[1][1];
	ptype = assignments_tab[1][2];
	if( assignments_tab[1][3] != "NULL" )
	{
		kTxt = assignments_tab[1][3];
	}
	else
	{
		kTxt = "";
	}
	if( assignments_tab[1][4] != "NULL" )
	{
		Tcd = assignments_tab[1][4];
	}
	else
	{
		Tcd = "";
	}
	tanker = assignments_tab[1][5];
	if( assignments_tab[1][6] != "NULL" )
	{
		drawer = assignments_tab[1][6];
	}
	else
	{
		drawer = "";
	}
	if( assignments_tab[1][7] != "NULL" )
	{
		spsupp = assignments_tab[1][7];
	}
	else
	{
		spsupp = "";
	}
	psn = assignments_tab[1][8];
	role = assignments_tab[1][9];
	if( assignments_tab[1][10] != "NULL" )
	{
		lock = assignments_tab[1][10];
	}
	else
	{
		lock = "";
	}
	key_typ_id = assignments_tab[1][11];
	employer = assignments_tab[1][12];
	equipment = assignments_tab[1][13];
	if( assignments_tab[1][14] != "NULL" )
	{
		pin = assignments_tab[1][14];
	}
	else
	{
		pin = "";
	}

	var modFrmhtml ="";

	modFrmhtml += fieldst_HTML(otherText["Mod"]);
	modFrmhtml += "                            <div class=\"adminform\">\n";
  modFrmhtml +="<table width=\"100%\">\n";
	modFrmhtml += infotextRow_HTML(" width=\"100%\" ",otherText["ModInstr"]);
	modFrmhtml += " <form name=\"modNew\" method =\"post\" id=\"modNew\"";
	modFrmhtml += " action=\"id_assignment.cgi\" onsubmit=\"return checkIfTankerFormValid(this)\">\n";
	modFrmhtml += "<input type=\"hidden\" name=\"op\" value=\"" + opValues["modifySubmit"] + "\">\n";
	modFrmhtml += "<input type=\"hidden\" name=\"selKeyNo\" value=\"" + key_no + "\">\n";
	modFrmhtml += "<input type=\"hidden\" name=\"selKeyCo\" value=\"" + issuerCd + "\">\n";
	modFrmhtml += "<input type=\"hidden\" name=\"selKeyType\" value=\"" + key_typ_id +  "\">\n";
	modFrmhtml += "<input type=\"hidden\" name=\"issuerCd\" value=\"" + issuerCd +  "\">\n";
	modFrmhtml += "<input type=\"hidden\" name=\"key_typ_id\" value=\"" + key_typ_id +  "\">\n";
	modFrmhtml += "<table width=\"100%\">\n";

	modFrmhtml += " <tr>\n";
	modFrmhtml += "<td width=\"100%\">\n";

	modFrmhtml += "<table>\n";

	// First row in form
	modFrmhtml += " <tr>\n";

	modFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Nr"] + "</td>\n";
	modFrmhtml += "<td>:</td>\n";
	modFrmhtml +="<td>" + key_no + "</td>\n";

	modFrmhtml += "&nbsp;&nbsp;<td class=\"infotextheading\">" + columnHdrs["Issuer"] + "</td>\n";
	modFrmhtml += "<td>:</td>\n";
	modFrmhtml +="<td>" + issuerCd + "</td>\n";

	modFrmhtml += " </tr>\n";

	// Second row in form
	modFrmhtml += " <tr>\n";

	modFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["PhysType"] + "</td>\n";
	modFrmhtml += "<td>:</td>\n";
	modFrmhtml += "<td>\n";
	modFrmhtml += "<select id=\"selKeyPtype\" dataType=\"Require\" name=\"selKeyPtype\"";
	modFrmhtml += " msg=\"" + otherText["SelPhysType"] + "\">\n";
	modFrmhtml += displayDropList(ptype, phys_types_jslist,otherText["SelPhysType"]);
	modFrmhtml += "</td>\n";

	modFrmhtml += "&nbsp;&nbsp;<td class=\"infotextheading\">" + columnHdrs["KeyText"] + "</td>\n";
	modFrmhtml += "<td>:</td>\n";
	modFrmhtml +="<td>\n";
	modFrmhtml += "<input type=\"text\" dataType=\"Require\" name=\"selKeyText\"";
	modFrmhtml += " msg=\"" + otherText["SpecifyKeyText"] + "\"\n";
	modFrmhtml += " size=\"60\" value=\"" + kTxt + "\" >\n";
	modFrmhtml +="</td>\n";

	modFrmhtml += " </tr>\n";

	// Third row in form
	modFrmhtml += " <tr>\n";

	modFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["TimeCode"] + "</td>\n";
	modFrmhtml += "<td>:</td>\n";
	modFrmhtml += "<td>\n";
	modFrmhtml += "<select id=\"selKeyTcd\" dataType=\"Require\" name=\"selKeyTcd\"";
	modFrmhtml += " msg=\"" + otherText["SelTcd"] + "\">\n";
	modFrmhtml += displayDropList(Tcd, tcd_jslist,otherText["SelTcd"]);
	modFrmhtml += "</td>\n";

	modFrmhtml += "&nbsp;&nbsp;<td class=\"infotextheading\">" + columnHdrs["KeyLock"] + "</td>\n";
	modFrmhtml += "<td>:</td>\n";
	modFrmhtml +="<td>\n";
	modFrmhtml += "<select id=\"selLock\" dataType=\"Require\" name=\"selLock\"";
	modFrmhtml += " msg=\"" + otherText["SelKeyLock"] + "\">\n";
	modFrmhtml += displayDropList(lock, lock_jslist,otherText["SelKeyLock"]);
	modFrmhtml +="</td>\n";

	modFrmhtml += " </tr>\n";
	if( has_personnel == "Y" )
	{
		// Fourth row in form
		modFrmhtml += " <tr>\n";

		modFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Employer"] + "</td>\n";
		modFrmhtml += "<td>:</td>\n";
		modFrmhtml += "<td>\n";
		modFrmhtml += "<select id=\"selKeyEmployer\" dataType=\"Require\" name=\"selKeyEmployer\"";
		modFrmhtml += " msg=\"" + otherText["SelEmployer"] + "\"";
		modFrmhtml += " onchange=\"update(document.modNew, this, document.modNew.selKeyPsn)\">\n";
		modFrmhtml += displayDropList(employer, employers_jslist,otherText["SelEmployer"]);
		modFrmhtml += "</td>\n";

		modFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["PsnName"] + "</td>\n";
		modFrmhtml += "<td>:</td>\n";
		modFrmhtml += "<td>\n";
		modFrmhtml += "<select id=\"selKeyPsn\" dataType=\"Require\" name=\"selKeyPsn\"";
		modFrmhtml += " msg=\"" + otherText["SelKeyPsn"] + "\">\n";
		modFrmhtml += displayDropList_Psn(psn, psn_jslist,otherText["SelKeyPsn"]);
		modFrmhtml += "</td>\n";

		modFrmhtml += " </tr>\n";

		// Fifth row in form
		modFrmhtml += " <tr>\n";

		modFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Role"] + "</td>\n";
		modFrmhtml += "<td>:</td>\n";
		modFrmhtml += "<td>\n";
		modFrmhtml += "<select id=\"selKeyRole\" dataType=\"Require\" name=\"selKeyRole\"";
		modFrmhtml += " msg=\"" + otherText["SelRole"] + "\" >\n";
		modFrmhtml += displayDropList(role, roles_jslist,otherText["SelRole"]);
		modFrmhtml += "</td>\n";


		modFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Drawer"] + "</td>\n";
		modFrmhtml += "<td>:</td>\n";
		modFrmhtml += "<td>\n";
		modFrmhtml += "<select id=\"selKeyDrwr\" name=\"selKeyDrwr\" >\n";
		modFrmhtml += displayDropList(drawer, drawers_jslist,otherText["SelDrawer"]);
		modFrmhtml += "</td>\n";
		modFrmhtml += " </tr>\n";

		// Sixth row in form
		modFrmhtml += " <tr>\n";

		modFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["DefaultSupplier"] + "</td>\n";
		modFrmhtml += "<td>:</td>\n";
		modFrmhtml += "<td>\n";
		modFrmhtml += " <select id=\"selKeySupplier\" name=\"selKeySupplier\" > \n ";
		modFrmhtml += displayDropList(spsupp, suppliers_jslist,otherText["SelSpSupplier"]);
		modFrmhtml += "</td>\n";
	}
	else
	{
		// Sixth row in form
		modFrmhtml += " <tr>\n";
	}

	if( has_tanker == "Y" )
	{
		//modFrmhtml += " <tr>\n";

		modFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Tanker"] + "</td>\n";
		modFrmhtml += "<td>:</td>\n";
		modFrmhtml += "<td>\n";
		
		
		modFrmhtml += "<table class=\"NewActionBaseTable\">\n";
		modFrmhtml += "<tbody>\n";
		modFrmhtml += "<tr>\n";
		modFrmhtml += "<td class=\"popupLinkrow\">\n";
		modFrmhtml += "<input type=\"text\" name=\"selKeyTanker\" id=\"selKeyTanker\" value=\""+tanker+"\" style=\"FONT-SIZE:1.00em\" dataType=\"Require\" msg=\""+otherText["SelTanker"]+"\"/>\n"; 
		modFrmhtml += "</td>\n";
		modFrmhtml += "<td width=\"15\">\n";
		modFrmhtml += "<img src=\"/images/dropimage.gif\" width=\"15\" height=\"16\" onclick=\"as1.doAjaxRequest();\">\n";
		modFrmhtml += "</td>\n";
		modFrmhtml += "</tr>\n";
		modFrmhtml += "</tbody>\n";
		modFrmhtml += "</table>\n";
		
		
		
		
		//modFrmhtml += "<select id=\"selKeyTanker\" dataType=\"Require\" name=\"selKeyTanker\"";
		//modFrmhtml += " msg=\"" + otherText["SelTanker"] + "\" >\n";
		//modFrmhtml += displayDropList(tanker, tankers_jslist,otherText["SelTanker"]);
		modFrmhtml += "</td>\n";

		if( has_personnel == "Y" )
		{
			modFrmhtml += " </tr>\n";
			modFrmhtml += "<tr>\n";
		}
	}

	if( has_sched == "Y" || has_non_sched == "Y" )
	{
		modFrmhtml += " <tr>\n";

		modFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Equipment"] + "</td>\n";
		modFrmhtml += "<td>:</td>\n";
		modFrmhtml += "<td>\n";
		modFrmhtml += "<select id=\"selKeyEquipment\" dataType=\"Require\" name=\"selKeyEquipment\"";
		modFrmhtml += " msg=\"" + otherText["SelEquipment"] + "\" >\n";
		if( has_sched == "Y" )
		{
			modFrmhtml += displayDropList(equipment, scheds_jslist,otherText["SelEquipment"]);
		}
		else
		{
			modFrmhtml += displayDropList(equipment, nonscheds_jslist,otherText["SelEquipment"]);
		}
		modFrmhtml += "</td>\n";
		if( has_tanker == "Y" )
		{
			modFrmhtml += " </tr>\n";
			modFrmhtml += "<tr>\n";
		}
	}
	if (key_typ_id == "3" || key_typ_id == "5")
	{
		modFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["KeyPin"] + "</td>\n";
		modFrmhtml += "<td>:</td>\n";
		modFrmhtml +="<td><table><tr><td>\n";
		modFrmhtml += "<input type=\"text\" name=\"selKeyPin\" id=\"selKeyPin\"";
		if (pin == "")
		        modFrmhtml += " size=\"6\" msg=\""+otherText["EnterKeyPin"]+"\" maxlength=\"6\" value=\"" + pin + "\" disabled>\n";
		else
		        modFrmhtml += " size=\"6\" msg=\""+otherText["EnterKeyPin"]+"\" maxlength=\"6\" value=\"****\" disabled>\n";
		modFrmhtml +="<td><input type=\"checkbox\" name=\"reset_pin\" value=\"on\" title=\"Reset PIN to default value\">" + otherText["ResetPIN"] + "</input></td>\n";
                if (cmpy_req_pin != "Y")
    		    modFrmhtml +="<td><input type=\"checkbox\" name=\"remove_pin\" value=\"on\" title=\"Set PIN value to blank\">" + otherText["RemovePIN"] + "</input></td>\n";
		modFrmhtml +="</td></tr></table></td>\n";
	}
    
	modFrmhtml += " </tr>\n";
	modFrmhtml += "</table>\n";

	modFrmhtml +="</td>\n";
	modFrmhtml += " </tr>\n";

	modFrmhtml += frmButtRow_HTML(commBtnText["Modify"], 1);

	modFrmhtml +="</td>\n";
	modFrmhtml +="</tr>\n";

	modFrmhtml +="</table>\n";
	modFrmhtml += "</div>\n";
	modFrmhtml += "</form>\n";
	modFrmhtml += fieldstFoot_HTML();

	return modFrmhtml;
}
/*============================================================================*/
function
addHTML()
{
	//alert("issuerCd is " + issuerCd );
	var addFrmhtml ="";

	addFrmhtml += fieldst_HTML(otherText["Add"]);
  addFrmhtml += "                            <div class=\"adminform\">\n";
  addFrmhtml +="<table width=\"100%\">\n";
	addFrmhtml += infotextRow_HTML(" width=\"100%\" ",otherText["AddInstr"]);
	addFrmhtml += " <form name=\"addNew\" method =\"post\" id=\"addNew\"";
	addFrmhtml += " action=\"id_assignment.cgi\" onsubmit=\"return checkidAssignment(this);\">\n";
	addFrmhtml += "<input type=\"hidden\" name=\"op\" value=\"" + opValues["addSubmit"] + "\">\n";
	addFrmhtml += "<input type=\"hidden\" name=\"selKeyCo\" value=\"" + issuerCd +  "\">\n";
	addFrmhtml += "<input type=\"hidden\" name=\"selKeyType\" value=\"" + key_typ_id +  "\">\n";
	addFrmhtml += "<input type=\"hidden\" name=\"issuerCd\" value=\"" + issuerCd +  "\">\n";
	addFrmhtml += "<input type=\"hidden\" name=\"key_typ_id\" value=\"" + key_typ_id +  "\">\n";
	addFrmhtml += "<table width=\"100%\">\n";

	addFrmhtml += " <tr>\n";
	addFrmhtml += "<td width=\"100%\">\n";

	addFrmhtml += "<table>\n";

	// First row in form
	addFrmhtml += " <tr>\n";

	addFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Nr"] + "</td>\n";
	addFrmhtml += "<td>:</td>\n";
	addFrmhtml +="<td>\n";
	addFrmhtml += "<input type=\"text\" name=\"selKeyNo\"";
	addFrmhtml += " msg=\"" + otherText["SpecifyKeyNr"] + "\"\n";
	// Bugzilla 1168/1163 - only accept numeric input and limit input size
	addFrmhtml += " dataType=\"PositiveInt\" value=\"\" maxlength=9>\n";
	addFrmhtml +="</td>\n";

	addFrmhtml += " </tr>\n";

	// Second row in form
	addFrmhtml += " <tr>\n";

	addFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["PhysType"] + "</td>\n";
	addFrmhtml += "<td>:</td>\n";
	addFrmhtml += "<td>\n";
	addFrmhtml += "<select id=\"selKeyPtype\" dataType=\"Require\" name=\"selKeyPtype\"";
	addFrmhtml += " msg=\"" + otherText["SelPhysType"] + "\">\n";
	addFrmhtml += displayDropList(ptype, phys_types_jslist,otherText["SelPhysType"]);
	addFrmhtml += "</td>\n";

	addFrmhtml += "&nbsp;&nbsp;<td class=\"infotextheading\">" + columnHdrs["KeyText"] + "</td>\n";
	addFrmhtml += "<td>:</td>\n";
	addFrmhtml +="<td>\n";
	addFrmhtml += "<input type=\"text\" name=\"selKeyText\"";
	addFrmhtml += " msg=\"" + otherText["SpecifyKeyText"] + "\"\n";
	addFrmhtml += " size=\"60\" dataType=\"Require\" value=\"\" >\n";
	addFrmhtml +="</td>\n";

	addFrmhtml += " </tr>\n";

	// Third row in form
	addFrmhtml += " <tr>\n";

	addFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["TimeCode"] + "</td>\n";
	addFrmhtml += "<td>:</td>\n";
	addFrmhtml += "<td>\n";
	addFrmhtml += "<select id=\"selKeyTcd\" dataType=\"Require\" name=\"selKeyTcd\"";
	addFrmhtml += " msg=\"" + otherText["SelTcd"] + "\">\n";
	addFrmhtml += displayDropList(Tcd, tcd_jslist,otherText["SelTcd"]);
	addFrmhtml += "</td>\n";

	addFrmhtml += "&nbsp;&nbsp;<td class=\"infotextheading\">" + columnHdrs["KeyLock"] + "</td>\n";
	addFrmhtml += "<td>:</td>\n";
	addFrmhtml +="<td>\n";
	addFrmhtml += "<select id=\"selLock\" dataType=\"Require\" name=\"selLock\"";
	addFrmhtml += " msg=\"" + otherText["SelKeyLock"] + "\">\n";
	addFrmhtml += displayDropList(lock, lock_jslist,otherText["SelKeyLock"]);
	addFrmhtml +="</td>\n";

	addFrmhtml += " </tr>\n";

	if( has_personnel == "Y" )
	{
		// Fourth row in form
		addFrmhtml += " <tr>\n";

		addFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Employer"] + "</td>\n";
		addFrmhtml += "<td>:</td>\n";
		addFrmhtml += "<td>\n";
		addFrmhtml += "<select id=\"selKeyEmployer\" dataType=\"Require\" name=\"selKeyEmployer\"";
		addFrmhtml += " msg=\"" + otherText["SelEmployer"] + "\"";
		addFrmhtml += " onchange=\"update(document.addNew, this, document.addNew.selKeyPsn)\">\n";
		addFrmhtml += displayDropList(employer, employers_jslist,otherText["SelEmployer"]);
		addFrmhtml += "</td>\n";

		addFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["PsnName"] + "</td>\n";
		addFrmhtml += "<td>:</td>\n";
		addFrmhtml += "<td>\n";
		addFrmhtml += "<select id=\"selKeyPsn\" dataType=\"Require\" name=\"selKeyPsn\"";
		addFrmhtml += " msg=\"" + otherText["SelKeyPsn"] + "\">\n";
		addFrmhtml += displayDropList_Psn("", psn_jslist,otherText["SelKeyPsn"]);
		addFrmhtml += "</td>\n";

		addFrmhtml += " </tr>\n";


		// Fifth row in form
		addFrmhtml += " <tr>\n";

		addFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Role"] + "</td>\n";
		addFrmhtml += "<td>:</td>\n";
		addFrmhtml += "<td>\n";
		addFrmhtml += "<select id=\"selKeyRole\" dataType=\"Require\" name=\"selKeyRole\"";
		addFrmhtml += " msg=\"" + otherText["SelRole"] + "\" >\n";
		addFrmhtml += displayDropList(role, roles_jslist,otherText["SelRole"]);
		addFrmhtml += "</td>\n";

		addFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Drawer"] + "</td>\n";
		addFrmhtml += "<td>:</td>\n";
		addFrmhtml += "<td>\n";
		addFrmhtml += "<select id=\"selKeyDrwr\" name=\"selKeyDrwr\" > \n";
		addFrmhtml += displayDropList(drawer, drawers_jslist,otherText["SelDrawer"]);
		addFrmhtml += "</td>\n";

		addFrmhtml += " </tr>\n";

		// Sixth row in form
		addFrmhtml += " <tr>\n";

		addFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["DefaultSupplier"] + "</td>\n";
		addFrmhtml += "<td>:</td>\n";
		addFrmhtml += "<td>\n";
		addFrmhtml += " <select id=\"selKeySupplier\" name=\"selKeySupplier\" > \n ";
		addFrmhtml += displayDropList(spsupp, suppliers_jslist,otherText["SelSpSupplier"]);
		addFrmhtml += "</td>\n";
	}
	else
	{
		// Sixth row in form
		addFrmhtml += " <tr>\n";
	}

	if( has_tanker == "Y" )
	{
		addFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Tanker"] + "</td>\n";
		addFrmhtml += "<td>:</td>\n";
		addFrmhtml += "<td>\n";
		
		addFrmhtml += "<table class=\"NewActionBaseTable\">\n";
		addFrmhtml += "<tbody>\n";
		addFrmhtml += "<tr>\n";
		addFrmhtml += "<td class=\"popupLinkrow\">\n";
		addFrmhtml += "<input type=\"text\" name=\"selKeyTanker\" id=\"selKeyTanker\" value=\"\" style=\"FONT-SIZE:1.00em\" dataType=\"Require\" msg=\""+otherText["SelTanker"]+"\"/>\n"; 
		addFrmhtml += "</td>\n";
		addFrmhtml += "<td width=\"15\">\n";
		addFrmhtml += "<img src=\"/images/dropimage.gif\" width=\"15\" height=\"16\" onclick=\"as1.doAjaxRequest();\">\n";
		addFrmhtml += "</td>\n";
		addFrmhtml += "</tr>\n";
		addFrmhtml += "</tbody>\n";
		addFrmhtml += "</table>\n";
		
		
		//addFrmhtml += "<select id=\"selKeyTanker\" dataType=\"Require\" name=\"selKeyTanker\"";
		//addFrmhtml += " msg=\"" + otherText["SelTanker"] + "\" >\n";
		//addFrmhtml += displayDropList(tanker, tankers_jslist,otherText["SelTanker"]);
		addFrmhtml += "</td>\n";

		if( has_personnel == "Y" )
		{
			addFrmhtml += " </tr>\n";
			addFrmhtml += "<tr>\n";
		}
	}

	if( has_sched == "Y" || has_non_sched == "Y" )
	{
		addFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["Equipment"] + "</td>\n";
		addFrmhtml += "<td>:</td>\n";
		addFrmhtml += "<td>\n";
		addFrmhtml += "<select id=\"selKeyEquipment\" dataType=\"Require\" name=\"selKeyEquipment\"";
		addFrmhtml += " msg=\"" + otherText["SelEquipment"] + "\" >\n";
		if( has_sched == "Y" )
		{
			addFrmhtml += displayDropList(equipment, scheds_jslist,otherText["SelEquipment"]);
		}
		else
		{
			addFrmhtml += displayDropList(equipment, nonscheds_jslist,otherText["SelEquipment"]);
		}
		addFrmhtml += "</td>\n";
	
		if( has_tanker == "Y" )
		{
			addFrmhtml += " </tr>\n";
			addFrmhtml += "<tr>\n";
		}

	}
	if (key_typ_id == "3" || key_typ_id == "5")
	{
		addFrmhtml += "<td class=\"infotextheading\">" + columnHdrs["KeyPin"] + "</td>\n";
		addFrmhtml += "<td>:</td>\n";
		addFrmhtml +="<td>\n";
		addFrmhtml += "<input type=\"text\" name=\"selKeyPin\" id=\"selKeyPin\"";
		addFrmhtml += " size=\"6\" msg=\""+otherText["EnterKeyPin"]+"\" maxlength=\"6\" value=\"****\" disabled>\n";
		addFrmhtml +="</td>\n";
	}
	addFrmhtml += "</tr>\n";

	addFrmhtml += "</table>\n";

	addFrmhtml +="</td>\n";
	addFrmhtml += " </tr>\n";

	addFrmhtml += frmButtRow_HTML(commBtnText["Add"], 1);

	addFrmhtml +="</td>\n";
	addFrmhtml +="</tr>\n";

	addFrmhtml +="</table>\n";
	addFrmhtml +="</div>\n";
	addFrmhtml += "</form>\n";
	addFrmhtml += fieldstFoot_HTML();
	return addFrmhtml;

	return addFrmhtml;

}
/*============================================================================*/
function
renderPage(cRec, cCol, cState, cPageState,priv, lang)
{ 
	var curRecord = cRec;
	var curColumnToSort = cCol;
	var curViewDetailState = cState;
	var curPageIn = cPageState;
	var curPriv = priv;

	//alert("op is " + op + " priv is " + priv );
	var newPage = "";
	var pageTitle="";
	var pageHeading="";

	var hundreds = 0;
	var units = 0;
	var tens = 0;
	if( curViewDetailState > 0 )
	{
		units = curViewDetailState % 10 ;
		hundreds = Math.floor(curViewDetailState/100);
		tens = Math.floor(curViewDetailState/10) % 10;
	}
	//alert("curViewDetailState = " + curViewDetailState + " tens = " + tens);

	if( tens >= 2 )
	{
		switch( tens )
		{
			case 5:
				alert(alertMsgs["invalidData"]);
				break;
			case 6:
				alert(alertMsgs["personRequired"]);
				break;
			case 7:
				alert(alertMsgs["supplierRequired"]);
				break;
			case 8:
				alert(alertMsgs["drawerRequired"]);
				break;
			case 9:
				alert(alertMsgs["alreadyPresent"]);
				break;
			default:
				alert(alertMsgs["opFailed"]);
				break;
		}
	}
	
	if( curViewDetailState == opValues["report"] )
	{
		newPage += viewReport();
  		return (newPage);
	}

	newPage += pgHeader(curViewDetailState,pageTitle, lang);
	//local_HeadrHTML function is local function give 
  // the ability to append any thing to the current page
  newPage += local_HeadrHTML(newPage);
  //getToolBar_HTML function of comm_HTML.js file responsible for  
  // outputting the tool bar
  //controls the search and print buttons as well
  newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading), 
							check_ifReqPrint(ops_req_print, curViewDetailState), 
								check_ifReqSearch(ops_req_search, curViewDetailState) );
  newPage +="<tr>\n";  
  newPage +="<td width=\"100%\">             \n";
  newPage +="<div class=\"content\" id=\"content\">\n";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";  
  //all the rows start here
  
  newPage += displayGlblFrm();
  
  //all the buttons will come here
  newPage +="<tr>\n";
	newPage +="<td align=\"center\">\n";
	if (curPriv >=7
		&& curViewDetailState != opValues["add"]
		&& curViewDetailState != opValues["modify"]
		&& curViewDetailState != opValues["viewDetails"])
	{
	  
		
    newPage += "<input type=\"button\" value=\"";
		newPage += buttonsTxt["AddNew"] + "\" 	style=\"FONT-SIZE:0.75em; WIDTH:  10.5em;\" class=\"just_button\"";
		newPage += " onmouseover=\"this.className='";
		newPage += " just_buttonHover'\" onmouseout=\"this.className='just_button'\"\n";
		newPage += " onclick=\"document.glblFrm.op.value=" + opValues["add"];
		newPage += ";submitmyform(document.glblFrm);\">\n";
		
	}
	else
	{
		newPage += "<input type=\"button\" value=\"";
		newPage += buttonsTxt["backToMain"] + "\" style=\"FONT-SIZE:0.70em;\" class=\"just_button\"";
		newPage += " onmouseover=\"this.className='";
		newPage += " just_buttonHover'\" onmouseout=\"this.className='just_button'\"\n";
		newPage += " onclick=\"document.glblFrm.op.value=1";
		newPage += ";document.glblFrm.submit();\">\n";
	}
	
	newPage +="</td>\n";
	newPage +="</tr>\n";
  //end of all the buttons
  
  /* Page navigation */
  if( parseInt(pg) > 0 && parseInt(pagesTotal) != 0 ) 
  {
    // newPage += nextPage_long(pagesTotal, pg, "trans_list.cgi", "pg", '&tankTerm='+tankTerm+'&cmpyCd='+cmpyCd+'&cmpy_typ_id='+cmpy_typ_id+'&op='+op);
      newPage += nextPage(pagesTotal,pg,"id_assignment.cgi", "pg");
  }
  //rest of the page will be decided here
  newPage += "<tr> \n";
  newPage += "<td>\n ";
  newPage +=displayStatusMsg (op);
  if( curViewDetailState <= 1  || curViewDetailState == opValues["search"] )
	{
		newPage += viewSummary();
  		
	}
	else
	{
		switch( curViewDetailState )
		{
			case opValues["viewDetails"]:
				if( curPriv >= 1 )
				{
					newPage += viewHTML();
				}
				else
				{
					alert(alertMsgs["InsufficientPriv"]);
				}
				break;
			case opValues["add"]:
				//alert("add case");
				if( curPriv >= 7 )
				{
					newPage += addHTML();
				}
				else
				{
					alert(alertMsgs["InsufficientPriv"]);
				}
				break;
			case opValues["modify"]:
				//alert("modify case");
				if( curPriv >= 6 )
				{
					newPage += modHTML();
				}
				else
				{
					alert(alertMsgs["InsufficientPriv"]);
				}
				break;
			default:
				//alert("default case");
				break;
		}
	}
  
  //
  newPage+="					</td>\n";
	newPage+="					</tr>\n";
	
  // table for everything ends here
  newPage +="<\/tbody>\n";
  newPage +="<\/table>\n";
  newPage +="<\/div>\n";
  
  newPage +="<script type=\"text/javascript\">\n";
  newPage +="var options1 = {\n";
	newPage +="script:\"/cgi-bin/en/load_scheds/tankers.cgi?carrier=&\",\n";
	newPage +="varname:\"input\",\n";
	newPage +="minchars:1\n";
	newPage +="};\n";
	newPage +="var as1 = new AutoSuggest('selKeyTanker', options1);\n";
	newPage +="</script>\n";
  
  
  newPage +="</td>              \n";  
  newPage +="</tr>\n";
  
  
  
  newPage +="</tbody>\n";
  newPage +="</table>\n";
  newPage +="<!-- End of table to add the header lines -->\n";
  newPage +="\n";
  newPage +="</td>              \n";
  newPage +="</tr>\n";
  newPage +="</tbody>\n";
  newPage +="</table>\n";


  newPage +="\n";
  newPage +="</body>\n";
  newPage +="</html>\n";
  newPage +="\n"; 
	return(newPage);
  document.close();
  if (typeof writeBack != 'undefined')writeBack();

	



	

	
}


function adjustSearchFields()
{
	var tnkrElement = getElemRefs('tanker_id_search');
	var psnlElement = getElemRefs('personnel_id_search');
	var key_type = document.glblFrm.key_typ_id.value;

	if ( key_type == 3 )
	{ //personnel card
		psnlElement.disabled = false;
		tnkrElement.disabled = true;
		tnkrElement.value = "";
	}
	else
	if ( key_type == 4 )
	{ //tanker card
		psnlElement.disabled = true;
		tnkrElement.disabled = false;
		psnlElement.value = "";
	}
	else
	if ( key_type == 5 )
	{ //combo card
		psnlElement.disabled = false;
		tnkrElement.disabled = false;
	}
	else
	{
		if (key_type == "" || key_type == "-1")
		{
			psnlElement.disabled = false;
			tnkrElement.disabled = false;
		}
		else
		{
			psnlElement.disabled = true;
			tnkrElement.disabled = true;
			tnkrElement.value = "";
			psnlElement.value = "";
		}
	}
}

/*============================================================================*/
function displayDropList_Psn(selectedvalue, list,defMsg)
{
  var massList = "";
  var matchFound=0;
  for (i=1; i<list.length; i++)
  {
    
      massList += "<option value=\""+list[i][0]+"\"";
       if(list[i][0]==selectedvalue)
       {
          matchFound=1;
          massList += "selected";
       }
      massList +=">"+list[i][0]+"\t -- \t"+list[i][1]+"</option>\n";
    
  }
   massList += "<option value=\"\"";
  if(matchFound==0)//no matchfound
  {
   
    massList += "selected";
   
  }
   massList +=">"+defMsg+"</option>\n";
 
  massList +="</select>\n";
  return massList;

}
function update(myformObj, parentOption, childOption) 
{
  var new_options;
  var parent_select;
  clear(childOption);
  //          parent_select = parentOption.options[parentOption.selectedIndex].value;
  parent_select = parentOption.value;
  new_option = new Option(otherText["SelKeyPsn"], "", false, false);
  childOption.options[childOption.length] = new_option;
  for (i in psn_jslist )
  {
    if (psn_jslist[i][2] == parent_select)
    {
      new_option = new Option((psn_jslist[i][0]+"\t -- \t"+psn_jslist[i][1]), psn_jslist[i][0], false, false);
      childOption.options[childOption.length] = new_option;                   
      childOption.selectedIndex = 0;
    }
   }
}
function clear(childOption) 
{
  while(childOption.length != 0)
  {
    childOption.options[childOption.length-1] = null;
  }
 //history.go(0);

}
/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ nextPage] 
[PURPOSE]  		-> 	Responsible for displaying the HTML for the next page
                  links and use the btnLocation_HTML and btnLocation_HTML_nexPreLk
                  functions to display the URL and use the 
                  justChaneMyLocation javascript function to carry the variables
                  to the next page
          
[Parameter]  	-> totalPages integer Total number of pages for this display
              -> curPg integer current page number user is looking at
              -> curPgName string is the CGI file name user browsing
              -> curPgVarName string is variable like pg we have in all the scripts
                 but if page is multilevel this variable change e.g on 
                 delivery location this variable is pg_3
[AUTHOR]  		-> Abdul Shakoor (DKI) Sepetember 27, 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
/*
function nextPage(totalPages, curPg, totalRows,curPgName, curPgVarName)
nextPage(totalPages, curPg, curPgName, curPgVarName)
*/
function nextPage(totalPages, curPg, curPgName, curPgVarName)
{
  
   // At this stage Only Know Number of Pages
  // so get the number of items
  var num_items = (totalPages*items_per_page);
  // A Block Of Pages So User Can Jump Between the Pages
  // on the Page it should look like this
  //  [ 31-40  41-50  51-60]
  var block_size = 10;
  //  Current Page Number as passed by the nextPage function call
  var page_number = curPg;
  // do some mathemetical stuff
  // in order to get the current page number and
  // page items right
  var num_pages = Math.max(1, Math.ceil(num_items/items_per_page));
	var page_number = Math.min(page_number, num_pages);
	var num_blocks = Math.ceil(num_pages/block_size);
	var block_number = Math.floor(((page_number-1)/block_size));
	
	// start putting HTML string in the 
  // nextPgHTML variable
	var nextPgHTML = "";
	nextPgHTML += "<tr> \n";
	nextPgHTML += "<td align=\"center\" class=\"nextPageLink\">\n ";
	
	// if the page number is not 1 that means user is not on page 
  // display the previous page link and a link to the
  // first page as well on the page looks like this <<  <
	if (!(page_number == 1)) 
  {
    //$html_output .= "<a href=\"" . $url . "?page_number=1" . $query_string . "\"><b>&lt;&lt;</b></a>";
    nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) +"&issuerCd='+issuerCd+'&key_typ_id='+key_typ_id+'&key_no='+key_no+'&op=" + op + "'); ", "&lt;&lt;");
		foobar = page_number - 1;
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		 nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) +"&issuerCd='+issuerCd+'&key_typ_id='+key_typ_id+'&key_no='+key_no+'&op=" + op + "'); ", "<b>&lt;<\/b>");
		
	}
  else 
  {
		nextPgHTML += "<b>&lt;&lt;</b>&nbsp;&nbsp;<b>&lt;</b>";
	} 
  // if number of block are more than 1
  // that means there more than 20 or 30 page
  // for easy pagination can make the blocks of pages  
  // display the previous page link and a link to the
  //   on the page looks like this [ 31-40  41-50  51-60]
  if (block_number > 0) 
  {
		nextPgHTML += "&nbsp;&nbsp;<b>[</b>";
		for (var i=0; i<(block_number); i++) 
    {
			var foobar1 = i*block_size + 1;	// page number to be linked
			var foobar2 = (i+1)*block_size;
			//$html_output .= "&nbsp;<a href=\"" . $url . "?page_number=" . $foobar1 . $query_string . "\">" . $foobar1 . "-" . $foobar2 . "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) +"&issuerCd='+issuerCd+'&key_typ_id='+key_typ_id+'&key_no='+key_no+'&op=" + op + "'); ", foobar1 + "-" + foobar2);
		}
		nextPgHTML += "<b>]</b>";
	}

  // Time to create the links to the 10 pages
  // link to the pages look like this
  // <<  <  1 2  3  4  5  6  7  8  9  10 
  // var block_number = (((page_number-1)/block_size)); 
  //alert("block_number" +block_number);
  foobar1 = block_number*block_size + 1;
	foobar2 = Math.min((block_number+1)*block_size, num_pages);
	foobar2++;
	//alert(foobar1);
	//alert(foobar2);
	for (var i=foobar1; i<page_number; i++) 
  {
    //alert("I am in for loop "+i);		
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) +"&issuerCd='+issuerCd+'&key_typ_id='+key_typ_id+'&key_no='+key_no+'&op=" + op + "'); ", i);
	}
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	for (var i=page_number+1; i<foobar2; i++) 
  {
    //alert("I am in for for foobar2 loop "+i);	
    nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) +"&issuerCd='+issuerCd+'&key_typ_id='+key_typ_id+'&key_no='+key_no+'&op=" + op + "'); ", i);
	}
	// if number of block are more than 1
  // that means there more than 20 or 30 page
  // for easy pagination can make the blocks of pages  
  // display the previous page link and a link to the
  // on the page looks like this [ 31-40  41-50  51-60]	
	if (block_number+1 < num_blocks) 
  {
		nextPgHTML += "&nbsp;&nbsp;<b>[</b>";
		for (var i=block_number+1; i<num_blocks; i++) 
    {
      
			foobar1 = i*block_size + 1;	// page number to be linked
			foobar2 = Math.min((i+1)*block_size, num_pages);
			var tempTxt = foobar1;
			
			if (foobar2 > foobar1) {
				tempTxt += "-" + foobar2;
			}
			//$html_output .= "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) +"&issuerCd='+issuerCd+'&key_typ_id='+key_typ_id+'&key_no='+key_no+'&op=" + op + "'); ", tempTxt);
		}
		nextPgHTML += "<b>]</b>";
	}
  // if the page number is not equal to total num of pages
  // that means we can dispay the link to the next page
  // and the last pge
  // link looks like this > >>
	if (!(page_number == num_pages)) 
  {
		foobar = page_number + 1;
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) +"&issuerCd='+issuerCd+'&key_typ_id='+key_typ_id+'&key_no='+key_no+'&op=" + op + "'); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) +"&issuerCd='+issuerCd+'&key_typ_id='+key_typ_id+'&key_no='+key_no+'&op=" + op + "'); ", "<b>&gt;&gt;<\/b>");
	} else {
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}

	/*
  if (curPg > 1)
	{
		
    //nextPgHTML +="<a href=\"javascript:document.glblFrm.pg.value="+(curPg-1)+";document.glblFrm.op.value=0;document.glblFrm.submit();\">Previous</a>\n";
   //		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg-1) + "' );\">Previous</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg-1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", otherText["btn_prev_page"]);
	}

	nextPgHTML += "&nbsp; Current=" + curPg + "/" + totalPages + " &nbsp; ";
	if (totalPages > curPg)
	{
//		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg+1) + "' );\">Next</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg+1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", "&lt;&lt;");
	}
  */
	nextPgHTML += "</td>\n ";
	nextPgHTML += "</tr> \n";

	return nextPgHTML;
}
function checkIfTankerFormValid(myobject)
{
	var isFormValid = false; 
	isFormValid = Validator.Validate(myobject,1);
	if (document.getElementById('selKeyTanker') != null && isFormValid)
	{
		myTankerCd = myobject.selKeyTanker.value;
		if ( myTankerCd!="")
		{
			var myAvailTanker = as1.getSuggestionArr();
			//alert("here is sugg length"+myAvailTanker.length);
			if(myAvailTanker && myAvailTanker.length>0)
			{
				for (var i=0;i<myAvailTanker.length;i++)
				{
					var a = myAvailTanker[i];
					if (a==myTankerCd)return true;
				}
			}
			else if (has_tanker=='Y' && (myTankerCd == assignments_tab[1][5]) ) // abdul adding this to fix Ajax Problem, tanker has not been changed so no need to re-check it
			{
				return true;
				
			}
			alert(otherText["SelValidTanker"]);
			myobject.selKeyTanker.focus();
			return false;


		}
		else
		{
			alert(otherText["SelValidTanker"]);
			myobject.selKeyTanker.focus();
			return false;

		};
	}
	else
	{
		return isFormValid;
	}
}

/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage)
{
  newPage +="<script>\n";
  newPage += "/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
	newPage += "FUNCTION [ submitmyform] \n";
	newPage += "[PURPOSE]  		-> 	Always use this method to submit a form,\n";
	newPage += "					gives me the flexbility of doing validation\n";
	newPage += "					and addition if required before i submit the form\n";
	newPage += "          \n";
	newPage += "[Parameter]  	-> myobject FORM OBJECT Parameter is the form need to be submit\n";
	newPage += "[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
	newPage += "'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
	newPage += "function submitmyform(myobject)\n";
	newPage += "{\n";
	//newPage +="	           alert(' You are in submitmyform'); return false;\n";
	//newPage += "var myAvailTanker = as1.getSuggestionArr();\n";
	//newPage += "alert('here is the length '+myAvailTanker.length);\n";
	newPage +="return (Validator.Validate(myobject,1) && myobject.submit());\n";
	newPage += "}\n";

  	newPage +="//Check duplicate Id Assignment us inline CGI \n";
	newPage +="function checkidAssignment(myobject)\n";
	newPage +="{\n";
	newPage +="	 if (checkIfTankerFormValid(myobject))\n";
	newPage +="	 {\n";
	newPage +="     var mycgi = '../../../cgi-bin/en/access_ctrl/id_assignment_dup_check.cgi'; \n";
	newPage +="     var myqry = 'g_selKeyCo="+issuerCd+"&g_selKeyNo='+document.addNew.selKeyNo.value ;\n";
	newPage +="     var oTN = loadHtml(mycgi, myqry);\n";
	//newPage +="	           alert(oTN);\n";
	//newPage +="    return false; \n";
	
	newPage +="	    if ( oTN != 0) { \n";
	newPage +="	           alert(' "+alertMsgs["alreadyPresent"]+"');\n";
	newPage +="	           document.addNew.selKeyNo.focus ;\n";
	newPage +="            return false; \n";
	newPage +="	     }\n";
  	newPage +="    return true; \n";	
	newPage +="	}\n";
	newPage +="    return false; \n";
	newPage +="}\n";

	newPage +="function submitAction(myobject, frmNum)\n";
	newPage +="{\n";
	newPage +=    "var myselectedvalue = myobject.options[myobject.selectedIndex].value;";
	newPage +="   if(myselectedvalue==\"" + opValues["delete"] + "\")\n";
	newPage += "  {\n";
	newPage +="     if(confirm('Are you sure you want to delete?'))\n";
	newPage += "    {\n";
	//hdr += "alert(\"Delete - frmNum is \" + frmNum);\n";
	newPage += "      eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "      return true;\n";
	newPage += "    }\n";
	newPage += "    else\n";
	newPage += "    {\n";
	newPage += "      eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
	newPage += "    }\n";
	newPage +="   }\n";
	newPage +="   else\n";
	newPage += "  {\n";
	//hdr += "alert(\" Modify - frmNum is \" + frmNum);\n";
	newPage += "    eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "    return true;\n";
	newPage +="   }\n";
	newPage +="}\n";

	newPage += "</script>\n";

	newPage += "\n";

	newPage += "</head>\n";
  return (newPage);
}
function submitsearchFrm(myobject)
{
	var myIdsearchStr = document.glblFrm.key_no.value;
	var myTnkrsearchStr = document.glblFrm.tanker_id_search.value;
	var myPersearchStr = document.glblFrm.personnel_id_search.value;
	var myKeyTxtsearchStr = document.glblFrm.key_txt_search.value;
	var validRegEx = /^[A-Za-z0-9 _ -]*[A-Za-z0-9][A-Za-z0-9 _ -]*$/;
	if(myIdsearchStr.length>0 && (myIdsearchStr.match(validRegEx)==null))
	{
		alert(alertMsgs["invalidSearchStr"]);
		return false;
	}
	if(myIdsearchStr.length>0 && (myIdsearchStr.match(validRegEx)==null))
	{
		alert(alertMsgs["invalidSearchStr"]);
		return false;
	}
	if(myTnkrsearchStr.length>0 && (myTnkrsearchStr.match(validRegEx)==null))
	{
		alert(alertMsgs["invalidSearchStr"]);
		return false;
	}
	if(myPersearchStr.length>0 && (myPersearchStr.match(validRegEx)==null))
	{
		alert(alertMsgs["invalidSearchStr"]);
		return false;
	}
	if(myKeyTxtsearchStr.length>0 && (myKeyTxtsearchStr.match(validRegEx)==null))
	{
		alert(alertMsgs["invalidSearchStr"]);
		return false;
	}

	myobject.submit();


}
function submitreportFrm(myobject)
{
	var myIdsearchStr = document.glblFrm.key_no.value;
	var myTnkrsearchStr = document.glblFrm.tanker_id_search.value;
	var myPersearchStr = document.glblFrm.personnel_id_search.value;
	var myKeyTxtsearchStr = document.glblFrm.key_txt_search.value;
	var validRegEx = /^[A-Za-z0-9 _ -]*[A-Za-z0-9][A-Za-z0-9 _ -]*$/;
	if(myIdsearchStr.length>0 && (myIdsearchStr.match(validRegEx)==null))
	{
		alert(alertMsgs["invalidSearchStr"]);
		return false;
	}
	if(myIdsearchStr.length>0 && (myIdsearchStr.match(validRegEx)==null))
	{
		alert(alertMsgs["invalidSearchStr"]);
		return false;
	}
	if(myTnkrsearchStr.length>0 && (myTnkrsearchStr.match(validRegEx)==null))
	{
		alert(alertMsgs["invalidSearchStr"]);
		return false;
	}
	if(myPersearchStr.length>0 && (myPersearchStr.match(validRegEx)==null))
	{
		alert(alertMsgs["invalidSearchStr"]);
		return false;
	}
	if(myKeyTxtsearchStr.length>0 && (myKeyTxtsearchStr.match(validRegEx)==null))
	{
		alert(alertMsgs["invalidSearchStr"]);
		return false;
	}

//	myobject.submit();
window.open("id_assignment.cgi?op="+opValues["report"]+"&issuerCd="+document.glblFrm.issuerCd.value+"&key_typ_id="+document.glblFrm.key_typ_id.value+"&key_no="+document.glblFrm.key_no.value+"&tanker_id_search="+document.glblFrm.tanker_id_search.value+"&personnel_id_search="+document.glblFrm.personnel_id_search.value+"&key_txt_search="+document.glblFrm.key_txt_search.value+"&ftsize="+"16");

}
/*============================================================================*/
function
viewReport()
{
	var vs = "";
	var i = 0;

	//alert("viewSummary");
	vs += "<div id=\"printReady\">\n";
	vs += "<h3 style=\"color:black;text-align:center\">" + headings["ReportTitle"] + "</h3>\n";
	vs += table_begin("M", 0,"");
//	vs += "<table>\n";
	vs += "<tbody>\n";
	
	vs += "<!-- this is the Table Heading Row\n";
	vs += "                              -->\n";
	vs += "<tr class=\"row1\">\n";
	vs += "<td >" + columnHdrs["Nr"] + "</td>\n";
	vs += "<td >" + columnHdrs["Issuer"] + "</td>\n";
	vs += "<td >" + columnHdrs["PhysType"] + "</td>\n";
	vs += "<td >" + columnHdrs["KeyText"]  + "</td>\n";
	vs += "<td >" + columnHdrs["TimeCode"]  + "</td>\n";
	vs += "<td >" + columnHdrs["Tanker"] + "</td>\n";
	vs += "<td >" + columnHdrs["Drawer"] + "</td>\n";
	vs += "<td >" + columnHdrs["DefaultSupplier"] + "</td>\n";
	vs += "<td >" + columnHdrs["PsnName"] + "</td>\n";
	vs += "<td >" + columnHdrs["Role"] + "</td>\n";
	vs += "<td >" + columnHdrs["KeyLock"] + "</td>\n";
	vs += "<td >" + columnHdrs["KeyType"] + "</td>\n";
	vs += "<td >" + columnHdrs["Employer"] + "</td>\n";
	vs += "<td >" + columnHdrs["Equipment"] + "</td>\n";
	vs += "<td >" + columnHdrs["KeyPin"] + "</td>\n";
	vs += "</tr>\n";
	
	for( i = 1; i < assignments_tab.length; ++i )
	{
		//if 'NULL' value in assignments_tab array then print nothing
		//else print the details

		vs += "<tr class=\"row1\">\n";
		//0: number
		vs += "<td style=\"color:black\" >\n";
		vs += assignments_tab[i][0] + "\n";
		vs += "</td>\n";
		//1: issuer
		vs += "<td  >";
		vs += issuerName(assignments_tab[i][1]) + "\n";
		vs += "</td>\n";
		//2: physical type enum - convert to string
		vs += "<td  >";
		vs += pt_to_name(assignments_tab[i][2]) + "\n";
		vs += "</td>\n";
		//3: physical tag
		vs += "<td  >\n";
		vs += (assignments_tab[i][3] == 'NULL'? "":assignments_tab[i][3]) + "\n";
		vs += "</td>\n";
		//4: TimeCode 
		vs += "<td  >\n";
		vs += (assignments_tab[i][4] == 'NULL'? "":assignments_tab[i][4]) + "\n";
		vs += "</td>\n";
		//5: Tanker 
		vs += "<td  >\n";
		vs += (assignments_tab[i][5] == 'NULL'? "":assignments_tab[i][5]) + "\n";
		vs += "</td>\n";
		//6: Drawer 
		vs += "<td  >\n";
		vs += (assignments_tab[i][6] == 'NULL'? "":drawerNameFromCode(assignments_tab[i][6])) + "\n";
		vs += "</td>\n";
		//7: Default Supplier 
		vs += "<td  >\n";
		vs += (assignments_tab[i][7] == 'NULL'? "":supplierNameFromCode(assignments_tab[i][7])) + "\n";
		vs += "</td>\n";
		//8: Person name 
		vs += "<td  >\n";
		vs += (assignments_tab[i][8] == 'NULL'? "":assignments_tab[i][8]) + "\n";
		vs += "</td>\n";
	
		//9. role enum - convert to string
		vs += "<td  >";
		vs += roleDesc(assignments_tab[i][9]) + "\n";
		vs += "</td>\n";
		//10. key lock
		vs += "<td  >\n";
		vs += lock_to_name(assignments_tab[i][10]) + "\n";
		vs += "</td>\n";
		//11. key type
		vs += "<td  >\n";
		vs += kt_to_name(assignments_tab[i][11]) + "\n";
		vs += "</td>\n";
		//12: Employer 
		vs += "<td  >\n";
		vs += (assignments_tab[i][12] == 'NULL'? "":employerName(assignments_tab[i][12])) + "\n";
		vs += "</td>\n";
		//13. Transport Equipment
		vs += "<td  >\n";
		vs += (assignments_tab[i][13] == '0'? "":assignments_tab[i][13]) + "\n";
		vs += "</td>\n";
		//14: Key Pin 
		vs += "<td  >\n";
		vs += (assignments_tab[i][14] == 'NULL'? "":assignments_tab[i][14]) + "\n";
		vs += "</td>\n";
		
		vs += "</tr>\n";
	}
	vs += "</tbody>\n";
//	vs += "</table>\n";
	vs += "</div>\n";
	return vs;
}

