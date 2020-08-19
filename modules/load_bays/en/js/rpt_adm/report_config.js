var myColumns = [ "Report Name","Description",	"Type",	"Enabled","Active" ];

var displayText = new Array();
    displayText['ur_action'] = "YOUR ACTION";
    displayText['inputError'] = "Your input is already existed in Database, OR, You input is incorrect. Please check and input again!";
    displayText['selectCompanyError'] = "Please Select A Company First!";
    displayText['modifyRpt'] = "Modify Report Details";
    displayText['addNewRpt'] = "Add New Report Config Details";
    displayText['instructions'] = "Complete and submit the following form to add new report, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory"; 
    displayText['reportError'] = "Please Enter A Report name!";
    displayText['reportType'] = "Report Type: ";
    displayText['add_new_report'] = "Add New Report Config";
    displayText['reportEnabled'] = "Report Enabled: ";
    displayText['reportActive'] = "Report Active: ";
    displayText['backReportList'] = "Back To Report List Page.";
    displayText['selectReportCode'] = "Please Select A Report File Code!";
    displayText['selectReportFile'] = "Please Select Report File";
    displayText['rptFileName'] = "Report File Name";
    displayText['rptName'] = "Report Name";
    displayText['selectSupplier'] = "Please Select";
    displayText['supp'] = "Supplier";
    displayText['nameError'] = "The item has to have a name";
    displayText['reportConfig'] = "report config";
    displayText['reportModify'] = "report modify";
    displayText['supp_details'] = "supplier details";
    displayText['reportAdd'] = "add a new report";
    displayText['pageTitle'] = "report administration menu, report config page";
    displayText['deleteConfirm'] = "Are you sure you want to delete?";
    
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
    l_opInf[18]= "Successfully Deleted!";
    l_opInf[26]= "Successfully Updated A Record !";
    l_opInf[27]= "Successfully Inserted A New Record !";
    l_opInf[37]= "Insert New Record Failed!";
    l_opInf[133]= "DB Update Failed!";
    l_opInf[135]= "DB Update Failed!";
    l_opInf[136]= "DB Update Failed!";
    l_opInf[137]= "DB Insert Failed!";
    l_opInf[134]= "DB Delete Failed!";
		
function displayGlblFrm()
{
  var glblFrm = "";
  var glblFrm = "";
  glblFrm += fieldst_HTML(displayText['supp_details']);
  glblFrm += "<form name=\"glblFrm\" id=\"glblFrm\">\n";
  glblFrm += "<input type=\"hidden\" name=\"op\" value=\"1\">\n";
  glblFrm += "<input type=\"hidden\" name=\"pg\" value=\"1\">\n";
  glblFrm += " <div class=\"adminform\">\n";
  glblFrm += "<table>\n";
  glblFrm += "<tr>\n";
  glblFrm += "<td class=\"infotextheading\">\n";
  glblFrm += displayText['supp']+" :\n";
  glblFrm += "</td>\n";
  glblFrm += "<td>\n";
  glblFrm += "<select id=\"cmpy_typ_id\" name=\"cmpy_typ_id\" onchange=\"submit();\"> \n";
	if(p.isMng=='Y'){
		cmpy_jslst[cmpy_jslst.length] = new Array();
		cmpy_jslst[cmpy_jslst.length-1][0] = "ANY";
		cmpy_jslst[cmpy_jslst.length-1][1] = "All/Any";
		//alert("Here it is the isMng"+p.isMng);
		glblFrm += displayDropList_sp(cmpy_typ_id, cmpy_jslst, displayText['selectSupplier']);
	}
	else {

		glblFrm += displayDropList_sp(cmpy_typ_id, cmpy_jslst, displayText['selectSupplier']);
	}
  glblFrm += "<input type=\"button\" value=\""+ml(t__View)+"\" name=\"view\"   onclick=\"document.glblFrm.submit();\">\n";
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
    pageHeading += displayText['reportConfig'];
  }else if(op==6)
  {
	pageHeading += displayText['reportModify'];
  	
  }else if(op==7)
  {
   	pageHeading += displayText['reportAdd'];
  }
  return pageHeading;   
}


function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
   pageTitle += displayText['pageTitle'];
  return pageTitle;
}


