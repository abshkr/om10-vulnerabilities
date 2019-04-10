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
	
	
	import views.v_MovementSchedules;
	
	
	public class MovSchedulesDlg
	{
		public var popup:v_MovementSchedules = new v_MovementSchedules();
		
		public function openDialog()
		{
			PopUpManager.addPopUp(popup,FlexGlobals.topLevelApplication.main,true);
			PopUpManager.centerPopUp(popup);
			popup.addEventListener(CloseEvent.CLOSE,onClose);
		}
		
		public function setFilters( params:*=false ):void
		{
			popup.controller.setFilters( params );
		}
		
		protected function onClose(event:CloseEvent):void
		{
			PopUpManager.removePopUp(popup);
			popup.removeEventListener(CloseEvent.CLOSE,onClose);
		}
	}
}