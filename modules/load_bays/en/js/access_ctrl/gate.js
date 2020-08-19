	var myColumns = [
			"Gate",	"Device Code","Device Type","Area",	"Area Name"
      ,	"Gate Timecode",	"Gate User"];

  //this array was created to dispaly the area from Gates details more meaningfull now
	var myColumns_areadev = ["Gate",	"Device Code","Device Type","Device Area", "Timecode"];
            
		var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[13]= "Operation Succeeded!";
    l_opInf[18]= "Successfully Deleted!";
    l_opInf[28]= "Delete Failed!";
    l_opInf[23]= "Operation Failed!";
    l_opInf[25]= "Successfully Inserted A New Record !";
    l_opInf[24]= "Successfully Deleted!";
    l_opInf[33]= "Operation Failed!";
    l_opInf[35]= "Insert New Record Failed!";
    l_opInf[47]= "Database Failed Area Name Should be Unique!";
    l_opInf[57]= "Database Failed Gate Name Should be Unique!";
    l_opInf[34]= "Delete Failed!";
    l_opInf[133]= "DB Update Failed!";
    l_opInf[135]= "DB Insert Failed!";
    l_opInf[134]= "DB Delete Failed!";
    
  /*
   * All the text relevant to the TANK INVENTORY SCHEDULE
   * page is in  otherText Hash table  
   * the use of this array is otherText[key]
   */				
				
    var otherText = new Array()
    otherText["youraction"] =  "YOUR ACTION";
    otherText["back_to_areaPg"] =  "Back to Area Page";
    otherText["btn_txt_addNew"] =  "Add New Gate";
    otherText["dev_area"] =  "Device Area";
    otherText["sel_dev_cd"] =  "Select A Device Code";
    otherText["sel_time_cd"] =  "Select A Time Code";
    otherText['confrim_delete'] ="Are you sure you want to delete gate?";
    otherText['confrim_open_gate'] ="Are you sure you want to open gate?";
    otherText['confrim_open_all_gate'] ="Are you sure you want to open all gates?";
    otherText["pgHead"] =  "gates";
    otherText["area"] =  "Area";
    otherText["gate_code"] = "Gate Code";
    otherText["enter_gate_code"] = "Enter A Gate Code!";
    otherText["opn_all_gates"] =  "Open All Gates";
    otherText["back_to_gate_list"] =  "Back To Gate List Page";
    otherText["pgHead_add"] =  "add new gate";
    otherText["valid_msg_sel_gateArea"] =  "Select Gate Area";
    otherText['instructions'] = "All fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["add_new_gate_details"] ="Add New Gate Details";
    otherText["pgHead_gate_ctrl"] =  "gate control";
    otherText["open_gate"] = "OPEN GATE";
    otherText["pgTitle"] =  "ACCESS CONTROL, Gate Control Page";
    otherText["gate_Name_duplicate"] =  "Error: Gate Names Should be Unique";
    

/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1,1,2,13,23,18,28,26,36,27,37];
	var ops_req_search = [-1,1,2,13,23,18,28,26,36,27,37];// search never required on this page
