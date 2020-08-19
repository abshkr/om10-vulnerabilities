/**********************************************************
 * $Id: auth_load.js,v 1.12 2006/11/17 04:10:50 bz Exp $ 
 * $Log: auth_load.js,v $
 * Revision 1.12  2006/11/17 04:10:50  bz
 * fix bugzilla 1985-1988 and 1906, translation of trip, compartment, tanker, and DLI
 *
 * Revision 1.11  2006/06/27 05:09:43  omega
 * Re-added to cvs
 *
 * Revision 1.9  2006/06/27 01:58:39  yjf
 * New renderPage function
 *
 * Revision 1.8  2006/03/06 22:49:35  gp
 * - Added query string to pass/capture schedule status.
 * - Added condition if schedule status is < 4, auth = No.
 *
 * Revision 1.7  2006/03/03 05:36:54  gp
 * Fixed header to follow helparea and adminform divs.
 *
 * Revision 1.6  2006/02/23 22:08:43  gp
 * Tidy up.
 *
 * Revision 1.5  2006/02/22 00:47:49  yjf
 * add id for content div
 *
 * Revision 1.4  2006/02/09 22:31:45  yjf
 * All these files use unique version for multi-language.
 *
 * Revision 1.3  2006/01/27 01:53:48  bz
 * chinese trans
 *
 * Revision 1.2  2006/01/26 04:22:34  yjf
 * separate text info.
 *
 * Revision 1.1  2006/01/25 00:26:04  abs
 * New interface ready for text extraction
 *
 * Revision 1.6  2005/11/30 04:32:49  gp
 * Removed op number on options list.
 *
 * Revision 1.5  2005/11/30 04:01:41  gp
 * Changed date standard to 'YYYY-MM-DD', and change DMY to Date.
 *
 * Revision 1.4  2005/11/14 23:17:47  abs
 * updated the back to load sched link
 *
 * Revision 1.3  2005/11/14 05:11:14  abs
 * Abdul Modified the Authorize load and made this page view only page
 *
 * Revision 1.2  2005/10/28 02:09:08  dr
 * *** empty log message ***
 *
 * Revision 1.1.1.1  2005/10/14 01:48:27  yjf
 *
 *
 * Revision 1.2  2005/10/11 06:36:23  gp
 * Fixed "pg".
 *
 * Revision 1.1  2005/10/06 23:05:53  gp
 * Initial revision
 *
 *
 *
 *
 **********************************************************/



//This file use unique version for multi-language.
var t__AUTHORISE_LOAD = ["AUTHORISE LOAD","授权发油管理"];
var t__Authorise_Load_Page = ["Authorise Load Page","授权发油管理页面"];
var t__AUTHORISE_UNLOAD = ["AUTHORISE UNLOAD","授权回收管理"];
var t__Authorise_Unload_Page = ["Authorise Unload Page","授权回收管理页面"];
var t__Back_to_Load_Schedules = ["Back to Load Schedules","返回发油配送管理"];
var t__Back_to_Load_Schedules_Page = ["Back to Load Schedules Page","返回发油配送管理页面"];
var t__Compartment = ["Compartment","油仓"];
var t__COMPLETE_BATCH = ["COMPLETE BATCH","完成量"];
var t__Density = ["Density","密度"];
var t__DKI_Omega_Menu = ["DKI Omega Menu","达基Omega系统菜单"];
var t__Equipment = ["Equipment","运输设备"];
var t__LOAD_SCHEDULES = ["LOAD SCHEDULES","发油配送管理"];
var t__MODIFY = ["MODIFY","修改"];
var t__Next = ["Next","下一页"];
var t__Please_input_Seal_No = ["Please input Seal No","请输入封签号"];
var t__Previous = ["Previous","上一页"];
var t__Product = ["Product","油品"];
var t__Quantity = ["Quantity","油量"];
var t__RECEIPT_WATCH = ["RECEIPT WATCH","查看收据"];
var t__Seal_No = ["                       				Seal No","                       				封签号"];
var t__selected = ["selected","selected"];  //this one used as html code, don't need to translate
var t__Supply_Point = ["                       				Supply Point","                       				发油油库"];
var t__Unit = ["Unit","单位"];
var t__UNLOAD_COMPARTMENT = ["UNLOAD COMPARTMENT","回收油仓"];
var t__Unloaded = ["Unloaded","回收量"];
var t__UNLOAD_INSTRUCTION = ["UNLOAD INSTRUCTION","回收说明"];
var t__UNLOAD_PRODUCT = ["UNLOAD PRODUCT","回收油品"];
var t__YOUR_ACTION = ["YOUR ACTION","请选择"];
var t__Authorised = ["                       				Authorised","                       				已授权"];
var t__Date = ["                       				Date","                       				日期"];
var t__Drawer = ["                       				Drawer","                       				油品调配公司"];
var t__License = ["                       				License","                       				许可证"];
var t__Loader = ["                       				Loader","                       				提油人"];
var t__Supplier = ["                       				Supplier","                       				供应商"];
var t__Tanker = ["                       				Tanker","                       				油槽车"];
var t__Trip = ["                       				Trip","                       				提单"];
var t__Trip_Details = ["Trip Details","提单详情"];
var t__Yes = ["Yes", "是"];
var t__No = ["No", "否"];



