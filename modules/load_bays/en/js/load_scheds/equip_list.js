/*********************************************
 * $Id: equip_list.js,v 1.60 2014/02/24 04:28:11 cw Exp $
 *********************************************/


/* Language component */

var t__Save = ["Save","保存"];
var t__Add = ["Add","新增"];
var t__View = ["View","查看"];
var t__Reset = ["Reset","重置"];
var t__are_mandatory = ["are mandatory","的项目必填"];
var t__Active_Tanker = ["Active Tanker","激活的油槽车"];
var t__Add = ["Add","新增"];
var t__ADD = ["ADD","新增"];
var t__ADD_NEW_EQUIPMENT = ["ADD NEW EQUIPMENT","新增运输设备"];
var t__All_the_fields_labelled_with_an = ["								All the fields labelled with an ","								所有带"];
var t__All_the_fields_labelled_with_an = ["								All the fields labelled with an","								所有带"];
var t__are_mandatory = ["are mandatory","的项目必填"];
var t__Back = ["Back","返回"];
var t__Back_to_Equipment_List = ["Back to Equipment List","返回运输设备管理"];
var t__Back_to_Tanker_Return = ["Back to Tanker Return","返回油槽车返还"];
var t__Code = ["														Code","														设备编号"];
var t__Code = ["Code","设备编号"];
var t__Compartment = ["														Compartment","														油仓"];
var t__Compartment = ["Compartment","油仓"];
var t__COMPARTMENTAL_LIMITS = ["COMPARTMENTAL LIMITS","油仓容量设置"];
var t__COMPARTMENT_LIMITS = ["COMPARTMENT LIMITS","油仓容量设置"];
var t__Compartment_Limits_Page = ["Compartment Limits Page","油仓容量设置页"];
var t__Current = ["Current","当前"];
var t__MsgValidCapacity = ["Capacity must be greater than safe fill","最大容量必须大于安全容量"];
var t__plsMsgValidSafeFill = ["Enter Safe Fill","请输入安全容量"];

var t__plsMsgValidCapacity = ["Enter Capacity","请输入最大容量"];
var t__MsgValidSafeFill = ["Enter Safe Fill Less than Capacity","请输入安全容量(小于最大容量)"];

var t__Date = ["Date","日期"];
var t__Delete = ["Delete","删除"];
var t__DELETE = ["DELETE","删除"];
var t__DELETE_EQUIPMENT = ["DELETE EQUIPMENT","删除运输设备"];
var t__Delete_Equipment_Page = ["Delete Equipment Page","删除运输设备页"];
var t__Delete_Failed = ["Delete Failed","删除失败"];
var t__DKI_Omega_Menu = ["DKI Omega Menu","达基国际Omega系统菜单"];
var t__Do_you_wish_to_delete_this_row = ["										Do you wish to delete this row","										您要删除此行？"];
var t__Drawer = ["														Drawer","										提油者"];
var t__Drawer = ["Drawer","提油者"];
var t__Empty_Weight = ["														Empty Weight","														空舱重量"];
var t__EMPTY_WEIGHT = ["EMPTY WEIGHT","空舱重量"];
var t__Empty_Weight_Page = ["Empty Weight Page","空舱重量页"];
var t__Enter_Compartment_Limit = ["Enter Compartment Limit","输入油仓容量"];
var t__Equipment_Code = ["																 Equipment Code","																 运输设备"];
var t__Equipment_Details = ["Equipment Details","设备详情"];
var t__EQUIPMENT_LIST = ["EQUIPMENT LIST","运输设备管理"];
var t__Equipment_List_Page = ["Equipment List Page","运输设备管理页"];
var t__Equipment_Search = ["Equipment Search","查找设备"];
var t__Equipment_Type = ["														Equipment Type","														设备类型"];
var t__EXPIRY_DATE = ["EXPIRY DATE","有效期设置"];
var t__Expiry_Date_Page = ["Expiry Date Page","有效期设置页"];
var t__EXPIRY_DATES = ["EXPIRY DATES","有效期设置"];
var t__Find = ["Find","查找"];
var t__FIND_EQUIPMENT = ["FIND EQUIPMENT","查找设备"];
var t__Find_Equipment_Page = ["Find Equipment Page","查找设备页"];
var t__hidden = ["hidden","隐藏"];
var t__Insert_New_Record_Failed = ["Insert New Record Failed","插入新记录失败"];
var t__Kg = ["Kg","千克"];
var t__Loading_Lock = ["														Loading Lock","														发油锁定"];
var t__Loading_Lock = ["Loading Lock","发油锁定"];
var t__LOAD_SCHEDULES = ["LOAD SCHEDULES","发油订单管理"];
var t__Modify = ["Modify","修改"];
var t__MODIFY = ["MODIFY","修改"];
var t__MODIFY_EQUIPMENT = ["MODIFY EQUIPMENT","修改运输设备"];
var t__Next = ["Next","下一个"];
var t__Owner = ["                       		Owner","                       		所有者"];
var t__Preloaded = ["Preloaded ","预装"];
var t__Preload_Weigh = ["														Preload Weigh","														预称重"];
var t__Preload_Weigh = ["Preload Weigh","预称重"];
var t__Previous = ["Previous","前一个"];
var t__PRIME_MOVER_LIMITS = ["PRIME MOVER LIMITS","车头限额"];
var t__Prime_Mover_Limits_Page = ["Prime Mover Limits Page","车头限额管理页"];
var t__Prime_Mover_Pulling_Limit = ["														Prime Mover Pulling Limit","														车头牵引限额"];
var t__Prime_Mover_Registration_Expired = ["														Prime Mover Registration Expired","														车头注册过期"];
var t__Prime_mover_SLP_Expired = ["														Prime mover SLP Expired","														车头SLP过期"];
var t__Product = ["														Product","														油品"];
var t__Product = ["Product","油品"];
var t__Put_a_new_Code = ["Put a new Code","放新代码"];
var t__Qty = ["														Qty","														数量"];
var t__Reset = ["Reset","重置"];
var t__Return_Reason = ["														Return Reason","														返还原因"];
var t__Return_Reason = ["Return Reason","返还原因"];
var t__Safe_Fill = ["Safe Fill","安全容量"];
var t__Safe_Fill_Units = ["						Safe Fill Units","						安全容量单位"];
var t__Save = ["Save","保存"];
var t__SAVE_AS_PRELOADED = ["SAVE AS PRELOADED","保存为预装"];
var t__Select_a_Drawer = ["Select a Drawer","选择提油者"];
var t__Select_an_Owner = ["Select an Owner","选择所有者"];
var t__Select_a_Product = ["Select a Product","选择油品"];
var t__Select_a_Reason = ["Select a Reason","选择原因"];
var t__Select_a_Type = ["Select a Type","选择类型"];
var t__Select_A_Type = ["Select A Type","选择类型"];
var t__Select_Date = ["Select Date","选择日期"];
var t__Select_the_Owner = ["             		Select the Owner","             		选择所有者"];
var t__Set = ["Set","设置"];
var t__SET_COMPARTMENT_RETURN = ["SET COMPARTMENT RETURN","设置油仓返还"];
var t__SET_COMPARTMENT_RETURNS = ["SET COMPARTMENT RETURNS","设置油仓返还"];
var t__Set_Compartment_Returns_Page = ["Set Compartment Returns Page","设置油仓返还页"];
var t__Set_Equipment_Page = ["Set Equipment Page","设置运输设备页"];
var t__Successfully_Deleted = ["Successfully Deleted","成功删除"];
var t__Successfully_Inserted_A_New_Record = ["Successfully Inserted A New Record ","成功插入一条新记录"];
var t__Successfully_Updated = ["Successfully Updated","成功更新"];
var t__TANKER_RETURN = ["TANKER RETURN","油槽车返还"];
var t__Tanker_Return_Details = ["Tanker Return Details","油槽车返还详情"];
var t__TANKER_RETURNS = ["TANKER RETURNS","油槽车返还"];
var t__To_View_Equipment_List = ["To View Equipment List","查看运输设备列表"];
var t__Trailer = ["														Trailer","														拖车"];
var t__Trailer = ["Trailer","拖车"];
var t__Trailer_SLP_Expired = ["														Trailer SLP Expired","														拖车SLP过期"];
var t__Type_Name = ["Type Name","类型名称"];
var t__Update_Equipment_Page = ["Update Equipment Page","更新运输设备页"];
var t__Update_Failed = ["Update Failed","更新失败"];
var t__YOUR_ACTION = ["YOUR ACTION","请选择"];
var t__ALERT_COMPARTMENT = ["0 compartments in Equipment type", "此类型的设备没有油仓"];

var t__ALERT_EQCODE_EXIST  = ["Same Equipment code is already exist", "相同设备编号已存在"];
var t__ALERT_Empty_Weight  = ["Please enter Empty Weight value correctly!", "请输入正确的容器净重!"];
var t__ALERT_POSITIVE_INT_REQ = ["Positive Integer value is required", "请输入正整数值"];
var t__Please_enter_Qty = ["Please enter Quantity not exceeds!", "请勿超出安全容量!"];
var t__contains_char = ["contains character(s)", "编号(或编号的一部分)"];
var t__Active_Tanker_exist_no_delete = ["An active Tanker exists. You are not alllowed to delete it"
		, "有油槽车处于激活状态.  你不可以删除此设备"];
var t__Please_select_Reason = ["Please select a Return Reason", "请输入返回油品处理的原因"];
var t__Loading_Lock_Yes = ["Loading Lock status is YES. You are not alllowed delete it!","正在装载,不能被删除!"];
var t__YES = ["YES","是"];
var t__Expiry_Date = ["Expiry Date", "有效期"];
var t__Owner_list = ["Owner List", "所有者列表"];

var t__TitleCapacity = ["Capacity (l)", "设备容积(升)"];
var t__TitlePreload = ["Preloaded l(amb)", "预装量 升(视量)"];


var equip_load_type_pos = 15;
var t__Equip_Load_Type = ["Load Type","设备装载方式"];

var t__Equip_Top_Loading = ["Top","上装式"];
var t__Equip_Bottom_Loading = ["Bottom","下装式"];
var t__Select_Equip_Load_Type = ["Select valid load type","请选择设备装载方式"];


var equip_load_types_jslist = [["", ""], ["B", ml(t__Equip_Bottom_Loading)], ["T", ml(t__Equip_Top_Loading)]];



/* Please do not translate it */
var t__lang_lang = ["0", "1"];


var myColumns = [ml(t__Code), ml(t__Type_Name), ml(t__Active_Tanker), ml(t__Loading_Lock), ml(t__Preload_Weigh), ml(t__Equip_Load_Type)];

var myCmpt = [ml(t__Compartment), ml(t__Safe_Fill), ml(t__TitleCapacity)];

var myReturn = [ml(t__Trailer), ml(t__Compartment), ml(t__Drawer), ml(t__Product), ml(t__TitlePreload), ml(t__Date), ml(t__Return_Reason)];

//var myCmpt = [ml(t__Compartment), ml(t__Safe_Fill), "Capacity (l)"];