function renderPage(cRec, cCol, cState, cPageState,priv, lang)
{ 
  
	var curRecord = cRec;
	var curColumnToSort = cCol;
	var curViewDetailState = cState;
	var curPageIn = cPageState;
	var curPrivilage = priv;
  //	alert(curPrivilage);
  //	var vol = unit;
  
	var i;
	var e;
	var f;
  //	var newPage = "";

	
	
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
  newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading), 
								check_ifReqPrint(ops_req_print, curViewDetailState), 
								check_ifReqSearch(ops_req_search, curViewDetailState) );
  newPage +="<tr>\n";  
  newPage +="<td width=\"100%\">             \n";
  newPage +="<div class=\"content\" id=\"content\">\n";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";  
  //all the page rows start here
  
   

	if (curViewDetailState <= 1 || curViewDetailState == 2 || curViewDetailState > 10) // view records
  {
    
    newPage += "	<tr>\n";
    newPage += "		<td align=\"center\">\n";
    newPage += "			<div class=\"button\">\n";
    //alert(area);
    if(curPrivilage>=6 && (area=="-1" ||(area=="")))
    {
      newPage += "&nbsp;			<a href=\"#\" onClick=\"confirmOpenAll(this)\">"+otherText["opn_all_gates"]+"</a>&nbsp;";
    }
    if(curPrivilage>=5 && (area!="-1")&&(area!=""))
    {
      
      newPage += btnLocation_HTML("justChaneMyLocation('area.cgi'); ", otherText["back_to_areaPg"]);
    }
    
    if(curPrivilage>=7 && ((area!="-1")&&(area!="")) )
    {
      newPage += "&nbsp;			<a href=\"#\" onClick=\"document.gate.area.value="+area+"; gate.submit()\">"+otherText["btn_txt_addNew"]+"</a>&nbsp;";
    }
      
    newPage += "			</div> <br>";
    
   
    newPage += "		</td>";
    newPage += "	</tr>";
    //display the status message actually confirmation message
    newPage +=displayStatusMsg (op);
    if((area!="-1")&&(area!=""))
    {
      myColumns = myColumns_areadev;
      newPage += "   <tr> \n";
      newPage += "<td align=\"left\">\n";
      newPage += "<table>\n";
      newPage += "   <tr> \n";
      newPage += "                                                    <td width=\"80\" class=\"infotextheading\">\n";
      newPage += "                                                            "+otherText["area"]+":\n";
      newPage += "                                                    </td>\n";
      newPage += "                                                    <td align=\"left\" class=\"infotext\">\n";
      newPage +=area +" / "+ getAreaName(area);
      newPage += "                                                    </td>\n";
      newPage += "   </tr> \n";
      newPage += "</table>\n";
      newPage += "</td>\n";	
      newPage += "</tr> \n";
    }
    
    newPage += "<tr> \n";
    newPage += "<td>\n ";
    newPage += "<div id=\"printReady\">";
    newPage += table_begin("M", 0,"")
;
    newPage += "<form name=\"gate\" id=\"gate\" >";
    newPage += "<input type=\"hidden\" name=\"op\" value=\"7\">\n";
   
    newPage += "<input type=\"hidden\" name=\"area\" id=\"area\" value=\"\">\n";
		newPage += "<input type=\"hidden\" name=\"pg\" value=\"0\">\n";
		newPage += "</form> \n";
		newPage += "<form name=\"gate_opnall\" id=\"gate_opnall\">\n";
    newPage += "<input type=\"hidden\" name=\"op\" value=\"3\">\n";
		newPage += "</form> \n";

    newPage += "</td>";
    newPage += "</tr>";
    
    newPage += "<tr>";
  	 if( ((myColumns.length)> 0))
     {

         for(var i=0; i<myColumns.length; i++)
        {
          newPage += "<td>"+myColumns[i]+"<\/td>";
        }
        newPage += "</tr>";
     }

		for(i in gate_jsArr)
    {
      newPage += "<tr class=\"row1\">\n";
      if(i>0) 
      {
         for(var j=0; j<myColumns.length; j++)
        {

					if(j==0)
						{
							newPage +="<td>\n";							
					    newPage +="       <table border=\"0\">\n";
              newPage +="	       <tr>\n";
              newPage +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+gate_jsArr[i][j]+"</span>\n";
              newPage += "         </td>\n";
              newPage +="          <td width=\"50%\">\n";
              newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" method=\"get\">\n";
              newPage +=        op_list(curPrivilage, i );
					    newPage +="<input name=\"pg\" id=\"pg\" value=\"0\" type=\"hidden\">\n";
					    newPage +="<input type='hidden' name='gate' id='gate' value='"+obs(gate_jsArr[i][j])+"'>\n";		    
					    newPage += "<input type=\"hidden\" name=\"area\" value=\""+area+"\">\n";
					    newPage +="</form>\n";
              newPage += "         </td>\n";
					    newPage +="        <tr>\n";
					    newPage +="       <\/table>\n";
					    
					    newPage +="</td>\n";
					   						
						}//following else if is to deal with displaying gates from that area
						else if((j==3)&& ((area!="-1")&&(area!=""))) // means user coming from area page
            {
              newPage += "<td>" +getDeviceAreaName(gate_jsArr[i][1])+ "<\/td>";
            }
            //following else if is to deal with displaying gates from that area
						else if((j==4)&& ((area!="-1")&&(area!=""))) // means user coming from area page
            {
              newPage += "<td>" +gate_jsArr[i][5]+ "<\/td>";
            }
            else
            {					
						  newPage += "<td>" + obs(gate_jsArr[i][j]) + "<\/td>";
						
					  }

        }
        newPage += "\n";
        newPage += "</tr>";
      }
      
      
    }
    newPage += "<\/tbody>";
    newPage += "<\/table>";
    newPage += "<\/div>";
    newPage += "<\/td>";	
    newPage += "<\/tr>";
    
    
    

		}
    else if(curViewDetailState == 7 && curPrivilage >=7)
		{
		  newPage +=displayAddNewGateFrm();
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
	if (op== 2)
	{
		pageHeading +=otherText["pgHead"] ;
	}
	else if (op== 47 ||(op== 57) ||(op== 28) ||(op== 38))
	{
		pageHeading +=otherText["pgHead"] ;
	}
	else if ((op <= 1 || op > 10)&& (area==""||area=="-1"))
	{
		pageHeading +=otherText["pgHead_gate_ctrl"];
	}
	else if(op==7)
	{
		pageHeading +=otherText["pgHead_add"];
	}
	else
	{
		pageHeading +=otherText["pgHead"] ;
	}


	return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
  pageTitle +=otherText["pgTitle"];
  return pageTitle;
}

