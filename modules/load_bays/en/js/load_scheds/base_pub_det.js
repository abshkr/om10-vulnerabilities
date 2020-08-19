/****************************************
 *
 * $Id: base_pub_det.js,v 1.9 2011/05/25 03:42:26 bz Exp $
 *
##########**********##########**********##########**********##########**********##########**********##########**********/
var opValues = new Array();

// operations to order listing
opValues["baseBasePubDet"] = 90100;
opValues["listBasePubDet"] = 90101;
opValues["viewBasePubDet"] = 90105;
opValues["modifyBasePubDetForm"] = 90106;
opValues["modifyBasePubDetSubmit"] = 90116;
opValues["insertBasePubDetForm"] = 90107;
opValues["insertBasePubDetSubmit"] = 90117;
opValues["deleteBasePubDetForm"] = 90108;
opValues["deleteBasePubDetSubmit"] = 90118;


/* Language component */
var t__Delv_Code = ["Delv Code","分公司/地区编码"];
var t__Delv_Name = ["Delv Name","分公司/地区名称"];
var t__Base_Code = ["Base Code","基础油品代码"];
var t__Base_Name = ["Base Name","基础油品名称"];
var t__Pub_Temp = ["Pub Temp(C)","油品公布温度(C)"];
var t__Pub_Dens = ["Pub Dens(kg/m3)","油品公布密度(kg/m3)"];
var t__Std_Dens = ["Std Dens(kg/m3)","油品公布标准密度(kg/m3)"];
var t__Pub_VCF = ["VCF","体积补偿系数(VCF)"];

var t__Real_Temp = ["Real Temp(C)","油品实际温度(C)"];
var t__Real_Dens = ["Real Dens(kg/m3)","油品实际密度(kg/m3)"];
var t__Real_Std_Dens = ["Real Std Dens(kg/m3)","油品实际标准密度(kg/m3)"];
var t__Real_VCF = ["Real VCF","体积补偿系数(VCF)"];


var t__Vcf_Cal = ["VCF Cal Method","VCF计算方法"];
var t__VCF_CAL_MANUAL = ["Calculate Manually (Sinopec Std)","人工查表计算(中石化标准)"];
var t__VCF_CAL_AUTO = ["Calculate Automatically (Sinopec Std)","自动查表计算(中石化标准)"];
var t__VCF_CAL_FORMULA = ["Calculate Automatically (International Std)","自动公式计算(国际标准)"];

var t__Select_Valid_Method = ["Select VCF Cal Method","请选择体积补偿系数的计算方法"];

var pub_cal_mthd_jslst = [
["",""], 
["1", ml(t__VCF_CAL_AUTO)], 
["2", ml(t__VCF_CAL_FORMULA)], 

["3", ml(t__VCF_CAL_MANUAL)]
];



var t__Successfully_Updated = ["Successfully Updated","成功更新"];
var t__Successfully_Inserted_A_New_Record = ["Successfully Inserted A New Record ","成功插入一条新记录"];
var t__Successfully_Deleted = ["Successfully Deleted","成功删除"];
var t__Update_Failed = ["Update Failed","更新失败"];
var t__Insert_New_Record_Failed = ["Insert New Record Failed","插入新纪录失败"];
var t__Delete_Failed = ["Delete Failed","删除失败"];
var t__VCF_Invalid = ["VCF invalid! Publishing temperature or density may be out of DB range, please use International Formula to calculate!","更新失败! 公布温度和密度超出了客户提供的数据库范围，请使用国际标准公式计算！"];

var t__YOUR_ACTION = ["YOUR ACTION","请选择"];
var t__Modify = ["Modify","修改"];
var t__Back_to_Base_Pub_Page = ["Back to Base Pub Page","返回公布温度补偿参数管理页"];
var t__All_the_fields_labelled_with_an = ["All the fields labelled with an ","所有带"];
var t__are_mandatory = ["are mandatory","的项目必填"];
var t__Enter_Valid_Temp = ["Enter valid temperature","请输入正确的公布温度"];
var t__Enter_Valid_Dens = ["Enter valid density","请输入正确的公布密度"];
var t__Enter_Valid_VCF = ["Enter valid VCF","请输入正确的体积补偿系数(VCF)"];
var t__Reset = ["Reset","重置"];
var t__Do_you_wish_to_delete_this_row = ["Do you wish to delete this row?","您希望删除此行么？"];
var t__Delete = ["Delete","删除"];
var t__Modify = ["Modify","修改"];
var t__Find = ["Find","查找"];
var t__Previous = ["Previous","前"];
var t__Next = ["Next","后"];
var t__MODIFY_BASE_PUB = ["MODIFY BASE PUB DATA","修改公布温度补偿参数"];
var t__DKI_Omega_Menu = ["DKI Omega Menu","达基国际Omega系统菜单"];
var t__BASE_PUB_DET = ["Base Pub Data Management","公布温度补偿参数管理"];
var t__Base_Pub_det_Page = ["Base Pub Data Page","公布温度补偿参数管理页"];