//var myReturn = [ml(t__Trailer), ml(t__Compartment), ml(t__Drawer), ml(t__Product), "Preloaded l(amb)", ml(t__Date), ml(t__Return_Reason)];


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
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
l_opInf[21]= g_opInf[26];
l_opInf[22]= g_opInf[26];
l_opInf[23]= g_opInf[26];
l_opInf[24]= g_opInf[26];
l_opInf[27]= g_opInf[26];
l_opInf[28]= g_opInf[27];
l_opInf[30]= g_opInf[26];
l_opInf[40]= g_opInf[36];
l_opInf[29]= g_opInf[28];
l_opInf[31]= g_opInf[36];
l_opInf[32]= g_opInf[36];
l_opInf[33]= g_opInf[36];
l_opInf[34]= g_opInf[36];
l_opInf[37]= g_opInf[36];
l_opInf[38]= g_opInf[37];
l_opInf[39]= g_opInf[38];
l_opInf[54]= g_opInf[26];
l_opInf[64]= g_opInf[36];


/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    		

// Search and Print Require on these pages
var ops_req_print = [-1, 0,1,4,6,15,20,21,22,24,26,28,30,31,32,34,36,29,27,37,38,39];
var ops_req_search = [-1,0,1,4,6,15,20,21,22,24,26,28,30,31,32,34,36,29,27,37,38,39];

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
	newPage += "<table border=\"0\" width=\"100%\" height=\"100%\">\n";
	newPage += "<tbody>\n";  

	//alert (curViewDetailState+"/"+op+"/"+cmpy+"/"+equip); 

	if (curViewDetailState < 1 || curViewDetailState > 10) // view records
	{

		if(op ==15 && equip_list_tab.length > 1 )
		{
			cmpy = equip_list_tab[1][6];
		}

		newPage += displayGlblFrm();
		//newPage +=addPrintBtn_HTML();
    newPage +=displayStatusMsg (op);
		if( ((myColumns.length)> 0))
		{
			newPage += "<tr> \n";
			newPage += "<td>\n ";
			newPage += "<div id=\"printReady\">\n";
			newPage += table_begin("M", 0,"");
			newPage += "<tbody> \n";
			newPage += "<tr>";

			if ( equip_list_tab.length > 1 ) {
				for(var i=0; i<myColumns.length; i++)
				{
					newPage += "<td>"+myColumns[i]+"</td>";
				}
			}

			newPage += "</tr>";


			for(i in equip_list_tab)
			{
				newPage += "<tr class=\"row1\">\n";
				if(i>0) 
				{
					var howmanyDone =0;
					for(var j=0; j<myColumns.length; j++)
					{

						if (curColumnToSort == howmanyDone)
						{
							newPage += "<td style=\"background-color:#EEEEEE\">" + obs(equip_list_tab[i][howmanyDone]) + "</td>";
						} 
						else 
						{

							if(howmanyDone==0) // means time to display the drop list and table
							{
							    newPage += "<td>\n";				  
								newPage +="   <form name=\"optionsFrm_"+equip_list_tab[i][howmanyDone]+"\" id=\"optionsFrm\" method=\"get\">\n";
								newPage +="       <table width=\"100%\" border=\"0\">\n";
								newPage +="	       <tr>\n";
								newPage +="                 <td width=\"75%\"> <span style=\"COLOR: #FF0000;\">"+obs(equip_list_tab[i][howmanyDone])+"</span>\n";
								newPage +="                     <input type=\"hidden\" name=\"depot\" id=\"depot\" value=\""+depot+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"cmpy\" id=\"cmpy\" value=\""+equip_list_tab[i][6]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"equipID\" id=\"equipID\" value=\""+equip_list_tab[i][7]+"\">\n";
								newPage +="                 </td>\n";
								newPage +="                 <td align=\"right\">\n";
								newPage += op_list(curPrivilage, equip_list_tab[i][9]);
								newPage +="                 </td>\n";
								newPage +="	       </tr>\n";
								newPage +="	  	</table>\n";
								newPage +="   </form>\n";
							}
							else if(howmanyDone == 1)
							{
							    newPage += "<td>\n";				  
								howmanyDone ++;
								newPage += obs(equip_list_tab[i][howmanyDone]);
							}
							else if(howmanyDone == 4)
							{   

							    newPage += "<td align=\"center\" >\n";				  
								if ( obs(equip_list_tab[i][howmanyDone]) == 'YES' ) {
									newPage += "<img src=\"/images/padlock_lock.gif\" alt=\"Lock\" title=\"Lock\" >\n";
								} else if ( obs(equip_list_tab[i][howmanyDone]) == 'NO') {
									newPage += "<img src=\"/images/padlock_unlock.gif\" alt=\"UnLock\" title=\"UnLock\">\n";
								} else {
									newPage += obs(equip_list_tab[i][howmanyDone]);
								}

							}
							else if(howmanyDone == 5)
							{   
							    newPage += "<td align=\"center\" >\n";				  
								if ( obs(equip_list_tab[i][howmanyDone]) == 'YES' ) {
									newPage += "<img src=\"/images/check_mark_blue.gif\"  alt=\"Yes\" title=\"Yes\" >\n";
								} else if ( obs(equip_list_tab[i][howmanyDone]) == 'NO' ) {
									newPage += "<img src=\"/images/cross_mark_red.jpg\" alt=\"No\" title=\"No\" >\n";
								} else {
									newPage += obs(equip_list_tab[i][howmanyDone]);
								}

							}
							else if(howmanyDone == 6)
							{   

							    newPage += "<td align=\"center\" >\n";				  
								if ( obs(equip_list_tab[i][equip_load_type_pos]) == 'T' ) {
									newPage += obs(ml(t__Equip_Top_Loading));
								} else if ( obs(equip_list_tab[i][equip_load_type_pos]) == 'B') {
									newPage += obs(ml(t__Equip_Bottom_Loading));
								} else {
									newPage += obs("&nbsp;");
								}

							}
							else
							{
							    newPage += "<td>\n";				  
								newPage += obs(equip_list_tab[i][howmanyDone]);
							}

							newPage += "</td>\n";

						}// end loop column
						howmanyDone++;
					}

				} // end if to check rows
				newPage += "\n";
				newPage += "</tr>";

			}//end loop on load sched
			newPage += "</tbody>";
			newPage += "</table>";
			newPage += "</td>";	
			newPage += "</tr>";
			

		} // end if to check column

		if(op < 10 || op == 15)
		{
			if(parseInt(pg)<0)
			{
				pg = 1;
			}
			if(parseInt(pg)> 0&&parseInt(pagesTotal)!=0)
			{
				newPage +=nextPage_long(pagesTotal, pg, "equip_list.cgi", "pg", '&cmpy='+cmpy+'&op='+op);
			}
		}
		//newPage +=addPrintBtn_HTML();

	}// end if to check state
	else if(curViewDetailState == 1)
	{
		newPage += expiryForm();

	}  
	else if(curViewDetailState == 2)
	{
		newPage += emptyForm();
	}
	else if(curViewDetailState == 3)
	{
		newPage += pmForm();
	}
	else if(curViewDetailState == 4 || curViewDetailState == 30)
	{
		newPage += returnForm();
	}
	else if(curViewDetailState == 5)
	{
		newPage += findForm();
	}
	else if(curViewDetailState == 6)
	{
		newPage += cmptForm();
	}
	else if(curViewDetailState == 8 || curViewDetailState == 7 )
	{
		newPage += updateForm(curViewDetailState);
	}
	else if(curViewDetailState == 9)
	{
		newPage += deleteForm();
	}
	else if(curViewDetailState == 10)
	{
		newPage += setReturnForm();
	}

	//newPage += statusbarRowHTML(statusBar);

	// table for everything ends here
	//	newPage += "</tr>\n";
	newPage += "</tbody>\n";
	newPage += "</table>\n";
	newPage += "</div>\n";
	newPage += "</td>              \n";  
	newPage += "</tr>\n";

	// the folowing is the closing tag relevant to those in get ToolBar_HTML
	newPage += "</tbody>\n";
	newPage += "</table>\n";
	newPage += "</div>\n";
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


function returnForm()
{
  //alert("returnForm here is the op"+op);
	var returnFrm = "";

	returnFrm += displayInfo();

	returnFrm += "	<tr>\n";
	returnFrm += "		<td>\n";
	returnFrm +=  table_begin("M", 1,"");
	returnFrm += "			<tbody> \n";
	returnFrm += "				<tr>\n";

	for(var i=0; i<myReturn.length; i++)
	{
		returnFrm += "				<td>"+myReturn[i]+"</td>\n";
	}
	returnFrm += "				</tr>\n";


	for(i in return_list_tab)
	{
		returnFrm += "<tr class=\"row1\">\n";
		if(i>0) 
		{

			for(var j=0; j<myReturn.length; j++)
			{

				returnFrm += "<td>\n";				  
				if(j==0) // means time to display the drop list and table
				{
					returnFrm +="   <form name=\"returnFrm_"+return_list_tab[i][j]+"\" id=\"returnFrm\" method=\"get\">\n";
					returnFrm +="       <table border=\"0\">\n";
					returnFrm +="	       <tr>\n";
					returnFrm +="                 <td width=\"100\"> <span style=\"COLOR: #FF0000;\">"+obs(return_list_tab[i][j])+"</span>\n";
					returnFrm +="                     <input type=\"hidden\" name=\"depot\" id=\"depot\" value=\""+depot+"\">\n";
					returnFrm +="                     <input type=\"hidden\" name=\"cmpy\" id=\"cmpy\" value=\""+cmpy+"\">\n";
					returnFrm +="                     <input type=\"hidden\" name=\"equipID\" id=\"equipID\" value=\""+equipID+"\">\n";
					returnFrm +="                     <input type=\"hidden\" name=\"cmptID\" id=\"cmptID\" value=\""+return_list_tab[i][1]+"\">\n";
					returnFrm +="                     <input type=\"hidden\" name=\"drawer\" id=\"drawer\" value=\""+return_list_tab[i][2]+"\">\n";
					returnFrm +="                     <input type=\"hidden\" name=\"reason\" id=\"reason\" value=\""+return_list_tab[i][6]+"\">\n";
					returnFrm +="                 </td>\n";
					returnFrm +="                 <td>\n";
					returnFrm += op_list2();
					returnFrm +="                 </td>\n";
					returnFrm +="	       </tr>\n";
					returnFrm +="	  	</table>\n";
					returnFrm +="   </form>\n";
				}
				else
				{
					returnFrm += obs(return_list_tab[i][j]);
				}

				returnFrm += "</td>\n";

			}

		} // end if to check rows

		returnFrm += "\n";
		returnFrm += "</tr>\n";

	}//end loop on load sched
	returnFrm += "</tbody>";
	returnFrm += "</table>";

	returnFrm += "		</td>\n";
	returnFrm += "	</tr>\n";  

	return returnFrm;
}


