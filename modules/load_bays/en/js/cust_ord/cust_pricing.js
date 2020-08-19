if ('Y' != g.isMng){
        cmpy_jslst.reverse();
        cmpy_jslst.pop();
}

	var opValues = new Array();

	// operations to pricing from: 
	// order entry and maintenance - order details
	// order entry and maintenance - order details - product periods
	// order entry and maintenance - schedule orders
	opValues["baseCustPricing"] = 10600;
	opValues["listCustPricing"] = 10601;
	opValues["searchCustPricingForm"] = 10604;		// reserved
	opValues["searchCustPricingSubmit"] = 10614;		// reserved
	opValues["viewCustPricing"] = 10605;
	opValues["modifyCustPricingForm"] = 10606;
	opValues["modifyCustPricingSubmit"] = 10616;
	opValues["insertCustPricingForm"] = 10607;
	opValues["insertCustPricingSubmit"] = 10617;
	opValues["deleteCustPricingForm"] = 10608;
	opValues["deleteCustPricingSubmit"] = 10618;



	var column_headers = [
			"Supplier", "Customer", "Category", "Price Offset", "Amount", "Currency/%"
	];
		
	var otherText = new Array();
	otherText["youraction"] =  "YOUR ACTION";


	otherText["btn_addNew_custPricing"] =  "Add New Customer Prices";

	otherText["btn_bakto_custPricingPg"] =  "Back to Customer Prices";

	otherText["btn_next_page"] =  "Next";
	otherText["btn_prev_page"] =  "Previous";
	

	otherText["pgTitle_custPricing"] =  "Customer Order Processing, Customer Pricing";
	otherText["pgTitle_custPricingUpd"] =  "Customer Order Processing, Customer Pricing, Modify";
	otherText["pgTitle_custPricingAdd"] =  "Customer Order Processing, Customer Pricing, Add";
	otherText["pgTitle_custPricingDel"] =  "Customer Order Processing, Customer Pricing, Delete";

	otherText["pgHead_custPricing"] =  "Customer Prices";
	otherText["pgHead_custPricingUpd"] =  "Modify Customer Prices";
	otherText["pgHead_custPricingAdd"] =  "Add Customer Prices";
	otherText["pgHead_custPricingDel"] =  "Delete Customer Prices";

	otherText["msg_del_confirm"] =  "Are you sure you want to delete?";

    otherText["msg_updCustPricing_fSet"] =  "Customer Prices";
    otherText["msg_updCustPricing_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_addCustPricing_fSet"] =  "Customer Prices";
    otherText["msg_addCustPricing_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";


	otherText["msg_selPoSupplier"] = "Please select a supplier!";
	otherText["msg_selPoCustomer"] = "Please select a customer!";
	otherText["msg_selPoCategory"] = "Please select a category!";
	otherText["msg_selPoOffset"] = "Please select a price offset!";
	otherText["msg_selPoCurrency"] = "{$/%}";

	otherText["msg_enterPoAmount"] = "Please enter the price offset ammount ";

	otherText["wrongInput"] = "Note: Only the Customer OR the Category can be chosen, not both!";
	var alertWrongInput = otherText["wrongInput"];


	var orderTitle = new Array();

	orderTitle["po_supplier"] = "Supplier"; 
	orderTitle["po_customer"] = "Customer"; 
	orderTitle["po_category"] = "Category"; 
	orderTitle["po_offset"] = "Price Offset"; 
	orderTitle["po_currency"] = "Currency / %"; 
	orderTitle["po_amount"] = "Amount"; 	


	var items_per_page = 10;
		
	var l_opInf= new Array()
	for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
	l_opInf[10628]= "Successfully Deleted!";
	l_opInf[10627]= "Successfully Inserted a New Record!";
	l_opInf[10626]= "Successfully Updated!";

	l_opInf[10638]= "Delete Failed!";
	l_opInf[10637]= "Insert Failed!";
	l_opInf[10636]= "Update Failed!";


	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 10601,10604,10605,10606,10607];
	var ops_req_search = [10601];// search never required on this page



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
	if (priv >= 5 && curViewDetailState == opValues["listCustPricing"]) 
	{
		newPage += displayPriceOffsetList (curPrivilage, curColumnToSort);
	}
	if (priv >= 5 && curViewDetailState == opValues["viewCustPricing"]) 
	{
		newPage += displayPriceOffsetDetails (curPrivilage, curColumnToSort);
	}
		
	
	/* Display Form for Modify Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyCustPricingForm"])	
	{
		newPage += displayModifyPriceOffsetForm();
	}
	/* Submit the Modification of Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyCustPricingSubmit"])	
	{
		newPage += displayPriceOffsetList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Insert Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertCustPricingForm"])	
	{
		newPage += displayInsertPriceOffsetForm();
	}
	/* Submit the Insertion of Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertCustPricingSubmit"])	
	{
		newPage += displayPriceOffsetList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Delete a recorde of Order */
