
var opValues = new Array();
var otherText = new Array()
var items_per_page = 10;
var addrTitle = new Array();


opValues["viewReportFrm"] = -1;
opValues["viewReportFrm"] = 0;
opValues["viewReportFrm"] = 1;
opValues["submitReportFrm"] = 11;


var t__Rpt_Font_Size = ["Report Font Size","报表字体尺寸"];
var t__Rpt_Header_Dir = ["Header Direction","表头显示方向"];

var t__YOUR_ACTION = ["YOUR ACTION", "请选择" ];
var t__Select = ["Select ", "请选择" ];
var t__Enter = ["Please Enter ", "请输入" ];
var t__Others = ["Others","其他"];
var t__View_Report = ["View Report","查看报表"];

var t__Msg_Valid_St_Date = ["Enter Start Date and Start Time earlier than End Date and End Time", "开始的日期和时间应该早于结束的日期和时间"];
var t__Msg_Valid_End_Date = ["Enter End Date and End Time later than Start Date and Start time","结束的日期和时间应该迟于开始的日期和时间"];
var t__Select_Start_Hours = ["Select Start Hours","选择开始小时"];
var t__Select_Start_Mints = ["Select Start Minutes","选择开始分钟"];
var t__Select_End_Hours = ["Select End Hours","选择结束小时"];
var t__Select_End_Mints = ["Select End Minutes","选择结束分钟"];
var t__View_All = ["View All", "查看所有信息" ];
var t__Add__Rpt__Details = ["Report Details", "报表详情"] ;
var t__Edit__Rpt__Details = ["Report Details", "报表详情"] ;
var t__FrmComplt = ["Complete and submit the following form , all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory", "填好并递交下表以生成所需报表,所有带 (<span style=\"COLOR: #FF0000;\">*</span>) 的项目是必填的"];
var t__TRIP_REPORT = ["TRIP REPORT","发油报表"];
var t__Select_Date = ["Select Date","选择日期"];


var t__Base_Class_Type_0 = ["Undefined", "未定义"];
var t__Base_Class_Type_1 = ["Jet Fuels/Kerosines", "航空燃料/煤油"];
var t__Base_Class_Type_2 = ["Gasolines", "汽油"];
var t__Base_Class_Type_3 = ["Lubricating oils", "润滑油"];
var t__Base_Class_Type_4 = ["Diesel oils/Fuel oils/Heating oils", "柴油/燃油/民用燃油"];
var t__Base_Class_Type_5 = ["Crude oil", "原油"];
var t__Base_Class_Type_6 = ["Additive", "添加剂"];
var t__Base_Class_Type_7 = ["Ethanol/Water", "酒精/水"];
var t__Base_Class_Type_8 = ["L.P.G.", "液化石油气"];
var t__Base_Class_Type_9 = ["Individual/Special Petroleum Distillate", "特有的/特别石油馏出物"];
var t__Base_Class_Type_10 = ["No Volume adjustment for temperature", "没有温度调整量"];
var t__Base_Class_Type_11 = ["Reported Additive", "已报告添加剂"];

var base_class_type_jslist = new Array();
base_class_type_jslist[0] = ml(t__Base_Class_Type_0);
base_class_type_jslist[1] = ml(t__Base_Class_Type_1);
base_class_type_jslist[2] = ml(t__Base_Class_Type_2);
base_class_type_jslist[3] = ml(t__Base_Class_Type_3);
base_class_type_jslist[4] = ml(t__Base_Class_Type_4);
base_class_type_jslist[5] = ml(t__Base_Class_Type_5);
base_class_type_jslist[6] = ml(t__Base_Class_Type_6);
base_class_type_jslist[7] = ml(t__Base_Class_Type_7);
base_class_type_jslist[8] = ml(t__Base_Class_Type_8);
base_class_type_jslist[9] = ml(t__Base_Class_Type_9);
base_class_type_jslist[10] = ml(t__Base_Class_Type_10);
base_class_type_jslist[11] = ml(t__Base_Class_Type_11);

var base_class_type_droplist = [ ['', ''], [0, ml(t__Base_Class_Type_0)], [1, ml(t__Base_Class_Type_1)], [2, ml(t__Base_Class_Type_2)], [3, ml(t__Base_Class_Type_3)], [4, ml(t__Base_Class_Type_4)], [5, ml(t__Base_Class_Type_5)], [6, ml(t__Base_Class_Type_6)], [7, ml(t__Base_Class_Type_7)], [8, ml(t__Base_Class_Type_8)], [9, ml(t__Base_Class_Type_9)], [10, ml(t__Base_Class_Type_10)], [11, ml(t__Base_Class_Type_11)] ];


var t_Tolerance_Flag_0 = ["No tolerance check", "不查精度"];
var t_Tolerance_Flag_1 = ["Check tolerance", "检查精度"];

var tolerance_flag_jslist = new Array();
tolerance_flag_jslist[0] = ml(t_Tolerance_Flag_0);
tolerance_flag_jslist[1] = ml(t_Tolerance_Flag_1);

var tolerance_flag_droplist = [ ['', ''], [0, ml(t_Tolerance_Flag_0)], [1, ml(t_Tolerance_Flag_1)] ];


var t_Tolerance_Error_0 = ["Within tolerance", "精度合格"];
var t_Tolerance_Error_1 = ["Out of tolerance", "精度不合格"];
var t_Tolerance_Error_2 = ["Error fixed", "误差已校正"];

var tolerance_error_jslist = new Array();
tolerance_error_jslist[0] = ml(t_Tolerance_Error_0);
tolerance_error_jslist[1] = ml(t_Tolerance_Error_1);
tolerance_error_jslist[2] = ml(t_Tolerance_Error_2);

var tolerance_error_droplist = [ ['', ''], [0, ml(t_Tolerance_Error_0)], [1, ml(t_Tolerance_Error_1)], [2, ml(t_Tolerance_Error_2)] ];


var dateFormat = "yyyy-MM-dd";
var dateRange = 31;
var daysOfDataKept = 365;
var dateAutoAdjust = "N";
var defaultDateRange = 1;


var t__Error_Date_Min = ["The starting date should not be older than ONE year!", "开始日期必须在一年之内！"];
var t__Error_Date_Compare = ["The starting date should not be greater than the ending date!", "开始日期应该小于终止日期！"];
var t__Error_Date_Range = ["Start date & End date difference should not be greater than "+dateRange+" days!", "时间范围必须在"+dateRange+"天之内！"];


		/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
  var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[23]= g_opInf[26];//"Successfully Inserted A New Record !";
    l_opInf[33]= g_opInf[36];//update failed    
    l_opInf[27]= g_opInf[27];//Successfully Inserted A New Record !
    l_opInf[37]= g_opInf[37];     //Insert new record Failed;
    l_opInf[28]= g_opInf[28];     //Successfully Deleted!;
    l_opInf[38]= g_opInf[38];     //deleted Failed
    l_opInf[133]=  g_opInf[136]; //db upate failed
    l_opInf[137]=  g_opInf[137]; //db insert failed
    l_opInf[138]= g_opInf[138];  //db delete failed

var ops_req_print = [-1,0,1,23,27,33,37,24,25,35,28,38];
var ops_req_search = [-1,0,1,23,27,33,37,24,25,35,28,38];
		
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
	//start after the global form
	// if OP is <=1 OR Higher than available options should always come to this view

	if ( ( curViewDetailState <= opValues["viewReportFrm"] ) || ( curViewDetailState == opValues["submitReportFrm"] ) ) // view records of tank groups
	{
		newPage += displayRptFrm();
	}

	// table for everything ends here
	newPage +="</tbody>\n";
	newPage +="</table>\n";
	newPage +="</div>\n";
	newPage +="</td>              \n";  
	newPage +="</tr>\n";

	newPage +="<script type=\"text/javascript\">\n";
	newPage +="var options1 = {\n";
	newPage +="script:\"/cgi-bin/en/rpt_adm/ajaxlist_tankers.cgi?tnkr_site="+frm_terminal+"&tnkr_carr="+frm_carrier+"&tnkr_cmpt="+frm_maxcmpts+"&\",\n";
	newPage +="varname:\"input\",\n";
	newPage +="minchars:1\n";
	newPage +="};\n";
  
	newPage +="var options2 = {\n";
	newPage +="script:\"/cgi-bin/en/rpt_adm/ajaxlist_customers.cgi?cust_cat="+frm_category+"&supplier="+frm_supplier+"&cust_delvloc="+frm_delvcmpy+"&\",\n";
	newPage +="varname:\"input1\",\n";
	newPage +="minchars:1\n";
	newPage +="};\n";

	newPage +="var as1 = new AutoSuggest('frm_tanker', options1);\n";
	newPage +="var as2 = new AutoSuggest('frm_customer', options2);\n";
	newPage +="</script>\n";

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


