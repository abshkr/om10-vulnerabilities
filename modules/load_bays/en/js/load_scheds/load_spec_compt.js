/**********************************************************
 * $Id: load_spec_compt.js,v 1.56 2011/03/29 02:35:19 abs Exp $ 
 *
 **********************************************************/


//This file use unique version for multi-language.
var t__Equiptment_1 = ["                                                 Equiptment 1","                                                 运输设备 1"];
var t__Trip_Shift = ["                                                 Trip/Shift","                                                 提单/班次"];

var t__Add = ["Add","新增"];
var t__Add_New_Order_Spec = ["Add New Order Spec","新增订单概要"];
var t__ADD_NEW_ORDER_SPEC_BY_COMPARTMENT = ["ADD NEW ORDER SPEC BY COMPARTMENT","新增根据油仓的订单概要"];
var t__Add_New_Order_Spec_by_Compartment_Page = ["Add New Order Spec by Compartment Page","新增根据油仓的订单概要管理页"];
var t__All_the_fields_labelled_with_an = ["										All the fields labelled with an ","										所有带"];
var t__All_the_fields_labelled_with_an = ["								All the fields labelled with an ","										所有带"];
var t__are_mandatory = ["are mandatory","的项目是必填的"];
var t__Assign = ["Assign","指派"];
var t__ASSIGN_ORDER = ["ASSIGN ORDER","指派订单"];
var t__Assign_Order_Details = ["Assign Order Details","指派订单详情"];
var t__ASSIGN_ORDER_PRODUCTS_TO_LOAD = ["ASSIGN ORDER PRODUCTS TO LOAD","指派订单油品"];
var t__Assign_Order_Products_to_Load_Page = ["Assign Order Products to Load Page","指派订单油品管理页"];
var t__Back_to_Load_Schedules_Page = ["Back to Load Schedules Page","返回发油订单管理页"];
var t__Back_to_Load_Spec_By_Compartment = ["Back to Load Spec By Compartment","返回依据油仓提油概要"];
var t__Back_to_Load_Spec_by_Compartment_Page = ["Back to Load Spec by Compartment Page","返回发油订单管理页"];
var t__Back_to_Order_Spec_by_Compartment = ["Back to Order Spec by Compartment","返回依据油仓订单概要"];
var t__cannot_modify = ["cannot modify","不能修改"];
var t__Carrier = ["                       				Carrier","                       				承运商"];
var t__Compartment = ["Compartment","油仓"];
var t__Compartment_No = ["						Compartment No ","						油仓号"];
var t__Customer_Order = ["																Customer Order","																客户订单"];
var t__Cust_Order = ["Cust Order","客户订单"];
var t__Cust_Order_Ref = ["Order Ref","参考号"];
var t__Delivery_Date = ["                       				Delivery Date","                       				交付日期"];
var t__Delivery_Location = ["Delivery Location","交付地点"];
var t__DKI_Omega_Menu = ["DKI Omega Menu","达基国际Omega系统菜单"];
var t__Do_you_really_want_to_modify_drawer = ["Do you really want to modify drawer","您确定要修改提油者吗"];
var t__Drawer = ["                       				Drawer","                       				提油者"];
var t__Drawer_cannot_be_used_with_these_products = ["Drawer cannot be used with these products","这些油品不能用提油者"];
var t__Equipment = ["Tanker[Equipment]","油槽车[运输设备]"];
var t__Equipment_Code = ["						Equipment Code ","						运输设备代码"];
var t__Insert_New_Record_Failed = ["Insert New Record Failed","插入新记录失败"];
var t__Loaded = ["Loaded","已装"];
var t__LOAD_SCHEDULES = ["LOAD SCHEDULES","发油订单管理"];
var t__LOAD_SPEC_BY_COMPARTMENT = ["LOAD SPEC BY COMPARTMENT","依据油仓的发油概要"];
var t__Load_Spec_by_Compartment_Page = ["Load Spec by Compartment Page","依据油仓的发油概要管理页"];
var t__Load_Spec_Details = ["Load Spec Details","发油概要详情"];
var t__Load_Spec_is_completed = ["Load Spec is completed","发油概要已完成"];
var t__Load_Spec_is_NOT_new = ["Load Spec is NOT new","发油概要不是新的"];
var t__Load_Status = ["                       				Load Status","                       				发油状态"];
var t__Modify = ["Modify","修改"];
var t__MODIFY = ["MODIFY","修改"];
var t__MODIFY_LOAD_SPEC_BY_COMPARTMENT = ["MODIFY LOAD SPEC BY COMPARTMENT","修改依据油仓的发油概要"];
var t__MODIFY_ORDER_SPEC_BY_COMPARTMENT = ["MODIFY ORDER SPEC BY COMPARTMENT","修改依据油仓的订单概要"];
var t__No_data_available = ["No data available","无可用数据"];
var t__Order_No = ["Order No","订单号"];
var t__Order_no_has_been_used = ["Order no has been used","订单号已使用"];
var t__Order_no_has_no_qty = ["Left Qty = 0","剩余油品 = 0"];
var t__ORDERS = ["ORDERS","订单"];
var t__ORDER_SPEC_BY_COMPARTMENT = ["ORDER SPEC BY COMPARTMENT","依据油仓的订单概要"];
var t__Order_Spec_by_Compartment_Page = ["Order Spec by Compartment Page","依据油仓的订单概要管理页"];
var t__order_spec_details = ["order spec details","订单概要详情"];
var t__Preloaded = ["Preloaded","预装"];
var t__Prev_Product = ["Prev Product","先前油品"];
var t__Curr_Prev_Product_Check = ["The product selected for this compartment is different from what was loaded previously! Please confirm!", "您所选的油品和先前该油仓装过的油品不是同一油品！请您确认！"];
var t__Product = ["                    			Product","                    			油品"];
var t__Product = ["																 Product","																 油品"];
var t__Product = ["Product","油品"];
var t__Profile = ["                       				Profile","                       				属性"];
var t__Quantity = ["											Quantity","											数量"];
var t__Quantity = ["Quantity","数量"];
var t__Reset = ["Reset","重置"];
var t__Schedule = ["Schedule","调度"];
var t__Schedule_Qty = ["                       			Schedule Quantity","                       			调度量"];
var t__Schedule_Qty = ["																Schedule Quantity","                       			调度量"];
var t__Select_A_Drawer = ["Select A Drawer","选择提油者"];
var t__Select_An_Order = ["Select An Order","选择订单"];
var t__Select_An_Unit = ["Select An Unit","选择计量单位"];
var t__Select_A_Product = ["Select A Product","选择油品"];
var t__Successfully_Deleted = ["Successfully Deleted","成功删除"];
var t__Successfully_Inserted_A_New_Record = ["Successfully Inserted A New Record ","成功插入一条新记录"];
var t__Successfully_Updated_ = ["Successfully Updated!","成功更新！"];
var t__Successfully_Updated = ["Successfully Updated","成功更新"];
var t__Supplier = ["                       				Supplier","                       				供应商"];
var t__Tanker = ["                    			Tanker","                    			油槽车"];
var t__Tanker_Type = ["                       				Tanker Type","                       				油槽车类型"];
var t__Terminal = ["                       				Terminal","                       				油库"];
var t__Trip_Details = ["Trip Details","提单详情"];
var t__Unit = ["																Unit","																单位"];
var t__Unit = ["Unit","单位"];
var t__Update_Failed = ["Update Failed","更新失败"];
var t__Update_Load_Spec_by_Compartment_Page = ["Update Load Spec by Compartment Page","更新依据油仓发油概要管理页"];
var t__Update_Order_Spec_by_Compartment_Page = ["Update Order Spec by Compartment Page","更新依据油仓订单概要管理页"];
var t__View_All = ["View All","显示全部"];
var t__YOUR_ACTION = ["YOUR ACTION","请选择"];
var t__Order_Delivery_Location = ["Order - Delivery Location", "客户订单–配送地点"];

var t__Enter_Quantity_between = ["Enter Quantity between 0 - ", "请输入油量，值必须介于0 - "];
var t__Enter_Schedule_Quantity = ["Enter Schedule Quantity > ", "请输入调度油量，值必须> "];
var t__Enter_Schedule_Quantity_between = ["Enter Schedule Quantity between 0 - ", "请输入调度油量，值必须介于0 - "];
var t__Bay_Arm = ["Bay Arm","鹤管"];
var t__Select = ["Select", "请选择" ];
var t__msg_prod_not_on_arm = ["Selected product not available on selected arm", "所选油品和所选台位鹤管不匹配"];
var t__Select_All_Unit_Same = ["Check all comaprtment units should be same","Check all comaprtment units should be same"];
var t__Select_All_Order_Sched_Unit_Same = ["Schedule and order product quantity units should be same","Schedule and order product quantity units should be same"];
var t__Order_Assignment_Alert = ["All compartments are assigned! \n You have to use \"MODIFY\" to \n cancel some assignment first!", "所有油仓都已经指派了订单或油品！\n您必须先用“修改”功能清空一个或\n多个油仓，才可以重新指派！"];

var myColumns = [ml(t__Equipment), ml(t__Compartment), ml(t__Product), ml(t__Unit), ml(t__Schedule),
	ml(t__Loaded), ml(t__Preloaded), ml(t__Prev_Product), ml(t__Cust_Order), ml(t__Bay_Arm) ];

var myOrder = [ml(t__Order_No), ml(t__Delivery_Location), ml(t__Quantity), ml(t__Cust_Order_Ref)];


/*
 * opValues Hash table trace the 
 * available options on this page 
 * for every function there is a unique op
 */		    
var opValues = new Array();
opValues["enterAdd"] = 7;
opValues["submitAdd"] = 17;
opValues["enterDelete"] = 8;
opValues["submitDelete"] = 18;
opValues["enterModify"] = 6;
opValues["submitModify"] = 16;
/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
var l_opInf= new Array()

	l_opInf[20]= ml(t__Successfully_Updated)+"!";
