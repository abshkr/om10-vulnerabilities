var opValues = new Array();

// operations to delivery locations
opValues["baseDelivLoc"] = 400;
opValues["listDelivLoc"] = 401;
opValues["defaultDelivLoc"] = 402;
opValues["assignDelivLocToAll"] = 403;
opValues["searchDelivLocForm"] = 404;
opValues["searchDelivLocSubmit"] = 414;
opValues["viewDelivLoc"] = 405;
opValues["modifyDelivLocForm"] = 406;
opValues["modifyDelivLocSubmit"] = 416;
opValues["insertDelivLocForm"] = 407;
opValues["insertDelivLocSubmit"] = 417;
opValues["deleteDelivLocForm"] = 408;
opValues["deleteDelivLocSubmit"] = 418;
opValues["assignDelivLocForm"] = 409;
opValues["assignDelivLocSubmit"] = 419;

// operation to addresses
opValues["baseAddress"] = 30000;
opValues["listAddress"] = 30001;
opValues["searchAddressForm"] = 30004;
opValues["searchAddressSubmit"] = 30014;
opValues["viewAddress"] = 30005;
opValues["modifyAddressForm"] = 30006;
opValues["modifyAddressSubmit"] = 30016;
opValues["insertAddressForm"] = 30007;
opValues["insertAddressSubmit"] = 30017;
opValues["deleteAddressForm"] = 30008;
opValues["deleteAddressSubmit"] = 30018;


var items_per_page = 10;


var t__Supplier = ["Supplier","��Ӧ��"];
var t__Def_Dliver_Loc = ["Default Delivery Location","��ⵥλ"];
var t__Cust_Category = ["Category ", "�ͻ����"];
var t__Customer = ["Customer ", "�����վ"];
var t__Assign_Mode = ["Assign Type ", "������ʽ"];

var t_Assign_Mode_Option1 = ["Assign to Customer", "���͵ص���ͻ�ʵ�й���"];
var t_Assign_Mode_Option2 = ["Unassign from Customer", "���͵ص���ͻ��������"];
var assign_mode_jslist = [ ["", ""], ["1", ml(t_Assign_Mode_Option1)], ["2", ml(t_Assign_Mode_Option2)] ];

var t__Select_Assign_Mode = ["Select Assign Type","ѡ�������ʽ"];
var t__Select_A_Supplier = ["Select A Supplier","ѡ��Ӧ��"];
var t__Select_A_Customer = ["Select A Customer","ѡ�������վ"];
var t__Select_A_Category = ["Select A Category","ѡ��ͻ����"];


var t__Table_Header1 = ["Code", "���͵ص����"];
var t__Table_Header2 = ["Name", "���͵ص�����"];
var t__Table_Header3 = ["Grid", "���͵ص㶨λ"];
var t__Table_Header4 = ["Type", "������������"];


var column_headers = [ ml(t__Table_Header1), ml(t__Table_Header2), ml(t__Table_Header3), ml(t__Table_Header4) ];

var otherText = new Array();

var t__YOUR_ACTION = ["YOUR ACTION","��ѡ��"];
var t__DELVLOC_DET = ["DELIVERY LOCATION DETAILS", "���͵ص�����"];
var t__DELVLOC_DEFAULT = ["SET AS DEFAULT LOCATION", "��Ϊ��ⵥλ"];
var t__ASSIGN_ONE_CUSTOMER = ["ASSIGN TO ONE CUSTOMER","�Ϳͻ�����"];
var t__ASSIGN_ALL_CUSTOMER = ["ASSIGN TO ALL CUSTOMERS","�����пͻ�����"];
otherText["youraction"] =  ml(t__YOUR_ACTION);
otherText["delivLocDetails"] = ml(t__DELVLOC_DET);
otherText["assignOneCust"] = ml(t__ASSIGN_ONE_CUSTOMER);
otherText["assignAllCust"] = ml(t__ASSIGN_ALL_CUSTOMER);
otherText["setAsDefault"] = ml(t__DELVLOC_DEFAULT);

var t__Title_Assign_Delvloc = ["Assign Delivery Location", "���͵ص�Ϳͻ�����"];

var t__Assign = ["Update Assign", "�����޸�"];
var t__Add_Delv_Loc = ["Add New Location", "�������͵ص�"];
var t__Search_Delv_Loc = ["Search A Location", "�������͵ص�"];
var t__Back_To_Cust = ["Back to Customer", "���ؿͻ�����"];
var t__View_Delv_Loc = ["View Location", "�鿴���͵ص�"];
otherText["btn_addNew_delivLocs"] = ml(t__Add_Delv_Loc);
otherText["btn_search_delivLocs"] = ml(t__Search_Delv_Loc);
otherText["btn_bakto_customers"] = ml(t__Back_To_Cust);
otherText["btn_view_delivLocs"] = ml(t__View_Delv_Loc);
otherText["btn_assign"] = ml(t__Assign);

var t__Add_Address = ["Add New Address", "������ַ"];
var t__Back_To_Delvloc = ["Back to Delivery Location Page", "�������͵ص����"];
var t__Back_To_Address = ["Back to Address Page", "���ص�ַ����"];
var t__Back_To_Delvloc_Add = ["Back to Add Delivery Location Page", "�����������͵ص�"];
var t__Back_To_Delvloc_Upd = ["Back to Modify Delivery Location Page", "�����޸����͵ص�"];
otherText["btn_addNew_delivAddr"] = ml(t__Add_Address);
otherText["btn_bakto_delivLocsPg"] = ml(t__Back_To_Delvloc);
otherText["btn_bakto_delivAddrPg"] = ml(t__Back_To_Address);
otherText["btn_bakto_delivLocsAdd"] = ml(t__Back_To_Delvloc_Add);
otherText["btn_bakto_delivLocsUpd"] = ml(t__Back_To_Delvloc_Upd);

var t__Next_Page = ["Next", "��һҳ"];
var t__Prev_Page = ["Previous", "��һҳ"];
var t__Search_Go = ["Start the Search ...", "��ʼ���� ..."];
otherText["btn_next_page"] = ml(t__Next_Page);
otherText["btn_prev_page"] = ml(t__Prev_Page);
otherText["btn_search_go"] = ml(t__Search_Go);

var t__Tab_Supp_Cust = ["Supplier and Customer Details", "��Ӧ�̺Ϳͻ���Ϣ"];
otherText["tab_supp_cust"] = ml(t__Tab_Supp_Cust);

var t__Page_Title_Delvloc = ["Customer Order Processing, Delivery Locations Page", "�ͻ���������, ���͵ص����"];
var t__Page_Title_Delvloc_Upd = ["Customer Order Processing, Delivery Locations, Modify", "�ͻ���������, ���͵ص����, �޸�"];
var t__Page_Title_Delvloc_Add = ["Customer Order Processing, Delivery Locations, Add", "�ͻ���������, ���͵ص����, ����"];
var t__Page_Title_Delvloc_Del = ["Customer Order Processing, Delivery Locations, Delete", "�ͻ���������, ���͵ص����, ɾ��"];
var t__Page_Title_Delvloc_Assn = ["Customer Order Processing, Delivery Locations, Assign Delivery Location", "�ͻ���������, ���͵ص����, ���͵ص�Ϳͻ�����"];
otherText["pgTitle_delivLocs"] = ml(t__Page_Title_Delvloc);
otherText["pgTitle_delivLocsUpd"] = ml(t__Page_Title_Delvloc_Upd);
otherText["pgTitle_delivLocsAdd"] = ml(t__Page_Title_Delvloc_Add);
otherText["pgTitle_delivLocsDel"] = ml(t__Page_Title_Delvloc_Del);
otherText["pgTitle_delivLocsAssn"] = ml(t__Page_Title_Delvloc_Assn);

var t__Page_Title_Address = ["Customer Order Processing, Delivery Locations, Address Page", "�ͻ���������, ���͵ص����, ��ַ����"];
var t__Page_Title_Address_Upd = ["Customer Order Processing, Delivery Locations, Address, Modify", "�ͻ���������, ���͵ص����, ��ַ����, �޸�"];
var t__Page_Title_Address_Add = ["Customer Order Processing, Delivery Locations, Address, Add", "�ͻ���������, ���͵ص����, ��ַ����, ����"];
otherText["pgTitle_delivAddr"] = ml(t__Page_Title_Address);
otherText["pgTitle_delivAddrUpd"] = ml(t__Page_Title_Address_Upd);
otherText["pgTitle_delivAddrAdd"] = ml(t__Page_Title_Address_Add);

var t__Page_Head_Delvloc = ["Delivery Locations", "���͵ص����"];
var t__Page_Head_Delvloc_Upd = ["Modify Delivery Location", "�޸����͵ص�"];
var t__Page_Head_Delvloc_Add = ["Add Delivery Location", "�������͵ص�"];
var t__Page_Head_Delvloc_Del = ["Delete Delivery Location", "ɾ�����͵ص�"];
var t__Page_Head_Delvloc_Assn = ["Assign Delivery Location", "���͵ص�Ϳͻ�����"];
var t__Page_Head_Address = ["Address", "��ַ����"];
var t__Page_Head_Address_Upd = ["Modify Address", "�޸ĵ�ַ"];
var t__Page_Head_Address_Add = ["Add Address", "������ַ"];
otherText["pgHead_delivLocs"] = ml(t__Page_Head_Delvloc);
otherText["pgHead_delivLocsUpd"] = ml(t__Page_Head_Delvloc_Upd);
otherText["pgHead_delivLocsAdd"] = ml(t__Page_Head_Delvloc_Add);
otherText["pgHead_delivLocsDel"] = ml(t__Page_Head_Delvloc_Del);
otherText["pgHead_delivLocsAssn"] = ml(t__Page_Head_Delvloc_Assn);
otherText["pgHead_delivAddr"] = ml(t__Page_Head_Address);
otherText["pgHead_delivAddrUpd"] = ml(t__Page_Head_Address_Upd);
otherText["pgHead_delivAddrAdd"] = ml(t__Page_Head_Address_Add);

var t__Del_Confirm = ["Are you sure you want to delete?", "���Ƿ�ȷ��Ҫɾ������¼?"];
var t__Assign_Confirm = ["Are you sure you want to assign this delivery location to all customers?", "���Ƿ�ȷ��Ҫ�������͵ص�����пͻ�����?"];
otherText["msg_del_confirm"] = ml(t__Del_Confirm);
otherText["msg_assign_confirm"] = ml(t__Assign_Confirm);