function displayRptFrm()
{
	var indent = 1;
	var rptFrm = "";
	var dateStr;
	var aId;

	var filter_type_pos = 3;
	var filter_active_pos = 5;
	var filter_title_pos = 7;
	var filter_var_pos = 8;
	var filter_value_pos = 9;
	var filter_zone_pos = 10;
	var filter_row_pos = 11;
	var filter_col_pos = 12;
	var title_width = 200;

	var ajax_customer = 0;
	var ajax_tanker = 0;

	var filters = new Array();
	var filter_titles = new Array();
	var select_msgs = new Array();
	var index = 0;

	for (i=0; i<filter_jslist.length; i++)
	{
		index = filter_jslist[i][filter_value_pos];
		filter_titles[index] = filter_jslist[i][filter_title_pos];
		if ( filter_jslist[i][filter_type_pos] == 2 )
		{
			select_msgs[index] = ml(t__Enter) + filter_titles[index];
		}
		else
		{
			select_msgs[index] = ml(t__Select) + filter_titles[index];
		}
		// see if use ajax tech for customers droplist
		if ( ( filter_jslist[i][filter_var_pos] == "RPT_FILTER_INDEX_CUSTOMER" )
		  && ( filter_jslist[i][filter_value_pos] == RPT_FILTER_INDEX_CUSTOMER ) )
		{
			if ( filter_jslist[i][filter_type_pos] == 4 )
			{
				ajax_customer = 1;
			}
			else
			{
				ajax_customer = 0;
			}
		}
		// see if use ajax tech for tankers droplist
		if ( ( filter_jslist[i][filter_var_pos] == "RPT_FILTER_INDEX_TANKER" )
		  && ( filter_jslist[i][filter_value_pos] == RPT_FILTER_INDEX_TANKER ) )
		{
			if ( filter_jslist[i][filter_type_pos] == 4 )
			{
				ajax_tanker = 1;
			}
			else
			{
				ajax_tanker = 0;
			}
		}
	}

	// fix for bugzilla 2385
	// set the default value for the following variables
	if ( frm_rpttype == "" || frm_rpttype == "-1"  )
	{
		frm_rpttype = 1;
	}
	if ( frm_timetype == "" || frm_timetype == "-1"  )
	{
		frm_timetype = 3;
	}
	if ( frm_outtype == "" || frm_outtype == "-1"  )
	{
		frm_outtype = 1;
	}
	if ( frm_triptype == "" || frm_triptype == "-1"  )
	{
		frm_triptype = 63;
	}

	filters[RPT_FILTER_INDEX_REPORTTYPE] = makefield(2, filter_titles[RPT_FILTER_INDEX_REPORTTYPE], frm_rpttype, "frm_rpttype", "frm_rpttype", rpttype_jslist, 0, 0, "dataType=\"Require\" onchange=\"\"", select_msgs[RPT_FILTER_INDEX_REPORTTYPE], "*", indent+3, title_width);

	filters[RPT_FILTER_INDEX_TIMETYPE] = makefield(2, filter_titles[RPT_FILTER_INDEX_TIMETYPE], frm_timetype, "frm_timetype", "frm_timetype", timetype_jslist, 0, 0, "dataType=\"Require\" onchange=\"\"", select_msgs[RPT_FILTER_INDEX_TIMETYPE], "*", indent+3, title_width);

	filters[RPT_FILTER_INDEX_OUTTYPE] = makefield(2, filter_titles[RPT_FILTER_INDEX_OUTTYPE], frm_outtype, "frm_outtype", "frm_outtype", outtype_jslist, 0, 0, "dataType=\"Require\" onchange=\"\"", select_msgs[RPT_FILTER_INDEX_OUTTYPE], "*", indent+3, title_width);

	filters[RPT_FILTER_INDEX_TRIPTYPE] = makefield(2, filter_titles[RPT_FILTER_INDEX_TRIPTYPE], frm_triptype, "frm_triptype", "frm_triptype", triptype_jslist, 0, 0, "dataType=\"Require\" onchange=\"updateSqlType(document.edit_rptobj_gui, this, document.edit_rptobj_gui.hid_sqltype );\"", select_msgs[RPT_FILTER_INDEX_TRIPTYPE], "*", indent+3, title_width);

	if ( frm_dt_start == "-1" || frm_dt_start == "" )
	{
		var myfrm_dt_start = new Date();
		myfrm_dt_start.setDate( myfrm_dt_start.getDate() - (defaultDateRange-1) );
		var mystartyear = String( myfrm_dt_start.getFullYear() );
		var mystartmonth = String( (myfrm_dt_start.getMonth()+1) );
		var mystartday = String( myfrm_dt_start.getDate() );

		if ( mystartmonth.length == 1 )
		{
			mystartmonth = "0" + mystartmonth;
		}
		if ( mystartday.length == 1 )
		{
			mystartday = "0" + mystartday;
		}

		//alert(mystartyear+"-"+mystartmonth+"-"+mystartday);
		frm_dt_start = mystartyear + "-" + mystartmonth + "-" + mystartday;
	}

	if ( frm_dt_end == "-1" || frm_dt_end == "" )
	{
		var myfrm_dt_end = new Date();
		myfrm_dt_end.setDate( myfrm_dt_end.getDate() );
		var myendyear = String( myfrm_dt_end.getFullYear() );
		var myendmonth = String( (myfrm_dt_end.getMonth()+1) ) ;
		var myendday = String( myfrm_dt_end.getDate() );

		if ( myendmonth.length == 1 )
		{
			myendmonth = "0" + myendmonth;
		}
		if ( myendday.length == 1 )
		{
			myendday = "0" + myendday;
		}

		frm_dt_end = myendyear + "-" + myendmonth + "-" + myendday;
	}

	if ( frm_hr_start == "-1" || frm_hr_start == "" )
	{
		frm_hr_start = "00";
	}
	if ( frm_hr_end == "-1" || frm_hr_end == "" )
	{
		frm_hr_end = "23";
	}
	if ( frm_mi_start == "-1" || frm_mi_start == "" )
	{
		frm_mi_start = "00";
	}
	if ( frm_mi_end == "-1" || frm_mi_end == "" )
	{
		frm_mi_end = "59";
	}
	
	filters[RPT_FILTER_INDEX_STARTDT] = createDateTimeField( filter_titles[RPT_FILTER_INDEX_STARTDT], "frm_dt_start", frm_dt_start, ml(t__Msg_Valid_St_Date), "document.forms[0].frm_dt_start", "date_anchor1", dateFormat, ml(t__Select_Date), "frm_hr_start", frm_hr_start, "frm_hr_start", ml(t__Select_Start_Hours), "frm_mi_start", frm_mi_start, "frm_mi_start", ml(t__Select_Start_Mints), indent+3, title_width );

	filters[RPT_FILTER_INDEX_ENDDT] = createDateTimeField( filter_titles[RPT_FILTER_INDEX_ENDDT], "frm_dt_end", frm_dt_end, ml(t__Msg_Valid_End_Date), "document.forms[0].frm_dt_end", "date_anchor2", dateFormat, ml(t__Select_Date), "frm_hr_end", frm_hr_end, "frm_hr_end", ml(t__Select_End_Hours), "frm_mi_end", frm_mi_end, "frm_mi_end", ml(t__Select_End_Mints), indent+3, title_width );


if ( isMngrCmpy == "Y" )
{
/*
	if ( ajax_customer == 1 ) //Ajax
	{
		filters[RPT_FILTER_INDEX_SUPPLIER] = makefield(201, filter_titles[RPT_FILTER_INDEX_SUPPLIER], frm_supplier, "frm_supplier", "frm_supplier", supplier_jslist, 0, 0, "onchange=\"checkCustomers(document.edit_rptobj_gui, this);\"", select_msgs[RPT_FILTER_INDEX_SUPPLIER], "&nbsp;", indent+3, title_width);
	}
	else  //normal JS
	{
		filters[RPT_FILTER_INDEX_SUPPLIER] = makefield(201, filter_titles[RPT_FILTER_INDEX_SUPPLIER], frm_supplier, "frm_supplier", "frm_supplier", supplier_jslist, 0, 0, "onchange=\"updateDropdownListBy3Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_delvcmpy, document.edit_rptobj_gui.frm_category, document.edit_rptobj_gui.frm_customer, account_jslist, 2, 3, 4);\"", select_msgs[RPT_FILTER_INDEX_SUPPLIER], "&nbsp;", indent+3, title_width);
	}
*/
	if ( ajax_customer == 1 ) //Ajax
	{
		filters[RPT_FILTER_INDEX_SUPPLIER] = makefield(204, filter_titles[RPT_FILTER_INDEX_SUPPLIER], frm_supplier, "frm_supplier", "frm_supplier", supplier_jslist, 0, 0, "dataType=\"Require\" onchange=\"checkCustomers(document.edit_rptobj_gui, this);\"", select_msgs[RPT_FILTER_INDEX_SUPPLIER], "*", indent+3, title_width);
	}
	else  //normal JS
	{
		filters[RPT_FILTER_INDEX_SUPPLIER] = makefield(204, filter_titles[RPT_FILTER_INDEX_SUPPLIER], frm_supplier, "frm_supplier", "frm_supplier", supplier_jslist, 0, 0, "dataType=\"Require\" onchange=\"updateDropdownListBy3Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_delvcmpy, document.edit_rptobj_gui.frm_category, document.edit_rptobj_gui.frm_customer, account_jslist, 2, 3, 4);\"", select_msgs[RPT_FILTER_INDEX_SUPPLIER], "*", indent+3, title_width);
	}
}
else
{
	if ( ajax_customer == 1 ) //Ajax
	{
		filters[RPT_FILTER_INDEX_SUPPLIER] = makefield(2, filter_titles[RPT_FILTER_INDEX_SUPPLIER], frm_supplier, "frm_supplier", "frm_supplier", supplier_jslist, 0, 0, "dataType=\"Require\" onchange=\"checkCustomers(document.edit_rptobj_gui, this);\"", select_msgs[RPT_FILTER_INDEX_SUPPLIER], "*", indent+3, title_width);
	}
	else  //normal JS
	{
		filters[RPT_FILTER_INDEX_SUPPLIER] = makefield(2, filter_titles[RPT_FILTER_INDEX_SUPPLIER], frm_supplier, "frm_supplier", "frm_supplier", supplier_jslist, 0, 0, "dataType=\"Require\" onchange=\"updateDropdownListBy3Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_delvcmpy, document.edit_rptobj_gui.frm_category, document.edit_rptobj_gui.frm_customer, account_jslist, 2, 3, 4);\"", select_msgs[RPT_FILTER_INDEX_SUPPLIER], "*", indent+3, title_width);
	}
}

	if ( ajax_customer == 1 ) //Ajax
	{
		filters[RPT_FILTER_INDEX_DLVLOC] = makefield(201, filter_titles[RPT_FILTER_INDEX_DLVLOC], frm_delvcmpy, "frm_delvcmpy", "frm_delvcmpy", delvcmpy_jslist, 0, 0, "onchange=\"checkCustomers(document.edit_rptobj_gui, this);\"", select_msgs[RPT_FILTER_INDEX_DLVLOC], "&nbsp;", indent+3, title_width);
	}
	else  //normal JS
	{
		filters[RPT_FILTER_INDEX_DLVLOC] = makefield(201, filter_titles[RPT_FILTER_INDEX_DLVLOC], frm_delvcmpy, "frm_delvcmpy", "frm_delvcmpy", delvcmpy_jslist, 0, 0, "onchange=\"updateDropdownListBy3Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_category, document.edit_rptobj_gui.frm_supplier, document.edit_rptobj_gui.frm_customer, account_jslist, 3, 4, 2);\"", select_msgs[RPT_FILTER_INDEX_DLVLOC], "&nbsp;", indent+3, title_width);
	}

	if ( ajax_customer == 1 ) //Ajax
	{
		filters[RPT_FILTER_INDEX_CATEGORY] = makefield(201, filter_titles[RPT_FILTER_INDEX_CATEGORY], frm_category, "frm_category", "frm_category", category_jslist, 0, 0, "onchange=\"checkCustomers(document.edit_rptobj_gui, this);\"", select_msgs[RPT_FILTER_INDEX_CATEGORY], "&nbsp;", indent+3, title_width);
	}
	else  //normal JS
	{
		filters[RPT_FILTER_INDEX_CATEGORY] = makefield(201, filter_titles[RPT_FILTER_INDEX_CATEGORY], frm_category, "frm_category", "frm_category", category_jslist, 0, 0, "onchange=\"updateDropdownListBy3Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_delvcmpy, document.edit_rptobj_gui.frm_supplier, document.edit_rptobj_gui.frm_customer, account_jslist, 4, 3, 2);\"", select_msgs[RPT_FILTER_INDEX_CATEGORY], "&nbsp;", indent+3, title_width);
	}

	if ( frm_customer == "-1" || frm_customer == "" )
	{
		frm_customer = "";
	}

if ( isMngrCmpy == "Y" )
{
	if ( ajax_customer == 1 ) //Ajax
	{
		filters[RPT_FILTER_INDEX_CUSTOMER] = makeAjaxComboField( filter_titles[RPT_FILTER_INDEX_CUSTOMER], frm_customer, "frm_customer", "frm_customer", "as2.doAjaxRequest();", 20, 20, "onclick=\"updateCustomers(document.edit_rptobj_gui);\"", select_msgs[RPT_FILTER_INDEX_CUSTOMER],  "&nbsp;", indent+3, title_width ); 
	}
	else  //normal JS
	{
		filters[RPT_FILTER_INDEX_CUSTOMER] = makefield(201, filter_titles[RPT_FILTER_INDEX_CUSTOMER], frm_customer, "frm_customer", "frm_customer", account_jslist, 0, 0, "onchange=\";\"", select_msgs[RPT_FILTER_INDEX_CUSTOMER], "&nbsp;", indent+3, title_width);
	}
}
else
{
	if ( ajax_customer == 1 ) //Ajax
	{
//		filters[RPT_FILTER_INDEX_CUSTOMER] = makeAjaxComboField( filter_titles[RPT_FILTER_INDEX_CUSTOMER], frm_customer, "frm_customer", "frm_customer", "as2.doAjaxRequest();", 20, 20, "dataType=\"Require\" onclick=\"updateCustomers(document.edit_rptobj_gui);\"", select_msgs[RPT_FILTER_INDEX_CUSTOMER],  "*", indent+3, title_width ); 
		filters[RPT_FILTER_INDEX_CUSTOMER] = makeAjaxComboField( filter_titles[RPT_FILTER_INDEX_CUSTOMER], frm_customer, "frm_customer", "frm_customer", "as2.doAjaxRequest();", 20, 20, "onclick=\"updateCustomers(document.edit_rptobj_gui);\"", select_msgs[RPT_FILTER_INDEX_CUSTOMER],  "&nbsp;", indent+3, title_width ); 
	}
	else  //normal JS
	{
//		filters[RPT_FILTER_INDEX_CUSTOMER] = makefield(2, filter_titles[RPT_FILTER_INDEX_CUSTOMER], frm_customer, "frm_customer", "frm_customer", account_jslist, 0, 0, "dataType=\"Require\" onchange=\";\"", select_msgs[RPT_FILTER_INDEX_CUSTOMER], "*", indent+3, title_width);
		filters[RPT_FILTER_INDEX_CUSTOMER] = makefield(201, filter_titles[RPT_FILTER_INDEX_CUSTOMER], frm_customer, "frm_customer", "frm_customer", account_jslist, 0, 0, "onchange=\";\"", select_msgs[RPT_FILTER_INDEX_CUSTOMER], "&nbsp;", indent+3, title_width);
	}
}




if ( isMngrCmpy == "Y" )
{
	filters[RPT_FILTER_INDEX_DRAWER] = makefield(201, filter_titles[RPT_FILTER_INDEX_DRAWER], frm_drawer, "frm_drawer", "frm_drawer", drawer_jslist, 0, 0, "onchange=\"updateDropdownList(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_product, product_jslist, 2);\"", select_msgs[RPT_FILTER_INDEX_DRAWER], "&nbsp;", indent+3, title_width);

	filters[RPT_FILTER_INDEX_PRODUCT] = makefield(201, filter_titles[RPT_FILTER_INDEX_PRODUCT], frm_product, "frm_product", "frm_product", product_jslist, 0, 0, "onchange=\"\"", select_msgs[RPT_FILTER_INDEX_PRODUCT], "&nbsp;", indent+3, title_width);
}
else
{
	filters[RPT_FILTER_INDEX_DRAWER] = makefield(2, filter_titles[RPT_FILTER_INDEX_DRAWER], frm_drawer, "frm_drawer", "frm_drawer", drawer_jslist, 0, 0, "dataType=\"Require\" onchange=\"updateDropdownList(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_product, product_jslist, 2);\"", select_msgs[RPT_FILTER_INDEX_DRAWER], "*", indent+3, title_width);

//	filters[RPT_FILTER_INDEX_PRODUCT] = makefield(2, filter_titles[RPT_FILTER_INDEX_PRODUCT], frm_product, "frm_product", "frm_product", product_jslist, 0, 0, "dataType=\"Require\" onchange=\"\"", select_msgs[RPT_FILTER_INDEX_PRODUCT], "*", indent+3, title_width);
	filters[RPT_FILTER_INDEX_PRODUCT] = makefield(201, filter_titles[RPT_FILTER_INDEX_PRODUCT], frm_product, "frm_product", "frm_product", product_jslist, 0, 0, "onchange=\"\"", select_msgs[RPT_FILTER_INDEX_PRODUCT], "&nbsp;", indent+3, title_width);
}


	filters[RPT_FILTER_INDEX_OPERATOR] = makefield(201, filter_titles[RPT_FILTER_INDEX_OPERATOR], frm_operator, "frm_operator", "frm_operator", operator_jslist, 0, 0, "onchange=\"\"", select_msgs[RPT_FILTER_INDEX_OPERATOR], "&nbsp;", indent+3, title_width);

	filters[RPT_FILTER_INDEX_ORDER_SOURCE] = makefield(201, filter_titles[RPT_FILTER_INDEX_ORDER_SOURCE], frm_ordsource, "frm_ordsource", "frm_ordsource", ordsource_jslist, 0, 0, "onchange=\"\"", select_msgs[RPT_FILTER_INDEX_ORDER_SOURCE], "&nbsp;", indent+3, title_width);

	filters[RPT_FILTER_INDEX_LOADER] = makefield(201, filter_titles[RPT_FILTER_INDEX_LOADER], frm_loader, "frm_loader", "frm_loader", loader_jslist, 0, 0, "onchange=\"\"", select_msgs[RPT_FILTER_INDEX_LOADER], "&nbsp;", indent+3, title_width);

	if ( ajax_tanker == 1 ) //Ajax
	{
		filters[RPT_FILTER_INDEX_MAXCMPT] = makefield(201, filter_titles[RPT_FILTER_INDEX_MAXCMPT], frm_maxcmpts, "frm_maxcmpts", "frm_maxcmpts", maxcmpts_jslist, 0, 0, "onchange=\"checkTankers(document.edit_rptobj_gui, this);\"", select_msgs[RPT_FILTER_INDEX_MAXCMPT], "&nbsp;", indent+3, title_width);
	}
	else  //normal JS
	{
		filters[RPT_FILTER_INDEX_MAXCMPT] = makefield(201, filter_titles[RPT_FILTER_INDEX_MAXCMPT], frm_maxcmpts, "frm_maxcmpts", "frm_maxcmpts", maxcmpts_jslist, 0, 0, "onchange=\"updateDropdownListBy3Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_carrier, document.edit_rptobj_gui.frm_tanker, tanker_jslist, 5, 2, 4);\"", select_msgs[RPT_FILTER_INDEX_MAXCMPT], "&nbsp;", indent+3, title_width);
	}

	if ( ajax_tanker == 1 ) //Ajax
	{
		filters[RPT_FILTER_INDEX_CARRIER] = makefield(201, filter_titles[RPT_FILTER_INDEX_CARRIER], frm_carrier, "frm_carrier", "frm_carrier", carrier_jslist, 0, 0, "onchange=\"checkTankers(document.edit_rptobj_gui, this);\"", select_msgs[RPT_FILTER_INDEX_CARRIER], "&nbsp;", indent+3, title_width);
	}
	else  //normal JS
	{
		filters[RPT_FILTER_INDEX_CARRIER] = makefield(201, filter_titles[RPT_FILTER_INDEX_CARRIER], frm_carrier, "frm_carrier", "frm_carrier", carrier_jslist, 0, 0, "onchange=\"updateDropdownListBy3Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_maxcmpts, document.edit_rptobj_gui.frm_tanker, tanker_jslist, 4, 2, 5);\"", select_msgs[RPT_FILTER_INDEX_CARRIER], "&nbsp;", indent+3, title_width);
	}

	if ( frm_tanker == "-1" || frm_tanker == "" )
	{
		frm_tanker = "";
	}
	if ( ajax_tanker == 1 ) //Ajax
	{
		filters[RPT_FILTER_INDEX_TANKER] = makeAjaxComboField( filter_titles[RPT_FILTER_INDEX_TANKER], frm_tanker, "frm_tanker", "frm_tanker", "as1.doAjaxRequest();", 20, 20, "onclick=\"updateTankers(document.edit_rptobj_gui);\"", select_msgs[RPT_FILTER_INDEX_TANKER],  "&nbsp;", indent+3, title_width ); 
	}
	else  //normal JS
	{
		filters[RPT_FILTER_INDEX_TANKER] = makefield(201, filter_titles[RPT_FILTER_INDEX_TANKER], frm_tanker, "frm_tanker", "frm_tanker", tanker_jslist, 0, 0, "onchange=\"\"", select_msgs[RPT_FILTER_INDEX_TANKER], "&nbsp;", indent+3, title_width);
	}



	if ( ajax_tanker == 1 ) //Ajax
	{
		filters[RPT_FILTER_INDEX_DEPOT] = makefield(201, filter_titles[RPT_FILTER_INDEX_DEPOT], frm_terminal, "frm_terminal", "frm_terminal", terminal_jslist, 0, 0, "onchange=\"updateDropdownListBy3Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_base, document.edit_rptobj_gui.frm_tank, mainbasetank_jslist, 2, 4, 3);updateDropdownListBy3Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_additive, document.edit_rptobj_gui.frm_adtvtank, adtvbasetank_jslist, 2, 4, 3);updateDropdownListBy5Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bayarm, document.edit_rptobj_gui.frm_tank, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_base, document.edit_rptobj_gui.frm_meter, meter_jslist, 5, 3, 4, 2, 6);updateDropdownListBy6Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_bayarm, document.edit_rptobj_gui.frm_meter, document.edit_rptobj_gui.frm_adtvtank, document.edit_rptobj_gui.frm_additive, document.edit_rptobj_gui.frm_injector, injector_jslist, 6, 2, 3, 4, 5, 7);checkTankers(document.edit_rptobj_gui, this);\"", select_msgs[RPT_FILTER_INDEX_DEPOT], "&nbsp;", indent+3, title_width);
	}
	else  //normal JS
	{
		filters[RPT_FILTER_INDEX_DEPOT] = makefield(201, filter_titles[RPT_FILTER_INDEX_DEPOT], frm_terminal, "frm_terminal", "frm_terminal", terminal_jslist, 0, 0, "onchange=\"updateDropdownListBy3Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_carrier, document.edit_rptobj_gui.frm_maxcmpts, document.edit_rptobj_gui.frm_tanker, tanker_jslist, 2, 4, 5);updateDropdownListBy3Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_base, document.edit_rptobj_gui.frm_tank, mainbasetank_jslist, 2, 4, 3);updateDropdownListBy3Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_additive, document.edit_rptobj_gui.frm_adtvtank, adtvbasetank_jslist, 2, 4, 3);updateDropdownListBy5Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bayarm, document.edit_rptobj_gui.frm_tank, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_base, document.edit_rptobj_gui.frm_meter, meter_jslist, 5, 3, 4, 2, 6);updateDropdownListBy6Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_bayarm, document.edit_rptobj_gui.frm_meter, document.edit_rptobj_gui.frm_adtvtank, document.edit_rptobj_gui.frm_additive, document.edit_rptobj_gui.frm_injector, injector_jslist, 6, 2, 3, 4, 5, 7);\"", select_msgs[RPT_FILTER_INDEX_DEPOT], "&nbsp;", indent+3, title_width);
	}

	filters[RPT_FILTER_INDEX_BAY] = makefield(201, filter_titles[RPT_FILTER_INDEX_BAY], frm_bay, "frm_bay", "frm_bay", bay_jslist, 0, 0, "onchange=\"updateDropdownList(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bayarm, bayarm_jslist, 2);updateDropdownListBy5Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bayarm, document.edit_rptobj_gui.frm_tank, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_base, document.edit_rptobj_gui.frm_meter, meter_jslist, 2, 3, 4, 5, 6);updateDropdownListBy3Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_base, document.edit_rptobj_gui.frm_tank, mainbasetank_jslist, 4, 2, 3);updateDropdownListBy3Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_additive, document.edit_rptobj_gui.frm_adtvtank, adtvbasetank_jslist, 4, 2, 3);updateDropdownListBy6Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_bayarm, document.edit_rptobj_gui.frm_meter, document.edit_rptobj_gui.frm_adtvtank, document.edit_rptobj_gui.frm_additive, document.edit_rptobj_gui.frm_injector, injector_jslist, 2, 6, 3, 4, 5, 7);\"", select_msgs[RPT_FILTER_INDEX_BAY], "&nbsp;", indent+3, title_width);
/*
updateDropdownListBy5Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bayarm, document.edit_rptobj_gui.frm_tank, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_base, document.edit_rptobj_gui.frm_meter, meter_jslist, 2, 3, 4, 5, 6);

updateDropdownListBy4Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_tank, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_base, document.edit_rptobj_gui.frm_meter, meter_jslist, 2, 4, 5, 6);
*/
	filters[RPT_FILTER_INDEX_METER] = makefield(201, filter_titles[RPT_FILTER_INDEX_METER], frm_meter, "frm_meter", "frm_meter", meter_jslist, 0, 0, "onchange=\"updateDropdownListBy6Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_bayarm, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_adtvtank, document.edit_rptobj_gui.frm_additive, document.edit_rptobj_gui.frm_injector, injector_jslist, 4, 2, 3, 6, 5, 7);\"", select_msgs[RPT_FILTER_INDEX_METER], "&nbsp;", indent+3, title_width);

	filters[RPT_FILTER_INDEX_BAYARM] = makefield(201, filter_titles[RPT_FILTER_INDEX_BAYARM], frm_bayarm, "frm_bayarm", "frm_bayarm", bayarm_jslist, 0, 0, "onchange=\"updateDropdownListBy5Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_tank, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_base, document.edit_rptobj_gui.frm_meter, meter_jslist, 3, 2, 4, 5, 6);updateDropdownListBy6Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_meter, document.edit_rptobj_gui.frm_adtvtank, document.edit_rptobj_gui.frm_additive, document.edit_rptobj_gui.frm_injector, injector_jslist, 3, 2, 6, 4, 5, 7);\"", select_msgs[RPT_FILTER_INDEX_BAYARM], "&nbsp;", indent+3, title_width);

	filters[RPT_FILTER_INDEX_TANK] = makefield(201, filter_titles[RPT_FILTER_INDEX_TANK], frm_tank, "frm_tank", "frm_tank", mainbasetank_jslist, 0, 0, "onchange=\"updateDropdownListBy5Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bayarm, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_base, document.edit_rptobj_gui.frm_meter, meter_jslist, 4, 3, 2, 5, 6);\"", select_msgs[RPT_FILTER_INDEX_TANK], "&nbsp;", indent+3, title_width);

	filters[RPT_FILTER_INDEX_BASEPROD] = makefield(201, filter_titles[RPT_FILTER_INDEX_BASEPROD], frm_base, "frm_base", "frm_base", basemain_jslist, 0, 0, "onchange=\"updateDropdownListBy3Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_tank, mainbasetank_jslist, 3, 2, 4);updateDropdownListBy5Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bayarm, document.edit_rptobj_gui.frm_tank, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_meter, meter_jslist, 6, 3, 4, 5, 2);\"", select_msgs[RPT_FILTER_INDEX_BASEPROD], "&nbsp;", indent+3, title_width);

	filters[RPT_FILTER_INDEX_INJECTOR] = makefield(201, filter_titles[RPT_FILTER_INDEX_INJECTOR], frm_injector, "frm_injector", "frm_injector", injector_jslist, 0, 0, "onchange=\"\"", select_msgs[RPT_FILTER_INDEX_INJECTOR], "&nbsp;", indent+3, title_width);

	filters[RPT_FILTER_INDEX_ADDITIVE] = makefield(201, filter_titles[RPT_FILTER_INDEX_ADDITIVE], frm_additive, "frm_additive", "frm_additive", baseadtv_jslist, 0, 0, "onchange=\"updateDropdownListBy3Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_adtvtank, adtvbasetank_jslist, 3, 2, 4);updateDropdownListBy6Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_bayarm, document.edit_rptobj_gui.frm_meter, document.edit_rptobj_gui.frm_adtvtank, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_injector, injector_jslist, 7, 2, 3, 4, 5, 6);\"", select_msgs[RPT_FILTER_INDEX_ADDITIVE], "&nbsp;", indent+3, title_width);

	filters[RPT_FILTER_INDEX_ADTVTANK] = makefield(201, filter_titles[RPT_FILTER_INDEX_ADTVTANK], frm_adtvtank, "frm_adtvtank", "frm_adtvtank", adtvbasetank_jslist, 0, 0, "onchange=\"updateDropdownListBy6Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_bay, document.edit_rptobj_gui.frm_bayarm, document.edit_rptobj_gui.frm_meter, document.edit_rptobj_gui.frm_terminal, document.edit_rptobj_gui.frm_additive, document.edit_rptobj_gui.frm_injector, injector_jslist, 5, 2, 3, 4, 6, 7);\"", select_msgs[RPT_FILTER_INDEX_ADTVTANK], "&nbsp;", indent+3, title_width);


	if (frm_omega_trip == '-1' || frm_omega_trip == '')
	{
		frm_omega_trip = "";
	}
	filters[RPT_FILTER_INDEX_TRIP] = makefield(1, filter_titles[RPT_FILTER_INDEX_TRIP], frm_omega_trip, "frm_omega_trip", "frm_omega_trip", "", 20, 10, "onchange=\"updateDisabledMode(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_omega_trip_from);updateDisabledMode(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_omega_trip_to);\"", "", "&nbsp;", indent+3, title_width);

	if (frm_omega_trip_from == '-1' || frm_omega_trip_from == '')
	{
		frm_omega_trip_from = "";
	}
	filters[RPT_FILTER_INDEX_TRIPFROM] = makefield(1, filter_titles[RPT_FILTER_INDEX_TRIPFROM], frm_omega_trip_from, "frm_omega_trip_from", "frm_omega_trip_from", "", 20, 10, "onchange=\"updateDisabledModeBy2Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_omega_trip_to, document.edit_rptobj_gui.frm_omega_trip);\"", "", "&nbsp;", indent+3, title_width);

	if (frm_omega_trip_to == '-1' || frm_omega_trip_to == '')
	{
		frm_omega_trip_to = "";
	}
	filters[RPT_FILTER_INDEX_TRIPTO] = makefield(1, filter_titles[RPT_FILTER_INDEX_TRIPTO], frm_omega_trip_to, "frm_omega_trip_to", "frm_omega_trip_to", "", 20, 10, "onchange=\"updateDisabledModeBy2Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_omega_trip_from, document.edit_rptobj_gui.frm_omega_trip);\"", "", "&nbsp;", indent+3, title_width);

	if (frm_omega_order == '-1' || frm_omega_order == '')
	{
		frm_omega_order = "";
	}
	filters[RPT_FILTER_INDEX_ORDER] = makefield(1, filter_titles[RPT_FILTER_INDEX_ORDER], frm_omega_order, "frm_omega_order", "frm_omega_order", "", 20, 10, "onchange=\"updateDisabledMode(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_omega_order_from);updateDisabledMode(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_omega_order_to);\"", "", "&nbsp;", indent+3, title_width);

	if (frm_omega_order_from == '-1' || frm_omega_order_from == '')
	{
		frm_omega_order_from = "";
	}
	filters[RPT_FILTER_INDEX_ORDERFROM] = makefield(1, filter_titles[RPT_FILTER_INDEX_ORDERFROM], frm_omega_order_from, "frm_omega_order_from", "frm_omega_order_from", "", 20, 10, "onchange=\"updateDisabledModeBy2Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_omega_order_to, document.edit_rptobj_gui.frm_omega_order);\"", "", "&nbsp;", indent+3, title_width);

	if (frm_omega_order_to == '-1' || frm_omega_order_to == '')
	{
		frm_omega_order_to = "";
	}
	filters[RPT_FILTER_INDEX_ORDERTO] = makefield(1, filter_titles[RPT_FILTER_INDEX_ORDERTO], frm_omega_order_to, "frm_omega_order_to", "frm_omega_order_to", "", 20, 10, "onchange=\"updateDisabledModeBy2Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_omega_order_from, document.edit_rptobj_gui.frm_omega_order);\"", "", "&nbsp;", indent+3, title_width);

	if (frm_erp_order == '-1' || frm_erp_order == '')
	{
		frm_erp_order = "";
	}
	filters[RPT_FILTER_INDEX_ERPNO] = makefield(1, filter_titles[RPT_FILTER_INDEX_ERPNO], frm_erp_order, "frm_erp_order", "frm_erp_order", "", 20, 10, "onchange=\"updateDisabledMode(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_erp_order_from);updateDisabledMode(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_erp_order_to);\"", "", "&nbsp;", indent+3, title_width);

	if (frm_erp_order_from == '-1' || frm_erp_order_from == '')
	{
		frm_erp_order_from = "";
	}
	filters[RPT_FILTER_INDEX_ERPNOFROM] = makefield(1, filter_titles[RPT_FILTER_INDEX_ERPNOFROM],frm_erp_order_from , "frm_erp_order_from", "frm_erp_order_from", "", 20, 10, "onchange=\"updateDisabledModeBy2Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_erp_order_to, document.edit_rptobj_gui.frm_erp_order);\"", "", "&nbsp;", indent+3, title_width);

	if (frm_erp_order_to == '-1' || frm_erp_order_to == '')
	{
		frm_erp_order_to = "";
	}
	filters[RPT_FILTER_INDEX_ERPNOTO] = makefield(1, filter_titles[RPT_FILTER_INDEX_ERPNOTO], frm_erp_order_to, "frm_erp_order_to", "frm_erp_order_to", "", 20, 10, "onchange=\"updateDisabledModeBy2Parents(document.edit_rptobj_gui, this, document.edit_rptobj_gui.frm_erp_order_from, document.edit_rptobj_gui.frm_erp_order);\"", "", "&nbsp;", indent+3, title_width);


	if (frm_opnamb == '-1' || frm_opnamb == '')
	{
		frm_opnamb = "";
	}
	filters[RPT_FILTER_INDEX_OPNAMB] = makefield(1, filter_titles[RPT_FILTER_INDEX_OPNAMB], frm_opnamb, "frm_opnamb", "frm_opnamb", "", 20, 10, "", "", "&nbsp;", indent+3, title_width);

	if (frm_clsamb == '-1' || frm_clsamb == '')
	{
		frm_clsamb = "";
	}
	filters[RPT_FILTER_INDEX_CLSAMB] = makefield(1, filter_titles[RPT_FILTER_INDEX_CLSAMB], frm_clsamb, "frm_clsamb", "frm_clsamb", "", 20, 10, "", "", "&nbsp;", indent+3, title_width);

	if (frm_loadtype == '-1' || frm_loadtype == '')
	{
		frm_loadtype = "";
	}
	filters[RPT_FILTER_INDEX_LOADTYPE] = makefield(1, filter_titles[RPT_FILTER_INDEX_LOADTYPE], frm_loadtype, "frm_loadtype", "frm_loadtype", "", 20, 10, "", "", "&nbsp;", indent+3, title_width);

	// Load/Blend Tolerance
	filters[RPT_FILTER_INDEX_LDTOL_FLAG] = makefield(201, filter_titles[RPT_FILTER_INDEX_LDTOL_FLAG], frm_ld_tol_flag, "frm_ld_tol_flag", "frm_ld_tol_flag", tolerance_flag_droplist, 0, 0, "onchange=\"\"", select_msgs[RPT_FILTER_INDEX_LDTOL_FLAG], "&nbsp;", indent+3, title_width);
	
	filters[RPT_FILTER_INDEX_LDTOL_ERROR] = makefield(201, filter_titles[RPT_FILTER_INDEX_LDTOL_ERROR], frm_ld_tol_err, "frm_ld_tol_err", "frm_ld_tol_err", tolerance_error_droplist, 0, 0, "onchange=\"\"", select_msgs[RPT_FILTER_INDEX_LDTOL_ERROR], "&nbsp;", indent+3, title_width);
	
	filters[RPT_FILTER_INDEX_BLTOL_FLAG] = makefield(201, filter_titles[RPT_FILTER_INDEX_BLTOL_FLAG], frm_bl_tol_flag, "frm_bl_tol_flag", "frm_bl_tol_flag", tolerance_flag_droplist, 0, 0, "onchange=\"\"", select_msgs[RPT_FILTER_INDEX_BLTOL_FLAG], "&nbsp;", indent+3, title_width);
	
	filters[RPT_FILTER_INDEX_BLTOL_ERROR] = makefield(201, filter_titles[RPT_FILTER_INDEX_BLTOL_ERROR], frm_bl_tol_err, "frm_bl_tol_err", "frm_bl_tol_err", tolerance_error_droplist, 0, 0, "onchange=\"\"", select_msgs[RPT_FILTER_INDEX_BLTOL_ERROR], "&nbsp;", indent+3, title_width);
	
	filters[RPT_FILTER_INDEX_BASE_CLASS] = makefield(201, filter_titles[RPT_FILTER_INDEX_BASE_CLASS], frm_base_class, "frm_base_class", "frm_base_class", base_class_type_droplist, 0, 0, "onchange=\"\"", select_msgs[RPT_FILTER_INDEX_BASE_CLASS], "&nbsp;", indent+3, title_width);

	
	rptFrm += makespace("\t", indent) + "<tr>\n";
	rptFrm += makespace("\t", indent) + "<td>\n";

	rptFrm += makespace("\t", indent+1) + "<form name=\"edit_rptobj_gui\" method=\"get\" id=\"edit_rptobj_gui\" action=\"rptobj_gui.cgi\" >\n";

	rptFrm += makespace("\t", indent+1) + " <ul id=\"tabmenu\">\n";
	rptFrm += makespace("\t", indent+1) + "<li>" + ml(t__Edit__Rpt__Details) + "</li>\n";
	rptFrm += makespace("\t", indent+1) + "</ul>\n";
	rptFrm += makespace("\t", indent+1) + "<div class=\"adminform\">\n";

	rptFrm += makespace("\t", indent+2) + "<table width=\"100%\">\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td class=\"infotext\">\n";
	rptFrm += makespace("\t", indent+3) + "<br>\n";
	rptFrm += makespace("\t", indent+3) + ml(t__FrmComplt) + "\n";

	// hidden area for passing values between web pages
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["submitReportFrm"] + "\">\n";
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"hid_sqltype\" id=\"hid_sqltype\" value=\"" + hid_sqltype + "\">\n";

	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td width=\"100%\">\n";

	rptFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";

	var last_row=0;
	var curr_row=0;
	var last_zone=0;
	var curr_zone=0;
	var last_col=0;
	var curr_col=0;
	rptFrm += makespace("\t", indent+3) + "<tr>\n";
	for (i=0; i<filter_jslist.length; i++)
	{
		index = filter_jslist[i][filter_value_pos];
		if ( ( i < filter_jslist.length ) && ( filter_jslist[i][filter_active_pos] > 0 ) )
		{
			if ( typeof filters[i] != "undefined" )
			{
				curr_row = filter_jslist[i][filter_row_pos];
				curr_zone = filter_jslist[i][filter_zone_pos];
				if ( (curr_row) != (last_row) )
				{
					rptFrm += makespace("\t", indent+3) + "</tr>\n";
					if ( (curr_zone) != (last_zone) )
					{
						rptFrm += makespace("\t", indent+3) + "<tr>\n";
						rptFrm += makespace("\t", indent+3) + "<td colspan=9>\n";
						rptFrm += makespace("\t", indent+3) + "<hr>\n";
						rptFrm += makespace("\t", indent+3) + "</td>\n";
						rptFrm += makespace("\t", indent+3) + "</tr>\n";
					}
					rptFrm += makespace("\t", indent+3) + "<tr>\n";
				}
				rptFrm += filters[index];
				last_row = curr_row;
				last_zone = curr_zone;
			}
		}
/*
		else
		{
				rptFrm += "<td colspan=\"3\">&nbsp;</td>";
		}
*/
	}

	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	rptFrm += makespace("\t", indent+3) + "<tr>\n";
	rptFrm += makespace("\t", indent+3) + "<td colspan=\"9\">\n";
	rptFrm += makespace("\t", indent+4) + "<hr>\n";
	rptFrm += makespace("\t", indent+3) + "</td>\n";
	rptFrm += makespace("\t", indent+3) + "</tr>\n";

	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	// fix for bugzilla 2385
	if ( frm_fontsize == "" || frm_fontsize == "-1"  )
	{
		frm_fontsize = 10;
	}
	if ( frm_direction == "" || frm_direction == "-1"  )
	{
		frm_direction = 2;
	}

	rptFrm += makefield(2, ml(t__Rpt_Font_Size), frm_fontsize, "frm_fontsize", "frm_fontsize", font_jslist, 0, 0, "onchange=\"\"", (ml(t__Select) + ml(t__Rpt_Font_Size) ), "&nbsp;", indent+3, title_width);

	rptFrm += makefield(2, ml(t__Rpt_Header_Dir), frm_direction, "frm_direction", "frm_direction", direction_jslist, 0, 0, "onchange=\"\"", (ml(t__Select) + ml(t__Rpt_Header_Dir) ), "&nbsp;", indent+3, title_width);

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

//	rptFrm += frmButtRow_HTML(ml(t__View_Report), 1);

	rptFrm += makespace("\t", indent+3) + "<script>\n";
	rptFrm += makespace("\t", indent+4) + "var testpopup = new PopupWindow();\n";
	rptFrm += makespace("\t", indent+4) + "testpopup.setSize(800,600);\n";
	rptFrm += makespace("\t", indent+4) + "testpopup.setWindowProperties('toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised,dependent,titlebar=no');\n";
	rptFrm += makespace("\t", indent+4) + "testpopup.autoHide();\n";
	rptFrm += makespace("\t", indent+3) + "</script>\n";
	rptFrm += makespace("\t", indent+3) + "<tr>\n";
	rptFrm += makespace("\t", indent+3) + "<td align=\"center\" class=\"infotext\" width=\"100%\">\n";


	var act_str1="";
	var act_str2="";
	if ( ajax_customer == 1 ) //Ajax
	{
		act_str1 += "setCustAcntCd(document.edit_rptobj_gui);";
		act_str2 += "setCustAcntNm(document.edit_rptobj_gui);";
	}
	if ( ajax_tanker == 1 ) //Ajax
	{
		act_str1 += "setTnkrCd(document.edit_rptobj_gui);";
		act_str2 += "setTnkrNm(document.edit_rptobj_gui);";
	}

	rptFrm += makespace("\t", indent+4) + "<input type=\"button\" value=\"" + ml(t__View_Report) + "\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" onClick=\"" + act_str1 + "ActionDeterminator(testpopup, 'anchor1', 'rptobj_popup.cgi', document.forms[0]);" + act_str2 + "return false;\" NAME=\"anchor1\" ID=\"anchor1\"/>";

/*
	if ( ajax_customer == 1 ) //Ajax
	{
		rptFrm += makespace("\t", indent+4) + "<input type=\"button\" value=\"" + ml(t__View_Report) + "\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" onClick=\"setCustAcntCd(document.edit_rptobj_gui);ActionDeterminator(testpopup, 'anchor1', 'rptobj_popup.cgi', document.forms[0]);setCustAcntNm(document.edit_rptobj_gui);return false;\" NAME=\"anchor1\" ID=\"anchor1\"/>";
	}
	else
	{
		rptFrm += makespace("\t", indent+4) + "<input type=\"button\" value=\"" + ml(t__View_Report) + "\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" onClick=\"ActionDeterminator(testpopup, 'anchor1', 'rptobj_popup.cgi', document.forms[0]);return false;\" NAME=\"anchor1\" ID=\"anchor1\"/>";
	}
*/
	rptFrm += makespace("\t", indent+4) + "&nbsp;\n";
	rptFrm += makespace("\t", indent+4) + "<input type=\"reset\" value=\"" + ml(t__Reset) + "\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
	rptFrm += makespace("\t", indent+3) + "</td>\n";
	rptFrm += makespace("\t", indent+3) + "</tr>\n";

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


function assArray_keys(inputArr)
{
	var keys = new Array();
	for (var i in inputArr) 
	{
		if (inputArr[i] != null) 
		{
			keys.push(i);
		}
	}

	return keys;
}


function obs(data)
{
	return data;
}


function op_field (attr)
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"op\" id=\"op\" value=\""+attr+"\" type=\"hidden\">\n";

	return fieldHTML;
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

	pageHeading +=ml(t__TRIP_REPORT);

	return pageHeading;   
}


