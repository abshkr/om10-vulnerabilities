	var opValues = new Array();

	// operations to delivery locations
	opValues["baseAcctDetail"] = 200;
	opValues["listAcctDetail"] = 201;
	opValues["searchAcctDetailForm"] = 204;
	opValues["searchAcctDetailSubmit"] = 214;
	opValues["viewAcctDetail"] = 205;
	opValues["modifyAcctDetailForm"] = 206;
	opValues["modifyAcctDetailSubmit"] = 216;
	opValues["insertAcctDetailForm"] = 207;
	opValues["insertAcctDetailSubmit"] = 217;
	opValues["deleteAcctDetailForm"] = 208;
	opValues["deleteAcctDetailSubmit"] = 218;


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

	// operation to categories
	opValues["baseCategory"] = 30200;
	opValues["listCategory"] = 30201;
	opValues["searchCategoryForm"] = 30204;
	opValues["searchCategorySubmit"] = 30214;
	opValues["viewCategory"] = 30205;
	opValues["modifyCategoryForm"] = 30206;
	opValues["modifyCategorySubmit"] = 30216;
	opValues["insertCategoryForm"] = 30207;
	opValues["insertCategorySubmit"] = 30217;
	opValues["deleteCategoryForm"] = 30208;
	opValues["deleteCategorySubmit"] = 30218;


	var otherText = new Array();
	
	otherText["btn_addNew_acctDetail"] =  "Add Payment";
	otherText["btn_bakto_customers"] =  "Back to Customers";
	otherText["btn_upd_acctDetail"] =  "Modify";

	otherText["btn_bakto_acctDetailPg"] =  "Back to Account Details Page";
	otherText["btn_addNew_category"] =  "Add New Category";
	otherText["btn_upd_category"] =  "Modify";

	otherText["btn_bakto_categoryPg"] =  "Back to Category Page";
	otherText["btn_bakto_acctDetailUpd"] =  "Back to Modify Account Details Page";

	otherText["tab_cust"] =  "Customer Details";

	otherText["pgTitle_acctDetail"] =  "Customer Order Processing, Account Details Page";
	otherText["pgTitle_acctDetailUpd"] =  "Customer Order Processing, Account Details, Modify";
	otherText["pgTitle_acctDetailAdd"] =  "Customer Order Processing, Account Details, Add Payment";
	otherText["pgTitle_acctDetailDel"] =  "Customer Order Processing, Account Details, Delete";

	otherText["pgTitle_category"] =  "Customer Order Processing, Account Details, Category Page";
	otherText["pgTitle_categoryUpd"] =  "Customer Order Processing, Account Details, Category, Modify";
	otherText["pgTitle_categoryAdd"] =  "Customer Order Processing, Account Details, Category, Add";

	otherText["pgHead_acctDetail"] =  "Account Details";
	otherText["pgHead_acctDetailUpd"] =  "Modify Account";
	otherText["pgHead_acctDetailAdd"] =  "Customer Payment Entry";
	otherText["pgHead_acctDetailDel"] =  "Delete Account Detail";

	otherText["pgHead_category"] =  "Category";
	otherText["pgHead_categoryUpd"] =  "Modify Category";
	otherText["pgHead_categoryAdd"] =  "Add Category";

	otherText["msg_del_confirm"] =  "Are you sure you want to delete?";

    otherText["msg_updAcctDetail_fSet"] =  "Account Details";
    otherText["msg_updAcctDetail_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_addAcctDetail_fSet"] =  "Payment";
    otherText["msg_addAcctDetail_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";

    otherText["msg_addCategory_fSet"] =  "Category";
    otherText["msg_addCategory_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_updCategory_fSet"] =  "Category";
    otherText["msg_updCategory_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";

	otherText["msg_selAaddr"] =  "Please select an address";

	// Alert Message for Add Payment Form
	otherText["msg_selPaymentType"] = "Select a payment type!";
	otherText["msg_selPaymentInvoice"] = "Select an invoice No!";
	otherText["msg_enterPaymentAmount"] = "Please enter the payment amount ";

	// Alert Message for Modify Account Form
	otherText["msg_selAcctDetailCategory"] = "Please select the category!";
	otherText["msg_selAcctDetailInvoiceType"] = "Please select the invoice type!";
	otherText["msg_selAcctDetailInvoiceGen"] = "Please select the invoice generation!";
	otherText["msg_selAcctDetailSaleType"] = "Please select the sale type!";
	otherText["msg_selAcctDetailPricingType"] = "Please select the pricing type!";
	otherText["msg_selAcctDetailDelivLoc"] = "Please select the delivery location!";

	otherText["msg_enterAcctDetailCreditLimit"] = "Please enter the credit limit ";
	otherText["msg_enterAcctDetailCreditTerms"] = "Please enter the credit terms ";
	otherText["msg_enterAcctDetailOrderLife"] = "Please enter the default life of order ";

	// Alert Message for Categor Form
	otherText["msg_enterAcctDetailCatCode"] = "Please enter the category code!";
	otherText["msg_enterAcctDetailCatDesc"] = "Please enter the category description!";

	var accountTitle = new Array();

	accountTitle["head_acct"] = "Account";
	accountTitle["head_supp"] = "Supplier";
	accountTitle["head_cust"] = "Customer";
	accountTitle["head_addr"] = "Address";

	accountTitle["tail_avail_balance"] = "Available Balance (" + moneyCurrency + ")";
	accountTitle["tail_acct_balance"] = "Account Balance (" + moneyCurrency + ")";
	accountTitle["tail_credit_limit"] = "Credit Limit (" + moneyCurrency + ")";
	accountTitle["tail_duein_terms"] = "Due Within Terms (" + moneyCurrency + ")";
	accountTitle["tail_dueout_terms"] = "Due Outside Terms (" + moneyCurrency + ")";
	accountTitle["tail_last_payment"] = "Last Payment (" + moneyCurrency + ")";
	accountTitle["tail_credit_abbrv"] = "CR";
	accountTitle["tail_debit_abbrv"] = "DR";
	accountTitle["tail_last_payment_date"] = "on";

	accountTitle["acct_category"] =  "Category";
	accountTitle["acct_inv_type"] =  "Invoice Type";
	accountTitle["acct_sale_type"] =  "Sale Type";
	accountTitle["acct_pricing_type"] =  "Pricing Type";
	accountTitle["acct_deliv_loc"] =  "Default Delivery Location";
	accountTitle["acct_inv_gen"] =  "Invoice Generation";
	accountTitle["acct_credit_terms"] =  "Credit Terms";
	accountTitle["acct_order_life"] =  "Default Life of Order";
	accountTitle["acct_credit_limit"] =  "Credit Limit (" + moneyCurrency + ")";


	accountTitle["cat_code"] =  "Code";
	accountTitle["cat_desc"] =  "Description";

	var orderTitle = new Array();

	orderTitle["payment_acct"] = "Account";
	orderTitle["payment_supp"] = "Supplier";
	orderTitle["payment_cust"] = "Customer";

	orderTitle["payment_invoice"] = "Invoice";
	orderTitle["payment_amount"] = "Amount (" + moneyCurrency + ")";
	orderTitle["payment_type"] = "Type";


		
	var l_opInf= new Array()
	for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
	l_opInf[228]= "Successfully Deleted!";
	l_opInf[227]= "Successfully Inserted a New Record!";
	l_opInf[226]= "Successfully Updated!";

	l_opInf[238]= "Delete Failed!";
	l_opInf[237]= "Insert Failed!";
	l_opInf[236]= "Update Failed!";

	l_opInf[30128]= "Successfully Deleted!";
	l_opInf[30127]= "Successfully Inserted a New Record!";
	l_opInf[30126]= "Successfully Updated!";

	l_opInf[30138]= "Delete Failed!";
	l_opInf[30137]= "Insert Failed!";
	l_opInf[30136]= "Update Failed!";

	l_opInf[30228]= "Successfully Deleted!";
	l_opInf[30227]= "Successfully Inserted a New Record!";
	l_opInf[30226]= "Successfully Updated!";

	l_opInf[30238]= "Delete Failed!";
	l_opInf[30237]= "Insert Failed!";
	l_opInf[30236]= "Update Failed!";


	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 201,204,205,206,207, 30101,30104,30105,30106,30107, 30201,30204,30205,30206,30207];
	var ops_req_search = [-1, 201];// search never required on this page




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
	if (priv >= 5 && curViewDetailState == opValues["listAcctDetail"]) 
	{
		newPage += displayAcctDetailList (curPrivilage, curColumnToSort);
	}
	if (priv >= 5 && curViewDetailState == opValues["viewAcctDetail"]) 
	{
		newPage += displayAcctDetailDetails (curPrivilage, curColumnToSort);
	}
		
	
	/* Display Category Details */
	if (priv >= 5 && curViewDetailState == opValues["viewCategory"]) 	
	{
		newPage += displayAcctDetailCategory();
	}

	/* Display Form for Modify AcctDetail Category Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyCategoryForm"])	
	{
		newPage += displayModifyAcctDetailCategoryForm();
	}
	/* Submit the Modification of AcctDetail Category Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyCategorySubmit"])	
	{
		newPage += displayAcctDetailCategory();
	}
	
	/* Display Form for Add AcctDetail Category Details */
	if (priv >= 7 && curViewDetailState == opValues["insertCategoryForm"])	
	{
		newPage += displayInsertAcctDetailCategoryForm();
	}
	/* Submit the Insertion of AcctDetail Category Details */
	if (priv >= 7 && curViewDetailState == opValues["insertCategorySubmit"])	
	{
//		newPage += displayInsertAcctDetailForm();
		newPage += displayModifyAcctDetailForm();
	}
	
	/* Display Form for Modify AcctDetail Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyAcctDetailForm"])	
	{
		newPage += displayModifyAcctDetailForm();
	}
	/* Submit the Modification of AcctDetail Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyAcctDetailSubmit"])	
	{
		newPage += displayAcctDetailList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Insert AcctDetail Details */
	if (priv >= 7 && curViewDetailState == opValues["insertAcctDetailForm"])	
	{
		newPage += displayInsertAcctDetailForm();
	}
	/* Submit the Insertion of AcctDetail Details */
	if (priv >= 7 && curViewDetailState == opValues["insertAcctDetailSubmit"])	
	{
		newPage += displayAcctDetailList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Delete a recorde of AcctDetail */
//	if (priv >= 8 && curViewDetailState == opValues["deleteAcctDetailForm"])	
//	{
//		newPage += displayDeleteAcctDetailForm();
//	}
	/* Submit the Deletion of AcctDetail Details */
	if (priv >= 8 && curViewDetailState == opValues["deleteAcctDetailSubmit"])	
	{
		newPage += displayAcctDetailList(curPrivilage, curColumnToSort);
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





function displayAcctDetailList(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm ="";
	var ordIndex = 0;
	var customer_addr_details;

	customer_addr_details = customer_addr_jstab["1"] + "<br>" + customer_addr_jstab["2"] + "<br>" + customer_addr_jstab["3"] + " " + customer_addr_jstab["4"] + "<br>" + customer_addr_jstab["5"];

	ordIndex = cust_acct_jstab.length - 1;

	dispFrm += makespace("\t", indent) + "<tr> \n";
	dispFrm += makespace("\t", indent) + "<td align=\"left\">\n";
//	dispFrm += makespace("\t", indent+1) + "<div id=\"printReady\"> \n";
	dispFrm += makespace("\t", indent+1) + "<table width=\"100%\">\n";

	//dispFrm += makespace("\t", indent) + displayGlblFrm();
	dispFrm += makespace("\t", indent) + btnGroupAcctDetail_HTML();
//	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "account_details.php", "pg_3");

	dispFrm += makespace("\t", indent) + "<tr> \n";
	dispFrm += makespace("\t", indent) + "<td align=\"left\">\n";
	dispFrm += makespace("\t", indent+1) + "<table width=\"100%\">\n";

	dispFrm += makespace("\t", indent+1) + "<tr> \n";
	dispFrm += makefield(0, accountTitle["head_acct"], cust_acct_jstab [ordIndex][0], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 80);
	dispFrm += makefield(0, accountTitle["head_supp"], cust_acct_jstab [ordIndex][1] + "&nbsp;&nbsp;" + cust_acct_jstab [ordIndex][2], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 80);
	dispFrm += makespace("\t", indent+1) + "</tr> \n";

	dispFrm += makespace("\t", indent+1) + "<tr> \n";
	dispFrm += makefield(0, accountTitle["head_addr"], customer_addr_details, "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 80);
	dispFrm += makefield(0, accountTitle["head_cust"], cust_acct_jstab [ordIndex][3] + "&nbsp;&nbsp;" + cust_acct_jstab [ordIndex][4], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 80);
	dispFrm += makespace("\t", indent+1) + "</tr> \n";
/*
	dispFrm += makespace("\t", indent+1) + "</table>\n";
	dispFrm += makespace("\t", indent) + "</td>\n";	
	dispFrm += makespace("\t", indent) + "</tr> \n";

  
	dispFrm += makespace("\t", indent) + "<tr> \n";
	dispFrm += makespace("\t", indent) + "<td align=\"left\"> \n";
//	dispFrm += makespace("\t", indent+1) + "<div id=\"printReady\"> \n";
	dispFrm += makespace("\t", indent+2) + "<table width=\"100%\">\n";
*/
	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makefield(0, accountTitle["acct_category"], cust_acct_jstab [ordIndex][6], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makefield(0, accountTitle["acct_deliv_loc"], cust_acct_jstab [ordIndex][7], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makefield(0, accountTitle["acct_inv_type"], cust_acct_jstab [ordIndex][8], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makefield(0, accountTitle["acct_inv_gen"], cust_acct_jstab [ordIndex][9], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makefield(0, accountTitle["acct_sale_type"], cust_acct_jstab [ordIndex][10], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makefield(0, accountTitle["acct_credit_terms"], cust_acct_jstab [ordIndex][11], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makefield(0, accountTitle["acct_pricing_type"], cust_acct_jstab [ordIndex][12], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makefield(0, accountTitle["acct_order_life"], cust_acct_jstab [ordIndex][13], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr>\n";
	
	dispFrm += makespace("\t", indent+2) + "</table>\n";
//	dispFrm += makespace("\t", indent+1) + "</div> \n";  
	dispFrm += makespace("\t", indent) + "</td> \n";
	dispFrm += makespace("\t", indent) + "</tr> \n";


	dispFrm += makespace("\t", indent) + "<tr> \n";
	dispFrm += makespace("\t", indent) + "<td align=\"left\"> \n";
	dispFrm += makespace("\t", indent+1) + "<div id=\"helparea\"> \n";
	dispFrm += makespace("\t", indent+2) + "<table width=\"100%\">\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	if ( cust_acct_jstab [ordIndex][14] <= 0 )
	{
		dispFrm += makefield(0, accountTitle["tail_avail_balance"], (-1.0)*cust_acct_jstab [ordIndex][14], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
		dispFrm += makefield(0, "&nbsp;", accountTitle["tail_credit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 40);
	}
	else
	{
		dispFrm += makefield(0, accountTitle["tail_avail_balance"], cust_acct_jstab [ordIndex][14], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
		dispFrm += makefield(0, "&nbsp;", accountTitle["tail_debit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 40);
	}
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	if ( cust_acct_jstab [ordIndex][15] <= 0 )
	{
		dispFrm += makefield(0, accountTitle["tail_acct_balance"], (-1.0)*cust_acct_jstab [ordIndex][15], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
		dispFrm += makefield(0, "&nbsp;", accountTitle["tail_credit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 40);
	}
	else
	{
		dispFrm += makefield(0, accountTitle["tail_acct_balance"], cust_acct_jstab [ordIndex][15], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
		dispFrm += makefield(0, "&nbsp;", accountTitle["tail_debit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 40);
	}
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	if ( cust_acct_jstab [ordIndex][16] <= 0 )
	{
		dispFrm += makefield(0, accountTitle["tail_credit_limit"], (-1.0)*cust_acct_jstab [ordIndex][16], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
		dispFrm += makefield(0, "&nbsp;", accountTitle["tail_credit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 40);
	}
	else
	{
		dispFrm += makefield(0, accountTitle["tail_credit_limit"], cust_acct_jstab [ordIndex][16], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
		dispFrm += makefield(0, "&nbsp;", accountTitle["tail_debit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 40);
	}
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	if ( cust_acct_jstab [ordIndex][17] <= 0 )
	{
		dispFrm += makefield(0, accountTitle["tail_duein_terms"], (-1.0)*cust_acct_jstab [ordIndex][17], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
		dispFrm += makefield(0, "&nbsp;", accountTitle["tail_credit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 40);
	}
	else
	{
		dispFrm += makefield(0, accountTitle["tail_duein_terms"], cust_acct_jstab [ordIndex][17], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
		dispFrm += makefield(0, "&nbsp;", accountTitle["tail_debit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 40);
	}
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	if ( cust_acct_jstab [ordIndex][18] <= 0 )
	{
		dispFrm += makefield(0, accountTitle["tail_dueout_terms"], (-1.0)*cust_acct_jstab [ordIndex][18], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
		dispFrm += makefield(0, "&nbsp;", accountTitle["tail_credit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 40);
	}
	else
	{
		dispFrm += makefield(0, accountTitle["tail_dueout_terms"], cust_acct_jstab [ordIndex][18], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
		dispFrm += makefield(0, "&nbsp;", accountTitle["tail_debit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 40);
	}
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	if ( cust_acct_jstab [ordIndex][19] <= 0 )
	{
		dispFrm += makefield(0, accountTitle["tail_last_payment"], (-1.0)*cust_acct_jstab [ordIndex][19], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
		dispFrm += makefield(0, "&nbsp;", accountTitle["tail_credit_abbrv"]+"&nbsp;&nbsp;"+accountTitle["tail_last_payment_date"] + "&nbsp;&nbsp;" + cust_acct_jstab [ordIndex][20] + "&nbsp;" + cust_acct_jstab [ordIndex][21], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 40);
	}
	else
	{
		dispFrm += makefield(0, accountTitle["tail_last_payment"], cust_acct_jstab [ordIndex][19], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
		dispFrm += makefield(0, "&nbsp;",  accountTitle["tail_credit_abbrv"]+"&nbsp;&nbsp;"+accountTitle["tail_last_payment_date"] + "&nbsp;&nbsp;" + cust_acct_jstab [ordIndex][20] + "&nbsp;" + cust_acct_jstab [ordIndex][21], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 40);
	}
	dispFrm += makespace("\t", indent+2) + "</tr>\n";


	dispFrm += makespace("\t", indent+2) + "</table>\n";
//	dispFrm += makespace("\t", indent+1) + "</div> \n";  
	dispFrm += makespace("\t", indent) + "</td> \n";
	dispFrm += makespace("\t", indent) + "</tr> \n";

	dispFrm += makespace("\t", indent+2) + "</table>\n";
//	dispFrm += makespace("\t", indent+1) + "</div> \n";  
	dispFrm += makespace("\t", indent) + "</td> \n";
	dispFrm += makespace("\t", indent) + "</tr> \n";

	return dispFrm;
}




function displayAcctDetailDetails(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm = "";

	return dispFrm;
}





function displayModifyAcctDetailForm ()
{
	var indent = 1;
	var updFrm = "";
	var customer_addr_details;

	customer_addr_details = customer_addr_jstab["1"] + "<br>" + customer_addr_jstab["2"] + "<br>" + customer_addr_jstab["3"] + " " + customer_addr_jstab["4"] + "<br>" + customer_addr_jstab["5"];

	updFrm += makespace("\t", indent) + btnGroupModifyAcctDetail_HTML();

	updFrm += makespace("\t", indent) + "<tr> \n";
	updFrm += makespace("\t", indent) + "<td align=\"left\">\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + otherText["tab_cust"] + "</li>\n";
	updFrm += "</ul>\n";

	updFrm += "<div class=\"adminform\">\n";
	updFrm += makespace("\t", indent+1) + "<table width=\"100%\">\n";

	updFrm += makespace("\t", indent+1) + "<tr> \n";
	updFrm += makefield(0, accountTitle["head_acct"], acct_det_jstab [1], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 80);
	updFrm += makefield(0, accountTitle["head_supp"], acct_det_jstab [2] + "&nbsp;&nbsp;" + acct_det_jstab [3], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 80);
	updFrm += makespace("\t", indent+1) + "</tr> \n";

	updFrm += makespace("\t", indent+1) + "<tr> \n";
	updFrm += makefield(0, accountTitle["head_addr"], customer_addr_details, "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 80);
	updFrm += makefield(0, accountTitle["head_cust"], acct_det_jstab [4] + "&nbsp;&nbsp;" + acct_det_jstab [5], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 80);
	updFrm += makespace("\t", indent+1) + "</tr> \n";

	updFrm += makespace("\t", indent+1) + "</table>\n";
	updFrm += makespace("\t", indent+1) + "</div>\n";

	updFrm += makespace("\t", indent) + "</td>\n";	
	updFrm += makespace("\t", indent) + "</tr> \n";


	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td>\n";
//	updFrm += makespace("\t", indent+3) + "<div id=\"printReady\">\n";

	updFrm += makespace("\t", indent+1) + "<form name=\"edit_acctdet\" method=\"get\" id=\"edit_acctdet\" action=\"account_details.php\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + otherText["msg_updAcctDetail_fSet"] + "</li>\n";
	updFrm += "</ul>\n";
	updFrm += "<div class=\"adminform\">\n";

//	updFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	updFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_updAcctDetail_fSet"] + "</strong></legend>\n";

	updFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	updFrm += makespace("\t", indent+4) + "<br>\n";
	updFrm += makespace("\t", indent+4) + otherText["msg_updAcctDetail_frmComplt"] +"\n";

	// hidden area for passing values between web pages
//	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"catCode\" id=\"catCode\" value=\"" + frm_category + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyAcctDetailSubmit"] + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"suppCd\" value=\"" + cmpyCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	updFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
//	updFrm += makefield(2, accountTitle["acct_category"], frm_category, "frm_category", "frm_category", cust_category_jslst, 0, 0, "onchange=\"justChaneMyLocation('account_details.php?pg_3=1&pg=1&suppCd="+suppCd+"&cmpyCd="+cmpyCd+"&custAcc="+custAcc+"&prevOp=" + opValues["modifyAcctDetailForm"] + "&op=" + opValues["modifyCategoryForm"] + "&frm_catcode="+ frm_category +"'); \" dataType=\"Require\"", otherText["msg_selAcctDetailCategory"], "*", indent+4, 100);

//	updFrm += makefield(2, accountTitle["acct_category"], frm_category, "frm_category", "frm_category", cust_category_jslst, 0, 0, "dataType=\"Require\"", otherText["msg_selAcctDetailCategory"], "*", indent+4, 100);
	updFrm += makefield(2, accountTitle["acct_category"], frm_category, "frm_category", "frm_category", cust_category_jslst, 0, 0, "", "", "&nbsp;", indent+4, 100);

//	updFrm += makefield(3, accountTitle["acct_deliv_loc"], frm_delivloc, "frm_delivloc", "frm_delivloc", "", 30, 15, "", "", "&nbsp;", indent+4, 100);
//	updFrm += makefield(2, accountTitle["acct_deliv_loc"], frm_delivloc, "frm_delivloc", "frm_delivloc", delvloc_jslst, 0, 0, "dataType=\"Require\"", otherText["msg_selAcctDetailDelivLoc"], "*", indent+4, 100);
	updFrm += makefield(2, accountTitle["acct_deliv_loc"], frm_delivloc, "frm_delivloc", "frm_delivloc", delvloc_jslst, 0, 0, "", "", "&nbsp;", indent+4, 100);

	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(2, accountTitle["acct_inv_type"], frm_invtype, "frm_invtype", "frm_invtype", invtype_jslst, 0, 0, "dataType=\"Require\"", otherText["msg_selAcctDetailInvoiceType"], "*", indent+4, 100);
	updFrm += makefield(2, accountTitle["acct_inv_gen"], frm_invgen, "frm_invgen", "frm_invgen", invgen_jslst, 0, 0, "dataType=\"Require\"", otherText["msg_selAcctDetailInvoiceGen"], "*", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 3rd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(2, accountTitle["acct_sale_type"], frm_saletype, "frm_saletype", "frm_saletype", sale_types, 0, 0, "dataType=\"Require\"", otherText["msg_selAcctDetailSaleType"], "*", indent+4, 100);
//	updFrm += makefield(1, accountTitle["acct_credit_terms"], frm_crterms, "frm_crterms", "frm_crterms", "", 30, 4, "dataType=\"Number\"", otherText["msg_enterAcctDetailCreditTerms"], "*", indent+4, 100);
	updFrm += makefield(1, accountTitle["acct_credit_terms"], frm_crterms, "frm_crterms", "frm_crterms", "", 30, 2, "dataType=\"RangeInt\" min=\"0\" max=\"99\" ", otherText["msg_enterAcctDetailCreditTerms"]+"( 0-99 )", "*", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 4th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(2, accountTitle["acct_pricing_type"], frm_pricetype, "frm_pricetype", "frm_pricetype", price_type_jslst, 0, 0, "dataType=\"Require\"", otherText["msg_selAcctDetailPricingType"], "*", indent+4, 100);
//	updFrm += makefield(1, accountTitle["acct_order_life"], frm_ordlife, "frm_ordlife", "frm_ordlife", "", 30, 4, "dataType=\"Number\"", otherText["msg_enterAcctDetailOrderLife"], "*", indent+4, 100);
	updFrm += makefield(1, accountTitle["acct_order_life"], frm_ordlife, "frm_ordlife", "frm_ordlife", "", 30, 4, "dataType=\"RangeInt\" min=\"0\" max=\"9999\" ", otherText["msg_enterAcctDetailOrderLife"]+"( 0-9999 )", "*", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 5th row
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
	// fix for bugzilla 1494
	var maxL = 9;
	if ( decNumber > 0 )
	{
		maxL = maxL + decNumber + 1;
	}
	updFrm += makefield(1, accountTitle["acct_credit_limit"], frm_crlimit, "frm_crlimit", "frm_crlimit", "", 30, maxL, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", otherText["msg_enterAcctDetailCreditLimit"]+"( "+minVal+" - 999999999 )", "*", indent+4, 100);
//	updFrm += makefield(1, accountTitle["acct_credit_limit"], frm_crlimit, "frm_crlimit", "frm_crlimit", "", 30, 9, "dataType=\"RangeInt\" min=\"0\" max=\"999999999\" ", otherText["msg_enterAcctDetailCreditLimit"]+"( 0 - 999999999 )", "*", indent+4, 100);

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

//	updFrm += makespace("\t", indent+3) + "</div>\n";

	updFrm += makespace("\t", indent) + "</td>\n";
	updFrm += makespace("\t", indent) + "</tr>\n";

	return updFrm;
}



function displayInsertAcctDetailForm ()
{
	var indent = 1;
	var addFrm = "";
	var i;
	var suppStr = "";
	var custStr = "";

	addFrm += makespace("\t", indent) + btnGroupInsertAcctDetail_HTML();

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

	addFrm += makespace("\t", indent+1) + "<form name=\"add_payment\" method=\"get\" id=\"add_payment\" action=\"account_details.php\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	addFrm += " <ul id=\"tabmenu\">\n";
	addFrm += "<li>" + otherText["msg_addAcctDetail_fSet"] + "</li>\n";
	addFrm += "</ul>\n";
	addFrm += "<div class=\"adminform\">\n";

//	addFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	addFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_addAcctDetail_fSet"] + "</strong></legend>\n";

	addFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	addFrm += makespace("\t", indent+4) + "<br>\n";
	addFrm += makespace("\t", indent+4) + otherText["msg_addAcctDetail_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["insertAcctDetailSubmit"] + "\">\n";

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



function displayDeleteAcctDetailForm ()
{
	var delFrm = "";


	return delFrm;
}




function displayAcctDetailCategory ()
{
	var indent = 1;
	var dispFrm = "";

	return dispFrm;
}



function displayModifyAcctDetailCategoryForm ()
{
	var indent = 1;
	var updFrm = "";

	updFrm += makespace("\t", indent) + btnGroupCategory_HTML();

	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td>\n";

//	updFrm += makespace("\t", indent+1) + "<div id=\"printReady\">\n";

	updFrm += makespace("\t", indent+1) + "<form name=\"edit_category\" method=\"get\" id=\"edit_category\" action=\"account_details.php\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + otherText["msg_updCategory_fSet"] + "</li>\n";
	updFrm += "</ul>\n";
	updFrm += "<div class=\"adminform\">\n";

//	updFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	updFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_updCategory_fSet"] + "</strong></legend>\n";

	updFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	updFrm += makespace("\t", indent+4) + "<br>\n";
	updFrm += makespace("\t", indent+4) + otherText["msg_updCategory_frmComplt"] +"\n";

	// hidden area for passing values between web pages
//	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"catCode\" id=\"catCode\" value=\"" + catCode + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyCategorySubmit"] + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"prevOp\" id=\"prevOp\" value=\"" + prevOp + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"suppCd\" value=\"" + cmpyCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	updFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
//	updFrm += makefield(3, accountTitle["cat_code"], frm_catcode, "frm_catcode", "frm_catcode", "", 30, 19, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(2, accountTitle["cat_code"], frm_catcode, "frm_catcode", "frm_catcode", cust_category_jslst, 0, 0, "dataType=\"Require\" onchange=\"update(document.edit_category, this, document.edit_category.frm_catdesc)\"", otherText["msg_selAcctDetailCategory"], "*", indent+4, 100);


	updFrm += makefield(1, accountTitle["cat_desc"], frm_catdesc, "frm_catdesc", "frm_catdesc", "", 50, 49, "dataType=\"Require\"", otherText["msg_enterAcctDetailCatDesc"], "*", indent+4, 100);
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

//	updFrm += makespace("\t", indent+1) + "</div>\n";

	updFrm += makespace("\t", indent) + "</td>\n";
	updFrm += makespace("\t", indent) + "</tr>\n";

	return updFrm;
}






function displayInsertAcctDetailCategoryForm ()
{
	var indent = 1;
	var addFrm = "";

	addFrm += makespace("\t", indent) + btnGroupCategory_HTML();

	addFrm += makespace("\t", indent) + "<tr>\n";
	addFrm += makespace("\t", indent) + "<td>\n";
//	addFrm += makespace("\t", indent+3) + "<div id=\"printReady\">\n";

	addFrm += makespace("\t", indent+1) + "<form name=\"add_category\" method=\"get\" id=\"add_category\" action=\"account_details.php\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	addFrm += " <ul id=\"tabmenu\">\n";
	addFrm += "<li>" + otherText["msg_updCategory_fSet"] + "</li>\n";
	addFrm += "</ul>\n";
	addFrm += "<div class=\"adminform\">\n";

//	addFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	addFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_updCategory_fSet"] + "</strong></legend>\n";

	addFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	addFrm += makespace("\t", indent+4) + "<br>\n";
	addFrm += makespace("\t", indent+4) + otherText["msg_updCategory_frmComplt"] +"\n";

	// hidden area for passing values between web pages
//	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"catCode\" id=\"catCode\" value=\"" + catCode + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["insertCategorySubmit"] + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"prevOp\" id=\"prevOp\" value=\"" + prevOp + "\">\n";

	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"suppCd\" value=\"" + cmpyCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	addFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(1, accountTitle["cat_code"], frm_catcode, "frm_catcode", "frm_catcode", "", 30, 19, "dataType=\"Require\"", otherText["msg_enterAcctDetailCatCode"], "*", indent+4, 100);
	addFrm += makefield(1, accountTitle["cat_desc"], frm_catdesc, "frm_catdesc", "frm_catdesc", "", 50, 49, "dataType=\"Require\"", otherText["msg_enterAcctDetailCatDesc"], "*", indent+4, 100);
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

//	addFrm += makespace("\t", indent+1) + "</div>\n";

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



function deliv_loc_field(attr)
{
  var fieldHTML ="";
  fieldHTML += "<input name=\"delivCd\" id=\"delivCd\" value=\""+delivCd+"\" "+attr+" >\n";
  return fieldHTML;
}




function btnGroupAcctDetail_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	if(priv>=7)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('account_details.php?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["insertAcctDetailForm"] + "'); ", otherText["btn_addNew_acctDetail"]);
	}
	if(priv>=6)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('account_details.php?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["modifyAcctDetailForm"] + "'); ", otherText["btn_upd_acctDetail"]);
	}

//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

	btn_HTML += btnLocation_HTML("justChaneMyLocation('cust.php?suppCd='+suppCd); ", otherText["btn_bakto_customers"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}




function btnGroupAcctDetailDetails_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";


	btn_HTML += btnLocation_HTML("justChaneMyLocation('account_details.php?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listAcctDetail"] + "'); ", otherText["btn_bakto_acctDetailPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function btnGroupModifyAcctDetail_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	if (priv >= 7)
	{
		btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('account_details.php?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&prevOp=" + opValues["modifyAcctDetailForm"] + "&op=" + opValues["insertCategoryForm"] + "'); ", otherText["btn_addNew_category"]);
	}
	if (priv >= 6)
	{
		btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('account_details.php?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&prevOp=" + opValues["modifyAcctDetailForm"] + "&op=" + opValues["modifyCategoryForm"] + "&frm_catcode="+ frm_category +"'); ", otherText["btn_upd_category"]);
	}

//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

	btn_HTML += btnLocation_HTML("justChaneMyLocation('account_details.php?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listAcctDetail"] + "'); ", otherText["btn_bakto_acctDetailPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function btnGroupInsertAcctDetail_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

	btn_HTML += btnLocation_HTML("justChaneMyLocation('account_details.php?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listAcctDetail"] + "'); ", otherText["btn_bakto_acctDetailPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}




function btnGroupCategory_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

	btn_HTML += btnLocation_HTML("justChaneMyLocation('account_details.php?pg_3='+pg_3+'&pg='+pg+'&op='+prevOp+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc); ", otherText["btn_bakto_acctDetailPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}





function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	if (op == opValues["listAcctDetail"])
	{
		pageHeading += otherText["pgHead_acctDetail"];
	}

	if(op == opValues["viewCategory"])
	{
		pageHeading += otherText["pgHead_category"];
	}

	if(op == opValues["modifyAcctDetailForm"] || op == opValues["modifyAcctDetailSubmit"])
	{
		pageHeading += otherText["pgHead_acctDetailUpd"];
	}
	if(op == opValues["insertAcctDetailForm"] || op == opValues["insertAcctDetailSubmit"])
	{
		pageHeading += otherText["pgHead_acctDetailAdd"];
	}
	if(op == opValues["deleteAcctDetailForm"] || op == opValues["deleteAcctDetailSubmit"])
	{
		pageHeading += otherText["pgHead_acctDetailDel"];
	}
	if(op == opValues["modifyCategoryForm"] || op == opValues["modifyCategorySubmit"])
	{
		pageHeading += otherText["pgHead_categoryUpd"];
	}
	if(op == opValues["insertCategoryForm"] || op == opValues["insertCategorySubmit"])
	{
		pageHeading += otherText["pgHead_categoryAdd"];
	}

	return pageHeading; 
}



function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	if (op == opValues["listAcctDetail"])
	{
		pageTitle += otherText["pgTitle_acctDetail"];
	}

	if(op == opValues["viewCategory"])
	{
		pageTitle += otherText["pgTitle_category"];
	}

	if(op == opValues["modifyAcctDetailForm"] || op == opValues["modifyAcctDetailSubmit"])
	{
		pageTitle += otherText["pgTitle_acctDetailUpd"];
	}
	if(op == opValues["insertAcctDetailForm"] || op == opValues["insertAcctDetailSubmit"])
	{
		pageTitle += otherText["pgTitle_acctDetailAdd"];
	}
	if(op == opValues["deleteAcctDetailForm"] || op == opValues["deleteAcctDetailSubmit"])
	{
		pageTitle += otherText["pgTitle_acctDetailDel"];
	}
	if(op == opValues["modifyCategoryForm"] || op == opValues["modifyCategorySubmit"])
	{
		pageTitle += otherText["pgTitle_categoryUpd"];
	}
	if(op == opValues["insertCategoryForm"] || op == opValues["insertCategorySubmit"])
	{
		pageTitle += otherText["pgTitle_categoryAdd"];
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
			op_list += "<option value=\"" + opValues["deleteAcctDetailSubmit"] + "\">" + commText["Delete"] + "</option>";

		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

		case 6:     
			op_list += "<option value=\"" + opValues["modifyAcctDetailForm"] + "\">" + commText["Modify"] + "</option>";

		case 5:			/* Find Has not been implemented yet*/
			op_list += "<option value=\"" + opValues["viewAcctDetail"] + "\">" + otherText["delivLocDetails"] + "</option>";
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
              -> curPgName string is the php file name user browsing
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
    nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listAcctDetail"] + "'); ", "&lt;&lt;");
		foobar = page_number - 1;
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		 nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listAcctDetail"] + "'); ", "<b>&lt;<\/b>");
		
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listAcctDetail"] + "'); ", foobar1 + "-" + foobar2);
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
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listAcctDetail"] + "'); ", i);
	}
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	for (var i=page_number+1; i<foobar2; i++) 
  {
    //alert("I am in for for foobar2 loop "+i);	
    nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listAcctDetail"] + "'); ", i);
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listAcctDetail"] + "'); ", tempTxt);
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
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listAcctDetail"] + "'); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listAcctDetail"] + "'); ", "<b>&gt;&gt;<\/b>");
	} else {
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}

	/*
  if (curPg > 1)
	{
		
    //nextPgHTML +="<a href=\"javascript:document.glblFrm.pg.value="+(curPg-1)+";document.glblFrm.op.value=0;document.glblFrm.submit();\">Previous</a>\n";
   //		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg-1) + "' );\">Previous</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg-1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listAcctDetail"] + "'); ", otherText["btn_prev_page"]);
	}

	nextPgHTML += "&nbsp; Current=" + curPg + "/" + totalPages + " &nbsp; ";
	if (totalPages > curPg)
	{
//		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg+1) + "' );\">Next</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg+1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listAcctDetail"] + "'); ", "&lt;&lt;");
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
	var i;

	parent_select = parentOption.value;
	for (i in cust_category_jslst )
	{
		if (cust_category_jslst[i][0] == parent_select)
		{
			childOption.value = cust_category_jslst[i][2];
		}
	}
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

	newPage += "	if(myselectedvalue==\"" + opValues["deleteAcctDetailSubmit"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(confirm('" + otherText["msg_del_confirm"] + "'))\n";
	newPage += "		{\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["deleteAcctDetailSubmit"] + "+\"';\");\n";

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

