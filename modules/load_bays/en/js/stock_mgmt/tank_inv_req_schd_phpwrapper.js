	var myColumns = [
			"Type", "Period",	"Date","Time", "Day of Week "
      ,	"Depot",	"All"
		];
		                            
	var tkSelection_myColumns = [
			"Tank", "Inventory Required",	"Ad Hoc"
		];
	var dateFormat = "yyyy-MM-dd";	
	var timeFormat = "[HH:MM]";	

	var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[27]= "Successfully Inserted A New Record !";
    l_opInf[18]= "Successfully Deleted!";
    l_opInf[37]= "Insert New Record Failed!";
    l_opInf[28]= "Delete Failed!";    
    l_opInf[137]= "DB Insert Failed!";
    l_opInf[128]= "DB Delete Failed!";		
var ops_req_print = [-1,0,1,27,18,37,28];
var ops_req_search = [-1,0,1,27,18,37,28];
/*
 * All the text relevant to the TANK INVENTORY SCHEDULE
 * page is in  otherText Hash table  
 * the use of this array is otherText[key]
 */				
				
  var otherText = new Array()
	otherText["youraction"] =  "YOUR ACTION";
  otherText["prfile"] =  "PROFILE";
  otherText["brkdn"] =  "BREAKDOWN";
  otherText["tk_selctn"] =  "Tank Selection";
	otherText["btn_addNew_schReq"] =  "Add New Inventory Schedules Request";
	otherText["btn_bakto_eqpTp"] =  "Back to Inventory Schedules Request";  
	otherText["dept"] =  "Depot";  
  otherText["msg_selAInvTp"] =  "Select Inventory Type";
  otherText["msg_selAInvPd"] =  "Select Inventory Period";
  otherText["selectDate"] = "Select Date";
  otherText["msg_enterInvDt"] = "Enter Inventory Date";
  otherText["InvDt"] = "Inventory Date";
  otherText["invTime"]= "Inventory Time";
  otherText["msg_invTime"] = "Enter Inventory Time";
  otherText["typ"] = "Type";  
  otherText["period"] = "Period";
  otherText["selAllTks"] = "Select All Tanks";
  otherText["invDt"] = "Inventory Date";
  otherText["msg_selAEqpCd"] =  "Select Equipment Type";
  otherText["msg_noCmptAssProd"] =  "No Compartment has been assigned a product";
  otherText["msg_valid_invDt"] =  "Enter Valid Date";
  otherText["msg_valid_hrs"] =  "Invalid value for hours:";  
  otherText["msg_valid_mints"] =  "Invalid value for minutes:";  
  otherText["msg_valid_timFmt"] =  "Invalid time format:";  
  otherText["msg_cnfm_allbays"] = "Lock out all the bays on ";
  otherText["at"] = " at ";
  otherText["msg_selADept"] =  "Select A Depot";
  otherText["msg_selUnit"] =  "Select Unit";    
  otherText["msg_selARcTp"] =  "Select Receiving Type";
  otherText["msg_addNewschReq_fSet"] =  "Add New Tank Inventory Schedule Request details";  
  otherText["msg_addNewEqpPrfile_fSet"] =  "Add new Equipment Profile details";
  otherText["msg_addPreDefEqp_fSet"] =  "Add Pre-Defined Equipment details";  
  otherText["msg_addEqpCmpts_fSet"] =  "Add New Compartment to equipment details";   
  otherText["msg_addNewschReq_frmComplt"] = "Complete and submit the following form to add new Inventory Request Schedule, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
  otherText["msg_modEqpPrfile_fSet"] =  "Modify Equipment Profile details";
  otherText["msg_modEqpPrfile_frmComplt"] = "Complete and submit the following form to modify Equipmetn Profile, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
  otherText["msg_addPreDefEqp_frmComplt"] = "Complete and submit the following form to add Pre-Defined Equipment, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
  otherText["msg_addEqpCmpts_frmComplt"] = "Complete and submit the following form to add new Compartment to an Equipment, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
  otherText["pgHead"] =  "tank inventory request schedules";
  otherText["pgHead_AddSchReq"] =  "add new tank inventory request schedules";
  otherText["pgHead_ModeqpTp"] =  "modify new tank inventory request schedules";
  otherText["pgTitle"] =  "Stock Management, Equiptment Types";
  otherText["pgTitle_AddSchReq"] =  "Stock Management, ADD NEW TANK INVENTORY REQUEST SCHEDULES";
  otherText["pgTitle_ModSchReq"] =  "Stock Management, Modify TANK INVENTORY REQUEST SCHEDULES";
  
  /* time array to display in the drop list
  */
  var timeArr = [
   ["",""]
  ,["00:00","00:00"]
  ,["01:00","01:00"]
  ,["02:00","02:00"]
  ,["03:00","03:00"]
  ,["04:00","04:00"]
  ,["05:00","05:00"]
  ,["06:00","06:00"]
  ,["07:00","07:00"]
  ,["08:00","08:00"]
  ,["09:00","09:00"]
  ,["10:00","10:00"]
  ,["11:00","11:00"]
  ,["12:00","12:00"]
  ,["13:00","13:00"]
  ,["14:00","14:00"]
  ,["15:00","15:00"]
  ,["16:00","16:00"]
  ,["17:00","17:00"]
  ,["18:00","18:00"]
  ,["19:00","19:00"]
  ,["20:00","20:00"]
  ,["21:00","21:00"]
  ,["22:00","22:00"]
  ,["23:00","23:00"]
	];
