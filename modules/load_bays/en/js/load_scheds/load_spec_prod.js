/**********************************************
 *
 * $Id: load_spec_prod.js,v 1.31 2011/06/21 03:45:17 abs Exp $
 *
 *********************************************/

//This file use unique version for multi-language.
var t__are_mandatory = ["are mandatory","的项目必填"];
var t__Add = ["Add","新增"];
var t__Add_Load_Spec_by_Product_Page = ["Add Load Spec by Product Page","新增依据油品发油概要页"];
var t__Add_New_Load_Spec = ["Add New Load Spec","新增发油概要"];
var t__ADD_NEW_LOAD_SPEC_BY_PRODUCT = ["ADD NEW LOAD SPEC BY PRODUCT","新增依据油品发油概要"];
var t__All_the_fields_labelled_with_an = ["										All the fields labelled with an ","										所有带"];
var t__Back_to_Load_Schedules_Page = ["Back to Load Schedules Page","返回发油订单管理页"];
var t__Back_to_Load_Spec_by_Product = ["Back to Load Spec by Product","返回依据油品发油概要"];
var t__Cancel = ["Cancel","取消"];
var t__Carrier = ["                       				Carrier","                       				承运商"];
var t__Delivery_Date = ["                       				Delivery Date","                       				交付日期"];
var t__disabled = ["disabled","无效"];
var t__DKI_Omega_Menu = ["DKI Omega Menu","达基国际Omega系统菜单"];
var t__Do_you_really_want_to_modify_drawer = ["Do you really want to modify drawer","您确定要修改提油者吗"];
var t__Drawer = ["                       				Drawer","                       				提油者"];
var t__Drawer_cannot_be_used_with_these_products = ["Drawer cannot be used with these products","提油者不能应用这些油品"];
var t__Edit_Text = ["Edit Text","编辑文字"];
var t__Insert_New_Record_Failed = ["Insert New Record Failed","插入新纪录失败"];
var t__Loaded = ["Loaded","已装"];
var t__LOAD_SCHEDULES = ["LOAD SCHEDULES","发油订单管理"];
var t__LOAD_SPEC_BY_PRODUCT = ["LOAD SPEC BY PRODUCT","依据油品的发油概要"];
var t__Load_Spec_by_Product_Page = ["Load Spec by Product Page","依据油品的发油概要页"];
var t__Load_Spec_Details = ["Load Spec Details","发油概要详情"];
var t__Load_Spec_is_NOT_new__cannot_modify = ["Load Spec is NOT new, cannot modify","发油概要不是新的，不能修改"];
var t__Load_Status = ["                       				Load Status","                       				发油状态"];
var t__MOD = ["MOD","修改"];
var t__Modify = ["Modify","修改"];
var t__MODIFY = ["MODIFY","修改"];
var t__MODIFY_LOAD_SPEC_BY_PRODUCT = ["MODIFY LOAD SPEC BY PRODUCT","修改依据油品的发油概要"];
var t__Next = ["Next","下一个"];
var t__NULL = ["NULL","空"];
var t__Preloaded = ["Preloaded","预装"];
var t__Previous = ["Previous","前一个"];
var t__Product = ["																 Product","																 油品"];
var t__Product = ["Product","油品"];
var t__Profile = ["                       				Profile","                       				属性"];
var t__Remaining = ["Remaining","剩余"];
var t__Reset = ["Reset","重置"];
var t__Save = ["Save","保存"];
var t__Scheduled = ["Scheduled","已调度"];
var t__Schedule_Qty = ["																Schedule Qty","																调度量"];
var t__Select_A_Drawer = ["Select A Drawer","选择提油者"];
var t__Select_An_Unit = ["Select An Unit","选择计量单位"];
var t__Select_A_Product = ["Select A Product","选择油品"];
var t__Special_Document_Variables = ["Special Document Variables","特殊文档变量"];
var t__SPECIAL_INSTRUCTION = ["SPECIAL INSTRUCTION","特殊说明"];
var t__SPECIAL_INSTRUCTIONS = ["SPECIAL INSTRUCTIONS","特殊说明"];
var t__Successfully_Inserted_A_New_Record = ["Successfully Inserted A New Record ","成功插入一条新记录"];
var t__Successfully_Updated = ["Successfully Updated","成功更新"];
var t__Supplier = ["                       				Supplier","                       				供应商"];
var t__Tanker_Type = ["                       				Tanker Type","                       				油槽车类型"];
var t__Terminal = ["                       				Terminal","                       				油库"];
var t__Trip_Shift = ["                       				Trip/Shift","                       				提单/班次"];
var t__Unit = ["																Unit","																单位"];
var t__Unit = ["Unit","单位"];
var t__Update_Failed = ["Update Failed","更新失败"];
var t__Update_Load_Spec_by_Product_Page = ["Update Load Spec by Product Page","更新依据油品发油概要页"];
var t__Update_Special_Instructions = ["Update Special Instructions","更新特殊说明"];
var t__View_All = ["View All","显示全部"];
var t__YOUR_ACTION = ["YOUR ACTION","请选择"];
var t__Equiptment_1 = ["                       				Equiptment 1","                       				运输设备1"];
var t__Error__already_scheduled_BY_COMPARTMENT = ["Error: already scheduled BY COMPARTMENT","错误：已经依据油仓调度"];
var t__Error__already_enough_PRODUCTS = ["Error: Number of products will exceed number of compartments","错误：油品数目将会超过该油槽车的油仓总数"];
var t__Trip_Details = ["Trip Details","提单详情"];
var t__Enter    = [" Enter"    ,"请输入"];
var t__Schedule_Qty = [" Schedule Qty" ,"调度量"];
var t__between  = [" between"  ,"介于"];


