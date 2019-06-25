package components
{	
	import flash.display.DisplayObject;
	
	import mx.controls.Button;
	import mx.core.FlexGlobals;
	import mx.events.CloseEvent;
	import mx.events.EventListenerRequest;
	import mx.events.FlexEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	
	import views.v_OpenOrdersPopup;
	
	
	public class OpenOrdersDlg
	{
		public var popup:v_OpenOrdersPopup = new v_OpenOrdersPopup();
		public var callback: Function;
		public var orderItemLine:Object=new Object();
		public var orderAssigned:Boolean = false;
		
		public function openDialog()
		{
			PopUpManager.addPopUp(popup,FlexGlobals.topLevelApplication.main,true);
			PopUpManager.centerPopUp(popup);
			popup.addEventListener(CloseEvent.CLOSE,onClose);
		}
		
		public function setParams(value:Object):void
		{
			popup.setParams(value);
		}
				
		public function setState(value:String): void
		{
			popup.currentState=value;
		}
		
		public function setSecurity(isRead:Boolean=true, isUpdate:Boolean=false, isCreate:Boolean=false, isDelete:Boolean=false, isPassword:Boolean=false): void
		{
			popup.readOnly = isRead;
			popup.canUpdate = isUpdate;
			popup.canCreate = isCreate;
			popup.canDelete = isDelete;
			popup.hasPassword = isPassword; 
		}
		
		protected function onClose(event:CloseEvent):void
		{
			this.orderAssigned = popup.okPressed;
			this.orderItemLine = popup.orderItemLine;
			
			PopUpManager.removePopUp(popup);
			popup.removeEventListener(CloseEvent.CLOSE,onClose);
			if (callback != null) callback(this.orderItemLine, this.orderAssigned);
		}
	}
}