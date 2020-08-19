/**********************************************************
 * $Log: unload_spec.js,v $
 * Revision 1.12  2006/11/17 04:10:51  bz
 * fix bugzilla 1985-1988 and 1906, translation of trip, compartment, tanker, and DLI
 *
 * Revision 1.11  2006/07/14 08:08:19  yjf
 * Use table_begin() to give id to every displayinfotable table
 *
 * Revision 1.10  2006/06/27 05:09:43  omega
 * Re-added to cvs
 *
 * Revision 1.8  2006/06/27 01:58:53  yjf
 * New renderPage function
 *
 * Revision 1.7  2006/03/03 05:38:23  gp
 * Fixed header to follow helparea and adminform divs.
 *
 * Revision 1.6  2006/02/23 22:09:21  gp
 * Tidy up.
 *
 * Revision 1.5  2006/02/22 00:47:50  yjf
 * add id for content div
 *
 * Revision 1.4  2006/02/09 22:31:45  yjf
 * All these files use unique version for multi-language.
 *
 * Revision 1.3  2006/01/27 01:54:43  bz
 * chinese
 *
 * Revision 1.2  2006/01/26 05:08:15  yjf
 * separate text info.
 *
 * Revision 1.1  2006/01/25 01:30:51  abs
 * New interface ready for text extraction
 *
 * Revision 1.6  2005/11/30 04:32:49  gp
 * Removed op number on options list.
 *
 * Revision 1.5  2005/11/30 04:01:41  gp
 * Changed date standard to 'YYYY-MM-DD', and change DMY to Date.
 *
 * Revision 1.4  2005/11/14 23:30:37  abs
 * Abdul Updated and made the page View only
 *
 * Revision 1.3  2005/11/14 05:20:32  abs
 * Abdul updated so unload_spec page has become view only page now
 *
 * Revision 1.2  2005/10/28 05:06:34  dr
 * .
 *
 * Revision 1.3  2005/10/17 04:31:23  gp
 * ml(t__Modify) button is working.
 *
 * Revision 1.2  2005/10/13 05:41:14  gp
 * Fisrt working version.
 *
 *
 * $Id: unload_spec.js,v 1.12 2006/11/17 04:10:51 bz Exp $ 
 *
 **********************************************************/


