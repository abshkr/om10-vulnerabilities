var opValues = new Array();
var otherText = new Array()
var items_per_page = 10;
var addrTitle = new Array();


opValues["viewReportFrm"] = -1;
opValues["viewReportFrm"] = 0;
opValues["viewReportFrm"] = 1;
opValues["submitReportFrm"] = 11;


var t__YOUR_ACTION = [                          "YOUR ACTION"                           , "请选择" ];
var t__Select = [                               "Select"                                , "请选择" ];

var t__Rpt_Type = ["Report Type","报表类型"];
var t__Rpt_Time_Base = ["Report Time Base","报表时段基准"];

var t__Rpt_Font_Size = ["Report Font Size","报表字体尺寸"];
var t__Rpt_Page_Rows = ["Report Page Rows","报表每页行数"];

var t__St_Date_Time = ["Start Date / Time", "开始日期 / 时间"];
var t__En_Date_Time = ["End Date / Time", "结束日期 / 时间"];

var t__Depot = ["Depot","油库"];
var t__Supplier = ["Supplier","供应商"];

var t__Bay = ["Bay","发油台"];
var t__Meter = ["Meter","流量计"];

var t__Def_Dliver_Loc = ["Default Delivery Location","入库单位"];
var t__Tank = ["Tank","油罐"];

var t__Drawer = ["Drawer","油品调配公司"];
var t__Product = ["Product","油品"];

var t__Cust_Category = ["Category ", "客户类别"];
var t__Customer = ["Customer ", "入库油站"];

var t__Carrier = ["Carrier","承运商"];
var t__Tanker = ["Tanker","油槽车"];

var t__Loader = ["Loader","提油人"];
var t__Max_Cmpt = ["Lagest Tanker","最大车辆"];
var t__Max_Cmpt_Tanker = ["Tanker","油槽车"];
var t__Cmpt_Word = ["-Cmpt","仓"];

var t__ERP_Order = ["ERP Order No.","送货单号(ERP)"];
var t__Omega_Trip = ["Omega Trip No.","提油单号(Omega)"];

var t__From = ["From ","自"];
var t__To = ["To ","至"];
var t__Or = ["OR","或"];

var t__Others = ["Others","其他"];
var t__View_Report = ["View Report","查看报表"];

var t__Msg_Valid_Rpt_Type = ["Enter Valid Report Type","输入有效的报表类型"];
var t__Msg_Valid_Max_Cmpt = ["Enter Valid Max Compartment","输入有效的最大车辆"];
var t__Msg_Select_Rpt_Type = ["Select Report Type","选择报表类型"];
var t__Msg_Select_Rpt_Time_Base = ["Select Report Time Base","选择报表时段基准"];
var t__Select_A_Depot = ["Select A Depot","选择油库"];
var t__Select_A_Supplier = ["Select A Supplier","选择供应商"];
var t__Select_Carrier = ["Select Carrier","选择承运商"];
var t__Select_A_Carrier = ["Select A Carrier","选择承运商"];
var t__Select_A_Customer = ["Select A Customer","选择入库油站"];
var t__Select_A_Loader = ["Select A Loader","选择提油人"];
var t__Select_a_tanker = ["Select a tanker","选择油槽车"];
var t__Select_A_Carrier = ["Select A Carrier","选择承运商"];
var t__Msg_Valid_St_Date = ["Enter Start Date and Start Time earlier than End Date and End Time", "开始的日期和时间应该早于结束的日期和时间"];
var t__Msg_Valid_End_Date = ["Enter End Date and End Time later than Start Date and Start time","结束的日期和时间应该迟于开始的日期和时间"];
var t__Select_Start_Hours = ["Select Start Hours","选择开始小时"];
var t__Select_Start_Mints = ["Select Start Minutes","选择开始分钟"];
var t__Select_End_Hours = ["Select End Hours","选择结束小时"];
var t__Select_End_Mints = ["Select End Minutes","选择结束分钟"];
var t__View_All = ["View All", "查看所有信息" ];
var t__Add__Rpt__Details = ["Report Details", "报表详情"] ;
var t__FrmComplt = ["Complete and submit the following form , all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory", "填好并递交下表至新增运输设备,所有带 (<span style=\"COLOR: #FF0000;\">*</span>) 的项目是必填的"];
var t__TRIP_REPORT = ["TRIP REPORT","发油报表"];
var t__Select_Date = ["Select Date","选择日期"];

var t__Rpt_Type_Trip_Details = ["Customer Delivery Details","客户配送明细表"];
var t__Rpt_Type_Trip_Sum_Date = ["Customer Delivery Summary(Date-based)","客户配送汇总表（按日期）"];
var t__Rpt_Type_Trip_Sum_DelvLoc = ["Customer Delivery Summary(Company-based)","客户配送汇总表（按入库单位）"];
var t__Rpt_Type_Trip_Sum_Customer = ["Customer Delivery Summary(Customer-based)","客户配送汇总表（按入库油站）"];
var t__Rpt_Type_Trip_Sum_Bay = ["Customer Delivery Summary(Bay-based)","客户配送汇总表（按发油台）"];
var t__Rpt_Type_Trip_Sum_Meter = ["Customer Delivery Summary(Meter-based)","客户配送汇总表（按流量计）"];
var t__Rpt_Type_Trip_Sum_Tank = ["Customer Delivery Summary(Tank-based)","客户配送汇总表（按油罐）"];
var t__Rpt_Type_Trip_Sum_Supplier = ["Customer Delivery Summary(Supplier-based)","客户配送汇总表（按供应商）"];
var t__Rpt_Type_Trip_Sum_Drawer = ["Customer Delivery Summary(Drawer-based)","客户配送汇总表（按油品调配公司）"];
var t__Rpt_Type_Trip_Sum_Carrier = ["Customer Delivery Summary(Carrier-based)","客户配送汇总表（按承运商）"];
var t__Rpt_Type_Trip_Sum_Tanker = ["Customer Delivery Summary(Tanker-based)","客户配送汇总表（按油槽车）"];
var t__Rpt_Type_Trip_Sum_Maxcmpt = ["Customer Delivery Summary(Maxcmpt-based)","客户配送汇总表（按最大车辆）"];
var t__Rpt_Type_Trip_Sum_Loader = ["Customer Delivery Summary(Loader-based)","客户配送汇总表（按提油人）"];
var t__Rpt_Type_Trip_Sum_ErpNo = ["Customer Delivery Summary(ERP No-based)","客户配送汇总表（按ERP单号）"];
var t__Rpt_Type_Trip_Sum_TripNo = ["Customer Delivery Summary(Trip No-based)","客户配送汇总表（按提油单号）"];
var t__Rpt_Type_Trip_Sum_Additive = ["Customer Delivery Summary(Additive-based)","客户配送汇总表（按清净剂）"];

