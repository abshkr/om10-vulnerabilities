package dm.collections
{
	import dm.DM;
	import dm.comms.amf;
	
	import flash.events.Event;
	import flash.events.EventDispatcher;
	
	import mx.utils.ObjectUtil;
	
	public class dmFolioSettings extends EventDispatcher{
		
		
		[Bindable] private var _server:amf;
		
		[Bindable] private var last_daily_report_date:Date;
		[Bindable] private var next_daily_report_date:Date;
		[Bindable] private var next_daily_report_hour:String;
		[Bindable] private var next_daily_report_min:String;
		
		[Bindable] private var last_weekly_report_date:Date;
		[Bindable] private var next_weekly_report_date:Date;
		//[Bindable] private var next_weekly_report_hour:String;
		//[Bindable] private var next_weekly_report_min:String;
		
		[Bindable] private var last_monthly_report_date:Date;
		[Bindable] private var next_monthly_report_date:Date;
		//[Bindable] private var next_monthly_report_hour:String;
		//[Bindable] private var next_monthly_report_min:String;
		
		[Bindable] private var load_ret_period:String;
		[Bindable] private var load_ret_newlds:String;
		[Bindable] private var load_ret_newmov:String;
		[Bindable] private var load_ret_commov:String;
		[Bindable] private var operate_dmy:Date;
		[Bindable] private var expire_mons:String;
		[Bindable] public var manual_freeze:String;
		[Bindable] public var manual_close:String;
		
		[Bindable] public var lmdDRT:String  = "";
		[Bindable] public var userDRT:String = "";
		[Bindable] public var lmdNWR:String  = "";
		[Bindable] public var userNWR:String = "";
		[Bindable] public var lmdNMR:String  = "";
		[Bindable] public var userNMR:String = "";
		[Bindable] public var lmdOD:String   = "";
		[Bindable] public var userOD:String  = "";
		
		[Bindable] public var canCloseFolio:Boolean = false;
		
		private var nd:Date = new Date();
		[Bindable("dataUpdate")] public var today:Date = new Date(nd.fullYear,nd.month,nd.date,0,0,0,0);
		
		[Bindable("dataUpdate")]public function get lastDailyReportDate():Date{  return last_daily_report_date;}
		[Bindable("dataUpdate")]public function get nextDailyReportDate():Date{  return next_daily_report_date;}
		[Bindable("dataUpdate")]public function get nextDailyReportHour():String{return next_daily_report_hour;}
		[Bindable("dataUpdate")]public function get nextDailyReportMin():String{ return next_daily_report_min;}
		
		[Bindable("dataUpdate")]public function get lastWeeklyReportDate():Date{ return last_weekly_report_date;}
		[Bindable("dataUpdate")]public function get nextWeeklyReportDate():Date{ return next_weekly_report_date;}
		//[Bindable("dataUpdate")]public function get nextWeeklyReportHour():String{ return next_weekly_report_hour;}
		//[Bindable("dataUpdate")]public function get nextWeeklyReportMin():String{  return next_weekly_report_min;}
		
		[Bindable("dataUpdate")]public function get lastMonthlyReportDate():Date{return last_monthly_report_date;}
		[Bindable("dataUpdate")]public function get nextMonthlyReportDate():Date{return next_monthly_report_date;}
		//[Bindable("dataUpdate")]public function get nextMonthlyReportHour():String{return next_monthly_report_hour;}
		//[Bindable("dataUpdate")]public function get nextMonthlyReportMin():String{ return next_monthly_report_min;}
		
		[Bindable("dataUpdate")]public function get loadRetNewLoad():String{        return load_ret_newlds;}
		[Bindable("dataUpdate")]public function get loadRetNewMov():String{        return load_ret_newmov;}
		[Bindable("dataUpdate")]public function get loadRetComMov():String{        return load_ret_commov;}
		
		
		[Bindable("dataUpdate")]public function get loadRetPeriod():String{        return load_ret_period;}
		[Bindable("dataUpdate")]public function get operateDmy():Date{             return operate_dmy;}
		[Bindable("dataUpdate")]public function get expireMons():String{           return expire_mons;}
		
		public function set lastDailyReportDate(date:Date):void{}
		public function set nextDailyReportDate(date:Date):void{}
		public function set nextDailyReportHour(date:String):void{}
		public function set nextDailyReportMin(date:String):void{}
		
		public function set lastWeeklyReportDate(date:Date):void{}
		public function set nextWeeklyReportDate(date:Date):void{}
		public function set nextWeeklyReportHour(date:String):void{}
		public function set nextWeeklyReportMin(date:String):void{}
		
		public function set lastMonthlyReportDate(date:Date):void{}
		public function set nextMonthlyReportDate(date:Date):void{}
		public function set nextMonthlyReportHour(date:String):void{}
		public function set nextMonthlyReportMin(date:String):void{}
		
		public function set loadRetNewLoad(date:String):void{}
		public function set loadRetNewMov(date:String):void{}
		public function set loadRetComMov(date:String):void{}
		public function set loadRetPeriod(date:String):void{}
		public function set operateDmy(date:Date):void{}
		public function set expireMons(date:String):void{}
	
			
		public function dmFolioSettings(){
			_server = new amf(global.AppServicesConfig.gatewayURL);
			reload();
		}
		
		public function reload():void{
			_server.service('dmsFolioSettingsService.loadData',false, onLoad);
			_server.service('dmsSiteConfigService.getCloseoutStatus',false, onGetSetting);
		}
		
		public function save (payload:Object,  f:Function):void{
			_server.service('dmsFolioSettingsService.saveData',payload, function(response:*):void{
				global.msgSuccess("Folio Closeout Settings Saved.");
				_server.service('dmsFolioSettingsService.loadData',false, function(response:*):void{
					onLoad(response);
					if(f)f();
				});
			}); 
		}
		
		public function manualCloseoutClose(f:Function = null):void
		{
			var payload:Object=
				{
					user:global.user
				};
			_server.service('dmsFolioSettingsService.manualCloseoutClose',payload, function(response:*):void{
				var loaded:Object = response;
				_server.service('dmsFolioSettingsService.loadData',false, function(response:*):void{
					onLoad(response);
					if(f)f(loaded);
				});
			});
		}
		
		public function manualCloseoutFreeze(freeze:String, f:Function):void{
			var payload:Object = {
				user:global.user,
				manual_freeze : freeze 
			};
			_server.service('dmsFolioSettingsService.manualCloseoutFreeze',payload, function(response:*):void{
				var loaded:Object = response;
				_server.service('dmsFolioSettingsService.loadData',false, function(response:*):void{
					onLoad(response);
					if(f)f(loaded);
				});
			});
		}
		
		public function canSetAuto(callback:Function):void{
			_server.service('dmsFolioSettingsService.canSetAuto',null, callback);			
		}
		
		public function onGetSetting(response:*):void{
			var obj:String = response.data[0].CONFIG_VALUE;
			canCloseFolio = (obj == "N") ? true : false;			
		}
		public function onLoad(response:*):void{
			
			var obj:Object = response.data;
			
			last_daily_report_date   = StringToDate(obj.LAST_DAILY_REPORT_DATE.PARAM_VALUE);
			next_daily_report_date   = StringToDate(obj.NEXT_DAILY_REPORT_DATE.PARAM_VALUE);
			
			var dailyTime:Date 		 = StringToDateTime(obj.NEXT_REPORT_TIME.PARAM_VALUE);
			
			next_daily_report_hour   = dailyTime.hours.toString();
			next_daily_report_min    = dailyTime.minutes.toString();
			
			lmdDRT = DM.dateTrim(obj.NEXT_REPORT_TIME.LAST_CHG_TIME);
			userDRT = obj.NEXT_REPORT_TIME.LAST_CHG_USER;
			
			last_weekly_report_date  = StringToDate(obj.LAST_WEEKLY_REPORT_DATE.PARAM_VALUE);
			next_weekly_report_date  = StringToDate(obj.NEXT_WEEKLY_REPORT_DATE.PARAM_VALUE);
			//next_weekly_report_hour  = obj.NEXT_WEEKLY_REPORT_HOUR;
			//next_weekly_report_min   = obj.NEXT_WEEKLY_REPORT_MIN;
			
			lmdNWR = DM.dateTrim(obj.NEXT_WEEKLY_REPORT_DATE.LAST_CHG_TIME);
			userNWR = obj.NEXT_WEEKLY_REPORT_DATE.LAST_CHG_USER;
			
			last_monthly_report_date = StringToDate(obj.LAST_MONTHLY_REPORT_DATE.PARAM_VALUE);
			next_monthly_report_date = StringToDate(obj.NEXT_MONTHLY_REPORT_DATE.PARAM_VALUE);
			//next_monthly_report_hour = obj.NEXT_MONTHLY_REPORT_HOUR;
			//next_monthly_report_min  = obj.NEXT_MONTHLY_REPORT_MIN;
			
			lmdNMR = DM.dateTrim(obj.NEXT_MONTHLY_REPORT_DATE.LAST_CHG_TIME);
			userNMR = obj.NEXT_MONTHLY_REPORT_DATE.LAST_CHG_USER;
			
			load_ret_newlds          = obj.SITE_LD_RETN_NEWLDS;
			load_ret_newmov          = obj.SITE_LD_RETNPRD_NEW_MOV;
			load_ret_commov          = obj.SITE_LD_RETNPRD_USED_MOV;
			
			load_ret_period          = obj.SITE_LD_RETNPRD;
			operate_dmy              = StringToDate(obj.OP_DAY_MNTH_YEAR.PARAM_VALUE);
			
			lmdOD  = DM.dateTrim(obj.OP_DAY_MNTH_YEAR.LAST_CHG_TIME);
			userOD = obj.OP_DAY_MNTH_YEAR.LAST_CHG_USER;
			
			
			expire_mons              = obj.SITE_EXP_MONTHS;
			
			manual_close			 = obj.NEXT_MANUAL_CLOSE;
			manual_freeze			 = obj.NEXT_MANUAL_FREEZE_DATETIME;
			
			dispatchEvent(new Event("dataUpdate"));
			
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		public function StringToDate(dateTimeString:String):Date{
			
			var arr:Array = dateTimeString.split(" ");
			var dateString:String = arr[0];
			var year:Number  = Number(dateString.split("-")[0]);
			var month:Number = Number(dateString.split("-")[1]);
			var date:Number  = Number(dateString.split("-")[2]);
			if(arr[1]){
				var hours:Number  = 0;
				var minute:Number = 0
				return new Date(year,(month-1),date,hours,minute);
			}
			return new Date(year,(month-1),date);
		}
		
		public function StringToDateTime(dateTimeString:String):Date{
			
			var arr:Array = dateTimeString.split(" ");
			var dateString:String = arr[0];
			var year:Number  = Number(dateString.split("-")[0]);
			var month:Number = Number(dateString.split("-")[1]);
			var date:Number  = Number(dateString.split("-")[2]);
			if(arr[1]){
				var timeString:String = dateTimeString.split(" ")[1];
				var hours:Number = Number(timeString.split(":")[0]);
				var minute:Number = Number(timeString.split(":")[1]);
				return new Date(year,(month-1),date,hours,minute);
			}
			return new Date(year,(month-1),date);
		}
	}	
}