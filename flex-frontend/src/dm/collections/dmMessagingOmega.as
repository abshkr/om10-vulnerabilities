package dm.collections
{
	import dm.models.dmMessagingOut;
	import dm.utils.*;
	import spark.collections.Sort;
	import mx.collections.ArrayCollection;
	import spark.formatters.DateTimeFormatter;
	public class dmMessagingOmega extends dmCollection{
		
		public var dmClass:String = "dmMessagingOmega";
		public var dmData:ArrayCollection;
		
		
		
		public var std:Date;
		public var etd:Date;

		[Bindable] public var hostMessages:ArrayCollection;
		[Bindable] public var omegaMessages:ArrayCollection;
		[Bindable] public var outgoingTypes:ArrayCollection	= new ArrayCollection();
		[Bindable] public var plantCodes:ArrayCollection 	= new ArrayCollection();
		
		public var model:dmMessagingOut;
		
		public function dmMessagingOmega( params:* = false )
		{
			super(params);
		}
		
		override public function populate( params:* = false ):void
		{
			super.setServiceArgs(params);	
			Server.service('dmsMessagingService.getOmegaMessages', serviceArgs, populateSource);
			var dateConvert:DateTimeFormatter=new DateTimeFormatter();
			
			dateConvert.dateTimePattern="yyyy-MM-dd HH:mm:ss";
			
			if(etd == null){		
				etd = new Date();
				etd.date++;
				etd.hours        = 0;
				etd.minutes      = 0;
				etd.seconds      = 0;
				etd.milliseconds = 0;
				etd.milliseconds--;
			}	
			if(std == null){
				std = new Date();
				std.date-=7;
				std.hours        = 0;
				std.minutes      = 0;
				std.seconds      = 0;
				std.milliseconds = 0;
			}
			
		}
		
		override protected function populateSource(response: *):void
		{
			super.populateSource(response);
			outgoingTypes = new ArrayCollection();
			plantCodes 	  = new ArrayCollection();
			
			for each(var dmo:dmMessagingOut in response.data.collection) {
				if(outgoingTypes.getItemIndex(dmo.OM_MSG_TYPE) == -1){
					outgoingTypes.addItem(dmo.OM_MSG_TYPE);
				}
				
				if(plantCodes.getItemIndex(dmo.HST_COMP_CODE) == -1){
					plantCodes.addItem(dmo.HST_COMP_CODE);
				}
			}
			
			
		}
		
		
		public function getomegaFile(value:String, callback:Function): void
		{
			Server.service('dmsMessagingService.getMessageFile',value, callback) 
			
		}
		
	}
}