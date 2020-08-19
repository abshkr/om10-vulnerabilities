/**********************************************************
 * $Log: load_details.js,v $
 * Revision 1.12  2006/11/17 04:10:50  bz
 * fix bugzilla 1985-1988 and 1906, translation of trip, compartment, tanker, and DLI
 *
 * Revision 1.11  2006/07/31 00:27:01  yjf
 * Correct displayinfotable id
 *
 * Revision 1.10  2006/06/27 05:09:43  omega
 * Re-added to cvs
 *
 * Revision 1.8  2006/06/27 01:58:45  yjf
 * New renderPage function
 *
 * Revision 1.7  2006/03/03 05:37:27  gp
 * Fixed header to follow standard divs.
 *
 * Revision 1.6  2006/02/23 22:11:06  gp
 * Tidy up.
 *
 * Revision 1.5  2006/02/22 00:47:49  yjf
 * add id for content div
 *
 * Revision 1.4  2006/02/09 22:31:45  yjf
 * All these files use unique version for multi-language.
 *
 * Revision 1.3  2006/01/27 01:53:58  bz
 * chinese
 *
 * Revision 1.2  2006/01/26 04:35:17  yjf
 * separate text info.
 *
 * Revision 1.1  2006/01/25 00:41:22  abs
 * interface changes completed ready for text extraction
 *
 * Revision 1.4  2005/11/30 04:01:41  gp
 * Changed date standard to 'YYYY-MM-DD', and change DMY to Date.
 *
 * Revision 1.3  2005/11/28 06:00:39  gp
 * Removed op list number on option dropdown list.
 *
 * Revision 1.2  2005/10/28 02:09:08  dr
 * *** empty log message ***
 *
 * Revision 1.2  2005/10/11 06:35:23  gp
 * First working version.
 *
 * Revision 1.1  2005/10/06 23:07:18  gp
 * Initial revision
 *
 *
 *
 * $Id: load_details.js,v 1.12 2006/11/17 04:10:50 bz Exp $ 
 *
 **********************************************************/


//This file use unique version for multi-language.
var t__Additive_Tank = ["Additive Tank","添加剂油罐"];
var t__Arm = ["                       				Arm","                       				鹤管"];
var t__Arm = ["Arm","鹤管"];
var t__Arm_Code = ["Arm Code","鹤管编号"];
var t__Back_to_Enter_Load_Details = ["Back to Enter Load Details","返回模拟输入发油量"];
var t__Back_to_Load_Schedules_Page = ["Back to Load Schedules Page","返回发油配送管理页"];
var t__Base_Product = ["Base Product","基础油品管理"];
var t__Cmpt_No = ["Cmpt No","油仓号"];
var t__Compartment = ["                       				Compartment","                       				油仓"];
var t__Current = ["Current","当前页"];
var t__Date = ["                       				Date","                       				日期"];
var t__DKI_Omega_Menu = ["DKI Omega Menu","达基Omega系统菜单"];
var t__Drawer = ["                       				Drawer","                       				油品调配公司"];
var t__ENTER_LOAD_DETAILS = ["ENTER LOAD DETAILS","模拟输入发油量"];
var t__Enter_Load_Details_Page = ["Enter Load Details Page","模拟输入发油量管理页"];
var t__Injector = ["Injector","注射器"];
var t__Loaded_Qty = ["Loaded Qty","已发油量"];
var t__Loader = ["                       				Loader","                       				提油人"];
var t__LOAD_SCHEDULES = ["LOAD SCHEDULES","发油配送管理"];
var t__Main_Tank = ["Main Tank","主油罐"];
var t__Meter = ["Meter","流量计"];
var t__Next = ["Next","下一页"];
var t__Previous = ["Previous","上一页"];
var t__Product_Code = ["                       				Product Code","                       				油品代码"];
var t__Product_Code = ["Product Code",""];
var t__Product_Name = ["                       				Product Name","                       				油品名称"];
var t__Product_Name = ["Product Name","油品名称"];
var t__Quantity = ["                       				Quantity","                       				油量"];
var t__Quantity = ["Quantity","油量"];
var t__Supplier = ["                       				Supplier","                       				供应商"];
var t__Tank = ["Tank","油罐"];
var t__Tanker = ["                       				Tanker","                       				油槽车"];
var t__Terminal = ["                       				Terminal","                       				油库"];
var t__Time = ["                       				Time","                       				时间"];
var t__Trip = ["                       				Trip","                       				提单"];
var t__Unit = ["                       				Unit","                       				单位"];
var t__Unit = ["Unit","单位"];
var t__VIEW = ["VIEW","查看"];
var t__View_Load_Details_Page = ["View Load Details Page","查看发油信息"];
var t__YOUR_ACTION = ["YOUR ACTION","请选择"];
var t__Trip_Details = ["Trip Details","提单详情"];



