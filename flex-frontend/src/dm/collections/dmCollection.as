package dm.collections{
	
	import dm.comms.*;
	import dm.utils.tools;
	
	import mx.collections.ArrayCollection;
	import mx.events.CollectionEvent;
	import mx.events.PropertyChangeEvent;
	import mx.utils.ObjectUtil;
	
	
	/**
	 * @author bn
	 * @version 1.0
	 * @created 11-Dec-2012 3:27:58 PM
	 */
	public class dmCollection extends ArrayCollection{
		
		protected var Server:*;
		protected var serviceClass:String;
		protected var actionName:String;

		/** groupFilters Conditions. New parameter! if this parameter is not set, use the filter and range instead
		 * 
		 * groupFilters : {
		 *      "logicalOps"     : "AND" | "OR" | "( {0} AND {1} AND ( {2} OR {3}) )"
		 * 
		 * 		"filters" : {
		 *         0: {
		 *               "field"      : "field name|field1,field2,..."
		 *               "value"      : "field value: x|x~|x~y|~y"
		 *               "type"       : "field data type:NUMBER|STRING|DATETIME|BINARY"
		 *               "format"     : "format pattern for the field value"
		 *               "delimiter"  : "delimiter for range: N/A|~"
		 *               "operator"   : "operator for filter: =|>=~<|like|is not"
		 *               "logic"      : "N/A|AND|OR"
		 *          },
		 *        1:  {
		 *               "field"      : "field name|field1,field2,..."
		 *               "value"      : "field value: x|x~|x~y|~y"
		 *               "type"       : "field data type:NUMBER|STRING|DATETIME|BINARY"
		 *               "format"     : "format pattern for the field value"
		 *               "delimiter"  : "delimiter for range: N/A|~"
		 *               "operator"   : "operator for filter: =|>=~<=|like|is not"
		 *               "logic"      : "N/A|AND|OR"
		 *          },
		 *          ......
		 * 		}
		 * 
		 * }
		 * 
		 */
		public var groupFilters:Object;
		/** orders Conditions. New parameter! if this parameter is not set, use the order instead
		 *
		 * # order, ascending, a single field
		 * orders : 'myField' 
		 * 
		 * # order, descending, a single field
		 * orders : 'myField DESC' 
		 * 
		 * 
		 * # order a field descending
		 * orders : {
		 * 		field : 'myField',
		 * 		order : 'DESC'
		 * }
		 * 
		 * # order a set of fields descending
		 * orders : {
		 * 		field : ['myField1' , 'myField2']
		 * 		order : 'DESC'
		 * }
		 * # or
		 * orders : {
		 * 		field : 'myField1,myField2,myField3'
		 * 		order : 'DESC'
		 * }
		 * 
		 * 
		 * # order a set of fields ascending or descending
		 * orders : {
		 *	0 : {
		 * 		    field : ['myField1' , 'myField2']
		 * 		    order : 'DESC'
		 *      },
		 *  1 : {
		 * 		    field : 'myField3,myField4,myField5'
		 * 		    order : 'ASC'
		 *      },
		 *  2 : {
		 * 		    field : 'myField6'
		 * 		    order : 'DESC'
		 *      },
		 *  3 : {
		 * 		    field : 'myField7'
		 * 		    order : 'ASC'
		 *      },
		 *  4 : {
		 * 		    'myField8'
		 *      },
		 *  5 : {
		 * 		    'myField9 DESC'
		 *      },
		 *     ......
		 * }
		 * 
		 */
		public var orders:Object;
		
		// Old design of filter+range+order
		/** Filter Conditions.
		 */
		public var filter:Object;
		
		/** Between Conditions.
		 */
		public var range:Object;
		
		/** order by Conditions.
		 */
		public var order:Object;
		
		public var whiteList:Array;
		public var blackList:Array;
		
		/** Search String.
		 */
		public var search:String;
		
		/** The number of available records inside the database.
		 */
		public var count:int;
		
		/**
		 * Service arguments
		 */
		public var serviceArgs:Object;
		
		public var dmComponent:*;
		
		public var collection:Array;
		
		public var needFetchLists:Boolean;
		
		public var requestMode:int;
		
		public var resultHandler:Function=null;
		
		/**
		 * 
		 */
		public var displayOrder:String;
		
		/** Constructor
		 */
		public function dmCollection( params : * = false ){
			
			collection = new Array();
			//were we argued with any parameters, if not create an empty object
			// do we need this?
			//if(!params)	params = new Object();
			
			//set service args to instance up as an anonymous object.
			serviceArgs = new Object();
			
			// server should be always available! the params may not be an object when instantiating, but laterly populate will need the Server
			Server = new amf(global.AppServicesConfig.gatewayURL);
			
			trace("::->>",global.AppServicesConfig.gatewayURL);
			// init the service and action
			serviceClass 	= tools.getObjAttribute( params, "service", "" );
			actionName 		= tools.getObjAttribute( params, "action", "" );
			// init parameters
			needFetchLists 	= tools.getObjAttribute( params, "needFetchLists", true );
			requestMode 	= tools.getObjAttribute( params, "requestMode", 3 );
			
			search 			= tools.getObjAttribute( params, "search", "" );
			groupFilters	= tools.getObjAttribute( params, "groupFilters", {} );
			orders			= tools.getObjAttribute( params, "orders", null );
			filter 			= tools.getObjAttribute( params, "filter", {} );
			whiteList 		= tools.getObjAttribute( params, "whiteList", [] );
			blackList 		= tools.getObjAttribute( params, "blackList", [] );
			// the default range must be null, otherwise the livelist class won't map
			range 			= tools.getObjAttribute( params, "range", null );
			// the default order must be null, otherwise the searchlist class won't map
			order 			= tools.getObjAttribute( params, "order", null );
			if( params is Object && params.hasOwnProperty('order') )
			{
				displayOrder	= tools.getObjAttribute( params.order, "order", "ASC" );
			}
			
			var autopopulate:Boolean;
			autopopulate 	= tools.getObjAttribute( params, "autopopulate", true );
			if( autopopulate)
			{
				this.populate(params);
			}

			super();
		}
		
		/**
		 * it is setServiceArgs and populateSource requires overriding, not populate itself
		 */
		public function populate( params:* = false ):void {
			
			//set the service arguments.
			setServiceArgs( params );
			
			//get the service and action
			serviceClass = tools.getObjAttribute( params, "service", "" );
			actionName = tools.getObjAttribute( params, "action", "" );
			
			trace ( " +++++++++++++++++++++++++++ in dmCollections.populate >>>" + (serviceClass+"."+actionName) + "<<<"); 
			//fire off the service request.
			Server.service( serviceClass+"."+actionName, serviceArgs, populateSource);
			
		}
		
		protected function populateSource( response : * ):void{
			
			trace ( " +++++++++++++++++++++++++++ in dmCollections.populateSource >>>" + (serviceClass+"."+actionName) + "<<<", resultHandler); 
			if(response is Object){
				
				if(response.hasOwnProperty('dmClass')){
					
					if(response.dmClass == 'dmMesg'){
						
						//set the count
						count = response.data.count;
						//count = response.rawData.count;
						
						//set the colelction
						super.source = response.data.collection; 
						//super.source = response.rawData.collection; 
						
						
					}
					
				}
				
			}
			
			if ( resultHandler != null )
			{
				trace( "................................callback resultHandler");
				resultHandler();
				resultHandler = null;
			}
			
		}
		
		protected function setServiceArgs( params:* = false ):void{
			trace ( " +++++++++++++++++++++++++++ inside dmCollections.setServiceArgs ........"); 
			
			// change the service and action
			serviceClass 	= serviceArgs.serviceClass 	= tools.getObjAttribute( params, "service", serviceClass );
			actionName 		= serviceArgs.actionName 	= tools.getObjAttribute( params, "action", actionName );
			// change the parameters
			needFetchLists 	= serviceArgs.needFetchLists 		= tools.getObjAttribute( params, "needFetchLists", needFetchLists );
			requestMode 	= serviceArgs.requestMode	 		= tools.getObjAttribute( params, "requestMode", requestMode );
			
			search 			= serviceArgs.search 		= tools.getObjAttribute( params, "search", search );
			groupFilters 	= serviceArgs.groupFilters	= tools.getObjAttribute( params, "groupFilters", groupFilters );
			orders		 	= serviceArgs.orders		= tools.getObjAttribute( params, "orders", orders );
			filter 			= serviceArgs.filter 		= tools.getObjAttribute( params, "filter", filter );
			whiteList 		= serviceArgs.whiteList 	= tools.getObjAttribute( params, "whiteList", whiteList );
			blackList 		= serviceArgs.blackList 	= tools.getObjAttribute( params, "blackList", blackList );
			range 			= serviceArgs.range 		= tools.getObjAttribute( params, "range", range );
			order 			= serviceArgs.order 		= tools.getObjAttribute( params, "order", order );
			
		}
		
		public function reload():void
		{
			populate(this.serviceArgs);
		}
		
	}
	
}