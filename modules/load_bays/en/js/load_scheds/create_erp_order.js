var INTERNAL_SALE_TYPE="库到站";
var MWN_SALE_ID_PREFIX="mwyk";
var DNGWAN_SALE_ID_PREFIX="lbyk";

// fix fo bugzilla 2528
var sale_id_prefixes = new Array();
sale_id_prefixes["SZB4"] = "mwyk";
sale_id_prefixes["GDS3"] = "lbyk";
sale_id_prefixes["GDA6"] = "xhdyk";



var myColumns = [ "Sale Id","Cusomter Code", "Customer Name", "Tanker","Compartment No", "Shift", "Batch", "Product Code", "Product Name","Qty","Unit" ];
var t__Depot = ["Depot","油库"];
var t__Select_A_Depot = ["Select A Depot","选择油库"];
var t__Select_A_Supplier = ["Select A Supplier","选择供应商"];
var t__Supplier = ["Supplier","供应商"];

var t__Others = ["Others","其他"];
var t__Select = ["Select", "请选择" ];
var t__Def_Dliver_Loc = ["Default Delivery Location","入库单位"];
var t__Customer = ["Customer ", "入库油站"];
var t__Cust_Category = ["Category ", "客户类别"];
var t__Sale_Type = ["Sale Type ", "单据类型"];
var t__Product = ["Product","油品"];
var t__Select_a_tanker = ["Select a tanker","选择油槽车"];
var t__Meter = ["Meter","流量计"];
var t__Bay_Arm = ["Bay Arm","鹤管"];
var t__Requi_Temp_Compens = ["Require Temperature Compensations","需要进行温度补偿"];
var t__Requi_Addtv = ["Require Additive","需要添加剂"];
var t__Shift = ["Shift","班次"];
var t__Enter_Shift_Number = ["Enter Shift Number","输入班次号"];
var t__Enter_Batch_Number = ["Enter Batch Number","输入趟次号"];
var t__Enter_Compt  = ["Enter Compartment Number","输入仓位"];
var t__Order_Type  = ["Creating ERP Order For ?","生成ERP单据 ?"];
var t__Order_Mtr_Calib  = ["Meter Calibration","验表"];
var t__ERP_Offline  = ["ERP Offline","ERP断线"];

var otherText = new Array()
otherText["youraction"] =  "YOUR ACTION";
otherText["pgHead_eqpTp"] =  "equipment compartment limits";
otherText["pgTitle_eqpTp"] =  "Load Schedule, Equiptment Types";
otherText["erp_hostComm_status"] =  "ERP HostComm Process Info";
otherText["erp_hostComm_available"] =  "ERP HostComm Process Available?";
otherText["Unit_Ltr"] =  "Litre";  
otherText["Unit_Kg"] =  "Kg";
otherText["close_window"] = "Close Window";
otherText["msg_valid_start"] = "Enter Start Date and Start Time earlier than End Date and End Time";
otherText["msg_valid_endDate"] = "Enter End Date and End Time later than Start Date and Start time";
otherText["msg_valid_startTime"] = "Enter Start Time and Start Date earlier than End Time and End Date";
otherText["msg_valid_endTime"] = "Enter End Time and End Date later than Start Time and Start Date";
otherText["msg_valid_saleId"] = "Enter Valid Sale Id";
otherText["msg_valid_Customer"] = "Enter Valid Customer Name";
otherText["msg_prod_not_on_arm"] = "Selected product not available on selected arm";
otherText["msg_valid_saleId_used"] = "Sale Id you entered has already been used";

otherText["msg_view_order_days"] = "View ERP Orders Status for last day (s)";
otherText["fieldMsg_erp_search"] = "ERP Orders Search form";
otherText["fieldMsg_erp_order"] = "ERP Order Form";
otherText["start_date"] = "Start Date Time";
otherText["end_date"] = "End Date Time";
otherText["start_time"] ="Start Time";
otherText["end_time"] ="End Time";
otherText["select_date"] = "Select Date";
otherText["select_a_start_time"] = "Select a start time";
otherText["select_a_end_time"] = "Select an end time";
otherText["cnfm_msg_more_than_order_qty"] = "Are you sure you want to order more than the Original Order Qty ?";
otherText["t__Enter_Quantity_between"] = "Enter Quantity between 1 - 999999 ";