function cmptForm()
{

	var cmptFrm = "";
	var totlCmptDisp = 0; //this variable will check how many compartments

	cmptFrm += displayInfo();

	cmptFrm += "	<form name=\"cmptFrm\" id=\"cmptFrm\" onsubmit=\"return chkSf2Capa(this);\">\n";
	cmptFrm += "	<tr>\n";
	cmptFrm += "		<td>\n";
	cmptFrm += "		<div id=\"helparea\">\n";
	cmptFrm += "			<table>\n";
	cmptFrm += "				<tr>\n";
	cmptFrm += "					<td class=\"infotextheading\">\n";
	cmptFrm += ml(t__Safe_Fill_Units)+":\n";
	cmptFrm += "					<td>\n";
	cmptFrm += "					<td class=\"infotext\">\n";
	cmptFrm += "						" + cmpt_list_tab[1][3];
	cmptFrm += "					</td>\n";
	cmptFrm += "				</tr>\n";
	cmptFrm += "			</table>\n";
	cmptFrm += "		</div>\n";
	cmptFrm += "		</td>\n";
	cmptFrm += "	</tr>\n";
	cmptFrm += "	<tr>\n";
	cmptFrm += "		<td>\n";
	cmptFrm += table_begin("M", 2,"");
	cmptFrm += "			<tbody> \n";
	cmptFrm += "				<tr>\n";

	for(var i=0; i<myCmpt.length; i++)
	{
		cmptFrm += "				<td>"+myCmpt[i]+"</td>\n";
	}

	cmptFrm += "				</tr>\n";


	for(i in cmpt_list_tab)
	{
		cmptFrm += "<tr class=\"row1\">\n";

		if(i>0) 
		{
			totlCmptDisp +=1;
			cmptFrm += "<td>\n";
			cmptFrm += 		obs(cmpt_list_tab[i][0]);
			cmptFrm += "	        <input type=\"hidden\" name=\"cmptcap"+i+"\" value=\""+obs(cmpt_list_tab[i][4])+"\" />\n";
			cmptFrm += "</td>\n";
			cmptFrm += "<td>\n";


				cmptFrm += "<input  class=\"compulsoryselect\" type=\"text\" name=\"cmptsfl"+i+"\" id=\"cmptsfl"+i+"\" value=\""+obs(cmpt_list_tab[i][1])+"\" dataType=\"PositiveIntGteZero\" msg=\""+ml(t__plsMsgValidSafeFill)+" "+ml(t__Compartment)+" "+i+"\" size=\"9\" maxlength=\"9\" />\n";

//			}
      
			cmptFrm += "</td>\n";
			cmptFrm += "<td>\n";
			//cmptFrm += "<input type=\"text\" class=\"compulsoryselect\" name=\"sflcap"+i+"\" id=\"sflcap"+i+"\" value=\""+obs(cmpt_list_tab[i][2])+"\" dataType=\"Compare\" to=\"'javascript:eval('cmptsfl"+i+".value')'\" operator=\"GreaterThanORzero\" msg=\""+ml(t__MsgValidCapacity)+"\" onChange=\"isInteger(this)\" size=\"9\" maxlength=\"9\" />\n";

			cmptFrm += "<input type=\"text\" class=\"compulsoryselect\" name=\"sflcap"+i+"\" id=\"sflcap"+i+"\" value=\""+obs(cmpt_list_tab[i][2])+"\" dataType=\"PositiveIntGteZero\" msg=\""+ml(t__plsMsgValidCapacity)+" "+ml(t__Compartment)+" "+i+"\" size=\"9\" maxlength=\"9\" />\n";

			cmptFrm += "</td>\n";

		} // end if to check rows







		cmptFrm += "\n";
		cmptFrm += "</tr>\n";

	}//end loop in cmpt_list_tab
	cmptFrm += "</tbody>";
	cmptFrm += "</table>";

	cmptFrm += "		</td>\n";
	cmptFrm += "	</tr>\n";  
	cmptFrm += "	<tr>\n";
	cmptFrm += "	<td align=\"center\">\n";
	cmptFrm += "	<table>\n";
	cmptFrm += "	<tr>\n";
	cmptFrm += "	<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	cmptFrm += "	<input type=\"hidden\" name=\"ncmpt\" id=\"ncmpt\" value=\""+totlCmptDisp+"\" />\n";
	cmptFrm += "	<input type=\"hidden\" name=\"cmpy\" id=\"cmpy\" value=\""+cmpy+"\" />\n";
	cmptFrm += "	<input type=\"hidden\" name=\"equipID\" id=\"equipID\" value=\""+equipID+"\" />\n";
	cmptFrm += "	<input type=\"hidden\" name=\"op\" id=\"op\" value=\"13\" />\n";
	cmptFrm += "	<input type=\"submit\" value=\""+ml(t__Save)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	cmptFrm += "	</td>\n";
	cmptFrm += "	<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	cmptFrm += "	<input type=\"reset\" value =\""+ml(t__Reset)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	cmptFrm += "	</td>\n";
	cmptFrm += "	</tr>\n";
	cmptFrm += "	</table>\n";
	cmptFrm += "	</td>\n";
	cmptFrm += "	</tr>\n";  
	cmptFrm += "</form>\n";

	return cmptFrm;
}






function updateForm(state)
{
	var button ="";
	var required = "";
	var inputType = "";
	var selectDisabled = "";
	var cmd="";
	var i = 0;
	op = state + 10

		if (state == 8)
		{
			button = ml(t__Add);
			required= "*";
			inputType = "text";
			selectCodeDisabled = "dataType=\"Require\" msg=\""+ml(t__Put_a_new_Code)+"!\" ";
			selectTypeDisabled = "dataType=\"Require\" msg=\""+ml(t__Select_a_Type)+"!\" ";
			cmd="ADD";
			i=0;

		}else{
			button = ml(t__Modify);
			required= "";
			inputType = ml(t__hidden);
			selectCodeDisabled = "disabled";
			selectTypeDisabled = "disabled";
			cmd="MOD";
			i=1;

		}

	var LoadTypeDisabled = "dataType=\"Require\" msg=\""+ml(t__Select_Equip_Load_Type)+"!\" ";

	var updateFrm = "";
	updateFrm += "<tr>\n";
	updateFrm += "<td align=\"center\">\n";
	updateFrm += "<div class=\"button\">\n";
	updateFrm += "<a href=\"equip_list.cgi?pg="+pg+"&cmpy="+cmpy+"&op=0\">"+ml(t__Back_to_Equipment_List)+"</a></div><br>\n";
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	if (state == 8)
	{
		updateFrm += "<form name=\"updateFrm\" method=\"get\" id=\"updateFrm\" onsubmit=\"return checkEqptCode(this)\">\n";
	}
	else
	{


		updateFrm += "<form name=\"updateFrm\" method=\"get\" id=\"updateFrm\" onsubmit=\"return Validator.Validate(this,1)\">\n";
	}
	updateFrm += "<tr>\n";
	updateFrm += "<td>\n";

	updateFrm += " <ul id=\"tabmenu\">\n";
	updateFrm += "<li>"+ml(t__Equipment_Details)+"</li>\n";
	updateFrm += "</ul>\n";
	updateFrm += "<div class=\"adminform\">\n";

	updateFrm += "<table width=\"100%\">\n";
	updateFrm += "<tr>\n";
	updateFrm += "<td class=\"infotext\" width=\"100%\">\n";
	updateFrm += ml(t__All_the_fields_labelled_with_an)+" (<span style=\"COLOR: #FF0000;\">*</span>) "+ml(t__are_mandatory)+"\n";
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	updateFrm += "<tr>\n";
	updateFrm += "<td width=\"100%\">\n";
	updateFrm += "<table width=\"100%\">\n";
	updateFrm += "<tr>\n";
	updateFrm += "<td width=\"50%\">\n";

	updateFrm += "<table>\n";
	updateFrm += "<tr>\n";
	updateFrm += "<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Code)+":\n";
	updateFrm += "</td>\n";
	updateFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "<span class=\"mandatory\">" + required + "</span>\n";
	updateFrm += "</td>\n";

	if (inputType == "text" ) 
	{
		updateFrm += "<td>\n";
		updateFrm += "<input type=\""+inputType+"\" name=\"equip\" "+selectCodeDisabled+" value=\"" + equip_list_tab[i][0] + "\"  />\n";

	} 
	else 
	{
		updateFrm += "<td class=\"infotext\">\n";
		updateFrm += "	" + equip_list_tab[i][0] + "  \n";
	}

	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	updateFrm += "</table>\n";
	updateFrm += "</td>\n";
	updateFrm += "<td width=\"50%\">\n";
	updateFrm += "<table>\n";
	updateFrm += "<tr>\n";
	updateFrm += "<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Equipment_Type)+":\n";
	updateFrm += "</td>\n";
	updateFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "<span class=\"mandatory\">" + required + "</span>\n";
	updateFrm += "</td>\n";
	updateFrm += "<td>\n";
	updateFrm += "<select name=\"eqpt_type\" id=\"eqpt_type\" class=\"smallselect\" "+selectTypeDisabled+">\n";
	updateFrm += displayDropList(equip_list_tab[i][1], equip_type, ml(t__Select_A_Type));
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	updateFrm += "</table>\n";  
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";

// loading type selection
	updateFrm += "<tr>\n";
	updateFrm += "<td width=\"50%\">\n";
	updateFrm += "<table>\n";
	updateFrm += "<tr>\n";
	updateFrm += "<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Equip_Load_Type)+":\n";
	updateFrm += "</td>\n";
	updateFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "<span class=\"mandatory\">" + "*" + "</span>\n";
	updateFrm += "</td>\n";
	updateFrm += "<td>\n";
	updateFrm += "<select name=\"loadtype\" id=\"loadtype\" class=\"smallselect\" "+LoadTypeDisabled+">\n";
	updateFrm += displayDropList(equip_list_tab[i][equip_load_type_pos], equip_load_types_jslist, ml(t__Select_Equip_Load_Type));
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	updateFrm += "</table>\n";  
	updateFrm += "</td>\n";

	updateFrm += "<td width=\"50%\">\n";
	updateFrm += "&nbsp;\n";
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";

	updateFrm += "<tr>\n";
	updateFrm += "<td width=\"50%\">\n";
	updateFrm += "<table>\n";
	updateFrm += "<tr>\n";
	updateFrm += "<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Loading_Lock)+":\n";
	updateFrm += "</td>\n";
	updateFrm += "<td width=\"5\" align=\"center\" class=\"infotext\">\n";
	updateFrm += "&nbsp;\n";
	updateFrm += "</td>\n";
	updateFrm += "<td>\n";
	updateFrm += checkBox('lock', equip_list_tab[i][4]);
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	updateFrm += "</table>\n";
	updateFrm += "</td>\n";
	updateFrm += "<td width=\"50%\">\n";
	updateFrm += "<table>\n";
	updateFrm += "<tr>\n";
	updateFrm += "<td class=\"infotextheadingtd\" width=\"100\">\n";
	updateFrm += ml(t__Preload_Weigh)+":\n";
	updateFrm += "</td>\n";
	updateFrm += "<td width=\"5\" align=\"center\" class=\"infotext\">\n";
	updateFrm += "&nbsp;\n";
	updateFrm += "</td>\n";
	updateFrm += "<td>\n"; 

	// According to bug #1143
    // but now.... back to 'no'
	if (state == 8 ){
		updateFrm += checkBox('weigh', 'no');
	} else{
		updateFrm += checkBox('weigh', equip_list_tab[i][5]);
	}

	updateFrm += "													</td>\n";
	updateFrm += "												</tr>\n";
	updateFrm += "											</table>\n";
	updateFrm += "										</td>\n";
	updateFrm += "									</tr>\n";
	updateFrm += "								</table>\n";
	updateFrm += "                              </div>\n";
	updateFrm += "							</td>\n";
	updateFrm += "						</tr>\n";
	updateFrm += "						<tr>\n";
	updateFrm += "							<td align=\"center\">\n";
	updateFrm += "								<table>\n";
	updateFrm += "									<tr>\n";
	updateFrm += "										<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	updateFrm += "											<input type=\"hidden\" name=\"cmpy\" id=\"cmpy\" value=\""+cmpy+"\" />\n";
	updateFrm += "											<input type=\"hidden\" name=\"equipID\" id=\"equipID\" value=\""+equipID+"\" />\n";
	updateFrm += "											<input type=\"hidden\" name=\"op\" id=\"op\" value=\""+op+"\" />\n";
	updateFrm += "											<input type=\"hidden\" name=\"cmd\" id=\"cmd\" value=\""+cmd+"\" />\n";
	updateFrm += "											<input type=\"submit\" value=\"" + button + "\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	updateFrm += "										</td>\n";
	updateFrm += "										<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	updateFrm += "											<input type=\"reset\" value =\""+ml(t__Reset)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	updateFrm += "										</td>\n";
	updateFrm += "									</tr>\n";
	updateFrm += "								</table>\n";
	updateFrm += "							</td>\n";
	updateFrm += "						</tr>\n";
	updateFrm += "					</table>\n";

	updateFrm += "		</td>\n";
	updateFrm += "	</tr>\n";
	updateFrm += "	</form>\n";

	return updateFrm;
} //End update Form



