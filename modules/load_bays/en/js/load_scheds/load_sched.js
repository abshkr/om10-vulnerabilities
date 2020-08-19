/****************************************
 *
 * $Id: load_sched.js,v 1.89 2011/06/17 06:52:54 abs Exp $
 *
##########**********##########**********##########**********##########**********##########**********##########**********/
/* Language component */
var mints_to_expire= parseInt(parseFloat(hrs_to_expire)*60);
var t__Add = ["Add","新增"];
var t__Depot = [" Depot","                                          油库"];
var t__Print = ["Print","打印"];
var t__Select_Date = ["Select Date","选择日期"];
var t__View = ["View","查看"];

var t__Trip_No = ["Trip No","提单号"];
var t__Trip_Expiry = ["Trip Expiry Date Time","Trip 有效期"];
var t__Personnel = [" Personnel","人员"];
var t__employer =["Employer","雇主"];
var t__Carrier = ["Carrier","承运商"];
var t__Tanker = ["Tanker","油槽车"];
var t__Date = ["Date","日期"];
var t__Shift = ["Shift","班次"];
var t__Schedule_Status = ["Schedule Status","调度状态"];
var t__Trip_Status = ["Trip Status <span style=\"color:red;\">(New)</span>","提单状态"];
var t__Destination = ["Destination","目的"];
var t__Depot = ["Depot","油库"];
var t__Successfully_Updated = ["Successfully Updated","成功更新"];
var t__Successfully_Inserted_A_New_Record = ["Successfully Inserted A New Record ","成功插入一条新记录"];
var t__Successfully_Deleted = ["Successfully Deleted","成功删除"];
var t__Update_Failed = ["Update Failed","更新失败"];
var t__Insert_New_Record_Failed = ["Insert New Record Failed","插入新纪录失败"];
var t__Delete_Failed = ["Delete Failed","删除失败"];
var t__PRINT_DRIVER_INSTRUCTIONS = ["PRINT DRIVER INSTRUCTIONS","打印发油指导书"];
var t__PRINT_BILL_OF_LADING = ["PRINT BILL OF LADING","打印提油帐单"];
var t__LOAD_SPEC_BY_PRODUCT = ["LOAD SPEC BY PRODUCT","依据产品的提油"];
var t__LOAD_SPEC_BY_COMPARTMENT = ["LOAD SPEC BY COMPARTMENT","依据油仓的提油"];
var t__TANKER_RETURNS = ["TANKER RETURNS","油槽车返还"];
var t__AUTHORISE_LOAD = ["AUTHORISE LOAD","授权提油"];
var t__ENTER_LOAD_DETAILS = ["ENTER LOAD DETAILS","输入提油详情"];
var t__UNLOADING_SPECIFICATION = ["UNLOADING SPECIFICATION","卸载概要说明"];
var t__YOUR_ACTION = ["YOUR ACTION","请选择"];
var t__Modify = ["Modify","修改"];
var t__Back_to_Load_Schedule_Page = ["Back to Load Schedule Page","返回发油订单管理页"];
var t__Select_A_Depot = ["Select A Depot","选择油库"];
var t__Supplier = ["						Supplier","						供应商"];
var t__Select_A_Supplier = ["Select A Supplier","选择供应商"];
var t__Select_Schedule_Status = ["Select Schedule Status","选择调度状态"];
var t__Schedule_Details = ["Schedule Details","调度详情"];
var t__All_the_fields_labelled_with_an = ["										All the fields labelled with an ","										所有带"];
var t__are_mandatory = ["are mandatory","的项目必填"];
var t__check_host_comm_conn = ["Check ERP Host Comm Status","查询ERP对接系统状况"];
var t__Carrier = ["																 Carrier","																 承运商"];
var t__Select_Carrier = ["Select Carrier","选择承运商"];
var t__Enter_Valid_Trip_No = ["Enter valid trip number","请输入正确的提单号"];
var t__Enter_Valid_Trip_Expiry = ["Enter Valid Trip Expiry Date Time","Enter Valid Trip Expiry Date Time"];
var t__Select_A_Carrier = ["Select A Carrier","选择承运商"];
var t__Select_A_Employer = ["Select the Employer Company","选择雇主"];
var t__Select_A_Personnel = ["Select the Personnel","选择相关人员"];

var t__Tanker = ["																Tanker","																油槽车"];
var t__Select_a_tanker = ["Select a tanker","选择油槽车"];
var t__Carrier = ["																 Carrier","																承运商"];
var t__Select_A_Carrier = ["Select A Carrier","选择承运商"];
var t__Tanker = ["																Tanker","																油槽车"];
var t__Schedule_Date = ["																Schedule Date","																调度日期"];
var t__Enter_Schedule_Date = ["Enter Schedule Date","输入调度日期"];
var t__Shift_Number = ["																Shift Number","																班次号"];
var t__Enter_Shift_Number = ["Enter Shift Number","输入班次号"];
var t__Depot = ["																Depot","																油库"];
var t__Select_Depot = ["Select Depot","选择油库"];
var t__Select_A_Depot = ["Select A Depot","选择油库"];
var t__Priority = ["																Priority","																优先级"];
var t__Enter_Schedule_Priority = ["Enter Schedule Priority","输入调度优先级"];
var t__Reset = ["Reset","重置"];
var t__Schedule_Details = ["Schedule Details","调度详情"];
var t__Do_you_wish_to_delete_this_row = ["										Do you wish to delete this row?","										您希望删除此行么？"];
//var t__Trip_No = ["																 Trip No","										提单号"];
var t__Delete = ["Delete","删除"];
var t__Back_to_Load_Schedule = ["Back to Load Schedule","返回发油订单管理"];
var t__Depot = ["						Depot","						油库"];
var t__Select_A_Depot = ["Select A Depot","选择油库"];
var t__Supplier = ["						Supplier","						供应商"];
var t__Select_A_Supplier = ["Select A Supplier","选择供应商"];
var t__load_schedule_search = ["load schedule search","发油订单查找"];
//var t__Trip_No = ["																 Trip No","																 提单号"];
var t__Carrier = ["																 Carrier","																 承运商"];
var t__Select_A_Carrier = ["Select A Carrier","选择承运商"];
var t__Find = ["Find","查找"];
var t__Depot_and_supplier_details = ["Depot and supplier details","油库和供应商详情"];
var t__Select_the_Depot_and_Supplier = ["             		Select the Depot and Supplier","             		选择油库和供应商"];
var t__To_View_Load_Schedules = ["To View Load Schedules","查看发油订单"];
var t__Depot = ["                       		Depot","                       		油库"];
var t__Select_A_Depot = ["Select A Depot","选择油库"];
var t__Supplier = ["                       		Supplier","                       		供应商"];
var t__Select_A_Supplier = ["Select A Supplier","选择供应商"];
var t__Find = ["Find","查找"];
var t__Previous = ["Previous","前"];
var t__Next = ["Next","后"];
var t__LOAD_SCHEDULES = ["LOAD SCHEDULES","发油订单"];
var t__DELETE_LOAD_SCHEDULES = ["DELETE LOAD SCHEDULES","删除发油订单"];
var t__ADD_NEW_LOAD_SCHEDULES = ["ADD NEW LOAD SCHEDULES","新增发油订单"];
var t__MODIFY_LOAD_SCHEDULES = ["MODIFY LOAD SCHEDULES","修改发油订单"];
var t__FIND_LOAD_SCHEDULES = ["FIND LOAD SCHEDULES","查找发油订单"];
var t__DKI_Omega_Menu = ["DKI Omega Menu","达基国际Omega系统菜单"];
var t__LOAD_SCHEDULES = ["LOAD SCHEDULES","发油订单"];
var t__Load_Schedules_Page = ["Load Schedules Page","发油订单管理页"];
var t__Delete = ["Delete","删除"];
var t__Modify = ["Modify","修改"];
var t__No_Load_Id_found = ["No Load Id found","找不到发油Id"];
var t__Unable_to_Print_Bill_Of_Lading = ["Unable to Print Bill Of Lading","无法打印提油帐单"];
var t__Load_Spec_is_completed = ["Load Spec is completed","发油概要说明完成"];
var t__cannot_modify = ["cannot modify","不能修改"];
var t__Cannot_delete_a_recent_CURRENT_load_spec = ["Cannot delete a recent CURRENT load spec","不能删除一个当前发油概要说明"];
var t__has_been_allocated = ["has been allocated to a different trip", "已被其它提单使用"];
var t__Another_new_Trip_No = ["Another new Trip No", "改用新提单号"];
var t__is_choosen = ["is choosen", "被选择"];
var t__Order_Ref = ["Order Reference", "订单参考号"];
var t__Load_Compensation = ["Load Compensation", "补发油管理"];
var t__ERP_order_frm = ["ERP Orders Form", "ERP单据表"];
var t__SRCH_Sched_last_days = ["View Schedules For Last Day (s)", "选择提单时段" ];
t__Last_Mod_By = ["Last Modified By", "操作员"]
var t__Start_date = ["Start Date", "开始日期" ];
var t__End_date = ["End Date", "终止日期"];
var t__Select = ["Select", "请选择" ];

var t__F_Compts = ["FREE COMPT", "空闲油仓"];
var t__F_Speced = [" SPECED", "完成调度"];
var t__Loadoing = ["LOADING", "发油中"];
var t__Active = ["ACTIVE", "活跃中"];
var t__Ended = ["ENDED", "提单结束"];
var t__Delivr_Ok = ["DELIVERED OK", "已交货"];





//Currently new colum for trip status will not be in use
//var myColumns = [ml(t__Trip_No), ml(t__Carrier), ml(t__Tanker), ml(t__Date), ml(t__Shift)
//	, ml(t__Schedule_Status), ml(t__Trip_Status), ml(t__Last_Mod_By)];
var myColumns = [ml(t__Trip_No), ml(t__Carrier), ml(t__Tanker), ml(t__Date), ml(t__Shift)
	, ml(t__Schedule_Status), ml(t__Last_Mod_By)];

//only needs to add the expiry date column if the site has set the expiry hours.	
if(!(hrs_to_expire===undefined) && parseFloat(hrs_to_expire)>0)//only when expiry date is required
{
	myColumns.push(ml(t__Trip_Expiry))
}

if(!(is_driv_req===undefined) && is_driv_req=='Y')//only when a personnel (driver) is required to attach with the load
{
	myColumns.push(ml(t__Personnel))
}




/* define op value */
var opAdd = 8;
var opDel = 9;
var opMod = 7;
var opFind = 5;

var dateFormat = "yyyy-MM-dd";
//For the time being we don not want to deliver all these staus but active status must be delivered
//var scheds_stat_jslist = [ [ "", ""], ["F", ml(t__F_Compts)], ["S", ml(t__F_Speced)], ["L",ml(t__Loadoing)], ["A",ml(t__Active)], ["E",ml(t__Ended)], ["D",ml(t__Delivr_Ok)]];
var scheds_stat_jslist = [ [ "", ""], ["A",ml(t__Active)]];
var scheds_days_jslist = [ [ "-1", ""], ["10","0 - 10"], ["20","10 - 20"], ["30","20 - 30"], ["40","30 - 40"], ["50","40 - 50"], ["60","50 - 60"]];
if(parseInt(days)=='-1') days=10;
//if come from the Search form results
// we dont want to display the days selected..

if(op==opFind || op==15)
{
	days=-1;
	scheds_days_jslist.unshift((scheds_days_jslist[0]));
	
}
/*
 * opValues Hash table trace the 
 * available options on this page 
 * for every function there is a unique op
 */		    
