	var opValues = new Array();

	// operations to order listing
	opValues["baseOrderList"] = 10100;
	opValues["listOrderList"] = 10101;
	opValues["searchOrderListForm"] = 10104;
	opValues["searchOrderListSubmit"] = 10114;
	opValues["viewOrderList"] = 10105;
	opValues["modifyOrderListForm"] = 10106;
	opValues["modifyOrderListSubmit"] = 10116;
	opValues["insertOrderListForm"] = 10107;
	opValues["insertOrderListSubmit"] = 10117;
	opValues["deleteOrderListForm"] = 10108;
	opValues["deleteOrderListSubmit"] = 10118;

	// operations to order entry and maintenance
	opValues["baseOrder"] = 600;
	opValues["listOrder"] = 601;
	opValues["searchOrderForm"] = 604;
	opValues["searchOrderSubmit"] = 614;
	opValues["viewOrder"] = 605;				// relevant to opValues["viewSchedOrder"]
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

	// operations to order entry and maintenance - order details - order approval
	opValues["baseOrderApproval"] = 6500;
	opValues["listOrderApproval"] = 6501;
	opValues["searchOrderApprovalForm"] = 6504;	// reserved
	opValues["searchOrderApprovalSubmit"] = 6514;	// reserved
	opValues["viewOrderApproval"] = 6505;
	opValues["modifyOrderApprovalForm"] = 6506;
	opValues["modifyOrderApprovalSubmit"] = 6516;
	opValues["insertOrderApprovalForm"] = 6507;
	opValues["insertOrderApprovalSubmit"] = 6517;
	opValues["deleteOrderApprovalForm"] = 6508;
	opValues["deleteOrderApprovalSubmit"] = 6518;
	opValues["invoiceOrderApprovalForm"] = 6502;
	opValues["invoiceOrderApprovalSubmit"] = 6512;
	opValues["approveOrderApprovalForm"] = 6503;
	opValues["approveOrderApprovalSubmit"] = 6513;

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
			"Code", "Name", "Pack Size", "Ordered", "Available to Schedule", "Delivered", "Unit"
	];
		
	var otherText = new Array();
	otherText["youraction"] =  "YOUR ACTION";
    otherText["addLoadDelvQty"] =  "ADD LOADED/DELIVERED QTY";
    otherText["pricing"] =  "PRICING";
    otherText["schedule"] =  "SCHEDULE";


	otherText["btn_addLoadDelvQty"] =  "Add Loaded/Delivered Qty";
	otherText["btn_bakto_orders"] =  "Back to Order Entries";
	otherText["btn_bakto_orderlists"] =  "Back to Order Lists";

	otherText["btn_bakto_schdOrderPg"] =  "Back to Schedule Order Page";

	otherText["btn_next_page"] =  "Next";
	otherText["btn_prev_page"] =  "Previous";
	
	otherText["tab_order"] =  "Order Details";

	otherText["pgTitle_schdOrder"] =  "Customer Order Processing, Order Entry and Maintenance, Schedule Order";
	otherText["pgTitle_schdOrderUpd"] =  "Customer Order Processing, Order Entry and Maintenance, Schedule Order, Modify";
	otherText["pgTitle_schdOrderAdd"] =  "Customer Order Processing, Order Entry and Maintenance, Schedule Order, Add Loaded/Delivered Qty";
	otherText["pgTitle_schdOrderDel"] =  "Customer Order Processing, Order Entry and Maintenance, Schedule Order, Delete";

	otherText["pgHead_schdOrder"] =  "Schedule Order";
	otherText["pgHead_schdOrderUpd"] =  "Modify Ordered Quantity";
	otherText["pgHead_schdOrderAdd"] =  "Add Loaded/Delivered Quantities";
	otherText["pgHead_schdOrderDel"] =  "Delete Schedule Order";

	otherText["msg_del_confirm"] =  "Are you sure you want to delete?";

    otherText["msg_updSchdOrder_fSet"] =  "Schedule Order";
    otherText["msg_updSchdOrder_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_addSchdOrder_fSet"] =  "Schedule Order";
    otherText["msg_addSchdOrder_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";


	otherText["msg_enterLoadedQty"] = "Please enter the loaded quantity ";
	otherText["msg_enterDeliveredQty"] = "Please enter the delivered quantity ";

	otherText["msg_enterOrderedQty"] = "Please enter the ordered quantity ";

	var orderTitle = new Array();


	orderTitle["customer_name"] = "Customer"; 
	orderTitle["delivery_name"] = "To"; 
	orderTitle["order_code"] = "Order"; 
	orderTitle["order_status"] = "Status"; 
	orderTitle["delivery_date"] = "Delivery"; 

	orderTitle["prod_name"] = "Product";
	orderTitle["pack_size"] = "Pack Size";
	orderTitle["qty_ordered"] = "Ordered";
	orderTitle["qty_scheduled"] = "Scheduled";
	orderTitle["qty_loaded"] = "Loaded";
	orderTitle["qty_delivered"] = "Delivered";
	orderTitle["prod_unit"] = "Unit";

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

	var items_per_page = 10;
		
	var l_opInf= new Array()
	for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
	l_opInf[6128]= "Successfully Deleted!";
	l_opInf[6127]= "Successfully Inserted a New Record!";
	l_opInf[6126]= "Successfully Updated!";

	l_opInf[6138]= "Delete Failed!";
	l_opInf[6137]= "Insert Failed!";
	l_opInf[6136]= "Update Failed!";


	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 6101,6104,6105,6106,6107];
	var ops_req_search = [-1, 6101];// search never required on this page




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
	if (priv >= 5 && curViewDetailState == opValues["listSchedOrder"]) 
	{
		newPage += displayOrderItemList (curPrivilage, curColumnToSort);
	}
	if (priv >= 5 && curViewDetailState == opValues["viewSchedOrder"]) 
	{
		newPage += displayOrderItemDetails (curPrivilage, curColumnToSort);
	}
		
	
	/* Display Form for Modify Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifySchedOrderForm"])	
	{
		newPage += displayModifyOrderItemForm();
	}
	/* Submit the Modification of Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifySchedOrderSubmit"])	
	{
		newPage += displayOrderItemList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Insert Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertSchedOrderForm"])	
	{
		newPage += displayInsertOrderItemForm();
	}
	/* Submit the Insertion of Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertSchedOrderSubmit"])	
	{
		newPage += displayOrderItemList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Delete a recorde of Order */