//This file use unique version for multi-language.
var t__Trip_Shift = ["                       				Trip/Shift","                       				提单/班次"];
var t__Equiptment_1 = ["                       				Equiptment 1","                       				1号运输设备"];
var t__All_the_fields_labelled_with_an = ["										All the fields labelled with an ","										所有标有"];
var t__are_mandatory = ["are mandatory","的表项必须填写"];
var t__Back_to_Load_Schedules_Page = ["Back to Load Schedules Page","返回发油配送管理页"];
var t__Back_to_Unload_Specification = ["Back to Unload Specification","返回回收油品说明"];
var t__Back_to_Unload_Specification_Page = ["Back to Unload Specification Page","返回回收油品说明页"];
var t__cannot_modify = ["cannot modify","不能修改"];
var t__Carrier = ["                       				Carrier","                       				承运方"];
var t__Compartment = ["                       			Compartment","                       			油仓"];
var t__Compartment = ["Compartment","油仓"];
var t__Compartment_No = ["																Compartment No","																油仓号"];
var t__Cust_Order = ["Cust Order","客户订单"];
var t__Delivery_Date = ["                       				Delivery Date","                       				配送日期"];
var t__Delivery_Location = ["Delivery Location","配送地点"];
var t__Density = ["																Density","																密度"];
var t__Density = ["Density","密度"];
var t__Destination_Depot = ["                       				Destination Depot","                       				目的油库"];
var t__DKI_Omega_Menu = ["DKI Omega Menu","达基Omega系统菜单"];
var t__Do_you_really_want_to_modify_drawer = ["Do you really want to modify drawer","您确实要修改油品调配公司吗"];
var t__Drawer = ["                       				Drawer","                       				油品调配公司"];
var t__Enter_density_between_range = ["Enter density between range","输入密度, 介于"];
var t__Enter_Schedule_Qty_between = ["Enter Schedule Qty between","输入调度油量, 介于"];
var t__Equipment_Code = ["																Equipment Code","																运输设备代码"];
var t__Equipment = ["Equipment","运输设备"];
var t__Insert_New_Record_Failed = ["Insert New Record Failed","记录新增失败"];
var t__Loaded = ["Loaded","已发油量"];
var t__Loader = ["                       				Loader","                       				提油人"];
var t__LOAD_SCHEDULES = ["LOAD SCHEDULES","发油配送管理"];
var t__Load_Spec_is_NOT_new = ["Load Spec is NOT new","发油概要不是新的"];
var t__Load_Status = ["                       				Load Status","                       				发油状态"];
var t__Modify = ["Modify","修改"];
var t__MODIFY = ["MODIFY","修改"];
var t__Modify_Unload_Details = ["Modify Unload Details","修改回收油品信息"];
var t__MODIFY_UNLOADING_SPECIFICATION = ["MODIFY UNLOADING SPECIFICATION","修改回收油品说明"];
var t__Only_density_can_be_modified = ["Only density can be modified","只有密度可以修改"];
var t__Order_No = ["Order No","订单号码"];
var t__Order_no_has_been_used = ["Order no has been used","订单号码已经被使用"];
var t__Preloaded = ["Preloaded","预发油量"];
var t__Prev_Product = ["Prev Product","上一个油品"];
var t__Product = ["                       			Product","                       			油品"];
var t__Product = ["																 Product","																 油品"];
var t__Product = ["Product","油品"];
var t__Profile = ["                       				Profile","设定"];
var t__Quantity = ["																Quantity","油量"];
var t__Quantity = ["Quantity","油量"];
var t__Reset = ["Reset","重置"];
var t__Save = ["Save","保存"];
var t__Schedule = ["Schedule","调度"];
var t__Select_A_Destination_Depot = ["Select A Destination Depot","选择目的油库"];
var t__Select_A_Drawer = ["Select A Drawer","选择油品调配公司"];
var t__Select_An_Unit = ["Select An Unit","选择单位"];
var t__Select_A_Product = ["Select A Product","选择油品"];
var t__Send_to_Depot = ["Send to Depot","发送到油库"];
var t__Successfully_Deleted = ["Successfully Deleted","删除成功"];
var t__Successfully_Inserted_A_New_Record = ["Successfully Inserted A New Record ","成功新增一个记录"];
var t__Successfully_Updated = ["Successfully Updated","成功修改一个记录"];
var t__Supplier = ["                       				Supplier","                       				供应商"];
var t__Tanker = ["                       				Tanker","                       				油槽车"];
var t__Tanker_Type = ["                       				Tanker Type","                       				油槽车类型"];
var t__Terminal = ["                       				Terminal","                       				油库"];
var t__Trip = ["                       				Trip","                       				提单"];
var t__Unit = ["																Unit","																单位"];
var t__Unit = ["Unit","单位"];
var t__UNLOAD_COMPARTMENT = ["UNLOAD COMPARTMENT","回收油仓管理"];
var t__Unload_Compartment_Page = ["Unload Compartment Page","回收油仓管理页"];
var t__Unloaded = ["																Unloaded","																回收量"];
var t__Unloaded = ["Unloaded","回收量"];
var t__UNLOADING_SPECIFICATION = ["UNLOADING SPECIFICATION","回收油品说明"];
var t__Unloading_Specification_Page = ["Unloading Specification Page","回收油品说明页"];
var t__UNLOAD_PRODUCT = ["UNLOAD PRODUCT","回收油品管理"];
var t__Unload_Product_Page = ["Unload Product Page","回收油品管理页"];
var t__Update_Failed = ["Update Failed","修改失败"];
var t__Update_Unloading_Specification_Page = ["Update Unloading Specification Page","修改回收油品说明页"];
var t__YOUR_ACTION = ["YOUR ACTION","请选择"];
var t__Trip_Details = ["Trip Details","提单详情"];


