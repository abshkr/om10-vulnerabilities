/*
 * METER DEVICES Table Headings are defined 
 * here makes the translation easy  
 */		
var myColumns = [
		"Type", "Address", "Code", "Source", "Unit", "Receiving", "Unit", "Amb", "Cor", "Poll"
	];
/*
 * All the text relevant to the METER DEVICES
 * page is in  otherText Hash table  
 * the use of this array is otherText[key]
 */		
	
var otherText = new Array()
	otherText["youraction"] =  "YOUR ACTION";
  otherText["tkselect"] =  "TANK SELECTION";
	otherText["btn_addNew_mtrdvc"] =  "Add New Meter Device";
	otherText["btn_bakto_mtrdvcPg"] =  "Back to Meter Device Page";  
  otherText["msg_selAdvcTp"] =  "Select A Device Type";  
  otherText["msg_valid_address"] =  "Enter Address Between [0-9]";
  otherText["msg_valid_mtd"] =  "Enter Valid Number for Meter Device Code";
  otherText["msg_valid_poll"] =  "Enter Poll Between [10-9999]";  
  otherText["msg_valid_srcdst"] =  "SOURCE AND/OR DESTINATION MUST BE A TANK";
  otherText["msg_selASrc"] =  "Select A Source Type"; 
  otherText["msg_selUnit"] =  "Select Unit";
  otherText["msg_selUnit_valid_rcv"] =  "Enter Receiving Unit"; 
  otherText["msg_selUnit_valid_src"] =  "Enter Source Unit";     
  otherText["msg_selARcTp"] =  "Select Receiving Type";
  otherText["msg_addNewmtrdvc_fSet"] =  "Add new meter device details";
  otherText["msg_addNewmtrdvc_frmComplt"] = "Complete and submit the following form to add new meter device, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
  otherText["msg_modmtrdvc_fSet"] =  "Modify meter device details";
  otherText["msg_modmtrdvc_frmComplt"] = "Complete and submit the following form to modify meter device, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
  otherText["pgHead_mtrdvc"] =  "meter devices";
  otherText["pgHead_Addmtrdvc"] =  "add new meter devices";
  otherText["pgHead_Modmtrdvc"] =  "modify meter device";
  otherText["pgTitle_mtrdvc"] =  "DKI Omega Menu :: Stock Management, Meter Devices";
  otherText["pgTitle_Addmtrdvc"] =  "DKI Omega Menu :: Stock Management,Meter Devices , Add New Meter Devices";
  otherText["pgTitle_Modmtrdvc"] =  "DKI Omega Menu :: Stock Management,Meter Devices , Modify Meter Device";
/*
 * opValues Hash table trace the 
 * available options on this page 
 * for every function there is a unique op
 */		    
 var opValues = new Array();
  opValues["enterAdd"] = 7;
  opValues["submitAdd"] = 17;
  opValues["enterDelete"] = 8;
  opValues["submitDelete"] = 18;
  opValues["enterModify"] = 6;
  opValues["submitModify"] = 16;
/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * Modified on May 15, 2006
 * an attempt to make consistent user
 * feedback messages 
 */		   
  var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[18]=  g_opInf[28];
    l_opInf[23]=  g_opInf[27];
    l_opInf[25]=  g_opInf[27];
    l_opInf[27]=  g_opInf[27];
    l_opInf[24]=  g_opInf[28];
    l_opInf[33]=  g_opInf[37];
    l_opInf[37]=  g_opInf[37];
    l_opInf[34]=  g_opInf[38] ;
    l_opInf[133]= g_opInf[136];
    l_opInf[137]= g_opInf[137];
    l_opInf[134]= g_opInf[138];
    
/*
 * drpListtyp array defines what src and receiver type
 * requires the drop list and which 1s require 
 * input type text type.
 * 
 */		
    var drpListtyp = [3];
   