var jnl_days_jslist = [ [ "", ""], ["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], ["7","7"]];

var dateFormat = "yyyy-MM-dd";	
var opValues = new Array()
opValues["init"] = 1;
opValues["submitDispaly"] = 7;
opValues["submitAdd"] = 17;
if(saleId=='-1') saleId="";
var l_opInf= new Array()
for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];


if ( 'cn' == js_lang)
{
	var myColumns = ["ERP单号","客户编号","客户名称","车号", "油仓编号", "班次", "趟次", "油品编号", "油品名称", "订单量","单位" ];
	otherText["youraction"] =  "请选择";
	otherText["created_orders"] =  "成功下载的ERP订单,但是尚未生成OMEGA提单和自动分仓";
	otherText["auto_sched"] =  "自动分仓产生的OMEGA提单";
	otherText["orders_waiting"] =  "等待批准的ERP订单";
	otherText["orders_declined"] =  "被拒绝的ERP订单 ";
	otherText["last_hr"] =  "[过去1小时中]";
	otherText["pgHead_eqpTp"] =  "运输设备油仓限额";
	otherText["pgTitle_eqpTp"] =  "发油订单管理, 运输设备类型管理";
	otherText["erp_hostComm_status"] =  "ERP对接系统运行信息";
	otherText["erp_hostComm_available"] =  "ERP对接系统可以运行?";
	otherText["msg_valid_start"] = "开始日期与时间必须早于终止日期与时间";
	otherText["msg_valid_endDate"] = "终止日期与时间必须晚于开始日期与时间";
	otherText["msg_valid_startTime"] = "开始时间与日期必须早于终止时间与日期"
	otherText["msg_valid_endTime"] = "终止时间与日期必须晚于开始时间与日期";

	otherText["msg_view_order_days"] = "ERP对接系统观察天数";
	otherText["fieldMsg_erp_search"] = "ERP对接系统状态查找";
	otherText["start_date"] = "开始日期 / 时间";
	otherText["end_date"] = "结束日期 / 时间";
	otherText["start_time"] ="开始时间";
	otherText["end_time"] ="结束时间";
	otherText["select_date"] = "选择日期";
	otherText["select_a_start_time"] = "选择开始时间";
	otherText["select_a_end_time"] = "选择结束时间";

	otherText["Last_Time"] =  "上次下载的ERP订单";
	otherText["Next_Time"] =  "下次将要下载的ERP订单";
	otherText["Unit_Ltr"] =  "升";  
	otherText["Unit_Kg"] =  "千克"; 
	otherText["close_window"] = "关闭窗口";
	otherText["msg_valid_saleId"] = "请输入有效的ERP单号";
	otherText["msg_prod_not_on_arm"] = "所选油品和所选台位鹤管不匹配";
	otherText["msg_valid_saleId_used"] = "您输入的ERP单号已经用过";
	otherText["fieldMsg_erp_order"] = "ERP单据表";
	otherText["cnfm_msg_more_than_order_qty"] = "您确定要补发比原订单量多的油品?";
	otherText["t__Enter_Quantity_between"] = "请输入油量，值必须介于1 - 999999";
	otherText["msg_valid_Customer"] = "请输入有效的客户名称";
	l_opInf[18]= "成功删除！";
	
}
/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
var l_opInf= new Array()
	for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
l_opInf[26]= g_opInf[26]; // Success Updated
l_opInf[27]= g_opInf[27]; // insert a new success
l_opInf[33]= g_opInf[37]; //Insert New Record Failed!";
l_opInf[35]= g_opInf[37]; //Insert New Record Failed!";
l_opInf[37]= g_opInf[37]; //"Insert New Record Failed!";
l_opInf[34]= g_opInf[38]; //Deleted Failed
l_opInf[133]= g_opInf[136]; //"DB Update Failed!";
l_opInf[135]= g_opInf[136]; //"DB Update Failed!";
l_opInf[136]= g_opInf[136]; //"DB Update Failed!";
l_opInf[137]= g_opInf[137];//"DB Insert Failed!";
l_opInf[134]= g_opInf[138]; //"DB Delete Failed!";
/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    		
var ops_req_print = [-1, 1,26,28,38,48,36,27,37,47];
var ops_req_search = [-1, 1,26,28,38,48,36,27,37,47];// search never required on this page		

/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	  FUNCTION [ renderPage] 
	  [PURPOSE]  		-> 	Always call this function from 
	  Pro C Java Script output
	  Depending upon the Opration selected 
	  and privlages.


	  [Parameter]  	-> cRec integer current record index to be modified NOT IN USE
	  -> cCol integer USED FOR CURRENT COLUM sort NOT IN USE
	  -> cState integer DECIDES what to display on the screen
	  -> cPageState LOADED OR NOTLOADED, from PROC its always 
	  LOADED but use LOADED when DHTML loads the
	  page without interacting with the server used for stock management
	  unit conversion functions.
	  [AUTHOR]  		-> Abdul Shakoor (DKI) Sept 1, 2005
 '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
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
	newPage += printHdr(newPage, updatePageTitle(curViewDetailState, pageTitle), lang);
	newPage += local_HeadrHTML(newPage, lang);

	//newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));

	//newPage += "\n";
	newPage +="<tr>\n";  
	newPage +="<td width=\"100%\">             \n";
	newPage +="<div class=\"content\" id=\"content\">\n";
	newPage += "<div id=\"printReady\">";
	newPage +="<table border=\"0\" width=\"700\" height=\"100%\">\n";
	newPage +="<tbody>\n";   

	// if OP is <=1 OR Higher than available options should always come to this view
	if (curViewDetailState <= opValues["init"] || curViewDetailState >=15 ) 
	{
		
		newPage +=backToBtn_HTML();		
		newPage +=displayStatusMsg (op);  
		newPage += addFrm();
    	//Display all declined

		newPage += "<\/tbody>";
		newPage += "<\/table>";
		newPage += "<\/div>";
		newPage += "<\/td>";	
		newPage += "<\/tr>";

	}

	// table for everything ends here
	//	newPage += "</tr>\n";
	newPage += "</tbody>\n";
	newPage += "</table>\n";
	newPage += "</div>\n";
	newPage += "</div>\n";
	newPage += "</td>              \n";  
	newPage += "</tr>\n";
	
	//
	newPage +="<script type=\"text/javascript\">\n";
  newPage +="var options1 = {\n";
  newPage +="script:\"/cgi-bin/en/load_scheds/tankers.cgi?\",\n";
  newPage +="varname:\"input\",\n";
  newPage +="minchars:1\n";
  newPage +="};\n";
  
  newPage +="var options2 = {\n";
  newPage +="script:\"/cgi-bin/en/load_scheds/customers.cgi?cust_cat="+cust_category+"&\",\n";
  newPage +="varname:\"input1\",\n";
  newPage +="minchars:1\n";
  newPage +="};\n";
  
  newPage +="var as1 = new AutoSuggest('tanker', options1);\n";
  newPage +="var as2 = new AutoSuggest('cust_acct', options2);\n";
  newPage +="</script>\n";
	// the folowing is the closing tag relevant to those in get ToolBar_HTML
	newPage += "</tbody>\n";
	newPage += "</table>\n";
	newPage += "<!-- End of table to add the header lines -->\n";
	newPage += "\n";
	newPage += "</td>              \n";
	newPage += "</tr>\n";
	newPage += "</tbody>\n";
	newPage += "</table>\n";

	newPage += "\n";
	newPage += "</body>\n";
	newPage += "</html>\n";
	newPage += "\n"; 

	//alert(newPage); 
	return(newPage);
	document.close();
	if (typeof writeBack != 'undefined')writeBack();


}
/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	  FUNCTION [assArray_keys] 
	  [PURPOSE]  		-> 	Return Keys for the Hash table (Associative Array)  array  .


	  [Parameter]  	-> inputArr Input array requires the keys for
	  [Return]  	-> keys an array contain keys for the input array

	  [AUTHOR]  		-> Abdul Shakoor (DKI) Sept 2, 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function assArray_keys(inputArr)
{
	var keys = new Array();
	for (var i in inputArr) {
		if (inputArr[i] != null) 
			keys.push(i);
	}
	return keys;
}