//var myColumns = [ml(t__Equipment), ml(t__Compartment), ml(t__Product), ml(t__Unit), ml(t__Schedule),
//      		 ml(t__Loaded), ml(t__Preloaded), ml(t__Prev_Product), ml(t__Cust_Order)
//      		];

var myColumns = [ml(t__Equipment), ml(t__Compartment), ml(t__Product), ml(t__Density), ml(t__Quantity), ml(t__Unit), ml(t__Unloaded)];

var myOrder = [ml(t__Order_No), ml(t__Delivery_Location), ml(t__Quantity)];


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
l_opInf[31]= ml(t__Update_Failed)+"! "+"Drawer cannot be used with these product(s)";
//l_opInf[57]= "Successfully Updated!";
//l_opInf[58]= "Successfully Inserted A New Record !";
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
var ops_req_print = [-1, 1,2,3,5, 15,16, 19];
var ops_req_search = [-1, 1,2,3,5, 15,16, 19];// search never required on this page					

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

	var newPage = "";
	var pageTitle="";
	var pageHeading="";


	newPage += printHdr(newPage, updatePageTitle(curViewDetailState, pageTitle), lang);
	newPage += local_HeadrHTML(newPage, lang);  
	newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
	newPage += "\n";
	newPage +="<tr>\n";  
	newPage +="<td width=\"100%\">             \n";
	newPage +="<div class=\"content\" id=\"content\">\n";
	newPage += "<div id=\"printReady\">";
	newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
	newPage +="<tbody>\n";   



	if (curViewDetailState <= 20 || curViewDetailState > 30 ) // view records
	{

		newPage += addButton();
		newPage += "<tr>\n";
		newPage += "	<td>\n";
		newPage += "		<div id=\"printReady\">\n";
		newPage += "		<table width=\"100%\">\n";
		newPage += displayInfo();


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


			for(i in unload_spec_tab)
			{
				newPage += "<tr class=\"row1\">\n";
				if(i>0) 
				{
					var howmanyDone =0;
					for(var j=0; j<myColumns.length; j++)
					{

						if (curColumnToSort == howmanyDone)
						{
							newPage += "<td style=\"background-color:#EEEEEE\">" + obs(unload_spec_tab[i][howmanyDone]) + "<\/td>";
						} 
						else 
						{

							newPage += "<td>\n";				  
							if(howmanyDone==0) // means time to display the drop list and table
							{
								newPage +="   <form name=\"optionsFrm_"+unload_spec_tab[i][1]+"\" id=\"optionsFrm\" method=\"get\">\n";
								newPage +="       <table border=\"0\">\n";
								newPage +="	       <tr>\n";
								newPage +="                 <td width=\"50\"> <span style=\"COLOR: #FF0000;\">"+obs(unload_spec_tab[i][howmanyDone])+"</span>\n";
								newPage +="                     <input type=\"hidden\" name=\"tankTerm\" id=\"tankTerm\" value=\""+tankTerm+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"supp\" id=\"supp\" value=\""+supp+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"carrier\" id=\"carrier\" value=\""+carrier+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"drawer\" id=\"drawer\" value=\""+drawer+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"tripNo\" id=\"tripNo\" value=\""+tripNo+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"cmptID\" id=\"cmptID\" value=\""+obs(unload_spec_tab[i][1])+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+obs(tanker)+"\">\n";
								newPage +="                 </td>\n";
								newPage +="                 <td>\n";
								//newPage += op_list(curPrivilage, unload_spec_tab[i][2]);
								newPage +="                 </td>\n";
								newPage +="	       </tr>\n";
								newPage +="	  </table>\n";
								newPage +="   </form>\n";
							}
							else if( howmanyDone == 2 || howmanyDone == 6 || howmanyDone == 8 ) 
								//Skipped: Product code, Loaded, Unit Id 
							{
								howmanyDone ++;
								newPage += obs(unload_spec_tab[i][howmanyDone]);
							}
							else
							{
								newPage += obs(unload_spec_tab[i][howmanyDone]);
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
			newPage +=displayStatusMsg (op);

		} // end if to check column

		//newPage += nextPage();
		newPage += "		</table>\n";
		newPage += " 		</div>\n";
		newPage += "	</td>\n";
		newPage += "</tr>\n";
		//newPage +=addPrintBtn_HTML();

	}// end if to check state
	else if(curViewDetailState == 27 )
	{
		newPage += updateForm();
	}
	else if(curViewDetailState == 21 || curViewDetailState == 22)
	{
		newPage += unloadCmpt();
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



function updateForm()
{

	var i = 1;
	var updateFrm = "";

	if (modUnloadStatus) {
		alert(ml(t__Only_density_can_be_modified))
	}

	updateFrm += "	<tr>\n";
	updateFrm += "		<td align=\"center\">\n";
	updateFrm += "			<div class=\"button\"><a href=\"unload_spec.cgi?tankTerm="+tankTerm+"&supp="+supp+"&tanker="+tanker+"&tripNo="+tripNo+"&pg="+pg+"\">"+ml(t__Back_to_Unload_Specification_Page)+"</a></div><br>\n";
	updateFrm += "		</td>\n";
	updateFrm += "	</tr>\n";

	updateFrm += displayInfo('noOptDrawer');

	updateFrm += "	<form name=\"updateFrm\" method=\"get\" id=\"updateFrm\" onsubmit=\"return submitmyform(this)\">\n";
	updateFrm += fieldst_HTML(ml(t__Modify_Unload_Details));
	updateFrm +="<div class=\"adminform\">\n";
	updateFrm += "							<table width=\"100%\">\n";
	updateFrm += "								<tr>\n";
	updateFrm += "									<td class=\"infotext\" width=\"100%\" >\n";
	updateFrm += ml(t__All_the_fields_labelled_with_an)+" (<span style=\"COLOR: #FF0000;\">*</span>) "+ml(t__are_mandatory)+"\n";
	updateFrm += "									</td>\n";
	updateFrm += "								</tr>\n";
	updateFrm += "								<tr>\n";
	updateFrm += "							        <p>\n";
	updateFrm += "								</tr>\n";
	updateFrm += "								<tr>\n";
	updateFrm += "									<td width=\"100%\">\n";
	updateFrm += "										<table width=\"100%\">\n";
	updateFrm += "											\n";
	updateFrm += "											<tr>\n";
	updateFrm += "											 	<td width=\"50%\">\n";
	updateFrm += "											   		<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"110\">\n";
	updateFrm += ml(t__Compartment_No)+":\n";
	updateFrm += "															</td>\n";
	updateFrm += "					                                        <td class=\"infotext\">\n";
	updateFrm += "						                                     " + unload_spec_tab[i][1] +"\n";
	updateFrm += "					                                        </td>\n";
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "											 	</td>\n";
	updateFrm += "											 	<td width=\"50%\">\n";
	updateFrm += "											   		<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"110\">\n";
	updateFrm += "																\n";
	updateFrm += "															</td>\n";
	updateFrm += "					                                        <td class=\"infotext\">\n";
	updateFrm += "						                                        \n";
	updateFrm += "					                                        </td>\n";
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "											 	</td>\n";
	updateFrm += "											</tr>\n";
	updateFrm += "											<tr>\n";
	updateFrm += "												<td width=\"50%\">\n";
	updateFrm += "													<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"110\">\n";
	updateFrm += ml(t__Equipment_Code)+":\n";
	updateFrm += "															</td>\n";
	updateFrm += "					                                        <td class=\"infotext\">\n";
	updateFrm += "						                                     " + unload_spec_tab[i][0] +"\n";
	updateFrm += "					                                        </td>\n";
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "												</td>\n";
	updateFrm += "												<td width=\"50%\">\n";
	updateFrm += "													<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"110\">\n";
	updateFrm += ml(t__Product)+":\n";
	updateFrm += "															</td>\n";
	if (modUnloadStatus) {
		updateFrm += "					                                        <td class=\"infotext\">\n";
		updateFrm += "						                                     " + unload_spec_tab[i][2] +" - "+unload_spec_tab[i][3]+" \n";
		updateFrm += "					                                        </td>\n";
		updateFrm += "													        <input type=\"hidden\" name=\"prod\" id=\"prod\" value=\""+unload_spec_tab[i][2]+"\" />\n";
	} else {
		updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
		updateFrm += "																	<span class=\"mandatory\">*</span>\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td>\n";
		updateFrm += "																<select NAME=\"prod\" id=\"prod\" onChange=\"setBoundry(this.options[this.selectedIndex].value)\" class=\"smallselect\" dataType=\"Require\" msg=\"Select A Product\">\n";
		updateFrm += displayDropList(unload_spec_tab[i][2], prod_jslst, ml(t__Select_A_Product));
		updateFrm += "															</td>\n";
	}
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "												</td>\n";
	updateFrm += "											</tr>\n";
	updateFrm += "											\n";
	updateFrm += "											<tr>\n";
	updateFrm += "											 	<td width=\"50%\">\n";
	updateFrm += "											   		<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"110\">\n";
	updateFrm += ml(t__Density)+":\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "																<span class=\"mandatory\">*</span>\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td>\n";
	updateFrm += "															 <input type=\"text\" name=\"density\" id=\"density\" size=\"10\" dataType=\"Range\" msg=\""+ml(t__Enter_density_between_range)+": ["+unload_spec_tab[i][11]+" - "+unload_spec_tab[i][12]+"] \" min=\""+unload_spec_tab[i][11]+"\"  max=\""+unload_spec_tab[i][12]+"\" value=\""+unload_spec_tab[i][4]+"\" />\n";
	updateFrm += "															 <span id=\"boundry\"> ["+unload_spec_tab[i][11]+" - "+unload_spec_tab[i][12]+"] </span>\n";
	updateFrm += "											 	            </td>\n";
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "											 	</td>\n";
	updateFrm += "											 	<td width=\"50%\">\n";
	updateFrm += "											   		<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"110\">\n";
	updateFrm += ml(t__Quantity)+":\n";
	updateFrm += "															</td>\n";

	if (unload_spec_tab[i][5] == 0 ) {
		qty_max = unload_spec_tab[i][13];
	} else {
		qty_max = unload_spec_tab[i][5];
	}

	if (modUnloadStatus) {
		updateFrm += "					                                        <td class=\"infotext\">\n";
		updateFrm += "						                                     " +  unload_spec_tab[i][5] +"\n";
		updateFrm += "					                                        </td>\n";
		updateFrm += "													        <input type=\"hidden\" name=\"sched\" id=\"sched\" value=\""+unload_spec_tab[i][5]+"\" />\n";
	} else {
		updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
		updateFrm += "																<span class=\"mandatory\">*</span>\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td>\n";
		updateFrm += "															 <input type=\"text\" name=\"sched\" id=\"sched\" size=\"20\" dataType=\"Range\" msg=\""+ml(t__Enter_Schedule_Qty_between)+" 1-"+qty_max+"\" min=1 max=\""+qty_max+"\" value=\""+unload_spec_tab[i][5]+"\" />\n";
		updateFrm += "															</td>\n";
	}
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "											 	</td>\n";
	updateFrm += "											</tr>\n";
	updateFrm += "											<tr>\n";
	updateFrm += "											 	<td width=\"50%\">\n";
	updateFrm += "											   		<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"110\">\n";
	updateFrm += ml(t__Unit)+":\n";
	updateFrm += "															</td>\n";
	if (modUnloadStatus) {
		updateFrm += "					                                        <td class=\"infotext\">\n";
		updateFrm += "						                                     " + unload_spec_tab[i][7] +"\n";
		updateFrm += "					                                        </td>\n";
		updateFrm += "													        <input type=\"hidden\" name=\"unit\" id=\"unit\" value=\""+unload_spec_tab[i][8]+"\" />\n";
	} else {
		updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
		updateFrm += "																<span class=\"mandatory\">*</span>\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td>\n";
		updateFrm += "																<select NAME=\"unit\" id=\"unit\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_An_Unit)+"\">\n";
		updateFrm += displayDropList(unload_spec_tab[i][8], unit_jslst, ml(t__Select_An_Unit));
		updateFrm += "															</td>\n";
	}
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "											 	</td>\n";
	updateFrm += "											 	<td width=\"50%\">\n";
	updateFrm += "											   		<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"110\">\n";
	updateFrm += ml(t__Unloaded)+":\n";
	updateFrm += "															</td>\n";
	updateFrm += "					                                        <td class=\"infotext\">\n";
	updateFrm += "						                                     " + unload_spec_tab[i][9] +"\n";
	updateFrm += "					                                        </td>\n";
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "											 	</td>\n";
	updateFrm += "											</tr>\n";
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
	updateFrm += "													<input type=\"hidden\" name=\"cmptID\" id=\"cmptID\" value=\""+unload_spec_tab[i][10]+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"tlrcmpt\" id=\"tlrcmpt\" value=\""+unload_spec_tab[i][1]+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"op\" id=\"op\" value=\"17\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"cmd\" id=\"cmd\" value=\"MOD\" />\n";
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
	updateFrm += "                    </div>\n";
	updateFrm += "                    </form>\n";                      
	updateFrm += fieldstFoot_HTML();


	return updateFrm;
} //End update Form


function displayInfo(intext)
{


	var infoPage ="";

	//	infoPage += " <tr>\n";
	//	infoPage += " 	<td align=\"left\">\n";

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

	if ( intext == 'noOptDrawer' ) {
		infoPage += "                  				<td class=\"infotext\">\n";
		infoPage += "										"+ drawer + " - " + drawerNm;
		infoPage += "                     			</td>\n";
	} else {
		infoPage += "                  				<td>\n";
		infoPage += "                       				<select name=\"drawer\" id=\"drawer\" class=\"smallselect\" onchange=\"submitDrawer("+state+");\"> \n";
		infoPage += displayDropList(drawer, drawer_list, ml(t__Select_A_Drawer));
		infoPage += "                     			</td>\n";
	}

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
	infoPage += ml(t__Equiptment_1) +":\n";
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
	infoPage += ml(t__Trip_Shift) +":\n";
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
	infoPage += "							<input type=\"hidden\" name=\"tripNo\" value=\""+tripNo+"\">\n";
	infoPage += "							<input type=\"hidden\" name=\"tanker\" value=\""+tanker+"\">\n";
	infoPage += "							<input type=\"hidden\" name=\"tankTerm\" value=\""+tankTerm+"\">\n";
	infoPage += "							<input type=\"hidden\" name=\"op\" value=\"10\">\n";
	infoPage += "						</td>\n";
	infoPage += "					</tr>\n";
	infoPage += "         	</table>\n";
	infoPage += "<\/div>\n";
	infoPage += "        	</form>\n";
	infoPage += fieldstFoot_HTML();

	// infoPage += "        	</form>\n";
	// infoPage += " 	</td>\n";
	// infoPage += "	</tr>\n";

	return infoPage;  	

}


function unloadCmpt()
{
	var i = 0;

	var unloadCmpt = "";
	unloadCmpt += "	<tr>\n";
	unloadCmpt += "		<td align=\"center\">\n";
	unloadCmpt += "			<div class=\"button\">\n";
	unloadCmpt += "				<a href=\"#\" onClick=\"document.unloadCmpt.submit();\">"+ml(t__Save)+"</a>&nbsp;\n";
	unloadCmpt += "				<a href=\"#\" onClick=\"document.unloadCmpt.submit();\">"+ml(t__Send_to_Depot)+"</a>&nbsp;\n";
	unloadCmpt += "				<a href=\"unload_spec.cgi?tankTerm="+tankTerm+"&supp="+supp+"&tripNo="+tripNo+"\">"+ml(t__Back_to_Unload_Specification)+"</a>\n";
	unloadCmpt += "			</div><br>\n";
	unloadCmpt += "		</td>\n";
	unloadCmpt += "	</tr>\n";
	unloadCmpt += " 	<tr>\n";
	unloadCmpt += " 		<td align=\"left\">\n";
	unloadCmpt += "       	<form name=\"unloadCmpt\" id=\"unloadCmpt\">\n";
	unloadCmpt += "             <table width=\"100%\">\n";
	unloadCmpt += "                	<tr>\n";
	unloadCmpt += "						<td width=\"50%\">\n";
	unloadCmpt += "							<table>\n";
	unloadCmpt += "								<tr>\n";
	unloadCmpt += "                   				<td class=\"infotextheading\">\n";
	unloadCmpt += ml(t__Trip)+":\n";
	unloadCmpt += "                   				</td>\n";
	unloadCmpt += "                   				<td class=\"infotext\">\n";
	unloadCmpt += "										" + supp+ " - " + suppNm;
	unloadCmpt += "                   				</td>\n";
	unloadCmpt += "                				</tr>\n";
	unloadCmpt += "                				<tr>\n";
	unloadCmpt += "                   				<td class=\"infotextheading\">\n";
	unloadCmpt += ml(t__Tanker)+":\n";
	unloadCmpt += "                   				</td>\n";
	unloadCmpt += "                   				<td>\n";
	unloadCmpt += "                     				</td>\n";
	unloadCmpt += "                 				</tr>\n";
	unloadCmpt += "							</table>\n";
	unloadCmpt += "						</td>\n";
	unloadCmpt += "						<td width=\"50%\">\n";
	unloadCmpt += "							<table>\n";
	unloadCmpt += "								<tr>\n";
	unloadCmpt += "                   				<td class=\"infotextheading\">\n";
	unloadCmpt += ml(t__Supplier)+":\n";
	unloadCmpt += "                   				</td>\n";
	unloadCmpt += "                   				<td class=\"infotext\">\n";
	unloadCmpt += "										" + supp;
	unloadCmpt += "                   				</td>\n";
	unloadCmpt += "                				</tr>\n";
	unloadCmpt += "                				<tr>\n";
	unloadCmpt += "                   				<td class=\"infotextheading\">\n";
	unloadCmpt += ml(t__Loader)+":\n";
	unloadCmpt += "                   				</td>\n";
	unloadCmpt += "                   				<td class=\"infotext\">\n";
	unloadCmpt += "                     				</td>\n";
	unloadCmpt += "                 				</tr>\n";
	unloadCmpt += "							</table>\n";
	unloadCmpt += "						</td>\n";
	unloadCmpt += "                	</tr>\n";
	unloadCmpt += "                	<tr>\n";
	unloadCmpt += "						<td colspan=\"2\">\n";
	unloadCmpt += "							<table>\n";
	unloadCmpt += "								<tr>\n";
	unloadCmpt += "                   				<td class=\"infotextheading\" width=\"150\">\n";
	unloadCmpt += ml(t__Destination_Depot)+":\n";
	unloadCmpt += "                   				</td>\n";
	unloadCmpt += "                   				<td>\n";
	unloadCmpt += "                       				<select id=\"depot\" name=\"depot\" class=\"smallselect\">\n";
	unloadCmpt += displayDropList(tankTerm, tankTermNm,ml(t__Select_A_Destination_Depot));
	unloadCmpt += "                   				</td>\n";
	unloadCmpt += "                				</tr>\n";

	if (op == 21){

		unloadCmpt += "                			<tr>\n";
		unloadCmpt += "                   			<td class=\"infotextheading\" width=\"150\">\n";
		unloadCmpt += ml(t__Compartment)+":\n";
		unloadCmpt += "                   			</td>\n";
		unloadCmpt += "                   			<td>\n";
		unloadCmpt += "                     			</td>\n";
		unloadCmpt += "                 			</tr>\n";
		unloadCmpt += "                			<tr>\n";
		unloadCmpt += "                   			<td class=\"infotextheading\" width=\"150\">\n";
		unloadCmpt += ml(t__Product)+":\n";
		unloadCmpt += "                   			</td>\n";
		unloadCmpt += "                   			<td>\n";
		unloadCmpt += "                     			</td>\n";
		unloadCmpt += "                 			</tr>\n";
	}

	unloadCmpt += "							</table>\n";
	unloadCmpt += "						</td>\n";
	unloadCmpt += "                	</tr>\n";
	unloadCmpt += "         		</table>\n";
	unloadCmpt += "        	</form>\n";
	unloadCmpt += " 		</td>\n";
	unloadCmpt += "	</tr>\n";

	return unloadCmpt;
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
	if (op <= 29 || op > 30)
	{
		pageHeading +=ml(t__UNLOADING_SPECIFICATION);
	}
	else if(op == 27)
	{
		pageHeading +=ml(t__MODIFY_UNLOADING_SPECIFICATION);
	}
	else if(op == 21)
	{
		pageHeading +=ml(t__UNLOAD_COMPARTMENT);
	}
	else if(op == 22)
	{
		pageHeading +=ml(t__UNLOAD_PRODUCT);
	}


	return pageHeading;   
}


function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;
	if (op <= 29 || op > 30)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Unloading_Specification_Page);

	}
	else if (op == 27)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Update_Unloading_Specification_Page);

	}
	else if (op == 21)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Unload_Compartment_Page);

	}
	else if (op == 22)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Unload_Product_Page);

	}


	return pageTitle;
}


