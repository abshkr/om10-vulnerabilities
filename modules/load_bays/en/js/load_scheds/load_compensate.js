var myColumns = [ "Sale Id","Cusomter Code", "Customer Name", "Tanker","Compartment No", "Shift", "Batch", "Product Code", "Product Name","Qty","Unit" ];
var otherText = new Array()
otherText["youraction"] =  "YOUR ACTION";
otherText["created_orders"] =  "Successfully Created Orders But Not Scheduled";
otherText["auto_sched"] =  "Auto Scheduled Orders ";
otherText["orders_waiting"] =  "Orders Waiting For System Validation ";
otherText["orders_declined"] =  "Orders Declined ";
otherText["last_hr"] =  "[Last 1 Hour]";
otherText["pgHead_eqpTp"] =  "equipment compartment limits";
otherText["pgTitle_eqpTp"] =  "Load Schedule, Equiptment Types";
otherText["erp_hostComm_status"] =  "ERP HostComm Process Info";
otherText["erp_hostComm_available"] =  "ERP HostComm Process Available?";
otherText["Last_Time"] =  "Last Time Orders Downloaded";
otherText["Next_Time"] =  "Next Time Orders Will Download";  
otherText["Unit_Ltr"] =  "Litre";  
otherText["Unit_Kg"] =  "Kg";
otherText["close_window"] = "Close Window";
otherText["msg_valid_start"] = "Enter Start Date and Start Time earlier than End Date and End Time";
otherText["msg_valid_endDate"] = "Enter End Date and End Time later than Start Date and Start time";
otherText["msg_valid_startTime"] = "Enter Start Time and Start Date earlier than End Time and End Date";
otherText["msg_valid_endTime"] = "Enter End Time and End Date later than Start Time and Start Date";
otherText["msg_valid_saleId"] = "Enter Valid Sale Id";
otherText["msg_valid_minqty"] = "Enter Valid Min Qty";
otherText["msg_prod_not_on_arm"] = "Selected product not available on selected arm";
otherText["msg_valid_saleId_used"] = "Sale Id you entered has already been used";
otherText["msg_view_order_days"] = "View ERP Orders Status for last day (s)";
otherText["fieldMsg_erp_search"] = "ERP Orders Search form";
otherText["fieldMsg_erp_compensate"] = "Load Comepensation Form";
otherText["start_date"] = "Start Date Time";
otherText["end_date"] = "End Date Time";
otherText["start_time"] ="Start Time";
otherText["end_time"] ="End Time";
otherText["select_date"] = "Select Date";
otherText["select_a_start_time"] = "Select a start time";
otherText["select_a_end_time"] = "Select an end time";
otherText["Select"] = "Select";
otherText["Bay_Arm"] = "Bay Arm";
otherText["cnfm_msg_more_than_order_qty"] = "Are you sure you want to order more than the Original Order Qty ?";
otherText["t__Enter_Quantity_between"] = "Enter Quantity between 1 - 999999 ";
otherText["t__Enter_Compt"] = "Enter Compartment Number";

otherText["t__MIN_QTY_COMP"] = "Min Qty Allowed to Compensate(L)";
otherText["t__LOAD_COMP_NO"] = "Load Comp No";



