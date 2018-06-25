package dm.models{
	import flash.globalization.DateTimeStyle;
	import flash.globalization.LocaleID;
	
	import mx.resources.ResourceManager;
	
	import spark.formatters.DateTimeFormatter;
	
	public dynamic class dmFolioSchedule extends dmModel{
	
		public function dmFolioSchedule(params:* = false){
			super(params);
		}
		
		public function get UIWindow():String{
			switch (payload.WINDOW_NAME){
				case "ONCE_WINDOW":
					return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.RULES.ONCE_WINDOW');
				case "WEEK_WINDOW":
					return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.RULES.WEEK_WINDOW');				
				case "MONTH_WINDOW":
					return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.RULES.MONTH_WINDOW');
				case "YEAR_WINDOW":
					return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.RULES.YEAR_WINDOW');
				case "DATE_YEAR_WINDOW":
					return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.RULES.DATE_YEAR_WINDOW');
					
				default:
					return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.RULES.UNKONWN_WINDOW');
			}
		}
		
		public function get UIDate():String{
			switch (payload.WINDOW_NAME){
				case "ONCE_WINDOW":
					//return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.ONCE_WINDOW.TXT1')+ payload.REPEAT_INTERVAL.split("_").join("/");
					return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.ONCE_WINDOW.TXT1') +': '+ toDateText(payload.REPEAT_INTERVAL);
				case "OVERRIDE":
					//return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.OVERRIDE.TXT1')+ payload.REPEAT_INTERVAL.split("_").join("/");
					return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.OVERRIDE.TXT1') +': '+ toDateText(payload.REPEAT_INTERVAL);
				case "WEEK_WINDOW":
					return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.WEEK_WINDOW.TXT1') + toWeekDay(payload.REPEAT_INTERVAL);				
				case "MONTH_WINDOW":
					return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MONTH_WINDOW.TXT1') + payload.REPEAT_INTERVAL 
					+ mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MONTH_WINDOW.TXT2');
				case "YEAR_WINDOW":
					return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.YEAR_WINDOW.TXT1') + toItteration(payload.REPEAT_INTERVAL.split("_")[0]) 
					+mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.YEAR_WINDOW.TXT2') + toWeekDay(payload.REPEAT_INTERVAL.split("_")[1])
					+ mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.YEAR_WINDOW.TXT3') + toMonth(payload.REPEAT_INTERVAL.split("_")[2]);
				case "DATE_YEAR_WINDOW":
					return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.DATE_YEAR_WINDOW.TXT1') +payload.REPEAT_INTERVAL.split("_")[0] 
					+ mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.DATE_YEAR_WINDOW.TXT2') + toMonth(payload.REPEAT_INTERVAL.split("_")[1]);
				default:
					return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.RULES.UNKONWN_WINDOW');
			}
		}
		
		private function toDateText(dtString:String):String{
			
			var dtArr:Array = dtString.split("_");
			var dt_date:Date = new Date(int(dtArr[2]), int(dtArr[1])-1, int(dtArr[0]) );
			
			var dt_string:String;
			
			var dtf:DateTimeFormatter = new DateTimeFormatter();
			dtf.dateStyle="short"; 
			dtf.timeStyle= "none";
			dtf.setStyle("locale", LocaleID.DEFAULT);

			dt_string = ""; 
			dt_string = dtf.format( dt_date);
			
			return dt_string;
		}
		private function toItteration(num:int):String{

			switch(num){
				
				case 0:		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.NUMTH.1ST');
				case 1:		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.NUMTH.2ND');
				case 2:		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.NUMTH.3RD');
				case 3:		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.NUMTH.4TH');
				case 4:		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.NUMTH.5TH');
				
				default:	return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MSG.FAILED');
			}
				
		}
		private function toWeekDay(wday:String):String{
			
			switch(wday){
				
				case 'Monday':		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.WEEK.MON');
				case 'Tuesday':		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.WEEK.TUE');
				case 'Wednesday':	return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.WEEK.WED');
				case 'Thursday':	return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.WEEK.THU');
				case 'Friday':		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.WEEK.FRI');
				case 'Satday':		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.WEEK.SAT');
				case 'Sunday':		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.WEEK.SUN');
					
				default:	return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MSG.FAILED');
			}
			
		}
		private function toMonth( monthNum : int):String{
			
			switch(monthNum){
				
				case 1:		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MONTH.JAN');
				case 2:		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MONTH.FEB');
				case 3:		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MONTH.MAR');
				case 4:		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MONTH.APR');
				case 5:		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MONTH.MAY');
				case 6:		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MONTH.JUN');
				case 7:		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MONTH.JUL');
				case 8:		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MONTH.AUG');
				case 9:		return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MONTH.SEP');
				case 10:	return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MONTH.OCT');
				case 11:	return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MONTH.NOV');
				case 12: 	return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MONTH.DEC');
				default:	return mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MSG.FAILED');
					
			}
			
		}
		
	}
	
}