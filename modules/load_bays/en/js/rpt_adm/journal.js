var myColumns = ["Date", "Time", "Event", "Messege"];
var t__Select = ["Select", "«Î—°‘Ò" ];
var otherText = new Array()
otherText["pgHead"] =  "journal";
otherText["pgHead_find"] =  "find journal";
otherText["pgTitle"] =  "report administration";
otherText["back_toJounr"] = "Back to Journal";
otherText["start_date"] = "Start Date";
otherText["end_date"] = "End Date";
otherText["start_time"] ="Start Time";
otherText["end_time"] ="End Time";
otherText["select_date"] = "Select Date";
otherText["select_a_start_time"] = "Select a start time";
otherText["select_a_end_time"] = "Select an end time";
otherText["select_usage"] = "Select Usage";
otherText["select_msg_typ"]  = "Select A Message Type";
otherText["msg_typ"]="Message Type";
otherText["host_cmpy"] = "Host Company";
otherText["msg_type"] = "Message Type";
otherText["usage"] = "Usage";
otherText["fieldMsg_jour_search"] = "Journal Search";
otherText["fieldMsg_cmpy_msgTp_det"] = "Host Company and Message Type Details";
otherText["msg_selectg_cmpy_msgTp_det"] = "Select the Host Company and Message Type, To View Journal";
otherText["msg_valid_start"] = "Enter Start Date and Start Time earlier than End Date and End Time";
otherText["msg_valid_endDate"] = "Enter End Date and End Time later than Start Date and Start time";
otherText["msg_valid_startTime"] = "Enter Start Time and Start Date earlier than End Time and End Date"
otherText["msg_valid_endTime"] = "Enter End Time and End Date later than Start Time and Start Date";
otherText["msg_valid_pgNumber"] = "Enter Valid Page Number";
otherText["msg_tot_pages"] = "Total Pages";

