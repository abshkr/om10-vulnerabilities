	var myColumns = [
			"Product",	"Net","Gross",	"Usable"
      ,	"Book bal"
		];
		

function renderPage(cCom, cCol, cState, cPageState,unit)
{

	var curComputer = cCom;
	var curColumnToSort = cCol;
	var curViewDetailState = cState;
	var curPageIn = cPageState;
//	var curPrivilage = priv;
	var vol = unit;


	var newPage = "";
	var pageTitle="";
  var pageHeading="";
  newPage +="<html>\n";
  newPage +="<head>\n";
  newPage +="<title>"+"DKI Omega Menu :: STOCK MANAGEMENT, Stock Inventory Product, Inventory"+"</title>\n";
  newPage +="\n";
  newPage +="<link rel=\"stylesheet\" type=\"text/css\" href=\"/omega/en_omega/style/site.css\" />\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/utility.js\"></SCRIPT>\n";
  newPage +="\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/popup.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/mtmtrack.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/qstring.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/validate.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/redirect.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/CalendarPopup.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/convertor.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/stock_mgmt/prod_inv.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/comm1_HTML.js\"></SCRIPT>\n";
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
		newPage += "var prod_inv_tab = [\n"; 
    newPage +="[ ";  
//    newPage +="\"\"";
//    newPage +=", "; 
    newPage +="\"\"";
    newPage +=", "; 
    newPage +="\"0\"";
    newPage +=", "; 
    newPage +="\"0\"";
    newPage +=", "; 
    newPage +="\"0\"";
    newPage +=", "; 
    newPage +="\"0\"";
    newPage +=" ]\n"; 
		

		for(i in prod_inv_tab)
    {
      
      if (i>0)
      {
        newPage += ",[\n";
        for(var j=0; j<myColumns.length; j++)
        {
          if(j==0)
          
          {newPage += "\'"+prod_inv_tab[i][j]+"'";}
        else{          
          newPage += "\,'"+prod_inv_tab[i][j]+"'";
  					}
        }
        newPage += "]\n";
      }
      
    }
    newPage += "];\n"; 
		newPage += "\/\/-->\n";
		newPage += "<\/script>\n";
	
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
  newPage +="                    <h5>"+"Product Inventory"+"</h5>\n";
  newPage +="            </td>\n";
  newPage +="    </tr>\n";
  
/*  newPage +="<SCRIPT LANGUAGE=\"JavaScript\">\n";
  
  
  if(curPageIn=="loaded")
  {
  	var tmp
	  for(i in mass_unit_List)
	  	{	if(i>0)
	  		{	  			
	  			tmp += "var mass_unit_List[i]";
	  			
	  		}
	  	}
	  	alert(tmp);
	  newPage +="</script>\n";
	}*/
  					
  					
	
	
	
	if (curViewDetailState == "overview")
  {
			newPage +=displayGlblFrm();

      
			newPage += "<tr> \n";
      newPage += "<td>\n ";
    
  	 if( ((myColumns.length)> 0))
     {
        newPage += table_begin("M", 0,"");
        newPage += "<tbody> \n";
        newPage += "<tr>";
        
         for(var i=0; i<myColumns.length; i++)
        {
          newPage += "<td>"+myColumns[i]+"<\/td>";
        }
        newPage += "<\/tr>";
     }

	

		for(i in prod_inv_tab)
    {
      newPage += "<tr class=\"row1\">\n";
      for(var j=0; j<myColumns.length; j++)
      {
//        if (curColumnToSort == j)
//        {
  //        newPage += "<td style=\"background-color:#EEEEEE\">" + obs(prod_inv_tab[i][j]) + "<\/td>";
//			  } 
//        else 
//        {
					if(j>0)
					{
						
						if(vol=='0')
						{ 
							vol = "litre2litre";
							newPage += "<td>" + UntCnvVol(obs(prod_inv_tab[i][j]), vol,100) +"<\/td>";
						
						}else
							{
								newPage += "<td>" + UntCnvVol(obs(prod_inv_tab[i][j]), vol,100)+"<\/td>";
							}
						
						//newPage += "<td>" + UntCnvVol(obs(prod_inv_tab[i][j]), getSelectedValueofDropList(volUnt[(document.glblFrm.volUnt.selectedIndex)].value)+"<\/td>";
						
						//myselectedIndex = elementSubmit.selectedIndex;
						//KEY VALUE SELECTED BY THE USER
						//myselectedvalue = elementSubmit.options[myselectedIndex].value;
					}else {
						newPage += "<td>" + obs(prod_inv_tab[i][j]) + "<\/td>";
		  	}
		  		newPage += "<\/td>\n";
//		  	}
      }

    }
	

			newPage += "<\/tr>";
			
				newPage +="  </tbody>\n";
			  newPage +=" </table>\n";
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
  newPage +="<div id=\"footer2\"><a href=\"http://www.diamondkey.com/Front/DiamondKeyInternational.html/\">Diamond Key International Omega 3000 V8.0</a></div>\n"
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

	renderPage(newName, cCol, cState, cPageState,unit);
	
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

	renderPage(newName, cCol, cState, cPageState,unit);

	
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
function displayGlblFrm()
{
  
  var mass_unit_List = new Array()
		mass_unit_List["kgram2kgram"] =  "kg";
		mass_unit_List["kgram2pound"] =  "lb";
		mass_unit_List["kgram2imp_ton"] =  "ton IMP";
		mass_unit_List["kgram2ton"] =  "ton";
		
  var vol_unit_List = new Array()
		vol_unit_List["litre2litre"] =  "LITRE";
		vol_unit_List["litre2meter3"] =  "CUBIC METRE";
		vol_unit_List["litre2imp_gal"] =  "IMP.GAL";
		vol_unit_List["litre2usgal"] =  "US.GAL";
		
		
  var glblFrm = "";
  glblFrm += " <tr>\n";
  glblFrm += "   <td align=\"left\">\n";
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
  glblFrm += displayDropList(tankTerm, terminal,"Select A Company");

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
//  glblFrm += displayunitList("0",vol_unit_List);
  glblFrm += "                                                        <option value=\"\" selected >Please Select A Unit</option>\n";
	glblFrm += "                                                          <option value=\"litre2litre\">Litre</option>\n";
  glblFrm += "                                                          <option value=\"litre2meter3\">Cubic Metres</option>\n";
  glblFrm += "                                                          <option value=\"litre2imp_gal\">IMP.GAL</option>\n";
  glblFrm += "                                                          <option value=\"litre2usgal\">U.S.GAL</option>\n";
  
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
	alert(selectedValue);
	//element=this.option[
	//print_html_page_head("DKI Omega Menu :: STOCK MANAGEMENT, Stock Inventory","Product Inventory");
	//document.write("page!");
	//document.write("<script language=\"JavaScript\" type=\"text/javascript\">\n");
	//displayGlblFrm();
	//
	//document.write("<!--\n");
	renderPage('0', 'name', 'overview', 'loaded', selectedValue);
	//document.write("//-->\n");
	//document.write("</script>");

}

function print_html_page_head(page_title, page_heading)
{
  var headerHTML = "";
  headerHTML +="<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 3.2 FINAL//EN\">\n";
  headerHTML +="<html>\n";
  headerHTML +="<head>\n";
  headerHTML +="<title>"+page_title+"</title>\n";
  headerHTML +="\n";
  headerHTML +="<link rel=\"stylesheet\" type=\"text/css\" href=\"/omega/en_omega/style/site.css\" />\n";
  headerHTML +="<SCRIPT src=\"/omega/en_omega/js/utility.js\"></SCRIPT>\n";
  headerHTML +="\n";
  headerHTML +="<SCRIPT src=\"/omega/en_omega/js/popup.js\"></SCRIPT>\n";
  headerHTML +="<SCRIPT src=\"/omega/en_omega/mtmtrack.js\"></SCRIPT>\n";
  headerHTML +="<SCRIPT src=\"/omega/en_omega/js/qstring.js\"></SCRIPT>\n";
  headerHTML +="<SCRIPT src=\"/omega/en_omega/js/validate.js\"></SCRIPT>\n";
  headerHTML +="<SCRIPT src=\"/omega/en_omega/js/redirect.js\"></SCRIPT>\n";
  headerHTML +="<SCRIPT src=\"/omega/en_omega/js/convertor.js\"></SCRIPT>\n";
  headerHTML +="<SCRIPT src=\"/omega/en_omega/js/stock_mgmt/prod_inv.js\"></SCRIPT>\n";
  headerHTML +="<SCRIPT src=\"/omega/en_omega/js/CalendarPopup.js\"></SCRIPT>\n";
  headerHTML +="<SCRIPT src=\"/omega/en_omega/js/comm_HTML.js\"></SCRIPT>\n";
  headerHTML +="<body>\n";
  headerHTML +="\n";
  headerHTML +="<div class=\"content\" id=\"content\">\n";
  headerHTML +="\n";
  headerHTML +="\n";
  headerHTML +="<table border=\"0\" width=\"100%\">\n";
  headerHTML +="<tbody>\n";
  headerHTML +="    <tr>\n";
  headerHTML +="            <td align=\"center\">\n";
  headerHTML +="                    <h5>"+page_heading+"</h5>\n";
  headerHTML +="            </td>\n";
  headerHTML +="    </tr>\n";
  document.write(headerHTML);
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

