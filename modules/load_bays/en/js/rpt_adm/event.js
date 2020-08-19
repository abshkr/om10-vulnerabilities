// days dropdown list in search from
var t__SRCH_Keys_last_days = 	["Search For Last Day (s)", "时段选择" ];
var days_jslist = [ [ "-1", ""], ["10","0 - 10"], ["20","10 - 20"], ["30","20 - 30"], ["40","30 - 40"], ["50","40 - 50"], ["60","50 - 60"]];

// event_cat dropdown list in search from
var t__SRCH_Event_Cat = 	["Event Category", "事件类型" ];
var t__LLES_FAKM =				["RDI Stop Button Event","发油机暂停按钮事件"];
var t__LLES =					["RDI Stop Button Event: Key Lock","发油机暂停按钮事件：身份按钮锁定"];
var t__FAKM =					["RDI Stop Button Event: Key Unlock","发油机暂停按钮事件：身份按钮解锁"];
var t__LCWQ =					["Schedule/Load Quantity Error Event","提油和开单数量误差事件"];
var event_cat_jslist = [ [ "-1", ""], [ "LLES_FAKM", ml(t__LLES_FAKM) ], [ "LLES", ml(t__LLES) ], [ "FAKM", ml(t__FAKM) ], [ "LCWQ", ml(t__LCWQ) ]];

var event_colors = new Array();
event_colors["LLES"] = "#FF0000";
event_colors["FAKM"] = "#008800";
event_colors["LCWQ"] = "#0000FF";

var t__Your_Action = 			[ "Your Action","请选择"];
var t__Bay = 					[ "Bay","发油台"];
var t__Trip_No = 				["Trip No","提单号"];
var t__Transaction = 			["Transaction","交易"];
var t__Person = 				["Personnel","人员"];
var t__Msg = 					[ "Message","信息"];
var t__Date_Time = 				[ "Date/Time","日期/时间"];
var t__Your_Action =			["YOUR ACTION", "请选择"];
var t__Enter =					["Enter", "Enter"];
var t__Modify_Key =				["Modify Key","身份按钮修改"];
var t__pgHead_Id_Assign =  		["Event Reporting","事件报表管理"];
var t__frmDetails =				["Search Form", "查找表格"];
var t__Issuer =					["Issuer", "发行单位"];
var t__Key_Type=				["Assignment Type", "身份按钮类型"];
var t__Tag_Id=					["Tag ID", "身份按钮ID"];
var t__Key_Lock=				["Key Lock", "密钥锁定"];
var t__Search_ID = 				["Search by ID", "通过编号查找"];
var t__Key_Text=				["Key Text", "密钥文本"];
var t__Search_Tanker = 			["Tanker", "车号"];
var t__Select = 				["Select", "请选择" ];
var t__Start_date = 			["Start Date", "开始日期"];
var t__Key_Updated =			["Modified Key","身份按钮已修改"];
var t__RDI_Stop_Buttn =			["RDI Stop Button","发油机暂停按钮"];
var t__End_date =				["End Date","结束日期 / 时间"];

var myColumns = [ ml(t__Date_Time), ml(t__Msg), ml(t__Your_Action) ];



if(parseInt(days)=='-1') days=10;

