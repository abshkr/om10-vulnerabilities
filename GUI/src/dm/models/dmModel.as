package dm.models{

	import dm.DM;
	import dm.comms.amf;
	import dm.utils.tools;
	
	import flash.display.DisplayObject;
	import flash.events.IEventDispatcher;
	import flash.utils.getQualifiedClassName;
	import flash.utils.getQualifiedSuperclassName;
	
	import mx.utils.ObjectUtil;
	
	public dynamic class dmModel{
		
		public var payload:Object;
		
		public var dmClass:String;
		
		protected var Server:*;
		
		
		
		public function dmModel( params : * = false ){
			
			//get the qualified class name so we know what we're creating.
			//trace ("***before >>>>>>>>>"+dmClass+":<<<<<<<***", dmClass );
			this.dmClass = getModelName( params );
			//trace ("***after >>>>>>>>>"+dmClass+":<<<<<<<***", dmClass );
									
			Server = new amf(global.AppServicesConfig.gatewayURL);
			parseData(params);
			
		}
		
		
		public function getModelName( params : * = false ):String
		{
			var class_name:String;
			
			class_name = tools.getObjAttribute( params, "modelName", getQualifiedClassName(this) );
			
			if ( class_name.indexOf( "::" ) < 0 )
			{
				class_name = "dm.models::" + class_name;
			}
			
			return class_name;
		}
		
		public function exposeModel():void{
			
			
			Server.service('dmsCRUD.exposeModel', this, traceModelReturn);
			
		}
		
		public function traceModelReturn( response : * ):void{
			tools.pr(response);
		}
		
		private function parseData( params : * = false ):void{
			
			//ensure we got data & not just a false value; a nothing.
			if(params){
				
				//if params is an object, we're g2g - unlike in PHP we'll force this and not consider arrays at all.
				if(params is Object){
					
					//did we get data?
					if(params.hasOwnProperty('payload')){
						payload = params.payload;
						
						for ( var s:String in payload){
							this[s] = payload[s];
						}
					}
					
					//are we going to store this immediately?
					if(params.hasOwnProperty('create'))				create(params);
					
				}
				
			}
			
		}
		
		public function create( params : * = false ):void{
			
			
			
			if(params){
				
				if(!params.hasOwnProperty('onSuccess'))	params.onSuccess = responseHandler
				
			}
			else{
				
				params = { 
					onSuccess : responseHandler
				};
			}
			
			var p2pHandler:Function = function(response : * = false ){
				DM.post(params, dmClass, "create");
				params.onSuccess(response);
			}
			Server.service('dmsCRUD.create', this, p2pHandler);
			
		}
		
		public function update( params : * = false ):void{
			
			if(params){
				
				if(!params.hasOwnProperty('onSuccess'))	params.onSuccess = responseHandler
				if(params.hasOwnProperty('payload')){
					var pl:Object = params.payload;
					for(var par:String in pl){
						this.payload[par] = pl[par];
					}
					trace(ObjectUtil.toString(this));
				}
				
			}
			else{
				
				params = { 
					onSuccess : responseHandler
				};	
				
			}
			var p2pHandler:Function = function(response : * = false ){
				DM.post(params, dmClass, "update");
				params.onSuccess(response);
			}
			Server.service('dmsCRUD.update', this, p2pHandler);
			
		}
		
		public function refresh():void{
			
		}
		
		public function remove( params : * = false ):void{
			
			if(params){
				
				if(!params.hasOwnProperty('onSuccess'))	params.onSuccess = responseHandler
				
			}
			else{
				
				params = { 
					onSuccess : responseHandler
				};	
				
			}
			
			var p2pHandler:Function = function(response : *  = false){
				DM.post(params, dmClass, "delete");
				params.onSuccess(response);
			}
			Server.service('dmsCRUD.delete', this, p2pHandler);
			
		}
		
		public function validate():void{
			
		}

		/**
		 * 
		 */
		public function responseHandler( response : * ):void{
			
		}
		
	}
	
}