
	// The operation value have 5 digits.
	// The lower 2 digits represent operation: list-1, search-4, view-5, modify-6, insert-7, delete-8, etc.
	// The higher 3 digits represent operation target. This value will be more than 300 if the target (table) is commonly used in several occations.

	var opValues = new Array();

	// operation to customers
	opValues["baseCustomer"] = 100;
	opValues["listCustomer"] = 101;
	opValues["searchCustomerForm"] = 104;
	opValues["searchCustomerSubmit"] = 114;
	opValues["viewCustomer"] = 105;				// relevant to opValues["viewAccountDetail"]
	opValues["modifyCustomerForm"] = 106;
	opValues["modifyCustomerSubmit"] = 116;
	opValues["insertCustomerForm"] = 107;
	opValues["insertCustomerSubmit"] = 117;
	opValues["deleteCustomerForm"] = 108;
	opValues["deleteCustomerSubmit"] = 118;

	// operation to account details
	opValues["baseAccountDetail"] = 200;
	opValues["listAccountDetail"] = 201;		// reserved
	opValues["searchAccountForm"] = 204;		// reserved
	opValues["searchAccountSubmit"] = 214;		// reserved
	opValues["viewAccountDetail"] = 205;		// relevant to opValues["viewCustomer"]
	opValues["modifyAccountForm"] = 206;
	opValues["modifyAccountSubmit"] = 216;
	opValues["insertAccountForm"] = 207;		// reserved
	opValues["insertAccountSubmit"] = 217;		// reserved
	opValues["deleteAccountForm"] = 208;		// reserved
	opValues["deleteAccountSubmit"] = 218;		// reserved

	// operation to allocations
	opValues["baseAllocation"] = 300;
	opValues["listAllocation"] = 301;
	opValues["searchAllocationForm"] = 304;		// reserved
	opValues["searchAllocationSubmit"] = 314;	// reserved
	opValues["viewAllocation"] = 305;			// reserved
	opValues["modifyAllocationForm"] = 306;
	opValues["modifyAllocationSubmit"] = 316;
	opValues["insertAllocationForm"] = 307;
	opValues["insertAllocationSubmit"] = 317;
	opValues["deleteAllocationForm"] = 308;
	opValues["deleteAllocationSubmit"] = 318;

	// operation to allocations - load allocations
	opValues["baseLoadAlloc"] = 3000;
	opValues["listLoadAlloc"] = 3001;
	opValues["searchLoadAllocForm"] = 3004;		// reserved
	opValues["searchLoadAllocSubmit"] = 3014;	// reserved
	opValues["viewLoadAlloc"] = 3005;			// reserved
	opValues["modifyLoadAllocForm"] = 3006;
	opValues["modifyLoadAllocSubmit"] = 3016;
	opValues["insertLoadAllocForm"] = 3007;
	opValues["insertLoadAllocSubmit"] = 3017;
	opValues["deleteLoadAllocForm"] = 3008;
	opValues["deleteLoadAllocSubmit"] = 3018;

	// operation to allocations - load allocations - allocation periods
	opValues["baseAllocPeriod"] = 3100;
	opValues["listAllocPeriod"] = 3101;
	opValues["searchAllocPeriodForm"] = 3104;	// reserved
	opValues["searchAllocPeriodSubmit"] = 3114;	// reserved
	opValues["viewAllocPeriod"] = 3105;			// reserved
	opValues["modifyAllocPeriodForm"] = 3106;
	opValues["modifyAllocPeriodSubmit"] = 3116;
	opValues["insertAllocPeriodForm"] = 3107;
	opValues["insertAllocPeriodSubmit"] = 3117;
	opValues["deleteAllocPeriodForm"] = 3108;
	opValues["deleteAllocPeriodSubmit"] = 3118;


	// operations to delivery locations
	opValues["baseDelivLoc"] = 400;
	opValues["listDelivLoc"] = 401;
	opValues["searchDelivLocForm"] = 404;
	opValues["searchDelivLocSubmit"] = 414;
	opValues["viewDelivLoc"] = 405;
	opValues["modifyDelivLocForm"] = 406;
	opValues["modifyDelivLocSubmit"] = 416;
	opValues["insertDelivLocForm"] = 407;
	opValues["insertDelivLocSubmit"] = 417;
	opValues["deleteDelivLocForm"] = 408;
	opValues["deleteDelivLocSubmit"] = 418;

	// operations to ledgers
	opValues["baseCustLedger"] = 500;
	opValues["listCustLedger"] = 501;
	opValues["searchCustLedgerForm"] = 504;			// reserved
	opValues["searchCustLedgerSubmit"] = 514;		// reserved
	opValues["viewCustLedger"] = 505;
	opValues["modifyCustLedgerForm"] = 506;			// reserved
	opValues["modifyCustLedgerSubmit"] = 516;		// reserved
	opValues["insertCustLedgerForm"] = 507;			// reserved
	opValues["insertCustLedgerSubmit"] = 517;		// reserved
	opValues["deleteCustLedgerForm"] = 508;			// reserved
	opValues["deleteCustLedgerSubmit"] = 518;		// reserved

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
	opValues["approveOrder"] = 6009;

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

	// operation to addresses
	opValues["baseAddress"] = 30000;
	opValues["listAddress"] = 30001;
	opValues["searchAddressForm"] = 30004;
	opValues["searchAddressSubmit"] = 30014;
	opValues["viewAddress"] = 30005;
	opValues["modifyAddressForm"] = 30006;
	opValues["modifyAddressSubmit"] = 30016;
	opValues["insertAddressForm"] = 30007;
	opValues["insertAddressSubmit"] = 30017;
	opValues["deleteAddressForm"] = 30008;
	opValues["deleteAddressSubmit"] = 30018;

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



	var myColumns = [
			"Account No", "Code",	"Name","Address",	"Allocation"
		];
		
		var delvr_myColumns = [
			"Code", "Name","Grid",	"Type"
		];
	var t__View = ["View","²é¿´"];	
	var otherText = new Array()
		otherText["supp"] =  "Supplier";
    otherText["cust"] =  "Customer";
    otherText["sel_a_compy"] = "Select A Company";
    otherText["transpt"] =  "Transport";
    otherText["largst"] =  "Largest";
    otherText["doc"] =  "Document";
    otherText["unit"] =  "Unit";
    otherText["tarif"] =  "Tarrif";
    otherText["trip_time"] =  "Trip Time";
    otherText["trip_dist"] =  "Trip Distance";
    otherText["contact"] =  "Contact";
    otherText["phone"] =  "Phone";
    otherText["prof"] =  "Profile";
    otherText["ur_action"] = "YOUR ACTION";
    otherText["acct_det"] ="ACCOUNT DETAILS";
    otherText["alloc"] ="ALLOCATIONS";
    otherText["del_loc"] ="DELIVERY LOCATION";
    otherText["ledger"] ="LEDGER";
    otherText["ord_ent_maint"] ="ORDER ENTRY AND MAINTENANCE";
    otherText["invoice"] ="INVOICE";    
    otherText["add_new_cust_det"] =  "Add new customer details";
    otherText["msg_add_new_cust_det"] = "Complete and submit the following form to add a new customer, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_mod_cust_det"] = "Complete and submit the following form to modify a customer, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_valid_enter_acct_num"] = "Enter valid Account Number";
    otherText["msg_sel_cust_name"] = "Select Customer Name";
    otherText["msg_sel_cust_addres"] = "Select Customer Address";
    otherText["mod_cust_det"] = "Modify customer details";
    otherText["msg_select_supp"] = "Select the Supplier to view its Customers";
    otherText["msg_select_supp2"] = "Select A Supplier to Add New Customer";

	otherText["back_to_customers"] = "Back to Customers Page";
  	otherText["back_to_delvloc"] = "Back to Delivery Location List Page";
	otherText["add_new_cust"] = "Add New Customer";

	otherText["pgHead_cust"] =  "Customers";
	otherText["pgHead_custUpd"] =  "Modify Customer";
	otherText["pgHead_custAdd"] =  "Add New Customer";
	otherText["pgHead_custDel"] =  "Delete Customer";
	otherText["pgHead_allocLoad"] = "Loading Allocations";
	otherText["pgHead_delvLoc"] =  "Delivery Location";

	otherText["pgTitle_cust"] =  "Customer Order Processing, Customers Page";
	otherText["pgTitle_custUpd"] =  "Customer Order Processing, Customers, Modify";
	otherText["pgTitle_custAdd"] =  "Customer Order Processing, Customers, Add";
	otherText["pgTitle_custDel"] =  "Customer Order Processing, Customers, Delete";
	otherText["pgTitle_allocLoad"] =  "Customer Order Processing, Customers, Loading Allocations";
	otherText["pgTitle_delvLoc"] =  "Customer Order Processing, Customers, Delivery Location";

    otherText["delivLocDetails"] =  "DELIVERY LOCATION DETAILS";
	otherText["btn_next_page"] =  "Next";
	otherText["btn_prev_page"] =  "Previous";
	otherText["btn_curr_page"] =  "Current";
	otherText["msg_del_confirm"] =  "Are you sure you want to delete?";

	otherText["tab_supp"] =  "Supplier Details";

		//var vuListHash = new Hashtable();
		//vuListHash.hashtable = vol_unit_List;
		
		var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[128]= "Successfully Deleted!";
    l_opInf[127]= "Successfully Inserted a New Record!";
    l_opInf[126]= "Successfully Updated!";
    l_opInf[138]= "Delete Failed!";
    l_opInf[137]= "Insert Failed!";
    l_opInf[136]= "Update Failed!";


	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1,1,101,104,105,106,107];
	var ops_req_search = [-1,1, 101,104,105];// search never required on this page



