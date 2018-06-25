package dm.collections{
	//import spark.core.IViewport;
	import dm.utils.tools;
	
	public class dmPagedCollection extends dmCollection{
		
		/**
		 * The amount of records that defines a "page" in this paged collection. 
		 */
		public var pageSize: int;
		
		/** The number of potential records inside the collection (how many records meet the search criteria in total)
		 */
		public var totalCount:int;
		
		/**
		 * The seek point from which this collection starts; eg. if we have a 30,000
		 * records in the database and we keeping records 150-350 then seek will be 150
		 */
		public var seek: int;
		
		/**
		 * The pos is the current position of item selected in the collection. Its value is between (seek+1, seek+pageSize) 
		 */
		public var pos: int;
		
		public var page:*;
		
		/**
		 * how many items above and below are we permitting. The slack is the amount of items above the seek item and below the page (seek + pageSize) we are permitting. 
		 */
		public var slack: int;
		
		protected var modelHeight:int;
		
		/**
		 * Constructor 
		 */
		public function dmPagedCollection( params:* = false ){
			
			super(params);
			
			//were we argued with any parameters, if not create an empty object
			//if(!params)	params = new Object();
			
			//initialize the parameters.
			pageSize 	= tools.getObjAttribute( params, "pageSize", 100 );
//			page 		= tools.getObjAttribute( params, "page", { page : 1, order : "DESC" } );
			page 		= tools.getObjAttribute( params, "page", { page : 1, order : "" } );
			seek 		= tools.getObjAttribute( params, "seek", 0 );
			pos 		= tools.getObjAttribute( params, "pos", seek+1 );
			
			//are we getting sent a viewport?
			if(params.hasOwnProperty('plugin')){
				
			}
			
		}
		public function resolve( params:* = false ):void{
			
		}
		
		/**
		 * Move the collection back an argued amount of records.
		 * @param num    The amount of records to move back.
		 */
		public function back( num:int ):void {
			
			//rewind the seek point
			seek = seek - num;
			this.populate();
			
		}
		
		/**
		 * Move the collection back a "page" of records.
		 */
		public function backPage():void{
			
			//make sure we aren't at the start
			if(seek < 1)		return;
			back(pageSize);
			
		}
		
		/**
		 * Move the collection forward an argued amount of records.
		 * @param num
		 */
		public function forward( num:int ):void{
			
			//move the seek point forward.
			seek = seek + num;
			
			this.populate();
		}
		
		/**
		 * Move the collection forward a "page" of records. 
		 */
		public function forwardPage():void{
			
			if( (seek + pageSize) >= totalCount)	return;
			forward(pageSize);
			
		}
		
		/**
		 * 
		 * @param num    amount of records for a page in this dmPagedCollection
		 */
		public function setPageSize(num:int):void{
			
			pageSize = num;	
			
		}
		
		
		override protected function populateSource( response : * ):void{
			
			
			this.totalCount = response.rawData.totalCount;
			trace( "~!@#$%^&**********************!!!!!!!!!!!!!!!!!! ", totalCount, seek, response.data.collection.length, response.rawData.totalCount );
			
			var delta:int=0;
			if ( response.data.collection.length > this.pageSize )
			{
				delta = ( response.data.collection.length - this.pageSize ) / 2;
			}
			
			trace ("~!@#$%^&**********************!!!!!!!!!!!!!!!!!! seek-delta", seek, delta, (seek-delta));
			if ( totalCount <= 0 )
			{
				response.data.collection = tools.makeArrayList( seek-delta, response.data.collection, totalCount);
			}
			else
			{
				//response.data.collection = tools.makeArrayList( seek-delta, response.data.collection, totalCount);
				response.data.collection = tools.updateArrayList( seek-delta, response.data.collection, totalCount, this.source);
			}
			
			super.populateSource(response);
			
		}
		
		/**
		 * 
		 */
		override protected function setServiceArgs( params:* = false ):void{
			
			super.setServiceArgs(params);
			
			pageSize 	= serviceArgs.pageSize 	= tools.getObjAttribute( params, "pageSize", pageSize );
			page 		= serviceArgs.page 		= tools.getObjAttribute( params, "page", page );
			seek 		= serviceArgs.seek 		= tools.getObjAttribute( params, "seek", seek );
			pos 		= serviceArgs.pos 		= tools.getObjAttribute( params, "pos", seek+1 );
			
		}
		
		public  function getItemAt2(index:int, prefetch:int = 0):Object
		//public override function getItemAt(index:int, prefetch:int = 0):Object
		{
			var o:Object = super.getItemAt(index, prefetch);
			var page:int = Math.floor(index/pageSize)+1; 
			if(o == null)
			{
				trace( "...............................getItemAt===============", index, prefetch );
				
				o = new Object();
				
				o["MV_ID"] = "Loading...";
				o["MV_TERMINAL"] = "Loading...";
				o["MV_KEY"] = "Loading...";
				o["MV_NUMBER"] = "Loading...";
				o["MV_SOURCE"] = "Loading...";
				o["MV_STATUS"] = "Loading...";
			}
			else
			{
				trace( "...............................getItemAt2===============", index, prefetch );
				//tools.pr( o );
			}
			/*
			if(o == null && pages[page] == null && requestCount < requestLimit)
			{	
			nc.call( 	"Stream.getJournalPage", 
			new Responder
			(
			// onSuccess
			function(a:Array):void
			{
			for each (var obja:Object in a)
			{
			try
			{
			setItemAt(obja, Number(obja["R"])-1 );
			}
			catch(e:Error)
			{
			
			}
			}
			pages[page] = true;
			//trace("Request page "+page + " DONE rc:" + (--requestCount));
			},
			// onFailed
			function (o:Object):void
			{
			trace(o);
			pages[page] = null;
			}
			), 
			pageSize, 
			page
			);
			pages[page] = false;
			//trace("Request page "+page + "rc:" + (++requestCount));
			}
			if(o == null)
			{
			return {R:"Loading...", COMPANY_CODE:"Loading...",MESSAGE:"Loading..."}
			}
			*/
			return o;
		}
		
	}
	
}