// @(#) $Id: prod_movement_phpwrapper.js,v 1.1 2015/08/04 08:01:14 cw Exp $";

// op codes returned after database ops in the CGI are incremented by 20 to indicate a failure
// ****
// op 1   -> View product movements
// op 102 -> View Add product movement form
// op 103 -> View details form
// op 107 -> View proportional ownership
// op 108 -> iframe for product movement progress
// ****
// op 202 -> Add a product movement record to the database
// op 203 -> Delete a product movement record from the database
// op 206 -> Start a product movement
// op 207 -> Halt a product movement
// op 208 -> Complete a product movement
// op 9 -> Complete a batch for product movement(s)
// ****
// op 702 -> Add an ownership record (company and pmv number)
// op 703 -> Delete an ownership record (company and pmv number)
// op 704 -> Modify an ownership record (Proportion)
// ****
// op 999 -> Indicate lack of authority fail condition in CGI


	var pmvScale = [
		"Ltr", "Kg"
		];

	// ******* Form column titles
	var pmvColumns = [
		"ID", "Source", "Destination", "Product", "Batch", "State"
		];

	var pmvAddColumns = [
		"Product", "Batch Code", "Source Type", "Unit", "Destination Type", 
		"Unit", "Duty", "Class",
		"Quantity", "Initial Standard Volume", "Density"
		];

	var pmvDetsColumns = [
		"Movement No", "Class", "Status", 
		"Quantity", "Batch Code", "Product", "Duty",
		"Source Type", "Source Unit", "Destination Type", "Destination Unit",
		"Opening Standard Volume", "Density", "Progress"
		];

	var pmvOwnColumns = [
		"Company", "Proportion", "Percent", "Quantity"
		];

	var headingsTxt = new Array();
		headingsTxt["pgHead_pmv"] = "product movements";
		headingsTxt["pgHead_pmvOwn"] = "proportional ownership";

	var buttonsTxt = new Array();
		buttonsTxt["addOwner"] = "Add Owner";
		buttonsTxt["newPMV"] = "Add";
		buttonsTxt["Back"] = "Back";
		buttonsTxt["Start"] = "Start";
		buttonsTxt["Halt"] = "Halt";
		buttonsTxt["Complete"] = "Complete";
		buttonsTxt["backToMain"] = "Back To Previous";
		buttonsTxt["productMovementDetails"] = "Details";

	var alertMsgs = new Array();
		alertMsgs["START_FAIL"] = "Could not Start Product Movement!";
		alertMsgs["START_FAIL2"] = "Movement is automatic -  controlled via a process - and cannot be started!";
		alertMsgs["START_FAIL3"] = "A movement is already in progress for an associated tank!";
		alertMsgs["HALT_FAIL"] = "Could not Halt Product Movement!";
		alertMsgs["ADD_FAIL"] = "Could not Add Product Movement!";
		alertMsgs["COMPLETE_FAIL"] = "Could not Complete Product Movement!";
		alertMsgs["ALREADY_COMPLETED"] = "This Batch is already completed!";
		alertMsgs["BATCH_COMPLETED"] =  "Batch Successfully Completed";
		alertMsgs["BATCH_COMPLETE_FAIL"] = 
			"Batch Could not Complete Due to Some Product Movement is not in COMPLETE!";

		alertMsgs["WRONG_AUTH"] = "Insufficient authority for operation!";
		alertMsgs["NOT_STARTABLE"] = "Movement not initially started via screen.";

	var otherText = new Array();
		otherText["youraction"] =  "YOUR ACTION";
		otherText["RATIOS"] =  "Ratios";
		otherText["ADD"] =  "Add";
		otherText["DELETE"] =  "Delete";
		otherText["BATCH_COMPLETE"] =  "Batch_Complete";
		otherText["msg_valid_b_complete_f"] =  
			"Cannot complete for this Batch because there is Product Movement Status NOT in COMPLETE";
		otherText["msg_valid_b_complete_s"] =  "Are You Sure?";
		otherText["DETAILS"] =  "Details";
		otherText["MODIFY"] =  "Modify";
		otherText["msg_addNewPMV_details"] =  "New Product Movement Details";
		otherText["msg_PMV_details"] =  "Product Movement Details";
		otherText["msg_addNewPMV_instructions"] = "Complete and submit this form to save new details, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
		otherText["msg_valid_srcdst"] =  "Source and/or Destination MUST BE a Tank and specified";
		otherText["msg_selAProd"] =  "Select a Product";
		otherText["msg_selASrc"] =   "Select a Type";
		otherText["msg_selADst"] =   "Select a Type";
		otherText["msg_selUnit"] =   "Select a Unit";
		otherText["msg_selDept"] =   "Select a Depot";
		otherText["msg_selADuty"] =  "Specify Duty";
		otherText["msg_selACat"] =   "Select a Class";
		otherText["msg_specOQ"] =   "Specify Tank Opening volume (Litres)";
		otherText["msg_specOD"] =   "Specify Product Density";
		otherText["msg_fillBatch"] =  "Provide a Batch Code";
		otherText["msg_IntendedQty"] =  "Anticipated Quantity";
		otherText["selec_depot"] = "Select a depot To view Product Movements";
		otherText["dept_info"] =  "depot information";
		otherText["dept"] =  "Terminal";
		otherText["pmv_detType"] =  "Movement Details Type";
		otherText["autoStr"] =  "Automatic";
		otherText["manualStr"] =  "Manual";
		otherText["msg_Unit_density"] =  "Kg/m3";

    otherText["msg_valid_pgNumber"] = "Enter Valid Page Number";
    otherText["msg_tot_pages"] = "Total Pages";
    var items_per_page = 10;	
/*
 * g_opInf Hash table defined in utility.js
 * for notifying the user about success or failure
 * of an action performed on that page.
 * l_opInf defined locally.
 *
 */
  var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[23]= "Successfully Inserted A New Record !"; // insert a new  sub equip Type
    l_opInf[33]= "Insert new record Failed!";
    l_opInf[25]= "Successfully Deleted!";
    l_opInf[35]= "Deleted Failed!";
    l_opInf[28]= "Successfully Deleted!";
    l_opInf[38]= "Deleted Failed!";
    l_opInf[133]= "DB Insert Failed!";
    l_opInf[135]= "DB Delete Failed!";
    l_opInf[138]= "DB Delete Failed!";
    l_opInf[19]= "Batch Already Completed !";
    l_opInf[29]= "Batch Successfully Completed!";
    l_opInf[39]= "Batch Completation Failed!";
var ops_req_print = [-1,0,1, 23, 33, 25, 35, 28, 38];
var ops_req_search =[-1,0,1, 23, 33, 25, 35, 28, 38];
/*
 * drpListtyp array defines what src and receiver type
 * requires the drop list and which 1s require
 * input type text type.
 *
 */
    var drpListtyp = [3];
    var intervalID;

/*============================================================================*/
function
printDepotChoiceForm()
{
	var glblFrm = "";
	//alert("printDepotChoiceForm()");
	glblFrm += "<tr>\n";
	glblFrm += "<td align=\"left\">\n";
	glblFrm += "<form name=\"glblFrm\" id=\"glblFrm\">\n";
	glblFrm += "<input type=\"hidden\" name=\"op\" value=\"1\">\n";
	glblFrm += "<input type=\"hidden\" name=\"pg\" value=\"1\">\n";
	glblFrm += " <ul id=\"tabmenu\">\n";
	glblFrm += "<li>"+otherText["dept_info"]+"</li>\n";
  glblFrm += "</ul>\n";
	glblFrm += "<div class=\"adminform\">\n";
	glblFrm +=otherText["selec_depot"]+"\n";
	glblFrm += " <table>\n";
	glblFrm += "   <tr>\n";
	glblFrm += "       <td class=\"infotextheading\">\n";
	glblFrm += otherText["dept"]+":\n";
	glblFrm += "    </td>\n";
	glblFrm += "    <td>\n";
	glblFrm += "    <select id=\"pmvDepot\" name=\"pmvDepot\" onchange=\"submit();\"> \n";
	glblFrm += displayDropList(pmvDepot, terminal,otherText["msg_selDept"]);
	glblFrm += "    </td>\n";

	glblFrm += "   </tr>\n";
	glblFrm += " </table>\n";
	glblFrm += "\n";
	glblFrm += "</div>\n";
	glblFrm += "</form>\n";
	glblFrm += "</td>\n";
	glblFrm += "</tr>\n";
	//document.write(glblFrm);
	return glblFrm;
}

