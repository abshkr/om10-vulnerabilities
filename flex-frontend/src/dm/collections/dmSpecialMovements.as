package dm.collections
{
	
	import dm.DM;
	import dm.models.dmSpecialMovement;
	import dm.utils.*;
	
	import flash.events.Event;
	import flash.events.IEventDispatcher;
	import flash.net.FileReference;
	import flash.net.Responder;
	
	import mx.collections.ArrayCollection;
	import mx.resources.ResourceManager;
	import mx.utils.ObjectUtil;
	
	import spark.collections.Sort;
	import spark.collections.SortField;
	import spark.formatters.DateTimeFormatter;
	
	public class dmSpecialMovements extends dmCollection implements IEventDispatcher{
		
		public var dmClass:String = "dmSpecialMovements";
		public var dmData:ArrayCollection;
		public var model:dmSpecialMovement;
		
		public var std:Date;
		public var etd:Date;
		
		private var currentPage:Number = 1;
		
		private var finishedAllPages:Boolean 	=  true;
		private var interruptor:Boolean 		=  false;
		
		
		[Bindable] public var bytesTotal:Number = 0;
		[Bindable] public var bytesLoaded:Number = 0;
		
		
		[Bindable] public var types:ArrayCollection;
		[Bindable] public var status:ArrayCollection;
		[Bindable] public var temperatureUnits:ArrayCollection;
		[Bindable] public var volumeUnitsAmb:ArrayCollection;
		[Bindable] public var volumeUnitsCor:ArrayCollection;
		[Bindable] public var densityAmb:ArrayCollection;
		[Bindable] public var densityCor:ArrayCollection;
		[Bindable] public var terminalData:ArrayCollection;
		[Bindable] public var armData:ArrayCollection;
		[Bindable] public var tankerData:ArrayCollection;
		[Bindable] public var folios:ArrayCollection;
		[Bindable] public var plantCodes:ArrayCollection;
		[Bindable] public var suppliers:ArrayCollection=new ArrayCollection();
		[Bindable] public var movnums:ArrayCollection;
		[Bindable] public var nextID:Number;
		[Bindable] public var totalCount:Number;
		
		[Bindable] public var movementReasons:dmMovementReasons = new dmMovementReasons();
		[Bindable] public var movementReasonsSEL:dmMovementReasons = new dmMovementReasons();
		
		[Bindable] public var populateCallback:Function = null;
		
		
		[Bindable] public var csv:String ="";
		[Bindable] public var csvReady:Boolean = false;;
		
		private var f:FileReference = new FileReference();		
		private var dateConvert:DateTimeFormatter=new DateTimeFormatter();
		
		
		
		public function dmSpecialMovements( params:* = false ){
			
			dateConvert.dateTimePattern="yyyy-MM-dd HH:mm:ss";
			
			super(params);
		}
		override public function reload():void{
			populate();
		}
		
		public function processManualMovement(f:Function = null, params:Object = null):void{
			Server.service("dmSpecialMovements.processManualMovement", params,
				function(resp:Object):void{
					if(f)f(resp);
				}
			);
		}
		
		
		public function processSpecialMovement(f:Function = null, mov_num:int = 1):void{
			Server.service("dmSpecialMovements.processSpecialMovement", mov_num, 
				function(resp:Object):void{
					if(f)f(resp);
				}
			);
		}
		
		public function reverseSpecialMovement(f:Function = null, mov_num:int = 1):void{
			Server.service("dmSpecialMovements.reverseSpecialMovement", mov_num, 
				function(resp:Object):void{
					if(f)f(resp);
				}
			);
		}
		
		
		public function getBases(f:Function = null, drawerCode:String = "", ammount:int = 1):void{
			Server.service("dmSpecialMovements.getBases", drawerCode, 
				function(resp:Object):void{
					if(f)f(resp);
				}
			);
		}
		
		public function reloadReasonCodes():void{
			if(movementReasons)movementReasons.populate();
			if(movementReasonsSEL)movementReasonsSEL.populate();
		}
		
		override public function populate( params:* = false):void{
	
			params = new Object();
			
				
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
				
			
			params.range = {
				startRange:dateConvert.format(std),
				endRange:dateConvert.format(etd)
			}
			//set the service arguments.
			super.setServiceArgs(params);
			
			//fire off the service request.
			Server.service('dmSpecialMovements.getInstance', serviceArgs, function(o:Object):void{
				if(populateCallback!=null)populateCallback(o);
				populateCallback = null;
				populateSource(o);
			});
			reloadReasonCodes();
			
		}
		
		
		public function prepareCSV(filters:Object = null):void{
			csvReady = false;
			
			var status:String		= "%%";
			var type:String			= "%%";
			var reasoncode:String	= "%%";
			var movNumber:String	= "%";
			
			if(filters!=null){
				if(filters.hasOwnProperty("status"))	status 		= filters.status;
				if(filters.hasOwnProperty("type"))		type 		= filters.type;
				if(filters.hasOwnProperty("reasoncode"))reasoncode 	= filters.reasoncode;
				if(filters.hasOwnProperty("movNumber"))	movNumber 	= filters.movNumber;
			}
			
			
			var columns:Array = new Array();
			columns.push({column:"MLITM_ID", 			header:mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.LABEL.MV_NUM')});
			columns.push({column:"MLITM_MOV_KEY", 		header:mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.LABEL.MV_KEY')});
			columns.push({column:"MLITM_DTIM_START", 	header:mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.LABEL.MV_DATETIME'), 		dateFormat:"DD/MM/YYYY HH24:MI:SS"});
			columns.push({column:"MLITM_TYPE", 			header:mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.LABEL.MV_TYPE')});
			columns.push({column:"MLITM_REASON_CODE", 	header:mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.LABEL.MV_REASON')});
			columns.push({column:"MLITM_STATUS", 		header:mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.LABEL.MV_STATUS')});
			columns.push({column:"MLITM_DTIM_POSTED", 	header:mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.LABEL.MV_DT_LAST'), dateFormat:"DD/MM/YYYY HH24:MI:SS"});
			columns.push({column:"MLITM_OPER_POSTED", 	header:mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.LABEL.MV_USER_LAST')});
			
			var dateRange:Array = new Array();
			dateRange.push({column:"MLITM_DTIM_START", start:dateConvert.format(std), end:dateConvert.format(etd)});
			
			
			var statusLookup:Object = new Object();
			for (var i:int = 0; i < this.status.length; i++){
				statusLookup[this.status[i].ID] = this.status[i].Name;
			}
			var typeLookup:Object = new Object();
			for (i = 0; i < this.types.length; i++){
				typeLookup[this.types[i].MOVITEM_TYPE_ID] = this.types[i].MOVITEM_TYPE_NAME;
				//typeLookup[i] = this.types[i];
			}
			var lookup:Object = new Object();
			lookup.MLITM_STATUS = statusLookup;
			lookup.MLITM_TYPE 	= typeLookup;
			
			
			
			var params:Object = {
				table		: 	"MOV_LOAD_ITEMS",
				columns		:   columns,
				dateRange	:	dateRange,
				lookup		:	lookup,
				lookupTable	:	{	MLITM_REASON_CODE	:	{	TABLE : "MOV_REASONS", SOURCE: "MR_ID", DESTINATION:"MR_ACTION"	}},
				filters		:	{	MLITM_TYPE			: 	type,
									MLITM_STATUS		: 	status,
									MLITM_REASON_CODE	: 	reasoncode,
									MLITM_ID			: 	movNumber+"%"},
				sort		:	"MLITM_ID DESC"				
			};
			Server.service('dmsCSV.exportCSV', params, function(o:Object):void{
				csv = o.data;
				csvReady = true;
			});
			
		}
		
		override protected function populateSource( params:*  ):void{
			types 			 = new ArrayCollection(params.rawData.types);
			status 			 = new ArrayCollection(params.rawData.status);
			temperatureUnits = new ArrayCollection(params.rawData.temperatureUnits)
			volumeUnitsAmb   = new ArrayCollection(params.rawData.volumeUnitsAmb);
			volumeUnitsCor   = new ArrayCollection(params.rawData.volumeUnitsCor);
			densityAmb       = new ArrayCollection(params.rawData.densityAmb);
			densityCor       = new ArrayCollection(params.rawData.densityCor);
			terminalData     = new ArrayCollection(params.rawData.terminalData);
			armData		     = new ArrayCollection(params.rawData.armData);
			folios			 = new ArrayCollection(params.rawData.folios);
			plantCodes	     = new ArrayCollection(params.rawData.plantCodes);
			suppliers		 = new ArrayCollection(params.rawData.suppliers);
			tankerData		 = new ArrayCollection(params.rawData.tankerData);
			nextID			 = Number(params.rawData.nextID);
			bytesTotal 		 = 1000000;
			totalCount 		 = Number(params.rawData.count);
			
			// prepare status with multilingual contents
			status = new ArrayCollection();
			status.addItem( { ID:0, CODE:'E', Name:mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.OPTION.SPM_STATUS.ENTERING') } );
			status.addItem( { ID:5, CODE:'C', Name:mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.OPTION.SPM_STATUS.COMPLETED') } );
			status.addItem( { ID:9, CODE:'R', Name:mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.OPTION.SPM_STATUS.REVERSED') } );

			for(var i:int = 0 ; i < folios.length; i++){
				if(folios[i].fromDate){
					var fromYear:int   = folios[i].fromDate.split(" ")[0].split("-")[0];
					var fromMonth:int  = folios[i].fromDate.split(" ")[0].split("-")[1];
					var fromDate:int   = folios[i].fromDate.split(" ")[0].split("-")[2];
					var fromMinute:int = folios[i].fromDate.split(" ")[1].split(":")[0];
					var fromSecond:int = folios[i].fromDate.split(" ")[1].split(":")[1];
					folios[i].fromDate = new Date(fromYear,fromMonth-1,fromDate,fromMinute,fromSecond);
				}else{
					
					folios[i].fromDate = new Date();
				}
				if(folios[i].toDate){
					var toYear:int     = folios[i].toDate.split(" ")[0].split("-")[0];
					var toMonth:int    = folios[i].toDate.split(" ")[0].split("-")[1];
					var toDate:int     = folios[i].toDate.split(" ")[0].split("-")[2];
					var toMinute:int   = folios[i].toDate.split(" ")[1].split(":")[0];
					var toSecond:int   = folios[i].toDate.split(" ")[1].split(":")[1];
					folios[i].toDate = new Date(toYear,toMonth-1,toDate,toMinute,toSecond);
				}else{
					folios[i].toDate = new Date();
				
				}				
				
			}
			
			super.source = new Array();
			currentPage = 1;
			
			//super.populateSource(params);
			for each(var s:Object in params.data.collection){
				super.source[s.payload.RN-1] = s;
			}
			
			
			
			// sort data by ID
			/*var dataSortField:SortField = new SortField();
			dataSortField.name    		= "movementNumber";
			dataSortField.numeric 		= true;
			var numericDataSort:Sort 	= new Sort();
			numericDataSort.fields 		= [dataSortField];
			numericDataSort.reverse();
			sort 						= numericDataSort;
			*/
			refresh();
			//updateMovNums();
			bytesLoaded = list.length/totalCount*bytesTotal-1;
			
			if(finishedAllPages){
				finishedAllPages = false;
				loadNextPage();
			}else{
				finishedAllPages = false;
				interruptor = true;
			}
			
			prepareCSV();
		}		
		
			
		
		
		
		
		public function loadNextPage():void{
			
			currentPage++;
			serviceArgs.range.currentPage = currentPage;
			Server.service('dmSpecialMovements.getPaged', serviceArgs, streamLinePage,false, true);
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
				loadNextPage();
			}else{
				finishedAllPages = true;
			}
		}
		
		
		public function updateMovNums():void{
			movnums = new ArrayCollection();
			for each(var dmsm:dmSpecialMovement in this){
				movnums.addItem(dmsm.movementNumber);
			}
			
		}
	}
}