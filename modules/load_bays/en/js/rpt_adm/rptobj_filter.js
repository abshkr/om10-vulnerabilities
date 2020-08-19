var t__FILTER_SCREEN = ["REPORT FILTERS","报表过滤器"];

var opValues = new Array();

opValues["viewFilter"] = 1;
opValues["viewFilterLayout"] = 5;
opValues["modifyFilter"] = 7;
opValues["modifyFilterSubmit"] = 17;
opValues["modifyFilterActive"] = 107;
opValues["modifyFilterType"] = 207;
opValues["modifyFilterMoveUp"] = 307;
opValues["modifyFilterMoveDown"] = 407;

opValues["modifyFilterZoneUp"] = 507;
opValues["modifyFilterZoneDown"] = 607;
opValues["modifyFilterRowUp"] = 707;
opValues["modifyFilterRowDown"] = 807;
opValues["modifyFilterColumnLeft"] = 907;
opValues["modifyFilterColumnRight"] = 1007;

var t__YOUR_ACTION = ["YOUR ACTION", "请选择" ];
var t__Select = ["Select ", "请选择" ];
var t__Enter = ["Please Enter ", "请输入" ];
var t__Others = ["Others","其他"];

var t__View_Filter_Layout = ["View Filters Screen","查看报表屏幕"];
var t__Modify_Filter = ["Modify Filter","修改过滤器"];
var t__Toggle_Filter = ["Toggle Filter","切换显示状态"];
var t__Toggle_FilterType = ["Toggle Filter Type","切换输入类型"];
var t__MoveUp_Filter = ["Filter Move Forward ","过滤器上移"];
var t__MoveDown_Filter = ["Filter Move Backward","过滤器下移"];

var t__ZoneMoveUp_Filter = ["Filter Zone Move Up ","移到上一组"];
var t__ZoneMoveDown_Filter = ["Filter Zone Move Down","移到下一组"];
var t__RowMoveUp_Filter = ["Filter Row Move Up","上移一行"];
var t__RowMoveDown_Filter = ["Filter Row Move Down","下移一行"];
var t__ColumnMoveLeft_Filter = ["Filter Column Move Left","左移一列"];
var t__ColumnMoveRight_Filter = ["Filter Column Move Right","右移一列"];


var otherText = new Array();
otherText["youraction"] =  ml(t__YOUR_ACTION);
otherText["viewFilterLayout"] =  ml(t__View_Filter_Layout);
otherText["modifyFilter"] =  ml(t__Modify_Filter);
otherText["toggleFilter"] =  ml(t__Toggle_Filter);
otherText["toggleFilterType"] =  ml(t__Toggle_FilterType);
otherText["moveFilterUp"] =  ml(t__MoveUp_Filter);
otherText["moveFilterDown"] =  ml(t__MoveDown_Filter);

otherText["zoneMoveUp"] =  ml(t__ZoneMoveUp_Filter);
otherText["zoneMoveDown"] =  ml(t__ZoneMoveDown_Filter);
otherText["rowMoveUp"] =  ml(t__RowMoveUp_Filter);
otherText["rowMoveDown"] =  ml(t__RowMoveDown_Filter);
otherText["columnMoveLeft"] =  ml(t__ColumnMoveLeft_Filter);
otherText["columnMoveRight"] =  ml(t__ColumnMoveRight_Filter);


var t__Field_JsList = ["Js Drop List", "Js下拉菜单"];
var t__Field_JsText = ["Text Input", "文本输入框"];
var t__Field_JsDate = ["Date/Time", "日期时间工具"];
var t__Field_AjaxList = ["Ajax Combo", "Ajax下拉菜单"];

var filter_types_jslist = new Array();
filter_types_jslist[1] = ml(t__Field_JsList);
filter_types_jslist[2] = ml(t__Field_JsText);
filter_types_jslist[3] = ml(t__Field_JsDate);
filter_types_jslist[4] = ml(t__Field_AjaxList);

var filter_type2_droplist = [ ['', ''], [1, ml(t__Field_JsList)], [4, ml(t__Field_AjaxList)] ];
var filter_type4_droplist = [ ['', ''], [1, ml(t__Field_JsList)], [2, ml(t__Field_JsText)], [3, ml(t__Field_JsDate)], [4, ml(t__Field_AjaxList)] ];


