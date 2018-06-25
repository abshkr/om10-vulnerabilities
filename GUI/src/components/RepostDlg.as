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
	
	import views.v_ScheduleRepost;	
	
	public class RepostDlg
	{
		public var popup:v_ScheduleRepost = new v_ScheduleRepost();
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
		
		protected function onClose(event:CloseEvent):void
		{
			PopUpManager.removePopUp(popup);
			popup.removeEventListener(CloseEvent.CLOSE,onClose);
			if (callback != null) callback();
		}
	}
}