function obs(data)
{
	return data;
}
		
function backToBtn_HTML ()
{
	var btn_HTML = "";
	btn_HTML +="<tr> \n";
	btn_HTML +="<td align=\"center\">\n ";
	btn_HTML +="<div class=\"button\">\n";
	btn_HTML +="<a href=\"#\" class=\"popupLink\" onClick=\"window.close();\">"+otherText["close_window"]+"</a>\n";

	btn_HTML +="</div><br>\n";
	btn_HTML +="<td>\n ";
	btn_HTML +="</tr> \n";
	return btn_HTML;
}

function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;
	if (op <= 1)
	{
		pageHeading +=otherText["pgHead_eqpTp"];
	} 
	if(op == opValues["enterModify"])
	{
		pageHeading += otherText["pgHead_ModeqpTp"];
	}
	if(op == opValues["enterAdd"])
	{
		pageHeading += otherText["pgHead_AddeqpTp"];
	}
	return pageHeading;   
}
function updatePageTitle(op,pgTit)
{

	var pageTitle = pgTit;
	if (op <= 1)
	{
		pageTitle +=otherText["pgTitle_eqpTp"];

	}
	if (op == opValues["enterModify"])
	{
		pageTitle +=otherText["pgTitle_ModeqpTp"];

	}
	if (op =opValues["cmpt_limts"])
	{
		pageTitle +=otherText["pgTitle_ModeqpTp"];

	}
	if(op ==opValues["enterAdd"])
	{
		pageTitle +=otherText["pgTitle_AddeqpTp"];
	}

	return pageTitle;
}

function showinPagePopup(whichObject, whichPopup, whichFile)
{
	var myPopUpObject;
	myPopUpObject = whichObject;
	myPopUpObject.setUrl(whichFile);
	myPopUpObject.showPopup(whichPopup);
}
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage,lang)
{
	newPage +="<SCRIPT src=\"/"+lang+"/js/CalendarPopup.js\"></SCRIPT>\n";
    newPage +="<script>\n";
    newPage +="	var cal = new CalendarPopup();\n";
    newPage +="	cal.showYearNavigation();\n";
	newPage +="function submitmyFindform(myobject)\n";
	newPage +="{\n";
	newPage +="	return Validator.Validate(myobject,1);\n";
	newPage +="}\n";
	newPage +="</script>\n";
	newPage +="</head>\n";	
	newPage +="\n";
	newPage +="<body>\n";  
	newPage +="\n";  
	return (newPage);

}
	
	


