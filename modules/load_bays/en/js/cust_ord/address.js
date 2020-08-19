var opValues = new Array();
var otherText = new Array()
var items_per_page = 10;
var addrTitle = new Array();


opValues["viewAddresses"] = -1;
opValues["viewAddress"] = 2;
opValues["modifyAddressForm"] = 3;
opValues["modifyAddressSubmit"] = 13;
opValues["insertAddressForm"] = 7;
opValues["insertAddressSubmit"] = 17;
opValues["deleteAddressSubmit"] = 18;

var t__YOUR_ACTION = [                          "YOUR ACTION"                           , "请选择" ];
var t__SELECT = [                               "SELECT"                                , "请选择" ];
var t__Add_New = [                              "Add New"                               , "新增地址" ];
var t__addresses = [                            "addresses"                             , "地址管理" ];
var t__Back_To_Addresses = [                    "Back To Addresses"                     , "返回地址管理" ];
var t__Address_Details = [                      "Address Details"                       , "地址信息" ];
var t__All_fields_labelled_with_an = [          "All fields labelled with an "          , "所有标记为" ];
var t__are_mandatory = [                       "are mandatory"                          , "是必选项" ];
var t__add_new_address = [                      "add new address"                       , "新增地址" ];
var t__Customers_Order__address = [             "Customers Order, address"              , "客户管理，地址管理" ];
var t__Search_Addresses = [                     "Search Addresses"                      , "查找地址" ];
var t__Please_enter_the_address_code = [        "Please enter the address code!"        , "请输入正确的地址编号!" ];
var t__Please_enter_the_address_line_1 = [      "Please enter the address - line 1!"    , "请输入正确的地址行１!" ];
var t__Please_enter_the_address_line_2 = [      "Please enter the address - line 2!"    , "请输入正确的地址行２!" ];
var t__Please_enter_the_address___province = [  "Please enter the address - province!"  , "请输入正确的省市!" ];
var t__Please_enter_the_address___post_code = [ "Please enter the address - post code!" , "请输入正确的邮编!" ];
var t__Please_enter_the_address___country = [   "Please enter the address - country!"   , "请输入正确的国家!" ];
var t__Enter_Valid_Page_Number = [              "Enter Valid Page Number"               , "请输入正确的页码!" ];
var t__Total_Pages = [                          "Total Pages"                           , "总页数" ];
var t__Address_Code = [                         "Address Code"                          , "地址编号" ];
var t__Address_1st_Line = [                     "Address 1st Line"                      , "地址行１" ];
var t__Address_2nd_Line = [                     "Address 2nd Line"                      , "地址行２" ];
var t__Province = [                             "Province"                              , "省市" ];
var t__Postal_Code = [                          "Postal Code"                           , "邮编" ];
var t__Country = [                              "Country"                               , "国家" ];
var t__View_All = [                          "View All"                           , "查看所有信息" ];
var t__Confirm_Delete = [                          "Are you sure you want to delete?", "您是否确定要删除此地址?" ];


var myColumns = [ ml( t__Address_Code)];
otherText["youraction"] = ml(t__YOUR_ACTION);
otherText["add_select"] = ml(t__SELECT);
otherText["btn_addNew"] = ml(t__Add_New);
otherText["btn_view_All"] = ml(t__View_All);
otherText["pgHead_address"] = ml(t__addresses);
otherText["btn_bakto_addresses"] = ml(t__Back_To_Addresses);
otherText["msg_addNewAddress_fSet"] = ml(t__Address_Details);
otherText["msg_addNewAddress_frmComplt"] = ml(t__All_fields_labelled_with_an) + "(<span style=\"COLOR: #FF0000;\">*</span>)" + ml(t__are_mandatory);
otherText["pgHead_AddtkGrps"] = ml(t__add_new_address);
otherText["pgTitle_address"] = ml(t__Customers_Order__address);
otherText["t_find_addrs"] = ml(t__Search_Addresses);
otherText["msg_enterTmAddrCode"] = ml(t__Please_enter_the_address_code);
otherText["msg_enterTmAddrLine1"] = ml(t__Please_enter_the_address_line_1);
otherText["msg_enterTmAddrLine2"] = ml(t__Please_enter_the_address_line_2);
otherText["msg_enterTmAddrProvince"] = ml(t__Please_enter_the_address___province);
otherText["msg_enterTmAddrZipcode"] = ml(t__Please_enter_the_address___post_code);
otherText["msg_enterTmAddrCountry"] = ml(t__Please_enter_the_address___country);
otherText["msg_valid_pgNumber"] = ml(t__Enter_Valid_Page_Number);
otherText["msg_tot_pages"] = ml(t__Total_Pages);
addrTitle[0] = ml(t__Address_Code);
addrTitle[1] = ml(t__Address_1st_Line);
addrTitle[2] = ml(t__Address_2nd_Line);
addrTitle[3] = ml(t__Province);
addrTitle[4] = ml(t__Postal_Code);
addrTitle[5] = ml(t__Country);

		/*
 * g_opInf Hash table defined in utility.js 
 * for notifying the user about success or failuer
 * of an action performed on that page.   
 * l_opInf defined locally.
 * 
 */		   
  var l_opInf= new Array()
    for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
    l_opInf[23]= g_opInf[26];//"Successfully Inserted A New Record !";
    l_opInf[33]= g_opInf[36];//update failed    
    l_opInf[27]= g_opInf[27];//Successfully Inserted A New Record !
    l_opInf[37]= g_opInf[37];     //Insert new record Failed;
    l_opInf[28]= g_opInf[28];     //Successfully Deleted!;
    l_opInf[38]= g_opInf[38];     //deleted Failed
    l_opInf[133]=  g_opInf[136]; //db upate failed
    l_opInf[137]=  g_opInf[137]; //db insert failed
    l_opInf[138]= g_opInf[138];  //db delete failed