var dateFormat = "yyyy-MM-dd";	
var opValues = new Array();
opValues["init"] = 1;
var l_opInf= new Array()
for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
if ( 'cn' == js_lang)
{
	l_opInf[18]= "成功删除！";
	
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
l_opInf[26]= g_opInf[26]; // Success Updated
l_opInf[33]= g_opInf[37]; //Insert New Record Failed!";
l_opInf[35]= g_opInf[37]; //Insert New Record Failed!";
l_opInf[37]= g_opInf[37]; //"Insert New Record Failed!";
l_opInf[34]= g_opInf[38]; //Deleted Failed
l_opInf[133]= g_opInf[136]; //"DB Update Failed!";
l_opInf[135]= g_opInf[136]; //"DB Update Failed!";
l_opInf[136]= g_opInf[136]; //"DB Update Failed!";
l_opInf[137]= g_opInf[137];//"DB Insert Failed!";
l_opInf[134]= g_opInf[138]; //"DB Delete Failed!";
/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    		
var ops_req_print = [-1, 1,26,28,38,48,36,27,37,47];
var ops_req_search = [-1, 1,26,28,38,48,36,27,37,47];// search never required on this page		

/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	  FUNCTION [ renderPage] 
	  [PURPOSE]  		-> 	Always call this function from 
	  Pro C Java Script output
	  Depending upon the Opration selected 
	  and privlages.


	  [Parameter]  	-> cRec integer current record index to be modified NOT IN USE
	  -> cCol integer USED FOR CURRENT COLUM sort NOT IN USE
	  -> cState integer DECIDES what to display on the screen
	  -> cPageState LOADED OR NOTLOADED, from PROC its always 
	  LOADED but use LOADED when DHTML loads the
	  page without interacting with the server used for stock management
	  unit conversion functions.
	  [AUTHOR]  		-> Abdul Shakoor (DKI) Sept 1, 2005
 '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
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
	
  var newPage = "";
  var pageTitle="";
  var pageHeading="";
  
  //printHdr function of comm_HTML.js file responsible for 
  //generating all the HTML for the current page
  newPage += printHdr(newPage,updatePageTitle(curViewDetailState,pageTitle), lang);
  //local_HeadrHTML function is local function give 
  // the ability to append any thing to the current page
  newPage += local_HeadrHTML(newPage, lang);
  //getToolBar_HTML function of comm_HTML.js file responsible for  
  // outputting the tool bar
  //controls the search and print buttons as well
  newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
  newPage +="<tr>\n";  
  newPage +="<td width=\"100%\">             \n";
  newPage +="<div class=\"content\" id=\"content\">\n";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";  

	// if OP is <=1 OR Higher than available options should always come to this view
	if (curViewDetailState <= opValues["init"] || curViewDetailState >=15 )
	{
		var myreal_startDate=startDate;
		newPage +=displayStatusMsg (op);  
		newPage += findForm();
    
    	//Display all RDI Stop Button releated Stuff		
		newPage += "<tr> \n";		
		newPage += "<td>\n "; 
    
		if( ((myColumns.length)> 0))
		{
			newPage += table_begin("M", 0,"");
			newPage += "<tbody> \n";
			newPage += "<tr>";
			for(var i=0; i<myColumns.length; i++)
			{
				newPage += "<td>"+myColumns[i]+"<\/td>";             
			}
			newPage += "<\/tr>";
		}
		newPage +=displayDataTable(curPrivilage, event_tab, curColumnToSort, true );
		newPage += "</tr> \n";		

		newPage += "</table>\n";
		newPage += "</td>\n";	
		newPage += "</tr> \n";
		//newPage +=displayDataTable(curPrivilage,approved_jsArr, curColumnToSort, false);
			


		newPage += "<\/tbody>";
		newPage += "<\/table>";
		newPage += "<\/div>";
		newPage += "<\/td>";	
		newPage += "<\/tr>";

	}

	if ( parseInt(pg) > 0 && parseInt(pagesTotal) > 1 )
		{
			newPage +=nextPage_longStr(pagesTotal, pg, "pg",'op', op,'days', days,'endDate', endDate, 'startDate',startDate,'frm_event_cat',frm_event_cat,'statusBar','');
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
/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	  FUNCTION [assArray_keys] 
	  [PURPOSE]  		-> 	Return Keys for the Hash table (Associative Array)  array  .


	  [Parameter]  	-> inputArr Input array requires the keys for
	  [Return]  	-> keys an array contain keys for the input array

	  [AUTHOR]  		-> Abdul Shakoor (DKI) Sept 2, 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
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
		
function closeBtn_HTML ()
{
	var btn_HTML = "";
	btn_HTML +="<tr> \n";
	btn_HTML +="<td align=\"center\">\n ";
	btn_HTML +="<div class=\"button\">\n";
	btn_HTML +="<a href=\"#\" class=\"popupLink\" onClick=\"window.close();\">"+otherText["close_window"]+"</a>\n";

	btn_HTML +="</div><br>\n";
	btn_HTML +="<td>\n ";
	btn_HTML +="</tr> \n";
	return btn_HTML;
}

function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;
	pageHeading += ml(t__pgHead_Id_Assign);
	return pageHeading;   
}
function updatePageTitle(op,pgTit)
{

	var pageTitle = pgTit;
	pageTitle +=ml(t__pgHead_Id_Assign);
	return pageTitle;
}

/* define function op_list() */
function op_list(priv, frmNum)
{
	/* priv = 
	   6 modify	op=1,2,3
	   7 add		op=4
	   8 delete	op=5
	 */

	var op_list ="";
	op_list +="<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+frmNum+"');\">          ";
	switch (priv)
	{
		case 8:
			

		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */


		case 6:    /* Modify not required for This page  */

		case 5:			/* Find Has not been implemented yet*/
			op_list +="<option value=\"16\">"+otherText["re_approve"]+"</option>";
			//profile not implemented for the China Project
			//op_list +="<option value=\""+opValues["prfile"]+"\">"+otherText["prfile"]+"</option>";
			break;
	}

	op_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
	op_list +="</select>                                        ";
	return op_list ;
}	

function showinPagePopup(whichObject, whichPopup, whichFile)
{
	var myPopUpObject;
	myPopUpObject = whichObject;
	myPopUpObject.setUrl(whichFile);
	myPopUpObject.showPopup(whichPopup);
}
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage,lang)
{
	newPage +="<SCRIPT src=\"/"+lang+"/js/CalendarPopup.js\"></SCRIPT>\n";
    newPage +="<script>\n";
    newPage +="	var cal = new CalendarPopup();\n";
    newPage +="	cal.showYearNavigation();\n";
	newPage +="function submitmyFindform(myobject)\n";
	newPage +="{\n";
	newPage +="	return Validator.Validate(myobject,1);\n";
	newPage +="}\n";
	newPage +="function showHideCalImages(isVisible)\n";
	newPage +="{\n";
	newPage +="	if(isVisible)\n";
	newPage +="	{\n";	
	newPage +="		document.getElementById('date_anchor1').style.display = '';\n";
	newPage +="		document.getElementById('date_anchor2').style.display = '';\n";
	newPage +="		document.getElementById('cancel_date_anchor1').style.display = '';\n";
	newPage +="		document.getElementById('cancel_date_anchor2').style.display = '';\n";
	newPage +="		document.getElementById('days').disabled = true;\n";
	newPage +="	}\n";
	newPage +="	else\n";
	newPage +="	{\n";	
	newPage +="		document.getElementById('date_anchor1').style.display = 'none';\n";
	newPage +="		document.getElementById('date_anchor2').style.display = 'none';\n";
	newPage +="		document.getElementById('cancel_date_anchor1').style.display = 'none';\n";
	newPage +="		document.getElementById('cancel_date_anchor2').style.display = 'none';\n";
	newPage +="	}\n";		
	newPage +="}\n";	
	newPage +="</script>\n";
	newPage +="</head>\n";	
	newPage +="\n";
	newPage +="<body>\n"; //try to hide calendar selection
	
	newPage +="\n";  
	return (newPage);

}
	
	
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function displayDataTable(curPrivilage, inPutArray, curColumnToSort, isFailed)
{
	var newPage="";
	var names;
	var names_start=7;
	var values_start=4;
	var names_action=2;
	var names_notes=3;
	var names_link=4;
	var names_paranum=5;
	var names_paradata=6;


	for(i in inPutArray)
	{
		
		if(i>0)
		{
			// get the names for this event
			names = names_jslist[0];
			for ( k in names_jslist )
			{
				if (inPutArray[i][1] == names_jslist[k][0])
				{
					names = names_jslist[k];
					break;
				}
			}

			newPage += "<tr class=\"row1\">\n";
			var howmanyDone =0;
			for(var j=1; j<inPutArray[i].length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					newPage += "<td style=\"background-color:#EEEEEE\">" + obs(inPutArray[i][howmanyDone]) + "<\/td>";
				} 
				else 
				{

					if(j==2) // means dispaly date and time
					{
						newPage += "<td>\n";
						newPage +="       <table border=\"0\">\n";
						newPage +="	       <tr>\n";
						newPage +="          <td width=\"100%\"> <span style=\"COLOR: #FF0000;\">"+(inPutArray[i][j])+" "+inPutArray[i][j+1]+"</span>\n";						
						newPage +="          </td>\n";
						newPage +="	       </tr>\n";
						newPage +="	      </table>\n";
						newPage += "<\/td>\n";
						
					}
					else
					{	
						if ( j ==values_start )
						{
							newPage += "<td>\n";
							newPage += "<span style=\"COLOR: " + event_colors[ inPutArray[i][1] ] +  "; font-weight:bold;\">"+names[names_notes]+"<\/span> - <br>";
						}
						if ( j>=values_start )
						{
							if ( names[names_start+(j-values_start)] != "" && inPutArray[i][j] != "" )
							{
								newPage += "<span style=\"COLOR: #000000; font-weight:bold;\">"+names[names_start+(j-values_start)]+"<\/span>:" + (inPutArray[i][j])+" ";
							}
						}
						if ( j ==values_start+15 )
						{
							newPage += "<\/td>\n";
						}
						
					}
					
					


				}
				howmanyDone++;	
			} // end of inner for loop

			newPage += "<td>\n"; //Your Action comes here

			newPage +=" <script>\n";
			newPage +="var testpopup"+i+" = new PopupWindow();\n";
			newPage +="testpopup"+i+".setSize(800,600);\n";
			newPage +="testpopup"+i+".setWindowProperties('toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised,dependent,titlebar=no');\n";
			newPage +="testpopup"+i+".autoHide();\n";
			newPage +=" <\/script>\n";

			// work out button action dynamically based on DB data
			if ( names[names_action] != "" && names[names_link] != "")
			{
				var link_data = names[names_paradata];
				var myTokens = link_data.split("_");

				var hyperlink = names[names_link];
				for ( pnum=0; pnum<names[names_paranum]; pnum++)
				{
					var src_str = ("_"+myTokens[pnum]);
					hyperlink = hyperlink.replace(src_str, inPutArray[i][values_start+parseInt(myTokens[pnum])-1] );
				}

				newPage += "<button style=\"width: 14.5em; height: 2.2em; FONT-SIZE: 1.0em; FONT-WEIGHT: bold;\" onClick=\"showinPagePopup(testpopup"+i+", 'anchor', '"+ hyperlink + "');return false;\" NAME=\"anchor\" ID=\"anchor\"/>";
				newPage += names[names_action]+"\n";
				newPage += "</button>\n";
			}
			else
			{
				newPage += "&nbsp;";
			}
/*
			if ( inPutArray[i][1] == "LLES" || inPutArray[i][1] == "FAKM" )
			{
				if(inPutArray[i][12]!="" && inPutArray[i][10]!="")
				{
					newPage += "<button style=\"width: 14.5em; height: 2.2em; FONT-SIZE: 1.0em; FONT-WEIGHT: bold;\" onClick=\"showinPagePopup(testpopup"+i+", 'anchor', '../access_ctrl/id_assignment.cgi?issuerCd="+inPutArray[i][10]+"&key_typ_id="+inPutArray[i][13]+"&op="+500+"&selKeyCo="+inPutArray[i][10]+"&selKeyNo="+inPutArray[i][12]+"');return false;\" NAME=\"anchor\" ID=\"anchor\"/>";
					newPage += names[names_action]+"\n";
					newPage += "</button>\n";
				}
			}
			else
			{
				;
			}
*/
			newPage += "<\/td>";
		}
		
		
		newPage += "\n";
		newPage += "<\/tr>";
	}

	return newPage;

}