var t__Zone_Common = ["1.Common Data", "1.报表通用数据"];
var t__Zone_Datetime = ["2.Date Time", "2.日期和时间数据"];
var t__Zone_CustProd = ["3.Customer and Product", "3.供应商、客户和产品数据"];
var t__Zone_CarrTnkr = ["4.Carrier and Tanker", "4.承运商和车辆数据"];
var t__Zone_Gantry = ["5.Gantry and Base", "5.发油台设施和储罐油品数据"];
var t__Zone_TripOrder = ["6.Trip and Order", "6.ERP单据和Omega订单与提单数据"];
var t__Zone_Other = ["7.Other", "7.其他数据"];
var t__Zone_Group = ["Group", "数据组"];
var Default_Zones = 7;
var filter_zones_jslist = new Array();
filter_zones_jslist[1] = ml(t__Zone_Common);
filter_zones_jslist[2] = ml(t__Zone_Datetime);
filter_zones_jslist[3] = ml(t__Zone_CustProd);
filter_zones_jslist[4] = ml(t__Zone_CarrTnkr);
filter_zones_jslist[5] = ml(t__Zone_Gantry);
filter_zones_jslist[6] = ml(t__Zone_TripOrder);
filter_zones_jslist[7] = ml(t__Zone_Other);

filter_zone_droplist = [ ['', ''], [1, ml(t__Zone_Common)], [2, ml(t__Zone_Datetime)], [3, ml(t__Zone_CustProd)], [4, ml(t__Zone_CarrTnkr)], [5, ml(t__Zone_Gantry)], [6, ml(t__Zone_TripOrder)], [7, ml(t__Zone_Other)]];

var t__Header1 = ["Id", "过滤器编号" ];
var t__Header2 = ["Name", "过滤器名称" ];
var t__Header3 = ["Type", "过滤器类型" ];
var t__Header4 = ["Definition", "过滤器代码" ];
var t__Header5 = ["Value", "过滤器数值" ];
var t__Header6 = ["Zone", "过滤器分组" ];
var t__Header7 = ["Row", "显示行号" ];
var t__Header8 = ["Column", "显示列号" ];
var t__Header9 = ["Active", "是否显示?" ];

var filter_id_pos = 0;
var filter_name_pos = 1;
var filter_type_pos = 2;
var filter_var_pos = 3;
var filter_value_pos = 4;
var filter_zone_pos = 5;
var filter_row_pos = 6;
var filter_col_pos = 7;
var filter_active_pos = 8;

var myColumns = [ml(t__Header1), ml(t__Header2), ml(t__Header3), ml(t__Header4), ml(t__Header5), ml(t__Header6), ml(t__Header7), ml(t__Header8), ml(t__Header9)];


var t__Active = ["Yes", "显示过滤器" ];
var t__Non_Active = ["No", "不显示过滤器" ];

var filter_active_droplist = [ ['', ''], [0, ml(t__Non_Active)], [1, ml(t__Active)] ];


var t__Edit_Filter_Details = ["Filter Details", "报表过滤器详情"] ;
var t__FrmComplt = ["Complete and submit the following form , all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory", "填好并递交下表,所有带 (<span style=\"COLOR: #FF0000;\">*</span>) 的项目是必填的"];
var t__Back_To_Filter_List_Page = ["Back to Filters List", "返回报表过滤器管理"];


/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
  var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[23]= g_opInf[26];//"Successfully Inserted A New Record !";
    l_opInf[33]= g_opInf[36];//update failed    
    l_opInf[27]= g_opInf[27];//Successfully Inserted A New Record !
    l_opInf[37]= g_opInf[37];     //Insert new record Failed;
    l_opInf[28]= g_opInf[28];     //Successfully Deleted!;
    l_opInf[38]= g_opInf[38];     //deleted Failed
    l_opInf[133]=  g_opInf[136]; //db upate failed
    l_opInf[137]=  g_opInf[137]; //db insert failed
    l_opInf[138]= g_opInf[138];  //db delete failed

var ops_req_print = [-1,0,1,23,27,33,37,24,25,35,28,38];
var ops_req_search = [-1,0,1,23,27,33,37,24,25,35,28,38];
		
