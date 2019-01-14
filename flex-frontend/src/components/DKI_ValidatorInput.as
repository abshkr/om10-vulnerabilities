package components
{
	import flash.events.KeyboardEvent;
	import flash.utils.ByteArray;
	
	import mx.events.ValidationResultEvent;
	import mx.utils.ObjectUtil;
	import mx.validators.RegExpValidator;
	import mx.validators.Validator;
	
	import skins.InputSkin;
	
	import spark.components.TextInput;
	
	[SkinState("error")]
	
	public class DKI_ValidatorInput extends TextInput
	{
		private var _minCharLength:int=2;
		private var _maxCharLength:int=15;
		
		private var _validationType:String;
		private var _required:Boolean=false; 
		private var _validationGroup:ValidationGroup;
		
		private var p1:String = "^.*(?=.{~,})";
		private var p2:String = "(?=.*\d)";
		private var p3:String = "(?=.*[!@#$%^&+=])";
		private var p4:String = "(?=.*[a-z])(?=.*[A-Z]).*$";
		
		public var isValid:Boolean = true;
		public var errorText:String;
		public var validator:RegExpValidator = new RegExpValidator();
		
		public var useErrorSkin:Boolean;
		
		[Bindable] public var textIco:Class = glyph.input_pen;
		public var byteLength:int=0;
		public var byteLengthError:String="Text exceeds the maximum length.";
		
		
		
		
		[Bindable("change")]
		[Bindable("textChanged")]
		[CollapseWhiteSpace]
		override public function set text(value:String):void{
			super.text = value;
			trace( "..............................ID in ValidatorInput............................", id, value );
			checkValid(null);
		}
		
		
		public function checkLength(txt:String):Boolean
		{
			var tooLong:Boolean = false;
			
			if ( txt == null ) return false;
			
			byteLength = global.getTextByteLength(txt);
			
			if ( this.maxChars > 0 && byteLength > this.maxChars )
			{
				tooLong = true;
				//byteLengthError = "Byte length " + String(byteLength) + " exceeds the maximum " + String(this.maxChars) + ".";
				byteLengthError = resourceManager.getString('default','VALIDATION.TEXT.BYTE_LEN') + String(byteLength) + resourceManager.getString('default','VALIDATION.TEXT.BYTE_MAX_EXCEED') + String(this.maxChars) + ".";
			}
			
			return tooLong;
		}
		
		
		
		public function DKI_ValidatorInput()
		{
			super();
			setStyle("skinClass",skins.InputSkin);
			validator.source=this;
			validator.property='text';
			setExpression(validationType);
			this.addEventListener(KeyboardEvent.KEY_UP,checkValid);
			validator.addEventListener(ValidationResultEvent.VALID,validPass);
			validator.addEventListener(ValidationResultEvent.INVALID,validFail);
		}
		
		override public function set editable(b:Boolean):void{
			super.editable = b;
			this.alpha = b?1:0.70;
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
		}			
		
		protected function validPass(event:ValidationResultEvent):void
		{
			isValid=true;
			if ( this.checkLength(this.text) == true )
			{
				isValid = false;
				this.errorString = byteLengthError;
				this.errorText = this.errorString;
			}
		}
		
		public function get minCharLength():int
		{
			return _minCharLength;
		}
		
		public function set minCharLength(value:int):void
		{
			_minCharLength = value;
		}
		
		[Bindable] public function get required():Boolean
		{
			return _required;
		}
		
		public function set required(value:Boolean):void
		{
			_required = value;
			validator.required=_required;
			if ( validator.required == false )
			{
				this.errorString="";
				this.isValid = true;
			}
			trace( ".......................required.......ID in ValidatorInput............................", id, value, this.isValid );
		}
		
		protected function checkValid(event:KeyboardEvent):void
		{
			if ( this.checkLength(this.text) == true )
			{
				isValid = false;
				this.errorString = byteLengthError;
				this.errorText = this.errorString;
			}
			else
			{
				isValid = true;
				this.errorString = "";
			}
			
			if (validator.enabled && validator.required) validator.validate();
		}
		
		[Inspectable(category="Text", enumeration="alpha,alphanumeric,alphanumericsinglequotation,alphanumericslash,alphanumericslashbrackets,alphanumericmost,alphanumericspecial,alphanumericspecial_nosq,alphanumericdot,alphanumeric_multilingual,baycode,color_value,currency,document,email,integer,integer_nonzero,integer_negative,integer_non_negative,integer_positive,integer_non_positive,numeric,numeric_negative,numeric_positive,numeric_non_negative,numeric_non_positive,password_low,password_medium,password_high,search")]
		public function get validationType():String
		{
			return _validationType;
		}
		
		public function set validationType(value:String):void
		{
			_validationType = value;
			setExpression(value);
		}
		
		override public function set errorString(value:String):void
		{
			super.errorString = value;
			setStyle("errorSkin", null);
			if (value != "")
				useErrorSkin = true;
			else
				useErrorSkin = false;
			invalidateProperties();
		}
		
		override protected function commitProperties():void
		{
			super.commitProperties();
			
			if (useErrorSkin != false)
				skin.currentState = "error";
			else
				skin.currentState = getCurrentSkinState();
		}
		
		private function setExpression(value:String):void
		{
			//VALIDATION.TEXT.GENERAL=The input does not match the characters allowed!
			validator.enabled = true;
			switch(value)
			{
				case 'alpha' : 	
					validator.expression='^([A-Za-z]+[ \t\v\n\r\f]*)+$';
					//VALIDATION.TEXT.ALPHA=alphabetic characters expected(a-z,A-Z)
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.ALPHA');
					validator.enabled=true;
					textIco = glyph.input_pen;
					break;
				case 'alphanumeric' : 	
					//validator.expression='^([A-Za-z0-9-_.,;"<>{}()]+[ \t\v\n\r\f]*)+$';
					validator.expression='^([A-Za-z0-9-_]+[ \t\v\n\r\f]*)+$';
					//VALIDATION.TEXT.ALPHANUMERIC=Expecting A-Z,a-z,0-9, _-
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.ALPHANUMERIC');
					validator.enabled=true;
					textIco = glyph.input_pen;
					break;
				case 'alphanumericsinglequotation' : 	
					validator.expression="^([A-Za-z0-9-_\\']+[ \t\v\n\r\f]*)+$";
					//VALIDATION.TEXT.ALPHANUMERICSINGLEQUOTATION=Expecting A-Z,a-z,0-9, _-'
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.ALPHANUMERICSINGLEQUOTATION');
					validator.enabled=true;
					textIco = glyph.input_pen;
					break;
				case 'alphanumericslash' : 	
					validator.expression='^([A-Za-z0-9-_/]+[ \t\v\n\r\f]*)+$';
					//VALIDATION.TEXT.ALPHANUMERICSLASH=Expecting A-Z,a-z,0-9, _-/
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.ALPHANUMERICSLASH');
					validator.enabled=true;
					textIco = glyph.input_pen;
					break;
				case 'alphanumericslashbrackets' : 	
					//validator.expression='^([A-Za-z0-9-_/\\[\\]]+[ \t\v\n\r\f]*)+$';
					//validator.noMatchError='Expecting A-Z,a-z,0-9, _-/[]';
					validator.expression='^([A-Za-z0-9-_/\\[\\]\\<\\>\\(\\)\\{\\}]+[ \t\v\n\r\f]*)+$';
					//VALIDATION.TEXT.ALPHANUMERICSLASHBRACKETS=Expecting A-Z,a-z,0-9, _-/[]<>(){}
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.ALPHANUMERICSLASHBRACKETS');
					validator.enabled=true;
					textIco = glyph.input_pen;
					break;
				case 'alphanumericdot' : 	
					validator.expression='^([A-Za-z0-9-_\\.]+[ \t\v\n\r\f]*)+$';
					//VALIDATION.TEXT.ALPHANUMERICDOT=Expecting A-Z,a-z,0-9, _-.
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.ALPHANUMERICDOT');
					validator.enabled=true;
					textIco = glyph.input_pen;
					break;
				case 'alphanumericmost' : 	
					//validator.expression='^([A-Za-z0-9-_/\\[\\]]+[ \t\v\n\r\f]*)+$';
					//validator.noMatchError='Expecting A-Z,a-z,0-9, _-/[]';
					validator.expression='^([A-Za-z0-9-_/\\&\\[\\]\\<\\>\\(\\)\\{\\}]+[ \t\v\n\r\f]*)+$';
					//VALIDATION.TEXT.ALPHANUMERICMOST=Expecting A-Z,a-z,0-9, _-/&[]<>(){}
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.ALPHANUMERICMOST');
					validator.enabled=true;
					textIco = glyph.input_pen;
					break;
				case 'alphanumericspecial' : 	
					validator.expression='^([A-Za-z0-9-_/\\\\\'\\&\\[\\]\\<\\>\\(\\)\\{\\}\\,\\.]+[ \t\v\n\r\f]*)+$';
					//VALIDATION.TEXT.ALPHANUMERICSPECIAL=Expecting A-Z,a-z,0-9, _-/\\'&[]<>(){},.
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.ALPHANUMERICSPECIAL');
					validator.enabled=true;
					textIco = glyph.input_pen;
					break;
				case 'alphanumericspecial_nosq' : 	
					validator.expression='^([A-Za-z0-9-_/\\\\\&\\[\\]\\<\\>\\(\\)\\{\\}\\,\\.]+[ \t\v\n\r\f]*)+$';
					//VALIDATION.TEXT.ALPHANUMERICSPECIAL_NOSQ=Expecting A-Z,a-z,0-9, _-/\\&[]<>(){},.
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.ALPHANUMERICSPECIAL_NOSQ');
					validator.enabled=true;
					textIco = glyph.input_pen;
					break;
				case 'alphanumeric_multilingual' : 	
					// match the Chinese characters: [\u4e00-\u9fa5]
					// match the double bytes including Chinese: [^\x00-\xff]
					//validator.expression='^((([\\w\u4e00-\u9fa5-/\\[\\]\\.\\,\\<\\>\\(\\)\\{\\}\\|\\\\]+[\\s]*)+)|([^\\x00-\\xff]*))$';
					//validator.expression='^([^\\x00-\\xff]|[\\x00-\\xff])*$';
					validator.expression='^[\u0001-\ufffd]+$';
					//VALIDATION.TEXT.ALPHANUMERIC_MULTILINGUAL=Expecting Multilingual Text
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.ALPHANUMERIC_MULTILINGUAL');
					validator.enabled=true;
					textIco = glyph.input_pen;
					break;
				case 'color_value' : 	
					//validator.expression='^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$';
					validator.expression='^#([0-9a-fA-F]{6})$';
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.COLOR_VALUE');
					validator.enabled=true;
					textIco = glyph.input_key;
					break;
				case 'baycode' : 	
					validator.expression='^BAY +[0-9]+$';
					//VALIDATION.TEXT.BAYCODE=baycode is BAY XXX
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.BAYCODE');
					validator.enabled=true;
					textIco = glyph.input_number;
					break;		
				case 'currency' : 	
					validator.expression='^[0-9]+(\.[0-9]{1,2})?$';
					//VALIDATION.TEXT.CURRENCY=currency value expected(0.00)
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.CURRENCY');
					validator.enabled=true;
					textIco = glyph.input_dollar;
					break;
				case 'document' : 	
					//validator.expression='^([A-Za-z]+[ \t\v\n\r\f]*)+$';
					validator.expression='^([^\\x00-\\xff]|[\\x00-\\xff])*$';
					//validator.expression='^[\u0001-\ufffd]+$';
					//VALIDATION.TEXT.DOCUMENT=A manditory field allows any characters
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.DOCUMENT');
					validator.enabled=true;
					textIco = glyph.input_document;
					break;
				case 'email' : 	
					//validator.expression='^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$';
					//validator.expression = "^[\\w.-]+@\\w[\\w.-]+\\.[\\w.-]*[a-z][a-z]*$";
					validator.expression = "^[\\w.-]+@\\w[\\w.-]+\\.[\\w.-]*[a-z][a-z]*([\\;\\:][ \t\v\n\r\f]*[\\w.-]+@\\w[\\w.-]+\\.[\\w.-]*[a-z][a-z]*)*$";
					
					//validator.expression = "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$";
					//validator.expression = "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+([\\;\\:][ \t\v\n\r\f]*[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+)*$";
					
					//VALIDATION.TEXT.EMAIL=email expected(user@address.com)
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.EMAIL');
					validator.enabled=true;
					textIco = glyph.input_mail;
					break;		
				case 'integer' : 	
					validator.expression='^([0-9]+[ \t\v\n\r\f]*)+$';
					//VALIDATION.TEXT.INTEGER=an integer value is required
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.INTEGER');
					validator.enabled=true;
					textIco = glyph.input_number;
					break;		
				case 'integer_nonzero' : 	
					validator.expression='^([1-9][0-9]*[ \t\v\n\r\f]*)+$';
					//VALIDATION.TEXT.INTEGER_NONZERO=integer value required but can not be 0
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.INTEGER_NONZERO');
					validator.enabled=true;
					textIco = glyph.input_number;
					break;		
				case 'integer_negative' : 	
					//validator.expression='^([0-9]+[ \t\v\n\r\f]*)+$';
					validator.expression='^-[1-9]\\d*$';
					//VALIDATION.TEXT.INTEGER_NEGATIVE=integer value required can be negative
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.INTEGER_NEGATIVE');
					validator.enabled=true;
					textIco = glyph.input_number;
					break;	
				case 'integer_non_negative' : 	
					validator.expression='^(([1-9]\\d*)|(0))$';
					//VALIDATION.TEXT.INTEGER_NON_NEGATIVE=integer value required can be positive and zero
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.INTEGER_NON_NEGATIVE');
					validator.enabled=true;
					textIco = glyph.input_number;
					break;	
				case 'integer_positive' : 	
					validator.expression='^[1-9]\\d*$';
					//VALIDATION.TEXT.INTEGER_POSITIVE=integer value required can be positive
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.INTEGER_POSITIVE');
					validator.enabled=true;
					textIco = glyph.input_number;
					break;	
				case 'integer_non_positive' : 	
					validator.expression='^((-[1-9]\\d*)|(0))$';
					//VALIDATION.TEXT.INTEGER_NON_POSITIVE=integer value required can be negative and zero
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.INTEGER_NON_POSITIVE');
					validator.enabled=true;
					textIco = glyph.input_number;
					break;	
				
				case 'numeric' : 	
					//validator.expression='^(-?\d+)(\.\d+)?$';
					//validator.expression='(\d+)?(\.\d+)?$';
					validator.expression='^(-?(([1-9]\\d*)|(0)))(\\.\\d+)?$';
					//VALIDATION.TEXT.NUMERIC=number expected(i.e. 1234.091)
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.NUMERIC');
					validator.enabled=true;
					textIco = glyph.input_number;
					break;		
				case 'numeric_negative' : 	
					//validator.expression='^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$';
					//validator.expression='(\d+)?(\.\d+)?$';
					validator.expression='^(-((([1-9]\\d*)(\\.\\d+)?)|((0)?(\\.((\\d*[1-9]\\d*)|([1-9]\\d*)))+)))$';
					//VALIDATION.TEXT.NUMERIC_NEGATIVE=negative number expected(i.e. -1234.091)
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.NUMERIC_NEGATIVE');
					validator.enabled=true;
					textIco = glyph.input_number;
					break;		
				case 'numeric_positive' : 	
					validator.expression='^((([1-9]\\d*)(\\.\\d+)?)|((0)?(\\.((\\d*[1-9]\\d*)|([1-9]\\d*)))+))$';
					//VALIDATION.TEXT.NUMERIC_POSITIVE=positive number expected(i.e. 1234.091)
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.NUMERIC_POSITIVE');
					validator.enabled=true;
					textIco = glyph.input_number;
					break;		
				case 'numeric_non_positive' : 	
					validator.expression='^((-(([1-9]\\d*)|(0)?)(\\.\\d+)?)|(0+(\\.0+)?))$';
					//VALIDATION.TEXT.NUMERIC_NON_POSITIVE=non-positive number expected(i.e. 0 or -1234.091)
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.NUMERIC_NON_POSITIVE');
					validator.enabled=true;
					textIco = glyph.input_number;
					break;		
				case 'numeric_non_negative' : 	
					validator.expression='^(([1-9]\\d*)|(0)?)(\\.\\d+)?$';
					//VALIDATION.TEXT.NUMERIC_NON_NEGATIVE=non-negative number expected(i.e. 0 or 1234.091)
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.NUMERIC_NON_NEGATIVE');
					validator.enabled=true;
					textIco = glyph.input_number;
					break;		
				
				case 'password_low' : 
					validator.expression='^[A-Za-z0-9]+$';
					//VALIDATION.TEXT.PASSWORD_LOW=alphanumeric only
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.PASSWORD_LOW');
					validator.enabled=true;
					textIco = glyph.input_key;
					break;		
				case 'password_medium' : 	
					validator.expression='^\w*(?=\w*\d)(?=\w*[a-z])(?=\w*[A-Z])\w*$';
					//VALIDATION.TEXT.PASSWORD_MEDIUM=requires upper and lower case
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.PASSWORD_MEDIUM');
					validator.enabled=true;
					textIco = glyph.input_key;
					break;		
				case 'password_strong' : 	
					validator.expression='^.*(?=.{4,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$';
					//VALIDATION.TEXT.PASSWORD_STRONG=requires number,upper alpha, lower alpha, special!@#$%^&*+=)
					validator.noMatchError=resourceManager.getString('default','VALIDATION.TEXT.PASSWORD_STRONG');
					validator.enabled=true;
					textIco = glyph.input_key;
					break;
				case 'search' : 	
					//validator.expression='^([A-Za-z]+[ \t\v\n\r\f]*)+$';
					//VALIDATION.TEXT.SEARCH=
					//validator.noMatchError='alphanumeric expected(a-z,A-Z)';
					validator.enabled=false;
					textIco = glyph.input_search;
					break;
				default:
					validator.required=false;
					validator.enabled=false;
					textIco = glyph.input_pen;
			}
			errorText=validator.noMatchError;
		}
		
		override protected function getCurrentSkinState():String
		{
			return super.getCurrentSkinState();
		} 
		
		override protected function partAdded(partName:String, instance:Object) : void
		{
			super.partAdded(partName, instance);
		}
		
		override protected function partRemoved(partName:String, instance:Object) : void
		{
			super.partRemoved(partName, instance);
		}		
	}
}