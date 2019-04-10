package components
{
	import flash.events.Event;
	import flash.events.FocusEvent;
	import flash.events.MouseEvent;
	
	import mx.collections.ArrayCollection;
	import mx.core.ClassFactory;
	import mx.core.FlexGlobals;
	import mx.events.CloseEvent;
	import mx.events.EffectEvent;
	import mx.events.FlexMouseEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	
	import renderers.ValidRenderer;
	
	import skins.ErrorDisplaySkin;
	
	import spark.components.List;
	import spark.components.SkinnableContainer;
	import spark.effects.Move;
	import spark.events.IndexChangeEvent;
	import spark.layouts.TileLayout;
	
	public class ValidationGroup extends Object
	{
		private var validationArray:Array = new Array();
		private var _numValidators:int=0;
		private var _defaultButton:Object;
		private var errorDisplay:SkinnableContainer=new SkinnableContainer();
		private var errorList:List= new List();
		private var chkPass:PasswordCheckDlg = new PasswordCheckDlg();

		public var action:Function;
		[Bindable] private var errorArr:ArrayCollection=new ArrayCollection();
		private var dispMove:Move = new Move(errorDisplay);
		private var _isProtected:Boolean =false;
		//[Bindable] public var parentScreen:*=null;
		private var _defaultRowHeight:Number=52;
		private var _parentScreen:*=null;
		
		[Bindable]
		public function get parentScreen():*
		{
			return _parentScreen;
		}
		
		public function set parentScreen(value:*):void
		{
			_parentScreen = value;
			if ( _parentScreen != null )
			{
				_parentScreen.addEventListener(MouseEvent.CLICK, clickOutsideErrorDisplay, false, 0, true);			
			}
			/*
			else
			{
				FlexGlobals.topLevelApplication.addEventListener(MouseEvent.CLICK, clickOutsideErrorDisplay, false, 0, true);	
			}
			*/
		}
		
		public function ValidationGroup()
		{
			super();
			dispMove.duration=750;
			dispMove.yTo=4;
			dispMove.addEventListener(EffectEvent.EFFECT_END,CheckPos);
			errorDisplay.setStyle('skinClass',skins.ErrorDisplaySkin);
			errorList.layout=new TileLayout();
			(errorList.layout as TileLayout).requestedRowCount=2;
			(errorList.layout as TileLayout).columnWidth=250;
			errorList.dataProvider=errorArr;
			errorList.top=errorList.left=0;
			errorList.setStyle('contentBackgroundAlpha',0);
			errorList.setStyle('borderVisible',false);
			errorList.setStyle('horizontalScrollPolicy', 'auto');
			errorList.itemRenderer=new ClassFactory(renderers.ValidRenderer);
			errorDisplay.addElement(errorList);
			errorList.addEventListener('refocus',closeErrorDisplay);
			errorDisplay.addEventListener(FocusEvent.FOCUS_OUT, closeDisplay);
			//errorDisplay.addEventListener(MouseEvent.MOUSE_OUT, clickOutsideErrorDisplay, false, 0, true);			
			chkPass.title=mx.resources.ResourceManager.getInstance().getString('default','CONFIRM_PASSWORD');
			chkPass.addEventListener(CloseEvent.CLOSE,onClose);
		}
		
		protected function clickOutsideErrorDisplay(event:MouseEvent):void
		{
			this.closeDisplay( null );
		}		
		
		protected function onClose(event:Event):void
		{
			if (!chkPass.canceled)
			{
				if (chkPass.userPassword.text == global.userpass) 
					action()
				else
					global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FAIL_PASSWORD'));				
			}
			PopUpManager.removePopUp(chkPass);
		}
		
		protected function closeDisplay(event:FocusEvent):void
		{
			if(errorDisplay) 
			{
				if ( parentScreen != null )
				{
					errorDisplay.y = -parentScreen.y-250;
				}
				else
				{
					errorDisplay.y=-250;
				}
				
			}
		}
		
		protected function CheckPos(event:EffectEvent):void
		{
			if ( parentScreen != null )
			{
				if ( (errorDisplay.y+parentScreen.y) < 0) 
				{
					parentScreen.removeElement(errorDisplay);
				}
				else
				{
					errorDisplay.setFocus();
				}
			}
			else
			{
				if (errorDisplay.y < 0) 
				{
					FlexGlobals.topLevelApplication.removeElement(errorDisplay);
				}
				else
				{
					errorDisplay.setFocus();
				}
			}
		}
		
		protected function closeErrorDisplay(event:Event):void
		{
			if ( parentScreen != null )
			{
				dispMove.yTo = -parentScreen.y-250;
			}
			else
			{
				dispMove.yTo = -250;
			}
			dispMove.play();
		}
		
		protected function changeFocus(event:IndexChangeEvent):void
		{
			errorList.selectedItem.setFocus();
		}

		public function get numValidators():int
		{
			return validationArray.length;
		}

		public function set numValidators(value:int):void
		{
			_numValidators = value;
		}
		
		public function addValidator(value:Object):void
		{
			var added:Boolean = false;
			
			for (var i:int=0; i < validationArray.length; i++)
			{
				if ( value == validationArray[i] )
				{
					added = true;
					break;
				}
			}
			
			if ( added == false )
			{
				validationArray.push(value);
			}
		}
		
		public function removeValidator(value:Object):void
		{
			for (var i:int=0; i < validationArray.length; i++)
			{
				if ( value == validationArray[i] )
				{
					validationArray.splice(i, 1);
				}
			}
		}
		
		public function removeAllValidators():void
		{
			validationArray = new Array();
		}
		
		public function doValidation(): void
		{
			for (var i:int=0; i < validationArray.length; i++)
			{
				validationArray[i].validator.validate();
			}
		}

		public function get defaultButton():Object
		{
			return _defaultButton;
		}
		
		public function set defaultButton(value:Object):void
		{
			_defaultButton = value;
			_defaultButton.addEventListener(MouseEvent.CLICK,checkValidation);
		}
		
		protected function checkValidation(event:MouseEvent):void
		{
			errorArr.removeAll();
			for(var i:int=0; i < validationArray.length;i++)
			{
				// only validated when it is required
				//trace ( "$$$$$$$$$$$$$$$$$$$validationArray[i].validator", validationArray[i].validator.source.id, validationArray[i].validator.required);
				if ( validationArray[i].validator.required == true )
				{
					validationArray[i].validator.validate();
				}
			}
			for (var j:int=0; j < validationArray.length;j++)
			{
				// only display the error msg when it is required and not valid
				//trace ( "$$$$$$$$$$$$$$$$$$$validationArray[j].isValid", validationArray[j].validator.source.id, validationArray[j].validator.required, validationArray[j].isValid);
				if ( validationArray[j].validator.required == true && validationArray[j].isValid == false)
				{
					errorArr.addItem(validationArray[j]);
				}
				if ( (validationArray[j] is DKI_ValidatorInput) && (validationArray[j].validator.required == false && validationArray[j].isValid == false) )
				{
					errorArr.addItem(validationArray[j]);
				}
			}
			
			if (errorArr.length > 0)
			{
				errorDisplay.horizontalCenter=0;
				errorDisplay.minHeight=100;
				errorDisplay.y= -250;
				if ( parentScreen != null )
				{
					errorDisplay.y = -parentScreen.y-250;
				}
				if ( parentScreen != null )
				{
					errorDisplay.includeInLayout = false;
					parentScreen.addElement(errorDisplay);
					
					var clnnum:int = int((errorArr.length+1)/2);
					errorList.width = (errorList.layout as TileLayout).columnWidth * clnnum + (errorList.layout as TileLayout).paddingLeft + (errorList.layout as TileLayout).paddingRight;
					if ( clnnum > 1 )
					{
						errorList.width += (errorList.layout as TileLayout).horizontalGap * (clnnum-1);
					}
					errorList.height = this._defaultRowHeight*2 + (errorList.layout as TileLayout).paddingTop + (errorList.layout as TileLayout).paddingBottom + (errorList.layout as TileLayout).verticalGap;
					
					errorDisplay.width = errorList.width + 10 + 10;
					errorDisplay.height = errorList.height + 6 + 6;
					errorDisplay.x = 0 + (parentScreen.width - errorDisplay.width)/2;
					trace (".......................................................1. size of errorDisplay..................", errorDisplay.width, errorDisplay.height, errorDisplay.x
						, (errorList.layout as TileLayout).verticalGap, (errorList.layout as TileLayout).rowHeight, (errorList.layout as TileLayout).horizontalGap, (errorList.layout as TileLayout).columnWidth);
				}
				else
				{
					FlexGlobals.topLevelApplication.addElement(errorDisplay);
				}
				dispMove.yTo=4;
				if ( parentScreen != null )
				{
					dispMove.yTo=4-parentScreen.y;
				}
				dispMove.play();
			}
			else
			{
				if (errorDisplay.parent) 
				{
					if ( parentScreen != null )
					{
						parentScreen.removeElement(errorDisplay);
					}
					else
					{
						FlexGlobals.topLevelApplication.removeElement(errorDisplay);
					}
				}
				if(action !=null)
				{
					if(isProtected)
					{
						PopUpManager.addPopUp(chkPass,FlexGlobals.topLevelApplication.main,true);
						PopUpManager.centerPopUp(chkPass);
						chkPass.canceled=false;
						chkPass.userPassword.text="";
					}	
				 	else action();
				}
			}
		}
		
		public function checkValidationOnly():int
		{
			errorArr.removeAll();
			for(var i:int=0; i < validationArray.length;i++)
			{
				// only validated when it is required
				//trace ( "$$$$$$$$$$$$$$$$$$$validationArray[i].validator", validationArray[i].validator.source.id, validationArray[i].validator.required);
				if ( validationArray[i].validator.required == true )
				{
					if ( (validationArray[i] is DKI_ValidatorInput) && validationArray[i].text.length== 0 )
					{
						validationArray[i].isValid = true;
					}
					else
					{
						validationArray[i].validator.validate();
					}
				}
			}
			for (var j:int=0; j < validationArray.length;j++)
			{
				// only display the error msg when it is required and not valid
				//trace ( "$$$$$$$$$$$$$$$$$$$validationArray[j].isValid", validationArray[j].validator.source.id, validationArray[j].validator.required, validationArray[j].isValid);
				if ( validationArray[j].validator.required == true && validationArray[j].isValid == false)
				{
					errorArr.addItem(validationArray[j]);
				}
			}
			
			if (errorArr.length > 0)
			{
				errorDisplay.horizontalCenter=0;
				errorDisplay.minHeight=100;
				errorDisplay.y= -250;
				if ( parentScreen != null )
				{
					errorDisplay.y = -parentScreen.y-250;
				}
				if ( parentScreen != null )
				{
					errorDisplay.includeInLayout = false;
					parentScreen.addElement(errorDisplay);
					
					var clnnum:int = int((errorArr.length+1)/2);
					errorList.width = (errorList.layout as TileLayout).columnWidth * clnnum + (errorList.layout as TileLayout).paddingLeft + (errorList.layout as TileLayout).paddingRight;
					if ( clnnum > 1 )
					{
						errorList.width += (errorList.layout as TileLayout).horizontalGap * (clnnum-1);
					}
					errorList.height = this._defaultRowHeight*2 + (errorList.layout as TileLayout).paddingTop + (errorList.layout as TileLayout).paddingBottom + (errorList.layout as TileLayout).verticalGap;
					
					errorDisplay.width = errorList.width + 10 + 10;
					errorDisplay.height = errorList.height + 6 + 6;
					errorDisplay.x = 0 + (parentScreen.width - errorDisplay.width)/2;
					trace (".......................................................2. size of errorDisplay..................", errorDisplay.width, errorDisplay.height, errorDisplay.x
						, (errorList.layout as TileLayout).verticalGap, (errorList.layout as TileLayout).rowHeight, (errorList.layout as TileLayout).horizontalGap, (errorList.layout as TileLayout).columnWidth);
				}
				else
				{
					FlexGlobals.topLevelApplication.addElement(errorDisplay);
				}
				dispMove.yTo=4;
				if ( parentScreen != null )
				{
					dispMove.yTo=4-parentScreen.y;
				}
				dispMove.play();
			}
			else
			{
				if (errorDisplay.parent) 
				{
					if ( parentScreen != null )
					{
						parentScreen.removeElement(errorDisplay);
					}
					else
					{
						FlexGlobals.topLevelApplication.removeElement(errorDisplay);
					}
				}
			}
			
			return errorArr.length;
		}
				
		public function get isProtected():Boolean
		{
			return _isProtected;
		}

		public function set isProtected(value:Boolean):void
		{
			_isProtected = value;
		}

	}
}