/*
 * opValues Hash table trace the 
 * available options on this page 
 * for every function there is a unique op
 */		    
 var opValues = new Array();
  opValues["init"] = 1;
  opValues["tk_selectn"] = 2;
  opValues["enterAdd"] = 7; 
  opValues["submitAddInv"] = 17;
  opValues["enterDelete"] = 8;
  opValues["submitDelete"] = 18;
  opValues["enterModify"] = 6;
  opValues["submitModify"] = 16;		
	

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
  newPage += local_HeadrHTML(newPage);
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
	if (curViewDetailState <= 1 || curViewDetailState > 10) // view records
  {
      newPage +=addNewBtn_HTML();
      newPage +=displayStatusMsg (op); 
      newPage += "<tr> \n";
      newPage += "<td>\n ";
  	  newPage += infoTableHdr_HTML();
      newPage += infoTable_HTML(curColumnToSort);
      newPage += "<\/tbody>";
      newPage += "<\/table>";
      newPage += "<\/div>";
  		newPage += "<\/td>";	
  		newPage += "<\/tr>";    
   
		}
		
 if (priv > 6 && curViewDetailState ==opValues["enterAdd"])
 {
    newPage += displayAddNewFrm();
 }  
 if (priv > 6 && curViewDetailState ==opValues["enterModify"])
 {
    newPage += displayModFrm();
 }  
 
  // table for everything ends here
  newPage +="<\/tbody>\n";
  newPage +="<\/table>\n";
  newPage +="<\/div>\n";
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
function displayAddNewFrm()
{
  var indent = 1;
  var addFrmhtml ="";
  addFrmhtml +=backToBtn_HTML();
  addFrmhtml += fieldst_HTML(otherText["msg_addNewschReq_fSet"]);
  addFrmhtml += " <div class=\"adminform\">\n";
  addFrmhtml +="<table width=\"100%\">\n";
  addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_addNewschReq_frmComplt"]); 
  addFrmhtml += "      <form name=\"addNew\" method =\"post\" id=\"addNew\" onSubmit=\"return submitInvReqSchFrm(this)\">\n";
  addFrmhtml +="						<tr>\n";
  addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
  addFrmhtml +="										<table width=\"100%\">\n";
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"112\" ", otherText["typ"]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select name=\"h_TKRQ_TYPE\" id=\"h_TKRQ_TYPE\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selAInvTp"]+"\"> \n";
  addFrmhtml += displayDropList("", h_TKRQ_TYP_jslst,otherText["msg_selAInvTp"]);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"112\" ", otherText["period"]+":");
  addFrmhtml += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select name=\"h_TKRQ_PERIOD\" id=\"h_TKRQ_PERIOD\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selAInvPd"]+"\"> \n";
  addFrmhtml += displayDropList("", h_TKRQ_PERIOD_jslst,otherText["msg_selAInvPd"]);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  //2nd row
  
  addFrmhtml += makespace("\t", indent+4) + "<tr>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";


	dateStr = dateURL_HTML("document.forms[0].frm_start_day", "date_anchor1", dateFormat, otherText["selectDate"]);
