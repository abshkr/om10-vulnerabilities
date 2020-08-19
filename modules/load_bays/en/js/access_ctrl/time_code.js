var debug = '';
function jdb(line){debug+=line+'\n';}

	var myColumns = [
			"Action", "Time Code"
		];
		var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[28]= "Successfully Deleted!";
    l_opInf[26]= "Successfully Updated!";
    l_opInf[27]= "Successfully Inserted A New Record !";
    l_opInf[36]= "DB Update Failed!";
    l_opInf[37]= "DB Insert Failed!";
    l_opInf[38]= "DB Delete Failed Check Integrity Constraint!";

/*
 * The structure dealing with
	[ "1", "2003-03-02 08:18:30", "0000", "988512", "6904", "", "3835231", "0000" ]
			

*/
  var days_List = new Array()
	days_List["1"] =  "MONDAY";
  days_List["2"] =  "TUESDAY";
  days_List["3"] =  "WEDNESDAY";
  days_List["4"] =  "THURSDAY";
  days_List["5"] =  "FRIDAY";
  days_List["6"] =  "SATURDAY";
  days_List["7"] =  "SUNDAY";
  
  var hours_List = new Array()
	hours_List["0"]  =1;
	hours_List["1"]  =2;
	hours_List["2"]  =4;
	hours_List["3"]  =8;
	hours_List["4"]  =16;
	hours_List["5"]  =32;
	hours_List["6"]  =64;
	hours_List["7"]  =128;
	hours_List["8"]  =256;
	hours_List["9"]  =512;
	hours_List["10"]  =1024;
	hours_List["11"]  =2048;
	hours_List["12"]  =4096;
	hours_List["13"]  =8192;
	hours_List["14"]  =16384;
	hours_List["15"]  =32768;
	hours_List["16"]  =65536;
	hours_List["17"]  =131072;
	hours_List["18"]  =262144;
	hours_List["19"]  =524288;
	hours_List["20"]  =1048576;
	hours_List["21"]  =2097152;
	hours_List["22"]  =4194304;
	hours_List["23"]  =8388608;
    
  /*
   * All the text relevant to the TANK INVENTORY SCHEDULE
   * page is in  otherText Hash table  
   * the use of this array is otherText[key]
   */				
				
  var otherText = new Array()
	otherText["youraction"] =  "YOUR ACTION";
	otherText["view_time_alloc"] = "VIEW TIME ALLOCATION";
  otherText["time_alloc_det"] =  "time allocation details";
  otherText["hrs"] =  "Hours";
  otherText["btn_addNew_timCd"] =  "Add New Time Code";
	otherText["btn_bakto_timCd"] =  "Back to Time Codes Page";  
	otherText["msg_ent_timCd"] =  "Enter Time Code";  
  otherText['confrim_delete'] ="Are you sure you want to delete?";
  otherText["msg_selAInvPd"] =  "Select Inventory Period";
  otherText["selectDate"] = "Select Date";
  otherText["msg_enterInvDt"] = "Enter Inventory Date";
  otherText["InvDt"] = "Inventory Date";
  otherText["invTime"]= "Inventory Time";
  otherText["msg_invTime"] = "Enter Inventory Time";
  otherText["typ"] = "Type";  
  otherText["period"] = "Period";
  otherText["selAll"] = "Select All";
  otherText["invDt"] = "Inventory Date";
  otherText["msg_selAEqpCd"] =  "Select Equipment Type";
  otherText["msg_complt_frm"] =  "All fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
  otherText["msg_valid_invDt"] =  "Enter Valid Date";
  otherText["msg_valid_hrs"] =  "Invalid value for hours:";  
  otherText["msg_valid_mints"] =  "Invalid value for minutes:";  
  otherText["msg_valid_timFmt"] =  "Invalid time format:";  
  otherText["msg_cnfm_allbays"] = "Lock out all the bays on ";
  otherText["pgHead"] =  "time codes";
  otherText["pgHead_add"] =  "add new time code";
  otherText["pgHead_mod"] =  "modify time allocation for time code";
  otherText["pgHead_time_alloc"] = "time allocation for time code";
  otherText["pgTitle"] =  "ACCESS CONTROL, Time Code Page";
  
  /********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1,1,18,28, 26,36,27,37];
	var ops_req_search = [-1,1,18,28, 26,36,27,37];// search never required on this page
function renderPage(cRec, cCol, cState, cPageState,priv,lang)
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
  newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading), 
								check_ifReqPrint(ops_req_print, curViewDetailState), 
								check_ifReqSearch(ops_req_search, curViewDetailState) );
  newPage +="<tr>\n";  
  newPage +="<td width=\"100%\">             \n";
  newPage +="<div class=\"content\" id=\"content\">\n";
  newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
  newPage +="<tbody>\n";  
  //all the page rows start here	
	if (curViewDetailState <= 1 || curViewDetailState > 10) // view records
  {
      //newPage +=displayGlblFrm();
if (curViewDetailState==27 ||(timeCode!="-1"&& (timeCode!=""))){
     newPage +=backToBtn_HTML();
}
else {
      newPage +=addNewBtn_HTML();
}
      newPage +=displayStatusMsg (op); 
      newPage += "<tr> \n";
      newPage += "<td>\n ";
  	 if( ((myColumns.length)> 0))
     {
        
        newPage += table_begin("M", 0,"");
        newPage += "<tbody> \n";
        newPage += "<tr>";
         for(var i=0; i<myColumns.length; i++)
        {
          newPage += "<td>"+myColumns[i]+"<\/td>";
         
          
        }
        newPage += "<\/tr>";
     }

	
  		

    
		for(i in time_code_tab)
    {
      if(i>0)
      {
        newPage += "<tr class=\"row1\">\n";
        var howmanyDone =0;
        for(var j=0; j<myColumns.length; j++)
        {
          if (curColumnToSort == howmanyDone)
          {
            newPage += "<td style=\"background-color:#EEEEEE\">" + obs(time_code_tab[i][howmanyDone]) + "<\/td>";
			    } 
          else 
          {
          
				    newPage += "<td>\n";				  
				    if(j==0) // means time to display the drop list and table
				    {
  				    newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" method=\"get\">\n";
              newPage +="       <table border=\"0\">\n";
              newPage +="	       <tr>\n";
              newPage +="          <td width=\"50\"> <span style=\"COLOR: #FF0000;\">"+obs(time_code_tab[i][howmanyDone])+"</span>\n";
              newPage +="          <input type=\"hidden\" name=\"ind\" id=\"ind\" value=\""+i+"\">\n";
              newPage +="          <input type=\"hidden\" name=\"timeCode\" id=\"timeCode\" value=\""+time_code_tab[i][howmanyDone]+"\">\n";
              newPage +="          </td>\n";
              newPage +="          <td>\n";
              newPage += op_list(curPrivilage, i );
              newPage +="          </td>\n";
              newPage +="	       </tr>\n";
              newPage +="	      </table>\n";
              newPage +="	      </form>\n";
              howmanyDone -=1;
            }
            else
            {
              newPage += obs(time_code_tab[i][howmanyDone]);
            }  
          
            newPage += "<\/td>\n";
          
          
		  	}
		  	howmanyDone++;	
      } // end of inner for loop
      
		  
     }
      newPage += "\n";
      newPage += "<\/tr>";
    }
    newPage += "<\/tbody>";
    newPage += "<\/table>";
		newPage += "<\/td>";	
		newPage += "<\/tr>";
    
     
		}
		
 // time to show the time table
 if (priv >= 5 && curViewDetailState == 2)
 {
    /*
    newPage +="<SCRIPT LANGUAGE=\"JavaScript\">\n";
    newPage +="alert(dec2bin(16777215))";
    newPage +="</SCRIPT>\n";
    */
     newPage +=backToBtn_HTML();
     newPage += "<tr> \n";
     newPage += "<td>\n ";
     newPage += "<table>\n ";
     newPage += "                                            <tr>\n";
     newPage += "                                                    <td width=\"80\" class=\"infotextheading\">\n";
     newPage += myColumns[1]+" :\n";
     newPage += "                                                    </td>\n";
     newPage += "                                                    <td align=\"left\" class=\"infotext\">\n";
     newPage +=timeCode;
     newPage += "                                                    </td>\n";

     newPage += "                                            </tr>\n"; 
     newPage += "</table> \n";
     newPage += "</td> \n";
     newPage += "</tr>\n ";
     
     
     newPage += "<tr> \n";
     newPage += "<td>\n ";
  	 newPage += displayViewTimeAllocArea(1, days_List);
  	 newPage += "</td> \n";
     newPage += "</tr>\n ";
 }
 if (priv >= 5 && curViewDetailState == 6)
 {
    /*
    newPage +="<SCRIPT LANGUAGE=\"JavaScript\">\n";
    newPage +="alert(dec2bin(16777215))";
    newPage +="</SCRIPT>\n";
    */
     newPage +=backToBtn_HTML();
     newPage += "<tr> \n";
     newPage += "<td>\n ";
     newPage += "<table>\n ";
     newPage += "                                            <tr>\n";
     newPage += "                                                    <td width=\"80\" class=\"infotextheading\">\n";
     newPage += "                                                            Time Code:\n";
     newPage += "                                                    </td>\n";
     newPage += "                                                    <td align=\"left\" class=\"infotext\">\n";
     newPage +=timeCode;
     newPage += "                                                    </td>\n";

     newPage += "                                            </tr>\n"; 
     newPage += "</table> \n";
     newPage += "</td> \n";
     newPage += "</tr>\n ";
     
     
     newPage += "<tr> \n";
     newPage += "<td>\n ";
  	 newPage += displayModTimeAllocArea(1, days_List);
  	 newPage += "</td> \n";
     newPage += "</tr>\n ";
 }   		   		
 if (priv > 6 && curViewDetailState == 7)
 {
    newPage += displayAddNewFrm();
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

function displayAddNewFrm()
{
  var addFrmhtml ="";
  addFrmhtml +=backToBtn_HTML();
  addFrmhtml +=displayAddTimeAllocArea(0, days_List);
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
function day_field (attr)
{
  var fieldHTML ="";
  
   fieldHTML +="<input name=\""+attr+"\" id=\""+attr+"\" value=\"\" type=\"hidden\">\n";
   return fieldHTML;
}
function timeCode_field(attr)
{
  var fieldHTML ="";
  if(timeCode=="-1")timeCode="";
  fieldHTML +="<input name=\"timeCode\" id=\"timeCode\" value=\""+timeCode+"\" "+attr+" >\n";
  return fieldHTML;
}
function backToBtn_HTML ()
{
  var btn_HTML = "";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   btn_HTML += btnLocation_HTML("justChaneMyLocation('?'); ", otherText["btn_bakto_timCd"]);
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
   return btn_HTML;
}
function addNewBtn_HTML ()
{
  var btn_HTML = "";
  if(priv>=7)
  {
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   btn_HTML += btnLocation_HTML("justChaneMyLocation('?op=7'); ", otherText["btn_addNew_timCd"]);
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
  }
   return btn_HTML;
}
function updatePageHeading(op,pgHead)
{
  var pageHeading = pgHead;
  if (op <= 1 || op > 10)
  {
    pageHeading +=otherText["pgHead"];
  }
  if (op == 6)
  {   
    pageHeading +=otherText["pgHead_mod"];
   
  }
  if (op == 2)
  {   
    pageHeading +=otherText["pgHead_time_alloc"];
   
  }
  if (priv > 6 && op == 7)
  {   
    pageHeading +=otherText["pgHead_add"];
   
  }
  return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
  pageTitle +=otherText["pgTitle"];
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
  op_list +="<select name=op onchange=\"submitAction(this,'"+frmNum+"');\">          ";
  switch (priv)
  {
    case 8:
      op_list +="<option value=8> "+commText["Delete"]+"</option>";
    case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

    case 6:
    op_list +="<option value=\"6\"> "+commText["Modify"]+"</option>";  
    case 5:			/* printf("<option value=1>5 1 FIND  </option>"); */
    op_list +="<option value=\"2\"> "+otherText["view_time_alloc"]+"</option>";
      break;
  }
  op_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
  op_list +="</select>                                        ";
  return op_list ;
}
function displayViewTimeAllocArea(index, daysList)
{
 
  var timeList = "";
  var matchFound=0;
  var list_keys = new Array();
  list_keys = assArray_keys(days_List);
  if( ((list_keys.length)> 0))
   {
      
      timeList += fieldst_HTML(otherText["time_alloc_det"]);
      timeList += " <div id=\"helparea\">\n";
      timeList +="<table width=\"100%\">\n";
      
      timeList +="						<tr>\n";
      timeList +="						<td width=\"100%\">\n";                    
      timeList += table_begin("M", 1,"");
      timeList += "<tbody> \n";
      timeList += "<tr>";
      timeList += "<td>"+otherText["hrs"]+"<\/td>";
       var week_daytimes = new Array();
      for(var i=0; i<list_keys.length; i++)
      {
        timeList += "<td>"+daysList[list_keys[i]]+"<\/td>";
        week_daytimes[i] = parseInt(time_code_tab[index][i+1]);
        
      }
      timeList += "<\/tr>";
      var time_alloc = new Array();
      time_alloc = createTableStructForDays(week_daytimes);
      // dont want to see the Editting Check Boxes
      timeList +=displayTableStruc(time_alloc,list_keys, false);
     
      timeList += "<\/tbody>";
      timeList += "<\/table>";
      timeList +="</div>\n";
      timeList +="							   </td>\n";
      timeList +="							 </tr>\n";
     
     
      
      
      //frmButtRow_HTML("Add", 1);
      timeList +="							</table>\n";
      
                           
      timeList += fieldstFoot_HTML();
      timeList += "</form>\n";
   }
  return timeList;


}
function displayModTimeAllocArea(index, daysList)
{
 
  var timeList = "";
  var matchFound=0;
  var list_keys = new Array();
  list_keys = assArray_keys(days_List);
  if( ((list_keys.length)> 0))
   {
      timeList += "<form name=\"myForm\" id=\"myForm\" method=\"post\" onSubmit=\" return checkDays(this);\">\n";
      timeList += fieldst_HTML(otherText["time_alloc_det"]);
      timeList += "<div id=\"helparea\">\n";
      timeList +="<table width=\"100%\">\n";
      timeList +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_complt_frm"] ); 
      timeList +="						<tr>\n";
      timeList +="						<td width=\"100%\">\n";                    
      timeList += table_begin("M", 2,"");
      timeList += "<tbody> \n";
      timeList += "<tr>";
      timeList += "<td>&nbsp;<\/td>";
      var week_daytimes = new Array();
      for(var i=0; i<list_keys.length; i++)
      {
        timeList += "<td>"+daysList[list_keys[i]]+"<\/td>";  
        week_daytimes[i] = parseInt(time_code_tab[index][i+1]); 
        
      }
      timeList += "<\/tr>";
       // time to display all the check boxes
      timeList += "<tr class=\"row1\">";
      timeList += "<td>"+otherText["hrs"]+"<\/td>";
      
      timeList += timeCode_field("type=\"hidden\"");
      //alert("this is a test"+time_code_tab[1][1]);
      for(var i=0; i<list_keys.length; i++)
      {
       
       timeList += "<td>\n";
       //alert("VALUE OF i IS"+i+" AND VALUE OF INDEX IS "+index+" AND I GOT"+time_code_tab[index][i])
       if (time_code_tab[index][(i+1)]=="16777215") // that means select all check box should be selected
       {
        
        timeList +=otherText["selAll"]+"<input type=\"checkbox\" name=\"obj_"+list_keys[i]+"[]\" id=\"obj_"+list_keys[i]+"\" value=\"select_all\" onclick=\"selectall(24,'obj_"+list_keys[i]+"');\" checked>\n";
       }
       else
       {
        timeList +=otherText["selAll"]+"<input type=\"checkbox\" name=\"obj_"+list_keys[i]+"[]\" id=\"obj_"+list_keys[i]+"\" value=\"select_all\" onclick=\"selectall(24,'obj_"+list_keys[i]+"');\">\n";
       }
       timeList += "<\/td>\n";
       
        
      }
      timeList += "<\/tr>";
      
      var time_alloc = new Array();
      time_alloc = createTableStructForDays(week_daytimes);
      // dont want to see the Editting Check Boxes
      timeList +=displayTableStruc(time_alloc,list_keys, true);
      timeList += "<\/tbody>";
      timeList += "<\/table>";
      timeList +="							   </td>\n";
      timeList +="							 </tr>\n";
      timeList +=op_field (16);
      timeList +=day_field ('day_1');
      timeList +=day_field ('day_2');
      timeList +=day_field ('day_3');
      timeList +=day_field ('day_4');
      timeList +=day_field ('day_5');
      timeList +=day_field ('day_6');
      timeList +=day_field ('day_7');
      timeList +=frmButtRow_HTML(commBtnText["Update"], 1);
      
      //frmButtRow_HTML("Add", 1);
      timeList +="							</table>\n";
      timeList += "<\/div>\n";
      
                           
      timeList += fieldstFoot_HTML();
      timeList += "</form>\n";
   }
  return timeList;


}
function checkDays(myObj)
{
   
   for (i=1; i<8; i++)
   {
    var decString = 0;
    decString = makeDecDayString(i);
   
    //decString = bin2dec(binString);
    
    //alert(decString);
    var myHiddenOb;
    var dayField = "day_"+i;
    myHiddenOb = getElemRefs(dayField);
    myHiddenOb.value=decString;
    
    
  }
  //return false;
  return submitmyform(myObj);
  
}
function makeDecDayString(whichDay)
{
  var curr_dayVal=0;
  for (j=1; j<25; j++){
  curr_dayVal +=checkDayHourSelected("obj_"+whichDay, j);
  }  
  return curr_dayVal;
  
}
function checkDayHourSelected(objId, hour)
{
  var currentVal =0;
   //alert(objId);
   //alert("and hour is"+hour);
   if(eval("document.myForm."+objId+"["+hour+"].checked")) 
  {
    currentVal = parseInt(eval("document.myForm."+objId+"["+hour+"].value"));
  }
  return currentVal;
   
}
function displayAddTimeAllocArea(index, daysList)
{
 
  var timeList = "";
  var matchFound=0;
  var list_keys = new Array();
  list_keys = assArray_keys(daysList);
  if( ((list_keys.length)> 0))
   {
      timeList += fieldst_HTML(otherText["time_alloc_det"]);
      timeList += "                            <div id=\"helparea\">\n";
      timeList +="<table width=\"100%\">\n";
      timeList +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_complt_frm"] ); 
      timeList +="						<tr>\n";
      timeList += "<form name=\"myForm\" method=\"post\" onSubmit=\"return checkDays(this);\">\n";
      timeList +="						<td width=\"100%\">\n";
      timeList +="													<table>\n";
      timeList +="														<tr>\n";
      timeList +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", myColumns[1]+" :");
      timeList +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
      timeList +="															<td>\n";
      timeList += timeCode_field(" type=\"text\" maxLength=\"2\" dataType=\"Require\" msg=\""+otherText["msg_ent_timCd"]+"\" ");
  
      timeList +="															</td>\n"; 
      timeList +="						</tr>\n";
      timeList +="						</table>\n";
      
      timeList +="						</td>\n";
      timeList +="						</tr>\n";
      timeList +="						<tr>\n";
      timeList +="						<td width=\"100%\">\n";                    
      timeList += table_begin("M", 3,"");
      timeList += "<tbody> \n";
      timeList += "<tr>";
      timeList += "<td>&nbsp;<\/td>";
       for(var i=0; i<list_keys.length; i++)
      {
        timeList += "<td>"+daysList[list_keys[i]]+"<\/td>";
       
        
      }
      timeList += "<\/tr>";
       // time to display all the check boxes
      timeList += "<tr class=\"row1\">";
      timeList += "<td>"+otherText["hrs"]+"<\/td>";
      
      
      for(var i=0; i<list_keys.length; i++)
      {
       
       timeList += "<td>\n";
       
      
        timeList +=otherText["selAll"]+"<input type=\"checkbox\" name=\"obj_"+list_keys[i]+"[]\" id=\"obj_"+list_keys[i]+"\" value=\"select_all\" onclick=\"selectall(24,'obj_"+list_keys[i]+"');\">\n";
      
       timeList += "<\/td>\n";
       
        
      }
      timeList += "<\/tr>";
      
      //now make an attempt to show the selected stuff
      
      
       
        
        for (j = 0; j < 24; j++)
        {
          timeList += "<tr class=\"row1\">";
          timeList += "<td>"+(j)+":00<\/td>";
          for(var i=0; i<list_keys.length; i++)
          {
            if(time_code_tab[index][list_keys[i]]=="0")
            {
              var curBinNum = "000000000000000000000000";
              
            }
            else
            {
              var curBinNum = dec2bin(time_code_tab[index][list_keys[i]]);
            }
            
            //timeList += "<td>&nbsp;<\/td>";
             timeList += "<td>\n";
            if(curBinNum.charAt(i)=="1")
            {
              timeList +="<input type=\"checkbox\" name=\"obj_"+list_keys[i]+"[]\" id=\"obj_"+list_keys[i]+"\" value=\""+hours_List[j]+"\" checked>\n";
              
            } 
            else
            {
              timeList +="<input type=\"checkbox\" name=\"obj_"+list_keys[i]+"[]\" id=\"obj_"+list_keys[i]+"\" value=\""+hours_List[j]+"\">\n";
            }
             timeList += "</td>\n";
            
          }
          timeList += "<\/tr>";
        }

       
     
      timeList += "</tr>";
      timeList += "<\/tbody>";
      timeList += "<\/table>";
      timeList +="							   </td>\n";
      timeList +="							 </tr>\n";
      timeList +=frmButtRow_HTML(commBtnText["Add"], 1);
      
      //frmButtRow_HTML("Add", 1);
      timeList +="							</table>\n";
      timeList +="							</div>\n";
      timeList +=op_field (17);
      timeList +=day_field ('day_1');
      timeList +=day_field ('day_2');
      timeList +=day_field ('day_3');
      timeList +=day_field ('day_4');
      timeList +=day_field ('day_5');
      timeList +=day_field ('day_6');
      timeList +=day_field ('day_7');
      timeList += "</form>";
                           
      timeList += fieldstFoot_HTML();
   }
 

 
  return timeList;


}
function createTableStructForDays(daysValue)
{
  var time_alloc = new Array();
  for(var l=0; l<daysValue.length; l++)
  {
    nextTm = daysValue[l];
    time_alloc[l] = new Array();
   
    var hours_List_Current = new Array();
    for (k=23; k>=0; k--)
    {
      //var pow_of_tw = Math.pow(2,k);
      var pow_of_tw = hours_List[k];
          
      if (nextTm>=pow_of_tw)// that means we need to store the number
      {
        //hours_List_Current[k]  =pow_of_tw;
        nextTm=nextTm-pow_of_tw;
        time_alloc[l][k]=1;
        //jdb('<br/>'+l+'\t'+k+'\t'+daysValue[l]+'\t'+hours_List[k]+'\t'+nextTm);
      }
      else
      {
        //hours_List_Current[k]  =0;
        time_alloc[l][k]=0;
      }
        //if(l==5)
        jdb('<br/>'+'\t'+k+'\t'+ daysValue[l]+'\t' + nextTm+'\t' + time_alloc[l][k]);
      
      //if(l==7)
      //{
        //alert("Value Saved in time_alloc[l][k] "+time_alloc[l][k]);
        
     // }
    }
  }
  return time_alloc;
}
function displayTableStruc(time_alloc,list_keys, isEdit)
{
  var timeList ="";
  for (j = 0; j < 24; j++)
  {
    timeList += "<tr class=\"row1\">";
    timeList += "<td>"+(j)+":00<\/td>";
   for(var l=0; l<list_keys.length; l++)
    {
      timeList += "<td>\n";
      if(isEdit)
      {
        if(time_alloc[l][j]==1)
        {
          timeList +="<input type=\"checkbox\" name=\"obj_"+list_keys[l]+"[]\" id=\"obj_"+list_keys[l]+"\" value=\""+hours_List[j]+"\" checked>\n";
          
        } 
        else
        {
          timeList +="<input type=\"checkbox\" name=\"obj_"+list_keys[l]+"[]\" id=\"obj_"+list_keys[l]+"\" value=\""+hours_List[j]+"\">\n";
        }
      }
      else // only comes here when use for view purpose
      {
        if(time_alloc[l][j]==1)
        {
          timeList +="*\n";
          
        } 
        else
        {
          timeList +="&nbsp;\n";
        }
      }
      
        timeList += "</td>\n";
    }
   timeList += "<\/tr>"; 
  }
    
  timeList += "</td>\n";
  return timeList
        
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
  newPage +="function submitmyform(myobject)\n";
  newPage +="{\n";
  newPage +="	//var myHiddenOb;\n";
  newPage +="	\n";
  newPage +="	//myHiddenOb = getElemRefs(\"prev_qstring\";\n";
  newPage +="	//myHiddenOb.value=produceQString(;\n";
  newPage +="	//return formcheck(myobject;\n";
  newPage +="	//alert(document.myForm.day_1.value)\n";
  newPage +="	//alert(document.myForm.day_2.value)\n";
  newPage +="	//alert(document.myForm.day_3.value)\n";
  newPage +="	//alert(document.myForm.day_4.value)\n";
  newPage +="	//alert(document.myForm.day_5.value)\n";
  newPage +="	//alert(document.myForm.day_6.value)\n";
  newPage +="	//alert(document.myForm.day_7.value)\n";
  newPage +="	return Validator.Validate(myobject,1);\n";
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
  return (newPage);
}