var myColumns = [ml(t__Equipment), ml(t__Compartment), ml(t__Product), ml(t__Density), ml(t__Quantity), ml(t__Unit), ml(t__Unloaded)];

/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    		
var ops_req_print = [-1, 1,2,3,5, 14];
var ops_req_search = [-1, 1,2,3,5, 14];
function renderPage(cRec, cCol, cState, cPageState, priv, lang)
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



	//  if (curViewDetailState <= 14 || curViewDetailState > 30) // view records
	if (curViewDetailState <= 14 || curViewDetailState >= 24) // view records
	{

		newPage += authLoad();     

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


function authLoad()
{
	var i = 0;
	var authLoad = "";
	var sealreq ="";
    var authStatus = "";

	if ( sealflag == "N" ) {
		sealreq = "";
	} else if ( sealflag == "Y" ) {
		sealreq = "datatype=\"Require\" msg=\""+ml(t__Please_input_Seal_No)+"\"";     
	}

    if ( shlstt < "4" ) {
        authStatus = ml(t__No);
    } else {
        authStatus = ml(t__Yes);
    }

	authLoad += "	<tr>\n";
	authLoad += "		<td align=\"center\">\n";
	authLoad += "			<div class=\"button\">\n";
	authLoad += "				<a href=\"load_scheds.cgi?tankTerm="+tankTerm+"&supp="+supp+"&pg="+pg+" \">"+ml(t__Back_to_Load_Schedules)+"</a>\n";
	authLoad += "			</div><br>\n";
	authLoad += "		</td>\n";
	authLoad += "	</tr>\n";

	authLoad += " 	<tr>\n";
	authLoad += " 		<td align=\"left\">\n";
	authLoad += "		<div id=\"printReady\">\n";
	authLoad += "		<table width=\"100%\">\n";

	authLoad += fieldst_HTML(ml(t__Trip_Details));
	authLoad += "       	<form name=\"authLoad\" id=\"authLoad\" onSubmit=\"return Validator.Validate(this,1)\">\n";
	authLoad += "			<div class=\"adminform\">\n";
	authLoad += "             <table width=\"100%\">\n";
	authLoad += "                	<tr>\n";
	authLoad += "						<td width=\"50%\">\n";
	authLoad += "							<table>\n";
	authLoad += "								<tr>\n";
	authLoad += "                   				<td class=\"infotextheading\">\n";
	authLoad += ml(t__Trip)+":\n";
	authLoad += "                   				</td>\n";
	authLoad += "                   				<td class=\"infotext\">\n";
	authLoad += "										" + tripno ;
	authLoad += "                   				</td>\n";
	authLoad += "                				</tr>\n";
	authLoad += "                				<tr>\n";
	authLoad += "                   				<td class=\"infotextheading\">\n";
	authLoad += ml(t__Tanker)+":\n";
	authLoad += "                   				</td>\n";
	authLoad += "                   				<td class=\"infotext\">\n";
	authLoad += "                     				"+ tanker;
	authLoad += "                 				</tr>\n";
	authLoad += "								<tr>\n";
	authLoad += "                   				<td class=\"infotextheading\">\n";
	authLoad += ml(t__Date)+":\n";
	authLoad += "                   				</td>\n";
	authLoad += "                   				<td class=\"infotext\">\n";
	authLoad += "										" + date;
	authLoad += "                   				</td>\n";
	authLoad += "                				</tr>\n";
	authLoad += "                				<tr>\n";
	authLoad += "                   				<td class=\"infotextheading\">\n";
	authLoad += ml(t__Authorised)+":\n";
	authLoad += "                   				</td>\n";
	authLoad += "                   				<td class=\"infotext\">\n";
	authLoad += "										" + authStatus;
	authLoad += "                 				</tr>\n";
	authLoad += "							</table>\n";
	authLoad += "						</td>\n";
	authLoad += "						<td width=\"50%\">\n";
	authLoad += "							<table>\n";
	authLoad += "								<tr>\n";
	authLoad += "                   				<td class=\"infotextheading\">\n";
	authLoad += ml(t__Supplier)+":\n";
	authLoad += "                   				</td>\n";
	authLoad += "                   				<td class=\"infotext\">\n";
	authLoad += "										" + suppNm;
	authLoad += "                   				</td>\n";
	authLoad += "                				</tr>\n";
	authLoad += "                				<tr>\n";
	authLoad += "                   				<td class=\"infotextheading\">\n";
	authLoad += ml(t__Drawer)+":\n";
	authLoad += "                   				</td>\n";
	authLoad += "                   				<td class=\"infotext\">\n";
	authLoad += "										" + drawerNm;
	authLoad += "                 				</tr>\n";
	authLoad += "								<tr>\n";
	authLoad += "                   				<td class=\"infotextheading\">\n";
	authLoad += ml(t__Supply_Point)+":\n";
	authLoad += "                   				</td>\n";
	authLoad += "                   				<td class=\"infotext\">\n";
	authLoad += "										" + splypnt;
	authLoad += "                   				</td>\n";
	authLoad += "                				</tr>\n";
	authLoad += "                				<tr>\n";
	authLoad += "                   				<td class=\"infotextheading\">\n";
	authLoad += ml(t__Loader)+":\n";
	authLoad += "                   				</td>\n";
	authLoad += "                   				<td class=\"infotext\">\n";
	authLoad += "										<span id=\"ldrv\">" +loader+ "</span>";
	authLoad += "                    				</td>\n";
	authLoad += "                           	</tr>\n";
	authLoad += "							</table>\n";
	authLoad += "						</td>\n";
	authLoad += "                	</tr>\n";
	authLoad += "         	</table>\n";
	authLoad += "            </div>\n"; 
	authLoad += "        	</form>\n";
	authLoad += fieldstFoot_HTML();

	authLoad += "                	<tr>\n";
	authLoad += "						<td colspan=\"2\">\n";
	authLoad += "                         <div id=\"helparea\" > \n";
	authLoad += "							<table>\n";
	authLoad += "								<tr>\n";
	authLoad += "                   				<td class=\"infotextheading\" width=\"150\">\n";
	authLoad += ml(t__Seal_No)+":\n";
	authLoad += "                   				</td>\n";
	authLoad += "                   				<td class=\"infotext\">\n";
	authLoad +=                               sealno+"\n";
	authLoad += "                   				</td>\n";
	authLoad += "                				</tr>\n";
	authLoad += "                				<tr>\n";
	authLoad += "                   				<td class=\"infotextheading\" width=\"150\">\n";
	authLoad += ml(t__License)+":\n";
	authLoad += "                   				</td>\n";

	//  authLoad += "                   				<td>\n";
	//  authLoad += "							        <input type=\"text\" name=\"lic\" id=\"lic\" value=\"\" readonly />\n";
	//  authLoad += "                   				</td>\n";

	authLoad += "                   				<td class=\"infotext\">\n";
	authLoad += "										<span id=\"lic\">" + lic + "</span>";
	authLoad += "                    				</td>\n";
	authLoad += "                 				</tr>\n";
	authLoad += "                				<tr>\n";
	authLoad += "                   				<td class=\"infotextheading\" width=\"150\">\n";
	authLoad += ml(t__Tanker)+":\n";
	authLoad += "                   				</td>\n";

	authLoad += "                   				<td class=\"infotext\">\n";
	authLoad +=                             tnkldr +"\n";
	authLoad += "                   				</td>\n";

	//  authLoad += "                   				<td class=\"infotext\">\n";
	//  authLoad += "										" + tnkldr;
	//  authLoad += "                     			</td>\n";

	authLoad += "                 				</tr>\n";
	authLoad += "							</table>\n";
	authLoad += "							    <input type=\"hidden\" name=\"op\" value=\"24\" />\n";
	authLoad += "							    <input type=\"hidden\" name=\"pg\" value=\"" +pg+ "\" />\n";
	authLoad += "							    <input type=\"hidden\" name=\"tripNo\" value=\"" +tripNo+ "\" />\n";
	authLoad += "							    <input type=\"hidden\" name=\"supp\" value=\"" +supp+ "\" />\n";
	authLoad += "							    <input type=\"hidden\" name=\"tankTerm\" value=\"" +tankTerm+ "\" />\n";
	authLoad += "			               <\/div>\n";
	authLoad += "						</td>\n";
	authLoad += "                	</tr>\n";

	authLoad += "         		</table>\n";
	authLoad += "			<\/div>\n";
	authLoad += " 		</td>\n";
	authLoad += "	</tr>\n";


	return authLoad;
}


function nextPage()
{
	var next = "";
	next += "<tr>\n";
	next +=	"	<td align=\"center\">\n";

	if (pg > 1){
		next += "<a href=\"javascript:document.glblFrm.pg.value=pg-1;document.glblFrm.op.value=0;document.glblFrm.submit();\">"+ml(t__Previous)+"</a>\n";
	}
	next += "&nbsp; Current=" + pg;
	next += "/";
	next += pagesTotal;
	if (pagesTotal > pg)
	{
		next += "&nbsp; <a href=\"javascript:document.glblFrm.pg.value=pg+1;document.glblFrm.op.value=0;document.glblFrm.submit();\">"+ml(t__Next)+"</a>\n";
	}

	next += "	</td>\n";
	next += "</tr>\n";

	if(pagesTotal == 0 || pg < 1)
	{
		next = "";
	}

	return next;   
}


function addButton()
{
	var button = "";
	button += "<tr>\n";
	button += "	<td align=\"center\">\n";
	button += "		<div class=\"button\">\n";
	button += "			<a href=\"load_scheds.cgi?tankTerm="+tankTerm+"&supp="+supp+"\">"+ml(t__Back_to_Load_Schedules_Page)+"</a>\n";
	button += "		</div><br>\n";
	button += " </td>\n";
	button += "</tr>\n";

	return button;
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

function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;
	//  if (op <= 14 || op > 30)
	if (op <= 14 || op >= 24)
	{
		pageHeading +=ml(t__AUTHORISE_LOAD);
	}
	else if(op == 15 )
	{
		pageHeading +=ml(t__AUTHORISE_UNLOAD);
	}


	return pageHeading;   
}

function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;
	//  if (op <= 14 || op > 30)
	if (op <= 14 || op >= 24)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Authorise_Load_Page);

	}
	else if (op == 15)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Authorise_Unload_Page);

	}


	return pageTitle;
}


