/****************************************
 * $Id: equip_types.js,v 1.31 2007/03/06 22:45:08 abs Exp $
 *
##########**********##########**********##########**********##########**********##########**********##########**********/

var t__Are_you_sure_you_want_to_delete                          
= ["Are you sure you want to delete"                           , "你是否确认删除此数据"];
var t__Sorry__No_Compartments_Found                             
= ["Sorry! No Compartments Found"                              , "对不起！没有发现油仓"];
var t__Positive_Integer_value_is_required                       
= ["Positive Integer value is required"                        , "请输入正整数"];
var t__Same_Equipment_Name_already_exists__use_a_different_name 
= ["Same Equipment Name already exists, use a different name"  , "相同的设备名称已被使用"];


var myColumns = [ "Name", "Code", "Number of Compartments", "Schedulable" ];
var cmptlimit_myColumns = [ "Compartment", "Safe Fill", "Unit" ];
var cmptprfile_myColumns = [ "Compartment No", "Product Code", "Product Name" ];	
var otherText = new Array()
otherText["youraction"] =  "YOUR ACTION";
otherText["prfile"] =  "PROFILE";
otherText["brkdn"] =  "BREAKDOWN";
otherText["cmpt_limits"] =  "COMPARTMENT LIMITS";
otherText["btn_addNew_eqpTp"] =  "Add New Equipment Type";
otherText["btn_bakto_eqpTp"] =  "Back to Equipment Type Page";  
otherText["eqpCd"] =  "Equipment Code"; 
otherText["eqpNm"] =  "Equipment Name"; 
otherText["prod"] =  "Product"; 
otherText["prfileCd"] =  "Profile Code"; 
otherText["vwCombintn"] =  "View Equipment Combinatioin"; 
otherText["vwCmptLimits"] =  "Compts Limit"; 
otherText["cmpt_num"] =  "Compartment No"; 
otherText["uts"] =  "Units"; 
otherText["supp"] =  "Supplier";  
otherText["msg_selAsupp"] =  "Select A Supplier";
otherText["isAComb"] =  "Is it a combination ?";
otherText["msg_selsupp"] = "Select A Supplier and Equipment Type to view an Equipment Profile";  
otherText["msg_selAEqpCd"] =  "Equip Code -- \t \t -- Equip Type -- \t \t -- Compts";
otherText["msg_pls_selAEqpCd"] =  "Please select a equipment";
otherText["msg_noCmptAssProd"] =  "No Compartment has been assigned a product";
otherText["msg_valid_address"] =  "Enter Address Between [0-9]";
otherText["msg_valid_safeFill"] =  "Enter Valid Safe Fill Qty ";
otherText["msg_no_cmptsFound"] =  "Sorry! No Compartments Found ";
otherText["msg_valid_prfCd"] =  "Enter Profile Code";
otherText["msg_valid_poll"] =  "Enter Poll Between [10-9999]";  
otherText["msg_valid_cmptNum"] =  "Enter Valid Number of Compartments"; 
otherText["msg_valid_eqpNm"] =  "Enter Equipment Name";
otherText["msg_selAProd"] =  "Select A Product";
otherText["msg_selUnit"] =  "Select Unit";    
otherText["msg_selARcTp"] =  "Select Receiving Type";
otherText["msg_addNewEqp_fSet"] =  "Add New Equipment Details";  
otherText["msg_addNewEqpPrfile_fSet"] =  "Add new Equipment Profile details";
otherText["preDefEqp_Names"] =  "Pre-Defined Equipment";
otherText["msg_addPreDefEqp_fSet"] =  "Create A new Combination Details";  
otherText["msg_addEqpCmpts_fSet"] =  "Add New Compartment to equipment details";   
otherText["msg_addNewEqp_frmComplt"] = "Complete and submit the following form to add new equipment, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
otherText["msg_modEqpPrfile_fSet"] =  "Modify Equipment Profile details";
otherText["msg_modEqpPrfile_frmComplt"] = "Complete and submit the following form to modify Equipmetn Profile, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
otherText["msg_addPreDefEqp_frmComplt"] = "Select And Add Pre-Defined Equipment to create a new combination, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
otherText["msg_addEqpCmpts_frmComplt"] = "Complete and submit the following form to add new Compartment to an Equipment, all fields labelled with an  (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
otherText["cmptlimit_SubEq"] = "Combination Break Down";	
otherText["sub_itm_eqpCd"] = "Sub-Item Eqp Code";
otherText["sub_itm_eqpNm"] = "Sub-Item Eqp Name";
otherText["pgHead_eqpDetails"] =  "EQUIPMENT DETAILS";
otherText["pgHead_eqpTp"] =  "EQUIPMENT TYPES";
otherText["pgHead_AddeqpTp"] =  "ADD NEW EQUIPMENT TYPES";
otherText["pgHead_ModeqpTp"] =  "MODIFY EQUIPMENT TYPES";
otherText["pgTitle_eqpTp"] =  "Load Schedule, Equiptment Types";
otherText["pgTitle_AddeqpTp"] =  "Load Schedule, Add New Equiptment Types";
otherText["pgTitle_ModeqpTp"] =  "Load Schedule, Modify Equiptment Types";
otherText["msg_Alert_Pstv_Int_Req"] =  "Positive Integer value is required";
otherText["t_find_eqp"] =  "Equipment Search";
otherText["t__ALERT_EQNAME_EXIST"] =  "Same Equipment Name already exists, use a different name!";
otherText["t__BTN_VIEW_ALL"] =  "View All";
otherText["msg_valid_pgNumber"] = "Enter Valid Page Number";
otherText["msg_tot_pages"] = "Total Pages";

if ( 'cn' == js_lang){
	var myColumns = [ "类型名称", "代码", "油仓数", "可否调度" ];
	var cmptlimit_myColumns = [ "油仓", "安全容量", "单位" ];
	var cmptprfile_myColumns = [ "油仓号", "油品代码", "油品名称" ];	
	var otherText = new Array()
	otherText["youraction"] =  "请选择";
	otherText["prfile"] =  "属性";
	otherText["brkdn"] =  "细目分类";
	otherText["cmpt_limits"] =  "油仓限额";
	otherText["btn_addNew_eqpTp"] =  "新增运输设备类型";
	otherText["btn_bakto_eqpTp"] =  "返回运输设备类型管理页";  
	otherText["eqpCd"] =  "运输设备代码"; 
	otherText["eqpNm"] =  "运输设备名称"; 
	otherText["prod"] =  "油品"; 
	otherText["prfileCd"] =  "属性代码"; 
	otherText["vwCombintn"] =  "查看运输设备组合"; 
	otherText["vwCmptLimits"] =  "油仓限额"; 
	otherText["cmpt_num"] =  "油仓号"; 
	otherText["uts"] =  "单位"; 
	otherText["supp"] =  "供应商";  
	otherText["msg_selAsupp"] =  "选择供应商";
	otherText["isAComb"] =  "是组合运输设备?";
	otherText["msg_selsupp"] = "选择供应商和运输设备类型来查看运输设备属性";  
	otherText["msg_selAEqpCd"] =  "运输设备代码 -- \t \t -- 运输设备类型 -- \t \t -- 油仓";
	otherText["msg_pls_selAEqpCd"] =  "请选择运输设备";
	otherText["msg_noCmptAssProd"] =  "没有指定油品的油仓";
	otherText["msg_valid_address"] =  "请输入[0-9]中的地址";
	otherText["msg_valid_safeFill"] =  "请输入有效的安全容量";
	otherText["msg_no_cmptsFound"] =  "对不起! 没有找到油仓";
	otherText["msg_valid_prfCd"] =  "请输入属性代码";
	otherText["msg_valid_poll"] =  "请输入轮询介于[10-9999]";  
	otherText["msg_valid_cmptNum"] =  "请输入有效的油仓数"; 
	otherText["msg_valid_eqpNm"] =  "请输入运输设备名称";
	otherText["msg_selAProd"] =  "选择油品";
	otherText["msg_selUnit"] =  "选择单位";    
	otherText["msg_selARcTp"] =  "选择接收类型";
	otherText["msg_addNewEqp_fSet"] =  "新增运输设备详情";  
	otherText["msg_addNewEqpPrfile_fSet"] =  "新增运输设备属性详情";
	otherText["preDefEqp_Names"] =  "预定义运输设备列表";
	otherText["msg_addPreDefEqp_fSet"] =  "新增组合详情";  
	otherText["msg_addEqpCmpts_fSet"] =  "新增油仓到运输设备详情";   
	otherText["msg_addNewEqp_frmComplt"] = "填写并递交下列内容以新增运输设备类型,所有带 (<span style=\"COLOR: #FF0000;\">*</span>) 的项目是必填的";
	otherText["msg_modEqpPrfile_fSet"] =  "修改运输设备属性详情";
	otherText["msg_modEqpPrfile_frmComplt"] = "填写并递交下表以修改运输设备属性,所有带 (<span style=\"COLOR: #FF0000;\">*</span>) 的项目是必填的";
	otherText["msg_addPreDefEqp_frmComplt"] = "选择预定义运输设备类型并添加到一个新的运输设备组合,所有带 (<span style=\"COLOR: #FF0000;\">*</span>) 的项目是必填的";
	otherText["msg_addEqpCmpts_frmComplt"] = "填好并递交下表以新增油仓到一个运输设备,所有带 (<span style=\"COLOR: #FF0000;\">*</span>) 的项目是必填的";
	otherText["cmptlimit_SubEq"] = "组合式运输设备结构";	
	otherText["sub_itm_eqpCd"] = "子类运输设备代码";
	otherText["sub_itm_eqpNm"] = "子类运输设备名称";
	otherText["pgHead_eqpDetails"] =  "运输设备详情";
	otherText["pgHead_eqpTp"] =  "运输设备类型管理";
	otherText["pgHead_AddeqpTp"] =  "新增运输设备类型";
	otherText["pgHead_ModeqpTp"] =  "修改运输设备类型";
	otherText["pgTitle_eqpTp"] =  "发油订单管理, 运输设备类型管理";
	otherText["pgTitle_AddeqpTp"] =  "发油订单管理, 新增运输设备类型";
	otherText["pgTitle_ModeqpTp"] =  "发油订单管理, 修改运输设备类型";
        otherText["t__ALERT_EQNAME_EXIST"] =  "相同的设备名称已被使用!";
        otherText["msg_Alert_Pstv_Int_Req"] =  "请输入正整数";
        otherText["t_find_eqp"] =  "查找运输设备类型";
        otherText["t__BTN_VIEW_ALL"] =  "查看全部";
        otherText["msg_valid_pgNumber"] = "请输入正确的页码";
        otherText["msg_tot_pages"] = "总页数";
}


var items_per_page = 10;	

/*
 * opValues Hash table trace the 
 * available options on this page 
 * for every function there is a unique op
 */		    
var opValues = new Array();
opValues["init"] = 1;
opValues["cmpt_limts"] = 2;
opValues["cmpt_brkdn"] = 3;
opValues["prfile"] = 4;
opValues["enterAddNewPrf"] = 5;
opValues["enterModPrf"] = 10;
opValues["enterDelPrfile"] = 9;
opValues["enterAdd"] = 7;  
opValues["submitAdd"] = 17;
opValues["enterDelete"] = 8;
opValues["submitDelete"] = 18;
opValues["enterModify"] = 6;
opValues["submitModify"] = 16;
opValues["submitAddNewCmb"] = 13;
opValues["submitAddNewPrf"] = 15;

