package dm.collections
{
	import controllers.C_FolioScheduling_Calendar;
	
	import dm.DM;
	import dm.models.dmFolioExceptionDate;
	import dm.utils.dmDate;
	
	import flash.events.Event;
	import flash.events.IEventDispatcher;
	import flash.globalization.DateTimeFormatter;
	import flash.globalization.DateTimeStyle;
	import flash.globalization.LocaleID;
	import flash.utils.getTimer;
	
	import mx.collections.ArrayCollection;
	import mx.managers.CursorManager;
	import mx.utils.ObjectUtil;
	
	public class dmFolioExceptionDates extends dmCollection implements IEventDispatcher{
		
		
		public var dmClass:String = "dmFolioExceptionDates";
		public var dmData:ArrayCollection;
		
		private var time:Number = 0;
		
		[Bindable] private var hashObject:Object = new Object();
		
		[Bindable] public var df:DateTimeFormatter  = new DateTimeFormatter(LocaleID.DEFAULT, DateTimeStyle.SHORT, DateTimeStyle.NONE);
		
		
		public function dmFolioExceptionDates( params:* = false ){
			super(params);
		}
		override public function reload():void{
			populate();
		}
		override public function populate( params:* = false ):void{
			//set the service arguments.
			super.setServiceArgs(params);
			//fire off the service request.
			serviceArgs.year = C_FolioScheduling_Calendar.SELECTED_YEAR;
			serviceArgs.month = C_FolioScheduling_Calendar.SELECTED_MONTH;
			Server.service('dmsFolioExceptionDateService.getExceptionDates', serviceArgs, populateSource);
			time = getTimer();
			trace("FOLIO EXCEPTION DATE REQUEST: ", getTimer() - time);
			//CursorManager.setBusyCursor();
		}
		
		[Bindable("listUpdated")]public function get allowOverrideToday():Boolean{
			
			trace("next Time:" + nextNonExceptionDate);
			trace("Server Time:" + global.serverDateTime);
			// check 1
			// make sure today is not exception;
			if(isTodayException)return false;
			// check 2
			// make sure current time is before today's reporting time
			if(nextNonExceptionDate.time < global.serverDateTime.time)return false;
			// check 3
			// make sure the NNED is today's date
			if(nextNonExceptionDate.fullYear != global.serverDateTime.fullYear ||
			   nextNonExceptionDate.month    != global.serverDateTime.month    || 
			   nextNonExceptionDate.date     != global.serverDateTime.date )return false;
			
			
			return true;
		}
		
		[Bindable("listUpdated")]public function get exceptions():Object{
			return hashObject;
		}
		
		[Bindable("listUpdated")]public function get isTodayException():Boolean{
			var today:Date = global.serverDateTime;
			if(hashObject[today.fullYear]!=null)
				if(hashObject[today.fullYear][today.month]!=null)
					if(hashObject[today.fullYear][today.month][today.date]!=null)return true;
			return false;
		}
		[Bindable("listUpdated")]public function get nextNonExceptionDateGUI():String{
			//
			var ndrd:Date  = new Date(DM.FolioSettings.nextDailyReportDate);
			var today:Date = new Date(global.serverDateTime);
			if(ndrd>today)today = new Date(ndrd);
			today.hours    = Number(DM.FolioSettings.nextDailyReportHour);
			today.minutes  = Number(DM.FolioSettings.nextDailyReportMin); 
			today.seconds  = today.milliseconds = 0;
			var mt32:Boolean = false;
			for (var i:int=0; i<32; i++){
				if(hashObject[today.fullYear]!=null)
					if(hashObject[today.fullYear][today.month]!=null)
						if(hashObject[today.fullYear][today.month][today.date]!=null){
							// there is exception here, move one date up
							today.date++;
							if(i == 31)mt32=true;
						}else{
							break;
						}
			}
			if(mt32)return "More than 30 days away";
			return df.format(today);
		}
		
		[Bindable("listUpdated")]public function get nextNonExceptionDate():Date{
			var ndrd:Date  = new Date(DM.FolioSettings.nextDailyReportDate);
			var today:Date = new Date(global.serverDateTime);
			if(ndrd>today)today = new Date(ndrd);
			today.hours    = Number(DM.FolioSettings.nextDailyReportHour);
			today.minutes  = Number(DM.FolioSettings.nextDailyReportMin); 
			today.seconds  = today.milliseconds = 0;
			trace(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+ today );
			var mt32:Boolean = false;
			for (var i:int=0; i<32; i++){
				if(hashObject[today.fullYear]!=null)
					if(hashObject[today.fullYear][today.month]!=null)
						if(hashObject[today.fullYear][today.month][today.date]!=null){
							// there is exception here, move one date up
							today.date++;
							if(i == 31)mt32=true;
						}else{
							break;
						}
			}
			if(mt32)new Date(3000,0,0,0,0,0,0);
			return today;
		}
		
		
		override protected function populateSource( response : * ):void{
			
			super.populateSource(response);
			hashObject = new Object();
			for each(var eDate:dmFolioExceptionDate in this){
				var date:Date = dmDate.toDate(eDate.payload.C_DATE);
				if(hashObject[date.fullYear]==null)hashObject[date.fullYear] = new Object();
				if(hashObject[date.fullYear][date.month]==null)hashObject[date.fullYear][date.month] = new Object();
				if(hashObject[date.fullYear][date.month][date.date]==null)hashObject[date.fullYear][date.month][date.date] = eDate;
			}			
			
			dispatchEvent(new Event("listUpdated"));
		}
	}	
}