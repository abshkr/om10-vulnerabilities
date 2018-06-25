package dm.collections{
	
	import dm.DM;
	import dm.models.dmMovementCompanyBay;
	import dm.utils.*;
	
	import flash.events.Event;
	import flash.events.IEventDispatcher;
	
	import mx.collections.ArrayCollection;
	import mx.resources.ResourceManager;
	import mx.utils.ObjectUtil;
	
	public class dmMovementCompanyBays extends dmCollection implements IEventDispatcher{
		
		public var dmClass:String = "dmMovementReasons";
		public var dmData:ArrayCollection;
		public var model:dmMovementCompanyBay;
		[Bindable] public var bays:ArrayCollection=new ArrayCollection();
		[Bindable] public var companys:ArrayCollection=new ArrayCollection();
		[Bindable] public var types:ArrayCollection;
		
		public var asynServiceCall:Boolean=false;
		
		
		public function dmMovementCompanyBays( params:* = false ){
			super(params);
		}
		override public function reload():void{
			populate();
		}
		override public function populate( params:* = false ):void{
			//set the service arguments.
			super.setServiceArgs(params);
			//fire off the service request.
			Server.service('dmMovementCompanyBays.getInstance', serviceArgs, populateSource);
		}
		override protected function populateSource( params:*  ):void{
			
			if ( this.asynServiceCall == false )
			{
				bays     = new ArrayCollection(params.rawData.bays);
				
				companys = new ArrayCollection(params.rawData.companys);
				for each(var o:Object in companys){
					o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
				}
			}
			
			//types    = new ArrayCollection(params.rawData.types);
			var bayType0:String = mx.resources.ResourceManager.getInstance().getString('default','CMPYBAY.OPTION.BAY_TYPE.TRADITIONAL_LOADING');
			var bayType1:String = mx.resources.ResourceManager.getInstance().getString('default','CMPYBAY.OPTION.BAY_TYPE.NOMINATION_MOVEMENT');
			types    = new ArrayCollection([{BAY_TYPE_ID:0, BAY_TYPE_NAME:bayType0}, {BAY_TYPE_ID:1, BAY_TYPE_NAME:bayType1}]);
			
			super.populateSource(params);
		}
	}
}