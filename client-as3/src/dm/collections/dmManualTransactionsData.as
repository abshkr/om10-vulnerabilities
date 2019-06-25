package dm.collections
{
	import dm.DM;
	import dm.models.dmManualTransactionData;
	import dm.utils.*;
	
	import flash.events.Event;
	import flash.events.IEventDispatcher;
	import flash.text.TextFormat;
	
	import flashx.textLayout.formats.Float;
	
	import mx.collections.ArrayCollection;
	import mx.events.CollectionEvent;
	import mx.events.FlexEvent;
	import mx.rpc.AsyncToken;
	import mx.rpc.CallResponder;
	import mx.rpc.events.FaultEvent;
	import mx.rpc.events.ResultEvent;
	import mx.utils.ObjectUtil;
	
	import spark.collections.Sort;
	import spark.collections.SortField;
	
	import views.v_ManualTransactionsData;
	
	public class dmManualTransactionsData extends dmCollection
	{
		public var dmClass:String = "dmManualTransactionsData";
		public var model:dmManualTransactionData;
		
		public var mtDataArr:ArrayCollection;
		public var selectedID:String = '-1';
		
		public function initialize(status:String)
		{
			trace("+++++Running into <collection>.dmManualTransactionsData(initialize)")
		}
	
		public function dmManualTransactionsData(params:* = false)
		{ 
			trace("+++++Running into <collection>.dmManualTransactionsData(constructor)")
			mtDataArr = new ArrayCollection();
			super(params);
		}
		
		override public function reload():void
		{
			trace("+++++Running into <collection>.dmManualTransactionsData(reload)")
			populate();
		}

		override public function populate(params:* = false):void
		{
			//set the service arguments.
			super.setServiceArgs(params);
			
			//fire off the service request.
			Server.service('dmManualTransactionsData.getInstance', serviceArgs, populateSource);
		}
		
		override protected function populateSource(response : *):void
		{
			trace("+++++Running into <collection>.dmManualTransactionsData(populateSource)")
			super.populateSource(response);
		}
	}
}