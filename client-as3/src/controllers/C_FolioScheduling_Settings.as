package controllers{
	
	import components.ManualCloseOut;
	
	import dm.DM;
	import dm.remoteDataService;
	
	import flash.events.Event;
	import flash.globalization.DateTimeFormatter;
	import flash.globalization.DateTimeStyle;
	import flash.globalization.LocaleID;
	
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	import mx.utils.ObjectUtil;
	
	import views.v_FolioSchedulling_Settings;
	
	public class C_FolioScheduling_Settings{
		
		
			
		[Bindable] public var view:v_FolioSchedulling_Settings;
		[Bindable] public var differentData:Boolean = false;
		
		[Bindable] public var addModel:Function;
		[Bindable] public var dtf:DateTimeFormatter = new DateTimeFormatter(LocaleID.DEFAULT, DateTimeStyle.SHORT, DateTimeStyle.SHORT);
		[Bindable] public var df:DateTimeFormatter  = new DateTimeFormatter(LocaleID.DEFAULT, DateTimeStyle.SHORT, DateTimeStyle.NONE);
		
		
		private var frozenFolioList:remoteDataService = new remoteDataService( "ListLibraryService.lookupFolios", null, frozenFolioList_resultHandler );
		//private var openFrozenFolioList:remoteDataService = new remoteDataService( "ListLibraryService.lookupOpenFrozenFolios", null, openFrozenFolioList_resultHandler );
		
		
		
		public function get LDRD():String{
			if(DM.FolioSettings.lastDailyReportDate)
				return dtf.format(DM.FolioSettings.lastDailyReportDate);
			return DM.FolioSettings.lastDailyReportDate.toString();
		}
		public function get LWRD():String{
			if(DM.FolioSettings.lastWeeklyReportDate)
				return df.format(DM.FolioSettings.lastWeeklyReportDate);
			return DM.FolioSettings.lastWeeklyReportDate.toString();
		}
		public function get LMRD():String{
			if(DM.FolioSettings.lastMonthlyReportDate)
				return df.format(DM.FolioSettings.lastMonthlyReportDate);
			return DM.FolioSettings.lastMonthlyReportDate.toString();
		}
		
		
		
		
		public function C_FolioScheduling_Settings(){ 
		}
		
		public function save():void{
			
			var payload:Object = new Object();
			var ndrd:Date = DM.FolioSettings.nextDailyReportDate;
			
			payload.SITE_LD_RETNPRD = view.lrpNS.value;
			payload.SITE_LD_RETN_NEWLDS = view.lrnlNS.value;
			payload.SITE_EXP_MONTHS = view.pemNS.value;
			
			if(view.drthNS.value != Number(DM.FolioSettings.nextDailyReportHour)){
				payload.NEXT_REPORT_TIME = ndrd.fullYear+"-"+(ndrd.month+1)+"-"+ndrd.date+" " +view.drthNS.value+":"+view.drtmNS.value;
			}
			if(view.drtmNS.value != Number(DM.FolioSettings.nextDailyReportMin)){
				payload.NEXT_REPORT_TIME = ndrd.fullYear+"-"+(ndrd.month+1)+"-"+ndrd.date+" " +view.drthNS.value+":"+view.drtmNS.value;
			}
			trace('view.nwrDF', view.nwrDF);
			trace('view.nwrDF.selectedDate', view.nwrDF.selectedDate);
			trace('view.nwrDF.selectedDate.toString()', view.nwrDF.selectedDate.toString());
			trace(DM.FolioSettings);
			trace(DM.FolioSettings.nextWeeklyReportDate);
			trace(DM.FolioSettings.nextWeeklyReportDate.toString());
			if(view.nwrDF.selectedDate.toString() != DM.FolioSettings.nextWeeklyReportDate.toString()){
				payload.NEXT_WEEKLY_REPORT_DATE = view.nwrDF.selectedDate.fullYear+"-"+(view.nwrDF.selectedDate.month+1)+"-"+view.nwrDF.selectedDate.date;
			}
			if(view.nmrDF.selectedDate.toString() != DM.FolioSettings.nextMonthlyReportDate.toString()){
				payload.NEXT_MONTHLY_REPORT_DATE = view.nmrDF.selectedDate.fullYear+"-"+(view.nmrDF.selectedDate .month+1)+"-"+view.nmrDF.selectedDate .date;
			}
			if(view.opDF.selectedDate.toString() != DM.FolioSettings.operateDmy.toString()){
				payload.OP_DAY_MNTH_YEAR = view.opDF.selectedDate.fullYear+"-"+(view.opDF.selectedDate.month+1)+"-"+view.opDF.selectedDate.date;
			}
			
			DM.FolioSettings.save(payload, function():void{dataChange(null);});
			
		}
		public function cancel():void{
			view.lrpNS.value        = Number(DM.FolioSettings.loadRetPeriod);
			view.pemNS.value        = Number(DM.FolioSettings.expireMons);			
			view.drthNS.value       = Number(DM.FolioSettings.nextDailyReportHour);
			view.drtmNS.value       = Number(DM.FolioSettings.nextDailyReportMin);
			view.nwrDF.selectedDate = DM.FolioSettings.nextWeeklyReportDate;
			view.nmrDF.selectedDate = DM.FolioSettings.nextMonthlyReportDate;
			view.opDF.selectedDate  = DM.FolioSettings.operateDmy;
			dataChange(null);
		}
		
		public function dateChangedFunction():void
		{
			dataChange(null);
		}
		public function dataChange(event:Event):void{
			differentData = false;
			if(view.lrpNS.value  	   			  != Number(DM.FolioSettings.loadRetPeriod))           	{trace(">>>> 1");differentData = true;}
			if(view.lrnlNS.value  	 			  != Number(DM.FolioSettings.loadRetNewLoad))          	{trace(">>>> 2");differentData = true;}
			if(view.pemNS.value				  	  != Number(DM.FolioSettings.expireMons))              	{trace(">>>> 3");differentData = true;}
			if(view.drthNS.value 	  			  != Number(DM.FolioSettings.nextDailyReportHour))     	{trace(">>>> 4");differentData = true;}
			if(view.drtmNS.value 	   			  != Number(DM.FolioSettings.nextDailyReportMin))      	{trace(">>>> 5");differentData = true;}
			
			//trace( ".......................controller.df.getDateTimePattern().toUpperCase()...................................", view.nwrDF.selectedDate, DM.FolioSettings.nextWeeklyReportDate, DM.FolioSettings.nextWeeklyReportDate.toString() );
			
			//if(view.nwrDF.selectedDate!=null && view.nwrDF.selectedDate.toString() != DM.FolioSettings.nextWeeklyReportDate.toString())  {trace(">>>> 6");differentData = true;}
			//if(view.nmrDF.selectedDate!=null && view.nmrDF.selectedDate.toString() != DM.FolioSettings.nextMonthlyReportDate.toString()) {trace(">>>> 7");differentData = true;}
			//if(view.opDF.selectedDate!=null && view.opDF.selectedDate.toString()  != DM.FolioSettings.operateDmy.toString())            {trace(">>>> 8");differentData = true;}
			trace(">>>> 6aaa",view.nwrDF.currentDate,view.nwrDF.dateText.text,view.nwrDF.selectedDate);
			if(DM.FolioSettings.nextWeeklyReportDate!=null && view.nwrDF.dateText.text != this.df.format( DM.FolioSettings.nextWeeklyReportDate))  {trace(">>>> 6",view.nwrDF.currentDate,view.nwrDF.dateText.text,view.nwrDF.selectedDate);differentData = true;}
			if(DM.FolioSettings.nextMonthlyReportDate!=null && view.nmrDF.dateText.text != this.df.format( DM.FolioSettings.nextMonthlyReportDate)) {trace(">>>> 7");differentData = true;}
			if(DM.FolioSettings.operateDmy!=null && view.opDF.dateText.text  != this.df.format( DM.FolioSettings.operateDmy))            {trace(">>>> 8");differentData = true;}
			
			this.nwrDateToString();
			this.nmrDateToString();
			this.opDateToString();
			
			//trace( ".......................controller.df.getDateTimePattern().toUpperCase()...................................", df.getDateTimePattern().toUpperCase(), df.getDateTimePattern() );
		}
		
		public function nwrDateToString():void{
			if(view.nwrDF.selectedDate!=null) 
			{
				view.nwrDF.dateText.text = this.df.format( view.nwrDF.selectedDate );
			}
		}
		
		public function nmrDateToString():void{
			if(view.nmrDF.selectedDate!=null) 
			{
				view.nmrDF.dateText.text = this.df.format( view.nmrDF.selectedDate );
			}
			
		}
		
		public function opDateToString():void{
			if(view.opDF.selectedDate!=null) 
			{
				view.opDF.dateText.text = this.df.format( view.opDF.selectedDate );
			}
		}
		
		public function manualClose(): void
		{
			this.frozenFolioList.service( 1 );
			//DM.FolioSettings.manualCloseoutClose(function(response:*):void{global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.CLS_1ST_FRZ_FOLIO_REQ'));});
		}
		
		protected function frozenFolioList_resultHandler():void
		{
			if ( frozenFolioList.length > 0 ) {
				doManualClose();
			}
			else {
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','global.msg.nofrozenfolios'));
			}
		}

		public function doManualClose():void{
			DM.FolioSettings.manualCloseoutClose(
				function(response:*):void{
					if(response.data[0].NEXT_MANUAL_CLOSE==null){
						global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.SETTINGS.MSG.CLOSE_FOLIO_SUBMIT'));	
					}else{
						global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.SETTINGS.MSG.OLD_REQUEST_RUNNING'));
					}
				}
			);
		}
		
		public function manualFreeze(overrideDefault:Boolean = false):void{
			var mco:ManualCloseOut = PopUpManager.createPopUp(view,ManualCloseOut,true) as ManualCloseOut;
			PopUpManager.centerPopUp(mco);
			mco.nextScheduledTime = DM.FolioExceptionDates.nextNonExceptionDateGUI + " " + DM.FolioSettings.nextDailyReportHour + ":" + DM.FolioSettings.nextDailyReportMin;
			mco.overrideMode = overrideDefault;
			mco.run = function(freeze:String, override:String):void{
				DM.FolioSettings.manualCloseoutFreeze(freeze, function(response:*):void{
					if(response.data[0].NEXT_MANUAL_FREEZE_DATETIME==null){
						global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.SETTINGS.MSG.SUC_RUN_CLOSEOUT'));
					}else{
						global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.SETTINGS.MSG.OLD_REQUEST_RUNNING'));
					}
					
					
					/// deal with override
					
					var override_string:String;
					if(override){
						override_string  =  Number(override.split(" ")[0].split("-")[2])+"_";
						override_string  += Number(override.split(" ")[0].split("-")[1])+"_";
						override_string  += Number(override.split(" ")[0].split("-")[0]);
						if("ALREADY EXIST" == addModel("ONCE_WINDOW",override_string,mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.SETTINGS.MSG.MANUAL_CLOSEOUT_OVERRIDE'), function(response:* = null){
								PopUpManager.removePopUp(mco);
								DM.FolioSchedullings.reload();
							})){
							PopUpManager.removePopUp(mco);
							DM.FolioSchedullings.reload();
						}
					}else{
						override_string = null;
						PopUpManager.removePopUp(mco);
						DM.FolioSchedullings.reload();
					}
					
					
				});
			}
		}
	}
}