function displayDropList_tk(selectedvalue, list,defMsg)
{
  var massList = "";
  var matchFound=0;
  for (i=0; i<list.length; i++){
    massList += "<option value=\""+list[i]+"\"";
     if(list[i]==selectedvalue)
     {
        matchFound=1;
        massList += "selected";
     }
    massList +=">"+list[i]+"</option>\n";
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

function displayDropList_devc(selectedvalue, list,defMsg)
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
    massList +=">"+list[i][0]+"</option>\n";
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

function displayAddNewGateFrm()
{
  var addFrmhtml ="";
  addFrmhtml +="	<tr>\n";
  addFrmhtml +="		<td align=\"center\">\n";
  addFrmhtml +="			<div class=\"button\">\n";
  addFrmhtml +=  			 btnLocation_HTML("justChaneMyLocation('gate.cgi?op=-1&pg=-1&area="+area+"'); ", otherText["back_to_gate_list"]);
  addFrmhtml +="			  <br>\n";	    
  addFrmhtml +="			<\/div>\n";
  addFrmhtml +="<br>";
  addFrmhtml +="		</td>\n";
  addFrmhtml +="	</tr>\n";
  
  
  if((area!="-1")&&(area!=""))
  {
    addFrmhtml += "<tr> \n";
    addFrmhtml += "<td align=\"left\">\n";
    addFrmhtml += "<table>\n";
    addFrmhtml += "   <tr> \n";
    addFrmhtml += "                                                    <td width=\"80\" class=\"infotextheading\">\n";
    addFrmhtml += "                                                            "+otherText["area"]+":\n";
    addFrmhtml += "                                                    </td>\n";
    addFrmhtml += "                                                    <td align=\"left\" class=\"infotext\">\n";
    addFrmhtml +=area +" / "+getAreaName(area);
    addFrmhtml += "                                                    </td>\n";
    addFrmhtml += "   </tr> \n";
    addFrmhtml += "</table>\n";
    addFrmhtml += "</td>\n";	
    addFrmhtml += "</tr> \n";
  }
  
  addFrmhtml += fieldst_HTML(otherText["add_new_gate_details"]);
  addFrmhtml +="<div class=\"adminform\">\n";
  addFrmhtml +="<table width=\"100%\">\n";
  addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText['instructions']); 
  addFrmhtml +="				<form name=\"add_gate\" id=\"add_gate\" onsubmit='return checkDuplicateGate(this)'>\n";
  addFrmhtml +="						<tr>\n";
  addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
  addFrmhtml +="										<table width=\"100%\">\n";
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",otherText["gate_code"]+" :");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                                <input type=\"text\" name=\"gate\" id=\"gate\" size=\"20\" maxLength=\"20\" dataType=\"Require\" msg=\""+otherText["enter_gate_code"]+"\" />\n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="                                                                                                        <table>\n";
  addFrmhtml +="                                                                                                                <tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",otherText["area"]+" :");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
                   "&nbsp;\n");





 addFrmhtml += "                                                    <td align=\"left\" class=\"infotext\">\n";
 addFrmhtml +=area +" / "+getAreaName(area);
 addFrmhtml += "                                                    </td>\n";




 addFrmhtml +="                             <input type=\"hidden\" NAME=\"area\" id=\"area\" value=\""+area+"\">\n";

 addFrmhtml +="                                                                                                                        </td>\n";

	addFrmhtml +="                                                                                                                </tr>\n";
  addFrmhtml +="                                                                                                        </table>\n";
			       
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  // 2nd Row
  addFrmhtml +="								    <tr>\n";
  addFrmhtml +="										<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";      
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[1]+" :");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select NAME=\"dvc\" id=\"dvc\" class=\"smallselect\" onchange=\"display_device()\" dataType=\"Require\" msg=\""+otherText["sel_dev_cd"]+"\">\n";
  addFrmhtml +=displayDropList_devc(null, device_code,otherText["sel_dev_cd"]);
  addFrmhtml +="															</td>\n";  	    
  
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  addFrmhtml +="									   </td>\n";
  addFrmhtml +="										 <td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";      
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[2]+" :");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input class=\"infotext1\" type=\"text\" maxlength=\"15\" size=\"15\" name=\"dvctyp1\" disabled=\"true\" id=\"dvctyp1\" >\n";
  addFrmhtml +="                                <input type=\"hidden\" name=\"dvctyp\" >\n";
 // addFrmhtml +="                                <input type=\"hidden\" name='areaNm' >\n";
  addFrmhtml +="                                <input type=\"hidden\" name='area' >\n";  
  addFrmhtml +="															</td>\n";  	    
  
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  // End of 2nd Row
  
  // 3rd Row
  addFrmhtml +="								    <tr>\n";
  addFrmhtml +="										<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";      
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[5]+" :");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select NAME=\"timeCd\" id=\"timeCd\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["sel_time_cd"]+"\">\n";
  addFrmhtml +=                               displayDropList_devc(null, time_code_jslst,otherText["sel_time_cd"]);
  addFrmhtml += "<input type=\"hidden\" name=\"op\" value=\"17\">\n";
  addFrmhtml += "<input type=\"hidden\" name=\"pg\" value=\"7\">\n";
  
  addFrmhtml +="															</td>\n";  	    
  
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  addFrmhtml +="									   </td>\n";
  addFrmhtml +="										 <td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";      
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",otherText["dev_area"]+" :");
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input class=\"infotext1\" type=\"text\" maxlength=\"15\" size=\"15\" name=\"areaNm1\" disabled=\"true\" id=\"areaNm1\" >\n";
  
  addFrmhtml +="															</td>\n";  	    
  
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  // End of 3rd Row
  
  
  addFrmhtml +="								    </table>\n";
  addFrmhtml +=frmButtRow_HTML(commBtnText["Add"], 1);
                  
  addFrmhtml +="							   </td>\n";
  addFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Add", 1);
  addFrmhtml +="							</table>\n";
  addFrmhtml +="							</div>\n";
  addFrmhtml += "                    </form>\n";                      
  addFrmhtml += fieldstFoot_HTML();
  return addFrmhtml;

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
  
  op_list +="<select name=op onchange=\"submitAction(this,'"+frmNum+"');\">          ";
  switch (priv)
  {
    case 8:
    if( (area!="-1" &&(area!="")))
    {
      op_list +="<option value=8> "+commText["Delete"]+"</option>";
    }
    case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

    case 6:
    
     if( (area=="-1" ||(area=="")))
    {    
      op_list +="<option value=\"16\">"+otherText["open_gate"]+"</option>";
    }    
    case 5:			/* printf("<option value=1>5 1 FIND  </option>"); */
    
    break;
  }
  op_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
  op_list +="</select>                                        ";
 
  return op_list ;
}
function getAreaName(areaId)
{
  var areaName ="";
 for(var i=1; i<area_name.length; i++)
 {
    //alert("comparing"+area+" AND "+area_name[i][0]);
    if(area==area_name[i][0] && ((area!="-1")&&(area!="")))
    {
      areaName +=area_name[i][1];
      return areaName;
    }
    
 }
 return areaName;
  
}
function getDeviceAreaName(devCd)
{
  var areaName ="";
 for(var i=1; i<device_code.length; i++)
 {
    //alert("comparing"+devCd+" AND "+device_code[i][0]);
    if(devCd==device_code[i][0] && ((area!="-1")&&(area!="")))
    {
      areaName +=device_code[i][2];
      return areaName;
    }
    
 }
 return areaName;
  
}
/* define checkDuplicateGate() 
 * responsible for checking the duplicates 
 * gate for the same area 
 *  
 */
