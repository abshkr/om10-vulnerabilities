	var myColumns = [
			"No", "Date",	"Time","To",	"Product"
      ,	"Quantity",	"Unit","Stock"
		];
	
		//All the text displayed on the Screen should come from this array
		
		
		var otherText = new Array()
		otherText["youraction"] =  "YOUR ACTION";
		otherText["confirm_msg"] =  "Are you sure you want to delete ?";    
		otherText["btn_addNew_realloc"] =  "Add New Reallocation";
		otherText["btn_bakto_realloc"] =  "Back to Reallocation";
		otherText["msg_selsupp"] =  "Select the Supplier to view its Reallocations ";
    otherText["msg_selACmpy"] =  "Select A Company";
    otherText["msg_selAProd"] =  "Select A Product";
    otherText["msg_entValidQty"] =  "Enter Valid Quantity";
    otherText["msg_entLoanRsn"] =  "Enter Loan Reason";
    otherText["msg_selUnit"] =  "Select Unit";
    otherText["msg_loanRsn"] =  "Loan Reason";
    otherText["msg_selReAllocToCmpy"] =  "Select Reallocate To Company";
    otherText["msg_addNew_realloc"] =  "Add new reallocation details";
    otherText["msg_addNewRealloc_frmComplt"] = "Complete and submit the following form to add new re-allocation, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["reAllocTo"] =  "Reallocate To";
    otherText["supp"] =  "Supplier";
    otherText["supp_info"] =  "Supplier information";    
    otherText["pgHead_view"] =  "reallocation";
    otherText["pgHead_addNew"] =  "add new reallocation";
    otherText["pgTitle_view"] =  "STOCK MANAGEMENT, Reallocation";
    otherText["pgTitle_addNew"] =  "STOCK MANAGEMENT, Add New Reallocation";
    
 
/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
  var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[29]= "Successfully Deleted!";
    l_opInf[28]= "Successfully Inserted A New Record !";
    l_opInf[25]= "Successfully Inserted A New Record !";
    l_opInf[27]= "Successfully Inserted A New Record !";
    l_opInf[24]= "Successfully Deleted!";
    l_opInf[33]= "Insert New Record Failed!";
    l_opInf[38]= "Insert New Record Failed!";
    l_opInf[39]= "Delete Failed!";
    l_opInf[133]= "DB Update Failed!";
    l_opInf[128]= "DB Insert Failed!";
    l_opInf[129]= "DB Delete Failed!";  
var ops_req_print = [-1,0,1,29,28,25,27,24,33,38,39];
var ops_req_search = [-1,0,1,29,28,25,27,24,33,38,39];
/* define renderPage()
 * is the main function responsible for 
 * printing the HTML of the current page
 * consisit of serires of function responsible for 
 * printing the header section fo the page    
 * @param cRec NOT IN USE FUTURE USE
 * @param cCol cCol colname to sort  
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
  newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
//newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),true, true);
  newPage +="<tr>\n";  
  newPage +="<td width=\"100%\">             \n";
  newPage +="<div class=\"content\" id=\"content\">\n";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";  
  //start after the global form
  if (curViewDetailState <= 1 || curViewDetailState > 10) // view records
  {
      newPage +=displayGlblFrm();
      newPage +=addNewBtn_HTML();
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
		
 if (priv > 6 && curViewDetailState == 8)
 {
    newPage += displayAddNewFrm();
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
/* define displayGlblFrm() 
 * global form is the supplier selection
 * form always stays at the top so user can 
 * select the supplier at any stage and view its reallocations  
 */