var ops_req_print = [-1,0,1,23,27,33,37,24,25,35,28,38];
var ops_req_search = [-1,0,1,23,27,33,37,24,25,35,28,38];
		
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
  
  if (curViewDetailState <= 1 || curViewDetailState==37 || curViewDetailState==23 || curViewDetailState==33 || curViewDetailState==27 ||  curViewDetailState==28 ||  curViewDetailState==38) // view records of tank groups
  {
      newPage += displayFindFrm();
      newPage +=addNewBtn_HTML();
      newPage +=displayStatusMsg (op);      
      newPage += "<tr> \n";
      newPage += "<td align=\"center\">\n ";
  	  newPage += infoTableHdr_HTML();
      newPage += infoTable_HTML(curColumnToSort);
      newPage += "<\/tbody>";
      newPage += "<\/table>";
      newPage += "<\/div>";
  		newPage += "<\/td>";	
  		newPage += "<\/tr>";
      if(parseInt(pagesTotal)!=0)
      {
        	newPage +=nextPage_long(pagesTotal, pg,"address.cgi", "pg");
      }  
   
  }		
 
 if (priv >= 7 && curViewDetailState ==opValues["insertAddressForm"]) // able to insert Show add new form
 {
    newPage += displayAddNewAdrsFrm();
 }
 if (priv >= 5 && (curViewDetailState ==opValues["viewAddress"] )) // able to View Address details
 {
    newPage += displayAddDetails();
 }
 if (priv >= 6 && curViewDetailState ==opValues["modifyAddressForm"]) // able to modify and view address details
 {
    newPage += displayModAdrsFrm();
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
  glblFrm += "      <input type=\"hidden\" name=\"op\" value=\"1\">\n";
  glblFrm += "      <input type=\"hidden\" name=\"pg\" value=\"1\">\n";
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
function displayAddNewAdrsFrm()
{
  var addFrmhtml ="";
  addFrmhtml +=backToBtn_HTML();  
  addFrmhtml += fieldst_HTML(otherText["msg_addNewAddress_fSet"]);
  addFrmhtml += " <div class=\"adminform\">\n";
  addFrmhtml +="<table width=\"100%\">\n";
  addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_addNewAddress_frmComplt"]); 
  addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"address.cgi\" onsubmit=\"return submitmyform(this)\">\n";
  //addFrmhtml += trmnl_field("type=\"hidden\"");
  addFrmhtml +="						<tr>\n";
  addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
  addFrmhtml +="										<table width=\"100%\">\n";
  //first row
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[0]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "<span class=\"mandatory\">*</span>\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"addrCode\" id=\"addrCode\" maxLength=\"18\" dataType=\"Require\" msg=\""+otherText["msg_enterTmAddrCode"]+"\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
 addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="												  &nbsp;\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
 //2nd row
  
 addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[1]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"addrLine1\" id=\"addrLine1\" maxLength=\"58\" dataType=\"Undanger\" msg=\""+otherText["msg_enterTmAddrLine1"]+"\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[2]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"addrLine2\" id=\"addrLine2\" maxLength=\"58\" dataType=\"Undanger\" msg=\""+otherText["msg_enterTmAddrLine2"]+"\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  //end of 2nd row
  
  // start of the 3rd row
  
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[3]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"addrLine3\" id=\"addrLine3\" maxLength=\"58\" dataType=\"Undanger\" msg=\""+otherText["msg_enterTmAddrProvince"]+"\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
 addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[4]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"addrLine4\" id=\"addrLine4\" maxLength=\"58\" dataType=\"Undanger\" msg=\""+otherText["msg_enterTmAddrZipcode"]+"\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  // end of the 3rd row
  //start of the 4th row
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[5]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"addrLine5\" id=\"addrLine5\" maxLength=\"58\" dataType=\"Undanger\" msg=\""+otherText["msg_enterTmAddrCountry"]+"\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
 addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="												  &nbsp;\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  //end of the 4th row
  
  
  addFrmhtml +="								    </table>\n";
  addFrmhtml +=frmButtRow_HTML(commBtnText["Add"], 1);
                  
  addFrmhtml +="							   </td>\n";
  addFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Add", 1);
  addFrmhtml +="							</table>\n";
  addFrmhtml += "            <\/div>\n";
  addFrmhtml +=op_field (opValues["insertAddressSubmit"]);
  addFrmhtml += "                    </form>\n";                      
  addFrmhtml += fieldstFoot_HTML();
  return addFrmhtml;
}
function displayAddDetails()
{
  var addFrmhtml ="";
  addFrmhtml +=backToBtn_HTML();  
  addFrmhtml += fieldst_HTML(otherText["msg_addNewAddress_fSet"]);
  addFrmhtml += " <div id=\"helparea\">\n";
  addFrmhtml +="<table width=\"100%\">\n";
  //addFrmhtml += trmnl_field("type=\"hidden\"");
  addFrmhtml +="						<tr>\n";
  addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
  addFrmhtml +="										<table width=\"100%\">\n";
  //first row
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[0]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td class=\"infotext\" >\n";
  addFrmhtml +=term_locs_addr_jstab["0"];
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="												  &nbsp;\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
 //2nd row
  
 addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[1]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td class=\"infotext\" >\n";
  addFrmhtml += term_locs_addr_jstab["1"];
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[2]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td class=\"infotext\" >\n";
  addFrmhtml +=term_locs_addr_jstab["2"];
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  //end of 2nd row
  
  // start of the 3rd row
  
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[3]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td class=\"infotext\" >\n";
  addFrmhtml +=term_locs_addr_jstab["3"];
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
 addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[4]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td class=\"infotext\" >\n";
  addFrmhtml +=term_locs_addr_jstab["4"];
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  // end of the 3rd row
  //start of the 4th row
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[5]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td class=\"infotext\" >\n";
  addFrmhtml +=term_locs_addr_jstab["5"];
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
 addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="												  &nbsp;\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  //end of the 4th row
  
  
  addFrmhtml +="								    </table>\n";
  
                  
  addFrmhtml +="							   </td>\n";
  addFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Add", 1);
  addFrmhtml +="							</table>\n";
  addFrmhtml += "            <\/div>\n";
                    
  addFrmhtml += fieldstFoot_HTML();
  return addFrmhtml;
}
function displayFindFrm()
{
  var findFrm = "";
  findFrm += fieldst_HTML(otherText["t_find_addrs"]);
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
  if(addrKey=="-1")addrKey="";
  findFrm += "																                      <input type=\"text\" name=\"addrKey\" id=\"addrKey\" dataType=\"Require\" msg=\""+otherText["msg_enterTmAddrCode"]+"\" value=\""+addrKey+"\" \/> \n";
  
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
function displayModAdrsFrm()
{
  var addFrmhtml ="";
  addFrmhtml +=backToBtn_HTML();  
  addFrmhtml += fieldst_HTML(otherText["msg_addNewAddress_fSet"]);
  addFrmhtml += " <div class=\"adminform\">\n";
  addFrmhtml +="<table width=\"100%\">\n";
  addFrmhtml +=infotextRow_HTML(" width=\"100%\" ",otherText["msg_addNewAddress_frmComplt"]); 
  addFrmhtml += "      <form name=\"addNew\" method =\"get\" id=\"addNew\" action=\"address.cgi\" onsubmit=\"return submitmyform(this)\">\n";
  //addFrmhtml += trmnl_field("type=\"hidden\"");
  addFrmhtml +="						<tr>\n";
  addFrmhtml +="									<td class=\"infotext\" width=\"100%\">\n";
  addFrmhtml +="										<table width=\"100%\">\n";
  //first row
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[0]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td class=\"infotext\">\n";
  addFrmhtml +="                             <input type=\"hidden\" name=\"addrCode\" id=\"addrCode\" value=\""+term_locs_addr_jstab["0"]+"\"> \n";
  addFrmhtml +=term_locs_addr_jstab["0"];
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
 addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="												  &nbsp;\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
 //2nd row
  
 addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[1]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"addrLine1\" id=\"addrLine1\" maxLength=\"58\" value=\""+term_locs_addr_jstab["1"]+"\" dataType=\"Undanger\" msg=\""+otherText["msg_enterTmAddrLine1"]+"\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[2]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"addrLine2\" id=\"addrLine2\" maxLength=\"58\" value=\""+term_locs_addr_jstab["2"]+"\" dataType=\"Undanger\" msg=\""+otherText["msg_enterTmAddrLine2"]+"\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  //end of 2nd row
  
  // start of the 3rd row
  
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[3]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"addrLine3\" id=\"addrLine3\" maxLength=\"58\" value=\""+term_locs_addr_jstab["3"]+"\" dataType=\"Undanger\" msg=\""+otherText["msg_enterTmAddrProvince"]+"\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
 addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[4]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"addrLine4\" id=\"addrLine4\" maxLength=\"58\" value=\""+term_locs_addr_jstab["4"]+"\" dataType=\"Undanger\" msg=\""+otherText["msg_enterTmAddrZipcode"]+"\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  
  // end of the 3rd row
  //start of the 4th row
  addFrmhtml +="											<tr>								\n";
  addFrmhtml +="												<td width=\"50%\">\n";
  addFrmhtml +="													<table>\n";
  addFrmhtml +="														<tr>\n";
  addFrmhtml +=textTd_HTML(" class=\"infotextheading\" width=\"140\" ",addrTitle[5]);
  addFrmhtml +=textTd_HTML(" width=\"5\" align=\"center class=\"infotext\" ",
      	    "&nbsp;\n");
  addFrmhtml +="															<td>\n";
  addFrmhtml +="                             <input type=\"text\" name=\"addrLine5\" id=\"addrLine5\" maxLength=\"58\" value=\""+term_locs_addr_jstab["5"]+"\" dataType=\"Undanger\" msg=\""+otherText["msg_enterTmAddrCountry"]+"\"> \n";
  addFrmhtml +="															</td>\n";
  addFrmhtml +="														</tr>\n";
  addFrmhtml +="													</table>\n";
  
  addFrmhtml +="									      </td>\n";
 addFrmhtml +="												<td width=\"50%\">\n";
  
  addFrmhtml +="												  &nbsp;\n";
  
  
  addFrmhtml +="									   </td>\n";
  
  addFrmhtml +="								    </tr>\n";
  //end of the 4th row
  
  
  addFrmhtml +="								    </table>\n";
  addFrmhtml +=frmButtRow_HTML(commBtnText["Update"], 1);
                  
  addFrmhtml +="							   </td>\n";
  addFrmhtml +="							 </tr>\n";
  //frmButtRow_HTML("Add", 1);
  addFrmhtml +="							</table>\n";
  addFrmhtml += "            <\/div>\n";
  addFrmhtml +=op_field (opValues["modifyAddressSubmit"]);
  addFrmhtml += "                    </form>\n";                      
  addFrmhtml += fieldstFoot_HTML();
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
   btn_HTML +="         <tr> \n";
   btn_HTML +="             <td align=\"center\">\n ";
   btn_HTML +="                                 <div class=\"button\">\n";
   
    
   if((op==opValues["insertAddressForm"] || opValues["modifyAddressForm"] || (op==opValues["viewAddress"])) && (priv>=5))
   {
       
    btn_HTML += "&nbsp; "+btnLocation_HTML("justChaneMyLocation('address.cgi?pg='+pg); ", otherText["btn_bakto_addresses"]);
    
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
   btn_HTML += btnLocation_HTML("justChaneMyLocation('address.cgi?op=7'); ", otherText["btn_addNew"]);
   if( (addrCode!="-1" && (addrCode!="")) && (priv>=5))
   {
       
      btn_HTML += "&nbsp; "+btnLocation_HTML("justChaneMyLocation('address.cgi?pg='+pg); ", otherText["btn_bakto_addresses"]);
    
   }

   if(priv>=5 && (addrKey!="-1" && addrKey!="") )
   {
	   btn_HTML += btnLocation_HTML("justChaneMyLocation('?'); ", otherText["btn_view_All"]);
   }



   btn_HTML +="                                 </div><br>\n";
   btn_HTML +="             <td>\n ";
   btn_HTML +="         </tr> \n";
  }
   return btn_HTML;
}
function updatePageHeading(op,pgHead)
{
  var pageHeading = pgHead;
  
    pageHeading +=otherText["pgHead_address"];
  return pageHeading;   
}
function updatePageTitle(op,pgTit)
{
  var pageTitle = pgTit;
     pageTitle +=otherText["pgTitle_address"];
    
  
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
  op_list +="<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+frmNum+"');\">          ";
  switch (priv)
  {
    case 8:
      op_list +="<option value=\""+opValues["deleteAddressSubmit"]+"\">" + ml( t__DELETE) + "</option>";
      
    case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

    case 6:    /* Modify not required for The Tank Grouping Page  */
    op_list +="<option value=\""+opValues["modifyAddressForm"]+"\">"+commText["Modify"]+"</option>";
    
    case 5:			/* Find Has not been implemented yet*/
    op_list +="<option value=\""+opValues["viewAddress"]+"\">"+commText["View"]+"</option>";
    break;
  }
  
  op_list +="<option value=0 selected>--\t"+otherText["youraction"]+"\t--</option>";
  op_list +="</select>                                        ";
  return op_list ;
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
	for(i in addresses)
    {
      if(i>0)
      {
        newPage += "<tr class=\"row1\">\n";
        var howmanyDone =0;
        for(var j=0; j<myColumns.length; j++)
        {
          if (curColumnToSort == howmanyDone)
          {
            newPage += "<td style=\"background-color:#EEEEEE\">" + obs(addresses[i][howmanyDone]) + "<\/td>";
			    } 
          else 
          {
          
				    newPage += "<td align=\"center\">\n";				  
				    if(howmanyDone==0) // means time to display the drop list and table
				    {
  				    newPage +="	      <form name=\"select_action_"+i+"\" id=\"select_action_"+i+"\" >\n";
              newPage +="       <table border=\"0\">\n";
              newPage +="	       <tr>\n";
              newPage +="          <td width=\"250\"> <span style=\"COLOR: #FF0000;\">"+obs(addresses[i][howmanyDone])+"</span>\n";
              newPage +="          <input type=\"hidden\" name=\"addrCode\" id=\"addrCode\" value=\""+addresses[i][howmanyDone]+"\">\n";
              //newPage +="          <input type=\"hidden\" name=\"trmnl\" id=\"trmnl\" value=\""+trmnl+"\">\n";
              newPage +="          <input type=\"hidden\" name=\"pg\" id=\"pg\" value=\""+pg+"\">\n";
              //newPage +=op_field ("");
              newPage +=          preqstr_field ();
              newPage +="          </td>\n";
              newPage +="          <td width=\"150\" align=\"right\">\n";
              newPage += op_list(priv, addresses[i][(howmanyDone+1)],i );
              newPage +="          </td>\n";
              newPage +="	       </tr>\n";
              newPage +="	      </table>\n";
              newPage +="	      </form>\n";
            }
            else
            {
              newPage += obs(addresses[i][howmanyDone]);
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
  	nextPgHTML += "          		<input type=\"hidden\" name=\"addrKey\" value="+addrKey+">\n";
  	
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
    	nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) + "&op="+op+"&addrKey="+addrKey+"'); ", "&lt;&lt;");
		foobar = page_number - 1;
		
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		 nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&op="+op+"&addrKey="+addrKey+"'); ", "<b>&lt;<\/b>");
		
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&op="+op+"&addrKey="+addrKey+"'); ", foobar1 + "-" + foobar2);
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
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&op="+op+"&addrKey="+addrKey+"'); ", i);
	}
	
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	
	for (var i=page_number+1; i<foobar2; i++) 
  	{
    	//alert("I am in for for foobar2 loop "+i);	
    	nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&op="+op+"&addrKey="+addrKey+"'); ", i);
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&op="+op+"&addrKey="+addrKey+"'); ", tempTxt);
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
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&op="+op+"&addrKey="+addrKey+"'); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) +"&op="+op+"&addrKey="+addrKey+"'); ", "<b>&gt;&gt;<\/b>");
	} else {
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}
  
  
	

	return nextPgHTML;
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
  newPage +=    "var myselectedvalue = myobject.options[myobject.selectedIndex].value;";
  newPage +="   if(myselectedvalue==\""+opValues["deleteAddressSubmit"]+"\")\n";
  newPage += "  {\n";
  
  newPage += "	  if(confirm('" + ml(t__Confirm_Delete) + "'))\n";
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
