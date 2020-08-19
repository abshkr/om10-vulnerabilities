// The text for Report Type Admin
var opValues = new Array();

opValues["viewReport"] = 1;
opValues["viewReportFormat"] = 5;
opValues["modifyReport"] = 6;
opValues["modifyReportSubmit"] = 16;
opValues["modifyReportActive"] = 106;
opValues["insertReport"] = 7;
opValues["insertReportSubmit"] = 17;
opValues["deleteReport"] = 8;
opValues["deleteReportSubmit"] = 18;

opValues["listReportFormat"] = 10001;
opValues["modifyReportFormat"] = 10006;
opValues["modifyReportFormatSubmit"] = 10016;
opValues["toggleReportFormat"] = 10106;
opValues["moveupReportFormat"] = 10206;
opValues["movedownReportFormat"] = 10306;
opValues["movetopReportFormat"] = 10406;
opValues["movebottomReportFormat"] = 10506;



var t__Header1 = ["Report ID", "报表编号" ];
var t__Header2 = ["Report Name", "报表名称" ];
var t__Header3 = ["Report Key", "报表代码" ];
var t__Header4 = ["Report File", "报表文件头名" ];
var t__Header5 = ["Report Class", "报表类型" ];
var t__Header6 = ["Active", "是否启用？" ];
var t__Header7 = ["Report Template", "报表模板" ];
var t__Header8 = ["Report Period", "报表周期" ];

var rpttype_class_pos = 4;
var rpttype_period_pos = 5;
var rpttype_active_pos = 6;

var myColumns = [ml(t__Header1), ml(t__Header2), ml(t__Header3), ml(t__Header4), ml(t__Header5), ml(t__Header8), ml(t__Header6)];


var t__YOUR_ACTION = ["YOUR ACTION", "请选择" ];
var t__Select = ["Select ", "请选择" ];
var t__Enter = ["Please Enter ", "请输入" ];
var t__Others = ["Others","其他"];
var t__InvalidCode = ["This field allows A~Z,a~z, and 0~9 only!", "该字段只允许输入大小写英文字母和数字！" ];

var t__View_Report_Format = ["View Reports Screen","查看报表格式"];
var t__Toggle_Report = ["Toggle Report","启用|禁用"];
var t__Enable_Report = ["Enable Report","启用"];
var t__Disable_Report = ["Disable Report","禁用"];
var t__Adjust_Report = ["Adjust Report","调整报表格式"];

var otherText = new Array();
otherText["youraction"] =  ml(t__YOUR_ACTION);
otherText["viewReportFormat"] =  ml(t__View_Report_Format);
otherText["toggleReport"] =  ml(t__Toggle_Report);
otherText["enableReport"] =  ml(t__Enable_Report);
otherText["disableReport"] =  ml(t__Disable_Report);
otherText["adjustReport"] =  ml(t__Adjust_Report);


var t__Class_Details = ["Details Report", "明细报表"];
var t__Class_Summary = ["Summary Report", "汇总报表"];

var rpttype_class_jslist = new Array();
rpttype_class_jslist[1] = ml(t__Class_Details);
rpttype_class_jslist[2] = ml(t__Class_Summary);

var rpttype_class_droplist = [ ['', ''], [1, ml(t__Class_Details)], [2, ml(t__Class_Summary)] ];


var t__Period_Daily = ["Daily Report", "每日报表"];
var t__Period_Weekly = ["Weekly Report", "每周报表"];
var t__Period_Monthly = ["Monthly Report", "每月报表"];
var t__Period_Timely = ["Time-based Report", "基于时间的报表"];

var rpttype_period_jslist = new Array();
rpttype_period_jslist[1] = ml(t__Period_Daily);
rpttype_period_jslist[2] = ml(t__Period_Weekly);
rpttype_period_jslist[3] = ml(t__Period_Monthly);
rpttype_period_jslist[4] = ml(t__Period_Timely);

var rpttype_period_droplist = [ ['', ''], [1, ml(t__Period_Daily)], [2, ml(t__Period_Weekly)], [3, ml(t__Period_Monthly)], [4, ml(t__Period_Timely)] ];


var t__Active = ["Enable", "启用该报表" ];
var t__Non_Active = ["Disable", "禁用该报表" ];

var rpttype_active_droplist = [ ['', ''], [0, ml(t__Non_Active)], [1, ml(t__Active)] ];


var t__Del_Confirm = ["Are you sure you want to delete?", "您是否确定要删除本记录?"];
otherText["msg_del_confirm"] = ml(t__Del_Confirm);


var t__Add_Report = ["Add New Report", "新增报表格式"];
var t__Back_To_Report = ["Back to Report Page", "返回报表格式管理"];
otherText["btn_addNew_report"] = ml(t__Add_Report);
otherText["btn_bakto_reportPg"] = ml(t__Back_To_Report);


var t__Page_Title_Report = ["Report Administration, Report Format Management", "报表管理, 报表格式管理"];
var t__Page_Title_Report_Upd = ["Report Administration, Report Format Management, Modify", "报表管理, 报表格式管理, 修改"];
var t__Page_Title_Report_Add = ["Report Administration, Report Format Management, Add", "报表管理, 报表格式管理, 新增"];
var t__Page_Title_Report_Del = ["Report Administration, Report Format Management, Delete", "报表管理, 报表格式管理, 删除"];
var t__Page_Title_Report_View = ["Report Administration, Report Format Management, View", "报表管理, 报表格式管理, 查看"];
otherText["pgTitle_report"] = ml(t__Page_Title_Report);
otherText["pgTitle_reportUpd"] = ml(t__Page_Title_Report_Upd);
otherText["pgTitle_reportAdd"] = ml(t__Page_Title_Report_Add);
otherText["pgTitle_reportDel"] = ml(t__Page_Title_Report_Del);
otherText["pgTitle_reportView"] = ml(t__Page_Title_Report_View);


var t__Page_Head_Report = ["Report Format Management", "报表格式管理"];
var t__Page_Head_Report_Upd = ["Modify Report Format", "修改报表格式"];
var t__Page_Head_Report_Add = ["Add Report Format", "新增报表格式"];
var t__Page_Head_Report_Del = ["Delete Report Format", "删除报表格式"];
var t__Page_Head_Report_View = ["View Report Format", "查看报表格式"];
otherText["pgHead_report"] = ml(t__Page_Head_Report);
otherText["pgHead_reportUpd"] = ml(t__Page_Head_Report_Upd);
otherText["pgHead_reportAdd"] = ml(t__Page_Head_Report_Add);
otherText["pgHead_reportDel"] = ml(t__Page_Head_Report_Del);
otherText["pgHead_reportView"] = ml(t__Page_Head_Report_View);


var t__Report_Form_Title = ["Report Type and Format", "报表类型和格式"];
var t__Report_Form_Note = ["All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory", "所有标有(<span style=\"COLOR: #FF0000;\">*</span>)的表项必须填写"];
otherText["msg_updReport_fSet"] = ml(t__Report_Form_Title);
otherText["msg_updReport_frmComplt"] = ml(t__Report_Form_Note);
otherText["msg_addReport_fSet"] = ml(t__Report_Form_Title);
otherText["msg_addReport_frmComplt"] = ml(t__Report_Form_Note);



// The text for Report Format Admin
var t__Header21 = ["Format ID", "报表单元编号" ];
var t__Header22 = ["Report Type", "报表类型名称" ];
var t__Header23 = ["Format Type", "报表单元类型" ];
var t__Header24 = ["Format Title", "报表单元标题" ];
var t__Header25 = ["Operation Selected", "报表单元当前操作" ];
var t__Header26 = ["Operation Allowed", "报表单元允许操作" ];
var t__Header27 = ["Active", "是否显示？" ];
var t__Header28 = ["Sorting Num", "报表单元顺序" ];

var format_section_pos = 2;
var format_op_pos = 4;
var format_content_op_pos = 5;
var format_active_pos = 6;
var format_type_class = 11;

var myFormatColumns = [ml(t__Header21), ml(t__Header22), ml(t__Header23), ml(t__Header24), ml(t__Header25), ml(t__Header26), ml(t__Header27), ml(t__Header28)];