//	if (priv >= 8 && curViewDetailState == opValues["deleteSchedOrderForm"])	
//	{
//		newPage += displayDeleteOrderForm();
//	}
	/* Submit the Deletion of Order Details */
	if (priv >= 8 && curViewDetailState == opValues["deleteSchedOrderSubmit"])	
	{
		newPage += displayOrderItemList(curPrivilage, curColumnToSort);
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




function displayOrderItemList(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm ="";
	var aId;
	var i;

	
	//dispFrm += makespace("\t", indent) + displayGlblFrm();
	dispFrm += makespace("\t", indent) + btnGroupSchdOrder_HTML();
	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "order_schd.cgi", "pg_3");

	
	dispFrm += makespace("\t", indent) + "<tr>\n";
	dispFrm += makespace("\t", indent) + "<td>\n";
	dispFrm += makespace("\t", indent+1) + "<form name=\"list_order\" method=\"get\" id=\"list_order\" action=\"order_schd.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	dispFrm += " <ul id=\"tabmenu\">\n";
	dispFrm += "<li>" + otherText["tab_order"] + "</li>\n";
	dispFrm += "</ul>\n";

	dispFrm += "<div class=\"adminform\">\n";

	dispFrm += makespace("\t", indent+2) + "<table width=\"100%\">\n";
	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makespace("\t", indent+2) + "<td class=\"infotext\">\n";

	// hidden area for passing values between web pages
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["listSchedOrder"] + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + orderNo + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	dispFrm += makespace("\t", indent+2) + "</td>\n";
	dispFrm += makespace("\t", indent+2) + "</tr>\n";


	for(i in order_det_jstab)
	{
		if (i > 0 )
		{
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, orderTitle["customer_name"], order_det_jstab[i][0], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, orderTitle["delivery_name"], order_det_jstab[i][2], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, orderTitle["order_code"], order_det_jstab[i][1], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, orderTitle["delivery_date"], order_det_jstab[i][3], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, orderTitle["order_status"], order_det_jstab[i][4], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

		}
	}

	dispFrm += makespace("\t", indent+2) + "</table>\n";
	dispFrm += makespace("\t", indent+2) + "</div>\n";

	dispFrm += makespace("\t", indent+1) + "</form>\n";

	dispFrm += makespace("\t", indent) + "</td>\n";	
	dispFrm += makespace("\t", indent) + "</tr> \n";
  
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

	for(i in order_item_jstab)
	{
		if (i>0)
		{
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone =2; //0;
			for(var j=0; j<column_headers.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(order_item_jstab[i][howmanyDone]) + "<\/td>";
				} 
				else 
				{
					dispFrm += makespace("\t", indent+2) + "<td>\n";				  
					if(howmanyDone==2) // means time to display the drop list and table
					{
						dispFrm += makespace("\t", indent+3) + "<form name=\"select_action_" + i + "\" id=\"select_action_" + i + "\" >\n";
						dispFrm += makespace("\t", indent+4) + "<table border=\"0\">\n";
						dispFrm += makespace("\t", indent+4) + "<tr>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\"> <span style=\"COLOR: #FF0000;\">" + obs(order_item_jstab[i][howmanyDone]) + "</span>\n";
              
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + order_item_jstab[i][howmanyDone-2] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCmpy\" id=\"prodCmpy\" value=\"" + order_item_jstab[i][howmanyDone-1] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCd\" id=\"prodCd\" value=\"" + order_item_jstab[i][howmanyDone] + "\">\n";

						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

						dispFrm += makespace("\t", indent+5) + preqstr_field ();
						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

						dispFrm += makespace("\t", indent+5) + op_list (curPrivilage, order_item_jstab[i][howmanyDone-1], order_item_jstab[i][howmanyDone], i, order_item_jstab[i][9]);

						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "</tr>\n";
						dispFrm += makespace("\t", indent+4) + "</table>\n";
						dispFrm += makespace("\t", indent+3) + "</form>\n";
					}
					else
					{
						dispFrm += makespace("\t", indent+3) + obs(order_item_jstab[i][howmanyDone]);
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
  
//	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "order_schd.cgi", "pg_3");
//	dispFrm += makespace("\t", indent) + btnGroupSchdOrder_HTML();

	return dispFrm;
}



function displayOrderItemDetails(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm = "";

	return dispFrm;
}





function displayModifyOrderItemForm ()
{
	var indent = 1;
	var updFrm = "";

	updFrm += makespace("\t", indent) + btnGroupModifySchedOrder_HTML();

	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td>\n";
	updFrm += makespace("\t", indent+1) + "<form name=\"edit_ord_detail\" method=\"get\" id=\"edit_ord_detail\" action=\"order_schd.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + otherText["msg_updSchdOrder_fSet"] + "</li>\n";
	updFrm += "</ul>\n";
	updFrm += "<div class=\"adminform\">\n";

//	updFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	updFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_updSchdOrder_fSet"] + "</strong></legend>\n";

	updFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	updFrm += makespace("\t", indent+4) + "<br>\n";
	updFrm += makespace("\t", indent+4) + otherText["msg_updSchdOrder_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifySchedOrderSubmit"] + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + orderNo + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_order_prod_key\" id=\"frm_order_prod_key\" value=\"" + frm_order_prod_key + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_osprod_prodcmpy\" id=\"frm_osprod_prodcmpy\" value=\"" + frm_osprod_prodcmpy + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_prod_code\" id=\"frm_prod_code\" value=\"" + frm_prod_code + "\">\n";

	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	updFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(3, orderTitle["prod_name"], frm_prod_name, "frm_prod_name", "frm_prod_name", "", 10, 9, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(3, orderTitle["pack_size"], frm_pack_size, "frm_pack_size", "frm_pack_size", "", 10, 9, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row
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
	updFrm += makefield(1, orderTitle["qty_ordered"], frm_qty_ordered, "frm_qty_ordered", "frm_qty_ordered", "", 20, 19, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", otherText["msg_enterOrderedQty"]+"( >="+minVal+" )", "*", indent+4, 100);

	updFrm += makefield(3, orderTitle["qty_scheduled"], frm_qty_scheduled, "frm_qty_scheduled", "frm_qty_scheduled", "", 20, 19, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 3rd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(3, orderTitle["qty_loaded"], frm_qty_loaded, "frm_qty_loaded", "frm_qty_loaded", "", 20, 19, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(3, orderTitle["qty_delivered"], frm_qty_delivered, "frm_qty_delivered", "frm_qty_delivered", "", 20, 19, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 4th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(3, orderTitle["prod_unit"], frm_prod_unit, "frm_prod_unit", "frm_prod_unit", "", 10, 9, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
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


function displayInsertOrderItemForm ()
{
	var indent = 1;
	var addFrm = "";

	addFrm += makespace("\t", indent) + btnGroupInsertSchedOrder_HTML();

	addFrm += makespace("\t", indent) + "<tr>\n";
	addFrm += makespace("\t", indent) + "<td>\n";
	addFrm += makespace("\t", indent+1) + "<form name=\"add_ord_detail\" method=\"get\" id=\"add_ord_detail\" action=\"order_schd.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	addFrm += " <ul id=\"tabmenu\">\n";
	addFrm += "<li>" + otherText["msg_addSchdOrder_fSet"] + "</li>\n";
	addFrm += "</ul>\n";
	addFrm += "<div class=\"adminform\">\n";

//	addFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	addFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_addSchdOrder_fSet"] + "</strong></legend>\n";

	addFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	addFrm += makespace("\t", indent+4) + "<br>\n";
	addFrm += makespace("\t", indent+4) + otherText["msg_addSchdOrder_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["insertSchedOrderSubmit"] + "\">\n";

	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + orderNo + "\">\n";

	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_order_prod_key\" id=\"frm_order_prod_key\" value=\"" + orderNo + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_osprod_prodcmpy\" id=\"frm_osprod_prodcmpy\" value=\"" + suppCd + "\">\n";

	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_prod_code\" id=\"frm_prod_code\" value=\"" + frm_prod_code + "\">\n";

	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	addFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";


	// 1st row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(3, orderTitle["prod_name"], frm_prod_name, "frm_prod_name", "frm_prod_name", "", 10, 9, "", "", "&nbsp;", indent+4, 100);
	addFrm += makefield(3, orderTitle["pack_size"], frm_pack_size, "frm_pack_size", "frm_pack_size", "", 10, 9, "", "", "&nbsp;", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(3, orderTitle["qty_ordered"], frm_qty_ordered, "frm_qty_ordered", "frm_qty_ordered", "", 20, 19, "", "", "&nbsp;", indent+4, 100);
	addFrm += makefield(3, orderTitle["qty_scheduled"], frm_qty_scheduled, "frm_qty_scheduled", "frm_qty_scheduled", "", 20, 19, "", "", "&nbsp;", indent+4, 100);
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
	addFrm += makefield(1, orderTitle["qty_loaded"], frm_qty_loaded, "frm_qty_loaded", "frm_qty_loaded", "", 20, 19, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\""+frm_qty_ordered+"\" ndec=\""+decVal+"\" ", otherText["msg_enterLoadedQty"]+"( "+minVal+"~"+frm_qty_ordered+" )", "*", indent+4, 100);

	addFrm += makefield(1, orderTitle["qty_delivered"], frm_qty_delivered, "frm_qty_delivered", "frm_qty_delivered", "", 20, 19, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\""+frm_qty_ordered+"\" ndec=\""+decVal+"\" ", otherText["msg_enterDeliveredQty"]+"( "+minVal+"~"+frm_qty_ordered+" )", "*", indent+4, 100);
/*
	addFrm += makefield(1, orderTitle["qty_loaded"], frm_qty_loaded, "frm_qty_loaded", "frm_qty_loaded", "", 20, 19, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", otherText["msg_enterLoadedQty"]+"( >="+minVal+" )", "*", indent+4, 100);

	addFrm += makefield(1, orderTitle["qty_delivered"], frm_qty_delivered, "frm_qty_delivered", "frm_qty_delivered", "", 20, 19, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", otherText["msg_enterDeliveredQty"]+"( >="+minVal+" )", "*", indent+4, 100);
*/
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 4th row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(3, orderTitle["prod_unit"], frm_prod_unit, "frm_prod_unit", "frm_prod_unit", "", 10, 9, "", "", "&nbsp;", indent+4, 100);
	addFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
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




function btnGroupSchdOrder_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";
/*
	if(priv>=7)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('order_schd.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&op=" + opValues["insertSchedOrderForm"] + "'); ", otherText["btn_addLoadDelvQty"]);
	}
*/

//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

	// Back to Order Entry and Maintenance
	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_ent_maint.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&op=" + opValues["listOrder"] + "'); ", otherText["btn_bakto_orders"]);

	// Back to Order Listing
	//Site manager can always click on order lists
	//Only leaving the btn_bakto_orders order entries screen
	//btn_HTML += btnLocation_HTML("justChaneMyLocation('order_list.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&ordStatus=-1&termCd='+termCd+'&op=" + opValues["listOrderList"] + "'); ", otherText["btn_bakto_orderlists"]);

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


	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_schd.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&op=" + opValues["listSchedOrder"] + "'); ", otherText["btn_bakto_schdOrderPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function btnGroupModifySchedOrder_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";
/*
	if (priv >= 7)
	{
		btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('order_schd.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&prevOp=" + opValues["modifySchedOrderForm"] + "&op=" + opValues["insertAddressForm"] + "&delivCd='+delivCd); ", otherText["btn_addNew_delivAddr"]);
	}
*/
	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_schd.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&op=" + opValues["listSchedOrder"] + "'); ", otherText["btn_bakto_schdOrderPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function btnGroupInsertSchedOrder_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";
/*
	if (priv >= 7)
	{
		btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('order_schd.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&prevOp=" + opValues["insertSchedOrderForm"] + "&op=" + opValues["insertAddressForm"] + "&delivCd='+delivCd); ", otherText["btn_addNew_delivAddr"]);
	}
*/
	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_schd.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&op=" + opValues["listSchedOrder"] + "'); ", otherText["btn_bakto_schdOrderPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}







function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	if (op == opValues["listSchedOrder"])
	{
		pageHeading += otherText["pgHead_schdOrder"];
	}

	if(op == opValues["modifySchedOrderForm"] || op == opValues["modifySchedOrderSubmit"])
	{
		pageHeading += otherText["pgHead_schdOrderUpd"];
	}
	if(op == opValues["insertSchedOrderForm"] || op == opValues["insertSchedOrderSubmit"])
	{
		pageHeading += otherText["pgHead_schdOrderAdd"];
	}
	if(op == opValues["deleteSchedOrderForm"] || op == opValues["deleteSchedOrderSubmit"])
	{
		pageHeading += otherText["pgHead_schdOrderDel"];
	}

	return pageHeading; 
}



function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	if (op == opValues["listSchedOrder"])
	{
		pageTitle += otherText["pgTitle_schdOrder"];
	}

	if(op == opValues["modifySchedOrderForm"] || op == opValues["modifySchedOrderSubmit"])
	{
		pageTitle += otherText["pgTitle_schdOrderUpd"];
	}
	if(op == opValues["insertSchedOrderForm"] || op == opValues["insertSchedOrderSubmit"])
	{
		pageTitle += otherText["pgTitle_schdOrderAdd"];
	}
	if(op == opValues["deleteSchedOrderForm"] || op == opValues["deleteSchedOrderSubmit"])
	{
		pageTitle += otherText["pgTitle_schdOrderDel"];
	}

	return pageTitle;
}



/* define function op_list() */
function op_list(priv, prodCmpy, prodCd, frmNum, ordStatus)
{
	/* priv = 
		6 modify	op=1,2,3
		7 add		op=4
		8 delete	op=5
	*/
	var op_list = "";
	op_list += "<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+prodCmpy+"', '"+prodCd+"', '"+frmNum+"', '"+ordStatus+"');\">          ";

	switch (priv)
	{
		case 8:
//			op_list += "<option value=\"" + opValues["deleteSchedOrderSubmit"] + "\">" + commText["Delete"] + "</option>";

		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */
			op_list += "<option value=\"" + opValues["insertSchedOrderForm"] + "\">" + otherText["addLoadDelvQty"] + "</option>";

		case 6:     
			op_list += "<option value=\"" + opValues["modifySchedOrderForm"] + "\">" + commText["Modify"] + "</option>";

		case 5:			/* Find Has not been implemented yet*/
//			op_list += "<option value=\"" + opValues["insertSchedOrderForm"] + "\">" + otherText["addLoadDelvQty"] + "</option>";
			//Following has been commented out
                       //This is still TO DO Bugzilla Bug Id 3096
			//op_list += "<option value=\"" + opValues["listSchedule"] + "\">" + otherText["schedule"] + "</option>";
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
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg-1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listSchedOrder"] + "'); ", otherText["btn_prev_page"]);
	}

	nextPgHTML += "&nbsp; Current=" + curPg + "/" + totalPages + " &nbsp; ";
	if (totalPages > curPg)
	{
//		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg+1) + "' );\">Next</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg+1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listSchedOrder"] + "'); ", otherText["btn_next_page"]);
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
		nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&op=" + opValues["listSchedOrder"] + "'); ", "&lt;&lt;");
		foobar = page_number - 1;
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&op=" + opValues["listSchedOrder"] + "'); ", "<b>&lt;<\/b>");
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&op=" + opValues["listSchedOrder"] + "'); ", foobar1 + "-" + foobar2);
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
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&op=" + opValues["listSchedOrder"] + "'); ", i);
	}
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	for (var i=page_number+1; i<foobar2; i++) 
	{
		//alert("I am in for for foobar2 loop "+i);	
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&op=" + opValues["listSchedOrder"] + "'); ", i);
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&op=" + opValues["listSchedOrder"] + "'); ", tempTxt);
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
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&op=" + opValues["listSchedOrder"] + "'); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&op=" + opValues["listSchedOrder"] + "'); ", "<b>&gt;&gt;<\/b>");
	} 
	else 
	{
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}


	nextPgHTML += "</td>\n ";
	nextPgHTML += "</tr> \n";

	return nextPgHTML;
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
	newPage += "function submitAction(myobject, prodCmpy, prodCd, frmNum, ordStatus)\n";
	newPage += "{\n";
	newPage += "	var myCurQstring=produceQString();\n";
	newPage += "	var myselectedvalue = myobject.options[myobject.selectedIndex].value;";

	newPage += "	if(myselectedvalue==\"" + opValues["deleteSchedOrderSubmit"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(ordStatus < orderStatusGate)\n";
	newPage += "		{\n";
	newPage += "			if(confirm('" + otherText["msg_del_confirm"] + "'))\n";
	newPage += "			{\n";
	newPage += "				eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "				eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["deleteSchedOrderSubmit"] + "+\"';\");\n";

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

	newPage += "	else if(myselectedvalue==\"" + opValues["modifySchedOrderForm"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(ordStatus < orderStatusGate)\n";
	newPage += "		{\n";
	newPage += "				eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "				eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["modifySchedOrderForm"] + "+\"';\");\n";

	newPage += "				eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "				return true;\n";
	newPage += "		}\n";
	newPage += "		else\n";
	newPage += "		{\n";
	newPage += "			eval(\"alert(orderStatusStr[ordStatus]);\");\n";
	newPage += "		}\n";
	newPage += "		eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
  	newPage += "	}\n";

	newPage += "	else if(myselectedvalue==\"" + opValues["insertSchedOrderForm"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(ordStatus != 6)\n";
	newPage += "		{\n";
	newPage += "				eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "				eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["insertSchedOrderForm"] + "+\"';\");\n";

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
	newPage += "		document.location.href=\"pricing.cgi?termCd="+termCd+"&orderNo="+orderNo+"&op="+opValues["listPricing"]+"&prevOp="+opValues["listSchedOrder"]+"&pg=1&prodCmpy=\"+prodCmpy+\"&prodCd=\"+prodCd+\"&cmpyCd="+cmpyCd+"&suppCd="+suppCd+"&custAcc="+custAcc+"\";\n";
	newPage += "	}\n";

	newPage += "	else if(myselectedvalue==\"" + opValues["listSchedule"] + "\")\n";
	newPage += "	{\n";
	newPage += "		document.location.href=\"order_schd.cgi?termCd="+termCd+"&orderNo="+orderNo+"&op="+opValues["listSchedule"]+"&pg=1&prodCmpy=\"+prodCmpy+\"&prodCd=\"+prodCd+\"&cmpyCd="+cmpyCd+"&suppCd="+suppCd+"&custAcc="+custAcc+"\";\n";
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

