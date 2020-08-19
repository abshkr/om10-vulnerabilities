/* File Name: report_scheduling.js  */
var myColumns = 
["Report Name",	"Description", "Type", "Active", "Enabled"];
	
		
/*
var meterings_tab = [
[ "", "0", "", "0", "0", "0" ]
,[ "NONE", "0", "*****", "0.0", "0.0", "0.0" ]
,[ "11", "2", "P-D", "36154.0", "36138.0", "0.0" ]
,[ "12", "2", "P-D", "190456.0", "188757.0", "0.0" ]
,[ "13", "2", "P-D", "330227.0", "328448.0", "0.0" ]
,[ "14", "2", "P-D", "295214.0", "293666.0", "0.0" ]
,[ "21", "2", "P-D", "0.0", "0.0", "0.0" ]
,[ "22", "2", "P-D", "270413.0", "268987.0", "0.0" ]
,[ "23", "2", "P-D", "320113.0", "318421.0", "0.0" ]
,[ "24", "2", "P-D", "261011.0", "258697.0", "0.0" ]
,[ "31", "2", "P-D", "206353.0", "205067.0", "0.0" ]
,[ "32", "2", "P-D", "0.0", "0.0", "0.0" ]
,[ "33", "2", "P-D", "0.0", "0.0", "0.0" ]
,[ "34", "2", "P-D", "254403.0", "252875.0", "0.0" ]
,[ "41", "2", "P-D", "379590.0", "375952.0", "0.0" ]
,[ "42", "2", "P-D", "0.0", "0.0", "0.0" ]
,[ "43", "2", "P-D", "183005.0", "181972.0", "0.0" ]
,[ "44", "2", "P-D", "381747.0", "378265.0", "0.0" ]
,[ "51", "2", "P-D", "15642.0", "15631.0", "0.0" ]
,[ "52", "2", "P-D", "342375.0", "340360.0", "0.0" ]
,[ "53", "2", "P-D", "193481.0", "191728.0", "0.0" ]
,[ "54", "2", "P-D", "209841.0", "208500.0", "0.0" ]
,[ "61", "2", "P-D", "0.0", "0.0", "0.0" ]
,[ "62", "2", "P-D", "263630.0", "261265.0", "0.0" ]
,[ "63", "2", "P-D", "223769.0", "221765.0", "0.0" ]
,[ "64", "2", "P-D", "106915.0", "106432.0", "0.0" ]
,[ "71", "2", "P-D", "20005.0", "20032.0", "0.0" ]
,[ "72", "2", "P-D", "265897.0", "263277.0", "0.0" ]
,[ "73", "2", "P-D", "48508.0", "48477.0", "0.0" ]
,[ "74", "2", "P-D", "274793.0", "272095.0", "0.0" ]
,[ "81", "2", "P-D", "0.0", "0.0", "0.0" ]
,[ "82", "2", "P-D", "37796.0", "37821.0", "0.0" ]
,[ "83", "2", "P-D", "33220.0", "33241.0", "0.0" ]
,[ "84", "2", "P-D", "0.0", "0.0", "0.0" ]
];
*/

