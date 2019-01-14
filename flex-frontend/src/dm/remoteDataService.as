package dm
{
	import flash.net.NetConnection;
	import flash.net.ObjectEncoding;
	import flash.net.Responder;
	import flash.utils.ByteArray;
	
	import mx.collections.ArrayCollection;

	public class remoteDataService extends ArrayCollection
	{
		public var nc:NetConnection;
		public var responder:Responder;
		public var cbFunc:Function;
		public var command:String;
		
		public var returnType:int;
		public var dataObject:Object;
		public var dataList:ArrayCollection;
		public var dataString:String;
		public var dataInteger:int;
		public var dataNumber:Number;
		
		public var totalCount:int=0;
		
		/**
		 * construct the class
		 * @param cmd    The service command in the format of service_name.function_name
		 * @param resp   The custom responder used by the parent 
		 * @param func   The callback function run after responder is performed
		 * @param type   The data type of return values from data service. 0: List, 1: String, 2: Integer, 3: Number.
		 */
		public function remoteDataService(cmd:String, resp:Responder=null, func:Function=null, type:int=0)
		{
			nc = new NetConnection();
			nc.objectEncoding = ObjectEncoding.AMF3;
			nc.connect(global.gatewayURL);
			
			dataObject = new Object();
			dataList = new ArrayCollection();
			dataString = "";
			dataInteger = -1;
			dataNumber = -1.0;
			
			returnType = type;
			
			command = cmd;
			
			if( resp == null )
			{
				if ( returnType == 0 )
				{
					responder = new Responder(listResponder_resultHandler, responder_statusHandler);
				}
				else
				{
					responder = new Responder(itemResponder_resultHandler, responder_statusHandler);
				}
				
			}
			else
			{
				responder = resp;
			}
			
			cbFunc = func;
		}
		
		public function service(...params):void
		{	
			var arr:Array = new Array( command, responder );
			var args:Array = arr.concat( params );
			
			//nc.call( command, responder, params );
			nc.call.apply( nc, args );
		}
		
		public function listResponder_resultHandler( obj:Object ):void
		{
			trace( "-----------------------------------------------------SQL::::::::::::::::::::::::::::::::::::", obj.count, obj.sqls, command );
			this.dataObject = obj;
			this.totalCount = obj.count;
			
			this.removeAll();
			this.dataList.removeAll();
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
			
			if ( cbFunc != null )
			{
				cbFunc();
			}
			
		}
		
		public function itemResponder_resultHandler( obj:Object ):void
		{
			this.dataObject = obj;
			
			if ( returnType == 1 )
			{
				this.dataString = String( obj );
			}
			else if ( returnType == 2 )
			{
				this.dataInteger = int( obj );
			}
			else if ( returnType == 3 )
			{
				this.dataNumber = Number( obj );
			}
			else
			{
				this.dataString = String( obj );
			}
			
			if ( cbFunc != null )
			{
				cbFunc();
			}
			
		}
		
		public function responder_statusHandler( obj:Object ):void
		{
			
		}
		
	}
}