	var myColumns = [
			"Allowed Expiry Code"
		];
		
		var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[27]= "Successfully Inserted A New Record !";
    l_opInf[18]= "Successfully Deleted!";
    l_opInf[37]= "Insert New Record Failed!";
    l_opInf[28]= "Delete Failed!";    
    l_opInf[137]= "DB Insert Failed!";
    l_opInf[128]= "DB Delete Failed!";
    
    var otherText = new Array()
		otherText["youraction"] =  "YOUR ACTION";
    otherText["btn_addNew_excd"] =  "Add New Expiry Code";
		otherText["btn_bakto_excdPg"] =  "Back to Expiry Code Page";
	  otherText["msg_selisr"] =  "Please select an Issuer, to view its expiry codes ";
    otherText["msg_selAisr"] =  "Select Issuer";   
    otherText["msg_addNewExpCd_fSet"] =  "Add new Expiry Code details";
    otherText["msg_addNewTkToGrp_fSet"] =  "Add tank to product group details";
    otherText["msg_addNewExpCd_frmComplt"] = "Complete and submit the following form to add new expiry code, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_valid_GrpName"] = "Enter Tank Group Name";
    otherText["issr"] =  "Issuer";    
    otherText["pgHead_excd"] =  "ISSUER EXPIRY CODES";
    otherText["pgHead_AddExCd"] =  "ADD NEW EXPIRY CODE";
    otherText["pgTitle_excd"] =  "DKI Omega Menu :: Access Control, ISSSUER EXPIRY CODES";
    otherText["pgTitle_Addexcd"] =  "DKI Omega Menu :: Access Control, ISSSUER EXPIRY CODES";
	
		
		
/*
 * The structure dealing with
 * "Group Name", "Number of Tanks", "Active Tank", "Base Product" 
	["ADO","4","035","ADO"]
*/			

