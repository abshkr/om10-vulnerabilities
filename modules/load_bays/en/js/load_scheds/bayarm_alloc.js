/****************************************
 *
 * $Id: bayarm_alloc.js,v 1.12 2009/02/18 23:16:47 abs Exp $
 *
##########**********##########**********##########**********##########**********##########**********##########**********/
var opValues = new Array();

// operations to order listing
opValues["baseBayarmDet"] = 91100;
opValues["listBayarmDet"] = 91101;
opValues["viewBayarmDet"] = 91105;
opValues["modifyBayarmDetForm"] = 91106;
opValues["modifyBayarmDetSubmit"] = 91116;
opValues["insertBayarmDetForm"] = 91107;
opValues["insertBayarmDetSubmit"] = 91117;
opValues["deleteBayarmDetForm"] = 91108;
opValues["deleteBayarmDetSubmit"] = 91118;
opValues["modifyBayarmOptionForm"] = 91109;
opValues["modifyBayarmOptionSubmit"] = 91119;

var bayarm_name_pos =12;
var bayarm_ldtype_pos =13;
var bayarm_lock_pos = 14;
var bayarm_stat_pos = 15;

/* Language component */
var t__Bayarm_Code = ["Code","台位代码"];
var t__Bayarm_Name = ["Name","台位名称"];
var t__Bayarm_Way = ["Way No","台位号"];
var t__Bayarm_Base = ["Base Name","基础油品"];
var t__Bayarm_Flow_Rate = ["Flow Rate(L/min)","台位流速(升/分)"];
var t__Bayarm_Other_Time = ["Time other than loading(s)","非发油平均耗时(秒)"];

var t__Bayarm_Queue_Time = ["Queue Time(s)","排队时间"];
var t__Bayarm_Qty = ["Qty Left","剩余油量"];
var t__Bayarm_Trip = ["Trips Left","剩余提单数"];
var t__Bayarm_Compts = ["Compts Left","剩余仓位"];
var t__Compts_Loaded = ["Total Loaded Compts (24 hours)","提油仓位总数 (24 小时)"];
var t__Bayarm_Curr_Trsa = ["Curr Trsa","当前交易"];
var t__Bayarm_Bay = ["Bay","发油台"];
var t__Bayarm_Load_Type = ["Load Type","发油台类型"];
var t__Bayarm_Lock = ["Lock?","锁定?"];
var t__Bayarm_Stats = ["Status","状态"];

var t__Bay_Top_Loading = ["Top","上装式"];
var t__Bay_Bottom_Loading = ["Bottom","下装式"];


var t__Successfully_Updated = ["Successfully Updated","成功更新"];
var t__Successfully_Inserted_A_New_Record = ["Successfully Inserted A New Record ","成功插入一条新记录"];
var t__Successfully_Deleted = ["Successfully Deleted","成功删除"];
var t__Update_Failed = ["Update Failed","更新失败"];
var t__Insert_New_Record_Failed = ["Insert New Record Failed","插入新纪录失败"];
var t__Delete_Failed = ["Delete Failed","删除失败"];

var t__YOUR_ACTION = ["YOUR ACTION","请选择"];
var t__Modify = ["Modify","修改"];
var t__Back_to_Bayarm_Page = ["Back to Bayarm Page","返回台位管理页"];
var t__All_the_fields_labelled_with_an = ["All the fields labelled with an ","所有带"];
var t__are_mandatory = ["are mandatory","的项目必填"];
var t__Enter_Valid_Name = ["Enter valid name","请输入正确的台位名称"];
var t__Select_Valid_Load_Type = ["Select valid load type","请选择发油台类型"];
var t__Enter_Valid_Way = ["Enter valid way No.","请输入正确的台位号"];
var t__Enter_Valid_Flow_Rate = ["Enter valid flow rate","请输入正确的台位流速"];
var t__Enter_Valid_Other_Time = ["Enter valid time other than loading","请输入正确的非发油平均耗时"];