function displayDropList_sp(selectedvalue, list,defMsg)
{
	var massList = "";
	var matchFound=0;

	for (i=1; i<list.length; i++)
	{
		massList += "<option value=\""+list[i][0]+"\"";
		if(list[i][0]==selectedvalue)
		{
			matchFound=1;
			massList += "selected";
		}
		massList +=">"+list[i][0]+"&nbsp;--&nbsp;"+list[i][1]+"</option>\n";
	}

	if(matchFound==0)//no matchfound
	{

		massList += "<option value=\"\"";
		massList += "selected";
		massList +=">"+defMsg+"</option>\n";

	}

	massList +="</select>\n";
	return massList;
}

function displayDropList_rpt(selectedvalue, list,defMsg)
{
  var massList = "";
  var matchFound=0;
  for (i=1; i<list.length; i++){
    massList += "<option value=\""+list[i][0]+"\"";
     if(list[i][0]==selectedvalue)
     {
        matchFound=1;
        massList += "selected";
     }
    massList +=">"+list[i][1]+"</option>\n";
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
    nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) + "&cmpy_typ_id='+cmpy_typ_id+''); ", "&lt;&lt;");
		foobar = page_number - 1;
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		 nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&cmpy_typ_id='+cmpy_typ_id+''); ", "<b>&lt;<\/b>");
		
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&cmpy_typ_id='+cmpy_typ_id+''); ", foobar1 + "-" + foobar2);
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
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&cmpy_typ_id='+cmpy_typ_id+''); ", i);
	}
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	for (var i=page_number+1; i<foobar2; i++) 
  {
    //alert("I am in for for foobar2 loop "+i);	
    nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&cmpy_typ_id='+cmpy_typ_id+''); ", i);
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&cmpy_typ_id='+cmpy_typ_id+''); ", tempTxt);
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
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&cmpy_typ_id='+cmpy_typ_id+''); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) + "&cmpy_typ_id='+cmpy_typ_id+''); ", "<b>&gt;&gt;<\/b>");
	} else {
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}
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
  newPage +="var form_number = parseInt(myobject)+1;";
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
  newPage +="if(confirm(' " + displayText['deleteConfirm'] + " '))";
  newPage +="{";
  newPage+="document.forms[form_number].submit();\n";
  newPage+="	}else{\n";  
  newPage+="document.forms[form_number].reset();\n";  
  newPage+="	}\n";    
  newPage+="	}\n";  
  newPage +="}\n";
  
  
  newPage +="function enabled()\n";
  newPage +="{\n";
  newPage +="if(document.forms[0].rptEnabled1.checked == false)\n";
  newPage +="{\n";
  newPage +="document.forms[0].rptEnabled.value='N';\n";
  newPage +="document.forms[0].rptActive1.value='N';\n";
  newPage +="document.forms[0].rptActive1.checked =false;\n";
  newPage +="document.forms[0].rptActive1.disabled =true;\n"; 
  newPage +="document.forms[0].rptActive.value='N';\n";
  newPage+="	}\n";
  newPage +="else{\n";
  newPage +="document.forms[0].rptActive1.disabled =false;\n"; 
  newPage+="}\n";
  newPage+="}\n";
  
  
  newPage +="function submitmyform()\n";
  newPage +="{\n";
  newPage +=" if((document.forms[0].rptEnabled1.checked))";
  newPage +=" {";
  newPage +="   document.forms[0].rptEnabled.value='Y';";
  newPage +="   if(document.forms[0].rptActive1.checked == false)";
  newPage +="   {";
	newPage +="      document.forms[0].rptActive.value='N';";
  newPage+="	  }\n";
  newPage +="   else";
  newPage +="   {";
  newPage +="     document.forms[0].rptActive.value='Y';";
  newPage+="    }\n";
  newPage +="   document.forms[0].rptActive1.checked == true;";
  newPage+="	}\n"; 
  newPage +=" else";
  newPage +=" {";
  newPage +="   document.forms[0].rptEnabled.value='N';";
  newPage +="   document.forms[0].rptActive1.checked == true;";
  newPage+="  }\n";
  newPage+="	if(Validator.Validate(document.forms[0],1)==true){\n";
  newPage+="		document.forms[0].submit();\n";
  newPage+="}\n";  
  newPage +="}\n";  
  newPage +="</script>\n";
  
  newPage +="</head>\n";
  newPage +="\n";
  newPage +="<body>\n";
  return (newPage); 

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
  // start including the page rows here  
  if (curViewDetailState >= 47) // handle error from server
  {
    newPage +="\n";
    newPage +="<SCRIPT LANGUAGE=\"JavaScript\">\n";
    newPage +="alert('"+ displayText['inputError'] + "')";
    newPage +="</script>\n";
      
	  newPage += displayGlblFrm();


  	newPage += "<tr>";
    newPage += "		<td align=\"center\">";
    if(cmpy_typ_id!='-1')
    {
  
      newPage += "<form name='add' id='add' method='post'>"
      newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
      newPage += "<input type='hidden' name='op' value='7'>\n";  
     	newPage += "<input type='hidden' name='cmpy_typ_id' value='"+cmpy_typ_id+"'>\n";
      newPage += "</form>";
      newPage += "<div class=\'button\'><a href='#' onclick='add.submit()'>";
      newPage += ""+ displayText['add_new_report']+"</a>&nbsp;";
      newPage += "</div> <br>";
  	
  	}else{
  	
    	newPage += "<div class=\"button\"><a href=\"#\" onclick=\"alert('" + displayText['selectCompanyError'] + "')\">"+ "</a>&nbsp;";
    	newPage += "</div> <br>";
  	}
    
    newPage += "		</td>";
    newPage += "	</tr>";
    newPage += "<tr>";
    newPage += "	</tr>";
  
   if(parseInt(pg)> 0&&parseInt(pagesTotal)!=0)
    {
    	newPage +=nextPage(pagesTotal, pg,rowsTotal,"report_config.cgi", "pg");
  	}
  
  	if( ((myColumns.length)> 0))
  	{
  		newPage +=displayStatusMsg (op);  
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
  			for(var j=0; j<myColumns.length+1; j++)
  			{
  				
  				
  				if(j==0)
  				{
  					
  					newPage += "<input type=\'hidden\' name=\'rptFile\' value='"+obs(report_scheduling_tab[i][j])+"'>\n";
  					newPage += "<input type='hidden' name='cmpy_typ_id\' value='"+cmpy_typ_id+"'>\n";
  					newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
  				}
  				if (j == 1)
  				{
  					newPage +="<td width='40%'>";
        		newPage +="<table width='100%'>";
        		newPage +="<tr>";
  
  					newPage += "<td>" + obs(report_scheduling_tab[i][j])+"<\/td>";
  					
        		newPage += "<td width='30%'>";
        		newPage += " <select id='op' name='op' onchange = 'submitmyform_own("+i+");' > \n";
        		newPage += "<option value='' selected>-"+displayText['ur_action']+"-</option>";
  
        		if (curPrivilage >= 6) newPage += "<option value='6' >-"+commText["Modify"]+"-</option>";
        		if (curPrivilage >= 8) newPage += "<option value='8' >-"+commText["Delete"]+"-</option>";
  					newPage += "</select>";
  			    newPage += "</form>";
        		newPage += "</td>";
        		newPage +="</tr>";
        		newPage +="</table>";
        		newPage += "</td>";
  				}
  				else if(j==2)
  				{
  					newPage += "<td width='30%'>" + obs(report_scheduling_tab[i][j])+"<\/td>";
  				}else if(j>2&&j<=5)
  				{
  					newPage += "<td width='10%'align='center'>" + obs(report_scheduling_tab[i][j])+"<\/td>";
  					
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
  else if (curPrivilage>=5 && curViewDetailState <= 1 || curViewDetailState > 10) // view records
  {

	  newPage += displayGlblFrm();


	  newPage += "<tr>";
	  newPage += "		<td align=\"center\">";



	  if(cmpy_typ_id!='-1')
	  {

		  newPage += "<form name='add' id='add' method='post'>"
			  newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
		  newPage += "<input type='hidden' name='op' value='7'>\n";  
		  newPage += "<input type='hidden' name='cmpy_typ_id' value='"+cmpy_typ_id+"'>\n";
		  newPage += "</form>";
                  if (curPrivilage >= 7)
                  {
		  newPage += "<div class=\'button\'><a href='#' onclick='add.submit()'>";
		  newPage += ""+displayText['add_new_report']+"</a>&nbsp;";
		  newPage += "</div> <br>";	
                  }

	  }
	  else
	  {
		if (curPrivilage >= 7)
                {
		  newPage += "<div class=\"button\"><a href=\"#\" onclick=\"alert('"+displayText['selectCompanyError']+"')\">"
		   		+displayText['add_new_report']
		  		+"</a>&nbsp;";
		  newPage += "</div>";
                
		  newPage += " <br>";
                }

	  }


	  newPage += "		</td>";
	  newPage += "	</tr>";

	  if(parseInt(pg)> 0&&parseInt(pagesTotal)!=0)
	  {
		  newPage +=nextPage(pagesTotal, pg,rowsTotal,"report_config.cgi", "pg");
	  }

	  if( ((myColumns.length)> 0))
	  {
		  newPage +=displayStatusMsg (op); 
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
				  for(var j=0; j<myColumns.length+1; j++)
				  {


					  if(j==0)
					  {

						  newPage += "<input type=\'hidden\' name=\'rptFile\' value='"+obs(report_scheduling_tab[i][j])+"'>\n";
						  newPage += "<input type='hidden' name='cmpy_typ_id\' value='"+cmpy_typ_id+"'>\n";
						  newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
					  }
					  if (j == 1)
					  {
						  newPage +="<td width='40%'>";
						  newPage +="<table width='100%'>";
						  newPage +="<tr>";

						  newPage += "<td>" + obs(report_scheduling_tab[i][j])+"<\/td>";


						  newPage += "<td width='30%'>";


						  newPage += " <select id='op' name='op' onchange = 'submitmyform_own("+i+");' > \n";
						  newPage += "<option value='' selected>-"+displayText['ur_action']+"-</option>";

						  if (curPrivilage >= 6) newPage += "<option value='6' >-"+commText["Modify"]+"-</option>";
						  if (curPrivilage >= 8) newPage += "<option value='8' >-"+commText["Delete"]+"-</option>";
						  newPage += "</select>";

						  newPage += "</td>";
						  newPage +="</tr>";
						  newPage +="</table>";
						  newPage += "</td>";
					  }
					  else if(j==2)
					  {
						  newPage += "<td width='30%'>" + obs(report_scheduling_tab[i][j])+"<\/td>";
					  }else if(j>2&&j<=5)
					  {
						  newPage += "<td width='10%'align='center'>" + obs(report_scheduling_tab[i][j])+"<\/td>";
						if (j == 5)
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
  else if (curViewDetailState ==6 )
  {

	  newPage += fieldst_HTML(displayText['modifyRpt']);
	  newPage += " <div class=\"adminform\">\n";
	  newPage +="<table width=\"100%\">\n";
	  newPage +=infotextRow_HTML(" width=\"100%\" ", displayText['instructions']);
	  newPage +="				<form name=\"mod_rpt\" method='post' id=\"mod_rpt\"  onsubmit='return Validator.Validate(this,1)'>\n";
	  newPage +="						<tr>\n";
	  newPage +="									<td class=\"infotext\" width=\"100%\">\n";
	  newPage +="										<table width=\"100%\">\n";
	  for(i in cmpy_rpt_jslst)
	  {

		  if(i>0) 
		  {
			  for(var j=0; j<myColumns.length+2; j++)
			  {

				  if(j==0)
				  {

					  newPage +="											<tr>								\n";
					  newPage +="												<td width=\"50%\">\n";
					  newPage +="													<table>\n";
					  newPage +="														<tr>\n";
					  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" "," Report File Name:");
					  newPage +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
							  "<span class=\"mandatory\">*</span>\n");
					  newPage +="															<td class=\"infotext\">\n";
					  newPage +=cmpy_rpt_jslst[i][j];

					  newPage += "<input type=\'hidden\' name=\'rptFile\' value='"+obs(cmpy_rpt_jslst[i][j])+"'>\n";
					  newPage += "<input type=\"hidden\" name=\"op\" value=\"16\">\n";		
					  newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";					
					  newPage += "<input type='hidden' name='cmpy_typ_id' value='"+cmpy_typ_id+"'>\n";
					  newPage +="															</td>\n";
					  newPage +="														</tr>\n";
					  newPage +="													</table>\n";					  
					  newPage +="									      </td>\n";

				  }
				  if (j == 1)
				  {

					  newPage +="												<td width=\"50%\">\n";
					  newPage +="													<table>\n";
					  newPage +="														<tr>\n";
					  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" "," Report Name:");
					  newPage +=textTd_HTML(" width=\"5\"  align=\"center class=\"infotext\" ",
							  "<span class=\"mandatory\">*</span>\n");
					  newPage +="															<td>\n";
					  newPage += "<input type='text' name='rptName' value='"+obs(cmpy_rpt_jslst[i][j])+"' maxlength = \"80\" size=\"40\"  dataType=\"Require\" msg=\"" + displayText['reportError'] + "\">\n";
					  newPage +="															</td>\n";
					  newPage +="														</tr>\n";
					  newPage +="													</table>\n";					  
					  newPage +="									      </td>\n"
						  newPage +="<tr>";

				  }
				  else if(j==2)
				  {

					  newPage +="											<tr>								\n";
					  newPage +="												<td width=\"50%\">\n";
					  newPage +="													<table>\n";
					  newPage +="														<tr>\n";
					  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" "," Report Description:");
					  newPage +="<td>";
					  newPage +="</td>"
						  newPage +="															<td>\n";
					  newPage += "<input type='text' name='rptDesc' value='"+obs(cmpy_rpt_jslst[i][j])+"' maxlength = \"80\" size=\"40\" >\n";				  
					  newPage +="															</td>\n";
					  newPage +="														</tr>\n";
					  newPage +="													</table>\n";					  
					  newPage +="									      </td>\n"

				  }else if(j==3)
				  {

					  newPage +="												<td width=\"50%\">\n";
					  newPage +="													<table>\n";
					  newPage +="														<tr>\n";
					  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",displayText['reportType']);
					  newPage +="															<td>\n";
					  newPage +="															</td>\n";
					  newPage +="															<td class=\"infotext\">\n";
					  newPage += obs(cmpy_rpt_jslst[i][j]);
					  newPage +="															</td>\n";
					  newPage += "<input type=\'hidden\' name=\'rptType\' value='"+obs(cmpy_rpt_jslst[i][j])+"'>\n";
					  newPage +="														</tr>\n";
					  newPage +="													</table>\n";					  
					  newPage +="									      </td>\n"
						  newPage +="<tr>";

				  }
				  else if(j==4)
				  {

					  newPage +="											<tr>								\n";
					  newPage +="												<td width=\"50%\">\n";
					  newPage +="													<table>\n";
					  newPage +="														<tr>\n";

					  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",displayText['reportEnabled']);
					  newPage +="<td>";
					  newPage +="</td>"


						  if(obs(cmpy_rpt_jslst[i][j])=='Y')
						  {

							  newPage +="<td align='center'>";
							  newPage += "<input type='checkbox' name='rptEnabled1' value='"+ obs(cmpy_rpt_jslst[i][j])+"' checked onclick='enabled()'>";
							  newPage +="</td>";

						  }
						  else
						  {
							  newPage +="<td align='center'>";
							  newPage += "<input type='checkbox' name='rptEnabled1' value='"+ obs(cmpy_rpt_jslst[i][j])+"' onclick='enabled()'>";
							  newPage +="</td>";

						  }




					  newPage +="														</tr>\n";
					  newPage +="													</table>\n";					  
					  newPage +="									      </td>\n"

				  }
				  else if(j==5)
				  {

					  newPage +="												<td width=\"50%\">\n";
					  newPage +="													<table>\n";
					  newPage +="														<tr>\n";

					  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", displayText['reportActive']);
					  newPage +="<td>";
					  newPage +="</td>"
						  if((obs(cmpy_rpt_jslst[i][j])=='Y') && (obs(cmpy_rpt_jslst[i][j-1])=='Y'))
						  {
							  newPage +="<td align='center'>";
							  newPage += "<input type='checkbox' name='rptActive1' value='"+ obs(cmpy_rpt_jslst[i][j])+"' checked onclick='enabled()'>";
							  newPage +="</td>";

						  }
						  else if (obs(cmpy_rpt_jslst[i][j-1])=='Y')
						  {

							  newPage +="<td align='center'>";
							  newPage += "<input type='checkbox' name='rptActive1' value='"+ obs(cmpy_rpt_jslst[i][j])+"' onclick='enabled()'>";
							  newPage +="</td>";   					

						  }
						  else
						  {
							  newPage +="<td align='center'>";
							  newPage += "<input type='checkbox' name='rptActive1' value='"+ obs(cmpy_rpt_jslst[i][j])+"' onclick='enabled()' disabled>";
							  newPage +="</td>"; 
						  }

					  newPage += "<input type='hidden' name='rptActive'>\n";
					  newPage += "<input type='hidden' name='rptEnabled'>\n";
					  newPage +="														</tr>\n";
					  newPage +="													</table>\n";					  
					  newPage +="									      </td>\n"
						  newPage += "</form>";  



				  }




			  }
		  }
		  newPage += "<\/tr>";
	  }

	  newPage +="								    </table>\n";

	  newPage +="							   </td>\n";
	  newPage +="							 </tr>\n";
	  newPage+="					<tr>\n";
	  newPage+="					<td align=\"middle\">\n";
	  newPage+="					<div class=\'button\'><a href=\'#\' class=\'button\'  onClick=\'submitmyform()\'>"+commBtnText["Update"]+"</a>&nbsp;&nbsp;&nbsp;<a href=\'report_config.cgi?op=1&pg="+pg+"&cmpy_typ_id="+cmpy_typ_id+"'>"+commText["Back"]+"</a></div>\n";
	  newPage+="					<br>\n";
	  newPage+="					</td>\n";
	  newPage+="					</tr>\n";
	  newPage +="							</table>\n";
	  newPage+="					</div>\n";  

	  newPage += fieldstFoot_HTML();



  }
  else if(curViewDetailState ==7)
  {		  
		  newPage +="	<tr>\n";
		  newPage +="		<td align=\"center\">\n";
		  newPage +="			<div class=\"button\">\n";
		  newPage +=  			 btnLocation_HTML("justChaneMyLocation('report_config.cgi?op=1&pg="+pg+"&cmpy_typ_id="+cmpy_typ_id+"'); ", displayText['backReportList'] );		  	    
		  newPage +="			</div>\n";
		  newPage +="			  <br>\n";
		  newPage +="		</td>\n";
		  newPage +="	</tr>\n";
                  newPage += fieldst_HTML(displayText['addNewRpt']);
		  newPage += " <div class=\"adminform\">\n";
		  newPage +="<table width=\"100%\">\n";
		  newPage +=infotextRow_HTML(" width=\"100%\" ", displayText['instructions']); 
		  newPage +="				<form name=\"add_rpt\" method='post' id=\"add_rpt\"  onsubmit='return Validator.Validate(this,1)'>\n";
		  newPage +="						<tr>\n";
		  newPage +="									<td class=\"infotext\" width=\"100%\">\n";
		  newPage +="										<table width=\"100%\">\n";
		  newPage +="											<tr>								\n";
		  newPage +="												<td width=\"50%\">\n";
		  newPage +="													<table>\n";
		  newPage +="														<tr>\n";
		  newPage +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",displayText['rptFileName'] +" :");
		  newPage +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
		      	    "<span class=\"mandatory\">*</span>\n");
		  newPage +="															<td>\n";
			newPage += "<select id=\"rptFile\" name=\"rptFile\" dataType=\"Require\" msg=\"" + displayText['selectReportFile']+ "\" > \n";
			newPage += displayDropList_rpt(null, rpt_file_jslst,displayText['selectReportFile']);
		  newPage += "<input type=\"hidden\" name=\"op\" value=\"17\">\n";
		  newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
		  newPage += "<input type='hidden' name='cmpy_typ_id' value='"+cmpy_typ_id+"'>\n";
		  newPage += "<input type=\"hidden\" name=\"rptActive\" value='Y'>\n";
		  newPage += "<input type=\"hidden\" name=\"rptEnabled\" value='Y'>\n";
		  newPage +="															</td>\n";
		  newPage +="														</tr>\n";
		  newPage +="													</table>\n";
		  
		  newPage +="									      </td>\n";
		  newPage +="												<td width=\"50%\">\n";
		  
		  newPage +="												  &nbsp;\n";
		  
		  
		  newPage +="									   </td>\n";
		  
		  newPage +="								    </tr>\n";
		  

  		newPage +="								    </table>\n";
		  newPage +=frmButtRow_HTML(commBtnText["Add"], 1);
		                  
		  newPage +="							   </td>\n";
		  newPage +="							 </tr>\n";
		  //frmButtRow_HTML("Add", 1);
		  newPage +="							</table>\n";
		  newPage += " <\/div>\n";
		  newPage += " </form>\n";                      
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
  if (typeof writeBack != 'undefined')writeBack();

}

