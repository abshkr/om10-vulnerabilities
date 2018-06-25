package controllers
{
	import components.DKI_AlertBox;
	
	import dm.DM;
	import dm.models.dmMovementCompanyBay;
	import dm.remoteDataService;
	import dm.utils.tools;
	
	import flash.display.DisplayObject;
	import flash.events.Event;
	
	import mx.core.FlexGlobals;
	import mx.events.FlexEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	
	import views.v_MovementCompanyBays;
	
	
	public class C_MovementCompanyBays
	{
		[Bindable] public static var BAY_INDEX:Number     = -1;
		[Bindable] public static var COMPANY_INDEX:Number = -1;
		[Bindable] public static var TYPE_INDEX:Number    = -1;
		
		[Bindable] public var readOnly:Boolean = false;
		[Bindable] public var canReset:Boolean = false;
		[Bindable] public var canUpdate:Boolean = false;
		[Bindable] public var canCreate:Boolean = true;
		[Bindable] public var canDelete:Boolean = false;
		[Bindable] public var hasPassword:Boolean = false;
		
		[Bindable] public var supplierList:remoteDataService = new remoteDataService( "ListLibraryService.lookupCompany", null, lookupSupplier_resultHandler );
		[Bindable] public var loadBayList:remoteDataService = new remoteDataService( "ListLibraryService.lookupLoadBay", null, lookupLoadBay_resultHandler );

		[Bindable] public var view:v_MovementCompanyBays;
		
		public function mainFilter(obj:dmMovementCompanyBay):Boolean{
			if(view.fltBay)    if(BAY_INDEX>-1)    if(obj.clnBay      != view.fltBay.selectedItem.BAD_PHYSCODE)return false;
			if(view.fltCompany)if(COMPANY_INDEX>-1)if(obj.clnCmpyCode != view.fltCompany.selectedItem.CMPY_CODE)return false;
			//if(view.fltType)   if(TYPE_INDEX>-1)   if(obj.clnBayType  != view.fltType.selectedItem)return false;
			if(view.fltType)   if(TYPE_INDEX>-1)   if(obj.clnBayType  != view.fltType.selectedItem.BAY_TYPE_NAME)return false;
			return true;
		}
		public function C_MovementCompanyBays(){
		}
		
		
		public function creationCompleteHandler(event:FlexEvent):void
		{
			trace ("-------------start creationCompleteHandler");
			if ( DM.MovementCompanyBays.asynServiceCall == true )
			{
				this.supplierList.service( 1, 'N' );
				this.loadBayList.service( 'N' );
			}
		}
		
		private function lookupSupplier_resultHandler():void
		{
			for each(var o:Object in supplierList.source)
			{
				/*for ( var s:String in o )
				{
					o[s.toUpperCase()] = o[s];
				}*/
				o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
			}
			
			DM.MovementCompanyBays.companys = supplierList;
			//DM.MovementCompanyBays.reload();
			
			for each ( var row:Object in view.mainList.dataProvider )
			{
				var temp:String = row.clnCmpyName;
			}
			/*if ( currentFields.hasOwnProperty( "order_supp_code" ) )
			{
				this.fltr_supplier.selectedIndex = tools.getItemIndexFromCode( currentFields["order_supp_code"], supplierList, "cmpy_code");
			}
			
			if (currentState == "edit" || currentState == "detail")
			{
				this.order_supp_code.selectedItem = dataGrid.selectedItem.order_supp_name;
			}*/
		}
		
		private function lookupLoadBay_resultHandler():void
		{
			/*for each(var o:Object in loadBayList.source)
			{
				for ( var s:String in o )
				{
					o[s.toUpperCase()] = o[s];
				}
			}*/
			
			DM.MovementCompanyBays.bays = loadBayList;
			
			for each ( var row:Object in view.mainList.dataProvider )
			{
				var temp:String = row.clnBay;
			}
		}
		
		
		public function create():void{
			if(view.frmBay.selectedIndex == -1){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','CMPYBAY.MESSAGE.BAY'));
				return;
			}
			if(view.frmCompany.selectedIndex == -1){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','CMPYBAY.MESSAGE.COMPANY'));
				return;
			}
			if(view.frmType.selectedIndex == -1){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','CMPYBAY.MESSAGE.BAY_TYPE'));
				return;
			}
			var newModel:dmMovementCompanyBay = new dmMovementCompanyBay({
				create 		: true,
				onSuccess 	: function():void{
					DM.MovementCompanyBays.reload();
					view.currentState = 'normal';
				},
				payload		:{
					BACL_BAY_CODE  :String(view.frmBay.selectedItem.BAD_PHYSCODE),
					BACL_CMPY_CODE :String(view.frmCompany.selectedItem.CMPY_CODE),
//					BACL_BAY_TYPE  :view.frmType.selectedIndex
					BACL_BAY_TYPE  :view.frmType.selectedItem.BAY_TYPE_ID
				}					
			});
			
		}
		public function remove():void{
			
			
			
			var selectedItem:dmMovementCompanyBay = view.mainList.selectedItem as dmMovementCompanyBay;
			var ad:DKI_AlertBox = new DKI_AlertBox();
			PopUpManager.addPopUp(ad,FlexGlobals.topLevelApplication as DisplayObject,true);
			PopUpManager.centerPopUp(ad);
			ad.msg = mx.resources.ResourceManager.getInstance().getString('default','CMPYBAY.MESSAGE.CONFIRM_DELETE') + " '" + selectedItem.clnBay + " - " + selectedItem.clnCmpyName + "' ?";
			ad.callBack = function():void{
				selectedItem.remove({
					onSuccess 	: function():void{
						DM.MovementCompanyBays.reload();
						view.currentState = 'normal';
					}
				});	
			}
				
				
			
		}
		public function update():void{
			if(view.frmType.selectedIndex == -1){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','CMPYBAY.MESSAGE.BAY_TYPE'));
				return;
			}
			view.mainList.selectedItem.update({
				onSuccess 	: function():void{
					DM.MovementCompanyBays.reload();
					view.currentState = 'normal';
				},
				payload		:{
//					BACL_BAY_TYPE  :view.frmType.selectedIndex
					BACL_BAY_TYPE  :view.frmType.selectedItem.BAY_TYPE_ID
				}					
			});
		}
		
		public function getBayFromCode(code:String):Object{
			for each(var o:Object in DM.MovementCompanyBays.bays){
				if(o.BAD_PHYSCODE == code) return o;
			}
			return null;
		}
		
		public function getCompanyFromCode(code:String):Object{
			for each(var o:Object in DM.MovementCompanyBays.companys){
				if(o.CMPY_CODE == code) return o;
			}
			return null;
		}
		
		public function getBayTypeFromCode(code:String):Object{
			for each(var o:Object in DM.MovementCompanyBays.types){
				if(o.BAY_TYPE_NAME == code) return o;
			}
			return null;
		}
		
		public function editSelected():void{
			view.callLater(function():void{
				view.frmBay.selectedItem     = getBayFromCode(view.mainList.selectedItem.clnBay);
				view.frmCompany.selectedItem = getCompanyFromCode(view.mainList.selectedItem.clnCmpyCode);
//				view.frmType.selectedItem    = view.mainList.selectedItem.clnBayType;
				view.frmType.selectedItem    = getBayTypeFromCode(view.mainList.selectedItem.clnBayType);
			});
		}
		public function refreshMainFilter():void{
			if(view.currentState!='widget')view.currentState = 'normal';
			DM.MovementCompanyBays.filterFunction = mainFilter;
			DM.MovementCompanyBays.refresh();
		}
		
		public function clearFilter(e:Event = null){
			BAY_INDEX     = -1;
			COMPANY_INDEX = -1;
			TYPE_INDEX    = -1;
			refreshMainFilter();
		}
	}
}