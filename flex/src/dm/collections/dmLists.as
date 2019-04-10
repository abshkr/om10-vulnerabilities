package dm.collections
{
	import dm.utils.tools;
	import dm.models.dmList;
	
	import mx.collections.ArrayCollection;
	import mx.utils.ObjectUtil;

	public class dmLists extends dmPagedCollection
	{
		public var dmClass:String = "dmLists";
		public var model:dmList;
		
		[Bindable] public var terminals:ArrayCollection;
		[Bindable] public var suppliers:ArrayCollection;
		[Bindable] public var drawers:ArrayCollection;
		[Bindable] public var carriers:ArrayCollection;
		[Bindable] public var customers:ArrayCollection;
		[Bindable] public var employers:ArrayCollection;
		[Bindable] public var issuers:ArrayCollection;
		[Bindable] public var vehicles:ArrayCollection;
		[Bindable] public var trailers:ArrayCollection;
		[Bindable] public var operators:ArrayCollection;
		
		[Bindable] public var products:ArrayCollection;
		[Bindable] public var prodUnits:ArrayCollection;
		[Bindable] public var plants:ArrayCollection;
		[Bindable] public var tanks:ArrayCollection;
		[Bindable] public var bayarms:ArrayCollection;
		[Bindable] public var ratios:ArrayCollection;
		
		[Bindable] public var tripStatus:ArrayCollection;
		[Bindable] public var orderStatus:ArrayCollection;
		[Bindable] public var movItemTypes:ArrayCollection;
		[Bindable] public var movSources:ArrayCollection;
		[Bindable] public var movStatus:ArrayCollection;
		
		public var listOptions:String= "ALL";
		//public var needFetchLists:Boolean;
		public var cbfunc:Function=null;
		
		
		public function dmLists( params:* = false)
		{ 
			listOptions 		= tools.getObjAttribute( params, "listOptions", "" );
			
			super(params);
		}
		
		override protected function setServiceArgs( params:* = false ):void{
			
			trace ( " +++++++++++++++++++++++++++ in dmLists.setServiceArgs BEFORE........"); 
			super.setServiceArgs(params);
			trace ( " +++++++++++++++++++++++++++ in dmLists.setServiceArgs AFTER........"); 
			
			listOptions 	= serviceArgs.listOptions 	= tools.getObjAttribute( params, "listOptions", listOptions );
			trace ( " +++++++++++++++++++++++++++ in dmLists.setServiceArgs >>>" + listOptions + "<<<"); 
			
		}
		
		override public function populate( params:* = false ):void
		{
			params["service"] = "dmLists";
			params["action"] = "getInstance";
			
			trace ( " +++++++++++++++++++++++++++ in dmLists.populate >>>" + (params["service"]+"."+params["action"]) + "<<<"); 
			
			super.populate( params );
		}
		
		
		override protected function populateSource( response : * ):void
		{
			var options:Array;
			
			options = this.listOptions.split( "|" );
			
			for each(var opt:String in options)
			{
				if ( opt == "ALL" || opt == "TERMINALS" )
				{
					terminals    = new ArrayCollection(response.rawData.terminals);
					for each(var o:Object in terminals)
					{
						o.CODE_NAME = o.TERM_CODE + " - " + o.TERM_NAME;
					}
				}
				if ( opt == "ALL" || opt == "SUPPLIERS" )
				{
					suppliers    = new ArrayCollection(response.rawData.suppliers);
					for each(var o:Object in suppliers)
					{
						o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
					}
				}
				if ( opt == "ALL" || opt == "DRAWERS" )
				{
					drawers      = new ArrayCollection(response.rawData.drawers);
					for each(var o:Object in drawers)
					{
						o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
					}
				}
				if ( opt == "ALL" || opt == "CARRIERS" )
				{
					carriers     = new ArrayCollection(response.rawData.carriers);
					for each(var o:Object in carriers)
					{
						o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
					}
				}
				if ( opt == "ALL" || opt == "CUSTOMERS" )
				{
					customers    = new ArrayCollection(response.rawData.customers);
					for each(var o:Object in customers)
					{
						o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
					}
				}
				if ( opt == "ALL" || opt == "EMPLOYERS" )
				{
					employers    = new ArrayCollection(response.rawData.employers);
					for each(var o:Object in employers)
					{
						o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
					}
				}
				if ( opt == "ALL" || opt == "ISSUERS" )
				{
					issuers    = new ArrayCollection(response.rawData.issuers);
					for each(var o:Object in issuers)
					{
						o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
					}
				}
				if ( opt == "ALL" || opt == "VEHICLES" )
				{
					vehicles     = new ArrayCollection(response.rawData.vehicles);
					for each(var o:Object in vehicles)
					{
						//o.CODE_NAME = o.TNKR_CODE + " - " + o.TNKR_NAME;
						o.CODE_NAME = o.TNKR_CODE;
					}
				}
				if ( opt == "ALL" || opt == "TRAILERS" )
				{
					trailers    = new ArrayCollection(response.rawData.trailers);
					for each(var o:Object in trailers)
					{
						o.CODE_NAME = o.EQPT_ID + " - " + o.EQPT_CODE;
					}
				}
				if ( opt == "ALL" || opt == "OPERATORS" )
				{
					operators    = new ArrayCollection(response.rawData.operators);
					for each(var o:Object in operators)
					{
						o.CODE_NAME = o.PER_CODE + " - " + o.PER_NAME;
					}
				}
				if ( opt == "ALL" || opt == "PRODUCTS" )
				{
					products     = new ArrayCollection(response.rawData.products);
					for each(var o:Object in products)
					{
						o.CODE_NAME = o.PROD_CODE + " - " + o.PROD_NAME;
					}
				}
				if ( opt == "ALL" || opt == "PRODUNITS" )
				{
					prodUnits    = new ArrayCollection(response.rawData.prodUnits);
					for each(var o:Object in prodUnits)
					{
						//o.CODE_NAME = o.UNIT_ID + " - " + o.DESCRIPTION;
						o.CODE_NAME = o.DESCRIPTION;
					}
				}
				if ( opt == "ALL" || opt == "PLANTS" )
				{
					plants       = new ArrayCollection(response.rawData.plants);
					for each(var o:Object in plants)
					{
						o.CODE_NAME = o.TERM_CODE + " - " + o.TERM_NAME;
					}
				}
				if ( opt == "ALL" || opt == "TANKS" )
				{
					tanks        = new ArrayCollection(response.rawData.tanks);
					for each(var o:Object in tanks)
					{
						//o.CODE_NAME = o.TANK_CODE + " - " + o.TANK_NAME;
						o.CODE_NAME = o.TANK_CODE;
					}
				}
				if ( opt == "ALL" || opt == "BAYARMS" )
				{
					bayarms     = new ArrayCollection(response.rawData.bayarms);
					for each(var o:Object in bayarms)
					{
						//o.CODE_NAME = o.BAA_CODE + " - " + o.ARM_NAME;
						o.CODE_NAME = o.BAA_CODE;
					}
				}
				if ( opt == "ALL" || opt == "RATIOS" )
				{
					ratios       = new ArrayCollection(response.rawData.ratios);
				}
				if ( opt == "ALL" || opt == "TRIPSTATUS" )
				{
					tripStatus    = new ArrayCollection(response.rawData.tripStatus);
					for each(var o:Object in tripStatus)
					{
						//o.CODE_NAME = o.STATUS_ID + " - " + o.STATUS_CODE + " - " + o.STATUS_TEXT;
						o.CODE_NAME = o.STATUS_TEXT;
					}
				}
				if ( opt == "ALL" || opt == "ORDERSTATUS" )
				{
					orderStatus    = new ArrayCollection(response.rawData.orderStatus);
					for each(var o:Object in orderStatus)
					{
						//o.CODE_NAME = o.ORDER_STATUS_ID + " - " + o.ORDER_STATUS_NAME;
						o.CODE_NAME = o.ORDER_STATUS_NAME;
					}
				}
				if ( opt == "ALL" || opt == "MOVITEMTYPES" )
				{
					movItemTypes = new ArrayCollection(response.rawData.movItemTypes);
				}
				if ( opt == "ALL" || opt == "MOVSOURCES" )
				{
					movSources   = new ArrayCollection(response.rawData.movSources);
				}
				if ( opt == "ALL" || opt == "MOVSTATUS" )
				{
					movStatus    = new ArrayCollection(response.rawData.movStatus);
				}
			}
			
			trace( "=====================", "Here I am in the dmLists.populateSource");
			
			if ( cbfunc != null ) 
			{
				cbfunc();
				cbfunc = null;
			}
		}
		
	}
	
}