function displayGlblFrm()
{
  var glblFrm = "";
  

  glblFrm += " <tr>\n";
  glblFrm += "   <td align=\"left\">\n";
  glblFrm += "      <form name=\"glblFrm\" method =\"get\" id=\"glblFrm\">\n";
  glblFrm += "<input type=\"hidden\" name=\"op\" value=\"1\">\n";
  glblFrm += "<input type=\"hidden\" name=\"pg\" value=\"1\">\n";
  glblFrm += " <ul id=\"tabmenu\">\n";
	glblFrm += "<li>"+otherText["supp_info"]+"</li>\n";
  glblFrm += "</ul>\n";
  glblFrm += "                            <div class=\"adminform\">\n";
  
  glblFrm +=                                    otherText["msg_selsupp"]+"\n";
  glblFrm += "                                    <table>\n";
  glblFrm += "                                            <tr>\n";
  glblFrm +=
    "                                                    <td class=\"infotextheading\">\n";
  glblFrm +=                                                            otherText["supp"]+":\n";
  glblFrm += "                                                    </td>\n";
  glblFrm += "                                                    <td>\n";
  glblFrm += "                                                        <select id=\"loanr\" name=\"loanr\" class=\"smallselect\" onchange=\"submit();\"> \n";
  
  glblFrm += displayDropList(loanr, cmpy_jslst,otherText["msg_selACmpy"]);

  glblFrm += "                                                    </td>\n";
  
  glblFrm += "                                            </tr>\n";
  
  
  
  glblFrm += "                                    </table>\n";
  glblFrm += "\n";
  glblFrm += "                            </div>\n";
  glblFrm += "                    </form>\n";
  glblFrm += "            </td>\n";
  glblFrm += "    </tr>\n";
  return glblFrm;

}
/* define displayAddNewFrm() 
 * responsible for generating the HTML
 * for Add new Reallocation form
 */
function displayAddNewFrm()
{
  var addFrmhtml ="";
  addFrmhtml +=backToBtn_HTML();
  addFrmhtml += fieldst_HTML(otherText["msg_addNew_realloc"]);
  addFrmhtml += "                            <div class=\"adminform\">\n";
  addFrmhtml +="<table width=\"100%\">\n";
  addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",
                   otherText["msg_addNewRealloc_frmComplt"]); 
  addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"realloc.cgi\" onsubmit=\"return submitmyform(this)\">\n";
  addFrmhtml += loanr_field("type=\"hidden\"");
  addFrmhtml +="						<tr>\n";
  addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
  addFrmhtml +="										<table width=\"100%\">\n";
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", otherText["reAllocTo"]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select name=\"brrwr\" id=\"brrwr\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selReAllocToCmpy"]+"\"> \n";
  addFrmhtml += displayDropList_rmvloanr("", cmpy_jslst,otherText["msg_selACmpy"], loanr);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"140\" ", " "+myColumns[4]+":");
  addFrmhtml += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select name=\"prod\" id=\"prod\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selAProd"]+"\"> \n";
  addFrmhtml += displayDropList("", base_prod_jslst,otherText["msg_selAProd"]);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", " "+myColumns[5]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"amnt\" id=\"amnt\" dataType=\"Integer\" msg=\""+otherText["msg_entValidQty"]+"\"> \n";
  
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"140\" ", " "+myColumns[6]+":");
  addFrmhtml += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select name=\"unit\" id=\"unit\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selUnit"]+"\"> \n";
  addFrmhtml += displayDropList("", unit_jslst,"Select Unit");
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", otherText["msg_loanRsn"]+" :");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"rsn\" id=\"rsn\" dataType=\"Require\" msg=\""+otherText["msg_entLoanRsn"]+"\"> \n";
  
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="												  &nbsp;\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  addFrmhtml +="								    </table>\n";
  addFrmhtml +=frmButtRow_HTML(commBtnText["Add"], 1);
                  
  addFrmhtml +="							   </td>\n";
  addFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Add", 1);
  addFrmhtml +="							</table>\n";
  addFrmhtml +="							</div>\n";
  
  addFrmhtml +=op_field (18);
  addFrmhtml += "                    </form>\n";                      
  addFrmhtml += fieldstFoot_HTML();
  return addFrmhtml;
}
/* define assArray_keys() 
 * responsible for generating the array
 * of keys for the current Hash table
 * @return array of keys for the current
 * associative array   
 */
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
function loanr_field(attr)
{
  var fieldHTML ="";
  fieldHTML +="<input name=\"loanr\" id=\"loanr\" value=\""+loanr+"\" "+attr+" >\n";
  return fieldHTML;
}
/* define backToBtn_HTML() 
 * responsible for generating the HTML
 * for a Link which looks like a button 
 */
function backToBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   btn_HTML += btnLocation_HTML("justChaneMyLocation('realloc.cgi?loanr='+loanr); ", otherText["btn_bakto_realloc"]);
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}
/* define addNewBtn_HTML() 
 * responsible for generating the HTML
 * for a Link which looks like a button 
 */
function addNewBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   btn_HTML += btnLocation_HTML("if (checkLoanr())justChaneMyLocation('realloc.cgi?op=8&loanr='+loanr); ", otherText["btn_addNew_realloc"]);
   
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}
/* define updatePageHeading() 
 * responsible for updating the page heading 
 * depending upon the current op value 
 * ******* always lower case for Eng******* 
 */
