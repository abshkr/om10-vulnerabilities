/***********************************************
 * $Id: trans_cur_list.js,v 1.26 2008/12/02 00:42:14 abs Exp $
 ***********************************************/



/**** details of op **********/
// for supplier, drawer, carrier the initial value of op are 2,3,4
// for view trans meter totals, each value above is added with 3,then the values are 5,6,7 . so when op=5,6,7, user can view info of trans meter totals.
// for view transfer details, each initial value is added with 6,then the values are 8,9,10. so when op=8,9,10, user can view info of transfer details.
// for end transaction, each initial is added with 9, then the values submitted should be 11,12,13. So in cgi-server side, when priv>7 and op=11,12,13, 
// end transaction function would be activated, if success,return op+10, that is, op=21,22,23.otherwise return error msg.
/******************************/

//This file use unique version for multi-language.
var t__Amb_Litres = ["Amb. Litres","视量（升）"];
var t__Arm = ["Arm","鹤管"];
var t__Back_To_Current_Transaction_Lists = ["Back To Current Transaction Lists","返回当前油品交易明细"];
var t__Bay = ["Bay","发油台"];
var t__Bay_ = ["         Bay:","发油台:"];
var t__Bay_Arm = ["Bay Arm","鹤管"];
var t__CURRENT_TRANSACTION_LIST = ["CURRENT TRANSACTION LIST","当前油品交易明细"];
var t__Closing_Ambient_Litres = ["Closing Ambient Litres","结束视量（升）"];
var t__Closing_Corrected_Litres = ["Closing Corrected Litres","结束标准量（升）"];
var t__Closing_KGs = ["Closing KGs","结束质量(千克)"];
var t__Company_Name__n = ["Company Name:\n","公司名称:\n"];
var t__Company_Type__n = ["Company Type:\n","公司类型:\n"];
var t__Company_and_depot_details = ["Company and depot details","公司和油库细节"];
var t__DKI_Omega_Menu____LOAD_SCHEDULING__TRANSACTION_LIST_Page = ["DKI Omega Menu :: LOAD SCHEDULING, TRANSACTION LIST Page","达基国际Omega系统菜单 ：： 发油订单， 油品交易明细"];
var t__Density_kg_m3 = ["Density kg/m3","密度(千克/立方米)"];
var t__Depot__n = ["Depot:\n","油库:\n"];
var t__Finish = ["Finish","完成"];
var t__Mass_KG = ["Mass (KG)","质量(千克)"];
var t__Meter_Code = ["Meter Code","流量计代码"];
var t__Opening_Ambient_Litres = ["Opening Ambient Litres","开始视量（升）"];
var t__Opening_Corrected_Litres = ["Opening Corrected Litres","开始标准量（升）"];
var t__Opening_KGs = ["Opening KGs","开始质量(千克)"];
var t__Operator_Name = ["Operator Name","操作员"];
var t__Please_complete_the_query_conditions__OR__There_is_not_any_exsisted_data_record_ = ["Please alter the query, OR, Data is not found for the condition specified!","无数据被找到,请补充查询条件再试!"];
var t__Product_Name = ["Product Name","油品名称"];
var t__Select_A_Company_Name = ["Select A Company Name","请选择公司"];
var t__Select_A_Company_Type = ["Select A Company Type","请选择公司类型"];
var t__Select_A_Depot = ["Select A Depot","请选择油库"];
var t__Start = ["Start","开始"];
var t__Status = ["Status","状态"];
var t__Std_Litres = ["Std. Litres","标准(升)"];
var t__TRANSACTION_DETAILS = ["TRANSACTION DETAILS","油品交易细节"];
var t__TRANSACTION_LIST = ["TRANSACTION LIST","油品交易明细"];
var t__TRANSACTION_METER_TOTALS = ["TRANSACTION METER TOTALS","发油清单查看"];
var t__Tanker_ = ["         Tanker:","油槽车:"];
var t__Tanker_Code = ["Tanker Code","油槽车编号"];
var t__Temp__C = ["Temp. (C)","温度(C)"];
var t__Trailer_Cmpt = ["Trailer Cmpt","油槽车拖车油仓"];
var t__Trailer_Code = ["Trailer Code","油槽车拖车编号"];
var t__Transaction_ = ["          Transaction:","交易编号:"];
var t__Transaction_Number = ["Transaction Number","交易编号"];
var t__Transfer = ["Transfer","发原油记录"];
var t__Trip_Number = ["Trip Number","提单号码"];
var t__YOUR_ACTION = ["YOUR ACTION","选项"];
var t__You_can_not_end_ENDED_transaction = ["You can not end ENDED transaction!", "您不可以终止已经结束的发油交易！"];
var t__WARNING_end_transaction = ["WARNING: If you end this transaction, further details for it may be ignored!", "警告：如果您终止了该交易，所有以后的信息可能会丢失！"];
var t__Are_you_sure_to_END_THE_TRANSACTION = ["Are you sure you want to END THE TRANSACTION?", "您确定要终止该发油交易吗？"];
var t__END_TRANSACTIONS = ["END TRANSACTION", "终止发油交易"];
var t__END_TRANSACTIONS_FAIL = ["End Transaction Failed!", "终止发油交易失败！"];
var t__END_TRANSACTIONS_SUCK = ["Successfully ended the transaction!", "终止发油交易成功"];