/* define renderPage()
 * is the main function responsible for 
 * printing the HTML of the current page
 * consisit of serires of function responsible for 
 * printing the header section fo the page    
 * @param cRec NOT IN USE FUTURE USE
 * @param cCol cCol colname to sort NOT IN USE FUTURE USE
 * @param cState is actually a Current OP
 * @param priv privlage level of the current user
 * @param lang current Language variable    
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
  newPage += local_HeadrHTML(newPage);
  //getToolBar_HTML function of comm_HTML.js file responsible for  
  // outputting the tool bar
  //controls the search and print buttons as well
  newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),true, true);
  newPage +="<tr>\n";  
  newPage +="<td width=\"100%\">             \n";
  newPage +="<div class=\"content\">\n";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";  
  //start after the global form
  // if OP is <=1 OR Higher than available options should always come to this view
  if (curViewDetailState <= 1 || curViewDetailState >10) 
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
		
 
 if (priv >= 7 && curViewDetailState ==opValues["enterAdd"]) // able to insert Show add new form
 {
     newPage += displayAddNewMtrDvc();
 }
 if (priv >= 6 && curViewDetailState == 6) // display the Delivery Locations
 {
    newPage += displayModMtrDvcFrm( );
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
/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ displayAddNewMtrDvc] 
[PURPOSE]  		-> 	Responsible for displaying the Add new Meter Device Form.
                  
          

[AUTHOR]  		-> Abdul Shakoor (DKI) Sept 2, 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function displayAddNewMtrDvc()
{
  var addFrmhtml ="";
  addFrmhtml +=backToBtn_HTML();   
  addFrmhtml += fieldst_HTML(otherText["msg_addNewmtrdvc_fSet"]);
  addFrmhtml += "                            <div class=\"adminform\">\n";
  addFrmhtml +="<table width=\"100%\">\n";
  addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_addNewmtrdvc_frmComplt"]); 
  addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"meter_dev.cgi\" onsubmit=\"return validateAndSubmit(this)\">\n";
  
  addFrmhtml +=          preqstr_field ();
  addFrmhtml +="						<tr>\n";
  addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
  addFrmhtml +="										<table width=\"100%\">\n";
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[0]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select id=\"type\" name=\"type\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selAdvcTp"]+"\" > \n";
  addFrmhtml +=displayDropList(type, mtd_typ_jsArr,otherText["msg_selAdvcTp"]);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[1]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"address\" id=\"address\" maxLength=\"1\" dataType=\"PositiveIntGteZero\" msg=\""+otherText["msg_valid_address"]+"\"> <span class=\"infotextheading\">[0-9]<\/span>\n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  //Row 2
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[2]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"mtd\" id=\"mtd\" maxLength=\"4\" dataType=\"Require\" msg=\""+otherText["msg_valid_mtd"]+"\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[3]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select id=\"src\" name=\"src\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selASrc"]+"\" onchange=\"updateSrcTypDisable(this);\" > \n";
  addFrmhtml +=displayDropList(src, pmv_typ_jsArr,otherText["msg_selASrc"]);
  
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
 
  //end of Row 2
  
  //Begin Row 3 for the form
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[3]+" "+myColumns[4]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="															<div id=\"div_drp_srcTyp\" style=\"VISIBILITY: hidden\">\n";
  
  addFrmhtml +="                             <select id=\"drp_srcTyp\" name=\"srcTyp\" class=\"smallselect\" dataType=\"\" msg=\""+otherText["msg_selUnit_valid_src"]+"\" disabled=\"true\"> \n";
  addFrmhtml +=displayDropList(srcTyp, tanks_lst_jsArr,otherText["msg_selUnit"]);
  addFrmhtml +="															<\/div>\n";
  addFrmhtml +="															<div id=\"div_ipt_srcTyp\" style=\"\">\n";
  
  addFrmhtml +="                             <input type=\"text\" name=\"srcTyp\" id=\"ipt_srcTyp\" maxLength=\"10\" dataType=\"Number\"  msg=\""+otherText["msg_selUnit_valid_src"]+"\"> \n";
  addFrmhtml +="															<\/div>\n";
  
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[5]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select id=\"dst\" name=\"dst\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selARcTp"]+"\" onchange=\"updateRcvTypDisable(this);\" > \n";
  addFrmhtml +=displayDropList(dst, pmv_typ_jsArr,otherText["msg_selARcTp"]);
  
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  //End row 3
  //Begin Row 4 for the form
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[5]+" "+myColumns[6]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="															<div id=\"div_drp_dstTyp\" style=\"VISIBILITY: hidden\">\n";
  
  addFrmhtml +="                             <select id=\"drp_dstTyp\" name=\"dstTyp\" class=\"smallselect\" dataType=\"\" msg=\""+otherText["msg_selUnit_valid_rcv"]+"\" > \n";
  addFrmhtml +=displayDropList(dstTyp, tanks_lst_jsArr,otherText["msg_selUnit"]);
  addFrmhtml +="															<\/div>\n";
  addFrmhtml +="															<div id=\"div_ipt_dstTyp\" style=\"\">\n";
  
  addFrmhtml +="                             <input type=\"text\" name=\"dstTyp\" id=\"ipt_dstTyp\" maxLength=\"10\" dataType=\"Number\"  msg=\""+otherText["msg_selUnit_valid_rcv"]+"\"> \n";
  addFrmhtml +="															<\/div>\n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[9]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"poll\" id=\"poll\" maxLength=\"4\" size=\"4\"  dataType=\"RangeValue\" min=\"10\" max=\"9999\"  msg=\""+otherText["msg_valid_poll"]+"\">  <span class=\"infotextheading\">[10-9999]<\/span> \n";
  
  
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  //End row 4
  addFrmhtml +="								    </table>\n";
  addFrmhtml +=frmButtRow_HTML("Add", 1);
                  
  addFrmhtml +="							   </td>\n";
  addFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Add", 1);
  addFrmhtml +="							</table>\n";
  addFrmhtml +="							</div>\n";
  addFrmhtml +=op_field (opValues["submitAdd"]);
  addFrmhtml += "                    </form>\n";
                        
  addFrmhtml += fieldstFoot_HTML();
  return addFrmhtml;
}
/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ displayAddNewMtrDvc] 
[PURPOSE]  		-> 	Responsible for displaying the Add new Meter Device Form.
                  
          

[AUTHOR]  		-> Abdul Shakoor (DKI) Sept 2, 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function displayModMtrDvcFrm()
{
  var addFrmhtml ="";
  addFrmhtml +=backToBtn_HTML();
  addFrmhtml += fieldst_HTML(otherText["msg_modmtrdvc_fSet"]);
  addFrmhtml += "                            <div class=\"adminform\">\n"; 
  addFrmhtml +="<table width=\"100%\">\n";
  addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_modmtrdvc_frmComplt"]); 
  addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"meter_dev.cgi\" onsubmit=\"return validateAndSubmit(this)\">\n";
  addFrmhtml +=          preqstr_field ();
  addFrmhtml +="						<tr>\n";
  addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
  addFrmhtml +="										<table width=\"100%\">\n";
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[0]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td class=\"infotext\">\n";
  addFrmhtml +=															  mtd_jsArr[1][0]+"\n";
  addFrmhtml +=															  type_field("type=\"hidden\"");+"\n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[1]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td class=\"infotext\">\n";
  addFrmhtml +=															address+"\n";
  addFrmhtml +=	 address_field("type=\"hidden\"")+"\n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  //Row 2
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[2]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"mtd_mod\" id=\"mtd_mod\" maxLength=\"4\" dataType=\"Require\" value=\""+mtd+"\" msg=\""+otherText["msg_valid_mtd"]+"\"> \n";
  addFrmhtml +=															  mtd_field("type=\"hidden\" ");+"\n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[3]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select id=\"src\" name=\"src\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selASrc"]+"\" onchange=\"updateSrcTypDisable(this);\" > \n";
  addFrmhtml +=displayDropList(mtd_jsArr[1][11], pmv_typ_jsArr,otherText["msg_selASrc"]);
  
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
 
  //end of Row 2
  
  //Begin Row 3 for the form
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[3]+" "+myColumns[4]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  
  addFrmhtml +=getsrcTypHTML(mtd_jsArr[1][11])+"\n";
  
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[5]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select id=\"dst\" name=\"dst\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selARcTp"]+"\" onchange=\"updateRcvTypDisable(this);\" > \n";
  addFrmhtml +=displayDropList(mtd_jsArr[1][12], pmv_typ_jsArr,otherText["msg_selARcTp"]);
  
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  //End row 3
  //Begin Row 4 for the form
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[5]+" "+myColumns[6]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +=getdstTypTypHTML(mtd_jsArr[1][12])+"\n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[9]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"poll\" id=\"poll\" value=\""+mtd_jsArr[1][9]+"\" maxLength=\"4\" size=\"4\" dataType=\"RangeValue\" min=\"10\" max=\"9999\"  msg=\""+otherText["msg_valid_poll"]+"\"> <span class=\"infotextheading\">[10-9999]<\/span>\n";
  
  
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  //End row 4
  addFrmhtml +="								    </table>\n";
  addFrmhtml +=frmButtRow_HTML("Update", 1);
                  
  addFrmhtml +="							   </td>\n";
  addFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Add", 1);
  addFrmhtml +="							</table>\n";
  addFrmhtml +="							</div>\n";
  addFrmhtml +=op_field (opValues["submitModify"]);
  addFrmhtml += "                    </form>\n";                      
  addFrmhtml += fieldstFoot_HTML();
  return addFrmhtml;
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
/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [op_field] 
[PURPOSE]  		-> 	Generat HTML  for Hidden Field with the
                  input op value.
                  
          
[Parameter]  	-> attr input op value
[Return]  	  -> fieldHTML array contain keys for the input array
              
[AUTHOR]  		-> Abdul Shakoor (DKI) Sept 2, 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
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
function mtd_field(attr)
{
  var fieldHTML ="";
  fieldHTML +="<input name=\"mtd\" id=\"mtd\" value=\""+mtd+"\" "+attr+" >\n";
  return fieldHTML;
}
function type_field(attr)
{
  var fieldHTML ="";
  fieldHTML +="<input name=\"type\" id=\"type\" value=\""+type+"\" "+attr+" >\n";
  return fieldHTML;
}
function address_field(attr)
{
  var fieldHTML ="";
  fieldHTML +="<input name=\"address\" id=\"address\" value=\""+address+"\" "+attr+" >\n";
  return fieldHTML;
}
function backToBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   btn_HTML += btnLocation_HTML("justChaneMyLocation('meter_dev.cgi'); ", otherText["btn_bakto_mtrdvcPg"]);
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
   if(priv>=7)
   {
    btn_HTML += btnLocation_HTML("justChaneMyLocation('meter_dev.cgi?op="+opValues["enterAdd"]+"'); ", otherText["btn_addNew_mtrdvc"]);
   }
   if((address!="-1" ||address!="") && (type!="") && (op!=28) && (op!=18) ) // for delete no need to show back button
   {
	btn_HTML += btnLocation_HTML("justChaneMyLocation('meter_dev.cgi'); ", otherText["btn_bakto_mtrdvcPg"]);
   }
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
 
   return btn_HTML;
}
function updatePageHeading(op,pgHead)
{
  var pageHeading = pgHead;
    pageHeading +=otherText["pgHead_mtrdvc"];
  return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
 
  var pageTitle = pgTit;
    pageTitle +=otherText["pgTitle_mtrdvc"];
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
      op_list +="<option value=\""+opValues["submitDelete"]+"\">DELETE</option>";
      
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
// Function responsible for making the
// drop down visible for tanker type and 
// disable the input text field
// and vice versa 
function updateSrcTypDisable(myObj)
{
	var myselectedvalue = myObj.options[myObj.selectedIndex].value;
	for(var i=0; i<drpListtyp.length; i++)
	{
	 if(myselectedvalue==drpListtyp[i])// that means show the drop list
	 {
	   updateDisableProp('drp_srcTyp', false);
		 updateDisableProp('ipt_srcTyp', true);
		 hideLayer("div_ipt_srcTyp"); // hide input field
		 showLayer("div_drp_srcTyp");// show drop list field
   }
   else // that means show the input text field
   {
     updateDisableProp('drp_srcTyp', true);
		 updateDisableProp('ipt_srcTyp', false);
		 hideLayer("div_drp_srcTyp"); // hide drop list
		 showLayer("div_ipt_srcTyp");// show input field field
   }
  }
 
}
// Function responsible for making the
// drop down visible for tanker type and 
// disable the input text field
// and vice versa 
function updateRcvTypDisable(myObj)
{
  var myselectedvalue = myObj.options[myObj.selectedIndex].value;
	for(var i=0; i<drpListtyp.length; i++)
	{
	 if(myselectedvalue==drpListtyp[i])// that means show the drop list
	 {
	   updateDisableProp('drp_dstTyp', false);
		 updateDisableProp('ipt_dstTyp', true);
		 hideLayer("div_ipt_dstTyp"); // hide input field
		 showLayer("div_drp_dstTyp");// show drop list field
   }
   else // that means show the input text field
   {
     updateDisableProp('drp_dstTyp', true);
		 updateDisableProp('ipt_dstTyp', false);
		 hideLayer("div_drp_dstTyp"); // hide drop list
		 showLayer("div_ipt_dstTyp");// show input field field
   }
  }
 
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
function showLayer(id) {

  var lyr = getElemRefs(id);
  if (lyr) lyr.style.visibility = "visible";
}

function hideLayer(id) {
  var lyr = getElemRefs(id);
  if (lyr) lyr.style.visibility = "hidden";
}
function getsrcTypHTML(src)
{
  var srcHTML ="";
  var drpVisble = "VISIBILITY:hidden";
  var drpdataType="";
  var drpable=" disabled=true";
  
  var inptVisble = "VISIBILITY:";
  var inptdataType="Require";
  var inptable="";
 //alert("here is the src tP"+src);
  for(var i=0; i<drpListtyp.length; i++)
  {
	  if(src==drpListtyp[i])// that means show the drop list
	  {

		  drpVisble = "VISIBILITY:";
		  drpdataType="Require";
		  drpable="";

		  inptVisble = "VISIBILITY:hidden";
		  inptdataType="";
		  inptable="disabled=true";

	  }

  }
  srcHTML +="															<div id=\"div_drp_srcTyp\" style=\""+drpVisble+"\">\n";
 // alert("here is the src tP"+srcTyp);
  srcHTML +="                             <select id=\"drp_srcTyp\" name=\"srcTyp\" class=\"smallselect\" dataType=\""+drpdataType+"\" msg=\""+otherText["msg_selUnit_valid_src"]+"\" "+drpable+"> \n";
  srcHTML +=displayDropList(srcTyp, tanks_lst_jsArr,otherText["msg_selUnit"]);
  srcHTML +="															<\/div>\n";
  srcHTML +="															<div id=\"div_ipt_srcTyp\" style=\""+inptVisble+"\">\n";
  
  srcHTML +="                             <input type=\"text\" name=\"srcTyp\" id=\"ipt_srcTyp\" value=\""+srcTyp+"\" maxLength=\"10\" dataType=\""+inptdataType+"\"  msg=\""+otherText["msg_selUnit_valid_src"]+"\" "+inptable+"> \n";
  srcHTML +="															<\/div>\n";
  return srcHTML;
}
function getdstTypTypHTML(dst)
{
 
  var dstHTML ="";
  var drpVisble = "VISIBILITY:hidden";
  var drpdataType="";
  var drpable=" disabled=true";
  
  var inptVisble = "VISIBILITY:";
  var inptdataType="Require";
  var inptable="";
  for(var i=0; i<drpListtyp.length; i++)
	{
	 if(dst==drpListtyp[i])// that means show the drop list
	 {
	   //alert(dstTyp+" MAtch found");
      drpVisble = "VISIBILITY:";
      drpdataType="Require";
      drpable="";
      
      inptVisble = "VISIBILITY:hidden";
      inptdataType="";
      inptable="disabled=true";
      
	 }
	 
	}
  dstHTML +="															<div id=\"div_drp_dstTyp\" style=\""+drpVisble+"\">\n";
  
  dstHTML +="                             <select id=\"drp_dstTyp\" name=\"dstTyp\" class=\"smallselect\" dataType=\""+drpdataType+"\" msg=\""+otherText["msg_selUnit_valid_rcv"]+"\" "+drpable+"> \n";
  dstHTML +=displayDropList(dstTyp, tanks_lst_jsArr,otherText["msg_selUnit"]);
  dstHTML +="															<\/div>\n";
  dstHTML +="															<div id=\"div_ipt_dstTyp\" style=\""+inptVisble+"\">\n";
  
  dstHTML +="                             <input type=\"text\" name=\"dstTyp\" id=\"ipt_dstTyp\" value=\""+dstTyp+"\" maxLength=\"10\" dataType=\""+inptdataType+"\"  msg=\""+otherText["msg_selUnit_valid_rcv"]+"\" "+inptable+"> \n";
  dstHTML +="															<\/div>\n";
  
  return dstHTML;
  
}
// function validates at least one of
// the src or destination type is Tank
function validateAndSubmit(myobject)
{
  
  var myselectsrc = document.addNew.src.options[document.addNew.src.selectedIndex].value;
  var myselectdst = document.addNew.dst.options[document.addNew.dst.selectedIndex].value;
  var isFormValid = false;
  var isFormValid = submitmyform(myobject);
  if(isFormValid && (myselectsrc==drpListtyp[0] ||myselectdst==drpListtyp[0]))
  {
    return true;
  }
  else if (isFormValid && (!((myselectsrc==drpListtyp[0] ||myselectdst==drpListtyp[0]))))
  {
    alert(otherText["msg_valid_srcdst"]);
    return false;
  }
  else
  {
  	return false;
  }
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
	for(i in mtd_jsArr)
  {
    if(i>0)
    {
      newPage += "<tr class=\"row1\">\n";
      var howmanyDone =0;
      for(var j=0; j<myColumns.length; j++)
      {
        if (curColumnToSort == howmanyDone)
        {
          newPage += "<td style=\"background-color:#EEEEEE\">" + obs(mtd_jsArr[i][howmanyDone]) + "<\/td>";
		    } 
        else 
        {
        
			    newPage += "<td>\n";				  
			    if(howmanyDone==0) // means time to display the drop list and table
			    {
				    newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
            newPage +="       <table border=\"0\">\n";
            newPage +="	       <tr>\n";
            newPage +="          <td width=\"60%\"> <span style=\"COLOR: #FF0000;\">"+obs(mtd_jsArr[i][howmanyDone])+"</span>\n";
            newPage +="          <input type=\"hidden\" name=\"type\" id=\"type\" value=\""+mtd_jsArr[i][10]+"\">\n";
            newPage +="          <input type=\"hidden\" name=\"address\" id=\"address\" value=\""+mtd_jsArr[i][1]+"\">\n";
            newPage +="          <input type=\"hidden\" name=\"mtd\" id=\"mtd\" value=\""+mtd_jsArr[i][2]+"\">\n";
            newPage +="          <input type=\"hidden\" name=\"srcTyp\" id=\"srcTyp\" value=\""+mtd_jsArr[i][4]+"\">\n";
            newPage +="          <input type=\"hidden\" name=\"dstTyp\" id=\"dstTyp\" value=\""+mtd_jsArr[i][6]+"\">\n";              
            newPage +="          <input type=\"hidden\" name=\"pg\" id=\"pg\" value=\""+pg+"\">\n";
            //newPage +=op_field ("");
            newPage +=          preqstr_field ();
            newPage +="          </td>\n";
            newPage +="          <td width=\"40%\">\n";
            newPage += op_list(priv,i);
            newPage +="          </td>\n";
            newPage +="	       </tr>\n";
            newPage +="	      </table>\n";
            newPage +="	      </form>\n";
          }
          else
          {
            newPage += obs(mtd_jsArr[i][howmanyDone]);
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
  newPage +="   if(myselectedvalue==\""+opValues["submitDelete"]+"\")\n";
  newPage += "  {\n";
  newPage +="     if(confirm('Are you sure you want to delete?'))\n";
  newPage += "    {\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".op.value='\"+18+\"';\");\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
  newPage += "      return true;\n";
  newPage += "    }\n";
  
  newPage +="   }\n";
  newPage +="   else if(myselectedvalue==\"11\")\n";
  newPage += "  {\n";
  newPage +="     if(confirm('Are you sure you want to delete?'))\n";
  newPage += "    {\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".op.value='\"+21+\"';\");\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
  newPage += "      return true;\n";
  newPage += "    }\n";  
  newPage +="   }\n";
  newPage +="   else if(myselectedvalue==\"22\")\n";
  newPage += "  {\n";
  newPage +="     if(confirm('Are you sure you want to delete?'))\n";
  newPage += "    {\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
  newPage += "      return true;\n";
  newPage += "    }\n";  
  newPage +="   }\n";
  newPage +="   else\n";
  newPage += "  {\n";
  newPage += "    eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
  newPage += "    return true;\n";
  newPage +="   }\n";
  
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