var jnl_days_jslist = [ [ "", ""], ["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], ["7","7"]];

var dateFormat = "yyyy-MM-dd";	
var opValues = new Array()
opValues["init"] = 1;
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
	otherText["Select"] = "请选择";
	otherText["Bay_Arm"] = "鹤管";

	otherText["Last_Time"] =  "上次下载的ERP订单";
	otherText["Next_Time"] =  "下次将要下载的ERP订单";
	otherText["Unit_Ltr"] =  "升";  
	otherText["Unit_Kg"] =  "千克"; 
	otherText["close_window"] = "关闭窗口";
	otherText["msg_valid_saleId"] = "请输入有效的ERP单号";
	otherText["msg_valid_minqty"] = "请输入有效的允许补油最低量";
	otherText["msg_prod_not_on_arm"] = "所选油品和所选台位鹤管不匹配";
	otherText["msg_valid_saleId_used"] = "您输入的ERP单号已经用过";
	otherText["fieldMsg_erp_compensate"] = "补发油表单";
	otherText["cnfm_msg_more_than_order_qty"] = "您确定要补发比原订单量多的油品?";
	otherText["t__Enter_Quantity_between"] = "请输入油量，值必须介于1 - 999999";
	otherText["t__Enter_Compt"] = "请输入仓位";
	otherText["t__MIN_QTY_COMP"] = "允许补油最低量(升)";
	otherText["t__LOAD_COMP_NO"] = "补油";

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
	newPage +="<table border=\"0\" width=\"600\" height=\"100%\">\n";
	newPage +="<tbody>\n";   

	// if OP is <=1 OR Higher than available options should always come to this view
	if (curViewDetailState <= opValues["init"] || curViewDetailState >=15 ) 
	{
		
		newPage +=backToBtn_HTML();
		
		newPage +=displayStatusMsg (op);  
		
		newPage += FindOrderFrm();
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
//	newPage +="script:\"/cgi-bin/en/load_scheds/erporders.cgi?\",\n";
	newPage +="script:\"/cgi-bin/en/load_scheds/erporders.cgi?min_qty_comp="+search_minqty+"&\",\n";
	newPage +="varname:\"input\",\n";
	newPage +="minchars:2\n";
	newPage +="};\n";

	newPage +="var as1 = new AutoSuggest('search_saleId', options1);\n";
	
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
			op_list +="<option value=\"16\">Re-Approve</option>";
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
	newPage +="</script>\n";
	newPage +="</head>\n";	
	newPage +="\n";
	newPage +="<body>\n";  
	newPage +="\n";  
	return (newPage);

}
	
	
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function displayDataTable(curPrivilage, inPutArray, curColumnToSort, isFailed)
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
						newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
						newPage +="       <table border=\"0\">\n";
						newPage +="	       <tr>\n";
						newPage +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+(inPutArray[i][howmanyDone])+"</span>\n";
						
						newPage +="          </td>\n";
						newPage +="          <td width=\"50%\">\n";
						newPage += op_list(curPrivilage,i);
						newPage +="          <input type=\"hidden\" name=\"saleId\" id=\"saleId\" value=\""+inPutArray[i][howmanyDone]+"\">\n";
						newPage +="          </td>\n";
						newPage +="	       </tr>\n";
						newPage +="	      </table>\n";
						newPage +="	      </form>\n";
					}
					else if(howmanyDone==8) // means time to display the drop list and table
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
						newPage += obs(inPutArray[i][howmanyDone]);
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
/* Function FindOrderFrm responsible for displaying 
 * Find Order Form Also part of it uses Ajax to search an order form
  *
  */
function FindOrderFrm()
{
  
  var findFrm = "";
  findFrm += fieldst_HTML(otherText["fieldMsg_erp_search"]);
  findFrm += "<form name=\"findFrm\" method=\"POST\" id=\"findFrm\" onsubmit=\"return submitUpdform(this);\">\n";
  findFrm += "<div class=\"adminform\">\n";
  findFrm += "<table width=\"100%\">\n";
  findFrm += "<tr>\n";
  findFrm += "<td width=\"100%\">\n";
  findFrm += "<table width=\"100%\">\n";  
  findFrm += "<tr>\n";
  findFrm += "<td width=\"100%\">\n";
  findFrm += "<table>\n";  

  // define the min qty allowed to compensate
  findFrm += "<tr>\n";
  findFrm += "<td class=\"infotextheading\" width=\"120\">\n";
  findFrm += otherText["t__MIN_QTY_COMP"]+" :\n";
  findFrm += "</td>\n";
  findFrm += "<td>\n";
  findFrm += "					<table class=\"NewActionBaseTable\">\n";
	findFrm += "					<tbody>\n";
	findFrm += "					<tr>\n";
	findFrm += "					<td class=\"popupLinkrow\">\n";
	findFrm += "						<input type=\"text\" name=\"search_minqty\" id=\"search_minqty\" maxLength=\"20\" style=\"FONT-SIZE:1.00em\" onChange=\"checkMinQtyComp(document.findFrm);\" value=\""+search_minqty+"\" dataType=\"Require\" msg=\""+otherText["msg_valid_minqty"]+"\" />\ \n"; 
	findFrm += "					</td>\n";
	findFrm += "					<td width=\"15\">\n";
	findFrm += "						&nbsp;\n";
	findFrm += "					</td>\n";
	findFrm += "					</tr>\n";
	findFrm += "					</tbody>\n";
	findFrm += "					</table>\n";
  
  findFrm += "</td>\n";
  findFrm += "</tr>\n";


  findFrm += "<tr>\n";
  findFrm += "<td class=\"infotextheading\" width=\"120\">\n";
  findFrm += myColumns[0]+" :\n";
  findFrm += "</td>\n";
  findFrm += "<td>\n";
  findFrm += "					<table class=\"NewActionBaseTable\">\n";
	findFrm += "					<tbody>\n";
	findFrm += "					<tr>\n";
	findFrm += "					<td class=\"popupLinkrow\">\n";
	findFrm += "						<input type=\"text\" name=\"search_saleId\" id=\"search_saleId\" maxLength=\"20\" style=\"FONT-SIZE:1.00em\" onFocus=\"document.AddNewFrm.reset();document.AddNewFrm.mtrcode.value='-1';\" value=\""+saleId+"\" dataType=\"Require\" msg=\""+otherText["msg_valid_saleId"]+"\" />\ \n"; 
	findFrm += "					</td>\n";
	findFrm += "					<td width=\"15\">\n";
	findFrm += "						<img src=\"/images/dropimage.gif\" width=\"15\" height=\"16\" onclick=\"as1.doAjaxRequest();\">\n";
	findFrm += "					</td>\n";
	findFrm += "					</tr>\n";
	findFrm += "					</tbody>\n";
	findFrm += "					</table>\n";
  
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
  
} /*End of FindOrderFrm*/

function addFrm()
{
 
  var addFrmhtml = "";
  addFrmhtml += fieldst_HTML(otherText["fieldMsg_erp_compensate"]);
  addFrmhtml += "<form name=\"AddNewFrm\" method=\"POST\" id=\"AddNewFrm\" onsubmit=\"return submitAddform(this);\">\n";
  addFrmhtml += "<div class=\"adminform\">\n";
  addFrmhtml += "<table width=\"100%\">\n";
  addFrmhtml += "<tr>\n";
  addFrmhtml += "<td width=\"100%\">\n";
  addFrmhtml += "<table width=\"100%\">\n";
  
  
  // 1st row
	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[0]+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="<td>\n";

//	addFrmhtml += "<input type=\"text\" id=\"saleId_new\" name=\"saleId_new\" dataType=\"Require\" maxLength=\"20\" value=\"\" msg=\""+otherText["msg_valid_saleId"]+"\" />\ \n";
	addFrmhtml += "<input type=\"text\" id=\"saleId_new\" name=\"saleId_new\" dataType=\"\" maxLength=\"20\" value=\"\" msg=\"\" readOnly=\"true\" />\ \n";

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[2]+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";

	addFrmhtml += "<input type=\"text\" id=\"cust_name\" name=\"cust_name\" dataType=\"\" value=\"\" msg=\"\" readOnly=\"true\" />\ \n";

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";

	addFrmhtml +="			</tr>\n";
	
	// 1st row End
	
	
	// 2nd row
	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[3]+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="<td>\n";

	addFrmhtml += "<input type=\"text\" id=\"tanker\" name=\"tanker\" dataType=\"\" value=\"\" msg=\"\" readOnly=\"true\" />\ \n";

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

	addFrmhtml += "<input type=\"text\" id=\"compt\" name=\"compt\" dataType=\"PositiveIntGteZero\" min=\"0\" max=\"99\"  value=\"\" msg=\""+ otherText["t__Enter_Compt"] +"\" />\ \n";

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";

	addFrmhtml +="			</tr>\n";
	
	// 2nd row End
	
	
	//3rd row
	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[7]+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="<td>\n";

	addFrmhtml += "<input type=\"text\" id=\"prod_cd\" name=\"prod_cd\" dataType=\"\" value=\"\" msg=\"\" readOnly=\"true\" />\ \n";

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[8]+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";

	addFrmhtml += "<input type=\"text\" id=\"prod_name\" name=\"prod_name\" dataType=\"\" value=\"\" msg=\"\" readOnly=\"true\" />\ \n";

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";

	addFrmhtml +="			</tr>\n";
	
	// 3rd row End
  
   //4th row
	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[9]+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="<td>\n";

//	addFrmhtml += "<input type=\"text\" id=\"qty_new\" name=\"qty_new\" dataType=\"RangeInt\" min=\"1\" max=\"999999999\" value=\"\" msg=\""+otherText["t__Enter_Quantity_between"]+"\" />\ \n";
	addFrmhtml += "<input type=\"text\" id=\"qty_new\" name=\"qty_new\" dataType=\"RangeInt\" min=\"1\" max=\"999999999\" value=\"\" msg=\""+otherText["t__Enter_Quantity_between"]+"\"  readOnly=\"true\" />\ \n";

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[10]+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="				<td>\n";

	addFrmhtml += "<input type=\"text\" id=\"unit\" name=\"unit\" dataType=\"\" value=\"\" msg=\"\" readOnly=\"true\" />\ \n";

	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";

	addFrmhtml +="			</tr>\n";
	
	//4th row End
	
	
	//5th row
	addFrmhtml +="			<tr>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="				<table>\n";
	addFrmhtml +="				<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",otherText["Bay_Arm"]+" :");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "&nbsp;\n");
	addFrmhtml +="				<td>\n";
	addFrmhtml += "  <select id=\"mtrcode\" name=\"mtrcode\" class=\"smallselect\" style=\"width:106px;\" msg=\""+(otherText["Select"]+" "+otherText["Bay_Arm"])+"\" "+"\/> \n";

	// do this for arm filter; bugzilla 2391
	addFrmhtml += displayDropList_any_All(mtrcode, all_meter_jslst,(otherText["Select"]+" "+otherText["Bay_Arm"]), 'A');
