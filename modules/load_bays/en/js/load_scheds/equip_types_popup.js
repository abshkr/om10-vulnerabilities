var myColumns = [ "Compartment No", "Safe Fill","Unit" ];
var otherText = new Array()
	otherText["youraction"] =  "YOUR ACTION";
otherText["prfile"] =  "PROFILE";
otherText["brkdn"] =  "BREAKDOWN";
otherText["cmpt_limits"] =  "COMPARTMENT LIMITS";
otherText["btn_addNew_eqpTp"] =  "Add New Equipment Type";
otherText["btn_bakto_eqpTp"] =  "Back to Equipment Type Page";  
otherText["eqpCd"] =  "Equipment Code"; 
otherText["eqpNm"] =  "Equipment Name"; 
otherText["pgHead_eqpTp"] =  "equipment compartment limits";
otherText["pgTitle_eqpTp"] =  "Load Schedule, Equiptment Types";  
otherText["close_window"] = "Close Window";
var opValues = new Array();
opValues["init"] = 1;
var l_opInf= new Array()
for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
l_opInf[18]= "Successfully Deleted!";
l_opInf[23]= "Successfully Inserted A New Record !";
l_opInf[25]= "Successfully Inserted A New Record !";
l_opInf[27]= "Successfully Inserted A New Record !";
l_opInf[24]= "Successfully Deleted!";
l_opInf[33]= "Insert New Record Failed!";
l_opInf[37]= "Insert New Record Failed!";
l_opInf[34]= "Delete Failed!";
l_opInf[133]= "DB Update Failed!";
l_opInf[137]= "DB Insert Failed!";
l_opInf[134]= "DB Delete Failed!";

