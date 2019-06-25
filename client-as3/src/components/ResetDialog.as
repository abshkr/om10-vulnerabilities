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
	
	import spark.components.SkinnableContainer;
	
	import components.DKI_AlertBox;
	
	public class ResetDialog
	{
		private var callback:Function;
		private var dialog:DKI_AlertBox = new DKI_AlertBox();
		public var rstPass:ResetPassword = new ResetPassword();
		
		public function ResetDialog(value:Function, password:Boolean)
		{
			super();
			callback = value;
				
			PopUpManager.addPopUp(rstPass,FlexGlobals.topLevelApplication.main,true);
			PopUpManager.centerPopUp(rstPass);
			
			rstPass.canceled=false;
			rstPass.userPassword.text="";
			rstPass.title=mx.resources.ResourceManager.getInstance().getString('default','CONFIRM_RESET_PASSWORD');

		}
	}
}