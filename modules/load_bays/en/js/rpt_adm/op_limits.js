
var displayText = new Array()
 displayText['msg_validate_nextDaily'] = "Next Daily Report Date Time Should be Greater Than Current And Last Daily Report Date Time";
 displayText['msg_validate_nextweekly'] = "Next Weekly Date Should be Greater Than Current And Last Weekly Report Date";
 displayText['msg_validate_nextmonthly'] = "Next Monthly Date Should be Greater Than Current And Last Monthly Report Date";
 displayText['inputAlert'] = "Please check your Input, NEXT Report Date MUST be GREATER than LAST Report Date!";
 displayText["btn_bakto_opLimits"] =  "Back to Operating Limits Page"; 
 displayText['opLimits'] = "Operating Limits Details";
 displayText['modifyLimits'] = "Modify Operating Limits";
 displayText['nextReportDate'] = "Next Daily Report Date & Time [YYYY-MM-DD HH24:MIN]:";
 displayText['nextReportDateonly'] = "Next Daily Report Date [YYYY-MM-DD]:";
 displayText['nextReportTime'] = "Next Daily Report Time [HH24:MIN]:";
 displayText['lastReportDate'] = "Last Daily Report Date [YYYY-MM-DD]:";
 displayText['lastWeeklyReportDate'] = "Last Weekly Report Date [YYYY-MM-DD]:"; 
 displayText['nextWeeklyReportDate'] = "Next Weekly Report Date [YYYY-MM-DD]:";
 displayText['nextWeeklyReportDateonly'] = "Next Weekly Report Date [YYYY-MM-DD]:";
 displayText['nextWeeklyReportTime'] = "Next Weekly Report Time [HH24:MIN]:";
 displayText['lastMonthlyReportDate'] = "Last Monthly Report Date [YYYY-MM-DD]:";
 displayText['nextMonthlyReportDate'] = "Next Monthly Report Date [YYYY-MM-DD]:";
 displayText['nextMonthlyReportDateonly'] = "Next Monthly Report Date [YYYY-MM-DD]:";
 displayText['nextMonthlyReportTime'] = "Next Monthly Report Time [HH24:MIN]:";
 displayText['loadRetention'] = "Loads Retention Period (Days):";
 displayText['loadRetention_newlds'] = "New Schedules Retention Period (Days):"; 
 displayText['num_of_days'] = " [ 60 ~ 1830 ]";
 displayText['num_of_days_newlds'] = " [ 1 ~ 365 ]";
 displayText['enter_hour_next_dailyReport'] = "Enter Hour for next Daily Report Date!";
 displayText['enter_min_next_dailyReport'] = "Enter Minutes for next Daily Report Date!";
 displayText['opDMY'] = "Operating Date:";
 displayText['personExpiryMonths'] = "Personnel Expiry Months:";
 displayText['instructions'] = "Complete and submit the following form to add new report, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory"; 
 displayText['selectHour'] = "Select an hour";
 displayText['selectMinute'] = "Select a minute";
 displayText['selectDate'] = "Select Date";
 displayText['hourError'] = "Enter Hour for next weekly Report Date!";
 displayText['minuteError'] = "Enter Minute for next weekly Report Date!";
 displayText['monthHourError'] = "Enter Hour for next monthly Report Date!";
 displayText['monthMinuteError'] = "Enter Minute for next monthly Report Date!";
 displayText['retentionError'] = "Loads Retention Period must between 60 and 1830 days!";
 displayText['retentionError_newlds'] = "New Schedules Retention Period must between 1 and 365 days!";
 displayText['personExpiryError'] = "Please input A Correct Value for Personnel Expiry Months!";
 displayText['confrim_delete'] ="Are you sure you want to delete?";
 displayText['opHeader'] = "OPERATING LIMITS";
 displayText['opModify'] = "OPERATING LIMITS MODIFY";
 displayText['opAddPrinter'] = "ADD A NEW LOGICAL PRINTER";
 displayText['opTitle'] = "REPORT ADMINISTRATION, Operating Limits Page";