/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
var l_opInf= new Array()
	for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
l_opInf[28]= "Successfully Deleted!";
l_opInf[15]= g_opInf[27]; // insert a new success cpmtment
l_opInf[23]= g_opInf[27]; // insert a new success  sub equip Type
l_opInf[25]= g_opInf[27]; // insert a new success
l_opInf[26]= g_opInf[26]; // Success Updated
l_opInf[27]= g_opInf[27]; // insert a new success
l_opInf[24]= g_opInf[28]; // delete success ;
l_opInf[38]= g_opInf[38]; //Deleted Failed
l_opInf[48]= "Deleted Failed due to a Child Record!";
l_opInf[33]= g_opInf[37]; //Insert New Record Failed!";
l_opInf[35]= g_opInf[37]; //Insert New Record Failed!";
l_opInf[37]= g_opInf[37]; //"Insert New Record Failed!";
l_opInf[34]= g_opInf[38]; //Deleted Failed
l_opInf[133]= g_opInf[136]; //"DB Update Failed!";
l_opInf[135]= g_opInf[136]; //"DB Update Failed!";
l_opInf[136]= g_opInf[136]; //"DB Update Failed!";
l_opInf[137]= g_opInf[137];//"DB Insert Failed!";
l_opInf[134]= g_opInf[138]; //"DB Delete Failed!";

/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ submitmyform] 
[PURPOSE]  		-> 	Always use this method to submit a form,
					gives me the flexbility of doing validation
					and addition if required before i submit the form
          