function findForm()
{
	var daysChecked="";
	var datesChecked="";
	
	if (startDate == '-1' ||startDate == '')
	{
		//alert(mystartyear+"-"+mystartmonth+"-"+mystartday);
		startDate = makeStartDate(days);
		//alert("The startDate "+startDate);
	}

	if (endDate == '-1' ||endDate == '')
	{
		
		endDate = getEndDate();
		//alert("The endDate "+endDate);
	}

	if ( frm_event_cat == '-1' || frm_event_cat == '' )
	{
		frm_event_cat = 'LLES_FAKM';
	}

  var findFrm = "";
  findFrm += fieldst_HTML(ml(t__frmDetails));
  findFrm += "<form name=\"findFrm\" method=\"POST\" id=\"findFrm\" onsubmit=\"return submitmyFindform(this);\">\n";
  findFrm += "<div class=\"adminform\">\n";
  findFrm += "<table width=\"100%\">\n";
  findFrm += "<tr>\n";
  findFrm += "<td width=\"100%\">\n";
  findFrm += "<table width=\"100%\">\n";
  
  findFrm += "<tr>\n";

  findFrm += "<td colspan=\"1\" width=\"50%\">\n";
  findFrm += "<table>\n";  
  findFrm += "<tr>\n";
  findFrm += "<td class=\"infotextheading\" width=\"160\">\n";
  findFrm += ml(t__SRCH_Keys_last_days)+" :\n";
  findFrm += "</td>\n";
  findFrm += "<td>\n";
  findFrm += "<select id=\"days\" name=\"days\" onchange=\"return changeStartDates(this);\"> \n";
  findFrm += displayDropList(days, days_jslist, "");
  findFrm += "</td>\n";
  findFrm += "</tr>\n";
  findFrm += "</table>\n";  
  findFrm += "</td>\n";


  findFrm += "<td colspan=\"1\" width=\"50%\">\n";
  findFrm += "<table>\n";  
  findFrm += "<tr>\n";
  findFrm += "<td class=\"infotextheading\" width=\"160\">\n";
  findFrm += ml(t__SRCH_Event_Cat)+" :\n";
  findFrm += "</td>\n";
  findFrm += "<td>\n";
  findFrm += "<select id=\"frm_event_cat\" name=\"frm_event_cat\" > \n";
  findFrm += displayDropList(frm_event_cat, event_cat_jslist, "");
  findFrm += "</td>\n";
  findFrm += "</tr>\n";
  findFrm += "</table>\n";  
  findFrm += "</td>\n";

  findFrm += "</tr>\n";
  
  /*Abdul Commenting this Out 
       * Search Parameters are not required for the time being
 
		
  findFrm += "<tr>\n";
  findFrm += "<td colspan=\"2\" width=\"100%\">\n";
  findFrm += "<table>\n";  
  findFrm += "<tr>\n";
  findFrm += "<td>\n";
  findFrm += "<td class=\"infotextheading\" width=\"180\">\n";
  findFrm += ml(t__Issuer)+" :\n";
  findFrm +="</td>\n";
  findFrm +="<td width=\"5\" align=\"center class=\"infotext\">\n";
  findFrm +="<span class=\"mandatory\">*</span>\n";
  findFrm +="</td>\n";
  findFrm +="<td>\n";
  findFrm += "<select id=\"issuerCd\" name=\"issuerCd\" dataType=\"Rrequire\" msg=\""+(ml(t__Select)+" "+ml(t__Issuer))+"\"> \n";
  findFrm += displayDropList_any_All(issuerCd,  issuers_jslist,(ml(t__Select)+" "+ml(t__Issuer)), 'A');  
  findFrm +="</td>\n";
  findFrm += "</tr>\n";
  findFrm += "</table>\n";
  findFrm += "</td>\n";  
  findFrm += "</tr>\n";
  
  findFrm += "<tr>\n";
  findFrm += "<td colspan=\"2\" width=\"100%\">\n";
  findFrm += "<table>\n";  
  findFrm += "<tr>\n";
  findFrm += "<td>\n";
  findFrm += "<td class=\"infotextheading\" width=\"180\">\n";
  findFrm += ml(t__Key_Type)+" :\n";
  findFrm +="</td>\n";
  findFrm +="<td width=\"5\" align=\"center class=\"infotext\">\n";
  findFrm +="<span class=\"mandatory\">*</span>\n";
  findFrm +="</td>\n";
  findFrm +="<td>\n";
  findFrm += "<select id=\"key_typ_id\" name=\"key_typ_id\" dataType=\"Rrequire\" msg=\""+(ml(t__Select)+" "+ml(t__Key_Type))+"\"> \n";
  findFrm += displayDropList_any_All(key_typ_id,  keyType_jslist,(ml(t__Select)+" "+ml(t__Key_Type)), 'A');
  findFrm +="</td>\n";
  findFrm += "</tr>\n";
  findFrm += "</table>\n";
  findFrm += "</td>\n";  
  findFrm += "</tr>\n";
  
  findFrm += "<tr>\n";
  findFrm += "<td colspan=\"2\" width=\"100%\">\n";
  findFrm += "<table>\n";  
  findFrm += "<tr>\n";
  findFrm += "<td>\n";
  findFrm += "<td class=\"infotextheading\" width=\"180\">\n";
  findFrm += ml(t__Key_Lock)+" :\n";
  findFrm +="</td>\n";
  findFrm +="<td width=\"5\" align=\"center class=\"infotext\">\n";
  findFrm +="<span class=\"mandatory\">*</span>\n";
  findFrm +="</td>\n";
  findFrm +="<td>\n";
  findFrm += "<select id=\"selLock\" name=\"selLock\" dataType=\"Rrequire\" msg=\""+(ml(t__Select)+" "+ml(t__Key_Lock))+"\"> \n";
  findFrm += displayDropList_any_All(lock,  lock_jslist,(ml(t__Select)+" "+ml(t__Key_Lock)), 'A');
  findFrm +="</td>\n";
  findFrm += "</tr>\n";
  findFrm += "</table>\n";
  findFrm += "</td>\n";  
  findFrm += "</tr>\n";
  
  findFrm += "<tr>\n";
  findFrm += "<td colspan=\"2\" width=\"100%\">\n";
  findFrm += "<table>\n";  
  findFrm += "<tr>\n";
  findFrm += "<td width=\"20\">\n";
  findFrm += "&nbsp; \n";
  findFrm += "</td>\n";  
  findFrm += "<td>\n";
  findFrm += "<td class=\"infotextheading\" width=\"180\">\n";
  findFrm += ml(t__Search_ID)+" :\n";
  findFrm += "</td>\n";
  findFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
  findFrm += "&nbsp;\n";
  findFrm += "</td>\n";
  findFrm += "<td>\n";
  if(key_no=="-1" || key_no=="") key_no="";
  findFrm += "<input type=\"text\" id=\"key_no\" name=\"key_no\" value=\""+key_no+"\" dataType=\"Custom\" regexp=\"^[0-9]\*\\d\*$\" value=\""+key_no+"\" msg=\""+(ml(t__Enter)+" "+ml(t__Search_ID))+"\" />\ \n";
  findFrm += "</td>\n";
  findFrm += "</tr>\n";
  findFrm += "</table>\n";
  findFrm += "</td>\n";  
  findFrm += "</tr>\n";
  
  findFrm += "<tr>\n";
  findFrm += "<td colspan=\"2\" width=\"100%\">\n";
  findFrm += "<table>\n";  
  findFrm += "<tr>\n";
  findFrm += "<td width=\"20\">\n";
  findFrm += "&nbsp; \n";
  findFrm += "</td>\n";  
  findFrm += "<td>\n";
  findFrm += "<td class=\"infotextheading\" width=\"180\">\n";
  findFrm += ml(t__Key_Text)+" :\n";
  findFrm += "</td>\n";
  findFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
  findFrm += "&nbsp;\n";
  findFrm += "</td>\n";
  findFrm += "<td>\n";
  if(key_txt=="-1" || key_txt=="") key_no="";
  findFrm += "<input type=\"text\" id=\"key_no\" name=\"key_no\" value=\""+key_txt+"\" msg=\""+(ml(t__Enter)+" "+ml(t__Key_Text))+"\" />\ \n";
  findFrm += "</td>\n";
  findFrm += "</tr>\n";
  findFrm += "</table>\n";
  findFrm += "</td>\n";  
  findFrm += "</tr>\n";
  
  
  findFrm += "<tr>\n";
  findFrm += "<td colspan=\"2\" width=\"100%\">\n";
  findFrm += "<table>\n";  
  findFrm += "<tr>\n";
  findFrm += "<td width=\"20\">\n";
  findFrm += "&nbsp; \n";
  findFrm += "</td>\n";  
  findFrm += "<td>\n";
  findFrm += "<td class=\"infotextheading\" width=\"180\">\n";
  findFrm += ml(t__Search_Tanker)+" :\n";
  findFrm += "</td>\n";
  findFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
  findFrm += "&nbsp;\n";
  findFrm += "</td>\n";
  findFrm += "<td>\n";
  if(tanker=="-1" || tanker=="") key_no="";
  findFrm += "<input type=\"text\" id=\"tanker\" name=\"tanker\" value=\""+tanker+"\" msg=\""+(ml(t__Enter)+" "+ml(t__Search_Tanker))+"\" />\ \n";
  findFrm += "</td>\n";
  findFrm += "</tr>\n";
  findFrm += "</table>\n";
  findFrm += "</td>\n";  
  findFrm += "</tr>\n";
*/
  
  findFrm += "</table>\n";
  findFrm += "									</td>\n";
  findFrm += "								</tr>\n";
  findFrm += "								<tr>\n";
  findFrm += "									<td align=\"center\">\n";
  findFrm += "										<table>\n";
  findFrm += "											<tr>\n";
  findFrm += "												<td align=\"center\" width=\"50%\">\n";
  findFrm += "													\n";
  findFrm += "													<input type=\"hidden\" name=\"op\" value=\"15\" />\n";
  findFrm += "													<input type=\"hidden\" name=\"startDate\" value=\"\" />\n";
  findFrm += "													<input type=\"hidden\" name=\"endDate\" value=\"\" />\n";
  findFrm += "													<input type=\"hidden\" name=\"keyId\" id=\"keyId\" value=\"\" />\n";
  findFrm += "													<input type=\"submit\" value=\""+commText["Search"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
  findFrm += "												</td>\n";
  findFrm += "											</tr>\n";
  findFrm += "										</table>\n";
  findFrm += "									</td>\n";
  findFrm += "								</tr>\n";
  findFrm += "							</table>\n";
  findFrm+= "							</div>\n";
  findFrm += "					</form>\n";
  findFrm += fieldstFoot_HTML();
  findFrm += "		</td>\n";
  findFrm += "	</tr>\n";  
  return findFrm;  
}

function makeStartDate(howmanyDays)
{
	var startDate="";
	var mystartDate=new Date();
	mystartDate.setDate(mystartDate.getDate()-howmanyDays);
	var mystartyear = String(mystartDate.getFullYear());
	var mystartmonth = String((mystartDate.getMonth()+1)) ;
	var mystartday = String(mystartDate.getDate());
	if (mystartmonth.length==1)mystartmonth = "0"+mystartmonth;
	if (mystartday.length==1)mystartday = "0"+mystartday;

	//alert(mystartyear+"-"+mystartmonth+"-"+mystartday);
	startDate = mystartyear+"-"+mystartmonth+"-"+mystartday;
	return startDate;
}
function getEndDate()
{
	var endDate="";
	var myendDate=new Date();
	myendDate.setDate(myendDate.getDate()+1);
	var myendyear = String(myendDate.getFullYear());
	var myendmonth = String((myendDate.getMonth()+1)) ;
	var myendday = String(myendDate.getDate());
	if (myendmonth.length==1)myendmonth = "0"+myendmonth;
	if (myendday.length==1)myendday = "0"+myendday;
	endDate = myendyear+"-"+myendmonth+"-"+myendday;
	return endDate
}
function changeStartDates(myobject)
{
	var myNewStDate="";
	var homanyDays = parseInt(myobject.value);
	myNewStDate = makeStartDate(homanyDays);
	document.findFrm.startDate.value=myNewStDate;
	return true;
	
}

function resetStartEndDates(days)
{
	document.findFrm.startDate.value=makeStartDate(days);
	document.findFrm.endDate.value=getEndDate();
	
	
}

function updateDisableProp(fieldId, isDisable)
{
	
	var currElement = getElemRefs(fieldId);
	if(isDisable)
	{
	 currElement.setAttribute("dataType","");
	 currElement.selectedIndex= -1;
	 showHideCalImages(true);
	 
	}
	else
	{
		currElement.setAttribute("dataType","Require");
		currElement.selectedIndex= 0;
		resetStartEndDates(1);
		showHideCalImages(false);
	}
	currElement.disabled=isDisable;
	
	
	
}
function submitAction(myobject,frmNum)
{
	var myselectedvalue = (myobject.options[myobject.selectedIndex].value);
	//alert(myselectedvalue);
	if(myselectedvalue==16)
	{
		
		if(confirm( otherText["t__Are_you_sure_you_want_to_re_approve"] +eval("document.select_action_"+frmNum+".saleId.value;")+' ?'))
		{
			//alert(eval("document.select_action_"+frmNum+".saleId.value;"));
			document.findFrm.saleId.value=eval("document.select_action_"+frmNum+".saleId.value;");
			document.findFrm.op.value=16;
			eval("document.findFrm.submit();");
			return true;
		}
		else
		{
			eval("document.select_action_"+frmNum+".reset();");
		}
   }
  
}