var myColumns = [ml(t__Product), ml(t__Unit), ml(t__Scheduled), ml(t__Loaded), ml(t__Preloaded), ml(t__Remaining)];


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

	l_opInf[20]= ml(t__Successfully_Updated)+"!";
l_opInf[27]= ml(t__Successfully_Updated)+"!";
l_opInf[28]= ml(t__Successfully_Inserted_A_New_Record)+"!";
l_opInf[30]= ml(t__Update_Failed)+"!";
l_opInf[37]= ml(t__Update_Failed)+"!";
l_opInf[38]= ml(t__Insert_New_Record_Failed)+"!";
l_opInf[40]= ml(t__Update_Failed)+"! "+ml(t__Drawer_cannot_be_used_with_these_products);

/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    		
var ops_req_print = [-1, 1,2,3,5, 15,23,24, 25,26,27, 33,34, 35, 28,38,48,36,27,37,47,133,134,135,137];
var ops_req_search = [-1, 1,2,3,5, 15,23,24, 25,26,27, 33,34, 35,28,38,48,36,27,37,47,133,134,135,137];// search never required on this page		

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

	newPage += printHdr(newPage, updatePageTitle(curViewDetailState, pageTitle), lang);
	newPage += local_HeadrHTML(newPage, lang);  
	newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));
	newPage += "\n";
	newPage +="<tr>\n";  
	newPage +="<td width=\"100%\">             \n";
	newPage +="<div class=\"content\" id=\"content\">\n";
	newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
	newPage +="<tbody>\n";   
	
    newPage += statusbarRowHTML(statusBar); 
    newPage += displayStatusMsg (op);

	if (curViewDetailState <= 3 || curViewDetailState > 15) // view records
	{

		newPage += addButton();

		newPage += "<tr>\n";
		newPage += "	<td>\n";
		newPage += "		<div id=\"printReady\">\n";
		newPage += "		<table width=\"100%\">\n";

		newPage += displayInfo();

		if( ((myColumns.length)> 0))
		{
			newPage += "<tr> \n";
			newPage += "	<td>\n ";
			newPage += table_begin("M", 0,"");
			newPage += "			<tbody> \n";
			newPage += "				<tr>";

			for(var i=0; i<myColumns.length; i++)
			{
				newPage += "<td>"+myColumns[i]+"<\/td>";
			}
			newPage += "<\/tr>";


			for(i in load_spec_prod_tab)
			{
							// Fix the Bug Id 1657
				if(i>0 && ((load_spec_prod_tab[i][4].length)>0)|| ((load_spec_prod_tab[i][7].length)>0)) 
				{
					newPage += "<tr class=\"row1\">\n";

					var howmanyDone = 1;
					for(var j=0; j<myColumns.length; j++)
					{

						if (curColumnToSort == howmanyDone)
						{
							newPage += "<td style=\"background-color:#EEEEEE\">" + obs(load_spec_prod_tab[i][howmanyDone]) + "<\/td>";
						} 
						else 
						{

							if(howmanyDone == 1) // means time to display the drop list and table
							{
								newPage += "<td width=\"40%\">\n";				  
								newPage +="   <form name=\"optionsFrm_"+load_spec_prod_tab[i][howmanyDone]+"\" id=\"optionsFrm\" method=\"get\">\n";
								newPage +="       <table border=\"0\" width=\"100%\" >\n";
								newPage +="	       <tr>\n";
								newPage +="                 <td> \n"; 
								newPage +="                     <span style=\"COLOR: #FF0000;\">"+obs(load_spec_prod_tab[i][howmanyDone])+"</span>\n";
								newPage +="                     <input type=\"hidden\" name=\"tankTerm\" id=\"tankTerm\" value=\""+tankTerm+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"supp\" id=\"supp\" value=\""+supp+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"tripNo\" id=\"tripNo\" value=\""+tripNo+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+obs(tanker)+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"drawer\" id=\"drawer\" value=\""+obs(drawer)+"\">\n";
								newPage +="                     <input type=\"hidden\" name=\"prod\" id=\"prod\" value=\""+obs(load_spec_prod_tab[i][0])+"\">\n";
								newPage +="                 </td>\n";
								newPage +="                 <td width=\"50%\">\n";
								newPage += op_list(curPrivilage);
								newPage +="                 </td>\n";
								newPage +="	       </tr>\n";
								newPage +="	     </table>\n";
								newPage +="   </form>\n";
							}
							else if(howmanyDone == 2)
							{
								newPage += "<td align=\"center\" >\n";				  
								howmanyDone ++;
								newPage += obs(load_spec_prod_tab[i][howmanyDone]);
							} 
							else
							{
								newPage += "<td align=\"center\" >\n";				  
								newPage += obs(load_spec_prod_tab[i][howmanyDone]);
							}

							newPage += "<\/td>\n";

						}// end loop column
						howmanyDone++;
					}
					newPage += "\n";
					newPage += "<\/tr>";


				} // end if to check rows
				
			}//end loop on load sched
			newPage += "<\/tbody>";
			newPage += "<\/table>";

			newPage += "<\/td>";	
			newPage += "<\/tr>";




		} // end if to check column

		newPage += nextPage();
		newPage += "		</table>\n";
		newPage += " 		</div>\n";
		newPage += "	</td>\n";
		newPage += "</tr>\n";
		//newPage +=addPrintBtn_HTML();

	}// end if to check state
	else if(curViewDetailState == 7 || curViewDetailState == 8 )
	{
		newPage += updateForm();

	} else if(curViewDetailState == 5 || curViewDetailState == 15 || curViewDetailState == 25 )
	{
		newPage += displayInfo();
		newPage += spclInstr();
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


function spclInstr()
{
	var i = 0;
	var linenbr = 1;
	var button = "";
	var cmd = "";
	var selectDisabled = "";
	var hiddenDisabled = "";
	var required = "";

	if(op == 5) {
		i = 0;
		button = ml(t__Save);
		cmd = "ADD";
		selectDisabled = "";
		hiddenDisabled = ml(t__disabled);
		required = "*";
	} else if (op == 15) {
		i = 0;
		button = ml(t__Edit_Text);
		cmd = "MOD";
		selectDisabled = ml(t__disabled);
		hiddenDisabled = "";
		required = "*";
	} else {
		i = 1;
		button = ml(t__Cancel);
		cmd = "NULL";
		selectDisabled = ml(t__disabled);
		hiddenDisabled = "";
		required = "";
	}

	op += 10;

	var spclInstr = "";
	spclInstr += "        <tr>\n";
	spclInstr += "                <td align=\"center\">\n";
	spclInstr += "                        <div class=\"button\"><a href=\"load_spec_prod.cgi?tankTerm="+tankTerm+"&supp="+supp+"&tripNo="+tripNo+"&tanker="+tanker+"\">"+ml(t__Back_to_Load_Spec_by_Product)+"</a></div><br>\n";
	spclInstr += "                </td>\n";
	spclInstr += "        </tr>\n";
	spclInstr += "        <form name=\"instructionFrm\" method=\"get\" id=\"instructionFrm\" onsubmit=\"return submitmyform(this)\">\n";
	spclInstr += fieldst_HTML(ml(t__Special_Document_Variables));
	spclInstr +="<div class=\"adminform\">\n";  
	spclInstr += "                                                        <table width=\"100%\">\n"
		;
	for ( linenbr = 1; linenbr <= 10 ; linenbr++ ) {
		spclInstr += "                                                                <tr align=\"center\" >\n";
		spclInstr += "                                                                        <td class=\"infotext\" name=\"l_"+ linenbr +"\" id=\"l_"+ linenbr +"\" width=\"3%\">"+linenbr+" \n";
		spclInstr += "                                                                        </td>\n";
		spclInstr += "                                                                        <td width=\"97%\">\n";

		if ( doc_var_tab.length <= 1 ) {
			spclInstr += "									   <input type=\"text\" "+selectDisabled+ "  name=\"m_"+ linenbr +"\" size=\"80\" id=\"m_"+ linenbr +"\" value=\""+ doc_var_tab[0][1] +"\" /> \n";
		} else {
			if ( doc_var_tab[linenbr][0] == linenbr ) {
				spclInstr += "								   <input type=\"text\" "+selectDisabled+ "  name=\"m_"+ linenbr +"\" size=\"80\" id=\"m_"+ linenbr +"\" value=\""+ doc_var_tab[linenbr][1] +"\" /> \n";
			} else {
				spclInstr += "								   <input type=\"text\" "+selectDisabled+ "  name=\"m_"+ linenbr +"\" size=\"80\" id=\"m_"+ linenbr +"\" value=\""+ doc_var_tab[0][1] +"\" /> \n";
			}
		}

		spclInstr += "                                                                        </td>\n";
		spclInstr += "                                                                </tr>\n";
	}

	spclInstr += "                                                        </table>\n";
	spclInstr += "                    </div>\n";

	spclInstr += fieldstFoot_HTML();


	spclInstr += "        <tr>\n";
	spclInstr += "                <td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	if ( op == 15 || op == 25 ) {
		if ( op == 25 ) {
			op = 5;
		}
		spclInstr += "			<input type=\"hidden\" name=\"op\" id=\"op\" value=\""+op+"\" />\n";
		spclInstr += "			<input type=\"hidden\" name=\"supp\" id=\"supp\" value=\""+supp+"\" />\n";
		spclInstr += "			<input type=\"hidden\" name=\"tripNo\" id=\"tripNo\" value=\""+tripNo+"\" />\n";
		spclInstr += "                   	<input type=\"hidden\" name=\"tankTerm\" id=\"tankTerm\" value=\""+tankTerm+"\">\n";
		spclInstr += "                   	<input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+obs(tanker)+"\">\n";
		spclInstr += "                   	<input type=\"hidden\" name=\"drawer\" id=\"drawer\" value=\""+obs(drawer)+"\">\n";
		spclInstr += "                   	<input type=\"hidden\" name=\"prod\" id=\"prod\" value=\""+obs(load_spec_prod_tab[i][0])+"\">\n";
		spclInstr += "			<input type=\"submit\" value=\""+button+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	}
	spclInstr += "                </td>\n";

	//  spclInstr += "				<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	//  spclInstr += "						<input type=\"reset\" value =\"Reset\" "+selectDisabled+" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	//  spclInstr += "				</td>\n";

	spclInstr += "        </tr>\n";
	spclInstr += "	</form>\n";

	return spclInstr;
}