function setReturnForm()
{
	var i = 1;
    var y = return_list_tab[i][1];


	// var reason = [['', ''], ['DEFAULT RETURN REASON', 'DEFAULT RETURN REASON'], ['RETURN_VERIFICATION', 'Return Verification'], ['RETURN_TANKER', 'Return Tanker']];

	var setReturnFrm = "";

	setReturnFrm += displayInfo();

	setReturnFrm += "	<form name=\"setReturnFrm\" method=\"get\" id=\"setReturnFrm\" onsubmit=\"return submitmyform(this)\">\n";
	setReturnFrm += "	<tr>\n";
	setReturnFrm += "		<td>\n";

	setReturnFrm += " <ul id=\"tabmenu\">\n";
	setReturnFrm += "<li>"+ml(t__Tanker_Return_Details)+"</li>\n";
	setReturnFrm += "</ul>\n";
	setReturnFrm += "<div class=\"adminform\">\n";

	setReturnFrm += "					<table width=\"100%\">\n";
	setReturnFrm += "						<tr>\n";
	setReturnFrm += "							<td class=\"infotext\" width=\"100%\">\n";
	setReturnFrm += ml(t__All_the_fields_labelled_with_an)+" (<span style=\"COLOR: #FF0000;\">*</span>) "+ml(t__are_mandatory)+"\n";
	setReturnFrm += "							</td>\n";
	setReturnFrm += "						</tr>\n";
	setReturnFrm += "						<tr>\n";
	setReturnFrm += "							<td width=\"100%\">\n";
	setReturnFrm += "								<table width=\"100%\">\n";
	setReturnFrm += "									<tr>\n";
	setReturnFrm += "										<td width=\"50%\">\n";
	setReturnFrm += "											<table>\n";
	setReturnFrm += "												<tr>\n";
	setReturnFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	setReturnFrm += ml(t__Trailer)+":\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	setReturnFrm += "														<span class=\"mandatory\"></span>\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td class=\"infotext\">\n";
	setReturnFrm += "														" + return_list_tab[i][0] ;
	setReturnFrm += "													</td>\n";
	setReturnFrm += "												</tr>\n";
	setReturnFrm += "											</table>\n";
	setReturnFrm += "										</td>\n";
	setReturnFrm += "										<td width=\"50%\">\n";
	setReturnFrm += "											<table>\n";
	setReturnFrm += "												<tr>\n";
	setReturnFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	setReturnFrm += ml(t__Compartment)+":\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	setReturnFrm += "														<span class=\"mandatory\"></span>\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td class=\"infotext\">\n";
	setReturnFrm += "														"+ return_list_tab[i][1] ;
	setReturnFrm += "													</td>\n";
	setReturnFrm += "												</tr>\n";
	setReturnFrm += "											</table>\n";  
	setReturnFrm += "										</td>\n";
	setReturnFrm += "									</tr>\n";
	setReturnFrm += "									<tr>\n";
	setReturnFrm += "										<td width=\"50%\">\n";
	setReturnFrm += "											<table>\n";
	setReturnFrm += "												<tr>\n";
	setReturnFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	setReturnFrm += ml(t__Drawer)+":\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	setReturnFrm += "														<span class=\"mandatory\">*</span>\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td>\n";
	setReturnFrm += "														<select name=\"drawer\" id=\"drawer\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_a_Drawer)+"\" onChange=\"prodNm.value='';\"  >\n";
	setReturnFrm += displayDropList(return_list_tab[i][2], drawer, ml(t__Select_a_Drawer));
	setReturnFrm += "													</td>\n";
	setReturnFrm += "												</tr>\n";
	setReturnFrm += "											</table>\n";
	setReturnFrm += "										</td>\n";
	setReturnFrm += "										<td width=\"50%\">\n";
	setReturnFrm += "											<table>\n";
	setReturnFrm += "												<tr>\n";
	setReturnFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	setReturnFrm += ml(t__Product)+":\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	setReturnFrm += "														<span class=\"mandatory\">*</span>\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td>\n"; 

	setReturnFrm += "														<table class=\"NewActionBaseTable\">\n";
	setReturnFrm += "															<tbody>\n";
	setReturnFrm += "																<tr>\n";
	setReturnFrm += "																	<div class=popup WIDTH: 15px id=\"prodSelect_eq\" style=\"VISIBILITY: hidden; display: none\">\n";
	setReturnFrm += "																		<div class=\"closeimage\">\n";
	setReturnFrm += "																			<img src=\"/images/closedrop.gif\" onclick=\"hideCurrentPopup(); return false;\" border=\"0\">\n"; 
	setReturnFrm += "				  														</div>\n";
	setReturnFrm += "																		<iframe id=\"eq_iprod\" name=\"eq_iprod\" width=\"220\" src=\"equiplist_product.cgi?cmpy="+return_list_tab[i][2]+"\" scrolling=auto></iframe>\n";
	setReturnFrm += "																	</div>\n";
	setReturnFrm += "																	<td class=\"popupLinkrow\">\n";
	setReturnFrm += "																		<input type=\"text\" name=\"prodNm\" id=\"prodNm\" value=\""+return_list_tab[i][3]+"\" dataType=\"Require\" msg=\""+ml(t__Select_a_Product)+"\" readonly />\n"; 
	setReturnFrm += "																		<input type=\"hidden\" name=\"prod\" id=\"prod\" value=\""+return_list_tab[i][7]+"\" />\n"; 
	setReturnFrm += "																	</td>\n";
	setReturnFrm += "																	<td width=\"15\">\n";
	setReturnFrm += "																		<img src=\"/images/dropimage.gif\" width=\"15\" height=\"16\" onclick=\"return setProduct('prodSelect_eq', event);\">\n";
	setReturnFrm += "																	</td>\n";
	setReturnFrm += "																</tr>\n";
	setReturnFrm += "															</tbody>\n";
	setReturnFrm += "														</table>\n";

	setReturnFrm += "													</td>\n";
	setReturnFrm += "												</tr>\n";
	setReturnFrm += "											</table>\n";
	setReturnFrm += "										</td>\n";
	setReturnFrm += "									</tr>\n";
	setReturnFrm += "									<tr>\n";
	setReturnFrm += "										<td width=\"50%\">\n";
	setReturnFrm += "											<table>\n";
	setReturnFrm += "												<tr>\n";
	setReturnFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	setReturnFrm += ml(t__Qty)+":\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	setReturnFrm += "														<span class=\"mandatory\">&nbsp;</span>\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td>\n";
	setReturnFrm += "														<input type=\"text\" name=\"qty\" value=\""+return_list_tab[i][4]+"\" size=\"9\" maxlength=\"9\" dataType=\"RangeValue\" min=\"0\" max=\""+ cmpt_list_tab[y][1] +"\"  msg=\""+ml(t__Please_enter_Qty)+"\" onChange=\"isInteger(this);\" />\n";
	setReturnFrm += "													[0 - "+cmpt_list_tab[y][1]+"]</td>\n";
	setReturnFrm += "												</tr>\n";
	setReturnFrm += "											</table>\n";
	setReturnFrm += "										</td>\n";
	setReturnFrm += "										<td width=\"50%\">\n";
	setReturnFrm += "											<table>\n";
	setReturnFrm += "												<tr>\n";
	setReturnFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	setReturnFrm += ml(t__Date)+":\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	setReturnFrm += "														<span class=\"mandatory\">*</span>\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td>\n"; 
	setReturnFrm += "														<input type=\"text\" name=\"date\" size=\"10\" value=\""+ ( return_list_tab[i][5] == "" ? disp_todayDate('yyyy-MM-dd'): return_list_tab[i][5] ) +"\" readonly/>\n";
	setReturnFrm += dateURL_HTML("document.forms[0].date", "date_anchor1","yyyy-MM-dd",ml(t__Select_Date));
	setReturnFrm += "													</td>\n";
	setReturnFrm += "												</tr>\n";
	setReturnFrm += "											</table>\n";
	setReturnFrm += "										</td>\n";
	setReturnFrm += "									</tr>\n";
	setReturnFrm += "									<tr>\n";
	setReturnFrm += "										<td width=\"50%\">\n";
	setReturnFrm += "											<table>\n";
	setReturnFrm += "												<tr>\n";
	setReturnFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	setReturnFrm += ml(t__Return_Reason)+":\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	setReturnFrm += "														<span class=\"mandatory\">*</span>\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td>\n";
	setReturnFrm += "														<select name=\"reason\" id=\"reason\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Please_select_Reason)+"\" >\n";
	setReturnFrm += displayDropList(return_list_tab[i][6], reason_jslst, ml(t__Select_a_Reason));
	setReturnFrm += "													</td>\n";
	setReturnFrm += "												</tr>\n";
	setReturnFrm += "											</table>\n";
	setReturnFrm += "										</td>\n";
	setReturnFrm += "										<td width=\"50%\">\n";
	setReturnFrm += "										</td>\n";
	setReturnFrm += "									</tr>\n";
	setReturnFrm += "								</table>\n";
	setReturnFrm += "							</td>\n";
	setReturnFrm += "						</tr>\n";
	setReturnFrm += "						<tr>\n";
	setReturnFrm += "							<td align=\"center\">\n";
	setReturnFrm += "								<table>\n";
	setReturnFrm += "									<tr>\n";
	setReturnFrm += "										<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	setReturnFrm += "											<input type=\"hidden\" name=\"cmpy\" id=\"cmpy\" value=\""+cmpy+"\" />\n";
	setReturnFrm += "											<input type=\"hidden\" name=\"equipID\" id=\"equipID\" value=\""+equipID+"\" />\n";
	setReturnFrm += "											<input type=\"hidden\" name=\"op\" id=\"op\" value=\"20\" />\n";
	setReturnFrm += "											<input type=\"hidden\" name=\"cmd\" id=\"cmd\" value=\"\" />\n";
	setReturnFrm += "											<input type=\"submit\" value=\""+ml(t__Set)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	setReturnFrm += "						  			        <input type=\"hidden\" name=\"cmptID\" id=\"cmptID\" value=\""+return_list_tab[i][1]+"\" />\n";
	setReturnFrm += "										</td>\n";
	setReturnFrm += "										<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	setReturnFrm += "											<input type=\"reset\" value =\""+ml(t__Reset)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	setReturnFrm += "										</td>\n";
	setReturnFrm += "									</tr>\n";
	setReturnFrm += "								</table>\n";
	setReturnFrm += "							</td>\n";
	setReturnFrm += "						</tr>\n";
	setReturnFrm += "					</table>\n";
	setReturnFrm += "			</div>\n";
	setReturnFrm += "		</td>\n";
	setReturnFrm += "	</tr>\n";
	setReturnFrm += "	</form>\n";

	return setReturnFrm;
} //End setReturn Form



