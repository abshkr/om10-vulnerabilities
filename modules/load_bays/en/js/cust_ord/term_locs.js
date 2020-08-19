	var opValues = new Array();
	
	opValues["viewTerminal"] = -1;

	opValues["insertTerminalForm"] = 7;
	opValues["insertTerminalSubmit"] = 17;
	opValues["deleteTerminalForm"] = 8;
	opValues["deleteTerminalSubmit"] = 18;
	opValues["modifyTerminalForm"] = 6;
	opValues["modifyTerminalSubmit"] = 16;

	opValues["viewAddress"] = 2;

	opValues["modifyAddressForm"] = 3;
	opValues["modifyAddressSubmit"] = 13;
	opValues["insertAddressForm"] = 4;
	opValues["insertAddressSubmit"] = 14;


	var myColumns = [
			"Code", "Name", "Address", "Contact"
	];
		
	var otherText = new Array();
	otherText["youraction"] =  "YOUR ACTION";
    otherText["tmAddress"] =  "ADDRESS";
	otherText["btn_addNew_tmLocs"] =  "Add New Terminal";
	otherText["btn_addNew_tmAddr"] =  "Add New Address";
	otherText["btn_bakto_tmLocsPg"] =  "Back to Terminal Location Page";
	otherText["btn_bakto_tmAddrPg"] =  "Back to Address Page";
	otherText["btn_bakto_tmLocsAdd"] =  "Back to Add Terminal Location Page";
	otherText["btn_bakto_tmLocsUpd"] =  "Back to Modify Terminal Location Page";

	otherText["pgTitle_tmLocs"] =  "Customer Order Processing, Terminal Locations Page";
	otherText["pgTitle_tmLocsUpd"] =  "Customer Order Processing, Terminal Locations, Modify";
	otherText["pgTitle_tmLocsAdd"] =  "Customer Order Processing, Terminal Locations, Add";
	otherText["pgTitle_tmLocsDel"] =  "Customer Order Processing, Terminal Locations, Delete";

	otherText["pgTitle_tmAddr"] =  "Customer Order Processing, Terminal Locations, Address Page";
	otherText["pgTitle_tmAddrUpd"] =  "Customer Order Processing, Terminal Locations, Address, Modify";
	otherText["pgTitle_tmAddrAdd"] =  "Customer Order Processing, Terminal Locations, Address, Add";

	otherText["pgHead_tmLocs"] =  "Terminal Locations";
	otherText["pgHead_tmLocsUpd"] =  "Modify Terminal Location";
	otherText["pgHead_tmLocsAdd"] =  "Add Terminal Location";
	otherText["pgHead_tmLocsDel"] =  "Delete Terminal Location";
	otherText["pgHead_tmAddr"] =  "Address";
	otherText["pgHead_tmAddrUpd"] =  "Modify Address";
	otherText["pgHead_tmAddrAdd"] =  "Add Address";

	otherText["msg_del_confirm"] =  "Are you sure you want to delete?";

    otherText["msg_updTmLoc_fSet"] =  "Terminal Location";
    otherText["msg_updTmLoc_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_LoadingSecu_Set"] =  "Security Setting For Loading Process";
    otherText["msg_PersonnelSecu_Set"] =  "Security Setting For User Access Control";
    otherText["msg_addTmLoc_fSet"] =  "Terminal Location";
    otherText["msg_addTmLoc_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";

    otherText["msg_addTmAddr_fSet"] =  "Address";
    otherText["msg_addTmAddr_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_updTmAddr_fSet"] =  "Address";
    otherText["msg_updTmAddr_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";

	otherText["msg_selAaddr"] =  "Please select an address";

	otherText["msg_enterTmCode"] = "Please enter the terminal code!";
	otherText["msg_enterTmName"] = "Please enter the terminal name!";

	otherText["msg_enterTmAddrCode"] = "Please enter the terminal address code!";
	otherText["msg_enterTmAddrLine1"] = "Please enter the terminal address - line 1!";
	otherText["msg_enterTmAddrLine2"] = "Please enter the terminal address - line 2!";
	otherText["msg_enterTmAddrProvince"] = "Please enter the terminal address - province!";
	otherText["msg_enterTmAddrZipcode"] = "Please enter the terminal address - post code!";
	otherText["msg_enterTmAddrCountry"] = "Please enter the terminal address - country!";
    
    otherText["msg_site_config"] = "Toggle the Check boxes to Enable/Disable the check:";

	var addrTitle = new Array();
	addrTitle[0] = "Address Code";
	addrTitle[1] = "Address 1st Line";
	addrTitle[2] = "Address 2nd Line";
	addrTitle[3] = "Province";
	addrTitle[4] = "Postal Code";
	addrTitle[5] = "Country";

	var termLocTitle = new Array();
	termLocTitle[1] = "Code";
	termLocTitle[2] = "Name";
	termLocTitle[3] = "Address";
	termLocTitle[4] = "Contact";
	termLocTitle[5] = "Lock Card after X incorrect PIN attempts <span style=\"COLOR: #FF0000;\">[Updating this requires CSC to update config at the BAY]</span>";
    termLocTitle[6] = "Minimum Personnel password length required (FOR NEW PASSWORDS ONLY)";
    termLocTitle[7] = "Maximum Personnel password length required (FOR NEW PASSWORDS ONLY)";
    termLocTitle[8] = "Select a password complexity level(FOR NEW PASSWORDS ONLY)";
    termLocTitle[9] = "Lock Personnel account after X incorrect password attempts";
    termLocTitle[10] = "Personnel Password expires after X number of days";
    termLocTitle[11] = "Minutes before Personnel can change their password again";
    termLocTitle[12] = "X number of previous passwords can not be re-used by the Personnel";
    termLocTitle[13] = "Inactive session time out (Minutes)";
    termLocTitle[14] = "Max Number of concurrent sessions permitted by the system";
    termLocTitle[15] = "Lock unused Personnels after X number of days";
    termLocTitle[16] = "Delete unused Personnels after X number of days";
    termLocTitle[17] = "PIN must be changed every X days";
    termLocTitle[18] = "Path to the server directory to store the report output files";
		
	var l_opInf= new Array()
	for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
	l_opInf[28]= "Successfully Deleted!";
	l_opInf[27]= "Successfully Inserted a New Record!";
	l_opInf[26]= "Successfully Updated!";

	l_opInf[24]= "Successfully Inserted a New Record!";
	l_opInf[23]= "Successfully Updated!";

	l_opInf[38]= "Delete Failed!";
	l_opInf[37]= "Insert Failed!";
	l_opInf[36]= "Update Failed!";

	l_opInf[34]= "Insert Failed!";
	l_opInf[33]= "Update Failed!";


	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 1,2,3,4,6,7];
	var ops_req_search = [-1];// search never required on this page


/*
 * The structure dealing with
 * "Code", "Name", "Address", "Contact"
   ["MOBYA", "MOBIL YARRAVILLE", "MOBIL YARRAVILLE", ""]
*/			

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
	var pageTitle="";
	var pageHeading="";

//	newPage += "<html>\n";

	//printHdr function of comm_HTML.js file responsible for 
	//generating all the HTML for the current page
	newPage += printHdr( newPage, 
						updatePageTitle(curViewDetailState,pageTitle), 
						lang );

	//local_HeadrHTML function is local function give 
	// the ability to append any thing to the current page
	newPage += local_HeadrHTML( newPage );

	//getToolBar_HTML function of comm_HTML.js file responsible for  
	// outputting the tool bar
	//controls the search and print buttons as well
	newPage += getToolBar_HTML( newPage,  
								updatePageHeading(curViewDetailState, pageHeading), 
								check_ifReqPrint(ops_req_print, curViewDetailState), 
								check_ifReqSearch(ops_req_search, curViewDetailState) );

	newPage += "\n";
	newPage += "<tr>\n";  
	newPage += "<td width=\"100%\">             \n";
	newPage += "<div class=\"content\" id=\"content\">\n";
	newPage += "<div id=\"printReady\">";
	newPage += "<table border=\"0\" width=\"100%\" height=\"100%\">\n";
	newPage += "<tbody>\n";  
/*
	newPage += "    <tr>\n";
	newPage += "            <td align=\"center\">\n";
	newPage += "                    <h5>" + updatePageHeading(curViewDetailState, pageHeading) + "</h5>\n";
	newPage += "            </td>\n";
	newPage += "    </tr>\n";
*/

	// display the result of DB operation
	newPage +=	displayStatusMsg (opStatus);  

	/* View records of terminal locations */
	if (curViewDetailState <= 1) 
	{
		newPage += displayTerminalList (curPrivilage, curColumnToSort);
	}
		
	
	/* Display Address Details */
	if (priv >= 5 && curViewDetailState == opValues["viewAddress"]) 	
	{
		newPage += displayTerminalAddress();
	}

	/* Display Form for Modify Terminal Address Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyAddressForm"])	
	{
		newPage += displayModifyTerminalAddressForm();
	}
	/* Submit the Modification of Terminal Address Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyAddressSubmit"])	
	{
		newPage += displayTerminalAddress();
	}
	
	/* Display Form for Add Terminal Address Details */
	if (priv >= 7 && curViewDetailState == opValues["insertAddressForm"])	
	{
		newPage += displayInsertTerminalAddressForm();
	}
	/* Submit the Insertion of Terminal Address Details */
	if (priv >= 7 && curViewDetailState == opValues["insertAddressSubmit"])	
	{
		newPage += displayModifyTerminalForm();
	}
	
	/* Display Form for Modify Terminal Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyTerminalForm"])	
	{
		newPage += displayModifyTerminalForm();
	}
	/* Submit the Modification of Terminal Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyTerminalSubmit"])	
	{
		newPage += displayTerminalList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Insert Terminal Details */
	if (priv >= 7 && curViewDetailState == opValues["insertTerminalForm"])	
	{
		newPage += displayInsertTerminalForm();
	}
	/* Submit the Insertion of Terminal Details */
	if (priv >= 7 && curViewDetailState == opValues["insertTerminalSubmit"])	
	{
		newPage += displayTerminalList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Delete a recorde of Terminal */
//	if (priv >= 8 && curViewDetailState == opValues["deleteTerminalForm"])	
//	{
//		newPage += displayDeleteTerminalForm();
//	}
	/* Submit the Deletion of Terminal Details */
	if (priv >= 8 && curViewDetailState == opValues["deleteTerminalSubmit"])	
	{
		newPage += displayTerminalList(curPrivilage, curColumnToSort);
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

	return(newPage);
	document.close();
}



function displayGlblFrm()
{
	var glblFrm = "";

	return glblFrm;
}




function displayTerminalList (curPrivilage, curColumnToSort)
{
	var newPage = "";

		newPage += displayGlblFrm();
		newPage += addNewBtn_HTML();
		newPage += "<tr>\n";
		newPage += "<td>\n ";
		if( ((myColumns.length)> 0) )
		{
//			newPage += "<div id=\"printReady\">\n";  /* Start of Print Area */

			newPage += table_begin("M", 0,"");
			newPage += "<tbody> \n";
			newPage += "<tr>";
			for(var i=0; i<myColumns.length; i++)
			{
				newPage += "<td>" + myColumns[i] + "<\/td>";
			}
			newPage += "<\/tr>";
		}

	
		/*
		myComputers.sort(
			function MySort(a, b)
			{
				if(a[curColumnToSort] < b[curColumnToSort])
				{
					return -1;
				}
				if(a[curColumnToSort] > b[curColumnToSort])
				{
					return 1;
				}
				return 0;
			}
		);
		*/

		var i
		for(i in term_locs_jstab )
		{
			if (i>0)
			{
				newPage += "<tr class=\"row1\">\n";
				var howmanyDone =0;
				for(var j=0; j<myColumns.length; j++)
				{
					if (curColumnToSort == howmanyDone)
					{
						newPage += "<td style=\"background-color:#EEEEEE\">" + obs(term_locs_jstab [i][howmanyDone]) + "<\/td>";
					} 
					else 
					{
						newPage += "<td>\n";				  
						if(howmanyDone==0) // means time to display the drop list and table
						{
							newPage += "	      <form name=\"select_action_" + i + "\" id=\"select_action_" + i + "\" >\n";
							newPage += "       <table border=\"0\">\n";
							newPage += "	       <tr>\n";
							newPage += "          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">" + obs(term_locs_jstab[i][howmanyDone]) + "</span>\n";
							newPage += "          <input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + term_locs_jstab[i][howmanyDone] + "\">\n";
//							newPage += "          <input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
							newPage += "          <input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
							//newPage +=op_field ("");
							newPage +=          preqstr_field ();
							newPage += "          </td>\n";
							newPage += "          <td width=\"50%\">\n";
							newPage += op_list(curPrivilage, term_locs_jstab[i][howmanyDone], i );
							newPage += "          </td>\n";
							newPage += "	       </tr>\n";
							newPage += "	      </table>\n";
							newPage += "	      </form>\n";
						}
						else
						{
							newPage += obs(term_locs_jstab[i][howmanyDone]);
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

//		newPage += "</div>\n";  /* End of Print Area */

		newPage += "<\/td>";	
		newPage += "<\/tr>";
		
	

	return newPage;
}


function make_item_unit(type, title, value, name, id, list, size, maxlen, validator, msg, mandatory, indent, width, nocheckbox)
{
    var fieldHTML = "";
    fieldHTML += makespace("\t", indent+4) + "<tr>\n";
    
    if (value == -1)
    {
        if (nocheckbox == null)
            fieldHTML += "<td width=\"5\" align=\"center\"><input type=checkbox onclick=\"document.getElementById('" + id + "').disabled = !this.checked\"></checkbox></td>\n";
        else
            fieldHTML += "<td width=\"5\" align=\"center\"></td>\n";
        fieldHTML += makefield(type, title, "", name, id, list, size, maxlen, validator, msg, mandatory, indent, width, 1);
    }
    else
    {
        if (nocheckbox == null)
            fieldHTML += "<td width=\"5\" align=\"center\"><input type=checkbox onclick=\"document.getElementById('" + id + "').disabled = !this.checked\" checked></checkbox></td>\n";
        else
            fieldHTML += "<td width=\"5\" align=\"center\"></td>\n";
        fieldHTML += makefield(type, title, value, name, id, list, size, maxlen, validator, msg, mandatory, indent, width, 110);
    }
    
    fieldHTML += makespace("\t", indent+4) + "</tr>\n";
    
    return fieldHTML;
}

function make_origvalue_unit(value, name)
{
    var fieldHTML = "<input type=\"hidden\" name=\"" + name + "\" value=\"" + value + "\">";
    return fieldHTML;
}

function displayModifyTerminalForm ()
{
	var indent = 1;
    var complexity = [["", ""], ["6", "Simple (Alpha-Numeric)"], ["7", "Hard (Alpha-Numeric + Mixed Case)"],["15", "Very Hard (Alpha-Numeric + Mixed Case + Symbols)"]];
	var updFrm = "<SCRIPT LANGUAGE=\"JavaScript\">function CheckLength() {if (parseInt(document.getElementById('URBAC_PWD_LEN_MIN').value) > parseInt(document.getElementById('URBAC_PWD_LEN_MAX').value)) {alert('The minimum number of chars for password must be less than the maximum'); return false;} return true;} </SCRIPT>";
    
	updFrm += makespace("\t", indent) + backToBtn_HTML();  

	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td align=\"left\">\n";
    
	updFrm += makespace("\t", indent+1) + "<form name=\"edit_termlocs\" method=\"post\" id=\"edit_termlocs\" action=\"term_locs.cgi\" onsubmit=\"return CheckLength() && Validator.Validate(this,1);\">\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + otherText["msg_updTmLoc_fSet"] + "</li>\n";
	updFrm += "</ul>\n";
	updFrm += "<div class=\"adminform\">\n";

//	updFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	updFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_updTmLoc_fSet"] + "</strong></legend>\n";

	updFrm += makespace("\t", indent+3) + "<table  width=\"100%\">\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	//updFrm += makespace("\t", indent+4) + "<br>\n";
	updFrm += makespace("\t", indent+4) + otherText["msg_updTmLoc_frmComplt"] +"\n";


	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyTerminalSubmit"] + "\">\n";


	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";


	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	updFrm += makespace("\t", indent+4) + "<table width=\"100%\" >\n";

	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(3, termLocTitle[1], frm_code, "frm_code", "frm_code", "", 0, 0, "", "", "&nbsp;", indent+4, 110);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(1, termLocTitle[2], frm_name, "frm_name", "frm_name", "", 20, 49, "dataType=\"Require\"", otherText["msg_enterTmName"], "*", indent+4, 110);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(2, termLocTitle[3], frm_address, "frm_address", "frm_address", addresses, 0, 0, "dataType=\"Require\"", otherText["msg_selAaddr"], "*", indent+4, 110);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(1, termLocTitle[4], frm_contact, "frm_contact", "frm_contact", "", 20, 49, "", "", "&nbsp;", indent+4, 110);
	updFrm += makespace("\t", indent+4) + "</tr>\n";
    
    updFrm += makespace("\t", indent+4) + "</table>\n";
	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";

        updFrm += makespace("\t", indent+4) + "</table>\n";
        updFrm += makespace("\t", indent+2) + "</div>\n";
        updFrm += " <ul id=\"tabmenu\">\n";
        updFrm += "<li>" + otherText["msg_LoadingSecu_Set"]  + "</li>\n";
        updFrm += "</ul>\n";
        updFrm += "<div class=\"adminform\">\n";
        updFrm += makespace("\t", indent+4) + "<table width=\"100%\" >\n";
    
    updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	//updFrm += makespace("\t", indent+4) + "<br>\n";
	updFrm += makespace("\t", indent+4) + otherText["msg_site_config"] +"\n";
    updFrm += makespace("\t", indent+4) + "<br>\n";
    updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
    
    updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";
    updFrm += makespace("\t", indent+4) + "<table width=\"100%\" style=\"border:1px solid black;\">\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td align=\"center\" class=\"infotext\" style=\"font-weight:bold; border:1px solid black;\">\n";
	updFrm += "Enabled?";
	updFrm += makespace("\t", indent+3) + "<td align=\"center\" class=\"infotext\" colspan =\"2\" style=\"font-weight:bold; border:1px solid black;\">\n";
	updFrm += "Description";
	updFrm += makespace("\t", indent+3) + "<td align=\"left\" colspan =\"2\" class=\"infotext\" style=\"font-weight:bold; border:1px solid black;\">\n";
	updFrm += "Value";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	
    
    updFrm += make_item_unit(1, termLocTitle[5], DRIVER_PIN_AUTO_LOCK, "DRIVER_PIN_AUTO_LOCK", "DRIVER_PIN_AUTO_LOCK", "", 10, 49, "dataType=\"RangeInt\" min=\"0\" max=\"9\" ", "Please enter integer between 0 and 9", "*", indent+4, 110);
    updFrm += make_origvalue_unit(DRIVER_PIN_AUTO_LOCK, "DRIVER_PIN_AUTO_LOCK_ORIG");
    updFrm += make_item_unit(1, termLocTitle[17], DRIVER_PIN_AUTO_EXPIRE, "DRIVER_PIN_AUTO_EXPIRE", "DRIVER_PIN_AUTO_EXPIRE", "", 10, 49, "dataType=\"RangeInt\" min=\"0\" max=\"999\" ", "Please enter integer between 0 and 999", "*", indent+4, 110);
    updFrm += make_origvalue_unit(DRIVER_PIN_AUTO_EXPIRE, "DRIVER_PIN_AUTO_EXPIRE_ORIG");
        updFrm += makespace("\t", indent+4) + "</table>\n";
        updFrm += makespace("\t", indent+3) + "</td>\n";
        updFrm += makespace("\t", indent+3) + "</tr>\n";
        updFrm += makespace("\t", indent+4) + "</table>\n";
        updFrm += makespace("\t", indent+2) + "</div>\n";

         updFrm += " <ul id=\"tabmenu\">\n";
        updFrm += "<li>" + otherText["msg_PersonnelSecu_Set"]  + "</li>\n";
        updFrm += "</ul>\n";
        updFrm += "<div class=\"adminform\">\n";
        updFrm += makespace("\t", indent+4) + "<table width=\"100%\" >\n";
		

    updFrm += makespace("\t", indent+3) + "<tr>\n";
        updFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
        //updFrm += makespace("\t", indent+4) + "<br>\n";
        updFrm += makespace("\t", indent+4) + otherText["msg_site_config"] +"\n";
    updFrm += makespace("\t", indent+4) + "<br>\n";
    updFrm += makespace("\t", indent+3) + "</td>\n";
        updFrm += makespace("\t", indent+3) + "</tr>\n";

    updFrm += makespace("\t", indent+3) + "<tr>\n";
        updFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";
    updFrm += makespace("\t", indent+4) + "<table width=\"100%\" style=\"border:1px solid black;\">\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td align=\"center\" class=\"infotext\" style=\"font-weight:bold; border:1px solid black;\">\n";
	updFrm += "Enabled?";
	updFrm += makespace("\t", indent+3) + "<td align=\"center\" class=\"infotext\" colspan =\"2\" style=\"font-weight:bold; border:1px solid black;\">\n";
	updFrm += "Description";
	updFrm += makespace("\t", indent+3) + "<td align=\"left\" colspan =\"2\" class=\"infotext\" style=\"font-weight:bold; border:1px solid black;\">\n";
	updFrm += "Value";
	updFrm += makespace("\t", indent+3) + "</tr>\n";

        updFrm += make_item_unit(1, termLocTitle[6], URBAC_PWD_LEN_MIN, "URBAC_PWD_LEN_MIN", "URBAC_PWD_LEN_MIN", "", 10, 49, "dataType=\"RangeInt\" min=\"2\" max=\"20\"", "Please enter integer between 2 and 20", "*", indent+4, 110, 1);
        updFrm += make_origvalue_unit(URBAC_PWD_LEN_MIN, "URBAC_PWD_LEN_MIN_ORIG");
        updFrm += make_item_unit(1, termLocTitle[7], URBAC_PWD_LEN_MAX, "URBAC_PWD_LEN_MAX", "URBAC_PWD_LEN_MAX", "", 10, 49, "dataType=\"RangeInt\" min=\"2\" max=\"20\"", "Please enter integer between 2 and 20", "*", indent+4, 110, 1);
        updFrm += make_origvalue_unit(URBAC_PWD_LEN_MAX, "URBAC_PWD_LEN_MAX_ORIG");
    updFrm += make_item_unit(2, termLocTitle[8], URBAC_PWD_COMPLEXITY, "URBAC_PWD_COMPLEXITY", "URBAC_PWD_COMPLEXITY", complexity, 10, 49, "dataType=\"Require\" ", "Please select a level", "*", indent+4, 110, 1);
        updFrm += make_origvalue_unit(URBAC_PWD_COMPLEXITY, "URBAC_PWD_COMPLEXITY_ORIG");
        updFrm += make_item_unit(1, termLocTitle[9], URBAC_PWD_AUTO_LOCK, "URBAC_PWD_AUTO_LOCK", "URBAC_PWD_AUTO_LOCK", "", 10, 49, "dataType=\"RangeInt\" min=\"1\" max=\"9\"", "Please enter integer between 1 and 9", "*", indent+4, 110);
        updFrm += make_origvalue_unit(URBAC_PWD_AUTO_LOCK, "URBAC_PWD_AUTO_LOCK_ORIG");
        updFrm += make_item_unit(1, termLocTitle[10], URBAC_PWD_AUTO_EXPIRE, "URBAC_PWD_AUTO_EXPIRE", "URBAC_PWD_AUTO_EXPIRE", "", 10, 49, "dataType=\"RangeInt\" min=\"0\" max=\"999\"", "Please enter integer between 0 and 999", "*", indent+4, 110);
        updFrm += make_origvalue_unit(URBAC_PWD_AUTO_EXPIRE, "URBAC_PWD_AUTO_EXPIRE_ORIG");
    updFrm += make_item_unit(1, termLocTitle[11], URBAC_PWD_UPD_INTERVAL, "URBAC_PWD_UPD_INTERVAL", "URBAC_PWD_UPD_INTERVAL", "", 10, 49, "dataType=\"RangeInt\" min=\"0\" max=\"999\"", "Please enter integer between 0 and 999", "*", indent+4, 110);
        updFrm += make_origvalue_unit(URBAC_PWD_UPD_INTERVAL, "URBAC_PWD_UPD_INTERVAL_ORIG");
	updFrm += make_item_unit(1, termLocTitle[12], URBAC_PWD_REUSE, "URBAC_PWD_REUSE", "URBAC_PWD_REUSE", "", 10, 49, "dataType=\"RangeInt\" min=\"0\" max=\"99\" ", "Please enter integer between 0 and 99", "*", indent+4, 110);
        updFrm += make_origvalue_unit(URBAC_PWD_REUSE, "URBAC_PWD_REUSE_ORIG");
	updFrm += make_item_unit(1, termLocTitle[13], URBAC_AUTO_LOGOFF, "URBAC_AUTO_LOGOFF", "URBAC_AUTO_LOGOFF", "", 10, 49, "dataType=\"RangeInt\" min=\"0\" max=\"999\" ", "Please enter integer between 0 and 999", "*", indent+4, 110);
        updFrm += make_origvalue_unit(URBAC_AUTO_LOGOFF, "URBAC_AUTO_LOGOFF_ORIG");
	updFrm += make_item_unit(1, termLocTitle[14], URBAC_SESSION_PER_USER, "URBAC_SESSION_PER_USER", "URBAC_SESSION_PER_USER", "", 10, 49, "dataType=\"RangeInt\" min=\"0\" max=\"99\" ", "Please enter integer between 0 and 99", "*", indent+4, 110);
        updFrm += make_origvalue_unit(URBAC_SESSION_PER_USER, "URBAC_SESSION_PER_USER_ORIG");       
	updFrm += make_item_unit(1, termLocTitle[15], URBAC_USER_AUTO_LOCK, "URBAC_USER_AUTO_LOCK", "URBAC_USER_AUTO_LOCK", "", 10, 49, "dataType=\"RangeInt\" min=\"0\" max=\"999\" ", "Please enter integer between 0 and 999", "*", indent+4, 110);
        updFrm += make_origvalue_unit(URBAC_USER_AUTO_LOCK, "URBAC_USER_AUTO_LOCK_ORIG");
	updFrm += make_item_unit(1, termLocTitle[16], URBAC_USER_AUTO_DELETE, "URBAC_USER_AUTO_DELETE", "URBAC_USER_AUTO_DELETE", "", 10, 49, "dataType=\"RangeInt\" min=\"0\" max=\"999\" ", "Please enter integer between 0 and 999", "*", indent+4, 110);
        updFrm += make_origvalue_unit(URBAC_USER_AUTO_DELETE, "URBAC_USER_AUTO_DELETE_ORIG");
//	updFrm += make_item_unit(1, termLocTitle[18], REPORT_OUTPUT_DOC_FOLDER, "REPORT_OUTPUT_DOC_FOLDER", "REPORT_OUTPUT_DOC_FOLDER", "", 20, 49, "", "", "*", indent+4, 110, 1);
	
	updFrm += makespace("\t", indent+4) + "</table>\n";
	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
         updFrm += makespace("\t", indent+4) + "</table>\n";
        updFrm += makespace("\t", indent+2) + "</div>\n";

        updFrm += makespace("\t", indent+4) + "<table width=\"100%\" >\n";
	updFrm += makespace("\t", indent+3) + "<td align=\"center\">\n";
	updFrm += makespace("\t", indent+4) + "<table>\n";
        

    updFrm += frmButtRow_HTML(commBtnText["Update"], 1);

	updFrm += makespace("\t", indent+4) + "</table>\n";
	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "</table>\n";

//	updFrm += makespace("\t", indent+2) + "</fieldset>\n";

	//updFrm += makespace("\t", indent+2) + "</div>\n";

	updFrm += makespace("\t", indent+1) + "</form>\n";

	updFrm += makespace("\t", indent) + "</td>\n";
	updFrm += makespace("\t", indent) + "</tr>\n";

	return updFrm;
}


function displayInsertTerminalForm ()
{
	var indent = 1;
	var addFrm = "";

	addFrm += makespace("\t", indent) + backToBtn_HTML();

	addFrm += makespace("\t", indent) + "<tr>\n";
	addFrm += makespace("\t", indent) + "<td>\n";
	addFrm += makespace("\t", indent+1) + "<form name=\"add_termlocs\" method=\"post\" id=\"add_termlocs\" action=\"term_locs.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	addFrm += " <ul id=\"tabmenu\">\n";
	addFrm += "<li>" + otherText["msg_addTmLoc_fSet"] + "</li>\n";
	addFrm += "</ul>\n";
	addFrm += "<div class=\"adminform\">\n";

//	addFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	addFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_addTmLoc_fSet"] + "</strong></legend>\n";

	addFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	addFrm += makespace("\t", indent+4) + "<br>\n";
	addFrm += makespace("\t", indent+4) + otherText["msg_addTmLoc_frmComplt"] +"\n";

	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["insertTerminalSubmit"] + "\">\n";

	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	addFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(1, termLocTitle[1], frm_code, "frm_code", "frm_code", "", 20, 7, "dataType=\"Require\"", otherText["msg_enterTmCode"], "*", indent+4, 110);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(1, termLocTitle[2], frm_name, "frm_name", "frm_name", "", 20, 49, "dataType=\"Require\"", otherText["msg_enterTmName"], "*", indent+4, 110);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(2, termLocTitle[3], frm_address, "frm_address", "frm_address", addresses, 0, 0, "dataType=\"Require\"", otherText["msg_selAaddr"], "*", indent+4, 110);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(1, termLocTitle[4], frm_contact, "frm_contact", "frm_contact", "", 10, 49, "", "", "&nbsp;", indent+4, 110);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	addFrm += makespace("\t", indent+4) + "</table>\n";
	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td align=\"center\">\n";
	addFrm += makespace("\t", indent+4) + "<table>\n";

	addFrm += frmButtRow_HTML(commBtnText["Add"], 1);

	addFrm += makespace("\t", indent+4) + "</table>\n";

	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";
	addFrm += makespace("\t", indent+3) + "</table>\n";

//	addFrm += makespace("\t", indent+2) + "</fieldset>\n";
	addFrm += makespace("\t", indent+2) + "</div>\n";

	addFrm += makespace("\t", indent+1) + "</form>\n";

	addFrm += makespace("\t", indent) + "</td>\n";
	addFrm += makespace("\t", indent) + "</tr>\n";

	return addFrm;
}



function displayDeleteTerminalForm ()
{
	var delFrm = "";


	return delFrm;
}




function displayTerminalAddress ()
{
	var indent = 1;
	var dispFrm = "";

	dispFrm += backToBtnAddr_HTML();

	dispFrm += makespace("\t", indent) + "<tr>\n";
	dispFrm += makespace("\t", indent) + "<td align=\"left\">\n";
	dispFrm += makespace("\t", indent+1) + "<table>\n";
	dispFrm += makespace("\t", indent+1) + "<tr>\n";
	dispFrm += makefield(0, addrTitle[0], term_locs_addr_jstab[0], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 140);
	dispFrm += makespace("\t", indent+1) + "</tr>\n";
	dispFrm += makespace("\t", indent+1) + "</table>\n";
	dispFrm += makespace("\t", indent) + "</td>\n";
	dispFrm += makespace("\t", indent) + "</tr>\n";
	dispFrm += makespace("\t", indent) + "<tr>\n";
	dispFrm += makespace("\t", indent) + "<td align=\"left\">\n";
	dispFrm += makespace("\t", indent+2) + "<div id=\"helparea\">\n";
	dispFrm += makespace("\t", indent+3) + "<table>\n";

	for (var i=1; i<=5; i++)
	{
		dispFrm += makespace("\t", indent+3) + "<tr>\n";
		dispFrm += makefield(0, addrTitle[i], term_locs_addr_jstab[i], "", "", "", 0, 0, "", "", "&nbsp;", indent+3, 140);
		dispFrm += makespace("\t", indent+3) + "</tr>\n";
		dispFrm += "\n";
	}

	dispFrm += makespace("\t", indent+3) + "</table>\n";
	dispFrm += makespace("\t", indent+2) + "</div>\n";
	dispFrm += makespace("\t", indent+1) + "<br>\n";
	dispFrm += makespace("\t", indent) + "</td>\n";
	dispFrm += makespace("\t", indent) + "</tr>\n";

//	dispFrm += backToBtnAddr_HTML();

	return dispFrm;
}




function displayModifyTerminalAddressForm ()
{
	var indent = 1;
	var updFrm = "";

	updFrm += makespace("\t", indent) + "<tr> \n";
	updFrm += makespace("\t", indent) + "<td align=\"center\">\n ";
	updFrm += makespace("\t", indent+1) + "<div class=\"button\">\n";

//	updFrm += makespace("\t", indent+2) + btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);
	updFrm += makespace("\t", indent+2) + btnLocation_HTML("justChaneMyLocation('term_locs.cgi?termCd='+termCd+'&op='+" + opValues["viewAddress"] + "); ", otherText["btn_bakto_tmAddrPg"]);

	updFrm += makespace("\t", indent+1) + "</div><br>\n";
	updFrm += makespace("\t", indent) + "<td>\n ";
	updFrm += makespace("\t", indent) + "</tr> \n";

	var addrFieldSizes = new Array()
	addrFieldSizes[1] = 50;
	addrFieldSizes[2] = 50;
	addrFieldSizes[3] = 50;
	addrFieldSizes[4] = 10;
	addrFieldSizes[5] = 20;

	var addrFieldLens = new Array()
	addrFieldLens[1] = 59;
	addrFieldLens[2] = 59;
	addrFieldLens[3] = 59;
	addrFieldLens[4] = 59;
	addrFieldLens[5] = 59;

	var addrFieldMsgs = new Array()
	addrFieldMsgs[1] = otherText["msg_enterTmAddrLine1"];
	addrFieldMsgs[2] = otherText["msg_enterTmAddrLine2"];
	addrFieldMsgs[3] = otherText["msg_enterTmAddrProvince"];
	addrFieldMsgs[4] = otherText["msg_enterTmAddrZipcode"];
	addrFieldMsgs[5] = otherText["msg_enterTmAddrCountry"];

	var addrFieldNames = new Array()
	addrFieldNames[1] = "frm_1stline";
	addrFieldNames[2] = "frm_2ndline";
	addrFieldNames[3] = "frm_province";
	addrFieldNames[4] = "frm_postcode";
	addrFieldNames[5] = "frm_country";

	term_locs_addr_jstab[1] = frm_1stline;
	term_locs_addr_jstab[2] = frm_2ndline;
	term_locs_addr_jstab[3] = frm_province;
	term_locs_addr_jstab[4] = frm_postcode;
	term_locs_addr_jstab[5] = frm_country;

	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td align=\"left\">\n";
	updFrm += makespace("\t", indent+1) + "<table>\n";
	updFrm += makespace("\t", indent+1) + "<tr>\n";

	updFrm += makefield(0, addrTitle[0], term_locs_addr_jstab[0], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 140);

	updFrm += makespace("\t", indent+1) + "</tr>\n";
	updFrm += makespace("\t", indent+1) + "</table>\n";
	updFrm += makespace("\t", indent) + "</td>\n";
	updFrm += makespace("\t", indent) + "</tr>\n";


	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td>\n";
	
//	updFrm += makespace("\t", indent+1) + "<div id=\"printReady\">\n";  /* Start of Print Area */

	updFrm += makespace("\t", indent+2) + "<form name=\"edit_address\" method=\"post\" id=\"edit_address\" action=\"term_locs.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + otherText["msg_updTmAddr_fSet"] + "</li>\n";
	updFrm += "</ul>\n";
	updFrm += "<div class=\"adminform\">\n";

//	updFrm += makespace("\t", indent+3) + "<fieldset>\n";
//	updFrm += makespace("\t", indent+4) + "<legend class=\"infotext\"><strong>" + otherText["msg_updTmAddr_fSet"] + "</strong></legend>\n";

	updFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makespace("\t", indent+4) + "<td class=\"infotext\">\n";
	updFrm += makespace("\t", indent+5) + "<br>\n";
	updFrm += makespace("\t", indent+5) + otherText["msg_updTmAddr_frmComplt"] + "\n";

	updFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
	updFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyAddressSubmit"] + "\">\n";
	updFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"frm_addrcode\" id=\"frm_addrcode\" value=\"" + term_locs_addr_jstab[0] + "\">\n";

	updFrm += makespace("\t", indent+4) + "</td>\n";
	updFrm += makespace("\t", indent+4) + "</tr>\n";
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makespace("\t", indent+4) + "<td width=\"100%\">\n";

	
	updFrm += makespace("\t", indent+5) + "<table width=\"100%\">\n";

	for (var i=1; i<=5; i++)
	{
		updFrm += makespace("\t", indent+5) + "<tr>\n";

//		updFrm += makefield(1, addrTitle[i], term_locs_addr_jstab[i], addrFieldNames[i], addrFieldNames[i], "", addrFieldSizes[i], addrFieldLens[i], "dataType=\"Require\"", addrFieldMsgs[i], "*", indent+5, 110)
		updFrm += makefield(1, addrTitle[i], term_locs_addr_jstab[i], addrFieldNames[i], addrFieldNames[i], "", addrFieldSizes[i], addrFieldLens[i], "", "", "&nbsp;", indent+5, 110)

		updFrm += makespace("\t", indent+5) + "</tr>\n";
		updFrm += makespace("\t", indent+5) + "\n";
	}

	updFrm += makespace("\t", indent+5) + "</table>\n";
	
	updFrm += makespace("\t", indent+4) + "</td>\n";
	updFrm += makespace("\t", indent+4) + "</tr>\n";
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makespace("\t", indent+4) + "<td align=\"center\">\n";
	
	updFrm += makespace("\t", indent+5) + "<table>\n";
    
	updFrm += frmButtRow_HTML(commBtnText["Update"], 1);

	updFrm += makespace("\t", indent+5) + "</table>\n";
	updFrm += makespace("\t", indent+4) + "</td>\n";
	updFrm += makespace("\t", indent+4) + "</tr>\n";
	updFrm += makespace("\t", indent+4) + "</table>\n";
	updFrm += makespace("\t", indent+4) + "\n";
//	updFrm += makespace("\t", indent+3) + "</fieldset>\n";
	updFrm += makespace("\t", indent+1) + "</div>\n";  /* End of Print Area */
	updFrm += makespace("\t", indent+3) + "\n";
	updFrm += makespace("\t", indent+2) + "</form>\n";

//	updFrm += makespace("\t", indent+1) + "</div>\n";  /* End of Print Area */

	updFrm += makespace("\t", indent) + "</td>\n";
	updFrm += makespace("\t", indent) + "</tr>\n";

	return updFrm;
}



function displayInsertTerminalAddressForm ()
{
	var indent = 1;
	var addFrm = "";

	addFrm += makespace("\t", indent) + "<tr> \n";
	addFrm += makespace("\t", indent) + "<td align=\"center\">\n ";
	addFrm += makespace("\t", indent+1) + "<div class=\"button\">\n";

//	addFrm += makespace("\t", indent+2) + btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

	if (prevOp == opValues["insertTerminalForm"])
	{
		addFrm += makespace("\t", indent+2) + btnLocation_HTML("justChaneMyLocation('term_locs.cgi?termCd='+termCd+'&op='+" + prevOp + "); ", otherText["btn_bakto_tmLocsAdd"]);
	}
	if (prevOp == opValues["modifyTerminalForm"])
	{
		addFrm += makespace("\t", indent+2) + btnLocation_HTML("justChaneMyLocation('term_locs.cgi?termCd='+termCd+'&op='+" + prevOp + "); ", otherText["btn_bakto_tmLocsUpd"]);
	}

	addFrm += makespace("\t", indent+1) + "</div><br>\n";
	addFrm += makespace("\t", indent) + "<td>\n ";
	addFrm += makespace("\t", indent) + "</tr> \n";

	var addrFieldSizes = new Array()
	addrFieldSizes[0] = 50;
	addrFieldSizes[1] = 50;
	addrFieldSizes[2] = 50;
	addrFieldSizes[3] = 50;
	addrFieldSizes[4] = 10;
	addrFieldSizes[5] = 20;

	var addrFieldLens = new Array()
	addrFieldLens[0] = 19;
	addrFieldLens[1] = 59;
	addrFieldLens[2] = 59;
	addrFieldLens[3] = 59;
	addrFieldLens[4] = 59;
	addrFieldLens[5] = 59;

	var addrFieldMsgs = new Array()
	addrFieldMsgs[0] = otherText["msg_enterTmAddrCode"];
	addrFieldMsgs[1] = otherText["msg_enterTmAddrLine1"];
	addrFieldMsgs[2] = otherText["msg_enterTmAddrLine2"];
	addrFieldMsgs[3] = otherText["msg_enterTmAddrProvince"];
	addrFieldMsgs[4] = otherText["msg_enterTmAddrZipcode"];
	addrFieldMsgs[5] = otherText["msg_enterTmAddrCountry"];

	var addrFieldNames = new Array()
	addrFieldNames[0] = "frm_addrcode";
	addrFieldNames[1] = "frm_1stline";
	addrFieldNames[2] = "frm_2ndline";
	addrFieldNames[3] = "frm_province";
	addrFieldNames[4] = "frm_postcode";
	addrFieldNames[5] = "frm_country";

	term_locs_addr_jstab[0] = frm_addrcode;
	term_locs_addr_jstab[1] = frm_1stline;
	term_locs_addr_jstab[2] = frm_2ndline;
	term_locs_addr_jstab[3] = frm_province;
	term_locs_addr_jstab[4] = frm_postcode;
	term_locs_addr_jstab[5] = frm_country;


	addFrm += makespace("\t", indent) + "<tr>\n";
	addFrm += makespace("\t", indent) + "<td>\n";
	
//	addFrm += makespace("\t", indent+1) + "<div id=\"printReady\">\n";  /* Start of Print Area */

	addFrm += makespace("\t", indent+2) + "<form name=\"add_address\" method=\"post\" id=\"add_address\" action=\"term_locs.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	addFrm += " <ul id=\"tabmenu\">\n";
	addFrm += "<li>" + otherText["msg_addTmAddr_fSet"] + "</li>\n";
	addFrm += "</ul>\n";
	addFrm += "<div class=\"adminform\">\n";

//	addFrm += makespace("\t", indent+3) + "<fieldset>\n";
//	addFrm += makespace("\t", indent+4) + "<legend class=\"infotext\"><strong>" + otherText["msg_addTmAddr_fSet"] + "</strong></legend>\n";

	addFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makespace("\t", indent+4) + "<td class=\"infotext\">\n";
	addFrm += makespace("\t", indent+5) + "<br>\n";
	addFrm += makespace("\t", indent+5) + otherText["msg_addTmAddr_frmComplt"] + "\n";

	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["insertAddressSubmit"] + "\">\n";
	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prevOp\" id=\"prevOp\" value=\"" + prevOp + "\">\n";

	addFrm += makespace("\t", indent+4) + "</td>\n";
	addFrm += makespace("\t", indent+4) + "</tr>\n";
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makespace("\t", indent+4) + "<td width=\"100%\">\n";

	
	addFrm += makespace("\t", indent+5) + "<table width=\"100%\">\n";

	for (var i=0; i<=5; i++)
	{
		addFrm += makespace("\t", indent+5) + "<tr>\n";

		term_locs_addr_jstab[i] = "";		
		if (i == 0)
		{
			addFrm += makefield(1, addrTitle[i], term_locs_addr_jstab[i], addrFieldNames[i], addrFieldNames[i], "", addrFieldSizes[i], addrFieldLens[i], "dataType=\"Require\"", addrFieldMsgs[i], "*", indent+5, 110)
		}
			else
		{
			addFrm += makefield(1, addrTitle[i], term_locs_addr_jstab[i], addrFieldNames[i], addrFieldNames[i], "", addrFieldSizes[i], addrFieldLens[i], "", "", "&nbsp;", indent+5, 110)
		}

		addFrm += makespace("\t", indent+5) + "</tr>\n";
		addFrm += makespace("\t", indent+5) + "\n";
	}

	addFrm += makespace("\t", indent+5) + "</table>\n";
	
	addFrm += makespace("\t", indent+4) + "</td>\n";
	addFrm += makespace("\t", indent+4) + "</tr>\n";
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makespace("\t", indent+4) + "<td align=\"center\">\n";
	addFrm += makespace("\t", indent+5) + "<table>\n";

	addFrm += frmButtRow_HTML(commBtnText["Add"], 1);

	addFrm += makespace("\t", indent+5) + "</table>\n";
	addFrm += makespace("\t", indent+4) + "</td>\n";
	addFrm += makespace("\t", indent+4) + "</tr>\n";
	addFrm += makespace("\t", indent+4) + "</table>\n";
	
	addFrm += makespace("\t", indent+4) + "\n";
//	addFrm += makespace("\t", indent+3) + "</fieldset>\n";
	addFrm += makespace("\t", indent+1) + "</div>\n";  /* End of Print Area */

	addFrm += makespace("\t", indent+3) + "\n";
	addFrm += makespace("\t", indent+2) + "</form>\n";

//	addFrm += makespace("\t", indent+1) + "</div>\n";  /* End of Print Area */

	addFrm += makespace("\t", indent) + "</td>\n";
	addFrm += makespace("\t", indent) + "</tr>\n";

	return addFrm;
}










function assArray_keys(inputArr)
{
	var keys = new Array();

	for (var i in inputArr) 
	{
		if (inputArr[i] != null) 
		{
			keys.push(i);
		}
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
   fieldHTML += "<input name=\"op\" id=\"op\" value=\""+attr+"\" type=\"hidden\">\n";
   return fieldHTML;
}



function preqstr_field ()
{
	var fieldHTML ="";

	fieldHTML += "<input name=\"preqstr\" id=\"preqstr\" value=\"\" type=\"hidden\">\n";

	return fieldHTML;
}



function terminal_field(attr)
{
  var fieldHTML ="";
  fieldHTML += "<input name=\"termCd\" id=\"termCd\" value=\""+termCd+"\" "+attr+" >\n";
  return fieldHTML;
}



function backToBtn_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	if (priv >= 7)
	{
		if ( op == opValues["insertTerminalForm"] || op == opValues["insertTerminalSubmit"] )
		{
			btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('term_locs.cgi?prevOp=" + opValues["insertTerminalForm"] + "&op=" + opValues["insertAddressForm"] + "&termCd='+termCd); ", otherText["btn_addNew_tmAddr"]);
		}
		if ( op == opValues["modifyTerminalForm"] || op == opValues["modifyTerminalSubmit"] )
		{
			btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('term_locs.cgi?prevOp=" + opValues["modifyTerminalForm"] + "&op=" + opValues["insertAddressForm"] + "&termCd='+termCd); ", otherText["btn_addNew_tmAddr"]);
		}
	}

	btn_HTML += btnLocation_HTML("justChaneMyLocation('term_locs.cgi?termCd='+termCd); ", otherText["btn_bakto_tmLocsPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}




function backToBtnAddr_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	if (priv >= 6 && (op == opValues["viewAddress"] || op == opValues["modifyAddressForm"] || op == opValues["modifyAddressSubmit"]) )
	{
		btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('term_locs.cgi?op=" + opValues["modifyAddressForm"] + "&termCd='+termCd); ", commBtnText["Modify"]);
	}

//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

	btn_HTML += btnLocation_HTML("justChaneMyLocation('term_locs.cgi?termCd='+termCd); ", otherText["btn_bakto_tmLocsPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function addNewBtn_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "		<tr>\n"; 
	btn_HTML += "			<td align=\"center\">\n";
	btn_HTML += "				<div class=\"button\">\n";

	if(priv>=7)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('term_locs.cgi?op=" + opValues["insertTerminalForm"] + "'); ", otherText["btn_addNew_tmLocs"]);
	}

//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

	btn_HTML += "				</div><br>\n";
	btn_HTML += "			</td>\n";
	btn_HTML += "		</tr>\n";


	return btn_HTML;
}



function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	if (op <= 1)
	{
		pageHeading +=otherText["pgHead_tmLocs"];
	}

	if(op == opValues["viewAddress"])
	{
		pageHeading +=otherText["pgHead_tmAddr"];
	}

	if(op == opValues["modifyTerminalForm"] || op == opValues["modifyTerminalSubmit"])
	{
		pageHeading +=otherText["pgHead_tmLocsUpd"];
	}
	if(op == opValues["insertTerminalForm"] || op == opValues["insertTerminalSubmit"])
	{
		pageHeading +=otherText["pgHead_tmLocsAdd"];
	}
	if(op == opValues["deleteTerminalForm"] || op == opValues["deleteTerminalSubmit"])
	{
		pageHeading +=otherText["pgHead_tmLocsDel"];
	}
	if(op == opValues["modifyAddressForm"] || op == opValues["modifyAddressSubmit"])
	{
		pageHeading +=otherText["pgHead_tmAddrUpd"];
	}
	if(op == opValues["insertAddressForm"] || op == opValues["insertAddressSubmit"])
	{
		pageHeading +=otherText["pgHead_tmAddrAdd"];
	}

	return pageHeading; 
}



function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	if (op <= 1)
	{
		pageTitle += otherText["pgTitle_tmLocs"];
	}

	if(op == opValues["viewAddress"])
	{
		pageTitle +=otherText["pgTitle_tmAddr"];
	}

	if(op == opValues["modifyTerminalForm"] || op == opValues["modifyTerminalSubmit"])
	{
		pageTitle +=otherText["pgTitle_tmLocsUpd"];
	}
	if(op == opValues["insertTerminalForm"] || op == opValues["insertTerminalSubmit"])
	{
		pageTitle +=otherText["pgTitle_tmLocsAdd"];
	}
	if(op == opValues["deleteTerminalForm"] || op == opValues["deleteTerminalSubmit"])
	{
		pageTitle +=otherText["pgTitle_tmLocsDel"];
	}
	if(op == opValues["modifyAddressForm"] || op == opValues["modifyAddressSubmit"])
	{
		pageTitle +=otherText["pgTitle_tmAddrUpd"];
	}
	if(op == opValues["insertAddressForm"] || op == opValues["insertAddressSubmit"])
	{
		pageTitle +=otherText["pgTitle_tmAddrAdd"];
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
	var op_list = "";
	op_list += "<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+accNum+"', '"+frmNum+"');\">          ";

	switch (priv)
	{
		case 8:
			op_list += "<option value=\"" + opValues["deleteTerminalSubmit"] + "\">" + commText["Delete"] + "</option>";

		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

		case 6:     
			op_list += "<option value=\"" + opValues["modifyTerminalForm"] + "\">" + commText["Modify"] + "</option>";

		case 5:			/* Find Has not been implemented yet*/
			op_list += "<option value=\"" + opValues["viewAddress"] + "\">" + otherText["tmAddress"] + "</option>";
			break;
	}
  
	op_list += "<option value=0 selected>--\t" + otherText["youraction"] + "\t--</option>";
	op_list += "</select>                                        ";
	
	return op_list ;
}





function local_HeadrHTML( newPage )
{
	newPage += "<SCRIPT LANGUAGE=\"JavaScript\">\n";

	newPage += "/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
	newPage += "FUNCTION [ submitmyform] \n";
	newPage += "[PURPOSE]  		-> 	Always use this method to submit a form,\n";
	newPage += "					gives me the flexbility of doing validation\n";
	newPage += "					and addition if required before i submit the form\n";
	newPage += "          \n";
	newPage += "[Parameter]  	-> myobject FORM OBJECT Parameter is the form need to be submit\n";
	newPage += "[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
	newPage += "'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
	newPage += "function submitmyform(myobject)\n";
	newPage += "{\n";
	newPage += "	//var myHiddenOb;\n";
	newPage += "	\n";
	newPage += "	//myHiddenOb = getElemRefs(\"prev_qstring\";\n";
	newPage += "	//myHiddenOb.value=produceQString(;\n";
	newPage += "	//return formcheck(myobject;\n";
	newPage += "	return Validator.Validate(myobject,1);\n";
	newPage += "}\n";
	
	newPage += "/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
	newPage += "[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
	newPage += "'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
	newPage += "function submitAction(myobject, accNum, frmNum)\n";
	newPage += "{\n";
	newPage += "	var myCurQstring=produceQString();\n";
	newPage += "	var myselectedvalue = myobject.options[myobject.selectedIndex].value;";

	newPage += "	if(myselectedvalue==\"" + opValues["deleteTerminalSubmit"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(confirm('" + otherText["msg_del_confirm"] + "'))\n";
	newPage += "		{\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["deleteTerminalSubmit"] + "+\"';\");\n";

	newPage += "			eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "			return true;\n";
	newPage += "		}\n";
	newPage += "		eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
  	newPage += "	}\n";
	newPage += "	else\n";
	newPage += "	{\n";
	newPage += "		eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "		return true;\n";
	newPage += "	}\n";
	newPage += "}\n";

	newPage += "</script>\n";
	newPage += "\n";
	newPage += "</head>\n";
	newPage += "\n";
	newPage += "<body>\n";
	newPage += "\n";

	return (newPage);
}

