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
			"PRODUCT CODE", "DESCRIPTION", "QUANTITY", "UNIT", "PRICE PER UNIT (" + moneyCurrency + ")", "AMOUNT (" + moneyCurrency + ")"
	];
		


	var otherText = new Array();
	otherText["youraction"] =  "YOUR ACTION";

	otherText["btn_addNew_payment"] =  "Add Payment";
	otherText["btn_upd_orderLimit"] =  "Modify Order Limit";
	otherText["btn_invoice"] =  "Invoice";
	otherText["btn_approve"] =  "Approve";


	otherText["btn_bakto_orderDetails"] =  "Back to Order Details Page";

	otherText["btn_bakto_ordApprovPg"] =  "Back to Order Approval";

	otherText["btn_next_page"] =  "Next";
	otherText["btn_prev_page"] =  "Previous";
	
	otherText["tab_supp_cust"] =  "Supplier and Customer Details";

	otherText["pgTitle_ordApprov"] =  "Customer Order Processing, Order Entry and Maintenance, Order Details, Order Approval";
	otherText["pgTitle_ordApprovUpd"] =  "Customer Order Processing, Order Entry and Maintenance, Order Details, Order Approval, Modify Order Limit";
	otherText["pgTitle_ordApprovAdd"] =  "Customer Order Processing, Order Entry and Maintenance, Order Details, Order Approval, Add Payment";
	otherText["pgTitle_ordApprovDel"] =  "Customer Order Processing, Order Entry and Maintenance, Order Details, Order Approval, Delete";

	otherText["pgHead_ordApprov"] =  "Order Approval";
	otherText["pgHead_ordApprovUpd"] =  "Modify Order Limit";
	otherText["pgHead_ordApprovAdd"] =  "Add Customer Payment";
	otherText["pgHead_ordApprovDel"] =  "Delete Order Approval";

	otherText["msg_del_confirm"] =  "Are you sure you want to delete?";

    otherText["msg_updordApprov_fSet"] =  "Order Limit";
    otherText["msg_updordApprov_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_addordApprov_fSet"] =  "Customer Payment Entry";
    otherText["msg_addordApprov_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";


	otherText["msg_selPaymentType"] = "Select a payment type!";
	otherText["msg_selPaymentInvoice"] = "Select an invoice No!";
	otherText["msg_enterPaymentAmount"] = "Please enter the payment ";

	otherText["msg_enterOrderLimit"] = "Please enter the order limit ";

	otherText["selectDate"] = "Select Date";

	otherText["Days"] = "DAYS";

	otherText["Pack"] = "PACK";

	var orderTitle = new Array();

	orderTitle["payment_acct"] = "Account";
	orderTitle["payment_supp"] = "Supplier";
	orderTitle["payment_cust"] = "Customer";

	orderTitle["payment_invoice"] = "Invoice";
	orderTitle["payment_amount"] = "Amount (" + moneyCurrency + ")";
	orderTitle["payment_type"] = "Type";


	orderTitle["order_limit"] = "Order Limit (" + moneyCurrency + ")";


	orderTitle["header_title"] = "ORDER APPROVAL";

	orderTitle["header_supply_terminal"] = "SUPPLY TERMINAL";
	orderTitle["header_customer_address"] = "CUSTOMER ADDRESS";
	orderTitle["header_delivery_location"] = "DELIVERY LOCATION";

	orderTitle["header_page"] = "PAGE";
	orderTitle["header_issue_date"] = "ISSUE DATE";
	orderTitle["header_docket_no"] = "DOCKET NO";
	orderTitle["header_terms"] = "TERMS";

	orderTitle["header_account"] = "ACCOUNT";
	orderTitle["header_ord"] = "ORDER";
	orderTitle["header_ref"] = "REF CODE";
	orderTitle["header_orddate"] = "ORDER DATE";
	orderTitle["header_topic"] = "DETAILS AND TOTALS";

	orderTitle["sum_product_total"] = "PRODUCT TOTAL (" + moneyCurrency + ")";
	orderTitle["sum_delivery_charges"] = "DELIVERY CHARGES (" + moneyCurrency + ")";
	orderTitle["sum_sub_total"] = "SUB TOTAL (" + moneyCurrency + ")";
	orderTitle["sum_tax"] = "VALUE ADDED TAX (" + moneyCurrency + ")";
	orderTitle["sum_total_amount"] = "TOTAL AMOUNT OWED (" + moneyCurrency + ")";


	var displayPriceOffsets = 1;
	var ContractPricing = 2;

	var dateFormat = "yyyy-MM-dd";
//	var dateFormat = "dd-NNN-yyyy";

	var l_opInf= new Array()
	for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
	l_opInf[6528]= "Successfully Deleted!";
	l_opInf[6527]= "Successfully Added a New Payment!";
	l_opInf[6526]= "Successfully Updated the Order Limit!";

	l_opInf[6538]= "Delete Failed!";
	l_opInf[6537]= "Failed to Add a New Payment!";
	l_opInf[6536]= "Failed to Update the Order Limit!";

	l_opInf[6522]= "Successfully Added a New Invoice!";
	l_opInf[6523]= "Successfully Approved an Order!";

	l_opInf[6532]= "Failed to Add a New Invoice!";
	l_opInf[6533]= "Failed to Approve the Order!";

	l_opInf[6542]= "This invoice already existed!";
	l_opInf[6543]= "Order has been approved already!";

	l_opInf[6552]= "Invoice can't be created because the order hasn't been approved yet!";
	l_opInf[6553]= "Order can't be approved because you may not have enough Credit Limit or other conditions!";

	l_opInf[6563]= "Order can't be approved because some products are not available at this depot!";
	l_opInf[6573]= "Order can't be approved because Customer Allocation is locked!";


	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 6501,6502,6503,6504,6505,6506,6507];
	var ops_req_search = [-1, 6501];// search never required on this page



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
	if (priv >= 5 && curViewDetailState == opValues["listOrderApproval"]) 
	{
		newPage += displayordApprovList (curPrivilage, curColumnToSort);
	}
	if (priv >= 5 && curViewDetailState == opValues["viewOrderApproval"]) 
	{
		newPage += displayordApprovDetails (curPrivilage, curColumnToSort);
	}
		
	
	/* Display Form for Modify Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyOrderApprovalForm"])	
	{
		newPage += displayModifyOrdApprovForm();
	}
	/* Submit the Modification of Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyOrderApprovalSubmit"])	
	{
		newPage += displayordApprovList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Insert Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertOrderApprovalForm"])	
	{
		newPage += displayInsertOrdApprovForm();
	}
	/* Submit the Insertion of Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertOrderApprovalSubmit"])	
	{
		newPage += displayordApprovList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Delete a recorde of Order */
