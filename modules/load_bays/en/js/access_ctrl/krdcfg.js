// @(#) $Id: krdcfg.js,v 1.11 2008/06/20 04:45:12 bz Exp $";
/******************************************************************************/
/* COPYRIGHT (c) 2005 Diamond Key International Pty Ltd.                      */
/* This document is copyright and may not be reproduced in whole or in part   */
/* without the prior written consent of Diamond Key International Pty Ltd.    */
/******************************************************************************/
/* Some text is defined at the top of this module                             */
/* while the rest is in comm_Html.js                                           */
/******************************************************************************/
//op = 1 ->view

	var myColumns = [
		];

	var headings = new Array();
	headings["ViewPageHeader"] = "key reader devices";

	var otherText = new Array();
	otherText["youraction"] =  "YOUR ACTION";
	otherText["msg_del_confirm"] =  "Are you sure you want to delete?";
	otherText["Add"] = "Add Key Reader Device";
	otherText["ViewDetails"] = "Key Reader Device Details";
        otherText["SelDevCode"] = "Please Enter a device code";
        otherText["SelDevType"] = "Please select a device type";
        otherText["SelDevUse"] = "Please select a device usage";
        otherText["krd_details"] = "Key Read Device Details";
        otherText["GlblFrmInstr"] = "Instructions go here..";
        otherText["AddInstr"] = "Complete and submit the following form, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";;

	var buttonsTxt = new Array();
	buttonsTxt["AddNew"] = "Add New";
	buttonsTxt["backToMain"] = "Back";


	var columnHdrs = new Array();
	columnHdrs["Code"] = "Code";
	columnHdrs["Class"] = "Class";
	columnHdrs["Type"] = "Type";
	columnHdrs["Use"] = "Use";
	columnHdrs["Area"] = "Area";

	var alertMsgs = new Array();
	alertMsgs["InsufficientPriv"] = "Insufficient Privilege";
	alertMsgs["opFailed"] = "Operation Failed";
	alertMsgs["invalidData"] = "Invalid Data!";
	alertMsgs["alreadyPresent"] = "Check database. Already present!";

	var opValues = new Array();
	opValues["add"] = 201;
	opValues["addSubmit"] = 202;
	opValues["delete"] = 401;
//alert(op);
var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[411]= "Successfully Deleted!";
    l_opInf[212]= g_opInf[27];

/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
var ops_req_print = [-1,1,18,28, 26,36,27,37];
var ops_req_search = [-1,1,18,28, 26,36,27,37];

