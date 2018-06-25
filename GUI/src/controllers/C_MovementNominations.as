package controllers
{
	import com.adobe.fiber.runtime.lib.DateTimeFunc;
	
	import components.DeleteDialog;
	import components.ErrorDialog;
	import components.ExportData;
	import components.MessageArea;
	import components.MessageDialog;
	import components.MovScheduleCreateDlg;
	import components.TransactionsDlg;
	import components.ViewPopupDlg;
	
	import dm.DM;
	import dm.collections.dmMovementItems;
	import dm.comms.amf;
	import dm.models.dmModel;
	import dm.models.dmMovement;
	import dm.models.dmMovementItem;
	import dm.remoteDataService;
	import dm.utils.dmNavigator;
	import dm.utils.tools;
	
	import flash.display.DisplayObject;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.globalization.LocaleID;
	import flash.net.FileReference;
	import flash.ui.Keyboard;
	
	import mx.collections.ArrayCollection;
	import mx.collections.errors.ItemPendingError;
	import mx.controls.DateField;
	import mx.core.FlexGlobals;
	import mx.events.CollectionEvent;
	import mx.events.FlexEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	import mx.utils.StringUtil;
	
	import renderers.DKI_HeaderColumn_Renderer;
	
	import spark.components.gridClasses.GridColumn;
	import spark.components.gridClasses.IGridItemRenderer;
	import spark.events.GridEvent;
	import spark.formatters.DateTimeFormatter;
	
	import views.v_MovementNominationTransactions;
	import views.v_MovementNominations;
	import views.v_MovementSchedules;
	
	public class C_MovementNominations
	{
		private var errorDialog:ErrorDialog;
		[Bindable] public var readOnly:Boolean = false;
		[Bindable] public var canUpdate:Boolean = false;
		[Bindable] public var canCreate:Boolean = false;
		[Bindable] public var canDelete:Boolean = false;
		[Bindable] public var hasPassword:Boolean = false;
		
		[Bindable] public static var MOVEMENT_KEY_TEXT:String="";
		[Bindable] public static var MOVEMENT_NUMBER_TEXT:String="";
		[Bindable] public static var MOVEMENT_SITE_INDEX:int= -1;
		[Bindable] public static var MOVEMENT_ITEMTYPE_INDEX:int= -1;
		[Bindable] public static var MOVEMENT_SOURCE_INDEX:int= -1;
		[Bindable] public static var MOVEMENT_STATUS_INDEX:int= -1;
		[Bindable] public var typicalItems:Object = {
				clnMovId:"1234567890",
				clnMovTerminal:"1234567812345678",
				clnMovNumber:"1234567890",
				clnMovKey:"12345678901234567890",
				clnMovSource:"ABCDEFGHILJKL",
				clnMovStatus:"NNNNNNNN",
				clnMovDtimEffect:"NN/NN/NNNN NN:NN:NN",
				clnMovDtimExpiry:"NN/NN/NNNN NN:NN:NN",
				clnMovDtimCreate:"NN/NN/NNNN NN:NN:NN",
				clnMovDtimChange:"NN/NN/NNNN NN:NN:NN",
				clnMovOperChange:"1234567812345678"
			};

		public var dateFormatter:DateTimeFormatter;
		public var longDateConvert:DateTimeFormatter;
		public var shortDateConvert:DateTimeFormatter;
		
		public var toggleItemFlagClicked:Boolean=false;
		
		public var mvKeyUsed:Boolean = false;
		public var mvNumUsed:Boolean = false;
		public var mvItemKeyUsed:Boolean = false;
		public var mvItemKeyUsedIndex:int = -1;
		
		public var uniqueCheckSum:int = 0;
		public var uniqueCheckTotal:int = 0;
		
		public var mainListSelection:int = -1;
		public var refreshLists:Boolean=false;
		public var requestMode:int=1;
		
		public var temp_site_index:int;
		public var temp_source_index:int;
		public var temp_status_index:int;
		public var temp_itemtype_index:int;
		
		
		[Bindable] public var view:v_MovementNominations;
		
		public var mapObj:Object = { "clnMovId":"MV_ID", "clnMovTerminal":"MV_TERMINAL", "clnMovNumber":"MV_NUMBER", "clnMovKey":"MV_KEY", "clnMovSource":"MV_SRCTYPE", "clnMovStatus":"MV_STATUS", "clnMovDtimEffect":"MV_DTIM_EFFECT", "clnMovDtimExpiry":"MV_DTIM_EXPIRY", "clnMovDtimCreate":"MV_DTIM_CREATE", "clnMovDtimChange":"MV_DTIM_CHANGE", "clnMovOperChange":"MV_OPER_CHANGE" }; 
		public var orderObj:Object = { field:'MV_ID', order:'DESC' };
		public var orderCollection:ArrayCollection = new ArrayCollection( new Array({ field:'MV_ID', order:'DESC' }));
		public var filterStack:Object = new Object();
		
		[Bindable] public var nomSiteSettingList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationSiteSetting", null, lookupNominationSiteSetting_resultHandler );
		[Bindable] public var nomTerminalList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationTerminal", null, lookupNominationTerminal_resultHandler );
		[Bindable] public var nomSupplierList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationSupplier", null, lookupNominationSupplier_resultHandler );
		[Bindable] public var nomCarrierList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationCarrier", null, lookupNominationCarrier_resultHandler );
		[Bindable] public var nomVehicleList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationVehicle", null, lookupNominationVehicle_resultHandler );
		[Bindable] public var nomPersonnelList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationPersonnel", null, lookupNominationPersonnel_resultHandler );
		[Bindable] public var nomProductUnitList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationProductUnit", null, lookupNominationProductUnit_resultHandler );
		[Bindable] public var nomPlantList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationPlant", null, lookupNominationPlant_resultHandler );
		[Bindable] public var nomDrawerList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationDrawer", null, lookupNominationDrawer_resultHandler );
		[Bindable] public var nomDrawerProductList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationDrawerProduct", null, lookupNominationDrawerProduct_resultHandler );
		[Bindable] public var nomTankList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationTank", null, lookupNominationTank_resultHandler );
		[Bindable] public var nomProductRatioList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationProductRatio", null, lookupNominationProductRatio_resultHandler );
		[Bindable] public var nomItemTypeList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationItemType", null, lookupNominationItemType_resultHandler );
		[Bindable] public var nomSourceList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationSource", null, lookupNominationSource_resultHandler );
		[Bindable] public var nomStatusList:remoteDataService = new remoteDataService( "ListLibraryService.lookupNominationStatus", null, lookupNominationStatus_resultHandler );
		

		public var transactionPopup:TransactionsDlg = new TransactionsDlg;
		public var movSchedulePopup:ViewPopupDlg = new ViewPopupDlg( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.TITLE.SCHD4NOM'), new v_MovementSchedules(), closeDialogHandler );
		public var makeTransactionPopup:ViewPopupDlg = new ViewPopupDlg( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.TITLE.MT4NOMITEM'), new v_MovementNominationTransactions(), closeDialogHandler );
		
		
		public var genReport:ExportData = new ExportData();
		[Bindable] public var ilTypicalItem:Object = {
				clnItemAction:"123", 
				clnItemLine:"Line", 
				clnItemId:"Item Id", 
				clnItemTerminal:"Terminal", 
				clnItemType:"Item Type", 
				clnItemKey:"Item     Key", 
				clnItemStatus:"Item Status", 
				clnItemProdQty:"Prod Qty", 
				clnItemProdUnit:"Prod Unit", 
				clnItemPlantFrom:"Plant   From", 
				clnItemSupplierFrom:"Supplier   From", 
				clnItemProductFrom:"Product   From", 
				clnItemTankFrom:"Tank   From", 
				clnStoreLocCmpyFrom:"From  Store  Loc  Cmpy",
				MVITM_SHIPTEXT_FROM:"From    Desc",
				MVITM_SHIPTEXT_FROM2:"From    Desc 2",
				clnItemPlantTo:"Plant    To", 
				clnItemSupplierTo:"Supplier    To", 
				clnItemProductTo:"Product    To", 
				clnItemTankTo:"Tank    To", 
				clnStoreLocCmpyTo:"To  Store  Loc  Cmpy",
				MVITM_SHIPTEXT_TO:"To   Desc",
				MVITM_SHIPTEXT_TO2:"To   Desc 2",
				clnItemComments:"Commentsssssssssssssssssss", 
				clnItemQtySchd:"Qty   Scheduled", 
				ClnItemQtyMove:"Qty   Moved", 
				ClnItemQtyDelv:"Qty    Delivered"
		}
		
		
		public function C_MovementNominations()
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
			if ( DM.MovementNominations.asynServiceCall == true )
			{
				nomSiteSettingList.service( 'N' );
				nomTerminalList.service( 'N' );
				nomSupplierList.service( 'N' );
				nomCarrierList.service( 'N' );
				nomVehicleList.service( 'N' );
				nomPersonnelList.service( 'N' );
				nomProductUnitList.service( 'N' );
				nomPlantList.service( 'N' );
				nomDrawerList.service( 'N' );
				nomDrawerProductList.service( 'N' );
				nomTankList.service( 'N' );
				nomProductRatioList.service( 'N' );
				nomItemTypeList.service( 'N' );
				nomSourceList.service( 'N' );
				nomStatusList.service( 'N' );
			}
			
			this.addDateTimeListener();
			
			view.mainList.mapObj = this.mapObj;
			view.mainList.orderCollection = new ArrayCollection( this.orderCollection.source );
			
			if ( view.currentState == "normal" )
			{
				this.refreshLists = true;
				this.requestMode = 3;
				
				view.btnCreate.enabled = false;
				view.btnCreate.visible = false;
				view.btnActiveSchedule.enabled = false;
				view.btnExport.enabled = false;
				view.btnClear.enabled = false;
				view.mainList.enabled = false;
				
				DM.MovementNominations.cbfunc = setFilterValues;
				
				temp_site_index = view.fltTerminal.selectedIndex;
				temp_source_index = view.fltSource.selectedIndex;
				temp_status_index = view.fltNominationStatus.selectedIndex;
				temp_itemtype_index = view.fltNominationType.selectedIndex;
				this.refreshMainFilterOnChange();
				//this.clearFilter();
				view.mainList.enabled = false;
				
				this.refreshLists = false;
				this.requestMode = 1;
				//setFilterValues();
			}
		}
		
		private function lookupNominationSiteSetting_resultHandler():void
		{
			DM.MovementNominations.siteSettings = nomSiteSettingList;
		}
		
		private function lookupNominationTerminal_resultHandler():void
		{
			for each(var o:Object in nomTerminalList.source)
			{
				o.CODE_NAME = o.TERM_CODE + " - " + o.TERM_NAME;
			}
			DM.MovementNominations.terminals = nomTerminalList;
		}
		
		private function lookupNominationSupplier_resultHandler():void
		{
			for each(var o:Object in nomSupplierList.source)
			{
				o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
			}
			DM.MovementNominations.suppliers = nomSupplierList;
			DM.MovementNominations.suppliersFrom = nomSupplierList;
			DM.MovementNominations.suppliersTo = nomSupplierList;
		}
		
		
		private function lookupNominationCarrier_resultHandler():void
		{
			for each(var o:Object in nomCarrierList.source)
			{
				o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
			}
			DM.MovementNominations.carriers = nomCarrierList;
		}
		
		private function lookupNominationVehicle_resultHandler():void
		{
			for each(var o:Object in nomVehicleList.source)
			{
				//o.CODE_NAME = o.TNKR_CODE + " - " + o.TNKR_NAME;
				o.CODE_NAME = o.TNKR_CODE;
			}
			DM.MovementNominations.vehicles = nomVehicleList;
		}
		
		private function lookupNominationPersonnel_resultHandler():void
		{
			for each(var o:Object in nomPersonnelList.source)
			{
				o.CODE_NAME = o.PER_CODE + " - " + o.PER_NAME;
			}
			DM.MovementNominations.operators = nomPersonnelList;
		}
		
		private function lookupNominationProductUnit_resultHandler():void
		{
			for each(var o:Object in nomProductUnitList.source)
			{
				//				o.CODE_NAME = o.UNIT_ID + " - " + o.DESCRIPTION;
				o.CODE_NAME = o.DESCRIPTION;
			}
			DM.MovementNominations.prodUnits = nomProductUnitList;
		}
		
		private function lookupNominationPlant_resultHandler():void
		{
			for each(var o:Object in nomPlantList.source)
			{
				//o.CODE_NAME = o.TERM_CODE + " - " + o.TERM_NAME;
				o.CODE_NAME = o.TERM_CODE;
			}
			DM.MovementNominations.plants = nomPlantList;
			DM.MovementNominations.plantsFrom = nomPlantList;
			DM.MovementNominations.plantsTo = nomPlantList;
		}
		
		private function lookupNominationDrawer_resultHandler():void
		{
			for each(var o:Object in nomDrawerList.source)
			{
				o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
			}
			DM.MovementNominations.drawers = nomDrawerList;
			DM.MovementNominations.drawersFrom = nomDrawerList;
			DM.MovementNominations.drawersTo = nomDrawerList;
		}
		
		private function lookupNominationDrawerProduct_resultHandler():void
		{
			for each(var o:Object in nomDrawerProductList.source)
			{
				o.CODE_NAME = o.PROD_CODE + " - " + o.PROD_NAME;
			}
			DM.MovementNominations.products = nomDrawerProductList;
			DM.MovementNominations.productsFrom = nomDrawerProductList;
			DM.MovementNominations.productsTo = nomDrawerProductList;
		}
		
		private function lookupNominationTank_resultHandler():void
		{
			for each(var o:Object in nomTankList.source)
			{
				//				o.CODE_NAME = o.TANK_CODE + " - " + o.TANK_NAME;
				o.CODE_NAME = o.TANK_CODE;
			}
			DM.MovementNominations.tanks = nomTankList;
			DM.MovementNominations.tanksFrom = nomTankList;
			DM.MovementNominations.tanksTo = nomTankList;
		}
		
		private function lookupNominationProductRatio_resultHandler():void
		{
			DM.MovementNominations.ratios = nomProductRatioList;
		}
		
		
		private function lookupNominationItemType_resultHandler():void
		{
			//DM.MovementNominations.movItemTypes = nomItemTypeList;
			var arr:Array = new Array();
			for each(var o:Object in nomItemTypeList.source)
			{
				arr[int(o['MOVITEM_TYPE_ID'])] = o['MOVITEM_TYPE_NAME'];
			}
			DM.MovementNominations.movItemTypes = new ArrayCollection(arr);
		}
		
		private function lookupNominationSource_resultHandler():void
		{
			//DM.MovementNominations.movSources = nomSourceList;
			//DM.MovementNominations.movSourcesAll = nomSourceList;
			var arr:Array = new Array();
			for each(var o:Object in nomSourceList.source)
			{
				arr[int(o['MOVSOURCE_TYPE_ID'])] = o['MOVSOURCE_TYPE_NAME'];
			}
			DM.MovementNominations.movSources = new ArrayCollection(arr);
			DM.MovementNominations.movSourcesAll = new ArrayCollection(arr);
		}
		
		private function lookupNominationStatus_resultHandler():void
		{
			//DM.MovementNominations.movStatus = nomStatusList;
			var arr:Array = new Array();
			for each(var o:Object in nomStatusList.source)
			{
				arr[int(o['MOVSTATUS_TYPE_ID'])] = o['MOVSTATUS_TYPE_NAME'];
			}
			DM.MovementNominations.movStatus = new ArrayCollection(arr);
		}
		
		
		public function setFilterValues():void
		{
			view.fltTerminal.selectedIndex = temp_site_index;//MOVEMENT_SITE_INDEX;
			
			if ( view.currentState != "widget" )
			{
				view.fltSource.selectedIndex = temp_source_index;//MOVEMENT_SOURCE_INDEX;
				view.fltNominationStatus.selectedIndex = temp_status_index;//MOVEMENT_STATUS_INDEX;
				view.fltNominationType.selectedIndex = temp_itemtype_index;//MOVEMENT_ITEMTYPE_INDEX;
			}
			
			if ( view.currentState == "normal" )
			{
				view.btnCreate.visible = true;
				view.btnCreate.enabled = this.canCreate && DM.MovementNominations.csvReady;
				view.btnActiveSchedule.enabled = DM.MovementNominations.csvReady;
				view.btnExport.enabled = DM.MovementNominations.csvReady;
				//this.doPrepareCSV();
			}
			//view.btnClear.enabled = true;
			//view.mainList.enabled = true;
			
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
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.DT_FROM_GT_TO') );
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
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.DT_FROM_GT_TO') );
			}
			else
			{
				refreshMainFilterOnChange();
			}
		}
		
		protected function vehicles_filterFunc(item:Object):Boolean
		{
			if ( view.frmCarrier.selectedIndex>-1 && (item.TNKR_CARRIER == view.frmCarrier.selectedItem.CMPY_CODE || item.TNKR_OWNER == view.frmCarrier.selectedItem.CMPY_CODE) )                
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
			DM.MovementNominations.vehicles.filterFunction = vehicles_filterFunc;
			DM.MovementNominations.vehicles.refresh();
		}
		
		protected function movSources_filterFunc(item:Object):Boolean
		{
			//trace("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%----------inside movSources_filterFunc", item, item.toString());
			//tools.pr(item);
			if ( view.currentState != "create" )                
			{ 
				return true;     
			}
			else
			{
				if ( item.toString() == "Auto From HOST" || item.toString() == "Local Special Movement" )
				{
					return false;
				}
				else
				{ 
					return true;     
				}
				
			}
		}
		public function filterMovSourcesList():void
		{
			trace (".........................inside filterMovSourcesList");
			DM.MovementNominations.movSources.filterFunction = movSources_filterFunc;
			DM.MovementNominations.movSources.refresh();
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
			DM.MovementNominations.reload();
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
			
			uniqueCheckSum = 0;
			uniqueCheckTotal = 1;
//			uniqueCheckTotal = 1 + view.itemList.dataProviderLength;
			//uniqueCheckTotal = 2 + view.itemList.dataProviderLength;
			mvKeyUsed = false;
			mvNumUsed = false;
			mvItemKeyUsed = false;
			
			this.isMovementKeyUsed();
			//this.isMovementNumberUsed();
			
			var i:int;
			for (i=0; i<view.itemList.dataProviderLength; i++)
			{
//				this.isMovementItemKeyUsed( i );
			}
			
/*			var dtObj:Date = new Date();
			var dtStart:Number = dtObj.getTime();
			trace ("getTime", dtStart);
			while ( uniqueCheckSum < uniqueCheckTotal )
			{
				var dtEnd:Number = dtObj.getTime();
				if ( dtEnd - dtStart > 10*1000)
				{
					break;
				}
			}
			
			this.save_processHandler();
*/			
		}
		
		public function save_processHandler():void
		{
			trace("----------------------inside save_clickHandler");
			
			var i:int;
			var j:int;
			for (i=0; i<view.itemList.dataProviderLength; i++)
			{
				for (j=i+1; j<view.itemList.dataProviderLength; j++)
				{
					if ( view.itemList.dataProvider[i].payload.MVITM_ITEM_KEY == view.itemList.dataProvider[j].payload.MVITM_ITEM_KEY 
						&& (view.itemList.dataProvider[i].payload.MVITM_ITEM_KEY != "" && view.itemList.dataProvider[i].payload.MVITM_ITEM_KEY != null) )  
					{
						global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ITEM_KEY_DUP') + String(i+1) + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.AND_LINE') + String(j+1) + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.IS_DUPLICATED'));
						return;
					}
				}
			}
			
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
			if (view.currentState == "detail")
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
				if (view.currentState == "detail")
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
		
		public function CheckDateTimeRange():Boolean
		{
			if ( (view.frmTimeEffect.selectedDate !=null) 
				&& (view.frmTimeExpiry.selectedDate != null)
				&& (view.frmTimeEffect.selectedDate >= view.frmTimeExpiry.selectedDate) 
			)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		public function create():Boolean
		{
			if( mvKeyUsed == true )
			{
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.NOM_KEY_DUP'));
				return false;
			}
			if( mvNumUsed == true )
			{
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.NOM_NUM_DUP'));
				return false;
			}
			
			if ( this.checkItemFields() == false )
			{
				return false;
			}
			
			if ( this.CheckDateTimeRange() == false )
			{
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.DT_START_GT_END'));
				return false;
			}
			
			if(view.frmTerminal.selectedIndex == -1)
			{
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.SELECT_TERMINAL'));
				return false;
			}
/*			if(view.frmSupplier.selectedIndex == -1)
			{
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.SELECT_SUPPLIER'));
				return false;
			}
*/			if(view.frmSource.selectedIndex == -1)
			{
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.SELECT_SOURCE'));
				return false;
			}
			
			var obj:Object = new Object();
			
			obj.MV_ID                = view.frmId.text;
			obj.MV_COMMENTS          = view.frmComments.text;
			obj.MV_NUMBER            = view.frmNumber.text;
			obj.MV_KEY               = view.frmKey.text;
			
			obj.MV_TPPOINT           = view.frmTpPoint.text;
			obj.MV_TPP_TEXT          = view.frmTppText.text;
			obj.MV_TPMODE            = view.frmTpMode.text;
			obj.MV_TPMODE_TEXT       = view.frmTpmText.text;
			obj.MV_TPSYSTEM          = view.frmTpSystem.text;
			
			//obj.MV_DTIM_EFFECT                = view.frmTimeEffect.dateText.text;
			//obj.MV_DTIM_EXPIRY                = view.frmTimeExpiry.dateText.text;
			//obj.MV_DTIM_CHANGE                = view.frmTimeChange.dateText.text;
			obj.MV_DTIM_EFFECT                = longDateConvert.format(view.frmTimeEffect.selectedDate);
			obj.MV_DTIM_EXPIRY                = longDateConvert.format(view.frmTimeExpiry.selectedDate);
			obj.MV_DTIM_CHANGE                = longDateConvert.format( new Date() );
			obj.MV_DTIM_CREATE                = longDateConvert.format( new Date() );
			
			//obj.MV_TERMINAL          = view.frmTerminal.selectedItem.TERM_CODE;
			if ( view.frmTerminal.selectedIndex >= 0 )
			{
				obj.MV_TERMINAL = view.frmTerminal.selectedItem.TERM_CODE;
			}
			else
			{
				//obj.MV_TERMINAL = "";
			}
			//obj.MV_SRCTYPE           = view.frmSource.selectedItem.SRCTYPE_CODE;
			if ( view.frmSource.selectedIndex >= 0 )
			{
				if ( view.currentState == "create" )
				{
					obj.MV_SRCTYPE = view.frmSource.selectedIndex+1;
				}
				else
				{
					//obj.MV_SRCTYPE = view.frmSource.selectedItem.SRCTYPE_CODE;
					obj.MV_SRCTYPE = view.frmSource.selectedIndex;
				}
			}
			else
			{
				obj.MV_SRCTYPE = 0;
			}
			//obj.MV_STATUS            = view.frmStatus.selectedItem.MOVSTAT_CODE;
			if ( view.frmStatus.selectedIndex >= 0 )
			{
				//obj.MV_STATUS = view.frmStatus.selectedItem.MOVSTAT_CODE;
				obj.MV_STATUS = view.frmStatus.selectedIndex;
			}
			else
			{
				obj.MV_STATUS = 0;
			}
			//obj.MV_SUPPLIER          = view.frmSupplier.selectedItem.CMPY_CODE;
			if ( view.frmSupplier.selectedIndex >= 0 )
			{
				obj.MV_SUPPLIER = view.frmSupplier.selectedItem.CMPY_CODE;
			}
			else
			{
				//obj.MV_SUPPLIER = "";
			}
			//obj.MV_CARRIER           = view.frmCarrier.selectedItem.CMPY_CODE;
			if ( view.frmCarrier.selectedIndex >= 0 )
			{
				obj.MV_CARRIER = view.frmCarrier.selectedItem.CMPY_CODE;
			}
			else
			{
				//obj.MV_CARRIER = "";
			}
			//obj.MV_VEHICLE           = view.frmVehicle.selectedItem.TNKR_CODE;
			if ( view.frmVehicle.selectedIndex >= 0 )
			{
				obj.MV_VEHICLE = view.frmVehicle.selectedItem.TNKR_CODE;
			}
			else
			{
				//obj.MV_VEHICLE = "";
			}
			/*
			//obj.MV_OPER_CHANGE       = view.frmOperChange.selectedItem.PER_CODE;
			if ( view.frmOperChange.selectedIndex >= 0 )
			{
			obj.MV_OPER_CHANGE = view.frmOperChange.selectedItem.PER_CODE;
			}
			else
			{
			//obj.MV_OPER_CHANGE = "";
			}*/
			obj.MV_OPER_CHANGE = global.user;
			obj.MV_OPER_CREATE = global.user;
			                                                      
			// TODO ?????? data of movement items
			
			var newModel:dmMovement = new dmMovement
			({
				create 		: true,
				onSuccess 	: successInModelAction,
				payload		: obj
			});
			
			// TODO ?????? data of movement items
			trace ( "TODO ?????? data of movement items", view.itemList.dataProviderLength );
			var i:int;
			for (i=0; i<view.itemList.dataProviderLength; i++)
			{
				trace ( "TODO ?????? data of movement items record number:", i );
				trace ( i, "----action                ", view.itemList.dataProvider[i].action );
				trace ( i, "----MVITM_KEY             ", view.itemList.dataProvider[i].payload.MVITM_KEY );
				trace ( i, "----MVITM_LINE_ID         ", view.itemList.dataProvider[i].payload.MVITM_LINE_ID );
				trace ( i, "----MVITM_TERMINAL        ", view.itemList.dataProvider[i].payload.MVITM_TERMINAL );
				trace ( i, "----MVITM_TYPE            ", view.itemList.dataProvider[i].payload.MVITM_TYPE );
				trace ( i, "----MVITM_ITEM_KEY        ", view.itemList.dataProvider[i].payload.MVITM_ITEM_KEY );
				trace ( i, "----MVITM_STATUS          ", view.itemList.dataProvider[i].payload.MVITM_STATUS );
				trace ( i, "----MVITM_PROD_QTY        ", view.itemList.dataProvider[i].payload.MVITM_PROD_QTY );
				trace ( i, "----MVITM_PROD_UNIT       ", view.itemList.dataProvider[i].payload.MVITM_PROD_UNIT );
				trace ( i, "----MVITM_PRODCMPY_FROM   ", view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_FROM );
				trace ( i, "----MVITM_PRODCODE_FROM   ", view.itemList.dataProvider[i].payload.MVITM_PRODCODE_FROM );
				trace ( i, "----MVITM_PRODNAME_FROM   ", view.itemList.dataProvider[i].payload.MVITM_PRODNAME_FROM );
				trace ( i, "----MVITM_TANK_FROM       ", view.itemList.dataProvider[i].payload.MVITM_TANK_FROM );
				trace ( i, "----MVITM_PRODCMPY_TO     ", view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_TO );
				trace ( i, "----MVITM_PRODCODE_TO     ", view.itemList.dataProvider[i].payload.MVITM_PRODCODE_TO );
				trace ( i, "----MVITM_PRODNAME_TO     ", view.itemList.dataProvider[i].payload.MVITM_PRODNAME_TO );
				trace ( i, "----MVITM_TANK_TO         ", view.itemList.dataProvider[i].payload.MVITM_TANK_TO );
				trace ( i, "----MVITM_COMMENTS        ", view.itemList.dataProvider[i].payload.MVITM_COMMENTS );
				trace ( i, "----MVITM_QTY_SCHD        ", view.itemList.dataProvider[i].payload.MVITM_QTY_SCHD );
				trace ( i, "----MVITM_QTY_MOVE        ", view.itemList.dataProvider[i].payload.MVITM_QTY_MOVE );
				trace ( i, "----MVITM_QTY_DELV        ", view.itemList.dataProvider[i].payload.MVITM_QTY_DELV );
				
				if ( view.itemList.dataProvider[i].action == "+" )
				{
				
					view.itemList.dataProvider[i].payload.MVITM_MOVE_ID = obj.MV_ID;
					view.itemList.dataProvider[i].payload.MVITM_NUMBER = obj.MV_NUMBER;
					view.itemList.dataProvider[i].payload.MVITM_KEY = obj.MV_KEY;
					
					view.itemList.dataProvider[i].payload.MVITM_DTIM_EFFECT = obj.MV_DTIM_EFFECT;
					view.itemList.dataProvider[i].payload.MVITM_DTIM_EXPIRY = obj.MV_DTIM_EXPIRY;
					view.itemList.dataProvider[i].payload.MVITM_DTIM_CHANGE = obj.MV_DTIM_CHANGE;
					
					view.itemList.dataProvider[i].payload.MVITM_TERMINAL = obj.MV_TERMINAL;
					
					view.itemList.dataProvider[i].payload.MVITM_OPER_CHANGE = obj.MV_OPER_CHANGE;
					view.itemList.dataProvider[i].payload.MVITM_OPER_EFFECT = obj.MV_OPER_EFFECT;
					
					view.itemList.dataProvider[i].create
						({
							onSuccess 	: successInItemAction,
							payload		: view.itemList.dataProvider[i].payload
						});
				}
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
				this.toggleDeleteButton();
				if ( view.btnDelete.enabled == true )
				{
					var canDelete:DeleteDialog = new DeleteDialog(doRemoval, hasPassword);
				}
				else
				{
					var cannotDelete:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.FAIL_DELETE_NOM_OP_ITEM') );
				}
			}
		}
		
		public function doRemoval():void
		{
			
			// TODO ?????? data of movement items
			trace ( "TODO ?????? data of movement items", view.itemList.dataProviderLength );
			var i:int;
			for (i=0; i<view.itemList.dataProviderLength; i++)
			{
				if ( int(view.itemList.dataProvider[i].payload.MVITM_STATUS) > 0 )
				{
					continue;
				}
				trace ( "TODO ?????? data of movement items record number:", i );
				trace ( i, "----action                ", view.itemList.dataProvider[i].action );
				trace ( i, "----MVITM_KEY             ", view.itemList.dataProvider[i].payload.MVITM_KEY );
				trace ( i, "----MVITM_LINE_ID         ", view.itemList.dataProvider[i].payload.MVITM_LINE_ID );
				trace ( i, "----MVITM_TERMINAL        ", view.itemList.dataProvider[i].payload.MVITM_TERMINAL );
				trace ( i, "----MVITM_TYPE            ", view.itemList.dataProvider[i].payload.MVITM_TYPE );
				trace ( i, "----MVITM_ITEM_KEY        ", view.itemList.dataProvider[i].payload.MVITM_ITEM_KEY );
				trace ( i, "----MVITM_STATUS          ", view.itemList.dataProvider[i].payload.MVITM_STATUS );
				trace ( i, "----MVITM_PROD_QTY        ", view.itemList.dataProvider[i].payload.MVITM_PROD_QTY );
				trace ( i, "----MVITM_PROD_UNIT       ", view.itemList.dataProvider[i].payload.MVITM_PROD_UNIT );
				trace ( i, "----MVITM_PRODCMPY_FROM   ", view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_FROM );
				trace ( i, "----MVITM_PRODCODE_FROM   ", view.itemList.dataProvider[i].payload.MVITM_PRODCODE_FROM );
				trace ( i, "----MVITM_PRODNAME_FROM   ", view.itemList.dataProvider[i].payload.MVITM_PRODNAME_FROM );
				trace ( i, "----MVITM_TANK_FROM       ", view.itemList.dataProvider[i].payload.MVITM_TANK_FROM );
				trace ( i, "----MVITM_PRODCMPY_TO     ", view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_TO );
				trace ( i, "----MVITM_PRODCODE_TO     ", view.itemList.dataProvider[i].payload.MVITM_PRODCODE_TO );
				trace ( i, "----MVITM_PRODNAME_TO     ", view.itemList.dataProvider[i].payload.MVITM_PRODNAME_TO );
				trace ( i, "----MVITM_TANK_TO         ", view.itemList.dataProvider[i].payload.MVITM_TANK_TO );
				trace ( i, "----MVITM_COMMENTS        ", view.itemList.dataProvider[i].payload.MVITM_COMMENTS );
				trace ( i, "----MVITM_QTY_SCHD        ", view.itemList.dataProvider[i].payload.MVITM_QTY_SCHD );
				trace ( i, "----MVITM_QTY_MOVE        ", view.itemList.dataProvider[i].payload.MVITM_QTY_MOVE );
				trace ( i, "----MVITM_QTY_DELV        ", view.itemList.dataProvider[i].payload.MVITM_QTY_DELV );
				
				view.itemList.dataProvider[i].remove
					({
						onSuccess 	: successInItemAction
					});
			}
			
			view.mainList.selectedItem.remove
			({
				onSuccess 	: successInModelAction
			});
			
		}
		
		public function update():Boolean
		{
			if ( this.CheckDateTimeRange() == false )
			{
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.DT_START_GT_END'));
				return false;
			}
			
			if ( this.checkItemFields() == false )
			{
				return false;
			}
			
			if(view.frmTerminal.selectedIndex == -1)
			{
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.SELECT_TERMINAL'));
				return false;
			}
/*			if(view.frmSupplier.selectedIndex == -1)
			{
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.SELECT_SUPPLIER'));
				return false;
			}
*/			if(view.frmSource.selectedIndex == -1)
			{
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.SELECT_SOURCE'));
				return false;
			}
			
			var obj:Object = new Object();
			
			obj.MV_ID                = Number(view.frmId.text);
			obj.MV_COMMENTS          = view.frmComments.text;
			obj.MV_NUMBER            = view.frmNumber.text;
			obj.MV_KEY               = view.frmKey.text;
			
			obj.MV_TPPOINT           = view.frmTpPoint.text;
			obj.MV_TPP_TEXT          = view.frmTppText.text;
			obj.MV_TPMODE            = view.frmTpMode.text;
			obj.MV_TPMODE_TEXT       = view.frmTpmText.text;
			obj.MV_TPSYSTEM          = view.frmTpSystem.text;
			
			//obj.MV_DTIM_EFFECT                = view.frmTimeEffect.dateText.text;
			//obj.MV_DTIM_EXPIRY                = view.frmTimeExpiry.dateText.text;
			//obj.MV_DTIM_CHANGE                = view.frmTimeChange.dateText.text;
			obj.MV_DTIM_EFFECT                = longDateConvert.format(view.frmTimeEffect.selectedDate);
			obj.MV_DTIM_EXPIRY                = longDateConvert.format(view.frmTimeExpiry.selectedDate);
			obj.MV_DTIM_CHANGE                = longDateConvert.format( new Date() );
			
			//obj.MV_TERMINAL          = view.frmTerminal.selectedItem.TERM_CODE;
			if ( view.frmTerminal.selectedIndex >= 0 )
			{
				obj.MV_TERMINAL = view.frmTerminal.selectedItem.TERM_CODE;
			}
			else
			{
				//obj.MV_TERMINAL = "";
			}
			//obj.MV_SRCTYPE           = view.frmSource.selectedItem.SRCTYPE_CODE;
			if ( view.frmSource.selectedIndex >= 0 )
			{
				//obj.MV_SRCTYPE = view.frmSource.selectedItem.SRCTYPE_CODE;
				obj.MV_SRCTYPE = view.frmSource.selectedIndex;
			}
			else
			{
				obj.MV_SRCTYPE = 0;
			}
			//obj.MV_STATUS            = view.frmStatus.selectedItem.MOVSTAT_CODE;
			if ( view.frmStatus.selectedIndex >= 0 )
			{
				//obj.MV_STATUS = view.frmStatus.selectedItem.MOVSTAT_CODE;
				obj.MV_STATUS = view.frmStatus.selectedIndex;
			}
			else
			{
				obj.MV_STATUS = 0;
			}
			//obj.MV_SUPPLIER          = view.frmSupplier.selectedItem.CMPY_CODE;
			if ( view.frmSupplier.selectedIndex >= 0 )
			{
				obj.MV_SUPPLIER = view.frmSupplier.selectedItem.CMPY_CODE;
			}
			else
			{
				//obj.MV_SUPPLIER = "";
			}
			//obj.MV_CARRIER           = view.frmCarrier.selectedItem.CMPY_CODE;
			if ( view.frmCarrier.selectedIndex >= 0 )
			{
				obj.MV_CARRIER = view.frmCarrier.selectedItem.CMPY_CODE;
			}
			else
			{
				obj.MV_CARRIER = "";
			}
			//obj.MV_VEHICLE           = view.frmVehicle.selectedItem.TNKR_CODE;
			if ( view.frmVehicle.selectedIndex >= 0 )
			{
				obj.MV_VEHICLE = view.frmVehicle.selectedItem.TNKR_CODE;
			}
			else
			{
				obj.MV_VEHICLE = "";
			}
			/*
			//obj.MV_OPER_CHANGE       = view.frmOperChange.selectedItem.PER_CODE;
			if ( view.frmOperChange.selectedIndex >= 0 )
			{
				obj.MV_OPER_CHANGE = view.frmOperChange.selectedItem.PER_CODE;
			}
			else
			{
				//obj.MV_OPER_CHANGE = "";
			}*/
			obj.MV_OPER_CHANGE = global.user;
			
			trace("...........................view.mainList", view.mainList.selectedIndex, this.mainListSelection);
			trace("...........................view.mainList", view.mainList.selectedItem);
			
			view.mainList.selectedItem.update
			({
				onSuccess 	: successInModelAction,
				payload		: obj
				/*
				onSuccess:function():void{
					DM.MovementReasons.reload();
					view.currentState = 'normal';
				},
				payload:{
					MV_ID                 :1,
					MV_COMMENTS           :"xxxxxxxxxxxxxxxxxxxxx",      
					MV_TPP_TEXT           :"TPP2"
				}*/
			});
			
			// TODO ?????? data of movement items
			trace ( "TODO ?????? data of movement items", view.itemList.dataProviderLength );
			var i:int;
			for (i=0; i<view.itemList.dataProviderLength; i++)
			{
				if ( int(view.itemList.dataProvider[i].payload.MVITM_STATUS) > 0 && this.toggleItemFlagClicked==false )
				{
					continue;
				}
				trace ( "TODO ?????? data of movement items record number:", i );
				trace ( i, "----action                ", view.itemList.dataProvider[i].action );
				trace ( i, "----MVITM_KEY             ", view.itemList.dataProvider[i].payload.MVITM_KEY );
				trace ( i, "----MVITM_LINE_ID         ", view.itemList.dataProvider[i].payload.MVITM_LINE_ID );
				trace ( i, "----MVITM_TERMINAL        ", view.itemList.dataProvider[i].payload.MVITM_TERMINAL );
				trace ( i, "----MVITM_TYPE            ", view.itemList.dataProvider[i].payload.MVITM_TYPE );
				trace ( i, "----MVITM_ITEM_KEY        ", view.itemList.dataProvider[i].payload.MVITM_ITEM_KEY );
				trace ( i, "----MVITM_STATUS          ", view.itemList.dataProvider[i].payload.MVITM_STATUS );
				trace ( i, "----MVITM_PROD_QTY        ", view.itemList.dataProvider[i].payload.MVITM_PROD_QTY );
				trace ( i, "----MVITM_PROD_UNIT       ", view.itemList.dataProvider[i].payload.MVITM_PROD_UNIT );
				trace ( i, "----MVITM_PRODCMPY_FROM   ", view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_FROM );
				trace ( i, "----MVITM_PRODCODE_FROM   ", view.itemList.dataProvider[i].payload.MVITM_PRODCODE_FROM );
				trace ( i, "----MVITM_PRODNAME_FROM   ", view.itemList.dataProvider[i].payload.MVITM_PRODNAME_FROM );
				trace ( i, "----MVITM_TANK_FROM       ", view.itemList.dataProvider[i].payload.MVITM_TANK_FROM );
				trace ( i, "----MVITM_PRODCMPY_TO     ", view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_TO );
				trace ( i, "----MVITM_PRODCODE_TO     ", view.itemList.dataProvider[i].payload.MVITM_PRODCODE_TO );
				trace ( i, "----MVITM_PRODNAME_TO     ", view.itemList.dataProvider[i].payload.MVITM_PRODNAME_TO );
				trace ( i, "----MVITM_TANK_TO         ", view.itemList.dataProvider[i].payload.MVITM_TANK_TO );
				trace ( i, "----MVITM_COMMENTS        ", view.itemList.dataProvider[i].payload.MVITM_COMMENTS );
				trace ( i, "----MVITM_QTY_SCHD        ", view.itemList.dataProvider[i].payload.MVITM_QTY_SCHD );
				trace ( i, "----MVITM_QTY_MOVE        ", view.itemList.dataProvider[i].payload.MVITM_QTY_MOVE );
				trace ( i, "----MVITM_QTY_DELV        ", view.itemList.dataProvider[i].payload.MVITM_QTY_DELV );
				
				view.itemList.dataProvider[i].payload.MVITM_MOVE_ID = obj.MV_ID;
				view.itemList.dataProvider[i].payload.MVITM_NUMBER = obj.MV_NUMBER;
				view.itemList.dataProvider[i].payload.MVITM_KEY = obj.MV_KEY;
				
				view.itemList.dataProvider[i].payload.MVITM_DTIM_EFFECT = obj.MV_DTIM_EFFECT;
				view.itemList.dataProvider[i].payload.MVITM_DTIM_EXPIRY = obj.MV_DTIM_EXPIRY;
				view.itemList.dataProvider[i].payload.MVITM_DTIM_CHANGE = obj.MV_DTIM_CHANGE;
				
				view.itemList.dataProvider[i].payload.MVITM_TERMINAL = obj.MV_TERMINAL;
				
				view.itemList.dataProvider[i].payload.MVITM_OPER_CHANGE = obj.MV_OPER_CHANGE;
				view.itemList.dataProvider[i].payload.MVITM_OPER_EFFECT = obj.MV_OPER_EFFECT;
				
				if ( view.itemList.dataProvider[i].action == "*" )
				{
					view.itemList.dataProvider[i].update
					({
						onSuccess 	: successInItemAction,
						payload		: view.itemList.dataProvider[i].payload
					});
				}
				if ( view.itemList.dataProvider[i].action == "-" )
				{
					view.itemList.dataProvider[i].remove
					({
						onSuccess 	: successInItemAction
					});
				}
				if ( view.itemList.dataProvider[i].action == "+" )
				{
					view.itemList.dataProvider[i].create
						({
							onSuccess 	: successInItemAction,
							payload		: view.itemList.dataProvider[i].payload
						});
				}
			}
			
			return true;
		}
		
		public function toggleItemFlag():void
		{
			this.toggleItemFlagClicked = false;
			
			var i:int;
			
			i = view.itemList.selectedIndex;
			if ( i < 0 )
			{
				return;
			}
			
			view.itemList.dataProvider[i].payload.MVITM_COMPLETED = 1 - view.itemList.dataProvider[i].payload.MVITM_COMPLETED;
			view.itemList.dataProvider[i].action = "*";
			this.toggleItemFlagClicked = true;
			
			this.save_clickHandler();
			
		}

		public function getItemObjectFromCode(code:String, list:ArrayCollection, field:String):Object
		{
			return tools.getItemObjectFromCode( code, list, field );
			/*
			for each(var o:Object in list)
			{
				if(o[field] == code)
				{
					return o;
				}
			}
			
			return null;
			*/
		}
		
		public function getItemIndexFromCode(code:String, list:ArrayCollection, field:String):int
		{
			return tools.getItemIndexFromCode( code, list, field );
			/*
			var i:int;
			
			for (i=0; i<list.length; i++)
			{
				if ( (list.getItemAt(i) as Object)[field] == code )
				{
					return i;
				}
			}
			
			return -1;
			*/
		}
		
		public function onMovDateChanged():void
		{
			if ( (view.frmTimeEffect.selectedDate !=null) 
				&& (view.frmTimeExpiry.selectedDate != null)
				&& (view.frmTimeEffect.selectedDate >= view.frmTimeExpiry.selectedDate) 
			)
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.DT_EFFECT_GT_EXPIRY') );
			}
		}
		
		public function initCreateForm():void
		{
			if ( view.currentState == "create" )
			{
				if ( view.itemList.columnHeaderGroup.hasEventListener( "GRID_HEADER_BUTTON_CLICKED" ) )
				{
					view.itemList.columnHeaderGroup.removeEventListener( "GRID_HEADER_BUTTON_CLICKED", onGridHeaderButtonClicked );
				}
				view.itemList.columnHeaderGroup.addEventListener( "GRID_HEADER_BUTTON_CLICKED", onGridHeaderButtonClicked );
				//view.fltNominationKey.useErrorSkin = false;
				//view.fltNominationKey.invalidateProperties();
			}
			
			this.filterMovSourcesList();
			
			view.btnSave.enabled = this.canCreate;//true;
			
			view.frmId.text                     = "";
			view.frmComments.text               = "";
			view.frmNumber.text                 = "";
			view.frmKey.text                    = "";
			
			view.frmTpPoint.text                = "";
			view.frmTppText.text                = "";
			view.frmTpMode.text                 = "";
			view.frmTpmText.text                = "";
			view.frmTpSystem.text               = "";
			
			view.frmTerminal.selectedIndex      = 0;
			view.frmSource.selectedIndex        = 2;
			view.frmStatus.selectedIndex        = 0;
			view.frmSupplier.selectedIndex      = 0;
			view.frmCarrier.selectedIndex       = -1;
			view.frmVehicle.selectedIndex       = -1;
			//view.frmOperChange.selectedItem     = getItemObjectFromCode(global.user, DM.MovementNominations.operators, "PER_CODE");
			view.frmOperChange.selectedIndex    = getItemIndexFromCode(global.user, DM.MovementNominations.operators, "PER_CODE");
			
			view.frmTimeEffect.selectedDate     = (new Date());
			view.frmTimeExpiry.selectedDate     = (getDefaultDate( new Date() ));
			view.frmTimeChange.selectedDate     = (new Date());
			
			view.itemList.dataProvider = new dmMovementItems( {autopopulate: false} );
			
		}
		
		private function onGridHeaderButtonClicked(event:Event):void
		{
			trace( "inside onGridHeaderButtonClicked" );
			if ( (view.currentState == "create" && this.canCreate == true) || (view.currentState == "edit" && this.canUpdate == true) )
			{
				this.markCreation();
			}
			else
			{
				global.msgWarning( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.NO_PERM_ADD_ITEM') );
			}
		}
		
		public function editSelected():void
		{
			trace(".................................editSelected.mainListSelection:", view.mainList.selectedIndex);
			if ( view.mainList.selectedItem == null || view.mainList.selectedItem.payload == null )
			{
				view.currentState = "normal";
				return;
			}
			else
			{
				view.currentState = "edit";
				/*
				if ( view.itemList.columnHeaderGroup.hasEventListener( GridEvent.GRID_CLICK ) )
				{
					view.itemList.columnHeaderGroup.removeEventListener( GridEvent.GRID_CLICK, onGridHeaderButtonClicked );
				}
				view.itemList.columnHeaderGroup.addEventListener( GridEvent.GRID_CLICK, onGridHeaderButtonClicked );
				*/
				if ( view.itemList.columnHeaderGroup.hasEventListener( "GRID_HEADER_BUTTON_CLICKED" ) )
				{
					view.itemList.columnHeaderGroup.removeEventListener( "GRID_HEADER_BUTTON_CLICKED", onGridHeaderButtonClicked );
				}
				view.itemList.columnHeaderGroup.addEventListener( "GRID_HEADER_BUTTON_CLICKED", onGridHeaderButtonClicked );
			}
			
			view.btnSave.enabled = this.canUpdate;// true;
			
			trace("***************************I am here");
			trace ("***>>>>>>>>> selectedItem:<<<<<<<***", view.mainList.selectedItem );
			trace ("***>>>>>>>>> payload:<<<<<<<***", view.mainList.selectedItem.payload );
			trace ("***>>>>>>>>> frmTerminalt:<<<<<<<***", view.mainList.selectedItem.payload.MV_TERMINAL
				, getItemIndexFromCode(view.mainList.selectedItem.payload.MV_TERMINAL, DM.MovementNominations.terminals, "TERM_CODE") );
			trace ("***>>>>>>>>> frmSource:<<<<<<<***", view.mainList.selectedItem.payload.MV_SRCTYPE );
			trace ("***>>>>>>>>> frmStatus:<<<<<<<***", view.mainList.selectedItem.payload.MV_STATUS );
			trace ("***>>>>>>>>> frmSupplier:<<<<<<<***", view.mainList.selectedItem.payload.MV_SUPPLIER
				, getItemIndexFromCode(view.mainList.selectedItem.payload.MV_SUPPLIER, DM.MovementNominations.suppliers, "CMPY_CODE") );
			trace ("***>>>>>>>>> frmOperChange:<<<<<<<***", view.mainList.selectedItem.payload.MV_OPER_CHANGE
				, getItemIndexFromCode(view.mainList.selectedItem.payload.MV_OPER_CHANGE, DM.MovementNominations.operators, "PER_CODE") );
			
			view.frmId.text                     = view.mainList.selectedItem.payload.MV_ID;
			view.frmComments.text               = view.mainList.selectedItem.payload.MV_COMMENTS;
			view.frmNumber.text                 = view.mainList.selectedItem.payload.MV_NUMBER;
			view.frmKey.text                    = view.mainList.selectedItem.payload.MV_KEY;
			
			view.frmTpPoint.text                = view.mainList.selectedItem.payload.MV_TPPOINT;
			view.frmTppText.text                = view.mainList.selectedItem.payload.MV_TPP_TEXT;
			view.frmTpMode.text                 = view.mainList.selectedItem.payload.MV_TPMODE;
			view.frmTpmText.text                = view.mainList.selectedItem.payload.MV_TPMODE_TEXT;
			view.frmTpSystem.text               = view.mainList.selectedItem.payload.MV_TPSYSTEM;
			
			//view.frmTerminal.selectedItem       = getItemObjectFromCode(view.mainList.selectedItem.payload.MV_TERMINAL, DM.MovementNominations.terminals, "TERM_CODE");
			view.frmTerminal.selectedIndex      = getItemIndexFromCode(view.mainList.selectedItem.payload.MV_TERMINAL, DM.MovementNominations.terminals, "TERM_CODE");

			view.frmSource.selectedIndex        = view.mainList.selectedItem.payload.MV_SRCTYPE;
			view.frmStatus.selectedIndex        = view.mainList.selectedItem.payload.MV_STATUS;

			//view.frmSupplier.selectedItem       = getItemObjectFromCode(view.mainList.selectedItem.payload.MV_SUPPLIER, DM.MovementNominations.suppliers, "CMPY_CODE");
			view.frmSupplier.selectedIndex      = getItemIndexFromCode(view.mainList.selectedItem.payload.MV_SUPPLIER, DM.MovementNominations.suppliers, "CMPY_CODE");
			//view.frmCarrier.selectedItem        = getItemObjectFromCode(view.mainList.selectedItem.payload.MV_CARRIER, DM.MovementNominations.carriers, "CMPY_CODE");
			view.frmCarrier.selectedIndex       = getItemIndexFromCode(view.mainList.selectedItem.payload.MV_CARRIER, DM.MovementNominations.carriers, "CMPY_CODE");
			//view.frmVehicle.selectedItem        = getItemObjectFromCode(view.mainList.selectedItem.payload.MV_VEHICLE, DM.MovementNominations.vehicles, "TNKR_CODE");
			view.frmVehicle.selectedIndex       = getItemIndexFromCode(view.mainList.selectedItem.payload.MV_VEHICLE, DM.MovementNominations.vehicles, "TNKR_CODE");
			//view.frmOperChange.selectedItem     = getItemObjectFromCode(view.mainList.selectedItem.payload.MV_OPER_CHANGE, DM.MovementNominations.operators, "PER_CODE");
			view.frmOperChange.selectedIndex    = getItemIndexFromCode(view.mainList.selectedItem.payload.MV_OPER_CHANGE, DM.MovementNominations.operators, "PER_CODE");
			
			//view.frmTimeEffect.dateText.text     = convertDateToLocaleString(view.mainList.selectedItem.payload.MV_DTIM_EFFECT);
			//view.frmTimeExpiry.dateText.text     = convertDateToLocaleString(view.mainList.selectedItem.payload.MV_DTIM_EXPIRY);
			//view.frmTimeChange.dateText.text     = convertDateToLocaleStringLong(view.mainList.selectedItem.payload.MV_DTIM_CHANGE);
				
			if ( view.mainList.selectedItem.payload.MV_DTIM_EFFECT == null || view.mainList.selectedItem.payload.MV_DTIM_EFFECT == 'null' || view.mainList.selectedItem.payload.MV_DTIM_EFFECT == '' )
			{
				//view.frmTimeEffect.selectedDate     = convertDateToLocaleLong(view.mainList.selectedItem.payload.MV_DTIM_CREATE);
				view.frmTimeEffect.selectedDate     = null;
			}
			else
			{
				view.frmTimeEffect.selectedDate     = convertDateToLocaleLong(view.mainList.selectedItem.payload.MV_DTIM_EFFECT);
			}
			
			if ( view.mainList.selectedItem.payload.MV_DTIM_EXPIRY == null || view.mainList.selectedItem.payload.MV_DTIM_EXPIRY == 'null' || view.mainList.selectedItem.payload.MV_DTIM_EXPIRY == '' )
			{
				//var cDate:Date = convertDateToLocaleLong(view.mainList.selectedItem.payload.MV_DTIM_CREATE);
				//view.frmTimeExpiry.selectedDate     = this.getDefaultDate( cDate );
				view.frmTimeExpiry.selectedDate     = null;
			}
			else
			{
				view.frmTimeExpiry.selectedDate     = convertDateToLocaleLong(view.mainList.selectedItem.payload.MV_DTIM_EXPIRY);
			}
			
			view.frmTimeChange.selectedDate     = convertDateToLocaleLong(view.mainList.selectedItem.payload.MV_DTIM_CHANGE);
			
			
			/*
			var itemFilterObj:Object=new Object();
			//itemFilterObj.MVITM_MOVE_ID          = String(view.mainList.selectedItem.payload.MV_ID);
			//itemFilterObj.MVITM_NUMBER           = String(view.mainList.selectedItem.payload.MV_NUMBER);
			//itemFilterObj.MVITM_KEY              = String(view.mainList.selectedItem.payload.MV_KEY);
			itemFilterObj[String(view.mainList.selectedItem.payload.MV_ID)] = {"fields": "MVITM_MOVE_ID", "equality":"exact"};
			itemFilterObj[String(view.mainList.selectedItem.payload.MV_NUMBER)] =  {"fields": "MVITM_NUMBER", "equality":"exact"};
			itemFilterObj[String(view.mainList.selectedItem.payload.MV_KEY)] =  {"fields": "MVITM_KEY", "equality":"exact"};
			view.itemList.dataProvider = new dmMovementItems( {filter: itemFilterObj} );
			*/
			
			var itemFilters:Object = new Object();
			var index:int = 0;
			
			var movIdObj:Object = new Object();
			movIdObj["field"]       = "MVITM_MOVE_ID"; 
			movIdObj["value"]       = int(view.mainList.selectedItem.payload.MV_ID); 
			movIdObj["type"]        = "NUMBER"; 
			movIdObj["format"]      = ""; 
			movIdObj["delimiter"]   = "N/A"; 
			movIdObj["operator"]    = "="; 
			movIdObj["logic"]       = "N/A"; 
			itemFilters[ index ] = movIdObj;
			index += 1;
			/*
			var movNumberObj:Object = new Object();
			movNumberObj["field"]       = "MVITM_NUMBER"; 
			movNumberObj["value"]       = String(view.mainList.selectedItem.payload.MV_NUMBER); 
			movNumberObj["type"]        = "STRING"; 
			movNumberObj["format"]      = ""; 
			movNumberObj["delimiter"]   = "N/A"; 
			movNumberObj["operator"]    = "="; 
			movNumberObj["logic"]       = "N/A"; 
			itemFilters[ index ] = movNumberObj;
			index += 1;
			*/
			var movKeyObj:Object = new Object();
			movKeyObj["field"]       = "MVITM_KEY"; 
			movKeyObj["value"]       = String(view.mainList.selectedItem.payload.MV_KEY); 
			movKeyObj["type"]        = "STRING"; 
			movKeyObj["format"]      = ""; 
			movKeyObj["delimiter"]   = "N/A"; 
			movKeyObj["operator"]    = "="; 
			movKeyObj["logic"]       = "N/A"; 
			itemFilters[ index ] = movKeyObj;
			index += 1;
			
			var itemFilterObj:Object = new Object();
			itemFilterObj["logicalOps"] = "AND"; 
			itemFilterObj["filters"] = itemFilters;
			
			//view.itemList.dataProvider = new dmMovementItems( {groupFilters: itemFilterObj} );
			view.itemList.dataProvider = new dmMovementItems( {groupFilters: itemFilterObj, orders:{ field:'MVITM_LINE_ID', order:'ASC' }} );
			
			if ( int(view.mainList.selectedItem.payload.MV_STATUS) > 0 )
			{
				view.currentState = "detail";
			}
			else
			{
				view.currentState = "edit";
			}
			
			view.frmSource.selectedIndex        = view.mainList.selectedItem.payload.MV_SRCTYPE;
			view.frmStatus.selectedIndex        = view.mainList.selectedItem.payload.MV_STATUS;
			
			view.itemList.selectedIndex = -1;
			this.toggleButtonEditability();
			
			this.toggleDeleteButton();
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
				terminalObj["field"]     = "MV_TERMINAL"; 
				terminalObj["value"]     = String(view.fltTerminal.selectedItem.TERM_CODE); 
				terminalObj["type"]      = "STRING"; 
				terminalObj["format"]    = ""; 
				terminalObj["delimiter"] = "N/A"; 
				terminalObj["operator"]  = "="; 
				terminalObj["logic"]     = "N/A"; 
				filters[ index ] = terminalObj;
				index += 1;
			}
			
			if ( view.currentState=="normal" && view.fltSource.selectedIndex >= 0 )
			{
				var sourceObj:Object = new Object();
				sourceObj["field"]       = "MV_SRCTYPE"; 
				sourceObj["value"]       = String(view.fltSource.selectedIndex); 
				sourceObj["type"]        = "NUMBER"; 
				sourceObj["format"]      = ""; 
				sourceObj["delimiter"]   = "N/A"; 
				sourceObj["operator"]    = "="; 
				sourceObj["logic"]       = "N/A"; 
				filters[ index ] = sourceObj;
				index += 1;
			}
			else
			{
				if ( MOVEMENT_SOURCE_INDEX >= 0 )
				{
					var sourceObj:Object = new Object();
					sourceObj["field"]       = "MV_SRCTYPE"; 
					sourceObj["value"]       = String(MOVEMENT_SOURCE_INDEX); 
					sourceObj["type"]        = "NUMBER"; 
					sourceObj["format"]      = ""; 
					sourceObj["delimiter"]   = "N/A"; 
					sourceObj["operator"]    = "="; 
					sourceObj["logic"]       = "N/A"; 
					filters[ index ] = sourceObj;
					index += 1;
				}
			}
			
			if ( view.currentState=="normal" && view.fltNominationStatus.selectedIndex >= 0 )
			{
				var statusObj:Object = new Object();
				statusObj["field"]       = "MV_STATUS"; 
				statusObj["value"]       = String(view.fltNominationStatus.selectedIndex); 
				statusObj["type"]        = "NUMBER"; 
				statusObj["format"]      = ""; 
				statusObj["delimiter"]   = "N/A"; 
				statusObj["operator"]    = "="; 
				statusObj["logic"]       = "N/A"; 
				filters[ index ] = statusObj;
				index += 1;
			}
			else
			{
				if ( MOVEMENT_STATUS_INDEX >= 0 )
				{
					var statusObj:Object = new Object();
					statusObj["field"]       = "MV_STATUS"; 
					statusObj["value"]       = String(MOVEMENT_STATUS_INDEX); 
					statusObj["type"]        = "NUMBER"; 
					statusObj["format"]      = ""; 
					statusObj["delimiter"]   = "N/A"; 
					statusObj["operator"]    = "="; 
					statusObj["logic"]       = "N/A"; 
					filters[ index ] = statusObj;
					index += 1;
				}
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
			else
			{
				if ( MOVEMENT_ITEMTYPE_INDEX >= 0 )
				{
					var itemTypeObj:Object = new Object();
					itemTypeObj["field"]       = "MV_ID"; 
					itemTypeObj["value"]       = " (select MVITM_MOVE_ID from MOVEMENT_ITEMS where MVITM_TYPE="+String(MOVEMENT_ITEMTYPE_INDEX)+") "; 
					itemTypeObj["type"]        = "NUMBER"; 
					itemTypeObj["format"]      = ""; 
					itemTypeObj["delimiter"]   = "N/A"; 
					itemTypeObj["operator"]    = " IN "; 
					itemTypeObj["logic"]       = "N/A"; 
					filters[ index ] = itemTypeObj;
					index += 1;
				}
			}
			
			if ( view.fltNominationKey.text.length > 0 )
			{
				var movKeyObj:Object = new Object();
				movKeyObj["field"]       = "MV_KEY"; 
				movKeyObj["value"]       = String(view.fltNominationKey.text); 
				movKeyObj["type"]        = "STRING"; 
				movKeyObj["format"]      = ""; 
				if ( view.fltNominationKey.text.search("~") < 0 )
				{
					movKeyObj["delimiter"]   = "N/A"; 
					movKeyObj["operator"]    = "LIKE"; 
					if ( view.fltNominationKey.text.search(",") >= 0 )
					{
						movKeyObj["operator"]    = "LIKE2"; 
					}
				}
				else
				{
					movKeyObj["delimiter"]   = "~"; 
					movKeyObj["operator"]    = ">=~<"; 
				}
				movKeyObj["logic"]       = "N/A"; 
				filters[ index ] = movKeyObj;
				index += 1;
			}
			
			if ( view.currentState=="normal" && view.fltNominationNumber.text.length > 0 )
			{
				var movNumberObj:Object = new Object();
				movNumberObj["field"]       = "MV_NUMBER"; 
				movNumberObj["value"]       = String(view.fltNominationNumber.text); 
				movNumberObj["type"]        = "STRING"; 
				movNumberObj["format"]      = ""; 
				if ( view.fltNominationNumber.text.search("~") < 0 )
				{
					movNumberObj["delimiter"]   = "N/A"; 
					movNumberObj["operator"]    = "LIKE"; 
				}
				else
				{
					movNumberObj["delimiter"]   = "~"; 
					movNumberObj["operator"]    = ">=~<"; 
				}
				movNumberObj["logic"]       = "N/A"; 
				filters[ index ] = movNumberObj;
				index += 1;
			}
			else
			{
				if ( MOVEMENT_NUMBER_TEXT.length > 0 )
				{
					var movNumberObj:Object = new Object();
					movNumberObj["field"]       = "MV_NUMBER"; 
					movNumberObj["value"]       = String(MOVEMENT_NUMBER_TEXT); 
					movNumberObj["type"]        = "STRING"; 
					movNumberObj["format"]      = ""; 
					if ( MOVEMENT_NUMBER_TEXT.search("~") < 0 )
					{
						movNumberObj["delimiter"]   = "N/A"; 
						movNumberObj["operator"]    = "LIKE"; 
					}
					else
					{
						movNumberObj["delimiter"]   = "~"; 
						movNumberObj["operator"]    = ">=~<"; 
					}
					movNumberObj["logic"]       = "N/A"; 
					filters[ index ] = movNumberObj;
					index += 1;
				}
			}
			
			if ( view.currentState=="normal" )
			{
				var rangeObj:Object = new Object();
				//rangeObj["field"]       = "MV_DTIM_EFFECT,MV_DTIM_EXPIRY"; 
				rangeObj["field"]       = "MV_DTIM_CREATE"; 
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
				rangeObj["type"]        = "DATETIME"; 
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
			/*
			if ( orderObj.order != "" )
			{
				DM.MovementNominations.populate( {groupFilters: filterObj, orders:orderObj, needFetchLists:false} );
			}
			else
			{
				var tmpObj:Object = new Object();
				tmpObj.field = "";
				tmpObj.order = "";
				DM.MovementNominations.populate( {groupFilters: filterObj, orders:tmpObj, needFetchLists:false} );
			}
			*/
			
			var pageSize: int = view.mainList.navigator.rowsPerPage;
			var totalCount:int = view.mainList.navigator.totalRecords;
			var pos: int = (view.mainList.navigator.currRecord);
//			var seek: int = (view.mainList.navigator.currRecord - 1);
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
			this.filterStack = filterObj;
			this.orderCollection = new ArrayCollection( view.mainList.orderCollection.source );
			
			view.pb.values( 0, 0 );
			//view.pb.values( DM.MovementNominations.length, DM.MovementNominations.totalCount );
			DM.MovementNominations.resultHandler = movementsLoaded;
			DM.MovementNominations.populate( {groupFilters: filterObj, orders:this.orderCollection.toArray(), needFetchLists:refreshLists, 
			   	requestMode:requestMode, pageSize:pageSize, seek:seek, pos:pos} );
			
			tools.pr(orderCollection.toArray());
			view.mainList.enabled = true;
			
			
			
		}
		
		protected function movementsLoaded():void
		{
			view.pb.values( DM.MovementNominations.length, DM.MovementNominations.totalCount, true);
			
			// preparing for csv export
			if ( view.currentState=="normal" && requestMode == 1 )
			{
				this.doPrepareCSV();
			}
			
			mainListRefreshHandler();
		}
		
		
		
		public function doPrepareCSV():void
		{
			
			var csvFilters:Object = new Object();
			
			if ( view.fltTerminal.selectedIndex >= 0 )
			{
				csvFilters["MV_TERMINAL"]     = String(view.fltTerminal.selectedItem.TERM_CODE); 
			}
			
			if ( view.currentState=="normal" && view.fltSource.selectedIndex >= 0 )
			{
				csvFilters["MV_SRCTYPE"]       = String(view.fltSource.selectedIndex); 
			}
			else
			{
				if ( MOVEMENT_SOURCE_INDEX >= 0 )
				{
					csvFilters["MV_SRCTYPE"]       = String(MOVEMENT_SOURCE_INDEX); 
				}
			}
			
			if ( view.currentState=="normal" && view.fltNominationStatus.selectedIndex >= 0 )
			{
				csvFilters["MV_STATUS"]       = String(view.fltNominationStatus.selectedIndex); 
			}
			else
			{
				if ( MOVEMENT_STATUS_INDEX >= 0 )
				{
					csvFilters["MV_STATUS"]       = String(MOVEMENT_STATUS_INDEX); 
				}
			}
			
			if ( view.currentState=="normal" && view.fltNominationType.selectedIndex >= 0 )
			{
				csvFilters["MV_ID"]       = " (select MVITM_MOVE_ID from MOVEMENT_ITEMS where MVITM_TYPE="+String(view.fltNominationType.selectedIndex)+") "; 
			}
			else
			{
				if ( MOVEMENT_ITEMTYPE_INDEX >= 0 )
				{
					csvFilters["MV_ID"]       = " (select MVITM_MOVE_ID from MOVEMENT_ITEMS where MVITM_TYPE="+String(MOVEMENT_ITEMTYPE_INDEX)+") "; 
				}
			}
			
			if ( view.fltNominationKey.text.length > 0 )
			{
				csvFilters["MV_KEY"]       = "%"+String(view.fltNominationKey.text)+"%"; 
			}
			
			if ( view.currentState=="normal" && view.fltNominationNumber.text.length > 0 )
			{
				csvFilters["MV_NUMBER"]       = "%"+String(view.fltNominationNumber.text)+"%"; 
			}
			else
			{
				if ( MOVEMENT_NUMBER_TEXT.length > 0 )
				{
					csvFilters["MV_NUMBER"]       = "%"+String(MOVEMENT_NUMBER_TEXT)+"%"; 
				}
			}
			
			if ( view.currentState=="normal" )
			{
				if ( (view.fltTimeFrom.selectedDate !=null) && (view.fltTimeTo.selectedDate != null) ) 
				{
					csvFilters["sdt"]       = view.fltTimeFrom.selectedDate; 
					csvFilters["edt"]       = view.fltTimeTo.selectedDate; 
				}
				else
				{
					if ( (view.fltTimeFrom.selectedDate ==null) && (view.fltTimeTo.selectedDate == null) ) 
					{
						csvFilters["sdt"]       = null; 
						csvFilters["edt"]       = null; 
					}
					else if ( view.fltTimeFrom.selectedDate ==null ) 
					{
						csvFilters["sdt"]       = null; 
						csvFilters["edt"]       = view.fltTimeTo.selectedDate; 
					}
					else if ( view.fltTimeTo.selectedDate == null ) 
					{
						csvFilters["sdt"]       = view.fltTimeFrom.selectedDate; 
						csvFilters["edt"]       = null; 
					}
					else 
					{
						csvFilters["sdt"]       = null; 
						csvFilters["edt"]       = null; 
					}
				}
			}
			
			
			
			
			if ( view.currentState=="normal" )
			{
				DM.MovementNominations.prepareCSV(csvFilters);
			}
			else
			{
				DM.MovementNominations.csvReady = false;
				view.btnExport.enabled = DM.MovementNominations.csvReady;
			}
			
			
		}
		
		
		
		public function clearFilter(e:Event = null):void
		{
			if ( view.currentState != "widget" )
			{
				view.currentState = 'normal';
				view.mainList.enabled=true;
			}
			
			view.fltTerminal.selectedIndex = -1;
			view.fltNominationKey.text = "";
			
			if ( view.currentState != "widget" )
			{
				view.fltSource.selectedIndex = -1;
				view.fltNominationStatus.selectedIndex = -1;
				view.fltNominationType.selectedIndex = -1;
				view.fltNominationNumber.text = "";
				view.fltTimeFrom.selectedDate = null;
				view.fltTimeTo.selectedDate = null;
			}
			
			MOVEMENT_SOURCE_INDEX = -1;
			MOVEMENT_STATUS_INDEX = -1;
			MOVEMENT_ITEMTYPE_INDEX = -1;
			MOVEMENT_NUMBER_TEXT = "";
			
			this.refreshMainFilterOnChange();			
			
			//DM.MovementNominations.reload();
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
		
		public function convertDateToLocaleStringLong(dt:String):String
		{
			var dt_string:String;
			var dt_date:Date = new Date();
			
			dt_string = ""; 
			if ((dt!=null) && (dt!='null') && (dt!=''))
			{
				dt_date = DateField.stringToDate(dt,"YYYY-MM-DD");
				dt_string = this.dateFormatter.format( dt_date);
				dt_string += dt.substr(10, 9);
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
		
		public function convertDateToLocaleLong(dt:String):Date
		{
			var dt_date:Date = new Date();
			
			if ((dt!=null) && (dt!='null') && (dt!=''))
			{
				var dt_arr:Array = dt.split(" ");
				if ( dt_arr.length == 0 )
				{
					return dt_date;
				}
				else if ( dt_arr.length == 1 )
				{
					var date_arr:Array = (dt_arr[0] as String).split("-");
					dt_date = new Date( date_arr[0], date_arr[1]-1, date_arr[2] );
					return dt_date;
				}
				else
				{
					var date_arr:Array = (dt_arr[0] as String).split("-");
					var time_arr:Array = (dt_arr[1] as String).split(":");
					dt_date = new Date( date_arr[0], date_arr[1]-1, date_arr[2], time_arr[0], time_arr[1], time_arr[2]);
				}
			}
			//trace ("convertDateToLocale", dt, dt_date, dt_string);
			return dt_date;
		}
		
		public function getDefaultDate(param:Date):Date
		{
			var now_date:Date;
			var def_date:Date;
			var siteRow:Object = new Object();
			
			if ( param == null )
			{
				now_date = new Date();
			}
			else
			{
				now_date = param;
			}
			
			if ( DM.MovementNominations.siteSettings.length > 0 )
			{
				siteRow = DM.MovementNominations.siteSettings.getItemAt(0);
			}
			if ( siteRow != null && siteRow.hasOwnProperty( "SITE_LD_RETNPRD_NEW_MOV" ) && siteRow["SITE_LD_RETNPRD_NEW_MOV"] != null )
			{
				trace( ".............................................................", siteRow["SITE_LD_RETNPRD_NEW_MOV"]);
				def_date = DateTimeFunc.dateAdd( "d", siteRow["SITE_LD_RETNPRD_NEW_MOV"], now_date );
			}
			else
			{
				def_date = DateTimeFunc.dateAdd( "d", 60, now_date );
			}
			
			
			//trace ("getDefaultDate", now_date, def_date);
			
			return def_date;
		}
		
		public function markCreation():void
		{
			if ( StringUtil.trim(view.frmKey.text).length == 0 || tools.isValueInteger(view.frmKey.text) == false )
			{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_NOM_KEY_B4_ADD_ITEMS'));
				return;
			}
			
			// will create a new line in data grid for update and save
			var count:int;
			
			//count = view.itemList.dataProvider.length;
			count = view.itemList.dataProviderLength;
			
			var obj:Object = new Object();
			
			obj.MVITM_KEY = view.frmKey.text;
			
			if ( count > 0 )
			{
				obj.MVITM_LINE_ID = int(view.itemList.dataProvider.getItemAt(count-1).payload.MVITM_LINE_ID) + 1;
			}
			else
			{
				obj.MVITM_LINE_ID = count+1;
			}
			if ( view.frmTerminal.selectedIndex < 0 )
			{
				view.frmTerminal.selectedIndex = 0;
			}
			obj.MVITM_TERMINAL = view.frmTerminal.selectedItem.TERM_CODE;
			obj.MVITM_TYPE = 0;
			obj.MVITM_ITEM_KEY = "";
			if ( tools.isValueInteger(view.frmKey.text) == true && StringUtil.trim(view.frmKey.text).length > 0 && StringUtil.trim(view.frmKey.text).length <=6 )
			{
				obj.MVITM_ITEM_KEY = String((Number(view.frmKey.text))*1000 + obj.MVITM_LINE_ID);
			}
			else
			{
				obj.MVITM_ITEM_KEY = obj.MVITM_LINE_ID;
			}
			obj.MVITM_ITEM_KEY = obj.MVITM_LINE_ID;
			obj.MVITM_COMPLETED = 0;
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

			obj.MVITM_PLANT_TO = global.INDICATOR_MANDATORY;
			obj.MVITM_PRODCMPY_TO  = global.INDICATOR_MANDATORY;
			obj.MVITM_PRODNAME_TO = global.INDICATOR_MANDATORY;
			obj.MVITM_TANK_TO = "";//global.INDICATOR_MANDATORY;
			
			var newItem:dmMovementItem = new dmMovementItem
				({
					onSuccess 	: successInItemAction,
					payload		: obj
				});
			
			view.itemList.dataProvider.addItem( newItem );
			
			view.itemList.dataProvider[count].action = "+";
			
			view.itemList.invalidateCell( count, -1 );
			
		}
		
		public function markEdition():void
		{
			if ( view.itemList.selectedIndex < 0 )
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.SELECT_LINE_MARK_EDIT') );
			}
			else if ( view.itemList.selectedItem.clnItemAction == "+" )
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.CANNOT_UPD_NEW_LINE') );
			}
			else if ( view.itemList.dataProvider[view.itemList.selectedIndex].payload.MVITM_STATUS  > 0 )
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.CANNOT_UPD_OLD_LINE') );
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
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.SELECT_LINE_MARK_DEL') );
			}
			else if ( view.itemList.selectedItem.clnItemAction == "+" )
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.CANNOT_DEL_NEW_LINE') );
			}
			else if ( view.itemList.dataProvider[view.itemList.selectedIndex].payload.MVITM_STATUS  > 0 )
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.CANNOT_DEL_OLD_LINE') );
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
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.SELECT_LINE_REMOVE_MARK') );
			}
			else if ( view.itemList.selectedItem.clnItemAction == "+" )
			{
				view.itemList.dataProvider.removeItemAt( view.itemList.selectedIndex );
				view.itemList.invalidateDisplayList();
			}
			else
			{
				//view.itemList.selectedItem.clnItemAction = "";	
				var i:int = view.itemList.selectedIndex;
				var obj:Object = view.itemList.dataProvider.getItemAt(i);
				for ( var s:String in view.itemList.dataProvider[i].payload )
				{
					if ( obj.hasOwnProperty(s) )
					{
						view.itemList.dataProvider[i].payload[s] = obj[s];
					}
				}
				view.itemList.selectedItem.clnItemAction = "";	
				view.itemList.invalidateCell(i, -1);
				trace ("***********cancel**********view.itemList.selectedItem.clnItemAction", view.itemList.selectedItem.clnItemAction);
				trace ("***********cancel**********view.itemList.dataProvider[i].action", i, view.itemList.dataProvider[i].action);
			}
		}
		
		public function goToViewSchedule():void
		{
			if ( view.itemList.selectedIndex < 0 )
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.SELECT_LINE_TO_VIEW_SCHD') );
			}
			else
			{
				if ( view.itemList.selectedItem.action == "-" )
				{
					global.msgWarning( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.CANNOT_VIEW_SCHD_WHEN_DEL') );
				}
				else if ( view.itemList.selectedItem.action == "+" )
				{
					global.msgWarning( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.CANNOT_VIEW_SCHD_WHEN_ADD') );
				}
				else if ( view.itemList.selectedItem.action == "*" )
				{
					global.msgWarning( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.CANNOT_VIEW_SCHD_WHEN_EDIT') );
				}
				else
				{
					trace ( "*******************Pop up a screen to view schedule!");
					
					this.movSchedulePopup.popupTitle = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.TITLE.SCHD4NOM');
					this.movSchedulePopup.setSecurity( this.readOnly, this.canUpdate, this.canCreate, this.canDelete, this.hasPassword );
					
					this.movSchedulePopup.parentWidth = this.view.width;
					this.movSchedulePopup.parentHeight = this.view.height;
					
					this.movSchedulePopup.openDialog();
					
					var params:Object = new Object();
					params["move_id"] = view.itemList.selectedItem.payload.MVITM_MOVE_ID;
					params["line_id"] = view.itemList.selectedItem.payload.MVITM_LINE_ID
					params["move_number"] = view.itemList.selectedItem.payload.MVITM_NUMBER;
					params["move_key"] = view.itemList.selectedItem.payload.MVITM_KEY;
					params["item_id"] = view.itemList.selectedItem.payload.MVITM_ITEM_ID;
					this.movSchedulePopup.setFilters( params );
				}
			}
		}
		
		public function goToViewActiveSchedule():void
		{
			trace ( "*******************Pop up a screen to view schedule!");
			
			this.movSchedulePopup.popupTitle = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.TITLE.SCHD4NOM');
			this.movSchedulePopup.setSecurity( this.readOnly, this.canUpdate, this.canCreate, this.canDelete, this.hasPassword );
			
			this.movSchedulePopup.parentWidth = this.view.width;
			this.movSchedulePopup.parentHeight = this.view.height;
			
			this.movSchedulePopup.openDialog();
			
			var params:Object = new Object();
			//params["trip_status"] = 2;
			params["trip_status"] = "";
			this.movSchedulePopup.setFilters( params );
			
		}
		
		public function goToMakeSchedule():void
		{
			if ( view.itemList.selectedIndex < 0 )
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.SELECT_LINE_TO_MAKE_SCHD') );
			}
			else
			{
				if ( view.itemList.selectedItem.action == "-" )
				{
					global.msgWarning( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.CANNOT_MAKE_SCHD_WHEN_DEL') );
				}
				else if ( view.itemList.selectedItem.action == "+" )
				{
					global.msgWarning( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.CANNOT_MAKE_SCHD_WHEN_ADD') );
				}
				else if ( view.itemList.selectedItem.action == "*" )
				{
					global.msgWarning( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.CANNOT_MAKE_SCHD_WHEN_EDIT') );
				}
				else
				{
					trace ( "*******************Pop up a screen to make schedule!");
					//var canCreate:CreateDialog = new CreateDialog( popupCreateScheduleDialog,hasPassword, "Do you want to create a schedule from this nomination item?" );
					popupCreateScheduleDialog();
				}
			}
		}
		
		
		public function closeDialogHandler():void
		{
			this.mainListSelection = view.mainList.selectedIndex;
			view.currentState = "normal";
			//DM.MovementNominations.resultHandler = mainListRefreshHandler;
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
//			this.mainListSelection = -1;
		}
		
		private function popupCreateScheduleDialog():void
		{
			var schdCreate:MovScheduleCreateDlg = new MovScheduleCreateDlg();
			
			schdCreate.hasPassword = this.hasPassword;
			schdCreate.canCreate = this.canCreate;
			schdCreate.canUpdate = this.canUpdate;
			schdCreate.canDelete = this.canDelete;
			schdCreate.readOnly = this.readOnly;
			
			var params:Object = new Object();
			params["move_id"] = view.itemList.selectedItem.payload.MVITM_MOVE_ID;
			params["line_id"] = view.itemList.selectedItem.payload.MVITM_LINE_ID;
			params["move_number"] = view.itemList.selectedItem.payload.MVITM_NUMBER;
			params["move_key"] = view.itemList.selectedItem.payload.MVITM_KEY;
			params["item_id"] = view.itemList.selectedItem.payload.MVITM_ITEM_ID;
			
			schdCreate.params = params;
			schdCreate.callback = closeDialogHandler;
			
			schdCreate.payload = view.itemList.selectedItem.payload;
			
			if ( view.frmSupplier.selectedIndex >= 0 )
			{
				schdCreate.curr_supplier     = view.frmSupplier.selectedItem;
			}
			else
			{
				schdCreate.curr_supplier     = null;
			}
			if ( view.frmCarrier.selectedIndex >= 0 )
			{
				schdCreate.curr_carrier      = view.frmCarrier.selectedItem;
			}
			else
			{
				schdCreate.curr_carrier      = null;
			}
			if ( view.frmVehicle.selectedIndex >= 0 )
			{
				schdCreate.curr_vehicle      = view.frmVehicle.selectedItem;
			}
			else
			{
				schdCreate.curr_vehicle      = null;
			}
			
			
			/*
			if ( view.frmSupplier.selectedIndex >= 0 )
			{
				schdCreate.key_supp_code = view.frmSupplier.selectedItem.CMPY_CODE;
				schdCreate.key_supp_name = view.frmSupplier.selectedItem.CMPY_NAME;
			}
			if ( view.frmCarrier.selectedIndex >= 0 )
			{
				schdCreate.key_carr_code = view.frmCarrier.selectedItem.CMPY_CODE;
				schdCreate.key_carr_name = view.frmCarrier.selectedItem.CMPY_NAME;
			}
			if ( view.frmVehicle.selectedIndex >= 0 )
			{
				schdCreate.key_tanker = view.frmVehicle.selectedItem.TNKR_CODE;
			}
*/
			PopUpManager.addPopUp(schdCreate, (FlexGlobals.topLevelApplication as DisplayObject), true );
			PopUpManager.centerPopUp(schdCreate);
		}
		
		public function goToTransaction():void
		{
			if ( view.itemList.selectedIndex < 0 )
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.SELECT_LINE_TO_VIEW_TRNS') );
			}
			else
			{
				if ( view.itemList.selectedItem.action == "-" )
				{
					global.msgWarning( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.CANNOT_VIEW_TRNS_WHEN_DEL') );
				}
				else if ( view.itemList.selectedItem.action == "+" )
				{
					global.msgWarning( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.CANNOT_VIEW_TRNS_WHEN_ADD') );
				}
				else if ( view.itemList.selectedItem.action == "*" )
				{
					global.msgWarning( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.CANNOT_VIEW_TRNS_WHEN_EDIT') );
				}
				else
				{
					trace ( "*******************Pop up a screen to view transactions!");
					transactionPopup.openDialog();
					transactionPopup.setMovementParams( view.itemList.selectedItem.payload.MVITM_MOVE_ID, view.itemList.selectedItem.payload.MVITM_LINE_ID );
				}
			}
		}
		
		public function goToMakeTransaction():void
		{
			
			if ( view.itemList.selectedIndex < 0 )
			{
				var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.SELECT_LINE_TO_MAKE_TRNS') );
			}
			else
			{
				this.makeTransactionPopup.popupTitle = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.TITLE.MT4NOMITEM');
				this.makeTransactionPopup.setSecurity( this.readOnly, this.canUpdate, this.canCreate, this.canDelete, this.hasPassword );
				
				this.makeTransactionPopup.parentWidth = this.view.width;
				this.makeTransactionPopup.parentHeight = this.view.height;
				
				trace ( "*******************Pop up a screen to make manual transactions!");
				makeTransactionPopup.openDialog();
				
				var params:Object = new Object();
				params["supplier"] = "";//view.frmSupplier.selectedItem.CMPY_CODE;
				params["trip"] = "";//view.frmTripNumber.text;
				params["repost"] = false;
				params["transType"] = 2;//0; //"N";
				params["movItemId"] = view.itemList.selectedItem.payload.MVITM_ITEM_ID;
				params["movItem"] = view.itemList.selectedItem;
				params.close = function():void{PopUpManager.removePopUp(makeTransactionPopup.popup);closeDialogHandler();}
				if ( view.frmCarrier.selectedIndex >= 0 )
				{
					params["movCarrier"]      = view.frmCarrier.selectedItem;
				}
				else
				{
					params["movCarrier"]      = null;
				}
				if ( view.frmVehicle.selectedIndex >= 0 )
				{
					params["movVehicle"]      = view.frmVehicle.selectedItem;
				}
				else
				{
					params["movVehicle"]      = null;
				}
				
				trace ( "*******************Pop up a screen to make manual transactions2222!");
				makeTransactionPopup.setFilters( params );
			}
		}
		
		public function toggleButtonEditability():void
		{
			trace( "........................................toggleButtonEditability", view.itemList.selectedIndex );
			if ( view.currentState != "edit" && view.currentState != "detail" )
			{
				return;
			}
			
			if ( view.itemList.selectedIndex < 0 )
			{
				view.btnAddSchedule.enabled = false;
				view.btnSchedule.enabled = false;
				view.btnMakeTransaction.enabled = false;
				view.btnTransaction.enabled = false;
				view.btnToggleItem.visible = false;
			}
			else
			{
				trace( "........................................toggleButtonEditability2", view.itemList.selectedItem.payload.MVITM_STATUS );
				switch ( int(view.itemList.selectedItem.payload.MVITM_STATUS) )
				{
					case 0:				//0: "NEW",
						view.btnAddSchedule.enabled = this.canCreate;
						view.btnSchedule.enabled = false;
						view.btnMakeTransaction.enabled = this.canCreate;
						view.btnTransaction.enabled = false;
						view.btnToggleItem.visible = false;
						break;
					case 1:				//1: "PARTIALLY SCHEDULED",
						view.btnAddSchedule.enabled = this.canCreate;
						view.btnSchedule.enabled = true;
						view.btnMakeTransaction.enabled = this.canCreate;
						view.btnTransaction.enabled = false;
						view.btnToggleItem.visible = true;
						break;
					case 2:				//2: "FULLY SCHEDULED",
						view.btnAddSchedule.enabled = false;
						view.btnSchedule.enabled = true;
						view.btnMakeTransaction.enabled = this.canCreate;
						view.btnTransaction.enabled = false;
						view.btnToggleItem.visible = true;
						break;
					case 3:				//3: "FULLY MOVED",
						view.btnAddSchedule.enabled = false;
						view.btnSchedule.enabled = true;
						view.btnMakeTransaction.enabled = false;
						view.btnTransaction.enabled = true;
						view.btnToggleItem.visible = true;
						break;
					case 4:				//4: "OUTSTANDING",
						view.btnAddSchedule.enabled = this.canCreate;
						view.btnSchedule.enabled = true;
						view.btnMakeTransaction.enabled = this.canCreate;
						view.btnTransaction.enabled = true;
						view.btnToggleItem.visible = true;
						break;
					case 5:				//5: "FULLY DELIVERED",
						view.btnAddSchedule.enabled = false;
						view.btnSchedule.enabled = true;
						view.btnMakeTransaction.enabled = false;
						view.btnTransaction.enabled = true;
						view.btnToggleItem.visible = true;
						break;
					case 6:				//6: "EXPIRED",
						view.btnAddSchedule.enabled = false;
						view.btnSchedule.enabled = true;
						view.btnMakeTransaction.enabled = false;
						view.btnTransaction.enabled = true;
						view.btnToggleItem.visible = true;
						break;
					case 7:				//7: "PARTIALLY MOVED",
						view.btnAddSchedule.enabled = this.canCreate;
						view.btnSchedule.enabled = true;
						view.btnMakeTransaction.enabled = this.canCreate;
						view.btnTransaction.enabled = true;
						view.btnToggleItem.visible = true;
						break;
					case 8:				//8: "PARTIALLY DELIVERED"
						view.btnAddSchedule.enabled = this.canCreate;
						view.btnSchedule.enabled = true;
						view.btnMakeTransaction.enabled = this.canCreate;
						view.btnTransaction.enabled = true;
						view.btnToggleItem.visible = true;
						break;
					default:
						view.btnAddSchedule.enabled = false;
						view.btnSchedule.enabled = false;
						view.btnMakeTransaction.enabled = false;
						view.btnTransaction.enabled = false;
						view.btnToggleItem.visible = false;
						break;
				}
				
				if ( int(view.itemList.selectedItem.payload.MVITM_COMPLETED) == 1 )
				{
					view.btnToggleItem.label = mx.resources.ResourceManager.getInstance().getString('default','button.lbl.UNLOCK_ITEM');
					view.btnAddSchedule.enabled = false;
					view.btnSchedule.enabled = true;
					view.btnMakeTransaction.enabled = false;
					view.btnTransaction.enabled = true;
				}
				else
				{
					view.btnToggleItem.label = mx.resources.ResourceManager.getInstance().getString('default','button.lbl.LOCK_ITEM');
				}
			}
			
		}
		
		public function toggleDeleteButton():void
		{
			if ( view.currentState != "edit" )
			{
				return;
			}
			view.btnDelete.enabled = this.canDelete;
			for each( var line:Object in view.itemList.dataProvider )
			{
				if ( line.action == "-" || line.action == "+" || line.action == "*" )
				{
					view.btnDelete.enabled = false;
					break;
					
				}
			}
		}
		
		public function toggleCellEditability(event:GridEvent):void
		{
			var i:int;
			var cln:GridColumn;
			
			this.toggleDeleteButton();
			
			if ( event.rowIndex < 0 || event.columnIndex < 0 || event.rowIndex > view.itemList.dataProviderLength-1)
			{
				trace ("***********current cell, out of range:", event.columnIndex, event.rowIndex);
				return;	
			}
			
			this.toggleButtonEditability();
			
			trace ("***********current cell, in the range:", event.columnIndex, event.rowIndex);
			
			for ( i=0; i<view.itemList.columns.length; i++ )
			{
				cln = (view.itemList.columns.getItemAt(i) as GridColumn);
				//trace ("***********current row action:", event.rowIndex, ">>"+view.itemList.dataProvider[event.rowIndex].action+"<<");
				
				// if  no action is initialized, not editable
				if ( view.itemList.dataProvider[event.rowIndex].action == "" 
				  || view.itemList.dataProvider[event.rowIndex].action == " " 
				  || view.itemList.dataProvider[event.rowIndex].action == "-" )
				{
//					trace ("***********current cell, here 222:", event.columnIndex, event.rowIndex);
					cln.editable = false;
					continue;
				}
				
				// if  status is not NEW, not editable
				if (  view.itemList.dataProvider[event.rowIndex].payload.MVITM_STATUS > 0  )
				{
//					trace ("***********current cell, here 333:", event.columnIndex, event.rowIndex);
					cln.editable = false;
					continue;
				}
				// if  item is completed, not editable
				if (  view.itemList.dataProvider[event.rowIndex].payload.MVITM_COMPLETED > 0  )
				{
					//					trace ("***********current cell, here 333:", event.columnIndex, event.rowIndex);
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
							|| cln.dataField == "clnItemTankTo" 
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
					else
					{
						cln.editable = true;
					}
					
					if ( cln.dataField == "clnItemAction" 
						|| cln.dataField == "clnItemLine" 
						|| cln.dataField == "clnItemId" 
						|| cln.dataField == "clnItemFlag" 
						|| cln.dataField == "clnItemTerminal" 
						|| cln.dataField == "clnItemStatus"
						|| cln.dataField == "clnItemQtySchd"
						|| cln.dataField == "clnItemQtyMove"
						|| cln.dataField == "clnItemQtyDelv"
						|| cln.dataField == "clnStoreLocCmpyFrom"
						|| cln.dataField == "clnStoreLocCmpyTo"
						|| cln.dataField == "MVITM_SHIPLOC_FROM"
						|| cln.dataField == "MVITM_SHIPTEXT_FROM"
						|| cln.dataField == "MVITM_SHIPTEXT_FROM2"
						|| cln.dataField == "MVITM_SHIPLOC_TO"
						|| cln.dataField == "MVITM_SHIPTEXT_TO"
						|| cln.dataField == "MVITM_SHIPTEXT_TO2"
					)
					{
						cln.editable = false;
					}
					
					if ( cln.dataField == "clnItemKey" )
					{
						if ( view.itemList.dataProvider[event.rowIndex].action == "+" )
						{
							cln.editable = true;
						}
						else
						{
							cln.editable = false;
						}
					}
					
					trace ("***********current cell, in the range:!!!", event.columnIndex, event.rowIndex, cln.dataField, cln.editable);
					
				}
			}
			
			cln = (view.itemList.columns.getItemAt(event.columnIndex) as GridColumn);
			if ( cln.dataField == "clnItemAction" )
			{
				if ( view.itemList.dataProvider[event.rowIndex].payload.MVITM_STATUS == 0 )
				{
					if ( (view.currentState == "create" && this.canCreate == true) || (view.currentState == "edit" && this.canUpdate == true) || (view.currentState == "detail" && this.canUpdate == true) )
					{
						cln.editable = true;
					}
					else
					{
						cln.editable = false;
					}
					trace ("***********current cell, here 444:", event.columnIndex, event.rowIndex, cln.editable, view.currentState, this.canUpdate);
				}
				else
				{
					cln.editable = false;
					trace ("***********current cell, here 555:", event.columnIndex, event.rowIndex, cln.editable);
				}
			}
			
			if (cln.editable == false)
			{
				if ( view.itemList.dataProvider[event.rowIndex].payload.MVITM_STATUS  > 0 )
				{
					if ( cln.dataField == "clnItemAction" )
					{
						//var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.CANNOT_UPD_OLD_LINE') );
						global.msgWarning( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.CANNOT_UPD_DEL_OLD_LINE') );
					}
				}
				else
				{
					if ( view.itemList.dataProvider[event.rowIndex].action == "" 
						|| view.itemList.dataProvider[event.rowIndex].action == " " )
					{
						if ( cln.dataField == "clnItemAction" )
						{
							//var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.CANNOT_UPD_OLD_LINE') );
							global.msgWarning( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.NO_PERM_EDIT_ITEM') );
						}
						//var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.NOT_ADD_EDIT_MODE') );
						//global.msgWarning( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.NOT_ADD_EDIT_MODE') );
					}
					else if ( view.itemList.dataProvider[event.rowIndex].action == "-" )
					{
						//var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.NOT_DEL_MODE') );
						global.msgWarning( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.NOT_DEL_MODE') );
					}
					else if ( view.itemList.dataProvider[event.rowIndex].action == "*" || view.itemList.dataProvider[event.rowIndex].action == "+" )
					{
						//var errorBox:MessageDialog = new MessageDialog( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.LINE_CELL_NOT_EDITABLE1') + cln.headerText + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.LINE_CELL_NOT_EDITABLE2') );
						global.msgWarning( mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.LINE_CELL_NOT_EDITABLE1') + cln.headerText + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.LINE_CELL_NOT_EDITABLE2') );
					}
					
				}
			}
			
		}
		
		public function isMovementKeyUsed():void
		{
			var obj:Object = new Object();
			obj.field = "MV_KEY";
			obj.value = view.frmKey.text;
			
			var Server:*;
			Server = new amf(global.AppServicesConfig.gatewayURL);
			Server.service('dmMovements.getNumberOfRecords', obj, checkMovementKeyUsed);
		}
		
		public function checkMovementKeyUsed( response : * ):void
		{
			trace ( "............................in checkMovementKeyUsed......................................");
			//tools.pr( response.data );
			var num:int = response.data;
			
			if ( num > 0 )
			{
				mvKeyUsed = true;
			}
			else
			{
				mvKeyUsed = false;
			}
			
			uniqueCheckSum += 1;
			if ( uniqueCheckSum == uniqueCheckTotal )
			{
				uniqueCheckSum = -1;
				this.save_processHandler();
			}
			
			trace ( "............................checkMovementKeyUsed", uniqueCheckSum);
		}
		
		public function isMovementNumberUsed():void
		{
			var obj:Object = new Object();
			obj.field = "MV_NUMBER";
			obj.value = view.frmNumber.text;
			
			var Server:*;
			Server = new amf(global.AppServicesConfig.gatewayURL);
			Server.service('dmMovements.getNumberOfRecords', obj, checkMovementNumberUsed);
		}
		
		public function checkMovementNumberUsed( response : * ):void
		{
			trace ( "............................in checkMovementNumberUsed......................................");
			//tools.pr( response.data );
			var num:int = response.data;
			
			if ( num > 0 )
			{
				mvNumUsed = true;
			}
			else
			{
				mvNumUsed = false;
			}
			
			uniqueCheckSum += 1;
			if ( uniqueCheckSum == uniqueCheckTotal )
			{
				uniqueCheckSum = -1;
				this.save_processHandler();
			}
			
			trace ( "............................checkMovementNumberUsed", uniqueCheckSum);
		}
		
		public function isMovementItemKeyUsed(i:int):void
		{
			var obj:Object = new Object();
			obj.field = "MVITM_ITEM_KEY";
			obj.value = view.itemList.dataProvider[i].payload.MVITM_ITEM_KEY;
			obj.index = i;
			
			var Server:*;
			Server = new amf(global.AppServicesConfig.gatewayURL);
			Server.service('dmMovementItems.getNumberOfIndexedRecords', obj, checkMovementItemKeyUsed);
		}
		
		public function checkMovementItemKeyUsed( response : * ):void
		{
			trace ( "............................in checkMovementItemKeyUsed......................................");
			tools.pr( response.data );
			var num:int = 0;
			var id:int = -1;
			
			if ( response.data.hasOwnProperty('num') )
			{
				num = response.data.num;
			}
			if ( response.data.hasOwnProperty('id') )
			{
				id = response.data.id;
			}
			
			if ( (id>=0 && view.itemList.dataProvider[id].action == "+") && mvItemKeyUsed==false && num > 0 )
			{
				mvItemKeyUsed = true;
				mvItemKeyUsedIndex = id;
			}
			
			uniqueCheckSum += 1;
			if ( uniqueCheckSum == uniqueCheckTotal )
			{
				uniqueCheckSum = -1;
				this.save_processHandler();
			}
			
			trace ( "............................checkMovementItemKeyUsed", uniqueCheckSum);
		}
		
		public function checkItemFields():Boolean
		{
			var errGrid:ArrayCollection=new ArrayCollection();
			var obj:Object;
			var i:int;
			for (i=0; i<view.itemList.dataProviderLength; i++)
			{
				trace ( "TODO ?????? data of movement items record number:", i );
				trace ( i, "----action                ", view.itemList.dataProvider[i].action );
				trace ( i, "----MVITM_KEY             ", view.itemList.dataProvider[i].payload.MVITM_KEY );
				trace ( i, "----MVITM_LINE_ID         ", view.itemList.dataProvider[i].payload.MVITM_LINE_ID );
				trace ( i, "----MVITM_TERMINAL        ", view.itemList.dataProvider[i].payload.MVITM_TERMINAL );
				trace ( i, "----MVITM_TYPE            ", view.itemList.dataProvider[i].payload.MVITM_TYPE );
				trace ( i, "----MVITM_ITEM_KEY        ", view.itemList.dataProvider[i].payload.MVITM_ITEM_KEY );
				trace ( i, "----MVITM_STATUS          ", view.itemList.dataProvider[i].payload.MVITM_STATUS );
				trace ( i, "----MVITM_PROD_QTY        ", view.itemList.dataProvider[i].payload.MVITM_PROD_QTY );
				trace ( i, "----MVITM_PROD_UNIT       ", view.itemList.dataProvider[i].payload.MVITM_PROD_UNIT );
				trace ( i, "----MVITM_PRODCMPY_FROM   ", view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_FROM );
				trace ( i, "----MVITM_PRODCODE_FROM   ", view.itemList.dataProvider[i].payload.MVITM_PRODCODE_FROM );
				trace ( i, "----MVITM_PRODNAME_FROM   ", view.itemList.dataProvider[i].payload.MVITM_PRODNAME_FROM );
				trace ( i, "----MVITM_TANK_FROM       ", view.itemList.dataProvider[i].payload.MVITM_TANK_FROM );
				trace ( i, "----MVITM_PRODCMPY_TO     ", view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_TO );
				trace ( i, "----MVITM_PRODCODE_TO     ", view.itemList.dataProvider[i].payload.MVITM_PRODCODE_TO );
				trace ( i, "----MVITM_PRODNAME_TO     ", view.itemList.dataProvider[i].payload.MVITM_PRODNAME_TO );
				trace ( i, "----MVITM_TANK_TO         ", view.itemList.dataProvider[i].payload.MVITM_TANK_TO );
				trace ( i, "----MVITM_COMMENTS        ", view.itemList.dataProvider[i].payload.MVITM_COMMENTS );
				trace ( i, "----MVITM_QTY_SCHD        ", view.itemList.dataProvider[i].payload.MVITM_QTY_SCHD );
				trace ( i, "----MVITM_QTY_MOVE        ", view.itemList.dataProvider[i].payload.MVITM_QTY_MOVE );
				trace ( i, "----MVITM_QTY_DELV        ", view.itemList.dataProvider[i].payload.MVITM_QTY_DELV );
				if ( view.itemList.dataProvider[i].action != "+" && view.itemList.dataProvider[i].action != "*" )
				{
					continue;
				}
				
				if ( int(view.itemList.dataProvider[i].payload.MVITM_STATUS) > 0 )
				{
					continue;
				}
				
				var lineLbl:String = mx.resources.ResourceManager.getInstance().getString('default','VALIDATION__FIELD__LINE') + String(i+1) + ": ";
				if( view.itemList.dataProvider[i].payload.MVITM_ITEM_KEY == "" || view.itemList.dataProvider[i].payload.MVITM_ITEM_KEY == null )
				{
					//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_ITEM_KEY') + String(i+1) + ".");
					//return false;
					obj=new Object();
					obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_ITEM_KEY');
					obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_ITEM_KEY') + String(i+1) + ".";
					errGrid.addItem( obj );
				}
				else
				{
					if ( tools.isValueInteger(view.itemList.dataProvider[i].payload.MVITM_ITEM_KEY) == false )
					{
						//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_ITEM_KEY_INT') + String(i+1) + ".");
						//return false;
						obj=new Object();
						obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_ITEM_KEY');
						obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_ITEM_KEY_INT') + String(i+1) + ".";
						errGrid.addItem( obj );
					}
					if( String(view.itemList.dataProvider[i].payload.MVITM_ITEM_KEY).length > 9 )
					{
						//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ITEM_KEY_SIZE_ERROR1') + String(i+1) + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ITEM_KEY_SIZE_ERROR2'));
						//return false;
						obj=new Object();
						obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_ITEM_KEY');
						obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ITEM_KEY_SIZE_ERROR1') + String(i+1) + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ITEM_KEY_SIZE_ERROR2');
						errGrid.addItem( obj );
					}
				}
				if ( this.mvItemKeyUsedIndex==i && view.itemList.dataProvider[i].action == "+" && this.mvItemKeyUsed == true )
				{
					//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ITEM_KEY_DUP') + String(this.mvItemKeyUsedIndex+1) + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.IS_DUPLICATED'));
					//return false;
					obj=new Object();
					obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_ITEM_KEY');
					obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ITEM_KEY_DUP') + String(this.mvItemKeyUsedIndex+1) + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.IS_DUPLICATED');
					errGrid.addItem( obj );
				}
				
				if( view.itemList.dataProvider[i].payload.MVITM_PROD_QTY == "0" || view.itemList.dataProvider[i].payload.MVITM_PROD_QTY == "")
				{
					//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PROD_QTY') + String(i+1) + ".");
					//return false;
					obj=new Object();
					obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_PROD_QTY');
					obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PROD_QTY') + String(i+1) + ".";
					errGrid.addItem( obj );
				}
				else
				{
					if ( tools.isValueNumeric(view.itemList.dataProvider[i].payload.MVITM_PROD_QTY) == false )
					{
						//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PROD_QTY_NUM') + String(i+1) + ".");
						//return false;
						obj=new Object();
						obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_PROD_QTY');
						obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PROD_QTY_NUM') + String(i+1) + ".";
						errGrid.addItem( obj );
					}
					else
					{
						if ( int(view.itemList.dataProvider[i].payload.MVITM_PROD_QTY) < 0 )
						{
							//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PROD_QTY_GT_ZERO') + String(i+1) + ".");
							//return false;
							obj=new Object();
							obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_PROD_QTY');
							obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PROD_QTY_GT_ZERO') + String(i+1) + ".";
							errGrid.addItem( obj );
						}
					}
				}
				
				if ( String(view.itemList.dataProvider[i].payload.MVITM_TYPE).length == 0 )
				{
					obj=new Object();
					obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_TYPE');
					obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.PROMPT.MVITM_TYPE') + ".";
					errGrid.addItem( obj );
				}
				else
				{
					if ( int(view.itemList.dataProvider[i].payload.MVITM_TYPE) == 0 )
					{
						if( view.itemList.dataProvider[i].payload.MVITM_PLANT_TO == global.INDICATOR_MANDATORY 
							|| view.itemList.dataProvider[i].payload.MVITM_PLANT_TO == null || view.itemList.dataProvider[i].payload.MVITM_PLANT_TO == "" )
						{
							//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PLANT_TO') + String(i+1) + ".");
							//return false;
							obj=new Object();
							obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_PLANT_TO');
							obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PLANT_TO') + String(i+1) + ".";
							errGrid.addItem( obj );
						}
						if( view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_TO == global.INDICATOR_MANDATORY 
							|| view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_TO == null || view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_TO == "" )
						{
							//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_SUPP_TO') + String(i+1) + ".");
							//return false;
							obj=new Object();
							obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_PRODCMPY_TO');
							obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_SUPP_TO') + String(i+1) + ".";
							errGrid.addItem( obj );
						}
						if( view.itemList.dataProvider[i].payload.MVITM_PRODCODE_TO == global.INDICATOR_MANDATORY || view.itemList.dataProvider[i].payload.MVITM_PRODCODE_TO == ""  
							|| view.itemList.dataProvider[i].payload.MVITM_PRODCODE_TO == null )
						{
							//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PROD_TO') + String(i+1) + ".");
							//return false;
							obj=new Object();
							obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_PRODCODE_TO');
							obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PROD_TO') + String(i+1) + ".";
							errGrid.addItem( obj );
						}
						/*
						if( view.itemList.dataProvider[i].payload.MVITM_TANK_TO == global.INDICATOR_MANDATORY 
						|| view.itemList.dataProvider[i].payload.MVITM_TANK_TO == null )
						{
						global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_TANK_TO') + String(i+1) + ".");
						return false;
						}*/
					}
					
					if ( int(view.itemList.dataProvider[i].payload.MVITM_TYPE) == 1 )
					{
						if( view.itemList.dataProvider[i].payload.MVITM_PLANT_FROM == global.INDICATOR_MANDATORY 
							|| view.itemList.dataProvider[i].payload.MVITM_PLANT_FROM == null || view.itemList.dataProvider[i].payload.MVITM_PLANT_FROM == "" )
						{
							//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PLANT_FROM') + String(i+1) + ".");
							//return false;
							obj=new Object();
							obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_PLANT_FROM');
							obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PLANT_FROM') + String(i+1) + ".";
							errGrid.addItem( obj );
						}
						if( view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_FROM == global.INDICATOR_MANDATORY 
							|| view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_FROM == null || view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_FROM == "" )
						{
							//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_SUPP_FROM') + String(i+1) + ".");
							//return false;
							obj=new Object();
							obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_PRODCMPY_FROM');
							obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_SUPP_FROM') + String(i+1) + ".";
							errGrid.addItem( obj );
						}
						if( view.itemList.dataProvider[i].payload.MVITM_PRODCODE_FROM == global.INDICATOR_MANDATORY || view.itemList.dataProvider[i].payload.MVITM_PRODCODE_FROM == "" 
							|| view.itemList.dataProvider[i].payload.MVITM_PRODCODE_FROM == null )
						{
							//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PROD_FROM') + String(i+1) + ".");
							//return false;
							obj=new Object();
							obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_PRODCODE_FROM');
							obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PROD_FROM') + String(i+1) + ".";
							errGrid.addItem( obj );
						}
						/*
						if( view.itemList.dataProvider[i].payload.MVITM_TANK_FROM == global.INDICATOR_MANDATORY 
						|| view.itemList.dataProvider[i].payload.MVITM_TANK_FROM == null )
						{
						global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_TANK_FROM') + String(i+1) + ".");
						return false;
						}*/
					}
					
					if ( int(view.itemList.dataProvider[i].payload.MVITM_TYPE) == 2 )
					{
						if( view.itemList.dataProvider[i].payload.MVITM_PLANT_FROM == global.INDICATOR_MANDATORY 
							|| view.itemList.dataProvider[i].payload.MVITM_PLANT_FROM == null || view.itemList.dataProvider[i].payload.MVITM_PLANT_FROM == "" )
						{
							//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PLANT_FROM') + String(i+1) + ".");
							//return false;
							obj=new Object();
							obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_PLANT_FROM');
							obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PLANT_FROM') + String(i+1) + ".";
							errGrid.addItem( obj );
						}
						if( view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_FROM == global.INDICATOR_MANDATORY 
							|| view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_FROM == null || view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_FROM == "" )
						{
							//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_SUPP_FROM') + String(i+1) + ".");
							//return false;
							obj=new Object();
							obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_PRODCMPY_FROM');
							obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_SUPP_FROM') + String(i+1) + ".";
							errGrid.addItem( obj );
						}
						if( view.itemList.dataProvider[i].payload.MVITM_PRODCODE_FROM == global.INDICATOR_MANDATORY || view.itemList.dataProvider[i].payload.MVITM_PRODCODE_FROM == ""  
							|| view.itemList.dataProvider[i].payload.MVITM_PRODCODE_FROM == null )
						{
							//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PROD_FROM') + String(i+1) + ".");
							//return false;
							obj=new Object();
							obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_PRODCODE_FROM');
							obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PROD_FROM') + String(i+1) + ".";
							errGrid.addItem( obj );
						}
						/*
						if( view.itemList.dataProvider[i].payload.MVITM_TANK_FROM == global.INDICATOR_MANDATORY 
						|| view.itemList.dataProvider[i].payload.MVITM_TANK_FROM == null )
						{
						global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_TANK_FROM') + String(i+1) + ".");
						return false;
						}*/
						
						if( view.itemList.dataProvider[i].payload.MVITM_PLANT_TO == global.INDICATOR_MANDATORY 
							|| view.itemList.dataProvider[i].payload.MVITM_PLANT_TO == null || view.itemList.dataProvider[i].payload.MVITM_PLANT_TO == "" )
						{
							//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PLANT_TO') + String(i+1) + ".");
							//return false;
							obj=new Object();
							obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_PLANT_TO');
							obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PLANT_TO') + String(i+1) + ".";
							errGrid.addItem( obj );
						}
						if( view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_TO == global.INDICATOR_MANDATORY 
							|| view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_TO == null || view.itemList.dataProvider[i].payload.MVITM_PRODCMPY_TO == "" )
						{
							//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_SUPP_TO') + String(i+1) + ".");
							//return false;
							obj=new Object();
							obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_PRODCMPY_TO');
							obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_SUPP_TO') + String(i+1) + ".";
							errGrid.addItem( obj );
						}
						if( view.itemList.dataProvider[i].payload.MVITM_PRODCODE_TO == global.INDICATOR_MANDATORY || view.itemList.dataProvider[i].payload.MVITM_PRODCODE_TO == ""  
							|| view.itemList.dataProvider[i].payload.MVITM_PRODCODE_TO == null )
						{
							//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PROD_TO') + String(i+1) + ".");
							//return false;
							obj=new Object();
							obj['name'] = lineLbl + mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MVITM_PRODCODE_TO');
							obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_PROD_TO') + String(i+1) + ".";
							errGrid.addItem( obj );
						}
						/*
						if( view.itemList.dataProvider[i].payload.MVITM_TANK_TO == global.INDICATOR_MANDATORY 
						|| view.itemList.dataProvider[i].payload.MVITM_TANK_TO == null )
						{
						global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.MESSAGE.ENTER_TANK_TO') + String(i+1) + ".");
						return false;
						}*/
					}
				}
				
			}
			
			//return true;
			if ( errGrid.length > 0 )
			{
				errorDialog = new ErrorDialog( closeErrorDialog, mx.resources.ResourceManager.getInstance().getString('default','VALIDATION__PROMPT'), errGrid, mx.resources.ResourceManager.getInstance().getString('default','VALIDATION__TITLE'));
				return false;
			}
			else
			{
				return true;
			}
			
		}
		
		public function closeErrorDialog():void
		{
			PopUpManager.removePopUp(this.errorDialog.dialog );	
		}
		
		public function goToExportData(): void
		{
			var f:FileReference = new FileReference();
			f.save(DM.MovementNominations.csv,"MovementNominations.csv");
			//genReport.prepExportWithMappingColumns( view.mainList, "Special Movements.csv", this.mapObj );
			
			
/*			var total:int;
			genReport.prepExportWithMappingColumns( view.mainList, "Movement Nominations.csv", this.mapObj );
*/			
/*			DM.MovementNominations.resultHandler = exportListRefreshHandler;
			total = DM.MovementNominations.totalCount;
			DM.MovementNominations.populate( {groupFilters: filterStack, orders:this.orderCollection.toArray(), needFetchLists:refreshLists, 
				pageSize:total, seek:0, pos:1} );
*/		}
		
		public function exportListRefreshHandler():void
		{
			
			genReport.prepExportWithMappingColumns( view.mainList, "Movement Nominations.csv", this.mapObj );
		}
		
		public function clearValidator(): void
		{
			view.fltNominationNumber.required=false;
		}
				
	}
}