var t__Delvloc_Form_Title = ["Delivery Location", "���͵ص�"];
var t__Delvloc_Form_Note = ["All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory", "���б���(<span style=\"COLOR: #FF0000;\">*</span>)�ı��������д"];
var t__Address_Form_Title = ["Address", "��ַ"];
var t__Address_Form_Note = ["All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory", "���б���(<span style=\"COLOR: #FF0000;\">*</span>)�ı��������д"];
var t__Assign_Delvloc_Form_Title = ["Delivery Location", "���͵ص�Ϳͻ�����"];
var t__Assign_Delvloc_Form_Note = ["All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory.<br><b>Note:</b> You can choose to assign this delivery location to one customer only, or all customers of one category, or all customers of all categories! or unassign the delivery location from all above", "���б���(<span style=\"COLOR: #FF0000;\">*</span>)�ı��������д��<br><b>��ע�⣺</b>�����Խ������͵ص�ֻ��һ���ͻ�����������ĳ������ȫ���ͻ��������������пͻ�����ȫ���ͻ���������Ҳ���Ժ�ĳ�������пͻ��������"];
otherText["msg_updDelivLoc_fSet"] = ml(t__Delvloc_Form_Title);
otherText["msg_updDelivLoc_frmComplt"] = ml(t__Delvloc_Form_Note);
otherText["msg_addDelivLoc_fSet"] = ml(t__Delvloc_Form_Title);
otherText["msg_addDelivLoc_frmComplt"] = ml(t__Delvloc_Form_Note);
otherText["msg_addDelivAddr_fSet"] = ml(t__Address_Form_Title);
otherText["msg_addDelivAddr_frmComplt"] = ml(t__Address_Form_Note);
otherText["msg_updDelivAddr_fSet"] = ml(t__Address_Form_Title);
otherText["msg_updDelivAddr_frmComplt"] = ml(t__Address_Form_Note);
otherText["msg_assnDelivLoc_fSet"] = ml(t__Assign_Delvloc_Form_Title);
otherText["msg_assnDelivLoc_frmComplt"] = ml(t__Assign_Delvloc_Form_Note);


var t__Select_Address = ["Please select an address", "��ѡ���ַ"];
otherText["msg_selAaddr"] = ml(t__Select_Address);

var t__Enter_Delivloc_Code = ["Please enter the delivery location code!", "���������͵ص����"];
var t__Enter_Delivloc_Name = ["Please enter the delivery location name!", "���������͵ص�����"];
var t__Select_Delivloc_Addr = ["Please select the address!", "��ѡ�����͵ص��ַ"];
var t__Enter_Delivloc_Grid = ["Please enter the delivery location grid!", "���������͵ص㶨λ(��ͼ����)!"];
otherText["msg_enterDelivLocCode"] = ml(t__Enter_Delivloc_Code);
otherText["msg_enterDelivLocName"] = ml(t__Enter_Delivloc_Name);
otherText["msg_selDelivLocAddr"] = ml(t__Select_Delivloc_Addr);
otherText["msg_enterDelivLocGrid"] = ml(t__Enter_Delivloc_Grid);

var t__Select_Delivloc_Trans = ["Please select the transport!", "��ѡ�����͵ص�����䷽ʽ!"];
var t__Select_Delivloc_Lgst = ["Please select the largest!", "��ѡ�����͵ص����������豸!"];
var t__Select_Delivloc_Doc = ["Please select the document!", "��ѡ�����͵ص���ļ�����!"];
var t__Select_Delivloc_Unit = ["Please select the unit!", "��ѡ�����͵ص�ļ�������!"];
otherText["msg_selDelivLocTransp"] = ml(t__Select_Delivloc_Trans);
otherText["msg_selDelivLocLgst"] = ml(t__Select_Delivloc_Lgst);
otherText["msg_selDelivLocDoc"] = ml(t__Select_Delivloc_Doc);
otherText["msg_selDelivLocUnit"] = ml(t__Select_Delivloc_Unit);

var t__Enter_Delivloc_TripTime = ["Please enter the delivery location trip time", "���������͵ص㶩������ʱ��"];
var t__Enter_Delivloc_TripDist = ["Please enter the delivery location trip distance", "���������͵ص㶩������·��"];
var t__Enter_Delivloc_Tariff = ["Please enter the delivery location tariff", "���������͵ص㺣��˰��"];
var t__Enter_Delivloc_Contact = ["Please enter the delivery location contact!", "���������͵ص���ϵ����!"];
var t__Enter_Delivloc_Phone = ["Please enter the delivery location phone!", "���������͵ص�绰����!"];
otherText["msg_enterDelivLocTripTime"] = ml(t__Enter_Delivloc_TripTime);
otherText["msg_enterDelivLocTripDist"] = ml(t__Enter_Delivloc_TripDist);
otherText["msg_enterDelivLocTariff"] = ml(t__Enter_Delivloc_Tariff);
otherText["msg_enterDelivLocContact"] = ml(t__Enter_Delivloc_Contact);
otherText["msg_enterDelivLocPhone"] = ml(t__Enter_Delivloc_Phone);

var t__Select_Delivloc_Profile = ["Please select the profile!", "��ѡ�����͵ص�Ԥ��������豸!"];
otherText["msg_selDelivLocProfile"] = ml(t__Select_Delivloc_Profile);

var t__Enter_Address_Code = ["Please enter the delivery location address code!", "���������͵ص��ַ����!"];
var t__Enter_Address_Line1 = ["Please enter the delivery location address - line 1!", "���������͵ص��ַ - ��һ��!"];
var t__Enter_Address_Line2 = ["Please enter the delivery location address - line 2!", "���������͵ص��ַ - �ڶ���!"];
var t__Enter_Address_Province = ["Please enter the delivery location address - province!", "���������͵ص��ַ - ʡ/��/��!"];
var t__Enter_Address_Zipcode = ["Please enter the delivery location address - post code!", "���������͵ص��ַ - ��������!"];
var t__Enter_Address_Country = ["Please enter the delivery location address - country!", "���������͵ص��ַ - ����!"];
otherText["msg_enterDelivAddrCode"] = ml(t__Enter_Address_Code);
otherText["msg_enterDelivAddrLine1"] = ml(t__Enter_Address_Line1);
otherText["msg_enterDelivAddrLine2"] = ml(t__Enter_Address_Line2);
otherText["msg_enterDelivAddrProvince"] = ml(t__Enter_Address_Province);
otherText["msg_enterDelivAddrZipcode"] = ml(t__Enter_Address_Zipcode);
otherText["msg_enterDelivAddrCountry"] = ml(t__Enter_Address_Country);


var t__Title_Supp = ["Supplier", "��Ӧ��"];
var t__Title_Cust = ["Customer", "�ͻ�"];
otherText["supp"] = ml(t__Title_Supp);
otherText["cust"] = ml(t__Title_Cust);


var addrTitle = new Array();
var t__Title_Address_Code = ["Address Code:", "��ַ����"];
var t__Title_Address_Line1 = ["Address 1st Line:", "��ַ��һ��"];
var t__Title_Address_Line2 = ["Address 2nd Line:", "��ַ�ڶ���"];
var t__Title_Address_Province = ["Province:", "ʡ/��/��"];
var t__Title_Address_Zipcode = ["Postal Code:", "��������"];
var t__Title_Address_Country = ["Country:", "����"];
addrTitle[0] = ml(t__Title_Address_Code);
addrTitle[1] = ml(t__Title_Address_Line1);
addrTitle[2] = ml(t__Title_Address_Line2);
addrTitle[3] = ml(t__Title_Address_Province);
addrTitle[4] = ml(t__Title_Address_Zipcode);
addrTitle[5] = ml(t__Title_Address_Country);


var delivLocTitle = new Array();
var t__Title_Delivlov_Default = ["Treat this delivery location as Default Customer Delivery", "�������͵ص���Ϊ��ⵥλ(Ĭ�����͵ص�)"];
var t__Title_Delivlov_Code = ["Code", "���͵ص����"];
var t__Title_Delivlov_Addrcode = ["Address Code", "���͵ص��ַ����"];
var t__Title_Delivlov_Name = ["Name", "���͵ص�����"];
var t__Title_Delivlov_Address = ["Address", "���͵ص��ַ"];
var t__Title_Delivlov_Grid = ["Grid", "���͵ص㶨λ(��ͼ����)"];
delivLocTitle["default"] = ml(t__Title_Delivlov_Default);
delivLocTitle["code"] = ml(t__Title_Delivlov_Code);
delivLocTitle["addrcode"] = ml(t__Title_Delivlov_Addrcode);
delivLocTitle["name"] = ml(t__Title_Delivlov_Name);
delivLocTitle["addr"] = ml(t__Title_Delivlov_Address);
delivLocTitle["grid"] = ml(t__Title_Delivlov_Grid);


var t__Title_Delivlov_Transport = ["Transport", "������������"];
var t__Title_Delivlov_Largest = ["Largest", "���͵ص���������豸"];
var t__Title_Delivlov_Document = ["Document", "���͵ص��ļ�����"];
var t__Title_Delivlov_Unit = ["Unit", "���͵ص��������"];
var t__Title_Delivlov_Tarrif = ["Tarrif", "���͵ص㺣��˰��"];
var t__Title_Delivlov_TripTime = ["Trip Time", "������������ʱ��"];
var t__Title_Delivlov_TripDist = ["Trip Distance", "������������·��"];
var t__Title_Delivlov_Contact = ["Contact", "��ϵ����"];
var t__Title_Delivlov_Phone = ["Phone", "�绰����"];
var t__Title_Delivlov_Profile = ["Profile", "Ԥ��������豸"];
delivLocTitle["transpt"] = ml(t__Title_Delivlov_Transport);
delivLocTitle["largst"] = ml(t__Title_Delivlov_Largest);
delivLocTitle["doc"] = ml(t__Title_Delivlov_Document);
delivLocTitle["unit"] = ml(t__Title_Delivlov_Unit);
delivLocTitle["tarif"] = ml(t__Title_Delivlov_Tarrif);
delivLocTitle["trip_time"] = ml(t__Title_Delivlov_TripTime);
delivLocTitle["trip_dist"] = ml(t__Title_Delivlov_TripDist);
delivLocTitle["contact"] = ml(t__Title_Delivlov_Contact);
delivLocTitle["phone"] = ml(t__Title_Delivlov_Phone);
delivLocTitle["prof"] = ml(t__Title_Delivlov_Profile);


var l_opInf= new Array()
for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
var t__Delete_Ok = ["Successfully Deleted!", "�ɹ�ɾ��!"];
var t__Insert_Ok = ["Successfully Inserted!", "�ɹ�����!"];
var t__Update_Ok = ["Successfully Updated!", "�ɹ��޸�!"];
var t__Delete_Fail = ["Delete Failed!", "ɾ��ʧ��!"];
var t__Insert_Fail = ["Insert Failed!", "����ʧ��!"];
var t__Update_Fail = ["Update Failed!", "�޸�ʧ��!"];
var t__Record_Used = [" This Record is still used!", " ����������Ȼ��������Դʹ���ţ�"];