function updatePageHeading(op,pgHead)
{
  var pageHeading = pgHead;
  if (op <= 1 || op > 10)
  {
    pageHeading +="reallocation";
  }
  
  if (priv > 6 && op == 8)
  {   
    pageHeading +="add new reallocation";
       
  }
  return pageHeading;   
}
/* define updatePageTitle() 
 * responsible for updating the page title 
 * depending upon the current op value 
 */
function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
  if (op <= 1 || op > 10)
  {
    pageTitle +=pageTitle +=otherText["pgTitle_view"];
    
  }
  
  if (priv > 6 && op == 8)
  {
    
    pageTitle +=otherText["pgTitle_addNew"];
    
   
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
      op_list +="<option value=\"19\">"+commText["Delete"]+"</option>";
    case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

    case 6:
      
    case 5:			/* printf("<option value=1>5 1 FIND  </option>"); */
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
  newPage +="function submitAction(myobject,frmNum)\n";
  newPage +="{\n";
  newPage +=    "var myselectedvalue = myobject.options[myobject.selectedIndex].value;";
  newPage +="   if(myselectedvalue==\"19\")\n";
  newPage += "  {\n";
  newPage +="     if(confirm('"+otherText["confirm_msg"]+"'))\n";
  newPage += "    {\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
  newPage += "      return true;\n";
  newPage += "    }\n";
  newPage +="     else\n";
  newPage += "    {\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
  newPage += "      return false;\n";
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
function infoTable_HTML(curColumnToSort)
{
  var newPage ="";
  	for(i in realloc_jstab)
    {
      if(i>0)
      {
        newPage += "<tr class=\"row1\">\n";
        var howmanyDone =0;
        for(var j=0; j<myColumns.length; j++)
        {
          if (curColumnToSort == howmanyDone)
          {
            newPage += "<td style=\"background-color:#EEEEEE\">" + obs(realloc_jstab[i][howmanyDone]) + "<\/td>";
			    } 
          else 
          {
          
				    newPage += "<td>\n";				  
				    if(howmanyDone==0) // means time to display the drop list and table
				    {
  				    newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
              newPage +="       <table border=\"0\">\n";
              newPage +="	       <tr>\n";
              newPage +="          <td width=\"50%\"> <span style=\"font-size: 1.0em; font-weight: bold; COLOR: #0099FF;\">"+obs(realloc_jstab[i][howmanyDone])+"</span>\n";
              newPage +="          <input type=\"hidden\" name=\"seq\" id=\"seq\" value=\""+realloc_jstab[i][howmanyDone]+"\">\n";
              newPage +=loanr_field(" type=\"hidden\" ");
              newPage +="          </td>\n";
              newPage +="          <td>\n";
              newPage += op_list(priv,i);
              newPage +="          </td>\n";
              newPage +="	       </tr>\n";
              newPage +="	      </table>\n";
              newPage +="	      </form>\n";
            }
            else if(howmanyDone==1)
            {
              //try to split the date array
               if (realloc_jstab[i][j].indexOf(" ")!= -1 && (realloc_jstab[i][howmanyDone]!=""))
               {
                  var date_array=realloc_jstab[i][howmanyDone].split(" ");
                  
                  newPage += obs(date_array[0]);
                  newPage += "<\/td>\n";
                  newPage += "<td>\n";
                  newPage += obs(date_array[1]);
                  j +=1;
                   
                  
                }
            
            }
            else
            {
              newPage += obs(realloc_jstab[i][howmanyDone]);
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
function checkLoanr()
{
  if (loanr != "-1")
    {
      return true;
    }
  else
    {
      alert ("Select A Supplier to Add New Reallocation");
      return false;
    }
}
//we dont want to reallocate to the loaner itself
function displayDropList_rmvloanr(selectedvalue, list,defMsg,toRemove)
{
  var massList = "";
  var matchFound=0;
  
  for (i=1; i<list.length; i++)
  {
    if(list[i][0]!=toRemove)
    {
      massList += "<option value=\""+list[i][0]+"\"";
       if(list[i][0]==selectedvalue)
       {
          matchFound=1;
          massList += "selected";
       }
      massList +=">"+list[i][1]+"</option>\n";
    }
  }
   massList += "<option value=\"\"";
  if(matchFound==0)//no matchfound
  {
   
    massList += "selected";
   
  }
   massList +=">"+defMsg+"</option>\n";
 
  massList +="</select>\n";
  return massList;

}
