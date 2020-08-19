var myColumns = [ "Company","Usage",	"Printer",   "Area Location" ];

var otherText = new Array()
otherText["youraction"] =  "YOUR ACTION";
otherText["confirm_msg"] =  "Are you sure you want to delete ?"; 
otherText["btn_addNew_printer"] =  "Add New Printer";
otherText["btn_mod_printer"] =  "Modify Printer";
otherText["msg_cmpltFrm"] = "Complete and submit the following form, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
otherText["msg_sel_printer"] = "Select Printer";
otherText["msg_sel_cmpy"] = "Select Company";
otherText["name"] =  "Name";
otherText["msg_valid_name"] =  "Enter valid Printer Name";
otherText["msg_sel_printUsg"] = "Select Printer Usage";
otherText["msg_enter_logPrint"] = "Enter Logical Printer name!";
otherText["fieldMsg_mod_printer"] = "Modify Printer Settings";
otherText["fieldMsg_addNew_printer"] = "Add New Printer";
otherText["logic_printer"] = ""+myColumns[0]+"";
otherText["physic_printer"] = "Physical Printer";
otherText["btn_backto_printer"] = "Back To Printer List Page";
otherText["msg_logPrintUsed"] = "Your Input Already Exist in the database OR Your input is incorrect, please check and input again!";
otherText["pgHead"] =  "logical printers";
otherText["pgHead_add"] =  "add a new logical printer";
otherText["pgHead_mod"] =  "modify logical printer settings";
otherText["pgTitle"] =  "Maintenance, logical printers";


 var items_per_page = 10;

