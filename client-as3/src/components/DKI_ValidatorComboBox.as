package components
{
	import mx.collections.IList;
	import mx.events.ValidationResultEvent;
	import mx.validators.RegExpValidator;
	
	import skins.ValidateComboBoxSkin;
	
	import spark.components.ComboBox;
	import spark.validators.NumberValidator;
	
	public class DKI_ValidatorComboBox extends ComboBox
	{
		private var _validationGroup:ValidationGroup;
		public var isValid:Boolean = false;
		public var errorText:String = 'You must select an item';
		//public var required:Boolean=true;
		private var _required:Boolean=false; 
		public var validator:NumberValidator= new NumberValidator();
		//public var validator:RegExpValidator=new RegExpValidator();
		
		[Embed (source="/assets/Indicator.png" )] private var ico_indicator:Class;		
		[Embed (source="/assets/Error.png" )] private var ico_error:Class;	
		
		[Bindable] public var disp_ico:Class;
		
		public function DKI_ValidatorComboBox()
		{
			super();
			errorText = resourceManager.getString('default','VALIDATION.LIST.ERRORTEXT');
			disp_ico = ico_indicator;
			setStyle("skinClass",skins.ValidateComboBoxSkin);
			validator.source=this;
			validator.property='selectedIndex';
			
			validator.minValue = 0;
			validator.required = _required;
			validator.lessThanMinError = resourceManager.getString('default','VALIDATION.LIST.LESSTHANMIN');
			
			//validator.expression="^(([1-9]\\d*)|(0)|(-3))$";		// tested. one zero allowed when it is zero
			//validator.noMatchError = 'Please select an item !';

			validator.addEventListener(ValidationResultEvent.VALID,validPass);
			validator.addEventListener(ValidationResultEvent.INVALID,validFail);
		}
		
		public function get validationGroup():ValidationGroup
		{
			return _validationGroup;
		}
		
		public function set validationGroup(value:ValidationGroup):void
		{
			if ( value == null )
			{
				_validationGroup.removeValidator(this);
			}
			else
			{
				_validationGroup = value;
				_validationGroup.addValidator(this);
			}
		}
		
		protected function validFail(event:ValidationResultEvent):void
		{
			isValid=false;
			disp_ico = ico_error;
		}			
		
		protected function validPass(event:ValidationResultEvent):void
		{
			isValid=true;
			disp_ico = ico_indicator;
		}
		
		override protected function partAdded(partName:String, instance:Object) : void
		{
			super.partAdded(partName, instance);
		}
		
		override protected function partRemoved(partName:String, instance:Object) : void
		{
			super.partRemoved(partName, instance);
		}
		
		[Bindable] public function get required():Boolean
		{
			return _required;
		}
		
		public function set required(value:Boolean):void
		{
			_required = value;
			validator.required=_required;
			validator.enabled = _required;
			if ( validator.required == false )
			{
				this.errorString="";
			}
			
			/*if ( _required == false && this.selectedIndex < 0 )
			{
				this.validator.enabled = false;
			}
			if ( _required == true || this.selectedIndex >= 0 )
			{
				this.validator.enabled = true;
			}*/
			
			if ( _required == false && this.selectedIndex < 0 )
			{
				this.validPass(null);
			}
			if ( _required == true || this.selectedIndex >= 0 )
			{
				this.validator.validate();
			}
			//validator.enabled = _required;
			trace("......9---function override set selectedIndex in DKI_ValidatorComboBox", this.id, this.required, this.validator.enabled, this.selectedIndex );
		}
		
		override public function set selectedItem(value:*):void
		{
			//trace ("*******************override selectedItem******************");
			trace("......1---function set required in DKI_ValidatorComboBox", this.id, this.required, this.validator.enabled, value );
			
			if ( value == '' || value == null )
			{
				this.selectedIndex = -1;
			}
			else
			{
				var count:int=0;
				this.selectedIndex = -1;
				for each(var x:Object in this.dataProvider){
					//trace ( x[this.labelField] );
					if ( String(x[this.labelField]) == String(value) )
					{
						this.selectedIndex = count;
						break;
					}
					count += 1;
				}
				
			}
		}
		
		override public function set dataProvider(lst:IList):void
		{
			//trace ("*******************override dataProvider******************");
			trace("......2---function override set dataProvider in DKI_ValidatorComboBox", this.id, this.required, this.validator.enabled );
			
			var obj:Object;
			
			obj = this.selectedItem;
			super.dataProvider = lst;
			
			if ( obj == '' || obj == null )
			{
				this.selectedIndex = -1;
			}
			else
			{
				var count:int=0;
				this.selectedIndex = -1;
				//for each(var x:Object in this.dataProvider)
				for each(var x:Object in lst)
				{
					trace( "......2.1---function override set dataProvider in DKI_ValidatorComboBox2", count, this.labelField, x[this.labelField], obj[this.labelField] );
					if ( x[this.labelField] == obj[this.labelField] )
					{
						this.selectedIndex = count;
						break;
					}
					count += 1;
				}
			}
			
			if (this.selectedIndex < 0)
			{
				this.textInput.text = "";
			}
			
		}
		
		override public function set selectedIndex(value:int):void
		{
			/*if ( this.required == false && value < 0 )
			{
				this.validator.enabled = false;
			}
			if ( this.required == true || value >= 0 )
			{
				this.validator.enabled = true;
			}*/
			
			this.validator.enabled = this.required;
			super.selectedIndex = value;
			
			if ( this.required == false && value < 0 )
			{
				this.validPass(null);
			}
			if ( this.required == true || value >= 0 )
			{
				this.validator.validate();
			}
			trace("......3---function override set selectedIndex in DKI_ValidatorComboBox", this.id, this.required, this.validator.enabled, value );
		}
		
		
	}
}