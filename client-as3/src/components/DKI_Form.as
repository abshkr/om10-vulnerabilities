package components
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import mx.collections.ArrayCollection;
	import mx.core.ClassFactory;
	import mx.core.FlexGlobals;
	import mx.core.IVisualElement;
	import mx.core.IVisualElementContainer;
	import mx.core.UIComponent;
	import mx.events.FlexEvent;
	import mx.managers.ToolTipManager;
	import mx.validators.RegExpValidator;
	import mx.validators.Validator;
	
	import renderers.ValidRenderer;
	
	import skins.ErrorDisplaySkin;
	
	import spark.components.BorderContainer;
	import spark.components.Group;
	import spark.components.Label;
	import spark.components.List;
	import spark.components.SkinnableContainer;
	import spark.components.VGroup;
	import spark.effects.Move;
	import spark.events.IndexChangeEvent;
	import spark.layouts.TileLayout;
	
	public class DKI_Form extends Group
	{
		private var _defaultButton:Object;
		private var errorDisplay:SkinnableContainer=new SkinnableContainer();
		private var errorList:List= new List();
		[Bindable] private var errorArr:ArrayCollection=new ArrayCollection();
		private var validationArr:ArrayCollection=new ArrayCollection();
		private var dispMove:Move = new Move(errorDisplay);
		private var validatorArr:Array;
		
		public function DKI_Form()
		{
			super();
			this.minWidth=254;
			this.minHeight=40;
			dispMove.duration=750;
			dispMove.yTo=2;
			errorDisplay.setStyle('skinClass',skins.ErrorDisplaySkin);
			errorList.layout=new TileLayout();
			(errorList.layout as TileLayout).requestedRowCount=2;
			(errorList.layout as TileLayout).columnWidth=250;
			errorList.dataProvider=errorArr;
			errorList.top=errorList.left=0;
			errorList.setStyle('contentBackgroundAlpha',0);
			errorList.setStyle('borderVisible',false);
			errorList.itemRenderer=new ClassFactory(renderers.ValidRenderer);
			errorDisplay.addElement(errorList);
			addEventListener(FlexEvent.CREATION_COMPLETE,prepareHandler);
			errorList.addEventListener('refocus',closeErrorDisplay);
		}
		
		protected function closeErrorDisplay(event:Event):void
		{
			dispMove.yTo = -(errorDisplay.height+4);
			dispMove.play();
			
		}
		
		protected function changeFocus(event:IndexChangeEvent):void
		{
			trace("it works");
			errorList.selectedItem.obj.setFocus();
		}
		
		protected function prepareHandler(event:FlexEvent):void
		{
			setDisplay();
		}
		
		private function setDisplay():void
		{
			for (var i:int = 0; i < this.numElements; i++)
			{
				var comp:Object = getElementAt(i);
				for (var j:int=0; j < (comp as IVisualElementContainer).numElements;j++)
				{
					var comp1:Object = comp.getElementAt(j);
					if (comp1.automationName != "")
					{
						var obj:Object =({name:comp1.automationName,obj:comp1, id:comp1.id});
						validationArr.addItem(obj);
					}
				}
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
			for(var i:int=0; i < validationArr.length;i++)
			{
				(validationArr[i].obj.regExpression as Validator).validate();
				//validationArr[i].obj.fireValid();
			}
			validationArr.refresh();
			for (var j:int=0; j < validationArr.length;j++)
			{
				if (validationArr[j].obj.isValid == false)
				{
					errorArr.addItem(validationArr[j]);
				}
			}
			

			if (errorArr.length > 0)
			{
				errorDisplay.horizontalCenter=0;
				errorDisplay.y= -(height+4);
				FlexGlobals.topLevelApplication.addElement(errorDisplay);
				dispMove.yTo=4;
				dispMove.play();
			}
			else
				dispatchEvent(new Event('OK',true,false));
		}
	}
}