function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	pageTitle +=ml(t__TRIP_REPORT);    

	return pageTitle;
}


//Set tanker to null if carrier has changed 
function checkCarrier()
{
	var currElement = getElemRefs('tanker');
	document.addNew.tanker.value = ''; 
	var myCarrier = document.addNew.carr.value;
	if((myCarrier!=""))
	{
		currElement.disabled=false;
		document.addNew.tanker.focus();
		myQStr = AlterUrlString((options1.script),"carrier",document.addNew.carr.value);
		//alert(myQStr);
		options1.script = myQStr;
	}
	else
	{
		currElement.disabled=true;
	}
}


function numberDroplist( numbers, selectedValue, indent )
{
	var i;
	var str="";

	for (i in numbers )
	{
		if ( numbers[i][0] == selectedValue )
		{
			str += makespace("\t", indent) + " <option value=\""+numbers[i][0]+"\" selected>" + numbers[i][0] + "</option>\n";
		}
		else
		{
			str += makespace("\t", indent) + " <option value=\""+numbers[i][0]+"\">" + numbers[i][0] + "</option>\n";
		}
	}

	return str;
}


function createDateTimeField(title, dateName, dateValue, dateMsgMain, dateFormId, dateAnchor, dateFormat, dateMsgSub, hourName, hourValue, hourID, hourMsg, minuteName, minuteValue, minuteID, minuteMsg, indent, width)
{
	var dtField = "";

	dtField += makespace("\t", indent) + "<td colspan=\"9\">\n";
	dtField += makespace("\t", indent+1) + "<table>\n";
	dtField += makespace("\t", indent+1) + "<tr>\n";

	// start DATE field
	dtField += makespace("\t", indent+1) + "<td class=\"infotextheading\" width=\""+ width +"\">\n";
	dtField += makespace("\t", indent+2) + title + "\n";
	dtField += makespace("\t", indent+1) + "</td>\n";
	dtField += makespace("\t", indent+1) + "<td width=\"5\" align=\"center\" class=\"infotext\">\n";
	dtField += makespace("\t", indent+2) + "<span class=\"mandatory\">*</span>\n";
	dtField += makespace("\t", indent+1) + "</td>\n";

	dtField += makespace("\t", indent+1) + "<td>\n";
	dtField += makespace("\t", indent+2) + "<input type=\"text\" name=\"" + dateName + "\" value=\"" + dateValue + "\" dataType=\"Require\" msg=\"" + dateMsgMain + "\" readonly/>\n";
	dtField += makespace("\t", indent+2) + dateURL_HTML( dateFormId, dateAnchor, dateFormat, dateMsgSub ) + "\n";
	dtField += makespace("\t", indent+1) + "</td>\n";
	// end DATE field

	//start TIME field
	dtField += makespace("\t", indent+1) + "<td>\n";
	dtField += makespace("\t", indent+2) + "<select name=\"" + hourName + "\" id =\"" + hourID + "\" class=\"smallselect\" msg=\"" + hourMsg +"\">\n";
	if( hourValue == '-1' || hourValue == '')
	{
		dtField += numberDroplist( hour_jslist, "00", indent+2 ) + "\n";
	}
	else
	{
		dtField += numberDroplist( hour_jslist, hourValue, indent+2 ) + "\n";
	}
	dtField += makespace("\t", indent+2) + "</select>\n";
	dtField += makespace("\t", indent+1) + "</td>\n";

	dtField += makespace("\t", indent+1) + "<td>\n";
	dtField += makespace("\t", indent+1) + ": &nbsp;\n";
	dtField += makespace("\t", indent+2) + "<select name=\"" + minuteName + "\" id =\"" + minuteID + "\" class=\"smallselect\" msg=\"" + minuteMsg +"\">\n";

	if( minuteValue == '-1' || minuteValue == '')
	{
		dtField += numberDroplist( minute_jslist, "00", indent+2 ) + "\n";
	}
	else
	{
		dtField += numberDroplist( minute_jslist, minuteValue, indent+2 ) + "\n";
	}
	dtField += makespace("\t", indent+2) + "</select>\n";
	dtField += makespace("\t", indent+1) + "</td>\n";
	//end TIME field

	dtField += makespace("\t", indent+1) + "</tr>\n";
	dtField += makespace("\t", indent+1) + "</table>\n";
	dtField += makespace("\t", indent) + "</td>\n";

	return dtField;
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
	var def_option;

	def_option = childOption.options[childOption.length-1];

	clearDropdownList(childOption);
	//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	if ( parentOption === undefined )
	{
		parent_select = "";
	}
	else
	{
		parent_select = parentOption.value;
	}
//	parent_select = parentOption.value;

//	alert(" parent_select1="+parent_select);
	for (i in sourceList )
	{
		if ( i == 0 )
		{
			continue;
		}
		child_select = sourceList[i][compareIndex];

/*
		if ( ((parent_select == "") || (parent_select == "-1") || (child_select == parent_select))
		)
*/
		if ( ((parent_select == "") || (parent_select == "-1") || (child_select.indexOf(parent_select) != -1 ))
			)
		{
			new_option = new Option(sourceList[i][1], sourceList[i][0], false, false);
			childOption.options[childOption.length] = new_option;
			childOption.selectedIndex = 0;
		}
	}

	new_option = new Option( ml(t__Any_ALL), '-1', false, false );
	childOption.options[childOption.length] = def_option; //new_option;
//	childOption.selectedIndex = 0;
	childOption.selectedIndex = childOption.length-1;

}


