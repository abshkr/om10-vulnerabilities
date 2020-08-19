var opApproveSubmit = 16;
var opResendSubmit = 17;	//resend the Order to host submit form to update order
var opAssignSubmit = 10016;


var rejectedSection = 1;
var scheduledSection = 2;
var holdingSection = 3;
var preapprovalSection = 4;
var approvedSection = 5;
var deletedSection = 6;
var expiredSection = 7;
var resendOrdSection = 8; //Resend Order to Host
var status_location = 22; //19;
var ack_location = 23;  //20;
var myColumns = [ "Sale Id","Cusomter Code", "Customer Name", "Tanker","Compartment No", "Shift", "Batch", "Product Code", "Product Name","Ordered Qty","Order Unit" ,"Verified Qty","Verified Unit","Way_No","Bay Arm", "ERP Order Type", "Trip No", "Assn Qty", "T Cmpsn?" , "Pub. Temp", "Pub. Dens", "Pub. VCF"];
var otherText = new Array()
otherText["youraction"] =  "YOUR ACTION";
otherText["created_orders"] =  "Successfully Created Orders But Not Scheduled";
otherText["expired_orders"] =  "Expired ERP Orders";
otherText["deleted_orders"] =  "Deleted by ERP due to expiry date";
otherText["created_schedules"] =  "Successfully Scheduled But Not Available to Load";
otherText["auto_sched"] =  "Auto Scheduled Orders ";
otherText["orders_waiting"] =  "Processing Omega Data Validation ";
otherText["orders_declined"] =  "Orders Declined ";
otherText["orders_fail_transfer"] =  "Orders Failed To Transfer ";
otherText["orders_suc_transfer"] =  "Orders Successfully Transfered ";
//otherText["last_hr"] =  "[Last 1 Hour]";//not required
otherText["last_hr"] =  "";//not required
otherText["pgHead_eqpTp"] =  "equipment compartment limits";
otherText["pgTitle_eqpTp"] =  "Load Schedule, Equiptment Types";
otherText["erp_hostComm_status"] =  "ERP HostComm Process Info";
otherText["erp_hostComm_available"] =  "ERP HostComm Process Available?";
otherText["erp_hostComm_in_available"] =  "ERP Host In Process Available?";
otherText["erp_hostComm_out_available"] =  "ERP Host Out Process Available?";
otherText["Last_Time"] =  "Last Time Orders Downloaded";
otherText["Next_Time"] =  "Next Time Orders Will Download";  
otherText["Unit_Ltr"] =  "Litre";  
otherText["Unit_Kg"] =  "Kg";
otherText["close_window"] = "Close Window";
otherText["msg_valid_start"] = "Enter Start Date and Start Time earlier than End Date and End Time";
otherText["msg_valid_endDate"] = "Enter End Date and End Time later than Start Date and Start time";
otherText["msg_valid_startTime"] = "Enter Start Time and Start Date earlier than End Time and End Date";
otherText["msg_valid_endTime"] = "Enter End Time and End Date later than Start Time and Start Date";

otherText["msg_view_order_days"] = "View ERP Orders Status for last day (s)";
otherText["fieldMsg_erp_search"] = "ERP Orders Search form";
otherText["erp_search_in"] = "Search ERP Host In";
otherText["erp_search_out"] = "Search ERP Host Out";
otherText["start_date"] = "Start Date Time";
otherText["end_date"] = "End Date Time";
otherText["start_time"] ="Start Time";
otherText["end_time"] ="End Time";
otherText["select_date"] = "Select Date";
otherText["select_a_start_time"] = "Select a start time";
otherText["select_a_end_time"] = "Select an end time";
otherText["t__Are_you_sure_you_want_to_re_approve"]="Are you sure you want to Re-Approve Sale Id ";
otherText["t__Are_you_sure_you_want_to_re_send"]="Are you sure you want to Re-Send to Host Sale Id ";
otherText["t__Are_you_sure_you_want_to_re_assign"]="Are you sure you want to Re-Assign Sale Id ";
otherText["re_approve"] = "Re-Approve";
otherText["re_assign"] = "Re-Assign";
otherText["re_try"] = "Re-Send";


