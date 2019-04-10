package controllers
{
	import dm.comms.amf;
	
	import flash.events.EventDispatcher;
	import flash.net.FileReference;
	
	import mx.controls.Alert;
	import mx.utils.ObjectUtil;
	
	import views.v_TransactionList;
	
	// this is a partial controller model for a legacy view. only to handle csv conversion
	
	public class C_TransactionList extends EventDispatcher{
		// single bridge variable
		[Bindable] public var readOnly:Boolean 		= false;
		[Bindable] public var canReset:Boolean 		= false;
		[Bindable] public var canUpdate:Boolean 	= false;
		[Bindable] public var canCreate:Boolean 	= false;
		[Bindable] public var canDelete:Boolean 	= false;
		[Bindable] public var hasPassword:Boolean 	= false;
		[Bindable] public var csvReady:Boolean 		= false;
		
		
		private var _view:v_TransactionList;
		private var csv:String = "";
		private var Server:*;
		
		
		public function C_TransactionList(view:v_TransactionList){
			_view = view;
			Server = new amf(global.AppServicesConfig.gatewayURL);
		}
		
		public function refreshMainFilter():void{	
		}		
		
		public function goToExportData(): void{
			var f:FileReference = new FileReference();
			f.save(csv,"TransactionList.csv");
		}
		
		
		
		
		public function prepareCSV(filters:Object = null):void{
			
			
			
			var fil:Object = new Object();
			for each (var filter:Object in filters){
				fil[filter.fieldName] = filter.value;				
			}
			
			
			csvReady = false;			
			var columns:Array = new Array();
			columns.push({column:"TRSA_BAY_CD",			header:"Bay"});
			columns.push({column:"TRSA_ID", 			header:"Transaction No."});
			columns.push({column:"TRSA_TRIP",		 	header:"Trip No."});
			columns.push({column:"TRSA_TANKER",			header:"Tanker"});
			columns.push({column:"TRSA_PER_NAME", 		header:"Operator"});
			columns.push({column:"TRSA_ST_DMY", 		header:"Start"});
			columns.push({column:"TRSA_ED_DMY", 		header:"Finish"});
			columns.push({column:"TRSA_TERMINAL",	 	header:"Terminal"});
			
			var params:Object = {
				table		: 	"GUI_TRANSACTIONS",
				columns		:   columns,
				filters		:	fil
			};
			
			Server.service('dmsCSV.exportCSV', params, function(o:Object):void{
				csv = o.data;
				csvReady = true;
			});
			
		}
		
	}
}