package dm.collections
{
	
	import dm.DM;
	import dm.models.dmJournal;
	import dm.utils.*;
	
	import flash.events.Event;
	import flash.events.IEventDispatcher;
	import flash.net.FileReference;
	import flash.net.Responder;
	
	import mx.collections.ArrayCollection;
	import mx.utils.ObjectUtil;
	
	import spark.collections.Sort;
	import spark.collections.SortField;
	import spark.formatters.DateTimeFormatter;
	
	public class dmJournals extends dmCollection implements IEventDispatcher
	{
		public var dmClass:String = "dmJournals";
		public var dmData:ArrayCollection;
		public var model:dmJournal;
		public var std:Date;
		public var etd:Date;

		private var currentPage:Number = 1;
		private var finishedAllPages:Boolean 	=  true;
		private var interruptor:Boolean 		=  false;

		[Bindable] public var bytesTotal:Number = 0;
		[Bindable] public var bytesLoaded:Number = 0;
		[Bindable] public var nextID:Number;
		[Bindable] public var totalCount:Number;
		[Bindable] public var populateCallback:Function = null;
		[Bindable] public var csv:String ="";
		[Bindable] public var csvReady:Boolean = false;;
		
		private var f:FileReference = new FileReference();		
		private var dateConvert:DateTimeFormatter=new DateTimeFormatter();

		public function dmJournal(params:Object = false)
		{
			dateConvert.dateTimePattern="yyyy-MM-dd HH:mm:ss";
			super(params);
		}
		
		override public function reload():void
		{
			populate();
		}
		
		override public function populate( params:* = false):void
		{
			params = new Object();
			if(etd == null)
			{		
				etd = new Date();
				etd.date++;
				etd.hours        = 0;
				etd.minutes      = 0;
				etd.seconds      = 0;
				etd.milliseconds = 0;
				etd.milliseconds--;
			}	
			if(std == null)
			{
				std = new Date();
				std.date-=7;
				std.hours        = 0;
				std.minutes      = 0;
				std.seconds      = 0;
				std.milliseconds = 0;
			}

			params.range = 
			{
				startRange:dateConvert.format(std),
				endRange:dateConvert.format(etd)
			}
			//set the service arguments.
			super.setServiceArgs(params);
			
			//fire off the service request.
			Server.service('dmJournals.getInstance', serviceArgs, function(o:Object):void
			{
				if(populateCallback!=null)populateCallback(o);
				populateCallback = null;
				populateSource(o);
				
			});
		}
		
		override protected function populateSource( response : * ):void
		{
			
			super.populateSource(response);
			nextID			 = Number(response.rawData.nextID);
			bytesTotal 		 = 1000000;
			totalCount 		 = Number(response.rawData.count);
			currentPage = 1;
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
		
		
		
		public function loadNextPage():void
		{
			
			currentPage++;
			serviceArgs.range.currentPage = currentPage;
			Server.service('dmJournals.getPaged', serviceArgs, streamLinePage,false, true);
		}
		
		public function streamLinePage(params:*  ):void
		{
			if(interruptor)
			{
				interruptor = false;
			}
			else
			{
				for each(var s:Object in params.data.collection)
				{
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
	}
}