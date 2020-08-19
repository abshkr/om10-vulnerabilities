	var opValues = new Array();

	// operations to delivery locations
	opValues["baseCustLedger"] = 500;
	opValues["listCustLedger"] = 501;
	opValues["searchCustLedgerForm"] = 504;
	opValues["searchCustLedgerSubmit"] = 514;
	opValues["viewCustLedger"] = 505;
	opValues["modifyCustLedgerForm"] = 506;
	opValues["modifyCustLedgerSubmit"] = 516;
	opValues["insertCustLedgerForm"] = 507;
	opValues["insertCustLedgerSubmit"] = 517;
	opValues["deleteCustLedgerForm"] = 508;
	opValues["deleteCustLedgerSubmit"] = 518;


	var column_headers = [
			"Date/Time", "Reference", "Method", "Invoice", "Amount"
	];
    
	var PriceStr = "Amount";

	var otherText = new Array();
	
	otherText["btn_addNew_custLedger"] =  "Add Payment";
	otherText["btn_bakto_customers"] =  "Back to Customers";
	otherText["btn_upd_custLedger"] =  "Modify";

	otherText["tab_cust"] =  "Customer Details";

	otherText["pgTitle_custLedger"] =  "Customer Order Processing, Ledger Page";
	otherText["pgTitle_custLedgerUpd"] =  "Customer Order Processing, Ledger, Modify";
	otherText["pgTitle_custLedgerAdd"] =  "Customer Order Processing, Ledger, Add";
	otherText["pgTitle_custLedgerDel"] =  "Customer Order Processing, Ledger, Delete";

	otherText["pgHead_custLedger"] =  "Ledger";
	otherText["pgHead_custLedgerUpd"] =  "";
	otherText["pgHead_custLedgerAdd"] =  "";
	otherText["pgHead_custLedgerDel"] =  "";

	otherText["pgHead_category"] =  "";
	otherText["pgHead_categoryUpd"] =  "";
	otherText["pgHead_categoryAdd"] =  "";

	otherText["msg_del_confirm"] =  "Are you sure you want to delete?";

	otherText["reference"] = "PAYMENT-THANK YOU";

	var accountTitle = new Array();

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


	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 501,504,505,506,507];
	var ops_req_search = [-1, 501];// search never required on this page



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

	/* View records of delivery location locations */
	if (priv >= 5 && curViewDetailState == opValues["listCustLedger"]) 
	{
		newPage += displayCustLedgerList (curPrivilage, curColumnToSort);
	}
	if (priv >= 5 && curViewDetailState == opValues["viewCustLedger"]) 
	{
		newPage += displayCustLedgerDetails (curPrivilage, curColumnToSort);
	}
		
	

	/* Display Form for Modify CustLedger Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyCustLedgerForm"])	
	{
		newPage += displayModifyCustLedgerForm();
	}
	/* Submit the Modification of CustLedger Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyCustLedgerSubmit"])	
	{
		newPage += displayCustLedgerList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Insert CustLedger Details */
	if (priv >= 7 && curViewDetailState == opValues["insertCustLedgerForm"])	
	{
		newPage += displayInsertCustLedgerForm();
	}
	/* Submit the Insertion of CustLedger Details */
	if (priv >= 7 && curViewDetailState == opValues["insertCustLedgerSubmit"])	
	{
		newPage += displayCustLedgerList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Delete a recorde of CustLedger */
//	if (priv >= 8 && curViewDetailState == opValues["deleteCustLedgerForm"])	
//	{
//		newPage += displayDeleteCustLedgerForm();
//	}
	/* Submit the Deletion of CustLedger Details */
	if (priv >= 8 && curViewDetailState == opValues["deleteCustLedgerSubmit"])	
	{
		newPage += displayCustLedgerList(curPrivilage, curColumnToSort);
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





function displayCustLedgerList(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm ="";
	var ordIndex = 0;
	var customer_addr_details;

	ordIndex = cust_acct_jstab.length - 1;

	dispFrm += makespace("\t", indent) + "<tr> \n";
	dispFrm += makespace("\t", indent) + "<td align=\"left\">\n";
	dispFrm += makespace("\t", indent+1) + "<div id=\"printReady\"> \n";
	dispFrm += makespace("\t", indent+1) + "<table width=\"100%\">\n";

	//dispFrm += makespace("\t", indent) + displayGlblFrm();
	dispFrm += makespace("\t", indent) + btnGroupCustLedger_HTML();
	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "cust_ledger.cgi", "pg_3");

	dispFrm += makespace("\t", indent) + "<tr> \n";
	dispFrm += makespace("\t", indent) + "<td align=\"left\">\n";

	dispFrm += " <ul id=\"tabmenu\">\n";
	dispFrm += "<li>" + otherText["tab_cust"] + "</li>\n";
	dispFrm += "</ul>\n";

	dispFrm += "<div class=\"adminform\">\n";
	dispFrm += makespace("\t", indent+1) + "<table width=\"100%\">\n";

	dispFrm += makespace("\t", indent+1) + "<tr> \n";
	dispFrm += makefield(0, accountTitle["head_supp"], cust_acct_jstab [ordIndex][6] + "&nbsp;&nbsp;" + cust_acct_jstab [ordIndex][7], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 150);
	dispFrm += makefield(0, accountTitle["head_cust"], cust_acct_jstab [ordIndex][8] + "&nbsp;&nbsp;" + cust_acct_jstab [ordIndex][9], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 150);
	dispFrm += makespace("\t", indent+1) + "</tr> \n";

	dispFrm += makespace("\t", indent+1) + "<tr> \n";
	dispFrm += makefield(0, accountTitle["head_acct"], cust_acct_jstab [ordIndex][10], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 150);
	if ( cust_acct_jstab [ordIndex][13] <= 0 )
	{
		dispFrm += makefield(0, accountTitle["head_balance"], (-1.0)*cust_acct_jstab [ordIndex][13]+accountTitle["head_credit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 200);
	}
	else
	{
		dispFrm += makefield(0, accountTitle["head_balance"], cust_acct_jstab [ordIndex][13]+accountTitle["head_debit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 200);
	}
	dispFrm += makespace("\t", indent+1) + "</tr> \n";

	dispFrm += makespace("\t", indent+1) + "<tr> \n";
	if ( cust_acct_jstab [ordIndex][11] <= 0 )
	{
		dispFrm += makefield(0, accountTitle["head_crlimit"], (-1.0)*cust_acct_jstab [ordIndex][11]+accountTitle["head_credit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 150);
	}
	else
	{
		dispFrm += makefield(0, accountTitle["head_crlimit"], cust_acct_jstab [ordIndex][11]+accountTitle["head_debit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 150);
	}
	if ( cust_acct_jstab [ordIndex][14] <= 0 )
	{
		dispFrm += makefield(0, accountTitle["head_within"], (-1.0)*cust_acct_jstab [ordIndex][14]+accountTitle["head_credit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 200);
	}
	else
	{
		dispFrm += makefield(0, accountTitle["head_within"], cust_acct_jstab [ordIndex][14]+accountTitle["head_debit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 200);
	}
//	dispFrm += makefield(0, accountTitle["head_crlimit"], cust_acct_jstab [ordIndex][11], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 150);
//	dispFrm += makefield(0, accountTitle["head_within"], cust_acct_jstab [ordIndex][14], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 200);
	dispFrm += makespace("\t", indent+1) + "</tr> \n";

	dispFrm += makespace("\t", indent+1) + "<tr> \n";
	dispFrm += makefield(0, accountTitle["head_terms"], cust_acct_jstab [ordIndex][12], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 150);
	if ( cust_acct_jstab [ordIndex][15] <= 0 )
	{
		dispFrm += makefield(0, accountTitle["head_outside"], (-1.0)*cust_acct_jstab [ordIndex][15]+accountTitle["head_credit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 200);
	}
	else
	{
		dispFrm += makefield(0, accountTitle["head_outside"], cust_acct_jstab [ordIndex][15]+accountTitle["head_debit_abbrv"], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 200);
	}
//	dispFrm += makefield(0, accountTitle["head_outside"], cust_acct_jstab [ordIndex][15], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 200);
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
			if (column_headers[i] == PriceStr)
			{
				column_headers[i] = PriceStr + "(" + moneyCurrency + ")";
			}
			dispFrm += makespace("\t", indent+2) + "<td>" + column_headers[i] + "</td>\n";
		}
		dispFrm += makespace("\t", indent+2) + "</tr>\n";
	}

	for(i in cust_acct_jstab)
	{
		if (i>0)
		{
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone =1;
			for(var j=0; j<column_headers.length; j++)
			{
				dispFrm += makespace("\t", indent+2) + "<td>\n";
/*
				if ( howmanyDone == 2 )
				{
					if (cust_acct_jstab[i][howmanyDone] < 0)
					{
						dispFrm += makespace("\t", indent+3) + obs(otherText["reference"]);
					}
					else
					{
						dispFrm += makespace("\t", indent+3) + obs("&nbsp;");
					}
				}
				else
*/
				if ( howmanyDone == 5 )
				{
					if ( cust_acct_jstab[i][howmanyDone] <= 0 )
					{
						dispFrm += makespace("\t", indent+3) + obs((-1.0)*cust_acct_jstab[i][howmanyDone]+accountTitle["head_credit_abbrv"]);
					}
					else
					{
//						dispFrm += makespace("\t", indent+3) + obs(cust_acct_jstab[i][howmanyDone]+accountTitle["head_debit_abbrv"]);
						dispFrm += makespace("\t", indent+3) + obs(cust_acct_jstab[i][howmanyDone]);
					}
				}
				else
				{
					dispFrm += makespace("\t", indent+3) + obs(cust_acct_jstab[i][howmanyDone]);
				}
				dispFrm += makespace("\t", indent+2) + "</td>\n";

				howmanyDone++;	
			} // end of inner for loop
		  
		}
		dispFrm += makespace("\t", indent) + "\n";
		dispFrm += makespace("\t", indent+2) + "</tr>";
	}


	dispFrm += makespace("\t", indent+2) + "</table>\n";
	dispFrm += makespace("\t", indent) + "</td> \n";
	dispFrm += makespace("\t", indent) + "</tr> \n";

	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "cust_ledger.cgi", "pg_3");

	dispFrm += makespace("\t", indent+2) + "</table>\n";
	dispFrm += makespace("\t", indent+1) + "</div> \n";  
	dispFrm += makespace("\t", indent) + "</td> \n";
	dispFrm += makespace("\t", indent) + "</tr> \n";

	return dispFrm;
}




function displayCustLedgerDetails(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm = "";

	return dispFrm;
}





function displayModifyCustLedgerForm ()
{
	var indent = 1;
	var updFrm = "";
	var customer_addr_details;

	return updFrm;
}



function displayInsertCustLedgerForm ()
{
	var indent = 1;
	var addFrm = "";

	return addFrm;
}



function displayDeleteCustLedgerForm ()
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





function btnGroupCustLedger_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";


//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

	btn_HTML += btnLocation_HTML("justChaneMyLocation('cust.cgi?suppCd='+suppCd); ", otherText["btn_bakto_customers"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}






function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	if (op == opValues["listCustLedger"])
	{
		pageHeading += otherText["pgHead_custLedger"];
	}

	if(op == opValues["viewCategory"])
	{
		pageHeading += otherText["pgHead_category"];
	}

	if(op == opValues["modifyCustLedgerForm"] || op == opValues["modifyCustLedgerSubmit"])
	{
		pageHeading += otherText["pgHead_custLedgerUpd"];
	}
	if(op == opValues["insertCustLedgerForm"] || op == opValues["insertCustLedgerSubmit"])
	{
		pageHeading += otherText["pgHead_custLedgerAdd"];
	}
	if(op == opValues["deleteCustLedgerForm"] || op == opValues["deleteCustLedgerSubmit"])
	{
		pageHeading += otherText["pgHead_custLedgerDel"];
	}

	return pageHeading; 
}



function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	if (op == opValues["listCustLedger"])
	{
		pageTitle += otherText["pgTitle_custLedger"];
	}

	if(op == opValues["viewCategory"])
	{
		pageTitle += otherText["pgTitle_category"];
	}

	if(op == opValues["modifyCustLedgerForm"] || op == opValues["modifyCustLedgerSubmit"])
	{
		pageTitle += otherText["pgTitle_custLedgerUpd"];
	}
	if(op == opValues["insertCustLedgerForm"] || op == opValues["insertCustLedgerSubmit"])
	{
		pageTitle += otherText["pgTitle_custLedgerAdd"];
	}
	if(op == opValues["deleteCustLedgerForm"] || op == opValues["deleteCustLedgerSubmit"])
	{
		pageTitle += otherText["pgTitle_custLedgerDel"];
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
			op_list += "<option value=\"" + opValues["deleteCustLedgerSubmit"] + "\">" + commText["Delete"] + "</option>";

		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

		case 6:     
			op_list += "<option value=\"" + opValues["modifyCustLedgerForm"] + "\">" + commText["Modify"] + "</option>";

		case 5:			/* Find Has not been implemented yet*/
			op_list += "<option value=\"" + opValues["viewCustLedger"] + "\">" + otherText["delivLocDetails"] + "</option>";
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
    nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustLedger"] + "'); ", "&lt;&lt;");
		foobar = page_number - 1;
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		 nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustLedger"] + "'); ", "<b>&lt;<\/b>");
		
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustLedger"] + "'); ", foobar1 + "-" + foobar2);
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
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustLedger"] + "'); ", i);
	}
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	for (var i=page_number+1; i<foobar2; i++) 
  {
    //alert("I am in for for foobar2 loop "+i);	
    nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustLedger"] + "'); ", i);
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustLedger"] + "'); ", tempTxt);
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
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustLedger"] + "'); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustLedger"] + "'); ", "<b>&gt;&gt;<\/b>");
	} else {
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}

	/*
  if (curPg > 1)
	{
		
    //nextPgHTML +="<a href=\"javascript:document.glblFrm.pg.value="+(curPg-1)+";document.glblFrm.op.value=0;document.glblFrm.submit();\">Previous</a>\n";
   //		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg-1) + "' );\">Previous</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg-1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustLedger"] + "'); ", otherText["btn_prev_page"]);
	}

	nextPgHTML += "&nbsp; Current=" + curPg + "/" + totalPages + " &nbsp; ";
	if (totalPages > curPg)
	{
//		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg+1) + "' );\">Next</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg+1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listCustLedger"] + "'); ", "&lt;&lt;");
	}
  */
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
	newPage += "function submitAction(myobject, accNum, frmNum)\n";
	newPage += "{\n";
	newPage += "	var myCurQstring=produceQString();\n";
	newPage += "	var myselectedvalue = myobject.options[myobject.selectedIndex].value;";

	newPage += "	if(myselectedvalue==\"" + opValues["deleteCustLedgerSubmit"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(confirm('" + otherText["msg_del_confirm"] + "'))\n";
	newPage += "		{\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["deleteCustLedgerSubmit"] + "+\"';\");\n";

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

