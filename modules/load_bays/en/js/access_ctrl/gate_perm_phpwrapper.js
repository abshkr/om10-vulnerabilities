

	var myColumns = [
			"Gate", "Permission Name" 
		];
		
		var permit_myColumns = [
			 "Permit Id", "Permit Class", "Equipment Type" , "Authority Type"
		];
		
		var prmssnCase_jslst=[
    ['','']
    ,['PERSONNEL','PERSONNEL']
    ,['EQUIPMENT','EQUIPMENT']
    ];

		
		var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[18]= "Successfully Deleted!";
    l_opInf[23]= "Successfully Inserted A New Record !";
    l_opInf[25]= "Successfully Inserted A New Record !";
    l_opInf[27]= "Successfully Inserted A New Record !";
    l_opInf[24]= "Successfully Deleted!";
    l_opInf[33]= "Insert New Record Failed!";
    l_opInf[37]= "Insert New Record Failed!";
    l_opInf[34]= "Delete Failed!";
    l_opInf[133]= "DB Update Failed!";
    l_opInf[137]= "DB Insert Failed!";
    l_opInf[134]= "DB Delete Failed!";
    
	var otherText = new Array()
		otherText["youraction"] =  "YOUR ACTION";
    otherText["delete_permit"] =  "DELETE";
    otherText["view_permit"] =  "VIEW RULES";
    otherText["addnew_permit"] =  "ADD NEW RULE";
    otherText["addnew_prmssn"] =  "ADD NEW PERMISSON";
		otherText["sec_head_defPmt"] =  "FIRST RULE DETAILS";		
	  otherText["btn_bakto_prmssnPg"] =  "Back to Permission Page";
		otherText["btn_addNew_prmssn"] =  "Add New Permission";
		otherText["msg_del_confirm"] =  "Are you sure you want to delete?";
    otherText["msg_selAcas"] =  "Select A Class";
    otherText["msg_selAGate"] =  "Select A Gate";
    otherText["msg_selAauth"] =  "Select An Authority";
     otherText["msg_selAetype"] =  "Select Equipment Type";
    otherText["msg_addNewperms_fSet"] =  "Add new Gate Permission details";
    otherText["msg_addNewpermt_fSet"] =  "Add new rule details";
    otherText["msg_addNewperms_frmComplt"] = "Complete and submit the following form to add new gate permission, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_addNewpermt_frmComplt"] = "Complete and submit the following form to add new rule to the permission, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["permisn_id"] =  "Permission Id";    
    otherText["pgHead_gtpss"] =  "GATE PERMISSION";
    otherText["pgHead_gtpmt"] =  "GATE PERMISSION RULE";
    otherText["pgHead_addNewprmssn"] =  "ADD NEW GATE PERMISSION";
    otherText["pgHead_addNewpmt"] =  "ADD NEW PERMISSION RULE";
    otherText["pgTitle_gtpss"] =  "Access Control, Gate Permission";
    otherText["pgTitle_gtpmt"] =  "Access Control, Gate Permission Rule";
    otherText["pgTitle_addNewprmssn"] =  "Access Control, Add New Gate Permission";
    otherText["pgTitle_addNewpmt"] =  "Access Control, Add New Permission Rule";
    otherText["t__ALERT_PERMNAM_EXIST"] =  "Permission already exist";
    
    /********************
	 * 2 rrays              
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1,1,9,13,18,23, 25, 27, 24, 33, 37, 34, 133 , 137, 134];
	var ops_req_search = [-1,1,9,13,18, 23, 25, 27, 24, 33, 37, 34, 133 , 137, 134];// search never required on this page
                                                   
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
     
      newPage +=addNewBtn_HTML();
      newPage +=displayStatusMsg (op);  
      newPage += "<tr> \n";
      newPage += "<td>\n ";
  	 if( ((myColumns.length)> 0))
     {
        newPage += "<div id=\"printReady\">";
        newPage += table_begin("M", 0,"")
;
        newPage += "<tbody> \n";
        newPage += "<tr>";
         for(var i=0; i<myColumns.length; i++)
        {
          newPage += "<td>"+myColumns[i]+"<\/td>";
         
          
        }
        newPage += "<\/tr>";
     }

	
  	

    
		for(i in prmssn_jsArr)
    {
      if(i>0)
      {
        newPage += "<tr class=\"row1\">\n";
        var howmanyDone =0;
        for(var j=0; j<myColumns.length; j++)
        {
          if (curColumnToSort == howmanyDone)
          {
            newPage += "<td style=\"background-color:#EEEEEE\">" + obs(prmssn_jsArr[i][howmanyDone]) + "<\/td>";
			    } 
          else 
          {
          
				    newPage += "<td>\n";				  
				    if(howmanyDone==0) // means time to display the drop list and table
				    {
  				    newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
              newPage +="       <table border=\"0\">\n";
              newPage +="	       <tr>\n";
              newPage +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+obs(prmssn_jsArr[i][2])+"</span>\n";
              newPage +="          <input type=\"hidden\" name=\"prmssn\" id=\"prmssn\" value=\""+prmssn_jsArr[i][howmanyDone]+"\">\n";
              newPage +="          <input type=\"hidden\" name=\"gate\" id=\"gate\" value=\""+prmssn_jsArr[i][2]+"\">\n";
              newPage +="          <input type=\"hidden\" name=\"pg\" id=\"pg\" value=\""+pg+"\">\n";
              //newPage +=op_field ("");
              newPage +=          preqstr_field ();
              newPage +="          </td>\n";
              newPage +="          <td width=\"50%\">\n";
              newPage += op_list(curPrivilage, prmssn_jsArr[i][(howmanyDone+1)],i );
              newPage +="          </td>\n";
              newPage +="	       </tr>\n";
              newPage +="	      </table>\n";
              newPage +="	      </form>\n";
            }
            else
            {
              newPage += obs(prmssn_jsArr[i][howmanyDone]);
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
     newPage += "<\/div>";
		newPage += "<\/td>";	
		newPage += "<\/tr>";
    
    
		}
		
   if (priv >= 5 && curViewDetailState ==9) // Display Permit associated with a Permission
   {
      newPage += displayPermits();
   }
   if (priv >= 7 && curViewDetailState ==7) // able to insert Show add new form
   {
      
      newPage += displayAddNewPrmssnFrm();
   }
   if (priv >= 7 && curViewDetailState ==3) // able to insert Show add new Prmt form
   {
      newPage += displayAddNewPrmt();
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


function displayAddNewPrmssnFrm()
{
  var addFrmhtml ="";
  addFrmhtml +=backToBtn_HTML();   
  addFrmhtml += fieldst_HTML(otherText["msg_addNewperms_fSet"]);
  addFrmhtml +="<div class=\"adminform\">\n";
  addFrmhtml +="<table width=\"100%\">\n";
  addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_addNewperms_frmComplt"]); 
  addFrmhtml += "      <form name=\"addNew\" method =\"POST\" id=\"addNew\" action=\"gate_perm.php\" onsubmit=\"return checkPermName(this);\">\n";
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
  addFrmhtml +="                             <select id=\"gate\" name=\"gate\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selAGate"]+"\" onChange=\"document.addNew.op.value=7; form.submit();\"> \n";
  addFrmhtml +=displayDropList(gate, gate_jslst,otherText["msg_selAGate"]);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  
  
  addFrmhtml +="									   </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[1]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"prmssnNm\" id=\"prmssnNm\" maxLength=\"14\" dataType=\"Require\" msg=\"Enter Permisson Name\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";

  
  addFrmhtml +="								    </tr>\n";
  
  // 2nd Row Default Permission Details Heading
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotext\" width=\"100%\" ","<b>"+otherText["sec_head_defPmt"]+"</b>");
  addFrmhtml +="														<\/tr>\n";
  addFrmhtml +="													</table>\n";  
  addFrmhtml +="												<\/td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="												<\/td>\n";
  addFrmhtml +="											<\/tr>								\n";
  
 // 3rd Row 
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",permit_myColumns[1]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select id=\"cas\" name=\"cas\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selAcas"]+"\" onchange=\"updateDisable(this);\" > \n";
  addFrmhtml +=displayDropList(cas, prmssnCase_jslst,otherText["msg_selAcas"]);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  addFrmhtml +="												<\/td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",permit_myColumns[3]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select id=\"auth\" name=\"auth\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selAauth"]+"\" disabled > \n";
  addFrmhtml +=displayDropList(auth, auth_level_jslst,otherText["msg_selAauth"]);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  addFrmhtml +="												<\/td>\n";
  addFrmhtml +="											<\/tr>								\n";
  
 // 4th Row 
  addFrmhtml +="											<tr>								\n";
  
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",permit_myColumns[2]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select id=\"etype\" name=\"etype\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selAetype"]+"\" disabled> \n";
  addFrmhtml +=displayDropList(etyp, etyp_jslst,otherText["msg_selAetype"]);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  addFrmhtml +="												<\/td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="												&nbsp;\n";
  addFrmhtml +="												<\/td>\n";
  addFrmhtml +="											<\/tr>								\n";
 
 // end of 4th row
  
  addFrmhtml +="								    </table>\n";
  addFrmhtml +=frmButtRow_HTML(commBtnText["Add"], 1);
                  
  addFrmhtml +="							   </td>\n";
  addFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Add", 1);
  addFrmhtml +="							</table>\n";
  addFrmhtml +="							</div>\n";
  addFrmhtml +=op_field (17);
  addFrmhtml += "                    </form>\n";                      
  addFrmhtml += fieldstFoot_HTML();
  return addFrmhtml;
}
function displayAddNewPrmt()
{
 var addFrmhtml ="";
  addFrmhtml +=backToBtn_HTML();
  
  addFrmhtml += "<tr> \n";
  addFrmhtml += "<td align=\"left\">\n";
  addFrmhtml += "<table>\n";
addFrmhtml += "   <tr> \n";
  addFrmhtml += "                                                    <td width=\"100\" class=\"infotextheading\">\n";
  addFrmhtml += "                                                            "+myColumns[0]+":\n";
  addFrmhtml += "                                                    </td>\n";
  addFrmhtml += "                                                    <td align=\"left\" class=\"infotext\">\n";
  addFrmhtml +=gate;
  addFrmhtml += "                                                    </td>\n";
  addFrmhtml += "   </tr> \n";

  addFrmhtml += "   <tr> \n";
  addFrmhtml += "                                                    <td width=\"100\" class=\"infotextheading\">\n";
  addFrmhtml += "                                                            "+otherText["permisn_id"]+":\n";
  addFrmhtml += "                                                    </td>\n";
  addFrmhtml += "                                                    <td align=\"left\" class=\"infotext\">\n";
  addFrmhtml +=prmssn;
  addFrmhtml += "                                                    </td>\n";
  addFrmhtml += "   </tr> \n";
  addFrmhtml += "   <tr> \n";
  addFrmhtml += "                                                    <td width=\"100\" class=\"infotextheading\">\n";
  addFrmhtml += "                                                            "+myColumns[1]+":\n";
  addFrmhtml += "                                                    </td>\n";
  addFrmhtml += "                                                    <td align=\"left\" class=\"infotext\">\n";
  addFrmhtml +=get_perm_name(prmssn);
  addFrmhtml += "                                                    </td>\n";
  addFrmhtml += "   </tr> \n";
  addFrmhtml += "</table>\n";
  addFrmhtml += "</td>\n";	
  addFrmhtml += "</tr> \n";  
 
 
 
  addFrmhtml += fieldst_HTML(otherText["msg_addNewpermt_fSet"]);
  addFrmhtml +="<div class=\"adminform\">\n";
  addFrmhtml +="<table width=\"100%\">\n";
  addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_addNewpermt_frmComplt"]); 
  addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"gate_perm.php\" onsubmit=\"return submitmyform(this)\">\n";
  addFrmhtml +=          preqstr_field ();
  addFrmhtml +="						<tr>\n";
  addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
  addFrmhtml +="										<table width=\"100%\">\n";
  
  
 
  
 // 3rd Row 
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",permit_myColumns[1]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="<input name=\"gate\" id=\"gate\" value=\""+gate+"\" type=\"hidden\">\n";
  addFrmhtml +="<input name=\"prmssn\" id=\"prmssn\" value=\""+prmssn+"\" type=\"hidden\">\n";
  addFrmhtml +="                             <select id=\"cas\" name=\"cas\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selAcas"]+"\" onchange=\"updateDisable(this);\" > \n";
  addFrmhtml +=displayDropList(cas, prmssnCase_jslst,otherText["msg_selAcas"]);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  addFrmhtml +="												<\/td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",permit_myColumns[3]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select id=\"auth\" name=\"auth\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selAauth"]+"\" disabled> \n";
  addFrmhtml +=displayDropList(auth, auth_level_jslst,otherText["msg_selAauth"]);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  addFrmhtml +="												<\/td>\n";
  addFrmhtml +="											<\/tr>								\n";
  
 // 4th Row 
  addFrmhtml +="											<tr>								\n";
  
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",permit_myColumns[2]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select id=\"etype\" name=\"etype\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selAetype"]+"\"disabled > \n";
  addFrmhtml +=displayDropList(etyp, etyp_jslst,otherText["msg_selAetype"]);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  addFrmhtml +="												<\/td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="												&nbsp;\n";
  addFrmhtml +="												<\/td>\n";
  addFrmhtml +="											<\/tr>								\n";
 
 // end of 4th row
  
  addFrmhtml +="								    </table>\n";
  addFrmhtml +=frmButtRow_HTML(commBtnText["Add"], 1);
                  
  addFrmhtml +="							   </td>\n";
  addFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Add", 1);
  addFrmhtml +="							</table>\n";
  addFrmhtml +="<\/div>\n";
  addFrmhtml +=op_field (13);
  addFrmhtml += "                    </form>\n";                      
  addFrmhtml += fieldstFoot_HTML();
  return addFrmhtml;
}
function displayPermits(curPrivilage,curColumnToSort)
{
  var viewPrmtHtml ="";

  viewPrmtHtml +=backToBtn_HTML();
  viewPrmtHtml += "<tr> \n";
  viewPrmtHtml += "<td align=\"left\">\n";
  viewPrmtHtml += "<table>\n";
 viewPrmtHtml += "   <tr> \n";
  viewPrmtHtml += "                                                    <td width=\"100\" class=\"infotextheading\">\n";
  viewPrmtHtml += "                                                            "+myColumns[0]+":\n";
  viewPrmtHtml += "                                                    </td>\n";
  viewPrmtHtml += "                                                    <td align=\"left\" class=\"infotext\">\n";
  viewPrmtHtml +=gate;
  viewPrmtHtml += "                                                    </td>\n";
  viewPrmtHtml += "   </tr> \n";

  viewPrmtHtml += "   <tr> \n";
  viewPrmtHtml += "                                                    <td width=\"100\" class=\"infotextheading\">\n";
  viewPrmtHtml += "                                                            "+otherText["permisn_id"]+":\n";
  viewPrmtHtml += "                                                    </td>\n";
  viewPrmtHtml += "                                                    <td align=\"left\" class=\"infotext\">\n";
  viewPrmtHtml +=prmssn;
  viewPrmtHtml += "                                                    </td>\n";
  viewPrmtHtml += "   </tr> \n";
  viewPrmtHtml += "   <tr> \n";
  viewPrmtHtml += "                                                    <td width=\"100\" class=\"infotextheading\">\n";
  viewPrmtHtml += "                                                            "+myColumns[1]+":\n";
  viewPrmtHtml += "                                                    </td>\n";
  viewPrmtHtml += "                                                    <td align=\"left\" class=\"infotext\">\n";
  viewPrmtHtml +=get_perm_name(prmssn);
  viewPrmtHtml += "                                                    </td>\n";
  viewPrmtHtml += "   </tr> \n";
  viewPrmtHtml += "</table>\n";
  viewPrmtHtml += "</td>\n";	
  viewPrmtHtml += "</tr> \n";
  
  viewPrmtHtml += "<tr> \n";
  //end of the td and tr for the list area
  viewPrmtHtml += "<td>\n ";  
  if( ((permit_myColumns.length)> 0))
     {
        
        viewPrmtHtml += "<div id=\"printReady\">";
        viewPrmtHtml += table_begin("M", 1,"")
;
        viewPrmtHtml += "<tbody> \n";
        viewPrmtHtml += "<tr>";
         for(var i=0; i<permit_myColumns.length; i++)
        {
          viewPrmtHtml += "<td>"+permit_myColumns[i]+"<\/td>";
         
          
        }
        viewPrmtHtml += "<\/tr>";
     }

    for(i in prmssn_k_jsArr)
    {
      if(i>0)
      {
        viewPrmtHtml += "<tr class=\"row1\">\n";
        var howmanyDone =0;
        for(var j=0; j<permit_myColumns.length; j++)
        {
          if (curColumnToSort == howmanyDone)
          {
            viewPrmtHtml += "<td style=\"background-color:#EEEEEE\">" + cust_jstab[i][howmanyDone] + "<\/td>";
			    } 
          else 
          {
          
				    viewPrmtHtml += "<td>\n";				  
				    if(howmanyDone==0) // means time to display the drop list and table
				    {
  				    viewPrmtHtml +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
              viewPrmtHtml +="       <table border=\"0\">\n";
              viewPrmtHtml +="	       <tr>\n";
              viewPrmtHtml +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+prmssn_k_jsArr[i][howmanyDone]+"</span>\n";
              viewPrmtHtml +="          </td>\n";
              viewPrmtHtml +="          <td width=\"50%\">\n";
              viewPrmtHtml +="            &nbsp;\n";
              viewPrmtHtml +="          </td>\n";
              viewPrmtHtml +="	       </tr>\n";
              viewPrmtHtml +="	      </table>\n";
              
            }
            else
            {
              viewPrmtHtml += prmssn_k_jsArr[i][howmanyDone];
            }  
            viewPrmtHtml +="	      </form>\n";
            viewPrmtHtml += "<\/td>\n";
          
          
		  	}
		  	howmanyDone++;	
      } // end of inner for loop
      
		  
     }
      viewPrmtHtml += "\n";
      viewPrmtHtml += "<\/tr>";
    }
    
    // now deal with all other permits
    for(i in prmt_jsArr)
    {
      if(i>0)
      {
        viewPrmtHtml += "<tr class=\"row1\">\n";
        var howmanyDone =0;
        for(var j=0; j<permit_myColumns.length; j++)
        {
          if (curColumnToSort == howmanyDone)
          {
            viewPrmtHtml += "<td style=\"background-color:#EEEEEE\">" + cust_jstab[i][howmanyDone] + "<\/td>";
			    } 
          else 
          {
          
				    viewPrmtHtml += "<td>\n";				  
				    if(howmanyDone==0) // means time to display the drop list and table
				    {
  				    viewPrmtHtml +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
              viewPrmtHtml +="       <table border=\"0\">\n";
              viewPrmtHtml +="	       <tr>\n";
              viewPrmtHtml +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+prmt_jsArr[i][howmanyDone]+"</span>\n";
              viewPrmtHtml +="          </td>\n";
              viewPrmtHtml +="          <td width=\"50%\">\n";
              viewPrmtHtml +="            &nbsp;\n";
              viewPrmtHtml +="          </td>\n";
              viewPrmtHtml +="	       </tr>\n";
              viewPrmtHtml +="	      </table>\n";
              
            }
            else
            {
              viewPrmtHtml += prmt_jsArr[i][howmanyDone];
            }  
            viewPrmtHtml +="	      </form>\n";
            viewPrmtHtml += "<\/td>\n";
          
          
		  	}
		  	howmanyDone++;	
      } // end of inner for loop
      
		  
     }
      viewPrmtHtml += "\n";
      viewPrmtHtml += "<\/tr>";
    }
    
    viewPrmtHtml += "<\/tbody>";
    viewPrmtHtml += "<\/table>";
    viewPrmtHtml += "<\/div>";
		viewPrmtHtml += "<\/td>";	
		viewPrmtHtml += "<\/tr>";     
  viewPrmtHtml += "<\/td>\n ";
  viewPrmtHtml += "</tr> \n";
  
  return viewPrmtHtml;
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

function backToBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
      
   
   btn_HTML += btnLocation_HTML("justChaneMyLocation('gate_perm.php'); ", otherText["btn_bakto_prmssnPg"]);
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
    btn_HTML += btnLocation_HTML("justChaneMyLocation('gate_perm.php?op=7'); ", otherText["btn_addNew_prmssn"]);
   }
   
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
  
   return btn_HTML;
}
function updatePageHeading(op,pgHead)
{
  //alert("I am in heading");
  var pageHeading = pgHead;
  if (op <= 1)
  {
    pageHeading +=otherText["pgHead_gtpss"];
  }
   if (op == 3)
  {
    pageHeading +=otherText["pgHead_addNewpmt"];
  }
  if (op ==7)
  {
    pageHeading +=otherText["pgHead_addNewprmssn"];
  }
  
  if(op == 9)
  {
    pageHeading +=otherText["pgHead_gtpmt"];
  }
  return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
  //alert("I am in pgTit");
  var pageTitle = pgTit;
  if (op <= 1)
  {
    pageTitle +=otherText["pgTitle_gtpss"];
    
  }  
  if (op == 3)
  {
    pageTitle +=otherText["pgTitle_addNewpmt"];
  }
  if (op ==7)
  {
    pageTitle +=otherText["pgTitle_addNewprmssn"];
  }
  
  if(op ==9 )
  {
    pageTitle +=otherText["pgTitle_gtpmt"];
  }
  
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
    op_list +="<option value=\"8\">"+otherText["delete_permit"]+"</option>";
      
      
    case 7:		
    op_list +="<option value=\"3\">"+otherText["addnew_permit"]+"</option>";
    case 6:    /* Modify not required for The Tank Grouping Page  */
    
    case 5:			/* Find Has not been implemented yet*/
    op_list +="<option value=\"9\">"+otherText["view_permit"]+"</option>";
     
    break;
  }
  
  op_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
  op_list +="</select>                                        ";
  return op_list ;
}
function updateDisable(myObj)
{
	if(myObj.selectedIndex==0) // enable  Authority Type and disable etyp
	{
		updateDisableProp('auth', false);
		var currElement = getElemRefs('auth');
		currElement.setAttribute("dataType","Require");
		
		updateDisableProp('etype', true);
		var currElement = getElemRefs('etype');
		currElement.setAttribute("dataType","");
	}
	else if(myObj.selectedIndex==1)
	{
		updateDisableProp('etype', false);
		var currElement = getElemRefs('etype');
		currElement.setAttribute("dataType","Require");
		updateDisableProp('auth', true);
		var currElement = getElemRefs('auth');
		currElement.setAttribute("dataType","");
	}
}
function updateDisableProp(fieldId, isDisable)
{
	
	var currElement = getElemRefs(fieldId);
	currElement.disabled=isDisable;
}
function get_perm_name(permNmId)
{
	var per_name ="";

	for(i in prmssn_jsArr)
    	{
/*
      		if(i>0)
      		{
			prmssn_jsArr[i][0]= permNmId;
			per_name =prmssn_jsArr[i][1];
			return per_name;

			
		}
*/
		if (prmssn_jsArr[i][0] == permNmId)
		{
			per_name = prmssn_jsArr[i][1];
			return per_name;
		}
	}

	return per_name;
 	
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
  newPage +="//Check existing existing permission names and if all fine submt the form  \n";
  newPage +="function checkPermName(myobject)\n";
  newPage +="{\n";
  newPage +="	 if (Validator.Validate(myobject,1))\n";
  newPage +="	 {\n";
  newPage +="    var j = 0;\n";
  newPage +="	   for(j=1; j< prmssn_jsArr.length; j++) \n";
  newPage +="	   {\n";
  newPage +="	     if (prmssn_jsArr[j][1] == trim(document.addNew.prmssnNm.value) && (gate==prmssn_jsArr[j][2]) ) { \n";
  newPage +="	       alert(' "+ otherText["t__ALERT_PERMNAM_EXIST"] + "');\n";
  newPage +="	       document.addNew.prmssnNm.focus ;\n";
  newPage +="	       return false;\n";
  newPage +="	     }\n";
  newPage +="	   } \n";
  newPage +="	   return true;\n";
  newPage +="   	 }\n";
  newPage +="  return false;\n";
  newPage +="}\n";
  
  newPage +="</script>\n";
  newPage += "</head>\n";
  newPage += "<body>\n";
  return (newPage);
}  

