package dm.collections
{
	import dm.models.dmMovementScheduleItem;
	import dm.utils.tools;
	
	public class dmMovementScheduleItems extends dmCollection{
		
		
		public var dmClass:String = "dmMovementScheduleItems";
		public var model:dmMovementScheduleItem;
		
		public function dmMovementScheduleItems( params:* = false){
			
			//tools.pr (params);
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
			//fire off the service request.
			Server.service('dmMovementScheduleItems.getInstance', serviceArgs, populateSource);
		}
		
		override protected function populateSource( response : * ):void
		{
			super.populateSource(response);
		}
		
		
	}
	
}