//	if (priv >= 8 && curViewDetailState == opValues["deleteCustPricingForm"])	
//	{
//		newPage += displayDeleteOrderForm();
//	}
	/* Submit the Deletion of Order Details */
	if (priv >= 8 && curViewDetailState == opValues["deleteCustPricingSubmit"])	
	{
		newPage += displayPriceOffsetList(curPrivilage, curColumnToSort);
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



function displayPriceOffsetList(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm ="";
	var aId;
	var i;
	var ai;
	
	//dispFrm += makespace("\t", indent) + displayGlblFrm();
	dispFrm += makespace("\t", indent) + btnGroupCustPricing_HTML();
	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "cust_pricing.cgi", "pg_3");

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

	for(i in price_offset_jstab)
	{
		if (i>0)
		{
			// get the names from codes
			for(ai in cmpy_jslst)
			{
				if (cmpy_jslst[ai][0] == price_offset_jstab[i][0])
				{
					price_offset_jstab[i][0] = cmpy_jslst[ai][1];
				}
				else
				if (price_offset_jstab[i][0] == "ANY")
				{
					price_offset_jstab[i][0] = "ALL";
				}
			}
			for(ai in cust_acct_jslst)
			{
				if (cust_acct_jslst[ai][0] == price_offset_jstab[i][1])
				{
					price_offset_jstab[i][1] = cust_acct_jslst[ai][1];
				}
			}
			for(ai in cust_category_jslst)
			{
				if (cust_category_jslst[ai][0] == price_offset_jstab[i][2])
				{
					price_offset_jstab[i][2] = cust_category_jslst[ai][1];
				}
			}
			for(ai in proff_jslst)
			{
				if (proff_jslst[ai][0] == price_offset_jstab[i][3])
				{
					price_offset_jstab[i][3] = proff_jslst[ai][1];
				}
			}

			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone =0;
			for(var j=0; j<column_headers.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(price_offset_jstab[i][howmanyDone]) + "<\/td>";
				} 
				else 
				{
					dispFrm += makespace("\t", indent+2) + "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						dispFrm += makespace("\t", indent+3) + "<form name=\"select_action_" + i + "\" id=\"select_action_" + i + "\" >\n";
						dispFrm += makespace("\t", indent+4) + "<table border=\"0\">\n";
						dispFrm += makespace("\t", indent+4) + "<tr>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\"> <span style=\"COLOR: #FF0000;\">" + obs(price_offset_jstab[i][howmanyDone]) + "</span>\n";

						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";

						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"proffKey\" id=\"proffKey\" value=\"" + price_offset_jstab[i][6] + "\">\n";

						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

						dispFrm += makespace("\t", indent+5) + preqstr_field ();
						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

						dispFrm += makespace("\t", indent+5) + op_list (curPrivilage, i);

						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "</tr>\n";
						dispFrm += makespace("\t", indent+4) + "</table>\n";
						dispFrm += makespace("\t", indent+3) + "</form>\n";
					}
					else
					{
						dispFrm += makespace("\t", indent+3) + obs(price_offset_jstab[i][howmanyDone]);
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
  
//	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "cust_pricing.cgi", "pg_3");
//	dispFrm += makespace("\t", indent) + btnGroupCustPricing_HTML();

	return dispFrm;
}



function displayPriceOffsetDetails(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm = "";

	return dispFrm;
}





function displayModifyPriceOffsetForm ()
{
	var indent = 1;
	var updFrm = "";
	var i;
	var po_supplier_name="";
	var po_customer_name="";
	var po_category_name="";
	var po_offset_name="";


	for(i in cmpy_jslst)
	{
		if (cmpy_jslst[i][0] == frm_po_supplier)
		{
			po_supplier_name = cmpy_jslst[i][1];
		}
	}
	for(i in cust_acct_jslst)
	{
		if (cust_acct_jslst[i][0] == frm_po_customer)
		{
			po_customer_name = cust_acct_jslst[i][1];
		}
	}
	for(i in cust_category_jslst)
	{
		if (cust_category_jslst[i][0] == frm_po_category)
		{
			po_category_name = cust_category_jslst[i][1];
		}
	}
	for(i in proff_jslst)
	{
		if (proff_jslst[i][0] == frm_po_offset)
		{
			po_offset_name = proff_jslst[i][1];
		}
	}

	updFrm += makespace("\t", indent) + btnGroupModifyCustPricing_HTML();


	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td>\n";
	updFrm += makespace("\t", indent+1) + "<form name=\"edit_cust_pricing\" method=\"get\" id=\"edit_cust_pricing\" action=\"cust_pricing.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + otherText["msg_updCustPricing_fSet"] + "</li>\n";
	updFrm += "</ul>\n";
	updFrm += "<div class=\"adminform\">\n";

//	updFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	updFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_updCustPricing_fSet"] + "</strong></legend>\n";

	updFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	updFrm += makespace("\t", indent+4) + "<br>\n";
	updFrm += makespace("\t", indent+4) + otherText["msg_updCustPricing_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyCustPricingSubmit"] + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	updFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"proffKey\" id=\"proffKey\" value=\"" + proffKey + "\">\n";

	updFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"frm_po_supplier\" id=\"frm_po_supplier\" value=\"" + frm_po_supplier + "\">\n";
	updFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"frm_po_customer\" id=\"frm_po_customer\" value=\"" + frm_po_customer + "\">\n";
	updFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"frm_po_category\" id=\"frm_po_category\" value=\"" + frm_po_category + "\">\n";
	updFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"frm_po_offset\" id=\"frm_po_offset\" value=\"" + frm_po_offset + "\">\n";

	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	updFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(0, orderTitle["po_supplier"], po_supplier_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(0, orderTitle["po_offset"], po_offset_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(0, orderTitle["po_customer"], po_customer_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);

	var minVal = 1.0;
	var decVal = 1.0;
	var i;
	for (i=0; i<decNumber; i++)
	{
		minVal = minVal / 10.0;
		decVal = decVal * 10.0;
	}
	decVal = decVal * 10.0;
	updFrm += makefield(1, orderTitle["po_amount"], frm_po_amount, "frm_po_amount", "frm_po_amount", "", 30, 30, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", otherText["msg_enterPoAmount"]+"( >="+minVal+" )", "*", indent+4, 100);

	updFrm += makespace("\t", indent+4) + "</tr>\n";



	// 3rd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(0, orderTitle["po_category"], po_category_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(2, orderTitle["po_currency"], frm_po_currency, "frm_po_currency", "frm_po_currency", currency_jslst, 0, 0, "dataType=\"UnsafeStr\"", otherText["msg_selPoCurrency"], "*", indent+4, 100);
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


function displayInsertPriceOffsetForm ()
{
	var indent = 1;
	var addFrm = "";

	addFrm += makespace("\t", indent) + btnGroupInsertCustPricing_HTML();


	addFrm += makespace("\t", indent) + "<tr>\n";
	addFrm += makespace("\t", indent) + "<td>\n";
	addFrm += makespace("\t", indent+1) + "<form name=\"add_cust_pricing\" method=\"get\" id=\"add_cust_pricing\" action=\"cust_pricing.cgi\" onsubmit=\"return submitInsertPriceOffsetFrm(this);\">\n";

	addFrm += " <ul id=\"tabmenu\">\n";
	addFrm += "<li>" + otherText["msg_addCustPricing_fSet"] + "</li>\n";
	addFrm += "</ul>\n";
	addFrm += "<div class=\"adminform\">\n";

//	addFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	addFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_addCustPricing_fSet"] + "</strong></legend>\n";

	addFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	addFrm += makespace("\t", indent+4) + "<br>\n";
	addFrm += makespace("\t", indent+4) + otherText["msg_addCustPricing_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["insertCustPricingSubmit"] + "\">\n";

	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"proffKey\" id=\"proffKey\" value=\"" + proffKey + "\">\n";


	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	addFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
//	addFrm += makefield(2, orderTitle["po_supplier"], frm_po_supplier, "frm_po_supplier", "frm_po_supplier", cmpy_jslst, 0, 0, "dataType=\"Require\"", otherText["msg_selPoSupplier"], "*", indent+4, 100);
	addFrm += makefield(2, orderTitle["po_supplier"], frm_po_supplier, "frm_po_supplier", "frm_po_supplier", cmpy_jslst, 0, 0, " onchange=\"update(document.add_cust_pricing, this, document.add_cust_pricing.frm_po_customer)\" ", "", "&nbsp;", indent+4, 100);
	addFrm += makefield(2, orderTitle["po_offset"], frm_po_offset, "frm_po_offset", "frm_po_offset", proff_jslst, 0, 0, "dataType=\"Require\"", otherText["msg_selPoOffset"], "*", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
//	addFrm += makefield(2, orderTitle["po_customer"], frm_po_customer, "frm_po_customer", "frm_po_customer", cust_acct_jslst, 0, 0, "dataType=\"Require\"", otherText["msg_selPoCustomer"], "*", indent+4, 100);
	addFrm += makefield(2, orderTitle["po_customer"], frm_po_customer, "frm_po_customer", "frm_po_customer", cust_acct_jslst, 0, 0, "", "", "&nbsp;", indent+4, 100);


	var minVal = 1.0;
	var decVal = 1.0;
	var i;
	for (i=0; i<decNumber; i++)
	{
		minVal = minVal / 10.0;
		decVal = decVal * 10.0;
	}
	decVal = decVal * 10.0;
	addFrm += makefield(1, orderTitle["po_amount"], frm_po_amount, "frm_po_amount", "frm_po_amount", "", 30, 30, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", otherText["msg_enterPoAmount"]+"( >="+minVal+" )", "*", indent+4, 100);

	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 3rd row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
//	addFrm += makefield(2, orderTitle["po_category"], frm_po_category, "frm_po_category", "frm_po_category", cust_category_jslst, 0, 0, "dataType=\"Require\"", otherText["msg_selPoCategory"], "*", indent+4, 100);
	addFrm += makefield(2, orderTitle["po_category"], frm_po_category, "frm_po_category", "frm_po_category", cust_category_jslst, 0, 0, "", "", "&nbsp;", indent+4, 100);
	addFrm += makefield(2, orderTitle["po_currency"], frm_po_currency, "frm_po_currency", "frm_po_currency", currency_jslst, 0, 0, "dataType=\"UnsafeStr\"", otherText["msg_selPoCurrency"], "*", indent+4, 100);
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




function btnGroupCustPricing_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	if(priv>=7)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('cust_pricing.cgi?pg_3='+pg_3+'&pg='+pg+'&cmpyCd='+cmpyCd+'&op=" + opValues["insertCustPricingForm"] + "'); ", otherText["btn_addNew_custPricing"]);
	}

//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);


	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function btnGroupModifyCustPricing_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	btn_HTML += btnLocation_HTML("justChaneMyLocation('cust_pricing.cgi?pg_3='+pg_3+'&pg='+pg+'&cmpyCd='+cmpyCd+'&op=" + opValues["listCustPricing"] + "'); ", otherText["btn_bakto_custPricingPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function btnGroupInsertCustPricing_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	btn_HTML += btnLocation_HTML("justChaneMyLocation('cust_pricing.cgi?pg_3='+pg_3+'&pg='+pg+'&cmpyCd='+cmpyCd+'&op=" + opValues["listCustPricing"] + "'); ", otherText["btn_bakto_custPricingPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}






function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	if (op == opValues["listCustPricing"])
	{
		pageHeading += otherText["pgHead_custPricing"];
	}

	if(op == opValues["modifyCustPricingForm"] || op == opValues["modifyCustPricingSubmit"])
	{
		pageHeading += otherText["pgHead_custPricingUpd"];
	}
	if(op == opValues["insertCustPricingForm"] || op == opValues["insertCustPricingSubmit"])
	{
		pageHeading += otherText["pgHead_custPricingAdd"];
	}
	if(op == opValues["deleteCustPricingForm"] || op == opValues["deleteCustPricingSubmit"])
	{
		pageHeading += otherText["pgHead_custPricingDel"];
	}

	return pageHeading; 
}



function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	if (op == opValues["listCustPricing"])
	{
		pageTitle += otherText["pgTitle_custPricing"];
	}

	if(op == opValues["modifyCustPricingForm"] || op == opValues["modifyCustPricingSubmit"])
	{
		pageTitle += otherText["pgTitle_custPricingUpd"];
	}
	if(op == opValues["insertCustPricingForm"] || op == opValues["insertCustPricingSubmit"])
	{
		pageTitle += otherText["pgTitle_custPricingAdd"];
	}
	if(op == opValues["deleteCustPricingForm"] || op == opValues["deleteCustPricingSubmit"])
	{
		pageTitle += otherText["pgTitle_custPricingDel"];
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
	var op_list = "";
	op_list += "<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+frmNum+"');\">          ";

	switch (priv)
	{
		case 8:
			op_list += "<option value=\"" + opValues["deleteCustPricingSubmit"] + "\">" + commText["Delete"] + "</option>";

		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

		case 6:     
			op_list += "<option value=\"" + opValues["modifyCustPricingForm"] + "\">" + commText["Modify"] + "</option>";

		case 5:			/* Find Has not been implemented yet*/

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
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg-1) + "&pg='+pg+'&cmpyCd='+cmpyCd+'&op=" + opValues["listCustPricing"] + "'); ", otherText["btn_prev_page"]);
	}

	nextPgHTML += "&nbsp; Current=" + curPg + "/" + totalPages + " &nbsp; ";
	if (totalPages > curPg)
	{
//		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg+1) + "' );\">Next</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg+1) + "&pg='+pg+'&cmpyCd='+cmpyCd+'&op=" + opValues["listCustPricing"] + "'); ", otherText["btn_next_page"]);
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

	// cust_pricing.cgi has relationships with 4 other cgi
	var url_data = ""
	url_data = "&pg='+pg+'&cmpyCd='+cmpyCd+'";


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
		nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) + url_data + "&op=" + opValues["listCustPricing"] + "'); ", "&lt;&lt;");
		foobar = page_number - 1;
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + url_data + "&op=" + opValues["listCustPricing"] + "'); ", "<b>&lt;<\/b>");
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + url_data + "&op=" + opValues["listCustPricing"] + "'); ", foobar1 + "-" + foobar2);
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
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + url_data + "&op=" + opValues["listCustPricing"] + "'); ", i);
	}
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	for (var i=page_number+1; i<foobar2; i++) 
	{
		//alert("I am in for for foobar2 loop "+i);	
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + url_data + "&op=" + opValues["listCustPricing"] + "'); ", i);
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + url_data + "&op=" + opValues["listCustPricing"] + "'); ", tempTxt);
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
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + url_data + "&op=" + opValues["listCustPricing"] + "'); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) + url_data + "&op=" + opValues["listCustPricing"] + "'); ", "<b>&gt;&gt;<\/b>");
	} 
	else 
	{
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}


	nextPgHTML += "</td>\n ";
	nextPgHTML += "</tr> \n";

	return nextPgHTML;
}



function getCurrencyString(sign)
{
	if (sign == "\165")
	{
		return "&#165;";
	}
	if (sign == "$")
	{
		return "$";
	}
	if (sign[0] == "\163")
	{
		return "&pound;";
	}
	if (sign[0] == "\219")
	{
		return "&euro;";
	}

	return sign;
}


function submitInsertPriceOffsetFrm(myformObj)
{
	var isValid = false;
	var notConflict = false;

	isValid = submitmyform(myformObj);

	if (isValid == true)
	{
		if ( (myformObj.frm_po_customer.value != "") && (myformObj.frm_po_category.value != "") )
		{
			myformObj.frm_po_customer.value = "";
			myformObj.frm_po_category.value = "";
//			alert(otherText["wrongInput"]);
			alert(alertWrongInput);
			notConflict = false;
		}
		else
		{
			notConflict = true;
		}
	}

	return (isValid && notConflict);
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
	for (i in cust_acct_jslst )
	{
		if (cust_acct_jslst[i][2] == parent_select)
		{
			new_option = new Option(cust_acct_jslst[i][1], cust_acct_jslst[i][0], false, false);
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
	newPage += "function submitAction(myobject, frmNum)\n";
	newPage += "{\n";
	newPage += "	var myCurQstring=produceQString();\n";
	newPage += "	var myselectedvalue = myobject.options[myobject.selectedIndex].value;";

	newPage += "	if(myselectedvalue==\"" + opValues["deleteCustPricingSubmit"] + "\")\n";
	newPage += "	{\n";
	newPage += "			if(confirm('" + otherText["msg_del_confirm"] + "'))\n";
	newPage += "			{\n";
	newPage += "				eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "				eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["deleteCustPricingSubmit"] + "+\"';\");\n";

	newPage += "				eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "				return true;\n";
	newPage += "			}\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
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