otherText["msg_search_for"] = "Search For";
otherText["msg_want_search_text"] = "Want To Search Text ?";
otherText["msg_view_jnl_days"] = "View Journal For Last Day (s)";
otherText["msg_to_find_txt"] = "To Find Text in Journal Enter Start Date and End Date";
otherText["msg_strt_date_check"] ="Start Date can not be after the End Date";
otherText["msg_only_days_data"] ="You can only search 7 days data to find matching text";
otherText["msg_enter_srch_txt"] = "Enter the text you want to search for";
var items_per_page = 10;
//var days='-1';	
var jnl_days_jslist = [ [ "", ""], ["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], ["7","7"]];
if(parseInt(days)=='-1') days=1;
/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    		
		var ops_req_print = [-1,0, 1, 10, 15];
		var ops_req_search = [-1,0, 1, 10, 15];// search never required on this page
    // this is the only Usage we want to look at 
    // helps to filter the usage list		
		var printr_lookat = "3";	
		
		var dateFormat = "yyyy-MM-dd";	
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
  
    if (curViewDetailState <= 1 || curViewDetailState > 10) // view records
  {

     if(curViewDetailState != 15)
     {
		 newPage += displayGlblFrm();
	 }
	 else {
		newPage += findResultHead();
	 }
     //newPage +=addPrintBtn_HTML();
     
     if( ((myColumns.length)> 0))
     {
        newPage += "<tr> \n";
        newPage += "<td>\n ";
        newPage += "<div id=\"printReady\">\n";
        newPage += table_begin("M", 0,"");
        newPage += "<tbody> \n";
        newPage += "<tr>";
        
        for(var i=0; i<myColumns.length; i++)
        {
          newPage += "<td>"+myColumns[i]+"<\/td>";
        }
        newPage += "<\/tr>";
     

        for(i in journal_tab)
        {
           newPage += "<tr class=\"row1\">\n";
           if(i>0) 
           {
              var howmanyDone =0;
              for(var j=0; j<myColumns.length; j++)
              {
              
                     
	             newPage += "<td>\n";				  
	      	     newPage += obs(unescape(journal_tab[i][j]));
	             newPage += "<\/td>\n";
                  
               
              }
              
           } // end if to check rows
           newPage += "\n";
           newPage += "<\/tr>";
           
        }//end loop on journal_tab
        newPage += "<\/tbody>";
        newPage += "<\/table>";
        newPage += "</div>\n";
        newPage += "<\/td>";	
        newPage += "<\/tr>";
        
     } // end if to check column
     
    //     newPage += nextPage();
     if(parseInt(pg)> 0&&parseInt(pagesTotal)!=0)
      {
      	newPage +=nextPage_long(pagesTotal, pg,"journal.cgi", "pg");
    	}
      //newPage +=addPrintBtn_HTML();
     
  }// end if to check state
  else if(curViewDetailState == 5)
  {
		newPage += findForm();  
  }
  
  
  // table for everything ends here
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
  if (typeof writeBack != 'undefined')writeBack();
	
}


function findResultHead()
{
	if(type == "-1")
		type = "";
		
	var head = "";
	head += "	<tr>\n";
  	head += "		<td align=\"center\">\n";
  	head += "			<div class=\"button\">\n";
  	head += "				\n";
  	head += "				<a href=\"journal.cgi\">"+otherText["back_toJounr"]+"</a></div><br>\n";
  	head += "		</td>\n";
  	head += "	</tr>\n"; 	
  	head += "	<tr>\n";
	head += "		<td class=\"infotextheading\">\n";
	head += "			"+print_temp+" "+type+" From " + startDate + " " + startTime + " To " + endDate + " " + endTime; 
	head += " 			<br>\n";
	head += "		</td>\n";
	head += "	</tr>\n";
	head += "	<tr>\n";
	head += "		<td>\n";
	head += "       	<form name=\"glblFrm\" id=\"glblFrm\">\n";
	head += "          		<input type=\"hidden\" name=\"cmpy\" value=\""+cmpy+"\">\n";
	head += "          		<input type=\"hidden\" name=\"startDate\" value=\""+startDate+"\">\n";
	head += "          		<input type=\"hidden\" name=\"startTime\" value=\""+startTime+"\">\n";
	head += "          		<input type=\"hidden\" name=\"endDate\" value=\""+endDate+"\">\n";
	head += "          		<input type=\"hidden\" name=\"endTime\" value=\""+endTime+"\">\n";
	head += "          		<input type=\"hidden\" name=\"type\" value=\""+type+"\">\n";
	head += "          		<input type=\"hidden\" name=\"print_temp \" value=\""+print_temp+"\">\n";
	head += "          		<input type=\"hidden\" name=\"search_str\" value=\""+search_str+"\">\n";
	head += "          		<input type=\"hidden\" name=\"op\" value="+op+">\n";
	head += "          		<input type=\"hidden\" name=\"pg\" value="+pg+">\n";
	head += "			</form>\n";	
	head += "		</td>\n";
	head += " 	</tr>\n";
	
	return head;
	
}



function displayGlblFrm()
{
	var enabled ="";
	var glblFrm = "";
	if (startDate == '-1' ||startDate == '')
	{
		//alert(mystartyear+"-"+mystartmonth+"-"+mystartday);
		startDate = makeStartDate(days);
	}

	if (endDate == '-1' ||endDate == '')
	{

		endDate = getEndDate();
	}

	if(cmpy != "" || (hosts.length==2))
	{
		enabled = "";
	}
	
	glblFrm += " <tr>\n";
	glblFrm += " 		<td align=\"left\">\n";
	glblFrm += "       	<form name=\"glblFrm\" id=\"glblFrm\">\n";
	glblFrm += "          	<input type=\"hidden\" name=\"op\" value=\""+op+"\">\n";
	glblFrm += "          	<input type=\"hidden\" name=\"pg\" value=\"pg\">\n";  
	glblFrm += "          	<input type=\"hidden\" name=\"startDate\" value=\""+startDate+"\">\n";
	glblFrm += "          	<input type=\"hidden\" name=\"startTime\" value=\"00:00\">\n";  
	glblFrm += "          	<input type=\"hidden\" name=\"endDate\" value=\""+endDate+"\">\n";
	glblFrm += "          	<input type=\"hidden\" name=\"endTime\" value=\"00:00\">\n";
	glblFrm += fieldst_HTML(otherText["fieldMsg_cmpy_msgTp_det"]);
	glblFrm += "          	<div class=\"adminform\">\n";
	glblFrm += otherText["msg_selectg_cmpy_msgTp_det"]+" \n";
	glblFrm += "             		<table>\n";

	glblFrm += "                		<tr>\n";
	glblFrm += "                   		<td class=\"infotextheading\">\n";
	glblFrm += otherText["msg_view_jnl_days"]+" :\n";
	glblFrm += "                   		</td>\n";
	glblFrm += "                   		<td>\n";
	glblFrm += "                       		<select id=\"days\" name=\"days\" onchange=\"return changeStartDates(this);\"> \n";
	glblFrm += displayDropList(days, jnl_days_jslist, "");
	glblFrm += "                   		</td>\n";
	glblFrm += "                		</tr>\n";



	glblFrm += "                		<tr>\n";
	glblFrm += "                   		<td class=\"infotextheading\">\n";
	glblFrm += otherText["host_cmpy"]+" :\n";
	glblFrm += "                   		</td>\n";
	glblFrm += "                   		<td>\n";

	glblFrm += "<select id=\"cmpy\" name=\"cmpy\" onchange=\"submit();\"> \n";
        if(g.isMng=='Y'){
                 glblFrm += displayDropList_any_All(cmpy, hosts,(ml(t__Select)), 'A');
         }
         else{
                 glblFrm += displayDrop_ShowDefSelected(cmpy, hosts,ml(t__Select));
         }

	
	glblFrm += "                   		</td>\n";
	glblFrm += "                		</tr>\n";

	glblFrm += "                		<tr>\n";
	glblFrm += "                   		<td class=\"infotextheading\">\n";
	glblFrm += otherText["msg_type"]+" :\n";
	glblFrm += "                   		</td>\n";
	glblFrm += "                   		<td>\n";
	glblFrm += "                       		<select name=\"type\" id=\"type\" onchange=\"submit();\"> \n";
	glblFrm += specialDropList(type, msgType_jslst, "ALL TYPE");
	glblFrm += "                       		<input type=\"button\" value=\"view\" name=\"view\"   onclick=\"document.glblFrm.pg.value=1;document.glblFrm.op.value=0;document.glblFrm.submit();\" "+enabled+">\n";
	glblFrm += "                       		<input type=\"button\" value=\"Find\" name=\"find\" id=\"find\"  onclick=\"document.glblFrm.pg.value=1;document.glblFrm.op.value=5;document.glblFrm.submit();\" "+enabled+">\n";
	glblFrm += "                         	</td>\n";
	glblFrm += "                    	</tr>\n";

	glblFrm += "              	</table>\n";
	glblFrm += "\n";
	glblFrm += "            	</div>\n";
	glblFrm += "        	</form>\n";
	glblFrm += " 		</td>\n";
	glblFrm += "	</tr>\n";
	return glblFrm;

}



function findForm()
{
  var findFrm = "";
  findFrm += "<tr>\n";
  findFrm += "<td align=\"center\">\n";
  findFrm += "<div class=\"button\">\n";
  findFrm += "<a href=\"journal.cgi\">"+otherText["back_toJounr"]+"</a></div><br>\n";
  findFrm += "</td>\n";
  findFrm += "</tr>\n";
  findFrm += fieldst_HTML(otherText["fieldMsg_jour_search"]);
  findFrm += "<form name=\"findFrm\" method=\"post\" id=\"findFrm\" onsubmit=\"return submitmyFindform(this)\">\n";
  findFrm += " <div class=\"adminform\">\n";
  findFrm += "<table width=\"100%\">\n";
  findFrm += "<tr>\n";
  findFrm += "<td width=\"100%\">\n";
  findFrm += "<table width=\"100%\">\n";
  
  findFrm += "<tr>\n";
  findFrm += "<td width=\"50%\">\n";
  findFrm += "<table>\n";
  findFrm += "<tr>\n";
  findFrm += "<td class=\"infotextheadingtd\" width=\"130\">\n";
  findFrm += otherText["start_date"]+" :\n";
  findFrm += "</td>\n";
  findFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
  findFrm += "<span class=\"mandatory\">*</span>\n";
  findFrm += "</td>\n";
  findFrm += "<td>\n";
  findFrm += "<input type=\"text\" name=\"startDate\" dataType=\"Require\" onFocus=\"return check_strSearch(this);\" onBlur=\"return check_strSearch(this);\" msg=\""+otherText["msg_valid_start"]+"\" readonly/>\n";
  findFrm += dateURL_HTML("document.forms[0].startDate", "date_anchor1",dateFormat,otherText["select_date"]);
  findFrm += "</td>\n";
  findFrm += "</tr>\n";
  findFrm += "</table>\n";
  findFrm += "</td>\n";
  findFrm += "<td width=\"50%\">\n";
  findFrm += "<table>\n";
  findFrm += "<tr>\n";
  findFrm += "<td class=\"infotextheadingtd\" width=\"130\">\n";
  findFrm += otherText["start_time"]+" :\n";
  findFrm += "</td>\n";
  findFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
  findFrm += "<span class=\"mandatory\">*</span>\n";
  findFrm += "</td>\n";
  findFrm += "<td>\n";
  findFrm += "<select name=\"startTime\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_valid_startTime"]+"\">\n";
  findFrm += droplistTime('startTime', otherText["select_a_start_time"]);
  //findFrm += "																<input type=\"text\" name=\"startTime\" />\n";
  findFrm += "															</td>\n";
  findFrm += "														</tr>\n";
  findFrm += "													</table>\n";
  findFrm += "												</td>\n";
  findFrm += "											</tr>\n";
  findFrm += "											<tr>\n";
  findFrm += "												<td width=\"50%\">\n";
  findFrm += "													<table>\n";
  findFrm += "														<tr>\n";
  findFrm += "															<td class=\"infotextheadingtd\" width=\"130\">\n";
  findFrm += otherText["end_date"]+" :\n";
  findFrm += "															</td>\n";
  findFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
  findFrm += "																<span class=\"mandatory\">*</span>\n";
  findFrm += "															</td>\n";
  findFrm += "															<td>\n";
  findFrm += "																<input type=\"text\" name=\"endDate\" dataType=\"Require\" onafterupdate=\"return check_strSearch(this);\" msg=\""+otherText["msg_valid_endDate"]+"\" readonly />\n";
  findFrm += dateURL_HTML("document.forms[0].endDate", "date_anchor2",dateFormat,otherText["select_date"]);
  findFrm += "															</td>\n";
  findFrm += "														</tr>\n";
  findFrm += "													</table>\n";
  findFrm += "												</td>\n";
  findFrm += "												<td width=\"50%\">\n";
  findFrm += "													<table>\n";
  findFrm += "														<tr>\n";
  findFrm += "															<td class=\"infotextheadingtd\" width=\"130\">\n";
  findFrm += otherText["end_time"]+" :\n";
  findFrm += "															</td>\n";
  findFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
  findFrm += "																<span class=\"mandatory\">*</span>\n";
  findFrm += "															</td>\n";
  findFrm += "															<td>\n";
  findFrm += "																<select name=\"endTime\" class=\"smallselect\" dataType=\"CompareDateTime\" and=\"endDate\" to=\"startTime\" toand=\"startDate\" operator=\"GreaterThanEqual\" msg=\""+otherText["msg_valid_endTime"]+"\">\n";
  findFrm += droplistTime('endTime', otherText["select_a_end_time"]);
  //findFrm += "																<input type=\"text\" name=\"endTime\" />\n";
  findFrm += "															</td>\n";
  findFrm += "														</tr>\n";
  findFrm += "													</table>\n";
  findFrm += "												</td>\n";
  findFrm += "											</tr>\n";
  findFrm += "											<tr>\n";
  findFrm += "												<td width=\"50%\">\n";
  findFrm += "													<table>\n";
  findFrm += "														<tr>\n";
  findFrm += "															<td class=\"infotextheadingtd\" width=\"130\">\n";
  findFrm += otherText["usage"]+" :\n";
  findFrm += "															</td>\n";
  findFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
  findFrm += "																<span class=\"mandatory\">*</span>\n";
  findFrm += "															</td>\n";
  findFrm += "															<td>\n";
  findFrm += "                       										<select name=\"print_temp\" id=\"print_temp\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["select_usage"]+"\"> \n";
  findFrm += specialDropListColumn("", filter_usage_jslst(usage_jslst), 1, otherText["select_usage"]);
  findFrm += "															</td>\n";
  findFrm += "														</tr>\n";
  findFrm += "													</table>\n";
  findFrm += "												</td>\n";
  findFrm += "												<td width=\"50%\">\n";
  findFrm += "													<table>\n";
  findFrm += "														<tr>\n";
  findFrm += "															<td class=\"infotextheadingtd\" width=\"130\">\n";
  findFrm += otherText["msg_typ"]+" :\n";
  findFrm += "															</td>\n";
  findFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
  findFrm += "																<span class=\"mandatory\"></span>\n";
  findFrm += "															</td>\n";
  findFrm += "															<td>\n";
  findFrm += "                       										<select name=\"type\" id=\"type\" class=\"smallselect\"> \n";
  //findFrm += specialDropList(type, msgType_jslst, otherText["select_msg_typ"]);
  findFrm += specialDropList(type, msgType_jslst, "ALL TYPE");
  findFrm += "															</td>\n";
  findFrm += "														</tr>\n";
  findFrm += "													</table>\n";
  findFrm += "												</td>\n";
  findFrm += "											</tr>\n";
  findFrm += "											<tr>\n";
  findFrm += "												<td width=\"50%\">\n";
  findFrm += "													<table>\n";
  findFrm += "														<tr>\n";
  findFrm += "															<td class=\"infotextheadingtd\" width=\"130\">\n";
  findFrm += otherText["msg_want_search_text"]+" :\n";
  findFrm += "															</td>\n";
  findFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
  findFrm += "																&nbsp;\n";
  findFrm += "															</td>\n";
  findFrm += "															<td>\n";
  findFrm += "                       										<input type=\"checkbox\" id=\"checksrchtext\" name=\"checksrchtext\" onClick=\"return check_strSearch(this);\" /> \ \n";
  findFrm += "															</td>\n";
  findFrm += "														</tr>\n";
  findFrm += "													</table>\n";
  findFrm += "												</td>\n";
  findFrm += "												<td width=\"50%\">\n";
  findFrm += "													<table>\n";
  findFrm += "														<tr>\n";
  findFrm += "															<td class=\"infotextheadingtd\" width=\"130\">\n";
  findFrm += otherText["msg_search_for"]+" :\n";
  findFrm += "															</td>\n";
  findFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
  findFrm += "																&nbsp;\n";
  findFrm += "															</td>\n";
  findFrm += "															<td>\n";
  if(search_str=="-1")search_str="";
  findFrm += "                       										<input type=\"text\" id=\"search_str\" name=\"search_str\" dataType=\"\" value=\""+search_str+"\" msg=\""+otherText["msg_enter_srch_txt"]+"\" disabled=\"true\"/>\ \n";
  findFrm += "															</td>\n";
  findFrm += "														</tr>\n";
  findFrm += "													</table>\n";
  findFrm += "												</td>\n";  
  findFrm += "											</tr>\n";
  findFrm += "										</table>\n";
  findFrm += "									</td>\n";
  findFrm += "								</tr>\n";
  findFrm += "								<tr>\n";
  findFrm += "									<td align=\"center\">\n";
  findFrm += "										<table>\n";
  findFrm += "											<tr>\n";
  findFrm += "												<td align=\"center\" width=\"50%\">\n";
  findFrm += "													\n";
  findFrm += "													<input type=\"hidden\" name=\"op\" value=15 />\n";
  findFrm += "													<input type=\"hidden\" name=\"cmpy\" value=\""+cmpy+"\" />\n";
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

function nextPage()
{
	var next = "";
	next += "<tr>\n";
	next +=	"	<td align=\"center\">\n";
	if (pg < 1)
	{
		pg = 1;
	}
	
    if (pg > 1){
		next += "<a href=\"javascript:document.glblFrm.pg.value=pg-1;document.glblFrm.op.value="+op+";document.glblFrm.submit();\">Previous</a>\n";
    }
    next += "&nbsp; Current=" + pg;
    next += "/";
    next += pagesTotal;
    if (pagesTotal > pg)
    {
		next += "&nbsp; <a href=\"javascript:document.glblFrm.pg.value=pg+1;document.glblFrm.op.value="+op+";document.glblFrm.submit();\">Next</a>\n";
    }
    
    next += "	</td>\n";
    next += "</tr>\n";
    
    if(pagesTotal == 0)
	{
		next = "";
	}
    
    return next;   
}


function droplistTime(name, msg)
{
	var time="";
	time += "	<option value=\"00:00\">00:00</option>\n";
	time += "	<option value=\"01:00\">01:00</option>\n";
	time += "	<option value=\"02:00\">02:00</option>\n";
	time += "	<option value=\"03:00\">03:00</option>\n";
	time += "	<option value=\"04:00\">04:00</option>\n";
	time += "	<option value=\"05:00\">05:00</option>\n";
	time += "	<option value=\"06:00\">06:00</option>\n";
	time += "	<option value=\"07:00\">07:00</option>\n";
	time += "	<option value=\"08:00\">08:00</option>\n";
	time += "	<option value=\"09:00\">09:00</option>\n";
	time += "	<option value=\"10:00\">10:00</option>\n";
	time += "	<option value=\"11:00\">11:00</option>\n";
	time += "	<option value=\"12:00\">12:00</option>\n";
	time += "	<option value=\"13:00\">13:00</option>\n";
	time += "	<option value=\"14:00\">14:00</option>\n";
	time += "	<option value=\"15:00\">15:00</option>\n";
	time += "	<option value=\"16:00\">16:00</option>\n";
	time += "	<option value=\"17:00\">17:00</option>\n";
	time += "	<option value=\"18:00\">18:00</option>\n";
	time += "	<option value=\"19:00\">19:00</option>\n";
	time += "	<option value=\"20:00\">20:00</option>\n";
	time += "	<option value=\"21:00\">21:00</option>\n";
	time += "	<option value=\"22:00\">22:00</option>\n";
	time += "	<option value=\"23:00\">23:00</option>\n";	
	time += "</select>\n";
	
	return time;
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
  if (op <= 1 || op > 10)
  {
    pageHeading +=otherText["pgHead"];
  }
  else if(op == 5)
  {
  	pageHeading +=otherText["pgHead_find"];
  }
  
  
 
  return pageHeading;   
}

function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
  pageTitle +=otherText["pgTitle"];
  return pageTitle;
}