/********************
* 2 rrays
* decide if need to display the
* print and search buttons or not
*/                    		
		var ops_req_print = [-1, 1,26,36,27,28,38,48,37,47];
		var ops_req_search = [-1, 1,26,36,27,28,38,48,37,47];// search never required on this page		
		
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
    l_opInf[46]= "Record Existed Already. Update Failed !"; 
    l_opInf[27]= "Successfully Inserted New Record";
    l_opInf[37]= "Insert Failed!";
    l_opInf[47]= "Record Existed Already. Insert Failed!";
    l_opInf[38]= "Deleted Failed Check the Database!";
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
    newPage += alert(""+otherText["msg_logPrintUsed"]+"");
    newPage +="</script>\n";
    
  	newPage += "<tr>";
    newPage += "		<td align=\"center\">";
    newPage += "<form name='add' id='add' method='get'>"
    newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
    newPage += "<input type='hidden' name='op' value='7'>\n";  
    newPage += "</form>";
    newPage += "<div class=\'button\'><a href='#' onclick='add.submit()'>";
    newPage += ""+otherText["btn_addNew_printer"]+"</a>&nbsp;";
    newPage += "</div> <br>";
  
  
    newPage += "		</td>";
    newPage += "	</tr>";
    newPage +=displayStatusMsg (op);  
  	
  	if(parseInt(pg)> 0&&parseInt(pagesTotal)!=0)
    {
    	newPage +=nextPage(pagesTotal, pg,rowsTotal,"printer_config.cgi", "pg");
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
  
  	for(i in printer_config_tab)
  	{
  		newPage += "<tr class=\"row1\">\n";
  		if(i>0) 
  		{
  				newPage += "<form name='printer"+i+"' id='printer"+i+"'>"
  			for(var j=0; j<myColumns.length+2; j++)
  			{
  				
  				if (j == 0)
  				{
  					newPage +="<td width='40%'>";
        		newPage +="<table width='100%'>";
        		newPage +="<tr>";
  //      		newPage += "<form name='rpt"+i+"' id='rpt"+i+"'>"
  					newPage += "<td>" + obs(printer_config_tab[i][j])+"&nbsp;";
  					newPage += "<input type='hidden' name='cmpy_typ_id\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  				}else if(j==1)
  				{	
  					newPage += obs(printer_config_tab[i][j])+"<\/td>";
  //      		newPage += "<input type=\'hidden\' name=\'rptName\' value='"+obs(printer_config_tab[i][j])+"'>\n";
        		newPage += "<td width='30%'>";
        		newPage += " <select id='op' name='op' onchange = 'submitmyform_own("+i+");' > \n";
        		newPage += "<option value='' selected>-"+otherText["youraction"]+"-</option>";
  //      		newPage += "<option value='7' >-ADD-</option>";
        		newPage += "<option value='6' >"+commText["Modify"]+"</option>";
        		newPage += "<option value='8' >"+commText["Delete"]+"</option>";
  					newPage += "</select>";
  					newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
  //					newPage += "<input type='hidden' name='cmpy_typ_id\' value='"+obs(printer_config_tab[i][j-1])+"'>\n";		
  				
        		newPage += "</td>";
        		newPage +="</tr>";
        		newPage +="</table>";
        		newPage += "</td>";
  				}
  				else if(j==2)
  				{
  					newPage += "<td width='30%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
  					newPage += "<input type=\'hidden\' name=\'prtUsage\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  					
  				}else if(j==3)
  				{
  					newPage += "<td width='10%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
  					newPage += "<input type=\'hidden\' name=\'prtPrinter\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  				}else if(j==5)
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

  }// end of if  handle error from server op 47
  else if (curPrivilage<6&&curViewDetailState <= 1) // view records
  {

    	newPage += "<tr>";
      newPage += "		<td align=\"center\">";
    
      
      newPage += "<form name='add' id='add' method='get'>"
      newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
      newPage += "<input type='hidden' name='op' value='7'>\n";
    
      newPage += "		</td>";
      newPage += "	</tr>";
      
      if(parseInt(pg)> 0&&parseInt(pagesTotal)!=0)
      {
      	newPage +=nextPage(pagesTotal, pg,rowsTotal,"printer_config.cgi", "pg");
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
    
    	for(i in printer_config_tab)
    	{
    		newPage += "<tr class=\"row1\">\n";
    		if(i>0) 
    		{
    				newPage += "<form name='printer"+i+"' id='printer"+i+"'method = 'get'>"
    			for(var j=0; j<myColumns.length+2; j++)
    			{
    				
    				
    				if (j == 0)
    				{
    					newPage +="<td width='40%'>";
          		newPage +="<table width='100%'>";
          		newPage +="<tr>";
    //      		newPage += "<form name='rpt"+i+"' id='rpt"+i+"'>"
    					newPage += "<td>" + obs(printer_config_tab[i][j])+"&nbsp;";
    					newPage += "<input type='hidden' name='cmpy_typ_id\' value='"+obs(printer_config_tab[i][j])+"'>\n";
    				}else if(j==1)
    				{	
    					newPage += obs(printer_config_tab[i][j])+"<\/td>";
          		newPage += "<td width='30%'>";    
          		newPage += "</td>";
          		newPage +="</tr>";
          		newPage +="</table>";
          		newPage += "</td>";
    				}
    				else if(j==2)
    				{
    					newPage += "<td width='30%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
    					newPage += "<input type=\'hidden\' name=\'prtUsage\' value='"+obs(printer_config_tab[i][j])+"'>\n";
    					
    				}else if(j==3)
					{
						newPage += "<td width='10%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
						newPage += "<input type=\'hidden\' name=\'prtPrinter\' value='"+obs(printer_config_tab[i][j])+"'>\n";
					}else if(j==5)
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

    newPage += "<form name='add' id='add' method='get'>"
    newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
    newPage += "<input type='hidden' name='op' value='7'>\n";
   	newPage += "<input type='hidden' name='priv' value='"+priv+"'>\n";
    newPage += "</form>";
    newPage += "<div class=\'button\'>";
    if (curPrivilage >= 7)
        newPage += "<a href='#' onclick='add.submit()'>"+  otherText["btn_addNew_printer"]+"</a>&nbsp;";
    newPage += "</div> <br>";
  
    newPage += "		</td>";
    newPage += "	</tr>";
    newPage +=displayStatusMsg (op);  
  	
   if(parseInt(pg)> 0&&parseInt(pagesTotal)!=0)
    {
    	newPage +=nextPage(pagesTotal, pg,rowsTotal,"printer_config.cgi", "pg");
  	}
  
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
  				newPage += "<form name='printer"+i+"' id='printer"+i+"' method = 'get'>"
  			for(var j=0; j<myColumns.length+2; j++)
  			{
  				
  				if (j == 0)
  				{
  					newPage +="<td width='40%'>";
        		newPage +="<table width='100%'>";
        		newPage +="<tr>";
  //      		newPage += "<form name='rpt"+i+"' id='rpt"+i+"'>"
  					newPage += "<td>" + obs(printer_config_tab[i][j])+"&nbsp;";
  					newPage += "<input type='hidden' name='cmpy_typ_id\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  				}else if(j==1)
  				{	
  					newPage += obs(printer_config_tab[i][j])+"<\/td>";
        		newPage += "<td width='30%'>";
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
  //					newPage += "<input type='hidden' name='cmpy_typ_id\' value='"+obs(printer_config_tab[i][j-1])+"'>\n";		
  					newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
  					newPage += "<input type='hidden' name='priv' value='"+priv+"'>\n";
        		newPage += "</td>";
        		newPage +="</tr>";
        		newPage +="</table>";
        		newPage += "</td>";
  				}
  				else if(j==2)
  				{
  					newPage += "<td width='30%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
  					newPage += "<input type=\'hidden\' name=\'prtUsage\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  					
  				}else if(j==3)
  				{
  					newPage += "<td width='10%' align='center'>" + obs(printer_config_tab[i][j])+"<\/td>";
  					newPage += "<input type=\'hidden\' name=\'prtPrinter\' value='"+obs(printer_config_tab[i][j])+"'>\n";
  				}else if(j==5)
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
	  newPage +=  			 btnLocation_HTML("justChaneMyLocation('printer_config.cgi?op=1&pg="+pg+"'); ", otherText["btn_backto_printer"]);
	  	    
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
	  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[0]+" :");
	  newPage +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
	      	    "&nbsp;\n");
	  newPage +="															<td class=\"infotext\">\n";
		newPage += cmpy_typ_id;
		newPage += "<input type=\"hidden\" name=\"op\" value=\"16\">\n";						
	  newPage += "<input type='hidden' name='cmpy_typ_id' value='"+cmpy_typ_id+"'>\n";
	  newPage += "<input type='hidden' name='prtUsage' value='"+prtUsage+"'>\n";
	  newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
	  newPage += "<input type='hidden' name='prtOrig' value='"+prtPrinter+"'>\n";
	  newPage += "<input type='hidden' name='priv' value='"+priv+"'>\n";
	  newPage +="															</td>\n";
	  newPage +="														</tr>\n";
	  newPage +="													</table>\n";					  
	  newPage +="									      </td>\n";

	
	  newPage +="												<td width=\"50%\">\n";
	  newPage +="													<table>\n";
	  newPage +="														<tr>\n";
	  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[1]+" :");
	  newPage +=textTd_HTML(" width=\"5\"  align=\"center class=\"infotext\" ",
	      	    "<span class=\"mandatory\">*</span>\n");
	  newPage +="															<td class=\"infotext\">\n";
  	newPage += prtUsage;
	  newPage +="															</td>\n";
	  newPage +="														</tr>\n";
	  newPage +="													</table>\n";					  
	  newPage +="									      </td>\n"
		newPage +="<tr>";

					
  	newPage +="											<tr>								\n";
    newPage +="												<td width=\"50%\">\n";
    newPage +="													<table>\n";
    newPage +="														<tr>\n";
    newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[2]+" :");
    newPage +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
        	    "<span class=\"mandatory\">*</span>\n");
    newPage +="															<td>\n";
    
  	newPage += "<select id=\"prtPrinter\" name=\"prtPrinter\" dataType=\"Require\" msg=\""+otherText["msg_sel_printer"]+"\" > \n";
  	newPage += displayDropList_rpt(prtPrinter, prt_jslst,otherText["msg_sel_printer"]);				  
  	newPage +="															</td>\n";
    newPage +="														</tr>\n";
    newPage +="													</table>\n";
    					  
    newPage +="									      </td>\n"
  
  	
  	newPage +="												<td width=\"50%\">\n";
  		  
    newPage +="									      </td>\n"
  
  	newPage += "<\/tr>";
  	newPage +="								    </table>\n";
	  newPage +="							   </td>\n";
	  newPage +="							 </tr>\n";
  	newPage +=frmButtRow_HTML(commBtnText["Modify"], 1);
  	newPage +="							</form>\n";
	  newPage +="							</table>\n";
    newPage += " <\/div>\n";   
              
	  newPage += fieldstFoot_HTML();
  	
  }
  else if(curViewDetailState ==7)
  {
  	  
		  
		  newPage +="	<tr>\n";
		  newPage +="		<td align=\"center\">\n";
		  newPage +="			<div class=\"button\">\n";
		  newPage +=  			 btnLocation_HTML("justChaneMyLocation('printer_config.cgi?op=1&pg="+pg+"'); ", otherText["btn_backto_printer"]);
		  	    
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
		  newPage +="												<td width=\"60%\">\n";
		  newPage +="													<table>\n";
		  newPage +="														<tr>\n";
		  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"100\" ",myColumns[0]+" :");
		  newPage +=textTd_HTML(" width=\"5\" align=\"center\"  ",
		      	    "<span class=\"mandatory\">*</span>\n");
		  newPage +="															<td>\n";
			newPage += "<select id=\"cmpy_typ_id\" name=\"cmpy_typ_id\" dataType=\"Require\" msg=\""+otherText["msg_sel_cmpy"]+"\" > \n";
	if(g.isMng=='Y'){
		cmpy_jslst[cmpy_jslst.length] = new Array();
		cmpy_jslst[cmpy_jslst.length-1][0] = "ANY";
		cmpy_jslst[cmpy_jslst.length-1][1] = "All/Any";
		newPage += displayDropList_sp(null, cmpy_jslst, otherText["msg_sel_cmpy"]);
	}
	else {
		newPage += displayDropList_sp(null, cmpy_jslst, '');
	}


		  newPage += "<input type=\"hidden\" name=\"op\" value=\"17\">\n";
		  newPage += "<input type='hidden' name='priv' value='"+priv+"'>\n";

		  newPage +="															</td>\n";
		  newPage +="														</tr>\n";
		  newPage +="													</table>\n";
		  
		  newPage +="									      </td>\n";
		  newPage +="												<td width=\"40%\">\n";
		  newPage +="													<table>\n";
		  newPage +="														<tr>\n";      
		  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"100\" ",myColumns[1]+" :");
		  newPage +=textTd_HTML(" width=\"5\" align=\"center\"  ",
		      	    "<span class=\"mandatory\">*</span>\n");
		  newPage +="															<td>\n";


			newPage += "<select id=\"prtUsage\" name=\"prtUsage\" dataType=\"Require\" msg=\""+otherText["msg_sel_printUsg"]+"\" > \n";
			newPage += displayDropList_sp(null, usage_jslst,otherText["msg_sel_printUsg"]);

		  newPage +="															</td>\n";  	    
		  
		  newPage +="														</tr>\n";
		  newPage +="													</table>\n";
		  newPage +="									   </td>\n";
		  
		  newPage +="								    </tr>\n";
		  
		  // 2nd Row
		  newPage +="								    <tr>\n";
		  newPage +="										<td width=\"60%\">\n";
		  newPage +="													<table>\n";
		  newPage +="														<tr>\n";
		  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"100\" ",myColumns[2]+" :");
		  newPage +=textTd_HTML(" width=\"5\" align=\"center\"  ",
		      	    "<span class=\"mandatory\">*</span>\n");
		  newPage +="															<td>\n";
		  
			newPage += "<select id=\"prtPrinter\" name=\"prtPrinter\" dataType=\"Require\" msg=\""+otherText["msg_sel_printer"]+"\" > \n";
			newPage += displayDropList_rpt(null, prt_jslst,otherText["msg_sel_printer"]);				  
			newPage +="															</td>\n";
		  newPage +="														</tr>\n";
		  newPage +="													</table>\n";
//		  newPage += "</form>";					  
		  newPage +="									   </td>\n";
		  newPage +="										 <td width=\"40%\">\n";

		  newPage +="									   </td>\n";
		  
		  newPage +="								    </tr>\n";
		  
		  // End of 2nd Row
  		newPage +="								    </table>\n";
		  newPage +=frmButtRow_HTML(commBtnText["Add"], 1);
		                  
		  newPage +="							   </td>\n";
		  newPage +="							 </tr>\n";
		  
		  newPage +="							</table>\n";
		  newPage += "                    </div>\n";
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
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage)
{
  newPage +="<script>\n";
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
//  newPage +="var p = 'rpt'+form_number;";
//  newPage +="alert(form_number);";
//  newPage +="alert(document.forms[form_number]);";
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
//  newPage +="document.forms[parseInt(form_number)].submit();\n";  
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