function deleteForm()
{
	var deleteFrm = "";
	var isDeleteOK = false;
	var msgDelete = "";
	var butValDelete = "";
	var tdTkrActv = "";
	var tabTkrActv = equip_list_tab[1][3];
    var ldngLock = equip_list_tab[1][4];

	if ( tabTkrActv == "" && ldngLock != "YES" ) {
		isDeleteOK = true;
		msgDelete = ml(t__Do_you_wish_to_delete_this_row)+"?\n";
		butValDelete += "<input type=\"hidden\" name=\"depot\" value=\"" + depot + "\" />\n";
		butValDelete += "<input type=\"hidden\" name=\"cmpy\" value=\"" + cmpy + "\" />\n";
		butValDelete += "<input type=\"hidden\" name=\"equip\" value=\"" + equip_list_tab[1][0] + "\" />\n";
		butValDelete += "<input type=\"hidden\" name=\"equipID\" value=\"" + equip_list_tab[1][7] + "\" />\n";
		butValDelete += "<input type=\"hidden\" name=\"op\" value=\"19\" />\n";
		butValDelete += "<input type=\"hidden\" name=\"cmd\" value=\"DEL\" />\n";
		butValDelete += "<input type=\"submit\" value=\""+ml(t__Delete)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";

	} else if ( ldngLock == "YES" ) {

		isDeleteOK = false;
        msgDelete = " <span style=\"COLOR: #FF0000;\">"+ ml(t__Loading_Lock_Yes)+"! </span> \n";
        butValDelete = "";
  
	} else if ( tabTkrActv != "") {
		
        isDeleteOK = false;
		msgDelete = " <span style=\"COLOR: #FF0000;\">"+ ml(t__Active_Tanker_exist_no_delete)+"! </span> \n";
        butValDelete = "";

		tdTkrActv += "<tr>\n";
		tdTkrActv += "	    <td class=\"infotextheadingtd\" width=\"150\">\n";
		tdTkrActv += ml(t__Active_Tanker)+":\n";
		tdTkrActv += "	    </td>\n";
		tdTkrActv += "	    <td class=\"infotext\" >\n";
		tdTkrActv += "		" + tabTkrActv + " \n";
		tdTkrActv += "	    </td>\n";
		tdTkrActv += "</tr>\n";
	}


	deleteFrm += "	<tr>\n";
	deleteFrm += "		<td align=\"center\">\n";
	deleteFrm += "			<div class=\"button\"><a href=\"equip_list.cgi?pg="+pg+"&cmpy="+cmpy+"&op=0\">"+ml(t__Back_to_Equipment_List)+"</a></div><br>\n";
	deleteFrm += "		</td>\n";
	deleteFrm += "	</tr>\n";
	deleteFrm += "	<tr>\n";
	deleteFrm += "		<td>\n";

	deleteFrm += " <ul id=\"tabmenu\">\n";
	deleteFrm += "<li>"+ml(t__Equipment_Details)+"</li>\n";
	deleteFrm += "</ul>\n";
	deleteFrm += "<div class=\"adminform\">\n";

	deleteFrm += "					<form name=\"deleteFrm\" method=\"post\" id=\"deleteFrm\" onsubmit=\"return submitmyform(this)\">\n";
	deleteFrm += "							<table width=\"100%\">\n";
	deleteFrm += "								<tr>\n";
	deleteFrm += "									<td class=\"infotext\" width=\"100%\">\n";
	deleteFrm += msgDelete;
	deleteFrm += "									</td>\n";
	deleteFrm += "								</tr>\n";
	deleteFrm += "								<tr>\n";
	deleteFrm += "									<td width=\"100%\">\n";
	deleteFrm += "										<table width=\"100%\">\n";
	deleteFrm += "											<tr>\n";
	deleteFrm += "												<td width=\"50%\">\n";
	deleteFrm += "													<table>\n";
	deleteFrm += tdTkrActv ;
	deleteFrm += "														<tr>\n";
	deleteFrm += "															<td class=\"infotextheadingtd\" width=\"150\">\n";
	deleteFrm += ml(t__Equipment_Code)+":\n";
	deleteFrm += "															</td>\n";
	deleteFrm += "															<td class=\"infotext\">\n";
	deleteFrm += "																" + equip_list_tab[1][0] + "\n";
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
	deleteFrm += butValDelete;
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
	findFrm += "			<div class=\"button\"><a href=\"equip_list.cgi?pg="+pg+"&cmpy="+cmpy+"&op=0\">"+ml(t__Back_to_Equipment_List)+"</a></div><br>\n";
	findFrm += "		</td>\n";
	findFrm += "	</tr>\n";
	findFrm += "	<tr>\n";
	findFrm += "		<td>\n";

	findFrm += " <ul id=\"tabmenu\">\n";
	findFrm += "<li>"+ml(t__Equipment_Search)+"</li>\n";
	findFrm += "</ul>\n";
	findFrm += "<div class=\"adminform\">\n";

	findFrm += "					<form name=\"findFrm\" method=\"post\" id=\"findFrm\" onsubmit=\"return submitmyform(this)\">\n";
	findFrm += "							<table width=\"100%\">\n";
	findFrm += "								<tr>\n";
	findFrm += "									<td width=\"100%\">\n";
	findFrm += "										<table width=\"100%\">\n";
	findFrm += "											<tr>\n";
	findFrm += "												<td>\n";
	findFrm += "													<table>\n";

	findFrm += "														<tr>\n";
	findFrm += "															<td class=\"infotextheadingtd\" width=\"175\">\n";
	findFrm += ml(t__Owner)+":\n";
	findFrm += "															</td>\n";
	findFrm += "															<td  class=\"infotex\">\n";

	for(i in manager)
	{
		if( manager[i][0] == cmpy ) {
			findFrm += 		obs(manager[i][1]);
		}

	} //end loop

	findFrm += "															</td>\n";
	findFrm += "														</tr>\n";

	findFrm += "														<tr>\n";
	findFrm += "															<td class=\"infotextheadingtd\" width=\"175\">\n";
	findFrm += ml(t__Equipment_Code)+"<br>"+ml(t__contains_char)+":\n";
	findFrm += "															</td>\n";
	findFrm += "															<td>\n";
	findFrm += "																<input type=\"text\" name=\"equip\" />\n";
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
	findFrm += "													\n";
	findFrm += "													<input type=\"hidden\" name=\"op\" value=\"15\" />\n";
	findFrm += "													<input type=\"hidden\" name=\"pg\" value=\"1\" />\n";
	findFrm += "													<input type=\"hidden\" name=\"cmpy\" value=\"" + cmpy + "\" />\n";
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


function displayInfo()
{

	var i = 1;

	var infoPage = "";
	infoPage += "	<tr>\n";
	infoPage += "		<td align=\"center\">\n";
	infoPage += "			<div class=\"button\">\n";
	infoPage += "				<a href=\"equip_list.cgi?pg="+pg+"&cmpy="+cmpy+"&op=0\">"+ml(t__Back_to_Equipment_List)+"</a></div><br>\n";
	infoPage += "		</td>\n";
	infoPage += "	</tr>\n";

	infoPage += "	<tr>\n";
	infoPage += "		<td>\n";

	//infoPage += fieldst_HTML(ml( t__Equipment_Details ));

	infoPage += "		      <div id=\"helparea\">\n";
	infoPage += "					<table width=\"100%\">\n";
	infoPage += "						<tr>\n";
	infoPage += "							<td width=\"100%\">\n";
	infoPage += "								<table width=\"100%\">\n";
	infoPage += "									<tr>\n";
	infoPage += "										<td width=\"50%\">\n";
	infoPage += "											<table>\n";
	infoPage += "												<tr>\n";
	infoPage += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	infoPage += ml(t__Code)+":\n";
	infoPage += "													</td>\n";
	infoPage += "													<td width=\"5\" align=\"center\" class=\"infotext\">\n";
	infoPage += "														<span class=\"mandatory\">&nbsp;</span>\n";
	infoPage += "													</td>\n";
	infoPage += "													<td class=\"infotext\">\n";
	infoPage += "														" + equip_list_tab[i][0];
	infoPage += "													</td>\n";
	infoPage += "												</tr>\n";
	infoPage += "											</table>\n";
	infoPage += "										</td>\n";
	infoPage += "										<td width=\"50%\">\n";
	infoPage += "											<table>\n";
	infoPage += "												<tr>\n";
	infoPage += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	infoPage += ml(t__Equipment_Type)+":\n";
	infoPage += "													</td>\n";
	infoPage += "													<td width=\"5\" align=\"center\"class=\"infotext\">\n";
	infoPage += "														<span class=\"mandatory\">&nbsp;</span>\n";
	infoPage += "													</td>\n";
	infoPage += "													<td class=\"infotext\">\n";
	infoPage += "														" + equip_list_tab[i][2];
	infoPage += "													</td>\n";
	infoPage += "												</tr>\n";
	infoPage += "											</table>\n";  
	infoPage += "										</td>\n";
	infoPage += "									</tr>\n";
	infoPage += "									<tr>\n";
	infoPage += "										<td width=\"50%\">\n";
	infoPage += "											<table>\n";
	infoPage += "												<tr>\n";
	infoPage += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	infoPage += ml(t__Loading_Lock)+":\n";
	infoPage += "													</td>\n";
	infoPage += "													<td width=\"5\" align=\"center\" class=\"infotext\">\n";
	infoPage += "														<span class=\"mandatory\"></span>\n";
	infoPage += "													</td>\n";
	infoPage += "													<td class=\"infotext\">\n";
	infoPage += "														" + equip_list_tab[i][4];
	infoPage += "													</td>\n";
	infoPage += "												</tr>\n";
	infoPage += "											</table>\n";
	infoPage += "										</td>\n";
	infoPage += "										<td width=\"50%\">\n";
	infoPage += "											<table>\n";
	infoPage += "												<tr>\n";
	infoPage += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	infoPage += ml(t__Preload_Weigh)+":\n";
	infoPage += "													</td>\n";
	infoPage += "													<td width=\"5\" align=\"center\" class=\"infotext\">\n";
	infoPage += "														<span class=\"mandatory\"></span>\n";
	infoPage += "													</td>\n";
	infoPage += "													<td class=\"infotext\">\n"; 
	infoPage += "														" + equip_list_tab[i][5];
	infoPage += "													</td>\n";
	infoPage += "												</tr>\n";
	infoPage += "											</table>\n";
	infoPage += "										</td>\n";
	infoPage += "									</tr>\n";
	infoPage += "								</table>\n";
	infoPage += "							</td>\n";
	infoPage += "						</tr>\n";
	infoPage += "					</table>\n";
	infoPage += "		      </div>\n";

//    infoPage += fieldstFoot_HTML();

	infoPage += "		</td>\n";
	infoPage += "	</tr>\n";

	infoPage += "	<tr><td> &nbsp;	</td></tr>\n";

	return infoPage;
} //End Display Info



function expiryForm()
{

	var q = 1;
	var i = 1;
    var dspdate = "";
	var expiryFrm = "";


	expiryFrm += displayInfo();

	expiryFrm += "	<form name=\"expiryFrm\" method=\"get\" id=\"expiryFrm\" onsubmit=\"return submitmyform(this)\">\n";
	expiryFrm += "	<tr>\n";
	expiryFrm += "		<td>\n";

	expiryFrm += " <ul id=\"tabmenu\">\n";
	expiryFrm += "<li>"+ml(t__Expiry_Date)+"</li>\n";
	expiryFrm += "</ul>\n";
	expiryFrm += "<div class=\"adminform\">\n";

	expiryFrm += "					<table width=\"100%\">\n";
	expiryFrm += "						<tr>\n";
	expiryFrm += "							<td class=\"infotext\" width=\"100%\">\n";

	//	expiryFrm += ml(t__All_the_fields_labelled_with_an)+"  (<span style=\"COLOR: #FF0000;\">*</span>) "+ml(t__are_mandatory)+"\n";

	expiryFrm += "							</td>\n";
	expiryFrm += "						</tr>\n";
	expiryFrm += "						<tr>\n";
	expiryFrm += "							<td width=\"100%\">\n";
	expiryFrm += "								<table width=\"100%\">\n";

	expiryFrm += "									<tr>\n";
	expiryFrm += "										<td width=\"60%\">\n";
	expiryFrm += "											<table>\n";
	expiryFrm += "												<tr>\n";
	expiryFrm += "													<td class=\"infotextheadingtd\" width=\"200\">\n";
	expiryFrm += "                                                      &nbsp; \n";
	expiryFrm += "													</td>\n";
	expiryFrm += "													<td width=\"5\" align=\"center\" class=\"infotext\">\n";
	expiryFrm += "														<span class=\"mandatory\"></span>\n";
	expiryFrm += "													</td>\n";
	expiryFrm += "													<td class=\"infotextheadingtd\">\n";
	expiryFrm += 														ml(t__Expiry_Date)+"\n";
	expiryFrm += "													</td>\n";
	expiryFrm += "												</tr>\n";
	expiryFrm += "											</table>\n";
	expiryFrm += "										</td>\n";
	expiryFrm += "										<td width=\"40%\">\n";
	expiryFrm += "										</td>\n";
	expiryFrm += "									</tr>\n";

	//  Change it to dynamic heading. Need to consider the transaltion if in EN and CHN.

	for ( q == 1; q < expry_title_tab.length ; q++ ) {
        dspdate = equip_list_tab[1][parseInt(q)+9];

		expiryFrm += "									<tr>\n";
		expiryFrm += "										<td width=\"60%\">\n";
		expiryFrm += "											<table>\n";
		expiryFrm += "												<tr>\n";
		expiryFrm += "													<td class=\"infotextheadingtd\" width=\"200\">\n";
		expiryFrm += expry_title_tab[q][1]+":\n";
		expiryFrm += "													</td>\n";
		expiryFrm += "													<td width=\"5\" align=\"center\" class=\"infotext\">\n";
		expiryFrm += "														<span class=\"mandatory\"></span>\n";
		expiryFrm += "													</td>\n";
		expiryFrm += "													<td>\n";
		expiryFrm += "														<input type=\"text\" name=\"expDate"+q+"\" size=\"10\" value=\""+dspdate+"\" readonly/>\n";
		expiryFrm += dateURL_HTML("document.forms[0].expDate"+q, "date_anchor"+q , "yyyy-MM-dd", ml(t__Select_Date));
		expiryFrm += "													</td>\n";
		expiryFrm += "												</tr>\n";
		expiryFrm += "											</table>\n";
		expiryFrm += "										</td>\n";
		expiryFrm += "										<td width=\"40%\">\n";
		expiryFrm += "										</td>\n";
		expiryFrm += "									</tr>\n";

	}

	expiryFrm += "								</table>\n";
	expiryFrm += "							</td>\n";
	expiryFrm += "						</tr>\n";
	expiryFrm += "						<tr>\n";
	expiryFrm += "							<td align=\"center\">\n";
	expiryFrm += "								<table>\n";
	expiryFrm += "									<tr>\n";
	expiryFrm += "										<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	expiryFrm += "											<input type=\"hidden\" name=\"cmpy\" id=\"cmpy\" value=\""+cmpy+"\" />\n";
	expiryFrm += "											<input type=\"hidden\" name=\"equipID\" id=\"equipID\" value=\""+equipID+"\" />\n";
	expiryFrm += "											<input type=\"hidden\" name=\"cmd\" id=\"cmd\" value=\"EXP\" />\n";
	expiryFrm += "											<input type=\"submit\" value=\""+ml(t__Save)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	expiryFrm += "											<input type=\"hidden\" name=\"op\" id=\"op\" value=\"11\" />\n";
	expiryFrm += "										</td>\n";
	expiryFrm += "									</tr>\n";
	expiryFrm += "								</table>\n";
	expiryFrm += "							</td>\n";
	expiryFrm += "						</tr>\n";
	expiryFrm += "					</table>\n";
	expiryFrm += "			</div>\n";
	expiryFrm += "		</td>\n";
	expiryFrm += "	</tr>\n";
	expiryFrm += "	</form>\n";

	return expiryFrm;
} //End expiry Form



/*  OLD style
function expiryForm()
{

	var i = 1;

	var expiryFrm = "";

	expiryFrm += displayInfo();

	expiryFrm += "	<form name=\"expiryFrm\" method=\"get\" id=\"expiryFrm\" onsubmit=\"return submitmyform(this)\">\n";
	expiryFrm += "	<tr>\n";
	expiryFrm += "		<td>\n";

	expiryFrm += " <ul id=\"tabmenu\">\n";
	expiryFrm += "<li>"+ml(t__Equipment_Details)+"</li>\n";
	expiryFrm += "</ul>\n";
	expiryFrm += "<div class=\"adminform\">\n";

	expiryFrm += "					<table width=\"100%\">\n";
	expiryFrm += "						<tr>\n";
	expiryFrm += "							<td class=\"infotext\" width=\"100%\">\n";
	expiryFrm += ml(t__All_the_fields_labelled_with_an)+"  (<span style=\"COLOR: #FF0000;\">*</span>) "+ml(t__are_mandatory)+"\n";
	expiryFrm += "							</td>\n";
	expiryFrm += "						</tr>\n";
	expiryFrm += "						<tr>\n";
	expiryFrm += "							<td width=\"100%\">\n";
	expiryFrm += "								<table width=\"100%\">\n";
	expiryFrm += "									<tr>\n";
	expiryFrm += "										<td width=\"60%\">\n";
	expiryFrm += "											<table>\n";
	expiryFrm += "												<tr>\n";
	expiryFrm += "													<td class=\"infotextheadingtd\" width=\"200\">\n";
	expiryFrm += ml(t__Prime_Mover_Registration_Expired)+":\n";
	expiryFrm += "													</td>\n";
	expiryFrm += "													<td width=\"5\" align=\"center\" class=\"infotext\">\n";
	expiryFrm += "														<span class=\"mandatory\"></span>\n";
	expiryFrm += "													</td>\n";
	expiryFrm += "													<td>\n";
	expiryFrm += "														<input type=\"text\" name=\"regDate\" size=\"10\" value=\""+equip_list_tab[1][10]+"\" readonly/>\n";
	expiryFrm += dateURL_HTML("document.forms[0].regDate", "date_anchor1","yyyy-MM-dd",ml(t__Select_Date));
	expiryFrm += "													</td>\n";
	expiryFrm += "												</tr>\n";
	expiryFrm += "											</table>\n";
	expiryFrm += "										</td>\n";
	expiryFrm += "										<td width=\"40%\">\n";
	expiryFrm += "										</td>\n";
	expiryFrm += "									</tr>\n";
	expiryFrm += "									<tr>\n";
	expiryFrm += "										<td width=\"60%\">\n";
	expiryFrm += "											<table>\n";
	expiryFrm += "												<tr>\n";
	expiryFrm += "													<td class=\"infotextheadingtd\" width=\"200\">\n";
	expiryFrm += ml(t__Prime_mover_SLP_Expired)+":\n";
	expiryFrm += "													</td>\n";
	expiryFrm += "													<td width=\"5\" align=\"center\" class=\"infotext\">\n";
	expiryFrm += "														<span class=\"mandatory\"></span>\n";
	expiryFrm += "													</td>\n";
	expiryFrm += "													<td>\n";
	expiryFrm += "														<input type=\"text\" name=\"slpDate\" size=\"10\" value=\""+equip_list_tab[1][11]+"\" readonly/>\n";
	expiryFrm += dateURL_HTML("document.forms[0].slpDate", "date_anchor2","yyyy-MM-dd",ml(t__Select_Date));
	expiryFrm += "													</td>\n";
	expiryFrm += "												</tr>\n";
	expiryFrm += "											</table>\n";
	expiryFrm += "										</td>\n";
	expiryFrm += "										<td width=\"40%\">\n";
	expiryFrm += "										</td>\n";
	expiryFrm += "									</tr>\n";
	expiryFrm += "									<tr>\n";
	expiryFrm += "										<td width=\"60%\">\n";
	expiryFrm += "											<table>\n";
	expiryFrm += "												<tr>\n";
	expiryFrm += "													<td class=\"infotextheadingtd\" width=\"200\">\n";
	expiryFrm += ml(t__Trailer_SLP_Expired)+":\n";
	expiryFrm += "													</td>\n";
	expiryFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	expiryFrm += "														<span class=\"mandatory\"></span>\n";
	expiryFrm += "													</td>\n";
	expiryFrm += "													<td>\n";
	expiryFrm += "														<input type=\"text\" name=\"trailerDate\" size=\"10\" value=\""+equip_list_tab[1][12]+"\" readonly/>\n";
	expiryFrm += dateURL_HTML("document.forms[0].trailerDate", "date_anchor3","yyyy-MM-dd",ml(t__Select_Date));
	expiryFrm += "													</td>\n";
	expiryFrm += "												</tr>\n";
	expiryFrm += "											</table>\n";
	expiryFrm += "										</td>\n";
	expiryFrm += "										<td width=\"40%\">\n";
	expiryFrm += "										</td>\n";
	expiryFrm += "									</tr>\n";
	expiryFrm += "								</table>\n";
	expiryFrm += "							</td>\n";
	expiryFrm += "						</tr>\n";
	expiryFrm += "						<tr>\n";
	expiryFrm += "							<td align=\"center\">\n";
	expiryFrm += "								<table>\n";
	expiryFrm += "									<tr>\n";
	expiryFrm += "										<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	expiryFrm += "											<input type=\"hidden\" name=\"cmpy\" id=\"cmpy\" value=\""+cmpy+"\" />\n";
	expiryFrm += "											<input type=\"hidden\" name=\"equipID\" id=\"equipID\" value=\""+equipID+"\" />\n";
	expiryFrm += "											<input type=\"hidden\" name=\"cmd\" id=\"cmd\" value=\"EXP\" />\n";
	expiryFrm += "											<input type=\"submit\" value=\""+ml(t__Save)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	expiryFrm += "											<input type=\"hidden\" name=\"op\" id=\"op\" value=\"11\" />\n";
	expiryFrm += "										</td>\n";
	expiryFrm += "									</tr>\n";
	expiryFrm += "								</table>\n";
	expiryFrm += "							</td>\n";
	expiryFrm += "						</tr>\n";
	expiryFrm += "					</table>\n";

	expiryFrm += "			</div>\n";

	expiryFrm += "		</td>\n";
	expiryFrm += "	</tr>\n";
	expiryFrm += "	</form>\n";

	return expiryFrm;
} //End expiry Form
*/



function pmForm()
{

	var i = 1;

	var pmFrm = "";

	pmFrm += displayInfo();

	pmFrm += "	<form name=\"pmFrm\" method=\"get\" id=\"pmFrm\" onsubmit=\"return submitmyform(this)\">\n";
	pmFrm += "	<tr>\n";
	pmFrm += "		<td>\n";

	pmFrm += " <ul id=\"tabmenu\">\n";
	pmFrm += "<li>"+ml(t__Equipment_Details)+"</li>\n";
	pmFrm += "</ul>\n";
	pmFrm += "<div class=\"adminform\">\n";

	pmFrm += "					<table width=\"100%\">\n";
	pmFrm += "						<tr>\n";
	pmFrm += "							<td class=\"infotext\" width=\"100%\">\n";
	pmFrm += ml(t__All_the_fields_labelled_with_an)+" (<span style=\"COLOR: #FF0000;\">*</span>) "+"are mandatory\n";
	pmFrm += "							</td>\n";
	pmFrm += "						</tr>\n";
	pmFrm += "						<tr>\n";
	pmFrm += "							<td width=\"100%\">\n";
	pmFrm += "								<table width=\"100%\">\n";
	pmFrm += "									<tr>\n";
	pmFrm += "										<td width=\"60%\">\n";
	pmFrm += "											<table>\n";
	pmFrm += "												<tr>\n";
	pmFrm += "													<td class=\"infotextheadingtd\" width=\"200\">\n";
	pmFrm += ml(t__Prime_Mover_Pulling_Limit)+" (Kg):\n";
	pmFrm += "													</td>\n";
	pmFrm += "													<td width=\"5\" align=\"center\" class=\"infotext\">\n";
	pmFrm += "														<span class=\"mandatory\">*</span>\n";
	pmFrm += "													</td>\n";
	pmFrm += "													<td>\n";
	pmFrm += "														<input type=\"text\" name=\"pmLimit\" value=\""+equip_list_tab[1][13]+"\" dataType=\"PositiveInt\" msg=\""+ml(t__Enter_Compartment_Limit)+"\" size=\"9\" maxlength=\"9\" onChange=\"isInteger(this)\" />\n";
	pmFrm += "													</td>\n";
	pmFrm += "												</tr>\n";
	pmFrm += "											</table>\n";
	pmFrm += "										</td>\n";
	pmFrm += "										<td width=\"40%\">\n";
	pmFrm += "										</td>\n";
	pmFrm += "									</tr>\n";
	pmFrm += "								</table>\n";
	pmFrm += "							</td>\n";
	pmFrm += "						</tr>\n";
	pmFrm += "						<tr>\n";
	pmFrm += "							<td align=\"center\">\n";
	pmFrm += "								<table>\n";
	pmFrm += "									<tr>\n";
	pmFrm += "										<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	pmFrm += "											<input type=\"hidden\" name=\"cmpy\" id=\"cmpy\" value=\""+cmpy+"\" />\n";
	pmFrm += "											<input type=\"hidden\" name=\"equipID\" id=\"equipID\" value=\""+equipID+"\" />\n";
	pmFrm += "											<input type=\"hidden\" name=\"cmd\" id=\"cmd\" value=\"CPT\" />\n";
	pmFrm += "											<input type=\"hidden\" name=\"op\" id=\"op\" value=\"13\" />\n";
	pmFrm += "											<input type=\"submit\" value=\""+ml(t__Save)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	pmFrm += "										</td>\n";
	pmFrm += "									</tr>\n";
	pmFrm += "								</table>\n";
	pmFrm += "							</td>\n";
	pmFrm += "						</tr>\n";
	pmFrm += "					</table>\n";

	pmFrm += "			</div>\n";

	pmFrm += "		</td>\n";
	pmFrm += "	</tr>\n";
	pmFrm += "	</form>\n";

	return pmFrm;
} //End pmForm


function emptyForm()
{

	var i = 1;

	var emptyFrm = "";

	emptyFrm += displayInfo();

	emptyFrm += "	<form name=\"emptyFrm\" method=\"get\" id=\"emptyFrm\" onsubmit=\"return submitmyform(this)\">\n";
	emptyFrm += "	<tr>\n";
	emptyFrm += "		<td>\n";

	emptyFrm += " <ul id=\"tabmenu\">\n";
	emptyFrm += "<li>"+ml(t__Equipment_Details)+"</li>\n";
	emptyFrm += "</ul>\n";
	emptyFrm += "<div class=\"adminform\">\n";

	emptyFrm += "					<table width=\"100%\">\n";
	emptyFrm += "						<tr>\n";
	emptyFrm += "							<td class=\"infotext\" width=\"100%\">\n";
	emptyFrm += ml(t__All_the_fields_labelled_with_an)+"  (<span style=\"COLOR: #FF0000;\">*</span>) "+ml(t__are_mandatory)+"\n";
	emptyFrm += "							</td>\n";
	emptyFrm += "						</tr>\n";
	emptyFrm += "						<tr>\n";
	emptyFrm += "							<td width=\"100%\">\n";
	emptyFrm += "								<table width=\"100%\">\n";
	emptyFrm += "									<tr>\n";
	emptyFrm += "										<td width=\"50%\">\n";
	emptyFrm += "											<table>\n";
	emptyFrm += "												<tr>\n";
	emptyFrm += "													<td class=\"infotextheadingtd\" width=\"150\">\n";
	emptyFrm += ml(t__Empty_Weight)+":\n";
	emptyFrm += "													</td>\n";
	emptyFrm += "													<td width=\"5\" align=\"center\" class=\"infotext\">\n";
	emptyFrm += "														<span class=\"mandatory\">*</span>\n";
	emptyFrm += "													</td>\n";
	emptyFrm += "													<td>\n";
	emptyFrm += "														<input type=\"text\" name=\"empty\" value=\""+equip_list_tab[1][14]+"\" dataType=\"PositiveIntGteZero\" msg=\""+ml(t__ALERT_Empty_Weight)+"\" size=\"9\" maxlength=\"9\" onChange\"isInteger(this)\" /> &nbsp; <span class=\"infotext\">"+ml(t__Kg)+"</span>\n";
	emptyFrm += "													</td>\n";
	emptyFrm += "												</tr>\n";
	emptyFrm += "											</table>\n";
	emptyFrm += "										</td>\n";
	emptyFrm += "										<td width=\"50%\">\n";
	emptyFrm += "										</td>\n";
	emptyFrm += "									</tr>\n";
	emptyFrm += "								</table>\n";
	emptyFrm += "							</td>\n";
	emptyFrm += "						</tr>\n";
	emptyFrm += "						<tr>\n";
	emptyFrm += "							<td align=\"center\">\n";
	emptyFrm += "								<table>\n";
	emptyFrm += "									<tr>\n";
	emptyFrm += "										<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	emptyFrm += "											<input type=\"hidden\" name=\"cmpy\" id=\"cmpy\" value=\""+cmpy+"\" />\n";
	emptyFrm += "											<input type=\"hidden\" name=\"equipID\" id=\"equipID\" value=\""+equipID+"\" />\n";
	emptyFrm += "											<input type=\"hidden\" name=\"cmd\" id=\"cmd\" value=\"EXP\" />\n";
	emptyFrm += "											<input type=\"hidden\" name=\"op\" id=\"op\" value=\"12\" />\n";
	emptyFrm += "											<input type=\"submit\" value=\""+ml(t__Save)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	emptyFrm += "										</td>\n";
	emptyFrm += "									</tr>\n";
	emptyFrm += "								</table>\n";
	emptyFrm += "							</td>\n";
	emptyFrm += "						</tr>\n";
	emptyFrm += "					</table>\n";

	emptyFrm += "			</div>\n";

	emptyFrm += "		</td>\n";
	emptyFrm += "	</tr>\n";
	emptyFrm += "	</form>\n";

	return emptyFrm;
} //End emptyForm


function displayGlblFrm()
{
	var button ="";

	/* Enabled or Disabled Buttons */
	if(cmpy == "-1" || cmpy == "-99")
	{
		button = "disabled";

	}

	var glblFrm = "";

//	glblFrm += " <tr>\n";
//	glblFrm += " 		<td align=\"left\">\n";

    glblFrm += fieldst_HTML(ml(t__Owner_list));
	glblFrm += "       	<form name=\"glblFrm\" id=\"glblFrm\">\n";
	glblFrm += "          	<input type=\"hidden\" name=\"op\" value=\"0\">\n";
	glblFrm += "          	<input type=\"hidden\" name=\"pg\" value=\"1\">\n";
	glblFrm += "          	<div class=\"adminform\">\n";
	glblFrm += ml(t__Select_the_Owner)+", "+ml(t__To_View_Equipment_List)+"\n";
	glblFrm += "             		<table>\n";
	glblFrm += "                		<tr>\n";
	glblFrm += "                   		<td class=\"infotextheading\">\n";
	glblFrm += ml(t__Owner)+":\n";
	glblFrm += "                   		</td>\n";
	glblFrm += "                   		<td>\n";
	glblFrm += "                       		<select name=\"cmpy\" id=\"cmpy\" onchange=\"submit();\"> \n";

	glblFrm += displayDropList99(cmpy, manager, ""+ml(t__Select_an_Owner)+"");

	glblFrm += "                       		<input type=\"button\" value=\""+ml(t__View)+"\" name=\"view\"   onclick=\"document.glblFrm.pg.value=1;document.glblFrm.op.value=0;document.glblFrm.submit();\" "+button+" >\n";
	glblFrm += "                       		<input type=\"button\" value=\""+ml(t__Add)+"\" name=\"add\"   onclick=\"document.glblFrm.pg.value=1;document.glblFrm.op.value=8;document.glblFrm.submit();\" "+button+">\n";
	//  glblFrm += "                       		<input type=\"button\" value=\"Print\" name=\"printMe\" id=\"printMe\"  onclick=\"printSpecialWithTitle('EQUIPMENT LIST')\">\n";
	glblFrm += "                       		<input type=\"button\" value=\""+ml(t__Find)+"\" name=\"find\" id=\"find\"  onclick=\"document.glblFrm.pg.value=1;document.glblFrm.op.value=5;document.glblFrm.submit();\" "+button+">\n";
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
		next += "<a href=\"javascript:document.glblFrm.pg.value=pg-1;document.glblFrm.op.value=0;document.glblFrm.submit();\">"+ml(t__Previous)+"</a>\n";
	}
	next += "&nbsp; "+ml(t__Current)+"=" + pg;
	next += "/";
	next += pagesTotal;
	if (pagesTotal > pg)
	{
		next += "&nbsp; <a href=\"javascript:document.glblFrm.pg.value=pg+1;document.glblFrm.op.value=0;document.glblFrm.submit();\">"+ml(t__Next)+"</a>\n";
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

function checkBox(name, value)
{
	var checkBox = "";

	if(value == 'YES' || value == 'yes' || value == ml(t__YES))
	{
		checkBox += "<input type=\"checkbox\" name=\""+name+"\" checked>\n";	
	}else{
		checkBox += "<input type=\"checkbox\" name=\""+name+"\">\n";
	}

	return checkBox;

}




function obs(data)
{
	return data;
}

function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;
	if (op < 1 || op > 10)
	{
		pageHeading +=ml(t__EQUIPMENT_LIST);
	}
	else if(op == 10)
	{
		pageHeading +=ml(t__SET_COMPARTMENT_RETURN);
	}
	else if(op == 9)
	{
		pageHeading +=ml(t__DELETE_EQUIPMENT);
	}
	else if(op == 8)
	{
		pageHeading +=ml(t__ADD_NEW_EQUIPMENT);
	}
	else if(op == 7)
	{
		pageHeading +=ml(t__MODIFY_EQUIPMENT);
	}
	else if(op == 6)
	{
		pageHeading +=ml(t__COMPARTMENT_LIMITS);
	}
	else if(op == 5)
	{
		pageHeading +=ml(t__FIND_EQUIPMENT);
	}
	else if(op == 4)
	{
		pageHeading +=ml(t__TANKER_RETURN);
	}
	else if(op == 3)
	{
		pageHeading +=ml(t__PRIME_MOVER_LIMITS);
	}
	else if(op == 2)
	{
		pageHeading +=ml(t__EMPTY_WEIGHT);
	}
	else if(op == 1)
	{
		pageHeading +=ml(t__EXPIRY_DATE);
	}



	return pageHeading;   
}

function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;
	if (op < 1 || op > 10)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Equipment_List_Page);

	}
	else if(op == 1)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Expiry_Date_Page); 
	}  
	else if(op == 2)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Empty_Weight_Page); 
	}
	else if(op == 3)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Prime_Mover_Limits_Page); 
	}
	else if(op == 4)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Set_Equipment_Page); 
	}
	else if(op == 5)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Find_Equipment_Page); 
	}
	else if(op == 6)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Compartment_Limits_Page); 
	}
	else if (op == 7 || op == 8)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Update_Equipment_Page);

	}
	else if(op == 9)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Delete_Equipment_Page);
	}
	else if(op == 10)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Set_Compartment_Returns_Page); 
	}


	return pageTitle;
}