/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    		
  var ops_req_print = [-1, 1,26,28,38,48,36,27,37,47];
  var ops_req_search = [-1, 1,26,28,38,48,36,27,37,47];// search never required on this page		
  
  var dateFormat = "yyyy-MM-dd";
		
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
  newPage += local_HeadrHTML(newPage);
  //newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState, pageHeading), check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
  newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
	newPage += "\n";
	newPage +="<tr>\n";  
  newPage +="<td width=\"100%\">             \n";
  newPage +="<div class=\"content\" id=\"content\">\n";
  newPage += "<div id=\"printReady\">";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";   
  if (curPrivilage >=5 && (curViewDetailState <= 1 || curViewDetailState > 10)) // modify records
  {
   
     newPage += displayRecords(curViewDetailState);

  }
  else if (curViewDetailState ==6 )
  {
    newPage += displayModFrm();
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
function displayRecords(curViewDetailState)
{
  var newPage = "";
// Jane:
//   if (curViewDetailState >= 35) // handle error from server
//    {
//	   newPage +="<SCRIPT LANGUAGE=\"JavaScript\">\n";
//	   newPage += alert(displayText['inputAlert']);
//	   newPage +="</script>\n";
//    }
    newPage +="<tr>\n";		  
		newPage +="<td>\n";	
		
    newPage+="<div id=\"helparea\">\n";
    newPage +="<table border=\"0\" width=\"100%\">\n";
		newPage +="<tr>\n";		  
		newPage +="<td>\n";		  
    
    newPage +="<form name=\"op_li\" id=\"op_li\"   onsubmit='return Validator.Validate(this,1)'>\n";
    newPage += "<input type='hidden' name='op' value='6'>\n";
    newPage += "<input type='hidden' name='priv' value='"+priv+"'>\n";
    
    for(i in op_limits_tab)
    {
      if(i>0) 
      {
	for(var j=0; j<16; j++)		  
	{
          if(j==0)
          {
            newPage +="<table width=\"100%\">\n";
	    newPage +="<tr>\n";
	    newPage +="<td width=\"32%\" class=\"infotextheading\">\n";
	    newPage +=displayText['lastReportDate'];
	    newPage +="</td>\n";
	    newPage +="<td width=\"22%\" class=\"infotext\">\n";
	    newPage +=obs(op_limits_tab[i][j]);
	    newPage += "<input type='hidden' name='last_daily_rpt_date' id='last_daily_rpt_date'  value='"+obs(op_limits_tab[i][j])+"'>\n";
	    newPage +="</td>\n";
          }
          else if(j==1)
	  {
	    newPage +="<td width=\"28%\" class=\"infotextheading\">\n";     
	    newPage +=displayText['nextReportDate'];
	    newPage +="</td>\n";
	    newPage +="<td width=\"25%\" class=\"infotext\">\n";		
	    newPage +=obs(op_limits_tab[i][j])+"&nbsp;";
	    newPage += "<input type='hidden' name='next_daily_rpt_date' id='next_daily_rpt_date'  value='"+obs(op_limits_tab[i][j])+"'>\n";
	  }
	  else if(j==2)
	  {
	    newPage +=obs(op_limits_tab[i][j])+":";
	    newPage += "<input type='hidden' name='next_daily_rpt_hour'id='next_daily_rpt_hour' value='"+obs(op_limits_tab[i][j])+"'>\n";
	  }
	  else if(j==3)
	  {
	    newPage +=obs(op_limits_tab[i][j]);
	    newPage += "<input type='hidden' name='next_daily_rpt_min' id='next_daily_rpt_min' value='"+obs(op_limits_tab[i][j])+"'>\n";
	    newPage +="</td>\n";  	    
	    newPage +="</tr>\n";
	  }
	  else if(j==4)
	  {
	  // 2nd Row
	    newPage +="<tr>\n";
	    newPage +="<td class=\"infotextheading\">\n";
	    newPage +=displayText['lastWeeklyReportDate'];
	    newPage +="</td>\n";
	    newPage +="<td class=\"infotext\">\n";		
	    newPage +=obs(op_limits_tab[i][j]);
	    newPage += "<input type='hidden' name='last_weekly_rpt_date' id='last_weekly_rpt_date' value='"+obs(op_limits_tab[i][j])+"'>\n";				  
	    newPage +="</td>\n";
	  }
	  else if(j==5)
	  {
	    newPage +="<td class=\"infotextheading\">\n";
	    newPage +=displayText['nextWeeklyReportDate'];
	    newPage +="</td>\n";
	    newPage +="<td class=\"infotext\">\n";		
	    newPage +=obs(op_limits_tab[i][j])+"&nbsp;";
	    newPage += "<input type='hidden' name='next_weekly_rpt_date' id='next_weekly_rpt_date' value='"+obs(op_limits_tab[i][j])+"'>\n";
	  }

// Ignore the HOUR and MIN of Weekly reports for now.
//		else if(j==6)
//		{
//			newPage +=obs(op_limits_tab[i][j])+":";
//			newPage += "<input type='hidden' name='next_weekly_rpt_hour' id='next_weekly_rpt_hour' value='"+obs(op_limits_tab[i][j])+"'>\n";
//		}
//		else if(j==7)
//		{
//			newPage +=obs(op_limits_tab[i][j]);
//			newPage += "<input type='hidden' name='next_weekly_rpt_min' id='next_weekly_rpt_min' value='"+obs(op_limits_tab[i][j])+"'>\n";
//			newPage +="</td>\n";  	    
//			newPage +="</tr>\n";
//		}
		else if(j==8)
		{
		// 3rd Row
			newPage +="<tr>\n";
			newPage +="<td class=\"infotextheading\">\n";
			newPage +=displayText['lastMonthlyReportDate'];
		 	newPage +="</td>\n";
			newPage +="<td class=\"infotext\">\n";
			newPage +=obs(op_limits_tab[i][j]);
			newPage += "<input type='hidden' name='last_monthly_rpt_date' id='last_monthly_rpt_date' value='"+obs(op_limits_tab[i][j])+"'>\n";				  
			newPage +="</td>\n";
		}
		else if(j==9)
		{
			newPage +="<td class=\"infotextheading\">\n";     
			newPage +=displayText['nextMonthlyReportDate'];
		 	newPage +="</td>\n";
			newPage +="<td class=\"infotext\">\n";
			newPage +=obs(op_limits_tab[i][j])+"&nbsp;";
			newPage += "<input type='hidden' name='next_monthly_rpt_date' id='next_monthly_rpt_date' value='"+obs(op_limits_tab[i][j])+"'>\n";
		}
// Ignore the HOUR and MIN of Monthly reports for now.
//		else if(j==10)
//		{
//			newPage +=obs(op_limits_tab[i][j])+":";
//			newPage += "<input type='hidden' name='next_monthly_rpt_hour' id='next_monthly_rpt_hour' value='"+obs(op_limits_tab[i][j])+"'>\n";
//		}
//		else if(j==11)
//		{
//			newPage +=obs(op_limits_tab[i][j]);
//			newPage += "<input type='hidden' name='next_monthly_rpt_min' id='next_monthly_rpt_min' value='"+obs(op_limits_tab[i][j])+"'>\n";
//			newPage +="</td>\n";  	    
//			newPage +="</tr>\n";
//		}
		else if(j==12)
		{
		// 4th Row
			newPage +="<tr>\n";
			newPage +="<td class=\"infotextheading\">\n";
			newPage +=displayText['loadRetention'];
			newPage +="</td>\n";
		  	newPage +="<td class=\"infotext\">\n";
			newPage +=obs(op_limits_tab[i][j]);
			newPage += "<input type='hidden' name='ld_ret_period' id='ld_ret_period' value='"+obs(op_limits_tab[i][j])+"'>\n";				  
			newPage +="</td>\n";
		}
		else if(j==13)
		{
			newPage +="<td class=\"infotextheading\">\n"; 
			newPage +=displayText['opDMY'];
			newPage +="</td>\n";
		  	newPage +="<td class=\"infotext\">\n";
			newPage +=obs(op_limits_tab[i][j])+"&nbsp;";
			newPage += "<input type='hidden' name='op_dmy' id='op_dmy' value='"+obs(op_limits_tab[i][j])+"'>\n";
			newPage +="</td>\n";  	    
		}
		else if(j==14)
		{
		// 5th Row
			newPage +="<tr>\n";
			newPage +="<td class=\"infotextheading\">\n";
			newPage +=displayText['personExpiryMonths'];
			newPage +="</td>\n";
		  	newPage +="<td class=\"infotext\">\n";
			newPage +=obs(op_limits_tab[i][j]);
			newPage += "<input type='hidden' name='exp_mons' id='exp_mons' value='"+obs(op_limits_tab[i][j])+"'>\n";				  
			newPage +="</td>\n";
			newPage +="</td>\n";
			newPage +="<td >\n";
			newPage +="<td>\n";
			newPage +="</td>\n";  	    
			newPage +="</tr>\n";
			//newPage += "</form>\n";
		}
		else if(j==15)
		{
		// tth Row

			newPage +="<tr>\n";
			newPage +="<td class=\"infotextheading\">\n";
			newPage +=displayText['loadRetention_newlds'];
			newPage +="</td>\n";
		  	newPage +="<td class=\"infotext\">\n";
			newPage +=obs(op_limits_tab[i][j]);
			newPage += "<input type='hidden' name='ld_ret_period_newlds' id='ld_ret_period_newlds' value='"+obs(op_limits_tab[i][j])+"'>\n";				  
			newPage +="</td>\n";
			newPage +="</td>\n";
			newPage +="<td >\n";
			newPage +="<td>\n";
			newPage +="</td>\n";  	    
			newPage +="</tr>\n";
			//newPage += "</form>\n";
		}
        }//end of For Loop runs < 15
      }
	  }// end of For Loop
    
     newPage +="</table>\n";
    
    	  
		newPage +="</td>\n";
	
    newPage +="</tr>\n";
	if (priv>=6)
	{
		newPage +=frmButtRow_HTML(commBtnText["Modify"], 0);
	}
    
    newPage += "                    </form>\n";
    newPage +="</table>\n";
    newPage +="</div>\n";	 // end of Help Area Div and table
    
    newPage +="</td>\n";
    newPage +="</tr>\n";	
    
    
    return (newPage);
}
function displayModFrm()
{
  var newPage = "";
  newPage += backToBtn_HTML();
  newPage += fieldst_HTML(displayText['modifyLimits']);
	newPage += " <div class=\"adminform\">\n";
	newPage +="<table width=\"100%\">\n";
	newPage +=infotextRow_HTML(" width=\"100%\" ",displayText['instructions']); 
	newPage +="<form name=\"mod_op\" id=\"mod_op\"  onsubmit='return validateAndSubmit(this);'>\n";
	newPage +="<tr>\n";
	newPage +="<td class=\"infotext\" width=\"100%\">\n";
	
	newPage +="<table width=\"710\">\n";
	
		// This is the First Row
  newPage +="<tr>								\n";
  newPage +="<td width=\"30%\">\n";
  newPage +="<table>\n";
  newPage +="<tr>\n";
  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"180\" ",displayText['lastReportDate']);
  newPage +=textTd_HTML(" width=\"4\" align=\"center class=\"infotext\" ",
// [Bug:1404]    	    "<span class=\"mandatory\">*</span>\n");
    	    "&nbsp;\n");
  newPage +="	<td class=\"infotext\">\n";
  if(op_limits_tab[1][0] == -1)
  {
    newPage += "";
  }
  else
  {
    newPage += obs(op_limits_tab[1][0]);
  }
  
  // there is no difference between the 2
  // if and else are the same
  if(op_limits_tab[1][0] == -1)
  {
    newPage += "<input type='hidden' name='last_daily_rpt_date' id='last_daily_rpt_date' value='"+obs(op_limits_tab[1][0])+"'>\n";
  }
  else
  {
    newPage += "<input type='hidden' name='last_daily_rpt_date' id='last_daily_rpt_date'  value='"+obs(op_limits_tab[1][0])+"'>\n";
  }

  newPage += "<input type=\"hidden\" name=\"op\" value=\"16\">\n";			
  newPage += "<input type='hidden' name='priv' value='"+priv+"'>\n";
  newPage +="	</td>\n";
  newPage +="<\/tr>\n";  
  newPage +="</table>\n";					  
  newPage +="</td>\n";

  //First Row 2nd Big cell starts here
  newPage +="<td width=\"30%\">\n";  
  newPage +="<table>\n";
  newPage +="<tr>\n";
  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"160\" ",displayText['nextReportDateonly']);
  newPage +=textTd_HTML(" width=\"4\"  align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  newPage +="<td >\n";
  if(op_limits_tab[1][1] == -1)
  {
	newPage += "";
//  	newPage += "<input type='text' name='next_daily_rpt_date' size= '10'   readonly/>\n";
  }
  else
  {
    newPage += "<input type='text' name='next_daily_rpt_date' id='next_daily_rpt_date' size= '10' value='"+obs(op_limits_tab[1][1])+"'  readonly/>\n";
  }
  newPage += dateURL_HTML("document.forms[0].next_daily_rpt_date", "date_anchor1",dateFormat,displayText['selectDate']);
  newPage +="<\/td >\n";	
  newPage +="	</tr>\n";
  newPage +="	</table>\n";
  newPage +="<\/td >\n";	
  newPage +="	</tr>\n";
  
  // 2nd row starts here
  newPage +="<tr>\n";
  newPage +="<td width=\"20%\">\n";
  newPage +="&nbsp;\n";
  newPage +="<\/td>\n";

  //2nd Row Big cell starts here
  newPage +="<td width=\"20%\">\n";
  
  newPage +="<table>\n";
  newPage +="<tr>\n";
  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"160\" ",displayText['nextReportTime']);
  newPage +=textTd_HTML(" width=\"4\"  align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  newPage +="<td >\n";
	
  newPage += "<select name='next_daily_rpt_hour' id ='next_daily_rpt_hour' class='smallselect' dataType='Require' msg=\""+displayText['enter_hour_next_dailyReport']+"\">\n";
  if(op_limits_tab[1][2] == -1)
  {
    newPage += droplistHour('next_daily_rpt_hour', displayText['selectHour'],'');
  }
  else
  {
    newPage += droplistHour('next_daily_rpt_hour', displayText['selectHour'],obs(op_limits_tab[1][2]));
  }

  newPage +=":";
  newPage += "<select name='next_daily_rpt_min' id='next_daily_rpt_min' class='smallselect' dataType='Require' msg=\""+displayText['enter_min_next_dailyReport']+"\">\n";
  if(op_limits_tab[1][3] == -1)
  {
    newPage += droplistMin('next_daily_rpt_min', displayText['selectMinute'],'');
  }
  else
  {
      newPage += droplistMin('next_daily_rpt_min', displayText['selectMinute'],obs(op_limits_tab[1][3]));            
  }
	
  newPage +="<\/td>\n";
  newPage +="<\/tr>\n";
  newPage +="	</table>\n";
  newPage +="<\/td >\n";	
  newPage +="	</tr>\n";
  
  // 3rd row starts here
  newPage +="<tr>\n";
  newPage +="<td width=\"30%\">\n";
  newPage +="<table>\n";
  newPage +="<tr>\n";
  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"180\" ",displayText['lastWeeklyReportDate']);
  newPage +=textTd_HTML(" width=\"4\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\"></span>\n");