[Parameter]  	-> myobject FORM OBJECT Parameter is the form need to be submit
[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function submitmyform(myobject)
{
   var currop = getElemRefs('op');
   if(currop.value=="9")
  {
     if(confirm( ml(t__Are_you_sure_you_want_to_delete) +'?'))
    {
	        return Validator.Validate(myobject,1);
    }
    else
    {
	        return false;
    }
   }
   return Validator.Validate(myobject,1);
}
/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function submitAction(myobject,frmNum)
{
	  var myCurQstring=produceQString();
var myselectedvalue = myobject.options[myobject.selectedIndex].value;   if(myselectedvalue=="18")
  {
     if(confirm( ml(t__Are_you_sure_you_want_to_delete) +'?'))
    {
      eval("document.select_action_"+frmNum+".submit();");
      return true;
    }
    else
    {
      eval("document.select_action_"+frmNum+".reset();");
    }
   }
   else if(myselectedvalue=="2")
  {
    var howmanyCmmpts = eval("document.select_action_"+frmNum+".noOfcompts.value");
     if(howmanyCmmpts>0)
    {
      eval("document.select_action_"+frmNum+".submit();");
      return true;
     }
    else
    {
      alert( ml(t__Sorry__No_Compartments_Found)+'!');
      eval("document.select_action_"+frmNum+".reset();");
      return false;
    }
   }
   else if(myselectedvalue=="11")
  {
     if(confirm( ml(t__Are_you_sure_you_want_to_delete) +'?'))
    {
      eval("document.select_action_"+frmNum+".preqstr.value='"+myCurQstring+"';");
      eval("document.select_action_"+frmNum+".op.value='"+21+"';");
      eval("document.select_action_"+frmNum+".submit();");
      return true;
    }
   }
   else if(myselectedvalue=="22")
  {
     if(confirm( ml(t__Are_you_sure_you_want_to_delete) +'?'))
    {
      eval("document.select_action_"+frmNum+".preqstr.value='"+myCurQstring+"';");
      eval("document.select_action_"+frmNum+".submit();");
      return true;
    }
   }
   else
  {
    eval("document.select_action_"+frmNum+".submit();");
    return true;
   }
}
function isInteger_eq_types(r) {
    var i;
    var s = trim(r.value);
    if(s==""|| isNaN(parseInt(s, 10)) || parseInt(s, 10)==0)
    {
      alert( ml(t__Positive_Integer_value_is_required)+'!');
      r.value = '';
      return false;
    }
    
}
//Check existing equipcode 
function checkEqptType(myobject)
{
	 if (Validator.Validate(myobject,1))
	 {
     var mycgi = '../../../cgi-bin/en/load_scheds/equip_types_dup_check.cgi'; 
     var myqry = 'eqcode='+encodeURI(document.addNew.eqpNm.value) ;
     var oTN = loadHtml(mycgi, myqry);
      //alert(oTN);
	
	    if ( oTN != 0) { 
	           alert( ml(t__Same_Equipment_Name_already_exists__use_a_different_name) +'!');
	           document.addNew.eqpNm.focus ;
            return false; 
	     }
    return true; 
	}
    return false; 
}

/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    		
var ops_req_print = [-1, 1,2, 15,23,24, 25,26,27, 33,34, 35, 28,38,48,36,27,37,47,133,134,135,137];
var ops_req_search = [-1, 1,2, 15,23,24, 25,26,27, 33,34, 35,28,38,48,36,27,37,47,133,134,135,137];// search never required on this page		

/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  FUNCTION [ renderPage] 
  [PURPOSE]  		-> 	Always call this function from 
  Pro C Java Script output
  Depending upon the Opration selected 
  and privlages.


  [Parameter]  	-> cRec integer current record index to be modified NOT IN USE
  -> cCol integer USED FOR CURRENT COLUM sort NOT IN USE
  -> cState integer DECIDES what to display on the screen
  -> cPageState LOADED OR NOTLOADED, from PROC its always 
  LOADED but use LOADED when DHTML loads the
  page without interacting with the server used for stock management
  unit conversion functions.
  [AUTHOR]  		-> Abdul Shakoor (DKI) Sept 1, 2005
  '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
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
	newPage += printHdr(newPage, updatePageTitle(curViewDetailState, pageTitle), lang);
	newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
	newPage += "\n";
	newPage +="<tr>\n";  
	newPage +="<td width=\"100%\">             \n";
	newPage +="<div class=\"content\" id=\"content\">\n";
	newPage += "<div id=\"printReady\">";
	newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
	newPage +="<tbody>\n";   



	// if OP is <=1 OR Higher than available options should always come to this view
	if (curViewDetailState <= opValues["init"] || curViewDetailState ==26 || curViewDetailState >27 ) 
	{
	  newPage += displayFindFrm();
		newPage +=addNewBtn_HTML();
		newPage +=displayStatusMsg (op);  
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

		for(i in eqTypes_jsArr)
		{
			if(i>0)
			{
				newPage += "<tr class=\"row1\">\n";
				var howmanyDone =0;
				for(var j=0; j<myColumns.length; j++)
				{
					if (curColumnToSort == howmanyDone)
					{
						newPage += "<td style=\"background-color:#EEEEEE\">" + obs(eqTypes_jsArr[i][howmanyDone]) + "<\/td>";
					} 
					else 
					{

						newPage += "<td>\n";				  
						if(howmanyDone==0) // means time to display the drop list and table
						{
							newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
							newPage +="       <table border=\"0\">\n";
							newPage +="	       <tr>\n";
							newPage +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+obs(eqTypes_jsArr[i][howmanyDone])+"</span>\n";
							newPage +="          <input type=\"hidden\" name=\"eqpCd\" id=\"eqpCd\" value=\""+eqTypes_jsArr[i][1]+"\">\n";
							newPage +="          <input type=\"hidden\" name=\"canBreak\" id=\"canBreak\" value=\""+eqTypes_jsArr[i][4]+"\">\n";
							newPage +="          <input type=\"hidden\" name=\"pg\" id=\"pg\" value=\""+pg+"\">\n";
							newPage +="          <input type=\"hidden\" name=\"noOfcompts\" id=\"noOfcompts\" value=\""+eqTypes_jsArr[i][2]+"\">\n";
							newPage +=          preqstr_field ();
							newPage +="          </td>\n";
							newPage +="          <td width=\"50%\">\n";
							newPage += op_list(curPrivilage,i);
							newPage +="          </td>\n";
							newPage +="	       </tr>\n";
							newPage +="	      </table>\n";
							newPage +="	      </form>\n";
						}
						else if(howmanyDone==3) // means time to display the Yes Or No
						{

							if(priv>=6 && (parseInt(eqTypes_jsArr[i][2])>0)) // show radio btns if priv and no of cmpts > 0
							{
								newPage +="	      <form name=\"updateEq"+i+"\" id=\"updateEq"+i+"\" >\n";
								newPage +=sched_field(eqTypes_jsArr[i][howmanyDone]);
								newPage +="          <input type=\"hidden\" name=\"eqpCd\" id=\"eqpCd\" value=\""+eqTypes_jsArr[i][1]+"\">\n";
								newPage +=op_field (opValues["submitModify"]);
								newPage +="	      </form>\n";
							}
							else // display the Yes Or No
							{
								if(eqTypes_jsArr[i][howmanyDone]=='Y')
								{
									newPage += commText["Yes"];
								}
								else
								{
									newPage += commText["No"];
								}
							}


						}
						else
						{
							newPage += obs(eqTypes_jsArr[i][howmanyDone]);
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
		newPage += "<\/div>";
		newPage += "<\/td>";	
		newPage += "<\/tr>";
    if(parseInt(pg)> 0&&parseInt(pagesTotal)!=0)
    {
      	newPage +=nextPage_long(pagesTotal, pg,"equip_types.cgi", "pg");
    }
	}

	if (priv >= 5 && curViewDetailState ==opValues["cmpt_limts"]) // display compt Limits
	{
		newPage += displayCmptLimts('-1', false);
	}
	if (priv >= 5 && curViewDetailState ==opValues["prfile"]) // able to insert Show add new form
	{
		newPage += displayCmptPrfile(priv,curColumnToSort);
	}
	if (priv >= 7 && curViewDetailState ==opValues["enterAdd"]) // able to insert Show add new form
	{
		newPage += displayAddNewEqp();
	}

	if (priv >= 5 && curViewDetailState ==opValues["enterAddNewPrf"]) // able to insert Show add new form
	{
		newPage += displayAddNewEqpPrfile(5, 5);
	}
	if (priv >= 6 && curViewDetailState == 6) // display the Delivery Locations
	{
		newPage += displayModMtrDvcFrm( );
	}
	if (priv >= 6 && curViewDetailState == opValues["enterModPrf"]) // display the Delivery Locations
	{
		newPage += displayModEqpPrfile('TRL5BPA', 1)
	}

	if (priv >= 7 && curViewDetailState ==27) // able to insert Show add new form
	{
		newPage += displayCmptLimts('-1', true);
	}


	// table for everything ends here
	//	newPage += "</tr>\n";
	newPage += "</tbody>\n";
	newPage += "</table>\n";
	newPage += "</div>\n";
	newPage += "</div>\n";
	newPage += "</td>              \n";  
	newPage += "</tr>\n";

	// the folowing is the closing tag relevant to those in get ToolBar_HTML
	newPage += "</tbody>\n";
	newPage += "</table>\n";
	newPage += "<!-- End of table to add the header lines -->\n";
	newPage += "\n";
	newPage += "</td>              \n";
	newPage += "</tr>\n";
	newPage += "</tbody>\n";
	newPage += "</table>\n";

	newPage += "\n";
	newPage += "</body>\n";
	newPage += "</html>\n";
	newPage += "\n"; 

	return(newPage);
	document.close();
	if (typeof writeBack != 'undefined')writeBack();


}


function displayGlblFrm()
{
	var glblFrm = "";
	glblFrm += fieldst_HTML("this is developer");
	glblFrm += "      <form name=\"glblFrm\" method =\"get\" id=\"glblFrm\">\n";
	glblFrm += "<input type=\"hidden\" name=\"op\" value=\"4\">\n";
	glblFrm += "<input type=\"hidden\" name=\"pg\" value=\"1\">\n";
	glblFrm += "                            <div class=\"adminform\">\n";
	glblFrm +=                                    otherText["msg_selsupp"];
	glblFrm += "                                    <table>\n";
	glblFrm += "                                            <tr>\n";
	glblFrm +=
		"                                                    <td class=\"infotextheading\">\n";
	glblFrm += "                                                            "+otherText["supp"]+":\n";
	glblFrm += "                                                    </td>\n";
	glblFrm += "                                                    <td>\n";
	glblFrm += "                                                        <select id=\"suppCd\" name=\"suppCd\" class=\"smallselect\" onchange=\"submit();\"> \n";

	glblFrm += displayDropList(suppCd, cmpy_jslst,otherText["msg_selAsupp"]);

	glblFrm += "                                                    </td>\n";

	glblFrm += "                                            </tr>\n";

	// 2nd row to display the Equipment Type Drop list
	glblFrm += "                                            <tr>\n";
	glblFrm +=
		"                                                    <td class=\"infotextheading\">\n";
	glblFrm += "                                                            "+otherText["eqpCd"]+":\n";
	glblFrm += "                                                    </td>\n";
	glblFrm += "                                                    <td>\n";
	glblFrm += "                                                        <select id=\"eqpCd\" name=\"eqpCd\" class=\"smallselect\" onchange=\"submit();\"> \n";

	glblFrm += displayDropList(eqpCd, etyp_jsArr,otherText["msg_selAEqpCd"]);

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

function displayFindFrm()
{
   var findFrm = "";
  findFrm += fieldst_HTML(otherText["t_find_eqp"]);
  findFrm += "      <form name=\"findFrm\" id=\"findFrm\" onsubmit=\"return submitmyform(this);\">\n";
  findFrm += "<input type=\"hidden\" name=\"op\" value=\"-1\">\n";
  findFrm += "<input type=\"hidden\" name=\"pg\" value=\"-1\">\n";
  findFrm += "                            <div class=\"adminform\">\n";
  findFrm += "                                    <table>\n";
  findFrm += "                                            <tr>\n";
  findFrm += "                                               <td class=\"infotextheading\">\n";
  findFrm += "                                                  "+myColumns[0]+":\n";
  findFrm += "                                                    </td>\n";
  findFrm += "                                                    <td>\n";
  
  findFrm += "																                      <input type=\"text\" name=\"eqpNm\" id=\"eqpNm\" dataType=\"Require\" msg=\""+otherText["msg_valid_eqpNm"]+"\" value=\"\" \/> \n";
  
  findFrm += "                                                    </td>\n";
  findFrm += "									<td align=\"left\">\n";
	findFrm += "										<table>\n";
	findFrm += "											<tr>\n";
	findFrm += "												<td align=\"left\" width=\"50%\" class=\"infotext\">\n";
  findFrm += "													<input type=\"submit\" value=\""+commBtnText["Search"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	findFrm += "												</td>\n";
	findFrm += "											</tr>\n";
	findFrm += "										</table>\n";
	findFrm += "									</td>\n";
  findFrm += "                                            </tr>\n";
  findFrm += "                                    </table>\n";
  findFrm += "\n";
  findFrm += "                            </div>\n";
  findFrm += "                    </form>\n";
  findFrm += "            </td>\n";
  findFrm += "    </tr>\n";
  return findFrm;


}
function displayAddNewSubE()
{
	var addFrmhtml = "";
	addFrmhtml += fieldst_HTML(otherText["msg_addPreDefEqp_fSet"]);
	addFrmhtml += "                            <div class=\"adminform\">\n";
	addFrmhtml +="<table width=\"100%\">\n";
	addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_addPreDefEqp_frmComplt"]); 
	addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"equip_types.cgi\" onsubmit=\"return submitsubEq(this);\">\n";

	addFrmhtml +=          preqstr_field ();
	addFrmhtml +=          canBreak_field (" type=\"hidden\" ");
  addFrmhtml +=          sched_Hid_field (" type=\"hidden\" ");    
	addFrmhtml +=          eqpCd_field (" type=\"hidden\" ");
	addFrmhtml +="          <input type=\"hidden\" name=\"subEtyp\" id=\"subEtyp\" value=\"\">\n";
	addFrmhtml +="          <input type=\"hidden\" name=\"itemNu\" id=\"itemNu\" value=\"\">\n";
	addFrmhtml +="						<tr>\n";
	addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
	addFrmhtml +="										<table width=\"100%\">\n";
	addFrmhtml +="											<tr>								\n";
	addFrmhtml +="												<td width=\"50%\">\n";
	addFrmhtml +="													<table>\n";
	addFrmhtml +="														<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"190\" ",otherText["preDefEqp_Names"]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="															<td>\n";
	addFrmhtml +="                             <select id=\"eqpCdCmpts\" name=\"eqpCdCmpts\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_pls_selAEqpCd"]+"\"> \n";
	addFrmhtml +=displaySubEqpDropList("eqpCd", etyp_jslst,otherText["msg_selAEqpCd"]);
	addFrmhtml +="															</td>\n";
	addFrmhtml +="														</tr>\n";
	addFrmhtml +="													</table>\n";

	addFrmhtml +="									      </td>\n";
	addFrmhtml +="												<td width=\"50%\">\n";

	addFrmhtml +="                            &nbsp;";

	addFrmhtml +="									     </td>\n";

	addFrmhtml +="								    </tr>\n";

	addFrmhtml +="								    </table>\n";
	addFrmhtml +="                             <input type=\"hidden\" name=\"tkProds\" id=\"tkProds\" value=\"\"> \n";
	addFrmhtml +=frmButtRow_HTML(ml(t__Add), 1);

	addFrmhtml +="							   </td>\n";
	addFrmhtml +="							 </tr>\n";
	addFrmhtml +="							</table>\n";
	addFrmhtml += "                            <\/div>\n";
	addFrmhtml +=op_field (opValues["submitAddNewCmb"]);
	addFrmhtml += "                    </form>\n";                      
	addFrmhtml += fieldstFoot_HTML();
	return addFrmhtml;

}


function displayAddNewCmpts()
{
	var addFrmhtml = "";
	addFrmhtml += fieldst_HTML(otherText["msg_addEqpCmpts_fSet"]);
	addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"equip_types.cgi\" onsubmit=\"return submitmyform(this);\">\n";
	addFrmhtml += "                            <div class=\"adminform\">\n";
	addFrmhtml +="<table width=\"100%\">\n";
	addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_addEqpCmpts_frmComplt"]); 

	addFrmhtml +=          preqstr_field ();
	addFrmhtml +=          canBreak_field (" type=\"hidden\" ");  
	addFrmhtml +=          sched_Hid_field (" type=\"hidden\" ");  	
	addFrmhtml +=          eqpCd_field (" type=\"hidden\" ");      
	addFrmhtml +="						<tr>\n";
	addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
	addFrmhtml +="										<table width=\"100%\">\n";
	addFrmhtml +="											<tr>								\n";
	addFrmhtml +="												<td width=\"50%\">\n";
	addFrmhtml +="													<table>\n";
	addFrmhtml +="														<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"190\" ",myColumns[2]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="															<td>\n";
	addFrmhtml +="                             <input type=\"text\" name=\"cmpts\" id=\"cmpts\" dataType=\"PositiveInt\" msg=\""+otherText["msg_valid_cmptNum"]+"\" value=\"\" onChange=\"return addSafeFillTable();\" \/> \n";
	addFrmhtml +="															</td>\n";
	addFrmhtml +="														</tr>\n";
	addFrmhtml +="													</table>\n";

	addFrmhtml +="									      </td>\n";
	addFrmhtml +="												<td width=\"50%\">\n";

	addFrmhtml +="                                                                                                        <table>\n";
	addFrmhtml +="                                                                                                                <tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" ",otherText["uts"]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="                                                                                                                        <td>\n";
	addFrmhtml +="                             <select id=\"unit\" name=\"unit\" class=\"smallselect\" dataType=\"Require\"  msg=\""+otherText["msg_selUnit"]+"\" > \n";
	addFrmhtml +=displayDropList("unit", unit_jslst,otherText["msg_selUnit"]);
	addFrmhtml +="                                                                                                                        </td>\n";
	addFrmhtml +="                                                                                                                </tr>\n";
	addFrmhtml +="                                                                                                        </table>\n";

	addFrmhtml +="									     </td>\n";

	addFrmhtml +="								    </tr>\n";
	//2nd row




	addFrmhtml +="								    </table>\n";
	addFrmhtml +="										<div id=\"arms\">&nbsp;<\/div>								\n";

	//doesnt make any sense here

	addFrmhtml +="                             <input type=\"hidden\" name=\"tkProds\" id=\"tkProds\" value=\"\"> \n";
	addFrmhtml +=frmButtRow_HTML(ml(t__Add), 0);

	addFrmhtml +="							   </td>\n";
	addFrmhtml +="							 </tr>\n";
	//frmButtRow_HTML(ml(t__Add), 1);
	addFrmhtml +="							</table>\n";
	addFrmhtml += "  </div>\n";
	addFrmhtml +=op_field (opValues["submitAddNewPrf"]);
	addFrmhtml += "                    </form>\n";                      
	addFrmhtml += fieldstFoot_HTML();
	return addFrmhtml;

}


/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  FUNCTION [ displayCmptLimts] 
  [PURPOSE]  		-> 	Responsible for displaying the Compartment Limits
  ->  for a selected Equipment.
  [AUTHOR]  		-> Abdul Shakoor (DKI) Sept 7, 2005
  '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function displayCmptLimts(curColumnToSort, isShowAdd)
{
	var cmp_limits ="";
	cmp_limits +=backToBtn_HTML();

	if(isShowAdd) 
	{
		// if its breakable add predefined definations
		cmp_limits +=displayStatusMsg (op);  
		if(canBreak=="1")
		{
			cmp_limits +=displayAddNewSubE();
		}
		else if(( canBreak=="0") && (cmptLimits_jsArr.length<=1))
		{
			cmp_limits +=displayAddNewCmpts();
		}

	}

	if(canBreak=="1") 
	{
		cmptlimit_myColumns[0]=otherText["cmptlimit_SubEq"];
		cmptlimit_myColumns[1]=otherText["sub_itm_eqpNm"];
		cmptlimit_myColumns[2]=otherText["sub_itm_eqpCd"];
	}

	cmp_limits += "<tr> \n";
	cmp_limits += "<td align=\"left\">\n";
    
    //cmp_limits += fieldst_HTML(otherText["prfile"]);
	cmp_limits += "<div class=\"adminform\">\n";
	cmp_limits += "<table>\n";
	cmp_limits += "   <tr> \n";
	cmp_limits += "                                                    <td width=\"140\" class=\"infotextheading\">\n";
	cmp_limits += "                                                            "+otherText["eqpCd"]+":\n";
	cmp_limits += "                                                    </td>\n";
	cmp_limits += "                                                    <td align=\"left\" class=\"infotext\">\n";
	cmp_limits +=eqpCd;
	cmp_limits += "                                                    </td>\n";
	cmp_limits += "   </tr> \n";
	cmp_limits += "   <tr> \n";
	cmp_limits += "                                                    <td width=\"140\" class=\"infotextheading\">\n";
	cmp_limits += "                                                            "+otherText["eqpNm"]+":\n";
	cmp_limits += "                                                    </td>\n";
	cmp_limits += "                                                    <td align=\"left\" class=\"infotext\">\n";
	cmp_limits +=eqpNm;
	cmp_limits += "                                                    </td>\n";
	cmp_limits += "   </tr> \n";

	cmp_limits += "</table>\n";
	cmp_limits += "</div>\n";	
    cmp_limits += fieldstFoot_HTML();

	cmp_limits += "<tr> \n";
	//end of the td and tr for the list area
	cmp_limits += "<td>\n ";  
	if( ((cmptlimit_myColumns.length)> 0))
	{

		cmp_limits += table_begin("M", 1,"");
		cmp_limits += "<tbody> \n";
		cmp_limits += "<tr>";
		for(var i=0; i<cmptlimit_myColumns.length; i++)
		{
			cmp_limits += "<td>"+cmptlimit_myColumns[i]+"<\/td>";


		}
		cmp_limits += "<\/tr>";
	}

	for(i in cmptLimits_jsArr)
	{
		//alert(cmptLimits_jsArr.length);
		if(i>0)
		{
			cmp_limits += "<tr class=\"row1\">\n";
			var howmanyDone =0;
			for(var j=0; j<cmptlimit_myColumns.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					cmp_limits += "<td style=\"background-color:#EEEEEE\">" + cust_jstab[i][howmanyDone] + "<\/td>";
				} 
				else 
				{

					cmp_limits += "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						cmp_limits +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
						cmp_limits +="       <table border=\"0\">\n";
						cmp_limits +="	       <tr>\n";
						cmp_limits +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+cmptLimits_jsArr[i][howmanyDone]+"</span>\n";
						cmp_limits += eqpCd_field(" type=\"hidden\" ");
						cmp_limits +="          <input type=\"hidden\" name=\"cmptNum\" id=\"cmptNum\" value=\""+cmptLimits_jsArr[i][howmanyDone]+"\">\n";
						cmp_limits +=          preqstr_field ();
						cmp_limits +="          </td>\n";
						cmp_limits +="          <td width=\"50%\">\n";
						cmp_limits +="          &nbsp;\n";
						cmp_limits +="          </td>\n";
						cmp_limits +="	       </tr>\n";
						cmp_limits +="	      </table>\n";

					}
					else if((howmanyDone==2) && (canBreak=="1") )
					{
						cmp_limits +="       <table border=\"0\">\n";
						cmp_limits +="	       <tr>\n";
						cmp_limits +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+cmptLimits_jsArr[i][howmanyDone]+"</span>\n";
						cmp_limits +="          </td>\n";
						cmp_limits +=" <script>\n";
						cmp_limits +="var testpopup"+i+" = new PopupWindow();\n";
						cmp_limits +="testpopup"+i+".setSize(450,260);\n";
						cmp_limits +="testpopup"+i+".autoHide();\n";									
						cmp_limits +=" <\/script>\n";
						cmp_limits +="          <td width=\"50%\">\n";
						cmp_limits += "<input type=\"button\" value=\""+otherText["vwCmptLimits"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" onClick=\"showinPagePopup(testpopup"+i+", 'anchor"+i+"', 'equip_types_popup.cgi?eqpCd="+cmptLimits_jsArr[i][howmanyDone]+"', "+cmptLimits_jsArr[i][3]+");return false;\" NAME=\"anchor"+i+"\" ID=\"anchor"+i+"\"/>";
						cmp_limits +="          </td>\n";
						cmp_limits +="	       </tr>\n";
						cmp_limits +="	      </table>\n";
					}
					else
					{
						cmp_limits += cmptLimits_jsArr[i][howmanyDone];
					}  
					cmp_limits +="	      </form>\n";
					cmp_limits += "<\/td>\n";


				}
				howmanyDone++;	
			} // end of inner for loop


		}
		cmp_limits += "\n";
		cmp_limits += "<\/tr>";
	}
	cmp_limits += "<\/tbody>";
	cmp_limits += "<\/table>";
	cmp_limits += "<\/td>";	
	cmp_limits += "<\/tr>";     
	cmp_limits += "<\/td>\n ";
	cmp_limits += "</tr> \n";  
	return cmp_limits;
}


/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  FUNCTION [ displayCmptLimts] 
  [PURPOSE]  		-> 	Responsible for displaying the Compartment Limits
  ->  for a selected Equipment.
  [AUTHOR]  		-> Abdul Shakoor (DKI) Sept 7, 2005
  '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function displayCmptPrfile(curPrivilage,curColumnToSort)
{
	var cmp_prfileHTML ="";  
	cmp_prfileHTML +=displayGlblFrm();
	// if ther is a profile
	// then only display the delet Button
	if(cmptPrfil_jsArr.length>1 && (curPrivilage==8)) 
	{
		cmp_prfileHTML +=delPrfileToBtn_HTML(cmptPrfil_jsArr[1][3]);
	}
	else if (curPrivilage>=7) // in any other case
	{
		cmp_prfileHTML +=addNewPrfileBtn_HTML();
	}
	cmp_prfileHTML += "<tr> \n";
	cmp_prfileHTML += "<td align=\"left\">\n";
	cmp_prfileHTML += "<table>\n";
	if(cmptPrfil_jsArr.length>1)
	{
		cmp_prfileHTML += "   <tr> \n";
		cmp_prfileHTML += "                                                    <td width=\"140\" class=\"infotextheading\">\n";
		cmp_prfileHTML += "                                                            "+otherText["prfileCd"]+":\n";
		cmp_prfileHTML += "                                                    </td>\n";
		cmp_prfileHTML += "                                                    <td align=\"left\" class=\"infotext\">\n";
		cmp_prfileHTML +=cmptPrfil_jsArr[1][3];
		cmp_prfileHTML += "                                                    </td>\n";
		cmp_prfileHTML += "   </tr> \n";
	}

	cmp_prfileHTML += "</table>\n";
	cmp_prfileHTML += "</td>\n";	
	cmp_prfileHTML += "</tr> \n";
	cmp_prfileHTML += "<tr> \n";
	cmp_prfileHTML += "<td>\n ";  
	if( ((cmptprfile_myColumns.length)> 0))
	{
		cmp_prfileHTML += "<div id=\"printReady\">";
		cmp_prfileHTML += table_begin("M", 2,"");
		cmp_prfileHTML += "<tbody> \n";
		cmp_prfileHTML += "<tr>";
		for(var i=0; i<cmptprfile_myColumns.length; i++)
		{
			cmp_prfileHTML += "<td>"+cmptprfile_myColumns[i]+"<\/td>";


		}
		cmp_prfileHTML += "<\/tr>";
	}

	for(i in cmptPrfil_jsArr)
	{

		if(i>0)
		{
			cmp_prfileHTML += "<tr class=\"row1\">\n";
			var howmanyDone =0;
			for(var j=0; j<cmptprfile_myColumns.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					cmp_prfileHTML += "<td style=\"background-color:#EEEEEE\">" + cust_jstab[i][howmanyDone] + "<\/td>";
				} 
				else 
				{

					cmp_prfileHTML += "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						cmp_prfileHTML +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
						cmp_prfileHTML +="       <table border=\"0\">\n";
						cmp_prfileHTML +="	       <tr>\n";
						cmp_prfileHTML +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+cmptPrfil_jsArr[i][howmanyDone]+"</span>\n";
						cmp_prfileHTML += eqpCd_field(" type=\"hidden\" ");
						cmp_prfileHTML += suppCd_field(" type=\"hidden\" ");
						cmp_prfileHTML +="          <input type=\"hidden\" name=\"cmptNum\" id=\"cmptNum\" value=\""+cmptPrfil_jsArr[i][howmanyDone]+"\">\n";
						cmp_prfileHTML +="          <input type=\"hidden\" name=\"prfCd\" id=\"prfCd\" value=\""+cmptPrfil_jsArr[i][3]+"\">\n";
						cmp_prfileHTML +="          <input type=\"hidden\" name=\"prodCd\" id=\"prodCd\" value=\""+cmptPrfil_jsArr[i][1]+"\">\n";
						cmp_prfileHTML +=          preqstr_field ();
						cmp_prfileHTML +="          </td>\n";
						cmp_prfileHTML +="          <td width=\"50%\">\n";
						cmp_prfileHTML += cmpPrfile_op_list(priv, cmptPrfil_jsArr[i][howmanyDone],i );
						cmp_prfileHTML +="          </td>\n";
						cmp_prfileHTML +="	       </tr>\n";
						cmp_prfileHTML +="	      </table>\n";

					}

					else
					{
						cmp_prfileHTML += cmptPrfil_jsArr[i][howmanyDone];
					}  
					cmp_prfileHTML +="	      </form>\n";
					cmp_prfileHTML += "<\/td>\n";


				}
				howmanyDone++;	
			} // end of inner for loop


		}
		cmp_prfileHTML += "\n";
		cmp_prfileHTML += "<\/tr>";
	}
	cmp_prfileHTML += "<\/tbody>";
	cmp_prfileHTML += "<\/table>";
	cmp_prfileHTML += "<\/div>";
	cmp_prfileHTML += "<\/td>";	
	cmp_prfileHTML += "<\/tr>";     
	cmp_prfileHTML += "<\/td>\n ";
	cmp_prfileHTML += "</tr> \n";  
	return cmp_prfileHTML;
}


/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  FUNCTION [ displayCmptLimts] 
  [PURPOSE]  		-> 	Responsible for displaying the Compartment Limits
  ->  for a selected Equipment.
  [AUTHOR]  		-> Abdul Shakoor (DKI) Sept 7, 2005
  '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function displayCmptLimtsBrkDn(isShowAdd)
{
	var cmp_prfileHTML ="";


	// if ther is a profile
	// then only display the delet Button
	if(isShowAdd) 
	{
		cmp_prfileHTML +=displayAddNewSubE();
	}

	cmp_prfileHTML += "<tr> \n";
	cmp_prfileHTML += "<td align=\"left\">\n";
	cmp_prfileHTML += "<table>\n";
	if(cmptPrfil_jsArr.length>1)
	{
		cmp_prfileHTML += "   <tr> \n";
		cmp_prfileHTML += "                                                    <td width=\"140\" class=\"infotextheading\">\n";
		cmp_prfileHTML += "                                                            "+otherText["prfileCd"]+":\n";
		cmp_prfileHTML += "                                                    </td>\n";
		cmp_prfileHTML += "                                                    <td align=\"left\" class=\"infotext\">\n";
		cmp_prfileHTML +=cmptPrfil_jsArr[1][3];
		cmp_prfileHTML += "                                                    </td>\n";
		cmp_prfileHTML += "   </tr> \n";
	}

	cmp_prfileHTML += "</table>\n";
	cmp_prfileHTML += "</td>\n";	
	cmp_prfileHTML += "</tr> \n";
	cmp_prfileHTML += "<tr> \n";
	cmp_prfileHTML += "<td>\n ";  
	if( ((cmptprfile_myColumns.length)> 0))
	{
		cmp_prfileHTML += "<div id=\"printReady\">";
		cmp_prfileHTML += table_begin("M", 3,"");
		cmp_prfileHTML += "<tbody> \n";
		cmp_prfileHTML += "<tr>";
		for(var i=0; i<cmptprfile_myColumns.length; i++)
		{
			cmp_prfileHTML += "<td>"+cmptprfile_myColumns[i]+"<\/td>";


		}
		cmp_prfileHTML += "<\/tr>";
	}

	for(i in cmptPrfil_jsArr)
	{

		if(i>0)
		{
			cmp_prfileHTML += "<tr class=\"row1\">\n";
			var howmanyDone =0;
			for(var j=0; j<cmptprfile_myColumns.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					cmp_prfileHTML += "<td style=\"background-color:#EEEEEE\">" + cust_jstab[i][howmanyDone] + "<\/td>";
				} 
				else 
				{

					cmp_prfileHTML += "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						cmp_prfileHTML +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
						cmp_prfileHTML +="       <table border=\"0\">\n";
						cmp_prfileHTML +="	       <tr>\n";
						cmp_prfileHTML +="          <td width=\"50%\"> <span style=\"COLOR: #FF0000;\">"+cmptPrfil_jsArr[i][howmanyDone]+"</span>\n";
						cmp_prfileHTML += eqpCd_field(" type=\"hidden\" ");
						cmp_prfileHTML += suppCd_field(" type=\"hidden\" ");
						cmp_prfileHTML +="          <input type=\"hidden\" name=\"cmptNum\" id=\"cmptNum\" value=\""+cmptPrfil_jsArr[i][howmanyDone]+"\">\n";
						cmp_prfileHTML +="          <input type=\"hidden\" name=\"prfCd\" id=\"prfCd\" value=\""+cmptPrfil_jsArr[i][3]+"\">\n";
						cmp_prfileHTML +="          <input type=\"hidden\" name=\"prodCd\" id=\"prodCd\" value=\""+cmptPrfil_jsArr[i][1]+"\">\n";
						cmp_prfileHTML +=          preqstr_field ();
						cmp_prfileHTML +="          </td>\n";
						cmp_prfileHTML +="          <td width=\"50%\">\n";
						cmp_prfileHTML += cmpPrfile_op_list(priv, cmptPrfil_jsArr[i][howmanyDone],i );
						cmp_prfileHTML +="          </td>\n";
						cmp_prfileHTML +="	       </tr>\n";
						cmp_prfileHTML +="	      </table>\n";

					}

					else
					{
						cmp_prfileHTML += cmptPrfil_jsArr[i][howmanyDone];
					}  
					cmp_prfileHTML +="	      </form>\n";
					cmp_prfileHTML += "<\/td>\n";


				}
				howmanyDone++;	
			} // end of inner for loop


		}
		cmp_prfileHTML += "\n";
		cmp_prfileHTML += "<\/tr>";
	}
	cmp_prfileHTML += "<\/tbody>";
	cmp_prfileHTML += "<\/table>";
	cmp_prfileHTML += "<\/div>";
	cmp_prfileHTML += "<\/td>";	
	cmp_prfileHTML += "<\/tr>";     
	cmp_prfileHTML += "<\/td>\n ";
	cmp_prfileHTML += "</tr> \n";  
	return cmp_prfileHTML;
}


/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  FUNCTION [ displayAddNewEqpPrfile] 
  [PURPOSE]  		-> 	Responsible for displaying the Add new Meter Device Form.
  [AUTHOR]  		-> Abdul Shakoor (DKI) Sept 2, 2005
  '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function displayAddNewEqp()
{
	var addFrmhtml ="";
	addFrmhtml +=backToBtn_HTML();

	addFrmhtml += fieldst_HTML(otherText["msg_addNewEqp_fSet"]);
	addFrmhtml +="<div class=\"adminform\">\n";
	addFrmhtml +="<table width=\"100%\">\n";
	addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_addNewEqp_frmComplt"]); 
	addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"equip_types.cgi\" onsubmit=\"return checkEqptType(this);\">\n";

	addFrmhtml +=          preqstr_field ();  
	addFrmhtml +="						<tr>\n";
	addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
	addFrmhtml +="										<table width=\"100%\">\n";
	addFrmhtml +="											<tr>								\n";
	addFrmhtml +="												<td width=\"50%\">\n";
	addFrmhtml +="													<table>\n";
	addFrmhtml +="														<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",otherText["eqpNm"]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="															<td>\n";

	addFrmhtml +="                             <input type=\"text\" name=\"eqpNm\" id=\"eqpNm\" maxLength=\"20\" dataType=\"Require\" msg=\""+otherText["msg_valid_eqpNm"]+"\" value=\"\" \/> \n";
	addFrmhtml +="															</td>\n";
	addFrmhtml +="														</tr>\n";
	addFrmhtml +="													</table>\n";

	addFrmhtml +="									      </td>\n";
	addFrmhtml +="												<td width=\"50%\">\n";

	addFrmhtml +="												&nbsp;\n";


	addFrmhtml +="									   </td>\n";

	addFrmhtml +="								    </tr>\n";

	//Row 2

	addFrmhtml +="											<tr>								\n";
	addFrmhtml +="												<td width=\"50%\">\n";
	addFrmhtml +="													<table>\n";
	addFrmhtml +="														<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[3]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"&nbsp;\n");
	addFrmhtml +="															<td class=\"infotext\"> \n";
	addFrmhtml +=commText["Yes"]+"                             <input type=\"radio\" name=\"sched\" id=\"sched\" value=\"y\" checked> \n";
	addFrmhtml +=commText["No"]+"                             <input type=\"radio\" name=\"sched\" id=\"sched\" value=\"n\"> \n";
	addFrmhtml +="															</td>\n";
	addFrmhtml +="														</tr>\n";
	addFrmhtml +="													</table>\n";

	addFrmhtml +="									      </td>\n";
	addFrmhtml +="												<td width=\"50%\">\n";

	addFrmhtml +="													<table>\n";
	addFrmhtml +="														<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",otherText["isAComb"]);
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"&nbsp;\n");
	addFrmhtml +="															<td class=\"infotext\">\n";
	addFrmhtml +=commText["Yes"]+"                            <input type=\"radio\" name=\"canBreak\" id=\"canBreak\" value=\"1\" checked> \n";
	addFrmhtml +=commText["No"]+"                             <input type=\"radio\" name=\"canBreak\" id=\"canBreak\" value=\"0\"> \n";

	addFrmhtml +="															</td>\n";
	addFrmhtml +="														</tr>\n";
	addFrmhtml +="													</table>\n";    
	addFrmhtml +="									   </td>\n";

	addFrmhtml +="								    </tr>\n";



	//end of Row 2
	addFrmhtml +="								    </table>\n";  
	addFrmhtml +=frmButtRow_HTML(ml(t__Add), 1);

	addFrmhtml +="							   </td>\n";
	addFrmhtml +="							 </tr>\n";
	//frmButtRow_HTML(ml(t__Add), 1);
	addFrmhtml +="							</table>\n";
	addFrmhtml +="<\/div>\n";
	addFrmhtml +=op_field (opValues["submitAdd"]);
	addFrmhtml += "                    </form>\n";                      
	addFrmhtml += fieldstFoot_HTML();
	return addFrmhtml;
}