function updateForm()
{


	var i = 0;
	var button = "";
	var cmd = "";
	var selectDisabled = "";
	var hiddenDisabled = "";
	var required = "";

	if(op == 8) {
		i = 0;
		button = ml(t__Add);
		cmd = "ADD";
		selectDisabled = "";
		hiddenDisabled = ml(t__disabled);
		required = "*";

	} else {
		i = 1;
		button = ml(t__Modify);
		cmd = "MOD";
		selectDisabled = ml(t__disabled);
		hiddenDisabled = "";
		required = "";
	}

	op += 10;

	var updateFrm = "";
	updateFrm += "	<tr>\n";
	updateFrm += "		<td align=\"center\">\n";
	updateFrm += "			<div class=\"button\"><a href=\"load_spec_prod.cgi?tankTerm="+tankTerm+"&supp="+supp+"&tripNo="+tripNo+"&tanker="+tanker+"\">"+ml(t__Back_to_Load_Spec_by_Product)+"</a></div><br>\n";
	updateFrm += "		</td>\n";
	updateFrm += "	</tr>\n";
	updateFrm += "	<form name=\"updateFrm\" method=\"get\" id=\"updateFrm\" onsubmit=\"return submitmyform(this)\">\n";
	updateFrm += fieldst_HTML(ml(t__Load_Spec_Details));
	updateFrm +="<div class=\"adminform\">\n";
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
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"70\">\n";
	updateFrm += ml(t__Product)+":\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "																	<span class=\"mandatory\">"+required+"</span>\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td>\n";

	if(op == 18){
		updateFrm += "																<select NAME=\"prod\" id=\"prod\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_A_Product)+"\" " + selectDisabled + ">\n";
		updateFrm += displayDropList(load_spec_prod_tab[i][0], prod_jslst, ml(t__Select_A_Product));
	} else {
		updateFrm += "																<span class=\"infoText\">"+load_spec_prod_tab[i][1]+"</span><input type=\"hidden\" name=\"prod\" value=\""+load_spec_prod_tab[i][0]+"\"" + hiddenDisabled + "/>\n";
	}

	updateFrm += "															</td>\n";
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "												</td>\n";
	updateFrm += "												<td width=\"50%\">\n";
	updateFrm += "													<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"70\">\n";
	updateFrm += ml(t__Unit)+":\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "																<span class=\"mandatory\">*</span>\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td>\n";
	updateFrm += "																<select NAME=\"unit\" id=\"unit\" class=\"smallselect\" dataType=\"Require\" msg=\""+ml(t__Select_An_Unit)+"\">\n";
	updateFrm += displayDropList(load_spec_prod_tab[i][2], unit_jslst, ml(t__Select_An_Unit));

	updateFrm += "															</td>\n";
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "												</td>\n";
	updateFrm += "											</tr>\n";
	updateFrm += "											<tr>\n";
	updateFrm += "											 	<td width=\"50%\">\n";
	updateFrm += "											   		<table>\n";
	updateFrm += "														<tr>\n";
	updateFrm += "															<td class=\"infotextheadingtd\" width=\"70\">\n";
	updateFrm += ml(t__Schedule_Qty)+":\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td width=\"5\" align=\"center class=\"infotext\">\n";
	updateFrm += "																<span class=\"mandatory\">*</span>\n";
	updateFrm += "															</td>\n";
	updateFrm += "															<td>\n";

	if(cmd == "MOD")// if modify display the scheduled Qty
	{

		updateFrm += "															 <input type=\"text\" name=\"sched\" id=\"sched\" value=\""+load_spec_prod_tab[1][4]+"\" size=\"12\" maxlength=\"9\" dataType=\"RangeInt\" min=0 max=999999999  msg=\""
+ ml(t__Enter)+ ml(t__Schedule_Qty)+ ml(t__between)+" 0 - 999999999\" />\n";

	}
	else //if add new leave the value empty
	{
		updateFrm += "															 <input type=\"text\" name=\"sched\" id=\"sched\" size=\"12\" maxlength=\"9\" dataType=\"RangeInt\" min=0 max=999999999  msg=\""
+ ml(t__Enter)+ ml(t__Schedule_Qty)+ ml(t__between)+" 0 - 999999999\" />\n";

	}


	updateFrm += "															</td>\n";
	updateFrm += "														</tr>\n";
	updateFrm += "													</table>\n";
	updateFrm += "											 	</td>\n";
	updateFrm += "											 	<td width=\"50%\">\n";
	updateFrm += "											 	</td>\n";
	updateFrm += "											</tr>\n";
	updateFrm += "										</table>\n";
	updateFrm += "									</td>\n";
	updateFrm += "								</tr>\n";
	updateFrm += "								<tr>\n";
	updateFrm += "									<td align=\"center\">\n";
	updateFrm += "										<table>\n";
	updateFrm += "											<tr>\n";
	updateFrm += "												<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	updateFrm += "													<input type=\"hidden\" name=\"tankTerm\" id=\"tankeTerm\" value=\""+tankTerm+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"supp\" id=\"supp\" value=\""+supp+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"tripNo\" id=\"tripNo\" value=\""+tripNo+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"tanker\" id=\"tanker\" value=\""+tanker+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"drawer\" id=\"drawer\" value=\""+drawer+"\" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"op\" id=\"op\" value="+op+" />\n";
	updateFrm += "													<input type=\"hidden\" name=\"cmd\" id=\"cmd\" value=\""+cmd+"\" />\n";
	updateFrm += "													<input type=\"submit\" value=\""+button+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	updateFrm += "												</td>\n";
	updateFrm += "												<td align=\"center\" width=\"50%\" class=\"infotext\">\n";
	updateFrm += "													<input type=\"reset\" value =\""+ml(t__Reset)+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\" />\n";
	updateFrm += "												</td>\n";
	updateFrm += "											</tr>\n";
	updateFrm += "										</table>\n";
	updateFrm += "									</td>\n";
	updateFrm += "								</tr>\n";
	updateFrm += "							</table>\n";
	updateFrm += "                    </div>\n";
	updateFrm += "                    </form>\n";                      
	updateFrm += fieldstFoot_HTML();


	return updateFrm;
} //End update Form


