package components
{	
	import flash.display.DisplayObject;
	import flash.utils.getDefinitionByName;
	import flash.utils.getQualifiedClassName;
	
	import mx.controls.Button;
	import mx.core.FlexGlobals;
	import mx.events.CloseEvent;
	import mx.events.EventListenerRequest;
	import mx.events.FlexEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	
	import skins.PopupSkin;
	
	import spark.components.TitleWindow;
	import spark.components.Panel;
	import flashx.textLayout.container.ScrollPolicy;
	import spark.components.Scroller;
	import views.v_ManualTransactions;
	
	public class MovSchdTransactionsDlg
	{
		public var popupView:v_ManualTransactions = new v_ManualTransactions();
		public var popup:Panel = new Panel();
		public var callback: Function;
		
		// Child window scroll control
		public var popupPort:Scroller;
		public var parentWidth:int=-1;
		public var parentHeight:int=-1;
		
		public function openDialog()
		{
			popup.minWidth = 1024;
			popup.minHeight = 650;
			
			if (this.parentWidth == -1)
			{
				popup.width = FlexGlobals.topLevelApplication.main.width-10;
			}
			else
			{
				popup.width = this.parentWidth;
			}
			if (this.parentHeight == -1)
			{
				popup.height = FlexGlobals.topLevelApplication.main.height-25;
			}
			else
			{
				popup.height = this.parentHeight;
			}
			
			popup.setStyle("skinClass", skins.PopupSkin);
			popup.removeAllElements();
			
			popupPort = new Scroller();
			if (this.parentWidth == -1)
			{
				popupPort.percentWidth = 100;
			}
			else
			{
				popupPort.percentWidth = 100;
			}
			if (this.parentHeight == -1)
			{
				popupPort.percentHeight = 100;
			}
			else
			{
				popupPort.percentHeight = 100;
			}
			
			popupPort.viewport = popupView;
			popupPort.setStyle('verticalScrollPolicy', ScrollPolicy.AUTO);
			popupPort.setStyle('horizontalScrollPolicy', ScrollPolicy.AUTO);
			
			popup.addElement(popupPort);
			//popupView.currentState='normal';
			PopUpManager.addPopUp(popup,FlexGlobals.topLevelApplication.main,true);
			PopUpManager.centerPopUp(popup);
			popup.addEventListener(CloseEvent.CLOSE,onClose);
		}
		
		public function setFilters( params:*=false ):void
		{
			popup.title = "Manual Transactions(Nomination Schedules)";
			if (params['title']) popup.title=params['title'];
			popupView.controller.setFilters( params );
		}
		
		protected function onClose(event:CloseEvent):void
		{
			PopUpManager.removePopUp(popup);
			popup.removeEventListener(CloseEvent.CLOSE,onClose);
			if (callback != null) callback();
		}
	}
}