/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  FUNCTION [ displayAddNewEqpPrfile] 
  [PURPOSE]  		-> 	Responsible for displaying the Add new Meter Device Form.
  [AUTHOR]  		-> Abdul Shakoor (DKI) Sept 2, 2005
  '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function displayAddNewEqpPrfile(prfileCd, numOfCmpts)
{
	var addFrmhtml ="";
	addFrmhtml +=backToBtn_HTML();

	addFrmhtml += fieldst_HTML(otherText["msg_addNewEqpPrfile_fSet"]);
	addFrmhtml +="<div class=\"adminform\">\n";
	addFrmhtml +="<table width=\"100%\">\n";
	addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_addNewmtrdvc_frmComplt"]); 
	addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"equip_types.cgi\" onsubmit=\"return createProdStruct(this, 'addNew', 5);\">\n";

	addFrmhtml +=          preqstr_field ();
	addFrmhtml += suppCd_field(" type=\"hidden\" ");
	addFrmhtml +="						<tr>\n";
	addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
	addFrmhtml +="										<table width=\"100%\">\n";
	addFrmhtml +="											<tr>								\n";
	addFrmhtml +="												<td width=\"50%\">\n";
	addFrmhtml +="													<table>\n";
	addFrmhtml +="														<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", otherText["prfileCd"]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="															<td>\n";
	addFrmhtml +="                             <input type=\"text\" name=\"prfCd\" id=\"prfCd\" maxLength=\"7\" value=\""+prfileCd+"\" dataType=\"Require\" msg=\""+otherText["msg_valid_prfCd"]+"\"> \n";
	addFrmhtml +="															</td>\n";
	addFrmhtml +="														</tr>\n";
	addFrmhtml +="													</table>\n";

	addFrmhtml +="									      </td>\n";
	addFrmhtml +="												<td width=\"50%\">\n";

	addFrmhtml +="													<table>\n";
	addFrmhtml +="														<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[2]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="															<td>\n";
	addFrmhtml +="                             <input type=\"text\" name=\"cmpts\" id=\"cmpts\" dataType=\"Number\" value=\""+numOfCmpts+"\" readOnly=\"true\"> \n";
	addFrmhtml +="															</td>\n";
	addFrmhtml +="														</tr>\n";
	addFrmhtml +="													</table>\n";


	addFrmhtml +="									   </td>\n";

	addFrmhtml +="								    </tr>\n";

	//Row 2
	// for loop can print all the compartments
	for(var i=0; i<numOfCmpts; i++)
	{
		addFrmhtml +="											<tr>								\n";
		addFrmhtml +="												<td width=\"50%\">\n";
		addFrmhtml +="													<table>\n";
		addFrmhtml +="														<tr>\n";
		addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",otherText["cmpt_num"]+":");
		addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
				"&nbsp;\n");
		addFrmhtml +="															<td>\n";
		addFrmhtml +="                             <input type=\"text\" name=\"cmpt_num_"+i+"\" size=\"3\" id=\"cmpt_num_"+i+"\" value=\""+(i+1)+"\" maxLength=\"4\" readOnly=\"true\"> \n";
		addFrmhtml +="															</td>\n";
		addFrmhtml +="														</tr>\n";
		addFrmhtml +="													</table>\n";

		addFrmhtml +="									      </td>\n";
		addFrmhtml +="												<td width=\"50%\">\n";

		addFrmhtml +="													<table>\n";
		addFrmhtml +="														<tr>\n";
		addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",otherText["prod"]+":");
		addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
				"&nbsp;\n");
		addFrmhtml +="															<td>\n";
		addFrmhtml +="                             <select id=\"prod_"+i+"\" name=\"prod_"+i+"\" class=\"smallselect\"> \n";
		addFrmhtml +=displayDropList("-1", prod_jslst,otherText["msg_selAProd"]);

		addFrmhtml +="															</td>\n";
		addFrmhtml +="														</tr>\n";
		addFrmhtml +="													</table>\n";    
		addFrmhtml +="									   </td>\n";

		addFrmhtml +="								    </tr>\n";
	}


	//end of Row 2
	addFrmhtml +="								    </table>\n";
	addFrmhtml +="                             <input type=\"hidden\" name=\"tkProds\" id=\"tkProds\" value=\"\"> \n";
	addFrmhtml +=frmButtRow_HTML(commBtnText[ml(t__Add)], 1);

	addFrmhtml +="							   </td>\n";
	addFrmhtml +="							 </tr>\n";
	//frmButtRow_HTML(ml(t__Add), 1);
	addFrmhtml +="							</table>\n";
	addFrmhtml +="<\/div>\n";
	addFrmhtml +=op_field (opValues["submitAddNewPrf"]);
	addFrmhtml += "                    </form>\n";                      
	addFrmhtml += fieldstFoot_HTML();
	return addFrmhtml;
}