var opValues = new Array();
opValues["enterAdd"] = 7;
opValues["submitAdd"] = 17;
opValues["enterDelete"] = 8;
opValues["submitDelete"] = 18;
opValues["enterModify"] = 6;
opValues["submitModify"] = 16;
/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
var l_opInf= new Array()

	l_opInf[27]= ml(t__Successfully_Updated)+"!";
l_opInf[28]= ml(t__Successfully_Inserted_A_New_Record)+"!";
l_opInf[29]= ml(t__Successfully_Deleted)+"!";
l_opInf[37]= ml(t__Update_Failed)+"!";
l_opInf[38]= ml(t__Insert_New_Record_Failed)+"!";
l_opInf[39]= ml(t__Delete_Failed)+"!";

var actions = new Array();
actions["printDriverInstr"] = ml(t__PRINT_DRIVER_INSTRUCTIONS);
actions["printBOL"] = ml(t__PRINT_BILL_OF_LADING);
actions["specByProduct"] = ml(t__LOAD_SPEC_BY_PRODUCT);
actions["specByCmprtmnt"] = ml(t__LOAD_SPEC_BY_COMPARTMENT);
actions["tankerReturns"] = ml(t__TANKER_RETURNS);
actions["authLoad"] = ml(t__AUTHORISE_LOAD);
actions["enterLdDets"] = ml(t__ENTER_LOAD_DETAILS);
actions["unloadSpec"] = ml(t__UNLOADING_SPECIFICATION);
//here is the text needed to be displayed on the screen
var otherText = new Array()
	otherText["youraction"] =  ml(t__YOUR_ACTION);
	otherText["msg_valid_start"] = "Enter Start Date ealier than End Date";
	otherText["msg_valid_endDate"] = "Enter End Date later than Start Date";

/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    		
var ops_req_print = [-1,0, 1,2, 15,23,24, 25,26,27, 33,34, 35, 28,38,48,36,27,37,47,133,134,135,137];
var ops_req_search = [-1,0, 1,2, 15,23,24, 25,26,27, 33,34, 35,28,38,48,36,27,37,47,133,134,135,137];// search never required on this page		


//Calendar Variable
var cal = new CalendarPopup();
cal.showYearNavigation();
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
     //var myHiddenOb;
     
     //myHiddenOb = getElemRefs(\"prev_qstring\";
     //myHiddenOb.value=produceQString(;
     //return formcheck(myobject;
     return Validator.Validate(myobject,1);
}

function submitUpdform(myobject)
{

	var isFormValid = false; 
	var isAdd = document.updateFrm.cmd.value; 
	var tN = document.updateFrm.tripNo.value;
	var myTanker = document.updateFrm.tanker.value;
	if(!(hrs_to_expire===undefined) && parseFloat(hrs_to_expire)>0)//only when expiry date is required
	{
		var myexpirDate = document.updateFrm.expr_date.value;
		var myexpirTime = document.updateFrm.expr_time.value;
	}
	
	isFormValid = submitmyform(myobject);

	if ( isAdd == "ADD" ) 
	{
		//alert("Value of isAdd is "+isAdd); 
		if ( isFormValid && checkLastTrip(tN) ) 
		{
			if(!(hrs_to_expire===undefined) && parseFloat(hrs_to_expire)>0)//only when expiry date is required
			{
				//append an extra space to make it look like
				var mydateaftFromat = convertToDateTimeStamp(myexpirDate, myexpirTime);
				//alert("mydateaftFromat "+mydateaftFromat);
				var myExpDate = extract_datefrmDBRsult(mydateaftFromat);
				//Need the time presentation 
				var myExpriDatTime = convertToDateTime(myExpDate, extract_timefrmDBRsult(mydateaftFromat, false, false));
				var today = new Date();
				//alert("myTripExpriDatTime "+myExpriDatTime+ "and todays is "+today);
				if(today>myExpriDatTime)
				{
					alert(ml(t__Enter_Valid_Trip_Expiry));
					return false;
				}
				document.updateFrm.tripExpirDteTime.value = convertToDateTimeStamp(myexpirDate, myexpirTime);
			}
			var isRestOfFormValid = false; // this is to check if tanker and person selection are valid or not
			var myAvailTanker = as1.getSuggestionArr();

			if(myAvailTanker && myAvailTanker.length>0)
			{
				for (var i=0;i<myAvailTanker.length;i++)
				{
					
					var a = myAvailTanker[i];
					if (a==myTanker)isRestOfFormValid = true;
				}
				
			}
			else
			{
				alert(ml(t__Select_a_tanker));
				isRestOfFormValid = false;
				return false;
			}
			//alert("here is is_driv_req "+is_driv_req)
			if (!(is_driv_req===undefined) && is_driv_req=='Y' && isRestOfFormValid==true) 
			{
				isRestOfFormValid = false; //once again set it to false to check everything
				
				var myPersn = document.updateFrm.persn.value;
				var myPersnCmpy = document.updateFrm.per_cmpy.value;				
				isRestOfFormValid = checkValidPersonSelected(myPersn, myPersnCmpy);			
				if (isRestOfFormValid==false) alert(ml(t__Select_A_Personnel))
				
			}
			return isRestOfFormValid;
			
		}
		else 
		{
			return false;
		};
	} 
	else if ( isFormValid)
	{
		//return isFormValid;
		if(!(hrs_to_expire===undefined) && parseFloat(hrs_to_expire)>0)//only when expiry date is required
		{
			document.updateFrm.tripExpirDteTime.value = convertToDateTimeStamp(myexpirDate, myexpirTime);
		}
		var isRestOfFormValid = false; // this is to check if tanker and person selection are valid or not
		var myAvailTanker = as1.getSuggestionArr();

		if(myAvailTanker && myAvailTanker.length>0)
		{
			for (var i=0;i<myAvailTanker.length;i++)
			{
				var a = myAvailTanker[i];
				if (a==myTanker)isRestOfFormValid = true;
			}
			
		}
		else if (tanker!='' && (myTanker == tanker) ) // abdul adding this to fix Ajax Problem, tanker has not been changed so no need to re-check it
	    {
			isRestOfFormValid = true;

	    }
		else
		{
			alert(trim(ml(t__Select_a_tanker)));
			isRestOfFormValid = false;
		}
	    
	   if (!(is_driv_req===undefined) && is_driv_req=='Y')
		{
			var myPersn = document.updateFrm.persn.value;
			var myPersnCmpy = document.updateFrm.per_cmpy.value;				
			isRestOfFormValid = checkValidPersonSelected(myPersn, myPersnCmpy);			
			if (isRestOfFormValid==false) alert(ml(t__Select_A_Personnel))

			
		}
		return isRestOfFormValid


			

	}
	else
	{
		return isFormValid;
	};
}


//set tanker 
function setTank(myId, event)
{
 
//	document.updateFrm.tanker.value='';
	var supplier = document.getElementById('supp');
	var suppValue = supplier.options[supplier.selectedIndex].value;
	var tmp="loadscheds_tanker.cgi?supplier=" + suppValue;
	var value = document.updateFrm.carr.options[document.updateFrm.carr.selectedIndex].value;
	tmp += "&carrier=" + value
 var lyr = getElemRefs('tankSelect');
 if (lyr) lyr.style.display = "";
	document.getElementById('itank').src = tmp;
	return (!showPopup(myId, event));
}


//foward option 
function sendoption(element, loaded, state, loadId)
{
 
	var value = element.options[element.selectedIndex].value;
	var frm = element.parentNode.parentNode.parentNode.parentNode.parentNode;

	switch (value)
	{
		case "2":
			frm.action="load_spec_compt.cgi";
			frm.submit();
			break;
		case "3":
			frm.action="load_spec_prod.cgi";
			frm.submit();
			break;
		case "4":
			if(loadId >1){
			frm.action="bill_of_lading.cgi";
			frm.submit();
			}else{
				alert(""+ml(t__No_Load_Id_found)+", "+ml(t__Unable_to_Print_Bill_Of_Lading)+"");
				frm.reset();
			}
			break;
		case "7":
			if(loaded >1){
				alert(""+ml(t__Load_Spec_is_completed)+", "+ml(t__cannot_modify)+"");
				frm.reset();
			}else{
				frm.submit();
			}
			break;
		case "9":
			if(loaded >1 || state != ' '){
				alert(""+ml(t__Cannot_delete_a_recent_CURRENT_load_spec)+".");
				frm.reset();
			}else{
				frm.submit();
			}
			break;
		case "11":
			frm.action="drv_instr.cgi";
			frm.submit();
			break;
		case "12":
			frm.action="tanker_ret.cgi";
			frm.submit();
			break;
		case "14":
			frm.action="auth_load.cgi";
			frm.submit();
			break;
		case "15":
			frm.action="load_details.cgi";
			frm.submit();
			break;
		case "16":
			frm.action="delivery_verif.cgi";
			frm.submit();
			break;
		case "19":
			frm.action="unload_spec.cgi";
			frm.submit();
			break;
		default:
			break;
	}
}

//Set tanker to null if carrier has changed 
function checkCarrier()
{
	var currElement = getElemRefs('tanker');
	document.updateFrm.tanker.value = ''; 
	var myCarrier = document.updateFrm.carr.value;
	if(myCarrier!="-1" && (myCarrier!=""))
	{
		currElement.disabled=false;
		document.updateFrm.tanker.focus();
		myQStr = AlterUrlString((options1.script),"carrier",document.updateFrm.carr.value);
    		//alert(myQStr);
		options1.script = myQStr;


	}
	else
	{
		currElement.disabled=true;
		
	}
 
	
	 
}
//Set tanker to null if carrier has changed 
function checkEmployer()
{
	var currElement = getElemRefs('persn');
	document.updateFrm.persn.value = ''; 
	var myEmployer = document.updateFrm.per_cmpy.value;
	if(myEmployer!="-1" && (myEmployer!=""))
	{
		currElement.disabled=false;
		document.updateFrm.persn.focus();
		myQStr = AlterUrlString((options3.script),"per_cmpy",document.updateFrm.per_cmpy.value);
    		//alert(myQStr);
		options3.script = myQStr;


	}
	else
	{
		currElement.disabled=true;
		
	}
 
	
	 
}
//Set tanker to null if carrier has changed 
function checkCarrier_searchFrm()
{
	var currElement = getElemRefs('selKeyTanker');
	document.findFrm.selKeyTanker.value = ''; 
	var myCarrier = document.findFrm.carr.value;
	if(myCarrier!="-1" && (myCarrier!=""))
	{
		currElement.disabled=false;
		document.findFrm.selKeyTanker.focus();
		myQStr = AlterUrlString((options2.script),"carrier",document.findFrm.carr.value);
    	//alert(myQStr);
		options2.script = myQStr;


	}
	else if(myCarrier=="-1" ||(myCarrier==""))
	{
		myQStr = AlterUrlString((options2.script),"carrier","");
    	//alert(myQStr);
		options2.script = myQStr;
		currElement.disabled=true;
		
	}
 
	
	 
}

