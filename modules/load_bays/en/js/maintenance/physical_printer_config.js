var myColumns = [ "Logical Printer",	"System/Physical Printer",	"Lock",	"Area ID",	"Area Location" ];
var otherText = new Array()
otherText["youraction"] =  "YOUR ACTION";
otherText["confirm_msg"] =  "Are you sure you want to delete ?"; 
otherText["btn_addNew_printer"] =  "Add New Printer";
otherText["btn_mod_printer"] =  "Modify Printer";
otherText["msg_cmpltFrm"] = "Complete and submit the following form, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
otherText["msg_enter_physPrint"] = "Enter Physical Printer name!";
otherText["msg_enter_logPrint"] = "Enter Logical Printer name starting with P0!";
otherText["fieldMsg_mod_printer"] = "Modify Physical Printer Settings";
otherText["fieldMsg_addNew_printer"] = "Add New Physical Printer Settings";
otherText["msg_sel_printArea"] = "Select Printer Area Location";

otherText["logic_printer"] = myColumns[0];
otherText["physic_printer"] = myColumns[1];
otherText["printer_lock"] = myColumns[2];
otherText["printer_area"] = myColumns[4];
otherText["fieldMsg_addNew_printer"] = "Add New Physical Printer";
otherText["btn_backto_printer"] = "Back To Printer List Page";
otherText["msg_logPrintUsed"] = "Error: Invalid input! printer already in use. Please check your input and try again!";
otherText["pgHead"] =  "physical printers";
otherText["pgHead_add"] =  "add a new physical printer";
otherText["pgHead_mod"] =  "modify physical printer settings";
otherText["pgTitle"] =  "Maintenance, physical printers";

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
    l_opInf[27]= "Successfully Inserted New Record";
    l_opInf[37]= "Insert Failed!";
    l_opInf[38]= "Deleted Failed!";
    l_opInf[28]= "Successfully Deleted!";
    l_opInf[48]= "Deleted Failed!";
    l_opInf[136]= "DB Update Failed!";
    l_opInf[137]= "DB Insert Failed!";
    l_opInf[138]= "DB Delete Failed!";  
    	
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
  newPage +="<div class=\"content\" id=\"content\">\n";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";  
  
  if (curViewDetailState >= 47) // handle error from server
  {
    newPage +="<SCRIPT LANGUAGE=\"JavaScript\">\n";
    newPage += alert(otherText["msg_logPrintUsed"]);
    newPage +="</script>\n";
    newPage += "<tr>";
    newPage += "		<td align=\"center\">";
  
    
    newPage += "<form name='add' id='add' method='get'>"
    newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
    newPage += "<input type='hidden' name='priv' value='"+priv+"'>\n";
    newPage += "<input type='hidden' name='op' value='7'>\n";
   
    newPage += "</form>";
    newPage += "<div class=\'button\'><a href='#' onclick='add.submit()'>";
    newPage += ""+otherText["btn_addNew_printer"]+"</a>&nbsp;";
    newPage += "</div> <br>";
  
    newPage += "		</td>";
    newPage += "	</tr>";
    
  newPage +=displayStatusMsg (op); 
  
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
  
  	for(i in printer_config_tab)
  	{
  		newPage += "<tr class=\"row1\">\n";
  		if(i>0) 
  		{
  				newPage += "<form name='printer"+i+"' id='printer"+i+"'method = 'get'>"
  			for(var j=0; j<myColumns.length; j++)
  			{
  				
  				
  				if (j == 0)
  				{
  					newPage +="<td width='20%'>";
        		newPage +="<table width='100%'>";
        		newPage +="<tr>";
  //      		newPage += "<form name='rpt"+i+"' id='rpt"+i+"'>"
  					newPage += "<td align='center'>" + obs(printer_config_tab[i][j])+"</td>";
  					newPage += "<input type='hidden' name='prtPrinter\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  //				}else if(j==1)
  //				{	
  //					newPage += obs(printer_config_tab[i][j])+"<\/td>";
        		newPage += "<td width='30%'>";
  
        		newPage += " <select id='op' name='op' onchange = 'submitmyform_own("+i+");' > \n";
        		newPage += "<option value='' selected>-"+otherText["youraction"]+"-</option>";
  //      		newPage += "<option value='7' >-ADD-</option>";
        		newPage += "<option value='6' >"+commText["Modify"]+"</option>";
        		newPage += "<option value='8' >"+commText["Delete"]+"</option>";
  					newPage += "</select>";
  					newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
  					newPage += "<input type='hidden' name='priv' value='"+priv+"'>\n";
        		newPage += "</td>";
        		newPage +="</tr>";
        		newPage +="</table>";
        		newPage += "</td>";
  				}
  				else if(j==1)
  				{
  					newPage += "<td width='20%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
  					newPage += "<input type=\'hidden\' name=\'phyPrinter\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  				}
  				else if(j==2)
  				{
  					//newPage += "<td width='20%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
					
  					newPage += "<td width='20%' align='center'>";
					if (printer_config_tab[i][j] == 'Y')
					{
						newPage +=  "<center><img src=\"/images/padlock_lock.gif\" alt=\"Yes\" title=\"Yes\"></center>";
					}
					else
					{
						newPage +=  "<center><img src=\"/images/padlock_unlock.gif\" alt=\"Yes\" title=\"Yes\"></center>";
					}
  					newPage += "<\/td>";
  					newPage += "<input type=\'hidden\' name=\'printerLock\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  				}
  				else if(j==3)
  				{
  					newPage += "<td width='20%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
  					newPage += "<input type=\'hidden\' name=\'printerArea\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  				}
  				else if(j==4)
  				{
  					newPage += "<td width='20%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
  				}
			}
  			newPage += "</form>";
  			newPage += "\n";
  			newPage += "<\/tr>";
       }
  	}
      
  	newPage += "<\/tbody>";
  
  	newPage += "<\/table>";
  	newPage += "</div>\n" ;
  	newPage += "<\/td>";	
  	newPage += "<\/tr>";
  } //end if when currentViewState was 47) // handle error from server
  else if (curPrivilage>=5&&curViewDetailState <= 1) // view records
  {
     
  	newPage += "<tr>";
    newPage += "		<td align=\"center\">";
  
    
    newPage += "<form name='add' id='add' method='get'>"
  
    newPage += "<input type='hidden' name='op' value='7'>\n";
  
    newPage += "</form>";
    newPage += "<div class=\'button\'>"
    if (curPrivilage >= 7)
        newPage += "<a href='#' onclick='add.submit()'>"+otherText["btn_addNew_printer"]+"</a>&nbsp;";
    newPage += "</div> <br>";
  /*********	this part should be commented if implemented access ctrl!*****/	
  
    newPage += "		</td>";
    newPage += "	</tr>";
    
    newPage +=displayStatusMsg (op); 
    
  /*    if(parseInt(pg)> 0&&parseInt(pagesTotal)!=0)
    {
    	newPage +=nextPage(pagesTotal, pg,rowsTotal,"printer_config.cgi", "pg");
  	}*/
  
  
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
  
  	for(i in printer_config_tab)
  	{
  		newPage += "<tr class=\"row1\">\n";
  		if(i>0) 
  		{
  				newPage += "<form name='printer"+i+"' id='printer"+i+"'method = 'post'>"
  			for(var j=0; j<myColumns.length; j++)
  			{
  				
  				
  				if (j == 0)
  				{
  					newPage +="<td width='20%'>";
        		newPage +="<table width='100%'>";
        		newPage +="<tr>";
  //      		newPage += "<form name='rpt"+i+"' id='rpt"+i+"'>"
  					newPage += "<td align='center'>" + obs(printer_config_tab[i][j])+"</td>";
  					newPage += "<input type='hidden' name='prtPrinter\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  //				}else if(j==1)
  //				{	
  //					newPage += obs(printer_config_tab[i][j])+"<\/td>";
        		newPage += "<td width='30%'>";
  
  /****** this part should be commented if implemented access ctrl!****/
        		newPage += " <select id='op' name='op' onchange = 'submitmyform_own("+i+");' > \n";
        		newPage += "<option value='' selected>-"+otherText["youraction"]+"-</option>";
  //      		newPage += "<option value='7' >-ADD-</option>";
                        switch (curPrivilage)
                {
                    case 8:
                        newPage += "<option value='8' >"+commText["Delete"]+"</option>";
                    case 7:
                    case 6:
                        newPage += "<option value='6' >"+commText["Modify"]+"</option>";
                        break;
        		}
  					newPage += "</select>";
  //					newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
  
  /*********	this part should be commented if implemented access ctrl!*****/				
  					
  					
  //			    newPage += "</form>";
        		newPage += "</td>";
        		newPage +="</tr>";
        		newPage +="</table>";
        		newPage += "</td>";
  				}
  				else if(j==1)
  				{
  					newPage += "<td width='20%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
  					newPage += "<input type=\'hidden\' name=\'phyPrinter\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  				}
  				else if(j==2)
  				{
  					//newPage += "<td width='20%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
					
  					newPage += "<td width='20%' align='center'>";
					if (printer_config_tab[i][j] == 'Y')
					{
						newPage +=  "<center><img src=\"/images/padlock_lock.gif\" alt=\"Yes\" title=\"Yes\"></center>";
					}
					else
					{
						newPage +=  "<center><img src=\"/images/padlock_unlock.gif\" alt=\"Yes\" title=\"Yes\"></center>";
					}
  					newPage += "<\/td>";
  					newPage += "<input type=\'hidden\' name=\'printerLock\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  				}
  				else if(j==3)
  				{
  					newPage += "<td width='20%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
  					newPage += "<input type=\'hidden\' name=\'printerArea\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  				}
  				else if(j==4)
  				{
  					newPage += "<td width='20%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
  				}
			}
  			newPage += "</form>";
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
  else if (curPrivilage>=6&&curViewDetailState <= 1 || curViewDetailState > 10) // modify records
  {
     
  	newPage += "<tr>";
    newPage += "		<td align=\"center\">";
  
    
    newPage += "<form name='add' id='add' method='post'>"
  //  newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
    newPage += "<input type='hidden' name='op' value='7'>\n";
    newPage += "<input type='hidden' name='priv' value='"+priv+"'>\n";
  /*********	this part should be commented if implemented access ctrl!*****/	
  //  
    newPage += "</form>";
    newPage += "<div class=\'button\'><a href='#' onclick='add.submit()'>";
    newPage += ""+otherText["btn_addNew_printer"]+"</a>&nbsp;";
    newPage += "</div> <br>";
  /*********	this part should be commented if implemented access ctrl!*****/	
  
    newPage += "		</td>";
    newPage += "	</tr>";
    
    newPage +=displayStatusMsg (op); 
    
  /*    if(parseInt(pg)> 0&&parseInt(pagesTotal)!=0)
    {
    	newPage +=nextPage(pagesTotal, pg,rowsTotal,"printer_config.cgi", "pg");
  	}*/
  
  
  	if( ((myColumns.length)> 0))
  	{
  		
  		newPage += "<tr> \n";
  		newPage += "<td>\n ";
  		newPage += "<div id=\"printReady\">\n" ;
  		newPage += table_begin("M", 2,"");
  		newPage += "<tbody> \n";
  
  		newPage += "<tr>";
  
  		for(var i=0; i<myColumns.length; i++)
  		{
  			newPage += "<td>"+myColumns[i]+"<\/td>";
  		}
       		newPage += "<\/tr>";
  	}
  
  	for(i in printer_config_tab)
  	{
  		newPage += "<tr class=\"row1\">\n";
  		if(i>0) 
  		{
  				newPage += "<form name='printer"+i+"' id='printer"+i+"'method = 'get'>"
  			for(var j=0; j<myColumns.length; j++)
  			{
  				
  				
  				if (j == 0)
  				{
  					newPage +="<td width='20%'>";
        		newPage +="<table width='100%'>";
        		newPage +="<tr>";
  //      		newPage += "<form name='rpt"+i+"' id='rpt"+i+"'>"
  					newPage += "<td align='center'>" + obs(printer_config_tab[i][j])+"</td>";
  					newPage += "<input type='hidden' name='prtPrinter\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  
        		newPage += "<td width='30%'>";
  
        		newPage += " <select id='op' name='op' onchange = 'submitmyform_own("+i+");' > \n";
        		newPage += "<option value='' selected>"+otherText["youraction"]+"</option>";
  //      		newPage += "<option value='7' >-ADD-</option>";
        		newPage += "<option value='6' >"+commText["Modify"]+"</option>";
        		newPage += "<option value='8' >"+commText["Delete"]+"</option>";
  					newPage += "</select>";
  //					newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
  					newPage += "<input type='hidden' name='priv' value='"+priv+"'>\n";
        		newPage += "</td>";
        		newPage +="</tr>";
        		newPage +="</table>";
        		newPage += "</td>";
  				}
  				else if(j==1)
  				{
  					newPage += "<td width='20%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
  					newPage += "<input type=\'hidden\' name=\'phyPrinter\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  				}
  				else if(j==2)
  				{
  					//newPage += "<td width='20%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
					
  					newPage += "<td width='20%'align='center'>";
					if (printer_config_tab[i][j] == 'Y')
					{
						newPage +=  "<center><img src=\"/images/padlock_lock.gif\" alt=\"Yes\" title=\"Yes\"></center>";
					}
					else
					{
						newPage +=  "<center><img src=\"/images/padlock_unlock.gif\" alt=\"Yes\" title=\"Yes\"></center>";
					}
  					newPage += "<\/td>";
  					newPage += "<input type=\'hidden\' name=\'printerLock\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  				}
  				else if(j==3)
  				{
  					newPage += "<td width='20%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
  					newPage += "<input type=\'hidden\' name=\'printerArea\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  				}
  				else if(j==4)
  				{
  					newPage += "<td width='20%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
  				}
			}
  			newPage += "</form>";
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
  else if (curViewDetailState ==6 )
  {
  	  
  	  
  	  newPage +="	<tr>\n";
      newPage +="		<td align=\"center\">\n";
      newPage +="			<div class=\"button\">\n";
      newPage +=  			 btnLocation_HTML("justChaneMyLocation('physical_printer_config.cgi?op=1'); ",otherText["btn_backto_printer"]);
      	    
      newPage +="			</div>\n";
      newPage +="			  <br>\n";
      newPage +="		</td>\n";
      newPage +="	</tr>\n";
      newPage += fieldst_HTML(otherText["fieldMsg_mod_printer"]);
      newPage += " <div class=\"adminform\">\n";
  	  newPage +="<table width=\"100%\">\n";
  	  newPage +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_cmpltFrm"]); 
  	  newPage +="				<form name=\"mod_prt\" id=\"mod_prt\" method=\"post\" onsubmit='return Validator.Validate(this,1)'>\n";
  	  newPage +="						<tr>\n";
  	  newPage +="									<td class=\"infotext\" width=\"100%\">\n";
  	  newPage +="										<table width=\"100%\">\n";
  
  
  	  newPage +="											<tr>								\n";
  	  newPage +="												<td width=\"50%\">\n";
  	  newPage +="													<table>\n";
  	  newPage +="														<tr>\n";
  	  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",""+myColumns[0]+":");
  	  newPage +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
  	      	    "<span class=\"mandatory\">*</span>\n");
  	  newPage +="															<td class=\"infotext\">\n";
  		newPage += prtPrinter;
  		newPage += "<input type=\"hidden\" name=\"op\" value=\"16\">\n";	
  		newPage += "<input type='hidden' name='priv' value='"+priv+"'>\n";					
  //					  newPage += "<input type='hidden' name='cmpy_typ_id' value='"+cmpy_typ_id+"'>\n";
  	  newPage += "<input type='hidden' name='prtPrinter' value='"+prtPrinter+"'>\n";
  //					  newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
  	  newPage +="															</td>\n";
  	  newPage +="														</tr>\n";
  	  newPage +="													</table>\n";					  
  	  newPage +="									      </td>\n";
  
  	
  	  newPage +="												<td width=\"50%\">\n";
  	  newPage +="													<table>\n";
  	  newPage +="														<tr>\n";
  	  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",""+myColumns[1]+":");
  	  newPage +=textTd_HTML(" width=\"5\"  align=\"center class=\"infotext\" ",
  	      	    "<span class=\"mandatory\">*</span>\n");
  	  newPage +="															<td >\n";
    	newPage +="<input type='text' name='phyPrinter' id='phyPrinter'  maxlength='30' dataType='Require' value='"+phyPrinter+"'msg='"+otherText["msg_enter_physPrint"]+"' >";
  	  newPage +="															</td>\n";
  	  newPage +="														</tr>\n";
  	  newPage +="													</table>\n";					  
  	  newPage +="									      </td>\n"
  		newPage +="</tr>";    
  
  
  	  newPage +="											<tr>								\n";
  	  newPage +="												<td width=\"50%\">\n";
  	  newPage +="													<table>\n";
  	  newPage +="														<tr>\n";
  	  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",""+myColumns[2]+":");
  	  newPage +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
  	      	    "<span class=\"mandatory\">*</span>\n");
  	  newPage +="															<td class=\"infotext\">\n";
	  if ( printerLock == "Y" )
	  {
          newPage +="<input type=\"checkbox\" name=\"printerLock\" id=\"printerLock\" value=\""+printerLock+"\" checked onclick=\"checkLock(this);\">\n";
	  }
	  else
	  {
          newPage +="<input type=\"checkbox\" name=\"printerLock\" id=\"printerLock\" value=\""+printerLock+"\" onclick=\"checkLock(this);\" >\n";
	  }
   	  newPage +="															</td>\n";
  	  newPage +="														</tr>\n";
  	  newPage +="													</table>\n";					  
  	  newPage +="									      </td>\n";
  
  	
  	  newPage +="												<td width=\"50%\">\n";
  	  newPage +="													<table>\n";
  	  newPage +="														<tr>\n";
  	  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",""+myColumns[4]+":");
  	  newPage +=textTd_HTML(" width=\"5\"  align=\"center class=\"infotext\" ",
  	      	    "<span class=\"mandatory\"></span>\n");
//  	      	    "<span class=\"mandatory\">*</span>\n");
  	  newPage +="															<td >\n";


//			newPage += "<select id=\"printerArea\" name=\"printerArea\" dataType=\"Require\" msg=\""+otherText["msg_sel_printArea"]+"\" > \n";
			newPage += "<select id=\"printerArea\" name=\"printerArea\"  msg=\""+otherText["msg_sel_printArea"]+"\" > \n";
			newPage += displayDropList_sp(printerArea, area_jslst,otherText["msg_sel_printArea"]);
  	  newPage +="															</td>\n";
  	  newPage +="														</tr>\n";
  	  newPage +="													</table>\n";					  
  	  newPage +="									      </td>\n"
  		newPage +="</tr>";    



		
      newPage +="								    </table>\n";
      newPage += "</form>";
      newPage +="							   </td>\n";
      newPage +="							 </tr>\n";
      newPage+="					<tr>\n";
      newPage+="					<td align=\"middle\">\n";
      newPage+="					<div class=\'button\'><a href=\'#\' class=\'button\'  onClick=\'submitmyform()\'>"+commText["Modify"]+"</a>&nbsp;&nbsp;&nbsp;<a href=\'physical_printer_config.cgi?op=1'>"+commText["Back"]+"</a></div>\n";
      newPage+="					<br>\n";
      newPage+="					</td>\n";
      newPage+="					</tr>\n";
      newPage +="							</table>\n";
      newPage += " <\/div>\n";  
              
      newPage += fieldstFoot_HTML();
  
  
    	
  }
  else if(curViewDetailState ==7)
  {
    newPage +="	<tr>\n";
    newPage +="		<td align=\"center\">\n";
    newPage +="			<div class=\"button\">\n";
    newPage +=  			 btnLocation_HTML("justChaneMyLocation('physical_printer_config.cgi?op=1'); ",otherText["btn_backto_printer"]);
    	    
    newPage +="			</div>\n";
    newPage +="			  <br>\n";
    newPage +="		</td>\n";
    newPage +="	</tr>\n";
    newPage += fieldst_HTML(otherText["fieldMsg_addNew_printer"]);
    newPage += " <div class=\"adminform\">\n";
    newPage +="<table width=\"100%\">\n";
    newPage +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_cmpltFrm"]); 
    newPage +="				<form name=\"add_prt\" id=\"add_prt\"  method=\"post\" onsubmit='return Validator.Validate(this,1)'>\n";
    newPage +="						<tr>\n";
    newPage +="									<td class=\"infotext\" width=\"100%\">\n";
    newPage +="										<table width=\"100%\">\n";
    newPage +="											<tr>								\n";
    newPage +="												<td width=\"50%\">\n";
    newPage +="													<table>\n";
    newPage +="														<tr>\n";
    newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" "," "+myColumns[0]+": ");
    newPage +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
        	    "<span class=\"mandatory\">*</span>\n");
    newPage +="															<td>\n";
  	newPage +="<input type=\"text\" name=\"prtPrinter\" id=\"prtPrinter\"  maxlength='9' size='10' dataType=\"Custom\" regexp=\"^P\\d\\d$\" msg=\""+otherText["msg_enter_logPrint"]+"\"> &nbsp; [Logical Printer Name Must be in P0N (e.g. P01) format]";
    newPage += "<input type=\"hidden\" name=\"op\" value=\"17\">\n";
   	newPage +="															</td>\n";
    newPage +="														</tr>\n";
    newPage +="													</table>\n";
    
    newPage +="									      </td>\n";
    newPage +="												<td width=\"50%\">\n";
    newPage +="													<table>\n";
    newPage +="														<tr>\n";      
    newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",""+myColumns[1]+":");
    newPage +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
        	    "<span class=\"mandatory\">*</span>\n");
    newPage +="															<td>\n";
  	newPage +="<input type=\"text\" name=\"phyPrinter\" id=\"phyPrinter\"  maxlength='29' size='30' dataType=\"Require\" msg=\""+otherText["msg_enter_physPrint"]+"\">";
  
    newPage +="															</td>\n";  	    
    
    newPage +="														</tr>\n";
    newPage +="													</table>\n";
    newPage +="									   </td>\n";
    
    newPage +="								    </tr>\n";
  
  
  	  newPage +="											<tr>								\n";
  	  newPage +="												<td width=\"50%\">\n";
  	  newPage +="													<table>\n";
  	  newPage +="														<tr>\n";
  	  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",""+myColumns[2]+":");
  	  newPage +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
  	      	    "<span class=\"mandatory\">*</span>\n");
  	  newPage +="															<td class=\"infotext\">\n";
	  if ( printerLock == "Y" )
	  {
          newPage +="<input type=\"checkbox\" name=\"printerLock\" id=\"printerLock\" value=\""+printerLock+"\" checked onclick=\"checkLock(this);\">\n";
	  }
	  else
	  {
          newPage +="<input type=\"checkbox\" name=\"printerLock\" id=\"printerLock\" value=\""+printerLock+"\" onclick=\"checkLock(this);\" >\n";
	  }
   	  newPage +="															</td>\n";
  	  newPage +="														</tr>\n";
  	  newPage +="													</table>\n";					  
  	  newPage +="									      </td>\n";
  
  	
  	  newPage +="												<td width=\"50%\">\n";
  	  newPage +="													<table>\n";
  	  newPage +="														<tr>\n";
  	  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",""+myColumns[4]+":");
  	  newPage +=textTd_HTML(" width=\"5\"  align=\"center class=\"infotext\" ",
//  	      	    "<span class=\"mandatory\">*</span>\n");
  	      	    "<span class=\"mandatory\"></span>\n");
  	  newPage +="															<td >\n";


//			newPage += "<select id=\"printerArea\" name=\"printerArea\" dataType=\"Require\" msg=\""+otherText["msg_sel_printArea"]+"\" > \n";
			newPage += "<select id=\"printerArea\" name=\"printerArea\"  msg=\""+otherText["msg_sel_printArea"]+"\" > \n";
			newPage += displayDropList_sp(printerArea, area_jslst,otherText["msg_sel_printArea"]);
  	  newPage +="															</td>\n";
  	  newPage +="														</tr>\n";
  	  newPage +="													</table>\n";					  
  	  newPage +="									      </td>\n"
  		newPage +="</tr>";    


    
  
  	newPage +="								    </table>\n";
    newPage +=frmButtRow_HTML(commText["Add"], 1);
                    
    newPage +="							   </td>\n";
    newPage +="							 </tr>\n";
    //frmButtRow_HTML("Add", 1);
    newPage +="							</table>\n";
    newPage += " <\/div>\n";
    newPage += "                    </form>\n";                      
    newPage += fieldstFoot_HTML();
  	
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
  
} //end of render Page
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

function checkLock(myObject)
{
 	if(myObject.checked==true)
 	{
		myObject.value = 'Y';
		/*
		if ( myObject == document.mod_prt.printerLock )
		{
			document.mod_prt.printerLock.value = 'Y';
		}
		if ( myObject == document.add_prt.printerLock )
		{
			document.add_prt.printerLock.value = 'Y';
		}
		*/
	}
	else
	{
		myObject.value = 'N';
		/*
		if ( myObject == document.mod_prt.printerLock )
		{
			document.mod_prt.printerLock.value = 'N';
		}
		if ( myObject == document.add_prt.printerLock )
		{
			document.add_prt.printerLock.value = 'N';
		}
		*/
	}
}

function updatePageHeading(op,pgHead)
{
  var pageHeading = pgHead;
  if (op <= 1 || op > 10)
  {
    pageHeading +=otherText["pgHead"];
  }else if(op==6)
  {
  	pageHeading +=otherText["pgHead_mod"];
  	
  }else if(op==7)
  {
  	pageHeading +=otherText["pgHead_add"];
  }
  return pageHeading;   
}


function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
  pageTitle +=otherText["pgTitle"];
  return pageTitle;
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
  nextPgHTML += "Total&nbsp;"+totalRows+"&nbsp;records";
  nextPgHTML += "<\/td>\n ";
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
  newPage +="if(confirm('"+otherText["confirm_msg"]+"'))";
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
  newPage +="\n";
  newPage +="</head>\n";
  newPage +="\n";
  newPage +="<body>\n";
  
  newPage +="\n";
  newPage +="\n";
  return (newPage);
}