/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  FUNCTION [ displayAddNewEqpPrfile] 
  [PURPOSE]  		-> 	Responsible for displaying the Add new Meter Device Form.
  [AUTHOR]  		-> Abdul Shakoor (DKI) Sept 2, 2005
  '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function displayModEqpPrfile(prfileCd, cmptNum)
{
	var addFrmhtml ="";
	addFrmhtml +=backToBtn_HTML();

	addFrmhtml += fieldst_HTML(otherText["msg_modEqpPrfile_fSet"]);
	addFrmhtml +="<div class=\"adminform\">\n";
	addFrmhtml +="<table width=\"100%\">\n";
	addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_modEqpPrfile_frmComplt"]); 
	addFrmhtml += "      <form name=\"mod\" method =\"get\" id=\"mod\" action=\"equip_types.cgi\" onsubmit=\"return createProdStruct(this, 'mod', 1);\">\n";

	addFrmhtml +=          preqstr_field ();
	addFrmhtml += prfCd_field(" type=\"hidden\" ");
	addFrmhtml += suppCd_field(" type=\"hidden\" ");
	addFrmhtml +="						<tr>\n";
	addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
	addFrmhtml +="										<table width=\"100%\">\n";
	addFrmhtml +="											<tr>								\n";
	addFrmhtml +="												<td width=\"50%\">\n";
	addFrmhtml +="													<table>\n";
	addFrmhtml +="														<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ", otherText["prfileCd"]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="															<td>\n";
	addFrmhtml +="                             <input type=\"text\" name=\"prfCd\" id=\"prfCd\" maxLength=\"7\" value=\""+prfileCd+"\" dataType=\"Require\" msg=\""+otherText["msg_valid_prfCd"]+"\" readOnly=\"true\"> \n";
	addFrmhtml +="															</td>\n";
	addFrmhtml +="														</tr>\n";
	addFrmhtml +="													</table>\n";

	addFrmhtml +="									      </td>\n";
	addFrmhtml +="												<td width=\"50%\">\n";
	addFrmhtml +="												  &nbsp;\n";




	addFrmhtml +="									   </td>\n";

	addFrmhtml +="								    </tr>\n";

	//Row 2
	// for loop can print all the compartments
	for(var i=0; i<1; i++)
	{
		addFrmhtml +="											<tr>								\n";
		addFrmhtml +="												<td width=\"50%\">\n";
		addFrmhtml +="													<table>\n";
		addFrmhtml +="														<tr>\n";
		addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",otherText["cmpt_num"]+":");
		addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
				"<span class=\"mandatory\">*</span>\n");
		addFrmhtml +="															<td>\n";
		addFrmhtml +="                             <input type=\"text\" name=\"cmpt_num_"+i+"\" size=\"3\" id=\"cmpt_num_"+i+"\" value=\""+cmptNum+"\" maxLength=\"4\" readOnly=\"true\"> \n";
		addFrmhtml +="															</td>\n";
		addFrmhtml +="														</tr>\n";
		addFrmhtml +="													</table>\n";

		addFrmhtml +="									      </td>\n";
		addFrmhtml +="												<td width=\"50%\">\n";

		addFrmhtml +="													<table>\n";
		addFrmhtml +="														<tr>\n";
		addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",otherText["prod"]+":");
		addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
				"<span class=\"mandatory\">*</span>\n");
		addFrmhtml +="															<td>\n";
		addFrmhtml +="                             <select id=\"prod_"+i+"\" name=\"prod_"+i+"\" class=\"smallselect\" dataType=\"Require\" msg=\""+ otherText["msg_selAProd"]+"\"> \n";
		addFrmhtml +=displayDropList("-1", prod_jslst,otherText["msg_selAProd"]);

		addFrmhtml +="															</td>\n";
		addFrmhtml +="														</tr>\n";
		addFrmhtml +="													</table>\n";    
		addFrmhtml +="									   </td>\n";

		addFrmhtml +="								    </tr>\n";
	}


	//end of Row 2
	addFrmhtml +="								    </table>\n";
	addFrmhtml +="                             <input type=\"hidden\" name=\"tkProds\" id=\"tkProds\" value=\"\"> \n";
	addFrmhtml +=frmButtRow_HTML(commBtnText["Update"], 1);

	addFrmhtml +="							   </td>\n";
	addFrmhtml +="							 </tr>\n";
	//frmButtRow_HTML(ml(t__Add), 1);
	addFrmhtml +="							</table>\n";
	addFrmhtml +="<\/div>\n";
	addFrmhtml +=op_field (opValues["submitAddNewPrf"]);
	addFrmhtml += "                    </form>\n";                      
	addFrmhtml += fieldstFoot_HTML();
	return addFrmhtml;
}


