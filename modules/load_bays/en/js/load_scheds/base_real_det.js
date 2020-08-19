/****************************************
 *
 * $Id: base_real_det.js,v 1.10 2011/05/23 03:23:57 bz Exp $
 *
##########**********##########**********##########**********##########**********##########**********##########**********/
var opValues = new Array();

// operations to order listing
opValues["baseBaseRealDet"] = 90200;
opValues["listBaseRealDet"] = 90201;
opValues["viewBaseRealDet"] = 90205;
opValues["modifyBaseRealDetForm"] = 90206;
opValues["modifyBaseRealDetSubmit"] = 90216;
opValues["insertBaseRealDetForm"] = 90207;
opValues["insertBaseRealDetSubmit"] = 90217;
opValues["applyBaseRealDetForm"] = 90208;
opValues["applyBaseRealDetSubmit"] = 90218;


//here is the text needed to be displayed on the screen
//var t__YOUR_OPTION = ["YOUR ACTION","请选择"];
var t__YOUR_ACTION = ["YOUR ACTION","请选择"];
var t__Modify_Real_Data = ["Modify","修改"];
var t__View_Real_Data = ["View Real-Time Data","查看实时数据"];
var t__Apply_Real_Data = ["Apply Real-Time Data","使用实时数据"];

var otherText = new Array();
//otherText["youraction"] =  ml(t__YOUR_OPTION);
otherText["youraction"] =  ml(t__YOUR_ACTION);
otherText["modifyRealData"] =  ml(t__Modify_Real_Data);
otherText["viewRealData"] =  ml(t__View_Real_Data);
otherText["applyRealData"] =  ml(t__Apply_Real_Data);


/* Language component */
var t__Base_Code = ["Base Code","基础油品代码"];
var t__Base_Name = ["Base Name","基础油品名称"];
var t__Real_Temp = ["Real Temp(C)","油品实际温度(C)"];
var t__Real_Dens = ["Real Dens(kg/m3)","油品实际密度(kg/m3)"];
var t__Real_Std_Dens = ["Real Std Dens(kg/m3)","油品实际标准密度(kg/m3)"];
var t__Real_VCF = ["Real VCF","实际体积补偿系数(VCF)"];
var t__Temp_Comp_Mthd = ["Comp Mthd","温度补偿方法"];
var t__Temp_Comp_Priority = ["Comp Priority","温度补偿优先级"];
var t__Real_Last_Updated = ["Last Updated","上次修改时间"];

var myColumns = [ml(t__Base_Code), ml(t__Base_Name), ml(t__Real_Temp), ml(t__Real_Dens), ml(t__Real_Std_Dens), ml(t__Real_VCF), ml(t__Temp_Comp_Mthd), ml(t__Temp_Comp_Priority), ml(t__Real_Last_Updated)];

var t__Vcf_Cal = ["VCF Cal Method","VCF计算方法"];
var t__Std_Dens_Cal = ["Std Dens Method","标准密度输入方式"];
var t__VCF_CAL_MANUAL = ["Calculate Manually (Sinopec Std)","人工查表计算(中石化标准)"];
var t__VCF_CAL_AUTO = ["Calculate Automatically (Sinopec Std)","自动查表计算(中石化标准)"];
var t__VCF_CAL_FORMULA = ["Calculate Automatically (International Std)","自动公式计算(国际标准)"];

var t__Select_Valid_Method = ["Select VCF Cal Method","请选择体积补偿系数的计算方法"];

var real_cal_mthd_jslst = [
["",""], 
["1", ml(t__VCF_CAL_AUTO)], 
["2", ml(t__VCF_CAL_FORMULA)], 

["3", ml(t__VCF_CAL_MANUAL)]
];