l_opInf[23]= ml(t__Successfully_Updated)+"!";
l_opInf[27]= ml(t__Successfully_Updated)+"!";
l_opInf[28]= ml(t__Successfully_Inserted_A_New_Record)+"!";
l_opInf[29]= ml(t__Successfully_Deleted)+"!";
l_opInf[30]= ml(t__Update_Failed)+"!";
l_opInf[33]= ml(t__Update_Failed)+"!";
l_opInf[37]= ml(t__Update_Failed)+"!";
l_opInf[38]= ml(t__Insert_New_Record_Failed)+"!";
l_opInf[31]= ml(t__Update_Failed)+"! "+ml(t__Drawer_cannot_be_used_with_these_products);
l_opInf[67]= ml(t__Successfully_Updated)+"!";
l_opInf[68]= ml(t__Successfully_Inserted_A_New_Record)+"!";
l_opInf[77]= ml(t__Update_Failed)+"!";
l_opInf[78]= ml(t__Insert_New_Record_Failed)+"!";
l_opInf[88]= ml(t__Insert_New_Record_Failed)+"! "+ml(t__Order_no_has_been_used);



/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    		
var ops_req_print = [-1,0, 1,2, 15,23,24, 25,26,27, 33,34, 35, 28,38,48,36,27,37,47,133,134,135,137];
var ops_req_search = [-1,0, 1,2, 15,23,24, 25,26,27, 33,34, 35,28,38,48,36,27,37,47,133,134,135,137];// search never required on this page		