/*
 * The structure dealing with
	[ "1", "2003-03-02 08:18:30", "0000", "988512", "6904", "", "3835231", "0000" ]
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

	newPage +=displayGlblFrm();
	if (curViewDetailState <= 1 || curViewDetailState==opValues["viewCustomer"]) // view records
	{
		//alert("AM I even Reaching here to display records");
 if (priv >= 7) 
 {
    newPage += addNewBtn_HTML();
 }
		newPage +=displayStatusMsg (opStatus);  
		newPage += "<tr> \n";
		newPage += "<td>\n ";
		if( ((myColumns.length)> 0))
		{
			newPage += "<div id=\"printReady\">";
			newPage += table_begin("M", 0,"");
			newPage += "<tbody> \n";
			newPage += "<tr>";
			for(var i=0; i<myColumns.length; i++)
			{
				newPage += "<td>"+myColumns[i]+"<\/td>";


			}
			newPage += "<\/tr>";
		}




		for(i in cust_jstab)
		{
			if(i>0)
			{
				newPage += "<tr class=\"row1\">\n";
				var howmanyDone =0;
				for(var j=0; j<myColumns.length; j++)
				{
					if (curColumnToSort == howmanyDone)
					{
						newPage += "<td style=\"background-color:#EEEEEE\">" + obs(cust_jstab[i][howmanyDone]) + "<\/td>";
					} 
					else 
					{

						newPage += "<td>\n";				  
						if(howmanyDone==0) // means time to display the drop list and table
						{
							newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
							newPage +="       <table border=\"0\">\n";
							newPage +="	       <tr>\n";
							newPage +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+obs(cust_jstab[i][howmanyDone])+"</span>\n";
							newPage +="          <input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\""+cust_jstab[i][howmanyDone]+"\">\n";
							newPage +="          <input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\""+suppCd+"\">\n";
							newPage +="          <input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\""+cust_jstab[i][(howmanyDone+1)]+"\">\n";
							//newPage +="          <input type=\"hidden\" name=\"pg\" id=\"pg\" value=\""+pg+"\">\n";
							newPage +=          preqstr_field ();
							newPage +="          </td>\n";
							newPage +="          <td width=\"50%\">\n";
							newPage += op_list(curPrivilage, cust_jstab[i][(howmanyDone+1)], cust_jstab[i][(howmanyDone)], i );
							newPage +="          </td>\n";
							newPage +="	       </tr>\n";
							newPage +="	      </table>\n";
							newPage +="	      </form>\n";
						}
						else
						{
							newPage += obs(cust_jstab[i][howmanyDone]);
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
		newPage += "<\/div>";
		newPage += "<\/td>";	
		newPage += "<\/tr>";
		if ( pg == -1) pg = 1;
	
		//Call the common next page function, first 3 variables are must followed by key value combinations, each key must have a value
		newPage +=nextPage_longStr(pagesTotal, pg, "pg",'suppCd',suppCd);



	}
		
 if (priv >=7  && curViewDetailState == opValues["insertCustomerForm"]) // able to insert
 {
    newPage += displayAddNewFrm();
 }
if (priv >=6 && curViewDetailState == opValues["modifyCustomerForm"]) // able to modify
 {
    newPage += displayModCustFrm();
 } 
 
 if (priv > 4 && curViewDetailState == 3) // display the Delivery Locations
 {
    newPage += displayDelvrLocation(curPrivilage, curColumnToSort );
 }   
 if (priv > 4 && curViewDetailState == 13) // display the Delivery Locations Details
 {
    newPage += displayDelvrLocDetail(curPrivilage, curColumnToSort );
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
	if (typeof writeBack != 'undefined')writeBack();

	
}


function displayunitList(unitSelected, list)
{
  var massList = "";
  var matchFound=0;
  var list_keys = new Array();
  list_keys = assArray_keys(list);
  for(i=0; i<list_keys.length; i++)
  {
     
     massList += "<option value=\""+list_keys[i]+"\"";
     if(list_keys[i]==unitSelected)
     {
        matchFound=1;
        massList += "selected";
     }
      massList +=">"+list[list_keys[i]]+"</option>\n";

  }
 
  massList +="</select>\n";

 
  return massList;

}


function displayGlblFrm()
{
	var glblFrm = "";
	glblFrm += " <tr>\n";
	glblFrm += "   <td align=\"left\">\n";
	glblFrm += "      <form name=\"glblFrm\" method =\"get\" id=\"glblFrm\">\n";
	glblFrm += "<input type=\"hidden\" name=\"op\" value=\"1\">\n";
	glblFrm += "<input type=\"hidden\" name=\"pg\" value=\"1\">\n";

	glblFrm += " <ul id=\"tabmenu\">\n";
	glblFrm += "<li>" + otherText["tab_supp"] + "</li>\n";
	glblFrm += "</ul>\n";

	glblFrm += "                            <div class=\"adminform\">\n";
	glblFrm +=otherText["msg_select_supp"]+" \n";
	glblFrm += "                                    <table>\n";
	glblFrm += "                                            <tr>\n";
	glblFrm +=
		"                                                    <td class=\"infotextheading\">\n";
	glblFrm += otherText["supp"]+" :\n";
	glblFrm += "                                                    </td>\n";
	glblFrm += "                                                    <td>\n";
	glblFrm += "                                                        <select id=\"suppCd\" name=\"suppCd\" class=\"smallselect\" onchange=\"submit();\"> \n";
	glblFrm += displayDrop_ShowDefSelected(suppCd, cmpy_jslst,otherText["sel_a_compy"]);
	glblFrm += "                                                    </td>\n";

	glblFrm += "                                            </tr>\n";

//alert( "list:" + suppCd+"---"+cmpy_jslst[0][0]+","+cmpy_jslst[0][1]+",######"+cmpy_jslst[1][0]+","+cmpy_jslst[1][1]+",");
	// text box for customer account
	if ( custAcc == "-1" )
	{
		custAcc = "";
	}

	glblFrm += "                                            <tr>\n";
	glblFrm +=
		"                                                    <td class=\"infotextheading\">\n";
	glblFrm += myColumns[0]+" :\n";
	glblFrm += "                                                    </td>\n";
	glblFrm += "                                                    <td>\n";
	glblFrm +=" <input type=\"text\" name=\"custAcc\" id=\"custAcc\" value=\""+ custAcc +"\" maxlength=\"18\" class=\"smallselect\" onchange=\"submit();\" > \n";
	glblFrm += "<input type=\"button\" value=\""+ml(t__View)+"\" name=\"view\"   onclick=\"document.glblFrm.op.value=1;document.glblFrm.submit();\">\n";
	glblFrm += "                                                    </td>\n";

	glblFrm += "                                            </tr>\n";




	glblFrm += "                                    </table>\n";
	glblFrm += "\n";
	glblFrm += "                            </div>\n";
	glblFrm += "                    </form>\n";
	glblFrm += "            </td>\n";
	glblFrm += "    </tr>\n";
	return glblFrm;

}


function displayAddNewFrm()
{
  var addFrmhtml ="";
  addFrmhtml +=backToBtn_HTML();
  addFrmhtml += fieldst_HTML(otherText["add_new_cust_det"]);
	addFrmhtml += "<div class=\"adminform\">\n";
  addFrmhtml +="<table width=\"100%\">\n";
  addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_add_new_cust_det"]); 
  addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"cust.cgi\" onsubmit=\"return submitmyform(this)\">\n";
  addFrmhtml += suppCd_field("type=\"hidden\"");
  addFrmhtml +="						<tr>\n";
  addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
  addFrmhtml +="										<table width=\"100%\">\n";
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", myColumns[0]+" :");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"acctNum\" id=\"acctNum\" dataType=\"Require\" maxlength=\"18\" msg=\""+otherText["msg_valid_enter_acct_num"]+"\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"140\" ", myColumns[2]+" :");
  addFrmhtml += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select name=\"custName\" id=\"prod\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_sel_cust_name"]+"\" onChange=\"dispLic(this.options[this.selectedIndex].value);\"> \n";
  addFrmhtml += displayDropList("", cust_cmpys,otherText["msg_sel_cust_name"]);
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", myColumns[3]+" :");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select name=\"custAdd\" id=\"custAdd\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_sel_cust_addres"]+"\"> \n";
  addFrmhtml += displayDropList("", addresses,otherText["msg_sel_cust_addres"]);
  
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", myColumns[1]+"  :");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml += "                   				<td class=\"infotext\">\n";
  addFrmhtml += "										<span id=\"cmpCd\">&nbsp;</span>";
  addFrmhtml += "                    				</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									     </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  
  addFrmhtml +="								    </table>\n";
  addFrmhtml +=local_frmButtRow_HTML(commBtnText["Add"], 1);
                  
  addFrmhtml +="							   </td>\n";
  addFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Add", 1);
  addFrmhtml +="							</table>\n";
  addFrmhtml +=op_field (opValues["insertCustomerSubmit"]);
  addFrmhtml += "                    </form>\n";                      
  addFrmhtml += "				</div>\n";
  addFrmhtml += fieldstFoot_HTML();
  return addFrmhtml;
}


function displayModCustFrm()
{
  var addFrmhtml ="";
  addFrmhtml +=backToBtn_HTML();
  addFrmhtml += fieldst_HTML(otherText["mod_cust_det"]);
	addFrmhtml += "<div class=\"adminform\">\n";
  addFrmhtml +="<table width=\"100%\">\n";
  addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_mod_cust_det"] ); 
  addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"cust.cgi\" onsubmit=\"return submitmyform(this)\">\n";
  addFrmhtml += suppCd_field("type=\"hidden\"");
  addFrmhtml +="						<tr>\n";
  addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
  addFrmhtml +="										<table width=\"100%\">\n";
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", myColumns[0]+"  :");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td class=\"infotext\">\n";
  addFrmhtml +=cust_jstab[1][0]+"\n";
  addFrmhtml +="                             <input type=\"hidden\" name=\"acctNum\" id=\"acctNum\" value=\""+cust_jstab[1][0]+"\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml += textTd_HTML(" class=\"infotextheading\" width=\"140\" ", myColumns[2]+" :");
  addFrmhtml += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td class=\"infotext\">\n";
  addFrmhtml +=cust_jstab[1][2]+"\n";
  addFrmhtml +="                             <input type=\"hidden\" name=\"custName\" id=\"custName\" value=\""+cust_jstab[1][4]+"\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", myColumns[3]+" :");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select name=\"custAdd\" id=\"custAdd\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_sel_cust_addres"]+"\"> \n";
  addFrmhtml += displayDropList(cust_jstab[1][3], addresses,otherText["msg_sel_cust_addres"]);
  
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", myColumns[1]+"  :");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml += "                   				<td class=\"infotext\">\n";
  addFrmhtml += "										<span id=\"cmpCd\">"+cust_jstab[1][1]+"</span>";
  addFrmhtml += "                    				</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									     </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  
  addFrmhtml +="								    </table>\n";
  addFrmhtml +=frmButtRow_HTML(commBtnText["Update"], 1);
                  
  addFrmhtml +="							   </td>\n";
  addFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Add", 1);
  addFrmhtml +="							</table>\n";
  addFrmhtml +=op_field (opValues["modifyCustomerSubmit"]);
  addFrmhtml += "                    </form>\n";                      
  addFrmhtml += "				</div>\n";
  addFrmhtml += fieldstFoot_HTML();
  return addFrmhtml;
}


function displayDelvrLocation(curPrivilage,curColumnToSort)
{
  var delvrLocHtml ="";
  //delvrLocHtml +=displayGlblFrm();
  delvrLocHtml +=backToBtn_HTML();
  delvrLocHtml +=nextPage(pagesTotal_3, pg_3, "cust.cgi", "pg_3");
  delvrLocHtml += "<tr> \n";
  delvrLocHtml += "<td align=\"left\">\n";
  delvrLocHtml += "<table>\n";
  delvrLocHtml += "   <tr> \n";
  delvrLocHtml += "                                                    <td width=\"80\" class=\"infotextheading\">\n";
  delvrLocHtml += "                                                            "+otherText["supp"]+":\n";
  delvrLocHtml += "                                                    </td>\n";
  delvrLocHtml += "                                                    <td align=\"left\" class=\"infotext\">\n";
  delvrLocHtml +=delivery_jstab [1][5];
  delvrLocHtml += "                                                    </td>\n";
  delvrLocHtml += "   </tr> \n";
  delvrLocHtml += "   <tr> \n";
  delvrLocHtml += "                                                    <td width=\"80\" class=\"infotextheading\">\n";
  delvrLocHtml += "                                                            "+otherText["cust"]+":\n";
  delvrLocHtml += "                                                    </td>\n";
  delvrLocHtml += "                                                    <td align=\"left\" class=\"infotext\">\n";
  delvrLocHtml +=delivery_jstab [1][4];
  delvrLocHtml += "                                                    </td>\n";
  delvrLocHtml += "   </tr> \n";
  delvrLocHtml += "</table>\n";
  delvrLocHtml += "</td>\n";	
  delvrLocHtml += "</tr> \n";
  
  delvrLocHtml += "<tr> \n";
  //end of the td and tr for the list area
  delvrLocHtml += "<td>\n ";  
  if( ((delvr_myColumns.length)> 0))
     {
        delvrLocHtml += "<div id=\"printReady\">\n";
        delvrLocHtml += table_begin("M", 1,"");
        delvrLocHtml += "<tbody> \n";
        delvrLocHtml += "<tr>";
         for(var i=0; i<delvr_myColumns.length; i++)
        {
          delvrLocHtml += "<td>"+delvr_myColumns[i]+"<\/td>";
         
          
        }
        delvrLocHtml += "<\/tr>";
     }

    for(i in delivery_jstab)
    {
      if(i>0)
      {
        delvrLocHtml += "<tr class=\"row1\">\n";
        var howmanyDone =0;
        for(var j=0; j<delvr_myColumns.length; j++)
        {
          if (curColumnToSort == howmanyDone)
          {
            delvrLocHtml += "<td style=\"background-color:#EEEEEE\">" + obs(cust_jstab[i][howmanyDone]) + "<\/td>";
			    } 
          else 
          {
          
				    delvrLocHtml += "<td>\n";				  
				    if(howmanyDone==0) // means time to display the drop list and table
				    {
  				    delvrLocHtml +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
              delvrLocHtml +="       <table border=\"0\">\n";
              delvrLocHtml +="	       <tr>\n";
              delvrLocHtml +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+obs(delivery_jstab[i][howmanyDone])+"</span>\n";
              
              delvrLocHtml +="          <input type=\"hidden\" name=\"delvr\" id=\"delvr\" value=\""+delivery_jstab[i][howmanyDone]+"\">\n";
              delvrLocHtml +="          <input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\""+custAcc+"\">\n";
              delvrLocHtml +="          <input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\""+suppCd+"\">\n";
              delvrLocHtml +="          <input type=\"hidden\" name=\"pg\" id=\"pg\" value=\""+pg+"\">\n";
              delvrLocHtml +=          preqstr_field ();
              delvrLocHtml +="          </td>\n";
              delvrLocHtml +="          <td width=\"50%\">\n";
              delvrLocHtml += delvr_op_list(curPrivilage, delivery_jstab[i][(howmanyDone)],i );
              delvrLocHtml +="          </td>\n";
              delvrLocHtml +="	       </tr>\n";
              delvrLocHtml +="	      </table>\n";
              delvrLocHtml +="	      </form>\n";
            }
            else
            {
              delvrLocHtml += obs(delivery_jstab[i][howmanyDone]);
            }  
          
            delvrLocHtml += "<\/td>\n";
          
          
		  	}
		  	howmanyDone++;	
      } // end of inner for loop
      
		  
     }
      delvrLocHtml += "\n";
      delvrLocHtml += "<\/tr>";
    }
    delvrLocHtml += "<\/tbody>";
    delvrLocHtml += "<\/table>";
    delvrLocHtml += "<\/div>\n";
		delvrLocHtml += "<\/td>";	
		delvrLocHtml += "<\/tr>";     
  delvrLocHtml += "<\/td>\n ";
  delvrLocHtml += "</tr> \n";
  
  delvrLocHtml +=nextPage(pagesTotal_3, pg_3, "cust.cgi", "pg_3");
  
  return delvrLocHtml;
}


function displayDelvrLocDetail(curPrivilage,curColumnToSort)
{
  var delvrLocDetHtml = "";
  delvrLocDetHtml +=backTo_delLocPgBtn_HTML();
  delvrLocDetHtml += "<tr> \n";
  delvrLocDetHtml += "  <td align=\"left\"> \n";
  delvrLocDetHtml += "    <table>\n";
	delvrLocDetHtml += "     <tr>\n";
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", myColumns[2]+":");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\" ", delivery_loc_jstab[1][1]);
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", myColumns[1]+":");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\" ", delivery_loc_jstab[1][1]);
	delvrLocDetHtml += "     <\/tr>\n";
	// 2nd row
	delvrLocDetHtml += "     <tr>\n";
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", myColumns[3]+":");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\" ", delivery_loc_addr_jstab["1"]+ " "+delivery_loc_addr_jstab["2"]+ " "+delivery_loc_addr_jstab["3"]+ " "+delivery_loc_addr_jstab["4"]+ " "+delivery_loc_addr_jstab["5"]);
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", myColumns[1]+":");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\" ", delivery_loc_jstab[1][2]);
	delvrLocDetHtml += "     <\/tr>\n";
	// 3rd row
	delvrLocDetHtml += "     <tr>\n";
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", "&nbsp;");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\" ", "&nbsp;");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", delvr_myColumns[2]+":");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\" ", delivery_loc_jstab[1][3]);
	delvrLocDetHtml += "     <\/tr>\n";
	delvrLocDetHtml += "    <\/table>\n";
  delvrLocDetHtml += "  <\/td> \n";
  delvrLocDetHtml += "<\/tr> \n";
   
  delvrLocDetHtml += "<tr> \n";
  delvrLocDetHtml += "  <td align=\"left\"> \n";
  delvrLocDetHtml += "  <div id=\"helparea\"> \n";
  delvrLocDetHtml += "    <table>\n";
	delvrLocDetHtml += "     <tr>\n";
	delvrLocDetHtml += "     <tr>\n";
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"100\" ", otherText["transpt"]+":");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\" ", delivery_loc_jstab[1][4]);
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"100\" ",  otherText["largst"]+":");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\" ", delivery_loc_jstab[1][5]);
	delvrLocDetHtml += "     <\/tr>\n";
	// 2nd row
	delvrLocDetHtml += "     <tr>\n";
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"100\" ", otherText["doc"]+":");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\" ", delivery_loc_jstab[1][6]);
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"100\" ", otherText["unit"]+":");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\" ", delivery_loc_jstab[1][7]);
	delvrLocDetHtml += "     <\/tr>\n";
	// 3rd row
	delvrLocDetHtml += "     <tr>\n";
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"100\" ", otherText["tarif"]+":");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\"  ", delivery_loc_jstab[1][8]);
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"100\" ", otherText["trip_time"]+":");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\" ", delivery_loc_jstab[1][9]);
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"100\" ", otherText["trip_dist"]+":");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\" ", delivery_loc_jstab[1][10]);
	delvrLocDetHtml += "     <\/tr>\n";
	// 4th row 
	 
	delvrLocDetHtml += "     <tr>\n";
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"100\" ", otherText["contact"]+":");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\" ", delivery_loc_jstab[1][11]);
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"100\" ", otherText["phone"]+":");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\" ", delivery_loc_jstab[1][12]);
	delvrLocDetHtml += "     <\/tr>\n";
	
	delvrLocDetHtml += "     <tr>\n";
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"100\" ", otherText["prof"]+":");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\" ", delivery_loc_jstab[1][13]);
	delvrLocDetHtml +=textTd_HTML(" class=\"infotextheading\" width=\"100\" ", "&nbsp;");
	delvrLocDetHtml +=textTd_HTML(" class=\"infotext\" align=\"left\" ", "&nbsp;");
	delvrLocDetHtml += "     <\/tr>\n";
	
	delvrLocDetHtml += "    <\/table>\n";
	delvrLocDetHtml += "  <\/div> \n";  
  delvrLocDetHtml += "  <\/td> \n";
  delvrLocDetHtml += "<\/tr> \n";
  return delvrLocDetHtml;
}


function assArray_keys(inputArr)
{
    var keys = new Array();
    for (var i in inputArr) {
        if (inputArr[i] != null) 
            keys.push(i);
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
   fieldHTML +="<input name=\"op\" id=\"op\" value=\""+attr+"\" type=\"hidden\">\n";
   return fieldHTML;
}


function preqstr_field ()
{
  var fieldHTML ="";
   fieldHTML +="<input name=\"preqstr\" id=\"preqstr\" value=\"\" type=\"hidden\">\n";
   return fieldHTML;
}


function suppCd_field(attr)
{
  var fieldHTML ="";
  fieldHTML +="<input name=\"suppCd\" id=\"suppCd\" value=\""+suppCd+"\" "+attr+" >\n";
  return fieldHTML;
}


function backToBtn_HTML ()
{
   var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   btn_HTML += btnLocation_HTML("justChaneMyLocation('cust.cgi?suppCd='+suppCd); ", otherText["back_to_customers"]);
   btn_HTML +="                                 &nbsp;\n";
//   btn_HTML +=  btnLocation_HTML("void(printSpecial()); ", "Print");
   btn_HTML +="                                 </div><br>\n";
   
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}


function backTo_delLocPgBtn_HTML()
{

   var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   btn_HTML += btnLocation_HTML("history.go(-1);", otherText["back_to_delvloc"]);
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}


function addNewBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   
    btn_HTML += btnLocation_HTML("if(cmpy_jslst.length==2) suppCd=cmpy_jslst[1][0]; if (checkSupplier()) justChaneMyLocation('cust.cgi?op="+opValues["insertCustomerForm"]+"&suppCd='+suppCd); ", otherText["add_new_cust"]);
//    btn_HTML += "&nbsp; "+ btnLocation_HTML("void(printSpecial()); ", "Print");
    
   
   
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}


function updatePageHeading(op,pgHead)
{
  var pageHeading = pgHead;
  if (op <= 1 || op == opValues["viewCustomer"])
  {
    pageHeading += otherText["pgHead_cust"];
  }
  if (op == opValues["modifyCustomerForm"] || op == opValues["modifyCustomerSubmit"] )
  {
    pageHeading += otherText["pgHead_custUpd"];
  }
  if (op == opValues["insertCustomerForm"] || op == opValues["insertCustomerSubmit"] )
  {
    pageHeading += otherText["pgHead_custAdd"];
  }
  if (op == 2) 
  {
    pageHeading += otherText["pgHead_allocLoad"];
  }
  if (op == 3)
  {
    pageHeading += otherText["pgHead_delvLoc"];
  }
  
  return pageHeading;   
}




function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	if (op <= 1 || op == opValues["viewCustomer"])
	{
		pageTitle += otherText["pgTitle_cust"];
	}
	if (op == opValues["modifyCustomerForm"] || op == opValues["modifyCustomerSubmit"] )
	{
		pageTitle += otherText["pgTitle_custUpd"];
	}
	
	if (op == opValues["insertCustomerForm"] || op == opValues["insertCustomerSubmit"] )
	{
		pageTitle += otherText["pgTitle_custAdd"];
	}

	if (op == 2)
	{
		pageTitle += otherText["pgTitle_allocLoad"];
	}
  
	if (op == 3)
	{
		pageTitle += otherText["pgTitle_delvLoc"];
	}
  
	return pageTitle;
}


/* define function op_list() */
function op_list(priv, accNum, custAcct, frmNum)
{
/* priv = 
6 modify	op=1,2,3
7 add		op=4
8 delete	op=5
*/
//	alert("priv="+priv);
  var op_list ="";
  op_list +="<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+accNum+"', '"+custAcct+"', '"+frmNum+"');\">          ";
  switch (priv)
  {
    case 8:
      op_list +="<option value=\""+opValues["deleteCustomerSubmit"]+"\">"+commText["Delete"]+"</option>";
      
    case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

    case 6:
    op_list +="<option value=\""+opValues["modifyCustomerForm"]+"\">"+commText["Modify"]+"</option>";
   
      
    case 5:			/* printf("<option value=1>5 1 FIND  </option>"); */
    op_list +="<option value=\""+opValues["baseAccountDetail"]+"\">"+otherText["acct_det"]+"</option>";
    op_list +="<option value=\"2\">"+otherText["alloc"]+"</option>";
    op_list +="<option value=\"3\">"+otherText["del_loc"]+"</option>";
    op_list +="<option value=\"4\">"+otherText["ledger"]+"</option>";
//    op_list +="<option value=\"9\">"+otherText["ord_ent_maint"]+"</option>";
    op_list +="<option value=\"10\">"+otherText["invoice"]+"</option>";    
    break;
  }
  op_list +="<option value=0 selected>--\t"+otherText["ur_action"]+"\t--</option>";
  op_list +="</select>                                        ";
  return op_list ;
}