var t__Comp_Option1 = ["No Temp Compensation","不作温度补偿"];
var t__Comp_Option2 = ["Use Std Temp to Compensate","使用标准温度进行补偿"];
var t__Comp_Option3 = ["Use Real Temp to Compensate","使用实际温度进行补偿"];
var t__Comp_Option4 = ["Compensate When Real&gt;Pub Temp","实际温度高于公布温度时补偿"];
var t__Comp_Option5 = ["Compensate When Real&lt;Pub Temp","实际温度低于公布温度时补偿"];
var t__Comp_Option6 = ["Std Vol Compensate When Tr&gt;Tp","实际温度高于公布温度时补偿(标准温度发油)"];
var t__Comp_Option7 = ["Std Vol Compensate When Tr&lt;Tp","实际温度高于公布温度时补偿(标准温度发油)"];
var t__Comp_Option8 = ["Std Vol Compensate Always","温度补偿（标准温度发油）"];

var t__Comp_Options = new Array();
t__Comp_Options[0] = "";
t__Comp_Options[1] = ml(t__Comp_Option1);
t__Comp_Options[2] = ml(t__Comp_Option2);
t__Comp_Options[3] = ml(t__Comp_Option3);
t__Comp_Options[4] = ml(t__Comp_Option4);
t__Comp_Options[5] = ml(t__Comp_Option5);
t__Comp_Options[6] = ml(t__Comp_Option6);
t__Comp_Options[7] = ml(t__Comp_Option7);
t__Comp_Options[8] = ml(t__Comp_Option8);

var t__Select_Valid_Comp_Method = ["Select Compensation Method","请选择温度补偿方法"];

var temp_comp_mthd_jslst = [
["",""], 
["1", ml(t__Comp_Option1)], 
["2", ml(t__Comp_Option2)], 
["3", ml(t__Comp_Option3)], 
["4", ml(t__Comp_Option4)], 
["5", ml(t__Comp_Option5)]
];

if (unit_type=="STD_LITRE") //only when standard Litres loading is set for the site
{
	var temp_comp_mthd_jslst = [
["",""], 
["1", ml(t__Comp_Option1)], 
["6", ml(t__Comp_Option6)], 
["7", ml(t__Comp_Option7)], 
["8", ml(t__Comp_Option8)] 
];
}
var t__Comp_Priority_Option1 = ["ERP First","以ERP单据为准"];
var t__Comp_Priority_Option2 = ["Site First","以油库设定为准"];

var t__Comp_Priority_Options = new Array();
t__Comp_Priority_Options[0] = "";
t__Comp_Priority_Options[1] = ml(t__Comp_Priority_Option1);
t__Comp_Priority_Options[2] = ml(t__Comp_Priority_Option2);

var t__Select_Valid_Comp_Priority = ["Select Compensation Priority","请选择温度补偿优先级"];

var temp_comp_priority_jslst = [
["",""], 
["1", ml(t__Comp_Priority_Option1)], 
["2", ml(t__Comp_Priority_Option2)]
];


// add new dropdown list
var t__Std_Density_Option1 = ["Manual Input","人工输入"];
var t__Std_Density_Option2 = ["Auto Calculation","自动计算"];

var t__Std_Density_Options = new Array();
t__Std_Density_Options[0] = "";
t__Std_Density_Options[1] = ml(t__Std_Density_Option1);
t__Std_Density_Options[2] = ml(t__Std_Density_Option2);

var t__Select_Valid_Std_Density = ["Select How to Get Standard Density","请选择标准密度输入方式"];

var std_density_jslst = [
["",""], 
["1", ml(t__Std_Density_Option1)], 
["2", ml(t__Std_Density_Option2)]
];




var t__Successfully_Updated = ["Successfully Updated","成功更新"];
var t__Successfully_Inserted_A_New_Record = ["Successfully Inserted A New Record ","成功插入一条新记录"];
var t__Successfully_Deleted = ["Successfully Deleted","成功删除"];
var t__Update_Failed = ["Update Failed","更新失败"];
var t__Insert_New_Record_Failed = ["Insert New Record Failed","插入新纪录失败"];
var t__Delete_Failed = ["Delete Failed","删除失败"];
var t__VCF_Invalid = ["VCF invalid! Reallishing temperature or density may be out of DB range, please use International Formula to calculate!","更新失败! 公布温度和密度超出了客户提供的数据库范围，请使用国际标准公式计算！"];