function renderPage(cRec, cCol, cState, cPageState, priv, unit)
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

  newPage +="<html>\n";
  newPage +="<head>\n";
  newPage +="<title>"+updatePageTitle(curViewDetailState,pageTitle)+"</title>\n";
  newPage +="\n";
  newPage +="<link rel=\"stylesheet\" type=\"text/css\" href=\"/omega/en_omega/style/site.css\" />\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/utility.js\"></SCRIPT>\n";
  newPage +="\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/popup.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/mtmtrack.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/qstring.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/convertor.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/rpt_adm/report_scheduling.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/validate.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/redirect.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/CalendarPopup.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/comm_HTML.js\"></SCRIPT>\n";
  newPage +="<SCRIPT LANGUAGE=\"JavaScript\">\n";
  newPage +="/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
  newPage +="FUNCTION [ submitmyform] \n";
  newPage +="[PURPOSE]  		-> 	Always use this method to submit a form,\n";
  newPage +="					gives me the flexbility of doing validation\n";
  newPage +="					and addition if required before i submit the form\n";
  newPage +="          \n";
  newPage +="[Parameter]  	-> myobject FORM OBJECT Parameter is the form need to be submit\n";
  newPage +="[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
  newPage +="'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
  newPage +="function submitmyform(myobject)\n";
  newPage +="{\n";
  newPage +="	//var myHiddenOb;\n";
  newPage +="	\n";
  newPage +="	//myHiddenOb = getElemRefs(\"prev_qstring\";\n";
  newPage +="	//myHiddenOb.value=produceQString(;\n";
  newPage +="	//return formcheck(myobject;\n";
  newPage +="	return Validator.Validate(myobject,1);\n";
  newPage +="}\n";
  newPage +="</script>\n";
  newPage +="\n";
  
    // loaded material should go here
  
  
  if (curPageIn == "loaded")
  {
		
		
		
		newPage += "\n<script type=\"text\/javascript\">\n";
		newPage += "<!--\n";
		
//		newPage += "var depot =";
//		newPage += "\'"+tankTerm+"';\n";
		newPage += "var tankTerm =";
		newPage += "\'"+tankTerm+"';\n";
//		newPage += "alert(tankTerm);\n"
		
		
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
          
          {newPage += "\'"+site_bal_tab[i][j]+"'";}
        else{          
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
          
          {newPage += "\'"+terminal[i][j]+"'";}
        else{          
          newPage += "\,'"+terminal[i][j]+"'";
  					}
        }
        newPage += "]\n";
      }
      
    }
    newPage += "]\n";   
    
		newPage += "\/\/-->\n";
		newPage += "<\/script>\n";
	
	}else
		{
				newPage += "";
//			alert("old"+tankTerm);
			
			}
  
  // end the loaded part here
  
  
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
  
  

	
	
	
	if (curViewDetailState <= 1 || curViewDetailState > 10) // view records
  {

    newPage += displayGlblFrm(vol,tankTerm);
    newPage +=addPrintBtn_HTML();
  	 if( ((myColumns.length)> 0))
     {
        newPage += "<tr> \n";
        newPage += "<td>\n ";
        newPage += table_begin("M", 0,"");
        newPage += "<tbody> \n";
        newPage += "<tr>";
         for(var i=0; i<myColumns.length; i++)
        {
          newPage += "<td>"+myColumns[i]+"<\/td>";
        }
        newPage += "<\/tr>";
     }

	
  		/*
      myComputers.sort(
  			function MySort(a, b){
  				if(a[curColumnToSort] < b[curColumnToSort]){
  					return -1;
  				}
  				if(a[curColumnToSort] > b[curColumnToSort]){
  					return 1;
  				}
  				return 0;
  			}
  
  		);
  		*/
		if(vol!='0')
		{

		for(i in site_bal_tab)
    {
      newPage += "<tr class=\"row1\">\n";
      if(i>0) 
      {
         for(var j=0; j<myColumns.length; j++)
        {
//          if (curColumnToSort == j)
//          {
//            newPage += "<td style=\"background-color:#EEEEEE\">" + obs(site_bal_tab[i][j]) + "<\/td>";
//  			  } 
          if(j>2)
//          {
//          	if(vol=='0')
//						{ 
//							vol = "litre2litre";
//							newPage += "<td>" + UntCnvVol(obs(site_bal_tab[i][j]), vol,obs(site_bal_tab[i][myColumns.length])) +"<\/td>";
						
//						}else
							{
								newPage += "<td>" + UntCnvVol(obs(site_bal_tab[i][j]), vol,obs(site_bal_tab[i][myColumns.length]))+"<\/td>";
							}

//					}
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
    newPage += "<\/td>";	
    newPage += "<\/tr>";
			

		  

		}
	newPage +="  </tbody>\n";
  newPage +=" </table>\n";
  newPage +="\n";
  newPage +="<div id=\"footer\" class=\"footer\">\n";
  newPage +="\n";
  newPage +="</div>\n";
  newPage +="\n";
  newPage +="<div id=\"footer1\"></div>\n";
  newPage +="<div id=\"footer2\"><a href=\"http://www.diamondkey.com/Front/DiamondKeyInternational.html/\">Diamond Key International Omega 3000 V8.0</a></div>\n";
  newPage +="\n";
  newPage +="</body>\n";
  newPage +="</html>\n";
  newPage +="\n"; 
	return(newPage);
  document.close();

	
}

function updateData(cCol, cState, cComID, cPageState){

	myComputers[cComID].name = document.ComputerInfo.name.value;
	myComputers[cComID].primaryuse = document.ComputerInfo.primaryuse.value;
	myComputers[cComID].mac = document.ComputerInfo.mac.value;
	myComputers[cComID].ip = document.ComputerInfo.ip.value;
	myComputers[cComID].os = document.ComputerInfo.os.value;
	myComputers[cComID].ram = document.ComputerInfo.ram.value;
	myComputers[cComID].cpuhz = document.ComputerInfo.cpuhz.value;

	myComputers[cComID].cpumodel = document.ComputerInfo.cpumodel.value;
	myComputers[cComID].graphiccard = document.ComputerInfo.graphiccard.value;
	myComputers[cComID].harddrive = document.ComputerInfo.harddrive.value;
	myComputers[cComID].mainboard = document.ComputerInfo.mainboard.value;
	myComputers[cComID].primarymaster = document.ComputerInfo.primarymaster.value;
	myComputers[cComID].opticaldevice = document.ComputerInfo.opticaldevice.value;
	myComputers[cComID].networkcard = document.ComputerInfo.networkcard.value;
	myComputers[cComID].networkmb = document.ComputerInfo.networkmb.value;
	myComputers[cComID].primaryuser = document.ComputerInfo.primaryuser.value;

	var newName = myComputers[cComID].name;

	renderPage(newName, cCol, cState, cPageState);
	
}

function addnewData(cCol, cState, cPageState, count){

	var checkname = document.ComputerInfo.name.value;

	if(checkname == ""){
		alert("The item has to have a name");
		return 0;
	}

	var a;
	var b;
	var c;
	var d;
	var e;
	var f;
	var g;
	var h;
	var i;
	var j;
	var k;
	var l;
	var m;
	var n;
	var o;
	var p;

	a = document.ComputerInfo.name.value
	b = document.ComputerInfo.ip.value
	c = document.ComputerInfo.mac.value
	d = document.ComputerInfo.os.value
	e = document.ComputerInfo.primaryuse.value
	f = document.ComputerInfo.ram.value
	g = document.ComputerInfo.cpuhz.value
	h = document.ComputerInfo.cpumodel.value
	i = document.ComputerInfo.graphiccard.value
	j = document.ComputerInfo.harddrive.value
	k = document.ComputerInfo.mainboard.value
	l = document.ComputerInfo.primarymaster.value
	m = document.ComputerInfo.opticaldevice.value
	n = document.ComputerInfo.networkcard.value
	o = document.ComputerInfo.networkmb.value
	p = document.ComputerInfo.primaryuser.value

	databaseCreate(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);

	var newName = myComputers[count].name;

	renderPage(newName, cCol, cState, cPageState);

	
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
  glblFrm += " <tr>\n";
  glblFrm += "   <td align=\"left\">\n";
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
  glblFrm += "                                                        <select name=\"volUnt\" id=\"volUnt\" onchange=\"update_page(this);\"> \n";
  glblFrm += displayunitList(selected_unit,vol_unit_List);
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
    pageHeading +="SITE BALANCE";
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
	alert(selectedValue);
	//element=this.option[
	//print_html_page_head("DKI Omega Menu :: STOCK MANAGEMENT, Stock Inventory","Product Inventory");
	//document.write("page!");
	//document.write("<script language=\"JavaScript\" type=\"text/javascript\">\n");
	//displayGlblFrm();
	//
	//document.write("<!--\n");
	renderPage('0', 'name', 0, 'loaded',8,selectedValue);
	//document.write("//-->\n");
	//document.write("</script>");

}
