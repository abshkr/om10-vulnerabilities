package dm.collections{
	
	import mx.collections.ArrayCollection;
	
	public class dmURBAC_Users extends dmPagedCollection{
		
		public var dmClass:String = "dmURBAC_Users";
		public var dmData:ArrayCollection;
		
		
		public function dmURBAC_Users( params:* = false ){

			super(params);
		
		}

		public function reload():void{
			populate(this.serviceArgs);
		}
		
		/**
		 */
		override public function populate( params:* = false ):void{

			//set the service arguments.
			super.setServiceArgs(params);
			
			//fire off the service request.
			Server.service('dmsURBACService.getUsers', serviceArgs, populateSource);

		}
		
	}

}