var t__cannot_modify = ["cannot modify","不能修改"];

var t__DISPLAY_BASE_REAL = ["Real Temperature, density and VCF (Temperature&Density from the latest loading data of same product)","实际温度和密度及相应的体积补偿系数(温度和密度取自最新完成的同类产品发油实时数据)"];

var myColumns = [ml(t__Delv_Code), ml(t__Delv_Name), ml(t__Base_Code), ml(t__Base_Name), ml(t__Pub_Temp), ml(t__Pub_Dens), ml(t__Std_Dens), ml(t__Pub_VCF)];

var myColumnsReal = [ml(t__Delv_Code), ml(t__Delv_Name), ml(t__Base_Code), ml(t__Base_Name), ml(t__Real_Temp), ml(t__Real_Dens), ml(t__Real_Std_Dens), ml(t__Real_VCF)];


/* define op value */
var opAdd = opValues["insertBasePubDetForm"];
var opDel = opValues["deleteBasePubDetForm"];
var opMod = opValues["modifyBasePubDetForm"];

/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
var l_opInf= new Array()
for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
l_opInf[90126]= ml(t__Successfully_Updated)+"!";
l_opInf[90127]= ml(t__Successfully_Inserted_A_New_Record)+"!";
l_opInf[90128]= ml(t__Successfully_Deleted)+"!";
l_opInf[90136]= ml(t__Update_Failed)+"!";
l_opInf[90137]= ml(t__Insert_New_Record_Failed)+"!";
l_opInf[90138]= ml(t__Delete_Failed)+"!";
l_opInf[90146]= ml(t__VCF_Invalid)+"!";
l_opInf[90147]= ml(t__Insert_New_Record_Failed)+"!";
l_opInf[90148]= ml(t__Delete_Failed)+"!";