var t__Toggle_Report_Format = ["Toggle Report Format","启用|禁用"];
var t__Enable_Report_Format = ["Enable Report Format","启用报表表列"];
var t__Disable_Report_Format = ["Disable Report Format","禁用报表表列"];
var t__Moveup_Report_Format = ["Move Up","报表表列上移"];
var t__Movedown_Report_Format = ["Move Down","报表表列下移"];
var t__Movetop_Report_Format = ["Move to Top","报表表列置顶"];
var t__Movebottom_Report_Format = ["Move to Bottom","报表表列置尾"];
var t__Disable_String = ["Disabled","禁用"];


otherText["toggleReportFormat"] =  ml(t__Toggle_Report_Format);
otherText["enableReportFormat"] =  ml(t__Enable_Report_Format);
otherText["disableReportFormat"] =  ml(t__Disable_Report_Format);
otherText["moveUpReportFormat"] =  ml(t__Moveup_Report_Format);
otherText["moveDownReportFormat"] =  ml(t__Movedown_Report_Format);
otherText["moveTopReportFormat"] =  ml(t__Movetop_Report_Format);
otherText["moveBottomReportFormat"] =  ml(t__Movebottom_Report_Format);



var t__Section_Title = ["Title Section", "报表标题"];
var t__Section_Subtitle = ["Subtitle Section", "报表副标题"];
var t__Section_Header = ["Header Section", "报表表头"];
var t__Section_Footer = ["Footer Section", "报表表尾"];
var t__Section_Column = ["Column Section", "报表表列"];
var t__Section_Subtotal = ["Subtotal Section", "报表小计"];
var t__Section_Total = ["Title Section", "报表总计"];

var format_section_jslist = new Array();
format_section_jslist[1] = ml(t__Section_Title);
format_section_jslist[2] = ml(t__Section_Subtitle);
format_section_jslist[3] = ml(t__Section_Header);
format_section_jslist[4] = ml(t__Section_Footer);
format_section_jslist[5] = ml(t__Section_Column);
format_section_jslist[6] = ml(t__Section_Subtotal);
format_section_jslist[7] = ml(t__Section_Total);

var format_section_droplist = [ ['', ''], [1, ml(t__Section_Title)], [2, ml(t__Section_Subtitle)], [3, ml(t__Section_Header)], [4, ml(t__Section_Footer)], [5, ml(t__Section_Column)], [6, ml(t__Section_Subtotal)], [7, ml(t__Section_Total)] ];


var t__Oper_Null = ["No Operation", "无操作"];
var t__Oper_Avg = ["Average", "求平均值"];
var t__Oper_Cnt = ["Count", "计数"];
var t__Oper_Max = ["Maximum", "求最大值"];
var t__Oper_Min = ["Minimum", "求最小值"];
var t__Oper_Sum = ["Summary", "求和"];
var t__Oper_Frm = ["Formula", "公式计算"];
var t__Oper_Grp = ["Group By", "明细汇总对象"];
var t__Oper_GrpSub = ["Sub Total Group By", "小计汇总对象"];
var t__Oper_GrpTot = ["Total Group By", "总计汇总对象"];


var format_oper_jslist = new Array();
format_oper_jslist[0] = ml(t__Oper_Null);
format_oper_jslist[1] = ml(t__Oper_Avg);
format_oper_jslist[2] = ml(t__Oper_Cnt);
format_oper_jslist[4] = ml(t__Oper_Max);
format_oper_jslist[8] = ml(t__Oper_Min);
format_oper_jslist[16] = ml(t__Oper_Sum);
format_oper_jslist[256] = ml(t__Oper_Frm);
format_oper_jslist[128] = ml(t__Oper_Grp);
format_oper_jslist[64] = ml(t__Oper_GrpSub);
format_oper_jslist[32] = ml(t__Oper_GrpTot);

var format_oper_droplist = [ ['', ''], [0, ml(t__Oper_Null)], [1, ml(t__Oper_Avg)], [2, ml(t__Oper_Cnt)], [4, ml(t__Oper_Max)], [8, ml(t__Oper_Min)], [16, ml(t__Oper_Sum)], [256, ml(t__Oper_Frm)], [128, ml(t__Oper_Grp)], [64, ml(t__Oper_GrpSub)], [32, ml(t__Oper_GrpTot)] ];


var t__Oper_Null2 = ["No OP", "无操作"];
var t__Oper_Avg2 = ["AVG", "平均"];
var t__Oper_Cnt2 = ["CNT", "计数"];
var t__Oper_Max2 = ["MAX", "最大"];
var t__Oper_Min2 = ["MIN", "最小"];
var t__Oper_Sum2 = ["SUM", "求和"];
var t__Oper_Frm2 = ["FRM", "公式"];
var t__Oper_Grp2 = ["GRP By", "明细汇总"];
var t__Oper_GrpSub2 = ["SUB GRP", "小计汇总"];
var t__Oper_GrpTot2 = ["TOT GRP", "总计汇总"];

var format_oper_jslist2 = new Array();
format_oper_jslist2[0] = ml(t__Oper_Null2);
format_oper_jslist2[1] = ml(t__Oper_Avg2);
format_oper_jslist2[2] = ml(t__Oper_Cnt2);
format_oper_jslist2[4] = ml(t__Oper_Max2);
format_oper_jslist2[8] = ml(t__Oper_Min2);
format_oper_jslist2[16] = ml(t__Oper_Sum2);
format_oper_jslist2[256] = ml(t__Oper_Frm2);
format_oper_jslist2[128] = ml(t__Oper_Grp2);
format_oper_jslist2[64] = ml(t__Oper_GrpSub2);
format_oper_jslist2[32] = ml(t__Oper_GrpTot2);

var oper_values = new Array();
oper_values[1] = 1;
oper_values[2] = 2;
oper_values[3] = 4;
oper_values[4] = 8;
oper_values[5] = 16;
oper_values[6] = 256;
oper_values[7] = 128;
oper_values[8] = 64;
oper_values[9] = 32;

var oper_num=9;

var t__Active_Format = ["Enable", "启用该报表单元" ];
var t__Non_Active_Format = ["Disable", "禁用该报表单元" ];

var format_active_droplist = [ ['', ''], [0, ml(t__Non_Active_Format)], [1, ml(t__Active_Format)] ];


var t__Page_Title_Report_Format = ["Report Administration, Report Format Management, Report Format Adjusting", "报表管理, 报表格式管理, 报表格式调整"];
var t__Page_Title_Report_Format_Upd = ["Report Administration, Report Format Management, Report Format Adjusting, Modify", "报表管理, 报表格式管理, 报表格式调整, 修改"];
otherText["pgTitle_reportFormat"] = ml(t__Page_Title_Report_Format);
otherText["pgTitle_reportFormatUpd"] = ml(t__Page_Title_Report_Format_Upd);


var t__Page_Head_Report_Format = ["Report Format Adjusting", "报表格式调整"];
var t__Page_Head_Report_Format_Upd = ["Edit Report Format", "编辑报表格式"];
otherText["pgHead_reportFormat"] = ml(t__Page_Head_Report_Format);
otherText["pgHead_reportFormatUpd"] = ml(t__Page_Head_Report_Format_Upd);


var t__Report_Format_Form_Title = ["Report Format", "报表格式"];
var t__Report_Format_Form_Note = ["All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory", "所有标有(<span style=\"COLOR: #FF0000;\">*</span>)的表项必须填写"];
otherText["msg_updReportFormat_fSet"] = ml(t__Report_Format_Form_Title);
otherText["msg_updReportFormat_frmComplt"] = ml(t__Report_Format_Form_Note);

var t__Back_To_ReportFormat = ["Back to Report Format Page", "返回报表格式调整"];
otherText["btn_bakto_reportFormatPg"] = ml(t__Back_To_ReportFormat);


/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
var l_opInf= new Array()
for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];

var t__Delete_Ok = ["Successfully Deleted!", "成功删除!"];
var t__Insert_Ok = ["Successfully Inserted!", "成功新增!"];
var t__Update_Ok = ["Successfully Updated!", "成功修改!"];
var t__Delete_Fail = ["Delete Failed!", "删除失败!"];
var t__Insert_Fail = ["Insert Failed!", "新增失败!"];
var t__Update_Fail = ["Update Failed!", "修改失败!"];
var t__Delete_Sys_Rpt_Fail = [" You cannot delete a system-defined report", " 这是一个系统定义的报表格式，可以修改，但是不可以删除！"];
var t__Move_Out_Of_Range = [" Out of Range, Cannot be moved", " 表列移动超出范围，不可以调整表列显示顺序！"];