/* define function op_list() */
function delvr_op_list(priv, accNum, frmNum)
{
/* priv = 
6 modify	op=1,2,3
7 add		op=4
8 delete	op=5
*/
  var op_list ="";
  op_list +="<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+accNum+"', '0', '"+frmNum+"');\">          ";
  switch (priv)
  {
    case 8:
      op_list +="<option value=\"11\">" + commText["Delete"] + "</option>";
      
    case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

    case 6:
    op_list +="<option value=\"12\">" + commText["Modify"] + "</option>";
   
      
    case 5:			/* printf("<option value=1>5 1 FIND  </option>"); */
    op_list +="<option value=\"13\">" + otherText["delivLocDetails"] + "</option>";    
    break;
  }
  
  op_list +="<option value=0 selected>--\t"+otherText["ur_action"]+"\t--</option>";
  op_list +="</select>                                        ";
  return op_list ;
}


function nextPage(totalPages, curPg, curPgName, curPgVarName)
{
  var nextPgHTML="";
  nextPgHTML += "<tr> \n";
  nextPgHTML += "<td align=\"center\">\n ";


  if (curPg > 1)
  {
    //nextPgHTML +="<a href=\"javascript:document.glblFrm.pg.value="+(curPg-1)+";document.glblFrm.op.value=0;document.glblFrm.submit();\">Previous</a>\n";
    nextPgHTML +="<a href=\"javascript:gotoResultPage('"+curPgName+"', '"+curPgVarName+"', '"+(curPg-1)+"' );\">" + otherText["btn_prev_page"] + "</a>\n";
  }
  nextPgHTML +="&nbsp; " + otherText["btn_curr_page"] + "="+curPg+"/"+totalPages+" &nbsp; ";
  if (totalPages > curPg)
  {
    nextPgHTML +="<a href=\"javascript:gotoResultPage('"+curPgName+"', '"+curPgVarName+"', '"+(curPg+1)+"' );\">" + otherText["btn_next_page"] + "</a>\n";
  }
  
  nextPgHTML += "<\/td>\n ";
  nextPgHTML += "</tr> \n";
  return nextPgHTML;
}


