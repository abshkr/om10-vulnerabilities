package components
{
	import components.DKI_AlertBox;
	
	import flash.display.DisplayObject;
	
	import mx.controls.Button;
	import mx.core.FlexGlobals;
	import mx.events.CloseEvent;
	import mx.events.EventListenerRequest;
	import mx.events.FlexEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	
	import spark.components.SkinnableContainer;
	
	public class ConfirmDialog
	{
		private var callback:Function;
		private var dialog:DKI_AlertBox = new DKI_AlertBox();
		
		public function ConfirmDialog(value:Function, msg:String)
		{
			super();
			callback = value;
			dialog.callBack=value;
			dialog.msg=msg;
			PopUpManager.addPopUp(dialog,FlexGlobals.topLevelApplication as DisplayObject,true);
			PopUpManager.centerPopUp(dialog);
		}
	}
}