var t__Rpt_Type_Trip_Sum_Cmpy = ["Customer Delivery Summary(Company-based)","客户配送汇总表（分单位）"];

//var t__Rpt_Type_Meter_Sum = ["Metering Delivery Summary","流量计配送汇总表"];
var t__Rpt_Type_Meter_Sum = ["Metering Delivery Details","流量计配送明细表"];
var t__Rpt_Type_All_Load_Details = ["All Load Details","客户发油明细表"];

var rpt_type_jslst = [["",""], 
["0", ml(t__Rpt_Type_Trip_Details)], 
["1", ml(t__Rpt_Type_Trip_Sum_Date)], 
["2", ml(t__Rpt_Type_Trip_Sum_DelvLoc)], 

["3", ml(t__Rpt_Type_Trip_Sum_Customer)], 
["4", ml(t__Rpt_Type_Trip_Sum_Bay)], 
["5", ml(t__Rpt_Type_Trip_Sum_Meter)], 
["6", ml(t__Rpt_Type_Trip_Sum_Tank)], 
["7", ml(t__Rpt_Type_Trip_Sum_Supplier)], 
["8", ml(t__Rpt_Type_Trip_Sum_Drawer)], 
["9", ml(t__Rpt_Type_Trip_Sum_Carrier)], 
["10", ml(t__Rpt_Type_Trip_Sum_Tanker)], 
["11", ml(t__Rpt_Type_Trip_Sum_Maxcmpt)], 
["12", ml(t__Rpt_Type_Trip_Sum_Loader)], 
["13", ml(t__Rpt_Type_Trip_Sum_ErpNo)], 
["14", ml(t__Rpt_Type_Trip_Sum_TripNo)], 
["15", ml(t__Rpt_Type_Trip_Sum_Additive)], 

["98", ml(t__Rpt_Type_Meter_Sum)], 
["99", ml(t__Rpt_Type_All_Load_Details)]];

var t__Rpt_Time_Base_LoadStart = ["Load Start Time","开始发油时间"];
var t__Rpt_Time_Base_LoadEnd = ["Exit Time","出库时间"];
var t__Rpt_Time_Base_OmegaSchd = ["Omega Schedule Time","Omega开单时间"];
var t__Rpt_Time_Base_ERPSchd = ["ERP Verified Time","ERP验单时间"];

var rpt_timebase_jslst = [["",""], ["1", ml(t__Rpt_Time_Base_LoadStart)], ["2", ml(t__Rpt_Time_Base_LoadEnd)], ["3", ml(t__Rpt_Time_Base_OmegaSchd)], ["4", ml(t__Rpt_Time_Base_ERPSchd)]];


//  I think this was a mistake
//  addFrmhtml += ml(t__En_Date_Time)+" :\n";


var dateFormat = "yyyy-MM-dd";

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
  newPage += printHdr(newPage,updatePageTitle(curViewDetailState,pageTitle), lang);
  //local_HeadrHTML function is local function give 
  // the ability to append any thing to the current page
  newPage += local_HeadrHTML(newPage, lang);
  //getToolBar_HTML function of comm_HTML.js file responsible for  
  // outputting the tool bar
  //controls the search and print buttons as well
  newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
//newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),true, true);
  newPage +="<tr>\n";  
  newPage +="<td width=\"100%\">             \n";
  newPage +="<div class=\"content\" id=\"content\">\n";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";  
  //start after the global form
  // if OP is <=1 OR Higher than available options should always come to this view
  
  if (curViewDetailState <= opValues["viewReportFrm"] || curViewDetailState== opValues["submitReportFrm"] ) // view records of tank groups
  {
     newPage += displayRptFrm();
      
   
  }		
 
 
 
  
  // table for everything ends here
  newPage +="<\/tbody>\n";
  newPage +="<\/table>\n";
  newPage +="<\/div>\n";
  newPage +="</td>              \n";  
  newPage +="</tr>\n";
  
  newPage +="<script type=\"text/javascript\">\n";
  newPage +="var options1 = {\n";
  newPage +="script:\"/cgi-bin/en/load_scheds/tankers.cgi?carrier=&\",\n";
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
  //alert(newPage); 
	return(newPage);
  document.close();
  if (typeof writeBack != 'undefined')writeBack();

}
function displayRptFrm()
{
	var ProdList = "";
	var tankerInput = "";
	var OrderNoSwitch = "";
	var TripNoSwitch = "";
	var OrderRangeSwitch = "";
	var TripRangeSwitch = "";

	if((trmnl=="-1") && (terminal.length==2))
	{
		trmnl= terminal[1][0];
	}
	if ((suppCd == '-1' ||suppCd == '') && (drawer == '-1' ||drawer == '') )
	{
		ProdList = "disabled";
	}
	if (carr == '')
	{
		tankerInput = "disabled";
	}

	if (tanker == '-1' ||tanker == '')
	{
		tanker = "";
	}

	if (order_num == '-1' || order_num == '')
	{
		order_num = "";
		OrderRangeSwitch = "";
	}
	else
	{
		order_from = "";
		order_to = "";
		OrderRangeSwitch = "disabled";
	}

	if (trip_num == '-1' || trip_num == '')
	{
		trip_num = "";
		TripRangeSwitch = "";
	}
	else
	{
		trip_from = "";
		trip_to = "";
		TripRangeSwitch = "disabled";
	}

	if (order_from == '-1' || order_from == '')
	{
		order_from = "";
	}
	else
	{
		order_num = "";
		OrderNoSwitch = "disabled";
	}
	if (order_to == '-1' || order_to == '')
	{
		order_to = "";
	}
	else
	{
		order_num = "";
		OrderNoSwitch = "disabled";
	}
	if ( order_from == "" && order_to == "" )
	{
		OrderNoSwitch = "";
	}
	else
	{
		order_num = "";
		OrderNoSwitch = "disabled";
	}

	if (trip_from == '-1' || trip_from == '')
	{
		trip_from = "";
	}
	else
	{
		trip_num = "";
		TripNoSwitch = "disabled";
	}
	if (trip_to == '-1' || trip_to == '')
	{
		trip_to = "";
	}
	else
	{
		trip_num = "";
		TripNoSwitch = "disabled";
	}
	if ( trip_from == "" && trip_to == "" )
	{
		TripNoSwitch = "";
	}
	else
	{
		trip_num = "";
		TripNoSwitch = "disabled";
	}

	TripNoSwitch = "";
	TripRangeSwitch = "";
	OrderNoSwitch = "";
	OrderRangeSwitch = "";

	if (max_compartments == '-1' || max_compartments == '')
	{
		max_compartments = 9;
	}

	if (ftsize == '-1' || ftsize == '')
	{
		ftsize = 12;
	}
	if (rows == '-1' || rows == '')
	{
		rows = 30;
	}


	if (startDate == '-1' ||startDate == '')
	{
		var mystartDate=new Date();
		mystartDate.setDate(mystartDate.getDate()-7);
		var mystartyear = String(mystartDate.getFullYear());
		var mystartmonth = String((mystartDate.getMonth()+1)) ;
		var mystartday = String(mystartDate.getDate());
		if (mystartmonth.length==1)mystartmonth = "0"+mystartmonth;
		if (mystartday.length==1)mystartday = "0"+mystartday;

		//alert(mystartyear+"-"+mystartmonth+"-"+mystartday);
		startDate = mystartyear+"-"+mystartmonth+"-"+mystartday;
	}

	if (endDate == '-1' ||endDate == '')
	{
		var myendDate=new Date();
		myendDate.setDate(myendDate.getDate());
		var myendyear = String(myendDate.getFullYear());
		var myendmonth = String((myendDate.getMonth()+1)) ;
		var myendday = String(myendDate.getDate());
		if (myendmonth.length==1)myendmonth = "0"+myendmonth;
		if (myendday.length==1)myendday = "0"+myendday;
		endDate = myendyear+"-"+myendmonth+"-"+myendday;
	}


	var addFrmhtml ="";
	addFrmhtml += fieldst_HTML(ml(t__Add__Rpt__Details));
	addFrmhtml += " <div class=\"adminform\">\n";
	addFrmhtml +="<table width=\"100%\">\n";
	addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",ml(t__FrmComplt)); 


	addFrmhtml += "		<form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"trip_report.cgi\" onSubmit=\"return ActionDeterminator(this)\">\n";

	//addFrmhtml += trmnl_field("type=\"hidden\"");

	addFrmhtml +="		<tr>\n";
	addFrmhtml +="		<td class=\"infotext\" width=\"100%\">\n";
	addFrmhtml +="			<table width=\"100%\">\n";


	// 1st row
	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Rpt_Type)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";

	addFrmhtml += "<select id=\"rpt_type\" name=\"rpt_type\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Msg_Select_Rpt_Type)+"\"> \n";
	addFrmhtml += displayDropList(rpt_type, rpt_type_jslst,ml(t__Msg_Select_Rpt_Type));

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Rpt_Time_Base)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";

	addFrmhtml += "<select id=\"rpt_timebase\" name=\"rpt_timebase\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Msg_Select_Rpt_Time_Base)+"\"> \n";
	addFrmhtml += displayDropList(rpt_timebase, rpt_timebase_jslst,ml(t__Msg_Select_Rpt_Time_Base));

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";

	addFrmhtml +="			</tr>\n";

	//end of 1st row
	//2nd row

	addFrmhtml +="			<tr>\n";
	addFrmhtml += "			<td colspan=\"4\">\n";
	addFrmhtml += "				<table>\n";
	addFrmhtml += "				<tr>\n";
	addFrmhtml += "				<td class=\"infotextheading\" width=\"140\">\n";
	addFrmhtml += ml(t__St_Date_Time)+" :\n";
	addFrmhtml += "				</td>\n";
	addFrmhtml += "				<td width=\"5\" align=\"center class=\"infotext\">\n";
	addFrmhtml += "					<span class=\"mandatory\">*</span>\n";
	addFrmhtml += "				</td>\n";
	addFrmhtml += "				<td>\n";
	addFrmhtml += "					<input type=\"text\" name=\"startDate\" value=\""+startDate+"\" dataType=\"Require\" msg=\""+ml(t__Msg_Valid_St_Date)+"\" readonly/>\n";
	addFrmhtml += dateURL_HTML("document.forms[0].startDate", "date_anchor1",dateFormat,ml(t__Select_Date));
	addFrmhtml += "				</td>\n";
	//start putting time
	addFrmhtml +="				<td >\n";
	addFrmhtml += "<select name='start_hour' id ='start_hour' class='smallselect' msg=\""+ml(t__Select_Start_Hours)+"\">\n";
	if(start_hour == '-1' || start_hour=='')
	{
		addFrmhtml += droplistHour('start_hour', ml(t__Select_Start_Hours),'00');
	}
	else
	{
		addFrmhtml += droplistHour('start_hour', ml(t__Select_Start_Hours),start_hour);
	}
	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<td >\n";
	addFrmhtml +=": &nbsp;";
	addFrmhtml += "<select name='start_min' id='start_min' class='smallselect' dataType='Require' msg=\""+ml(t__Select_Start_Mints)+"\">\n";
	if(start_min == '-1' || start_min=='')
	{
		addFrmhtml += droplistMin('start_min', ml(t__Select_Start_Mints),'00');
	}
	else
	{
		addFrmhtml += droplistMin('start_min', ml(t__Select_Start_Mints),start_min);            
	}

	addFrmhtml +="				<\/td>\n";
	//End putting time
	addFrmhtml += "				</tr>\n";
	addFrmhtml += "				</table>\n";

	addFrmhtml +="			</td>\n"; 
	addFrmhtml +="			</tr>\n";

	//end of 2nd row
	//3rd row

	addFrmhtml +="			<tr>\n";
	addFrmhtml += "			<td colspan=\"4\">\n";
	addFrmhtml += "				<table>\n";
	addFrmhtml += "				<tr>\n";
	addFrmhtml += "				<td class=\"infotextheading\" width=\"140\">\n";
	addFrmhtml += ml(t__En_Date_Time)+" :\n";
	addFrmhtml += "				</td>\n";
	addFrmhtml += "				<td width=\"5\" align=\"center class=\"infotext\">\n";
	addFrmhtml += "					<span class=\"mandatory\">*</span>\n";
	addFrmhtml += "				</td>\n";
	addFrmhtml += "				<td>\n";
	addFrmhtml += "					<input type=\"text\" name=\"endDate\" value=\""+endDate+"\" dataType=\"CompareDate\" to=\"startDate\" operator=\"GreaterThanEqual\" msg=\""+ml(t__Msg_Valid_End_Date)+"\" readonly/>\n";
	addFrmhtml += dateURL_HTML("document.forms[0].endDate", "date_anchor2",dateFormat,ml(t__Select_Date));
	addFrmhtml += "				</td>\n";
	//start putting time
	addFrmhtml +="				<td >\n";

	addFrmhtml += "<select name='end_hour' id ='end_hour' class='smallselect' dataType='Require' msg=\""+ml(t__Select_End_Hours)+"\">\n";
	if(end_hour == '-1' || end_hour=='')
	{
		addFrmhtml += droplistHour('end_hour', ml(t__Select_End_Hours),'00');
	}
	else
	{
		addFrmhtml += droplistHour('end_hour', ml(t__Select_End_Hours),end_hour);
	}
	addFrmhtml +="				<\/td>\n";
	addFrmhtml +=				"<td >\n";
	addFrmhtml +=": &nbsp;";
	addFrmhtml += "<select name='end_min' id='end_min' class='smallselect' dataType='Require' msg=\""+ml(t__Select_End_Mints)+"\">\n";
	if(end_min == '-1' || end_min=='')
	{
		addFrmhtml += droplistMin('end_min', ml(t__Select_End_Mints),'00');
	}
	else
	{
		addFrmhtml += droplistMin('end_min', ml(t__Select_End_Mints),end_min);          
	}

	addFrmhtml +="				<\/td>\n";
	//End putting time
	addFrmhtml += "				</tr>\n";
	addFrmhtml += "				</table>\n";

	addFrmhtml +="			</td>\n"; 
	addFrmhtml +="			</tr>\n";

	// end of the 3rd row
	// 4th row

	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Depot)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";

	addFrmhtml += "<select id=\"trmnl\" name=\"trmnl\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_A_Depot)+"\"> \n";

	addFrmhtml += displayDropList(trmnl, terminal,ml(t__Select_A_Depot));

	addFrmhtml +="				</td>\n";
	addFrmhtml +="				</tr>\n";
	addFrmhtml +="				</table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Supplier)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "<select id=\"suppCd\" name=\"suppCd\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_A_Supplier)+"\" onchange=\"submit();\"> \n";
	addFrmhtml += displayDropList(suppCd, supplier,ml(t__Select_A_Supplier));

	addFrmhtml +="				</td>\n";
	addFrmhtml +="				</tr>\n";
	addFrmhtml +="				</table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			</tr>\n";

	//end of 4th row
	//5th row

	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";
	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Bay)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "  <select id=\"baycode\" name=\"baycode\" class=\"smallselect\" dataType=\"Require\" msg=\""+(ml(t__Select)+" "+ml(t__Bay))+"\" > \n";

	if (g.isMng=='Y')
	{
		addFrmhtml += displayDropList_any_All(baycode, bay_jslst,(ml(t__Select)+" "+ml(t__Bay)), 'A');
	}
	else
	{
		addFrmhtml += displayDropList_any_All(baycode, bay_jslst,(ml(t__Select)+" "+ml(t__Bay)), 'D');
	}