/* define function op_list() */
function op_list(priv)
{
	/* priv = 
	   6 modify	op=1,2,3
	   7 add		op=4
	   8 delete	op=5
	 */
	var op_list ="";
	op_list +="<select name=op onchange=\"submit();\">\n";
	switch (priv)
	{
		case 8:

		case 7:			
		case 6:
			op_list +="<option value=27>"+ml(t__MODIFY)+"</option>";
			op_list +="<option value=21>"+ml(t__UNLOAD_COMPARTMENT)+"</option>";
			op_list +="<option value=22>"+ml(t__UNLOAD_PRODUCT)+"</option>";
			op_list +="<option value=23>"+ml(t__UNLOAD_INSTRUCTION)+"</option>";
			op_list +="<option value=24>"+ml(t__COMPLETE_BATCH)+"</option>";
			op_list +="<option value=25>"+ml(t__RECEIPT_WATCH)+"</option>";

		case 5:			
			break;
	}
	op_list +="<option value=0 selected>--\t"+ml(t__YOUR_ACTION)+"\t--</option>";
	op_list +="</select>                                        ";
	return op_list ;
}

/* this is displaySubEqpDropList function to

 * display the Equipment Types submit

 * values are displayed in the following format

 *   <option value="eqpCd_numOfCmpts"> </option>

 *   then submitsubEq function extracts the value of 

 *   the equipement code and number of compartments. 

 * form 

 */