l_opInf[28]= ml(t__Report_Form_Title) + ml(t__Delete_Ok);
l_opInf[27]= ml(t__Report_Form_Title) + ml(t__Insert_Ok);
l_opInf[26]= ml(t__Report_Form_Title) + ml(t__Update_Ok);
l_opInf[116]= ml(t__Report_Form_Title) + ml(t__Update_Ok);
l_opInf[38]= ml(t__Report_Form_Title) + ml(t__Delete_Fail);
l_opInf[37]= ml(t__Report_Form_Title) + ml(t__Insert_Fail);
l_opInf[36]= ml(t__Report_Form_Title) + ml(t__Update_Fail);
l_opInf[126]= ml(t__Report_Form_Title) + ml(t__Update_Fail);
l_opInf[48]= ml(t__Report_Form_Title) + ml(t__Delete_Fail) + ml(t__Delete_Sys_Rpt_Fail);

l_opInf[10026]= ml(t__Report_Format_Form_Title) + ml(t__Update_Ok);
l_opInf[10036]= ml(t__Report_Format_Form_Title) + ml(t__Update_Fail);
l_opInf[10116]= ml(t__Report_Format_Form_Title) + ml(t__Update_Ok);
l_opInf[10126]= ml(t__Report_Format_Form_Title) + ml(t__Update_Fail);
l_opInf[10116]= ml(t__Report_Format_Form_Title) + ml(t__Update_Ok);
l_opInf[10126]= ml(t__Report_Format_Form_Title) + ml(t__Update_Fail);
l_opInf[10216]= ml(t__Report_Format_Form_Title) + ml(t__Update_Ok);
l_opInf[10226]= ml(t__Report_Format_Form_Title) + ml(t__Update_Fail);
l_opInf[10316]= ml(t__Report_Format_Form_Title) + ml(t__Update_Ok);
l_opInf[10326]= ml(t__Report_Format_Form_Title) + ml(t__Update_Fail);

l_opInf[10236]= ml(t__Report_Format_Form_Title) + ml(t__Update_Fail) + ml(t__Move_Out_Of_Range);
l_opInf[10336]= ml(t__Report_Format_Form_Title) + ml(t__Update_Fail) + ml(t__Move_Out_Of_Range);


var ops_req_print = [-1, 1,5,6,7,8, 10001, 10006];
var ops_req_search = [-1, 1];

		
/*
 * The structure dealing with
 * "Group Name", "Number of Tanks", "Active Tank", "Base Product" 
	["ADO","4","035","ADO"]
*/			

function renderPage(cRec, cCol, cState, cPageState,priv, lang)
{ 
	var curRecord = cRec;
	var curColumnToSort = cCol;
	var curViewDetailState = cState;
	var curPageIn = cPageState;
	var curPrivilage = priv;
  
	var i;
	var e;
	var f;

	var newPage = "";
	var pageTitle="";
	var pageHeading="";

	//printHdr function of comm_HTML.js file responsible for 
	//generating all the HTML for the current page
	newPage += printHdr( newPage, updatePageTitle( curViewDetailState, pageTitle ), lang );
//	newPage = printHdr( newPage, updatePageTitle( curViewDetailState, pageTitle ), lang );

	//local_HeadrHTML function is local function give 
	// the ability to append any thing to the current page
	newPage += local_HeadrHTML( newPage, lang );
//	newPage = local_HeadrHTML( newPage, lang );

	//getToolBar_HTML function of comm_HTML.js file responsible for  
	// outputting the tool bar
	//controls the search and print buttons as well
	newPage += getToolBar_HTML( newPage, updatePageHeading( curViewDetailState, pageHeading ),check_ifReqPrint( ops_req_print, curViewDetailState ), check_ifReqSearch( ops_req_search,curViewDetailState ) );
//	newPage = getToolBar_HTML( newPage, updatePageHeading( curViewDetailState, pageHeading ), check_ifReqPrint( ops_req_print, curViewDetailState ), check_ifReqSearch( ops_req_search, curViewDetailState ) );

	newPage +="<tr>\n";  
	newPage +="<td width=\"100%\">\n";
	newPage +="<div class=\"content\" id=\"content\">\n";
	newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
	newPage +="<tbody>\n";  

	newPage +=	displayStatusMsg (opStatus);  
	//start after the global form
	// if OP is <=1 OR Higher than available options should always come to this view

	if (priv >= 5 && curViewDetailState <= opValues["viewReport"]) 
	{
		newPage += displayReportTypeList(curPrivilage, curColumnToSort);
	}

	if (priv >= 5 && curViewDetailState == opValues["viewReportFormat"]) 
	{
		newPage += displayViewReportFormat();
	}

	if (priv >= 6 && curViewDetailState == opValues["modifyReport"])	
	{
		newPage += displayModifyReportForm();
	}
	if (priv >= 6 && curViewDetailState == opValues["modifyReportSubmit"])	
	{
		newPage += displayReportTypeList(curPrivilage, curColumnToSort);
	}

	if (priv >= 7 && curViewDetailState == opValues["insertReport"])	
	{
		newPage += displayInsertReportForm();
	}
	if (priv >= 7 && curViewDetailState == opValues["insertReportSubmit"])	
	{
		newPage += displayReportTypeList(curPrivilage, curColumnToSort);
	}

	if (priv >= 8 && curViewDetailState == opValues["deleteReportSubmit"])	
	{
		newPage += displayReportTypeList(curPrivilage, curColumnToSort);
	}


	if (priv >= 8 && curViewDetailState == opValues["listReportFormat"]) 
	{
		newPage += displayReportFormatList(curPrivilage, curColumnToSort);
	}
	if (priv >= 6 && curViewDetailState == opValues["modifyReportFormat"])	
	{
		newPage += displayModifyReportFormatForm();
	}
	if (priv >= 6 && curViewDetailState == opValues["modifyReportFormatSubmit"])	
	{
		newPage += displayReportFormatList(curPrivilage, curColumnToSort);
	}


	// table for everything ends here
	newPage +="</tbody>\n";
	newPage +="</table>\n";
	newPage +="</div>\n";
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


function displayReportTypeList( curPrivilage, curColumnToSort )
{
	var indent = 1;
	var dispFrm ="";

	dispFrm += makespace("\t", indent) + btnGroupListReport_HTML();

	dispFrm += makespace("\t", indent) + "<tr> \n";
	dispFrm += makespace("\t", indent) + "<td>\n ";  

	if( ((myColumns.length)> 0))
	{
		dispFrm += makespace("\t", indent+1) + "<div id=\"printReady\">\n";
		dispFrm += makespace("\t", indent+2) + table_begin("M", 0,"");
		dispFrm += makespace("\t", indent+2) + "<tbody> \n";
		dispFrm += makespace("\t", indent+2) + "<tr>\n";
		for(var i=0; i<myColumns.length; i++)
		{
			dispFrm += makespace("\t", indent+2) + "<td>" + myColumns[i] + "</td>\n";
		}
		dispFrm += makespace("\t", indent+2) + "</tr>\n";
	}

	for(i in rpttype_jslist)
	{
		if (i>0)
		{
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone = 0;
			for(var j=0; j<myColumns.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(rpttype_jslist[i][howmanyDone]) + "<\/td>";
				} 
				else 
				{
					dispFrm += makespace("\t", indent+2) + "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						dispFrm += makespace("\t", indent+3) + "<form name=\"select_action_" + i + "\" id=\"select_action_" + i + "\" >\n";
						dispFrm += makespace("\t", indent+4) + "<table border=\"0\">\n";
						dispFrm += makespace("\t", indent+4) + "<tr>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\"> <span style=\"COLOR: #FF0000;\">" + obs(rpttype_jslist[i][howmanyDone]) + "</span>\n";

						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"frm_rpttype_id\" id=\"frm_rpttype_id\" value=\"" + rpttype_jslist[i][0] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";

						dispFrm += makespace("\t", indent+5) + preqstr_field ();
						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

						dispFrm += makespace("\t", indent+5) + op_list (curPrivilage, rpttype_jslist[i][howmanyDone], i);


						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "</tr>\n";
						dispFrm += makespace("\t", indent+4) + "</table>\n";
						dispFrm += makespace("\t", indent+3) + "</form>\n";
					}
					else
					{
						if ( j == rpttype_active_pos )
						{
							if (rpttype_jslist[i][j-1] == 1)
							{
								dispFrm += makespace("\t", indent+3) + "<center><img src=\"/images/check_mark_blue.gif\" alt=\"Yes\" title=\"Yes\"></center>";
							}
							else
							{
								dispFrm += makespace("\t", indent+3) + "<center><img src=\"/images/cross_mark_red.jpg\" alt=\"Yes\" title=\"Yes\"></center>";
							}
						}
						else
						if ( j == rpttype_class_pos )
						{
							dispFrm += makespace("\t", indent+3) + obs( rpttype_class_jslist[ rpttype_jslist[i][j] & 0x03 ]);
						}
						else
						if ( j == rpttype_period_pos )
						{
							var period_id=1;
							period_id = rpttype_jslist[i][j-1] & 0xFC;
							if ( period_id == 0)
							{
								period_id = 1;
							}
							else
							{
								period_id = period_id/4 + 1;
							}
							/*
							if ( period_id == 4)
							{
								period_id = 2;
							}
							else
							if ( period_id == 8)
							{
								period_id = 3;
							}
							else
							{
								period_id = 1;
							}
							*/
							dispFrm += makespace("\t", indent+3) + obs( rpttype_period_jslist[ period_id ]);
						}
						else
						{
							dispFrm += makespace("\t", indent+3) + obs(rpttype_jslist[i][howmanyDone]);
						}

					}  

					dispFrm += makespace("\t", indent+2) + "</td>\n";
				}
				howmanyDone++;	
			} // end of inner for loop
		  
		}
		dispFrm += makespace("\t", indent) + "\n";
		dispFrm += makespace("\t", indent+2) + "</tr>";
	}
	dispFrm += makespace("\t", indent+1) + "</tbody>";
	dispFrm += makespace("\t", indent+1) + "</table>";
	dispFrm += makespace("\t", indent) + "</div>\n";
	dispFrm += makespace("\t", indent) + "</td>\n ";
	dispFrm += makespace("\t", indent) + "</tr>\n";

	return dispFrm;
}



