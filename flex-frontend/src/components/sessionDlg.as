package components
{
	import flash.display.DisplayObject;
	
	import mx.controls.Button;
	import mx.core.FlexGlobals;
	import mx.events.FlexEvent;
	import mx.managers.PopUpManager;
	import components.DKI_AlertBox;
	
	import spark.components.SkinnableContainer;
	
	public class sessionDlg
	{
		private var _callback:Function;
		private var dialog:DKI_AlertBox = new DKI_AlertBox();
		
		public function DeleteDialog(value:Function)
		{
			super();
			dialog.callBack=value;
			dialog.msg="do you wish to remove this record";
			_callback = value;
			PopUpManager.addPopUp(dialog,FlexGlobals.topLevelApplication as DisplayObject,true);
			PopUpManager.centerPopUp(dialog);
		}
	}
}// ActionScript file