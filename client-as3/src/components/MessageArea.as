package components
{
	import components.DKI_MessageArea;
	
	import flash.display.DisplayObject;
	
	import mx.controls.Button;
	import mx.core.FlexGlobals;
	import mx.events.FlexEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	
	import spark.components.SkinnableContainer;
	
	public class MessageArea
	{
		private var dialog:DKI_MessageArea = new DKI_MessageArea();
		
		public function MessageArea(message:String)
		{
			super();
			dialog.msg= message;
			PopUpManager.addPopUp(dialog,FlexGlobals.topLevelApplication as DisplayObject,true);
			PopUpManager.centerPopUp(dialog);
		}
	}
}