function addFrm()
{
 
  var ProdList ="";
  var saletype="";
  
  var Mtr_Calib_Checked="";
  var ERP_OFF_Checked="checked";
  var Sale_Id_readOnly="";
  
  var UnitLtrSelected="selected";
  var UnitKgSelected="";
  
  var Temp_Comp_N_Selected="selected";
  var Temp_Comp_Y_Selected="";
  
  var Add_N_Selected="selected";
  var Add_Y_Selected="";
  
  if(erp_sale_for=="MTR")
  {
	Mtr_Calib_Checked="checked";
	Sale_Id_readOnly=" readOnly=true";
	ERP_OFF_Checked="";
  }
  
  if (unit == 'KG' )
	{
		UnitKgSelected = "selected";
	}
	
	if (req_tempComp == '1' )
	{
		Temp_Comp_Y_Selected = "selected";
	}
	
	if (addtv == '1' )
	{
		Add_Y_Selected = "selected";
	}
	
	
	if ((suppCd == '-1' ||suppCd == '') )
	{
		ProdList = "disabled";
		prodCd="-1";
	}

	if ((saleId_new == '-1' ||saleId_new == '') )
	{
		saleId_new = "";
		
	}
	
	if ((cust_acct == '-1' ||cust_acct == '') )
	{
		cust_acct = "";
		
	}
	
	if ((tanker == '-1' ||tanker == '') )
	{
		tanker = "";
		
	}
	
	if ((compt == '-1' ||compt == '') )
	{
		compt = "";
		
	}
	
	if ((qty_new == '-1' ||qty_new == '') )
	{
		qty_new = "";
		
	}
	
	if ((shift == '-1' ||shift == '') )
	{
		shift = "";
		
	}
	
	if ((batch == '-1' ||batch == '') )
	{
		batch = "";
		
	}
	
	if(cust_category=="INTERNAL")
	{
		saletype=INTERNAL_SALE_TYPE;
	}
	
  var addFrmhtml = "";
  addFrmhtml += fieldst_HTML(otherText["fieldMsg_erp_order"]);
  addFrmhtml += "<form name=\"AddNewFrm\" method=\"POST\" id=\"AddNewFrm\" onSubmit=\"return submitAddform(this);\">\n";
  addFrmhtml += "<div class=\"adminform\">\n";
  addFrmhtml += "<table width=\"100%\">\n";
  addFrmhtml += "<tr>\n";
  addFrmhtml += "<td width=\"100%\">\n";
  addFrmhtml += "<table width=\"100%\">\n";
  
	//Beginning of 1 first row for radio buttons
	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td colspan=\"2\">\n";
	
	
	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"200\" ",ml(t__Order_Type)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="<td>\n";
	
	addFrmhtml += "<table>\n";  
  addFrmhtml += "<tr>\n";
  addFrmhtml += "<td width=\"20\">\n";
  addFrmhtml += "<input type=\"radio\" name=\"erp_sale_for\" id=\"erp_sale_for\" value=\"MTR\" onclick=\"saleId_new.value=''; saleId_new.readOnly=true;\" "+ Mtr_Calib_Checked+" \/> \n";
  addFrmhtml += "</td>\n";
  addFrmhtml += "<td class=\"infotextheading\" width=\"140\">\n";
  addFrmhtml += ml(t__Order_Mtr_Calib)+" :\n";
  addFrmhtml += "</td>\n";
  
  addFrmhtml += "<td width=\"20\">\n";
  addFrmhtml += "<input type=\"radio\" name=\"erp_sale_for\" id=\"erp_sale_for\" value=\"ERP\" onclick=\" saleId_new.value=''; saleId_new.readOnly=false;\" "+ ERP_OFF_Checked+" \/> \n";
  addFrmhtml += "</td>\n";
  addFrmhtml += "<td class=\"infotextheading\" width=\"140\">\n";
  addFrmhtml += ml(t__ERP_Offline)+" :\n";
  addFrmhtml += "</td>\n";
  addFrmhtml +="<\/tr>\n";
 addFrmhtml +="<\/table>\n";
	
	addFrmhtml +="<\/td>\n";
	addFrmhtml +="<\/tr>\n";
	addFrmhtml +="<\/table>\n";
	
	
	addFrmhtml +="			<\/td>\n";
	addFrmhtml +="			<\/tr>\n";
	//End of 1 first row for radio buttons
	//Beginning of 1 first row
	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Depot)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="<td>\n";

	addFrmhtml += "<select id=\"trmnl\" name=\"trmnl\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_A_Depot)+"\"> \n";
	addFrmhtml += displayDropList(trmnl, terminal,ml(t__Select_A_Depot));

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Supplier)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";

	addFrmhtml += "<select id=\"suppCd\" name=\"suppCd\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_A_Supplier)+"\" onchange=\"set_Supp_Name(this); submit();\"> \n";
	addFrmhtml += displayDropList(suppCd, supplier,ml(t__Select_A_Supplier));

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";

	addFrmhtml +="			</tr>\n";
	
	// 2nd row start
  
  
  addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Cust_Category)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="<td>\n";

	addFrmhtml += "<select id=\"cust_category\" name=\"cust_category\" class=\"smallselect\" dataType=\"Require\" msg=\""+(ml(t__Select)+" "+ml(t__Cust_Category))+"\" onchange=\"document.AddNewFrm.cust_acct.value=''; submit();\"> \n";
	addFrmhtml += displayDropList_any_All(cust_category, cust_category_jslst,(ml(t__Select)+" "+ml(t__Cust_Category)), 'D');
	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Customer)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "					<table class=\"NewActionBaseTable\">\n";
	addFrmhtml += "					<tbody>\n";
	addFrmhtml += "					<tr>\n";
	addFrmhtml += "					<td class=\"popupLinkrow\">\n";
	addFrmhtml += "						<input type=\"text\" name=\"cust_acct\" id=\"cust_acct\" value=\""+cust_acct+"\" style=\"FONT-SIZE:1.00em\" dataType=\"Require\" msg=\""+(ml(t__Select)+" "+ml(t__Customer))+"\" / >\n"; 
	addFrmhtml += "					</td>\n";
	addFrmhtml += "					<td width=\"15\">\n";
	addFrmhtml += "						<img src=\"/images/dropimage.gif\" width=\"15\" height=\"16\" onclick=\"as2.doAjaxRequest();\">\n";
	addFrmhtml += "					</td>\n";
	addFrmhtml += "					</tr>\n";
	addFrmhtml += "					</tbody>\n";
	addFrmhtml += "					</table>\n";
	addFrmhtml +="				</td>\n";
	addFrmhtml +="				</tr>\n";
	addFrmhtml +="				</table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			</tr>\n";
  // 2nd row end
  
  // 3rd  row Start
	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Def_Dliver_Loc)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="<td>\n";

	addFrmhtml += "  <select id=\"delivloc\" name=\"delivloc\" class=\"smallselect\" dataType=\"Require\" msg=\""+(ml(t__Select)+" "+ml(t__Def_Dliver_Loc))+"\" onChange=\"set_DeliverLoc_Name(this);\"> \n";
	update_DeliverLoc_Array(delvloc_jslst);
	addFrmhtml += displayDropList_any_All(delivloc, delvloc_jslst,(ml(t__Select)+" "+ml(t__Def_Dliver_Loc)), 'D');	

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[0]+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";

	addFrmhtml += "<input type=\"text\" id=\"saleId_new\" name=\"saleId_new\" dataType=\"Require\" maxLength=\"20\" value=\""+saleId_new+"\" msg=\""+otherText["msg_valid_saleId"]+"\" "+Sale_Id_readOnly+" />\ \n";

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";

	addFrmhtml +="			</tr>\n";
	
	// 3rd  row End
	
	// 4th row begin
	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[3]+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="<td>\n";

	addFrmhtml += "					<table class=\"NewActionBaseTable\">\n";
	addFrmhtml += "					<tbody>\n";
	addFrmhtml += "					<tr>\n";
	addFrmhtml += "					<td class=\"popupLinkrow\">\n";
	addFrmhtml += "						<input type=\"text\" name=\"tanker\" id=\"tanker\" value=\""+tanker+"\" style=\"FONT-SIZE:1.00em\" dataType=\"Require\" msg=\""+ml(t__Select_a_tanker)+"\" />\n"; 
	addFrmhtml += "					</td>\n";
	addFrmhtml += "					<td width=\"15\">\n";
	addFrmhtml += "						<img src=\"/images/dropimage.gif\" width=\"15\" height=\"16\" onclick=\"as1.doAjaxRequest();\">\n";
	addFrmhtml += "					</td>\n";
	addFrmhtml += "					</tr>\n";
	addFrmhtml += "					</tbody>\n";
	addFrmhtml += "					</table>\n";

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[4]+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";

	addFrmhtml += "<input type=\"text\" id=\"compt\" name=\"compt\" dataType=\"PositiveIntGteZero\" min=\"0\" max=\"999999999\" value=\""+compt+"\" msg=\""+ml(t__Enter_Compt)+"\" maxlength=\"9\" />\ \n";

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";

	addFrmhtml +="			</tr>\n";
	
	// 4th row End
	
	
	
	// 5th row begin
	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Product)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="<td>\n";

	addFrmhtml += "  <select id=\"prodCd\" name=\"prodCd\" class=\"smallselect\" dataType=\"Require\" msg=\""+(ml(t__Select)+" "+ml(t__Product))+"\" "+ProdList+"\ onChange=\"addtv.selectedIndex=0;updateDropdownList(document.AddNewFrm, this, document.AddNewFrm.mtrcode, meter_jslst, 5);\" /> \n";
	addFrmhtml += displayDropList_any_All(prodCd, prod_jslst,(ml(t__Select)+" "+ml(t__Product)), 'D');

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[9]+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";

	addFrmhtml += "<input type=\"text\" id=\"qty_new\" name=\"qty_new\" dataType=\"RangeInt\" min=\"1\" max=\"999999999\" value=\""+qty_new+"\" msg=\""+otherText["t__Enter_Quantity_between"]+"\" />\ \n";

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";

	addFrmhtml +="			</tr>\n";
	
	// 5th row End
	
	// 6th row begin
	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[10]+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="<td>\n";

	addFrmhtml += "  <select id=\"unit\" name=\"unit\" class=\"smallselect\" /> \n";
	
	addFrmhtml += "  <option value=\"L\" "+UnitLtrSelected+">"+otherText["Unit_Ltr"]+"<\/option>\n";
	addFrmhtml += "  <option value=\"KG\" "+UnitKgSelected+">"+otherText["Unit_Kg"]+"<\/option>\n";
	addFrmhtml += "  <\/select>\n";
	

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Bay_Arm)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "&nbsp;\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "  <select id=\"mtrcode\" name=\"mtrcode\" class=\"smallselect\" msg=\""+(ml(t__Select)+" "+ml(t__Bay_Arm))+"\" "+"\/> \n";
	addFrmhtml += displayDropList_any_All(mtrcode, meter_jslst,(ml(t__Select)+" "+ml(t__Bay_Arm)), 'A');

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";

	addFrmhtml +="			</tr>\n";
	
	// 6th row End
	
	// 7th row begin
	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Requi_Temp_Compens)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="<td>\n";

	addFrmhtml += "  <select id=\"req_tempComp\" name=\"req_tempComp\" class=\"smallselect\" /> \n";	
	addFrmhtml += "  <option value=\"0\" "+Temp_Comp_N_Selected+">"+commText["No"]+"<\/option>\n";
	addFrmhtml += "  <option value=\"1\" "+Temp_Comp_Y_Selected+">"+commText["Yes"]+"<\/option>\n";
	addFrmhtml += "  <\/select>\n";
	

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";
	addFrmhtml +="				&nbsp;\n";

	/*
	//Additive selection NOT required
	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Requi_Addtv)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "  <select id=\"addtv\" name=\"addtv\" class=\"smallselect\" /> \n";	
	addFrmhtml += "  <option value=\"0\" "+Add_N_Selected+">"+commText["No"]+"<\/option>\n";
	addFrmhtml += "  <option value=\"1\" "+Add_Y_Selected+">"+commText["Yes"]+"<\/option>\n";
	addFrmhtml += "  <\/select>\n";
	
	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";
	*/
	addFrmhtml +="			</td>\n";

	addFrmhtml +="			</tr>\n";
	
	// 7th row End
	
		
	
	//8th  row begin
	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Shift)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"&nbsp; \n");
	addFrmhtml +="<td>\n";

	addFrmhtml += "<input type=\"text\" id=\"shift\" name=\"shift\" value=\""+shift+"\" dataType=\"Custom\" maxlength=\"4\"  regexp=\"^[0-9]\*\\d\*$\" msg=\""+ml(t__Enter_Shift_Number)+"\" />\ \n";

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[6]+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"&nbsp; \n");
	addFrmhtml +="				<td>\n";

	addFrmhtml += "<input type=\"text\" id=\"batch\" name=\"batch\"  value=\""+batch+"\" dataType=\"Custom\" maxlength=\"4\"  regexp=\"^[0-9]\*\\d\*$\" msg=\""+ml(t__Enter_Batch_Number)+"\" />\ \n";

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";

	addFrmhtml +="			</tr>\n";
	
	// 3rd row End
  
  
  

  
  addFrmhtml += "</table>\n";
  addFrmhtml += "									</td>\n";
  addFrmhtml += "								</tr>\n";
  addFrmhtml += "								<tr>\n";
  addFrmhtml += "									<td align=\"center\">\n";
  addFrmhtml += "										<table>\n";
  addFrmhtml += "											<tr>\n";
  addFrmhtml += "												<td align=\"center\" width=\"50%\">\n";
  addFrmhtml += "													\n";
  addFrmhtml += "													<input type=\"hidden\" name=\"op\" value=\""+opValues["init"]+"\" />\n";
  addFrmhtml += "													<input type=\"hidden\" name=\"suppName\" id=\"suppName\" value=\""+suppName+"\" />\n";
  addFrmhtml += "													<input type=\"hidden\" name=\"way_no\" id=\"way_no\" value=\"0\" />\n";
  addFrmhtml += "													<input type=\"hidden\" name=\"saletype\" id=\"saletype\" value=\""+saletype+"\" />\n";
  addFrmhtml += "													<input type=\"hidden\" name=\"delivloc_name\" id=\"delivloc_name\" value=\"\" />\n";
  addFrmhtml += "													<input type=\"hidden\" name=\"cust_code\" id=\"cust_code\" value=\"\" />\n";
  
  addFrmhtml += "													<input type=\"submit\" value=\""+commText["Add"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
  addFrmhtml += "												</td>\n";
  addFrmhtml += "											</tr>\n";
  addFrmhtml += "										</table>\n";
  addFrmhtml += "									</td>\n";
  addFrmhtml += "								</tr>\n";
  addFrmhtml += "							</table>\n";
  addFrmhtml+= "							</div>\n";
  addFrmhtml += "					</form>\n";
  addFrmhtml += fieldstFoot_HTML();
  addFrmhtml += "		</td>\n";
  addFrmhtml += "	</tr>\n";  

  return addFrmhtml;  
  
  
  
}

