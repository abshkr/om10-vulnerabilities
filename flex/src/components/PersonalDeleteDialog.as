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
	
	public class PersonalDeleteDialog
	{
		private var callback:Function;
		private var dialog:DKI_AlertBox = new DKI_AlertBox();
		private var chkPass:PasswordCheckDlg = new PasswordCheckDlg();
		
		public function PersonalDeleteDialog(value:Function, password:Boolean)
		{
			super();
			callback = value;
			if(password)
			{
				PopUpManager.addPopUp(chkPass,FlexGlobals.topLevelApplication.main,true);
				PopUpManager.centerPopUp(chkPass);
				chkPass.canceled=false;
				chkPass.userPassword.text="";
				chkPass.title=mx.resources.ResourceManager.getInstance().getString('default','CONFIRM_PASSWORD');
				chkPass.addEventListener(CloseEvent.CLOSE,onClose);
			}
			else
			{	
				dialog.callBack=value;
				dialog.msg= mx.resources.ResourceManager.getInstance().getString('default','CONFIRM_DELETE_PERSONAL');
				PopUpManager.addPopUp(dialog,FlexGlobals.topLevelApplication as DisplayObject,true);
				PopUpManager.centerPopUp(dialog);
			}
		}
		
		protected function onClose(event:CloseEvent):void
		{
			if (!chkPass.canceled)
			{
				if (chkPass.userPassword.text == global.userpass) 
					callback()
				else
					global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FAIL_PASSWORD'));				
			}
			PopUpManager.removePopUp(chkPass);
			chkPass.removeEventListener(CloseEvent.CLOSE,onClose);
		}
	}
}