//[Bug:1404]      	    "<span class=\"mandatory\">*</span>\n");
  newPage +="<td class=\"infotext\">\n";
  if(op_limits_tab[1][4] == -1)
  {
  	newPage += "";
  }
  else
  {
    newPage += obs(op_limits_tab[1][4]);
  }
  newPage += "<input type='hidden' name='last_weekly_rpt_date' id='last_weekly_rpt_date' value='"+obs(op_limits_tab[1][4])+"'>\n";
  newPage +="<\/td>\n";
  newPage +="<\/tr>\n";
  newPage +="<\/table>\n";
  newPage +="<\/td>\n";

  //3rd row biggest cell
  newPage +="<td width=\"30%\">\n";
  newPage +="<table>\n";
  newPage +="<tr>\n";
  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"160\" ",displayText['nextWeeklyReportDateonly']);
  newPage +=textTd_HTML(" width=\"4\"  align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  newPage +="<td >\n";
  if(op_limits_tab[1][5] == -1)
  {
  	newPage += "<input type='text' name='next_weekly_rpt_date' size= '10'  readonly/>\n";
  }
  else
  {
	 newPage += "<input type='text' name='next_weekly_rpt_date' id='next_weekly_rpt_date'  size= '10' value='"+obs(op_limits_tab[1][5])+"'  readonly/>\n";
  }

  newPage += dateURL_HTML("document.forms[0].next_weekly_rpt_date", "date_anchor2",dateFormat,displayText['selectDate']);
  
  newPage +="<\/td>\n";
  newPage +="<\/tr>\n";
  newPage +="<\/table>\n";
  newPage +="<\/td>\n";
  newPage +="<\/tr>\n";

  //4th Row Big cell starts here
  // time is not needed any more for the Weekly Reports as 
  // desired by Derek and Fred so comment out the time 
  /* [
  newPage +="<tr>\n";
  newPage +="<td width=\"30%\">\n";
  newPage +="&nbsp;\n";
  newPage +="<\/td>\n";
  //4th Row Big cell starts here
  // time is not needed any more for the Weekly Reports as 
  // desired by Derek and Fred so comment out the time 
  newPage +="<td width=\"30%\">\n";
  newPage +="	<table>\n";
  newPage +="<tr>\n";
  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"160\" ",displayText['nextWeeklyReportTime']);
  newPage +=textTd_HTML(" width=\"4\"  align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  newPage +="<td >\n";      	    
  newPage += "<select name='next_weekly_rpt_hour' class='smallselect' dataType='Require' msg='"+displayText['hourError']+"'>\n";
  if(op_limits_tab[1][6] == -1)
  {
  	newPage += droplistHour('next_weekly_rpt_hour', displayText['selectHour'],'');
// [Bug:1404]  	newPage += droplistHour('next_daily_rpt_hour', displayText['selectHour'],'');
  	
  }
  else
  {
    newPage += droplistHour('next_weekly_rpt_hour', displayText['selectHour'],obs(op_limits_tab[1][6]));
// [Bug:1404]    newPage += droplistHour('next_daily_rpt_hour', displayText['selectHour'],next_weekly_rpt_hour);
  }
         
  newPage +=":";
  newPage += "<select name='next_weekly_rpt_min' id='next_weekly_rpt_min' class='smallselect' dataType='Require' msg='"+displayText['minuteError']+"'>\n";
  if(op_limits_tab[1][7] == -1)
  {
  	newPage += droplistMin('next_weekly_rpt_min', displayText['selectMinute'],'');
// [Bug:1404]  	newPage += droplistMin('next_daily_rpt_min', displayText['selectMinute'],'');
  	
  }
  else
  {
    newPage += droplistMin('next_weekly_rpt_min', displayText['selectMinute'],obs(op_limits_tab[1][7])); 
// [Bug:1404]    newPage += droplistMin('next_daily_rpt_min', displayText['selectMinute'],next_weekly_rpt_min); 
  }           
  newPage +="</td>\n";
  newPage +="</tr>\n";
  newPage +="</table>\n";					  
  newPage +="</td>\n";      	    
  newPage +="</tr>\n";
]	*/

	// 5th row starts here
  newPage +="<tr>\n";
  newPage +="<td width=\"30%\">\n";
  
  newPage +="	<table>\n";
  newPage +="	<tr>\n";
  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"180\" ",displayText['lastMonthlyReportDate']);
  newPage +=textTd_HTML(" width=\"4\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\"></span>\n");