//	addFrmhtml += displayDropList(baycode, bay_jslst, (ml(t__Select)+" "+ml(t__Bay)) );

	addFrmhtml +="				</td>\n";
	addFrmhtml +="				</tr>\n";
	addFrmhtml +="				</table>\n";
	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Meter)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "  <select id=\"mtrcode\" name=\"mtrcode\" class=\"smallselect\" dataType=\"Require\" msg=\""+(ml(t__Select)+" "+ml(t__Meter))+"\" "+"\/> \n";

	if (g.isMng=='Y')
	{
		addFrmhtml += displayDropList_any_All(mtrcode, meter_jslst,(ml(t__Select)+" "+ml(t__Meter)), 'A');
	}
	else
	{
		addFrmhtml += displayDropList_any_All(mtrcode, meter_jslst,(ml(t__Select)+" "+ml(t__Meter)), 'D');
	}

//	addFrmhtml += displayDropList(mtrcode, meter_jslst, (ml(t__Select)+" "+ml(t__Meter)) );

	addFrmhtml +="				</td>\n";
	addFrmhtml +="				</tr>\n";
	addFrmhtml +="				</table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			</tr>\n";

	//end of 5th row
	//6th row

	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";
	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Def_Dliver_Loc)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "  <select id=\"delivloc\" name=\"delivloc\" class=\"smallselect\" dataType=\"Require\" msg=\""+(ml(t__Select)+" "+ml(t__Def_Dliver_Loc))+"\" > \n";
	update_DeliverLoc_Array(delvloc_jslst);	
	if (g.isMng=='Y')
	{
		addFrmhtml += displayDropList_any_All(delivloc, delvloc_jslst,(ml(t__Select)+" "+ml(t__Def_Dliver_Loc)), 'A');
	}
	else
	{
		addFrmhtml += displayDropList_any_All(delivloc, delvloc_jslst,(ml(t__Select)+" "+ml(t__Def_Dliver_Loc)), 'D');
	}

	addFrmhtml +="				</td>\n";
	addFrmhtml +="				</tr>\n";
	addFrmhtml +="				</table>\n";
	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Tank)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "  <select id=\"tank\" name=\"tank\" class=\"smallselect\" dataType=\"Require\" msg=\""+(ml(t__Select)+" "+ml(t__Tank))+"\" > \n";

	if (g.isMng=='Y')
	{
		addFrmhtml += displayDropList_any_All(tank, tank_jslst,(ml(t__Select)+" "+ml(t__Tank)), 'A');
	}
	else
	{
		addFrmhtml += displayDropList_any_All(tank, tank_jslst,(ml(t__Select)+" "+ml(t__Tank)), 'D');
	}

	addFrmhtml +="				</td>\n";
	addFrmhtml +="				</tr>\n";
	addFrmhtml +="				</table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			</tr>\n";

	//end of 6th row
	//7th row

	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";
	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Drawer)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "  <select id=\"drawer\" name=\"drawer\" class=\"smallselect\" dataType=\"Require\" msg=\""+(ml(t__Select)+" "+ml(t__Drawer))+"\" onchange=\"submit();\" > \n";

	if (g.isMng=='Y')
	{
		addFrmhtml += displayDropList_any_All(drawer, drawer_jslst,(ml(t__Select)+" "+ml(t__Drawer)), 'A');
	}
	else
	{
		addFrmhtml += displayDropList_any_All(drawer, drawer_jslst,(ml(t__Select)+" "+ml(t__Drawer)), 'D');
	}

	addFrmhtml +="				</td>\n";
	addFrmhtml +="				</tr>\n";
	addFrmhtml +="				</table>\n";
	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Product)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "  <select id=\"prodCd\" name=\"prodCd\" class=\"smallselect\" dataType=\"Require\" msg=\""+(ml(t__Select)+" "+ml(t__Product))+"\" "+ProdList+"\/> \n";

	if (g.isMng=='Y')
	{
		addFrmhtml += displayDropList_any_All(prodCd, prod_jslst,(ml(t__Select)+" "+ml(t__Product)), 'A');
	}
	else
	{
		addFrmhtml += displayDropList_any_All(prodCd, prod_jslst,(ml(t__Select)+" "+ml(t__Product)), 'D');
	}

	addFrmhtml +="				</td>\n";
	addFrmhtml +="				</tr>\n";
	addFrmhtml +="				</table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			</tr>\n";

	//end of 7th row
	//8th row

	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Cust_Category)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "<select id=\"cust_category\" name=\"cust_category\" class=\"smallselect\" dataType=\"Require\" msg=\""+(ml(t__Select)+" "+ml(t__Cust_Category))+"\" onchange=\"submit();\"> \n";
	if (g.isMng=='Y')
	{
		addFrmhtml += displayDropList_any_All(cust_category, cust_category_jslst,(ml(t__Select)+" "+ml(t__Cust_Category)), 'A');
	}
	else
	{
		addFrmhtml += displayDropList_any_All(cust_category, cust_category_jslst,(ml(t__Select)+" "+ml(t__Cust_Category)), 'D');
	}

	addFrmhtml +="				</td>\n";
	addFrmhtml +="				</tr>\n";
	addFrmhtml +="				</table>\n";

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
	addFrmhtml += "						<input type=\"text\" name=\"cust_acct\" id=\"cust_acct\" value=\"\" style=\"FONT-SIZE:1.00em\" msg=\""+(ml(t__Select)+" "+ml(t__Customer))+"\" / >\n"; 
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

	//end of 8th row
	//9th row

	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";
	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Carrier)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "<select NAME=\"carr\" id=\"carr\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_Carrier)+"\" onchange=\"checkCarrier();\" >\n";
	if (g.isMng=='Y')
	{
		addFrmhtml += displayDropList_any_All(carr, carrier, ml(t__Select_A_Carrier), 'A');
	}
	else
	{
		addFrmhtml += displayDropList_any_All(carr, carrier, ml(t__Select_A_Carrier), 'D');
	}

	addFrmhtml +="				</td>\n";
	addFrmhtml +="				</tr>\n";
	addFrmhtml +="				</table>\n";  
	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml += "				<table>\n";
	addFrmhtml += "				<tr>\n";
	addFrmhtml += "				<td class=\"infotextheading\" width=\"140\">\n";
	addFrmhtml += ml(t__Tanker)+":\n";
	addFrmhtml += "				</td>\n";
	addFrmhtml += "				<td width=\"5\" align=\"center class=\"infotext\">\n";
	addFrmhtml += "					&nbsp;\n";
	addFrmhtml += "				</td>\n";
	addFrmhtml += "				<td>\n";

	addFrmhtml += "					<table class=\"NewActionBaseTable\">\n";
	addFrmhtml += "					<tbody>\n";
	addFrmhtml += "					<tr>\n";
	addFrmhtml += "					<td class=\"popupLinkrow\">\n";
	addFrmhtml += "						<input type=\"text\" name=\"tanker\" id=\"tanker\" value=\""+tanker+"\" style=\"FONT-SIZE:1.00em\" msg=\""+ml(t__Select_a_tanker)+"\" "+tankerInput+" />\n"; 
	addFrmhtml += "					</td>\n";
	addFrmhtml += "					<td width=\"15\">\n";
	addFrmhtml += "						<img src=\"/images/dropimage.gif\" width=\"15\" height=\"16\" onclick=\"if(document.addNew.carr.value!=''){as1.doAjaxRequest();}else{alert('"+ml(t__Select_Carrier)+"');}\">\n";
	addFrmhtml += "					</td>\n";
	addFrmhtml += "					</tr>\n";
	addFrmhtml += "					</tbody>\n";
	addFrmhtml += "					</table>\n";

	addFrmhtml += "				</td>\n";
	addFrmhtml += "				</tr>\n";

	addFrmhtml += "				</table>\n";    

	addFrmhtml +="			</td>\n";  
	addFrmhtml +="			</tr>\n";

	//end of 9th row
	//10th row

	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Loader)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "<select id=\"driver_code\" name=\"driver_code\" class=\"smallselect\" dataType=\"Require\" msg=\""+(ml(t__Select)+" "+ml(t__Loader))+"\" > \n";
	if (g.isMng=='Y')
	{
		addFrmhtml += displayDropList_any_All(driver_code, driver_jslst,(ml(t__Select)+" "+ml(t__Loader)), 'A');
	}
	else
	{
		addFrmhtml += displayDropList_any_All(driver_code, driver_jslst,(ml(t__Select)+" "+ml(t__Loader)), 'D');
	}

	addFrmhtml +="				</td>\n";
	addFrmhtml +="				</tr>\n";
	addFrmhtml +="				</table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Max_Cmpt)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "<select id=\"maxcmpt\" name=\"maxcmpt\" class=\"smallselect\" dataType=\"Require\" msg=\"\" > \n";

	var max_compt_jslst;
	var cid;

	max_compt_jslst= new Array();
	for (i=0; i<=max_compartments; i++)
	{
		max_compt_jslst[i] = new Array();
		if (i == 0)
		{
			max_compt_jslst[i][0] = "";
			max_compt_jslst[i][1] = "";
		}
		else
		{
			max_compt_jslst[i][0] = i;
			max_compt_jslst[i][1] = i + ml(t__Cmpt_Word);
		}
	}
	
	if (g.isMng=='Y')
	{
		addFrmhtml += displayDropList_any_All(maxcmpt, max_compt_jslst,"", 'A');
	}
	else
	{
		addFrmhtml += displayDropList_any_All(maxcmpt, max_compt_jslst,"", 'D');
	}

	addFrmhtml +="<span class=\"infotext\">"+ml(t__Max_Cmpt_Tanker)+"</span>";
	addFrmhtml +="				</td>\n";
	addFrmhtml +="				</tr>\n";
	addFrmhtml +="				</table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			</tr>\n";

	//end of 10th row
	//11th row

	addFrmhtml +="			<tr>\n";
	addFrmhtml += "			<td colspan=\"4\">\n";
	addFrmhtml += "				<table>\n";
	addFrmhtml += "				<tr>\n";
	addFrmhtml += "				<td class=\"infotextheading\" width=\"140\">\n";
	addFrmhtml += ml(t__ERP_Order)+" :\n";
	addFrmhtml += "				</td>\n";

	addFrmhtml += "				<td>\n";
	addFrmhtml += "					<input type=\"text\" name=\"order_num\" id=\"order_num\" value=\"" + order_num + "\" size=\"20\" maxLength=\"20\" " + ">\n";
	addFrmhtml += "				</td>\n";
	addFrmhtml += "				<td class=\"infotextheading\">&nbsp;&nbsp;&nbsp;\n";
	addFrmhtml += ml(t__Or) + "&nbsp;&nbsp;\n";
	addFrmhtml += "				</td>\n";

	addFrmhtml += "				<td class=\"infotextheading\">\n";
	addFrmhtml += ml(t__From) + " \n";
	addFrmhtml += "				</td>\n";

	addFrmhtml += "				<td>\n";
	addFrmhtml += "					<input type=\"text\" name=\"order_from\" id=\"order_from\" value=\"" + order_from + "\" size=\"20\" maxLength=\"20\" " + ">\n";
	addFrmhtml += "				</td>\n";
	addFrmhtml += "				<td class=\"infotextheading\">\n";
	addFrmhtml += ml(t__To) + " \n";
	addFrmhtml += "				</td>\n";
	addFrmhtml += "				<td>\n";

	addFrmhtml += "					<input type=\"text\" name=\"order_to\" id=\"order_to\" value=\"" + order_to + "\" size=\"20\" maxLength=\"20\" " + ">\n";
	addFrmhtml += "				</td>\n";
	addFrmhtml += "				</tr>\n";
	addFrmhtml += "				</table>\n";

	addFrmhtml +="			</td>\n"; 
	addFrmhtml +="			</tr>\n";

	//end of 11th row
	//12th row

	addFrmhtml +="			<tr>\n";
	addFrmhtml += "			<td colspan=\"4\">\n";
	addFrmhtml += "				<table>\n";
	addFrmhtml += "				<tr>\n";
	addFrmhtml += "				<td class=\"infotextheading\" width=\"140\">\n";
	addFrmhtml += ml(t__Omega_Trip)+" :\n";
	addFrmhtml += "				</td>\n";
	addFrmhtml += "				<td>\n";
	addFrmhtml += "					<input type=\"text\" name=\"trip_num\" id=\"trip_num\" value=\"" + trip_num + "\" size=\"20\" maxLength=\"20\" " + ">\n";
	addFrmhtml += "				</td>\n";
	addFrmhtml += "				<td class=\"infotextheading\">&nbsp;&nbsp;&nbsp;\n";
	addFrmhtml += ml(t__Or) + "&nbsp;&nbsp;\n";
	addFrmhtml += "				</td>\n";

	addFrmhtml += "				<td class=\"infotextheading\">\n";
	addFrmhtml += ml(t__From) + " \n";
	addFrmhtml += "				</td>\n";
	addFrmhtml += "				<td>\n";

	addFrmhtml += "					<input type=\"text\" name=\"trip_from\" id=\"trip_from\" value=\"" + trip_from + "\" size=\"20\" maxLength=\"20\" " + ">\n";
	addFrmhtml += "				</td>\n";
	addFrmhtml += "				<td class=\"infotextheading\">\n";
	addFrmhtml += ml(t__To) + " \n";
	addFrmhtml += "				</td>\n";
	addFrmhtml += "				<td>\n";

	addFrmhtml += "					<input type=\"text\" name=\"trip_to\" id=\"trip_to\" value=\"" + trip_to + "\" size=\"20\" maxLength=\"20\" " + ">\n";
	addFrmhtml += "				</td>\n";
	addFrmhtml += "				</tr>\n";
	addFrmhtml += "				</table>\n";

	addFrmhtml +="			</td>\n"; 
	addFrmhtml +="			</tr>\n";

	//end of 12th row
	//13th row

	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Rpt_Font_Size)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">&nbsp;</span>\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "<select id=\"ftsize\" name=\"ftsize\" class=\"smallselect\" dataType=\"Require\" msg=\"\" > \n";

	var fontsize_jslst;
	fontsize_jslst= new Array();
	for (i=0; i<=48; i++)
	{
		fontsize_jslst[i] = new Array();
		if (i == 0)
		{
			fontsize_jslst[i][0] = "";
			fontsize_jslst[i][1] = "";
		}
		else
		{
			fontsize_jslst[i][0] = i;
			fontsize_jslst[i][1] = i;
		}
	}
	addFrmhtml += displayDropList(ftsize, fontsize_jslst, (ml(t__Select)+" "+ml(t__Rpt_Font_Size)) );


	addFrmhtml +="				</td>\n";
	addFrmhtml +="				</tr>\n";
	addFrmhtml +="				</table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",ml(t__Rpt_Page_Rows)+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">&nbsp;</span>\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "<select id=\"rows\" name=\"rows\" class=\"smallselect\" dataType=\"Require\" msg=\"\" > \n";

	var rows_jslst;
	var row_first;
	rows_jslst= new Array();
	for (i=0; i<=80; i++)
	{
		rows_jslst[i] = new Array();
		if (i == 0)
		{
			rows_jslst[i][0] = "";
			rows_jslst[i][1] = "";
		}
		else
		{
			rows_jslst[i][0] = i+20;
			rows_jslst[i][1] = i+20;
		}
	}
	addFrmhtml += displayDropList(rows, rows_jslst, (ml(t__Select)+" "+ml(t__Rpt_Page_Rows)) );

	addFrmhtml +="				</td>\n";
	addFrmhtml +="				</tr>\n";
	addFrmhtml +="				</table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			</tr>\n";

	//end of 13th row


	addFrmhtml +="			</table>\n";
