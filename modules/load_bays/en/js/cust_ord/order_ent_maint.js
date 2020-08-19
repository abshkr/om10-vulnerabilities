/****************************************************************
 * $Id: order_ent_maint.js,v 1.43 2011/04/13 04:43:05 abs Exp $
 ***************************************************************/

/* Text messages for checkLastOrder() */
var t__Order_No = ["Order No","订单号"];
var t__Trip_No = ["Trip No","行程号"];
var t__has_been_allocated = ["has been allocated", "已经被使用"];
var t__Another_new_Order_No = ["Another new Order No", "新的订单号"];
var t__is_choosen = ["is choosen", "可以使用"];

if ( 'cn' == js_lang)
{

	var opValues = new Array();

	// operations to order entry and maintenance
	opValues["baseOrder"] = 600;
	opValues["listOrder"] = 601;
	opValues["searchOrderForm"] = 604;
	opValues["searchOrderSubmit"] = 614;
	opValues["viewOrder"] = 605;				// relevant to opValues["viewOrdDetail"]
	opValues["modifyOrderForm"] = 606;
	opValues["modifyOrderSubmit"] = 616;
	opValues["insertOrderForm"] = 607;
	opValues["insertOrderSubmit"] = 617;
	opValues["deleteOrderForm"] = 608;
	opValues["deleteOrderSubmit"] = 618;

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
			"订单号", "订单参考号", "配送地点", "截止日期", "配送日期", "配送方式", "订单状态", "已批准?", "操作员", "订单来源"
	];
		
	var otherText = new Array();
	otherText["youraction"] =  "请选择";
    otherText["orderDetails"] =  "订单油品管理";
    otherText["scheduleOrder"] =  "订单油品调度管理";

	otherText["defaultOperator"] =  "ERP自动";

	otherText["btn_addNew_order"] =  "新增订单";
	otherText["btn_search_order"] =  "查找订单";
	otherText["btn_bakto_customers"] =  "返回客户管理 ";

	otherText["btn_bakto_orderPg"] =  "返回订单输入和维护";

	otherText["btn_next_page"] =  "下一页";
	otherText["btn_prev_page"] =  "上一页";
	otherText["btn_search_go"] =  "开始查找 ...";

	otherText["tab_supp_cust_depot"] =  "供应商、客户和油站信息";
	otherText["tab_supp_cust"] =  "供应商和客户信息";

	otherText["pgTitle_order"] =  "客户订单管理, 订单输入和维护";
	otherText["pgTitle_orderUpd"] =  "客户订单管理, 订单输入和维护, 修改";
	otherText["pgTitle_orderAdd"] =  "客户订单管理, 订单输入和维护, 新增";
	otherText["pgTitle_orderDel"] =  "客户订单管理, 订单输入和维护, 删除";

	otherText["pgHead_order"] =  "订单输入和维护";
	otherText["pgHead_orderUpd"] =  "修改订单";
	otherText["pgHead_orderAdd"] =  "新增订单";
	otherText["pgHead_orderDel"] =  "删除订单";

	otherText["msg_del_confirm"] =  "您是否确定要删除本记录?";

	otherText["msg_upd_warning"] =  "该记录不允许修改, 请按任意键继续...";


    otherText["msg_updOrder_fSet"] =  "订单输入和维护";
    otherText["msg_updOrder_frmComplt"] = "所有标有(<span style=\"COLOR: #FF0000;\">*</span>)的表项必须填写";
    otherText["msg_addOrder_fSet"] =  "订单输入和维护";
    otherText["msg_addOrder_frmComplt"] = "所有标有(<span style=\"COLOR: #FF0000;\">*</span>)的表项必须填写";

	otherText["msg_selAaddr"] =  "请选择地址";

	otherText["msg_enterOrderNo"] = "请输入开放订单号 ";
	otherText["msg_enterOrderRef"] = "请输入订单参考号!";
	otherText["msg_enterOrderDate"] = "请输入订单下单日期!";
 	otherText["msg_enterOrderDelDate"] = "请输入订单配送日期!";

	otherText["msg_selOrderMthd"] = "请选择油品承运方式!";
	otherText["msg_selOrderDelvMthd"] = "请选择配送方式!";
	otherText["msg_selOrderSaleType"] = "请选择客户销售类型!";
	otherText["msg_selOrderDelvLoc"] = "请选择配送地点!";

	otherText["msg_selOrderDrawer"] = "请选择油品调配公司!";
 	otherText["msg_enterOrderExpDate"] = "请输入订单截止日期!";
	otherText["msg_selOrderTerminal"] = "请选择下单油库!";
	otherText["msg_selOrderSupplyPoint"] = "请选择提油油库!";


 	otherText["msg_enterOrderLimit"] = "请输入本订单的信用额度 ";
	otherText["msg_selOrderCarrier"] = "请选择订单的承运方!";
	otherText["msg_selOrderTransferType"] = "请选择油品转移原因!";
	otherText["msg_enterOrderTransferType"] = "请输入油品转移原因!";
 	otherText["msg_enterOrderInstruction"] = "请输入订单说明!";


	otherText["selectDate"] = "选择日期";
 	otherText["selectDateShort"] = "日期";

 	otherText["wrongOrdDate"] = "提交失败!\n 请确认订单下单日期大于或等于当前日期!\n 默认值被采用!"
 	otherText["wrongDelDate"] = "提交失败!\n 请确认订单配送日期大于或等于订单下单日期!\n 默认值被采用!"
 	otherText["wrongExpDate"] = "提交失败!\n 请确认订单截止日期大于或等于订单配送日期!\n 默认值被采用!"

	var alertWrongOrdDate = otherText["wrongOrdDate"];
	var alertWrongDelDate = otherText["wrongDelDate"];
	var alertWrongExpDate = otherText["wrongExpDate"];


	otherText["supp"] =  "供应商";
    otherText["cust"] =  "客户";
    otherText["term"] =  "油库";


	var orderTitle = new Array();
	orderTitle["code"] = "配送地点代码";
	orderTitle["name"] = "配送地点名称";
	orderTitle["addr"] = "配送地点地址";
	orderTitle["grid"] = "配送地点定位(地图索引)";

	orderTitle["transpt"] =  "配送运输类型";
	orderTitle["largst"] =  "配送地点最大运输设备";
	orderTitle["doc"] =  "配送地点文件类型";
	orderTitle["unit"] =  "配送地点计量类型";
	orderTitle["tarif"] =  "配送地点海关税率";
	orderTitle["trip_time"] =  "订单配送所需时间";
	orderTitle["trip_dist"] =  "订单配送所需路程";
	orderTitle["contact"] =  "联系人名";
	orderTitle["phone"] =  "电话号码";
	orderTitle["prof"] =  "预设的运输设备";


	orderTitle["order_cust_no"] = "开放订单号";
	orderTitle["order_no"] = "订单号";

	orderTitle["order_ref_code"] = "订单参考号";
	orderTitle["orddate"] = "下单日期";
	orderTitle["deldate"] = "配送日期";
	orderTitle["order_ord_mthd"] = "货运方式";  
	orderTitle["order_delv_mthd"] = "配送方式";

	orderTitle["order_sale_type"] = "客户销售类型";
	orderTitle["order_dlv_code"] = "配送地点";
	orderTitle["order_drawer"] = "油品调配公司";
	orderTitle["order_exp_date"] = "订单截止日期";
	orderTitle["order_terminal"] = "下单油库";
	
	orderTitle["ord_supply_point"] = "发油油库";
	orderTitle["order_approved"] = "订单批准";
	orderTitle["order_invoiced"] = "发票生成";  //?
	orderTitle["order_limit"] = "此订单信用额 (" + moneyCurrency + ")";
	orderTitle["order_total"] = "金额总计 (" + moneyCurrency + ")";

	orderTitle["order_carrier"] = "承运方";
	orderTitle["transfer_type"] = "油品转移原因";
	orderTitle["order_instruction"] = "订单说明";
	orderTitle["order_source"] = "订单来源";

	//search form
	orderTitle["order_number_from"] = "自";
	orderTitle["order_number_to"]   = "至";
	orderTitle["order_date_from"]   = "自";
	orderTitle["order_date_to"]     = "至";
	orderTitle["deliv_date_from"]   = "自";
	orderTitle["deliv_date_to"]     = "至";
	orderTitle["deliv_mthd_str"]    = "配送方式";
	orderTitle["order_stat_str"]    = "订单状态";

	var orderStatusStr = new Array();
	orderStatusStr["0"] = "该记录不允许修改!\n[ 订单状态: 新的 ]";
	orderStatusStr["1"] = "该记录不允许修改!\n[ 订单状态: 部分调度 ]";
	orderStatusStr["2"] = "该记录不允许修改!\n[ 订单状态: 完全调度 ] ";
	orderStatusStr["3"] = "该记录不允许修改!\n[ 订单状态: 发油完毕 ]";
	orderStatusStr["4"] = "该记录不允许修改!\n[ 订单状态: 未付油款 ]";
	orderStatusStr["5"] = "该记录不允许修改!\n[ 订单状态: 配送完毕 ]";
	orderStatusStr["6"] = "该记录不允许修改!\n[ 订单状态: 已过期 ]";
	orderStatusStr["7"] = "该记录不允许修改!\n[ 订单状态: 部分发油 ]";
	orderStatusStr["8"] = "该记录不允许修改!\n[ 订单状态: 部分配送 ]";

	orderStatusStr["100"] = "该记录不允许修改!\n[ 订单状态: 新的+已批准 ]";
	orderStatusStr["101"] = "该记录不允许修改!\n[ 订单状态: 部分调度+已批准 ]";
	orderStatusStr["102"] = "该记录不允许修改!\n[ 订单状态: 完全调度+已批准 ] ";
	orderStatusStr["103"] = "该记录不允许修改!\n[ 订单状态: 发油完毕+已批准 ]";
	orderStatusStr["104"] = "该记录不允许修改!\n[ 订单状态: 未付油款+已批准 ]";
	orderStatusStr["105"] = "该记录不允许修改!\n[ 订单状态: 配送完毕+已批准 ]";
	orderStatusStr["106"] = "该记录不允许修改!\n[ 订单状态: 已过期+已批准 ]";
	orderStatusStr["107"] = "该记录不允许修改!\n[ 订单状态: 部分发油+已批准 ]";
	orderStatusStr["108"] = "该记录不允许修改!\n[ 订单状态: 部分配送+已批准 ]";

	orderStatusStr["1000"] = "该记录不允许修改!\n[ 订单状态: 新的+已开发票 ]";
	orderStatusStr["1001"] = "该记录不允许修改!\n[ 订单状态: 部分调度+已开发票 ]";
	orderStatusStr["1002"] = "该记录不允许修改!\n[ 订单状态: 完全调度+已开发票 ] ";
	orderStatusStr["1003"] = "该记录不允许修改!\n[ 订单状态: 发油完毕+已开发票 ]";
	orderStatusStr["1004"] = "该记录不允许修改!\n[ 订单状态: 未付油款+已开发票 ]";
	orderStatusStr["1005"] = "该记录不允许修改!\n[ 订单状态: 配送完毕+已开发票 ]";
	orderStatusStr["1006"] = "该记录不允许修改!\n[ 订单状态: 已过期+已开发票 ]";
	orderStatusStr["1007"] = "该记录不允许修改!\n[ 订单状态: 部分发油+已开发票 ]";
	orderStatusStr["1008"] = "该记录不允许修改!\n[ 订单状态: 部分配送+已开发票 ]";

	orderStatusStr["1100"] = "该记录不允许修改!\n[ 订单状态: 新的+已批准+已开发票 ]";
	orderStatusStr["1101"] = "该记录不允许修改!\n[ 订单状态: 部分调度+已批准+已开发票 ]";
	orderStatusStr["1102"] = "该记录不允许修改!\n[ 订单状态: 完全调度+已批准+已开发票 ] ";
	orderStatusStr["1103"] = "该记录不允许修改!\n[ 订单状态: 发油完毕+已批准+已开发票 ]";
	orderStatusStr["1104"] = "该记录不允许修改!\n[ 订单状态: 未付油款+已批准+已开发票 ]";
	orderStatusStr["1105"] = "该记录不允许修改!\n[ 订单状态: 配送完毕+已批准+已开发票 ]";
	orderStatusStr["1106"] = "该记录不允许修改!\n[ 订单状态: 已过期+已批准+已开发票 ]";
	orderStatusStr["1107"] = "该记录不允许修改!\n[ 订单状态: 部分发油+已批准+已开发票 ]";
	orderStatusStr["1108"] = "该记录不允许修改!\n[ 订单状态: 部分配送+已批准+已开发票 ]";

	var orderStatusGate = 1;   // Partly Schedulled
		
	var dateFormat = "yyyy-MM-dd";
