package dm.collections
{
	
	import dm.models.dmMovementSchedule;
	import dm.utils.tools;
	
	import mx.collections.ArrayCollection;
	import mx.utils.ObjectUtil;
	
	import flash.events.IEventDispatcher;
	
	public class dmMovementSchedules extends dmPagedCollection implements IEventDispatcher //dmCollection 
	{
		public var dmClass:String = "dmMovementSchedules";
		public var model:dmMovementSchedule;
		[Bindable] public var terminals:ArrayCollection=new ArrayCollection();
		[Bindable] public var suppliers:ArrayCollection=new ArrayCollection();
		[Bindable] public var carriers:ArrayCollection=new ArrayCollection();
		[Bindable] public var vehicles:ArrayCollection=new ArrayCollection();
		[Bindable] public var operators:ArrayCollection=new ArrayCollection();
		[Bindable] public var movItemTypes:ArrayCollection=new ArrayCollection();
		[Bindable] public var movSources:ArrayCollection=new ArrayCollection();
		[Bindable] public var movStatus:ArrayCollection=new ArrayCollection();
		
		// lists for movement items:
		[Bindable] public var prodUnits:ArrayCollection=new ArrayCollection();
//		[Bindable] public var plants:ArrayCollection;
		[Bindable] public var drawers:ArrayCollection=new ArrayCollection();
		[Bindable] public var products:ArrayCollection=new ArrayCollection();
		[Bindable] public var bayarms:ArrayCollection=new ArrayCollection();
		[Bindable] public var tripStatus:ArrayCollection=new ArrayCollection();
		[Bindable] public var trailers:ArrayCollection=new ArrayCollection();
//		[Bindable] public var tanks:ArrayCollection;
//		[Bindable] public var ratios:ArrayCollection;
/*		
		[Bindable] public var plantsFrom:ArrayCollection;
		[Bindable] public var drawersFrom:ArrayCollection;
		[Bindable] public var productsFrom:ArrayCollection;
		[Bindable] public var tanksFrom:ArrayCollection;
		[Bindable] public var plantsTo:ArrayCollection;
		[Bindable] public var drawersTo:ArrayCollection;
		[Bindable] public var productsTo:ArrayCollection;
		[Bindable] public var tanksTo:ArrayCollection;
*/		
		//public var needFetchLists:Boolean;
		
		public var asynServiceCall:Boolean=false;
		
		
		public function dmMovementSchedules( params:* = false)
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
			Server.service('dmMovementSchedules.getInstance', serviceArgs, populateSource);
		}
		
		override protected function populateSource( response : * ):void
		{
			if ( needFetchLists == false )
			{
				super.populateSource(response);
				return;
			}
			
			trace( "=====================", "Here I am in the dmMovementSchedules.populateSource");
			if ( this.asynServiceCall == false )
			{
				terminals    = new ArrayCollection(response.rawData.terminals);
				suppliers    = new ArrayCollection(response.rawData.suppliers);
				carriers     = new ArrayCollection(response.rawData.carriers);
				vehicles     = new ArrayCollection(response.rawData.vehicles);
				operators    = new ArrayCollection(response.rawData.operators);
				movItemTypes = new ArrayCollection(response.rawData.movItemTypes);
				movSources   = new ArrayCollection(response.rawData.movSources);
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
				//plants       = new ArrayCollection(response.rawData.plants);
				drawers      = new ArrayCollection(response.rawData.drawers);
				products     = new ArrayCollection(response.rawData.products);
				//tanks        = new ArrayCollection(response.rawData.tanks);
				//ratios       = new ArrayCollection(response.rawData.ratios);
				bayarms     = new ArrayCollection(response.rawData.bayarms);
				tripStatus    = new ArrayCollection(response.rawData.tripStatus);
				trailers    = new ArrayCollection(response.rawData.trailers);
				
				for each(var o:Object in prodUnits)
				{
					//o.CODE_NAME = o.UNIT_ID + " - " + o.DESCRIPTION;
					o.CODE_NAME = o.DESCRIPTION;
				}
				
				//for each(var o:Object in plants)
				//{
				//	o.CODE_NAME = o.TERM_CODE + " - " + o.TERM_NAME;
				//}
				
				for each(var o:Object in drawers)
				{
					o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
				}
				
				for each(var o:Object in products)
				{
					o.CODE_NAME = o.PROD_CODE + " - " + o.PROD_NAME;
				}
				
				for each(var o:Object in bayarms)
				{
					//o.CODE_NAME = o.BAA_CODE + " - " + o.ARM_NAME;
					o.CODE_NAME = o.BAA_CODE;
				}
				
				for each(var o:Object in tripStatus)
				{
					//o.CODE_NAME = o.STATUS_ID + " - " + o.STATUS_CODE + " - " + o.STATUS_TEXT;
					o.CODE_NAME = o.STATUS_TEXT;
				}
				
				for each(var o:Object in trailers)
				{
					o.CODE_NAME = o.EQPT_ID + " - " + o.EQPT_CODE;
				}
				
				//for each(var o:Object in tanks)
				//{
				//	o.CODE_NAME = o.TANK_CODE + " - " + o.TANK_NAME;
				//}
				
				//plantsFrom = new ArrayCollection(plants.source);
				//drawersFrom = new ArrayCollection(drawers.source);
				//productsFrom = new ArrayCollection(products.source);
				//tanksFrom = new ArrayCollection(tanks.source);
				//plantsTo = new ArrayCollection(plants.source);
				//drawersTo = new ArrayCollection(drawers.source);
				//productsTo = new ArrayCollection(products.source);
				//tanksTo = new ArrayCollection(tanks.source);
			}
			
			super.populateSource(response);
		}
		
	}
	
}