/*============================================================================*/
function obs(data)
{
	return data;
}
/*============================================================================*/
function
addOwnerButton()
{
	var btn_HTML = "";
	if(priv >= 7)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('prod_movement.php?op=702'); ",
				buttonsTxt["addOwner"]);
	}
	return btn_HTML;
}
/*============================================================================*/
// function validates at least one of
// the src or destination type is Tank
function
validateAndSubmit(myobject)
{
	var tankTypeNum = 3;
	//alert( "validateAndSubmit " + h_PMV_UNITTYPE_jslst[1] );

	var myselectsrc = document.addNew.src.options[document.addNew.src.selectedIndex].value;
	var myselectdst = document.addNew.dst.options[document.addNew.dst.selectedIndex].value;
	//alert( "validateAndSubmit myselectsrc is " + myselectsrc );
	//alert( "validateAndSubmit myselectdst is " + myselectdst );
	if(submitmyform(myobject)
		&& (myselectsrc == tankTypeNum || myselectdst == tankTypeNum))
	{
		document.addNew.submit();
		return true;
	}
	else
	{
		if( myselectsrc != tankTypeNum && myselectdst != tankTypeNum)
		{
			alert(otherText["msg_valid_srcdst"]);
		}
		return false;
	}
}
/*============================================================================*/
function
startProductMovementButton()
{
	var btn_HTML = "";
	var t = "justChaneMyLocation('prod_movement.php?op=206&h_PMV_NUMBER=";
	t += h_PMV_NUMBER +"&pmvDepot="+pmvDepot+"'); ";
	btn_HTML += btnLocation_HTML(t, buttonsTxt["Start"]);
	return btn_HTML;
}
/*============================================================================*/
function
haltProductMovementButton()
{
	var btn_HTML = "";
	var t = "justChaneMyLocation('prod_movement.php?op=207&h_PMV_NUMBER=";
	t += h_PMV_NUMBER +"&pmvDepot="+pmvDepot+"'); ";
	btn_HTML += btnLocation_HTML(t, buttonsTxt["Halt"]);
	return btn_HTML;
}
/*============================================================================*/
function
completeProductMovementButton()
{
	var btn_HTML = "";
	var t = "justChaneMyLocation('prod_movement.php?op=208&h_PMV_NUMBER=";
	t += h_PMV_NUMBER +"&pmvDepot="+pmvDepot+"'); ";
	btn_HTML += btnLocation_HTML(t, buttonsTxt["Complete"]);
	return btn_HTML;
}
/*============================================================================*/
function
addBackButton()
{
	var btn_HTML = "";
	btn_HTML += btnLocation_HTML("justChaneMyLocation('prod_movement.php?op=1'); ",
			buttonsTxt["Back"]);
	return btn_HTML;
}
/*============================================================================*/
function
backToTerminalChoicesBtn_HTML()
{
	var btn_HTML = "";

	btn_HTML += btnLocation_HTML("justChaneMyLocation('prod_movement.php?op=-1'); ",
			 buttonsTxt["Back"]);
	//btn_HTML += btnLocation_HTML("void(printSpecial()) ", commText["Print"]);			 
	return btn_HTML;
}
/*============================================================================*/
function
backToBtn_HTML()
{
	var btn_HTML = "";
	var args = "justChaneMyLocation('prod_movement.php?op=1&pmvDepot=";
	args += pmvDepot + "'); ";

	btn_HTML +="         <tr> \n";
	btn_HTML +="             <td align=\"center\">\n ";
	btn_HTML +="                                 <div class=\"button\">\n";

	btn_HTML += btnLocation_HTML(args, buttonsTxt["backToMain"]);

	btn_HTML +="                                 </div><br>\n";
	btn_HTML +="             <td>\n ";
	btn_HTML +="         </tr> \n";
	return btn_HTML;
}
/*============================================================================*/
function
addProductMovementButton ()
{
	var btn_HTML = "";

	var args = "justChaneMyLocation('prod_movement.php?op=102&pmvDepot=";
	args += pmvDepot + "'); ";
	if(priv >= 7)
	{
		btn_HTML += btnLocation_HTML(args, buttonsTxt["newPMV"]);
	}
	return btn_HTML;
}
/*============================================================================*/
function
preqstr_field ()
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"preqstr\" id=\"preqstr\" value=\"\" type=\"hidden\">\n";
	return fieldHTML;
}
/*============================================================================*/
function
pmvView_ops(priv, frmNum)
{
	/* priv =
	   6 modify        op=1,2,3
	   7 add           op=4
	   8 delete        op=5
	   6 batch complete        op=9
	 */
	var ops_list ="";
	ops_list += "<select name=\"op\" id=\"op\"";
	ops_list += " onchange=\"submitAction(this, '" +frmNum+ "');\">          ";
	//alert("ops_list - priv is " + priv);
	switch (priv)
	{
		case 8: // only show delete option if state is NEW
			//alert("frmNum is " + frmNum + " prod_movement_tab[frmNum][5] is " + prod_movement_tab[frmNum][5]);
			if( prod_movement_tab[frmNum][5] == h_PMV_STATUS_jslist[1][1] )
			{
				ops_list += "<option value=\"203\">";
				ops_list += otherText["DELETE"] + "</option>";
			}
			/* fall thru */
		case 7: // view the proportional ownerships
			//ops_list += "<option value=\"107\">";
			//ops_list += otherText["RATIOS"] + "</option>";
			/* ADD a new product movement:  */
			/* (1) A new batch code   or  */
			/* (2) The batch code is exist, but the batch does not complete  */ 
			/*   < TBD>   */
		case 6: // view the product movements details
			ops_list += "<option value=\"103\">";
			ops_list += otherText["DETAILS"] + "</option>";
		// only show delete and batch complete options if state is NEW or,
		// show batch complete option if state is COMPLETE
			//alert("frmNum is " + frmNum + " prod_movement_tab[frmNum][5] is " + prod_movement_tab[frmNum][5]);
	/* h_PMV_STATUS_jslist[1][1] is NEW status 			*/
	/* h_PMV_STATUS_jslist[3][1] is HALTED status 			*/
	/* Only can do batch complete when PMV is COMPLETE status for now.  */	
			if( prod_movement_tab[frmNum][5] == h_PMV_STATUS_jslist[4][1] ) 
			{
				ops_list += "<option value=\"9\">";
				ops_list += otherText["BATCH_COMPLETE"] + "</option>";
			}

			break;
	}
	ops_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
	ops_list +="</select>                                        ";
	return ops_list ;
}
/*============================================================================*/
function
pmvRatios_ops(priv, frmNum)
{
	/* priv =
	   6 modify        op=1,2,3
	   7 add           op=4
	   8 delete        op=5
	 */
	var ops_list ="";
	ops_list += "<select name=\"op\" id=\"op\"";
	ops_list += " onchange=\"submitAction(this, '" +frmNum+ "');\">          ";
	//alert("ops_list - priv is " + priv);
	switch (priv)
	{
		case 8:
			ops_list += "<option value=\"703\">";
			ops_list += otherText["DELETE"] + "</option>";
			/* fall thru */
		case 7: // fall thru
		case 6:
			ops_list += "<option value=\"704\">";
			ops_list += otherText["MODIFY"] + "</option>";
			break;
	}
	ops_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
	ops_list +="</select>                                        ";
	return ops_list ;
}
/*============================================================================*/
function
viewRatiosBody( curAuth )
{
	var bdyLines = "";

	//alert("prod_movment.js::viewRatiosBody");
	bdyLines += "<tr> \n";
	bdyLines += "<td align=\"center\">\n ";
	bdyLines += "<div class=\"button\">\n";
	bdyLines += addOwnerButton();
	bdyLines += nbsp;
	bdyLines += addBackButton();
	bdyLines += "</div>\n";
	bdyLines += "</td>\n ";
	bdyLines += "</tr> \n";
	bdyLines += displayStatusMsg (op);
	bdyLines += "<tr> \n";
	bdyLines += "<td>\n ";
	if( ((pmvOwnColumns.length)> 0))
	{

		bdyLines += table_begin("M", 0,"");
		bdyLines += "<tbody> \n";
		bdyLines += "<tr>";
		for(var i=0; i<pmvOwnColumns.length; i++)
		{
			bdyLines += "<td>"+pmvOwnColumns[i]+"<\/td>";
		}
		bdyLines += "<\/tr>";
	}
	for( i in pmv_ratios_tab)
	{
		if( i > 0)
		{
			bdyLines += "<tr class=\"row1\">\n";
			for(var j = 0; j < pmvOwnColumns.length; ++j )
			{
				bdyLines += "<td>\n";
				if( j == 0 )
				{
					bdyLines += "<form name=\"select_action_"+i;
					bdyLines += "\" id=\"select_action_"+i+"\" >\n";
					bdyLines += "<table border=\"0\">\n";
					bdyLines += "<tr>\n";
					bdyLines += "<td width=\"50%\"> <span style=\"COLOR: #FF0000 ;\">";
					bdyLines +=         obs(pmv_ratios_tab[i][j])+"</span>\n";
					bdyLines += " <input type=\"hidden\" name=\"h_PMV_NUMBER\"";
					bdyLines += " id=\"h_PMV_NUMBER\"";
					bdyLines += " value=\""+ pmv_ratios_tab[i][j] +"\">\n";
					bdyLines += " <input type=\"hidden\" name=\"pg\" id=\"pg\"";
					bdyLines += " value=\""+pg+"\">\n";
					bdyLines +=   preqstr_field ();
					bdyLines += "</td>\n";
					bdyLines += "<td width=\"50%\">\n";
					bdyLines += pmvRatios_ops(curAuth,i );
					bdyLines += "</td>\n";
					bdyLines += "</tr>\n";
					bdyLines += "</table>\n";
					bdyLines += "</form>\n";
				}
				else
				{
					bdyLines += obs(pmv_ratios_tab[i] [j]) + "<\/td>";
				}
				bdyLines += "</td>\n";
			}
		}
	}
	return( bdyLines );
}
/*============================================================================*/
function
viewPmvPageBody( curAuth )
{
	var bdyLines = "";

	//alert("prod_movment.js::viewPmvPageBody");
	bdyLines += "<tr> \n";
	bdyLines += "<td align=\"center\">\n ";
	bdyLines += "<div class=\"button\">\n";
	bdyLines += addProductMovementButton();
	bdyLines += "  &nbsp;&nbsp\n";
	bdyLines += backToTerminalChoicesBtn_HTML();
	//bdyLines += productMovementDetailsButton();
	bdyLines += "</div>\n";
	bdyLines += "<br>\n";
	bdyLines += "<td>\n ";
	bdyLines += "</tr> \n";
	bdyLines += displayStatusMsg (op);
	bdyLines += "<tr> \n";
	bdyLines += "<td>\n ";
	if( ((pmvColumns.length)> 0))
	{
		bdyLines += "<div id=\"printReady\">"; 
		bdyLines += table_begin("M", 1,"");
		bdyLines += "<tbody> \n";
		bdyLines += "<tr>";
		for(var i=0; i<pmvColumns.length; i++)
		{
			bdyLines += "<td>"+pmvColumns[i]+"<\/td>";
		}
		bdyLines += "<\/tr>";
	}
	for( i in prod_movement_tab)
	{
		if( i > 0)
		{
			bdyLines += "<tr class=\"row1\">\n";
			for(var j = 0; j < pmvColumns.length; ++j )
			{
				bdyLines += "<td>\n";
				if( j == 0 )
				{
					bdyLines += "<form name=\"select_action_"+i;
					bdyLines += "\" id=\"select_action_"+i+"\" >\n";
					bdyLines += "<table border=\"0\">\n";
					bdyLines += "<tr>\n";
					bdyLines += "<td width=\"50%\"> <span style=\"COLOR: #FF0000 ;\">";
					bdyLines +=         obs(prod_movement_tab[i][j])+"</span>\n";
					bdyLines += "<input type=\"hidden\" name=\"pmvDepot\"";
					bdyLines += " value=\"" + pmvDepot + "\">\n";
					bdyLines += " <input type=\"hidden\" name=\"h_PMV_NUMBER\"";
					bdyLines += " id=\"h_PMV_NUMBER\"";
					bdyLines += " value=\""+ prod_movement_tab[i][0] +"\">\n";
					bdyLines += " <input type='hidden' name='h_PMV_BATCHCODE'";
					bdyLines += " id='h_PMV_BATCHCODE'";
					bdyLines += " value='"+ prod_movement_tab[i][4] +"'>\n";

					bdyLines += " <input type=\"hidden\" name=\"h_PMV_STATUS\"";
					bdyLines += " id=\"h_PMV_STATUS\"";
					bdyLines += " value=\""+ prod_movement_tab[i][6] +"\">\n";
					bdyLines += " <input type=\"hidden\" name=\"pg\" id=\"pg\"";
					bdyLines += " value=\""+pg+"\">\n";
					bdyLines +=   preqstr_field ();
					bdyLines += "</td>\n";
					bdyLines += "<td width=\"50%\">\n";
					bdyLines += pmvView_ops(curAuth, i );
					bdyLines += "</td>\n";
					bdyLines += "</tr>\n";
					bdyLines += "</table>\n";
					bdyLines += "</form>\n";
				}
				else
				{
					bdyLines += obs(prod_movement_tab[i] [j]) + "<\/td>";
				}
				bdyLines += "</td>\n";
			}
		}
	}
	bdyLines += "</tr>\n";
	bdyLines += "</table>\n";
	bdyLines += "</td>\n";
	bdyLines += "</tr>\n";
	
	if(parseInt(pg)> 0&&parseInt(pagesTotal)!=0)
  {
      	bdyLines +=nextPage_long(pagesTotal, pg,"prod_movement.php", "pg");
  }
	return( bdyLines );
}
/*============================================================================*/
function op_field (attr)
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"op\" id=\"op\" value=\""+attr+"\" type=\"hidden\">\n";
	return fieldHTML;
}
/*============================================================================*/
// Function responsible for making the
// drop down visible for tanker type and
// disable the input text field
// and vice versa
function
updateSrcTypDisable(myObj)
{
	var myselectedvalue = myObj.options[myObj.selectedIndex].value;
	for(var i=0; i<drpListtyp.length; i++)
	{
		if(myselectedvalue == drpListtyp[i])// that means show the drop list
		{
			//alert( "updateSrcTypDisable show tanks drop list");
			updateDisableProp('ipt_srcTyp', true);
			hideLayer("div_ipt_srcTyp"); // hide input field
			showLayer("div_drp_srcTyp");// show drop list field
			updateDisableProp('drp_srcTyp', false);
			//update the Tank Src List only dont touch the dest Type
			changeTanksDropLists(myObj.form.base.value, true, false);
		}
		else // that means show the input text field
		{
			updateDisableProp('drp_srcTyp', true);
			hideLayer("div_drp_srcTyp"); // hide drop list
			showLayer("div_ipt_srcTyp");// show input field field
			updateDisableProp('ipt_srcTyp', false);
		}
	}
}
/*============================================================================*/
// Function responsible for making the
// drop down visible for tanker type and
// disable the input text field
// and vice versa
function
updateRcvTypDisable(myObj)
{
	var myselectedvalue = myObj.options[myObj.selectedIndex].value;
	for(var i=0; i<drpListtyp.length; i++)
	{
		if(myselectedvalue==drpListtyp[i])// that means show the drop list
		{
			//alert( "updateRcvTypDisable show tanks drop list");
			hideLayer("div_ipt_dstTyp"); // hide input field
			updateDisableProp('ipt_dstTyp', true);
			updateDisableProp('drp_dstTyp', false);
			showLayer("div_drp_dstTyp");// show drop list field
			//update the Tank Dest List only dont touch the src List
			changeTanksDropLists(myObj.form.base.value, false, true);
		}
		else // that means show the input text field
		{
			updateDisableProp('drp_dstTyp', true);
			hideLayer("div_drp_dstTyp"); // hide drop list
			showLayer("div_ipt_dstTyp");// show input field field
			updateDisableProp('ipt_dstTyp', false);
		}
	}
}
/*============================================================================*/
function
updateDisableProp(fieldId, bool )
{

	var currElement = getElemRefs(fieldId);
	if(bool == true)
	{
		currElement.setAttribute("dataType","");
	}
	else
	{
		currElement.setAttribute("dataType","Require");
	}
	//alert("updateDisableProp(" + fieldId + "," + bool + ")");
	currElement.disabled = bool ;
}
/*============================================================================*/
function
showLayer(id)
{
	var lyr = getElemRefs(id);
	if (lyr) lyr.style.visibility = "visible";
}
/*============================================================================*/
function
hideLayer(id)
{
	var lyr = getElemRefs(id);
	if (lyr) lyr.style.visibility = "hidden";
}
/*============================================================================*/
function
productMovementDetailsBody( curAuth )
{
	var detsFrmhtml = "";
	var srcTypeStr = "";
	var dstTypeStr = "";
	//var dutyStr = "";
	var transTypeStr = "";
	var i = 0;

	for( i = 1; i < h_PMV_UNITTYPE_jslst.length; ++i )
	{
		if( h_PMV_SRCTYPE == h_PMV_UNITTYPE_jslst[i][0] )
		{
			srcTypeStr = h_PMV_UNITTYPE_jslst[i][1];
		}
		if( h_PMV_DSTTYPE == h_PMV_UNITTYPE_jslst[i][0] )
		{
			dstTypeStr = h_PMV_UNITTYPE_jslst[i][1];
		}
	}

	//for( i = 1; i < h_PMV_DUTY_INDICAT_jslist.length; ++i )
	//{
		//if( h_PMV_DUTY_INDICAT == h_PMV_DUTY_INDICAT_jslist[i][0] )
		//{
			//dutyStr = h_PMV_DUTY_INDICAT_jslist[i][1];
		//}
	//}

	for( i = 1; i < h_PMV_TRANS_TYPE_jslist.length; ++i )
	{
		if( h_PMV_TRANS_TYPE == h_PMV_TRANS_TYPE_jslist[i][0] )
		{
			transTypeStr = h_PMV_TRANS_TYPE_jslist[i][1];
		}
	}

	detsFrmhtml += backToBtn_HTML();
	detsFrmhtml += " <form name=\"pmvDets\" method =\"post\" id=\"pmvDets\"";
	detsFrmhtml += " action=\"prod_movement.php\">\n";
	detsFrmhtml += fieldst_HTML(otherText["msg_PMV_details"]);
	detsFrmhtml += "<div class=\"adminform\">\n";
	detsFrmhtml += "<table>";
	detsFrmhtml += "<td align=\"left\">";
	detsFrmhtml += "<tr>\n";

	detsFrmhtml += "<div id=\"topArea\">";
	detsFrmhtml += "<table>";

	detsFrmhtml += "<tr>";
	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=     pmvDetsColumns[0] + "</td>\n";
	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=   ":</td>\n";
	detsFrmhtml += "<td class=\"infotext \">";
	detsFrmhtml +=   "&nbsp;" + h_PMV_NUMBER + "&nbsp;&nbsp;&nbsp;</td>\n";

	detsFrmhtml += "<td class=\"infotextheading\"></td>"; // spacer
	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=       pmvDetsColumns[1] + "</td>\n";
	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=   ":</td>\n";
	detsFrmhtml += "<td class=\"infotext \">";
	detsFrmhtml +=    "&nbsp;" + transTypeStr + "&nbsp;&nbsp;&nbsp;</td>\n";

	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=       pmvDetsColumns[2] + "</td>\n";
	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=   ":</td>\n";
	detsFrmhtml += "<td class=\"infotext \">";
	detsFrmhtml +=    "&nbsp;" + h_MESSAGE + "&nbsp;&nbsp;&nbsp;</td>\n";
	detsFrmhtml += "</tr>";

	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=       pmvDetsColumns[3] + "</td>\n";
	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=   ":</td>\n";
	detsFrmhtml += "<td class=\"infotext \">";
	detsFrmhtml +=    "&nbsp;" + h_PMV_INTENDED_QTY + "&nbsp;&nbsp;&nbsp;</td>\n";
	detsFrmhtml += "<td class=\"infotextheading\">";
	if( h_PMV_UNIT == "28" )
	{
		detsFrmhtml +=  pmvScale[0] + "</td>\n";
	}
	else
	{
		detsFrmhtml +=  pmvScale[1] + "</td>\n";
	}

	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=       pmvDetsColumns[4] + "</td>\n";
	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=   ":</td>\n";
	detsFrmhtml += "<td class=\"infotext \">";
	detsFrmhtml +=    "&nbsp;" + h_PMV_BATCHCODE + "&nbsp;&nbsp;&nbsp;</td>\n";

	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=       pmvDetsColumns[5] + "</td>\n";
	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=   ":</td>\n";
	detsFrmhtml += "<td class=\"infotext \">";
	detsFrmhtml +=    "&nbsp;" + h_PMV_PRDCTLNK + "&nbsp;&nbsp;&nbsp;</td>\n";

	detsFrmhtml += "<tr>";
	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=     pmvDetsColumns[7] + "</td>\n";
	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=   ":</td>\n";
	detsFrmhtml += "<td class=\"infotext \">";
	detsFrmhtml +=   "&nbsp;" + srcTypeStr + "&nbsp;&nbsp;&nbsp;</td>\n";

	detsFrmhtml += "<td class=\"infotextheading\"></td>"; // spacer
	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=       pmvDetsColumns[8] + "</td>\n";
	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=   ":</td>\n";
	detsFrmhtml += "<td class=\"infotext \">";
	detsFrmhtml +=    "&nbsp;" + h_PMV_SRCCODE + "&nbsp;&nbsp;&nbsp;</td>\n";

	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=     pmvDetsColumns[9] + "</td>\n";
	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=   ":</td>\n";
	detsFrmhtml += "<td class=\"infotext \">";
	detsFrmhtml +=   "&nbsp;" + dstTypeStr + "&nbsp;&nbsp;&nbsp;</td>\n";

	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=       pmvDetsColumns[10] + "</td>\n";
	detsFrmhtml += "<td class=\"infotextheading\">";
	detsFrmhtml +=   ":</td>\n";
	detsFrmhtml += "<td class=\"infotext \">";
	detsFrmhtml +=    "&nbsp;" + h_PMV_DSTCODE + "&nbsp;&nbsp;&nbsp;</td>\n";

	detsFrmhtml += "</tr>\n";

	if( h_PMV_STATUS != "0" )
	{
		detsFrmhtml += "<tr>\n";
		detsFrmhtml += "<td class=\"infotextheading\">";
		detsFrmhtml +=       pmvDetsColumns[11] + "</td>\n";
		detsFrmhtml += "<td class=\"infotextheading\">";
		detsFrmhtml +=   ":</td>\n";
		detsFrmhtml += "<td class=\"infotext \">";
		detsFrmhtml +=    "&nbsp;" + h_PMV_OPENING_QTY + "&nbsp;";
		detsFrmhtml +=   "</td>\n";
		detsFrmhtml += "<td class=\"infotextheading\">";
		detsFrmhtml +=  pmvScale[0] + "&nbsp;&nbsp;</td>\n";

		detsFrmhtml += "<td class=\"infotextheading\">";
		detsFrmhtml +=       pmvDetsColumns[12] + "</td>\n";
		detsFrmhtml += "<td class=\"infotextheading\">";
		detsFrmhtml +=   ":</td>\n";
		detsFrmhtml += "<td class=\"infotext \">";
		detsFrmhtml +=    "&nbsp;" + h_PMV_OBSVD_DENS + "&nbsp;";
		detsFrmhtml +=   "</td>\n";
		detsFrmhtml += "</tr>\n";
	}
	detsFrmhtml += "</table>\n";

	// progress frame 
	detsFrmhtml += "<table>";
	detsFrmhtml += "<tr>\n";
	detsFrmhtml += "<td width=\"10%\" height=\"50%\" class=\"infotextheading\">";
	detsFrmhtml +=       pmvDetsColumns[13] + "</td>\n";
	detsFrmhtml += "<td align=\"left\" class=\"infotextheading\">";
	detsFrmhtml +=   ":</td>\n";
	detsFrmhtml += "<td align=\"left\" width=\"600\" height=\"30\" class=\"infotext \">";
	detsFrmhtml += "<iframe id=\"progIframe\" name=\"progIframe\" scrolling=\"no\" align=\"left\" width=\"600\" height=\"30\"";
	detsFrmhtml += " src=\"prod_movement.php?op=108";
	detsFrmhtml += "&h_PMV_NUMBER=" + h_PMV_NUMBER;
	detsFrmhtml += "&h_PMV_INTENDED_QTY=" + h_PMV_INTENDED_QTY;
	detsFrmhtml += "&h_PMV_STATUS=" + h_PMV_STATUS;
	detsFrmhtml += "\">\n";
	detsFrmhtml += "</iframe>\n";
	detsFrmhtml += "</td>\n";
	detsFrmhtml += "</tr>\n";
	detsFrmhtml += "</table>\n";

	detsFrmhtml += "</div>\n";
	detsFrmhtml += "</form>\n";                      
	detsFrmhtml +="</table>\n";

	detsFrmhtml += fieldstFoot_HTML();
  //detsFrmhtml += backToBtn_HTML();
	//alert("h_PMV_STATUS is " + h_PMV_STATUS );
	//var btn_HTML = "";
	//var t = "justChaneMyLocation('prod_movement.php?op=206&h_PMV_NUMBER=";
	//t += h_PMV_NUMBER + "'); "

	detsFrmhtml +="         <tr> \n";
	detsFrmhtml +="             <td align=\"center\">\n ";
	detsFrmhtml +="                                 <div class=\"button\">\n";

	
	if( h_PMV_STATUS == 0 )
	{
		detsFrmhtml += startProductMovementButton();
	}
	if( h_PMV_STATUS == 1 )
	{
		detsFrmhtml += haltProductMovementButton();
	}
	if( h_PMV_STATUS == 2 )
	{
		detsFrmhtml += startProductMovementButton();
		detsFrmhtml += completeProductMovementButton();
	}

	detsFrmhtml +="                                 </div><br>\n";
	detsFrmhtml +="             <td>\n ";
	detsFrmhtml +="         </tr> \n";
	

	detsFrmhtml +="	</table>\n";
	
	return detsFrmhtml;
}
/*============================================================================*/
function
getsrcTypTypHTML(srcType)
{
        var srcHTML ="";
        var drpVisble = "VISIBILITY:hidden";
        var drpdataType="";
        var drpable="disabled = true";

        var inptVisble = "VISIBILITY:";
        var inptdataType="Number";
        var inptable="";
        for(var i=0; i<drpListtyp.length; i++)
        {
                if(srcType == drpListtyp[i])// that means show the drop list
                {
                        drpVisble = "VISIBILITY:";
                        drpdataType="Require";
                        drpable="";

                        inptVisble = "VISIBILITY:hidden";
                        inptdataType="";
                        inptable="disabled = true";
                }

        }
        srcHTML += "<div id=\"div_drp_srcTyp\" style=\""+drpVisble+"\">\n";
        srcHTML += "<select id=\"drp_srcTyp\" name=\"h_PMV_SRCCODE\" class=\"smallselect\" ";
	srcHTML += " dataType=\""+drpdataType+"\" msg=\""+otherText["msg_selUnit"]+"\" "+drpable;
	srcHTML += " > \n";
        srcHTML += displayDropList_tanks(srcType,tank_code_jslist,otherText["msg_selUnit"],h_PMV_PRDCTLNK);
        srcHTML += "<\/div>\n";

        srcHTML += "<div id=\"div_ipt_srcTyp\" style=\""+inptVisble+"\">\n";
        srcHTML += "<input type=\"text\" name=\"h_PMV_SRCCODE\"";
	srcHTML += " id=\"ipt_srcTyp\" value=\"\" ";
	srcHTML += " maxLength=\"20\" dataType=\"" + inptdataType +"\" ";
	srcHTML += " msg=\""+otherText["msg_selUnit"]+"\" "+inptable+"> \n";
        srcHTML +="<\/div>\n";
        return srcHTML;
}
/*============================================================================*/
function
getdstTypTypHTML(dstType)
{
        var dstHTML ="";
        var drpVisble = "VISIBILITY:hidden";
        var drpdataType="";
        var drpable=" disabled = true";

        var inptVisble = "VISIBILITY:";
        var inptdataType="Number";
        var inptable="";
        for(var i=0; i<drpListtyp.length; i++)
        {
                if(dstType == drpListtyp[i])// that means show the drop list
                {
                        drpVisble = "VISIBILITY:";
                        drpdataType="Require";
                        drpable="";

                        inptVisble = "VISIBILITY:hidden";
                        inptdataType="";
                        inptable="disabled = true";
                }

        }

        dstHTML += "<div id=\"div_drp_dstTyp\" style=\""+drpVisble+"\">\n";
        dstHTML += "<select id=\"drp_dstTyp\" name=\"h_PMV_DSTCODE\" class=\"smallselect\" ";
	dstHTML += " dataType=\""+drpdataType+"\" ";
	dstHTML  += " msg=\""+otherText["msg_selUnit"]+"\" "+drpable;
	dstHTML += " > \n";
        dstHTML += displayDropList_tanks(dstType,tank_code_jslist,otherText["msg_selUnit"],h_PMV_PRDCTLNK);
        dstHTML += "<\/div>\n";

        dstHTML += "<div id=\"div_ipt_dstTyp\" style=\""+inptVisble+"\">\n";
        dstHTML += "<input type=\"text\" name=\"h_PMV_DSTCODE\"";
	dstHTML += " id=\"ipt_dstTyp\" value=\"\"";
	dstHTML += " maxLength=\"20\" dataType=\"" + inptdataType +"\" ";
	dstHTML += " msg=\""+otherText["msg_selUnit"]+"\" ";
	dstHTML += inptable;
	dstHTML += "> \n";
        dstHTML +="<\/div>\n";
        return dstHTML;
}
/*============================================================================*/
function
nullOptions(aMenu)
{
	//alert(aMenu.name);
	tot=aMenu.options.length;

	if (aMenu.options.length>0)
	{
		for (i=0;i<tot;i++)
		{
			aMenu.options[i] = null;
		}
	}
	aMenu.options.length = 0;
}
/*============================================================================*/
function
printHideableAddFields()
{
	var extras = "";
  var oqVis = "visibility:hidden";

	
	extras +="<td colspan=\"2\">\n";
  extras += "<div id=\"div_EXTRAS\" style=\""+ oqVis +"\">\n";	
  extras +="<table>\n";
  extras +="<tr>\n";
  extras +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",pmvAddColumns[9]+":");
  extras +=textTd_HTML(" width=\"5\" align=\"center class=\"infotextheading\" ",
      	    "&nbsp;\n");
  extras += "<td colspan=\"2\">\n";
  extras += "<input type=\"text\" name=\"h_PMV_OPENING_QTY\"";
	extras += " id=\"h_PMV_OPENING_QTY\" value=\"0\" ";
	extras += " maxLength=\"20\" size=\"6\" dataType=\"Number\" ";
	extras += " msg=\""+otherText["msg_specOQ"]+"\" > <span class=\"infotextheading\">"+pmvScale[0]+"</span>\n";
	extras += "</td>\n"; 
	extras += "</tr>\n";
   
  extras +="<tr>\n";
  extras +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",pmvAddColumns[10]+":");
  extras +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  extras += "<td>\n";
	extras += "<input type=\"text\" name=\"h_PMV_OBSVD_DENS\"";
	extras += " id=\"h_PMV_OBSVD_DENS\" value=\"0.0\" ";
	extras += " maxLength=\"20\" dataType=\"Double\" ";
	extras += " msg=\""+otherText["msg_specOD"]+"\" > <span class=\"infotextheading\">"+otherText["msg_Unit_density"]+ "</span>\n";
  extras += "</td>\n";
  extras += "</tr>\n";
  extras += "</table>\n";
  extras += "</div>\n";
  extras += "</td>\n";

	

	return( extras );
}
/*============================================================================*/
function
showHideAddFields(obj)
{
	var lyr = getElemRefs("div_EXTRAS");
	if( obj.form.addedType[0].checked )
	{
		//alert("showHideAddFields HIDE extra fields");
		//alert(lyr.style.visibility);
		if (lyr) lyr.style.visibility = "hidden";
	}
	else
	{
		//alert("showHideAddFields SHOW extra fields");
		//alert(lyr.style.visibility);
		if (lyr) lyr.style.visibility = "visible";

	}
}
/*============================================================================*/
function
changeTanksDropList(obj)
{
	var prod = obj.options[obj.selectedIndex].value;
	changeTanksDropLists(prod, true, true); //Update both lists using the base code
}
/*============================================================================*/
function
changeTanksDropLists(prod, isScrUpDate, isDesUpDate)
{
	if(isDesUpDate==true)// means update the Src Unit List
	{
    var j = 1;
  
  	//alert("changeTanksDropLists prod is " + prod);
  	var elem = getElemRefs("div_drp_dstTyp");
  	var elem2 = getElemRefs("drp_dstTyp");
  	//alert("changeTanksDropLists dst elem vis is " + elem.style.visibility  + " disabled is " + elem2.disabled );
  	if (elem && elem.style.visibility == "visible" && elem2.disabled == false )
  	{
  		//alert("changeTanksDropLists alter tanks dest drop list");
  		dstDropList = elem2;
  		//alert(dstDropList.options.length);
  
  		//nullOptions(dstDropList);
  		nullOptions(elem2);
  
  		dstDropList.options[0] = new Option(otherText["msg_selUnit"],"");
  		for( i in tank_code_jslist )
  		{
  			if( i > 0 && prod == tank_code_jslist[i][1] )
  			{
  				// add the tank code to the list
  				dstDropList.options[j] = new Option(tank_code_jslist[i][0],tank_code_jslist[i][0]);
  				j = parseInt(j) + 1;
  			}
  		}
  
  	}
  }
  
  if(isScrUpDate==true)// means update the Src Unit List
	{
  	j = 1;
  	srcElem = getElemRefs("div_drp_srcTyp");
  	srcElem2 = getElemRefs("drp_srcTyp");
  	//alert("changeTanksDropLists src elem vis is " + srcElem.style.visibility + " disabled is " + srcElem2.disabled);
  	if (srcElem && srcElem.style.visibility == "visible" && srcElem2.disabled == false )
  	{
  		//alert("changeTanksDropLists alter tanks src drop list");
  		srcDropList = srcElem2;
  		//alert(srcDropList.options.length);
  
  		nullOptions(srcDropList);
  
  		srcDropList.options[0] = new Option(otherText["msg_selUnit"],"");
  		for( i in tank_code_jslist )
  		{
  			if( i > 0 && prod == tank_code_jslist[i][1] )
  			{
  				// add the tank code to the list
  				srcDropList.options[j] = new Option(tank_code_jslist[i][0],tank_code_jslist[i][0]);
  				j = parseInt(j) + 1;
  			}
  		}
  	}
	}
}
/*============================================================================*/
function
addProductMovementBody( curAuth )
{
	var i = 0;
	var newProductMovementNr = 1;
	var predictedQty = 0;
	var duty;
	var transType;

	//alert("addProductMovementBody");
	for ( i in prod_movement_tab )
	{
		if( i > 0 && newProductMovementNr <= prod_movement_tab[i][0] )
		{
			newProductMovementNr = parseInt(prod_movement_tab[i][0]) + 1;
			//alert( "i = " + i + " newProductMovementNr " + newProductMovementNr );
		}
	}
	
	var addFrmhtml ="";
	addFrmhtml += backToBtn_HTML();
	addFrmhtml += fieldst_HTML(otherText["msg_addNewPMV_details"]);
	addFrmhtml += "<div class=\"adminform\">\n";
  addFrmhtml += "<table width=\"100%\">\n";
  addFrmhtml += infotextRow_HTML(" width=\"100%\" ",otherText["msg_addNewPMV_instructions"]);
  addFrmhtml += " <form name=\"addNew\" method =\"post\" id=\"addNew\"";
  addFrmhtml += " action=\"prod_movement.php\" onsubmit=\"return validateAndSubmit(this)\">\n";
  addFrmhtml +=   preqstr_field ();
  addFrmhtml += "<input type=\"hidden\" name=\"newProductMovementNr\"";
  addFrmhtml += " value=\"" + newProductMovementNr + "\">\n";
	addFrmhtml += "<input type=\"hidden\" name=\"pmvDepot\"";
	addFrmhtml += " value=\"" + pmvDepot + "\">\n";

	addFrmhtml += "	<tr>\n";
	addFrmhtml += "<td class=\"infotext\" width=\"100%\">\n";
	addFrmhtml +="<table width=\"100%\">\n";
  addFrmhtml +="<tr>\n";
  addFrmhtml +="<td width=\"50%\" colspan=\"2\">\n";
  addFrmhtml +="<table>\n";
  addFrmhtml +="<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",otherText["pmv_detType"]+":");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="<td >\n";
	addFrmhtml += "<input type=\"radio\" name=\"addedType\"";
	addFrmhtml += " value=\"" + h_PMV_STATUS_jslist[1][0] + "\"";
	addFrmhtml += " onClick=\"showHideAddFields(this);\" checked> <span class=\"infotextheading\">" + h_PMV_STATUS_jslist[1][1] +  " ("+otherText["autoStr"]+")<\/span>\n";
	addFrmhtml += "<input type=\"radio\" name=\"addedType\"";
	addFrmhtml += " value=\"" + h_PMV_STATUS_jslist[4][0] + "\"";
	addFrmhtml += " onClick=\"showHideAddFields(this);\" > <span class=\"infotextheading\">" + h_PMV_STATUS_jslist[4][1] + " ("+otherText["manualStr"]+") <\/span>\n";
	addFrmhtml +="<\/td>\n";
	addFrmhtml += "</tr>\n";
	addFrmhtml += "</table>\n";
	addFrmhtml +="</td>\n";
	
	addFrmhtml +="</tr>\n";
  
  //2nd Row
	addFrmhtml += "<tr>\n";
	addFrmhtml += "<td width=\"50%\">\n";
	addFrmhtml += "<table>\n";
	addFrmhtml +="<tr>\n";
	addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"140\" ",pmvAddColumns[0]+":");
	addFrmhtml += textTd_HTML(" width=\"5\" align=\"left class=\"infotext\" ", "<span class=\"mandatory\">*</span>\n");
	addFrmhtml += "<td>\n";
	addFrmhtml += "<select id=\"base\" name=\"base\" class=\"smallselect\" ";
	addFrmhtml += " dataType=\"Require\" msg=\""+otherText["msg_selAProd"];
	addFrmhtml +=   "\" onchange=\"changeTanksDropList(this);\" > \n";
	addFrmhtml += displayDropList(h_PMV_PRDCTLNK, h_PMV_PRDCTLNK_jslist, otherText["msg_selAProd"]);
	addFrmhtml += "</td>\n";
	addFrmhtml +="</tr>\n";
	addFrmhtml += "</table>\n";
	addFrmhtml += "</td>\n";
	addFrmhtml += "<td width=\"50%\">\n";
	addFrmhtml += "<table>\n";
	addFrmhtml +="<tr>\n";
	addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"140\" ",pmvAddColumns[1]+":");
	addFrmhtml += textTd_HTML(" width=\"5\" align=\"left class=\"infotext\" ", "<span class=\"mandatory\">*</span>\n");
	addFrmhtml += "<td>\n";
	addFrmhtml +="<input type=\"text\" maxlength=\"20\"";
  addFrmhtml +="name=\"h_PMV_BATCHCODE\" value=\"\"";
  addFrmhtml +=" id=\"h_PMV_BATCHCODE\" ";
  addFrmhtml +=" dataType=\"Require\" msg=\"" + otherText["msg_fillBatch"] + "\" >\n";
	addFrmhtml += "</td>\n";
	addFrmhtml +="</tr>\n";
	addFrmhtml += "</table>\n";
	addFrmhtml += "</td>\n";
	addFrmhtml += "</tr>\n";
	
  //3rd Row
	addFrmhtml += "<tr>\n";
	addFrmhtml += "<td width=\"50%\">\n";
	addFrmhtml += "<table>\n";
	addFrmhtml +="<tr>\n";
	addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"140\" ",pmvAddColumns[2]+":");
	addFrmhtml += textTd_HTML(" width=\"5\" align=\"left class=\"infotext\" ", "<span class=\"mandatory\">*</span>\n");
	addFrmhtml += "<td>\n";
	addFrmhtml += "<select id=\"src\" name=\"src\" class=\"smallselect\" ";
	addFrmhtml += " dataType=\"Require\" msg=\""+otherText["msg_selASrc"];
	addFrmhtml +=   "\" onchange=\"updateSrcTypDisable(this);\" > \n";
	addFrmhtml += displayDropList(h_PMV_SRCTYPE, h_PMV_UNITTYPE_jslst,otherText["msg_selASrc"]);
	addFrmhtml += "</td>\n";
	addFrmhtml += "</tr>\n";
	addFrmhtml += "</table>\n";
	addFrmhtml += "</td>\n";
	addFrmhtml += "<td width=\"50%\">\n";
	addFrmhtml += "<table>\n";
	addFrmhtml +="<tr>\n";
	addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"140\" ",pmvAddColumns[3]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ","<span class=\"mandatory\">*</span>\n");
	addFrmhtml += "<td>\n";
	addFrmhtml += getsrcTypTypHTML(h_PMV_SRCTYPE)+"\n";
	addFrmhtml += "</td>\n";
	addFrmhtml += "</tr>\n";
	addFrmhtml += "</table>\n";
	addFrmhtml +="</td>\n";
	addFrmhtml += "</tr>\n";
  //4th Row
	addFrmhtml += "<tr>\n";
	addFrmhtml += "<td width=\"50%\">\n";
	addFrmhtml += "<table>\n";
	addFrmhtml +="<tr>\n";
	addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"140\" ",pmvAddColumns[4]+":");
	addFrmhtml += textTd_HTML(" width=\"5\" align=\"left class=\"infotext\" ", "<span class=\"mandatory\">*</span>\n");
	addFrmhtml += "<td>\n";
	addFrmhtml += "<select id=\"dst\" name=\"dst\" class=\"smallselect\" ";
	addFrmhtml += " dataType=\"Require\" msg=\""+otherText["msg_selADst"];
	addFrmhtml += "\" onchange=\"updateRcvTypDisable(this);\" > \n";
	addFrmhtml += displayDropList(h_PMV_DSTTYPE, h_PMV_UNITTYPE_jslst,otherText["msg_selADst"]);
	addFrmhtml += "</td>\n";
	addFrmhtml += "</tr>\n";
	addFrmhtml += "</table>\n";
	addFrmhtml += "</td>\n";
	addFrmhtml += "<td width=\"50%\">\n";
	addFrmhtml += "<table>\n";
	addFrmhtml +="<tr>\n";
	addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"140\" ",pmvAddColumns[5]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ","<span class=\"mandatory\">*</span>\n");
	addFrmhtml += "<td>\n";
	addFrmhtml += getdstTypTypHTML(h_PMV_DSTTYPE)+"\n";
	addFrmhtml += "</td>\n";
	addFrmhtml += "</tr>\n";
	addFrmhtml += "</table>\n";
	addFrmhtml +="</td>\n";
	addFrmhtml += "</tr>\n";

  //5th Row
	addFrmhtml += "<tr>\n";
	addFrmhtml += "<td width=\"50%\">\n";
	addFrmhtml += "<table>\n";
  addFrmhtml += "<tr>\n";
	addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"140\" ",pmvAddColumns[7]+":");
	addFrmhtml += textTd_HTML(" width=\"5\" align=\"left class=\"infotext\" ", "<span class=\"mandatory\">*</span>\n");
	addFrmhtml += "<td>\n";
	addFrmhtml += "<select id=\"h_PMV_TRANS_TYPE\" name=\"h_PMV_TRANS_TYPE\" class=\"smallselect\" ";
	addFrmhtml += " dataType=\"Require\" msg=\""+otherText["msg_selACat"] + "\" >\n";
	addFrmhtml += displayDropList(transType, h_PMV_TRANS_TYPE_jslist, otherText["msg_selACat"]);
	addFrmhtml += "</td>\n";
	addFrmhtml += "</tr>\n";
	addFrmhtml += "</table>\n";
	addFrmhtml += "</td>\n";
	addFrmhtml +="<td width=\"50%\">\n";
	addFrmhtml +="&nbsp;\n";
	addFrmhtml +="</td>\n";
	addFrmhtml += "</tr>\n";

  //6th Row
	addFrmhtml += "<tr>\n";
	addFrmhtml += "<td width=\"50%\">\n";
	addFrmhtml += "<table>\n";
	addFrmhtml += "<tr>\n";
	addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"140\" ", pmvAddColumns[8] +":");
	addFrmhtml += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\"","<span class=\"mandatory\">*</span>\n");
	addFrmhtml += "<td>\n";
	addFrmhtml +="<input type=\"text\" maxlength=\"10\"";
  addFrmhtml +="name=\"h_PMV_INTENDED_QTY\" value=\"\"";
  addFrmhtml +=" id=\"h_PMV_INTENDED_QTY\" ";
  addFrmhtml +=" dataType=\"Integer\" msg=\"" + otherText["msg_IntendedQty"] + "\" >\n";
	addFrmhtml += "</td>\n";
	addFrmhtml += "</tr>\n";
	addFrmhtml += "</table>\n";
	addFrmhtml += "</td>\n";

	addFrmhtml += "<td width=\"50%\">\n";
	addFrmhtml += "<table>\n";
	addFrmhtml += "<tr>\n";
	addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"140\" ", pmvAddColumns[3] +":");
	addFrmhtml += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\"","<span class=\"mandatory\">*</span>\n");
	addFrmhtml += "<td>\n";
	addFrmhtml += "<input type=\"radio\" name=\"QuantityScale\"";
	addFrmhtml += " value=\"l\" checked> <span class=\"infotextheading\">" + pmvScale[0] + " <\/span>\n";
	addFrmhtml += "<input type=\"radio\" name=\"QuantityScale\"";
	addFrmhtml += " value=\"kg\" > <span class=\"infotextheading\">" + pmvScale[1] + " <\/span>\n";
	addFrmhtml += "</td>\n";
	addFrmhtml += "</tr>\n";
	addFrmhtml += "</table>\n";
	addFrmhtml +="</td>\n";
	addFrmhtml += "</tr>\n";
	
  //7th Row optional not visible all the time
  addFrmhtml += "<tr>\n";
	addFrmhtml += printHideableAddFields() +"\n";
  addFrmhtml += "</tr>\n";
  
  addFrmhtml += "  </table>\n";
	addFrmhtml += op_field (202);
	addFrmhtml += frmButtRow_HTML("Add", 1);

	addFrmhtml +="							   </td>\n";
  addFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Add", 1);
  addFrmhtml +="							</table>\n";
  addFrmhtml +="							</div>\n";
  addFrmhtml += "                    </form>\n";
                        
  addFrmhtml += fieldstFoot_HTML();
  return addFrmhtml;
}
/*============================================================================*/
function
refreshIframe( )
{
	if( intervalID )
	{
		clearInterval(intervalID);
	}
	intervalID = setInterval("window.frames.progIframe.refreshProgBar()",5000);
}
/*============================================================================*/
function
renderPage(cRec, cCol, cState, cPageState,priv, lang)
{ 
	var curRecord = cRec;
	var curColumnToSort = cCol;
	var curViewDetailState = cState;
	var curPageIn = cPageState;
	var curAuth = priv;
	var i;

	//alert("prod_movment.js::renderPage  - *** curViewDetailState is " + curViewDetailState );
	var newPage = "";
	var pageTitle="";
	var pageHeading="";

	//newPage += "<html>\n";
  //printHdr function of comm_HTML.js file responsible for 
  //generating all the HTML for the current page
  newPage += printHdr(newPage,updatePageTitle(curViewDetailState,pageTitle), lang);
	//newPage = printHdr( newPage,curViewDetailState,pageTitle );
	//local_HeadrHTML function is local function give 
  // the ability to append any thing to the current page
  newPage += local_HeadrHTML(newPage);
  //getToolBar_HTML function of comm_HTML.js file responsible for  
  // outputting the tool bar
  //controls the search and print buttons as well
  newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
//newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),true, true);
	newPage += "\n";
	newPage +="<tr>\n";  
  newPage +="<td width=\"100%\">             \n";
  newPage +="<div class=\"content\" id=\"content\">\n";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";  
	

	if( intervalID )
	{
		clearInterval(intervalID);
	}
	if( curViewDetailState == "-1" )
	{
		//alert("prod_movment.js::renderPage  calling printDepotChoiceForm");
		newPage += printDepotChoiceForm();
	}
	else
	{
		//alert("prod_movment.js::renderPage   - else case curViewDetailState is " + curViewDetailState);
		switch( curViewDetailState )
		{
			case 19: // View Product Movement 
				alert(alertMsgs["ALREADY_COMPLETED"]);
				newPage += viewPmvPageBody( curAuth ); // view PMV records
				break;

			case 29: // View Product Movement 
//				alert(alertMsgs["BATCH_COMPLETED"]);
				newPage += viewPmvPageBody( curAuth ); // view PMV records
				break;

			case 39: // View Product Movement 
				alert(alertMsgs["BATCH_COMPLETE_FAIL"]);
				newPage += viewPmvPageBody( curAuth ); // view PMV records
				break;

			case 107:
				newPage += viewRatiosBody( curAuth );
				break;
			case 702: // add new ownership
				//newPage += addProductMovementBody( curAuth );
				newPage += viewPmvPageBody( curAuth ); // view PMV records
				break;
			case 102: // add product movement form
				//alert("display add PMV form");
				newPage += addProductMovementBody( curAuth );
				break;
			case 103:
				newPage += productMovementDetailsBody( curAuth );
				break;
			case 222:
				alert(alertMsgs["ADD_FAIL"]);
				newPage += viewPmvPageBody( curAuth ); // view PMV records
				break;
			case 232:
				alert(alertMsgs["NOT_STARTABLE"]);
				break;
			case 228:
				alert(alertMsgs["COMPLETE_FAIL"]);
				newPage += productMovementDetailsBody( curAuth );
				break;
			case 227:
				alert(alertMsgs["HALT_FAIL"]);
				newPage += productMovementDetailsBody( curAuth );
				break;
			case 246:
				// already in progress or halted concerning tank(s)
				alert(alertMsgs["START_FAIL3"]);
				break;
			case 236:
				// has meter amounts - Sarasota or other process ?
				alert(alertMsgs["START_FAIL2"]);
				break;
			case 226:
				alert(alertMsgs["START_FAIL"]);
				newPage += productMovementDetailsBody( curAuth );
				break;
			case 999:
				alert(alertMsgs["WRONG_AUTH"]); // fall thru
			case 216:
			case 1:
			default:
				newPage += viewPmvPageBody( curAuth ); // view PMV records
				break;
		}
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
	// only refresh progress bar if state is PMV_IN_PROGRESS
	if( op == 103 && h_PMV_STATUS == "1" )
	{
		refreshIframe();
	}
	else
	{
		if( intervalID )
		{
			clearInterval(intervalID);
		}
	}
}
/*============================================================================*/
function
assArray_keys(inputArr)
{
	var keys = new Array();
	for (var i in inputArr) {
		if (inputArr[i] != null) 
			keys.push(i);
	}
	return keys;
}
/*============================================================================*/
function
updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;
	switch (op)
	{
		case 7:
			pageHeading += headingsTxt["pgHead_pmvOwn"];
			break;
		case 1:
			pageHeading += headingsTxt["pgHead_pmv"];
			break;
		default:
			pageHeading += headingsTxt["pgHead_pmv"];
			break;
	}
	return pageHeading;   
}
/*============================================================================*/
function
updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;
	if (op <= 1 || op > 10)
	{
		pageTitle += "DKI Omega Menu :: STOCK MANAGEMENT, Product Movements Page";

	}
	return pageTitle;
}
/*============================================================================*/
function
displayDropList_tanks(selectedvalue, list,defMsg, prodCd)
{
	//alert("displayDropList_tanks prodCd is " + prodCd);
	var massList = "";
	var matchFound=0;
	if( prodCd == '-1' )
	{
		for ( var i = 1; i < list.length; ++i)
		{
			massList += "<option value=\""+list[i][0]+"\"";
			if( list[i][0] == selectedvalue)
			{
				matchFound=1;
				massList += "selected";
			}
			massList += ">"+list[i][0]+"</option>\n";
		}
	}
	else
	{
		//alert("displayDropList_tanks prodCd is " + prodCd);
		for ( var i = 1; i < list.length; ++i)
		{
			if( list[i][1] == prodCd )
			{
				massList += "<option value=\""+list[i][0]+"\"";
				massList += ">"+list[i][0]+"</option>\n";
			}
		}
	}

	massList += "<option value=\"\"";

	if(matchFound==0)//no matchfound
	{

		massList += "selected";

	}
	massList += ">"+defMsg+"</option>\n";

	massList += "</select>\n";
	return massList;
}
function nextPage_long(totalPages, curPg, curPgName, curPgVarName)
{
   	//alert("totalPages in start"+totalPages);
     // At this stage Only Know Number of Pages
  	// so get the number of items
  	var num_items = (totalPages*items_per_page);
  
  	// A Block Of Pages So User Can Jump Between the Pages
  	// on the Page it should look like this
  	//  [ 31-40  41-50  51-60]
  	var block_size = 10;
  
  	//  Current Page Number as passed by the nextPage function call
  	var page_number = curPg;
  
  	// do some mathemetical stuff
  	// in order to get the current page number and
  	// page items right
  	var num_pages = Math.max(1, Math.ceil(num_items/items_per_page));
	  var page_number = Math.min(page_number, num_pages);
	  var num_blocks = Math.ceil(num_pages/block_size);
	  var block_number = Math.floor(((page_number-1)/block_size));
	   //alert("num_pages in after Math.max"+num_pages);
	   // start putting HTML string in the 
  	// nextPgHTML variable
	  var nextPgHTML = "";
	
	//Only want to display the Form IF there are more than 1 pages
	// Bug Zilla BugId 1490 an enhancement demanded by Sao
	
  if(num_pages>1)
  {
  	nextPgHTML += "</td>\n ";
  	nextPgHTML += "</tr> \n";
  	//Adding a new form So Jump to the Page will be easier
  	//nextPgHTML += "<tr> \n";
  	//nextPgHTML += "<td align=\"center\">\n ";
  	nextPgHTML += "<form name=\"gotoPage\" method =\"get\" id=\"gotoPage\" action=\""+curPgName+"\" onsubmit=\"return submitmyform(this)\">\n";
  	//nextPgHTML +="<table width=\"100%\">\n";
    //nextPgHTML +=infotextRow_HTML(" width=\"100%\ align=\"center\" ","Total Pages :"+num_pages); 
    nextPgHTML +="<tr>\n";
    nextPgHTML +=" <td align=\"center\" class=\"infotext\" width=\"100%\">\n";
    nextPgHTML +="<span style=\"font-weight: bold;\">"+otherText["msg_tot_pages"]+" :</span><span style=\"font-weight: bold;COLOR: #FF0000;\">"+num_pages+"</span>\n"; 
    nextPgHTML +="	  &nbsp;\n";
    nextPgHTML +=" <input type=\"text\" name=\"pg\"  id=\"pg\" maxLength=\"6\" style=\"FONT-SIZE:1.00em;\" size=\"6\" dataType=\"RangeValue\" min=\"1\" max=\""+num_pages+"\" msg=\""+otherText["msg_valid_pgNumber"]+"\"> \n";
    nextPgHTML +="	  &nbsp;\n";
    //All the Hidden Variables I need to send to the next Page.
    
  	nextPgHTML += "          		<input type=\"hidden\" name=\"op\" value="+op+">\n";
  	nextPgHTML += "          		<input type=\"hidden\" name=\"pmvDepot\" value="+pmvDepot+">\n";
  	//
    // End of all the hidden variables
    nextPgHTML +="	<input type=\"submit\" value=\""+commBtnText["gotopg"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
    nextPgHTML +="	  &nbsp;\n";
    nextPgHTML +="		<input type=\"reset\" value=\""+commBtnText["Reset"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
  
    nextPgHTML +="			</td>\n";
    nextPgHTML +="		</tr>\n";
    //nextPgHTML +="</table>\n";
    nextPgHTML += "</form>\n";
  }
	//End of the Row where the Jump to the page form goes
	
	nextPgHTML += "<tr> \n";
	nextPgHTML += "<td align=\"center\" class=\"nextPageLink\">\n ";
	
	// if the page number is not 1 that means user is not on page 
  	// display the previous page link and a link to the
  	// first page as well on the page looks like this <<  <
	if (!(page_number == 1)) 
  	{
    	//$html_output .= "<a href=\"" . $url . "?page_number=1" . $query_string . "\"><b>&lt;&lt;</b></a>";
    	nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) + "&op=1"+"&pmvDepot="+pmvDepot+"'); ", "&lt;&lt;");
		foobar = page_number - 1;
		
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		 nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&op=1"+"&pmvDepot="+pmvDepot+"'); ", "<b>&lt;<\/b>");
		
	} else 
  	{
		nextPgHTML += "<b>&lt;&lt;</b>&nbsp;&nbsp;<b>&lt;</b>";
	} 
  
  	// if number of block are more than 1
  	// that means there more than 20 or 30 page
  	// for easy pagination can make the blocks of pages  
 	 // display the previous page link and a link to the
  	//   on the page looks like this [ 31-40  41-50  51-60]
  	// Abdul Dont need to print the Blocks
  	// Sao wanted a better way of jumping between the pages.
  	//16/05/2006
  	/* No need of the Blocks
  	if (block_number > 0) 
  	{
		nextPgHTML += "&nbsp;&nbsp;<b>[</b>";
		for (var i=0; i<(block_number); i++) 
    	{
			var foobar1 = i*block_size + 1;	// page number to be linked
			var foobar2 = (i+1)*block_size;
			//$html_output .= "&nbsp;<a href=\"" . $url . "?page_number=" . $foobar1 . $query_string . "\">" . $foobar1 . "-" . $foobar2 . "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&op=1&pmvDepot="+pmvDepot+"'); ", foobar1 + "-" + foobar2);
		}
		nextPgHTML += "<b>]</b>";
	}No need of the Blocks*/

  	// Time to create the links to the 10 pages
  	// link to the pages look like this
 	 // <<  <  1 2  3  4  5  6  7  8  9  10 
  	// var block_number = (((page_number-1)/block_size)); 
  	//alert("block_number" +block_number);
  	foobar1 = block_number*block_size + 1;
	foobar2 = Math.min((block_number+1)*block_size, num_pages);
	foobar2++;
	//alert(foobar1);
	//alert(foobar2);
	for (var i=foobar1; i<page_number; i++) 
  	{
    //alert("I am in for loop "+i);		
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&op=1&pmvDepot="+pmvDepot+"'); ", i);
	}
	
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	
	for (var i=page_number+1; i<foobar2; i++) 
  	{
    	//alert("I am in for for foobar2 loop "+i);	
    	nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&op=1&pmvDepot="+pmvDepot+"'); ", i);
	}
	
	// if number of block are more than 1
  	// that means there more than 20 or 30 page
  	// for easy pagination can make the blocks of pages  
  	// display the previous page link and a link to the
  	//   on the page looks like this [ 31-40  41-50  51-60]
    // Sao wanted a better way of jumping between the pages.
  	//16/05/2006
  	/* No need of the Blocks	
	if (block_number+1 < num_blocks) 
  	{
		nextPgHTML += "&nbsp;&nbsp;<b>[</b>";
		for (var i=block_number+1; i<num_blocks; i++) 
    	{
      
			foobar1 = i*block_size + 1;	// page number to be linked
			foobar2 = Math.min((i+1)*block_size, num_pages);
			var tempTxt = foobar1;
			
			if (foobar2 > foobar1) {
				tempTxt += "-" + foobar2;
			}
			//$html_output .= "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&op=1&pmvDepot="+pmvDepot+"'); ", tempTxt);
		}
		nextPgHTML += "<b>]</b>";
	}No need of the Blocks*/
 	 // if the page number is not equal to total num of pages
 	 // that means we can dispay the link to the next page
  	// and the last pge
  	// link looks like this > >>
	if (!(page_number == num_pages)) 
  	{
		foobar = page_number + 1;
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&op=1"+"&pmvDepot="+pmvDepot+"'); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) +"&op=1"+"&pmvDepot="+pmvDepot+"'); ", "<b>&gt;&gt;<\/b>");
	} else {
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}
  
  
	

	return nextPgHTML;
}

/*============================================================================*/
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
  newPage +="function submitAction(myobject, frmNum)\n";
	newPage +="{\n";
	//newPage +="       var myCurQstring=produceQString();\n";
	newPage +=    "var myselectedvalue = myobject.options[myobject.selectedIndex].value;";
	newPage +="   if(myselectedvalue==\"203\")\n";
	newPage += "  {\n";
	newPage +="     if(confirm('Are you sure you want to delete?'))\n";
	newPage += "    {\n";
	newPage += "      eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "      return true;\n";
	newPage += "    }\n";
	newPage += "    else\n";
	newPage += "    {\n";
	newPage += "      eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
	newPage += "    }\n";
	newPage +="   }\n";
	newPage +="   else\n";
	newPage +="   if(myselectedvalue==\"9\")\n";
	newPage += "  {\n";
	newPage +="     if(confirm('Are you sure you want to complete this batch?'))\n";
	newPage += "    {\n";
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