//Checked latest trip number availabe 
function checkLastTrip(iTN)
{
    var mycgi = '../../../cgi-bin/en/load_scheds/getlast_tripno.cgi'; 
    var myqry = 'supp='+encodeURI(supp)+'&tripNo='+encodeURI(iTN);
    var oTN = loadHtml(mycgi, myqry);
    eval(oTN);
	//alert("here is the oTN "+oTN);
	//return false;	
	if ( iTN != oTN ) { 
	    alert(trim(ml(t__Trip_No))+" "+iTN 
		+" "+ ml(t__has_been_allocated)
		+" "+ ml(t__Another_new_Trip_No)+" "+ oTN 
		+" "+ ml(t__is_choosen)+".");
		   document.updateFrm.tripNo.value = oTN; 
	    return false; 
	} else {
	    return true; 
	}
}
//Checked latest trip number availabe 
function checkValidPersonSelected(persn_code, per_cmpy)
{
    var mycgi = '../../../cgi-bin/en/load_scheds/getmatching_person.cgi';
    var myqry = 'per_cmpy='+encodeURI(per_cmpy)+'&persn='+encodeURI(persn_code);
	if ("-1"==eval(loadHtml(mycgi, myqry))) {
		return false;
	} else {
	    return true;
		
	}
}
function renderPage(cRec, cCol, cState, cPageState, priv, lang)
{ 
	js_lang = lang; 
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

	newPage += statusbarRowHTML(statusBar); 
	newPage += displayStatusMsg (op);

	if (curViewDetailState <= 1 || curViewDetailState > 10) // view records
	{
		
		if(OMEGA_NLS_TERTRY=='CHINA'){
		newPage +=" <script>\n";
		newPage +="var testpopup = new PopupWindow();\n";
		newPage +="testpopup.setSize(600,500);\n";
		newPage +="testpopup.setWindowProperties('toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised,dependent,titlebar=no');\n";
		newPage +="testpopup.autoHide();\n";		
		
		newPage +="var load_compen_popup = new PopupWindow();\n";
		newPage +="load_compen_popup.setSize(600,500);\n";
		newPage +="load_compen_popup.setWindowProperties('toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised,dependent,titlebar=no');\n";
		newPage +="load_compen_popup.autoHide();\n";	

		newPage +="var erp_orders_popup = new PopupWindow();\n";
		newPage +="erp_orders_popup.setSize(700,500);\n";
		newPage +="erp_orders_popup.setWindowProperties('toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised,dependent,titlebar=no');\n";
		newPage +="erp_orders_popup.autoHide();\n";			
		newPage +=" <\/script>\n";

		newPage += "	<tr>\n";
		newPage += "	<td align=\"center\">\n";
		newPage += "<button style=\"width: 26.5em; height: 2.2em;\" onClick=\"showinPagePopup(testpopup, 'anchor', 'check_erp_conn.cgi');return false;\" NAME=\"anchor\" ID=\"anchor\"/>";
		newPage += ml(t__check_host_comm_conn)+"\n";
		newPage += "		</button>\n";
		
		newPage += "<button style=\"width: 16.5em; height: 2.2em;\" onClick=\"showinPagePopup(load_compen_popup, 'anchor1', 'load_compensate.cgi');return false;\" NAME=\"anchor1\" ID=\"anchor1\"/>";
		newPage += ""+ml(t__Load_Compensation)+""+"\n";
		newPage += "		</button>\n";
		
		newPage += "<button style=\"width: 16.5em; height: 2.2em;\" onClick=\"showinPagePopup(erp_orders_popup, 'anchor1', 'create_erp_order.cgi');return false;\" NAME=\"anchor1\" ID=\"anchor1\"/>";
		newPage += ""+ml(t__ERP_order_frm)+""+"\n";
		newPage += "		</button>\n";
		
		newPage += "		</td>\n";
		newPage += "	</tr>\n";
		}
		newPage += displayGlblFrm(supp,tankTerm,curViewDetailState);
		//newPage +=addPrintBtn_HTML();

		if( ((myColumns.length)> 0))
		{
			newPage += "<tr> \n";
			newPage += "<td>\n ";
			newPage += "<div id=\"printReady\">\n";
			newPage += table_begin("M", 0,"");
			newPage += "<tbody> \n";
			newPage += "<tr>";


			if ( load_sched_tab.length > 1 ) {
				for(var i=0; i<myColumns.length; i++)
				{
					newPage += "<td>"+myColumns[i]+"<\/td>";
				}
			}

			newPage += "<\/tr>";


			for(i in load_sched_tab)
			{
				newPage += "<tr class=\"row1\">\n";
				if(i>0) 
				{
					var howmanyDone =3;
					for(var j=0; j<myColumns.length; j++)
					{

						if (curColumnToSort == howmanyDone)
						{
							newPage += "<td style=\"background-color:#EEEEEE\">" + obs(load_sched_tab[i][howmanyDone]) + "<\/td>";
						} 
						else 
						{

							newPage += "<td>\n";				  
							if(howmanyDone==3) // means time to display the drop list and table
							{
								newPage +="   <form name=\"optionsFrm_"+load_sched_tab[i][howmanyDone]+"\" id=\"optionsFrm\" method=\"get\">\n";
								newPage +="       <table border=\"0\" >\n";
								newPage +="	       <tr>\n";
								newPage +="                 <td width=\"50\"> <span style=\"COLOR: #FF0000;\">"+obs(load_sched_tab[i][howmanyDone])+"</span>\n";
								newPage +="                     <input type=\"hidden\" name=\"pg\" id=\"pg\" value=\""+pg+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"tankTerm\" id=\"tankTerm\" value=\""+load_sched_tab[i][0]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"supp\" id=\"supp\" value=\""+load_sched_tab[i][1]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+load_sched_tab[i][6]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"tripNo\" id=\"tripNo\" value=\""+load_sched_tab[i][howmanyDone]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"shlstt\" id=\"shlstt\" value=\""+load_sched_tab[i][13]+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"days\" id=\"days\" value=\""+days+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"startDate\" id=\"startDate\" value=\""+startDate+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"endDate\" id=\"endDate\" value=\""+endDate+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"sched_stat\" id=\"sched_stat\" value=\""+sched_stat+"\">\n";
								newPage +="                 </td>\n";
								newPage +="                 <td>\n";
								newPage += op_list(curPrivilage, load_sched_tab[i][13], load_sched_tab[i][14], load_sched_tab[i][15]);
								newPage +="                 </td>\n";
								newPage +="	       </tr>\n";
								newPage +="	  </table>\n";
								newPage +="   </form>\n";
							}
							else if(howmanyDone==4)
							{
								howmanyDone ++;
								newPage += obs(load_sched_tab[i][howmanyDone]);
							}
							else if(howmanyDone==8) // that is the Shift Number
							{

								if(load_sched_tab[i][howmanyDone]=="" ||(load_sched_tab[i][howmanyDone]=="0"))
								{
									newPage += "";
								}
								else
								{
									newPage += obs(load_sched_tab[i][howmanyDone]);
								}

							}
							//Currently new colum for trip status will not be in use
							// that is the new Status from the Schedule table
							/*
							else if(howmanyDone==10) 
							{

								if(load_sched_tab[i][20]=="" ||(load_sched_tab[i][20]=="-1"))
								{
									newPage += "";
								}
								else
								{
									newPage +=getDetailStatus(load_sched_tab[i][20]);
								}

							} */
							else if(howmanyDone==10) // that is the who modified this trip colum
							{

								newPage += obs(load_sched_tab[i][21]);

							}
							else if(howmanyDone==11) // that is now dealing with the expiry date
							{
								if(!(hrs_to_expire===undefined) && parseFloat(hrs_to_expire)>0)
								{
									if(load_sched_tab[i][22]!="" && load_sched_tab[i][22]!=" " && load_sched_tab[i][22]!="NULL")
									{
										var myExpDate = extract_datefrmDBRsult(load_sched_tab[i][22]);
										//Need the time presentation in am or pm
										var myExpTime = extract_timefrmDBRsult(load_sched_tab[i][22], true, false);
										
										var myTripExpriDatTime = convertToDateTime(myExpDate, extract_timefrmDBRsult(load_sched_tab[i][22], false, false))
										var today = new Date();
										//alert("myTripExpriDatTime "+myTripExpriDatTime+ "and todays is "+today);
										
										if(today>myTripExpriDatTime)
										{
											newPage += "<span style=\"color:red;\"> "+ myExpDate+" "+myExpTime+"<\/span>";
										}
										else //not expired
										{
											newPage += "<span style=\"color:green;\"> "+ myExpDate+" "+myExpTime+"<\/span>";
										}
									}
									else
									{
										newPage += "N/A";
									}
								}

							}
							else if(howmanyDone==12) // that is now dealing with the operator attached to the load
							{
								if(!(is_driv_req===undefined) && is_driv_req=='Y') // if statement is to check if site require scheduler to attach driver
								{
									if(load_sched_tab[i][23]!="" && load_sched_tab[i][23]!=" " && load_sched_tab[i][23]!="NULL")
									{
										newPage += load_sched_tab[i][23];
									}
									else
									{
										newPage += "N/A";
									}
								}

							}  		
							else
							{
								newPage += obs(load_sched_tab[i][howmanyDone]);
							}

							newPage += "<\/td>\n";

						}// end loop column
						howmanyDone++;
					}

				} // end if to check rows
				newPage += "\n";
				newPage += "<\/tr>";

			}//end loop on load sched
			newPage += "<\/tbody>";
			newPage += "<\/table>";
			newPage += "</div>\n";
			newPage += "<\/td>";	
			newPage += "<\/tr>";

		} // end if to check column

		if ( pg == -1) 
			pg = 1;

		if ( parseInt(pg) > 0 && parseInt(pagesTotal) > 1 )
		{
			newPage +=nextPage_longStr(pagesTotal, pg, "pg",'tankTerm',tankTerm,'supp',supp,'op', op, 'sched_status',sched_status,'days', days,'sched_stat', sched_stat,'endDate', endDate, 'startDate',startDate,'selKeyTanker',selKeyTanker,'statusBar','');
		}


	}// end if to check state
	else if(curViewDetailState == 5)
	{
		newPage += findForm();

	}  
	else if(curViewDetailState == 8 || curViewDetailState == 7 )
	{
		newPage += updateForm(curViewDetailState);

	}
	else if(curViewDetailState == 9)
	{
		newPage += deleteForm();
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


newPage += " <div>\n";
	/*newPage += " <form method=\"get\" action=\"\">\n";
	newPage += " <label for=\"testinput1\">Tanker :</label>\n";
 	newPage += " <input type=\"text\" id=\"testinput1\" value=\"\" />\n"; 
 	newPage += " <input type=\"submit\" value=\"submit\" />\n";
 	newPage += " 	<\/form>\n";
 	newPage += " <\/div>\n";
	*/
	newPage +="<script type=\"text/javascript\">\n";
    	newPage +="var options1 = {\n";
	//only need to provide the carrier if its a modify page
	if ( load_sched_tab.length > 1 )
	{
    		newPage +="script:\"/cgi-bin/en/load_scheds/tankers.cgi?carrier="+load_sched_tab[1][4]+"&\",\n";
	}
	else
	{
		newPage +="script:\"/cgi-bin/en/load_scheds/tankers.cgi?carrier=&\",\n";
	}
    	newPage +="varname:\"input\",\n";
    	newPage +="minchars:1\n";
    	newPage +="};\n";
    	newPage +="var as1 = new AutoSuggest('tanker', options1);\n";
		
		//Adding this one for Search Form Tanbker List
		newPage +="var options2 = {\n";
        newPage +="script:\"/cgi-bin/en/load_scheds/tankers.cgi?carrier=&\",\n";
        newPage +="varname:\"input\",\n";
        newPage +="minchars:1\n";
        newPage +="};\n";
        newPage +="var as2 = new AutoSuggest('selKeyTanker', options2);\n";
	if (!(is_driv_req===undefined) && is_driv_req=='Y')  //only when Driver is required to be attached by the dispatcher
	{
    	newPage +="var options3 = {\n";
		if ( load_sched_tab.length > 1 )
		{
			load_sched_tab[1][24]="3543";
			newPage +="script:\"/cgi-bin/en/load_scheds/personnels.cgi?per_cmpy="+load_sched_tab[1][24]+"&\",\n";
		}
		else
		{
			newPage +="script:\"/cgi-bin/en/load_scheds/personnels.cgi?per_cmpy=&\",\n";
		}
        
        newPage +="varname:\"input\",\n";
        newPage +="minchars:1\n";
        newPage +="};\n";
        newPage +="var as3 = new AutoSuggest('persn', options3);\n";
	}
       	newPage +="</script>\n";


	newPage += "<br> <br>              \n";

	newPage += "</td>              \n";
	newPage += "</tr>\n";
	newPage += "</tbody>\n";
	newPage += "</table>\n";

	newPage += "\n";
	newPage += "</body>\n";
	newPage += "</html>\n";
	newPage += "\n"; 

	//alert(newPage); 
	return(newPage);
	document.close();
	if (typeof writeBack != 'undefined')writeBack();


}

function updateForm(state)
{
	var button ="";
	var tripInput = "";
	var require = "";
	var cmd="";
	var i = 0;
	var val_thisdate;
	var val_Expr_date;
	var val_Expr_time;
    var mypg;

	if (state == 8)
	{
		button = ml(t__Add);
		require= "*";
		tripInput = "";
		tankerInput = "disabled";
		persnInput = "disabled";
		cmd="ADD";
		val_thisdate = "value="+ disp_todayDate('yyyy-MM-dd');
		if(!(hrs_to_expire===undefined) && parseFloat(hrs_to_expire)>0)//only when expiry date is required
		{
			val_Expr_date= "value=\""+takeMintsGenFuturDate(mints_to_expire)+"\"";
			val_Expr_time= "value=\""+takeMintsGenFuturTime(mints_to_expire)+"\"";
		}
		i=0;
	}else{
		button = ml(t__Modify);
		require= "";
		tankerInput = "";
		persnInput = "";
		tripInput = "disabled"
		cmd="MOD";
		i=1;
		val_thisdate = "value="+ load_sched_tab[i][7];
		//load_sched_tab[1][22] is about the expiry date and time of the trip
		//only depends upon the site exp hours variable
		if(!(hrs_to_expire===undefined) && parseFloat(hrs_to_expire)>0)//only when expiry date is required
		{
			var trip_expDateTime = load_sched_tab[1][22]; // this is the 23rd element in the array
			if(trip_expDateTime==""||trip_expDateTime==" " || trip_expDateTime=="NULL")
			{
				val_Expr_date= "value=\""+takeMintsGenFuturDate(mints_to_expire)+"\"";
				val_Expr_time= "value=\""+takeMintsGenFuturTime(mints_to_expire)+"\"";
			}
			else // date was there now use the functions to parse the date and time
			{
				val_Expr_date= "value=\""+extract_datefrmDBRsult(trip_expDateTime)+"\"";
				val_Expr_time= "value=\""+extract_timefrmDBRsult(trip_expDateTime, true, false)+"\"";
			}
		}
		
		
	}
	op += 10;

	var updateFrm = "";
	updateFrm += "	<tr>\n";
	updateFrm += "		<td align=\"center\">\n";
	updateFrm += "			<div class=\"button\"><a href=\"load_scheds.cgi?tankTerm="+tankTerm+"&supp="+supp+"&pg="+pg+" \">"+ml(t__Back_to_Load_Schedule_Page)+"</a></div><br>\n";
	updateFrm += "		</td>\n";
	updateFrm += "	</tr>\n";
	updateFrm += "	<form name=\"updateFrm\" method=\"get\" id=\"updateFrm\" onsubmit=\"return submitUpdform(this)\">\n";

	updateFrm += "	<tr>\n";
	updateFrm += "	<td>\n";
	updateFrm += "	<div id=\"helparea\">\n";
	updateFrm += "	<table>\n";
	updateFrm += "	   <tr>\n";
	updateFrm += "	 	  <td>\n";
	updateFrm += "			<table>\n";
	updateFrm += "				<tr>\n";
	updateFrm += "					<td class=\"infotextheading\" width=\"100\">\n";
	updateFrm +=                          ml(t__Depot)+":\n";
	updateFrm += "                    </td>\n";
	updateFrm += "                    <td width=\"5\" align=\"center class=\"infotext\" >\n";
	updateFrm += "                        <span class=\"mandatory\"></span>\n";
	updateFrm += "                    </td>\n";
	updateFrm += "                    <td class=\"infotext\">\n";
	updateFrm += "                        <select id=\"tankTerm\" name=\"tankTerm\" disabled> \n";
	updateFrm += displayDropList(tankTerm, terminal,ml(t__Select_A_Depot));
	updateFrm += "                    </td>\n";
	updateFrm += "                 </tr>\n";
	updateFrm += "             </table>\n";
	updateFrm += "         </td>\n";
	updateFrm += "       </tr>\n";
	updateFrm += "       <tr>\n";
	updateFrm += "        <td>\n";
	updateFrm += "           <table>\n";
	updateFrm += "               <tr>\n";
	updateFrm += "                   <td class=\"infotextheading\" width=\"100\">\n";
	updateFrm +=                         ml(t__Supplier)+":\n";
	updateFrm += "                   </td>\n";
	updateFrm += "                   <td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "                       <span class=\"mandatory\"></span>\n";
	updateFrm += "                   </td>\n";
	updateFrm += "                   <td class=\"infotext\">\n";
	updateFrm += "                       <select id=\"supp\" name=\"supp\" disabled> \n";
	updateFrm += displayDropList(supp, supplier,ml(t__Select_A_Supplier));
	updateFrm += "                   </td>\n";
	updateFrm += "               </tr>\n";
	updateFrm += "           </table>\n";
	updateFrm += "         </td>\n";
	updateFrm += "       </tr>\n";
	updateFrm += "      </table>\n";
	updateFrm += "	</div>\n";

	updateFrm += "    <tr><td> &nbsp; </td></tr>\n";

	updateFrm += fieldst_HTML(ml(t__Schedule_Details));
	updateFrm += "          	<div class=\"adminform\">\n";
	updateFrm += "							<table width=\"100%\">\n";
	updateFrm += "								<tr>\n";
	updateFrm += "									<td class=\"infotext\" width=\"100%\">\n";
	updateFrm += ml(t__All_the_fields_labelled_with_an)+" (<span style=\"COLOR: #FF0000;\">*</span>) "+ml(t__are_mandatory)+"\n";
	updateFrm += "									</td>\n";
	updateFrm += "								</tr>\n";
	updateFrm += "								<tr>\n";
	updateFrm += "									<td width=\"100%\">\n";
	updateFrm += "										<table width=\"100%\">\n";
	updateFrm += "											\n";
	updateFrm += "											<tr>\n";
	updateFrm += "												<td width=\"50%\">\n";
	updateFrm += "													<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"120\">\n";
	updateFrm += ml(t__Trip_No)+":\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "																 <span class=\"mandatory\">"+require+"</span>\n";
	updateFrm += "															</td>\n";

	if ( cmd == "ADD" ) {
		updateFrm += "															<td>\n";
		updateFrm += "																<input type=\"text\" name=\"tripNo\" maxLength=\"9\" dataType=\"PositiveInt\"  value=\""+tripNo+"\" msg=\""+ml(t__Enter_Valid_Trip_No)+"\" "+tripInput+" />\n";
	} else {
		updateFrm += "															<td class=\"infotext\">\n";
		updateFrm += "																"+tripNo+"<input type=\"hidden\" name=\"tripNo\" value=\""+tripNo+"\" />\n";
	}

	updateFrm += "															</td>\n";
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "												</td>\n";
	updateFrm += "												<td width=\"50%\">\n";
	//putting expiry date stuff here
	if(!(hrs_to_expire===undefined) && parseFloat(hrs_to_expire)>0)//only when expiry date is required
	{
		updateFrm += "											   		<table>\n";
		updateFrm += "														<tr>\n";
		updateFrm += "															<td class=\"infotextheadingtd\" width=\"120\">\n";
		updateFrm += ml(t__Trip_Expiry)+":\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
		updateFrm += "																<span class=\"mandatory\">*</span>\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td>\n";
		updateFrm += "															   <table width=\"100%\">\n";
		updateFrm += "  															   <tr>\n";
		updateFrm += "      															  <td>\n";
		updateFrm += "      													 			   <input type=\"text\" name=\"expr_date\" id=\"expr_date\" size=\"20\" dataType=\"Require\" msg=\""+ml(t__Enter_Valid_Trip_Expiry)+"\" "+val_Expr_date+" readonly=\"true\">\n";
		updateFrm += "      													 		  </td>													 			\n";
		updateFrm += "      													 		  <td class=\"infotextheading\" align=\"left\">	\n";
		updateFrm +=dateURL_HTML("document.forms[0].expr_date", "anchor01",dateFormat,ml(t__Select_Date));
		updateFrm += "      													 		  </td>\n";
		updateFrm += "  													 		  </tr>\n";
		updateFrm += "													 		  </table>\n";
		updateFrm += "															</td>\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td>\n";
		updateFrm += "															   <table width=\"100%\">\n";
		updateFrm += "  															   <tr>\n";
		updateFrm += "      															  <td>\n";
		updateFrm += "      													 			   <input type=\"text\" name=\"expr_time\" id=\"expr_time\" size=\"8\" dataType=\"Require\" msg=\""+ml(t__Enter_Schedule_Date)+"\" "+val_Expr_time+" ONBLUR=\"validateDatePicker(this)\" readonly=\"true\">\n";
		updateFrm += "      													 		  </td>													 			\n";
		updateFrm += "      													 		  <td class=\"infotextheading\" align=\"left\">	\n";
		updateFrm += "															<img src=\"../../../images/timepicker.gif\" BORDER=\"0\" ALT=\"Pick a Time!\" onClick=\"selectTime(this,expr_time)\" STYLE=\"cursor:pointer\" width=\"30\" height=\"20\">\n";
		//updateFrm +=dateURL_HTML("document.forms[0].expr_date", "anchor01",dateFormat,ml(t__Select_Date));
		updateFrm += "      													 		  </td>\n";
		updateFrm += "  													 		  </tr>\n";
		updateFrm += "													 		  </table>\n";
		updateFrm += "															</td>\n";
		updateFrm += "														</tr>\n";
		updateFrm += "													</table>\n";
	}//only required when expiry time is set in the database
	//end of the expiry date stuff
	
	updateFrm += "												</td>\n";
	updateFrm += "											</tr>\n";

	/* To enabled and disabled modify carrier and tanker based on load status */

	if(load_sched_tab[i][14] == " " || state != 18)
	{
		updateFrm += "											<tr>\n";
		updateFrm += "												<td width=\"50%\">\n";
		updateFrm += "													<table>\n";
		updateFrm += "														<tr>\n";
		updateFrm += "															<td class=\"infotextheadingtd\" width=\"120\">\n";
		updateFrm += ml(t__Carrier)+":\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
		updateFrm += "																	<span class=\"mandatory\">*</span>\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td>\n";
		updateFrm += "																<select NAME=\"carr\" id=\"carr\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_Carrier)+"\" onchange=\"checkCarrier();\" >\n";
		updateFrm += displayDropList(load_sched_tab[i][4], carrier, ml(t__Select_A_Carrier));
		updateFrm += "															</td>\n";
		updateFrm += "														</tr>\n";
		updateFrm += "													</table>\n";
		updateFrm += "												</td>\n";
		updateFrm += "												<td width=\"50%\">\n";
		updateFrm += "													<table>\n";
		updateFrm += "														<tr>\n";
		updateFrm += "															<td class=\"infotextheadingtd\" width=\"120\">\n";
		updateFrm += ml(t__Tanker)+":\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
		updateFrm += "																<span class=\"mandatory\">*</span>\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td>\n";

		updateFrm += "																<table class=\"NewActionBaseTable\">\n";
		updateFrm += "																	<tbody>\n";
		updateFrm += "																	<tr>\n";
		updateFrm += "																		<td class=\"popupLinkrow\">\n";
		updateFrm += "																			<input type=\"text\" name=\"tanker\" id=\"tanker\" value=\""+load_sched_tab[i][6]+"\" style=\"FONT-SIZE:1.00em\" dataType=\"Require\" msg=\""+ml(t__Select_a_tanker)+"\" "+tankerInput+" />\n"; 
		updateFrm += "																		</td>\n";
		updateFrm += "																		<td width=\"15\">\n";
		updateFrm += "																			<img src=\"/images/dropimage.gif\" width=\"15\" height=\"16\" onclick=\"if(document.updateFrm.carr.value!='' && document.updateFrm.carr.value!='-1'){as1.doAjaxRequest();}else{alert('"+ml(t__Select_Carrier)+"');}\">\n";
		updateFrm += "																		</td>\n";
		updateFrm += "																	</tr>\n";
		updateFrm += "																    </tbody>\n";
		updateFrm += "																</table>\n";

		updateFrm += "															</td>\n";
		updateFrm += "														</tr>\n";
		updateFrm += "													</table>\n";
		updateFrm += "												</td>\n";
		updateFrm += "											</tr>\n";

	}else{
		
		updateFrm += "											<tr>\n";
		updateFrm += "												<td width=\"50%\">\n";
		updateFrm += "													<table>\n";
		updateFrm += "														<tr>\n";
		updateFrm += "															<td class=\"infotextheadingtd\" width=\"120\">\n";
		updateFrm += ml(t__Carrier)+":\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
		updateFrm += "																	<span class=\"mandatory\"></span>\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td>\n";
		updateFrm += "																<select NAME=\"carr\" id=\"carr\" class=\"smallselect\" disabled>\n";
		updateFrm += displayDropList(load_sched_tab[i][4], carrier, ml(t__Select_A_Carrier));
		updateFrm += "																<input type=\"hidden\" name=\"carr\" value=\""+load_sched_tab[i][4]+"\" />\n";
		updateFrm += "															</td>\n";
		updateFrm += "														</tr>\n";
		updateFrm += "													</table>\n";
		updateFrm += "												</td>\n";
		updateFrm += "												<td width=\"50%\">\n";
		updateFrm += "													<table>\n";
		updateFrm += "														<tr>\n";
		updateFrm += "															<td class=\"infotextheadingtd\" width=\"120\">\n";
		updateFrm += ml(t__Tanker)+":\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
		updateFrm += "																<span class=\"mandatory\"></span>\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td class=\"infotext\">\n";
		updateFrm += "																"+load_sched_tab[i][6];
		updateFrm += "																<input type=\"hidden\" name=\"tanker\" value=\""+load_sched_tab[i][4]+"\" />\n";
		updateFrm += "															</td>\n";
		updateFrm += "														</tr>\n";
		updateFrm += "													</table>\n";
		updateFrm += "												</td>\n";
		updateFrm += "											</tr>\n";  

	}
	
	
	
	
	
	//Starting the Personnel selection stuff
	
	if( (load_sched_tab[i][14] == " " || state != 18)
	   && (!(is_driv_req===undefined) && is_driv_req=='Y') )
	{
		updateFrm += "											<tr>\n";
		updateFrm += "												<td width=\"50%\">\n";
		updateFrm += "													<table>\n";
		updateFrm += "														<tr>\n";
		updateFrm += "															<td class=\"infotextheadingtd\" width=\"120\">\n";
		updateFrm += ml(t__employer)+":\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
		updateFrm += "																	<span class=\"mandatory\">*</span>\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td>\n";
		updateFrm += "																<select NAME=\"per_cmpy\" id=\"per_cmpy\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_A_Employer)+"\" onchange=\"checkEmployer();\" >\n";
		updateFrm += displayDropList(load_sched_tab[i][24], employer, ml(t__Select_A_Employer));
		updateFrm += "															</td>\n";
		updateFrm += "														</tr>\n";
		updateFrm += "													</table>\n";
		updateFrm += "												</td>\n";
		updateFrm += "												<td width=\"50%\">\n";
		updateFrm += "													<table>\n";
		updateFrm += "														<tr>\n";
		updateFrm += "															<td class=\"infotextheadingtd\" width=\"120\">\n";
		updateFrm += ml(t__Personnel)+":\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
		updateFrm += "																<span class=\"mandatory\">*</span>\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td>\n";

		updateFrm += "																<table class=\"NewActionBaseTable\">\n";
		updateFrm += "																	<tbody>\n";
		updateFrm += "																	<tr>\n";
		updateFrm += "																		<td class=\"popupLinkrow\">\n";
		updateFrm += "																			<input type=\"text\" name=\"persn\" id=\"persn\" value=\""+load_sched_tab[i][23]+"\" style=\"FONT-SIZE:1.00em\" dataType=\"Require\" msg=\""+ml(t__Select_A_Personnel)+"\" "+persnInput+" />\n"; 
		updateFrm += "																		</td>\n";
		updateFrm += "																		<td width=\"15\">\n";
		updateFrm += "																			<img src=\"/images/dropimage.gif\" width=\"15\" height=\"16\" onclick=\"if(document.updateFrm.per_cmpy.value!='' && document.updateFrm.per_cmpy.value!='-1'){as3.doAjaxRequest();}else{alert('"+ml(t__Select_A_Employer)+"');}\">\n";
		updateFrm += "																		</td>\n";
		updateFrm += "																	</tr>\n";
		updateFrm += "																    </tbody>\n";
		updateFrm += "																</table>\n";

		updateFrm += "															</td>\n";
		updateFrm += "														</tr>\n";
		updateFrm += "													</table>\n";
		updateFrm += "												</td>\n";
		updateFrm += "											</tr>\n";

	}else if (!(is_driv_req===undefined) && is_driv_req=='Y'){
		
		updateFrm += "											<tr>\n";
		updateFrm += "												<td width=\"50%\">\n";
		updateFrm += "													<table>\n";
		updateFrm += "														<tr>\n";
		updateFrm += "															<td class=\"infotextheadingtd\" width=\"120\">\n";
		updateFrm += ml(t__employer)+":\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
		updateFrm += "																	<span class=\"mandatory\"></span>\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td>\n";
		updateFrm += "																<select NAME=\"per_cmpy\" id=\"per_cmpy\" class=\"smallselect\" disabled>\n";
		updateFrm += displayDropList(load_sched_tab[i][24], employer, ml(t__Select_A_Employer));
		updateFrm += "																<input type=\"hidden\" name=\"per_cmpy\" value=\""+load_sched_tab[i][24]+"\" />\n";
		updateFrm += "															</td>\n";
		updateFrm += "														</tr>\n";
		updateFrm += "													</table>\n";
		updateFrm += "												</td>\n";
		updateFrm += "												<td width=\"50%\">\n";
		updateFrm += "													<table>\n";
		updateFrm += "														<tr>\n";
		updateFrm += "															<td class=\"infotextheadingtd\" width=\"120\">\n";
		updateFrm += ml(t__Personnel)+":\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
		updateFrm += "																<span class=\"mandatory\"></span>\n";
		updateFrm += "															</td>\n";
		updateFrm += "															<td class=\"infotext\">\n";
		updateFrm += "																"+load_sched_tab[i][23];
		updateFrm += "																<input type=\"hidden\" name=\"persn\" value=\""+load_sched_tab[i][23]+"\" />\n";
		updateFrm += "															</td>\n";
		updateFrm += "														</tr>\n";
		updateFrm += "													</table>\n";
		updateFrm += "												</td>\n";
		updateFrm += "											</tr>\n";  

	}
	
	
	
	//Edning the Personnel selection stuff	
	updateFrm += "											<tr>\n";
	updateFrm += "											 	<td width=\"50%\">\n";
	updateFrm += "											   		<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"120\">\n";
	updateFrm += ml(t__Schedule_Date)+":\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "																<span class=\"mandatory\">*</span>\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td>\n";
	updateFrm += "															   <table width=\"100%\">\n";
	updateFrm += "  															   <tr>\n";
	updateFrm += "      															  <td>\n";
	updateFrm += "      													 			   <input type=\"text\" name=\"date\" id=\"date\" size=\"20\" dataType=\"Require\" msg=\""+ml(t__Enter_Schedule_Date)+"\" "+val_thisdate+" readonly=\"true\">\n";
	updateFrm += "      													 		  </td>													 			\n";
	updateFrm += "      													 		  <td class=\"infotextheading\" align=\"left\">	\n";
	updateFrm +=dateURL_HTML("document.forms[0].date", "anchor1",dateFormat,ml(t__Select_Date));
	updateFrm += "      													 		  </td>\n";
	updateFrm += "  													 		  </tr>\n";
	updateFrm += "													 		  </table>\n";
	updateFrm += "															</td>\n";
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "											 	</td>\n";
	updateFrm += "											 	<td width=\"50%\">\n";
	updateFrm += "											   		<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"120\">\n";
	updateFrm += ml(t__Shift_Number)+":\n";

	updateFrm += "</td>\n";
	updateFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "<span class=\"mandatory\"></span>\n";
	updateFrm += "</td>\n";
	updateFrm += "<td>\n";
	updateFrm += " <input type=\"text\" name=\"shift\" id=\"shift\" size=\"20\" dataType=\"Custom\"  maxlength=\"4\"  regexp=\"^[0-9]\*\\d\*$\" msg=\""+ml(t__Enter_Shift_Number)+"\" value=\""+load_sched_tab[i][8]+"\" />\n";
	updateFrm += "</td>\n";
	//var regEx = '(\\d+)?(\\.\\d+)?$';

	updateFrm += "</tr>\n";
	updateFrm += "</table>\n";
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	updateFrm += "<tr>\n";
	updateFrm += "<td width=\"50%\">\n";
	updateFrm += "<table>\n";
	updateFrm += "<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"120\">\n";
	updateFrm += ml(t__Depot)+":\n";
	updateFrm += "</td>\n";
	updateFrm += "<td width=\"5\" align=\"center class=\"infotext\" >\n";
	updateFrm += "<span class=\"mandatory\"></span>\n";
	updateFrm += "</td>\n";
	updateFrm += "<td class=\"infotext\">\n";
	updateFrm += "<select id=\"tankTerm\" name=\"tankTerm\" disabled> \n";
	updateFrm += displayDropList(tankTerm, terminal,ml(t__Select_A_Depot));
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	updateFrm += "</table>\n";
	updateFrm += "</td>\n";
	updateFrm += "											 	<td width=\"50%\">\n";
	updateFrm += "											   		<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"120\">\n";
	updateFrm += ml(t__Priority)+":\n";
	updateFrm += "</td>\n";
	updateFrm += "<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "<span class=\"mandatory\"></span>\n";
	updateFrm += "</td>\n";
	updateFrm += "<td>\n";
	updateFrm += " <input type=\"text\" name=\"priority\" id=\"priority\" size=\"20\" dataType=\"Custom\"  maxlength=\"4\"  regexp=\"^[0-9]\*\\d\*$\"  msg=\""+ml(t__Enter_Schedule_Priority)+"\" value=\""+load_sched_tab[i][12]+"\" />\n";
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	updateFrm += "</table>\n";
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	updateFrm += "</table>\n";
	updateFrm += "</td>\n";
	updateFrm += "</tr>\n";
	updateFrm += "<tr>\n";
	updateFrm += "<td align=\"center\">\n";
	updateFrm += "<table>\n";
	updateFrm += "<tr>\n";
	updateFrm += "												<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	updateFrm += "													\n";

	if ( cmd == "ADD" ) {
		updateFrm += "													<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\""+pagesTotal+"\" />\n";
	} else {
		updateFrm += "													<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\""+pg+"\" />\n";
	}

	updateFrm += "													<input type=\"hidden\" name=\"tankTerm\" id=\"tankTerm\" value=\""+tankTerm+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"tripExpirDteTime\" id=\"tripExpirDteTime\" value=\"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"supp\" id=\"supp\" value=\""+supp+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"op\" id=\"op\" value=\""+op+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"cmd\" id=\"cmd\" value=\""+cmd+"\" />\n";
	updateFrm += "													<input type=\"submit\" value=\"" + button + "\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	updateFrm += "												</td>\n";
	updateFrm += "												<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	updateFrm += "													<input type=\"reset\" value =\""+ml(t__Reset)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	updateFrm += "												</td>\n";
	updateFrm += "											</tr>\n";
	updateFrm += "										</table>\n";
	updateFrm += "									</td>\n";
	updateFrm += "								</tr>\n";
	updateFrm += "							</table>\n";
	updateFrm += "							</div>\n";
	updateFrm += fieldstFoot_HTML();
	updateFrm += "	</form>\n";

	return updateFrm;
} //End update Form


function deleteForm()
{
	var deleteFrm = "";
	deleteFrm += "	<tr>\n";
	deleteFrm += "		<td align=\"center\">\n";
	deleteFrm += "			<div class=\"button\"><a href=\"load_scheds.cgi?tankTerm="+tankTerm+"&supp="+supp+"&pg="+pg+"\">"+ml(t__Back_to_Load_Schedule_Page)+"</a></div><br>\n";
	deleteFrm += "		</td>\n";
	deleteFrm += "	</tr>\n";
	deleteFrm += fieldst_HTML(ml(t__DELETE_LOAD_SCHEDULES));
	deleteFrm += "          	<div class=\"adminform\">\n";
	deleteFrm += "					<form name=\"deleteFrm\" method=\"post\" id=\"deleteFrm\" onsubmit=\"return submitmyform(this)\">\n";
	deleteFrm += "							<table width=\"100%\">\n";
	deleteFrm += "								<tr>\n";
	deleteFrm += "									<td class=\"infotext\" width=\"100%\">\n";
	deleteFrm += ml(t__Do_you_wish_to_delete_this_row)+"\n";
	deleteFrm += "									</td>\n";
	deleteFrm += "								</tr>\n";
	deleteFrm += "								<tr>\n";
	deleteFrm += "									<td width=\"100%\">\n";
	deleteFrm += "										<table width=\"100%\">\n";
	deleteFrm += "											<tr>\n";
	deleteFrm += "												<td width=\"50%\">\n";
	deleteFrm += "													<table>\n";
	deleteFrm += "														<tr>\n";
	deleteFrm += "															<td class=\"infotextheadingtd\" width=\"70\">\n";
	deleteFrm += ml(t__Trip_No)+":\n";
	deleteFrm += "															</td>\n";
	deleteFrm += "															<td class=\"infotext\">\n";
	deleteFrm += "																" + load_sched_tab[1][3] + "\n";
	deleteFrm += "															</td>\n";
	deleteFrm += "														</tr>\n";
	deleteFrm += "													</table>\n";
	deleteFrm += "												</td>\n";
	deleteFrm += "												<td width=\"50%\">\n";
	deleteFrm += "												</td>\n";
	deleteFrm += "											</tr>\n";
	deleteFrm += "										</table>\n";
	deleteFrm += "									</td>\n";
	deleteFrm += "								</tr>\n";
	deleteFrm += "								<tr>\n";
	deleteFrm += "									<td align=\"center\">\n";
	deleteFrm += "										<table>\n";
	deleteFrm += "											<tr>\n";
	deleteFrm += "												<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	deleteFrm += "													\n";
	deleteFrm += "													<input type=\"hidden\" name=\"tankTerm\" value=\"" + tankTerm + "\" />\n";
	deleteFrm += "													<input type=\"hidden\" name=\"supp\" value=\"" + supp + "\" />\n";
	deleteFrm += "													<input type=\"hidden\" name=\"tripNo\" value=\""+tripNo+"\" />\n";
	deleteFrm += "													<input type=\"hidden\" name=\"op\" value=\"19\" />\n";
	deleteFrm += "													<input type=\"hidden\" name=\"cmd\" value=\"DEL\" />\n";
	deleteFrm += "													<input type=\"submit\" value=\""+ml(t__Delete)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	deleteFrm += "												</td>\n";
	deleteFrm += "											</tr>\n";
	deleteFrm += "										</table>\n";
	deleteFrm += "									</td>\n";
	deleteFrm += "								</tr>\n";
	deleteFrm += "							</table>\n";
	deleteFrm += "							</div>\n";
	deleteFrm += "					</form>\n";  
	deleteFrm += fieldstFoot_HTML();

	return deleteFrm;
}


function findForm()
{
	var findFrm = "";
	if (startDate == '-1' ||startDate == '')
	{
		//alert(mystartyear+"-"+mystartmonth+"-"+mystartday);
		startDate = makeStartDate(days);
		//alert("The startDate "+startDate);
	}

	if (endDate == '-1' ||endDate == '')
	{
		
		endDate = getEndDate();
		//alert("The endDate "+endDate);
	}
	
	if (selKeyTanker == '-1' ||selKeyTanker == '')
	{
		
		var frm_selKeyTanker = "";
		//alert("The endDate "+endDate);
	}
	else
	{
		var frm_selKeyTanker = selKeyTanker;
	}
	findFrm += "	<tr>\n";
	findFrm += "		<td align=\"center\">\n";
    findFrm += "                    <div class=\"button\"><a href=\"load_scheds.cgi"
                +"?tankTerm="+ tankTerm 
		+"&supp=" + supp 
		+"&pg=" + pg 
		+"\">"
                +ml(t__Back_to_Load_Schedule)+"</a></div><br>\n";

	findFrm += "		</td>\n";
	findFrm += "	</tr>\n";
	findFrm += "	<tr>\n";
	findFrm += "		<td>\n";
	findFrm += "			<table>\n";
	findFrm += "				<tr>\n";
	findFrm += "					<td class=\"infotextheading\">\n";
	findFrm += ml(t__Depot)+":\n";
	findFrm += "					</td>\n";
	findFrm += "					<td>\n";
	findFrm += "                      <select id=\"tankTerm\" name=\"tankTerm\" class=\"smallselect\" disabled> \n";
	findFrm += displayDropList(tankTerm,terminal,ml(t__Select_A_Depot));
	findFrm += "					</td>\n";
	findFrm += "				</tr>\n";
	findFrm += "				<tr>\n";
	findFrm += "					<td class=\"infotextheading\">\n";
	findFrm += ml(t__Supplier)+":\n";
	findFrm += "					</td>\n";
	findFrm += "					<td>\n";
	findFrm += "                 		<select name=\"supp\" id=\"supp\" class=\"smallselect\" disabled> \n";
	findFrm += displayDropList(supp, supplier, ml(t__Select_A_Supplier));
	findFrm += "					</td>\n";
	findFrm += "				</tr>\n";
	findFrm += "			</table>\n";
	findFrm += "		</td>\n";
	findFrm += "	</tr>\n";
	findFrm += fieldst_HTML(ml(t__load_schedule_search));
	findFrm += "					<form name=\"findFrm\" method=\"post\" id=\"findFrm\" onsubmit=\"return submitmyform(this)\">\n";
	findFrm += "          	<div class=\"adminform\">\n";
	findFrm += "							<table width=\"100%\">\n";
	findFrm += "								<tr>\n";
	findFrm += "									<td width=\"100%\">\n";
	findFrm += "										<table width=\"100%\">\n";
	findFrm += "											<tr>\n";
	findFrm += "												<td width=\"50%\">\n";
	findFrm += "													<table>\n";
	findFrm += "														<tr>\n";
	findFrm += "															<td class=\"infotextheadingtd\" width=\"100\">\n";
	findFrm += ml(t__Trip_No)+":\n";
	findFrm += "															</td>\n";
	findFrm += "															<td>\n";
	findFrm += "																<input type=\"text\" name=\"tripNo\" dataType=\"Custom\"  maxlength=\"10\"  regexp=\"^[0-9]\*\\d\*$\" msg=\""+ml(t__Enter_Valid_Trip_No)+"\" />\n";
	findFrm += "															</td>\n";
	findFrm += "														</tr>\n";
	findFrm += "													</table>\n";
	findFrm += "												</td>\n";
	findFrm += "												<td width=\"50%\">\n";
	findFrm += "													<table>\n";
	findFrm += "														<tr>\n";
	findFrm += "															<td class=\"infotextheadingtd\" width=\"100\">\n";
	findFrm += ml(t__Carrier)+":\n";
	findFrm += "															</td>\n";
	findFrm += "															<td>\n";
	findFrm += "																<select NAME=\"carr\" id=\"carr\" onchange=\"checkCarrier_searchFrm();\">\n";
	findFrm += displayDropList_any_All("", carrier, ml(t__Select_A_Carrier), 'A');
	
	findFrm += "															</td>\n";
	findFrm += "														</tr>\n";
	findFrm += "													</table>\n";
	findFrm += "												</td>\n";
	findFrm += "											</tr>\n";
	
	
	//Adding new row for tanker selection
	findFrm += "											<tr>\n";
	findFrm += "												<td width=\"50%\">\n";
	findFrm += "													<table>\n";
	findFrm += "														<tr>\n";
	findFrm += "															<td class=\"infotextheadingtd\" width=\"100\">\n";
	findFrm += ml(t__Tanker)+":\n";
	findFrm += "														</td>\n";
	findFrm += "															<td>\n";
	findFrm+= "<table class=\"NewActionBaseTable\">\n";
    findFrm += "<tbody>\n";
	findFrm += "<tr>\n";
	findFrm += "<td class=\"popupLinkrow\">\n";
	findFrm += "<input type=\"text\" name=\"selKeyTanker\" id=\"selKeyTanker\" value=\""+frm_selKeyTanker+"\" style=\"FONT-SIZE:1.00em\" msg=\""+ml(t__Select_a_tanker)+"\"/>\n";
	findFrm += "</td>\n";
	findFrm += "<td width=\"15\">\n";
	findFrm += "<img src=\"/images/dropimage.gif\" width=\"15\" height=\"16\" onclick=\"as2.doAjaxRequest();\">\n";
	findFrm += "</td>\n";
	findFrm += "</tr>\n";
	findFrm += "</tbody>\n";
	findFrm += "</table>\n";

	findFrm += "															</td>\n";
	findFrm += "														</tr>\n";
	findFrm += "													</table>\n";
	findFrm += "												</td>\n";
	//Status Drop list will come here
	findFrm += "												<td width=\"50%\">\n";
	//leaving this cell blank
	findFrm += "												&nbsp;\n";
	findFrm += "												</td>\n";
	findFrm += "											</tr>\n";
	
	//Ending New Row for Tanker selection

	findFrm += "											<tr>\n";
	findFrm += "												<td width=\"50%\">\n";
	findFrm += "													<table>\n";
	findFrm += "														<tr>\n";
	findFrm += "															<td class=\"infotextheadingtd\" width=\"100\">\n";
	findFrm += ml(t__Order_Ref)+":\n";
	findFrm += "														</td>\n";
	findFrm += "															<td>\n";
	findFrm += "																<input type=\"text\" name=\"ordRef\" />\n";
	findFrm += "															</td>\n";
	findFrm += "														</tr>\n";
	findFrm += "													</table>\n";
	findFrm += "												</td>\n";
	//Status Drop list will come here
	findFrm += "												<td width=\"50%\">\n";
	findFrm += "													<table>\n";
	findFrm += "														<tr>\n";
	findFrm += "															<td class=\"infotextheadingtd\" width=\"100\">\n";
	findFrm += ml(t__Trip_Status)+":\n";
	findFrm += "														</td>\n";
	findFrm += "															<td>\n";
	findFrm += "                       		<select id=\"sched_stat\" name=\"sched_stat\"> \n";
	findFrm +=displayDropList_any_All(sched_stat, scheds_stat_jslist,(ml(t__Select)), 'A');
	findFrm += "															</td>\n";
	findFrm += "														</tr>\n";
	findFrm += "													</table>\n";
	findFrm += "												</td>\n";
	findFrm += "											</tr>\n";
	
	//dates dislay starts here
	findFrm += "<tr>\n";
	findFrm += "<td width=\"50%\">\n";
	findFrm += "<table>\n";
	findFrm += "<tr>\n";
	findFrm += "<td class=\"infotextheadingtd\" width=\"100\">\n";
	findFrm += ml(t__Start_date)+" :\n";
	findFrm += "</td>\n";
	
	findFrm += "<td>\n";
	findFrm += "<input type=\"text\" name=\"startDate\" value=\""+startDate+"\" msg=\""+otherText["msg_valid_start"]+"\" readonly/>\n";
	findFrm += dateURL_HTML("document.forms[0].startDate", "date_anchor1",dateFormat,otherText["select_date"]);
	findFrm += "</td>\n";
	findFrm += "</tr>\n";
	findFrm += "</table>\n";
	findFrm += "</td>\n";
	findFrm += "<td width=\"50%\">\n";
	findFrm += "&nbsp;\n";
	findFrm += "</td>\n";
	findFrm += "											</tr>\n";
	findFrm += "											<tr>\n";
	findFrm += "												<td width=\"50%\">\n";
	findFrm += "													<table>\n";
	findFrm += "														<tr>\n";
	findFrm += "															<td class=\"infotextheadingtd\" width=\"100\">\n";
	findFrm += ml(t__End_date)+" :\n";
	findFrm += "															</td>\n";
	findFrm += "															<td>\n";
	findFrm += "																<input type=\"text\" name=\"endDate\" value=\""+endDate+"\" msg=\""+otherText["msg_valid_endDate"]+"\" readonly />\n";
	findFrm += dateURL_HTML("document.forms[0].endDate", "date_anchor2",dateFormat,otherText["select_date"]);
	findFrm += "															</td>\n";
	findFrm += "														</tr>\n";
	findFrm += "													</table>\n";
	findFrm += "												</td>\n";
	findFrm += "												<td width=\"50%\">\n";
	findFrm += "												&nbsp;\n";
	findFrm += "												</td>\n";
	findFrm += "											</tr>\n";
	//end dates display here 

	findFrm += "										</table>\n";
	findFrm += "									</td>\n";
	findFrm += "								</tr>\n";
	findFrm += "								<tr>\n";
	findFrm += "									<td align=\"center\">\n";
	findFrm += "										<table>\n";
	findFrm += "											<tr>\n";
	findFrm += "												<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	findFrm += "													<input type=\"hidden\" name=\"tankTerm\" value=\""+tankTerm+"\" />\n";
	findFrm += "													<input type=\"hidden\" name=\"supp\" value=\""+supp+"\" />\n";
	findFrm += "													<input type=\"hidden\" name=\"op\" value=\"15\" />\n";
	findFrm += "													<input type=\"submit\" value=\""+ml(t__Find)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	findFrm += "												</td>\n";
	findFrm += "											</tr>\n";
	findFrm += "										</table>\n";
	findFrm += "									</td>\n";
	findFrm += "								</tr>\n";
	findFrm += "							</table>\n";
	findFrm+= "							</div>\n";
	findFrm += "					</form>\n";
	findFrm += fieldstFoot_HTML();

	return findFrm;
}


function displayGlblFrm(supp,dep,curViewDetailState)
{
	var selected_supp = supp;
	var selected_dep = dep;

	var enabled = "";

	if((supp != "-1" && tankTerm != "-1") || (terminal.length==2 && supplier.length==2 ) )
		enabled = "";
	else
		enabled = "disabled";

	if(op != "15")
		carr = "-1";

	//alert(carr);
	
	if (startDate == '-1' ||startDate == '')
	{
		//alert(mystartyear+"-"+mystartmonth+"-"+mystartday);
		startDate = makeStartDate(days);
		//alert("The startDate "+startDate);
	}

	if (selKeyTanker == '-1' ||selKeyTanker == '')
	{
		
		var frm_selKeyTanker = "";
		//alert("The endDate "+endDate);
	}
	else
	{
		var frm_selKeyTanker = selKeyTanker;
	}
	
	
	var glblFrm = "";
	glblFrm += fieldst_HTML(ml(t__Depot_and_supplier_details));
	glblFrm += "       	<form name=\"glblFrm\" id=\"glblFrm\">\n";
	glblFrm += "          	<input type=\"hidden\" name=\"op\" value=\"0\">\n";
	glblFrm += "          	<input type=\"hidden\" name=\"pg\" value=\"1\">\n";
	glblFrm += "          	<input type=\"hidden\" name=\"startDate\" value=\""+startDate+"\">\n";
	glblFrm += "          	<input type=\"hidden\" name=\"endDate\" value=\""+endDate+"\">\n";
	glblFrm += "			<input type=\"hidden\" name=\"carr\" value=\""+carr+"\">\n";
	glblFrm += "          	<div class=\"adminform\">\n";
	glblFrm += ml(t__Select_the_Depot_and_Supplier)+", "+ml(t__To_View_Load_Schedules)+"\n";
	glblFrm += "             		<table>\n";
	
	//Adding days list
	glblFrm += "                		<tr>\n";
	glblFrm += "                   		<td class=\"infotextheading\">\n";
	glblFrm += ml(t__SRCH_Sched_last_days)+" :\n";
	glblFrm += "                   		</td>\n";
	glblFrm += "                   		<td>\n";
	glblFrm += "                       		<select id=\"days\" name=\"days\" onchange=\"return changeStartEndDates(this);\"> \n";
	glblFrm += displayDropList(days, scheds_days_jslist, "");
	glblFrm += "                   		</td>\n";
	glblFrm += "                		</tr>\n";
	
	//End the days list here
	
	//Addin Schedule Status List
	glblFrm += "                		<tr>\n";
	glblFrm += "                   		<td class=\"infotextheading\">\n";
	glblFrm += ml(t__Trip_Status)+" :\n";
	glblFrm += "                   		</td>\n";
	glblFrm += "                   		<td>\n";
	glblFrm += "                       		<select id=\"sched_stat\" name=\"sched_stat\"> \n";
	glblFrm +=displayDropList_any_All(sched_stat, scheds_stat_jslist,(ml(t__Select)), 'A');
	glblFrm += "                   		</td>\n";
	glblFrm += "                		</tr>\n";
	//Ended Adding the Schedule Status List
	//Add the Tanker selection list here
	
	glblFrm += "                		<tr>\n";
	glblFrm += "                   		<td class=\"infotextheading\">\n";
	glblFrm += ml(t__Tanker)+" :\n";
	glblFrm += "                   		</td>\n";
	glblFrm += "                   		<td>\n";
	
	glblFrm+= "<table class=\"NewActionBaseTable\">\n";
    glblFrm += "<tbody>\n";
	glblFrm += "<tr>\n";
	glblFrm += "<td class=\"popupLinkrow\">\n";
	glblFrm += "<input type=\"text\" name=\"selKeyTanker\" id=\"selKeyTanker\" value=\""+frm_selKeyTanker+"\" style=\"FONT-SIZE:1.00em\" dataType=\"Require\" msg=\""+ml(t__Select_a_tanker)+"\"/>\n";
	glblFrm += "</td>\n";
	glblFrm += "<td width=\"15\">\n";
	glblFrm += "<img src=\"/images/dropimage.gif\" width=\"15\" height=\"16\" onclick=\"as2.doAjaxRequest();\">\n";
	glblFrm += "</td>\n";
	glblFrm += "</tr>\n";
	glblFrm += "</tbody>\n";
	glblFrm += "</table>\n";
	
	
	glblFrm += "                   		</td>\n";
	glblFrm += "                		</tr>\n";
	
	
	//end adding tanker selection list here
	glblFrm += "                		<tr>\n";
	glblFrm += "                   		<td class=\"infotextheading\">\n";
	glblFrm += ml(t__Depot)+":\n";
	glblFrm += "                   		</td>\n";
	glblFrm += "                   		<td>\n";
	glblFrm += "                       		<select id=\"tankTerm\" name=\"tankTerm\" dataType=\"Require\" onchange=\"submit();\"> \n";
	glblFrm += displayDrop_ShowDefSelected(selected_dep,terminal,ml(t__Select_A_Depot));
	glblFrm += "                   		</td>\n";
	glblFrm += "                		</tr>\n";

	glblFrm += "                		<tr>\n";
	glblFrm += "                   		<td class=\"infotextheading\">\n";
	glblFrm += ml(t__Supplier)+":\n";
	glblFrm += "                   		</td>\n";
	glblFrm += "                   		<td>\n";
	glblFrm += "                       		<select name=\"supp\" id=\"supp\"  dataType=\"Require\" onchange=\"submit();\"> \n";
	glblFrm += displayDrop_ShowDefSelected(selected_supp, supplier, ml(t__Select_A_Supplier));
	glblFrm += "                       		<input type=\"button\" value=\""+ml(t__View)+"\" name=\"view\"   onclick=\"document.glblFrm.op.value=0;document.glblFrm.submit();\">\n";
	glblFrm += "                       		<input type=\"button\" value=\""+ml(t__Find)+"\" name=\"find\" id=\"find\"  onclick=\"document.glblFrm.pg.value="+pg+";document.glblFrm.op.value=5;document.glblFrm.submit();\" "+enabled+">\n";
if(enabled == "" && priv < 7){enabled = "disabled";}
	glblFrm += "                       		<input type=\"button\" value=\""+ml(t__Add)+"\" name=\"add\"   onclick=\"document.glblFrm.pg.value="+pg+";document.glblFrm.op.value=8;document.glblFrm.submit();\" "+enabled+">\n";
	glblFrm += "                         	</td>\n";
	glblFrm += "                    	</tr>\n";
	/* Not Required taking out the Load status search for the time being
	glblFrm += "                		<tr>\n";

	glblFrm += "                   		<td class=\"infotextheading\">\n";
	glblFrm += ml(t__Schedule_Status)+":\n";
	glblFrm += "                   		</td>\n";
	glblFrm += "                   		<td>\n";
	glblFrm += "                       		<select name=\"sched_status\" id=\"sched_status\"  dataType=\"Require\" onchange=\"submit();\"> \n";

	glblFrm += displayDropList_any_All(sched_status, ld_state_type, ml(t__Select_Schedule_Status), 'A');

	glblFrm += "                       		<input type=\"button\" value=\""+ml(t__View)+"\" name=\"view\"   onclick=\"document.glblFrm.op.value=0;document.glblFrm.submit();\">\n";
	glblFrm += "                       		<input type=\"button\" value=\""+ml(t__Find)+"\" name=\"find\" id=\"find\"  onclick=\"document.glblFrm.pg.value="+pg+";document.glblFrm.op.value=5;document.glblFrm.submit();\" "+enabled+">\n";
    if(enabled == "" && priv < 7)
	{
		enabled = "disabled";
	}
	glblFrm += "                       		<input type=\"button\" value=\""+ml(t__Add)+"\" name=\"add\"   onclick=\"document.glblFrm.pg.value="+pg+";document.glblFrm.op.value=8;document.glblFrm.submit();\" "+enabled+">\n";
	glblFrm += "                         	</td>\n";
	glblFrm += "                    	</tr>\n";
	*/

	glblFrm += "              	</table>\n";
	glblFrm += "\n";
	glblFrm += "            	</div>\n";
	glblFrm += "        	</form>\n";
	glblFrm += fieldstFoot_HTML();
	return glblFrm;

}

function nextPage()
{
	var next = "";
	next += "<tr>\n";
	next +=	"	<td align=\"center\">\n";

	if(pg < 1)
	{
		pg = 1;	
	}
	if (pg > 1){
		next += "<a href=\"javascript:document.glblFrm.pg.value=pg-1;document.glblFrm.op.value=op;document.glblFrm.submit();\">"+ml(t__Previous)+"</a>\n";
	}
	next += "&nbsp; Current=" + pg;
	next += "/";
	next += pagesTotal;
	if (pagesTotal > pg)
	{
		next += "&nbsp; <a href=\"javascript:document.glblFrm.pg.value=pg+1;document.glblFrm.op.value=op;document.glblFrm.submit();\">"+ml(t__Next)+"</a>\n";
	}

	next += "	</td>\n";
	next += "</tr>\n";

	if(pagesTotal == 0)
	{
		next = "";
	}

	return next;   
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
		pageHeading +=ml(t__LOAD_SCHEDULES);
	}
	else if(op == opDel)   //9
	{
		pageHeading +=ml(t__DELETE_LOAD_SCHEDULES);
	}
	else if(op == opAdd)   //8
	{
		pageHeading +=ml(t__ADD_NEW_LOAD_SCHEDULES);
	}
	else if(op == opMod)   //7
	{
		pageHeading +=ml(t__MODIFY_LOAD_SCHEDULES);
	}
	else if(op == opFind)   //5
	{
		pageHeading +=ml(t__FIND_LOAD_SCHEDULES);
	}



	return pageHeading;   
}