/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  FUNCTION [ displayAddNewEqpPrfile] 
  [PURPOSE]  		-> 	Responsible for displaying the Add new Meter Device Form.
  [AUTHOR]  		-> Abdul Shakoor (DKI) Sept 2, 2005
  '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function displayModMtrDvcFrm()
{
	var addFrmhtml ="";
	addFrmhtml +=backToBtn_HTML();

	addFrmhtml += fieldst_HTML(otherText["msg_modmtrdvc_fSet"]);
	addFrmhtml +="<div class=\"adminform\">\n";
	addFrmhtml +="<table width=\"100%\">\n";
	addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_modmtrdvc_frmComplt"]); 
	addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"equip_types.cgi\" onsubmit=\"return submitmyform(this)\">\n";

	addFrmhtml +=          preqstr_field ();
	addFrmhtml +="						<tr>\n";
	addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
	addFrmhtml +="										<table width=\"100%\">\n";
	addFrmhtml +="											<tr>								\n";
	addFrmhtml +="												<td width=\"50%\">\n";
	addFrmhtml +="													<table>\n";
	addFrmhtml +="														<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[0]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"&nbsp;\n");
	addFrmhtml +="															<td class=\"infotext\">\n";
	addFrmhtml +=															  type+"\n";
	addFrmhtml +=															  type_field("type=\"hidden\"");+"\n";
	addFrmhtml +="															</td>\n";
	addFrmhtml +="														</tr>\n";
	addFrmhtml +="													</table>\n";

	addFrmhtml +="									      </td>\n";
	addFrmhtml +="												<td width=\"50%\">\n";

	addFrmhtml +="													<table>\n";
	addFrmhtml +="														<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[1]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="															<td>\n";
	addFrmhtml +="                             <input type=\"text\" name=\"address\" id=\"address\" value=\""+address+"\" maxLength=\"1\" dataType=\"Number\" msg=\""+otherText["msg_valid_address"]+"\"> \n";
	addFrmhtml +="															</td>\n";
	addFrmhtml +="														</tr>\n";
	addFrmhtml +="													</table>\n";


	addFrmhtml +="									   </td>\n";

	addFrmhtml +="								    </tr>\n";

	//Row 2
	addFrmhtml +="											<tr>								\n";
	addFrmhtml +="												<td width=\"50%\">\n";
	addFrmhtml +="													<table>\n";
	addFrmhtml +="														<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[2]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="															<td>\n";
	addFrmhtml +="                             <input type=\"text\" name=\"mtd\" id=\"mtd\" maxLength=\"4\" dataType=\"Number\" value=\""+mtd+"\" msg=\""+otherText["msg_valid_mtd"]+"\"> \n";
	addFrmhtml +="															</td>\n";
	addFrmhtml +="														</tr>\n";
	addFrmhtml +="													</table>\n";

	addFrmhtml +="									      </td>\n";
	addFrmhtml +="												<td width=\"50%\">\n";

	addFrmhtml +="													<table>\n";
	addFrmhtml +="														<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[3]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="															<td>\n";
	addFrmhtml +="                             <select id=\"src\" name=\"src\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selAdvcTp"]+"\" onchange=\"updateSrcTypDisable(this);\" > \n";
	addFrmhtml +=displayDropList(src, pmv_typ_jsArr,otherText["msg_selASrc"]);

	addFrmhtml +="															</td>\n";
	addFrmhtml +="														</tr>\n";
	addFrmhtml +="													</table>\n";


	addFrmhtml +="									   </td>\n";

	addFrmhtml +="								    </tr>\n";

	//end of Row 2

	//Begin Row 3 for the form
	addFrmhtml +="											<tr>								\n";
	addFrmhtml +="												<td width=\"50%\">\n";
	addFrmhtml +="													<table>\n";
	addFrmhtml +="														<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[4]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="															<td>\n";

	addFrmhtml +=getsrcTypHTML(src)+"\n";

	addFrmhtml +="															</td>\n";
	addFrmhtml +="														</tr>\n";
	addFrmhtml +="													</table>\n";

	addFrmhtml +="									      </td>\n";
	addFrmhtml +="												<td width=\"50%\">\n";

	addFrmhtml +="													<table>\n";
	addFrmhtml +="														<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[5]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="															<td>\n";
	addFrmhtml +="                             <select id=\"dst\" name=\"dst\" class=\"smallselect\" dataType=\"Require\" msg=\""+otherText["msg_selARcTp"]+"\" onchange=\"updateRcvTypDisable(this);\" > \n";
	addFrmhtml +=displayDropList(dst, pmv_typ_jsArr,otherText["msg_selARcTp"]);

	addFrmhtml +="															</td>\n";
	addFrmhtml +="														</tr>\n";
	addFrmhtml +="													</table>\n";


	addFrmhtml +="									   </td>\n";

	addFrmhtml +="								    </tr>\n";
	//End row 3
	//Begin Row 4 for the form
	addFrmhtml +="											<tr>								\n";
	addFrmhtml +="												<td width=\"50%\">\n";
	addFrmhtml +="													<table>\n";
	addFrmhtml +="														<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[6]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="															<td>\n";
	addFrmhtml +=getdstTypTypHTML(dstTyp)+"\n";
	addFrmhtml +="															</td>\n";
	addFrmhtml +="														</tr>\n";
	addFrmhtml +="													</table>\n";

	addFrmhtml +="									      </td>\n";
	addFrmhtml +="												<td width=\"50%\">\n";

	addFrmhtml +="													<table>\n";
	addFrmhtml +="														<tr>\n";
	addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",myColumns[9]+":");
	addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
			"<span class=\"mandatory\">*</span>\n");
	addFrmhtml +="															<td>\n";
	addFrmhtml +="                             <input type=\"text\" name=\"poll\" id=\"poll\" value=\""+poll+"\" maxLength=\"4\" dataType=\"Number\" min=\"10\" max=\"9999\"  msg=\""+otherText["msg_valid_poll"]+"\"> \n";


	addFrmhtml +="															</td>\n";
	addFrmhtml +="														</tr>\n";
	addFrmhtml +="													</table>\n";


	addFrmhtml +="									   </td>\n";

	addFrmhtml +="								    </tr>\n";
	//End row 4
	addFrmhtml +="								    </table>\n";
	addFrmhtml +=frmButtRow_HTML(commBtnText[ml(t__Add)], 1);

	addFrmhtml +="							   </td>\n";
	addFrmhtml +="							 </tr>\n";
	//frmButtRow_HTML(ml(t__Add), 1);
	//frmButtRow_HTML("Add", 1);
	addFrmhtml +="							</table>\n";
	addFrmhtml +="<\/div>\n";
	addFrmhtml +=op_field (opValues["submitModify"]);
	addFrmhtml += "                    </form>\n";                      
	addFrmhtml += fieldstFoot_HTML();
	return addFrmhtml;
}