function displayReportFormatList( curPrivilage, curColumnToSort )
{
	var indent = 1;
	var dispFrm ="";

	dispFrm += makespace("\t", indent) + btnGroupListReportFormat_HTML();

	dispFrm += makespace("\t", indent) + "<tr> \n";
	dispFrm += makespace("\t", indent) + "<td>\n ";  

	if( ((myFormatColumns.length)> 0))
	{
		dispFrm += makespace("\t", indent+1) + "<div id=\"printReady\">\n";
		dispFrm += makespace("\t", indent+2) + table_begin("M", 0,"");
		dispFrm += makespace("\t", indent+2) + "<tbody> \n";
		dispFrm += makespace("\t", indent+2) + "<tr>\n";
		for(var i=0; i<myFormatColumns.length; i++)
		{
			dispFrm += makespace("\t", indent+2) + "<td>" + myFormatColumns[i] + "</td>\n";
		}
		dispFrm += makespace("\t", indent+2) + "</tr>\n";
	}

	for(i in format_jslist)
	{
		if (i>0)
		{
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone = 0;
			for(var j=0; j<myFormatColumns.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(format_jslist[i][howmanyDone]) + "<\/td>";
				} 
				else 
				{
					dispFrm += makespace("\t", indent+2) + "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						dispFrm += makespace("\t", indent+3) + "<form name=\"select_action_" + i + "\" id=\"select_action_" + i + "\" >\n";
						dispFrm += makespace("\t", indent+4) + "<table border=\"0\">\n";
						dispFrm += makespace("\t", indent+4) + "<tr>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\"> <span style=\"COLOR: #FF0000;\">" + obs(format_jslist[i][howmanyDone]) + "</span>\n";

						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"frm_rpt_format_id\" id=\"frm_rpt_format_id\" value=\"" + format_jslist[i][0] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"frm_rpt_format_type\" id=\"frm_rpt_format_type\" value=\"" + format_jslist[i][8] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"frm_rpt_type_class\" id=\"frm_rpt_type_class\" value=\"" + format_jslist[i][11] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"frm_rpt_format_section\" id=\"frm_rpt_format_section\" value=\"" + format_jslist[i][2] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"frm_rpt_format_title\" id=\"frm_rpt_format_title\" value=\"" + format_jslist[i][10] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";

						dispFrm += makespace("\t", indent+5) + preqstr_field ();
						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

//						if ( format_jslist[i][format_section_pos] == 5 )
						{
							dispFrm += makespace("\t", indent+5) + op_list_format (curPrivilage, format_jslist[i][howmanyDone], i);
						}


						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "</tr>\n";
						dispFrm += makespace("\t", indent+4) + "</table>\n";
						dispFrm += makespace("\t", indent+3) + "</form>\n";
					}
					else
					{
						if ( j == format_active_pos )
						{
							if (format_jslist[i][j] == 1)
							{
								dispFrm += makespace("\t", indent+3) + "<center><img src=\"/images/check_mark_blue.gif\" alt=\"Yes\" title=\"Yes\"></center>";
							}
							else
							{
								dispFrm += makespace("\t", indent+3) + "<center><img src=\"/images/cross_mark_red.jpg\" alt=\"Yes\" title=\"Yes\"></center>";
							}
						}
						else
						if ( j == format_section_pos )
						{
							if ( format_jslist[i][j] == 5 )
							{
								dispFrm += makespace("\t", indent+3) + obs( "<b>" + format_section_jslist[ format_jslist[i][j] ] + "</b>");
							}
							else
							{
								dispFrm += makespace("\t", indent+3) + obs( format_section_jslist[ format_jslist[i][j] ] );
							}
						}
						else
						if ( j == format_op_pos )
						{
							if ( (format_jslist[i][format_type_class]&0x03) == 1)
							{
								dispFrm += makespace("\t", indent+3) + obs( format_oper_jslist[0]);
							}
							else
							{
//								dispFrm += makespace("\t", indent+3) + obs( format_oper_jslist[ format_jslist[i][j] ]);
								var op_current="";
								if ( format_jslist[i][j] == 0 )
								{
									op_current = format_oper_jslist[0];
								}
								else
								{
									var k;
									for (k=1; k<=oper_num; k++)
									{
										if ( (format_jslist[i][j] & oper_values[k]) > 0 )
										{
											op_current = op_current + k + "-" + format_oper_jslist[ oper_values[k] ] + "<br>\n";
										}
									}
								}
								dispFrm += makespace("\t", indent+3) + obs( op_current );
							}
						}
						else
						if ( j == format_content_op_pos )
						{
							if ( (format_jslist[i][format_type_class]&0x03) == 1)
							{
								dispFrm += makespace("\t", indent+3) + obs( format_oper_jslist[0]);
							}
							else
							{
								var op_allowed="";

								if ( format_jslist[i][j] == 0 )
								{
									op_allowed = format_oper_jslist[0];
								}
								else
								{
									var k;
									for (k=1; k<=oper_num; k++)
									{
										if ( (format_jslist[i][j] & oper_values[k]) > 0 )
										{
//											op_allowed = op_allowed + "<b>" + k + "-" + format_oper_jslist[ oper_values[k] ] + "</b><br>\n";
											op_allowed = op_allowed + k + "-" + format_oper_jslist[ oper_values[k] ] + "<br>\n";
										}
										else
										{
//											op_allowed = op_allowed + "<span style=\"color:#ff0000;text-decoration:line-through\">" + k + "-" + format_oper_jslist[ oper_values[k] ] + "[" + ml(t__Disable_String) + "]</span><br>\n";
											op_allowed = op_allowed + "<span style=\"color:#888888\">" + k + "-" + format_oper_jslist[ oper_values[k] ] + "&nbsp;[" + ml(t__Disable_String) + "]</span><br>\n";
										}
									}
								}

								dispFrm += makespace("\t", indent+3) + obs( op_allowed );
							}
						}
						else
						{
							dispFrm += makespace("\t", indent+3) + obs(format_jslist[i][howmanyDone]);
						}

					}  

					dispFrm += makespace("\t", indent+2) + "</td>\n";
				}
				howmanyDone++;	
			} // end of inner for loop
		  
		}
		dispFrm += makespace("\t", indent) + "\n";
		dispFrm += makespace("\t", indent+2) + "</tr>";
	}
	dispFrm += makespace("\t", indent+1) + "</tbody>";
	dispFrm += makespace("\t", indent+1) + "</table>";
	dispFrm += makespace("\t", indent) + "</div>\n";
	dispFrm += makespace("\t", indent) + "</td>\n ";
	dispFrm += makespace("\t", indent) + "</tr>\n";

	return dispFrm;
}



