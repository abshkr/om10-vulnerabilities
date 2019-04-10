package components
{
	import com.adobe.fiber.runtime.lib.DateTimeFunc;
	
	import flash.events.Event;
	import flash.events.FocusEvent;
	import flash.events.MouseEvent;
	import flash.globalization.DateTimeStyle;
	import flash.globalization.LocaleID;
	
	import mx.collections.ArrayCollection;
	import mx.controls.DateChooser;
	import mx.events.CalendarLayoutChangeEvent;
	import mx.events.FlexMouseEvent;
	import mx.states.State;
	
	import skins.DateTimeSkin;
	
	import spark.components.Image;
	import spark.components.PopUpAnchor;
	import spark.components.SkinnableContainer;
	import spark.components.TextInput;
	import spark.formatters.DateTimeFormatter;

	public class DKI_DateTime extends SkinnableContainer
	{
		[SkinPart(required="true")]	public var calendar:DateChooser;
		[SkinPart(required="true")]	public var hours:DKI_NumericStepper;
		[SkinPart(required="true")] public var minutes:DKI_NumericStepper;
		[SkinPart(required="true")] public var okBtn:DKI_Button;
		[SkinPart(required="true")]	public var dateText:TextInput;
		[SkinPart(required="true")] public var expander:Image;
		[SkinPart(required="true")] public var nullify:Image;
		[SkinPart(required="true")] public var popUp:PopUpAnchor;
		
		
		private var dateConvert:DateTimeFormatter=new DateTimeFormatter();
		private var isoConvert:DateTimeFormatter=new DateTimeFormatter();
		
		private var _selectedDate:Date = new Date();
		private var _enableNull:Boolean = false;
		private var _timeEnabled:Boolean = false;
		
		[Bindable] public var dateRange:Object = new Object();
		[Bindable] public var currentDate:String;
		
		public var dateChange:Function;
		
		//private var minDate:Date = new Date();
		private var minDate:Date = DateTimeFunc.dateAdd( "yyyy", -10, new Date() );
		private var maxDate:Date = new Date();
		
		public var isoDate:String;
		
		public function DKI_DateTime()
		{
			super();
			states = states.concat(
				new State({name: "normal"}),
				new State({name: "open"}),
				new State({name: "disabled"})
			);
			dateConvert.dateStyle="short"; 
			isoConvert.dateTimePattern="yyyy-MM-dd HH:mm:ss";
			
			if (_timeEnabled==true)	
				dateConvert.timeStyle = DateTimeStyle.SHORT 
			else 
				dateConvert.timeStyle= DateTimeStyle.NONE;

			
			
			dateConvert.setStyle("locale", LocaleID.DEFAULT);
			setStyle("skinClass", skins.DateTimeSkin);
			minDate.date=maxDate.date-365;
			maxDate.date=maxDate.date+36500;
			addEventListener('setDateRange',setDateRange);
			addEventListener(FocusEvent.FOCUS_OUT,collapseCalendar);
			dateRange=Object({rangeStart:minDate, rangeEnd:maxDate});
			isoDate=isoConvert.format(selectedDate);
			currentDate=dateConvert.format(selectedDate);
			minWidth=100;
		}
		
		protected function collapseCalendar(event:FocusEvent):void
		{
			invalidateSkinState();
		}
		
		override protected function getCurrentSkinState(): String 
		{
			return "normal";
		}
		
		[Bindable] public function get selectedDate():Date
		{
			return _selectedDate;
		}
		
		public function set selectedDate(value:Date):void
		{
			_selectedDate = value;
			if (value==null)
			{
				currentDate='';
				if (dateText != null) dateText.text = "";
			}
			else
			{	
				isoDate=isoConvert.format(selectedDate);
				if (dateText != null) dateText.text = dateConvert.format(selectedDate);
				if (calendar != null) selectedDate=_selectedDate;
			}	
		}
		
		protected function setDateRange(event:Event):void
		{
			if (calendar) calendar.selectableRange = dateRange;
			
		}
		
		public function setRange(value:Object):void 
		{
			dispatchEvent(new Event("setDateRange"));
		}
		
		override protected function partAdded(partName:String, instance:Object):void
		{
			super.partAdded(partName, instance);
			
			if( instance == okBtn)
			{
				okBtn.addEventListener(MouseEvent.CLICK,ok_clickHandler);
			}
			
			if(instance == calendar)
			{
				calendar.addEventListener(CalendarLayoutChangeEvent.CHANGE, dataChanged);
			}
			
			if(instance == hours)
			{
				hours.addEventListener(Event.CHANGE,timeChanged);
			}
			
			if(instance == minutes)
			{
				minutes.addEventListener(Event.CHANGE,timeChanged);
			}
			
			if(instance == nullify)
			{
				
			}
			
			if( instance == popUp)
			{
				popUp.popUp.addEventListener(FlexMouseEvent.MOUSE_DOWN_OUTSIDE, menuPopOutside, false, 0, true);			
			}
			
		}	
		
		override protected function partRemoved(partName:String, instance:Object) : void
		{
			super.partRemoved(partName, instance);
			
			if( instance == okBtn)
			{
				okBtn.removeEventListener(MouseEvent.CLICK,ok_clickHandler);
			}
			
			if(instance == calendar)
			{
				calendar.removeEventListener(CalendarLayoutChangeEvent.CHANGE, dataChanged);
			}
			
			if(instance == hours)
			{
				hours.removeEventListener(Event.CHANGE,timeChanged);
			}
			
			if(instance == minutes)
			{
				minutes.removeEventListener(Event.CHANGE,timeChanged);
			}
			
			if( instance == popUp)
			{
				popUp.popUp.removeEventListener(FlexMouseEvent.MOUSE_DOWN_OUTSIDE, menuPopOutside);			
			}
			
		}
		
		protected function menuPopOutside(event:FlexMouseEvent):void
		{
			trace("...............HAHAHAHA! I am outside!!!!............................", event.localX, event.localY, event.stageX, event.stageY
				, (event.relatedObject==this.expander), (event.relatedObject==this.dateText), popUp.currentState);
			trace("...............expander............................", this.expander.x, this.expander.y, this.expander.width, this.expander.height);
			//			trace("...............nullify............................", this.nullify.x, this.nullify.y, this.nullify.width, this.nullify.height);
			trace("...............dateText............................", this.dateText.x, this.dateText.y, this.dateText.width, this.dateText.height);
			
			var doClose:Boolean = true;
			// in dataText
			if ( event.localX>=this.dateText.x && event.localX<=(this.dateText.x+this.dateText.width) && event.localY<= this.dateText.y && event.localY>= (this.dateText.y-this.dateText.height) )
			{
				doClose = false;
			}
			// in expander
			if ( event.localX>=this.expander.x && event.localX<=(this.expander.x+this.expander.width) && event.localY<= this.expander.y && event.localY>= (this.expander.y-this.expander.height) )
			{
				doClose = false;
			}
			// in nullify
			//			if ( event.localX>=this.nullify.x && event.localX<=(this.nullify.x+this.nullify.width) && event.localY<= this.nullify.y && event.localY>= (this.nullify.y-this.nullify.height) )
			//			{
			//doClose = false;
			//			}
			
			if ( doClose == true )
			{
				this.expander.dispatchEvent( new MouseEvent(MouseEvent.CLICK) ); 
				//popUp.displayPopUp = false;
				//currentState = "normal";
			}
		}		
		
		private function dataChanged(event:CalendarLayoutChangeEvent):void
		{
			_selectedDate=event.newDate;
			_selectedDate.hours=hours.value;
			_selectedDate.minutes=minutes.value;
			dateText.text = dateConvert.format(selectedDate);
			//currentDate=isoConvert.format(selectedDate);
			isoDate=isoConvert.format(selectedDate);
			//if (dateChange != null) dateChange();
			//dispatchEvent(new Event('dateChanged',true,false));
		}
		
		
		protected function timeChanged(event:Event):void
		{
			_selectedDate.hours=hours.value;
			_selectedDate.minutes=minutes.value;
			dateText.text = dateConvert.format(selectedDate);
			isoDate=isoConvert.format(selectedDate);
			//dispatchEvent(new Event('dateChanged',true,false));
		}
		
		protected function ok_clickHandler(event:Event):void
		{
			if (dateChange != null) dateChange();
			
			// Event trigger added for Manual Transactions. FM_... ==> Flex Messgage...
			dispatchEvent(new Event("FM_DT_CLICK_OK"));
		}

		[Bindable]
		public function get enableNull():Boolean
		{
			return _enableNull;
		}

		public function set enableNull(value:Boolean):void
		{
			_enableNull = value;
		}

		[Bindable]
		public function get timeEnabled():Boolean
		{
			return _timeEnabled;
		}

		public function set timeEnabled(value:Boolean):void
		{
			_timeEnabled = value;
			if (_timeEnabled==true)	
				dateConvert.timeStyle = DateTimeStyle.SHORT 
			else 
				dateConvert.timeStyle= DateTimeStyle.NONE;
			
			if ( dateText != null )
			{
				dateText.text = dateConvert.format(selectedDate);
			}
			//isoDate=isoConvert.format(selectedDate);
		}


	}
}