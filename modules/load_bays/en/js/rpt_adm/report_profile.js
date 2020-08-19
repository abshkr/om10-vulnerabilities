var myColumns = ["Report File Name","Report Name","Description", "Type", "Closeout Report", "On-demand Report"];
var displayText = new Array();


displayText['ur_action'] = "YOUR ACTION";
displayText['heading'] = "report administration menu, report profile page";
displayText['rptProfile'] = "report profile";
displayText['rptProfileModify'] = "report profile modify";
displayText['rptProfileAdd'] = "Add A New Report Profile";
displayText['selectSupp'] = "select a supplier";
displayText['nameError'] = "The item has to have a name";
displayText['reportType'] = "Report Type:";
displayText['enterReportCode'] = "Please Enter A Report File Code!";
displayText['addReport'] = "Add New Report Profile";
displayText['reportTypeError'] = "Select A Report Type";
displayText['desc'] = "Description:";
displayText['reportError'] = "Please Enter A Report Name!";
displayText['reportFNameError'] = "Please Enter A Report File Name!";
displayText['reportName'] = "Report Name:";
displayText['reportFile'] = "Report File Name:";
displayText['instructions'] = "Complete and submit the following form to add new report, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory"; 
displayText['modifyReport'] = "Modify Report Profile";
displayText['backReport'] = "Back To Report Profile Page";
displayText['supp_details'] = "supplier details";
displayText['alert'] = "Your input is already existed in Database, OR, Your delete record has children. Please check and input again!";
displayText['daily'] = "DAILY";
displayText['weekly'] ="WEEKLY";
displayText['mnthly'] ="MONTHLY";
var rpt_type_jslst = [
["",""],["D",displayText['daily']], ["W",displayText['weekly']] , ["M",displayText['mnthly']] ];
 //ideally should come from 1 common place
 var items_per_page = 10;
 /********************
  * 2 rrays
  * decide if need to display the
  * print and search buttons or not
  */                    		
		var ops_req_print = [-1, 1,26,28,38,48,36,27,37,47];
		var ops_req_search = [-1, 1,26,28,38,48,36,27,37,47];// search never required on this page		

/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
  var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[26]= "Successfully Updated !"; // insert a new  sub equip Type
    l_opInf[36]= "Update Failed !"; // insert a new  sub equip Type
    l_opInf[27]= "Successfully Inserted New Record !";
    l_opInf[37]= "Insert Failed !";
    l_opInf[38]= "Deleted Failed Check the Database !";
    l_opInf[28]= "Successfully Deleted !";
    l_opInf[48]= "Delet Failed Check the Database !";
    l_opInf[136]= "DB Update Failed Check the Database !";
    l_opInf[137]= "DB Insert Failed Check the Database !";
    l_opInf[138]= "DB Delete FailedCheck the Database !"; 			

function is_ondemand(ondemand_value)
{
    var ONDEMAND_REPORT = 0x01;
    if (ondemand_value & ONDEMAND_REPORT)
        return "Y";
    else
        return "N";
}

