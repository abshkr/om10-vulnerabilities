/*****************************************
 *
 * $Id: tanker_list.js,v 1.62 2011/06/22 01:35:31 abs Exp $
 *
 *****************************************/



//This file use unique version for multi-language.
var t__Select_the_Base_Depot_and_Manager__To_View_Tanker_List = ["Select the Base Depot and Manager, To View Tanker List","选择基地油库和主管公司,查看油槽车列表"];

var t__Save = ["Save","保存"];
var t__Add = ["Add","新增"];
var t__Update_Tkr_Expiry = ["Update Tanker Expiry","Update Tanker Expiry"];
var t__Reset = ["Reset","重置"];
var t__View = ["View","查看"];
var t__Manager = ["                                Manager","                                主管公司"];

var t__Active = ["														Active","														激活"];
var t__Destination = ["														Destination","														目的地"];
var t__Lock = ["														Lock","														锁定"];
var t__Select_a_tanker = ["Select a tanker","选择油槽车"];
var t__Select_Carrier = ["Select Carrier","选择承运商"];

var t__All_the_fields_labelled_with_an = ["								All the fields labelled with an ","								所有带"];
var t__Depot = ["                       		Base Depot","                       		基地油库"];
var t__Depot = ["														Base Depot","														基地油库"];
var t__Bay_Check = ["														Bay Check","														发油台检查"];
var t__Carrier_Code = ["														Carrier Code","														承运商"];
var t__Carrier_Name = ["														Carrier Company","														承运商"];
var t__Component_Type = ["														Component Type","														组件类型"];
var t__Current_Depot = ["														Current Depot","														当前油库"];
var t__Delivery_Goods_Expiry = ["														Delivery Goods Expiry","														交付货品有效期"];
var t__Equipment_Code = ["														Equipment Code","														运输设备编号"];
var t__Equipment_Type = ["														Equipment Type","														运输设备类型"];
var t__Insurance_Expiry = ["														Insurance Expiry","														保险有效期"];
var t__Last_Depot = ["														Last Depot","														前一油库"];
var t__Licence_Expiry = ["														Licence Expiry","														许可证有效期"];
var t__Manager_Code = ["														Manager Code","														主管公司"];
var t__Manager_Name = ["														Manager Company","														主管公司"];
var t__No_of_Trips = ["														No of Trips","														提单总数"];
var t__SET_EQUIPMENT = ["SET EQUIPMENT","设置运输设备"];
var t__Tanker_Code = ["																 Tanker Code","																 油槽车编号"];
var t__Tanker_Code = ["														Tanker Code","														油槽车编号"];
var t__Tanker_Prompt = ["														Tanker Prompt","														油槽车提示信息"];
var t__Total_Trip_Capacity = ["														Total Trip Capacity","														总运输量"];
var t__Total_Trip_Compartment = ["														Total Trip Compartment","														总油仓数"];
var t__YOUR_ACTION = ["YOUR ACTION","请选择"];
var t__Active = ["Active","激活"];
var t__Active_Tankers_cannot_be_deleted = ["Active Tankers cannot be deleted","激活的油槽车不能被删除"];
var t__Add = ["Add","新增"];
var t__ADD = ["ADD","新增"];
var t__ADD_NEW_TANKER = ["ADD NEW TANKER","新增油槽车"];
var t__are_mandatory = [" are mandatory","的项目必填"];
var t__are_mandatory = ["are mandatory","的项目必填"];
var t__Back_to_Tanker_List = ["Back to Tanker List","返回油槽车管理"];
var t__Depot = ["Base Depot","基地油库"];
var t__Bay_Check = ["Bay Check","发油台检查"];
var t__Cannot_guess_codes_of_COMPOSED_Equipment_Types = ["Cannot guess codes of COMPOSED Equipment Types","不能猜测组成的运输设备类型"];
var t__Carrier_Code = ["Carrier Code","承运商"];
var t__Component_Type = ["Component Type","组件类型"];
var t__Configure = ["Configure","配置"];
var t__CONFIGURE = ["CONFIGURE","配置"];
var t__Create_Default_Equipment = ["Create Default Equipment","生成默认运输设备"];
var t__Delete = ["Delete","删除"];
var t__DELETE = ["DELETE","删除"];
var t__Delete_Failed_ = ["Delete Failed!","删除失败！"];
var t__DELETE_TANKER = ["DELETE TANKER","删除油槽车"];
var t__Delete_Tanker_Page = ["Delete Tanker Page","删除油槽车页"];
var t__DKI_Omega_Menu = ["DKI Omega Menu","达基国际Omega系统菜单"];
var t__Enter_a_Tanker_Code = ["Enter a Tanker Code","输入油槽车编号"];

var t__Enter_No_of_Trips = ["Enter No of Trips","输入提单总数"];
var t__Enter_Delivery_Goods_Expiry_Date = ["Enter Delivery Goods Expiry Date","输入交付货品有效期日"];
var t__Enter_Insurance_Expiry_Date = ["Enter Insurance Expiry Date","输入保险有效期日"];
var t__Enter_Licence_Expiry_Date = ["Enter Licence Expiry Date","输入许可证有效期日"];
var t__Equipment_Code = ["Equipment Code","运输设备编号"];
var t__Equipment_Type = ["Equipment Type","运输设备类型"];
var t__Find = ["Find","查找"];
var t__FIND_TANKER = ["FIND TANKER","查找油槽车"];
var t__Find_Tanker_Page = ["Find Tanker Page","查找油槽车页"];
var t__Insert_New_Record_Failed_ = ["Insert New Record Failed!","插入新纪录失败！"];
var t__LOAD_SCHEDULES = ["LOAD SCHEDULES","发油订单管理"];
var t__Lock = ["Lock","锁定"];
var t__Modify = ["Update","修改"];
var t__MODIFY = ["MODIFY","修改"];
var t__MODIFY_TANKER = ["MODIFY TANKER","修改油槽车"];
var t__Save_Failed_ = ["Save Failed!","保存失败！"];
var t__Select_A_Base_Depot = ["Select A Base Depot","选择基地油库"];
var t__Select_A_Carrier = ["Select A Carrier","选择承运商"];
var t__Select_A_Current_Depot = ["Select A Current Depot","选择当前油库"];
var t__Select_A_Depot = ["Select A Depot","选择油库"];
var t__Select_A_Destination = ["Select A Destination","选择目的地"];
var t__Select_A_Last_Depot = ["Select A Last Depot","选择前一油库"];
var t__Select_A_Manager = ["Select A Manager","选择主管公司"];
var t__Select_An_Equipment = ["Select An Equipment","选择运输设备"];
var t__Select_An_Equipment_Code = ["Select An Equipment Code","选择运输设备编号"];
var t__Select_an_Equipment_Type = ["Select an Equipment Type","选择运输设备类型"];
var t__Select_a_type = ["Select a type","选择类型"];
var t__Select_Current_Depot = ["Select Current Depot","选择当前油库"];
var t__Select_Date = ["Select Date","选择日期"];
var t__Select_Destination = ["Select Destination","选择目的地"];
var t__Select_Last_Depot = ["Select Last Depot","选择前一油库"];
var t__Sequence = ["Sequence","顺序"];
var t__Successfully_Deleted_ = ["Successfully Deleted!","成功删除！"];
var t__Successfully_Inserted_A_New_Record__ = ["Successfully Inserted A New Record !","成功插入一条新纪录！"];
var t__Successfully_Saved_ = ["Successfully Saved!","成功保存！"];
var t__Successfully_Updated_ = ["Successfully Updated!","成功更新！"];
var t__Tanker_Code = ["Tanker Code","油槽车编号"];
var t__TANKER_CONFIGURATION = ["TANKER CONFIGURATION","油槽车配置"];
var t__Tanker_Configuration_Page = ["Tanker Configuration Page","油槽车配置页"];
var t__Tanker_Details = ["Tanker Details","油槽车详情"];
var t__TANKER_LIST = ["TANKER LIST","油槽车管理"];
var t__Tanker_List_Page = ["Tanker List Page","油槽车管理页"];
var t__Tanker_Search = ["Tanker Search","查找油槽车"];
var t__Update_Failed_ = ["Update Failed!","更新失败！"];
var t__Update_Tanker_Page = ["Update Tanker Page","更新油槽车页"];
var t__VIEW = ["VIEW","查看"];
var t__VIEW_TANKER = ["VIEW TANKER","查看油槽车"];
var t__View_Tanker_Page = ["View Tanker Page","查看油槽车页"];

var t__ALERT_TKRCODE_EXIST = ["Same Tanker Code is already exist!","相同的油槽车编号已存在!"];
var t__Locked_Tankers_cannot_be_deleted = ["Locked Tankers cannot be deleted","被锁定的油槽车不能被删除"];
var t__Bay_Checked_Tankers_cannot_be_deleted = ["Bay Checked Tankers cannot be deleted","发油台检查已被设置,不能删除此油槽车"];
var t__Do_you_wish_to_delete_this_row = ["Do you wish to delete this row?","是否确定删除此行数据"];
var t__This_Tanker_has_been_schedule_to_load = ["This Tanker has been scheduled to load. You can not delete it!", "此油槽车已被调度装油,不能被删除"];
var t__YES = ["YES","是"];
var t__NO  = ["NO", "否"];
var t__Depot_and_Manager_details = ["Base Depot and Manager details", "油库和主管公司详情"];


var myColumns = [ml(t__Tanker_Code), ml(t__Equipment_Type), ml(t__Carrier_Name), ml(t__Lock), ml(t__Active),
	ml(t__Bay_Check), ml(t__Depot)];

var myConf = [ml(t__Sequence), ml(t__Component_Type), ml(t__Equipment_Code)];

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
	l_opInf[14]= ml(t__Successfully_Saved_)
	l_opInf[22]= ml(t__Successfully_Saved_)
	l_opInf[32]= ml(t__Save_Failed_)
	l_opInf[24]= ml(t__Save_Failed_)
	l_opInf[29]= g_opInf[28];
	l_opInf[27]= g_opInf[26];
	l_opInf[28]= g_opInf[27];
	l_opInf[37]= g_opInf[36];
	l_opInf[38]= g_opInf[37];
	l_opInf[39]= g_opInf[38];
	l_opInf[62]= g_opInf[26];
	l_opInf[72]= g_opInf[36];


/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    		
var ops_req_print = [-1, 0,1,2,3,4,5,6,14,24,27,28, 29, 18, 27,28,37,38,39,42,48,62,72];
var ops_req_search = [-1, 0,1,2,3,4,5,6,14,24,27,28, 29, 18, 27,28,37,38,39,42,48,62,72];// search never required on this page
var dateFormat = "yyyy-MM-dd";
var manager = combine_two_arrays(suppliers, carriers);
//This is to sort the combined array
var manager = manager.sort(sortMultiDimensional);