function renderPage(cRec, cCol, cState, cPageState, priv, lang)
{ 
	js_lang = lang; 
	var curRecord = cRec;
	var curColumnToSort = cCol;
	var curViewDetailState = cState;
	var curPageIn = cPageState;
	var curPrivilage = priv;


	var i;
	var e;
	var f;
	var newPage = "";

	var newPage = "";
	var pageTitle="";
	var pageHeading="";


	newPage += printHdr(newPage, updatePageTitle(curViewDetailState, pageTitle), lang);
	newPage += local_HeadrHTML(newPage, lang);
	//newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState, pageHeading), check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
	newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
	newPage += "\n";
	newPage +="<tr>\n";  
	newPage +="<td width=\"100%\">             \n";
	newPage +="<div class=\"content\" id=\"content\">\n";
	newPage += "<div id=\"printReady\">";
	newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
	newPage +="<tbody>\n";   

    newPage += statusbarRowHTML(statusBar); 
	newPage += displayStatusMsg (op);


	if (curViewDetailState <= 2 || (curViewDetailState > 10 && curViewDetailState < 40)) // view records
	{

		//newPage += displayGlblFrm(supp,tankTerm);
		//newPage +=addPrintBtn_HTML();

		newPage += addButton(curViewDetailState);

		newPage += "<tr>\n";
		newPage += "	<td>\n";
		newPage += "		<div id=\"printReady\">\n";
		newPage += "		<table width=\"100%\">\n";
		newPage += displayInfo(true);


		if( ((myColumns.length)> 0))
		{
			newPage += "<tr> \n";
			newPage += "<td>\n ";
			newPage += table_begin("M", 0,"");
			newPage += "<tbody> \n";
			newPage += "<tr>";

			for(var i=0; i<myColumns.length; i++)
			{
				newPage += "<td>"+myColumns[i]+"<\/td>";
			}
			newPage += "<\/tr>";


			for(i in load_spec_compt_tab)
			{
				newPage += "<tr class=\"row1\">\n";
				if(i>0) 
				{
					var howmanyDone =0;
					
					for(var j=0; j<myColumns.length; j++)
					{
						
						

						if (curColumnToSort == howmanyDone)
						{
							newPage += "<td width=\"50%\" style=\"background-color:#EEEEEE\">" + obs(load_spec_compt_tab[i][howmanyDone]) + "<\/td>";
						} 
						else 
						{

							newPage += "<td>\n";				  
							if(howmanyDone==0) // means time to display the drop list and table
							{
//								newPage +="   <form name=\"optionsFrm_"+load_spec_compt_tab[i][1]+"\" id=\"optionsFrm\" method=\"get\">\n";
// should use tanker cmpt, not trailer cmpt.
								newPage +="   <form name=\"optionsFrm_"+load_spec_compt_tab[i][11]+"\" id=\"optionsFrm\" method=\"get\">\n";
								newPage +="       <table border=\"0\">\n";
								newPage +="	       <tr>\n";
								newPage +="                 <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+obs(tanker+"["+load_spec_compt_tab[i][howmanyDone]+"]")+"</span>\n";
								newPage +="                     <input type=\"hidden\" name=\"tankTerm\" id=\"tankTerm\" value=\""+tankTerm+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"supp\" id=\"supp\" value=\""+supp+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"carrier\" id=\"carrier\" value=\""+carrier+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"drawer\" id=\"drawer\" value=\""+drawer+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"tripNo\" id=\"tripNo\" value=\""+tripNo+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"cmptID\" id=\"cmptID\" value=\""+obs(load_spec_compt_tab[i][11])+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+obs(tanker)+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"prod\" id=\"prod\" value=\""+obs(load_spec_compt_tab[i][2])+"\">\n";
//								newPage +="                     <input type=\"hidden\" name=\"bay_armCd\" id=\"bay_armCd\" value=\""+obs(load_spec_compt_tab[i][19])+"\">\n";
								newPage +="                 </td>\n";
								newPage +="                 <td width=\"50%\">\n";
								newPage += op_list(curPrivilage, load_spec_compt_tab[i][7], load_spec_compt_tab[i][2]);
								newPage +="                 </td>\n";
								newPage +="	       </tr>\n";
								newPage +="	  </table>\n";
								newPage +="   </form>\n";
							}
							else if(howmanyDone == 1) //Cmpt No of tanker and trailer
							{
								newPage += obs(load_spec_compt_tab[i][11]+"["+load_spec_compt_tab[i][1]+"]");
							}
							else if(howmanyDone == 2 || howmanyDone == 4) //Product code and Unit Code
							{
								howmanyDone ++;
								newPage += obs(load_spec_compt_tab[i][howmanyDone]);
							}
							else if(howmanyDone == 10) //Customer Order Info
							{
                                newPage += displayLoadOrderDetails(load_spec_compt_tab[i][11]);
							}
							else if(howmanyDone == 11) //Bay Arm Code
							{
                                newPage += obs(load_spec_compt_tab[i][18]);
							}
							else
							{
								if(howmanyDone==18) alert("Load Spec Compt  "+load_spec_compt_tab[i][howmanyDone]);
								newPage += obs(load_spec_compt_tab[i][howmanyDone]);
							}

							newPage += "<\/td>\n";

						}// end loop column
						howmanyDone++;
					}

				} // end if to check rows
				newPage += "\n";
				newPage += "<\/tr>";

			}//end loop on load sched
			newPage += "<\/tbody>";
			newPage += "<\/table>";
			newPage += "<\/td>";	
			newPage += "<\/tr>";

		} // end if to check column

		//newPage += nextPage();
		newPage += "		</table>\n";
		newPage += " 		</div>\n";
		newPage += "	</td>\n";
		newPage += "</tr>\n";
		//newPage +=addPrintBtn_HTML();

	}// end if to check state
	else if(curViewDetailState == 7 )
	{
		newPage += updateForm();

	}
	else if(curViewDetailState == 3 )
	{
		newPage += assignOrder();

	}
	else if(curViewDetailState == 40 || curViewDetailState > 50)
	{
		newPage += orderPage();

	}
	else if(curViewDetailState == 47 || curViewDetailState == 48)
	{
		newPage += orderForm();

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

	//alert(newPage); 
	return(newPage);
	document.close();
	if (typeof writeBack != 'undefined')writeBack();

}


function displayLoadOrderDetails(compt)
{
	var loadOrderForm = "";
	var i;
	var curr_cmpt;
	var cmptCnt = 0;


	for( i in load_spec_compt_order_tab )
	{
		if (load_spec_compt_order_tab[i][0] == compt)
		{
			cmptCnt += 1;
		}
	}

	if ( cmptCnt == 0 )
	{	// There is no order assigned to this compartment
		loadOrderForm += "&nbsp;";
	}
	else
	if ( cmptCnt == 1 )
	{	// There is one order is assigned to this compartment
		for( i in load_spec_compt_order_tab )
		{
			if (load_spec_compt_order_tab[i][0] == compt)
			{
				loadOrderForm += load_spec_compt_order_tab[i][1] + "&nbsp;[" + load_spec_compt_order_tab[i][2] +"]\n";
			}
		}
	}
	else
	{
//		loadOrderForm += "<table style=\"border:#000000 1px solid\">\n";
		loadOrderForm += "<table>\n";

		for( i in load_spec_compt_order_tab )
		{
			if (load_spec_compt_order_tab[i][0] == compt)
			{
				loadOrderForm += "<tr>\n";
				loadOrderForm += "<td width=\"20\">\n";
				loadOrderForm += load_spec_compt_order_tab[i][1]+"\n";
				loadOrderForm += "</td>\n";
				loadOrderForm += "<td width=\"40\">\n";
				loadOrderForm += "["+load_spec_compt_order_tab[i][2]+",\n";
				loadOrderForm += "</td>\n";
				loadOrderForm += "<td width=\"20\">\n";
				loadOrderForm += load_spec_compt_order_tab[i][3]+"]\n";
				loadOrderForm += "</td>\n";
				loadOrderForm += "</tr>\n";
			}
		}

		loadOrderForm += "</table>\n";
	}

	return loadOrderForm;
}


function comptOrderPage()
{
	var i;
	var orderPage = "";
	var cmptCnt = 0;


	for( i in load_spec_compt_order_tab )
	{
		if (load_spec_compt_order_tab[i][0] == cmptID)
		{
			cmptCnt += 1;
		}
	}

	if (cmptCnt <= 1)
	{
		return orderPage;
	}

	orderPage += "	<tr>\n";
	orderPage += "		<td>\n";
	orderPage +=  table_begin("M", 1,"");
	orderPage += "			<tbody> \n";
	orderPage += "				<tr>\n";

	for(i=0; i<myOrder.length; i++)
	{
		orderPage += "				<td>"+myOrder[i]+"<\/td>\n";
	}
	orderPage += "				</tr>\n";


	for(i in order_list_tab)
	{
		orderPage += "<tr class=\"row1\">\n";
		if(i>0) 
		{
			for(var j=0; j<myOrder.length; j++)
			{

				orderPage += "<td>\n";
				
				if(j==0) // means time to display the drop list and table
				{
					orderPage += obs( order_list_tab[i][0]+"["+order_list_tab[i][3]+"]" );
				}
				else if(j == 3) //Customer Order Reference Code
				{
					orderPage += obs( order_list_tab[i][4] );
				}
				else
				{
					orderPage += obs(order_list_tab[i][j]);
				}

				orderPage += "</td>\n";

			}

		} // end if to check rows

		orderPage += "\n";
		orderPage += "</tr>\n";

	}//end loop on load sched
	orderPage += "</tbody>";
	orderPage += "</table>";

	orderPage += "		</td>\n";
	orderPage += "	</tr>\n";  


	return orderPage;
}



function updateForm()
{
	//Added following two variables  to check if 
	//assigned bay arm can be modified if satus is active 
	//modify allocated bay arm is ok 
	//if loading then can not modify any thing every thing should be view only
	var is_mod_bay_arm = true;
	var is_mod_anything = true;
	
	
	
	var i = cmptID;
	var modfield = "";
	var isReadOnly ="";
	var arr_len;
	var is_order_remained;
	var aId;
	var j=0;

	/* If status is ACTIVE and has no products on compartment */
	if ( state == 2 && load_spec_compt_tab[i][2] != "" ) {
		modfield = "disabled";
		isReadOnly = "readonly"
	}
	else if ( state > 2 && load_spec_compt_tab[i][2] != "" ) {
		is_mod_anything = false;
		isReadOnly = "readonly";
		modfield = "disabled";
	}

	var updateFrm = "";

	updateFrm += "	<tr>\n";
	updateFrm += "		<td align=\"center\">\n";
	updateFrm += "			<div class=\"button\"><a href=\"load_spec_compt.cgi?tankTerm="+tankTerm+"&supp="+supp+"&tanker="+tanker+"&tripNo="+tripNo+"\">"+ml(t__Back_to_Load_Spec_by_Compartment_Page)+"</a></div><br>\n";
	updateFrm += "		</td>\n";
	updateFrm += "	</tr>\n";

	// Added Carrier, Supplier, & Drawer detail
	updateFrm += "	<tr>\n";
	updateFrm += "		<td>\n";
	updateFrm += "		<div id=\"helparea\">\n";
	updateFrm += "			<table>\n";

	updateFrm += "				<tr>\n";
	updateFrm += "					<td class=\"infotextheading\" width=\"150\">\n";
	updateFrm += ml(t__Supplier)+":\n";
	updateFrm += "					</td>\n";
	updateFrm += "					<td class=\"infotext\">\n";
	updateFrm += "										" + supp+ " - " + suppNm;
	updateFrm += "					</td>\n";
	updateFrm += "				</tr>\n";

	updateFrm += "				<tr>\n";
	updateFrm += "					<td class=\"infotextheading\" width=\"150\">\n";
	updateFrm += ml(t__Drawer)+":\n";
	updateFrm += "					</td>\n";
	updateFrm += "					<td>\n";
	updateFrm += "                       				<select name=\"drawer\" id=\"drawer\" class=\"smallselect\" disabled ;\"> \n";
	updateFrm += displayDropList(drawer, drawer_list, ml(t__Select_A_Drawer));
	updateFrm += "					</td>\n";
	updateFrm += "				</tr>\n";

	updateFrm += "				<tr>\n";
	updateFrm += "					<td class=\"infotextheading\" width=\"150\">\n";
	updateFrm += ml(t__Carrier)+":\n";
	updateFrm += "					</td>\n";
	updateFrm += "					<td class=\"infotext\">\n";
	updateFrm += "										" + carrier + " - " + carrierNm;
	updateFrm += "					</td>\n";
	updateFrm += "				</tr>\n";


	updateFrm += "				<tr>\n";
	updateFrm += "					<td class=\"infotextheading\" width=\"150\">\n";
	updateFrm += ml(t__Equipment_Code)+":\n";
	updateFrm += "					</td>\n";
	updateFrm += "					<td class=\"infotext\">\n";
	updateFrm += "						" + tanker+"["+load_spec_compt_tab[i][0] +"]\n";
	updateFrm += "					</td>\n";
	updateFrm += "				</tr>\n";
	updateFrm += "				<tr>\n";
	updateFrm += "					<td class=\"infotextheading\" width=\"150\">\n";
	updateFrm += ml(t__Compartment_No)+":\n";
	updateFrm += "					</td>\n";
	updateFrm += "					<td class=\"infotext\">\n";
	// display trailer cmpt
	updateFrm += "						" + load_spec_compt_tab[i][11] + "["+ load_spec_compt_tab[i][1] +"]\n";
	updateFrm += "					</td>\n";
	updateFrm += "				</tr>\n";
	updateFrm += "			</table>\n";
	updateFrm += "		  </div>\n";
	updateFrm += "		</td>\n";
	updateFrm += "	</tr>\n";


	updateFrm += "	<tr><td>&nbsp;</td></tr>\n";

	updateFrm += "	<form name=\"updateFrm\" method=\"get\" id=\"updateFrm\" onsubmit=\"return submitUpdateFrm(this)\">\n";
	updateFrm += fieldst_HTML(ml(t__Load_Spec_Details));
	updateFrm +="<div class=\"adminform\">\n";
	updateFrm += "							<table width=\"100%\">\n";
	updateFrm += "								<tr>\n";
	updateFrm += "									<td class=\"infotext\" width=\"100%\">\n";
	updateFrm += ml(t__All_the_fields_labelled_with_an)+" (<span style=\"COLOR: #FF0000;\">*</span>) "+ml(t__are_mandatory)+"\n";
	updateFrm += "									</td>\n";
	updateFrm += "								</tr>\n";
	updateFrm += "								<tr>\n";
	updateFrm += "									<td width=\"100%\">\n";
	updateFrm += "										<table width=\"100%\">\n";
	updateFrm += "											\n";
	updateFrm += "											<tr>\n";
	updateFrm += "												<td width=\"50%\">\n";
	updateFrm += "													<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"70\">\n";
	updateFrm += ml(t__Product)+":\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "																	<span class=\"mandatory\">*</span>\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td>\n";
	
	if ( prod == "")
	{
		prod == "-1";
	}
	if ( load_spec_compt_tab[i][15] == "")
	{
		load_spec_compt_tab[i][15] = "-1";
	}

    updateFrm += "																<select NAME=\"prod\" id=\"prod\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_A_Product)+"\" "+modfield+" onChange=\"refreshModForm(this.value,"+load_spec_compt_tab[i][15]+");\" >\n";

	if ( modfield == "disabled" ) {
		updateFrm += displayDropList(load_spec_compt_tab[i][2], prod_jslst, ml(t__Select_A_Product));
	} else {
		updateFrm += displayDropList(prod, prod_jslst, ml(t__Select_A_Product));
	}

	updateFrm += "															</td>\n";
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "												</td>\n";
	updateFrm += "												<td width=\"50%\">\n";
	updateFrm += "													<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"70\">\n";
	updateFrm += ml(t__Unit)+":\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "																<span class=\"mandatory\">*</span>\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td>\n";
	//doing this to fix unit selection again and again
	//in future if Mass loading then the default selection will change
	if(load_spec_compt_tab[i][4]=="")//means no unit selected
	{
		if((unit_type=="STD_LITRE") && (unit=="-1") )
		{
			var unit_selected="11";
		}
        else if ((unit_type=="STD_LITRE") && (unit!="-1") )
        {
            var unit_selected=unit;
        }
		else
		{
			var unit_selected="5";
		}
		
	}
	else
	{
		var unit_selected = load_spec_compt_tab[i][4];
	}
	updateFrm += "<select NAME=\"unit\" id=\"unit\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_An_Unit)+"\" "+modfield+" >\n";
	updateFrm += displayDropList(unit_selected, unit_jslst, ml(t__Select_An_Unit));
	updateFrm += "															</td>\n";
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "												</td>\n";
	updateFrm += "											</tr>\n";
	updateFrm += "											<tr>\n";
	updateFrm += "											 	<td width=\"50%\">\n";
	updateFrm += "											   		<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"70\">\n";
	updateFrm += ml(t__Schedule_Qty)+":\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "																<span class=\"mandatory\">*</span>\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td>\n";


	if (load_spec_compt_tab[i][6] == 0) {
		this_qty = ""; // show it empty
	} else {
		this_qty = load_spec_compt_tab[i][6];
	}

	if ( modfield == "disabled" ) 
	{
		updateFrm += "<input type=\"text\" name=\"sched\" id=\"sched\" size=\"9\" dataType=\"RangeInt\" msg=\""+ml(t__Enter_Schedule_Quantity)+""+this_qty+"\" min="+this_qty+" max=999999 value=\""+this_qty+"\" "+isReadOnly+"/>\n";

	}
	else
	{
		updateFrm += "<input type=\"text\" name=\"sched\" id=\"sched\" size=\"9\" dataType=\"RangeInt\" msg=\""+ml(t__Enter_Schedule_Quantity_between)+""+load_spec_compt_tab[i][12]+"\" min=0 max="+load_spec_compt_tab[i][12]+" value=\""+this_qty+"\" "+isReadOnly+" /><font class=\"infotextheading\"> &nbsp; [0 - "+load_spec_compt_tab[i][12]+"]<\/font>\n";
	}


//	updateFrm += displayLoadOrderDetails(load_spec_compt_tab[i][11]);

	updateFrm += "															</td>\n";
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "											 	</td>\n";

	updateFrm += "											 	<td width=\"50%\">\n";
	updateFrm += "											   		<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"70\">\n";
	updateFrm += ml(t__Customer_Order)+":\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "																<span class=\"mandatory\"></span>\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td>\n";

//	updateFrm += makespace("\t", 16) + "<input type=\"hidden\" name=\"order_prev\" id=\"order_prev\" value=\"" + load_spec_compt_tab[i][10] + "\" />" + load_spec_compt_tab[i][10] + "\n";

	
	updateFrm += "<select NAME=\"order\" id=\"order\" class=\"smallselect\" "+modfield+" >\n";

//Fix for bugzilla 2153: M order to 1 cmpt
	for(aId in order_list_tab)
	{
		is_order_remained = 0;
		for(j in order_jslst)
		{
			if ( order_list_tab[aId][0] == order_jslst[j][0] )
			{
				is_order_remained = 1;
				break;
			}
		}
		if ( is_order_remained == 0 && ( prod == load_spec_compt_tab[i][2]) )
		{
			arr_len = order_jslst.length;
			order_jslst[arr_len] = new Array();
			order_jslst[arr_len][0] = order_list_tab[aId][0];
			order_jslst[arr_len][1] = order_list_tab[aId][1];
			order_jslst[arr_len][2] = order_list_tab[aId][0];
			order_jslst[arr_len][3] = order_list_tab[aId][4] + ":" +  "{"+ml(t__Order_no_has_no_qty)+"}";
		}
	}

/*
	if (load_spec_compt_tab[i][10] > 0)
	{
		is_order_remained = 1;
		for(aId in order_jslst)
		{
			if ( order_jslst[aId][0] == load_spec_compt_tab[i][10] )
			{
				is_order_remained = 0;
				break;
			}
		}
		if ( is_order_remained > 0 )
		{
			if (prod == load_spec_compt_tab[cmptID][2])
			{
				arr_len = order_jslst.length;
				order_jslst[arr_len] = new Array();
				order_jslst[arr_len][0] = load_spec_compt_tab[i][10];
				order_jslst[arr_len][1] = "";
				order_jslst[arr_len][2] = load_spec_compt_tab[i][10];
				for(j in load_spec_compt_order_tab )
				{
					if ( load_spec_compt_order_tab [j][1] == load_spec_compt_tab[i][10] )
					{
						order_jslst[arr_len][3] = load_spec_compt_order_tab [j][2];
						break;
					}
				}


//			load_spec_compt_tab[i][13]; //bugzilla 2104
			}
		}		
	}
*/

	updateFrm += orderNumberRefDropList(load_spec_compt_tab[i][10], order_jslst, ml(t__Select_An_Order));

	updateFrm += "															</td>\n";
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "											 	</td>\n";
	updateFrm += "											</tr>\n";
	
	//Abdul adding a last row here to display the Bay Arm list
	//start of the Last Row here
	updateFrm +="			<tr>\n";
	updateFrm +="			<td width=\"50%\">\n";

	updateFrm +="				<table>\n";
	updateFrm +="				<tr>\n";
	updateFrm +=textTd_HTML(" class=\"infotextheadingtd\" width=\"70\" ",ml(t__Bay_Arm)+" :");

//	updateFrm +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "&nbsp;\n");
	// bayarmAllocOption is saved in table SITE. This variable is basically defined for ERP in process, but it is better to make the front-end scheduling conform to this rul as well
	if ( bayarmAllocOption <= 1 || bayarmAllocOption == 4 || bayarmAllocOption == 5 )
	{
		updateFrm +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "&nbsp;\n");
	}
	else
	if ( bayarmAllocOption == 2 || bayarmAllocOption == 3 || bayarmAllocOption == 6 )
	{
		updateFrm +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "<span class=\"mandatory\">*</span>\n");
	}
	else
	{
		updateFrm +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "&nbsp;\n");
	}

	updateFrm +="				<td>\n";
	
	if(load_spec_compt_tab[i][18]!=" - ")
	{
		//Bay Arm Code structure is H061 - A00501 is 
		//but for the meters drop list I need everything after "-"
		var myAssignedBayArm = load_spec_compt_tab[i][18].substring((load_spec_compt_tab[i][18].indexOf("-")+2), load_spec_compt_tab[i][18].length);
	}
	
	if(is_mod_anything == false)
	{		
		//means I do not want arm code to be selectable
		updateFrm += "  <select id=\"bay_armCd\" name=\"bay_armCd\" class=\"smallselect\" "+modfield+" msg=\""+(ml(t__Select)+" "+ml(t__Bay_Arm))+"\" "+"\/> \n";
		updateFrm += displayDropList_any_All(myAssignedBayArm, meter_jslst,(ml(t__Select)+" "+ml(t__Bay_Arm)), 'A');
		updateFrm += "	<input type=\"hidden\" name=\"bay_armCd\" id=\"bay_armCd\" value=\""+load_spec_compt_tab[i][18]+"\" />\n";
	}
	else
	{
		// bayarmAllocOption is saved in table SITE. This variable is basically defined for ERP in process, but it is better to make the front-end scheduling conform to this rul as well
		if ( bayarmAllocOption <= 1 || bayarmAllocOption == 4 || bayarmAllocOption == 5 )
		{
			updateFrm += "  <select id=\"bay_armCd\" name=\"bay_armCd\" class=\"smallselect\" msg=\""+(ml(t__Select)+" "+ml(t__Bay_Arm))+"\" "+"\/> \n";
		}
		else
		if ( bayarmAllocOption == 2 || bayarmAllocOption == 3 || bayarmAllocOption == 6 )
		{
			updateFrm += "  <select id=\"bay_armCd\" name=\"bay_armCd\" class=\"smallselect\" dataType=\"String\" msg=\""+(ml(t__Select)+" "+ml(t__Bay_Arm))+"\" "+"\/> \n";
		}
		else
		{
			updateFrm += "  <select id=\"bay_armCd\" name=\"bay_armCd\" class=\"smallselect\" msg=\""+(ml(t__Select)+" "+ml(t__Bay_Arm))+"\" "+"\/> \n";
		}
		updateFrm += displayDropList_any_All(myAssignedBayArm, meter_jslst,(ml(t__Select)+" "+ml(t__Bay_Arm)), 'A');
	}
	
	updateFrm +="				<\/td>\n";
	updateFrm +="				<\/tr>\n";
	updateFrm +="				<\/table>\n";

	updateFrm +="			</td>\n";
	updateFrm +="			<td width=\"50%\">\n";

	updateFrm +="			&nbsp;\n";

	updateFrm +="			</td>\n";

	updateFrm +="			</tr>\n";
	
	//End of the Last Row here
	
	updateFrm += "										</table>\n";
	updateFrm += "									</td>\n";
	updateFrm += "								</tr>\n";
	updateFrm += "								<tr>\n";
	updateFrm += "									<td align=\"center\">\n";
	updateFrm += "										<table>\n";
	updateFrm += "											<tr>\n";
	updateFrm += "												<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	updateFrm += "													<input type=\"hidden\" name=\"tankTerm\" id=\"tankeTerm\" value=\""+tankTerm+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"supp\" id=\"supp\" value=\""+supp+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"tripNo\" id=\"tripNo\" value=\""+tripNo+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+tanker+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"drawer\" id=\"drawer\" value=\""+drawer+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"cmptID\" id=\"cmptID\" value=\""+load_spec_compt_tab[i][11]+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"tlrcmpt\" id=\"tlrcmpt\" value=\""+load_spec_compt_tab[i][1]+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"op\" id=\"op\" value=\"17\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"cmd\" id=\"cmd\" value=\"MOD\" />\n";


	if ( modfield == "disabled" ) {
		updateFrm += "												<input type=\"hidden\" name=\"prod\" id=\"prod\" value=\""+load_spec_compt_tab[i][2]+"\" />\n";
		updateFrm += "												<input type=\"hidden\" name=\"unit\" id=\"unit\" value=\""+load_spec_compt_tab[i][4]+"\" />\n";
		updateFrm += "												<input type=\"hidden\" name=\"order\" id=\"order\" value=\""+load_spec_compt_tab[i][10]+"\" />\n";		
		
	}


	updateFrm += "													<input type=\"submit\" value=\""+ml(t__Modify)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	updateFrm += "												</td>\n";
	updateFrm += "												<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	updateFrm += "													<input type=\"reset\" value =\""+ml(t__Reset)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	updateFrm += "												</td>\n";
	updateFrm += "											</tr>\n";
	updateFrm += "										</table>\n";
	updateFrm += "									</td>\n";
	updateFrm += "								</tr>\n";
	updateFrm += "							</table>\n";
	updateFrm += fieldstFoot_HTML();
	updateFrm += "	</form>\n";

	updateFrm += comptOrderPage();

	return updateFrm;
	
} //End update Form