function submitAddform(myobject)
{

	var isFormValid = false;
	var isTankerinuse = false;
	var isCustValid = false;
	var hasSaleIdUsed = false;
	var rsnforSale = "";
	//See if this is an order for Meter Calibaration
	for (i=0;i<document.AddNewFrm.erp_sale_for.length;i++)
	{
		  if (document.AddNewFrm.erp_sale_for[i].checked)
		  {
				 rsnforSale= document.AddNewFrm.erp_sale_for[i].value;
				 
		  }
	}
	// if Meter Calibration Need to create a sale id
	if (rsnforSale!="" && rsnforSale=="MTR")
	{
			document.AddNewFrm.saleId_new.value = generate_MtrCalibsaleId(terminal[1][0] ); //pass terminal code to get the sale id for meter calibration
	}

	
	//alert(document.AddNewFrm.erp_sale_for.value);
	isFormValid = Validator.Validate(myobject,1);
	if(isFormValid==true)
	{
		if (checkIfArmProdMatch(document.AddNewFrm.mtrcode.value, document.AddNewFrm.prodCd.options[document.AddNewFrm.prodCd.selectedIndex].value)==false)
		{
			alert(otherText["msg_prod_not_on_arm"] );
			return false;
		}
		//function setCustCmpyCd updates the global variable isFormValid
		//if set to false don't need to submit the form
		var mycgi1 = '../../../cgi-bin/en/load_scheds/customers.cgi';
		var myqry1 = "input2="+encodeURI(document.AddNewFrm.cust_acct.value) ;
		isCustValid = setCustCmpyCd(loadXml(mycgi1, myqry1, setCustCmpyCd));
		if (isCustValid==false) return false;
				
		//so for so good let  us check if the correct tanker has been used		
		var mycgi = '../../../cgi-bin/en/load_scheds/tankers.cgi';
		var myqry = "input1="+encodeURI(document.AddNewFrm.tanker.value) ;
		isTankerinuse = checkIfTankerInUse(loadXml(mycgi, myqry));
		if(isTankerinuse==false) return false;
		
		//so for so good let  us check if the Sale Id has been used		
		var mycgi = '../../../cgi-bin/en/load_scheds/erporders.cgi';
		var myqry = "input1="+encodeURI(document.AddNewFrm.saleId_new.value) ;
		hasSaleIdUsed = checkIfSaleIdUsed(loadXml(mycgi, myqry));
		if(hasSaleIdUsed==true) return false;
		
		document.AddNewFrm.op.value =17;
		
		
		
		
		
	}	
	return isFormValid;		
		
}
function checkIfSaleIdUsed(xml)
{
	var results = xml.getElementsByTagName('results')[0].childNodes;
	for (var i=0;i<results.length;i++)
	{
		if (results[i].hasChildNodes())
		{
			alert(otherText["msg_valid_saleId_used"]);
			return true;
		}
	}
	
	return false;
}
/* checkIfArmProdMatch functions 
  * if the arm selected has the matching drawer product
  * if matching arm found get the way_no
  * save to the way_no field
  */
