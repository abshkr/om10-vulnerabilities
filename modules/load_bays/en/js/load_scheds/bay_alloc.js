var mints_to_expire= parseInt(parseFloat(hrs_to_expire)*60);
var t__Trip_No = ["Trip No","提单号"];
var t__Per_Match = ["% Match","% 符合程度"];
var t__Num_Of_Ld_Cycles = ["Load Cycles","鹤管仓位切换次数"];
var t__Time_To_Ld = ["Loading Time","提油时间"];
var t__Bay_Queue_Time = ["Queue Time(minutes)","排队时间(分钟)"];
var t__Tot_Num_Trips = ["Total Trips","总提单数"];
var t__Tot_Num_Trips_Loaded = ["Trips Loaded(24 hours)","总提单数(24 小时)"];
var t__Trip_Expiry = ["Loadable","可提油的"];
var t__BAY_DET = ["Bay Queue Data","发油台排队数据"];
var t__Bay_det_Page = ["Bay Queue Data Page","发油台排队数据页"];

var myColumns = [ ml(t__Trip_No), ml(t__Per_Match),ml(t__Num_Of_Ld_Cycles), ml(t__Time_To_Ld)];
var trip_load_time_pos = 3;
var trip_expir_pos = 4;
var bays_per_row = 4;
var trips_per_bay = 10;
//only needs to add the expiry date column if the site has set the expiry hours.	
if(!(hrs_to_expire===undefined) && parseFloat(hrs_to_expire)>0)//only when expiry date is required
{
	myColumns.push(ml(t__Trip_Expiry))
}
		
    
	
/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
  var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[23]= "Successfully Inserted A New Record !"; // insert a new  sub equip Type
    l_opInf[27]= "Successfully Inserted A New Record !"; // insert a new  Tank Group
    l_opInf[33]= "Insert new record Failed!";
    l_opInf[24]= "Tank Selection Successfully Updated!";
    l_opInf[25]= "Successfully Deleted!";
    l_opInf[35]= "Deleted Failed!";
    l_opInf[37]= "Insert new record Failed!";
    l_opInf[28]= "Successfully Deleted!";
    l_opInf[38]= "Deleted Failed!";
    l_opInf[133]= "DB Insert Failed!";
    l_opInf[135]= "DB Delete Failed!";
    l_opInf[138]= "DB Delete Failed!";    
    
var ops_req_print = [-1,0,1,23,27,33,37,24,25,35,28,38,91101,91104,91105,91106,91107,91107];
var ops_req_search = [-1,0,1,23,27,33,37,24,25,35,28,38, 91101,91104,91105,91106,91107,91107];
var items_per_page = 10;


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

	//start after the global form
	// if OP is <=1 OR Higher than available options should always come to this view

	if (curViewDetailState <= 1 || curViewDetailState==37 || curViewDetailState==27 ||  curViewDetailState==28) // view records of tank groups
	{
		//only check this if there are more than 0 bays		
		if(bay_det_jstab.length>1)
		{
			newPage +=displayStatusMsg (op);      
			newPage += "<tr> \n";
			newPage += "<td>\n ";
			//another table to have the rows for the bays
			newPage += "<table border=\"0\" width=\"100%\" height=\"100%\">\n";
			newPage += "<tbody>\n";  
			//first calculate how many rows in the table
			var how_man_rows = parseInt(bay_det_jstab.length/bays_per_row);
			if (parseInt(bay_det_jstab.length%bays_per_row)>0) how_man_rows++;


			for(var i=0; i<how_man_rows; i++)
			{
				newPage += "<tr> \n";



				var j_start = parseInt( (bays_per_row*i)+1);
				var j_end = ( bay_det_jstab.length - (bay_det_jstab.length - ((i+1)*bays_per_row) ) );
				if  (j_end >= bay_det_jstab.length) j_end = bay_det_jstab.length-1;

				//alert("j was reached to " + j+"and length of array is "+bay_det_jstab.length);
				//alert("j will start " +j_start+" and J will go up to "+j_end);
				for(var j=j_start; j<=j_end; j++)
				{
					newPage += "<td v>\n ";
					newPage += "<table border=\"0\" width=\"100%\" height=\"100%\">\n";
					newPage += "<tbody>\n";
					newPage += "<tr> \n";
					newPage += "<td>\n ";

					//alert("value of j now is " +j);

					//alert("and bay is "+obs(bay_det_jstab[j][0]));
					newPage += " <tr valign=\"top\">\n";
					newPage += "   <td align=\"left\">\n";
					//Commented out by Abdul not required by new interface
					//fieldst_HTML +="     <fieldset>\n";
					//fieldst_HTML +="       <legend class=\"infotext\"><strong>"+attr+"</strong></legend>\n";
					newPage += " <ul id=\"tabmenu\">\n";
					newPage += "<li>" + (obs(bay_det_jstab[j][0]))+ "</li>\n";
					newPage += "<br><li> <span style=\"font-weight:bold; color: wheat;\">" + (ml(t__Tot_Num_Trips_Loaded))+ ": "+ (obs(bay_det_jstab[j][2]))+" <\/span> </li>\n";
					newPage += "</ul>\n";
					newPage += infoTableHdr_HTML();
					newPage += infoTable_HTML(curColumnToSort, obs(bay_det_jstab[j][0]));
					newPage += "</tbody>\n"
						newPage += "</table>\n";




					newPage += "<\/td>";
					newPage += "<\/tr>";
					newPage += "</tbody>\n";
					newPage += "</table>\n";

					newPage += "<\/td>";
				}




				newPage += "<\/tr>"; 
			}


			//ending table to have the bay rows
			newPage += "<\/tbody>";
			newPage += "<\/table>";


			newPage += "<\/tbody>";
			newPage += "<\/table>";
			newPage += "<\/div>";
			newPage += "<\/td>";	
			newPage += "<\/tr>"; 
			if ( pg == -1) pg = 1;
		}



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
	if (typeof writeBack != 'undefined')writeBack();


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
function op_field (attr)
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"op\" id=\"op\" value=\""+attr+"\" type=\"hidden\">\n";
	return fieldHTML;
}
function preqstr_field ()
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"preqstr\" id=\"preqstr\" value=\"\" type=\"hidden\">\n";
	return fieldHTML;
}
function trmnl_field(attr)
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"trmnl\" id=\"trmnl\" value=\""+trmnl+"\" "+attr+" >\n";
	return fieldHTML;
}