function op_list(priv, pr_cde)
{
	/* priv = 
	   6 modify	op=1,2,3
	   7 add		op=4
	   8 delete	op=5
	 */
	var op_list ="";
	if (pr_cde == "" ) {
		op_list +="<select name=op disabled onchange=\"submit();\">\n";
	} else {
		op_list +="<select name=op onchange=\"submit();\">\n";
	}


	switch (priv)
	{
		case 8:

		case 7:			
		case 6:

			op_list +="<option value=27>"+ml(t__MODIFY)+"</option>";

		case 5:			
			break;
	}
	op_list +="<option value=0 selected>--\t"+ml(t__YOUR_ACTION)+"\t--</option>";
	op_list +="</select>                                        ";
	return op_list ;
}


function addButton()
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
	button += "		</form>\n";
	button += "		<div class=\"button\">\n";
	button += "			<a href=\"#\" onClick=\"document.glblFrm.tripNo.value='-1';document.glblFrm.pg.value='"+pg+"';document.glblFrm.action='load_scheds.cgi';document.glblFrm.submit();\">"+ml(t__Back_to_Load_Schedules_Page)+"</a>\n";
	button += "		</div><br>\n";
	button += " </td>\n";
	button += "</tr>\n";

	return button;
}


function setBoundry(value) {
	var myDnobj =  document.getElementById('density');
	if(value != undefined) {
		for(i in prod_jslst) {
			if(value == prod_jslst[i][0]){
				var boundry = "[" +prod_jslst[i][3] +" - " + prod_jslst[i][4] + "]";
				var myDnMsg = ml(t__Enter_density_between_range)+": "+ boundry;
				var lodens = prod_jslst[i][3];
				var hidens = prod_jslst[i][4];

				//document.getElementById('lodens').value = prod_jslst[i][3];
				//document.getElementById('hidens').value = prod_jslst[i][4];
				document.getElementById('boundry').innerHTML=boundry;
			}
		}
	}
	myDnobj.setAttribute("msg", myDnMsg);
	myDnobj.setAttribute("min", lodens);
	myDnobj.setAttribute("max", hidens);
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
	newPage +="</script>\n";
	newPage += "</head>\n";
	newPage += "<body>\n";
	return (newPage);
}