function renderPage(cRec, cCol, cState, cPageState, priv, unit, lang)
{ 
	js_lang = lang; 
	var curRecord = cRec;
	var curColumnToSort = cCol;
	var curViewDetailState = cState;
	var curPageIn = cPageState;
	var curPrivilage = priv;
	var vol = unit;

	var i;
	var e;
	var f;
	var newPage = "";

	var newPage = "";
	var pageTitle="";
	var pageHeading="";


	//printHdr function of comm_HTML.js file responsible for 
	//generating all the HTML for the current page
	newPage += printHdr( newPage, 
			updatePageTitle(curViewDetailState,pageTitle), 
			lang );

	//local_HeadrHTML function is local function give 
	// the ability to append any thing to the current page
	newPage += local_HeadrHTML( newPage, lang );

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
	newPage += "<table border=\"0\" width=\"100%\" height=\"100%\">\n";
	newPage += "<tbody>\n";  


	if (curViewDetailState <= 1 || ( curViewDetailState > 10 && curViewDetailState < 40 && curViewDetailState != 18 )) // view records
	{

		if(op ==15 && tanker_list_tab.length > 1 )
		{
			depot = tanker_list_tab[1][7];
		}

		newPage += displayGlblFrm(cmpy, depot);
		//newPage +=addPrintBtn_HTML();
    newPage +=displayStatusMsg (op);
		if( ((myColumns.length)> 0))
		{
			newPage += "<tr> \n";
			newPage += "<td>\n ";
			//        newPage += "<div id=\"printReady\">\n";
			newPage += table_begin("M", 0,"");
			newPage += "<tbody> \n";
			newPage += "<tr>";

			if ( tanker_list_tab.length > 1 ) {
				for(var i=0; i<myColumns.length; i++)
				{
					newPage += "<td>"+myColumns[i]+"<\/td>";
				}
			}

			newPage += "<\/tr>";


			for(i in tanker_list_tab)
			{
				newPage += "<tr class=\"row1\">\n";
				if(i>0) 
				{
					var howmanyDone =0;
					for(var j=0; j<myColumns.length; j++)
					{

						if (curColumnToSort == howmanyDone)
						{
							newPage += "<td style=\"background-color:#EEEEEE\">" + obs(tanker_list_tab[i][howmanyDone]) + "<\/td>";
						} 
						else 
						{


							if(howmanyDone==0) // means time to display the drop list and table
							{
							    cmpy = tanker_list_tab[i][8];
							    newPage += "<td>\n";		
								newPage +="   <form name=\"optionsFrm_"+tanker_list_tab[i][howmanyDone]+"\" id=\"optionsFrm\" method=\"get\">\n";
								newPage +="       <table border=\"0\" width=\"100%\" >\n";
								newPage +="	       <tr>\n";
								newPage +="                 <td width=\"50%\" style=\"white-space: nowrap;\"> <span style=\"COLOR: #FF0000;\">"+obs(tanker_list_tab[i][howmanyDone])+"</span>\n";
								newPage +="                     <input type=\"hidden\" name=\"depot\" id=\"depot\" value=\""+depot+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"cmpy\" id=\"cmpy\" value=\""+cmpy+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+tanker_list_tab[i][howmanyDone]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"eqpt_type\" id=\"eqpt_type\" value=\""+tanker_list_tab[i][1]+"\">\n";
								newPage +="                 </td>\n";
								newPage +="                 <td align=\"right\" width=\"50%\">\n";
								newPage += op_list(curPrivilage, i);
								newPage +="                 </td>\n";
								newPage +="	       </tr>\n";
								newPage +="	  	</table>\n";
								newPage +="   </form>\n";
							}
							else if(howmanyDone == 1)
							{
							    newPage += "<td>\n";		
								howmanyDone ++;
								newPage += obs(tanker_list_tab[i][howmanyDone]);
							}
						    else if(howmanyDone == 3)
							{
							    newPage += "<td>\n";		
                                			    newPage += disp_cmpy_name( obs(tanker_list_tab[i][howmanyDone]) );
							}
							else if(howmanyDone == 4)
							{
							    newPage += "<td align=\"center\" width=\"90\" >\n";		
							    newPage += lock_mark(tanker_list_tab[i][howmanyDone]);
							}
							else if(howmanyDone == 5 || howmanyDone == 6)
							{
							    newPage += "<td align=\"center\" width=\"90\" >\n";		
							    newPage += check_mark(tanker_list_tab[i][howmanyDone]);
							}
							else
							{
							    newPage += "<td>\n";		
								newPage += obs(tanker_list_tab[i][howmanyDone]);
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
			//        newPage += "</div>\n";
			newPage += "<\/td>";	
			newPage += "<\/tr>";
			

		} // end if to check column

		if(op < 10 || op == 15  || op == 22){
			//newPage += nextPage();
			if(parseInt(pg)> 0&&parseInt(pagesTotal)!=0)
			{
				newPage +=nextPage_long(pagesTotal, pg, "tanker_list.cgi", "pg", '&depot='+depot+'&cmpy='+cmpy+'&op='+op);
			}
		}
		//newPage +=addPrintBtn_HTML();

	}// end if to check state
	else if(curViewDetailState == 18 || curViewDetailState > 40 )
	{
		newPage += configureForm();

	}
	else if(curViewDetailState == 3)
	{
		newPage += view();

	}
	else if(curViewDetailState == 5)
	{
		newPage += findForm();
	}
	else if(curViewDetailState == 8 || curViewDetailState == 7 )
	{
		newPage += updateForm(curViewDetailState);

	}
	else if(curViewDetailState == 2)
	{
		newPage += updateExpiryDateForm(curViewDetailState);

	}
	
	else if(curViewDetailState == 9)
	{
		newPage += deleteForm();
	}

	newPage += statusbarRowHTML(statusBar);

	newPage += "</tbody>\n";
	newPage += "</table>\n";
	newPage += "</div>\n";
	newPage += "</div>\n";
	newPage += "</td>              \n";  
	newPage += "</tr>\n";
	
	newPage +="<script type=\"text/javascript\">\n";
	newPage +="var options1 = {\n";
	newPage +="script:\"/cgi-bin/en/load_scheds/tankers.cgi?carrier="+cmpy+"&\",\n";
	newPage +="varname:\"input\",\n";
	newPage +="minchars:1\n";
	newPage +="};\n";
	newPage +="var as1 = new AutoSuggest('tanker', options1);\n";
	newPage +="</script>\n";

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


function view()
{
	var i = 1;
	cmpy = tanker_list_tab[i][8];
	depot = tanker_list_tab[i][7];

	var view = "";
	view += "	<tr>\n";
	view += "		<td align=\"center\">\n";
	view += "			<div class=\"button\">\n";
	view += "				<a href=\"tanker_list.cgi?depot="+depot+"&cmpy="+cmpy+"&pg="+pg+"&op=0\">"+ml(t__Back_to_Tanker_List)+"</a></div><br>\n";
	view += "		</td>\n";
	view += "	</tr>\n";
	view += "	<tr>\n";
	view += "		<td>\n";
	//  view += "			<div id=\"printReady\">\n";

	view += " <ul id=\"tabmenu\">\n";
	view += "<li>"+ml(t__Tanker_Details)+"</li>\n";
	view += "</ul>\n";
	view += "<div class=\"adminform\">\n";

	view += "					<table width=\"100%\">\n";
	view += "						<tr>\n";
	view += "							<td width=\"100%\">\n";
	view += "								<table width=\"100%\">\n";
	view += "									<tr>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Tanker_Code)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "														" + tanker_list_tab[i][0] + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Carrier_Name)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "														" + disp_cmpy_name(tanker_list_tab[i][3]) + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "									</tr>\n";
	view += "									<tr>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Depot)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "	" + depot + "\n";
	//  view += "	" + tanker_list_tab[i][7] + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Manager_Name)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "														" + disp_cmpy_name(cmpy) + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "									</tr>\n";
	view += "									<tr>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Equipment_Type)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "														" + tanker_list_tab[i][2] + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "										<td width=\"50%\">\n";
	view += "										</td>\n";
	view += "									</tr>\n";
	view += "									<tr>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Tanker_Prompt)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "														" + tanker_list_tab[i][9] + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__No_of_Trips)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "														" + tanker_list_tab[i][10] + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "									</tr>\n";
	view += "								</table>\n";
	view += "							</td>\n";
	view += "						</tr>\n";
	view += "						<tr>\n";
	view += "							<td width=\"100%\">\n";
	view += "								<table width=\"100%\">\n";
	view += "									<tr>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Licence_Expiry)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "														" + tanker_list_tab[i][11] + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Lock)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";  
	view += "														" + tanker_list_tab[i][4] +"\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "									</tr>\n";
	view += "									<tr>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Delivery_Goods_Expiry)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "														" + tanker_list_tab[i][12] + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Active)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "														" + tanker_list_tab[i][5] + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "									</tr>\n";
	view += "									<tr>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Insurance_Expiry)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "														" + tanker_list_tab[i][13] + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Bay_Check)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "														" + tanker_list_tab[i][6] + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "									</tr>\n";
	view += "								</table>\n";
	view += "							</td>\n";
	view += "						</tr>\n";
	view += "						<tr>\n";
	view += "							<td width=\"100%\">\n";
	view += "								<table width=\"100%\">\n";
	view += "									<tr>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Total_Trip_Capacity)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "														" + tanker_list_tab[i][15] + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Last_Depot)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "														" + tanker_list_tab[i][14] + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "									</tr>\n";
	view += "									<tr>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Total_Trip_Compartment)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "														" + tanker_list_tab[i][17] + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Destination)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "														" + tanker_list_tab[i][16] + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "									</tr>\n";
	view += "									<tr>\n";
	view += "										<td width=\"50%\">\n";
	view += "										</td>\n";
	view += "										<td width=\"50%\">\n";
	view += "											<table>\n";
	view += "												<tr>\n";
	view += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	view += ml(t__Current_Depot)+":\n";
	view += "													</td>\n";
	view += "													<td class=\"infotext\">\n";
	view += "														" + tanker_list_tab[i][18] + "\n";
	view += "													</td>\n";
	view += "												</tr>\n";
	view += "											</table>\n";
	view += "										</td>\n";
	view += "									</tr>\n";
	view += "								</table>\n";
	view += "							</td>\n";
	view += "						</tr>\n";
	view += "					</table>\n";
	view += "			</div>\n";
	view += "		</td>\n";
	view += "	</tr>\n";


	return view;
} //End update Form



function updateForm(state)
{
	var button ="";
	var required = "";
	var inputType = "";
	var selectType = "";
	var tankerCode = "";
	var vallicexp = "";
	var valdelexp = "";
	var valinsexp = "";
	var cmd="";
    var inptdisable = "";
	var i = 0;

	op = 10 + state;


	if (state == 8)
	{
		button = ml(t__Add);
		required= "*";
		inputType = "text";
		selectType = "dataType=\"Require\" msg=\""+ml(t__Select_an_Equipment_Type)+"\"";
		tankerCode = "dataType=\"Require\" msg=\""+ml(t__Enter_a_Tanker_Code)+"\"";
		cmd="ADD";
		i=0;
		//dont need to display the default selected expiry dates
		//vallicexp = "value="+disp_todayDate('yyyy-MM-dd');
		//valdelexp = vallicexp;
		//valinsexp = vallicexp;
        inptdisable = "disabled";

	}else{
		button = ml(t__Modify);
		required= "";
		inputType = "hidden";
		selectType = "disabled";
		tankerCode = "";
		cmd="MOD";
		i=1;
		cmpy = tanker_list_tab[i][8];
		depot = tanker_list_tab[i][7];
		vallicexp = "value=\""+tanker_list_tab[i][11]+"\"";
		valdelexp = "value=\""+tanker_list_tab[i][12]+"\"";
		valinsexp = "value=\""+tanker_list_tab[i][13]+"\"";
        inptdisable = "";

	}



	var updateFrm = "";
	updateFrm += "	<tr>\n";
	updateFrm += "		<td align=\"center\">\n";
	updateFrm += "			<div class=\"button\">\n";
	if(state == 7){
		updateFrm += "				<a href=\"tanker_list.cgi?op=42&depot="+depot+"&cmpy="+cmpy+"&tanker="+tanker+"&eqpt_type="+eqpt_type+"\">"+ml(t__Configure)+"</a>&nbsp;\n";
	}
/* This button will be moved to stay beside the Add button, bugzilla 2482
	else{
		updateFrm += "				<a href=\"#\" onClick=\"createDefault();\">"+ml(t__Create_Default_Equipment)+"</a>&nbsp;\n";
	}
*/
	updateFrm += "				<a href=\"tanker_list.cgi?depot="+depot+"&cmpy="+cmpy+"&pg="+pg+"&op=0\">"+ml(t__Back_to_Tanker_List)+"</a></div><br>\n";
	updateFrm += "		</td>\n";
	updateFrm += "	</tr>\n";
	updateFrm += "	<form name=\"updateFrm\" method=\"get\" id=\"updateFrm\" onsubmit=\"return checkTankerCode(this);\">\n";
	updateFrm += "	<tr>\n";
	updateFrm += "		<td>\n";

	updateFrm += " <ul id=\"tabmenu\">\n";
	updateFrm += "<li>"+ml(t__Tanker_Details)+"</li>\n";
	updateFrm += "</ul>\n";
	updateFrm += "<div class=\"adminform\">\n";

	updateFrm += "					<table width=\"100%\">\n";
	updateFrm += "						<tr>\n";
	updateFrm += "							<td class=\"infotext\" width=\"100%\">\n";
	updateFrm += ml(t__All_the_fields_labelled_with_an)+" (<span style=\"COLOR: #FF0000;\">*</span>)"+ml(t__are_mandatory)+"\n";
	updateFrm += "							</td>\n";
	updateFrm += "						</tr>\n";
	updateFrm += "						<tr>\n";
	updateFrm += "							<td width=\"100%\">\n";
	updateFrm += "								<table width=\"100%\">\n";
	updateFrm += "									<tr>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Tanker_Code)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														<span class=\"mandatory\">" + required + "</span>\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td>\n";
	updateFrm += "														<span  class=\"infotext\">" + tanker_list_tab[i][0] + "</span>\n";

	updateFrm += "														<input maxlength=\"16\" type=\""+inputType+"\" name=\"tanker\" value=\"" + tanker_list_tab[i][0] + "\" "+tankerCode+"  / >\n";

	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Carrier_Name)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														<span class=\"mandatory\">*</span>\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td>\n";  
	updateFrm += "														<select NAME=\"carrier\" id=\"carrier\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_A_Carrier)+"\">\n";
	updateFrm += displayDropList(tanker_list_tab[i][3], carrier, ml(t__Select_A_Carrier));
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "									</tr>\n";
	updateFrm += "									<tr>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Depot)+":\n";
	updateFrm += "</td>\n";
	updateFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "<span class=\"mandatory\">&nbsp;</span>\n";
	updateFrm += "</td>\n";
	updateFrm += "<td class=\"infotext\">\n";
	updateFrm += "	" + depot + "\n";
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	updateFrm += "</table>\n";
	updateFrm += "</td>\n";
	updateFrm += "<td width=\"50%\">\n";
	updateFrm += "<table>\n";
	updateFrm += "<tr>\n";
	updateFrm += "<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Manager_Name)+":\n";
	updateFrm += "</td>\n";
	updateFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "<span class=\"mandatory\">&nbsp;</span>\n";
	updateFrm += "</td>\n";
	updateFrm += "<td class=\"infotext\">\n";
	updateFrm += "	" + disp_cmpy_name(cmpy) + "\n";
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	updateFrm += "</table>\n";
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	updateFrm += "<tr>\n";
	updateFrm += "<td width=\"50%\">\n";
	updateFrm += "<table>\n";
	updateFrm += "<tr>\n";
	updateFrm += "<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Equipment_Type)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														<span class=\"mandatory\">"+required+"</span>\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td>\n";
	updateFrm += "														<select name=\"eqpt_type\" id=\"eqpt_type\" class=\"smallselect\" "+selectType+">\n";
	updateFrm += displayDropList(tanker_list_tab[i][1], equip_type, ml(t__Select_a_type));
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "										</td>\n";
	updateFrm += "									</tr>\n";
	updateFrm += "									<tr>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Tanker_Prompt)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														<span class=\"mandatory\"></span>\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td>\n";
	updateFrm += "														<input type=\"text\" name=\"prompt\" value=\""+tanker_list_tab[i][9]+"\" "+inptdisable+" />\n";
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__No_of_Trips)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														<span class=\"mandatory\"></span>\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td>\n";
	updateFrm += "<input type=\"text\" name=\"trips\" value=\""+tanker_list_tab[i][10]+"\" dataType=\"Custom\" regexp=\"^\\d\*$\" msg=\""+  ml(t__Enter_No_of_Trips)+"\" />\n";
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "									</tr>\n";
	updateFrm += "								</table>\n";
	updateFrm += "							</td>\n";
	updateFrm += "						</tr>\n";
	updateFrm += "						<tr>\n";
	updateFrm += "							<td width=\"100%\">\n";
	updateFrm += "								<table width=\"100%\">\n";
	updateFrm += "									<tr>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Licence_Expiry)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														&nbsp;\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td class=\"infotext\">\n";
	updateFrm += "														<table width=\"100%\">\n";
	updateFrm += "  															<tr>\n";
	updateFrm += "      															<td>\n";
	updateFrm += "      													 			<input type=\"text\" name=\"lic_expr\" id=\"lic_expr\" size=\"20\" msg=\""+ml(t__Enter_Licence_Expiry_Date)+"\" "+vallicexp+" readonly=\"true\">\n";
	updateFrm += "      													 		 </td>\n";
	updateFrm += "      													 		 <td class=\"infotextheading\" align=\"left\">\n";
	// replacing with the common function call updateFrm += "      													 			<A HREF=\"#\" onClick=\"cal.select(document.forms[0].lic_expr,'anchor0','yyyy-MM-dd'); return false;\" TITLE=\"cal.select(document.forms[0].lic_expr,'anchor0','yyyy-MM-dd'); return false;\" NAME=\"anchor0\" ID=\"anchor0\">"+ml(t__Select_Date)+"</A>													 			\n";
	updateFrm += dateURL_HTML("document.forms[0].lic_expr", "anchor0",dateFormat,ml(t__Select_Date));

	updateFrm += "      													 		 </td>\n";
	updateFrm += "  													 		</tr>\n";
	updateFrm += "													 	</table>\n";
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Lock)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														&nbsp;\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td class=\"infotext\">\n"; 
	updateFrm += checkBox('lock', tanker_list_tab[i][4]);
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "									</tr>\n";
	updateFrm += "									<tr>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Delivery_Goods_Expiry)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														&nbsp;";
	updateFrm += "													</td>\n";
	updateFrm += "													<td>\n";
	updateFrm += "														<table width=\"100%\">\n";
	updateFrm += "  															<tr>\n";
	updateFrm += "      															<td>\n";
	updateFrm += "      													 			<input type=\"text\" name=\"delv_expr\" id=\"delv_expr\" size=\"20\" msg=\""+ml(t__Enter_Delivery_Goods_Expiry_Date)+"\" "+valdelexp+" readonly=\"true\">\n";
	updateFrm += "      													 		 </td>\n";
	updateFrm += "      													 		 <td class=\"infotextheading\" align=\"left\">\n";
	// replacing with the commond date function call updateFrm += "      													 			<A HREF=\"#\" onClick=\"cal.select(document.forms[0].delv_expr,'anchor1','yyyy-MM-dd'); return false;\" TITLE=\"cal.select(document.forms[0].delv_expr,'anchor1','yyyy-MM-dd'); return false;\" NAME=\"anchor1\" ID=\"anchor1\">"+ml(t__Select_Date)+"</A>													 			\n";
	updateFrm += 	dateURL_HTML("document.forms[0].delv_expr", "anchor1",dateFormat,ml(t__Select_Date));
	updateFrm += "      													 		 </td>\n";
	updateFrm += "  													 		</tr>\n";
	updateFrm += "													 	</table>\n";
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Active)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														&nbsp;\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td>\n";
	updateFrm += checkBox('active', tanker_list_tab[i][5]);
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "									</tr>\n";
	updateFrm += "									<tr>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Insurance_Expiry)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														&nbsp;\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td>\n";
	updateFrm += "														<table width=\"100%\">\n";
	updateFrm += "  															<tr>\n";
	updateFrm += "      															<td>\n";
	updateFrm += "      													 			<input type=\"text\" name=\"ins_expr\" id=\"ins_expr\" size=\"20\" msg=\""+ml(t__Enter_Insurance_Expiry_Date)+"\" "+valinsexp+"  readonly=\"true\">\n";
	updateFrm += "      													 		 </td>\n";
	updateFrm += "      													 		 <td class=\"infotextheading\" align=\"left\">\n";
//replaced with the common function call	updateFrm += "      													 			<A HREF=\"#\" onClick=\"cal.select(document.forms[0].ins_expr,'anchor2','yyyy-MM-dd'); return false;\" TITLE=\"cal.select(document.forms[0].ins_expr,'anchor2','yyyy-MM-dd'); return false;\" NAME=\"anchor2\" ID=\"anchor2\">"+ml(t__Select_Date)+"</A>													 			\n";
	updateFrm += dateURL_HTML("document.forms[0].ins_expr", "anchor2",dateFormat,ml(t__Select_Date));

	updateFrm += "      													 		 </td>\n";
	updateFrm += "  													 		</tr>\n";
	updateFrm += "													 	</table>\n";
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Bay_Check)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														&nbsp;\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td>\n";
	updateFrm += checkBox('bay_check', tanker_list_tab[i][6]);
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "									</tr>\n";
	updateFrm += "								</table>\n";
	updateFrm += "							</td>\n";
	updateFrm += "						</tr>\n";
	updateFrm += "						<tr>\n";
	updateFrm += "							<td width=\"100%\">\n";
	updateFrm += "								<table width=\"100%\">\n";
	updateFrm += "									<tr>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Total_Trip_Capacity)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														<span class=\"mandatory\">&nbsp;</span>\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td class=\"infotext\">\n";
	updateFrm += "														" + tanker_list_tab[i][15] + "\n";
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Last_Depot)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														&nbsp;\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td>\n";
	updateFrm += "                       									<select class=\"smallselect\" id=\"last_depot\" name=\"last_depot\" >\n";
	updateFrm += displayDropList(tanker_list_tab[i][14],terminal,ml(t__Select_A_Last_Depot));
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "									</tr>\n";
	updateFrm += "									<tr>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Total_Trip_Compartment)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														<span class=\"mandatory\">&nbsp;</span>\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td class=\"infotext\">\n";
	updateFrm += "														" + tanker_list_tab[i][17] + "\n";
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Destination)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														&nbsp;\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td>\n";
	updateFrm += "                       									<select class=\"smallselect\"  id=\"dest_depot\" name=\"dest_depot\" >\n";
	updateFrm += displayDropList(tanker_list_tab[i][16],terminal,ml(t__Select_A_Destination));
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "									</tr>\n";
	updateFrm += "									<tr>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Current_Depot)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														&nbsp;\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td>\n";
	updateFrm += "                       									<select class=\"smallselect\" id=\"cur_depot\" name=\"cur_depot\" >\n";
	updateFrm += displayDropList(tanker_list_tab[i][18],terminal,ml(t__Select_A_Current_Depot));
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "									</tr>\n";
	updateFrm += "								</table>\n";
	updateFrm += "							</td>\n";
	updateFrm += "						</tr>\n";
	updateFrm += "						<tr>\n";
	updateFrm += "							<td align=\"center\">\n";
	updateFrm += "								<table>\n";
	updateFrm += "									<tr>\n";
	updateFrm += "										<td align=\"center\" width=\"30%\" class=\"infotext\">\n";
	updateFrm += "											<input type=\"hidden\" name=\"depot\" id=\"depot\" value=\""+depot+"\" />\n";
	updateFrm += "											<input type=\"hidden\" name=\"cmpy\" id=\"cmpy\" value=\""+cmpy+"\" />\n";

	if(op == 17)
		updateFrm += "											<input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+tanker+"\" />\n";
	updateFrm += "											<input type=\"hidden\" name=\"op\" id=\"op\" value=\""+op+"\" />\n";
	updateFrm += "											<input type=\"hidden\" name=\"cmd\" id=\"cmd\" value=\""+cmd+"\" />\n";
	updateFrm += "											<input type=\"submit\" value=\"" + button + "\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	updateFrm += "										</td>\n";

	if(state != 7){
	updateFrm += "										<td align=\"center\" width=\"40%\" class=\"infotext\">\n";
		updateFrm += "											<input type=\"Button\" value =\""+ml(t__Create_Default_Equipment)+"\" class=\"just_button\" style=\"width:160px\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" onClick=\"createDefault();\" />\n";
	updateFrm += "										</td>\n";
	}
	else {
//		updateFrm += "											&nbsp;\n";
	}