var t__Back_to_Base_Real_Page = ["Back to Base Real Page","返回实际温度补偿参数管理页"];
var t__All_the_fields_labelled_with_an = ["All the fields labelled with an ","所有带"];
var t__are_mandatory = ["are mandatory","的项目必填"];
var t__Enter_Valid_Temp = ["Enter valid temperature","请输入正确的实际温度"];
var t__Enter_Valid_Dens = ["Enter valid density","请输入正确的实际密度"];
var t__Enter_Valid_VCF = ["Enter valid VCF","请输入正确的实际体积补偿系数(VCF)"];
var t__Reset = ["Reset","重置"];
var t__Do_you_wish_to_delete_this_row = ["Do you wish to delete this row?","您希望删除此行么？"];
var t__Delete = ["Delete","删除"];
var t__Modify = ["Modify","修改"];
var t__Find = ["Find","查找"];
var t__Previous = ["Previous","前"];
var t__Next = ["Next","后"];
var t__MODIFY_BASE_REAL = ["MODIFY BASE REAL DATA","修改实际温度补偿参数"];
var t__DKI_Omega_Menu = ["DKI Omega Menu","达基国际Omega系统菜单"];
var t__BASE_REAL_DET = ["Base Real Data Management","实际温度补偿参数管理"];
var t__Base_Real_det_Page = ["Base Real Data Page","实际温度补偿参数管理页"];

var t__cannot_modify = ["cannot modify","不能修改"];

var t__DISPLAY_BASE_REAL = ["Real Temperature, density and VCF (Temperature&Density from the latest loading data of same product)","实际温度和密度及相应的体积补偿系数(温度和密度取自最新完成的同类产品发油实时数据)"];


/* define op value */
var opAdd = opValues["insertBaseRealDetForm"];
var opApp = opValues["applyBaseRealDetForm"];
var opMod = opValues["modifyBaseRealDetForm"];