function displayInfo()
{
	var i = 0;
	var button = "";
	var cmd = "";
	var selectDisabled = "";
	var hiddenDisabled = "";
	var required = "";

	if(priv == 8) {
		i = 0;
		button = ml(t__Add);
		cmd = "ADD";
		selectDisabled = "";
		hiddenDisabled = ml(t__disabled);
		required = "*";
	} else {
		i = 1;
		button = ml(t__Modify);
		cmd = "MOD";
		selectDisabled = ml(t__disabled);
		hiddenDisabled = "";
		required = "";
	}



	var infoPage ="";
	infoPage += fieldst_HTML(ml(t__Trip_Details));
	infoPage += "       	<form name=\"infoPage\" id=\"infoPage\">\n";
	infoPage +="<div class=\"adminform\">\n";

	//  infoPage += " <tr>\n";
	//  infoPage += " 	<td align=\"left\">\n";
	//  infoPage += "       	<form name=\"infoPage\" id=\"infoPage\">\n";

	infoPage += "             <table width=\"100%\">\n";
	infoPage += "                	<tr>\n";
	infoPage += "						<td width=\"50%\">\n";
	infoPage += "							<table>\n";
	infoPage += "								<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Supplier)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + supp+ " - " + suppNm;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Drawer)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td>\n";
	infoPage += "                       				<select name=\"drawer\" "+ selectDisabled +" id=\"drawer\" class=\"smallselect\" onchange=\"submitDrawer("+state+");\"> \n";
	infoPage += displayDropList(drawer, drawer_list, ml(t__Select_A_Drawer));
	infoPage += "                     			</td>\n";
	infoPage += "                 			</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Carrier)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + carrier + " - " + carrierNm;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Equiptment_1)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + eqpt;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Profile)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + profile;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "							</table>\n";
	infoPage += "						</td>\n";
	infoPage += "						<td width=\"50%\">\n";
	infoPage += "							<table>\n";
	infoPage += "								<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Trip_Shift)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + tripShift;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Delivery_Date)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + delvDate;
	infoPage += "                     			</td>\n";
	infoPage += "                 			</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Load_Status)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + loadStatus;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Tanker_Type)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + tankerType;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "                				<tr>\n";
	infoPage += "                   				<td class=\"infotextheading\">\n";
	infoPage += ml(t__Terminal)+":\n";
	infoPage += "                   				</td>\n";
	infoPage += "                   				<td class=\"infotext\">\n";
	infoPage += "										" + tankTerm + " - " + tankTermNm;
	infoPage += "                   				</td>\n";
	infoPage += "                				</tr>\n";
	infoPage += "							</table>\n";
	infoPage += "						</td>\n";
	infoPage += "                	</tr>\n";
	infoPage += "					<tr>\n";
	infoPage += "						<td>\n";
	infoPage += "							<input type=\"hidden\" name=\"supp\" value=\""+supp+"\">\n";
	infoPage += "							<input type=\"hidden\" name=\"tripNo\" value=\""+tripNo+"\">\n";
	infoPage += "							<input type=\"hidden\" name=\"tanker\" value=\""+tanker+"\">\n";
	infoPage += "							<input type=\"hidden\" name=\"tankTerm\" value=\""+tankTerm+"\">\n";
	infoPage += "							<input type=\"hidden\" name=\"op\" value=\"10\">\n";
	infoPage += "						</td>\n";
	infoPage += "					</tr>\n";
	infoPage += "         	</table>\n";

	//  infoPage += "        	</form>\n";
	//  infoPage += " 	</td>\n";
	//  infoPage += "	</tr>\n";

	infoPage +="<\/div>\n";
	infoPage += "        	</form>\n";
	infoPage += fieldstFoot_HTML();

	return infoPage;  	

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
		next += "<a href=\"javascript:document.glblFrm.pg.value=pg-1;document.glblFrm.op.value=0;document.glblFrm.submit();\">"+ml(t__Previous)+"</a>\n";
	}
	next += "&nbsp; Current=" + pg;
	next += "/";
	next += pagesTotal;
	if (pagesTotal > pg)
	{
		next += "&nbsp; <a href=\"javascript:document.glblFrm.pg.value=pg+1;document.glblFrm.op.value=0;document.glblFrm.submit();\">"+ml(t__Next)+"</a>\n";
	}

	next += "	</td>\n";
	next += "</tr>\n";

	if(pagesTotal == 0)
	{
		next = "";
	}

	return next;   
}