function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;
	pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Load_Schedules_Page);
	return pageTitle;
}

function showinPagePopup(whichObject, whichPopup, whichFile)
{
	var myPopUpObject;
	myPopUpObject = whichObject;
	myPopUpObject.setUrl(whichFile);
	myPopUpObject.showPopup(whichPopup);
}

/* define function op_list() */
function op_list(priv, loaded, state, loadId)
{
	/* priv = 
	   6 modify	op=1,2,3
	   7 add		op=4
	   8 delete	op=5
	 */
	var ops_list ="";
	ops_list += "<select name=op onchange=\"sendoption(this, "+loaded+", '"+state+"', "+loadId+");\">          ";
	switch (priv)
	{
		case 8:
			ops_list +="<option value=9>" + commText["Delete"] + "</option>";
		case 7:
			ops_list +="<option value=7>" + commText["Modify"] + "</option>";
		case 6:

		case 5:
			ops_list += "<option value=2>" + actions["specByCmprtmnt"] +"</option>";
			ops_list += "<option value=3>" + actions["specByProduct"] +"</option>";
			ops_list += "<option value=4>" + actions["printBOL"] +"</option>";
			// Not reqd  ops_list +="<option value=10>5 10 LOAD KEY ASSOCIATION</option>";
			ops_list += "<option value=11>" + actions["printDriverInstr"] +"</option>";
			ops_list += "<option value=12>" + actions["tankerReturns"] +"</option>";
			// Not reqd  ops_list +="<option value=13>5 13 PRINT DELIVERY INSTRUCTIONS</option>";
			// NOT REQUIRED FOR CHINA ops_list += "<option value=14>" + actions["authLoad"] +"</option>";
			// NOT REQUIRED FOR CHINA ops_list += "<option value=15>" + actions["enterLdDets"] +"</option>";
			// Not reqd  ops_list +="<option value=16>5 16 DELIVERY VERIFICATION</option>";
			// Not reqd  ops_list +="<option value=17>5 17 PRINT TRUCK SCHEDULE</option>";
			// not required      ops_list +="<option value=18>PRODUCT MOVEMENT WATCH</option>";
			// NOT REQUIRED FOR CHINA ops_list += "<option value=19>" + actions["unloadSpec"] +"</option>";
			break;
	}
	ops_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
	ops_list +="</select>                                        ";
	return ops_list ;
}

