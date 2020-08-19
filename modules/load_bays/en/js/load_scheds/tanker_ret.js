/*************************************************************
 * $Log: tanker_ret.js,v $
 * Revision 1.22  2008/07/08 00:56:57  abs
 * update tanker expiry was not working before now should be ok because correct OP value was not passed on by the JS file when submit the update form
 *
 * Revision 1.21  2006/11/17 04:10:51  bz
 * fix bugzilla 1985-1988 and 1906, translation of trip, compartment, tanker, and DLI
 *
 * Revision 1.20  2006/07/31 00:27:02  yjf
 * Correct displayinfotable id
 *
 * Revision 1.19  2006/06/27 05:09:43  omega
 * Re-added to cvs
 *
 * Revision 1.17  2006/06/27 01:58:50  yjf
 * New renderPage function
 *
 * Revision 1.16  2006/03/05 23:17:41  yjf
 * translated t__Put_Sfill, t__ALERT_POSITIVE_INT_REQ
 *
 * Revision 1.15  2006/03/02 05:02:13  gp
 * Fixed bug on limit qty < Safe fill.
 *
 * Revision 1.14  2006/03/02 00:58:24  gp
 * Added isInteger function.
 *
 * Revision 1.13  2006/03/02 00:55:12  gp
 * Fixed limit Qty less than Safe Fill.
 *
 * Revision 1.12  2006/02/27 02:35:32  yjf
 * fixed bug 1130. Product popup work fine now.
 *
 * Revision 1.11  2006/02/23 22:11:07  gp
 * Tidy up.
 *
 * Revision 1.10  2006/02/22 00:47:50  yjf
 * add id for content div
 *
 * Revision 1.9  2006/02/20 22:18:53  gp
 * Fixed return value not to exceeding Safe Fill.
 *
 * Revision 1.8  2006/02/14 04:25:18  gp
 * Changed to disabled return location, bug #1128.
 *
 * Revision 1.7  2006/02/14 04:19:03  gp
 * Fixed bug no 1127.
 *
 * Revision 1.6  2006/02/14 03:36:17  gp
 * Fixed 'fieldst' stuff, fixed iframe size. TODO: iprod -> Product List
 * is still not match with the drawer.
 *
 * Revision 1.5  2006/02/09 22:31:45  yjf
 * All these files use unique version for multi-language.
 *
 * Revision 1.4  2006/01/27 01:54:20  bz
 * chinese
 *
 * Revision 1.3  2006/01/26 04:22:11  yjf
 * separate text info.
 *
 * Revision 1.2  2006/01/26 03:56:35  yjf
 * new template
 *
 * Revision 1.8  2005/12/13 05:05:49  gp
 * Put statusBar to provide status message when an operation occur.
 *
 * Revision 1.7  2005/12/04 22:46:23  gp
 * Fixed the missing HMTL heading.
 *
 * Revision 1.6  2005/11/30 04:01:41  gp
 * Changed date standard to 'YYYY-MM-DD', and change DMY to Date.
 *
 * Revision 1.5  2005/11/28 05:08:55  gp
 * Removed op value from option list.
 *
 * Revision 1.4  2005/11/16 04:39:13  gp
 * Fixed iFrame bug.
 *
 * Revision 1.3  2005/11/14 06:27:12  gp
 * Fixed the glitch that this js wasn't work on IE.
 *
 * Revision 1.2  2005/11/14 03:37:33  gp
 * Added return compartment & save as preloaded.
 *
 * $Id: tanker_ret.js,v 1.22 2008/07/08 00:56:57 abs Exp $
 *
 ***************************************************************/


//This file use unique version for multi-language.
var t__All_the_fields_labelled_with_an = ["								All the fields labelled with an ","								所有标有"];

