	var myColumns = [
			"Group Name", "Number of Tanks", "Active Tank", "Base Product"
		];
		
		var tankSel_myColumns = [
			 "Tank", "Product", "Active" 
		];
	var otherText = new Array()
		otherText["youraction"] =  "YOUR ACTION";
    otherText["tkselect"] =  "TANK SELECTION";
		otherText["btn_addNew_tkGrp"] =  "Add New Tank Group";
		otherText["btn_bakto_tkGrpPg"] =  "Back to Tank Groups Page";
		otherText["btn_bakto_tkSelPg"] =  "Back to Tank Selection Page";
		otherText["btn_addNew_tk"] =  "Add New Tank";
    otherText["msg_seldept"] =  "Please select the Depot, to view its tank groups ";
    otherText["msg_selAdept"] =  "Select A Depot";
    otherText["msg_selAtk"] =  "Select A Tank";
    otherText["msg_addNewGrp_fSet"] =  "add new tank group details";
    otherText["msg_addNewTkToGrp_fSet"] =  "add tank to tank group details";
    otherText["msg_addNewGrp_frmComplt"] = "Complete and submit the following form to add new tank group, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_addNewTkToGrp_frmComplt"] = "Complete and submit the following form to add new tank to the group, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_valid_GrpName"] = "Enter Tank Group Name";
    otherText["dept"] =  "Depot";    
    otherText["pgHead_tkGrps"] =  "tank groups";
    otherText["pgHead_AddtkGrps"] =  "add new tank group";
    otherText["pgHead_Addtk"] =  "add tank to tank group";
    otherText["pgHead_tkSelection"] =  "tank selection";
    otherText["pgTitle_tkGrps"] =  "Stock Management, tank groups";
    otherText["pgTitle_Addtk"] =  "Stock Management, tank groups, Add New Tank";
    
	
		/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
  var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[23]= "Successfully Inserted A New Record !"; // insert a new  sub equip Type
    l_opInf[27]= "Successfully Inserted A New Record !"; // insert a new  Tank Group
    l_opInf[33]= "Insert new record Failed!";
    l_opInf[24]= "Tank Selection Successfully Updated!";
    l_opInf[25]= "Successfully Deleted!";
    l_opInf[35]= "Deleted Failed!";
    l_opInf[37]= "Insert new record Failed!";
    l_opInf[28]= "Successfully Deleted!";
    l_opInf[38]= "Deleted Failed!";
    l_opInf[133]= "DB Insert Failed!";
    l_opInf[135]= "DB Delete Failed!";
    l_opInf[138]= "DB Delete Failed!";    
    