function updateDropdownListBy2Parents(myformObj, parentOption1, parentOption2, childOption, sourceList, compareIndex1, compareIndex2) 
{
	var new_options;
	var parent_select1;
	var parent_select2;
	var child_select1;
	var child_select2;
	var def_option;

	def_option = childOption.options[childOption.length-1];

	clearDropdownList(childOption);
	//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	if ( parentOption1 === undefined )
	{
		parent_select1 = "";
	}
	else
	{
		parent_select1 = parentOption1.value;
	}
	if ( parentOption2 === undefined )
	{
		parent_select2 = "";
	}
	else
	{
		parent_select2 = parentOption2.value;
	}
//	parent_select1 = parentOption1.value;
//	parent_select2 = parentOption2.value;
//	alert(" parent_select1="+parent_select1);
//	alert(" parent_select2="+parent_select2);
	for (i in sourceList )
	{
		if ( i == 0 )
		{
			continue;
		}
		child_select1 = sourceList[i][compareIndex1];
		child_select2 = sourceList[i][compareIndex2];

/*
		if ( ((parent_select1 == "") || (parent_select1 == "-1") || (child_select1 == parent_select1))
		  && ((parent_select2 == "") || (parent_select2 == "-1") || (child_select2 == parent_select2))
		)
*/
		if ( ((parent_select1 == "") || (parent_select1 == "-1") || (child_select1.indexOf(parent_select1) != -1 ))
		  && ((parent_select2 == "") || (parent_select2 == "-1") || (child_select2.indexOf(parent_select2) != -1 ))
			)
		{
			new_option = new Option(sourceList[i][1], sourceList[i][0], false, false);
			childOption.options[childOption.length] = new_option;		
			childOption.selectedIndex = 0;
		}
	}

	new_option = new Option( ml(t__Any_ALL), '-1', false, false );
	childOption.options[childOption.length] = def_option; //new_option;
//	childOption.selectedIndex = 0;
	childOption.selectedIndex = childOption.length-1;

}


