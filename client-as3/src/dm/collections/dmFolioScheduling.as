package dm.collections{
	
	import dm.DM;
	import dm.utils.*;
	
	import flash.events.Event;
	import flash.events.IEventDispatcher;
	
	import mx.collections.ArrayCollection;
	import mx.utils.ObjectUtil;
	
	public class dmFolioScheduling extends dmPagedCollection implements IEventDispatcher{
		
		public var dmClass:String = "dmFolioScheduling";
		public var dmData:ArrayCollection;
		
		public function dmFolioScheduling( params:* = false ){
			super(params);
		}
		
		override public function reload():void{
			populate();
		}
		
		/**
		 */
		override public function populate( params:* = false ):void{
			//set the service arguments.
			super.setServiceArgs(params);
			//fire off the service request.
			Server.service('dmsFolioService.getFolioScheduling', serviceArgs, populateSource);
		}
		
		public function addSchedulingOverride(params:* = false):void{
			//set the service arguments.
			super.setServiceArgs(params);
			//fire off the service request.
			Server.service('dmsFolioService.addSchedulingOverride', params, populate);
			DM.post(params, dmClass, "Create Schedule Override");
		}
		override protected function populateSource( response : * ):void{
			trace("POPULATE SCHEDULING");
			super.populateSource(response);
			if(DM.FolioExceptionDates){
				DM.FolioExceptionDates.reload();
			}
		}
	}
}