function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;
	pageHeading +=ml(t__BAY_DET);

	return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;
	pageTitle += ml(t__Bay_det_Page);

	return pageTitle;
}


/* define function op_list() */
function tkgetPreSelectedTk(myobject, frmNum)
{
	var tkPre_selecte="";
	var founSelec = false;
	if(tks_jsArr.length>1)
	{
		for(var i=1; i<tks_jsArr.length; i++)
		{
			if(1 == tks_jsArr[i][2] )
			{
				tkPre_selecte +=tks_jsArr[i][0];
				founSelec = true;

			}
		}
	}
	//alert(tkPre_selecte);
	//alert("here it is"+eval("document.select_active_"+frmNum+".tkOldActive.value;"));

	if(founSelec) // if Selection Found
	{
		eval("document.select_active_"+frmNum+".tkOldActive.value=tkPre_selecte;");
		//alert("here it is inside if"+eval("document.select_active_"+frmNum+".tkOldActive.value;"));

	}

	eval("document.select_active_"+frmNum+".submit();");
	return true;


}
/* define infoTableHdr_HTML() 
 * responsible for printing the HTML Table
 * heading for the information table  
 */
function infoTableHdr_HTML()
{
	var newPage ="";
	if( ((myColumns.length)> 0))
	{

		newPage += table_begin("M", 1,"");
		newPage += "<tbody> \n";
		newPage += "<tr>";
		for(var i=0; i<myColumns.length; i++)
		{
			newPage += "<td>"+myColumns[i]+"<\/td>";


		}
		newPage += "<\/tr>";
	}
	return (newPage);
}
/* define infoTable_HTML() 
 * responsible for printing the HTML Table
 * to display the records on this page  
 */