function is_closeout(ondemand_value)
{
    var CLOSEOUT_REPORT = 0x02;
    if (ondemand_value & CLOSEOUT_REPORT)
        return "Y";
    else
        return "N";
}

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
	var report_type;
  var newPage = "";
  var pageTitle="";
  var pageHeading="";

  //printHdr function of comm_HTML.js file responsible for 
  //generating all the HTML for the current page
  newPage += printHdr(newPage,updatePageTitle(curViewDetailState,pageTitle), lang);
  //local_HeadrHTML function is local function give 
  // the ability to append any thing to the current page
  newPage += local_HeadrHTML(newPage);
  //getToolBar_HTML function of comm_HTML.js file responsible for  
  // outputting the tool bar
  //controls the search and print buttons as well
  newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
  newPage +="<tr>\n";  
  newPage +="<td width=\"100%\">             \n";
  newPage +="<div class=\"content\" id=\"content\">";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";
  newPage +="\n";
  // start your rows here
  
  if (curViewDetailState >= 47) // handle error from server
  {
	  newPage +="<SCRIPT LANGUAGE=\"JavaScript\">\n";
	  newPage += "alert(" + displayText['alert'] + ")";
	  newPage +="</script>\n";

	  newPage += "<tr>";
	  newPage += "		<td align=\"center\">";

	  newPage += "<form name='add' id='add' method='post'>"
		  newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
	  newPage += "<input type='hidden' name='op' value='7'>\n";  
	  newPage += "</form>";
	//  newPage += "<div class=\'button\'><a href='#' onclick='add.submit()'>";
	//  newPage += ""+displayText['rptProfileAdd']+"</a>&nbsp;";
	newPage += "<div class=\'button\'>&nbsp;";
	  newPage += "</div> <br>";

	  newPage += "		</td>";
	  newPage += "	</tr>";
	  newPage +=displayStatusMsg (op);  

	  if(parseInt(pg)> 0&&parseInt(pagesTotal)!=0)
	  {
		  newPage +=nextPage(pagesTotal, pg,rowsTotal,"report_profile.cgi", "pg");
	  }

	  if( ((myColumns.length)> 0))
	  {

		  newPage += "<tr> \n";
		  newPage += "<td>\n ";
		  newPage += "<div id=\"printReady\">\n" ;
		  newPage += table_begin("M", 0,"");
		  newPage += "<tbody> \n";

		  newPage += "<tr>";

		  for(var i=0; i<myColumns.length; i++)
		  {
			  newPage += "<td>"+myColumns[i]+"<\/td>";
		  }
		  newPage += "<\/tr>";
	  }

	  for(i in report_scheduling_tab)
	  {
		  newPage += "<tr class=\"row1\">\n";
		  if(i>0) 
		  {
			  newPage += "<form name='report"+i+"' method='post' id='report"+i+"'>"
				  for(var j=0; j<myColumns.length; j++)
				  {
					  if(j==0)
					  {					
						  newPage +="<td width='30%'>";
						  newPage +="<table width='100%'>";
						  newPage +="<tr>";
						  newPage += "<td>" + obs(report_scheduling_tab[i][j])+"<\/td>";
						  newPage += "<input type=\'hidden\' name=\'rptFile\' value='"+obs(report_scheduling_tab[i][j])+"'>\n";
						  newPage += "<input type=\'hidden\' name=\'priv\' value='"+priv+"'>\n";
						  newPage += "<input type=\'hidden\' name=\'pg\' value='"+pg+"'>\n";
						  newPage += "<td width='30%'>";


						  newPage += " <select id='op' name='op' onchange = 'submitmyform_own("+i+");' > \n";
						  newPage += "<option value='' selected>-"+displayText['ur_action']+"-</option>";
                                                  if (curPrivilage >=6)
 							  newPage += "<option value='6' >"+commText["Modify"]+"</option>";
                                                  if (curPrivilage >= 8)
  						  	newPage += "<option value='8' >"+commText["Delete"]+"</option>";
						  newPage += "</select>";
						  newPage += "</td>";
						  newPage +="</tr>";
						  newPage +="</table>";
						  newPage += "</td>";

					  }else if (j == 1)
					  {
						  newPage +="<td width='30%' >";
						  newPage += obs(report_scheduling_tab[i][j]);
						  newPage += "<input type=\'hidden\' name=\'rptName\' value='"+obs(report_scheduling_tab[i][j])+"'>\n";
						  newPage += "</td>";
					  }
					  else if(j==2)
					  {
						  newPage += "<td width='30%' >" + obs(report_scheduling_tab[i][j])+"<\/td>";
						  newPage += "<input type=\'hidden\' name=\'rptDesc\' value='"+obs(report_scheduling_tab[i][j])+"'>\n";

					  }else if(j==3)
					  {
						  newPage += "<td width='10%'align='center'>" + obs(report_scheduling_tab[i][j])+"<\/td>";
						  newPage += "<input type=\'hidden\' name=\'rptType\' value='"+obs(report_scheduling_tab[i][j])+"'>\n";					
						  newPage += "</form>";

					  } 
				  }
			  newPage += "\n";
			  newPage += "<\/tr>";
		  }
	  }

	  newPage += "<\/tbody>";

	  newPage += "<\/table>";
	  newPage += "</div>\n" ;
	  newPage += "<\/td>";	
	  newPage += "<\/tr>";

  }
  else if (curPrivilage>=5 &&curViewDetailState <= 1 || curViewDetailState > 10) // view records
  {

	  newPage += "<tr>";
	  newPage += "		<td align=\"center\">";

	  newPage += "<form name='add' id='add' method='post'>"
	  newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
	  newPage += "<input type='hidden' name='op' value='7'>\n";  
	  newPage += "</form>";
	//newPage += "<div class=\'button\'><a href='#' onclick='add.submit()'>";
	//newPage += ""+displayText['rptProfileAdd']+"</a>&nbsp;";
	newPage += "<div class=\'button\'>&nbsp;";
	  newPage += "</div> <br>";  
	  newPage += "		</td>";
	  newPage += "	</tr>";

	  newPage +=displayStatusMsg (op);  

	  if(parseInt(pg)> 0&&parseInt(pagesTotal)!=0)
	  {
		  newPage +=nextPage(pagesTotal, pg,rowsTotal,"report_profile.cgi", "pg");
	  }

	  if( ((myColumns.length)> 0))
	  {

		  newPage += "<tr> \n";
		  newPage += "<td>\n ";
		  newPage += "<div id=\"printReady\">\n" ;
		  newPage += table_begin("M", 1,"");
		  newPage += "<tbody> \n";

		  newPage += "<tr>";

		  for(var i=0; i<myColumns.length; i++)
		  {
			  newPage += "<td>"+myColumns[i]+"<\/td>";
		  }
		  newPage += "<\/tr>";
	  }

	  for(i in report_scheduling_tab)
	  {
		  newPage += "<tr class=\"row1\">\n";
		  if(i>0) 
		  {
			  newPage += "<form name='report"+i+"' method='post' id='report"+i+"'>"
				  for(var j=0; j<myColumns.length; j++)
				  {


					  if(j==0)
					  {					

						  newPage +="<td width='30%'>";
						  newPage +="<table width='100%'>";
						  newPage +="<tr>";

						  newPage += "<td>" + obs(report_scheduling_tab[i][j])+"<\/td>";
						  newPage += "<input type=\'hidden\' name=\'rptFile\' value='"+obs(report_scheduling_tab[i][j])+"'>\n";					
						  newPage += "<input type=\'hidden\' name=\'priv\' value='"+priv+"'>\n";
						  newPage += "<input type=\'hidden\' name=\'pg\' value='"+pg+"'>\n";
						  newPage += "<td width='30%'>";


						  newPage += " <select id='op' name='op' onchange = 'submitmyform_own("+i+");' > \n";
						  newPage += "<option value='' selected>-"+displayText['ur_action']+"-</option>";
						  if (curPrivilage >=6) newPage += "<option value='6' >"+commText["Modify"]+"</option>";
						  if (curPrivilage >=8) newPage += "<option value='8' >"+commText["Delete"]+"</option>";
						  newPage += "</select>";
						  newPage += "</td>";
						  newPage +="</tr>";
						  newPage +="</table>";
						  newPage += "</td>";
					  }else if (j == 1)
					  {
						  newPage +="<td width='30%' >";
						  newPage += obs(report_scheduling_tab[i][j]);
						  newPage += "<input type=\'hidden\' name=\'rptName\' value='"+obs(report_scheduling_tab[i][j])+"'>\n";
						  newPage += "</td>";
					  }
					  else if(j==2)
					  {
						  newPage += "<td width='25%' >" + obs(report_scheduling_tab[i][j])+"<\/td>";
						  newPage += "<input type=\'hidden\' name=\'rptDesc\' value='"+obs(report_scheduling_tab[i][j])+"'>\n";


					  }else if(j==3)
					  {
						  newPage += "<td width='5%'align='center'>" + obs(report_scheduling_tab[i][j])+"<\/td>";
						  newPage += "<input type=\'hidden\' name=\'rptType\' value='"+obs(report_scheduling_tab[i][j])+"'>\n";					
					  }
                    else if(j == 4)
                    {
                        newPage += "<td width='5%'align='center'>" + is_closeout(obs(report_scheduling_tab[i][j]))+"<\/td>";
                        newPage += "<td width='5%'align='center'>" + is_ondemand(obs(report_scheduling_tab[i][j]))+"<\/td>";
                        newPage += "<input type=\'hidden\' name=\'ondemandFlag\' value='"+obs(report_scheduling_tab[i][j])+"'>\n";					
                    }
                    else if(j == 5)
                    {
                        newPage += "<input type=\'hidden\' name=\'OndemandName\' value='"+obs(report_scheduling_tab[i][j])+"'>";
                        newPage += "<input type=\'hidden\' name=\'jasper_file\' value='"+obs(report_scheduling_tab[i][6])+"'>";
                        newPage += "</form>";
                    }   
				  }
			  newPage += "</tr>";
		  }
	  }
	  newPage += "</tbody>";
	  newPage += "</table>";
	  newPage += "</div>\n" ;
	  newPage += "</td>";	
	  newPage += "</tr>";

  }
  else if (curViewDetailState ==6 )
  {
	  newPage +="	<tr>\n";
	  newPage +="		<td align=\"center\">\n";
	  newPage +="			<div class=\"button\">\n";
	  newPage +=  			 btnLocation_HTML("justChaneMyLocation('report_profile.cgi?op=1&pg="+pg+"&priv="+priv+"'); ", displayText['backReport']);

	  newPage +="			</div>\n";
	  newPage +="			  <br>\n";
	  newPage +="		</td>\n";
	  newPage +="	</tr>\n";
	  newPage += fieldst_HTML(displayText['modifyReport']);
	  newPage += " <div class=\"adminform\">\n";
	  newPage +="<table width=\"100%\">\n";
	  newPage +=infotextRow_HTML(" width=\"100%\" ",displayText['instructions']);
	  newPage +="				<form name=\"mod_rpt\" id=\"mod_rpt\"  method='post' onsubmit='return Validator.Validate(this,1)'>\n";
	  newPage +="						<tr>\n";
	  newPage +="									<td class=\"infotext\" width=\"100%\">\n";
	  newPage +="										<table width=\"100%\">\n";
	  newPage +="											<tr>								\n";
	  newPage +="												<td width=\"50%\">\n";
	  newPage +="													<table>\n";
	  newPage +="														<tr>\n";
	  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",displayText['reportFile']);
	  newPage +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			  "<span class=\"mandatory\">*</span>\n");
	  newPage +="															<td class=\"infotext\">\n";
	  newPage += rptFile;
	  newPage += "<input type='hidden' name='rptFile' value='"+rptFile+"'>\n";
	  newPage += "<input type=\"hidden\" name=\"op\" value=\"16\">\n";
	  newPage += "<input type=\'hidden\' name=\'pg\' value='"+pg+"'>\n"; 
	  newPage += "<input type='hidden' name='priv' value='"+priv+"'>\n";
	  newPage +="															</td>\n";
	  newPage +="														</tr>\n";
	  newPage +="													</table>\n";

	  newPage +="									      </td>\n";
	  newPage +="												<td width=\"50%\">\n";
        newPage += "<table><tr>";
        newPage += textTd_HTML(" class=\"infotextheading\" width=\"140\" ", "Source Report Name:");
        newPage += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "<span class=\"mandatory\">*</span>\n");
        newPage += "<td>";
        newPage += "<input type='text' name='jasper_file' id='jasper_file' size='30' maxlength='40' value = '"+jasper_file+"' dataType='Require' msg='"+ displayText['reportError'] +"' />\n";
        newPage += "</td>";
        newPage += "</tr></table>\n";
	  newPage +="									   </td>\n";

	  newPage +="								    </tr>\n";

	  // 2nd Row
	  newPage +="								    <tr>\n";
	  newPage +="										<td width=\"50%\">\n";
	  newPage +="													<table>\n";
	  newPage +="														<tr>\n";      
	  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",displayText['reportName']);
	  newPage +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			  "<span class=\"mandatory\">*</span>\n");
	  newPage +="															<td>\n";

	  newPage +="                                <input type='text' name='rptName' id='rptName' size='30' maxlength='40' value = '"+rptName+"' dataType='Require' msg='"+ displayText['reportError'] +"' />\n";

	  newPage +="															</td>\n";  	    

	  newPage +="														</tr>\n";
	  newPage +="													</table>\n";
	  newPage +="									   </td>\n";
	  newPage +="										 <td width=\"50%\">\n";
	  newPage +="													<table>\n";
	  newPage +="														<tr>\n";      
	  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",displayText['desc']);
	  newPage +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			  "&nbsp;\n");
	  newPage +="															<td>\n";
	  if(rptDesc== -1)
	  {
		  newPage +="                             <input  type='text'  maxlength='80' size='30' name='rptDesc' id='rptDesc' >\n";

	  }else{
		  newPage +="                             <input  type='text'  maxlength='80' size='30' name='rptDesc' id='rptDesc' value='"+rptDesc+"' >\n";

	  }
	  newPage +="															</td>\n";  	    
	  newPage +="														</tr>\n";
	  newPage +="													</table>\n";

	  newPage +="									   </td>\n";

	  newPage +="								    </tr>\n";

	  // End of 2nd Row

	  // 3rd Row
	  newPage +="								    <tr>\n";
	  newPage +="										<td width=\"50%\">\n";
	  newPage +="													<table>\n";
	  newPage +="														<tr>\n";      
	  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",displayText['reportType']);
	  newPage +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			  "<span class=\"mandatory\"></span>\n");
	  newPage +="															<td>\n";



	  newPage += "       <select id=\"rptType\" name=\"rptType\" class=\"smallselect\" msg=\""+displayText['reportTypeError']+"\"> \n";

	  newPage += displayDropList(rptType, rpt_type_jslst,displayText['reportTypeError']);

	  

	  newPage +="															</td>\n";  	    

	  newPage +="														</tr>\n";
	  newPage +="													</table>\n";
	  newPage +="									   </td>\n";
	  newPage +="										 <td width=\"50%\">\n";

        newPage +="<table><tr>";
        newPage += "<td class=\"infotextheading\" width=\"140\">" + "Closeout Report:" + "</td>";
        newPage += "<td width=\"5\" align=\"center class=\"infotext\">" + "&nbsp;</td>";
        if (is_closeout(ondemandFlag) == "Y")
            newPage +="<td><input  type='checkbox'  name='is_closeout' value='yes' checked></td>";  	    
        else
            newPage +="<td><input  type='checkbox'  name='is_closeout' value='yes' ></td>";
        newPage +="</tr></table>";

	  newPage +="									   </td>\n";

	  newPage +="								    </tr>\n";

        newPage += "<tr>";
        newPage += "<td width=\"50%\"><table><tr>";
        newPage += "<td class=\"infotextheading\" width=\"140\">" + "On-demand Report" + "</td>";
        newPage += "<td width=\"5\" align=\"center class=\"infotext\">" + "&nbsp;</td>";
        if (is_ondemand(ondemandFlag) == "Y")
            newPage += "<td><input  type='checkbox' name='is_ondemand' value='yes' onClick=\"document.getElementById('OndemandName').disabled = !this.checked;\" checked></td>";
        else
            newPage += "<td><input  type='checkbox' name='is_ondemand' value='yes' onClick=\"document.getElementById('OndemandName').disabled = !this.checked;\"></td>";
        newPage += "</tr></table></td>";
        
        newPage += "<td width=\"50%\"><table><tr>";
        newPage += "<td class=\"infotextheading\" width=\"140\">" + "On-demand Name:" + "</td>";
        newPage += "<td width=\"5\" align=\"center class=\"infotext\">" + "&nbsp;</td>";
        if (is_ondemand(ondemandFlag) == "Y")
            newPage += "<td><input type='text' maxlength='40' size='30' name='OndemandName' value='" + ondemand_title + "' id='OndemandName'></td>";
        else
            newPage += "<td><input type='text' maxlength='40' size='30' name='OndemandName' value='" + ondemand_title + "' id='OndemandName' disabled></td>";
        newPage += "</tr></table></td>";
        newPage += "</tr>";

	  // End of 3rd Row
	  newPage +="								    </table>\n";
	  newPage +=frmButtRow_HTML(commBtnText["Modify"], 1);

	  newPage +="							   </td>\n";
	  newPage +="							 </tr>\n";
	  newPage +="							</table>\n";
	  newPage += "            </div>\n";  
	  newPage += "                    </form>\n";                      
	  newPage += fieldstFoot_HTML();

  }
  else if(curViewDetailState ==7)    //Add a new report profile
  {
	  newPage +="	<tr>\n";
	  newPage +="		<td align=\"center\">\n";
	  newPage +="			<div class=\"button\">\n";
	  newPage +=  			 btnLocation_HTML("justChaneMyLocation('report_profile.cgi?op=1&pg="+pg+"&priv="+priv+"'); ", displayText['backReport']); 

	  newPage +="			</div>\n";
	  newPage +="			  <br>\n";
	  newPage +="		</td>\n";
	  newPage +="	</tr>\n";
	  newPage += fieldst_HTML(displayText['addReport']);
	  newPage += " <div class=\"adminform\">\n";
	  newPage +="<table width=\"100%\">\n";
	  newPage +=infotextRow_HTML(" width=\"100%\" ",displayText['instructions']);
	  newPage +="				<form name=\"add_rpt\" id=\"add_rpt\" method='post' onsubmit='return Validator.Validate(this,1)'>\n";
	  newPage +="						<tr>\n";
	  newPage +="									<td class=\"infotext\" width=\"100%\">\n";
	  newPage +="										<table width=\"100%\">\n";
	  newPage +="											<tr>								\n";
	  newPage +="												<td width=\"50%\">\n";
	  newPage +="													<table>\n";
	  newPage +="														<tr>\n";
	  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[0]+" :");
	  newPage +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			  "<span class=\"mandatory\">*</span>\n");
	  newPage +="															<td>\n";
	  newPage +="                                <input type=\"text\" name=\"rptFile\" id=\"rptFile\" size=\"30\" dataType=\"Require\" maxLength=\"30\" msg=\"" + displayText['reportFNameError'] + "\" />\n";
	  newPage +="															</td>\n";
	  newPage +="														</tr>\n";
	  newPage +="													</table>\n";

	  newPage +="									      </td>\n";
	  newPage +="												<td width=\"50%\">\n";

          newPage += "<table><tr>";
          newPage += textTd_HTML(" class=\"infotextheading\" width=\"140\" ", "Source Report Name:");
          newPage += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "<span class=\"mandatory\">*</span>\n");
          newPage += "<td>";
          newPage += "<input type=\"text\" name=\"jasper_file\" id=\"jasper_file\" size=\"30\" maxlength='40' dataType=\"Require\" msg=\"" + displayText['reportError']+ "\" />\n";
          newPage += "</td>";
          newPage +="</tr></table>";

	  newPage +="									   </td>\n";

	  newPage +="								    </tr>\n";

	  // 2nd Row
	  newPage += "<tr>";
	  newPage += "<td width=\"50%\">\n";
          newPage += "<table><tr>";
          newPage += textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[1]+" :");
          newPage += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "<span class=\"mandatory\">*</span>\n");
          newPage += "<td>";
          newPage += "<input type=\"text\" name=\"rptName\" id=\"rptName\" size=\"30\" maxlength='40' dataType=\"Require\" msg=\"" + displayText['reportError']+ "\" />\n";
          newPage += "</td>";
          newPage +="</tr></table>";          
	  newPage +="									   </td>\n";
	  newPage +="										 <td width=\"50%\">\n";
          newPage += "<table><tr>";
          newPage += textTd_HTML(" class=\"infotextheading\" width=\"140\" ", displayText['desc']);
          newPage += textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "&nbsp;");
          newPage += "<td>";
          newPage +="                                <input type=\"text\" name=\"rptDesc\" id=\"rptDesc\" size=\"30\" maxlength='40' msg=\"" + displayText['reportError']+ "\" />\n";
          newPage +="                                                                                                                   </td>\n";
          newPage +="                                                                                                           </tr>\n";
          newPage +="                                                                                                   </table>\n";
	  newPage +="									   </td>\n";

	  newPage +="								    </tr>\n";

	  // End of 2nd Row

	  // 3rd Row
	  newPage +="								    <tr>\n";
	  newPage +="										<td width=\"50%\">\n";
         newPage += "<table><tr>";
          newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", displayText['reportType']);
          newPage +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ", "<span class=\"mandatory\"></span>\n");
          newPage +="                                                                                                                   <td>\n";
          newPage += "       <select id=\"rptType\" name=\"rptType\" class=\"smallselect\" msg=\""+displayText['reportTypeError']+"\"> \n";
           newPage += displayDropList(rptType, rpt_type_jslst,displayText['reportTypeError']);
            newPage += "<input type=\"hidden\" name=\"op\" value=\"17\">\n";
            newPage += "<input type=\'hidden\' name=\'pg\' value='"+pg+"'>\n";
            newPage += "<input type='hidden' name='priv' value='"+priv+"'>\n";
          newPage +="                                                                                                                   </td>\n";
          newPage += "</tr></table>";
	  newPage +="									   </td>\n";
	  newPage +="										 <td width=\"50%\">\n";
         newPage +="<table><tr>";
        newPage += "<td class=\"infotextheading\" width=\"140\">" + "Closeout Report:" + "</td>";
        newPage += "<td width=\"5\" align=\"center class=\"infotext\">" + "&nbsp;</td>";
        if (is_closeout(ondemandFlag) == "Y")
            newPage +="<td><input  type='checkbox'  name='is_closeout' value='yes' checked></td>";
        else
            newPage +="<td><input  type='checkbox'  name='is_closeout' value='yes' ></td>";
        newPage +="</tr></table>";
        newPage +="									   </td>\n";
        newPage +="                                                               </tr>\n";

        newPage += "<tr><td  width=\"50%\">";
        newPage += "<table><tr>";
        newPage += "<td class=\"infotextheading\" width=\"140\">" + "On-demand Report" + "</td>";
        newPage += "<td width=\"5\" align=\"center class=\"infotext\">" + "&nbsp;</td>";
        if (is_ondemand(ondemandFlag) == "Y")
            newPage += "<td><input  type='checkbox' name='is_ondemand' value='yes' onClick=\"document.getElementById('OndemandName').disabled = !this.checked;\" checked></td>";
        else
            newPage += "<td><input  type='checkbox' name='is_ondemand' value='yes' onClick=\"document.getElementById('OndemandName').disabled = !this.checked;\"></td>";
        newPage += "</tr></table>";
        newPage += "</td>";
        
        newPage += "<td width=\"50%\">";
        newPage += "<table><tr>";
        newPage += "<td class=\"infotextheading\" width=\"140\">" + "On-demand Name:" + "</td>";
        newPage += "<td width=\"5\" align=\"center class=\"infotext\">" + "&nbsp;</td>";
        newPage += "<td><input type='text' maxlength='40' size='30' name='OndemandName' id='OndemandName'></td>";
        newPage += "</tr></table>";
        newPage += "</td></tr>";

	  // End of 3rd Row
	  newPage +="								    </table>\n";
	  newPage +=frmButtRow_HTML(commBtnText["Add"], 1);

	  newPage +="							   </td>\n";
	  newPage +="							 </tr>\n";
	  newPage +="							</table>\n";
	  newPage += "                    </form>\n";                      
	  newPage += fieldstFoot_HTML();

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
//  newPage +="</div>";
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


