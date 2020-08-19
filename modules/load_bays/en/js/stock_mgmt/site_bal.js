	var myColumns = [
			"Tank Code",	"Product Code","Tank Product","[1]Opening Stock",	"[2]Receipts to Site"
      ,	"[3]=[1+2]Total Acc",	"[4] To Transfer for Offsite","[5]=[3-4] Book Balance"
      ,"[6]Closing Stock", "[6-5]Gain/(Loss)", "Explain Loss/Gain"
		];

	var btnExplain = "Explain";
		
/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
  var expMsgs= new Array()
    expMsgs["no_exp"]= " No gain or loss has occurred. No explanation required!";
    expMsgs["stock_gain"]= "STOCK_GAIN";
    expMsgs["stock_los"]= "STOCK_LOSS";
    expMsgs["cont_hdoff"] = "No explanation required Contact Head Office";
		
	
		//var vuListHash = new Hashtable();
		//vuListHash.hashtable = vol_unit_List;
		
		

function renderPage(cRec, cCol, cState, cPageState,priv,unit, lang)
{ 
  
	var curRecord = cRec;
	var curColumnToSort = cCol;
	var curViewDetailState = cState;
	var curPageIn = cPageState;
	var curPrivilage = priv;
	var vol = unit;
  
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
  newPage += local_HeadrHTML(newPage, curPageIn);
  //getToolBar_HTML function of comm_HTML.js file responsible for  
  // outputting the tool bar
  //controls the search and print buttons as well
  newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),true, true);
  newPage +="<tr>\n";  
  newPage +="<td width=\"100%\">             \n";
  newPage +="<div class=\"content\" id=\"content\">\n";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";  
	
	if (curViewDetailState <= 1 || curViewDetailState > 10) // view records
  {

    newPage += displayGlblFrm(vol,tankTerm);
   
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
		if(volUnt!='-1'&& volUnt!='selected')
		{

		for(i in site_bal_tab)
    {
      newPage += "<tr class=\"row1\">\n";
      if(i>0) 
      {
         for(var j=0; j<myColumns.length; j++)
        {

          
						if(j==(myColumns.length-1)) 
						{
						  newPage += "<form>";
              newPage += "<td>" + "<input type=\"button\" name=\"rpt\" value=\""+btnExplain+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" onClick=\"explain('"+site_bal_tab[i][j]+"')\"  /><\/td>";
			        newPage += "</form>";
						}
						else if(j>2)
						{
								newPage += "<td>" + UntCnvVol(obs(site_bal_tab[i][j]), volUnt,obs(site_bal_tab[i][myColumns.length]))+"<\/td>";
						}
						else 
						{
						newPage += "<td>" + obs(site_bal_tab[i][j]) + "<\/td>";
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
	  newPage += "<\/tbody>";
    newPage += "<\/table>";
    newPage += "<\/div>\n" ;
    newPage += "<\/td>";	
    newPage += "<\/tr>";
			

		  

		}
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
    var vol_unit_List = new Array()
		vol_unit_List["selected"]="Select A Unit";
		vol_unit_List["litre2litre"] =  "LITRE";
		vol_unit_List["litre2meter3"] =  "CUBIC METRE";
		vol_unit_List["litre2imp_gal"] =  "IMP.GAL";
		vol_unit_List["litre2usgal"] =  "US.GAL";
		vol_unit_List["litre2kg"] =  "KG";
  

  var glblFrm = "";
  glblFrm += fieldst_HTML("depot and unit details");
  glblFrm += "      <form name=\"glblFrm\" id=\"glblFrm\">\n";
  glblFrm += "<input type=\"hidden\" name=\"op\" value=\"1\">\n";
  glblFrm += "<input type=\"hidden\" name=\"pg\" value=\"8\">\n";
  glblFrm += "                            <div class=\"adminform\">\n";
  glblFrm +="                                    Select the Depot and Volume Unit, To View Site Balance\n";
  glblFrm += "                                    <table>\n";
  glblFrm += "                                            <tr>\n";
  glblFrm +=
    "                                                    <td class=\"infotextheading\">\n";
  glblFrm +=
    "                                                            Depot:\n";
  glblFrm += "                                                    </td>\n";
  glblFrm += "                                                    <td>\n";
  glblFrm += "                                                        <select id=\"tankTerm\" name=\"tankTerm\" onchange=\"submit();\"> \n";
//	glblFrm += displayunitList("0",terminal);
  glblFrm += displayDropList(selected_dep,terminal,"Select A Depot");

  glblFrm += "                                                    </td>\n";
  
  glblFrm += "                                            </tr>\n";
  
  glblFrm += "                                            <tr>\n";
  glblFrm +=
    "                                                    <td class=\"infotextheading\">\n";
  glblFrm +=
    "                                                            Volume Unit:\n";
  glblFrm += "                                                    </td>\n";
  glblFrm += "                                                    <td>\n";
  glblFrm += "                                                        <select name=\"volUnt\" id=\"volUnt\" onchange=\"submit(this);\"> \n";
  glblFrm += displayunitList(volUnt,vol_unit_List);
//	glblFrm += "                                                        <option value=\"\" selected >Select A Unit</option>\n";
//	glblFrm += "                                                          <option value=\"litre2litre\">Litre</option>\n";
//  glblFrm += "                                                          <option value=\"litre2meter3\">Cubic Metres</option>\n";
//  glblFrm += "                                                          <option value=\"litre2usgal\">U.S.GAL</option>\n";
//  glblFrm += "                                                          <option value=\"litre2kg\">KG</option>\n";
  
  glblFrm += "                                                    </td>\n";
  
  glblFrm += "                                            </tr>\n";
  
  
  glblFrm += "                                    </table>\n";
  glblFrm += "\n";
  glblFrm += "                            </div>\n";
  glblFrm += "                    </form>\n";
  glblFrm += "            </td>\n";
  glblFrm += "    </tr>\n";
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
function updatePageHeading(op,pgHead)
{
  var pageHeading = pgHead;
  if (op <= 1 || op > 10)
  {
    pageHeading +="site balance";
  }
  
 
  return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
  if (op <= 1 || op > 10)
  {
    pageTitle +="DKI Omega Menu :: STOCK MANAGEMENT, Site Balance Page";
    
  }
  
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
	//alert(selectedValue);
	//element=this.option[
	//print_html_page_head("DKI Omega Menu :: STOCK MANAGEMENT, Stock Inventory","Product Inventory");
	//document.write("page!");
	//document.write("<script language=\"JavaScript\" type=\"text/javascript\">\n");
	//displayGlblFrm();
	//
	//document.write("<!--\n");
	renderPage('0', 'name', 0, 'loaded',8,selectedValue, 'en');
	//document.write("//-->\n");
	//document.write("</script>");

}
function explain(inputVal)
{
  if(inputVal>0)
  {
    alert(expMsgs["stock_gain"]);
  }
  else if(inputVal<0)
  {
    alert(expMsgs["stock_los"]);
  }
  else if(inputVal==0)
  {
    alert(expMsgs["no_exp"]);
  }
 else
 {
  alert(expMsgs["cont_hdoff"]);
 }
 return false; 
}
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage, curPageIn)
{
  newPage +="<script>\n";
  newPage += "var op =";
	newPage += "\'"+op+"';\n";
	newPage += "var priv =";
	newPage += "\'"+priv+"';\n";	
	newPage += "var prodNm =";
	newPage += "\'"+prodNm+"';\n";
  newPage +="</script>\n";
  newPage +="\n";
  // loaded material should go here
  if (curPageIn == "loaded")
  {
    newPage +="<SCRIPT src=\"/en/js/stock_mgmt/site_bal.js\"></SCRIPT>\n";		
		newPage += "\n<script type=\"text\/javascript\">\n";
		newPage += "<!--\n";	

		newPage += "var tankTerm =";
		newPage += "\'"+tankTerm+"';\n";
    		
		newPage += "var site_bal_tab = [\n"; 
    newPage +="[ ";  
    newPage +="\"\"";
    newPage +=", "; 
    newPage +="\"\"";
    newPage +=", ";
    newPage +="\"\"";
    newPage +=", "; 
    newPage +="\"0\"";
    newPage +=", "; 
    newPage +="\"0\"";
    newPage +=", "; 
    newPage +="\"0\"";
    newPage +=", "; 
    newPage +="\"0\"";
    newPage +=", "; 
    newPage +="\"0\"";
    newPage +=", "; 
    newPage +="\"0\"";
    newPage +=" ]\n"; 		

		for(i in site_bal_tab)
    {
      
      if (i>0)
      {
        newPage += ",[\n";
        for(var j=0; j<myColumns.length+1; j++)
        {
          if(j==0)          
          {
            newPage += "\'"+site_bal_tab[i][j]+"'";
          }
          else
          {          
            newPage += "\,'"+site_bal_tab[i][j]+"'";
  				}
        }
        newPage += "]\n";
      }
      
    }
    newPage += "];\n"; 
    
    newPage += "var terminal = [\n"; 
    newPage +="[ ";  
    newPage +="\"\"";
    newPage +=", "; 
    newPage +="\"\"";
    newPage +=" ]\n"; 
    
    for(i in terminal)
    {
      
      if (i>0)
      {
    		newPage += ",[\n";
        for(var j=0; j<2; j++)
        {
          if(j==0)          
          {
            newPage += "\'"+terminal[i][j]+"'";
          }
          else
          {          
            newPage += "\,'"+terminal[i][j]+"'";
  				}
        }
        newPage += "]\n";
      }
      
    }
    newPage += "]\n";
    newPage += "\/\/-->\n";
		newPage += "<\/script>\n";
	
	} // end the loaded part here
  newPage +="</head>\n";
  newPage +="\n";
  newPage +="<body>\n";
  
  newPage +="\n";
  
  return (newPage);
}