//	var dateFormat = "dd-NNN-yyyy";
	var items_per_page = 10;

	var before_date = "2005-01-01";

		
	var l_opInf= new Array()
	for (var i=0; i<200; i++) l_opInf[i] = g_opInf[i];
	l_opInf[628]= "成功删除了一个订单!";
	l_opInf[627]= "成功新增了一个订单!";
	l_opInf[626]= "成功修改了一个订单!";

	l_opInf[638]= "删除订单失败! 请先删除本订单的附属信息如油品,定价,有效期等等!";
	l_opInf[637]= "新增订单失败!";
	l_opInf[636]= "修改订单失败!";

	l_opInf[648]= "删除失败! 请先删除本订单的附属信息如油品,定价,有效期等等!";
	l_opInf[647]= "";
	l_opInf[646]= "";

	l_opInf[658]= "";
	l_opInf[657]= "该订单已经存在";
	l_opInf[656]= "该订单已经存在";



	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 601,604,605,606,607];
	var ops_req_search = [-1, 601];// search never required on this page

}
else
{
	var opValues = new Array();

	// operations to order entry and maintenance
	opValues["baseOrder"] = 600;
	opValues["listOrder"] = 601;
	opValues["searchOrderForm"] = 604;
	opValues["searchOrderSubmit"] = 614;
	opValues["viewOrder"] = 605;				// relevant to opValues["viewOrdDetail"]
	opValues["modifyOrderForm"] = 606;
	opValues["modifyOrderSubmit"] = 616;
	opValues["insertOrderForm"] = 607;
	opValues["insertOrderSubmit"] = 617;
	opValues["deleteOrderForm"] = 608;
	opValues["deleteOrderSubmit"] = 618;

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
		"Order Number", "Order Reference Code", "Delivery Location", "Expiry Date", "Delivery Date", "Delivery Method", "Status", "Approved?", "Operator", "Order Source"
		];

	var otherText = new Array();
	otherText["youraction"] =  "YOUR ACTION";
	otherText["orderDetails"] =  "ORDER DETAILS";
	otherText["scheduleOrder"] =  "SCHEDULE ORDER";

	otherText["defaultOperator"] =  "ERP Auto";

	otherText["btn_addNew_order"] =  "Add New Order";
	otherText["btn_search_order"] =  "Search An Order";
	otherText["btn_bakto_customers"] =  "Back to Customer";

	otherText["btn_bakto_orderPg"] =  "Back to Order Entry Maintenance Page";

	otherText["btn_next_page"] =  "Next";
	otherText["btn_prev_page"] =  "Previous";
	otherText["btn_search_go"] =  "Start the Search ...";

	otherText["tab_supp_cust_depot"] =  "Supplier, Customer and Depot Details";
	otherText["tab_supp_cust"] =  "Supplier and Customer Details";

	otherText["pgTitle_order"] =  "Customer Order Processing, Order Entry and Maintenance Page";
	otherText["pgTitle_orderUpd"] =  "Customer Order Processing, Order Entry and Maintenance, Modify";
	otherText["pgTitle_orderAdd"] =  "Customer Order Processing, Order Entry and Maintenance, Add";
	otherText["pgTitle_orderDel"] =  "Customer Order Processing, Order Entry and Maintenance, Delete";

	otherText["pgHead_order"] =  "Order Entry And Maintenance";
	otherText["pgHead_orderUpd"] =  "Modify Order Entry And Maintenance";
	otherText["pgHead_orderAdd"] =  "Add Order Entry And Maintenance";
	otherText["pgHead_orderDel"] =  "Delete Order Entry And Maintenance";

	otherText["msg_del_confirm"] =  "Are you sure you want to delete?";
	otherText["msg_upd_warning"] =  "No updates allowed here. Press any key to continue...";


	otherText["msg_updOrder_fSet"] =  "Order Entry and Maintenance";
	otherText["msg_updOrder_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";
	otherText["msg_addOrder_fSet"] =  "Order Entry and Maintenance";
	otherText["msg_addOrder_frmComplt"] = "All the fields labelled with an (<span style=\"COLOR: #FF0000;\">*</span>) are mandatory";

	otherText["msg_selAaddr"] =  "Please select an address";


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
	otherText["msg_selOrderTerminal"] = "Please select!";
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


	otherText["supp"] =  "Supplier";
	otherText["cust"] =  "Customer";
	otherText["term"] =  "Depot";


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
	orderTitle["orddate"] = "Order Date";
	orderTitle["deldate"] = "Delivery Date";
	orderTitle["order_ord_mthd"] = "Order Method";  //?
	orderTitle["order_delv_mthd"] = "Delivery Method";

	orderTitle["order_sale_type"] = "Sale Type";
	orderTitle["order_dlv_code"] = "Delivery Location";
	orderTitle["order_drawer"] = "Drawer";
	orderTitle["order_exp_date"] = "Expiry Date";
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
	orderTitle["order_number_from"] = "From";
	orderTitle["order_number_to"]   = "To";
	orderTitle["order_date_from"]   = "From";
	orderTitle["order_date_to"]     = "To";
	orderTitle["deliv_date_from"]   = "From";
	orderTitle["deliv_date_to"]     = "To";
	orderTitle["deliv_mthd_str"]    = "Delivery Method";
	orderTitle["order_stat_str"]    = "Status";

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
	l_opInf[628]= "Successfully Deleted!";
	l_opInf[627]= "Successfully Inserted a New Record!";
	l_opInf[626]= "Successfully Updated!";

	l_opInf[638]= "Delete Failed! Please Delete This Order's Children First!";
	l_opInf[637]= "Insert Failed!";
	l_opInf[636]= "Update Failed!";

	l_opInf[648]= "Cannot Delete! Please Delete This Order's Children First!";
	l_opInf[647]= "";
	l_opInf[646]= "";

	l_opInf[658]= "";
	l_opInf[657]= "Order exists already ";
	l_opInf[656]= "Order exists already";


	/********************
	 * 2 rrays
	 * decide if need to display the
	 * print and search buttons or not
	 */                    		
	var ops_req_print = [-1, 601,604,605,606,607];
	var ops_req_search = [-1, 601];// search never required on this page
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
		if (priv >= 5 && curViewDetailState == opValues["listOrder"]) 
		{
			newPage += displayOrderList (curPrivilage, curColumnToSort);
		}
		if (priv >= 5 && curViewDetailState == opValues["viewOrder"]) 
		{
			//		newPage += displayOrderDetails (curPrivilage, curColumnToSort);
			newPage += displayOrderList (curPrivilage, curColumnToSort);
		}


		/* Display Form for Modify Order Details */
		if (priv >= 6 && curViewDetailState == opValues["modifyOrderForm"])	
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
		if (priv >= 6 && curViewDetailState == opValues["modifyOrderSubmit"])	
		{
			newPage += displayOrderList(curPrivilage, curColumnToSort);
		}

		/* Display Form for Insert Order Details */
		if (priv >= 7 && curViewDetailState == opValues["insertOrderForm"])	
		{
			newPage += displayInsertOrderForm();
		}
		/* Submit the Insertion of Order Details */
		if (priv >= 7 && curViewDetailState == opValues["insertOrderSubmit"])	
		{
			newPage += displayOrderList(curPrivilage, curColumnToSort);
		}

		/* Display Form for Delete a recorde of Order */
		//	if (priv >= 8 && curViewDetailState == opValues["deleteOrderForm"])	
		//	{
		//		newPage += displayDeleteOrderForm();
		//	}
		/* Submit the Deletion of Order Details */
		if (priv >= 8 && curViewDetailState == opValues["deleteOrderSubmit"])	
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

		for(aId in cmpy_jslst)
		{
			if (cmpy_jslst[aId][0] == suppCd)
			{
				supp_name = cmpy_jslst[aId][1];
			}
			if (cmpy_jslst[aId][0] == cmpyCd)
			{
				cust_name = cmpy_jslst[aId][1];
			}
		}

		dispFrm += makespace("\t", indent) + "<tr>\n";
		dispFrm += makespace("\t", indent) + "<td>\n";
		dispFrm += makespace("\t", indent+1) + "<form name=\"list_order\" method=\"post\" id=\"list_order\" action=\"order_ent_maint.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

		dispFrm += " <ul id=\"tabmenu\">\n";
		dispFrm += "<li>" + otherText["tab_supp_cust_depot"] + "</li>\n";
		dispFrm += "</ul>\n";

		dispFrm += "<div class=\"adminform\">\n";

		dispFrm += makespace("\t", indent+2) + "<table width=\"100%\">\n";
		dispFrm += makespace("\t", indent+2) + "<tr>\n";
		dispFrm += makespace("\t", indent+2) + "<td class=\"infotext\">\n";

		// hidden area for passing values between web pages
		dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["listOrder"] + "\">\n";
		dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
		dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
		dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
		dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
		dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

		dispFrm += makespace("\t", indent+2) + "</td>\n";
		dispFrm += makespace("\t", indent+2) + "</tr>\n";

		dispFrm += makespace("\t", indent+2) + "<tr> \n";
		//	dispFrm += makefield(0, otherText["supp"], order_jstab [ordIndex][8], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 80);
		dispFrm += makefield(0, otherText["supp"], supp_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 80);
		dispFrm += makespace("\t", indent+2) + "</tr> \n";

		dispFrm += makespace("\t", indent+2) + "<tr> \n";
		//	dispFrm += makefield(0, otherText["cust"], order_jstab [ordIndex][10], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 80);
		dispFrm += makefield(0, otherText["cust"], cust_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 80);
		dispFrm += makespace("\t", indent+2) + "</tr> \n";

		dispFrm += makespace("\t", indent+2) + "<tr> \n";
		//	dispFrm += makefield(0, otherText["term"], order_jstab [ordIndex][12], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 80);
		dispFrm += makefield(2, otherText["term"], termCd, "termCd", "termCd", terminal, 0, 0, 	"onchange=javascript:submit();", otherText["msg_selOrderTerminal"], "&nbsp;", indent+2,80);

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

		for(aId in cmpy_jslst)
		{
			if (cmpy_jslst[aId][0] == suppCd)
			{
				supp_name = cmpy_jslst[aId][1];
			}
			if (cmpy_jslst[aId][0] == cmpyCd)
			{
				cust_name = cmpy_jslst[aId][1];
			}
		}

		if ( frm_order_cust_no_from == "-1" )
		{
			frm_order_cust_no_from = "";
		}
		if ( frm_order_cust_no_to == "-1" )
		{
			frm_order_cust_no_to = "";
		}

		if ( ordRefCd == "-1" )
		{
			ordRefCd = "";
		}

		if (frm_order_source_search=="" || frm_order_source_search=="-1")
		{
			frm_order_source_search = "";
		}

		dispFrm += makespace("\t", indent) + "<tr> \n";
		dispFrm += makespace("\t", indent) + "<td  width=\"100%\">\n";

		dispFrm += " <ul id=\"tabmenu\">\n";
		dispFrm += "<li>" + otherText["tab_supp_cust"] + "</li>\n";
		dispFrm += "</ul>\n";

		dispFrm += "<div class=\"adminform\">\n";
		dispFrm += makespace("\t", indent+1) + "<table width=\"100%\" border=\"0\">\n";
		dispFrm += makespace("\t", indent+1) + "<tr> \n";
		//	dispFrm += makefield(0, otherText["supp"], order_jstab [ordIndex][8], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 80);
		//	dispFrm += makefield(0, otherText["cust"], order_jstab [ordIndex][10], "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 80);
		dispFrm += makefield(0, otherText["supp"], supp_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 40);
		dispFrm += makefield(0, otherText["cust"], cust_name, "", "", "", 0, 0, "", "", "&nbsp;", indent+2, 40);
		dispFrm += makespace("\t", indent+1) + "</tr> \n";
		dispFrm += makespace("\t", indent+1) + "</table>\n";
		dispFrm += makespace("\t", indent+1) + "</div>\n";

		dispFrm += makespace("\t", indent) + "</td>\n";
		dispFrm += makespace("\t", indent) + "</tr> \n";

		dispFrm += makespace("\t", indent) + "<tr>\n";
		dispFrm += makespace("\t", indent) + "<td>\n";
		dispFrm += makespace("\t", indent+1) + "<form name=\"list_order\" method=\"post\" id=\"list_order\" action=\"order_ent_maint.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

		dispFrm += " <ul id=\"tabmenu\">\n";
		dispFrm += "<li>" + otherText["btn_search_order"] + "</li>\n";
		dispFrm += "</ul>\n";

		dispFrm += "<div class=\"adminform\">\n";
		dispFrm += makespace("\t", indent+1) + "<table width=\"100%\" border=\"0\">\n";

		dispFrm += makespace("\t", indent+2) + "<tr>\n";
		dispFrm += makespace("\t", indent+2) + "<td colspan=\"3\" align=\"left\" class=\"infotext\" width=\"30%\">\n";
		dispFrm += orderTitle["order_no"];
		dispFrm += makespace("\t", indent+3) + "</td>\n";
		dispFrm += makespace("\t", indent+2) + "<td colspan=\"3\" align=\"left\" class=\"infotext\" width=\"30%\">\n";
		dispFrm += orderTitle["orddate"];
		dispFrm += makespace("\t", indent+3) + "</td>\n";
		dispFrm += makespace("\t", indent+2) + "<td colspan=\"3\" align=\"left\" class=\"infotext\" width=\"30%\">\n";
		dispFrm += orderTitle["deldate"];
		dispFrm += makespace("\t", indent+3) + "</td>\n";
		dispFrm += makespace("\t", indent+2) + "<td colspan=\"1\" align=\"left\" class=\"infotext\" width=\"10%\">\n";
		dispFrm += makespace("\t", indent+3) + "</td>\n";
		dispFrm += makespace("\t", indent+2) + "</tr> \n";

		dispFrm += makespace("\t", indent+2) + "<tr>\n";

		dispFrm += makefield(1, orderTitle["order_number_from"], frm_order_cust_no_from, "frm_order_cust_no_from", 	"frm_order_cust_no_from", "", 10, 9, "onchange=\"submit();\" ", "", "&nbsp;", indent+4, 30);

		dateStr = dateURL_HTML("document.forms[0].frm_orddate_from", "date_anchor1", dateFormat, otherText["selectDateShort"]);
		dispFrm += makefield(4, orderTitle["order_date_from"], frm_orddate_from, "frm_orddate_from", "frm_orddate_from", dateStr, 10, 10, "onchange=\"submit();\" ", "", "&nbsp", indent+4, 30);

		dateStr = dateURL_HTML("document.forms[0].frm_deldate_from", "date_anchor3", dateFormat, otherText["selectDateShort"]);
		dispFrm += makefield(4, orderTitle["deliv_date_from"], frm_deldate_from, "frm_deldate_from", "frm_deldate_from", dateStr, 10, 10, "onchange=\"submit();\" ", "", "&nbsp", indent+4, 30);

		dispFrm += makespace("\t", indent+2) + "<td colspan=\"1\" align=\"left\" class=\"infotext\" width=\"100%\">\n";
		dispFrm += makespace("\t", indent+3) + "</td>\n";
		dispFrm += makespace("\t", indent+2) + "</tr> \n";

		dispFrm += makespace("\t", indent+2) + "<tr> \n";
		dispFrm += makefield(1, orderTitle["order_number_to"], frm_order_cust_no_to, "frm_order_cust_no_to", 	"frm_order_cust_no_to", "", 10, 9, "onchange=\"submit();\" ", "", "&nbsp;", indent+4, 30);

		dateStr = dateURL_HTML("document.forms[0].frm_orddate_to", "date_anchor2", dateFormat, otherText["selectDateShort"]);
		dispFrm += makefield(4, orderTitle["order_date_to"], frm_orddate_to, "frm_orddate_to", "frm_orddate_to", dateStr, 10, 10, "onchange=\"submit();\" ", "", "&nbsp", indent+4, 30);

		dateStr = dateURL_HTML("document.forms[0].frm_deldate_to", "date_anchor4", dateFormat, otherText["selectDateShort"]);
		dispFrm += makefield(4, orderTitle["deliv_date_to"], frm_deldate_to, "frm_deldate_to", "frm_deldate_to", dateStr, 10, 10, "onchange=\"submit();\" ", "", "&nbsp", indent+4, 30);

		dispFrm += makespace("\t", indent+2) + "<td colspan=\"1\" align=\"left\" class=\"infotext\" width=\"100%\">\n";
		dispFrm += makespace("\t", indent+3) + "</td>\n";
		dispFrm += makespace("\t", indent+2) + "</tr> \n";

		dispFrm += makespace("\t", indent+1) + "<tr>\n";
		dispFrm += makespace("\t", indent+1) + "<td colspan=\"9\" class=\"infotext\">\n";

		// hidden area for passing values between web pages
		dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["listOrder"] + "\">\n";
		dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
		dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
		dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
		dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
		dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";
		dispFrm += makespace("\t", indent+3) + "<input type=\"hidden\" name=\"is_search_on\" id=\"is_search_on\" value=\"" + is_search_on + "\">\n";

		dispFrm += makespace("\t", indent+2) + "</td>\n";
		dispFrm += makespace("\t", indent+2) + "</tr>\n";


		dispFrm += makespace("\t", indent+2) + "<tr> \n";
		dispFrm += makefield(2, otherText["term"], termCd, "termCd", "termCd", terminal, 30, 0, 		"onchange=javascript:submit();", otherText["msg_selOrderTerminal"], "&nbsp;", indent+2, 30);

		dispFrm += makefield(2, orderTitle["order_stat_str"], frm_order_status_search, "frm_order_status_search", "frm_order_status_search", order_status_jslst, 0, 0, "onchange=\"submit();\" ", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "&nbsp;", indent+4, 30);

		dispFrm += makefield(2, orderTitle["deliv_mthd_str"], frm_order_delv_mthd_search, "frm_order_delv_mthd_search", "frm_order_delv_mthd_search", transport_types, 12, 0, "onchange=\"submit();\" ", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "&nbsp;", indent+4, 30);

		dispFrm += makespace("\t", indent+3) + "<td align=\"center\" class=\"infotext\" width=\"100\">\n";
		//dispFrm += "<input type=\"submit\" value=\""+commText["Search"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
		dispFrm += makespace("\t", indent+3) + "</td>\n";

		dispFrm += makespace("\t", indent+2) + "</tr> \n";


//Abdul i think this is the spot where search for erp order should come
//function makefield(type, title, value, name, id, list, size, maxlen, validator, msg, mandatory, indent, width)
//{

		dispFrm += makespace("\t", indent+2) + "<tr> \n";
		dispFrm += makefield(1, orderTitle["order_ref_code"], ordRefCd, "ordRefCd", "ordRefCd", "", 20, 16, 		"", "", "&nbsp;", indent+2, 30);

		// need add ERP TYPE drop list here
		dispFrm += makefield(2, orderTitle["order_source"], frm_order_source_search, "frm_order_source_search", "frm_order_source_search", erp_type_jslst, 0, 0, "onchange=\"submit();\" ", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "&nbsp;", indent+4, 30);

		dispFrm += makespace("\t", indent+3) + "<td>\n";
	
		dispFrm += makespace("\t", indent+3) + "</td>\n";



		dispFrm += makespace("\t", indent+3) + "<td align=\"center\" class=\"infotext\" width=\"100\">\n";
		dispFrm += "<input type=\"submit\" value=\""+commText["Search"]+"\" class=\"just_button\" onmouseover=\"this.className='just_buttonHover'\" onmouseout=\"this.className='just_button'\">\n";
		dispFrm += makespace("\t", indent+3) + "</td>\n";

		dispFrm += makespace("\t", indent+2) + "</tr> \n";



		dispFrm += makespace("\t", indent+2) + "</table>\n";
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

		pos_aprv_status = 15;
		pos_oper = pos_aprv_status + 1;
		pos_erptype = pos_aprv_status + 2;

		//dispFrm += makespace("\t", indent) + displayGlblFrm();
		dispFrm += makespace("\t", indent) + btnGroupOrder_HTML();
//		dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "order_ent_maint.cgi", "pg_3");


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
				var howmanyDone = 1; //0;
				for(var j=0; j<column_headers.length; j++)
				{
					if (curColumnToSort == howmanyDone)
					{
						dispFrm += makespace("\t", indent+2) + "<td style=\"background-color:#EEEEEE\">" + obs(order_jstab[i][howmanyDone]) + "<\/td>";
					} 
					else 
					{
						dispFrm += makespace("\t", indent+2) + "<td>\n";				  
						if(howmanyDone==1) // means time to display the drop list and table
						{
							dispFrm += makespace("\t", indent+3) + "<form name=\"select_action_" + i + "\" id=\"select_action_" + i + "\" >\n";
							dispFrm += makespace("\t", indent+4) + "<table border=\"0\">\n";
							dispFrm += makespace("\t", indent+4) + "<tr>\n";
							dispFrm += makespace("\t", indent+4) + "<td width=\"50%\"> <span style=\"COLOR: #FF0000;\">" + obs(order_jstab[i][howmanyDone]) + "</span>\n";

							dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"orderCustNo\" id=\"orderCustNo\" value=\"" + order_jstab[i][howmanyDone] + "\">\n";
							dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + order_jstab[i][howmanyDone-1] + "\">\n";
							dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
							dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
							dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
							dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"termCd\" id=\"termCd\" value=\"" + termCd + "\">\n";
							dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
							dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";
							dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" name=\"is_search_on\" id=\"is_search_on\" value=\"" + is_search_on + "\">\n";
							dispFrm += makespace("\t", indent+5) + "<input type=\"hidden\" 	name=\"order_status\" id=\"order_status\" value=\"" + order_jstab[i][14] + "\">\n";

							dispFrm += makespace("\t", indent+5) + preqstr_field ();
							dispFrm += makespace("\t", indent+4) + "</td>\n";
							dispFrm += makespace("\t", indent+4) + "<td width=\"50%\">\n";

// op_list(priv, accNum, ordNum, frmNum, ordStatus)
//0: order_rec.ORDER_NO 	
//1: order_rec.ORDER_CUST_ORDNO 	
//2: order_rec.ORDER_REF_CODE.arr 	
//3: order_rec.DLV_NAME.arr 
//4: order_rec.ORDER_EXP_DATE.arr 
//5: order_rec.DELDATE.arr 
//6: order_rec.TRANSPORT_NAME.arr 
//7: order_rec.ORDER_STATUS_NAME.arr 
//8: order_rec.SUPP_CMPY_CODE.arr	
//9: order_rec.SUPP_CMPY_NAME.arr 	
//10:order_rec.CUST_CMPY_CODE.arr
//11:order_rec.CUST_CMPY_NAME.arr 	
//12:order_rec.TERM_CODE.arr 	
//13:order_rec.TERM_NAME.arr 	
//14:order_status 	
//15:order_approve_status 	
//16:operator name derived from order_rec.ORD_PSN_CODE.arr
//17:order_rec.ORDER_SOURCE.arr 

							dispFrm += makespace("\t", indent+5) + op_list (curPrivilage, order_jstab[i][howmanyDone], order_jstab[i][howmanyDone-1], i, order_jstab[i][14]);

							dispFrm += makespace("\t", indent+4) + "</td>\n";
							dispFrm += makespace("\t", indent+4) + "</tr>\n";
							dispFrm += makespace("\t", indent+4) + "</table>\n";
							dispFrm += makespace("\t", indent+3) + "</form>\n";
						}
						else
						{
							if ( j == column_headers.length-3 )
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
							if ( j == column_headers.length-2 )
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

		dispFrm += makespace("\t", indent) + nextPage(pagesTotal_3, pg_3, "order_ent_maint.cgi", "pg_3");
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

		updFrm += makespace("\t", indent+1) + "<form name=\"edit_order\" method=\"post\" id=\"edit_order\" action=\"order_ent_maint.cgi\" onsubmit=\"return submitUpdateOrderFrm(this);\">\n";

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
		updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyOrderSubmit"] + "\">\n";

		updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
		updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
		updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
		updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
		updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

		updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + orderNo + "\">\n";

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
		if(sp_opd=='Y')
		{
			updFrm += makefield(1, orderTitle["order_ref_code"], frm_order_ref_code, "frm_order_ref_code", "frm_order_ref_code", "", 30, 20, "dataType=\"Require\"", otherText["msg_enterOrderRef"], "*", indent+4, 100);
		}
		else
		{
			updFrm += makefield(1, orderTitle["order_ref_code"], frm_order_ref_code, "frm_order_ref_code", "frm_order_ref_code", "", 30, 20, "", "", "&nbsp;", indent+4, 100);
		}
		
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
//		updFrm += makefield(2, orderTitle["order_dlv_code"], frm_order_dlv_code, "frm_order_dlv_code", "frm_order_dlv_code", delivery_locations, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderDelvLoc"], "*", indent+4, 100);
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

		updFrm += makespace("\t", indent+1) + "<form name=\"edit_order\" method=\"post\" id=\"edit_order\" action=\"order_ent_maint.cgi\" onsubmit=\"return submitUpdateOrderFrm(this);\">\n";

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
		updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["modifyOrderSubmit"] + "\">\n";

		updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"custAcc\" id=\"custAcc\" value=\"" + custAcc + "\">\n";
		updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"suppCd\" id=\"suppCd\" value=\"" + suppCd + "\">\n";
		updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"cmpyCd\" id=\"cmpyCd\" value=\"" + cmpyCd + "\">\n";
		updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg\" id=\"pg\" value=\"" + pg + "\">\n";
		updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"pg_3\" id=\"pg_3\" value=\"" + pg_3 + "\">\n";

		updFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"orderNo\" id=\"orderNo\" value=\"" + orderNo + "\">\n";

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
		if(sp_opd=='Y')
		{

			updFrm += makefield(3, orderTitle["order_ref_code"], frm_order_ref_code, "frm_order_ref_code", "frm_order_ref_code", "", 30, 15, "dataType=\"Require\"", otherText["msg_enterOrderRef"], "*", indent+4, 100);
		}
		else
		{
			updFrm += makefield(3, orderTitle["order_ref_code"], frm_order_ref_code, "frm_order_ref_code", "frm_order_ref_code", "", 30, 15, "", "", "&nbsp;", indent+4, 100);
		}

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
			frm_order_exp_date = getNextDate(cust_ord_days); //currDate;
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
		//	addFrm += makespace("\t", indent+1) + "<form name=\"add_order\" method=\"post\" id=\"add_order\" action=\"order_ent_maint.cgi\" onsubmit=\"return Validator.Validate(this,1);\">\n";

		addFrm += makespace("\t", indent+1) + "<form name=\"add_order\" method=\"post\" id=\"add_order\" action=\"order_ent_maint.cgi\" onsubmit=\"return submitInsertOrderFrm(this);\">\n";

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
		addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"op\" id=\"op\" value=\"" + opValues["insertOrderSubmit"] + "\">\n";

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

		order_no_min = 1;
		order_no_max = 999999999;
		addFrm += makefield(1, orderTitle["order_cust_no"], frm_order_cust_no, "frm_order_cust_no", 	"frm_order_cust_no", "", 10, 9, "dataType=\"RangeInt\" min=\""+order_no_min+"\" max=\""+order_no_max+"\" ", otherText["msg_enterOrderNo"]+"("+order_no_min+"-"+order_no_max+")", "*", indent+4, 100);
		//	addFrm += makefield(3, orderTitle["order_no"], frm_order_no, "frm_order_no", "frm_order_no", "", 10, 9, "", "", "&nbsp;", indent+4, 100);
		//	addFrm += makefield(1, orderTitle["order_no"], frm_order_no, "frm_order_no", "frm_order_no", "", 10, 9, "dataType=\"Number\"", otherText["msg_enterOrderNo"], "*", indent+4, 100);

		addFrm += makespace("\t", indent+4) + "<input type=\"hidden\" name=\"frm_order_no\" id=\"frm_order_no\" value=\"" + frm_order_no + "\">\n";

		//	addFrm += makefield(1, orderTitle["order_ref_code"], frm_order_ref_code, "frm_order_ref_code", "frm_order_ref_code", "", 30, 15, "dataType=\"Require\"", otherText["msg_enterOrderRef"], "*", indent+4, 100);
		if(sp_opd=='Y')
		{

			addFrm += makefield(1, orderTitle["order_ref_code"], frm_order_ref_code, "frm_order_ref_code", "frm_order_ref_code", "", 30, 20, "dataType=\"Require\"", otherText["msg_enterOrderRef"], "*", indent+4, 100);
		}
		else
		{
			addFrm += makefield(1, orderTitle["order_ref_code"], frm_order_ref_code, "frm_order_ref_code", "frm_order_ref_code", "", 30, 20, "", "", "&nbsp;", indent+4, 100);
		}
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
//		addFrm += makefield(2, orderTitle["order_dlv_code"], frm_order_dlv_code, "frm_order_dlv_code", 	"frm_order_dlv_code", delivery_locations, 0, 0, "dataType=\"Require\"", otherText["msg_selOrderDelvLoc"], "*", indent+4, 100);
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
		//	addFrm += makefield(1, orderTitle["order_limit"], frm_order_limit, "frm_order_limit", "frm_order_limit", "", 30, 30, " readonly ", "", "&nbsp;", indent+4, 100);

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

		if(priv>=7)
		{
			btn_HTML += btnLocation_HTML("justChaneMyLocation('order_ent_maint.cgi?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&op=" + opValues["insertOrderForm"] + "'); ", otherText["btn_addNew_order"]);
		}
		if(priv>=5 && is_search_on != 1)
		{
			btn_HTML += btnLocation_HTML("justChaneMyLocation('order_ent_maint.cgi?is_search_on=1&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&op=" + opValues["listOrder"] + "'); ", otherText["btn_search_order"]);
		}

		//	btn_HTML += btnLocation_HTML("void(printSpecial()); ", commBtnText["Print"]);

		//	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_ent_maint.cgi?custAcc='+custAcc); ", otherText["btn_bakto_customer"]);
		btn_HTML += btnLocation_HTML("justChaneMyLocation('cust.cgi?suppCd='+suppCd); ", otherText["btn_bakto_customers"]);

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


		btn_HTML += btnLocation_HTML("justChaneMyLocation('order_ent_maint.cgi?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&op=" + opValues["listOrder"] + "'); ", otherText["btn_bakto_orderPg"]);

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
		   btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('order_ent_maint.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&prevOp=" + opValues["modifyOrderForm"] + "&op=" + opValues["insertAddressForm"] + "&delivCd='+delivCd); ", otherText["btn_addNew_delivAddr"]);
		   }
		 */
		//	btn_HTML += btnLocation_HTML("history.go(-1);", otherText["btn_bakto_orderPg"]);
		btn_HTML += btnLocation_HTML("justChaneMyLocation('order_ent_maint.cgi?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&op=" + opValues["listOrder"] + "'); ", otherText["btn_bakto_orderPg"]);
		//	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_ent_maint.cgi?delivCd='+delivCd); ", otherText["btn_bakto_orderPg"]);

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
		   btn_HTML += "&nbsp; " + btnLocation_HTML("justChaneMyLocation('order_ent_maint.cgi?pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&prevOp=" + opValues["insertOrderForm"] + "&op=" + opValues["insertAddressForm"] + "&delivCd='+delivCd); ", otherText["btn_addNew_delivAddr"]);
		   }
		 */
		//	btn_HTML += btnLocation_HTML("history.go(-1);", otherText["btn_bakto_orderPg"]);
		btn_HTML += btnLocation_HTML("justChaneMyLocation('order_ent_maint.cgi?is_search_on='+is_search_on+'&pg_3='+pg_3+'&pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&termCd='+termCd+'&op=" + opValues["listOrder"] + "'); ", otherText["btn_bakto_orderPg"]);
		//	btn_HTML += btnLocation_HTML("justChaneMyLocation('order_ent_maint.cgi?delivCd='+delivCd); ", otherText["btn_bakto_orderPg"]);

		btn_HTML += "                                 </div><br>\n";
		btn_HTML += "             <td>\n ";
		btn_HTML += "         </tr> \n";

		return btn_HTML;
	}




	function updatePageHeading(op,pgHead)
	{
		var pageHeading = pgHead;

		if (op == opValues["listOrder"])
		{
			pageHeading += otherText["pgHead_order"];
		}

		if(op == opValues["modifyOrderForm"] || op == opValues["modifyOrderSubmit"])
		{
			pageHeading += otherText["pgHead_orderUpd"];
		}
		if(op == opValues["insertOrderForm"] || op == opValues["insertOrderSubmit"])
		{
			pageHeading += otherText["pgHead_orderAdd"];
		}
		if(op == opValues["deleteOrderForm"] || op == opValues["deleteOrderSubmit"])
		{
			pageHeading += otherText["pgHead_orderDel"];
		}

		return pageHeading; 
	}



	function updatePageTitle(op,pgTit)
	{
		var pageTitle = pgTit;

		if (op == opValues["listOrder"])
		{
			pageTitle += otherText["pgTitle_order"];
		}

		if(op == opValues["modifyOrderForm"] || op == opValues["modifyOrderSubmit"])
		{
			pageTitle += otherText["pgTitle_orderUpd"];
		}
		if(op == opValues["insertOrderForm"] || op == opValues["insertOrderSubmit"])
		{
			pageTitle += otherText["pgTitle_orderAdd"];
		}
		if(op == opValues["deleteOrderForm"] || op == opValues["deleteOrderSubmit"])
		{
			pageTitle += otherText["pgTitle_orderDel"];
		}

		return pageTitle;
	}



	/* define function op_list() */
	function op_list(priv, accNum, ordNum, frmNum, ordStatus)
	{
		/* priv = 
		   6 modify	op=1,2,3
		   7 add		op=4
		   8 delete	op=5
		 */
		var op_list = "";
		op_list += "<select name=\"op\" id=\"op\" onchange=\"submitAction(this, '"+accNum+"', '"+ordNum+"', '"+frmNum+"', '"+ordStatus+"');\">          ";

		switch (priv)
		{
			case 8:
				op_list += "<option value=\"" + opValues["deleteOrderSubmit"] + "\">" + commText["Delete"] + "</option>";

			case 7:			/* printf("<option value=8>7 8 ADD   </option>");  */

			case 6:     
				op_list += "<option value=\"" + opValues["modifyOrderForm"] + "\">" + commText["Modify"] + "</option>";

			case 5:			/* Find Has not been implemented yet*/
				op_list += "<option value=\"" + opValues["viewOrdDetail"] + "\">" + otherText["orderDetails"] + "</option>";
				op_list += "<option value=\"" + opValues["viewSchedOrder"] + "\">" + otherText["scheduleOrder"] + "</option>";
				break;
		}

		op_list += "<option value=0 selected>--\t" + otherText["youraction"] + "\t--</option>";
		op_list += "</select>                                        ";

		return op_list ;
	}


	//	Checked order ref code has been used
	function checkOrderRefCd() 
	{
		if(op==opValues["insertOrderForm"])
		{ 
			var iTN = document.add_order.frm_order_cust_no.value;
			var iORDCD = document.add_order.frm_order_ref_code.value;
			var iOP = document.add_order.op.value;
		}

		if(op==opValues["modifyOrderForm"])
		{
			var iTN = document.edit_order.frm_order_cust_no.value;
			var iORDCD = document.edit_order.frm_order_ref_code.value;
			var iOP = document.edit_order.op.value;
		}
		
		var mycgi = '../../../cgi-bin/en/cust_ord/check_dup_ordRef.cgi';
		
		var myqry = 'custAcc='+encodeURI(custAcc)+'&ordernum='+encodeURI(iTN)+'&suppCd='+encodeURI(suppCd)+'&ordRefCd='+encodeURI(iORDCD)+'&op='+encodeURI(iOP) ;
		var oTN = loadHtml(mycgi, myqry);

		if ( oTN!=0 ) { 
			alert(orderTitle["order_ref_code"] +' '+ iORDCD +' '+ ml(t__has_been_allocated) );
			return false; 
		} else {
			return true; 
		}
	}

	//	Checked latest order number availabe
	function checkLastOrder() 
	{
		var iTN = document.add_order.frm_order_cust_no.value;
		var mycgi = '../../../cgi-bin/en/cust_ord/get_last_ordno.cgi'; 
		var myqry = 'custAcc='+encodeURI(custAcc)+'&ordernum='+encodeURI(iTN)+'&suppCd='+encodeURI(suppCd) ;
		var oTN = loadHtml(mycgi, myqry);
		
		if ( iTN != oTN ) { 
			alert(trim(ml(t__Order_No)) +' / '+ trim(ml(t__Trip_No))+' '+ iTN +' '+ ml(t__has_been_allocated) + '. \n' +ml(t__Another_new_Order_No)+' '+ oTN+' '+ml(t__is_choosen)+'.');
			document.add_order.frm_order_cust_no.value = oTN; 
			return false; 
		} else {
			return true; 
		}
	}



	function submitInsertOrderFrm(myformObj)
	{
		
		var isValid = false;
		var isDateOK = false;
		var isOrdNoOK = false;
		var isOrdRefCdOK = false;
		
		isValid = submitmyform(myformObj);

		if (isValid == true)
		{

			// Checkin Order No 
			if ( op == opValues["insertOrderForm"] ) {
				isOrdNoOK = checkLastOrder();
			} else {
				isOrdNoOK = true;
			}
			
			if(sp_opd=='Y')
			{
				if ( op == opValues["insertOrderForm"] ) 
				{
  				isOrdRefCdOK = checkOrderRefCd();
	  			} 
				else 
				{
	  				isOrdRefCdOK = true;
	  			}
			}
			else
			{
				isOrdRefCdOK = true;
			}
			
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

		return (isValid && isDateOK && isOrdNoOK && isOrdRefCdOK);
	}


	function submitUpdateOrderFrm(myformObj)
	{
		var isValid = false;
		var isDateOK = false;
		var isOrdRefCdOK = false;


		isValid = submitmyform(myformObj);

		if (isValid == true)
		{	if(sp_opd=='Y')
			{

				isOrdRefCdOK = checkOrderRefCd();
			}
			else
			{
				isOrdRefCdOK = true;
			}

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
		return (isValid && isDateOK && isOrdRefCdOK);
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

		var searchStr = "termCd='+termCd+'&frm_order_cust_no_from='+frm_order_cust_no_from+'&frm_order_cust_no_to='+frm_order_cust_no_to+'&frm_orddate_from='+frm_orddate_from+'&frm_orddate_to='+frm_orddate_to+'&frm_deldate_from='+frm_deldate_from+'&frm_deldate_to='+frm_deldate_to+'&frm_order_status_search='+frm_order_status_search+'&ordRefCd='+ordRefCd+'&frm_order_delv_mthd_search='+frm_order_delv_mthd_search+'&";
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
			nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (1) + "&is_search_on='+is_search_on+'&" + searchStr + "pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listOrder"] + "'); ", "&lt;&lt;");
			foobar = page_number - 1;
			//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $foobar . $query_string . "\"><b>&lt;</b></a>";
			nextPgHTML +=  btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&is_search_on='+is_search_on+'&" + searchStr + "pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listOrder"] + "'); ", "<b>&lt;<\/b>");
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
				nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&is_search_on='+is_search_on+'&" + searchStr + "pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listOrder"] + "'); ", foobar1 + "-" + foobar2);
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
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&is_search_on='+is_search_on+'&" + searchStr + "pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listOrder"] + "'); ", i);
		}
		nextPgHTML  += "&nbsp;&nbsp;<b><font color=\"#ff0000\">" + page_number + "</font></b>";
		for (var i=page_number+1; i<foobar2; i++) 
		{
			//alert("I am in for for foobar2 loop "+i);	
			nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (i) + "&is_search_on='+is_search_on+'&" + searchStr + "pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listOrder"] + "'); ", i);
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
				nextPgHTML += btnLocation_HTML("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar1) + "&is_search_on='+is_search_on+'&" + searchStr + "pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listOrder"] + "'); ", tempTxt);
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
			nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (foobar) + "&is_search_on='+is_search_on+'&" + searchStr + "pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listOrder"] + "'); ", "&gt;");
			//$html_output .= "&nbsp;&nbsp;<a href=\"" . $url . "?page_number=" . $num_pages . $query_string . "\"><b>&gt;&gt;</b></a>";
			nextPgHTML += btnLocation_HTML_nexPreLk("justChaneMyLocation('" + curPgName + "?" + curPgVarName + "=" + (num_pages) + "&is_search_on='+is_search_on+'&" + searchStr + "pg='+pg+'&suppCd='+suppCd+'&cmpyCd='+cmpyCd+'&custAcc='+custAcc+'&op=" + opValues["listOrder"] + "'); ", "<b>&gt;&gt;<\/b>");
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