//	addFrmhtml += displayDropList_any_All(mtrcode, meter_jslst,(otherText["Select"]+" "+otherText["Bay_Arm"]), 'A');
	addFrmhtml +="				<\/td>\n";
	addFrmhtml +="				<\/tr>\n";
	addFrmhtml +="				<\/table>\n";

	addFrmhtml +="			</td>\n";
	addFrmhtml +="			<td width=\"50%\">\n";

	addFrmhtml +="			&nbsp;\n";

	addFrmhtml +="			</td>\n";

	addFrmhtml +="			</tr>\n";
	
	//5th row End
	
  

  
  addFrmhtml += "</table>\n";
  addFrmhtml += "									</td>\n";
  addFrmhtml += "								</tr>\n";
  addFrmhtml += "								<tr>\n";
  addFrmhtml += "									<td align=\"center\">\n";
  addFrmhtml += "										<table>\n";
  addFrmhtml += "											<tr>\n";
  addFrmhtml += "												<td align=\"center\" width=\"50%\">\n";
  addFrmhtml += "													\n";
  addFrmhtml += "													<input type=\"hidden\" name=\"op\" value=\""+opValues["submitAdd"]+"\" />\n";
  addFrmhtml += "													<input type=\"hidden\" name=\"saleId\" id=\"saleId\" dataType=\"Require\" value=\"\" msg=\""+otherText["msg_valid_saleId"]+"\" />\n";
  addFrmhtml += "													<input type=\"hidden\" name=\"qty\" id=\"qty\" value=\"\" />\n";
  addFrmhtml += "													<input type=\"hidden\" name=\"way_no\" id=\"way_no\" value=\"0\" />\n";
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