function displayGlblFrm()
{
  var glblFrm = "";
  glblFrm += fieldst_HTML(displayText['supp_details']);
  glblFrm += "<form name=\"glblFrm\" id=\"glblFrm\">\n";
  glblFrm += "<input type=\"hidden\" name=\"op\" value=\"1\">\n";
  glblFrm += "<input type=\"hidden\" name=\"pg\" value=\"1\">\n";
  glblFrm += " <div class=\"adminform\">\n";
//  glblFrm +="Select Supplier to view \n";
  glblFrm += "<table>\n";
  glblFrm += "<tr>\n";
  glblFrm += "<td class=\"infotextheading\">\n";
  glblFrm += "Supplier:\n";
  glblFrm += "</td>\n";
  glblFrm += "<td>\n";
  glblFrm += "<select id=\"cmpy_typ_id\" name=\"cmpy_typ_id\" onchange=\"submit();\"> \n";
  glblFrm += displayDropList_sp(cmpy_typ_id, cmpy_jslst,displayText['selectSupp']);
  glblFrm += "</td>\n";
  glblFrm += "</tr>\n";
  glblFrm += "</table>\n";
  glblFrm += "\n";
  glblFrm += "</div>\n";
  glblFrm += "</form>\n";
  glblFrm += "</td>\n";
  glblFrm += "</tr>\n";

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
  if (op <= 1 || op > 10)
  {
    pageHeading +=displayText['rptProfile'];
  }else if(op==6)
  {
  	pageHeading +=displayText['rptProfileModify'];
  	
  }else if(op==7)
  {
  	pageHeading +=displayText['rptProfileAdd'];
  }
  return pageHeading;   
}


