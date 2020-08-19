var opValues = new Array();

// operation to categories
opValues["baseCategory"] = 30200;
opValues["listCategory"] = 30201;
opValues["searchCategoryForm"] = 30204;
opValues["searchCategorySubmit"] = 30214;
opValues["viewCategory"] = 30205;
opValues["modifyCategoryForm"] = 30206;
opValues["modifyCategorySubmit"] = 30216;
opValues["insertCategoryForm"] = 30207;
opValues["insertCategorySubmit"] = 30217;
opValues["deleteCategoryForm"] = 30208;
opValues["deleteCategorySubmit"] = 30218;


var otherText = new Array();

var t__YOUR_ACTION = ["YOUR ACTION","请选择"];
otherText["youraction"] =  ml(t__YOUR_ACTION);

var t__Back_To_Category = ["Back to Category Page", "返回客户类别管理"];
var t__Add_Category = ["Add New Category", "新增客户类别"];
var t__Upd_Category = ["Modify", "修改客户类别"];
var t__Del_Category = ["Delete", "删除客户类别"];
otherText["btn_bakto_categoryPg"] = ml(t__Back_To_Category) ;
otherText["btn_addNew_category"] = ml(t__Add_Category) ;
otherText["btn_upd_category"] = ml(t__Upd_Category) ;
otherText["btn_del_category"] = ml(t__Del_Category) ;

var t__Page_Title_Category = ["Category Page", "客户类别管理"];
var t__Page_Title_Category_Upd = ["Modify Category", "修改客户类别"];
var t__Page_Title_Category_Add = ["Add Category", "新增客户类别"];
otherText["pgTitle_category"] = ml(t__Page_Title_Category);
otherText["pgTitle_categoryUpd"] = ml(t__Page_Title_Category_Upd);
otherText["pgTitle_categoryAdd"] = ml(t__Page_Title_Category_Add);

var t__Page_Head_Category = ["Category", "客户类别管理"];
var t__Page_Head_Category_Upd = ["Modify Category", "修改客户类别"];
var t__Page_Head_Category_Add = ["Add Category", "新增客户类别"];
otherText["pgHead_category"] = ml(t__Page_Head_Category);
otherText["pgHead_categoryUpd"] = ml(t__Page_Head_Category_Upd);
otherText["pgHead_categoryAdd"] = ml(t__Page_Head_Category_Add);

var t__Del_Confirm = ["Are you sure you want to delete?", "您是否确定要删除本记录?"];
otherText["msg_del_confirm"] =  ml(t__Del_Confirm);

var t__Category_Form_Title = ["Category", "客户类别"];
var t__Category_Form_Note = ["All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory", "所有标有(<span style=\"COLOR: #FF0000;\">*</span>)的表项必须填写"];
    otherText["msg_addCategory_fSet"] = ml(t__Category_Form_Title);
    otherText["msg_addCategory_frmComplt"] = ml(t__Category_Form_Note);
    otherText["msg_updCategory_fSet"] = ml(t__Category_Form_Title);
    otherText["msg_updCategory_frmComplt"] = ml(t__Category_Form_Note);

// Alert Message for Category Form
var t__Select_Category_Code = ["Please select the category!", "请选择客户类别!"];
var t__Enter_Category_Code = ["Please enter the category code!", "请输入客户类别代码!"];
var t__Enter_Category_Text = ["Please enter the category description!", "请输入客户类别描述!"];

otherText["msg_selectAcctDetailCatCode"] = ml(t__Select_Category_Code);
otherText["msg_enterAcctDetailCatCode"] = ml(t__Enter_Category_Code);
otherText["msg_enterAcctDetailCatDesc"] = ml(t__Enter_Category_Text);

var accountTitle = new Array();

var t__Title_Category_Code = ["Category Code", "客户类别代码"];
var t__Title_Category_Text = ["Category Description", "客户类别描述"];

accountTitle["cat_code"] = ml(t__Title_Category_Code);
accountTitle["cat_desc"] = ml(t__Title_Category_Text);

var myColumns = [ml(t__Title_Category_Code), ml(t__Title_Category_Text)];


var l_opInf= new Array()
for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];

