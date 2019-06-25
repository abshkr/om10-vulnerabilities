package components
{
	import components.BasicDialog;
	
	import flash.display.DisplayObject;
	
	import mx.controls.Button;
	import mx.core.FlexGlobals;
	import mx.events.CloseEvent;
	import mx.events.EventListenerRequest;
	import mx.events.FlexEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	
	import spark.components.SkinnableContainer;
	
	public class ActionDialog
	{
		private var okCallback:Function;
		private var cancelCallback:Function;
		private var dialog:BasicDialog = new BasicDialog();
		
		public function ActionDialog(okFunc:Function, cancelFunc:Function, msg:String)
		{
			super();
			okCallback = okFunc;
			cancelCallback = cancelFunc;
			dialog.okFunc=okFunc;
			dialog.cancelFunc=cancelFunc;
			dialog.msg=msg;
			PopUpManager.addPopUp(dialog,FlexGlobals.topLevelApplication as DisplayObject,true);
			PopUpManager.centerPopUp(dialog);
		}
	}
}