//	if (priv >= 8 && curViewDetailState == opValues["deleteOrderApprovalForm"])	
//	{
//		newPage += displayDeleteOrderForm();
//	}
	/* Submit the Deletion of Order Details */
	if (priv >= 8 && curViewDetailState == opValues["deleteOrderApprovalSubmit"])	
	{
		newPage += displayordApprovList(curPrivilage, curColumnToSort);
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




function displayordApprovHeader(type)
{
	var indent = 1;
	var dispFrm ="";
	var aId;
	var i;
	var j;
	var count;
	var addr_tmp="";

	var term_addr = new Array();
	term_addr[1] = "";
	term_addr[2] = "";
	term_addr[3] = "";
	term_addr[4] = "";
	term_addr[5] = "";

	var cust_addr = new Array();
	cust_addr[1] = "";
	cust_addr[2] = "";
	cust_addr[3] = "";
	cust_addr[4] = "";
	cust_addr[5] = "";

	var dlv_addr = new Array();
	dlv_addr[1] = "";
	dlv_addr[2] = "";
	dlv_addr[3] = "";
	dlv_addr[4] = "";
	dlv_addr[5] = "";

	
	dispFrm += makespace("\t", indent) + "<tr>\n";
	dispFrm += makespace("\t", indent) + "<td>\n";
	dispFrm += makespace("\t", indent+1) + "<form name=\"list_ord_approv\" method=\"get\" id=\"list_ord_approv\" action=\"order_approve.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

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


	for(i in order_det_jstab)
	{
		if (i > 0 )
		{
			// row 1
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makespace("\t", indent+2) + "<td colspan=\"7\" class=\"infotextheading\" align=center> \n";
			dispFrm += "<u>" + orderTitle["header_title"] + "</u>";
			dispFrm += makespace("\t", indent+2) + "</td> \n";
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			// row 2
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, orderTitle["header_page"], order_det_jstab[i][0], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			// row 3
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			if (order_det_jstab[i][1] == "")
			{
				order_det_jstab[i][1] = getCurrDate();
			}
			dispFrm += makefield(0, orderTitle["header_issue_date"], order_det_jstab[i][1], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			// row 4
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, orderTitle["header_docket_no"], order_det_jstab[i][2], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			// row 5
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", orderTitle["header_supply_terminal"], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, orderTitle["header_terms"], order_det_jstab[i][3]+"&nbsp;&nbsp;"+otherText["Days"], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			// row 6
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", order_det_jstab[i][4], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			count = 0;
			for(j in addresses_jslst)
			{
				if (addresses_jslst[j][2] == order_det_jstab[i][5])
				{
					term_addr[ addresses_jslst[j][0] ] = addresses_jslst[j][1];
					count += 1;
				}
				if (count >= 5)
				{
					break;
				}
			}
			// row 7
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", term_addr[1], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			// row 7.1
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", term_addr[2], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			// row 7.2
			addr_tmp = term_addr[3];
			if ( addr_tmp != "" && term_addr[4] != "")
			{
				addr_tmp = addr_tmp + ", " + term_addr[4];
			}
			else
			{
				addr_tmp = addr_tmp + term_addr[4];
			}
			if ( addr_tmp != "" && term_addr[5] != "")
			{
				addr_tmp = addr_tmp + ", " + term_addr[5];
			}
			else
			{
				addr_tmp = addr_tmp + term_addr[5];
			}
//			addr_tmp = term_addr[3]+", "+term_addr[4]+", "+term_addr[5];
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", addr_tmp, "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";


			// row 8
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			// row 9
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", orderTitle["header_customer_address"],  "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			// row 10
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", order_det_jstab[i][6], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, orderTitle["header_account"], order_det_jstab[i][7], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			count = 0;
			for(j in addresses_jslst)
			{
				if (addresses_jslst[j][2] == order_det_jstab[i][8])
				{
					cust_addr[ addresses_jslst[j][0] ] = addresses_jslst[j][1];
					count += 1;
				}
				if (count >= 5)
				{
					break;
				}
			}
			// row 11
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", cust_addr[1], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, orderTitle["header_ord"], order_det_jstab[i][9], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			// row 12
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", cust_addr[2], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, orderTitle["header_ref"], order_det_jstab[i][10], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			// row 13
			addr_tmp = cust_addr[3];
			if ( addr_tmp != "" && cust_addr[4] != "")
			{
				addr_tmp = addr_tmp + ", " + cust_addr[4];
			}
			else
			{
				addr_tmp = addr_tmp + cust_addr[4];
			}
			if ( addr_tmp != "" && cust_addr[5] != "")
			{
				addr_tmp = addr_tmp + ", " + cust_addr[5];
			}
			else
			{
				addr_tmp = addr_tmp + cust_addr[5];
			}
//			addr_tmp = cust_addr[3]+", "+cust_addr[4]+", "+cust_addr[5];
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", addr_tmp, "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, orderTitle["header_orddate"], order_det_jstab[i][11], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			// row 14
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			// row 15
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", orderTitle["header_delivery_location"], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			// row 16
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", order_det_jstab[i][12], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			count = 0;
			for(j in addresses_jslst)
			{
				if (addresses_jslst[j][2] == order_det_jstab[i][13])
				{
					dlv_addr[ addresses_jslst[j][0] ] = addresses_jslst[j][1];
					count += 1;
				}
				if (count >= 5)
				{
					break;
				}
			}
			// row 17
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", dlv_addr[1], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			// row 18
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", dlv_addr[2], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

			// row 19
			addr_tmp = dlv_addr[3];
			if ( addr_tmp != "" && dlv_addr[4] != "")
			{
				addr_tmp = addr_tmp + ", " + dlv_addr[4];
			}
			else
			{
				addr_tmp = addr_tmp + dlv_addr[4];
			}
			if ( addr_tmp != "" && dlv_addr[5] != "")
			{
				addr_tmp = addr_tmp + ", " + dlv_addr[5];
			}
			else
			{
				addr_tmp = addr_tmp + dlv_addr[5];
			}
//			addr_tmp = dlv_addr[3]+", "+dlv_addr[4]+", "+dlv_addr[5];
			dispFrm += makespace("\t", indent+2) + "<tr> \n";
			dispFrm += makefield(0, "&nbsp;", addr_tmp, "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
			dispFrm += makespace("\t", indent+2) + "</tr> \n";

		}
	}

	dispFrm += makespace("\t", indent+2) + "</table>\n";

	dispFrm += makespace("\t", indent+1) + "</form>\n";

	dispFrm += makespace("\t", indent) + "</td>\n";	
	dispFrm += makespace("\t", indent) + "</tr> \n";

	return dispFrm;
}



function displayordApprovList(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm ="";
	var aId;
	var i;
	var is_right_pricing;
	var k;

	
	//dispFrm += makespace("\t", indent) + displayGlblFrm();
	dispFrm += makespace("\t", indent) + btnGroupOrdApprov_HTML();
//	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "order_approve.cgi", "pg_3");

	dispFrm += displayordApprovHeader(1);
  
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
			if ( order_item_jstab[i][9] != 1)
			{
				order_item_jstab[i][5] = otherText["Pack"] + "(" + order_item_jstab[i][9] + order_item_jstab[i][5] + ")";
			}

			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone =2;
			for(var j=0; j<column_headers.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(order_item_jstab[i][howmanyDone]) + "<\/td>";
				} 
				else 
				{
					dispFrm += makespace("\t", indent+2) + "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						dispFrm += makespace("\t", indent+3) + "<form name=\"select_action_" + i + "\" id=\"select_action_" + i + "\" >\n";
						dispFrm += makespace("\t", indent+4) + "<table border=\"0\">\n";
						dispFrm += makespace("\t", indent+4) + "<tr>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\"> <span style=\"COLOR: #FF0000;\">" + obs(order_item_jstab[i][howmanyDone]) + "</span>\n";
              
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + orderNo + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCmpy\" id=\"prodCmpy\" value=\"" + prodCmpy + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCd\" id=\"prodCd\" value=\"" + prodCd + "\">\n";

						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

						dispFrm += makespace("\t", indent+5) + preqstr_field ();
						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

						dispFrm += makespace("\t", indent+5) + op_list (curPrivilage, order_item_jstab[i][8], order_item_jstab[i][7], i);

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
	 
			dispFrm += makespace("\t", indent) + "\n";
			dispFrm += makespace("\t", indent+2) + "</tr>";

			if ( order_item_jstab[i][10] == ContractPricing )
			{
				displayPriceOffsets = 0;
			}
			if ( displayPriceOffsets == 1)
			{
				// The loop for pricing of product
				is_right_pricing = 0;
				for(k in pricing_jslst)
				{
					if ( ( pricing_jslst[k][2]<=4 ) && ( pricing_jslst[k][2]>=0 ) )
					{
						is_right_pricing = 1;
					}
					else
					if ( ( pricing_jslst[k][2] == 5) && ( pricing_jslst[k][8] == order_item_jstab[i][0] ) )
					{
						is_right_pricing = 1;
					}
					else
					if ( ( pricing_jslst[k][2] == 6) && ( ( pricing_jslst[k][8] == order_item_jstab[i][0]  ) && ( pricing_jslst[k][9] == order_item_jstab[i][2] ) && ( pricing_jslst[k][10] == order_item_jstab[i][1] ) ) )
					{
						is_right_pricing = 1;
					}
					else
					if ( ( pricing_jslst[k][2] == 7) && ( ( pricing_jslst[k][8] == order_item_jstab[i][0]  ) && ( pricing_jslst[k][9] == order_item_jstab[i][2] ) && ( pricing_jslst[k][10] == order_item_jstab[i][1] ) && ( pricing_jslst[k][11] == order_item_jstab[i][11] ) ) )
					{
						is_right_pricing = 1;
					}
					else
					{
						is_right_pricing = 0;
					}

//					alert( pricing_jslst[k][11]+" == "+order_item_jstab[i][10]);
					if ( ( k > 0 ) 
					 &&  ( pricing_jslst[k][7] == "Y" )
					 &&  ( ( order_item_jstab[i][9] <=1 && pricing_jslst[k][12] == 0 ) ||
						   ( order_item_jstab[i][9] > 1 && pricing_jslst[k][12] < 2 ) )
					 &&  ( is_right_pricing == 1 ) )
					{
						dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
						{
							dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs("&nbsp;") + "<\/td>";
							dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(pricing_jslst[k][1]) + "<\/td>";
							if ( pricing_jslst[k][3] == 0)
							{
								dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE;color:green\">" + obs(pricing_jslst[k][4]*(-1)) + "<\/td>";
							}
							else
							{
								dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE;color:red\">" + obs(pricing_jslst[k][4]) + "<\/td>";
							}
							dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(pricing_jslst[k][5]) + "<\/td>";
							dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs("&nbsp;") + "<\/td>";
							dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs("&nbsp;") + "<\/td>";
						} // end of inner for loop
						dispFrm += makespace("\t", indent) + "\n";
						dispFrm += makespace("\t", indent+2) + "</tr>";
					}
				}
			}
		}

	}

	dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
	dispFrm += makespace("\t", indent+2) + "<td colspan=\"6\" style=\"background-color:#EEEEEE\">" + obs("&nbsp;") + "<\/td>";
	dispFrm += makespace("\t", indent) + "\n";
	dispFrm += makespace("\t", indent+2) + "</tr>";

	//inv_tot --- deliv_charge
	k=0;
	for(k in pricing_jslst)
	{
		if ( ( k > 0 ) 
		 &&  ( pricing_jslst[k][7] == "Y" )
		 &&  ( pricing_jslst[k][12] == 2 ) 
		 &&  ( pricing_jslst[k][2] != 0 ) )
		{
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			{
				dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs("&nbsp;") + "<\/td>";
				dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(pricing_jslst[k][1]) + "<\/td>";
				if ( pricing_jslst[k][3] == 0)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE;color:green\">" + obs(pricing_jslst[k][4]*(-1)) + "<\/td>";
				}
				else
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE;color:red\">" + obs(pricing_jslst[k][4]) + "<\/td>";
				}
				dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(pricing_jslst[k][5]) + "<\/td>";
				dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs("&nbsp;") + "<\/td>";
				dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs("&nbsp;") + "<\/td>";
			} // end of inner for loop
			dispFrm += makespace("\t", indent) + "\n";
			dispFrm += makespace("\t", indent+2) + "</tr>";
		}

		var pov;
		if ( ( k > 0 ) 
		 &&  ( pricing_jslst[k][12] == 2 ) && ( pricing_jslst[k][2] != 0 ) )
		{
			if ( pricing_jslst[k][3] == 0)
			{//credit
				pov = pricing_jslst[k][4]*(-1.0);
			}
			else
			{
				pov = pricing_jslst[k][4];
			}

			if ( pricing_jslst[k][5] == "%" )
			{
				delivCharge = parseFloat(delivCharge) + parseFloat(pov * prodTotal / 100.0);
			}
			else
			{
				delivCharge = parseFloat(delivCharge) + parseFloat(pov);
			}
		}
	}

	dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
	dispFrm += makespace("\t", indent+2) + "<td colspan=\"6\" style=\"background-color:#EEEEEE\">" + obs("&nbsp;") + "<\/td>";
	dispFrm += makespace("\t", indent) + "\n";
	dispFrm += makespace("\t", indent+2) + "</tr>";

	subTotal = parseFloat(prodTotal) + parseFloat(delivCharge);

	//site_charge, vat?
	k=0;
	for(k in pricing_jslst)
	{
		var vat;
		var vatV;
		if ( ( k > 0 ) 
		 &&  ( pricing_jslst[k][12] == 2 ) && ( pricing_jslst[k][2] == 0 ) )
		{
			if ( pricing_jslst[k][3] == 0)
			{//credit
				vat = pricing_jslst[k][4]*(-1.0);
			}
			else
			{
				vat = pricing_jslst[k][4];
			}

			if ( pricing_jslst[k][5] == "%" )
			{
				vatV = parseFloat(vat * subTotal / 100.0);
			}
			else
			{
				vatV = parseFloat(vat);
			}

			taxValue = parseFloat(taxValue) + parseFloat(vatV);
		}

		if ( ( k > 0 ) 
		 &&  ( pricing_jslst[k][7] == "Y" )
		 &&  ( pricing_jslst[k][12] == 2 )
		 &&  ( pricing_jslst[k][2] == 0 ) )
		{
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			{
				dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs("&nbsp;") + "<\/td>";
				dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(pricing_jslst[k][1]) + "<\/td>";
				if ( pricing_jslst[k][3] == 0)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE;color:green\">" + obs(pricing_jslst[k][4]*(-1)) + "<\/td>";
				}
				else
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE;color:red\">" + obs(pricing_jslst[k][4]) + "<\/td>";
				}
				dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(pricing_jslst[k][5]) + "<\/td>";
				dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs("&nbsp;") + "<\/td>";
				if ( pricing_jslst[k][3] == 0)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE;color:green\">" + round_decimals(vatV, decNumber) + "<\/td>";
				}
				else
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE;color:red\">" + round_decimals(vatV, decNumber) + "<\/td>";
				}