function renderPage(cRec, cCol, cState, cPageState,priv)
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
  newPage +="<SCRIPT src=\"/omega/en_omega/js/validate.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/redirect.js\"></SCRIPT>\n";
  newPage +="<SCRIPT src=\"/omega/en_omega/js/CalendarPopup.js\"></SCRIPT>\n";
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
  newPage +="function addExpCode(myobject)\n";
  newPage +="{\n";
  newPage +=" var newCd = \"\";\n";
  newPage +=" if (Validator.Validate(myobject,1))\n";
  newPage +=" {\n";
  newPage +="   actualCode = document.addNew.expCd.value;\n";
  newPage +="   indToUpdate = document.addNew.ind.value;\n";
  newPage +="   var newCd = updateExpCode(actualCode, indToUpdate, '1');\n";
  newPage +="   document.addNew.expCd.value = newCd;\n";
  newPage +="   //alert(newCd)\n";
  newPage +="	  return true;\n";
  
  newPage +=" }\n";
  newPage +=" else\n";
  newPage +=" {\n";
  newPage +="	  return false;\n";
  newPage +=" }\n";
  newPage +="}\n";
  
  newPage +="function updateExpCode(actualCode, ind, isActive)\n";
  newPage +="{\n";
  newPage +=" var expCd = \"\";\n";
  newPage +=" var expCdArr = new Array()\n";
  newPage +=" if(actualCode.length!=100)\n";
  newPage += "{\n";
  newPage += "  actualCode=\"0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\";\n";
  newPage += "}\n";
  newPage +=" expCdArr = actualCode.split(\"\");\n";
  newPage +=" for (var i=0; i<expCdArr.length;i++)\n";
  newPage +="  {\n";
  newPage +="   if (i==ind)\n";
  newPage +="   {\n";
  newPage +="       expCd +=isActive;\n";
      
  newPage +="   }\n";
  newPage +="   else\n";
  newPage +="   {\n";
  newPage +="      expCd +=expCdArr[i];\n";
  newPage +="   }\n";

 newPage +="  }\n";
 newPage +="  //alert(expCd)\n";
 newPage +=" return expCd;\n";
  newPage +="}\n";
  newPage +="/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
  newPage +="[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
  newPage +="'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
  newPage +="function submitAction(myobject,frmNum)\n";
  newPage +="{\n";
  newPage +="	  var myCurQstring=produceQString();\n";
  newPage +=    "var myselectedvalue = myobject.options[myobject.selectedIndex].value;";
  newPage +="   if(myselectedvalue==\"8\")\n";
  newPage += "  {\n";
  newPage +="     if(confirm('Are you sure you want to delete?'))\n";
  newPage += "    {\n";
  newPage +="       actualCode = eval(\"document.select_action_\"+frmNum+\".expCd.value;\");\n";
  newPage +="       indToUpdate = eval(\"document.select_action_\"+frmNum+\".ind.value;\");\n";
  newPage +="       var newCd = updateExpCode(actualCode, indToUpdate, '0');\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".expCd.value='\"+newCd+\"';\");\n";  
  newPage += "      eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
  newPage += "      //alert(eval(\"document.select_action_\"+frmNum+\".expCd.value;\"))\n";
  newPage += "      return true;\n";
  newPage += "    }\n";
  newPage +="     else\n";
  newPage += "    {\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
  newPage += "      return false;\n";
  newPage += "    }\n";
  newPage +="   }\n";
  newPage +="   else\n";
  newPage += "  {\n";
  newPage += "    eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
  newPage += "    return true;\n";
  newPage +="   }\n";
  
  newPage +="}\n";
  newPage +="</script>\n";
  newPage +="\n";
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
  
	if (curViewDetailState <= 1 || curViewDetailState >10 ) // view records of tank groups
  {
    var timeCode_jsarray = new Array();
      timeCode_jsarray = createTableStructForExCd(expCd);
      newPage +=displayGlblFrm();
      newPage +=addNewBtn_HTML();
      newPage += "<tr> \n";
      newPage += "<td>\n ";
  	 if( ((myColumns.length)> 0))
     {
        
        newPage += "<div id=\"printReady\">";
        newPage += table_begin("M", 0,"");
        newPage += "<tbody> \n";
        newPage += "<tr>";
         for(var i=0; i<myColumns.length; i++)
        {
          newPage += "<td>"+myColumns[i]+"<\/td>";
         
          
        }
        newPage += "<\/tr>";
     }
     
    if(timeCode_jsarray.length>0)
    {
      for (var j=0; j<timeCode_jsarray.length;j++)
      {
        newPage += "<tr class=\"row1\">\n";
        newPage += "<td>\n";
        newPage +="	      <form name=\"select_action_"+j+"\" id=\"select_action_"+j+"\" method=\"get\">\n";
        newPage +="       <table border=\"0\">\n";
        newPage +="	       <tr>\n";
        newPage +="          <td width=\"50\"> <span style=\"COLOR: #FF0000;\">"+timeCode_jsarray[j]+"</span>\n";
        newPage +="          <input type=\"hidden\" name=\"ind\" id=\"ind\" value=\""+timeCode_jsarray[j]+"\">\n";
        newPage +="          <input type=\"hidden\" name=\"expCd\" id=\"expCd\" value=\""+expCd+"\">\n";
        newPage +="          <input type=\"hidden\" name=\"cmpy\" id=\"cmpy\" value=\""+cmpy+"\">\n";
        newPage +="          </td>\n";
        newPage +="          <td>\n";
        newPage += op_list(curPrivilage, j );
        newPage +="          </td>\n";
        newPage +="	       </tr>\n";
        newPage +="	      </table>\n";
        newPage +="	      </form>\n";
        newPage +="	<\/td>\n";
        newPage += "<\/tr>\n";
      }
      
      
    }
    else
    {
      newPage += "<tr class=\"row1\">\n";
      newPage += "<td align=\"center\">NO EXPIRY CODE SET FOR THIS ISSUER<\/td>";
      newPage += "<\/tr>\n";
    }
    
	
  		

    
	
    newPage += "<\/tbody>";
    newPage += "<\/table>";
    newPage += "<\/div>";
    
		newPage += "<\/td>";	
		newPage += "<\/tr>";
    newPage +=displayStatusMsg (op);  
    
		}
		
 if (priv >= 7 && curViewDetailState ==7) // able to insert Show add new form
 {
    newPage += displayAddNewExpCdFrm();
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
  //alert(newPage); 
	return(newPage);
  document.close();

	
}

