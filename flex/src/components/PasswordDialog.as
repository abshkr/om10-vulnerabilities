package components
{
	import flash.display.DisplayObject;
	
	import mx.controls.Button;
	import mx.core.FlexGlobals;
	import mx.events.FlexEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	
	import spark.components.SkinnableContainer;
	
	public class PasswordDialog
	{
		private var dialog:DKI_PassBox = new DKI_PassBox();
		
		public function PasswordDialog(value:Function)
		{
			super();
			dialog.callBack=value;
			dialog.msg= mx.resources.ResourceManager.getInstance().getString('default','SET_PASSWORD');
			PopUpManager.addPopUp(dialog,FlexGlobals.topLevelApplication as DisplayObject,true);
			PopUpManager.centerPopUp(dialog);
		}
	}
}