function checkDuplicateGate(myObject)
{
	var isForomOk = false;
	isForomOk = Validator.Validate(myObject,1);
	if (isForomOk==true)
	{
		var myGateCode = document.add_gate.gate.value;
		if (myGateCode!="")
		{
			for(i in gate_jsArr)
			{
				if(gate_jsArr[i][0]==myGateCode)
				{
					alert(otherText["gate_Name_duplicate"]);
					isForomOk = false;
					return isForomOk;
				}
			}
		}
	}
	return isForomOk;



}
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage)
{
	newPage +="<script>\n";
	newPage +="/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
	newPage +="FUNCTION [ submitmyform] \n";
	newPage +="[PURPOSE]  		-> 	Always use this method to submit a form,\n";
	newPage +="					gives me the flexbility of doing validation\n";
	newPage +="					and addition if required before i submit the form\n";
	newPage +="          \n";
	newPage +="[Parameter]  	-> myobject FORM OBJECT Parameter is the form need to be submit\n";
	newPage +="[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
	newPage +="'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
	newPage +="function submitmyform()\n";
	newPage +="{\n";
	newPage +="	//var myHiddenOb;\n";
	newPage +="document.forms[1].op.value = '2';";
	//  newPage +="alert(document.forms[1].op.value);";
	newPage +="	\n";
	newPage +="	//myHiddenOb = getElemRefs(\"prev_qstring\";\n";
	newPage +="	//myHiddenOb.value=produceQString(;\n";
	newPage +="	//return formcheck(myobject;\n";
	newPage +="	//return Validator.Validate(myobject,1);\n";
	newPage+="	if(Validator.Validate(document.forms[1],1)==true){\n";
	//  newPage+="alert(Validator.Validate(document.forms[1],1));\n"
	newPage+="		document.forms[1].submit();\n";
	newPage+="	}\n";
	newPage +="}\n";
	newPage +="function submitAction(myobject,frmNum)\n";
	newPage +="{\n";
	newPage +="	  var myCurQstring=produceQString();\n";
	newPage +=    "var myselectedvalue = myobject.options[myobject.selectedIndex].value;";
	newPage +="   if(myselectedvalue==\"8\")\n";
	newPage += "  {\n";
	newPage +="     if(confirm('"+otherText['confrim_delete']+"'))\n";
	newPage += "    {\n";
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
	newPage +="   else if(myselectedvalue==\"16\")\n";
	newPage += "  {\n";
	newPage +="     if(confirm('"+otherText['confrim_open_gate']+"'))\n";
	newPage += "    {\n";
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

	newPage += "var device_code = ["; 
	newPage +="[";  
	newPage +="\"\"";
	newPage +=", "; 
	newPage +="\"\"";
	newPage +=", ";
	newPage +="\"\"";
	newPage +=" ]"; 

	for(i in device_code)
	{

		if (i>0)
		{
			newPage += ",[\n";
			for(var j=0; j<4; j++)
			{
				if(j==0)

				{newPage += "\'"+device_code[i][j]+"'";}
				else{          
					newPage += "\,'"+device_code[i][j]+"'";
				}
			}
			newPage += "]\n";
		}

	}
	newPage += "];\n"; 


	newPage +="function confirmOpenAll(myobject)\n";
	newPage +="{\n";  
	newPage +="     if(confirm('"+otherText['confrim_open_all_gate']+"'))\n";
	newPage += "    {\n";
	newPage += "      eval(\"document.gate_opnall.submit();\");\n";
	newPage += "      return true;\n";
	newPage += "    }\n";
	newPage +="     else\n";
	newPage += "    {\n";
	newPage += "      eval(\"document.gate_opnall.reset();\");\n";
	newPage += "      return false;\n";
	newPage += "    }\n";

	newPage +="}\n";
	newPage +="function display_device()\n";
	newPage +="{\n";

	newPage +="for(var i=1; i<device_code.length; i++)";
	newPage += "{\n";

	newPage += "if(document.forms[0].dvc.value==device_code[i][0])";
	newPage += "{";
	newPage +="document.forms[0].dvctyp.value = device_code[i][1];";
	newPage +="document.forms[0].dvctyp1.value = device_code[i][1];";
	newPage +="document.forms[0].areaNm1.value = device_code[i][2];";
	newPage +="document.forms[0].area.value = device_code[i][3];";
	newPage +="	}";
	newPage +="else if(document.forms[0].dvc.value==''){";
	newPage +="document.forms[0].dvctyp.value = '';";

	newPage +="document.forms[0].area.value = '';";
	newPage +="document.forms[0].dvctyp1.value = '';";
	newPage +="document.forms[0].areaNm1.value = '';";
	newPage +="	}";

	newPage +="}\n";
	newPage +="}\n";
	newPage += "var area = \""+area+"\"\n";


	newPage +="</script>\n";
	newPage += "</head>\n";
	newPage += "<body>\n";
	return (newPage);
}
