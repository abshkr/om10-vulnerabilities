	var myColumns = [
			"Tank Product Code",	"Tank Product", "Transfer Volume"
		];

	
		
		

function renderPage(cRec, cCol, cState, cPageState,priv,unit, lang)
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

    newPage += displayGlblFrm();
      
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
		

		for(i in baseProd_Total_jsArr)
    {
      newPage += "<tr class=\"row1\">\n";
      if(i>0) 
      {
         for(var j=0; j<myColumns.length; j++)
        {
            newPage += "<td>" + obs(baseProd_Total_jsArr[i][j]) + "<\/td>";
          
						
        }
        newPage += "\n";
        newPage += "<\/tr>";
      }
      
      
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
    pageHeading +="Tank Transfers";
  }
  
 
  return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
  if (op <= 1 || op > 10)
  {
    pageTitle +="DKI Omega Menu :: STOCK MANAGEMENT, Tank Transfer Volume";
    
  }
  
  return pageTitle;
}

function displayGlblFrm()
{
   
		
		var last_cls_myDate = "Last Close Out Date";
		var last_cls_Time = "Last Close Out Time";
  

  var glblFrm = "";
  glblFrm += "<tr>\n";
  glblFrm += "<td>\n";  
  glblFrm += "<table>\n";
  glblFrm += "<tr>\n";
  glblFrm += "<td class=\"infotextheading\" style=\"font-weight:bold\">\n";
  glblFrm += ""+last_cls_myDate+":\n";
  glblFrm += " </td>\n";
  glblFrm += "<td class=\"infotext\">\n";
  
  glblFrm += cls_out_date + " (dd/mm/YYYY)";

  glblFrm += " </td>\n";
  
  glblFrm += " </tr>\n";
  
  
  glblFrm += "<tr>\n";
  glblFrm += "<td class=\"infotextheading\" style=\"font-weight:bold\" >\n";
  glblFrm += ""+last_cls_Time+":\n";
  glblFrm += " </td>\n";
  glblFrm += "<td class=\"infotext\">\n";
  
  glblFrm += last_cls_out_hour +":"+last_cls_out_min+":"+last_cls_out_sec + " (HH:mm:ss)";

  glblFrm += " </td>\n";
  
  glblFrm += " </tr>\n";
  
  
  
  
  glblFrm += "                                    </table>\n";
  glblFrm += "\n";
 
  glblFrm += "                    </form>\n";
  glblFrm += "            </td>\n";
  glblFrm += "    </tr>\n";
  return glblFrm;

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
  newPage +="</script>\n";
  newPage +="\n";
  newPage +="</head>\n";
  newPage +="\n";
  newPage +="<body>\n";
  
  newPage +="\n";
  
  return (newPage);
}