function updateDropdownListBy3Parents(myformObj, parentOption1, parentOption2, parentOption3, childOption, sourceList, compareIndex1, compareIndex2, compareIndex3) 
{
	var new_options;
	var parent_select1;
	var parent_select2;
	var parent_select3;
	var child_select1;
	var child_select2;
	var child_select3;
	var def_option;

	def_option = childOption.options[childOption.length-1];

	clearDropdownList(childOption);
	//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	if ( parentOption1 === undefined )
	{
		parent_select1 = "";
	}
	else
	{
		parent_select1 = parentOption1.value;
	}
	if ( parentOption2 === undefined )
	{
		parent_select2 = "";
	}
	else
	{
		parent_select2 = parentOption2.value;
	}
	if ( parentOption3 === undefined )
	{
		parent_select3 = "";
	}
	else
	{
		parent_select3 = parentOption3.value;
	}
//	parent_select1 = parentOption1.value;
//	parent_select2 = parentOption2.value;
//	parent_select3 = parentOption3.value;
//	alert(" parent_select1="+parent_select1);
//	alert(" parent_select2="+parent_select2);
//	alert(" parent_select3="+parent_select3);
	for (i in sourceList )
	{
		if ( i == 0 )
		{
			continue;
		}
		child_select1 = sourceList[i][compareIndex1];
		child_select2 = sourceList[i][compareIndex2];
		child_select3 = sourceList[i][compareIndex3];

/*
		if ( ((parent_select1 == "") || (parent_select1 == "-1") || (child_select1 == parent_select1))
		  && ((parent_select2 == "") || (parent_select2 == "-1") || (child_select2 == parent_select2))
		  && ((parent_select3 == "") || (parent_select3 == "-1") || (child_select3 ==  parent_select3))
		)
*/
		if ( ((parent_select1 == "") || (parent_select1 == "-1") || (child_select1.indexOf(parent_select1) != -1 ))
		  && ((parent_select2 == "") || (parent_select2 == "-1") || (child_select2.indexOf(parent_select2) != -1 ))
		  && ((parent_select3 == "") || (parent_select3 == "-1") || (child_select3.indexOf(parent_select3) != -1 ))
			)
		{
			new_option = new Option(sourceList[i][1], sourceList[i][0], false, false);
			childOption.options[childOption.length] = new_option;		
			childOption.selectedIndex = 0;
		}
	}

	new_option = new Option( ml(t__Any_ALL), '-1', false, false );
	childOption.options[childOption.length] = def_option; //new_option;
//	childOption.selectedIndex = 0;
	childOption.selectedIndex = childOption.length-1;

}


function updateDropdownListBy4Parents(myformObj, parentOption1, parentOption2, parentOption3, parentOption4, childOption, sourceList, compareIndex1, compareIndex2, compareIndex3, compareIndex4) 
{
	var new_options;
	var parent_select1;
	var parent_select2;
	var parent_select3;
	var parent_select4;
	var child_select1;
	var child_select2;
	var child_select3;
	var child_select4;
	var def_option;

	def_option = childOption.options[childOption.length-1];

	clearDropdownList(childOption);
	//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	if ( parentOption1 === undefined )
	{
		parent_select1 = "";
	}
	else
	{
		parent_select1 = parentOption1.value;
	}
	if ( parentOption2 === undefined )
	{
		parent_select2 = "";
	}
	else
	{
		parent_select2 = parentOption2.value;
	}
	if ( parentOption3 === undefined )
	{
		parent_select3 = "";
	}
	else
	{
		parent_select3 = parentOption3.value;
	}
	if ( parentOption4 === undefined )
	{
		parent_select4 = "";
	}
	else
	{
		parent_select4 = parentOption4.value;
	}
//	parent_select1 = parentOption1.value;
//	parent_select2 = parentOption2.value;
//	parent_select3 = parentOption3.value;
//	parent_select4 = parentOption4.value;
//	alert(" parent_select1="+parent_select1);
//	alert(" parent_select2="+parent_select2);
//	alert(" parent_select3="+parent_select3);
//	alert(" parent_select4="+parent_select4);
	for (i in sourceList )
	{
		if ( i == 0 )
		{
			continue;
		}
		child_select1 = sourceList[i][compareIndex1];
		child_select2 = sourceList[i][compareIndex2];
		child_select3 = sourceList[i][compareIndex3];
		child_select4 = sourceList[i][compareIndex4];

/*
		if ( ((parent_select1 == "") || (parent_select1 == "-1") || (child_select1 == parent_select1))
		  && ((parent_select2 == "") || (parent_select2 == "-1") || (child_select2 == parent_select2))
		  && ((parent_select3 == "") || (parent_select3 == "-1") || (child_select3 ==  parent_select3))
		  && ((parent_select4 == "") || (parent_select4 == "-1") || (child_select4 ==  parent_select4))
		)
*/
		if ( ((parent_select1 == "") || (parent_select1 == "-1") || (child_select1.indexOf(parent_select1) != -1 ))
		  && ((parent_select2 == "") || (parent_select2 == "-1") || (child_select2.indexOf(parent_select2) != -1 ))
		  && ((parent_select3 == "") || (parent_select3 == "-1") || (child_select3.indexOf(parent_select3) != -1 ))
		  && ((parent_select4 == "") || (parent_select4 == "-1") || (child_select4.indexOf(parent_select4) != -1 ))
			)
		{
			new_option = new Option(sourceList[i][1], sourceList[i][0], false, false);
			childOption.options[childOption.length] = new_option;		
			childOption.selectedIndex = 0;
		}
	}

	new_option = new Option( ml(t__Any_ALL), '-1', false, false );
	childOption.options[childOption.length] = def_option; //new_option;
//	childOption.selectedIndex = 0;
	childOption.selectedIndex = childOption.length-1;

}


