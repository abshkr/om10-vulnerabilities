package dm
{
	import flash.net.Responder;
	import flash.utils.ByteArray;
	
	import mx.collections.ArrayCollection;
	
	public class remoteBulkListService extends remoteDataService
	{
		public var interruptor:Boolean 		=  false;
		public var totalLength:int=0;
		
		public var currentFields:Object=new Object();
		public var currentTypes:Object=new Object();
		public var currentSorts:Object=new Object();
		public var currentOrders:Object=new Object();
		public var currentPageSize:int=1000;
		public var currentPage:int=1;
	
		
		public function remoteBulkListService(cmd:String, resp:Responder=null, func:Function=null)
		{
			super(cmd, resp, func, 0);
		}
		
		public function listService(fields:Object, types:Object, sorts:Object, orders:Object):void
		{	
			currentFields = fields;
			currentTypes = types;
			currentSorts = sorts;
			currentOrders = orders;
			
			var arr:Array = new Array( command, responder );
			var params:Array = new Array( currentFields, currentTypes, currentSorts, currentOrders, currentPage, currentPageSize );
			var args:Array = arr.concat( params );
			
			//nc.call( command, responder, params );
			nc.call.apply( nc, args );
		}
		
		override public function listResponder_resultHandler( obj:Object ):void
		{
			
			trace( "-----------------------------------------------------SQL::::::::::::::::::::::::::::::::::::", obj.count, obj.sqls, command );
			dataObject = obj;
			totalCount = int(obj.count);
			totalLength = totalCount;
			
			if(interruptor)
			{
				totalCount = this.length;
				interruptor = false;
			}
			else
			{
				// uncompress
				if ( obj.hasOwnProperty('zip_on') && obj.zip_on == 1 )
				{
					var mthd:String="zlib";
					if ( obj.hasOwnProperty('zip_mthd') )
					{
						mthd = obj.zip_mthd;
					}
					obj.data = global.uncompressText( obj.data, mthd );
				}
				//var myobj:Object = JSON.parse( obj.data,null );
				var myobj:Object;
				if ( obj.hasOwnProperty('json_on') && obj.json_on == 1 )
				{
					myobj = JSON.parse( obj.data,null );
				}
				else
				{
					myobj = obj.data;
				}
				
				for each(var s:Object in myobj)
				{
					this.addItem( s );
					this.dataList.addItem( s );
				}
				this.refresh();
				this.dataList.refresh();
			}
			
			// if not finished
			if(this.length < totalCount)
			{
				currentPage += 1;
				this.listService( currentFields, currentTypes, currentSorts, currentOrders );
			}
			else
			{
			}
			
			if ( cbFunc != null )
			{
				cbFunc();
			}
			
		}
	}
}