function makeStartDate(howmanyDays)
{
	var startDate="";
	var mystartDate=new Date();
	mystartDate.setDate(mystartDate.getDate()-(howmanyDays-1));
	var mystartyear = String(mystartDate.getFullYear());
	var mystartmonth = String((mystartDate.getMonth()+1)) ;
	var mystartday = String(mystartDate.getDate());
	if (mystartmonth.length==1)mystartmonth = "0"+mystartmonth;
	if (mystartday.length==1)mystartday = "0"+mystartday;

	//alert(mystartyear+"-"+mystartmonth+"-"+mystartday);
	startDate = mystartyear+"-"+mystartmonth+"-"+mystartday;
	return startDate;
}
function getEndDate()
{
	var endDate="";
	var myendDate=new Date();
	myendDate.setDate(myendDate.getDate()+1);
	var myendyear = String(myendDate.getFullYear());
	var myendmonth = String((myendDate.getMonth()+1)) ;
	var myendday = String(myendDate.getDate());
	if (myendmonth.length==1)myendmonth = "0"+myendmonth;
	if (myendday.length==1)myendday = "0"+myendday;
	endDate = myendyear+"-"+myendmonth+"-"+myendday;
	return endDate
}
function takeMintsGenFuturDate(minutesToAdd)
{
	
	var futureDate="";
	var mydateTime = new Date(); //my current date and time
	var currentTime = new Date(); // this object will be used to create new date and time
	if(minutesToAdd>0)
	currentTime.setMinutes(mydateTime.getMinutes()+minutesToAdd)
	currentTime.setDate(currentTime.getDate()); // javascript always return 0-30
	var myendyear = String(currentTime.getFullYear());
	var myendmonth = String((currentTime.getMonth()+1)) ; //javascript always return 0-11
	var myendday = String(currentTime.getDate());
	if (myendmonth.length==1)myendmonth = "0"+myendmonth;
	if (myendday.length==1)myendday = "0"+myendday;
	futureDate = myendyear+"-"+myendmonth+"-"+myendday;
	return futureDate;
}
function takeMintsGenFuturTime(minutesToAdd)
{
	
	var futureTime="";
	var mydateTime = new Date(); //my current date and time
	var currentTime = new Date(); // this object will be used to create new date and time
	if(minutesToAdd>0)
	currentTime.setMinutes(mydateTime.getMinutes()+minutesToAdd)
	var currentHours = currentTime.getHours ( );
	var currentMinutes = currentTime.getMinutes ( );
	var currentSeconds = currentTime.getSeconds ( );
	currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
	currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
	var timeOfDay = ( currentHours < 12 ) ? "am" : "pm";
	currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
	currentHours = ( currentHours == 0 ) ? 12 : currentHours;
	futureTime = currentHours+":"+currentMinutes+" "+timeOfDay;
	return futureTime;
}
/*getDetailStatus translates the key passed from the database
  *to the human readable text
  * based upon scheds_stat_jslist.
  */
