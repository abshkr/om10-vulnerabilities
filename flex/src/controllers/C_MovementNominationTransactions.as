package controllers
{
	import components.DKI_ValidatorInput;
	
	import dm.DM;
	import dm.utils.tools;
	
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.text.TextFormat;
	
	import mx.binding.utils.ChangeWatcher;
	import mx.collections.ArrayCollection;
	import mx.formatters.DateFormatter;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	import mx.utils.ObjectUtil;
	import mx.utils.StringUtil;
	
	import org.alivepdf.fonts.CoreFont;
	
	import spark.layouts.supportClasses.LayoutBase;
	
	import views.v_MovementNominationTransactions;
	
	public class C_MovementNominationTransactions
	{
		[Bindable] public var readOnly:Boolean = false;
		[Bindable] public var canReset:Boolean = false;
		[Bindable] public var canUpdate:Boolean = false;
		[Bindable] public var canCreate:Boolean = false;
		[Bindable] public var canDelete:Boolean = false;
		[Bindable] public var hasPassword:Boolean = false;
		
		[Bindable] public var _view:v_MovementNominationTransactions;
		
		public var parameters:Object = new Object;

		[Bindable] public static var QTY_AMB_REAL:String                	=  "";
		[Bindable] public static var QTY_COR_REAL:String					=  "";
		[Bindable] public static var MASS_AMB_REAL:String				=  "";
		
		[Bindable] public static var PLN_AMB:String					=  "0";
		[Bindable] public static var AVAIL_AMB:String				=  "0";
		[Bindable] public static var QTY_AMB:String                	=  "";
		[Bindable] public static var TEMP_AMB:String       		    =  "";
		[Bindable] public static var DENS_COR:String		 		=  "";
		[Bindable] public static var QTY_COR:String					=  "";
		[Bindable] public static var MASS_AMB:String				=  "";
		[Bindable] public static var TEMP_COR:String				=  "";
		[Bindable] public static var ALTERNATE_QTY:String			=  "";
		
		[Bindable] public static var DENS_COR_LO:Number		 		=  0;
		[Bindable] public static var DENS_COR_HI:Number		 		=  0;
		[Bindable] public static var DENS_COR_DP:Number		 		=  0;
		
		[Bindable] public static var TRIP_NUM:String				=  "";
		[Bindable] public static var CUSTOMER:String				=  "";
		[Bindable] public static var TAS_NUM:String					=  "";
		[Bindable] public static var COMMENT:String					=  "";
		[Bindable] public static var MVITM_KEY:String				=  "";
		[Bindable] public static var MVITM_ITEM_ID:String			=  "";
		
		[Bindable] public static var MVITM_PRODCODE_TO:String		= "";
		
		[Bindable] public static var PLANT_TO:String				= "";
		[Bindable] public static var STR_TANK_TO:String				= "";
		[Bindable] public static var STR_PROD_TO:String				= "";
		[Bindable] public static var STR_ARM_FROM:String			= "";
		
		[Bindable] public static var PLANNED_QTY_UNIT				= "l";
		
		
		[Bindable] public static var TIME_START:Date				= new Date(global.serverDateTime.time);
		[Bindable] public static var TIME_END:Date					= new Date(global.serverDateTime.time);
		
		[Bindable] public static var TANK_TO:ArrayCollection		= new ArrayCollection();
		[Bindable] public static var PROD_TO:ArrayCollection		= new ArrayCollection();
		
		[Bindable] public static var TANKER:String					= "";
		[Bindable] public static var PLANT_FROM:String				= "";
		[Bindable] public static var STR_TANK_FROM:String			= "";
		[Bindable] public static var STR_PROD_FROM:String			= "";
		[Bindable] public static var TANK_FROM:ArrayCollection		= new ArrayCollection();
		[Bindable] public static var PROD_FROM:ArrayCollection		= new ArrayCollection();
		
		
		[Bindable] public static var bases:ArrayCollection			= new ArrayCollection();
		[Bindable] public static var meters:ArrayCollection			= new ArrayCollection();
		[Bindable] public static var arms:ArrayCollection			= new ArrayCollection();
		
		[Bindable] public static var baseTotals:ArrayCollection		= new ArrayCollection();
		[Bindable] public static var meterTotals:ArrayCollection    = new ArrayCollection();
		
		
		[Bindable] public static var tankers:ArrayCollection    = new ArrayCollection();
		
		[Bindable] public var pointer:LayoutBase;
		
		[Bindable] public static var ORDER_NUMBER:String = "";
		[Bindable] public static var dp:String = "";
		[Bindable] public static var dpcmpy:String = "";
		
		
		
		
		var df:DateFormatter = new DateFormatter();
		
		
		[Bindable] public static var INL1:String					=  "";
		[Bindable] public static var INL2:String					=  "";
		[Bindable] public static var INL3:String					=  "";
		[Bindable] public static var IIL1:String					=  "";
		[Bindable] public static var IIL2:String					=  "";
		[Bindable] public static var IIL3:String					=  "";
		
		private var QTY_AMB_TIME:Date = new Date();
		private var QTY_COR_TIME:Date = new Date();
		private var QTY_MASS_TIME:Date = new Date();
		
		
		
		
		public function C_MovementNominationTransactions()
		{
			
		}
		
		public function AmbQtyChangedInForm():void
		{
			QTY_AMB_TIME = new Date();
			QTY_AMB_REAL = QTY_AMB;
		}
		
		public function StdQtyChangedInForm():void
		{
			QTY_COR_TIME = new Date();
			QTY_COR_REAL = QTY_COR;
		}
		
		public function MassQtyChangedInForm():void
		{
			QTY_MASS_TIME = new Date();
			MASS_AMB_REAL = MASS_AMB;
		}
		
		
		
		public function bindToTanker():void{
			tankers = new ArrayCollection(view.carrierCode.selectedItem.tankers);
			tankers.refresh();
			view.callLater(function():void{
				view.tankerCode.selectedIndex = 0;
				bindTanker();
			});
		}
		public function bindTanker():void{
			TANKER = view.tankerCode.selectedItem;
		}
		
		public function doMovement():void{
			var params:Object 	= new Object();
			params.orderNumber 	= ORDER_NUMBER;
			params.paraTrans 	= new Object();
			
			var bases_submit:ArrayCollection;
			var meters_submit:ArrayCollection;
			
			
			
			// do validation here
			if( view.tankerCode.selectedIndex < 0 ){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_SEL_TNKR'));view.tankerCode.setFocus();return;
			}
			if(QTY_AMB.length==0){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_ENTER_OBS_QTY'));view.aq.setFocus();return;
			}
			if(QTY_COR.length==0){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_ENTER_STD_QTY'));view.sq.setFocus();return;
			}
			if(MASS_AMB.length==0){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_ENTER_MASS'));view.mq.setFocus();return;
			}
			if(TEMP_AMB.length==0){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_ENTER_TEMP'));view.at.setFocus();return;
			}
			if(DENS_COR.length==0){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_ENTER_DENS'));view.sd.setFocus();return;
			}
			if(Number(TEMP_AMB) < global.MIN_TEMPERATURE || Number(TEMP_AMB) > global.MAX_TEMPERATURE ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.OUT_RANGE_OBS_TEMP')+ String(global.MIN_TEMPERATURE) + "~" + String(global.MAX_TEMPERATURE) + ".");
				return;
			}			
			if(Number(DENS_COR) < DENS_COR_LO || Number(DENS_COR) > DENS_COR_HI ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.OUT_RANGE_STD_DENS')+ String(DENS_COR_LO) + "~" + String(DENS_COR_HI) + ".");
				return;
			}			
/*			if(Number(DENS_COR) < global.MIN_DENSITY || Number(DENS_COR) > global.MAX_DENSITY ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.OUT_RANGE_STD_DENS')+ String(global.MIN_DENSITY) + "~" + String(global.MAX_DENSITY) + ".");
				return;
			}			
*/			
			if( int(QTY_AMB)==0 ){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.CANNOT_ZERO_OBS_QTY'));view.aq.setFocus();return;
			}
			if( int(QTY_COR)==0 ){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.CANNOT_ZERO_STD_QTY'));view.sq.setFocus();return;
			}
			if( int(MASS_AMB)==0 ){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.CANNOT_ZERO_MASS'));view.mq.setFocus();return;
			}
/*			if( int(ALTERNATE_QTY)==0 ){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.CANNOT_ZERO_ALT_QTY'));view.alq.setFocus();return;
			}
*/			
			var max_number:Number=(Math.pow( 10, global.MAX_NUMBER_DIGITS ) - 1);
			if( Number(QTY_AMB) > max_number ){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.CANNOT_GT_OBS_QTY') + String(max_number));view.aq.setFocus();return;
			}
			if( Number(QTY_COR) > max_number ){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.CANNOT_GT_STD_QTY') + String(max_number));view.sq.setFocus();return;
			}
			if( Number(MASS_AMB) > max_number ){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.CANNOT_GT_MASS') + String(max_number));view.mq.setFocus();return;
			}
			if( Number(ALTERNATE_QTY) > max_number ){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.CANNOT_GT_ALT_QTY') + String(max_number));view.alq.setFocus();return;
			}
			
			
			// we are restricted to a single transfer
			params.paraTrans.LoadNumber 		= MVITM_ITEM_ID;
			var from:Object = new Object();
			var to:Object = new Object();
			if(view.currentState == "Disposal" || view.currentState == "Transfer"){  
				if(view.fromArm.selectedIndex == -1){
					if(view.fromTank.selectedIndex == -1){
						global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_SEL_FROM_TANK_ARM'));return;	
					}
					from.tank	= view.fromTank.selectedItem.tankCode;
				}else{
					switch(TANKER.toLowerCase()){
						case "pipeline":
						case "generic tanker":
						case "special":
							global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_SEL_TNKR4TRNS'));return;						
					}
				}
				from.supplier	= parameters["movItem"].MVITM_PRODCMPY_FROM;	
				from.prod		= parameters["movItem"].MVITM_PRODCODE_FROM;	
			}
			if(view.currentState == "Receipt" ||view.currentState == "Transfer"){
				if(view.toTank.selectedIndex == -1){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_SEL_TO_TANK'));return;	
				}
				to.tank		= view.toTank.selectedItem.tankCode;
				to.supplier	=parameters["movItem"].MVITM_PRODCMPY_TO;	
				to.prod		=parameters["movItem"].MVITM_PRODCODE_TO;	
			}
			/*	if(view.currentState == "Receipt"){
			params.paraTrans.Supplier 			= parameters["movItem"].MVITM_PRODCMPY_TO;	
			}else if(view.currentState == "Disposal"){
			params.paraTrans.Supplier 			= parameters["movItem"].MVITM_PRODCMPY_FROM;	
			}else{
			params.paraTrans.SupplierTo 		= parameters["movItem"].MVITM_PRODCMPY_TO;
			params.paraTrans.SupplierFrom		= parameters["movItem"].MVITM_PRODCMPY_FROM;
			}
			*/
			
			params.paraTrans.Tanker_Code 		= TANKER;
			params.paraTrans.Operator_Code 		= '8888';
			params.paraTrans.Start_Time 		= df.format(TIME_START);
			params.paraTrans.Finish_Time 		= df.format(TIME_END);
			params.paraTrans.TAS_Ref 			= "";
			params.paraTrans.Customer 			= "";
			params.paraTrans.User_Comments 		= COMMENT;
			params.paraTrans.Login_User = global.user;

			var transfer:Object 				= new Object();
			transfer.Arm_Code 					= "";
			transfer.nr_in_tkr 					= 1;
			/*
			if(view.currentState == "Receipt"){
			transfer.drawer_code 				= parameters["movItem"].MVITM_PRODCMPY_TO;
			transfer.product_code 				= parameters["movItem"].MVITM_PRODCODE_TO;
			}else{
			transfer.drawer_code 				= parameters["movItem"].MVITM_PRODCMPY_FROM;
			transfer.product_code 				= parameters["movItem"].MVITM_PRODCODE_FROM;
			}
			*/
			transfer.dens 						= Number(DENS_COR)*1000;
			transfer.Temperature 				= Number(TEMP_AMB)*100;
			transfer.amb_vol 					= Number(QTY_AMB_REAL) *1000;
			transfer.cor_vol 					= Number(QTY_COR_REAL) *1000;
			transfer.liq_kg 					= Number(MASS_AMB_REAL)*1000;
			transfer.Equipment_ID 				= "";
			transfer.Arm_Code					= (view.fromArm.selectedIndex == -1)?"":view.fromArm.selectedItem.armCode;
			transfer.Planned_Qty 				= PLN_AMB;
			// please populate bases and meters here
			if(view.currentState == "Receipt" || view.currentState == "Transfer" || view.fromArm.selectedIndex==-1){
				bases_submit = new ArrayCollection();
				meters_submit = new ArrayCollection();
				var base:Object 	= new Object();
				var meter:Object 	= new Object();
				if(view.currentState == "Disposal"){
					
					base.Tank_Code 		= view.fromTank.selectedItem.tankCode;
					base.product_code 	= view.fromTank.selectedItem.baseCode;
				}else{
					base.Tank_Code 		= view.toTank.selectedItem.tankCode;
					base.product_code 	= view.toTank.selectedItem.baseCode;
					
				}
				base.prod_class 	= "";
				base.dens 			= Number(DENS_COR)*1000;
				base.Temperature 	= Number(TEMP_AMB)*100;
				base.amb_vol 		= Number(QTY_AMB_REAL) *1000;
				base.cor_vol 		= Number(QTY_COR_REAL) *1000;
				base.liq_kg 		= Number(MASS_AMB_REAL)*1000;
				bases_submit.addItem(base);
			}else{
				for each(var base:Object in bases){
					base.Tank_Code 		= base.TANK_CODE;
					base.product_code	= base.BASE_CODE;
					base.prod_class 	= base.BCLASS_DESC;
					base.dens 			= base.TANK_DENS;					
					if(base.dens.toString()==""){
						global.msgWarning("["+base.BASE_NAME+"]: " + mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_ENTER_DENS4BASE_DET'));return;
					}
					if(base.Temperature.toString()==""){
						global.msgWarning("["+base.BASE_NAME+"]: " + mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_ENTER_TEMP4BASE_DET'));return;
					}
					if(base.amb_vol.toString()==""){
						global.msgWarning("["+base.BASE_NAME+"]: " + mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_ENTER_OBS4BASE_DET'));return;
					}
					if(base.cor_vol.toString()==""){
						global.msgWarning("["+base.BASE_NAME+"]: " + mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_ENTER_STD4BASE_DET'));return;
					}
					if(base.liq_kg.toString()==""){
						global.msgWarning("["+base.BASE_NAME+"]: " + mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_ENTER_MASS4BASE_DET'));return;
					}
				}
				if(QTY_AMB!=baseTotals[0].qtyTotalRound){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.OBS_MISMATCH_BASE_TOTAL'));return;
				}
				if(QTY_COR!=baseTotals[0].stdTotalRound){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.STD_MISMATCH_BASE_TOTAL'));return;
				}
				if(MASS_AMB!=baseTotals[0].massTotalRound){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.MASS_MISMATCH_BASE_TOTAL'));return;
				}
				for each(var meter:Object in meters){
					meter.Meter_Injector_Code	= meter.STREAM_MTRCODE;
					/*if(meter.open_amb.toString()==""){
						global.msgWarning("["+meter.BASE_NAME+"]: " + mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_ENTER_OBS_ST4MTR_DET'));return;
					}
					if(meter.close_amb.toString()==""){
						global.msgWarning("["+meter.BASE_NAME+"]: " + mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_ENTER_OBS_ED4MTR_DET'));return;
					}
					if(meter.open_cor.toString()==""){
						global.msgWarning("["+meter.BASE_NAME+"]: " + mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_ENTER_STD_ST4MTR_DET'));return;
					}
					if(meter.close_cor.toString()==""){
						global.msgWarning("["+meter.BASE_NAME+"]: " + mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_ENTER_STD_ED4MTR_DET'));return;
					}
					if(meter.open_kg.toString()==""){
						global.msgWarning("["+meter.BASE_NAME+"]: " + mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_ENTER_MASS_ST4MTR_DET'));return;
					}
					if(meter.close_kg.toString()==""){
						global.msgWarning("["+meter.BASE_NAME+"]: " + mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_ENTER_MASS_ED4MTR_DET'));return;
					}*/
				}
				/*
				if(QTY_AMB!=meterTotals[0].quantity_amb){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.OBS_MISMATCH_METER_TOTAL'));return;
				}
				if(QTY_COR!=meterTotals[0].quantity_cor){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.STD_MISMATCH_METER_TOTAL'));return;
				}
				if(MASS_AMB!=meterTotals[0].quantity_kg){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.MASS_MISMATCH_METER_TOTAL'));return;
				}*/
				
				if(view.uomcb.selectedIndex<0){
					//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.INVALID_ALT_QTY_UNIT'));
					//return;
				}
				
				
				// clean up parametters not required to save bandwith and not to confuse backend
				bases_submit  = new ArrayCollection();
				meters_submit = new ArrayCollection();
				
				for each(base in bases){
					var base_submit:Object = ObjectUtil.clone(base);
					
					base_submit.dens 		= base.dens 		* 1000;
					base_submit.Temperature = base.Temperature 	* 100;
					base_submit.amb_vol 	= base.amb_vol 		* 1000;
					base_submit.cor_vol 	= base.cor_vol 		* 1000;
					base_submit.liq_kg 		= base.liq_kg      	* 1000;
					
					bases_submit.addItem(base_submit);
				}
				for each(meter in meters){
					var meter_submit:Object = ObjectUtil.clone(meter);
					meter_submit.open_amb	= meter.open_amb 	* 1000;
					meter_submit.close_amb	= meter.close_amb 	* 1000;
					meter_submit.open_cor	= meter.open_cor 	* 1000;
					meter_submit.close_cor	= meter.close_cor 	* 1000;
					meter_submit.open_kg	= meter.open_kg 	* 1000;
					meter_submit.close_kg	= meter.close_kg 	* 1000;
					meters_submit.addItem(meter_submit);
				}
			}
			transfer.Number_of_Bases 			= bases_submit.length;
			transfer.num_of_meter 				= meters_submit.length; 
			transfer.bases 						= bases_submit.source;
			transfer.meters		 				= meters_submit.source;
			params.numTrans 					= 1;
			params.isNomi	 					= 1;
			params.trans 						= new Array();
			params.trans.push(transfer);
			params.from = from;
			params.to = to;
			
			params.alt = null;
			
			
			if(StringUtil.trim(ALTERNATE_QTY).length>0){
				params.alt      = new Object();
				params.alt.qty  = Number(ALTERNATE_QTY);
				params.alt.unit = 'KG';
				if ( view.uomcb.selectedIndex >= 0 ) {
					params.alt.unit = view.uomcb.selectedItem.Symbol;
				}
			}
			
			
			
			trace("Request>>"+ ObjectUtil.toString(params));
			DM.SpecialMovements.processManualMovement(function(ob:Object):void{
				if(ob.data.result_code == 0 ){
					if ( String(ob.data.result_string).length > 0 ) {
						global.msgSuccess(ob.data.result_string);
					}
					else {
						global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','global.msg.opersuccess'));
					}
					parameters.close();	
				}else{
					if ( String(ob.data.result_string).length > 0 ) {
						global.msgFail(ob.data.result_string);
					}
					else {
						global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','global.msg.operfailure'));
					}
				}
			},params);
		}
		
		
		
		public function init(){
			
			_view.dg1f.columnHeaderGroup.visible = false;
			_view.dg1f.columnHeaderGroup.height = 0;
			_view.dg2f.columnHeaderGroup.visible = false;
			_view.dg2f.columnHeaderGroup.height = 0;
		}
		
		public function set view(c:v_MovementNominationTransactions):void{
			_view = c;
			init();
		}
		public function get view():v_MovementNominationTransactions{
			return _view;
		}
		
		public function calc():void{
			
			var found:Boolean   = false;
			var type:String     = "";
			var qty:Number      = 0;
			var dens:Number     = 0;
			var dens_lo:Number     = 0;
			var dens_hi:Number     = 0;
			var baseCode:String = "";
			
			
			if(Number(TEMP_AMB) < global.MIN_TEMPERATURE || Number(TEMP_AMB) > global.MAX_TEMPERATURE ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.OUT_RANGE_OBS_TEMP')+ String(global.MIN_TEMPERATURE) + "~" + String(global.MAX_TEMPERATURE) + ".");
				return;
			}			
			if(Number(DENS_COR) < DENS_COR_LO || Number(DENS_COR) > DENS_COR_HI ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.OUT_RANGE_STD_DENS')+ String(DENS_COR_LO) + "~" + String(DENS_COR_HI) + ".");
				return;
			}			
			
			if(view.currentState == "Receipt"){
				if(view.toTank.selectedIndex == -1){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_SEL_TO_TANK'));return;	
				}
				baseCode = view.toTank.selectedItem.baseCode;
			}else if (view.currentState == "Transfer") {
				if(view.fromTank.selectedIndex == -1){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_SEL_FROM_TANK'));return;	
				}
				baseCode = view.fromTank.selectedItem.baseCode;
			}else{
				if(view.fromArm.selectedIndex == -1){
					if(view.fromTank.selectedIndex == -1){
						global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.PLS_SEL_FROM_TANK_ARM'));return;
					}
					baseCode = view.fromTank.selectedItem.baseCode;
				}else{
					if(QTY_AMB.length  ==  0 && bases.length>1){
						global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.CALC_OBS_ONLY4MULTI_BASE'));return;
					}
				}
			}
			
			var srcObj:Object = global.getQuantitySourceForCalculation(QTY_AMB_TIME, QTY_COR_TIME, QTY_MASS_TIME, QTY_AMB, QTY_COR, MASS_AMB, QTY_AMB_REAL, QTY_COR_REAL, MASS_AMB_REAL);
			type = srcObj.type;
			qty = srcObj.qty;
			
			/*
			if(QTY_AMB.length>0){
				type  = "LT";
				qty   = Number(QTY_AMB_REAL);
			}else if(QTY_COR.length >0){
				type  = "L15";
				qty   = Number(QTY_COR_REAL);
			}else if(MASS_AMB.length >0){
				type  = "KG";
				qty   = Number(MASS_AMB_REAL);
			}	
			*/
			if(view.fromArm.selectedIndex == -1){
				var url:String = "../phpwrapper/calcvcf.php?frm_baseCd="+baseCode+"&frm_which_type="+type+"&frm_real_amount="+qty+"&frm_real_temp="+TEMP_AMB+"&frm_real_dens="+DENS_COR;
				var urlLoader:URLLoader = new URLLoader();
				urlLoader.addEventListener(Event.COMPLETE, function():void{
					var tmp:XML = XML(urlLoader.data);
					//QTY_AMB  = int(Number(tmp.REAL_LITRE)+0.5).toString();
					//QTY_COR  = int(Number(tmp.REAL_LITRE15)+0.5).toString();
					//MASS_AMB = int(Number(tmp.REAL_KG)+0.5).toString();
					//QTY_AMB  = Number(tmp.REAL_LITRE).toFixed(0);
					//QTY_COR  = Number(tmp.REAL_LITRE15).toFixed(0);
					//MASS_AMB = Number(tmp.REAL_KG).toFixed(0);
					QTY_AMB  = tools.roundString( tmp.REAL_LITRE, 0 );
					QTY_COR  = tools.roundString( tmp.REAL_LITRE15, 0 );
					MASS_AMB = tools.roundString( tmp.REAL_KG, 0 );
					QTY_AMB_REAL  = (tmp.REAL_LITRE).toString();
					QTY_COR_REAL  = (tmp.REAL_LITRE15).toString();
					MASS_AMB_REAL = (tmp.REAL_KG).toString();
				});
				try{urlLoader.load(new URLRequest(url));}catch(e:Error){}
			}else{
				var counter:int = 0;
				var calcBase:Function = function(i:int = 0):void{
					var _qty:Number = qty*Number(bases[i].RATIO);
					dens += bases[i].RATIO*bases[i].TANK_DENS;
					dens_lo += bases[i].RATIO*bases[i].BCLASS_DENS_LO;
					dens_hi += bases[i].RATIO*bases[i].BCLASS_DENS_HI;
					
					var url:String = "../phpwrapper/calcvcf.php?frm_baseCd="+bases[i].BASE_CODE+"&frm_which_type="+type+"&frm_real_amount="+_qty+"&frm_real_temp="+bases[i].Temperature+"&frm_real_dens="+bases[i].TANK_DENS;
					var urlLoader2:URLLoader = new URLLoader();
					urlLoader2.addEventListener(Event.COMPLETE, function():void{
						var tmp:XML = XML(urlLoader2.data);
						//bases[i].amb_vol = tools.roundString( tmp.REAL_LITRE, 0 );
						//bases[i].cor_vol = tools.roundString( tmp.REAL_LITRE15, 0 );
						//bases[i].liq_kg  = tools.roundString( tmp.REAL_KG, 0 );
						bases[i].amb_vol = (tmp.REAL_LITRE);
						bases[i].cor_vol = (tmp.REAL_LITRE15);
						bases[i].liq_kg  = (tmp.REAL_KG);
						if(bases.length > (i+1)){
							calcBase(i+1);
						}else{
							bases.refresh();
							updateBaseDetail();	
							QTY_AMB  = tools.roundString( baseTotals[0].qtyTotal, 0 );
							QTY_COR  = tools.roundString( baseTotals[0].stdTotal, 0 );
							MASS_AMB = tools.roundString( baseTotals[0].massTotal, 0 );
							QTY_AMB_REAL  = baseTotals[0].qtyTotal;
							QTY_COR_REAL  = baseTotals[0].stdTotal;
							MASS_AMB_REAL = baseTotals[0].massTotal;
							baseTotals[0].qtyTotalRound = QTY_AMB;
							baseTotals[0].stdTotalRound = QTY_COR;
							baseTotals[0].massTotalRound = MASS_AMB;
							baseTotals.refresh();
							
							//DENS_COR = dens.toString();
							//DENS_COR_LO = dens_lo;
							//DENS_COR_HI = dens_hi;
							DENS_COR = tools.roundString( dens.toString(), 3);
							DENS_COR_LO = Number(tools.roundString( String(dens_lo), 3));
							DENS_COR_HI = Number(tools.roundString( String(dens_hi), 3));
							if(bases.length == 1){
								DENS_COR = bases[0].TANK_DENS;
								DENS_COR_LO = bases[0].BCLASS_DENS_LO;
								DENS_COR_HI = bases[0].BCLASS_DENS_HI;
							}
						}
					});
					try{urlLoader2.load(new URLRequest(url));}catch(e:Error){}
				}
				calcBase(0);				
			}
		}
		public function bindToProd():void{
			//TEMP_AMB = view.toTank.selectedItem.tankTemp;
			//DENS_COR = view.toTank.selectedItem.tankDens;
			if ( view.toTank.selectedIndex >= 0 )
			{
				DENS_COR = view.toTank.selectedItem.tankDens;
				DENS_COR_LO = view.toTank.selectedItem.BCLASS_DENS_LO;
				DENS_COR_HI = view.toTank.selectedItem.BCLASS_DENS_HI;
			}
		}
		public function bindFromProd():void{
			//TEMP_AMB = view.fromTank.selectedItem.tankTemp;
			//DENS_COR = view.fromTank.selectedItem.tankDens;
			if ( view.fromTank.selectedIndex >= 0 )
			{
				DENS_COR = view.fromTank.selectedItem.tankDens;
				DENS_COR_LO = view.fromTank.selectedItem.BCLASS_DENS_LO;
				DENS_COR_HI = view.fromTank.selectedItem.BCLASS_DENS_HI;
			}
		}
		public function updateArmData():void{
			if(view.fromArm.selectedItem is String || view.fromArm.selectedIndex == -1){
				view.fromArm.selectedIndex = -1;
				view.fromArm.selectedItem  = null;
				view.fromArm.textInput.text = "";
				return;
			}
			meters.removeAll();
			
			var dens_lo:Number=0;
			var dens_hi:Number=0;
			var dens:Number=0;
			
			for (var i:int = 0 ; i <bases.length; i++){
				for each (var arm:Object in view.fromArm.selectedItem.armData){
					if(arm.STREAM_BASECODE == bases[i].BASE_CODE &&
						arm.RAT_PROD_PRODCODE == dp && arm.RAT_PROD_PRODCMPY ){
						bases[i]["TANK_CODE"] = arm.STREAM_TANKCODE;
						bases[i]["TANK_DENS"] = arm.STREAM_TANKDEN;
						bases[i]["TANK_DENS_DP"] = arm.STREAM_TANKDEN;
						bases[i]["Temperature"] = "";
						bases[i]["amb_vol"] 	= "";
						bases[i]["cor_vol"] 	= "";
						bases[i]["liq_kg"] 		= "";
						bases[i]["BASE_GUI"]  = bases[i].BASE_CODE+" / "+bases[i].BASE_NAME;
						var meter:Object = ObjectUtil.clone(arm);
						meter.BASE_GUI = bases[i]["BASE_GUI"];
						meter.BASE_NAME = bases[i]["BASE_NAME"];
						meter["open_amb"]  = "";
						meter["close_amb"] = "";
						meter["open_cor"]  = "";
						meter["close_cor"] = "";
						meter["open_kg"]   = "";
						meter["close_kg"]  = "";
						meter.Injector_or_Meter = (Number(bases[i]["BCLASS_NO"])==6)?"T":"F";
						meters.addItem(meter);
						dens_lo += bases[i].RATIO*bases[i].BCLASS_DENS_LO;
						dens_hi += bases[i].RATIO*bases[i].BCLASS_DENS_HI;
						dens += bases[i].RATIO*bases[i].TANK_DENS;
					}
				}
			}
			//DENS_COR_LO = dens_lo;
			//DENS_COR_HI = dens_hi;
			DENS_COR_LO = Number(tools.roundString( String(dens_lo), 3));
			DENS_COR_HI = Number(tools.roundString( String(dens_hi), 3));
			DENS_COR = tools.roundString( String(dens), 3);
			DENS_COR_DP = Number( DENS_COR );
			
			bases.refresh();
			updateMeterDetail();
			updateBaseDetail();
			
			
			
			trace("bold");
		}
		
		
		public function updateMeterDetail():void{
			meterTotals[0].quantity_amb = 0;
			meterTotals[0].quantity_cor = 0
			meterTotals[0].quantity_kg = 0;
			for each(var meter:Object in meters){
				// Ambient
				if(meter["open_amb"]){
					if(isNaN(Number(meter["open_amb"]))){
						meter["open_amb"] = 0;global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.VALUE_NOT_NUM'));
					}else{
						meter["open_amb"] = Math.ceil(Number(meter["open_amb"]));
					}
				}
				if(meter["close_amb"]){
					if(isNaN(Number(meter["close_amb"]))){
						meter["close_amb"] = 0;global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.VALUE_NOT_NUM'));
					}else{
						meter["close_amb"] = Math.ceil(Number(meter["close_amb"]));
					}
				}
				meter["quantity_amb"] = meter["close_amb"] - meter["open_amb"];
				if(isNaN(meter["quantity_amb"]))meter["quantity_amb"]=0;
				meterTotals[0].quantity_amb += meter["quantity_amb"];
				// Corrected
				if(meter["open_cor"]){
					if(isNaN(Number(meter["open_cor"]))){
						meter["open_cor"] = 0;global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.VALUE_NOT_NUM'));
					}else{
						meter["open_cor"] = Math.ceil(Number(meter["open_cor"]));
					}
				}
				if(meter["close_cor"]){
					if(isNaN(Number(meter["close_cor"]))){
						meter["close_cor"] = 0;global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.VALUE_NOT_NUM'));
					}else{
						meter["close_cor"] = Math.ceil(Number(meter["close_cor"]));
					}
				}
				meter["quantity_cor"] = meter["close_cor"] - meter["open_cor"];
				if(isNaN(meter["quantity_cor"]))meter["quantity_cor"]=0;
				meterTotals[0].quantity_cor += meter["quantity_cor"];
				// MASS
				if(meter["open_kg"]){
					if(isNaN(Number(meter["open_kg"]))){
						meter["open_kg"] = 0;global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.VALUE_NOT_NUM'));
					}else{
						meter["open_kg"] = Math.ceil(Number(meter["open_kg"]));
					}
				}
				if(meter["close_kg"]){
					if(isNaN(Number(meter["close_kg"]))){
						meter["close_kg"] = 0;global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.VALUE_NOT_NUM'));
					}else{
						meter["close_kg"] = Math.ceil(Number(meter["close_kg"]));
					}
				}
				meter["quantity_kg"] = meter["close_kg"] - meter["open_kg"];
				if(isNaN(meter["quantity_kg"]))meter["quantity_kg"]=0;
				meterTotals[0].quantity_kg += meter["quantity_kg"];
			}
			meterTotals.refresh();
			
			
		}
		
		public function updateBaseDetail():void{
			
			baseTotals[0].qtyTotal  = 0;
			baseTotals[0].stdTotal  = 0;
			baseTotals[0].massTotal = 0;
			
			
			for each (var base:Object in bases){
				if(base["amb_vol"]){
					if(isNaN(Number(base["amb_vol"]))){
						base["amb_vol"] = 0;global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.VALUE_NOT_NUM'));
					}else{
						//base["amb_vol"] = Math.ceil(Number(base["amb_vol"]));
						//baseTotals[0].qtyTotal+=Number(base["amb_vol"]);
						baseTotals[0].qtyTotal+=Number(base["amb_vol"]);
					}
				}
				if(base["cor_vol"]){
					if(isNaN(Number(base["cor_vol"]))){
						base["cor_vol"] = 0;global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.VALUE_NOT_NUM'));
					}else{
						//base["cor_vol"] = Math.ceil(Number(base["cor_vol"]));
						//baseTotals[0].stdTotal+=Number(base["cor_vol"]);
						baseTotals[0].stdTotal+=Number(base["cor_vol"]);
					}
				}
				if(base["liq_kg"]){
					if(isNaN(Number(base["liq_kg"]))){
						base["liq_kg"] = 0;global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.VALUE_NOT_NUM'));
					}else{
						//base["liq_kg"] = Math.ceil(Number(base["liq_kg"]));
						//baseTotals[0].massTotal+=Number(base["liq_kg"]);
						baseTotals[0].massTotal+=Number(base["liq_kg"]);
					}
				}
			}
			
			baseTotals.refresh();
			
			
		}
		
		public function updateBaseTemp():void{
			for each(var base:Object in bases){
				base["Temperature"] = Number(TEMP_AMB);
			}
			bases.refresh();
		}
		public function updateBaseDens():void{
			for each( var base:Object in bases){
				if ( bases.length == 1 )
				{
					base["TANK_DENS"] = Number(DENS_COR);
				}
				else
				{
					base["TANK_DENS"] = base["TANK_DENS_DP"] * (Number(DENS_COR) / DENS_COR_DP);
					base["TANK_DENS"] = Number(tools.roundString( String(base["TANK_DENS"]), 3));
				}
			}
			bases.refresh();
		}
		
		public function setFilters( params:*=false ): void{
			
			df.formatString = "DD.MM.YYYYHH:NN:SS";
			
			view.pq.errorString = "";
			view.mq.errorString = "";
			view.sq.errorString = "";
			view.aq.errorString = "";
			view.at.errorString = "";
			view.sd.errorString = "";
			
			QTY_AMB_REAL                	=  "";
			QTY_COR_REAL					=  "";
			MASS_AMB_REAL				=  "";
			
			PLN_AMB					=  "0";
			AVAIL_AMB				=  "0";
			QTY_AMB                	=  "";
			TEMP_AMB       		    =  "";
			DENS_COR		 		=  "";
			QTY_COR					=  "";
			MASS_AMB				=  "";
			TEMP_COR				=  "";
			ALTERNATE_QTY			=  "";
			
			TRIP_NUM				=  "";
			CUSTOMER				=  "";
			TAS_NUM					=  "";
			COMMENT					=  "";
			MVITM_KEY				=  "";
			MVITM_ITEM_ID			=  "";
			
			MVITM_PRODCODE_TO		= "";
			
			PLANT_TO				= "";
			STR_TANK_TO				= "";
			STR_PROD_TO				= "";
			STR_ARM_FROM			= "";
			bases 					= new ArrayCollection();
			meters 					= new ArrayCollection();
			arms 					= new ArrayCollection();
			baseTotals				= new ArrayCollection();
			
			TIME_START = new Date(global.serverDateTime.time);
			TIME_END   = new Date(global.serverDateTime.time);
			
			INL1 = params["movItem"].MVITM_MOVE_ID;
			INL2 = params["movItem"].MVITM_KEY;
			INL3 = params["movItem"].MVITM_TERMINAL;
			
			IIL1 = params["movItem"].clnItemId;
			IIL2 = params["movItem"].clnItemKey;
			IIL3 = params["movItem"].clnItemStatus;
			PLANNED_QTY_UNIT = params["movItem"].clnItemProdUnit;
						
			baseTotals.addItem({total:mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.LABEL.ALL_TOTAL')});
			baseTotals.refresh();
			meterTotals				= new ArrayCollection();
			meterTotals.addItem({total:"", total1:mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.LABEL.OBS_TOTAL'),total2:mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.LABEL.STD_TOTAL'),total3:mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.LABEL.MASS_TOTAL')});
			meterTotals.refresh();
			
			trace(ObjectUtil.toString(params));
			if(params["movVehicle"]==null){
				TANKER = "Generic Nom Vol";
			}else{
				TANKER = params["movVehicle"]["CODE_NAME"];
			}
			var found:Boolean = false;
			for (var j:int = 0; j < view.carrierCode.dataProvider.length; j++) 
			{
				view.carrierCode.selectedIndex = j;
				tankers = new ArrayCollection(view.carrierCode.selectedItem.tankers);
				for (var k:int = 0; k < view.tankerCode.dataProvider.length; k++) 
				{
					view.tankerCode.selectedIndex = k;
					if(view.tankerCode.selectedItem == TANKER){
						found = true;
						break;
					}
					
				}
				if(found)break;				
			}
			if ( found == false )
			{
				view.tankerCode.selectedIndex = -1;
			}
			
			var myTextFormat:TextFormat = new TextFormat();
			myTextFormat.align = "center";
			view.dg2h.setStyle("headerTextFormat", myTextFormat); 
			
			DM.SpecialMovements.populateCallback = function(o:Object):void{
				setFiltersST2(params);
			}
			DM.SpecialMovements.reload();
		}
		public function setFiltersST2( params:*=false ): void{
			
			var i:int;

			
			this.parameters = params;
			//this.view.currentState = params["movItem"].clnItemType;
			var typeID:Number = params["movItem"].payload.MVITM_TYPE;
			if ( typeID == 0 )
			{
				this.view.currentState = "Receipt";
			}
			else if ( typeID == 1 )
			{
				this.view.currentState = "Disposal";
			}
			else if ( typeID == 2 )
			{
				this.view.currentState = "Transfer";
			}
			else
			{
				this.view.currentState = "Disposal";
			}
			
			trace(this.view.currentState);
			
			MVITM_KEY = params["movItem"].MVITM_KEY;
			MVITM_ITEM_ID = params["movItem"].MVITM_ITEM_ID;
			
			TRIP_NUM = MVITM_KEY + MVITM_ITEM_ID;
			
			PLN_AMB  = params["movItem"].clnItemProdQty;
			//QTY_AMB  = params["movItem"].clnItemProdQty;
			//AVAIL_AMB	 = String(Number(params["movItem"].clnItemProdQty) - Number(params["movItem"].ClnItemQtyMove));
			AVAIL_AMB	 = String(Number(params["movItem"].clnItemProdQty) - Number(params["movItem"].clnItemQtySchd));
			
			ORDER_NUMBER = params["movItem"].clnItemId;
			
			PLANT_TO 		= params["movItem"].clnItemPlantTo;
			STR_TANK_TO 	= params["movItem"].MVITM_TANK_TO;
			STR_PROD_TO 	= params["movItem"].clnItemProductTo;
			TANK_TO  		= new ArrayCollection();
			PROD_TO  		= new ArrayCollection();
			
			PLANT_FROM 		= params["movItem"].clnItemPlantFrom;
			STR_TANK_FROM 	= params["movItem"].MVITM_TANK_FROM;
			STR_PROD_FROM 	= params["movItem"].clnItemProductFrom;
			TANK_FROM  		= new ArrayCollection();
			PROD_FROM  		= new ArrayCollection();
			
			
			if(view.currentState == "Receipt" || view.currentState == "Transfer"){
				for each(var supplier:Object in DM.SpecialMovements.terminalData[0]["suppliers"]){
					if(supplier["supplierCode"] == params["movItem"].MVITM_PRODCMPY_TO){
						for each(var tanks:Object in supplier["tanks"]){
							for each (var prods:Object in tanks["tankData"]){
								if(prods["RAT_PROD_PRODCODE"] == params["movItem"].MVITM_PRODCODE_TO){
									TANK_TO.addItem(tanks);
									break;
								}	
							}
						}
					}
				}
				
				// make selection
				for(i = 0 ; i < TANK_TO.length; i++){
					if(TANK_TO[i]["tankCode"] == params["movItem"].MVITM_TANK_TO){
						view.toTank.selectedIndex = i;
						bindToProd();
						break;
					}
				}
				/*
				for(i = 0 ; i < PROD_TO.length; i++){
				if(PROD_TO[i]["PROD_CODE"] == params["movItem"].MVITM_PRODCODE_TO){
				view.toDrawer.selectedIndex = i;
				break;
				}
				}*/
			}
			
			if(view.currentState == "Disposal" || view.currentState == "Transfer"){
				for each(var supplier:Object in DM.SpecialMovements.terminalData[0]["suppliers"]){
					if(supplier["supplierCode"] == params["movItem"].MVITM_PRODCMPY_FROM){
						for each(var tanks:Object in supplier["tanks"]){
							for each (var prods:Object in tanks["tankData"]){
								if(prods["RAT_PROD_PRODCODE"] == params["movItem"].MVITM_PRODCODE_FROM){
									TANK_FROM.addItem(tanks);
									break;
								}	
							}
						}
					}
				}
				
				// make selection
				for(i = 0 ; i < TANK_FROM.length; i++){
					if(TANK_FROM[i]["tankCode"] == params["movItem"].MVITM_TANK_FROM){
						view.fromTank.selectedIndex = i;
						bindFromProd();
						break;
					}
				}
				/*
				for(i = 0 ; i < PROD_FROM.length; i++){
				if(PROD_FROM[i]["PROD_CODE"] == params["movItem"].MVITM_PRODCODE_FROM){
				view.fromDrawer.selectedIndex = i;
				break;
				}
				}*/
			}
			
			
			if(view.currentState == "Receipt"){
				dp = params["movItem"].MVITM_PRODCODE_TO;
				dpcmpy = params["movItem"].MVITM_PRODCMPY_TO;
			}else{
				dp = params["movItem"].MVITM_PRODCODE_FROM;
				dpcmpy = params["movItem"].MVITM_PRODCMPY_FROM;
			}
			DM.SpecialMovements.getBases(function(o:Object):void{
				if(o.count!=1){
					if(view.currentState == "Receipt"||view.currentState == "Transfer"){
						global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVTRAN.MESSAGE.SCHD_PROD_NOT_BASE_PROD'));
						params.close();
						return;
					}
				}
				if(view.currentState == "Disposal"){
					bases = new ArrayCollection(o.data);
					trace("BASES>>", ObjectUtil.toString(o));
					// bases are now here, lets go trough it to filter arm
					for each(var comparm:Object in DM.SpecialMovements.armData){
						if(comparm.companyCode == params["movItem"].MVITM_PRODCMPY_FROM){
							for each (var arm:Object in comparm.arms){
								var found:Boolean = false;
								for each(var base:Object in bases){
									found = false;
									for each(var basearm:Object in arm.armData){
										if(basearm.STREAM_BASECODE == base.BASE_CODE){
											found = true;break;
										}
									}
									if(!found)break;
								}
								if(found){
									arms.addItem(arm);
									trace(arm.armCode);
								}						
							}
							break;
						}
					}
				}
			}, (dp+"___"+dpcmpy), 1);		
			
			
			
			
			trace(">>>>>",ObjectUtil.toString(params));
			
			
		}
	}
}