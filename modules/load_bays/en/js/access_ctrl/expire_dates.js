	var myColumns = [
			"Expiry Date",	"Title","Reject Authorization"];
		var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[18]= "Successfully Deleted!";
    l_opInf[23]= "Successfully Updated!";
    l_opInf[25]= "Successfully Inserted A New Record !";
    l_opInf[24]= "Successfully Deleted!";
    l_opInf[33]= "Update Failed!";
    l_opInf[35]= "Insert New Record Failed!";
    l_opInf[34]= "Delete Failed!";
    l_opInf[133]= "DB Update Failed!";
    l_opInf[135]= "DB Insert Failed!";
    l_opInf[134]= "DB Delete Failed!";
    
    var otherText = new Array()
		otherText["youraction"] =  "YOUR ACTION";
		otherText["actn_delete"] =  "DELETE";
		otherText["actn_mod"] =  "MODIFY";
		otherText["msg_del_confirm"] =  "Are you sure you want to delete?";   	
		otherText["btn_bakto_exDatesPg"] =  "Back To Expiry Dates Page";
		otherText["viewAll_bakto_exDatesPg"] =  "View All";
    otherText["msg_modxpDate_fSet"] =  "Expiry Date details";
    otherText["msg_modxpDate_frmComplt"] = "Complete and submit the following form to update current Expiry date, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_valid_exTitl"] = "Enter Expiry Date Title";
    otherText["exp_date_num"] =  "Expiry Date Number";    
    otherText["pgHead_expDates"] =  "expiry dates";
    otherText["pgHead_ModexpDates"] =  "modify expiry dates";
    otherText["pgTitle_expDates"] =  "Access Control, Expiry Dates";
    otherText["pgTitle_ModexpDates"] =  "Access Control, Modify Expiry Dates";
    otherText["n"]="No";
    otherText["y"]="Yes";
	
		/********************
	 * 2 rrays              
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1,1,13,18 ,23, 25, 27, 24, 33, 37, 34, 133 , 137, 134];
	var ops_req_search = [-1,1,13,18, 23, 25, 27, 24, 33, 37, 34, 133 , 137, 134];// search never required on this page
		
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
  newPage += local_HeadrHTML(newPage);
  //getToolBar_HTML function of comm_HTML.js file responsible for  
  // outputting the tool bar
  //controls the search and print buttons as well
  newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading), 
								check_ifReqPrint(ops_req_print, curViewDetailState), 
								check_ifReqSearch(ops_req_search, curViewDetailState) );
  newPage +="<tr>\n";  
  newPage +="<td width=\"100%\">             \n";
  newPage +="<div class=\"content\" id=\"content\">\n";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";  
  //all the page rows start here
  
  
  
	if (curViewDetailState <= 1 || curViewDetailState >10) // view records of tank groups
	{
		if (curViewDetailState >10) newPage += viewAllBtn_HTML (); 
		newPage +=displayStatusMsg (op);  
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





		for(i in xprDt_jsArr)
		{
			if(i>0)
			{
				newPage += "<tr class=\"row1\">\n";
				var howmanyDone =0;
				for(var j=0; j<myColumns.length; j++)
				{
					if (curColumnToSort == howmanyDone)
					{
						newPage += "<td style=\"background-color:#EEEEEE\">" + obs(tank_grp_jsArr[i][howmanyDone]) + "<\/td>";
					} 
					else 
					{

						newPage += "<td>\n";				  
						if(howmanyDone==0) // means time to display the drop list and table
						{
							newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
							newPage +="       <table border=\"0\">\n";
							newPage +="	       <tr>\n";
							newPage +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+obs(xprDt_jsArr[i][3])+"</span>\n";
							newPage +="          <input type=\"hidden\" name=\"xprDt\" id=\"xprDt\" value=\""+xprDt_jsArr[i][howmanyDone]+"\">\n";              
							//newPage +=op_field ("");
							newPage +=          preqstr_field ();
							newPage +="          </td>\n";
							newPage +="          <td width=\"50%\">\n";
							newPage += op_list(curPrivilage, xprDt_jsArr[i][(howmanyDone+1)],i );
							newPage +="          </td>\n";
							newPage +="	       </tr>\n";
							newPage +="	      </table>\n";
							newPage +="	      </form>\n";
						}
						else
						{
							newPage += obs(xprDt_jsArr[i][howmanyDone]);
						}  

						newPage += "<\/td>\n";


					}
					howmanyDone++;	
				} // end of inner for loop


			}
			newPage += "\n";
			newPage += "<\/tr>";
		}
		newPage += "<\/tbody>";
		newPage += "<\/table>";
		newPage += "<\/td>";	
		newPage += "<\/tr>";



	}
		
 if (priv >= 6 && curViewDetailState ==6) // able to modify Show add new form
 {
    newPage += displayModExDateFrm();
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
function xprDt_field(attr)
{
  var fieldHTML ="";
  fieldHTML +="<input name=\"xprDt\" id=\"xprDt\" value=\""+xprDt+"\" "+attr+" >\n";
  return fieldHTML;
}
function displayModExDateFrm()
{
  var ModFrmhtml ="";
  ModFrmhtml +=backToBtn_HTML();
  ModFrmhtml += "<tr> \n";
  ModFrmhtml += "<td align=\"left\">\n";
 /*Fix the bug Id 1794, this section required any more ModFrmhtml += "<table>\n";
  ModFrmhtml += "   <tr> \n";
  ModFrmhtml += "                                                    <td width=\"140\" class=\"infotextheading\">\n";
  ModFrmhtml += "                                                            "+otherText["exp_date_num"]+":\n";
  ModFrmhtml += "                                                    </td>\n";
  ModFrmhtml += "                                                    <td align=\"left\" class=\"infotext\">\n";
  ModFrmhtml +=xprDt;
  ModFrmhtml += "                                                    </td>\n";
  ModFrmhtml += "   </tr> \n";
  ModFrmhtml += "</table>\n";
*/
  ModFrmhtml += "</td>\n";	
  ModFrmhtml += "</tr> \n";
  
  ModFrmhtml += fieldst_HTML(otherText["msg_modxpDate_fSet"]);
  ModFrmhtml +="							 <div class =\"adminform\">\n";
  ModFrmhtml +="<table width=\"100%\">\n";
  ModFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_modxpDate_frmComplt"]); 
  ModFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"expire_dates.cgi\" onsubmit=\"return submitmyform(this)\">\n";
  ModFrmhtml += xprDt_field("type=\"hidden\"");
  ModFrmhtml +=          preqstr_field ();
  ModFrmhtml +="						<tr>\n";
  ModFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
  ModFrmhtml +="										<table width=\"100%\">\n";
  ModFrmhtml +="											<tr>								\n";
  ModFrmhtml +="												<td width=\"50%\">\n";
  ModFrmhtml +="													<table>\n";
  ModFrmhtml +="														<tr>\n";
  ModFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[1]+":");
  ModFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  ModFrmhtml +="															<td>\n";
  ModFrmhtml +="                             <input type=\"text\" size=\"30\" name=\"xpr_titl\" id=\"xpr_titl\" dataType=\"Require\" maxLength=\"38\" value=\""+xprDt_jsArr[1][1]+"\" msg=\""+otherText["msg_valid_exTitl"]+"\"> \n";
  ModFrmhtml +="															</td>\n";
  ModFrmhtml +="														</tr>\n";
  ModFrmhtml +="													</table>\n";
  
  ModFrmhtml +="									      </td>\n";
 ModFrmhtml +="												<td width=\"50%\">\n";
 
  
  ModFrmhtml +="													<table>\n";
  ModFrmhtml +="														<tr>\n";
  ModFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[2]+":");
  ModFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  ModFrmhtml +="															<td class=\"infotext\">\n";
  if(xprDt_jsArr[1][2]=="Y")
  {
    var yChecked ="checked";
    var nChecked ="";
  }
  else
  {
    var nChecked ="checked";
    var yChecked ="";
  }
  ModFrmhtml +="                                 "+otherText["y"]+"<input type=\"radio\" name=\"rej_auth\" id=\"rej_auth\" value=\"Y\" "+yChecked+">\n";
  ModFrmhtml +="                                 &nbsp;"+otherText["n"]+"<input type=\"radio\" name=\"rej_auth\" id=\"rej_auth\" value=\"N\" "+nChecked+">\n";
  ModFrmhtml +="															</td>\n";
  ModFrmhtml +="														</tr>\n";
  ModFrmhtml +="													</table>\n";
  
  
  ModFrmhtml +="									   </td>\n";
  
  ModFrmhtml +="								    </tr>\n";
  
 
  
 
  
  ModFrmhtml +="								    </table>\n";
  ModFrmhtml +=frmButtRow_HTML(commBtnText["Modify"], 1);
                  
  ModFrmhtml +="							   </td>\n";
  ModFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Update", 1);
  ModFrmhtml +="							</table>\n";
  ModFrmhtml +="							 </div>\n";
  ModFrmhtml +=op_field (16);
  ModFrmhtml += "                    </form>\n";                      
  ModFrmhtml += fieldstFoot_HTML();
  return ModFrmhtml;
}
function backToBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
      
   btn_HTML += btnLocation_HTML("justChaneMyLocation('expire_dates.cgi'); ", otherText["btn_bakto_exDatesPg"]);
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}
function viewAllBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
      
   btn_HTML += btnLocation_HTML("justChaneMyLocation('expire_dates.cgi'); ", otherText["viewAll_bakto_exDatesPg"]);
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}