function getNextDate(days)
{
	var monNum;
	var monStr;
	var datNum;
	var datStr;

	var d = new Date();

	d.setTime( d.getTime() + (days*24*60*60*1000) );

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




	/*
	   function makespace(ch, num)
	   {
	   var i;
	   var space = "";

	   for (i=0; i<num; i++)
	   {
	   space += ch;
	   }

	   return space;
	   }



	   function makefield(type, title, value, name, id, list, size, maxlen, validator, msg, mandatory, indent, width)
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

	   fieldHTML += makespace("\t", indent) + "<td width=\"5\" align=\"center\" class=\"mandatory\">\n";
	   fieldHTML += makespace("\t", indent+1) + mandatory + "\n";
	   fieldHTML += makespace("\t", indent) + "</td>\n";

	   if (type == 0)
	   { // normal text
	   fieldHTML += makespace("\t", indent) + "<td class=\"infotext\" valign=\"top\">\n";
	   fieldHTML += makespace("\t", indent+1) + value + "\n";
	   fieldHTML += makespace("\t", indent) + "</td>\n";
	   }
	   else
	   if (type == 1)
	   { // text field
	   fieldHTML += makespace("\t", indent) + "<td>\n";
	   fieldHTML += makespace("\t", indent+1) + "<input type=\"text\" name=\"" + name + "\" id=\"" + id + "\" value=\"" + value + "\" size=\"" + size + "\" maxLength=\"" + maxlen + "\" " + validator + " msg=\"" + msg + "\">\n";
	   fieldHTML += makespace("\t", indent) + "</td>\n";
	   }
	   else
	   if (type == 2)
	   { // drop list
	   fieldHTML += makespace("\t", indent) + "<td>\n";
	   fieldHTML += makespace("\t", indent+1) + "<select id=\"" + id + "\" name=\"" + name + "\" class=\"smallselect\" " + validator + " msg=\"" + msg + "\"/> \n";
	   fieldHTML += displayDropList(value, list, msg);
	   fieldHTML += makespace("\t", indent) + "</td>\n";
	   }
	   else
	   if (type == 3)
	   { // hidden field
	   fieldHTML += makespace("\t", indent) + "<td class=\"infotext\">\n";
	   fieldHTML += makespace("\t", indent+1) + "<input type=\"hidden\" name=\"" + name + "\" id=\"" + id + "\" value=\"" + value + "\" />" + value + "\n";
	   fieldHTML += makespace("\t", indent) + "</td>\n";
	   }
	   else
	   { // normal text
	   fieldHTML += makespace("\t", indent) + "<td class=\"infotext\">\n";
	   fieldHTML += makespace("\t", indent+1) + value + ":\n";
	   fieldHTML += makespace("\t", indent) + "</td>\n";
	   }

	   return fieldHTML;
	   }
	*/


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
		newPage += "function submitAction(myobject, accNum, ordNum, frmNum, ordStatus)\n";
		newPage += "{\n";
		newPage += "	var myCurQstring=produceQString();\n";
		newPage += "	var myselectedvalue = myobject.options[myobject.selectedIndex].value;";

		newPage += "	if(myselectedvalue==\"" + opValues["deleteOrderSubmit"] + "\")\n";
		newPage += "	{\n";
		newPage += "		if(ordStatus < orderStatusGate)\n";
		newPage += "		{\n";
		newPage += "			if(confirm('" + otherText["msg_del_confirm"] + "'))\n";
		newPage += "			{\n";
		newPage += "				eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
		newPage += "				eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["deleteOrderSubmit"] + "+\"';\");\n";

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
		   newPage += "	else if(myselectedvalue==\"" + opValues["modifyOrderForm"] + "\")\n";
		   newPage += "	{\n";
		   newPage += "		if(ordStatus < orderStatusGate)\n";
		   newPage += "		{\n";
		   newPage += "				eval(\"document.select_action_\"+frmNum+\".preqstr.value='\"+myCurQstring+\"';\");\n";
		   newPage += "				eval(\"document.select_action_\"+frmNum+\".op.value='\"+" + opValues["modifyOrderForm"] + "+\"';\");\n";

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
		//	newPage += "		document.location.href=\"order_det.cgi?termCd="+termCd+"&orderNo=\"+ordNum+\"&op="+opValues["listOrdDetail"]+"&pg=1&cmpyCd=\"+accNum+\"&suppCd="+suppCd+"&custAcc="+custAcc+"\";\n";

		newPage += "		document.location.href=\"order_det.cgi?termCd="+termCd+"&orderNo=\"+ordNum+\"&op="+opValues["listOrdDetail"]+"&pg=1&cmpyCd="+cmpyCd+"&suppCd="+suppCd+"&custAcc="+custAcc+"\";\n";
		newPage += "	}\n";

		newPage += "	else if(myselectedvalue==\"" + opValues["viewSchedOrder"] + "\")\n";
		newPage += "	{\n";
		newPage += "		document.location.href=\"order_schd.cgi?termCd="+termCd+"&orderNo=\"+ordNum+\"&op="+opValues["listSchedOrder"]+"&pg=1&cmpyCd="+cmpyCd+"&suppCd="+suppCd+"&custAcc="+custAcc+"\";\n";
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