/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  FUNCTION [assArray_keys] 
  [PURPOSE]  		-> 	Return Keys for the Hash table (Associative Array)  array  .


  [Parameter]  	-> inputArr Input array requires the keys for
  [Return]  	-> keys an array contain keys for the input array

  [AUTHOR]  		-> Abdul Shakoor (DKI) Sept 2, 2005
  '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
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
/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  FUNCTION [op_field] 
  [PURPOSE]  		-> 	Generat HTML  for Hidden Field with the
  input op value.


  [Parameter]  	-> attr input op value
  [Return]  	  -> fieldHTML array contain keys for the input array

  [AUTHOR]  		-> Abdul Shakoor (DKI) Sept 2, 2005
  '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
function op_field (attr)
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"op\" id=\"op\" value=\""+attr+"\" type=\"hidden\">\n";
	return fieldHTML;
}

function suppCd_field (attr)
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"suppCd\" id=\"suppCd\" value=\""+suppCd+"\" "+attr+" \/>\n";
	return fieldHTML;
}

function prfCd_field (attr)
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"prfCd\" id=\"prfCd\" value=\""+prfCd+"\" "+attr+" \/>\n";
	return fieldHTML;
}

function canBreak_field (attr)
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"canBreak\" id=\"canBreak\" value=\""+canBreak+"\" "+attr+" \/>\n";
	return fieldHTML;
}

function sched_Hid_field (attr)
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"sched\" id=\"sched\" value=\""+sched+"\" "+attr+" \/>\n";
	return fieldHTML;
}

function preqstr_field ()
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"preqstr\" id=\"preqstr\" value=\"\" type=\"hidden\">\n";
	return fieldHTML;
}

function eqpCd_field(attr)
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"eqpCd\" id=\"eqpCd\" value=\""+eqpCd+"\" "+attr+" >\n";
	return fieldHTML;
}

function cmptNum_field(attr)
{
	var fieldHTML ="";
	fieldHTML +="<input name=\"cmptNum\" id=\"cmptNum\" value=\""+cmptNum+"\" "+attr+" >\n";
	return fieldHTML;
}

function backToBtn_HTML ()
{
	var btn_HTML = "";
	btn_HTML +="         <tr> \n";
	btn_HTML +="             <td align=\"center\">\n ";
	btn_HTML +="                                 <div class=\"button\">\n";
	btn_HTML += btnLocation_HTML("justChaneMyLocation('equip_types.cgi'); ", otherText["btn_bakto_eqpTp"]);

	btn_HTML +="                                 </div><br>\n";
	btn_HTML +="             <td>\n ";
	btn_HTML +="         </tr> \n";
	return btn_HTML;
}

function delPrfileToBtn_HTML (profilId)
{
	var btn_HTML = "";
	btn_HTML += "      <form name=\"delFrm\" method =\"get\" id=\"delFrm\" onsubmit=\"return submitmyform(this)\">\n";
	btn_HTML +="       <input type=\"hidden\" name=\"op\" id=\"op\" value=\""+opValues["enterDelPrfile"]+"\" >\n";
	btn_HTML +="       <input type=\"hidden\" name=\"profId\" id=\"profId\" value=\""+profilId+"\" >\n";
	btn_HTML +="       <input type=\"hidden\"  name=\"eqpCd\" id=\"eqpCd\" value=\""+eqpCd+"\" >\n";
	btn_HTML +="       <input type=\"hidden\"  name=\"suppCd\" id=\"suppCd\" value=\""+suppCd+"\" >\n";
	btn_HTML +=frmProfButtRow_HTML("Delete Profile", 1);  
	btn_HTML +="       </form>\n"; 
	return btn_HTML;
}

function addNewBtn_HTML ()
{
	var btn_HTML = "";

	btn_HTML +="         <tr> \n";
	btn_HTML +="             <td align=\"center\">\n ";
	btn_HTML +="                                 <div class=\"button\">\n";
	if(priv>=7)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('equip_types.cgi?op="+opValues["enterAdd"]+"'); ", otherText["btn_addNew_eqpTp"]);
	}
	
	if((eqpCd!=-1 && (rowsTotal==0))|| (eqpNm!=""&&eqpNm!="-1" && op==-1 ) )
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('equip_types.cgi'); ", otherText["t__BTN_VIEW_ALL"]);
	}
	btn_HTML +="                                 </div><br>\n";
	btn_HTML +="             <td>\n ";
	btn_HTML +="         </tr> \n";

	return btn_HTML;
}

function addNewPrfileBtn_HTML ()
{
	var btn_HTML = "";
	btn_HTML += "      <form name=\"addNewFrm\" method =\"get\" id=\"addNewFrm\" onsubmit=\"return submitmyform(this)\">\n";
	btn_HTML +="       <input type=\"hidden\" name=\"op\" id=\"op\" value=\""+opValues["enterAddNewPrf"]+"\" >\n";
	btn_HTML +="       <input type=\"hidden\"  name=\"eqpCd\" id=\"eqpCd\" value=\""+eqpCd+"\" >\n";
	btn_HTML +="       <input type=\"hidden\"  name=\"suppCd\" id=\"suppCd\" value=\""+suppCd+"\" >\n";
	btn_HTML +=frmButtRow_HTML("Add New Profile", 0);  
	btn_HTML +="       </form>\n"; 
	return btn_HTML;
}

function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;
	if (op <= 1)
	{
		pageHeading +=otherText["pgHead_eqpTp"];
		return pageHeading;
	} 
	else if(op == opValues["enterModify"])
	{
		pageHeading += otherText["pgHead_ModeqpTp"];
	}
	else if(op == opValues["enterAdd"])
	{
		pageHeading += otherText["pgHead_AddeqpTp"];
	}
	else
	{
		pageHeading += otherText["pgHead_eqpDetails"];
	}
	return pageHeading;   
}

function updatePageTitle(op,pgTit)
{

	var pageTitle = pgTit;
	if (op <= 1)
	{
		pageTitle +=otherText["pgTitle_eqpTp"];

	}
	if (op == opValues["enterModify"])
	{
		pageTitle +=otherText["pgTitle_ModeqpTp"];

	}
	if (op =opValues["cmpt_limts"])
	{
		pageTitle +=otherText["pgTitle_ModeqpTp"];

	}
	if(op ==opValues["enterAdd"])
	{
		pageTitle +=otherText["pgTitle_AddeqpTp"];
	}
	else
	{
		pageTitle +=otherText["pgTitle_eqpTp"];
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
	op_list +="<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+frmNum+"');\">          ";
	switch (priv)
	{
		case 8:
			op_list +="<option value=\""+opValues["submitDelete"]+"\">"+ml(t__DELETE)+"</option>";

		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */


		case 6:    /* Modify not required for This page  */

		case 5:			/* Find Has not been implemented yet*/
			op_list +="<option value=\""+opValues["cmpt_limts"]+"\">"+otherText["cmpt_limits"]+"</option>";
			//profile not implemented for the China Project
			//op_list +="<option value=\""+opValues["prfile"]+"\">"+otherText["prfile"]+"</option>";
			break;
	}

	op_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
	op_list +="</select>                                        ";
	return op_list ;
}

/* define function cmpLimits_op_list() */
function cmpLimits_op_list(priv, frmNum)
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


		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */


		case 6:    /* Modify not required for The Tank Grouping Page  */
			op_list +="<option value=\""+opValues["cmpt_brkdn"]+"\">"+otherText["brkdn"]+"</option>";
			break;
	}

	op_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
	op_list +="</select>                                        ";
	return op_list ;
}
/* end function op_list() */

/* define function cmpLimits_op_list() */
function cmpPrfile_op_list(priv, frmNum)
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


		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */


		case 6:    /* Modify not required for The Tank Grouping Page  */
			op_list +="<option value=\""+opValues["enterModPrf"]+"\">"+commText["Modify"]+"</option>";
			break;
	}

	op_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
	op_list +="</select>                                        ";
	return op_list ;
}
/* end function op_list() */

/* this is the function to
 * display the form submit
 * form
 */
function frmProfButtRow_HTML(value, isPrint)
{
	var buttnHTML ="";
	buttnHTML +="								<tr>\n";
	buttnHTML +="									<td class=\"infotext\" align=\"center\" width=\"100%\">\n";
	buttnHTML +="													<input type=\"submit\" value=\""+value+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
	if(isPrint==1)
	{
		buttnHTML +="									           &nbsp;\n";
	}

	buttnHTML +="									</td>\n";
	buttnHTML +="								</tr>\n";

	return buttnHTML;

}/* end frmButtRow_HTML */
/* end function op_list() */

/* this is the function to
 * display the form submit
 * form
 */
function createProdStruct(frmObj, frmNam, totlNumOfCmpts)
{
	var prodSt ="";
	var anySelected =false;
	for(var i=0; i<totlNumOfCmpts; i++)
	{
		var myObj = getElemRefs("prod_"+i)//drop down list object
			var myselectedvalue = myObj.options[myObj.selectedIndex].value;
		//alert(myselectedvalue);
		if(myselectedvalue!="" && (myselectedvalue!="0") && myselectedvalue!="-1") 
		{
			if(i>0)      
				prodSt +=", ";
			prodSt +=myselectedvalue; 
			anySelected =true;   

		}
		else
		{
			if(i>0)
			{
				prodSt +=", ";
			}
			else
			{
				prodSt +=" ";
			}      

		}
	}
	//alert(prodSt);
	if(!anySelected)
	{
		alert(otherText["msg_noCmptAssProd"]);
		return false;
	}
	return true;


}/* end createProdStruct */

/* this is displaySubEqpDropList function to
 * display the Equipment Types submit
 * values are displayed in the following format
 *   <option value="eqpCd_numOfCmpts"> </option>
 *   then submitsubEq function extracts the value of 
 *   the equipement code and number of compartments. 
 * form 
 */