function updateDropdownListBy5Parents(myformObj, parentOption1, parentOption2, parentOption3, parentOption4, parentOption5, childOption, sourceList, compareIndex1, compareIndex2, compareIndex3, compareIndex4, compareIndex5) 
{
	var new_options;
	var parent_select1;
	var parent_select2;
	var parent_select3;
	var parent_select4;
	var parent_select5;
	var child_select1;
	var child_select2;
	var child_select3;
	var child_select4;
	var child_select5;
	var def_option;


	def_option = childOption.options[childOption.length-1];

	clearDropdownList(childOption);
	//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	if ( parentOption1 === undefined )
	{
		parent_select1 = "";
	}
	else
	{
		parent_select1 = parentOption1.value;
	}
	if ( parentOption2 === undefined )
	{
		parent_select2 = "";
	}
	else
	{
		parent_select2 = parentOption2.value;
	}
	if ( parentOption3 === undefined )
	{
		parent_select3 = "";
	}
	else
	{
		parent_select3 = parentOption3.value;
	}
	if ( parentOption4 === undefined )
	{
		parent_select4 = "";
	}
	else
	{
		parent_select4 = parentOption4.value;
	}
	if ( parentOption5 === undefined )
	{
		parent_select5 = "";
	}
	else
	{
		parent_select5 = parentOption5.value;
	}
//	parent_select1 = parentOption1.value;
//	parent_select2 = parentOption2.value;
//	parent_select3 = parentOption3.value;
//	parent_select4 = parentOption4.value;
//	parent_select5 = parentOption5.value;

//	alert(" parent_select1="+parent_select1);
//	alert(" parent_select2="+parent_select2);
//	alert(" parent_select3="+parent_select3);
//	alert(" parent_select4="+parent_select4);
//	alert(" parent_select5="+parent_select5);
	for (i in sourceList )
	{
		if ( i == 0 )
		{
			continue;
		}
		child_select1 = sourceList[i][compareIndex1];
		child_select2 = sourceList[i][compareIndex2];
		child_select3 = sourceList[i][compareIndex3];
		child_select4 = sourceList[i][compareIndex4];
		child_select5 = sourceList[i][compareIndex5];

/*
		if ( ((parent_select1 == "") || (parent_select1 == "-1") || (child_select1 == parent_select1))
		  && ((parent_select2 == "") || (parent_select2 == "-1") || (child_select2 == parent_select2))
		  && ((parent_select3 == "") || (parent_select3 == "-1") || (child_select3 ==  parent_select3))
		  && ((parent_select4 == "") || (parent_select4 == "-1") || (child_select4 ==  parent_select4))
		  && ((parent_select5 == "") || (parent_select5 == "-1") || (child_select5 ==  parent_select5))
		)
*/
		if ( ((parent_select1 == "") || (parent_select1 == "-1") || (child_select1.indexOf(parent_select1) != -1 ))
		  && ((parent_select2 == "") || (parent_select2 == "-1") || (child_select2.indexOf(parent_select2) != -1 ))
		  && ((parent_select3 == "") || (parent_select3 == "-1") || (child_select3.indexOf(parent_select3) != -1 ))
		  && ((parent_select4 == "") || (parent_select4 == "-1") || (child_select4.indexOf(parent_select4) != -1 ))
		  && ((parent_select5 == "") || (parent_select5 == "-1") || (child_select5.indexOf(parent_select5) != -1 ))
			)
		{
			new_option = new Option(sourceList[i][1], sourceList[i][0], false, false);
			childOption.options[childOption.length] = new_option;
			childOption.selectedIndex = 0;
		}
	}

	new_option = new Option( ml(t__Any_ALL), '-1', false, false );
	childOption.options[childOption.length] = def_option; //new_option;
//	childOption.selectedIndex = 0;
	childOption.selectedIndex = childOption.length-1;

}


function updateDropdownListBy6Parents(myformObj, parentOption1, parentOption2, parentOption3, parentOption4, parentOption5, parentOption6, childOption, sourceList, compareIndex1, compareIndex2, compareIndex3, compareIndex4, compareIndex5, compareIndex6) 
{
	var new_options;
	var parent_select1;
	var parent_select2;
	var parent_select3;
	var parent_select4;
	var parent_select5;
	var parent_select6;
	var child_select1;
	var child_select2;
	var child_select3;
	var child_select4;
	var child_select5;
	var child_select6;
	var def_option;

	def_option = childOption.options[childOption.length-1];

	clearDropdownList(childOption);
	//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	if ( parentOption1 === undefined )
	{
		parent_select1 = "";
	}
	else
	{
		parent_select1 = parentOption1.value;
	}
	if ( parentOption2 === undefined )
	{
		parent_select2 = "";
	}
	else
	{
		parent_select2 = parentOption2.value;
	}
	if ( parentOption3 === undefined )
	{
		parent_select3 = "";
	}
	else
	{
		parent_select3 = parentOption3.value;
	}
	if ( parentOption4 === undefined )
	{
		parent_select4 = "";
	}
	else
	{
		parent_select4 = parentOption4.value;
	}
	if ( parentOption5 === undefined )
	{
		parent_select5 = "";
	}
	else
	{
		parent_select5 = parentOption5.value;
	}
	if ( parentOption6 === undefined )
	{
		parent_select6 = "";
	}
	else
	{
		parent_select6 = parentOption6.value;
	}
//	parent_select1 = parentOption1.value;
//	parent_select2 = parentOption2.value;
//	parent_select3 = parentOption3.value;
//	parent_select4 = parentOption4.value;
//	parent_select5 = parentOption5.value;
//	parent_select6 = parentOption6.value;
//	alert(" parent_select1="+parent_select1);
//	alert(" parent_select2="+parent_select2);
//	alert(" parent_select3="+parent_select3);
//	alert(" parent_select4="+parent_select4);
//	alert(" parent_select5="+parent_select5);
//	alert(" parent_select6="+parent_select6);
	for (i in sourceList )
	{
		if ( i == 0 )
		{
			continue;
		}
		child_select1 = sourceList[i][compareIndex1];
		child_select2 = sourceList[i][compareIndex2];
		child_select3 = sourceList[i][compareIndex3];
		child_select4 = sourceList[i][compareIndex4];
		child_select5 = sourceList[i][compareIndex5];
		child_select6 = sourceList[i][compareIndex6];

/*
		if ( ((parent_select1 == "") || (parent_select1 == "-1") || (child_select1 == parent_select1))
		  && ((parent_select2 == "") || (parent_select2 == "-1") || (child_select2 == parent_select2))
		  && ((parent_select3 == "") || (parent_select3 == "-1") || (child_select3 ==  parent_select3))
		  && ((parent_select4 == "") || (parent_select4 == "-1") || (child_select4 ==  parent_select4))
		  && ((parent_select5 == "") || (parent_select5 == "-1") || (child_select5 ==  parent_select5))
		  && ((parent_select6 == "") || (parent_select6 == "-1") || (child_select6 ==  parent_select6))
		)
*/
		if ( ((parent_select1 == "") || (parent_select1 == "-1") || (child_select1.indexOf(parent_select1) != -1 ))
		  && ((parent_select2 == "") || (parent_select2 == "-1") || (child_select2.indexOf(parent_select2) != -1 ))
		  && ((parent_select3 == "") || (parent_select3 == "-1") || (child_select3.indexOf(parent_select3) != -1 ))
		  && ((parent_select4 == "") || (parent_select4 == "-1") || (child_select4.indexOf(parent_select4) != -1 ))
		  && ((parent_select5 == "") || (parent_select5 == "-1") || (child_select5.indexOf(parent_select5) != -1 ))
		  && ((parent_select6 == "") || (parent_select6 == "-1") || (child_select6.indexOf(parent_select6) != -1 ))
			)
		{
			new_option = new Option(sourceList[i][1], sourceList[i][0], false, false);
			childOption.options[childOption.length] = new_option;
			childOption.selectedIndex = 0;
		}
	}

	new_option = new Option( ml(t__Any_ALL), '-1', false, false );
	childOption.options[childOption.length] = def_option; //new_option;
//	childOption.selectedIndex = 0;
	childOption.selectedIndex = childOption.length-1;

}


function updateSqlType(myformObj, parentOption, childOption ) 
{
	var new_options;
	var parent_select;
	var child_select;
	var REPORT_TRIPONLY_SCHD = 1;
	var REPORT_TRIPORDER_SCHD = 2;
	var REPORT_TRIPONLY_AUTH = 4;
	var REPORT_TRIPORDER_AUTH = 8;
	var REPORT_TRIPONLY_LOAD = 16;
	var REPORT_TRIPORDER_LOAD = 32;


	//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	if ( parentOption === undefined )
	{
		parent_select = "";
	}
	else
	{
		parent_select = parentOption.value;
	}
//	parent_select = parentOption.value;

	if ( ((parent_select & REPORT_TRIPONLY_SCHD) > 0 )
	  && ((parent_select & REPORT_TRIPORDER_SCHD) > 0 )
	  && ((parent_select & REPORT_TRIPONLY_AUTH) == 0 )
	  && ((parent_select & REPORT_TRIPORDER_AUTH) == 0 )
	  && ((parent_select & REPORT_TRIPONLY_LOAD) == 0 )
	  && ((parent_select & REPORT_TRIPORDER_LOAD) == 0 )
		)
	{
		child_select = 1;
	}
	else
	if ( ((parent_select & REPORT_TRIPONLY_SCHD) == 0 )
	  && ((parent_select & REPORT_TRIPORDER_SCHD) == 0 )
	  && ((parent_select & REPORT_TRIPONLY_AUTH) > 0 )
	  && ((parent_select & REPORT_TRIPORDER_AUTH) > 0 )
	  && ((parent_select & REPORT_TRIPONLY_LOAD) == 0 )
	  && ((parent_select & REPORT_TRIPORDER_LOAD) == 0 )
		)
	{
		child_select = 1;
	}
	else
	if ( ((parent_select & REPORT_TRIPONLY_SCHD) == 0 )
	  && ((parent_select & REPORT_TRIPORDER_SCHD) == 0 )
	  && ((parent_select & REPORT_TRIPONLY_AUTH) == 0 )
	  && ((parent_select & REPORT_TRIPORDER_AUTH) == 0 )
	  && ((parent_select & REPORT_TRIPONLY_LOAD) > 0 )
	  && ((parent_select & REPORT_TRIPORDER_LOAD) > 0 )
		)
	{
		child_select = 1;
	}
	else
	if ( ((parent_select & REPORT_TRIPONLY_SCHD) > 0 )
	  && ((parent_select & REPORT_TRIPORDER_SCHD) > 0 )
	  && ((parent_select & REPORT_TRIPONLY_AUTH) > 0 )
	  && ((parent_select & REPORT_TRIPORDER_AUTH) > 0 )
	  && ((parent_select & REPORT_TRIPONLY_LOAD) == 0 )
	  && ((parent_select & REPORT_TRIPORDER_LOAD) == 0 )
		)
	{
		child_select = 1;
	}
	else
	if ( ((parent_select & REPORT_TRIPONLY_SCHD) > 0 )
	  && ((parent_select & REPORT_TRIPORDER_SCHD) > 0 )
	  && ((parent_select & REPORT_TRIPONLY_AUTH) == 0 )
	  && ((parent_select & REPORT_TRIPORDER_AUTH) == 0 )
	  && ((parent_select & REPORT_TRIPONLY_LOAD) > 0 )
	  && ((parent_select & REPORT_TRIPORDER_LOAD) > 0 )
		)
	{
		child_select = 1;
	}
	else
	if ( ((parent_select & REPORT_TRIPONLY_SCHD) == 0 )
	  && ((parent_select & REPORT_TRIPORDER_SCHD) == 0 )
	  && ((parent_select & REPORT_TRIPONLY_AUTH) > 0 )
	  && ((parent_select & REPORT_TRIPORDER_AUTH) > 0 )
	  && ((parent_select & REPORT_TRIPONLY_LOAD) > 0 )
	  && ((parent_select & REPORT_TRIPORDER_LOAD) > 0 )
		)
	{
		child_select = 1;
	}
	else
	if ( ((parent_select & REPORT_TRIPONLY_SCHD) > 0 )
	  && ((parent_select & REPORT_TRIPORDER_SCHD) > 0 )
	  && ((parent_select & REPORT_TRIPONLY_AUTH) > 0 )
	  && ((parent_select & REPORT_TRIPORDER_AUTH) > 0 )
	  && ((parent_select & REPORT_TRIPONLY_LOAD) > 0 )
	  && ((parent_select & REPORT_TRIPORDER_LOAD) > 0 )
		)
	{
		child_select = 1;
	}
	else
	{
		child_select = 3;
	}

	childOption.value = child_select;
}