function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;  
  pageTitle +=displayText['heading']; 
  return pageTitle;
}


function update_page(element)
{
	var selectedValue;
	var selectedIndex;
	var mass_unit_list;
	var vol_unit_list;

	selectedIndex = element.selectedIndex;
	selectedValue=element.options[selectedIndex].value
	alert(selectedValue);

	if(selectedValue!='kgram2kgram'&&
		selectedValue!='kgram2pound'&&
		selectedValue!='kgram2imp_ton'&&
		selectedValue!='kgram2ton'&&
		selectedValue!='selected')
	{
		volume = selectedValue;
		renderPage('0', 'name', 0, 'loaded',8,selectedValue);
	}
	else
	{
		if(selectedValue!='selected')
		{
			mass = selectedValue;
			renderPage('0', 'name', 0, 'loaded',8,selectedValue);
		}
		else
		{
			renderPage('0', 'name', 0, 'loaded',8,selectedValue);
		}
	}
}



function displayDropList_sp(selectedvalue, list,defMsg)
{
  var massList = "";
  var matchFound=0;
//  var j=0;

  for (i=0; i<list.length; i++)
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
/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ nextPage] 
[PURPOSE]  		-> 	Responsible for displaying the HTML for the next page
                  links and use the btnLocation_HTML and btnLocation_HTML_nexPreLk
                  functions to display the URL and use the 
                  justChaneMyLocation javascript function to carry the variables
                  to the next page
          