var t__Reset = ["Reset","重置"];
var t__Do_you_wish_to_delete_this_row = ["Do you wish to delete this row?","您希望删除此行么？"];
var t__Delete = ["Delete","删除"];
var t__Modify = ["Modify","修改"];
var t__Find = ["Find","查找"];
var t__Previous = ["Previous","前"];
var t__Next = ["Next","后"];
var t__MODIFY_BAYARM = ["MODIFY BAY ARM DATA","修改台位"];
var t__DKI_Omega_Menu = ["DKI Omega Menu","达基国际Omega系统菜单"];
var t__BAYARM_DET = ["Bayarm Data Management","台位管理"];
var t__Bayarm_det_Page = ["Bayarm Data Page","台位管理页"];

var t__cannot_modify = ["cannot modify","不能修改"];

var t__Bayarm_Update = ["Refresh Current Status","刷新当前台位状态"];
var t__Bayarm_Refresh = ["Display in real time","实时显示台位状态"];

var myColumns = [ml(t__Bayarm_Code), ml(t__Bayarm_Name), ml(t__Bayarm_Way), ml(t__Bayarm_Base), ml(t__Bayarm_Flow_Rate), ml(t__Bayarm_Other_Time), ml(t__Bayarm_Queue_Time), ml(t__Bayarm_Qty), ml(t__Bayarm_Trip),ml(t__Bayarm_Compts), ml(t__Bayarm_Curr_Trsa),ml(t__Compts_Loaded), ml(t__Bayarm_Bay), ml(t__Bayarm_Load_Type), ml(t__Bayarm_Lock), ml(t__Bayarm_Stats)];

var bayLoadTypes = [ml(t__Bay_Bottom_Loading), ml(t__Bay_Top_Loading)];

var bay_load_types_jslist = [["", ""], ["0", ml(t__Bay_Bottom_Loading)], ["1", ml(t__Bay_Top_Loading)]];




var t__Bayarm_Alloc_Option = ["Bay/Arm Allocation Options","发油台位指定方案"];
var t__Select_Bayarm_Alloc_Option = ["Please select Bay/Arm Allocation Options","请选择发油台位指定方案"];

var t__Bayarm_Alloc_Option_Item1 = ["No bay/arm allocation at all: Allow tankers to load in any bay/arm","不指定发油台位：司机可以去任何发油台位提油"];
var t__Bayarm_Alloc_Option_Item2 = ["Bay/arm allocation for all the trips: Accept the allocation results without validation","为所有车辆指定发油台位：直接接受指定结果，不做校验"];
var t__Bayarm_Alloc_Option_Item3 = ["Bay/arm allocation for all the trips: Validate the allocation results and optimize","为所有车辆指定发油台位：对指定结果进行校验，并进一步自动优化"];
var t__Bayarm_Alloc_Option_Item4 = ["Bay/arm allocation for some trips: Accept the allocation results without validation","为部分车辆指定发油台位，其余可以自由定位：直接接受指定结果，不做校验"];
var t__Bayarm_Alloc_Option_Item5 = ["Bay/arm allocation for some trips: Validate the allocation results and optimize","为部分车辆指定发油台位，其余可以自由定位：对指定结果进行校验，并进一步自动优化"];
var t__Bayarm_Alloc_Option_Item6 = ["Bay/arm allocation for all the trips: Omega-ML allocate the bay/arm automatically","为所有车辆指定发油台位：Omega-ML自动优化"];

var bayarm_alloc_options_jslist = [["", ""], ["1", ml(t__Bayarm_Alloc_Option_Item1)], ["2", ml(t__Bayarm_Alloc_Option_Item2)], ["3", ml(t__Bayarm_Alloc_Option_Item3)], ["4", ml(t__Bayarm_Alloc_Option_Item4)], ["5", ml(t__Bayarm_Alloc_Option_Item5)], ["6", ml(t__Bayarm_Alloc_Option_Item6)]];


/* define op value */
var opAdd = opValues["insertBayarmDetForm"];
var opDel = opValues["deleteBayarmDetForm"];
var opMod = opValues["modifyBayarmDetForm"];