function updateDisabledMode(myformObj, parentOption, childOption ) 
{
	var new_options;
	var parent_select;
	var child_select;

	//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	if ( parentOption === undefined )
	{
		parent_select = "";
	}
	else
	{
		parent_select = parentOption.value;
	}
//	parent_select = parentOption.value;

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


function updateDisabledModeBy2Parents(myformObj, parentOption1, parentOption2, childOption ) 
{
	var new_options;
	var parent_select1;
	var parent_select2;
	var child_select;

	//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	if ( parentOption1 === undefined )
	{
		parent_select1 = "";
	}
	else
	{
		parent_select1 = parentOption1.value;
	}
	if ( parentOption2 === undefined )
	{
		parent_select2 = "";
	}
	else
	{
		parent_select2 = parentOption2.value;
	}
//	parent_select1 = parentOption1.value;
//	parent_select2 = parentOption2.value;

	if ( parent_select1 != "" || parent_select2 != "" )
	{
		childOption.value = "";
		childOption.disabled = true;
	}
	else
	{
		childOption.disabled = false;
	}
}


function getDateTime(op1, op2)
{
	var year = op1.substring(0,4);
	var month = op1.substring(5,7);
	var day = op1.substring(8,10);
	var hour = op2. substring (0,2);
	var second = op2.substring(3,5);
	//alert(year +" AND "+month +" AND "+day +" AND "+ hour+" AND "+second);	
	return new Date(year, (month-1), (day), hour, second);
	
}

function getToDate(op)
{
		//alert('here is op '+ op);
		var year = op.substring(0,4);
		//var mmm = op.substring(5,7);
		var month = op.substring(5,7);
		var day = op.substring(8,10);
		
		return new Date(year, (month-1), (day));
}


function getDateFromMilliTime( msec )
{
		var monNum;
		var monStr;
		var datNum;
		var datStr;

		var d = new Date();
		d.setTime( msec );

		monNum = d.getMonth() + 1;
		datNum = d.getDate();

		if (monNum < 10)
		{
			monStr = "0" + monNum;
		}
		else
		{
			monStr = monNum;
		}

		if (datNum < 10)
		{
			datStr = "0" + datNum;
		}
		else
		{
			datStr = datNum;
		}

		var currDate = d.getFullYear() + "-" + monStr + "-" + datStr;

		return currDate;
}


function checkReportForm(myformObj)
{
		
		var isValid = false;
		var isDateOK = false;
		
		isValid = submitmyform(myformObj);

		if (isValid == true)
		{
			isDateOK = true;

			var st_date = getToDate( myformObj.frm_dt_start.value );
			var ed_date = getToDate( myformObj.frm_dt_end.value );
			var st_time = st_date.getTime();
			var ed_time = ed_date.getTime();
			var cur_date = new Date();
			var min_time = cur_date.getTime() - (daysOfDataKept*24*60*60*1000);

			if ( st_time < min_time )
			{
				if ( dateAutoAdjust == "Y" )
				{
					myformObj.frm_dt_start.value = getDateFromMilliTime( min_time );
				}

				alert( ml(t__Error_Date_Min) );
				isDateOK = false;
			}

			if ( st_time > ed_time )
			{
				if ( dateAutoAdjust == "Y" )
				{
					var tmp_date = myformObj.frm_dt_end.value;
					myformObj.frm_dt_end.value = myformObj.frm_dt_start.value;
					myformObj.frm_dt_start.value = tmp_date;
				}

				alert( ml(t__Error_Date_Compare) );
				isDateOK = false;
			}

			//alert(st_time);
			//alert(ed_time);
			//alert ( getDateFromMilliTime(st_time) );
			//alert ( getDateFromMilliTime(ed_time) );
			if ( (st_time + (dateRange*24*60*60*1000)) < ed_time )
			{
				if ( dateAutoAdjust == "Y" )
				{
					st_time = ed_time - (dateRange*24*60*60*1000);
					myformObj.frm_dt_start.value = getDateFromMilliTime( st_time );
				}

				alert( ml(t__Error_Date_Range) );
				isDateOK = false;
			}
		}

		return (isValid && isDateOK);
}



/* define showinPagePopup() 
 * responsible for showing the report pop-up 
 * and functions to the head section of this page 
 */

function showinPagePopup(whichObject, whichPopup, whichFile)
{
  
	//  alert(whichFile);
	var myPopUpObject;
	myPopUpObject = whichObject;
	myPopUpObject.setUrl(whichFile);
	myPopUpObject.showPopup(whichPopup);
}

/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage, lang)
{
  var newPage = "";  // use this to avoid the duplicate of info 

  newPage +="<SCRIPT src=\"/"+lang+"/js/next.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/"+lang+"/js/CalendarPopup.js\"></SCRIPT>\n";
  newPage +="<script>\n";
  newPage +="	var cal = new CalendarPopup();\n";
  newPage +="	cal.showYearNavigation();\n";
  newPage +="function ActionDeterminator(whichObject, whichPopup, whichFile, myobject)\n";
  newPage +="{\n";
  newPage +=" var isFormValid = false;\n"; 
//  newPage +=" isFormValid = submitmyform(myobject);\n"; 
  newPage +=" isFormValid = checkReportForm(myobject);\n"; 
  newPage +="	if(isFormValid==true)\n";
  newPage +=" {\n";
  
  //all the variables set here and then show the pop up
  //common variables for report
  // 1. report type
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_rpttype == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempRptType = '1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempRptType = document.edit_rptobj_gui.frm_rpttype.value;\n";
  newPage +="   }\n";
  // 2. report time type
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_timetype == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempRptTimeBase = '3';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempRptTimeBase = document.edit_rptobj_gui.frm_timetype.value;\n";
  newPage +="   }\n";
  // 3. report output type
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_outtype == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempRptOutType = '1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempRptOutType = document.edit_rptobj_gui.frm_outtype.value;\n";
  newPage +="   }\n";
  // 4. report trip type
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_triptype == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempRptTripType = '63';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempRptTripType = document.edit_rptobj_gui.frm_triptype.value;\n";
  newPage +="   }\n";
  // 5. report sql type
  newPage +="   if ( typeof document.edit_rptobj_gui.hid_sqltype == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempRptSqlType = '1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempRptSqlType = document.edit_rptobj_gui.hid_sqltype.value;\n";
  newPage +="   }\n";

  //start date variables
  // 6. start date
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_dt_start == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempStartDate = '2007-08-08';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempStartDate = document.edit_rptobj_gui.frm_dt_start.value;\n";
  newPage +="   }\n";
  // 7. start hour
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_hr_start == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempStartHr = '00';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempStartHr = document.edit_rptobj_gui.frm_hr_start.value;\n";
  newPage +="   }\n";
  // 8. start minute
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_mi_start == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempStartMin = '00';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempStartMin = document.edit_rptobj_gui.frm_mi_start.value;\n";
  newPage +="   }\n";
  
  //end date variables
  // 9. end date
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_dt_end == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempEndDate = '2007-08-08';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempEndDate = document.edit_rptobj_gui.frm_dt_end.value;\n";
  newPage +="   }\n";
  // 10. end hour
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_hr_end == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempEndHr = '00';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempEndHr = document.edit_rptobj_gui.frm_hr_end.value;\n";
  newPage +="   }\n";
  // 11. end minute
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_mi_end == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempEndMin = '00';\n"; 
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempEndMin = document.edit_rptobj_gui.frm_mi_end.value;\n"; 
  newPage +="   }\n";

  //customers and products
  // 12. supplier
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_supplier == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempsuppCd = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempsuppCd = document.edit_rptobj_gui.frm_supplier.value;\n";
  newPage +="   }\n";
  // 13. delivery company
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_delvcmpy == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempDelivLoc = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempDelivLoc = document.edit_rptobj_gui.frm_delvcmpy.value;\n";
  newPage +="   }\n";
  // 14. customer category
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_category == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempCustCtegory = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempCustCtegory = document.edit_rptobj_gui.frm_category.value;\n";
  newPage +="   }\n";
  // 15. customer account
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_customer == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempCustomer = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempCustomer = document.edit_rptobj_gui.frm_customer.value;\n";
  newPage +="   }\n";
  // 16. drawer company
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_drawer == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempDrawer = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempDrawer = document.edit_rptobj_gui.frm_drawer.value;\n";
  newPage +="   }\n";
  // 17. drawer product
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_product == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempProdCd = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempProdCd = document.edit_rptobj_gui.frm_product.value;\n";
  newPage +="   }\n";

  //carriers and tankers
  // 18a. operator
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_operator == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempOperator = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempOperator = document.edit_rptobj_gui.frm_operator.value;\n";
  newPage +="   }\n";
  // 18b. order source
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_ordsource == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempOrdSource = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempOrdSource = document.edit_rptobj_gui.frm_ordsource.value;\n";
  newPage +="   }\n";
  // 18. loader
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_loader == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempDriver = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempDriver = document.edit_rptobj_gui.frm_loader.value;\n";
  newPage +="   }\n";
  // 19. max compartments
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_maxcmpts == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempMaxCmpt = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempMaxCmpt = document.edit_rptobj_gui.frm_maxcmpts.value;\n";
  newPage +="   }\n";
  // 20. carrier company
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_carrier == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempCarr = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempCarr = document.edit_rptobj_gui.frm_carrier.value;\n";
  newPage +="   }\n";
  // 21. tanker
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_tanker == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempTanker = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempTanker = document.edit_rptobj_gui.frm_tanker.value;\n";
  newPage +="   }\n";

  // bay, meter, arm, tank and base products
  // 22. terminal
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_terminal == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempTrmn = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempTrmn = document.edit_rptobj_gui.frm_terminal.value;\n";
  newPage +="   }\n";
  // 23. bay
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_bay == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempBayCode = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempBayCode = document.edit_rptobj_gui.frm_bay.value;\n";
  newPage +="   }\n";
  // 24. meter
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_meter == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempMtrCode = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempMtrCode = document.edit_rptobj_gui.frm_meter.value;\n";
  newPage +="   }\n";
  // 25. bay arm
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_bayarm == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempArmCode = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempArmCode = document.edit_rptobj_gui.frm_bayarm.value;\n";
  newPage +="   }\n";
  // 26. injectors
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_injector == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempInjCode = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempInjCode = document.edit_rptobj_gui.frm_injector.value;\n";
  newPage +="   }\n";
  // 27. base products
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_base == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempBase = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempBase = document.edit_rptobj_gui.frm_base.value;\n";
  newPage +="   }\n";
  // 28. base tanks
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_tank == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempTank = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempTank = document.edit_rptobj_gui.frm_tank.value;\n";
  newPage +="   }\n";
  // 29. additives
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_additive == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempAdditive = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempAdditive = document.edit_rptobj_gui.frm_additive.value;\n";
  newPage +="   }\n";
  // 30. additive tank
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_adtvtank == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempAdtvTank = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempAdtvTank = document.edit_rptobj_gui.frm_adtvtank.value;\n";
  newPage +="   }\n";

  // trip, open order, erp order
  // 31. trip
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_omega_trip == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempTripNum = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempTripNum = document.edit_rptobj_gui.frm_omega_trip.value;\n";
  newPage +="   }\n";
  // 32. trip from
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_omega_trip_from == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempTripFrom = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempTripFrom = document.edit_rptobj_gui.frm_omega_trip_from.value;\n";
  newPage +="   }\n";
  // 33. trip to
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_omega_trip_to == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempTripTo = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempTripTo = document.edit_rptobj_gui.frm_omega_trip_to.value;\n";
  newPage +="   }\n";
  // 34  erp order
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_erp_order == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempErpNum = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempErpNum = document.edit_rptobj_gui.frm_erp_order.value;\n";
  newPage +="   }\n";
  // 35  erp order from
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_erp_order_from == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempErpFrom = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempErpFrom = document.edit_rptobj_gui.frm_erp_order_from.value;\n";
  newPage +="   }\n";
  // 36  erp order to
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_erp_order_to == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempErpTo = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempErpTo = document.edit_rptobj_gui.frm_erp_order_to.value;\n";
  newPage +="   }\n";
  // 37. omega order
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_omega_order == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempOrderNum = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempOrderNum = document.edit_rptobj_gui.frm_omega_order.value;\n";
  newPage +="   }\n";
  // 38. omega order from
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_omega_order_from == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempOrderFrom = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempOrderFrom = document.edit_rptobj_gui.frm_omega_order_from.value;\n";
  newPage +="   }\n";
  // 39. omega order to
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_omega_order_to == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempOrderTo = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempOrderTo = document.edit_rptobj_gui.frm_omega_order_to.value;\n";
  newPage +="   }\n";

  // 40. open amb metering
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_opnamb == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempOpnAmb = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempOpnAmb = document.edit_rptobj_gui.frm_opnamb.value;\n";
  newPage +="   }\n";
  // 41. close amb metering
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_clsamb == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempClsAmb = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempClsAmb = document.edit_rptobj_gui.frm_clsamb.value;\n";
  newPage +="   }\n";
  // 42. load type
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_loadtype == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempLoadType = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempLoadType = document.edit_rptobj_gui.frm_loadtype.value;\n";
  newPage +="   }\n";

  // Load/Blend Tolerance
  // Load Tolerance Flag
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_ld_tol_flag == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempLdTolFlag = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempLdTolFlag = document.edit_rptobj_gui.frm_ld_tol_flag.value;\n";
  newPage +="   }\n";
  // Load Tolerance Error
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_ld_tol_err == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempLdTolErr = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempLdTolErr = document.edit_rptobj_gui.frm_ld_tol_err.value;\n";
  newPage +="   }\n";
  // Blend Tolerance Flag
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_bl_tol_flag == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempBlTolFlag = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempBlTolFlag = document.edit_rptobj_gui.frm_bl_tol_flag.value;\n";
  newPage +="   }\n";
  // Blend Tolerance Error
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_bl_tol_err == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempBlTolErr = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempBlTolErr = document.edit_rptobj_gui.frm_bl_tol_err.value;\n";
  newPage +="   }\n";
  // Base Class Type
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_base_class == 'undefined')\n";
  newPage +="   {\n";
  newPage +="      myTempBaseClass = '-1';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      myTempBaseClass = document.edit_rptobj_gui.frm_base_class.value;\n";
  newPage +="   }\n";

  
  newPage +="   if ( typeof document.edit_rptobj_gui.frm_fontsize == 'undefined')\n";
  newPage +="   {\n";
  newPage +="       myTempRptFontSize = '10';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="       myTempRptFontSize = document.edit_rptobj_gui.frm_fontsize.value;\n";
  newPage +="   }\n";

  newPage +="   if ( typeof document.edit_rptobj_gui.frm_direction == 'undefined')\n";
  newPage +="   {\n";
  newPage +="       myTempRptHeaderDir = '2';\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="       myTempRptHeaderDir = document.edit_rptobj_gui.frm_direction.value;\n";
  newPage +="   }\n";