var t__Delete_Ok = ["Successfully Deleted!", "成功删除了一个客户类别!"];
var t__Insert_Ok = ["Successfully Inserted a New Record!", "成功新增了一个客户类别!"];
var t__Modify_Ok = ["Successfully Updated!", "成功修改了一个客户类别!"];
var t__Delete_Fail = ["Delete Failed!", "删除客户类别失败!"];
var t__Insert_Fail = ["Insert Failed!", "新增客户类别失败!"];
var t__Modify_Fail = ["Update Failed!", "修改客户类别失败!"];

l_opInf[30228]= ml(t__Delete_Ok);
l_opInf[30227]= ml(t__Insert_Ok);
l_opInf[30226]= ml(t__Modify_Ok);

l_opInf[30238]= ml(t__Delete_Fail);
l_opInf[30237]= ml(t__Insert_Fail);
l_opInf[30236]= ml(t__Modify_Fail);


/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    
var ops_req_print = [-1, 30201,30204,30205,30206,30207];
var ops_req_search = [-1, 201];// search never required on this page




function renderPage(cRec, cCol, cState, cPageState, priv, lang)
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

//	newPage += "<html>\n";

	//printHdr function of comm_HTML.js file responsible for 
	//generating all the HTML for the current page
	newPage += printHdr( newPage, 
						updatePageTitle(curViewDetailState,pageTitle), 
						lang );

	//local_HeadrHTML function is local function give 
	// the ability to append any thing to the current page
	newPage += local_HeadrHTML( newPage );

	//getToolBar_HTML function of comm_HTML.js file responsible for  
	// outputting the tool bar
	//controls the search and print buttons as well
	newPage += getToolBar_HTML( newPage,  
								updatePageHeading(curViewDetailState, pageHeading), 
								check_ifReqPrint(ops_req_print, curViewDetailState), 
								check_ifReqSearch(ops_req_search, curViewDetailState) );
  	newPage += "\n";
	newPage += "<tr>\n";  
	newPage += "<td width=\"100%\">             \n";
	newPage += "<div class=\"content\" id=\"content\">\n";
	newPage += "<div id=\"printReady\">";
	newPage += "\n";
	newPage += "<table border=\"0\" width=\"100%\" height=\"100%\">\n";
	newPage += "<tbody>\n";  
/*
	newPage += "    <tr>\n";
	newPage += "            <td align=\"center\">\n";
	newPage += "                    <h5>" + updatePageHeading(curViewDetailState, pageHeading) + "</h5>\n";
	newPage += "            </td>\n";
	newPage += "    </tr>\n";
*/
  
	// display the result of DB operation
	newPage +=	displayStatusMsg (opStatus);  

	/* Display Category Details */
	if (priv >= 5 && curViewDetailState == opValues["viewCategory"]) 	
	{
		newPage += displayCategoryList(curPrivilage,curColumnToSort);
	}
	if (priv >= 5 && curViewDetailState == opValues["listCategory"]) 	
	{
		newPage += displayCategoryList(curPrivilage,curColumnToSort);
	}

	/* Display Form for Modify AcctDetail Category Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyCategoryForm"])	
	{
		newPage += displayModifyCategoryForm();
	}
	/* Submit the Modification of AcctDetail Category Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyCategorySubmit"])	
	{
		newPage += displayCategoryList(curPrivilage,curColumnToSort);
	}
	
	/* Display Form for Add AcctDetail Category Details */
	if (priv >= 7 && curViewDetailState == opValues["insertCategoryForm"])	
	{
		newPage += displayInsertCategoryForm();
	}
	/* Submit the Insertion of AcctDetail Category Details */
	if (priv >= 7 && curViewDetailState == opValues["insertCategorySubmit"])	
	{
		newPage += displayCategoryList(curPrivilage,curColumnToSort);
	}
	
	/* Display Form for Delete a record of Category */
//	if (priv >= 8 && curViewDetailState == opValues["deleteCategoryForm"])	
//	{
//		newPage += displayDeleteCategoryForm();
//	}
	/* Submit the Deletion of Category Details */
	if (priv >= 8 && curViewDetailState == opValues["deleteCategorySubmit"])	
	{
		newPage += displayCategoryList(curPrivilage,curColumnToSort);
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
}