/*	don't use this one because it has different CSS style compared with form buttons
	updateFrm += "										<td align=\"center\" width=\"40%\" class=\"infotext\">\n";
	updateFrm += "										<div class=\"button\">\n";
	if(state == 7){
		updateFrm += "										<a href=\"tanker_list.cgi?op=42&depot="+depot+"&cmpy="+cmpy+"&tanker="+tanker+"&eqpt_type="+eqpt_type+"\">"+ml(t__Configure)+"</a>&nbsp;\n";
	}else{
		updateFrm += "										<a href=\"#\" onClick=\"createDefault();\">"+ml(t__Create_Default_Equipment)+"</a>&nbsp;\n";
	}
	updateFrm += "										</div>\n";
	updateFrm += "										</td>\n";
*/
	updateFrm += "										<td align=\"center\" width=\"30%\" class=\"infotext\">\n";
	updateFrm += "											<input type=\"Reset\" value =\""+ml(t__Reset)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	updateFrm += "										</td>\n";
	updateFrm += "									</tr>\n";
	updateFrm += "								</table>\n";
	updateFrm += "							</td>\n";
	updateFrm += "						</tr>\n";
	updateFrm += "					</table>\n";
	updateFrm += "			</div>\n";
	updateFrm += "		</td>\n";
	updateFrm += "	</tr>\n";

	updateFrm += "	</form>\n";

	return updateFrm;
} //End update Form
//BugZilla Id 2406 this function will display the form
//to update the expiry dates of all tankers 
function updateExpiryDateForm(state)
{
	var button ="";
	var required = "";
	var inputType = "";
	var selectType = "";
	var tankerCode = "";
	var vallicexp = "";
	var valdelexp = "";
	var valinsexp = "";
	var cmd="";
    var inptdisable = "";
	var i = 0;
	var tankerInput = "";

	op = 10 + state;
	
	button = ml(t__Modify);
	required= "";
	inputType = "hidden";
	selectType = "disabled";
	tankerCode = "";
	cmd="MOD";
	i=1;
	vallicexp = "value="+disp_todayDate('yyyy-MM-dd');
	valdelexp = vallicexp;
	valinsexp = vallicexp;
	inptdisable = "disabled";




	var updateFrm = "";
	updateFrm += "	<tr>\n";
	updateFrm += "		<td align=\"center\">\n";
	updateFrm += "			<div class=\"button\">\n";
	updateFrm += "				<a href=\"tanker_list.cgi?depot="+depot+"&cmpy="+cmpy+"&pg="+pg+"&op=0\">"+ml(t__Back_to_Tanker_List)+"</a></div><br>\n";
	updateFrm += "		</td>\n";
	updateFrm += "	</tr>\n";
	updateFrm += "	<form name=\"updateFrm\" method=\"get\" id=\"updateFrm\" onsubmit=\"return submitUpdform(this);\">\n";
	updateFrm += "	<tr>\n";
	updateFrm += "		<td>\n";

	updateFrm += " 			<ul id=\"tabmenu\">\n";
	updateFrm += "			<li>"+ml(t__Update_Tkr_Expiry)+"</li>\n";
	updateFrm += "			</ul>\n";
	updateFrm += "			<div class=\"adminform\">\n";

	updateFrm += "			<table width=\"100%\">\n";
	updateFrm += "			<tr>\n";
	updateFrm += "				<td class=\"infotext\" width=\"100%\">\n";
	updateFrm += 								ml(t__All_the_fields_labelled_with_an)+" (<span style=\"COLOR: #FF0000;\">*</span>)"+ml(t__are_mandatory)+"\n";
	updateFrm += "				</td>\n";
	updateFrm += "			</tr>\n";
	updateFrm += "			<tr>\n";
	updateFrm += "				<td width=\"100%\" >\n";
	updateFrm += "					<table width=\"100%\">\n";
	updateFrm += "						<tr rowspan=\"2\">\n";
	updateFrm += "							<td width=\"50%\" >\n";
	updateFrm += "								<table>\n";
	updateFrm += "									<tr>\n";
	updateFrm += "										<td class=\"infotextheadingtd\" width=\"140\">\n";
	updateFrm += "											<input type=\"radio\" name=\"tkr_select\" id=\"tkr_select\" value=\"A_TANKER\" onclick=\"document.updateFrm.tanker.disabled=false;\" \/> &nbsp;\n";

	updateFrm += ml(t__Tanker_Code)+":\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "											<span class=\"mandatory\">" + required + "</span>\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td>\n";
	
	updateFrm += "											<table class=\"NewActionBaseTable\">\n";
	updateFrm += "											<tbody>\n";
	updateFrm += "											<tr>\n";
	updateFrm += "												<td class=\"popupLinkrow\">\n";
	updateFrm += "													<input type=\"text\" name=\"tanker\" id=\"tanker\" value=\"\" style=\"FONT-SIZE:1.00em\" msg=\""+ml(t__Select_a_tanker)+"\" "+tankerInput+" />\n"; 
	updateFrm += "												</td>\n";
	updateFrm += "											<td width=\"15\">\n";
	updateFrm += "											<img src=\"/images/dropimage.gif\" width=\"15\" height=\"16\" onclick=\"if(document.updateFrm.carrier[document.updateFrm.carrier.selectedIndex].value!=''){as1.doAjaxRequest();}else{alert('"+ml(t__Select_Carrier)+"');}\">\n";
	updateFrm += "												</td>\n";
	updateFrm += "													</tr>\n";
	updateFrm += "														</tbody>\n";
	updateFrm += "													</table>\n";

	updateFrm += "										</td>\n";
	
	
	updateFrm += "									</tr>\n";
	
	updateFrm += "									<tr>\n";
	updateFrm += "										<td class=\"infotextheadingtd\" width=\"140\">\n";
	updateFrm += "											<input type=\"radio\" name=\"tkr_select\" id=\"tkr_select\" value=\"ALL_TANKER\" onclick=\"document.updateFrm.tanker.value=''; document.updateFrm.tanker.disabled=true;\" \/> &nbsp;\n";

	updateFrm += ml(t__Any_ALL)+"\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "											<span class=\"mandatory\">" + required + "</span>\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td>\n";
	updateFrm += "											&nbsp;\n";

	

	updateFrm += "										</td>\n";
	
	
	updateFrm += "									</tr>\n";
	updateFrm += "								</table>\n";
	updateFrm += "							</td>\n";
	updateFrm += "							<td width=\"50%\">\n";
	updateFrm += "								<table>\n";
	updateFrm += "									<tr>\n";
	updateFrm += "										<td class=\"infotextheadingtd\" width=\"140\">\n";
	updateFrm += ml(t__Carrier_Name)+":\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														<span class=\"mandatory\">*</span>\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td>\n";  
	updateFrm += "															<select NAME=\"carrier\" id=\"carrier\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_Carrier)+"\" onchange=\"checkCarrier();\" >\n";
	updateFrm += displayDropList(cmpy, carrier, ml(t__Select_A_Carrier));
	updateFrm += "										</td>\n";
	updateFrm += "									</tr>\n";
	updateFrm += "								</table>\n";
	updateFrm += "							</td>\n";
	updateFrm += "						</tr>\n";
	//End the First Row
	
	//Start the 2nd Row
	updateFrm += "									<tr>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"140\">\n";
	updateFrm += ml(t__Depot)+":\n";
	updateFrm += "</td>\n";
	updateFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "<span class=\"mandatory\">&nbsp;</span>\n";
	updateFrm += "</td>\n";
	updateFrm += "<td class=\"infotext\">\n";
	updateFrm += "	" + depot + "\n";
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	updateFrm += "</table>\n";
	updateFrm += "</td>\n";
	updateFrm += "<td width=\"50%\">\n";
	updateFrm += "<table>\n";
	updateFrm += "<tr>\n";
	updateFrm += "<td class=\"infotextheadingtd\" width=\"140\">\n";
	updateFrm += ml(t__Manager_Name)+":\n";
	updateFrm += "</td>\n";
	updateFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "<span class=\"mandatory\">&nbsp;</span>\n";
	updateFrm += "</td>\n";
	updateFrm += "<td class=\"infotext\">\n";
	updateFrm += "	" + disp_cmpy_name(cmpy) + "\n";
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	updateFrm += "</table>\n";
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	//End the 2nd Row
	
	//Start the 3rd, 4th 5th Row
	updateFrm += "						<tr>\n";
	updateFrm += "							<td width=\"100%\">\n";
	updateFrm += "								<table width=\"100%\">\n";
	updateFrm += "									<tr>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"140\">\n";
	updateFrm += ml(t__Licence_Expiry)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														&nbsp;\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td class=\"infotext\">\n";
	updateFrm += "														<table width=\"100%\">\n";
	updateFrm += "  															<tr>\n";
	updateFrm += "      															<td>\n";
	updateFrm += "      													 			<input type=\"text\" name=\"lic_expr\" id=\"lic_expr\" size=\"20\" msg=\""+ml(t__Enter_Licence_Expiry_Date)+"\" "+vallicexp+" readonly=\"true\">\n";
	updateFrm += "      													 		 </td>\n";
	updateFrm += "      													 		 <td class=\"infotextheading\" align=\"left\">\n";
	// replacing with the common function call updateFrm += "      													 			<A HREF=\"#\" onClick=\"cal.select(document.forms[0].lic_expr,'anchor0','yyyy-MM-dd'); return false;\" TITLE=\"cal.select(document.forms[0].lic_expr,'anchor0','yyyy-MM-dd'); return false;\" NAME=\"anchor0\" ID=\"anchor0\">"+ml(t__Select_Date)+"</A>													 			\n";
	updateFrm += dateURL_HTML("document.forms[0].lic_expr", "anchor0",dateFormat,ml(t__Select_Date));

	updateFrm += "      													 		 </td>\n";
	updateFrm += "  													 		</tr>\n";
	updateFrm += "													 	</table>\n";
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "										&nbsp;\n";
	updateFrm += "										</td>\n";
	updateFrm += "									</tr>\n";
	updateFrm += "									<tr>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"140\">\n";
	updateFrm += ml(t__Delivery_Goods_Expiry)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														&nbsp;\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td>\n";
	updateFrm += "														<table width=\"100%\">\n";
	updateFrm += "  															<tr>\n";
	updateFrm += "      															<td>\n";
	updateFrm += "      													 			<input type=\"text\" name=\"delv_expr\" id=\"delv_expr\" size=\"20\" msg=\""+ml(t__Enter_Delivery_Goods_Expiry_Date)+"\" "+valdelexp+" readonly=\"true\">\n";
	updateFrm += "      													 		 </td>\n";
	updateFrm += "      													 		 <td class=\"infotextheading\" align=\"left\">\n";
	// replacing with the commond date function call updateFrm += "      													 			<A HREF=\"#\" onClick=\"cal.select(document.forms[0].delv_expr,'anchor1','yyyy-MM-dd'); return false;\" TITLE=\"cal.select(document.forms[0].delv_expr,'anchor1','yyyy-MM-dd'); return false;\" NAME=\"anchor1\" ID=\"anchor1\">"+ml(t__Select_Date)+"</A>													 			\n";
	updateFrm += 	dateURL_HTML("document.forms[0].delv_expr", "anchor1",dateFormat,ml(t__Select_Date));
	updateFrm += "      													 		 </td>\n";
	updateFrm += "  													 		</tr>\n";
	updateFrm += "													 	</table>\n";
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "										&nbsp;\n";
	updateFrm += "										</td>\n";
	updateFrm += "									</tr>\n";
	updateFrm += "									<tr>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "											<table>\n";
	updateFrm += "												<tr>\n";
	updateFrm += "													<td class=\"infotextheadingtd\" width=\"140\">\n";
	updateFrm += ml(t__Insurance_Expiry)+":\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "														&nbsp;\n";
	updateFrm += "													</td>\n";
	updateFrm += "													<td>\n";
	updateFrm += "														<table width=\"100%\">\n";
	updateFrm += "  															<tr>\n";
	updateFrm += "      															<td>\n";
	updateFrm += "      													 			<input type=\"text\" name=\"ins_expr\" id=\"ins_expr\" size=\"20\" msg=\""+ml(t__Enter_Insurance_Expiry_Date)+"\" "+valinsexp+"  readonly=\"true\">\n";
	updateFrm += "      													 		 </td>\n";
	updateFrm += "      													 		 <td class=\"infotextheading\" align=\"left\">\n";
	//replaced with the common function call	updateFrm += "      													 			<A HREF=\"#\" onClick=\"cal.select(document.forms[0].ins_expr,'anchor2','yyyy-MM-dd'); return false;\" TITLE=\"cal.select(document.forms[0].ins_expr,'anchor2','yyyy-MM-dd'); return false;\" NAME=\"anchor2\" ID=\"anchor2\">"+ml(t__Select_Date)+"</A>													 			\n";
	updateFrm += dateURL_HTML("document.forms[0].ins_expr", "anchor2",dateFormat,ml(t__Select_Date));

	updateFrm += "      													 		 </td>\n";
	updateFrm += "  													 		</tr>\n";
	updateFrm += "													 	</table>\n";
	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td width=\"50%\">\n";
	updateFrm += "										&nbsp;\n";
	updateFrm += "										</td>\n";
	updateFrm += "									</tr>\n";
	updateFrm += "								</table>\n";
	updateFrm += "							</td>\n";
	updateFrm += "						</tr>\n";
	//End the 3rd, 4th, 5th Row
	updateFrm += "					</table>\n";
	updateFrm += "				</td>\n";
	updateFrm += "			</tr>\n";
	
	//Putting the buttons here
	updateFrm += "			<tr>\n";
	updateFrm += "				<td align=\"center\">\n";
	updateFrm += "					<table>\n";
	updateFrm += "						<tr>\n";
	updateFrm += "							<td align=\"center\" width=\"100%\" class=\"infotext\">\n";
	updateFrm += "									<input type=\"hidden\" name=\"depot\" id=\"depot\" value=\""+depot+"\" />\n";
	updateFrm += "									<input type=\"hidden\" name=\"cmpy\" id=\"cmpy\" value=\""+cmpy+"\" />\n";
	updateFrm += "									<input type=\"hidden\" name=\"cmd\" id=\"cmd\" value=\""+cmd+"\" />\n";
	updateFrm += "									<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"1\" />\n";
	updateFrm += "									<input type=\"hidden\" name=\"op\" id=\"op\" value=\""+op+"\" />\n";	
	updateFrm += "									<input type=\"submit\" value=\"" + button + "\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	updateFrm += "									<input type=\"Reset\" value =\""+ml(t__Reset)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	updateFrm += "							</td>\n";
	updateFrm += "						</tr>\n";
	updateFrm += "					</table>\n";
	updateFrm += "				</td>\n";
	updateFrm += "			</tr>\n";
	
	//End Putting the buttons here
	updateFrm += "		</table>\n";
	updateFrm += "	</td>\n";
	updateFrm += "	</tr>\n";
	
	

	updateFrm += "	</form>\n";

	return updateFrm;
} //End  of update expiry dates Form