function checkIfArmProdMatch(armCode, drawProdSelected)
{
	if (armCode=='-1')// that is any all selected
	{
		document.AddNewFrm.way_no.value=0;
		return true;
	}
	for (var i=1;i<meter_arm_prod.length;i++)
	{
		//alert("Pssed to me  "+ armCode +" and drawProdSelected "+drawProdSelected );
		if ((meter_arm_prod[i][1]==armCode) && (meter_arm_prod[i][5]==drawProdSelected))
		{
			document.AddNewFrm.way_no.value= meter_arm_prod[i][2];
			return true;
		}
	}
	
	return false;
}
function checkIfTankerInUse(xml)
{
	//alert("checkIfTankerInUse been called");
	var results = xml.getElementsByTagName('results')[0].childNodes;
	for (var i=0;i<results.length;i++)
	{
		if (results[i].hasChildNodes())
		{			
			return true;
		}
	}
	
	alert(ml(t__Select_a_tanker));
	return false;
		
	
}
function setCustCmpyCd(inputxml)
{
	//alert("at the beginning of function the value of isFormValid "+isFormValid);
	var results = inputxml.getElementsByTagName('results')[0].childNodes;
	for (var i=0;i<results.length;i++)
	{
		//alert("I am here there is something and cust ");
		if (results[i].hasChildNodes())
		{
			//alert("I am here there is something and cust company code is "+results[i].getAttribute("cust_code"));
			document.AddNewFrm.cust_code.value =(results[i].getAttribute("cust_code"));
			return true;
		}
		
	}
	alert(otherText["msg_valid_Customer"]);
	return false;
	
}