/* define function op_list() */
function op_list(priv, compartment)
{
	/* priv = 
	   6 modify	
	   7 add		
	   8 delete	
	 */
	var op_list ="";
	op_list +="<select name=op onchange=\"sendoption(this, "+compartment+");\" width=\"180\" style=\"width: 180px\" >          ";
	switch (priv)
	{
		case 8:
			op_list +="<option value=9>"+ml(t__DELETE)+"</option>";
		case 7:			
			op_list +="<option value=7>"+ml(t__MODIFY)+"</option>";
			op_list +="<option value=1>"+ml(t__EXPIRY_DATES)+"</option>";
			op_list +="<option value=2>"+ml(t__EMPTY_WEIGHT)+"</option>";
			if(compartment == 0)
			{
				//  	  			op_list +="<option value=3 >"+ml(t__PRIME_MOVER_LIMITS)+"</option>";
			} else {
				op_list +="<option value=6>"+ml(t__COMPARTMENTAL_LIMITS)+"</option>";
			}
		case 6:

		case 5:			
			op_list +="<option value=4>"+ml(t__TANKER_RETURNS)+"</option>";

			break;
	}
	op_list +="<option value=0 selected>--\t"+ml(t__YOUR_ACTION)+"\t--</option>";
	op_list +="</select>                                        ";
	return op_list ;
}

