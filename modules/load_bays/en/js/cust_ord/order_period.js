	var opValues = new Array();

	// operations to order entry and maintenance
	opValues["baseOrder"] = 600;
	opValues["listOrder"] = 601;
	opValues["searchOrderForm"] = 604;
	opValues["searchOrderSubmit"] = 614;
	opValues["viewOrder"] = 605;				// relevant to opValues["viewOrdDetail"]
	opValues["modifyOrderForm"] = 606;
	opValues["modifyOrderSubmit"] = 616;
	opValues["insertOrderForm"] = 607;
	opValues["insertOrderSubmit"] = 617;
	opValues["deleteOrderForm"] = 608;
	opValues["deleteOrderSubmit"] = 618;

	// operations to order entry and maintenance - order details
	opValues["baseOrdDetail"] = 6000;
	opValues["listOrdDetail"] = 6001;
	opValues["searchOrdDetailForm"] = 6004;		// reserved
	opValues["searchOrdDetailSubmit"] = 6014;	// reserved
	opValues["viewOrdDetail"] = 6005;
	opValues["modifyOrdDetailForm"] = 6006;
	opValues["modifyOrdDetailSubmit"] = 6016;
	opValues["insertOrdDetailForm"] = 6007;
	opValues["insertOrdDetailSubmit"] = 6017;
	opValues["deleteOrdDetailForm"] = 6008;
	opValues["deleteOrdDetailSubmit"] = 6018;
	opValues["approveOrdDetail"] = 6009;

	// operations to order entry and maintenance - schedule orders
	opValues["baseSchedOrder"] = 6100;
	opValues["listSchedOrder"] = 6101;
	opValues["searchSchedOrderForm"] = 6104;	// reserved
	opValues["searchSchedOrderSubmit"] = 6114;	// reserved
	opValues["viewSchedOrder"] = 6105;
	opValues["modifySchedOrderForm"] = 6106;
	opValues["modifySchedOrderSubmit"] = 6116;
	opValues["insertSchedOrderForm"] = 6107;
	opValues["insertSchedOrderSubmit"] = 6117;
	opValues["deleteSchedOrderForm"] = 6108;
	opValues["deleteSchedOrderSubmit"] = 6118;

	// operations to pricing from: 
	// order entry and maintenance - order details
	// order entry and maintenance - order details - product periods
	// order entry and maintenance - schedule orders
	opValues["basePricing"] = 6200;
	opValues["listPricing"] = 6201;
	opValues["searchPricingForm"] = 6204;		// reserved
	opValues["searchPricingSubmit"] = 6214;		// reserved
	opValues["viewPricing"] = 6205;
	opValues["modifyPricingForm"] = 6206;
	opValues["modifyPricingSubmit"] = 6216;
	opValues["insertPricingForm"] = 6207;
	opValues["insertPricingSubmit"] = 6217;
	opValues["deletePricingForm"] = 6208;
	opValues["deletePricingSubmit"] = 6218;

	// operations to order entry and maintenance - order details - product periods
	opValues["baseProdPeriod"] = 6300;
	opValues["listProdPeriod"] = 6301;
	opValues["searchProdPeriodForm"] = 6304;	// reserved
	opValues["searchProdPeriodSubmit"] = 6314;	// reserved
	opValues["viewProdPeriod"] = 6305;
	opValues["modifyProdPeriodForm"] = 6306;
	opValues["modifyProdPeriodSubmit"] = 6316;
	opValues["insertProdPeriodForm"] = 6307;
	opValues["insertProdPeriodSubmit"] = 6317;
	opValues["deleteProdPeriodForm"] = 6308;
	opValues["deleteProdPeriodSubmit"] = 6318;

	// operations to order entry and maintenance - schedule orders - schedule
	opValues["baseSchedule"] = 6400;
	opValues["listSchedule"] = 6401;
	opValues["searchScheduleForm"] = 6404;		// reserved
	opValues["searchScheduleSubmit"] = 6414;		// reserved
	opValues["viewSchedule"] = 6405;
	opValues["modifyScheduleForm"] = 6406;
	opValues["modifyScheduleSubmit"] = 6416;
	opValues["insertScheduleForm"] = 6407;
	opValues["insertScheduleSubmit"] = 6417;
	opValues["deleteScheduleForm"] = 6408;
	opValues["deleteScheduleSubmit"] = 6418;


	var column_headers = [
			"Item Number", "Start DMY", "End DMY", "Limit", "Unit", "Loaded"
	];
		
	var otherText = new Array();
	otherText["youraction"] =  "YOUR ACTION";
    otherText["pricing"] =  "PRICING";


	otherText["btn_addNew_ordPeriod"] =  "Add New Order Period";
	otherText["btn_bakto_orderDetails"] =  "Back to Order Details Page";

	otherText["btn_bakto_ordPeriodPg"] =  "Back to Order Periods";

	otherText["btn_next_page"] =  "Next";
	otherText["btn_prev_page"] =  "Previous";
	
	otherText["tab_product"] =  "Product Details";

	otherText["pgTitle_ordPeriod"] =  "Customer Order Processing, Order Entry and Maintenance, Order Details, Order Periods";
	otherText["pgTitle_ordPeriodUpd"] =  "Customer Order Processing, Order Entry and Maintenance, Order Details, Order Periods, Modify";
	otherText["pgTitle_ordPeriodAdd"] =  "Customer Order Processing, Order Entry and Maintenance, Order Details, Order Periods, Add";
	otherText["pgTitle_ordPeriodDel"] =  "Customer Order Processing, Order Entry and Maintenance, Order Details, Order Periods, Delete";

	otherText["pgHead_ordPeriod"] =  "Order Periods";
	otherText["pgHead_ordPeriodUpd"] =  "Modify Order Periods";
	otherText["pgHead_ordPeriodAdd"] =  "Add Order Periods";
	otherText["pgHead_ordPeriodDel"] =  "Delete Order Periods";

	otherText["msg_del_confirm"] =  "Are you sure you want to delete?";

    otherText["msg_updOrdPeriod_fSet"] =  "Order Period";
    otherText["msg_updOrdPeriod_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_addOrdPeriod_fSet"] =  "Order Period";
    otherText["msg_addOrdPeriod_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";


	otherText["msg_selUnit"] = "Select a unit!";
	otherText["msg_enterItemNum"] = "Please enter the item number!";
	otherText["msg_enterStartDate"] = "Please enter the start date!";
	otherText["msg_enterEndDate"] = "Please enter the end date!";
	otherText["msg_enterLimit"] = "Please enter the limit ";

	otherText["selectDate"] = "Select Date";


//	otherText["wrongStartDate"] = "提交失败!\n 请确认开始日期在订单的有效日期之内!\n 默认值被采用!";
 	otherText["wrongStartDate"] = "Submit failed!\n Please make sure that the start date is within the valid time periods of the order.\n We have set it to default.";
 	otherText["wrongEndDate"] = "Submit failed!\n Please make sure that the end date is within the valid time periods of the order.\n We have set it to default.";
 	otherText["wrongSeqDate"] = "Submit failed!\n Please make sure that the end date is equal to or greater than the start date.\n We have set it to default.";

	var alertWrongStartDate = otherText["wrongStartDate"];
	var alertWrongEndDate = otherText["wrongEndDate"];
	var alertWrongSeqDate = otherText["wrongSeqDate"];

	var orderTitle = new Array();
	
	orderTitle["prod_name"] = "Product Name"; 
	orderTitle["prod_code"] = "Code"; 
	orderTitle["pack_size"] = "Pack Size"; 

	orderTitle["item_num"] = "Item Number"; 
	orderTitle["start_date"] = "Start Date"; 
	orderTitle["end_date"] = "End Date"; 
	orderTitle["limit"] = "Limit"; 
	orderTitle["unit"] = "Unit"; 

	var orderStatusStr = new Array();
	orderStatusStr["0"] = "No updates allowed here!\n[ Order Status: New ]";
	orderStatusStr["1"] = "No updates allowed here!\n[ Order Status: PARTIALLY SCHEDULED ]";
	orderStatusStr["2"] = "No updates allowed here!\n[ Order Status: FULLY SCHEDULED ] ";
	orderStatusStr["3"] = "No updates allowed here!\n[ Order Status: FULLY LOADED ]";
	orderStatusStr["4"] = "No updates allowed here!\n[ Order Status: OUTSTANDING ]";
	orderStatusStr["5"] = "No updates allowed here!\n[ Order Status: FULLY DELIVERED ]";
	orderStatusStr["6"] = "No updates allowed here!\n[ Order Status: EXPIRED ]";
	orderStatusStr["7"] = "No updates allowed here!\n[ Order Status: PARTIALLY LOADED ]";
	orderStatusStr["8"] = "No updates allowed here!\n[ Order Status: PARTIALLY DELIVERED ]";

	orderStatusStr["100"] = "No updates allowed here!\n[ Order Status: New+APPROVED ]";
	orderStatusStr["101"] = "No updates allowed here!\n[ Order Status: PARTIALLY SCHEDULED+APPROVED ]";
	orderStatusStr["102"] = "No updates allowed here!\n[ Order Status: FULLY SCHEDULED+APPROVED ] ";
	orderStatusStr["103"] = "No updates allowed here!\n[ Order Status: FULLY LOADED+APPROVED ]";
	orderStatusStr["104"] = "No updates allowed here!\n[ Order Status: OUTSTANDING+APPROVED ]";
	orderStatusStr["105"] = "No updates allowed here!\n[ Order Status: FULLY DELIVERED+APPROVED ]";
	orderStatusStr["106"] = "No updates allowed here!\n[ Order Status: EXPIRED+APPROVED ]";
	orderStatusStr["107"] = "No updates allowed here!\n[ Order Status: PARTIALLY LOADED+APPROVED ]";
	orderStatusStr["108"] = "No updates allowed here!\n[ Order Status: PARTIALLY DELIVERED+APPROVED ]";

	orderStatusStr["1000"] = "No updates allowed here!\n[ Order Status: New+INVOICED ]";
	orderStatusStr["1001"] = "No updates allowed here!\n[ Order Status: PARTIALLY SCHEDULED+INVOICED ]";
	orderStatusStr["1002"] = "No updates allowed here!\n[ Order Status: FULLY SCHEDULED+INVOICED ] ";
	orderStatusStr["1003"] = "No updates allowed here!\n[ Order Status: FULLY LOADED+INVOICED ]";
	orderStatusStr["1004"] = "No updates allowed here!\n[ Order Status: OUTSTANDING+INVOICED ]";
	orderStatusStr["1005"] = "No updates allowed here!\n[ Order Status: FULLY DELIVERED+INVOICED ]";
	orderStatusStr["1006"] = "No updates allowed here!\n[ Order Status: EXPIRED+INVOICED ]";
	orderStatusStr["1007"] = "No updates allowed here!\n[ Order Status: PARTIALLY LOADED+INVOICED ]";
	orderStatusStr["1008"] = "No updates allowed here!\n[ Order Status: PARTIALLY DELIVERED+INVOICED ]";

	orderStatusStr["1100"] = "No updates allowed here!\n[ Order Status: New+APPROVED+INVOICED ]";
	orderStatusStr["1101"] = "No updates allowed here!\n[ Order Status: PARTIALLY SCHEDULED+APPROVED+INVOICED ]";
	orderStatusStr["1102"] = "No updates allowed here!\n[ Order Status: FULLY SCHEDULED+APPROVED+INVOICED ] ";
	orderStatusStr["1103"] = "No updates allowed here!\n[ Order Status: FULLY LOADED+APPROVED+INVOICED ]";
	orderStatusStr["1104"] = "No updates allowed here!\n[ Order Status: OUTSTANDING+APPROVED+INVOICED ]";
	orderStatusStr["1105"] = "No updates allowed here!\n[ Order Status: FULLY DELIVERED+APPROVED+INVOICED ]";
	orderStatusStr["1106"] = "No updates allowed here!\n[ Order Status: EXPIRED+APPROVED+INVOICED ]";
	orderStatusStr["1107"] = "No updates allowed here!\n[ Order Status: PARTIALLY LOADED+APPROVED+INVOICED ]";
	orderStatusStr["1108"] = "No updates allowed here!\n[ Order Status: PARTIALLY DELIVERED+APPROVED+INVOICED ]";

		
	var orderStatusGate = 1;   // Partly Schedulled

	var dateFormat = "yyyy-MM-dd";
//	var dateFormat = "dd-NNN-yyyy";
	var items_per_page = 10;
		
	var l_opInf= new Array()
	for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
	l_opInf[6328]= "Successfully Deleted!";
	l_opInf[6327]= "Successfully Inserted a New Record!";
	l_opInf[6326]= "Successfully Updated!";

	l_opInf[6338]= "Delete Failed!";
	l_opInf[6337]= "Insert Failed!";
	l_opInf[6336]= "Update Failed!";

	l_opInf[6348]= "";
	l_opInf[6347]= "Order product period clash with others!";
	l_opInf[6346]= "Order product period clash with others!";

	l_opInf[6358]= "";
	l_opInf[6357]= "Order product period exists";
	l_opInf[6356]= "Order product period exists";


	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 6301,6304,6305,6306,6307];
	var ops_req_search = [-1, 6301];// search never required on this page



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
	newPage += "\n";
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

	/* View records of delivery location locations */
	if (priv >= 5 && curViewDetailState == opValues["listProdPeriod"]) 
	{
		newPage += displayOrdPeriodList (curPrivilage, curColumnToSort);
	}
	if (priv >= 5 && curViewDetailState == opValues["viewProdPeriod"]) 
	{
		newPage += displayOrdPeriodDetails (curPrivilage, curColumnToSort);
	}
		
	
	/* Display Form for Modify Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyProdPeriodForm"])	
	{
		newPage += displayModifyOrdPeriodForm();
	}
	/* Submit the Modification of Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyProdPeriodSubmit"])	
	{
		newPage += displayOrdPeriodList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Insert Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertProdPeriodForm"])	
	{
		newPage += displayInsertOrdPeriodForm();
	}
	/* Submit the Insertion of Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertProdPeriodSubmit"])	
	{
		newPage += displayOrdPeriodList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Delete a recorde of Order */