function deleteForm()
{
	var deleteFrm = "";
	deleteFrm += "	<tr>\n";
	deleteFrm += "		<td align=\"center\">\n";
	deleteFrm += "			<div class=\"button\"><a href=\"tanker_list.cgi?depot="+depot+"&pg="+pg+"&cmpy="+cmpy+"&op=0\">"+ml(t__Back_to_Tanker_List)+"</a></div><br>\n";
	deleteFrm += "		</td>\n";
	deleteFrm += "	</tr>\n";
	deleteFrm += "	<tr>\n";
	deleteFrm += "		<td>\n";

	deleteFrm += " <ul id=\"tabmenu\">\n";
	deleteFrm += "<li>"+ml(t__Tanker_Details)+"</li>\n";
	deleteFrm += "</ul>\n";
	deleteFrm += "<div class=\"adminform\">\n";

	deleteFrm += "					<form name=\"deleteFrm\" method=\"post\" id=\"deleteFrm\" onsubmit=\"return submitmyform(this)\">\n";
	deleteFrm += "							<table width=\"100%\">\n";
	deleteFrm += "								<tr>\n";
	deleteFrm += "									<td class=\"infotext\" width=\"100%\">\n";

	if ( ldsch == 0 ) {
		deleteFrm += ml( t__Do_you_wish_to_delete_this_row );
	} else {
		deleteFrm += "	 <span style=\"COLOR: #FF0000;\">" +ml(t__This_Tanker_has_been_schedule_to_load)+ "</span> \n";
	}

	deleteFrm += "									</td>\n";
	deleteFrm += "								</tr>\n";
	deleteFrm += "								<tr>\n";
	deleteFrm += "									<td width=\"100%\">\n";
	deleteFrm += "										<table width=\"100%\">\n";
	deleteFrm += "											<tr>\n";
	deleteFrm += "												<td width=\"50%\">\n";
	deleteFrm += "													<table>\n";
	deleteFrm += "														<tr>\n";
	deleteFrm += "															<td class=\"infotextheadingtd\" width=\"100\">\n";
	deleteFrm += ml(t__Tanker_Code)+":\n";
	deleteFrm += "															</td>\n";
	deleteFrm += "															<td class=\"infotext\">\n";
	deleteFrm += "																" + tanker_list_tab[1][0] + "\n";
	deleteFrm += "															</td>\n";
	deleteFrm += "														</tr>\n";
	deleteFrm += "													</table>\n";
	deleteFrm += "												</td>\n";
	deleteFrm += "												<td width=\"50%\">\n";
	deleteFrm += "												</td>\n";
	deleteFrm += "											</tr>\n";
	deleteFrm += "										</table>\n";
	deleteFrm += "									</td>\n";
	deleteFrm += "								</tr>\n";
	deleteFrm += "								<tr>\n";
	deleteFrm += "									<td align=\"center\">\n";
	deleteFrm += "										<table>\n";
	deleteFrm += "											<tr>\n";
	deleteFrm += "												<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	deleteFrm += "													\n";

	if ( ldsch == 0 ) {
		deleteFrm += "													<input type=\"hidden\" name=\"depot\" value=\"" + depot + "\" />\n";
		deleteFrm += "													<input type=\"hidden\" name=\"cmpy\" value=\"" + cmpy + "\" />\n";
		deleteFrm += "													<input type=\"hidden\" name=\"tanker\" value=\"" + tanker_list_tab[1][0] + "\" />\n";
		deleteFrm += "													<input type=\"hidden\" name=\"op\" value=\"19\" />\n";
		deleteFrm += "													<input type=\"hidden\" name=\"cmd\" value=\"DEL\" />\n";
		deleteFrm += "													<input type=\"submit\" value=\""+ml(t__Delete)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	}

	deleteFrm += "												</td>\n";
	deleteFrm += "											</tr>\n";
	deleteFrm += "										</table>\n";
	deleteFrm += "									</td>\n";
	deleteFrm += "								</tr>\n";
	deleteFrm += "							</table>\n";
	deleteFrm += "					</form>\n";
	deleteFrm += "			</div>\n";
	deleteFrm += "		</td>\n";
	deleteFrm += "	</tr>\n";  

	return deleteFrm;
}