function nextPage_long(totalPages, curPg, curPgName, curPgVarName)
{
   	//alert("totalPages in start"+totalPages);
     // At this stage Only Know Number of Pages
  	// so get the number of items
  	var num_items = (totalPages*items_per_page);
  
  	// A Block Of Pages So User Can Jump Between the Pages
  	// on the Page it should look like this
  	//  [ 31-40  41-50  51-60]
  	var block_size = 10;
  
  	//  Current Page Number as passed by the nextPage function call
  	var page_number = curPg;
  
  	// do some mathemetical stuff
  	// in order to get the current page number and
  	// page items right
  	var num_pages = Math.max(1, Math.ceil(num_items/items_per_page));
	var page_number = Math.min(page_number, num_pages);
	var num_blocks = Math.ceil(num_pages/block_size);
	var block_number = Math.floor(((page_number-1)/block_size));
	//alert("num_pages in after Math.max"+num_pages);
	// start putting HTML string in the 
  	// nextPgHTML variable
	var nextPgHTML = "";
	
	//Only want to display the Form IF there are more than 1 pages
	// Bug Zilla BugId 1490 an enhancement demanded by Sao
	
  if(num_pages>1)
  {
  	nextPgHTML += "</td>\n ";
  	nextPgHTML += "</tr> \n";
  	//Adding a new form So Jump to the Page will be easier
  	//nextPgHTML += "<tr> \n";
  	//nextPgHTML += "<td align=\"center\">\n ";
  	nextPgHTML += "<form name=\"gotoPage\" method =\"get\" id=\"gotoPage\" action=\"journal.cgi\" onsubmit=\"return submitmyform(this)\">\n";
  	//nextPgHTML +="<table width=\"100%\">\n";
    //nextPgHTML +=infotextRow_HTML(" width=\"100%\ align=\"center\" ","Total Pages :"+num_pages); 
    nextPgHTML +="<tr>\n";
    nextPgHTML +=" <td align=\"center\" class=\"infotext\" width=\"100%\">\n";
    nextPgHTML +="<span style=\"font-weight: bold;\">"+otherText["msg_tot_pages"]+" :</span><span style=\"font-weight: bold;COLOR: #FF0000;\">"+num_pages+"</span>\n"; 
    nextPgHTML +="	  &nbsp;\n";
    nextPgHTML +=" <input type=\"text\" name=\"pg\"  id=\"pg\" maxLength=\"6\" style=\"FONT-SIZE:1.00em;\" size=\"6\" dataType=\"RangeValue\" min=\"1\" max=\""+num_pages+"\" msg=\""+otherText["msg_valid_pgNumber"]+"\"> \n";
    nextPgHTML +="	  &nbsp;\n";
    //All the Hidden Variables I need to send to the next Page.
    nextPgHTML += "          		<input type=\"hidden\" name=\"cmpy\" value=\""+cmpy+"\">\n";
  	nextPgHTML += "          		<input type=\"hidden\" name=\"startDate\" value=\""+startDate+"\">\n";
  	nextPgHTML += "          		<input type=\"hidden\" name=\"startTime\" value=\""+startTime+"\">\n";
  	nextPgHTML += "          		<input type=\"hidden\" name=\"endDate\" value=\""+endDate+"\">\n";
  	nextPgHTML += "          		<input type=\"hidden\" name=\"endTime\" value=\""+endTime+"\">\n";
	nextPgHTML += "          		<input type=\"hidden\" name=\"search_str\" value=\""+search_str+"\">\n";
        nextPgHTML += "                         <input type=\"hidden\" name=\"days\" value=\""+days+"\">\n";
  	nextPgHTML += "          		<input type=\"hidden\" name=\"type\" value=\""+type+"\">\n";
  	nextPgHTML += "          		<input type=\"hidden\" name=\"print_temp \" value=\""+print_temp+"\">\n";
  	nextPgHTML += "          		<input type=\"hidden\" name=\"op\" value="+op+">\n";
  	// End of all the hidden variables
    nextPgHTML +="	<input type=\"submit\" value=\""+commBtnText["gotopg"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
    nextPgHTML +="	  &nbsp;\n";
    nextPgHTML +="		<input type=\"reset\" value=\""+commBtnText["Reset"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
  
    nextPgHTML +="			</td>\n";
    nextPgHTML +="		</tr>\n";
    //nextPgHTML +="</table>\n";
    nextPgHTML += "</form>\n";
  }
	//End of the Row where the Jump to the page form goes
	
	nextPgHTML += "<tr> \n";
	nextPgHTML += "<td align=\"center\" class=\"nextPageLink\">\n ";
	
	// if the page number is not 1 that means user is not on page 
  	// display the previous page link and a link to the
  	// first page as well on the page looks like this <<  <
	if (!(page_number == 1)) 
  	{
    	//$html_output .= "<a href=\"" . $url . "?page_number=1" . $query_string . "\"><b>&lt;&lt;</b></a>";
    	nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) + "&cmpy="+cmpy+"&search_str="+search_str+"&days="+days+"&type="+type+"&print_temp="+print_temp+"&startDate="+startDate+"&startTime="+startTime+"&endDate="+endDate+"&endTime="+endTime+"&op="+op+"'); ", "&lt;&lt;");
		foobar = page_number - 1;
		
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		 nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&cmpy="+cmpy+"&search_str="+search_str+"&days="+days+"&type="+type+"&print_temp="+print_temp+"&startDate="+startDate+"&startTime="+startTime+"&endDate="+endDate+"&endTime="+endTime+"&op="+op+"'); ", "<b>&lt;<\/b>");
		
	} else 
  	{
		nextPgHTML += "<b>&lt;&lt;</b>&nbsp;&nbsp;<b>&lt;</b>";
	} 
  
  	// if number of block are more than 1
  	// that means there more than 20 or 30 page
  	// for easy pagination can make the blocks of pages  
 	 // display the previous page link and a link to the
  	//   on the page looks like this [ 31-40  41-50  51-60]
  	// Abdul Dont need to print the Blocks
  	// Sao wanted a better way of jumping between the pages.
  	//16/05/2006
  	/* No need of the Blocks
  	if (block_number > 0) 
  	{
		nextPgHTML += "&nbsp;&nbsp;<b>[</b>";
		for (var i=0; i<(block_number); i++) 
    	{
			var foobar1 = i*block_size + 1;	// page number to be linked
			var foobar2 = (i+1)*block_size;
			//$html_output .= "&nbsp;<a href=\"" . $url . "?page_number=" . $foobar1 . $query_string . "\">" . $foobar1 . "-" . $foobar2 . "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&cmpy="+cmpy+"&type="+type+"&print_temp="+print_temp+"&startDate="+startDate+"&startTime="+startTime+"&endDate="+endDate+"&endTime="+endTime+"&op="+op+"'); ", foobar1 + "-" + foobar2);
		}
		nextPgHTML += "<b>]</b>";
	}No need of the Blocks*/

  	// Time to create the links to the 10 pages
  	// link to the pages look like this
 	 // <<  <  1 2  3  4  5  6  7  8  9  10 
  	// var block_number = (((page_number-1)/block_size)); 
  	//alert("block_number" +block_number);
  	foobar1 = block_number*block_size + 1;
	foobar2 = Math.min((block_number+1)*block_size, num_pages);
	foobar2++;
	//alert(foobar1);
	//alert(foobar2);
	for (var i=foobar1; i<page_number; i++) 
  	{
    //alert("I am in for loop "+i);		
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&cmpy="+cmpy+"&type="+type+"&print_temp="+print_temp+"&search_str="+search_str+"&days="+days+"&startDate="+startDate+"&startTime="+startTime+"&endDate="+endDate+"&endTime="+endTime+"&op="+op+"'); ", i);
	}
	
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	
	for (var i=page_number+1; i<foobar2; i++) 
  	{
    	//alert("I am in for for foobar2 loop "+i);	
    	nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&cmpy="+cmpy+"&type="+type+"&print_temp="+print_temp+"&search_str="+search_str+"&days="+days+"&startDate="+startDate+"&startTime="+startTime+"&endDate="+endDate+"&endTime="+endTime+"&op="+op+"'); ", i);
	}
	
	// if number of block are more than 1
  	// that means there more than 20 or 30 page
  	// for easy pagination can make the blocks of pages  
  	// display the previous page link and a link to the
  	//   on the page looks like this [ 31-40  41-50  51-60]
    // Sao wanted a better way of jumping between the pages.
  	//16/05/2006
  	/* No need of the Blocks	
	if (block_number+1 < num_blocks) 
  	{
		nextPgHTML += "&nbsp;&nbsp;<b>[</b>";
		for (var i=block_number+1; i<num_blocks; i++) 
    	{
      
			foobar1 = i*block_size + 1;	// page number to be linked
			foobar2 = Math.min((i+1)*block_size, num_pages);
			var tempTxt = foobar1;
			
			if (foobar2 > foobar1) {
				tempTxt += "-" + foobar2;
			}
			//$html_output .= "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&cmpy="+cmpy+"&type="+type+"&print_temp="+print_temp+"&startDate="+startDate+"&startTime="+startTime+"&endDate="+endDate+"&endTime="+endTime+"&op="+op+"'); ", tempTxt);
		}
		nextPgHTML += "<b>]</b>";
	}No need of the Blocks*/
 	 // if the page number is not equal to total num of pages
 	 // that means we can dispay the link to the next page
  	// and the last pge
  	// link looks like this > >>
	if (!(page_number == num_pages)) 
  	{
		foobar = page_number + 1;
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&cmpy="+cmpy+"&type="+type+"&print_temp="+print_temp+"&search_str="+search_str+"&days="+days+"&startDate="+startDate+"&startTime="+startTime+"&endDate="+endDate+"&endTime="+endTime+"&op="+op+"'); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) + "&cmpy="+cmpy+"&type="+type+"&print_temp="+print_temp+"&search_str="+search_str+"&days="+days+"&startDate="+startDate+"&startTime="+startTime+"&endDate="+endDate+"&endTime="+endTime+"&op="+op+"'); ", "<b>&gt;&gt;<\/b>");
	} else {
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}
  
  
	

	return nextPgHTML;
}
/* define filter_usage_jslst() 
 * responsible for filtering the usage list
 * we only need the Journal and dont have any
 * other printer to search 
 */