l_opInf[428]= ml(t__Delvloc_Form_Title) + ml(t__Delete_Ok);
l_opInf[427]= ml(t__Delvloc_Form_Title) + ml(t__Insert_Ok);
l_opInf[426]= ml(t__Delvloc_Form_Title) + ml(t__Update_Ok);
l_opInf[438]= ml(t__Delvloc_Form_Title) + ml(t__Delete_Fail);
l_opInf[448]= ml(t__Delvloc_Form_Title) + ml(t__Delete_Fail) + ml(t__Record_Used);
l_opInf[437]= ml(t__Delvloc_Form_Title) + ml(t__Insert_Fail);
l_opInf[436]= ml(t__Delvloc_Form_Title) + ml(t__Update_Fail);
l_opInf[429]= ml(t__Assign_Delvloc_Form_Title) + ml(t__Update_Ok);
l_opInf[439]= ml(t__Assign_Delvloc_Form_Title) + ml(t__Update_Fail);

l_opInf[30028]= ml(t__Address_Form_Title) + ml(t__Delete_Ok);
l_opInf[30027]= ml(t__Address_Form_Title) + ml(t__Insert_Ok);
l_opInf[30026]= ml(t__Address_Form_Title) + ml(t__Update_Ok);
l_opInf[30038]= ml(t__Address_Form_Title) + ml(t__Delete_Fail);
l_opInf[30037]= ml(t__Address_Form_Title) + ml(t__Insert_Fail);
l_opInf[30036]= ml(t__Address_Form_Title) + ml(t__Update_Fail);



/********************
 * 2 rrays
 * decide if need to display the
 * print and search buttons or not
 */                    