function getDetailStatus(myKey)
{
	var mystat_text="";
	if (myKey=='-1')// that is any all selected
	{
		return mystat_text;
	}
	for (var i=1;i<scheds_stat_jslist.length;i++)
	{
		//alert("Pssed to me  "+ armCode +" and drawProdSelected "+drawProdSelected );
		if ((scheds_stat_jslist[i][0]==myKey) )
		{
			mystat_text= scheds_stat_jslist[i][1];
			return mystat_text;
		}
	}
	
	return mystat_text;
}
function changeStartEndDates(myobject)
{
	
	var myNewStDate="";
	var myNewEnDate="";
	var homanyDays = parseInt(myobject.value);
	if(homanyDays<=0)homanyDays=10;
	myNewStDate = makeStartDate(homanyDays);
	document.glblFrm.startDate.value=myNewStDate;
	//Now making the End Date using same function
	myNewEnDate = makeStartDate((homanyDays-10));
	document.glblFrm.endDate.value=myNewEnDate;
	
	//alert("From Drop list startDate "+document.glblFrm.startDate.value)
	//alert("From Drop list endDate "+document.glblFrm.endDate.value)
	return true;
	
}
function convertToDateTime(op1, op2)
{
	if(op1.length < op2.length)
	{
		var tmp = op2;
		op2 = op1;
		op1 = tmp;
	}
	
	var year = op1.substring(0,4);
	//var mmm = op1.substring(5,7);
	var month = parseInt(op1.substring(5,7),10)-1; //months are always 0-11
	var day = op1.substring(8,10);
	var hour = parseInt(op2. substring (0,op2.indexOf(':')));
	var minutes = op2.substring((op2.indexOf(':')+1),op2.indexOf(" "));
	//alert(year +" AND "+month +" AND "+day +" AND "+ hour+" AND "+minutes);	
	return new Date(year, month, day, hour, minutes);
	
}
/*extract_datefrmDBRsult responsible for parsing the yyyy-mm-dd date format
 * from DB we recieve yyyy-mm-dd hh24:min
* and return one string as a date
 */