function updateDisableProp(fieldId, isDisable)
{
	
	var currElement = getElemRefs(fieldId);
	if(isDisable)
	{
	 currElement.setAttribute("dataType","");
	}
	else
	{
		currElement.setAttribute("dataType","Require");
	}
	currElement.disabled=isDisable;
}
function submitAction(myobject,frmNum)
{
	var myselectedvalue = (myobject.options[myobject.selectedIndex].value);
	//alert(myselectedvalue);
	if(myselectedvalue==16)
	{
		
		if(confirm( otherText["t__Are_you_sure_you_want_to_re_approve"] +eval("document.select_action_"+frmNum+".saleId.value;")+' ?'))
		{
			alert(eval("document.select_action_"+frmNum+".saleId.value;"));
			document.findFrm.saleId.value=eval("document.select_action_"+frmNum+".saleId.value;");
			document.findFrm.op.value=16;
			eval("document.findFrm.submit();");
			return true;
		}
		else
		{
			eval("document.select_action_"+frmNum+".reset();");
		}
   }
  
}

//change sale_id Ajax list, if min qty for compensation changes 
function checkMinQtyComp ( myformObj )
{
	myformObj.search_saleId.focus();

	myQStr = AlterUrlString((options1.script), "min_qty_comp", myformObj.search_minqty.value );
	options1.script = myQStr;
}