function findForm()
{
	var findFrm = "";
	findFrm += "	<tr>\n";
	findFrm += "		<td align=\"center\">\n";
	findFrm += "			<div class=\"button\"><a href=\"tanker_list.cgi?depot="+depot+"&pg="+pg+"&cmpy="+cmpy+"&op=0\">"+ml(t__Back_to_Tanker_List)+"</a></div><br>\n";
	findFrm += "		</td>\n";
	findFrm += "	</tr>\n";
	findFrm += "	<tr>\n";
	findFrm += "		<td>\n";

	findFrm += " <ul id=\"tabmenu\">\n";
	findFrm += "<li>"+ml(t__Tanker_Search)+"</li>\n";
	findFrm += "</ul>\n";
	findFrm += "<div class=\"adminform\">\n";

	findFrm += "					<form name=\"findFrm\" method=\"post\" id=\"findFrm\" onsubmit=\"return submitmyform(this)\">\n";
	findFrm += "							<table width=\"100%\">\n";
	findFrm += "								<tr>\n";
	findFrm += "									<td width=\"100%\">\n";
	findFrm += "										<table width=\"100%\">\n";
	findFrm += "											<tr>\n";
	findFrm += "												<td width=\"50%\">\n";
	findFrm += "													<table>\n";
	findFrm += "														<tr>\n";
	findFrm += "															<td class=\"infotextheadingtd\" width=\"100\">\n";
	findFrm += ml(t__Tanker_Code)+":\n";
	findFrm += "															</td>\n";
	findFrm += "															<td>\n";
	findFrm += "																<input type=\"text\" name=\"tanker\" />\n";
	findFrm += "															</td>\n";
	findFrm += "														</tr>\n";
	findFrm += "													</table>\n";
	findFrm += "												</td>\n";
	findFrm += "												<td width=\"50%\">\n";
	findFrm += "												</td>\n";
	findFrm += "											</tr>\n";
	findFrm += "										</table>\n";
	findFrm += "									</td>\n";
	findFrm += "								</tr>\n";
	findFrm += "								<tr>\n";
	findFrm += "									<td align=\"center\">\n";
	findFrm += "										<table>\n";
	findFrm += "											<tr>\n";
	findFrm += "												<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	findFrm += "													<input type=\"hidden\" name=\"depot\" value=\""+depot+"\" />\n";
	findFrm += "													<input type=\"hidden\" name=\"cmpy\" value=\""+cmpy+"\" />\n";
	findFrm += "													<input type=\"hidden\" name=\"op\" value=\"15\" />\n";
	findFrm += "													<input type=\"hidden\" name=\"pg\" value=\"1\" />\n";
	findFrm += "													<input type=\"submit\" value=\""+ml(t__Find)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	findFrm += "												</td>\n";
	findFrm += "											</tr>\n";
	findFrm += "										</table>\n";
	findFrm += "									</td>\n";
	findFrm += "								</tr>\n";
	findFrm += "							</table>\n";
	findFrm += "					</form>\n";
	findFrm += "			</div>\n";
	findFrm += "		</td>\n";
	findFrm += "	</tr>\n";  

	return findFrm;
}



