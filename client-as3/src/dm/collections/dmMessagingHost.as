package dm.collections
{
	import dm.DM;
	import dm.models.dmMessagingIn;
	import dm.utils.*;
	
	import mx.collections.ArrayCollection;
	import mx.utils.ObjectUtil;
	
	import spark.collections.Sort;
	import spark.collections.SortField;
	import spark.formatters.DateTimeFormatter;
	
	public class dmMessagingHost extends dmCollection
	{	
		public var dmClass:String = "dmMessagingHost";
		public var model:dmMessagingIn;
		private var finishedAllPages:Boolean 	=  true;
		private var currentPage:Number = 1;
		private var interruptor:Boolean 		=  false;
		[Bindable] public var incomingTypes:ArrayCollection	= new ArrayCollection();
		[Bindable] public var plantCodes:ArrayCollection 	= new ArrayCollection();
		[Bindable] public var omegaStatus:ArrayCollection 	= new ArrayCollection();
		[Bindable] public var TotalRecords:Number;
		[Bindable] public var nextID:Number;
		[Bindable] public var totalCount:Number;
		
		
		[Bindable] public var bytesTotal:Number = 0;
		[Bindable] public var bytesLoaded:Number = 0;
		
		[Bindable] public var populateCallback:Function = null;
		
		public var sd:Date;
		public var ed:Date;

		public function dmMessagingHost( params:* = false )
		{
			super(params);
		}
		override public function reload():void{
			populate();
		}
		
		
		
		
		public function copyOutMessage (whichFile:String = "", callback:Function=null ): void
		{
			var payload:Object = {whichFile: whichFile};
			
			Server.service('dmsMessagingService.copyOutMessage', payload, function(o:Object):void
			{
				if(callback)callback(o);
				if (o.data == "FAILED TO GENERATE FILE.")
					global.msgFail(o.data)
				else	
					global.msgSuccess(o.data);
			});
		}
		override public function populate( params:* = false ):void
		{
			super.setServiceArgs(params);
			
			params = new Object();
						
			Server.service('dmsMessagingService.getHostMessages',  serviceArgs, populateSource);
			
		}
		
		
		
		
		
		
		
		
		
		override protected function populateSource( response : * ):void
		{
			
			super.populateSource(response);
			
			
			/// somehow lets pull plant code data
			incomingTypes = new ArrayCollection();
			plantCodes 	  = new ArrayCollection();
			omegaStatus   = new ArrayCollection();
			nextID			 = Number(response.rawData.nextID);
			
			bytesTotal 		 = 1000000;
			totalCount 		 = Number(response.rawData.count);
			for each(var dmi:dmMessagingIn in response.data.collection) {
				if(incomingTypes.getItemIndex(dmi.HST_MSG_TYPE) == -1){
					incomingTypes.addItem(dmi.HST_MSG_TYPE);
				}
				if(plantCodes.getItemIndex(dmi.HST_PLANT_CODE) == -1){
					plantCodes.addItem(dmi.HST_PLANT_CODE);
				}
				if(omegaStatus.getItemIndex(dmi.OM_STATUS) == -1){
					omegaStatus.addItem(dmi.OM_STATUS);
				}
				//MsgType = new ArrayCollection();
			}
			currentPage = 1;
			var s:Sort = new Sort();
			incomingTypes.sort 	= s; incomingTypes.refresh();
			plantCodes.sort 	= s; plantCodes.refresh();
			omegaStatus.sort 	= s; omegaStatus.refresh();
			this.refresh();
			bytesLoaded = list.length/totalCount*bytesTotal-1;
			trace(totalCount);
			if(finishedAllPages){
				finishedAllPages = false;
				loadNextPage();
			}else{
				finishedAllPages = false;
				interruptor = true;
			}
		}
		
		
		
		public function loadNextPage():void{
			
			currentPage++;
			serviceArgs.range.currentPage = currentPage;
			Server.service('dmMessagingHost.getPaged', serviceArgs, streamLinePage,false, true);
			
			
			//DM.gateway.call('dmSpecialMovements.getPaged', new Responder(streamLinePage), serviceArgs);
		}
		
		public function streamLinePage(params:*  ):void{
			if(interruptor){
				interruptor = false;
			}else{
				for each(var s:Object in params.data.collection){
					super.source[s.payload.RN-1] = s;
				}
				refresh();
				bytesLoaded = list.length/totalCount*bytesTotal-1;
			}
			if(list.length < totalCount){
				trace(totalCount);
				loadNextPage();
			}else{
				finishedAllPages = true;
			}
		}
		
		public function getFile(value:String, callback:Function): void
		{
			Server.service('dmsMessagingService.getHostMessage',value, callback) 
			
		}
		public function resubmit():void
		{
			Server.invoke(this, 'resubmitMessage', retProc);
		}
		
		public function gettotalInrecords(params:*=false):void{
			super.setServiceArgs(params);
			Server.service('dmMessagingService.gettotalInrecords',serviceArgs, retotalInrecords)
			
		}
		
		/*
		public function getHostTypes(params:*=false): void
		{
		super.setServiceArgs(params);	
		Server.service('dmsMessagingService.getHostMsgTypes',serviceArgs, retHostTypes);
		}
		
		public function getOmegaTypes(params:*=false): void
		{
		super.setServiceArgs(params);	
		Server.service('dmsMessagingService.getOmegaMsgTypes',serviceArgs, retOmegaTypes);
		}
		
		
		public function getPlantCodes(params:*=false): void
		{
		super.setServiceArgs(params);	
		Server.service('dmsMessagingService.getPlantCodeTypes',serviceArgs, retPlantCodes);
		}
		
		public function getHostOmegaStatus(params:*=false): void
		{
		super.setServiceArgs(params);	
		Server.service('dmsMessagingService.getOmegaStatusTypes',serviceArgs, retHostOmegaStatus);
		}
		*/
		private function retProc(response:*): void
		{
			trace(response);
		}
		/*
		private function retHostTypes(response:*): void
		{
		for(var i:int=0; i < response.data.length; i++)
		hostMsgs.addItem(response.data[i]);
		}
		*/
		/*private function retOmegaTypes(response:*): void
		{
		for(var i:int=0; i < response.data.length; i++)
		if(response.data[i]!=null)
		omegaMsgs.addItem(response.data[i]);
		}*/
		/*
		private function retPlantCodes(response:*): void
		{
		for(var i:int=0; i < response.data.length; i++)
		if(response.data[i]!=null)
		plantCodes.addItem(response.data[i]);
		
		}
		private function retHostOmegaStatus(response:*): void
		{
		for(var i:int=0; i < response.data.length; i++)
		if(response.data[i]!=null)
		omegaStatus.addItem(response.data[i]);
		trace("Omega Status ====>",ObjectUtil.toString(response.data));
		}
		*/
		
		private function retotalInrecords(response:*): void
		{
			totalCount 		 =Number(response.rawData.count);
			response = totalCount;
			trace("Total Incoming Records====>",ObjectUtil.toString(response.data));
		}
		
	}
}