/*
  newPage +="   myTempSDate = document.edit_rptobj_gui.startDate.value;\n";
  newPage +="   myTempSDate +=' '+document.edit_rptobj_gui.start_hour.value;\n";
  newPage +="   myTempSDate +=':' +document.edit_rptobj_gui.start_min.value;\n";
  
  newPage +="   myTempEDate = document.edit_rptobj_gui.endDate.value;\n";
  newPage +="   myTempEDate +=' '+document.edit_rptobj_gui.end_hour.value;\n";
  newPage +="   myTempEDate +=':' +document.edit_rptobj_gui.end_min.value;\n";
  
//  newPage +="   alert('myTempEDate '+myTempEDate);\n";
//  newPage +="   alert('myTempSDate '+myTempSDate);\n";

  newPage +="   document.edit_rptobj_gui.startDateTime.value = myTempSDate;\n"; 
  newPage +="   document.edit_rptobj_gui.endDateTime.value   = myTempEDate;\n";
*/

  newPage +="   document.edit_rptobj_gui.action = 'rptobj_popup.cgi';\n";



  newPage +="   myURL = whichFile + '?frm_rpttype='+encodeURI(myTempRptType)\n";
  newPage +="   myURL += '&frm_timetype='+encodeURI(myTempRptTimeBase)\n";
  newPage +="   myURL += '&frm_outtype='+encodeURI(myTempRptOutType)\n";
  newPage +="   myURL += '&frm_triptype='+encodeURI(myTempRptTripType)\n";
  newPage +="   myURL += '&hid_sqltype='+encodeURI(myTempRptSqlType)\n";

  newPage +="   myURL += '&frm_dt_start='+myTempStartDate\n";
  newPage +="   myURL += '&frm_hr_start='+myTempStartHr\n";  
  newPage +="   myURL += '&frm_mi_start='+myTempStartMin\n";
  newPage +="   myURL += '&frm_dt_end='+myTempEndDate\n";
  newPage +="   myURL += '&frm_hr_end='+myTempEndHr\n";  
  newPage +="   myURL += '&frm_mi_end='+myTempEndMin\n";

  newPage +="   myURL += '&frm_supplier='+encodeURI(myTempsuppCd)\n";
  newPage +="   myURL += '&frm_delvcmpy='+encodeURI(myTempDelivLoc)\n";
  newPage +="   myURL += '&frm_category='+encodeURI(myTempCustCtegory)\n";
  newPage +="   myURL += '&frm_customer='+encodeURI(myTempCustomer)\n";
  newPage +="   myURL += '&frm_drawer='+encodeURI(myTempDrawer)\n";
  newPage +="   myURL += '&frm_product='+encodeURI(myTempProdCd)\n";

  newPage +="   myURL += '&frm_operator='+encodeURI(myTempOperator)\n";
  newPage +="   myURL += '&frm_ordsource='+encodeURI(myTempOrdSource)\n";
  newPage +="   myURL += '&frm_loader='+encodeURI(myTempDriver)\n";
  newPage +="   myURL += '&frm_maxcmpts='+encodeURI(myTempMaxCmpt)\n";
  newPage +="   myURL += '&frm_carrier='+encodeURI(myTempCarr)\n";
  newPage +="   myURL += '&frm_tanker='+encodeURI(myTempTanker)\n";  

  newPage +="   myURL += '&frm_terminal='+encodeURI(myTempTrmn)\n";
  newPage +="   myURL += '&frm_bay='+encodeURI(myTempBayCode)\n";
  newPage +="   myURL += '&frm_meter='+encodeURI(myTempMtrCode)\n";
  newPage +="   myURL += '&frm_bayarm='+encodeURI(myTempArmCode)\n";
  newPage +="   myURL += '&frm_injector='+encodeURI(myTempInjCode)\n";
  newPage +="   myURL += '&frm_base='+encodeURI(myTempBase)\n";
  newPage +="   myURL += '&frm_tank='+encodeURI(myTempTank)\n";
  newPage +="   myURL += '&frm_additive='+encodeURI(myTempAdditive)\n";
  newPage +="   myURL += '&frm_adtvtank='+encodeURI(myTempAdtvTank)\n";

  newPage +="   myURL += '&frm_omega_trip='+encodeURI(myTempTripNum)\n";
  newPage +="   myURL += '&frm_omega_trip_from='+encodeURI(myTempTripFrom)\n";
  newPage +="   myURL += '&frm_omega_trip_to='+encodeURI(myTempTripTo)\n";
  newPage +="   myURL += '&frm_erp_order='+encodeURI(myTempErpNum)\n";
  newPage +="   myURL += '&frm_erp_order_from='+encodeURI(myTempErpFrom)\n";
  newPage +="   myURL += '&frm_erp_order_to='+encodeURI(myTempErpTo)\n";

  newPage +="   myURL += '&frm_omega_order='+encodeURI(myTempOrderNum)\n";
  newPage +="   myURL += '&frm_omega_order_from='+encodeURI(myTempOrderFrom)\n";
  newPage +="   myURL += '&frm_omega_order_to='+encodeURI(myTempOrderTo)\n";

  newPage +="   myURL += '&frm_loadtype='+encodeURI(myTempLoadType)\n";
  newPage +="   myURL += '&frm_opnamb='+encodeURI(myTempOpnAmb)\n";
  newPage +="   myURL += '&frm_clsamb='+encodeURI(myTempClsAmb)\n";

  newPage +="   myURL += '&frm_ld_tol_flag='+encodeURI(myTempLdTolFlag)\n";
  newPage +="   myURL += '&frm_ld_tol_err='+encodeURI(myTempLdTolErr)\n";
  newPage +="   myURL += '&frm_bl_tol_flag='+encodeURI(myTempBlTolFlag)\n";
  newPage +="   myURL += '&frm_bl_tol_err='+encodeURI(myTempBlTolErr)\n";
  newPage +="   myURL += '&frm_base_class='+encodeURI(myTempBaseClass)\n";

  newPage +="   myURL += '&frm_fontsize='+encodeURI(myTempRptFontSize)\n";
  newPage +="   myURL += '&frm_direction='+encodeURI(myTempRptHeaderDir)\n";

//  newPage +="   myURL += '&startDateTime='+myTempSDate\n";
//  newPage +="   myURL += '&endDateTime='+myTempEDate\n";
  
  newPage +="   myURL += \n"; 
  
  newPage +="   showinPagePopup(whichObject, whichPopup, myURL);\n"; 
 
  newPage +="   return false;\n"; 
  newPage +=" }\n";
  newPage +=" return isFormValid;\n";
  newPage +="}\n";
  newPage +="</script>\n";
  newPage +="\n";
  newPage +="</head>\n";
  newPage +="\n";
  newPage +="<body>\n";
  
  newPage +="\n";
  newPage +="\n";

  return (newPage);
}


//change customers Ajax list, if customer category changes 
function checkCustomers( myformObj, parentOption )
{
	var parent_name;
	var parent_select;

	if ( parentOption === undefined )
	{
		parent_name = "";
		parent_select = "";
	}
	else
	{
		parent_name = parentOption.name;
		parent_select = parentOption.value;
	}
//	var parent_name = parentOption.name;
//	var parent_select = parentOption.value;

	myformObj.frm_customer.value = ''; 

	if( parent_name == "frm_category" )
	{
		myformObj.frm_customer.focus();
		myQStr = AlterUrlString((options2.script), "cust_cat", parent_select );
		//alert(myQStr);
		options2.script = myQStr;
		myQStr = AlterUrlString((options2.script), "supplier", myformObj.frm_supplier.value );
		options2.script = myQStr;
		myQStr = AlterUrlString((options2.script), "cust_delvloc", myformObj.frm_delvcmpy.value );
		options2.script = myQStr;
	}

	if( parent_name == "frm_supplier" )
	{
		myformObj.frm_customer.focus();
		myQStr = AlterUrlString((options2.script),"supplier", parent_select );
		//alert(myQStr);
		options2.script = myQStr;
		myQStr = AlterUrlString((options2.script), "cust_cat", myformObj.frm_category.value );
		options2.script = myQStr;
		myQStr = AlterUrlString((options2.script), "cust_delvloc", myformObj.frm_delvcmpy.value );
		options2.script = myQStr;
	}

	if( parent_name == "frm_delvcmpy" )
	{
		myformObj.frm_customer.focus();
		myQStr = AlterUrlString((options2.script),"cust_delvloc", parent_select );
		//alert(myQStr);
		options2.script = myQStr;
		myQStr = AlterUrlString((options2.script), "cust_cat", myformObj.frm_category.value );
		options2.script = myQStr;
		myQStr = AlterUrlString((options2.script), "supplier", myformObj.frm_supplier.value );
		options2.script = myQStr;
	}

}


//change customers Ajax list, if customer category changes 
function updateCustomers( myformObj )
{
//	myformObj.frm_customer.value = ''; 
	myformObj.frm_customer.focus();

	myQStr = AlterUrlString((options2.script), "cust_cat", myformObj.frm_category.value );
	options2.script = myQStr;
	myQStr = AlterUrlString((options2.script), "supplier", myformObj.frm_supplier.value );
	options2.script = myQStr;
	myQStr = AlterUrlString((options2.script), "cust_delvloc", myformObj.frm_delvcmpy.value );
	options2.script = myQStr;
}



function setCustAcntCd(myformObj)
{
	if ( myformObj.frm_customer.value == "" )
	{
		return;
	}

	var mycgi1 = '../../../cgi-bin/en/rpt_adm/ajaxlist_customers.cgi';
	var myqry1 = "input2="+encodeURI(myformObj.frm_customer.value) ;

	var inputxml = loadXml(mycgi1, myqry1);

	//alert("at the beginning of function the value of customer ");
	var results = inputxml.getElementsByTagName('results')[0].childNodes;
	for (var i=0;i<results.length;i++)
	{
		//alert("I am here there is something and cust ");
		if (results[i].hasChildNodes())
		{
			//alert("I am here there is something and cust company code is "+results[i].getAttribute("cust_code"));
			myformObj.frm_customer.value =(results[i].getAttribute("cust_acct"));
			return true;
		}
		
	}
//	alert(otherText["msg_valid_Customer"]);
	return false;
	
}


function setCustAcntNm(myformObj)
{
	if ( myformObj.frm_customer.value == "" )
	{
		return;
	}

	var mycgi1 = '../../../cgi-bin/en/rpt_adm/ajaxlist_customers.cgi';
	var myqry1 = "input2="+encodeURI(myformObj.frm_customer.value) ;

	var inputxml = loadXml(mycgi1, myqry1);

	//alert("at the beginning of function the value of customer ");
	var results = inputxml.getElementsByTagName('results')[0].childNodes;
	for (var i=0;i<results.length;i++)
	{
		//alert("I am here there is something and cust ");
		if (results[i].hasChildNodes())
		{
			//alert("I am here there is something and cust company code is "+results[i].getAttribute("cust_code"));
			myformObj.frm_customer.value =(results[i].getAttribute("cust_name"));
			return true;
		}
		
	}
//	alert(otherText["msg_valid_Customer"]);
	return false;
	
}



//change tankers Ajax list, if tanker category changes 
function checkTankers( myformObj, parentOption )
{
	var parent_name;
	var parent_select;

	if ( parentOption === undefined )
	{
		parent_name = "";
		parent_select = "";
	}
	else
	{
		parent_name = parentOption.name;
		parent_select = parentOption.value;
	}
//	var parent_name = parentOption.name;
//	var parent_select = parentOption.value;

	myformObj.frm_tanker.value = ''; 

	if( parent_name == "frm_maxcmpts" )
	{
		myformObj.frm_tanker.focus();
		myQStr = AlterUrlString((options1.script), "tnkr_cmpt", parent_select );
		//alert(myQStr);
		options1.script = myQStr;
		myQStr = AlterUrlString((options1.script), "tnkr_carr", myformObj.frm_carrier.value );
		options1.script = myQStr;
		myQStr = AlterUrlString((options1.script), "tnkr_site", myformObj.frm_terminal.value );
		options1.script = myQStr;
	}

	if( parent_name == "frm_carrier" )
	{
		myformObj.frm_tanker.focus();
		myQStr = AlterUrlString((options1.script),"tnkr_carr", parent_select );
		//alert(myQStr);
		options1.script = myQStr;
		myQStr = AlterUrlString((options1.script), "tnkr_cmpt", myformObj.frm_maxcmpts.value );
		options1.script = myQStr;
		myQStr = AlterUrlString((options1.script), "tnkr_site", myformObj.frm_terminal.value );
		options1.script = myQStr;
	}

	if( parent_name == "frm_terminal" )
	{
		myformObj.frm_tanker.focus();
		myQStr = AlterUrlString((options1.script),"tnkr_site", parent_select );
		//alert(myQStr);
		options1.script = myQStr;
		myQStr = AlterUrlString((options1.script), "tnkr_cmpt", myformObj.frm_maxcmpts.value );
		options1.script = myQStr;
		myQStr = AlterUrlString((options1.script), "tnkr_carr", myformObj.frm_carrier.value );
		options1.script = myQStr;
	}

}


//change tankers Ajax list, if tanker category changes 
function updateTankers( myformObj )
{
//	myformObj.frm_tanker.value = ''; 
	myformObj.frm_tanker.focus();

	myQStr = AlterUrlString((options1.script), "tnkr_cmpt", myformObj.frm_maxcmpts.value );
	options1.script = myQStr;
	myQStr = AlterUrlString((options1.script), "tnkr_carr", myformObj.frm_carrier.value );
	options1.script = myQStr;
	myQStr = AlterUrlString((options1.script), "tnkr_site", myformObj.frm_terminal.value );
	options1.script = myQStr;
}


function setTnkrCd(myformObj)
{
	if ( myformObj.frm_tanker.value == "" )
	{
		return;
	}

	var mycgi1 = '../../../cgi-bin/en/rpt_adm/ajaxlist_tankers.cgi';
	var myqry1 = "input1="+encodeURI(myformObj.frm_tanker.value) ;

	var inputxml = loadXml(mycgi1, myqry1);

	//alert("at the beginning of function the value of tanker ");
	var results = inputxml.getElementsByTagName('results')[0].childNodes;
	for (var i=0;i<results.length;i++)
	{
		//alert("I am here there is something and tnkr ");
		if (results[i].hasChildNodes())
		{
			//alert("I am here there is something and  tanker code is "+results[i].getAttribute("tnkr_code"));
			myformObj.frm_tanker.value =(results[i].getAttribute("tnkr_code"));
			return true;
		}
		
	}
//	alert(otherText["msg_valid_Customer"]);
	return false;
	
}


function setTnkrNm(myformObj)
{
	if ( myformObj.frm_tanker.value == "" )
	{
		return;
	}

	var mycgi1 = '../../../cgi-bin/en/rpt_adm/ajaxlist_tankers.cgi';
	var myqry1 = "input1="+encodeURI(myformObj.frm_tanker.value) ;

	var inputxml = loadXml(mycgi1, myqry1);

	//alert("at the beginning of function the value of tanker ");
	var results = inputxml.getElementsByTagName('results')[0].childNodes;
	for (var i=0;i<results.length;i++)
	{
		//alert("I am here there is something and tnkr ");
		if (results[i].hasChildNodes())
		{
			//alert("I am here there is something and tanker code is "+results[i].getAttribute("tnkr_name"));
			myformObj.frm_tanker.value =(results[i].getAttribute("tnkr_name"));
			return true;
		}
		
	}
//	alert(otherText["msg_valid_Customer"]);
	return false;
	
}