function displaySubEqpDropList(selectedvalue, list,defMsg)
{

	var massList = "";
	var matchFound=0;

	for (i=1; i<list.length; i++){
		massList += "<option value=\""+list[i][0]+"_"+list[i][2]+"\"";
		if(list[i][0]==selectedvalue)
		{
			matchFound=1;
			massList += ml(t__selected);
		}

		massList +=">"+list[i][0]+" -- \t \t -- "+list[i][1]+" -- \t \t -- "+list[i][2]+"</option>\n";
	}

	massList += "<option value=\"\"";
	if(matchFound==0)//no matchfound
	{
		massList += ml(t__selected);
	}
	massList +=">"+defMsg+"</option>\n";
	massList +="</select>\n";
	return massList;
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
	newPage +="	return Validator.Validate(myobject,1);\n";
	newPage +="}\n";
	newPage +="\n";

	newPage +="function dispLic(value){ \n";
	newPage +="	if(value != undefined){ \n";
	newPage +="		for(i in driver_jslst){ \n";
	newPage +="			if(value == driver_jslst[i][0]){ \n";
	newPage +="				document.getElementById('lic').innerHTML = driver_jslst[i][2]; \n";
	newPage +="				document.getElementById('ldrv').innerHTML = driver_jslst[i][3]; \n";
	newPage +="			} \n";
	newPage +="		} \n";
	newPage +="	} \n";
	newPage +="} \n";
	newPage +="</script>\n";
	newPage += "</head>\n";
	newPage += "<body>\n";
	return (newPage);
}