if ( 'cn' == js_lang){
	var myColumns = [ "油仓编号", "安全容量","单位" ];
	otherText["youraction"] =  "请选择";
	otherText["prfile"] =  "属性";
	otherText["brkdn"] =  "细目分类";
	otherText["cmpt_limits"] =  "油仓限额";
	otherText["btn_addNew_eqpTp"] =  "新增运输设备类型";
	otherText["btn_bakto_eqpTp"] =  "返回运输设备类型管理页";
	otherText["eqpCd"] =  "运输设备代码";
	otherText["eqpNm"] =  "运输设备名称";
	otherText["pgHead_eqpTp"] =  "运输设备油仓限额";
	otherText["pgTitle_eqpTp"] =  "发油订单管理,运输设备类型管理";
	otherText["close_window"] = "关闭窗口";
	l_opInf[18]= "成功删除！";
	l_opInf[23]= "成功插入新纪录!";
	l_opInf[25]= "成功插入一条新纪录!";
	l_opInf[27]= "成功插入一条新纪录!";
	l_opInf[24]= "成功删除!";
	l_opInf[33]= "插入新纪录失败!";
	l_opInf[37]= "插入新纪录失败!";
	l_opInf[34]= "删除失败!";
	l_opInf[133]= "数据库更新失败!";
	l_opInf[137]= "数据库插入失败!";
	l_opInf[134]= "数据库删除失败!";
}
	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 1,26,28,38,48,36,27,37,47];
	var ops_req_search = [-1, 1,26,28,38,48,36,27,37,47];// search never required on this page		

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
		newPage += local_HeadrHTML(newPage);

		//newPage += getToolBar_HTML(newPage, updatePageHeading(curViewDetailState,pageHeading),check_ifReqPrint(ops_req_print, curViewDetailState), check_ifReqSearch(ops_req_search, curViewDetailState));

		//newPage += "\n";
		newPage +="<tr>\n";  
		newPage +="<td width=\"100%\">             \n";
		newPage +="<div class=\"content\" id=\"content\">\n";
		newPage += "<div id=\"printReady\">";
		newPage +="<table border=\"0\" width=\"100%\" height=\"100%\">\n";
		newPage +="<tbody>\n";   

		// if OP is <=1 OR Higher than available options should always come to this view
		if (curViewDetailState <= opValues["init"] || curViewDetailState >27 ) 
		{
			newPage +=backToBtn_HTML();
			newPage +=displayStatusMsg (op);  
			newPage += "<tr> \n";
			newPage += "<td align=\"left\">\n";
			newPage += "<table>\n";
			newPage += "   <tr> \n";
			newPage += "                                                    <td width=\"140\" class=\"infotextheading\">\n";
			newPage += "                                                            "+otherText["eqpCd"]+":\n";
			newPage += "                                                    </td>\n";
			newPage += "                                                    <td align=\"left\" class=\"infotext\">\n";
			newPage +=eqpCd;
			newPage += "                                                    </td>\n";
			newPage += "   </tr> \n";

			newPage += "   <tr> \n";
			newPage += "                                                    <td width=\"140\" class=\"infotextheading\">\n";
			newPage += "                                                            "+otherText["eqpNm"]+":\n";
			newPage += "                                                    </td>\n";
			newPage += "                                                    <td align=\"left\" class=\"infotext\">\n";
			newPage +=eqpNm;
			newPage += "                                                    </td>\n";
			newPage += "   </tr> \n";

			newPage += "</table>\n";
			newPage += "</td>\n";	
			newPage += "</tr> \n";

			newPage += "<tr> \n";
			//end of the td and tr for the list area
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
								newPage +="       <table border=\"0\">\n";
								newPage +="	       <tr>\n";
								imagestr ="          <td width=\"100%\">"+eqTypes_jsArr[i][howmanyDone]+"\n";
								//newPage +=op_field ("");
								//alert(imagestr);
								newPage +=          imagestr+"\n";
								newPage +="          </td>\n";

								newPage +="	       </tr>\n";
								newPage +="	      </table>\n";

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
	function canBreak_field (attr)
	{
		var fieldHTML ="";
		fieldHTML +="<input name=\"canBreak\" id=\"canBreak\" value=\""+canBreak+"\" "+attr+" \/>\n";
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
		btn_HTML +="			<a href=\"#\" class=\"popupLink\" onClick=\"window.close();\">"+otherText["close_window"]+"</a>\n";

		btn_HTML +="                                 </div><br>\n";
		btn_HTML +="             <td>\n ";
		btn_HTML +="         </tr> \n";
		return btn_HTML;
	}

	function updatePageHeading(op,pgHead)
	{
		var pageHeading = pgHead;
		if (op <= 1)
		{
			pageHeading +=otherText["pgHead_eqpTp"];
		} 
		if(op == opValues["enterModify"])
		{
			pageHeading += otherText["pgHead_ModeqpTp"];
		}
		if(op == opValues["enterAdd"])
		{
			pageHeading += otherText["pgHead_AddeqpTp"];
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
				op_list +="<option value=\""+opValues["enterDelete"]+"\">DELETE</option>";

			case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */


			case 6:    /* Modify not required for The Tank Grouping Page  */
				op_list +="<option value=\""+opValues["enterModify"]+"\">"+commText["Modify"]+"</option>";
			case 5:			/* Find Has not been implemented yet*/
				op_list +="<option value=\""+opValues["cmpt_limts"]+"\">"+otherText["cmpt_limits"]+"</option>";
				op_list +="<option value=\""+opValues["prfile"]+"\">"+otherText["prfile"]+"</option>";
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
	function showinPagePopup(whichObject, whichPopup, whichFile)
	{
		var myPopUpObject;
		myPopUpObject = whichObject;
		myPopUpObject.setUrl(whichFile);
		myPopUpObject.showPopup(whichPopup);
	}
	/* define local_HeadrHTML() 
	 * responsible for adding the include 
	 * and functions to the head section of this page 
	 */
	function local_HeadrHTML(newPage)
	{
		newPage +="</head>\n";
		newPage +="\n";
		newPage +="<body>\n";  
		newPage +="\n";  
		return (newPage);

	}