var t__are_mandatory = ["are mandatory","的表项必须填写"];
var t__Are_you_sure = ["Are you sure ","您是否确定"];
var t__Back_to_Load_Schedules_Page = ["Back to Load Schedules Page","返回发油配送管理页面"];
var t__Back_to_Tanker_Return = ["Back to Tanker Return","回到返还油品处理"];
var t__Compartment = ["														Compartment","														油仓"];
var t__Compartment = ["Compartment","油仓"];
var t__COMPARTMENT_RETURNS = ["COMPARTMENT RETURNS","返还油仓"];
var t__Contact_Head_Office = ["Contact Head Office","联系总部"];
var t__Current = ["Current","当前页"];
var t__CURRENT = ["CURRENT","当前设置"];
var t__Date = ["Date","日期"];
var t__Drawer = ["														Drawer","														油品调配公司"];
var t__Drawer = ["Drawer","油品调配公司"];
var t__loaded = ["loaded","已发油量"];
var t__LOAD_SCHEDULES = ["LOAD SCHEDULES","发油配送管理"];
var t__Load_Terminal = ["                       	Load Terminal","                       	发油油库"];
var t__Modifying_Returns_Location = ["Modifying Returns Location","正在修改返还地点"];
var t__Next = ["Next","下一页"];
var t__No_reasons_configured_for = ["No reasons configured for","没有原因设置"];
var t__old = ["old","旧的"];
var t__Origin = ["Origin","起始"];
var t__Previous = ["Previous","上一页"];
var t__Prime_Mover = ["                       	Prime Mover","                       	车头"];

var t__Eq_Code = ["                       	Equipment Code","                       设备编号"];

var t__Product = ["														Product","														油品"];
var t__Product = ["Product","油品"];
var t__Put_a_quantity = ["Please enter Quantity and not exceeds Safe Fill!","请输入小于安全容量的数量!"];
var t__Qty = ["														Quantity","														油量"];
var t__Reason = ["Reason","原因"];
var t__Reset = ["Reset","重置"];
var t__Return_Date = ["														Return Date","														返还日期"];
var t__Return_Location = ["                       	Return Location","                       	返还地点"];
var t__Return_Reason = ["														Return Reason","														返还原因"];
var t__Return_volume_is_greater_than_safe_fill = ["Return volume is greater than safe fill","返还油品容量多于安全容量"];
var t__Save_As_Preloaded = ["Save As Preloaded","另存为预发油量"];
var t__Select_a_date = ["Select a date","选择日期"];
var t__Select_a_Drawer = ["Select a Drawer","选择油品调配公司"];
var t__Select_a_Product = ["Select a Product","选择油品"];
var t__Select_a_Reason = ["Select a Reason","选择原因"];
var t__Select_A_Return_Location = ["Select A Return Location","选择返还地点"];
var t__Select_a_valid_reason = ["Select a valid reason","选择合理原因"];
var t__Select_Date = ["Select Date","选择日期"];
var t__Set = ["Set","设置"];
var t__SET_COMPARTMENT_RETURNS = ["SET COMPARTMENT RETURNS","设置返还油仓"];
var t__STOCK_LOSS = ["STOCK LOSS","库存损耗"];
var t__Tanker = ["                       	Tanker","                       	油槽车"];
var t__Tanker_Return_Details = ["Tanker Return Details","返还油品处理信息"];
var t__Tanker_Return_Page = ["Tanker Return Page","返还油品处理页面"];
var t__TANKER_RETURNS = ["TANKER RETURNS","返还油品处理"];
var t__Trailer = ["														Trailer","														拖车"];
var t__Trailer = ["Trailer","拖车"];
var t__Trip = ["                       	Trip","                       	提单"];
var t__Unit = ["Unit","单位"];
var t__YOUR_ACTION = ["YOUR ACTION","请选择"];
var t__Trip_Details = ["Trip Details","提单详情"];

var t__Put_Sfill = ["Set to Safe Fill value","设置安全容量"];
var t__ALERT_POSITIVE_INT_REQ = ["Positive Integer value is required", "请输入正整数值"];

var t__Returned_Text = ["Returned","返还量"];


var myColumns = [ml(t__Trailer), ml(t__Compartment), ml(t__Drawer), ml(t__Product), ml(t__Unit), ml(t__Date), ml(t__Origin), ml(t__Reason)];

