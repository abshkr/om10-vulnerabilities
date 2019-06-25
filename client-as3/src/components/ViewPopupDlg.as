package components
{	
	import dm.utils.tools;
	
	import flash.display.DisplayObject;
	import flash.events.MouseEvent;
	
	import flashx.textLayout.container.ScrollPolicy;
	
	import mx.controls.Button;
	import mx.core.FlexGlobals;
	import mx.events.CloseEvent;
	import mx.events.EventListenerRequest;
	import mx.events.FlexEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	
	import skins.PopupSkin;
	
	import spark.components.Panel;
	import spark.components.Scroller;
	import spark.components.TitleWindow;
	
//	import views.v_ManualTransactions;
	
	
	public class ViewPopupDlg
	{
		public var popupTitle:String;
		public var popupView:*;
		public var popup:Panel = new Panel();
		public var callBackFunction:Function;
		public var popupPort:Scroller;
		public var parentWidth:int=-1;
		public var parentHeight:int=-1;
		
		public function ViewPopupDlg(title:String, view:*, func:Function)
		{
			popupTitle = title;
			popupView = view;
			if ( popupView.hasOwnProperty("isPopupWindow")==true )
			{
				popupView.isPopupWindow = true;
			}
			callBackFunction = func;
		}
		
		public function openDialog():void
		{
			popup.title = popupTitle;
			
			popup.setStyle("skinClass", skins.PopupSkin);
			if ( this.parentWidth == -1)
			{
				popup.width = FlexGlobals.topLevelApplication.main.width-10;
			}
			else
			{
				popup.width = this.parentWidth;
				//popup.width = FlexGlobals.topLevelApplication.main.width-10;
			}
			if ( this.parentHeight == -1 )
			{
				popup.height = FlexGlobals.topLevelApplication.main.height-25;
			}
			else
			{
				popup.height = this.parentHeight;
				//popup.height = FlexGlobals.topLevelApplication.main.height-25;
			}
			
			popup.removeAllElements()
				
			popupPort = new Scroller();
			if ( this.parentWidth == -1)
			{
				//popupPort.width=FlexGlobals.topLevelApplication.width-10;
				popupPort.percentWidth = 100;
			}
			else
			{
				//popupPort.width = this.parentWidth - 10 - 10;
				popupPort.percentWidth = 100;
			}
			if ( this.parentHeight == -1 )
			{
				//popupPort.height=FlexGlobals.topLevelApplication.height-25;
				popupPort.percentHeight = 100;
			}
			else
			{
				//popupPort.height = this.parentHeight - 25 - 10;
				popupPort.percentHeight = 100;
			}
			
			popupPort.viewport = popupView;
			popupPort.setStyle('verticalScrollPolicy', ScrollPolicy.AUTO);
			popupPort.setStyle('horizontalScrollPolicy', ScrollPolicy.AUTO);
			
			popup.addElement( popupPort );
			popup.visible = true;
			
			PopUpManager.addPopUp(popup,FlexGlobals.topLevelApplication.main,true);
			PopUpManager.centerPopUp(popup);
			popup.addEventListener(CloseEvent.CLOSE,onClose);
		}
		
		public function openDialog2():void
		{
			popup.title = popupTitle;
			
			popup.setStyle("skinClass", skins.PopupSkin);
			
			popup.removeAllElements()
			popup.addElement( popupView );
			popup.visible = true;
			popup.width=FlexGlobals.topLevelApplication.width-10;
			if ( popup.height < FlexGlobals.topLevelApplication.main.height-25 )
				popup.height=FlexGlobals.topLevelApplication.main.height-25;
			//popup.top=popupView.left=popupView.right=popupView.bottom=25;
			PopUpManager.addPopUp(popup,FlexGlobals.topLevelApplication.main,true);
			PopUpManager.centerPopUp(popup);
			popup.addEventListener(CloseEvent.CLOSE,onClose);
		}
		
		public function setFilters( params:*=false ):void
		{
			if ( popupView.hasOwnProperty("states")==true && tools.isStateExisted("normal", popupView.states) == true )
			{
				if ( popupView.hasOwnProperty("currentState")==true )
				{
					popupView.currentState = "normal";
				}
				
				PopUpManager.centerPopUp(popup);
			}
			//popupView.currentState="normal";

			//trace ("---------------------------------popupView.controller.setFilters", popupView.controller.hasOwnProperty("setFilters"));
			//trace ("---------------------------------popupView.controller.setFilters", popupView.hasOwnProperty("controller"));
			//trace ("---------------------------------popupView.controller.setFilters", popupView.hasOwnProperty("setFilters"));
			if ( popupView.hasOwnProperty("controller")==true )
			{
				if ( popupView.controller.hasOwnProperty("setFilters")==true )
				{
					popupView.controller.setFilters( params );
				}
			}
			else
			{
				if ( popupView.hasOwnProperty("setFilters")==true )
				{
					popupView.setFilters( params );
				}
			}
			
		}
		
		public function initFilters( params:*=false ):void
		{
			if ( popupView.hasOwnProperty("states")==true && tools.isStateExisted("normal", popupView.states) == true )
			{
				if ( popupView.hasOwnProperty("currentState")==true )
				{
					popupView.currentState = "normal";
				}
				
				PopUpManager.centerPopUp(popup);
			}
			//popupView.currentState="normal";
			
			//trace ("---------------------------------popupView.controller.setFilters", popupView.controller.hasOwnProperty("setFilters"));
			//trace ("---------------------------------popupView.controller.setFilters", popupView.hasOwnProperty("controller"));
			//trace ("---------------------------------popupView.controller.setFilters", popupView.hasOwnProperty("setFilters"));
			if ( popupView.hasOwnProperty("controller")==true )
			{
				if ( popupView.controller.hasOwnProperty("initFilters")==true )
				{
					popupView.controller.initFilters( params );
				}
			}
			else
			{
				if ( popupView.hasOwnProperty("initFilters")==true )
				{
					popupView.initFilters( params );
				}
			}
			
		}
		
		public function setSecurity(isRead:Boolean=true, isUpdate:Boolean=false, isCreate:Boolean=false, isDelete:Boolean=false, isPassword:Boolean=false): void
		{
			if ( popupView.hasOwnProperty("controller")==true )
			{
				popupView.controller.readOnly = isRead;
				popupView.controller.canUpdate = isUpdate;
				popupView.controller.canCreate = isCreate;
				popupView.controller.canDelete = isDelete;
				popupView.controller.hasPassword = isPassword; 
			}
			else
			{
				popupView.readOnly = isRead;
				popupView.canUpdate = isUpdate;
				popupView.canCreate = isCreate;
				popupView.canDelete = isDelete;
				popupView.hasPassword = isPassword; 
			}
		}
		
		
		protected function onClose(event:CloseEvent):void
		{
			if ( popupView.hasOwnProperty('killBtn') )
			{
				trace( "killBtn in screen [" + popupTitle + "] is programmingly clicked when window is closed!");
				popupView.killBtn.dispatchEvent(new MouseEvent(MouseEvent.CLICK));
			}
			
			PopUpManager.removePopUp(popup);
			popup.removeEventListener(CloseEvent.CLOSE,onClose);
			if ( callBackFunction != null )
			{
				callBackFunction();
			}
		}
	}
}