function infoTable_HTML(curColumnToSort, bay_code)
{
	var newPage ="";
	var indent = 1;
	for(i in bay_queu_det_jstab[bay_code])
	{
		if(i>0 && i<trips_per_bay)
		{
			newPage += "<tr class=\"row1\">\n";
			var howmanyDone =0;
			for(var j=0; j<myColumns.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					newPage += "<td style=\"background-color:#EEEEEE\">" + obs(bay_queu_det_jstab[bay_code][i][howmanyDone]) + "<\/td>";
				} 
				else 
				{
					newPage += makespace("\t", indent+2) + "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						newPage += makespace("\t", indent+3) + "<span style=\"COLOR: #FF0000;\">"+obs(bay_queu_det_jstab[bay_code][i][howmanyDone])+ "</span>";

					}
					else 
						if ( (howmanyDone==trip_expir_pos) && (!(hrs_to_expire===undefined)) )
						{
							if (obs(bay_queu_det_jstab[bay_code][i][howmanyDone]) == '0')
							{ // XXX
								newPage += makespace("\t", indent+3) + "<center><img src=\"/images/check_mark_blue.gif\" alt=\"Yes\" title=\"Yes\"></center>";
							}
							else
							{
								newPage += makespace("\t", indent+3) + "<center><img src=\"/images/cross_mark_red.jpg\" alt=\"No\" title=\"No\"></center>";
							}
						}
						else
						{

							newPage += makespace("\t", indent+3) + obs(bay_queu_det_jstab[bay_code][i][howmanyDone]);
						}

					newPage += makespace("\t", indent+2) + "</td>\n";
				}
				howmanyDone++;	
			} // end of inner for loop


		}
		newPage += "\n";
		newPage += "<\/tr>";

	}
	if(howmanyDone>0) newPage +=calc_total_qeueu_tim(bay_code);
	return (newPage);
}

function calc_total_qeueu_tim(bay_code)
{
	var indent = 1;
	var newPage ="";
	//this colum span is to keep the totalizer row
	//cells count align with the rest of the table
	var mycolSpan = 2;
	if (!(hrs_to_expire===undefined)) mycolSpan = 3;
	var total_minutes = 0;
	var how_many = 0;
	for(i in bay_queu_det_jstab[bay_code])
	{
		if(i>0)
		{

			if (parseFloat(bay_queu_det_jstab[bay_code][i][trip_load_time_pos])>0 )
			{
				total_minutes += parseFloat(bay_queu_det_jstab[bay_code][i][trip_load_time_pos]);
			}
			how_many++;
		}

	}
	newPage += "<tr class=\"row1\">\n";
	newPage += makespace("\t", indent+2) + "<td colspan=\"2\" style=\"font-weight:bold\">"+ ml(t__Tot_Num_Trips);
	newPage +=  ":<span style=\"margin-left: 20px; font-weight:normal\">"+how_many+"<\/span>\n";
	newPage += makespace("\t", indent+2) + "</td>\n";

	//2nd cell
	newPage += makespace("\t", indent+2) + "<td colspan=\""+mycolSpan+"\" style=\"font-weight:bold\">"+ ml(t__Bay_Queue_Time);
	newPage +=  ":<span style=\"margin-left: 25px; font-weight:normal\">"+(total_minutes).toFixed(2)+"<\/span>\n";
	newPage += makespace("\t", indent+2) + "</td>\n";
	newPage += "<\/tr>";
	return (newPage);
}
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage)
{
	newPage +="<script>\n";
	newPage +="/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
	newPage +="[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
	newPage +="'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
	newPage +="function submitAction(myobject,accNum, frmNum)\n";
	newPage +="{\n";
	newPage +="	   var myCurQstring=produceQString();\n";
	newPage +=    "var myselectedvalue = myobject.options[myobject.selectedIndex].value;";
	newPage +="   if(myselectedvalue==\"18\")\n";
	newPage += "  {\n";
	newPage +="     if(confirm('Are you sure you want to delete?'))\n";
	newPage += "    {\n";
	newPage += "      eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "      return true;\n";
	newPage += "    }\n";
	newPage += "    else\n";
	newPage += "    {\n";
	newPage += "      eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
	newPage += "    }\n";


	newPage +="   }\n";
	newPage +="   else if(myselectedvalue==\"15\")\n";
	newPage += "  {\n";
	newPage +="     if(confirm('Are you sure you want to delete?'))\n";
	newPage += "    {\n";
	newPage += "      eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "      return true;\n";
	newPage += "    }\n";
	newPage += "    else\n";
	newPage += "    {\n";
	newPage += "      eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
	newPage += "    }\n";  
	newPage +="   }\n";
	newPage +="   else\n";
	newPage += "  {\n";
	newPage += "    eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "    return true;\n";
	newPage +="   }\n";

	newPage +="}\n";
	newPage +="</script>\n";
	newPage +="\n";
	newPage +="</head>\n";
	newPage +="\n";
	newPage +="<body>\n";

	newPage +="\n";
	newPage +="\n";
	return (newPage);
}