/* define update_DeliverLoc_Array() 
 * responsible for adding "Others" as an option text
 * to the dlivery location list
 * where delivery location code has "......." 
 */

function update_DeliverLoc_Array(inputArray)
{
	var search_term = "........";
  
	var myArrLenght = inputArray.length;
	var myDelvLocs = new Array();
	for(var i=0; i<myArrLenght; i++)
	{
		
		if ((inputArray[i][0] != null) && (inputArray[i][0].indexOf( search_term ) != -1) && (trim(inputArray[i][1])=="") )
		{
			inputArray[i][1] = ml(t__Others);
		}
		myDelvLocs[i] = inputArray[i];
		
	}
	return myDelvLocs;

}

/* define set_DeliverLoc_Name() 
 * responsible for reading the delivry location name
 * and set the name field drop list only has code
 */

function set_DeliverLoc_Name(myObject)
{
	var myvalue = myObject.options[myObject.selectedIndex].text;
	document.AddNewFrm.delivloc_name.value=myvalue;
	
}
/* define set_Supp_Name() 
 * responsible for reading the supplier name
 * and set the name field as drop list only had code
 */
function set_Supp_Name(myObject)
{
	var myvalue = myObject.options[myObject.selectedIndex].text;
	document.AddNewFrm.suppName.value=myvalue;
	
}