function displayModifyReportFormatForm()
{
	var indent = 1;
	var rptFrm = "";
	var width = 200;

	rptFrm += makespace("\t", indent) + btnGroupModifyReportFormat_HTML();

	rptFrm += makespace("\t", indent) + "<tr>\n";
	rptFrm += makespace("\t", indent) + "<td>\n";

	rptFrm += makespace("\t", indent+1) + "<form name=\"edit_rptobj_format\" method=\"get\" id=\"edit_rptobj_format\" action=\"rptobj_admin.cgi\" onsubmit=\"return Validator.Validate(this,1);\" >\n";

	rptFrm += makespace("\t", indent+1) + " <ul id=\"tabmenu\">\n";
	rptFrm += makespace("\t", indent+1) + "<li>" + otherText["msg_updReportFormat_fSet"] + "</li>\n";
	rptFrm += makespace("\t", indent+1) + "</ul>\n";
	rptFrm += makespace("\t", indent+1) + "<div class=\"adminform\">\n";

	rptFrm += makespace("\t", indent+2) + "<table width=\"100%\">\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td class=\"infotext\">\n";
	rptFrm += makespace("\t", indent+3) + "<br>\n";
	rptFrm += makespace("\t", indent+3) + otherText["msg_updReportFormat_frmComplt"] + "\n";

	// hidden area for passing values between web pages
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyReportFormatSubmit"] + "\">\n";
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";

	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"frm_rpt_content_op\" id=\"frm_rpt_content_op\" value=\"" + frm_rpt_content_op + "\">\n";

	if ( ( frm_rpt_content_op == 0 ) || ( (frm_rpt_type_class&0x03) == 1 ) )
	{
		rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"frm_rpt_title_op\" id=\"frm_rpt_title_op\" value=\"" + frm_rpt_title_op + "\">\n";
	}

	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"frm_rpt_format_section\" id=\"frm_rpt_format_section\" value=\"" + frm_rpt_format_section + "\">\n";
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"frm_rpt_format_type\" id=\"frm_rpt_format_type\" value=\"" + frm_rpt_format_type + "\">\n";
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"frm_rpt_section_name\" id=\"frm_rpt_section_name\" value=\"" + frm_rpt_section_name + "\">\n";
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"frm_rpt_format_title\" id=\"frm_rpt_format_title\" value=\"" + frm_rpt_format_title + "\">\n";
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"frm_rpt_type_class\" id=\"frm_rpt_type_class\" value=\"" + frm_rpt_type_class + "\">\n";

	if ( frm_rpt_format_section != 5 )
	{
		rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"frm_rpt_format_active\" id=\"frm_rpt_format_active\" value=\"" + frm_rpt_format_active + "\">\n";
		rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"frm_rpt_format_pos\" id=\"frm_rpt_format_pos\" value=\"" + frm_rpt_format_pos + "\">\n";
	}

	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td width=\"100%\">\n";

	rptFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";


	// row 1
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(3, ml(t__Header21), frm_rpt_format_id, "frm_rpt_format_id", "frm_rpt_format_id", "", 10, 9, "", "", "&nbsp;", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	// row 2
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(3, ml(t__Header22), frm_rpt_type_name, "frm_rpt_type_name", "frm_rpt_type_name", "", 10, 9, "", "", "&nbsp;", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	// row 3
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(1, ml(t__Header24), frm_rpt_title_name, "frm_rpt_title_name", "frm_rpt_title_name", "", 100, 120, "dataType=\"Require\"", (ml(t__Enter)+ml(t__Header24)), "*", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	if ( ( frm_rpt_content_op > 0 ) && ( (frm_rpt_type_class&0x03) != 1 ) )
	{
		// row 4
		rptFrm += makespace("\t", indent+3) + "<tr>\n";
/*
		//prepare dropdown list
		var list_id = 0;
		var op_dynamic_list = new Array();
		op_dynamic_list[0] = new Array();
		op_dynamic_list[0][0] = "";
		op_dynamic_list[0][1] = "";
		op_dynamic_list[1] = new Array();
		op_dynamic_list[1][0] = 0;
		op_dynamic_list[1][1] = ml(t__Oper_Null);

		list_id = 2;
		var i;
		for (i=1; i<=oper_num; i++)
		{
			if ( (frm_rpt_content_op & oper_values[i]) > 0 )
			{
				op_dynamic_list[list_id] = new Array();
				op_dynamic_list[list_id][0] = oper_values[i];
				op_dynamic_list[list_id][1] = format_oper_jslist[ oper_values[i] ];
				list_id += 1;
			}

		}

		rptFrm += makefield(2, ml(t__Header25), frm_rpt_title_op, "frm_rpt_title_op", "frm_rpt_title_op", op_dynamic_list, 0, 0, " dataType=\"Require\" onchange=\"\"", (ml(t__Select)+ml(t__Header25)), "*", indent+4, width);
*/
		// prepare check boxes 
		rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"frm_rpt_title_op\" id=\"frm_rpt_title_op\" value=\"" + frm_rpt_title_op + "\">\n";

		rptFrm += makespace("\t", indent+4) + "<td class=\"infotextheading\" width=\"" + width + "\" valign=\"top\">\n";
		rptFrm += makespace("\t", indent+4+1) + ml(t__Header25) + ":\n";
		rptFrm += makespace("\t", indent+4) + "</td>\n";

		rptFrm += makespace("\t", indent+4) + "<td width=\"5\" align=\"center\" valign=\"top\" class=\"mandatory\">\n";
		rptFrm += makespace("\t", indent+4+1) + "*" + "\n";
		rptFrm += makespace("\t", indent+4) + "</td>\n";

		rptFrm += makespace("\t", indent+4) + "<td>\n";

		var is_enable="";
		var is_checked="";
		for (i=1; i<=oper_num; i++)
		{
			if ( (frm_rpt_content_op & oper_values[i]) > 0 )
			{
				is_enable = "";
			}
			else
			{
				is_enable = "DISABLED";
			}
			if ( (frm_rpt_title_op & oper_values[i]) > 0 )
			{
				is_checked = "checked=\"yes\"";
			}
			else
			{
				is_checked = "";
			}

			rptFrm += makespace("\t", indent+4+1) + "<input type=\"checkbox\" id=\"checkoper"+ oper_values[i] +"\" " + is_enable + " name=\"checkoper"+ oper_values[i] +"\" " + is_checked + " onClick=\"return check_grp_operations(document.edit_rptobj_format, this);\" />" + format_oper_jslist[ oper_values[i] ] +"<br>\n";
		}

		rptFrm += makespace("\t", indent+4) + "</td>\n";


		rptFrm += makespace("\t", indent+3) + "</tr>\n";
	}

	if ( frm_rpt_format_section == 5 )
	{
		// row 5
		rptFrm += makespace("\t", indent+3) + "<tr>\n";

		rptFrm += makefield(2, ml(t__Header27), frm_rpt_format_active, "frm_rpt_format_active", "frm_rpt_format_active", format_active_droplist, 0, 0, " dataType=\"Require\" onchange=\"\"", (ml(t__Select)+ml(t__Header27)), "*", indent+4, width);

		rptFrm += makespace("\t", indent+3) + "</tr>\n";

		// row 6
		rptFrm += makespace("\t", indent+3) + "<tr>\n";

		rptFrm += makefield(1, ml(t__Header28), frm_rpt_format_pos, "frm_rpt_format_pos", "frm_rpt_format_pos", "", 10, 10, "dataType=\"Integer\"", (ml(t__Enter)+ml(t__Header28)), "*", indent+4, width);

		rptFrm += makespace("\t", indent+3) + "</tr>\n";
	}


	rptFrm += makespace("\t", indent+3) + "</table>\n";
	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td>\n";
	rptFrm += makespace("\t", indent+3) + "&nbsp;\n";
	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td align=\"center\">\n";
	rptFrm += makespace("\t", indent+3) + "<table>\n";

	rptFrm += frmButtRow_HTML(commBtnText["Update"], 1);

	rptFrm += makespace("\t", indent+3) + "</table>\n";
	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "</table>\n";

	rptFrm += makespace("\t", indent+1) + "</div>\n";

	rptFrm += makespace("\t", indent+1) + "</form>\n";

	rptFrm += makespace("\t", indent) + "</td>\n";
	rptFrm += makespace("\t", indent) + "</tr>\n";

	return rptFrm;
}


function displayModifyReportForm()
{
	var indent = 1;
	var rptFrm = "";
	var width = 200;

	rptFrm += makespace("\t", indent) + btnGroupModifyReport_HTML();

	rptFrm += makespace("\t", indent) + "<tr>\n";
	rptFrm += makespace("\t", indent) + "<td>\n";

	rptFrm += makespace("\t", indent+1) + "<form name=\"edit_rptobj_admin\" method=\"get\" id=\"edit_rptobj_admin\" action=\"rptobj_admin.cgi\" onsubmit=\"return Validator.Validate(this,1);\" >\n";

	rptFrm += makespace("\t", indent+1) + " <ul id=\"tabmenu\">\n";
	rptFrm += makespace("\t", indent+1) + "<li>" + otherText["msg_updReport_fSet"] + "</li>\n";
	rptFrm += makespace("\t", indent+1) + "</ul>\n";
	rptFrm += makespace("\t", indent+1) + "<div class=\"adminform\">\n";

	rptFrm += makespace("\t", indent+2) + "<table width=\"100%\">\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td class=\"infotext\">\n";
	rptFrm += makespace("\t", indent+3) + "<br>\n";
	rptFrm += makespace("\t", indent+3) + otherText["msg_updReport_frmComplt"] + "\n";

	// hidden area for passing values between web pages
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyReportSubmit"] + "\">\n";
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";

	if ( frm_rpttype_id <= REPORT_TYPE_BASE_INDEX )
	{
		rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"frm_rpttype_class\" id=\"frm_rpttype_class\" value=\"" + frm_rpttype_class + "\">\n";
	}

	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td width=\"100%\">\n";

	rptFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";


	// row 1
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(3, ml(t__Header1), frm_rpttype_id, "frm_rpttype_id", "frm_rpttype_id", "", 10, 9, "", "", "&nbsp;", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	// row 2
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(1, ml(t__Header2), frm_rpttype_name, "frm_rpttype_name", "frm_rpttype_name", "", 100, 120, "dataType=\"Require\"", (ml(t__Enter)+ml(t__Header2)), "*", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	// row 3
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

//	rptFrm += makefield(1, ml(t__Header3), frm_rpttype_key, "frm_rpttype_key", "frm_rpttype_key", "", 100, 120, "dataType=\"Require\"", (ml(t__Enter)+ml(t__Header3)), "*", indent+4, width);
	rptFrm += makefield(1, ml(t__Header3), frm_rpttype_key, "frm_rpttype_key", "frm_rpttype_key", "", 100, 120, "dataType=\"CodeType\"", (ml(t__Enter)+ml(t__Header3)+", "+ml(t__InvalidCode)), "*", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	// row 4
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(1, ml(t__Header4), frm_rpttype_file, "frm_rpttype_file", "frm_rpttype_file", "", 100, 120, "dataType=\"Require\"", (ml(t__Enter)+ml(t__Header4)), "*", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	// row 5
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	if ( frm_rpttype_id > REPORT_TYPE_BASE_INDEX )
	{
		rptFrm += makefield(2, ml(t__Header5), frm_rpttype_class, "frm_rpttype_class", "frm_rpttype_class", rpttype_class_droplist, 0, 0, " dataType=\"Require\" onchange=\"\"", (ml(t__Select)+ml(t__Header5)), "*", indent+4, width);
	}
	else
	{
		rptFrm += makefield(0, ml(t__Header5), rpttype_class_jslist[frm_rpttype_class], "", "", "", 0, 0, "", "", "&nbsp;", indent+4, width);

//		rptFrm += makefield(3, ml(t__Header5), frm_rpttype_class, "frm_rpttype_class", "frm_rpttype_class", "", 10, 9, "", "", "&nbsp;", indent+4, width);
	}

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	// row 8
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	if ( frm_rpttype_id > REPORT_TYPE_BASE_INDEX )
	{
		rptFrm += makefield(2, ml(t__Header8), frm_rpttype_period, "frm_rpttype_period", "frm_rpttype_period", rpttype_period_droplist, 0, 0, "dataType=\"Require\" onchange=\"\"", (ml(t__Select)+ml(t__Header8)), "*", indent+4, width);
	}
	else
	{
		rptFrm += makefield(0, ml(t__Header8), rpttype_period_jslist[frm_rpttype_period], "", "", "", 0, 0, "", "", "&nbsp;", indent+4, width);
	}

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	// row 6
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(2, ml(t__Header6), frm_rpttype_active, "frm_rpttype_active", "frm_rpttype_active", rpttype_active_droplist, 0, 0, " onchange=\"\"", (ml(t__Select)+ml(t__Header6)), "&nbsp;", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	rptFrm += makespace("\t", indent+3) + "</table>\n";
	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td>\n";
	rptFrm += makespace("\t", indent+3) + "&nbsp;\n";
	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td align=\"center\">\n";
	rptFrm += makespace("\t", indent+3) + "<table>\n";

	rptFrm += frmButtRow_HTML(commBtnText["Update"], 1);

	rptFrm += makespace("\t", indent+3) + "</table>\n";
	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "</table>\n";

	rptFrm += makespace("\t", indent+1) + "</div>\n";

	rptFrm += makespace("\t", indent+1) + "</form>\n";

	rptFrm += makespace("\t", indent) + "</td>\n";
	rptFrm += makespace("\t", indent) + "</tr>\n";

	return rptFrm;
}



function displayInsertReportForm()
{
	var indent = 1;
	var rptFrm = "";
	var width = 200;

	rptFrm += makespace("\t", indent) + btnGroupInsertReport_HTML();

	rptFrm += makespace("\t", indent) + "<tr>\n";
	rptFrm += makespace("\t", indent) + "<td>\n";

	rptFrm += makespace("\t", indent+1) + "<form name=\"add_rptobj_admin\" method=\"get\" id=\"add_rptobj_admin\" action=\"rptobj_admin.cgi\" onsubmit=\"return Validator.Validate(this,1);\" >\n";

	rptFrm += makespace("\t", indent+1) + " <ul id=\"tabmenu\">\n";
	rptFrm += makespace("\t", indent+1) + "<li>" + otherText["msg_addReport_fSet"] + "</li>\n";
	rptFrm += makespace("\t", indent+1) + "</ul>\n";
	rptFrm += makespace("\t", indent+1) + "<div class=\"adminform\">\n";

	rptFrm += makespace("\t", indent+2) + "<table width=\"100%\">\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td class=\"infotext\">\n";
	rptFrm += makespace("\t", indent+3) + "<br>\n";
	rptFrm += makespace("\t", indent+3) + otherText["msg_addReport_frmComplt"] + "\n";

	// hidden area for passing values between web pages
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["insertReportSubmit"] + "\">\n";
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";

	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td width=\"100%\">\n";

	rptFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";


	// row 1
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(3, ml(t__Header1), frm_rpttype_id, "frm_rpttype_id", "frm_rpttype_id", "", 10, 9, "", "", "&nbsp;", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	// row 2
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(1, ml(t__Header2), frm_rpttype_name, "frm_rpttype_name", "frm_rpttype_name", "", 100, 120, "dataType=\"Require\"", (ml(t__Enter)+ml(t__Header2)), "*", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	// row 3
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

//	rptFrm += makefield(1, ml(t__Header3), frm_rpttype_key, "frm_rpttype_key", "frm_rpttype_key", "", 100, 120, "dataType=\"Require\"", (ml(t__Enter)+ml(t__Header3)), "*", indent+4, width);
	rptFrm += makefield(1, ml(t__Header3), frm_rpttype_key, "frm_rpttype_key", "frm_rpttype_key", "", 100, 120, "dataType=\"CodeType\"", (ml(t__Enter)+ml(t__Header3)+", "+ml(t__InvalidCode)), "*", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	// row 4
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(1, ml(t__Header4), frm_rpttype_file, "frm_rpttype_file", "frm_rpttype_file", "", 100, 120, "dataType=\"Require\"", (ml(t__Enter)+ml(t__Header4)), "*", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	// row 5
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	frm_rpttype_class = -1;
	rptFrm += makefield(2, ml(t__Header5), frm_rpttype_class, "frm_rpttype_class", "frm_rpttype_class", rpttype_class_droplist, 0, 0, "dataType=\"Require\" onchange=\"updateDropdownList(document.add_rptobj_admin, this, document.add_rptobj_admin.frm_rpttype_template, rpttype_jslist, 4);\"", (ml(t__Select)+ml(t__Header5)), "*", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	// row 8
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	frm_rpttype_period = 1;
	rptFrm += makefield(2, ml(t__Header8), frm_rpttype_period, "frm_rpttype_period", "frm_rpttype_period", rpttype_period_droplist, 0, 0, "dataType=\"Require\" onchange=\"\"", (ml(t__Select)+ml(t__Header8)), "*", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	// row 7
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(2, ml(t__Header7), frm_rpttype_template, "frm_rpttype_template", "frm_rpttype_template", rpttype_jslist, 0, 0, "dataType=\"Require\"  onchange=\"\"", (ml(t__Select)+ml(t__Header7)), "*", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	// row 6
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(2, ml(t__Header6), frm_rpttype_active, "frm_rpttype_active", "frm_rpttype_active", rpttype_active_droplist, 0, 0, " onchange=\"\"", (ml(t__Select)+ml(t__Header6)), "&nbsp;", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";


	rptFrm += makespace("\t", indent+3) + "</table>\n";
	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td>\n";
	rptFrm += makespace("\t", indent+3) + "&nbsp;\n";
	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td align=\"center\">\n";
	rptFrm += makespace("\t", indent+3) + "<table>\n";

	rptFrm += frmButtRow_HTML(commBtnText["Add"], 1);

	rptFrm += makespace("\t", indent+3) + "</table>\n";
	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "</table>\n";

	rptFrm += makespace("\t", indent+1) + "</div>\n";

	rptFrm += makespace("\t", indent+1) + "</form>\n";

	rptFrm += makespace("\t", indent) + "</td>\n";
	rptFrm += makespace("\t", indent) + "</tr>\n";

	return rptFrm;
}


function displayViewReportFormat()
{
	var indent = 1;
	var rptFrm = "";
	var width = 200;
	var disableOp = 1;

	rptFrm += makespace("\t", indent) + btnGroupViewReport_HTML();

	return rptFrm;
}



function obs(data)
{
	return data;
}



function preqstr_field ()
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"preqstr\" id=\"preqstr\" value=\"\" type=\"hidden\">\n";

	return fieldHTML;
}


function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	// Page header for report type
	if (op == opValues["viewReport"])
	{
		pageHeading += otherText["pgHead_report"];
	}

	if (op == opValues["viewReportFormat"])
	{
		pageHeading += otherText["pgHead_reportView"];
	}

	if(op == opValues["modifyReport"] || op == opValues["modifyReportSubmit"])
	{
		pageHeading += otherText["pgHead_reportUpd"];
	}

	if(op == opValues["modifyReportActive"])
	{
		pageHeading += otherText["pgHead_reportUpd"];
	}

	if(op == opValues["insertReport"] || op == opValues["insertReportSubmit"])
	{
		pageHeading += otherText["pgHead_reportAdd"];
	}

	if(op == opValues["deleteReport"] || op == opValues["deleteReportSubmit"])
	{
		pageHeading += otherText["pgHead_reportDel"];
	}

	// Page header for report format
	if (op == opValues["listReportFormat"])
	{
		pageHeading += otherText["pgHead_reportFormat"];
	}
	if(op == opValues["modifyReportFormat"] || op == opValues["modifyReportFormatSubmit"])
	{
		pageHeading += otherText["pgHead_reportFormatUpd"];
	}
	if (op == opValues["toggleReportFormat"])
	{
		pageHeading += otherText["pgHead_reportFormatUpd"];
	}
	if (op == opValues["moveupReportFormat"])
	{
		pageHeading += otherText["pgHead_reportFormatUpd"];
	}
	if (op == opValues["movedownReportFormat"])
	{
		pageHeading += otherText["pgHead_reportFormatUpd"];
	}

	return pageHeading; 
}


function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	// Page title for report type
	if (op == opValues["viewReport"])
	{
		pageTitle += otherText["pgTitle_report"];
	}

	if (op == opValues["viewReportFormat"])
	{
		pageTitle += otherText["pgTitle_reportView"];
	}

	if(op == opValues["modifyReport"] || op == opValues["modifyReportSubmit"])
	{
		pageTitle += otherText["pgTitle_reportUpd"];
	}

	if(op == opValues["modifyReportActive"])
	{
		pageTitle += otherText["pgTitle_reportUpd"];
	}

	if(op == opValues["insertReport"] || op == opValues["insertReportSubmit"])
	{
		pageTitle += otherText["pgTitle_reportAdd"];
	}

	if(op == opValues["deleteReport"] || op == opValues["deleteReportSubmit"])
	{
		pageTitle += otherText["pgTitle_reportDel"];
	}

	// Page title for report format
	if (op == opValues["listReportFormat"])
	{
		pageTitle += otherText["pgTitle_reportFormat"];
	}
	if(op == opValues["modifyReportFormat"] || op == opValues["modifyReportFormatSubmit"])
	{
		pageTitle += otherText["pgTitle_reportFormatUpd"];
	}
	if (op == opValues["toggleReportFormat"])
	{
		pageTitle += otherText["pgTitle_reportFormatUpd"];
	}
	if (op == opValues["moveupReportFormat"])
	{
		pageTitle += otherText["pgTitle_reportFormatUpd"];
	}
	if (op == opValues["movedownReportFormat"])
	{
		pageTitle += otherText["pgTitle_reportFormatUpd"];
	}

	return pageTitle; 
}



/* the following functions are designed to update the child dropdown list dynamically according to the changes occured in various numbers of parents*/

function clearDropdownList(childOption) 
{
	while(childOption.length != 0) 
	{
		childOption.options[childOption.length-1] = null;
	}

	//history.go(0);
}


function updateDropdownList(myformObj, parentOption, childOption, sourceList, compareIndex) 
{
	var new_options;
	var parent_select;
	var child_select;

	clearDropdownList(childOption);
	//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	parent_select = parentOption.value;
//	alert(" parent_select1="+parent_select);
	for (i in sourceList )
	{
		if ( i == 0 )
		{
			continue;
		}
		child_select = sourceList[i][compareIndex]&0x03;

		if ( ((parent_select == "") || (parent_select == "-1") || (child_select == parent_select))
		)
/*
		if ( ((parent_select == "") || (parent_select == "-1") || (child_select.indexOf(parent_select) != -1 ))
			)
*/
		{
			new_option = new Option(sourceList[i][1], sourceList[i][0], false, false);
			childOption.options[childOption.length] = new_option;
			childOption.selectedIndex = 0;
		}
	}

//	new_option = new Option( ml(t__Any_ALL), '-1', false, false );
	childOption.options[childOption.length] = new_option;
//	childOption.selectedIndex = 0;
	childOption.selectedIndex = childOption.length-1;

}


function updateDisabledMode(myformObj, parentOption, childOption ) 
{
	var new_options;
	var parent_select;
	var child_select;

	//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	parent_select = parentOption.value;

	if ( parent_select != "" )
	{
		childOption.value = "";
		childOption.disabled = true;
	}
	else
	{
		childOption.disabled = false;
	}
}


function toggle_grp_details(myformObj) 
{
	if(myformObj.checkoper128.checked == false)
	{
		myformObj.checkoper64.checked = false;
		myformObj.checkoper32.checked = false;
	}
}


function toggle_grp_subtotal(myformObj) 
{
	if(myformObj.checkoper64.checked == true)
	{
		myformObj.checkoper128.checked = true;
	}

	if(myformObj.checkoper64.checked == false)
	{
		myformObj.checkoper32.checked = false;
	}
}


function toggle_grp_total(myformObj) 
{
	if(myformObj.checkoper32.checked == true)
	{
		myformObj.checkoper64.checked = true;
		myformObj.checkoper128.checked = true;
	}
}


function check_grp_operations(myformObj, myObject) 
{
	var grp_opers;

	if (myObject == myformObj.checkoper128)
	{
		toggle_grp_details(myformObj);
	}
	if (myObject == myformObj.checkoper64)
	{
		toggle_grp_subtotal(myformObj);
	}
	if (myObject == myformObj.checkoper32)
	{
		toggle_grp_total(myformObj);
	}

	grp_opers = 0;

	if(myformObj.checkoper1.checked == true)
	{
		grp_opers += 1;
	}
	if(myformObj.checkoper2.checked == true)
	{
		grp_opers += 2;
	}
	if(myformObj.checkoper4.checked == true)
	{
		grp_opers += 4;
	}
	if(myformObj.checkoper8.checked == true)
	{
		grp_opers += 8;
	}
	if(myformObj.checkoper16.checked == true)
	{
		grp_opers += 16;
	}
	if(myformObj.checkoper32.checked == true)
	{
		grp_opers += 32;
	}
	if(myformObj.checkoper64.checked == true)
	{
		grp_opers += 64;
	}
	if(myformObj.checkoper128.checked == true)
	{
		grp_opers += 128;
	}
	if(myformObj.checkoper256.checked == true)
	{
		grp_opers += 256;
	}

	myformObj.frm_rpt_title_op.value = grp_opers;
//	alert('operations 1='+grp_opers);
}


function btnGroupModifyReport_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	btn_HTML += btnLocation_HTML("justChaneMyLocation('rptobj_admin.cgi'); ", otherText["btn_bakto_reportPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}


function btnGroupViewReport_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	btn_HTML += btnLocation_HTML("justChaneMyLocation('rptobj_admin.cgi'); ", otherText["btn_bakto_reportPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}


function btnGroupInsertReport_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	btn_HTML += btnLocation_HTML("justChaneMyLocation('rptobj_admin.cgi'); ", otherText["btn_bakto_reportPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function btnGroupListReport_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	if(priv>=7)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('rptobj_admin.cgi?pg='+pg+'&op=" + opValues["insertReport"] + "'); ", otherText["btn_addNew_report"]);
	}

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}


function btnGroupListReportFormat_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	btn_HTML += btnLocation_HTML("justChaneMyLocation('rptobj_admin.cgi'); ", otherText["btn_bakto_reportPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}


function btnGroupModifyReportFormat_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	btn_HTML += btnLocation_HTML("justChaneMyLocation('rptobj_admin.cgi?frm_rpttype_id='+frm_rpttype_id+'&pg='+pg+'&op=" + opValues["listReportFormat"] + "'); ", otherText["btn_bakto_reportFormatPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}




/* define function op_list() */
function op_list( priv, accNum, frmNum )
{
	/* priv = 
		6 modify	op=1,2,3
		7 add		op=4
		8 delete	op=5
	*/
	var op_list = "";

	op_list += "<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+accNum+"', '"+frmNum+"');\">          ";

	switch (priv)
	{
		case 8:
			op_list += "<option value=\"" + opValues["listReportFormat"] + "\">" + otherText["adjustReport"] + "</option>";
			op_list += "<option value=\"" + opValues["deleteReportSubmit"] + "\">" + commText["Delete"] + "</option>";

		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

		case 6:     
			op_list += "<option value=\"" + opValues["modifyReport"] + "\">" + commText["Modify"] + "</option>";
			if ( rpttype_jslist[frmNum][rpttype_active_pos-1] == 1 )
			{
				op_list += "<option value=\"" + opValues["modifyReportActive"] + "\">" + otherText["disableReport"] + "</option>";
			}
			else
			{
				op_list += "<option value=\"" + opValues["modifyReportActive"] + "\">" + otherText["enableReport"] + "</option>";
			}


		case 5:			/* Find Has not been implemented yet*/
//			op_list += "<option value=\"" + opValues["viewReportFormat"] + "\">" + otherText["viewReportFormat"] + "</option>";
			break;
	}

	op_list += "<option value=0 selected>--\t" + otherText["youraction"] + "\t--</option>";
	op_list += "</select>                                        ";
	
	return op_list ;
}


/* define function op_list_format() */
function op_list_format( priv, accNum, frmNum )
{
	/* priv = 
		6 modify	op=1,2,3
		7 add		op=4
		8 delete	op=5
	*/
	var op_list = "";

	op_list += "<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+accNum+"', '"+frmNum+"');\">          ";

	switch (priv)
	{
		case 8:

		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

		case 6:     
			op_list += "<option value=\"" + opValues["modifyReportFormat"] + "\">" + commText["Modify"] + "</option>";
			if ( format_jslist[frmNum][format_section_pos] == 5 )
			{
				if ( format_jslist[frmNum][format_active_pos] == 1 )
				{
					op_list += "<option value=\"" + opValues["toggleReportFormat"] + "\">" + otherText["disableReportFormat"] + "</option>";
				}
				else
				{
					op_list += "<option value=\"" + opValues["toggleReportFormat"] + "\">" + otherText["enableReportFormat"] + "</option>";
				}
				op_list += "<option value=\"" + opValues["moveupReportFormat"] + "\">" + otherText["moveUpReportFormat"] + "</option>";
				op_list += "<option value=\"" + opValues["movedownReportFormat"] + "\">" + otherText["moveDownReportFormat"] + "</option>";
				op_list += "<option value=\"" + opValues["movetopReportFormat"] + "\">" + otherText["moveTopReportFormat"] + "</option>";
				op_list += "<option value=\"" + opValues["movebottomReportFormat"] + "\">" + otherText["moveBottomReportFormat"] + "</option>";
			}

		case 5:			/* Find Has not been implemented yet*/
			break;
	}

	op_list += "<option value=0 selected>--\t" + otherText["youraction"] + "\t--</option>";
	op_list += "</select>                                        ";
	
	return op_list ;
}



/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage, lang)
{
  var newPage = "";  // use this to avoid the duplicate of info 

	newPage += "<SCRIPT LANGUAGE=\"JavaScript\">\n";

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
	newPage += "	//var myHiddenOb;\n";
	newPage += "	\n";
	newPage += "	//myHiddenOb = getElemRefs(\"prev_qstring\";\n";
	newPage += "	//myHiddenOb.value=produceQString(;\n";
	newPage += "	//return formcheck(myobject;\n";
	newPage += "	return Validator.Validate(myobject,1);\n";
	newPage += "}\n";
	
	newPage += "/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
	newPage += "[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
	newPage += "'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
	newPage += "function submitAction(myobject, accNum, frmNum)\n";
	newPage += "{\n";
	newPage += "	var myCurQstring=produceQString();\n";
	newPage += "	var myselectedvalue = myobject.options[myobject.selectedIndex].value;";

	newPage += "	if(myselectedvalue==\"" + opValues["deleteReportSubmit"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(confirm('" + otherText["msg_del_confirm"] + "'))\n";
	newPage += "		{\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["deleteReportSubmit"] + "+\"';\");\n";

	newPage += "			eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "			return true;\n";
	newPage += "		}\n";
	newPage += "		eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
  	newPage += "	}\n";

	newPage += "	else\n";
	newPage += "	{\n";
	newPage += "		eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "		return true;\n";
	newPage += "	}\n";

	newPage += "}\n";

	newPage += "</script>\n";
	newPage += "\n";
	newPage += "</head>\n";
	newPage += "\n";
	newPage += "<body>\n";
	newPage += "\n";

	return (newPage);
}