var myColumns = [ ml(t__Bay),ml(t__Transaction_Number),	ml(t__Status),	ml(t__Trip_Number), ml(t__Tanker_Code),ml(t__Operator_Name),ml(t__Start),ml(t__Finish)];
var myColumns_meter = [ml(t__Arm),ml(t__Meter_Code),	ml(t__Opening_Ambient_Litres),	ml(t__Closing_Ambient_Litres), ml(t__Opening_Corrected_Litres),ml(t__Closing_Corrected_Litres),ml(t__Opening_KGs),ml(t__Closing_KGs)];
var myColumns_detail = [ml(t__Transfer),ml(t__Bay_Arm),	ml(t__Trailer_Code),	ml(t__Trailer_Cmpt), ml(t__Product_Name),ml(t__Amb_Litres),ml(t__Std_Litres),ml(t__Mass_KG),ml(t__Density_kg_m3),ml(t__Temp__C)];

/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    		

//    var ops_req_print = [-1, 1,2,3,5, 15,23,24, 25,26,27, 33,34, 35, 28,38,48,36,27,37,47,133,134,135,137];
//    var ops_req_search = [-1, 1,2,3,5, 15,23,24, 25,26,27, 33,34, 35,28,38,48,36,27,37,47,133,134,135,137];// search never required on this page		