function displayInfo(chgDrw)
{


	var infoPage ="";
	infoPage += fieldst_HTML(ml(t__Trip_Details));
	infoPage += "       	<form name=\"infoPage\" id=\"infoPage\">\n";
	infoPage +="<div class=\"adminform\">\n";
	infoPage += "             <table width=\"100%\">\n";
	infoPage += "                	<tr>\n";
	infoPage += "						<td width=\"50%\">\n";
	infoPage += "							<table>\n";
	infoPage += "								<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Supplier)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + supp+ " - " + suppNm;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Drawer)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td>\n";

	if (chgDrw == true) {
		infoPage += "                       				<select name=\"drawer\" id=\"drawer\" class=\"smallselect\" onchange=\"submitDrawer("+state+");\"> \n";
		infoPage += displayDropList(drawer, drawer_list, ml(t__Select_A_Drawer));
	} else {
		infoPage += "                       				<select name=\"drawer\" id=\"drawer\" class=\"smallselect\" onchange=\"submitDrawer("+state+");\" disabled > \n";
		infoPage += displayDropList(drawer, drawer_list, ml(t__Select_A_Drawer));
		infoPage +=   "							            <input type=\"hidden\" name=\"drawer\" value=\""+drawer+"\">\n";
	}

	infoPage += "                     			</td>\n";
	infoPage += "                 			</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Carrier)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + carrier + " - " + carrierNm;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	//infoPage += "                       				Equiptment 1"+":\n";
	infoPage += ml(t__Equiptment_1)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + eqpt;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Profile)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + profile;		
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "							</table>\n";
	infoPage += "						</td>\n";
	infoPage += "						<td width=\"50%\">\n";
	infoPage += "							<table>\n";
	infoPage += "								<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Trip_Shift)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + tripShift;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Delivery_Date)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + delvDate;
	infoPage += "                     			</td>\n";
	infoPage += "                 			</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Load_Status)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + loadStatus;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Tanker_Type)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + tankerType;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Terminal)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + tankTerm + " - " + tankTermNm;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "							</table>\n";
	infoPage += "						</td>\n";
	infoPage += "                	</tr>\n";
	infoPage += "					<tr>\n";
	infoPage += "						<td>\n";
	infoPage += "							<input type=\"hidden\" name=\"supp\" value=\""+supp+"\">\n";
	infoPage += "							<input type=\"hidden\" name=\"carrier\" value=\""+carrier+"\">\n";
	infoPage += "							<input type=\"hidden\" name=\"tripNo\" value=\""+tripNo+"\">\n";
	infoPage += "							<input type=\"hidden\" name=\"tanker\" value=\""+tanker+"\">\n";
	infoPage += "							<input type=\"hidden\" name=\"tankTerm\" value=\""+tankTerm+"\">\n";
	infoPage += "							<input type=\"hidden\" name=\"op\" value=\"10\">\n";
	infoPage += "						</td>\n";
	infoPage += "					</tr>\n";
	infoPage += "         	</table>\n";
	infoPage +="<\/div>\n";
	infoPage += "        	</form>\n";
	infoPage += fieldstFoot_HTML();
	return infoPage;  	

}


