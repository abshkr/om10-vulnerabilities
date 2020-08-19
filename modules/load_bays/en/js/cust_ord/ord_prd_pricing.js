	var opValues = new Array();

	// operations to Order Product Pricing 
	opValues["baseOrdProdPricing"] = 10700;
	opValues["listOrdProdPricing"] = 10701;
	opValues["searchOrdProdPricingForm"] = 10704;
	opValues["searchOrdProdPricingSubmit"] = 10714;
	opValues["viewOrdProdPricing"] = 10705;			
	opValues["modifyOrdProdPricingForm"] = 10706;
	opValues["modifyOrdProdPricingSubmit"] = 10716;
	opValues["insertOrdProdPricingForm"] = 10707;
	opValues["insertOrdProdPricingSubmit"] = 10717;
	opValues["deleteOrdProdPricingForm"] = 10708;
	opValues["deleteOrdProdPricingSubmit"] = 10718;


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



	var column_headers = [
			"Supplier", "Customer", "Order", "Product", "Current Price"
	];
    
	var PriceStr = "Current Price";

		
	var otherText = new Array();
	otherText["youraction"] =  "YOUR ACTION";
    otherText["pricing"] =  "PRICING";

	otherText["btn_search_order"] =  "Search An Order";

	otherText["btn_next_page"] =  "Next";
	otherText["btn_prev_page"] =  "Previous";
	otherText["btn_search_go"] =  "Start the Search ...";
	otherText["view_all"] =  "View All";

	otherText["pgTitle_ordProdPricing"] =  "Customer Order Processing, Order Product Pricing";
	otherText["pgTitle_ordProdPricingUpd"] =  "Customer Order Processing, Order Product Pricing, Modify";
	otherText["pgTitle_ordProdPricingAdd"] =  "Customer Order Processing, Order Product Pricing, Insert";
	otherText["pgTitle_ordProdPricingDel"] =  "Customer Order Processing, Order Product Pricing, Delete";

	otherText["pgHead_ordProdPricing"] =  "Order Product Pricing";
	otherText["pgHead_ordProdPricingUpd"] =  "Modify Order Product Pricing";
	otherText["pgHead_ordProdPricingAdd"] =  "Add Order Product Pricing";
	otherText["pgHead_ordProdPricingDel"] =  "Delete Order Product Pricing";

	otherText["msg_del_confirm"] =  "Are you sure you want to delete?";

    otherText["msg_updOrdProdPricing_fSet"] =  "Order Product Pricing";
    otherText["msg_updOrdProdPricing_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_addOrdProdPricing_fSet"] =  "Order Product Pricing";
    otherText["msg_addOrdProdPricing_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";

	var items_per_page = 10;

	otherText["search_supp_code"] =  "Supplier";
	otherText["search_order_no"] =  "Order No.";


	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 10701,10704,10705,10706,10707];
	var ops_req_search = [10701];// search never required on this page



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

	/* View records of delivery location locations */
	if (priv >= 5 && curViewDetailState == opValues["listOrdProdPricing"]) 
	{
		newPage += displayOrderItemList (curPrivilage, curColumnToSort);
	}
	if (priv >= 5 && curViewDetailState == opValues["viewOrdProdPricing"]) 
	{
		newPage += displayOrderItemDetails (curPrivilage, curColumnToSort);
	}
		
	
	/* Display Form for Modify Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyOrdProdPricingForm"])	
	{
		newPage += displayModifyOrderItemForm();
	}
	/* Submit the Modification of Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyOrdProdPricingSubmit"])	
	{
		newPage += displayOrderItemList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Insert Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertOrdProdPricingForm"])	
	{
		newPage += displayInsertOrderItemForm();
	}
	/* Submit the Insertion of Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertOrdProdPricingSubmit"])	
	{
		newPage += displayOrderItemList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Delete a recorde of Order */