//	addFrmhtml +="          <td width=\"50%\">\n";
	addFrmhtml +="		</td>\n";
	addFrmhtml +="		</tr>\n";

	addFrmhtml +=" <script>\n";
	addFrmhtml +="var testpopup = new PopupWindow();\n";
	addFrmhtml +="testpopup.setSize(700,500);\n";
	addFrmhtml +="testpopup.setWindowProperties('toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised,dependent,titlebar=no');\n";
	addFrmhtml +="testpopup.autoHide();\n";									
	addFrmhtml +=" <\/script>\n";
	addFrmhtml +="<tr>\n";
	addFrmhtml +=" <td align=\"center\" class=\"infotext\" width=\"100%\">\n";
	addFrmhtml +=" <input type=\"button\" value=\""+ ml(t__View_Report)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" onClick=\"ActionDeterminator(testpopup, 'anchor1', 'trip_report_popup.cgi', document.forms[0]);return false;\" NAME=\"anchor1\" ID=\"anchor1\"/>";
	addFrmhtml +="&nbsp;\n";
	addFrmhtml +=" <input type=\"reset\" value=\"" + ml( t__Reset) + "\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
	addFrmhtml +=" </td>\n";
	addFrmhtml +=" </tr>\n";
	addFrmhtml +="							</table>\n";
	addFrmhtml += "            <\/div>\n";
	addFrmhtml += "<input type=\"hidden\" name=\"startDateTime\"  id=\"startDateTime\" value=\"\">\n";
	addFrmhtml += "<input type=\"hidden\" name=\"endDateTime\"    id=\"endDateTime\" value=\"\">\n";
	addFrmhtml +=op_field (opValues["submitReportFrm"]);
	addFrmhtml += "                    </form>\n";                      
	addFrmhtml += fieldstFoot_HTML();

	return addFrmhtml;
}

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
function trmnl_field(attr)
{
  var fieldHTML ="";
  fieldHTML +="<input name=\"trmnl\" id=\"trmnl\" value=\""+trmnl+"\" "+attr+" >\n";
  return fieldHTML;
}
function backToBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   
    
   if((op==opValues["insertAddressForm"] || opValues["modifyAddressForm"] || (op==opValues["viewAddress"])) && (priv>=5))
   {
       
    btn_HTML += "&nbsp; "+btnLocation_HTML("justChaneMyLocation('address.cgi?pg='+pg); ", otherText["btn_bakto_addresses"]);
    
   }
  
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}
function addNewBtn_HTML ()
{
  var btn_HTML = "";
  if(priv>=7)
  {
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   btn_HTML += btnLocation_HTML("justChaneMyLocation('address.cgi?op=7'); ", otherText["btn_addNew"]);
   if( (addrCode!="-1" && (addrCode!="")) && (priv>=5))
   {
       
      btn_HTML += "&nbsp; "+btnLocation_HTML("justChaneMyLocation('address.cgi?pg='+pg); ", otherText["btn_bakto_addresses"]);
    
   }

   if(priv>=5 && (addrKey!="-1" && addrKey!="") )
   {
	   btn_HTML += btnLocation_HTML("justChaneMyLocation('?'); ", otherText["btn_view_All"]);
   }



   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
  }
   return btn_HTML;
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
function droplistHour(name, msg,defaultValue)
{
	var defaultValue;
	var time="";
//	time +=alert(selectedVaule);
	time += " <option value='"+defaultValue+"'selected>"+defaultValue+"</option>\n";
	time += "	<option value=\"00\">00</option>\n";
	time += "	<option value=\"01\">01</option>\n";
	time += "	<option value=\"02\">02</option>\n";
	time += "	<option value=\"03\">03</option>\n";
	time += "	<option value=\"04\">04</option>\n";
	time += "	<option value=\"05\">05</option>\n";
	time += "	<option value=\"06\">06</option>\n";
	time += "	<option value=\"07\">07</option>\n";
	time += "	<option value=\"08\">08</option>\n";
	time += "	<option value=\"09\">09</option>\n";
	time += "	<option value=\"10\">10</option>\n";
	time += "	<option value=\"11\">11</option>\n";
	time += "	<option value=\"12\">12</option>\n";
	time += "	<option value=\"13\">13</option>\n";
	time += "	<option value=\"14\">14</option>\n";
	time += "	<option value=\"15\">15</option>\n";
	time += "	<option value=\"16\">16</option>\n";
	time += "	<option value=\"17\">17</option>\n";
	time += "	<option value=\"18\">18</option>\n";
	time += "	<option value=\"19\">19</option>\n";
	time += "	<option value=\"20\">20</option>\n";
	time += "	<option value=\"21\">21</option>\n";
	time += "	<option value=\"22\">22</option>\n";
	time += "	<option value=\"23\">23</option>\n";	
	time += "</select>\n";
	
	return time;
}

function droplistMin(name, msg,selectedValue)
{
	var selectedValue;
	var minute="";
	minute += " <option value='"+selectedValue+"'selected>"+selectedValue+"</option>\n";
	minute += "	<option value=\"00\">00</option>\n";
	minute += "	<option value=\"01\">01</option>\n";
	minute += "	<option value=\"02\">02</option>\n";
	minute += "	<option value=\"03\">03</option>\n";
	minute += "	<option value=\"04\">04</option>\n";
	minute += "	<option value=\"05\">05</option>\n";
	minute += "	<option value=\"06\">06</option>\n";
	minute += "	<option value=\"07\">07</option>\n";
	minute += "	<option value=\"08\">08</option>\n";
	minute += "	<option value=\"09\">09</option>\n";
	minute += "	<option value=\"10\">10</option>\n";
	minute += "	<option value=\"11\">11</option>\n";
	minute += "	<option value=\"12\">12</option>\n";
	minute += "	<option value=\"13\">13</option>\n";
	minute += "	<option value=\"14\">14</option>\n";
	minute += "	<option value=\"15\">15</option>\n";
	minute += "	<option value=\"16\">16</option>\n";
	minute += "	<option value=\"17\">17</option>\n";
	minute += "	<option value=\"18\">18</option>\n";
	minute += "	<option value=\"19\">19</option>\n";
	minute += "	<option value=\"20\">20</option>\n";
	minute += "	<option value=\"21\">21</option>\n";
	minute += "	<option value=\"22\">22</option>\n";
	minute += "	<option value=\"23\">23</option>\n";	
	minute += "	<option value=\"24\">24</option>\n";
	minute += "	<option value=\"25\">25</option>\n";
	minute += "	<option value=\"26\">26</option>\n";
	minute += "	<option value=\"27\">27</option>\n";	
	minute += "	<option value=\"28\">28</option>\n";
	minute += "	<option value=\"29\">29</option>\n";
	minute += "	<option value=\"30\">30</option>\n";
	minute += "	<option value=\"31\">31</option>\n";	
	minute += "	<option value=\"32\">32</option>\n";
	minute += "	<option value=\"33\">33</option>\n";
	minute += "	<option value=\"34\">34</option>\n";
	minute += "	<option value=\"35\">35</option>\n";
	minute += "	<option value=\"36\">36</option>\n";	
	minute += "	<option value=\"37\">37</option>\n";
	minute += "	<option value=\"38\">38</option>\n";
	minute += "	<option value=\"39\">39</option>\n";	
	minute += "	<option value=\"40\">40</option>\n";	
	minute += "	<option value=\"41\">41</option>\n";
	minute += "	<option value=\"42\">42</option>\n";	
	minute += "	<option value=\"43\">43</option>\n";
	minute += "	<option value=\"44\">44</option>\n";	
	minute += "	<option value=\"45\">45</option>\n";
	minute += "	<option value=\"46\">46</option>\n";	
	minute += "	<option value=\"47\">47</option>\n";
	minute += "	<option value=\"48\">48</option>\n";	
	minute += "	<option value=\"49\">49</option>\n";
	minute += "	<option value=\"50\">50</option>\n";	
	minute += "	<option value=\"51\">51</option>\n";
	minute += "	<option value=\"52\">52</option>\n";	
	minute += "	<option value=\"53\">53</option>\n";
	minute += "	<option value=\"54\">54</option>\n";	
	minute += "	<option value=\"55\">55</option>\n";
	minute += "	<option value=\"56\">56</option>\n";	
	minute += "	<option value=\"57\">57</option>\n";
	minute += "	<option value=\"58\">58</option>\n";	
	minute += "	<option value=\"59\">59</option>\n";
	minute += "</select>\n";
	return minute;
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
  newPage +="<SCRIPT src=\"/"+lang+"/js/next.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/"+lang+"/js/CalendarPopup.js\"></SCRIPT>\n";
  newPage +="<script>\n";
  newPage +="	var cal = new CalendarPopup();\n";
  newPage +="	cal.showYearNavigation();\n";
  newPage +="function ActionDeterminator(whichObject, whichPopup, whichFile, myobject)\n";
  newPage +="{\n";
  newPage +=" var isFormValid = false;\n"; 
  newPage +=" isFormValid = submitmyform(myobject);\n"; 
  newPage +="	if(isFormValid==true)\n";
  newPage +=" {\n";
  
  //all the variables set here and then show the pop up
  newPage +="   myTempTrmn = document.addNew.trmnl.value;\n";
  newPage +="   myTempRptType =document.addNew.rpt_type.value;\n";
  newPage +="   myTempRptTimeBase =document.addNew.rpt_timebase.value;\n";
  newPage +="   myTempsuppCd =document.addNew.suppCd.value;\n";
  newPage +="   myTempCustCtegory = document.addNew.cust_category.value;\n";
  newPage +="   myTempCustomer = document.addNew.cust_acct.value;\n";
  newPage +="   myTempDriver = document.addNew.driver_code.value;\n";

  newPage +="   myTempDelivLoc = document.addNew.delivloc.value;\n";
  newPage +="   myTempCarr =document.addNew.carr.value;\n";
  newPage +="   myTempTanker =document.addNew.tanker.value;\n";
  newPage +="   myTempProdCd =document.addNew.prodCd.value;\n";

  newPage +="   myTempBayCode =document.addNew.baycode.value;\n";
  newPage +="   myTempMtrCode =document.addNew.mtrcode.value;\n";
  newPage +="   myTempMaxCmpt = document.addNew.maxcmpt.value;\n";
  
  newPage +="   myTempDrawer = document.addNew.drawer.value;\n";
  newPage +="   myTempTank = document.addNew.tank.value;\n";

  newPage +="   myTempOrderFrom = document.addNew.order_from.value;\n";
  newPage +="   myTempOrderTo = document.addNew.order_to.value;\n";
  newPage +="   myTempTripFrom = document.addNew.trip_from.value;\n";
  newPage +="   myTempTripTo = document.addNew.trip_to.value;\n";
  newPage +="   myTempOrderNum = document.addNew.order_num.value;\n";
  newPage +="   myTempTripNum = document.addNew.trip_num.value;\n";

  newPage +="   myTempRptFontSize = document.addNew.ftsize.value;\n";
  newPage +="   myTempRptPageRows = document.addNew.rows.value;\n";

  //start date variables
  newPage +="   myTempStartDate =document.addNew.startDate.value;\n";
  newPage +="   myTempStartHr =document.addNew.start_hour.value;\n";
  newPage +="   myTempStartMin =document.addNew.start_min.value;\n";
  
  //end date variables
  newPage +="   myTempEndDate =document.addNew.endDate.value;\n";
  newPage +="   myTempEndHr =document.addNew.end_hour.value;\n";
  newPage +="   myTempEndMin =document.addNew.end_min.value;\n"; 
  
  newPage +="   myTempSDate = document.addNew.startDate.value;\n";
  newPage +="   myTempSDate +=' '+document.addNew.start_hour.value;\n";
  newPage +="   myTempSDate +=':' +document.addNew.start_min.value;\n";
  
  newPage +="   myTempEDate = document.addNew.endDate.value;\n";
  newPage +="   myTempEDate +=' '+document.addNew.end_hour.value;\n";
  newPage +="   myTempEDate +=':' +document.addNew.end_min.value;\n";
  
//  newPage +="   alert('myTempEDate '+myTempEDate);\n";
//  newPage +="   alert('myTempSDate '+myTempSDate);\n";
  
  
  newPage +="   document.addNew.startDateTime.value = myTempSDate;\n"; 
  newPage +="   document.addNew.endDateTime.value   = myTempEDate;\n";
  newPage +="   document.addNew.action = 'trip_report_popup.cgi';\n";

  newPage +="   myURL = whichFile + '?trmnl='+myTempTrmn\n";
  newPage +="   myURL += '&rpt_type='+encodeURI(myTempRptType)\n";
  newPage +="   myURL += '&rpt_timebase='+encodeURI(myTempRptTimeBase)\n";
  newPage +="   myURL += '&suppCd='+encodeURI(myTempsuppCd)\n";
  newPage +="   myURL += '&cust_category='+myTempCustCtegory\n";
  newPage +="   myURL += '&cust_acct='+myTempCustomer\n";
  newPage +="   myURL += '&driver_code='+myTempDriver\n";
  
 
  newPage +="   myURL += '&delivloc='+encodeURI(myTempDelivLoc)\n";
  newPage +="   myURL += '&carr='+encodeURI(myTempCarr)\n";
  newPage +="   myURL += '&tanker='+encodeURI(myTempTanker)\n";  
  newPage +="   myURL += '&prodCd='+encodeURI(myTempProdCd)\n";

  newPage +="   myURL += '&baycode='+encodeURI(myTempBayCode)\n";
  newPage +="   myURL += '&mtrcode='+encodeURI(myTempMtrCode)\n";
  newPage +="   myURL += '&maxcmpt='+encodeURI(myTempMaxCmpt)\n";

  newPage +="   myURL += '&drawer='+encodeURI(myTempDrawer)\n";
  newPage +="   myURL += '&tank='+encodeURI(myTempTank)\n";

  newPage +="   myURL += '&order_from='+encodeURI(myTempOrderFrom)\n";
  newPage +="   myURL += '&order_to='+encodeURI(myTempOrderTo)\n";
  newPage +="   myURL += '&trip_from='+encodeURI(myTempTripFrom)\n";
  newPage +="   myURL += '&trip_to='+encodeURI(myTempTripTo)\n";
  newPage +="   myURL += '&order_num='+encodeURI(myTempOrderNum)\n";
  newPage +="   myURL += '&trip_num='+encodeURI(myTempTripNum)\n";

  newPage +="   myURL += '&ftsize='+encodeURI(myTempRptFontSize)\n";
  newPage +="   myURL += '&rows='+encodeURI(myTempRptPageRows)\n";

  newPage +="   myURL += '&startDate='+myTempStartDate\n";
  newPage +="   myURL += '&start_hour='+myTempStartHr\n";  
  newPage +="   myURL += '&start_min='+myTempStartMin\n";
  
  
  newPage +="   myURL += '&endDate='+myTempEndDate\n";
  newPage +="   myURL += '&end_hour='+myTempEndHr\n";  
  newPage +="   myURL += '&end_min='+myTempEndMin\n";


  
  newPage +="   myURL += '&startDateTime='+myTempSDate\n";
  newPage +="   myURL += '&endDateTime='+myTempEDate\n";
  
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