function assignOrder()
{
	var i = 1;

	var assignFrm = "";
	assignFrm += "	<tr>\n";
	assignFrm += "		<td align=\"center\">\n";
	assignFrm += "			<div class=\"button\"><a href=\"load_spec_compt.cgi?tankTerm="+tankTerm+"&supp="+supp+"&tanker="+tanker+"&tripNo="+tripNo+"\">"+ml(t__Back_to_Load_Spec_by_Compartment_Page)+"</a></div><br>\n";
	assignFrm += "		</td>\n";
	assignFrm += "	</tr>\n";
	assignFrm += "	<form name=\"assignFrm\" method=\"get\" id=\"assignFrm\" onsubmit=\"return submitAssignOrderFrm(this)\">\n";
	assignFrm += "	<tr>\n";
	assignFrm += "		<td>\n";
	assignFrm += fieldst_HTML(ml(t__Assign_Order_Details));
	assignFrm +="<div class=\"adminform\">\n";
	assignFrm += "							<table width=\"100%\">\n";
	assignFrm += "								<tr>\n";
	assignFrm += "									<td class=\"infotext\" width=\"100%\" colspan=\"2\">\n";
	assignFrm += ml(t__All_the_fields_labelled_with_an)+" (<span style=\"COLOR: #FF0000;\">*</span>) "+ml(t__are_mandatory)+"\n";
	assignFrm += "									</td>\n";
	assignFrm += "								</tr>\n";
	assignFrm += "								<tr>\n";
	assignFrm += "									<td width=\"40%\">\n";

//start of product list for order assignment
	assignFrm += "													<table>\n";
	assignFrm += "														<tr>\n";
	assignFrm += "															<td class=\"infotextheadingtd\" width=\"70\">\n";
	assignFrm += ml(t__Product)+":\n";
	assignFrm += "															</td>\n";
	assignFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
	assignFrm += "																	<span class=\"mandatory\">*</span>\n";
	assignFrm += "															</td>\n";
	assignFrm += "															<td>\n";
	
    assignFrm += "																<select NAME=\"prod\" id=\"prod\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_A_Product)+"\" "+" onChange=\"refreshAssignForm();\" >\n";

	assignFrm += displayDropList(prod, prod_jslst, ml(t__Select_A_Product));

	assignFrm += "															</td>\n";
	assignFrm += "														</tr>\n";
	assignFrm += "													</table>\n";

//end of product list for order assignment

	assignFrm += "									</td>\n";
	assignFrm += "									<td width=\"60%\">\n";

	assignFrm += "										<table width=\"100%\">\n";
	assignFrm += "											<tr>\n";
	assignFrm += "												<td class=\"infotextheadingtd\" width=\"200\">\n";
	assignFrm += ml(t__Order_Delivery_Location)+":\n";
	assignFrm += "												</td>\n";
	assignFrm += "												<td width=\"5\" align=\"center class=\"infotext\">\n";
	assignFrm += "													<span class=\"mandatory\">*</span>\n";
	assignFrm += "												</td>\n";
	assignFrm += "												<td>\n";
	assignFrm += "													<select NAME=\"order\" id=\"order\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_An_Order)+"\">\n";
	//assignFrm += orderNumberRefDelvDropList(load_spec_compt_tab[i][10], order_jslst, ml(t__Select_An_Order));
	assignFrm += orderNumberRefDelvDropList("", order_jslst, ml(t__Select_An_Order));
	assignFrm += "												</td>\n";
	assignFrm += "											</tr>\n";
	assignFrm += "										</table>\n";

	assignFrm += "									</td>\n";
	assignFrm += "								</tr>\n";
	
	//Abdul adding a last row here to display the Bay Arm list
	//start of the Last Row here
	assignFrm +="			<tr>\n";
	assignFrm +="			<td width=\"50%\">\n";

	assignFrm +="				<table>\n";
	assignFrm +="				<tr>\n";
	assignFrm +=textTd_HTML(" class=\"infotextheadingtd\" width=\"70\" ",ml(t__Bay_Arm)+" :");
//	assignFrm +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "&nbsp;\n");
	// bayarmAllocOption is saved in table SITE. This variable is basically defined for ERP in process, but it is better to make the front-end scheduling conform to this rul as well
	if ( bayarmAllocOption <= 1 || bayarmAllocOption == 4 || bayarmAllocOption == 5 )
	{
		assignFrm +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "&nbsp;\n");
	}
	else
	if ( bayarmAllocOption == 2 || bayarmAllocOption == 3 || bayarmAllocOption == 6 )
	{
		assignFrm +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "<span class=\"mandatory\">*</span>\n");
	}
	else
	{
		assignFrm +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "&nbsp;\n");
	}
	assignFrm +="				<td>\n";

	// bayarmAllocOption is saved in table SITE. This variable is basically defined for ERP in process, but it is better to make the front-end scheduling conform to this rul as well
	if ( bayarmAllocOption <= 1 || bayarmAllocOption == 4 || bayarmAllocOption == 5 )
	{
		assignFrm += "  <select id=\"bay_armCd\" name=\"bay_armCd\" class=\"smallselect\" msg=\""+(ml(t__Select)+" "+ml(t__Bay_Arm))+"\" "+"\/> \n";
	}
	else
	if ( bayarmAllocOption == 2 || bayarmAllocOption == 3 || bayarmAllocOption == 6 )
	{
		assignFrm += "  <select id=\"bay_armCd\" name=\"bay_armCd\" class=\"smallselect\" dataType=\"String\" msg=\""+(ml(t__Select)+" "+ml(t__Bay_Arm))+"\" "+"\/> \n";
	}
	else
	{
		assignFrm += "  <select id=\"bay_armCd\" name=\"bay_armCd\" class=\"smallselect\" msg=\""+(ml(t__Select)+" "+ml(t__Bay_Arm))+"\" "+"\/> \n";
	}
	assignFrm += displayDropList_any_All(load_spec_compt_tab[i][19], meter_jslst,(ml(t__Select)+" "+ml(t__Bay_Arm)), 'A');
	assignFrm +="				<\/td>\n";
	assignFrm +="				<\/tr>\n";
	assignFrm +="				<\/table>\n";

	assignFrm +="			</td>\n";
	assignFrm +="			<td width=\"50%\">\n";

	assignFrm +="			&nbsp;\n";

	assignFrm +="			</td>\n";

	assignFrm +="			</tr>\n";
	
	//End of the Last Row here
	
	
	assignFrm += "								<tr>\n";
	assignFrm += "									<td align=\"center\" colspan=\"2\">\n";
	assignFrm += "										<table>\n";
	assignFrm += "											<tr>\n";
	assignFrm += "												<td align=\"center\" width=\"100%\" class=\"infotext\">\n";

	assignFrm += "													<input type=\"hidden\" name=\"tankTerm\" id=\"tankeTerm\" value=\""+tankTerm+"\" />\n";
	assignFrm += "													<input type=\"hidden\" name=\"supp\" id=\"supp\" value=\""+supp+"\" />\n";
	assignFrm += "													<input type=\"hidden\" name=\"tripNo\" id=\"tripNo\" value=\""+tripNo+"\" />\n";
	assignFrm += "													<input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+tanker+"\" />\n";
	assignFrm += "													<input type=\"hidden\" name=\"cmptID\" id=\"cmptID\" value=\""+load_spec_compt_tab[i][11]+"\" />\n";
	assignFrm += "													<input type=\"hidden\" name=\"tlrcmpt\" id=\"tlrcmpt\" value=\""+load_spec_compt_tab[i][1]+"\" />\n";
	assignFrm += "													<input type=\"hidden\" name=\"op\" id=\"op\" value=\"13\" />\n";

	assignFrm += "													<input type=\"hidden\" name=\"cmd\" id=\"cmd\" value=\"ASG\" />\n";
	assignFrm += "													<input type=\"submit\" value=\""+ml(t__Assign)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	assignFrm += "												</td>\n";
	assignFrm += "											</tr>\n";
	assignFrm += "										</table>\n";
	assignFrm += "									</td>\n";
	assignFrm += "								</tr>\n";
	assignFrm += "							</table>\n";
	assignFrm += "							</div>\n";
	assignFrm += fieldstFoot_HTML();
	assignFrm += "	</form>\n";

	return assignFrm;
}

function orderPage()
{
	var orderPage = "";
	orderPage += orderButton();
	orderPage += displayInfo(false);
	orderPage += orderInfo();
	orderPage += "	<tr>\n";
	orderPage += "		<td>\n";
	orderPage +=  table_begin("M", 1,"");
	orderPage += "			<tbody> \n";
	orderPage += "				<tr>\n";

	for(var i=0; i<myOrder.length; i++)
	{
		orderPage += "				<td>"+myOrder[i]+"<\/td>\n";
	}
	orderPage += "				<\/tr>\n";


	for(i in order_list_tab)
	{
		orderPage += "<tr class=\"row1\">\n";
		if(i>0) 
		{

			for(var j=0; j<myOrder.length; j++)
			{

				orderPage += "<td>\n";				  
				if(j==0) // means time to display the drop list and table
				{
					orderPage +="   <form name=\"orderFrm_"+order_list_tab[i][j]+"\" id=\"orderFrm\" method=\"get\">\n";
					orderPage +="       <table border=\"0\">\n";
					orderPage +="	       <tr>\n";
					orderPage +="                 <td width=\"100\"> <span style=\"COLOR: #FF0000;\">"+obs(order_list_tab[i][0])+"</span>\n";
					orderPage +="                     <input type=\"hidden\" name=\"orderCustOrdNo\" id=\"orderCustOrdNo\" value=\""+obs(order_list_tab[i][0])+"\">\n";
					orderPage +="                     <input type=\"hidden\" name=\"order\" id=\"order\" value=\""+obs(order_list_tab[i][3])+"\">\n";
					orderPage +="                     <input type=\"hidden\" name=\"tankTerm\" id=\"tankTerm\" value=\""+tankTerm+"\">\n";
					orderPage +="                     <input type=\"hidden\" name=\"supp\" id=\"supp\" value=\""+supp+"\">\n";
					orderPage +="                     <input type=\"hidden\" name=\"carrier\" id=\"carrier\" value=\""+carrier+"\">\n";
					orderPage +="                     <input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+tanker+"\">\n";
					orderPage +="                     <input type=\"hidden\" name=\"tripNo\" id=\"tripNo\" value=\""+tripNo+"\">\n";
					orderPage +="                     <input type=\"hidden\" name=\"cmptID\" id=\"cmptID\" value=\""+cmptID+"\">\n";
					orderPage +="                 </td>\n";
					orderPage +="                 <td>\n";

					if ( state < 4 ) {
						orderPage += op_list2();
					}

					orderPage +="                 </td>\n";
					orderPage +="	       </tr>\n";
					orderPage +="	  	</table>\n";
					orderPage +="   </form>\n";
				}
				else if(j == 3) //Customer Order Reference Code
				{
//					orderPage += obs( getCustOrderRefCode( order_list_tab[i][0], order_jslst ) );
					orderPage += obs( order_list_tab[i][4] );
				}
				else
				{
					orderPage += obs(order_list_tab[i][j]);
				}

				orderPage += "<\/td>\n";

			}

		} // end if to check rows

		orderPage += "\n";
		orderPage += "</tr>\n";

	}//end loop on load sched
	orderPage += "<\/tbody>";
	orderPage += "<\/table>";

	orderPage += "		</td>\n";
	orderPage += "	</tr>\n";  


	return orderPage;
}