[Parameter]  	-> totalPages integer Total number of pages for this display
              -> curPg integer current page number user is looking at
              -> curPgName string is the CGI file name user browsing
              -> curPgVarName string is variable like pg we have in all the scripts
                 but if page is multilevel this variable change e.g on 
                 delivery location this variable is pg_3
[AUTHOR]  		-> Abdul Shakoor (DKI) Sepetember 27, 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function nextPage(totalPages, curPg,totalRows, curPgName, curPgVarName)
{
  //alert("nextPage been called");
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
	
	// start putting HTML string in the 
  // nextPgHTML variable
	var nextPgHTML = "";
	nextPgHTML += "<tr> \n";
	nextPgHTML += "<td align=\"center\" class=\"nextPageLink\">\n ";
	
	// if the page number is not 1 that means user is not on page 
  // display the previous page link and a link to the
  // first page as well on the page looks like this <<  <
	if (!(page_number == 1)) 
  {
    //$html_output .= "<a href=\"" . $url . "?page_number=1" . $query_string . "\"><b>&lt;&lt;</b></a>";
    nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) + "&pg='+pg+''); ", "&lt;&lt;");
		foobar = page_number - 1;
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		 nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&pg='+pg+''); ", "<b>&lt;<\/b>");
		
	}
  else 
  {
		nextPgHTML += "<b>&lt;&lt;</b>&nbsp;&nbsp;<b>&lt;</b>";
	} 
  // if number of block are more than 1
  // that means there more than 20 or 30 page
  // for easy pagination can make the blocks of pages  
  // display the previous page link and a link to the
  //   on the page looks like this [ 31-40  41-50  51-60]
  if (block_number > 0) 
  {
		nextPgHTML += "&nbsp;&nbsp;<b>[</b>";
		for (var i=0; i<(block_number); i++) 
    {
			var foobar1 = i*block_size + 1;	// page number to be linked
			var foobar2 = (i+1)*block_size;
			//$html_output .= "&nbsp;<a href=\"" . $url . "?page_number=" . $foobar1 . $query_string . "\">" . $foobar1 . "-" . $foobar2 . "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&pg='+pg+''); ", foobar1 + "-" + foobar2);
		}
		nextPgHTML += "<b>]</b>";
	}

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
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&pg='+pg+''); ", i);
	}
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	for (var i=page_number+1; i<foobar2; i++) 
  {
    //alert("I am in for for foobar2 loop "+i);	
    nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&pg='+pg+''); ", i);
	}
	// if number of block are more than 1
  // that means there more than 20 or 30 page
  // for easy pagination can make the blocks of pages  
  // display the previous page link and a link to the
  //   on the page looks like this [ 31-40  41-50  51-60]	
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&pg='+pg+''); ", tempTxt);
		}
		nextPgHTML += "<b>]</b>";
	}
  // if the page number is not equal to total num of pages
  // that means we can dispay the link to the next page
  // and the last pge
  // link looks like this > >>
	if (!(page_number == num_pages)) 
  {
		foobar = page_number + 1;
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&pg='+pg+''); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) + "&pg='+pg+''); ", "<b>&gt;&gt;<\/b>");
	} else {
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}

	/*
  if (curPg > 1)
	{
		
    //nextPgHTML +="<a href=\"javascript:document.glblFrm.pg.value="+(curPg-1)+";document.glblFrm.op.value=0;document.glblFrm.submit();\">Previous</a>\n";
   //		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg-1) + "' );\">Previous</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg-1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", otherText["btn_prev_page"]);
	}

	nextPgHTML += "&nbsp; Current=" + curPg + "/" + totalPages + " &nbsp; ";
	if (totalPages > curPg)
	{
//		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg+1) + "' );\">Next</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg+1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", "&lt;&lt;");
	}
  */
	nextPgHTML += "</td>\n ";
	nextPgHTML += "</tr> \n";

	return nextPgHTML;
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


function local_HeadrHTML(newPage)
{
  newPage +="<SCRIPT LANGUAGE=\"JavaScript\">\n";
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
  newPage +="if(confirm('Are you sure you want to delete?'))";
  newPage +="{";
  newPage+="document.forms[form_number].submit();\n";
  newPage+="	}else{\n";  
  newPage+="document.forms[form_number].reset();\n";  
  newPage+="	}\n";   
  newPage+="	}\n";  
//  newPage +="document.forms[parseInt(form_number)].submit();\n";  
  newPage +="}\n";
  
  newPage +="function submitmyform()\n";
  newPage +="{\n";
  newPage +="if((document.forms[1].rptActive.checked))";
  newPage +="{";
//  newPage +="alert(document.forms[1].rptActive.value);";
  newPage +="document.forms[1].rptActive.value='Y';";
  newPage+="document.forms[1].submit();\n";
  newPage+="	}\n";
  newPage +="else{";
//  newPage +="alert('qqq');";
  newPage +="document.forms[1].rptActive.value='N';";
  newPage +="document.forms[1].rptActive.checked = true;";  
  newPage+="		document.forms[1].submit();\n";
  newPage +="}\n";
  newPage +="}\n";
  
  newPage +="</script>\n";
  return (newPage);
}
