var myColumns = [ "Product Code","Product Name","Net","Gross","Usable" ,"Book bal" ];
		

function renderPage(cCom, cCol, cState, cPageState,priv,unit, lang)
{
	var curComputer = cCom;
	var curColumnToSort = cCol;
	var curViewDetailState = cState;
	var curPageIn = cPageState;
	var curPrivilage = priv;
	var vol = unit;
  //	alert(vol);


	var newPage = "";
	var pageTitle="";
  var pageHeading="";
  //printHdr function of comm_HTML.js file responsible for 
  //generating all the HTML for the current page
  newPage += printHdr(newPage,updatePageTitle(curViewDetailState,pageTitle), lang);
  //local_HeadrHTML function is local function give 
  // the ability to append any thing to the current page
//  newPage += local_HeadrHTML(newPage, curPageIn);
  //getToolBar_HTML function of comm_HTML.js file responsible for  
  // outputting the tool bar
  //controls the search and print buttons as well
  newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),true, true);
  newPage +="<tr>\n";  
  newPage +="<td width=\"100%\">             \n";
  newPage +="<div class=\"content\" id=\"content\">\n";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";  
	
	if(curViewDetailState <= 1 || curViewDetailState > 10)
  {			
		 newPage +=displayGlblFrm(vol,tankTerm);    
  	 if( ((myColumns.length)> 0))
     {       
        newPage +="	<tr>\n";
		   	newPage += "<td>\n ";
		    newPage +="<div id=\"printReady\">";
        newPage += table_begin("M", 0,"");
        newPage += "<tbody> \n";
        newPage += "<tr>";
        
         for(var i=0; i<myColumns.length; i++)
        {
          newPage += "<td>"+myColumns[i]+"<\/td>";
        }
        newPage += "<\/tr>";
     }

	
		if(volUnt!='-1'&& volUnt!='selected')
		{
		  for(i in prod_inv_tab)
      {
        newPage += "<tr class=\"row1\">\n";
        if(i>0) 
        {
           for(var j=0; j<myColumns.length; j++)
          {
  
            
  						if(j==0) 
  						{
  						  newPage += "<td>\n";
  						  newPage +="<table border=\"0\" width=\"100%\">\n";
  						  newPage +="<tr>\n";
  						  newPage += "<td width=\"50\">" + obs(prod_inv_tab[i][j])+"</td>";
  						  newPage +="<td>\n";
  						  newPage += "<form>";
  						  newPage +="<input name=\"op\" id=\"op\" value=\"6\" type=\"hidden\">\n";
  						  newPage +="<input name=\"pg\" id=\"pg\" value=\"1\" type=\"hidden\">\n";
  						  newPage +="<input type='hidden' name='prodCd' value='"+obs(prod_inv_tab[i][j])+"'>\n";
  						  newPage +="<input type='hidden' name='prodNm' value='"+obs(prod_inv_tab[i][j+1])+"'>\n";
  						  newPage +="<input type='hidden' name='tankTerm' value='"+tankTerm+"'>\n";						    
  			        newPage += "</form>";
  			        newPage +="</td>\n";
  						  newPage +="</tr>\n";
  						  newPage +="</table>\n";
  						  newPage +="</td>\n";
  						}
  						else if(j>1)
  						{
  							newPage += "<td>" + UntCnvVol(obs(prod_inv_tab[i][j]), volUnt,100)+"<\/td>";
  						}
  						else 
  						{
  						newPage += "<td>" + obs(prod_inv_tab[i][j]) + "<\/td>";
  		  			}
          }
          newPage += "\n";
          newPage += "<\/tr>";
        }
        
        
      }

	  }
	  else
		{
			newPage += " ";
		}
	

			
			
				newPage +="  </tbody>\n";
			  newPage +=" </table>\n";
			  newPage +="</div>";
			  newPage += "<\/td>";	
				newPage += "<\/tr>";

		}
    //else if(curViewDetailState == 6) // this is ownership stuff doesn't require at this stage
		//{
	  //}

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