function displayCategoryList (curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm ="";


	dispFrm += makespace("\t", indent) + btnGroupCategory_HTML();

	dispFrm += makespace("\t", indent) + "<tr> \n";

	// end of the td and tr for the list area
	dispFrm += makespace("\t", indent) + "<td>\n ";  
	if( ((myColumns.length)> 0))
	{
		dispFrm += makespace("\t", indent+1) + "<div id=\"printReady\">\n";
		dispFrm += makespace("\t", indent+2) + table_begin("M", 0,"");
		dispFrm += makespace("\t", indent+2) + "<tbody> \n";
		dispFrm += makespace("\t", indent+2) + "<tr>\n";
		for(var i=0; i<myColumns.length; i++)
		{
			dispFrm += makespace("\t", indent+2) + "<td>" + myColumns[i] + "</td>\n";
		}
		dispFrm += makespace("\t", indent+2) + "</tr>\n";
	}

	for(i in category_jstab)
	{
		if (i>0)
		{
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone = 0;
			for(var j=0; j<myColumns.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(category_jstab[i][howmanyDone]) + "<\/td>";
				} 
				else 
				{
					dispFrm += makespace("\t", indent+2) + "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						dispFrm += makespace("\t", indent+3) + "<form name=\"select_action_" + i + "\" id=\"select_action_" + i + "\" >\n";
						dispFrm += makespace("\t", indent+4) + "<table border=\"0\">\n";
						dispFrm += makespace("\t", indent+4) + "<tr>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\"> <span style=\"COLOR: #FF0000;\">" + obs(category_jstab[i][howmanyDone]) + "</span>\n";
              
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"frm_catcode\" id=\"frm_catcode\" value=\"" + category_jstab[i][0] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"frm_catdesc\" id=\"frm_catdesc\" value=\"" + category_jstab[i][1] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

						dispFrm += makespace("\t", indent+5) + preqstr_field ();
						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

						dispFrm += makespace("\t", indent+5) + op_list (curPrivilage, category_jstab[i][howmanyDone], i);


						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "</tr>\n";
						dispFrm += makespace("\t", indent+4) + "</table>\n";
						dispFrm += makespace("\t", indent+3) + "</form>\n";
					}
					else
					{
						dispFrm += makespace("\t", indent+3) + obs(category_jstab[i][howmanyDone]);
					}

					dispFrm += makespace("\t", indent+2) + "</td>\n";
				}
				howmanyDone++;	
			} // end of inner for loop
		  
		}
		dispFrm += makespace("\t", indent) + "\n";
		dispFrm += makespace("\t", indent+2) + "</tr>";
	}
	dispFrm += makespace("\t", indent+1) + "</tbody>";
	dispFrm += makespace("\t", indent+1) + "</table>";
	dispFrm += makespace("\t", indent) + "</div>\n";
	dispFrm += makespace("\t", indent) + "</td>\n ";
	dispFrm += makespace("\t", indent) + "</tr>\n";

	return dispFrm;
}