/*
 * The structure dealing with
 * "Group Name", "Number of Tanks", "Active Tank", "Base Product" 
	["ADO","4","035","ADO"]
*/			

function renderPage(cRec, cCol, cState, cPageState,priv, lang)
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
	newPage += printHdr( newPage, updatePageTitle( curViewDetailState, pageTitle ), lang );
//	newPage = printHdr( newPage, updatePageTitle( curViewDetailState, pageTitle ), lang );

	//local_HeadrHTML function is local function give 
	// the ability to append any thing to the current page
	newPage += local_HeadrHTML( newPage, lang );
//	newPage = local_HeadrHTML( newPage, lang );

	//getToolBar_HTML function of comm_HTML.js file responsible for  
	// outputting the tool bar
	//controls the search and print buttons as well
	newPage += getToolBar_HTML( newPage, updatePageHeading( curViewDetailState, pageHeading ),check_ifReqPrint( ops_req_print, curViewDetailState ), check_ifReqSearch( ops_req_search,curViewDetailState ) );
//	newPage = getToolBar_HTML( newPage, updatePageHeading( curViewDetailState, pageHeading ), check_ifReqPrint( ops_req_print, curViewDetailState ), check_ifReqSearch( ops_req_search, curViewDetailState ) );

	newPage +="<tr>\n";  
	newPage +="<td width=\"100%\">\n";
	newPage +="<div class=\"content\" id=\"content\">\n";
	newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
	newPage +="<tbody>\n";  
	//start after the global form
	// if OP is <=1 OR Higher than available options should always come to this view

	if (priv >= 5 && curViewDetailState <= opValues["viewFilter"]) 
	{
		newPage += displayFilterList(curPrivilage, curColumnToSort);
	}

	if (priv >= 6 && curViewDetailState == opValues["modifyFilter"])	
	{
		newPage += displayModifyFilterForm();
	}
	/* Submit the Modification of Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyFilterSubmit"])	
	{
		newPage += displayFilterList(curPrivilage, curColumnToSort);
	}

	// table for everything ends here
	newPage +="</tbody>\n";
	newPage +="</table>\n";
	newPage +="</div>\n";
	newPage +="</td>              \n";  
	newPage +="</tr>\n";

	newPage +="</tbody>\n";
	newPage +="</table>\n";
	newPage +="<!-- End of table to add the header lines -->\n";
	newPage +="\n";
	newPage +="</td>              \n";
	newPage +="</tr>\n";
	newPage +="</tbody>\n";
	newPage +="</table>\n";

	newPage +="\n";
	newPage +="</body>\n";
	newPage +="</html>\n";
	newPage +="\n"; 
	return(newPage);

	document.close();
	if (typeof writeBack != 'undefined')writeBack();

}


function displayFilterList( curPrivilage, curColumnToSort )
{
	var indent = 1;
	var dispFrm ="";

	dispFrm += makespace("\t", indent) + "<tr> \n";
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

	for(i in filter_jslist)
	{
		if (i>0)
		{
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone = 0;
			for(var j=0; j<myColumns.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(filter_jslist[i][howmanyDone]) + "<\/td>";
				} 
				else 
				{
					dispFrm += makespace("\t", indent+2) + "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						dispFrm += makespace("\t", indent+3) + "<form name=\"select_action_" + i + "\" id=\"select_action_" + i + "\" >\n";
						dispFrm += makespace("\t", indent+4) + "<table border=\"0\">\n";
						dispFrm += makespace("\t", indent+4) + "<tr>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\"> <span style=\"COLOR: #FF0000;\">" + obs(filter_jslist[i][howmanyDone]) + "</span>\n";

						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"frm_filter_id\" id=\"frm_filter_id\" value=\"" + filter_jslist[i][0] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";

						dispFrm += makespace("\t", indent+5) + preqstr_field ();
						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

						dispFrm += makespace("\t", indent+5) + op_list (curPrivilage, filter_jslist[i][howmanyDone], i);


						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "</tr>\n";
						dispFrm += makespace("\t", indent+4) + "</table>\n";
						dispFrm += makespace("\t", indent+3) + "</form>\n";
					}
					else
					{
						if ( j == filter_active_pos )
						{
							if (filter_jslist[i][j] == 1)
							{
								dispFrm += makespace("\t", indent+3) + "<center><img src=\"/images/check_mark_blue.gif\" alt=\"Yes\" title=\"Yes\"></center>";
							}
							else
							{
								dispFrm += makespace("\t", indent+3) + "<center><img src=\"/images/cross_mark_red.jpg\" alt=\"Yes\" title=\"Yes\"></center>";
							}
						}
						else
						if ( j == filter_type_pos )
						{
							if ( filter_jslist[i][j] == 4 )
							{
								dispFrm += makespace("\t", indent+3) + obs( "<b>" + filter_types_jslist[ filter_jslist[i][j] ] + "</b>");
							}
							else
							{
								dispFrm += makespace("\t", indent+3) + obs( filter_types_jslist[ filter_jslist[i][j] ]);
							}
						}
						else
						if ( j == filter_zone_pos )
						{
							if ( filter_jslist[i][j] <= Default_Zones )
							{
								dispFrm += makespace("\t", indent+3) + obs( filter_zones_jslist[ filter_jslist[i][j] ]);
							}
							else
							{
								dispFrm += makespace("\t", indent+3) + obs( filter_jslist[i][j]+"."+ml(t__Zone_Group)+filter_jslist[i][j] );
							}
						}
						else
						{
							dispFrm += makespace("\t", indent+3) + obs(filter_jslist[i][howmanyDone]);
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




function displayModifyFilterForm()
{
	var indent = 1;
	var rptFrm = "";
	var width = 200;
	var disableOp = 1;

	rptFrm += makespace("\t", indent) + btnGroupModifyFilter_HTML();


	rptFrm += makespace("\t", indent) + "<tr>\n";
	rptFrm += makespace("\t", indent) + "<td>\n";

	rptFrm += makespace("\t", indent+1) + "<form name=\"edit_rptobj_filter\" method=\"get\" id=\"edit_rptobj_filter\" action=\"rptobj_filter.cgi\" onsubmit=\"return Validator.Validate(this,1);\" >\n";

	rptFrm += makespace("\t", indent+1) + " <ul id=\"tabmenu\">\n";
	rptFrm += makespace("\t", indent+1) + "<li>" + ml(t__Edit_Filter_Details) + "</li>\n";
	rptFrm += makespace("\t", indent+1) + "</ul>\n";
	rptFrm += makespace("\t", indent+1) + "<div class=\"adminform\">\n";

	rptFrm += makespace("\t", indent+2) + "<table width=\"100%\">\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td class=\"infotext\">\n";
	rptFrm += makespace("\t", indent+3) + "<br>\n";
	rptFrm += makespace("\t", indent+3) + ml(t__FrmComplt) + "\n";

	// hidden area for passing values between web pages
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyFilterSubmit"] + "\">\n";
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";

	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"frm_filter_key\" id=\"frm_filter_key\" value=\"" + frm_filter_key + "\">\n";
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"frm_filter_menu\" id=\"frm_filter_menu\" value=\"" + frm_filter_menu + "\">\n";
	rptFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"frm_filter_pos\" id=\"frm_filter_pos\" value=\"" + frm_filter_pos + "\">\n";

	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td width=\"100%\">\n";

	rptFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";

	// row 1
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(3, ml(t__Header1), frm_filter_id, "frm_filter_id", "frm_filter_id", "", 10, 9, "", "", "&nbsp;", indent+4, width);

	rptFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";


	// row 2
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(3, ml(t__Header4), frm_filter_var, "frm_filter_var", "frm_filter_var", "", 10, 9, "", "", "&nbsp;", indent+4, width);

	rptFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";


	// row 3
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(3, ml(t__Header5), frm_filter_value, "frm_filter_value", "frm_filter_value", "", 10, 9, "", "", "&nbsp;", indent+4, width);

	rptFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";


	// row 4
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(1, ml(t__Header2), frm_filter_name, "frm_filter_name", "frm_filter_name", "", 30, 20, "dataType=\"Require\"", (ml(t__Enter)+ml(t__Header2)), "*", indent+4, width);

	disableOp = 1;
	if ( ( frm_filter_var == "RPT_FILTER_INDEX_CUSTOMER" )
	  && ( frm_filter_value == RPT_FILTER_INDEX_CUSTOMER ) )
	{
		disableOp = 0;
	}
	else
	if ( ( frm_filter_var == "RPT_FILTER_INDEX_TANKER" )
	  && ( frm_filter_value == RPT_FILTER_INDEX_TANKER ) )
	{
		disableOp = 0;
	}
	else
	{
		disableOp = 1;
	}
	if ( disableOp > 0 )
	{
		rptFrm += makefield(2, ml(t__Header3), frm_filter_type, "frm_filter_type", "frm_filter_type", filter_type4_droplist, 0, 0, " disabled=\"true\" onchange=\"\"", (ml(t__Select)+ml(t__Header3)), "&nbsp;", indent+4, width);
	}
	else
	{
		rptFrm += makefield(2, ml(t__Header3), frm_filter_type, "frm_filter_type", "frm_filter_type", filter_type2_droplist, 0, 0, " onchange=\"\"", (ml(t__Select)+ml(t__Header3)), "&nbsp;", indent+4, width);
	}

	rptFrm += makespace("\t", indent+3) + "</tr>\n";


	// row 5
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(2, ml(t__Header6), frm_filter_zone, "frm_filter_zone", "frm_filter_zone", filter_zone_droplist, 0, 0, " onchange=\"\"", (ml(t__Select)+ml(t__Header6)), "&nbsp;", indent+4, width);

	rptFrm += makefield(2, ml(t__Header9), frm_filter_active, "frm_filter_active", "frm_filter_active", filter_active_droplist, 0, 0, " onchange=\"\"", (ml(t__Select)+ml(t__Header9)), "&nbsp;", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";


	// row 6
	rptFrm += makespace("\t", indent+3) + "<tr>\n";

	rptFrm += makefield(1, ml(t__Header7), frm_filter_row, "frm_filter_row", "frm_filter_row", "", 30, 20, "dataType=\"Require\"", (ml(t__Enter)+ml(t__Header7)), "*", indent+4, width);

	rptFrm += makefield(1, ml(t__Header8), frm_filter_col, "frm_filter_col", "frm_filter_col", "", 30, 20, "dataType=\"Require\"", (ml(t__Enter)+ml(t__Header8)), "*", indent+4, width);

	rptFrm += makespace("\t", indent+3) + "</tr>\n";


	rptFrm += makespace("\t", indent+3) + "</table>\n";
	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td>\n";
	rptFrm += makespace("\t", indent+3) + "&nbsp;\n";
	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "<tr>\n";
	rptFrm += makespace("\t", indent+2) + "<td align=\"center\">\n";
	rptFrm += makespace("\t", indent+3) + "<table>\n";

	rptFrm += frmButtRow_HTML(commBtnText["Update"], 1);

	rptFrm += makespace("\t", indent+3) + "</table>\n";
	rptFrm += makespace("\t", indent+2) + "</td>\n";
	rptFrm += makespace("\t", indent+2) + "</tr>\n";
	rptFrm += makespace("\t", indent+2) + "</table>\n";

	rptFrm += makespace("\t", indent+1) + "</div>\n";

	rptFrm += makespace("\t", indent+1) + "</form>\n";

	rptFrm += makespace("\t", indent) + "</td>\n";
	rptFrm += makespace("\t", indent) + "</tr>\n";

	return rptFrm;
}


function obs(data)
{
	return data;
}



function preqstr_field ()
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"preqstr\" id=\"preqstr\" value=\"\" type=\"hidden\">\n";

	return fieldHTML;
}


function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	pageHeading +=ml(t__FILTER_SCREEN);

	return pageHeading;   
}


function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	pageTitle +=ml(t__FILTER_SCREEN);    

	return pageTitle;
}



/* the following functions are designed to update the child dropdown list dynamically according to the changes occured in various numbers of parents*/