function updatePageHeading(op,pgHead)
{
  var pageHeading = pgHead;
  pageHeading +=otherText["pgHead_expDates"];
  return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
  pageTitle +=otherText["pgTitle_expDates"];
  
  return pageTitle;
}
/* define function op_list() */
function op_list(priv, accNum, frmNum)
{
/* priv = 
6 modify	op=1,2,3
7 add		op=4
8 delete	op=5
*/
  var op_list ="";
  op_list +="<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+accNum+"', '"+frmNum+"');\">          ";
  switch (priv)
  {
    case 8:
      /* delete is not available on this page op_list +="<option value=\"8\">DELETE</option>";*/
      
    case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

    case 6:    /* Modify */
    op_list +="<option value=\"6\">"+otherText["actn_mod"]+"</option>";
    case 5:			/* Find Has not been implemented yet*/
   
    break;
  }
  
  op_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
  op_list +="</select>                                        ";
  return op_list ;
}

/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage)
{
  newPage +="<script>\n";
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
  newPage +="/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
  newPage +="[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
  newPage +="'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
  newPage +="function submitAction(myobject,accNum, frmNum)\n";
  newPage +="{\n";
  newPage +="	  var myCurQstring=produceQString();\n";
  newPage +=    "var myselectedvalue = myobject.options[myobject.selectedIndex].value;";
  newPage +="   if(myselectedvalue==\"8\")\n";
  newPage += "  {\n";
  newPage +="     if(confirm('"+otherText["msg_del_confirm"]+"'))\n";
  newPage += "    {\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".op.value='\"+18+\"';\");\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
  newPage += "      return true;\n";
  newPage += "    }\n";
  
  newPage +="   }\n";
  newPage +="   else if(myselectedvalue==\"11\")\n";
  newPage += "  {\n";
  newPage +="     if(confirm('"+otherText["msg_del_confirm"]+"'))\n";
  newPage += "    {\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".op.value='\"+21+\"';\");\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
  newPage += "      return true;\n";
  newPage += "    }\n";  
  newPage +="   }\n";
  newPage +="   else if(myselectedvalue==\"22\")\n";
  newPage += "  {\n";
  newPage +="     if(confirm('"+otherText["msg_del_confirm"]+"'))\n";
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
  newPage += "</head>\n";
  newPage += "<body>\n";
  return (newPage);
}  