/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    		
var ops_req_print = [-1, 1,2,3,5, 15,23,24, 25,26,27, 33,34, 35, 28,38,48,36,27,37,47,133,134,135,137];
var ops_req_search = [-1, 1,2,3,5, 15,23,24, 25,26,27, 33,34, 35,28,38,48,36,27,37,47,133,134,135,137];// search never required on this page			
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




	if (curPageIn == ml(t__loaded))
	{



		newPage += "\n<script type=\"text\/javascript\">\n";
		newPage += "<!--\n";

		//  newPage += "var depot =";
		//  newPage += "\'"+tankTerm+"';\n";
		newPage += "var tankTerm =";
		newPage += "\'"+tankTerm+"';\n";
		//  newPage += "alert(tankTerm);\n"		
		newPage += "var tanker_ret_tab = [\n"; 
		newPage +="[ ";  
		newPage +="\"\"";
		newPage +=", "; 
		newPage +="\"\"";
		newPage +=", ";
		newPage +="\"\"";
		newPage +=", "; 
		newPage +="\"\"";
		newPage +=", "; 
		newPage +="\"\"";
		newPage +=", "; 
		newPage +="\"\"";
		newPage +=", "; 
		newPage +="\"\"";
		newPage +=", "; 
		newPage +="\"\"";
		newPage +=", "; 
		newPage +="\"\"";
		newPage +=", "; 
		newPage +="\"\"";
		newPage +=", "; 
		newPage +="\"\"";
		newPage +=", "; 
		newPage +="\"\"";
		newPage +=", "; 
		newPage +="\"\"";
		newPage +=" ]\n"; 


		for(i in tanker_ret_tab)
		{

			if (i>0)
			{
				newPage += ",[\n";
				for(var j=0; j<myColumns.length+1; j++)
				{
					if(j==0)
					{
						newPage += "\'"+tanker_ret_tab[i][j]+"'";
					}
					else{          
						newPage += "\,'"+tanker_ret_tab[i][j]+"'";
					}
				}
				newPage += "]\n";
			}

		}
		newPage += "];\n"; 

		newPage += "var terminal = [\n"; 
		newPage +="[ ";  
		newPage +="\"\"";
		newPage +=", "; 
		newPage +="\"\"";
		newPage +=" ]\n"; 

		for(i in terminal)
		{

			if (i>0)
			{
				newPage += ",[\n";
				for(var j=0; j<2; j++)
				{
					if(j==0)
					{
						newPage += "\'"+terminal[i][j]+"'";
					}
					else{          
						newPage += "\,'"+terminal[i][j]+"'";
					}
				}
				newPage += "]\n";
			}

		}
		newPage += "]\n";   
		newPage += "\/\/-->\n";
		newPage += "<\/script>\n";

	}
	else
	{
		newPage += "";
	}

	// end the loaded part here

	newPage += statusbarRowHTML(statusBar); 

	if (curViewDetailState <= 30 || curViewDetailState > 121) // view records
	{

		//newPage += displayGlblFrm(supp,tankTerm);
		//newPage +=addPrintBtn_HTML();

		newPage += addButton();
		newPage += displayInfo();

		if( ((myColumns.length)> 0))
		{
			newPage += "<tr> \n";
			newPage += "	<td>\n ";
			newPage += table_begin("M", 0,"");
			newPage += "			<tbody> \n";
			newPage += "				<tr>";

			for(var i=0; i<myColumns.length; i++)
			{
				if (myColumns[i] == ml(t__Unit))
					newPage += "<td>"+ ml(t__Returned_Text)+the_unit+"<\/td>";
				else
					newPage += "<td>"+myColumns[i]+"<\/td>";
			}
			newPage += "<\/tr>";


			for(i in tanker_ret_tab)
			{
				newPage += "<tr class=\"row1\">\n";
				if(i>0) 
				{
					var howmanyDone =3;
					for(var j=0; j<myColumns.length; j++)
					{

						if (curColumnToSort == howmanyDone)
						{
							newPage += "<td style=\"background-color:#EEEEEE\">" + obs(tanker_ret_tab[i][howmanyDone]) + "<\/td>";
						} 
						else 
						{

							newPage += "<td>\n";				  
							if(howmanyDone==3) // means time to display the drop list and table
							{
								newPage +="   <form name=\"optionsFrm_"+tanker_ret_tab[i][howmanyDone]+"\" id=\"optionsFrm\" method=\"get\">\n";
								newPage +="       <table border=\"0\">\n";
								newPage +="	       <tr>\n";
								newPage +="                 <td width=\"200\"> <span style=\"COLOR: #FF0000;\">"+obs(tanker_ret_tab[i][2])+"</span>\n";
								newPage +="                     <input type=\"hidden\" name=\"tankTerm\" id=\"tankTerm\" value=\""+tanker_ret_tab[i][0]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"supp\" id=\"supp\" value=\""+tanker_ret_tab[i][1]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+tanker+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"tripNo\" id=\"tripNo\" value=\""+tanker_ret_tab[i][3]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"compt\" id=\"compt\" value=\""+tanker_ret_tab[i][4]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"drawer\" id=\"drawer\" value=\""+tanker_ret_tab[i][5]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"qty\" id=\"qty\" value=\""+tanker_ret_tab[i][7]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"rtnDate\" id=\"rtnDate\" value=\""+tanker_ret_tab[i][8]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"reason\" id=\"reason\" value=\""+tanker_ret_tab[i][11]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"prodcde\" id=\"prodcde\" value=\""+tanker_ret_tab[i][13]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"prodNm\" id=\"prodNm\" value=\""+tanker_ret_tab[i][14]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"equipID\" id=\"equipID\" value=\""+tanker_ret_tab[i][16]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"orig\" id=\"orig\" value=\""+tanker_ret_tab[i][15]+"\">\n";

								newPage +="                 </td>\n";
								newPage +="                 <td>\n";
								newPage += op_list(curPrivilage);
								newPage +="                 </td>\n";
								newPage +="	       </tr>\n";
								newPage +="	  </table>\n";
								newPage +="   </form>\n";
							}
							else if(howmanyDone==5)
							{
								if ( tanker_ret_tab[i][6] == "" ) {
									newPage += obs(tanker_ret_tab[i][6]);
								} else {
									newPage += obs(tanker_ret_tab[i][howmanyDone]);
								}
							} 
							else
							{
								newPage += obs(tanker_ret_tab[i][howmanyDone]);
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

		// not required  newPage += nextPage();
		//newPage +=addPrintBtn_HTML();

	}// end if to check state
	else if(curViewDetailState == 121)
	{
		//                newPage +="\n";
		//                newPage += displayInfo();
		newPage +="\n";
		newPage += setReturnForm();
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



function displayInfo()
{

	var infoPage ="";

	infoPage += fieldst_HTML(ml(t__Trip_Details));
	infoPage += "       	<form name=\"infoPage\" id=\"infoPage\">\n";
	infoPage +="<div class=\"adminform\">\n";

	//  infoPage += " <tr>\n";
	//  infoPage += " 	<td align=\"left\">\n";
	//  infoPage += "       	<form name=\"infoPage\" id=\"infoPage\">\n";

	infoPage += "             <table>\n";
	infoPage += "					<tr>\n";
	infoPage += "                   	<td class=\"infotextheading\">\n";
	infoPage += ml(t__Load_Terminal)+":\n";
	infoPage += "                   	</td>\n";
	infoPage += "                   	<td class=\"infotext\">\n";
	infoPage += "							" + tankTerm+ " - " + tankTermNm;
	infoPage += "                   	</td>\n";
	infoPage += "                	</tr>\n";
	infoPage += "                	<tr>\n";
	infoPage += "                   	<td class=\"infotextheading\">\n";
	infoPage += ml(t__Trip)+":\n";
	infoPage += "                   	</td>\n";
	infoPage += "                   	<td class=\"infotext\">\n";
	infoPage += "							" + tripNo+ " - " + suppNm;
	infoPage += "                     </td>\n";
	infoPage += "                 </tr>\n";
	infoPage += "                	<tr>\n";
	infoPage += "                   	<td class=\"infotextheading\">\n";
	infoPage += ml(t__Tanker)+":\n";
	infoPage += "                   	</td>\n";
	infoPage += "                   	<td class=\"infotext\">\n";
	infoPage += "							" + tanker;
	infoPage += "                   	</td>\n";
	infoPage += "                	</tr>\n";
	infoPage += "                	<tr>\n";
	infoPage += "                   	<td class=\"infotextheading\">\n";
	//infoPage += ml(t__Prime_Mover)+":\n";
	infoPage += ml(t__Eq_Code)+":\n";
	infoPage += "                   	</td>\n";
	infoPage += "                   	<td class=\"infotext\">\n";
	infoPage += "							" + prime;
	infoPage += "                   	</td>\n";
	infoPage += "                	</tr>\n";
	infoPage += "                	<tr>\n";
	infoPage += "                   	<td class=\"infotextheading\">\n";
	infoPage += ml(t__Return_Location)+":\n";
	infoPage += "                   	</td>\n";
	infoPage += "                   	<td>\n";

	if( op  == 121) {
		infoPage += "							<select NAME=\"loc\" disabled id=\"loc\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_A_Return_Location)+"\">\n";
	} else {
		infoPage +="                        <input type=\"hidden\" name=\"pg\" id=\"pg\" value=\""+pg+"\">\n";
		infoPage +="                        <input type=\"hidden\" name=\"tankTerm\" id=\"tankTerm\" value=\""+tankTerm+"\">\n";
		infoPage +="                         <input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+tanker+"\">\n";
		infoPage += "			<input type=\"hidden\" name=\"supp\" value=\""+supp+"\" />\n";
		infoPage += "			<input type=\"hidden\" name=\"tripNo\" value=\""+tripNo+"\" />\n";
		infoPage += "			<input type=\"hidden\" name=\"op\" value=\"14\" />\n";

		infoPage += "			<input type=\"hidden\" name=\"loc\" value=\""+loc+"\" />\n";

		//infoPage += "							<select NAME=\"loc\" id=\"loc\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_A_Return_Location)+"\" onChange=\"setReturnLoc(this);\" >\n";
		infoPage += "							<select NAME=\"loc\" id=\"loc\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_A_Return_Location)+"\" disabled onChange=\"setReturnLoc(this);\" >\n";
	}

	infoPage += displayDropList(loc, terminal, ml(t__Select_A_Return_Location));

	infoPage += "                   	</td>\n";
	infoPage += "                	</tr>\n";
	infoPage += "				</table>\n";

	//  infoPage += "        	</form>\n";
	//  infoPage += " 	</td>\n";
	//  infoPage += "	</tr>\n";

	infoPage +="<\/div>\n";
	infoPage += "        	</form>\n";
	infoPage += fieldstFoot_HTML();

	return infoPage;  	

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


function addButton()
{
	var button = "";
	button += "<tr>\n";
	button += "	<td align=\"center\">\n";
	button += " 	<form name=\"buttonFrm\" id=\"buttonFrm\">\n";
	button += "			<input type=\"hidden\" name=\"tankTerm\" value=\""+tankTerm+"\" />\n";
	button += "			<input type=\"hidden\" name=\"supp\" value=\""+supp+"\" />\n";
	button += "			<input type=\"hidden\" name=\"op\" value=\"0\" />\n";
	button += "	</form>\n";
	button += " 	<form name=\"savebuttonFrm\" id=\"savebuttonFrm\">\n";
	button += "			<input type=\"hidden\" name=\"tankTerm\" value=\""+tankTerm+"\" />\n";
	button += "			<input type=\"hidden\" name=\"supp\" value=\""+supp+"\" />\n";
	button += "			<input type=\"hidden\" name=\"tanker\" value=\""+tanker+"\" />\n";
	button += "			<input type=\"hidden\" name=\"orig\" value=\"MENU\" />\n";
	button += "			<input type=\"hidden\" name=\"tripNo\" value=\""+tripNo+"\" />\n";
	button += "			<input type=\"hidden\" name=\"op\" value=\"15\" />\n";
	button += "	</form>\n";
	button += "		<div class=\"button\">\n";
	if ( load_status == ml(t__CURRENT) ){
		button += "			<a href=\"#\" onClick=\"document.savebuttonFrm.action='tanker_ret.cgi';document.savebuttonFrm.submit();\">"+ml(t__Save_As_Preloaded)+"</a>\n";
	}
	button += "			<a href=\"#\" onClick=\"document.buttonFrm.action='load_scheds.cgi';document.buttonFrm.submit();\">"+ml(t__Back_to_Load_Schedules_Page)+"</a>\n";
	button += "		</div><br>\n";
	button += " </td>\n";
	button += "</tr>\n";

	return button;
}



function setReturnForm()
{
	var i = 1;
    var y = tanker_ret_tab[i][4];


	// var reason = [['', ''], ['DEFAULT RETURN REASON', 'DEFAULT RETURN REASON'], ['RETURN_VERIFICATION', 'Return Verification'], ['RETURN_TANKER', 'Return Tanker']];

	var setReturnFrm = "";
	setReturnFrm += "	<tr>\n";
	setReturnFrm += "		<td align=\"center\">\n";
	setReturnFrm += "			<div class=\"button\">\n";
	setReturnFrm += "				<a href=\"tanker_ret.cgi?pg=1&supp="+supp+"&tankTerm="+tankTerm+"&tanker="+tanker+"&op=12&tripNo="+tripNo+"\">"+ml(t__Back_to_Tanker_Return)+"</a></div><br>\n";
	setReturnFrm += "		</td>\n";
	setReturnFrm += "	</tr>\n";
	setReturnFrm += "	<form name=\"setReturnFrm\" method=\"get\" id=\"setReturnFrm\" onsubmit=\"return submitmyform(this)\">\n";
	setReturnFrm += fieldst_HTML(ml(t__Tanker_Return_Details));
	setReturnFrm +="<div class=\"adminform\">\n";
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
	setReturnFrm += "														" + tanker_ret_tab[1][2] ;
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
	setReturnFrm += "														"+ tanker_ret_tab[1][4] ;
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
	setReturnFrm += "														<select name=\"drawer\" id=\"drawer\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_a_Drawer)+"\" onChange=\"setProduct(this);\" >\n";

	if ( tanker_ret_tab[1][6] == "" ) {
		setReturnFrm += displayDropList(tanker_ret_tab[1][6], cmpy_jslst, ml(t__Select_a_Drawer));
	} else {
		setReturnFrm += displayDropList(tanker_ret_tab[1][12], cmpy_jslst, ml(t__Select_a_Drawer));
	}

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

	setReturnFrm += "<div class=popup WIDTH: 15px id=\"prodSelect_eq\" style=\"VISIBILITY: hidden; display: none\">\n";
	setReturnFrm += "	<div class=\"closeimage\">\n";
	setReturnFrm += "		<img src=\"/images/closedrop.gif\" onclick=\"hideCurrentPopup(); return false;\" border=\"0\">\n"; 
	setReturnFrm += "	</div>\n";
	setReturnFrm += "	<iframe id=\"eq_iprod\" name=\"eq_iprod\" width=\"220\" src=\"equiplist_product.cgi?cmpy="+tanker_ret_tab[1][5]+"\" scrolling=auto></iframe>\n";
	setReturnFrm += "</div>\n";

	setReturnFrm += "																	<td class=\"popupLinkrow\">\n";
	setReturnFrm += "																		<input type=\"text\" name=\"prodNm\" id=\"prodNm\" value=\""+tanker_ret_tab[1][14]+"\" dataType=\"Require\" msg=\""+ml(t__Select_a_Product)+"\" readonly />\n"; 
	setReturnFrm += "																		<input type=\"hidden\" name=\"prod\" id=\"prod\" value=\""+tanker_ret_tab[1][13]+"\" />\n"; 
	setReturnFrm += "																	</td>\n";
	setReturnFrm += "																	<td width=\"15\">\n";
	setReturnFrm += "<img src=\"/images/dropimage.gif\" width=\"15\" height=\"16\" onclick=\"return setProduct('prodSelect_eq', event);\">\n";
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
	setReturnFrm += "														<span class=\"mandatory\">*</span>\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td>\n";
	// setReturnFrm += "														<input type=\"text\" name=\"qty\" id=\"qty\" size=12 maxlength=9 dataType=\"Compare\" to=\""+ cmpt_list_tab[y][1] +"\"  operator=\"LessThanEqual\" msg=\""+ml(t__Put_a_quantity)+"\" value=\""+tanker_ret_tab[1][7]+"\" onChange=\"checkQty(this);\" />\n";
	setReturnFrm += "														<input type=\"text\" name=\"qty\" id=\"qty\" size=12 maxlength=9 dataType=\"Range\" min=\"0\" max=\""+ cmpt_list_tab[y][1] +"\" msg=\""+ml(t__Put_a_quantity)+"\" value=\""+tanker_ret_tab[1][7]+"\" onChange=\"isInteger(this);\" />\n";
	setReturnFrm += "													[0 - "+cmpt_list_tab[y][1]+"] </td>\n";
	setReturnFrm += "												</tr>\n";
	setReturnFrm += "											</table>\n";
	setReturnFrm += "										</td>\n";
	setReturnFrm += "										<td width=\"50%\">\n";
	setReturnFrm += "											<table>\n";
	setReturnFrm += "												<tr>\n";
	setReturnFrm += "													<td class=\"infotextheadingtd\" width=\"100\">\n";
	setReturnFrm += ml(t__Return_Date)+":\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td width=\"5\" align=\"center class=\"infotext\">\n";
	setReturnFrm += "														<span class=\"mandatory\">*</span>\n";
	setReturnFrm += "													</td>\n";
	setReturnFrm += "													<td>\n"; 
	setReturnFrm += "														<input type=\"text\" name=\"rtnDate\" id=\"rtnDate\" value=\""+tanker_ret_tab[1][8]+"\" dataType=\"Require\" msg=\""+ml(t__Select_a_date)+"\" readonly/>\n";
	setReturnFrm += dateURL_HTML("document.forms[0].rtnDate", "date_anchor1","yyyy-MM-dd",ml(t__Select_Date));
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
	setReturnFrm += "														<select name=\"reason\" id=\"reason\" class=\"smallselect\" datatype=\"Require\" msg=\""+ml(t__Select_a_valid_reason)+"\" >\n";
	setReturnFrm += displayDropList(tanker_ret_tab[1][10], reason_jslst, ml(t__Select_a_Reason));
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
	setReturnFrm += "											<input type=\"hidden\" name=\"tankTerm\" id=\"tankTerm\" value=\""+tankTerm+"\" />\n";
	setReturnFrm += "                                                                                     <input type=\"hidden\" name=\"orig\" id=\"orig\" value=\"MENU\">\n";
	setReturnFrm += "											<input type=\"hidden\" name=\"supp\" id=\"supp\" value=\""+supp+"\" />\n";
	setReturnFrm += "											<input type=\"hidden\" name=\"tripNo\" id=\"tripNo\" value=\""+tripNo+"\" />\n";  
	setReturnFrm += "											<input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+tanker+"\" />\n";
	setReturnFrm += "											<input type=\"hidden\" name=\"equipID\" id=\"equipID\" value=\""+tanker_ret_tab[1][16]+"\" />\n";
	setReturnFrm += "											<input type=\"hidden\" name=\"cmpt\" id=\"cmpt\" value=\""+tanker_ret_tab[1][4]+"\" />\n";
	setReturnFrm += "											<input type=\"hidden\" name=\"op\" id=\"op\" value=\"20\" />\n";
	setReturnFrm += "											<input type=\"submit\" value=\""+ml(t__Set)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	setReturnFrm += "										</td>\n";
	setReturnFrm += "										<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	setReturnFrm += "											<input type=\"reset\" value =\""+ml(t__Reset)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	setReturnFrm += "										</td>\n";
	setReturnFrm += "									</tr>\n";
	setReturnFrm += "								</table>\n";
	setReturnFrm += "							</td>\n";
	setReturnFrm += "						</tr>\n";
	setReturnFrm += "					</table>\n";
	setReturnFrm += "                    </div>\n";
	setReturnFrm += "                    </form>\n";                      
	setReturnFrm += fieldstFoot_HTML();

	return setReturnFrm;
} //End setReturn Form


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

	if ( op == 121 ) {
		pageHeading +=ml(t__COMPARTMENT_RETURNS);
	} else if (op <= 30 || op > 50) {
		pageHeading +=ml(t__TANKER_RETURNS);
	}


	return pageHeading;   
}

function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;
	if (op <= 30 || op > 50)
	{
		pageTitle +=ml(t__LOAD_SCHEDULES)+", "+ml(t__Tanker_Return_Page);

	}


	return pageTitle;
}


/* define function op_list() */
function op_list(priv)
{
	/* priv = 
	   6 modify	op=1,2,3
	   7 add		op=4
	   8 delete	op=5
	 */
	var op_list ="";
	op_list +="<select name=op onchange=\"sendoption(this);\">          ";
	switch (priv)
	{
		case 8:								/* Delete */

		case 7:								/* Add */

		case 6:								/* Modify */
			op_list +="<option value=121>"+ml(t__SET_COMPARTMENT_RETURNS)+"</option>";

		case 5:								/* Display */
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
	newPage +="function sendoption(element)\n";
	newPage +="{\n";
	newPage +=" \n";
	newPage +="	var value = element.options[element.selectedIndex].value;\n";
	newPage +="	var frm = element.parentNode.parentNode.parentNode.parentNode.parentNode;\n";
	newPage +="\n";
	newPage +="	switch (value)\n";
	newPage +="	{\n";
	newPage +="		case \"22\":\n";
	newPage +="			frm.action=\"order_spec_prod.cgi\";\n";
	newPage +="			break;\n";
	newPage +="		default:\n";
	newPage +="			break;\n";
	newPage +="	}\n";
	newPage +="	frm.submit();\n";
	newPage +="}\n";
	newPage +="\n";
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


	newPage +="//set return location \n";
	newPage +="function setReturnLoc(element)\n";
	newPage +="{\n";
	newPage +=" if ( element.value != '' ) { \n";
	newPage +="   if(confirm('"+ml(t__Modifying_Returns_Location)+". "+ml(t__Are_you_sure)+"?')) \n";
	newPage +="   { \n";
	newPage +="      infoPage.action=\"tanker_ret.cgi\";\n";
	newPage +="      infoPage.submit();\n";
	newPage +="   } \n";
	newPage +=" }\n";
	newPage +="}\n";

	newPage +=" \n";
	newPage +="//check quantity against safe fill \n";
	newPage +="function checkQty(element)\n";
	newPage +="{\n";
	/* Bug #1131  */
    newPage +=" var cmpt = tanker_ret_tab[1][4];";
    newPage +=" var sfill = cmpt_list_tab[cmpt][1];";
    newPage +=" alert(sfill);";
    newPage +=" alert(cmpt);";
	newPage +=" if (document.setReturnFrm.qty.value > sfill) \n"; 
	newPage +="   { \n";
	newPage +="      if(confirm('"+ml(t__Return_volume_is_greater_than_safe_fill)+". "+ml(t__Put_Sfill)+". "+ml(t__Are_you_sure)+"?')) \n";
	newPage +="      { \n";
	newPage +="        document.setReturnFrm.qty.value= sfill; \n";
	newPage +="      } else { \n";
	newPage +="        document.setReturnFrm.qty.value=''; \n";
	newPage +="        document.setReturnFrm.qty.focus; \n";
	newPage +="      } \n";
	newPage +="   } \n";
	newPage +="}\n";

	newPage +="//check Difference \n";
	newPage +="function checkDifference()\n";
	newPage +="{\n";
	newPage +=" if (tanker_ret_tab[i][7] == '')  \n"; 
	newPage +="   { \n";
	newPage +="        if ( document.setReturnFrm.qty.value != tanker_ret_tab[i][7] && do_preloaded == 0 ) \n"; 
	newPage +="           { \n";
	newPage +="              scrExplain(); \n";
	newPage +="           } \n";
	newPage +="   } else {\n";
	newPage +="        if ( document.setReturnFrm.qty.value != tanker_ret_tab[i][7] ) \n";
	newPage +="           { \n";
	newPage +="              scrExplain(); \n";
	newPage +="           } \n";
	newPage +="   } \n";
	newPage +="}\n";

	newPage +="//Display alert \n";
	newPage +="function scrExplain()\n";
	newPage +="{\n";
	newPage +="        if ( document.setReturnFrm.qty.value >= tanker_ret_tab[i][7] ) \n"; 
	newPage +="           {\n";
	newPage +="               alert('"+ml(t__No_reasons_configured_for)+": STOCK GAIN"+". "+ml(t__Contact_Head_Office)+"') \n";
	newPage +="           } else { \n";
	newPage +="               alert('"+ml(t__No_reasons_configured_for)+": "+ml(t__STOCK_LOSS)+". "+ml(t__Contact_Head_Office)+"') \n";
	newPage +="           }\n";
	newPage +="}\n";


	newPage +="function isInteger(r) {\n";
	newPage +="    var i;\n";
	newPage +="    var s = trim(r.value);\n";
	newPage +="    for (i = 0; i < s.length; i++)\n";
	newPage +="    {   \n";
	newPage +="        // Check that current character is number.\n";
	newPage +="        var c = s.charAt(i);\n";
	newPage +="        if (((c < \"0\") || (c > \"9\")))  { \n";
	newPage +="	          alert(' "+ml(t__ALERT_POSITIVE_INT_REQ)+"');\n";
	newPage +="           r.value = '';\n";
	newPage +="           return false;\n";
	newPage +="        }\n";
	newPage +="    }\n";
	newPage +="}\n";

	newPage +="</script>\n";
	newPage += "</head>\n";
	newPage += "<body>\n";
	return (newPage);
}