//	if (priv >= 8 && curViewDetailState == opValues["deleteProdPeriodForm"])	
//	{
//		newPage += displayDeleteOrderForm();
//	}
	/* Submit the Deletion of Order Details */
	if (priv >= 8 && curViewDetailState == opValues["deleteProdPeriodSubmit"])	
	{
		newPage += displayOrdPeriodList(curPrivilage, curColumnToSort);
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




function displayOrdPeriodHeader(type)
{
	var indent = 1;
	var dispFrm ="";
	var aId;
	var i;

	
	dispFrm += makespace("\t", indent) + "<tr>\n";
	dispFrm += makespace("\t", indent) + "<td>\n";
	dispFrm += makespace("\t", indent+1) + "<form name=\"list_ord_period\" method=\"get\" id=\"list_ord_period\" action=\"order_period.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	dispFrm += " <ul id=\"tabmenu\">\n";
	dispFrm += "<li>" + otherText["tab_product"] + "</li>\n";
	dispFrm += "</ul>\n";

	dispFrm += "<div class=\"adminform\">\n";

	dispFrm += makespace("\t", indent+2) + "<table width=\"100%\">\n";
	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makespace("\t", indent+2) + "<td class=\"infotext\">\n";

	// hidden area for passing values between web pages
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyOrdDetailSubmit"] + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + orderNo + "\">\n";

	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"prodCd\" id=\"prodCd\" value=\"" + prodCd + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"prodCmpy\" id=\"prodCmpy\" value=\"" + prodCmpy + "\">\n";

	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	dispFrm += makespace("\t", indent+2) + "</td>\n";
	dispFrm += makespace("\t", indent+2) + "</tr>\n";


	for(i in ord_prod_sum_jstab)
	{
		if (i > 0 )
		{
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, orderTitle["prod_name"], ord_prod_sum_jstab[i][2], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, orderTitle["prod_code"], ord_prod_sum_jstab[i][0], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, orderTitle["pack_size"], ord_prod_sum_jstab[i][7], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";
		}
	}

	dispFrm += makespace("\t", indent+2) + "</table>\n";
	dispFrm += makespace("\t", indent+2) + "</div>\n";

	dispFrm += makespace("\t", indent+1) + "</form>\n";

	dispFrm += makespace("\t", indent) + "</td>\n";	
	dispFrm += makespace("\t", indent) + "</tr> \n";

	return dispFrm;
}



function displayOrdPeriodList(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm ="";
	var aId;
	var i;

	
	//dispFrm += makespace("\t", indent) + displayGlblFrm();
	dispFrm += makespace("\t", indent) + btnGroupOrdPeriod_HTML();
	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "order_period.cgi", "pg_3");

	dispFrm += displayOrdPeriodHeader(1);
  
	dispFrm += makespace("\t", indent) + "<tr> \n";

	// end of the td and tr for the list area
	dispFrm += makespace("\t", indent) + "<td>\n ";  
	if( ((column_headers.length)> 0))
	{
		dispFrm += makespace("\t", indent+1) + "<div id=\"printReady\">\n";
		dispFrm += makespace("\t", indent+2) + table_begin("M", 0,"");
		dispFrm += makespace("\t", indent+2) + "<tbody> \n";
		dispFrm += makespace("\t", indent+2) + "<tr>\n";
		for(var i=0; i<column_headers.length; i++)
		{
			dispFrm += makespace("\t", indent+2) + "<td>" + column_headers[i] + "</td>\n";
		}
		dispFrm += makespace("\t", indent+2) + "</tr>\n";
	}

	for(i in ord_period_jstab)
	{
		if (i>0)
		{
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone =0;
			for(var j=0; j<column_headers.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(ord_period_jstab[i][howmanyDone]) + "<\/td>";
				} 
				else 
				{
					dispFrm += makespace("\t", indent+2) + "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						dispFrm += makespace("\t", indent+3) + "<form name=\"select_action_" + i + "\" id=\"select_action_" + i + "\" >\n";
						dispFrm += makespace("\t", indent+4) + "<table border=\"0\">\n";
						dispFrm += makespace("\t", indent+4) + "<tr>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\"> <span style=\"COLOR: #FF0000;\">" + obs(ord_period_jstab[i][howmanyDone]) + "</span>\n";
              
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"orderChildNo\" id=\"orderChildNo\" value=\"" + ord_period_jstab[i][0] + "\">\n";
0
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + orderNo + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCmpy\" id=\"prodCmpy\" value=\"" + prodCmpy + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCd\" id=\"prodCd\" value=\"" + prodCd + "\">\n";

						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

//						dispFrm += makespace("\t", indent+5) + preqstr_field ();
						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

						dispFrm += makespace("\t", indent+5) + op_list (curPrivilage, ord_period_jstab[i][8], ord_period_jstab[i][7], ord_period_jstab[i][0], i, ord_period_jstab[i][9]);

						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "</tr>\n";
						dispFrm += makespace("\t", indent+4) + "</table>\n";
						dispFrm += makespace("\t", indent+3) + "</form>\n";
					}
					else
					{
						dispFrm += makespace("\t", indent+3) + obs(ord_period_jstab[i][howmanyDone]);
					}  

					dispFrm += makespace("\t", indent+2) + "</td>\n";
				}
				howmanyDone++;	
			} // end of inner for loop
		  
		}
		dispFrm += makespace("\t", indent) + "\n";
		dispFrm += makespace("\t", indent+2) + "</tr>";
	}
	dispFrm += makespace("\t", indent+1) + "</tbody>";
	dispFrm += makespace("\t", indent+1) + "</table>";
	dispFrm += makespace("\t", indent) + "</div>\n";
