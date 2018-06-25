package components
{
	
	import flash.events.Event;
	import flash.events.IEventDispatcher;
	
	import mx.controls.DateChooser;
	import mx.events.CalendarLayoutChangeEvent;
	import mx.events.DateChooserEvent;
	
	import spark.formatters.DateTimeFormatter;
	
	public class DKI_Calendar extends DateChooser implements IEventDispatcher{	
		
		private var _exceptions:Array = new Array();
		private var dateConvert:DateTimeFormatter=new DateTimeFormatter();
		
		public function DKI_Calendar(){
			super();
			setStyle("selectionColor",0xFF0000);
			showToday=false;
			this.yearNavigationEnabled=true;
			addEventListener(CalendarLayoutChangeEvent.CHANGE,onChange);
		}

		private function onChange(event:CalendarLayoutChangeEvent):void{
			var addMe:Boolean=true;
			var temp:Array;
			var ind:int = 0;
			var eDate:String = dateConvert.format(event.newDate);
			var tDate:String;
			for (var i:int=0; i < _exceptions.length; i++){
				tDate = dateConvert.format(_exceptions[i].rangeStart);
				if (tDate == eDate){
					addMe=false;
					ind=i;
				}
			}
			
			if(addMe){
				_exceptions.push({rangeStart:event.newDate, rangeEnd:event.newDate});
			}else{		
				_exceptions.splice(ind,1);
			}
			
			selectedRanges = _exceptions;
			dispatchEvent(new Event("exceptionUpdate"));
		}
		[Bindable (event="exceptionUpdate")]
		public function get exceptions():Array{
			// make sure get and set are consistent
			var arr:Array = new Array();
			for(var i:int = 0 ; i < _exceptions.length; i++){
				arr.push(_exceptions[i].rangeStart);
			}
			return arr;
		}

		public function set exceptions(value:Array):void{
			_exceptions = new Array();
			for(var i:int = 0 ; i < value.length; i++){
				_exceptions.push({rangeStart:value[i], rangeEnd:value[i]});
			}
			selectedRanges = _exceptions;
			dispatchEvent(new Event("exceptionUpdate"));
		}
	}
}