//makefield(type, title, value, name, id, list, size, maxlen, validator, msg, mandatory, indent, width)
	addFrmhtml += makefield(4, otherText["InvDt"], "", "frm_start_day", "frm_start_day", dateStr, "", 10, "dataType=\"Require\"", otherText["msg_enterInvDt"], "*", indent+4, 100);
	
	addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"112\" ", otherText["invTime"]);
  addFrmhtml += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"time\" id=\"time\" maxLength=\"5\" size=\"5\" dataType=\"Require\" value=\"\" msg=\""+otherText["msg_invTime"]+"\" \/> \n";
  addFrmhtml +=" &nbsp;<span class=\"infotext\">"+timeFormat+"</span>\n";
  addFrmhtml +="                             <input type=\"hidden\" name=\"h_TKRQ_DUE\" id=\"h_TKRQ_DUE\" value=\"\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  //3rd row
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"112\" ", otherText["dept"]+":");
  addFrmhtml += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select name=\"h_TKRQ_DEPOT\" id=\"h_TKRQ_DEPOT\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selADept"]+"\"> \n";
  addFrmhtml += displayDropList("", terminal,otherText["msg_selADept"]);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									   </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"112\" ",  otherText["selAllTks"]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
   addFrmhtml +="															<td class=\"infotext\"> \n";
  addFrmhtml +=commText["Yes"]+"                             <input type=\"radio\" name=\"h_TKRQ_ALLFLAG\" id=\"h_TKRQ_ALLFLAG\" value=\"Y\" checked> \n";
  addFrmhtml +=commText["No"]+"                              <input type=\"radio\" name=\"h_TKRQ_ALLFLAG\" id=\"h_TKRQ_ALLFLAG\" value=\"N\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  
  
  addFrmhtml +="								    </tr>\n";
  
  addFrmhtml +="								    </table>\n";
  addFrmhtml +=frmButtRow_HTML("Add", 1);
                  
  addFrmhtml +="							   </td>\n";
  addFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Add", 1);
  addFrmhtml +="							</table>\n";
  addFrmhtml += " <\/div>\n";
  addFrmhtml +=op_field (opValues["submitAddInv"]);
  addFrmhtml += "                    </form>\n";                      
  addFrmhtml += fieldstFoot_HTML();
  return addFrmhtml;
}
function displayModFrm()
{
  var indent = 1;
  var addFrmhtml ="";
  addFrmhtml +=backToBtn_HTML();
  addFrmhtml += fieldst_HTML(otherText["msg_addNewschReq_fSet"]);
  addFrmhtml += " <div class=\"adminform\">\n";
  addFrmhtml +="<table width=\"100%\">\n";
  addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_addNewschReq_frmComplt"]); 
  addFrmhtml += "      <form name=\"addNew\" method =\"post\" id=\"addNew\" onSubmit=\"return submitInvReqSchFrm(this)\">\n";
  addFrmhtml +=h_TKRQ_DUE_ORG_field(" type=\"hidden\" ");
  addFrmhtml +=h_TKRQ_DUE_field(" type=\"hidden\" ");
  addFrmhtml +="						<tr>\n";
  addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
  addFrmhtml +="										<table width=\"100%\">\n";
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"112\" ", otherText["typ"]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select name=\"h_TKRQ_TYPE\" id=\"h_TKRQ_TYPE\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selAInvTp"]+"\"> \n";
  addFrmhtml += displayDropList(h_TKRQ_TYPE, h_TKRQ_TYP_jslst,otherText["msg_selAInvTp"]);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"112\" ", otherText["period"]);
  addFrmhtml += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select name=\"h_TKRQ_PERIOD\" id=\"h_TKRQ_PERIOD\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selAInvPd"]+"\"> \n";
  addFrmhtml += displayDropList(h_TKRQ_PERIOD, h_TKRQ_PERIOD_jslst,otherText["msg_selAInvPd"]);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  //2nd row
  
  addFrmhtml += makespace("\t", indent+4) + "<tr>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  dateStr = dateURL_HTML("document.forms[0].frm_start_day", "date_anchor1", dateFormat, otherText["selectDate"]);
	addFrmhtml += makefield(4, otherText["InvDt"], h_TKRQ_DUE, "frm_start_day", "frm_start_day", dateStr, "", 10, "dataType=\"Require\"", otherText["msg_enterInvDt"], "*", indent+4, 100);
	
	addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"112\" ", otherText["invTime"]);
  addFrmhtml += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"time\" id=\"time\" maxLength=\"5\" size=\"5\" dataType=\"Require\" value=\""+h_TKRQ_DUE_TIME+"\" msg=\""+otherText["msg_invTime"]+"\" \/> \n";
  addFrmhtml +=" &nbsp;<span class=\"infotext\">"+timeFormat+"</span>\n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  //3rd row
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"112\" ", otherText["dept"]+":");
  addFrmhtml += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select name=\"h_TKRQ_DEPOT\" id=\"h_TKRQ_DEPOT\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selADept"]+"\"> \n";
  addFrmhtml += displayDropList(h_TKRQ_DEPOT, terminal,otherText["msg_selADept"]);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									   </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"112\" ",  otherText["selAllTks"]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  var isYChecked ="";
  var isNChecked ="";
  if (h_TKRQ_ALLFLAG =="Y")    	    
  {
    isYChecked ="checked";
    isNChecked ="";
  }
  else
  {
    isYChecked ="";
    isNChecked ="checked";
  }
 
  addFrmhtml +="															<td class=\"infotext\"> \n";
  addFrmhtml +=commText["Yes"]+"                             <input type=\"radio\" name=\"h_TKRQ_ALLFLAG\" id=\"h_TKRQ_ALLFLAG\" value=\"Y\" "+isYChecked+" > \n";
  addFrmhtml +=commText["No"]+"                              <input type=\"radio\" name=\"h_TKRQ_ALLFLAG\" id=\"h_TKRQ_ALLFLAG\" value=\"N\" "+isNChecked+"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  
  
  addFrmhtml +="								    </tr>\n";
  
  addFrmhtml +="								    </table>\n";
  addFrmhtml +=frmButtRow_HTML("Update", 1);
                  
  addFrmhtml +="							   </td>\n";
  addFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Add", 1);
  addFrmhtml +="							</table>\n";
  addFrmhtml += " <\/div>\n";
  addFrmhtml +=op_field (opValues["submitModify"]);
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
function h_TKRQ_DUE_field(attr)
{
  var fieldHTML ="";
  fieldHTML +="<input name=\"h_TKRQ_DUE\" id=\"h_TKRQ_DUE\" value=\""+h_TKRQ_DUE+"\" "+attr+" >\n";
  return fieldHTML;
}
function h_TKRQ_DUE_ORG_field(attr)
{
  var fieldHTML ="";
  fieldHTML +="<input name=\"h_TKRQ_DUE_ORG\" id=\"h_TKRQ_DUE_ORG\" value=\""+h_TKRQ_DUE_ORG+"\" "+attr+" >\n";
  return fieldHTML;
}
function backToBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   btn_HTML += btnLocation_HTML("justChaneMyLocation('tank_inv_req_schd.php'); ", otherText["btn_bakto_eqpTp"]);
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}
function addNewBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   btn_HTML += btnLocation_HTML("justChaneMyLocation('tank_inv_req_schd_tank.php?term="+terminal[1][0]+"'); ", otherText["tk_selctn"]);
   if(priv>=7)
   {
		btn_HTML += btnLocation_HTML("justChaneMyLocation('tank_inv_req_schd.php?op="+opValues["enterAdd"]+"'); ", otherText["btn_addNew_schReq"]);
	}
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}
function updatePageHeading(op,pgHead)
{
  var pageHeading = pgHead;
  if (op <= 1 || op > 10)
  {
    pageHeading +=otherText["pgHead"];
  }
  if (op ==6 )
  {
    pageHeading += otherText["pgHead_ModeqpTp"];
  }
  if (op ==7 )
  {
    pageHeading +=otherText["pgHead_AddSchReq"];
  }
  return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
  if (op <= 1 || op > 10)
  {
    pageTitle += otherText["pgTitle"];
    
  }
  if (op ==6 )
  {
    pageTitle += otherText["pgTitle_ModSchReq"];
  }
  if (op ==7 )
  {
    pageTitle += otherText["pgTitle_AddSchReq"];
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
      op_list +="<option value=\""+opValues["enterDelete"]+"\">"+commText["Delete"]+"</option>";
      
    case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */
    

    case 6:    /* Modify not required for The Tank Grouping Page  */
    op_list +="<option value=\""+opValues["enterModify"]+"\">"+commText["Modify"]+"</option>";
    case 5:			/* Find Has not been implemented yet*/
    
    
    break;
  }
  
  op_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
  op_list +="</select>                                        ";
  return op_list ;
}
// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.
function submitInvReqSchFrm(myformObj)
{
  //alert("I have been called"+document.addNew.h_TKRQ_DUE.value);
  if(submitmyform(myformObj) && (checkTime(document.addNew.time.value)) )
  {
    // when time and date has been validated just set
    // datTime variable value to a string
    // composed of date and time
    var dateSel = document.addNew.frm_start_day.value;
    var timeSel = document.addNew.time.value;
    document.addNew.h_TKRQ_DUE.value = dateSel +" "+timeSel;
    var myselectedvalue = document.addNew.h_TKRQ_TYPE.options[document.addNew.h_TKRQ_TYPE.selectedIndex].value;
    if(myselectedvalue=="1") // that means All tanks should be selected and lock out message would be displayed
    {
      if(document.addNew.h_TKRQ_ALLFLAG[0].checked)
      {
         if(confirm(otherText["msg_cnfm_allbays"]+document.addNew.frm_start_day.value +otherText["at"]+  document.addNew.time.value +""))
         {
          return true;
         }
         else
         {
          return false; 
         }
      }
      else
      {
        alert(otherText["selAllTks"]);
        return false; 
      } 
    }
    else
    {
      return true;
    }
  }  
  return false; 

   
}

// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.
function checkTime(actualValue)
{
    var errorMsg = "";

    // regular expression to match required time format
    re = /^(\d{1,2}):(\d{2})([ap]m)?$/;
    
    if(actualValue != '') {
      if(regs = actualValue.match(re)) {
        if(regs[3]) {
          // 12-hour time format with am/pm
          if(regs[1] < 1 || regs[1] > 12) {
            errorMsg = otherText["msg_valid_hrs"] + actualValue;
          }
        } else {
          // 24-hour time format
          if(regs[1] > 23) {
            errorMsg = otherText["msg_valid_hrs"] + actualValue;
          }
        }
        if(!errorMsg && regs[2] > 59) {
          errorMsg = otherText["msg_valid_mints"]  + actualValue;
        }
        
      } else {
        errorMsg = otherText["msg_valid_timFmt"]+ actualValue;
      }
    }

    if(errorMsg != "") {
      alert(errorMsg);
      document.addNew.time.focus();
      return false;
    }
    
    return true;
}
/* define infoTableHdr_HTML() 
 * responsible for printing the HTML Table
 * heading for the information table  
 */
function infoTableHdr_HTML()
{
  var newPage ="";
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
  return (newPage);
}
/* define infoTable_HTML() 
 * responsible for printing the HTML Table
 * to display the records on this page  
 */