function clearDropdownList(childOption) 
{
	while(childOption.length != 0) 
	{
		childOption.options[childOption.length-1] = null;
	}

	//history.go(0);
}


function updateDropdownList(myformObj, parentOption, childOption, sourceList, compareIndex) 
{
	var new_options;
	var parent_select;
	var child_select;

	clearDropdownList(childOption);
	//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	parent_select = parentOption.value;
//	alert(" parent_select1="+parent_select);
	for (i in sourceList )
	{
		if ( i == 0 )
		{
			continue;
		}
		child_select = sourceList[i][compareIndex];

/*
		if ( ((parent_select == "") || (parent_select == "-1") || (child_select == parent_select))
		)
*/
		if ( ((parent_select == "") || (parent_select == "-1") || (child_select.indexOf(parent_select) != -1 ))
			)
		{
			new_option = new Option(sourceList[i][1], sourceList[i][0], false, false);
			childOption.options[childOption.length] = new_option;
			childOption.selectedIndex = 0;
		}
	}

	new_option = new Option( ml(t__Any_ALL), '-1', false, false );
	childOption.options[childOption.length] = new_option;
//	childOption.selectedIndex = 0;
	childOption.selectedIndex = childOption.length-1;

}


function updateDisabledMode(myformObj, parentOption, childOption ) 
{
	var new_options;
	var parent_select;
	var child_select;

	//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	parent_select = parentOption.value;

	if ( parent_select != "" )
	{
		childOption.value = "";
		childOption.disabled = true;
	}
	else
	{
		childOption.disabled = false;
	}
}


