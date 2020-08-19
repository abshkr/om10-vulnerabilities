/**************************************************
* $Log: bill_of_lading.js,v $
* Revision 1.23  2011/09/07 06:27:37  cw
* Added function to allow supervisor complete a trip that breaks tolerance check
*
* Revision 1.22  2011/03/02 02:20:15  bz
* display one BOL form with font size= 16 instead of two forms with font size=11
*
* Revision 1.21  2007/12/06 03:09:42  abs
* Added fields to the form so days, start date and end date can be traked and when user uses the back to load schedule screen option, can go back to the previous serach result
*
* Revision 1.20  2007/01/10 03:26:25  bz
* add a new button to view loading report in front end before printing
*
* Revision 1.19  2007/01/03 07:09:33  bz
* add two more parameters to adjust number of forms and rows
*
* Revision 1.16  2006/11/17 04:10:50  bz
* fix bugzilla 1985-1988 and 1906, translation of trip, compartment, tanker, and DLI
*
* Revision 1.15  2006/07/20 07:05:50  abs
* button size fixed
*
* Revision 1.14  2006/07/07 02:11:35  yjf
* Corrected 'var l_opInf= g_opInf'
*
* Revision 1.13  2006/06/27 05:09:43  omega
* Re-added to cvs
*
* Revision 1.11  2006/06/27 01:58:40  yjf
* New renderPage function
*
* Revision 1.10  2006/06/15 00:02:01  yjf
* Translated
*
* Revision 1.10  2006/06/14 23:46:12  yjf
* Translated
*
* Revision 1.9  2006/06/14 06:28:15  yjf
* Indent and tiny up
*
* Revision 1.8  2006/02/23 22:09:21  gp
* Tidy up.
*
*
* $Id: bill_of_lading.js,v 1.23 2011/09/07 06:27:37 cw Exp $
*************************************************/


//This file use unique version for multi-language.
/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   



var t__Additive_Tank = ["Additive Tank","添加剂油罐"];
var t__Arm = ["                       				Arm","                       				鹤管"];
var t__Arm = ["Arm","鹤管"];
var t__Arm_Code = ["Arm Code","鹤管编号"];
var t__Back_to_Enter_Load_Details = ["Back to Enter Load Details","返回模拟输入发油量"];
var t__Back_to_Load_Schedules_Page = ["Back to Load Schedules Page","返回发油配送管理页"];
var t__Base_Product = ["Base Product","基础油品管理"];
var t__Cmpt_No = ["Cmpt No","油仓号"];
var t__Compartment = ["                       				Compartment","                       				油仓"];
var t__Current = ["Current","当前页"];
var t__Date = ["                       				Date","                       				日期"];
var t__DKI_Omega_Menu = ["DKI Omega Menu","达基Omega系统菜单"];
var t__Drawer = ["                       				Drawer","                       				油品调配公司"];
var t__ENTER_LOAD_DETAILS = ["ENTER LOAD DETAILS","模拟输入发油量"];
var t__Enter_Load_Details_Page = ["Enter Load Details Page","模拟输入发油量管理页"];
var t__Injector = ["Injector","注射器"];
var t__Loaded_Qty = ["Loaded Qty","已发油量"];
var t__Loader = ["                       				Loader","                       				提油人"];
var t__LOAD_SCHEDULES = ["LOAD SCHEDULES","发油配送管理"];
var t__Main_Tank = ["Main Tank","主油罐"];
var t__Meter = ["Meter","流量计"];
var t__Next = ["Next","下一页"];
var t__Previous = ["Previous","上一页"];
var t__Product_Code = ["                       				Product Code","                       				油品代码"];
var t__Product_Code = ["Product Code",""];
var t__Product_Name = ["                       				Product Name","                       				油品名称"];
var t__Product_Name = ["Product Name","油品名称"];
var t__Quantity = ["                       				Quantity","                       				油量"];
var t__Quantity = ["Quantity","油量"];
var t__Supplier = ["                       				Supplier","                       				供应商"];
var t__Tank = ["Tank","油罐"];
var t__Tanker = ["                       				Tanker","                       				油槽车"];
var t__Terminal = ["                       				Terminal","                       				油库"];
var t__Time = ["                       				Time","                       				时间"];
var t__Trip = ["                       				Trip","                       				提单"];
var t__Unit = ["                       				Unit","                       				单位"];
var t__Unit = ["Unit","单位"];
var t__VIEW = ["VIEW","查看"];
var t__View_Load_Details_Page = ["View Load Details Page","查看发油信息"];
var t__YOUR_ACTION = ["YOUR ACTION","请选择"];

var l_opInf= new Array()
for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];