var myColumns = [ml(t__Cmpt_No), ml(t__Product_Code), ml(t__Product_Name), ml(t__Unit), 
	ml(t__Loaded_Qty), ml(t__Arm), ml(t__Main_Tank), ml(t__Additive_Tank)];

var viewColumns = [ml(t__Base_Product), ml(t__Arm_Code), ml(t__Meter), ml(t__Injector), ml(t__Tank), ml(t__Quantity)];

/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    		
var ops_req_print = [-1, 1,2,3,5, 15,16];
var ops_req_search = [-1, 1,2,3,5, 15,16];// search never required on this page					

function renderPage(cRec, cCol, cState, cPageState, priv, lang)
{ 

	var curRecord = cRec;
	var curColumnToSort = cCol;
	var curViewDetailState = cState;
	var curPageIn = cPageState;
	var curPriviledge = priv;

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


	// alert(curViewDetailState);

	if (curViewDetailState <= 15 || curViewDetailState > 30) // view records
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
			newPage += "	<td>\n ";
			newPage += table_begin("M", 0,"");
			newPage += "			<tbody> \n";
			newPage += "				<tr>";

			for(var i=0; i<myColumns.length; i++)
			{
				newPage += "<td>"+myColumns[i]+"<\/td>";
			}
			newPage += "<\/tr>";


			for(i in load_details_tab)
			{
				newPage += "<tr class=\"row1\">\n";
				if(i>0) 
				{
					var howmanyDone =0;
					for(var j=0; j<myColumns.length; j++)
					{

						if (curColumnToSort == howmanyDone)
						{
							newPage += "<td style=\"background-color:#EEEEEE\">" + obs(load_details_tab[i][howmanyDone]) + "<\/td>";
						} 
						else 
						{

							newPage += "<td>\n";				  
							if(howmanyDone==0) // means time to display the drop list and table
							{
								newPage +="   <form name=\"optionsFrm_"+load_details_tab[i][howmanyDone]+"\" id=\"optionsFrm\" method=\"get\">\n";
								newPage +="       <table border=\"0\">\n";
								newPage +="	       <tr>\n";
								newPage +="                 <td width=\"50\"> <span style=\"COLOR: #FF0000;\">"+obs(load_details_tab[i][howmanyDone])+"</span>\n";
								newPage +="                     <input type=\"hidden\" name=\"cmptID\" id=\"cmptID\" value=\""+load_details_tab[i][0]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" +pg+ "\">\n";
								newPage +="                     <input type=\"hidden\" name=\"tankTerm\" id=\"tankTerm\" value=\""+tankTerm+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"supp\" id=\"supp\" value=\""+supp+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+tanker+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"tripNo\" id=\"tripNo\" value=\""+tripNo+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"prdcde\" id=\"prdcde\" value=\""+load_details_tab[i][1]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"armcde\" id=\"armcde\" value=\""+load_details_tab[i][5]+"\">\n";
								newPage +="                 </td>\n";
								newPage +="                 <td>\n";
								if ( load_details_tab[i][1].length == 0 ) {
									newPage += op_list(curPriviledge,0);
								} else {
									newPage += op_list(curPriviledge,1);
								}
								newPage +="                 </td>\n";
								newPage +="	       </tr>\n";
								newPage +="	  </table>\n";
								newPage +="   </form>\n";
							}


							else

							{
								newPage += obs(load_details_tab[i][howmanyDone]);
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

		//newPage += nextPage();
		newPage += "		</table>\n";
		newPage += " 		</div>\n";
		newPage += "	</td>\n";
		newPage += "</tr>\n";
		//newPage +=addPrintBtn_HTML();

	}// end if to check state

	else if(curViewDetailState == 16)
	{
		newPage += viewTab();

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



function viewTab()
{
	var viewTab = "";

	viewTab += "<tr>\n";
	viewTab += "	<td align=\"center\">\n";
	viewTab += "		<div class=\"button\"><a href=\"load_details.cgi?tankTerm="+tankTerm+"&supp="+supp+"&tanker="+tanker+"&tripNo="+tripNo+"&pg="+pg+" \">"+ml(t__Back_to_Enter_Load_Details)+"</a></div><br>\n";
	viewTab += "	</td>\n";
	viewTab += "</tr>\n";

	viewTab += displayInfo();
	viewTab += " \n"; 

	viewTab += " <tr>\n";
	viewTab += " 	<td align=\"left\">\n";
    viewTab += "      <div id=\"helparea\" > \n";
	viewTab += "       	<form name=\"viewTab\" id=\"viewTab\">\n";
	viewTab += "             <table width=\"100%\">\n";
	viewTab += "                	<tr>\n";
	viewTab += "						<td width=\"50%\">\n";
	viewTab += "							<table>\n";
	viewTab += "								<tr>\n";
	viewTab += "                   				<td class=\"infotextheading\">\n";
	viewTab += ml(t__Compartment)+":\n";
	viewTab += "                   				</td>\n";
	viewTab += "                   				<td class=\"infotext\">\n";
	viewTab += "										" +cmptID ;
	viewTab += "                   				</td>\n";
	viewTab += "                				</tr>\n";
	viewTab += "                				<tr>\n";
	viewTab += "                   				<td class=\"infotextheading\">\n";
	viewTab += ml(t__Product_Code)+":\n";
	viewTab += "                   				</td>\n";
	viewTab += "                   				<td class=\"infotext\">\n";
	viewTab += "										" +load_details_tab[cmptID][1] ;
	viewTab += "                     			    </td>\n";
	viewTab += "                 			    </tr>\n";
	viewTab += "                				<tr>\n";
	viewTab += "                   				<td class=\"infotextheading\">\n";
	viewTab += ml(t__Product_Name)+":\n";
	viewTab += "                   				</td>\n";
	viewTab += "                   				<td class=\"infotext\">\n";
	viewTab += "										" +load_details_tab[cmptID][2];
	viewTab += "                   				</td>\n";
	viewTab += "                				</tr>\n";
	viewTab += "							</table>\n";
	viewTab += "						</td>\n";
	viewTab += "						<td width=\"50%\">\n";
	viewTab += "							<table>\n";
	viewTab += "								<tr>\n";
	viewTab += "                   				<td class=\"infotextheading\">\n";
	viewTab += ml(t__Unit)+":\n";
	viewTab += "                   				</td>\n";
	viewTab += "                   				<td class=\"infotext\">\n";
	viewTab += "										" +load_details_tab[cmptID][3];
	viewTab += "                   				</td>\n";
	viewTab += "                				</tr>\n";
	viewTab += "                				<tr>\n";
	viewTab += "                   				<td class=\"infotextheading\">\n";
	viewTab += ml(t__Quantity)+":\n";
	viewTab += "                   				</td>\n";
	viewTab += "                   				<td class=\"infotext\">\n";
	viewTab += "										" +load_details_tab[cmptID][4] ;
	viewTab += "                     			</td>\n";
	viewTab += "                 				</tr>\n";
	viewTab += "                				<tr>\n";
	viewTab += "                   				<td class=\"infotextheading\">\n";
	viewTab += ml(t__Arm)+":\n";
	viewTab += "                   				</td>\n";
	viewTab += "                   				<td class=\"infotext\">\n";
	viewTab += "										" +load_details_tab[cmptID][5] ;
	viewTab += "                   				</td>\n";
	viewTab += "                				</tr>\n";
	viewTab += "							</table>\n";
	viewTab += "						</td>\n";
	viewTab += "                	</tr>\n";
	viewTab += "         		</table>\n";
	viewTab += "        	</form>\n";
	viewTab += "          </div>\n";
	viewTab += " 		</td>\n";
	viewTab += "	</tr>\n";	


	if((viewColumns.length)> 0)
	{

		viewTab += "<tr> \n";
		viewTab += "	<td>\n ";
		viewTab += table_begin("M", 1,"");
		viewTab += "			<tbody> \n";
		viewTab += "				<tr>";

		for(var i=0; i<viewColumns.length; i++)
		{
			viewTab += "<td>"+viewColumns[i]+"<\/td>";
		}

		viewTab += "				<\/tr>";


		for(i in view_details_tab)
		{
			viewTab += "<tr class=\"row1\">\n";

			if(i>0) 
			{
				for(var j=0; j<viewColumns.length; j++)
				{
					viewTab += "<td>\n";				  
					viewTab += obs(view_details_tab[i][j]);    
					viewTab += "<\/td>\n";

				}// end loop column

			} // end if to check rows

			viewTab += "\n";
			viewTab += "<\/tr>";

		}//end loop on load sched

		viewTab += "<\/tbody>";
		viewTab += "<\/table>";

		viewTab += "<\/td>";	
		viewTab += "<\/tr>";

	} // end if to check column

	return viewTab;
}



function displayInfo()
{
	var infoPage ="";

//	infoPage += " <tr>\n";
//	infoPage += " 	<td align=\"left\">\n";

	infoPage += fieldst_HTML(ml(t__Trip_Details));
	infoPage += "       	<form name=\"infoPage\" id=\"infoPage\">\n";
	infoPage += "       	<div class=\"adminform\">\n";
	infoPage += "             <table width=\"100%\">\n";
	infoPage += "                	<tr>\n";
	infoPage += "						<td width=\"50%\">\n";
	infoPage += "							<table>\n";
	infoPage += "								<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Trip)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" +tripno;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Tanker)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" +tanker;
	infoPage += "                   				</td>\n";
	infoPage += "                 			</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Date)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" +date ;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Time)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" +time;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "							</table>\n";
	infoPage += "						</td>\n";
	infoPage += "						<td width=\"50%\">\n";
	infoPage += "							<table>\n";
	infoPage += "								<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Supplier)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" +suppNm;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Drawer)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" +drawerNm;
	infoPage += "                     			</td>\n";
	infoPage += "                 			</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Loader)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" +loader;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Terminal)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" +termNm;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "							</table>\n";
	infoPage += "						</td>\n";
	infoPage += "                	</tr>\n";
	infoPage += "         	</table>\n";
	infoPage += "            </div>\n"; 
	infoPage += "        	</form>\n";
	infoPage += fieldstFoot_HTML();

//	infoPage += " 	</td>\n";
//	infoPage += "	</tr>\n";
	return infoPage;  	

}

function nextPage()
{
	var next = "";
	next += "<tr>\n";
	next +=	"	<td align=\"center\">\n";

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

	if(pagesTotal == 0 || pg < 1)
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
	button += "		<div class=\"button\">\n";
	button += "			<a href=\"load_scheds.cgi?tankTerm="+tankTerm+"&supp="+supp+"&pg="+pg+" \">"+ml(t__Back_to_Load_Schedules_Page)+"</a>\n";
	button += "		</div><br>\n";
	button += " </td>\n";
	button += "</tr>\n";

	return button;
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
	if (op <= 15 || op > 30)
	{
		pageHeading +=ml(t__ENTER_LOAD_DETAILS);
	}
	else if(op == 16)
	{
		pageHeading +=ml(t__VIEW);
	}


	return pageHeading;   
}

function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;
	if (op <= 15 || op > 30)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Enter_Load_Details_Page);

	}
	else if (op == 16)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__View_Load_Details_Page);

	}


	return pageTitle;
}


/* define function op_list() */
function op_list(priv,flag)
{
	/* priv = 
	   6 modify	op=1,2,3
	   7 add		op=4
	   8 delete	op=5
	 */
	var op_list ="";
	//  if ( flag == 0 ) {
	//    op_list +="<select name=op disabled onchange=\"submit();\">          ";
	//  } else {
	op_list +="<select name=op onchange=\"submit();\">          ";
	//  }

	switch (priv)
	{
		case 8:								/* Delete */

		case 7:								/* Add */

		case 6:								/* Modify */
		case 5:								/* Display */
			op_list +="<option value=16>"+ml(t__VIEW)+"</option>";
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
	newPage +="</script>\n";
	newPage += "</head>\n";
	newPage += "<body>\n";
	return (newPage);
}