/* define function op_list() */
function op_list2()
{
	/* priv = 
	   6 modify	
	   7 add		
	   8 delete	
	 */
	var op_list ="";
	op_list +="<select name=op onchange=\"submit();\">";

	switch (priv)
	{
		case 8:

		case 7:			

			op_list +="<option value=10>"+ml(t__SET_COMPARTMENT_RETURNS)+"</option>";
			op_list +="<option value=14>"+ml(t__SAVE_AS_PRELOADED)+"</option>";
		case 6:

		case 5:			

			break;
	}
	op_list +="<option value=0 selected>--\t"+ml(t__YOUR_ACTION)+"\t--</option>";
	op_list +="</select>                                        ";
	return op_list ;
}


function chkSf2Capa(myobject) 
{
  var totalNumOfCmpts = (cmpt_list_tab.length); //ignore the first entry
  if(totalNumOfCmpts>1 && submitmyform(myobject)) // time to validate all the compts safe fill against cp
  {
    for (i = 1; i < totalNumOfCmpts; i++)
    {
      sf = parseInt(eval("document.cmptFrm.cmptsfl"+i+".value;"));
      cp = parseInt(eval("document.cmptFrm.sflcap"+i+".value;"));
      
      if(cp!=0 && (sf>cp))
      {
        eval("document.cmptFrm.cmptsfl"+i+".focus();");
        alert(ml(t__MsgValidSafeFill)+" "+ml(t__Compartment)+" "+i);
        return false;
      }
    }
  }
  else
  {
    return false;
  }
  return true;
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
function local_HeadrHTML( newPage )
{
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
	newPage +="	return Validator.Validate(myobject,1);\n";
	newPage +="}\n";
	newPage +="\n";

	newPage +="\n";
	newPage +="//foward option \n";
	newPage +="function sendoption(element, compartment)\n";
	newPage +="{\n";
	newPage +=" \n";
	newPage +="	var value = element.options[element.selectedIndex].value;\n";
	newPage +="	var frm = element.parentNode.parentNode.parentNode.parentNode.parentNode;\n";
	newPage +="\n";
	newPage +="	switch (value)\n";
	newPage +="	{\n";
	newPage +="		case '4':\n";
	newPage +="			if(compartment == 0) {\n";
	newPage +="				alert(' "+ml(t__ALERT_COMPARTMENT)+"');\n";
	newPage +="				frm.reset();\n";
	newPage +="			} else {\n";
	newPage +="				frm.submit();\n";
	newPage +="			}\n";
	newPage +="			break;\n";
	newPage +="		default:\n";
	newPage +="			frm.submit();\n";
	newPage +="			break;\n";
	newPage +="	}\n";
	newPage +="}\n";

	newPage +="function returnOP(element, compartment )\n";
	newPage +="{\n";
	newPage +=" \n";
	newPage +="	var value = element.options[element.selectedIndex].value;\n";
	newPage +="	var frm = element.parentNode.parentNode.parentNode.parentNode.parentNode;\n";
	newPage +="\n";
	newPage +="	switch (value)\n";
	newPage +="	{\n";
	newPage +="		case '11':\n";
	newPage +="			if(compartment == 0) {\n";
	newPage +="				alert(' "+ml(t__ALERT_COMPARTMENT)+"');\n";
	newPage +="				frm.reset();\n";
	newPage +="			} else {\n";
	newPage +="				frm.submit();\n";
	newPage +="			}\n";
	newPage +="			break;\n";
	newPage +="		default:\n";
	newPage +="			frm.submit();\n";
	newPage +="			break;\n";
	newPage +="	}\n";
	newPage +="}\n";
	newPage +="\n";

	newPage +="//set product \n";
	newPage +="function setProduct(myId, event)\n";
	newPage +="{\n";
	newPage +=" \n";
	newPage +="	document.setReturnFrm.prodNm.value='';\n";
	newPage +="	document.setReturnFrm.prod.value='';\n";
	newPage +="	var value = document.getElementById('drawer');\n";
	newPage +="	var tmp=\"equiplist_product.cgi?cmpy=\" + document.setReturnFrm.drawer.options[document.setReturnFrm.drawer.selectedIndex].value;\n";
	newPage +=" var lyr = getElemRefs('prodSelect_eq');\n";
	newPage +=" if (lyr) lyr.style.display = \"\";\n";
	newPage +=" 	document.getElementById('eq_iprod').src = tmp;\n";
	newPage +=" 	return (!showPopup(myId, event));\n";
	newPage +="}\n";

	newPage +="//Check existing equipcode \n";
	newPage +="function checkEqptCode(myobject)\n";
	newPage +="{\n";
	newPage +="	 if (Validator.Validate(myobject,1))\n";
	newPage +="	 {\n";
	newPage +="     var mycgi = '../../../cgi-bin/en/load_scheds/eqplist_code_dup_check.cgi'; \n";
	newPage +="     var myqry = 'cmpy="+cmpy+"&eqcode='+document.updateFrm.equip.value ;\n";
	newPage +="     var oTN = loadHtml(mycgi, myqry);\n";
	newPage +="	    if ( oTN != 0) { \n";
	newPage +="	           alert(' "+ml(t__ALERT_EQCODE_EXIST)+"');\n";
	newPage +="	           document.updateFrm.equip.focus ;\n";
	newPage +="            return false; \n";
	newPage +="	     }\n";
  	newPage +="    return true; \n";	
	newPage +="	}\n";
	newPage +="    return false; \n";
	newPage +="}\n";

	newPage +="function isInteger(r) {\n";
	newPage +="    var i;\n";
	newPage +="    var s = trim(r.value);\n";
	newPage +="    for (i = 0; i < s.length; i++)\n";
	newPage +="    {   \n";
	newPage +="        // Check that current character is number.\n";
	newPage +="        var c = s.charAt(i);\n";
	newPage +="        if (((c < \"0\") || (c > \"9\")))  { \n";
	newPage +="	           alert(' "+ml(t__ALERT_POSITIVE_INT_REQ)+"');\n";
	newPage +="           r.value = '';\n";
	newPage +="           return false;\n";
	newPage +="        } else {\n";
	newPage +="           return true; \n";
	newPage +="        }\n";
	newPage +="    }\n";
	newPage +="}\n";
	newPage +="function chkCapa2Sf(t,i) {\n";
	newPage +="    var sf = eval(\"document.cmptFrm.cmptsfl\"+i+\".value\"); \n";
	newPage +="    var cp = t.value; \n";
	newPage +="    if ( parseInt(cp) == 0 ) cp = 999999999; \n";
	newPage +="    if ( isInteger(t) ) \n";
	newPage +="    {\n";
	newPage +="       if ( parseInt(sf) > parseInt(cp) ) {\n";
	newPage +="          eval(\"document.cmptFrm.sflcap\"+i+\".focus()\"); \n";
	newPage +="          eval(\"document.cmptFrm.sflcap\"+i+\".value=''\"); \n";
	newPage +="          alert(' "+ml(t__MsgValidCapacity)+" "+ml(t__Compartment)+" '+i)\n";
	newPage +="          return false;\n";
	newPage +="       } else {\n";
	newPage +="         return true;\n";
	newPage +="       }\n";
	newPage +="    } else {\n";
	newPage +="       eval(\"document.cmptFrm.sflcap\"+i+\".focus();\"); \n";
	newPage +="       return false;\n";
	newPage +="    }\n";
	newPage +="}\n";

	newPage +="</script>\n";
	newPage +="\n";

	newPage +="</head>\n";
	newPage +="\n";
	newPage +="<body>\n";
	newPage +="\n";

	return (newPage);
}
function sortMultiDimensional(a,b){
	// this sorts the array using the second element
	return ((a[1] < b[1]) ? -1 : ((a[1] > b[1]) ? 1 : 0));
}