function orderForm()
{
	var i = 0;
	var c = 0;
	var button ="";
	var selectOrder="";
	var cmd = "";
	var mod_order_jslst;
	var total_ord_qty=0;
	var curr_ord_qty=0;
	var avail_ord_qty=0;

	// find the index for current order
	for( i in order_list_tab  )
	{
		if ( order_list_tab [i][3] == order )
		{
			curr_ord_qty = order_list_tab [i][2];
			break;
		}
	}
	// find the index for current compartment
	for( c in load_spec_compt_tab  )
	{
		if ( load_spec_compt_tab [c][11] == cmptID )
		{
			total_ord_qty = load_spec_compt_tab [c][6];
			break;
		}
	}

	mod_order_jslst = new Array();
	mod_order_jslst[0] = ["","","",""];
	mod_order_jslst[1] = [ order_list_tab [i][0], order_list_tab [i][1], order_list_tab [i][0], order_list_tab [i][4] ];


	if (op == 47)
	{
		cmd = "MOD";
		button = ml(t__Modify);
		selectOrder = "disabled";
		avail_ord_qty = parseInt(load_spec_compt_tab [c][12]) - parseInt(total_ord_qty) + parseInt(curr_ord_qty);
	}
	else if (op == 48)
	{
		cmd = "ADD";
		button = ml(t__Add);
		selectOrder = "dataType=\"Require\" msg=\""+ml(t__Select_An_Order)+"\"";
		avail_ord_qty = parseInt(load_spec_compt_tab [c][12]) - parseInt(total_ord_qty);
	}

	op += 10;

	var orderFrm = "";
	orderFrm += "	<tr>\n";
	orderFrm += "		<td align=\"center\">\n";
	orderFrm += "			<div class=\"button\"><a href=\"load_spec_compt.cgi?tankTerm="+tankTerm+"&supp="+supp+"&tanker="+tanker+"&tripNo="+tripNo+"&cmptID="+cmptID+"&op=40\">"+ml(t__Back_to_Order_Spec_by_Compartment)+"</a></div><br>\n";
	orderFrm += "		</td>\n";
	orderFrm += "	</tr>\n";
	orderFrm += orderInfo();
	orderFrm += "	<form name=\"orderFrm\" method=\"get\" id=\"orderFrm\" onsubmit=\"return submitmyform(this)\">\n";
	orderFrm += fieldst_HTML(ml(t__order_spec_details));
	orderFrm +="<div class=\"adminform\">\n";
	orderFrm += "					<table width=\"100%\">\n";
	orderFrm += "						<tr>\n";
	orderFrm += "							<td class=\"infotext\" width=\"100%\">\n";
	orderFrm += ml(t__All_the_fields_labelled_with_an)+" (<span style=\"COLOR: #FF0000;\">*</span>) "+"are mandatory\n";
	orderFrm += "							</td>\n";
	orderFrm += "						</tr>\n";
	orderFrm += "						<tr>\n";
	orderFrm += "							<td>\n";
	orderFrm += "								<table>\n";
	orderFrm += "									<tr>\n";
	orderFrm += "										<td class=\"infotextheadingtd\" width=\"200\">\n";
	orderFrm += ml(t__Order_Delivery_Location)+":\n";
	orderFrm += "										</td>\n";
	orderFrm += "										<td width=\"5\" align=\"center class=\"infotext\">\n";
	orderFrm += "											<span class=\"mandatory\">*</span>\n";
	orderFrm += "										</td>\n";
	orderFrm += "										<td>\n";
	orderFrm += "											<select NAME=\"order\" id=\"order\" class=\"smallselect\" "+selectOrder+">\n";

	if (cmd == "MOD") {
//		orderFrm += orderNumberRefDelvDropList(order_list_tab[i][0], order_jslst, ml(t__Select_An_Order));  
		orderFrm += orderNumberRefDelvDropList(order_list_tab[i][0], mod_order_jslst, ml(t__Select_An_Order));  
	//	orderFrm += " 									<input type=\"hidden\" name=\"order\" id=\"order\" value=\"" + order + "\" />\n";
	} else {
		orderFrm += orderNumberRefDelvDropList(order_list_tab[i][0], order_jslst, ml(t__Select_An_Order));  
	}

	orderFrm += "										</td>\n";
	orderFrm += "									</tr>\n";
	orderFrm += "									<tr>\n";
	orderFrm += "										<td class=\"infotextheadingtd\" width=\"200\">\n";
//	orderFrm += ml(t__Quantity)+i+":\n";
	orderFrm += ml(t__Quantity)+":\n";
	orderFrm += "										</td>\n";
	orderFrm += "										<td width=\"5\" align=\"center class=\"infotext\">\n";
	orderFrm += "											<span class=\"mandatory\">*</span>\n";
	orderFrm += "										</td>\n";
	orderFrm += "										<td>\n";

	orderFrm += "											<input type=\"text\" name=\"sched\" id=\"sched\" size=\"20\" dataType=\"Range\" msg=\""+ml(t__Enter_Quantity_between)+""+ avail_ord_qty +" \" min=0 max="+ avail_ord_qty +" value=\""+order_list_tab[i][2]+"\" />\n";

	orderFrm += "<font class=\"infotextheading\"> &nbsp; [0 - "+avail_ord_qty+"]<\/font>\n";

	orderFrm += "										</td>\n";
	orderFrm += "									</tr>\n";
	orderFrm += "								</table>\n";
	orderFrm += "							</td>\n";
	orderFrm += "						</tr>\n";
	orderFrm += "						<tr>\n";
	orderFrm += "							<td align=\"center\">\n";
	orderFrm += "								<table>\n";
	orderFrm += "									<tr>\n";
	orderFrm += "										<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	orderFrm += "										\n";
	orderFrm += "											<input type=\"hidden\" name=\"tankTerm\" id=\"tankTerm\" value=\"" + tankTerm + "\" />\n";
	orderFrm += "											<input type=\"hidden\" name=\"supp\" id=\"supp\" value=\"" + supp + "\" />\n";
	orderFrm += "											<input type=\"hidden\" name=\"tripNo\" id=\"tripNo\" value=\"" + tripNo + "\" />\n";
	orderFrm += "											<input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\"" + tanker + "\" />\n";
	orderFrm += "											<input type=\"hidden\" name=\"cmptID\" id=\"cmptID\" value=\"" + cmptID + "\" />\n";
	orderFrm += "											<input type=\"hidden\" name=\"tlrcmpt\" id=\"tlrcmpt\" value=\""+load_spec_compt_tab[c][1]+"\" />\n";
	orderFrm += "											<input type=\"hidden\" name=\"prod\" id=\"prod\" value=\"" + load_spec_compt_tab[c][2] + "\" />\n";
	orderFrm += "											<input type=\"hidden\" name=\"order\" id=\"order_val\" value=\"" + order_list_tab[i][0] + "\" />\n";

	orderFrm += "											<input type=\"hidden\" name=\"cmd\" id=\"cmd\" value=\"" + cmd + "\" />\n";
	orderFrm += "											<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + op + "\" />\n";
	orderFrm += "											<input type=\"submit\" value=\"" + button + "\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	orderFrm += "										</td>\n";
	orderFrm += "										<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	orderFrm += "											<input type=\"reset\" value =\""+ml(t__Reset)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	orderFrm += "										</td>\n";
	orderFrm += "									</tr>\n";
	orderFrm += "								</table>\n";
	orderFrm += "							</td>\n";
	orderFrm += "						</tr>\n";
	orderFrm += "					</table>\n";
	orderFrm += "                    </div>\n";
	orderFrm += "                    </form>\n";                      
	orderFrm += fieldstFoot_HTML(); 	

	return orderFrm;
} //End order Form


function orderInfo()
{
	var orderInfo ="";
	var i=0;

	for( i in load_spec_compt_tab )
	{
		if ( load_spec_compt_tab[i][11] == cmptID )
		{
			break;
		}
	}

	orderInfo += " <tr>\n";
	orderInfo += " 	<td align=\"left\">\n";
	orderInfo += "    <div id=\"helparea\">\n";
	orderInfo += "    	<table width=\"100%\">\n";
	orderInfo += "        	<tr>\n";
	orderInfo += "				<td width=\"50%\">\n";
	orderInfo += "					<table>\n";
	orderInfo += "						<tr>\n";
	orderInfo += "                   			<td class=\"infotextheading\">\n";
	orderInfo += ml(t__Tanker)+":\n";
	orderInfo += "                   			</td>\n";
	orderInfo += "                   			<td class=\"infotext\">\n";
	orderInfo += "								" + tanker;
	orderInfo += "                   			</td>\n";
	orderInfo += "                		</tr>\n";
	orderInfo += "                		<tr>\n";
	orderInfo += "                   			<td class=\"infotextheading\">\n";
	orderInfo += ml(t__Product)+":\n";
	orderInfo += "                   			</td>\n";
	orderInfo += "                   			<td class=\"infotext\">\n";
	orderInfo += "								"+load_spec_compt_tab[i][3];
	orderInfo += "                     		</td>\n";
	orderInfo += "                 		</tr>\n";
	orderInfo += "					</table>\n";
	orderInfo += "				</td>\n";
	orderInfo += "				<td width=\"50%\">\n";
	orderInfo += "					<table>\n";
	orderInfo += "						<tr>\n";
	orderInfo += "                   			<td class=\"infotextheading\">\n";
	orderInfo += ml(t__Compartment)+":\n";
	orderInfo += "                   			</td>\n";
	orderInfo += "                   			<td class=\"infotext\">\n";
	orderInfo += "								" + cmptID +"["+ load_spec_compt_tab[i][1] +"]";
	orderInfo += "                   			</td>\n";
	orderInfo += "                		</tr>\n";
	orderInfo += "                		<tr>\n";
	orderInfo += "                   			<td class=\"infotextheading\">\n";
	orderInfo += ml(t__Schedule_Qty)+":\n";
	orderInfo += "                   			</td>\n";
	orderInfo += "                   			<td class=\"infotext\">\n";
	orderInfo += "								" + load_spec_compt_tab[i][6] + " " + load_spec_compt_tab[i][5] ;
	orderInfo += "                     		</td>\n";
	orderInfo += "                 		</tr>\n";
	orderInfo += "					</table>\n";
	orderInfo += "				</td>\n";
	orderInfo += "        	</tr>\n";
	orderInfo += "    	</table>\n";
	orderInfo += " 	  </div>\n";
	orderInfo += " 	</td>\n";
	orderInfo += " </tr>\n";

	orderInfo += " <tr><td>&nbsp;</td></tr>\n";

	return orderInfo;  	

}



