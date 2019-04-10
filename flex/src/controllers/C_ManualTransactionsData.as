package controllers
{
	import com.adobe.fiber.runtime.lib.DateTimeFunc;
	
	import components.DKI_AlertBox;
	import components.DKI_PassBox;
	import components.MessageDialog;
	import components.ModalEquipmentType;
	import components.PasswordCheckDlg;
	
	import dm.DM;
	import dm.collections.dmManualTransactionsData;
	import dm.models.dmManualTransactionData;
	import dm.models.dmModel;
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
	
	import views.v_ManualTransactionsData;

	public class C_ManualTransactionsData extends EventDispatcher
	{
		[Bindable] public var view:v_ManualTransactionsData;
		
		[Bindable] public var readOnly:Boolean    = false;
		[Bindable] public var canReset:Boolean    = false;
		[Bindable] public var canUpdate:Boolean   = false;
		[Bindable] public var canCreate:Boolean   = false;
		[Bindable] public var canDelete:Boolean   = false;
		[Bindable] public var hasPassword:Boolean = false;
		
		private var alertDiag:DKI_AlertBox;
		
		public function initialize():void
		{
			// Clear grid data provider.
			if (DM.ManualTransactionsData.mtDataArr.length > 0)
			{
				DM.ManualTransactionsData.mtDataArr.removeAll();
			}
			
			// Clear user selectd item id.
			DM.ManualTransactionsData.selectedID = '-1';
			
			getSavedMTHeadData();
			
		}
		
		public function load(f:Function = null):void
		{
			if (view.mtData.selectedIndex == -1)
			{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SELECT_ONE_MT_DATA'));
				return;
			}

			DM.ManualTransactionsData.selectedID = view.mtData.selectedItem.mt_id;
			
			view.dispatchEvent(new CloseEvent(CloseEvent.CLOSE, true, false));
		}

		public function onDelete(f:Function = null):void
		{
			if (view.mtData.selectedIndex == -1)
			{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SELECT_ONE_MT_DATA'));
				return;
			}

			// Delete one saved Manual Transaction data.
			alertDiag = new DKI_AlertBox();
			alertDiag.callBack = delMTData;
			alertDiag.msg= mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.ALERT_DELETE_MT_DATA1') 
				+ " [#" + view.mtData.selectedItem.mt_id + "] " 
				+ mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.ALERT_DELETE_MT_DATA2');
			PopUpManager.addPopUp(alertDiag,FlexGlobals.topLevelApplication as DisplayObject,true);
			PopUpManager.centerPopUp(alertDiag);
		}
		
		public function delMTData():void
		{
			if (view.mtData.selectedIndex != -1)
			{
				var call:CallResponder = new CallResponder();
				var oDst:Object;
				var idx:int    = view.mtData.selectedIndex;
				var seq:String = view.mtData.selectedItem.mt_id;
				call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_LOAD_MT_DATA'));});
				call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
					if (obj != null && obj.result != null && obj.result == 0)
					{
						DM.ManualTransactionsData.mtDataArr.removeItemAt(idx);
						DM.ManualTransactionsData.mtDataArr.refresh();
						global.msgSuccess( mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SUCCEED_DELETE_MT_DATA') + " [#" + seq + "]." );
					}
					else
					{
						global.msgFail( mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_DELETE_MT_DATA') + " [#" + seq + "]." );
					}
					
				});
				call.token = view.manualtransactionsservice.deleteMTData(view.mtData.selectedItem.mt_id);
			}
		}
		
		public function scrollForward_effectEndHandler(event:EffectEvent):void
		{
			view.scrollForward.end();
		}
		
		public function dataGrid_creationCompleteHandler(event:FlexEvent):void
		{
		}
		
		public function dataGrid_changeHandler(event:GridSelectionEvent, callback:Function = null):void
		{
		}
		
		public function dataGrid_doubleclickHandler(event:MouseEvent):void
		{
			if (view.mtData.selectedIndex != -1)
			{
				load();
			}
		}
		
		public function buildTip(item:Object, obj:Object):String
		{
			var stat:String = mx.resources.ResourceManager.getInstance().getString('default','MTRAN.OPTION.MT_STATUS.UNKNOWN');
			if (item.hasOwnProperty('mt_status'))
			{
				if (item.mt_status.toUpperCase() == 'N')
					stat = mx.resources.ResourceManager.getInstance().getString('default','MTRAN.OPTION.MT_STATUS.SAVED');
				else if (item.mt_status.toUpperCase() == 'S')
					stat = mx.resources.ResourceManager.getInstance().getString('default','MTRAN.OPTION.MT_STATUS.SUBMITTED');
				else
					stat = stat;
			}
			
			return stat;
		}
		
		public function getSavedMTHeadData(callback:Function = null):void
		{
			var call:CallResponder = new CallResponder();
			var oDst:Object;
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_MT_HEADDATA'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				for each (var oSrc:Object in obj.result)
				{
					var oDst:Object = new Object();
					var strHead:String;
					var len:Number;
					
					// Get manual transaction head data.
					strHead = oSrc.gud_head_data;
					len = strHead.length;
					var xmlHead = new XML(strHead);
					var TYPE_UNKNOWN:String=mx.resources.ResourceManager.getInstance().getString('default','MTRAN.OPTION.TRNSTYPE.UNKNOWN');
					var TYPE_TRIP:String=mx.resources.ResourceManager.getInstance().getString('default','MTRAN.OPTION.TRNSTYPE.SHIPMENT');
					var TYPE_OO:String=mx.resources.ResourceManager.getInstance().getString('default','MTRAN.OPTION.TRNSTYPE.OPEN_ORDER');
					var TYPE_NOM:String=mx.resources.ResourceManager.getInstance().getString('default','MTRAN.OPTION.TRNSTYPE.NOMINATION');
					
					oDst.mt_id            = Number(oSrc.gud_id);
					oDst.mt_status        = oSrc.gud_status;
					oDst.mt_type          = (xmlHead.TRANSACTION_TYPE == 'S') ? TYPE_TRIP : ((xmlHead.TRANSACTION_TYPE == 'O') ? TYPE_OO : ((xmlHead.TRANSACTION_TYPE == 'N') ? TYPE_NOM : TYPE_UNKNOWN));
					oDst.mt_supplier      = String(xmlHead.SUPPLIER);
					oDst.mt_customer      = String(xmlHead.CUSTOMER);
					oDst.mt_trip_no       = String(xmlHead.LOAD_NUMBER);
					oDst.mt_order_no      = String(xmlHead.ORDER_TRIP_IND);
					oDst.mt_carrier       = String(xmlHead.CARRIER);
					oDst.mt_tanker        = String(xmlHead.TANKER_CODE);
					oDst.mt_driver        = String(xmlHead.OPERATOR_CODE);
					oDst.mt_tas_ref       = String(xmlHead.TAS_REF);
					oDst.mt_user_comments = String(xmlHead.USER_COMMENTS);
					oDst.mt_datetime_st   = view.dateConvert.format(String(xmlHead.START_TIME));
					oDst.mt_datetime_ed   = view.dateConvert.format(String(xmlHead.FINISH_TIME));
					oDst.mt_user          = oSrc.gud_user;
					oDst.mt_create_date   = oSrc.gud_create_date;
					oDst.mt_update_date   = oSrc.gud_update_date;
					
					DM.ManualTransactionsData.mtDataArr.addItem(oDst);
				}
				// Debug use global.msgSuccess("Loading Manual Transaction head data succeed.");
			});
			call.token = view.manualtransactionsservice.readMTHeadData(null);
		}
	}
}