//here is the text needed to be displayed on the screen
var otherText = new Array();
	otherText["youraction"] =  ml(t__YOUR_ACTION);

	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 90101,90104,90105,90106,90107,90107];
	var ops_req_search = [90101];// search never required on this page


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
	if (priv >= 5 && curViewDetailState == opValues["listBasePubDet"]) 
	{
		newPage += displayBasePubList (curPrivilage, curColumnToSort);
	}
	if (priv >= 5 && curViewDetailState == opValues["viewBasePubDet"]) 
	{
//		newPage += displayOrderDetails (curPrivilage, curColumnToSort);
		newPage += displayBasePubList (curPrivilage, curColumnToSort);
	}
		
	
	/* Display Form for Modify Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyBasePubDetForm"])	
	{
		newPage += displayModifyBasePubForm();
	}
	/* Submit the Modification of Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyBasePubDetSubmit"])	
	{
		newPage += displayBasePubList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Insert Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertBasePubDetForm"])	
	{
		newPage += displayInsertBasePubForm();
	}
	/* Submit the Insertion of Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertBasePubDetSubmit"])	
	{
		newPage += displayBasePubList(curPrivilage, curColumnToSort);
	}

	/* Submit the Deletion of Order Details */
	if (priv >= 8 && curViewDetailState == opValues["deleteBasePubDetSubmit"])	
	{
		newPage += displayBasePubList(curPrivilage, curColumnToSort);
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





function displayBasePubList(curPrivilage,curColumnToSort)
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

	for(i in base_pub_jstab)
	{
		if (i>0)
		{
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone = 0;
			for(var j=0; j<myColumns.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(base_pub_jstab[i][howmanyDone]) + "<\/td>";
				} 
				else 
				{
					dispFrm += makespace("\t", indent+2) + "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						dispFrm += makespace("\t", indent+3) + "<form name=\"select_action_" + i + "\" id=\"select_action_" + i + "\" >\n";
						dispFrm += makespace("\t", indent+4) + "<table border=\"0\">\n";
						dispFrm += makespace("\t", indent+4) + "<tr>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\"> <span style=\"COLOR: #FF0000;\">" + obs(base_pub_jstab[i][howmanyDone]) + "</span>\n";
              
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"delvCd\" id=\"delvCd\" value=\"" + base_pub_jstab[i][0] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"baseCd\" id=\"baseCd\" value=\"" + base_pub_jstab[i][2] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

						dispFrm += makespace("\t", indent+5) + preqstr_field ();
						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

						dispFrm += makespace("\t", indent+5) + op_list (curPrivilage, base_pub_jstab[i][howmanyDone], i);


						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "</tr>\n";
						dispFrm += makespace("\t", indent+4) + "</table>\n";
						dispFrm += makespace("\t", indent+3) + "</form>\n";
					}
					else
					{
						dispFrm += makespace("\t", indent+3) + obs(base_pub_jstab[i][howmanyDone]);
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
  
	if ( baseRealSwitch > 0 )
	{
		dispFrm += makespace("\t", indent) + "<tr>\n";
		dispFrm += makespace("\t", indent) + "<td>\n ";
		dispFrm += makespace("\t", indent) + "&nbsp;<br>\n ";
		dispFrm += makespace("\t", indent) + "&nbsp;<br>\n ";
		dispFrm += makespace("\t", indent) + "&nbsp;<br>\n ";
		dispFrm += makespace("\t", indent) + "</td>\n ";
		dispFrm += makespace("\t", indent) + "</tr>\n";
		dispFrm += displayBaseRealList(curPrivilage,curColumnToSort);
	}


	return dispFrm;
}



function displayBaseRealList(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm ="";

	dispFrm += makespace("\t", indent) + "<tr> \n";

	// end of the td and tr for the list area
	dispFrm += makespace("\t", indent) + "<td>\n ";  

	dispFrm += " <ul id=\"tabmenu\">\n";
	dispFrm += "<li>" + ml(t__DISPLAY_BASE_REAL) + "</li>\n";
	dispFrm += "</ul>\n";

	if( ((myColumnsReal.length)> 0))
	{
		dispFrm += makespace("\t", indent+1) + "<div id=\"printReady\">\n";
		dispFrm += makespace("\t", indent+2) + table_begin("M", 0,"");
		dispFrm += makespace("\t", indent+2) + "<tbody> \n";
		dispFrm += makespace("\t", indent+2) + "<tr>\n";
		for(var i=0; i<myColumnsReal.length; i++)
		{
			dispFrm += makespace("\t", indent+2) + "<td>" + myColumnsReal[i] + "</td>\n";
		}
		dispFrm += makespace("\t", indent+2) + "</tr>\n";
	}

	for(i in base_real_jstab)
	{
		if (i>0)
		{
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone = 0;
			for(var j=0; j<myColumnsReal.length; j++)
			{
				dispFrm += makespace("\t", indent+2) + "<td>\n";				  
				dispFrm += makespace("\t", indent+3) + obs(base_real_jstab[i][howmanyDone]);

				dispFrm += makespace("\t", indent+2) + "</td>\n";
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








function displayModifyBasePubForm ()
{
	var indent = 1;
	var updFrm = "";
	var dateStr;
	var aId;

	if ( frm_base_pub_mthd == "" || frm_base_pub_mthd == "-1")
	{
		frm_base_pub_mthd = 1;
	}

	updFrm += makespace("\t", indent) + btnGroupModifyBasePub_HTML();

	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td>\n";

	updFrm += makespace("\t", indent+1) + "<form name=\"edit_base_pub\" method=\"get\" id=\"edit_base_pub\" action=\"base_pub_det.cgi\" onsubmit=\"return Validator.Validate(this,1);\" >\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + ml(t__MODIFY_BASE_PUB) + "</li>\n";
	updFrm += "</ul>\n";
	updFrm += "<div class=\"adminform\">\n";

	updFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	updFrm += makespace("\t", indent+4) + "<br>\n";
	updFrm += makespace("\t", indent+4) + ml(t__All_the_fields_labelled_with_an)+"(<span style=\"COLOR: #FF0000;\">*</span>)" + ml(t__are_mandatory) +"\n";

	// hidden area for passing values between web pages
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"delvCd\" id=\"delvCd\" value=\"" + delvCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"delvName\" id=\"delvName\" value=\"" + delvName + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"baseCd\" id=\"baseCd\" value=\"" + baseCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"baseName\" id=\"baseName\" value=\"" + baseName + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"baseCat\" id=\"baseCat\" value=\"" + baseCat + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyBasePubDetSubmit"] + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	updFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	updFrm += makespace("\t", indent+4) + "<tr>\n";

	updFrm += makefield(2, ml(t__Vcf_Cal), frm_base_pub_mthd, "frm_base_pub_mthd", "frm_base_pub_mthd", pub_cal_mthd_jslst, 0, 0, "onchange=\"update(document.edit_base_pub, this)\"", ml(t__Select_Valid_Method), "&nbsp;", indent+4, 150);

	updFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 150);

	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row extra
	updFrm += makespace("\t", indent+4) + "<tr>\n";

	updFrm += makefield(3, ml(t__Delv_Code), delvCd, "delvCd", "delvCd", "", 10, 9, "", "", "&nbsp;", indent+4, 150);
	updFrm += makefield(3, ml(t__Delv_Name), delvName, "delvName", "delvName", "", 10, 9, "", "", "&nbsp;", indent+4, 150);

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
	updFrm += makefield(1, ml(t__Pub_Temp), frm_base_pub_temp, "frm_base_pub_temp", "frm_base_pub_temp", "", 10, 9, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", ml(t__Enter_Valid_Temp)+"( >="+minVal+" )", "*", indent+4, 150);

	decVal = 1000.0;
	minVal = 0.0;
	updFrm += makefield(1, ml(t__Pub_Dens), frm_base_pub_dens, "frm_base_pub_dens", "frm_base_pub_dens", "", 10, 9, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", ml(t__Enter_Valid_Dens)+"( >="+minVal+" )", "*", indent+4, 150);

	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 4th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
/*
	updFrm += makefield(3, ml(t__Std_Dens), frm_base_std_dens, "frm_base_std_dens", "frm_base_std_dens", "", 30, 30, "", "", "&nbsp;", indent+4, 150);
	updFrm += makefield(3, ml(t__Pub_VCF), frm_base_pub_vcf, "frm_base_pub_vcf", "frm_base_pub_vcf", "", 30, 30, "", "", "&nbsp;", indent+4, 150);
*/

	if ( frm_base_std_dens == "" || frm_base_std_dens == " " || frm_base_std_dens == "-1" || frm_base_std_dens<0)
	{
		frm_base_std_dens = 1.0;
	}
	if ( frm_base_pub_vcf == "" || frm_base_pub_vcf == " " || frm_base_pub_vcf == "-1" || frm_base_pub_vcf<0)
	{
		frm_base_pub_vcf = 1.0;
	}
	updFrm += makefield(1, ml(t__Std_Dens), frm_base_std_dens, "frm_base_std_dens", "frm_base_std_dens", "", 10, 9, " disabled dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", ml(t__Enter_Valid_Dens)+"( >="+minVal+" )", "*", indent+4, 150);

	decVal = 100000.0;
	minVal = 0.0;
	updFrm += makefield(1, ml(t__Pub_VCF), frm_base_pub_vcf, "frm_base_pub_vcf", "frm_base_pub_vcf", "", 10, 9, " disabled dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", ml(t__Enter_Valid_VCF)+"( >="+minVal+" )", "*", indent+4, 150);


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



function displayInsertBasePubForm ()
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





function btnGroupModifyBasePub_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	btn_HTML += btnLocation_HTML("justChaneMyLocation('base_pub_det.cgi?baseCd='+baseCd+'&delvCd='+delvCd); ", ml(t__Back_to_Base_Pub_Page));

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}




function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	if (op == opValues["listBasePubDet"])
	{
		pageHeading += ml(t__BASE_PUB_DET);
	}

	if(op == opValues["modifyBasePubDetForm"] || op == opValues["modifyBasePubDetSubmit"])
	{
		pageHeading += ml(t__MODIFY_BASE_PUB);
	}

	return pageHeading; 
}



function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	if (op == opValues["listBasePubDet"])
	{
		pageTitle += ml(t__BASE_PUB_DET);
	}

	if(op == opValues["modifyBasePubDetForm"] || op == opValues["modifyBasePubDetSubmit"])
	{
		pageTitle += ml(t__MODIFY_BASE_PUB);
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
			op_list += "<option value=\"" + opValues["modifyBasePubDetForm"] + "\">" + commText["Modify"] + "</option>";

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

	if (parent_select == 3)
	{
		myformObj.frm_base_std_dens.disabled = false;
		myformObj.frm_base_pub_vcf.disabled = false;
	}
	else
	{
		// fix for bugzilla 2352, initialize the disable field
		if ( myformObj.frm_base_std_dens.value == "" || myformObj.frm_base_std_dens.value == " " )
		{
			myformObj.frm_base_std_dens.value = 1.0;
		}
		if ( myformObj.frm_base_pub_vcf.value == "" || myformObj.frm_base_pub_vcf.value == " " )
		{
			myformObj.frm_base_pub_vcf.value = 1.0;
		}
		myformObj.frm_base_std_dens.disabled = true;
		myformObj.frm_base_pub_vcf.disabled = true;
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