function displayunitList(unitSelected, list)
{
  var massList = "";
  var matchFound=0;
  var list_keys = new Array();
  list_keys = assArray_keys(list);
  for(i=0; i<list_keys.length; i++)
  {
     
     massList += "<option value=\""+list_keys[i]+"\"";
     if(list_keys[i]==unitSelected)
     {
        matchFound=1;
        massList += "selected";
     }
      massList +=">"+list[list_keys[i]]+"</option>\n";

  }
 
  massList +="</select>\n";

 
  return massList;

}
function displayGlblFrm(unit,dep)
{
	  var selected_unit = unit;
    var selected_dep = dep;
  
  var mass_unit_List = new Array()
		mass_unit_List["kgram2kgram"] =  "kg";
		mass_unit_List["kgram2pound"] =  "lb";
		mass_unit_List["kgram2imp_ton"] =  "ton IMP";
		mass_unit_List["kgram2ton"] =  "ton";
		
  var vol_unit_List = new Array()
  	vol_unit_List["selected"]="Select A Unit";
		vol_unit_List["litre2litre"] =  "LITRE";
		vol_unit_List["litre2meter3"] =  "CUBIC METRE";
		vol_unit_List["litre2imp_gal"] =  "IMP.GAL";
		vol_unit_List["litre2usgal"] =  "US.GAL";
		
		
  var glblFrm = "";
  glblFrm += fieldst_HTML("depot and unit details");
  glblFrm += "      <form name=\"glblFrm\" id=\"glblFrm\">\n";
  glblFrm += "<input type=\"hidden\" name=\"op\" value=\"1\">\n";
  glblFrm += "<input type=\"hidden\" name=\"pg\" value=\"1\">\n";
  glblFrm += "                            <div class=\"adminform\">\n";
  glblFrm +="                                    Select the Depot and Volume Unit, To View Product Inventory\n";
  glblFrm += "                                    <table>\n";
  glblFrm += "                                            <tr>\n";
  glblFrm +=
    "                                                    <td class=\"infotextheading\">\n";
  glblFrm +=
    "                                                            Depot:\n";
  glblFrm += "                                                    </td>\n";
  glblFrm += "                                                    <td>\n";
  glblFrm += "                                                        <select id=\"tankTerm\" name=\"tankTerm\" onchange=\"submit();\"> \n";
  glblFrm += displayDropList(selected_dep, terminal,"Select Terminal");

  glblFrm += "                                                    </td>\n";
  
  glblFrm += "                                            </tr>\n";
  
  glblFrm += "                                            <tr>\n";
  glblFrm +=
    "                                                    <td class=\"infotextheading\">\n";
  glblFrm +=
    "                                                            Volume Unit:\n";
  glblFrm += "                                                    </td>\n";
  glblFrm += "                                                    <td>\n";
  glblFrm += "                                                        <select name=\"volUnt\" id=\"volUnt\" onchange=\"submit();\"> \n";
  glblFrm += displayunitList(volUnt,vol_unit_List);
//  glblFrm += "                                                        <option value=\"\" selected >Please Select A Unit</option>\n";
//	glblFrm += "                                                          <option value=\"litre2litre\">Litre</option>\n";
//  glblFrm += "                                                          <option value=\"litre2meter3\">Cubic Metres</option>\n";
//  glblFrm += "                                                          <option value=\"litre2imp_gal\">IMP.GAL</option>\n";
//  glblFrm += "                                                          <option value=\"litre2usgal\">U.S.GAL</option>\n";
  
  glblFrm += "                                                    </td>\n";
  
  glblFrm += "                                            </tr>\n";
  
  
  glblFrm += "                                    </table>\n";
  glblFrm += "\n";
  glblFrm += "                            </div>\n";
  glblFrm += "                    </form>\n";
  glblFrm += "            </td>\n";
  glblFrm += "    </tr>\n";
  //document.write(glblFrm);
	return glblFrm;
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
function getSelectedValueofDropList(myId)
{	
	var element;
	var elementSubmit;
	var elementName;
	var myselectedIndex;
	var myselectedvalue;

	element = getElemRefs(myId);
	alert(element.name);
	elementSubmit = element;
	elementName = element.name;

	myselectedIndex = elementSubmit.selectedIndex;
	//KEY VALUE SELECTED BY THE USER
	myselectedvalue = elementSubmit.options[myselectedIndex].value;
	return myselectedvalue;


}

function update_page(element)
{
	var selectedValue;
	var selectedIndex;
	var mass_unit_list;
	var vol_unit_list;
	
	selectedIndex = element.selectedIndex;
	selectedValue=element.options[selectedIndex].value
	//alert(selectedValue);
	
	renderPage('0', 'name', op, 'loaded', priv,selectedValue, 'en');
	

}

/*
 * Function:  print_html_page_footer 
 * --------------------
 * print HTML page footer
 */
function print_html_page_footer()
{
  var footerHTML = "";
  footerHTML +="  </tbody>\n";
  footerHTML +=" </table>\n";
  footerHTML +="\n";
  footerHTML +="<div id=\"footer\" class=\"footer\">\n";
  footerHTML +="\n";
  footerHTML +="</div>\n";
  footerHTML +="\n";
  footerHTML +="<div id=\"footer1\"></div>\n";
  footerHTML +="<div id=\"footer2\"><a href=\"http://www.diamondkey.com/Front/DiamondKeyInternational.html/\">Diamond Key International Omega 3000 V8.0</a></div>\n";
  footerHTML +="\n";
  footerHTML +="</body>\n";
  footerHTML +="</html>\n";
  footerHTML +="\n";
  document.write(footerHTML);
  
}

function updatePageHeading(op,pgHead)
{
  var pageHeading = pgHead;
  if (op <= 1 || op > 10)
  {
    pageHeading +="product inventory";
  }else if(op==6)
  {
  	pageHeading +="product ownership summary";
  }
  
 
  return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
  if (op <= 1 || op > 10)
  {
    pageTitle +="STOCK MANAGEMENT, Product Inventory Page";
    
  }
  
  return pageTitle;
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
  newPage += "<div id=\"printReady\">";
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
function infoTable_HTML(curColumnToSort)
{
  var newPage ="";
		for(i in tank_inv_req_schd_tab)
    {
      if(i>0)
      {
        newPage += "<tr class=\"row1\">\n";
        var howmanyDone =0;
        for(var j=0; j<myColumns.length; j++)
        {
          if (curColumnToSort == howmanyDone)
          {
            newPage += "<td style=\"background-color:#EEEEEE\">" + obs(tank_inv_req_schd_tab[i][howmanyDone]) + "<\/td>";
			    } 
          else 
          {
          
				    newPage += "<td>\n";				  
				    if(howmanyDone==0) // means time to display the drop list and table
				    {
  				    newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
              newPage +="       <table border=\"0\">\n";
              newPage +="	       <tr>\n";
              newPage +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+obs(tank_inv_req_schd_tab[i][howmanyDone])+"</span>\n";
              newPage +="          <input type=\"hidden\" name=\"h_TKRQ_DUE\" id=\"h_TKRQ_DUE\" value=\""+tank_inv_req_schd_tab[i][2]+ " "+tank_inv_req_schd_tab[i][3]+"\">\n";
              newPage +="          <input type=\"hidden\" name=\"terminal\" id=\"terminal\" value=\""+tank_inv_req_schd_tab[i][5]+"\">\n";
              newPage +="          </td>\n";
              newPage +="          <td>\n";
              newPage += op_list(priv,i);
              newPage +="          </td>\n";
              newPage +="	       </tr>\n";
              newPage +="	      </table>\n";
              newPage +="	      </form>\n";
            }
            else if(tank_inv_req_schd_tab[i][howmanyDone]=="Y" ||(tank_inv_req_schd_tab[i][howmanyDone]=="y"))
            {
              newPage += commText["Yes"];
            }
            else if(tank_inv_req_schd_tab[i][howmanyDone]=="N" ||(tank_inv_req_schd_tab[i][howmanyDone]=="n"))
            {
              newPage += commText["No"];
            }
            else 
            {
              newPage += obs(tank_inv_req_schd_tab[i][howmanyDone]);
            }  
          
            newPage += "<\/td>\n";
          
          
		  	}
		  	howmanyDone++;	
      } // end of inner for loop
      
		  
     }
      newPage += "\n";
      newPage += "<\/tr>";
    }
  return (newPage);
}

/**
 ******* CURRENTLY NOT IN USE*****
 * STILL KEEP IT IN CASE WE NEED 
 * TO IMPLEMENT OWNERSHIP  
 */ 
function bkUp_upOwnership_Stuff()
{
			var vol_unit_List = new Array()
	  	vol_unit_List["selected"]="Select A Unit";
			vol_unit_List["litre2litre"] =  "LITRE";
			vol_unit_List["litre2meter3"] =  "CUBIC METRE";
			vol_unit_List["litre2imp_gal"] =  "IMP.GAL";
			vol_unit_List["litre2usgal"] =  "US.GAL";
			vol_unit_List["litre2kg"] =  "KG";
			
			newPage +="</head>\n";
		  newPage +="\n";
		  newPage +="<body>\n";
		  newPage +="\n";
		  newPage +="<div class=\"content\" id=\"content\">\n";
		  newPage +="\n";
		  newPage +="\n";
		  newPage +="<table border=\"0\" width=\"100%\">\n";
		  newPage +="<tbody>\n";
		  
		  newPage +="    <tr>\n";
		  newPage +="            <td align=\"center\">\n";
		  newPage +="                    <h5>"+updatePageHeading(curViewDetailState,pageHeading)+"</h5>\n";
		  newPage +="            </td>\n";
		  newPage +="    </tr>\n";
			
			newPage += " <tr>\n";
		  newPage += "   <td align=\"left\">\n";
		  newPage += "      <form name=\"ownership\" id=\"ownership\">\n";


		  newPage += "                            <div class=\"adminform\">\n";

		  newPage += "                                    <table>\n";
		  newPage += "                                            <tr>\n";
		  newPage +=
		    "                                                    <td class=\"infotextheading\">\n";
		  newPage +=
		    "                                                            Depot:\n";
		  newPage += "                                                    </td>\n";
		  newPage += "                                                    <td>\n";
		  newPage += "                                                        <select id=\"tankTerm\" name=\"tankTerm\" disabled=\"true\"> \n";
		  newPage += displayDropList(tankTerm, terminal,"Select A Company");
		
		  newPage += "                                                    </td>\n";
		  
		  newPage += "                                            </tr>\n";
		  
		  newPage += "                                            <tr>\n";
		  newPage +=
		    "                                                    <td class=\"infotextheading\">\n";
		  newPage +=
		    "                                                            Product:\n";
		  newPage += "                                                    </td>\n";
		  newPage += "                                                    <td class=\"infotext\">\n"+prodNm;
      newPage += "                                                    </td>\n";
		  newPage += "                                            </tr>\n";
		  newPage += "                                    </table>\n";
		  newPage += "\n";
		  newPage += "                            </div>\n";
		  newPage += "                    </form>\n";
		  newPage += "            </td>\n";
		  newPage += "    </tr>\n";

			newPage +="	<tr>\n";
	    newPage +="		<td align=\"center\">\n";
	    newPage +="			<div class=\"button\"><a href='prod_inv.cgi?op=11&pg=-1&tankTerm="+tankTerm+"&volUnt=litre2litre'>Back to Product Inverntory Page</a>&nbsp;<a href='javascript:void(printSpecial()) '>Print</a></div> <br>\n";
	    newPage +="		</td>\n";
	    newPage +="	</tr>\n";
			
			newPage += "<tr> \n";
      newPage += "<td>\n ";
      newPage +="<div id='printReady'>";
      newPage += table_begin("M", 2,"");
      newPage += "<tbody> \n";
      newPage += "<tr>";
      newPage += "<td>Company<\/td>";
      newPage += "<td>Volume&nbsp;";
		  newPage += "                                                        <select name=\"volUnt\" id=\"volUnt\" onchange=\"update_page(this);\"> \n";
		  newPage += displayunitList(vol,vol_unit_List);      
      newPage += "<\/td>";
      newPage += "<td>Proportion<\/td>";
      newPage += "<\/tr>";
      
    if(vol!='0'&&vol!='selected')
		{
      
      var sum_p = 0;
      var sum_v = 0;
      
      for(i in prod_inv_cmpys)
	    {
	    	if(i>0)
		    	{
		      newPage += "<tr class=\"row1\">\n";
		      for(var j=0; j<6; j++)
		      {
		      	if(vol!='litre2kg')
		      	{
			      	if(j==0)
			      	{
			      		newPage += "<td>" + obs(prod_inv_cmpys[i][j])+"&nbsp;";
			      		
			      	}else if(j==1)
			      	{
			      		newPage +=  obs(prod_inv_cmpys[i][j])+"</td>";
			      	
			      	}
			      	else if(j==2)
			      	{
			      		newPage += "<td>" + UntCnvVol(obs(prod_inv_cmpys[i][j]), vol,1)+"<\/td>";
			      		sum_v = parseFloat(sum_v)+parseFloat(UntCnvVol(obs(prod_inv_cmpys[i][j]), vol,1));
			      		
			      		}else if(j==3)
			      		{
			      			newPage += "<td>" + obs(prod_inv_cmpys[i][j])+"<\/td>";

			      		}
			      	
		      	
		      	}else
		      		{
			      		if(j==0)
				      	{
				      		newPage += "<td>" + obs(prod_inv_cmpys[i][j])+"&nbsp;";
				      		
				      	}else if(j==1)
				      	{
				      		newPage +=  obs(prod_inv_cmpys[i][j])+"</td>";
				      	
				      	}
				      	else if(j==4)
				      	{
				      		
				      		newPage += "<td>" + obs(prod_inv_cmpys[i][j])+"<\/td>";
				      		sum_v = parseFloat(sum_v)+parseFloat(prod_inv_cmpys[i][j]);
				      		
				      		}else if(j==5)
				      		{
				      			newPage += "<td>" + obs(prod_inv_cmpys[i][j])+"<\/td>";

				      			
				      		}
		      		}
		     }
		     
		     newPage += "<\/tr>";
		     newPage += "<tr class=\"row1\">";
		     newPage += "<td>Totals&nbsp;</td>";
		     newPage += "<td>"+sum_v+"</td>";
		     newPage += "<td>"+sum_p+"</td>";
		     newPage += "</tr>";
		  }
		}
	}else
			{
				newPage += "<br> \n";
				
			}
      
      
      
      newPage += "</tbody> \n";  
      newPage += "</table> \n"; 
      newPage +="</div>";  
      newPage += "<\/td>";
      newPage += "<\/tr>";

			
		
}