var t__Successfully_Printed_Bill_Of_Lading__ = ["Successfully Printed Bill Of Lading !","打印提油账单成功"];
var t__Print_Bill_Of_Lading_Failed_ = ["Print Bill Of Lading Failed!","打印提油账单失败"];
var t__Load_Schedule__Bill_Lading = ["Load Schedule, Bill Lading","发油配送管理， 打印提油账单"];
var t__Print_Bill_Of_Lading = ["Print Bill Of Lading","打印提油账单"];
var t__Print_Bill_Of_Lading_Form = ["Print Bill Of Lading Form","打印提油账单"];
var t__Back_to_Load_Schedules_Page = ["Back to Load Schedules Page","返回发油配送管理"];
var t__Print_Bill_Of_Lading_will_Complete_the_Load__are_you_sure_you_want_to_complete_the_Load__ = ["Print Bill Of Lading will Complete the Load, are you sure you want to complete the Load ?","打印提油账单将结束发油过程，请确认是否结束发油？"];
var t__Supplier = ["Supplier","供应公司"];
var t__Drawer = ["Drawer","提油公司"];
var t__Carrier = ["Carrier","运输公司"];
var t__Equiptment = ["Equiptment","设备"];
var t__Profile = ["Profile","配置类型"];
var t__Trip_Shift = ["Trip/Shift","提单/班次"];
var t__Delivery_Date = ["Delivery Date","配送时间"];
var t__Load_Status = ["Load Status","发油状态"];
var t__Tanker_Type = ["Tanker Type","油槽车类型"];
var t__Terminal = ["Terminal","油库"];
var t__Supervisor_complete = ["Force to complete trip when it breaks tolerance check","强制此次发油发油，即使发油检测超标"];
var t__View_Bill_Of_Lading = ["View Bill Of Lading","查看提油账单"];
var t__View_Load_Report = ["View Loading Report","查看发油报表"];


l_opInf[28]= ml(t__Successfully_Printed_Bill_Of_Lading__);
l_opInf[38]= ml(t__Print_Bill_Of_Lading_Failed_);
// all the rest of the text on the report scheduling Page
var otherText = new Array();
otherText["pgTitle_rptsched"] = ml(t__Load_Schedule__Bill_Lading);
otherText["pgHead"] = ml(t__Print_Bill_Of_Lading);
otherText["supermode"] = ml(t__Supervisor_complete);
otherText["viewBOL"] = ml(t__View_Bill_Of_Lading);
otherText["viewLdReport"] = ml(t__View_Load_Report);

otherText["print_bol_frm"] = ml(t__Print_Bill_Of_Lading_Form);
otherText["btn_back"] = ml(t__Back_to_Load_Schedules_Page);
otherText["msg_confirm"] = ml(t__Print_Bill_Of_Lading_will_Complete_the_Load__are_you_sure_you_want_to_complete_the_Load__);
otherText["supp"] = ml(t__Supplier);
otherText["drawer"] = ml(t__Drawer);
otherText["carrier"] = ml(t__Carrier);
otherText["equip"] = ml(t__Equiptment);
otherText["prfile"] = ml(t__Profile);
otherText["trip_shift"] = ml(t__Trip_Shift);
otherText["del_date"] = ml(t__Delivery_Date);
otherText["load_status"] = ml(t__Load_Status);
otherText["tank_type"] = ml(t__Tanker_Type);
otherText["term"] = ml(t__Terminal);




/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    		
var ops_req_print = [-1, 1,2,3,4,5, 15,16, 19, 28,38];
var ops_req_search = [-1, 1,2,3,4,5, 15,16, 19,28, 38];// search never required on this page					

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
	newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
	newPage += "\n";
	newPage +="<tr>\n";  
	newPage +="<td width=\"100%\">             \n";
	newPage +="<div class=\"content\" id=\"content\">\n";
	newPage += "<div id=\"printReady\">";
	newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
	newPage +="<tbody>\n";   
	//start after the global form
	if (curViewDetailState <= 4 || curViewDetailState > 10) // view records
	{
		newPage +=displayPrintFrm();

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
function cmpy_field(attr)
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"supp\" id=\"supp\" value=\""+supp+"\" "+attr+" >\n";
	return fieldHTML;
}
function tripNo_field(attr)
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"tripNo\" id=\"tripNo\" value=\""+tripNo+"\" "+attr+" >\n";
	return fieldHTML;
}
function loadId_field(attr)
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"loadId\" id=\"loadId\" value=\""+loadId+"\" "+attr+" >\n";
	return fieldHTML;
}
function termId_field(attr)
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"tankTerm\" id=\"tankTerm\" value=\""+tankTerm+"\" "+attr+" >\n";
	return fieldHTML;
}