function configureForm()
{
	//op += 10;
	var configureFrm = "";
	configureFrm += "	<tr>\n";
	configureFrm += "		<td align=\"center\">\n";
	configureFrm += "			<div class=\"button\">\n";
	configureFrm += "				<a href=\"tanker_list.cgi?depot="+depot+"&pg="+pg+"&cmpy="+cmpy+"&op=0\">"+ml(t__Back_to_Tanker_List)+"</a>&nbsp;\n";
	configureFrm += "			</div><br>\n";
	configureFrm += "		</td>\n";
	configureFrm += "	</tr>\n";
	configureFrm += displayStatusMsg (op);
	configureFrm += "	<form name=\"confFrm\" id=\"confFrm\" onsubmit=\"return Validator.Validate(this,1);\">\n";
	configureFrm += "	<tr>\n";
	configureFrm += "		<td>\n";

	configureFrm += table_begin("M", 1,"");
	configureFrm += "<tbody> \n";

	//Just Add a new Tanker
	if(op == 48){
		//Fix the Bug Id 1805, no need to show the table row and table cell
		//configureFrm += "					<tr>\n";
		//configureFrm += "						<td>\n";
		configureFrm += "<input type=\"hidden\" name=\"carrier\" value=\""+carrier_code+"\" />\n";
		configureFrm += "<input type=\"hidden\" name=\"eqpt_type\" value=\""+eqpt_type+"\" />\n";
		configureFrm += "<input type=\"hidden\" name=\"trips\" value=\""+trips+"\" />\n";
		configureFrm += "<input type=\"hidden\" name=\"lic_expr\" value=\""+lic_expr+"\" />\n";
		configureFrm += "<input type=\"hidden\" name=\"delv_expr\" value=\""+delv_expr+"\" />\n";
		configureFrm += "<input type=\"hidden\" name=\"ins_expr\" value=\""+ins_expr+"\" />\n";
		configureFrm += "<input type=\"hidden\" name=\"lock\" value=\""+lock+"\" />\n";
		configureFrm += "<input type=\"hidden\" name=\"active\" value=\""+active+"\" />\n";
		configureFrm += "<input type=\"hidden\" name=\"bay_check\" value=\""+bay_check+"\" />\n";
		configureFrm += "<input type=\"hidden\" name=\"last_depot\" value=\""+last_depot+"\" />\n";
		configureFrm += "<input type=\"hidden\" name=\"dest_depot\" value=\""+dest_depot+"\" />\n";
		configureFrm += "<input type=\"hidden\" name=\"cur_depot\" value=\""+cur_depot+"\" />\n";
		configureFrm += "<input type=\"hidden\" name=\"prompt\" value=\""+prompt+"\" />\n";
		configureFrm += "<input type=\"hidden\" name=\"cmd\" value=\"ADD\" />\n";
		//configureFrm += "						</td>\n";  
		//configureFrm += "					</tr>\n";
	}

	configureFrm += "						<tr>\n";

	for(var i=0; i<myConf.length; i++)
	{
		configureFrm += "						<td>"+myConf[i]+"<\/td>\n";
	}
	configureFrm += "						</tr>\n";


	for(i in conf_list_tab)
	{
		configureFrm += "					<tr class=\"row1\">\n";
		if(i>0) 
		{

			for(var j=0; j<myConf.length; j++)
			{

				configureFrm += "<td>\n";				  
				if(j==0) // means time to display the drop list and table
				{
					configureFrm +="       <table border=\"0\">\n";
					configureFrm +="	       <tr>\n";
					configureFrm +="<td width=\"100\"> <span style=\"COLOR: #FF0000;\">"+obs(conf_list_tab[i][j])+"</span>\n";
					configureFrm +="                 </td>\n";
					configureFrm +="	       </tr>\n";
					configureFrm +="	  	</table>\n";
				}
				else if(j == 2)
				{

					var eqpt_list = new Array();
					eqpt_list = equip_list[i];
					//configureFrm += obs(conf_list_tab[i][j]);
configureFrm += "<select name=\"eqpt_"+conf_list_tab[i][4]+"\" id=\"eqpt_"+conf_list_tab[i][4]+"\" dataType=\"Require\" msg=\""+ml(t__Select_An_Equipment_Code)+"\" class=\"compulsoryselect\">\n";
					configureFrm += specialDropList(conf_list_tab[i][j], equip_list[i], ml(t__Select_An_Equipment));
				}
				else
				{
					configureFrm += obs(conf_list_tab[i][j]);
				}

				configureFrm += "<\/td>\n";

			}

		} // end if to check rows

		configureFrm += "\n";
		configureFrm += "</tr>\n";

	}//end loop on conf list
	configureFrm += "				<\/tbody>\n";
	configureFrm += "			<\/table>\n";


	configureFrm += "		</td>\n";
	configureFrm += "	</tr>\n";  
	configureFrm += "	<tr>\n";
	configureFrm += "		<td align=\"center\"class=\"infotext\">\n";
	configureFrm +="<input type=\"hidden\" name=\"depot\" id=\"depot\" value=\""+depot+"\">\n";
	configureFrm +="<input type=\"hidden\" name=\"cmpy\" id=\"cmpy\" value=\""+cmpy+"\">\n";
	configureFrm +="<input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+tanker+"\">\n";
	configureFrm +="<input type=\"hidden\" name=\"eqpt_type\" id=\"eqpt_type\" value=\""+eqpt_type+"\">\n";
	configureFrm +="<input type=\"hidden\" name=\"n_comp\" id=\"n_comp\" value=\""+n_comp+"\">\n";
	// Fix the Bug Id 1803 Dont need Active apart from the time when adding new tanker 
	// configureFrm +="<input type=\"hidden\" name=\"active\" id=\"active\" value=\""+ active +"\">\n";
	configureFrm +="<input type=\"hidden\" name=\"op\" id=\"op\" value=\"54\">\n";
	configureFrm += "			<input type=\"submit\" value=\""+ml(t__Save)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	configureFrm += "		</td>\n";
	configureFrm += "	</tr>\n";
	configureFrm += "	</form>\n";
	

	return configureFrm;
}


