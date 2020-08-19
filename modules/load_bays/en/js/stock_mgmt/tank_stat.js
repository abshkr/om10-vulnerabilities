/****************************************
 * $Id: tank_stat.js,v 1.30 2012/11/08 04:41:49 abs Exp $
 *
##########**********##########**********##########**********##########**********##########**********##########**********/

var t__A_P_I        = [" A.P.I."," A.P.I."]
var t__Alarm_State  = [" Alarm State",  "警报状态"];
var t__Auxiliary    = [" Auxiliary",    "电子地址"];
var t__Back_to = [" Back to", "返回"];
var t__Channel = [" Channel", "通讯频道"];
var t__Company = [" Company", "公司"];
var t__Complete_and_submit_the_following_form_to        = [" Complete and submit the following form to",        "完成并提交以下信息以"];
var t__Details = [" Details", "查看"];
var t__Enter_Valid  = [" Enter Valid",  "请输入正确的"];
var t__Exp_Coeff    = [" Exp.Coeff",    "校正系数"];
var t__Gauging = [" Gauging", "测量"];
var t__Gauging_Identifier    = [" Gauging Identifier",  "测量标识"];
var t__Gauging_Method = [" Gauging Method",   "测量方法"];
var t__Group   = [" Group",  "组"];
var t__Identifier_for_Gauge  = [" Identifier for Gauge",        "测量标识号"];
var t__Instance = [" Instance", "设备使用口号码"];
var t__Interface_Type = [" Interface Type",   "界面类型"];
var t__Leak_Detection = [" Leak Detection",   "泄露监测"];
var t__Liquid_Mass  = [" Liquid Mass",  "油品质量"];
var t__Litres  = [" Litres", "升"];
var t__Location = [" Area", "区域"];
var t__Mass = [" Mass", "质量"];
var t__Modify  = [" Modify", "修改"];
var t__Observe = [" Observe", "视"];
var t__Observed = [" Observed", "视"];
var t__Owner   = [" Owner",  "所有者"];
var t__Page = [" Page", ""];
var t__Percent = [" Percent", "百分比"];
var t__Poll_Interval  = [" Poll Interval",    "测量间隔(秒)"];
var t__Product_Code = [" Product Code", "油品代码"];
var t__Product_Level  = [" Product Level",    "油品液位"];
var t__Product_Name = [" Product Name", "油品名称"];
var t__Proporftion  = [" Proportion",  "份额比例"];
var t__Proportion   = [" Proportion",  "份额比例"];
var t__Register_Offset = [" Register Offset", "油罐地址"];
var t__Reset   = [" Reset",  "重置"];
var t__STOCK_MANAGEMENT = [" STOCK MANAGEMENT", "油品库存管理"];
var t__Save = [" Save", "保存"];
var t__Select_A = [" Select A", "请选择"];
var t__Select_the_Terminal_and_Tank     = [" Select the Terminal and Tank",     "选择油库及油罐"];
var t__Standardisation_pt    = [" Standardisation pt",  "标准温度 摄氏/华氏"];
var t__Std_ = [" Std.", "标准"];
var t__Std_Density  = [" Std Density",  "标准密度"];
var t__Std_Volume   = [" Std Volume",   "标准容积"];
var t__Tank = [" Tank", "油罐"];
var t__Tank_Auxiliary = [" Tank Auxiliary",   "油罐电子地址"];
var t__Tank_Channel = [" Tank Channel", "油罐通讯频道"];
var t__Tank_Code    = [" Tank Code",    "油罐编号"];
var t__Tank_Configuration    = [" Tank Configuration",  "油罐配置"];
var t__Tank_Gauging_Attributes  = [" Tank Gauging Attributes",  "油罐测量属性设置"];
var t__Tank_Group   = [" Tank Group",   "油罐分组"];
var t__Tank_Site    = [" Tank Site",    "油罐所在区域"];
var t__Tank_Status  = [" Tank Status",  "油罐状态"];
var t__Temp = [" Temp", "温度"];
var t__Terminal = [" Terminal", "油库"];
var t__Terminal_and_Tank     = [" Terminal and Tank Details",   "选择油库及油罐"];
var t__This_Tank_has_no_data = [" This Tank has no data",       "此油罐无数据"];
var t__To_View_Tank_Status   = [" To View Tank Status", "查看油罐状态"];
var t__Update  = [" Modify", "修改"];
var t__Vol_ = [" Vol.", "容积"];
var t__Volume  = [" Volume", "容积"];
var t__all_fields_labelled_with_an      = [" all fields labelled with an",      "所有标记为"];
var t__and  = [" and", "和"];
var t__Current  = [" Current",  "当前"];
var t__Density = [" Density", "密度"];
var t__Expansion_Coefficient = [" Expansion Coefficient",       "校正系数"];
var t__Method  = [" Method", "方法"];
var t__Modify  = [" Modify", "修改"];
var t__value   = [" value",  "值"];
var t__value_between  = [" value between",    "值介于"];
var t__Product_Ownership     = [" Product Ownership",   "油品所有权"];
var t__Add_New_Owner  = [" Add New Owner",    "新增所有者"];


var myColumns = [
		ml(t__Location),
		ml(t__Standardisation_pt), ml(t__Product_Name),	ml(t__Product_Code), ml(t__Std_Density),
		ml(t__A_P_I), ml(t__Exp_Coeff), ml(t__Product_Level), ml(t__Observed)+ml(t__Temp),
		ml(t__Observed)+ml(t__Volume), ml(t__Std_Volume), ml(t__Liquid_Mass), ml(t__Alarm_State),
		ml(t__Gauging_Method), ml(t__Leak_Detection), ml(t__Tank_Group)
	];

var tankGaugeCols = [
	ml(t__Tank_Site), ml(t__Tank_Code), ml(t__Identifier_for_Gauge), ml(t__Interface_Type),
	ml(t__Auxiliary), ml(t__Channel), ml(t__Instance), ml(t__Poll_Interval), ml(t__Register_Offset)
];

var ownership = [
		ml(t__Owner),	ml(t__Proportion),ml(t__Percent),	ml(t__Std_)+ml(t__Vol_)+"(L)",ml(t__Mass)+" (Kg)"];
	
var otherText = new Array();
	otherText["EnterGaugeID"] =  ml(t__Enter_Valid)+ml(t__Gauging_Identifier);
	otherText["EnterIT"] = ml(t__Enter_Valid)+ml(t__Interface_Type);
	otherText["EnterExpCoeff"] = ml(t__Enter_Valid)+ml(t__Expansion_Coefficient)+ml(t__value)+"!";
	if(typeof tank_stat_tab!='undefined') 
		otherText["EnterDensity"] = 
			ml(t__Enter_Valid)+ml(t__Density)
			+ml(t__value_between)+tank_stat_tab[1][19]+" and " +tank_stat_tab[1][20] +"!";
	otherText["EnterAPI"] = ml(t__Enter_Valid)+ml(t__A_P_I)+ml(t__value)+"!";
	otherText["kg/m3"] = "kg/m3";
	otherText["kg"] = "kg";
	otherText["mm"] = "mm";
	otherText["Litres"] = ml(t__Litres);
		/********************
		 * 2 rrays
		 * decide if need to display the
		 * print and search buttons or not
		 */                    		
		var ops_req_print = [-1, 1,2,9,30,40];
		var ops_req_search = [];// search never required on this page

