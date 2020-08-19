var myColumns = [ "Report Name","Report Description","Report Type",	"Active" ];
  // all the rest of the text on the report scheduling Page
	var otherText = new Array();
		otherText["sel_supp"] =  "Please Select";
		otherText["tk_nodata"] =  "Tank has no data";
		otherText["sel_supp_det"] =  "Select the supplier, To View Report Schedule";
		otherText["EnterIT"] = "Enter Interface Type";
		otherText["supp_detail"] = "supplier details";
		otherText["supp"] = "Supplier";
		otherText["pgTitle_rptsched"] =  "report administration menu, report scheduling page";
		otherText["pgHead"] = "report scheduling details";
    otherText["pgHead_add"] = "add a new report";
		otherText["pgHead_mod"] = "report scheduling setting";
		otherText["tk_guagAtt_Det"] = "Tank Gauging Attribute Details";
		otherText["msg_cmpltFrm"] = "Complete and submit the following form, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
		otherText["msg_valid_liqMass"] = "Please input correct Liquid Mass value";
		otherText["msg_valid_obsTemp"] = "Please input correct Observe Temp value";
		otherText["msg_valid_prop"] = "Please input correct Proportion";

 //ideally should come from 1 common place
 var items_per_page = 10;

  var l_opInf= new Array()
  for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    
  l_opInf[26]= "Successfully Updated A Record !";
  l_opInf[136]= "DB Update Failed!";
  
  /********************
		 * 2 rrays
		 * decide if need to display the
		 * print and search buttons or not
		 */                    		
		var ops_req_print = [-1, 1,26,28,38,48,36,27,37,47];
		var ops_req_search = [-1, 1,26,28,38,48,36,27,37,47];// search never required on this page		
		
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
  newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
  newPage +="<tr>\n";  
  newPage +="<td width=\"100%\">             \n";
  newPage +="<div class=\"content\" id=\"content\">\n";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";  
  
  /*****&&curPrivilage>=6*****/	
  if (curPrivilage>=6&&curViewDetailState <= 1 || curViewDetailState > 10) // view records
  {
    
  	newPage += displayGlblFrm();
  
  	if(parseInt(pg)> 0&&parseInt(pagesTotal)!=0)
    {
    	newPage +=nextPage(pagesTotal, pg,rowsTotal,"report_scheduling.cgi", "pg");
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
  				newPage += "<form name='report"+i+"' id='report"+i+"'>"
  			for(var j=0; j<myColumns.length; j++)
  			{
  				
  				
  				if(j==0)
  				{
  								
  					newPage +="<td width='30%'>";
        		newPage +="<table width='100%'>";
        		newPage +="<tr>";
  					newPage += "<td>" + obs(report_scheduling_tab[i][j])+"<\/td>";
  					newPage += "<input type=\'hidden\' name=\'rptName\' value='"+obs(report_scheduling_tab[i][4])+"'>\n";
  					newPage += "<input type='hidden' name='cmpy_typ_id\' value='"+cmpy_typ_id+"'>\n";
  									
        		newPage += "<td width='30%'>";
  					newPage +="<input name=\"op\" id=\"op\" value=\"6\" type=\"hidden\">\n";
  	  	    newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
  					newPage +="<input type=\"submit\" name=\"rpt\" value=\""+commBtnText["Modify"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\"  />\n";
        		newPage += "</td>";
        		newPage +="</tr>";
        		newPage +="</table>";
        		newPage += "</td>";
      				
  				}
  				if (j == 1)
  				{
  					
  					newPage += "<td>" + obs(report_scheduling_tab[i][j])+"<\/td>";
  
  				}
  				else if(j==2)
  				{
  					newPage += "<td align='center'>" + obs(report_scheduling_tab[i][j])+"<\/td>";
  					
  				}else if(j==3)
  				{
  					newPage += "<td align='center'>" + obs(report_scheduling_tab[i][j])+"<\/td>";
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
  /*******&&curPrivilage<6**********/
  else if(curPrivilage>=5&&curViewDetailState <= 1 || curViewDetailState > 10)
  {
	  newPage += displayGlblFrm();

    	if(parseInt(pg)> 0&&parseInt(pagesTotal)!=0)
      {
      	newPage +=nextPage(pagesTotal, pg,rowsTotal,"report_scheduling.cgi", "pg");
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
  					newPage += "<form name='report"+i+"' id='report"+i+"'>"
  				for(var j=0; j<myColumns.length; j++)
  				{
  					
  					
  					if(j==0)
  					{
  									
  						newPage +="<td width='30%'>";
  	      		newPage +="<table width='100%'>";
  	      		newPage +="<tr>";
  						newPage += "<td>" + obs(report_scheduling_tab[i][j])+"<\/td>";
  						newPage += "<input type=\'hidden\' name=\'rptName\' value='"+obs(report_scheduling_tab[i][j])+"'>\n";
  						newPage += "<input type='hidden' name='cmpy_typ_id\' value='"+cmpy_typ_id+"'>\n";
  										
  	      		newPage += "<td width='30%'>";
  						newPage +="<input name=\"op\" id=\"op\" value=\"6\" type=\"hidden\">\n";
  						newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
  
              /*********	this part should be commented if implemented access ctrl!*****/							
  						newPage +="<input type=\"submit\" name=\"rpt\" value=\""+commBtnText["Modify"] +"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\"  />\n";
              /*********	this part should be commented if implemented access ctrl!*****/	
  
  
  				    newPage += "</form>";
  	      		newPage += "</td>";
  	      		newPage +="</tr>";
  	      		newPage +="</table>";
  	      		newPage += "</td>";
  					
  					}
  					if (j == 1)
  					{
  						
  						newPage += "<td>" + obs(report_scheduling_tab[i][j])+"<\/td>";
  	
  					}
  					else if(j==2)
  					{
  						newPage += "<td align='center'>" + obs(report_scheduling_tab[i][j])+"<\/td>";
  						
  					}else if(j==3)
  					{
  						newPage += "<td align='center'>" + obs(report_scheduling_tab[i][j])+"<\/td>";
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
	  newPage += displayGlblFrm();
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

	for(i in cmpy_rpt_jslst)
	{
		newPage += "<tr class=\"row1\">\n";
		if(i>0) 
		{
			for(var j=0; j<myColumns.length+1; j++)
			{
				
				if(j==0)
				{
					newPage += "<td>" + obs(cmpy_rpt_jslst[i][j])+"<\/td>";
					newPage += "<form name='rpt_cfg' id='rpt_cfg'>";
					newPage += "<input type=\'hidden\' name=\'rptName\' value='"+obs(cmpy_rpt_jslst[i][4])+"'>\n";
			    newPage += "<input type='hidden' name='cmpy_typ_id' value='"+cmpy_typ_id+"'>\n";
			    newPage += "<input type='hidden' name='op' value='16'>\n";
			    newPage += "<input type='hidden' name='pg' value='"+pg+"'>\n";
				}
				if (j == 1)
				{

					newPage += "<td>" + obs(cmpy_rpt_jslst[i][j])+"<\/td>";

      		
				}
				else if(j==2)
				{
					newPage += "<td>" + obs(cmpy_rpt_jslst[i][j])+"<\/td>";

					
					
					
				
				}else if(j==3)
				{
					
					
						if(obs(cmpy_rpt_jslst[i][j])=='Y')
      		{

      			newPage +="<td align='center'>";
      			newPage += "<input type='checkbox' name='rptActive1' value='"+ obs(cmpy_rpt_jslst[i][j])+"' checked>";
						newPage +="</td>";
      		
      		}else
      			{
      					newPage +="<td align='center'>";
								newPage += "<input type='checkbox' name='rptActive1' value='"+ obs(cmpy_rpt_jslst[i][j])+"' >";
								newPage +="</td>";
      				
    			}
    					
    				newPage += "<input type='hidden' name='rptActive'>\n";
    					
					
				}
      		
      			}
			newPage += "\n";
			newPage += "<\/tr>";
      		}
	}
    
				newPage += "</form>";
				newPage += "<\/tbody>";
				newPage += "<\/table>";
				newPage += "<\/td>";	
				newPage += "<\/tr>";
	
				newPage+="					<tr>\n";
		    newPage+="					<td align=\"middle\">\n";
		    newPage+="					<div class=\'button\'><a href=\'#\' class=\'button\'  onClick=\'submitmyform()\'>"+commBtnText["Modify"]+"</a>&nbsp;&nbsp;&nbsp;<a href=\'report_scheduling.cgi?op=1&pg="+pg+"&cmpy_typ_id="+cmpy_typ_id+"'>"+commText["Back"]+"</a></div>\n";
		    newPage+="					<br>\n";
		    newPage+="					</td>\n";
		    newPage+="					</tr>\n";

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




function displayGlblFrm()
{
  var glblFrm = "";
  glblFrm += fieldst_HTML(otherText["supp_detail"]);  
  glblFrm += "<form name=\"glblFrm\" id=\"glblFrm\">\n";
  glblFrm += "<input type=\"hidden\" name=\"op\" value=\"1\">\n";
  glblFrm += "<input type=\"hidden\" name=\"pg\" value=\"1\">\n";
  glblFrm += "                            <div class=\"adminform\">\n";
  glblFrm +=otherText["sel_supp_det"]+"                                    \n";
  glblFrm += "<table>\n";
  glblFrm += "<tr>\n";
  glblFrm += "<td class=\"infotextheading\">\n";
  glblFrm += otherText["supp"]+" :\n";
  glblFrm += "</td>\n";
  glblFrm += "<td>\n";
  glblFrm += "<select id=\"cmpy_typ_id\" name=\"cmpy_typ_id\" onchange=\"submit();\"> \n";
        if(p.isMng=='Y'){
                cmpy_jslst[cmpy_jslst.length] = new Array();
                cmpy_jslst[cmpy_jslst.length-1][0] = "ANY";
                cmpy_jslst[cmpy_jslst.length-1][1] = "All/Any";
		glblFrm += displayDropList_sp(cmpy_typ_id, cmpy_jslst,otherText["sel_supp"]);
        }
        else {
                glblFrm += displayDropList_sp(cmpy_typ_id, cmpy_jslst, otherText["sel_supp"]);
        }
  glblFrm += "<input type=\"button\" value=\""+ml(t__View)+"\" name=\"view\"   onclick=\"document.glblFrm.op.value=0;document.glblFrm.submit();\">\n";
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
  pageTitle +=otherText["pgTitle_rptsched"];
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
        
  massList +="</select>\n";
  return massList;
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
  newPage +="var form_number = myobject;";
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
  newPage+="	}\n";  
  newPage+="	}\n";  
  newPage +="}\n";
  
  
  
  newPage +="function enabled()\n";
  newPage +="{\n";
  newPage +="if(document.forms[1].rptEnabled.checked == false)";
  newPage +="{";
  newPage +="document.forms[1].rptActive1.value='N';";
  newPage +="document.forms[1].rptActive1.checked =false;";
  newPage +="document.forms[1].rptActive1.disabled =true;"; 
  newPage +="document.forms[1].rptActive.value='N';";
  newPage+="	}\n";
  newPage +="else{";
  newPage +="document.forms[1].rptActive1.disabled =false;"; 
  newPage+="}\n";
  newPage+="}\n";
  
  
  newPage +="function submitmyform()\n";
  newPage +="{\n";

  
	newPage +="if((document.forms[1].rptActive1.checked))";
  newPage +="{";
  newPage +="document.forms[1].rptActive.value='Y';";
  newPage+="document.forms[1].submit();\n";
  newPage+="	}\n"; 
  newPage +="else{"; 
  newPage +="document.forms[1].rptActive.value='N';";
  newPage+="document.forms[1].submit();\n";
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
