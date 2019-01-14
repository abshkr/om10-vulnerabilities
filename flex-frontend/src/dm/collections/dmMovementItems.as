package dm.collections
{
	import dm.models.dmMovementItem;
	import dm.utils.tools;
	
	public class dmMovementItems extends dmCollection{
	
		
		public var dmClass:String = "dmMovementItems";
		public var model:dmMovementItem;
		
		public function dmMovementItems( params:* = false){
			
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
			Server.service('dmMovementItems.getInstance', serviceArgs, populateSource);
		}
		
		override protected function populateSource( response : * ):void
		{
			super.populateSource(response);
		}
		
		
	}
	
}