var jnl_days_jslist = [ [ "", ""], ["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], ["7","7"]];
if(parseInt(days)=='-1' || days=='') days=1;
if(search_tanker=='-1') search_tanker="";
if(search_saleId=='-1') search_saleId="";


var dateFormat = "yyyy-MM-dd";	
var opValues = new Array();
opValues["init"] = 1;
var l_opInf= new Array()
for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];


if ( 'cn' == js_lang)
{
	var myColumns = ["ERP单号","客户编号","客户名称","车号", "油仓编号", "班次", "趟次", "油品编号", "油品名称","下单油量","下单单位" ,"验单油量","验单单位","发油台位","鹤管", "ERP单据类型", "提单号", "提单分配量", "温补标志", "公布温度", "公布密度", "公布VCF" ];
	otherText["youraction"] =  "请选择";
	otherText["created_orders"] =  "成功下载的ERP订单,但尚未生成OMEGA提单和自动分仓";
	otherText["deleted_orders"] =  "因为过期而被ERP删除的订单";
	otherText["expired_orders"] =  "过期的ERP订单";
	otherText["created_schedules"] =  "成功生成的OMEGA提单，但是暂时处于锁定状态";
	otherText["auto_sched"] =  "自动分仓产生的OMEGA提单";
	otherText["orders_waiting"] =  "OMEGA正在处理的ERP订单";
	otherText["orders_declined"] =  "被拒绝的ERP订单 ";
	//otherText["last_hr"] =  "[过去1小时中]"; //not required
	otherText["last_hr"] =  "";//not required
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
	otherText["t__Are_you_sure_you_want_to_re_approve"]="您确信要重新验证该ERP单据";
	otherText["t__Are_you_sure_you_want_to_re_assign"]="您确信要重新分配该ERP单据";
	otherText["re_approve"] = "重新验证";
	otherText["re_assign"] = "重新分仓";
	//Abdul added new text for Host out part
	otherText["orders_fail_transfer"] =  "传输失败的ERP单据";
	otherText["orders_suc_transfer"] =  "传输成功的ERP单据";
	otherText["erp_hostComm_in_available"] =  "从ERP取单据的进程是否正常?";
	otherText["erp_hostComm_out_available"] =  "向ERP送单据的进程是否正常?";
	otherText["erp_search_in"] = "查询从ERP得到的单据";
	otherText["erp_search_out"] = "查询送到ERP的单据";
	otherText["t__Are_you_sure_you_want_to_re_send"]="确定要再次发生此单据？";
	otherText["re_try"] = "重发";

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
	newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
	newPage +="<tbody>\n";   

	// if OP is <=1 OR Higher than available options should always come to this view
	if (curViewDetailState <= opValues["init"] || curViewDetailState >=15 )
	{
		var myreal_startDate=startDate;
		newPage +=backToBtn_HTML();	  
		newPage +=displayErpSates();
		newPage +=displayStatusMsg(op);  
		newPage +=findForm();
		if(hst_type=='-1' || hst_type=='in') //only come here when want to display host in orders
		{
			//Display all declined
			newPage += "<tr> \n";
			newPage += "<td align=\"left\">\n";
			newPage += "<table>\n";

			newPage += "<tr> \n";
			newPage += "<td align=\"left\" class=\"infotext\">\n";
			newPage += "<img src=\"/images/cancel.png\" alt=\"waiting\" title=\"waiting\">\n";
			newPage += "</td>\n";
			newPage += "<td width=\"300\" class=\"infotextheading\">\n";
			newPage += otherText["orders_declined"]+"\n";

			if (myreal_startDate == '-1' ||myreal_startDate == '')
			{

				newPage += otherText["last_hr"]+"\n";
			}
			newPage += "</td>\n";
			newPage += "</tr> \n";		

			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";

			newPage += "<tr> \n";		
			newPage += "<td>\n "; 

			if( ((myColumns.length)> 0))
			{
				newPage += table_begin("M", 0,"");
				newPage += "<tbody> \n";
				newPage += "<tr>";
				for(var i=0; i<myColumns.length; i++)
				{
					newPage += "<td>"+myColumns[i]+"<\/td>";             
				}
				newPage += "<\/tr>";
			}
			newPage +=displayDataTable(curPrivilage, failed_jsArr, curColumnToSort, true, rejectedSection );
			newPage += "</tr> \n";		

			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";

			//Display all the Scheduled Sale Ids 
			newPage += "<tr> \n";
			newPage += "<td align=\"left\">\n";
			newPage += "<table>\n";
			newPage += "<tr> \n";
			newPage += "<td align=\"left\" class=\"infotext\">\n";
			newPage += "<img src=\"/images/scheduling.gif\" alt=\"scheduled\" title=\"scheduled\">\n";
			newPage += "</td>\n";
			newPage += "<td width=\"300\" class=\"infotextheading\">\n";
			newPage += otherText["auto_sched"]+"\n";
			if(myreal_startDate == '-1' ||myreal_startDate == '') newPage += otherText["last_hr"]+"\n";
			newPage += "</td>\n";
			newPage += "</tr> \n";		

			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";

			newPage += "<tr> \n";		
			newPage += "<td>\n "; 

			if( ((myColumns.length)> 0))
			{
				newPage += table_begin("M", 0,"");
				newPage += "<tbody> \n";
				newPage += "<tr>";
				for(var i=0; i<myColumns.length; i++)
				{
					newPage += "<td>"+myColumns[i]+"<\/td>";             
				}
				newPage += "<\/tr>";
			}
			newPage +=displayDataTable(curPrivilage,sched_jsArr, curColumnToSort, false, scheduledSection );

			newPage += "</tr> \n";	
			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";

			//Display all the Scheduled BUT NOT AVAILABLE for loading Sale Ids 
			newPage += "<tr> \n";
			newPage += "<td align=\"left\">\n";
			newPage += "<table>\n";
			newPage += "<tr> \n";
			newPage += "<td align=\"left\" class=\"infotext\">\n";
			newPage += "<img src=\"/images/purple_yes.png\" alt=\"scheduled\" title=\"scheduled\">\n";
			newPage += "</td>\n";
			newPage += "<td width=\"300\" class=\"infotextheading\">\n";
			newPage += otherText["created_schedules"]+"\n";
			if(myreal_startDate == '-1' ||myreal_startDate == '') newPage += otherText["last_hr"]+"\n";
			newPage += "</td>\n";
			newPage += "</tr> \n";		

			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";

			newPage += "<tr> \n";		
			newPage += "<td>\n "; 

			if( ((myColumns.length)> 0))
			{
				newPage += table_begin("M", 0,"");
				newPage += "<tbody> \n";
				newPage += "<tr>";
				for(var i=0; i<myColumns.length; i++)
				{
					newPage += "<td>"+myColumns[i]+"<\/td>";             
				}
				newPage += "<\/tr>";
			}
			newPage +=displayDataTable(curPrivilage,holding_jsArr, curColumnToSort, false, holdingSection );

			newPage += "</tr> \n";	
			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";

			//Display all the Waiting for approval Sale Ids 
			newPage += "<tr> \n";
			newPage += "<td align=\"left\">\n";
			newPage += "<table>\n";
			newPage += "<tr> \n";
			newPage += "<td align=\"left\" class=\"infotext\">\n";
			newPage += "<img src=\"/images/blue_info.png\" alt=\"waiting\" title=\"waiting\">\n";
			newPage += "</td>\n";
			newPage += "<td width=\"300\" class=\"infotextheading\">\n";
			newPage += otherText["orders_waiting"]+"\n";
			if (myreal_startDate == '-1' ||myreal_startDate == '') newPage += otherText["last_hr"]+"\n";
			newPage += "</td>\n";
			newPage += "</tr> \n";		
			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";
			newPage += "<tr> \n";		
			newPage += "<td>\n "; 
			if( ((myColumns.length)> 0))
			{
				newPage += table_begin("M", 0,"");
				newPage += "<tbody> \n";
				newPage += "<tr>";
				for(var i=0; i<myColumns.length; i++)
				{
					newPage += "<td>"+myColumns[i]+"<\/td>";             
				}
				newPage += "<\/tr>";
			}
			newPage +=displayDataTable(curPrivilage,waiting_jsArr, curColumnToSort, false, preapprovalSection );	    
			newPage += "</tr> \n";	
			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";

			//Display all the approved Sale Ids 
			newPage += "<tr> \n";
			newPage += "<td align=\"left\">\n";
			newPage += "<table>\n";
			newPage += "<tr> \n";
			newPage += "<td align=\"left\" class=\"infotext\">\n";
			newPage += "<img src=\"/images/yellow_question.png\" alt=\"Yes\" title=\"Yes\">\n";
			newPage += "</td>\n";
			newPage += "<td width=\"300\" class=\"infotextheading\">\n";
			newPage += otherText["created_orders"]+"\n";
			if (myreal_startDate == '-1' ||myreal_startDate == '') newPage += otherText["last_hr"]+"\n";
			newPage += "</td>\n";
			newPage += "</tr> \n";
			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";
			newPage += "<tr> \n";

			newPage += "<td>\n "; 

			if( ((myColumns.length)> 0))
			{
				newPage += "<div id=\"printReady\">";
				newPage += table_begin("M", 0,"");
				newPage += "<tbody> \n";
				newPage += "<tr>";
				for(var i=0; i<myColumns.length; i++)
				{
					newPage += "<td>"+myColumns[i]+"<\/td>";             
				}
				newPage += "<\/tr>";
			}
			newPage +=displayDataTable(curPrivilage,approved_jsArr, curColumnToSort, true, approvedSection );

			newPage += "<\/tbody>";
			newPage += "<\/table>";
			newPage += "<\/div>";
			newPage += "<\/td>";	
			newPage += "<\/tr>";

			//Display all the deleted Sale Ids 
			newPage += "<tr> \n";
			newPage += "<td align=\"left\">\n";
			newPage += "<table>\n";
			newPage += "<tr> \n";
			newPage += "<td align=\"left\" class=\"infotext\">\n";
			newPage += "<img src=\"/images/cross_mark_red.jpg\" alt=\"waiting\" title=\"waiting\">\n";
			newPage += "</td>\n";
			newPage += "<td width=\"300\" class=\"infotextheading\">\n";
			newPage += otherText["deleted_orders"]+"\n";
			if (myreal_startDate == '-1' ||myreal_startDate == '') newPage += otherText["last_hr"]+"\n";
			newPage += "</td>\n";
			newPage += "</tr> \n";		
			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";
			newPage += "<tr> \n";		
			newPage += "<td>\n "; 
			if( ((myColumns.length)> 0))
			{
				newPage += table_begin("M", 0,"");
				newPage += "<tbody> \n";
				newPage += "<tr>";
				for(var i=0; i<myColumns.length; i++)
				{
					newPage += "<td>"+myColumns[i]+"<\/td>";             
				}
				newPage += "<\/tr>";
			}
			newPage +=displayDataTable(curPrivilage, deleted_jsArr, curColumnToSort, false, deletedSection );	    
			newPage += "</tr> \n";	
			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";

			//Display all the expired Sale Ids 
			newPage += "<tr> \n";
			newPage += "<td align=\"left\">\n";
			newPage += "<table>\n";
			newPage += "<tr> \n";
			newPage += "<td align=\"left\" class=\"infotext\">\n";
			newPage += "<img src=\"/images/excluded.png\" alt=\"waiting\" title=\"waiting\">\n";
			newPage += "</td>\n";
			newPage += "<td width=\"300\" class=\"infotextheading\">\n";
			newPage += otherText["expired_orders"]+"\n";
			if (myreal_startDate == '-1' ||myreal_startDate == '') newPage += otherText["last_hr"]+"\n";
			newPage += "</td>\n";
			newPage += "</tr> \n";		
			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";
			newPage += "<tr> \n";		
			newPage += "<td>\n "; 
			if( ((myColumns.length)> 0))
			{
				newPage += table_begin("M", 0,"");
				newPage += "<tbody> \n";
				newPage += "<tr>";
				for(var i=0; i<myColumns.length; i++)
				{
					newPage += "<td>"+myColumns[i]+"<\/td>";             
				}
				newPage += "<\/tr>";
			}
			newPage +=displayDataTable(curPrivilage, expired_jsArr, curColumnToSort, false, expiredSection );	    
			newPage += "</tr> \n";	
			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";
		}//only display when dealing with the host in
		else //start dealing with the Host Out results
		{
			newPage += "<tr> \n";
			newPage += "<td align=\"left\">\n";
			newPage += "<table>\n";

			newPage += "<tr> \n";
			newPage += "<td align=\"left\" class=\"infotext\">\n";
			newPage += "<img src=\"/images/cancel.png\" alt=\"waiting\" title=\"waiting\">\n";
			newPage += "</td>\n";
			newPage += "<td width=\"300\" class=\"infotextheading\">\n";
			newPage += otherText["orders_fail_transfer"]+"\n";

			if (myreal_startDate == '-1' ||myreal_startDate == '')
			{

				newPage += otherText["last_hr"]+"\n";
			}
			newPage += "</td>\n";
			newPage += "</tr> \n";		

			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";

			newPage += "<tr> \n";		
			newPage += "<td>\n "; 

			if( ((myColumns.length)> 0))
			{
				newPage += table_begin("M", 0,"");
				newPage += "<tbody> \n";
				newPage += "<tr>";
				for(var i=0; i<myColumns.length; i++)
				{
					newPage += "<td style=\"background-color:#990000\">"+myColumns[i]+"<\/td>";             
				}
				newPage += "<\/tr>";
			}
			newPage +=displayDataTable(curPrivilage, failed_jsArr, curColumnToSort, true, resendOrdSection );
			newPage += "</tr> \n";		

			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";


			//Display the successfully transfered
			//Display all the approved Sale Ids 
			newPage += "<tr> \n";
			newPage += "<td align=\"left\">\n";
			newPage += "<table>\n";
			newPage += "<tr> \n";
			newPage += "<td align=\"left\" class=\"infotext\">\n";
			newPage += "<img src=\"/images/check_mark_blue.gif\" alt=\"Yes\" title=\"Yes\">\n";
			newPage += "</td>\n";
			newPage += "<td width=\"300\" class=\"infotextheading\">\n";
			newPage += otherText["orders_suc_transfer"]+"\n";
			if (myreal_startDate == '-1' ||myreal_startDate == '') newPage += otherText["last_hr"]+"\n";
			newPage += "</td>\n";
			newPage += "</tr> \n";
			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";
			newPage += "<tr> \n";

			newPage += "<td>\n "; 

			if( ((myColumns.length)> 0))
			{
				newPage += "<div id=\"printReady\">";
				newPage += table_begin("M", 0,"");
				newPage += "<tbody> \n";
				newPage += "<tr>";
				for(var i=0; i<myColumns.length; i++)
				{
					newPage += "<td style=\"background-color:#990000\">"+myColumns[i]+"<\/td>";             
				}
				newPage += "<\/tr>";
			}
			newPage +=displayDataTable(curPrivilage,approved_jsArr, curColumnToSort, false, approvedSection );

			newPage += "<\/tbody>";
			newPage += "<\/table>";
			newPage += "<\/div>";
			newPage += "<\/td>";	
			newPage += "<\/tr>";
		}
	}

	// table for everything ends here
	//	newPage += "</tr>\n";
	newPage += "</tbody>\n";
	newPage += "</table>\n";
	newPage += "</div>\n";
	newPage += "</div>\n";
	newPage += "</td>              \n";  
	newPage += "</tr>\n";

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

/* define function op_list() */
function op_list(priv, frmNum)
{
	/* priv = 
	   6 modify	op=1,2,3
	   7 add		op=4
	   8 delete	op=5
	 */

	var op_list ="";
	op_list +="<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+frmNum+"');\">          ";
	switch (priv)
	{
		case 8:


		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */


		case 6:    /* Modify not required for This page  */

		case 5:			/* Find Has not been implemented yet*/
			op_list +="<option value=\""+ opApproveSubmit +"\">"+otherText["re_approve"]+"</option>";
			//profile not implemented for the China Project
			//op_list +="<option value=\""+opValues["prfile"]+"\">"+otherText["prfile"]+"</option>";
			break;
	}

	op_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
	op_list +="</select>                                        ";
	return op_list ;
}	

/* define function op_list2() */
function op_list2(priv, frmNum)
{
	/* priv = 
	   6 modify	op=1,2,3
	   7 add		op=4
	   8 delete	op=5
	 */

	var op_list ="";
	op_list +="<select name=\"op\" id=\"op\" onchange=\"submitAction2(this, '"+frmNum+"');\">          ";
	switch (priv)
	{
		case 8:


		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */


		case 6:    /* Modify not required for This page  */

		case 5:			/* Find Has not been implemented yet*/
			op_list +="<option value=\""+ opAssignSubmit +"\">"+otherText["re_assign"]+"</option>";
			//profile not implemented for the China Project
			//op_list +="<option value=\""+opValues["prfile"]+"\">"+otherText["prfile"]+"</option>";
			break;
	}

	op_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
	op_list +="</select>                                        ";
	return op_list ;
}	

/* define function op_list3() 
 * to display list for resend the
 * the data to host
*/
function op_list3(priv, frmNum)
{
	/* priv = 
	   6 modify	op=1,2,3
	   7 add		op=4
	   8 delete	op=5
	 */

	var op_list ="";
	op_list +="<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+frmNum+"');\">          ";
	switch (priv)
	{
		case 8:


		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */


		case 6:    /* Modify not required for This page  */

		case 5:			/* Find Has not been implemented yet*/
			op_list +="<option value=\""+ opResendSubmit +"\">"+otherText["re_try"]+"</option>";
			//profile not implemented for the China Project
			//op_list +="<option value=\""+opValues["prfile"]+"\">"+otherText["prfile"]+"</option>";
			break;
	}

	op_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
	op_list +="</select>                                        ";
	return op_list ;
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
	newPage +="function showHideCalImages(isVisible)\n";
	newPage +="{\n";
	newPage +="	if(isVisible)\n";
	newPage +="	{\n";	
	newPage +="		document.getElementById('date_anchor1').style.display = '';\n";
	newPage +="		document.getElementById('date_anchor2').style.display = '';\n";
	newPage +="		document.getElementById('cancel_date_anchor1').style.display = '';\n";
	newPage +="		document.getElementById('cancel_date_anchor2').style.display = '';\n";
	newPage +="		document.getElementById('days').disabled = true;\n";
	newPage +="	}\n";
	newPage +="	else\n";
	newPage +="	{\n";	
	newPage +="		document.getElementById('date_anchor1').style.display = 'none';\n";
	newPage +="		document.getElementById('date_anchor2').style.display = 'none';\n";
	newPage +="		document.getElementById('cancel_date_anchor1').style.display = 'none';\n";
	newPage +="		document.getElementById('cancel_date_anchor2').style.display = 'none';\n";
	newPage +="	}\n";		
	newPage +="}\n";	
	newPage +="</script>\n";
	newPage +="</head>\n";	
	newPage +="\n";
	newPage +="<body>\n"; //try to hide calendar selection
	/*
	   if(serach_typ=='-1' || serach_typ=='serach_days')
	   {
	   newPage +="<body>\n"; //try to hide calendar selection
	   }
	   else
	   {
	   newPage +="<body onLoad='alert(true);showHideCalImages(true);'>\n"; //try to show calendar and hide days drop list
	   }
	 */
	newPage +="\n";  
	return (newPage);

}
	
	
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function displayDataTable(curPrivilage, inPutArray, curColumnToSort, isFailed, sectionId)
{
	var newPage="";
	for(i in inPutArray)
	{

		if(i>0)
		{
			newPage += "<tr class=\"row1\">\n";
			var howmanyDone =0;
			for(var j=0; j<myColumns.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					newPage += "<td style=\"background-color:#EEEEEE\">" + obs(inPutArray[i][howmanyDone]) + "<\/td>";
				} 
				else 
				{

					newPage += "<td>\n";

					if(howmanyDone==0 && isFailed==true) // means time to display the drop list and table
					{
						if ( sectionId == rejectedSection )
						{ // reapprove
							newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
						}
						else if ( sectionId == approvedSection )
						{ // reassign
							newPage +="	      <form name=\"assign_action_"+i+"\" id=\"assign_action_"+i+"\" >\n";
						}
						else if ( sectionId == resendOrdSection )
						{ // resend order to host
							newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
							newPage +="          <input type=\"hidden\" name=\"hst_type\" id=\"hst_type\" value=\"out\">\n";
						}
						else
						{
							newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
						}

						newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";

						newPage +="       <table border=\"0\">\n";
						newPage +="	       <tr>\n";
						newPage +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+(inPutArray[i][howmanyDone])+"</span>\n";

						newPage +="          </td>\n";
						newPage +="          <td width=\"50%\">\n";

						if ( sectionId == rejectedSection )
						{ // reapprove
							newPage += op_list(curPrivilage,i);
						}
						else if ( sectionId == approvedSection )
						{ // reassign
							// that means Status and Acknowledge fields
							// need to be checked when status is 7 or 6 and ack 0 dont need to resend
							if( (parseInt(inPutArray[i][status_location])==6) ||  (parseInt(inPutArray[i][status_location])==7) && (parseInt(inPutArray[i][ack_location])==0)  )
							{
								newPage += "";
							}
							else
							{
								newPage += op_list2(curPrivilage,i);
							}

						}
						else if ( sectionId == resendOrdSection )
						{ // reassign
							newPage += op_list3(curPrivilage,i);
						}
						else
						{
							newPage += op_list(curPrivilage,i);
						}

						newPage +="          <input type=\"hidden\" name=\"saleId\" id=\"saleId\" value=\""+inPutArray[i][howmanyDone]+"\">\n";
						newPage +="          </td>\n";
						newPage +="	       </tr>\n";
						newPage +="	      </table>\n";
						newPage +="	      </form>\n";
					}
					else if(howmanyDone==10) // time to decide if its Litres or Kgs 
					{
						if(inPutArray[i][howmanyDone]=="L")
						{
							newPage +=otherText["Unit_Ltr"]+"\n";
						}
						else if(inPutArray[i][howmanyDone]=="KG")
						{
							newPage +=otherText["Unit_Kg"]+"\n";
						}					   
					}
					else
					{
						newPage += (inPutArray[i][howmanyDone]);
					}  

					newPage += "<\/td>\n";


				}
				howmanyDone++;	
			} // end of inner for loop


		}
		newPage += "\n";
		newPage += "<\/tr>";
	}

	return newPage;

}
function displayErpSates()
{
	var tempText = "";
	tempText += fieldst_HTML(otherText["erp_hostComm_status"]);
	tempText += "<div class=\"helparea\">\n";
	tempText += "<table width=\"100%\">\n";
	tempText += "<tr>\n";
	tempText += "<td style=\"border-style: solid;border-width: 1px 1px 1px 1px;border-color: #000000;\" width=\"50%\">\n";


	tempText += "<table>\n";
	tempText += "<tr>\n";
	tempText += " <td class=\"infotextheading\" style=\"font-weight: bold; color:blue\">\n";
	tempText +="&nbsp; <img src=\"/images/in_come.png\" alt=\"IN\" title=\"IN\"> &nbsp; \n";
	tempText +=otherText["erp_hostComm_in_available"]+"\n";
	tempText += "</td>\n";

	tempText += "<td>\n";
	if(erpStats.available=="N")
	{
		tempText += "<img src=\"/images/cross_mark_red.jpg\" alt=\"NO\" title=\"NO\">\n";
	}
	else
	{
		tempText += "<img src=\"/images/check_mark_blue.gif\" alt=\"Yes\" title=\"Yes\">\n";
	}

	tempText += "</td>\n";
	tempText += "</tr>\n";
	if(erpStats.available=="Y")
	{
		tempText += "<tr>\n";
		tempText += " <td class=\"infotextheading\">\n";
		tempText += otherText["Last_Time"]+":\n";
		tempText += "</td>\n";

		tempText += "<td class=\"infotext\">\n";    
		tempText += erpStats.lasttime+"\n";
		tempText += "</td>\n";
		tempText += "</tr>\n";


		tempText += "<tr>\n";
		tempText += " <td class=\"infotextheading\">\n";
		tempText += otherText["Next_Time"]+":\n";
		tempText += "</td>\n";

		tempText += "<td class=\"infotext\">\n";
		tempText += erpStats.nexttime+"\n";

		tempText += "</td>\n";
		tempText += "</tr>\n";
	}
	tempText += "</table>\n";
	tempText += "</td>\n";

	//Another cell to produce the host out screen
	tempText += "<td style=\"border-style: solid;border-width: 1px 1px 1px 1px;border-color: #000000;\">\n";

	tempText += "<table>\n";
	tempText += "<tr>\n";
	tempText += " <td class=\"infotextheading\" style=\"font-weight: bold; color:blue\">\n";
	tempText +="&nbsp; <img src=\"/images/out_go.png\" alt=\"IN\" title=\"IN\"> &nbsp; \n";
	tempText +=otherText["erp_hostComm_out_available"]+"\n";
	tempText += "</td>\n";

	tempText += "<td>\n";
	if(credenceStats.available=="N")
	{
		tempText += "<img src=\"/images/cross_mark_red.jpg\" alt=\"NO\" title=\"NO\">\n";
	}
	else
	{
		tempText += "<img src=\"/images/check_mark_blue.gif\" alt=\"Yes\" title=\"Yes\">\n";
	}

	tempText += "</td>\n";
	tempText += "</tr>\n";
	if(credenceStats.available=="Y")
	{
		tempText += "<tr>\n";
		tempText += " <td class=\"infotextheading\">\n";
		tempText += otherText["Last_Time"]+":\n";
		tempText += "</td>\n";

		tempText += "<td class=\"infotext\">\n";    
		tempText += credenceStats.lasttime+"\n";
		tempText += "</td>\n";
		tempText += "</tr>\n";


		tempText += "<tr>\n";
		tempText += " <td class=\"infotextheading\">\n";
		tempText += otherText["Next_Time"]+":\n";
		tempText += "</td>\n";

		tempText += "<td class=\"infotext\">\n";
		tempText += credenceStats.nexttime+"\n";

		tempText += "</td>\n";
		tempText += "</tr>\n";
	}
	tempText += "</table>\n";

	tempText += "</td>\n";
	tempText += "</tr>\n";
	tempText += "</table>\n";
	//finish the 2nd cell

	tempText += "</tr>\n";
	tempText += "\n";
	tempText += "                            </div>\n";
	tempText += "            </td>\n";
	tempText += "    </tr>\n";
	return tempText;


}
function findForm()
{
	var daysChecked="";
	var hst_in_checked="";
	var hst_out_checked="";
	var datesChecked="";

	if(hst_type=='-1' || hst_type=='in') 
	{
		hst_in_checked = "checked";
	}
	else
	{
		hst_out_checked = "checked";
	}

	if(serach_typ=='-1' || serach_typ=='serach_days') 
	{
		daysChecked = "checked";
	}
	else
	{
		datesChecked="checked";
	}


	if (startDate == '-1' ||startDate == '')
	{
		//alert(mystartyear+"-"+mystartmonth+"-"+mystartday);
		startDate = makeStartDate(days);
	}

	if (endDate == '-1' ||endDate == '')
	{

		endDate = getEndDate();
	}
	var findFrm = "";
	findFrm += fieldst_HTML(otherText["fieldMsg_erp_search"]);
	findFrm += "<form name=\"findFrm\" method=\"POST\" id=\"findFrm\" onsubmit=\"return submitmyFindform(this);\">\n";
	findFrm += "<div class=\"adminform\">\n";
	findFrm += "<table width=\"100%\">\n";
	findFrm += "<tr>\n";
	findFrm += "<td width=\"100%\">\n";
	findFrm += "<table width=\"100%\">\n";

	findFrm += "<tr>\n";
	findFrm += "<td colspan=\"2\" width=\"100%\">\n";
	findFrm += "<table>\n";

	//adding the radio to distinguish between in and out
	findFrm += "<tr>\n";
	findFrm += "<td width=\"20\">\n";
	//findFrm += "<input type=\"radio\" name=\"serach_typ\" value=\"serach_days\" onclick=\"return updateDisableProp('days', false); \" checked \/> \n";
	findFrm += "<input type=\"radio\" name=\"hst_type\" id=\"hst_type\" value=\"in\" "+hst_in_checked+" \/> \n";
	findFrm += "</td>\n";
	findFrm += "<td class=\"infotextheading\" width=\"300\">\n";
	findFrm +="&nbsp; <img src=\"/images/in_come.png\" alt=\"IN\" title=\"IN\"> &nbsp; \n";
	findFrm += otherText["erp_search_in"]+" :\n";
	findFrm += "</td>\n";
	findFrm += "<td class=\"infotextheading\">\n";
	findFrm += "<input type=\"radio\" name=\"hst_type\" id=\"hst_type\" value=\"out\" "+hst_out_checked+" \/> \n";
	findFrm +="&nbsp; <img src=\"/images/out_go.png\" alt=\"IN\" title=\"IN\"> &nbsp; \n";
	findFrm += otherText["erp_search_out"]+" :\n";

	findFrm += "</td>\n";
	findFrm += "</tr>\n";
	//end the row for radio to distinguish between in and out
	findFrm += "<tr>\n";
	findFrm += "<td width=\"20\">\n";
	//findFrm += "<input type=\"radio\" name=\"serach_typ\" value=\"serach_days\" onclick=\"return updateDisableProp('days', false); \" checked \/> \n";
	findFrm += "<input type=\"radio\" name=\"serach_typ\" value=\"serach_days\" onclick=\"return updateDisableProp('days', false); \" "+daysChecked+" \/> \n";
	findFrm += "</td>\n";
	findFrm += "<td class=\"infotextheading\" width=\"300\">\n";
	findFrm += otherText["msg_view_order_days"]+" :\n";
	findFrm += "</td>\n";
	findFrm += "<td>\n";
	findFrm += "<select id=\"days\" name=\"days\" onchange=\"return changeStartDates(this);\"> \n";
	findFrm += displayDropList(days, jnl_days_jslist, "");
	findFrm += "</td>\n";
	findFrm += "</tr>\n";
	findFrm += "</table>\n";  
	findFrm += "</td>\n";
	findFrm += "</tr>\n";

	findFrm += "<tr>\n";
	findFrm += "<td colspan=\"2\" width=\"100%\">\n";
	findFrm += "<table>\n";  
	findFrm += "<tr>\n";
	findFrm += "<td width=\"20\">\n";
	findFrm += "<input type=\"radio\" name=\"serach_typ\" value=\"serach_other\" onclick=\"return updateDisableProp('days', true);\" "+datesChecked+" \/> \n";
	findFrm += "</td>\n";  
	findFrm += "<td>\n";
	findFrm += "<td class=\"infotextheading\" width=\"180\">\n";
	findFrm += otherText["start_date"]+" :\n";
	findFrm += "</td>\n";
	findFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
	findFrm += "<span class=\"mandatory\">*</span>\n";
	findFrm += "</td>\n";
	findFrm += "<td>\n";
	findFrm += "<input type=\"text\" name=\"startDate\" value=\""+startDate+"\" dataType=\"Require\" msg=\""+otherText["msg_valid_start"]+"\" readonly/>\n";
	findFrm += dateURL_HTML("document.forms[0].startDate", "date_anchor1",dateFormat,otherText["select_date"]);
	findFrm += "</td>\n";
	findFrm += "<td>\n";
	findFrm += "<select name=\"startTime\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_valid_startTime"]+"\">\n";
	findFrm += droplistTime('startTime', otherText["select_a_start_time"]);
	findFrm += "</td>\n";
	findFrm += "</tr>\n";
	findFrm += "</table>\n";
	findFrm += "</td>\n";  
	findFrm += "</tr>\n";

	findFrm += "<tr>\n";
	findFrm += "<td colspan=\"2\" width=\"100%\">\n";
	findFrm += "<table>\n";  
	findFrm += "<tr>\n";
	findFrm += "<td width=\"20\">\n";
	findFrm += "&nbsp; \n";
	findFrm += "</td>\n";  
	findFrm += "<td>\n";
	findFrm += "<td class=\"infotextheading\" width=\"180\">\n";
	findFrm += otherText["end_date"]+" :\n";
	findFrm +="</td>\n";
	findFrm +="<td width=\"5\" align=\"center class=\"infotext\">\n";
	findFrm +="<span class=\"mandatory\">*</span>\n";
	findFrm +="</td>\n";
	findFrm +="<td>\n";
	findFrm +="<input type=\"text\" name=\"endDate\" value=\""+endDate+"\" dataType=\"Require\" msg=\""+otherText["msg_valid_endDate"]+"\" readonly />\n";
	findFrm +=dateURL_HTML("document.forms[0].endDate", "date_anchor2",dateFormat,otherText["select_date"]);
	findFrm +="</td>\n";
	findFrm +="<td>\n";
	findFrm +="<select name=\"endTime\" class=\"smallselect\" dataType=\"CompareDateTime\" and=\"endDate\" to=\"startTime\" toand=\"startDate\" operator=\"GreaterThanEqual\" msg=\""+otherText["msg_valid_endTime"]+"\">\n";
	findFrm +=droplistTime('endTime', otherText["select_a_end_time"]);
	findFrm +="</td>\n";
	findFrm += "</tr>\n";
	findFrm += "</table>\n";
	findFrm += "</td>\n";  
	findFrm += "</tr>\n";

	findFrm += "<tr>\n";
	findFrm += "<td colspan=\"2\" width=\"100%\">\n";
	findFrm += "<table>\n";  
	findFrm += "<tr>\n";
	findFrm += "<td width=\"20\">\n";
	findFrm += "&nbsp; \n";
	findFrm += "</td>\n";  
	findFrm += "<td>\n";
	findFrm += "<td class=\"infotextheading\" width=\"180\">\n";
	findFrm += myColumns[0]+" :\n";
	findFrm += "</td>\n";
	findFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
	findFrm += "&nbsp;\n";
	findFrm += "</td>\n";
	findFrm += "<td>\n";
	/*if(search_saleId=="-1")*/search_saleId="";
	findFrm += "<input type=\"text\" id=\"search_saleId\" name=\"search_saleId\" dataType=\"\" value=\""+search_saleId+"\" msg=\""+otherText["msg_enter_srch_txt"]+"\" />\ \n";
	findFrm += "</td>\n";
	findFrm += "</tr>\n";
	findFrm += "</table>\n";
	findFrm += "</td>\n";  
	findFrm += "</tr>\n";

	findFrm += "<tr>\n";
	findFrm += "<td colspan=\"2\" width=\"100%\">\n";
	findFrm += "<table>\n";  
	findFrm += "<tr>\n";
	findFrm += "<td width=\"20\">\n";
	findFrm += "&nbsp; \n";
	findFrm += "</td>\n";  
	findFrm += "<td>\n";
	findFrm += "<td class=\"infotextheading\" width=\"180\">\n";
	findFrm += myColumns[3]+" :\n";
	findFrm += "</td>\n";
	findFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
	findFrm += "&nbsp;\n";
	findFrm += "</td>\n";
	findFrm += "<td>\n";
	/*if(search_saleId=="-1")*/search_saleId="";
	findFrm += "<input type=\"text\" id=\"search_tanker\" name=\"search_tanker\" dataType=\"\" value=\""+search_tanker+"\" msg=\""+otherText["msg_enter_srch_txt"]+"\" />\ \n";
	findFrm += "</td>\n";
	findFrm += "</tr>\n";
	findFrm += "</table>\n";
	findFrm += "</td>\n";  
	findFrm += "</tr>\n";

	//Another row to display ERP Order Types
	findFrm += "<tr>\n";
	findFrm += "<td colspan=\"2\" width=\"100%\">\n";
	findFrm += "<table>\n";  
	findFrm += "<tr>\n";
	findFrm += "<td width=\"20\">\n";
	findFrm += "&nbsp; \n";
	findFrm += "</td>\n";  
	findFrm += "<td>\n";
	findFrm += "<td class=\"infotextheading\" width=\"180\">\n";
	findFrm += myColumns[15]+" :\n";
	findFrm += "</td>\n";
	findFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
	findFrm += "&nbsp;\n";
	findFrm += "</td>\n";
	findFrm += "<td>\n";
	/*if(search_saleId=="-1")*/search_saleId="";
	findFrm += "<select id=\"erpOrder_category\" name=\"erpOrder_category\" class=\"smallselect\" msg=\""+(myColumns[15])+"\"> \n";
	findFrm += displayDropList_any_All(erpOrder_category, erpOrder_category_jslst,(myColumns[15]), 'A');
	findFrm += "</td>\n";
	findFrm += "</tr>\n";
	findFrm += "</table>\n";
	findFrm += "</td>\n";  
	findFrm += "</tr>\n";



	findFrm += "</table>\n";
	findFrm += "									</td>\n";
	findFrm += "								</tr>\n";
	findFrm += "								<tr>\n";
	findFrm += "									<td align=\"center\">\n";
	findFrm += "										<table>\n";
	findFrm += "											<tr>\n";
	findFrm += "												<td align=\"center\" width=\"50%\">\n";
	findFrm += "													\n";
	findFrm += "													<input type=\"hidden\" name=\"op\" value=\"15\" />\n";
	findFrm += "													<input type=\"hidden\" name=\"saleId\" id=\"saleId\" value=\"\" />\n";
	findFrm += "													<input type=\"submit\" value=\""+commText["Search"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	findFrm += "												</td>\n";
	findFrm += "											</tr>\n";
	findFrm += "										</table>\n";
	findFrm += "									</td>\n";
	findFrm += "								</tr>\n";
	findFrm += "							</table>\n";
	findFrm+= "							</div>\n";
	findFrm += "					</form>\n";
	findFrm += fieldstFoot_HTML();
	findFrm += "		</td>\n";
	findFrm += "	</tr>\n";  
	return findFrm;  
}

function droplistTime(name, msg)
{
	var time="";
	time += "	<option value=\"00:00\">00:00</option>\n";
	time += "	<option value=\"01:00\">01:00</option>\n";
	time += "	<option value=\"02:00\">02:00</option>\n";
	time += "	<option value=\"03:00\">03:00</option>\n";
	time += "	<option value=\"04:00\">04:00</option>\n";
	time += "	<option value=\"05:00\">05:00</option>\n";
	time += "	<option value=\"06:00\">06:00</option>\n";
	time += "	<option value=\"07:00\">07:00</option>\n";
	time += "	<option value=\"08:00\">08:00</option>\n";
	time += "	<option value=\"09:00\">09:00</option>\n";
	time += "	<option value=\"10:00\">10:00</option>\n";
	time += "	<option value=\"11:00\">11:00</option>\n";
	time += "	<option value=\"12:00\">12:00</option>\n";
	time += "	<option value=\"13:00\">13:00</option>\n";
	time += "	<option value=\"14:00\">14:00</option>\n";
	time += "	<option value=\"15:00\">15:00</option>\n";
	time += "	<option value=\"16:00\">16:00</option>\n";
	time += "	<option value=\"17:00\">17:00</option>\n";
	time += "	<option value=\"18:00\">18:00</option>\n";
	time += "	<option value=\"19:00\">19:00</option>\n";
	time += "	<option value=\"20:00\">20:00</option>\n";
	time += "	<option value=\"21:00\">21:00</option>\n";
	time += "	<option value=\"22:00\">22:00</option>\n";
	time += "	<option value=\"23:00\">23:00</option>\n";	
	time += "</select>\n";

	return time;
}
function makeStartDate(howmanyDays)
{
	var startDate="";
	var mystartDate=new Date();
	mystartDate.setDate(mystartDate.getDate()-howmanyDays);
	var mystartyear = String(mystartDate.getFullYear());
	var mystartmonth = String((mystartDate.getMonth()+1)) ;
	var mystartday = String(mystartDate.getDate());
	if (mystartmonth.length==1)mystartmonth = "0"+mystartmonth;
	if (mystartday.length==1)mystartday = "0"+mystartday;

	//alert(mystartyear+"-"+mystartmonth+"-"+mystartday);
	startDate = mystartyear+"-"+mystartmonth+"-"+mystartday;
	return startDate;
}
function getEndDate()
{
	var endDate="";
	var myendDate=new Date();
	myendDate.setDate(myendDate.getDate()+1);
	var myendyear = String(myendDate.getFullYear());
	var myendmonth = String((myendDate.getMonth()+1)) ;
	var myendday = String(myendDate.getDate());
	if (myendmonth.length==1)myendmonth = "0"+myendmonth;
	if (myendday.length==1)myendday = "0"+myendday;
	endDate = myendyear+"-"+myendmonth+"-"+myendday;
	return endDate
}
function changeStartDates(myobject)
{
	var myNewStDate="";
	var homanyDays = parseInt(myobject.value);
	myNewStDate = makeStartDate(homanyDays);
	document.findFrm.startDate.value=myNewStDate;
	return true;

}

function resetStartEndDates(days)
{
	document.findFrm.startDate.value=makeStartDate(days);
	document.findFrm.endDate.value=getEndDate();
	
	
}

function updateDisableProp(fieldId, isDisable)
{
	
	var currElement = getElemRefs(fieldId);
	if(isDisable)
	{
	 currElement.setAttribute("dataType","");
	 currElement.selectedIndex= -1;
	 showHideCalImages(true);
	 
	}
	else
	{
		currElement.setAttribute("dataType","Require");
		currElement.selectedIndex= 0;
		resetStartEndDates(1);
		showHideCalImages(false);
	}
	currElement.disabled=isDisable;
	
	
	
}
function submitAction(myobject,frmNum)
{
	var myselectedvalue = (myobject.options[myobject.selectedIndex].value);
	//alert(myselectedvalue);
	if(myselectedvalue == opApproveSubmit)
	{

		if(confirm( otherText["t__Are_you_sure_you_want_to_re_approve"] +eval("document.select_action_"+frmNum+".saleId.value;")+' ?'))
		{
			//alert(eval("document.select_action_"+frmNum+".saleId.value;"));
			document.findFrm.saleId.value=eval("document.select_action_"+frmNum+".saleId.value;");
			document.findFrm.op.value = opApproveSubmit;
			eval("document.findFrm.submit();");
			return true;
		}
		else
		{
			eval("document.select_action_"+frmNum+".reset();");
		}
	}
	else if(myselectedvalue == opResendSubmit)
	{

		if(confirm( otherText["t__Are_you_sure_you_want_to_re_send"] +eval("document.select_action_"+frmNum+".saleId.value;")+' ?'))
		{
			//alert(eval("document.select_action_"+frmNum+".saleId.value;"));
			document.findFrm.saleId.value=eval("document.select_action_"+frmNum+".saleId.value;");
			document.findFrm.op.value = opResendSubmit;
			eval("document.findFrm.submit();");
			return true;
		}
		else
		{
			eval("document.select_action_"+frmNum+".reset();");
		}
	}


}
function submitAction2(myobject,frmNum)
{
	var myselectedvalue = (myobject.options[myobject.selectedIndex].value);
	//alert(myselectedvalue);
	if(myselectedvalue == opAssignSubmit)
	{

		if(confirm( otherText["t__Are_you_sure_you_want_to_re_assign"] +eval("document.assign_action_"+frmNum+".saleId.value;")+' ?'))
		{
			//alert(eval("document.assign_action_"+frmNum+".saleId.value;"));
			document.findFrm.saleId.value=eval("document.assign_action_"+frmNum+".saleId.value;");
			document.findFrm.op.value = opAssignSubmit;
			eval("document.findFrm.submit();");
			return true;
		}
		else
		{
			eval("document.assign_action_"+frmNum+".reset();");
		}
	}

}