function nextPage()
{
	var next = "";
	next += "<tr>\n";
	next +=	"	<td align=\"center\">\n";

	if(pg < 1)
	{
		pg = 1;	
	}

	if (pg > 1){
		next += "<a href=\"javascript:document.glblFrm.pg.value=pg-1;document.glblFrm.op.value=0;document.glblFrm.submit();\">Previous</a>\n";
	}
	next += "&nbsp; Current=" + pg;
	next += "/";
	next += pagesTotal;
	if (pagesTotal > pg)
	{
		next += "&nbsp; <a href=\"javascript:document.glblFrm.pg.value=pg+1;document.glblFrm.op.value=0;document.glblFrm.submit();\">Next</a>\n";
	}

	next += "	</td>\n";
	next += "</tr>\n";

	if(pagesTotal == 0)
	{
		next = "";
	}

	return next;   
}


/*This function is added to fix the bugzilla 2059*/
function checkCmptQtys()
{
	var i;

	for(i in load_spec_compt_tab)
	{
		if (i > 0)
		{
			if ( load_spec_compt_tab[i][2] == "" && load_spec_compt_tab[i][6] == "" )
			{
				return true;
			}
		}
	}

    alert(ml(t__Order_Assignment_Alert));
	return false;
}



function addButton(curViewDetailState)
{
	var button = "";
	button += "<tr>\n";
	button += "	<td align=\"center\">\n";
	button += " 	<form name=\"glblFrm\" id=\"glblFrm\">\n";
	button += "			<input type=\"hidden\" name=\"tankTerm\" value=\""+tankTerm+"\" />\n";
	button += "			<input type=\"hidden\" name=\"supp\" value=\""+supp+"\" />\n";
	button += "			<input type=\"hidden\" name=\"tripNo\" value=\""+tripNo+"\" />\n";
	button += "			<input type=\"hidden\" name=\"tanker\" value=\""+tanker+"\" />\n";
	button += "			<input type=\"hidden\" name=\"op\" value=0 />\n";
	button += "			<input type=\"hidden\" name=\"pg\" value=1 />\n";
	button += "			<input type=\"hidden\" name=\"days\" value=\""+days+"\" />\n";
	button += "			<input type=\"hidden\" name=\"startDate\" value=\""+startDate+"\" />\n";
	button += "			<input type=\"hidden\" name=\"endDate\" value=\""+endDate+"\" />\n";
	button += "			<input type=\"hidden\" name=\"sched_stat\" value=\""+sched_stat+"\" />\n";
	button += "		</form>\n";
	button += "		<div class=\"button\">\n";
	button += "			<a href=\"#\" onClick=\"if (checkCmptQtys()) { document.glblFrm.op.value='3';document.glblFrm.action='load_spec_compt.cgi';document.glblFrm.submit();}\">"+ml(t__ASSIGN_ORDER)+"</a>\n";
	button += "			<a href=\"#\" onClick=\"document.glblFrm.submit();\">"+ml(t__View_All)+"</a>&nbsp;\n";
	button += "			<a href=\"#\" onClick=\"document.glblFrm.tripNo.value='-1';document.glblFrm.action='load_scheds.cgi';document.glblFrm.submit();\">"+ml(t__Back_to_Load_Schedules_Page)+"</a>\n";
	button += "		</div><br>\n";
	button += " </td>\n";
	button += "</tr>\n";

	return button;
}


function orderButton()
{
	var button = "";
	button += "<tr>\n";
	button += "	<td align=\"center\">\n";
	button += " 	<form name=\"orderButtonFrm\" id=\"orderButtonFrm\">\n";
	button += "			<input type=\"hidden\" name=\"tankTerm\" value=\""+tankTerm+"\" />\n";
	button += "			<input type=\"hidden\" name=\"supp\" value=\""+supp+"\" />\n";
	button += "			<input type=\"hidden\" name=\"tanker\" value=\""+tanker+"\" />\n";
	button += "			<input type=\"hidden\" name=\"tripNo\" value=\""+tripNo+"\" />\n";
	button += "			<input type=\"hidden\" name=\"cmptID\" value=\""+cmptID+"\" />\n";
	button += "			<input type=\"hidden\" name=\"carrier\" value=\""+carrier+"\" />\n";
	button += "			<input type=\"hidden\" name=\"op\" value=\"2\" />\n";
	button += "		</form>\n";
	button += "		<div class=\"button\">\n";
    
    if ( state < 4 )
	button += "			<a href=\"#\" onClick=\"document.orderButtonFrm.op.value=48; document.orderButtonFrm.submit();\">"+ml(t__Add_New_Order_Spec)+"</a>&nbsp;\n";
	button += "			<a href=\"#\" onClick=\"document.orderButtonFrm.cmptID.value=-1;document.orderButtonFrm.submit();\">"+ml(t__Back_to_Load_Spec_By_Compartment)+"</a>\n";
	button += "		</div><br>\n";
	button += " </td>\n";
	button += "</tr>\n";

	return button;
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

function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;
	if (op <= 2 || (op > 10 && op < 40))
	{
		pageHeading +=ml(t__LOAD_SPEC_BY_COMPARTMENT);
	}
	else if(op == 7)
	{
		pageHeading +=ml(t__MODIFY_LOAD_SPEC_BY_COMPARTMENT);
	}
	else if(op == 3)
	{
		pageHeading +=ml(t__ASSIGN_ORDER_PRODUCTS_TO_LOAD);
	}
	else if(op == 40 || op >= 50)
	{
		pageHeading +=ml(t__ORDER_SPEC_BY_COMPARTMENT);
	}
	else if(op == 47)
	{
		pageHeading +=ml(t__MODIFY_ORDER_SPEC_BY_COMPARTMENT);
	}
	else if(op == 48)
	{
		pageHeading +=ml(t__ADD_NEW_ORDER_SPEC_BY_COMPARTMENT);
	}


	return pageHeading;   
}

function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;
	if (op <= 2 || (op > 10 && op < 40))
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Load_Spec_by_Compartment_Page);

	}
	else if (op == 7)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Update_Load_Spec_by_Compartment_Page);

	}
	else if (op == 3)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Assign_Order_Products_to_Load_Page);

	}
	else if (op == 40 || op >=50)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Order_Spec_by_Compartment_Page);

	}
	else if (op == 47)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Update_Order_Spec_by_Compartment_Page);

	}
	else if (op == 48)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Add_New_Order_Spec_by_Compartment_Page);

	}


	return pageTitle;
}


/* define function op_list() */
function op_list(priv, loaded, isProd)
{

	var op_list ="";
	op_list +="<select name=op onchange=\"sendoption(this,"+state+", '"+isProd+"');\">          ";


	switch (priv)
	{
		case 8:

		case 7:			
		case 6:
			op_list +="<option value=7>"+ml(t__MODIFY)+"</option>";
/*Abdul has taken off this option causes all sorts of problems for us*/
//			op_list +="<option value=3>"+ml(t__ASSIGN_ORDER)+"</option>";
		case 5:			
			op_list +="<option value=40>"+ml(t__ORDERS)+"</option>";

            /* Do not need to be inplemented at this stage 
			// op_list +="<option value=5>"+"5 5 SPECIAL INSTRUCTION"+"</option>";
            */

			break;
	}
	op_list +="<option value=0 selected>--\t"+ml(t__YOUR_ACTION)+"\t--</option>";
	op_list +="</select>                                        ";
	return op_list ;
}


/* define function op_list() */
function op_list2()
{
	var op_list ="";
	op_list +="<select name=op onchange=\"submit();\">          ";
	switch (priv)
	{
		case 8:

		case 7:			

		case 6:
			op_list +="<option value=47>"+ml(t__MODIFY)+"</option>";
		case 5:			
			break;
	}
	op_list +="<option value=0 selected>--\t"+ml(t__YOUR_ACTION)+"\t--</option>";
	op_list +="</select>                                        ";
	return op_list ;
}
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage, lang)
{
	newPage +="<SCRIPT src=\"/"+lang+"/js/next.js\"></SCRIPT>\n";
	newPage +="<SCRIPT src=\"/"+lang+"/js/CalendarPopup.js\"></SCRIPT>\n";
	newPage +="<SCRIPT LANGUAGE=\"JavaScript\">\n";
	newPage +="\n";
	newPage +="//Calendar Variable\n";
	newPage +="	var cal = new CalendarPopup();\n";
	newPage +="	cal.showYearNavigation();\n";
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
	newPage +="\n";
	newPage +="//foward option \n";
	newPage +="function sendoption(element, loaded, isProd)\n";
	newPage +="{\n";
	newPage +="	var value = element.options[element.selectedIndex].value;\n";
	newPage +="	var frm = element.parentNode.parentNode.parentNode.parentNode.parentNode;\n";
	newPage +="	switch(value){\n";
	newPage +="		case '0':\n";
	newPage +="			frm.reset();\n";
	newPage +="			break;\n";
	newPage +="		case '3':\n";
	newPage +="		case '7':\n";
	newPage +="			if(loaded > 3){\n";
	newPage +="				alert(\""+ml(t__Load_Spec_is_completed)+", "+ml(t__cannot_modify)+"\");\n";
	newPage +="				frm.reset();\n";
	newPage +="			}else{\n";
	newPage +="				frm.submit();\n";
	newPage +="			}\n";
	newPage +="			break;\n";
	newPage +="		case '40':\n";
	newPage +="			if(isProd == ''){\n";
	newPage +="				alert(\""+ml(t__No_data_available)+"\");\n";
	newPage +="				frm.reset();\n";
	newPage +="			}else{\n";
	newPage +="				frm.submit();\n";
	newPage +="			}\n";
	newPage +="			break;\n";
	newPage +="	}\n";
	newPage +="}\n";
	newPage +="\n";
	newPage +="function submitDrawer(loaded)\n";
	newPage +="{\n";
	newPage +="	if(loaded <= 1)\n";
	newPage +="	{\n";
	newPage +="		if(confirm(\""+ml(t__Do_you_really_want_to_modify_drawer)+"?\"))\n";
	newPage +="		{\n";
	newPage +="			document.infoPage.submit();\n";
	newPage +="		}else\n";
	newPage +="		{\n";
	newPage +="			document.infoPage.reset();\n";
	newPage +="		}\n";
	newPage +="	}else\n";
	newPage +="	{\n";
	newPage +="		alert(\""+ml(t__Load_Spec_is_NOT_new)+", "+ml(t__cannot_modify)+"\");\n";
	newPage +="			document.infoPage.reset();\n";
	newPage +="	}\n";
	newPage +="}\n";
	newPage +="function submitProfile()\n";
	newPage +="{\n";
	newPage +="	document.infoPage.op.value = 11;\n";
	newPage +="	document.infoPage.submit();\n";
	newPage +="}\n";
	newPage +="\n";  

	newPage +="function	refreshModForm(prod, preprod)\n";
	newPage +="{\n";
	newPage +="	if (preprod !=\"-1\" && prod != preprod )\n";
	newPage +="	{\n";
	newPage +="		alert(\""+ml(t__Curr_Prev_Product_Check)+"\")\n";
	newPage +="	}\n";

	newPage +="	document.updateFrm.op.value = 7;\n";
	newPage +="	document.updateFrm.submit();\n";
	newPage +="}\n";

	newPage +="function	refreshAssignForm()\n";
	newPage +="{\n";
	newPage +="	document.assignFrm.op.value = 3;\n";
	newPage +="	document.assignFrm.submit();\n";
	newPage +="}\n";

	newPage +="</script>\n";
	newPage += "</head>\n";
	newPage += "<body>\n";
	return (newPage);
}



