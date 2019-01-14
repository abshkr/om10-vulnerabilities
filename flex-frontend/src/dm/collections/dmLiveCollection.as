package dm.collections
{
	
	import dm.utils.dmTimer;
	
	import flash.globalization.DateTimeFormatter;
	
	import mx.utils.ObjectUtil;
	
	public class dmLiveCollection extends dmPagedCollection{
		
		/**
		 * this is a BOOL to determine if this livecollection should have a timer instance for repolling
		 */
		public var hasTimer:Boolean;
		
		/**
		 * A class variable for the dmTimer instance ( a MUX of timers )
		 */
		public var timer:dmTimer;
		
		/**
		 * The 
		 */
		public var syncDelay:int;
		
		/**
		 * 
		 */
		public var startRange:String;
		
		/**
		 * 
		 */
		public var endRange:String;
		
		/**
		 * 
		 */
		public var lastUpdate:String;
		

		
		//this is set false when synching - we don't want a factory object/stdClass which won't refire constructors
		//
		public var instantiate:Boolean; 
		
		protected var syncField:String;
		
		public function dmLiveCollection( params : * = false ){
			
			super(params);
			instantiate = true;
			
			this.getCurrentTime(0);
			
			if(params.hasOwnProperty('keepSync'))	hasTimer = params.keepSync;
			else									hasTimer = false;
		
			
			
			if(hasTimer){
				
				if(params.hasOwnProperty('syncDelay'))	syncDelay = params.syncDelay;
				else									syncDelay = 5000;
				
				timer = new dmTimer(syncDelay);
				timer.addEvent(this.synch);
				timer.start();
				
			}
			
		}
		
		/** Synchronise this collection with the server.
		 * 
		 * This retrieves new updates (ie. updates after propery::lastUpdate) using syncField as the variable field (datestamp).
		 */ 
		public function synch():void{
			
			
			
		}
		
		public function stopSync():void{
			
			if(hasTimer)
				timer.stop();
		
		}
		
		public function startSync():void{
			
			if(hasTimer)
				timer.start();
		
		}
		
		/**
		 * 
		 */
		public function synchSource( response : * = false ):void{
			
			if(response){
				
				if(response.data.collection.length > 0){
					
					if(displayOrder == 'ASC'){

						for(var i:int = 0; i < response.data.collection.length; i++){
						
							this.addItemAt(response.data.collection[i], 0);
							this.removeItemAt(this.source.length - 1);
							this.lastUpdate = response.data.collection[i].payload[syncField];
						
						}
					
					}
					else{
						
						for(var i:int = 0; i < response.data.collection.length; i++){
							
							this.addItemAt(response.data.collection[i], this.source.length);
							this.removeItemAt(0);
							this.lastUpdate = response.data.collection[i].payload[syncField];
							
						}
						
						
					}
					
				}
				
			}
			
		}
		
		/**
		 * 
		 */
		override protected function populateSource( response : * ):void{

			if(response is Object){
				
				if(response.hasOwnProperty('dmClass')){
					
					if(response.dmClass == 'dmMesg'){
						
						//set the count
						this.count = response.data.count;
						
						//set the collection
						this.source = response.data.collection;
						
						//if we have a new record
						if(response.data.collection.length > 1){
							
							var val:String = response.data.collection[response.data.collection.length - 1].payload[syncField];
							trace(val.replace(':',''));
							
							//set the lastUpdate
							this.lastUpdate = response.data.collection[response.data.collection.length - 1].payload[syncField];
							
						}
						return; 
						
					}
					
				}
				
			}
			
			if(this.source.length > 0)
				this.lastUpdate = this.source[0][syncField];
			
		}
		
		/**
		 * Get the current time (this is client specific, but can be changed to a servertime).
		 */
		protected function getCurrentTime(period:int):String{
			
			var date:Date = new Date();
			date.date -= period;
			var dtf:DateTimeFormatter = new DateTimeFormatter("en-US");
			dtf.setDateTimePattern("yyyy-MM-dd HH:mm:ss");
			return dtf.format(date);
			
		}
		
		
		protected function asSaneDate( date:* ):String{
			
			if(date is String){
				
				var dateStr:String = date;
				dateStr = dateStr.replace(/\-/g, "/");
				date =  new Date(Date.parse(dateStr));
			
			}
			
			var dtf:DateTimeFormatter = new DateTimeFormatter("en-US");
			dtf.setDateTimePattern("yyyy-MM-dd hh:mm:ss");
			return dtf.format(date);
			
		}
		
		override protected function setServiceArgs( params:* = false ):void{
			
			
			//are we parametising this population?
			if(params){
				
				
				if(params.hasOwnProperty('startTime'))		serviceArgs.startTime = asSaneDate(params.startTime);
				else										serviceArgs.startTime = getCurrentTime(7);
				
				if(params.hasOwnProperty('endTime'))		serviceArgs.endTime = asSaneDate(params.endTime);
				else										serviceArgs.endTime = getCurrentTime(0);
				
				if(params.hasOwnProperty('instantiate'))	serviceArgs.instantiate = params.instantiate;
				else										serviceArgs.instantiate = instantiate;
				
				
			}
			else{	//no, set the startRange to the "beginning of time".
				
				startRange = getCurrentTime(7);
				serviceArgs.startTime = getCurrentTime(7);
				serviceArgs.instantiate = instantiate;
			}
			
			
			super.setServiceArgs(params);
			
		}
		
		
	}
	
}