function setForm()
{
	var i = 1;
	var setFrm = "";
	setFrm += "	<tr>\n";
	setFrm += "		<td align=\"center\">\n";
	setFrm += "			<div class=\"button\">\n";
	setFrm += "				<a href=\"tanker_list.cgi?depot="+depot+"&cmpy="+cmpy+"&tanker="+tanker+"&op=2\">Back to Tanker Configuration</a></div><br>\n";
	setFrm += "		</td>\n";
	setFrm += "	</tr>\n";
	setFrm += "	<form name=\"setFrm\" method=\"get\" id=\"setFrm\" onsubmit=\"return submitmyform(this)\">\n";
	setFrm += "	<tr>\n";
	setFrm += "		<td>\n";

	setFrm += " <ul id=\"tabmenu\">\n";
	setFrm += "<li>"+ml(t__Tanker_Details)+"</li>\n";
	setFrm += "</ul>\n";
	setFrm += "<div class=\"adminform\">\n";

	setFrm += "					<table width=\"100%\">\n";
	setFrm += "						<tr>\n";
	setFrm += "							<td class=\"infotext\" width=\"100%\">\n";
	setFrm += ml(t__All_the_fields_labelled_with_an)+" (<span style=\"COLOR: #FF0000;\">*</span>) "+ml(t__are_mandatory)+"\n";
	setFrm += "							</td>\n";
	setFrm += "						</tr>\n";
	setFrm += "						<tr>\n";
	setFrm += "							<td width=\"100%\">\n";
	setFrm += "								<table width=\"100%\">\n";
	setFrm += "									<tr>\n";
	setFrm += "										<td width=\"50%\">\n";
	setFrm += "											<table>\n";
	setFrm += "												<tr>\n";
	setFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	setFrm += ml(t__Sequence)+":\n";
	setFrm += "													</td>\n";
	setFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	setFrm += "														<span class=\"mandatory\">&nbsp;</span>\n";
	setFrm += "													</td>\n";
	setFrm += "													<td class=\"infotext\">\n";
	setFrm += "														" + seqNo + "\n";
	setFrm += "													</td>\n";
	setFrm += "												</tr>\n";
	setFrm += "											</table>\n";
	setFrm += "										</td>\n";
	setFrm += "										<td width=\"50%\">\n";
	setFrm += "											<table>\n";
	setFrm += "												<tr>\n";
	setFrm += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	setFrm += ml(t__Component_Type)+":\n";
	setFrm += "													</td>\n";
	setFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	setFrm += "														<span class=\"mandatory\">&nbsp;</span>\n";
	setFrm += "													</td>\n";
	setFrm += "													<td class=\"infotext\">\n";  
	setFrm += "														" + component + "\n";
	setFrm += "													</td>\n";
	setFrm += "												</tr>\n";
	setFrm += "											</table>\n";
	setFrm += "										</td>\n";
	setFrm += "									</tr>\n";
	setFrm += "									<tr>\n";
	setFrm += "										<td width=\"50%\">\n";
	setFrm += "											<table>\n";
	setFrm += "												<tr>\n";
	setFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	setFrm += ml(t__Equipment_Code)+":\n";
	setFrm += "													</td>\n";
	setFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	setFrm += "														<span class=\"mandatory\">*</span>\n";
	setFrm += "													</td>\n";
	setFrm += "													<td>\n";
	setFrm += "														<select name=\"eqpt\" id=\"eqpt\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_An_Equipment_Code)+"\">\n";
	setFrm += specialDropList(equip, equip_jslst, ml(t__Select_An_Equipment));
	setFrm += "													</td>\n";
	setFrm += "												</tr>\n";
	setFrm += "											</table>\n";
	setFrm += "										</td>\n";
	setFrm += "										<td width=\"50%\">\n";
	setFrm += "										</td>\n";
	setFrm += "									</tr>\n";
	setFrm += "								</table>\n";
	setFrm += "							</td>\n";
	setFrm += "						</tr>\n";
	setFrm += "						<tr>\n";
	setFrm += "							<td align=\"center\">\n";
	setFrm += "								<table>\n";
	setFrm += "									<tr>\n";
	setFrm += "										<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	setFrm += "											<input type=\"hidden\" name=\"depot\" id=\"depot\" value=\""+depot+"\" />\n";
	setFrm += "											<input type=\"hidden\" name=\"cmpy\" id=\"cmpy\" value=\""+cmpy+"\" />\n";
	setFrm += "											<input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+tanker+"\" />\n";
	setFrm += "											<input type=\"hidden\" name=\"seqNo\" id=\"seqNo\" value=\""+seqNo+"\" />\n";
	setFrm += "											<input type=\"hidden\" name=\"op\" id=\"op\" value=\"44\" />\n";
	setFrm += "											<input type=\"hidden\" name=\"cmd\" id=\"cmd\" value=\"set\" />\n";
	setFrm += "											<input type=\"submit\" value=\"Set\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	setFrm += "										</td>\n";
	setFrm += "										<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	setFrm += "											<input type=\"reset\" value =\""+ml(t__Reset)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	setFrm += "										</td>\n";
	setFrm += "									</tr>\n";
	setFrm += "								</table>\n";
	setFrm += "							</td>\n";
	setFrm += "						</tr>\n";
	setFrm += "					</table>\n";
	setFrm += "			</div>\n";
	setFrm += "		</td>\n";
	setFrm += "	</tr>\n";
	setFrm += "	</form>\n";

	return setFrm;
} //End set Form



function displayGlblFrm(cmpy,dep)
{
	var selected_cmpy = cmpy;
	var selected_dep = dep;
	var button = "";

	/* Enabled or Disabled Add Button */
	if(selected_cmpy == "-1")
	{
		button = "disabled";

	}
	
	


	var glblFrm = "";

	//glblFrm += " <tr>\n";
	//glblFrm += " 		<td align=\"left\">\n";

    glblFrm += fieldst_HTML(ml(t__Depot_and_Manager_details));
	glblFrm += "       	<form name=\"glblFrm\" id=\"glblFrm\">\n";
	glblFrm += "          	<input type=\"hidden\" name=\"op\" value=\"0\">\n";
	glblFrm += "          	<input type=\"hidden\" name=\"pg\" value=\"1\">\n";
	glblFrm += "          	<div class=\"adminform\">\n";
	glblFrm += ml(t__Select_the_Base_Depot_and_Manager__To_View_Tanker_List)+"\n";
	glblFrm += "             		<table>\n";
	glblFrm += "                		<tr>\n";
	glblFrm += "                   		<td class=\"infotextheading\">\n";
	glblFrm += ml(t__Depot)+":\n";
	glblFrm += "                   		</td>\n";
	glblFrm += "                   		<td>\n";
	glblFrm += "                       		<select id=\"depot\" name=\"depot\" onChange=\"checkDeptSelected(this);\"> \n";
	glblFrm += displayDrop_ShowDefSelected(selected_dep,terminal,ml(t__Select_A_Depot));
	glblFrm += "                   		</td>\n";
	glblFrm += "                		</tr>\n";

	glblFrm += "                		<tr>\n";
	glblFrm += "                   		<td class=\"infotextheading\">\n";
	glblFrm += ml(t__Manager)+":\n";
	glblFrm += "                   		</td>\n";
	glblFrm += "                   		<td>\n";
	glblFrm += "                       		<select name=\"cmpy\" id=\"cmpy\" onChange=\"checkCmpySelected(this);\"> \n";
	//glblFrm += displayDropList(selected_cmpy, manager, ml(t__Select_A_Manager));
	if (g.isMng=='Y')
	{
		glblFrm += displayDropList_any_All(selected_cmpy, manager, ml(t__Select_A_Manager), 'A');
	}
	else
	{
		glblFrm += displayDropList_any_All(selected_cmpy, manager, ml(t__Select_A_Manager), 'D');
	}
		
	glblFrm += "                       		<input type=\"button\" value=\""+ml(t__View)+"\" name=\"view\"   onclick=\"document.glblFrm.pg.value=1;document.glblFrm.op.value=0;document.glblFrm.submit();\" " + button + ">\n";
	if(priv >= 7)
	{
		glblFrm += "                       		<input type=\"button\" value=\""+ml(t__Add)+"\" name=\"add\"   onclick=\"document.glblFrm.pg.value=1;document.glblFrm.op.value=8;document.glblFrm.submit();\" " + button + ">\n";
	}	
	if(priv >= 6)
        {
                glblFrm += "                                    <input type=\"button\" value=\""+ml(t__Update_Tkr_Expiry)+"\" name=\"upd_expiry\"   onclick=\"document.glblFrm.pg.value=1;document.glblFrm.op.value=2;document.glblFrm.submit();\" " + button + ">\n";
        }

		
	if( (depot!="" && depot!="-1" && g.isMng=='Y') || (terminal.length==2))
	{
		button ="";
	}
	glblFrm += "                       		<input type=\"button\" value=\""+ml(t__Find)+"\" name=\"find\" id=\"find\"  onclick=\"document.glblFrm.pg.value=1;document.glblFrm.op.value=5;document.glblFrm.submit();\" " + button + ">\n";
	glblFrm += "                         	</td>\n";
	glblFrm += "                    	</tr>\n";

	glblFrm += "              	</table>\n";
	glblFrm += "\n";
	glblFrm += "            	</div>\n";
	glblFrm += "        	</form>\n";
	glblFrm += fieldstFoot_HTML();

//	glblFrm += " 		</td>\n";
//	glblFrm += "	</tr>\n";

	return glblFrm;

}


/* Function to translate company code to company name based on carrier/manager elements tab */

function disp_cmpy_name(txt) {

	for ( var c = 1; c < carrier.length  ; c++ ) {
		if ( txt ==  obs(carrier[c][0]) ) {
			 return carrier[c][1];
             break;
		}
	}
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

function assArray_keys(inputArr)
{
	var keys = new Array();
	for (var i in inputArr) {
		if (inputArr[i] != null) 
			keys.push(i);
	}
	return keys;
}


function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;
	if (op <= 1 || (op > 10 && op <40 && op != 18))
	{
		pageHeading +=ml(t__TANKER_LIST);
	}
	else if(op == 9)
	{
		pageHeading +=ml(t__DELETE_TANKER);
	}
	else if(op == 8)
	{
		pageHeading +=ml(t__ADD_NEW_TANKER);
	}
	else if(op == 7|| op == 2 || op == 12)
	{
		pageHeading +=ml(t__MODIFY_TANKER);
	}
	else if(op == 5)
	{
		pageHeading +=ml(t__FIND_TANKER);
	}
	//else if(op == 4)
	//{
	//   	pageHeading +=ml(t__SET_EQUIPMENT);
	//}
	else if(op == 3)
	{
		pageHeading +=ml(t__VIEW_TANKER);
	}
	else if(op == 18 || op > 40)
	{
		pageHeading +=ml(t__TANKER_CONFIGURATION);
	}



	return pageHeading;   
}

function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;
	if (op <= 1 || (op > 10 && op <40 && op != 18))
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Tanker_List_Page);

	}
	else if(op == 18 || op >40)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Tanker_Configuration_Page); 
	}
	else if(op == 3)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__View_Tanker_Page); 
	}
	// else if(op == 4)
	// {
	//   		pageTitle +="DKI Omega Menu :: LOAD SCHEDULES, Set Equipment Page"; 
	// }
	else if(op == 5)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Find_Tanker_Page); 
	}
	else if (op == 7 || op == 8)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Update_Tanker_Page);

	}
	else if(op == 9)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Delete_Tanker_Page);
	}
	else if(op == 2 || op == 12)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Update_Tanker_Page);
	}


	return pageTitle;
}


/* define function op_list() */
function op_list(priv, idx)
{
	/* priv = 
	   6 modify	op=1,2,3
	   7 add		op=4
	   8 delete	op=5
	 */
	var op_list ="";
	op_list +="<select name=op onchange=\"sendoption(this, '"+idx+"');\">          ";
	switch (priv)
	{
		case 8:
			op_list +="<option value=9>"+ml(t__DELETE)+"</option>";
		case 7:			
			op_list +="<option value=7>"+ml(t__MODIFY)+"</option>";
			op_list +="<option value=42>"+ml(t__CONFIGURE)+"</option>";
		case 6:

		case 5:			
			op_list +="<option value=3>"+ml(t__VIEW)+"</option>";

			break;
	}
	op_list +="<option value=0 selected>--\t"+ml(t__YOUR_ACTION)+"\t--</option>";
	op_list +="</select>                                        ";
	return op_list ;
}
//take the Suppliers and carriers
//as an input parameter and returns
// an array of suppliers and/or 
// carriers necessary for equipments
// and Tanker List Owners. 
function combine_two_arrays(inputArr1, inputArr2)
{
	var toReturn= new Array()
		toReturn[0] = ['',''];
	var counter = 1;
	for (var i in inputArr1) 
	{
		//toReturn.push(i);
		if(i!=0)
		{
			toReturn[counter] = [inputArr1[i][0],inputArr1[i][1] ];
			counter++;
		}

	}

	for (var j in inputArr2)
	{

		if (inputArr2[j][0] != null && (inputArr2[j][0] != ""))
		{
			var matchFound = false;
			for (var i in toReturn)
			{
				if ((inputArr2[j][0]==toReturn[i][0]) )
				{
					matchFound = true;        
				}      
			}
			if(!matchFound)
			{
				toReturn[counter] = [inputArr2[j][0],inputArr2[j][1] ];
				counter++;
					
			}
		}
	}

	return  toReturn;

}