/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
var l_opInf= new Array()
for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
l_opInf[91126]= ml(t__Successfully_Updated)+"!";
l_opInf[91127]= ml(t__Successfully_Inserted_A_New_Record)+"!";
l_opInf[91128]= ml(t__Successfully_Deleted)+"!";
l_opInf[91136]= ml(t__Update_Failed)+"!";
l_opInf[91137]= ml(t__Insert_New_Record_Failed)+"!";
l_opInf[91138]= ml(t__Delete_Failed)+"!";


//here is the text needed to be displayed on the screen
var otherText = new Array();
	otherText["youraction"] =  ml(t__YOUR_ACTION);

	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 91101,91104,91105,91106,91107,91107];
	var ops_req_search = [91101];// search never required on this page


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

	// display the result of DB operation
	newPage +=	displayStatusMsg (opStatus);  

	newPage +=" <script>\n";
	newPage +="var testpopup = new PopupWindow();\n";
	newPage +="testpopup.setSize(800,600);\n";
	newPage +="testpopup.setWindowProperties('toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised,dependent,titlebar=yes');\n";
	newPage +="testpopup.autoHide();\n";		
		
	newPage +=" <\/script>\n";


	/* View records of delivery location locations */
	if (priv >= 5 && curViewDetailState == opValues["listBayarmDet"]) 
	{
		newPage += displayBayarmList (curPrivilage, curColumnToSort);
	}
	if (priv >= 5 && curViewDetailState == opValues["viewBayarmDet"]) 
	{
		newPage += displayBayarmList (curPrivilage, curColumnToSort);
	}
		
	
	/* Display Form for Modify Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyBayarmDetForm"])	
	{
		newPage += displayModifyBayarmForm();
	}
	/* Submit the Modification of Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyBayarmDetSubmit"])	
	{
		newPage += displayBayarmList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Insert Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertBayarmDetForm"])	
	{
		newPage += displayInsertBayarmForm();
	}
	/* Submit the Insertion of Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertBayarmDetSubmit"])	
	{
		newPage += displayBayarmList(curPrivilage, curColumnToSort);
	}

	/* Submit the Deletion of Order Details */
	if (priv >= 8 && curViewDetailState == opValues["deleteBayarmDetSubmit"])	
	{
		newPage += displayBayarmList(curPrivilage, curColumnToSort);
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



function displayBayArmHeader(curPrivilage)
{
	var indent = 1;
	var dispFrm ="";

	dispFrm += btnGroupBayarm_HTML();

	dispFrm += makespace("\t", indent) + "<tr>\n";
	dispFrm += makespace("\t", indent) + "<td>\n";
	dispFrm += makespace("\t", indent+1) + "<form name=\"alloc_options\" method=\"get\" id=\"alloc_options\" action=\"bayarm_alloc.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	dispFrm += " <ul id=\"tabmenu\">\n";
	dispFrm += "<li>" + ml(t__Bayarm_Alloc_Option) + "</li>\n";
	dispFrm += "</ul>\n";

	dispFrm += "<div class=\"adminform\">\n";

	dispFrm += makespace("\t", indent+2) + "<table width=\"100%\">\n";
	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makespace("\t", indent+2) + "<td class=\"infotext\">\n";

	// hidden area for passing values between web pages
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyBayarmOptionSubmit"] + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	dispFrm += makespace("\t", indent+2) + "</td>\n";
	dispFrm += makespace("\t", indent+2) + "</tr>\n";



	dispFrm += makespace("\t", indent+2) + "<tr> \n";

	if ( curPrivilage > 5 )
	{
		dispFrm += makefield(2, ml(t__Bayarm_Alloc_Option), bayarmAllocOption, "bayarmAllocOption", "bayarmAllocOption", bayarm_alloc_options_jslist, 0, 0, "dataType=\"Require\" onchange=javascript:submit();", ml(t__Select_Bayarm_Alloc_Option), "*", indent+4, 150);
	}
	else
	{
		dispFrm += makefield(2, ml(t__Bayarm_Alloc_Option), bayarmAllocOption, "bayarmAllocOption", "bayarmAllocOption", bayarm_alloc_options_jslist, 0, 0, "dataType=\"Require\" disabled ", ml(t__Select_Bayarm_Alloc_Option), "*", indent+4, 150);
	}

	dispFrm += makespace("\t", indent+2) + "</tr> \n";


	dispFrm += makespace("\t", indent+2) + "</table>\n";
	dispFrm += makespace("\t", indent+2) + "</div>\n";

	dispFrm += makespace("\t", indent+1) + "</form>\n";

	dispFrm += makespace("\t", indent) + "</td>\n";	
	dispFrm += makespace("\t", indent) + "</tr> \n";

	return dispFrm;
}



function displayBayarmList(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm ="";

	if ( refresh_mark != 1 )
	{
		dispFrm += displayBayArmHeader(curPrivilage);
	}

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

	for(i in bayarm_jstab)
	{
		if (i>0)
		{
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone = 0;
			for(var j=0; j<myColumns.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(bayarm_jstab[i][howmanyDone]) + "<\/td>";
				} 
				else 
				{
					dispFrm += makespace("\t", indent+2) + "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						dispFrm += makespace("\t", indent+3) + "<form name=\"select_action_" + i + "\" id=\"select_action_" + i + "\" >\n";
						dispFrm += makespace("\t", indent+4) + "<table border=\"0\">\n";
						dispFrm += makespace("\t", indent+4) + "<tr>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\"> <span style=\"COLOR: #FF0000;\">" + obs(bayarm_jstab[i][howmanyDone]) + "</span>\n";
              
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"frm_bayarmCode\" id=\"frm_bayarmCode\" value=\"" + bayarm_jstab[i][0] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

						dispFrm += makespace("\t", indent+5) + preqstr_field ();
						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

						dispFrm += makespace("\t", indent+5) + op_list (curPrivilage, bayarm_jstab[i][howmanyDone], i);


						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "</tr>\n";
						dispFrm += makespace("\t", indent+4) + "</table>\n";
						dispFrm += makespace("\t", indent+3) + "</form>\n";
					}
					else
					{
						if ( j == bayarm_ldtype_pos )
						{
							dispFrm += makespace("\t", indent+3) + obs(bayLoadTypes[bayarm_jstab[i][howmanyDone]]);
						}
						else
						if ( j == bayarm_lock_pos )
						{
							if (bayarm_jstab[i][j] == 'Y')
							{
								dispFrm += makespace("\t", indent+3) + "<center><img src=\"/images/padlock_lock.gif\" alt=\"Lock\" title=\"Lock\"></center>";
							}
							else
							{
								dispFrm += makespace("\t", indent+3) + "<center><img src=\"/images/padlock_unlock.gif\" alt=\"Unlock\" title=\"Unlock\"></center>";
							}
						}
						else
						if ( j == bayarm_stat_pos )
						{
							if (bayarm_jstab[i][j-1] == 'N' && (bayarm_jstab[i][2] != '99'))
							{ // XXX if the way no is 99 that means arm is not available for loading
								dispFrm += makespace("\t", indent+3) + "<center><img src=\"/images/check_mark_blue.gif\" alt=\"Yes\" title=\"Yes\"></center>";
							}
							else
							{
								dispFrm += makespace("\t", indent+3) + "<center><img src=\"/images/cross_mark_red.jpg\" alt=\"No\" title=\"No\"></center>";
							}
						}
						else
						{
							dispFrm += makespace("\t", indent+3) + obs(bayarm_jstab[i][howmanyDone]);
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





function displayModifyBayarmForm ()
{
	var indent = 1;
	var updFrm = "";
	var dateStr;
	var aId;

	if ( frm_bayarmName == "-1")
	{
		frm_bayarmName = "";
	}
	if ( frm_bayarmWay == "-1")
	{
		frm_bayarmWay = "";
	}
	if ( frm_bayarmLoadType == "-1")
	{
		frm_bayarmLoadType = 1;
	}
	if ( frm_bayarmFlowRate == "" || frm_bayarmFlowRate == "-1")
	{
		frm_bayarmFlowRate = 1500;
	}
	if ( frm_bayarmOtherTime == "" || frm_bayarmOtherTime == "-1")
	{
		frm_bayarmOtherTime = 60;
	}


	updFrm += makespace("\t", indent) + btnGroupModifyBayarm_HTML();

	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td>\n";

	updFrm += makespace("\t", indent+1) + "<form name=\"edit_bayarm\" method=\"get\" id=\"edit_bayarm\" action=\"bayarm_alloc.cgi\" onsubmit=\"return Validator.Validate(this,1);\" >\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + ml(t__MODIFY_BAYARM) + "</li>\n";
	updFrm += "</ul>\n";
	updFrm += "<div class=\"adminform\">\n";

	updFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	updFrm += makespace("\t", indent+4) + "<br>\n";
	updFrm += makespace("\t", indent+4) + ml(t__All_the_fields_labelled_with_an)+"(<span style=\"COLOR: #FF0000;\">*</span>)" + ml(t__are_mandatory) +"\n";

	// hidden area for passing values between web pages
//	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_bayarmCode\" id=\"frm_bayarmCode\" value=\"" + frm_bayarmCode + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyBayarmDetSubmit"] + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	updFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	updFrm += makespace("\t", indent+4) + "<tr>\n";

	updFrm += makefield(3, ml(t__Bayarm_Code), frm_bayarmCode, "frm_bayarmCode", "frm_bayarmCode", "", 10, 9, "", "", "&nbsp;", indent+4, 150);

	updFrm += makefield(1, ml(t__Bayarm_Name), frm_bayarmName, "frm_bayarmName", "frm_bayarmName", "", 10, 9, "dataType=\"Require\" ", ml(t__Enter_Valid_Name), "*", indent+4, 150);
//	updFrm += makefield(1, ml(t__Bayarm_Name), frm_bayarmName, "frm_bayarmName", "frm_bayarmName", "", 10, 9, " ", " ", " ", indent+4, 150);

	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";

	updFrm += makefield(2, ml(t__Bayarm_Load_Type), frm_bayarmLoadType, "frm_bayarmLoadType", "frm_bayarmLoadType", bay_load_types_jslist, 0, 0, "dataType=\"Require\" ", ml(t__Select_Valid_Load_Type), "*", indent+4, 150);

	updFrm += makefield(1, ml(t__Bayarm_Way), frm_bayarmWay, "frm_bayarmWay", "frm_bayarmWay", "", 10, 2, "dataType=\"Number\" ", ml(t__Enter_Valid_Way), "*", indent+4, 150);

	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 3rd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";

	updFrm += makefield(1, ml(t__Bayarm_Flow_Rate), frm_bayarmFlowRate, "frm_bayarmFlowRate", "frm_bayarmFlowRate", "", 10, 9, "dataType=\"Number\" ", ml(t__Enter_Valid_Flow_Rate), "*", indent+4, 150);

	updFrm += makefield(1, ml(t__Bayarm_Other_Time), frm_bayarmOtherTime, "frm_bayarmOtherTime", "frm_bayarmOtherTime", "", 10, 9, "dataType=\"Number\" ", ml(t__Enter_Valid_Other_Time), "*", indent+4, 150);

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



function displayInsertBayarmForm ()
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
/*Function get_my_bay_rank get all the arms ranks sum of all arm ranks is equal to bay rankd
 * only want to diplay once for any bay dont want to repeat for each arm
 * input is the bay name and row number we are dealing with
 */
function get_my_bay_rank (baynmae, recNum)
{
	var myBayRank=0;
	var matchFound=0;
	var FristMatchPos=0;
	var noDisplay="";
	for(i in bayarm_jstab)
	{
		
		if ( ( bayarm_jstab[i][bayarm_name_pos] == baynmae) ) 
		{
			//alert("my bay name was "+baynmae+"nwo checking "+ bayarm_jstab[i][bayarm_name_pos])
			matchFound++;
			if (matchFound==1)
			{
				FristMatchPos = i; //here is when first record found
			}
			myBayRank += parseInt( bayarm_jstab[i][7]);
			
		
		}
	}
	//alert("my bay name was "+baynmae+"FristMatchPos was "+ FristMatchPos+ " rec Num "+recNum+" myBayRank "+myBayRank);
	//if not first time  OR no match found then return empty string
	if (FristMatchPos!=recNum || matchFound==0)
	{
		return noDisplay;
	}
	//in any other case return the bay rank
	return myBayRank;
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





function btnGroupBayarm_HTML ()
{
	var btn_HTML = "";


	btn_HTML += "	<tr>\n";
	btn_HTML += "	<td align=\"center\">\n";

	btn_HTML += "	<table>\n";
	btn_HTML += "	<tr>\n";

	btn_HTML += "	<td align=\"center\">\n";

	btn_HTML += "		<button style=\"width: 20.0em; height: 2.2em;\" onClick=\"justChaneMyLocation('bayarm_alloc.cgi');return false;\" NAME=\"anchor1\" ID=\"anchor1\"/>";
	btn_HTML += ml(t__Bayarm_Update)+"\n";
	btn_HTML += "		</button>\n";

/*
	btn_HTML += "                                 <div class=\"button\">\n";
	btn_HTML += btnLocation_HTML("justChaneMyLocation('bayarm_alloc.cgi'); ", ml(t__Bayarm_Update));
	btn_HTML += "                                 </div><br>\n";
*/
	btn_HTML += "	</td>\n";

	btn_HTML += "	<td align=\"center\">\n";

	btn_HTML += "		<button style=\"width: 20.0em; height: 2.2em;\" onClick=\"showinPagePopup(testpopup, 'anchor', 'bayarm_alloc.cgi?refresh_mark=1');return false;\" NAME=\"anchor\" ID=\"anchor\"/>";
	btn_HTML += ml(t__Bayarm_Refresh)+"\n";
	btn_HTML += "		</button>\n";
		
	btn_HTML += "	</td>\n";
	btn_HTML += "	</tr>\n";

	btn_HTML += "	</table>\n";

	btn_HTML += "	</td>\n";
	btn_HTML += "	</tr>\n";

	return btn_HTML;
}



function btnGroupModifyBayarm_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	btn_HTML += btnLocation_HTML("justChaneMyLocation('bayarm_alloc.cgi?frm_bayarmCode='+frm_bayarmCode); ", ml(t__Back_to_Bayarm_Page));

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function showinPagePopup(whichObject, whichPopup, whichFile)
{
	var myPopUpObject;
	myPopUpObject = whichObject;
	myPopUpObject.setUrl(whichFile);
	myPopUpObject.showPopup(whichPopup);
}


function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	if (op == opValues["listBayarmDet"])
	{
		pageHeading += ml(t__BAYARM_DET);
	}

	if(op == opValues["modifyBayarmDetForm"] || op == opValues["modifyBayarmDetSubmit"])
	{
		pageHeading += ml(t__MODIFY_BAYARM);
	}

	return pageHeading; 
}



function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	if (op == opValues["listBayarmDet"])
	{
		pageTitle += ml(t__BAYARM_DET);
	}

	if(op == opValues["modifyBayarmDetForm"] || op == opValues["modifyBayarmDetSubmit"])
	{
		pageTitle += ml(t__MODIFY_BAYARM);
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
			op_list += "<option value=\"" + opValues["modifyBayarmDetForm"] + "\">" + commText["Modify"] + "</option>";

		case 5:			/* Find Has not been implemented yet*/
			break;
	}

	op_list += "<option value=0 selected>--\t" + otherText["youraction"] + "\t--</option>";
	op_list += "</select>                                        ";
	
	return op_list ;
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