function orderNumberRefDropList(selectedvalue, list,defMsg)
{
  var massList = "";
  var matchFound=0;
  for (i=1; i<list.length; i++){
    massList += "<option value=\""+list[i][0]+"\"";
     if(list[i][0]==selectedvalue)
     {
        matchFound=1;
        massList += "selected";
     }
	if (list[i][0] > 0)
	{
		massList +=">"+list[i][0] + " [" + list[i][3] + "]" +"</option>\n";
	}
	else
	{
		massList +=">"+list[i][0] + "</option>\n";
	}
  }
   massList += "<option value=\"\"";
  if(matchFound==0)//no matchfound
  {
   
    massList += "selected";
   
  }
   massList +=">"+defMsg+"</option>\n";
 
  massList +="</select>\n";
  return massList;

}


function orderNumberRefDelvDropList(selectedvalue, list,defMsg)
{
	var massList = "";
	var matchFound=0;
	for (i=1; i<list.length; i++)
	{
		massList += "<option value=\""+list[i][2]+"\"";
		if(list[i][2]==selectedvalue)
		{
			matchFound = 1;
			massList += "selected";
		}
		if (list[i][0] > 0)
		{
			massList +=">"+list[i][0]+ " [" + list[i][3] + "]" + " - "+ list[i][1]+"</option>\n";
		}
		else
		{
			massList +=">"+list[i][0] + "</option>\n";
		}
	}
	massList += "<option value=\"\"";
	if(matchFound==0)//no matchfound
	{
		massList += "selected";
	}
	massList +=">"+defMsg+"</option>\n";
 
	massList +="</select>\n";
	return massList;
}



function getCustOrderRefCode( order_no, order_lists )
{
	var order_ref_code = "";
	var rId;
	if (order_no > 0)
	{
		for(rId in order_lists)
		{
			if ( order_lists[rId][0] == order_no) //load_spec_compt_tab[i][10]
			{
				order_ref_code = order_lists[rId][3];
				break;
			}
		}
	}
	return order_ref_code;
}
/* submitUpdateFrm functions
  * responsible for form validatoion
  * also validates if the product selected
  * and arm selected have the matching product
  */
function submitUpdateFrm(myobject)
{

	var isFormValid = false;
	isFormValid = Validator.Validate(myobject,1);
	if(isFormValid==true)
	{
		var bayArmCdElement = getElemRefs('bay_armCd');	
		var prodElement = getElemRefs('prod');
		//only check all this validation if bay arm code and product are both not disabled
		if(bayArmCdElement.disabled==false && prodElement.disabled==false)
		{
			var myBayArmCd = document.updateFrm.bay_armCd.options[document.updateFrm.bay_armCd.selectedIndex].value;
			var myDrawerProdCd = document.updateFrm.prod.options[document.updateFrm.prod.selectedIndex].value;
			if (checkIfArmProdMatch(myBayArmCd, myDrawerProdCd)==false)
			{
				alert(ml(t__msg_prod_not_on_arm) );
				return false;
			}
		}
        //Now validating if all compartment units are same
        //if not same then user can not submit the form
        var spec_unit = document.updateFrm.unit.options[document.updateFrm.unit.selectedIndex].value;
        if (checkIfAllUnitsMatch(spec_unit)==false)
        {
            alert(ml(t__Select_All_Unit_Same) );
            return false;
        }
        //Now validating if compartment units are same
        //as the unit selected for an open order quantity if not same then user can not submit the form
        var order_selected = document.updateFrm.order.options[document.updateFrm.order.selectedIndex].value;
        var quantity_entr = document.updateFrm.sched.value;        
        if (checkIfOrdAndSchedUnitsMatch(spec_unit, order_selected, quantity_entr)==false)
        {
            alert(ml(t__Select_All_Order_Sched_Unit_Same) );
            return false;
        }
       
        var comptselected = document.updateFrm.cmptID.value;
        if (checkIfMassQtyMtachingSafefill(spec_unit, quantity_entr, comptselected)==false)
        {
            compt_safe_fill_limit = parseInt(load_spec_compt_tab[comptselected][12]) * (parseFloat(dens)/1000) ;
            
            alert(ml(t__Enter_Schedule_Quantity_between) + compt_safe_fill_limit);
            return false;
            
        }
       
	}
	return isFormValid
}
/* submitUpdateFrm functions
  * responsible for form validatoion
  * also validates if the product selected
  * and arm selected have the matching product
  */
function submitAssignOrderFrm(myobject)
{

	var isFormValid = false;
	isFormValid = Validator.Validate(myobject,1);
	if(isFormValid==true)
	{
		var myBayArmCd = document.assignFrm.bay_armCd.options[document.assignFrm.bay_armCd.selectedIndex].value;
		var myDrawerProdCd = document.assignFrm.prod.options[document.assignFrm.prod.selectedIndex].value;
		if (checkIfArmProdMatch(myBayArmCd, myDrawerProdCd)==false)
		{
			alert(ml(t__msg_prod_not_on_arm) );
			return false;
		}
	}
	return isFormValid
}
/* checkIfArmProdMatch functions 
  * if the arm selected has the matching drawer product
  * if matching arm found get the way_no
  * save to the way_no field
  */
function checkIfArmProdMatch(armCode, drawProdSelected)
{
	if (armCode=='-1' || armCode=='')// that is any all selected
	{
		return true;
	}
	for (var i=1;i<meter_arm_prod.length;i++)
	{
		//alert("Pssed to me  "+ armCode +" and drawProdSelected "+drawProdSelected );
		if ((meter_arm_prod[i][1]==armCode) && (meter_arm_prod[i][5]==drawProdSelected))
		{
			return true;
		}
	}
	
	return false;
}
/* checkIfAllUnitsMatchfunctions 
  * if the unit selected is matching with
  * units of the other compartments
  */
function checkIfAllUnitsMatch(unit_selected)
{
	if (unit_selected=='-1' || unit_selected=='')// that is any all selected
	{
		return true;
	}
	for(i in load_spec_compt_tab)
    {
        if(i>0) 
		{
            compt_units = load_spec_compt_tab[i][4];
			
            
            if (unit_selected!='' && compt_units!='' && cmptID!=load_spec_compt_tab[i][1])
            {               
                if (compt_units!=unit_selected)
                    return false;
            }
        }
    }
         
	
	return true;
}
/* checkIfOrdAndSchedUnitsMatch 
  * validates if the unit selected is matching with
  * the order product quanity units
  */
function checkIfOrdAndSchedUnitsMatch(sched_unit_selected, order_selected)
{
	if ((sched_unit_selected=='-1' || sched_unit_selected=='') 
    || (quantity=='-1' || quantity=='0' || quantity=='')
    || (order_selected=='-1' || order_selected==''))// that is when any all selected
	{
		return true;
        
	}
	if (sched_unit_selected!='' && order_selected!='')
    {
        for(i in order_jslst)
        {
            if( (i>0) && (order_jslst[i][0]==order_selected) )
    		{
                
                order_units = order_jslst[i][4];
                
                
                if (sched_unit_selected!='' && order_units!='')
                {               
                    if (sched_unit_selected!=order_units)
                        return false;
                }
       
            }
        }
        
    }
         
	
	return true;
}
/* checkIfOrdAndSchedUnitsMatch 
  * validates if the unit selected is matching with
  * the order product quanity units
  */
function checkIfMassQtyMtachingSafefill(sched_unit_selected, quantity, comptselected)
{
    if ((sched_unit_selected=='-1' || sched_unit_selected=='' || sched_unit_selected!='17') 
    || (quantity=='-1' || quantity=='0' || quantity==''))// that is any all selected
	{
		return true;
        
	}
    if (dens!='' && (!(isNaN(parseFloat(dens)))) )
    {
        //convert the kilogram per cubic metre to Specific Gravity
        //specific gravity is a ratio of the mass of a material to the mass of an equal volume of water at 4 oC. Because specific gravity is a ratio, it is a unitless quantity.
        prd_density = (parseFloat(dens)/1000);
        prd_qty = parseInt(quantity);
         //let us convert the safe fill from volume to mass.
        //alert("prd_density "+prd_density+" prd_qty "+prd_qty);
        safe_fill_limit = parseInt(load_spec_compt_tab[comptselected][12]) * prd_density;
        //alert("safe_fill_limit "+safe_fill_limit+" prd_qty "+prd_qty);
        if (prd_qty>safe_fill_limit)
        {
            return false;
        }
        
    }
    
}