//	dispFrm += makespace("\t", indent) + "</td>";	
//	dispFrm += makespace("\t", indent) + "</tr>";     
	dispFrm += makespace("\t", indent) + "</td>\n ";
	dispFrm += makespace("\t", indent) + "</tr>\n";
  
//	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "order_period.cgi", "pg_3");
//	dispFrm += makespace("\t", indent) + btnGroupOrdPeriod_HTML();

	return dispFrm;
}



function displayOrdPeriodDetails(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm = "";

	return dispFrm;
}





function displayModifyOrdPeriodForm ()
{
	var indent = 1;
	var updFrm = "";
	var dateStr;

	updFrm += makespace("\t", indent) + btnGroupModifyOrdPeriod_HTML();

	updFrm += displayOrdPeriodHeader(0);


	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td>\n";
//	updFrm += makespace("\t", indent+1) + "<form name=\"edit_ord_period\" method=\"get\" id=\"edit_ord_period\" action=\"order_period.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";
	updFrm += makespace("\t", indent+1) + "<form name=\"edit_ord_period\" method=\"get\" id=\"edit_ord_period\" action=\"order_period.cgi\" onsubmit=\"return submitUpdateOrderPeriodFrm(this);\">\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + otherText["msg_updOrdPeriod_fSet"] + "</li>\n";
	updFrm += "</ul>\n";
	updFrm += "<div class=\"adminform\">\n";

//	updFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	updFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_updOrdPeriod_fSet"] + "</strong></legend>\n";

	updFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	updFrm += makespace("\t", indent+4) + "<br>\n";
	updFrm += makespace("\t", indent+4) + otherText["msg_updOrdPeriod_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyProdPeriodSubmit"] + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + orderNo + "\">\n";

	updFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"orderChildNo\" id=\"orderChildNo\" value=\"" + orderChildNo + "\">\n";

	updFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCmpy\" id=\"prodCmpy\" value=\"" + prodCmpy + "\">\n";
	updFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCd\" id=\"prodCd\" value=\"" + prodCd + "\">\n";

	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	updFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(3, orderTitle["item_num"], frm_item_num, "frm_item_num", "frm_item_num", "", 10, 9, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	dateStr = dateURL_HTML("document.forms[1].frm_start_day", "date_anchor1", dateFormat, otherText["selectDate"]);
	updFrm += makefield(4, orderTitle["start_date"], frm_start_day, "frm_start_day", "frm_start_day", dateStr, 10, 10, "dataType=\"Require\"", otherText["msg_enterStartDate"], "*", indent+4, 100);
	dateStr = dateURL_HTML("document.forms[1].frm_end_day", "date_anchor2", dateFormat, otherText["selectDate"]);
	updFrm += makefield(4, orderTitle["end_date"], frm_end_day, "frm_end_day", "frm_end_day", dateStr, 10, 10, "dataType=\"Require\"", otherText["msg_enterEndDate"], "*", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 3rd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";

	var minVal = 1.0;
	var decVal = 1.0;
	var i;
	for (i=0; i<decNumber; i++)
	{
		minVal = minVal / 10.0;
		decVal = decVal * 10.0;
	}
	decVal = decVal * 10.0;
	minVal = 0.0;
	updFrm += makefield(1, orderTitle["limit"], frm_limit, "frm_limit", "frm_limit", "", 30, 30, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", otherText["msg_enterLimit"]+"( >="+minVal+" )", "*", indent+4, 100);

	updFrm += makefield(2, orderTitle["unit"], frm_unit, "frm_unit", "frm_unit", unit_jslst, 0, 0, "dataType=\"Require\"", otherText["msg_selUnit"], "*", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";


	updFrm += makespace("\t", indent+4) + "</table>\n";
	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td align=\"center\">\n";
	updFrm += makespace("\t", indent+4) + "<table>\n";

	updFrm += frmButtRow_HTML(commBtnText["Update"], 1);


	updFrm += makespace("\t", indent+4) + "</table>\n";
	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "</table>\n";

//	updFrm += makespace("\t", indent+2) + "</fieldset>\n";
	updFrm += makespace("\t", indent+2) + "</div>\n";

	updFrm += makespace("\t", indent+1) + "</form>\n";

	updFrm += makespace("\t", indent) + "</td>\n";
	updFrm += makespace("\t", indent) + "</tr>\n";

	return updFrm;
}


function displayInsertOrdPeriodForm ()
{
	var indent = 1;
	var addFrm = "";
	var dateStr;

	if (frm_unit=="" || frm_unit=="-1" || frm_unit=="0")
	{
		frm_unit = 5;
	}

	addFrm += makespace("\t", indent) + btnGroupInsertOrdPeriod_HTML();

	addFrm += displayOrdPeriodHeader(0);


	addFrm += makespace("\t", indent) + "<tr>\n";
	addFrm += makespace("\t", indent) + "<td>\n";
//	addFrm += makespace("\t", indent+1) + "<form name=\"add_ord_period\" method=\"get\" id=\"add_ord_period\" action=\"order_period.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";
	addFrm += makespace("\t", indent+1) + "<form name=\"add_ord_period\" method=\"get\" id=\"add_ord_period\" action=\"order_period.cgi\" onsubmit=\"return submitInsertOrderPeriodFrm(this);\">\n";

	addFrm += " <ul id=\"tabmenu\">\n";
	addFrm += "<li>" + otherText["msg_addOrdPeriod_fSet"] + "</li>\n";
	addFrm += "</ul>\n";
	addFrm += "<div class=\"adminform\">\n";

//	addFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	addFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_addOrdPeriod_fSet"] + "</strong></legend>\n";

	addFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	addFrm += makespace("\t", indent+4) + "<br>\n";
	addFrm += makespace("\t", indent+4) + otherText["msg_addOrdPeriod_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["insertProdPeriodSubmit"] + "\">\n";

	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + orderNo + "\">\n";

	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"orderChildNo\" id=\"orderChildNo\" value=\"" + orderChildNo + "\">\n";

	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCmpy\" id=\"prodCmpy\" value=\"" + prodCmpy + "\">\n";
	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCd\" id=\"prodCd\" value=\"" + prodCd + "\">\n";

	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	addFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(1, orderTitle["item_num"], frm_item_num, "frm_item_num", "frm_item_num", "", 10, 4, "dataType=\"Integer\"", otherText["msg_enterItemNum"], "*", indent+4, 100);
	addFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	dateStr = dateURL_HTML("document.forms[1].frm_start_day", "date_anchor1", dateFormat, otherText["selectDate"]);
	addFrm += makefield(4, orderTitle["start_date"], frm_start_day, "frm_start_day", "frm_start_day", dateStr, 10, 10, "dataType=\"Require\"", otherText["msg_enterStartDate"], "*", indent+4, 100);
	dateStr = dateURL_HTML("document.forms[1].frm_end_day", "date_anchor2", dateFormat, otherText["selectDate"]);
	addFrm += makefield(4, orderTitle["end_date"], frm_end_day, "frm_end_day", "frm_end_day", dateStr, 10, 10, "dataType=\"Require\"", otherText["msg_enterEndDate"], "*", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 3rd row
	addFrm += makespace("\t", indent+4) + "<tr>\n";

	var minVal = 1.0;
	var decVal = 1.0;
	var i;
	for (i=0; i<decNumber; i++)
	{
		minVal = minVal / 10.0;
		decVal = decVal * 10.0;
	}
	decVal = decVal * 10.0;
	minVal = 0.0;
	addFrm += makefield(1, orderTitle["limit"], frm_limit, "frm_limit", "frm_limit", "", 30, 30, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", otherText["msg_enterLimit"]+"( >="+minVal+" )", "*", indent+4, 100);

	addFrm += makefield(2, orderTitle["unit"], frm_unit, "frm_unit", "frm_unit", unit_jslst, 0, 0, "dataType=\"Require\"", otherText["msg_selUnit"], "*", indent+4, 100);
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



function displayDeleteOrderForm ()
{
	var delFrm = "";


	return delFrm;
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



function deliv_loc_field(attr)
{
  var fieldHTML ="";
  fieldHTML += "<input name=\"delivCd\" id=\"delivCd\" value=\""+delivCd+"\" "+attr+" >\n";
  return fieldHTML;
}



function checkOrdStatus()
{
  if (order_status < orderStatusGate)
    {
      return true;
    }
  else
    {
      alert (orderStatusStr[order_status]);
      return false;
    }
}




function btnGroupOrdPeriod_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	if(priv>=7)
	{
		btn_HTML += btnLocation_HTML("if (checkOrdStatus()) justChaneMyLocation('order_period.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&op=" + opValues["insertProdPeriodForm"] + "'); ", otherText["btn_addNew_ordPeriod"]);
	}

//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

//	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_period.cgi?custAcc='+custAcc); ", otherText["btn_bakto_customer"]);
	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_det.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&op=" + opValues["listOrdDetail"] + "'); ", otherText["btn_bakto_orderDetails"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}




function btnGroupOrderDetails_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";


	btn_HTML += //btnLocation_HTML("justChaneMyLocation('order_period.cgi?suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&op=" + opValues["listProdPeriod"] + "'); ", otherText["btn_bakto_ordPeriodPg"]);
//	btn_HTML += btnLocation_HTML("history.go(-1);", otherText["btn_bakto_ordPeriodPg"]);
	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_period.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&op=" + opValues["listProdPeriod"] + "'); ", otherText["btn_bakto_ordPeriodPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function btnGroupModifyOrdPeriod_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";
/*
	if (priv >= 7)
	{
		btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('order_period.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&prevOp=" + opValues["modifyProdPeriodForm"] + "&op=" + opValues["insertAddressForm"] + "&delivCd='+delivCd); ", otherText["btn_addNew_delivAddr"]);
	}
*/
	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_period.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&op=" + opValues["listProdPeriod"] + "'); ", otherText["btn_bakto_ordPeriodPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function btnGroupInsertOrdPeriod_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";
/*
	if (priv >= 7)
	{
		btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('order_period.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&prevOp=" + opValues["insertProdPeriodForm"] + "&op=" + opValues["insertAddressForm"] + "&delivCd='+delivCd); ", otherText["btn_addNew_delivAddr"]);
	}
*/
	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_period.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&op=" + opValues["listProdPeriod"] + "'); ", otherText["btn_bakto_ordPeriodPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}




function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	if (op == opValues["listProdPeriod"])
	{
		pageHeading += otherText["pgHead_ordPeriod"];
	}

	if(op == opValues["modifyProdPeriodForm"] || op == opValues["modifyProdPeriodSubmit"])
	{
		pageHeading += otherText["pgHead_ordPeriodUpd"];
	}
	if(op == opValues["insertProdPeriodForm"] || op == opValues["insertProdPeriodSubmit"])
	{
		pageHeading += otherText["pgHead_ordPeriodAdd"];
	}
	if(op == opValues["deleteProdPeriodForm"] || op == opValues["deleteProdPeriodSubmit"])
	{
		pageHeading += otherText["pgHead_ordPeriodDel"];
	}

	return pageHeading; 
}



function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	if (op == opValues["listProdPeriod"])
	{
		pageTitle += otherText["pgTitle_ordPeriod"];
	}

	if(op == opValues["modifyProdPeriodForm"] || op == opValues["modifyProdPeriodSubmit"])
	{
		pageTitle += otherText["pgTitle_ordPeriodUpd"];
	}
	if(op == opValues["insertProdPeriodForm"] || op == opValues["insertProdPeriodSubmit"])
	{
		pageTitle += otherText["pgTitle_ordPeriodAdd"];
	}
	if(op == opValues["deleteProdPeriodForm"] || op == opValues["deleteProdPeriodSubmit"])
	{
		pageTitle += otherText["pgTitle_ordPeriodDel"];
	}

	return pageTitle;
}



/* define function op_list() */
function op_list(priv, prodCmpy, prodCd, ordChNo, frmNum, ordStatus)
{
	/* priv = 
		6 modify	op=1,2,3
		7 add		op=4
		8 delete	op=5
	*/
	var op_list = "";
	op_list += "<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+prodCmpy+"', '"+prodCd+"', '"+ordChNo+"', '"+frmNum+"', '"+ordStatus+"');\">          ";

	switch (priv)
	{
		case 8:
			op_list += "<option value=\"" + opValues["deleteProdPeriodSubmit"] + "\">" + commText["Delete"] + "</option>";

		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

		case 6:     
			op_list += "<option value=\"" + opValues["modifyProdPeriodForm"] + "\">" + commText["Modify"] + "</option>";

		case 5:			/* Find Has not been implemented yet*/
			op_list += "<option value=\"" + opValues["listPricing"] + "\">" + otherText["pricing"] + "</option>";

			break;
	}

	op_list += "<option value=0 selected>--\t" + otherText["youraction"] + "\t--</option>";
	op_list += "</select>                                        ";
	
	return op_list ;
}



function nextPage2(totalPages, curPg, curPgName, curPgVarName)
{
	var nextPgHTML = "";
	nextPgHTML += "<tr> \n";
	nextPgHTML += "<td align=\"center\">\n ";

	if (curPg > 1)
	{
		//nextPgHTML +="<a href=\"javascript:document.glblFrm.pg.value="+(curPg-1)+";document.glblFrm.op.value=0;document.glblFrm.submit();\">Previous</a>\n";
//		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg-1) + "' );\">Previous</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg-1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listProdPeriod"] + "'); ", otherText["btn_prev_page"]);
	}

	nextPgHTML += "&nbsp; Current=" + curPg + "/" + totalPages + " &nbsp; ";
	if (totalPages > curPg)
	{
//		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg+1) + "' );\">Next</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg+1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listProdPeriod"] + "'); ", otherText["btn_next_page"]);
	}
  
	nextPgHTML += "</td>\n ";
	nextPgHTML += "</tr> \n";

	return nextPgHTML;
}




function nextPage(totalPages, curPg, curPgName, curPgVarName)
{
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
	
	// start putting HTML string in the 
	// nextPgHTML variable
	var nextPgHTML = "";
	nextPgHTML += "<tr> \n";
	nextPgHTML += "<td align=\"center\" class=\"nextPageLink\">\n ";
	
	// if the page number is not 1 that means user is not on page 
	// display the previous page link and a link to the
	// first page as well on the page looks like this <<  <
	if (!(page_number == 1)) 
	{
		//$html_output .= "<a href=\"" . $url . "?page_number=1" . $query_string . "\"><b>&lt;&lt;</b></a>";
		nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&op=" + opValues["listProdPeriod"] + "'); ", "&lt;&lt;");
		foobar = page_number - 1;
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&op=" + opValues["listProdPeriod"] + "'); ", "<b>&lt;<\/b>");
	}
	else 
	{
		nextPgHTML += "<b>&lt;&lt;</b>&nbsp;&nbsp;<b>&lt;</b>";
	} 
	// if number of block are more than 1
	// that means there more than 20 or 30 page
	// for easy pagination can make the blocks of pages  
	// display the previous page link and a link to the
	//   on the page looks like this [ 31-40  41-50  51-60]
	if (block_number > 0) 
	{
		nextPgHTML += "&nbsp;&nbsp;<b>[</b>";
		for (var i=0; i<(block_number); i++) 
		{
			var foobar1 = i*block_size + 1;	// page number to be linked
			var foobar2 = (i+1)*block_size;
			//$html_output .= "&nbsp;<a href=\"" . $url . "?page_number=" . $foobar1 . $query_string . "\">" . $foobar1 . "-" . $foobar2 . "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&op=" + opValues["listProdPeriod"] + "'); ", foobar1 + "-" + foobar2);
		}
		nextPgHTML += "<b>]</b>";
	}

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
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&op=" + opValues["listProdPeriod"] + "'); ", i);
	}
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	for (var i=page_number+1; i<foobar2; i++) 
	{
		//alert("I am in for for foobar2 loop "+i);	
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&op=" + opValues["listProdPeriod"] + "'); ", i);
	}
	// if number of block are more than 1
	// that means there more than 20 or 30 page
	// for easy pagination can make the blocks of pages  
	// display the previous page link and a link to the
	//   on the page looks like this [ 31-40  41-50  51-60]	
	if (block_number+1 < num_blocks) 
	{
		nextPgHTML += "&nbsp;&nbsp;<b>[</b>";
		for (var i=block_number+1; i<num_blocks; i++) 
		{
			foobar1 = i*block_size + 1;	// page number to be linked
			foobar2 = Math.min((i+1)*block_size, num_pages);
			var tempTxt = foobar1;
			
			if (foobar2 > foobar1) 
			{
				tempTxt += "-" + foobar2;
			}
			//$html_output .= "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&op=" + opValues["listProdPeriod"] + "'); ", tempTxt);
		}
		nextPgHTML += "<b>]</b>";
	}
	// if the page number is not equal to total num of pages
	// that means we can dispay the link to the next page
	// and the last pge
	// link looks like this > >>
	if (!(page_number == num_pages)) 
	{
		foobar = page_number + 1;
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&op=" + opValues["listProdPeriod"] + "'); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&op=" + opValues["listProdPeriod"] + "'); ", "<b>&gt;&gt;<\/b>");
	} 
	else 
	{
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}


	nextPgHTML += "</td>\n ";
	nextPgHTML += "</tr> \n";

	return nextPgHTML;
}




function submitInsertOrderPeriodFrm(myformObj)
{
	var isValid = false;
	var isDateOK = false;
	var tmpOrdDate;
	var tmpExpDate;
	var frmStartDate;
	var frmEndDate;

	tmpOrdDate = trimAll(orderOrdDate);
	tmpExpDate = trimAll(orderExpDate);
	frmStartDate = trimAll(myformObj.frm_start_day.value);
	frmEndDate = trimAll(myformObj.frm_end_day.value);

	isValid = submitmyform(myformObj);

	if (isValid == true)
	{
		var currDate = getCurrDate();
		isDateOK = true;

		if (frmStartDate < tmpOrdDate)
		{
//	        alert(orderOrdDate);
			myformObj.frm_start_day.value = tmpOrdDate;
			frmStartDate = trimAll(myformObj.frm_start_day.value);
			if (frmStartDate <= currDate && currDate <= tmpExpDate )
			{
				myformObj.frm_start_day.value = currDate;
				frmStartDate = trimAll(myformObj.frm_start_day.value);
			}
//	        alert(otherText["wrongStartDate"]);
	        alert(alertWrongStartDate);
			isDateOK = false;
		}
		if (frmStartDate > tmpExpDate)
		{
			myformObj.frm_start_day.value = tmpExpDate;
			frmStartDate = trimAll(myformObj.frm_start_day.value);
			if (frmStartDate >= currDate && currDate >= tmpOrdDate )
			{
				myformObj.frm_start_day.value = currDate;
				frmStartDate = trimAll(myformObj.frm_start_day.value);
			}
//	        alert(otherText["wrongStartDate"]);
	        alert(alertWrongStartDate);
			isDateOK = false;
		}
		if (frmEndDate < tmpOrdDate)
		{
			myformObj.frm_end_day.value = tmpOrdDate;
			frmEndDate = trimAll(myformObj.frm_end_day.value);
			if (frmEndDate <= currDate && currDate <= tmpExpDate )
			{
				myformObj.frm_end_day.value = currDate;
				frmEndDate = trimAll(myformObj.frm_end_day.value);
			}
//	        alert(otherText["wrongEndDate"]);
	        alert(alertWrongEndDate);
			isDateOK = false;
		}
		if (frmEndDate > tmpExpDate)
		{
			myformObj.frm_end_day.value = tmpExpDate;
			frmEndDate = trimAll(myformObj.frm_end_day.value);
			if (frmEndDate >= currDate && currDate >= tmpOrdDate )
			{
				myformObj.frm_end_day.value = currDate;
				frmEndDate = trimAll(myformObj.frm_end_day.value);
			}
	        alert(otherText["wrongEndDate"]);
	        alert(alertWrongEndDate);
			isDateOK = false;
		}

		if (frmStartDate > frmEndDate)
		{
			myformObj.frm_end_day.value = frmStartDate;
//	        alert(otherText["wrongSeqDate"]);
	        alert(alertWrongSeqDate);
			isDateOK = false;
		}

	}
	
	return (isValid && isDateOK);
}


function submitUpdateOrderPeriodFrm(myformObj)
{
	var isValid = false;
	var isDateOK = false;
	var tmpOrdDate;
	var tmpExpDate;
	var frmStartDate;
	var frmEndDate;

	tmpOrdDate = trimAll(orderOrdDate);
	tmpExpDate = trimAll(orderExpDate);
	frmStartDate = trimAll(myformObj.frm_start_day.value);
	frmEndDate = trimAll(myformObj.frm_end_day.value);

	isValid = submitmyform(myformObj);

	if (isValid == true)
	{
		var currDate = getCurrDate();
		isDateOK = true;

		if (frmStartDate < tmpOrdDate)
		{
//	        alert(orderOrdDate);
			myformObj.frm_start_day.value = tmpOrdDate;
			frmStartDate = trimAll(myformObj.frm_start_day.value);
			if (frmStartDate <= currDate && currDate <= tmpExpDate )
			{
				myformObj.frm_start_day.value = currDate;
				frmStartDate = trimAll(myformObj.frm_start_day.value);
			}
//	        alert(otherText["wrongStartDate"]);
	        alert(alertWrongStartDate);
			isDateOK = false;
		}
		if (frmStartDate > tmpExpDate)
		{
			myformObj.frm_start_day.value = tmpExpDate;
			frmStartDate = trimAll(myformObj.frm_start_day.value);
			if (frmStartDate >= currDate && currDate >= tmpOrdDate )
			{
				myformObj.frm_start_day.value = currDate;
				frmStartDate = trimAll(myformObj.frm_start_day.value);
			}
//	        alert(otherText["wrongStartDate"]);
	        alert(alertWrongStartDate);
			isDateOK = false;
		}
		if (frmEndDate < tmpOrdDate)
		{
			myformObj.frm_end_day.value = tmpOrdDate;
			frmEndDate = trimAll(myformObj.frm_end_day.value);
			if (frmEndDate <= currDate && currDate <= tmpExpDate )
			{
				myformObj.frm_end_day.value = currDate;
				frmEndDate = trimAll(myformObj.frm_end_day.value);
			}
//	        alert(otherText["wrongEndDate"]);
	        alert(alertWrongEndDate);
			isDateOK = false;
		}
		if (frmEndDate > tmpExpDate)
		{
			myformObj.frm_end_day.value = tmpExpDate;
			frmEndDate = trimAll(myformObj.frm_end_day.value);
			if (frmEndDate >= currDate && currDate >= tmpOrdDate )
			{
				myformObj.frm_end_day.value = currDate;
				frmEndDate = trimAll(myformObj.frm_end_day.value);
			}
//	        alert(otherText["wrongEndDate"]);
	        alert(alertWrongEndDate);
			isDateOK = false;
		}

		if (frmStartDate > frmEndDate)
		{
			myformObj.frm_end_day.value = frmStartDate;
//	        alert(otherText["wrongSeqDate"]);
	        alert(alertWrongSeqDate);
			isDateOK = false;
		}

	}
	
	return (isValid && isDateOK);
}




function getCurrDate()
{
	var monNum;
	var monStr;
	var datNum;
	var datStr;

	var d = new Date();
	monNum = d.getMonth() + 1;
	datNum = d.getDate();

	if (monNum < 10)
	{
		monStr = "0" + monNum;
	}
	else
	{
		monStr = monNum;
	}

	if (datNum < 10)
	{
		datStr = "0" + datNum;
	}
	else
	{
		datStr = datNum;
	}

	var currDate = d.getFullYear() + "-" + monStr + "-" + datStr;

	return currDate;
}




function leftTrim(sString) 
{
	while (sString.substring(0,1) == ' ')
	{
		sString = sString.substring(1, sString.length);
	}
	return sString;
}

function rightTrim(sString) 
{
	while (sString.substring(sString.length-1, sString.length) == ' ')
	{
		sString = sString.substring(0,sString.length-1);
	}
	return sString;
}


function trimAll(sString) 
{
	while (sString.substring(0,1) == ' ')
	{
		sString = sString.substring(1, sString.length);
	}
	while (sString.substring(sString.length-1, sString.length) == ' ')
	{
		sString = sString.substring(0,sString.length-1);
	}
	return sString;
}



function local_HeadrHTML( newPage )
{
	newPage += "<SCRIPT LANGUAGE=\"JavaScript\">\n";

	newPage +="\n";
	newPage +="//Calendar Variable\n";

	newPage +="	var cal = new CalendarPopup();\n";
	newPage +="	cal.showYearNavigation();\n";

	newPage +="\n";  

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
	newPage += "function submitAction(myobject, prodCmpy, prodCd, ordChNo, frmNum, ordStatus)\n";
	newPage += "{\n";
	newPage += "	var myCurQstring=produceQString();\n";
	newPage += "	var myselectedvalue = myobject.options[myobject.selectedIndex].value;";

	newPage += "	if(myselectedvalue==\"" + opValues["deleteProdPeriodSubmit"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(ordStatus < orderStatusGate)\n";
	newPage += "		{\n";
	newPage += "			if(confirm('" + otherText["msg_del_confirm"] + "'))\n";
	newPage += "			{\n";
//	newPage += "				eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "				eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["deleteProdPeriodSubmit"] + "+\"';\");\n";

	newPage += "				eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "				return true;\n";
	newPage += "			}\n";
	newPage += "		}\n";
	newPage += "		else\n";
	newPage += "		{\n";
	newPage += "			eval(\"alert(orderStatusStr[ordStatus]);\");\n";
	newPage += "		}\n";
	newPage += "		eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
  	newPage += "	}\n";

	newPage += "	else if(myselectedvalue==\"" + opValues["modifyProdPeriodForm"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(ordStatus < orderStatusGate)\n";
	newPage += "		{\n";
//	newPage += "				eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "				eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["modifyProdPeriodForm"] + "+\"';\");\n";

	newPage += "				eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "				return true;\n";
	newPage += "		}\n";
	newPage += "		else\n";
	newPage += "		{\n";
	newPage += "			eval(\"alert(orderStatusStr[ordStatus]);\");\n";
	newPage += "		}\n";
	newPage += "		eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
  	newPage += "	}\n";


	newPage += "	else if(myselectedvalue==\"" + opValues["listPricing"] + "\")\n";
	newPage += "	{\n";
	newPage += "		document.location.href=\"pricing.cgi?termCd="+termCd+"&orderNo="+orderNo+"&op="+opValues["listPricing"]+"&prevOp="+opValues["listProdPeriod"]+"&pg=1&prodCmpy=\"+prodCmpy+\"&prodCd=\"+prodCd+\"&order_child_no=\"+ordChNo+\"&cmpyCd="+cmpyCd+"&suppCd="+suppCd+"&custAcc="+custAcc+"\";\n";
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