function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;
	if (op <= 4 || op > 10)
	{
		pageHeading +=otherText["pgHead"];
	}

	return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;
	if (op <= 4 || op > 10)
	{
		pageTitle +=otherText["pgTitle_rptsched"];

	} 
	return pageTitle;
}
function displayPrintFrm()
{
	var addFrmhtml ="";
	addFrmhtml +=backToBtn_HTML();
	addFrmhtml +=displayInfo();
	addFrmhtml +=displayStatusMsg (op);
	addFrmhtml += fieldst_HTML(otherText["print_bol_frm"]);
	addFrmhtml += "                            <div class=\"adminform\">\n";
	addFrmhtml +="<table width=\"100%\">\n";
	addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",
			"&nbsp;" ); 
	addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"bill_of_lading.cgi\" onsubmit=\"return submitmyform(this)\">\n";
	addFrmhtml += termId_field("type=\"hidden\"");
	addFrmhtml += cmpy_field("type=\"hidden\"");
	addFrmhtml += tripNo_field("type=\"hidden\"");  
	addFrmhtml +=  "<input type=\"checkbox\" name=\"supermode\" value=\"on\" />" + otherText["supermode"] + "\n";
		 
	addFrmhtml +=op_field (18);
	addFrmhtml += "                    </form>\n";
	addFrmhtml += "	<tr>\n";
	addFrmhtml += "		<td align=\"center\" height=\"30px\">\n";
//button for View BOL 
//ftsize: font size; rows: number of rows; forms: number of forms; rpt_type: 1=LD_REPORT;
        addFrmhtml += "<SCRIPT LANGUAGE=\"JavaScript\">\n";
        addFrmhtml += "var uniqueWindowName=1;\n";
        addFrmhtml += "function display_bol(url) {uniqueWindowName++; if (document.getElementById(\"supermode\").checked){ newwindow = window.open(url + \"&supermode=on\", uniqueWindowName);} else {  newwindow = window.open(url, uniqueWindowName);}}\n";

    addFrmhtml +="</script>\n";

        addFrmhtml += "			<span class=\"button\"><a href=\"javascript:display_bol('bill_of_lading_popup.cgi?tankTerm="+tankTerm+"&supp="+supp+"&tripNo="+tripNo+"&rpt_type=0&ftsize=16&forms=1&rows=1')\" target=\"_self\">"+otherText["viewBOL"]+"</a>\n";
        //addFrmhtml += "			<span class=\"button\"><a href=\"bill_of_lading_popup.cgi\" onclick=\"return display_bol(\"bill_of_lading_popup.cgi?tankTerm="+tankTerm+"&supp="+supp+"&tripNo="+tripNo+"&rpt_type=0&ftsize=16&forms=1&rows=1\")\" target=\"_blank\">"+otherText["viewBOL"]+"</a>\n";

	addFrmhtml += "	</span>\n";
	addFrmhtml += "	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n";