//	if (priv >= 8 && curViewDetailState == opValues["deleteOrdProdPricingForm"])	
//	{
//		newPage += displayDeleteOrderForm();
//	}
	/* Submit the Deletion of Order Details */
	if (priv >= 8 && curViewDetailState == opValues["deleteOrdProdPricingSubmit"])	
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
	dispFrm += makespace("\t", indent) + btnGroupOrdProdPricing_HTML();


	if (is_search_on == 1)
	{
		if (frm_order_no_search == "-1")
		{
			frm_order_no_search = "";
		}

		dispFrm += makespace("\t", indent) + "<tr> \n";
		dispFrm += makespace("\t", indent) + "<td align=\"left\">\n";

		dispFrm += makespace("\t", indent+1) + "<form name=\"list_ord_prod_pricing\" method=\"get\" id=\"list_ord_prod_pricing\" action=\"ord_prd_pricing.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

		dispFrm += " <ul id=\"tabmenu\">\n";
		dispFrm += "<li>" + otherText["btn_search_order"] + "</li>\n";
		dispFrm += "</ul>\n";

		dispFrm += "<div class=\"adminform\">\n";
		dispFrm += makespace("\t", indent+1) + "<table>\n";

		dispFrm += makespace("\t", indent+1) + "<tr> \n";

		dispFrm += makefield(2, otherText["search_supp_code"], frm_supp_code_search, "frm_supp_code_search", "frm_supp_code_search", cmpy_jslst, 0, 0, "onchange=\"submit();\" ", "", "&nbsp;", indent+4, 60);

		dispFrm += makefield(1, otherText["search_order_no"], frm_order_no_search, "frm_order_no_search", "frm_order_no_search", "", 30, 49, "onchange=\"submit();\" ", "", "&nbsp;", indent+4, 80);

		dispFrm += makespace("\t", indent+3) + "<td align=\"center\" class=\"infotext\" width=\"100\">\n";
		dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"is_search_on\" id=\"is_search_on\" value=\"" + is_search_on + "\">\n";
		dispFrm += "<input type=\"submit\" value=\""+commText["Search"]+"\" class=\"just_button\" 	onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
		dispFrm += makespace("\t", indent+3) + "</td>\n";

		dispFrm += makespace("\t", indent+1) + "</tr> \n";

		dispFrm += makespace("\t", indent+1) + "</table>\n";
		dispFrm += makespace("\t", indent+2) + "</div>\n";

		dispFrm += makespace("\t", indent+1) + "</form>\n";

		dispFrm += makespace("\t", indent) + "</td>\n";	
		dispFrm += makespace("\t", indent) + "</tr> \n";

	}

	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "ord_prd_pricing.cgi", "pg_3");
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
			if (column_headers[i] == PriceStr)
			{
				column_headers[i] = PriceStr + "(" + moneyCurrency + ")";
			}
			dispFrm += makespace("\t", indent+2) + "<td>" + column_headers[i] + "</td>\n";
		}
		dispFrm += makespace("\t", indent+2) + "</tr>\n";
	}

	for(i in order_item_jstab)
	{
		if (i>0)
		{
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone =0;
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
              
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + order_item_jstab[i][11] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCmpy\" id=\"prodCmpy\" value=\"" + order_item_jstab[i][5] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prodCd\" id=\"prodCd\" value=\"" + order_item_jstab[i][6] + "\">\n";

						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + order_item_jstab[i][7] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + order_item_jstab[i][8] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + order_item_jstab[i][9] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + order_item_jstab[i][10] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"is_search_on\" id=\"is_search_on\" value=\"" + is_search_on + "\">\n";

						dispFrm += makespace("\t", indent+5) + preqstr_field ();
						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

						dispFrm += makespace("\t", indent+5) + op_list (curPrivilage, order_item_jstab[i][11], order_item_jstab[i][5], order_item_jstab[i][6], i);

						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "</tr>\n";
						dispFrm += makespace("\t", indent+4) + "</table>\n";
						dispFrm += makespace("\t", indent+3) + "</form>\n";
					}
					else
					{
						if (howmanyDone == 4)
						{
//							order_item_jstab[i][howmanyDone] = moneyCurrency + " "  + order_item_jstab[i][howmanyDone];
						}
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
  
//	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "ord_prd_pricing.cgi", "pg_3");
//	dispFrm += makespace("\t", indent) + btnGroupOrdProdPricing_HTML();

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

	return updFrm;
}


function displayInsertOrderItemForm ()
{
	var indent = 1;
	var addFrm = "";

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




function btnGroupOrdProdPricing_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";
	if(priv>=5 && is_search_on != 1)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('ord_prd_pricing.cgi?is_search_on=1&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&op=" + opValues["listOrdProdPricing"] + "'); ", otherText["btn_search_order"]);
	}
	else if(priv>=5 && is_search_on == 1 )
        {
                btn_HTML += btnLocation_HTML("justChaneMyLocation('ord_prd_pricing.cgi?op=" + opValues["listOrdProdPricing"] + "'); ", otherText["view_all"]);
        }
	

//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}







function updatePageHeading(op, pgHead)
{
	var pageHeading = pgHead;

	if (op == opValues["listOrdProdPricing"])
	{
		pageHeading += otherText["pgHead_ordProdPricing"];
	}

	if(op == opValues["modifyOrdProdPricingForm"] || op == opValues["modifyOrdProdPricingSubmit"])
	{
		pageHeading += otherText["pgHead_ordProdPricingUpd"];
	}
	if(op == opValues["insertOrdProdPricingForm"] || op == opValues["insertOrdProdPricingSubmit"])
	{
		pageHeading += otherText["pgHead_ordProdPricingAdd"];
	}
	if(op == opValues["deleteOrdProdPricingForm"] || op == opValues["deleteOrdProdPricingSubmit"])
	{
		pageHeading += otherText["pgHead_ordProdPricingDel"];
	}

	return pageHeading; 
}



function updatePageTitle(op, pgTit)
{
	var pageTitle = pgTit;

	if (op == opValues["listOrdProdPricing"])
	{
		pageTitle += otherText["pgTitle_ordProdPricing"];
	}

	if(op == opValues["modifyOrdProdPricingForm"] || op == opValues["modifyOrdProdPricingSubmit"])
	{
		pageTitle += otherText["pgTitle_ordProdPricingUpd"];
	}
	if(op == opValues["insertOrdProdPricingForm"] || op == opValues["insertOrdProdPricingSubmit"])
	{
		pageTitle += otherText["pgTitle_ordProdPricingAdd"];
	}
	if(op == opValues["deleteOrdProdPricingForm"] || op == opValues["deleteOrdProdPricingSubmit"])
	{
		pageTitle += otherText["pgTitle_ordProdPricingDel"];
	}

	return pageTitle;
}



/* define function op_list() */
function op_list(priv, ordNo, prodCmpy, prodCd, frmNum)
{
	/* priv = 
		6 modify	op=1,2,3
		7 add		op=4
		8 delete	op=5
	*/
	var op_list = "";
	op_list += "<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+ordNo+"', '"+prodCmpy+"', '"+prodCd+"', '"+frmNum+"');\">          ";

	switch (priv)
	{
		case 8:
//			op_list += "<option value=\"" + opValues["deleteOrdProdPricingSubmit"] + "\">" + commText["Delete"] + "</option>";

		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */
//			op_list += "<option value=\"" + opValues["insertOrdProdPricingForm"] + "\">" + otherText["addLoadDelvQty"] + "</option>";

		case 6:     
//			op_list += "<option value=\"" + opValues["modifyOrdProdPricingForm"] + "\">" + commText["Modify"] + "</option>";

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
		nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) + "&is_search_on='+is_search_on+'&frm_supp_code_search='+frm_supp_code_search+'&frm_order_no_search='+frm_order_no_search+'&pg='+pg+'&op=" + opValues["listOrdProdPricing"] + "'); ", "&lt;&lt;");
		foobar = page_number - 1;
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&is_search_on='+is_search_on+'&frm_supp_code_search='+frm_supp_code_search+'&frm_order_no_search='+frm_order_no_search+'&pg='+pg+'&op=" + opValues["listOrdProdPricing"] + "'); ", "<b>&lt;<\/b>");
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&is_search_on='+is_search_on+'&frm_supp_code_search='+frm_supp_code_search+'&frm_order_no_search='+frm_order_no_search+'&pg='+pg+'&op=" + opValues["listOrdProdPricing"] + "'); ", foobar1 + "-" + foobar2);
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
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&is_search_on='+is_search_on+'&frm_supp_code_search='+frm_supp_code_search+'&frm_order_no_search='+frm_order_no_search+'&pg='+pg+'&op=" + opValues["listOrdProdPricing"] + "'); ", i);
	}
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	for (var i=page_number+1; i<foobar2; i++) 
	{
		//alert("I am in for for foobar2 loop "+i);	
	    nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&is_search_on='+is_search_on+'&frm_supp_code_search='+frm_supp_code_search+'&frm_order_no_search='+frm_order_no_search+'&pg='+pg+'&op=" + opValues["listOrdProdPricing"] + "'); ", i);
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&is_search_on='+is_search_on+'&frm_supp_code_search='+frm_supp_code_search+'&frm_order_no_search='+frm_order_no_search+'&pg='+pg+'&op=" + opValues["listOrdProdPricing"] + "'); ", tempTxt);
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
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&is_search_on='+is_search_on+'&frm_supp_code_search='+frm_supp_code_search+'&frm_order_no_search='+frm_order_no_search+'&pg='+pg+'&op=" + opValues["listOrdProdPricing"] + "'); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) + "&is_search_on='+is_search_on+'&frm_supp_code_search='+frm_supp_code_search+'&frm_order_no_search='+frm_order_no_search+'&pg='+pg+'&op=" + opValues["listOrdProdPricing"] + "'); ", "<b>&gt;&gt;<\/b>");
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
	newPage += "function submitAction(myobject, ordNo, prodCmpy, prodCd, frmNum)\n";
	newPage += "{\n";
	newPage += "	var myCurQstring=produceQString();\n";
	newPage += "	var myselectedvalue = myobject.options[myobject.selectedIndex].value;";

	newPage += "	if(myselectedvalue==\"" + opValues["deleteOrdProdPricingSubmit"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(confirm('" + otherText["msg_del_confirm"] + "'))\n";
	newPage += "		{\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["deleteOrdProdPricingSubmit"] + "+\"';\");\n";

	newPage += "			eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "			return true;\n";
	newPage += "		}\n";
	newPage += "		eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
  	newPage += "	}\n";

	newPage += "	else if(myselectedvalue==\"" + opValues["listPricing"] + "\")\n";
	newPage += "	{\n";
//	newPage += "		document.location.href=\"pricing.cgi?termCd="+termCd+"&orderNo="+orderNo+"&op="+opValues["listPricing"]+"&prevOp="+opValues["listOrdProdPricing"]+"&pg=1&prodCmpy=\"+prodCmpy+\"&prodCd=\"+prodCd+\"&cmpyCd="+cmpyCd+"&suppCd="+suppCd+"&custAcc="+custAcc+"\";\n";
	newPage += "		document.location.href=\"pricing.cgi?orderNo=\"+ordNo+\"&op="+opValues["listPricing"]+"&prevOp="+opValues["listOrdProdPricing"]+"&pg=1&pg_3="+pg_3+"&prodCmpy=\"+prodCmpy+\"&prodCd=\"+prodCd+\"\";\n";
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