function adjust_Additive_Flag(myObject)
{
	
	var myvalue = myObject.options[myObject.selectedIndex].text;
	var myvalue = document.AddNewFrm.saleId.value+"_";
	if(! (new RegExp('\\b'+myvalue,'i')).test(document.AddNewFrm.saleId_new.value) ) 
	{
		alert(otherText["msg_valid_saleId"]);
		return false;
	}
	document.AddNewFrm.suppName.value=myvalue;
	
}
function generate_MtrCalibsaleId(myterminal)
{
	var newSaleId ="";
	var abbrev_terminal ="";

	// fix fo bugzilla 2528
	abbrev_terminal = sale_id_prefixes[ myterminal ];
/*
	if(myterminal=="SZB4") //its Mawan
	{
		abbrev_terminal = MWN_SALE_ID_PREFIX;
	}
	else if(myterminal=="GDS3") //its Dongguan
	{
		abbrev_terminal = DNGWAN_SALE_ID_PREFIX;
	}
*/
	var mycurrentDate=new Date();
		mycurrentDate.setDate(mycurrentDate.getDate());
		var mycurrentyear = String(mycurrentDate.getFullYear());
		var mycurrentmonth = String((mycurrentDate.getMonth()+1)) ;
		var mycurrentday = String(mycurrentDate.getDate());
		var mycurrenthour = String(mycurrentDate.getHours());
		var mycurrentminutes = String(mycurrentDate.getMinutes());
		var mycurrentsecs = String(mycurrentDate.getSeconds());
		if (mycurrentmonth.length==1)mycurrentmonth = "0"+mycurrentmonth;
		if (mycurrentday.length==1)mycurrentday = "0"+mycurrentday;
		if (mycurrenthour.length==1)mycurrenthour = "0"+mycurrenthour;
		if (mycurrentminutes.length==1)mycurrentminutes = "0"+mycurrentminutes;
		if (mycurrentsecs.length==1)mycurrentsecs = "0"+mycurrentsecs;
		newSaleId = abbrev_terminal+mycurrentyear+mycurrentmonth+mycurrentday+mycurrenthour+mycurrentminutes+mycurrentsecs;
		return newSaleId; 
		//alert("Here is the date "+mycurrentyear+mycurrentmonth+mycurrentday+mycurrenthour+mycurrentminutes+mycurrentsecs);
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
		child_select = sourceList[i][compareIndex];

//		if ( ((parent_select == "") || (parent_select == "-1") || (child_select.indexOf(parent_select) != -1 ))
//			)

		if ( (parent_select == "") || (parent_select == "-1") )
		{
			break;
		}
		else
//		if ( (child_select.indexOf(parent_select) != -1 ) )
		if ( child_select == parent_select )
		{
			new_option = new Option(sourceList[i][1], sourceList[i][0], false, false);
			childOption.options[childOption.length] = new_option;
			childOption.selectedIndex = 0;
		}
	}

	new_option = new Option( ml(t__Any_ALL), '-1', false, false );
	childOption.options[childOption.length] = new_option;
//	childOption.selectedIndex = 0;
	childOption.selectedIndex = childOption.length-1;

}


