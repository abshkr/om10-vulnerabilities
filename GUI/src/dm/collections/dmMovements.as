package dm.collections
{

	import dm.models.dmMovement;
	import dm.utils.tools;
	
	import flash.events.IEventDispatcher;
	import flash.net.FileReference;
	
	import mx.collections.ArrayCollection;
	import mx.resources.ResourceManager;
	import mx.utils.ObjectUtil;
	
	import spark.formatters.DateTimeFormatter;
	
	public class dmMovements extends dmPagedCollection implements IEventDispatcher //dmCollection 
	{
		public var dmClass:String = "dmMovements";
		public var model:dmMovement;
		[Bindable] public var siteSettings:ArrayCollection=new ArrayCollection();
		[Bindable] public var terminals:ArrayCollection=new ArrayCollection();
		[Bindable] public var suppliers:ArrayCollection=new ArrayCollection();
		[Bindable] public var carriers:ArrayCollection=new ArrayCollection();
		[Bindable] public var vehicles:ArrayCollection=new ArrayCollection();
		[Bindable] public var operators:ArrayCollection=new ArrayCollection();
		[Bindable] public var movItemTypes:ArrayCollection=new ArrayCollection();
		[Bindable] public var movSources:ArrayCollection=new ArrayCollection();
		[Bindable] public var movSourcesAll:ArrayCollection=new ArrayCollection();
		[Bindable] public var movStatus:ArrayCollection=new ArrayCollection();
		
		// lists for movement items:
		[Bindable] public var prodUnits:ArrayCollection=new ArrayCollection();
		[Bindable] public var plants:ArrayCollection=new ArrayCollection();
		[Bindable] public var drawers:ArrayCollection=new ArrayCollection();
		[Bindable] public var products:ArrayCollection=new ArrayCollection();
		[Bindable] public var tanks:ArrayCollection=new ArrayCollection();
		[Bindable] public var ratios:ArrayCollection=new ArrayCollection();

		[Bindable] public var plantsFrom:ArrayCollection=new ArrayCollection();
		[Bindable] public var suppliersFrom:ArrayCollection=new ArrayCollection();
		[Bindable] public var drawersFrom:ArrayCollection=new ArrayCollection();
		[Bindable] public var productsFrom:ArrayCollection=new ArrayCollection();
		[Bindable] public var tanksFrom:ArrayCollection=new ArrayCollection();
		[Bindable] public var plantsTo:ArrayCollection=new ArrayCollection();
		[Bindable] public var suppliersTo:ArrayCollection=new ArrayCollection();
		[Bindable] public var drawersTo:ArrayCollection=new ArrayCollection();
		[Bindable] public var productsTo:ArrayCollection=new ArrayCollection();
		[Bindable] public var tanksTo:ArrayCollection=new ArrayCollection();
		
		//public var needFetchLists:Boolean;
		public var cbfunc:Function=null;
		
		
		[Bindable] public var csv:String ="";
		[Bindable] public var csvReady:Boolean = false;;
		
		private var f:FileReference = new FileReference();		
		private var dateConvert:DateTimeFormatter=new DateTimeFormatter();
		
		public var asynServiceCall:Boolean=false;
		
		
		public function dmMovements( params:* = false)
		{ 
			super(params);
		}
		
		override public function reload():void
		{
			populate();
		}
		
		override public function populate( params:* = false ):void
		{
			tools.pr( params );
			//set the service arguments.
			super.setServiceArgs(params);
			tools.pr( serviceArgs );
			tools.pr( serviceArgs.filter );
			tools.pr( serviceArgs.range );

			//needFetchLists 	= tools.getObjAttribute( params, "needFetchLists", true );
			
			//fire off the service request.
			Server.service('dmMovements.getInstance', serviceArgs, populateSource);
		}
		
		
		public function prepareCSV(filters:Object = null):void
		{
			csvReady = false;
			
			var terminal:String	= "%%";
			var source:String	= "%";
			var status:String	= "%";
			var type:String		= "%";
			var key:String		= "%%";
			var number:String	= "%%";
			var sdt:Date	= null;
			var edt:Date	= null;
			
			if(filters!=null)
			{
				if(filters.hasOwnProperty("terminal"))	terminal	= filters.terminal;
				if(filters.hasOwnProperty("source"))	source 		= filters.source;
				if(filters.hasOwnProperty("status"))	status 		= filters.status;
				if(filters.hasOwnProperty("type"))		type 		= filters.type;
				if(filters.hasOwnProperty("key"))		key		 	= filters.key;
				if(filters.hasOwnProperty("number"))	number 		= filters.number;
				if(filters.hasOwnProperty("sdt"))		sdt 		= filters.sdt;
				if(filters.hasOwnProperty("edt"))		edt 		= filters.edt;
			}
			
			var columns:Array = new Array();
/*			columns.push({column:"MV_ID", 			    	header:"ID"});
			columns.push({column:"MV_TERMINAL", 			header:"Terminal"});
			columns.push({column:"MV_KEY", 		        	header:"Nomination Key"});
			columns.push({column:"MV_NUMBER", 		    	header:"Nomination Number"});
			columns.push({column:"MV_SRCTYPE", 		    	header:"Nomination Source"});
			columns.push({column:"MV_STATUS",           	header:"Nomination Status"});
			//columns.push({column:"MV_DTIM_EFFECT", 	    	header:"Effective From", 			dateFormat:"DD/MM/YYYY HH24:MI:SS"});
			//columns.push({column:"MV_DTIM_EXPIRY", 	    	header:"Expired After", 			dateFormat:"DD/MM/YYYY HH24:MI:SS"});
			//columns.push({column:"MV_DTIM_CREATE", 	    	header:"Created On", 				dateFormat:"DD/MM/YYYY HH24:MI:SS"});
			columns.push({column:"MV_DTIM_EFFECT", 	    	header:"Effective From", 			dateFormat:"DD/MM/YYYY"});
			columns.push({column:"MV_DTIM_EXPIRY", 	    	header:"Expired After", 			dateFormat:"DD/MM/YYYY"});
			columns.push({column:"MV_DTIM_CREATE", 	    	header:"Created On", 				dateFormat:"DD/MM/YYYY"});
			columns.push({column:"MV_DTIM_CHANGE", 	    	header:"Last Modified On", 			dateFormat:"DD/MM/YYYY HH24:MI:SS"});
			columns.push({column:"MV_OPER_CHANGE",        	header:"Last Modified By"});
*/			
			
			var dateRange:Array = new Array();
			if ( sdt != null && edt != null )
			{
				dateRange.push({column:"MV_DTIM_CREATE", start:dateConvert.format(sdt), end:dateConvert.format(edt)});
			}
			else
			{
				if ( sdt != null && edt == null )
				{
					dateRange.push({column:"MV_DTIM_CREATE", start:dateConvert.format(sdt)});
				}
				else if ( sdt == null && edt != null )
				{
					dateRange.push({column:"MV_DTIM_CREATE", end:dateConvert.format(edt)});
				}
				else
				{
					;
				}
			}
			
			delete filters.sdt;
			delete filters.edt;
			
			var statusLookup:Object = new Object();
			for (var i:int = 0; i < this.movStatus.length; i++){
				//statusLookup[this.movStatus[i].MOVSTATUS_TYPE_ID] = this.movStatus[i].MOVSTATUS_TYPE_NAME;
				statusLookup[i] = this.movStatus[i];
			}
			var sourceLookup:Object = new Object();
			for (var i:int = 0; i < this.movSourcesAll.length; i++){
				//sourceLookup[this.movSourcesAll[i].MOVSOURCE_TYPE_ID] = this.movSourcesAll[i].MOVSOURCE_TYPE_NAME;
				sourceLookup[i] = this.movSourcesAll[i];
			}
			var terminalLookup:Object = new Object();
			for (var i:int = 0; i < this.terminals.length; i++){
				terminalLookup[this.terminals[i].TERM_CODE] = this.terminals[i].TERM_NAME;
			}
			var operLookup:Object = new Object();
			for (var i:int = 0; i < this.operators.length; i++){
				operLookup[this.operators[i].PER_CODE] = this.operators[i].PER_NAME;
			}
			var lookup:Object = new Object();
			lookup.MV_TERMINAL = terminalLookup;
			lookup.MV_SRCTYPE 	= sourceLookup;
			lookup.MV_STATUS 	= statusLookup;
			lookup.MV_OPER_CHANGE 	= operLookup;
			
			columns.push({column:"MV_ID", 			    	header:mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MV_ID')});
			columns.push({column:"MV_TERMINAL", 			header:mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MV_TERMINAL')});
			columns.push({column:"MV_KEY", 		        	header:mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MV_KEY')});
			columns.push({column:"MV_NUMBER", 		    	header:mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MV_NUMBER')});
			columns.push({column:"MV_SRCTYPE", 		    	header:mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MV_SRCTYPE')});
			columns.push({column:"MV_STATUS",           	header:mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MV_STATUS')});
			//columns.push({column:"MV_DTIM_EFFECT", 	    	header:mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MV_DTIM_EFFECT'), 			dateFormat:"DD/MM/YYYY HH24:MI:SS"});
			//columns.push({column:"MV_DTIM_EXPIRY", 	    	header:mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MV_DTIM_EXPIRY'), 			dateFormat:"DD/MM/YYYY HH24:MI:SS"});
			//columns.push({column:"MV_DTIM_CREATE", 	    	header:mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MV_DTIM_CREATE'), 				dateFormat:"DD/MM/YYYY HH24:MI:SS"});
			columns.push({column:"MV_DTIM_EFFECT", 	    	header:mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MV_DTIM_EFFECT'), 			dateFormat:"DD/MM/YYYY"});
			columns.push({column:"MV_DTIM_EXPIRY", 	    	header:mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MV_DTIM_EXPIRY'), 			dateFormat:"DD/MM/YYYY"});
			columns.push({column:"MV_DTIM_CREATE", 	    	header:mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MV_DTIM_CREATE'), 				dateFormat:"DD/MM/YYYY"});
			columns.push({column:"MV_DTIM_CHANGE", 	    	header:mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MV_DTIM_CHANGE2'), 			dateFormat:"DD/MM/YYYY HH24:MI:SS"});
			columns.push({column:"MV_OPER_CHANGE",        	header:mx.resources.ResourceManager.getInstance().getString('default','MOVNOM.LABEL.MV_OPER_CHANGE2')});
			
			var params:Object = {
				table		: 	"MOVEMENTS",
				columns		:   columns,
				dateRange	:	dateRange,
				lookup		:	lookup,
				//lookupTable	:	{	MV_ID	:	{	TABLE : "MOVEMENT_ITEMS", SOURCE: "MVITM_MOVE_ID", DESTINATION:"MVITM_TYPE"	}},
				filters		:	filters,
				sort		:	"MV_ID DESC"				
			};
			Server.service('dmsCSV.exportCSV', params, function(o:Object):void{
				csv = o.data;
				csvReady = true;
			});
			
		}
		
		override protected function populateSource( response : * ):void
		{
/*			if ( needFetchLists == false )
			{
				super.populateSource(response);
				return;
			}
*/			
			trace( "=====================", "Here I am in the dmMovements.populateSource");
			
			if ( (this.requestMode&0x02) == 2 )
			{
				if ( this.asynServiceCall == false )
				{
					siteSettings    = new ArrayCollection(response.rawData.siteSettings);
					terminals    = new ArrayCollection(response.rawData.terminals);
					suppliers    = new ArrayCollection(response.rawData.suppliers);
					carriers     = new ArrayCollection(response.rawData.carriers);
					vehicles     = new ArrayCollection(response.rawData.vehicles);
					operators    = new ArrayCollection(response.rawData.operators);
					movItemTypes = new ArrayCollection(response.rawData.movItemTypes);
					movSources   = new ArrayCollection(response.rawData.movSources);
					movSourcesAll   = new ArrayCollection(response.rawData.movSources);
					movStatus    = new ArrayCollection(response.rawData.movStatus);
					
					for each(var o:Object in terminals)
					{
						o.CODE_NAME = o.TERM_CODE + " - " + o.TERM_NAME;
					}
					for each(var o:Object in suppliers)
					{
						o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
					}
					for each(var o:Object in carriers)
					{
						o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
					}
					for each(var o:Object in vehicles)
					{
						//o.CODE_NAME = o.TNKR_CODE + " - " + o.TNKR_NAME;
						o.CODE_NAME = o.TNKR_CODE;
					}
					for each(var o:Object in operators)
					{
						o.CODE_NAME = o.PER_CODE + " - " + o.PER_NAME;
					}
					
					// lists for movement items:
					prodUnits    = new ArrayCollection(response.rawData.prodUnits);
					plants       = new ArrayCollection(response.rawData.plants);
					drawers      = new ArrayCollection(response.rawData.drawers);
					products     = new ArrayCollection(response.rawData.products);
					tanks        = new ArrayCollection(response.rawData.tanks);
					ratios       = new ArrayCollection(response.rawData.ratios);
					
					for each(var o:Object in prodUnits)
					{
						//o.CODE_NAME = o.UNIT_ID + " - " + o.DESCRIPTION;
						o.CODE_NAME = o.DESCRIPTION;
					}
					
					for each(var o:Object in plants)
					{
						//o.CODE_NAME = o.TERM_CODE + " - " + o.TERM_NAME;
						o.CODE_NAME = o.TERM_CODE;
					}
					
					for each(var o:Object in drawers)
					{
						o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
					}
					
					for each(var o:Object in products)
					{
						o.CODE_NAME = o.PROD_CODE + " - " + o.PROD_NAME;
					}
					
					for each(var o:Object in tanks)
					{
						//o.CODE_NAME = o.TANK_CODE + " - " + o.TANK_NAME;
						o.CODE_NAME = o.TANK_CODE;
					}
					
					plantsFrom = new ArrayCollection(plants.source);
					suppliersFrom = new ArrayCollection(suppliers.source);
					drawersFrom = new ArrayCollection(drawers.source);
					productsFrom = new ArrayCollection(products.source);
					tanksFrom = new ArrayCollection(tanks.source);
					plantsTo = new ArrayCollection(plants.source);
					suppliersTo = new ArrayCollection(suppliers.source);
					drawersTo = new ArrayCollection(drawers.source);
					productsTo = new ArrayCollection(products.source);
					tanksTo = new ArrayCollection(tanks.source);
				}

				if ( cbfunc != null ) 
				{
					cbfunc();
					cbfunc = null;
				}
			}
			
			if ( (this.requestMode&0x01) == 1 )
			{
				super.populateSource(response);
			}
			
			//prepareCSV();
		}
		
	}
	
}