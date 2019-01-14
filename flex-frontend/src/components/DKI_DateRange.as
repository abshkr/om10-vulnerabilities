package components
{
	import flash.events.Event;
	import flash.events.FocusEvent;
	import flash.events.MouseEvent;
	import flash.globalization.DateTimeStyle;
	import flash.globalization.LocaleID;
	
	import mx.collections.ArrayCollection;
	import mx.controls.Alert;
	import mx.controls.DateChooser;
	import mx.events.CalendarLayoutChangeEvent;
	import mx.events.FlexMouseEvent;
	import mx.states.State;
	
	import skins.DateRangeSkin;
	
	import spark.components.Button;
	import spark.components.Image;
	import spark.components.NumericStepper;
	import spark.components.PopUpAnchor;
	import spark.components.SkinnableContainer;
	import spark.components.Spinner;
	import spark.components.TabBar;
	import spark.components.TextInput;
	import spark.events.IndexChangeEvent;
	import spark.formatters.DateTimeFormatter;
	
	public class DKI_DateRange extends SkinnableContainer
	{
		[SkinPart(required="true")]	public var calendar:DateChooser;
		[SkinPart(required="true")]	public var rangeTab:TabBar;
		[SkinPart(required="true")]	public var grp_hh:SkinnableContainer;
		[SkinPart(required="true")]	public var grp_mm:SkinnableContainer;
		[SkinPart(required="true")]	public var lbl_hh:TextInput;
		[SkinPart(required="true")]	public var lbl_mm:TextInput;
		[SkinPart(required="true")]	public var timeStepper:Spinner;
		[SkinPart(required="true")] public var okBtn:DKI_Button;
		[SkinPart(required="true")]	public var dateText:TextInput;
		[SkinPart(required="true")] public var expander:Image;
		[SkinPart(required="true")] public var popUp:PopUpAnchor;
		
		private var dateConvert:DateTimeFormatter=new DateTimeFormatter();
		
		private var _timeEnabled:Boolean = true;
		
		[Bindable] public var dateRange:String;
		
		[Bindable] private var hr:int=0;
		[Bindable] private var mn:int=0;
		[Bindable] private var sc:int=0;

		private var timeSel:int = 0;
		public var sDate:Date = new Date();
		public var eDate:Date = new Date();
		
		private const period:Number = 86400000;

		public var dateChange:Function;
		public var defaultDays:Number = 14;
				
		public function DKI_DateRange()
		{
			super();
			setStyle("skinClass", skins.DateRangeSkin);
			minWidth=275;
			states = states.concat(
				new State({name: "normal"}),
				new State({name: "open"}),
				new State({name: "disabled"})
			);
			dateConvert.dateStyle="short"; 
			if (timeEnabled==true)	
				dateConvert.timeStyle = DateTimeStyle.SHORT 
			else 
				dateConvert.timeStyle= DateTimeStyle.NONE;
			
			dateConvert.setStyle("locale", LocaleID.DEFAULT);
			getInitFilter();
		}
		
		public function getInitFilter(value:Number=0): void
		{
			eDate = new Date(global.serverDateTime);
			if(!eDate||!sDate)return;
			sDate.time = eDate.time-(period*defaultDays);
			eDate.time = eDate.time+(period*value);
			if (timeEnabled==false)
			{
				sDate.hours = 0;
				sDate.minutes = 0;
				sDate.seconds = 0;
				eDate.hours = 23;
				eDate.minutes = 59;
				eDate.seconds = 59;
			}
			hr = sDate.hours;
			mn = sDate.minutes;
			sc = sDate.seconds;
			setStepperRange();			
			setRange();
		}
				
		override protected function getCurrentSkinState(): String 
		{
			return "normal";
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
				calendar.addEventListener(CalendarLayoutChangeEvent.CHANGE, dc_changeHandler);
			}
			
			if(instance == rangeTab)
			{
				rangeTab.addEventListener(Event.CHANGE,tabbar1_changeHandler);
			}
			
			if(instance== timeStepper)
			{
				timeStepper.addEventListener(Event.CHANGE,stepper_changeHandler);
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
				calendar.removeEventListener(CalendarLayoutChangeEvent.CHANGE, dc_changeHandler);
			}
			
			if(instance == rangeTab)
			{
				rangeTab.removeEventListener(Event.CHANGE,tabbar1_changeHandler);
			}
			
			if(instance== timeStepper)
			{
				timeStepper.removeEventListener(Event.CHANGE,stepper_changeHandler);
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
		
		public function refreshEndDate(value:int=0): void
		{
			eDate = new Date(global.serverDateTime);
			eDate.time = eDate.time;
			eDate.seconds = 59;
			setRange();
		}

		protected function setRange():void
		{
			//if (timeEnabled == false)
				dateRange = dateConvert.format(sDate)+' ~ ' + dateConvert.format(eDate)
			//else
			//	dateRange = dateConvert.format(sDate)+' ~ ' + dateConvert.format(eDate);
		}
		
		protected function tabbar1_changeHandler(event:IndexChangeEvent):void
		{
			timeSel = 0;
			if (rangeTab.selectedIndex==0)
			{
				this.setCalendarDate( sDate );
				hr = sDate.hours;
				mn = sDate.minutes;
				sc = 0;
			}
			else
			{	
				this.setCalendarDate( eDate );
				if (timeEnabled == false)
				{	
					eDate.hours = 23;
					eDate.minutes = 59;
					eDate.seconds = 59;
				}	
				hr = eDate.hours;
				mn = eDate.minutes;
				sc = eDate.seconds;
			}	
			timeStepper.value = hr;
			setStepperRange();			
			setTime(true);
		}
		
		protected function dc_changeHandler(event:CalendarLayoutChangeEvent):void
		{
			var sDateOld:Date = new Date();
			var eDateOld:Date = new Date();
			
			if (rangeTab.selectedIndex==0)
			{
				sDateOld = sDate;
				hr = sDateOld.hours;
				mn = sDateOld.minutes;
				sc = sDateOld.seconds;
				sDate=calendar.selectedDate;
				sDate.hours = hr;
				sDate.minutes = mn;
				sDate.seconds = sc;
				if (sDate.date > eDate.date)
				{
					eDate.date = sDate.date+1;
					eDate.hours = sDate.hours;
					eDate.minutes = sDate.minutes;
					eDate.seconds = 59;
				}
				this.setCalendarDate( sDate );
			}
			else
			{	
				eDateOld = eDate;
				hr = eDateOld.hours;
				mn = eDateOld.minutes;
				sc = eDateOld.seconds;
				eDate=calendar.selectedDate;
				eDate.hours = hr;
				eDate.minutes = mn;
				eDate.seconds = sc;
				this.setCalendarDate( eDate );
			}	
			lbl_hh.text=this.zeroPad(hr,2);
			lbl_mm.text=this.zeroPad(mn,2);
			setRange();
		}
		
		protected function dc_changeHandler2(event:CalendarLayoutChangeEvent):void
		{
			if (rangeTab.selectedIndex==0)
			{
				sDate=calendar.selectedDate;
				hr = sDate.hours;
				mn = sDate.minutes;
				sc = sDate.seconds;
				if (sDate.date > eDate.date)
				{
					eDate.date = sDate.date+1;
					eDate.hours = sDate.hours;
					eDate.minutes = sDate.minutes;
					eDate.seconds = 59;
				}
			}
			else
			{	
				eDate=calendar.selectedDate;
				hr = eDate.hours;
				mn = eDate.minutes;
				sc = eDate.seconds;
			}	
			lbl_hh.text=this.zeroPad(hr,2);
			lbl_mm.text=this.zeroPad(mn,2);
			setRange();
		}
		
		protected function image1_clickHandler(event:MouseEvent):void
		{
			rangeTab.selectedIndex=0;
			this.setCalendarDate( sDate );
		}
		
		public function zeroPad(number:int, width:int):String {
			var ret:String = ""+number;
			while( ret.length < width )
				ret="0" + ret;
			return ret;
		}
				
		public function time_clickHandler(event:MouseEvent):void
		{
			grp_hh.setStyle('backgroundColor',0xFFFFFF);
			grp_mm.setStyle('backgroundColor',0xFFFFFF);
			switch(event.currentTarget.id)
			{
				case 'lbl_hh':	timeStepper.maximum=23;
					grp_hh.setStyle('backgroundColor','cyan');
					timeStepper.value=hr;
					timeSel=0;
					break;
				case 'lbl_mm':	timeStepper.maximum=59;
					grp_mm.setStyle('backgroundColor','cyan');
					timeStepper.value=mn;
					timeSel=1;
					break;
				case 'lbl_ss':	timeStepper.maximum=59;
					timeStepper.value=sc;
					timeSel=2;
					break;
			}
			setStepperRange();			
		}
		
		protected function stepper_changeHandler(event:Event):void
		{
			switch(timeSel)
			{
				case 0:hr = timeStepper.value;
					lbl_hh.text=this.zeroPad(hr,2);
					break;
				case 1:mn = timeStepper.value;
					lbl_mm.text=this.zeroPad(mn,2);
					break;
			}
			if (rangeTab.selectedIndex == 0)
			{
				sDate.hours = hr;
				sDate.minutes = mn;
				sDate.seconds = 0;
			}
			else
			{
				eDate.hours = hr;
				eDate.minutes = mn;
				eDate.seconds = 59;
			};
			setStepperRange();			
			setRange();
		}
				
		protected function ok_clickHandler(event:Event):void
		{	
			currentState = 'normal';
			invalidateSkinState();
			if (dateChange != null) dateChange();
		}
		
		[Bindable] public function get timeEnabled():Boolean
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
		}
		
		public function setTime(value:Boolean): void
		{
			if (value==false)
			{
				this.setCalendarDate( sDate );
				hr = sDate.hours;
				mn = sDate.minutes;
				sc = sDate.seconds;
			};	
			lbl_hh.text=this.zeroPad(hr,2);
			lbl_mm.text=this.zeroPad(mn,2);
		}
		
		public function setStepperRange():void
		{
			if ( timeStepper == null )
			{
				return;
			}
			
			grp_hh.setStyle('backgroundColor',0xFFFFFF);
			grp_mm.setStyle('backgroundColor',0xFFFFFF);
			if ( timeSel == 0 )
			{
				grp_hh.setStyle('backgroundColor','cyan');
				timeStepper.maximum = 23;
			}
			else if ( timeSel == 1 )
			{
				grp_mm.setStyle('backgroundColor','cyan');
				timeStepper.maximum = 59;
			}
			else if ( timeSel == 2 )
			{
				timeStepper.maximum = 59;
			}
			else
			{
				timeStepper.maximum = 59;
			}
		}
		
		public function setCalendarDate( dt:Date )
		{
			if ( this.dateText.text != "" )
			{
				this.calendar.selectedDate = dt;
			}
		}
		
	}
}