//[Bug:1404]      	    "<span class=\"mandatory\">*</span>\n");
  newPage +="	<td class=\"infotext\">\n";
  if(op_limits_tab[1][8] == -1)
//  if(last_monthly_rpt_date == -1)
// [Bug:1404]  if(next_weekly_rpt_min == -1)
  {
  	newPage += "";
  }
  else
  {
    newPage += obs(op_limits_tab[1][8]);
  }
  newPage += "<input type='hidden' name='last_monthly_rpt_date' id='last_monthly_rpt_date' value='"+obs(op_limits_tab[1][8])+"'>\n";

  newPage +="</td>\n";
  newPage +="</tr>\n";
  newPage +="</table>\n";  
  newPage +="<\/td>\n";

  //5th Row Big cell starts here
  newPage +="<td width=\"30%\">\n";
  
  newPage +="<table>\n";
  newPage +="<tr>\n";
  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"160\" ",displayText['nextMonthlyReportDateonly']);
  newPage +=textTd_HTML(" width=\"4\"  align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  newPage +="<td >\n";
  if(op_limits_tab[1][9] == -1)
  {
  	newPage += "<input type='text' name='next_monthly_rpt_date' id='next_monthly_rpt_date' size= '10'  readonly/>\n";
  }
  else
  {
    newPage += "<input type='text' name='next_monthly_rpt_date' id='next_monthly_rpt_date' size= '10' value='"+obs(op_limits_tab[1][9])+"'  readonly/>\n";
  }
  newPage += dateURL_HTML("document.forms[0].next_monthly_rpt_date", "date_anchor3",dateFormat,displayText['selectDate']);
  
  newPage +="</td>\n";
  newPage +="</tr>\n";
  newPage +="</table>\n";
  newPage +="<\/td>\n";
  newPage +="</tr>\n";
	
// 6th row starts here
//dont need time for the Monthly report
// desired by Derek and Fred
/*	[
  newPage +="<tr>\n";
  newPage +="<td width=\"30%\">\n";
  newPage +="&nbsp;\n";
  newPage +="<\/td>\n";

  //6th Row Big cell starts here
  newPage +="<td width=\"30%\">\n";
  newPage +="<table>\n";
  newPage +="	<tr>\n";
  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"160\" ",displayText['nextMonthlyReportTime']);
  newPage +=textTd_HTML(" width=\"4\"  align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  newPage +="<td >\n";
  
  newPage += "<select name='next_monthly_rpt_hour' id='next_monthly_rpt_hour' class='smallselect' dataType='Require' msg='"+displayText['monthHourError']+"'>\n";
  if(op_limits_tab[1][10] == -1)
  {
  	newPage += droplistHour('next_monthly_rpt_hour', displayText['selectHour'],'');
//[bug:1404]  	newPage += droplistHour('next_daily_rpt_hour', displayText['selectHour'],'');
  }
  else
  {
    newPage += droplistHour('next_monthly_rpt_hour', displayText['selectHour'],obs(op_limits_tab[1][10]));
//[Bug:1404]    newPage += droplistHour('next_daily_rpt_hour', displayText['selectHour'],next_monthly_rpt_hour);
  
  }
  newPage +=":";
  newPage += "<select name='next_monthly_rpt_min' id='next_monthly_rpt_min' class='smallselect' dataType='Require' msg='"+displayText['monthMinuteError']+"'>\n";
  if(op_limits_tab[1][11] == -1)
  {
  	newPage += droplistMin('next_monthly_rpt_min', displayText['selectMinute'],'');
//[Bug:1404]  	newPage += droplistMin('next_daily_rpt_min', displayText['selectMinute'],'');
  	
  }
  else
  {
    newPage += droplistMin('next_monthly_rpt_min', displayText['selectMinute'] ,obs(op_limits_tab[1][11]));     
// [Bug:1404]    newPage += droplistMin('next_daily_rpt_min', displayText['selectMinute'] ,next_monthly_rpt_min);     
  }       
  newPage +="</td>\n";
  newPage +="</tr>\n";
  newPage +="</table>\n";	  
  newPage +="<\/td>\n";
  newPage +="<\/tr>\n"; 	
]	*/

	// 7th row starts here
  newPage +="<tr>\n";
  newPage +="<td width=\"30%\">\n";
  
  newPage +="<table>\n";
  newPage +="	<tr>\n";
  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"180\" ",displayText['loadRetention']);
  newPage +=textTd_HTML(" width=\"4\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  newPage +="<td >\n";
  if(op_limits_tab[1][12] ==-1)
  {
  	newPage += "<input type='text' name='ld_ret_period' id='ld_ret_period'  size= '4'  dataType='Range'  min='60'  max='1830'  msg='"+displayText['retentionError']+"'><span class=\"infotextheading\">"+displayText['num_of_days']+"</span>\n";
  }
  else
  {
    newPage += "<input type='text' name='ld_ret_period' id='ld_ret_period' size= '4' value='"+obs(op_limits_tab[1][12])+"' dataType='Range'  min='60'  max='1830'  msg='"+displayText['retentionError']+"'><span class=\"infotextheading\">"+displayText['num_of_days']+"</span>\n";
  }
  newPage +="	</td>\n";
  newPage +="		</tr>\n";
  newPage +="	</table>\n";	  
  newPage +="<\/td>\n";

  //7th Row Big cell starts here
  newPage +="<td width=\"30%\">\n";
  
  newPage +="<table>\n";
  newPage +="<tr>\n";
  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"160\" ",displayText['opDMY']);
  newPage +=textTd_HTML(" width=\"4\"  align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  newPage +="<td >\n";
  if(op_limits_tab[1][13] == -1)
  {
  	newPage += "<input type='text' name='op_dmy' id='op_dmy' size= '10'  readonly/>\n";
  }
  else
  {
    newPage += "<input type='text' name='op_dmy' id='op_dmy' size= '10' value='"+obs(op_limits_tab[1][13])+"'  readonly/>\n";
  }
  newPage += dateURL_HTML("document.forms[0].op_dmy", "date_anchor4",dateFormat,displayText['selectDate']);
  newPage +="</td>\n";
  newPage +="</tr>\n";
  newPage +="</table>\n";
  
  newPage +="<\/td>\n";
  newPage +="<\/tr>\n";
  
   // 8th row starts here
  newPage +="<tr>\n";
  newPage +="<td width=\"30%\">\n";
  newPage +="<table>\n";
  newPage +="<tr>\n";
  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"180\" ", displayText['personExpiryMonths']);
  newPage +=textTd_HTML(" width=\"4\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  newPage +="<td >\n";
  if(op_limits_tab[1][14] == -1)
  {
//  	newPage += "<input type='text' name='exp_mons' id='exp_mons'  size= '4'  dataType='RangeInt'  min='1'  max='100'  msg='"+displayText['personExpiryError']+"'>\n";
  	newPage += "<input type=\"text\" name=\"exp_mons\" id=\"exp_mons\"  size= \"4\"  dataType=\"RangeInt\"  min=\"1\"  max=\"100\"  msg=\""+displayText['personExpiryError']+"\">\n";
  }
  else
  {
    newPage += "<input type='text' name='exp_mons' id='exp_mons' size= '4' value='"+obs(op_limits_tab[1][14])+"' dataType='RangeInt'  min='1'  max='100'  msg='"+displayText['personExpiryError']+"'>\n";
  }
  newPage +="</td>\n";
  newPage +="</tr>\n";
  newPage +="</table>\n";		
  newPage +="<\/td>\n";

  //8th Row Big cell starts here
  newPage +="<td width=\"30%\">\n";
  newPage +="&nbsp;\n";
  newPage +="<\/td>\n";  
  newPage +="<\/tr>\n";
  
  
   // 9th row starts here
  newPage +="<tr>\n";
  newPage +="<td width=\"30%\">\n";
  newPage +="<table>\n";
  newPage +="<tr>\n";
  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"180\" ", displayText['loadRetention_newlds']);
  newPage +=textTd_HTML(" width=\"4\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  newPage +="<td >\n";
  if(op_limits_tab[1][15] == -1)
  {
  	newPage += "<input type='text' name='ld_ret_period_newlds' id='ld_ret_period_newlds'  size= '4'  dataType='Range'  min='1'  max='365'  msg='"+displayText['retentionError_newlds']+"'><span class=\"infotextheading\">"+displayText['num_of_days_newlds']+"</span>\n";
  }
  else
  {
    newPage += "<input type='text' name='ld_ret_period_newlds' id='ld_ret_period_newlds' size= '4' value='"+obs(op_limits_tab[1][15])+"' dataType='Range'  min='1'  max='365'  msg='"+displayText['retentionError_newlds']+"'><span class=\"infotextheading\">"+displayText['num_of_days_newlds']+"</span>\n";
  }
  newPage +="</td>\n";
  newPage +="</tr>\n";
  newPage +="</table>\n";		
  newPage +="<\/td>\n";

  //9th Row Big cell starts here
  newPage +="<td width=\"30%\">\n";
  newPage +="&nbsp;\n";
  newPage +="<\/td>\n";  
  newPage +="<\/tr>\n";
	
  newPage +="</table>\n";

  newPage +="<\/td>\n";
  newPage +="</tr>\n";
  if (priv>=6)
  {
		newPage +=frmButtRow_HTML(commBtnText["Modify"], 1);
   }
  newPage +="</td>\n";
  newPage +="</tr>\n";
  //frmButtRow_HTML("Add", 1);
  newPage +="</table>\n";
  
  newPage += "</form>\n";                      
  newPage += "</div>\n";
  newPage += fieldstFoot_HTML();

  return newPage;
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
  if (op <= 1 || op > 10)
  {
    pageHeading +=displayText['opHeader'];
  }else if(op==6)
  {
  	pageHeading +=displayText['opModify'];
  	
  }else if(op==7)
  {
  	pageHeading +=displayText['opAddPrinter'];
  }
  return pageHeading;   
}