/*============================================================================*/
function
renderPage(cRec, cCol, cState, cPageState,priv, lang)
{ 
	var curRecord = cRec;
	var curColumnToSort = cCol;
	var curViewDetailState = cState;
	var curPageIn = cPageState;
	var curPrivilage = priv;
	var i;
	var e;
	var f;

	//alert("op is " + op + " priv is " + priv );
	var newPage = "";
	var pageTitle="";
	var pageHeading="";
	//newPage += "<html>\n";
	//printHdr function of comm_HTML.js file responsible for 
	//generating all the HTML for the current page
	newPage += printHdr(newPage,updatePageTitle(curViewDetailState,pageTitle), lang);
	//newPage = printHdr( newPage,curViewDetailState,pageTitle );
	//local_HeadrHTML function is local function give 
	// the ability to append any thing to the current page
	newPage += local_HeadrHTML(newPage);
	//getToolBar_HTML function of comm_HTML.js file responsible for  
	// outputting the tool bar
	//controls the search and print buttons as well
	newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
	newPage += "\n";
	newPage +="<tr>\n";  
	newPage +="<td width=\"100%\">             \n";
	newPage +="<div class=\"content\" id=\"content\">\n";
	newPage += "<div id=\"printReady\">";
	newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
	newPage +="<tbody>\n";  
	newPage +="</tr>\n";

	if( tankTerm=='-1'||tk=='-1')
	{
		newPage +=displayGlblFrm();

	}
	else if( curPrivilage >= 6 && curViewDetailState <= 1
			|| curViewDetailState > 10 &&curViewDetailState < 15)
	{
		// view records
		newPage +=displayGlblFrm();
		for(i in tank_stat_tab)
		{
			if(i == 0)
			{
				continue;
			}
			for(var j=2;j<18;j++)
			{
				if(j==2)
				{
					newPage += "	<tr>";
 				    newPage += "		<td align=\"center\">";
					newPage += "<div class=\'button\'>";
					newPage += "<form name=tank_status id=\"tank_status\" >";
	                
                    if ( origin != "tankconf" ) 
					newPage += "<a href=\'tank_stat.cgi?tankTerm="+tankTerm+"&tk="+tk+"&op=9&pg=5\'>"+ml(t__Gauging)+"</a>&nbsp;";
					if (priv >=6)
					{
						newPage += "<a href=\'#\' onClick=\'tank_status.submit()\'>"+ml(t__Modify)+"</a>&nbsp;"
					}
					newPage += "<input type=\"hidden\" name=\"op\" value=\"2\">\n";
					newPage += "<input type=\"hidden\" name=\"pg\" value=\"6\">\n";
					newPage += "<input type=\"hidden\" name=\"tankTerm\" value="+tankTerm+">\n";
					newPage += "<input type=\"hidden\" name=\"tk\" value="+tk+">\n";
					newPage += "<input type=\"hidden\" name=\"origin\" value="+origin+">\n";
					newPage += "</form>";

					newPage += "</div> <br>";
					newPage += "		</td>";
					newPage += "	</tr>";

					newPage += modTankDetailsForm(curViewDetailState);

				}
			}
		}
		if(tank_stat_tab.length<2&&tk!='-1')
		{
			newPage += "					<tr>";
			newPage += "						<td class=\"infotextheadingtd\">";
			newPage += "							"+ml(t__This_Tank_has_no_data)+"!";
			newPage += "						</td>";
			newPage += "					</tr>";

		}

		newPage += "</td>";	
		newPage += "</tr>";
		newPage += "</tbody>";
		newPage += "</table>";
		newPage += "</td>";	
		newPage += "</tr>";

	}
	else if (curPrivilage <= 6 && curViewDetailState <= 1
			|| curViewDetailState > 10 && curViewDetailState < 15)
	{
		// view records
		newPage +=displayGlblFrm();

		for(i in tank_stat_tab)
		{
			if(i>0)
			{
				for(var j=2;j<18;j++)
				{
					if(j==2)
					{
						newPage += "	<tr>";
						newPage += "		<td align=\"center\">";
						newPage += "<div class=\"button\">";
						newPage += "<form name=tank_status id=\"tank_status\" >";

                        if ( origin != "tankconf" ) 
						newPage += "<a href=\'tank_stat.cgi?tankTerm="+tankTerm+"&tk="+tk+"&op=9&pg=5\'>"+ml(t__Gauging)+"</a>&nbsp;";
						if (priv >= 6)
						{
							newPage += "<a href=\"#\" onClick=\"tank_status.submit()\">"+ml(t__Modify)+"</a>&nbsp;";
						}
						newPage += "<a href='javascript:void(printSpecial()) '>Print</a></div> <br>";
						newPage += "<input type=\"hidden\" name=\"op\" value=\"2\">\n";
						newPage += "<input type=\"hidden\" name=\"pg\" value=\"6\">\n";
						newPage += "<input type=\"hidden\" name=\"tankTerm\" value="+tankTerm+">\n";
						newPage += "<input type=\"hidden\" name=\"tk\" value="+tk+">\n";
					    newPage += "<input type=\"hidden\" name=\"origin\" value="+origin+">\n";
						newPage += "</form>";
						newPage += "		</td>";
						newPage += "	</tr>";

						newPage += modTankDetailsForm(curViewDetailState);

					}

				}
			}
		}
		if( tank_stat_tab.length < 2 && tk!='-1')
		{
			newPage += "					";
			newPage += "<tr>";
			newPage += "					";
			newPage += "	<td class=\"infotextheadingtd\">";
			newPage += "					";
			newPage += "	"+ml(t__This_Tank_has_no_data)+"!";
			newPage += "					";
			newPage += "	</td>";
			newPage += "					";
			newPage += "</tr>";
		}
		newPage += "</td>";	
		newPage += "</tr>";
		newPage += "</tbody>";
		newPage += "</table>";
		newPage += "</td>";	
		newPage += "</tr>";

	}
	else if( curPrivilage >= 6 && curViewDetailState == 15 )
	{
		newPage += "<input type=\"hidden\" name=\"op\" value=\"25\">\n";
		newPage+= modTankDetailsForm(curViewDetailState);
		newPage += "</form>\n";

		newPage +="							   </td>\n";
		newPage +="							 </tr>\n";
	}
	else if( curPrivilage >= 6 && curViewDetailState == 2 )
	{
		newPage += "<input type=\"hidden\" name=\"op\" value=\"15\">\n";
		newPage+= modTankDetailsForm(curViewDetailState);
		newPage += "</form>\n";
		newPage +="							   </td>\n";
		newPage +="							 </tr>\n";

	}
	else if(curPrivilage>=4
			&& (curViewDetailState==5||curViewDetailState > 15)  
			&& curViewDetailState != 30 && curViewDetailState != 40)
	{
		var sum_1 = 0;
		var sum_2 = 0;
		var sum_3 = 0;
		var sum_4 = 0;

		newPage +=displayGlblFrm();

		newPage += "	<tr>";
		newPage += "		<td align=\"center\">";
		newPage += "			<div class=\'button\'><a href=\'tank_stat.cgi?op=1&pg=6&tankTerm="+tankTerm+"&tk="+tk+"'>Back</a>&nbsp;";
		newPage += "											<a href='javascript:void(printSpecial()) '>Print</a></div> <br>";
		newPage += "		</td>";
		newPage += "	</tr>";

		if( ((ownership.length)> 0))
		{

			newPage +="	<tr>\n";
			newPage += "<td>\n ";
			newPage +="<div id=\"printReady\">";
			newPage += table_begin("M", 0,"");
			newPage += "<tbody> \n";
			newPage += "<tr>";

			for(var i=0; i<ownership.length; i++)
			{
				newPage += "<td>"+ownership[i]+"<\/td>";
			}
			newPage += "<\/tr>";
		}
		for(i in prod_own)
		{
			if(i>0)
			{
				newPage += "<tr class=\"row1\">\n";
				for(var j=0; j<6; j++)
				{

					if(j==0)
					{
						newPage +="<td width='25%'>";
						newPage +="<table width='100%'>";
						newPage +="<tr>";
						newPage += "<form name='own"+i+"' id='own"+i+"'>"
							newPage += "<td width='50%'>" + obs(prod_own[i][j])+"&nbsp;";
						newPage += "<input type=\'hidden\' name=\'compCd\' value='"+prod_own[i][j]+"'>\n";
					}else if(j==1)
					{
						newPage +=  obs(prod_own[i][j])+"</td>";
						newPage += "<input type=\'hidden\' name=\'compNm\' value='"+prod_own[i][j]+"'>\n";
						newPage += "<td width='50%'>";
						newPage += " <select id=\'op\' name=\'op\' onchange = submitmyform_own("+i+"); > \n";
						newPage += "<option value='' selected>-YOUR ACTION-</option>";
						newPage += "<option value='7' >ADD</option>";
						newPage += "<option value='6' >MODIFY</option>";
						newPage += "<option value='8' >DELETE</option>";
						newPage += "</select>";
						//			      		newPage += "<input type=\"hidden\" name=\"op\" >\n";
						newPage += "<input type=\"hidden\" name=\"pg\" >\n";
						newPage += "<input type=\"hidden\" name=\"tankTerm\" value="+tankTerm+">\n";
						newPage += "<input type=\"hidden\" name=\"tk\" value="+tk+">\n";
						newPage += "</form>";
						newPage += "</td>";
						newPage +="</tr>";
						newPage +="</table>";
						newPage += "</td>";

					}else if(j==2)
					{

						newPage += "<td>" + obs(prod_own[i][j]) + "<\/td>";
						sum_1 = parseFloat(sum_1) + parseFloat(obs(prod_own[i][j]));

					}else if(j==3)
					{

						newPage += "<td>" + obs(prod_own[i][j]) + "<\/td>";
						//			      	sum_2 = sum_2 + obs(prod_own[i][j]);

					}else if(j==4)
					{

						newPage += "<td>" + obs(prod_own[i][j]) + "<\/td>";
						sum_3 = parseFloat(sum_3) + parseFloat(obs(prod_own[i][j]));

					}else if(j==5)
					{

						newPage += "<td>" + obs(prod_own[i][j]) + "<\/td>";
						sum_4 = parseFloat(sum_4) + parseFloat(obs(prod_own[i][j]));

					}
				}


			}
		}


		newPage += "</tr>";
		newPage += "<tr class=\"row1\">";
		newPage += "<td>";
		newPage += "<table>";
		newPage += "<tr>";
		newPage += "<td>Totals</td><td>&nbsp;</td>";
		newPage += "</tr>";
		newPage += "</table>";
		newPage += "</td>";
		newPage += "<td>"+sum_1+"</td>";
		newPage += "<td>"+sum_2+"</td>";
		newPage += "<td>"+sum_3+"</td>";
		newPage += "<td>"+sum_4+"</td>";

		newPage += "</tr>";
		newPage +="  </tbody>\n";
		newPage +=" </table>\n";


	}else if( curPrivilage >= 6 && curViewDetailState == 6)
	{

		newPage +=displayGlblFrm();

		newPage += "	<tr>";
		newPage += "		<td align=\"center\">";

		newPage += "<br>";
		newPage += "		</td>";
		newPage += "	</tr>";

		newPage+="	<tr>\n";
		newPage+="		<td align=\"left\">\n";
		newPage+="			<div id=\"helparea\">\n";
		newPage+="				<table>\n";
		newPage += "<form name='own_mod' id='own_mod'>";
		for(i in prod_own)
		{

			if( i == 0 )
			{
				continue;
			}
			for(var j=0; j<6; j++)
			{
				if(j==0)
				{
					newPage +="	<tr>\n";
					newPage +="<td class=\"infotextheading\">Owner:</td>";
					newPage +="<td class=\"infotext\">";
					newPage += "<input type=\'hidden\' name=\'op\' value='26'>\n";
					newPage += "<input type=\'hidden\' name=\'pg\' value='6'>\n";
					newPage += "<input type=\"hidden\" name=\"tankTerm\" value="+tankTerm+">\n";
					newPage += "<input type=\"hidden\" name=\"tk\" value="+tk+">\n";
					newPage += "<input type=\"hidden\" name=\"compCd\" value="+obs(prod_own[i][j])+">\n";

				}else if(j==1)
				{

					newPage +=obs(prod_own[i][j])+"</td>";
					newPage +="	</tr>\n";

				}else if(j==2)
				{
					newPage +="	<tr>\n";
					newPage +="<td class=\"infotextheading\">"+ml(t__Proportion)+" :</td>";
					newPage +="<td  class=\"infotext\">";
					newPage +="<input class='infotext1' type='text' size='15' maxlength='15'";
					newPage += " name='corVol' value='"+ obs(prod_own[i][j]) + "' ";
					newPage += "dataType=\"PositiveDouble\" msg=\""+ml(t__Enter_Valid)+ml(t__Proporftion)+"!\">&nbsp;";
					newPage += "\n";
					newPage +="</td>";

				}else if(j==3)
				{
					newPage +="<td class=\"infotextheading\">"+ml(t__Percent)+" :</td>";
					newPage +="<td  class=\"infotext\">";
					newPage +=obs(prod_own[i][j]);
					newPage +="</td>";
					newPage +="	</tr>\n";

				}else if(j==4)
				{
					newPage +="	<tr>\n";
					newPage +="<td class=\"infotextheading\">"+ml(t__Std_)+ml(t__Vol_)+"(L):</td>";
					newPage +="<td  class=\"infotext\">";
					newPage +="<input class='infotext1' type='text' size='15' maxlength='15' name='stdVol' value='"+obs(prod_own[i][j])+"' dataType=\"PositiveDouble\" msg=\""+ml(t__Enter_Valid)+ml(t__Std_)+ml(t__Vol_)+"!\">&nbsp;\n";
					newPage +="</td>"


				}else if(j==5)
				{
					newPage +="<td class=\"infotextheading\">"+ml(t__Mass)+"(Kg):</td>";
					newPage +="<td  class=\"infotext\">";
					newPage +=obs(prod_own[i][j]);
					newPage +="</td>";
					newPage +="	</tr>\n";				      		

				}

			}
		}
		newPage +="	</table>\n";	
		newPage +="	</form>\n";
		newPage +="	</div>\n";

		newPage+="						<tr>\n";
		newPage+="					<td align=\"middle\">\n";
		newPage+="					<br>\n";
		newPage+="					<div class=\'button\'><a href=\'#\' class=\'button\'  onClick=\'submitmyform26()\'>Save</a>&nbsp;&nbsp;&nbsp;<a href=\'tank_stat.cgi?op=5&pg=6&tankTerm="+tankTerm+"&tk="+tk+"'>Back</a></div>\n";
		newPage+="					<br>\n";
		newPage+="					</td>\n";
		newPage+="					</tr>\n";

	}else if( curPrivilage >= 7 && curViewDetailState == 7)
	{
		newPage +=displayGlblFrm();

		newPage += "	<tr>";
		newPage += "		<td align=\"center\">";
		newPage += "		</td>";
		newPage += "	</tr>";

		newPage+="	<tr>\n";
		newPage+="		<td align=\"left\">\n";
		newPage+="			<br>\n";
		newPage+="			<div id=\"helparea\">\n";
		newPage+="				<table>\n";
		newPage+="					<form name='own_add' id='own_add'>\n";	
		newPage+="					<tr>\n";
		newPage+="						<td class=\"infotextheadingtd\">\n";
		newPage+="							Tank Group:\n";
		newPage += "<input type=\"hidden\" name=\"op\" value='27'>\n";
		newPage += "<input type=\"hidden\" name=\"pg\" value='7'>\n";
		newPage += "<input type=\"hidden\" name=\"tankTerm\" value="+tankTerm+">\n";
		newPage += "<input type=\"hidden\" name=\"tk\" value="+tk+">\n";
		newPage+="						</td>\n";
		newPage+="						<td>\n";
		newPage+="							<select name=\"compCd\" class=\"smallselect\" id= \"compCd\" dataType=\"Require\" msg=\""+ml(t__Select_A)+ml(t__Company)+"!\">\n";
		newPage+=displayDropList_own(null, cmpy_jslst,ml(t__Select_A)+ml(t__Company));

		newPage+="\n";
		newPage+="							\n";
		newPage+="						</td>\n";
		newPage+="					</tr>\n";
		newPage+="\n";
		newPage+="					</form>\n";
		newPage+="				</table>\n";
		newPage+="			</div>\n";
		newPage+="		</td>\n";
		newPage+="	</tr>\n";

		newPage+="						<tr>\n";
		newPage+="						<td></td>\n";
		newPage+="						</tr>\n";
		newPage+="						<tr>\n";
		newPage+="					<td align=\"middle\">\n";
		newPage+="					<div class=\'button\'><a href=\'#\' class=\'button\'  onClick=\'submitmyform27()\'>Save</a>&nbsp;&nbsp;&nbsp;<a href=\'tank_stat.cgi?op=5&pg=6&tankTerm="+tankTerm+"&tk="+tk+"'>Back</a></div>\n";
		newPage+="					<br>\n";
		newPage+="					</td>\n";
		newPage+="					</tr>\n";

	}
	else if( curViewDetailState == 9 || curViewDetailState == 30 || curViewDetailState == 40 )
	{

		newPage += displayGlblFrm();
		newPage += tankGaugeModifyForm(curViewDetailState); 
    //newPage += frmButtRow_tkStatusMod_HTML( ml(t__Update), 0);   
    newPage +="								<tr>\n";
    newPage +="									<td align=\"center\" class=\"infotext\" width=\"100%\">\n";
    if (curPrivilage >= 6)
	{
		newPage +="													<input type=\"button\" value=\""+commBtnText["Modify"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" onClick=\"justChaneMyLocation('tank_stat.cgi?op=10&tankTerm="+tankTerm+"&tk="+tk+"');\">\n";
	}
  
    newPage +="									           &nbsp;\n";
    newPage +="													<input type=\"reset\" value=\""+commText["Back"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" onClick=\"justChaneMyLocation('tank_stat.cgi?op=1&tankTerm="+tankTerm+"&tk="+tk+"');\">\n";
  
  
    newPage +="									</td>\n";
    newPage +="								</tr>\n";
    //the following part of the coding was
    // not displaying buttons correctly
    /*
		newPage+="<tr>\n";
		newPage+="<td align=\"middle\">\n";
		newPage+="<div class=\'button\'>";
		newPage+="<a href=\'tank_stat.cgi?op=10";
		newPage+="&tankTerm="+tankTerm+"&tk="+tk+"'>"+ml(t__Modify)+"</a>\n";
		newPage+="&nbsp;&nbsp;&nbsp;";
		newPage+="<a href=\'tank_stat.cgi?op=1&pg=6&tankTerm=";
		newPage+= tankTerm + "&tk=" + tk + "'>Back</a>\n";
		newPage+="</div>\n";
		newPage+="<br>\n";
		newPage+="</td>\n";
		newPage+="</tr>\n";
	 */
	}
	else if( curPrivilage >= 6 && curViewDetailState == 10 )
	{
		newPage += displayGlblFrm();

		newPage += "<tr> \n";
		newPage += "<td align=\"center\">\n ";
		newPage += "<div class=\"button\">\n";
		newPage += btnLocation_HTML("justChaneMyLocation('tank_stat.cgi?op=9&pg=6&tankTerm="+tankTerm+"&tk="+tk+"'); ", ml(t__Back_to)+ml(t__Tank_Gauging_Attributes)+ml(t__Page));
		newPage += "</div><br>\n";
		newPage += "<td>\n ";
		newPage += "</tr> \n";

		// Modify tank gauging properties form - first view    
		newPage += tankGaugeModifyForm(curViewDetailState);    
		newPage +="</table>\n";
		
		newPage +="								<tr>\n";
    newPage +="									<td align=\"center\" class=\"infotext\" width=\"100%\">\n";
    newPage +="													<input type=\"submit\" value=\""+commBtnText["Update"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" >\n";
    
    newPage +="									           &nbsp;\n";
    newPage +="													<input type=\"reset\" value=\""+commBtnText["Reset"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
    
    
    newPage +="									</td>\n";
    newPage +="								</tr>\n";

		newPage +="</td>\n";
		newPage +="</tr>\n";
		//frmButtRow_HTML("Add", 1);
		newPage +="</table>\n";

		newPage += "</form>\n";                      
		newPage += fieldstFoot_HTML();

	}
	else
	{
		newPage += " ";
	}

	// table for everything ends here
	newPage +="</tr>\n";
	newPage +="<\/tbody>\n";
	newPage +="<\/table>\n";
	newPage +="<\/div>\n";
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
	if (typeof fcfld != 'undefined' && (fcfld!="") && (fcfld!="NULL"))eval("document.tank_status_mod."+fcfld+".focus();");
}
/*============================================================================*/


function
tankGaugeModifyForm(inop)
{
	var tkgFrmPg = "";
	var boolMod = false;
	var infCmpl = "";
	var txtMdtry = "";
	var txtMdtryB = "";

	if ( inop == 10 ) {
		boolMod    = true;
		txtMdtry  += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "<span class=\"mandatory\">*</span>\n");
		txtMdtryB += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "<span class=\"mandatory\">&nbsp;</span>\n");
    infCmpl   += infotextRow_HTML(" width=\"100%\" ", ml(t__Complete_and_submit_the_following_form_to)+ml(t__Modify)+ml(t__Current)+ml(t__Tank_Gauging_Attributes)+", "+ml(t__all_fields_labelled_with_an)+"  (<span style=\"COLOR: #FF0000;\">*</span>) 必须填写" ); 
	} else {
		boolMod    = false;
		txtMdtry  += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", ":");
		txtMdtryB += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", ":");
    infCmpl   += "";
	}


	tkgFrmPg += "<tr> \n";
	tkgFrmPg += "<td>\n ";
	tkgFrmPg += "<div id=\"helparea\">\n";
	tkgFrmPg += "<table>\n ";
	tkgFrmPg += "<tr>\n";
	tkgFrmPg += "<td width=\"100\" class=\"infotextheading\">\n";
	tkgFrmPg += ml(t__Tank_Site)+" :\n";
	tkgFrmPg += "</td>\n";
	tkgFrmPg += "<td align=\"left\" class=\"infotext\">\n";
//	tkgFrmPg += tankTerm;

	var ti, tankTermName;
	tankTermName = tankTerm;
	for(ti in terminal)
	{
		if (terminal[ti][0] == tankTerm)
		{
			tankTermName = terminal[ti][1];
		}
	}
	tkgFrmPg += tankTermName;
	tkgFrmPg += "</td>\n";

	tkgFrmPg += "</tr>\n"; 
	tkgFrmPg += "<tr>\n";
	tkgFrmPg += "<td width=\"100\" class=\"infotextheading\">\n";
	tkgFrmPg += ml(t__Tank_Code)+" :\n";
	tkgFrmPg += "</td>\n";
	tkgFrmPg += "<td align=\"left\" class=\"infotext\">\n";
	tkgFrmPg += tk;
	tkgFrmPg += "</td>\n";

	tkgFrmPg += "</tr>\n"; 
	tkgFrmPg += "</table> \n";
	tkgFrmPg += "</div> \n";
	tkgFrmPg += "</td> \n";
	tkgFrmPg += "</tr>\n ";

	tkgFrmPg += "<tr> \n";
	tkgFrmPg += "<td>\n ";

	tkgFrmPg += "<div class=\"adminform\">\n";
	tkgFrmPg += "<table width=\"100%\">\n";
	tkgFrmPg += infCmpl;
	tkgFrmPg += "<form name=\"tank_gauge_mod\" id=\"tank_gauge_mod\" method=\"GET\" action=\"tank_stat.cgi\" onSubmit=\"return Validator.Validate(document.tank_gauge_mod);\">\n";
	tkgFrmPg += "<input type=\"hidden\" name=\"tankTerm\" id=\"tankTerm\" value=\""+tankTerm+"\">\n";
	tkgFrmPg += "<input type=\"hidden\" name=\"tk\" id=\"tk\" value=\""+tk+"\">\n";               
	tkgFrmPg += op_field(20);

	tkgFrmPg += "<tr>\n";
	tkgFrmPg += "<td class=\"infotext\" width=\"100%\">\n";
	tkgFrmPg += "<table width=\"100%\">\n";
	tkgFrmPg += "<tr>								\n";
	tkgFrmPg += "<td width=\"50%\">\n";
	tkgFrmPg += "<table>\n";
	tkgFrmPg += "<tr>\n";
	tkgFrmPg += textTd_HTML(" class=\"infotextheading\" width=\"140\" ",tankGaugeCols[2]);
	tkgFrmPg += txtMdtry;
	tkgFrmPg += "<td>\n";

	if ( boolMod ) {
		tkgFrmPg += "<input type=\"text\" maxlength=\"18\" name=\"tkgId\" id=\"tkgId\" value=\"";
		tkgFrmPg += tkgId + "\"";
		tkgFrmPg += " dataType=\"Require\" msg=\"" +  otherText["EnterGaugeID"] + "\" \/>\n";
	} else {
		tkgFrmPg += tkgId;
	}

	tkgFrmPg += "</td>\n";
	tkgFrmPg += "</tr>\n";
	tkgFrmPg += "</table>\n";

	tkgFrmPg += "</td>\n";
	tkgFrmPg += "<td width=\"50%\">\n";

	tkgFrmPg += "<table>\n";
	tkgFrmPg += "<tr>\n";
	tkgFrmPg += textTd_HTML(" class=\"infotextheading\" width=\"140\" ",tankGaugeCols[3]);
	tkgFrmPg += txtMdtry;
	tkgFrmPg += "<td>\n";

	if ( boolMod ) {
		tkgFrmPg += "<input type=\"text\" maxlength=\"10\"";
		tkgFrmPg += "name=\"tkgType\" value=\"";
		tkgFrmPg += tkgType + "\"";
		tkgFrmPg += " id=\"tkgType\"";
		tkgFrmPg += " msg=\"" +  otherText["EnterIT"] + "\" \/>\n";
	} else {
		tkgFrmPg += tkgType ;
	}

	tkgFrmPg += "</td>\n";
	tkgFrmPg += "</tr>\n";
	tkgFrmPg += "</table>\n";
	tkgFrmPg += "</td>\n";
	tkgFrmPg += "</tr>\n";

	//Row 2
	tkgFrmPg += "<tr>								\n";
	tkgFrmPg += "<td width=\"50%\">\n";
	tkgFrmPg += "<table>\n";
	tkgFrmPg += "<tr>\n";
	tkgFrmPg += textTd_HTML(" class=\"infotextheading\" width=\"140\" ",tankGaugeCols[4]);
	tkgFrmPg += txtMdtryB;
	tkgFrmPg += "<td>\n";

	if ( boolMod ) {
		tkgFrmPg += "<input type=\"text\" maxlength=\"10\"";
		tkgFrmPg += "name=\"tkgAux\" value=\"";
		tkgFrmPg += tkgAux + "\"";
		tkgFrmPg += " id=\"tkgAux\" ";
		tkgFrmPg += " dataType=\"Undanger\" msg=\""+ml(t__Enter_Valid)+ml(t__Tank_Auxiliary)+"\" \/>\n";
	} else {
		tkgFrmPg += tkgAux ;
	}

	tkgFrmPg += "</td>\n";
	tkgFrmPg += "</tr>\n";
	tkgFrmPg += "</table>\n";

	tkgFrmPg += "</td>\n";
	tkgFrmPg += "<td width=\"50%\">\n";

	tkgFrmPg += "<table>\n";
	tkgFrmPg += "<tr>\n";
	tkgFrmPg += textTd_HTML(" class=\"infotextheading\" width=\"140\" ",tankGaugeCols[5]);
	tkgFrmPg += txtMdtryB;
	tkgFrmPg += "<td>\n";

	if ( boolMod ) {
		tkgFrmPg += "<input type=\"text\" maxlength=\"10\"";
		tkgFrmPg += " name=\"tkgChannel\" value=\"";
		tkgFrmPg += tkgChannel + "\"";
		tkgFrmPg += " id=\"tkgChannel\" ";
		tkgFrmPg += " dataType=\"Custom\"\ regexp=\"^[0-9]\*\\d\*$\"  msg=\""+ml(t__Enter_Valid)+ml(t__Tank_Channel)+"\" \/>\n";
	} else {
		tkgFrmPg += tkgChannel;
	}

	tkgFrmPg += "</td>\n";
	tkgFrmPg += "</tr>\n";
	tkgFrmPg += "</table>\n";
	tkgFrmPg += "</td>\n";
	tkgFrmPg += "</tr>\n";
	//end of Row 2

	//start of the row 3
	tkgFrmPg += "<tr>								\n";
	tkgFrmPg += "<td width=\"50%\">\n";
	tkgFrmPg += "<table>\n";
	tkgFrmPg += "<tr>\n";
	tkgFrmPg += textTd_HTML(" class=\"infotextheading\" width=\"140\" ",tankGaugeCols[6]);
	tkgFrmPg += txtMdtryB;
	tkgFrmPg += "<td>\n";

	if ( boolMod ) {
		tkgFrmPg += "<input type=\"text\" maxlength=\"10\"";
		tkgFrmPg += "name=\"tkgInst\" value=\"";
		tkgFrmPg += tkgInst + "\"";
		tkgFrmPg += " id=\"tkgInst\" ";
		tkgFrmPg += " dataType=\"Custom\"\ regexp=\"^[0-9]\*\\d\*$\" msg=\""+ml(t__Enter_Valid)+ml(t__Instance)+"\" \/>\n";
	} else {
		tkgFrmPg += tkgInst;
	}

	tkgFrmPg += "</td>\n";
	tkgFrmPg += "</tr>\n";
	tkgFrmPg += "</table>\n";

	tkgFrmPg += "</td>\n";
	tkgFrmPg += "<td width=\"50%\">\n";

	tkgFrmPg += "<table>\n";
	tkgFrmPg += "<tr>\n";
	tkgFrmPg += textTd_HTML(" class=\"infotextheading\" width=\"140\" ",tankGaugeCols[7]);
	tkgFrmPg += txtMdtry;
	tkgFrmPg += "<td>\n";
	if ( boolMod ) {
		tkgFrmPg += "<input type=\"text\" maxlength=\"10\"";
		tkgFrmPg += "name=\"tkgPollInt\" value=\"";
		tkgFrmPg += tkgPollInt + "\"";
		tkgFrmPg += " id=\"tkgPollInt\" ";
		tkgFrmPg += " dataType=\"PositiveInt\"\ msg=\""+ml(t__Enter_Valid)+ml(t__Poll_Interval)+"\" />\n";
	} else {
		tkgFrmPg += tkgPollInt ;
	}
	tkgFrmPg += "</td>\n";
	tkgFrmPg += "</tr>\n";
	tkgFrmPg += "</table>\n";
	//end of the row 3

	//start of the row 4
	tkgFrmPg += "<tr>\n";
	tkgFrmPg += "<td width=\"50%\">\n";
	tkgFrmPg += "<table>\n";
	tkgFrmPg += "<tr>\n";
	tkgFrmPg += textTd_HTML(" class=\"infotextheading\" width=\"140\" ",tankGaugeCols[8]);
	tkgFrmPg += txtMdtryB;
	tkgFrmPg += "<td>\n";
	if ( boolMod ) {
		tkgFrmPg += "<input type=\"text\" maxlength=\"10\"";
		tkgFrmPg += "name=\"tkAddress\" value=\"";
		tkgFrmPg += tkAddress + "\"";
		tkgFrmPg += " id=\"tkAddress\" ";
		tkgFrmPg += " dataType=\"Custom\"\ regexp=\"^[1-9]\*\\d\*$\" msg=\""+ml(t__Enter_Valid)+ml(t__Register_Offset)+"\" \/>\n";
	} else {
		tkgFrmPg += tkAddress ;
	}

	tkgFrmPg += "</td>\n";
	tkgFrmPg += "</tr>\n";
	tkgFrmPg += "</table>\n";

	tkgFrmPg += "</td>\n";
	tkgFrmPg +="</tr>\n";
	tkgFrmPg += "</table>\n";
	//end of the row 4


	// end of the form row
	tkgFrmPg += "<\/td>\n ";
	tkgFrmPg += "<\/tr> \n";
	tkgFrmPg += "</table>\n";
	tkgFrmPg +=" </div>\n";
	tkgFrmPg += "<\/td>\n ";
	tkgFrmPg += "<\/tr> \n";
	return tkgFrmPg;
}



/*============================================================================*/
// function prints the tank status modification form
// for the browser

function modTankDetailsForm(inop)
{
	var frmPg = "";
	var bckBtnCde = "";
	var bckBtnNm = "";
	var modBtnNm = "";
	var dspFld = "";
	var boolMod = false;
	var tdDnst = "";
	var tdProdCE = "";
	var tdtkApi = "";
	var tdlqdKG = "";
	var tdprodLvl = "";
	var tdobsTC = "";
	var tdobsVol = "";
	var tdstdVol = "";
	var tdgaugMthd = "";
	var tdtkGpNm = "";
	var drpable="";
	
	if(tank_stat_tab[1][13]=="nan")tank_stat_tab[1][13]="";

	if ( inop <= 1 || ( inop > 10 && inop < 15) ) {
		dspFld = "readonly";
		boolMod = false;

		tdDnst    += tank_stat_tab[1][6];
		tdProdCE  += tank_stat_tab[1][7];
		tdtkApi   += tank_stat_tab[1][8];
		tdlqdKG   += tank_stat_tab[1][9];
		tdprodLvl += tank_stat_tab[1][10];
		tdobsTC   += tank_stat_tab[1][11]; 
		tdobsVol  += tank_stat_tab[1][12]; 
		tdstdVol  += tank_stat_tab[1][13];
		tdgaugMthd += getMyGaugType(tank_stat_tab[1][15], gauging_method);
		tdtkGpNm  += tank_stat_tab[1][17];
		drpable=" disabled=true";

	} else {
		boolMod = true;

		tdDnst    += "<input class=\"infotext1\" type=\"text\" maxlength=\"6\" size=\"6\"  ";
		tdDnst    += " name=\"Dnst\" value="+tank_stat_tab[1][6]+" id=\"Dnst\" dataType=\"RangeValue\" min=\""+tank_stat_tab[1][19]+"\" max=\""+tank_stat_tab[1][20]+"\" ";
		tdDnst    += " msg=\"" + otherText["EnterDensity"] + "\"";
		tdDnst    += " onChange=\"submitmyformOnChg(this);\" >\n";
    
    //We are in the modify form but
    //Derek has modified the functional specs 
    //not want the user to change every thing.
    if(useExpC=='N')
    {
		  tdProdCE  += "<input type=\"hidden\" name=\"prodCE\"   ";
		  tdProdCE  += " value="+tank_stat_tab[1][7]+" id=\"prodCE\" ";
		  tdProdCE  += " >\n";
		  tdProdCE  += "<span class=\"infotext\">"+tank_stat_tab[1][7]+" <\/span>\n";
		}
		else if(useExpC=='Y')
		{
		  tdProdCE  += "<input class=\"infotext1\" type=\"text\" maxlength=\"10\" size=\"10\" name=\"prodCE\"   ";
		  tdProdCE  += " value="+tank_stat_tab[1][7]+" id=\"prodCE\" dataType=\"Double\"";
		  tdProdCE  += " msg=\"" + otherText["EnterExpCoeff"] + "\"\n";
		  tdProdCE  += " onChange=\"submitmyformOnChg(this);\" >\n";
    }
    //We are in the modify form but
    //Derek has modified the functional specs 
    //not want the user to change tkApi 
    //and its not in use any way.
		tdtkApi   += "<input type=\"hidden\" name=\"tkApi\"   ";
		tdtkApi   += " value="+tank_stat_tab[1][8]+" id=\"tkApi\" ";
		tdtkApi   += ">\n" ;
    
    //We are in the modify form but
    //Derek has modified the functional specs 
    //Liquid mass will be read only field
		tdlqdKG   += "<input type=\"hidden\" name=\"lqdKG\"   ";
		tdlqdKG   += " value="+tank_stat_tab[1][9]+" id=\"lqdKG\"";
		tdlqdKG   += " >\n";
    tdlqdKG  += "<span class=\"infotext\">"+tank_stat_tab[1][9]+" <\/span>\n";
    //We are in the modify form but
    //Derek has modified the functional specs 
    //Product Level will be read only field
		tdprodLvl += "<input tclass=\"infotext\" type=\"text\" maxlength=\"8\" size=\"8\"  name=\"prodLvl\"   ";
		tdprodLvl += " value="+tank_stat_tab[1][10]+" id=\"prodLvl\" dataType=\"PositiveDouble\" ";
		tdprodLvl  += " msg=\""+ml(t__Enter_Valid)+ml(t__Product_Level)+"!\"";
		tdprodLvl  += " onChange=\"submitmyformOnChg(this);\" >\n";
		
    
    //We are in the modify form but
    //Observe Temperature is still Modify field
		tdobsTC   += "<input class=\"infotext\" type=\"text\" maxlength=\"5\" size=\"5\" name=\"obsTC\"  ";
		tdobsTC   += " value="+tank_stat_tab[1][11]+" id=\"obsTC\" dataType=\"RangeValue\" min=\""+-18.0+"\" max=\""+150.0+"\" ";

		tdobsTC   += " msg=\""+ml(t__Enter_Valid)+ml(t__Observed)+ml(t__Temp)+ml(t__value_between)+" -18.0"+ml(t__and)+" 150.0"+"!\"";
		tdobsTC   += " onChange=\"submitmyformOnChg(this);\" >\n";
    //We are in the modify form but
    //Observe Volume  is still Modify field
		tdobsVol  += "<input class=\"infotext\" type=\"text\" maxlength=\"10\" size=\"10\" name=\"obsVol\"  ";
		tdobsVol  += " value="+tank_stat_tab[1][12]+" id=\"obsVol\" dataType=\"PositiveDouble\"";
		tdobsVol  += " msg=\""+ml(t__Enter_Valid)+ml(t__Observe)+ml(t__Volume)+ml(t__value)+"!\"";
		tdobsVol  += " onChange=\"submitmyformOnChg(this);\" >\n";
  
    //We are in the modify form but
    //Derek has modified the functional specs 
    //Standard Volume is read only field
		tdstdVol  += "<input type=\"hidden\" name=\"stdVol\"  ";
		tdstdVol  += " value="+tank_stat_tab[1][13]+" id=\"stdVol\"";
		tdstdVol  += " >\n";
    tdstdVol  += "<span class=\"infotext\">"+tank_stat_tab[1][13]+" <\/span>\n";
    
		tdgaugMthd += "<select name=\"gaugMthd\" class=\"smallselect\" id= \"gaugMthd\" dataType=\"Require\"  ";
		tdgaugMthd += " msg=\""+ml(t__Enter_Valid)+ml(t__Method)+"!\">\n";
		tdgaugMthd += displayDropList(tank_stat_tab[1][15], gauging_method,ml(t__Select_A)+ml(t__Gauging_Method));
		tdtkGpNm += "<input type=\"hidden\" name=\"tkGpNm\" id= \"tkGpNm\" value=\""+tank_stat_tab[1][17]+"\" >\n";
		//tdtkGpNm  += "<select name=\"tkGpNm\" class=\"smallselect\" id= \"tkGpNm\" dataType=\"Require\"  ";
		//tdtkGpNm  += " msg=\""+ml(t__Enter_Valid)+ml(t__Group)+"!\">\n";
		//tdtkGpNm  += displayDropList_tk(tank_stat_tab[1][17], tank_group_code,ml(t__Select_A)+ml(t__Group));

		tdtkGpNm += tank_stat_tab[1][17];
	}


	// No back button is required if it comes from tankconf and not Saved
	if ( origin == "tankconf" ) {
		bckBtnNm = ml(t__Back_to)+ml(t__Tank_Configuration)+ml(t__Page);
		modBtnNm = ml(t__Save);

		if ( saveSt == "0" ) {
			bckBtnCde ="";
		} else if ( saveSt == "1" ) {
			bckBtnCde += btnLocation_HTML("justChaneMyLocation('/cgi-bin/en/gantry/tanks.cgi');", bckBtnNm );
		}

	} else {

		bckBtnNm = ml(t__Back_to)+ml(t__Tank_Status)+ml(t__Details)+ml(t__Page);
        if ( boolMod ) 
		bckBtnCde += btnLocation_HTML("justChaneMyLocation('tank_stat.cgi?op=1&pg=6&tankTerm="+tankTerm+"&tk="+tk+"'); ",  bckBtnNm );
		if(priv>=6)
		{
			modBtnNm = ml(t__Update);
		}
	}


	if ( boolMod ) 
		frmPg += displayGlblFrm();

	frmPg +="         <tr> \n";
	frmPg +="             <td align=\"center\">\n ";
	frmPg +="                                 <div class=\"button\">\n";

	frmPg += bckBtnCde ;
    
	frmPg +="                                 </div><br>\n";
	frmPg +="             <td>\n ";
	frmPg +="         </tr> \n";
	frmPg +="<tr>\n";
	frmPg +="<td align=\"left\">\n";
	frmPg += "<div id=\"helparea\">\n";
	frmPg +="<table>\n";
	frmPg +="<form name=\"tank_status_mod\"";
	frmPg +="    method=\"GET\"";
	frmPg +="    action=\"/cgi-bin/en/stck_mgmt/tank_stat.cgi\"";
	frmPg +="    id=\"tank_status_mod\">\n";


	if( tank_stat_tab.length == 2 && tk!='-1')
	{
		frmPg += "<input type=\"hidden\" name=\"op\" value=\"25\" >\n";
		frmPg += "<input type=\"hidden\" name=\"pg\" value=\"6\" >\n";
		frmPg += "<input type=\"hidden\" name=\"tankTerm\" value="+tankTerm+" >\n";
		frmPg += "<input type=\"hidden\" name=\"tk\" value="+tk+" >\n";
		frmPg += "<input type=\"hidden\" name=\"prod\" value="+prod+" >\n";
		frmPg += "<input type=\"hidden\" name=\"origin\" value="+origin+" >\n";
		frmPg += "<input type=\"hidden\" name=\"prodNm\"  value="+prodNm+" >\n";
		frmPg += "<input type=\"hidden\" name=\"lvlAlrm\" value="+lvlAlrm+" >\n";
		frmPg += "<input type=\"hidden\" name=\"leakDtct\" value="+leakDtct+" >\n";
		frmPg += "<input type=\"hidden\" name=\"fcfld\" id=\"fcfld\" value=\"NULL\" > \n";
		frmPg += "<input type=\"hidden\" name=\"loDens\" id=\"loDens\" value=\""+tank_stat_tab[1][19]+" \" > \n";
		frmPg += "<input type=\"hidden\" name=\"hiDens\" id=\"hiDens\" value=\""+tank_stat_tab[1][20]+"\" > \n";

		frmPg += "<tr>\n";
		frmPg += "<td class=\"infotextheading\">";
		frmPg += ml(t__Location)+" :";
		frmPg += "</td>";
		frmPg += "<td>";
		//frmPg += tank_stat_tab[1][18];
		frmPg += "<select id=\"tk_location\" name=\"tk_location\" msg=\"\" "+drpable+"> \n";
		frmPg += displayDropList(tank_stat_tab[1][18], area_name," ");
		frmPg += "</td>";
		frmPg += "<td class=\"infotext\" align=\"left\" width=\"70\"> &nbsp; </td>\n";
		/* index 3 */
		frmPg += "<td class=\"infotextheading\">";
		frmPg += ml(t__Standardisation_pt)+" :";
		frmPg += "</td>";
		frmPg += "<td class=\"infotext\" width=\"70\" >";
		frmPg += tank_stat_tab[1][3];
		frmPg += "C</td>";
		frmPg += "<td class=\"infotext\">";
		frmPg += UntConTemp(tank_stat_tab[1][3],'C');
		frmPg += "F</td>";
		frmPg += "</tr>";

		/* index 4 */

		frmPg += "<tr>";
		frmPg += "<td class=\"infotextheading\">";
		frmPg += ml(t__Product_Name)+" :";
		frmPg += "						";
		frmPg += "</td>";
		frmPg += "<td class=\"infotext\">";
		frmPg += tank_stat_tab[1][4];
		frmPg += "</td>";
		frmPg += "<td class=\"infotext\" align=\"left\" width=\"70\"> &nbsp; </td>\n";

		/* index 5 */
		frmPg += "<td class=\"infotextheading\">";
		frmPg += ml(t__Product_Code)+" :";
		frmPg += "</td>";
		frmPg += "<td class=\"infotext\">";
		frmPg += tank_stat_tab[1][5];
		frmPg += "</td>";
		frmPg += "</tr>";
		frmPg += "</table>";
		frmPg += "</div>";
		frmPg += "</td>";
		frmPg += "</tr>";

		frmPg += "<tr>\n";
		frmPg += "<td> &nbsp; \n";
		frmPg += "</td>";
		frmPg += "</tr>";

		/* index 6 */
		frmPg += "<tr>\n";
		frmPg += "<td align=\"left\">\n";
		frmPg += "<div class=\"adminform\">\n";
		frmPg += "<table>\n";
		frmPg += "<tr>\n";
		frmPg += "<td class=\"infotextheading\">" +  myColumns[4] + "</td>\n";
		frmPg += "<td class=\"infotextheading\">:</td>\n";
		frmPg += "<td align=\"left\" >\n";
		frmPg += tdDnst;
		frmPg += "<td class=\"infotext\" align=\"left\"> &nbsp;[" +tank_stat_tab[1][19]+ " - "+tank_stat_tab[1][20]+"] &nbsp;"+ otherText["kg/m3"] + "</td>\n";
		frmPg += "\n";
		frmPg += "</td>\n";

		/* index 7 */
		frmPg += "<td class=\"infotextheading\">\n";
		frmPg +=  "&nbsp;&nbsp;" + myColumns[6] + "</td>\n";
		frmPg += "<td class=\"infotextheading\">:</td>\n";
		frmPg += "<td align=\"left\">\n";
		frmPg += tdProdCE;
		frmPg += "</td>\n";
		frmPg += "<td class=\"infotext\" align=\"left\"> &nbsp; </td>\n";
		frmPg += "</tr>\n";

		/* index 8  - new row */
		/*
		/* API field is not required to be display on the screen.
		*/
		frmPg += "<tr>\n";
			/* index 9 */
    frmPg += "<td class=\"infotextheading\" align=\"left\">" + myColumns[11] + "</td>\n";
		frmPg += "</td>\n";
		frmPg += "<td class=\"infotextheading\">:</td>\n";
		frmPg += "<td >\n";
		frmPg += tdlqdKG;
		frmPg += "\n";
		frmPg += "</td>\n";
		frmPg += "<td class=\"infotext\" align=\"left\"> " + otherText["kg"] + " </td>\n";
		frmPg += "\n";
    /* index 8  - new row */
		/*
		/* API field is not required to be display on the screen.
		*/
    frmPg += "<td class=\"infotextheading\">&nbsp;</td>\n";
		frmPg += "<td class=\"infotextheading\">&nbsp;</td>\n";
		frmPg += "<td >\n";
		//frmPg += tdtkApi;
		frmPg += "<td class=\"infotext\" align=\"left\"> &nbsp; </td>\n";
		frmPg += "\n";
		frmPg += "</td>\n";

		
		frmPg += "</tr>\n";

		/* index 10  - new row*/
		frmPg += "<tr>\n";
		frmPg += "<td class=\"infotextheading\">" +  myColumns[7] + "</td>\n";
		frmPg += "<td class=\"infotextheading\">:</td>\n";
		frmPg += "<td >\n";
		frmPg += tdprodLvl;
		frmPg += "\n";
		frmPg += "</td>\n";
		frmPg += "<td class=\"infotext\" align=\"left\">" + otherText["mm"] + "</td>\n";

		/* index 11 */
		frmPg += "<td class=\"infotextheading\">&nbsp;&nbsp;" + myColumns[8] + "</td>\n";
		frmPg += "<td class=\"infotextheading\">:</td>\n";
		frmPg += "<td >\n";
		frmPg += tdobsTC
		frmPg += "<td class=\"infotext\" align=\"left\"> [-18.0 - 150.0] C </td>\n";
		frmPg += "</td>\n";
		frmPg += "<td class=\"infotext\" align=\"left\"> "+UntConTemp(tank_stat_tab[1][11],'C')+"&nbsp;F </td>\n";
		frmPg += "\n";
		frmPg += "</tr>\n";

		/* index 12 - new row */
		frmPg+="<tr>\n";
		frmPg += "<td class=\"infotextheading\">" +  myColumns[9] + "</td>\n";
		frmPg += "<td class=\"infotextheading\">:</td>\n";
		frmPg += "<td >\n";
		frmPg += tdobsVol;
		frmPg += "\n";
		frmPg += "</td>\n";
		frmPg += "<td class=\"infotext\" align=\"left\"> " + otherText["Litres"] + " </td>\n";

		/* index 13 */
		frmPg += "<td class=\"infotextheading\">&nbsp;&nbsp;" + myColumns[10] + "</td>\n";
		frmPg += "<td class=\"infotextheading\">:</td>\n";
		frmPg += "<td >\n";
		frmPg += tdstdVol;
		frmPg += "</td>\n";
		frmPg += "<td class=\"infotext\" align=\"left\">" + otherText["Litres"] +" </td>\n";
		frmPg += "\n";
		frmPg += "</tr>\n";
		frmPg += "</table>\n";
		frmPg += "</div>\n";
		frmPg += "</td>\n";
		frmPg += "</tr>\n";
		frmPg += "\n";

		/* index 14 - new row */
		frmPg += "<tr>\n";
		frmPg += "<td align=\"left\">\n";
		frmPg += "<br>\n";
		frmPg += "<div class=\"adminform\">\n";
		frmPg += "<table>\n";
		frmPg += "<tr>\n";
		frmPg += "<td class=\"infotextheading\">" +  myColumns[12] + "</td>\n";
		frmPg += "<td class=\"infotextheading\">:</td>\n";
		frmPg += "<td class=\"infotext\">\n";
		frmPg += tank_stat_tab[1][21];
		frmPg += "</td>\n";
		frmPg += "</tr>\n";

		/* index 15 */
		frmPg +="<tr>\n";
		frmPg += "<td class=\"infotextheading\">" +  myColumns[13] + "</td>\n";
		frmPg += "<td class=\"infotextheading\">:</td>\n";
		frmPg += "<td>\n";
		frmPg += tdgaugMthd;
		frmPg += "\n";
		frmPg += "</td>\n";
		frmPg += "</tr>\n";

		/* index 16 */
		frmPg+="<tr>\n";
		frmPg += "<td class=\"infotextheading\">" +  myColumns[14] + "</td>\n";
		frmPg += "<td class=\"infotextheading\">:</td>\n";
		frmPg+="<td class=\"infotext\">\n";
		frmPg+=	tank_stat_tab[1][16];
		frmPg+="</td>\n";
		frmPg+="</tr>\n";

		/* index 17 */
		frmPg +="<tr>\n";
		frmPg += "<td class=\"infotextheading\">" +  myColumns[15] + "</td>\n";
		frmPg += "<td class=\"infotextheading\">:</td>\n";
		frmPg += "<td class=\"infotext\">\n";
		frmPg += tdtkGpNm;
		frmPg += "\n";
		frmPg += "\n";
		frmPg += "</td>\n";
		frmPg += "</tr>\n";
		frmPg += "</table>\n";
		frmPg += "\n";

		/*    if ( fcfld != '' ) {
			  alert(fcfld); 
			  self.focus();
		//document.getElementById(fcfld).focus();
		//eval('this.getElementById('+fcfld+').focus()');
		eval('this.document.forms[1].tkApi.value=1.1');
		}
		 */    

        if ( boolMod ) 
		frmPg += frmButtRow_tkStatusMod_HTML( modBtnNm, 0);


		frmPg += "</form\n";
		frmPg += "</table>\n";
		frmPg += "</div>\n";
		frmPg += "</td>\n";
		frmPg += "</tr>\n";
	}
	else
	{
		alert(ml(t__This_Tank_has_no_data)+"!");
	}


	return( frmPg );
}
/*============================================================================*/


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
/*============================================================================*/

function
displayGlblFrm()
{
	var glblFrm = "";
    var slctStat = "";
    var hdnVal = "";

   
    // When it comes from tankconf, disable terminal and tank dropdownlist
    if ( origin == "tankconf" ) {
         slctStat = "disabled";
         hdnVal +=  "<input type=\"hidden\"  name=\"tankTerm\" value=\""+tankTerm+"\">\n";
         hdnVal +=  "<input type=\"hidden\"  name=\"tk\" value=\""+tk+"\">\n";
    } else {
      slctStat = "";
      hdnVal = "";

    }


    glblFrm += fieldst_HTML(ml(t__Terminal_and_Tank));
	//glblFrm += " <tr>\n";
	//glblFrm += "<td align=\"left\">\n";

	glblFrm += "<form name=\"glblFrm\" id=\"glblFrm\">\n";
    glblFrm += hdnVal;
	glblFrm += "<input type=\"hidden\" name=\"op\" value=\"1\">\n";
	glblFrm += "<input type=\"hidden\" name=\"pg\" value=\"1\">\n";
	glblFrm += "<div class=\"adminform\">\n";
	glblFrm += ml(t__Select_the_Terminal_and_Tank)+","+ml(t__To_View_Tank_Status)+"\n";
	glblFrm += "<table>\n";
	glblFrm += "<tr>\n";
	glblFrm += "<td class=\"infotextheading\">\n";
	glblFrm += ml(t__Terminal)+" :\n";
	glblFrm += "</td>\n";
	glblFrm += "<td>\n";
	glblFrm += "<select id=\"tankTerm\" name=\"tankTerm\" onchange=\"submit();\" "+slctStat+"> \n";
	glblFrm += displayDropList(tankTerm, terminal,ml(t__Select_A)+ml(t__Terminal));
	glblFrm += "</td>\n";

	glblFrm += "</tr>\n";

	glblFrm += "<tr>\n";
	glblFrm += "<td class=\"infotextheading\">\n";
	glblFrm += ml(t__Tank)+" :\n";
	glblFrm += "</td>\n";
	glblFrm += "<td>\n";
	glblFrm += "<select name=\"tk\" id=\"tk\" onchange=\"submit();\" "+slctStat+"> \n";
	glblFrm += displayDropList_tk(tk, tank_code,ml(t__Select_A)+ml(t__Tank));
	glblFrm += "</td>\n";
	glblFrm += "</tr>\n";


	glblFrm += "</table>\n";
	glblFrm += "\n";
	glblFrm += "</div>\n";
	glblFrm += "</form>\n";
	glblFrm += "</td>\n";
	glblFrm += "</tr>\n";
	//document.write(glblFrm);
	return glblFrm;
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
	if (op <= 1 || op > 10 &&op<20)
	{
		pageHeading +=ml(t__Tank_Status)+ml(t__Details);
	}else if(op==2)
	{
		pageHeading +=ml(t__Modify)+ml(t__Tank_Status);
	}else if(op==5||op>=20)
	{
		pageHeading +=ml(t__Product_Ownership);
	}else if(op==7)
	{
		pageHeading +=ml(t__Add_New_Owner);

	}
	else if(op==9)
	{
		pageHeading +=ml(t__Tank_Gauging_Attributes);

	}else if(op==10)
	{
		pageHeading +=ml(t__Modify)+ml(t__Tank_Gauging_Attributes);

	}else if(op==6)
	{
		pageHeading +=ml(t__Modify)+ml(t__Product_Ownership);
	}
	return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	pageTitle +=ml(t__STOCK_MANAGEMENT)+","+ml(t__Tank_Status)+ml(t__Details)+ml(t__Page);


	return pageTitle;
}

function displayDropList_tk(selectedvalue, list,defMsg)
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
		massList +=">"+list[i][1]+"</option>\n";
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

/*============================================================================*/
function
displayDropList_own(selectedvalue, list,defMsg)
{
	var massList = "";
	var matchFound = 0;
	for ( var i = 1; i < list.length; ++i)
	{
		matchFound = 0;
		for( var j = 1; j < prod_own.length; ++j )
		{
			if(prod_own[j][0] == list[i][0] )
			{
				matchFound = 1;
				break;
			}
		}
		if( matchFound == 0 )
		{
			massList += "<option value=\""+list[i][0]+"\"";
			massList += ">"+list[i][1]+"</option>\n";
		}
	}
	massList += "<option value=\"\"";
	massList += "selected";
	massList +=">"+defMsg+"</option>\n";

	massList +="</select>\n";
	return massList;
}

/*============================================================================*/
function op_field (attr)
{
  var fieldHTML ="";
   fieldHTML +="<input name=\"op\" id=\"op\" value=\""+attr+"\" type=\"hidden\">\n";
   return fieldHTML;
}
/*============================================================================*/

function getMyGaugType(selectedvalue, list)
{
	var myGaugValue = "";
	var matchFound=0;
	for (i=1; i<list.length; i++){
		if(list[i][0]==selectedvalue)
		{
			matchFound=1;
			myGaugValue = list[i][1];
		}
	}

	return myGaugValue;

}/*END getMyGaugType*/

function local_HeadrHTML(newPage)
{
	newPage +="<SCRIPT type='text/javascript' LANGUAGE=\"JavaScript\">\n";
	newPage +="/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
	newPage +="FUNCTION [ submitmyform] \n";
	newPage +="[PURPOSE]  		-> 	Always use this method to submit a form,\n";
	newPage +="					gives me the flexbility of doing validation\n";
	newPage +="					and addition if required before i submit the form\n";
	newPage +="          \n";
	newPage +="[Parameter]  	-> myobject FORM OBJECT Parameter is the form need to be submit\n";
	newPage +="[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
	newPage +="'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";


	newPage +="function submitmyform()\n";
	newPage +="{\n";
	newPage +="	//var myHiddenOb;\n";
	newPage +="document.forms[1].op.value = '2';";
	newPage +="	\n";
	newPage +="	//myHiddenOb = getElemRefs(\"prev_qstring\";\n";
	newPage +="	//myHiddenOb.value=produceQString(;\n";
	newPage +="	//return formcheck(myobject;\n";
	newPage +="	//return Validator.Validate(myobject,1);\n";
	newPage +="	if(Validator.Validate(document.forms[1],1)==true){\n";
	newPage +="		document.forms[1].submit();\n";
	newPage +="	}\n";
	newPage +="}\n";

	newPage +="function submitmyform_own(myobject)\n";
	newPage +="{\n";
	newPage +="var form_number = myobject;";
	newPage +="if(document.forms[form_number].op.value=='7')";
	newPage +="{";
	newPage +="document.forms[form_number].pg.value = '7';";
	newPage +="document.forms[form_number].submit();\n";
	newPage +="}\n";
	newPage +="else if(document.forms[form_number].op.value=='6')";
	newPage +="{";
	newPage +="document.forms[form_number].pg.value = '6';";
	newPage +="document.forms[form_number].submit();\n";
	newPage +="	}\n";
	newPage +="else if(document.forms[form_number].op.value=='8')";
	newPage +="{";
	newPage +="if(confirm('Are you sure you want to delete?'))";
	newPage +="{";
	newPage +="document.forms[form_number].pg.value = '8';";
	newPage +="document.forms[form_number].submit();\n";
	newPage +="	}\n";  
	newPage +="	}\n";  

	newPage +="}\n";

	newPage +="function submitmyform27()\n";
	newPage +="{\n";
	newPage +="	\n";
	newPage +="	if(Validator.Validate(document.forms[1],1)==true){\n";
	newPage +="		document.forms[1].submit();\n";
	newPage +="	}\n";
	newPage +="}\n";

	newPage +="function submitmyform26()\n";
	newPage +="{\n";
	newPage +="	\n";
	newPage +="	if(Validator.Validate(document.forms[1],1)==true){\n";
	newPage +="		document.forms[1].submit();\n";
	newPage +="	}\n";
	newPage +="}\n";

	newPage +="function submitmyformOnChg(s)\n";
	newPage +="{ \n";
	newPage +="	   var mytxt=s.name; \n"; 
	newPage +="	   document.getElementById('fcfld').value=mytxt;\n";
	newPage +="    document.tank_status_mod.op.value=15;";
	//newPage +="    return submitmyform(document.tank_status_mod);";
	newPage +="	if(Validator.Validate(document.tank_status_mod)==true){\n";
	newPage +="		document.tank_status_mod.submit();\n";
	newPage +="} \n";
	newPage +="else \n";
	newPage +="{ \n";
	newPage +="  return false; \n";
	newPage +="} \n";
	//newPage +="	   document.tank_status_mod.submit();\n"; 
//	newPage +="    setFldFocus();\n";
	newPage +="}\n";

	newPage +="</script>\n";
	newPage +="</head>\n";
	newPage +="\n";
	newPage +="<BODY>\n";

	newPage +="\n";
	newPage +="\n";
	return (newPage);
}
/* this is the function to
 * display the form submit
 * form
 */
function frmButtRow_tkStatusMod_HTML(value, isReset)
{
  var buttnHTML ="";
  buttnHTML +="								<tr>\n";
  buttnHTML +="									<td align=\"center\" class=\"infotext\" width=\"100%\">\n";
  buttnHTML +="													<input type=\"button\" value=\""+value+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" onClick=\"if(Validator.Validate(document.tank_status_mod)==true)document.tank_status_mod.submit();\">\n";
  if(isReset==1)
  {
    buttnHTML +="									           &nbsp;\n";
    buttnHTML +="													<input type=\"reset\" value=\""+ml(t__Reset)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
  }
  
  buttnHTML +="									</td>\n";
  buttnHTML +="								</tr>\n";

  return buttnHTML;
		
}/* end frmButtRow_tkStatusMod_HTML */