var dclass;
var dtype;
var dcode;
var duse;
var darea;
//how many items Should be displayed on 1 Page
var items_per_page = 10;
/*============================================================================*/
function preqstr_field ()
{
    var fieldHTML ="";
    fieldHTML += "<input name=\"preqstr\" id=\"preqstr\" value=\"\" type=\"hidden\">\n";

    return fieldHTML;
}
/*============================================================================*/
function
pgHeader( curViewDetailState,pageTitle , lang)
{
    var hdr = "";
    hdr += printHdr(hdr,updatePageTitle(curViewDetailState,pageTitle), lang);
    return( hdr );
}
/*============================================================================*/
function
updatePageHeading(op,pgHead)
{
    var pageHeading = pgHead;
    pageHeading += headings["ViewPageHeader"];
    return pageHeading;   
}
/*============================================================================*/
function updatePageTitle(op,pgTit)
{
    var pageTitle = pgTit;

    pageTitle +="DKI Omega Menu :: ACCESS CONTROL, Key Reader Devices Page";

    return pageTitle;
}
/*============================================================================*/
function
op_list( curPriv, thisFrmNum )
{
    var ops_list = "";

//    alert("op_list(" + curPriv + "," + thisFrmNum + ")");
    ops_list += "<select name=\"op\" id=\"op\"";
    ops_list += " onchange=\"submitAction(this, '";
    ops_list += thisFrmNum+ "');\">          ";

    //ops_list += "<option value=\"" + opValues["viewDetails"];
    //ops_list += "\">" + commText["View"] + "</option>\n";
	if ( curPriv == 8 )
	{
		ops_list += "<option value=\"" + opValues["delete"];
		ops_list += "\">" + commText["Delete"] + "</option>\n";
	}

    ops_list += "<option value=0 selected>--\t" + otherText["youraction"];
    ops_list += "\t--</option>";
    ops_list += "</select>";

    return ops_list;
}
/*============================================================================*/
function
displayGlblFrm()
{
    var glblFrm = "";

    glblFrm += fieldst_HTML(otherText["krd_details"]);
    glblFrm += "<form name=\"glblFrm\" method =\"post\" id=\"glblFrm\">\n";
    glblFrm += "<input type=\"hidden\" name=\"op\" value=\"1\">\n";
    glblFrm += "<input type=\"hidden\" name=\"pg\" value=\"1\">\n";
    glblFrm += "<div class=\"adminform\">\n";
    glblFrm += otherText["GlblFrmInstr"];
    glblFrm += "<table>\n";

    glblFrm += "</table>\n";
    glblFrm += "\n";
    glblFrm += "</div>\n";
    glblFrm += "</form>\n";
    glblFrm += fieldstFoot_HTML();

    return glblFrm;
}
/*============================================================================*/
function
viewSummary()
{
    var vs = "";
    var i = 0;

    //alert("viewSummary");
    vs += "<div id=\"printReady\">\n";
    vs += table_begin("M", 0,"");
    vs += "<tbody>\n";

    vs += "<!-- this is the Table Heading Row\n";
    vs += "                              -->\n";
    vs += "<tr>\n";
    vs += "<td width=\"10%\">" + columnHdrs["Code"] + "</td>\n";
    vs += "<td width=\"25%\">" + columnHdrs["Class"] + "</td>\n";
    vs += "<td width=\"25%\">" + columnHdrs["Type"] + "</td>\n";
    vs += "<td width=\"20%\">" + columnHdrs["Use"] + "</td>\n";
    vs += "<td width=\"20%\">" + columnHdrs["Area"]  + "</td>\n";
    vs += "</tr>\n";

    for( i = 1; i < deviceDetailsTab.length; ++i )
    {
        vs += "<tr class=\"row1\">\n";
        vs += "<td>\n";
        vs += "<form name=\"select_action_"+i+"\"";
        vs += " method=\"get\" id=\"select_action_"+i+"\" >\n";
        vs += "<table border=\"0\">\n";

        vs += "<tr>\n";

        vs += "<td width=\"50%\">\n";
        vs += deviceDetailsTab[i][0] + "\n";
        vs += " <input type=\"hidden\" name=\"selDevCode\"";
        vs += " id=\"selDevCode\"";
        vs += " value=\""+ deviceDetailsTab[i][0] +"\">\n";
        vs += "</td>\n";

        vs += "<td width=\"40%\">\n";
        vs += op_list( priv, i );
        vs += "</td>\n";

        vs += "</tr>\n";

        vs += "</table>\n";
        vs += "</form>\n";
        vs += "</td>\n";


        vs += "<td width=\"20%\">\n";
        vs += deviceDetailsTab[i][1] + "\n";
        vs += "</td>\n";

        vs += "<td width=\"15%\">\n";
        vs += deviceDetailsTab[i][2] + "\n";
        vs += "</td>\n";

        vs += "<td width=\"15%\">\n";
        vs += deviceDetailsTab[i][3] + "\n";
        vs += "</td>\n";

        vs += "<td width=\"15%\">\n";
        vs += deviceDetailsTab[i][4] + "\n";
        vs += "</td>\n";

        vs += "</tr>\n";
    }
    vs += "</tbody>\n";
    vs += "</table>\n";
    vs += "</div>\n";

    return vs;
}
/*============================================================================*/
function
viewHTML()
{
    var vFrmhtml ="";

    return vFrmhtml;
}
/*============================================================================*/
function
addHTML()
{
    var addFrmhtml ="";

    addFrmhtml += fieldst_HTML(otherText["Add"]);
    addFrmhtml += "                            <div class=\"adminform\">\n";
    addFrmhtml +="<table width=\"100%\">\n";
    addFrmhtml += infotextRow_HTML(" width=\"100%\" ",otherText["AddInstr"]);
    addFrmhtml += " <form name=\"addNew\" method =\"POST\" id=\"addNew\"";
    addFrmhtml += " action=\"krdcfg.cgi\" onSubmit=\"return submitmyform(this);\">\n";
    addFrmhtml += "<input type=\"hidden\" name=\"op\" ";
    addFrmhtml += "value=\"" + opValues["addSubmit"] + "\">\n";
    addFrmhtml += "<table width=\"100%\">\n";

    addFrmhtml += " <tr>\n";
    addFrmhtml += "<td width=\"100%\">\n";

    addFrmhtml += "<table>\n";

    //First Row
    addFrmhtml +="											<tr>								\n";
    addFrmhtml +="												<td width=\"50%\">\n";
addFrmhtml +="													<table>\n";
    addFrmhtml +="														<tr>\n";
    addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"60\" ", columnHdrs["Code"]+":");
    addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
    addFrmhtml +="<td>\n";
    addFrmhtml += "<input type=\"text\" id=\"selDevCode\" dataType=\"Require\"";
    addFrmhtml += "maxLength=\"3\" name=\"selDevCode\"";
    addFrmhtml += " msg=\"" + otherText["SelDevCode"] + "\">\n";
    addFrmhtml += "</td>\n";
    addFrmhtml +="</tr>\n";
    addFrmhtml +="</table>\n";
    addFrmhtml +="</td>\n";

    addFrmhtml +="												<td width=\"50%\">\n";
    addFrmhtml +="													<table>\n";
    addFrmhtml +="														<tr>\n";
    addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"60\" ", columnHdrs["Type"]+":");
    addFrmhtml += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
    addFrmhtml +="															<td>\n";
    addFrmhtml += "<select id=\"selDevType\" dataType=\"Require\"";
    addFrmhtml += " name=\"selDevType\"";
    addFrmhtml += " msg=\"" + otherText["SelDevType"] + "\">\n";
    addFrmhtml += displayDropList(dtype, dtypes_jslist,otherText["SelDevType"]);
    addFrmhtml += "</td>\n";
    addFrmhtml +="</tr>\n";
    addFrmhtml +="</table>\n";
    addFrmhtml +="</td>\n";
    
    addFrmhtml +="											<\/tr>								\n";
    //End First Row Abdul
    
    //Start 2nd Row Abdul
    
    addFrmhtml +="											<tr>								\n";
    addFrmhtml +="												<td width=\"50%\">\n";
    addFrmhtml +="													<table>\n";
    addFrmhtml +="														<tr>\n";
    addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"60\" ", columnHdrs["Use"]+":");
    addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
    addFrmhtml +="<td>\n";
    addFrmhtml += "<select id=\"selDevUse\" dataType=\"Require\"";
    addFrmhtml += " name=\"selDevUse\"";
    addFrmhtml += " msg=\"" + otherText["SelDevUse"] + "\">\n";
    addFrmhtml += displayDropList(duse, usages_jslist,otherText["SelDevUse"]);
    addFrmhtml += "</td>\n";
    addFrmhtml +="</tr>\n";
    addFrmhtml +="</table>\n";
    addFrmhtml +="</td>\n";
    addFrmhtml +="												<td width=\"50%\">\n";
    addFrmhtml +="&nbsp;\n";
    addFrmhtml +="</td>\n";
    
    addFrmhtml +="											<\/tr>								\n";
    //End 2nd Row Abdul
    
    
    
    addFrmhtml +="								    </table>\n";
    addFrmhtml += frmButtRow_HTML(commBtnText["Add"], 1);
                  
  addFrmhtml +="							   </td>\n";
  addFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Add", 1);
  addFrmhtml +="							</table>\n";
  addFrmhtml += " <\/div>\n";
 
  addFrmhtml += "                    </form>\n";                      
  addFrmhtml += fieldstFoot_HTML();
  return addFrmhtml;

    

   
}
/*============================================================================*/
function
renderPage(cRec, cCol, cState, cPageState,priv, lang)
{ 
    //alert("op is " + op + " priv is " + priv );

    var curRecord = cRec;
    var curColumnToSort = cCol;
    var curViewDetailState = cState;
    var curPageIn = cPageState;
    var curPriv = priv;

    var newPage = "";
    var pageTitle="";
    var pageHeading="";

    var hundreds = 0;
    var units = 0;
    var tens = 0;
    if( curViewDetailState > 0 )
    {
        units = curViewDetailState % 10 ;
        hundreds = Math.floor(curViewDetailState/100);
        tens = Math.floor(curViewDetailState/10) % 10;
    }
    //alert("curViewDetailState = " + curViewDetailState + " tens = " + tens);

    if( tens >= 2 )
    {
        switch( tens )
        {
            case 5:
                alert(alertMsgs["invalidData"]);
                break;
            case 9:
                alert(alertMsgs["alreadyPresent"]);
                break;
            default:
                alert(alertMsgs["opFailed"]);
                break;
        }
    }

    newPage += pgHeader(curViewDetailState,pageTitle, lang);
    newPage += local_HeadrHTML(newPage);
    //controls the search and print buttons as well
    newPage += getToolBar_HTML(newPage,
    updatePageHeading(curViewDetailState,pageHeading), 
            check_ifReqPrint(ops_req_print, curViewDetailState), 
            check_ifReqSearch(ops_req_search, curViewDetailState) );


    //getToolBar_HTML function of comm_HTML.js file responsible for  
    // outputting the tool bar

    newPage +="<tr>\n";  
    newPage +="<td width=\"100%\">             \n";
    newPage +="<div class=\"content\" id=\"content\">\n";
    newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
    newPage +="<tbody>\n";  

    //rest of the page will be decided here
    //newPage += displayGlblFrm();

    //all the buttons will come here
   
    
    if (curPriv >=7
            && curViewDetailState != opValues["add"]
            && curViewDetailState != opValues["viewDetails"])
    {
        newPage += addNewBtn_HTML();
        
    }
    else
    {
        newPage +=backToBtn_HTML();
    }

    newPage +=displayStatusMsg (op); 
    //end of all the buttons

    newPage += "<tr> \n";
    newPage += "<td>\n ";
    //newPage += displayStatusMsg (op);
    if( curViewDetailState <= 1  )
    {
        newPage += viewSummary();
    }
    else
    {
        switch( curViewDetailState )
        {
            case opValues["add"]:
                if( curPriv >= 7 )
                {
                    newPage += addHTML();
                    //alert("add case");
                }
                else
                {
                    alert(alertMsgs["InsufficientPriv"]);
                }
            break;
            default:
            //alert("default case");
            newPage += viewSummary();
            break;
        }
    }

    //
    newPage+="					</td>\n";
    newPage+="					</tr>\n";

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
    
}
/*============================================================================*/
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function
local_HeadrHTML(newPage)
{
    newPage +="<script>\n";
    newPage +="function submitAction(myobject, frmNum)\n";
    newPage +="{\n";
    newPage +=    "var myselectedvalue = myobject.options[myobject.selectedIndex].value;";
    newPage +="   if(myselectedvalue==\"" + opValues["delete"] + "\")\n";
    newPage += "  {\n";
    newPage +="     if(confirm('Are you sure you want to delete?'))\n";
    newPage += "    {\n";
    //hdr += "alert(\"Delete - frmNum is \" + frmNum);\n";
    newPage += "      eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
    newPage += "      return true;\n";
    newPage += "    }\n";
    newPage += "    else\n";
    newPage += "    {\n";
    newPage += "      eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
    newPage += "    }\n";
    newPage +="   }\n";
    newPage +="   else\n";
    newPage += "  {\n";
    //hdr += "alert(\" Modify - frmNum is \" + frmNum);\n";
    newPage += "    eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
    newPage += "    return true;\n";
    newPage +="   }\n";
    newPage +="}\n";

    newPage += "</script>\n";

    newPage += "\n";

    newPage += "</head>\n";
    return (newPage);
}
/*============================================================================*/
/*Prints out the HTML for the Add new Button*/
function addNewBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   btn_HTML += btnLocation_HTML("justChaneMyLocation('?op="+opValues["add"]+"'); ", buttonsTxt["AddNew"]);
   if(op==411) btn_HTML += btnLocation_HTML("justChaneMyLocation('?'); ", buttonsTxt["backToMain"]);
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}
/*Prints out the HTML for the Back Button*/
function backToBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   btn_HTML += btnLocation_HTML("justChaneMyLocation('?'); ", buttonsTxt["backToMain"]);
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}
