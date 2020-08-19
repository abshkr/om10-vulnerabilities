	//This file use unique version for multi-language.
	var t__Additive_Tank = ["Additive Tank","��Ӽ��͹�"];
	var t__Arm = ["                       				Arm","                       				�׹�"];
	var t__Arm = ["Arm","�׹�"];
	var t__Arm_Code = ["Arm Code","�׹ܱ��"];
	var t__Back_to_Enter_Load_Details = ["Back to Enter Load Details","����ģ�����뷢����"];
	var t__Back_to_Load_Schedules_Page = ["Back to Load Schedules Page","���ط������͹���ҳ��"];
	var t__Base_Product = ["Base Product","������Ʒ����"];
	var t__Cmpt_No = ["Cmpt No","�Ͳֺ�"];
	var t__Compartment = ["                       				Compartment","                       				�Ͳ�"];
	var t__Current = ["Current","��ǰҳ"];
	var t__Date = ["                       				Date","                       				����"];
	var t__DKI_Omega_Menu = ["DKI Omega Menu","���Omegaϵͳ�˵�"];
	var t__Drawer = ["                       				Drawer","                       				��Ʒ���乫˾"];
	var t__ENTER_LOAD_DETAILS = ["ENTER LOAD DETAILS","ģ�����뷢����"];
	var t__Enter_Load_Details_Page = ["Enter Load Details Page","ģ�����뷢��������ҳ��"];
	var t__Injector = ["Injector","ע����"];
	var t__Loaded_Qty = ["Loaded Qty","�ѷ�����"];
	var t__Loader = ["                       				Loader","                       				������"];
	var t__LOAD_SCHEDULES = ["LOAD SCHEDULES","�������͹���"];
	var t__Main_Tank = ["Main Tank","���͹�"];
	var t__Meter = ["Meter","������"];
	var t__Next = ["Next","��һҳ"];
	var t__Previous = ["Previous","��һҳ"];
	var t__Product_Code = ["                       				Product Code","                       				��Ʒ����"];
	var t__Product_Code = ["Product Code","��Ʒ����"];
	var t__Product_Name = ["                       				Product Name","                       				��Ʒ����"];
	var t__Product_Name = ["Product Name","��Ʒ����"];
	var t__Quantity = ["                       				Quantity","                       				����"];
	var t__Quantity = ["Quantity","����"];
	var t__Supplier = ["                       				Supplier","                       				��Ӧ��"];
	var t__Tank = ["Tank","�͹�"];
	var t__Tanker = ["                       				Tanker","                       				�Ͳ۳�"];
	var t__Terminal = ["                       				Terminal","                       				�Ϳ�"];
	var t__Time = ["                       				Time","                       				ʱ��"];
	var t__Trip = ["                       				Trip","                       				�ᵥ"];
	var t__Unit = ["                       				Unit","                       				��λ"];
	var t__Unit = ["Unit","��λ"];
	var t__VIEW = ["VIEW","�鿴"];
	var t__View_Load_Details_Page = ["View Load Details Page","�鿴������Ϣ"];
	var t__YOUR_ACTION = ["YOUR ACTION","��ѡ��"];
	/*
	 * g_opInf Hash table defined in utility.js 
	 * for notifying the user about success or failuer
	 * of an action performed on that page.   
	 * l_opInf defined locally.
	 * 
	 */		   
	var l_opInf= new Array()
	for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
	l_opInf[28]= "Successfully Printed Driver Instructions!";
	l_opInf[38]= "Print of Driver Instructions Failed!";

	// all the rest of the text on the report scheduling Page
	var otherText = new Array();
	otherText["pgTitle_rptsched"] =  "Load Schedule, Driver Instructions";
	otherText["pgHead"] = "Print Driver Instructions";
	otherText["viewDLI"] = "View Driver Instructions";
	otherText["print_drv_instr_frm"] = "print driver instructions form";
	otherText["btn_back"] = "Back to Load Schedules Page";
	otherText["supp"] = "Supplier";
	otherText["drawer"] = "Drawer";
	otherText["carrier"] ="Carrier";
	otherText["equip"] ="Equiptment";
	otherText["prfile"] ="Profile";
	otherText["trip_shift"] ="Trip/Shift";
	otherText["del_date"] ="Delivery Date";
	otherText["load_status"] =	"Load Status";
	otherText["tank_type"] =	"Tanker Type";
	otherText["term"] =	"Terminal";
