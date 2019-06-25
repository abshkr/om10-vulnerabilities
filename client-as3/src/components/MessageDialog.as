package components
{
	import components.DKI_MessageBox;
	
	import flash.display.DisplayObject;
	
	import mx.controls.Button;
	import mx.core.FlexGlobals;
	import mx.events.FlexEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	
	import spark.components.SkinnableContainer;
	
	public class MessageDialog
	{
		private var dialog:DKI_MessageBox = new DKI_MessageBox();
		
		public function MessageDialog(message:String, w=-1, flag:Boolean=true)
		{
			super();
			dialog.warned = flag;
			dialog.msg= message;
			if ( w > 0 )
			{
				dialog.width = w;
			}
			PopUpManager.addPopUp(dialog,FlexGlobals.topLevelApplication as DisplayObject,true);
			PopUpManager.centerPopUp(dialog);
		}
	}
}