function submitUpdform(myobject)
{

	var isFormValid = false;
	isFormValid = Validator.Validate(myobject,1);
	if(isFormValid==true)
	{
		var mycgi = '../../../cgi-bin/en/load_scheds/erporders.cgi';
		var myqry = "input3="+encodeURI(document.findFrm.search_saleId.value) ;
		var xml = callresponseXML(mycgi, myqry, callAfterXML);	
	}	
	return false;		
		
}
function callAfterXML(xml)
{
	var results = xml.getElementsByTagName('results')[0].childNodes;
	if(results.length>0)
	{
		for (var i=0;i<results.length;i++)
		{
			if (results[i].hasChildNodes())
			{
//				document.AddNewFrm.saleId_new.value =(results[i].getAttribute("saleId"))+"_";
				document.AddNewFrm.saleId_new.value =(results[i].getAttribute("saleId")) + "_" + (results[i].getAttribute("comp_id"));
				document.AddNewFrm.cust_name.value =(results[i].getAttribute("custName"));
				document.AddNewFrm.tanker.value =(results[i].getAttribute("tanker"));
				document.AddNewFrm.compt.value =(results[i].getAttribute("compt"));
				document.AddNewFrm.prod_cd.value =(results[i].getAttribute("prod_cd"));
				document.AddNewFrm.prod_name.value =(results[i].getAttribute("prod_name"));
				document.AddNewFrm.qty.value =(results[i].getAttribute("qty"));
				document.AddNewFrm.qty_new.value =(results[i].getAttribute("qty_new"));
				if(results[i].getAttribute("unit")=="L")
				{
					document.AddNewFrm.unit.value =otherText["Unit_Ltr"];
				}
				else if(results[i].getAttribute("unit")=="KG")
				{
					document.AddNewFrm.unit.value =otherText["Unit_Kg"];
				}
				document.AddNewFrm.saleId.value =(results[i].getAttribute("saleId"));

				// for bugzilla 2391, add a filter for arm by product
				updateDropdownList(document.AddNewFrm, document.AddNewFrm.prod_cd, document.AddNewFrm.mtrcode, meter_jslst, 5);

				showWhichArmSelected(parseInt(results[i].getAttribute("way_no")));
			}
			
		}
	}
	else
	{
		alert(otherText["msg_valid_saleId"]);
	}
//		alert("after XML before add form populated");
	return false;		
		
}
function submitAddform(myobject)
{

	var isFormValid = false;
	var hasSaleIdUsed = false;
	isFormValid = Validator.Validate(myobject,1);
	if(isFormValid==true)
	{
		if (checkIfArmProdMatch(document.AddNewFrm.mtrcode.value, document.AddNewFrm.prod_cd.value)==false)
		{
			alert(otherText["msg_prod_not_on_arm"] );
			return false;
		}
		
		//this is the pattern of the new sale id 
		//saleID pattern=/saleId_
		var myvalue = document.AddNewFrm.saleId.value+"_";
		if(! (new RegExp('\\b'+myvalue,'i')).test(document.AddNewFrm.saleId_new.value) ) 
		{
			alert(otherText["msg_valid_saleId"]);
			return false;
		}
		//alert(pattern.test(document.AddNewFrm.saleId_new.value)) //returns true
		//var pattern="/"+document.AddNewFrm.saleId_new.value+"/_"  /\b\b/
		//alert(pattern.test(document.AddNewFrm.saleId.value)); //returns true
		var mycgi = '../../../cgi-bin/en/load_scheds/erporders.cgi';
		var myqry = "input1="+encodeURI(document.AddNewFrm.saleId_new.value) ;
		hasSaleIdUsed = checkIfSaleIdUsed(loadXml(mycgi, myqry));
		if(hasSaleIdUsed==true) return false;
		
		if(parseInt(document.AddNewFrm.qty_new.value)>parseInt(document.AddNewFrm.qty.value))
		{
			if(confirm(otherText["cnfm_msg_more_than_order_qty"]))
			{
				return true;
			}
			return false;
		}
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
	if (armCode=='-1')
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
/* showWhichArmSelected functions 
  * takes way_no as an input parameter
  * and displays the related BayArm Code selected
  */
function showWhichArmSelected(wayNum)
{
	if (wayNum<=0) return false;
	var tempBayArmCd ="";
	tempBayArmCd = whatIsArmCode(wayNum);
	if (tempBayArmCd!="")
	{
	
		for (var i=0;i<document.AddNewFrm.mtrcode.options.length;i++)
		{
			//alert("Pssed to me  "+ armCode +" and drawProdSelected "+drawProdSelected );
			if ((document.AddNewFrm.mtrcode.options[i].value==tempBayArmCd))
			{
				document.AddNewFrm.mtrcode.selectedIndex= i;
				return true;
			}
		}
	}
	
	return false;
}
/* whatIsArmCode functions 
  * input parameter is the way_no
  * and returns what Bay Arm Code is it
   */
function whatIsArmCode(wayNum)
{
	
	var myBayArmCd ="";
	if (wayNum<=0) return myBayArmCd;
	for (var i=1;i<meter_arm_prod.length;i++)
	{
		//alert("Pssed to me  "+ armCode +" and drawProdSelected "+drawProdSelected );
		if ((meter_arm_prod[i][2]==wayNum))
		{
			return meter_arm_prod[i][1];
			
		}
	}
	
	return myBayArmCd;
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


		if ( ((parent_select == "") || (parent_select == "-1") || (child_select == parent_select)) )

//		if ( ((parent_select == "") || (parent_select == "-1") || (child_select.indexOf(parent_select) != -1 )) )
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


