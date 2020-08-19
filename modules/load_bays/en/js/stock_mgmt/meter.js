var myColumns = [
			"Meter Code",	"Meter Type","Meter Type Name",	"Observed Volume",	"Standard Volume",	"Mass"
		];
	var mass;
	var volume;

function renderPage(cRec, cCol, cState, cPageState,priv,unit,lang)
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

	
  	 //alert("time to do conversion and volume unit is"+volume);	
     //alert("time to do conversion and mass unit is"+mass);
     // updated by Abdul 31st October 2005
     // fix the bug only display data when 
     // both the mass and volume unit are selected
     //alert("I want to display");
		if((mssUnt!='-1' && volUnt!='-1' && mssUnt!='selected' && volUnt!='selected' ))
    {
      //alert("I want to display");
  		for(i in meterings_tab)
      {
        newPage += "<tr class=\"row1\">\n";
        if(i>0) 
        {
           for(var j=0; j<myColumns.length; j++)
          {
  					
  						  if(j>2&&j<myColumns.length-1)
  								{
  								  
  								  
  									newPage += "<td>" + UntCnvVol(obs(meterings_tab[i][j]), volUnt,1)+"<\/td>";
  
  								}
								else if(j==1)
                                                                {
                                                                        newPage += "<td>" + "Bay" + "<\/td>";
                                                                }
								else if(j==myColumns.length-1)
  								{
  								 
  									newPage += "<td>" + UntCnvMass(obs(meterings_tab[i][j]),mssUnt)+"<\/td>";
  									
  								}
                  else
  								{
  										newPage += "<td>" + obs(meterings_tab[i][j]) + "<\/td>";
  										
  								} 
  
        	}
          newPage += "\n";
          newPage += "<\/tr>";
        }
        
        
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

function displayunitList(unitSelected, list)
{
  //alert(unitSelected);	
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
function displayGlblFrm()
{

		//alert("QQQQQ"+mass);
		//alert("UUUUU"+volume);
//	var selected_unit = unit;
//	alert(selected_unit);
	var mass_unit_List = new Array()
	mass_unit_List["selected"]="Select A Unit";
	mass_unit_List["kgram2kgram"] =  "kg";
	mass_unit_List["kgram2pound"] =  "lb";
	mass_unit_List["kgram2imp_ton"] =  "ton IMP";
	mass_unit_List["kgram2ton"] =  "ton";
	
	
  var vol_unit_List = new Array()
  vol_unit_List["selected"]="Select A Unit";
	vol_unit_List["litre2litre"] =  "Litre";
	vol_unit_List["litre2meter3"] =  "m3";
	vol_unit_List["litre2imp_gal"] =  "gal IMP";
	vol_unit_List["litre2usgal"] =  "gal US";
	vol_unit_List["litre2imbarrel"] =  " bbl IMP";
	vol_unit_List["litre2usbarrel"] =  " bbl US";
  
  var glblFrm = "";
  glblFrm += fieldst_HTML("unit selection details");
  glblFrm += "      <form name=\"glblFrm\" id=\"glblFrm\">\n";
  glblFrm += "<input type=\"hidden\" name=\"op\" value=\"1\">\n";
  glblFrm += "<input type=\"hidden\" name=\"pg\" value=\"1\">\n";
  glblFrm += "                            <div class=\"adminform\">\n";
  glblFrm +="                                    Select the Mass Unit Or Volume Unit, To View meterings\n";
  glblFrm += "                                    <table>\n";
  glblFrm += "                                            <tr>\n";
  glblFrm +=
    "                                                    <td class=\"infotextheading\">\n";
  glblFrm +=
    "                                                            Mass Unit:\n";
  glblFrm += "                                                    </td>\n";
  glblFrm += "                                                    <td>\n";
  glblFrm += "                                                        <select id=\"mssUnt\" name=\"mssUnt\" onchange=\"form.submit();\"> \n";
  glblFrm += displayunitList(mssUnt,mass_unit_List);

  glblFrm += "                                                    </td>\n";
  
  glblFrm += "                                            </tr>\n";
  
  glblFrm += "                                            <tr>\n";
  glblFrm +=
    "                                                    <td class=\"infotextheading\">\n";
  glblFrm +=
    "                                                            Volume Unit:\n";
  glblFrm += "                                                    </td>\n";
  glblFrm += "                                                    <td>\n";
  glblFrm += "                                                        <select name=\"volUnt\" id=\"volUnt\" onchange=\"form.submit();\"> \n";
  glblFrm += displayunitList(volUnt,vol_unit_List);

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
    pageHeading +="meterings";
  }
  
 
  return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
  if (op <= 1 || op > 10)
  {
    pageTitle +="DKI Omega Menu :: STOCK MANAGEMENT, Meterings Page";
    
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
  //alert("value of volume is" +volume);
  //alert("value of mass is" +mass);
	if(selectedValue!='kgram2kgram'&&selectedValue!='kgram2pound'&&selectedValue!='kgram2imp_ton'&&selectedValue!='kgram2ton'&&selectedValue!='selected')
	{
		volume = selectedValue;
		renderPage('0', 'name', 0, 'loaded',8,selectedValue, 'en');
	}
	else
	{
		if(selectedValue!='selected')
		{
			mass = selectedValue;
		  renderPage('0', 'name', 0, 'loaded',8,selectedValue, 'en');
		}
	  else
		{
			renderPage('0', 'name', 0, 'loaded',8,selectedValue, 'en');
		}
		
  }
}
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage, curPageIn)
{
    
  // loaded material should go here
  if (curPageIn == "loaded")
  {
    newPage +="\n";
    newPage +="<SCRIPT src=\"/en/js/stock_mgmt/meter.js\"></SCRIPT>\n";		
    newPage += "\n<script type=\"text\/javascript\">\n";
		newPage += "<!--\n";
		newPage += "mass = \""+mass+"\";\n";
		newPage += "volume = \""+volume+"\";\n";
		newPage += "var meterings_tab = [\n"; 
    newPage +="[ ";  
    newPage +="\"\"";
    newPage +=", "; 
    newPage +="\"0\"";
    newPage +=", "; 
    newPage +="\"\"";
    newPage +=", ";
    newPage +="\"0\"";
    newPage +=", "; 
    newPage +="\"0\"";
    newPage +=", "; 
    newPage +="\"0\"";
    newPage +=" ]\n"; 
    
    for(i in meterings_tab)
    {
      
      if (i>0)
      {
        newPage += ",[\n";
        for(var j=0; j<myColumns.length+1; j++)
        {
          if(j==0)
          {
            newPage += "\'"+meterings_tab[i][j]+"'";
          }
          else
          {          
            newPage += "\,'"+meterings_tab[i][j]+"'";
  				}
        }
        newPage += "]\n";
      }
      
    }
    newPage += "];\n";
    
    newPage += "\/\/-->\n";
		newPage += "<\/script>\n";
	
	}
  else
  {
    newPage += "\n<script type=\"text\/javascript\">\n";
	  newPage += "mass = 0;\n";
	  newPage += "volume = 0;\n";
    newPage += "<\/script>\n";			
	}// end the loaded part here
  newPage +="</head>\n";
  newPage +="\n";
  newPage +="<body>\n";
  //newPage += "\n<script type=\"text\/javascript\">\n";
  //newPage += "writeBack();\n";
  //newPage += "\n<\/script>\n";
  
  newPage +="\n";
  
  return (newPage);
}