function extract_datefrmDBRsult(dateString)
{
	var myExpiryDate="";

	if(dateString.length>0 && dateString!=="")
	{
		var year = dateString.substring(0,4);
		//var mmm = op1.substring(5,7);
		var month = dateString.substring(5,7); //months are always 1-12
		var day = dateString.substring(8,10);
		myExpiryDate = year+"-"+month+"-"+day;
	}

	return myExpiryDate;
	
}
/*extract_timefrmDBRsult responsible for parsing the time
  * it could be 12 hour clock or 24 hour clock
 * from DB we recieve yyyy-mm-dd hh24:min
* and return one string as a date
* convertToJsTime set to false if want hours -1 (0-23)
 */
function extract_timefrmDBRsult(dateString, convertToAmPM, convertToJsTime)
{
	var myExpiryTime="";
	var timeOfDay =""; //could be am or pm
	if(dateString.length>0 && dateString!=="")
	{
		var currentHours = dateString.substring((dateString.indexOf(" ")+1),dateString.indexOf(':'));
		var currentMinutes = dateString.substring((dateString.indexOf(':')+1),dateString.length);
		if (currentMinutes.indexOf(':')>0) //means minutes have seconds as well so separate the seconds only need minutes
		{
			var currentMinutes = currentMinutes.substring(0,currentMinutes.indexOf(':'));
		}
		if(convertToAmPM==true)
		{
			var timeOfDay = ( currentHours < 12 ) ? "am" : "pm";
			currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
			currentHours = ( currentHours == 0 ) ? 12 : currentHours;
		}
		
		currentHours = ( convertToJsTime ==true ) ? currentHours - 1 : currentHours;
		myExpiryTime = currentHours+":"+currentMinutes+" "+timeOfDay;
	}
	//alert("extract_timefrmDBRsult returns "+myExpiryTime);
	return myExpiryTime;
	
}
//convert the screen date and time to one string so can be submitted to database
function convertToDateTimeStamp(op1, op2)
{
	var myExpiryDateTimeStamp="";
	if(op1.length < op2.length)
	{
		var tmp = op2;
		op2 = op1;
		op1 = tmp;
	}
	
	var year = op1.substring(0,4);
	//var mmm = op1.substring(5,7);
	var month = op1.substring(5,7); //months are always 0-11
	var day = op1.substring(8,10);
	var amorpm = op2.substring((op2.indexOf(' ')+1),op2.length);
	var hour = op2. substring (0,op2.indexOf(':'));
	hour = ( amorpm =="pm" && hour<12) ? parseInt(hour) + 12 : hour;
	var minutes = op2.substring((op2.indexOf(':')+1),op2.indexOf(' '));
	//alert(year +" AND "+month +" AND "+day +" AND "+ hour+" AND "+minutes+" AND "+amorpm);
	myExpiryDateTimeStamp = year+"-"+month+"-"+day+" "+hour+":"+minutes+":00";//just seconds are 00
	return myExpiryDateTimeStamp;
	
}