function displaySubEqpDropList(selectedvalue, list,defMsg)
{

	var massList = "";
	var matchFound=0;
	for (i=1; i<list.length; i++){
		massList += "<option value=\""+list[i][0]+"_"+list[i][2]+"\"";
		if(list[i][0]==selectedvalue)
		{
			matchFound=1;
			massList += "selected";
		}
		massList +=">"+list[i][0]+" -- \t \t -- "+list[i][1]+" -- \t \t -- "+list[i][2]+"</option>\n";

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

function submitsubEq(myformObj)
{
	//alert("I have been called"+document.addNew.h_TKRQ_DUE.value);
	if(submitmyform(myformObj) )
	{
		var eqpCodeSel = document.addNew.eqpCdCmpts.options[document.addNew.eqpCdCmpts.selectedIndex].value;
		var leadunderSc = eqpCodeSel.indexOf("_"); 
		var eqpSelCd = eqpCodeSel.substring(0, leadunderSc);
		var eqpSelCmpts = eqpCodeSel.substring((leadunderSc+1), eqpCodeSel.length);    
		document.addNew.subEtyp.value = eqpSelCd;
		document.addNew.itemNu.value = eqpSelCmpts;
		return true;

	}
	return false;
}

function showinPagePopup(whichObject, whichPopup, whichFile, cmptNums)
{
	if(cmptNums <=0 )
	{
		alert(otherText["msg_no_cmptsFound"]);
		return false;
	}
	var myPopUpObject;
	myPopUpObject = whichObject;
	myPopUpObject.setUrl(whichFile);
	myPopUpObject.showPopup(whichPopup);
}

function sched_field(currVal)
{
  
	var radioHTML ="";
	var isYChecked ="";
	var isNChecked ="";
	if (currVal =="Y"|| currVal =="y")    	    
	{
	  
		isYChecked ="CHECKED";
		isNChecked ="";
	}
	else
	{
		isYChecked ="";
		isNChecked ="CHECKED";
	}

  //alert("Now outside The Value in the radio section received "+isYChecked); 
	radioHTML +=commText["Yes"]+" <input type=\"radio\" name=\"sched\" id=\"sched\" value=\"Y\" "+isYChecked+" onClick=\"submit()\"> \n";
	radioHTML +=commText["No"]+"  <input type=\"radio\" name=\"sched\" id=\"sched\" value=\"N\" "+isNChecked+" onClick=\"submit()\"> \n";
	return radioHTML;
}  

function addSafeFillTable()
{

	var rows = 0;
	var cols = 2; /* or whatever */
	//alert("I am in addSafeFillTable");
	if(isInteger_eq_types(getElemRefs('cmpts'))==false)
	{
		alert(otherText["msg_valid_cmptNum"]);
		//document.getElementById('arms').innerHTML = "";
		//alert("About to return my result addSafeFillTable");
		return false;
	}


	rows = parseInt(document.getElementById('cmpts').value);	

	if (isInteger_eq_types((getElemRefs('cmpts')))==false || isNaN(getElemRefs('cmpts').value) || getElemRefs('cmpts').value == "" || rows == 0) /* check only a number has been entered * Fix the Bug Id 1534*/
	{
		alert('Please enter a valid number!');
		document.getElementById('arms').innerHTML = "";
		return false;
	}
	else if (rows >10 ) /* check only 10 are possible */
	{
		alert('Sorry! Maximum number of compartments is 10');
		document.getElementById('arms').innerHTML = "";
		return false;
	}
	else if(rows>0)
	{
		var col = "";

		for (var i=0; i<rows; i++)
		{
			//alert("here is"+rows);

			col +="<tr>								\n";
			col +="<td width=\"50%\">\n";
			col += '<table>';
			col +='<tr>\n'		;
			col +=textTd_HTML(" class=\"infotextheading\" width=\"190\" ",cmptprfile_myColumns[0]+" "+(i+1)+" "+cmptlimit_myColumns[1]+":");
			col +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
					"<span class=\"mandatory\">*</span>\n");
			col +="	<td>\n";
			col +=" <input type=\"hidden\" name=\"cmpt"+i+"\" id=\"cmpt"+i+"\" value=\""+i+"\" \/> \n";

			//col +=" <input type=\"text\" name=\"cmptFill"+i+"\" id=\"cmptFill"+i+"\" dataType=\"PositiveInt\" msg=\""+otherText["msg_valid_safeFill"]+" "+cmptprfile_myColumns[0]+" "+(i+1)+"\" value=\"\" \/> \n";

			col +=" <input type=\"text\" name=\"cmptFill"+i+"\" id=\"cmptFill"+i+"\" onChange=\"isInteger_eq_types(this);\" onBlur=\"isInteger_eq_types(this);\" dataType=\"PositiveInt\"  msg=\""+otherText["msg_valid_safeFill"]+" "+cmptprfile_myColumns[0]+" "+(i+1)+"\" maxLength=\"8\" value=\"\" \/> \n";
			col +="</td>\n";
			col +="</tr>\n";
			col +="</table>\n";
			col +="</td>\n";

			col +="<td width=\"50%\">\n";
			col += '&nbsp;';
			col +="</td>\n";

			col +="</tr>\n";			

		}
		//alert(col);
		document.getElementById('arms').innerHTML = col;

	}
	return true;
}
function nextPage_long(totalPages, curPg, curPgName, curPgVarName)
{
   	//alert("totalPages in start"+totalPages);
     // At this stage Only Know Number of Pages
  	// so get the number of items
  	var num_items = (totalPages*items_per_page);
  
  	// A Block Of Pages So User Can Jump Between the Pages
  	// on the Page it should look like this
  	//  [ 31-40  41-50  51-60]
  	var block_size = 10;
  
  	//  Current Page Number as passed by the nextPage function call
  	var page_number = curPg;
  
  	// do some mathemetical stuff
  	// in order to get the current page number and
  	// page items right
  	var num_pages = Math.max(1, Math.ceil(num_items/items_per_page));
	  var page_number = Math.min(page_number, num_pages);
	  var num_blocks = Math.ceil(num_pages/block_size);
	  var block_number = Math.floor(((page_number-1)/block_size));
	   //alert("num_pages in after Math.max"+num_pages);
	   // start putting HTML string in the 
  	// nextPgHTML variable
	  var nextPgHTML = "";
	
	//Only want to display the Form IF there are more than 1 pages
	// Bug Zilla BugId 1490 an enhancement demanded by Sao
	
  if(num_pages>1)
  {
  	nextPgHTML += "</td>\n ";
  	nextPgHTML += "</tr> \n";
  	//Adding a new form So Jump to the Page will be easier
  	//nextPgHTML += "<tr> \n";
  	//nextPgHTML += "<td align=\"center\">\n ";
  	nextPgHTML += "<form name=\"gotoPage\" method =\"get\" id=\"gotoPage\" action=\""+curPgName+"\" onsubmit=\"return submitmyform(this)\">\n";
  	//nextPgHTML +="<table width=\"100%\">\n";
    //nextPgHTML +=infotextRow_HTML(" width=\"100%\ align=\"center\" ","Total Pages :"+num_pages); 
    nextPgHTML +="<tr>\n";
    nextPgHTML +=" <td align=\"center\" class=\"infotext\" width=\"100%\">\n";
    nextPgHTML +="<span style=\"font-weight: bold;\">"+otherText["msg_tot_pages"]+" :</span><span style=\"font-weight: bold;COLOR: #FF0000;\">"+num_pages+"</span>\n"; 
    nextPgHTML +="	  &nbsp;\n";
    nextPgHTML +=" <input type=\"text\" name=\"pg\"  id=\"pg\" maxLength=\"6\" style=\"FONT-SIZE:1.00em;\" size=\"6\" dataType=\"RangeValue\" min=\"1\" max=\""+num_pages+"\" msg=\""+otherText["msg_valid_pgNumber"]+"\"> \n";
    nextPgHTML +="	  &nbsp;\n";
    //All the Hidden Variables I need to send to the next Page.
    
  	nextPgHTML += "          		<input type=\"hidden\" name=\"op\" value="+op+">\n";
  	nextPgHTML += "          		<input type=\"hidden\" name=\"eqpNm\" value="+eqpNm+">\n";
  	//
    // End of all the hidden variables
    nextPgHTML +="	<input type=\"submit\" value=\""+commBtnText["gotopg"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
    nextPgHTML +="	  &nbsp;\n";
    nextPgHTML +="		<input type=\"reset\" value=\""+commBtnText["Reset"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
  
    nextPgHTML +="			</td>\n";
    nextPgHTML +="		</tr>\n";
    //nextPgHTML +="</table>\n";
    nextPgHTML += "</form>\n";
  }
	//End of the Row where the Jump to the page form goes
	
	nextPgHTML += "<tr> \n";
	nextPgHTML += "<td align=\"center\" class=\"nextPageLink\">\n ";
	
	// if the page number is not 1 that means user is not on page 
  	// display the previous page link and a link to the
  	// first page as well on the page looks like this <<  <
	if (!(page_number == 1)) 
  	{
    	//$html_output .= "<a href=\"" . $url . "?page_number=1" . $query_string . "\"><b>&lt;&lt;</b></a>";
    	nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) + "&op="+op+"&eqpNm="+eqpNm+"'); ", "&lt;&lt;");
		foobar = page_number - 1;
		
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		 nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&op="+op+"&eqpNm="+eqpNm+"'); ", "<b>&lt;<\/b>");
		
	} else 
  	{
		nextPgHTML += "<b>&lt;&lt;</b>&nbsp;&nbsp;<b>&lt;</b>";
	} 
  
  	// if number of block are more than 1
  	// that means there more than 20 or 30 page
  	// for easy pagination can make the blocks of pages  
 	 // display the previous page link and a link to the
  	//   on the page looks like this [ 31-40  41-50  51-60]
  	// Abdul Dont need to print the Blocks
  	// Sao wanted a better way of jumping between the pages.
  	//16/05/2006
  	/* No need of the Blocks
  	if (block_number > 0) 
  	{
		nextPgHTML += "&nbsp;&nbsp;<b>[</b>";
		for (var i=0; i<(block_number); i++) 
    	{
			var foobar1 = i*block_size + 1;	// page number to be linked
			var foobar2 = (i+1)*block_size;
			//$html_output .= "&nbsp;<a href=\"" . $url . "?page_number=" . $foobar1 . $query_string . "\">" . $foobar1 . "-" . $foobar2 . "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&op="+op+"&eqpNm="+eqpNm+"'); ", foobar1 + "-" + foobar2);
		}
		nextPgHTML += "<b>]</b>";
	}No need of the Blocks*/

  	// Time to create the links to the 10 pages
  	// link to the pages look like this
 	 // <<  <  1 2  3  4  5  6  7  8  9  10 
  	// var block_number = (((page_number-1)/block_size)); 
  	//alert("block_number" +block_number);
  	foobar1 = block_number*block_size + 1;
	foobar2 = Math.min((block_number+1)*block_size, num_pages);
	foobar2++;
	//alert(foobar1);
	//alert(foobar2);
	for (var i=foobar1; i<page_number; i++) 
  	{
    //alert("I am in for loop "+i);		
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&op="+op+"&eqpNm="+eqpNm+"'); ", i);
	}
	
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	
	for (var i=page_number+1; i<foobar2; i++) 
  	{
    	//alert("I am in for for foobar2 loop "+i);	
    	nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&op="+op+"&eqpNm="+eqpNm+"'); ", i);
	}
	
	// if number of block are more than 1
  	// that means there more than 20 or 30 page
  	// for easy pagination can make the blocks of pages  
  	// display the previous page link and a link to the
  	//   on the page looks like this [ 31-40  41-50  51-60]
    // Sao wanted a better way of jumping between the pages.
  	//16/05/2006
  	/* No need of the Blocks	
	if (block_number+1 < num_blocks) 
  	{
		nextPgHTML += "&nbsp;&nbsp;<b>[</b>";
		for (var i=block_number+1; i<num_blocks; i++) 
    	{
      
			foobar1 = i*block_size + 1;	// page number to be linked
			foobar2 = Math.min((i+1)*block_size, num_pages);
			var tempTxt = foobar1;
			
			if (foobar2 > foobar1) {
				tempTxt += "-" + foobar2;
			}
			//$html_output .= "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&op="+op+"&eqpNm="+eqpNm+"'); ", tempTxt);
		}
		nextPgHTML += "<b>]</b>";
	}No need of the Blocks*/
 	 // if the page number is not equal to total num of pages
 	 // that means we can dispay the link to the next page
  	// and the last pge
  	// link looks like this > >>
	if (!(page_number == num_pages)) 
  	{
		foobar = page_number + 1;
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&op="+op+"&eqpNm="+eqpNm+"'); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) +"&op="+op+"&eqpNm="+eqpNm+"'); ", "<b>&gt;&gt;<\/b>");
	} else {
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}
  
  
	

	return nextPgHTML;
}