//button for View BOL 
//ftsize: font size; rows: number of rows; forms: number of forms; rpt_type: 1=LD_REPORT;
	addFrmhtml += "			<span class=\"button\"><a href=\"bill_of_lading_popup.cgi?tankTerm="+tankTerm+"&supp="+supp+"&tripNo="+tripNo+"&rpt_type="+"1"+"&ftsize="+"15"+"&forms="+"1"+"&rows="+"1"+"\" target=\"_blank\">"+otherText["viewLdReport"]+"</a>\n";
	addFrmhtml += "	</span>\n";
	addFrmhtml += "	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n";

	addFrmhtml += "			<span class=\"button\"><a href=\"#\" onClick=\"document.addNew.submit();\">"+otherText["pgHead"]+"</a>\n";
	addFrmhtml += "	</span>\n";
	addFrmhtml += "	</br>\n";
	addFrmhtml += "	</br>\n";
	addFrmhtml += "		</td>\n";
	addFrmhtml += "	</tr>\n";
	addFrmhtml +="							</table>\n";

	addFrmhtml +="							</table>\n";

        addFrmhtml +="							</div>\n";               
	addFrmhtml += fieldstFoot_HTML();
	return addFrmhtml;
}
function backToBtn_HTML()
{
	var button ="";
	button += " 	<form name=\"glblFrm\" id=\"glblFrm\">\n";
	button += "			<input type=\"hidden\" name=\"tankTerm\" value=\""+tankTerm+"\" />\n";
	button += "			<input type=\"hidden\" name=\"supp\" value=\""+supp+"\" />\n";
	button += "			<input type=\"hidden\" name=\"tripNo\" value=\""+tripNo+"\" />\n";
	button += "			<input type=\"hidden\" name=\"op\" value=0 />\n";
	button += "			<input type=\"hidden\" name=\"pg\" value=1 />\n";
	button +="          <input type=\"hidden\" name=\"days\" id=\"days\" value=\""+days+"\">\n";
	button +="          <input type=\"hidden\" name=\"startDate\" id=\"startDate\" value=\""+startDate+"\">\n";
	button +="          <input type=\"hidden\" name=\"endDate\" id=\"endDate\" value=\""+endDate+"\">\n";
	button +="          <input type=\"hidden\" name=\"sched_stat\" id=\"sched_stat\" value=\""+sched_stat+"\">\n";
	button += "		</form>\n";

	button += "	<tr>\n";
	button += "		<td align=\"center\">\n";
	button += "			<div class=\"button\"><a href=\"#\" onClick=\"document.glblFrm.tripNo.value='-1';document.glblFrm.action='load_scheds.cgi';document.glblFrm.submit();\">"+otherText["btn_back"]+"</a>\n";
	button += "	</div>\n";
	button += "	</br>\n";
	button += "		</td>\n";
	button += "	</tr>\n";
	return button;
} 
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage, lang)
{
	newPage +="<SCRIPT src=\"/"+lang+"/js/next.js\"></SCRIPT>\n";
	newPage +="<SCRIPT src=\"/"+lang+"/js/CalendarPopup.js\"></SCRIPT>\n";
	newPage +="<SCRIPT LANGUAGE=\"JavaScript\">\n";
	newPage +="\n";
	newPage +="//Calendar Variable\n";
	newPage +="	var cal = new CalendarPopup();\n";
	newPage +="	cal.showYearNavigation();\n";
	newPage +="/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
	newPage +="FUNCTION [ submitmyform] \n";
	newPage +="[PURPOSE]  		-> 	Always use this method to submit a form,\n";
	newPage +="					gives me the flexbility of doing validation\n";
	newPage +="					and addition if required before i submit the form\n";
	newPage +="          \n";
	newPage +="[Parameter]  	-> myobject FORM OBJECT Parameter is the form need to be submit\n";
	newPage +="[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
	newPage +="'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
	newPage +="function submitmyform(myobject)\n";
	newPage +="{\n";
	newPage +="	//var myHiddenOb;\n";
	newPage +="	\n";
	newPage +="	//myHiddenOb = getElemRefs(\"prev_qstring\";\n";
	newPage +="	//myHiddenOb.value=produceQString(;\n";
	newPage +="	//return formcheck(myobject;\n";
	newPage +="     if(confirm('"+otherText["msg_confirm"]+"'))\n";
	newPage += "    {\n";
	newPage +="	      return Validator.Validate(myobject,1);\n";
	newPage += "      return true;\n";
	newPage += "    }\n";
	newPage +="     else\n";
	newPage += "    {\n";
	newPage += "      eval(\"document.addNew.reset();\");\n";
	newPage += "      return false;\n";
	newPage += "    }\n";

	newPage +="}\n";
	newPage +="/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
	newPage +="[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
	newPage +="'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
	newPage +="function submitAction(myobject,frmNum)\n";
	newPage +="{\n";
	newPage +=    "var myselectedvalue = myobject.options[myobject.selectedIndex].value;";
	newPage +="   if(myselectedvalue==\"19\")\n";
	newPage += "  {\n";  
	newPage += "     eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
	newPage += "     return false;\n";  
	newPage +="   }\n";
	newPage +="   else\n";
	newPage += "  {\n";
	newPage += "    eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "    return true;\n";
	newPage +="   }\n";

	newPage +="}\n";
	newPage +="</script>\n";
	newPage += "</head>\n";
	newPage += "<body>\n";
	return (newPage);
}
function displayInfo()
{
	var infoPage ="";

	infoPage += " <tr>\n";
	infoPage += " 	<td align=\"left\">\n";
	infoPage += "       	<form name=\"infoPage\" id=\"infoPage\">\n";
	infoPage += "       	<div class=\"adminform\">\n";
	infoPage += "             <table width=\"100%\">\n";
	infoPage += "                	<tr>\n";
	infoPage += "						<td width=\"50%\">\n";
	infoPage += "							<table>\n";
	infoPage += "								<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Trip)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" +tripno;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Tanker)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" +tanker;
	infoPage += "                   				</td>\n";
	infoPage += "                 			</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Date)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" +date ;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Time)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" +time;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "							</table>\n";
	infoPage += "						</td>\n";
	infoPage += "						<td width=\"50%\">\n";
	infoPage += "							<table>\n";
	infoPage += "								<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Supplier)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" +suppNm;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Drawer)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" +drawerNm;
	infoPage += "                     			</td>\n";
	infoPage += "                 			</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Loader)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" +loader;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Terminal)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" +termNm;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "							</table>\n";
	infoPage += "						</td>\n";
	infoPage += "                	</tr>\n";
	infoPage += "         	</table>\n";
	infoPage += "            </div>\n"; 
	infoPage += "        	</form>\n";
	infoPage += " 	</td>\n";
	infoPage += "	</tr>\n";
	return infoPage;  	

}