/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
var l_opInf= new Array()
for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
l_opInf[90226]= ml(t__Successfully_Updated)+"!";
l_opInf[90227]= ml(t__Successfully_Inserted_A_New_Record)+"!";
l_opInf[90228]= ml(t__Successfully_Deleted)+"!";
l_opInf[90236]= ml(t__Update_Failed)+"!";
l_opInf[90237]= ml(t__Insert_New_Record_Failed)+"!";
l_opInf[90238]= ml(t__Delete_Failed)+"!";
l_opInf[90246]= ml(t__VCF_Invalid)+"!";
l_opInf[90247]= ml(t__Insert_New_Record_Failed)+"!";
l_opInf[90248]= ml(t__Delete_Failed)+"!";



	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 90201,90204,90205,90206,90207,90207];
	var ops_req_search = [90201];// search never required on this page


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
	if (priv >= 5 && curViewDetailState == opValues["listBaseRealDet"]) 
	{
		newPage += displayBaseRealList (curPrivilage, curColumnToSort);
	}
	if (priv >= 5 && curViewDetailState == opValues["viewBaseRealDet"]) 
	{
//		newPage += displayOrderDetails (curPrivilage, curColumnToSort);
		newPage += displayBaseRealList (curPrivilage, curColumnToSort);
	}
		
	
	/* Display Form for Modify Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyBaseRealDetForm"])	
	{
		newPage += displayModifyBaseRealForm();
	}
	/* Submit the Modification of Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyBaseRealDetSubmit"])	
	{
		newPage += displayBaseRealList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Insert Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertBaseRealDetForm"])	
	{
		newPage += displayInsertBaseRealForm();
	}
	/* Submit the Insertion of Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertBaseRealDetSubmit"])	
	{
		newPage += displayBaseRealList(curPrivilage, curColumnToSort);
	}

	/* Submit the Deletion of Order Details */
	if (priv >= 6 && curViewDetailState == opValues["applyBaseRealDetSubmit"])	
	{
		newPage += displayBaseRealList(curPrivilage, curColumnToSort);
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





function displayBaseRealList(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm ="";

	dispFrm += makespace("\t", indent) + "<tr> \n";

	// end of the td and tr for the list area
	dispFrm += makespace("\t", indent) + "<td>\n ";  
	if( ((myColumns.length)> 0))
	{
		dispFrm += makespace("\t", indent+1) + "<div id=\"printReady\">\n";
		dispFrm += makespace("\t", indent+2) + table_begin("M", 0,"");
		dispFrm += makespace("\t", indent+2) + "<tbody> \n";
		dispFrm += makespace("\t", indent+2) + "<tr>\n";
		for(var i=0; i<myColumns.length; i++)
		{
			dispFrm += makespace("\t", indent+2) + "<td>" + myColumns[i] + "</td>\n";
		}
		dispFrm += makespace("\t", indent+2) + "</tr>\n";
	}

	for(i in base_real_jstab)
	{
		if (i>0)
		{
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone = 0;
			for(var j=0; j<myColumns.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(base_real_jstab[i][howmanyDone]) + "<\/td>";
				} 
				else 
				{
					dispFrm += makespace("\t", indent+2) + "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						dispFrm += makespace("\t", indent+3) + "<form name=\"select_action_" + i + "\" id=\"select_action_" + i + "\" >\n";
						dispFrm += makespace("\t", indent+4) + "<table border=\"0\">\n";
						dispFrm += makespace("\t", indent+4) + "<tr>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\"> <span style=\"COLOR: #FF0000;\">" + obs(base_real_jstab[i][howmanyDone]) + "</span>\n";
              
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"baseCd\" id=\"baseCd\" value=\"" + base_real_jstab[i][0] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

						dispFrm += makespace("\t", indent+5) + preqstr_field ();
						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

						dispFrm += makespace("\t", indent+5) + op_list (curPrivilage, base_real_jstab[i][howmanyDone], i);


						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "</tr>\n";
						dispFrm += makespace("\t", indent+4) + "</table>\n";
						dispFrm += makespace("\t", indent+3) + "</form>\n";
					}
					else
					{
						if ( j == 6 )
						{
							dispFrm += makespace("\t", indent+3) + obs( t__Comp_Options[ base_real_jstab[i][j] ] );
						}
						else
						if ( j == 7 )
						{
							dispFrm += makespace("\t", indent+3) + obs( t__Comp_Priority_Options[ base_real_jstab[i][howmanyDone] ]);
						}
						else
						{
							dispFrm += makespace("\t", indent+3) + obs(base_real_jstab[i][howmanyDone]);
						}
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
	dispFrm += makespace("\t", indent) + "</td>\n ";
	dispFrm += makespace("\t", indent) + "</tr>\n";

	return dispFrm;
}





function displayModifyBaseRealForm ()
{
	var indent = 1;
	var updFrm = "";
	var dateStr;
	var aId;

	if ( frm_base_real_mthd == "" || frm_base_real_mthd == "-1")
	{
		frm_base_real_mthd = 1;
	}
	if ( frm_std_dens_mthd == "" || frm_std_dens_mthd == "-1")
	{
		frm_std_dens_mthd = 1;
	}
	if (( frm_base_comp_mthd == "" || frm_base_comp_mthd == "-1") && (unit_type!="STD_LITRE") )
	{
		frm_base_comp_mthd = 3;
	}
	if (( frm_base_comp_mthd == "" || frm_base_comp_mthd == "-1") && (unit_type=="STD_LITRE") )
	{
		frm_base_comp_mthd = 1;
	}
	if ( frm_base_comp_priority == "" || frm_base_comp_priority == "-1")
	{
		frm_base_comp_priority = 1;
	}

	updFrm += makespace("\t", indent) + btnGroupModifyBaseReal_HTML();

	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td>\n";

	updFrm += makespace("\t", indent+1) + "<form name=\"edit_base_real\" method=\"get\" id=\"edit_base_real\" action=\"base_real_det.cgi\" onsubmit=\"return Validator.Validate(this,1);\" >\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + ml(t__MODIFY_BASE_REAL) + "</li>\n";
	updFrm += "</ul>\n";
	updFrm += "<div class=\"adminform\">\n";

	updFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	updFrm += makespace("\t", indent+4) + "<br>\n";
	updFrm += makespace("\t", indent+4) + ml(t__All_the_fields_labelled_with_an)+"(<span style=\"COLOR: #FF0000;\">*</span>)" + ml(t__are_mandatory) +"\n";

	// hidden area for passing values between web pages
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"baseCd\" id=\"baseCd\" value=\"" + baseCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"baseName\" id=\"baseName\" value=\"" + baseName + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"baseCat\" id=\"baseCat\" value=\"" + baseCat + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyBaseRealDetSubmit"] + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	updFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	updFrm += makespace("\t", indent+4) + "<tr>\n";

	updFrm += makefield(2, ml(t__Vcf_Cal), frm_base_real_mthd, "frm_base_real_mthd", "frm_base_real_mthd", real_cal_mthd_jslst, 0, 0, "onchange=\"update(document.edit_base_real, this)\"", ml(t__Select_Valid_Method), "&nbsp;", indent+4, 150);

	updFrm += makefield(2, ml(t__Std_Dens_Cal), frm_std_dens_mthd, "frm_std_dens_mthd", "frm_std_dens_mthd", std_density_jslst, 0, 0, "onchange=\"\"", ml(t__Select_Valid_Std_Density), "&nbsp;", indent+4, 150);

	//updFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 150);

	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";

	updFrm += makefield(3, ml(t__Base_Code), baseCd, "baseCd", "baseCd", "", 10, 9, "", "", "&nbsp;", indent+4, 150);
	updFrm += makefield(3, ml(t__Base_Name), baseName, "baseName", "baseName", "", 10, 9, "", "", "&nbsp;", indent+4, 150);

	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 3rd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";

	// fix for buhzilla 2353, allow to enter temperature under zero
	var minVal = 1.0;
	var decVal = 1.0;
	decVal = 1000.0;
	minVal = -273.15;
	updFrm += makefield(1, ml(t__Real_Temp), frm_base_real_temp, "frm_base_real_temp", "frm_base_real_temp", "", 10, 9, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", ml(t__Enter_Valid_Temp)+"( >="+minVal+" )", "*", indent+4, 150);

	decVal = 1000.0;
	minVal = 0.0;
	updFrm += makefield(1, ml(t__Real_Dens), frm_base_real_dens, "frm_base_real_dens", "frm_base_real_dens", "", 10, 9, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", ml(t__Enter_Valid_Dens)+"( >="+minVal+" )", "*", indent+4, 150);

	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 4th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";

	if ( frm_base_std_dens == "" || frm_base_std_dens == " " || frm_base_std_dens == "-1" || frm_base_std_dens < 0)
	{
		frm_base_std_dens = 1.0;
	}
	if ( frm_base_real_vcf == "" || frm_base_real_vcf == " " || frm_base_real_vcf == "-1" || frm_base_real_vcf < 0)
	{
		frm_base_real_vcf = 1.0;
	}
//	updFrm += makefield(1, ml(t__Real_Std_Dens), frm_base_std_dens, "frm_base_std_dens", "frm_base_std_dens", "", 10, 9, " disabled dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", ml(t__Enter_Valid_Dens)+"( >="+minVal+" )", "*", indent+4, 150);
	updFrm += makefield(1, ml(t__Real_Std_Dens), frm_base_std_dens, "frm_base_std_dens", "frm_base_std_dens", "", 10, 9, "  dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"9999.0\" ndec=\""+decVal+"\" ", ml(t__Enter_Valid_Dens)+"( >="+minVal+" )", "*", indent+4, 150);

	decVal = 100000.0;
	minVal = 0.0;
	updFrm += makefield(1, ml(t__Real_VCF), frm_base_real_vcf, "frm_base_real_vcf", "frm_base_real_vcf", "", 10, 9, " disabled dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", ml(t__Enter_Valid_VCF)+"( >="+minVal+" )", "*", indent+4, 150);


	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 5th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";

	updFrm += makefield(2, ml(t__Temp_Comp_Mthd), frm_base_comp_mthd, "frm_base_comp_mthd", "frm_base_comp_mthd", temp_comp_mthd_jslst, 0, 0, "onchange=\"\" datatype=\"Require\"", ml(t__Select_Valid_Comp_Method), "*", indent+4, 150);

	updFrm += makefield(2, ml(t__Temp_Comp_Priority), frm_base_comp_priority, "frm_base_comp_priority", "frm_base_comp_priority", temp_comp_priority_jslst, 0, 0, "onchange=\"\" datatype=\"Require\"", ml(t__Select_Valid_Comp_Priority), "*", indent+4, 150);



	updFrm += makespace("\t", indent+4) + "</tr>\n";

	updFrm += makespace("\t", indent+4) + "</table>\n";
	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td>\n";
	updFrm += makespace("\t", indent+4) + "<table>\n";

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



function displayInsertBaseRealForm ()
{
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





function btnGroupModifyBaseReal_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	btn_HTML += btnLocation_HTML("justChaneMyLocation('base_real_det.cgi?baseCd='+baseCd); ", ml(t__Back_to_Base_Real_Page));

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}




function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	if (op == opValues["listBaseRealDet"])
	{
		pageHeading += ml(t__BASE_REAL_DET);
	}

	if(op == opValues["modifyBaseRealDetForm"] || op == opValues["modifyBaseRealDetSubmit"])
	{
		pageHeading += ml(t__MODIFY_BASE_REAL);
	}

	return pageHeading; 
}



function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	if (op == opValues["listBaseRealDet"])
	{
		pageTitle += ml(t__BASE_REAL_DET);
	}

	if(op == opValues["modifyBaseRealDetForm"] || op == opValues["modifyBaseRealDetSubmit"])
	{
		pageTitle += ml(t__MODIFY_BASE_REAL);
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

		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

		case 6:     
			op_list += "<option value=\"" + opValues["modifyBaseRealDetForm"] + "\">" + otherText["modifyRealData"] + "</option>";
			op_list += "<option value=\"" + opValues["applyBaseRealDetForm"] + "\">" + otherText["applyRealData"] + "</option>";

		case 5:			/* Find Has not been implemented yet*/
			break;
	}

	op_list += "<option value=0 selected>--\t" + otherText["youraction"] + "\t--</option>";
	op_list += "</select>                                        ";
	
	return op_list ;
}


function update(myformObj, parentOption) 
{
	var new_options;
	var parent_select;

	
	parent_select = parentOption.value;

	myformObj.frm_base_std_dens.disabled = false;

	if (parent_select == 3)
	{
//		myformObj.frm_base_std_dens.disabled = false;
		myformObj.frm_base_real_vcf.disabled = false;
	}
	else
	{
		// fix for bugzilla 2352, initialize the disable field
		if ( myformObj.frm_base_std_dens.value == "" || myformObj.frm_base_std_dens.value == " " )
		{
			myformObj.frm_base_std_dens.value = 1.0;
		}
		if ( myformObj.frm_base_real_vcf.value == "" || myformObj.frm_base_real_vcf.value == " " )
		{
			myformObj.frm_base_real_vcf.value = 1.0;
		}
//		myformObj.frm_base_std_dens.disabled = true;
		myformObj.frm_base_real_vcf.disabled = true;
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

	newPage += "	eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "	return true;\n";
	newPage += "}\n";

	newPage += "</script>\n";
	newPage += "\n";
	newPage += "</head>\n";
	newPage += "\n";
	newPage += "<body>\n";
	newPage += "\n";

	return (newPage);
}

