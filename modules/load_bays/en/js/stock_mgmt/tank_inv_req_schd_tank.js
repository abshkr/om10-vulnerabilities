	var myColumns = [
			"Tank", "Inventory Required",	"Ad Hoc"
		];
	
	var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[27]= "Successfully Inserted A New Record !";
    l_opInf[18]= "Successfully Deleted!";
    l_opInf[37]= "Insert New Record Failed!";
    l_opInf[28]= "Delete Failed!";    
    l_opInf[137]= "DB Insert Failed!";
    l_opInf[128]= "DB Delete Failed!";			
var ops_req_print = [-1,0,1,27,18,37,28];
var ops_req_search = [-1,0,1,27,18,37,28];
/*
 * All the text relevant to the TANK SELECTION
 * page is in  otherText Hash table  
 * the use of this array is otherText[key]
 */				
				
  var otherText = new Array()
	otherText["dept"] = "Depot";
  otherText["tk_selctn"] =  "TANK SELECTION";
  otherText["btn_bakto_reqInvTp"] =  "Back to Inventory Schedules Request";
  otherText["msg_selTk"] = "Select tank to include/exclude from the tank inventory request";
  otherText["pgHead"] =  "tank selection";  
  otherText["pgTitle"] =  "Stock Management, Tank Selection";  
/*
 * opValues Hash table trace the 
 * available options on this page 
 * for every function there is a unique op
 */		    
 var opValues = new Array();
  opValues["init"] = 1;
  opValues["tk_selectn"] = 2;
  opValues["submitModify"] = 16;		
	

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
  //getToolBar_HTML function of comm_HTML.js file responsible for  
  // outputting the tool bar
  //controls the search and print buttons as well
  newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
//newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),true, true);
  newPage +="<tr>\n";  
  newPage +="<td width=\"100%\">             \n";
  newPage +="<div class=\"content\" id=\"content\">\n";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";  
  //start after the global form
  // if OP is <=1 OR Higher than available options should always come to this view
	
	if (curViewDetailState <= 1 || curViewDetailState > 10) // view records
  {
      newPage +=backToBtn_HTML();
      newPage +=displayStatusMsg (op); 
      
      newPage += "<tr> \n";
      newPage += "<td align=\"left\">\n";
      newPage += "<table>\n";
      newPage += "   <tr> \n";
      newPage += "                                                    <td width=\"80\" class=\"infotextheading\">\n";
      newPage += "                                                            "+otherText["dept"]+":\n";
      newPage += "                                                    </td>\n";
      newPage += "                                                    <td align=\"left\" class=\"infotext\">\n";
      newPage +=term;
      newPage += "                                                    </td>\n";
      newPage += "   </tr> \n";
      newPage += "</table>\n";
      newPage += "</td>\n";	
      newPage += "</tr> \n";
      if(priv>=6) // only show this message if user has Modify Privilages
      {
        newPage +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_selTk"]); 
      }
      
      
      
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

function backToBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   btn_HTML += btnLocation_HTML("justChaneMyLocation('tank_inv_req_schd.cgi'); ", otherText["btn_bakto_reqInvTp"]);
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}

