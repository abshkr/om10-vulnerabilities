	var opValues = new Array();

	// operations to customer invoice
	opValues["baseCustInvoice"] = 700;
	opValues["listCustInvoice"] = 701;
	opValues["searchCustInvoiceForm"] = 704;
	opValues["searchCustInvoiceSubmit"] = 714;
	opValues["viewCustInvoice"] = 705;
	opValues["modifyCustInvoiceForm"] = 706;
	opValues["modifyCustInvoiceSubmit"] = 716;
	opValues["insertCustInvoiceForm"] = 707;
	opValues["insertCustInvoiceSubmit"] = 717;
	opValues["deleteCustInvoiceForm"] = 708;
	opValues["deleteCustInvoiceSubmit"] = 718;

	// operation to payments
	opValues["basePayment"] = 30100;
	opValues["listPayment"] = 30101;
	opValues["searchPaymentForm"] = 30104;
	opValues["searchPaymentSubmit"] = 30114;
	opValues["viewPayment"] = 30105;
	opValues["modifyPaymentForm"] = 30106;
	opValues["modifyPaymentSubmit"] = 30116;
	opValues["insertPaymentForm"] = 30107;
	opValues["insertPaymentSubmit"] = 30117;
	opValues["deletePaymentForm"] = 30108;
	opValues["deletePaymentSubmit"] = 30118;


	var column_headers = [
			"Number", "Date", "Amount", "Amount Paid To Date"
	];

	var column_headers2 = [
			"PRODUCT CODE", "DESCRIPTION", "QUANTITY", "UNIT", "PRICE PER UNIT", "AMOUNT ($)"
	];
    
	var PriceStr = "Amount";
	var PriceStr2 = "Amount Paid To Date";

	var otherText = new Array();
	
	otherText["youraction"] =  "YOUR ACTION";
	otherText["custInvoiceDetails"]	= "INVOICE DETAILS";

	otherText["btn_addNew_custInvoice"] =  "Generate Invoice";
	otherText["btn_addNew_payment"] =  "Add Payment";
	otherText["btn_bakto_customers"] =  "Back to Customers";
	otherText["btn_upd_custInvoice"] =  "Modify";

	otherText["btn_bakto_custInvoicePg"] = "Back to Customer Invoices";

	otherText["tab_cust"] =  "Customer Details";

	otherText["pgTitle_custInvoice"] =  "Customer Order Processing, Invoice Page";
	otherText["pgTitle_custInvoiceUpd"] =  "Customer Order Processing, Invoice, Modify";
	otherText["pgTitle_custInvoiceAdd"] =  "Customer Order Processing, Invoice, Add";
	otherText["pgTitle_custInvoiceDel"] =  "Customer Order Processing, Invoice, Delete";

	otherText["pgTitle_payment"] =  "Customer Order Processing, Payment Page";
	otherText["pgTitle_paymentUpd"] =  "Customer Order Processing, Payment, Modify";
	otherText["pgTitle_paymentAdd"] =  "Customer Order Processing, Payment, Add";

	otherText["pgHead_custInvoice"] =  "Invoice";
	otherText["pgHead_custInvoiceUpd"] =  "Modify Invoice";
	otherText["pgHead_custInvoiceAdd"] =  "Generate Invoice";
	otherText["pgHead_custInvoiceDel"] =  "";

	otherText["pgHead_payment"] =  "Payment";
	otherText["pgHead_paymentUpd"] =  "Modify Payment";
	otherText["pgHead_paymentAdd"] =  "Add Payment";

    otherText["msg_genInvoice_fSet"] =  "Invoice Generation";
    otherText["msg_genInvoice_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_addPayment_fSet"] =  "Customer Payment Entry";
    otherText["msg_addPayment_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";

	otherText["msg_del_confirm"] =  "Are you sure you want to delete?";

	// Alert Message for Add Payment Form
	otherText["msg_selPaymentType"] = "Select a payment type!";
	otherText["msg_selPaymentInvoice"] = "Select an invoice No!";
	otherText["msg_enterPaymentAmount"] = "Please enter the payment amount ";

	otherText["msg_selInvPrintType"] = "Select an invoice printing type!";
	otherText["msg_selInvLoadNumber"] = "Select a Load Number!";

	otherText["reference"] = "PAYMENT-THANK YOU";

	var accountTitle = new Array();
	// Account Details
	accountTitle["head_supp"] = "Supplier";
	accountTitle["head_cust"] = "Customer";

	accountTitle["head_acct"] = "Account No";
	accountTitle["head_crlimit"] = "Credit Limit (" + moneyCurrency + ")";
	accountTitle["head_terms"] = "Terms";
	accountTitle["head_balance"] = "Current Account Balance (" + moneyCurrency + ")";
	accountTitle["head_within"] = "Invoice Due Within Terms (" + moneyCurrency + ")";
	accountTitle["head_outside"] = "Invoice Due Outside Terms (" + moneyCurrency + ")";
	accountTitle["head_credit_abbrv"] = "CR";
	accountTitle["head_debit_abbrv"] = "DR";


	var items_per_page = 10;

	var orderTitle = new Array();

	orderTitle["payment_acct"] = "Account";
	orderTitle["payment_supp"] = "Supplier";
	orderTitle["payment_cust"] = "Customer";

	orderTitle["payment_invoice"] = "Invoice";
	orderTitle["payment_amount"] = "Amount (" + moneyCurrency + ")";
	orderTitle["payment_type"] = "Type";

	orderTitle["inv_print_type"] = "Invoice Printing Type";
	orderTitle["inv_load_number"] = "Load Number";
	orderTitle["generate"] = "Generate Invoice";

	// Invoice Details
	orderTitle["header_title"] = "ORDER INVOICE";

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

	orderTitle["sum_product_total"] = "PRODUCT TOTAL";
	orderTitle["sum_delivery_charges"] = "DELIVERY CHARGES";
	orderTitle["sum_sub_total"] = "SUB TOTAL";
	orderTitle["sum_tax"] = "VALUE ADDED TAX";
	orderTitle["sum_total_amount"] = "TOTAL AMOUNT OWED";


	var displayPriceOffsets = 1;
	var ContractPricing = 2;
		
	var l_opInf= new Array()
	for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
	l_opInf[728]= "Successfully Deleted!";
	l_opInf[727]= "Successfully Created a New Invoice!";
	l_opInf[726]= "Successfully Updated!";

	l_opInf[738]= "Delete Failed!";
	l_opInf[737]= "Invoice Creation Failed!";
	l_opInf[736]= "Update Failed!";

	l_opInf[747]= "Load number does not exist! Invoice cannot be created!";
	l_opInf[757]= "Trip number does not exist! Invoice cannot be created!";


	l_opInf[30128]= "Successfully Deleted!";
	l_opInf[30127]= "Successfully Inserted a New Record!";
	l_opInf[30126]= "Successfully Updated!";

	l_opInf[30138]= "Delete Failed!";
	l_opInf[30137]= "Insert Failed!";
	l_opInf[30136]= "Update Failed!";


	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 701,704,705,706,707, 30101,30104,30105,30106,30107];
	var ops_req_search = [-1, 701];// search never required on this page



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
	if (priv >= 5 && curViewDetailState == opValues["listCustInvoice"]) 
	{
		newPage += displayCustInvoiceList (curPrivilage, curColumnToSort);
	}
	if (priv >= 5 && curViewDetailState == opValues["viewCustInvoice"]) 
	{
		newPage += displayCustInvoiceDetails (curPrivilage, curColumnToSort);
	}
		
	

	/* Display Form for Modify CustInvoice Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyCustInvoiceForm"])	
	{
		newPage += displayModifyCustInvoiceForm();
	}
	/* Submit the Modification of CustInvoice Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyCustInvoiceSubmit"])	
	{
		newPage += displayCustInvoiceList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Insert CustInvoice Details */
	if (priv >= 7 && curViewDetailState == opValues["insertCustInvoiceForm"])	
	{
		newPage += displayInsertCustInvoiceForm();
	}
	/* Submit the Insertion of CustInvoice Details */
	if (priv >= 7 && curViewDetailState == opValues["insertCustInvoiceSubmit"])	
	{
		newPage += displayCustInvoiceList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Insert Payment Details */
	if (priv >= 7 && curViewDetailState == opValues["insertPaymentForm"])	
	{
		newPage += displayInsertPaymentForm();
	}
	/* Submit the Insertion of Payment Details */
	if (priv >= 7 && curViewDetailState == opValues["insertPaymentSubmit"])	
	{
		newPage += displayCustInvoiceList(curPrivilage, curColumnToSort);
	}
	/* Display Form for Delete a recorde of CustInvoice */
//	if (priv >= 8 && curViewDetailState == opValues["deleteCustInvoiceForm"])	
//	{
//		newPage += displayDeleteCustInvoiceForm();
//	}
	/* Submit the Deletion of CustInvoice Details */
	if (priv >= 8 && curViewDetailState == opValues["deleteCustInvoiceSubmit"])	
	{
		newPage += displayCustInvoiceList(curPrivilage, curColumnToSort);
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





function displayCustInvoiceList(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm ="";
	var ordIndex = 0;
	var customer_addr_details;

	ordIndex = cust_acct_jstab.length - 1;

	dispFrm += makespace("\t", indent) + "<tr> \n";
	dispFrm += makespace("\t", indent) + "<td align=\"left\">\n";
//	dispFrm += makespace("\t", indent+1) + "<div id=\"printReady\"> \n";
	dispFrm += makespace("\t", indent+1) + "<table width=\"100%\">\n";

	//dispFrm += makespace("\t", indent) + displayGlblFrm();
	dispFrm += makespace("\t", indent) + btnGroupCustInvoice_HTML();
	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "cust_invoice.cgi", "pg_3");

	dispFrm += makespace("\t", indent) + "<tr> \n";
	dispFrm += makespace("\t", indent) + "<td align=\"left\">\n";

	dispFrm += " <ul id=\"tabmenu\">\n";
	dispFrm += "<li>" + otherText["tab_cust"] + "</li>\n";
	dispFrm += "</ul>\n";

	dispFrm += "<div class=\"adminform\">\n";
	dispFrm += makespace("\t", indent+1) + "<table width=\"100%\">\n";

	dispFrm += makespace("\t", indent+1) + "<tr> \n";
	dispFrm += makefield(0, accountTitle["head_supp"], cust_acct_jstab [ordIndex][9] + "&nbsp;&nbsp;" + cust_acct_jstab [ordIndex][10], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 150);
	dispFrm += makefield(0, accountTitle["head_cust"], cust_acct_jstab [ordIndex][11] + "&nbsp;&nbsp;" + cust_acct_jstab [ordIndex][12], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 150);
	dispFrm += makespace("\t", indent+1) + "</tr> \n";

	dispFrm += makespace("\t", indent+1) + "<tr> \n";
	dispFrm += makefield(0, accountTitle["head_acct"], cust_acct_jstab [ordIndex][13], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 150);

	if ( cust_acct_jstab [ordIndex][16] <= 0 )
	{
		dispFrm += makefield(0, accountTitle["head_balance"], (-1.0)*cust_acct_jstab [ordIndex][16]+accountTitle["head_credit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 200);
	}
	else
	{
		dispFrm += makefield(0, accountTitle["head_balance"], cust_acct_jstab [ordIndex][16]+accountTitle["head_debit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 200);
	}
	dispFrm += makespace("\t", indent+1) + "</tr> \n";

	dispFrm += makespace("\t", indent+1) + "<tr> \n";
	if ( cust_acct_jstab [ordIndex][14] <= 0 )
	{
		dispFrm += makefield(0, accountTitle["head_crlimit"], (-1.0)*cust_acct_jstab [ordIndex][14]+accountTitle["head_credit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 150);
	}
	else
	{
		dispFrm += makefield(0, accountTitle["head_crlimit"], cust_acct_jstab [ordIndex][14]+accountTitle["head_debit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 150);
	}
	if ( cust_acct_jstab [ordIndex][17] <= 0 )
	{
		dispFrm += makefield(0, accountTitle["head_within"], (-1.0)*cust_acct_jstab [ordIndex][17]+accountTitle["head_credit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 200);
	}
	else
	{
		dispFrm += makefield(0, accountTitle["head_within"], cust_acct_jstab [ordIndex][17]+accountTitle["head_debit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 200);
	}
	dispFrm += makespace("\t", indent+1) + "</tr> \n";

	dispFrm += makespace("\t", indent+1) + "<tr> \n";
	dispFrm += makefield(0, accountTitle["head_terms"], cust_acct_jstab [ordIndex][15], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 150);
	if ( cust_acct_jstab [ordIndex][18] <= 0 )
	{
		dispFrm += makefield(0, accountTitle["head_outside"], (-1.0)*cust_acct_jstab [ordIndex][18]+accountTitle["head_credit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 200);
	}
	else
	{
		dispFrm += makefield(0, accountTitle["head_outside"], cust_acct_jstab [ordIndex][18]+accountTitle["head_debit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 200);
	}
	dispFrm += makespace("\t", indent+1) + "</tr> \n";

	dispFrm += makespace("\t", indent+1) + "</table>\n";
	dispFrm += makespace("\t", indent+1) + "</div>\n";

	dispFrm += makespace("\t", indent) + "</td>\n";	
	dispFrm += makespace("\t", indent) + "</tr> \n";

	dispFrm += makespace("\t", indent) + "<tr> \n";

	// end of the td and tr for the list area
	dispFrm += makespace("\t", indent) + "<td>\n ";  
	if( ((column_headers.length)> 0))
	{
		dispFrm += makespace("\t", indent+2) + table_begin("M", 0,"");
		dispFrm += makespace("\t", indent+2) + "<tbody> \n";
		dispFrm += makespace("\t", indent+2) + "<tr>\n";
		for(var i=0; i<column_headers.length; i++)
		{
			if (column_headers[i] == PriceStr || column_headers[i] == PriceStr2)
			{
				column_headers[i] = column_headers[i] + "(" + moneyCurrency + ")";
			}
			dispFrm += makespace("\t", indent+2) + "<td>" + column_headers[i] + "</td>\n";
		}
		dispFrm += makespace("\t", indent+2) + "</tr>\n";
	}

	for(i in cust_acct_jstab)
	{
		if (i>0)
		{
/*
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone =0;
			for(var j=0; j<column_headers.length; j++)
			{
				dispFrm += makespace("\t", indent+2) + "<td>\n";
				dispFrm += makespace("\t", indent+3) + obs(cust_acct_jstab[i][howmanyDone]);
				dispFrm += makespace("\t", indent+2) + "</td>\n";
				howmanyDone++;	
			} // end of inner for loop
*/
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone = 0;
			for(var j=0; j<column_headers.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(cust_acct_jstab[i][howmanyDone]) + "<\/td>";
				} 
				else 
				{
					dispFrm += makespace("\t", indent+2) + "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						dispFrm += makespace("\t", indent+3) + "<form name=\"select_action_" + i + "\" id=\"select_action_" + i + "\" >\n";
						dispFrm += makespace("\t", indent+4) + "<table border=\"0\">\n";
						dispFrm += makespace("\t", indent+4) + "<tr>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\"> <span style=\"COLOR: #FF0000;\">" + obs(cust_acct_jstab[i][howmanyDone]) + "</span>\n";
              
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"invNo\" id=\"invNo\" value=\"" + cust_acct_jstab[i][0] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"invOrderNo\" id=\"invOrderNo\" value=\"" + cust_acct_jstab[i][6] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + cust_acct_jstab[i][19] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

						dispFrm += makespace("\t", indent+5) + preqstr_field ();
						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

						dispFrm += makespace("\t", indent+5) + op_list (curPrivilage, cust_acct_jstab[i][0], i);

						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "</tr>\n";
						dispFrm += makespace("\t", indent+4) + "</table>\n";
						dispFrm += makespace("\t", indent+3) + "</form>\n";
					}
					else
					{
						dispFrm += makespace("\t", indent+3) + obs(cust_acct_jstab[i][howmanyDone]);
					}  

					dispFrm += makespace("\t", indent+2) + "</td>\n";
				}
				howmanyDone++;	
			}	  
		}
		dispFrm += makespace("\t", indent) + "\n";
		dispFrm += makespace("\t", indent+2) + "</tr>";
	}


	dispFrm += makespace("\t", indent+2) + "</table>\n";
	dispFrm += makespace("\t", indent) + "</td> \n";
	dispFrm += makespace("\t", indent) + "</tr> \n";

	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "cust_invoice.cgi", "pg_3");

	dispFrm += makespace("\t", indent+2) + "</table>\n";
//	dispFrm += makespace("\t", indent+1) + "</div> \n";  
	dispFrm += makespace("\t", indent) + "</td> \n";
	dispFrm += makespace("\t", indent) + "</tr> \n";

	return dispFrm;
}




function displayCustInvoiceDetails(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm = "";

//	dispFrm += displayordOrderInvoiceDetails(curPrivilage,curColumnToSort);

	if ( text_order_invoice != "" )
	{
		dispFrm += makespace("\t", indent) + btnGroupDetailCustInvoice_HTML();

		dispFrm += makespace("\t", indent) + "<tr>\n";
		dispFrm += makespace("\t", indent) + "<td style=\"border: 2 solid blue;width:100%;width:500px;\">\n";
		dispFrm += makespace("\t", indent+1) + "<pre style=\"font-size:12px;\">\n";

		dispFrm += makespace("\t", indent+2) + text_order_invoice + "\n";

		dispFrm += makespace("\t", indent+1) + "</pre>\n";
		dispFrm += makespace("\t", indent) + "</td>\n";
		dispFrm += makespace("\t", indent) + "</tr>\n";
	}
	else
	{
		dispFrm += displayordOrderInvoiceDetails(curPrivilage,curColumnToSort);
	}

	return dispFrm;
}



function displayordOrderInvoiceHeader(type)
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
	dispFrm += makespace("\t", indent+1) + "<form name=\"list_ord_invoice\" method=\"get\" id=\"list_ord_invoice\" action=\"cust_invoice.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	dispFrm += makespace("\t", indent+2) + "<table width=\"100%\">\n";
	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makespace("\t", indent+2) + "<td class=\"infotext\">\n";

	// hidden area for passing values between web pages
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyOrdDetailSubmit"] + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"invOrderNo\" id=\"invOrderNo\" value=\"" + invOrderNo + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"invNo\" id=\"invNo\" value=\"" + invNo + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + orderNo + "\">\n";

//	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"prodCd\" id=\"prodCd\" value=\"" + prodCd + "\">\n";
//	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"prodCmpy\" id=\"prodCmpy\" value=\"" + prodCmpy + "\">\n";

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
			dispFrm += makespace("\t", indent+2) + "<td colspan=\"7\"  class=\"infotextheading\" align=center> \n";
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



function displayordOrderInvoiceDetails(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm ="";
	var aId;
	var i;

	
	//dispFrm += makespace("\t", indent) + displayGlblFrm();
	dispFrm += makespace("\t", indent) + btnGroupDetailCustInvoice_HTML();
//	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "cust_invoice.cgi", "pg_3");

	dispFrm += displayordOrderInvoiceHeader(1);
  
	dispFrm += makespace("\t", indent) + "<tr> \n";

	// end of the td and tr for the list area
	dispFrm += makespace("\t", indent) + "<td>\n ";  
	if( ((column_headers2.length)> 0))
	{
		dispFrm += makespace("\t", indent+1) + "<div id=\"printReady\">\n";
		dispFrm += makespace("\t", indent+2) + table_begin("M", 1,"");
		dispFrm += makespace("\t", indent+2) + "<tbody> \n";
		dispFrm += makespace("\t", indent+2) + "<tr>\n";
		for(var i=0; i<column_headers2.length; i++)
		{
			dispFrm += makespace("\t", indent+2) + "<td>" + column_headers2[i] + "</td>\n";
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
			for(var j=0; j<column_headers2.length; j++)
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
//						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCmpy\" id=\"prodCmpy\" value=\"" + prodCmpy + "\">\n";
//						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCd\" id=\"prodCd\" value=\"" + prodCd + "\">\n";

						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

						dispFrm += makespace("\t", indent+5) + preqstr_field ();
						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

//						dispFrm += makespace("\t", indent+5) + op_list (curPrivilage, order_item_jstab[i][8], order_item_jstab[i][7], i);

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
				var k;
				for(k in pricing_jslst)
				{
					if ( k > 0 && pricing_jslst[k][7] == "Y")
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
	dispFrm += makefield(0, orderTitle["sum_delivery_charges"], delivCharge, "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makespace("\t", indent+2) + "</tr> \n";

	dispFrm += makespace("\t", indent+2) + "<tr> \n";
	dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makefield(0, orderTitle["sum_sub_total"], subTotal, "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makespace("\t", indent+2) + "</tr> \n";

	dispFrm += makespace("\t", indent+2) + "<tr> \n";
	dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makefield(0, orderTitle["sum_tax"], taxValue, "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makespace("\t", indent+2) + "</tr> \n";

	dispFrm += makespace("\t", indent+2) + "<tr> \n";
	dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makefield(0, orderTitle["sum_total_amount"],amountTotal, "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 200);
	dispFrm += makespace("\t", indent+2) + "</tr> \n";

	dispFrm += makespace("\t", indent+1) + "</table> \n";
	dispFrm += makespace("\t", indent) + "</td> \n";
	dispFrm += makespace("\t", indent) + "</tr> \n";

//	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "cust_invoice.cgi", "pg_3");
//	dispFrm += makespace("\t", indent) + btnGroupOrdApprov_HTML();

	return dispFrm;
}




function displayModifyCustInvoiceForm ()
{
	var indent = 1;
	var updFrm = "";
	var customer_addr_details;

	return updFrm;
}



function displayInsertCustInvoiceForm ()
{
	var indent = 1;
	var addFrm = "";
	var i;

	addFrm += makespace("\t", indent) + btnGroupInsertCustInvoice_HTML();

	addFrm += makespace("\t", indent) + "<tr>\n";
	addFrm += makespace("\t", indent) + "<td>\n";
//	addFrm += makespace("\t", indent+3) + "<div id=\"printReady\">\n";

	addFrm += makespace("\t", indent+1) + "<form name=\"gen_invoice\" method=\"get\" id=\"gen_invoice\" action=\"cust_invoice.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	addFrm += " <ul id=\"tabmenu\">\n";
	addFrm += "<li>" + otherText["msg_genInvoice_fSet"] + "</li>\n";
	addFrm += "</ul>\n";
	addFrm += "<div class=\"adminform\">\n";

//	addFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	addFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_genInvoice_fSet"] + "</strong></legend>\n";

	addFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	addFrm += makespace("\t", indent+4) + "<br>\n";
	addFrm += makespace("\t", indent+4) + otherText["msg_genInvoice_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["insertCustInvoiceSubmit"] + "\">\n";

	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";


	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";


	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	addFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(2, orderTitle["inv_print_type"], frm_inv_print_type, "frm_inv_print_type", 	"frm_inv_print_type", inv_print_jslst, 0, 0, " onchange=\"update(document.gen_invoice, this, document.gen_invoice.frm_inv_load_num)\" dataType=\"Require\"", otherText["msg_selInvPrintType"], "*", indent+4, 100);
	addFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(2, orderTitle["inv_load_number"], frm_inv_load_num, "frm_inv_load_num", "frm_inv_load_num", load_num_jslst, 0, 0, "dataType=\"Require\"", otherText["msg_selInvLoadNumber"], "*", indent+4, 100);
	addFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";


	addFrm += makespace("\t", indent+4) + "</table>\n";
	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td align=\"center\">\n";
	addFrm += makespace("\t", indent+4) + "<table>\n";

	addFrm += frmButtRow_HTML(orderTitle["generate"], 1);


	addFrm += makespace("\t", indent+4) + "</table>\n";
	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";
	addFrm += makespace("\t", indent+3) + "</table>\n";

//	addFrm += makespace("\t", indent+2) + "</fieldset>\n";
	addFrm += makespace("\t", indent+2) + "</div>\n";

	addFrm += makespace("\t", indent+1) + "</form>\n";

//	addFrm += makespace("\t", indent+3) + "</div>\n";

	addFrm += makespace("\t", indent) + "</td>\n";
	addFrm += makespace("\t", indent) + "</tr>\n";

	return addFrm;


}



function displayDeleteCustInvoiceForm ()
{
	var delFrm = "";

	return delFrm;
}



function displayInsertPaymentForm ()
{
	var indent = 1;
	var addFrm = "";
	var i;
	var suppStr = "";
	var custStr = "";

	addFrm += makespace("\t", indent) + btnGroupInsertPayment_HTML();

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
	addFrm += "<li>" + otherText["tab_cust"] + "</li>\n";
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
//	addFrm += makespace("\t", indent+3) + "<div id=\"printReady\">\n";

	addFrm += makespace("\t", indent+1) + "<form name=\"add_payment\" method=\"get\" id=\"add_payment\" action=\"cust_invoice.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	addFrm += " <ul id=\"tabmenu\">\n";
	addFrm += "<li>" + otherText["msg_addPayment_fSet"] + "</li>\n";
	addFrm += "</ul>\n";
	addFrm += "<div class=\"adminform\">\n";

//	addFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	addFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_addPayment_fSet"] + "</strong></legend>\n";

	addFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	addFrm += makespace("\t", indent+4) + "<br>\n";
	addFrm += makespace("\t", indent+4) + otherText["msg_addPayment_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["insertPaymentSubmit"] + "\">\n";

	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";


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

//	addFrm += makespace("\t", indent+3) + "</div>\n";

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





function btnGroupCustInvoice_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	if(priv>=7)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('cust_invoice.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["insertPaymentForm"] + "'); ", otherText["btn_addNew_payment"]);

		btn_HTML += btnLocation_HTML("justChaneMyLocation('cust_invoice.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["insertCustInvoiceForm"] + "'); ", otherText["btn_addNew_custInvoice"]);
	}

//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

	btn_HTML += btnLocation_HTML("justChaneMyLocation('cust.cgi?suppCd='+suppCd); ", otherText["btn_bakto_customers"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}




function btnGroupInsertPayment_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

	btn_HTML += btnLocation_HTML("justChaneMyLocation('cust_invoice.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustInvoice"] + "'); ", otherText["btn_bakto_custInvoicePg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}


function btnGroupInsertCustInvoice_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

	btn_HTML += btnLocation_HTML("justChaneMyLocation('cust_invoice.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustInvoice"] + "'); ", otherText["btn_bakto_custInvoicePg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function btnGroupDetailCustInvoice_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

	btn_HTML += btnLocation_HTML("justChaneMyLocation('cust_invoice.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustInvoice"] + "'); ", otherText["btn_bakto_custInvoicePg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}




function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	if (op == opValues["listCustInvoice"])
	{
		pageHeading += otherText["pgHead_custInvoice"];
	}

	if(op == opValues["viewCustInvoice"])
	{
		pageHeading += otherText["pgHead_custInvoice"];
	}

	if(op == opValues["modifyCustInvoiceForm"] || op == opValues["modifyCustInvoiceSubmit"])
	{
		pageHeading += otherText["pgHead_custInvoiceUpd"];
	}
	if(op == opValues["insertCustInvoiceForm"] || op == opValues["insertCustInvoiceSubmit"])
	{
		pageHeading += otherText["pgHead_custInvoiceAdd"];
	}
	if(op == opValues["deleteCustInvoiceForm"] || op == opValues["deleteCustInvoiceSubmit"])
	{
		pageHeading += otherText["pgHead_custInvoiceDel"];
	}

	if(op == opValues["insertPaymentForm"] || op == opValues["insertPaymentSubmit"])
	{
		pageHeading += otherText["pgHead_paymentAdd"];
	}

	return pageHeading; 
}



function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	if (op == opValues["listCustInvoice"])
	{
		pageTitle += otherText["pgTitle_custInvoice"];
	}

	if(op == opValues["viewCustInvoice"])
	{
		pageTitle += otherText["pgTitle_custInvoice"];
	}

	if(op == opValues["modifyCustInvoiceForm"] || op == opValues["modifyCustInvoiceSubmit"])
	{
		pageTitle += otherText["pgTitle_custInvoiceUpd"];
	}
	if(op == opValues["insertCustInvoiceForm"] || op == opValues["insertCustInvoiceSubmit"])
	{
		pageTitle += otherText["pgTitle_custInvoiceAdd"];
	}
	if(op == opValues["deleteCustInvoiceForm"] || op == opValues["deleteCustInvoiceSubmit"])
	{
		pageTitle += otherText["pgTitle_custInvoiceDel"];
	}

	if(op == opValues["insertPaymentForm"] || op == opValues["insertPaymentSubmit"])
	{
		pageTitle += otherText["pgTitle_paymentAdd"];
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
		case 7:
		case 6:     
		case 5:			/* Find Has not been implemented yet*/
			op_list += "<option value=\"" + opValues["viewCustInvoice"] + "\">" + otherText["custInvoiceDetails"] + "</option>";
			break;
	}
  
	op_list += "<option value=0 selected>--\t" + otherText["youraction"] + "\t--</option>";
	op_list += "</select>                                        ";
	
	return op_list ;
}

/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ nextPage] 
[PURPOSE]  		-> 	Responsible for displaying the HTML for the next page
                  links and use the btnLocation_HTML and btnLocation_HTML_nexPreLk
                  functions to display the URL and use the 
                  justChaneMyLocation javascript function to carry the variables
                  to the next page
          
[Parameter]  	-> totalPages integer Total number of pages for this display
              -> curPg integer current page number user is looking at
              -> curPgName string is the CGI file name user browsing
              -> curPgVarName string is variable like pg we have in all the scripts
                 but if page is multilevel this variable change e.g on 
                 delivery location this variable is pg_3
[AUTHOR]  		-> Abdul Shakoor (DKI) Sepetember 27, 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/

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
    nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustInvoice"] + "'); ", "&lt;&lt;");
		foobar = page_number - 1;
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		 nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustInvoice"] + "'); ", "<b>&lt;<\/b>");
		
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustInvoice"] + "'); ", foobar1 + "-" + foobar2);
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
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustInvoice"] + "'); ", i);
	}
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	for (var i=page_number+1; i<foobar2; i++) 
  {
    //alert("I am in for for foobar2 loop "+i);	
    nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustInvoice"] + "'); ", i);
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
			
			if (foobar2 > foobar1) {
				tempTxt += "-" + foobar2;
			}
			//$html_output .= "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustInvoice"] + "'); ", tempTxt);
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
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustInvoice"] + "'); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustInvoice"] + "'); ", "<b>&gt;&gt;<\/b>");
	} else {
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}

	/*
  if (curPg > 1)
	{
		
    //nextPgHTML +="<a href=\"javascript:document.glblFrm.pg.value="+(curPg-1)+";document.glblFrm.op.value=0;document.glblFrm.submit();\">Previous</a>\n";
   //		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg-1) + "' );\">Previous</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg-1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustInvoice"] + "'); ", otherText["btn_prev_page"]);
	}

	nextPgHTML += "&nbsp; Current=" + curPg + "/" + totalPages + " &nbsp; ";
	if (totalPages > curPg)
	{
//		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg+1) + "' );\">Next</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg+1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustInvoice"] + "'); ", "&lt;&lt;");
	}
  */
	nextPgHTML += "</td>\n ";
	nextPgHTML += "</tr> \n";

	return nextPgHTML;
}


function update(myformObj, parentOption, childOption) 
{
	var new_options;
	var parent_select;

	clear(childOption);
//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	parent_select = parentOption.value;
	new_option = new Option("", "", false, false);
	childOption.options[childOption.length] = new_option;		
	childOption.selectedIndex = 0;
	for (i in load_num_jslst )
	{
		if (load_num_jslst[i][2] == parent_select)
		{
			new_option = new Option(load_num_jslst[i][1], load_num_jslst[i][0], false, false);
			childOption.options[childOption.length] = new_option;		
			childOption.selectedIndex = 0;
		}
	}
}


function clear(childOption) 
{
	while(childOption.length != 0) 
	{
		childOption.options[childOption.length-1] = null;
	}

	//history.go(0);
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

	newPage += "	if(myselectedvalue==\"" + opValues["deleteCustInvoiceSubmit"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(confirm('" + otherText["msg_del_confirm"] + "'))\n";
	newPage += "		{\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["deleteCustInvoiceSubmit"] + "+\"';\");\n";

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