var ops_req_print = [-1, 401,404,405,406,407, 30001,30004,30005,30006,30007];
var ops_req_search = [-1, 401];// search never required on this page



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

	/* View records of delivery location locations */
	if (priv >= 5 && curViewDetailState == opValues["listDelivLoc"]) 
	{
		newPage += displayDelivLocList (curPrivilage, curColumnToSort);
	}
	if (priv >= 5 && curViewDetailState == opValues["viewDelivLoc"]) 
	{
		newPage += displayDelivLocDetails (curPrivilage, curColumnToSort);
	}
		
	
	/* Display Address Details */
	if (priv >= 5 && curViewDetailState == opValues["viewAddress"]) 	
	{
		newPage += displayDelivLocAddress();
	}

	/* Display Form for Modify DelivLoc Address Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyAddressForm"])	
	{
		newPage += displayModifyDelivLocAddressForm();
	}
	/* Submit the Modification of DelivLoc Address Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyAddressSubmit"])	
	{
		newPage += displayDelivLocAddress();
	}
	
	/* Display Form for Add DelivLoc Address Details */
	if (priv >= 7 && curViewDetailState == opValues["insertAddressForm"])	
	{
		newPage += displayInsertDelivLocAddressForm();
	}
	/* Submit the Insertion of DelivLoc Address Details */
	if (priv >= 7 && curViewDetailState == opValues["insertAddressSubmit"])	
	{
//		newPage += displayInsertDelivLocForm();
		newPage += displayModifyDelivLocForm();
	}
	
	/* Display Form for Modify DelivLoc Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyDelivLocForm"])	
	{
		newPage += displayModifyDelivLocForm();
	}
	/* Submit the Modification of DelivLoc Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyDelivLocSubmit"])	
	{
		newPage += displayDelivLocList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Assign DelivLoc Details */
	if (priv >= 6 && curViewDetailState == opValues["assignDelivLocForm"])	
	{
		newPage += displayAssignDelivLocForm();
	}
	/* Submit the Modification of DelivLoc Details */
	if (priv >= 6 && curViewDetailState == opValues["assignDelivLocSubmit"])	
	{
		newPage += displayDelivLocList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Insert DelivLoc Details */
	if (priv >= 7 && curViewDetailState == opValues["insertDelivLocForm"])	
	{
		newPage += displayInsertDelivLocForm();
	}
	/* Submit the Insertion of DelivLoc Details */
	if (priv >= 7 && curViewDetailState == opValues["insertDelivLocSubmit"])	
	{
		newPage += displayDelivLocList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Delete a recorde of DelivLoc */
//	if (priv >= 8 && curViewDetailState == opValues["deleteDelivLocForm"])	
//	{
//		newPage += displayDeleteDelivLocForm();
//	}
	/* Submit the Deletion of DelivLoc Details */
	if (priv >= 8 && curViewDetailState == opValues["deleteDelivLocSubmit"])	
	{
		newPage += displayDelivLocList(curPrivilage, curColumnToSort);
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



function displayGlblFrm()
{
	var glblFrm = "";

	return glblFrm;
}






function displayDelivLocList(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm ="";
	var ordIndex = 0;

	ordIndex = deliv_jstab.length - 1;

	//dispFrm += makespace("\t", indent) + displayGlblFrm();
	dispFrm += makespace("\t", indent) + btnGroupDelivLoc_HTML();
	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "delivery.php", "pg_3");

	if (is_search_on == 1)
	{

		if (frm_deliv_name_search == "-1")
		{
			frm_deliv_name_search = "";
		}
		if (frm_deliv_code_search == "-1")
		{
			frm_deliv_code_search = "";
		}

		dispFrm += makespace("\t", indent) + "<tr> \n";
		dispFrm += makespace("\t", indent) + "<td align=\"left\">\n";

		dispFrm += makespace("\t", indent+1) + "<form name=\"list_deliv_loc\" method=\"get\" id=\"list_deliv_loc\" action=\"delivery.php\" onsubmit=\"return Validator.Validate(this,1);\">\n";

		dispFrm += " <ul id=\"tabmenu\">\n";
		dispFrm += "<li>" + otherText["btn_search_delivLocs"] + "</li>\n";
		dispFrm += "</ul>\n";

		dispFrm += "<div class=\"adminform\">\n";
		dispFrm += makespace("\t", indent+1) + "<table>\n";

		dispFrm += makespace("\t", indent+3) + "<tr>\n";
		dispFrm += makespace("\t", indent+3) + "<td class=\"infotext\" colspan=8>\n";

		// hidden area for passing values between web pages
		dispFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["listDelivLoc"] + "\">\n";

		dispFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
		dispFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
		dispFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"suppCd\" value=\"" + cmpyCd + "\">\n";
		dispFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
		dispFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";
		dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"is_search_on\" id=\"is_search_on\" value=\"" + is_search_on + "\">\n";

		dispFrm += makespace("\t", indent+3) + "</td>\n";
		dispFrm += makespace("\t", indent+3) + "</tr>\n";


		dispFrm += makespace("\t", indent+1) + "<tr> \n";

		dispFrm += makespace("\t", indent+3) + "<td width=\"20px\">&nbsp;\n";
		dispFrm += makespace("\t", indent+3) + "</td>\n";

		dispFrm += makefield(1, delivLocTitle["name"], frm_deliv_name_search, "frm_deliv_name_search", "frm_deliv_name_search", "", 30, 49, "onchange=\"submit();\" ", "", "&nbsp;", indent+4, 100);

		dispFrm += makespace("\t", indent+3) + "<td width=\"20px\">&nbsp;\n";
		dispFrm += makespace("\t", indent+3) + "</td>\n";

		dispFrm += makefield(2, delivLocTitle["transpt"], frm_deliv_trans_search, "frm_deliv_trans_search", "frm_deliv_trans_search", transport_types, 0, 0, "onchange=\"submit();\" ", "", "&nbsp;", indent+4, 100);

		dispFrm += makespace("\t", indent+1) + "</tr> \n";

		dispFrm += makespace("\t", indent+1) + "<tr> \n";

		dispFrm += makespace("\t", indent+3) + "<td width=\"20px\">&nbsp;\n";
		dispFrm += makespace("\t", indent+3) + "</td>\n";
		
		dispFrm += makefield(1, delivLocTitle["code"], frm_deliv_code_search, "frm_deliv_code_search", "frm_deliv_code_search", "", 30, 15, "onchange=\"submit();\" ", "", "&nbsp;", indent+4, 100);
		
		dispFrm += makespace("\t", indent+3) + "<td width=\"20px\">&nbsp;\n";
		dispFrm += makespace("\t", indent+3) + "</td>\n";

		dispFrm += makespace("\t", indent+3) + "<td align=\"left\" class=\"infotext\" width=\"100\">\n";
		dispFrm += "<input type=\"submit\" value=\""+commText["Search"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
		dispFrm += makespace("\t", indent+3) + "</td>\n";
		
		dispFrm += makespace("\t", indent+1) + "</tr> \n";

		dispFrm += makespace("\t", indent+1) + "</table>\n";
		dispFrm += makespace("\t", indent+2) + "</div>\n";

		dispFrm += makespace("\t", indent+1) + "</form>\n";

		dispFrm += makespace("\t", indent) + "</td>\n";	
		dispFrm += makespace("\t", indent) + "</tr> \n";
	}


	dispFrm += makespace("\t", indent) + "<tr> \n";

	// end of the td and tr for the list area
	dispFrm += makespace("\t", indent) + "<td>\n ";  
	if( ((column_headers.length)> 0))
	{
		dispFrm += makespace("\t", indent+1) + "<div id=\"printReady\">\n";
		dispFrm += makespace("\t", indent+2) + table_begin("M", 0,"");
		dispFrm += makespace("\t", indent+2) + "<tbody> \n";
		dispFrm += makespace("\t", indent+2) + "<tr>\n";
		for(var i=0; i<column_headers.length; i++)
		{
			dispFrm += makespace("\t", indent+2) + "<td>" + column_headers[i] + "</td>\n";
		}
		dispFrm += makespace("\t", indent+2) + "</tr>\n";
	}

	for(i in deliv_jstab)
	{
		if (i>0)
		{
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone =0;
			for(var j=0; j<column_headers.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(cust_jstab[i][howmanyDone]) + "<\/td>";
				} 
				else 
				{
					dispFrm += makespace("\t", indent+2) + "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						dispFrm += makespace("\t", indent+3) + "<form name=\"select_action_" + i + "\" id=\"select_action_" + i + "\" >\n";
						dispFrm += makespace("\t", indent+4) + "<table border=\"0\">\n";
						dispFrm += makespace("\t", indent+4) + "<tr>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\"> <span style=\"COLOR: #FF0000;\">" + obs(deliv_jstab[i][howmanyDone]) + "</span>\n";
              
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"delivCd\" id=\"delivCd\" value=\"" + deliv_jstab[i][howmanyDone] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"suppCd\" value=\"" + cmpyCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"is_search_on\" id=\"is_search_on\" value=\"" + is_search_on + "\">\n";


						dispFrm += makespace("\t", indent+5) + preqstr_field ();
						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

						dispFrm += makespace("\t", indent+5) + op_list (curPrivilage, deliv_jstab[i][howmanyDone], i);

						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "</tr>\n";
						dispFrm += makespace("\t", indent+4) + "</table>\n";
						dispFrm += makespace("\t", indent+3) + "</form>\n";
					}
					else
					{
						dispFrm += makespace("\t", indent+3) + obs(deliv_jstab[i][howmanyDone]);
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
//	dispFrm += makespace("\t", indent) + "</td>";	
//	dispFrm += makespace("\t", indent) + "</tr>";     
	dispFrm += makespace("\t", indent) + "</td>\n ";
	dispFrm += makespace("\t", indent) + "</tr>\n";
  
	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "delivery.php", "pg_3");
//	dispFrm += makespace("\t", indent) + btnGroupDelivLoc_HTML();

	return dispFrm;
}



function displayDelivLocDetails(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm = "";
	var deliv_locs_addr_details;

	deliv_locs_addr_details = deliv_locs_addr_jstab["1"] + "<br>" + deliv_locs_addr_jstab["2"] + "<br>" + deliv_locs_addr_jstab["3"] + " " + deliv_locs_addr_jstab["4"] + "<br>" + deliv_locs_addr_jstab["5"];

	dispFrm += makespace("\t", indent) + btnGroupDelivLocDetails_HTML();
	dispFrm += makespace("\t", indent) + "<tr>\n";
	dispFrm += makespace("\t", indent) + "<td align=\"left\"> \n";
	dispFrm += makespace("\t", indent+1) + "<table width=\"100%\">\n";

	// 1st row
	dispFrm += makespace("\t", indent+1) + "<tr>\n";
	dispFrm += makefield(0, delivLocTitle["code"], deliv_locs_det_jstab[2], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 140);
	dispFrm += makefield(0, delivLocTitle["name"], deliv_locs_det_jstab[1], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 140);
	dispFrm += makespace("\t", indent+1) + "</tr>\n";

	// 2nd row
	dispFrm += makespace("\t", indent+1) + "<tr>\n";
	dispFrm += makefield(0, delivLocTitle["addr"], deliv_locs_addr_details, "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 140);
	dispFrm += makefield(0, delivLocTitle["addrcode"], deliv_locs_det_jstab[3], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 140);
	dispFrm += makespace("\t", indent+1) + "</tr>\n";

	// 3rd row
	dispFrm += makespace("\t", indent+1) + "<tr>\n";
	dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 140);
	dispFrm += makefield(0, delivLocTitle["grid"], deliv_locs_det_jstab[4], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 140);
	dispFrm += makespace("\t", indent+1) + "</tr>\n";
	dispFrm += makespace("\t", indent+1) + "</table>\n";
	dispFrm += makespace("\t", indent) + "</td> \n";
	dispFrm += makespace("\t", indent) + "</tr> \n";
	 
	dispFrm += makespace("\t", indent) + "<tr> \n";
	dispFrm += makespace("\t", indent) + "<td align=\"left\"> \n";
	dispFrm += makespace("\t", indent+1) + "<div id=\"helparea\"> \n";
	dispFrm += makespace("\t", indent+2) + "<table width=\"100%\">\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makefield(0, delivLocTitle["transpt"], deliv_locs_det_jstab[5], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makefield(0, delivLocTitle["largst"], deliv_locs_det_jstab[6], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makefield(0, delivLocTitle["doc"], deliv_locs_det_jstab[7], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makefield(0, delivLocTitle["unit"], deliv_locs_det_jstab[8], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makefield(0, delivLocTitle["tarif"], deliv_locs_det_jstab[9], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makefield(0, delivLocTitle["trip_time"], deliv_locs_det_jstab[10], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makefield(0, delivLocTitle["trip_dist"], deliv_locs_det_jstab[11], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	// 4th row 
	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makefield(0, delivLocTitle["contact"], deliv_locs_det_jstab[12], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makefield(0, delivLocTitle["phone"], deliv_locs_det_jstab[13], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr>\n";
	
	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makefield(0, delivLocTitle["prof"], deliv_locs_det_jstab[14], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr>\n";
	
	dispFrm += makespace("\t", indent+2) + "</table>\n";
	dispFrm += makespace("\t", indent+1) + "</div> \n";  
	dispFrm += makespace("\t", indent) + "</td> \n";
	dispFrm += makespace("\t", indent) + "</tr> \n";

	// no need the bottom button dispFrm += makespace("\t", indent) + btnGroupDelivLocDetails_HTML();

	return dispFrm;
}



function displayAssignDelivLocForm()
{
	var indent = 1;
	var assnFrm = "";
	var dateStr;
	var aId;

	var title_width = 200;


	var filters = new Array();
	var index = 0;

	filters[0] = makefield(3, delivLocTitle["code"], frm_code, "frm_code", "frm_code", "", 30, 15, "", "", "&nbsp;", indent+4, 100);

	filters[1] = makefield(201, ml(t__Supplier), frm_supplier, "frm_supplier", "frm_supplier", supplier_jslist, 0, 0, "onchange=\"updateDropdownListBy2Parents(document.assign_delvloc_frm, this, document.assign_delvloc_frm.frm_category, document.assign_delvloc_frm.frm_customer, account_jslist, 2, 4);\"", ml(t__Select_A_Supplier), "&nbsp;", indent+3, title_width);

	filters[2] = makefield(201, ml(t__Cust_Category), frm_category, "frm_category", "frm_category", category_jslist, 0, 0, "onchange=\"updateDropdownListBy2Parents(document.assign_delvloc_frm, this, document.assign_delvloc_frm.frm_supplier, document.assign_delvloc_frm.frm_customer, account_jslist, 4, 2);\"", ml(t__Select_A_Category), "&nbsp;", indent+3, title_width);

	if ( frm_customer == "-1" || frm_customer == "" )
	{
		frm_customer = "";
	}
	filters[3] = makefield(201, ml(t__Customer), frm_customer, "frm_customer", "frm_customer", account_jslist, 0, 0, "onchange=\";\"", ml(t__Select_A_Customer), "&nbsp;", indent+3, title_width);

	filters[4] = makefield(2, ml(t__Assign_Mode), frm_assntype, "frm_assntype", "frm_assntype", assign_mode_jslist, 0, 0, "onchange=\";\"", ml(t__Select_Assign_Mode), "&nbsp;", indent+3, title_width);
	filters[5] = makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 100);



	assnFrm += makespace("\t", indent) + btnGroupAssignDelivLoc_HTML();

	assnFrm += makespace("\t", indent) + "<tr>\n";
	assnFrm += makespace("\t", indent) + "<td>\n";

	assnFrm += makespace("\t", indent+1) + "<form name=\"assign_delvloc_frm\" method=\"get\" id=\"assign_delvloc_frm\" action=\"delivery.php\" >\n";

	assnFrm += makespace("\t", indent+1) + " <ul id=\"tabmenu\">\n";
	assnFrm += makespace("\t", indent+1) + "<li>" + otherText["msg_assnDelivLoc_fSet"] + "</li>\n";
	assnFrm += makespace("\t", indent+1) + "</ul>\n";
	assnFrm += makespace("\t", indent+1) + "<div class=\"adminform\">\n";

	assnFrm += makespace("\t", indent+2) + "<table width=\"100%\">\n";
	assnFrm += makespace("\t", indent+2) + "<tr>\n";
	assnFrm += makespace("\t", indent+2) + "<td class=\"infotext\">\n";
	assnFrm += makespace("\t", indent+3) + "<br>\n";
	assnFrm += makespace("\t", indent+3) + otherText["msg_assnDelivLoc_frmComplt"] + "\n";

	// hidden area for passing values between web pages
	assnFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"delivCd\" id=\"delivCd\" value=\"" + delivCd + "\">\n";
	assnFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["assignDelivLocSubmit"] + "\">\n";
	assnFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";

	assnFrm += makespace("\t", indent+2) + "</td>\n";
	assnFrm += makespace("\t", indent+2) + "</tr>\n";
	assnFrm += makespace("\t", indent+2) + "<tr>\n";
	assnFrm += makespace("\t", indent+2) + "<td width=\"100%\">\n";

	assnFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";

	assnFrm += makespace("\t", indent+3) + "<tr>\n";

	assnFrm += filters[0];

	assnFrm += filters[1] ;

	assnFrm += makespace("\t", indent+3) + "</tr>\n";

	assnFrm += makespace("\t", indent+3) + "<tr>\n";

	assnFrm += filters[2];

	assnFrm += filters[3] ;

	assnFrm += makespace("\t", indent+3) + "</tr>\n";

	assnFrm += makespace("\t", indent+3) + "<tr>\n";

	assnFrm += filters[4];

	assnFrm += filters[5] ;

	assnFrm += makespace("\t", indent+3) + "</tr>\n";


	assnFrm += makespace("\t", indent+3) + "</table>\n";
	assnFrm += makespace("\t", indent+2) + "</td>\n";
	assnFrm += makespace("\t", indent+2) + "</tr>\n";
	assnFrm += makespace("\t", indent+2) + "<tr>\n";
	assnFrm += makespace("\t", indent+2) + "<td>\n";
	assnFrm += makespace("\t", indent+3) + "&nbsp;\n";
	assnFrm += makespace("\t", indent+2) + "</td>\n";
	assnFrm += makespace("\t", indent+2) + "</tr>\n";
	assnFrm += makespace("\t", indent+2) + "<tr>\n";
	assnFrm += makespace("\t", indent+2) + "<td align=\"center\">\n";
	assnFrm += makespace("\t", indent+3) + "<table>\n";

	assnFrm += frmButtRow_HTML(otherText["btn_assign"], 1);

	assnFrm += makespace("\t", indent+3) + "</table>\n";
	assnFrm += makespace("\t", indent+2) + "</td>\n";
	assnFrm += makespace("\t", indent+2) + "</tr>\n";
	assnFrm += makespace("\t", indent+2) + "</table>\n";

	assnFrm += makespace("\t", indent+1) + "</div>\n";

	assnFrm += makespace("\t", indent+1) + "</form>\n";

	assnFrm += makespace("\t", indent) + "</td>\n";
	assnFrm += makespace("\t", indent) + "</tr>\n";

	return assnFrm;
}




function displayModifyDelivLocForm ()
{
	var indent = 1;
	var updFrm = "";

	updFrm += makespace("\t", indent) + btnGroupModifyDelivLoc_HTML();

	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td>\n";
	updFrm += makespace("\t", indent+1) + "<form name=\"edit_delivlocs\" method=\"post\" id=\"edit_delivlocs\" action=\"delivery.php\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + otherText["msg_updDelivLoc_fSet"] + "</li>\n";
	updFrm += "</ul>\n";
	updFrm += "<div class=\"adminform\">\n";

//	updFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	updFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_updDelivLoc_fSet"] + "</strong></legend>\n";

	updFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	updFrm += makespace("\t", indent+4) + "<br>\n";
	updFrm += makespace("\t", indent+4) + otherText["msg_updDelivLoc_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"delivCd\" id=\"delivCd\" value=\"" + delivCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyDelivLocSubmit"] + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"suppCd\" value=\"" + cmpyCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";
	updFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"is_search_on\" id=\"is_search_on\" value=\"" + is_search_on + "\">\n";


	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	updFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 0st row
	updFrm += makespace("\t", indent+4) + "<tr>\n";

	updFrm += makespace("\t", indent+4) + "<td colspan=\"6\">\n";
	if ( typeof frm_default == "undefined" )
	{
		frm_default = 0;
	}

	if ( frm_grid == "CSTDLV" )
	{
		updFrm += makespace("\t", indent+5) + "<INPUT TYPE=\"checkbox\" NAME=\"frm_default\" VALUE=\"1\" CHECKED onClick=\"checkGrid(document.edit_delivlocs, this)\">";
	}
	else
	{
		updFrm += makespace("\t", indent+5) + "<INPUT TYPE=\"checkbox\" NAME=\"frm_default\" VALUE=\"0\" onClick=\"checkGrid(document.edit_delivlocs, this)\">";
	}
	updFrm += makespace("\t", indent+5) + delivLocTitle["default"] + "\n";
	updFrm += makespace("\t", indent+4) + "</td>\n";
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 1st row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
//	updFrm += makefield(1, delivLocTitle["code"], frm_code, "frm_code", "frm_code", "", 30, 15, "dataType=\"Require\"", otherText["msg_enterDelivLocCode"], "*", indent+4, 100);
	updFrm += makefield(3, delivLocTitle["code"], frm_code, "frm_code", "frm_code", "", 30, 15, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(1, delivLocTitle["name"], frm_name, "frm_name", "frm_name", "", 30, 49, "dataType=\"Require\"", otherText["msg_enterDelivLocName"], "*", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(2, delivLocTitle["addr"], frm_address, "frm_address", "frm_address", addresses, 0, 0, "dataType=\"Require\"", otherText["msg_selDelivLocAddr"], "*", indent+4, 100);
	updFrm += makefield(1, delivLocTitle["grid"], frm_grid, "frm_grid", "frm_grid", "", 30, 29, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// blank row
	updFrm += makespace("\t", indent+1) + "<tr>\n";
	updFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 100);
	updFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 100);
	updFrm += makespace("\t", indent+1) + "</tr>\n";

	// 3rd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(2, delivLocTitle["transpt"], frm_transport, "frm_transport", "frm_transport", transport_types, 0, 0, "dataType=\"Require\"", otherText["msg_selDelivLocTransp"], "*", indent+4, 100);
	updFrm += makefield(2, delivLocTitle["largst"], frm_equipment, "frm_equipment", "frm_equipment", equipment_types, 0, 0, "dataType=\"Require\"", otherText["msg_selDelivLocLgst"], "*", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 4th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(2, delivLocTitle["doc"], frm_document, "frm_document", "frm_document", document_types, 0, 0, "dataType=\"Require\"", otherText["msg_selDelivLocDoc"], "*", indent+4, 100);
	updFrm += makefield(2, delivLocTitle["unit"], frm_quantity, "frm_quantity", "frm_quantity", quantity_types, 0, 0, "dataType=\"Require\"", otherText["msg_selDelivLocUnit"], "*", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 5th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(1, delivLocTitle["trip_time"], frm_triptime, "frm_triptime", "frm_triptime", "", 30, 9, "dataType=\"RangeInt\" min=\"0\" max=\"999999999\" ", otherText["msg_enterDelivLocTripTime"]+"( 0-999999999 )", "*", indent+4, 100);

	updFrm += makefield(1, delivLocTitle["trip_dist"], frm_distance, "frm_distance", "frm_distance", "", 30, 9, "dataType=\"RangeInt\" min=\"0\" max=\"999999999\" ", otherText["msg_enterDelivLocTripDist"]+"( 0-999999999 )", "*", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 6th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";

	var minVal = 1.0;
	var decVal = 1.0;
	var i;
	for (i=0; i<decNumber; i++)
	{
		minVal = minVal / 10.0;
		decVal = decVal * 10.0;
	}
	decVal = decVal * 10.0;
	minVal = 0.0;
	updFrm += makefield(1, delivLocTitle["tarif"], frm_tarrif, "frm_tarrif", "frm_tarrif", "", 30, 22, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", otherText["msg_enterDelivLocTariff"]+"( "+minVal+"-999999999.0 )", "*", indent+4, 100);

	updFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// blank row
	updFrm += makespace("\t", indent+1) + "<tr>\n";
	updFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 100);
	updFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 100);
	updFrm += makespace("\t", indent+1) + "</tr>\n";

	// 7th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(1, delivLocTitle["contact"], frm_contact, "frm_contact", "frm_contact", "", 30, 49, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(1, delivLocTitle["phone"], frm_phone, "frm_phone", "frm_phone", "", 30, 19, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 8th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(2, delivLocTitle["prof"], frm_profile, "frm_profile", "frm_profile", profiles, 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
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

	updFrm += makespace("\t", indent) + "</td>\n";
	updFrm += makespace("\t", indent) + "</tr>\n";

	return updFrm;
}


function displayInsertDelivLocForm ()
{
	var indent = 1;
	var addFrm = "";

	if (frm_transport=="")
	{
		frm_transport = 0;
	}
	if (frm_document=="")
	{
		frm_document = 0;
	}
	if (frm_quantity=="")
	{
		frm_quantity = 0;
	}
	if (frm_equipment=="")
	{
		frm_equipment = "-1";
	}
	if (frm_triptime=="")
	{
		frm_triptime = 0;
	}
	if (frm_distance=="")
	{
		frm_distance = 0;
	}
	if (frm_tarrif=="")
	{
		frm_tarrif = 0.0;
	}


	addFrm += makespace("\t", indent) + btnGroupInsertDelivLoc_HTML();

	addFrm += makespace("\t", indent) + "<tr>\n";
	addFrm += makespace("\t", indent) + "<td>\n";
	addFrm += makespace("\t", indent+1) + "<form name=\"add_delivlocs\" method=\"post\" id=\"add_delivlocs\" action=\"delivery.php\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	addFrm += " <ul id=\"tabmenu\">\n";
	addFrm += "<li>" + otherText["msg_addDelivLoc_fSet"] + "</li>\n";
	addFrm += "</ul>\n";
	addFrm += "<div class=\"adminform\">\n";

//	addFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	addFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_addDelivLoc_fSet"] + "</strong></legend>\n";

	addFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	addFrm += makespace("\t", indent+4) + "<br>\n";
	addFrm += makespace("\t", indent+4) + otherText["msg_addDelivLoc_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"delivCd\" id=\"delivCd\" value=\"" + delivCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["insertDelivLocSubmit"] + "\">\n";

	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"suppCd\" value=\"" + cmpyCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";
	addFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"is_search_on\" id=\"is_search_on\" value=\"" + is_search_on + "\">\n";


	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	addFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 0st row
	addFrm += makespace("\t", indent+4) + "<tr>\n";

	addFrm += makespace("\t", indent+4) + "<td colspan=\"6\">\n";
	if ( typeof frm_default == "undefined" )
	{
		frm_default = 0;
	}

	if ( frm_grid == "CSTDLV" )
	{
		addFrm += makespace("\t", indent+5) + "<INPUT TYPE=\"checkbox\" NAME=\"frm_default\" VALUE=\"1\" CHECKED onClick=\"checkGrid(document.add_delivlocs, this)\">";
	}
	else
	{
		addFrm += makespace("\t", indent+5) + "<INPUT TYPE=\"checkbox\" NAME=\"frm_default\" VALUE=\"0\" onClick=\"checkGrid(document.add_delivlocs, this)\">";
	}
	addFrm += makespace("\t", indent+5) + delivLocTitle["default"] + "\n";
	addFrm += makespace("\t", indent+4) + "</td>\n";
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 1st row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(1, delivLocTitle["code"], frm_code, "frm_code", "frm_code", "", 30, 15, "dataType=\"Require\"", otherText["msg_enterDelivLocCode"], "*", indent+4, 100);
	addFrm += makefield(1, delivLocTitle["name"], frm_name, "frm_name", "frm_name", "", 30, 49, "dataType=\"Require\"", otherText["msg_enterDelivLocName"], "*", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(2, delivLocTitle["addr"], frm_address, "frm_address", "frm_address", addresses, 0, 0, "dataType=\"Require\"", otherText["msg_selDelivLocAddr"], "*", indent+4, 100);
	addFrm += makefield(1, delivLocTitle["grid"], frm_grid, "frm_grid", "frm_grid", " disabled=true ", 30, 29, "", "", "&nbsp;", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// blank row
	addFrm += makespace("\t", indent+1) + "<tr>\n";
	addFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 100);
	addFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 100);
	addFrm += makespace("\t", indent+1) + "</tr>\n";

	// 3rd row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(2, delivLocTitle["transpt"], frm_transport, "frm_transport", "frm_transport", transport_types, 0, 0, "dataType=\"Require\"", otherText["msg_selDelivLocTransp"], "*", indent+4, 100);
	addFrm += makefield(2, delivLocTitle["largst"], frm_equipment, "frm_equipment", "frm_equipment", equipment_types, 0, 0, "dataType=\"Require\"", otherText["msg_selDelivLocLgst"], "*", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 4th row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(2, delivLocTitle["doc"], frm_document, "frm_document", "frm_document", document_types, 0, 0, "dataType=\"Require\"", otherText["msg_selDelivLocDoc"], "*", indent+4, 100);
	addFrm += makefield(2, delivLocTitle["unit"], frm_quantity, "frm_quantity", "frm_quantity", quantity_types, 0, 0, "dataType=\"Require\"", otherText["msg_selDelivLocUnit"], "*", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 5th row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(1, delivLocTitle["trip_time"], frm_triptime, "frm_triptime", "frm_triptime", "", 30, 9, "dataType=\"RangeInt\" min=\"0\" max=\"999999999\" ", otherText["msg_enterDelivLocTripTime"]+"( 0-999999999 )", "*", indent+4, 100);

	addFrm += makefield(1, delivLocTitle["trip_dist"], frm_distance, "frm_distance", "frm_distance", "", 30, 9, "dataType=\"RangeInt\" min=\"0\" max=\"999999999\" ", otherText["msg_enterDelivLocTripDist"]+"( 0-999999999 )", "*", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 6th row
	addFrm += makespace("\t", indent+4) + "<tr>\n";

	var minVal = 1.0;
	var decVal = 1.0;
	var i;
	for (i=0; i<decNumber; i++)
	{
		minVal = minVal / 10.0;
		decVal = decVal * 10.0;
	}
	decVal = decVal * 10.0;
	minVal = 0.0;
	addFrm += makefield(1, delivLocTitle["tarif"], frm_tarrif, "frm_tarrif", "frm_tarrif", "", 30, 22, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", otherText["msg_enterDelivLocTariff"]+"( "+minVal+"-999999999.0 )", "*", indent+4, 100);

	addFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// blank row
	addFrm += makespace("\t", indent+1) + "<tr>\n";
	addFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 100);
	addFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 100);
	addFrm += makespace("\t", indent+1) + "</tr>\n";

	// 7th row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(1, delivLocTitle["contact"], frm_contact, "frm_contact", "frm_contact", "", 30, 49, "", "", "&nbsp;", indent+4, 100);
	addFrm += makefield(1, delivLocTitle["phone"], frm_phone, "frm_phone", "frm_phone", "", 30, 19, "", "", "&nbsp;", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 8th row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(2, delivLocTitle["prof"], frm_profile, "frm_profile", "frm_profile", profiles, 0, 0, "", "", "&nbsp;", indent+4, 100);
	addFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
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

	addFrm += makespace("\t", indent) + "</td>\n";
	addFrm += makespace("\t", indent) + "</tr>\n";

	return addFrm;
}



function displayDeleteDelivLocForm ()
{
	var delFrm = "";


	return delFrm;
}




function displayDelivLocAddress ()
{
	var indent = 1;
	var dispFrm = "";

	dispFrm += backToBtnAddr_HTML();

	dispFrm += makespace("\t", indent) + "<tr>\n";
	dispFrm += makespace("\t", indent) + "<td align=\"left\">\n";
	dispFrm += makespace("\t", indent+1) + "<table>\n";
	dispFrm += makespace("\t", indent+1) + "<tr>\n";
	dispFrm += makefield(0, addrTitle[0], deliv_locs_addr_jstab[0], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 140);
	dispFrm += makespace("\t", indent+1) + "</tr>\n";
	dispFrm += makespace("\t", indent+1) + "</table>\n";
	dispFrm += makespace("\t", indent) + "</td>\n";
	dispFrm += makespace("\t", indent) + "</tr>\n";
	dispFrm += makespace("\t", indent) + "<tr>\n";
	dispFrm += makespace("\t", indent) + "<td align=\"left\">\n";
	dispFrm += makespace("\t", indent+1) + "<div id=\"printReady\">\n";  /* Start of Print Area */
	dispFrm += makespace("\t", indent+2) + "<div id=\"helparea\">\n";
	dispFrm += makespace("\t", indent+3) + "<table>\n";

	for (var i=1; i<=5; i++)
	{
		dispFrm += makespace("\t", indent+3) + "<tr>\n";
		dispFrm += makefield(0, addrTitle[i], deliv_locs_addr_jstab[i], "", "", "", 0, 0, "", "", "&nbsp;", indent+3, 140);
		dispFrm += makespace("\t", indent+3) + "</tr>\n";
		dispFrm += "\n";
	}

	dispFrm += makespace("\t", indent+3) + "</table>\n";
	dispFrm += makespace("\t", indent+2) + "</div>\n";
	dispFrm += makespace("\t", indent+1) + "</div>\n";  /* End of Print Area */
	dispFrm += makespace("\t", indent+1) + "<br>\n";
	dispFrm += makespace("\t", indent) + "</td>\n";
	dispFrm += makespace("\t", indent) + "</tr>\n";

	dispFrm += backToBtnAddr_HTML();

	return dispFrm;
}




function displayModifyDelivLocAddressForm ()
{
	var indent = 1;
	var updFrm = "";

	updFrm += makespace("\t", indent) + "<tr> \n";
	updFrm += makespace("\t", indent) + "<td align=\"center\">\n ";
	updFrm += makespace("\t", indent+1) + "<div class=\"button\">\n";

//	updFrm += makespace("\t", indent+2) + btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);
	updFrm += makespace("\t", indent+2) + btnLocation_HTML("justChaneMyLocation('delivery.php?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&delivCd='+delivCd+'&op='+" + opValues["viewAddress"] + "); ", otherText["btn_bakto_delivAddrPg"]);

	updFrm += makespace("\t", indent+1) + "</div><br>\n";
	updFrm += makespace("\t", indent) + "<td>\n ";
	updFrm += makespace("\t", indent) + "</tr> \n";

	var addrFieldSizes = new Array()
	addrFieldSizes[1] = 50;
	addrFieldSizes[2] = 50;
	addrFieldSizes[3] = 50;
	addrFieldSizes[4] = 10;
	addrFieldSizes[5] = 20;

	var addrFieldLens = new Array()
	addrFieldLens[1] = 59;
	addrFieldLens[2] = 59;
	addrFieldLens[3] = 59;
	addrFieldLens[4] = 59;
	addrFieldLens[5] = 59;

	var addrFieldMsgs = new Array()
	addrFieldMsgs[1] = otherText["msg_enterDelivAddrLine1"];
	addrFieldMsgs[2] = otherText["msg_enterDelivAddrLine2"];
	addrFieldMsgs[3] = otherText["msg_enterDelivAddrProvince"];
	addrFieldMsgs[4] = otherText["msg_enterDelivAddrZipcode"];
	addrFieldMsgs[5] = otherText["msg_enterDelivAddrCountry"];

	var addrFieldNames = new Array()
	addrFieldNames[1] = "frm_1stline";
	addrFieldNames[2] = "frm_2ndline";
	addrFieldNames[3] = "frm_province";
	addrFieldNames[4] = "frm_postcode";
	addrFieldNames[5] = "frm_country";

	deliv_locs_addr_jstab[1] = frm_1stline;
	deliv_locs_addr_jstab[2] = frm_2ndline;
	deliv_locs_addr_jstab[3] = frm_province;
	deliv_locs_addr_jstab[4] = frm_postcode;
	deliv_locs_addr_jstab[5] = frm_country;

	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td align=\"left\">\n";
	updFrm += makespace("\t", indent+1) + "<table>\n";
	updFrm += makespace("\t", indent+1) + "<tr>\n";

	updFrm += makefield(0, addrTitle[0], deliv_locs_addr_jstab[0], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 140);

	updFrm += makespace("\t", indent+1) + "</tr>\n";
	updFrm += makespace("\t", indent+1) + "</table>\n";
	updFrm += makespace("\t", indent) + "</td>\n";
	updFrm += makespace("\t", indent) + "</tr>\n";


	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td>\n";
	
//	updFrm += makespace("\t", indent+1) + "<div id=\"printReady\">\n";  /* Start of Print Area */

	updFrm += makespace("\t", indent+2) + "<form name=\"edit_address\" method=\"post\" id=\"edit_address\" action=\"delivery.php\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + otherText["msg_updDelivAddr_fSet"] + "</li>\n";
	updFrm += "</ul>\n";
	updFrm += "<div class=\"adminform\">\n";

//	updFrm += makespace("\t", indent+3) + "<fieldset>\n";
//	updFrm += makespace("\t", indent+4) + "<legend class=\"infotext\"><strong>" + otherText["msg_updDelivAddr_fSet"] + "</strong></legend>\n";

	updFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makespace("\t", indent+4) + "<td class=\"infotext\">\n";
	updFrm += makespace("\t", indent+5) + "<br>\n";
	updFrm += makespace("\t", indent+5) + otherText["msg_updDelivAddr_frmComplt"] + "\n";

	updFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"delivCd\" id=\"delivCd\" value=\"" + delivCd + "\">\n";
	updFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyAddressSubmit"] + "\">\n";
	updFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"frm_addrcode\" id=\"frm_addrcode\" value=\"" + deliv_locs_addr_jstab[0] + "\">\n";
	updFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"is_search_on\" id=\"is_search_on\" value=\"" + is_search_on + "\">\n";


	updFrm += makespace("\t", indent+4) + "</td>\n";
	updFrm += makespace("\t", indent+4) + "</tr>\n";
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makespace("\t", indent+4) + "<td width=\"100%\">\n";

	
	updFrm += makespace("\t", indent+5) + "<table width=\"100%\">\n";

	for (var i=1; i<=5; i++)
	{
		updFrm += makespace("\t", indent+5) + "<tr>\n";

//		updFrm += makefield(1, addrTitle[i], deliv_locs_addr_jstab[i], addrFieldNames[i], addrFieldNames[i], "", addrFieldSizes[i], addrFieldLens[i], "dataType=\"Require\"", addrFieldMsgs[i], "*", indent+5, 110)
		updFrm += makefield(1, addrTitle[i], deliv_locs_addr_jstab[i], addrFieldNames[i], addrFieldNames[i], "", addrFieldSizes[i], addrFieldLens[i], "", "", "&nbsp;", indent+5, 110)

		updFrm += makespace("\t", indent+5) + "</tr>\n";
		updFrm += makespace("\t", indent+5) + "\n";
	}

	updFrm += makespace("\t", indent+5) + "</table>\n";
	
	updFrm += makespace("\t", indent+4) + "</td>\n";
	updFrm += makespace("\t", indent+4) + "</tr>\n";
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makespace("\t", indent+4) + "<td align=\"center\">\n";
	
	updFrm += makespace("\t", indent+5) + "<table>\n";

	updFrm += frmButtRow_HTML(commBtnText["Update"], 1);

	updFrm += makespace("\t", indent+5) + "</table>\n";
	updFrm += makespace("\t", indent+4) + "</td>\n";
	updFrm += makespace("\t", indent+4) + "</tr>\n";
	updFrm += makespace("\t", indent+4) + "</table>\n";
	updFrm += makespace("\t", indent+4) + "\n";

//	updFrm += makespace("\t", indent+3) + "</fieldset>\n";
	updFrm += makespace("\t", indent+3) + "</div>\n";
	
	updFrm += makespace("\t", indent+3) + "\n";
	updFrm += makespace("\t", indent+2) + "</form>\n";

//	updFrm += makespace("\t", indent+1) + "</div>\n";  /* End of Print Area */

	updFrm += makespace("\t", indent) + "</td>\n";
	updFrm += makespace("\t", indent) + "</tr>\n";

	return updFrm;


}



function displayInsertDelivLocAddressForm ()
{
	var indent = 1;
	var addFrm = "";

	addFrm += makespace("\t", indent) + "<tr> \n";
	addFrm += makespace("\t", indent) + "<td align=\"center\">\n ";
	addFrm += makespace("\t", indent+1) + "<div class=\"button\">\n";

//	addFrm += makespace("\t", indent+2) + btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

	if (prevOp == opValues["insertDelivLocForm"])
	{
		addFrm += makespace("\t", indent+2) + btnLocation_HTML("justChaneMyLocation('delivery.php?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&delivCd='+delivCd+'&op='+" + prevOp + "); ", otherText["btn_bakto_delivLocsAdd"]);
	}
	if (prevOp == opValues["modifyDelivLocForm"])
	{
		addFrm += makespace("\t", indent+2) + btnLocation_HTML("justChaneMyLocation('delivery.php?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&delivCd='+delivCd+'&op='+" + prevOp + "); ", otherText["btn_bakto_delivLocsUpd"]);
	}

	addFrm += makespace("\t", indent+1) + "</div><br>\n";
	addFrm += makespace("\t", indent) + "<td>\n ";
	addFrm += makespace("\t", indent) + "</tr> \n";

	var addrFieldSizes = new Array()
	addrFieldSizes[0] = 50;
	addrFieldSizes[1] = 50;
	addrFieldSizes[2] = 50;
	addrFieldSizes[3] = 50;
	addrFieldSizes[4] = 10;
	addrFieldSizes[5] = 20;

	var addrFieldLens = new Array()
	addrFieldLens[0] = 19;
	addrFieldLens[1] = 59;
	addrFieldLens[2] = 59;
	addrFieldLens[3] = 59;
	addrFieldLens[4] = 59;
	addrFieldLens[5] = 59;

	var addrFieldMsgs = new Array()
	addrFieldMsgs[0] = otherText["msg_enterDelivAddrCode"];
	addrFieldMsgs[1] = otherText["msg_enterDelivAddrLine1"];
	addrFieldMsgs[2] = otherText["msg_enterDelivAddrLine2"];
	addrFieldMsgs[3] = otherText["msg_enterDelivAddrProvince"];
	addrFieldMsgs[4] = otherText["msg_enterDelivAddrZipcode"];
	addrFieldMsgs[5] = otherText["msg_enterDelivAddrCountry"];

	var addrFieldNames = new Array()
	addrFieldNames[0] = "frm_addrcode";
	addrFieldNames[1] = "frm_1stline";
	addrFieldNames[2] = "frm_2ndline";
	addrFieldNames[3] = "frm_province";
	addrFieldNames[4] = "frm_postcode";
	addrFieldNames[5] = "frm_country";

	deliv_locs_addr_jstab[0] = frm_addrcode;
	deliv_locs_addr_jstab[1] = frm_1stline;
	deliv_locs_addr_jstab[2] = frm_2ndline;
	deliv_locs_addr_jstab[3] = frm_province;
	deliv_locs_addr_jstab[4] = frm_postcode;
	deliv_locs_addr_jstab[5] = frm_country;


	addFrm += makespace("\t", indent) + "<tr>\n";
	addFrm += makespace("\t", indent) + "<td>\n";
	
//	addFrm += makespace("\t", indent+1) + "<div id=\"printReady\">\n";  /* Start of Print Area */

	addFrm += makespace("\t", indent+2) + "<form name=\"add_address\" method=\"post\" id=\"add_address\" action=\"delivery.php\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	addFrm += " <ul id=\"tabmenu\">\n";
	addFrm += "<li>" + otherText["msg_addDelivAddr_fSet"] + "</li>\n";
	addFrm += "</ul>\n";
	addFrm += "<div class=\"adminform\">\n";

//	addFrm += makespace("\t", indent+3) + "<fieldset>\n";
//	addFrm += makespace("\t", indent+4) + "<legend class=\"infotext\"><strong>" + otherText["msg_updDelivAddr_fSet"] + "</strong></legend>\n";

	addFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makespace("\t", indent+4) + "<td class=\"infotext\">\n";
	addFrm += makespace("\t", indent+5) + "<br>\n";
	addFrm += makespace("\t", indent+5) + otherText["msg_addDelivAddr_frmComplt"] + "\n";

	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"delivCd\" id=\"delivCd\" value=\"" + delivCd + "\">\n";
	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["insertAddressSubmit"] + "\">\n";
	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"prevOp\" id=\"prevOp\" value=\"" + prevOp + "\">\n";

	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"suppCd\" value=\"" + cmpyCd + "\">\n";
	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	addFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";
	addFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"is_search_on\" id=\"is_search_on\" value=\"" + is_search_on + "\">\n";


	addFrm += makespace("\t", indent+4) + "</td>\n";
	addFrm += makespace("\t", indent+4) + "</tr>\n";
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makespace("\t", indent+4) + "<td width=\"100%\">\n";

	
	addFrm += makespace("\t", indent+5) + "<table width=\"100%\">\n";

	for (var i=0; i<=5; i++)
	{
		addFrm += makespace("\t", indent+5) + "<tr>\n";

		deliv_locs_addr_jstab[i] = "";		
		if (i == 0)
		{
			addFrm += makefield(1, addrTitle[i], deliv_locs_addr_jstab[i], addrFieldNames[i], addrFieldNames[i], "", addrFieldSizes[i], addrFieldLens[i], "dataType=\"Require\"", addrFieldMsgs[i], "*", indent+5, 110)
		}
		else
		{
			addFrm += makefield(1, addrTitle[i], deliv_locs_addr_jstab[i], addrFieldNames[i], addrFieldNames[i], "", addrFieldSizes[i], addrFieldLens[i], "", "", "&nbsp;", indent+5, 110)
		}

		addFrm += makespace("\t", indent+5) + "</tr>\n";
		addFrm += makespace("\t", indent+5) + "\n";
	}

	addFrm += makespace("\t", indent+5) + "</table>\n";
	
	addFrm += makespace("\t", indent+4) + "</td>\n";
	addFrm += makespace("\t", indent+4) + "</tr>\n";
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makespace("\t", indent+4) + "<td align=\"center\">\n";
	addFrm += makespace("\t", indent+5) + "<table>\n";

	addFrm += frmButtRow_HTML(commBtnText["Add"], 1);

	addFrm += makespace("\t", indent+5) + "</table>\n";
	addFrm += makespace("\t", indent+4) + "</td>\n";
	addFrm += makespace("\t", indent+4) + "</tr>\n";
	addFrm += makespace("\t", indent+4) + "</table>\n";
	
	addFrm += makespace("\t", indent+4) + "\n";
//	addFrm += makespace("\t", indent+3) + "</fieldset>\n";
	addFrm += makespace("\t", indent+3) + "</div>\n";

	addFrm += makespace("\t", indent+3) + "\n";
	addFrm += makespace("\t", indent+2) + "</form>\n";

//	addFrm += makespace("\t", indent+1) + "</div>\n";  /* End of Print Area */

	addFrm += makespace("\t", indent) + "</td>\n";
	addFrm += makespace("\t", indent) + "</tr>\n";

	return addFrm;
}










function assArray_keys(inputArr)
{
	var keys = new Array();

	for (var i in inputArr) 
	{
		if (inputArr[i] != null) 
		{
			keys.push(i);
		}
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
   fieldHTML += "<input name=\"op\" id=\"op\" value=\""+attr+"\" type=\"hidden\">\n";
   return fieldHTML;
}



function preqstr_field ()
{
	var fieldHTML ="";

	fieldHTML += "<input name=\"preqstr\" id=\"preqstr\" value=\"\" type=\"hidden\">\n";

	return fieldHTML;
}



function deliv_loc_field(attr)
{
  var fieldHTML ="";
  fieldHTML += "<input name=\"delivCd\" id=\"delivCd\" value=\""+delivCd+"\" "+attr+" >\n";
  return fieldHTML;
}




function btnGroupDelivLoc_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	if(priv>=7)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('delivery.php?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["insertDelivLocForm"] + "'); ", otherText["btn_addNew_delivLocs"]);
	}
	if(priv>=5 && is_search_on != 1)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('delivery.php?is_search_on=1&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", otherText["btn_search_delivLocs"]);
	}
	if(priv>=5 && is_search_on == 1)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('delivery.php?is_search_on=0&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", otherText["btn_view_delivLocs"]);
	}


	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}




function btnGroupDelivLocDetails_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";


	btn_HTML += btnLocation_HTML("justChaneMyLocation('delivery.php?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", otherText["btn_bakto_delivLocsPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function btnGroupAssignDelivLoc_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	btn_HTML += btnLocation_HTML("justChaneMyLocation('delivery.php?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&op=" + opValues["listDelivLoc"] + "'); ", otherText["btn_bakto_delivLocsPg"]);
//	btn_HTML += btnLocation_HTML("justChaneMyLocation('delivery.php?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", otherText["btn_bakto_delivLocsPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}


function btnGroupModifyDelivLoc_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	if (priv >= 7)
	{
		btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('delivery.php?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&prevOp=" + opValues["modifyDelivLocForm"] + "&op=" + opValues["insertAddressForm"] + "&delivCd='+delivCd); ", otherText["btn_addNew_delivAddr"]);
	}

	btn_HTML += btnLocation_HTML("justChaneMyLocation('delivery.php?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", otherText["btn_bakto_delivLocsPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function btnGroupInsertDelivLoc_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	if (priv >= 7)
	{
		btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('delivery.php?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&prevOp=" + opValues["insertDelivLocForm"] + "&op=" + opValues["insertAddressForm"] + "&delivCd='+delivCd); ", otherText["btn_addNew_delivAddr"]);
	}

	btn_HTML += btnLocation_HTML("justChaneMyLocation('delivery.php?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", otherText["btn_bakto_delivLocsPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}




function backToBtnAddr_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	if (priv >= 6 && (op == opValues["viewAddress"] || op == opValues["modifyAddressForm"] || op == opValues["modifyAddressSubmit"]) )
	{
		btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('delivery.php?is_search_on='+is_search_on+'&op=" + opValues["modifyAddressForm"] + "&delivCd='+delivCd); ", commBtnText["Modify"]);
	}

//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

	btn_HTML += btnLocation_HTML("justChaneMyLocation('delivery.php?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&delivCd='+delivCd); ", otherText["btn_bakto_delivLocsPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}





function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	if (op == opValues["listDelivLoc"])
	{
		pageHeading += otherText["pgHead_delivLocs"];
	}

	if(op == opValues["viewDelivLoc"])
	{
		pageHeading += otherText["pgHead_delivLocs"];
	}

	if(op == opValues["viewAddress"])
	{
		pageHeading += otherText["pgHead_delivAddr"];
	}

	if(op == opValues["modifyDelivLocForm"] || op == opValues["modifyDelivLocSubmit"])
	{
		pageHeading += otherText["pgHead_delivLocsUpd"];
	}
	if(op == opValues["assignDelivLocForm"] || op == opValues["assignDelivLocSubmit"])
	{
		pageHeading += otherText["pgHead_delivLocsAssn"];
	}
	if(op == opValues["insertDelivLocForm"] || op == opValues["insertDelivLocSubmit"])
	{
		pageHeading += otherText["pgHead_delivLocsAdd"];
	}
	if(op == opValues["deleteDelivLocForm"] || op == opValues["deleteDelivLocSubmit"])
	{
		pageHeading += otherText["pgHead_delivLocsDel"];
	}
	if(op == opValues["modifyAddressForm"] || op == opValues["modifyAddressSubmit"])
	{
		pageHeading += otherText["pgHead_delivAddrUpd"];
	}
	if(op == opValues["insertAddressForm"] || op == opValues["insertAddressSubmit"])
	{
		pageHeading += otherText["pgHead_delivAddrAdd"];
	}

	return pageHeading; 
}



function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	if (op == opValues["listDelivLoc"])
	{
		pageTitle += otherText["pgTitle_delivLocs"];
	}

	if(op == opValues["viewDelivLoc"])
	{
		pageTitle += otherText["pgTitle_delivLocs"];
	}

	if(op == opValues["viewAddress"])
	{
		pageTitle += otherText["pgTitle_delivAddr"];
	}

	if(op == opValues["modifyDelivLocForm"] || op == opValues["modifyDelivLocSubmit"])
	{
		pageTitle += otherText["pgTitle_delivLocsUpd"];
	}
	if(op == opValues["assignDelivLocForm"] || op == opValues["assignDelivLocSubmit"])
	{
		pageTitle += otherText["pgTitle_delivLocsAssn"];
	}
	if(op == opValues["insertDelivLocForm"] || op == opValues["insertDelivLocSubmit"])
	{
		pageTitle += otherText["pgTitle_delivLocsAdd"];
	}
	if(op == opValues["deleteDelivLocForm"] || op == opValues["deleteDelivLocSubmit"])
	{
		pageTitle += otherText["pgTitle_delivLocsDel"];
	}
	if(op == opValues["modifyAddressForm"] || op == opValues["modifyAddressSubmit"])
	{
		pageTitle += otherText["pgTitle_delivAddrUpd"];
	}
	if(op == opValues["insertAddressForm"] || op == opValues["insertAddressSubmit"])
	{
		pageTitle += otherText["pgTitle_delivAddrAdd"];
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
			op_list += "<option value=\"" + opValues["deleteDelivLocSubmit"] + "\">" + commText["Delete"] + "</option>";

		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

		case 6:     
			op_list += "<option value=\"" + opValues["modifyDelivLocForm"] + "\">" + commText["Modify"] + "</option>";
			op_list += "<option value=\"" + opValues["assignDelivLocForm"] + "\">" + otherText["assignOneCust"] + "</option>";
//			op_list += "<option value=\"" + opValues["assignDelivLocToAll"] + "\">" + otherText["assignAllCust"] + "</option>";

		case 5:			/* Find Has not been implemented yet*/
			op_list += "<option value=\"" + opValues["viewDelivLoc"] + "\">" + otherText["delivLocDetails"] + "</option>";
			break;
	}
  
	op_list += "<option value=0 selected>--\t" + otherText["youraction"] + "\t--</option>";
	op_list += "</select>                                        ";
	
	return op_list ;
}


function checkGrid(myformObj, parentOption) 
{
	if (parentOption.checked == true)
	{
		myformObj.frm_grid.value = "CSTDLV";
//		myformObj.frm_grid.disabled = true;
	}
	else
	{
		if ( myformObj.frm_grid.value == "CSTDLV" )
		{
			myformObj.frm_grid.value = "";
		}
//		myformObj.frm_grid.disabled = false;
	}
}



/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
FUNCTION [ nextPage] 
[PURPOSE]  		-> 	Responsible for displaying the HTML for the next page
                  links and use the btnLocation_HTML and btnLocation_HTML_nexPreLk
                  functions to display the URL and use the 
                  justChaneMyLocation javascript function to carry the variables
                  to the next page
          
[Parameter]  	-> totalPages integer Total number of pages for this display
              -> curPg integer current page number user is looking at
              -> curPgName string is the php file name user browsing
              -> curPgVarName string is variable like pg we have in all the scripts
                 but if page is multilevel this variable change e.g on 
                 delivery location this variable is pg_3
[AUTHOR]  		-> Abdul Shakoor (DKI) Sepetember 27, 2005
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/

function nextPage(totalPages, curPg, curPgName, curPgVarName)
{
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
	
	// start putting HTML string in the 
  // nextPgHTML variable
	var nextPgHTML = "";
	nextPgHTML += "<tr> \n";
	nextPgHTML += "<td align=\"center\" class=\"nextPageLink\">\n ";
	
	// if the page number is not 1 that means user is not on page 
  // display the previous page link and a link to the
  // first page as well on the page looks like this <<  <
	if (!(page_number == 1)) 
  {
    //$html_output .= "<a href=\"" . $url . "?page_number=1" . $query_string . "\"><b>&lt;&lt;</b></a>";
    nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) + "&is_search_on='+is_search_on+'&frm_deliv_name_search='+frm_deliv_name_search+'&frm_deliv_trans_search='+frm_deliv_trans_search+'&frm_deliv_code_search='+frm_deliv_code_search+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", "&lt;&lt;");
		foobar = page_number - 1;
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		 nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&is_search_on='+is_search_on+'&frm_deliv_name_search='+frm_deliv_name_search+'&frm_deliv_trans_search='+frm_deliv_trans_search+'&frm_deliv_code_search='+frm_deliv_code_search+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", "<b>&lt;<\/b>");
		
	}
  else 
  {
		nextPgHTML += "<b>&lt;&lt;</b>&nbsp;&nbsp;<b>&lt;</b>";
	} 
  // if number of block are more than 1
  // that means there more than 20 or 30 page
  // for easy pagination can make the blocks of pages  
  // display the previous page link and a link to the
  //   on the page looks like this [ 31-40  41-50  51-60]
  if (block_number > 0) 
  {
		nextPgHTML += "&nbsp;&nbsp;<b>[</b>";
		for (var i=0; i<(block_number); i++) 
    {
			var foobar1 = i*block_size + 1;	// page number to be linked
			var foobar2 = (i+1)*block_size;
			//$html_output .= "&nbsp;<a href=\"" . $url . "?page_number=" . $foobar1 . $query_string . "\">" . $foobar1 . "-" . $foobar2 . "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&is_search_on='+is_search_on+'&frm_deliv_name_search='+frm_deliv_name_search+'&frm_deliv_trans_search='+frm_deliv_trans_search+'&frm_deliv_code_search='+frm_deliv_code_search+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", foobar1 + "-" + foobar2);
		}
		nextPgHTML += "<b>]</b>";
	}

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
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&is_search_on='+is_search_on+'&frm_deliv_name_search='+frm_deliv_name_search+'&frm_deliv_trans_search='+frm_deliv_trans_search+'&frm_deliv_code_search='+frm_deliv_code_search+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", i);
	}
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	for (var i=page_number+1; i<foobar2; i++) 
  {
    //alert("I am in for for foobar2 loop "+i);	
    nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&is_search_on='+is_search_on+'&frm_deliv_name_search='+frm_deliv_name_search+'&frm_deliv_trans_search='+frm_deliv_trans_search+'&frm_deliv_code_search='+frm_deliv_code_search+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", i);
	}
	// if number of block are more than 1
  // that means there more than 20 or 30 page
  // for easy pagination can make the blocks of pages  
  // display the previous page link and a link to the
  //   on the page looks like this [ 31-40  41-50  51-60]	
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&is_search_on='+is_search_on+'&frm_deliv_name_search='+frm_deliv_name_search+'&frm_deliv_trans_search='+frm_deliv_trans_search+'&frm_deliv_code_search='+frm_deliv_code_search+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", tempTxt);
		}
		nextPgHTML += "<b>]</b>";
	}
  // if the page number is not equal to total num of pages
  // that means we can dispay the link to the next page
  // and the last pge
  // link looks like this > >>
	if (!(page_number == num_pages)) 
  {
		foobar = page_number + 1;
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&is_search_on='+is_search_on+'&frm_deliv_name_search='+frm_deliv_name_search+'&frm_deliv_trans_search='+frm_deliv_trans_search+'&frm_deliv_code_search='+frm_deliv_code_search+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) + "&is_search_on='+is_search_on+'&frm_deliv_name_search='+frm_deliv_name_search+'&frm_deliv_trans_search='+frm_deliv_trans_search+'&frm_deliv_code_search='+frm_deliv_code_search+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", "<b>&gt;&gt;<\/b>");
	} else {
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}

	/*
  if (curPg > 1)
	{
		
    //nextPgHTML +="<a href=\"javascript:document.glblFrm.pg.value="+(curPg-1)+";document.glblFrm.op.value=0;document.glblFrm.submit();\">Previous</a>\n";
   //		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg-1) + "' );\">Previous</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg-1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", otherText["btn_prev_page"]);
	}

	nextPgHTML += "&nbsp; Current=" + curPg + "/" + totalPages + " &nbsp; ";
	if (totalPages > curPg)
	{
//		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg+1) + "' );\">Next</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg+1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listDelivLoc"] + "'); ", "&lt;&lt;");
	}
  */
	nextPgHTML += "</td>\n ";
	nextPgHTML += "</tr> \n";

	return nextPgHTML;
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

	newPage += "	if(myselectedvalue==\"" + opValues["deleteDelivLocSubmit"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(confirm('" + otherText["msg_del_confirm"] + "'))\n";
	newPage += "		{\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["deleteDelivLocSubmit"] + "+\"';\");\n";

	newPage += "			eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "			return true;\n";
	newPage += "		}\n";
	newPage += "		eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
  	newPage += "	}\n";
	newPage += "	else\n";
	newPage += "	if(myselectedvalue==\"" + opValues["assignDelivLocToAll"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(confirm('" + otherText["msg_assign_confirm"] + "'))\n";
	newPage += "		{\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "			eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["assignDelivLocToAll"] + "+\"';\");\n";

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



/* the following functions are designed to update the child dropdown list dynamically according to the changes occured in various numbers of parents*/

function clearDropdownList(childOption) 
{
	while(childOption.length != 0) 
	{
		childOption.options[childOption.length-1] = null;
	}

	//history.go(0);
}


function updateDropdownList(myformObj, parentOption, childOption, sourceList, compareIndex) 
{
	var new_options;
	var parent_select;
	var child_select;

	clearDropdownList(childOption);
	//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	parent_select = parentOption.value;
//	alert(" parent_select1="+parent_select);
	for (i in sourceList )
	{
		if ( i == 0 )
		{
			continue;
		}
		child_select = sourceList[i][compareIndex];

/*
		if ( ((parent_select == "") || (parent_select == "-1") || (child_select == parent_select))
		)
*/
		if ( ((parent_select == "") || (parent_select == "-1") || (child_select.indexOf(parent_select) != -1 ))
			)
		{
			new_option = new Option(sourceList[i][1], sourceList[i][0], false, false);
			childOption.options[childOption.length] = new_option;
			childOption.selectedIndex = 0;
		}
	}

	new_option = new Option( ml(t__Any_ALL), '-1', false, false );
	childOption.options[childOption.length] = new_option;
//	childOption.selectedIndex = 0;
	childOption.selectedIndex = childOption.length-1;

}


function updateDropdownListBy2Parents(myformObj, parentOption1, parentOption2, childOption, sourceList, compareIndex1, compareIndex2) 
{
	var new_options;
	var parent_select1;
	var parent_select2;
	var child_select1;
	var child_select2;

	clearDropdownList(childOption);
	//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	parent_select1 = parentOption1.value;
	parent_select2 = parentOption2.value;
//	alert(" parent_select1="+parent_select1);
//	alert(" parent_select2="+parent_select2);
	for (i in sourceList )
	{
		if ( i == 0 )
		{
			continue;
		}
		child_select1 = sourceList[i][compareIndex1];
		child_select2 = sourceList[i][compareIndex2];

/*
		if ( ((parent_select1 == "") || (parent_select1 == "-1") || (child_select1 == parent_select1))
		  && ((parent_select2 == "") || (parent_select2 == "-1") || (child_select2 == parent_select2))
		)
*/
		if ( ((parent_select1 == "") || (parent_select1 == "-1") || (child_select1.indexOf(parent_select1) != -1 ))
		  && ((parent_select2 == "") || (parent_select2 == "-1") || (child_select2.indexOf(parent_select2) != -1 ))
			)
		{
			new_option = new Option(sourceList[i][1], sourceList[i][0], false, false);
			childOption.options[childOption.length] = new_option;		
			childOption.selectedIndex = 0;
		}
	}

	new_option = new Option( ml(t__Any_ALL), '-1', false, false );
	childOption.options[childOption.length] = new_option;
//	childOption.selectedIndex = 0;
	childOption.selectedIndex = childOption.length-1;

}