function updatePageHeading(op,pgHead)
{
  var pageHeading = pgHead;
  if (op <= 1 || op > 10)
  {
    pageHeading +=otherText["pgHead"];
  }
  if (op ==6 )
  {
    pageHeading += otherText["pgHead_ModeqpTp"];
  }
  if (op ==7 )
  {
    pageHeading +=otherText["pgHead_AddSchReq"];
  }
  return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
  if (op <= 1 || op > 10)
  {
    pageTitle += otherText["pgTitle"];
    
  }
  if (op ==6 )
  {
    pageTitle += otherText["pgTitle_ModSchReq"];
  }
  if (op ==7 )
  {
    pageTitle += otherText["pgTitle_AddSchReq"];
  }
  
  
  return pageTitle;
}
function term_field(attr)
{
  var fieldHTML ="";
  fieldHTML +="<input name=\"term\" id=\"term\" value=\""+term+"\" "+attr+" >\n";
  return fieldHTML;
}
function h_TANK_INV_NEEDED_field(currVal)
{
  var radioHTML ="";
  var isYChecked ="";
  var isNChecked ="";
  if (currVal =="Y")    	    
  {
    isYChecked ="checked";
    isNChecked ="";
  }
  else
  {
    isYChecked ="";
    isNChecked ="checked";
  }
 
  
  radioHTML +=commText["Yes"]+" <input type=\"radio\" name=\"h_TANK_INV_NEEDED\" id=\"h_TANK_INV_NEEDED\" value=\"Y\" "+isYChecked+" onClick=\"submit()\"> \n";
  radioHTML +=commText["No"]+"  <input type=\"radio\" name=\"h_TANK_INV_NEEDED\" id=\"h_TANK_INV_NEEDED\" value=\"N\" "+isNChecked+" onClick=\"submit()\"> \n";
  return radioHTML;
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
  op_list +="<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+frmNum+"');\">          ";
  switch (priv)
  {
    case 8:
      op_list +="<option value=\""+opValues["enterDelete"]+"\">"+commText["Delete"]+"</option>";
      
    case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */
    

    case 6:    /* Modify not required for The Tank Grouping Page  */
    op_list +="<option value=\""+opValues["enterModify"]+"\">"+commText["Modify"]+"</option>";
    case 5:			/* Find Has not been implemented yet*/
    op_list +="<option value=\""+opValues["tk_selectn"]+"\">"+otherText["tk_selctn"]+"</option>";
    
    break;
  }
  
  op_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
  op_list +="</select>                                        ";
  return op_list ;
}
// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.
function submitInvReqSchFrm(myformObj)
{
  if(submitmyform(myformObj) && (checkTime(document.addNew.time.options[document.addNew.time.selectedIndex].value)) )
  {
    // when time and date has been validated just set
    // datTime variable value to a string
    // composed of date and time
    var dateSel = document.addNew.frm_start_day.value;
    var timeSel = document.addNew.time.options[document.addNew.time.selectedIndex].value;
    document.addNew.h_TKRQ_DUE.value = dateSel +" "+timeSel;
    var myselectedvalue = document.addNew.h_TKRQ_TYPE.options[document.addNew.h_TKRQ_TYPE.selectedIndex].value;
    
    if(myselectedvalue=="1") // that means All tanks should be selected and lock out message would be displayed
    {
      if(document.addNew.h_TKRQ_ALLFLAG[0].checked)
      {
         if(confirm(otherText["msg_cnfm_allbays"]+document.addNew.frm_start_day.value +otherText["at"]+  document.addNew.time.value +""))
         {
          return true;
         }
         else
         {
          return false; 
         }
      }
      else
      {
        alert(otherText["selAllTks"]);
        return false; 
      } 
    }
    else
    {
      return true;
    }
  }  
  return false; 

   
}

// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.
function checkTime(actualValue)
{
    var errorMsg = "";

    // regular expression to match required time format
    re = /^(\d{1,2}):(\d{2})([ap]m)?$/;
    
    if(actualValue != '') {
      if(regs = actualValue.match(re)) {
        if(regs[3]) {
          // 12-hour time format with am/pm
          if(regs[1] < 1 || regs[1] > 12) {
            errorMsg = otherText["msg_valid_hrs"] + actualValue;
          }
        } else {
          // 24-hour time format
          if(regs[1] > 23) {
            errorMsg = otherText["msg_valid_hrs"] + actualValue;
          }
        }
        if(!errorMsg && regs[2] > 59) {
          errorMsg = otherText["msg_valid_mints"]  + actualValue;
        }
        
      } else {
        errorMsg = otherText["msg_valid_timFmt"]+ actualValue;
      }
    }

    if(errorMsg != "") {
      alert(errorMsg);
      document.addNew.time.focus();
      return false;
    }
    
    return true;
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
              newPage +="          <input type=\"hidden\" name=\"h_TANK_CODE\" id=\"h_TANK_CODE\" value=\""+tank_inv_req_schd_tab[i][howmanyDone]+"\">\n";
              newPage +=          op_field(opValues["submitModify"]);
              newPage +=          term_field(" type=\"hidden\" ");
              newPage +="          </td>\n";
              newPage +="          <td>\n";
              newPage +=            "&nbsp;"
              newPage +="          </td>\n";
              newPage +="	       </tr>\n";
              newPage +="	      </table>\n";
              
            }
            else if(howmanyDone==1) // check if tank has been selected
            {
              if(priv>=6) // show radio btns
              {
                newPage +=h_TANK_INV_NEEDED_field(tank_inv_req_schd_tab[i][howmanyDone]);
              }
              else // display the Yes Or No
              {
                if(tank_inv_req_schd_tab[i][howmanyDone]=='Y')
  				      {
  				        newPage += commText["Yes"];
                }
                else
                {
                  newPage += commText["No"];
                }
              }
            }
            else if(howmanyDone==2) // check if tank is Adhoc or not
            {
              newPage += tank_inv_req_schd_tab[i][howmanyDone]
            }  
          
            newPage += "<\/td>\n";
          
          
		  	}
		  	howmanyDone++;	
      } // end of inner for loop
      
		  
     }
      newPage += "\n";
      newPage += "<\/tr>";
      newPage +="	      </form>\n";
    }
  return (newPage);
}
/* define local_HeadrHTML() 
 * responsible for adding the include 
 * and functions to the head section of this page 
 */
function local_HeadrHTML(newPage)
{
  newPage +="<script>\n";
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
  newPage +="\n";
  return (newPage);
}