function btnGroupModifyFilter_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	btn_HTML += btnLocation_HTML("justChaneMyLocation('rptobj_filter.cgi'); ", ml(t__Back_To_Filter_List_Page));

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}




/* define function op_list() */
function op_list( priv, accNum, frmNum )
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
			op_list += "<option value=\"" + opValues["modifyFilter"] + "\">" + otherText["modifyFilter"] + "</option>";
			op_list += "<option value=\"" + opValues["modifyFilterActive"] + "\">" + otherText["toggleFilter"] + "</option>";

			if ( ( filter_jslist[frmNum][filter_var_pos] == "RPT_FILTER_INDEX_CUSTOMER" )
			  && ( filter_jslist[frmNum][filter_value_pos] == RPT_FILTER_INDEX_CUSTOMER ) )
			{
				op_list += "<option value=\"" + opValues["modifyFilterType"] + "\">" + otherText["toggleFilterType"] + "</option>";
			}
			if ( ( filter_jslist[frmNum][filter_var_pos] == "RPT_FILTER_INDEX_TANKER" )
			  && ( filter_jslist[frmNum][filter_value_pos] == RPT_FILTER_INDEX_TANKER ) )
			{
				op_list += "<option value=\"" + opValues["modifyFilterType"] + "\">" + otherText["toggleFilterType"] + "</option>";
			}

			op_list += "<option value=\"" + opValues["modifyFilterMoveUp"] + "\">" + otherText["moveFilterUp"] + "</option>";
			op_list += "<option value=\"" + opValues["modifyFilterMoveDown"] + "\">" + otherText["moveFilterDown"] + "</option>";
			op_list += "<option value=\"" + opValues["modifyFilterZoneUp"] + "\">" + otherText["zoneMoveUp"] + "</option>";
			op_list += "<option value=\"" + opValues["modifyFilterZoneDown"] + "\">" + otherText["zoneMoveDown"] + "</option>";
			op_list += "<option value=\"" + opValues["modifyFilterRowUp"] + "\">" + otherText["rowMoveUp"] + "</option>";
			op_list += "<option value=\"" + opValues["modifyFilterRowDown"] + "\">" + otherText["rowMoveDown"] + "</option>";
			op_list += "<option value=\"" + opValues["modifyFilterColumnLeft"] + "\">" + otherText["columnMoveLeft"] + "</option>";
			op_list += "<option value=\"" + opValues["modifyFilterColumnRight"] + "\">" + otherText["columnMoveRight"] + "</option>";

		case 5:			/* Find Has not been implemented yet*/
			op_list += "<option value=\"" + opValues["viewFilterLayout"] + "\">" + otherText["viewFilterLayout"] + "</option>";
			break;
	}

	op_list += "<option value=0 selected>--\t" + otherText["youraction"] + "\t--</option>";
	op_list += "</select>                                        ";
	
	return op_list ;
}



/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage, lang)
{
  var newPage = "";  // use this to avoid the duplicate of info 

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

	newPage += "	if(myselectedvalue==\"" + opValues["viewFilterLayout"] + "\")\n";
	newPage += "	{\n";

	newPage += "		newwindow=window.open('rptobj_gui.cgi','" + otherText["viewFilterLayout"] + "','height=600,width=900, toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised,dependent,titlebar=no'); \n";
	newPage += "		if (window.focus) {newwindow.focus()}\n";

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