function displayGlblFrm()
{
  var glblFrm = "";
  glblFrm += " <tr>\n";
  glblFrm += "   <td align=\"left\">\n";
  glblFrm += "      <form name=\"glblFrm\" method =\"get\" id=\"glblFrm\">\n";
  glblFrm += "<input type=\"hidden\" name=\"op\" value=\"1\">\n";
  glblFrm += "<input type=\"hidden\" name=\"pg\" value=\"1\">\n";
  glblFrm += "                            <div class=\"adminform\">\n";
  glblFrm +=otherText["msg_selisr"]+"\n";
  glblFrm += "                                    <table>\n";
  glblFrm += "                                            <tr>\n";
  glblFrm +=
    "                                                    <td class=\"infotextheading\">\n";
  glblFrm +=otherText["issr"]+"                                                            :\n";
  glblFrm += "                                                    </td>\n";
  glblFrm += "                                                    <td>\n";
  glblFrm += "                                                        <select id=\"cmpy\" name=\"cmpy\" class=\"smallselect\" onchange=\"submit();\"> \n";
  
  glblFrm += displayDropList(cmpy, cmpy_jslst,otherText["msg_selAisr"]);

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
function displayAddNewExpCdFrm()
{
  var addFrmhtml ="";
  addFrmhtml +=backToBtn_HTML();
  addFrmhtml += "<tr> \n";
  addFrmhtml += "<td align=\"left\">\n";
  addFrmhtml += "<table>\n";
  addFrmhtml += "   <tr> \n";
  addFrmhtml += "                                                    <td width=\"80\" class=\"infotextheading\">\n";
  addFrmhtml += "                                                            "+otherText["issr"]+":\n";
  addFrmhtml += "                                                    </td>\n";
  addFrmhtml += "                                                    <td align=\"left\" class=\"infotext\">\n";
  addFrmhtml +=cmpy;
  addFrmhtml += "                                                    </td>\n";
  addFrmhtml += "   </tr> \n";
  addFrmhtml += "</table>\n";
  addFrmhtml += "</td>\n";	
  addFrmhtml += "</tr> \n";
  
  addFrmhtml += fieldst_HTML(otherText["msg_addNewExpCd_fSet"]);
  addFrmhtml +="<table width=\"100%\">\n";
  addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_addNewExpCd_frmComplt"]); 
  addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"expire_code.cgi\" onsubmit=\"return addExpCode(this)\">\n";
  addFrmhtml += cmpy_field("type=\"hidden\"");
  addFrmhtml +=          preqstr_field ();
  addFrmhtml +="						<tr>\n";
  addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
  addFrmhtml +="										<table width=\"100%\">\n";
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[0]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"ind\" id=\"ind\" maxLength=\"2\" dataType=\"Number\" msg=\"Enter Time code Between 0 - 99\" > \n";
  addFrmhtml +="                             <input type=\"hidden\" name=\"expCd\" id=\"expCd\" value=\""+expCd+"\"> &nbsp; [0-99]\n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
 addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="												  &nbsp;\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
 
  
 
  
  addFrmhtml +="								    </table>\n";
  addFrmhtml +=frmButtRow_HTML("Add", 1);
                  
  addFrmhtml +="							   </td>\n";
  addFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Add", 1);
  addFrmhtml +="							</table>\n";
  addFrmhtml +=op_field (17);
  addFrmhtml += "                    </form>\n";                      
  addFrmhtml += fieldstFoot_HTML();
  return addFrmhtml;
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
function op_field (attr)
{
  var fieldHTML ="";
   fieldHTML +="<input name=\"op\" id=\"op\" value=\""+attr+"\" type=\"hidden\">\n";
   return fieldHTML;
}
function preqstr_field ()
{
  var fieldHTML ="";
   fieldHTML +="<input name=\"preqstr\" id=\"preqstr\" value=\"\" type=\"hidden\">\n";
   return fieldHTML;
}
function cmpy_field(attr)
{
  var fieldHTML ="";
  fieldHTML +="<input name=\"cmpy\" id=\"cmpy\" value=\""+cmpy+"\" "+attr+" >\n";
  return fieldHTML;
}
function backToBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
      
   btn_HTML += btnLocation_HTML("justChaneMyLocation('expire_code.cgi?cmpy='+cmpy); ", otherText["btn_bakto_excdPg"]);
   
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}
function addNewBtn_HTML ()
{
  var btn_HTML = "";
  if(priv>=7 && (cmpy!="-1"))
  {
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   btn_HTML += btnLocation_HTML("justChaneMyLocation('expire_code.cgi?op=7&cmpy='+cmpy); ", otherText["btn_addNew_excd"]);
   btn_HTML += "&nbsp;"+ btnLocation_HTML("void(printSpecial()); ", "Print");
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
  }
   return btn_HTML;
}
function updatePageHeading(op,pgHead)
{
  
   
  var pageHeading = pgHead;
  if (op <= 1)
  {
    pageHeading +=otherText["pgHead_excd"];
  }
  if(op == 7)
  {
    pageHeading +=otherText["pgHead_AddExCd"];
  }
  return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
  if (op <= 1)
  {
    pageTitle +=otherText["pgTitle_excd"];
    
  }
  
  if(op ==7)
  {
    pageTitle +=otherText["pgTitle_Addexcd"];
  }
  
  return pageTitle;
}
/* define function op_list() */
function op_list(priv, frmNum)
{
/* priv = 
6 modify	op=1,2,3
7 add		op=4
8 delete	op=5
*/
  var op_list ="";
  op_list +="<select name=\"op\" id=\"op\" onchange=\"submitAction(this,'"+frmNum+"');\">          ";
  switch (priv)
  {
    case 8:
      op_list +="<option value=\"8\">DELETE</option>";
      
    case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

    case 6:    /* Modify not required for The Tank Grouping Page  */
    
    case 5:			/* Find Has not been implemented yet*/
    
    break;
  }
  
  op_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
  op_list +="</select>                                        ";
  return op_list ;
}

/* define function op_list() */
function tkSel_op_list(priv, accNum, frmNum)
{
/* priv = 
6 modify	op=1,2,3
7 add		op=4
8 delete	op=5
*/
  var op_list ="";
  op_list +="<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+accNum+"', '"+frmNum+"');\">          ";
  switch (priv)
  {
    case 8:
      op_list +="<option value=\"22\">DELETE</option>";
      
    case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

    case 6:
    
   
      
    case 5:			/* printf("<option value=1>5 1 FIND  </option>"); */
     
    break;
  }
  
  op_list +="<option value=0 selected>--\t"+otherText["tkselect"]+"\t--</option>";
  op_list +="</select>                                        ";
  return op_list ;
}
function createTableStructForExCd(expCd)
{
  var expCd_alloc = new Array();
  var expCdArr = new Array();
  var homanyActive =0;
  
  if((expCd=="-1") || (expCd==""))
  {
    return expCd_alloc;
    
  }
  else
  {
   
    expCdArr = expCd.split("");
    for (var i=0; i<expCdArr.length;i++)
    {
      if (expCdArr[i]==1)
      {
        expCd_alloc[homanyActive]= i;
        homanyActive++;
        
      }

    }
  }
  
  return expCd_alloc;
}
