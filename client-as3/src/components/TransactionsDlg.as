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
	
	import views.v_TransactionPopUp;
	
	
	public class TransactionsDlg
	{
		public var popup:v_TransactionPopUp = new v_TransactionPopUp();
		public var callback: Function;
		
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
		
		public function setMovementParams(move_id:String, line_id:String):void
		{
			popup.setMovementParams(move_id, line_id);
		}
		
		public function setState(value:String): void
		{
			popup.currentState=value;
		}
		
		protected function onClose(event:CloseEvent):void
		{
			PopUpManager.removePopUp(popup);
			popup.removeEventListener(CloseEvent.CLOSE,onClose);
			if (callback != null) callback();
		}
	}
}