function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
  pageTitle +=displayText['opTitle'];
  return pageTitle;
}




function displayDropList_rpt(selectedvalue, list,defMsg)
{
  var massList = "";
  var matchFound=0;
  for (i=1; i<list.length; i++){
    massList += "<option value=\""+list[i]+"\"";
     if(list[i]==selectedvalue)
     {
        matchFound=1;
        massList += "selected";
     }
    massList +=">"+list[i]+"</option>\n";
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



function gotoResultPage(filetoGo, varName, pageNum )
{
  var temp="";
  var curl="";
  if(produceQString() == "")
  {
    temp = filetoGo +"?" + varName+"="+pageNum;
  }
	else
	{ 
	   
      curl = produceQString();
      curl = AlterUrlString("?" +curl,varName,pageNum) 
	    temp = filetoGo+curl;
	
	  
  }
	document.location.href = temp;
}


function droplistHour(name, msg,defaultValue)
{
	var defaultValue;
	var time="";
//	time +=alert(selectedVaule);
	time += " <option value='"+defaultValue+"'selected>"+defaultValue+"</option>\n";
	time += "	<option value=\"00\">00</option>\n";
	time += "	<option value=\"01\">01</option>\n";
	time += "	<option value=\"02\">02</option>\n";
	time += "	<option value=\"03\">03</option>\n";
	time += "	<option value=\"04\">04</option>\n";
	time += "	<option value=\"05\">05</option>\n";
	time += "	<option value=\"06\">06</option>\n";
	time += "	<option value=\"07\">07</option>\n";
	time += "	<option value=\"08\">08</option>\n";
	time += "	<option value=\"09\">09</option>\n";
	time += "	<option value=\"10\">10</option>\n";
	time += "	<option value=\"11\">11</option>\n";
	time += "	<option value=\"12\">12</option>\n";
	time += "	<option value=\"13\">13</option>\n";
	time += "	<option value=\"14\">14</option>\n";
	time += "	<option value=\"15\">15</option>\n";
	time += "	<option value=\"16\">16</option>\n";
	time += "	<option value=\"17\">17</option>\n";
	time += "	<option value=\"18\">18</option>\n";
	time += "	<option value=\"19\">19</option>\n";
	time += "	<option value=\"20\">20</option>\n";
	time += "	<option value=\"21\">21</option>\n";
	time += "	<option value=\"22\">22</option>\n";
	time += "	<option value=\"23\">23</option>\n";	
	time += "</select>\n";
	
	return time;
}

function droplistMin(name, msg,selectedValue)
{
	var selectedValue;
	var minute="";
	minute += " <option value='"+selectedValue+"'selected>"+selectedValue+"</option>\n";
	minute += "	<option value=\"00\">00</option>\n";
	minute += "	<option value=\"01\">01</option>\n";
	minute += "	<option value=\"02\">02</option>\n";
	minute += "	<option value=\"03\">03</option>\n";
	minute += "	<option value=\"04\">04</option>\n";
	minute += "	<option value=\"05\">05</option>\n";
	minute += "	<option value=\"06\">06</option>\n";
	minute += "	<option value=\"07\">07</option>\n";
	minute += "	<option value=\"08\">08</option>\n";
	minute += "	<option value=\"09\">09</option>\n";
	minute += "	<option value=\"10\">10</option>\n";
	minute += "	<option value=\"11\">11</option>\n";
	minute += "	<option value=\"12\">12</option>\n";
	minute += "	<option value=\"13\">13</option>\n";
	minute += "	<option value=\"14\">14</option>\n";
	minute += "	<option value=\"15\">15</option>\n";
	minute += "	<option value=\"16\">16</option>\n";
	minute += "	<option value=\"17\">17</option>\n";
	minute += "	<option value=\"18\">18</option>\n";
	minute += "	<option value=\"19\">19</option>\n";
	minute += "	<option value=\"20\">20</option>\n";
	minute += "	<option value=\"21\">21</option>\n";
	minute += "	<option value=\"22\">22</option>\n";
	minute += "	<option value=\"23\">23</option>\n";	
	minute += "	<option value=\"24\">24</option>\n";
	minute += "	<option value=\"25\">25</option>\n";
	minute += "	<option value=\"26\">26</option>\n";
	minute += "	<option value=\"27\">27</option>\n";	
	minute += "	<option value=\"28\">28</option>\n";
	minute += "	<option value=\"29\">29</option>\n";
	minute += "	<option value=\"30\">30</option>\n";
	minute += "	<option value=\"31\">31</option>\n";	
	minute += "	<option value=\"32\">32</option>\n";
	minute += "	<option value=\"33\">33</option>\n";
	minute += "	<option value=\"34\">34</option>\n";
	minute += "	<option value=\"35\">35</option>\n";
	minute += "	<option value=\"36\">36</option>\n";	
	minute += "	<option value=\"37\">37</option>\n";
	minute += "	<option value=\"38\">38</option>\n";
	minute += "	<option value=\"39\">39</option>\n";	
	minute += "	<option value=\"40\">40</option>\n";	
	minute += "	<option value=\"41\">41</option>\n";
	minute += "	<option value=\"42\">42</option>\n";	
	minute += "	<option value=\"43\">43</option>\n";
	minute += "	<option value=\"44\">44</option>\n";	
	minute += "	<option value=\"45\">45</option>\n";
	minute += "	<option value=\"46\">46</option>\n";	
	minute += "	<option value=\"47\">47</option>\n";
	minute += "	<option value=\"48\">48</option>\n";	
	minute += "	<option value=\"49\">49</option>\n";
	minute += "	<option value=\"50\">50</option>\n";	
	minute += "	<option value=\"51\">51</option>\n";
	minute += "	<option value=\"52\">52</option>\n";	
	minute += "	<option value=\"53\">53</option>\n";
	minute += "	<option value=\"54\">54</option>\n";	
	minute += "	<option value=\"55\">55</option>\n";
	minute += "	<option value=\"56\">56</option>\n";	
	minute += "	<option value=\"57\">57</option>\n";
	minute += "	<option value=\"58\">58</option>\n";	
	minute += "	<option value=\"59\">59</option>\n";
	minute += "</select>\n";
	return minute;
}


function local_HeadrHTML(newPage)
{
  newPage +="<SCRIPT LANGUAGE=\"JavaScript\">\n";
  newPage +="	var cal = new CalendarPopup();\n";
  newPage +="	cal.showYearNavigation();\n";  
  newPage +="/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
  newPage +="FUNCTION [ submitmyform] \n";
  newPage +="[PURPOSE] 	-> 	Always use this method to submit a form,\n";
  newPage +="			gives me the flexbility of doing validation\n";
  newPage +="			and addition if required before i submit the form\n";
  newPage +="          \n";
  newPage +="[Parameter] -> myobject FORM OBJECT Parameter is the form need to be submit\n";
  newPage +="'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";  
  newPage +="function submitmyform_own(myobject)\n";
  newPage +="{\n";
  newPage +="var form_number = parseInt(myobject);";
  newPage +="if(document.forms[form_number].op.value=='7')";
  newPage +="{";
  newPage+="document.forms[form_number].submit();\n";
  newPage +="}\n";
  newPage +="else if(document.forms[form_number].op.value=='6')";
  newPage +="{";
  newPage+="document.forms[form_number].submit();\n";
  newPage+="	}\n";
  newPage +="else if(document.forms[form_number].op.value=='8')";
  newPage +="{";
  newPage +="if(confirm('"+displayText['confrim_delete']+"'))";
  newPage +="{";
  newPage+="document.forms[form_number].submit();\n";
  newPage+="	}else{\n";  
  newPage+="document.forms[form_number].reset();\n";  
  newPage+="	}\n";   
  newPage+="	}\n";  

  newPage +="}\n";
    
  newPage +="function submitmyform()\n";
  newPage +="{\n";
  newPage+="	if(Validator.Validate(document.forms[0],1)==true){\n";
  newPage+="		document.forms[0].submit();\n";
  newPage+="	}\n";  
  newPage +="}\n";  
  newPage +="</script>\n";
  newPage +="</head>\n";
	newPage +="\n";
	newPage +="<body>\n";
	newPage +="\n";
	return (newPage);
}

function backToBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   btn_HTML += btnLocation_HTML("justChaneMyLocation('op_limits.cgi'); ", displayText["btn_bakto_opLimits"]);
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}
//submit the form with the help of th is
//validateAndSubmit
function validateAndSubmit(myobject)
{
  
  var isFormValid = false;
  var isFormValid = Validator.Validate(myobject, 1);
  
  //start dealing with the daily Report Stuff
  var temp_lastDRpt = document.mod_op.last_daily_rpt_date.value;
  var temp_nextDRptDate = document.mod_op.next_daily_rpt_date.value;
  var temp_nextDRptTime = document.mod_op.next_daily_rpt_hour.value;
  temp_nextDRptTime += ":"+document.mod_op.next_daily_rpt_min.value;
  var lastDRpt = getToDate(temp_lastDRpt);
  
  var nextDRptDateTime = getDateTime(temp_nextDRptDate, temp_nextDRptTime);
  var curDateTime = new Date();
//  alert("about to compare nextDRptDateTime"+nextDRptDateTime+" With lastDRpt"+lastDRpt+" curDateTime is"+curDateTime);
  //start dealing with the weekly Report Stuff
  var temp_lastWRpt = document.mod_op.last_weekly_rpt_date.value;
  var lastWRpt = getToDate(temp_lastWRpt);
  
  var temp_nextWRpt = document.mod_op.next_weekly_rpt_date.value;
  var nextWRpt = getToDate(temp_nextWRpt);
  
  //start dealing with the monthly Report Stuff
  var temp_lastMRpt = document.mod_op.last_monthly_rpt_date.value;
  var lastMRpt = getToDate(temp_lastMRpt);
  
  var temp_nextMRpt = document.mod_op.next_monthly_rpt_date.value;
  var nextMRpt = getToDate(temp_nextMRpt);
  
  
  if(isFormValid)
{
  
  if( (nextDRptDateTime<=lastDRpt) || (curDateTime>nextDRptDateTime) )
  {
    alert(displayText['msg_validate_nextDaily']);
    return false;
  }
  
//  if( (nextWRpt<=lastWRpt) || (curDateTime>nextWRpt) )
    if( (nextWRpt < lastWRpt) || ((curDateTime) > nextWRpt) )
  {
    alert(displayText['msg_validate_nextweekly']);
    return false;
  }
  
//  if( (nextMRpt<=lastMRpt) || (curDateTime>nextMRpt) )
  if( (nextMRpt < lastMRpt) || ((curDateTime) > nextMRpt) )
  {
    alert(displayText['msg_validate_nextmonthly']);
    return false;
  }
}
else
{
  return false;

}  
  return true;
}
function getDateTime(op1, op2)
{
	var year = op1.substring(0,4);
	var month = op1.substring(5,7);
	var day = op1.substring(8,10);
	var hour = op2. substring (0,2);
	var second = op2.substring(3,5);
	//alert(year +" AND "+month +" AND "+day +" AND "+ hour+" AND "+second);	
	return new Date(year, (month-1), (day), hour, second);
	
}
function getToDate(op)
{
		//alert('here is op '+ op);
		var year = op.substring(0,4);
		//var mmm = op.substring(5,7);
		var month = op.substring(5,7);
		var day = op.substring(8,10);
		
		return new Date(year, (month-1), (day));
}