function addButton()
{
	var button = "";
	button += "<tr>\n";
	button += "	<td align=\"center\">\n";
	button += " 	<form name=\"glblFrm\" id=\"glblFrm\">\n";
	button += "			<input type=\"hidden\" name=\"tankTerm\" value=\""+tankTerm+"\" />\n";
	button += "			<input type=\"hidden\" name=\"supp\" value=\""+supp+"\" />\n";
	button += "			<input type=\"hidden\" name=\"tripNo\" value=\""+tripNo+"\" />\n";
	button += "			<input type=\"hidden\" name=\"tanker\" value=\""+tanker+"\" />\n";
	button += "			<input type=\"hidden\" name=\"op\" value=0 />\n";
	button += "			<input type=\"hidden\" name=\"pg\" value=1 />\n";
	button += "		</form>\n";
	button += "		<div class=\"button\">\n";

	//	if(op > 10)
	button += "			<a href=\"#\" onClick=\"document.glblFrm.submit();\">"+ml(t__View_All)+"</a>&nbsp;\n";
		button += "			<a href=\"#\" onClick=\"isByProduct();\">"+ml(t__Add_New_Load_Spec)+"</a>&nbsp;\n";
	button += "			<a href=\"#\" onClick=\"document.glblFrm.tripNo.value='-1';document.glblFrm.action='load_scheds.cgi';document.glblFrm.submit();\">"+ml(t__Back_to_Load_Schedules_Page)+"</a>\n";
	button += "		</div><br>\n";
	button += " </td>\n";
	button += "</tr>\n";

	return button;
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
	if (op <= 3 || op > 15)
	{
		pageHeading +=ml(t__LOAD_SPEC_BY_PRODUCT);
	}
	else if(op == 5 || op == 15)
	{
		pageHeading +=ml(t__SPECIAL_INSTRUCTIONS);
	}
	else if(op == 7)
	{
		pageHeading +=ml(t__MODIFY_LOAD_SPEC_BY_PRODUCT);
	}
	else if(op == 8)
	{
		pageHeading +=ml(t__ADD_NEW_LOAD_SPEC_BY_PRODUCT);
	}



	return pageHeading;   
}