function checkSupplier()
{
  if(suppCd!="-1")
  {
    return true;
  }
  else
  {
    alert(otherText["msg_select_supp2"]);
    return false;
  }
}
/* local_frmButtRow_HTML function added to the file
 * to reset the name code when Reset button is clicked
 */
function local_frmButtRow_HTML(value, isReset)
{
  var buttnHTML ="";
  buttnHTML +="								<tr>\n";
  buttnHTML +="									<td align=\"center\" class=\"infotext\" width=\"100%\">\n";
  buttnHTML +="													<input type=\"submit\" value=\""+value+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
  if(isReset==1)
  {
    buttnHTML +="									           &nbsp;\n";
    buttnHTML +="													<input type=\"reset\" value=\"Reset\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" onClick=\"document.getElementById('cmpCd').innerHTML = '';\">\n";
  }
  
  buttnHTML +="									</td>\n";
  buttnHTML +="								</tr>\n";

  return buttnHTML;
		
}/* end loca_frmButtRow_HTML */

	
function local_HeadrHTML( newPage )
{
	newPage +="<SCRIPT LANGUAGE=\"JavaScript\">\n";
	newPage +="/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
	newPage +="FUNCTION [ submitmyform] \n";
	newPage +="[PURPOSE]  		-> 	Always use this method to submit a form,\n";
	newPage +="					gives me the flexbility of doing validation\n";
	newPage +="					and addition if required before i submit the form\n";
	newPage +="          \n";
	newPage +="[Parameter]  	-> myobject FORM OBJECT Parameter is the form need to be submit\n";
	newPage +="[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
	newPage +="'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
	newPage +="function submitmyform(myobject)\n";
	newPage +="{\n";
	newPage +="	//var myHiddenOb;\n";
	newPage +="	\n";
	newPage +="	//myHiddenOb = getElemRefs(\"prev_qstring\";\n";
	newPage +="	//myHiddenOb.value=produceQString(;\n";
	newPage +="	//return formcheck(myobject;\n";
	newPage +="	return Validator.Validate(myobject,1);\n";
	newPage +="}\n";
	newPage +="/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
	newPage +="[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
	newPage +="'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
	newPage +="function submitAction(myobject,accNum, custAcct, frmNum)\n";
	newPage +="{\n";
	newPage +="	  var myCurQstring=produceQString();\n";
	newPage +=    "var myselectedvalue = myobject.options[myobject.selectedIndex].value;";
	newPage +=    "if(myselectedvalue==\"2\")\n";
	newPage += "  {\n";
	newPage +="     document.location.href=\"allocations.cgi?op=0&pg=1&type=3&cmpy=\"+accNum+\"&supp="+suppCd+"\";\n";
	newPage +="   }\n";
  
	newPage +=    "else if(myselectedvalue==\"3\")\n";
	newPage += "  {\n";
	newPage +="     document.location.href=\"delivery_loc.cgi?op="+opValues["listDelivLoc"]+"&pg=1&cmpyCd=\"+accNum+\"&suppCd="+suppCd+"&custAcc=\"+custAcct+\"\";\n";
  
	newPage +="   }\n";
  
	newPage +=    "else if(myselectedvalue==\"4\")\n";
	newPage += "  {\n";
	newPage +="     document.location.href=\"cust_ledger.cgi?op="+opValues["listCustLedger"]+"&pg=1&cmpyCd=\"+accNum+\"&suppCd="+suppCd+"&custAcc=\"+custAcct+\"\";\n";
  
	newPage +="   }\n";
 
	newPage +=    "else if(myselectedvalue==\"9\")\n";
	newPage += "  {\n";
	newPage +="     document.location.href=\"order_ent_maint.cgi?termCd=-1&op="+opValues["listOrder"]+"&pg=1&cmpyCd=\"+accNum+\"&suppCd="+suppCd+"&custAcc=\"+custAcct+\"\";\n";
  
	newPage +="   }\n";

	newPage +=    "else if(myselectedvalue==\"10\")\n";
	newPage += "  {\n";
	newPage +="     document.location.href=\"cust_invoice.cgi?op="+opValues["listCustInvoice"]+"&pg=1&cmpyCd=\"+accNum+\"&suppCd="+suppCd+"&custAcc=\"+custAcct+\"\";\n";
  
	newPage +="   }\n";
 
	newPage +=    "else if(myselectedvalue==\""+opValues["baseAccountDetail"]+"\")\n";
	newPage += "  {\n";
	newPage +="     document.location.href=\"account_details.cgi?termCd=-1&op="+opValues["listAccountDetail"]+"&cmpyCd=\"+accNum+\"&suppCd="+suppCd+"&custAcc=\"+custAcct+\"\";\n";
  
	newPage +="   }\n";
	newPage +="   else if(myselectedvalue==\""+opValues["deleteCustomerSubmit"]+"\")\n";
	newPage += "  {\n";
	newPage +="     if(confirm('" + otherText["msg_del_confirm"] + "'))\n";
	newPage += "    {\n";
	newPage += "      eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
  //newPage +="       document.location.href=\"del_cust.cgi?op=8&preqstr=\"+myCurQstring;\n";
	newPage += "    }\n";
	newPage += "    else\n";
	newPage += "    {\n";
	newPage += "      eval(\"document.select_action_\"+frmNum+\".reset();\");\n";  
	newPage += "    }\n";
  
	newPage +="   }\n";
	newPage +="   else if(myselectedvalue==\"11\")\n";
	newPage += "  {\n";
	newPage +="     if(confirm('" + otherText["msg_del_confirm"] + "'))\n";
	newPage += "    {\n";
	newPage += "      eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage +="       document.location.href=\"del_cust.cgi?op=11&preqstr=\"+myCurQstring;\n";
	newPage += "    }\n";  
	newPage +="   }\n";
	newPage +="   else\n";
	newPage += "  {\n";
	newPage += "    eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "    return true;\n";
	newPage +="   }\n";
  
	newPage +="}\n";
	newPage +="function dispLic(value){ \n";
	newPage +="	if(value != undefined){ \n";
  
	newPage +="				document.getElementById('cmpCd').innerHTML = value; \n";
	newPage +="	} \n";
	newPage +="	else \n";
	newPage +="	{ \n";
	newPage +="				document.getElementById('cmpCd').innerHTML = '' \n";
	newPage +="	} \n";
	newPage +="} \n";
	newPage +="</script>\n";
	newPage +="\n";
	newPage +="</head>\n";
	newPage +="\n";
	newPage +="<body>\n";
	newPage +="\n";

	return (newPage);
}

