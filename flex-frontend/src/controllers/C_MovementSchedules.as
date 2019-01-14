package controllers
{
	import com.adobe.fiber.runtime.lib.DateTimeFunc;
	
	import components.DeleteDialog;
	import components.MessageArea;
	import components.MessageDialog;
	import components.TransactionsDlg;
	import components.ViewPopupDlg;
	
	import dm.DM;
	import dm.collections.dmMovementScheduleItems;
	import dm.comms.amf;
	import dm.models.dmModel;
	import dm.models.dmMovementSchedule;
	import dm.models.dmMovementScheduleItem;
	import dm.remoteDataService;
	import dm.utils.dmNavigator;
	import dm.utils.tools;
	
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.globalization.LocaleID;
	import flash.ui.Keyboard;
	
	import mx.collections.ArrayCollection;
	import mx.collections.errors.ItemPendingError;
	import mx.controls.DateField;
	import mx.core.FlexGlobals;
	import mx.events.CollectionEvent;
	import mx.events.FlexEvent;
	import mx.resources.ResourceManager;
	import mx.rpc.events.FaultEvent;
	import mx.rpc.events.ResultEvent;
	import mx.rpc.http.HTTPService;
	
	import renderers.DKI_HeaderColumn_Renderer;
	
	import spark.components.gridClasses.GridColumn;
	import spark.components.gridClasses.IGridItemRenderer;
	import spark.events.GridEvent;
	import spark.formatters.DateTimeFormatter;
	
	import views.v_MovementSchedules;
	import views.v_ManualTransactions;
	
	
	public class C_MovementSchedules
	{
		[Bindable] public var readOnly:Boolean = false;
		[Bindable] public var canUpdate:Boolean = false;
		[Bindable] public var canCreate:Boolean = false;
		[Bindable] public var canDelete:Boolean = false;
		[Bindable] public var hasPassword:Boolean = false;
		
		public var dateFormatter:DateTimeFormatter;
		public var longDateConvert:DateTimeFormatter;
		public var shortDateConvert:DateTimeFormatter;
		
		public var tripKeyUsed:Boolean = false;
		
		public var mainListSelection:int = -1;
		public var refreshLists:Boolean=false;
		
		
		[Bindable] public var view:v_MovementSchedules;
		
//		public var mapObj:Object = { "clnTripNumber":"SHLS_TRIP_NO", "clnTripDate":"SHLS_CALDATE", "clnTripStatus":"SHLS_STATUS", "clnTripCarrier":"CARRIER_CODE", "clnTripVehicle":"TNKR_CODE", "clnTripSupplier":"SUPPLIER_CODE", "clnTripMovement":"MV_NUMBER", "clnTripStart":"SHLS_LD_START", "clnTripEnd":"SHLS_LD_END", "clnTripType":"LD_TYPE", "clnTripReversed":"LOAD_REVERSE_FLAG", "clnTripUnload":"LD_TYPE", "clnTripOperator":"OPERATOR" }; 
		public var mapObj:Object = { "clnTripNumber":"SHLS_TRIP_NO", "clnTripDate":"SHLS_CALDATE", "clnTripStatus":"SHLS_STATUS", "clnTripCarrier":"CARRIER_CODE", "clnTripVehicle":"TNKR_CODE", "clnTripSupplier":"SUPPLIER_CODE", "clnTripMovement":"MV_NUMBER", "clnTripStart":"SHLS_LD_START", "clnTripEnd":"SHLS_LD_END", "TRSF_PRODUCT":"TRSF_PRODUCT", "TRSF_QTY_AMB":"TRSF_QTY_AMB", "TRSF_QTY_COR":"TRSF_QTY_COR", "TRSF_LOAD_KG":"TRSF_LOAD_KG", "DT_POSTED":"DT_POSTED", "TRSA_ALT_QTY":"TRSA_ALT_QTY", "TRSA_ALT_UNT":"TRSA_ALT_UNT", "clnTripType":"LD_TYPE", "clnTripReversed":"LOAD_REVERSE_FLAG", "clnTripUnload":"LD_TYPE", "clnTripOperator":"OPERATOR", "SHLSLOAD_LOAD_ID":"SHLSLOAD_LOAD_ID" }; 
		public var orderObj:Object = { field:'SHLS_TRIP_NO', order:'DESC' };
		public var orderCollection:ArrayCollection = new ArrayCollection( new Array({ field:'SHLS_TRIP_NO', order:'DESC' }));

		[Bindable] public var nomTerminalList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationTerminal", null, lookupNominationTerminal_resultHandler );
		[Bindable] public var nomSupplierList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationSupplier", null, lookupNominationSupplier_resultHandler );
		[Bindable] public var nomCarrierList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationCarrier", null, lookupNominationCarrier_resultHandler );
		[Bindable] public var nomVehicleList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationVehicle", null, lookupNominationVehicle_resultHandler );
		[Bindable] public var nomPersonnelList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationPersonnel", null, lookupNominationPersonnel_resultHandler );
		[Bindable] public var nomProductUnitList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationProductUnit", null, lookupNominationProductUnit_resultHandler );
		[Bindable] public var nomDrawerList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationDrawer", null, lookupNominationDrawer_resultHandler );
		[Bindable] public var nomDrawerProductList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationDrawerProduct", null, lookupNominationDrawerProduct_resultHandler );
		[Bindable] public var nomItemTypeList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationItemType", null, lookupNominationItemType_resultHandler );
		[Bindable] public var nomSourceList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationSource", null, lookupNominationSource_resultHandler );
		[Bindable] public var nomStatusList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationStatus", null, lookupNominationStatus_resultHandler );
		
		//[Bindable] public var nomSiteSettingList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationSiteSetting", null, lookupNominationSiteSetting_resultHandler );
		//[Bindable] public var nomPlantList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationPlant", null, lookupNominationPlant_resultHandler );
		//[Bindable] public var nomTankList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationTank", null, lookupNominationTank_resultHandler );
		//[Bindable] public var nomProductRatioList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationProductRatio", null, lookupNominationProductRatio_resultHandler );
		
		[Bindable] public var nomBayarmList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationBayarm", null, lookupNominationBayarm_resultHandler );
		[Bindable] public var nomSchdStatusList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationScheduleStatus", null, lookupNominationScheduleStatus_resultHandler );
		[Bindable] public var nomTrailerList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationTrailer", null, lookupNominationTrailer_resultHandler );

		
		public var transactionPopup:TransactionsDlg = new TransactionsDlg;
		public var makeTransactionPopup:ViewPopupDlg = new ViewPopupDlg( "Manual transactions for nomination schedules", new v_ManualTransactions(), closeDialogHandler );
		public var mlTypicalItems:Object = {
					clnTripNumber  :"123456789"              ,
					clnLoadId      :"123456789"              ,
					clnTripDate    :"NN/NN/NNNN NN:NN:NN"    ,
					clnTripStatus  :"ABCDEFGHIJKLMN"         ,
					clnTripCarrier :"Trip Carrier"           ,
					clnTripVehicle :"Trip Vehicle"           ,
					clnTripSupplier:"Trip Supplier"          ,
					clnTripMovement:"1234567890"             ,
					clnTripStart   :"NN/NN/NNNN NN:NN:NN"    ,
					clnTripEnd     :"NN/NN/NNNN NN:NN:NN"    ,
					clnTripType    :"Trip Type"              ,
					clnTripReversed:"NNNNN"                  ,
					clnTripUnload  :"NNNNNNNN"               ,
					clnTripOperator:"ABCDEFGHIJKLMN"
		
		};
		public var ilTypicalItem:Object = {
					clnItemAction      :"123"              ,
					clnItemLine        :"Line"             ,
					clnItemMovement    :"NNNNNNNNNN"       ,
					clnItemMoveitem    :"NNNNNN"           ,
					clnItemTrailer     :"ABCDEFGHIJKLMN"   ,
					clnItemTrailerComp :"NN"               ,
					clnItemCompartment :"NN"               ,
					clnItemProduct     :"ABCDEFGHIJKLMN"   ,
					clnItemQtyScheduled:"1234567890"       ,
					clnItemQtyDelivered:"1234567890"       ,
					clnItemQtyPreloaded:"1234567890"       ,
					clnItemQtyPreset   :"1234567890"       ,
					clnItemBayarm      :"ABCDEFGH"         ,
					clnItemTrip        :"1234567890"       ,
					clnItemSupplier    :"ABCDEFGHIJKLMN"   ,
					clnItemDrawer      :"ABCDEFGHIJKLMN" 
		};
		
		public function C_MovementSchedules()
		{
			dateFormatter = new DateTimeFormatter();
			dateFormatter.dateStyle = "short";
			dateFormatter.timeStyle = "none";
			dateFormatter.setStyle("locale", LocaleID.DEFAULT);
			
			longDateConvert = new DateTimeFormatter();
			//longDateConvert.dateTimePattern = "yyyy-MM-dd HH:mm:ss:SSSSS";
			longDateConvert.dateTimePattern = "yyyy-MM-dd HH:mm:ss";
			
			shortDateConvert = new DateTimeFormatter();
			shortDateConvert.dateTimePattern = "yyyy-MM-dd";
		}
		
		public function creationCompleteHandler(event:FlexEvent):void
		{
			trace ("-------------start creationCompleteHandler");
			if ( DM.MovementSchedules.asynServiceCall == true )
			{
				nomTerminalList.service( 'N' );
				nomSupplierList.service( 'N' );
				nomCarrierList.service( 'N' );
				nomVehicleList.service( 'N' );
				nomPersonnelList.service( 'N' );
				nomProductUnitList.service( 'N' );
				nomDrawerList.service( 'N' );
				nomDrawerProductList.service( 'N' );
				nomItemTypeList.service( 'N' );
				nomSourceList.service( 'N' );
				nomStatusList.service( 'N' );
				nomBayarmList.service( 'N' );
				nomSchdStatusList.service( 'N' );
				nomTrailerList.service( 'N' );
			}
			
			this.addDateTimeListener();
			
			view.mainList.mapObj = this.mapObj;
			view.mainList.orderCollection = new ArrayCollection( this.orderCollection.source );
			
			if ( view.currentState == "normal" )
			{
				this.refreshLists = true;
				this.refreshMainFilterOnChange();
				this.refreshLists = false;
			}
		}
		
		private function lookupNominationTerminal_resultHandler():void
		{
			for each(var o:Object in nomTerminalList.source)
			{
				o.CODE_NAME = o.TERM_CODE + " - " + o.TERM_NAME;
			}
			DM.MovementSchedules.terminals = nomTerminalList;
		}
		
		private function lookupNominationSupplier_resultHandler():void
		{
			for each(var o:Object in nomSupplierList.source)
			{
				o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
			}
			DM.MovementSchedules.suppliers = nomSupplierList;
		}
		
		
		private function lookupNominationCarrier_resultHandler():void
		{
			for each(var o:Object in nomCarrierList.source)
			{
				o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
			}
			DM.MovementSchedules.carriers = nomCarrierList;
		}
		
		private function lookupNominationVehicle_resultHandler():void
		{
			for each(var o:Object in nomVehicleList.source)
			{
				//o.CODE_NAME = o.TNKR_CODE + " - " + o.TNKR_NAME;
				o.CODE_NAME = o.TNKR_CODE;
			}
			DM.MovementSchedules.vehicles = nomVehicleList;
		}
		
		private function lookupNominationPersonnel_resultHandler():void
		{
			for each(var o:Object in nomPersonnelList.source)
			{
				o.CODE_NAME = o.PER_CODE + " - " + o.PER_NAME;
			}
			DM.MovementSchedules.operators = nomPersonnelList;
		}
		
		private function lookupNominationProductUnit_resultHandler():void
		{
			for each(var o:Object in nomProductUnitList.source)
			{
				//				o.CODE_NAME = o.UNIT_ID + " - " + o.DESCRIPTION;
				o.CODE_NAME = o.DESCRIPTION;
			}
			DM.MovementSchedules.prodUnits = nomProductUnitList;
		}
		
		private function lookupNominationDrawer_resultHandler():void
		{
			for each(var o:Object in nomDrawerList.source)
			{
				o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
			}
			DM.MovementSchedules.drawers = nomDrawerList;
		}
		
		private function lookupNominationDrawerProduct_resultHandler():void
		{
			for each(var o:Object in nomDrawerProductList.source)
			{
				o.CODE_NAME = o.PROD_CODE + " - " + o.PROD_NAME;
			}
			DM.MovementSchedules.products = nomDrawerProductList;
		}
		
		
		private function lookupNominationItemType_resultHandler():void
		{
			//DM.MovementSchedules.movItemTypes = nomItemTypeList;
			var arr:Array = new Array();
			for each(var o:Object in nomItemTypeList.source)
			{
				arr[int(o['MOVITEM_TYPE_ID'])] = o['MOVITEM_TYPE_NAME'];
			}
			DM.MovementSchedules.movItemTypes = new ArrayCollection(arr);
		}
		
		private function lookupNominationSource_resultHandler():void
		{
			//DM.MovementSchedules.movSources = nomSourceList;
			//DM.MovementSchedules.movSourcesAll = nomSourceList;
			var arr:Array = new Array();
			for each(var o:Object in nomSourceList.source)
			{
				arr[int(o['MOVSOURCE_TYPE_ID'])] = o['MOVSOURCE_TYPE_NAME'];
			}
			DM.MovementSchedules.movSources = new ArrayCollection(arr);
		}
		
		private function lookupNominationStatus_resultHandler():void
		{
			//DM.MovementSchedules.movStatus = nomStatusList;
			var arr:Array = new Array();
			for each(var o:Object in nomStatusList.source)
			{
				arr[int(o['MOVSTATUS_TYPE_ID'])] = o['MOVSTATUS_TYPE_NAME'];
			}
			DM.MovementSchedules.movStatus = new ArrayCollection(arr);
		}
		
		private function lookupNominationBayarm_resultHandler():void
		{
			for each(var o:Object in nomBayarmList.source)
			{
				//o.CODE_NAME = o.BAA_CODE + " - " + o.ARM_NAME;
				o.CODE_NAME = o.BAA_CODE;
			}
			DM.MovementSchedules.bayarms = nomBayarmList;
		}
		
		private function lookupNominationScheduleStatus_resultHandler():void
		{
			for each(var o:Object in nomSchdStatusList.source)
			{
				//o.CODE_NAME = o.STATUS_ID + " - " + o.STATUS_CODE + " - " + o.STATUS_TEXT;
				o.CODE_NAME = o.STATUS_TEXT;
			}
			DM.MovementSchedules.tripStatus = nomSchdStatusList;
		}
		
		private function lookupNominationTrailer_resultHandler():void
		{
			for each(var o:Object in nomTrailerList.source)
			{
				o.CODE_NAME = o.EQPT_ID + " - " + o.EQPT_CODE;
			}
			DM.MovementSchedules.trailers = nomTrailerList;
		}
		
		
		
		public function addDateTimeListener():void
		{
			//if ( view.currentState != "widget" )
			{
				if ( view.fltTimeFrom.hasEventListener('dateChanged') == false )
				{
					trace("******************view.fltTimeFrom.selectedDate = null;");
					view.fltTimeFrom.selectedDate = null;
					view.fltTimeFrom.addEventListener('dateChanged', onDateChanged);
				}
				if ( view.fltTimeTo.hasEventListener('dateChanged') == false )
				{
					trace("******************view.fltTimeFrom.selectedDate = null;");
					view.fltTimeTo.selectedDate = null;
					view.fltTimeTo.addEventListener('dateChanged', onDateChanged);
				}
			}
			
		}
		
		private function onDateChanged(event:Event):void
		{
			if ( (view.fltTimeFrom.selectedDate !=null) 
			  && (view.fltTimeTo.selectedDate != null)
			  && (view.fltTimeFrom.selectedDate >= view.fltTimeTo.selectedDate) 
			)
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVSCHD.MESSAGE.DT_FROM_GT_TO') );
			}
			else
			{
				refreshMainFilterOnChange();
			}
		}
		
		public function onDateBoxChanged():void
		{
			if ( (view.fltTimeFrom.selectedDate !=null) 
				&& (view.fltTimeTo.selectedDate != null)
				&& (view.fltTimeFrom.selectedDate >= view.fltTimeTo.selectedDate) 
			)
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVSCHD.MESSAGE.DT_FROM_GT_TO') );
			}
			else
			{
				refreshMainFilterOnChange();
			}
		}
		
		protected function vehicles_filterFunc(item:Object):Boolean
		{
			if (item.TNKR_CARRIER == view.frmCarrier.selectedItem.CMPY_CODE 
			 || item.TNKR_OWNER == view.frmCarrier.selectedItem.CMPY_CODE )                
			{ 
				return true     
			}
			else
			{
				return false;
			}
		}
		public function filterVehiclesList():void
		{
			DM.MovementSchedules.vehicles.filterFunction = vehicles_filterFunc;
			DM.MovementSchedules.vehicles.refresh();
		}
		
		public function setFilters( params:*=false ): void
		{
			if ( params == false )
			{
				return;
			}
			
			view.currentState = "normal";
			
			trace ("...............................in setFilters");
			tools.pr( params);
			
			view.fltSupplier.selectedIndex		= tools.getObjAttribute( params, "supplier", -1 );
			view.fltTripNumber.text				= tools.getObjAttribute( params, "trip_number", "" );
			//view.fltNominationKey.text		= tools.getObjAttribute( params, "move_id", "" );
			view.fltNominationKey.text			= tools.getObjAttribute( params, "move_key", "" );
			//view.fltNominationItem.text		= tools.getObjAttribute( params, "line_id", "" );
			view.fltNominationItem.text			= tools.getObjAttribute( params, "item_id", "" );
			
			//view.fltTripStatus.selectedIndex	= tools.getObjAttribute( params, "trip_status", -1 ); 
			view.fltTripStatus.selectedIndex	= getItemIndexFromCode(tools.getObjAttribute( params, "trip_status", "" ), DM.MovementSchedules.tripStatus, "STATUS_CODE");
			
			refreshMainFilterOnChange();
		}
		
		public function showOperationResult( response:*, showSuccess:Boolean=true ):void
		{
			var msg:String = "";
			if ( response.resultOK == true )
			{
				if ( showSuccess == false )
				{
					return;
				}
				msg = response.dev;
				if ( response.opType == "create" )
				{
					msg = mx.resources.ResourceManager.getInstance().getString('default','MSG_CREATE__SUCCESS');
				}
				if ( response.opType == "update" )
				{
					msg = mx.resources.ResourceManager.getInstance().getString('default','MSG_UPDATE__SUCCESS');
				}
				if ( response.opType == "delete" )
				{
					msg = mx.resources.ResourceManager.getInstance().getString('default','MSG_DELETE__SUCCESS');
				}
				global.msgSuccess( msg );
			}
			else
			{
				if ( response.opType == "create" )
				{
					msg = mx.resources.ResourceManager.getInstance().getString('default','ERROR_CREATE__FAILURE');
				}
				if ( response.opType == "update" )
				{
					msg = mx.resources.ResourceManager.getInstance().getString('default','ERROR_UPDATE__FAILURE');
				}
				if ( response.opType == "delete" )
				{
					msg = mx.resources.ResourceManager.getInstance().getString('default','ERROR_DELETE__FAILURE');
				}
				global.msgFail( msg );
				
				//var errorBox:MessageArea = new MessageArea( response.dev );
			}
			
		}
		
		public function successInModelAction(response:*):void
		{
			DM.MovementSchedules.reload();
			view.currentState = 'normal';
			
			//trace("+++!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Success");
			//tools.pr ( response );
			//trace("+++!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Success");
			
			this.showOperationResult( response );
		}
		
		public function successInItemAction(response:*):void
		{
			
			this.showOperationResult( response, false );
		}
		
		public function save_clickHandler():void
		{
			trace("----------------------inside save_clickHandler");
			
			// disable the button to avoid the double click
			view.btnSave.enabled = false;
			//view.detailsPanel.enabled = false;
			
			var succeeded:Boolean = true;
			if (view.currentState == "create")
			{
				succeeded = create();
			}
			if (view.currentState == "edit")
			{
				succeeded = update();
			}
			
			if ( succeeded == false )
			{
				if (view.currentState == "create")
				{
					view.btnSave.enabled = this.canCreate;
				}
				if (view.currentState == "edit")
				{
					view.btnSave.enabled = this.canUpdate;
				}
				//view.btnSave.enabled = true;
				//view.detailsPanel.enabled = true;
			}
		}
		
		public function cancel_clickHandler():void
		{
			trace("----------------------inside cancel_clickHandler");
			
			view.currentState = "normal";
		}
		
		public function create():Boolean
		{
			if( tripKeyUsed == true )
			{
				global.msgFail( mx.resources.ResourceManager.getInstance().getString('default','MOVSCHD.MESSAGE.DUP_SUPP_TRIP') );
				return false;
			}
			
			return true;
		}
		
		public function remove(): void
		{
			var errors:String="";
			var index:int=0;
			
			if ( index > 0 )
			{
				var errorBox:MessageDialog = new MessageDialog( errors );
			}
			else
			{
				var canDelete:DeleteDialog = new DeleteDialog(doRemoval, hasPassword);
			}
		}
		
		public function doRemoval():void
		{
		}
		
		public function update():Boolean
		{
			return true;
		}
		
		public function getItemObjectFromCode(code:String, list:ArrayCollection, field:String):Object
		{
			return tools.getItemObjectFromCode( code, list, field );
		}
		
		public function getItemIndexFromCode(code:String, list:ArrayCollection, field:String):int
		{
			return tools.getItemIndexFromCode( code, list, field );
		}
		
		public function initCreateForm():void
		{
			view.frmTerminal.selectedIndex      = 0;
			view.frmSupplier.selectedIndex      = 0;
			view.frmCarrier.selectedIndex       = -1;
			view.frmTripNumber.text             = "";
			view.frmTimeSchedule.selectedDate   = (new Date());
			view.frmDrawer.selectedIndex        = 0;
			view.frmVehicle.selectedIndex       = -1;
			view.frmShift.text                  = "";
			view.frmPriority.text               = "";
			
			view.itemList.dataProvider = new dmMovementScheduleItems( {autopopulate: false} );
			
		}
		
		public function editSelected():void
		{
			if ( view.mainList.selectedItem == null || view.mainList.selectedItem.payload == null )
			{
				view.currentState = "normal";
				return;
			}
			else
			{
				view.currentState = "edit";
			}
			
			view.frmTerminal.selectedIndex      = getItemIndexFromCode(view.mainList.selectedItem.payload.SHLS_TERMINAL, DM.MovementSchedules.terminals, "TERM_CODE");
			view.frmSupplier.selectedIndex      = getItemIndexFromCode(view.mainList.selectedItem.payload.SUPPLIER_CODE, DM.MovementSchedules.suppliers, "CMPY_CODE");
			view.frmCarrier.selectedIndex       = getItemIndexFromCode(view.mainList.selectedItem.payload.CARRIER_CODE, DM.MovementSchedules.carriers, "CMPY_CODE");
			view.frmTripNumber.text             = view.mainList.selectedItem.payload.SHLS_TRIP_NO;
			view.frmDrawer.selectedIndex        = getItemIndexFromCode(view.mainList.selectedItem.payload.DRAWER_CODE, DM.MovementSchedules.drawers, "CMPY_CODE");
			view.frmVehicle.selectedIndex       = getItemIndexFromCode(view.mainList.selectedItem.payload.TNKR_CODE, DM.MovementSchedules.vehicles, "TNKR_CODE");
			view.frmShift.text                  = view.mainList.selectedItem.payload.SHLS_SHIFT;
			view.frmPriority.text               = view.mainList.selectedItem.payload.SHLS_PRIORITY;
			
			view.frmTimeSchedule.dateText.text     = convertDateToLocaleString(view.mainList.selectedItem.payload.SHLS_CALDATE);
			
			var itemFilters:Object = new Object();
			var index:int = 0;
			
			var tripNumObj:Object = new Object();
			tripNumObj["field"]       = "MSITM_SHLSTRIP"; 
			tripNumObj["value"]       = int(view.mainList.selectedItem.payload.SHLS_TRIP_NO); 
			tripNumObj["type"]        = "NUMBER"; 
			tripNumObj["format"]      = ""; 
			tripNumObj["delimiter"]   = "N/A"; 
			tripNumObj["operator"]    = "="; 
			tripNumObj["logic"]       = "N/A"; 
			itemFilters[ index ] = tripNumObj;
			index += 1;
			
			var tripSuppObj:Object = new Object();
			tripSuppObj["field"]       = "MSITM_SHLSSUPP"; 
			tripSuppObj["value"]       = String(view.mainList.selectedItem.payload.SUPPLIER_CODE); 
			tripSuppObj["type"]        = "STRING"; 
			tripSuppObj["format"]      = ""; 
			tripSuppObj["delimiter"]   = "N/A"; 
			tripSuppObj["operator"]    = "="; 
			tripSuppObj["logic"]       = "N/A"; 
			itemFilters[ index ] = tripSuppObj;
			index += 1;
			
			var itemFilterObj:Object = new Object();
			itemFilterObj["logicalOps"] = "AND"; 
			itemFilterObj["filters"] = itemFilters;
			
			view.itemList.dataProvider = new dmMovementScheduleItems( {groupFilters: itemFilterObj} );
			
			
			if ( view.mainList.selectedItem.payload.STATUS == "D" || view.mainList.selectedItem.payload.STATUS == "E" )
			{
				view.btnBolView.enabled = true;
				view.btnBolPrint.enabled = true;
				view.btnLoadReport.enabled = true;
				
				view.btnTransaction.enabled = true;
				view.btnReverseTrip.enabled = this.canCreate;// true;
				view.btnMakeTransaction.enabled = false;
			}
			else
			{
				if ( view.mainList.selectedItem.payload.STATUS == "A" )
				{
					view.btnBolView.enabled = this.canUpdate;// true;
					view.btnBolPrint.enabled = this.canUpdate;// true;
					view.btnLoadReport.enabled = false;
					
					view.btnTransaction.enabled = true;
					view.btnReverseTrip.enabled = false;
					view.btnMakeTransaction.enabled = this.canCreate;
				}
				else
				{
					view.btnBolView.enabled = false;
					view.btnBolPrint.enabled = false;
					view.btnLoadReport.enabled = false;
					
					view.btnTransaction.enabled = false;
					view.btnReverseTrip.enabled = false;
					if ( view.mainList.selectedItem.payload.STATUS == "F" )
					{
						view.btnMakeTransaction.enabled = this.canCreate;
					}
					else
					{
						view.btnMakeTransaction.enabled = false;
					}
				}
			}
		}
		
		
		public function keyUpHandler(event:KeyboardEvent):void
		{
			if ( event != null && event.keyCode == 13 )
			{
				refreshMainFilterOnChange();
			}
		}
		
		public function refreshMainFilterOnChange():void
		{
			view.mainList.navigator = null;
			view.mainList.navigator = new dmNavigator( 0, view.mainList.pageSize );
			//view.mainList.currData = 0;
			//view.mainList.currPage = 0;
			this.refreshMainFilter();
		}
		
		public function refreshMainFilter():void
		{
			view.mainList.enabled = false;
			this.addDateTimeListener();
			
			if( view.currentState!='widget' )
			{
				view.currentState = 'normal';
			}
			
			trace("**************** refreshMainFilter");
			/*
			* groupFilters : {
			*      "logicalOps"     : "AND" | "OR" | "( {0} AND {1} AND ( {2} OR {3}) )"
			* 
			* 		"filters" : {
			*         0: {
			*               "field"      : "field name|field1,field2,..."
			*               "value"      : "field value: x|x~|x~y|~y"
			*               "type"       : "field data type:NUMBER|STRING|DATETIME|BINARY"
			*               "format"     : "format pattern for the field value"
			*               "delimiter"  : "delimiter for range: N/A|~"
			*               "operator"   : "operator for filter: =|>=~<|like|is not"
			*               "logic"      : "N/A|AND|OR"
			*          },
			*        1:  {
			*               "field"      : "field name|field1,field2,..."
			*               "value"      : "field value: x|x~|x~y|~y"
			*               "type"       : "field data type:NUMBER|STRING|DATETIME|BINARY"
			*               "format"     : "format pattern for the field value"
			*               "delimiter"  : "delimiter for range: N/A|~"
			*               "operator"   : "operator for filter: =|>=~<=|like|is not"
			*               "logic"      : "N/A|AND|OR"
			*          },
			*          ......
			* 		}
			* 
			* }
			* 
			*/
			
			var filters:Object = new Object();
			var index:int = 0;
			
			/*
			*               "field"      : "field name|field1,field2,..."
			*               "value"      : "field value: x|x~|x~y|~y"
			*               "type"       : "field data type:NUMBER|STRING|DATETIME|BINARY"
			*               "format"     : "format pattern for the field value"
			*               "delimiter"  : "delimiter for range: N/A|~"
			*               "operator"   : "operator for filter: =|>=~<|like|is not"
			*               "logic"      : "N/A|AND|OR"
			*/
			
			
			if ( view.fltTerminal.selectedIndex >= 0 )
			{
				var terminalObj:Object = new Object();
				terminalObj["field"]     = "SHLS_TERMINAL"; 
				terminalObj["value"]     = String(view.fltTerminal.selectedItem.TERM_CODE); 
				terminalObj["type"]      = "STRING"; 
				terminalObj["format"]    = ""; 
				terminalObj["delimiter"] = "N/A"; 
				terminalObj["operator"]  = "="; 
				terminalObj["logic"]     = "N/A"; 
				filters[ index ] = terminalObj;
				index += 1;
			}
			if ( view.currentState=="normal" && view.fltNominationType.selectedIndex >= 0 )
			{
				var itemTypeObj:Object = new Object();
				itemTypeObj["field"]       = "MV_ID"; 
				itemTypeObj["value"]       = " (select MVITM_MOVE_ID from MOVEMENT_ITEMS where MVITM_TYPE="+String(view.fltNominationType.selectedIndex)+") "; 
				itemTypeObj["type"]        = "NUMBER"; 
				itemTypeObj["format"]      = ""; 
				itemTypeObj["delimiter"]   = "N/A"; 
				itemTypeObj["operator"]    = " IN "; 
				itemTypeObj["logic"]       = "N/A"; 
				filters[ index ] = itemTypeObj;
				index += 1;
				//filterObj[] = {"fields": "MV_TYPE", "equality":"exact"};
			}
			if ( view.fltNominationKey.text.length > 0 )
			{
				var movNumberObj:Object = new Object();
				movNumberObj["field"]       = "MV_KEY"; 
				movNumberObj["value"]       = String(view.fltNominationKey.text); 
				movNumberObj["type"]        = "STRING"; 
				movNumberObj["format"]      = ""; 
				if ( view.fltNominationKey.text.search("~") < 0 )
				{
					movNumberObj["delimiter"]   = "N/A"; 
					movNumberObj["operator"]    = "LIKE"; 
				}
				else
				{
					movNumberObj["delimiter"]   = "~"; 
					movNumberObj["operator"]    = ">=~<="; 
				}
				movNumberObj["logic"]       = "N/A"; 
				filters[ index ] = movNumberObj;
				index += 1;
			}
			if ( view.currentState=="normal" && view.fltNominationItem.text.length > 0 )
			{
				var nomItemKeyObj:Object = new Object();
				//nomItemKeyObj["field"]       = "MV_ID"; 
				//nomItemKeyObj["value"]       = " (select MVITM_MOVE_ID from MOVEMENT_ITEMS where ((TO_CHAR(MVITM_ITEM_KEY) like '%"+view.fltNominationItem.text+"%') or (TO_CHAR(MVITM_ITEM_ID) like '%"+view.fltNominationItem.text+"%') or (TO_CHAR(MVITM_LINE_ID) like '%"+view.fltNominationItem.text+"%')) ) "; 
				nomItemKeyObj["field"]       = "SHLS_TRIP_NO"; 
				nomItemKeyObj["value"]       = " (select msi.MSITM_SHLSTRIP from MOV_SCHD_ITEMS msi, MOVEMENT_ITEMS mvi where msi.MSITM_SHLSSUPP=SUPPLIER_CODE and msi.MSITM_MOVEID=mvi.MVITM_MOVE_ID and msi.MSITM_MOVITEM=mvi.MVITM_LINE_ID and ((TO_CHAR(mvi.MVITM_ITEM_KEY) like '%"+view.fltNominationItem.text+"%') or (TO_CHAR(mvi.MVITM_ITEM_ID) like '%"+view.fltNominationItem.text+"%') or (TO_CHAR(MVITM_LINE_ID) like '%"+view.fltNominationItem.text+"%'))) "; 
				nomItemKeyObj["type"]        = "NUMBER"; 
				nomItemKeyObj["format"]      = ""; 
				nomItemKeyObj["delimiter"]   = "N/A"; 
				nomItemKeyObj["operator"]    = " IN "; 
				nomItemKeyObj["logic"]       = "N/A"; 
				filters[ index ] = nomItemKeyObj;
				index += 1;
				//filterObj[] = {"fields": "MV_TYPE", "equality":"exact"};
			}
			if ( view.currentState=="normal" && view.fltSupplier.selectedIndex >= 0 )
			{
				var supplierObj:Object = new Object();
				supplierObj["field"]     = "SUPPLIER_CODE"; 
				supplierObj["value"]     = String(view.fltSupplier.selectedItem.CMPY_CODE); 
				supplierObj["type"]      = "STRING"; 
				supplierObj["format"]    = ""; 
				supplierObj["delimiter"] = "N/A"; 
				supplierObj["operator"]  = "="; 
				supplierObj["logic"]     = "N/A"; 
				filters[ index ] = supplierObj;
				index += 1;
			}
			if ( view.currentState=="normal" && view.fltDrawer.selectedIndex >= 0 )
			{
				var drawerObj:Object = new Object();
				drawerObj["field"]     = "DRAWER_CODE"; 
				drawerObj["value"]     = String(view.fltDrawer.selectedItem.CMPY_CODE); 
				drawerObj["type"]      = "STRING"; 
				drawerObj["format"]    = ""; 
				drawerObj["delimiter"] = "N/A"; 
				drawerObj["operator"]  = "="; 
				drawerObj["logic"]     = "N/A"; 
				filters[ index ] = drawerObj;
				index += 1;
			}
			if ( view.fltTripNumber.text.length > 0 )
			{
				var tripNumberObj:Object = new Object();
				tripNumberObj["field"]       = "SHLS_TRIP_NO"; 
				tripNumberObj["value"]       = String(view.fltTripNumber.text); 
				tripNumberObj["type"]        = "STRING"; 
				tripNumberObj["format"]      = ""; 
				if ( view.fltTripNumber.text.search("~") < 0 )
				{
					tripNumberObj["delimiter"]   = "N/A"; 
					tripNumberObj["operator"]    = "LIKE"; 
					if ( view.fltTripNumber.text.search(",") >= 0 )
					{
						tripNumberObj["operator"]    = "LIKE2"; 
					}
				}
				else
				{
					tripNumberObj["delimiter"]   = "~"; 
					tripNumberObj["operator"]    = ">=~<="; 
				}
				tripNumberObj["logic"]       = "N/A"; 
				filters[ index ] = tripNumberObj;
				index += 1;
			}
			if ( view.currentState=="normal" && view.fltTripStatus.selectedIndex >= 0 )
			{
				var tripStatusObj:Object = new Object();
				tripStatusObj["field"]     = "SHLS_STATUS"; 
				tripStatusObj["value"]     = String(view.fltTripStatus.selectedItem.STATUS_TEXT); 
				tripStatusObj["type"]      = "STRING"; 
				tripStatusObj["format"]    = ""; 
				tripStatusObj["delimiter"] = "N/A"; 
				tripStatusObj["operator"]  = "="; 
				tripStatusObj["logic"]     = "N/A"; 
				filters[ index ] = tripStatusObj;
				index += 1;
			}
			if ( view.currentState=="normal" && view.fltCarrier.selectedIndex >= 0 )
			{
				var carrierObj:Object = new Object();
				carrierObj["field"]     = "CARRIER_CODE"; 
				carrierObj["value"]     = String(view.fltCarrier.selectedItem.CMPY_CODE); 
				carrierObj["type"]      = "STRING"; 
				carrierObj["format"]    = ""; 
				carrierObj["delimiter"] = "N/A"; 
				carrierObj["operator"]  = "="; 
				carrierObj["logic"]     = "N/A"; 
				filters[ index ] = carrierObj;
				index += 1;
			}
			if ( view.currentState=="normal" && view.fltVehicle.selectedIndex >= 0 )
			{
				var vehicleObj:Object = new Object();
				vehicleObj["field"]     = "TNKR_CODE"; 
				vehicleObj["value"]     = String(view.fltVehicle.selectedItem.TNKR_CODE); 
				vehicleObj["type"]      = "STRING"; 
				vehicleObj["format"]    = ""; 
				vehicleObj["delimiter"] = "N/A"; 
				vehicleObj["operator"]  = "="; 
				vehicleObj["logic"]     = "N/A"; 
				filters[ index ] = vehicleObj;
				index += 1;
			}
			
			
			if ( view.currentState=="normal" )
			{
				var rangeObj:Object = new Object();
				rangeObj["field"]       = "SHLS_CALDATE"; 
				if ( (view.fltTimeFrom.selectedDate !=null) && (view.fltTimeTo.selectedDate != null) ) 
				{
					rangeObj["value"]       = longDateConvert.format(view.fltTimeFrom.selectedDate) + "~" + longDateConvert.format(view.fltTimeTo.selectedDate); 
				}
				else
				{
					if ( (view.fltTimeFrom.selectedDate ==null) && (view.fltTimeTo.selectedDate == null) ) 
					{
						rangeObj["value"]       = "~"; 
					}
					else if ( view.fltTimeFrom.selectedDate ==null ) 
					{
						rangeObj["value"]       = "~" + longDateConvert.format(view.fltTimeTo.selectedDate); 
					}
					else if ( view.fltTimeTo.selectedDate == null ) 
					{
						rangeObj["value"]       = longDateConvert.format(view.fltTimeFrom.selectedDate) + "~"; 
					}
					else 
					{
						rangeObj["value"]       = "~"; 
					}
				}
				//rangeObj["type"]        = "DATETIME"; 
				rangeObj["type"]        = "STRING"; 
				rangeObj["format"]      = ""; 
				rangeObj["delimiter"]   = "~"; 
				rangeObj["operator"]    = ">=~<"; 
				rangeObj["logic"]       = "OR"; 
				if ( rangeObj["value"] != "~" )
				{
					filters[ index ] = rangeObj;
					index += 1;
				}
			}
			
			var filterObj:Object = new Object();
			filterObj["logicalOps"] = "AND"; //"( {0} AND {1} AND ( {2} OR {3}) )"; 
			filterObj["filters"] = filters;
			
			tools.pr(filterObj);
			
			var pageSize: int = view.mainList.navigator.rowsPerPage;
			var totalCount:int = view.mainList.navigator.totalRecords;
			var pos: int = (view.mainList.navigator.currRecord);
			//var seek: int = (view.mainList.navigator.currRecord - 1);
			var seek: int = (view.mainList.navigator.currPage - 1) * pageSize;
			if ( seek < 0 )
			{
				seek = 0;
			}
			/*			
			var pageSize: int = view.mainList.pageSize;
			var totalCount:int = view.mainList.dataSize;
			var pos: int = (view.mainList.currData);
			var seek: int = (view.mainList.currPage) * pageSize;
			*/			
			
			this.orderCollection = new ArrayCollection( view.mainList.orderCollection.source );
			DM.MovementSchedules.populate( {groupFilters: filterObj, orders:this.orderCollection.toArray(), needFetchLists:false, 
				pageSize:pageSize, seek:seek, pos:pos} );
			
			tools.pr(orderCollection.toArray());
			view.mainList.enabled = true;
			
		}
		
		public function clearFilter(e:Event = null)
		{
			if ( view.currentState != "widget" )
			{
				view.currentState = 'normal';
				view.mainList.enabled=true;
			}
			
			view.fltTerminal.selectedIndex = -1;
			view.fltNominationKey.text = "";
			view.fltTripNumber.text = "";
			
			if ( view.currentState != "widget" )
			{
				view.fltSupplier.selectedIndex = -1;
				view.fltDrawer.selectedIndex = -1;
				view.fltCarrier.selectedIndex = -1;
				view.fltVehicle.selectedIndex = -1;
				
				view.fltTripStatus.selectedIndex = -1;
				view.fltNominationType.selectedIndex = -1;
				view.fltNominationItem.text = "";
				view.fltTimeFrom.selectedDate = null;
				view.fltTimeTo.selectedDate = null;
			}
			
			this.refreshMainFilterOnChange();			
			
			//DM.MovementSchedules.reload();
		}
		
		public function convertDateToLocaleString(dt:String):String
		{
			var dt_string:String;
			var dt_date:Date = new Date();
			
			dt_string = ""; 
			if ((dt!=null) && (dt!='null') && (dt!=''))
			{
				dt_date = DateField.stringToDate(dt,"YYYY-MM-DD");
				dt_string = this.dateFormatter.format( dt_date);
			}
			//trace ("convertDateToLocale", dt, dt_date, dt_string);
			return dt_string;
		}
		
		public function convertDateToLocale(dt:String):Date
		{
			var dt_date:Date = new Date();
			
			if ((dt!=null) && (dt!='null') && (dt!=''))
			{
				dt_date = DateField.stringToDate(dt,"YYYY-MM-DD");
			}
			//trace ("convertDateToLocale", dt, dt_date, dt_string);
			return dt_date;
		}
		
		public function getDefaultDate():Date
		{
			var now_date:Date;
			var def_date:Date;
			
			now_date = new Date();
			def_date = DateTimeFunc.dateAdd( "yyyy", 1, now_date );
			
			//trace ("getDefaultDate", now_date, def_date);
			
			return def_date;
		}
		
		public function markCreation():void
		{
			// will create a new line in data grid for update and save
			var count:int;
			
			//count = view.itemList.dataProvider.length;
			count = view.itemList.dataProviderLength;
/*			
			var obj:Object = new Object();
			
			obj.MVITM_KEY = view.frmKey.text;
			obj.MVITM_LINE_ID = count+1;
			obj.MVITM_TERMINAL = view.frmTerminal.selectedItem.TERM_CODE;
			obj.MVITM_TYPE = 0;
			obj.MVITM_ITEM_KEY = "";
			obj.MVITM_STATUS = 0;
			obj.MVITM_PROD_QTY = 0;
			obj.MVITM_PROD_UNIT = 5;
			obj.MVITM_PRODCMPY_FROM = "";
			obj.MVITM_PRODCODE_FROM = "";
			obj.MVITM_PRODNAME_FROM = "";
			obj.MVITM_TANK_FROM = "";
			obj.MVITM_PRODCMPY_TO = "";
			obj.MVITM_PRODCODE_TO = "";
			obj.MVITM_PRODNAME_TO = "";
			obj.MVITM_TANK_TO = "";
			obj.MVITM_COMMENTS = "";
			obj.MVITM_QTY_SCHD = 0;
			obj.MVITM_QTY_MOVE = 0;
			obj.MVITM_QTY_DELV = 0;
			
			var newItem:dmMovementScheduleItem = new dmMovementScheduleItem
				({
					onSuccess 	: successInItemAction,
					payload		: obj
				});
			
			view.itemList.dataProvider.addItem( newItem );
			
			view.itemList.dataProvider[count].action = "+";
			
			view.itemList.invalidateCell( count, -1 );
*/			
		}
		
		public function markEdition():void
		{
			if ( view.itemList.selectedIndex < 0 )
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVSCHD.MESSAGE.PLS_SEL_LINE_EDIT') );
			}
			else if ( view.itemList.selectedItem.clnItemAction == "+" )
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVSCHD.MESSAGE.CANNOT_UPD_NEW_LINE') );
			}
			else
			{
				view.itemList.selectedItem.clnItemAction = "*";	
				var i:int = view.itemList.selectedIndex;
				view.itemList.invalidateCell(i, 0);
				trace ("***********edit**********view.itemList.selectedItem.clnItemAction", view.itemList.selectedItem.clnItemAction);
				trace ("***********edit**********view.itemList.dataProvider[i].action", i, view.itemList.dataProvider[i].action);
			}
		}
		
		public function markDeletion():void
		{
			if ( view.itemList.selectedIndex < 0 )
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVSCHD.MESSAGE.PLS_SEL_LINE_DEL') );
			}
			else if ( view.itemList.selectedItem.clnItemAction == "+" )
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVSCHD.MESSAGE.CANNOT_DEL_NEW_LINE') );
			}
			else if ( view.itemList.dataProvider[view.itemList.selectedIndex].payload.MVITM_STATUS  > 0 )
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVSCHD.MESSAGE.CANNOT_DEL_CURR_LINE') );
			}
			else
			{
				view.itemList.selectedItem.clnItemAction = "-";	
				var i:int = view.itemList.selectedIndex;
				view.itemList.invalidateCell(i, 0);
				trace ("***********delete**********view.itemList.selectedItem.clnItemAction", view.itemList.selectedItem.clnItemAction);
				trace ("***********delete**********view.itemList.dataProvider[i].action", i, view.itemList.dataProvider[i].action, view.itemList.columns);
			}
		}
		
		public function markCancel():void
		{
			if ( view.itemList.selectedIndex < 0 )
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVSCHD.MESSAGE.PLS_SEL_LINE_UNDO') );
			}
			else if ( view.itemList.selectedItem.clnItemAction == "+" )
			{
				view.itemList.dataProvider.removeItemAt( view.itemList.selectedIndex );
				view.itemList.invalidateDisplayList();
			}
			else
			{
				view.itemList.selectedItem.clnItemAction = "";	
				var i:int = view.itemList.selectedIndex;
				view.itemList.invalidateCell(i, 0);
				trace ("***********cancel**********view.itemList.selectedItem.clnItemAction", view.itemList.selectedItem.clnItemAction);
				trace ("***********cancel**********view.itemList.dataProvider[i].action", i, view.itemList.dataProvider[i].action);
			}
		}
		
	
		public function goToTransaction():void
		{
/*
			if ( view.itemList.selectedIndex < 0 )
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','global.msg.selecttrip4transaction') );
			}
			else
			{
				trace ( "*******************Pop up a screen to make manual transactions!");
				transactionPopup.openDialog();
				transactionPopup.setParams( view.itemList.selectedItem.payload.MSITM_SHLSTRIP, view.itemList.selectedItem.payload.MSITM_SHLSSUPP );
			}
*/
			trace ( "*******************Pop up a screen to make manual transactions!");
			transactionPopup.openDialog();
			var params:Object = new Object();
			//params["supplier"] = view.mainList.selectedItem.payload.SUPPLIER_CODE;
			//params["trip"] = view.mainList.selectedItem.payload.SHLS_TRIP_NO;
			//params["drawer"] = view.mainList.selectedItem.payload.drawer_code;
			//params["carrier"] = view.mainList.selectedItem.payload.carrier_code;
			//params["driver"] = view.mainList.selectedItem.payload.driver;
			params["supplier"] = view.frmSupplier.selectedItem.CMPY_CODE;
			params["trip"] = view.frmTripNumber.text;
			params["drawer"] = view.frmDrawer.selectedItem.CMPY_CODE;
			params["carrier"] = view.frmCarrier.selectedItem.CMPY_CODE;
			params["driver"] = null;
			transactionPopup.setParams(params);
		}
		
		
		public function closeDialogHandler():void
		{
			this.mainListSelection = view.mainList.selectedIndex;
			view.currentState = "normal";
			DM.MovementSchedules.resultHandler = mainListRefreshHandler;
			this.refreshMainFilter();
		}
		
		public function mainListRefreshHandler():void
		{
			trace("..................................mainListSelection in mainListRefreshHandler:", view.mainList.selectedIndex, this.mainListSelection);
			view.mainList.selectedIndex = this.mainListSelection;
			this.editSelected();
			
			if ( view.mainList.selectedIndex >= 0 )
			{
				if ( view.itemList.dataProvider != null )
				{
					if ( view.itemList.dataProvider.hasEventListener( CollectionEvent.COLLECTION_CHANGE ) )
					{
						view.itemList.dataProvider.removeEventListener( CollectionEvent.COLLECTION_CHANGE, itemListRefreshHandler );
					}
					view.itemList.dataProvider.addEventListener( CollectionEvent.COLLECTION_CHANGE, itemListRefreshHandler);
				}
			}
			//this.mainListSelection = -1;
		}
		
		public function itemListRefreshHandler(event:CollectionEvent):void
		{
			trace("..................................mainListSelection in itemListRefreshHandler:", view.mainList.selectedIndex, this.mainListSelection);
			view.mainList.selectedIndex = this.mainListSelection;
			this.mainListSelection = -1;
		}
		
		public function goToMakeTransaction():void
		{
			/*
			if ( view.itemList.selectedIndex < 0 )
			{
			var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.SELECT_LINE_TO_MAKE_TRNS') );
			}
			else
			{
			trace ( "*******************Pop up a screen to make manual transactions!");
			transactionPopup.openDialog();
			transactionPopup.setParams( view.itemList.selectedItem.payload.MSITM_SHLSTRIP, view.itemList.selectedItem.payload.MSITM_SHLSSUPP );
			}
			*/
			
			this.makeTransactionPopup.popupTitle = mx.resources.ResourceManager.getInstance().getString('default','MOVSCHD.TITLE.MT4NOMSCHD');
			this.makeTransactionPopup.setSecurity( this.readOnly, this.canUpdate, this.canCreate, this.canDelete, this.hasPassword );
			
			this.makeTransactionPopup.parentWidth = this.view.width;
			this.makeTransactionPopup.parentHeight = this.view.height;
			
			trace ( "*******************Pop up a screen to make manual transactions!");
			makeTransactionPopup.openDialog();
			
			var params:Object = new Object();
			//params["supplier"] = view.mainList.selectedItem.payload.SUPPLIER_CODE;
			//params["trip"] = view.mainList.selectedItem.payload.SHLS_TRIP_NO;
			params["supplier"] = view.frmSupplier.selectedItem.CMPY_CODE;
			params["trip"] = view.frmTripNumber.text;
			params["repost"] = false;
			params["transType"] = 2;//0; //"N";
			params["movItemId"] = view.fltNominationItem.text;
			
			makeTransactionPopup.setFilters( params );
		}
		
		public function toggleCellEditability(event:GridEvent)
		{
			if ( event.rowIndex < 0 || event.columnIndex < 0 || event.rowIndex > view.itemList.dataProviderLength-1)
			{
				trace ("***********current cell, out of range:", event.columnIndex, event.rowIndex);
				return;	
			}
			
			var i:int;
			var cln:GridColumn;
			for ( i=0; i<view.itemList.columns.length; i++ )
			{
				cln = (view.itemList.columns.getItemAt(i) as GridColumn);
				//trace ("***********current row action:", event.rowIndex, ">>"+view.itemList.dataProvider[event.rowIndex].action+"<<");
				
				// if  no action is initialized, not editable
				if ( view.itemList.dataProvider[event.rowIndex].action == "" 
					|| view.itemList.dataProvider[event.rowIndex].action == " " 
					|| view.itemList.dataProvider[event.rowIndex].action == "-" )
				{
					cln.editable = false;
					continue;
				}
				
				// if  status is not NEW, not editable
				if (  view.itemList.dataProvider[event.rowIndex].payload.MVITM_STATUS > 0  )
				{
					cln.editable = false;
					continue;
				}
				
				if ( i != event.columnIndex )
				{
					cln.editable = false;
					
					//trace ("***********current cell, in the range:***", event.columnIndex, event.rowIndex, cln.dataField, cln.editable);
				}
				else
				{
					if ( view.itemList.dataProvider[event.rowIndex].payload.MVITM_TYPE == 0 )
					{
						if ( cln.dataField == "clnItemPlantFrom" 
							|| cln.dataField == "clnItemSupplierFrom" 
							|| cln.dataField == "clnItemProductFrom" 
							|| cln.dataField == "clnItemTankFrom" )
						{
							cln.editable = false;
							view.itemList.selectedItem[cln.dataField] = "";
							view.itemList.invalidateCell(event.rowIndex, i);
						}
						else
						{
							cln.editable = true;
						}
					}
					else if ( view.itemList.dataProvider[event.rowIndex].payload.MVITM_TYPE == 1 )
					{
						if ( cln.dataField == "clnItemPlantTo" 
							|| cln.dataField == "clnItemSupplierTo" 
							|| cln.dataField == "clnItemProductTo" 
							|| cln.dataField == "clnItemTankTo" )
						{
							cln.editable = false;
							view.itemList.selectedItem[cln.dataField] = "";
							view.itemList.invalidateCell(event.rowIndex, i);
						}
						else
						{
							cln.editable = true;
						}
					}
					else
					{
						cln.editable = true;
					}
					
					if ( cln.dataField == "clnItemAction" 
						|| cln.dataField == "clnItemLine" 
						|| cln.dataField == "clnItemId" 
						|| cln.dataField == "clnItemTerminal" 
						|| cln.dataField == "clnItemStatus"
						|| cln.dataField == "clnItemQtySchd"
						|| cln.dataField == "clnItemQtyMove"
						|| cln.dataField == "clnItemQtyDelv"
					)
					{
						cln.editable = false;
					}
					
					trace ("***********current cell, in the range:!!!", event.columnIndex, event.rowIndex, cln.dataField, cln.editable);
					
				}
			}
		}
		
		public function isTripKeyUsed():void
		{
			var obj:Object = new Object();
			obj.field = "SHLS_TRIP_NO";
			obj.value = view.frmTripNumber.text;
			
			var Server:*;
			Server = new amf(global.AppServicesConfig.gatewayURL);
			Server.service('dmMovementSchedules.getNumberOfRecords', obj, checkTripKeyUsed);
		}
		
		public function checkTripKeyUsed( response : * ):void
		{
			var num:int = response.data;
			
			if ( num > 0 )
			{
				tripKeyUsed = true;
			}
			else
			{
				tripKeyUsed = false;
			}
		}
		
		public function bolView_clickHandler(event:MouseEvent):void
		{
			var urlStr:String = "/phpwrapper/bill_of_lading_popup.php?";
			urlStr += "tankTerm="+ view.frmTerminal.selectedItem.TERM_CODE+"&supp="+ view.frmSupplier.selectedItem.CMPY_CODE+"&";
			urlStr += "tripNo="+ view.frmTripNumber.text+"&rpt_type=0&ftsize=16&forms=1&rows=1";
			view.currentState="bol";
			view.frme.source=urlStr;
		}
		
		public function bolPrint_clickHandler(event:MouseEvent):void
		{
			var urlStr:String = "/phpwrapper/bill_of_lading_popup.php?";
			urlStr += "tankTerm="+view.frmTerminal.selectedItem.TERM_CODE+"&supp="+view.frmSupplier.selectedItem.CMPY_CODE+"&";
			urlStr += "tripNo="+view.frmTripNumber.text+"&tanker="+ view.frmVehicle.selectedItem.TNKR_CODE+"&op=18";
			
			//if (itc.selected) urlStr += "&supermode=on";
			var viewService:HTTPService = new HTTPService();
			viewService.url = urlStr;
			viewService.resultFormat="text";
			viewService.method="POST";
			viewService.addEventListener(FaultEvent.FAULT,onBolFault);
			viewService.addEventListener(ResultEvent.RESULT,onBolResult);
			viewService.send();
		}
		
		public function onBolFault(event:FaultEvent):void
		{
			global.msgFail( mx.resources.ResourceManager.getInstance().getString('default','MOVSCHD.MESSAGE.FAIL_PRINT_BOL') );
		}
		
		public function onBolResult(event:ResultEvent):void
		{
			var ss:String= event.result as String;
			var i:int =	ss.search("var op=28");
			if (i > 0)
				global.msgSuccess( mx.resources.ResourceManager.getInstance().getString('default','MOVSCHD.MESSAGE.SUCC_PRINT_BOL') );
			else
				global.msgFail( mx.resources.ResourceManager.getInstance().getString('default','MOVSCHD.MESSAGE.FAIL_PRINT_BOL') );
		}
		
		public function loadView_clickHandler(event:MouseEvent):void
		{
			var urlStr:String = "/phpwrapper/bill_of_lading_popup.php?";
			urlStr += "tankTerm="+view.frmTerminal.selectedItem.TERM_CODE+"&supp="+view.frmSupplier.selectedItem.CMPY_CODE+"&";
			urlStr += "tripNo="+view.frmTripNumber.text+"&rpt_type=1&ftsize=15&forms=1&rows=1";
			view.currentState="bol";
			view.frme.source=urlStr;
		}
		
	}
}