function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;
	if (op <= 3 || op > 10)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Load_Spec_by_Product_Page);

	}
	else if (op == 5)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Update_Special_Instructions);

	}
	else if (op == 7)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Update_Load_Spec_by_Product_Page);

	}
	else if (op == 8)
	{
		pageTitle +=ml(t__DKI_Omega_Menu)+" :: "+ml(t__LOAD_SCHEDULES)+", "+ml(t__Add_Load_Spec_by_Product_Page);

	}


	return pageTitle;
}
// function checks if the number of 
// compartments are the same as number
// of products in the pre-order
function check_can_AddNewProd()
{
  var canAdd = true;
  var tot_no_prod = 0;
  
  if(load_spec_prod_tab.length >1 && ((load_spec_prod_tab.length-1) >=parseInt(myTotCmpts)))
  canAdd = false;
  return canAdd;
  
  
}

/* define function op_list() */
function op_list(priv)
{
	/* priv = 
	   6 modify	op=1,2,3
	   7 add		op=4
	   8 delete	op=5
	 */
	var op_list ="";
	op_list +="<select name=op onchange=\"sendoption(this,"+state+");\">";
	switch (priv)
	{
		case 8:								/* Delete */

		case 7:								/* Add */

		case 6:								/* Modify */
			op_list +="<option value=7>"+ml(t__MODIFY)+"</option>";
		case 5:								/* Display */
			op_list +="<option value=5>"+ml(t__SPECIAL_INSTRUCTION)+"</option>";
			break;
	}
	op_list +="<option value=0 selected>--\t"+ml(t__YOUR_ACTION)+"\t--</option>";
	op_list +="</select>                                        ";
	return op_list ;
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
	newPage +="\n";
	newPage +="//foward option \n";
	newPage +="function sendoption(element)\n";
	newPage +="{\n";
	newPage +=" \n";
	newPage +="	var value = element.options[element.selectedIndex].value;\n";
	newPage +="	var frm = element.parentNode.parentNode.parentNode.parentNode.parentNode;\n";
	newPage +="\n";
	newPage +="	if(isInSpecdets >= 1){\n";
	newPage +="		alert(\""+ml(t__Error__already_scheduled_BY_COMPARTMENT)+"\");\n";
	newPage +="		frm.reset();\n";
	newPage +="	}else{\n";
	newPage +="		frm.submit();\n";
	newPage +="	}\n";
	newPage +="\n";
	newPage +="}\n";
	newPage +="//foward option \n";
	newPage +="function isByProduct()\n";
	newPage +="{\n";
	newPage +=" \n";
	newPage +="	if(isInSpecdets >= 1){\n";
	newPage +="		alert(\""+ml(t__Error__already_scheduled_BY_COMPARTMENT)+"\");\n";
	newPage +="	}else if (!(check_can_AddNewProd())){\n";
	newPage +="		alert(\""+ml(t__Error__already_enough_PRODUCTS)+"\");\n";
	newPage +="	}\n";
	newPage +="	else{\n";
	newPage +="		document.glblFrm.op.value=8;\n";
	newPage +="		document.glblFrm.submit();\n";
	newPage +="	}\n";
	newPage +="}\n";
	newPage +="\n";
	newPage +="function submitDrawer(loaded)\n";
	newPage +="{\n";
	newPage +="	if(loaded <= 1)\n";
	newPage +="	{\n";
	newPage +="		if(confirm(\""+ml(t__Do_you_really_want_to_modify_drawer)+"?\"))\n";
	newPage +="		{\n";
	newPage +="			document.infoPage.submit();\n";
	newPage +="		}else\n";
	newPage +="		{\n";
	newPage +="			document.infoPage.reset();\n";
	newPage +="		}\n";
	newPage +="	}else\n";
	newPage +="	{\n";
	newPage +="		alert(\""+ml(t__Load_Spec_is_NOT_new__cannot_modify)+"\");\n";
	newPage +="			document.infoPage.reset();\n";
	newPage +="	}\n";
	newPage +="}\n";
	newPage +="</script>\n";
	newPage += "</head>\n";
	newPage += "<body>\n";
	return (newPage);
}