function displayModifyCategoryForm ()
{
	var indent = 1;
	var updFrm = "";

	if ( frm_catcode == "" || frm_catcode == "-1" )
	{
		frm_catcode = "";
	}

	updFrm += makespace("\t", indent) + btnGroupBackCategory_HTML();

	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td>\n";

	updFrm += makespace("\t", indent+1) + "<form name=\"edit_category\" method=\"get\" id=\"edit_category\" action=\"category.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + otherText["msg_updCategory_fSet"] + "</li>\n";
	updFrm += "</ul>\n";
	updFrm += "<div class=\"adminform\">\n";

	updFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	updFrm += makespace("\t", indent+4) + "<br>\n";
	updFrm += makespace("\t", indent+4) + otherText["msg_updCategory_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyCategorySubmit"] + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	updFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
//	updFrm += makefield(3, accountTitle["cat_code"], frm_catcode, "frm_catcode", "frm_catcode", "", 30, 19, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(2, accountTitle["cat_code"], frm_catcode, "frm_catcode", "frm_catcode", cust_category_jslst, 0, 0, "dataType=\"Require\" onchange=\"update(document.edit_category, this, document.edit_category.frm_catdesc)\"", otherText["msg_selectAcctDetailCatCode"], "*", indent+4, 100);


	updFrm += makefield(1, accountTitle["cat_desc"], frm_catdesc, "frm_catdesc", "frm_catdesc", "", 50, 49, "dataType=\"Require\"", otherText["msg_enterAcctDetailCatDesc"], "*", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	updFrm += makespace("\t", indent+4) + "</table>\n";
	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td align=\"center\">\n";
	updFrm += makespace("\t", indent+4) + "<table>\n";

	updFrm += frmButtRow_HTML(commBtnText["Update"], 1);


	updFrm += makespace("\t", indent+4) + "</table>\n";
	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "</table>\n";

//	updFrm += makespace("\t", indent+2) + "</fieldset>\n";
	updFrm += makespace("\t", indent+2) + "</div>\n";

	updFrm += makespace("\t", indent+1) + "</form>\n";

//	updFrm += makespace("\t", indent+1) + "</div>\n";

	updFrm += makespace("\t", indent) + "</td>\n";
	updFrm += makespace("\t", indent) + "</tr>\n";

	return updFrm;
}






function displayInsertCategoryForm ()
{
	var indent = 1;
	var addFrm = "";

	addFrm += makespace("\t", indent) + btnGroupBackCategory_HTML();

	addFrm += makespace("\t", indent) + "<tr>\n";
	addFrm += makespace("\t", indent) + "<td>\n";
//	addFrm += makespace("\t", indent+3) + "<div id=\"printReady\">\n";

	addFrm += makespace("\t", indent+1) + "<form name=\"add_category\" method=\"get\" id=\"add_category\" action=\"category.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	addFrm += " <ul id=\"tabmenu\">\n";
	addFrm += "<li>" + otherText["msg_updCategory_fSet"] + "</li>\n";
	addFrm += "</ul>\n";
	addFrm += "<div class=\"adminform\">\n";

//	addFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	addFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_updCategory_fSet"] + "</strong></legend>\n";

	addFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	addFrm += makespace("\t", indent+4) + "<br>\n";
	addFrm += makespace("\t", indent+4) + otherText["msg_updCategory_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["insertCategorySubmit"] + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	addFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(1, accountTitle["cat_code"], frm_catcode, "frm_catcode", "frm_catcode", "", 30, 19, "dataType=\"Require\"", otherText["msg_enterAcctDetailCatCode"], "*", indent+4, 100);
	addFrm += makefield(1, accountTitle["cat_desc"], frm_catdesc, "frm_catdesc", "frm_catdesc", "", 50, 49, "dataType=\"Require\"", otherText["msg_enterAcctDetailCatDesc"], "*", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	addFrm += makespace("\t", indent+4) + "</table>\n";
	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td align=\"center\">\n";
	addFrm += makespace("\t", indent+4) + "<table>\n";

	addFrm += frmButtRow_HTML(commBtnText["Add"], 1);


	addFrm += makespace("\t", indent+4) + "</table>\n";
	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";
	addFrm += makespace("\t", indent+3) + "</table>\n";

//	addFrm += makespace("\t", indent+2) + "</fieldset>\n";
	addFrm += makespace("\t", indent+2) + "</div>\n";

	addFrm += makespace("\t", indent+1) + "</form>\n";

//	addFrm += makespace("\t", indent+1) + "</div>\n";

	addFrm += makespace("\t", indent) + "</td>\n";
	addFrm += makespace("\t", indent) + "</tr>\n";

	return addFrm;
}






function obs(data)
{
	return data;
}



function op_field (attr)
{
  var fieldHTML ="";
   fieldHTML += "<input name=\"op\" id=\"op\" value=\""+attr+"\" type=\"hidden\">\n";
   return fieldHTML;
}



function preqstr_field ()
{
	var fieldHTML ="";

	fieldHTML += "<input name=\"preqstr\" id=\"preqstr\" value=\"\" type=\"hidden\">\n";

	return fieldHTML;
}





function btnGroupCategory_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	if(priv>=7)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('category.cgi?pg_3='+pg_3+'&pg='+pg+'&op=" + opValues["insertCategoryForm"] + "'); ", otherText["btn_addNew_category"]);
	}

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}