var ops_req_print = [-1, 1,2,3,4,5,6, 9,15,23,24, 25,26,27, 33,34, 35, 28,38,48,36,27,37,47,133,134,135,137];
var ops_req_search = [-1, 1,2,3,4,5,6, 9, 15,23,24, 25,26,27, 33,34, 35,28,38,48,36,27,37,47,133,134,135,137];// search never required on this page		
/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
var l_opInf= new Array()
	l_opInf[31]= ml(t__END_TRANSACTIONS_FAIL);
	l_opInf[21]= ml(t__END_TRANSACTIONS_SUCK);
	l_opInf[32]= ml(t__END_TRANSACTIONS_FAIL);
	l_opInf[22]= ml(t__END_TRANSACTIONS_SUCK);
	l_opInf[33]= ml(t__END_TRANSACTIONS_FAIL);
	l_opInf[23]= ml(t__END_TRANSACTIONS_SUCK);


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



	if (curPrivilage >=5 && curViewDetailState <= 1 || curViewDetailState >= 2 && curViewDetailState<5||curViewDetailState>20) // view records for testing, and the correct value of curViewDetailState here is 10 
	{
		
		newPage +=displayDataTable();
	} /*****curPrivilage>=6&&*****/
	else if (curViewDetailState >= 5&&curViewDetailState<=7) // transaction meter totals
	{

		newPage +=diplayMeterTotals();

	}
	else if(curViewDetailState >= 8&&curViewDetailState<=10)
	{
		newPage +=displayTransactionDetails();
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



function displayTransactionDetails()
{
	var newPage ="";

	newPage += "<tr>";
	newPage += "		<td align=\"center\">";
	newPage += "<div class=\'button\'>";
	op_back1 = parseInt(op)-6;
	newPage += "<a href=\'trans_cur_list.cgi?op="+op_back1+"&tankTerm="+tankTerm+"&cmpyCd="+cmpyCd+"&cmpy_typ_id="+cmpy_typ_id+"&pg="+pg+"'>"+ml(t__Back_To_Current_Transaction_Lists)+"</a></div> <br>";
	newPage += "		</td>";
	newPage += "	</tr>";

	newPage += "	<tr><td></td></tr>";
	newPage += displayGlblFrm();
	newPage += "	<tr><td></td></tr>";

	newPage += "<tr>";
	newPage += "<td>";
	newPage += "<div id=\"helparea\" > \n";
	newPage += "  <table> \n";
	newPage += "   <tr> \n";
	newPage += "     <td class='infotextheadingtd'> ";
	newPage += ml(t__Bay_);
	newPage += "     </td>";
	newPage += "     <td class='infotext'> ";
	newPage +=           bay_code;
	newPage += "     </td>";
	newPage += "   </tr>";
	newPage += "   <tr> \n";
	newPage += "     <td class='infotextheadingtd'> ";
	newPage += ml(t__Transaction_);
	newPage += "     </td>";
	newPage += "     <td class='infotext'> ";
	newPage +=            trans_id;
	newPage += "		</td>";
	newPage += "	  </tr>";
	newPage += "   <tr> \n";
	newPage += "     <td class='infotextheadingtd'> ";
	newPage += ml(t__Tanker_);
	newPage += "     </td>";
	newPage += "     <td class='infotext'> ";
	newPage +=           tk;
	newPage += "		</td>";
	newPage += "	  </tr>";
	newPage += " </table> \n";
	newPage += "</div>";
	newPage += "</td>";
	newPage += "<tr>";


	if( ((myColumns_detail.length)> 0))
	{
		newPage += "<tr> \n";
		newPage += "<td>\n ";
		newPage += "<div id=\"printReady\">\n" ;
		newPage += table_begin("M", 0,"");
		newPage += "<tbody> \n";
		newPage += "<tr>";  
		for(var i=0; i<myColumns_detail.length; i++)
		{
			newPage += "<td>"+myColumns_detail[i]+"<\/td>";
		}
		newPage += "<\/tr>";
	}


	for(i in trans_detail)
	{
		newPage += "<tr class=\"row1\">\n";
		if(i>0) 
		{
			for(var j=0; j<myColumns_detail.length; j++)
			{

				newPage += "<td align='center'>" + obs(trans_detail[i][j])+"<\/td>";

			}
		}
	}
	newPage += "<\/tr>";
	newPage += "<\/tbody>";

	newPage += "<\/table>";
	newPage += "</div>\n" ;
	newPage += "<\/td>";	
	newPage += "<\/tr>";
	return (newPage);
}


function diplayMeterTotals()
{
	var newPage ="";

	newPage += "<tr>";
	newPage += "		<td align=\"center\">";
	newPage += "     <div class=\'button\'>";
	op_back = parseInt(op)-3;
	newPage += "     <a href=\'trans_cur_list.cgi?op="+op_back+"&tankTerm="+tankTerm+"&cmpyCd="+cmpyCd+"&cmpy_typ_id="+cmpy_typ_id+"&pg="+pg+"'>"+ml(t__Back_To_Current_Transaction_Lists)+"</a></div> <br>";
	newPage += "		</td>";
	newPage += "	</tr>";

	newPage += "	<tr><td></td></tr>";
	newPage += displayGlblFrm();
	newPage += "	<tr><td></td></tr>";

	newPage += "<tr>";
	newPage += "<td>";
	newPage += "<div id=\"helparea\" > \n";
	newPage += "  <table> \n";
	newPage += "   <tr> \n";
	newPage += "     <td class='infotextheadingtd'> ";
	newPage += ml(t__Bay_);
	newPage += "     </td>";
	newPage += "     <td class='infotext'> ";
	newPage +=           bay_code;
	newPage += "     </td>";
	newPage += "   </tr>";
	newPage += "   <tr> \n";
	newPage += "     <td class='infotextheadingtd'> ";
	newPage += ml(t__Transaction_);
	newPage += "     </td>";
	newPage += "     <td class='infotext'> ";
	newPage +=            trans_id;
	newPage += "		</td>";
	newPage += "	   </tr>";
	newPage += "  </table> \n";
	newPage += "</div>";
	newPage += "</td>";
	newPage += "</tr>";  




	if( ((myColumns_meter.length)> 0))
	{

		newPage += "<tr> \n";
		newPage += "<td>\n ";
		newPage += "<div id=\"printReady\">\n" ;
		newPage += table_begin("M", 1,"");
		newPage += "<tbody> \n";

		newPage += "<tr>";

		for(var i=0; i<myColumns_meter.length; i++)
		{
			newPage += "<td>"+myColumns_meter[i]+"<\/td>";
		}
		newPage += "<\/tr>";
	}


	for(i in meter_total)
	{
		newPage += "<tr class=\"row1\">\n";
		if(i>0) 
		{
			for(var j=0; j<myColumns_meter.length; j++)
			{

				newPage += "<td align='center'>" + obs(meter_total[i][j])+"<\/td>";

			}
		}
	}
	newPage += "<\/tr>";
	newPage += "<\/tbody>";

	newPage += "<\/table>";
	newPage += "</div>\n" ;
	newPage += "<\/td>";	
	newPage += "<\/tr>";
	return (newPage);
}  



function displayDataTable()
{
	var newPage ="";
	newPage += displayGlblFrm();
	newPage +=displayStatusMsg (op); 
	if( ((myColumns.length)> 0))
	{
		newPage += "<tr> \n";
		newPage += "<td>\n ";
		newPage += "<div id=\"printReady\">\n" ;
		newPage += table_begin("M", 2,"");
		newPage += "<tbody> \n";

		newPage += "<tr>"; 

		if  (trans_list_tab.length > 1) {
			for(var i=0; i<myColumns.length; i++)
			{
				newPage += "<td>"+myColumns[i]+"<\/td>";
			}
		}

		newPage += "<\/tr>";
	}

	if(!is_array_null(trans_list_tab))
	{

		for(i in trans_list_tab)
		{
			newPage += "<tr class=\"row1\">\n";
			if(i>0) 
			{
				newPage += "<form name='list"+i+"' id='list"+i+"'>"
					var tran = 0;
				for(var j=0; j<myColumns.length; j++)
				{
					if (j == 0)
					{
						newPage +="<td>";
						newPage +="<table width='100%'>";
						newPage +="<tr>";
						newPage += "<td style=\"white-space:nowrap\"> <span style=\"COLOR: #FF0000;\">" + obs(trans_list_tab[i][j])+"<\/span><\/td>";
						newPage += "<input type='hidden' name='cmpy_typ_id\' value='"+cmpy_typ_id+"'>\n"; 
						newPage += "<input type='hidden' name='cmpyCd\' value='"+cmpyCd+"'>\n"; 
						newPage += "<input type='hidden' name='tankTerm\' value='"+tankTerm+"'>\n"; 
						newPage += "<input type=\'hidden\' name=\'bay_code\' value='"+obs(trans_list_tab[i][j])+"'>\n";
						newPage += "<input type='hidden' name='pg\' value='"+pg+"'>\n"; 
						newPage += "<td width='50%' align='center'>";


						tran = parseInt(i);
						op_meter = parseInt(op)+3;
						op_detail = parseInt(op)+6;
						op_end = parseInt(op)+12;
            //alert(op_end);
						//if(trans_list_tab[i][j+2]!="TRANS_STATUS_AUTHORISED")
						//if succeeded previous end transaction bring the op back to normal
						if(op_end==(22+11))op_end-=22;

						if(trans_list_tab[i][j+2]!= "AUTH")
						{

							newPage += "<select id='op' name='op' onchange = 'submitmyform_own("+tran+");' > \n";
							newPage += "   <option value='' selected>"+ml(t__YOUR_ACTION)+"</option>\n";
// meter total not required for current transactions							newPage += "   <option value="+op_meter+" >"+ml(t__TRANSACTION_METER_TOTALS)+"</option>\n";
// Transction details not required for current transaction							newPage += "   <option value="+op_detail+" >"+ml(t__TRANSACTION_DETAILS)+"</option>\n";
							newPage += "   <option value="+op_end+" >"+ml(t__END_TRANSACTIONS)+"</option> \n";
							newPage += "</select>";

						}
						else
						{
							newPage += " <select id='op' name='op' onchange = 'submitmyform_own("+tran+");' > \n";
							newPage += "   <option value='' selected>"+ml(t__YOUR_ACTION)+"</option>";
// meter total not required for current transactions							newPage += "   <option value="+op_meter+" >"+ml(t__TRANSACTION_METER_TOTALS)+"</option>";
// Transction details not required for current transaction							newPage += "   <option value="+op_detail+" >"+ml(t__TRANSACTION_DETAILS)+"</option>";
							newPage += "   <option value="+op_end+" >"+ml(t__END_TRANSACTIONS)+"</option> \n";
							newPage += "</select>";

						}

						newPage += "</td>";
						newPage +="</tr>";
						newPage +="</table>";
						newPage += "</td>";
					}
					else if(j == 1)
					{

						newPage += "<input type=\'hidden\' name=\'trans_id\' value='"+obs(trans_list_tab[i][j])+"'>\n";					
						newPage += "<td align='center'>" + obs(trans_list_tab[i][j])+"<\/td>";

					}
					else if(j == 4)
					{

						newPage += "<input type=\'hidden\' name=\'tk\' value='"+obs(trans_list_tab[i][j])+"'>\n";					
						newPage += "<td align='center'>" + obs(trans_list_tab[i][j])+"<\/td>";

					}
					else
					{
						newPage += "<td align='center'>" + obs(trans_list_tab[i][j])+"<\/td>";

					} 
				}
				newPage += "\n";
				newPage += "</form>";
				newPage += "<\/tr>";
			}
		}


		newPage += "<\/tbody>";

		newPage += "<\/table>";
		newPage += "</div>\n" ;
		newPage += "<\/td>";	
		newPage += "<\/tr>";

	}
	else
	{

		newPage += "<\/tbody>";
		newPage += "<\/table>";
		newPage += "</div>\n" ;
		newPage +="<tr>";	
		newPage +="<td>";	
		newPage +=ml(t__Please_complete_the_query_conditions__OR__There_is_not_any_exsisted_data_record_);			
		newPage += "</td>";
		newPage +="</tr>";
		newPage += "<\/td>";	
		newPage += "<\/tr>";

	}
	return (newPage);
}  



function displayGlblFrm()
{
	var glblFrm = "";
	var txtSlctCo = "";
	var txtSlctTerm = "";

	if (cmpy_typ_id == "-1")
	{
		txtSlctCo = "disabled";
		txtSlctTerm = "disabled";
		cmpyCd = "-1";
		tankTerm = "-1";
	}

//	if (cmpyCd == "-1")
//	{
//		txtSlctTerm = "disabled";
//		tankTerm = "-1";
//	}

	glblFrm += fieldst_HTML(ml(t__Company_and_depot_details));  
	glblFrm += "<form name=\"glblFrm\" id=\"glblFrm\">\n";
	glblFrm += " <div class=\"adminform\">\n";
	glblFrm += "  <table>\n";
	glblFrm += "   <tr>\n";
	glblFrm += "    <td class=\"infotextheading\">\n";
	glblFrm += ml(t__Company_Type__n);
	glblFrm += "    </td>\n";
	glblFrm += "   <td>\n";
	glblFrm += "     <input type='hidden' name='op' value='"+1+"'>\n";  
	glblFrm += "     <select id='cmpy_typ_id' name='cmpy_typ_id' onchange='submit();'> \n";
	glblFrm +=       displayDropList_sp(cmpy_typ_id, cmpy_type_jslst,ml(t__Select_A_Company_Type));
	
	glblFrm += "    </td>\n"; 
	glblFrm += "</tr>\n"; 
	glblFrm += "<tr>\n"; 
	glblFrm += "<td class=\"infotextheading\">\n";
	glblFrm += ml(t__Company_Name__n);
	glblFrm += "  </td>\n";
	glblFrm += "  <td>\n";
	glblFrm += "     <select name=\"cmpyCd\" id=\"cmpyCd\" "+txtSlctCo+" > \n";
	glblFrm += displayDrop_ShowDefSelected(cmpyCd, cmpy_jslst,ml(t__Select_A_Company_Name));
	glblFrm += "  </td>\n";
	glblFrm += "</tr>\n";  
	glblFrm += "<tr>\n"; 
	glblFrm += "  <td class=\"infotextheading\">\n";
	glblFrm += ml(t__Depot__n);
	glblFrm += "  </td>\n";
	glblFrm += "  <td>\n";
	glblFrm += "    <select name=\"tankTerm\" id=\"tankTerm\" "+txtSlctTerm+" > \n";
	glblFrm += displayDrop_ShowDefSelected(tankTerm, terminal,ml(t__Select_A_Depot));
	glblFrm += "<input type=\"button\" value=\""+ml(t__View)+"\" name=\"view\"   onclick=\"document.glblFrm.op.value=1;document.glblFrm.submit();\" "+txtSlctCo+">\n";
	glblFrm += "  </td>\n";
	
	glblFrm += "</tr>\n";
	glblFrm += "</table>\n";
	glblFrm += "</div>\n";
	glblFrm += "</form>\n";
	glblFrm += fieldstFoot_HTML();


	return glblFrm;
}


function assArray_keys(inputArr)
{
	var keys = new Array();
	for (var i in inputArr) 
	{
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
	if (op <= 1 || op > 20)
	{
		pageHeading +=ml(t__CURRENT_TRANSACTION_LIST);
	}else if(op<=4)
	{
		pageHeading +=ml(t__CURRENT_TRANSACTION_LIST);

	}else if(op>=5&&op<=7)
	{
		pageHeading +=ml(t__TRANSACTION_METER_TOTALS);
	}
	else if(op>=8&&op<=10)
	{
		pageHeading +=ml(t__TRANSACTION_DETAILS);

	}
	return pageHeading;   
}


function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;
	if (op <= 1 || op > 10)
	{
		pageTitle +=ml(t__DKI_Omega_Menu____LOAD_SCHEDULING__TRANSACTION_LIST_Page);

	}
	return pageTitle;
}


function displayDropList_sp(selectedvalue, list,defMsg)
{
	var massList = "";
	var matchFound=0;
	//  var j=0;

	for (i=1; i<list.length; i++)
	{
		massList += "<option value=\""+list[i][0]+"\"";
		if(list[i][0]==selectedvalue)
		{
			matchFound=1;
			massList += "selected";
		}
		massList +=">"+list[i][1]+"</option>\n";
	}

	//  massList += "<option value='ALL'>ALL</option>";
	//  massList += "<option value='all'>ALL</option>";

	massList += "<option value=\"\"";
	if(matchFound==0)//no matchfound
	{
		massList += "selected";
	}

	//  massList +=">"+list[j][1]+"</option>\n";
	massList +=">"+defMsg+"</option>\n";

	massList +="</select>\n";
	return massList;
}

function is_array_null(arrayName)
{
	if(arrayName.length==1&&op<2)
	{
		return true;

	}
	else if(arrayName.length>1)
	{
		return false;
	}
	else
	{
		return true;
	}

}

function nextPage(totalPages, curPg, totalRows,curPgName, curPgVarName)
{
	var nextPgHTML="";
	nextPgHTML += "<tr> \n";
	nextPgHTML += "<td align=\"center\"class='infotextheadingtd'>\n ";
	curPg = parseInt(curPg);

	if ( curPg> 1)
	{
		//nextPgHTML +="<a href=\"javascript:document.glblFrm.pg.value="+(curPg-1)+";document.glblFrm.op.value=0;document.glblFrm.submit();\">Previous</a>\n";
		nextPgHTML +="<a href=\"javascript:gotoResultPage('"+curPgName+"', '"+curPgVarName+"', '"+1+"' );\">First Page</a>&nbsp;\n";
		nextPgHTML +="<a href=\"javascript:gotoResultPage('"+curPgName+"', '"+curPgVarName+"', '"+(curPg-1)+"' );\">Previous</a>\n";
	}
	nextPgHTML +="&nbsp; Current="+curPg+"/"+totalPages+" &nbsp; ";
	if (totalPages > curPg)
	{
		nextPgHTML +="<a href=\"javascript:gotoResultPage('"+curPgName+"', '"+curPgVarName+"', '"+(curPg+1)+"' );\">Next</a>&nbsp;\n";
		nextPgHTML +="<a href=\"javascript:gotoResultPage('"+curPgName+"', '"+curPgVarName+"', '"+totalPages+"' );\">Last Page</a>\n";
	}
	nextPgHTML += "&nbsp;&nbsp;&nbsp;";
	nextPgHTML += "Total&nbsp;"+totalRows+"&nbsp;transactions";
	nextPgHTML += "<\/td>\n ";
	nextPgHTML += "</tr> \n";
	return nextPgHTML;
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
	newPage +="'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";

	newPage +="function submitmyform_own(myobject)\n";
	newPage +="{\n";
	newPage +="    var form_number = myobject;\n";
	newPage +="    var mystatus  = trans_list_tab[parseInt(myobject)][2];\n";
	//newPage +="    alert(mystatus);\n"; 
	//newPage +="    alert(document.forms[form_number].op.value);\n";
	newPage +="    if(document.forms[form_number].op.value >= 5 && document.forms[form_number].op.value <= 10)\n";
	newPage +="    {\n";
	newPage +="          document.forms[form_number].submit();\n";
	newPage +="    }\n";
	newPage +="    else if(document.forms[form_number].op.value >= 11 && document.forms[form_number].op.value <= 13)\n";
	newPage +="    {\n";
	newPage +="         if ( mystatus == 'ENDED' )\n";
	newPage +="         { \n";
	newPage +="                alert('"+ml(t__You_can_not_end_ENDED_transaction)+"');\n";
	newPage +="                document.forms[form_number].reset();\n";
	newPage +="         } else {\n";
	newPage +="                alert('"+ml(t__WARNING_end_transaction)+"');\n";
	newPage +="                if(confirm('"+ml(t__Are_you_sure_to_END_THE_TRANSACTION)+"'))\n";
	newPage +="                {";
	newPage +="                     document.forms[form_number].submit();\n";
	newPage +="	               }\n";
	newPage +="                else \n";
	newPage +="                { \n";
	newPage +="                     document.forms[form_number].reset();\n";
	newPage +="	               }\n"; 
	newPage +="	        }\n";  
	newPage +="	    }\n";  
	newPage +="     else \n";
	newPage +="     { \n";
	newPage +="         document.forms[form_number].reset();\n";
	newPage +="	    }\n"; 
	newPage +="}\n";

	newPage +="function submitmyform()\n";
	newPage +="{\n";
	newPage +="if((document.forms[1].rptActive.checked))";
	newPage +="{";

	newPage +="document.forms[1].rptActive.value='Y';";
	newPage+="document.forms[1].submit();\n";
	newPage+="	}\n";
	newPage +="else{";

	newPage +="document.forms[1].rptActive.value='N';";
	newPage +="document.forms[1].rptActive.checked = true;";  
	newPage+="		document.forms[1].submit();\n";
	newPage +="}\n";
	newPage +="}\n";

	newPage +="function submit_myform_0()\n";
	newPage +="{\n";
	newPage +="if(document.forms[0].cmpy_typ_id.value=='1')";
	newPage +="{";
	newPage +="document.forms[0].op.value='2';";
	newPage+="document.forms[0].submit();\n";
	newPage +="}\n";
	newPage +="else if(document.forms[0].cmpy_typ_id.value=='2')";
	newPage +="{";
	newPage +="document.forms[0].op.value='4';";
	newPage+="document.forms[0].submit();\n";
	newPage+="	}\n";
	newPage +="else if(document.forms[0].cmpy_typ_id.value=='4')";
	newPage +="{";
	newPage +="document.forms[0].op.value='3';";
	newPage+="document.forms[0].submit();\n";
	newPage+="	}\n";  
	newPage +="else";
	newPage +="{";

	newPage+="document.forms[0].submit();\n";
	newPage+="	}\n";
	newPage +="}\n";

	newPage +="</script>\n";
	newPage += "</head>\n";
	newPage += "<body>\n";
	return (newPage);
}


