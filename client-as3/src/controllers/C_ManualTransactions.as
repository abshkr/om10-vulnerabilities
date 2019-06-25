package controllers
{
	import com.adobe.fiber.runtime.lib.DateTimeFunc;
	
	import components.DKI_AlertBox;
	import components.DKI_PassBox;
	import components.MessageDialog;
	import components.ModalEquipmentType;
	import components.PasswordCheckDlg;
	import components.ViewPopupDlg;
	
	import controllers.C_ManualTransactionsCal;
	
	import dm.DM;
	import dm.collections.dmManualTransactions;
	import dm.models.dmManualTransaction;
	import dm.models.dmModel;
	import dm.remoteDataService;
	import dm.utils.tools;
	
	import flash.display.DisplayObject;
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.MouseEvent;
	import flash.globalization.LocaleID;
	import flash.text.TextFormat;
	import flash.utils.Timer;
	import flash.utils.setTimeout;
	
	import mx.collections.ArrayCollection;
	import mx.collections.errors.ItemPendingError;
	import mx.controls.Alert;
	import mx.controls.Button;
	import mx.controls.DateField;
	import mx.core.FlexGlobals;
	import mx.events.CloseEvent;
	import mx.events.DataGridEvent;
	import mx.events.EffectEvent;
	import mx.events.FlexEvent;
	import mx.events.ListEvent;
	import mx.events.ValidationResultEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	import mx.rpc.CallResponder;
	import mx.rpc.events.FaultEvent;
	import mx.rpc.events.ResultEvent;
	import mx.rpc.http.HTTPService;
	import mx.utils.ObjectUtil;
	import mx.utils.StringUtil;
	
	import renderers.DKI_HeaderColumn_Renderer;
	
	import spark.components.gridClasses.GridColumn;
	import spark.components.gridClasses.IGridItemRenderer;
	import spark.core.NavigationUnit;
	import spark.events.GridEvent;
	import spark.events.GridItemEditorEvent;
	import spark.events.GridSelectionEvent;
	import spark.events.IndexChangeEvent;
	import spark.formatters.DateTimeFormatter;
	
	import views.v_ManualTransactions;
	import views.v_ManualTransactionsData;
	import views.v_Seal_MT;
	import views.v_Seal_OO;

	public class C_ManualTransactions extends EventDispatcher
	{
		[Bindable] public var view                 : v_ManualTransactions;
		
		[Bindable] public var readOnly             : Boolean = false;
		[Bindable] public var canReset             : Boolean = false;
		[Bindable] public var canUpdate            : Boolean = false;
		[Bindable] public var canCreate            : Boolean = false;
		[Bindable] public var canDelete            : Boolean = false;
		[Bindable] public var hasPassword          : Boolean = false;
		
		[Bindable] public var isSubmitEnabled      : Boolean = false;
		[Bindable] public var isLoadEnabled        : Boolean = true;
		[Bindable] public var isSaveEnabled        : Boolean = true;
		
		[Bindable] public var labelWidth           : int     = 100;
		[Bindable] public var labelHeight          : int     = 26;
		[Bindable] public var fieldWidth           : int     = 150;
		[Bindable] public var fieldHeight          : int     = 26;
		[Bindable] public var spaceWidth           : int     = 20;
		[Bindable] public var spaceHeight          : int     = -2;
		[Bindable] public var frme                 : String;
		
		[Bindable] public var isMTTypeEnabled      : Boolean = true;
		[Bindable] public var isSupplierEnabled    : Boolean = false;
		[Bindable] public var isCustomerEnabled    : Boolean = false;
		[Bindable] public var isTripNoEnabled      : Boolean = false;
		[Bindable] public var isOrderNoEnabled     : Boolean = false;
		[Bindable] public var isMgrOrderNoEnabled  : Boolean = false;
		[Bindable] public var isNomiItemIDEnabled  : Boolean = false;
		[Bindable] public var isCarrierEnabled     : Boolean = false;
		[Bindable] public var isTankerEnabled      : Boolean = false;
		[Bindable] public var isDriverEnabled      : Boolean = false;
		[Bindable] public var isTASRefEnabled      : Boolean = false;
		[Bindable] public var isUserCommentsEnabled: Boolean = false;
		
		[Bindable] public var isClearAllEnabled    : Boolean = true;
		[Bindable] public var isAddTransferEnabled : Boolean = true;
		[Bindable] public var isDelTransferEnabled : Boolean = true;
		[Bindable] public var isCalDrawerEnabled   : Boolean = true;
		[Bindable] public var isGetDensityEnabled  : Boolean = true;
		
		[Bindable] public var isAddMeterEnabled    : Boolean = true;
		[Bindable] public var isDelMeterEnabled    : Boolean = true;
		[Bindable] public var isAddBaseProdEnabled : Boolean = true;
		[Bindable] public var isDelBaseProdEnabled : Boolean = true;
		
		[Bindable] public var isTransferGridEnabled: Boolean = true;
		[Bindable] public var isMeterGridEnabled   : Boolean = true;
		[Bindable] public var isBaseProdGridEnabled: Boolean = true;
		
		[Bindable] public var isBsTab1Enabled      : Boolean = true;
		[Bindable] public var isBsTab2Enabled      : Boolean = false;
		[Bindable] public var isMtrTab1Enabled     : Boolean = false;
		[Bindable] public var isMtrTab2Enabled     : Boolean = true;
		
		private var isRejected                     : int     = REJECT_OFF;
		private var REJECT_OFF                     : int     = 0;         // 0: non reject
		private var REJECT_ON                      : int     = 1;         // 1: Rejected from MT
		
		private var LM_DIRECT                      : int     = 0;         // 0: MT screen startup directly
		private var LM_SAVED                       : int     = 1;         // 1: MT screen startup by loading saved MT data
		private var LM_NORMAL                      : int     = 2;         // 2: MT screen startup by calling from other screens
		private var load_mode                      : int     = LM_DIRECT;
		
		private var REPOST_OFF                     : int     = 0;         // 0: non REPOST
		private var REPOST_ON                      : int     = 1;         // 1: REPOST from Load Schedule screen
		private var isRepost                       : int     = REPOST_OFF;
		
		private var pending                        : Boolean = false;
		private var dialog                         : DKI_PassBox      = new DKI_PassBox();
		private var chkPass                        : PasswordCheckDlg = new PasswordCheckDlg();
		
		private var DEN_FACTOR                     : int     = 1000;
		private var QTY_FACTOR                     : int     = 1000;
		private var TEMP_FACTOR                    : int     = 100;
		private var DENSITY_DECIMAL                : int     = 10;
		private var TEMP_DECIMAL                   : int     = 100;
		private var ADDITIVE_DECIMAL               : int     = 1000;
		private var QTY_DECIMAL                    : int     = 1000;
		
		private var TEMP_MAX                       : Number  = 150;
		private var TEMP_MIN                       : Number  = -18;
		private var DEN_MAX                        : Number  = 1075;
		private var DEN_MIN                        : Number  = 653;
		private var OBS_MAX                        : Number  = 999999999;
		private var OBS_MIN                        : Number  = 0;
		private var STD_MAX                        : Number  = 999999999;
		private var STD_MIN                        : Number  = 0;
		private var MASS_MAX                       : Number  = 999999999;
		private var MASS_MIN                       : Number  = 0;
		
		private var _transferRowIdx                : int;
		private var _transferRowMax                : int;
		private var _CalAllBasesForAllTrsfsCallback: Function;
		private var _feedbackCounter               : int     = -1;
		private var totalSTDL                      : Number  = 0;
		private var totalKG                        : Number  = 0;
		private var calExcl                        : ArrayCollection;
		
		// Control and Data members for REPOST.
		private var _transferRowIdx_repost         : int     = 0;
		private var _transferRowMax_repost         : int     = 0;
		private var trsfs_repost                   : ArrayCollection;
		private var bs_no_repost                   : int     = 0;
		private var mtr_no_repost                  : int     = 0;
		private var mt_body_repost                 : String  = "";
		private var mt_trsf_repost                 : String  = "";
		private var mt_bp_repost                   : String  = "";
		private var mt_mtr_repost                  : String  = "";
		private var mt_bp_tol_repost               : String  = "";
		private var mt_mtr_tol_repost              : String  = "";
		private var seal_range                     : String  = "";
		
		private var _trsfIdx_ext                   : int     = 0;         // for maximizing population of bases & meters info.
		
		private var alertDiag                      : DKI_AlertBox;
		
		private var xmlBody                        : XML     = null;
		
		//public var loadMTdataPopup               : ViewPopupDlg = new ViewPopupDlg( "Load Manual Transactions Data", new v_ManualTransactionsData(), closeDialogHandler);
		public var loadMTdataPopup                 : ViewPopupDlg;
		
		public var mtcal                           : Object;
		
		// Control members for getting density from tank.
		public var trsfIndex                       : int     = 0;         // The start index in transfers.
		public var trsfGetDenCount                 : int     = 0;         // The number of transfers of which density retrieved from tank.
		
		private var CLNID__TRSF_SOLD_TO            : int     = 0;
		private var CLNID__TRSF_DELV_NUM           : int     = 1;
		private var CLNID__TRSF_DELV_LOC           : int     = 2;
		private var CLNID__TRSF_EQPT_ID            : int     = 3;
		private var CLNID__TRSF_CMPT_NO            : int     = 4;
		private var CLNID__TRSF_DRWR_CODE          : int     = 5;
		private var CLNID__TRSF_PROD_CODE          : int     = 6;
		private var CLNID__TRSF_ARM_CODE           : int     = 7;
		private var CLNID__TRSF_QTY_PLAN           : int     = 8;
		private var CLNID__TRSF_QTY_LOAD           : int     = 9;
		private var CLNID__TRSF_DENSITY            : int     = 10;
		private var CLNID__TRSF_TEMP               : int     = 11;
		private var CLNID__TRSF_QTY_AMB            : int     = 12;
		private var CLNID__TRSF_QTY_COR            : int     = 13;
		private var CLNID__TRSF_LOAD_KG            : int     = 14;
		
		public var nextSealLoader:remoteDataService = new remoteDataService( "LoadScheduleService.getNextSeal", null, nextSealLoader_resultHandler, 1 );
		public var tripSealLoader:remoteDataService = new remoteDataService( "LoadScheduleService.getTripSeal", null, tripSealLoader_resultHandler, 1 );
		public var nextSealString:String = "";
		public var tripSealString:String = "";
		public var sealList:ArrayCollection = new ArrayCollection();
		private var sealPopup:v_Seal_MT=new v_Seal_MT();
		public var sealsPopup:ViewPopupDlg = new ViewPopupDlg( "Seal Numbers", sealPopup, afterCloseSealWindow );
		private var sealPopupOO:v_Seal_OO=new v_Seal_OO();
		public var sealsPopupOO:ViewPopupDlg = new ViewPopupDlg( "Seal Numbers", sealPopupOO, afterCloseSealWindowOO );
		
		
		public function C_ManualTransactions()
		{

		}
		
		
		public function nextSealLoader_resultHandler():void
		{
			this.nextSealString =  nextSealLoader.dataString;
			//if ( this.isOrderNoEnabled ) 
			//{
			//	view.seal_range.text = nextSealString + '=??';
			//}
		}
		
		public function tripSealLoader_resultHandler():void
		{
			this.tripSealString =  tripSealLoader.dataString;
			//if ( this.isTripNoEnabled ) 
			{
				view.seal_range.text = tripSealString;
			}
		}
		/*
		public function viewSealWindow2(event:MouseEvent):void
		{
			sealPopup = PopUpManager.createPopUp(view,v_Seal, true) as v_Seal;
			PopUpManager.centerPopUp(sealPopup);
			var trip:String="";
			var supp:String="";
			if ( view.new_supplier.selectedIndex >= 0 ) {
				supp = view.new_supplier.selectedItem.CMPY_CODE;
			}
			if ( view.new_trip.selectedIndex >= 0 ) {
				trip = view.new_trip.selectedItem.SHLS_TRIP_NO;
			}
			sealPopup.setParams(supp, trip);
			sealPopup.loadStatus = 'F';
			
		}
		*/
		
		public function viewSealWindow(event:MouseEvent)
		{
			this.sealsPopup.popupTitle = mx.resources.ResourceManager.getInstance().getString('default','m_seals');
			//this.sealsPopup.setSecurity( this.readOnly, this.canUpdate, this.canCreate, this.canDelete, this.hasPassword );
			
			this.sealsPopup.parentWidth = 620;
			this.sealsPopup.parentHeight = 640;
			
			trace ( "*******************Pop up a screen to manage partnership!");
			sealsPopup.openDialog();
			
			var trip:String="";
			var supp:String="";
			if ( view.new_supplier.selectedIndex >= 0 ) {
				supp = view.new_supplier.selectedItem.CMPY_CODE;
			}
			if ( view.new_trip.selectedIndex >= 0 ) {
				trip = view.new_trip.selectedItem.SHLS_TRIP_NO;
			}
			
			sealPopup.loadStatus = 'F';
			sealPopup.setParams(supp, trip);
		}
		
		public function afterCloseSealWindow():void
		{
			var trip:String="";
			var supp:String="";
			if ( view.new_supplier.selectedIndex >= 0 ) {
				supp = view.new_supplier.selectedItem.CMPY_CODE;
			}
			if ( view.new_trip.selectedIndex >= 0 ) {
				trip = view.new_trip.selectedItem.SHLS_TRIP_NO;
			}
			
			if ( view.new_trans_type.selectedIndex == 0 ) {
				this.tripSealLoader.service(trip, supp);
			}
		}
		
		public function viewSealWindowOO(event:MouseEvent)
		{
			this.sealsPopupOO.popupTitle = mx.resources.ResourceManager.getInstance().getString('default','m_seals');
			//this.sealsPopup.setSecurity( this.readOnly, this.canUpdate, this.canCreate, this.canDelete, this.hasPassword );
			
			this.sealsPopupOO.parentWidth = 620;
			this.sealsPopupOO.parentHeight = 640;
			
			trace ( "*******************Pop up a screen to manage partnership!");
			sealsPopupOO.openDialog();
			
			var ord:String="";
			var supp:String="";
			if ( view.new_supplier.selectedIndex >= 0 ) {
				supp = view.new_supplier.selectedItem.CMPY_CODE;
			}
			if ( view.new_order.selectedIndex >= 0 ) {
				ord = view.new_order.selectedItem.ORDER_CUST_ORDNO;
			}
			
			sealPopupOO.loadStatus = 'F';
			sealPopupOO.setParams(supp, ord);
		}
		
		public function afterCloseSealWindowOO():void
		{
			var ord:String="";
			var supp:String="";
			if ( view.new_supplier.selectedIndex >= 0 ) {
				supp = view.new_supplier.selectedItem.CMPY_CODE;
			}
			if ( view.new_order.selectedIndex >= 0 ) {
				ord = view.new_order.selectedItem.ORDER_CUST_ORDNO;
			}
			
			if ( view.new_trans_type.selectedIndex == 1 ) {
				view.seal_range.text = sealPopupOO.sealRange;
				this.sealList.source = sealPopupOO.origData.source;
			}
		}
		
		/*
		[Bindable]
		public function get view():v_ManualTransactions
		{
		return view;
		}
		
		public function set view(value:v_ManualTransactions):void
		{
		view = value;
		}
		*/
		
		//--------------------------------------------------------------------//
		//                                                                    //
		//     Initialization and Status Control Member Functions  [START]    //
		//                                                                    //
		//--------------------------------------------------------------------//
		
		/**
		 *  Initialize control variables.
		 *  
		 */
		public function initialize()
		{
			// Initialize items status.
			isMTTypeEnabled             = true;
			isSupplierEnabled           = false;
			isCustomerEnabled           = false;
			
			isTripNoEnabled             = false;
			isOrderNoEnabled            = false;
			isMgrOrderNoEnabled         = true;
			isNomiItemIDEnabled         = false;
			view.new_trip.required      = false;
			view.new_order.required     = false;
			view.new_nomi_item.required = false;
			
			isCarrierEnabled            = false;
			isTankerEnabled             = false;
			isDriverEnabled             = false;
			isTASRefEnabled             = true;
			isUserCommentsEnabled       = true;
			
			isAddTransferEnabled        = false;
			isDelTransferEnabled        = false;
			isCalDrawerEnabled          = false;
			isGetDensityEnabled         = false;
			isAddMeterEnabled           = false;
			isDelMeterEnabled           = false;
			isAddBaseProdEnabled        = false;
			isDelBaseProdEnabled        = false;
			
			isBsTab1Enabled             = true;
			isBsTab2Enabled             = false;
			
			isMtrTab1Enabled            = false;
			isMtrTab2Enabled            = true;
			
			isSubmitEnabled             = false;
			
			view.new_mgr_cmpy_open_order.text = "";
			view.new_customer_cd.text         = "";
			view.new_delv_loc.text            = "";
			view.new_delv_num.text            = "";
			view.new_tas_ref.text             = "";
			view.new_user_comments.text       = "";
			view.seal_range.text              = "";
			
			updateStatus();
			
			DM.ManualTransactions.initialize(view.currentState);
			DM.ManualTransactions.transferCallback = function():void{
				refreshBaseMeter(null);
			
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function initializeByLevel(level:String)
		{
			DM.ManualTransactions.initialize(view.currentState);
			DM.ManualTransactions.transferCallback = function():void{
				refreshBaseMeter(null);
			}
		}
		
		/**
		 *  Reset items selection.
		 *  
		 */
		public function resetSettings()
		{
			// Reset items selection.
			//view.new_trans_type.selectedItem = -1;
			view.new_supplier.selectedIndex   = -1;
			view.new_customer.selectedIndex   = -1;
			view.new_trip.selectedIndex       = -1;
			view.new_order.selectedIndex      = -1;
			view.new_nomi_item.selectedIndex  = -1;
			view.new_carrier.selectedIndex    = -1;
			view.new_tanker.selectedIndex     = -1;
			view.new_user.selectedIndex       = -1;
			
			view.new_mgr_cmpy_open_order.text = "";
			view.new_customer_cd.text         = "";
			view.new_delv_loc.text            = "";
			view.new_delv_num.text            = "";
			view.new_tas_ref.text             = "";
			view.new_user_comments.text       = "";
			view.seal_range.text              = "";
			
			// ACC_BASE_ADJ
//			DM.ManualTransactions.base_std_total  = 0;
//			DM.ManualTransactions.base_mass_total = 0;
			DM.ManualTransactions.initMemberValues();
			updateAccBaseDisp(0);
			resetControlVar();
		}
		
		/**
		 *  Reset items selection by different level.
		 *  
		 */
		public function resetSettingsByLevel(level:String)
		{
			// Reset items selection.
			//view.new_trans_type.selectedItem = -1;
			switch (level)
			{
				case 'SUPPLIER':
					view.new_customer.selectedIndex  = -1;
					view.new_trip.selectedIndex      = -1;
					view.new_order.selectedIndex     = -1;
					view.new_nomi_item.selectedIndex = -1;
					view.new_carrier.selectedIndex   = -1;
					view.new_tanker.selectedIndex    = -1;
					view.new_user.selectedIndex      = -1;
					break;
				case 'CUSTOMER':
					view.new_order.selectedIndex     = -1;
					view.new_carrier.selectedIndex   = -1;
					view.new_tanker.selectedIndex    = -1;
					view.new_user.selectedIndex      = -1;
					break;
				case 'TRIP':
					view.new_carrier.selectedIndex   = -1;
					view.new_tanker.selectedIndex    = -1;
					view.new_user.selectedIndex      = -1;
					break;
				case 'OPEN_ORDER_NO':
					view.new_carrier.selectedIndex   = -1;
					view.new_tanker.selectedIndex    = -1;
					view.new_user.selectedIndex      = -1;
					break;
				case 'CARRIER':
					view.new_tanker.selectedIndex    = -1;
					break;
				case 'TANKER':
					break;
			}
			
			
			
			// ACC_BASE_ADJ
//			DM.ManualTransactions.base_std_total  = 0;
//			DM.ManualTransactions.base_mass_total = 0;
			DM.ManualTransactions.initMemberValuesByLevel(level);
			
			updateAccBaseDisp(0);
			resetControlVar();
		}
		
		/**
		 *  
		 *  
		 */
		public function resetControlVar():void
		{
			// Reset control variables
			DM.ManualTransactions.needRefreshBaseprodTotalDataArr = true;
			DM.ManualTransactions.isAccBaseAdjusted               = false;
		}
		
		/**
		 *  Clear Open Order relevant text.
		 *  
		 */
		public function clearTextInput_OO()
		{
			// Clear the following Open Order related text input.
			view.new_mgr_cmpy_open_order.text = "";
			view.new_customer_cd.text         = "";
			view.new_delv_loc.text            = "";
			view.new_delv_num.text            = "";
		}
		
		/**
		 *  Update items status on the screen.
		 *  
		 */
		public function updateStatus():void
		{
			trace("|||||updateStatus()|||||");
			
			// Transaction Type
			if (view.new_trans_type.selectedIndex > -1)
			{
				// Enable dropdown lists below.
				isSupplierEnabled = true;
				
				// Update the required flag
				switch(view.new_trans_type.selectedItem.id)
				{
					case "S":  // Shipment(Non Open Order)
					case "N":  // Nomination
						view.new_trip.required      = true;
						view.new_customer.required  = false;
						view.new_order.required     = false;
						view.new_nomi_item.required = false;
						
						break;
					case "O":  // Open Order
						isCustomerEnabled           = true;
						view.new_trip.required      = false;
						view.new_customer.required  = true;
						view.new_order.required     = true;
						view.new_nomi_item.required = false;
						
						break;
					/* 0711 Merged with shipment
					case "N":  // Nomination
					view.new_trip.required = false;
					view.new_order.required = false;
					view.new_nomi_item.required = true;
					break;
					*/
					default:
						break;
				}
			}
			else
			{
				// Disable dropdown lists below.
				isSupplierEnabled           = false;
				isCustomerEnabled           = false;
				isTripNoEnabled             = false;
				view.new_trip.required      = false;
				view.new_customer.required  = false;
				view.new_order.required     = false;
				view.new_nomi_item.required = false;
				isCarrierEnabled            = false;
				isTankerEnabled             = false;
				isDriverEnabled             = false;
			}
			
			// Supplier
			if (view.new_supplier.selectedIndex > -1)
			{
				if (view.new_trans_type.selectedIndex > -1)
				{
					// Enable dropdown lists below.
					switch(view.new_trans_type.selectedItem.id)
					{
						case "S":  // Shipment(Non Open Order)
						case "N":  // Nomination
							isTripNoEnabled             = true;
							isCustomerEnabled           = false;
							isOrderNoEnabled            = false;
							isNomiItemIDEnabled         = false;
							view.new_trip.required      = true;
							view.new_customer.required  = false;
							view.new_order.required     = false;
							view.new_nomi_item.required = false;
							
							// Reset following items' selection.
							view.new_order.selectedIndex     = -1;
							view.new_nomi_item.selectedIndex = -1;
							
							break;
						case "O":  // Open Order
							isTripNoEnabled             = false;
							isCustomerEnabled           = true;
							if (view.new_customer.selectedIndex > -1)
							{
								isOrderNoEnabled        = true;
							}
							else
							{
								isOrderNoEnabled        = false;
								// Reset following items' selection.
								view.new_order.selectedIndex = -1;
							}
							isNomiItemIDEnabled         = false;
							view.new_trip.required      = false;
							view.new_customer.required  = true;
							view.new_order.required     = true;
							view.new_nomi_item.required = false;
							
							// Reset following items' selection.
							view.new_trip.selectedIndex      = -1;
							view.new_nomi_item.selectedIndex = -1;
							
							break;
						/*  0711 Merged with shipment
						case "N":  // Nomination
						isTripNoEnabled = false;
						isOrderNoEnabled = false;
						isNomiItemIDEnabled = true;
						view.new_trip.required = false;
						view.new_order.required = false;
						view.new_nomi_item.required = true;
						
						// Reset following items' selection.
						view.new_trip.selectedIndex = -1;
						view.new_order.selectedIndex = -1;
						
						break;
						*/
						default:
							break;
					}
					///isDriverEnabled = true;
				}
			}
			else
			{
				// Disable dropdown lists below.
				isTripNoEnabled     = false;
				isCustomerEnabled   = false;
				isOrderNoEnabled    = false;
				isNomiItemIDEnabled = false;
				
				// Update the required flag
				if (view.new_trans_type.selectedIndex > -1)
				{
					switch(view.new_trans_type.selectedItem.id)
					{
						case "S":  // Shipment(Non Open Order)
						case "N":  // Nomination
							view.new_trip.required      = true;
							view.new_customer.required  = false;
							view.new_order.required     = false;
							view.new_nomi_item.required = false;
							
							break;
						case "O":  // Open Order
							view.new_trip.required      = false;
							view.new_customer.required  = true;
							view.new_order.required     = true;
							view.new_nomi_item.required = false;
							
							break;
						/*  0711 Merged with shipment
						case "N":  // Nomination
						view.new_trip.required = false;
						view.new_order.required = false;
						view.new_nomi_item.required = true;
						break;
						*/
						default:
							break;
					}
				}
				else
				{
					view.new_trip.required      = false;
					view.new_customer.required  = false;
					view.new_order.required     = false;
					view.new_nomi_item.required = false;
				}
				
				///isDriverEnabled = false;
			}
			
			// Trip / Open Order / Nomination Item
			if (view.new_trip.selectedIndex > -1
			 || view.new_order.selectedIndex > -1
			 || view.new_nomi_item.selectedIndex > -1)
			{
				// Enable dropdown lists below.
				isCarrierEnabled     = true;
				isTankerEnabled      = true;
				isDriverEnabled      = true;
				
				isAddTransferEnabled = true;
				isDelTransferEnabled = true;
				isAddMeterEnabled    = true;
				isDelMeterEnabled    = true;
				isAddBaseProdEnabled = true;
				isDelBaseProdEnabled = true;
			}
			else
			{
				// Disable dropdown lists below.
				isCarrierEnabled     = false;
				isTankerEnabled      = false;
				isDriverEnabled      = false;
				
				isAddTransferEnabled = false;
				isDelTransferEnabled = false;
				isAddMeterEnabled    = false;
				isDelMeterEnabled    = false;
				isAddBaseProdEnabled = false;
				isDelBaseProdEnabled = false;
			}
			
			if (load_mode == LM_NORMAL)
			{
				// The MT is called from other screens - Load Schedule, Order Listings
				// Don't want user to change the top-level filters.
				
				// Disable the items below.
				view.new_trans_type.enabled = false;
				view.new_supplier.enabled   = false;
				view.new_customer.enabled   = false;
				view.new_trip.enabled       = false;
				view.new_order.enabled      = false;
			}
			
			// For schedules by compartment, user cannot change tanker and carrier. Ver2.6 added
			if (DM.ManualTransactions.schedule_type == "BY_COMPARTMENT")
			{
				view.new_tanker.enabled  = false;
				view.new_carrier.enabled = false;
			}
			else
			{
				if (view.new_trans_type.selectedIndex > -1)
				{
					view.new_tanker.enabled  = true;
					view.new_carrier.enabled = true;
				}
				else
				{
					view.new_tanker.enabled  = false;
					view.new_carrier.enabled = false;
				}
			}
			
			if (isRepost == REPOST_ON)
			{
				// Startup MT screen from Load Schedule REPOST.
				isMTTypeEnabled     = false;
				isSupplierEnabled   = false;
				isCustomerEnabled   = false;
				isTripNoEnabled     = false;
				isOrderNoEnabled    = false;
				isMgrOrderNoEnabled = false;
				isNomiItemIDEnabled = false;
				isCarrierEnabled    = false;
				isTankerEnabled     = false;
				isDriverEnabled     = false;
				isTASRefEnabled     = false;
			}
			

			// Submit
			/*if (view.new_supplier.selectedIndex > -1 &&
			view.new_trip.selectedIndex > -1 &&
			view.new_carrier.selectedIndex > -1 &&
			view.new_tanker.selectedIndex > -1 &&
			view.new_user.selectedIndex > -1)*/
			{
				isSubmitEnabled = canCreate; //true
			}
			//else
			//{
				//isSubmitEnabled = false;
			//}
			
			// Buttons status.
			if (DM.ManualTransactions.baseAdjCalculating == false)
			{
				// The Base adjustment calculation is not running.(triggered by changing Density or Obs in Acc Base tab.)
				if (DM.ManualTransactions.transactionDataArr != null && DM.ManualTransactions.transactionDataArr.length > 0)
				{
					isCalDrawerEnabled   = true;
					isGetDensityEnabled  = true;
					isDelTransferEnabled = true;
				}
				else
				{
					isCalDrawerEnabled   = false;
					isGetDensityEnabled  = false;
					isDelTransferEnabled = false;
				}
			}
			else
			{
				// The Base adjustment calculation is running.(triggered by changing Density or Obs in Acc Base tab.)
				isCalDrawerEnabled   = false;
				isGetDensityEnabled  = false;
				isClearAllEnabled    = false;
				isDelTransferEnabled = false;
				isLoadEnabled        = false;
				isSaveEnabled        = false;
				isSubmitEnabled      = false;
			}
			
			// Base Prod navi tab
			if (isBsTab1Enabled)
			{
				// Ver2.3 Set Base detail tab selected.
				if (view.basedetailTabNavi)
				{
					view.basedetailTabNavi.selectedIndex = 0;
				}
				
				if (view.bs_obs_tot_lbl)
				{
					view.bs_obs_tot_lbl.visible  = true;
				}
				if (view.bs_obs_tot) 
				{
					view.bs_obs_tot.visible      = true;
				}
				
				if (view.bs_std_mass_tot) 
				{
					view.bs_std_mass_tot.visible = false;
				}
			}
			else
			{
				// Ver2.3 Set Cumulative Base detail tab selected.
				if (view.basedetailTabNavi)
				{
					view.basedetailTabNavi.selectedIndex = 1;
				}
				
				if (view.bs_obs_tot_lbl)
				{
					view.bs_obs_tot_lbl.visible  = false;
				}
				if (view.bs_obs_tot)
				{
					view.bs_obs_tot.visible      = false;
				}
				
				if (view.bs_std_mass_tot) 
				{
					view.bs_std_mass_tot.visible = true;
				}
			}
			
			if (isRejected == REJECT_ON)
			{
				// Startup MT screen from Load Schedule REPOST.
				isMTTypeEnabled     = false;
				isSupplierEnabled   = false;
				isCustomerEnabled   = false;
				isTripNoEnabled     = false;
				isOrderNoEnabled    = false;
				isMgrOrderNoEnabled = false;
				isNomiItemIDEnabled = false;
				isCarrierEnabled    = false;
				isTankerEnabled     = false;
				isDriverEnabled     = false;
				isTASRefEnabled     = false;
				
				isLoadEnabled       = false;
				isSaveEnabled       = false;
				isSubmitEnabled     = false;
			}
		}
		
		/**
		 *  Disable all filters.
		 *  
		 */
		public function disableAllFilters():void
		{
			/*isMTTypeEnabled   = false;
			isSupplierEnabled = false;
			isCustomerEnabled = false;
			isTripNoEnabled   = false;
			isOrderNoEnabled  = false;
			isCarrierEnabled  = false;
			isTankerEnabled   = false;
			isDriverEnabled   = false;
			*/
			//view.new_trip.enabled = false;
		}
		
		/**
		 *  Reload all items contents from db.
		 *  
		 */
		public function refreshFields():void
		{
			// Reload fields contents.
			alertDiag = new DKI_AlertBox();
			alertDiag.callBack = reload;
			alertDiag.msg= mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.ALERT_REFRESH_CONFIRM');
			PopUpManager.addPopUp(alertDiag,FlexGlobals.topLevelApplication as DisplayObject,true);
			PopUpManager.centerPopUp(alertDiag);
		}
		
		/**
		 *  
		 *  
		 */
		public function reload():void
		{
			load_mode = LM_DIRECT;
			view.new_trans_type.selectedIndex = -1;
			resetSettings();
			resetItemsVisibility();
			initialize();
			DM.ManualTransactions.populate();
			updateStatus();
			global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.RELOADING'));
			//isMTTypeEnabled = true;
			view.new_trans_type.enabled = true;
		}
		
		/**
		 *  Reload some items contents from db.
		 *  
		 */
		public function reload2():void
		{
			DM.ManualTransactions.populate();
			global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.LOADING'));
		}
		
		//--------------------------------------------------------------------//
		//      Initialization and Status Control Member Functions  [END]     //
		//--------------------------------------------------------------------//


		//--------------------------------------------------------------------//
		//                                                                    //
		//              Message Handle Member Functions  [START]              //
		//                                                                    //
		//--------------------------------------------------------------------//

		/**
		 *  
		 *  
		 */
		public function trsfGrid_gridItemEditorSessionSaveHandler(event:GridItemEditorEvent):void
		{
			var tonumber:Number;
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			var o:Object;
			var chkres:int;
			o = dmMT.transferDataArr[view.transferDetailsGrid.selectedIndex];
			
			if (event.column.dataField == 'trsf_density')
			{
				if (o.trsf_density != "")
				{
					tonumber = Math.round(Number(o.trsf_density) * DENSITY_DECIMAL) / DENSITY_DECIMAL;
					if (dataRangeCheck('TRSF_DEN', tonumber) != 0)
					{
						o.trsf_density = null;
						var rng:String = "(" + DEN_MIN + " ~ " + DEN_MAX + ")";
						global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.DATA_OUT_RANGE') + rng + "\r\n");
					}
					else
					{
						o.trsf_density = tonumber;
					}
				}
				else
				{
					o.trsf_density = null;
				}
			}
			
			if (event.column.dataField == 'trsf_temp')
			{
				if (o.trsf_temp != "")
				{
					tonumber = Math.round(Number(o.trsf_temp) * TEMP_DECIMAL) / TEMP_DECIMAL;
					if (dataRangeCheck('TRSF_TEMP', tonumber) != 0)
					{
						o.trsf_temp = null;
						var rng:String = "(" + TEMP_MIN + " ~ " + TEMP_MAX + ")";
						global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.DATA_OUT_RANGE') + rng + "\r\n");
					}
					else
					{
						o.trsf_temp = tonumber;
						// ACC_BASE_ADJ [S]
						dmMT.invalidateBaseprodTotalArr();
						////updateSubmitBtnStatus();
						global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.CLICK_CALC_DRAWER_B4_SUBMIT'));
						// ACC_BASE_ADJ [E]
					}
				}
				else
				{
					o.trsf_temp = null;
				}
			}
			
			if (event.column.dataField == 'trsf_qty_amb')
			{
				if (o.trsf_qty_amb != "")
				{
					// Ver2.4 added data range check
					tonumber = Math.round(Number(o.trsf_qty_amb) * QTY_DECIMAL) / QTY_DECIMAL; // Ver2.7 added QTY_DECIMAL
					if (dataRangeCheck('TRSF_OBS', tonumber) != 0)
					{
						o.trsf_qty_amb = null;
						var rng:String = "(" + OBS_MIN + " ~ " + OBS_MAX + ")";
						global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.DATA_OUT_RANGE') + rng + "\r\n");
					}
					else
					{
						chkres = balanceQtyCheck(o);
						if (!chkres)
						{
							if (o.trsf_qty_amb != "")
							{
								tonumber = Math.round(Number(o.trsf_qty_amb) * QTY_DECIMAL) / QTY_DECIMAL; // Ver2.7 added QTY_DECIMAL
								o.trsf_qty_amb = tonumber;
								
								///if (view.transferDetailsGrid.selectedIndex != -1)
								//0705 improved timing issue.
								var trsfRowIdx:int = event.rowIndex;
								{
									//view.callLater(function():void{
									// ACC_BASE_ADJ [S] comment out, no need to auto cal here.
									//calculateAllBases(trsfRowIdx);
									dmMT.invalidateBaseprodTotalArr();
									////updateSubmitBtnStatus();
									global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.CLICK_CALC_DRAWER_B4_SUBMIT'));
									// ACC_BASE_ADJ [E]
									//});
								}
							}
							else
							{
								o.trsf_qty_amb = null;
							}
						}
						else
						{
							o.trsf_qty_amb = null;
						}
					}
				}
				else
				{
					o.trsf_qty_amb = null;
				}
			}
			
			if (event.column.dataField == 'trsf_qty_cor')
			{
				if (o.trsf_qty_cor != "")
				{
					// Ver2.4 added data range check
					tonumber = Math.round(Number(o.trsf_qty_cor) * QTY_DECIMAL) / QTY_DECIMAL; // Ver2.7 added QTY_DECIMAL
					if (dataRangeCheck('TRSF_COR', tonumber) != 0)
					{
						o.trsf_qty_cor = null;
						var rng:String = "(" + STD_MIN + " ~ " + STD_MAX + ")";
						global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.DATA_OUT_RANGE') + rng + "\r\n");
					}
					else
					{
						chkres = balanceQtyCheck(o);
						if (!chkres)
						{
							if (o.trsf_qty_cor != "")
							{
								tonumber = Math.round(Number(o.trsf_qty_cor) * QTY_DECIMAL) / QTY_DECIMAL; // Ver2.7 added QTY_DECIMAL
								o.trsf_qty_cor = tonumber;
								
								// ACC_BASE_ADJ [S]
								dmMT.invalidateBaseprodTotalArr();
								////updateSubmitBtnStatus();
								global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.CLICK_CALC_DRAWER_B4_SUBMIT'));
								// ACC_BASE_ADJ [E]
							}
							else
							{
								o.trsf_qty_cor = null;
							}
						}
						else
						{
							o.trsf_qty_cor = null;
						}
					}
				}
				else
				{
					o.trsf_qty_cor = null;
				}
			}
			
			if (event.column.dataField == 'trsf_load_kg')
			{
				if (o.trsf_load_kg != "")
				{
					// Ver2.4 added data range check
					tonumber = Math.round(Number(o.trsf_load_kg) * QTY_DECIMAL) / QTY_DECIMAL; // Ver2.7 added QTY_DECIMAL
					if (dataRangeCheck('TRSF_MASS', tonumber) != 0)
					{
						o.trsf_load_kg = null;
						var rng:String = "(" + MASS_MIN + " ~ " + MASS_MAX + ")";
						global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.DATA_OUT_RANGE') + rng + "\r\n");
					}
					else
					{
						chkres = balanceQtyCheck(o);
						if (!chkres)
						{
							if (o.trsf_load_kg != "")
							{
								tonumber = Math.round(Number(o.trsf_load_kg) * QTY_DECIMAL) / QTY_DECIMAL; // Ver2.7 added QTY_DECIMAL
								o.trsf_load_kg = tonumber;
								
								// ACC_BASE_ADJ [S]
								dmMT.invalidateBaseprodTotalArr();
								////updateSubmitBtnStatus();
								global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.CLICK_CALC_DRAWER_B4_SUBMIT'));
								// ACC_BASE_ADJ [E]
							}
							else
							{
								o.trsf_load_kg = null;
							}
						}
						else
						{
							o.trsf_load_kg = null;
						}
					}
				}
				else
				{
					o.trsf_load_kg = null;
				}
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function bsprodGrid_gridItemEditorSessionSaveHandler(event:GridItemEditorEvent):void
		{
			var tonumber:Number;
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			var o:Object;
			o = dmMT.baseprodDataArr[view.baseprodDataGrid.selectedIndex];
			
			if (event.column.dataField == 'trsf_bs_den')
			{
				if (o.trsf_bs_den != "")
				{
					tonumber = Math.round(Number(o.trsf_bs_den) * DENSITY_DECIMAL) / DENSITY_DECIMAL;
					o.trsf_bs_den = tonumber;
				}
				else
				{
					o.trsf_bs_den = null;
				}
			}
			
			if (event.column.dataField == 'trsf_bs_temp')
			{
				if (o.trsf_bs_temp != "")
				{
					tonumber = Math.round(Number(o.trsf_bs_temp) * TEMP_DECIMAL) / TEMP_DECIMAL;
					o.trsf_bs_temp = tonumber;
				}
				else
				{
					o.trsf_bs_temp = null;
				}
			}
			
			if (event.column.dataField == 'trsf_bs_qty_amb')
			{
				if (o.trsf_bs_qty_amb != "")
				{
					if (o.trsf_bs_prodcls.toUpperCase() != "ADDITIVE")  // no decimals
					{
						tonumber = Math.round(Number(o.trsf_bs_qty_amb));
					}
					else   // 3 decimals
					{
						tonumber = Math.round(Number(o.trsf_bs_qty_amb) * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
					}
					
					o.trsf_bs_qty_amb = tonumber;
				}else{
					o.trsf_bs_qty_amb = null;
				}
			}
			
			if (event.column.dataField == 'trsf_bs_qty_cor')
			{
				if (o.trsf_bs_qty_cor != "")
				{
					if (o.trsf_bs_prodcls.toUpperCase() != "ADDITIVE")  // no decimals
					{
						tonumber = Math.round(Number(o.trsf_bs_qty_cor));
					}
					else   // 3 decimals
					{
						tonumber = Math.round(Number(o.trsf_bs_qty_cor) * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
					}
					
					o.trsf_bs_qty_cor = tonumber;
				}
				else
				{
					o.trsf_bs_qty_cor = null;
				}
				
			}
			
			if (event.column.dataField == 'trsf_bs_load_kg')
			{
				if (o.trsf_bs_load_kg != "")
				{
					if (o.trsf_bs_prodcls.toUpperCase() != "ADDITIVE")  // no decimals
					{
						tonumber = Math.round(Number(o.trsf_bs_load_kg));
					}
					else   // 3 decimals
					{
						tonumber = Math.round(Number(o.trsf_bs_load_kg) * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
					}
					
					o.trsf_bs_load_kg = tonumber;
				}
				else
				{
					o.trsf_bs_load_kg = null;
				}
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function bsprodtotGrid_gridItemEditorSessionSaveHandler(event:GridItemEditorEvent):void
		{
			//return; // tempoarily return for testing.
			
			var tonumber:Number;
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			var o, o_prev:Object;
			o = dmMT.baseprodTotalDataArr[view.baseprodTotalDataGrid.selectedIndex];
			
			// When loading from saved MT, its length could be 0.
			if (dmMT.baseprodTotalDataArr_prev != null && dmMT.baseprodTotalDataArr_prev.length > 0)
				o_prev = dmMT.baseprodTotalDataArr_prev[view.baseprodTotalDataGrid.selectedIndex];
			
			if (event.column.dataField == 'trsf_bs_den')
			{
				if (needRefreshBaseprodTotal() == true)
				{
					// Disregard current value and restore its previous value.
					o.trsf_bs_den = getPrevValInBaseTotal(view.baseprodTotalDataGrid.selectedIndex, "DENSITY"); // Ver3.1
					
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SUM_BASE_QTY_NOT_UPTODATE'));
					return;
				}
				
				if (o.trsf_bs_den != "")
				{
					tonumber = Math.round(Number(o.trsf_bs_den) * DENSITY_DECIMAL) / DENSITY_DECIMAL;
					if (dataRangeCheck('TRSF_DEN', tonumber) != 0)
					{
//						if (dmMT.baseprodTotalDataArr_prev != null && dmMT.baseprodTotalDataArr_prev.length > 0)
//							o.trsf_bs_den = o_prev.trsf_bs_den;
//						else
//							o.trsf_bs_den = null;
						o.trsf_bs_den = getPrevValInBaseTotal(view.baseprodTotalDataGrid.selectedIndex, "DENSITY"); // Ver3.1
						
						var rng:String = "(" + DEN_MIN + " ~ " + DEN_MAX + ")";
						global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.DATA_OUT_RANGE') + rng + "\r\n");
						return;
					}
					
					// Set the 'calculating' flag and disable relevant buttons to prevent from clicking again.
					dmMT.setBaseAdjCalFlag();
					disableButtons();
					
					invokeBaseReCal(0, "DENSITY_ADJ");
//					else
//					{
//						
//						o.trsf_bs_den = tonumber;
//					}
				}
				else
				{
					o.trsf_bs_den = null;
				}
			}
			
			if (event.column.dataField == 'trsf_bs_qty_amb')
			{
				if (needRefreshBaseprodTotal() == true)
				{
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SUM_BASE_QTY_NOT_UPTODATE'));
					return;
				}
				
				if (o.trsf_bs_qty_amb != "")
				{
					// Round entered number.
					if (o.trsf_bs_prodcls.toUpperCase() != "ADDITIVE")  // no decimals
					{
						tonumber = Math.round(Number(o.trsf_bs_qty_amb) * QTY_DECIMAL) / QTY_DECIMAL;
					}
					else   // 3 decimals
					{
						tonumber = Math.round(Number(o.trsf_bs_qty_amb) * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
					}
					
					if (dataRangeCheck('TRSF_OBS', tonumber) != 0)
					{
//						if (dmMT.baseprodTotalDataArr_prev != null && dmMT.baseprodTotalDataArr_prev.length > 0)
//							o.trsf_bs_qty_amb = o_prev.trsf_bs_qty_amb;
//						else
//							o.trsf_bs_qty_amb = null;
						o.trsf_bs_qty_amb = getPrevValInBaseTotal(view.baseprodTotalDataGrid.selectedIndex, "OBS"); // Ver3.1
						
						var rng:String = "(" + OBS_MIN + " ~ " + OBS_MAX + ")";
						global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.DATA_OUT_RANGE') + rng + "\r\n");
						return;
					}
					
					// Cal the delta qty of OBS.
					var OBS_adjust:Number;  // Acc OBS adjustment qty
					var OBS_prev:Number;

//					if (dmMT.baseprodTotalDataArr_prev != null && dmMT.baseprodTotalDataArr_prev.length > 0)
//						OBS_adjust = tonumber - Number(dmMT.baseprodTotalDataArr_prev[view.baseprodTotalDataGrid.selectedIndex].trsf_bs_qty_amb);
//					else
//						OBS_adjust = tonumber - 0;
					OBS_prev = Number(getPrevValInBaseTotal(view.baseprodTotalDataGrid.selectedIndex, "OBS")); // Ver3.1
					OBS_adjust = tonumber - OBS_prev;
					
					// Set the 'calculating' flag and disable relevant buttons to prevent from clicking again.
					dmMT.setBaseAdjCalFlag();
					disableButtons();
					
					invokeBaseReCal(OBS_adjust, "OBS_ADJ");
				}else{
					o.trsf_bs_qty_amb = null;
				}
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function getPrevValInBaseTotal(idx:int, key:String):String
		{
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			var res:String = null;
			var o_prev:Object;
			
			var test:Number = Number(res);
			
			if (dmMT.baseprodTotalDataArr_prev != null
			 && dmMT.baseprodTotalDataArr_prev.length > 0
			 && idx >= 0
			 && idx < dmMT.baseprodTotalDataArr_prev.length)
			{
				o_prev = dmMT.baseprodTotalDataArr_prev[idx];
				switch (key)
				{
					case "DENSITY":
						res = o_prev.trsf_bs_den;
						break;
					case "OBS":
						res = o_prev.trsf_bs_qty_amb;
						break;
					default:
						break;
				}
			}
			
			return res;
		}
		
		/**
		 *  
		 *  
		 */
		public function invokeDrawerCal(callback:Function = null):void
		{
			//
			// Do drawer calculation
			//
			
			var param:Object = new Object;
			
			param.view               = view;
			param.OBS_adjust         = 0;  // Not used
			param.vcf                = DM.ManualTransactions.vcf;
			param.accBaseSelectedIdx = 0;  // Not used
			
			mtcal = new C_ManualTransactionsCal(param);
			mtcal.calDrawers(callback);
		}
		
		/**
		 *  
		 *  
		 */
		public function invokeBaseReCal(obsAdj:Number, field:String = ""):void
		{
			//
			// Do base adjustment
			//
			
			// Do the recipe adjustment cal.
			var param:Object = new Object;
			
			param.view               = view;
			param.OBS_adjust         = obsAdj;
			param.vcf                = DM.ManualTransactions.vcf;
			param.accBaseSelectedIdx = view.baseprodTotalDataGrid.selectedIndex;
			
			mtcal = new C_ManualTransactionsCal(param);
			mtcal.adjBases(field, callback_adjBases);
		}
		
		/**
		 *  
		 *  
		 */
		public function callback_calDrawers():void
		{
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			var res:Object = mtcal.getResult();
			if (res.code == 0)
			{
				//
				// Quantities calculation succeeded.
				//
				
				//------------------------------------------------------------------------------------------//
				// 1. Refresh transaction data arraycollection.                                             //
				//------------------------------------------------------------------------------------------//
				// Actually it is a value copy from clone data.
				// For Base product what has been changed:
				//   1) AMB    (may be calculated)
				//   2) COR    (may be calculated)
				//   3) KG     (may be calculated)
				// For Compartment(transfer) what has been changed:
				//   1) AMB    (may be calculated)
				//   2) COR    (may be calculated)
				//   3) KG     (may be calculated)
				// Go through every compartment(transfer) to refresh relevant data.
				for (var trsfIdx:int = 0; trsfIdx < dmMT.transactionDataArr.length; trsfIdx++)
				{
					// Refersh Base.
					// Go through each base in this compartment(drawer prod).
					for (var bsIdx:int = 0; bsIdx < dmMT.transactionDataArr[trsfIdx].baseprod.length; bsIdx++)
					{
						dmMT.transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb = res.transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb;
						dmMT.transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_qty_cor = res.transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_cor;
						dmMT.transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_load_kg = res.transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_load_kg;
					}
					
					// Refresh Compartment(transfer).
					dmMT.transactionDataArr[trsfIdx].transfer.trsf_qty_amb = res.transDataClone[trsfIdx].transfer.trsf_qty_amb;
					dmMT.transactionDataArr[trsfIdx].transfer.trsf_qty_cor = res.transDataClone[trsfIdx].transfer.trsf_qty_cor;
					dmMT.transactionDataArr[trsfIdx].transfer.trsf_load_kg = res.transDataClone[trsfIdx].transfer.trsf_load_kg;
					
				}
				
				//------------------------------------------------------------------------------------------//
				// 2. Refresh transfer data arraycollection.                                                //
				//------------------------------------------------------------------------------------------//
				// The part should already be achieved in step1.
				// (transferDataArr has the reference to transaction data arraycollection)
				// Actually it is a value copy from clone data.
				// For Compartment(transfer) what has been changed:
				//   1) AMB    (may be calculated)
				//   2) COR    (may be calculated)
				//   3) KG     (may be calculated)
				// Go through every item in transfer arraycollection to refresh relevant data.
				for (var itemIdx:int = 0; itemIdx < dmMT.transferDataArr.length; itemIdx++)
				{
					dmMT.transferDataArr[itemIdx].trsf_qty_amb = res.transDataClone[itemIdx].transfer.trsf_qty_amb;
					dmMT.transferDataArr[itemIdx].trsf_qty_cor = res.transDataClone[itemIdx].transfer.trsf_qty_cor;
					dmMT.transferDataArr[itemIdx].trsf_load_kg = res.transDataClone[itemIdx].transfer.trsf_load_kg;
				}
				
				//------------------------------------------------------------------------------------------//
				// 3. Refresh current(if one transfer selected) base data arraycollection.                  //
				//------------------------------------------------------------------------------------------//
				// The part should already be achieved in step1.
				// (baseprodDataArr has the reference to transaction data arraycollection)
				// Actually it is a value copy from clone data.
				// For Base product what has been changed:
				//   1) AMB    (may be calculated)
				//   2) COR    (may be calculated)
				//   3) KG     (may be calculated)
				if (dmMT.curr_selected_transfer != -1)
				{
					// Go through every base to refresh relevant data.
					for (var bsIdx:int = 0; bsIdx < dmMT.baseprodDataArr.length; bsIdx++)
					{
						dmMT.baseprodDataArr[bsIdx].trsf_bs_qty_amb = res.transDataClone[dmMT.curr_selected_transfer].baseprod[bsIdx].trsf_bs_qty_amb;
						dmMT.baseprodDataArr[bsIdx].trsf_bs_qty_cor = res.transDataClone[dmMT.curr_selected_transfer].baseprod[bsIdx].trsf_bs_qty_cor;
						dmMT.baseprodDataArr[bsIdx].trsf_bs_load_kg = res.transDataClone[dmMT.curr_selected_transfer].baseprod[bsIdx].trsf_bs_load_kg;
					}
				}
				
				//------------------------------------------------------------------------------------------//
				// 4. Refresh base total data arraycollection.                                              //
				//------------------------------------------------------------------------------------------//
				// Actually it is a value copy from clone data.
				// For Base product total what has been changed:
				//   1) AMB    (may be calculated)
				//   2) COR    (may be calculated)
				//   3) KG     (may be calculated)
				// Go through every base to refresh relevant data.
				for (var bsTotIdx:int = 0; bsTotIdx < dmMT.baseprodTotalDataArr.length; bsTotIdx++)
				{
					dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_qty_amb = res.bsTotalDataClone[bsTotIdx].trsf_bs_qty_amb;
					dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_qty_cor = res.bsTotalDataClone[bsTotIdx].trsf_bs_qty_cor;
					dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_load_kg = res.bsTotalDataClone[bsTotIdx].trsf_bs_load_kg;
				}
				
				// Set current base product total to previous data arraycollection for later reference.
				copyCurrBPTotalToPrevBPTotal();
				
				// Set the flag to indicate Base prod total is valid(up-to-date).
				dmMT.validateBaseprodTotalArr();
				
				// Set the flag to indicate Acc Base adjustment is not carried out yet.
				dmMT.unsetAccBaseAdjusted();
				
				// Refresh data grids.
				refreshTransferGrid();
				refreshBaseGrid();
				refreshBaseTotalGrid();
				
				updateAccBaseDisp(1);
				
				// Show messages.
				if (res.succeedTransInfo != null && res.succeedTransInfo.length > 0)
				{
					var tem_inc:String = mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.VALID_CMPTS');
					for each (var o:Object in res.succeedTransInfo)
					{
						tem_inc += "[" + o.cmpt_no + "]"
					}
					global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SUCCEED_CALC_DRAWPROD_QTY') + tem_inc);
				}
				else
				{
					// Unlikely run into this case.
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.NO_VALID_CMPT_DATA'));
				}
			}
			else if (res.code == 4)
			{
				// No data change(copy from clone) for transaction/transfer/base total arraycollection.
				
				// Ver3.1 Bug 4092 Fix.
				// 
				// But need to refresh Bases with each compartment(transfer) and Base total.
				// Since the compartment(s) may not have the Density(readonly, so excluded) & Temp & Obs/Std/Kg entered,
				// refresh Bases and Base total with compartment data.
				//------------------------------------------------------------------------------------------//
				// 1. Refresh transaction data arraycollection.                                             //
				//------------------------------------------------------------------------------------------//
				// Go through every compartment(transfer) to refresh Bases data.
				for (var trsfIdx:int = 0; trsfIdx < dmMT.transactionDataArr.length; trsfIdx++)
				{
					// Refersh Base.
					// Go through each base in this compartment(drawer prod).
					for (var bsIdx:int = 0; bsIdx < dmMT.transactionDataArr[trsfIdx].baseprod.length; bsIdx++)
					{
						// If all qtys are not entered(null), clear its Bases qtys.
						if (dmMT.transactionDataArr[trsfIdx].transfer.trsf_qty_amb == null
						 && dmMT.transactionDataArr[trsfIdx].transfer.trsf_qty_cor == null
						 && dmMT.transactionDataArr[trsfIdx].transfer.trsf_load_kg == null)
						{
							dmMT.transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb = null;
							dmMT.transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_qty_cor = null;
							dmMT.transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_load_kg = null;
						}
						
						// If temp not entered(null), clear its Bases temp.
						if (dmMT.transactionDataArr[trsfIdx].transfer.trsf_temp == null)
						{
							dmMT.transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_temp = null;
						}
					}
				}
				
				//------------------------------------------------------------------------------------------//
				// 2. Refresh current(if one transfer selected) base data arraycollection.                  //
				//------------------------------------------------------------------------------------------//
				// Should be achieved in step1.
				// baseprodDataArr has the reference to transaction data arraycollection.
				
				// Go through every base total to refresh relevant data.
				for (var bsTotIdx:int = 0; bsTotIdx < dmMT.baseprodTotalDataArr.length; bsTotIdx++)
				{
					dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_temp    = null;
					dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_qty_amb = null;
					dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_qty_cor = null;
					dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_load_kg = null;
				}
				
				// Set the flag to indicate Base prod total is valid(up-to-date).
				dmMT.validateBaseprodTotalArr();
				
				// Set the flag to indicate Acc Base adjustment is not carried out yet.
				dmMT.unsetAccBaseAdjusted();
				
				// Refresh data grids.
				refreshBaseGrid();
				refreshBaseTotalGrid();
				
				// Show warning message.
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.NO_VALID_CMPT_DATA'));
			}
			else
			{
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.ERROR_CALC_DRAWPROD'));
			}
			
			// Enable buttons.
			enableButtons();
		}
		
		/**
		 *  
		 *  
		 */
		public function callback_adjBases(field:String = ""):void
		{
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			var res:Object = mtcal.getResult();
			if (res.code == 0)
			{
				//
				// Recipe adjustment calculation succeeded.
				//
				
				// Update the Acc Base totals(with delta). Must do this before refreshing base total data arraycollection.
				updateAccBaseDisp(2);
				
				//------------------------------------------------------------------------------------------//
				// 1. Refresh transaction data arraycollection.                                             //
				//------------------------------------------------------------------------------------------//
				// Actually it is a value copy from clone data.
				// For Base product what has been changed:
				//   1) Density(user changed)
				//   2) AMB    (user changed)
				//   3) COR    (re-calculated)
				//   4) KG     (re-calculated)
				// For Compartment(transfer) what has been changed:
				//   1) Density(re-calculated)
				//   2) COR    (re-calculated)
				//   3) KG     (re-calculated)
				// Go through every compartment(transfer) to refresh relevant data.
				for (var trsfIdx:int = 0; trsfIdx < dmMT.transactionDataArr.length; trsfIdx++)
				{
					// Refersh Base.
					// Go through each base in this compartment(drawer prod).
					for (var bsIdx:int = 0; bsIdx < dmMT.transactionDataArr[trsfIdx].baseprod.length; bsIdx++)
					{
						dmMT.transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_den     = res.transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_den;
						dmMT.transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb = res.transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb;
						dmMT.transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_qty_cor = res.transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_cor;
						dmMT.transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_load_kg = res.transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_load_kg;
					}
					
					// Refresh Compartment(transfer).
					dmMT.transactionDataArr[trsfIdx].transfer.trsf_density = res.transDataClone[trsfIdx].transfer.trsf_density;
					dmMT.transactionDataArr[trsfIdx].transfer.trsf_qty_cor = res.transDataClone[trsfIdx].transfer.trsf_qty_cor;
					dmMT.transactionDataArr[trsfIdx].transfer.trsf_load_kg = res.transDataClone[trsfIdx].transfer.trsf_load_kg;
				}
				
				//------------------------------------------------------------------------------------------//
				// 2. Refresh transfer data arraycollection.                                                //
				//------------------------------------------------------------------------------------------//
				// Actually it is a value copy from clone data.
				// For Compartment(transfer) what has been changed:
				//   1) Density(re-calculated)
				//   2) COR    (re-calculated)
				//   3) KG     (re-calculated)
				// Go through every item in transfer arraycollection to refresh relevant data.
				for (var itemIdx:int = 0; itemIdx < dmMT.transferDataArr.length; itemIdx++)
				{
					dmMT.transferDataArr[itemIdx].trsf_density = res.transDataClone[itemIdx].transfer.trsf_density;
					dmMT.transferDataArr[itemIdx].trsf_qty_cor = res.transDataClone[itemIdx].transfer.trsf_qty_cor;
					dmMT.transferDataArr[itemIdx].trsf_load_kg = res.transDataClone[itemIdx].transfer.trsf_load_kg;
				}
				
				//------------------------------------------------------------------------------------------//
				// 3. Refresh current(if one transfer selected) base data arraycollection.                  //
				//------------------------------------------------------------------------------------------//
				// Actually it is a value copy from clone data.
				// For Base product what has been changed:
				//   1) Density(user changed)
				//   2) AMB    (user changed)
				//   3) COR    (re-calculated)
				//   4) KG     (re-calculated)
				if (dmMT.curr_selected_transfer != -1)
				{
					// Go through every base to refresh relevant data.
					for (var bsIdx:int = 0; bsIdx < dmMT.baseprodDataArr.length; bsIdx++)
					{
						dmMT.baseprodDataArr[bsIdx].trsf_bs_den     = res.transDataClone[dmMT.curr_selected_transfer].baseprod[bsIdx].trsf_bs_den;
						dmMT.baseprodDataArr[bsIdx].trsf_bs_qty_amb = res.transDataClone[dmMT.curr_selected_transfer].baseprod[bsIdx].trsf_bs_qty_amb;
						dmMT.baseprodDataArr[bsIdx].trsf_bs_qty_cor = res.transDataClone[dmMT.curr_selected_transfer].baseprod[bsIdx].trsf_bs_qty_cor;
						dmMT.baseprodDataArr[bsIdx].trsf_bs_load_kg = res.transDataClone[dmMT.curr_selected_transfer].baseprod[bsIdx].trsf_bs_load_kg;
					}
				}
				
				//------------------------------------------------------------------------------------------//
				// 4. Refresh base total data arraycollection.                                              //
				//------------------------------------------------------------------------------------------//
				// Actually it is a value copy from clone data.
				// For Base product total what has been changed:
				//   1) AMB    (user changed & re-calculated)
				//   2) COR    (re-calculated)
				//   3) KG     (re-calculated)
				// Go through every base to refresh relevant data.
				for (var bsTotIdx:int = 0; bsTotIdx < dmMT.baseprodTotalDataArr.length; bsTotIdx++)
				{
					dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_qty_amb = res.bsTotalDataClone[bsTotIdx].trsf_bs_qty_amb;
					dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_qty_cor = res.bsTotalDataClone[bsTotIdx].trsf_bs_qty_cor;
					dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_load_kg = res.bsTotalDataClone[bsTotIdx].trsf_bs_load_kg;
				}
				
				// Round Density.
				// Since in event - bsprodtotGrid_gridItemEditorSessionSaveHandler, we haven't update the field value.
				// Go through every base to round density.
				for (var bsTotIdx:int = 0; bsTotIdx < dmMT.baseprodTotalDataArr.length; bsTotIdx++)
				{
					if (field == "DENSITY_ADJ")
					{
						dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_den = Math.round(Number(dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_den) * DENSITY_DECIMAL) / DENSITY_DECIMAL;
					}
				}
				
				// Set current base product total to previous data arraycollection for later reference.
				copyCurrBPTotalToPrevBPTotal();
				
				// Refresh data grids.
				refreshTransferGrid();
				refreshBaseGrid();
				refreshBaseTotalGrid();
				
				// Set the flag to indicate Acc Base has successfully adjusted. Ver3.1 added
				dmMT.setAccBaseAdjusted();
				
				// Show messages.
				global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SUCCEED_RECALC_BASE_QTY'));
			}
			else if (res.code == 1)
			{
				//
				// Recipe adjustment calculation failed.
				//
				
				// As one of the OBS could be negative.
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.CANNOT_ADJUST_RECIPE__NO_CHANGE_QTY'));
			}
			else if (res.code == 2)
			{
				//
				// Adjustable Base AMB total is ZERO. Can't perform recalculation.
				//
				
				// The Bases haven't been calculated (by clicking 'Calc Drawer' button), or user entered ZERO in compartments.
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.CANNOT_ADJUST_RECIPE__BASE_AMB_SUM_ZERO'));
			}
			else if (res.code == 3)
			{
				//
				// There is no adjustable Base(s). Can't perform recalculation.
				//
				
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.CANNOT_ADJUST_RECIPE__NO_BASE_PROD'));
			}
			else
			{
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.CANNOT_ADJUST_RECIPE__CALC_ERROR'));
			}
			
			// Unset the 'calculating' flag and enable buttons.
			dmMT.unsetBaseAdjCalFlag();
			enableButtons();
		}
		
		/**
		 *  
		 *  
		 */
		public function mtrGrid_gridItemEditorSessionSaveHandler(event:GridItemEditorEvent):void
		{
			var tonumber:Number;
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			var o:Object;
			o = dmMT.meterDataArr[view.meterDatagrid.selectedIndex];
			
			if (event.column.dataField == 'trsf_mtr_opn_amb')
			{
				if (o.trsf_mtr_opn_amb != "")
				{
					tonumber = Number(o.trsf_mtr_opn_amb);
					o.trsf_mtr_opn_amb = tonumber;
				}
				else
				{
					o.trsf_mtr_opn_amb = null;
				}
			}
			
			if (event.column.dataField == 'trsf_mtr_cls_amb')
			{
				if (o.trsf_mtr_cls_amb != "")
				{
					tonumber = Number(o.trsf_mtr_cls_amb);
					o.trsf_mtr_cls_amb = tonumber;
				}
				else
				{
					o.trsf_mtr_cls_amb = null;
				}
			}
			
			if (event.column.dataField == 'trsf_mtr_opn_cor')
			{
				if (o.trsf_mtr_opn_cor != "")
				{
					tonumber = Number(o.trsf_mtr_opn_cor);
					o.trsf_mtr_opn_cor = tonumber;
				}
				else
				{
					o.trsf_mtr_opn_cor = null;
				}
			}
			
			if (event.column.dataField == 'trsf_mtr_cls_cor')
			{
				if (o.trsf_mtr_cls_cor != "")
				{
					tonumber = Number(o.trsf_mtr_cls_cor);
					o.trsf_mtr_cls_cor = tonumber;
				}
				else
				{
					o.trsf_mtr_cls_cor = null;
				}
			}
			
			if (event.column.dataField == 'trsf_mtr_open_kg')
			{
				if (o.trsf_mtr_open_kg != "")
				{
					tonumber = Number(o.trsf_mtr_open_kg);
					o.trsf_mtr_open_kg = tonumber;
				}
				else
				{
					o.trsf_mtr_open_kg = null;
				}
			}
			
			if (event.column.dataField == 'trsf_mtr_close_kg')
			{
				if (o.trsf_mtr_close_kg != "")
				{
					tonumber = Number(o.trsf_mtr_close_kg);
					o.trsf_mtr_close_kg = tonumber;
				}
				else
				{
					o.trsf_mtr_close_kg = null;
				}
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function mtrTotalGrid_gridItemEditorSessionSaveHandler(event:GridItemEditorEvent):void
		{
			var tonumber:Number;
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			var o:Object;
			o = dmMT.meterTotalDataArr[view.meterTotalDatagrid.selectedIndex];
			
			if (event.column.dataField == 'trsf_mtr_opn_amb')
			{
				if (o.trsf_mtr_opn_amb != "")
				{
					tonumber = Number(o.trsf_mtr_opn_amb);
					o.trsf_mtr_opn_amb = tonumber;
				}
				else
				{
					o.trsf_mtr_opn_amb = null;
				}
			}
			
			if (event.column.dataField == 'trsf_mtr_cls_amb')
			{
				if (o.trsf_mtr_cls_amb != "")
				{
					tonumber = Number(o.trsf_mtr_cls_amb);
					o.trsf_mtr_cls_amb = tonumber;
				}
				else
				{
					o.trsf_mtr_cls_amb = null;
				}
			}
			
			if (event.column.dataField == 'trsf_mtr_opn_cor')
			{
				if (o.trsf_mtr_opn_cor != "")
				{
					tonumber = Number(o.trsf_mtr_opn_cor);
					o.trsf_mtr_opn_cor = tonumber;
				}
				else
				{
					o.trsf_mtr_opn_cor = null;
				}
			}
			
			if (event.column.dataField == 'trsf_mtr_cls_cor')
			{
				if (o.trsf_mtr_cls_cor != "")
				{
					tonumber = Number(o.trsf_mtr_cls_cor);
					o.trsf_mtr_cls_cor = tonumber;
				}
				else
				{
					o.trsf_mtr_cls_cor = null;
				}
			}
			
			if (event.column.dataField == 'trsf_mtr_open_kg')
			{
				if (o.trsf_mtr_open_kg != "")
				{
					tonumber = Number(o.trsf_mtr_open_kg);
					o.trsf_mtr_open_kg = tonumber;
				}
				else
				{
					o.trsf_mtr_open_kg = null;
				}
			}
			
			if (event.column.dataField == 'trsf_mtr_close_kg')
			{
				if (o.trsf_mtr_close_kg != "")
				{
					tonumber = Number(o.trsf_mtr_close_kg);
					o.trsf_mtr_close_kg = tonumber;
				}
				else
				{
					o.trsf_mtr_close_kg = null;
				}
			}
			
			// Distribute meter total data to each meter in every transfer.
			mtrTotal2EachMtr();
		}
		
		/**
		 *  
		 *  
		 */
		public function creationCompleteHandler(event:FlexEvent):void
		{
			DM.ManualTransactions.view = view;
			
			view.trans_st_dmy.addEventListener("FM_DT_CLICK_OK", onDTClickOK);
			view.trans_ed_dmy.addEventListener("FM_DT_CLICK_OK", onDTClickOK);
		}
		
		/**
		 *  
		 *  
		 */
		public function dataGrid_creationCompleteHandler(event:FlexEvent):void
		{
		}
		
		/**
		 *  
		 *  
		 */
		public function scrollForward_effectEndHandler(event:EffectEvent):void
		{
			view.scrollForward.end();
			//if (pending==false)
			//{
			//scrollDn.valueBy = dataGrid.scroller.viewport.getVerticalScrollPositionDelta(NavigationUnit.PAGE_DOWN);
			//}	
		}
		
		/**
		 *  
		 *  
		 */
		public function dataGrid_changeHandler(event:GridSelectionEvent, callback:Function = null):void
		{
			trace(" ");
			trace("EVENT START =====> dataGrid_changeHandler()");
			
			if (DM.ManualTransactions.isAutoPopBMLocked())
			{
				trace("Lock_AutoPopBM = TRUE  ====> return directly");
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.LOADING__RESELECT_CMPT'));
				
				// Force using the correct transfer index, even if user intentially clicks some row else.
				view.transferDetailsGrid.selectedIndex = DM.ManualTransactions.getTransferRowIndex();
				trace("view.transferDetailsGrid.selectedIndex -->" + view.transferDetailsGrid.selectedIndex);
				trace("effectiveRowIndex -->" + DM.ManualTransactions.effectiveRowIndex);
				
				return;
			}
			
			if (DM.ManualTransactions.isRenderChangeLocked())
			{
				trace("Lock_RenderChange = TRUE  ====> droplist_changeHandler return directly");
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.LOADING__LISTITEM_CHANGED'));
				
				// Force using the correct transfer index, even if user intentially clicks some row else.
				view.transferDetailsGrid.selectedIndex = DM.ManualTransactions.getTransferRowIndex();
				
				trace("effectiveRowIndex -->" + DM.ManualTransactions.effectiveRowIndex);
				return;
			}
			
			// Set current transfer row index, which will be used in later message handlers such as dataprovider change - refreshBaseMeter().
			DM.ManualTransactions.setTransferRowIndex(view.transferDetailsGrid.selectedIndex);
			
			if (DM.ManualTransactions.transferDataArr)
			{
				var currTransferIndex:int;
				var oTmp:Object;
				
				currTransferIndex = view.transferDetailsGrid.selectedIndex;
				
				// Store current selected transfer data to filter base/meter data (when adding base/meter).
				oTmp = DM.ManualTransactions.transferDataArr.getItemAt(currTransferIndex);
				DM.ManualTransactions.setTransferDataRef(currTransferIndex, 1, oTmp.trsf_drwr_cd);
				DM.ManualTransactions.setTransferDataRef(currTransferIndex, 2, oTmp.trsf_drwr_prod_cd);
				DM.ManualTransactions.setTransferDataRef(currTransferIndex, 3, oTmp.trsf_arm_cd);
				DM.ManualTransactions.curr_selected_transfer = currTransferIndex;
				
				// Automatically popolate base & meter data.
				if (oTmp.trsf_drwr_cd && oTmp.trsf_drwr_prod_cd && oTmp.trsf_arm_cd)
				{
					autoPopulateBaseMeter(currTransferIndex, callback);
				}
				
				// Update the the meter arraycollection.
				DM.ManualTransactions.validateMeter(currTransferIndex);
				
				// Update the the baseprod arraycollection.
				DM.ManualTransactions.validateBaseProd(currTransferIndex);
			}
			trace("EVENT END =====> dataGrid_changeHandler()");
			trace(" ");
		}
		
		/**
		 *  
		 *  
		 */
		public function bsprodtotGrid_changeHandler(event:GridSelectionEvent):void
		{
//			var dmMT:dmManualTransactions = DM.ManualTransactions;
//
//			dmMT.OBS_curr = dmMT.baseprodTotalDataArr[view.baseprodTotalDataGrid.selectedIndex].trsf_bs_qty_amb;
//			dmMT.DEN_curr = dmMT.baseprodTotalDataArr[view.baseprodTotalDataGrid.selectedIndex].trsf_bs_den;
		}
		
		/**
		 *  
		 *  
		 */
		public function new_trans_type_changeHandler(event:IndexChangeEvent = null):void
		{
			trace("new_trans_type -> "+view.new_trans_type.selectedIndex)
			
			resetSettings();
			initialize();
			updateStatus();
			resetItemsVisibility();
			clearTextInput_OO();
			DM.ManualTransactions.resetLockAutoPopBM();
			DM.ManualTransactions.resetTransferRowIndex();
		}
		
		/**
		 *  
		 *  
		 */
		public function new_supplier_changeHandler(event:IndexChangeEvent, callback:Function = null):void
		{
			trace("new_supplier -> "+view.new_supplier.selectedIndex)
			if (view.new_supplier.selectedIndex > -1)
			{
				clearTextInput_OO();
				
				switch(view.new_trans_type.selectedItem.id)
				{
					case "S":  // Shipment(Non Open Order)
					case "N":  // Nomination
						// Reset the lower level items selection. Ver2.8
						resetSettingsByLevel('SUPPLIER');
						initializeByLevel('SUPPLIER');
						
						//replace amf ASYNC call DM.ManualTransactions.getTripNumber(view.new_trans_type.selectedItem.id, view.new_supplier.selectedItem.CMPY_CODE);
						getTripNumber(view.new_trans_type.selectedItem.id, view.new_supplier.selectedItem.CMPY_CODE, callback);
						
						break;
					case "O":  // Open Order
						//DM.ManualTransactions.getOpenOrderNumber(view.new_supplier.selectedItem.CMPY_CODE);
						//replace amf ASYNC call DM.ManualTransactions.getCustomersBySupplier(view.new_supplier.selectedItem.CMPY_CODE);
						
						var call:CallResponder = new CallResponder();
						var oDst:Object;
						call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_CUST_BY_SUPP'));});
						call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
							DM.ManualTransactions.customers = new ArrayCollection();
							for each (var o:Object in obj.result)
							{
								DM.ManualTransactions.customers.addItem(o);
							}
							for each (var o:Object in DM.ManualTransactions.customers)
							{
								o.CODE_NAME = o.CUST_ACNT + " - " + o.CUST_CMPY_NAME;
							}
							// Reset the lower level items selection.
							resetSettingsByLevel('SUPPLIER');
							initializeByLevel('SUPPLIER');
							
							if (callback != null)
								callback();
							
							// After the cascade calls do the processes below.
							updateStatus();
							DM.ManualTransactions.resetLockAutoPopBM();
							DM.ManualTransactions.resetTransferRowIndex();
						});
						call.token = view.manualtransactionsservice.getCustomersBySupplier(view.new_supplier.selectedItem.CMPY_CODE);
						
						break;
					/* 0711 Merged with shipment
					case "N":  // Nomination
					DM.ManualTransactions.getNomiItemNumber(view.new_supplier.selectedItem.CMPY_CODE);
					
					break;
					*/
					default:
						break;
				}
				// Supplier+Drawer(from trip) -> Driver. Moved to getDriverCodeBySuppDrawer.
				///DM.ManualTransactions.view = view;
				///DM.ManualTransactions.getDriverCodeBySuppDrawer(view.new_supplier.selectedItem.CMPY_CODE);
			}
			
			/* NOTE: HERE IS NOT THE LAST PROCESS OF THIS FUNCTION */
			
			updateStatus();
			DM.ManualTransactions.resetLockAutoPopBM();
			DM.ManualTransactions.resetTransferRowIndex();
		}
		
		/**
		 *  
		 *  
		 */
		public function new_customer_changeHandler(event:IndexChangeEvent, callback:Function = null):void
		{
			trace("new_customer -> "+view.new_customer.selectedIndex)
			if (view.new_customer.selectedIndex > -1)
			{
				// Reset the lower level items selection.
				resetSettingsByLevel('CUSTOMER');
				initializeByLevel('CUSTOMER');
				clearTextInput_OO();
				
				//replace amf ASYNC call DM.ManualTransactions.getOpenOrderNumberByCustomer(view.new_customer.selectedItem.CUST_ACNT);
				var call:CallResponder = new CallResponder();
				var oDst:Object;
				call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_OO_BY_CUST'));});
				call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
					DM.ManualTransactions.openorders = new ArrayCollection();
					for each (var o:Object in obj.result)
					{
						DM.ManualTransactions.openorders.addItem(o);
					}
					
					if (callback != null)
						callback();
				});
				call.token = view.manualtransactionsservice.getOpenOrderNumberByCustomer(view.new_customer.selectedItem.CUST_ACNT);
			}
			
			/* NOTE: HERE IS NOT THE LAST PROCESS OF THIS FUNCTION */
			updateStatus();
			DM.ManualTransactions.resetLockAutoPopBM();
			DM.ManualTransactions.resetTransferRowIndex();
		}
		// ORI		
		//		public function new_carrier_changeHandler(event:IndexChangeEvent):void
		//		{
		//			trace("new_carrier -> "+view.new_carrier.selectedIndex)
		//			if (view.new_carrier.selectedIndex > -1)
		//			{
		//				DM.ManualTransactions.view = view;  // coz getTanker's callback may set default selected tanker.
		//				if (view.new_trans_type.selectedItem.id != "O" )
		//				{
		//					//
		//					// Shipment & Nomination
		//					//
		//					
		//					// Level 1
		//					//replace amf ASYNC call DM.ManualTransactions.getTanker(view.new_carrier.selectedItem.CMPY_CODE);
		//					getTanker(view.new_carrier.selectedItem.CMPY_CODE, function():void{
		//					
		//						// Level 2 - callback
		//						// After the cascade calls do the processes below.
		//						updateStatus();
		//						DM.ManualTransactions.resetLockAutoPopBM();
		//						DM.ManualTransactions.resetTransferRowIndex();
		//					});
		//				}
		//				else
		//				{
		//					//
		//					// Open Order
		//					//
		//					
		//					// Reset the lower level items selection.
		//					resetSettingsByLevel('CARRIER');
		//					initializeByLevel('CARRIER');
		//
		//					// Level 1
		//					//replace amf ASYNC call DM.ManualTransactions.getTanker_OO(view.new_carrier.selectedItem.CMPY_CODE);
		//					getTanker_OO(view.new_carrier.selectedItem.CMPY_CODE, function():void{
		//					
		//						// Level 2 - callback
		//						view.new_tanker.selectedIndex = DM.ManualTransactions.getDefaultTanker();
		//						if (view.new_tanker.selectedIndex > -1)
		//						{
		//							// Do the same thing as Tanker change event.
		//							if (view.new_supplier.selectedIndex > -1 && view.new_order.selectedIndex > -1 && view.new_tanker.selectedIndex > -1)
		//							{
		//								new_tanker_changeHandler(null, null);
		//							}
		//						}
		//						else
		//						{
		//							// After the cascade calls do the processes below.
		//							updateStatus();
		//							DM.ManualTransactions.resetLockAutoPopBM();
		//							DM.ManualTransactions.resetTransferRowIndex();
		//						}
		//					}); // end of getTanker_OO
		//				}
		//			}
		//			
		//			/* NOTE: HERE IS NOT THE LAST PROCESS OF THIS FUNCTION */
		//		}
		
		/**
		 *  
		 *  
		 */
		public function new_carrier_changeHandler(event:IndexChangeEvent, callback:Function = null):void
		{
			trace("new_carrier -> "+view.new_carrier.selectedIndex)
			if (view.new_carrier.selectedIndex > -1)
			{
				DM.ManualTransactions.view = view;  // coz getTanker's callback may set default selected tanker.
				if (callback == null) // User input from GUI
				{
					if (view.new_trans_type.selectedItem.id != "O" )
					{
						//
						// Shipment & Nomination
						//
						
						// Level 1
						//replace amf ASYNC call DM.ManualTransactions.getTanker(view.new_carrier.selectedItem.CMPY_CODE);
						getTanker(view.new_carrier.selectedItem.CMPY_CODE, function():void{
							
							// Level 2 - callback
							// Ver2.5 Added [S]
							// If tanker changed, should invoke the tanker change event.
							if (view.new_tanker.selectedIndex > -1)
							{
								// Do the same thing as Tanker change event.
								if (view.new_supplier.selectedIndex > -1 && view.new_trip.selectedIndex > -1 && view.new_tanker.selectedIndex > -1)
								{
									new_tanker_changeHandler(null, null);
								}
							}
							else
							// Ver2.5 Added [E]
							{
								// After the cascade calls do the processes below.
								updateStatus();
								DM.ManualTransactions.resetLockAutoPopBM();
								DM.ManualTransactions.resetTransferRowIndex();
							}
						});
					}
					else
					{
						//
						// Open Order
						//
						
						// Reset the lower level items selection.
						resetSettingsByLevel('CARRIER');
						initializeByLevel('CARRIER');
						
						// Level 1
						//replace amf ASYNC call DM.ManualTransactions.getTanker_OO(view.new_carrier.selectedItem.CMPY_CODE);
						getTanker_OO(view.new_carrier.selectedItem.CMPY_CODE, function():void{
							
							// Level 2 - callback
							view.new_tanker.selectedIndex = DM.ManualTransactions.getDefaultTanker();
							
							if (view.new_tanker.selectedIndex > -1)
							{
								// Do the same thing as Tanker change event.
								if (view.new_supplier.selectedIndex > -1 && view.new_order.selectedIndex > -1 && view.new_tanker.selectedIndex > -1)
								{
									new_tanker_changeHandler(null, null);
								}
							}
							else
							{
								// After the cascade calls do the processes below.
								updateStatus();
								DM.ManualTransactions.resetLockAutoPopBM();
								DM.ManualTransactions.resetTransferRowIndex();
							}
						}); // end of getTanker_OO
					}
				}
				else  // callback != null  Load saved Manual Transaction data
				{
					if (view.new_trans_type.selectedItem.id != "O" )
					{
						//
						// Shipment & Nomination
						//
						
						// Level 1
						//replace amf ASYNC call DM.ManualTransactions.getTanker(view.new_carrier.selectedItem.CMPY_CODE);
						getTanker(view.new_carrier.selectedItem.CMPY_CODE, function():void{
							
							// Level 2 - callback
							if (callback != null)
								callback();
							
							// After the cascade calls do the processes below.
							updateStatus();
							DM.ManualTransactions.resetLockAutoPopBM();
							DM.ManualTransactions.resetTransferRowIndex();
						});
					}
					else
					{
						//
						// Open Order
						//
						
						// Reset the lower level items selection.
						resetSettingsByLevel('CARRIER');
						initializeByLevel('CARRIER');
						
						// Level 1
						//replace amf ASYNC call DM.ManualTransactions.getTanker_OO(view.new_carrier.selectedItem.CMPY_CODE);
						getTanker_OO(view.new_carrier.selectedItem.CMPY_CODE, function():void{
							
							// Level 2 - callback
							view.new_tanker.selectedIndex = DM.ManualTransactions.getDefaultTanker();
							
							if (callback != null)
								callback();
							
							// Ver2.6 added
							// After the cascade calls do the processes below.
							updateStatus();
							DM.ManualTransactions.resetLockAutoPopBM();
							DM.ManualTransactions.resetTransferRowIndex();
						}); // end of getTanker_OO
					}
				}
			}
			
			/* NOTE: HERE IS NOT THE LAST PROCESS OF THIS FUNCTION */
		}
		
		/*ORI
		public function new_trip_changeHandler(event:IndexChangeEvent):void
		{
		trace("new_trip -> "+view.new_trip.selectedIndex)
		if (view.new_trip.selectedIndex >= 0)
		{
		clearTextInput_OO();
		
		// Get current schedule type.
		var call:CallResponder = new CallResponder()
		call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.STH_WRONG'));});
		call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
		for each (var oSrc:Object in obj.result)
		{
		if (oSrc.LD_TYPE.toUpperCase()      == "PRESCHEDULE")
		DM.ManualTransactions.schedule_type = "BY_COMPARTMENT";
		else if (oSrc.LD_TYPE.toUpperCase() == "PREORDER")
		DM.ManualTransactions.schedule_type = "BY_PRODUCT";
		else if (oSrc.LD_TYPE.toUpperCase() == "CUSTOMERORDER")
		DM.ManualTransactions.schedule_type = "BY_OPENORDER";
		else
		DM.ManualTransactions.schedule_type = "UNKNOWN";
		break;
		}
		
		changeItemsVisibility();
		});
		call.token = view.manualtransactionsservice.getSchdTypeBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE, view.new_trip.selectedItem.SHLS_TRIP_NO);				
		
		// Get prod list of by prod
		var call:CallResponder = new CallResponder()
		call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.STH_WRONG'));});
		call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
		DM.ManualTransactions.schdbyprodlist = new ArrayCollection();
		for each (var oSrc:Object in obj.result)
		{
		DM.ManualTransactions.schdbyprodlist.addItem(
		{
		CODE_NAME    : oSrc.PROD_CODE + '-' + oSrc.PROD_NAME + ' (Planned:' + oSrc.SCHP_SPECQTY + ' | Loaded:' + oSrc.QTY_LOADED + ' | ' + oSrc.UNIT_NAME + ')',
		PROD_CODE    : oSrc.PROD_CODE,
		PROD_NAME    : oSrc.PROD_NAME,
		PROD_CMPY    : oSrc.PROD_CMPY,
		SCHP_SPECQTY : oSrc.SCHP_SPECQTY,
		QTY_LOADED   : oSrc.QTY_LOADED
		});
		}
		});
		call.token = view.manualtransactionsservice.getDrawerProdSchdByProd(view.new_supplier.selectedItem.CMPY_CODE, view.new_trip.selectedItem.SHLS_TRIP_NO);
		
		// Refresh Carrier, Tanker, Drawer and Drawer Products list.
		var temp : ArrayCollection = new ArrayCollection();
		
		DM.ManualTransactions.view = view;
		DM.ManualTransactions.getCarriersBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
		DM.ManualTransactions.getTankersBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
		// no need to do DM.ManualTransactions.getDrawersBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
		// no need to do DM.ManualTransactions.getDrawerProductsBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
		DM.ManualTransactions.getScheduleDetailsBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
		
		updateStatus();
		DM.ManualTransactions.resetLockAutoPopBM();
		DM.ManualTransactions.resetTransferRowIndex();
		}
		}
		*/

		/**
		 *  
		 *  
		 */
		public function new_trip_changeHandler(event:IndexChangeEvent, callback:Function = null):void
		{
			trace("new_trip -> "+view.new_trip.selectedIndex)
			if (view.new_trip.selectedIndex >= 0)
			{
				// Disable user interaction.Ver3.0 added
				if (0){//testing
				if (DM.ManualTransactions.isWorkResLocked())
				{
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.PROCESSING__CANNOT_CHANGE_ITEM'));
					return;
				}
				DM.ManualTransactions.lockWorkRes();
				}
				
				// Reset the lower level items selection. Ver2.8
				resetSettingsByLevel('TRIP');
				initializeByLevel('TRIP');
				
				clearTextInput_OO();
				
				// Level 1
				//------------------------------------------------------------------------------------------
				// Get current schedule type.
				getSchdTypeBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE, view.new_trip.selectedItem.SHLS_TRIP_NO, function():void{
					
					// Level 2 - callback
					//------------------------------------------------------------------------------------------
					// Get prod list of by prod.
					getDrawerProdSchdByProd(view.new_supplier.selectedItem.CMPY_CODE, view.new_trip.selectedItem.SHLS_TRIP_NO, function():void{
						
						DM.ManualTransactions.view = view;
						
						// Level 3 - callback
						//------------------------------------------------------------------------------------------
						// Get the trip's carrier.
						// Ver2.5 Added
						getSpecifiedCarrierBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO, function():void{
							
							// Level 4 - callback
							//------------------------------------------------------------------------------------------
							// Refresh Carrier, Tanker, Drawer and Drawer Products list.
							getCarriersBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO, DM.ManualTransactions.schedule_type, DM.ManualTransactions.schedule_stat, function():void{
								
								// Level 5 - callback
								//------------------------------------------------------------------------------------------
								// Get tankers by supplier and trip.
								getTankersBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO, function():void{
									
									// Level 6 - callback
									//------------------------------------------------------------------------------------------
									// no need to do DM.ManualTransactions.getDrawersBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
									// no need to do DM.ManualTransactions.getDrawerProductsBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
									//replace amf ASYNC call DM.ManualTransactions.getScheduleDetailsBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
									getScheduleDetailsBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO, function():void{
										
										if (!(DM.ManualTransactions.schedule_type == "BY_PRODUCT" && DM.ManualTransactions.schedule_sub_type == "SUB1"))
										{
											// Level 7 - callback
											//------------------------------------------------------------------------------------------
											// Populate Driver list.
											// No further processes needed after getting driver list, so at the moment no need to use callback.
											getDriversBySuppDrawer(function():void{
												
												// Initialize Transfer data.
												
												// Ver2.3 
												// For REPOST transaction, don't populate transfers according to trip no,
												// there could be multiple transfers against one compartment,
												// populate transfers data after genRepostUserData().
												if (isRepost == REPOST_ON)
												{
													DM.ManualTransactions.initializeTransfer_pre_repost();
												}
												else
												{
													DM.ManualTransactions.initializeTransfer();
												}
												
												if (callback != null)
													callback();
												
												// After the cascade calls do the processes below.
												updateStatus();
												DM.ManualTransactions.resetLockAutoPopBM();
												DM.ManualTransactions.resetTransferRowIndex();
												DM.ManualTransactions.unlockWorkRes();
											}); // end of getDriversBySuppDrawer
										}
										else // Schedule type is PreOrder and Carrier or Tanker is Generic.
										{
											if (callback != null)
												callback();
											
											// After the cascade calls do the processes below.
											updateStatus();
											DM.ManualTransactions.resetLockAutoPopBM();
											DM.ManualTransactions.resetTransferRowIndex();
											DM.ManualTransactions.unlockWorkRes();
										}
									}); // end of getScheduleDetailsBySuppTrip
								}); // end of getTankersBySuppTrip
							}); // end of getCarriersBySuppTrip
						}); // end of getSpecifiedCarrierBySuppTrip
					}); // end of getDrawerProdSchdByProd
				}); // end of getSchdTypeBySuppTrip
			}
			
			/* NOTE: HERE IS NOT THE LAST PROCESS OF THIS FUNCTION */
		}
		
		/**
		 *  
		 *  
		 */
		public function new_order_changeHandler(event:IndexChangeEvent, callback:Function = null):void
		{
			trace("new_order -> "+view.new_order.selectedIndex)
			if (view.new_order.selectedIndex >= 0)
			{
				// Reset the lower level items selection.
				resetSettingsByLevel('OPEN_ORDER_NO');
				initializeByLevel('OPEN_ORDER_NO');
				
				clearTextInput_OO();
				changeItemsVisibility();
				
				// Set current schedule type.
				DM.ManualTransactions.schedule_type = "BY_PRODUCT";
				
				DM.ManualTransactions.view = view;  // coz getCarriersByOpenOrder's callback may set default selection.
				// Get carrier of the Open Order.
				// Level 1
				//replace amf ASYNC call DM.ManualTransactions.getCarriersByOpenOrder(view.new_order.selectedItem.ORDER_CUST_ORDNO);
				getCarriersByOpenOrder(view.new_order.selectedItem.ORDER_CUST_ORDNO, function():void{
					if (callback == null)  //  User input from GUI
					{
						// Ver2.5 Added. For Open Order, always lists all carriers.
						// Level 2 - callback
						getAllCarriers_OO(new_order_change_ext, function():void{
							if (view.new_carrier.selectedIndex > -1)
							{
								// Level 3 - callback
								getTanker_OO(view.new_carrier.selectedItem.CMPY_CODE, function():void{
									// Level 4 - callback
									view.new_tanker.selectedIndex = DM.ManualTransactions.getDefaultTanker();
									if (view.new_tanker.selectedIndex > -1)
									{
										// Do the same thing as Tanker change event.
										if (view.new_supplier.selectedIndex > -1 && view.new_order.selectedIndex > -1 && view.new_tanker.selectedIndex > -1)
										{
											new_tanker_changeHandler(null, new_order_change_ext);
										}
									}
									else
									{
										// After the cascade calls do the processes below.
										new_order_change_ext();
									}
								}); // end of getTanker_OO
							}
						});
						
						/* Ver2.5 Commented out.
						// Level 2 - callback
						if (DM.ManualTransactions.carriers.length == 0) // Retrive carriar again.
						{
							trace("cust order has no carrier specified  -> now get all carriers")
							getAllCarriers(new_order_change_ext);
						}
						else if (DM.ManualTransactions.carriers.length == 1) // Set default selected Carrier.
						{
							// Ver2.5 Added. For Open Order, allow user to select all carriers.
							//getAllCarriers(new_order_change_ext, function():void{
							
								// Level 3 - callback
								view.new_carrier.selectedIndex = DM.ManualTransactions.getDefaultCarrier();
								if (view.new_carrier.selectedIndex > -1)
								{
									getTanker_OO(view.new_carrier.selectedItem.CMPY_CODE, function():void{
										// Level 4 - callback
										view.new_tanker.selectedIndex = DM.ManualTransactions.getDefaultTanker();
										if (view.new_tanker.selectedIndex > -1)
										{
											// Do the same thing as Tanker change event.
											if (view.new_supplier.selectedIndex > -1 && view.new_order.selectedIndex > -1 && view.new_tanker.selectedIndex > -1)
											{
												new_tanker_changeHandler(null, new_order_change_ext);
											}
										}
										else
										{
											// After the cascade calls do the processes below.
											new_order_change_ext();
										}
									}); // end of getTanker_OO
								}
							//});
						}
						else
						{
							new_order_change_ext();
						}
						*/
					}
					else  // callback != null   Load saved Manual Transaction data or tansfer from other screens.
					{
						// Ver2.5 Added. For Open Order, always lists all carriers.
						// Level 2 - callback
						getAllCarriers_OO(new_order_change_ext, callback);
						
						/* Ver2.5 Commented out.
						// Level 2 - callback
						if (DM.ManualTransactions.carriers.length == 0) // Retrive carriar again.
						{
							trace("cust order has no carrier specified  -> now get all carriers")
							getAllCarriers(new_order_change_ext, callback);
						}
						else
						{
							new_order_change_ext(callback);
						}
						*/
					}
				});
			}
			
			/* NOTE: HERE IS NOT THE LAST PROCESS OF THIS FUNCTION */
		}
		
		/**
		 *  
		 *  
		 */
		public function new_order_change_ext(callback:Function = null):void{
			// Level 1
			// Get order products details.
			//replace amf ASYNC call DM.ManualTransactions.getOrderProductsByCustOrderNo(view.new_order.selectedItem.ORDER_CUST_ORDNO);
			getOrderProductsByCustOrderNo(view.new_order.selectedItem.ORDER_CUST_ORDNO, function():void{
				
				// Level 2 - callback
				// Get additional info (Cumstomer Code/Delivery Location) details.
				//replace amf ASYNC call DM.ManualTransactions.getAdditionalInfoByCustOrderNo(view.new_order.selectedItem.ORDER_CUST_ORDNO);
				getAdditionalInfoByCustOrderNo(view.new_order.selectedItem.ORDER_CUST_ORDNO, function():void{
					
					if (callback != null)
						callback();
					
					// Level 3 - callback
					updateStatus();
					DM.ManualTransactions.resetLockAutoPopBM();
					DM.ManualTransactions.resetTransferRowIndex();
				}); // end of getAdditionalInfoByCustOrderNo
			}); // end of getOrderProductsByCustOrderNo
		}
		
		/**
		 *  
		 *  
		 */
		public function new_nomi_item_changeHandler(event:IndexChangeEvent):void
		{
			updateStatus();
		}
		
		/**
		 *  
		 *  
		 */
		public function new_tanker_changeHandler(event:IndexChangeEvent, callback:Function = null):void
		{
			var ci:int;
			for ( ci=0; ci<view.new_carrier.dataProvider.length; ci++ )
			{
				var obj:Object = view.new_carrier.dataProvider[ci];
				if ( view.new_tanker.selectedIndex > -1 && obj.hasOwnProperty("CMPY_NAME") && obj["CMPY_NAME"] == view.new_tanker.selectedItem["TNKR_CARRIER_NAME"] )
				{
					view.new_carrier.selectedIndex = ci;
					break;
				}
			}
			
			trace("new_tanker -> "+view.new_tanker.selectedIndex)
			switch(view.new_trans_type.selectedItem.id)
			{
				case "S":  // Shipment(Non Open Order)
				case "N":  // Nomination
					if (view.new_tanker.selectedIndex > -1)
					{
						switch(DM.ManualTransactions.schedule_type)
						{
							case "BY_COMPARTMENT":
								DM.ManualTransactions.view = view;
								
								// Level 1
								//------------------------------------------------------------------------------------------
								//replace amf ASYNC call DM.ManualTransactions.getEquipment(view.new_tanker.selectedItem.TNKR_CODE);
								getEquipment(view.new_tanker.selectedItem.TNKR_CODE, function():void{
									
									// Level 2 - callback
									//------------------------------------------------------------------------------------------
									//replace amf ASYNC call DM.ManualTransactions.getCompartment(view.new_tanker.selectedItem.TNKR_CODE);
									getCompartment(view.new_tanker.selectedItem.TNKR_CODE, function():void{
										
										// Level 3 - callback
										//------------------------------------------------------------------------------------------
										// As Equipment & Compartment contents changed, update the Equipment & Compartment contents in Transfer grid.
										if (view.new_supplier.selectedIndex > -1 && view.new_trip.selectedIndex > -1)
										{
											DM.ManualTransactions.initializeTransfer();
										}
										
										// After the cascade calls do the processes below.
										updateStatus();
										DM.ManualTransactions.resetLockAutoPopBM();
										DM.ManualTransactions.resetTransferRowIndex();
									}); // end of getCompartment
								}); // end of getEquipment
								break;
							case "BY_PRODUCT":
								switch(DM.ManualTransactions.schedule_sub_type)
								{
									case "SUB1": // Generic Tanker specified.
										DM.ManualTransactions.view = view;
										
										// Level 1
										//------------------------------------------------------------------------------------------
										//replace amf ASYNC call DM.ManualTransactions.getEquipment(view.new_tanker.selectedItem.TNKR_CODE);
										getEquipment(view.new_tanker.selectedItem.TNKR_CODE, function():void{
											
											// Level 2 - callback
											//------------------------------------------------------------------------------------------
											//replace amf ASYNC call DM.ManualTransactions.getCompartment(view.new_tanker.selectedItem.TNKR_CODE);
											getCompartment(view.new_tanker.selectedItem.TNKR_CODE, function():void{
												
												// Level 3 - callback
												//------------------------------------------------------------------------------------------
												getScheduleDetailsBySuppTrip_sub1(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO,view.new_tanker.selectedItem.TNKR_CODE, function():void{
													
													// Level 4 - callback
													//------------------------------------------------------------------------------------------
													getDriversBySuppDrawer(function():void{
														
														// Level 5 - callback
														//------------------------------------------------------------------------------------------
														// As Equipment & Compartment contents changed, update the Equipment & Compartment contents in Transfer grid.
														if (view.new_supplier.selectedIndex > -1 && view.new_trip.selectedIndex > -1)
														{
															DM.ManualTransactions.initializeTransfer();
														}
														
														// This callback call is added for BY_PRODUCT and Carrier is 'Generic Carrier'.
														if (callback != null)
															callback();
														
														// After the cascade calls do the processes below.
														updateStatus();
														DM.ManualTransactions.resetLockAutoPopBM();
														DM.ManualTransactions.resetTransferRowIndex();
													}); // end of getDriversBySuppDrawer
												}); // end of getScheduleDetailsBySuppTrip_sub1
											}); // end of getCompartment
										}); // end of getEquipment
										break;
									default: // DM.ManualTransactions.schedule_sub_type != "SUB1"
										// Ver2.5 Added. User can change tanker for PreOrder. Similar to Open Order.
										
										// Reset the lower level items selection.
										resetSettingsByLevel('TANKER');
										initializeByLevel('TANKER');
										
										DM.ManualTransactions.view = view;
										
										// Level 1
										//------------------------------------------------------------------------------------------
										//replace amf ASYNC call DM.ManualTransactions.getEquipment(view.new_tanker.selectedItem.TNKR_CODE);
										getEquipment(view.new_tanker.selectedItem.TNKR_CODE, function():void{
											
											// Level 2 - callback
											//------------------------------------------------------------------------------------------
											//replace amf ASYNC call DM.ManualTransactions.getCompartment(view.new_tanker.selectedItem.TNKR_CODE);
											getCompartment(view.new_tanker.selectedItem.TNKR_CODE, function():void{
												// Level 3 - callback
												//------------------------------------------------------------------------------------------
												// Get PreOrder details.
												getPreOrderDetailsByTanker(view.new_supplier.selectedItem.CMPY_CODE, view.new_trip.selectedItem.SHLS_TRIP_NO, view.new_tanker.selectedItem.TNKR_CODE, function():void{
													
													// Level 4 - callback
													//------------------------------------------------------------------------------------------
													// Populate Driver list.
													getDriversBySuppDrawer(function():void{
														
														// Level 5 - callback
														//------------------------------------------------------------------------------------------
														// Initialize Transfer data.
														if (view.new_supplier.selectedIndex > -1 && view.new_trip.selectedIndex > -1)
														{
															DM.ManualTransactions.initializeTransfer();
														}
														
														if (callback != null)
															callback();
														
														// After the cascade calls do the processes below.
														updateStatus();
														DM.ManualTransactions.resetLockAutoPopBM();
														DM.ManualTransactions.resetTransferRowIndex();
													}); // end of getDriversBySuppDrawer
												}); // end of getOrderDetailsByTanker
											}); // end of getCompartment
										}); // end of getEquipment
										break;
								}
								break;
							default:
								break;
						}
					}
					break;
				case "O":  // Open Order
					if (view.new_supplier.selectedIndex > -1 && view.new_order.selectedIndex > -1 && view.new_tanker.selectedIndex > -1)
					{
						// Reset the lower level items selection.
						resetSettingsByLevel('TANKER');
						initializeByLevel('TANKER');
						
						DM.ManualTransactions.view = view;
						// Level 1
						//------------------------------------------------------------------------------------------
						//replace amf ASYNC call DM.ManualTransactions._timing_openorder_count = 0;
						//replace amf ASYNC call DM.ManualTransactions.getEquipment(view.new_tanker.selectedItem.TNKR_CODE);
						getEquipment(view.new_tanker.selectedItem.TNKR_CODE, function():void{
							
							// Level 2 - callback
							//------------------------------------------------------------------------------------------
							//replace amf ASYNC call DM.ManualTransactions.getCompartment(view.new_tanker.selectedItem.TNKR_CODE);
							getCompartment(view.new_tanker.selectedItem.TNKR_CODE, function():void{
								
								// Level 3 - callback
								//------------------------------------------------------------------------------------------
								// Get Order details.
								//replace amf ASYNC call DM.ManualTransactions.getOrderDetailsByTanker(view.new_supplier.selectedItem.CMPY_CODE, view.new_order.selectedItem.ORDER_CUST_ORDNO, view.new_tanker.selectedItem.TNKR_CODE);
								getOrderDetailsByTanker(view.new_supplier.selectedItem.CMPY_CODE, view.new_order.selectedItem.ORDER_CUST_ORDNO, view.new_tanker.selectedItem.TNKR_CODE, function():void{
									
									// Level 4 - callback
									//------------------------------------------------------------------------------------------
									// Populate Driver list.
									getDriversBySuppDrawer(function():void{
										
										// Level 5 - callback
										//------------------------------------------------------------------------------------------
										// Initialize Transfer data.
										if (view.new_supplier.selectedIndex > -1 && view.new_order.selectedIndex > -1)
										{
											DM.ManualTransactions.initializeTransfer();
										}
										
										if (callback != null)
											callback();
										
										// After the cascade calls do the processes below.
										updateStatus();
										DM.ManualTransactions.resetLockAutoPopBM();
										DM.ManualTransactions.resetTransferRowIndex();
									}); // end of getDriversBySuppDrawer
								}); // end of getOrderDetailsByTanker
							}); // end of getCompartment
						}); // end of getEquipment
					}
					break;
				default:
					break;
			}
			
			/* NOTE: HERE IS NOT THE LAST PROCESS OF THIS FUNCTION */
		}
		
		/**
		 *  
		 *  
		 */
		public function new_user_changeHandler(event:IndexChangeEvent):void
		{
			if (view.new_user.selectedIndex >= 0)
			{
				// no process.
			}
			updateStatus();
		}

		/**
		 * Calc bases quantities according to drawer prod info(density+temp+amb) in each transfer.
		 *  
		 */
		public function calculateAllBasesForAllTrsfs(trsfRowIdx:int = -1):void
		{
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			var dmDM:Object = DM.ManualTransactions.transactionDataArr;
			_transferRowIdx = 0;
			_transferRowMax = dmDM.length;
			calExcl = new ArrayCollection();
			
			_CalAllBasesForAllTrsfsCallback = calculateAllBases;
			
			calculateAllBases();
			
			// ACC_BASE_ADJ
			dmMT.validateBaseprodTotalArr();
			
			dmMT.unsetAccBaseAdjusted();
		}
		
		/**
		 * Calc drawers/bases quantities according to drawer prod info(density+temp+amb/std/mass) in each transfer.
		 *  
		 */
		public function calculateAllBasesForAllTrsfs2():void
		{
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			
			// Ver3.1 added
			// Check whether user can do an 'initial' calculation.
			// If user did Acc Base adjustment, as the Drawer density could be updated,
			// need to get original density first then do the 'initial' calculation,
			// which is designed to restore all the Drawer/Base(inc Den and Qty) to original values.  
			if (isAccBaseAdjusted() == true)
			{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.NEED_RESTORE_ORIG_DENS'));
				return;
			}
			// Disable relevant buttons to prevent clicking again.
			disableButtons();
			
			invokeDrawerCal(callback_calDrawers);
			
		}
		
		/**
		 *  
		 *  
		 */
		public function getDensityFromTank(callback:Function = null):void
		{
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			
			if (dmMT.transactionDataArr)
			{
				trsfIndex       = 0;
				trsfGetDenCount = 0;
				
				// Disable buttons.
				disableButtons();
				
				getTankInfo(trsfIndex, function():void{
				
					// Since densities could be updated in  Base total.
					copyCurrBPTotalToPrevBPTotal();
					
					// Ivalidate Base prod total arraycollection.(need to recalculate)
					DM.ManualTransactions.invalidateBaseprodTotalArr();
					
					// Set the flag to indicate Acc Base adjustment is not carried out yet. Ver3.1 added
					dmMT.unsetAccBaseAdjusted();
						
					// Refresh data grids.
					refreshTransferGrid();
					refreshBaseGrid();
					refreshBaseTotalGrid();
					
					// Show message.
					if (trsfGetDenCount > 0)
						global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SUCCEED_RESTORE_DP_BP_DENS'));

					else
						global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_RESTORE_DP_BP_DENS'));
					
					// Enable buttons.
					enableButtons();
				});
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function getTankInfo(trsfIdx:int, callback:Function = null):void
		{
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			if (trsfIdx < dmMT.transactionDataArr.length)
			{
				var drwr_cd:String = dmMT.transactionDataArr[trsfIdx].transfer.trsf_drwr_cd;
				var prod_cd:String = dmMT.transactionDataArr[trsfIdx].transfer.trsf_drwr_prod_cd;
				var arm_cd :String = dmMT.transactionDataArr[trsfIdx].transfer.trsf_arm_cd;
				
				// When these compulsory parameters have data, call the servcie to get tank info.
				if ((drwr_cd != null && drwr_cd != "")
				 && (prod_cd != null && prod_cd != "")
				 && (arm_cd  != null && arm_cd  != "")
					)
				{
					var call:CallResponder = new CallResponder();
					call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_DENS'));});
					call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
						// Cal drawer prod density.
						// Drawer Den = (R1*BASEDEN1 + R2*BASEDEN2 + ... + Rn*BASEDENn)/(R1 + R2 + ... + Rn)
						var tot1:Number = 0.0;
						var tot2:Number = 0.0;
						var bsCnt:int   = 0;
						for each (var o:Object in obj.result)
						{
							bsCnt++;
							tot1 += Number(o.RATIO_VALUE) * Number(o.STREAM_TANKDEN);
							tot2 += Number(o.RATIO_VALUE);
						}
						if (bsCnt != 0)  // Only cal the drawer density when there are Base product(s).
						{
							dmMT.transactionDataArr[trsfIdx].transfer.trsf_density = String(Math.round(tot1 / tot2 * DENSITY_DECIMAL) / DENSITY_DECIMAL);
						}
						else
						{
							dmMT.transactionDataArr[trsfIdx].transfer.trsf_density = null;  // Should be cleared.
						}
						
						// Update drawer product's bases densities.
						for each (var o:Object in obj.result)
						{
							// Go through each base in this compartment to update the relevant base's density.
							for (var bsIdx = 0; bsIdx < dmMT.transactionDataArr[trsfIdx].baseprod.length; bsIdx++)
							{
								// If matching base prod found, update its density(to tank density).
								if(o.STREAM_BASECODE == dmMT.transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_prodcd)
								{
									dmMT.transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_den = o.STREAM_TANKDEN;
								}
							}
							
							// Go through each base in base total to update the relevant base's density.
							for (var bstotIdx = 0; bstotIdx < dmMT.baseprodTotalDataArr.length; bstotIdx++)
							{
								// If matching base prod found, update its density(to tank density).
								if(o.STREAM_BASECODE == dmMT.baseprodTotalDataArr[bstotIdx].trsf_bs_prodcd)
								{
									dmMT.baseprodTotalDataArr[bstotIdx].trsf_bs_den = o.STREAM_TANKDEN;
								}
							}
						}
						
						// Increase the count of transfer which density retrieved.
						trsfGetDenCount++;
						
						// Process next transfer.
						trsfIndex++;
						getTankInfo(trsfIndex, callback);
					});
					call.token = view.manualtransactionsservice.getTankInfoByProdArm(drwr_cd, prod_cd, arm_cd);
				}
				else 
				{
					// Process next transfer.
					trsfIndex++;
					getTankInfo(trsfIndex, callback);
				}
			}
			else
			{
				if (callback != null)
					callback();
			}
			
		}
		
		/**
		 *  
		 *  
		 */
		public function deleteTransfer(event:MouseEvent):void
		{
			// TODO Auto-generated method stub
			if (DM.ManualTransactions.transferDataArr)
			{
				var currSelectedIndex:int = view.transferDetailsGrid.selectedIndex;
				
				if (currSelectedIndex != -1)
				{
					// Remove it from transfer grid.
					DM.ManualTransactions.transferDataArr.removeItemAt(currSelectedIndex);
					
					// Update transaction arraycollection.
					DM.ManualTransactions.transactionDataArr.removeItemAt(currSelectedIndex);
					
					// Update the the meter arraycollection.
					DM.ManualTransactions.validateMeter(currSelectedIndex);
					
					// Update the the baseprod arraycollection.
					DM.ManualTransactions.validateBaseProd(currSelectedIndex);
					
					// Remove the transfer data reference for this transfer item.
					DM.ManualTransactions.deleteTransferDataRef(currSelectedIndex);
					
					// Clear the current reference for selected transfer grid. Ver3.1 added
					DM.ManualTransactions.clearTransferDataRefIndex();
					
					// Ivalidate Base prod total arraycollection.(need to recalculate) Ver3.1
					DM.ManualTransactions.invalidateBaseprodTotalArr();
					
					// Set the flag to indicate Acc Base adjustment is not carried out yet. Ver3.1
					DM.ManualTransactions.unsetAccBaseAdjusted();
					
					// Update status
					updateStatus();
				}
				else
				{
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SELECT_ONE_TRSF_DATA'));
				}
			}
		}

		/**
		 *  
		 *  
		 */
		public function openLoadDiag(f:Function = null):void
		{
			var loadMTdataPopup:ViewPopupDlg = new ViewPopupDlg( mx.resources.ResourceManager.getInstance().getString('default','MTRAN.LOAD_WIN.TITLE'), new v_ManualTransactionsData(), closeDialogHandler);
			
			loadMTdataPopup.setSecurity(this.readOnly, this.canUpdate, this.canCreate, this.canDelete, this.hasPassword);
			
			loadMTdataPopup.parentWidth = view.width * 0.8;
			loadMTdataPopup.parentHeight = view.height * 0.8;
			loadMTdataPopup.openDialog();
			
			return;
		}
		
		/**
		 *  
		 *  
		 */
		public function save(callback:Function = null):void{
			var call:CallResponder = new CallResponder();
			var oDst:Object;
			var mt_head:String;
			var mt_body:String;
			var temp_trans_type:String    = '';
			var temp_schd_sub_type:String = '';
			var temp_supplier:String      = '';
			var temp_customer:String      = '';
			var temp_trip:String          = '';
			var temp_OO_no:String         = '';
			var temp_carrier:String       = '';
			var temp_tanker:String        = '';
			var temp_driver:String        = '';
			var dmMT:Object = DM.ManualTransactions;
			
			//
			// Preparing manual transaction head data
			//
			if (view.new_trans_type.selectedIndex > -1)
			{
				temp_trans_type = view.new_trans_type.selectedItem.id;
			}
			
			temp_schd_sub_type = DM.ManualTransactions.schedule_sub_type;
			
			if (view.new_supplier.selectedIndex > -1)
			{
				temp_supplier = view.new_supplier.selectedItem.CMPY_CODE;
			}
			
			if (view.new_customer.selectedIndex > -1)
			{
				temp_customer = view.new_customer.selectedItem.CUST_ACNT;
			}
			
			if (view.new_trip.selectedIndex > -1)
			{
				temp_trip = view.new_trip.selectedItem.SHLS_TRIP_NO;
			}
			
			if (view.new_order.selectedIndex > -1)
			{
				temp_OO_no = view.new_order.selectedItem.ORDER_CUST_ORDNO;
			}
			
			if (view.new_carrier.selectedIndex > -1)
			{
				temp_carrier = view.new_carrier.selectedItem.CMPY_CODE;
			}
			
			if (view.new_tanker.selectedIndex > -1)
			{
				temp_tanker = view.new_tanker.selectedItem.TNKR_CODE;
			}
			
			if (view.new_user.selectedIndex > -1)
			{
				temp_driver = view.new_user.selectedItem.PER_CODE;
			}
			
			mt_head =
				'<MANUALTRANSACTIONDATA_HEAD>' +
				'<TRANSACTION_TYPE>' 			+ temp_trans_type										+ '</TRANSACTION_TYPE>' +
				'<ORDER_TRIP_IND>' 				+ temp_OO_no 											+ '</ORDER_TRIP_IND>' +
				'<LOAD_NUMBER>' 				+ temp_trip												+ '</LOAD_NUMBER>' +
				'<SUPPLIER>' 					+ temp_supplier											+ '</SUPPLIER>' +
				'<CARRIER>' 					+ temp_carrier											+ '</CARRIER>' +
				'<TANKER_CODE>' 				+ temp_tanker											+ '</TANKER_CODE>' +
				'<OPERATOR_CODE>' 				+ temp_driver											+ '</OPERATOR_CODE>' +
				'<START_TIME>' 					+ String(view.trans_st_dmy.selectedDate)				+ '</START_TIME>' +
				'<FINISH_TIME>' 				+ String(view.trans_ed_dmy.selectedDate)				+ '</FINISH_TIME>' +
				'<CUSTOMER>' 					+ temp_customer											+ '</CUSTOMER>' +
				'<CUSTOMER_CODE>' 				+ view.new_customer_cd.text 							+ '</CUSTOMER_CODE>' +
				'<TAS_REF>' 					+ view.new_tas_ref.text 								+ '</TAS_REF>' +
				'<USER_COMMENTS>' 				+ view.new_user_comments.text 							+ '</USER_COMMENTS>' +
				'<SEAL_RANGE>' 				    + view.seal_range.text 							        + '</SEAL_RANGE>' +
				'<SCHD_SUB_TYPE>' 				+ temp_schd_sub_type									+ '</SCHD_SUB_TYPE>' +		          // Not displayed, internal use only.
				'<TRANSACTION_REPOST>' 			+ isRepost												+ '</TRANSACTION_REPOST>' +           // Not displayed, internal use only.
				'<CM_BASE_OBS_TOTAL>' 			+ dmMT.base_obs_total									+ '</CM_BASE_OBS_TOTAL>' +            // Control member.
				'<CM_BASE_STD_TOTAL>' 			+ dmMT.base_std_total									+ '</CM_BASE_STD_TOTAL>' +            // Control member.
				'<CM_BASE_MASS_TOTAL>' 			+ dmMT.base_mass_total									+ '</CM_BASE_MASS_TOTAL>' +           // Control member.
				'<CM_BASE_STD_TOTAL_DISP>' 		+ dmMT.base_std_total_disp								+ '</CM_BASE_STD_TOTAL_DISP>' +       // Control member.
				'<CM_BASE_MASS_TOTAL_DISP>' 	+ dmMT.base_mass_total_disp								+ '</CM_BASE_MASS_TOTAL_DISP>' +      // Control member.
				'<CM_BASE_STD_MASS_TOTAL_DISP>' + dmMT.base_std_mass_total_disp							+ '</CM_BASE_STD_MASS_TOTAL_DISP>' +  // Control member.
				'<CM_NEED_REFRESH_BP_TOTAL>' 	+ (dmMT.needRefreshBaseprodTotalDataArr == true ? 1:0)	+ '</CM_NEED_REFRESH_BP_TOTAL>' +     // Control member.
				'<CM_IS_ACC_BASE_ADJUSTED>' 	+ (dmMT.isAccBaseAdjusted == true ? 1:0)				+ '</CM_IS_ACC_BASE_ADJUSTED>' +      // Control member.
				'</MANUALTRANSACTIONDATA_HEAD>';
			
			//
			// Preparing manual transaction body data
			//			
			/* Transfers Info */
			var trf_no:int = 0;
			var trf:ArrayCollection = new ArrayCollection();
			var chkres:int;
			var mt_trsf:String = "";
			
			for each (var o:Object in DM.ManualTransactions.transactionDataArr)
			{
				// Base
				var bs_no:int = 0;
				var bs:ArrayCollection = new ArrayCollection();
				var strTmp:String;
				
				var mt_bp:String = "";
				var mt_mtr:String = "";
				
				for each (var x12:Object in o.baseprod)
				{
					var y12:Object = new Object();
					
					if (x12.trsf_bs_tk_cd)
						y12.Tank_Code    = x12.trsf_bs_tk_cd;
					else
						y12.Tank_Code    = null;
					if (x12.trsf_bs_prodcd)
						y12.product_code = x12.trsf_bs_prodcd;
					else
						y12.product_code = null;
					if (x12.trsf_bs_prodcls)
					{
						strTmp           = x12.trsf_bs_prodcls;
						y12.prod_class   = strTmp.toUpperCase();
					}
					else
					{
						y12.prod_class   = null;
					}
					y12.dens             = (isNaN(x12.trsf_bs_den    ) ? '' : x12.trsf_bs_den    );
					y12.Temperature      = (isNaN(x12.trsf_bs_temp   ) ? '' : x12.trsf_bs_temp   );
					y12.amb_vol          = (isNaN(x12.trsf_bs_qty_amb) ? '' : x12.trsf_bs_qty_amb);
					y12.cor_vol          = (isNaN(x12.trsf_bs_qty_cor) ? '' : x12.trsf_bs_qty_cor);
					y12.liq_kg           = (isNaN(x12.trsf_bs_load_kg) ? '' : x12.trsf_bs_load_kg);
					y12.base_ratio       = (isNaN(x12.trsf_bs_ratio  ) ? '' : x12.trsf_bs_ratio);
					
					mt_bp +=
						'<BASEPROD>' +
						'<TANK_CODE>' 		+ y12.Tank_Code 	+ '</TANK_CODE>' +
						'<PRODUCT_CODE>' 	+ y12.product_code 	+ '</PRODUCT_CODE>' +
						'<PROD_CLASS>' 		+ y12.prod_class 	+ '</PROD_CLASS>' +
						'<DENS>' 			+ y12.dens 			+ '</DENS>' +
						'<TEMPERATURE>' 	+ y12.Temperature 	+ '</TEMPERATURE>' +
						'<AMB_VOL>' 		+ y12.amb_vol 		+ '</AMB_VOL>' +
						'<COR_VOL>' 		+ y12.cor_vol 		+ '</COR_VOL>' +
						'<LIQ_KG>' 			+ y12.liq_kg 		+ '</LIQ_KG>' +
						'<BASE_RATIO>' 		+ y12.base_ratio 	+ '</BASE_RATIO>' +  // only used for GUI calculation.
						'</BASEPROD>';
					bs_no++;
				}
				
				// Meter
				var mtr_no:int = 0;
				var mtr:ArrayCollection = new ArrayCollection();
				for each (var x11:Object in o.meter)
				{
					var y11:Object = new Object();
					
					if (x11.trsf_mtr_typ)
						y11.Injector_or_Meter    = x11.trsf_mtr_typ;
					else
						y11.Injector_or_Meter    = null;
					if (x11.trsf_mtr_cd)
						y11.Meter_Injector_Code  = x11.trsf_mtr_cd;
					else
						y11.Meter_Injector_Code  = null;
					y11.open_amb                 = (isNaN(x11.trsf_mtr_opn_amb ) ? '' : x11.trsf_mtr_opn_amb );
					y11.open_cor                 = (isNaN(x11.trsf_mtr_opn_cor ) ? '' : x11.trsf_mtr_opn_cor );
					y11.open_kg                  = (isNaN(x11.trsf_mtr_open_kg ) ? '' : x11.trsf_mtr_open_kg );
					y11.close_amb                = (isNaN(x11.trsf_mtr_cls_amb ) ? '' : x11.trsf_mtr_cls_amb );
					y11.close_cor                = (isNaN(x11.trsf_mtr_cls_cor ) ? '' : x11.trsf_mtr_cls_cor );
					y11.close_kg                 = (isNaN(x11.trsf_mtr_close_kg) ? '' : x11.trsf_mtr_close_kg);
					
					mt_mtr +=
						'<METER>' +
						'<INJECTOR_OR_METER>' 	+ y11.Injector_or_Meter 	+ '</INJECTOR_OR_METER>' +
						'<METER_INJECTOR_CODE>' + y11.Meter_Injector_Code 	+ '</METER_INJECTOR_CODE>' +
						'<OPEN_AMB>' 			+ y11.open_amb 				+ '</OPEN_AMB>' +
						'<OPEN_COR>' 			+ y11.open_cor 				+ '</OPEN_COR>' +
						'<OPEN_KG>' 			+ y11.open_kg 				+ '</OPEN_KG>' +
						'<CLOSE_AMB>' 			+ y11.close_amb 			+ '</CLOSE_AMB>' +
						'<CLOSE_COR>' 			+ y11.close_cor 			+ '</CLOSE_COR>' +
						'<CLOSE_KG>' 			+ y11.close_kg 				+ '</CLOSE_KG>' +
						'</METER>';
					mtr_no++;
				}
				
				// Transfer
				var x1:Object = new Object;
				x1 = o.transfer;
				
				mt_trsf +=
					'<TRANSFER>' +
					'<DELV_NUM>' 			+ x1.trsf_delv_num									+ '</DELV_NUM>' +
					'<ARM_CODE>' 			+ x1.trsf_arm_cd									+ '</ARM_CODE>' +
					'<NR_IN_TKR>' 			+ x1.trsf_cmpt_no 									+ '</NR_IN_TKR>' +
					'<DRAWER_CODE>' 		+ x1.trsf_drwr_cd 									+ '</DRAWER_CODE>' +
					'<PRODUCT_CODE>' 		+ x1.trsf_drwr_prod_cd 								+ '</PRODUCT_CODE>' +
					'<DENS>' 				+ (isNaN(x1.trsf_density) ? '' : x1.trsf_density)	+ '</DENS>' +
					'<TEMPERATURE>' 		+ (isNaN(x1.trsf_temp   ) ? '' : x1.trsf_temp   )	+ '</TEMPERATURE>' +
					'<AMB_VOL>' 			+ (isNaN(x1.trsf_qty_amb) ? '' : x1.trsf_qty_amb)	+ '</AMB_VOL>' +
					'<COR_VOL>' 			+ (isNaN(x1.trsf_qty_cor) ? '' : x1.trsf_qty_cor)	+ '</COR_VOL>' +
					'<LIQ_KG>' 				+ (isNaN(x1.trsf_load_kg) ? '' : x1.trsf_load_kg)	+ '</LIQ_KG>' +
					'<EQUIPMENT_ID>' 		+ x1.trsf_equip_id 									+ '</EQUIPMENT_ID>' +
					'<PLANNED_QTY>' 		+ x1.trsf_drwr_prod_plan_qty						+ '</PLANNED_QTY>' +
					'<NUMBER_OF_BASES>' 	+ bs_no 											+ '</NUMBER_OF_BASES>' +
					'<NUMBER_OF_METERS>' 	+ mtr_no 											+ '</NUMBER_OF_METERS>' +
					mt_bp +
					mt_mtr +
					'</TRANSFER>';
				trf_no++;
			}
			if (trf.length == 0)
			{
				//global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.NO_VALID_TRANSFER'));
				//return;
			}
			
			/* Base Totals */
			var mt_bp_tol:String = "";
			for each (var oBPT:Object in DM.ManualTransactions.baseprodTotalDataArr)
			{
				var y12_tol:Object = new Object();
				var strTmp:String;
				
				if (oBPT.trsf_bs_tk_cd)
					y12_tol.Tank_Code    = oBPT.trsf_bs_tk_cd;
				else
					y12_tol.Tank_Code    = null;
				if (oBPT.trsf_bs_prodcd)
					y12_tol.product_code = oBPT.trsf_bs_prodcd;
				else
					y12_tol.product_code = null;
				if (oBPT.trsf_bs_prodcls)
				{
					strTmp               = oBPT.trsf_bs_prodcls;
					y12_tol.prod_class   = strTmp.toUpperCase();
				}
				else
				{
					y12_tol.prod_class   = null;
				}
				y12_tol.dens             = (isNaN(oBPT.trsf_bs_den    ) ? '' : oBPT.trsf_bs_den    );
				y12_tol.Temperature      = (isNaN(oBPT.trsf_bs_temp   ) ? '' : oBPT.trsf_bs_temp   );
				y12_tol.amb_vol          = (isNaN(oBPT.trsf_bs_qty_amb) ? '' : oBPT.trsf_bs_qty_amb);
				y12_tol.cor_vol          = (isNaN(oBPT.trsf_bs_qty_cor) ? '' : oBPT.trsf_bs_qty_cor);
				y12_tol.liq_kg           = (isNaN(oBPT.trsf_bs_load_kg) ? '' : oBPT.trsf_bs_load_kg);
				y12_tol.base_ratio       = (isNaN(oBPT.trsf_bs_ratio  ) ? '' : oBPT.trsf_bs_ratio);
				
				mt_bp_tol +=
					'<BASEPRODTOTAL>' +
					'<TANK_CODE>' 		+ y12_tol.Tank_Code 	+ '</TANK_CODE>' +
					'<PRODUCT_CODE>' 	+ y12_tol.product_code 	+ '</PRODUCT_CODE>' +
					'<PROD_CLASS>' 		+ y12_tol.prod_class 	+ '</PROD_CLASS>' +
					'<DENS>' 			+ y12_tol.dens 			+ '</DENS>' +
					'<TEMPERATURE>' 	+ y12_tol.Temperature 	+ '</TEMPERATURE>' +
					'<AMB_VOL>' 		+ y12_tol.amb_vol 		+ '</AMB_VOL>' +
					'<COR_VOL>' 		+ y12_tol.cor_vol 		+ '</COR_VOL>' +
					'<LIQ_KG>' 			+ y12_tol.liq_kg 		+ '</LIQ_KG>' +
					'<BASE_RATIO>' 		+ y12_tol.base_ratio 	+ '</BASE_RATIO>' +  // Not used in Base Prod Total tab.
					'</BASEPRODTOTAL>';
			}
			
			/* Meter Totals */
			var mt_mtr_tol:String = "";
			for each (var oMTRT:Object in DM.ManualTransactions.meterTotalDataArr)
			{
				var y11:Object = new Object();
				
				if (oMTRT.trsf_mtr_typ)
					y11.Injector_or_Meter    = oMTRT.trsf_mtr_typ;
				else
					y11.Injector_or_Meter    = null;
				if (oMTRT.trsf_mtr_cd)
					y11.Meter_Injector_Code  = oMTRT.trsf_mtr_cd;
				else
					y11.Meter_Injector_Code  = null;
				y11.open_amb                 = (isNaN(oMTRT.trsf_mtr_opn_amb ) ? '' : oMTRT.trsf_mtr_opn_amb );
				y11.open_cor                 = (isNaN(oMTRT.trsf_mtr_opn_cor ) ? '' : oMTRT.trsf_mtr_opn_cor );
				y11.open_kg                  = (isNaN(oMTRT.trsf_mtr_open_kg ) ? '' : oMTRT.trsf_mtr_open_kg );
				y11.close_amb                = (isNaN(oMTRT.trsf_mtr_cls_amb ) ? '' : oMTRT.trsf_mtr_cls_amb );
				y11.close_cor                = (isNaN(oMTRT.trsf_mtr_cls_cor ) ? '' : oMTRT.trsf_mtr_cls_cor );
				y11.close_kg                 = (isNaN(oMTRT.trsf_mtr_close_kg) ? '' : oMTRT.trsf_mtr_close_kg);
				
				mt_mtr_tol +=
					'<METERTOTAL>' +
					'<INJECTOR_OR_METER>' 	+ y11.Injector_or_Meter 	+ '</INJECTOR_OR_METER>' +
					'<METER_INJECTOR_CODE>' + y11.Meter_Injector_Code 	+ '</METER_INJECTOR_CODE>' +
					'<OPEN_AMB>' 			+ y11.open_amb 				+ '</OPEN_AMB>' +
					'<OPEN_COR>' 			+ y11.open_cor 				+ '</OPEN_COR>' +
					'<OPEN_KG>' 			+ y11.open_kg 				+ '</OPEN_KG>' +
					'<CLOSE_AMB>' 			+ y11.close_amb 			+ '</CLOSE_AMB>' +
					'<CLOSE_COR>' 			+ y11.close_cor 			+ '</CLOSE_COR>' +
					'<CLOSE_KG>' 			+ y11.close_kg 				+ '</CLOSE_KG>' +
					'</METERTOTAL>';
			}
			
			mt_body = '<MANUALTRANSACTIONDATA_BODY>' +
				'<TRANSFERS>' +
				mt_trsf +
				'</TRANSFERS>' +
				'<BASEPRODTOTALS>' +
				mt_bp_tol +
				'</BASEPRODTOTALS>' +
				'<METERTOTALS>' +
				mt_mtr_tol +
				'</METERTOTALS>' +
				'</MANUALTRANSACTIONDATA_BODY>';
			
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_SAVE_MT_DATA'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				if (obj != null && obj.result != null && obj.result > 0 /*&& DM.ManualTransactions.NeedSaveMsg == true*/)  // result ==> last seq# returned
				{
					global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SUCCEED_SAVE_MT_DATA') + " [" + String(obj.result) + "].");
				}
				else
				{
					global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_SAVE_MT_DATA'));
				}
				
				if (callback)
					callback();
			});
			
			var tmpStat:String = 'N';
			tmpStat = DM.ManualTransactions.IsSubmitSucceeded == true ? 'S' : 'N';
			
			call.token = view.manualtransactionsservice.saveMTData(
				'MANUAL_TRANSACTIONS', // Module ID
				mx.resources.ResourceManager.getInstance().getString('default','m_manualtransactions'), // Module Name????
				mt_head,               // Module head data
				mt_body,               // Module body data
				global.username,       // Login user name
				tmpStat                // Status   N: New; S: Submit succeed
			);
			
		}
		
		/**
		 *  
		 *  
		 */
		public function createManualTransaction():void
		{
			// Validate all mandatory fields.
			var checkRes:Object;
			var msgStr:String = "";
			checkRes = preCheck_Submit();
			if (checkRes)
			{
				for each (var o:Object in checkRes)
				{
					if (o.type == 'E')
					{
						msgStr += o.msg + "\r\n";
					}
				}
				if (msgStr != "")
				{
					global.msgWarning(msgStr);
					
					// If errors exist, user must fix them before continue.
					return;
				}
			}
			
			if (checkRes)
			{
				msgStr = "";
				for each (var o:Object in checkRes)
				{
					if (o.type == 'E2')
					{
						msgStr += o.msg + "\r\n";
					}
				}
				if (msgStr != "")
				{
					alertDiag = new DKI_AlertBox();
					alertDiag.callBack=function nosubmit():void{return;};
					alertDiag.msg= mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.ALERT_MUST_FIX_ERRORS_BELOW') + msgStr;
					PopUpManager.addPopUp(alertDiag,FlexGlobals.topLevelApplication as DisplayObject,true);
					PopUpManager.centerPopUp(alertDiag);
					alertDiag.img1.source = "assets/icons/canc.png"; 
					alertDiag.lbl1.setStyle("fontFamily", "Courier New");
					alertDiag.lbl1.setStyle("fontWeight", "bold");
					//alertDiag.lbl1.setStyle("fontSize", 13);
					alertDiag.lbl1.setStyle("textAlign", "left");
					return;
				}
			}
			
			if (checkRes)
			{
				msgStr = "";
				var maxLen:int = 0;
				// Find out the longest message length.
				for each (var o:Object in checkRes)
				{
					if (o.type == 'W')
					{
						if (o.msg.length > maxLen)
							maxLen = o.msg.length;
					}
				}
				for each (var o:Object in checkRes)
				{
					if (o.type == 'W')
					{
						if (o.msg.length < maxLen)
						{
							msgStr += padStringRight(o.msg, maxLen) + "\r\n";
						}
						else
						{
							msgStr += o.msg + "\r\n";
						}
					}
				}
				if (msgStr != "")
				{
					alertDiag = new DKI_AlertBox();
					alertDiag.callBack=submit;
					alertDiag.msg= mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.ALERT_CONT_WITH_WARNINGS') +
						mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.ALERT_CMPT_BASE_METER_FIELDS') + "\r\n" +
						padStringRight("-", maxLen, "-") + "\r\n" +
						msgStr;//mx.resources.ResourceManager.getInstance().getString('default','CONFIRM_DELETE_PERSONAL');
					PopUpManager.addPopUp(alertDiag,FlexGlobals.topLevelApplication as DisplayObject,true);
					PopUpManager.centerPopUp(alertDiag);
					alertDiag.lbl1.setStyle("fontFamily", "Courier New");
					alertDiag.lbl1.setStyle("fontWeight", "bold");
					//alertDiag.lbl1.setStyle("fontSize", 13);
					alertDiag.lbl1.setStyle("textAlign", "left");
				}
				else
				{
					submit();
				}
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function submitResultHandler(event:ResultEvent):void
		{
			if (event.message.body.result_code == 0)
			{
				global.msgSuccess(event.message.body.result_string);
				
				// Save user entered MT data.
				//				DM.ManualTransactions.IsSubmitSucceeded = true;
				//				DM.ManualTransactions.NeedSaveMsg = false;
				//				save(null);
				
				// Clear all fields.
				new_trans_type_changeHandler(null);
			}
			else
			{
				global.msgWarning(event.message.body.result_string);
			}
		}
		
		/**
		 *  Transfer Data Provider array collection change listener.
		 *  
		 */
		public function refreshBaseMeter(e:Event):void
		{
			////trace(view.transferDetailsGrid.selectedItem);
			
			trace(" ");
			trace("EVENT LISTENER START====> TransferGrid changed -----> refreshBaseMeter()");
			
			// Get current effective transfer index. This is the original transfer index when user click on the render,
			// which was set by setTransferRowIndex(rowIndex) in DrawerProductCodeRenderer & ArmCodeRenderer. 
			var currEffectiveTransferIdx:int = DM.ManualTransactions.getTransferRowIndex();
			
			// Automatically populate base & meter data.
			autoPopulateBaseMeter(currEffectiveTransferIdx, function():void{
				
				//
				// Ver2.2 Managed flow control. Moved the processes below to callback.
				//
				
				// Callback - Level 1
				_trsfIdx_ext = 0;
				autoPopulateBaseMeterExt(function():void{
				
					// Callback - Level 2
					// Update base temp in each transfer.
					refreshBaseTemp(currEffectiveTransferIdx);
					
					// Update base temp in base total array.
					refreshBaseTotalTemp(currEffectiveTransferIdx);
					
					// Update the the meter arraycollection.
					DM.ManualTransactions.validateMeter(currEffectiveTransferIdx);
					
					// Update the the baseprod arraycollection.
					DM.ManualTransactions.validateBaseProd(currEffectiveTransferIdx);
					
					trace("EVENT LISTENER END ====> TransferGrid changed -----> refreshBaseMeter()");
					trace(" ");
				});
			});
		}
		
		/*
		public function submitResultHandler(event:Event):void
		{
		
		if ( view.submitResult.lastResult == "OK" )
		{
		global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SUCCEED_SUBMIT_MT_DATA'));
		}
		else
		{
		global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_SUBMIT_MT_DATA'));
		}
		
		}
		*/
		
		/**
		 *  
		 *  
		 */
		public function baseTabNavi_creationCompleteHandler(event:Event):void
		{
			// Init base product tabs listener
			for (var i:int = 0; i < view.basedetailTabNavi.getChildren().length; i++)
			{
				var tab:Button = view.basedetailTabNavi.getTabAt(i);
				tab.addEventListener(FlexEvent.BUTTON_DOWN,bsTabClickHandler);
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function mtrTabNavi_creationCompleteHandler(event:Event):void
		{
			// Init meter tabs listener
			for (var i:int = 0; i < view.meterdetailTabNavi.getChildren().length; i++)
			{
				var tab:Button = view.meterdetailTabNavi.getTabAt(i);
				tab.addEventListener(FlexEvent.BUTTON_DOWN, mtrTabClickHandler);
			}
			
			// Set the Meter Total tab invisible.
			// Customer doesn't need it for each transfer(compartment).(But baiman need it V_V)
			// They only need Cumulative Meter Total per truck(transaction). 
			// includeInLayout="false" enabled="false" visible="false" wouldn't work if put in view.
			if (view.meterdetailTabNavi)
			{
				view.meterdetailTabNavi.getTabAt(0).visible = false;
				view.meterdetailTabNavi.getTabAt(0).enabled = false;
				view.meterdetailTabNavi.getTabAt(0).includeInLayout = false;
				view.meterdetailTabNavi.selectedIndex = 1;
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function bsTabClickHandler(event:FlexEvent):void
		{
			for (var i:int = 0; i < view.basedetailTabNavi.getChildren().length; i++)
			{
				if (event.target == view.basedetailTabNavi.getTabAt(i))
				{
					var child:Object = view.basedetailTabNavi.getChildAt(i);
					child.dispatchEvent(new MouseEvent(MouseEvent.CLICK));
					break;
				}
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function mtrTabClickHandler(event:FlexEvent):void
		{
			for (var i:int = 0; i < view.meterdetailTabNavi.getChildren().length; i++)
			{
				if (event.target == view.meterdetailTabNavi.getTabAt(i))
				{
					var child:Object = view.meterdetailTabNavi.getChildAt(i);
					child.dispatchEvent(new MouseEvent(MouseEvent.CLICK));
					break;
				}
			}
		}
		
		/**
		 * Base Prod Navi Tab click event handler.
		 * 
		 */
		public function bsTabClick(event:Event):void
		{
			if (event.target.hasOwnProperty("id"))  // Ignore the direct click on grid cells.
			{
				trace("base detail tab clicked:" +event.target.id)
				if (event.target.id == "bs_navi_1")
				{
					isBsTab1Enabled = true;
					isBsTab2Enabled = false;
				}
				
				if (event.target.id == "bs_navi_2")
				{
					isBsTab1Enabled = false;
					isBsTab2Enabled = true;
				}
				
				updateStatus();
			}
		}
		
		/**
		 * Meter Navi Tab click event handler.
		 * 
		 */
		public function mtrTabClick(event:Event):void
		{
			if (event.target.hasOwnProperty("id"))  // Ignore the direct click on grid cells.
			{
				trace("meter tab clicked:" +event.target.id)
				if (event.target.id == "mtr_navi_1")
				{
					isMtrTab1Enabled = true;
					isMtrTab2Enabled = false;
				}
				
				if (event.target.id == "mtr_navi_2")
				{
					isMtrTab1Enabled = false;
					isMtrTab2Enabled = true;
				}
				
				updateStatus();
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function closeDialogHandler():void
		{
			//loadMTData(loadMTdataPopup.popupView.controller.selectedID);
			if (DM.ManualTransactionsData.selectedID != '-1')
			{
				// Load user selected saved Manual Transaction data.
				loadMTData(DM.ManualTransactionsData.selectedID);
			}
			
			return;
			//			this.mainListSelection = view.mainList.selectedIndex;
			//			view.currentState = "normal";
			//			DM.MovementNominations.resultHandler = mainListRefreshHandler;
			//			this.refreshMainFilter();
		}
		
		/**
		 *  
		 *  
		 */
		public function close_clickHandler(event:MouseEvent):void
		{
			if (hasPassword)
			{
				PopUpManager.addPopUp(chkPass,FlexGlobals.topLevelApplication.main,true);
				PopUpManager.centerPopUp(chkPass);
				chkPass.canceled=false;
				chkPass.userPassword.text="";
				chkPass.title=mx.resources.ResourceManager.getInstance().getString('default','CONFIRM_PASSWORD');
				chkPass.addEventListener(CloseEvent.CLOSE,onClose);
			}
			else
			{
				//closeTrans();
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function onClose(event:CloseEvent):void
		{
			if (!chkPass.canceled)
			{
				if (chkPass.userPassword.text == global.userpass)
				{
					//closeTrans();
				}
				else
				{
					global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_CHECK_PASSWORD'));
				}
			}
			PopUpManager.removePopUp(chkPass);
			chkPass.removeEventListener(CloseEvent.CLOSE,onClose);
		}
		
		/**
		 *  
		 *  
		 */
		public function cancelBtn_clickHandler(event:MouseEvent):void
		{
			//clearDetail();
			if ( view.currentState== "normal" )
			{
				//dataGrid.enabled=true;
			}
			view.currentState="widget";
			//dataGrid.selectedIndex = -1;
		}
		
		
		/**
		 *  
		 *  
		 */
		public function cancel_clickHandler(event:MouseEvent):void
		{
			view.currentState="normal";
			//createMode=false;
			//dataGrid.selectedIndex = idx;
		}
		
		/**
		 *  
		 *  
		 */
		public function onDTClickOK(event:Event):void
		{
			datetimeCheck(0);
		}
		
		/**
		 * Check the Start and End date time.
		 * 
		 * mode 0:triggered by event  1:on demand
		 */
		public function datetimeCheck(mode:int):int
		{
			var ret: int = 0;
			var now_date:    Date;
			var set_st_date: Date;
			var set_ed_date: Date;
			
			now_date    = new Date(global.serverDateTime);
			set_st_date = new Date(Date.parse(view.trans_st_dmy.selectedDate));
			set_ed_date = new Date(Date.parse(view.trans_ed_dmy.selectedDate));
			
			if (set_st_date > now_date || set_ed_date > now_date)
			{
				if (mode == 0)
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.CANNOT_SPECIFY_FUTURE_DT'));
				ret = 1;
			}
			else if (set_ed_date < set_st_date)
			{
				if (mode == 0)
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.END_DT_LT_START_DT'));
				ret = 2;
			}
			else
			{
				ret = 0;
			}
			
			return ret;
		}
		
		
		//--------------------------------------------------------------------//
		//               Message Handle Member Functions  [END]               //
		//--------------------------------------------------------------------//
		
		/**
		 *  
		 *  
		 */
		public function mtrTotal2EachMtr():void
		{
			var tonumber:Number;
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			var o:Object;
			o = dmMT.meterTotalDataArr[view.meterTotalDatagrid.selectedIndex];
			
			//
			// Distribute the meter data in cumulative meter to each transfer's meter.
			//
			
			// Check each meter data in cumulative meter array.
			for (var mtrTolIdx:int = 0; mtrTolIdx < dmMT.meterTotalDataArr.length; mtrTolIdx++)
			{
				// Compare it with each transfer's meters.
				for (var trsfIdx:int = 0; trsfIdx < dmMT.transactionDataArr.length; trsfIdx++)
				{
					for (var mtrIdx:int = 0; mtrIdx < dmMT.transactionDataArr[trsfIdx].meter.length; mtrIdx++)
					{
						if (dmMT.meterTotalDataArr[mtrTolIdx].trsf_mtr_cd == dmMT.transactionDataArr[trsfIdx].meter[mtrIdx].trsf_mtr_cd)
						{
							// Matched meter code found in transfer's meters.
							// Then set the meter data(OPEN&CLOSE in this transfer) according to the relevant cumulative meter data.
							dmMT.transactionDataArr[trsfIdx].meter[mtrIdx].trsf_mtr_opn_amb  = dmMT.meterTotalDataArr[mtrTolIdx].trsf_mtr_opn_amb ;
							dmMT.transactionDataArr[trsfIdx].meter[mtrIdx].trsf_mtr_cls_amb  = dmMT.meterTotalDataArr[mtrTolIdx].trsf_mtr_cls_amb ;
							dmMT.transactionDataArr[trsfIdx].meter[mtrIdx].trsf_mtr_opn_cor  = dmMT.meterTotalDataArr[mtrTolIdx].trsf_mtr_opn_cor ;
							dmMT.transactionDataArr[trsfIdx].meter[mtrIdx].trsf_mtr_cls_cor  = dmMT.meterTotalDataArr[mtrTolIdx].trsf_mtr_cls_cor ;
							dmMT.transactionDataArr[trsfIdx].meter[mtrIdx].trsf_mtr_open_kg  = dmMT.meterTotalDataArr[mtrTolIdx].trsf_mtr_open_kg ;
							dmMT.transactionDataArr[trsfIdx].meter[mtrIdx].trsf_mtr_close_kg = dmMT.meterTotalDataArr[mtrTolIdx].trsf_mtr_close_kg;
						}
					}
				}
			}
		}
		
		/**
		 * Check the left QTY of a selected product. 
		 * If the balance is equal to/below zero, user can't specify any quantity.
		 * 
		 */
		public function balanceQtyCheck(o:Object):int
		{
			var res:int = 0;
			
			// Available QTY check
			if (DM.ManualTransactions.schedule_type == "BY_COMPARTMENT")
			{
				if ((o.trsf_drwr_prod_plan_qty - o.trsf_drwr_prod_loaded_qty <= 0)
				&& o.trsf_drwr_prod_plan_qty != null)
				{
					res = 1;
				}
			}
			else if (DM.ManualTransactions.schedule_type == "BY_PRODUCT")
			{
				// NOTE: Open Order's schedule type is BY_PRODUCT
				// Check the selected drawer product in the container list.
				for each (var obj:Object in DM.ManualTransactions.schdbyprodlist)
				{
					if (o.trsf_drwr_prod_cd == obj.PROD_CODE)
					{
						if (obj.SCHP_SPECQTY - obj.QTY_LOADED <= 0)
						{
							res = 1;
							break;
						}
					}
				}
			}
			if (res)
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.PROD_BALANCE_BELOW_ZERO'));
			
			return res;
		}
		
		/**
		 *  
		 *  
		 */
		public function preCheck_CalQty(trsfRowIdx:int = -1):int
		{
			var ret:int = 0;
			var currTsfIdx:int;
			
			//0705
			if (trsfRowIdx == -1) 
			{
				currTsfIdx = view.transferDetailsGrid.selectedIndex;
			}
			else
			{
				currTsfIdx = trsfRowIdx;
			}
			
			var trans:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTsfIdx);
			
			// Check the drawer product data.
			if (!trans.transfer.trsf_qty_amb || !trans.transfer.trsf_temp || !trans.transfer.trsf_density
			|| (trans.transfer.trsf_density && !trans.transfer.trsf_arm_cd) // Ver2.0 Added. When startup MT screen from REPOST(or other screens?),
																		    // the arm code could be null, in this case, the density is NOT acceptable.
																		    // NOTE: Regarding the Arm Code check,
																		    //       maybe add some check here to distinguish NORAML/REPOST/other cases...
																		    //       which depends on what the requirement is...
			)
			{
				ret = 1;
				return ret;
			}
			
			// Check the base products data.
			for (var baseRowIdx:int = 0; baseRowIdx < trans.baseprod.length; baseRowIdx++)
			{
				if (!trans.baseprod[baseRowIdx].trsf_bs_den
				|| (trans.baseprod[baseRowIdx].trsf_bs_den && trans.baseprod[baseRowIdx].trsf_bs_den == 0)
				|| !trans.baseprod[baseRowIdx].trsf_bs_temp)
				{
					ret = 1;
					break;
				}
			}
			
			return ret;
		}
		
		/**
		 * Calc bases quantities according to drawer prod info(density+temp+amb).
		 *  
		 */
		public function calculateAllBases(trsfRowIdx:int = -1, callback:Function = null):void
		{
			if (trsfRowIdx == -1)
				trsfRowIdx = _transferRowIdx;
			
			// Ver2.0
			// Firstly sync Drawer Prod Temp to its all bases.
			// Since the bases temp could be null when user changes the arm,
			// (which is a previous requirment - pop base temp as blank and only when user changes the temp in drawer prod then auto pop its bases temp),
			// but when we do the ondemand cal qty, the bases temp is one of compulsory parameters,
			// if it is left as blank, there could be a warning message which is annoying.
			// So force to update bases temp in this transfer.
			// The temp in base total tab may also need update?!
			refreshBaseTemp(trsfRowIdx, 1);
			
			// Precheck before do the calculation.
			var res:int;
			res = preCheck_CalQty(trsfRowIdx);
			if (res != 0)
			{
				// temporarily comment out ver1.8 global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.CHECK_DP_BP_DENS_TEMP'));
				
				// Current row doesn't have enough data to calculate. Put its compartment no in warning msg.
				if (calExcl != null)
					calExcl.addItem(DM.ManualTransactions.transactionDataArr.getItemAt(trsfRowIdx).transfer.trsf_cmpt_no);
				
				nextCalQtyCall();
				return;
			}
			
			var currTsfIdx:int;
			
			//0705
			if (trsfRowIdx == -1) 
			{
				currTsfIdx = view.transferDetailsGrid.selectedIndex;
			}
			else
			{
				currTsfIdx = trsfRowIdx;
			}
			
			if (currTsfIdx == -1)
				return;
			
			///var currTsfIdx:int = tsfIdx; // Avoid selection change with no base refreshed
			
			//var found:Boolean = false;
			var total:Number  = 0;
			var trans:Object  = DM.ManualTransactions.transactionDataArr.getItemAt(currTsfIdx);
			var trsf:Object   = DM.ManualTransactions.transactionDataArr.getItemAt(currTsfIdx).transfer;//DM.ManualTransactions.transferDataArr[currTsfIdx];
			_feedbackCounter = 0;
			totalSTDL 		 = 0;
			totalKG   		 = 0;
			
			for (var i:int = 0; i < trans.baseprod.length; i++)
			{
				/*
				if (trans.baseprod[i].trsf_bs_qty_amb != null ||
				trans.baseprod[i].trsf_bs_qty_cor != null || 
				trans.baseprod[i].trsf_bs_load_kg != null){
				found=true;
				}	
				*/
				total += Number(trans.baseprod[i].trsf_bs_ratio);
			}
			
			// Clear all base qty. Force calcBaseQty to cal.
			for (var i:int = 0; i < trans.baseprod.length; i++)
			{
				trans.baseprod[i].trsf_bs_qty_amb = null;
				trans.baseprod[i].trsf_bs_qty_cor = null;
				trans.baseprod[i].trsf_bs_load_kg = null;
			}
			DM.ManualTransactions.transactionDataArr.refresh();
			
			for (var baseRowIdx:int = 0; baseRowIdx < trans.baseprod.length; baseRowIdx++)
			{
				var tmpStr:String = trans.baseprod[baseRowIdx].trsf_bs_prodcls;
				if (tmpStr.toUpperCase() != "ADDITIVE")
				{
					// non-additive: no decimals --> 3 decimals
					trans.baseprod[baseRowIdx].trsf_bs_qty_amb = 
						Math.round(Number(trans.baseprod[baseRowIdx].trsf_bs_ratio) / total * trans.transfer.trsf_qty_amb * QTY_DECIMAL) / QTY_DECIMAL; //Ver2.7 added QTY_DECIMAL
				}
				else
				{
					// additive: 3 decimals
					trans.baseprod[baseRowIdx].trsf_bs_qty_amb = 
						Math.round(Number(trans.baseprod[baseRowIdx].trsf_bs_ratio) / total * trans.transfer.trsf_qty_amb * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
				}
				
				DM.ManualTransactions.transactionDataArr.refresh();
				
				// Calc one base quantities.
				//view.callLater(function():void{
					calcBaseQty(null, trsfRowIdx, baseRowIdx, trans.baseprod.length, callback);
				//});
			}
			
			//DM.ManualTransactions.base_obs_total = getBaseObsTotal();
		}
		
		/**
		 *  
		 *  
		 */
		public function canEnableCalBtn():Boolean
		{
			if (DM.ManualTransactions.transactionDataArr != null && DM.ManualTransactions.transactionDataArr.length > 0)
				return true;
			else
				return false;
		}
		
		/**
		 *  
		 *  
		 */
		public function getBaseObsTotal():String
		{
			var currTsfIdx:int = view.transferDetailsGrid.selectedIndex;
			var bs_obs_total:int = 0;
			var ret:String = "";
			
			if (currTsfIdx != -1)
			{
				for (var i:int = 0; i < DM.ManualTransactions.transactionDataArr.getItemAt(currTsfIdx).baseprod.length; i++)
				{
					bs_obs_total += DM.ManualTransactions.transactionDataArr.getItemAt(currTsfIdx).baseprod[i].trsf_bs_qty_amb
				}
				
				ret = String(bs_obs_total);
			}
			else
			{
				ret = "";
			}
			
			return ret;
		}
		
		/**
		 *  
		 *  
		 */
//		public function autoPopulateBaseMeter(rowIndex:int = -1, callback:Function = null):void
//		{
//			trace("in autoPopulateBaseMeter()");
//			
//			var currTransferIndex:int;
//			var oTmp:Object;
//			
//			if (!view.transferDetailsGrid) return;
//			
//			//currTransferIndex = view.transferDetailsGrid.selectedIndex;
//			currTransferIndex = view.transferDetailsGrid.selectedIndex == -1 ? view.transferDetailsGrid.selectedIndex : rowIndex;
//			
//			if (currTransferIndex == -1) return;
//			
//			if (DM.ManualTransactions.isAutoPopBMLocked())
//			{
//				trace("Lock_AutoPopBM = TRUE  ====> return directly");
//				return;
//			}
//			
//			oTmp = DM.ManualTransactions.transferDataArr.getItemAt(currTransferIndex);
//			
//			if (isRepost == REPOST_OFF)
//			{
//				//
//				// Normal MT case.
//				//
//				
//				// Automatically populate base & meter data.
//				if (DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).baseprod.length == 0
//				//&& DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).meter.length == 0
//				)
//				{
//					var tempBaseProd:ArrayCollection = new ArrayCollection();
//					var call:CallResponder = new CallResponder();
//					
//					// Set up lock.
//					DM.ManualTransactions.lockAutoPopBM();
//					
//					call.addEventListener(FaultEvent.FAULT,function():void{
//						global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_AUTO_FILL_BASE_METER_DATA'));
//						DM.ManualTransactions.unlockAutoPopBM();
//					});
//					call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
//						
//						for (var i:int = 0; i < obj.result.length; i++) 
//						{
//							var oSrc:Object = obj.result[i];
//							
//							// Existing base prod check. If base prod already existed, no need to create again.
//							var bsFound:Boolean = false;
//							if (DM.ManualTransactions.transactionDataArr)
//							{
//								var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex);
//								for (var bsIdx:int = 0; bsIdx < oDst.baseprod.length; bsIdx++)
//								{
//									if (oDst.baseprod[bsIdx].trsf_bs_prodcd == oSrc.STREAM_BASECODE)
//									{
//										bsFound = true;
//										break;
//									}
//								}
//							}
//							
//							// Create one base.
//							if (!bsFound)
//							{
//								createBaseProd(currTransferIndex);
//								if (DM.ManualTransactions.transactionDataArr)
//								{
//									var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex);
//									if (oDst.baseprod.length > 0)   //0704 currTransferIndex is not current selected one???
//									{
//										oDst.baseprod[oDst.baseprod.length-1].trsf_bs_prodcd = oSrc.STREAM_BASECODE;
//										
//										// Ver2.0 Added. For the calculation in base total tab.
//										// Tank Code is needed in 'Find tank codes(whick user selected arm linked) in tank code repository.'
//										oDst.baseprod[oDst.baseprod.length-1].trsf_bs_tk_cd  = oSrc.STREAM_TANKCODE; 
//										
//										oDst.baseprod[oDst.baseprod.length-1].trsf_bs_ratio  = oSrc.RATIO_VALUE;
//									}
//								}
//							}
//							
//							// Existing meter check. If meter already existed, no need to create again.
//							var mtrFound:Boolean = false;
//							if (DM.ManualTransactions.transactionDataArr)
//							{
//								var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex);
//								for (var mtrIdx:int = 0; mtrIdx < oDst.meter.length; mtrIdx++)
//								{
//									if (oDst.meter[mtrIdx].trsf_mtr_cd == oSrc.STREAM_MTRCODE)
//									{
//										mtrFound = true;
//										break;
//									}
//								}
//							}
//							
//							// Create one meter.
//							if (!mtrFound)
//							{
//								createMeter(currTransferIndex);
//								if (DM.ManualTransactions.transactionDataArr)
//								{
//									var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex);
//									if (oDst.meter.length > 0)
//									{
//										oDst.meter[oDst.meter.length-1].trsf_mtr_cd = oSrc.STREAM_MTRCODE;
//									}
//								}
//							}
//						}
//						
//						// Populate Base and Meter totals.
//						var dmMT:Object = DM.ManualTransactions;
//						if (dmMT.transactionDataArr)
//						{
//							// Process bases in each transfer.
//							for (var trsfIdx:int = 0; trsfIdx < dmMT.transactionDataArr.length; trsfIdx++)
//							{
//								// Process every base.
//								var oSrc:Object = dmMT.transactionDataArr.getItemAt(trsfIdx);
//								for (var bsIdx:int = 0; bsIdx < oSrc.baseprod.length; bsIdx++)
//								{
//									// Check whether this base exists in basetotal array.
//									var found:int = 0;
//									if (dmMT.baseprodTotalDataArr)
//									{
//										for (var bstotIdx:int = 0; bstotIdx < dmMT.baseprodTotalDataArr.length; bstotIdx++)
//										{
//											if (oSrc.baseprod[bsIdx].trsf_bs_prodcd == dmMT.baseprodTotalDataArr[bstotIdx].trsf_bs_prodcd)
//											{
//												found = 1;
//												break;
//											}
//										}
//									}
//									// If not found in base total array, then add it.
//									if (!found)
//									{
//										dmMT.baseprodTotalDataArr.addItem(new Object());
//										dmMT.baseprodTotalDataArr.getItemAt(dmMT.baseprodTotalDataArr.length-1).trsf_bs_prodcd = oSrc.baseprod[bsIdx].trsf_bs_prodcd;
//									}
//								}
//							}
//							
//							// Populate cumulative Meter totals.
//							var dmMT:Object = DM.ManualTransactions;
//							if (dmMT.transactionDataArr)
//							{
//								// Process meters in each transfer.
//								for (var trsfIdx:int = 0; trsfIdx < dmMT.transactionDataArr.length; trsfIdx++)
//								{
//									// Process every meter.
//									var oSrc:Object = dmMT.transactionDataArr.getItemAt(trsfIdx);
//									for (var mtrIdx:int = 0; mtrIdx < oSrc.meter.length; mtrIdx++)
//									{
//										// Check whether this meter exists in metertotal array.
//										var found:int = 0;
//										if (dmMT.meterTotalDataArr)
//										{
//											for (var mtrtotIdx:int = 0; mtrtotIdx < dmMT.meterTotalDataArr.length; mtrtotIdx++)
//											{
//												if (oSrc.meter[mtrIdx].trsf_mtr_cd == dmMT.meterTotalDataArr[mtrtotIdx].trsf_mtr_cd)
//												{
//													found = 1;
//													break;
//												}
//											}
//										}
//										// If not found in meter total array, then add it.
//										if (!found)
//										{
//											dmMT.meterTotalDataArr.addItem(new Object());
//											dmMT.meterTotalDataArr.getItemAt(dmMT.meterTotalDataArr.length-1).trsf_mtr_cd = oSrc.meter[mtrIdx].trsf_mtr_cd;
//										}
//									}
//								}
//							}
//							
//							// Calc base totals.
//							trace("autoPopulateBaseMeter ====> calcAllBaseTotals()");
//							calcAllBaseTotals();
//							
//							// Unlock.
//							DM.ManualTransactions.unlockAutoPopBM();
//							if (dmMT.isRenderChangeLocked())
//							{
//								dmMT.unlockRenderChange();
//							}
//						}
//						
//					});
//					if (1/*oTmp.trsf_drwr_cd != null && oTmp.trsf_drwr_prod_cd != null && oTmp.trsf_arm_cd != null*/)
//					{
//						call.token = view.manualtransactionsservice.getBaseDetails(oTmp.trsf_drwr_cd, oTmp.trsf_drwr_prod_cd, oTmp.trsf_arm_cd);
//					}
//					else
//					{
//						// Can't get base details
//					}
//				}
//			}
//			else // REPOST_ON
//			{
//				//
//				// Ver2.0 REPOST MT case.
//				// There is no meter data passed into MT module.
//				
//				
//				// Automatically populate base & meter data.
//				if (DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).baseprod.length == 0
//					//&& DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).meter.length == 0
//				)
//				{
//					var tempBaseProd:ArrayCollection = new ArrayCollection();
//					var call:CallResponder = new CallResponder();
//					
//					// Set up lock.
//					DM.ManualTransactions.lockAutoPopBM();
//					
//					call.addEventListener(FaultEvent.FAULT,function():void{
//						global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_AUTO_FILL_BASE_METER_DATA'));
//						DM.ManualTransactions.unlockAutoPopBM();
//					});
//					call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
//						
//						for (var i:int = 0; i < obj.result.length; i++) 
//						{
//							var oSrc:Object = obj.result[i];
//							
//							// Existing base prod check. If base prod already existed, no need to create again.
//							var bsFound:Boolean = false;
//							if (DM.ManualTransactions.transactionDataArr)
//							{
//								var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex);
//								for (var bsIdx:int = 0; bsIdx < oDst.baseprod.length; bsIdx++)
//								{
//									if (oDst.baseprod[bsIdx].trsf_bs_prodcd == oSrc.STREAM_BASECODE)
//									{
//										bsFound = true;
//										break;
//									}
//								}
//							}
//							
//							// Create one base.
//							if (!bsFound)
//							{
//								createBaseProd(currTransferIndex);
//								if (DM.ManualTransactions.transactionDataArr)
//								{
//									var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex);
//									if (oDst.baseprod.length > 0)   //0704 currTransferIndex is not current selected one???
//									{
//										oDst.baseprod[oDst.baseprod.length-1].trsf_bs_prodcd = oSrc.STREAM_BASECODE;
//										
//										// Ver2.0 Added. For the calculation in base total tab.
//										// Tank Code is needed in 'Find tank codes(whick user selected arm linked) in tank code repository.'
//										oDst.baseprod[oDst.baseprod.length-1].trsf_bs_tk_cd  = oSrc.STREAM_TANKCODE; 
//										
//										oDst.baseprod[oDst.baseprod.length-1].trsf_bs_ratio  = oSrc.RATIO_VALUE;
//									}
//								}
//							}
//							
//							// Existing meter check. If meter already existed, no need to create again.
//							var mtrFound:Boolean = false;
//							if (DM.ManualTransactions.transactionDataArr)
//							{
//								var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex);
//								for (var mtrIdx:int = 0; mtrIdx < oDst.meter.length; mtrIdx++)
//								{
//									if (oDst.meter[mtrIdx].trsf_mtr_cd == oSrc.STREAM_MTRCODE)
//									{
//										mtrFound = true;
//										break;
//									}
//								}
//							}
//							
//							// Create one meter.
//							if (!mtrFound)
//							{
//								createMeter(currTransferIndex);
//								if (DM.ManualTransactions.transactionDataArr)
//								{
//									var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex);
//									if (oDst.meter.length > 0)
//									{
//										oDst.meter[oDst.meter.length-1].trsf_mtr_cd = oSrc.STREAM_MTRCODE;
//									}
//								}
//							}
//						}
//						
//						// Populate Base and Meter totals.
//						var dmMT:Object = DM.ManualTransactions;
//						if (dmMT.transactionDataArr)
//						{
//							// Process bases in each transfer.
//							for (var trsfIdx:int = 0; trsfIdx < dmMT.transactionDataArr.length; trsfIdx++)
//							{
//								// Process every base.
//								var oSrc:Object = dmMT.transactionDataArr.getItemAt(trsfIdx);
//								for (var bsIdx:int = 0; bsIdx < oSrc.baseprod.length; bsIdx++)
//								{
//									// Check whether this base exists in basetotal array.
//									var found:int = 0;
//									if (dmMT.baseprodTotalDataArr)
//									{
//										for (var bstotIdx:int = 0; bstotIdx < dmMT.baseprodTotalDataArr.length; bstotIdx++)
//										{
//											if (oSrc.baseprod[bsIdx].trsf_bs_prodcd == dmMT.baseprodTotalDataArr[bstotIdx].trsf_bs_prodcd)
//											{
//												found = 1;
//												break;
//											}
//										}
//									}
//									// If not found in base total array, then add it.
//									if (!found)
//									{
//										dmMT.baseprodTotalDataArr.addItem(new Object());
//										dmMT.baseprodTotalDataArr.getItemAt(dmMT.baseprodTotalDataArr.length-1).trsf_bs_prodcd = oSrc.baseprod[bsIdx].trsf_bs_prodcd;
//									}
//								}
//							}
//							
//							// Populate cumulative Meter totals.
//							var dmMT:Object = DM.ManualTransactions;
//							if (dmMT.transactionDataArr)
//							{
//								// Process meters in each transfer.
//								for (var trsfIdx:int = 0; trsfIdx < dmMT.transactionDataArr.length; trsfIdx++)
//								{
//									// Process every meter.
//									var oSrc:Object = dmMT.transactionDataArr.getItemAt(trsfIdx);
//									for (var mtrIdx:int = 0; mtrIdx < oSrc.meter.length; mtrIdx++)
//									{
//										// Check whether this meter exists in metertotal array.
//										var found:int = 0;
//										if (dmMT.meterTotalDataArr)
//										{
//											for (var mtrtotIdx:int = 0; mtrtotIdx < dmMT.meterTotalDataArr.length; mtrtotIdx++)
//											{
//												if (oSrc.meter[mtrIdx].trsf_mtr_cd == dmMT.meterTotalDataArr[mtrtotIdx].trsf_mtr_cd)
//												{
//													found = 1;
//													break;
//												}
//											}
//										}
//										// If not found in meter total array, then add it.
//										if (!found)
//										{
//											dmMT.meterTotalDataArr.addItem(new Object());
//											dmMT.meterTotalDataArr.getItemAt(dmMT.meterTotalDataArr.length-1).trsf_mtr_cd = oSrc.meter[mtrIdx].trsf_mtr_cd;
//										}
//									}
//								}
//							}
//							
//							// Calc base totals.
//							trace("autoPopulateBaseMeter ====> calcAllBaseTotals()");
//							calcAllBaseTotals();
//							
//							// Unlock.
//							DM.ManualTransactions.unlockAutoPopBM();
//							if (dmMT.isRenderChangeLocked())
//							{
//								dmMT.unlockRenderChange();
//							}
//						}
//						
//					});
//					if (1/*oTmp.trsf_drwr_cd != null && oTmp.trsf_drwr_prod_cd != null && oTmp.trsf_arm_cd != null*/)
//					{
//						call.token = view.manualtransactionsservice.getBaseDetails(oTmp.trsf_drwr_cd, oTmp.trsf_drwr_prod_cd, oTmp.trsf_arm_cd);
//					}
//					else
//					{
//						// Can't get base details
//					}
//				}
//				else // if (DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).baseprod.length == 0
//				{
//					if (DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).meter.length == 0)
//					{
//						//
//						// Still need to populate meters.
//						//
//						
//						var tempBaseProd:ArrayCollection = new ArrayCollection();
//						var call:CallResponder = new CallResponder();
//						
//						// Set up lock.
//						DM.ManualTransactions.lockAutoPopBM();
//						
//						call.addEventListener(FaultEvent.FAULT,function():void{
//							global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_AUTO_FILL_BASE_METER_DATA'));
//							DM.ManualTransactions.unlockAutoPopBM();
//						});
//						call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
//							
//							for (var i:int = 0; i < obj.result.length; i++) 
//							{
//								var oSrc:Object = obj.result[i];
//								
//								// Existing meter check. If meter already existed, no need to create again.
//								var mtrFound:Boolean = false;
//								if (DM.ManualTransactions.transactionDataArr)
//								{
//									var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex);
//									for (var mtrIdx:int = 0; mtrIdx < oDst.meter.length; mtrIdx++)
//									{
//										if (oDst.meter[mtrIdx].trsf_mtr_cd == oSrc.STREAM_MTRCODE)
//										{
//											mtrFound = true;
//											break;
//										}
//									}
//								}
//								
//								// Create one meter.
//								if (!mtrFound)
//								{
//									createMeter(currTransferIndex);
//									if (DM.ManualTransactions.transactionDataArr)
//									{
//										var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex);
//										if (oDst.meter.length > 0)
//										{
//											oDst.meter[oDst.meter.length-1].trsf_mtr_cd = oSrc.STREAM_MTRCODE;
//										}
//									}
//								}
//							}
//							
//							// Populate Meter totals.
//							var dmMT:Object = DM.ManualTransactions;
//							if (dmMT.transactionDataArr)
//							{
//								// Populate cumulative Meter totals.
//								var dmMT:Object = DM.ManualTransactions;
//								if (dmMT.transactionDataArr)
//								{
//									// Process meters in each transfer.
//									for (var trsfIdx:int = 0; trsfIdx < dmMT.transactionDataArr.length; trsfIdx++)
//									{
//										// Process every meter.
//										var oSrc:Object = dmMT.transactionDataArr.getItemAt(trsfIdx);
//										for (var mtrIdx:int = 0; mtrIdx < oSrc.meter.length; mtrIdx++)
//										{
//											// Check whether this meter exists in metertotal array.
//											var found:int = 0;
//											if (dmMT.meterTotalDataArr)
//											{
//												for (var mtrtotIdx:int = 0; mtrtotIdx < dmMT.meterTotalDataArr.length; mtrtotIdx++)
//												{
//													if (oSrc.meter[mtrIdx].trsf_mtr_cd == dmMT.meterTotalDataArr[mtrtotIdx].trsf_mtr_cd)
//													{
//														found = 1;
//														break;
//													}
//												}
//											}
//											// If not found in meter total array, then add it.
//											if (!found)
//											{
//												dmMT.meterTotalDataArr.addItem(new Object());
//												dmMT.meterTotalDataArr.getItemAt(dmMT.meterTotalDataArr.length-1).trsf_mtr_cd = oSrc.meter[mtrIdx].trsf_mtr_cd;
//											}
//										}
//									}
//								}
//								
//								// Unlock.
//								DM.ManualTransactions.unlockAutoPopBM();
//								if (dmMT.isRenderChangeLocked())
//								{
//									dmMT.unlockRenderChange();
//								}
//							}
//							
//						});
//						if (1/*oTmp.trsf_drwr_cd != null && oTmp.trsf_drwr_prod_cd != null && oTmp.trsf_arm_cd != null*/)
//						{
//							call.token = view.manualtransactionsservice.getBaseDetails(oTmp.trsf_drwr_cd, oTmp.trsf_drwr_prod_cd, oTmp.trsf_arm_cd);
//						}
//						else
//						{
//							// Can't get base details
//						}
//					}
//				}
//			}
//		}

		// Ver2.2
		public function autoPopulateBaseMeter(rowIndex:int = -1, callback:Function = null):void
		{
			trace("in autoPopulateBaseMeter()");
			
			var currTransferIndex:int;
			var oTmp:Object;
			
			if (!view.transferDetailsGrid)
			{
				// Ver2.2
				if (callback)
					callback();
				return;
			}
			
			//currTransferIndex = view.transferDetailsGrid.selectedIndex;
			currTransferIndex = view.transferDetailsGrid.selectedIndex == -1 ? view.transferDetailsGrid.selectedIndex : rowIndex;
			
			if (currTransferIndex == -1)
			{
				// Ver2.2
				if (callback)
					callback();
				return;
			}
			
			if (DM.ManualTransactions.isAutoPopBMLocked())
			{
				trace("Lock_AutoPopBM = TRUE  ====> return directly");
				// Ver2.2
				if (callback)
					callback();
				return;
			}
			
			oTmp = DM.ManualTransactions.transferDataArr.getItemAt(currTransferIndex);
			
			//
			// Normal MT case.
			//
			
			// NOTE:
			// Ver2.0 REPOST MT case.
			// There is no meter data passed into MT module. (What if base data is also NULL-> could meters be created twice??)
			
			// Automatically populate base & meter data.
			if (DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).baseprod.length == 0
				//&& DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).meter.length == 0
			)
			{
				var tempBaseProd:ArrayCollection = new ArrayCollection();
				var call:CallResponder = new CallResponder();
				
				// Set up lock.
				DM.ManualTransactions.lockAutoPopBM();
				
				call.addEventListener(FaultEvent.FAULT,function():void{
					global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_AUTO_FILL_BASE_METER_DATA'));
					DM.ManualTransactions.unlockAutoPopBM();
				});
				call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
					
					for (var i:int = 0; i < obj.result.length; i++) 
					{
						var oSrc:Object = obj.result[i];
						
						//
						// Existing Base Prod check. If base prod already existed, no need to create again.
						//
						var bsFound: Boolean = false;
						bsFound = isBaseProdExist(currTransferIndex, oSrc.STREAM_BASECODE); //Ver3.0
						
						// Create one Base.
						if (!bsFound)
						{
							trace("Before createBaseProd() ---> currTransferIndex:[" + currTransferIndex + "]");
							createBaseProd(oSrc.STREAM_BASECODE, currTransferIndex); //Ver3.0 added param
							if (DM.ManualTransactions.transactionDataArr)
							{
								var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex);
								if (oDst.baseprod.length > 0)   //0704 currTransferIndex is not current selected one???
								{
									oDst.baseprod[oDst.baseprod.length-1].trsf_bs_prodcd = oSrc.STREAM_BASECODE;
									
									// Ver2.0 Added. For the calculation in base total tab.
									// Tank Code is needed in 'Find tank codes(whick user selected arm linked) in tank code repository.'
									oDst.baseprod[oDst.baseprod.length-1].trsf_bs_tk_cd  = oSrc.STREAM_TANKCODE; 
									
									oDst.baseprod[oDst.baseprod.length-1].trsf_bs_ratio  = oSrc.RATIO_VALUE;
								}
							}
						}
						
						//
						// Existing Meter check. If meter already existed, no need to create again.
						//
						var mtrFound: Boolean = false;
						mtrFound = isMeterExist(currTransferIndex, oSrc.STREAM_MTRCODE); //Ver3.0
						
						// Create one Meter.
						if (!mtrFound)
						{
							createMeter(oSrc.STREAM_MTRCODE, currTransferIndex); //Ver3.0 added param
							if (DM.ManualTransactions.transactionDataArr)
							{
								var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex);
								if (oDst.meter.length > 0)
								{
									oDst.meter[oDst.meter.length-1].trsf_mtr_cd = oSrc.STREAM_MTRCODE;
								}
							}
						}
					}
					
					// Populate Base and Meter totals.
					var dmMT:Object = DM.ManualTransactions;
					if (dmMT.transactionDataArr)
					{
						// Process bases in each transfer.
						for (var trsfIdx:int = 0; trsfIdx < dmMT.transactionDataArr.length; trsfIdx++)
						{
							// Process every base.
							var oSrc:Object = dmMT.transactionDataArr.getItemAt(trsfIdx);
							for (var bsIdx:int = 0; bsIdx < oSrc.baseprod.length; bsIdx++)
							{
								// Check whether this base exists in basetotal array.
								var found:int = 0;
								if (dmMT.baseprodTotalDataArr)
								{
									for (var bstotIdx:int = 0; bstotIdx < dmMT.baseprodTotalDataArr.length; bstotIdx++)
									{
										if (oSrc.baseprod[bsIdx].trsf_bs_prodcd == dmMT.baseprodTotalDataArr[bstotIdx].trsf_bs_prodcd)
										{
											found = 1;
											break;
										}
									}
								}
								// If not found in base total array, then add it.
								if (!found)
								{
									dmMT.baseprodTotalDataArr.addItem(new Object());
									dmMT.baseprodTotalDataArr.getItemAt(dmMT.baseprodTotalDataArr.length-1).trsf_bs_prodcd = oSrc.baseprod[bsIdx].trsf_bs_prodcd;
								}
							}
						}
						
						// Populate cumulative Meter totals.
						var dmMT:Object = DM.ManualTransactions;
						if (dmMT.transactionDataArr)
						{
							// Process meters in each transfer.
							for (var trsfIdx:int = 0; trsfIdx < dmMT.transactionDataArr.length; trsfIdx++)
							{
								// Process every meter.
								var oSrc:Object = dmMT.transactionDataArr.getItemAt(trsfIdx);
								for (var mtrIdx:int = 0; mtrIdx < oSrc.meter.length; mtrIdx++)
								{
									// Check whether this meter exists in metertotal array.
									var found:int = 0;
									if (dmMT.meterTotalDataArr)
									{
										for (var mtrtotIdx:int = 0; mtrtotIdx < dmMT.meterTotalDataArr.length; mtrtotIdx++)
										{
											if (oSrc.meter[mtrIdx].trsf_mtr_cd == dmMT.meterTotalDataArr[mtrtotIdx].trsf_mtr_cd)
											{
												found = 1;
												break;
											}
										}
									}
									// If not found in meter total array, then add it.
									if (!found)
									{
										dmMT.meterTotalDataArr.addItem(new Object());
										dmMT.meterTotalDataArr.getItemAt(dmMT.meterTotalDataArr.length-1).trsf_mtr_cd = oSrc.meter[mtrIdx].trsf_mtr_cd;
									}
								}
							}
						}
						
						// Calc base totals.
						trace("autoPopulateBaseMeter ====> calcAllBaseTotals()");
						calcAllBaseTotals();
						
						// Unlock.
						DM.ManualTransactions.unlockAutoPopBM();
						if (dmMT.isRenderChangeLocked())
						{
							dmMT.unlockRenderChange();
						}
						
						// Ver2.2
						if (callback)
							callback();
						trace("after callback called");
						return;  // the EXIT for this case. the callback at the end could run twice.
					}
					
				});
				if (1/*oTmp.trsf_drwr_cd != null && oTmp.trsf_drwr_prod_cd != null && oTmp.trsf_arm_cd != null*/)
				{
					call.token = view.manualtransactionsservice.getBaseDetails(oTmp.trsf_drwr_cd, oTmp.trsf_drwr_prod_cd, oTmp.trsf_arm_cd);
					return;  // the EXIT for this case. the callback at the end could run twice.
				}
				else
				{
					// Can't get base details
				}
			}
			
			if (DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).baseprod.length != 0 && isRepost == REPOST_ON)
			{
				if (DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).meter.length == 0)
				{
					//
					// Still need to populate meters.
					//
					
					var tempBaseProd:ArrayCollection = new ArrayCollection();
					var call:CallResponder = new CallResponder();
					
					// Set up lock.
					DM.ManualTransactions.lockAutoPopBM();
					
					call.addEventListener(FaultEvent.FAULT,function():void{
						global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_AUTO_FILL_BASE_METER_DATA'));
						DM.ManualTransactions.unlockAutoPopBM();
					});
					call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
						
						for (var i:int = 0; i < obj.result.length; i++) 
						{
							var oSrc:Object = obj.result[i];
							
							// Existing meter check. If meter already existed, no need to create again.
							var mtrFound:Boolean = false;
							if (DM.ManualTransactions.transactionDataArr)
							{
								var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex);
								for (var mtrIdx:int = 0; mtrIdx < oDst.meter.length; mtrIdx++)
								{
									if (oDst.meter[mtrIdx].trsf_mtr_cd == oSrc.STREAM_MTRCODE)
									{
										mtrFound = true;
										break;
									}
								}
							}
							
							// Create one Meter.
							if (!mtrFound)
							{
								createMeter(oSrc.STREAM_MTRCODE, currTransferIndex);
								if (DM.ManualTransactions.transactionDataArr)
								{
									var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex);
									if (oDst.meter.length > 0)
									{
										oDst.meter[oDst.meter.length-1].trsf_mtr_cd = oSrc.STREAM_MTRCODE;
									}
								}
							}
						}
						
						// Populate Meter totals.
						var dmMT:Object = DM.ManualTransactions;
						if (dmMT.transactionDataArr)
						{
							// Populate cumulative Meter totals.
							var dmMT:Object = DM.ManualTransactions;
							if (dmMT.transactionDataArr)
							{
								// Process meters in each transfer.
								for (var trsfIdx:int = 0; trsfIdx < dmMT.transactionDataArr.length; trsfIdx++)
								{
									// Process every meter.
									var oSrc:Object = dmMT.transactionDataArr.getItemAt(trsfIdx);
									for (var mtrIdx:int = 0; mtrIdx < oSrc.meter.length; mtrIdx++)
									{
										// Check whether this meter exists in metertotal array.
										var found:int = 0;
										if (dmMT.meterTotalDataArr)
										{
											for (var mtrtotIdx:int = 0; mtrtotIdx < dmMT.meterTotalDataArr.length; mtrtotIdx++)
											{
												if (oSrc.meter[mtrIdx].trsf_mtr_cd == dmMT.meterTotalDataArr[mtrtotIdx].trsf_mtr_cd)
												{
													found = 1;
													break;
												}
											}
										}
										// If not found in meter total array, then add it.
										if (!found)
										{
											dmMT.meterTotalDataArr.addItem(new Object());
											dmMT.meterTotalDataArr.getItemAt(dmMT.meterTotalDataArr.length-1).trsf_mtr_cd = oSrc.meter[mtrIdx].trsf_mtr_cd;
										}
									}
								}
							}
							
							// Unlock.
							DM.ManualTransactions.unlockAutoPopBM();
							if (dmMT.isRenderChangeLocked())
							{
								dmMT.unlockRenderChange();
							}
							
							// Ver2.2
							if (callback)
								callback();
							trace("after callback called");
							return;  // the EXIT for this case. the callback at the end could run twice.
						}
						
					});
					if (1/*oTmp.trsf_drwr_cd != null && oTmp.trsf_drwr_prod_cd != null && oTmp.trsf_arm_cd != null*/)
					{
						call.token = view.manualtransactionsservice.getBaseDetails(oTmp.trsf_drwr_cd, oTmp.trsf_drwr_prod_cd, oTmp.trsf_arm_cd);
						return;  // the EXIT for this case. the callback at the end could run twice.
					}
					else
					{
						// Can't get base details
					}
				}
			} // if (DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).baseprod.length == 0 && isRepost == REPOST_ON)
			
			// Ver2.2
			if (callback)
				callback();
		}
		
		// Ver2.2
		public function autoPopulateBaseMeterExt(callback:Function = null):void
		{
			// TEST
			if (callback)
			{
				callback();
				return;
			}
			
			trace("in autoPopulateBaseMeterExt()");
			
			var dmMT:Object = DM.ManualTransactions.transactionDataArr;
			var oTmp:Object;
			
			// NOTE:
			// Ver2.0 REPOST MT case.
			// There is no meter data passed into MT module. (What if base data is also NULL-> could meters be created twice??)

			//for (var _trsfIdx_ext:int = 0; _trsfIdx_ext < DM.ManualTransactions.transactionDataArr.length; _trsfIdx_ext++)

			if (DM.ManualTransactions.transactionDataArr != null && _trsfIdx_ext < DM.ManualTransactions.transactionDataArr.length)
			{
				oTmp = DM.ManualTransactions.transactionDataArr.getItemAt(_trsfIdx_ext).transfer;
				
				if (DM.ManualTransactions.transactionDataArr.getItemAt(_trsfIdx_ext).baseprod.length != 0 && isRepost == REPOST_ON)
				{
					if (DM.ManualTransactions.transactionDataArr.getItemAt(_trsfIdx_ext).meter.length == 0)
					{
						//
						// Still need to populate meters.
						//
						
						var tempBaseProd:ArrayCollection = new ArrayCollection();
						var call:CallResponder = new CallResponder();
						
						// Set up lock.
						DM.ManualTransactions.lockAutoPopBM();
						
						call.addEventListener(FaultEvent.FAULT,function():void{
							global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_AUTO_FILL_BASE_METER_DATA'));
							DM.ManualTransactions.unlockAutoPopBM();
						});
						call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
							var dmMT:Object = DM.ManualTransactions;
							
							// Create a new meter data object.
//							DM.ManualTransactions.meterDataArr = new ArrayCollection();
							
							for (var i:int = 0; i < obj.result.length; i++) 
							{
								var oSrc:Object = obj.result[i];
								
								// Existing meter check. If meter already existed, no need to create again.
								var mtrFound:Boolean = false;
								if (DM.ManualTransactions.transactionDataArr)
								{
									var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(_trsfIdx_ext);
									for (var mtrIdx:int = 0; mtrIdx < oDst.meter.length; mtrIdx++)
									{
										if (oDst.meter[mtrIdx].trsf_mtr_cd == oSrc.STREAM_MTRCODE)
										{
											mtrFound = true;
											break;
										}
									}
								}
								
								// Create one meter.
								if (!mtrFound)
								{
									createMeterExt(_trsfIdx_ext);
									if (DM.ManualTransactions.transactionDataArr)
									{
										var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(_trsfIdx_ext);
										if (oDst.meter.length > 0)
										{
											oDst.meter[oDst.meter.length-1].trsf_mtr_cd = oSrc.STREAM_MTRCODE;
											oDst.meter[oDst.meter.length-1].trsf_mtr_typ = oSrc.METER_TYPE_CODE;
										}
									}
								}
							}
							
							// Update the the meter arraycollection.
							//validateMeter_ext(_trsfIdx_ext);
							
							// Populate Meter totals.
							var dmMT:Object = DM.ManualTransactions;
							if (dmMT.transactionDataArr)
							{
								// Populate cumulative Meter totals.
								var dmMT:Object = DM.ManualTransactions;
								if (dmMT.transactionDataArr)
								{
									// Process meters in each transfer.
									for (var trsfIdx:int = 0; trsfIdx < dmMT.transactionDataArr.length; trsfIdx++)
									{
										// Process every meter.
										var oSrc:Object = dmMT.transactionDataArr.getItemAt(trsfIdx);
										for (var mtrIdx:int = 0; mtrIdx < oSrc.meter.length; mtrIdx++)
										{
											// Check whether this meter exists in metertotal array.
											var found:int = 0;
											if (dmMT.meterTotalDataArr)
											{
												for (var mtrtotIdx:int = 0; mtrtotIdx < dmMT.meterTotalDataArr.length; mtrtotIdx++)
												{
													if (oSrc.meter[mtrIdx].trsf_mtr_cd == dmMT.meterTotalDataArr[mtrtotIdx].trsf_mtr_cd)
													{
														found = 1;
														break;
													}
												}
											}
											// If not found in meter total array, then add it.
											if (!found)
											{
												dmMT.meterTotalDataArr.addItem(new Object());
												dmMT.meterTotalDataArr.getItemAt(dmMT.meterTotalDataArr.length-1).trsf_mtr_cd = oSrc.meter[mtrIdx].trsf_mtr_cd;
											}
										}
									}
								}
								
								// Unlock.
								DM.ManualTransactions.unlockAutoPopBM();
								if (dmMT.isRenderChangeLocked())
								{
									dmMT.unlockRenderChange();
								}
								
								_trsfIdx_ext++;
								
								if (_trsfIdx_ext < DM.ManualTransactions.transactionDataArr.length)
								{
									autoPopulateBaseMeterExt();
								}
								else
								{
									// Ver2.2
									if (callback)
										callback();
									trace("after callback called");
									return;  // the EXIT for this case. the callback at the end could run twice.
								}
							}
							
						});
						
						if (oTmp.trsf_drwr_cd && oTmp.trsf_drwr_prod_cd && oTmp.trsf_arm_cd)
						{
							call.token = view.manualtransactionsservice.getBaseDetails(oTmp.trsf_drwr_cd, oTmp.trsf_drwr_prod_cd, oTmp.trsf_arm_cd);
							return;  // the EXIT for this case. the callback at the end could run twice.
						}
						else
						{
							_trsfIdx_ext++;
							
							if (_trsfIdx_ext < DM.ManualTransactions.transactionDataArr.length)
							{
								autoPopulateBaseMeterExt();
							}
							else
							{
								// Ver2.2
								if (callback)
									callback();
								trace("after callback called");
								return;  // the EXIT for this case. the callback at the end could run twice.
							}
						}
					}
				} // if (DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).baseprod.length == 0 && isRepost == REPOST_ON)
				
			}
			// Ver2.2
			if (callback)
				callback();
		}
		
		/**
		 * Check whether a Base already exists in current Transactions arraycollection at indicated position.
		 * 
		 */
		public function isBaseProdExist(currTrsfIdx:int, bsCode:String):Boolean
		{
			trace("Check if the same Base exists in transactionDataArr.baseprod ---> currTransferIndex:[" + currTrsfIdx + "]");
			trace("DM.ManualTransactions.transactionDataArr ---> " + DM.ManualTransactions.transactionDataArr);
			trace(tools.pr(DM.ManualTransactions.transactionDataArr, 2));
			trace("");
			
			var bsFound:         Boolean = false;
			var bsFound_trans:   Boolean = false;
			
			// Check in Transaction arraycollection. -> core data structure
			if (DM.ManualTransactions.transactionDataArr)
			{
				var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTrsfIdx);
				for (var bsIdx:int = 0; bsIdx < oDst.baseprod.length; bsIdx++)
				{
					if (oDst.baseprod[bsIdx].trsf_bs_prodcd == bsCode)
					{
						bsFound_trans = true;
						break;
					}
				}
			}
			trace("transactionDataArr.baseprod ---> bsFound_trans:" + bsFound_trans);
			
			
			if (bsFound_trans/* || bsFound_basedisp*/)
				bsFound = true;
			
			trace("bsFound ---> bsFound:" + bsFound);
			
			return bsFound;
		}
		
		/**
		 * Check whether a Meter already exists in current Transactions arraycollection at indicated position.
		 * 
		 */
		public function isMeterExist(currTrsfIdx:int, mtrCode:String):Boolean
		{
			trace("Check if the same Meter exists in transactionDataArr.meter ---> currTransferIndex:[" + currTrsfIdx + "]");
			trace("DM.ManualTransactions.transactionDataArr ---> " + DM.ManualTransactions.transactionDataArr);
			trace(tools.pr(DM.ManualTransactions.transactionDataArr, 2));
			trace("");
			
			var mtrFound:          Boolean = false;
			var mtrFound_trans:    Boolean = false;
			
			// Check in Transaction arraycollection. -> core data structure
			if (DM.ManualTransactions.transactionDataArr)
			{
				var oDst:Object = DM.ManualTransactions.transactionDataArr.getItemAt(currTrsfIdx);
				for (var mtrIdx:int = 0; mtrIdx < oDst.meter.length; mtrIdx++)
				{
					if (oDst.meter[mtrIdx].trsf_mtr_cd == mtrCode)
					{
						mtrFound_trans = true;
						break;
					}
				}
			}
			
			trace("transactionDataArr.meter ---> mtrFound_trans:" + mtrFound_trans);
			
			if (mtrFound_trans/* || mtrFound_meterdisp*/)
				mtrFound = true;
			
			trace("mtrFound ---> mtrFound:" + mtrFound);
			
			return mtrFound;
		}
		
		/**
		 * Refresh the base prod temp in base array according to drawer product.
		 * 
		 * @param
		 *   rowIndex: the transfer row index
		 *   onDemond: flag to indicate the call mode. (0: called by auto invoke or event, 1:called on demand)
		 */
		public function refreshBaseTemp(rowIndex:int = -1, onDemand:int = 0):void
		{
			trace("in refreshBaseTemp()");
			
			if (onDemand == 0)
			{
				var currTransferIndex:int;
				var oTmp:Object;
				if (!view.transferDetailsGrid) return;
				
				//currTransferIndex = view.transferDetailsGrid.selectedIndex;
				currTransferIndex = view.transferDetailsGrid.selectedIndex == -1 ? view.transferDetailsGrid.selectedIndex : rowIndex;
				
				if (currTransferIndex == -1) return;
				
				oTmp = DM.ManualTransactions.transferDataArr.getItemAt(currTransferIndex);
				
				// Transfer data range check. Ver1.8
				if (dataRangeCheck('TRSF_TEMP', Number(oTmp.trsf_temp)) != 0)
				{
					trace("Some transfer data are out of range.");
					return;
				}
				
				// Debug use.
				var dmMT:Object = DM.ManualTransactions.transactionDataArr;
				
				// Automatically refresh base temp accoring to drawer prod temp.
				for (var i:int = 0; i < DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).baseprod.length; i++)
				{
					if (oTmp.trsf_temp != "" && oTmp.trsf_temp != null) // Ver3.1 added && oTmp.trsf_temp != null
					{
						DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).baseprod[i].trsf_bs_temp = String(Math.round(Number(oTmp.trsf_temp) * TEMP_DECIMAL) / TEMP_DECIMAL);
					}
					else // Ver3.1 If user entered nothing in Temp cell, clear its Bases Temp.
					{
						DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).baseprod[i].trsf_bs_temp = null;
					}
				}
			}
			else
			{
				var currTransferIndex:int;
				var oTmp:Object;
				
				//currTransferIndex = view.transferDetailsGrid.selectedIndex;
				currTransferIndex = rowIndex;
				
				if (currTransferIndex == -1) return;
				
				oTmp = DM.ManualTransactions.transferDataArr.getItemAt(currTransferIndex);
				
				// Transfer data range check. Ver1.8
				if (dataRangeCheck('TRSF_TEMP', Number(oTmp.trsf_temp)) != 0)
				{
					trace("Some transfer data are out of range.");
					return;
				}
				
				// Debug use.
				var dmMT:Object = DM.ManualTransactions.transactionDataArr;
				
				// Automatically refresh base temp accoring to drawer prod temp.
				for (var i:int = 0; i < DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).baseprod.length; i++)
				{
					if (oTmp.trsf_temp != "")
					{
						if (DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).baseprod[i].trsf_bs_prodcd != null)
						{
							// If the base prod code is null, which means no base populated for this transfer(drawer prod), so no need to update the base temp.
							DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).baseprod[i].trsf_bs_temp = String(Math.round(Number(oTmp.trsf_temp) * TEMP_DECIMAL) / TEMP_DECIMAL);
						}
					}
				}
			}
		}
		
		/**
		 * Refresh the relevant base prod temp in base total array.
		 *  
		 */
		public function refreshBaseTotalTemp(rowIndex:int = -1):void
		{
			trace("in refreshBaseTotalTemp()");
			
			var currTransferIndex:int;
			var oTmp:Object;
			if (!view.transferDetailsGrid) return;
			
			//currTransferIndex = view.transferDetailsGrid.selectedIndex;
			currTransferIndex = view.transferDetailsGrid.selectedIndex == -1 ? view.transferDetailsGrid.selectedIndex : rowIndex;
			
			if (currTransferIndex == -1) return;
			var dmMT:Object = DM.ManualTransactions;
			oTmp = DM.ManualTransactions.transferDataArr.getItemAt(currTransferIndex);
			
			// Transfer data range check. Ver1.8
			if (dataRangeCheck('TRSF_TEMP', Number(oTmp.trsf_temp)) != 0)
			{
				trace("Some transfer data are out of range.");
				return;
			}
			
			if (dmMT.baseprodTotalDataArr)
			{
				//----------------------------------------------------------------------------------------------------------------------------------------------//
				// Ver1.8                                                                                                                                       //
				// Scan each base prod(in base total array) to find out which base prod Temp needs to be calculated(refreshed).                                 //
				// Automatically calculate base prod average Temp accoring to all drawer prods(which has the base component) Mass & Ratio & Temp.               //
				//                       DRAWER_PROD_MASS1*BASE_RATIO1*TEMP1 + DRAWER_PROD_MASS2*BASE_RATIO2*TEMP2 + ... + DRAWER_PROD_MASSn*BASE_RATIOn*TEMPn  //
				// BASE TEMP(average) = ----------------------------------------------------------------------------------------------------------------------- //
				//                                 DRAWER_PROD_MASS1*BASE_RATIO1 + DRAWER_PROD_MASS2*BASE_RATIO2 + ... + DRAWER_PROD_MASSn*BASE_RATIOn          //
				//----------------------------------------------------------------------------------------------------------------------------------------------//
				for (var bsTotIdx:int = 0; bsTotIdx < dmMT.baseprodTotalDataArr.length; bsTotIdx++)
				{
					var SumMassTempTol:Number = 0;
					var SumMassTol:Number = 0;
					
					// Check each transfer to find out the matched base prod.
					for (var trsfIdx:int = 0; trsfIdx < dmMT.transactionDataArr.length; trsfIdx++)
					{
						// Cal the sum of base ratio in this transfer.
						var ratio_total:Number = 0;
						for (var bsIdx:int = 0; bsIdx < dmMT.transactionDataArr.getItemAt(trsfIdx).baseprod.length; bsIdx++)
						{
							if (dmMT.transactionDataArr.getItemAt(trsfIdx).baseprod[bsIdx].trsf_bs_temp != null
							 && dmMT.transactionDataArr.getItemAt(trsfIdx).baseprod[bsIdx].trsf_bs_temp != "")  // Ver3.1 added.
																												// Do not take into accout those Bases of which Temp is blank(not entered/null).
							{
								ratio_total += Number(dmMT.transactionDataArr.getItemAt(trsfIdx).baseprod[bsIdx].trsf_bs_ratio);
							}
						}
						
						// Check each base prod in this transfer to see if there is matched base prod(s).
						for (var bsIdx:int = 0; bsIdx < dmMT.transactionDataArr.getItemAt(trsfIdx).baseprod.length; bsIdx++)
						{
							// If matched base prod found calculate each component and the sum in above equation.
							if (dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_prodcd == dmMT.transactionDataArr.getItemAt(trsfIdx).baseprod[bsIdx].trsf_bs_prodcd)
							{
								if (dmMT.transactionDataArr.getItemAt(trsfIdx).baseprod[bsIdx].trsf_bs_temp != null
								 && dmMT.transactionDataArr.getItemAt(trsfIdx).baseprod[bsIdx].trsf_bs_temp != "")  // Ver3.1 added.
																													// Do not take into accout those Bases of which Temp is blank(not entered/null).
								{
									// Calculate: DRAWER_PROD_MASS1*BASE_RATIO1*TEMP1 + DRAWER_PROD_MASS2*BASE_RATIO2*TEMP2 + ... + DRAWER_PROD_MASSn*BASE_RATIOn*TEMPn
									SumMassTempTol +=
										Number(dmMT.transactionDataArr.getItemAt(trsfIdx).transfer.trsf_load_kg) *
										Number(dmMT.transactionDataArr.getItemAt(trsfIdx).baseprod[bsIdx].trsf_bs_ratio) / ratio_total *
										Number(dmMT.transactionDataArr.getItemAt(trsfIdx).transfer.trsf_temp);
									
									// Calculate: DRAWER_PROD_MASS1*BASE_RATIO1 + DRAWER_PROD_MASS2*BASE_RATIO2 + ... + DRAWER_PROD_MASSn*BASE_RATIOn
									SumMassTol +=
										Number(dmMT.transactionDataArr.getItemAt(trsfIdx).transfer.trsf_load_kg) *
										Number(dmMT.transactionDataArr.getItemAt(trsfIdx).baseprod[bsIdx].trsf_bs_ratio) / ratio_total;
								}
							}
						}
					}
					
					// After finishing scanning each transfer, calculate the avarage Temp for one base prod.
					if (Number(SumMassTol) != 0)
					{
						dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_temp = String(Math.round(Number(SumMassTempTol) / Number(SumMassTol) * TEMP_DECIMAL) / TEMP_DECIMAL);
					}
					else  // Ver3.1 added If can't cal Base total temp, clear it.
					{
						dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_temp = null;
					}
				}
				refreshBaseTotalGrid();
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function calcAllBaseTotals():void
		{
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			if (dmMT.transactionDataArr && dmMT.baseprodTotalDataArr)
			{
				// Process bases in each transfer.
				//for (var trsfIdx:int = 0; trsfIdx < dmMT.transactionDataArr.length; trsfIdx++) 
				//{
				/*
				// Process every base.
				// But do NOT include current transfer' bases,
				// coz current bases qty was updated as above.
				//(oTmp.trsf_bs_qty_amb, oTmp.trsf_bs_qty_cor and oTmp.trsf_bs_load_kg)
				if (currTrsfIndex == trsfIdx)
				continue;
				
				var oSrc:Object = dmMT.transactionDataArr.getItemAt(trsfIdx);
				for (var bsIdx:int = 0; bsIdx < oSrc.baseprod.length; bsIdx++) 
				{
				// Find out which base prod totals need to be re-calculated.
				// If current basecode matches the basecode in trasfers' baseprods,
				// this baseprod totals need to be re-calculated.
				if (oTmp.trsf_bs_prodcd == oSrc.baseprod[bsIdx].trsf_bs_prodcd)
				{
				bsObsTot += oSrc.baseprod[bsIdx].trsf_bs_qty_amb;
				bsStdTot += oSrc.baseprod[bsIdx].trsf_bs_qty_cor;
				bsMassTot += oSrc.baseprod[bsIdx].trsf_bs_load_kg;
				}
				}
				*/

				//}
				
				// Process bases in base total array.
				for (var bsTotIdx:int = 0; bsTotIdx < dmMT.baseprodTotalDataArr.length; bsTotIdx++)
				{
					var bsObsTot:Number = 0;
					var bsStdTot:Number = 0;
					var bsMassTot:Number = 0;
					
					// Process bases in each transfer.
					for (var trsfIdx:int = 0; trsfIdx < dmMT.transactionDataArr.length; trsfIdx++)
					{
						// Process every base.
						var oSrc:Object = dmMT.transactionDataArr.getItemAt(trsfIdx);
						for (var bsIdx:int = 0; bsIdx < oSrc.baseprod.length; bsIdx++)
						{
							// Find out which base prod totals need to be re-calculated in basetotal array.
							// If current basecode matches the basecode in basetotal array,
							// this baseprod totals need to be re-calculated.
							if (dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_prodcd == oSrc.baseprod[bsIdx].trsf_bs_prodcd
							// -----------------------------------------------------------------------------------------------------
							// Ver 3.1 added.
							// Only sum those valid bases, which has all compulsory fileds - base code,density,temp 
							// and one of Obs/Std/Mass for calculation.
							// Since the Acc Base tab is designed to show all VALID compartment(s) totals.
							 && oSrc.baseprod[bsIdx].trsf_bs_prodcd != ""
							 && (oSrc.baseprod[bsIdx].trsf_bs_den != null && oSrc.baseprod[bsIdx].trsf_bs_den != "")
							 && (oSrc.baseprod[bsIdx].trsf_bs_temp != null && oSrc.baseprod[bsIdx].trsf_bs_temp != "")
							 && (
								(oSrc.baseprod[bsIdx].trsf_bs_qty_amb != null && oSrc.baseprod[bsIdx].trsf_bs_qty_amb != "")
								|| (oSrc.baseprod[bsIdx].trsf_bs_qty_cor != null && oSrc.baseprod[bsIdx].trsf_bs_qty_cor != "")
								|| (oSrc.baseprod[bsIdx].trsf_bs_load_kg != null && oSrc.baseprod[bsIdx].trsf_bs_load_kg != "")
								)
							// -----------------------------------------------------------------------------------------------------
							)
							{
								bsObsTot  += isNaN(oSrc.baseprod[bsIdx].trsf_bs_qty_amb) ? 0 : oSrc.baseprod[bsIdx].trsf_bs_qty_amb;
								bsStdTot  += isNaN(oSrc.baseprod[bsIdx].trsf_bs_qty_cor) ? 0 : oSrc.baseprod[bsIdx].trsf_bs_qty_cor;
								bsMassTot += isNaN(oSrc.baseprod[bsIdx].trsf_bs_load_kg) ? 0 : oSrc.baseprod[bsIdx].trsf_bs_load_kg;
							}
						}
					}
					
					dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_qty_amb = Math.round(bsObsTot * QTY_DECIMAL) / QTY_DECIMAL; //Ver2.7 added QTY_DECIMAL
					dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_qty_cor = Math.round(bsStdTot * QTY_DECIMAL) / QTY_DECIMAL;
					dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_load_kg = Math.round(bsMassTot * QTY_DECIMAL) / QTY_DECIMAL;
					
					// ACC_BASE_ADJ
					// Copy current base prod total to previous base prod total arraycollection.
					copyCurrBPTotalToPrevBPTotal();
					
				}
				
				/*
				// Update the totals for this base prod in the base total array.
				for (var bsTotIdx:int = 0; bsTotIdx < dmMT.baseprodTotalDataArr.length; bsTotIdx++) 
				{
				// Find out which base prod totals need to be updated.
				if (oTmp.trsf_bs_prodcd == dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_prodcd)
				{
				// Finally add current updated Amb|Std|Mass to the totals.
				//(oTmp.trsf_bs_qty_amb, oTmp.trsf_bs_qty_cor and oTmp.trsf_bs_load_kg)
				dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_qty_amb = bsObsTot + oTmp.trsf_bs_qty_amb;
				dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_qty_cor = bsStdTot + oTmp.trsf_bs_qty_cor;
				dmMT.baseprodTotalDataArr[bsTotIdx].trsf_bs_load_kg = bsMassTot + oTmp.trsf_bs_load_kg;
				
				// Only one base need to be processed in calcBaseQty(), so break.
				break;
				}
				}
				*/
			}
			
		}
		
		/**
		 *  Copy current base prod total data to previous base prod total arraycollection.
		 *  
		 */
		public function copyCurrBPTotalToPrevBPTotal():void
		{
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			if (dmMT.baseprodTotalDataArr_prev != null)
			{
				//dmMT.baseprodTotalDataArr_prev = new ArrayCollection(ObjectUtil.copy(dmMT.baseprodTotalDataArr.source) as Array);
				tools.acCopy(dmMT.baseprodTotalDataArr, dmMT.baseprodTotalDataArr_prev);
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function createTransfer(event:MouseEvent):void
		{
			// TODO Auto-generated method stub
			
			/*var myPopUp:ModalTransferCreate = PopUpManager.createPopUp(this,ModalTransferCreate,true) as ModalTransferCreate;
			PopUpManager.centerPopUp(myPopUp);
			myPopUp.callback = function(str:String):void{
			
			}*/
			
			/* moved to dm/collections
			if (!DM.ManualTransactions.transactionDataArr) 
				DM.ManualTransactions.transactionDataArr = new ArrayCollection();

			if (!DM.ManualTransactions.transferDataArr) 
				DM.ManualTransactions.transferDataArr = new ArrayCollection();
			
			var temp:dmManualTransactions = DM.ManualTransactions;
			temp.transferDataArr.addItem(new Object());
			//trace("here",ObjectUtil.toString(lol));
			
			var currTransferIndex:int = DM.ManualTransactions.transferDataArr.length - 1;
			
			if (currTransferIndex >= 0)
			{
				DM.ManualTransactions.transactionDataArr.addItem(
					{
						transfer: DM.ManualTransactions.transferDataArr.getItemAt(currTransferIndex),
						//drawerprod: DM.ManualTransactions.products,
						meter: new ArrayCollection(),
						baseprod: new ArrayCollection()
					}
				);
			}
			*/
			DM.ManualTransactions.view = view;
			DM.ManualTransactions.createTransfer();
			// Create the refernece data for this Transfer item.
			DM.ManualTransactions.createTransferDataRef();
		}
		
		/**
		 * Set Transaction data arraycollection with Meter data provider.
		 *  
		 */
		public function validateMeterInTransfer(currTransferIndex:int = -1)
		{
			if (currTransferIndex == -1) currTransferIndex = view.transferDetailsGrid.selectedIndex;
			//0704 if (view.transferDetailsGrid.selectedIndex != -1)
			if (currTransferIndex != -1)
			{
				DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).meter.source = DM.ManualTransactions.meterDataArr.source;
			}
		}
		
		/**
		 * Set Transaction data arraycollection with Base data provider.
		 *  
		 */
		public function validateBaseProdInTransfer(currTransferIndex:int)
		{
			////if (view.transferDetailsGrid.selectedIndex != -1)
			{
				////DM.ManualTransactions.transactionDataArr.getItemAt(view.transferDetailsGrid.selectedIndex).baseprod.source = DM.ManualTransactions.baseprodDataArr.source;
				DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).baseprod.source = DM.ManualTransactions.baseprodDataArr.source;
			}
		}

//		/**
//		 * Set Meter grid data provider with Transaction data arraycollection.
//		 * Moved to dm. //Ver3.0
//		 */
//		public function validateMeter(rowIndex:int = -1)
//		{
//			trace("in validateMeter()");
//			//0702
//			if (!view.transferDetailsGrid)return;
//			
//			var currSelectedIndex:int;// = view.transferDetailsGrid.selectedIndex;
//			currSelectedIndex = view.transferDetailsGrid.selectedIndex == -1 ? view.transferDetailsGrid.selectedIndex : rowIndex;
//			
//			if (DM.ManualTransactions.meterDataArr
//			 && DM.ManualTransactions.transferDataArr.length > 0
//			 && currSelectedIndex != -1)
//			{
//				DM.ManualTransactions.meterDataArr.source = DM.ManualTransactions.transactionDataArr.getItemAt(currSelectedIndex).meter.source;
//
//				/*
//				debug S
//				var mtr_no:int;
//				mtr_no = 0;
//				for ecah (var x11:Object in DM.ManualTransactions.transactionDataArr.getItemAt(view.transferDetailsGrid.selectedIndex).meter)
//				{
//					trace("SRC meter["+mtr_no+"]")
//					trace("Injector_or_Meter  " + x11.trsf_mtr_typ)
//					trace("Meter_Injector_Code" + x11.trsf_mtr_cd)
//					trace("open_amb           " + x11.trsf_mtr_opn_amb)
//					trace("open_cor           " + x11.trsf_mtr_opn_cor)
//					trace("open_kg            " + x11.trsf_mtr_open_kg)
//					trace("close_amb          " + x11.trsf_mtr_cls_amb)
//					trace("close_cor          " + x11.trsf_mtr_cls_cor)
//					trace("close_kg           " + x11.trsf_mtr_close_kg)
//					
//					mtr_no++;
//				}
//				
//				mtr_no = 0;
//				for ecah (var x111:Object in DM.ManualTransactions.meterDataArr)
//				{
//					trace("DEST meter["+mtr_no+"]")
//					trace("Injector_or_Meter  " + x111.trsf_mtr_typ)
//					trace("Meter_Injector_Code" + x111.trsf_mtr_cd)
//					trace("open_amb           " + x111.trsf_mtr_opn_amb)
//					trace("open_cor           " + x111.trsf_mtr_opn_cor)
//					trace("open_kg            " + x111.trsf_mtr_open_kg)
//					trace("close_amb          " + x111.trsf_mtr_cls_amb)
//					trace("close_cor          " + x111.trsf_mtr_cls_cor)
//					trace("close_kg           " + x111.trsf_mtr_close_kg)
//					
//					mtr_no++;
//				}	
//				debug E
//				*/
//				
//			}
//			else if (DM.ManualTransactions.meterDataArr)
//			{
//				DM.ManualTransactions.meterDataArr.removeAll();
//			}
//		}
		
		/**
		 *  
		 *  
		 */
		public function validateMeter_ext(rowIndex:int = -1)
		{
			trace("in validateMeter_ext()");
			//0702
			if (!view.transferDetailsGrid)
				return;
			
			var currSelectedIndex:int;// = view.transferDetailsGrid.selectedIndex;
			currSelectedIndex = rowIndex;
			
			if (DM.ManualTransactions.meterDataArr
			 && DM.ManualTransactions.transferDataArr.length > 0
			 && currSelectedIndex != -1)
			{
				DM.ManualTransactions.meterDataArr.source = DM.ManualTransactions.transactionDataArr.getItemAt(currSelectedIndex).meter.source;
				
				/*
				debug S
				var mtr_no:int;
				mtr_no = 0;
				for ecah (var x11:Object in DM.ManualTransactions.transactionDataArr.getItemAt(view.transferDetailsGrid.selectedIndex).meter)
				{
				trace("SRC meter["+mtr_no+"]")
				trace("Injector_or_Meter  " + x11.trsf_mtr_typ)
				trace("Meter_Injector_Code" + x11.trsf_mtr_cd)
				trace("open_amb           " + x11.trsf_mtr_opn_amb)
				trace("open_cor           " + x11.trsf_mtr_opn_cor)
				trace("open_kg            " + x11.trsf_mtr_open_kg)
				trace("close_amb          " + x11.trsf_mtr_cls_amb)
				trace("close_cor          " + x11.trsf_mtr_cls_cor)
				trace("close_kg           " + x11.trsf_mtr_close_kg)
				
				mtr_no++;
				}
				
				mtr_no = 0;
				for ecah (var x111:Object in DM.ManualTransactions.meterDataArr)
				{
				trace("DEST meter["+mtr_no+"]")
				trace("Injector_or_Meter  " + x111.trsf_mtr_typ)
				trace("Meter_Injector_Code" + x111.trsf_mtr_cd)
				trace("open_amb           " + x111.trsf_mtr_opn_amb)
				trace("open_cor           " + x111.trsf_mtr_opn_cor)
				trace("open_kg            " + x111.trsf_mtr_open_kg)
				trace("close_amb          " + x111.trsf_mtr_cls_amb)
				trace("close_cor          " + x111.trsf_mtr_cls_cor)
				trace("close_kg           " + x111.trsf_mtr_close_kg)
				
				mtr_no++;
				}	
				debug E
				*/
				
			}
			else if (DM.ManualTransactions.meterDataArr)
			{
				DM.ManualTransactions.meterDataArr.removeAll();
			}
			
		}
		
//		/**
//		 * Set Base Prod grid data provider with Transaction data arraycollection.
//		 * Moved to dm. //Ver3.0
//		 */
//		public function validateBaseProd(rowIndex:int = -1)
//		{
//			trace("in validateBaseProd()");
//			
//			if (!view.transferDetailsGrid)
//				return;
//			
//			var currSelectedIndex:int;// = view.transferDetailsGrid.selectedIndex;
//			currSelectedIndex = view.transferDetailsGrid.selectedIndex == -1 ? view.transferDetailsGrid.selectedIndex : rowIndex;
//			
//			if (DM.ManualTransactions.baseprodDataArr
//			 && DM.ManualTransactions.transferDataArr.length > 0
//			 && currSelectedIndex != -1)
//			{
//				var dmMT1:Object = DM.ManualTransactions.transactionDataArr;
//				var dmMT2:Object = DM.ManualTransactions.baseprodDataArr;
//				
//				DM.ManualTransactions.baseprodDataArr.source = DM.ManualTransactions.transactionDataArr.getItemAt(currSelectedIndex).baseprod.source;
//			}
//			else if (DM.ManualTransactions.baseprodDataArr)
//			{
//				DM.ManualTransactions.baseprodDataArr.removeAll();
//			}
//		}
		
		/**
		 *  
		 *  
		 */
		public function createMeter(mtrCode:String, currTransferIndex:int = -1):void
		{
			trace("    in createMeter()");
			// TODO Auto-generated method stub
			var currTransferIndex:int;
			var oTmp:Object;
			
			if (currTransferIndex == -1)currTransferIndex = view.transferDetailsGrid.selectedIndex;
			if (currTransferIndex == -1)
			{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SELECT_ONE_TRSF_DATA'));
				return;
			}
			
			// Moved to initialize
			//if (!DM.ManualTransactions.meterDataArr) 
			//	DM.ManualTransactions.meterDataArr = new ArrayCollection();
			
			var obj:Object = new Object();
			
			// Init each properties of meter. Ver1.8
			obj.trsf_mtr_cd       = null;
			obj.trsf_mtr_typ      = null;
			obj.trsf_mtr_opn_amb  = null;
			obj.trsf_mtr_cls_amb  = null;
			obj.trsf_mtr_opn_cor  = null;
			obj.trsf_mtr_cls_cor  = null;
			obj.trsf_mtr_open_kg  = null;
			obj.trsf_mtr_close_kg = null;
			
			var mtrFound_meterdisp:Boolean = false;
			trace("DM.ManualTransactions.meterDataArr.length---> " + DM.ManualTransactions.meterDataArr.length);
			trace("DM.ManualTransactions.meterDataArr ---> " + DM.ManualTransactions.meterDataArr);
			trace(tools.pr(DM.ManualTransactions.meterDataArr, 1));
			trace("");
			
			// Ver3.0 added
			// Check in Meter disp arraycollection. -> representation data structure
			if (DM.ManualTransactions.meterDataArr)
			{
				var oDst:Object = DM.ManualTransactions.meterDataArr;
				for (var mtrIdx:int = 0; mtrIdx < oDst.length; mtrIdx++)
				{
					if (oDst[mtrIdx].trsf_mtr_cd == mtrCode)
					{
						mtrFound_meterdisp = true;
						break;
					}
				}
			}
			
			trace("meterDataArr ---> mtrFound_meterdisp:" + mtrFound_meterdisp);
			
			if (!mtrFound_meterdisp)
				DM.ManualTransactions.meterDataArr.addItem(obj);
			
			// Store current selected transfer data to filter meter data (when adding meter).
			oTmp = DM.ManualTransactions.transferDataArr.getItemAt(currTransferIndex);
			DM.ManualTransactions.setTransferDataRef(currTransferIndex, 1, oTmp.trsf_drwr_cd);
			DM.ManualTransactions.setTransferDataRef(currTransferIndex, 2, oTmp.trsf_drwr_prod_cd);
			DM.ManualTransactions.setTransferDataRef(currTransferIndex, 3, oTmp.trsf_arm_cd);
			DM.ManualTransactions.curr_selected_transfer = currTransferIndex;
			
			validateMeterInTransfer(currTransferIndex);
		}
		
		/**
		 *  
		 *  
		 */
		public function createMeterExt(currTransferIndex:int = -1):void
		{
			trace("    in createMeterExt()");
			// TODO Auto-generated method stub
			var currTransferIndex:int;
			var oTmp:Object;
			
			if (currTransferIndex == -1)
				currTransferIndex = view.transferDetailsGrid.selectedIndex;
			
			if (currTransferIndex == -1)
			{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SELECT_ONE_TRSF_DATA'));
				return;
			}
			
			// Moved to initialize
			//if (!DM.ManualTransactions.meterDataArr) 
			//	DM.ManualTransactions.meterDataArr = new ArrayCollection();
			
			var obj:Object = new Object();
			
			// Init each properties of meter. Ver1.8
			obj.trsf_mtr_cd       = null;
			obj.trsf_mtr_typ      = null;
			obj.trsf_mtr_opn_amb  = null;
			obj.trsf_mtr_cls_amb  = null;
			obj.trsf_mtr_opn_cor  = null;
			obj.trsf_mtr_cls_cor  = null;
			obj.trsf_mtr_open_kg  = null;
			obj.trsf_mtr_close_kg = null;
			
//			DM.ManualTransactions.meterDataArr.addItem(obj);
			DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).meter.addItem(obj);
			
			// Store current selected transfer data to filter meter data (when adding meter).
//			oTmp = DM.ManualTransactions.transferDataArr.getItemAt(currTransferIndex);
//			DM.ManualTransactions.setTransferDataRef(currTransferIndex, 1, oTmp.trsf_drwr_cd);
//			DM.ManualTransactions.setTransferDataRef(currTransferIndex, 2, oTmp.trsf_drwr_prod_cd);
//			DM.ManualTransactions.setTransferDataRef(currTransferIndex, 3, oTmp.trsf_arm_cd);
//			DM.ManualTransactions.curr_selected_transfer = currTransferIndex;
			
//			validateMeterInTransfer(currTransferIndex);
		}
		
		/**
		 *  
		 *  
		 */
		public function deleteMeter(event:MouseEvent):void
		{
			// TODO Auto-generated method stub
			if (DM.ManualTransactions.meterDataArr)
			{
				if (view.transferDetailsGrid.selectedIndex != -1 && view.meterDatagrid.selectedIndex != -1)
				{
					DM.ManualTransactions.meterDataArr.removeItemAt(view.meterDatagrid.selectedIndex);
					
					// Update the the meter arraycollection in transfer.
					validateMeterInTransfer();
				}
				else
				{
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SELECT_ONE_METER_DATA'));
				}
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function createBaseProd(bsCode:String, currTransferIndex:int = -1):void
		{
			trace("    in createBaseProd()");
			
			// TODO Auto-generated method stub
			var currTransferIndex:int;
			var oTmp:Object;
			if (currTransferIndex == -1)
				currTransferIndex = view.transferDetailsGrid.selectedIndex;
			
			if (currTransferIndex == -1)
			{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SELECT_ONE_TRSF_DATA'));
				return;
			}
			
			// Moved to initialize
			//if (!DM.ManualTransactions.baseprodDataArr) 
			//	DM.ManualTransactions.baseprodDataArr = new ArrayCollection();
			
			var obj:Object = new Object();
			
			// Init each properties of base product. Ver1.8
			obj.trsf_bs_prodcd  = null;
			obj.trsf_bs_tk_cd   = null;
			obj.trsf_bs_prodcls = null;
			obj.trsf_bs_den     = null;
			obj.trsf_bs_temp    = null;
			obj.trsf_bs_qty_amb = null;
			obj.trsf_bs_qty_cor = null;
			obj.trsf_bs_load_kg = null;
			obj.trsf_bs_ratio   = null;
			
			var bsFound_basedisp:Boolean = false;
			trace("DM.ManualTransactions.baseprodDataArr.length---> " + DM.ManualTransactions.baseprodDataArr.length);
			trace("DM.ManualTransactions.baseprodDataArr ---> " + DM.ManualTransactions.baseprodDataArr);
			trace(tools.pr(DM.ManualTransactions.baseprodDataArr, 1));
			trace("");
			// Ver3.0 added
			// Check in Base disp arraycollection. -> representation data structure
			if (DM.ManualTransactions.baseprodDataArr)
			{
				var oDst:Object = DM.ManualTransactions.baseprodDataArr;
				for (var bsIdx:int = 0; bsIdx < oDst.length; bsIdx++)
				{
					if (oDst[bsIdx].trsf_bs_prodcd == bsCode)
					{
						bsFound_basedisp = true;
						break;
					}
				}
			}
			trace("baseprodDataArr ---> bsFound_basedisp:" + bsFound_basedisp);
			
			if (!bsFound_basedisp)
				DM.ManualTransactions.baseprodDataArr.addItem(obj);
			
			// Store current selected transfer data to filter base data (when adding base).
			oTmp = DM.ManualTransactions.transferDataArr.getItemAt(currTransferIndex);
			DM.ManualTransactions.setTransferDataRef(currTransferIndex, 1, oTmp.trsf_drwr_cd);
			DM.ManualTransactions.setTransferDataRef(currTransferIndex, 2, oTmp.trsf_drwr_prod_cd);
			DM.ManualTransactions.setTransferDataRef(currTransferIndex, 3, oTmp.trsf_arm_cd);
			DM.ManualTransactions.curr_selected_transfer = currTransferIndex;
			
			validateBaseProdInTransfer(currTransferIndex);
		}
		
		/**
		 *  
		 *  
		 */
		public function deleteBaseProd(event:MouseEvent):void
		{
			// TODO Auto-generated method stub
			if (DM.ManualTransactions.baseprodDataArr)
			{
				if (view.transferDetailsGrid.selectedIndex != -1 && view.baseprodDataGrid.selectedIndex != -1)
				{
					DM.ManualTransactions.baseprodDataArr.removeItemAt(view.baseprodDataGrid.selectedIndex);
					
					// Update the the baseprod arraycollection in transfer.
					validateBaseProdInTransfer(view.baseprodDataGrid.selectedIndex);
				}
				else
				{
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SELECT_ONE_BASE_DATA'));
				}
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function preCheck_Submit():ArrayCollection
		{
			var ret:ArrayCollection = new ArrayCollection();
			var found_t:int = 0;
			var found_b:int = 0;
			var found_m:int = 0;
			
			// Control flag check.
			if (needRefreshBaseprodTotal() == true)  // Which means Base tabs are not up-to-date.
			{
				ret.addItem({type:"E2", msg:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.BASE_QTY_NOT_UPTODATE')});
				return ret;
			}
			
			// Transaction type check.
			// 'E' : errors; 
			// 'E2': errors must be fixed
			if (view.new_trans_type.selectedIndex == -1)
			{
				ret.addItem({type:"E", msg:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.NO_SELECT__TRANTYPE')});
				return ret;
			}
			else
			{
				switch(view.new_trans_type.selectedItem.id)
				{
					case "S":  // Shipment(Non Open Order)
					case "N":  // Nomination
						if (view.new_supplier.selectedIndex == -1
						|| view.new_trip.selectedIndex     == -1
						|| view.new_carrier.selectedIndex  == -1
						|| view.new_tanker.selectedIndex   == -1)
						{
							ret.addItem({type:"E", msg:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.NO_SELECT__SHIPMENT')});
						}
						
						break;
					case "O":  // Open Order
						if (view.new_supplier.selectedIndex == -1
						|| view.new_customer.selectedIndex == -1
						|| view.new_carrier.selectedIndex  == -1
						|| view.new_order.selectedIndex    == -1
						|| view.new_tanker.selectedIndex   == -1)
						{
							ret.addItem({type:"E", msg:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.NO_SELECT__ORDER')});
						}
						
						break;
					/* 0711 Merged with shipment
					case "N":  // Nomination
						if (view.new_supplier.selectedIndex  == -1
						|| view.new_nomi_item.selectedIndex == -1
						|| view.new_carrier.selectedIndex   == -1
						|| view.new_tanker.selectedIndex    == -1)
						{
							ret.addItem({type:"E", msg:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.NO_SELECT__NOMINATION')});
						}
						
						break;
					*/
					default:
						break;
				}
								
				// TAS reference check.
				/*if ()
				{
					ret = "no selection .... TAS reference";
				}*/
				
				// Date check.
				if (view.trans_st_dmy.selectedDate == null
				|| view.trans_ed_dmy.selectedDate == null)
				{
					ret.addItem({type:"E", msg:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.NO_INPUT__DATETIME')});
				}
				if (datetimeCheck(1) != 0)
				{
					ret.addItem({type:"E2", msg:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.INVALID__DATETIME')});
				}
				
				
				// Transfer data check.
				var idxTrsf:int = 0;
				var trf:ArrayCollection = new ArrayCollection();
				var chkres:int;
				for each (var o:Object in DM.ManualTransactions.transactionDataArr)
				{
					idxTrsf++;
					
					// Transfer
					
					// Available QTY check.
					chkres = balanceQtyCheck_Submit(o);
					if (chkres)
					{
						// This transfer will NOT be passed to baiman, and no need to show any warning messages.
						continue;
					}
					
					var x1:Object = new Object;
					var fields_trsf:String = "";
					x1 = o.transfer;
					found_t = 0;
					if (!x1.trsf_equip_id)                          {found_t = 1; fields_trsf += "[Eqp ID]";}
					if (!x1.trsf_cmpt_no)                           {found_t = 1; fields_trsf += "[Cmpt No]";}
					if (!x1.trsf_drwr_cd)                           {found_t = 1; fields_trsf += "[Drawer]";}
					if (!x1.trsf_drwr_prod_cd)                      {found_t = 1; fields_trsf += "[Prod]";}
					if (!x1.trsf_arm_cd)                            {found_t = 1; fields_trsf += "[Arm]";}
					if (!x1.trsf_density || isNaN(x1.trsf_density)) {found_t = 1; fields_trsf += "[Density]";}
					if (!x1.trsf_temp    || isNaN(x1.trsf_temp))    {found_t = 1; fields_trsf += "[Temp]";}
					if (!x1.trsf_qty_amb || isNaN(x1.trsf_qty_amb)) {found_t = 1; fields_trsf += "[Obs Qty]";}
					if (!x1.trsf_qty_cor || isNaN(x1.trsf_qty_cor)) {found_t = 1; fields_trsf += "[Std Qty]";}
					if (!x1.trsf_load_kg || isNaN(x1.trsf_load_kg)) {found_t = 1; fields_trsf += "[Mass Qty]";}
					
					if (found_t == 1)
					{
						if (x1.trsf_cmpt_no)
						{
							ret.addItem({type:"W", msg:"+-"+mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__COMPARTMENT')+"[" + x1.trsf_cmpt_no + "]:" + fields_trsf});
						}
						else
						{
							ret.addItem({type:"W", msg:"+-"+mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__TRANSFER')+"[" + idxTrsf + "]:" + fields_trsf});
						}
					}
					
					// Ver3.1 Compulsary fields check
					found_t = 0;
					if (
						(x1.trsf_cmpt_no      != null && x1.trsf_cmpt_no      != "")
					 && (x1.trsf_drwr_cd      != null && x1.trsf_drwr_cd      != "")
					 && (x1.trsf_drwr_prod_cd != null && x1.trsf_drwr_prod_cd != "")
					 && (x1.trsf_arm_cd       != null && x1.trsf_arm_cd       != "")
					 && (
						  (x1.trsf_density      == null || x1.trsf_density      == "")
					   || (x1.trsf_temp         == null || x1.trsf_temp         == "")
					   || (x1.trsf_qty_amb      == null || x1.trsf_qty_amb      == "")
					   || (x1.trsf_qty_cor      == null || x1.trsf_qty_cor      == "")
					   || (x1.trsf_load_kg      == null || x1.trsf_load_kg      == "")
					   )
					)
					{
						found_t = 1;
					}
					
					if (found_t == 1)
					{
						if (x1.trsf_cmpt_no)
						{
							ret.addItem({type:"E2", msg:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__COMPARTMENT')+"[" + x1.trsf_cmpt_no + "]: " + mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__MISSING_DATA')});
						}
						else
						{
							ret.addItem({type:"E2", msg:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__TRANSFER')+"[" + idxTrsf + "]: " + mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__MISSING_DATA')});
						}
					}
					
					// Ver2.4 Data range check.
					var tonumber:Number;
					fields_trsf = "";
					found_t = 0;
					tonumber = Math.round(Number(x1.trsf_density) * DENSITY_DECIMAL) / DENSITY_DECIMAL;
					if (!(!x1.trsf_density || isNaN(x1.trsf_density)) && dataRangeCheck('TRSF_DEN', tonumber) != 0)  {found_t = 1; fields_trsf += "[Density]";}
					tonumber = Math.round(Number(x1.trsf_temp) * TEMP_DECIMAL) / TEMP_DECIMAL;
					if (!(!x1.trsf_temp    || isNaN(x1.trsf_temp))    && dataRangeCheck('TRSF_TEMP', tonumber) != 0) {found_t = 1; fields_trsf += "[Temp]";}
					tonumber = Math.round(Number(x1.trsf_qty_amb));
					if (!(!x1.trsf_qty_amb || isNaN(x1.trsf_qty_amb)) && dataRangeCheck('TRSF_OBS', tonumber) != 0)  {found_t = 1; fields_trsf += "[Obs Qty]";}
					tonumber = Math.round(Number(x1.trsf_qty_cor));
					if (!(!x1.trsf_qty_cor || isNaN(x1.trsf_qty_cor)) && dataRangeCheck('TRSF_COR', tonumber) != 0)  {found_t = 1; fields_trsf += "[Std Qty]";}
					tonumber = Math.round(Number(x1.trsf_load_kg));
					if (!(!x1.trsf_load_kg || isNaN(x1.trsf_load_kg)) && dataRangeCheck('TRSF_MASS', tonumber) != 0) {found_t = 1; fields_trsf += "[Mass Qty]";}
					
					if (found_t == 1)
					{
						if (x1.trsf_cmpt_no)
						{
							ret.addItem({type:"E2", msg:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__COMPARTMENT')+"[" + x1.trsf_cmpt_no + "]: " + fields_trsf + " " + mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__DATA_OUT_RANGE')});
						}
						else
						{
							ret.addItem({type:"E2", msg:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__TRANSFER')+"[" + idxTrsf + "]: " + fields_trsf + " " + mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__DATA_OUT_RANGE')});
						}
					}
					
					// Base
					var bs:ArrayCollection = new ArrayCollection();
					var strTmp:String;
					var idxBs:int = 0;
					var baseTotal:Number = 0;
					var flag:Boolean = true;
					for each (var x12:Object in o.baseprod)
					{
						var fields_bs:String = "";
						idxBs++;
						found_b = 0;
						
						if (!x12.trsf_bs_prodcd)        {found_b = 1; fields_bs += "[Prod]";}
						if (!x12.trsf_bs_tk_cd)         {found_b = 1; fields_bs += "[Tank]";}
						if (!x12.trsf_bs_prodcls)       {found_b = 1; fields_bs += "[Prod Cls]";}
						if (isNaN(x12.trsf_bs_den))     {found_b = 1; fields_bs += "[Density]";}
						if (isNaN(x12.trsf_bs_temp))    {found_b = 1; fields_bs += "[Temp]";}
						if (isNaN(x12.trsf_bs_qty_amb)) {found_b = 1; fields_bs += "[Obs Qty]";}
						if (isNaN(x12.trsf_bs_qty_cor)) {found_b = 1; fields_bs += "[Std Qty]";}
						if (isNaN(x12.trsf_bs_load_kg)) {found_b = 1; fields_bs += "[Mass Qty]";}
						
						if (found_b == 1)
						{
							if (!found_t && flag)
							{
								ret.addItem({type:"W", msg:"+-"+mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__COMPARTMENT')+"[" + x1.trsf_cmpt_no + "]"});
								flag = false;
							}
							if (x1.trsf_cmpt_no)
							{
								///ret.addItem({type:"W", msg:"+-"+mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__COMPARTMENT')+"[" + x1.trsf_cmpt_no + "]."+mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__BASEPROD')+"[" + idxBs +"]:" + fields_bs});
								ret.addItem({type:"W", msg:"|--------"+mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__BASEPROD')+"[" + idxBs +"]:" + fields_bs});
							}
							else
							{
								///ret.addItem({type:"W", msg:"+-"+mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__TRANSFER')+"[" + idxTrsf + "]."+mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__BASEPROD')+"[" + idxBs +"]:" + fields_bs});
								ret.addItem({type:"W", msg:"|-----"+mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__BASEPROD')+"[" + idxBs +"]:" + fields_bs});
							}
						}
						
						// Cal the total qty of base amb.
						if (!isNaN(x12.trsf_bs_qty_amb))
						{
							baseTotal += Number(x12.trsf_bs_qty_amb);
						}
					}
					
					// Check the base total qty with draw prod qty.
					var drawProdQty:int = 0;
					if (!isNaN(x1.trsf_qty_amb))
					{
						drawProdQty = Number(x1.trsf_qty_amb);
					}
					if (Math.abs(drawProdQty - Math.round(baseTotal)) > DM.ManualTransactions.DRAWERPROD_BASE_TOLERANCE)
					{
						if (x1.trsf_cmpt_no)
						{
							ret.addItem({type:"E2", msg:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__COMPARTMENT')+"[" + x1.trsf_cmpt_no + "] " + mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__QTY_BASE_NOT_MATCH')});
						}
						else
						{
							ret.addItem({type:"E2", msg:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__TRANSFER')+"[" + idxTrsf + "] " + mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__QTY_BASE_NOT_MATCH')});
						}
					}
					
					// Meter
					var mtr:ArrayCollection = new ArrayCollection();
					var idxMtr:int = 0;
					for each (var x11:Object in o.meter)
					{
						var fields_mtr:String = "";
						idxMtr++;
						found_m = 0;
						if (!x11.trsf_mtr_cd)                                       {found_m = 1; fields_mtr += "[Meter]";}
						if (!x11.trsf_mtr_typ)                                      {found_m = 1; fields_mtr += "[Mtr Typ]";}
						if (!x11.trsf_mtr_opn_amb  || isNaN(x11.trsf_mtr_opn_amb))  {found_m = 1; fields_mtr += "[Open Obs]";}
						if (!x11.trsf_mtr_cls_amb  || isNaN(x11.trsf_mtr_cls_amb))  {found_m = 1; fields_mtr += "[Cls Obs]";}
						if (!x11.trsf_mtr_opn_cor  || isNaN(x11.trsf_mtr_opn_cor))  {found_m = 1; fields_mtr += "[Open Std]";}
						if (!x11.trsf_mtr_cls_cor  || isNaN(x11.trsf_mtr_cls_cor))  {found_m = 1; fields_mtr += "[Cls Std]";}
						if (!x11.trsf_mtr_open_kg  || isNaN(x11.trsf_mtr_open_kg))  {found_m = 1; fields_mtr += "[Open Mass]";}
						if (!x11.trsf_mtr_close_kg || isNaN(x11.trsf_mtr_close_kg)) {found_m = 1; fields_mtr += "[Cls Mass]";}
						if (found_m == 1)
						{
							if (!found_t && flag)
							{
								ret.addItem({type:"W", msg:"+-"+mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__COMPARTMENT')+"[" + x1.trsf_cmpt_no + "]"});
								flag = false;
							}
							if (x1.trsf_cmpt_no)
							{
								///ret.addItem({type:"W", msg:"+-"+mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__COMPARTMENT')+"[" + x1.trsf_cmpt_no + "]."+mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__METER')+"[" + idxMtr +"]:" + fields_mtr});
								ret.addItem({type:"W", msg:"|-------"+mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__METER')+"[" + idxMtr +"]:" + fields_mtr});
							}
							else
							{
								///ret.addItem({type:"W", msg:"+-"+mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__TRANSFER')+"[" + idxTrsf + "]."+mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__METER')+"[" + idxMtr +"]:" + fields_mtr});
								ret.addItem({type:"W", msg:"|----"+mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FIELD__METER')+"[" + idxMtr +"]:" + fields_mtr});
							}
						}
					}
				}
			}
	
			return ret;
		}
		
		/**
		 *  
		 *  
		 */
		public function balanceQtyCheck_Submit(o:Object):int
		{
			var res:int = 0;
			
			// Availale QTY check.
			if (DM.ManualTransactions.schedule_type == "BY_COMPARTMENT")
			{
				if ((o.transfer.trsf_drwr_prod_plan_qty - o.transfer.trsf_drwr_prod_loaded_qty <= 0)
				&& o.transfer.trsf_drwr_prod_plan_qty != null) // Somehow a schedule by product becomes a schedule by compartment once do a manual transaction, and the trsf_drwr_prod_plan_qty is null in this case.
				{
					res = 1;
				}
			}
			else if (DM.ManualTransactions.schedule_type == "BY_PRODUCT")
			{
				// Check the selected drawer product in the container list.
				for each (var obj:Object in DM.ManualTransactions.schdbyprodlist)
				{
					if (o.transfer.trsf_drwr_prod_cd == obj.PROD_CODE)
					{
						if (obj.SCHP_SPECQTY - obj.QTY_LOADED <= 0)
						{
							res = 1;
							break;
						}
					}
				}
			}

			return res;
		}
		
		/**
		 *  
		 *  
		 */
		public function preCheck_StartupMT(supp:String, trip_no:String, callback:Function = null):void
		{
			if (isRepost == REPOST_ON)
			{
				// If Repost, the trip status must be 'ENDED' or 'DElEVERED' and has Reverse flag.
				var call:CallResponder = new CallResponder()
				call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_PRECHECK_STARTUP_MT'));});
				call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
					for each (var o:Object in obj.result)
					{
						// Do REPOST only when this trip status is ('ENDED' or 'DElEVERED') and REVERSED.
						if ((o.STATUS == 'E' || o.STATUS == 'D') && o.LOAD_REVERSE_FLAG == 1)
						{
							isRejected = REJECT_OFF;
							if (callback)
								callback();
						}
						else
						{
							global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.CANNOT_REPOST_TRIP'));
							isRejected = REJECT_ON;
							updateStatus();
						}
						break;
					}
				});
				call.token = view.manualtransactionsservice.preCheck_StartupMT(supp, trip_no);
			}
			else
			{
				if (callback)
					callback();
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function submit():void{
			/* Transaction Basic Info */
			var trans:Object = new Object();
			
			if (view.new_supplier.selectedIndex > -1)
			{
				trans.Supplier = view.new_supplier.selectedItem.CMPY_CODE;
				//trace(view.new_supplier.selectedItem.CMPY_CODE);
				//trace(view.new_carrier.selectedItem.CMPY_CODE);
			}
			
			switch(view.new_trans_type.selectedItem.id)
			{
				case "S":  // Shipment(Non Open Order)
				case "N":  // Nomination
					if (view.new_trip.selectedIndex > -1)
					{
						trans.Load_Number = view.new_trip.selectedItem.SHLS_TRIP_NO;
						trace(view.new_trip.selectedItem.SHLS_TRIP_NO);
					}
					
					break;
				case "O":  // Open Order
					if (view.new_order.selectedIndex > -1)
					{
						trans.new_order = view.new_order.selectedItem.ORDER_CUST_ORDNO;
						trace(view.new_order.selectedItem.ORDER_CUST_ORDNO);
					}
					if (view.new_customer.hasOwnProperty("selectedItem") && view.new_customer.selectedIndex > -1)
					{
						trans.Customer = view.new_customer.selectedItem.CUST_ACNT;
					}
					
					break;
				/* 0711 Merged with shipment
				case "N":  // Nomination
					if (view.new_nomi_item.selectedIndex > -1)
					{
						trans.new_nomi_item = view.new_nomi_item.selectedItem.MVITM_ITEM_ID;
						trace(view.new_nomi_item.selectedItem.MVITM_ITEM_ID);
					}
					
					break;
				*/
				default:
					break;
			}
			
			if (view.new_carrier.selectedIndex > -1)
			{
				//trace(view.new_carrier.selectedItem.CMPY_CODE);
			}
			
			if (view.new_user.selectedIndex > -1)
			{
				trans.Operator_Code = view.new_user.selectedItem.PER_CODE;
				//trace(view.new_user.selectedItem.PER_CODE);
			}
			
			// Login user code.
			trans.Login_User = global.user;
			
			trans.Start_Time = view.dateConvert.format(view.trans_st_dmy.selectedDate);//"29.04.201312:28:43";
			trans.Finish_Time = view.dateConvert.format(view.trans_ed_dmy.selectedDate);//"29.04.201312:32:02";
			//trans.Drawer_Code = "1001";
			//trans.Drawer_Name = "SHELLSAP";
			trans.Tanker_Code = view.new_tanker.selectedItem.TNKR_CODE;
			
			trans.TAS_Ref = view.new_tas_ref.text;
			trans.User_Comments = view.new_user_comments.text;
			trans.Customer_Code = view.new_customer_cd.text;
			trans.Seal_Range = view.seal_range.text;
			trans.Seal_List = this.sealList.source;
			
			/* Transfers Info */
			var trf_no:int = 0;
			var trf:ArrayCollection = new ArrayCollection();
			var chkres:int;
			for each (var o:Object in DM.ManualTransactions.transactionDataArr)
			{
				// Base
				var bs_no:int = 0;
				var bs:ArrayCollection = new ArrayCollection();
				var strTmp:String;
				for each (var x12:Object in o.baseprod)
				{
					var y12:Object = new Object();
					
//					if (isNaN(x12.trsf_bs_den))	    x12.trsf_bs_den     = 0;
//					if (isNaN(x12.trsf_bs_temp))	    x12.trsf_bs_temp    = 0;
//					if (isNaN(x12.trsf_bs_qty_amb))  x12.trsf_bs_qty_amb = 0;
//					if (isNaN(x12.trsf_bs_qty_cor))  x12.trsf_bs_qty_cor = 0;
//					if (isNaN(x12.trsf_bs_load_kg))  x12.trsf_bs_load_kg = 0;
					
					if (x12.trsf_bs_tk_cd)  
						y12.Tank_Code    = x12.trsf_bs_tk_cd;
					else
						y12.Tank_Code    = null;
					if (x12.trsf_bs_prodcd) 
						y12.product_code = x12.trsf_bs_prodcd;
					else
						y12.product_code = null;
					if (x12.trsf_bs_prodcls) 
					{
						strTmp          = x12.trsf_bs_prodcls;
						y12.prod_class  = strTmp.toUpperCase();
					}
					else
					{
						y12.prod_class  = null;
					}
					
					y12.dens         = (isNaN(x12.trsf_bs_den    ) ? 0 : x12.trsf_bs_den    ) * DEN_FACTOR;
					y12.Temperature  = (isNaN(x12.trsf_bs_temp   ) ? 0 : x12.trsf_bs_temp   ) * TEMP_FACTOR;
					y12.amb_vol      = (isNaN(x12.trsf_bs_qty_amb) ? 0 : x12.trsf_bs_qty_amb) * QTY_FACTOR;
					y12.cor_vol      = (isNaN(x12.trsf_bs_qty_cor) ? 0 : x12.trsf_bs_qty_cor) * QTY_FACTOR;
					y12.liq_kg       = (isNaN(x12.trsf_bs_load_kg) ? 0 : x12.trsf_bs_load_kg) * QTY_FACTOR;
					
					bs.addItem(y12);
					bs_no++;
				}
				
				// Meter
				var mtr_no:int = 0;
				var mtr:ArrayCollection = new ArrayCollection();
				for each (var x11:Object in o.meter)
				{
					var y11:Object = new Object();
					
//					if (isNaN(x11.trsf_mtr_opn_amb))	 x11.trsf_mtr_opn_amb  = 0;
//					if (isNaN(x11.trsf_mtr_opn_cor))  x11.trsf_mtr_opn_cor  = 0;
//					if (isNaN(x11.trsf_mtr_open_kg))  x11.trsf_mtr_open_kg  = 0;
//					if (isNaN(x11.trsf_mtr_cls_amb))  x11.trsf_mtr_cls_amb  = 0;
//					if (isNaN(x11.trsf_mtr_cls_cor))  x11.trsf_mtr_cls_cor  = 0;
//					if (isNaN(x11.trsf_mtr_close_kg)) x11.trsf_mtr_close_kg = 0;
					
					if (x11.trsf_mtr_typ)
						y11.Injector_or_Meter    = x11.trsf_mtr_typ;
					else
						y11.Injector_or_Meter    = null;
					if (x11.trsf_mtr_cd)
						y11.Meter_Injector_Code  = x11.trsf_mtr_cd;
					else
						y11.Meter_Injector_Code  = null;
					y11.open_amb  = (isNaN(x11.trsf_mtr_opn_amb ) ? 0 : x11.trsf_mtr_opn_amb ) * QTY_FACTOR;
					y11.open_cor  = (isNaN(x11.trsf_mtr_opn_cor ) ? 0 : x11.trsf_mtr_opn_cor ) * QTY_FACTOR;
					y11.open_kg   = (isNaN(x11.trsf_mtr_open_kg ) ? 0 : x11.trsf_mtr_open_kg ) * QTY_FACTOR;
					y11.close_amb = (isNaN(x11.trsf_mtr_cls_amb ) ? 0 : x11.trsf_mtr_cls_amb ) * QTY_FACTOR;
					y11.close_cor = (isNaN(x11.trsf_mtr_cls_cor ) ? 0 : x11.trsf_mtr_cls_cor ) * QTY_FACTOR;
					y11.close_kg  = (isNaN(x11.trsf_mtr_close_kg) ? 0 : x11.trsf_mtr_close_kg) * QTY_FACTOR;
					
					mtr.addItem(y11);
					mtr_no++;
				}
				
				// Transfer
				
				// Available QTY check.
				chkres = balanceQtyCheck_Submit(o);
				if (chkres)
				{
					// This transfer will NOT be passed to baiman.
					continue;
				}
				
				var x1:Object = new Object;
				x1 = o.transfer;
				
				// For RESPOST a transaction, arm code is no meaning.
				// 2013/11/18  Host comm needs arm code, so commented out.
//				if (isRepost == REPOST_ON)
//				{
//					x1.trsf_arm_cd = null;
//				}
				
//				if (isNaN(x1.trsf_density))	x1.trsf_density = 0;
//				if (isNaN(x1.trsf_temp))	    x1.trsf_temp    = 0;
//				if (isNaN(x1.trsf_qty_amb))  x1.trsf_qty_amb = 0;
//				if (isNaN(x1.trsf_qty_cor))  x1.trsf_qty_cor = 0;
//				if (isNaN(x1.trsf_load_kg))  x1.trsf_load_kg = 0;
				
				trf.addItem(
					{
						Delv_Num        : x1.trsf_delv_num,
						Arm_Code        : x1.trsf_arm_cd,
						nr_in_tkr       : x1.trsf_cmpt_no,
						drawer_code     : x1.trsf_drwr_cd,
						product_code    : x1.trsf_drwr_prod_cd,
						dens            : (isNaN(x1.trsf_density) ? 0 : x1.trsf_density) * DEN_FACTOR, //x1.trsf_density * DEN_FACTOR,
						Temperature     : (isNaN(x1.trsf_temp   ) ? 0 : x1.trsf_temp   ) * TEMP_FACTOR,//x1.trsf_temp * TEMP_FACTOR,
						amb_vol         : (isNaN(x1.trsf_qty_amb) ? 0 : x1.trsf_qty_amb) * QTY_FACTOR, //x1.trsf_qty_amb * QTY_FACTOR,
						cor_vol         : (isNaN(x1.trsf_qty_cor) ? 0 : x1.trsf_qty_cor) * QTY_FACTOR, //x1.trsf_qty_cor * QTY_FACTOR,
						liq_kg          : (isNaN(x1.trsf_load_kg) ? 0 : x1.trsf_load_kg) * QTY_FACTOR, //x1.trsf_load_kg * QTY_FACTOR,
						Equipment_ID    : x1.trsf_equip_id,
						Planned_Qty     : x1.trsf_drwr_prod_plan_qty  * QTY_FACTOR,
						num_of_meter    : mtr_no,
						meters          : mtr,
						Number_of_Bases : bs_no,
						bases           : bs
					});
				trf_no++;
			}
			
			if (trf.length == 0)
			{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.NO_VALID_TRANSFER'));
				return;
			}
			
			switch(view.new_trans_type.selectedItem.id)
			{
				case "S":  // Shipment(Non Open Order)
				case "N":  // Nomination
					if (isRepost == REPOST_ON)
					{
						// If Repost, don't check the trip status. Directly submit it. baiman can handle it.
						view.submitResult.token = view.manualtransactionsservice.do_create(0, trans, trf_no, trf, 0);
					}
					else
					{
						// Final check trip status before submitting.
						var call:CallResponder = new CallResponder()
						call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_SUBMIT'));});
						call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
							for each (var o:Object in obj.result)
							{
								// Submit only when this trip status is still 'NEW', 'ACTIVE' or null.
								if (o.STATS == 'F' || o.STATS == 'A' || o.STATS == null)
								{
									view.submitResult.token = view.manualtransactionsservice.do_create(0, trans, trf_no, trf, 0);
								}
								else
								{
									global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_SUBMIT_MT__TRIP_END'));
								}
								break;
							}
							
						});
						call.token = view.manualtransactionsservice.finalCheck_Submit(view.new_supplier.selectedItem.CMPY_CODE, view.new_trip.selectedItem.SHLS_TRIP_NO);
					}
					break;
				case "O":  // Open Order
					view.submitResult.token = view.manualtransactionsservice.do_create(trans.new_order, trans, trf_no, trf, 0);
					
					break;
				/* 0711 Merged with shipment
				case "N":  // Nomination
					view.submitResult.token = view.manualtransactionsservice.do_create(trans.new_nomi_item, trans, trf_no, trf, 1);
					
					break;
				*/
				default:
					break;
			}	
			
			//trace(view.submitResult.token.toString())
		}

		/**
		 *  
		 *  
		 */
		public function loadMTData(SeqID: String, f:Function = null):void
		{
			var call:CallResponder = new CallResponder();
			var oDst:Object;
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_LOAD_MT_DATA'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				for each (var oSrc:Object in obj.result)
				{
					var strHead:String;
					var strBody:String;
					var params:Object = new Object();
					var len:Number;
					var value:String;
					var value_bp:String;
					var value_mtr:String;
					
					// Get manual transaction head data.
					strHead = oSrc.gud_head_data;
					len = strHead.length;
					var xmlHead = new XML(strHead);
					
					params["loadmode"]      = LM_SAVED; // 0: Loading from other screen.  1: Loading from saved MT data.
					params["transType"]     = (xmlHead.TRANSACTION_TYPE == 'S') ? 0 : ((xmlHead.TRANSACTION_TYPE == 'O') ? 1 : ((xmlHead.TRANSACTION_TYPE == 'N') ? 2 : -1));
					params["order_cust_no"] = String(xmlHead.ORDER_TRIP_IND);
					params["trip"]          = String(xmlHead.LOAD_NUMBER);
					params["supplier"]      = String(xmlHead.SUPPLIER);
					params["carrier"]       = String(xmlHead.CARRIER);
					params["tanker"]        = String(xmlHead.TANKER_CODE);
					params["operator"]      = String(xmlHead.OPERATOR_CODE);
					params["starttime"]     = String(xmlHead.START_TIME);
					params["finishtime"]    = String(xmlHead.FINISH_TIME);
					params["customer"]      = String(xmlHead.CUSTOMER);
					params["customercode"]  = String(xmlHead.CUSTOMER_CODE);
					params["tasref"]        = String(xmlHead.TAS_REF);
					params["usercomment"]   = String(xmlHead.USER_COMMENTS);
					params["sealrange"]     = String(xmlHead.SEAL_RANGE);
					params["schdsubtype"]   = String(xmlHead.SCHD_SUB_TYPE);	  // Not displayed, internal use only.
					params["repost"]        = String(xmlHead.TRANSACTION_REPOST); // Not displayed, internal use only.
					
					// Get manual transaction body data.
					strBody = oSrc.gud_body_data;
					len = strBody.length;
					xmlBody = new XML(strBody);
					
					params["hasExtraData"]   = 1;
					params["transdetails"]   = xmlBody;
					
					setFilters(params, false, function():void{
						// Load the control members values.
						var dmMT:Object = DM.ManualTransactions;
						dmMT.base_obs_total					 = xmlHead.CM_BASE_OBS_TOTAL;
						dmMT.base_std_total					 = xmlHead.CM_BASE_STD_TOTAL;
						dmMT.base_mass_total				 = xmlHead.CM_BASE_MASS_TOTAL;
						dmMT.base_std_total_disp			 = xmlHead.CM_BASE_STD_TOTAL_DISP;
						dmMT.base_mass_total_disp			 = xmlHead.CM_BASE_MASS_TOTAL_DISP;
						dmMT.base_std_mass_total_disp		 = xmlHead.CM_BASE_STD_MASS_TOTAL_DISP;
						dmMT.needRefreshBaseprodTotalDataArr = xmlHead.CM_NEED_REFRESH_BP_TOTAL == 1 ? true : false;
						dmMT.isAccBaseAdjusted				 = xmlHead.CM_IS_ACC_BASE_ADJUSTED == 1 ? true : false;
					});  // Ver3.0 added callback
				}
			});
			call.token = view.manualtransactionsservice.readMTData(SeqID);
		}
		
		/**
		 *  
		 *  
		 */
		public function setFilters(params:* = false, hasExtraData: Boolean = false, callback_sf:Function = null): void
		{
			if (params == false)
			{
				return;
			}
			
			view.currentState = "normal";
			
			trace ("in Manual Transactions setFilters");
			
			DM.ManualTransactions.view = view;
			resetSettings();
			initialize();
			DM.ManualTransactions.resultHandler = function setFilters_callback(){
				
				trace ("in Manual Transactions setFilters_callback");
				
				var trip_number:String;
				var supp:String;
				trip_number = "";
				supp = "";
				trip_number = tools.getObjAttribute(params, "trip", "");
				supp = tools.getObjAttribute(params, "supplier", "");
				
				if (params['loadmode'] == LM_SAVED) // Frankly I dont think other screens will set this param - loadmode, when they call MT.
					load_mode = LM_SAVED;
				else
					load_mode = LM_NORMAL;
				
				if (params['repost'] == 1 || params['repost'] == true)
					isRepost = REPOST_ON;
				else
					isRepost = REPOST_OFF;
				
				preCheck_StartupMT(supp, trip_number, function():void{
					
					view.new_trans_type.selectedIndex = int(tools.getObjAttribute(params, "transType", -1));
					new_trans_type_changeHandler(null);
					
					// Set Filters.
					switch (view.new_trans_type.selectedIndex)
					{
						case 0:  // Shipment
							view.new_supplier.selectedIndex = tools.getItemIndexFromCode(tools.getObjAttribute(params, "supplier", ""), DM.ManualTransactions.suppliers, "CMPY_CODE");
							
							if (load_mode == LM_SAVED)
							{
								// If 'loadmode' parameter set and equals 1(load from saved MT data),
								// retrive all trips belong to selected supplier. Then set trip no.
								// Level 1
								new_supplier_changeHandler(null, function():void{
									
									// Level 2 - callback
									view.new_trip.selectedIndex = tools.getItemIndexFromCode(tools.getObjAttribute(params, "trip", ""), DM.ManualTransactions.trips, "SHLS_TRIP_NO");
									
									// TEST START - Case: trip doesn't exist
									//						view.new_trip.selectedIndex = -1;
									//						if (view.new_trip.selectedIndex == -1)
									//						{
									//							global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.PROCESS_STOP__TRIP_NOTEXIST'));
									//							return;
									//						}
									// TEST END
									
									new_trip_changeHandler(null, function():void{
										
										//-----------------------------------------------------------------------------------------
										// NOTE: 
										//       BY_PRODUCT + SUB1 is a special case in Shipment.
										//       Some behaviour similar to Open Order(User can select Carrier and Tanker.
										//       Once Tanker changed then populate transfer details.
										//
										// Here, need to check the schedule type to continue process.
										// If not BY_PRODUCT and SUB1(generic carrier), do the normal processes as trip changes,
										// otherwise do the porcesses as Open Order - Carrier and Tanker change.
										//-----------------------------------------------------------------------------------------
										if (!(tools.getObjAttribute(params, "schdsubtype", "") != '' && tools.getObjAttribute(params, "schdsubtype", "") == 'SUB1'))
										{
											
											// Level 3 - callback
											if (tools.getObjAttribute(params, "operator", "") != '') // If operator has been specified
											{
												view.new_user.selectedIndex = tools.getItemIndexFromCode(tools.getObjAttribute(params, "operator", ""), DM.ManualTransactions.operators, "PER_CODE");
											}
											
											// Reload user entered Transfer, Base and Meter data.
											if (tools.getObjAttribute(params, "hasExtraData", "") != ''
												&& tools.getObjAttribute(params, "hasExtraData", "") == 1
												&& tools.getObjAttribute(params, "transdetails", "") != '')
											{
												xmlBody = tools.getObjAttribute(params, "transdetails", "")
												reloadUserData();
												
												if (callback_sf != null) //Ver3.0 added
													callback_sf();
											}
										}
										else // Schedule type is PreOrder(schedule BY_PRODUCT) and Carrier is Generic Carrier. Do something similar as Open Order!
										{
											// Level 3 - callback
											view.new_carrier.selectedIndex = tools.getItemIndexFromCode(tools.getObjAttribute(params, "carrier", ""), DM.ManualTransactions.carriers, "CMPY_CODE");
											new_carrier_changeHandler(null, function():void{
												
												// Level 4 - callback
												view.new_tanker.selectedIndex = tools.getItemIndexFromCode(tools.getObjAttribute(params, "tanker", ""), DM.ManualTransactions.tankers, "TNKR_CODE");
												new_tanker_changeHandler(null, function():void{
													
													// Level 5 - callback
													view.new_user.selectedIndex = tools.getItemIndexFromCode(tools.getObjAttribute(params, "operator", ""), DM.ManualTransactions.operators, "PER_CODE");
													
													// Reload user entered Transfer, Base and Meter data.
													if (tools.getObjAttribute(params, "hasExtraData", "") != ''
														&& tools.getObjAttribute(params, "hasExtraData", "") == 1
														&& tools.getObjAttribute(params, "transdetails", "") != '')
													{
														xmlBody = tools.getObjAttribute(params, "transdetails", "")
														reloadUserData();
														
														if (callback_sf != null) //Ver3.0 added
															callback_sf();
													}
												}); // end of new_tanker_changeHandler
											}); // end of new_carrier_changeHandler
										}
									}); // end of new_trip_changeHandler
								}); // end of new_supplier_changeHandler
							}
							else // LM_NORMAL
							{
								var trip_number:String;
								var supp:String;
								trip_number = "";
								supp = "";
								trip_number = tools.getObjAttribute(params, "trip", "");
								supp = tools.getObjAttribute(params, "supplier", "");
								trace ("trip===", "###"+trip_number+"###", DM.ManualTransactions.trips.length);
								DM.ManualTransactions.trips.removeAll();
								DM.ManualTransactions.trips.addItem({SHLS_TRIP_NO: trip_number});
								view.new_trip.selectedIndex = 0;
								
								// TEST START - Case: trip doesn't exist
								//						view.new_trip.selectedIndex = -1;
								//						if (view.new_trip.selectedIndex == -1)
								//						{
								//							global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.PROCESS_STOP__TRIP_NOTEXIST'));
								//							return;
								//						}
								// TEST END
								
								// Level 1
								new_trip_changeHandler(null, function():void{
									
									// Level 2 - callback
									if (tools.getObjAttribute(params, "operator", "") != '') // If operator has been specified
									{
										view.new_user.selectedIndex = tools.getItemIndexFromCode(tools.getObjAttribute(params, "operator", ""), DM.ManualTransactions.operators, "PER_CODE");
									}
									
									//-----------------------------------------------------------------------------------------
									// NOTE: 
									//       Check whether it is REPOST from load schedule screen.
									//
									// Here, need to check the isRepost flag to continue process.
									// If it is REPOST, we need to generate a new XML object(xmlBody) and pass it to reloadUserData(),
									// which is very similar to loading a saved MT data.
									//-----------------------------------------------------------------------------------------
									
									if (isRepost == REPOST_ON)
									{
										// Generate an XML object according to Trip No.
										// The detailed XML data come from the most recent reversed transaction (negtive values)
										// and we need change them to postitive values.
										genRepostUserData(supp, trip_number, function():void{
											
											xmlBody = XML(mt_body_repost);
											
											// Initialize REPOST Transfer data here!
											DM.ManualTransactions.xmlBody = xmlBody;
											DM.ManualTransactions.initializeTransfer_repost();
											
											reloadUserData();
										});
									}
									else // non REPOST
									{
										// Reload user entered Transfer, Base and Meter data.
										if (tools.getObjAttribute(params, "hasExtraData", "") != ''
											&& tools.getObjAttribute(params, "hasExtraData", "") == 1
											&& tools.getObjAttribute(params, "transdetails", "") != '')
										{
											xmlBody = tools.getObjAttribute(params, "transdetails", "")
											reloadUserData();
										}
									}
								}); // end of new_trip_changeHandler
							}
							break;
						case 1:  // Open Order
							if (true /*tools.getObjAttribute(params, "loadmode", "") != '' && tools.getObjAttribute(params, "loadmode", "") == 1*/)
							{
								// If 'loadmode' parameter set and equals 1(load from saved MT data).
								view.new_supplier.selectedIndex = tools.getItemIndexFromCode(tools.getObjAttribute(params, "supplier", ""), DM.ManualTransactions.suppliers, "CMPY_CODE");
								// Level 1
								new_supplier_changeHandler(null, function():void{
									
									// Level 2 - callback
									view.new_customer.selectedIndex = tools.getItemIndexFromCode(tools.getObjAttribute(params, "customer", ""), DM.ManualTransactions.customers, "CUST_ACNT");
									new_customer_changeHandler(null, function():void{
										
										// Level 3 - callback
										view.new_order.selectedIndex = tools.getItemIndexFromCode(tools.getObjAttribute(params, "order_cust_no", ""), DM.ManualTransactions.openorders, "ORDER_CUST_ORDNO");
										new_order_changeHandler(null, function():void{
											
											// Level 4 - callback
											view.new_carrier.selectedIndex = tools.getItemIndexFromCode(tools.getObjAttribute(params, "carrier", "-1"), DM.ManualTransactions.carriers, "CMPY_CODE");
											new_carrier_changeHandler(null, function():void{
												
												// Level 5 - callback
												view.new_tanker.selectedIndex = tools.getItemIndexFromCode(tools.getObjAttribute(params, "tanker", ""), DM.ManualTransactions.tankers, "TNKR_CODE");
												new_tanker_changeHandler(null, function():void{
													
													// Level 6 - callback
													view.new_user.selectedIndex = tools.getItemIndexFromCode(tools.getObjAttribute(params, "operator", ""), DM.ManualTransactions.operators, "PER_CODE");
													
													// Reload user entered Transfer, Base and Meter data.
													if (tools.getObjAttribute(params, "hasExtraData", "") != ''
														&& tools.getObjAttribute(params, "hasExtraData", "") == 1
														&& tools.getObjAttribute(params, "transdetails", "") != '')
													{
														xmlBody = tools.getObjAttribute(params, "transdetails", "")
														reloadUserData();
														
														if (callback_sf != null) //Ver3.0 added
															callback_sf();
													}
												}); // end of new_tanker_changeHandler
											}); // end of new_carrier_changeHandler
										}); // end of new_order_changeHandler
									}); // end of new_customer_changeHandler
								}); // end of new_supplier_changeHandler
							}
							else
							{
							}
							break;
						case 2:  // Nomination
							break;
					}
					
					// Set other items.
					view.new_tas_ref.text = tools.getObjAttribute(params, "tasref", "");
					view.new_user_comments.text = tools.getObjAttribute(params, "usercomment", "");
					view.seal_range.text = tools.getObjAttribute(params, "sealrange", "");
					var tmp:String;
					tmp = tools.getObjAttribute(params, "starttime", "");
					view.trans_st_dmy.selectedDate = new Date((tmp != "") ? tmp : getDefaultDate());
					tmp = tools.getObjAttribute(params, "finishtime", "");
					view.trans_ed_dmy.selectedDate = new Date((tmp != "") ? tmp : getDefaultDate());
				
				}); // end of preCheck_StartupMT
				
				if ( view.new_trans_type.selectedIndex == 0 ) {
					view.controller.tripSealLoader.service(trip_number, supp);
				}
				if ( view.new_trans_type.selectedIndex == 1 ) {
					view.controller.nextSealLoader.service();
				}
			} // end of DM.ManualTransactions.resultHandler = function setFilters_callback()
			
			/* NOTE: HERE IS NOT THE LAST PROCESS OF THIS FUNCTION */
			reload2();
		}
		
		/**
		 *  
		 *  
		 */
		public function getRevBasesBySuppProd(callback:Function = null):void
		{
			// Get Reverse Bases data per transfer.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_REVERSE_BASE_DATA_PER_TRSF'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{

				for each (var o:Object in obj.result)
				{
					// Bases data
					mt_bp_repost +=
					'<BASEPROD>' +
					'<TANK_CODE>' 		+ o.TRSB_TK_TANKCODE 			+ '</TANK_CODE>' +
					'<PRODUCT_CODE>' 	+ o.TRSB_BS 					+ '</PRODUCT_CODE>' +
					'<PROD_CLASS>' 		+ o.BCLASS_DESC.toUpperCase()	+ '</PROD_CLASS>' +
					'<DENS>' 			+ o.AVG_DEN 					+ '</DENS>' +
					'<TEMPERATURE>' 	+ o.AVG_TEMP 					+ '</TEMPERATURE>' +
					'<AMB_VOL>' 		+ -o.SUM_AMB 					+ '</AMB_VOL>' +
					'<COR_VOL>' 		+ -o.SUM_COR 					+ '</COR_VOL>' +
					'<LIQ_KG>' 			+ -o.SUM_KG 					+ '</LIQ_KG>' +
					'<BASE_RATIO>' 		+ o.BASE_RATIO 					+ '</BASE_RATIO>' +  // only used for GUI calculation.
					'</BASEPROD>';
					bs_no_repost++;
					
					// Ver2.3 Added
					// Meters data
					mt_mtr_repost +=
					'<METER>' +
					'<INJECTOR_OR_METER>' 	+ o.INJ_OR_METER + '</INJECTOR_OR_METER>' +
					'<METER_INJECTOR_CODE>' + o.TRSB_METER   + '</METER_INJECTOR_CODE>' +
					'<OPEN_AMB>' 			+ o.OPN_AMB 	 + '</OPEN_AMB>' +
					'<OPEN_COR>' 			+ o.OPN_COR 	 + '</OPEN_COR>' +
					'<OPEN_KG>' 			+ o.OPN_KG 		 + '</OPEN_KG>' +
					'<CLOSE_AMB>' 			+ o.CLS_AMB 	 + '</CLOSE_AMB>' +
					'<CLOSE_COR>' 			+ o.CLS_COR 	 + '</CLOSE_COR>' +
					'<CLOSE_KG>' 			+ o.CLS_KG 		 + '</CLOSE_KG>' +
					'</METER>';
					mtr_no_repost++;
				}
				
				mt_trsf_repost +=
				'<TRANSFER>' +
				'<ARM_CODE>' 			+ trsfs_repost[_transferRowIdx_repost].TRSF_BAA_CODE /*Ver2.2 added*/													+ '</ARM_CODE>' +
				'<NR_IN_TKR>' 			+ trsfs_repost[_transferRowIdx_repost].NR_IN_TKR 																		+ '</NR_IN_TKR>' +
				'<DRAWER_CODE>' 		+ trsfs_repost[_transferRowIdx_repost].TRSFPROD_PRODCMPY 																+ '</DRAWER_CODE>' +
				'<PRODUCT_CODE>' 		+ trsfs_repost[_transferRowIdx_repost].TRSFPROD_PRODCODE 																+ '</PRODUCT_CODE>' +
				'<DENS>' 				+ (isNaN(trsfs_repost[_transferRowIdx_repost].AVG_DEN ) ? '' : trsfs_repost[_transferRowIdx_repost].AVG_DEN)			+ '</DENS>' +
				'<TEMPERATURE>' 		+ (isNaN(trsfs_repost[_transferRowIdx_repost].AVG_TEMP) ? '' : trsfs_repost[_transferRowIdx_repost].AVG_TEMP)			+ '</TEMPERATURE>' +
				'<AMB_VOL>' 			+ (isNaN(trsfs_repost[_transferRowIdx_repost].SUM_AMB ) ? '' : -trsfs_repost[_transferRowIdx_repost].SUM_AMB)			+ '</AMB_VOL>' +
				'<COR_VOL>' 			+ (isNaN(trsfs_repost[_transferRowIdx_repost].SUM_COR ) ? '' : -trsfs_repost[_transferRowIdx_repost].SUM_COR)			+ '</COR_VOL>' +
				'<LIQ_KG>' 				+ (isNaN(trsfs_repost[_transferRowIdx_repost].SUM_KG  ) ? '' : -trsfs_repost[_transferRowIdx_repost].SUM_KG)			+ '</LIQ_KG>' +
				'<EQUIPMENT_ID>' 		+ trsfs_repost[_transferRowIdx_repost].EQUIPMENT_ID 																	+ '</EQUIPMENT_ID>' +
				'<PLANNED_QTY>' 		+ (isNaN(trsfs_repost[_transferRowIdx_repost].ALLOWED_QTY ) ? '' : trsfs_repost[_transferRowIdx_repost].ALLOWED_QTY)	+ '</PLANNED_QTY>' +
				'<NUMBER_OF_BASES>' 	+ bs_no_repost 																											+ '</NUMBER_OF_BASES>' +
				'<NUMBER_OF_METERS>' 	+ mtr_no_repost 																										+ '</NUMBER_OF_METERS>' +
				mt_bp_repost +
				mt_mtr_repost +
				'</TRANSFER>';
				
				if (_transferRowIdx_repost < _transferRowMax_repost - 1)
				{
					// Inc transfer index.
					_transferRowIdx_repost++;
					mt_bp_repost  = "";
					bs_no_repost  = 0;
					mt_mtr_repost = "";
					mtr_no_repost = 0;
					
					// Get next transfer's bases.
					getRevBasesBySuppProd(callback);
				}
				else // All transfers data retrived.
				{
					// Get Reverse Base totals, then get Reverse Meter totals.
					getRevBasesTolByLoadID(getRevMetersTolByLoadID, callback);
				}
			});
			//call.token = view.manualtransactionsservice.getRevBasesBySuppProd(trsfs_repost[_transferRowIdx_repost].TRSFPROD_PRODCMPY, trsfs_repost[_transferRowIdx_repost].TRSFPROD_PRODCODE, trsfs_repost[_transferRowIdx_repost].TRSALDID_LOAD_ID, trsfs_repost[_transferRowIdx_repost].TRSA_VERSION);
			call.token = view.manualtransactionsservice.getRevBasesBySuppProd(trsfs_repost[_transferRowIdx_repost].TRSF_ID, trsfs_repost[_transferRowIdx_repost].TRSA_VERSION);
		}
		
		/**
		 *  
		 *  
		 */
		public function getRevBasesTolByLoadID(callback:Function = null, callback2:Function = null):void
		{
			// Get Reverse Base Totals data per transaction.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_REVERSE_BASE_SUM_PER_TRAN'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				
				for each (var o:Object in obj.result)
				{
					// Base totals
					mt_bp_tol_repost +=
					'<BASEPRODTOTAL>' +
					'<TANK_CODE>' 		+ o.TANKCODE_LIST	 		  + '</TANK_CODE>' +
					'<PRODUCT_CODE>' 	+ o.TRSB_BS 				  + '</PRODUCT_CODE>' +
					'<PROD_CLASS>' 		+ o.BCLASS_DESC.toUpperCase() + '</PROD_CLASS>' +
					'<DENS>' 			+ o.AVG_DEN 				  + '</DENS>' +
					'<TEMPERATURE>' 	+ o.AVG_TEMP 				  + '</TEMPERATURE>' +
					'<AMB_VOL>' 		+ -o.SUM_AMB 				  + '</AMB_VOL>' +
					'<COR_VOL>' 		+ -o.SUM_COR 				  + '</COR_VOL>' +
					'<LIQ_KG>' 			+ -o.SUM_KG 				  + '</LIQ_KG>' +
					'<BASE_RATIO>' 		+ '' 						  + '</BASE_RATIO>' +  // Not used in Base Prod Total tab.
					'</BASEPRODTOTAL>';
				}
				
				if (callback)
					callback(callback2);
			});
			
			// The index is fixed as 0 here. As Trip and Load is 1:1.
			call.token = view.manualtransactionsservice.getRevBasesTolByLoadID(trsfs_repost[0].TRSALDID_LOAD_ID, trsfs_repost[0].TRSA_VERSION);
		}
		
		/**
		 *  
		 *  Ver2.3 Added
		 */
		public function getRevMetersTolByLoadID(callback:Function = null):void
		{
			// Get Reverse Meter Totals data per transaction.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_REVERSE_METER_SUM_PER_TRAN'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				
				for each (var o:Object in obj.result)
				{
					// Meter totals
					mt_mtr_tol_repost +=
					'<METERTOTAL>' +
					'<INJECTOR_OR_METER>' 	+ o.INJ_OR_METER + '</INJECTOR_OR_METER>' +
					'<METER_INJECTOR_CODE>' + o.TRSB_METER 	 + '</METER_INJECTOR_CODE>' +
					'<OPEN_AMB>' 			+ o.OPN_AMB 	 + '</OPEN_AMB>' +
					'<OPEN_COR>' 			+ o.OPN_COR 	 + '</OPEN_COR>' +
					'<OPEN_KG>' 			+ o.OPN_KG 		 + '</OPEN_KG>' +
					'<CLOSE_AMB>' 			+ o.CLS_AMB 	 + '</CLOSE_AMB>' +
					'<CLOSE_COR>' 			+ o.CLS_COR 	 + '</CLOSE_COR>' +
					'<CLOSE_KG>' 			+ o.CLS_KG 		 + '</CLOSE_KG>' +
					'</METERTOTAL>';
				}
				
				mt_body_repost = '<MANUALTRANSACTIONDATA_BODY>' +
				'<TRANSFERS>' +
				mt_trsf_repost +
				'</TRANSFERS>' +
				'<BASEPRODTOTALS>' +
				mt_bp_tol_repost +
				'</BASEPRODTOTALS>' +
				'<METERTOTALS>' +
				mt_mtr_tol_repost +
				'</METERTOTALS>' +
				'</MANUALTRANSACTIONDATA_BODY>';
				
				if (callback)
					callback();
				
				//
				// After the cascade calls do the processes below.
				//
				updateStatus();
				DM.ManualTransactions.resetLockAutoPopBM();
				DM.ManualTransactions.resetTransferRowIndex();
				// As Transfer, Base Totals and Meter Totals could all be changed(by loading reversal data), refresh these grid.
				DM.ManualTransactions.transferDataArr.refresh();
				DM.ManualTransactions.baseprodTotalDataArr.refresh();
				DM.ManualTransactions.meterTotalDataArr.refresh();
			});
			
			// The index is fixed as 0 here. As Trip and Load is 1:1.
			call.token = view.manualtransactionsservice.getRevMetersTolByLoadID(trsfs_repost[0].TRSALDID_LOAD_ID, trsfs_repost[0].TRSA_VERSION);
		}
		
		/**
		 *  
		 *  
		 */
		public function genRepostUserData(supp:String, trip_no:String, callback:Function = null):void
		{
			// Get Reverse Transfers data.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_REVERSE_TRSF_DATA_BY_TRIP'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				
				trsfs_repost = new ArrayCollection();
				_transferRowIdx_repost = 0;
				mt_body_repost    = "";
				mt_trsf_repost    = "";
				mt_bp_repost      = "";
				mt_mtr_repost     = "";
				bs_no_repost      = 0;
				mtr_no_repost     = 0;
				mt_bp_tol_repost  = "";
				mt_mtr_tol_repost = "";
				
				// Get transfers count.
				for each (var o:Object in obj.result)
				{
					trsfs_repost.addItem(o);
				}
				_transferRowMax_repost = trsfs_repost.length;
				
				// Retrive each transfer's bases.
				getRevBasesBySuppProd(callback);
			});
			call.token = view.manualtransactionsservice.getRevTrsfBySuppTrip(supp, trip_no);
			
			/* NOTE: HERE IS NOT THE LAST PROCESS OF THIS FUNCTION */
		}
		
		/**
		 *  
		 *  
		 */
		public function reloadUserData():void
		{
			if (xmlBody != null)
			{
				var dmMT:Object         = DM.ManualTransactions.transactionDataArr;
				var dmMT_BP_TOL:Object  = DM.ManualTransactions.baseprodTotalDataArr;
				var dmMT_MTR_TOL:Object = DM.ManualTransactions.meterTotalDataArr;
				var objTrsf:Object;
				var objBp:Object;
				var objMtr:Object;
				var idxTrsf:int         = 0;
				var idxBp:int           = 0;
				var idxMtr:int          = 0;
				var idxBp_tol:int       = 0;
				var idxMtr_tol:int      = 0;
				
				// Ver2.2
				// In the case of 'Generic Carrier' and 'Generic Tanker',
				// and the Supplier company vetting flag is in Vet PrimeMover(1) or Vet Trailer(2) or Vet all(3),
				// transactionDataArr may not be populated.
				// Since 'Generic Carrier' and 'Generic Tanker' can NOT be a selection in MT screen, all the following auto population cancelled.
				// Currently this kind of REPOST is rejected -> no carriers and tankers selected, no transfers displayed in MT screen, you can't submit it.
				if (dmMT == null || (dmMT != null && dmMT.length == 0)) 
					return;
				
				/* Fill in Transfer data */
				for each (var trsf:XML in xmlBody..TRANSFER)
				{
					// Compartment must match.
//					if (dmMT[idxTrsf].transfer.trsf_cmpt_no != Number(trsf.NR_IN_TKR))
//					{
//						idxTrsf++;
//						continue;
//					}
					
					if (isRepost != REPOST_ON)
					{
						// Find the correct compartment to fill data in.
						idxTrsf = 0;
						for (var idx:int = 0; idx < DM.ManualTransactions.transactionDataArr.length; idx++)
						{
							var dmMT1:Object = DM.ManualTransactions.transactionDataArr[idx];
							if (Number(DM.ManualTransactions.transactionDataArr[idx].transfer.trsf_cmpt_no) != Number(trsf.NR_IN_TKR))
							{
								continue;
							}
							else
							{
								// Found
								break;
							}
						}
						idxTrsf = idx;
					}
					
					// Transfer
					dmMT[idxTrsf].transfer.trsf_delv_num           = isNull(String(trsf.DELV_NUM)    ) ? null : String(trsf.DELV_NUM);
					dmMT[idxTrsf].transfer.trsf_arm_cd             = isNull(String(trsf.ARM_CODE)    ) ? null : String(trsf.ARM_CODE);
					dmMT[idxTrsf].transfer.trsf_cmpt_no            = isNull(String(trsf.NR_IN_TKR)   ) ? null : String(trsf.NR_IN_TKR);
					dmMT[idxTrsf].transfer.trsf_drwr_cd            = isNull(String(trsf.DRAWER_CODE) ) ? null : String(trsf.DRAWER_CODE);
					dmMT[idxTrsf].transfer.trsf_drwr_prod_cd       = isNull(String(trsf.PRODUCT_CODE)) ? null : String(trsf.PRODUCT_CODE);
					dmMT[idxTrsf].transfer.trsf_density            = isNull(String(trsf.DENS)        ) ? null : Number(String(trsf.DENS));
					dmMT[idxTrsf].transfer.trsf_temp               = isNull(String(trsf.TEMPERATURE) ) ? null : Number(String(trsf.TEMPERATURE));
					dmMT[idxTrsf].transfer.trsf_qty_amb            = isNull(String(trsf.AMB_VOL)     ) ? null : Number(String(trsf.AMB_VOL));
					dmMT[idxTrsf].transfer.trsf_qty_cor            = isNull(String(trsf.COR_VOL)     ) ? null : Number(String(trsf.COR_VOL));
					dmMT[idxTrsf].transfer.trsf_load_kg            = isNull(String(trsf.LIQ_KG)      ) ? null : Number(String(trsf.LIQ_KG));
					dmMT[idxTrsf].transfer.trsf_equip_id           = isNull(String(trsf.EQUIPMENT_ID)) ? null : String(trsf.EQUIPMENT_ID);
					dmMT[idxTrsf].transfer.trsf_drwr_prod_plan_qty = isNull(String(trsf.PLANNED_QTY) ) ? null : Number(String(trsf.PLANNED_QTY));
					
					// Base Prod
					// Simulate user click operation to populate Base Prod automatically.
//					view.transferDetailsGrid.selectedIndex = idxTrsf;
//					dataGrid_changeHandler(null);
					
					// At this stage, Base Prod and Meter have NOT been populated.
					idxBp = 0;
					for each (var bp:XML in trsf..BASEPROD)
					{
						// Create one Base Prod.
						dmMT[idxTrsf].baseprod.addItem(new Object());
						
						dmMT[idxTrsf].baseprod[idxBp].trsf_bs_prodcd  = isNull(String(bp.PRODUCT_CODE)) ? null : String(bp.PRODUCT_CODE);
						dmMT[idxTrsf].baseprod[idxBp].trsf_bs_tk_cd   = isNull(String(bp.TANK_CODE)   ) ? null : String(bp.TANK_CODE);
						dmMT[idxTrsf].baseprod[idxBp].trsf_bs_prodcls = isNull(String(bp.PROD_CLASS)  ) ? null : String(bp.PROD_CLASS);
						dmMT[idxTrsf].baseprod[idxBp].trsf_bs_den     = isNull(String(bp.DENS)        ) ? null : Number(String(bp.DENS));
						dmMT[idxTrsf].baseprod[idxBp].trsf_bs_temp    = isNull(String(bp.TEMPERATURE) ) ? null : Number(String(bp.TEMPERATURE));
						dmMT[idxTrsf].baseprod[idxBp].trsf_bs_qty_amb = isNull(String(bp.AMB_VOL)     ) ? null : Number(String(bp.AMB_VOL));
						dmMT[idxTrsf].baseprod[idxBp].trsf_bs_qty_cor = isNull(String(bp.COR_VOL)     ) ? null : Number(String(bp.COR_VOL));
						dmMT[idxTrsf].baseprod[idxBp].trsf_bs_load_kg = isNull(String(bp.LIQ_KG)      ) ? null : Number(String(bp.LIQ_KG));
						dmMT[idxTrsf].baseprod[idxBp].trsf_bs_ratio   = isNull(String(bp.BASE_RATIO)  ) ? null : Number(String(bp.BASE_RATIO));  // only used for GUI calculation.
						
						idxBp++;
					}
					
					// Meter
					idxMtr = 0;
					for each (var mtr:XML in trsf..METER)
					{
						// Create one Meter.
						dmMT[idxTrsf].meter.addItem(new Object());
						
						dmMT[idxTrsf].meter[idxMtr].trsf_mtr_cd       = isNull(String(mtr.METER_INJECTOR_CODE)) ? null : String(mtr.METER_INJECTOR_CODE);
						dmMT[idxTrsf].meter[idxMtr].trsf_mtr_typ      = isNull(String(mtr.INJECTOR_OR_METER)  ) ? null : String(mtr.INJECTOR_OR_METER);
						dmMT[idxTrsf].meter[idxMtr].trsf_mtr_opn_amb  = isNull(String(mtr.OPEN_AMB)           ) ? null : Number(String(mtr.OPEN_AMB));
						dmMT[idxTrsf].meter[idxMtr].trsf_mtr_cls_amb  = isNull(String(mtr.CLOSE_AMB)          ) ? null : Number(String(mtr.CLOSE_AMB));
						dmMT[idxTrsf].meter[idxMtr].trsf_mtr_opn_cor  = isNull(String(mtr.OPEN_COR)           ) ? null : Number(String(mtr.OPEN_COR));
						dmMT[idxTrsf].meter[idxMtr].trsf_mtr_cls_cor  = isNull(String(mtr.CLOSE_COR)          ) ? null : Number(String(mtr.CLOSE_COR));
						dmMT[idxTrsf].meter[idxMtr].trsf_mtr_open_kg  = isNull(String(mtr.OPEN_KG)            ) ? null : Number(String(mtr.OPEN_KG));
						dmMT[idxTrsf].meter[idxMtr].trsf_mtr_close_kg = isNull(String(mtr.CLOSE_KG)           ) ? null : Number(String(mtr.CLOSE_KG));
						
						idxMtr++;
					}
					
					var oTmp:Object = DM.ManualTransactions.transferDataArr;
					oTmp = oTmp;
					
					if (isRepost == REPOST_ON)
					{
						// For REPOST, fill in each compartment created in initializeTransfer_repost().
						// No need to find matched compartment id, load every compartment data in xml object.
						idxTrsf++;
					}
				}
				
				/* Fill in Base Prod Total data */
				for each (var bp_tol:XML in xmlBody..BASEPRODTOTAL)
				{
					// Create one Base Prod Total.
					dmMT_BP_TOL.addItem(new Object());
					
					dmMT_BP_TOL[idxBp_tol].trsf_bs_prodcd  = isNull(String(bp_tol.PRODUCT_CODE)) ? null : String(bp_tol.PRODUCT_CODE);
					dmMT_BP_TOL[idxBp_tol].trsf_bs_tk_cd   = isNull(String(bp_tol.TANK_CODE)   ) ? null : String(bp_tol.TANK_CODE);
					dmMT_BP_TOL[idxBp_tol].trsf_bs_prodcls = isNull(String(bp_tol.PROD_CLASS)  ) ? null : String(bp_tol.PROD_CLASS);
					dmMT_BP_TOL[idxBp_tol].trsf_bs_den     = isNull(String(bp_tol.DENS)        ) ? null : Number(String(bp_tol.DENS));
					dmMT_BP_TOL[idxBp_tol].trsf_bs_temp    = isNull(String(bp_tol.TEMPERATURE) ) ? null : Number(String(bp_tol.TEMPERATURE));
					dmMT_BP_TOL[idxBp_tol].trsf_bs_qty_amb = isNull(String(bp_tol.AMB_VOL)     ) ? null : Number(String(bp_tol.AMB_VOL));
					dmMT_BP_TOL[idxBp_tol].trsf_bs_qty_cor = isNull(String(bp_tol.COR_VOL)     ) ? null : Number(String(bp_tol.COR_VOL));
					dmMT_BP_TOL[idxBp_tol].trsf_bs_load_kg = isNull(String(bp_tol.LIQ_KG)      ) ? null : Number(String(bp_tol.LIQ_KG));
					dmMT_BP_TOL[idxBp_tol].trsf_bs_ratio   = isNull(String(bp_tol.BASE_RATIO)  ) ? null : Number(String(bp_tol.BASE_RATIO));  // Not used.
					
					idxBp_tol++;
				}
				
				/* Fill in Meter Total data */
				for each (var mtr_tol:XML in xmlBody..METERTOTAL)
				{
					// Create one Meter Total.
					dmMT_MTR_TOL.addItem(new Object());
					
					dmMT_MTR_TOL[idxMtr_tol].trsf_mtr_cd       = isNull(String(mtr_tol.METER_INJECTOR_CODE)) ? null : String(mtr_tol.METER_INJECTOR_CODE);
					dmMT_MTR_TOL[idxMtr_tol].trsf_mtr_typ      = isNull(String(mtr_tol.INJECTOR_OR_METER)  ) ? null : String(mtr_tol.INJECTOR_OR_METER);
					dmMT_MTR_TOL[idxMtr_tol].trsf_mtr_opn_amb  = isNull(String(mtr_tol.OPEN_AMB)           ) ? null : Number(String(mtr_tol.OPEN_AMB));
					dmMT_MTR_TOL[idxMtr_tol].trsf_mtr_cls_amb  = isNull(String(mtr_tol.CLOSE_AMB)          ) ? null : Number(String(mtr_tol.CLOSE_AMB));
					dmMT_MTR_TOL[idxMtr_tol].trsf_mtr_opn_cor  = isNull(String(mtr_tol.OPEN_COR)           ) ? null : Number(String(mtr_tol.OPEN_COR));
					dmMT_MTR_TOL[idxMtr_tol].trsf_mtr_cls_cor  = isNull(String(mtr_tol.CLOSE_COR)          ) ? null : Number(String(mtr_tol.CLOSE_COR));
					dmMT_MTR_TOL[idxMtr_tol].trsf_mtr_open_kg  = isNull(String(mtr_tol.OPEN_KG)            ) ? null : Number(String(mtr_tol.OPEN_KG));
					dmMT_MTR_TOL[idxMtr_tol].trsf_mtr_close_kg = isNull(String(mtr_tol.CLOSE_KG)           ) ? null : Number(String(mtr_tol.CLOSE_KG));
					
					idxMtr_tol++;
				}
				
				if (load_mode == LM_SAVED)
				{
					global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SUCCEED_LOAD_MT_DATA_SAVED'));
				}
				else
				{
					global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SUCCEED_LOAD_MT_DATA'));
				}
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function getSchdTypeBySuppTrip(supp:String, trip_no:String, callback:Function = null):void
		{
			// Get current schedule type.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_SCHD_TYPE_BY_TRIP'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				for each (var oSrc:Object in obj.result)
				{
					if (oSrc.LD_TYPE.toUpperCase()      == "PRESCHEDULE")
					{
						DM.ManualTransactions.schedule_type = "BY_COMPARTMENT";
						DM.ManualTransactions.schedule_sub_type = "";
					}
					else if (oSrc.LD_TYPE.toUpperCase() == "PREORDER")
					{
						DM.ManualTransactions.schedule_type = "BY_PRODUCT";
						DM.ManualTransactions.schedule_sub_type = "";
					}
					else if (oSrc.LD_TYPE.toUpperCase() == "CUSTOMERORDER")
					{
						DM.ManualTransactions.schedule_type = "BY_OPENORDER";
						DM.ManualTransactions.schedule_sub_type = "";
					}
					else if (oSrc.LD_TYPE.toUpperCase() == "PREORDER_SUB1")
					{
						DM.ManualTransactions.schedule_type = "BY_PRODUCT";
						DM.ManualTransactions.schedule_sub_type = "SUB1"; // PreOrder && Carrier or Tanker is GENERIC
					}
					else
						DM.ManualTransactions.schedule_type = "UNKNOWN";
					
					// Also get schedule status. User can only change the Carrier and/or Tanker if its a NEW SCHEDULE.
					DM.ManualTransactions.schedule_stat = oSrc.STATUS;
					
					// Also get schedule drawer cmpy. For Base total and Meter total display usage. // Ver2.9
					DM.ManualTransactions.trans_drawer_cmpy = oSrc.DRAWER_CODE;
					
					break;
				}
				
				changeItemsVisibility();
				
				if (callback != null)
					callback();
			});
			call.token = view.manualtransactionsservice.getSchdTypeBySuppTrip(supp, trip_no);
		}

		/**
		 *  
		 *  
		 */
		public function getDrawerProdSchdByProd(supp:String, trip_no:String, callback:Function = null):void
		{
			// Get prod list of by prod.
			var call:CallResponder = new CallResponder()
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_DRWR_PROD_BY_TRIP'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				DM.ManualTransactions.schdbyprodlist = new ArrayCollection();
				for each (var oSrc:Object in obj.result)
				{
					DM.ManualTransactions.schdbyprodlist.addItem(
						{
							CODE_NAME    : oSrc.PROD_CODE + '-' + oSrc.PROD_NAME + ' (Planned:' + oSrc.SCHP_SPECQTY + ' | Loaded:' + oSrc.QTY_LOADED + ' | ' + oSrc.UNIT_NAME.toUpperCase() + ')',
							PROD_CODE    : oSrc.PROD_CODE,
							PROD_NAME    : oSrc.PROD_NAME,
							PROD_CMPY    : oSrc.PROD_CMPY,
							SCHP_SPECQTY : oSrc.SCHP_SPECQTY,
							QTY_LOADED   : oSrc.QTY_LOADED
						});
				}
				
				if (callback != null)
					callback();
			});
			call.token = view.manualtransactionsservice.getDrawerProdSchdByProd(supp, trip_no);
		}

		/**
		 *  Get the current trip's carrier.
		 *  
		 */
		// Ver2.5 Added
		public function getSpecifiedCarrierBySuppTrip(supp:String, trip_no:String, callback:Function = null):void
		{
			// Refresh Carrier, Tanker, Drawer and Drawer Products list.
			//replace amf ASYNC call DM.ManualTransactions.getCarriersBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
			
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_CARR_BY_TRIP'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				
				// Ver2.5 Added
				DM.ManualTransactions.non_oo_carrier = ""; // It should already be reset in resetSettingsByLevel().
				for each (var o:Object in obj.result)
				{
					DM.ManualTransactions.non_oo_carrier = o.CMPY_CODE;
				}
				
				if (callback != null)
					callback();
			});
			call.token = view.manualtransactionsservice.getCarriersBySuppTrip(supp, trip_no);
		}
		
		/**
		 *  
		 *  
		 */
		public function getCarriersBySuppTrip(supp:String, trip_no:String, schd_type:String, schd_stat:String, callback:Function = null):void
		{
			// Refresh Carrier, Tanker, Drawer and Drawer Products list.
			//replace amf ASYNC call DM.ManualTransactions.getCarriersBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
			
			// Ver2.5 added parameter - schd_type and schd_stat
			// For preorder, user should be able to see all carriers like open order if NO MT has been done. (New Schedule)
			if (schd_type == "BY_PRODUCT" && schd_stat == "F")
			{
				var call:CallResponder = new CallResponder();
				call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_ALL_CARR'));});
				call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
					DM.ManualTransactions.carriers = new ArrayCollection();
					//DM.ManualTransactions.carriers.addItem({CMPY_CODE:"ANY", CMPY_NAME:"ALL"});
					DM.ManualTransactions.carriers.addItem({CMPY_CODE:"ANY", CMPY_NAME:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.global.lbl.ALL')});
					for each (var o:Object in obj.result)
					{
						DM.ManualTransactions.carriers.addItem(o);
					}
					for each (var o:Object in DM.ManualTransactions.carriers)
					{
						o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
					}
					
					// Set default selected Carrier.
					view.new_carrier.selectedIndex = DM.ManualTransactions.getSelectedCarrier(DM.ManualTransactions.non_oo_carrier); // Ver2.5
					
					// Ver2.6 added [S]
					if (view.new_carrier.selectedIndex > -1)
					{
						
						// If Carrier changed, auto update Tanker contents.
						new_carrier_changeHandler(null, callback);
					}
					else
					// Ver2.6 added [E]
					{
						if (callback != null)
							callback();
					}
				});
				call.token = view.manualtransactionsservice.getAllCarriers();
			}
			else
			{
				var call:CallResponder = new CallResponder();
				call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_CARR_BY_TRIP'));});
				call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
					DM.ManualTransactions.carriers = new ArrayCollection();
					//DM.ManualTransactions.carriers.addItem({CMPY_CODE:"ANY", CMPY_NAME:"ALL"});
					DM.ManualTransactions.carriers.addItem({CMPY_CODE:"ANY", CMPY_NAME:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.global.lbl.ALL')});
					for each (var o:Object in obj.result)
					{
						DM.ManualTransactions.carriers.addItem(o);
					}
					for each (var o:Object in DM.ManualTransactions.carriers)
					{
						o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
					}
					
					// Set default selected Carrier.
					view.new_carrier.selectedIndex = DM.ManualTransactions.getDefaultCarrier();
					if (view.new_carrier.selectedIndex == -1)
						view.new_carrier.selectedIndex = DM.ManualTransactions.getSelectedCarrier(DM.ManualTransactions.non_oo_carrier); // Ver2.6
					
					if (callback != null)
						callback();
				});
				call.token = view.manualtransactionsservice.getCarriersBySuppTrip(supp, trip_no);
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function getTankersBySuppTrip(supp:String, trip_no:String, callback:Function = null):void
		{
			// Get tankers by supplier and trip.
			// replace amf ASYNC call DM.ManualTransactions.getTankersBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_TNKR_BY_TRIP'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				
				if (DM.ManualTransactions.tankers != null && DM.ManualTransactions.tankers.length >= 0 && obj.result.length != 0)  // Ver2.6 added condition. Basically this case is hardly exec.
				{
					DM.ManualTransactions.tankers = new ArrayCollection();
					for each (var o:Object in obj.result)
					{
						DM.ManualTransactions.tankers.addItem(o);  // Normally it is just 1 record.
					}
				}
				
				// Get the tanker code according to supp+trip no.
				for each (var o:Object in obj.result)
				{
					DM.ManualTransactions.tanker = o.TNKR_CODE; // Ver2.6 supp+trip no ==> tanker  Normally it is just 1 record.
				}
				
				// Set default selected Tanker.
				view.new_tanker.selectedIndex = DM.ManualTransactions.getSelectedTanker(DM.ManualTransactions.tanker);
				
				// Refresh Equipment & Compartment list contents.
				if (view.new_tanker.selectedIndex > -1)
				{
					// Level 1
					// replace amf ASYNC call DM.ManualTransactions.getCompartment(view.new_tanker.selectedItem.TNKR_CODE);
					getCompartment(view.new_tanker.selectedItem.TNKR_CODE, function():void{
						
						// Level 2 - callback
						// replace amf ASYNC call DM.ManualTransactions.getEquipment(view.new_tanker.selectedItem.TNKR_CODE);
						getEquipment(view.new_tanker.selectedItem.TNKR_CODE, function():void{
						
							// Level 3 - callback
							if (callback != null)
								callback();
						});
					
					});
				}
				else
				{
					if (callback != null)
						callback();
				}
			});	
			call.token = view.manualtransactionsservice.getTankersBySuppTrip(supp, trip_no);
		}
		
		/**
		 *  
		 *  
		 */
		public function getEquipment(tanker:String, callback:Function = null):void
		{
			// Get Equipments by tanker.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_EQPT_BY_TNKR'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				// ver 1.6 if (!DM.ManualTransactions.equipments) // Prevent the Equipments list from refreshing.
					DM.ManualTransactions.equipments = new ArrayCollection();
				for each (var o:Object in obj.result)
				{
					DM.ManualTransactions.equipments.addItem(o);
				}
				
				if (callback != null)
					callback();
			});	
			call.token = view.manualtransactionsservice.getEquipmentsByTanker(tanker);
		}
		
		/**
		 *  
		 *  
		 */
		public function getCompartment(tanker:String, callback:Function = null):void
		{
			// Get Compartments by tanker.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_CMPT_BY_TNKR'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				// ver 1.6 if (!DM.ManualTransactions.compartments) // Prevent the Compartment list from refreshing.
				DM.ManualTransactions.compartments = new ArrayCollection();
				for each (var o:Object in obj.result)
				{
					DM.ManualTransactions.compartments.addItem(o);
				}
				
				if (callback != null)
					callback();
			});
			call.token = view.manualtransactionsservice.getCompartmentsByTanker(tanker);
		}
		
		/**
		 *  Get PreOrder details by different tanker.
		 *  As for PreOrder user can select different tanker as Open Order.
		 *  
		 */
		// Ver2.5 Added
		public function getPreOrderDetailsByTanker(supp:String, trip_no:String, tanker:String, callback:Function = null):void
		{
			// Get preorder details.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_PREORDER_BY_TNKR'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				DM.ManualTransactions.scheduleDetailsArr = new ArrayCollection();
				for each (var o:Object in obj.result)
				{
					DM.ManualTransactions.scheduleDetailsArr.addItem(o);
				}
				
				if (callback != null)
					callback();
			});
			call.token = view.manualtransactionsservice.getPreOrderDetailsByTanker(supp, trip_no, tanker);
		}
		
		/**
		 *  
		 *  
		 */
		public function getOrderDetailsByTanker(supp:String, order_no:String, tanker:String, callback:Function = null):void
		{
			// Get default order details.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_ORDER_BY_TNKR'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				DM.ManualTransactions.scheduleDetailsArr = new ArrayCollection();
				for each (var o:Object in obj.result)
				{
					DM.ManualTransactions.scheduleDetailsArr.addItem(o);
					
					// Also get schedule drawer cmpy. For Base total and Meter total display usage. // Ver2.9
					DM.ManualTransactions.trans_drawer_cmpy = o.SHLS_SUPP;
				}
				
				if (callback != null)
					callback();
			});
			call.token = view.manualtransactionsservice.getOrderDetailsByTanker(supp, order_no, tanker);
		}
		
		/**
		 *  
		 *  
		 */
		public function getScheduleDetailsBySuppTrip(supp:String, trip_no:String, callback:Function = null):void
		{
			// Get default schedule details list.
			if (!(DM.ManualTransactions.schedule_type == "BY_PRODUCT" && DM.ManualTransactions.schedule_sub_type == "SUB1"))
			{
				var call:CallResponder = new CallResponder();
				call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_SCHD_BY_SUPP_TRIP'));});
				call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
					DM.ManualTransactions.scheduleDetailsArr = new ArrayCollection();
					for each (var o:Object in obj.result)
					{
						DM.ManualTransactions.scheduleDetailsArr.addItem(o);
					}
					
					if (callback != null)
						callback();
				});
				call.token = view.manualtransactionsservice.getScheduleDetailsBySuppTrip(supp, trip_no);
			}
			else // Schedule type is PreOrder and Carrier is Generic Carrier.
			{
				// Don't populate the schedule details at the moment.
				// Let user select Carrier and Tanker, after Tanker selected populate details in Tanker change event.
				
				if (callback != null)
					callback();
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function getScheduleDetailsBySuppTrip_sub1(supp:String, trip_no:String, tanker:String, callback:Function = null):void
		{
			// Get default schedule details list.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_SCHD_BY_SUPP_TRIP_TNKR'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				DM.ManualTransactions.scheduleDetailsArr = new ArrayCollection();
				for each (var o:Object in obj.result)
				{
					DM.ManualTransactions.scheduleDetailsArr.addItem(o);
				}
				
				if (callback != null)
					callback();
			});
			call.token = view.manualtransactionsservice.getScheduleDetailsBySuppTrip_sub1(supp, trip_no, tanker);
		}
		
		/**
		 *  
		 *  
		 */
		public function getTanker(carrier:String, callback:Function = null):void
		{
			// Get tanker by carrier.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_TNKR_BY_CARR'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				DM.ManualTransactions.tankers = new ArrayCollection();
				for each (var o:Object in obj.result)
				{
					DM.ManualTransactions.tankers.addItem(o);
				}
				
				view.new_tanker.selectedIndex = DM.ManualTransactions.getDefaultTanker();
				
				if (callback != null)
					callback();
			});
			call.token = view.manualtransactionsservice.getTankerByCarrier(carrier);
		}
		
		/**
		 *  
		 *  
		 */
		public function getTanker_OO(carrier:String, callback:Function = null):void
		{
			// Get tanker by carrier.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_TNKR_BY_CARR'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				DM.ManualTransactions.tankers = new ArrayCollection();
				for each (var o:Object in obj.result)
				{
					DM.ManualTransactions.tankers.addItem(o);
				}
				
				if (callback != null)
					callback();
			});
			call.token = view.manualtransactionsservice.getTankerByCarrier_OO(carrier);
		}
		
		/**
		 *  
		 *  
		 */
		public function getAllCarriers(callback:Function = null, callback2:Function = null):void
		{
			// Get tanker by carrier.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_ALL_CARR'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				DM.ManualTransactions.carriers = new ArrayCollection();
				//DM.ManualTransactions.carriers.addItem({CMPY_CODE:"ANY", CMPY_NAME:"ALL"});
				DM.ManualTransactions.carriers.addItem({CMPY_CODE:"ANY", CMPY_NAME:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.global.lbl.ALL')});
				for each (var o:Object in obj.result)
				{
					DM.ManualTransactions.carriers.addItem(o);
				}
				for each (var o:Object in DM.ManualTransactions.carriers)
				{
					o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
				}
				
				// Set default selected Carrier.
				view.new_carrier.selectedIndex = DM.ManualTransactions.getDefaultCarrier();
				
				if (callback != null)
					callback(callback2);
				
			});
			call.token = view.manualtransactionsservice.getAllCarriers();
		}

		/**
		 *  
		 *  
		 */
		// Ver2.5 Added
		public function getAllCarriers_OO(callback:Function = null, callback2:Function = null):void
		{
			// Get tanker by carrier.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_ALL_CARR_BY_OO'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				DM.ManualTransactions.carriers = new ArrayCollection();
				//DM.ManualTransactions.carriers.addItem({CMPY_CODE:"ANY", CMPY_NAME:"ALL"});
				DM.ManualTransactions.carriers.addItem({CMPY_CODE:"ANY", CMPY_NAME:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.global.lbl.ALL')});
				for each (var o:Object in obj.result)
				{
					DM.ManualTransactions.carriers.addItem(o);
				}
				for each (var o:Object in DM.ManualTransactions.carriers)
				{
					o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
				}
				
				// Set selected Carrier.
				view.new_carrier.selectedIndex = DM.ManualTransactions.getSelectedCarrier(DM.ManualTransactions.oo_carrier);
				
				if (callback != null)
					callback(callback2);
				
			});
			call.token = view.manualtransactionsservice.getAllCarriers();
		}
		
		/**
		 *  
		 *  
		 */
		public function getCarriersByOpenOrder(order_no:String, callback:Function = null):void
		{
			// Get carrier by openorder.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_CARR_BY_OO'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				
				/* Ver2.5 Commented out.
				DM.ManualTransactions.carriers = new ArrayCollection();
				for each (var o:Object in obj.result)
				{
					DM.ManualTransactions.carriers.addItem(o);
				}
				
				for each (var o:Object in DM.ManualTransactions.carriers)
				{
					o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
				}
				*/
				
				// Ver2.5 Added
				DM.ManualTransactions.oo_carrier = "";  // It should already be reset in resetSettingsByLevel().
				for each (var o:Object in obj.result)
				{
					DM.ManualTransactions.oo_carrier = o.CMPY_CODE;
				}
				
				if (callback != null)
					callback();
			});
			call.token = view.manualtransactionsservice.getCarriersByOpenOrder(order_no);
		}

		/**
		 *  
		 *  
		 */
		public function getOrderProductsByCustOrderNo(order_no:String, callback:Function = null):void
		{
			// Get Order Prod by Order No.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_ORDPROD_BY_OO'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				DM.ManualTransactions.schdbyprodlist = new ArrayCollection();
				for each (var o:Object in obj.result)
				{
					DM.ManualTransactions.schdbyprodlist.addItem(o);
				}
				
				for each (var o:Object in DM.ManualTransactions.schdbyprodlist)
				{
					o.CODE_NAME = o.PROD_CODE + '-' + o.PROD_NAME + ' (Planned:' + o.SCHP_SPECQTY + ' | Loaded:' + o.QTY_LOADED + ' | ' + o.UNIT_NAME + ')';
				}
				
				if (callback != null)
					callback();
			});
			call.token = view.manualtransactionsservice.getOrderProductsByCustOrderNo(order_no);
		}
		
		/**
		 *  
		 *  
		 */
		public function getAdditionalInfoByCustOrderNo(order_no:String, callback:Function = null):void
		{
			// Get additional Order Info by Order No.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_ORDINFO_BY_OO'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				for each (var o:Object in obj.result)
				{
					view.new_customer_cd.text = o.CUSTOMER_CODE;
					view.new_delv_loc.text = o.DELIVERY_LOCATION;
					view.new_delv_num.text = o.DELIVERY_NUMBER
					break;
				}

				if (callback != null)
					callback();
			});
			call.token = view.manualtransactionsservice.getAdditionalInfoByOpenOrder(order_no);
		}
		
		/**
		 *  
		 *  
		 */
		public function getDriverCodeBySuppDrawer(supplier:String, drawer:String, callback:Function = null):void
		{
			// Get additional Order Info by Order No.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_DRIVER_BY_SUPP_DRWR'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				DM.ManualTransactions.operators = new ArrayCollection();
				for each (var o:Object in obj.result)
				{
					DM.ManualTransactions.operators.addItem(o);
				}
				
				DM.ManualTransactions.setDefaultUser();
				
				if (callback != null)
					callback();
			});
			call.token = view.manualtransactionsservice.getDriverCodeBySuppDrawer(supplier, drawer);
		}
		
		/**
		 *  
		 *  
		 */
		public function getDriversBySuppDrawer(callback:Function = null):void
		{
			// Populate Driver list.
			if (DM.ManualTransactions.scheduleDetailsArr && DM.ManualTransactions.scheduleDetailsArr.length > 0)
			{
				trace("getDriversBySuppDrawer()");
				for each (var oSrc:Object in DM.ManualTransactions.scheduleDetailsArr)
				{
					// Only need to get the drawer from the schedule item(compartment) which has supplier filled. 
					if (oSrc.SHLS_SUPP == null)
					{
						continue;
					}
					getDriverCodeBySuppDrawer(oSrc.SHLS_SUPP/*Supplier*/, oSrc.SHLS_SUPP/*Drawer. Here use SHL_SUPP as drawer.*/, callback);
					break;
				}
			}
		}

		/**
		 *  
		 *  
		 */
		public function getTripNumber(type:String, companyCode:String, callback:Function = null):void
		{
			// Get additional Order Info by Order No.
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_TRIPS_BY_SUPP'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				DM.ManualTransactions.trips = new ArrayCollection();
				for each (var o:Object in obj.result)
				{
					DM.ManualTransactions.trips.addItem(o);
				}
				
				if (callback != null)
					callback();
			});
			call.token = view.manualtransactionsservice.getTripNumberBySupplier(type, companyCode);
		}

/* NESTED
				public function new_trip_changeHandler(event:IndexChangeEvent, callback:Function = null):void
				{
					trace("new_trip -> "+view.new_trip.selectedIndex)
					if (view.new_trip.selectedIndex >= 0)
					{
						clearTextInput_OO();
						
						// Level 1
						// Get current schedule type.
						var call:CallResponder = new CallResponder()
						call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.STH_WRONG'));});
						call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
							for each (var oSrc:Object in obj.result)
							{
								if (oSrc.LD_TYPE.toUpperCase()      == "PRESCHEDULE")
									DM.ManualTransactions.schedule_type = "BY_COMPARTMENT";
								else if (oSrc.LD_TYPE.toUpperCase() == "PREORDER")
									DM.ManualTransactions.schedule_type = "BY_PRODUCT";
								else if (oSrc.LD_TYPE.toUpperCase() == "CUSTOMERORDER")
									DM.ManualTransactions.schedule_type = "BY_OPENORDER";
								else
									DM.ManualTransactions.schedule_type = "UNKNOWN";
								break;
							}
							
							changeItemsVisibility();
							
							// Level 2 - callback
							// Get prod list of by prod
							var call:CallResponder = new CallResponder()
							call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.STH_WRONG'));});
							call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
								DM.ManualTransactions.schdbyprodlist = new ArrayCollection();
								for each (var oSrc:Object in obj.result)
								{
									DM.ManualTransactions.schdbyprodlist.addItem(
										{
											CODE_NAME    : oSrc.PROD_CODE + '-' + oSrc.PROD_NAME + ' (Planned:' + oSrc.SCHP_SPECQTY + ' | Loaded:' + oSrc.QTY_LOADED + ' | ' + oSrc.UNIT_NAME + ')',
											PROD_CODE    : oSrc.PROD_CODE,
											PROD_NAME    : oSrc.PROD_NAME,
											PROD_CMPY    : oSrc.PROD_CMPY,
											SCHP_SPECQTY : oSrc.SCHP_SPECQTY,
											QTY_LOADED   : oSrc.QTY_LOADED
										});
								}
								
								
								// Level 3 - callback
								// Refresh Carrier, Tanker, Drawer and Drawer Products list.
								var temp : ArrayCollection = new ArrayCollection();
								
								DM.ManualTransactions.view = view;
								//replace amf ASYNC call DM.ManualTransactions.getCarriersBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
								var call:CallResponder = new CallResponder();
								var oDst:Object;
								call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_OO_BY_CUST'));});
								call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
									DM.ManualTransactions.carriers = new ArrayCollection();
									for each (var o:Object in obj.result)
									{
										DM.ManualTransactions.carriers.addItem(o);
									}
									for each (var o:Object in DM.ManualTransactions.carriers)
									{
										o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
									}
									
									// Set default selected Carrier.
									view.new_carrier.selectedIndex = DM.ManualTransactions.getDefaultCarrier();
									
									// Level 4 - callback
									//replace amf ASYNC call DM.ManualTransactions.getTankersBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
									var call:CallResponder = new CallResponder();
									var oDst:Object;
									call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_OO_BY_CUST'));});
									call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
										DM.ManualTransactions.tankers = new ArrayCollection();
										for each (var o:Object in obj.result)
										{
											DM.ManualTransactions.tankers.addItem(o);
										}
										
										// Set default selected Tanker.
										view.new_tanker.selectedIndex = DM.ManualTransactions.getDefaultTanker();
										
										// Refresh Equipment & Compartment list contents.
										if (view.new_tanker.selectedIndex > -1)
										{
											DM.ManualTransactions.getCompartment(view.new_tanker.selectedItem.TNKR_CODE);
											DM.ManualTransactions.getEquipment(view.new_tanker.selectedItem.TNKR_CODE);
										}
										
										
										// Level 5 - callback
										// no need to do DM.ManualTransactions.getDrawersBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
										// no need to do DM.ManualTransactions.getDrawerProductsBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
										DM.ManualTransactions.getScheduleDetailsBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
										
										updateStatus();
										DM.ManualTransactions.resetLockAutoPopBM();
										DM.ManualTransactions.resetTransferRowIndex();
										
										
									});	
									call.token = view.manualtransactionsservice.getTankersBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
									
								});
								call.token = view.manualtransactionsservice.getCarriersBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE,view.new_trip.selectedItem.SHLS_TRIP_NO);
								
							});
							call.token = view.manualtransactionsservice.getDrawerProdSchdByProd(view.new_supplier.selectedItem.CMPY_CODE, view.new_trip.selectedItem.SHLS_TRIP_NO);
							
						});
						call.token = view.manualtransactionsservice.getSchdTypeBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE, view.new_trip.selectedItem.SHLS_TRIP_NO);				
					}
				}
*/
		
		/**
		 *  
		 *  
		 */
		public function changeItemsVisibility():void
		{
			if ( view.new_trans_type.selectedIndex>-1 && (view.new_trans_type.selectedItem.id == 'S' || view.new_trans_type.selectedItem.id == 'N') )
			{
				if (DM.ManualTransactions.schedule_type == "BY_PRODUCT")
				{
					view.lbl_new_customer_cd.visible = true;
					view.new_customer_cd.visible = true;
					// Show "Delivery Number" and "Delivery Location" fields.
					view.lbl_new_delv_num.visible = true;
					view.new_delv_num.visible = true;
					view.lbl_new_delv_loc.visible = true;
					view.new_delv_loc.visible = true;
					
					// Hide "Delivery Number", "Delivery Location", "Planned" and "Loaded" columns if schedule by product.
					view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_SOLD_TO).visible  = false;
					view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_DELV_NUM).visible = false;
					view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_DELV_LOC).visible = false;
					view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_QTY_PLAN).visible = false;
					view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_QTY_LOAD).visible = false;
					
					// Change the column length of Drawer Prod.
					view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_PROD_CODE).width = 360;
					// Change the editability of the column "Delivery Number"
					view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_DELV_NUM).editable = false;
				}
				else
				{
					view.lbl_new_customer_cd.visible = false;
					view.new_customer_cd.visible = false;
					// Hide "Delivery Location" and "Delivery Number" fields.
					view.lbl_new_delv_num.visible = false;
					view.new_delv_num.visible = false;
					view.lbl_new_delv_loc.visible = false;
					view.new_delv_loc.visible = false;
					
					// Show "Delivery Number", "Delivery Location", "Planned" and "Loaded" columns if schedule by compartment.
					view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_SOLD_TO).visible  = true;
					view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_DELV_NUM).visible = true;
					view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_DELV_LOC).visible = true;
					view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_QTY_PLAN).visible = true;
					view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_QTY_LOAD).visible = true;
					
					// Change the column length of Drawer Prod.
					view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_PROD_CODE).width = 160;
					// Change the editability of the column "Delivery Number"
					view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_DELV_NUM).editable = false;
				}
				
			}
			else
			{
				view.lbl_new_customer_cd.visible = true;
				view.new_customer_cd.visible = true;
				// Show "Delivery Number" and "Delivery Location" fields.
				view.lbl_new_delv_num.visible = false;
				view.new_delv_num.visible = false;
				view.lbl_new_delv_loc.visible = true;
				view.new_delv_loc.visible = true;
				
				// Hide "Delivery Number", "Delivery Location", "Planned" and "Loaded" columns if schedule by product.
				view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_SOLD_TO).visible  = false;
				view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_DELV_NUM).visible = true;
				view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_DELV_LOC).visible = false;
				view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_QTY_PLAN).visible = false;
				view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_QTY_LOAD).visible = false;
				
				// Change the column length of Drawer Prod.
				view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_PROD_CODE).width = 360;
				// Change the editability of the column "Delivery Number"
				view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_DELV_NUM).editable = true;
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function resetItemsVisibility():void
		{
			view.lbl_new_customer_cd.visible = true;
			view.new_customer_cd.visible = true;
			// Show "Delivery Number" and "Delivery Location" fields.
			view.lbl_new_delv_num.visible = true;
			view.new_delv_num.visible = true;
			view.lbl_new_delv_loc.visible = true;
			view.new_delv_loc.visible = true;
			
			// Show "Delivery Number", "Delivery Location", "Planned" and "Loaded" columns if schedule by compartment.
			view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_SOLD_TO).visible  = true;
			view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_DELV_NUM).visible = true;
			view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_DELV_LOC).visible = true;
			view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_QTY_PLAN).visible = true;
			view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_QTY_LOAD).visible = true;
			
			// Change the column length of Drawer Prod.
			view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_PROD_CODE).width = 160;
			// Change the editability of the column "Delivery Number"
			view.transferDetailsGrid.columns.getItemAt(CLNID__TRSF_DELV_NUM).editable = false;
		}
		
		/**
		 * Calc one base prod quantities.
		 * 
		 */
		public function calcBaseQty(e:Event = null, trsfRowIdx:int = -1, baseRowIdx:int = -1, feedbackQuantity:int = -1, callback:Function = null):void
		{
			var currTrsfIndex:int = (trsfRowIdx == -1) ? getCurrSelectedTrsfIdx() : trsfRowIdx;
			var currBaseIndex:int = (baseRowIdx == -1) ? getCurrSelectedBaseIdx() : baseRowIdx;
			var oTmp:Object;
			var pri:int;
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			
			if (currTrsfIndex == -1)
				return;
			if (currBaseIndex == -1)
				return;

			oTmp = dmMT.transactionDataArr.getItemAt(currTrsfIndex).baseprod.getItemAt(currBaseIndex);
			
			//pri = getPriorityQty(baseRowIdx);
			pri = getPriorityQty2(trsfRowIdx, baseRowIdx);
			
			var type:String = "";
			var value:Number = 0;
			switch(pri){
				case 0:return;
				case 1:
					type = "LT";
					value = oTmp.trsf_bs_qty_amb;
					break;
				case 2:
					type = "L15";
					value = oTmp.trsf_bs_qty_cor;
					break;
				case 3:
					type = "KG";
					value = oTmp.trsf_bs_load_kg;
					break;
				default:return;
			}
			var urlStr:String = "/phpwrapper/calcvcf.php?frm_baseCd="+ Number(oTmp.trsf_bs_prodcd) +"&";
			urlStr += "frm_which_type=" + type + "&";
			urlStr += "frm_real_amount=" + value + "&";
			urlStr += "frm_real_temp=" + Number(oTmp.trsf_bs_temp) + "&";
			urlStr += "frm_real_dens=" + Number(oTmp.trsf_bs_den);

			var viewService:HTTPService = new HTTPService();
			viewService.url = urlStr;
			viewService.resultFormat="object";
			viewService.method="POST";
			viewService.addEventListener(FaultEvent.FAULT,function onCalFault(event:FaultEvent):void
			{
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_CALC_BASE_QTY'));
			});
			viewService.addEventListener(ResultEvent.RESULT,function onCalResult(event:ResultEvent):void
			{
				var res:Object;// = event.result as Object; Somehow Flex complier doesn't like it anymore?
				res = event.result as Object;
				var oTmp:Object;
				
				if (currBaseIndex == -1)
					return;
				
				oTmp = DM.ManualTransactions.transactionDataArr.getItemAt(currTrsfIndex).baseprod.getItemAt(currBaseIndex);
				
				if (res.OMEGA_XML)
				{
					var tmpStr:String;// = oTmp.trsf_bs_prodcls;
					tmpStr = oTmp.trsf_bs_prodcls;
					if (tmpStr.toUpperCase() != "ADDITIVE")
					{
						// non-additive: no decimals --> 3 decimals
						oTmp.trsf_bs_qty_amb = Math.round(Number(res.OMEGA_XML.REAL_LITRE) * QTY_DECIMAL) / QTY_DECIMAL; //Ver2.7 added QTY_DECIMAL
						oTmp.trsf_bs_qty_cor = Math.round(Number(res.OMEGA_XML.REAL_LITRE15) * QTY_DECIMAL) / QTY_DECIMAL;
						oTmp.trsf_bs_load_kg = Math.round(Number(res.OMEGA_XML.REAL_KG) * QTY_DECIMAL) / QTY_DECIMAL;;
					}
					else
					{
						// additive: 3 decimals
						oTmp.trsf_bs_qty_amb = Math.round(Number(res.OMEGA_XML.REAL_LITRE) * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
						oTmp.trsf_bs_qty_cor = Math.round(Number(res.OMEGA_XML.REAL_LITRE15) * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
						oTmp.trsf_bs_load_kg = Math.round(Number(res.OMEGA_XML.REAL_KG) * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
					}
				}
				
				// Calc base totals.
				trace("calcBaseQty ====> calcAllBaseTotals()");
				calcAllBaseTotals();
				
				// Refresh data grids.
				refreshBaseGrid();
				refreshBaseTotalGrid();
				
				if (_feedbackCounter != -1){
					_feedbackCounter++;
					
					totalSTDL += Number(res.OMEGA_XML.REAL_LITRE15);
					totalKG   += Number(res.OMEGA_XML.REAL_KG);
					if (_feedbackCounter == feedbackQuantity){
						
						// Cal the summary of base and put it back to Transfer
						DM.ManualTransactions.transferDataArr[currTrsfIndex].trsf_qty_cor = Math.round(totalSTDL * QTY_DECIMAL) / QTY_DECIMAL; //Ver2.7 added QTY_DECIMAL
						DM.ManualTransactions.transferDataArr[currTrsfIndex].trsf_load_kg = Math.round(totalKG * QTY_DECIMAL) / QTY_DECIMAL;
						DM.ManualTransactions.transferDataArr.refresh();
						
						_feedbackCounter = -1;
						
						// Calculate next compartment.
						nextCalQtyCall();
					}
				}
			});
			viewService.send();
		}
		
		public function nextCalQtyCall():void
		{
			// Prepare next transfer row index.
			if (_transferRowIdx < _transferRowMax - 1)
			{
				_transferRowIdx++;
				_CalAllBasesForAllTrsfsCallback();
			}
			else
			{
				// Triggered by clicking 'Cal Qty' button,
				// otherwise triggered by auto calculation(no need to disp msg).
				if (_transferRowMax > 0)
				{
					var tem:String = mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SUCCEED_CALC_ALL_CMPT_BASE_QTY');
					if (calExcl != null && calExcl.length == 0)
					{
						global.msgSuccess(tem);
					}
					else if (calExcl != null && calExcl.length > 0)
					{
						var tem_exc:String = mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.EXCLUDE_CMPT');
						for each (var o:Object in calExcl)
						{
							tem_exc += "[" + o + "]"
						}
						tem_exc += mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.PLS_CHECK_DENS_TEMP_OBS');
						
						global.msgWarning(tem + "\n" + tem_exc);
					}
					
					updateAccBaseDisp(1);
					
				}
			
				// Reset indexes to 0 as the calculation is done for this time.
				_transferRowIdx = 0;
				_transferRowMax = 0;
				if (calExcl != null)
					calExcl.removeAll();
			}
		}
		
		public function updateAccBaseDisp(mode:int=0):void
		{
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			var std_total_clone:Number = 0;
			var mass_total_clone:Number = 0;
			var std_total_delta:Number = 0;
			var mass_total_delta:Number = 0;
			
			if (mode == 0)  // Called from reset
			{
				dmMT.base_std_total_disp = String(Math.round(dmMT.base_std_total * QTY_DECIMAL) / QTY_DECIMAL);
				dmMT.base_mass_total_disp = String(Math.round(dmMT.base_mass_total * QTY_DECIMAL) / QTY_DECIMAL);
			}
			else if (mode == 1)  // Called after clicking 'Calc Drawer'.
			{
				dmMT.base_std_total = 0;
				dmMT.base_mass_total = 0;
				
				// Cal the total of std. Cal the total of mass.
				for (var bsIdx = 0; bsIdx < dmMT.baseprodTotalDataArr.length; bsIdx++)
				{
					dmMT.base_std_total += dmMT.baseprodTotalDataArr[bsIdx].trsf_bs_qty_cor;
					dmMT.base_mass_total += dmMT.baseprodTotalDataArr[bsIdx].trsf_bs_load_kg;
				}
				dmMT.base_std_total_disp = String(Math.round(dmMT.base_std_total * QTY_DECIMAL) / QTY_DECIMAL);
				dmMT.base_mass_total_disp = String(Math.round(dmMT.base_mass_total * QTY_DECIMAL) / QTY_DECIMAL);
			}
			else if (mode == 2)  // Called after recipe adjustment.
			{
				var res:Object = mtcal.getResult();
				
				// Cal the total of std after adjustment. Cal the total of mass after adjustment.
				for (var bsIdx = 0; bsIdx < res.bsTotalDataClone.length; bsIdx++)
				{
					std_total_clone += res.bsTotalDataClone[bsIdx].trsf_bs_qty_cor;
					mass_total_clone += res.bsTotalDataClone[bsIdx].trsf_bs_load_kg;
				}
				
				// Cal the delta between the adjusted and original.
				std_total_delta = std_total_clone - dmMT.base_std_total;
				mass_total_delta = mass_total_clone - dmMT.base_mass_total;
				
				dmMT.base_std_total_disp = String(Math.round(std_total_clone * QTY_DECIMAL) / QTY_DECIMAL) + "(Δ" + String(Math.round(std_total_delta * QTY_DECIMAL) / QTY_DECIMAL) + ")";
				dmMT.base_mass_total_disp = String(Math.round(mass_total_clone * QTY_DECIMAL) / QTY_DECIMAL) + "(Δ" + String(Math.round(mass_total_delta * QTY_DECIMAL) / QTY_DECIMAL) + ")";
			}
			else
			{
				dmMT.base_std_total_disp = String(Math.round(dmMT.base_std_total * QTY_DECIMAL) / QTY_DECIMAL);
				dmMT.base_mass_total_disp = String(Math.round(dmMT.base_mass_total * QTY_DECIMAL) / QTY_DECIMAL);
			}
			
			var baseStdTotalTxt:String = mx.resources.ResourceManager.getInstance().getString('default','MTRAN.BASEPROD.BASE_STD_TOTAL');
			var baseMassTotalTxt:String = mx.resources.ResourceManager.getInstance().getString('default','MTRAN.BASEPROD.BASE_MASS_TOTAL');
			dmMT.base_std_mass_total_disp = baseStdTotalTxt + dmMT.base_std_total_disp + "    " + baseMassTotalTxt + dmMT.base_mass_total_disp;//????
		}
		
		/**
		 * Get the QTY which should be as the input for CGI call.
		 * 
		 */
		public function getPriorityQty(idx:int = -1):int
		{
			var ret:int; // 0: no need cal  1:obs  2:cor  3:kg
			var currBaseIndex:int = (idx == -1) ? getCurrSelectedBaseIdx() : idx;
			var oTmp:Object;
			
			if (currBaseIndex == -1) return 0;
			oTmp = DM.ManualTransactions.baseprodDataArr.getItemAt(currBaseIndex);
			
			// Priority is KG > AMB > COR
			/*
			if (oTmp.trsf_bs_load_kg!=null)return 3;
			if (oTmp.trsf_bs_qty_amb!=null)return 2;
			if (oTmp.trsf_bs_qty_cor!=null)return 1;
			return 0;
			*/
			
			if (oTmp.trsf_bs_qty_amb == null
			&& oTmp.trsf_bs_qty_cor == null
			&& oTmp.trsf_bs_load_kg == null)
			{
				ret = 0;
			}
			else if (oTmp.trsf_bs_qty_amb == null
				 && oTmp.trsf_bs_qty_cor != null
				 && oTmp.trsf_bs_load_kg != null)
			{
				ret = 3;
			}
			else if (oTmp.trsf_bs_qty_amb != null
				 && oTmp.trsf_bs_qty_cor == null
				 && oTmp.trsf_bs_load_kg != null)
			{
				ret = 3;
			}
			else if (oTmp.trsf_bs_qty_amb != null
				 && oTmp.trsf_bs_qty_cor != null
				 && oTmp.trsf_bs_load_kg == null)
			{
				ret = 1;
			}
			else if (oTmp.trsf_bs_qty_amb != null
				 && oTmp.trsf_bs_qty_cor == null
				 && oTmp.trsf_bs_load_kg == null)
			{
				ret = 1;
			}
			else if (oTmp.trsf_bs_qty_amb == null
				 && oTmp.trsf_bs_qty_cor != null
				 && oTmp.trsf_bs_load_kg == null)
			{
				ret = 2;
			}
			else if (oTmp.trsf_bs_qty_amb == null
				 && oTmp.trsf_bs_qty_cor == null
				 && oTmp.trsf_bs_load_kg != null)
			{
				ret = 3;
			}
			else  // all != null
			{
				ret = 3;
			}
			
			return ret;
		}

		/**
		 * Get the QTY which should be as the input for CGI call.
		 * 
		 */
		public function getPriorityQty2(trsfIdx:int = -1, baseIdx:int = -1):int
		{
			var ret:int; // 0: no need cal  1:obs  2:cor  3:kg
			var currTrsfIndex:int = (trsfIdx == -1) ? getCurrSelectedTrsfIdx() : trsfIdx;
			var currBaseIndex:int = (baseIdx == -1) ? getCurrSelectedBaseIdx() : baseIdx;
			var oTmp:Object;
			
			if (currTrsfIndex == -1) return 0;
			if (currBaseIndex == -1) return 0;
			
			//oTmp = DM.ManualTransactions.baseprodDataArr.getItemAt(currBaseIndex);
			oTmp = DM.ManualTransactions.transactionDataArr.getItemAt(currTrsfIndex).baseprod.getItemAt(currBaseIndex);
			
			// Priority is KG > AMB > COR
			/*
			if (oTmp.trsf_bs_load_kg!=null)return 3;
			if (oTmp.trsf_bs_qty_amb!=null)return 2;
			if (oTmp.trsf_bs_qty_cor!=null)return 1;
			return 0;
			*/
			
			if (oTmp.trsf_bs_qty_amb == null
				&& oTmp.trsf_bs_qty_cor == null
				&& oTmp.trsf_bs_load_kg == null)
			{
				ret = 0;
			}
			else if (oTmp.trsf_bs_qty_amb == null
				&& oTmp.trsf_bs_qty_cor != null
				&& oTmp.trsf_bs_load_kg != null)
			{
				ret = 3;
			}
			else if (oTmp.trsf_bs_qty_amb != null
				&& oTmp.trsf_bs_qty_cor == null
				&& oTmp.trsf_bs_load_kg != null)
			{
				ret = 3;
			}
			else if (oTmp.trsf_bs_qty_amb != null
				&& oTmp.trsf_bs_qty_cor != null
				&& oTmp.trsf_bs_load_kg == null)
			{
				ret = 1;
			}
			else if (oTmp.trsf_bs_qty_amb != null
				&& oTmp.trsf_bs_qty_cor == null
				&& oTmp.trsf_bs_load_kg == null)
			{
				ret = 1;
			}
			else if (oTmp.trsf_bs_qty_amb == null
				&& oTmp.trsf_bs_qty_cor != null
				&& oTmp.trsf_bs_load_kg == null)
			{
				ret = 2;
			}
			else if (oTmp.trsf_bs_qty_amb == null
				&& oTmp.trsf_bs_qty_cor == null
				&& oTmp.trsf_bs_load_kg != null)
			{
				ret = 3;
			}
			else  // all != null
			{
				ret = 3;
			}
			
			return ret;
		}
		
		/**
		 *  
		 *  
		 */
		public function getCurrSelectedTrsfIdx():int
		{
			var oTmp:Object;
			var currTrsfIndex:int;
			
			currTrsfIndex = view.transferDetailsGrid.selectedIndex;
			if (currTrsfIndex == -1)
			{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SELECT_ONE_TRSF_DATA'));
			}
			
			return currTrsfIndex;
		}
		
		/**
		 *  
		 *  
		 */
		public function getCurrSelectedBaseIdx():int
		{
			var oTmp:Object;
			var currBaseIndex:int;
			
			currBaseIndex = view.baseprodDataGrid.selectedIndex;
			if (currBaseIndex == -1)
			{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SELECT_ONE_BASE_DATA'));
			}
			
			return currBaseIndex;
		}
		
		/**
		 *  
		 *  
		 */
		public function refreshTransferGrid():void
		{
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			dmMT.transferDataArr.refresh();
		}
		
		/**
		 *  
		 *  
		 */
		public function refreshBaseGrid():void
		{
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			dmMT.baseprodDataArr.refresh();
		}
		
		/**
		 *  
		 *  
		 */
		public function refreshBaseTotalGrid():void
		{
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			dmMT.baseprodTotalDataArr.refresh();
		}
		
		/**
		 *  
		 *  
		 */
		public function needRefreshBaseprodTotal():Boolean
		{
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			return dmMT.needRefreshBaseprodTotalDataArr;
		}
		
		/**
		 *  
		 *  
		 */
		public function isAccBaseAdjusted():Boolean
		{
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			return dmMT.isAccBaseAdjusted;
		}
		
		/**
		 *  
		 *  
		 */
		public function disableButtons():void
		{
			isCalDrawerEnabled   = false;
			isGetDensityEnabled  = false;
			isClearAllEnabled    = false;
			isDelTransferEnabled = false;
			isLoadEnabled        = false;
			isSaveEnabled        = false;
			isSubmitEnabled      = false;
		}
		
		/**
		 *  
		 *  
		 */
		public function enableButtons():void
		{
			isCalDrawerEnabled   = true;
			isGetDensityEnabled  = true;
			isSubmitEnabled      = true;
			isClearAllEnabled    = true;
			isDelTransferEnabled = true;
			isLoadEnabled        = true;
			isSaveEnabled        = true;
		}
		
		/**
		 *  
		 *  
		 */
		public function updateSubmitBtnStatus():void
		{
			if (needRefreshBaseprodTotal() == true)
				isSubmitEnabled = false; // The Base grid is NOT up-to-date, so disable submit.
			else
				isSubmitEnabled = true;
		}
		
		//--------------------------------------------------------------------//
		//                                                                    //
		//                           Utilities  [START]                       //
		//                                                                    //
		//--------------------------------------------------------------------//
		
		/**
		 *  
		 *  
		 */
		public function dataRangeCheck(key:String, val:Number):int
		{
			var res:int = 0;
			switch (key)
			{
				case 'TRSF_TEMP':
					if (val < TEMP_MIN || val > TEMP_MAX) 
						res = 1;
					break;
				case 'TRSF_DEN':
					if (val < DEN_MIN || val > DEN_MAX) 
						res = 1;
					break;
				case 'TRSF_OBS':
					if (val < OBS_MIN || val > OBS_MAX) 
						res = 1;
					break;
				case 'TRSF_COR':
					if (val < STD_MIN || val > STD_MAX) 
						res = 1;
					break;
				case 'TRSF_MASS':
					if (val < MASS_MIN || val > MASS_MAX) 
						res = 1;
					break;
				default:
					break
			}
			return res;
		}
		
		/**
		 *  
		 *  
		 */
		public function isNull(str:String)
		{
			return (str.toUpperCase() == 'NULL' || str == '') ? true : false;
		}
		
		/**
		 *  
		 *  
		 */
		public function getDefaultDate():Date
		{
			var now_date:Date;
			var def_date:Date;
			
			now_date = new Date(global.serverDateTime);
			def_date = DateTimeFunc.dateAdd("yyyy", 0, now_date);
			
			return def_date;
		}
		
		/**
		 *  
		 *  
		 */
		function padStringRight(_str:String, _n:Number, _pStr:String = null):String
		{
			var _rtn:String = _str;
			if ((_pStr == undefined) || (_pStr == null) || (_pStr.length < 1))
			{
				_pStr = " ";
			}
			//
			if (_str.length < _n)
			{
				var _s:String = "";
				for (var i:Number = 0 ; i < (_n - _str.length) ; i++)
				{
					_s += _pStr;
				}
				_rtn = _str + _s;
			}
			
			return _rtn;
		}
		
		
		//--------------------------------------------------------------------//
		//                            Utilities  [END]                        //
		//--------------------------------------------------------------------//
		
	}
}