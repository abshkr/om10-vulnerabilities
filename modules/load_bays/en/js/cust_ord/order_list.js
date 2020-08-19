/****************************************************************
 * $Id: order_list.js,v 1.28 2011/04/13 04:43:05 abs Exp $
 ***************************************************************/

if ( 'cn' == js_lang)
{

	var opValues = new Array();

	// operations to order listing
	opValues["baseOrderList"] = 10100;
	opValues["listOrderList"] = 10101;
	opValues["searchOrderListForm"] = 10104;
	opValues["searchOrderListSubmit"] = 10114;
	opValues["viewOrderList"] = 10105;
	opValues["modifyOrderListForm"] = 10106;
	opValues["modifyOrderListSubmit"] = 10116;
	opValues["insertOrderListForm"] = 10107;
	opValues["insertOrderListSubmit"] = 10117;
	opValues["deleteOrderListForm"] = 10108;
	opValues["deleteOrderListSubmit"] = 10118;


	// operations to order entry and maintenance - order details
	opValues["baseOrdDetail"] = 6000;
	opValues["listOrdDetail"] = 6001;
	opValues["searchOrdDetailForm"] = 6004;		// reserved
	opValues["searchOrdDetailSubmit"] = 6014;	// reserved
	opValues["viewOrdDetail"] = 6005;
	opValues["modifyOrdDetailForm"] = 6006;
	opValues["modifyOrdDetailSubmit"] = 6016;
	opValues["insertOrdDetailForm"] = 6007;
	opValues["insertOrdDetailSubmit"] = 6017;
	opValues["deleteOrdDetailForm"] = 6008;
	opValues["deleteOrdDetailSubmit"] = 6018;
	opValues["approveOrdDetail"] = 6009;

	// operations to order entry and maintenance - schedule orders
	opValues["baseSchedOrder"] = 6100;
	opValues["listSchedOrder"] = 6101;
	opValues["searchSchedOrderForm"] = 6104;	// reserved
	opValues["searchSchedOrderSubmit"] = 6114;	// reserved
	opValues["viewSchedOrder"] = 6105;
	opValues["modifySchedOrderForm"] = 6106;
	opValues["modifySchedOrderSubmit"] = 6116;
	opValues["insertSchedOrderForm"] = 6107;
	opValues["insertSchedOrderSubmit"] = 6117;
	opValues["deleteSchedOrderForm"] = 6108;
	opValues["deleteSchedOrderSubmit"] = 6118;

	// operations to pricing from: 
	// order entry and maintenance - order details
	// order entry and maintenance - order details - product periods
	// order entry and maintenance - schedule orders
	opValues["basePricing"] = 6200;
	opValues["listPricing"] = 6201;
	opValues["searchPricingForm"] = 6204;		// reserved
	opValues["searchPricingSubmit"] = 6214;		// reserved
	opValues["viewPricing"] = 6205;
	opValues["modifyPricingForm"] = 6206;
	opValues["modifyPricingSubmit"] = 6216;
	opValues["insertPricingForm"] = 6207;
	opValues["insertPricingSubmit"] = 6217;
	opValues["deletePricingForm"] = 6208;
	opValues["deletePricingSubmit"] = 6218;

	// operations to order entry and maintenance - order details - product periods
	opValues["baseProdPeriod"] = 6300;
	opValues["listProdPeriod"] = 6301;
	opValues["searchProdPeriodForm"] = 6304;	// reserved
	opValues["searchProdPeriodSubmit"] = 6314;	// reserved
	opValues["viewProdPeriod"] = 6305;
	opValues["modifyProdPeriodForm"] = 6306;
	opValues["modifyProdPeriodSubmit"] = 6316;
	opValues["insertProdPeriodForm"] = 6307;
	opValues["insertProdPeriodSubmit"] = 6317;
	opValues["deleteProdPeriodForm"] = 6308;
	opValues["deleteProdPeriodSubmit"] = 6318;

	// operations to order entry and maintenance - schedule orders - schedule
	opValues["baseSchedule"] = 6400;
	opValues["listSchedule"] = 6401;
	opValues["searchScheduleForm"] = 6404;		// reserved
	opValues["searchScheduleSubmit"] = 6414;		// reserved
	opValues["viewSchedule"] = 6405;
	opValues["modifyScheduleForm"] = 6406;
	opValues["modifyScheduleSubmit"] = 6416;
	opValues["insertScheduleForm"] = 6407;
	opValues["insertScheduleSubmit"] = 6417;
	opValues["deleteScheduleForm"] = 6408;
	opValues["deleteScheduleSubmit"] = 6418;






	var column_headers = [
			"��Ӧ��", "�ͻ�", "����", "�ο���", "���͵ص�", "��������", "����״̬", "����׼?", "����Ա", "������Դ"
	];
		
	var otherText = new Array();
	otherText["youraction"] =  "��ѡ��";
    otherText["orderDetails"] =  "������Ʒ����";
    otherText["scheduleOrder"] =  "������Ʒ���ȹ���";

	otherText["defaultOperator"] =  "ERP�Զ�";


	otherText["btn_search_order"] =  "���Ҷ���";
	otherText["btn_bakto_customers"] =  "���ؿͻ����� ";

	otherText["btn_bakto_orderPg"] =  "���ض�������";

	otherText["btn_next_page"] =  "��һҳ";
	otherText["btn_prev_page"] =  "��һҳ";
	otherText["btn_search_go"] =  "��ʼ���� ...";

	otherText["tab_depot_ordstat"] = "�����Ϳ�Ͷ���״̬��Ϣ";

	otherText["pgTitle_order"] =  "�ͻ���������, ��������";
	otherText["pgTitle_orderUpd"] =  "�ͻ���������, ��������, �޸�";
	otherText["pgTitle_orderAdd"] =  "�ͻ���������, ��������, ����";
	otherText["pgTitle_orderDel"] =  "�ͻ���������, ��������, ɾ��";

	otherText["pgHead_order"] =  "��������";
	otherText["pgHead_orderUpd"] =  "�޸Ķ���";
	otherText["pgHead_orderAdd"] =  "��������";
	otherText["pgHead_orderDel"] =  "ɾ������";

	otherText["msg_del_confirm"] =  "���Ƿ�ȷ��Ҫɾ������¼?";

	otherText["msg_upd_warning"] =  "�ü�¼�������޸�, �밴���������...";


    otherText["msg_updOrder_fSet"] =  "����";
    otherText["msg_updOrder_frmComplt"] = "���б���(<span style=\"COLOR: #FF0000;\">*</span>)�ı��������д";
    otherText["msg_addOrder_fSet"] =  "����";
    otherText["msg_addOrder_frmComplt"] = "���б���(<span style=\"COLOR: #FF0000;\">*</span>)�ı��������д";

	otherText["msg_selAaddr"] =  "��ѡ���ַ";

	otherText["msg_selOrderStatus"] = "����״̬";

	otherText["msg_enterOrderNo"] = "�����뿪�Ŷ����� ";
	otherText["msg_enterOrderRef"] = "�����붩���ο���!";
	otherText["msg_enterOrderDate"] = "�����붩���µ�����!";
 	otherText["msg_enterOrderDelDate"] = "�����붩����������!";

	otherText["msg_selOrderMthd"] = "��ѡ����Ʒ���˷�ʽ!";
	otherText["msg_selOrderDelvMthd"] = "��ѡ�����ͷ�ʽ!";
	otherText["msg_selOrderSaleType"] = "��ѡ��ͻ���������!";
	otherText["msg_selOrderDelvLoc"] = "��ѡ�����͵ص�!";

	otherText["msg_selOrderDrawer"] = "��ѡ����Ʒ���乫˾)!";
 	otherText["msg_enterOrderExpDate"] = "�����붩����ֹ����!";
	otherText["msg_selOrderTerminal"] = "��ѡ���µ��Ϳ�!";
	otherText["msg_selOrderSupplyPoint"] = "��ѡ�������Ϳ�!";


 	otherText["msg_enterOrderLimit"] = "�����뱾���������ö�� ";
	otherText["msg_selOrderCarrier"] = "��ѡ�񶩵��ĳ��˷�!";
	otherText["msg_selOrderTransferType"] = "��ѡ����Ʒת��ԭ��!";
	otherText["msg_enterOrderTransferType"] = "��������Ʒת��ԭ��!";
 	otherText["msg_enterOrderInstruction"] = "�����붩��˵��!";

 	otherText["selectDate"] = "ѡ������";
 	otherText["selectDateShort"] = "����";

 	otherText["wrongOrdDate"] = "�ύʧ��!\n ��ȷ�϶����µ����ڴ��ڻ���ڵ�ǰ����!\n Ĭ��ֵ������!"
 	otherText["wrongDelDate"] = "�ύʧ��!\n ��ȷ�϶����������ڴ��ڻ���ڶ����µ�����!\n Ĭ��ֵ������!"
 	otherText["wrongExpDate"] = "�ύʧ��!\n ��ȷ�϶�����ֹ���ڴ��ڻ���ڶ�����������!\n Ĭ��ֵ������!"
	
	var alertWrongOrdDate = otherText["wrongOrdDate"];
	var alertWrongDelDate = otherText["wrongDelDate"];
	var alertWrongExpDate = otherText["wrongExpDate"];


	otherText["ALL"] =  "�κι�˾";

	otherText["supp"] =  "��Ӧ��";
    otherText["cust"] =  "�ͻ�";
    otherText["term"] =  "�Ϳ�";
    otherText["stat"] =  "����״̬";


	var orderTitle = new Array();
	orderTitle["code"] = "���͵ص����";
	orderTitle["name"] = "���͵ص�����";
	orderTitle["addr"] = "���͵ص��ַ";
	orderTitle["grid"] = "���͵ص㶨λ(��ͼ����)";

	orderTitle["transpt"] =  "������������";
	orderTitle["largst"] =  "���͵ص���������豸";
	orderTitle["doc"] =  "���͵ص��ļ�����";
	orderTitle["unit"] =  "���͵ص��������";
	orderTitle["tarif"] =  "���͵ص㺣��˰��";
	orderTitle["trip_time"] =  "������������ʱ��";
	orderTitle["trip_dist"] =  "������������·��";
	orderTitle["contact"] =  "��ϵ����";
	orderTitle["phone"] =  "�绰����";
	orderTitle["prof"] =  "Ԥ��������豸";


	orderTitle["order_cust_no"] = "���Ŷ�����";
	orderTitle["order_no"] = "������";

	orderTitle["order_ref_code"] = "�����ο���";
	orderTitle["orddate"] = "�µ�����";
	orderTitle["deldate"] = "��������";
	orderTitle["order_ord_mthd"] = "���˷�ʽ";  //?
	orderTitle["order_delv_mthd"] = "���ͷ�ʽ";

	orderTitle["order_sale_type"] = "�ͻ���������";
	orderTitle["order_dlv_code"] = "���͵ص�";
	orderTitle["order_drawer"] = "��Ʒ���乫˾";
	orderTitle["order_exp_date"] = "������ֹ����";
	orderTitle["order_terminal"] = "�µ��Ϳ�";
	
	orderTitle["ord_supply_point"] = "�����Ϳ�";
	orderTitle["order_approved"] = "������׼";
	orderTitle["order_invoiced"] = "��Ʊ����";
	orderTitle["order_limit"] = "�˶������ö� (" + moneyCurrency + ")";
	orderTitle["order_total"] = "����ܼ� (" + moneyCurrency + ")";

	orderTitle["order_carrier"] = "���˷�";
	orderTitle["transfer_type"] = "��Ʒת��ԭ��";
	orderTitle["order_instruction"] = "����˵��";
	orderTitle["order_source"] = "������Դ";

	//search form
	orderTitle["order_number"] = "������";
	orderTitle["order_stat_str"]    = "����״̬";

	var orderStatusStr = new Array();
	orderStatusStr["0"] = "�ü�¼�������޸�!\n[ ����״̬: �µ� ]";
	orderStatusStr["1"] = "�ü�¼�������޸�!\n[ ����״̬: ���ֵ��� ]";
	orderStatusStr["2"] = "�ü�¼�������޸�!\n[ ����״̬: ��ȫ���� ] ";
	orderStatusStr["3"] = "�ü�¼�������޸�!\n[ ����״̬: ������� ]";
	orderStatusStr["4"] = "�ü�¼�������޸�!\n[ ����״̬: δ���Ϳ� ]";
	orderStatusStr["5"] = "�ü�¼�������޸�!\n[ ����״̬: ������� ]";
	orderStatusStr["6"] = "�ü�¼�������޸�!\n[ ����״̬: �ѹ��� ]";
	orderStatusStr["7"] = "�ü�¼�������޸�!\n[ ����״̬: ���ַ��� ]";
	orderStatusStr["8"] = "�ü�¼�������޸�!\n[ ����״̬: �������� ]";

	orderStatusStr["100"] = "�ü�¼�������޸�!\n[ ����״̬: �µ�+����׼ ]";
	orderStatusStr["101"] = "�ü�¼�������޸�!\n[ ����״̬: ���ֵ���+����׼ ]";
	orderStatusStr["102"] = "�ü�¼�������޸�!\n[ ����״̬: ��ȫ����+����׼ ] ";
	orderStatusStr["103"] = "�ü�¼�������޸�!\n[ ����״̬: �������+����׼ ]";
	orderStatusStr["104"] = "�ü�¼�������޸�!\n[ ����״̬: δ���Ϳ�+����׼ ]";
	orderStatusStr["105"] = "�ü�¼�������޸�!\n[ ����״̬: �������+����׼ ]";
	orderStatusStr["106"] = "�ü�¼�������޸�!\n[ ����״̬: �ѹ���+����׼ ]";
	orderStatusStr["107"] = "�ü�¼�������޸�!\n[ ����״̬: ���ַ���+����׼ ]";
	orderStatusStr["108"] = "�ü�¼�������޸�!\n[ ����״̬: ��������+����׼ ]";

	orderStatusStr["1000"] = "�ü�¼�������޸�!\n[ ����״̬: �µ�+�ѿ���Ʊ ]";
	orderStatusStr["1001"] = "�ü�¼�������޸�!\n[ ����״̬: ���ֵ���+�ѿ���Ʊ ]";
	orderStatusStr["1002"] = "�ü�¼�������޸�!\n[ ����״̬: ��ȫ����+�ѿ���Ʊ ] ";
	orderStatusStr["1003"] = "�ü�¼�������޸�!\n[ ����״̬: �������+�ѿ���Ʊ ]";
	orderStatusStr["1004"] = "�ü�¼�������޸�!\n[ ����״̬: δ���Ϳ�+�ѿ���Ʊ ]";
	orderStatusStr["1005"] = "�ü�¼�������޸�!\n[ ����״̬: �������+�ѿ���Ʊ ]";
	orderStatusStr["1006"] = "�ü�¼�������޸�!\n[ ����״̬: �ѹ���+�ѿ���Ʊ ]";
	orderStatusStr["1007"] = "�ü�¼�������޸�!\n[ ����״̬: ���ַ���+�ѿ���Ʊ ]";
	orderStatusStr["1008"] = "�ü�¼�������޸�!\n[ ����״̬: ��������+�ѿ���Ʊ ]";

	orderStatusStr["1100"] = "�ü�¼�������޸�!\n[ ����״̬: �µ�+����׼+�ѿ���Ʊ ]";
	orderStatusStr["1101"] = "�ü�¼�������޸�!\n[ ����״̬: ���ֵ���+����׼+�ѿ���Ʊ ]";
	orderStatusStr["1102"] = "�ü�¼�������޸�!\n[ ����״̬: ��ȫ����+����׼+�ѿ���Ʊ ] ";
	orderStatusStr["1103"] = "�ü�¼�������޸�!\n[ ����״̬: �������+����׼+�ѿ���Ʊ ]";
	orderStatusStr["1104"] = "�ü�¼�������޸�!\n[ ����״̬: δ���Ϳ�+����׼+�ѿ���Ʊ ]";
	orderStatusStr["1105"] = "�ü�¼�������޸�!\n[ ����״̬: �������+����׼+�ѿ���Ʊ ]";
	orderStatusStr["1106"] = "�ü�¼�������޸�!\n[ ����״̬: �ѹ���+����׼+�ѿ���Ʊ ]";
	orderStatusStr["1107"] = "�ü�¼�������޸�!\n[ ����״̬: ���ַ���+����׼+�ѿ���Ʊ ]";
	orderStatusStr["1108"] = "�ü�¼�������޸�!\n[ ����״̬: ��������+����׼+�ѿ���Ʊ ]";

	var orderStatusGate = 1;   // Partly Schedulled
		
	var dateFormat = "yyyy-MM-dd";
//	var dateFormat = "dd-NNN-yyyy";
	var items_per_page = 10;

	var before_date = "2005-01-01";

		
	var l_opInf= new Array()
	for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
	l_opInf[10128]= "�ɹ�ɾ����һ������!";
	l_opInf[10127]= "�ɹ�������һ������!";
	l_opInf[10126]= "�ɹ��޸���һ������!";

	l_opInf[10138]= "ɾ������ʧ��!";
	l_opInf[10137]= "��������ʧ��!";
	l_opInf[10136]= "�޸Ķ���ʧ��!";



	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 10101,10104,10105,10106,10107,10107];
	var ops_req_search = [10101];// search never required on this page

}
else
{
	var opValues = new Array();

	// operations to order listing
	opValues["baseOrderList"] = 10100;
	opValues["listOrderList"] = 10101;
	opValues["searchOrderListForm"] = 10104;
	opValues["searchOrderListSubmit"] = 10114;
	opValues["viewOrderList"] = 10105;
	opValues["modifyOrderListForm"] = 10106;
	opValues["modifyOrderListSubmit"] = 10116;
	opValues["insertOrderListForm"] = 10107;
	opValues["insertOrderListSubmit"] = 10117;
	opValues["deleteOrderListForm"] = 10108;
	opValues["deleteOrderListSubmit"] = 10118;


	// operations to order entry and maintenance - order details
	opValues["baseOrdDetail"] = 6000;
	opValues["listOrdDetail"] = 6001;
	opValues["searchOrdDetailForm"] = 6004;		// reserved
	opValues["searchOrdDetailSubmit"] = 6014;	// reserved
	opValues["viewOrdDetail"] = 6005;
	opValues["modifyOrdDetailForm"] = 6006;
	opValues["modifyOrdDetailSubmit"] = 6016;
	opValues["insertOrdDetailForm"] = 6007;
	opValues["insertOrdDetailSubmit"] = 6017;
	opValues["deleteOrdDetailForm"] = 6008;
	opValues["deleteOrdDetailSubmit"] = 6018;
	opValues["approveOrdDetail"] = 6009;

	// operations to order entry and maintenance - schedule orders
	opValues["baseSchedOrder"] = 6100;
	opValues["listSchedOrder"] = 6101;
	opValues["searchSchedOrderForm"] = 6104;	// reserved
	opValues["searchSchedOrderSubmit"] = 6114;	// reserved
	opValues["viewSchedOrder"] = 6105;
	opValues["modifySchedOrderForm"] = 6106;
	opValues["modifySchedOrderSubmit"] = 6116;
	opValues["insertSchedOrderForm"] = 6107;
	opValues["insertSchedOrderSubmit"] = 6117;
	opValues["deleteSchedOrderForm"] = 6108;
	opValues["deleteSchedOrderSubmit"] = 6118;

	// operations to pricing from: 
	// order entry and maintenance - order details
	// order entry and maintenance - order details - product periods
	// order entry and maintenance - schedule orders
	opValues["basePricing"] = 6200;
	opValues["listPricing"] = 6201;
	opValues["searchPricingForm"] = 6204;		// reserved
	opValues["searchPricingSubmit"] = 6214;		// reserved
	opValues["viewPricing"] = 6205;
	opValues["modifyPricingForm"] = 6206;
	opValues["modifyPricingSubmit"] = 6216;
	opValues["insertPricingForm"] = 6207;
	opValues["insertPricingSubmit"] = 6217;
	opValues["deletePricingForm"] = 6208;
	opValues["deletePricingSubmit"] = 6218;

	// operations to order entry and maintenance - order details - product periods
	opValues["baseProdPeriod"] = 6300;
	opValues["listProdPeriod"] = 6301;
	opValues["searchProdPeriodForm"] = 6304;	// reserved
	opValues["searchProdPeriodSubmit"] = 6314;	// reserved
	opValues["viewProdPeriod"] = 6305;
	opValues["modifyProdPeriodForm"] = 6306;
	opValues["modifyProdPeriodSubmit"] = 6316;
	opValues["insertProdPeriodForm"] = 6307;
	opValues["insertProdPeriodSubmit"] = 6317;
	opValues["deleteProdPeriodForm"] = 6308;
	opValues["deleteProdPeriodSubmit"] = 6318;

	// operations to order entry and maintenance - schedule orders - schedule
	opValues["baseSchedule"] = 6400;
	opValues["listSchedule"] = 6401;
	opValues["searchScheduleForm"] = 6404;		// reserved
	opValues["searchScheduleSubmit"] = 6414;		// reserved
	opValues["viewSchedule"] = 6405;
	opValues["modifyScheduleForm"] = 6406;
	opValues["modifyScheduleSubmit"] = 6416;
	opValues["insertScheduleForm"] = 6407;
	opValues["insertScheduleSubmit"] = 6417;
	opValues["deleteScheduleForm"] = 6408;
	opValues["deleteScheduleSubmit"] = 6418;


	var column_headers = [
			"Supplier", "Customer", "Order", "Refer No", "Delivery Location", "Delivery Date", "Order Status", "Approved?", "Operator", "Order Source"
	];
		
	var otherText = new Array();
	otherText["youraction"] =  "YOUR ACTION";
    otherText["orderDetails"] =  "ORDER DETAILS";
    otherText["scheduleOrder"] =  "SCHEDULE ORDER";

	otherText["defaultOperator"] =  "ERP Auto";


	otherText["btn_search_order"] =  "Search An Order";
	otherText["btn_bakto_customers"] =  "Back to Customer";

	otherText["btn_bakto_orderPg"] =  "Back to Order Listing Page";

	otherText["btn_next_page"] =  "Next";
	otherText["btn_prev_page"] =  "Previous";
	otherText["btn_search_go"] =  "Start the Search ...";

	otherText["tab_depot_ordstat"] = "Depot and Order Status Details";

	otherText["pgTitle_order"] =  "Customer Order Processing, Order Listing Page";
	otherText["pgTitle_orderUpd"] =  "Customer Order Processing, Order Listing, Modify";
	otherText["pgTitle_orderAdd"] =  "Customer Order Processing, Order Listing, Add";
	otherText["pgTitle_orderDel"] =  "Customer Order Processing, Order Listing, Delete";

	otherText["pgHead_order"] =  "Order Listing";
	otherText["pgHead_orderUpd"] =  "Modify Order";
	otherText["pgHead_orderAdd"] =  "Add Order";
	otherText["pgHead_orderDel"] =  "Delete Order";

	otherText["msg_del_confirm"] =  "Are you sure you want to delete?";
	otherText["msg_upd_warning"] =  "No updates allowed here. Press any key to continue...";


    otherText["msg_updOrder_fSet"] =  "Order";
    otherText["msg_updOrder_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
    otherText["msg_addOrder_fSet"] =  "Order";
    otherText["msg_addOrder_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";

	otherText["msg_selAaddr"] =  "Please select an address";

	otherText["msg_selOrderStatus"] = "ALL";
	otherText["view_all"] =  "View All";

	otherText["msg_enterOrderNo"] = "Please enter the order number ";
	otherText["msg_enterOrderRef"] = "Please enter the order reference!";
	otherText["msg_enterOrderDate"] = "Please enter the order date!";
 	otherText["msg_enterOrderDelDate"] = "Please enter the delivery date!";

	otherText["msg_selOrderMthd"] = "Please select the order method!";
	otherText["msg_selOrderDelvMthd"] = "Please select the delivery method!";
	otherText["msg_selOrderSaleType"] = "Please select the sale type!";
	otherText["msg_selOrderDelvLoc"] = "Please select the delivery location!";

	otherText["msg_selOrderDrawer"] = "Please select the order drawer!";
 	otherText["msg_enterOrderExpDate"] = "Please enter the order expiry date!";
	otherText["msg_selOrderTerminal"] = "Please select the terminal!";
	otherText["msg_selOrderSupplyPoint"] = "Please select the order supply point!";


 	otherText["msg_enterOrderLimit"] = "Please enter the order limit ";
	otherText["msg_selOrderCarrier"] = "Please select the order carrier!";
	otherText["msg_selOrderTransferType"] = "Please select the order transfer type!";
	otherText["msg_enterOrderTransferType"] = "Please enter the order transfer type!";
 	otherText["msg_enterOrderInstruction"] = "Please enter the order instruction!";

 	otherText["selectDate"] = "Select Date";
 	otherText["selectDateShort"] = "Date";

 	otherText["wrongOrdDate"] = "Submit failed!\n Please make sure that the order date is greater than or equal to today.\n We have set it to default.";
 	otherText["wrongDelDate"] = "Submit failed!\n Please make sure that the delivery date is greater than or equal to order date.\n We have set it to default.";
 	otherText["wrongExpDate"] = "Submit failed!\n Please make sure that the expiry date is greater than or equal to delivery date.\n We have set it to default.";

	var alertWrongOrdDate = otherText["wrongOrdDate"];
	var alertWrongDelDate = otherText["wrongDelDate"];
	var alertWrongExpDate = otherText["wrongExpDate"];


	otherText["ALL"] =  "ALL";

	otherText["supp"] =  "Supplier";
    otherText["cust"] =  "Customer";
    otherText["term"] =  "Depot";
    otherText["stat"] =  "Order Status";


	var orderTitle = new Array();
	orderTitle["code"] = "Code";
	orderTitle["name"] = "Name";
	orderTitle["addr"] = "Address";
	orderTitle["grid"] = "Grid";

	orderTitle["transpt"] =  "Transport";
	orderTitle["largst"] =  "Largest";
	orderTitle["doc"] =  "Document";
	orderTitle["unit"] =  "Unit";
	orderTitle["tarif"] =  "Tarrif";
	orderTitle["trip_time"] =  "Trip Time";
	orderTitle["trip_dist"] =  "Trip Distance";
	orderTitle["contact"] =  "Contact";
	orderTitle["phone"] =  "Phone";
	orderTitle["prof"] =  "Profile";


	orderTitle["order_cust_no"] = "Order Number";
	orderTitle["order_no"] = "Order Number";

	orderTitle["order_ref_code"] = "Reference Code";
	orderTitle["orddate"] = "Order DMY";
	orderTitle["deldate"] = "Delivery DMY";
	orderTitle["order_ord_mthd"] = "Order Method";  //?
	orderTitle["order_delv_mthd"] = "Delivery Method";

	orderTitle["order_sale_type"] = "Sale Type";
	orderTitle["order_dlv_code"] = "Delivery Location";
	orderTitle["order_drawer"] = "Drawer";
	orderTitle["order_exp_date"] = "Expiry DMY";
	orderTitle["order_terminal"] = "Order Terminal";
	
	orderTitle["ord_supply_point"] = "Supply Point";
	orderTitle["order_approved"] = "Approved";
	orderTitle["order_invoiced"] = "Invoiced";  //?
	orderTitle["order_limit"] = "Limit (" + moneyCurrency + ")";
	orderTitle["order_total"] = "Total (" + moneyCurrency + ")";

	orderTitle["order_carrier"] = "Carrier";
	orderTitle["transfer_type"] = "Transfer Type";
	orderTitle["order_instruction"] = "Instruction";
	orderTitle["order_source"] = "Order Source";

	//search form
	orderTitle["order_number"] = "Order Number";
	orderTitle["order_stat_str"]    = "Order Status";

	var orderStatusStr = new Array();
	orderStatusStr["0"] = "No updates allowed here!\n[ Order Status: New ]";
	orderStatusStr["1"] = "No updates allowed here!\n[ Order Status: PARTIALLY SCHEDULED ]";
	orderStatusStr["2"] = "No updates allowed here!\n[ Order Status: FULLY SCHEDULED ] ";
	orderStatusStr["3"] = "No updates allowed here!\n[ Order Status: FULLY LOADED ]";
	orderStatusStr["4"] = "No updates allowed here!\n[ Order Status: OUTSTANDING ]";
	orderStatusStr["5"] = "No updates allowed here!\n[ Order Status: FULLY DELIVERED ]";
	orderStatusStr["6"] = "No updates allowed here!\n[ Order Status: EXPIRED ]";
	orderStatusStr["7"] = "No updates allowed here!\n[ Order Status: PARTIALLY LOADED ]";
	orderStatusStr["8"] = "No updates allowed here!\n[ Order Status: PARTIALLY DELIVERED ]";

	orderStatusStr["100"] = "No updates allowed here!\n[ Order Status: New+APPROVED ]";
	orderStatusStr["101"] = "No updates allowed here!\n[ Order Status: PARTIALLY SCHEDULED+APPROVED ]";
	orderStatusStr["102"] = "No updates allowed here!\n[ Order Status: FULLY SCHEDULED+APPROVED ] ";
	orderStatusStr["103"] = "No updates allowed here!\n[ Order Status: FULLY LOADED+APPROVED ]";
	orderStatusStr["104"] = "No updates allowed here!\n[ Order Status: OUTSTANDING+APPROVED ]";
	orderStatusStr["105"] = "No updates allowed here!\n[ Order Status: FULLY DELIVERED+APPROVED ]";
	orderStatusStr["106"] = "No updates allowed here!\n[ Order Status: EXPIRED+APPROVED ]";
	orderStatusStr["107"] = "No updates allowed here!\n[ Order Status: PARTIALLY LOADED+APPROVED ]";
	orderStatusStr["108"] = "No updates allowed here!\n[ Order Status: PARTIALLY DELIVERED+APPROVED ]";

	orderStatusStr["1000"] = "No updates allowed here!\n[ Order Status: New+INVOICED ]";
	orderStatusStr["1001"] = "No updates allowed here!\n[ Order Status: PARTIALLY SCHEDULED+INVOICED ]";
	orderStatusStr["1002"] = "No updates allowed here!\n[ Order Status: FULLY SCHEDULED+INVOICED ] ";
	orderStatusStr["1003"] = "No updates allowed here!\n[ Order Status: FULLY LOADED+INVOICED ]";
	orderStatusStr["1004"] = "No updates allowed here!\n[ Order Status: OUTSTANDING+INVOICED ]";
	orderStatusStr["1005"] = "No updates allowed here!\n[ Order Status: FULLY DELIVERED+INVOICED ]";
	orderStatusStr["1006"] = "No updates allowed here!\n[ Order Status: EXPIRED+INVOICED ]";
	orderStatusStr["1007"] = "No updates allowed here!\n[ Order Status: PARTIALLY LOADED+INVOICED ]";
	orderStatusStr["1008"] = "No updates allowed here!\n[ Order Status: PARTIALLY DELIVERED+INVOICED ]";

	orderStatusStr["1100"] = "No updates allowed here!\n[ Order Status: New+APPROVED+INVOICED ]";
	orderStatusStr["1101"] = "No updates allowed here!\n[ Order Status: PARTIALLY SCHEDULED+APPROVED+INVOICED ]";
	orderStatusStr["1102"] = "No updates allowed here!\n[ Order Status: FULLY SCHEDULED+APPROVED+INVOICED ] ";
	orderStatusStr["1103"] = "No updates allowed here!\n[ Order Status: FULLY LOADED+APPROVED+INVOICED ]";
	orderStatusStr["1104"] = "No updates allowed here!\n[ Order Status: OUTSTANDING+APPROVED+INVOICED ]";
	orderStatusStr["1105"] = "No updates allowed here!\n[ Order Status: FULLY DELIVERED+APPROVED+INVOICED ]";
	orderStatusStr["1106"] = "No updates allowed here!\n[ Order Status: EXPIRED+APPROVED+INVOICED ]";
	orderStatusStr["1107"] = "No updates allowed here!\n[ Order Status: PARTIALLY LOADED+APPROVED+INVOICED ]";
	orderStatusStr["1108"] = "No updates allowed here!\n[ Order Status: PARTIALLY DELIVERED+APPROVED+INVOICED ]";


	var orderStatusGate = 1;   // Partly Schedulled
		
	var dateFormat = "yyyy-MM-dd";
//	var dateFormat = "dd-NNN-yyyy";
	var items_per_page = 10;

	var before_date = "2005-01-01";

		
	var l_opInf= new Array()
	for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
	l_opInf[10128]= "Successfully Deleted!";
	l_opInf[10127]= "Successfully Inserted a New Record!";
	l_opInf[10126]= "Successfully Updated!";

	l_opInf[10138]= "Delete Failed!";
	l_opInf[10137]= "Insert Failed!";
	l_opInf[10136]= "Update Failed!";


	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 10101,10104,10105,10106,10107,10107];
	var ops_req_search = [10101];// search never required on this page
}



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
	if (priv >= 5 && curViewDetailState == opValues["listOrderList"]) 
	{
		newPage += displayOrderList (curPrivilage, curColumnToSort);
	}
	if (priv >= 5 && curViewDetailState == opValues["viewOrderList"]) 
	{
//		newPage += displayOrderDetails (curPrivilage, curColumnToSort);
		newPage += displayOrderList (curPrivilage, curColumnToSort);
	}
		
	
	/* Display Form for Modify Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyOrderListForm"])	
	{
		if ( frm_order_approved == "N" && order_status != 6)
		{
			newPage += displayModifyOrderForm();
		}
		else
		{
			newPage += displayModifyOrderFormApproved();
		}
	}
	/* Submit the Modification of Order Details */
	if (priv >= 6 && curViewDetailState == opValues["modifyOrderListSubmit"])	
	{
		newPage += displayOrderList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Insert Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertOrderListForm"])	
	{
		newPage += displayInsertOrderForm();
	}
	/* Submit the Insertion of Order Details */
	if (priv >= 7 && curViewDetailState == opValues["insertOrderListSubmit"])	
	{
		newPage += displayOrderList(curPrivilage, curColumnToSort);
	}

	/* Display Form for Delete a recorde of Order */
//	if (priv >= 8 && curViewDetailState == opValues["deleteOrderListForm"])	
//	{
//		newPage += displayDeleteOrderForm();
//	}
	/* Submit the Deletion of Order Details */
	if (priv >= 8 && curViewDetailState == opValues["deleteOrderListSubmit"])	
	{
		newPage += displayOrderList(curPrivilage, curColumnToSort);
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




function displayOrderListNormalForm(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm ="";
	var ordIndex = 0;
	var aId;
	var supp_name = "";
	var cust_name = "";

	ordIndex = order_jstab.length - 1;

	if (termCd=="" || termCd=="-1")
	{
		termCd = terminal[1][0];
	}

	dispFrm += makespace("\t", indent) + "<tr>\n";
	dispFrm += makespace("\t", indent) + "<td>\n";
	dispFrm += makespace("\t", indent+1) + "<form name=\"list_order\" method=\"get\" id=\"list_order\" action=\"order_list.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	dispFrm += " <ul id=\"tabmenu\">\n";
	dispFrm += "<li>" + otherText["tab_depot_ordstat"] + "</li>\n";
	dispFrm += "</ul>\n";

	dispFrm += "<div class=\"adminform\">\n";

	dispFrm += makespace("\t", indent+2) + "<table width=\"100%\">\n";
	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makespace("\t", indent+2) + "<td class=\"infotext\">\n";

	// hidden area for passing values between web pages
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["listOrderList"] + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	dispFrm += makespace("\t", indent+2) + "</td>\n";
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	dispFrm += makespace("\t", indent+2) + "<tr> \n";
	dispFrm += makefield(2, otherText["term"], termCd, "termCd", "termCd", terminal, 0, 0, "onchange=javascript:submit();", 	otherText["msg_selOrderTerminal"], "&nbsp;", indent+2, 100);
	dispFrm += makefield(2, otherText["stat"], ordStatus, "ordStatus", "ordStatus", order_status_jslst, 0, 0, "onchange=javascript:submit();", 	otherText["msg_selOrderStatus"], "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr> \n";

	dispFrm += makespace("\t", indent+2) + "</table>\n";
	dispFrm += makespace("\t", indent+2) + "</div>\n";

	dispFrm += makespace("\t", indent+1) + "</form>\n";

	dispFrm += makespace("\t", indent) + "</td>\n";	
	dispFrm += makespace("\t", indent) + "</tr> \n";
  
	return dispFrm;
}



function displayOrderListSearchForm(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm ="";
	var ordIndex = 0;
	var aId;
	var supp_name = "";
	var cust_name = "";

	ordIndex = order_jstab.length - 1;

	if (termCd=="" || termCd=="-1")
	{
		termCd = terminal[1][0];
	}

	if ( frm_order_cust_no_search == "-1" )
	{
		frm_order_cust_no_search = "";
	}
	if ( frm_order_ref_code_search == "-1" )
	{
		frm_order_ref_code_search = "";
	}

	if (frm_order_source_search=="" || frm_order_source_search=="-1")
	{
		frm_order_source_search = "";
	}
	
	dispFrm += makespace("\t", indent) + "<tr>\n";
	dispFrm += makespace("\t", indent) + "<td>\n";
	dispFrm += makespace("\t", indent+1) + "<form name=\"list_order\" method=\"get\" id=\"list_order\" action=\"order_list.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	dispFrm += " <ul id=\"tabmenu\">\n";
	dispFrm += "<li>" + otherText["btn_search_order"] + "</li>\n";
	dispFrm += "</ul>\n";

	dispFrm += "<div class=\"adminform\">\n";
	dispFrm += makespace("\t", indent+1) + "<table width=\"100%\">\n";

	dispFrm += makespace("\t", indent+1) + "<tr>\n";
	dispFrm += makespace("\t", indent+1) + "<td class=\"infotext\" width=\"10\">\n";

	// hidden area for passing values between web pages
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["listOrderList"] + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";
	dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"is_search_on\" id=\"is_search_on\" value=\"" + is_search_on + "\">\n";

	dispFrm += makespace("\t", indent+2) + "</td>\n";

	dispFrm += makefield(2, otherText["term"], termCd, "termCd", "termCd", terminal, 0, 0, "onchange=javascript:submit();", 	otherText["msg_selOrderTerminal"], "&nbsp;", indent+2, 80);

	dispFrm += makefield(1, orderTitle["order_number"], frm_order_cust_no_search, "frm_order_cust_no_search", "frm_order_cust_no_search", "", 10, 9, "onchange=\"submit();\" ", "", "&nbsp;", indent+4, 80);

	// need add ERP TYPE drop list here
	dispFrm += makefield(2, orderTitle["order_source"], frm_order_source_search, "frm_order_source_search", "frm_order_source_search", erp_type_jslst, 0, 0, "onchange=\"submit();\" ", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "&nbsp;", indent+4, 30);


	// search form
	dispFrm += makespace("\t", indent+1) + "</tr>\n";

	dispFrm += makespace("\t", indent+1) + "<tr> \n";
	dispFrm += makespace("\t", indent+1) + "<td class=\"infotext\" width=\"10\">\n";
	dispFrm += makespace("\t", indent+1) + "</td>\n";

	dispFrm += makefield(2, otherText["stat"], ordStatus, "ordStatus", "ordStatus", order_status_jslst, 0, 0, "onchange=javascript:submit();", 	otherText["msg_selOrderStatus"], "&nbsp;", indent+2, 80);

	dispFrm += makefield(1, orderTitle["order_ref_code"], frm_order_ref_code_search, "frm_order_ref_code_search", "frm_order_ref_code_search", "", 20, 16, 		"", "", "&nbsp;", indent+2, 30);

	dispFrm += makespace("\t", indent+3) + "<td colspan=\"2\" align=\"left\" class=\"infotext\" width=\"100\">\n";
	dispFrm += "<input type=\"submit\" value=\""+commText["Search"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
	dispFrm += makespace("\t", indent+3) + "</td>\n";

	dispFrm += makespace("\t", indent+1) + "</tr> \n";

	dispFrm += makespace("\t", indent+1) + "</table>\n";
	dispFrm += makespace("\t", indent+2) + "</div>\n";


	dispFrm += makespace("\t", indent+1) + "</form>\n";

	dispFrm += makespace("\t", indent) + "</td>\n";	
	dispFrm += makespace("\t", indent) + "</tr> \n";
  
	return dispFrm;
}





function displayOrderList(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm ="";
	var pos_aprv_status;
	var pos_oper;
	var pos_erptype;

	pos_aprv_status = 16;
	pos_oper = pos_aprv_status + 1;
	pos_erptype = pos_aprv_status + 2;

	//dispFrm += makespace("\t", indent) + displayGlblFrm();
	dispFrm += makespace("\t", indent) + btnGroupOrder_HTML();
//	dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "order_list.cgi", "pg_3");


	if (is_search_on == 1)
	{
		dispFrm += displayOrderListSearchForm(curPrivilage,curColumnToSort);
	}
	else
	{
		dispFrm += displayOrderListNormalForm(curPrivilage,curColumnToSort);
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

	for(i in order_jstab)
	{
		if (i>0)
		{
			dispFrm += makespace("\t", indent+2) + "<tr class=\"row1\">\n";
			var howmanyDone = 0;
			for(var j=0; j<column_headers.length; j++)
			{
				if (curColumnToSort == howmanyDone)
				{
					dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(order_jstab[i][howmanyDone]) + "<\/td>";
				} 
				else 
				{
					dispFrm += makespace("\t", indent+2) + "<td>\n";				  
					if(howmanyDone==0) // means time to display the drop list and table
					{
						dispFrm += makespace("\t", indent+3) + "<form name=\"select_action_" + i + "\" id=\"select_action_" + i + "\" >\n";
						dispFrm += makespace("\t", indent+4) + "<table border=\"0\">\n";
						dispFrm += makespace("\t", indent+4) + "<tr>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\"> <span style=\"COLOR: #FF0000;\">" + obs(order_jstab[i][howmanyDone]) + "</span>\n";
              
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"orderCustNo\" id=\"orderCustNo\" value=\"" + order_jstab[i][2] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + order_jstab[i][7] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + order_jstab[i][8] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + order_jstab[i][0] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + order_jstab[i][1] + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"ordStatus\" id=\"ordStatus\" value=\"" + ordStatus + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"is_search_on\" id=\"is_search_on\" value=\"" + is_search_on + "\">\n";
						dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" 	name=\"order_status\" id=\"order_status\" value=\"" + order_jstab[i][15] + "\">\n";

						dispFrm += makespace("\t", indent+5) + preqstr_field ();
						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

//op_list(priv, accNum, ordNum, cmpyNum, suppNum, frmNum, ordStatus, ordStat)
//0: order_rec.SUPP_CMPY_CODE.arr
//1: order_rec.CUST_CMPY_CODE.arr
//2: order_rec.ORDER_CUST_ORDNO 	
//3: order_rec.ORDER_REF_CODE.arr 	
//4: order_rec.DLV_NAME.arr 
//5: order_rec.DELDATE.arr 
//6: order_rec.ORDER_STATUS_NAME.arr 
//7: order_rec.ORDER_NO 	
//8: order_rec.ORDER_CUST.arr 
//9: order_rec.ORDER_EXP_DATE.arr 
//10:order_rec.TRANSPORT_NAME.arr 
//11:order_rec.SUPP_CMPY_NAME.arr 	
//12:order_rec.CUST_CMPY_NAME.arr 	
//13:order_rec.TERM_CODE.arr 	
//14:order_rec.TERM_NAME.arr 	
//15:order_status 	
//16:order_approve_status 	
//17:operator name derived from order_rec.ORD_PSN_CODE.arr
//18:order_rec.ORDER_SOURCE.arr 
						dispFrm += makespace("\t", indent+5) + op_list (curPrivilage, order_jstab[i][8], order_jstab[i][7], order_jstab[i][1], order_jstab[i][0], i, order_jstab[i][15], ordStatus);


						dispFrm += makespace("\t", indent+4) + "</td>\n";
						dispFrm += makespace("\t", indent+4) + "</tr>\n";
						dispFrm += makespace("\t", indent+4) + "</table>\n";
						dispFrm += makespace("\t", indent+3) + "</form>\n";
					}
					else
					{
							if ( j == (column_headers.length-3) )
							{
								if (order_jstab[i][pos_aprv_status] == 1)
								{
									dispFrm += makespace("\t", indent+3) + "<center><img src=\"/images/check_mark_blue.gif\" alt=\"Yes\" title=\"Yes\"></center>";
								}
								else
								{
									dispFrm += makespace("\t", indent+3) + "<center><img src=\"/images/cross_mark_red.jpg\" alt=\"Yes\" title=\"Yes\"></center>";
								}
							}
							else
							if ( j == (column_headers.length-2) )
							{
								if (order_jstab[i][pos_oper] == "")
								{
									dispFrm += makespace("\t", indent+3) + obs(otherText["defaultOperator"]);
								}
								else
								{
									dispFrm += makespace("\t", indent+3) + obs(order_jstab[i][pos_oper]);
								}
							}
							else
							if ( j == column_headers.length-1 )
							{
								if (order_jstab[i][pos_erptype] == "")
								{
									dispFrm += makespace("\t", indent+3) + obs(erp_type_arrlst["1"] );
								}
								else
								{
									dispFrm += makespace("\t", indent+3) + obs(order_jstab[i][pos_erptype]+"-"+erp_type_arrlst[ order_jstab[i][pos_erptype] ]);
								}
							}
							else
							{
								dispFrm += makespace("\t", indent+3) + obs(order_jstab[i][howmanyDone]);
							}
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
	
	if ( pg_3 == -1) 
		pg_3 = 1;

		if ( parseInt(pg_3) > 0 && parseInt(pagesTotal_3) > 1 )
		{
			
		dispFrm +=nextPage_longStr(pagesTotal_3, pg_3, "pg_3",'is_search_on',is_search_on,'pg',pg,'termCd',termCd,'op', opValues["listOrderList"], 'frm_order_cust_no_search',frm_order_cust_no_search,'suppCd', suppCd,'cmpyCd', cmpyCd,'custAcc', custAcc, 'ordStatus',ordStatus,'statusBar','');
		}
  
	//dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "order_list.cgi", "pg_3");
//	dispFrm += makespace("\t", indent) + btnGroupOrder_HTML();

	return dispFrm;
}






function displayOrderDetails(curPrivilage,curColumnToSort)
{
	var indent = 1;
	var dispFrm = "";
	var deliv_locs_addr_details;

	deliv_locs_addr_details = deliv_locs_addr_jstab["1"] + "<br>" + deliv_locs_addr_jstab["2"] + "<br>" + deliv_locs_addr_jstab["3"] + " " + deliv_locs_addr_jstab["4"] + "<br>" + deliv_locs_addr_jstab["5"];

	dispFrm += makespace("\t", indent) + btnGroupOrderDetails_HTML();
	dispFrm += makespace("\t", indent) + "<tr>\n";
	dispFrm += makespace("\t", indent) + "<td align=\"left\"> \n";
	dispFrm += makespace("\t", indent+1) + "<table>\n";

	// 1st row
	dispFrm += makespace("\t", indent+1) + "<tr>\n";
	dispFrm += makefield(0, orderTitle["name"], deliv_locs_det_jstab[1], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 140);
	dispFrm += makefield(0, orderTitle["code"], deliv_locs_det_jstab[2], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 140);
	dispFrm += makespace("\t", indent+1) + "</tr>\n";

	// 2nd row
	dispFrm += makespace("\t", indent+1) + "<tr>\n";
	dispFrm += makefield(0, orderTitle["addr"], deliv_locs_addr_details, "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 140);
	dispFrm += makefield(0, orderTitle["code"], deliv_locs_det_jstab[3], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 140);
	dispFrm += makespace("\t", indent+1) + "</tr>\n";

	// 3rd row
	dispFrm += makespace("\t", indent+1) + "<tr>\n";
	dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 140);
	dispFrm += makefield(0, orderTitle["grid"], deliv_locs_det_jstab[4], "", "", "", 0, 0, "", "", "&nbsp;", indent+1, 140);
	dispFrm += makespace("\t", indent+1) + "</tr>\n";
	dispFrm += makespace("\t", indent+1) + "</table>\n";
	dispFrm += makespace("\t", indent) + "</td> \n";
	dispFrm += makespace("\t", indent) + "</tr> \n";
	 
	dispFrm += makespace("\t", indent) + "<tr> \n";
	dispFrm += makespace("\t", indent) + "<td align=\"left\"> \n";
	dispFrm += makespace("\t", indent+1) + "<div id=\"helparea\"> \n";
	dispFrm += makespace("\t", indent+2) + "<table>\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makefield(0, orderTitle["transpt"], deliv_locs_det_jstab[5], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makefield(0, orderTitle["largst"], deliv_locs_det_jstab[6], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makefield(0, orderTitle["doc"], deliv_locs_det_jstab[7], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makefield(0, orderTitle["unit"], deliv_locs_det_jstab[8], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makefield(0, orderTitle["tarif"], deliv_locs_det_jstab[9], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makefield(0, orderTitle["trip_time"], deliv_locs_det_jstab[10], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makefield(0, orderTitle["trip_dist"], deliv_locs_det_jstab[11], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr>\n";

	// 4th row 
	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makefield(0, orderTitle["contact"], deliv_locs_det_jstab[12], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makefield(0, orderTitle["phone"], deliv_locs_det_jstab[13], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr>\n";
	
	dispFrm += makespace("\t", indent+2) + "<tr>\n";
	dispFrm += makefield(0, orderTitle["prof"], deliv_locs_det_jstab[14], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 100);
	dispFrm += makespace("\t", indent+2) + "</tr>\n";
	
	dispFrm += makespace("\t", indent+2) + "</table>\n";
	dispFrm += makespace("\t", indent+1) + "</div> \n";  
	dispFrm += makespace("\t", indent) + "</td> \n";
	dispFrm += makespace("\t", indent) + "</tr> \n";

//	dispFrm += makespace("\t", indent) + btnGroupOrderDetails_HTML();

	return dispFrm;
}





function displayModifyOrderForm ()
{
	var indent = 1;
	var updFrm = "";
	var dateStr;
	var aId;

	if (frm_order_carrier=="" || frm_order_carrier=="-1")
	{
		frm_order_carrier = "ANY";
	}

	updFrm += makespace("\t", indent) + btnGroupModifyOrder_HTML();

	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td>\n";
//	updFrm += makespace("\t", indent+1) + "<form name=\"edit_order\" method=\"get\" id=\"edit_order\" action=\"order_list.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	updFrm += makespace("\t", indent+1) + "<form name=\"edit_order\" method=\"get\" id=\"edit_order\" action=\"order_list.cgi\" onsubmit=\"return submitUpdateOrderFrm(this);\">\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + otherText["msg_updOrder_fSet"] + "</li>\n";
	updFrm += "</ul>\n";
	updFrm += "<div class=\"adminform\">\n";

//	updFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	updFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_updOrder_fSet"] + "</strong></legend>\n";

	updFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	updFrm += makespace("\t", indent+4) + "<br>\n";
	updFrm += makespace("\t", indent+4) + otherText["msg_updOrder_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyOrderListSubmit"] + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + orderNo + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"ordStatus\" id=\"ordStatus\" value=\"" + ordStatus + "\">\n";

	updFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"is_search_on\" id=\"is_search_on\" value=\"" + is_search_on + "\">\n";

	updFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"frm_order_ord_mthd\" id=\"frm_order_ord_mthd\" value=\"" + frm_order_ord_mthd + "\">\n";

	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	updFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
//	updFrm += makefield(1, orderTitle["order_cust_no"], frm_order_cust_no, "frm_order_cust_no", "frm_order_cust_no", "", 10, 9, "dataType=\"Number\"", otherText["msg_enterOrderNo"], "*", indent+4, 100);
	updFrm += makefield(3, orderTitle["order_cust_no"], frm_order_cust_no, "frm_order_cust_no", "frm_order_cust_no", "", 10, 9, "", "", "&nbsp;", indent+4, 100);
//	updFrm += makefield(3, orderTitle["order_no"], frm_order_no, "frm_order_no", "frm_order_no", "", 10, 9, "", "", "&nbsp;", indent+4, 100);
//	updFrm += makefield(1, orderTitle["order_ref_code"], frm_order_ref_code, "frm_order_ref_code", "frm_order_ref_code", "", 30, 15, "dataType=\"Require\"", otherText["msg_enterOrderRef"], "*", indent+4, 100);
	updFrm += makefield(1, orderTitle["order_ref_code"], frm_order_ref_code, "frm_order_ref_code", "frm_order_ref_code", "", 30, 15, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
//	dateStr = dateURL_HTML("document.forms[0].frm_orddate", "date_anchor1", "dd-NNN-yyyy", otherText["selectDate"]);
//	updFrm += makefield(4, orderTitle["orddate"], frm_orddate, "frm_orddate", "frm_orddate", dateStr, 10, 10, "dataType=\"Require\"", otherText["msg_enterOrderDate"], "*", indent+4, 100);
	updFrm += makefield(3, orderTitle["orddate"], frm_orddate, "frm_orddate", "frm_orddate", "", 10, 10, "", "", "&nbsp;", indent+4, 100);
	dateStr = dateURL_HTML("document.forms[0].frm_deldate", "date_anchor2", dateFormat, otherText["selectDate"]);
	updFrm += makefield(4, orderTitle["deldate"], frm_deldate, "frm_deldate", "frm_deldate", dateStr, 10, 10, "dataType=\"Require\"", otherText["msg_enterOrderDelDate"], "*", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 3rd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
//	updFrm += makefield(2, orderTitle["order_ord_mthd"], frm_order_ord_mthd, "frm_order_ord_mthd", "frm_order_ord_mthd", order_methods, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderMthd"], "*", indent+4, 100);
	var ord_mthd_name = "";
	if (frm_order_delv_mthd == 1 || frm_order_delv_mthd == 3)
	{
		frm_order_ord_mthd = 1;
	}
	else
	{
		frm_order_ord_mthd = 0;
	}
	for(aId in order_methods)
	{
		if (order_methods[aId][0] == frm_order_ord_mthd)
		{
			ord_mthd_name = order_methods[aId][1];
		}
	}
	updFrm += makefield(0, orderTitle["order_ord_mthd"], ord_mthd_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
//	updFrm += makefield(3, orderTitle["order_ord_mthd"], frm_order_ord_mthd, "frm_order_ord_mthd", "frm_order_ord_mthd", "", 16, 16, "", "", "&nbsp;", indent+4, 100);
	if (frm_order_ord_mthd == 0)
	{
		updFrm += makefield(2, orderTitle["order_delv_mthd"], frm_order_delv_mthd, "frm_order_delv_mthd", "frm_order_delv_mthd", transport_types_bulk, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderDelvMthd"], "*", indent+4, 100);
	}
	else
	if (frm_order_ord_mthd == 1)
	{
		updFrm += makefield(2, orderTitle["order_delv_mthd"], frm_order_delv_mthd, "frm_order_delv_mthd", "frm_order_delv_mthd", transport_types_pack, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderDelvMthd"], "*", indent+4, 100);
	}
	else
	{
		updFrm += makefield(2, orderTitle["order_delv_mthd"], frm_order_delv_mthd, "frm_order_delv_mthd", "frm_order_delv_mthd", transport_types_bulk, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderDelvMthd"], "*", indent+4, 100);
	}

	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 4th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(2, orderTitle["order_sale_type"], frm_order_sale_type, "frm_order_sale_type", "frm_order_sale_type", sale_types, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderSaleType"], "*", indent+4, 100);
//	updFrm += makefield(2, orderTitle["order_dlv_code"], frm_order_dlv_code, "frm_order_dlv_code", "frm_order_dlv_code", delivery_locations, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderDelvLoc"], "*", indent+4, 100);
	updFrm += makefield(2, orderTitle["order_dlv_code"], frm_order_dlv_code, "frm_order_dlv_code", "frm_order_dlv_code", delivery_locations, 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 5th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(2, orderTitle["order_drawer"], frm_order_drawer, "frm_order_drawer", "frm_order_drawer", drawers, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderDrawer"], "*", indent+4, 100);
	dateStr = dateURL_HTML("document.forms[0].frm_order_exp_date", "date_anchor3", dateFormat, otherText["selectDate"]);
//	dateStr = "<a href=\"#\" onClick=\"cal.select(document.forms[0].frm_order_exp_date,'anchor3','dd-MM-yyyy'); return false;\" TITLE=\"cal.select(document.forms[0].order_exp_date,'anchor3','dd-MM-yyyy'); return false;\" NAME=\"anchor3\" ID=\"anchor3\">" + otherText["selectDate"] + "</a>\n";
	updFrm += makefield(4, orderTitle["order_exp_date"], frm_order_exp_date, "frm_order_exp_date", "frm_order_exp_date", dateStr, 10, 10, "dataType=\"Require\"", otherText["msg_enterOrderExpDate"], "*", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 6th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(2, orderTitle["order_terminal"], frm_order_terminal, "frm_order_terminal", "frm_order_terminal", terminal, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderTerminal"], "*", indent+4, 100);
	updFrm += makefield(2, orderTitle["ord_supply_point"], frm_ord_supply_point, "frm_ord_supply_point", "frm_ord_supply_point", terminal, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderSupplyPoint"], "*", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 7th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
//	updFrm += makefield(0, orderTitle["order_approved"], frm_order_approved, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(3, orderTitle["order_approved"], frm_order_approved, "frm_order_approved", "frm_order_approved", "", 2, 2, "", "", "&nbsp;", indent+4, 100);
//	updFrm += makefield(0, orderTitle["order_invoiced"], frm_order_invoiced, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(3, orderTitle["order_invoiced"], frm_order_invoiced, "frm_order_invoiced", "frm_order_invoiced", "", 2, 2, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 8th row
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
	updFrm += makefield(1, orderTitle["order_limit"], frm_order_limit, "frm_order_limit", "frm_order_limit", "", 10, 9, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", otherText["msg_enterOrderLimit"]+"( >="+minVal+" )", "*", indent+4, 100);

//	updFrm += makefield(1, orderTitle["order_limit"], frm_order_limit, "frm_order_limit", "frm_order_limit", "", 30, 30, "dataType=\"Double\" ", otherText["msg_enterOrderLimit"], "*", indent+4, 100);
//	updFrm += makefield(1, orderTitle["order_limit"], frm_order_limit, "frm_order_limit", "frm_order_limit", "", 30, 30, " readonly ", "", "&nbsp;", indent+4, 100);
//	updFrm += makefield(0, orderTitle["order_total"], frm_order_total, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(3, orderTitle["order_total"], frm_order_total, "frm_order_total", "frm_order_total", "", 30, 30, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 9th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(2, orderTitle["order_carrier"], frm_order_carrier, "frm_order_carrier", "frm_order_carrier", carriers, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderCarrier"], "*", indent+4, 100);
	updFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	updFrm += makespace("\t", indent+4) + "</table>\n";
	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td>\n";
	updFrm += makespace("\t", indent+4) + "<table>\n";

	// 10th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
//	updFrm += makefield(2, orderTitle["transfer_type"], frm_transfer_type, "frm_transfer_type", "frm_transfer_type", transfer_types, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderTransferType"], "*", indent+4, 100);
//	updFrm += makefield(1, orderTitle["transfer_type"], frm_transfer_type, "frm_transfer_type", "frm_transfer_type", "", 60, 29, "dataType=\"Require\"", otherText["msg_enterOrderTransferType"], "*", indent+4, 100);
	updFrm += makefield(1, orderTitle["transfer_type"], frm_transfer_type, "frm_transfer_type", "frm_transfer_type", "", 60, 29, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 11th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
//	updFrm += makefield(1, orderTitle["order_instruction"], frm_order_instruction, "frm_order_instruction", "frm_order_instruction", "", 30, 60, "dataType=\"Require\"", otherText["msg_enterOrderInstruction"], "*", indent+4, 100);
//	updFrm += makeTextArea(5, orderTitle["order_instruction"], frm_order_instruction, "frm_order_instruction", "frm_order_instruction", "", 30, 5, "dataType=\"Require\"", otherText["msg_enterOrderInstruction"], "*", indent+4, 100);
	updFrm += makeTextArea(5, orderTitle["order_instruction"], frm_order_instruction, "frm_order_instruction", "frm_order_instruction", "", 30, 5, "", "", "&nbsp;", indent+4, 100);
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


function displayModifyOrderFormApproved ()
{
	var indent = 1;
	var updFrm = "";
	var dateStr;
	var aId;

	if (frm_order_carrier=="")
	{
		frm_order_carrier = "ANY";
	}

	updFrm += makespace("\t", indent) + btnGroupModifyOrder_HTML();

	updFrm += makespace("\t", indent) + "<tr>\n";
	updFrm += makespace("\t", indent) + "<td>\n";
//	updFrm += makespace("\t", indent+1) + "<form name=\"edit_order\" method=\"get\" id=\"edit_order\" action=\"order_list.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	updFrm += makespace("\t", indent+1) + "<form name=\"edit_order\" method=\"post\" id=\"edit_order\" action=\"order_list.cgi\" onsubmit=\"return submitUpdateOrderFrm(this);\">\n";

	updFrm += " <ul id=\"tabmenu\">\n";
	updFrm += "<li>" + otherText["msg_updOrder_fSet"] + "</li>\n";
	updFrm += "</ul>\n";
	updFrm += "<div class=\"adminform\">\n";

//	updFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	updFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_updOrder_fSet"] + "</strong></legend>\n";

	updFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	updFrm += makespace("\t", indent+4) + "<br>\n";
	updFrm += makespace("\t", indent+4) + otherText["msg_updOrder_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyOrderListSubmit"] + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + orderNo + "\">\n";
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"ordStatus\" id=\"ordStatus\" value=\"" + ordStatus + "\">\n";

	updFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"is_search_on\" id=\"is_search_on\" value=\"" + is_search_on + "\">\n";
	updFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"frm_order_ord_mthd\" id=\"frm_order_ord_mthd\" value=\"" + frm_order_ord_mthd + "\">\n";

	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	updFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
//	updFrm += makefield(1, orderTitle["order_cust_no"], frm_order_cust_no, "frm_order_cust_no", "frm_order_cust_no", "", 10, 9, "dataType=\"Number\"", otherText["msg_enterOrderNo"], "*", indent+4, 100);
	updFrm += makefield(3, orderTitle["order_cust_no"], frm_order_cust_no, "frm_order_cust_no", 	"frm_order_cust_no", "", 10, 9, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_order_no\" id=\"frm_order_no\" value=\"" + frm_order_no + "\">\n";

//	updFrm += makefield(3, orderTitle["order_no"], frm_order_no, "frm_order_no", "frm_order_no", "", 10, 9, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(3, orderTitle["order_ref_code"], frm_order_ref_code, "frm_order_ref_code", "frm_order_ref_code", "", 30, 15, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
//	dateStr = dateURL_HTML("document.forms[0].frm_orddate", "date_anchor1", "dd-NNN-yyyy", otherText["selectDate"]);
//	updFrm += makefield(4, orderTitle["orddate"], frm_orddate, "frm_orddate", "frm_orddate", dateStr, 10, 10, "dataType=\"Require\"", otherText["msg_enterOrderDate"], "*", indent+4, 100);
	updFrm += makefield(3, orderTitle["orddate"], frm_orddate, "frm_orddate", "frm_orddate", "", 10, 10, "", "", "&nbsp;", indent+4, 100);
	dateStr = dateURL_HTML("document.forms[0].frm_deldate", "date_anchor2", dateFormat, otherText["selectDate"]);
	updFrm += makefield(4, orderTitle["deldate"], frm_deldate, "frm_deldate", "frm_deldate", dateStr, 10, 10, "dataType=\"Require\"", otherText["msg_enterOrderDelDate"], "*", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 3rd row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
//	updFrm += makefield(2, orderTitle["order_ord_mthd"], frm_order_ord_mthd, "frm_order_ord_mthd", "frm_order_ord_mthd", order_methods, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderMthd"], "*", indent+4, 100);
	var ord_mthd_name = "";
	if (frm_order_delv_mthd == 1 || frm_order_delv_mthd == 3)
	{
		frm_order_ord_mthd = 1;
	}
	else
	{
		frm_order_ord_mthd = 0;
	}
	for(aId in order_methods)
	{
		if (order_methods[aId][0] == frm_order_ord_mthd)
		{
			ord_mthd_name = order_methods[aId][1];
		}
	}
	updFrm += makefield(0, orderTitle["order_ord_mthd"], ord_mthd_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	var dlv_mthd_name = "";
	for(aId in transport_types)
	{
		if (transport_types[aId][0] == frm_order_delv_mthd)
		{
			dlv_mthd_name = transport_types[aId][1];
		}
	}
	updFrm += makefield(0, orderTitle["order_delv_mthd"], dlv_mthd_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_order_delv_mthd\" id=\"frm_order_delv_mthd\" value=\"" + frm_order_delv_mthd + "\">\n";

	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 4th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	var sale_type_name = "";
	for(aId in sale_types)
	{
		if (sale_types[aId][0] == frm_order_sale_type)
		{
			sale_type_name = sale_types[aId][1];
		}
	}
	updFrm += makefield(0, orderTitle["order_sale_type"], sale_type_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_order_sale_type\" id=\"frm_order_sale_type\" value=\"" + frm_order_sale_type + "\">\n";
	var dlv_code_name = "";
	for(aId in delivery_locations)
	{
		if (delivery_locations[aId][0] == frm_order_dlv_code)
		{
			dlv_code_name = delivery_locations[aId][1];
		}
	}
	updFrm += makefield(0, orderTitle["order_dlv_code"], dlv_code_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_order_dlv_code\" id=\"frm_order_dlv_code\" value=\"" + frm_order_dlv_code + "\">\n";
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 5th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	var drawer_name = "";
	for(aId in drawers)
	{
		if (drawers[aId][0] == frm_order_drawer)
		{
			drawer_name = drawers[aId][1];
		}
	}
	updFrm += makefield(0, orderTitle["order_drawer"], drawer_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_order_drawer\" id=\"frm_order_drawer\" value=\"" + frm_order_drawer + "\">\n";

	dateStr = dateURL_HTML("document.forms[0].frm_order_exp_date", "date_anchor3", dateFormat, otherText["selectDate"]);
//	dateStr = "<a href=\"#\" onClick=\"cal.select(document.forms[0].frm_order_exp_date,'anchor3','dd-MM-yyyy'); return false;\" TITLE=\"cal.select(document.forms[0].order_exp_date,'anchor3','dd-MM-yyyy'); return false;\" NAME=\"anchor3\" ID=\"anchor3\">" + otherText["selectDate"] + "</a>\n";
	updFrm += makefield(4, orderTitle["order_exp_date"], frm_order_exp_date, "frm_order_exp_date", "frm_order_exp_date", dateStr, 10, 10, "dataType=\"Require\"", otherText["msg_enterOrderExpDate"], "*", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 6th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	var terminal_name = "";
	for(aId in terminal)
	{
		if (terminal[aId][0] == frm_order_terminal)
		{
			terminal_name = terminal[aId][1];
		}
	}
	updFrm += makefield(0, orderTitle["order_terminal"], terminal_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_order_terminal\" id=\"frm_order_terminal\" value=\"" + frm_order_terminal + "\">\n";

	var supply_point_name = "";
	for(aId in terminal)
	{
		if (terminal[aId][0] == frm_ord_supply_point)
		{
			supply_point_name = terminal[aId][1];
		}
	}
	updFrm += makefield(0, orderTitle["ord_supply_point"], supply_point_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_ord_supply_point\" id=\"frm_ord_supply_point\" value=\"" + frm_ord_supply_point + "\">\n";
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 7th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
//	updFrm += makefield(0, orderTitle["order_approved"], frm_order_approved, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(3, orderTitle["order_approved"], frm_order_approved, "frm_order_approved", "frm_order_approved", "", 2, 2, "", "", "&nbsp;", indent+4, 100);
//	updFrm += makefield(0, orderTitle["order_invoiced"], frm_order_invoiced, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(3, orderTitle["order_invoiced"], frm_order_invoiced, "frm_order_invoiced", "frm_order_invoiced", "", 2, 2, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 8th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	updFrm += makefield(3, orderTitle["order_limit"], frm_order_limit, "frm_order_limit", "frm_order_limit", "", 30, 30, "", "", "&nbsp;", indent+4, 100);
//	updFrm += makefield(0, orderTitle["order_total"], frm_order_total, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(3, orderTitle["order_total"], frm_order_total, "frm_order_total", "frm_order_total", "", 30, 30, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 9th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
	var carrier_name = "";
	for(aId in carriers)
	{
		if (carriers[aId][0] == frm_order_carrier)
		{
			carrier_name = carriers[aId][1];
		}
	}
	updFrm += makefield(0, orderTitle["order_carrier"], carrier_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_order_carrier\" id=\"frm_order_carrier\" value=\"" + frm_order_carrier + "\">\n";
	updFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";


	updFrm += makespace("\t", indent+4) + "</table>\n";
	updFrm += makespace("\t", indent+3) + "</td>\n";
	updFrm += makespace("\t", indent+3) + "</tr>\n";
	updFrm += makespace("\t", indent+3) + "<tr>\n";
	updFrm += makespace("\t", indent+3) + "<td>\n";
	updFrm += makespace("\t", indent+4) + "<table>\n";

	// 10th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
//	updFrm += makefield(2, orderTitle["transfer_type"], frm_transfer_type, "frm_transfer_type", "frm_transfer_type", transfer_types, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderTransferType"], "*", indent+4, 100);
	updFrm += makefield(3, orderTitle["transfer_type"], frm_transfer_type, "frm_transfer_type", "frm_transfer_type", "", 60, 29, "", "", "&nbsp;", indent+4, 100);
	updFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	updFrm += makespace("\t", indent+4) + "</tr>\n";

	// 8th row
	updFrm += makespace("\t", indent+4) + "<tr>\n";
//	updFrm += makefield(3, orderTitle["order_instruction"], frm_order_instruction, "frm_order_instruction", "frm_order_instruction", "", 30, 60, "", "", "&nbsp;", indent+4, 100);
	updFrm += makeTextArea(5, orderTitle["order_instruction"], frm_order_instruction, "frm_order_instruction", "frm_order_instruction", "", 30, 5, " readonly ", "", "&nbsp;", indent+4, 100);

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


function displayInsertOrderForm ()
{
	var indent = 1;
	var addFrm = "";
	var dateStr;

	var currDate = getCurrDate();
//	var d = new Date();
//	var currDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
//	var validateStr = "dataType=\"Date\" min=\""+currDate+"\" format=\"ymd\"";
	var validateStr = "dataType=\"Require\"";

	if (frm_orddate=="")
	{
		frm_orddate = currDate;
	}
	if (frm_deldate=="")
	{
		frm_deldate = currDate;
	}
	if (frm_order_exp_date=="")
	{
		frm_order_exp_date = currDate;
	}
	if (frm_order_ord_mthd=="")
	{
		frm_order_ord_mthd = 0;
	}
	if (frm_order_delv_mthd=="")
	{
		frm_order_delv_mthd = 0;
	}
	if (frm_order_drawer=="")
	{
		frm_order_drawer = suppCd;
	}
	if (frm_order_carrier=="")
	{
		frm_order_carrier = "ANY";
	}
	if (frm_order_carrier=="")
	{
		frm_order_carrier = "ANY";
	}
	if (frm_order_terminal=="")
	{
		frm_order_terminal = termCd;
	}
	if (frm_ord_supply_point=="")
	{
		frm_ord_supply_point = termCd;
	}
	if (frm_ord_supply_point=="")
	{
		frm_ord_supply_point = termCd;
	}
	if (frm_order_sale_type=="")
	{
		frm_order_sale_type = 0;
	}
	if (frm_order_approved=="")
	{
		frm_order_approved = "N";
	}
	if (frm_order_total=="")
	{
		frm_order_total = 0;
	}
	if (frm_order_limit=="")
	{
		frm_order_limit = 0;
	}
	if (frm_order_invoiced=="")
	{
		frm_order_invoiced = "N";
	}


	addFrm += makespace("\t", indent) + btnGroupInsertOrder_HTML();

	addFrm += makespace("\t", indent) + "<tr>\n";
	addFrm += makespace("\t", indent) + "<td>\n";
//	addFrm += makespace("\t", indent+1) + "<form name=\"add_order\" method=\"post\" id=\"add_order\" action=\"order_list.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

	addFrm += makespace("\t", indent+1) + "<form name=\"add_order\" method=\"post\" id=\"add_order\" action=\"order_list.cgi\" onsubmit=\"return submitInsertOrderFrm(this);\">\n";

	addFrm += " <ul id=\"tabmenu\">\n";
	addFrm += "<li>" + otherText["msg_addOrder_fSet"] + "</li>\n";
	addFrm += "</ul>\n";
	addFrm += "<div class=\"adminform\">\n";

//	addFrm += makespace("\t", indent+2) + "<fieldset>\n";
//	addFrm += makespace("\t", indent+3) + "<legend class=\"infotext\"><strong>" + otherText["msg_addOrder_fSet"] + "</strong></legend>\n";

	addFrm += makespace("\t", indent+3) + "<table width=\"100%\">\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td class=\"infotext\">\n";
	addFrm += makespace("\t", indent+4) + "<br>\n";
	addFrm += makespace("\t", indent+4) + otherText["msg_addOrder_frmComplt"] +"\n";

	// hidden area for passing values between web pages
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["insertOrderListSubmit"] + "\">\n";

	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

	addFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"is_search_on\" id=\"is_search_on\" value=\"" + is_search_on + "\">\n";

	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td width=\"100%\">\n";

	addFrm += makespace("\t", indent+4) + "<table width=\"100%\">\n";

	// 1st row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(1, orderTitle["order_cust_no"], frm_order_cust_no, "frm_order_cust_no", 	"frm_order_cust_no", "", 10, 9, "dataType=\"Number\"", otherText["msg_enterOrderNo"], "*", indent+4, 100);
//	addFrm += makefield(3, orderTitle["order_no"], frm_order_no, "frm_order_no", "frm_order_no", "", 10, 9, "", "", "&nbsp;", indent+4, 100);
//	addFrm += makefield(1, orderTitle["order_no"], frm_order_no, "frm_order_no", "frm_order_no", "", 10, 9, "dataType=\"Number\"", otherText["msg_enterOrderNo"], "*", indent+4, 100);

	addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_order_no\" id=\"frm_order_no\" value=\"" + frm_order_no + "\">\n";

//	addFrm += makefield(1, orderTitle["order_ref_code"], frm_order_ref_code, "frm_order_ref_code", "frm_order_ref_code", "", 30, 15, "dataType=\"Require\"", otherText["msg_enterOrderRef"], "*", indent+4, 100);
	addFrm += makefield(1, orderTitle["order_ref_code"], frm_order_ref_code, "frm_order_ref_code", "frm_order_ref_code", "", 30, 15, "", "", "&nbsp;", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 2nd row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	dateStr = dateURL_HTML("document.forms[0].frm_orddate", "date_anchor1", dateFormat, otherText["selectDate"]);
	addFrm += makefield(4, orderTitle["orddate"], frm_orddate, "frm_orddate", "frm_orddate", dateStr, 10, 10, validateStr, otherText["msg_enterOrderDate"], "*", indent+4, 100);
	dateStr = dateURL_HTML("document.forms[0].frm_deldate", "date_anchor2", dateFormat, otherText["selectDate"]);
	addFrm += makefield(4, orderTitle["deldate"], frm_deldate, "frm_deldate", "frm_deldate", dateStr, 10, 10, validateStr, otherText["msg_enterOrderDelDate"], "*", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 3rd row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(2, orderTitle["order_ord_mthd"], frm_order_ord_mthd, "frm_order_ord_mthd", "frm_order_ord_mthd", order_methods, 0, 0, "dataType=\"Require\" onchange=\"update(document.add_order, this, document.add_order.frm_order_delv_mthd)\"", otherText["msg_selOrderMthd"], "*", indent+4, 100);
	if (frm_order_ord_mthd == 0)
	{
		addFrm += makefield(2, orderTitle["order_delv_mthd"], frm_order_delv_mthd, "frm_order_delv_mthd", "frm_order_delv_mthd", transport_types_bulk, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderDelvMthd"], "*", indent+4, 100);
	}
	else
	if (frm_order_ord_mthd == 1)
	{
		addFrm += makefield(2, orderTitle["order_delv_mthd"], frm_order_delv_mthd, "frm_order_delv_mthd", "frm_order_delv_mthd", transport_types_pack, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderDelvMthd"], "*", indent+4, 100);
	}
	else
	{
		addFrm += makefield(2, orderTitle["order_delv_mthd"], frm_order_delv_mthd, "frm_order_delv_mthd", "frm_order_delv_mthd", transport_types_bulk, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderDelvMthd"], "*", indent+4, 100);
	}
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 4th row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(2, orderTitle["order_sale_type"], frm_order_sale_type, "frm_order_sale_type", "frm_order_sale_type", sale_types, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderSaleType"], "*", indent+4, 100);
//	addFrm += makefield(2, orderTitle["order_dlv_code"], frm_order_dlv_code, "frm_order_dlv_code", 	"frm_order_dlv_code", delivery_locations, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderDelvLoc"], "*", indent+4, 100);
	addFrm += makefield(2, orderTitle["order_dlv_code"], frm_order_dlv_code, "frm_order_dlv_code", 	"frm_order_dlv_code", delivery_locations, 0, 0, "", "", "&nbsp;", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 5th row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(2, orderTitle["order_drawer"], frm_order_drawer, "frm_order_drawer", "frm_order_drawer", drawers, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderDrawer"], "*", indent+4, 100);
	dateStr = dateURL_HTML("document.forms[0].frm_order_exp_date", "date_anchor3", dateFormat, otherText["selectDate"]);
//	dateStr = "<a href=\"#\" onClick=\"cal.select(document.forms[0].frm_order_exp_date,'anchor3','dd-MM-yyyy'); return false;\" TITLE=\"cal.select(document.forms[0].order_exp_date,'anchor3','dd-MM-yyyy'); return false;\" NAME=\"anchor3\" ID=\"anchor3\">" + otherText["selectDate"] + "</a>\n";
	addFrm += makefield(4, orderTitle["order_exp_date"], frm_order_exp_date, "frm_order_exp_date", "frm_order_exp_date", dateStr, 10, 10, validateStr, otherText["msg_enterOrderExpDate"], "*", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 6th row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(2, orderTitle["order_terminal"], frm_order_terminal, "frm_order_terminal", "frm_order_terminal", terminal, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderTerminal"], "*", indent+4, 100);
	addFrm += makefield(2, orderTitle["ord_supply_point"], frm_ord_supply_point, "frm_ord_supply_point", "frm_ord_supply_point", terminal, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderSupplyPoint"], "*", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 7th row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
//	addFrm += makefield(0, orderTitle["order_approved"], frm_order_approved, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	addFrm += makefield(3, orderTitle["order_approved"], frm_order_approved, "frm_order_approved", "frm_order_approved", "", 2, 2, "", "", "&nbsp;", indent+4, 100);
//	addFrm += makefield(0, orderTitle["order_invoiced"], frm_order_invoiced, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	addFrm += makefield(3, orderTitle["order_invoiced"], frm_order_invoiced, "frm_order_invoiced", "frm_order_invoiced", "", 2, 2, "", "", "&nbsp;", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 8th row
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
	addFrm += makefield(1, orderTitle["order_limit"], frm_order_limit, "frm_order_limit", "frm_order_limit", "", 10, 9, "dataType=\"RangeDouble\" min=\""+minVal+"\" max=\"999999999.0\" ndec=\""+decVal+"\" ", otherText["msg_enterOrderLimit"]+"( >="+minVal+" )", "*", indent+4, 100);

//	addFrm += makefield(1, orderTitle["order_limit"], frm_order_limit, "frm_order_limit", "frm_order_limit", "", 30, 30, "dataType=\"Double\"", otherText["msg_enterOrderLimit"], "*", indent+4, 100);
//	addFrm += makefield(0, orderTitle["order_total"], frm_order_total, "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	addFrm += makefield(3, orderTitle["order_total"], frm_order_total, "frm_order_total", "frm_order_total", "", 30, 30, "", "", "&nbsp;", indent+4, 100);

	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 9th row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
	addFrm += makefield(2, orderTitle["order_carrier"], frm_order_carrier, "frm_order_carrier", "frm_order_carrier", carriers, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderCarrier"], "*", indent+4, 100);
	addFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	addFrm += makespace("\t", indent+4) + "</table>\n";
	addFrm += makespace("\t", indent+3) + "</td>\n";
	addFrm += makespace("\t", indent+3) + "</tr>\n";
	addFrm += makespace("\t", indent+3) + "<tr>\n";
	addFrm += makespace("\t", indent+3) + "<td>\n";
	addFrm += makespace("\t", indent+4) + "<table>\n";

	// 10th row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
//	addFrm += makefield(2, orderTitle["transfer_type"], frm_transfer_type, "frm_transfer_type", "frm_transfer_type", transfer_types, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderTransferType"], "*", indent+4, 100);
//	addFrm += makefield(1, orderTitle["transfer_type"], frm_transfer_type, "frm_transfer_type", "frm_transfer_type", "", 60, 29, "dataType=\"Require\"", otherText["msg_enterOrderTransferType"], "*", indent+4, 100);
	addFrm += makefield(1, orderTitle["transfer_type"], frm_transfer_type, "frm_transfer_type", "frm_transfer_type", "", 60, 29, "", "", "&nbsp;", indent+4, 100);
	addFrm += makefield(0, "&nbsp;", "&nbsp;", "", "", "", 0, 0, "", "", "&nbsp;", indent+4, 100);
	addFrm += makespace("\t", indent+4) + "</tr>\n";

	// 8th row
	addFrm += makespace("\t", indent+4) + "<tr>\n";
//	addFrm += makefield(1, orderTitle["order_instruction"], frm_order_instruction, "frm_order_instruction", "frm_order_instruction", "", 30, 60, "dataType=\"Require\"", otherText["msg_enterOrderInstruction"], "*", indent+4, 100);
//	addFrm += makeTextArea(5, orderTitle["order_instruction"], frm_order_instruction, "frm_order_instruction", "frm_order_instruction", "", 30, 5, "dataType=\"Require\"", otherText["msg_enterOrderInstruction"], "*", indent+4, 100);
	addFrm += makeTextArea(5, orderTitle["order_instruction"], frm_order_instruction, "frm_order_instruction", "frm_order_instruction", "", 30, 5, "", "", "&nbsp;", indent+4, 100);
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



function displayDeleteOrderForm ()
{
	var delFrm = "";


	return delFrm;
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




function btnGroupOrder_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

	if(priv>=5 && is_search_on != 1)
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('order_list.cgi?is_search_on=1&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&op=" + opValues["listOrderList"] + "'); ", otherText["btn_search_order"]);
	}
	else
	{
		btn_HTML += btnLocation_HTML("justChaneMyLocation('order_list.cgi'); ", otherText["btn_bakto_orderPg"]);
	}


//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);


	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}




function btnGroupOrderDetails_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";


	btn_HTML += //btnLocation_HTML("justChaneMyLocation('order_list.cgi?suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&op=" + opValues["listOrderList"] + "'); ", otherText["btn_bakto_orderPg"]);
//	btn_HTML += btnLocation_HTML("history.go(-1);", otherText["btn_bakto_orderPg"]);
	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_list.cgi?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&op=" + opValues["listOrderList"] + "'); ", otherText["btn_bakto_orderPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function btnGroupModifyOrder_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";

/*
	if (priv >= 7)
	{
		btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('order_list.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&prevOp=" + opValues["modifyOrderListForm"] + "&op=" + opValues["insertAddressForm"] + "&delivCd='+delivCd); ", otherText["btn_addNew_delivAddr"]);
	}
*/
//	btn_HTML += btnLocation_HTML("history.go(-1);", otherText["btn_bakto_orderPg"]);
	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_list.cgi?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&ordStatus='+ordStatus+'&op=" + opValues["listOrderList"] + "'); ", otherText["btn_bakto_orderPg"]);
//	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_list.cgi?delivCd='+delivCd); ", otherText["btn_bakto_orderPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function btnGroupInsertOrder_HTML ()
{
	var btn_HTML = "";

	btn_HTML += "         <tr> \n";
	btn_HTML += "             <td align=\"center\">\n ";
	btn_HTML += "                                 <div class=\"button\">\n";
/*
	if (priv >= 7)
	{
		btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('order_list.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&prevOp=" + opValues["insertOrderListForm"] + "&op=" + opValues["insertAddressForm"] + "&delivCd='+delivCd); ", otherText["btn_addNew_delivAddr"]);
	}
*/
//	btn_HTML += btnLocation_HTML("history.go(-1);", otherText["btn_bakto_orderPg"]);
	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_list.cgi?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&op=" + opValues["listOrderList"] + "'); ", otherText["btn_bakto_orderPg"]);
//	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_list.cgi?delivCd='+delivCd); ", otherText["btn_bakto_orderPg"]);

	btn_HTML += "                                 </div><br>\n";
	btn_HTML += "             <td>\n ";
	btn_HTML += "         </tr> \n";

	return btn_HTML;
}



function updatePageHeading(op,pgHead)
{
	var pageHeading = pgHead;

	if (op == opValues["listOrderList"])
	{
		pageHeading += otherText["pgHead_order"];
	}

	if(op == opValues["modifyOrderListForm"] || op == opValues["modifyOrderListSubmit"])
	{
		pageHeading += otherText["pgHead_orderUpd"];
	}
	if(op == opValues["insertOrderListForm"] || op == opValues["insertOrderListSubmit"])
	{
		pageHeading += otherText["pgHead_orderAdd"];
	}
	if(op == opValues["deleteOrderListForm"] || op == opValues["deleteOrderListSubmit"])
	{
		pageHeading += otherText["pgHead_orderDel"];
	}

	return pageHeading; 
}



function updatePageTitle(op,pgTit)
{
	var pageTitle = pgTit;

	if (op == opValues["listOrderList"])
	{
		pageTitle += otherText["pgTitle_order"];
	}

	if(op == opValues["modifyOrderListForm"] || op == opValues["modifyOrderListSubmit"])
	{
		pageTitle += otherText["pgTitle_orderUpd"];
	}
	if(op == opValues["insertOrderListForm"] || op == opValues["insertOrderListSubmit"])
	{
		pageTitle += otherText["pgTitle_orderAdd"];
	}
	if(op == opValues["deleteOrderListForm"] || op == opValues["deleteOrderListSubmit"])
	{
		pageTitle += otherText["pgTitle_orderDel"];
	}

	return pageTitle;
}



/* define function op_list() */
function op_list(priv, accNum, ordNum, cmpyNum, suppNum, frmNum, ordStatus, ordStat)
{
	/* priv = 
		6 modify	op=1,2,3
		7 add		op=4
		8 delete	op=5
	*/
	var op_list = "";
	op_list += "<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+accNum+"', '"+ordNum+"', '"+cmpyNum+"', '"+suppNum+"', '"+frmNum+"', '"+ordStatus+"', '"+ordStat+"');\">          ";

	switch (priv)
	{
		case 8:
			op_list += "<option value=\"" + opValues["deleteOrderListSubmit"] + "\">" + commText["Delete"] + "</option>";

		case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

		case 6:     
			op_list += "<option value=\"" + opValues["modifyOrderListForm"] + "\">" + commText["Modify"] + "</option>";

		case 5:			/* Find Has not been implemented yet*/
			op_list += "<option value=\"" + opValues["viewOrdDetail"] + "\">" + otherText["orderDetails"] + "</option>";
			op_list += "<option value=\"" + opValues["viewSchedOrder"] + "\">" + otherText["scheduleOrder"] + "</option>";
			break;
	}

	op_list += "<option value=0 selected>--\t" + otherText["youraction"] + "\t--</option>";
	op_list += "</select>                                        ";
	
	return op_list ;
}


/*
function nextPage(totalPages, curPg, curPgName, curPgVarName)
{
	var nextPgHTML = "";
	nextPgHTML += "<tr> \n";
	nextPgHTML += "<td align=\"center\">\n ";

	if (curPg > 1)
	{
		//nextPgHTML +="<a href=\"javascript:document.glblFrm.pg.value="+(curPg-1)+";document.glblFrm.op.value=0;document.glblFrm.submit();\">Previous</a>\n";
//		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg-1) + "' );\">Previous</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg-1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listOrderList"] + "'); ", otherText["btn_prev_page"]);
	}

	nextPgHTML += "&nbsp; Current=" + curPg + "/" + totalPages + " &nbsp; ";
	if (totalPages > curPg)
	{
//		nextPgHTML += "<a href=\"javascript:gotoResultPage('" + curPgName + "', '" + curPgVarName + "', '" + (curPg+1) + "' );\">Next</a>\n";
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (curPg+1) + "&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listOrderList"] + "'); ", otherText["btn_next_page"]);
	}
  
	nextPgHTML += "</td>\n ";
	nextPgHTML += "</tr> \n";

	return nextPgHTML;
}
*/



function submitInsertOrderFrm(myformObj)
{
	var isValid = false;
	var isDateOK = false;

	isValid = submitmyform(myformObj);

	if (isValid == true)
	{
		var currDate = getCurrDate();

//		var d = new Date();
//		alert(d.getMonth());
//		var currDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();

		isDateOK = true;

		if (myformObj.frm_orddate.value < currDate)
		{
			myformObj.frm_orddate.value = currDate;
//	        alert(otherText["wrongOrdDate"]);
	        alert(alertWrongOrdDate);
			isDateOK = false;
		}
		if (myformObj.frm_deldate.value < myformObj.frm_orddate.value)
		{
			myformObj.frm_deldate.value = myformObj.frm_orddate.value;
//	        alert(otherText["wrongDelDate"]);
	        alert(alertWrongDelDate);
			isDateOK = false;
		}
		if (myformObj.frm_order_exp_date.value < myformObj.frm_deldate.value)
		{
			myformObj.frm_order_exp_date.value = myformObj.frm_deldate.value;
//	        alert(otherText["wrongExpDate"]);
	        alert(alertWrongExpDate);
			isDateOK = false;
		}
	}
	
	return (isValid && isDateOK);
}


function submitUpdateOrderFrm(myformObj)
{
	var isValid = false;
	var isDateOK = false;

	isValid = submitmyform(myformObj);

	if (isValid == true)
	{
		isDateOK = true;

		if (myformObj.frm_deldate.value < myformObj.frm_orddate.value)
		{
			myformObj.frm_deldate.value = myformObj.frm_orddate.value;
//	        alert(otherText["wrongDelDate"]);
	        alert(alertWrongDelDate);
			isDateOK = false;
		}
		if (myformObj.frm_order_exp_date.value < myformObj.frm_deldate.value)
		{
			myformObj.frm_order_exp_date.value = myformObj.frm_deldate.value;
//	        alert(otherText["wrongExpDate"]);
	        alert(alertWrongExpDate);
			isDateOK = false;
		}
	}
	
	return (isValid && isDateOK);
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
              -> curPgName string is the CGI file name user browsing
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
		nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) + "&is_search_on='+is_search_on+'&termCd='+termCd+'&frm_order_cust_no_search='+frm_order_cust_no_search+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&ordStatus='+ordStatus+'&op=" + opValues["listOrderList"] + "'); ", "&lt;&lt;");
		foobar = page_number - 1;
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
		nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&is_search_on='+is_search_on+'&termCd='+termCd+'&frm_order_cust_no_search='+frm_order_cust_no_search+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&ordStatus='+ordStatus+'&op=" + opValues["listOrderList"] + "'); ", "<b>&lt;<\/b>");
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&is_search_on='+is_search_on+'&termCd='+termCd+'&frm_order_cust_no_search='+frm_order_cust_no_search+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&ordStatus='+ordStatus+'&op=" + opValues["listOrderList"] + "'); ", foobar1 + "-" + foobar2);
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
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&is_search_on='+is_search_on+'&termCd='+termCd+'&frm_order_cust_no_search='+frm_order_cust_no_search+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&ordStatus='+ordStatus+'&op=" + opValues["listOrderList"] + "'); ", i);
	}
	nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
	for (var i=page_number+1; i<foobar2; i++) 
	{
		//alert("I am in for for foobar2 loop "+i);	
		nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&is_search_on='+is_search_on+'&termCd='+termCd+'&frm_order_cust_no_search='+frm_order_cust_no_search+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&ordStatus='+ordStatus+'&op=" + opValues["listOrderList"] + "'); ", i);
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
			
			if (foobar2 > foobar1) 
			{
				tempTxt += "-" + foobar2;
			}
			//$html_output .= "</a>&nbsp;";
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&is_search_on='+is_search_on+'&termCd='+termCd+'&frm_order_cust_no_search='+frm_order_cust_no_search+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&ordStatus='+ordStatus+'&op=" + opValues["listOrderList"] + "'); ", tempTxt);
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
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&is_search_on='+is_search_on+'&termCd='+termCd+'&frm_order_cust_no_search='+frm_order_cust_no_search+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&ordStatus='+ordStatus+'&op=" + opValues["listOrderList"] + "'); ", "&gt;");
		//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
		nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) + "&is_search_on='+is_search_on+'&termCd='+termCd+'&frm_order_cust_no_search='+frm_order_cust_no_search+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&ordStatus='+ordStatus+'&op=" + opValues["listOrderList"] + "'); ", "<b>&gt;&gt;<\/b>");
	} 
	else 
	{
		nextPgHTML += "&nbsp;&nbsp;<b>&gt;</b>&nbsp;&nbsp;<b>&gt;&gt;</b>";
	}


	nextPgHTML += "</td>\n ";
	nextPgHTML += "</tr> \n";

	return nextPgHTML;
}




function getCurrDate()
{
	var monNum;
	var monStr;
	var datNum;
	var datStr;

	var d = new Date();
	monNum = d.getMonth() + 1;
	datNum = d.getDate();

	if (monNum < 10)
	{
		monStr = "0" + monNum;
	}
	else
	{
		monStr = monNum;
	}

	if (datNum < 10)
	{
		datStr = "0" + datNum;
	}
	else
	{
		datStr = datNum;
	}

	var currDate = d.getFullYear() + "-" + monStr + "-" + datStr;

	return currDate;
}




function makeTextArea(type, title, value, name, id, list, size, maxlen, validator, msg, mandatory, indent, width)
{
	var fieldHTML ="";

	fieldHTML += makespace("\t", indent) + "<td class=\"infotextheading\" width=\"" + width + "\" valign=\"top\">\n";
	if (title == "&nbsp;")
	{
		fieldHTML += makespace("\t", indent+1) + title + "\n";
	}
	else
	{
		fieldHTML += makespace("\t", indent+1) + title + ":\n";
	}
	fieldHTML += makespace("\t", indent) + "</td>\n";

	fieldHTML += makespace("\t", indent) + "<td width=\"5\" align=\"center\" valign=\"top\" class=\"mandatory\">\n";
	fieldHTML += makespace("\t", indent+1) + mandatory + "\n";
	fieldHTML += makespace("\t", indent) + "</td>\n";

	fieldHTML += makespace("\t", indent) + "<td>\n";
	fieldHTML += makespace("\t", indent+1) + "<textarea name=\"" + name + "\" id=\"" + id + "\" cols=\"" + size + "\" rows=\"" + maxlen + "\" " + validator + " msg=\"" + msg + "\">" + value + "</textarea>\n";
	fieldHTML += makespace("\t", indent) + "</td>\n";

	return fieldHTML;
}





function update(myformObj, parentOption, childOption) 
{
	var new_options;
	var parent_select;

	clear(childOption);
//	parent_select = parentOption.options[parentOption.selectedIndex].value;
	parent_select = parentOption.value;
	for (i in transport_types )
	{
		if (transport_types[i][2] == parent_select)
		{
			new_option = new Option(transport_types[i][1], transport_types[i][0], false, false);
			childOption.options[childOption.length] = new_option;		
			childOption.selectedIndex = 0;
		}
	}
}


function clear(childOption) 
{
	while(childOption.length != 0) 
	{
		childOption.options[childOption.length-1] = null;
	}

	//history.go(0);
}



function local_HeadrHTML( newPage )
{
	newPage += "<SCRIPT LANGUAGE=\"JavaScript\">\n";

	newPage +="\n";
	newPage +="//Calendar Variable\n";

	newPage +="	var cal = new CalendarPopup();\n";
	newPage +="	cal.showYearNavigation();\n";

	newPage +="\n";  


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
	newPage += "function submitAction(myobject, accNum, ordNum, cmpyNum, suppNum, frmNum, ordStatus, ordStat)\n";
	newPage += "{\n";
	newPage += "	var myCurQstring=produceQString();\n";
	newPage += "	var myselectedvalue = myobject.options[myobject.selectedIndex].value;";

	newPage += "	if(myselectedvalue==\"" + opValues["deleteOrderListSubmit"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(ordStatus < orderStatusGate)\n";
	newPage += "		{\n";
	newPage += "			if(confirm('" + otherText["msg_del_confirm"] + "'))\n";
	newPage += "			{\n";
	newPage += "				eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "				eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["deleteOrderListSubmit"] + "+\"';\");\n";

	newPage += "				eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "				return true;\n";
	newPage += "			}\n";
	newPage += "		}\n";
	newPage += "		else\n";
	newPage += "		{\n";
	newPage += "			eval(\"alert(orderStatusStr[ordStatus]);\");\n";
	newPage += "		}\n";
	newPage += "		eval(\"document.select_action_\"+frmNum+\".reset();\");\n";
  	newPage += "	}\n";
/*
	newPage += "	else if(myselectedvalue==\"" + opValues["modifyOrderListForm"] + "\")\n";
	newPage += "	{\n";
	newPage += "		if(ordStatus < orderStatusGate)\n";
	newPage += "		{\n";
	newPage += "				eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
	newPage += "				eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["modifyOrderListForm"] + "+\"';\");\n";

	newPage += "				eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "				return true;\n";
	newPage += "		}\n";
	newPage += "		else\n";
	newPage += "		{\n";
	newPage += "			eval(\"alert(orderStatusStr[ordStatus]);\");\n";
	newPage += "		}\n";
  	newPage += "	}\n";
*/

	newPage += "	else if(myselectedvalue==\"" + opValues["viewOrdDetail"] + "\")\n";
	newPage += "	{\n";

	newPage += "		document.location.href=\"order_det.cgi?termCd="+termCd+"&orderNo=\"+ordNum+\"&op="+opValues["listOrdDetail"]+"&rootOp="+opValues["listOrderList"]+"&pg=1&ordStatus=\"+ordStat+\"&cmpyCd=\"+cmpyNum+\"&suppCd=\"+suppNum+\"&custAcc=\"+accNum+\"\";\n";

	newPage += "	}\n";

	newPage += "	else if(myselectedvalue==\"" + opValues["viewSchedOrder"] + "\")\n";
	newPage += "	{\n";

	newPage += "		document.location.href=\"order_schd.cgi?termCd="+termCd+"&orderNo=\"+ordNum+\"&op="+opValues["listSchedOrder"]+"&rootOp="+opValues["listOrderList"]+"&pg=1&ordStatus=\"+ordStat+\"&cmpyCd=\"+cmpyNum+\"&suppCd=\"+suppNum+\"&custAcc=\"+accNum+\"\";\n";

	newPage += "	}\n";

	newPage += "	else\n";
	newPage += "	{\n";
	newPage += "		eval(\"document.select_action_\"+frmNum+\".submit();\");\n";
	newPage += "		return true;\n";
	newPage += "	}\n";
	newPage += "}\n";
/*
	newPage +="//set tanker \n";
	newPage +="function setDelvMthdListTank(element)\n";
	newPage +="{\n";
	newPage +=" \n";
	newPage +="   var supplier = document.getElementById('supp');\n";
	newPage +="   var suppValue = supplier.options[supplier.selectedIndex].value;\n";
	newPage +="   var tmp=\"loadscheds_tank.cgi?supplier=\" + suppValue;\n";
	newPage +="   var value = element.options[element.selectedIndex].value;\n";
	newPage +="   tmp += \"&carrier=\" + value\n";
	newPage +="   document.getElementById('itank').src = tmp;\n";
	newPage +="}\n";
	newPage +="\n";
*/ 
	newPage += "</script>\n";
	newPage += "\n";
	newPage += "</head>\n";
	newPage += "\n";
	newPage += "<body>\n";
	newPage += "\n";

	return (newPage);
}