function filter_usage_jslst(usage_jslst)
{
  
  if(usage_jslst.length>0)
  {
    for (i=1; i<usage_jslst.length; i++)
    {
       if(usage_jslst[i][0]==printr_lookat)
       {
          var printer_name = usage_jslst[i][1];
          
          usage_jslst = [
                      ['','']
                      ,[printr_lookat,printer_name]
                      ];
          return usage_jslst;
       }
      
    }
    
    
  }
}
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage, lang)
{
  newPage +="<SCRIPT src=\"/"+lang+"/js/next.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/"+lang+"/js/CalendarPopup.js\"></SCRIPT>\n";
  newPage +="<script>\n";
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
  newPage +="	return Validator.Validate(myobject,1);\n";
  newPage +="}\n";
  newPage +="function submitmyFindform(myobject)\n";
  newPage +="{\n";
  newPage +="	if(Validator.Validate(myobject,1)) \n";
  newPage +="	{ \n";
 newPage +="		return check_strSearch(document.findFrm.checksrchtext); \n";
  newPage +="	} \n";
  newPage +="	return false; \n";
  
  //newPage +="	return flase;\n";
  newPage +="}\n";
  newPage +="\n";
  newPage +="\n";
  newPage +="</script>\n";
  newPage +="\n";
  newPage +="</head>\n";
  newPage +="\n";
  newPage +="<body>\n";
  
  newPage +="\n";
  newPage +="\n";
  return (newPage);
}
function check_strSearch(myObject)
{
	if(myObject.checked==true)
	{
		if(document.findFrm.startDate.value.length<=0 || document.findFrm.startDate.value.length<=0)
		{
			alert(otherText["msg_to_find_txt"]);
			return false;
		}
		else
		{
			var mystrDate = getDateFrmString(document.findFrm.startDate.value);
			var myendDate = getDateFrmString(document.findFrm.endDate.value);
			//alert(parseInt(myendDate - mystrDate));
			if(mystrDate>myendDate)
			{
				alert(otherText["msg_strt_date_check"]);
				updateDisableProp('search_str', true);
				return false;
				
			}
			else if (parseInt(myendDate - mystrDate) > 604800000 )
			{
				alert(otherText["msg_only_days_data"]);
				updateDisableProp('search_str', true);
				return false;
				
			}
			else
			{
				updateDisableProp('search_str', false);
				return true;
				
			}
		}
	}
	else
	{
		updateDisableProp('search_str', true);
		return true;
	}
	
	return true;
}
function getDateFrmString(op)
{
	var year = op.substring(0,4);	
	var month = parseInt(op.substring(5,7))-1;	
	var day = op.substring(8,10);
	return new Date(year, month, day);
}
function updateDisableProp(fieldId, isDisable)
{
	
	var currElement = getElemRefs(fieldId);
	if(isDisable)
	{
	 currElement.setAttribute("dataType","");
	}
	else
	{
		currElement.setAttribute("dataType","Require");
	}
	currElement.disabled=isDisable;
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
	document.glblFrm.startDate.value=myNewStDate;
	return true;
	
}
