package dm.comms{
	
	import dm.utils.tools;
	
	import flash.utils.ByteArray;
	import flash.utils.getDefinitionByName;
	
	import mx.messaging.ChannelSet;
	import mx.messaging.channels.SecureAMFChannel;
	import mx.rpc.AsyncResponder;
	import mx.rpc.AsyncToken;
	import mx.rpc.events.FaultEvent;
	import mx.rpc.remoting.RemoteObject;
	import mx.utils.ObjectUtil;
	
	
	public class amf{
		
		private var gateway:String;
		public var authToken:String;
		
		public var request:RemoteObject;
		
		public var response:Object;
		
		
		public var onSuccessFunction:*;
		public var onSuccessParams:*;
		
		private var netThreads:Array;
		private var responseThreads:Array;
		private var dispatchIdx:int;
		
		
		public function amf( gatewayURL:String ){
			
			gateway = gatewayURL;
			netThreads = new Array();
			responseThreads = new Array();
			
			
		}
		
		public function service( service:String, params:Object, onSuccess:* = false, onSuccessParams:* = false, silentMode:Boolean = false ):void{
			
			this.call('service', service, params, onSuccess, onSuccessParams, silentMode);
			
		}
		
		public function invoke( subject:Object, method:String, params:Object = false, onSuccess:* = false, onSuccessParams:* = false):void{
			
			if(subject.hasOwnProperty('dmClass')){
				
				if(params)	params.dmMethod = method;
				else{
					if(subject.hasOwnProperty('payload'))	params = { dmMethod : method, payload : subject.payload  };
					else									params = { dmMethod : method };
				}
				
				
				trace('|' + subject.dmClass + "|." + params.dmMethod);
				this.call('invoke', subject.dmClass + "." + params.dmMethod , params, onSuccess, onSuccessParams);
				
			}
			
		}
		
		public function invokeReturn( params:* = false ):void{
			
			
			
		}
		
		public function call( action:String, service:String, params:Object, onSuccess:* = false, onSuccessParams:* = false, silentMode:Boolean = false ):void{
			
			var splitArray:Array = service.split('.');
			action = splitArray[0];
			service = splitArray[1];
			
			//set up the responseThread
			var dispatchIdx:int = responseThreads.push({ successFunction : onSuccess, successParams : onSuccessParams });
			
			request = new RemoteObject();
			request.endpoint = gateway;
			request.destination = action;
			request.source = action;
			request.showBusyCursor = false;
			
			var cs:ChannelSet = new ChannelSet();
			var sac:SecureAMFChannel = new SecureAMFChannel("sac",gateway);
			cs.addChannel(sac);
			
			request.channelSet = cs;
			
			var idx:int = netThreads.push(request);
			
			var op:* = netThreads[idx - 1].getOperation(service);
			
			
			var token:AsyncToken = op.send(params);
			token.token = idx;
			token.addResponder(new AsyncResponder(responder, handleError));
			
		}
		
		public function responder( e:Object, token:Object = null ):void{
			
			response = e.result;

			if(response is Object){
				// check if data is json-encrypted
				// uncompress
				if(response.hasOwnProperty('zip_on') && response.hasOwnProperty('data') && response.zip_on==1 && (response.data) ){	
					var mthd:String="zlib";
					if ( response.hasOwnProperty('zip_mthd') )
					{
						mthd = response.zip_mthd;
					}
					response.data = global.uncompressText( response.data, mthd );
				}
				if(response.hasOwnProperty('json_on') && response.hasOwnProperty('data') && response.json_on==1 && (response.data) ){	
					response.data = JSON.parse( response.data,null );
				}
				
				if(response.hasOwnProperty('dmClass')){
					
					if(response.dmClass == 'dmMesg'){
						
						if(!response.data)	response.count = 0;
						else				response.count = response.data.length;
						
						if(response.hasOwnProperty('data') && (response.data) ){	
							//if(response.hasOwnProperty('json_on')  ){	
							//	response.data = JSON.parse( response.data,null );
							//}
							if(response.data.hasOwnProperty('dmClass')){
								
								var doInstance:Boolean = false;
								
								//this is for live collections, on polling we don't wish to create an entirely new instance of the collection, simply merge the returns to the existing one.
								if(!response.data.hasOwnProperty('instantiate'))	doInstance = true; //we don't have a directive, so we assume we are instancing.
								else if(response.data.instantiate)					doInstance = true;
								
								if(doInstance){
									
									trace('instancing ' + response.data.dmClass);
									var ClassReference:Class = getDefinitionByName("dm.collections." + response.data.dmClass) as Class;
									var tmpCollClass:* = new ClassReference({autopopulate : false});
								
								}
								else
									var tmpCollClass:Object = {collection : []};
								
							}
							else{
								trace('Warning collection class is not mapped');
							}
							
							if(response.data.hasOwnProperty('collection')){
								
								if(response.data.collection is Array){
									
									for(var i:int = 0; i < response.data.collection.length; i++){
										if(response.data.collection[i].hasOwnProperty('dmClass')){
											
											
											var ClassReference:Class = getDefinitionByName("dm.models." + response.data.collection[i].dmClass) as Class;
											var tmp:* = new ClassReference(response.data.collection[i]);
											
											tmpCollClass.collection.push(tmp);
										}								
										
									}
									
								}			
								response.rawData = response.data;					
								response.data = tmpCollClass;
								
							}
							
						}
						response.resultOK = true;
						this.responseThreads[(e.token.token - 1 as Number)].successFunction(response);
						return;
						
					}
					else if(response.dmClass == 'dmError'){
						trace(ObjectUtil.toString(response));
						response.resultOK = false;
						this.responseThreads[(e.token.token - 1 as Number)].successFunction(response);
					}
					
				}
				
			}
			
			trace('Errored  Data came from the OM5000 Server ' + ObjectUtil.toString(e));
			return;
			
		}
		
		public function handleError( e:FaultEvent, token:Object = null ):void{
			
			trace('somehow we got an error');
			tools.pr(e.fault);
			
		}
		
		public function mapToClass( ):void{
			
			
		}

	}
	
}