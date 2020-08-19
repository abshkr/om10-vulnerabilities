	var myColumns = [
			"Tank",	"Location","Product name",	"Level[mm]"
      ,	"Temp[DegC]",	"Standard Volume[CorL]","Observed Volume[ObsL]","Pumpable Volume[ObsL]"
      ,"Opening Stock[CorL]", "Book Balance[CorL]"
		];
		
	var btnRefreshText = "Refresh";
		
function renderPage(cRec, cCol, cState, cPageState,priv, lang)
{ 
  
	var curRecord = cRec;
	var curColumnToSort = cCol;
	var curViewDetailState = cState;
	var curPageIn = cPageState;
	var curPrivilage = priv;
//  var vol = unit;
  
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
  newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),true, true);
  newPage +="<tr>\n";  
  newPage +="<td width=\"100%\">             \n";
  newPage +="<div class=\"content\" id=\"content\">\n";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";  
  //start after the global form
  // if OP is <=1 OR Higher than available options should always come to this view	
	//if (curViewDetailState <= 1 || curViewDetailState > 10) // view records
  {
      newPage +=displayGlblFrm();
      newPage += "<tr> \n";
      newPage += "<td>\n ";
  	  newPage += infoTableHdr_HTML();
      newPage += infoTable_HTML(curColumnToSort);
      newPage += "<\/tbody>";
      newPage += "<\/table>";
      newPage += "<\/div>";
  		newPage += "<\/td>";	
  		newPage += "<\/tr>";    
   
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
  glblFrm += fieldst_HTML("depot details");
  glblFrm += "      <form name=\"glblFrm\" id=\"glblFrm\">\n";
  glblFrm += "<input type=\"hidden\" name=\"op\" value=\"1\">\n";
  glblFrm += "<input type=\"hidden\" name=\"pg\" value=\"1\">\n";
  glblFrm += "                            <div class=\"adminform\">\n";
  glblFrm +="                                    Select the Depot, To View Tank Inventory\n";
  glblFrm += "                                    <table>\n";
  glblFrm += "                                            <tr>\n";
  glblFrm +=
    "                                                    <td class=\"infotextheading\">\n";
  glblFrm +=
    "                                                            Depot:\n";
  glblFrm += "                                                    </td>\n";
  glblFrm += "                                                    <td>\n";
  glblFrm += "                                                        <select id=\"tankTerm\" name=\"tankTerm\" onchange=\"submit();\"> \n";
  glblFrm += displayDropList(tankTerm, terminal,"Select Terminal");

  glblFrm += "                                                    </td>\n";
  
	glblFrm += "<td>\n";
	glblFrm += "<input type=\"button\" style=\"FONT-SIZE:0.75em; WIDTH:  6.5em; HEIGHT:  2.2em;\" value=\"" + btnRefreshText + "\"";
	glblFrm += "onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" onclick=\"submit();\"/>";
	glblFrm += "</td>\n";
  
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
    pageHeading +="tank inventory";
  }
  return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
  if (op <= 1 || op > 10)
  {
    pageTitle +="STOCK MANAGEMENT, Tank Inventory Page";
    
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
  
  return (newPage);
}
/* define infoTable_HTML() 
 * responsible for printing the HTML Table
 * to display the records on this page  
 */
function infoTable_HTML(curColumnToSort)
{
  var newPage ="";
	for(i in tank_inv_tab)
    {
      if(i>0)
      {
        newPage += "<tr class=\"row1\">\n";
        for(var j=0; j<myColumns.length; j++)
        {
  				newPage += "<td>" + obs(tank_inv_tab[i][j]) + "<\/td>";
        }
        newPage += "\n";
        newPage += "</tr>";
      }
    }	
  return (newPage);
}
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage)
{
  newPage +="\n";
  newPage +="</head>\n";
  newPage +="\n";
  newPage +="<body>\n";
  
  newPage +="\n";
  newPage +="\n";
  return (newPage);
}