function infoTable_HTML(curColumnToSort)
{
  var newPage ="";
		for(i in tank_inv_req_schd_tab)
    {
      if(i>0)
      {
        newPage += "<tr class=\"row1\">\n";
        var howmanyDone =0;
        for(var j=0; j<myColumns.length; j++)
        {
          if (curColumnToSort == howmanyDone)
          {
            newPage += "<td style=\"background-color:#EEEEEE\">" + obs(tank_inv_req_schd_tab[i][howmanyDone]) + "<\/td>";
			    } 
          else 
          {
          
				    newPage += "<td>\n";				  
				    if(howmanyDone==0) // means time to display the drop list and table
				    {
  				    newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
              newPage +="       <table border=\"0\">\n";
              newPage +="	       <tr>\n";
              newPage +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+obs(tank_inv_req_schd_tab[i][howmanyDone])+"</span>\n";
              newPage +="          <input type=\"hidden\" name=\"h_TKRQ_DUE\" id=\"h_TKRQ_DUE\" value=\""+tank_inv_req_schd_tab[i][2]+ " "+tank_inv_req_schd_tab[i][3]+"\">\n";
              newPage +="          <input type=\"hidden\" name=\"terminal\" id=\"terminal\" value=\""+tank_inv_req_schd_tab[i][5]+"\">\n";
              newPage +="          </td>\n";
              newPage +="          <td>\n";
              newPage += op_list(priv,i);
              newPage +="          </td>\n";
              newPage +="	       </tr>\n";
              newPage +="	      </table>\n";
              newPage +="	      </form>\n";
            }
            else if(tank_inv_req_schd_tab[i][howmanyDone]=="Y" ||(tank_inv_req_schd_tab[i][howmanyDone]=="y"))
            {
              newPage += commText["Yes"];
            }
            else if(tank_inv_req_schd_tab[i][howmanyDone]=="N" ||(tank_inv_req_schd_tab[i][howmanyDone]=="n"))
            {
              newPage += commText["No"];
            }
            else 
            {
              newPage += obs(tank_inv_req_schd_tab[i][howmanyDone]);
            }  
          
            newPage += "<\/td>\n";
          
          
		  	}
		  	howmanyDone++;	
      } // end of inner for loop
      
		  
     }
      newPage += "\n";
      newPage += "<\/tr>";
    }
  return (newPage);
}
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage)
{
  newPage +="<script>\n";
  newPage +="/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
  newPage +="[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
  newPage +="'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
  newPage +="function submitAction(myobject,frmNum)\n";
  newPage +="{\n";
  newPage +="	  var myCurQstring=produceQString();\n";
  newPage +=    "var myselectedvalue = myobject.options[myobject.selectedIndex].value;";
  newPage +="   if(myselectedvalue==\"8\")\n";
  newPage += "  {\n";
  newPage +="     if(confirm('Are you sure you want to delete?'))\n";
  newPage += "    {\n";
  newPage += "    eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
  newPage += "      return true;\n";
  newPage += "    }\n";
  newPage +="     else\n";
  newPage += "    {\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
  newPage += "      return false;\n";
  newPage += "    }\n";
  newPage +="   }\n";
  newPage +="   if(myselectedvalue==\"2\")\n";
  newPage += "  {\n";
  newPage += "    var myterm = eval(\"document.select_action_\"+frmNum+\".terminal.value;\");\n";
  newPage +="     document.location.href=\"tank_inv_req_schd_tank.php?term=\"+myterm+\"\";\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage += "  {\n";
  newPage += "    eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
  newPage += "    return true;\n";
  newPage +="   }\n";
  
  newPage +="}\n";
	newPage +="//Calendar Variable\n";

	newPage +="	var cal = new CalendarPopup();\n";
	newPage +="	cal.showYearNavigation();\n";
  newPage +="</script>\n";
  newPage +="\n";
  newPage +="</head>\n";
  newPage +="\n";
  newPage +="<body>\n";
  
  newPage +="\n";
  newPage +="\n";
  return (newPage);
}
