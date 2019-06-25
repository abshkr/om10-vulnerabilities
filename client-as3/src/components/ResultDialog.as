package components
{
	import components.GridDialog;
	
	import flash.display.DisplayObject;
	
	import mx.collections.ArrayCollection;
	import mx.controls.Button;
	import mx.core.FlexGlobals;
	import mx.events.CloseEvent;
	import mx.events.EventListenerRequest;
	import mx.events.FlexEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	
	import spark.components.SkinnableContainer;
	
	public class ResultDialog
	{
		private var okCallback:Function;
		public var dialog:GridDialog = new GridDialog();
		
		public function ResultDialog(okFunc:Function, msg:String, lst:ArrayCollection, title:String="Warning", ghName:String="datagrid.headercaption.code", ghDesc:String="datagrid.headercaption.Description")
		{
			super();
			okCallback = okFunc;
			dialog.okFunc=okFunc;
			dialog.msg=msg;
			dialog.lst=lst;
			dialog.boxTitle = title;
			dialog.headerName = mx.resources.ResourceManager.getInstance().getString('default',ghName);
			dialog.headerDesc = mx.resources.ResourceManager.getInstance().getString('default',ghDesc);
			dialog.width = 600;
			PopUpManager.addPopUp(dialog,FlexGlobals.topLevelApplication as DisplayObject,true);
			PopUpManager.centerPopUp(dialog);
		}
	}
}