//				dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs("&nbsp;") + "<\/td>";
			} // end of inner for loop
			dispFrm += makespace("\t", indent) + "\n";
			dispFrm += makespace("\t", indent+2) + "</tr>";
		}

	}



	dispFrm += makespace("\t", indent+1) + "</tbody>";
	dispFrm += makespace("\t", indent+1) + "</table>";
	dispFrm += makespace("\t", indent) + "</div>\n";
//	dispFrm += makespace("\t", indent) + "</td>";	
//	dispFrm += makespace("\t", indent) + "</tr>";     
	dispFrm += makespace("\t", indent) + "</td>\n ";
	dispFrm += makespace("\t", indent) + "</tr>\n";

  
	// the tail of table
	dispFrm += makespace("\t", indent) + "<tr> \n";
	dispFrm += makespace("\t", indent) + "<td> \n";
	dispFrm += makespace("\t", indent+1) + "<table width=\"100%\"> \n";

	dispFrm += makespace("\t", indent+2) + "<tr> \n";
	dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makefield(0, orderTitle["sum_product_total"], prodTotal, "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makespace("\t", indent+2) + "</tr> \n";


	dispFrm += makespace("\t", indent+2) + "<tr> \n";
	dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makefield(0, orderTitle["sum_delivery_charges"], round_decimals(delivCharge, decNumber), "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makespace("\t", indent+2) + "</tr> \n";

//	subTotal = parseFloat(prodTotal) + parseFloat(delivCharge);
	dispFrm += makespace("\t", indent+2) + "<tr> \n";
	dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makefield(0, orderTitle["sum_sub_total"], round_decimals(subTotal, decNumber), "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makespace("\t", indent+2) + "</tr> \n";

	dispFrm += makespace("\t", indent+2) + "<tr> \n";
	dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makefield(0, orderTitle["sum_tax"], round_decimals(taxValue, decNumber), "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makespace("\t", indent+2) + "</tr> \n";

	amountTotal = parseFloat(subTotal) + parseFloat(taxValue);
	dispFrm += makespace("\t", indent+2) + "<tr> \n";
	dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makefield(0, orderTitle["sum_total_amount"], round_decimals(amountTotal, decNumber), "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makespace("\t", indent+2) + "</tr> \n";

	dispFrm += makespace("\t", indent+1) + "</table> \n";
	dispFrm += makespace("\t", indent) + "</td> \n";
	dispFrm += makespace("\t", indent) + "</tr> \n";

//	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "order_approve.cgi", "pg_3");
//	dispFrm += makespace("\t", indent) + btnGroupOrdApprov_HTML();

	return dispFrm;
}



function displayordApprovDetails(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm = "";

	return dispFrm;
}





function displayModifyOrdApprovForm ()
{
	var indent = 1;
	var updFrm = "";
	var dateStr;

	updFrm += makespace("\t", indent) + btnGroupModifyOrdApprov_HTML();

	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td>\n";
	updFrm += makespace("\t", indent+1) + "<form name=\"edit_ord_limit\" method=\"get\" id=\"edit_ord_limit\" action=\"order_approve.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + otherText["msg_updordApprov_fSet"] + "</li>\n";
	updFrm += "</ul>\n";
	updFrm += "<div class=\"adminform\">\n";

//	updFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	updFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_updordApprov_fSet"] + "</strong></legend>\n";

	updFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	updFrm += makespace("\t", indent+4) + "<br>\n";
	updFrm += makespace("\t", indent+4) + otherText["msg_updordApprov_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyOrderApprovalSubmit"] + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + orderNo + "\">\n";

	updFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCmpy\" id=\"prodCmpy\" value=\"" + prodCmpy + "\">\n";
	updFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCd\" id=\"prodCd\" value=\"" + prodCd + "\">\n";

	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	updFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
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
	updFrm += makefield(1, orderTitle["order_limit"], frm_order_limit, "frm_order_limit", "frm_order_limit", "", 10, 9, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", otherText["msg_enterOrderLimit"]+"( >="+minVal+" )", "*", indent+4, 100);

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


function displayInsertOrdApprovForm ()
{
	var indent = 1;
	var addFrm = "";
	var i;
	var suppStr = "";
	var custStr = "";


	addFrm += makespace("\t", indent) + btnGroupInsertOrdApprov_HTML();

	for(i in cmpy_jslst)
	{
		if (cmpy_jslst[i][0] == suppCd)
		{
			suppStr = suppCd + "&nbsp;&nbsp;&nbsp;" + cmpy_jslst[i][1]; 
		}
		if (cmpy_jslst[i][0] == cmpyCd)
		{
			custStr = cmpyCd + "&nbsp;&nbsp;&nbsp;" + cmpy_jslst[i][1]; 
		}
	}

	addFrm += makespace("\t", indent) + "<tr> \n";
	addFrm += makespace("\t", indent) + "<td> \n";

	addFrm += " <ul id=\"tabmenu\">\n";
	addFrm += "<li>" + otherText["tab_supp_cust"] + "</li>\n";
	addFrm += "</ul>\n";

	addFrm += "<div class=\"adminform\">\n";
	addFrm += makespace("\t", indent+1) + "<table width=\"100%\"> \n";

	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(0, orderTitle["payment_acct"], custAcc, "", "", "", 0, 0,"", "", "&nbsp;", indent+2, 100);
	addFrm += makefield(0, orderTitle["payment_supp"], suppStr, "", "", "", 0, 0,"", "", "&nbsp;", indent+2, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	addFrm += makefield(0, orderTitle["payment_cust"], custStr, "", "", "", 0, 0,"", "", "&nbsp;", indent+2, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	addFrm += makespace("\t", indent+1) + "</table> \n";
	addFrm += makespace("\t", indent+1) + "</div> \n";

	addFrm += makespace("\t", indent) + "</td> \n";
	addFrm += makespace("\t", indent) + "</tr> \n";
	
	addFrm += makespace("\t", indent) + "<tr>\n";
	addFrm += makespace("\t", indent) + "<td>\n";
	addFrm += makespace("\t", indent+1) + "<form name=\"add_payment\" method=\"get\" id=\"add_payment\" action=\"order_approve.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	addFrm += " <ul id=\"tabmenu\">\n";
	addFrm += "<li>" + otherText["msg_addordApprov_fSet"] + "</li>\n";
	addFrm += "</ul>\n";
	addFrm += "<div class=\"adminform\">\n";

//	addFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	addFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_addordApprov_fSet"] + "</strong></legend>\n";

	addFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	addFrm += makespace("\t", indent+4) + "<br>\n";
	addFrm += makespace("\t", indent+4) + otherText["msg_addordApprov_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["insertOrderApprovalSubmit"] + "\">\n";

	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + orderNo + "\">\n";

	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCmpy\" id=\"prodCmpy\" value=\"" + prodCmpy + "\">\n";
	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCd\" id=\"prodCd\" value=\"" + prodCd + "\">\n";

	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";


	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	addFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	frm_payment_invoice = "";
	frm_payment_amount = "";
	frm_payment_type = "";

	// 1st row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
//	addFrm += makefield(2, orderTitle["payment_invoice"], frm_payment_invoice, "frm_payment_invoice", "frm_payment_invoice", invoice_jslst, 0, 0, "dataType=\"Require\"", otherText["msg_selPaymentInvoice"], "*", indent+4, 100);
	addFrm += makefield(2, orderTitle["payment_invoice"], frm_payment_invoice, "frm_payment_invoice", "frm_payment_invoice", invoice_jslst, 0, 0, "", "", "&nbsp;", indent+4, 100);
	addFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
//	addFrm += makefield(1, orderTitle["payment_amount"], frm_payment_amount, "frm_payment_amount", "frm_payment_amount", "", 10, 10, "dataType=\"Double\"", otherText["msg_enterPaymentAmount"], "*", indent+4, 100);
	var minVal = 1.0;
	var decVal = 1.0;
	var i;
	for (i=0; i<decNumber; i++)
	{
		minVal = minVal / 10.0;
		decVal = decVal * 10.0;
	}
	decVal = decVal * 10.0;
	addFrm += makefield(1, orderTitle["payment_amount"], frm_payment_amount, "frm_payment_amount", "frm_payment_amount", "", 10, 10, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", otherText["msg_enterPaymentAmount"]+"( >="+minVal+" )", "*", indent+4, 100);

	addFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 3rd row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(2, orderTitle["payment_type"], frm_payment_type, "frm_payment_type", "frm_payment_type", payment_jslst, 0, 0, "dataType=\"Require\"", otherText["msg_selPaymentType"], "*", indent+4, 100);
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


function getTotalAmount()
{
	var i;

	prodTotal = 0.0;
	
	for(i in order_item_jstab)
	{
		if (i>0)
		{
			prodTotal += order_item_jstab[i][7];
		}
	}

	// the tail of table
	subTotal = prodTotal + delivCharge;
	amountTotal = subTotal + taxValue;
}




function btnGroupOrdApprov_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	if(priv>=7)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('order_approve.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&op=" + opValues["insertOrderApprovalForm"] + "'); ", otherText["btn_addNew_payment"]);
	}
	if(priv>=6)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('order_approve.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&op=" + opValues["modifyOrderApprovalForm"] + "'); ", otherText["btn_upd_orderLimit"]);
	}
	if(priv>=7)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('order_approve.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&amountTotal='+amountTotal+'&op=" + opValues["invoiceOrderApprovalSubmit"] + "'); ", otherText["btn_invoice"]);
	}
	if(priv>=6)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('order_approve.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&op=" + opValues["approveOrderApprovalSubmit"] + "'); ", otherText["btn_approve"]);
	}

//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

//	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_approve.cgi?custAcc='+custAcc); ", otherText["btn_bakto_customer"]);
	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_det.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&op=" + opValues["listOrdDetail"] + "'); ", otherText["btn_bakto_orderDetails"]);


	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}




function btnGroupModifyOrdApprov_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";
/*
	if (priv >= 7)
	{
		btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('order_approve.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&prevOp=" + opValues["modifyOrderApprovalForm"] + "&op=" + opValues["insertAddressForm"] + "&delivCd='+delivCd); ", otherText["btn_addNew_delivAddr"]);
	}
*/
	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_approve.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&op=" + opValues["listOrderApproval"] + "'); ", otherText["btn_bakto_ordApprovPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function btnGroupInsertOrdApprov_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";
/*
	if (priv >= 7)
	{
		btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('order_approve.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&prevOp=" + opValues["insertOrderApprovalForm"] + "&op=" + opValues["insertAddressForm"] + "&delivCd='+delivCd); ", otherText["btn_addNew_delivAddr"]);
	}
*/
	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_approve.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&orderNo='+orderNo+'&prodCd='+prodCd+'&prodCmpy='+prodCmpy+'&op=" + opValues["listOrderApproval"] + "'); ", otherText["btn_bakto_ordApprovPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}






function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	if (op == opValues["listOrderApproval"])
	{
		pageHeading += otherText["pgHead_ordApprov"];
	}

	if(op == opValues["modifyOrderApprovalForm"] || op == opValues["modifyOrderApprovalSubmit"])
	{
		pageHeading += otherText["pgHead_ordApprovUpd"];
	}
	if(op == opValues["insertOrderApprovalForm"] || op == opValues["insertOrderApprovalSubmit"])
	{
		pageHeading += otherText["pgHead_ordApprovAdd"];
	}
	if(op == opValues["deleteOrderApprovalForm"] || op == opValues["deleteOrderApprovalSubmit"])
	{
		pageHeading += otherText["pgHead_ordApprovDel"];
	}

	return pageHeading; 
}



function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	if (op == opValues["listOrderApproval"])
	{
		pageTitle += otherText["pgTitle_ordApprov"];
	}

	if(op == opValues["modifyOrderApprovalForm"] || op == opValues["modifyOrderApprovalSubmit"])
	{
		pageTitle += otherText["pgTitle_ordApprovUpd"];
	}
	if(op == opValues["insertOrderApprovalForm"] || op == opValues["insertOrderApprovalSubmit"])
	{
		pageTitle += otherText["pgTitle_ordApprovAdd"];
	}
	if(op == opValues["deleteOrderApprovalForm"] || op == opValues["deleteOrderApprovalSubmit"])
	{
		pageTitle += otherText["pgTitle_ordApprovDel"];
	}

	return pageTitle;
}



/* define function op_list() */
function op_list(priv, prodCmpy, prodCd, frmNum)
{
	/* priv = 
		6 modify	op=1,2,3
		7 add		op=4
		8 delete	op=5
	*/
	var op_list = "";
	op_list += "<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+prodCmpy+"', '"+prodCd+"', '"+frmNum+"');\">          ";

	switch (priv)
	{
		case 8:
			op_list += "<option value=\"" + opValues["deleteOrderApprovalSubmit"] + "\">" + commText["Delete"] + "</option>";

		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

		case 6:     
			op_list += "<option value=\"" + opValues["modifyOrderApprovalForm"] + "\">" + commText["Modify"] + "</option>";

		case 5:			/* Find Has not been implemented yet*/
			op_list += "<option value=\"" + opValues["listPricing"] + "\">" + otherText["pricing"] + "</option>";

			break;
	}

	op_list += "<option value=0 selected>--\t" + otherText["youraction"] + "\t--</option>";
	op_list += "</select>                                        ";
	
	return op_list ;
}



function nextPage(totalPages, curPg, curPgName, curPgVarName)
{
	var nextPgHTML = "";
	nextPgHTML += "<tr> \n";
	nextPgHTML += "<td align=\"center\">\n ";

	if (curPg > 1)
	{
		//nextPgHTML +="<a href=\"javascript:document.glblFrm.pg.value="+(curPg-1)+";document.glblFrm.op.value=0;document.glblFrm.submit();\">Previous</a>\n";
//		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg-1) + "' );\">Previous</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg-1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listOrderApproval"] + "'); ", otherText["btn_prev_page"]);
	}

	nextPgHTML += "&nbsp; Current=" + curPg + "/" + totalPages + " &nbsp; ";
	if (totalPages > curPg)
	{
//		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg+1) + "' );\">Next</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg+1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listOrderApproval"] + "'); ", otherText["btn_next_page"]);
	}
  
	nextPgHTML += "</td>\n ";
	nextPgHTML += "</tr> \n";

	return nextPgHTML;
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
	newPage += "function submitAction(myobject, prodCmpy, prodCd, frmNum)\n";
	newPage += "{\n";
	newPage += "	var myCurQstring=produceQString();\n";
	newPage += "	var myselectedvalue = myobject.options[myobject.selectedIndex].value;";

	newPage += "	if(myselectedvalue==\"" + opValues["deleteOrderApprovalSubmit"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(confirm('" + otherText["msg_del_confirm"] + "'))\n";
	newPage += "		{\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["deleteOrderApprovalSubmit"] + "+\"';\");\n";

	newPage += "			eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "			return true;\n";
	newPage += "		}\n";
	newPage += "		eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
  	newPage += "	}\n";

	newPage += "	else if(myselectedvalue==\"" + opValues["listPricing"] + "\")\n";
	newPage += "	{\n";
	newPage += "		document.location.href=\"pricing.cgi?termCd="+termCd+"&orderNo="+orderNo+"&op="+opValues["listPricing"]+"&prevOp="+opValues["listOrderApproval"]+"&pg=1&prodCmpy=\"+prodCmpy+\"&prodCd=\"+prodCd+\"&cmpyCd="+cmpyCd+"&suppCd="+suppCd+"&custAcc="+custAcc+"\";\n";
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