if (js_lang == 'cn')
{
	l_opInf[28]= "��ӡ����ָ����ɹ�!";
	l_opInf[38]= "��ӡ����ָ����ʧ��!";
	otherText["pgTitle_rptsched"] =  "���Ͷ���, ��ӡ����ָ����";
	otherText["pgHead"] = "��ӡ����ָ����";
	otherText["viewDLI"] = "�鿴����ָ����";
	otherText["print_drv_instr_frm"] = "��ӡ����ָ����";
	otherText["btn_back"] = "���ط��Ͷ���";
	otherText["supp"] = "��Ӧ��";
	otherText["drawer"] = "������";
	otherText["carrier"] ="������";
	otherText["equip"] ="�豸";
	otherText["prfile"] ="�趨";
	otherText["trip_shift"] ="�ᵥ/���";
	otherText["del_date"] ="��������";
	otherText["load_status"] =	"װ��״̬";
	otherText["tank_type"] =	"�Ͳ۳�����";
	otherText["term"] =	"�Ϳ�";
}
	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 1,2,3,4,5,11,21, 15,16, 19, 28,38];
	var ops_req_search = [-1, 1,2,3,4,5,11,21, 15,16, 19,28, 38];// search never required on this page					

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
		newPage += local_HeadrHTML(newPage, lang);  
		newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
		newPage += "\n";
		newPage +="<tr>\n";  
		newPage +="<td width=\"100%\">             \n";
		newPage +="<div class=\"content\" id=\"content\">\n";
		newPage += "<div id=\"printReady\">";
		newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
		newPage +="<tbody>\n";   

		//start after the global form
		if (curViewDetailState <= 4 || curViewDetailState > 10) // view records
		{
			newPage +=displayPrintFrm();

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

		//alert(newPage); 
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
	function cmpy_field(attr)
	{
		var fieldHTML ="";
		fieldHTML +="<input name=\"supp\" id=\"supp\" value=\""+supp+"\" "+attr+" >\n";
		return fieldHTML;
	}
	function tripNo_field(attr)
	{
		var fieldHTML ="";
		fieldHTML +="<input name=\"tripNo\" id=\"tripNo\" value=\""+tripNo+"\" "+attr+" >\n";
		return fieldHTML;
	}
	function loadId_field(attr)
	{
		var fieldHTML ="";
		fieldHTML +="<input name=\"loadId\" id=\"loadId\" value=\""+loadId+"\" "+attr+" >\n";
		return fieldHTML;
	}
	function termId_field(attr)
	{
		var fieldHTML ="";
		fieldHTML +="<input name=\"tankTerm\" id=\"tankTerm\" value=\""+tankTerm+"\" "+attr+" >\n";
		return fieldHTML;
	}

	function updatePageHeading(op,pgHead)
	{
		var pageHeading = pgHead;
		if (op <= 4 || op > 10)
		{
			pageHeading +=otherText["pgHead"];
		}

		return pageHeading;   
	}
	function updatePageTitle(op,pgTit)
	{
		var pageTitle = pgTit;
		if (op <= 4 || op > 10)
		{
			pageTitle +=otherText["pgTitle_rptsched"];

		} 
		return pageTitle;
	}
	function displayPrintFrm()
	{
		var addFrmhtml ="";
		addFrmhtml +=backToBtn_HTML();
		addFrmhtml +=displayInfo();
		addFrmhtml +=displayStatusMsg (op);
		addFrmhtml += fieldst_HTML(otherText["print_drv_instr_frm"]);
		addFrmhtml += "                            <div class=\"adminform\">\n";
		addFrmhtml +="<table width=\"100%\">\n";
		addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",
				"&nbsp;" ); 
		addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"drv_instr.cgi\" onsubmit=\"return submitmyform(this)\">\n";
		addFrmhtml += termId_field("type=\"hidden\"");
		addFrmhtml += cmpy_field("type=\"hidden\"");
		addFrmhtml += tripNo_field("type=\"hidden\"");  
		//addFrmhtml +=frmButtRow_HTML(otherText["pgHead"], 0);                  
		addFrmhtml +="							   </td>\n";
		addFrmhtml +="							 </tr>\n";
		//frmButtRow_HTML("Add", 1);
		addFrmhtml +=op_field (18);
		addFrmhtml += "                    </form>\n";  
		addFrmhtml += "	<tr>\n";
	addFrmhtml += "		<td align=\"center\" height=\"30px\">\n";

//button for View DLI 
//ftsize: font size; rows: number of rows; forms: number of forms
	addFrmhtml += "			<span class=\"button\"><a href=\"drv_instr_popup.cgi?tankTerm="+tankTerm+"&supp="+supp+"&tripNo="+tripNo+"&ftsize="+"12"+"&forms="+"1"+"&rows="+"1"+"\" target=\"_blank\">"+otherText["viewDLI"]+"</a>\n";
	addFrmhtml += "	</span>\n";
	addFrmhtml += "	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n";

	addFrmhtml += "			<span class=\"button\"><a href=\"#\" onClick=\"document.addNew.submit();\">"+otherText["pgHead"]+"</a>\n";
	addFrmhtml += "	</span>\n";
	addFrmhtml += "	</br>\n";
	addFrmhtml += "		</td>\n";
	addFrmhtml += "	</tr>\n";

		addFrmhtml +="							</table>\n";
        	addFrmhtml +="							</div>\n";  
		                    
		addFrmhtml += fieldstFoot_HTML();
		return addFrmhtml;
	}
	function backToBtn_HTML()
	{
		var button ="";
		button += " 	<form name=\"glblFrm\" id=\"glblFrm\">\n";
		button += "			<input type=\"hidden\" name=\"tankTerm\" value=\""+tankTerm+"\" />\n";
		button += "			<input type=\"hidden\" name=\"supp\" value=\""+supp+"\" />\n";
		button += "			<input type=\"hidden\" name=\"tripNo\" value=\""+tripNo+"\" />\n";
		button += "			<input type=\"hidden\" name=\"op\" value=0 />\n";
		button += "			<input type=\"hidden\" name=\"pg\" value=1 />\n";
		button += "		</form>\n";

		button += "	<tr>\n";
		button += "		<td align=\"center\">\n";
		button += "			<div class=\"button\"><a href=\"#\" onClick=\"document.glblFrm.tripNo.value='-1';document.glblFrm.action='load_scheds.cgi';document.glblFrm.submit();\">"+otherText["btn_back"]+"</a>\n";
		button += "	</div>\n";
		button += "	</br>\n";

		button += "		</td>\n";
		button += "	</tr>\n";
		return button;
	} 
	function displayInfo()
	{
		var infoPage ="";

		infoPage += " <tr>\n";
		infoPage += " 	<td align=\"left\">\n";
		infoPage += "       	<form name=\"infoPage\" id=\"infoPage\">\n";
		infoPage += "       	<div class=\"adminform\">\n";
		infoPage += "             <table width=\"100%\">\n";
		infoPage += "                	<tr>\n";
		infoPage += "						<td width=\"50%\">\n";
		infoPage += "							<table>\n";
		infoPage += "								<tr>\n";
		infoPage += "                   				<td class=\"infotextheading\">\n";
		infoPage += ml(t__Trip)+":\n";
		infoPage += "                   				</td>\n";
		infoPage += "                   				<td class=\"infotext\">\n";
		infoPage += "										" +tripno;
		infoPage += "                   				</td>\n";
		infoPage += "                				</tr>\n";
		infoPage += "                				<tr>\n";
		infoPage += "                   				<td class=\"infotextheading\">\n";
		infoPage += ml(t__Tanker)+":\n";
		infoPage += "                   				</td>\n";
		infoPage += "                   				<td class=\"infotext\">\n";
		infoPage += "										" +tanker;
		infoPage += "                   				</td>\n";
		infoPage += "                 			</tr>\n";
		infoPage += "                				<tr>\n";
		infoPage += "                   				<td class=\"infotextheading\">\n";
		infoPage += ml(t__Date)+":\n";
		infoPage += "                   				</td>\n";
		infoPage += "                   				<td class=\"infotext\">\n";
		infoPage += "										" +date ;
		infoPage += "                   				</td>\n";
		infoPage += "                				</tr>\n";
		infoPage += "                				<tr>\n";
		infoPage += "                   				<td class=\"infotextheading\">\n";
		infoPage += ml(t__Time)+":\n";
		infoPage += "                   				</td>\n";
		infoPage += "                   				<td class=\"infotext\">\n";
		infoPage += "										" +time;
		infoPage += "                   				</td>\n";
		infoPage += "                				</tr>\n";
		infoPage += "							</table>\n";
		infoPage += "						</td>\n";
		infoPage += "						<td width=\"50%\">\n";
		infoPage += "							<table>\n";
		infoPage += "								<tr>\n";
		infoPage += "                   				<td class=\"infotextheading\">\n";
		infoPage += ml(t__Supplier)+":\n";
		infoPage += "                   				</td>\n";
		infoPage += "                   				<td class=\"infotext\">\n";
		infoPage += "										" +suppNm;
		infoPage += "                   				</td>\n";
		infoPage += "                				</tr>\n";
		infoPage += "                				<tr>\n";
		infoPage += "                   				<td class=\"infotextheading\">\n";
		infoPage += ml(t__Drawer)+":\n";
		infoPage += "                   				</td>\n";
		infoPage += "                   				<td class=\"infotext\">\n";
		infoPage += "										" +drawerNm;
		infoPage += "                     			</td>\n";
		infoPage += "                 			</tr>\n";
		infoPage += "                				<tr>\n";
		infoPage += "                   				<td class=\"infotextheading\">\n";
		infoPage += ml(t__Loader)+":\n";
		infoPage += "                   				</td>\n";
		infoPage += "                   				<td class=\"infotext\">\n";
		infoPage += "										" +loader;
		infoPage += "                   				</td>\n";
		infoPage += "                				</tr>\n";
		infoPage += "                				<tr>\n";
		infoPage += "                   				<td class=\"infotextheading\">\n";
		infoPage += ml(t__Terminal)+":\n";
		infoPage += "                   				</td>\n";
		infoPage += "                   				<td class=\"infotext\">\n";
		infoPage += "										" +termNm;
		infoPage += "                   				</td>\n";
		infoPage += "                				</tr>\n";
		infoPage += "							</table>\n";
		infoPage += "						</td>\n";
		infoPage += "                	</tr>\n";
		infoPage += "         	</table>\n";
		infoPage += "            </div>\n"; 
		infoPage += "        	</form>\n";
		infoPage += " 	</td>\n";
		infoPage += "	</tr>\n";
		return infoPage;  	

	}
	/* define local_HeadrHTML() 
	 * responsible for adding the include 
	 * and functions to the head section of this page 
	 */
	function local_HeadrHTML(newPage, lang)
	{
		newPage +="<SCRIPT src=\"/"+lang+"/js/next.js\"></SCRIPT>\n";
		newPage +="<SCRIPT src=\"/"+lang+"/js/CalendarPopup.js\"></SCRIPT>\n";
		newPage +="<SCRIPT LANGUAGE=\"JavaScript\">\n";
		newPage +="\n";
		newPage +="//Calendar Variable\n";
		newPage +="	var cal = new CalendarPopup();\n";
		newPage +="	cal.showYearNavigation();\n";
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
		newPage +="/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
		newPage +="[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
		newPage +="'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
		newPage +="function submitAction(myobject,frmNum)\n";
		newPage +="{\n";
		newPage +=    "var myselectedvalue = myobject.options[myobject.selectedIndex].value;";
		newPage +="   if(myselectedvalue==\"19\")\n";
		newPage += "  {\n";

		newPage += "      eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
		newPage += "      return false;\n";


		newPage +="   }\n";
		newPage +="   else\n";
		newPage += "  {\n";
		newPage += "    eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
		newPage += "    return true;\n";
		newPage +="   }\n";

		newPage +="}\n";
		newPage +="</script>\n";
		newPage += "</head>\n";
		newPage += "<body>\n";
		return (newPage);
	}