var ops_req_print = [-1,0,1,23,27,33,37,24,25,35,28,38];
var ops_req_search = [-1,0,1,23,27,33,37,24,25,35,28,38];
var items_per_page = 10;

		
/*
 * The structure dealing with
 * "Group Name", "Number of Tanks", "Active Tank", "Base Product" 
	["ADO","4","035","ADO"]
*/			

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
  
  if (curViewDetailState <= 1 || curViewDetailState==37 || curViewDetailState==27 ||  curViewDetailState==28) // view records of tank groups
  {
	  //newPage +=displayGlblFrm();
	  newPage +=addNewBtn_HTML();
	  newPage +=displayStatusMsg (op);      
	  newPage += "<tr> \n";
	  newPage += "<td>\n ";
	  newPage += infoTableHdr_HTML();
	  newPage += infoTable_HTML(curColumnToSort);
	  newPage += "<\/tbody>";
	  newPage += "<\/table>";
	  newPage += "<\/div>";
	  newPage += "<\/td>";	
	  newPage += "<\/tr>"; 
	  if ( pg == -1) pg = 1;
	  if ( parseInt(pg) > 0 && parseInt(pagesTotal) > 1 )
	  {
		  //Call the common next page function, first 3 variables are must followed by key value combinations, each key must have a value
		  newPage +=nextPage_longStr(pagesTotal, pg, "pg","dummy",0);

	  }
 

  }
		
 if (priv >= 5 && curViewDetailState ==2 || curViewDetailState ==23 || curViewDetailState ==24 || curViewDetailState ==25 ) // Tank Selection Page
 {
    newPage += displayTankSelection();
 }
 if (priv >= 7 && curViewDetailState ==7) // able to insert Show add new form
 {
    newPage += displayAddNewGrpFrm();
 }
 if (priv >= 7 && curViewDetailState ==3) // able to insert Show add new form
 {
    newPage += displayAddNewTankFrm();
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
  //alert(newPage); 
	return(newPage);
  document.close();
  if (typeof writeBack != 'undefined')writeBack();

	
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
  glblFrm +=otherText["msg_seldept"]+"\n";
  glblFrm += "                                    <table>\n";
  glblFrm += "                                            <tr>\n";
  glblFrm +=
    "                                                    <td class=\"infotextheading\">\n";
  glblFrm +=otherText["dept"]+"                                                            :\n";
  glblFrm += "                                                    </td>\n";
  glblFrm += "                                                    <td>\n";
  glblFrm += "                                                        <select id=\"trmnl\" name=\"trmnl\" class=\"smallselect\" onchange=\"submit();\"> \n";
  
  glblFrm += displayDropList(trmnl, terminal,otherText["msg_selAdept"]);

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
function displayAddNewGrpFrm()
{
  var addFrmhtml ="";
  addFrmhtml +=backToBtn_HTML();  
  addFrmhtml += fieldst_HTML(otherText["msg_addNewGrp_fSet"]);
  addFrmhtml += " <div class=\"adminform\">\n";
  addFrmhtml +="<table width=\"100%\">\n";
  addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_addNewGrp_frmComplt"]); 
  addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"tank_grp.cgi\" onsubmit=\"return submitmyform(this)\">\n";
  //addFrmhtml += trmnl_field("type=\"hidden\"");
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
  addFrmhtml +="                             <input type=\"text\" name=\"tkgrp\" id=\"tkgrp\" maxLength=\"14\" dataType=\"Require\" msg=\"Enter Tank Group Name\"> \n";
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
  addFrmhtml += "            <\/div>\n";
  addFrmhtml +=op_field (17);
  addFrmhtml += "                    </form>\n";                      
  addFrmhtml += fieldstFoot_HTML();
  return addFrmhtml;
}
function displayAddNewTankFrm()
{
 var addFrmhtml ="";
  addFrmhtml +=backToBtn_HTML();
  
  addFrmhtml += "<tr> \n";
  addFrmhtml += "<td align=\"left\">\n";
  addFrmhtml += "<table>\n";
  
  addFrmhtml += "   <tr> \n";
  addFrmhtml += "                                                    <td width=\"80\" class=\"infotextheading\">\n";
  addFrmhtml += "                                                            "+myColumns[0]+":\n";
  addFrmhtml += "                                                    </td>\n";
  addFrmhtml += "                                                    <td align=\"left\" class=\"infotext\">\n";
  addFrmhtml +=tkgrp;
  addFrmhtml += "                                                    </td>\n";
  addFrmhtml += "   </tr> \n";
  addFrmhtml += "</table>\n";
  addFrmhtml += "</td>\n";	
  addFrmhtml += "</tr> \n";
  
  addFrmhtml += fieldst_HTML(otherText["msg_addNewTkToGrp_fSet"]);
  addFrmhtml += " <div class=\"adminform\">\n";
  addFrmhtml +="<table width=\"100%\">\n";
  addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_addNewTkToGrp_frmComplt"]); 
  addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"tank_grp.cgi\" onsubmit=\"return submitmyform(this)\">\n";
  addFrmhtml +=          preqstr_field ();
  addFrmhtml +="          <input type=\"hidden\" name=\"tkgrp\" id=\"tkgrp\" value=\""+tkgrp+"\">\n";
  addFrmhtml +="						<tr>\n";
  addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
  addFrmhtml +="										<table width=\"100%\">\n";
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",tankSel_myColumns[0]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <select id=\"tk\" name=\"tk\" class=\"smallselect\"> \n";
  addFrmhtml +=displayDropList(tk, noGrpTk_jsArr,otherText["msg_selAtk"]);
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
  addFrmhtml += "            <\/div>\n";
  addFrmhtml +=op_field (13);
  addFrmhtml += "                    </form>\n";                      
  addFrmhtml += fieldstFoot_HTML();
  
  return addFrmhtml;
}
function displayTankSelection(curPrivilage,curColumnToSort)
{
  var tankSelectHtml ="";

  tankSelectHtml +=backToBtn_HTML();
  tankSelectHtml +=displayStatusMsg (op);  
  tankSelectHtml += "<tr> \n";
  tankSelectHtml += "<td align=\"left\">\n";
  tankSelectHtml += "<table>\n";
  
  tankSelectHtml += "   <tr> \n";
  tankSelectHtml += "                                                    <td width=\"80\" class=\"infotextheading\">\n";
  tankSelectHtml += "                                                            "+myColumns[0]+":\n";
  tankSelectHtml += "                                                    </td>\n";
  tankSelectHtml += "                                                    <td align=\"left\" class=\"infotext\">\n";
  tankSelectHtml +=tkgrp;
  tankSelectHtml += "                                                    </td>\n";
  tankSelectHtml += "   </tr> \n";
  tankSelectHtml += "</table>\n";
  tankSelectHtml += "</td>\n";	
  tankSelectHtml += "</tr> \n";
  
  tankSelectHtml += "<tr> \n";
  //end of the td and tr for the list area
  tankSelectHtml += "<td>\n ";  
  if( ((tankSel_myColumns.length)> 0))
     {
        
        tankSelectHtml += "<div id=\"printReady\">";
	      tankSelectHtml += table_begin("M", 0,"");
        tankSelectHtml += "<tbody> \n";
        tankSelectHtml += "<tr>";
         for(var i=0; i<tankSel_myColumns.length; i++)
        {
          tankSelectHtml += "<td>"+tankSel_myColumns[i]+"<\/td>";
         
          
        }
        tankSelectHtml += "<\/tr>";
     }

    for(i in tks_jsArr)
    {
      if(i>0)
      {
        tankSelectHtml += "<tr class=\"row1\">\n";
        var howmanyDone =0;
        for(var j=0; j<tankSel_myColumns.length; j++)
        {
          if (curColumnToSort == howmanyDone)
          {
            tankSelectHtml += "<td style=\"background-color:#EEEEEE\">" + cust_jstab[i][howmanyDone] + "<\/td>";
			    } 
          else 
          {
          
				    tankSelectHtml += "<td>\n";				  
				    if(howmanyDone==0) // means time to display the drop list and table
				    {
  				    tankSelectHtml +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
              tankSelectHtml +="       <table border=\"0\">\n";
              tankSelectHtml +="	       <tr>\n";
              tankSelectHtml +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+tks_jsArr[i][howmanyDone]+"</span>\n";
              
              tankSelectHtml +="          <input type=\"hidden\" name=\"tk\" id=\"tk\" value=\""+tks_jsArr[i][howmanyDone]+"\">\n";
              tankSelectHtml +="          <input type=\"hidden\" name=\"tkgrp\" id=\"tkgrp\" value=\""+tkgrp+"\">\n";
              //tankSelectHtml +="          <input type=\"hidden\" name=\"trmnl\" id=\"trmnl\" value=\""+trmnl+"\">\n";
              tankSelectHtml +="          <input type=\"hidden\" name=\"pg\" id=\"pg\" value=\""+pg+"\">\n";
              tankSelectHtml +=          preqstr_field ();
              tankSelectHtml +="          </td>\n";
              tankSelectHtml +="          <td width=\"50%\">\n";
              tankSelectHtml += tkSel_op_list(priv, tks_jsArr[i][howmanyDone],i );
              tankSelectHtml +="          </td>\n";
              tankSelectHtml +="	       </tr>\n";
              tankSelectHtml +="	      </table>\n";
              tankSelectHtml +="	      </form>\n";
              
            }
            else if(howmanyDone==2)
            {
              if(tks_jsArr[i][howmanyDone]=="1")// if tank active
              {
                tankSelectHtml +="	      *\n";
              }
              else
              {
                tankSelectHtml +="	      <form name=\"select_active_"+i+"\" id=\"select_active_"+i+"\" >\n";
                tankSelectHtml +="          <input type=\"hidden\" name=\"tk\" id=\"tk\" value=\""+tks_jsArr[i][0]+"\">\n";
                tankSelectHtml +="          <input type=\"hidden\" name=\"tkgrp\" id=\"tkgrp\" value=\""+tkgrp+"\">\n";
				if (priv>=6)
				{
					tankSelectHtml +="	      <input type=\"checkbox\" name=\"tkActive\" id=\"tkActive\" value=\""+tks_jsArr[i][0]+"\" onClick=\"tkgetPreSelectedTk(this, '"+i+"' );\">\n";
				}
                tankSelectHtml +="	      <input type=\"hidden\" name=\"tkOldActive\" id=\"tkOldActive\" value=\""+tks_jsArr[i][0]+"\">\n";
                tankSelectHtml +=op_field (14);
                tankSelectHtml +="	      <\/form>";
              } 
            }
            else
            {
              tankSelectHtml += tks_jsArr[i][howmanyDone];
            }  
            
            tankSelectHtml += "<\/td>\n";
          
          
		  	}
		  	howmanyDone++;	
      } // end of inner for loop
      
		  
     }
      tankSelectHtml += "\n";
      tankSelectHtml += "<\/tr>";
    }
    tankSelectHtml += "<\/tbody>";
    tankSelectHtml += "<\/table>";
    tankSelectHtml += "<\/div>";
    tankSelectHtml += "<\/td>";	
		tankSelectHtml += "<\/tr>";     
    tankSelectHtml += "<\/td>\n ";
    tankSelectHtml += "</tr> \n";
  
  return tankSelectHtml;
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
function trmnl_field(attr)
{
  var fieldHTML ="";
  fieldHTML +="<input name=\"trmnl\" id=\"trmnl\" value=\""+trmnl+"\" "+attr+" >\n";
  return fieldHTML;
}
function backToBtn_HTML ()
{
  var btn_HTML = "";
   var grp_basePrdCd = "-1";
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
      
   btn_HTML += btnLocation_HTML("justChaneMyLocation('tank_grp.cgi'); ", otherText["btn_bakto_tkGrpPg"]);
    
   if(op>=2 && (priv>=7)&&(tkgrp!="-1" ))
   {
    if(tks_jsArr.length>1)//that means I have the base Prod code
    {
      grp_basePrdCd = tks_jsArr[1][4];
    }
    
    if (op!=3)btn_HTML += "&nbsp; "+btnLocation_HTML("justChaneMyLocation('tank_grp.cgi?op=3&tkgrp='+tkgrp+'&grp_basePrdCd="+grp_basePrdCd+"'); ", otherText["btn_addNew_tk"]); // show the add button if its not add form
    
   }
  
   if(op==13)
   {
    btn_HTML += "&nbsp; "+btnLocation_HTML("justChaneMyLocation('tank_grp.cgi?op=2&tkgrp='+tkgrp); ", otherText["btn_bakto_tkSelPg"]);
   }
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
   btn_HTML += btnLocation_HTML("justChaneMyLocation('tank_grp.cgi?op=7'); ", otherText["btn_addNew_tkGrp"]);
   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
  }
   return btn_HTML;
}
function updatePageHeading(op,pgHead)
{
  var pageHeading = pgHead;
  if (op <= 1 || op == 28 || op == 38 || op == 27 || op == 37)
  {
    pageHeading +=otherText["pgHead_tkGrps"];
  }
  if (op == 7 )
  {
    pageHeading +=otherText["pgHead_AddtkGrps"];
  }
  if (op == 2 || op == 15 || op == 25 || op == 23 || op == 33)
  {
    pageHeading +=otherText["pgHead_tkSelection"];
  }
  
  if(op == 13 || op == 3)
  {
    pageHeading +=otherText["pgHead_Addtk"];
  }
  return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
  if (op <= 1)
  {
    pageTitle +=otherText["pgTitle_tkGrps"];
    
  }
  
  if(op ==13 )
  {
    pageTitle +=otherText["pgTitle_Addtk"];
  }
  
  return pageTitle;
}
/* define function op_list() */
function op_list(priv, accNum, frmNum)
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
      op_list +="<option value=\"18\">DELETE</option>";
      
    case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

    case 6:    /* Modify not required for The Tank Grouping Page  */
    
    case 5:			/* Find Has not been implemented yet*/
    op_list +="<option value=\"2\">"+otherText["tkselect"]+"</option>";
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
      op_list +="<option value=\"15\">DELETE</option>";
      
    case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

    case 6:
    
   
      
    case 5:			/* printf("<option value=1>5 1 FIND  </option>"); */
     
    break;
  }
  
  op_list +="<option value=0 selected>--\t"+otherText["tkselect"]+"\t--</option>";
  op_list +="</select>                                        ";
  return op_list ;
}
/* define function op_list() */
function tkgetPreSelectedTk(myobject, frmNum)
{
  var tkPre_selecte="";
  var founSelec = false;
  if(tks_jsArr.length>1)
  {
    for(var i=1; i<tks_jsArr.length; i++)
    {
      if(1 == tks_jsArr[i][2] )
      {
        tkPre_selecte +=tks_jsArr[i][0];
        founSelec = true;
        
      }
    }
  }
  //alert(tkPre_selecte);
  //alert("here it is"+eval("document.select_active_"+frmNum+".tkOldActive.value;"));
  
  if(founSelec) // if Selection Found
  {
    eval("document.select_active_"+frmNum+".tkOldActive.value=tkPre_selecte;");
    //alert("here it is inside if"+eval("document.select_active_"+frmNum+".tkOldActive.value;"));
    
  }
 
 eval("document.select_active_"+frmNum+".submit();");
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
        newPage += table_begin("M", 1,"");
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
	for(i in tank_grp_jsArr)
    {
      if(i>0)
      {
        newPage += "<tr class=\"row1\">\n";
        var howmanyDone =0;
        for(var j=0; j<myColumns.length; j++)
        {
          if (curColumnToSort == howmanyDone)
          {
            newPage += "<td style=\"background-color:#EEEEEE\">" + obs(tank_grp_jsArr[i][howmanyDone]) + "<\/td>";
			    } 
          else 
          {
          
				    newPage += "<td>\n";				  
				    if(howmanyDone==0) // means time to display the drop list and table
				    {
  				    newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
              newPage +="       <table border=\"0\">\n";
              newPage +="	       <tr>\n";
              newPage +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+obs(tank_grp_jsArr[i][howmanyDone])+"</span>\n";
              newPage +="          <input type=\"hidden\" name=\"tkgrp\" id=\"tkgrp\" value=\""+tank_grp_jsArr[i][howmanyDone]+"\">\n";
              //newPage +="          <input type=\"hidden\" name=\"trmnl\" id=\"trmnl\" value=\""+trmnl+"\">\n";
              newPage +="          <input type=\"hidden\" name=\"pg\" id=\"pg\" value=\""+pg+"\">\n";
              //newPage +=op_field ("");
              newPage +=          preqstr_field ();
              newPage +="          </td>\n";
              newPage +="          <td width=\"50%\">\n";
              newPage += op_list(priv, tank_grp_jsArr[i][(howmanyDone+1)],i );
              newPage +="          </td>\n";
              newPage +="	       </tr>\n";
              newPage +="	      </table>\n";
              newPage +="	      </form>\n";
            }
            else
            {
              newPage += obs(tank_grp_jsArr[i][howmanyDone]);
            }  
          
            newPage += "<\/td>\n";
          
          
		  	}
		  	howmanyDone++;	
      } // end of inner for loop
      
		  
     }
      newPage += "\n";
      newPage += "<\/tr>";
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
  newPage +="function submitAction(myobject,accNum, frmNum)\n";
  newPage +="{\n";
  newPage +="	   var myCurQstring=produceQString();\n";
  newPage +=    "var myselectedvalue = myobject.options[myobject.selectedIndex].value;";
  newPage +="   if(myselectedvalue==\"18\")\n";
  newPage += "  {\n";
  newPage +="     if(confirm('Are you sure you want to delete?'))\n";
  newPage += "    {\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
  newPage += "      return true;\n";
  newPage += "    }\n";
  newPage += "    else\n";
  newPage += "    {\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
  newPage += "    }\n";
  
  
  newPage +="   }\n";
  newPage +="   else if(myselectedvalue==\"15\")\n";
  newPage += "  {\n";
  newPage +="     if(confirm('Are you sure you want to delete?'))\n";
  newPage += "    {\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
  newPage += "      return true;\n";
  newPage += "    }\n";
  newPage += "    else\n";
  newPage += "    {\n";
  newPage += "      eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
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