/* define function op_list() NOT IN USED */
function op_list2()
{
	/* priv = 
	   6 modify	op=1,2,3
	   7 add		op=4
	   8 delete	op=5
	 */
	var op_list ="";
	op_list +="<select name=op onchange=\"submit();\">";

	switch (priv)
	{
		case 8:

		case 7:			

			op_list +="<option value=4>"+"SET EQUIPMENT"+"</option>";
		case 6:

		case 5:			

			break;
	}
	op_list +="<option value=2 selected>--\t"+ml(t__YOUR_ACTION)+"\t--</option>";
	op_list +="</select>                                        ";
	return op_list ;
}


function local_HeadrHTML( newPage, lang)
{
	newPage +="<SCRIPT src=\"/"+lang+"/js/CalendarPopup.js\"></SCRIPT>\n";
	newPage +="<SCRIPT LANGUAGE=\"JavaScript\">\n";
	newPage +="\n";
	newPage +="//Calendar Variable\n";
	newPage +="	var cal = new CalendarPopup();\n";
	newPage +="	cal.showYearNavigation();\n";
	newPage +="\n";  
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
	//newPage +="	var frm = document.getElementById('updateFrm');\n";
	//newPage +="	alert(frm.add.value);\n";
	newPage +="	return Validator.Validate(myobject,1);\n";
	newPage +="}\n";
	newPage +="function createDefault()\n";
	newPage +="{\n";
	newPage +="	var frm = document.getElementById('updateFrm');\n";
	newPage +="	var etp = frm.eqpt_type.options[frm.eqpt_type.selectedIndex].value;\n";
	newPage +="	var create = false;\n";
	newPage +="	if(etp == '') {\n";
	newPage +="		alert('"+ml(t__Select_an_Equipment_Type)+"');\n"; 
	newPage +="		frm.eqpt_type.focus();\n";
	newPage +="	} else {\n";
	newPage +="		for(i in isOnlyOneComponent) {\n";
	//newPage +="			alert(isOnlyOneComponent[i]);\n";
	newPage +="			if(etp == isOnlyOneComponent[i])\n";
	newPage +="				create = true;\n";
	newPage +="		}\n"; 
	newPage +="		if(create){\n";
	newPage +="			frm.cmd.value ='CREATE';\n";
	//newPage +="			return Validator.Validate(frm,1);\n";
	newPage +="			if(Validator.Validate(frm,1))\n";
	newPage +="				frm.submit();\n";
	newPage +="		} else {\n";
	newPage +="			alert('"+ml(t__Cannot_guess_codes_of_COMPOSED_Equipment_Types)+"');\n";
	newPage +="		}\n";
	newPage +="	}\n";  
	newPage +="}\n";
	newPage +="\n";
	newPage +="function saveConfig()\n";
	newPage +="{\n";
	newPage +="	//var myHiddenOb;\n";
	newPage +="	\n";
	newPage +="	//myHiddenOb = getElemRefs(\"prev_qstring\";\n";
	newPage +="	//myHiddenOb.value=produceQString(;\n";
	newPage +="	//return formcheck(myobject;\n";
	newPage +="	//return Validator.Validate(,1);\n";
	newPage +="	return document.getElementById('confFrm').submit();\n";
	newPage +="}\n";
	newPage +="\n";
	newPage +="\n";

	// WORKING HERE
	newPage +="//foward option \n";
	newPage +="function sendoption(element, idx)\n";
	newPage +="{\n";
	newPage +=" \n";
	newPage +="	var value = element.options[element.selectedIndex].value;\n";
	newPage +="	var frm = element.parentNode.parentNode.parentNode.parentNode.parentNode;\n";
	newPage +="	var lock = tanker_list_tab[idx][4];\n";
	newPage +="	var active = tanker_list_tab[idx][5];\n";
	newPage +="	var baycheck = tanker_list_tab[idx][6];\n";
	//newPage +="				alert(\" baycheck \"+baycheck+\" active \"+active+\" lock \"+lock);\n";
	newPage +="\n";
	newPage +="	switch (value)\n";
	newPage +="	{\n";
	newPage +="		case '9':\n";
	newPage +="			if(lock == 'Y')\n";
	newPage +="			{\n";
	newPage +="				alert(\""+ml(t__Locked_Tankers_cannot_be_deleted)+" \");\n";
	newPage +="				frm.reset();\n";
	newPage +="			}; \n";
	newPage +="			if(active == 'Y') \n";
	newPage +="			{\n";
	newPage +="				alert(\""+ml(t__Active_Tankers_cannot_be_deleted)+" \");\n";
	newPage +="				frm.reset();\n";
	newPage +="			}; \n";
	newPage +="			if(baycheck == 'Y')\n";
	newPage +="			{\n";
	newPage +="				alert(\""+ml(t__Bay_Checked_Tankers_cannot_be_deleted)+" \");\n";
	newPage +="				frm.reset();\n";
	newPage +="			}; \n";
	newPage +="			if ( lock == 'N' && active == 'N' && baycheck == 'N' ) {\n";
	newPage +="				frm.submit();\n";
	newPage +="			}\n";
	newPage +="			break;\n";
	newPage +="		default:\n";
	newPage +="			frm.submit();\n";
	newPage +="			break;\n";
	newPage +="	}\n";
	newPage +="}\n";
	newPage +="\n";

	newPage +="//Check existing equipcode \n";
	newPage +="function checkTankerCode(myobject)\n";
	newPage +="{\n";
	newPage +="	 if (Validator.Validate(myobject,1))\n";
	newPage +="	 {\n";
	newPage +="     var mycgi = '../../../cgi-bin/en/load_scheds/tkrlist_code_dup_check.cgi'; \n";
	newPage +="     var myqry = 'cmpy="+cmpy+"&tanker='+encodeURI(document.updateFrm.tanker.value) ;\n";
	newPage +="     var oTN = loadHtml(mycgi, myqry);\n";
	newPage +="	    if ( oTN != 0) { \n";
	newPage +="	           alert(' "+ml(t__ALERT_TKRCODE_EXIST)+"');\n";
	newPage +="	           document.updateFrm.tanker.value='';\n";
	newPage +="            return false; \n";
	newPage +="	     }\n";
  	newPage +="    return true; \n";	
	newPage +="	}\n";
	newPage +="    return false; \n";
	newPage +="}\n";
	//alert(g.toSource());
  
  	newPage +="//Function responsible for Enabling and Disabling the Function buttons \n";
	newPage +="function checkDeptSelected(myobject)\n";
	newPage +="{\n";
	newPage +="	 if(myobject.value!=\"-1\" && g.isMng=='Y' && (myobject.value!=\"\"))\n";
	newPage +="      {\n";

	newPage +="     	document.glblFrm.find.disabled = false; \n";
	newPage +="	 }\n";
	newPage +="	 else if(myobject.value==\"-1\" || (myobject.value==\"\"))\n";
	newPage +="      {\n";

	newPage +="     	document.glblFrm.find.disabled = true; \n";
	newPage +="	 }\n";

	
	newPage +="}\n";
  	newPage +="//Function responsible for Enabling and Disabling the Function buttons \n";
	newPage +="function checkCmpySelected(myobject)\n";
	newPage +="{\n";
	newPage +="	 if(myobject.value!=\"-1\" && (myobject.value!=\"\"))\n";
	newPage +="      {\n";
	newPage +="     	document.glblFrm.view.disabled = false; \n";
	newPage +="     	document.glblFrm.add.disabled = false; \n";
	newPage +="     	document.glblFrm.find.disabled = false; \n";
	newPage +="     	document.glblFrm.upd_expiry.disabled = false; \n";
	
	newPage +="	 }\n";
	newPage +="	 else if(myobject.value==\"-1\" && (myobject.value!=\"\"))\n";
	newPage +="      {\n";
	newPage +="     	document.glblFrm.view.disabled = true; \n";
	newPage +="     	document.glblFrm.add.disabled = true; \n";
	newPage +="     	document.glblFrm.find.disabled = true; \n";
	newPage +="     	document.glblFrm.upd_expiry.disabled = true; \n";
	newPage +="	 }\n";
	
	newPage +="	 if(myobject.value==\"-1\" && g.isMng=='Y' && (myobject.value!=\"\"))\n";
	newPage +="      {\n";
	newPage +="     	document.glblFrm.find.disabled = false; \n";
	newPage +="	 }\n";
	newPage +="}\n";

	newPage +="</script>\n";
	newPage +="\n";

	newPage +="</head>\n";
	newPage +="\n";
	newPage +="<body>\n";
	newPage +="\n";

	return (newPage);
}
//Set tanker to null if carrier has changed 
function checkCarrier()
{
	var currElement = getElemRefs('tanker');
	document.updateFrm.tanker.value = ''; 
	var myCarrier = document.updateFrm.carrier[document.updateFrm.carrier.selectedIndex].value;	
	
	if((myCarrier!=""))
	{
		currElement.disabled=false;
		document.updateFrm.tanker.focus();
		myQStr = AlterUrlString((options1.script),"carrier",myCarrier);
    	//alert(myQStr);
		options1.script = myQStr;


	}
	else
	{
		currElement.disabled=true;
		
	}
 
	
	 
}
function submitUpdform(myobject)
{

	var isFormValid = false; 
	var isAdd = document.updateFrm.cmd.value; 
	var myTanker = str_trim(document.updateFrm.tanker.value);
	
	isFormValid = submitmyform(myobject);
	var tnkr_to_update = "";
	var isanytankerop_checked= false;
	//first of all check if one or all tankers are selected
	for (i=0;i<document.updateFrm.tkr_select.length;i++)
	{
		  if (document.updateFrm.tkr_select[i].checked)
		  {
				 tnkr_to_update= document.updateFrm.tkr_select[i].value;
				 isanytankerop_checked= true;
				 
		  }
	}
	
	// if Meter Calibration Need to create a sale id
	if (tnkr_to_update=="" || isanytankerop_checked==false || (tnkr_to_update=="A_TANKER" && myTanker==""))
	{
			alert(ml(t__Select_a_tanker));
			return false;
	}
	
	

	if ( isAdd == "MOD" && (tnkr_to_update="A_TANKER" && myTanker!="") ) 
	{
		//alert("Value of isAdd is "+isAdd); 
		if (isFormValid) 
		{
			var myAvailTanker = as1.getSuggestionArr();

			if(myAvailTanker && myAvailTanker.length>0)
			{
				for (var i=0;i<myAvailTanker.length;i++)
				{
					var a = myAvailTanker[i];
					if (a==myTanker)return true;
				}
			}
			alert(ml(t__Select_a_tanker));
			return false;
		}
		else 
		{
			return false;
		};
	} 
	else
	{
		return isFormValid;
	};
}
function sortMultiDimensional(a,b){
	// this sorts the array using the second element
	return ((a[1] < b[1]) ? -1 : ((a[1] > b[1]) ? 1 : 0));
}