function btnGroupBackCategory_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	btn_HTML += btnLocation_HTML("justChaneMyLocation('category.cgi'); ", otherText["btn_bakto_categoryPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}





function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	if(op == opValues["viewCategory"] || op == opValues["listCategory"])
	{
		pageHeading += otherText["pgHead_category"];
	}

	if(op == opValues["modifyCategoryForm"] || op == opValues["modifyCategorySubmit"])
	{
		pageHeading += otherText["pgHead_categoryUpd"];
	}
	if(op == opValues["insertCategoryForm"] || op == opValues["insertCategorySubmit"])
	{
		pageHeading += otherText["pgHead_categoryAdd"];
	}

	return pageHeading; 
}



function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	if(op == opValues["viewCategory"] || op == opValues["listCategory"])
	{
		pageTitle += otherText["pgTitle_category"];
	}

	if(op == opValues["modifyCategoryForm"] || op == opValues["modifyCategorySubmit"])
	{
		pageTitle += otherText["pgTitle_categoryUpd"];
	}
	if(op == opValues["insertCategoryForm"] || op == opValues["insertCategorySubmit"])
	{
		pageTitle += otherText["pgTitle_categoryAdd"];
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
	var op_list = "";
	op_list += "<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+accNum+"', '"+frmNum+"');\">          ";

	switch (priv)
	{
		case 8:
			op_list += "<option value=\"" + opValues["deleteCategorySubmit"] + "\">" + commText["Delete"] + "</option>";

		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

		case 6:     
			op_list += "<option value=\"" + opValues["modifyCategoryForm"] + "\">" + commText["Modify"] + "</option>";

		case 5:			/* Find Has not been implemented yet*/
			break;
	}
  
	op_list += "<option value=0 selected>--\t" + otherText["youraction"] + "\t--</option>";
	op_list += "</select>                                        ";
	
	return op_list ;
}

function update(myformObj, parentOption, childOption) 
{
	var new_options;
	var parent_select;
	var i;

	parent_select = parentOption.value;
	for (i in cust_category_jslst )
	{
		if (cust_category_jslst[i][0] == parent_select)
		{
			childOption.value = cust_category_jslst[i][2];
		}
	}
}



function local_HeadrHTML( newPage )
{
	newPage += "<SCRIPT LANGUAGE=\"JavaScript\">\n";

	newPage += "/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
	newPage += "FUNCTION [ submitmyform] \n";
	newPage += "[PURPOSE]  		-> 	Always use this method to submit a form,\n";
	newPage += "					gives me the flexbility of doing validation\n";
	newPage += "					and addition if required before i submit the form\n";
	newPage += "          \n";
	newPage += "[Parameter]  	-> myobject FORM OBJECT Parameter is the form need to be submit\n";
	newPage += "[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
	newPage += "'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
	newPage += "function submitmyform(myobject)\n";
	newPage += "{\n";
	newPage += "	//var myHiddenOb;\n";
	newPage += "	\n";
	newPage += "	//myHiddenOb = getElemRefs(\"prev_qstring\";\n";
	newPage += "	//myHiddenOb.value=produceQString(;\n";
	newPage += "	//return formcheck(myobject;\n";
	newPage += "	return Validator.Validate(myobject,1);\n";
	newPage += "}\n";
	
	newPage += "/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n";
	newPage += "[AUTHOR]  		-> Abdul Shakoor (DKI) June 8, 2005\n";
	newPage += "'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/\n";
	newPage += "function submitAction(myobject, accNum, frmNum)\n";
	newPage += "{\n";
	newPage += "	var myCurQstring=produceQString();\n";
	newPage += "	var myselectedvalue = myobject.options[myobject.selectedIndex].value;";

	newPage += "	if(myselectedvalue==\"" + opValues["deleteCategorySubmit"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(confirm('" + otherText["msg_del_confirm"] + "'))\n";
	newPage += "		{\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["deleteCategorySubmit"] + "+\"';\");\n";

	newPage += "			eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "			return true;\n";
	newPage += "		}\n";
	newPage += "		eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
  	newPage += "	}\n";
	newPage += "	else\n";
	newPage += "	{\n";
	newPage += "		eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "		return true;\n";
	newPage += "	}\n";
	newPage += "}\n";

	newPage += "</script>\n";
	newPage += "\n";
	newPage += "</head>\n";
	newPage += "\n";
	newPage += "<body>\n";
	newPage += "\n";

	return (newPage);
}

