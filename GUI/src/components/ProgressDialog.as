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
	
	public class ProgressDialog
	{
		private var okCallback:Function;
		private var cancelCallback:Function;
		public var dialog:ProgressBarDialog = new ProgressBarDialog();
		
		public function ProgressDialog(okFunc:Function, cancelFunc:Function, msg:String, title:String="Warning", flag:Boolean=true)
		{
			super();
			okCallback = okFunc;
			cancelCallback = cancelFunc;
			dialog.okFunc=okFunc;
			dialog.cancelFunc=cancelFunc;
			dialog.msg=msg;
			dialog.boxTitle = title;
			PopUpManager.addPopUp(dialog,FlexGlobals.topLevelApplication as DisplayObject, flag);
			PopUpManager.centerPopUp(dialog);
		}
	}
}