package dm.collections{
	
	import dm.DM;
	import dm.models.dmMovementReason;
	import dm.utils.*;
	
	import flash.events.Event;
	import flash.events.IEventDispatcher;
	
	import mx.collections.ArrayCollection;
	import mx.events.CollectionEvent;
	import mx.utils.ObjectUtil;
	
	import spark.collections.Sort;
	import spark.collections.SortField;
	
	public class dmMovementReasons extends dmCollection implements IEventDispatcher{
		
		public var dmClass:String = "dmMovementReasons";
		public var dmData:ArrayCollection;
		public var model:dmMovementReason;
		[Bindable] public var types:ArrayCollection;
		[Bindable] public var nextID:Number = 0;
		
		public function dmMovementReasons( params:* = false ){
			super(params);
		}
		override public function reload():void{
			populate();
			DM.SpecialMovements.reloadReasonCodes();
		}
		override public function populate( params:* = false ):void{
			//set the service arguments.
			super.setServiceArgs(params);
			//fire off the service request.
			Server.service('dmMovementReasons.getInstance', serviceArgs, populateSource,false,true);
		}
		override protected function populateSource( params:*  ):void{
			types = new ArrayCollection(params.rawData.types);
			super.populateSource(params);
			// sort data by ID
			var dataSortField:SortField = new SortField();
			dataSortField.name    = "clnId";
			dataSortField.numeric = true;
			var numericDataSort:Sort = new Sort();
			numericDataSort.fields = [dataSortField];
			sort = numericDataSort;
			refresh();
			// grab the nextID
			nextID = 0;
			for each(var o:dmMovementReason in source){
				if(Number(o.clnId) >= nextID){
					nextID = Number(o.clnId)+1;
				}
			}
			
		}		
	}
}