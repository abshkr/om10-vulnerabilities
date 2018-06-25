package dm
{
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.IOErrorEvent;
	import flash.events.NetStatusEvent;
	import flash.net.GroupSpecifier;
	import flash.net.NetConnection;
	import flash.net.NetGroup;
	import flash.net.NetGroupInfo;
	
	import mx.collections.ArrayCollection;
	import mx.controls.Alert;
	import mx.events.CollectionEvent;
	import mx.utils.ObjectUtil;
	
	import spark.components.gridClasses.GridColumn;
	
	import dm.collections.dmFolioExceptionDates;
	import dm.collections.dmFolioScheduling;
	import dm.collections.dmFolioSettings;
	import dm.collections.dmManualTransactions;
	import dm.collections.dmManualTransactionsData;
	import dm.collections.dmMessagingHost;
	import dm.collections.dmMovementCompanyBays;
	import dm.collections.dmMovementItems;
	import dm.collections.dmMovementReasons;
	import dm.collections.dmMovementScheduleItems;
	import dm.collections.dmMovementSchedules;
	import dm.collections.dmMovements;
	import dm.collections.dmSpecialMovements;

	public class DM
	{
		
		[Bindable] public static var gateway:NetConnection = new NetConnection();
		
		[Bindable] private static var cumulus:NetConnection = new NetConnection();
		[Bindable] private static var cumulusGroup:NetGroup;
		[Bindable] private static var cumulusGroupSpecifier:GroupSpecifier;
		
		[Bindable] public static var cumulusNeighbourCount:Number = 0;
		[Bindable] public static var cumulusGroupNotifications:ArrayCollection = new ArrayCollection;
		
		
		[Bindable] private static var init:Boolean = true;
		
		
		
		
		
		/////////////////////////////////////////////////////////////////////////////////////////////// Folio Scheduling
		[Bindable] private static var _FolioSchedullings:dmFolioScheduling;
		
		public static function set FolioSchedullings(va:dmFolioScheduling){
			_FolioSchedullings = va;
		}
		[Bindable] public static function get FolioSchedullings():dmFolioScheduling{
			if(!_FolioSchedullings){
				_FolioSchedullings = new dmFolioScheduling();
			}
			return _FolioSchedullings;
		}
		/////////////////////////////////////////////////////////////////////////////////////////////// Folio Exception
		[Bindable] private static var _FolioExceptions:dmFolioExceptionDates;	
		public static function set FolioExceptionDates(va:dmFolioExceptionDates){
			_FolioExceptions = va;
		}
		[Bindable] public static function get FolioExceptionDates():dmFolioExceptionDates{
			if(!_FolioExceptions){
				_FolioExceptions = new dmFolioExceptionDates({year: 2013});
			}
			return _FolioExceptions;
		}
		/////////////////////////////////////////////////////////////////////////////////////////////// Folio Settings
		[Bindable] private static var _FolioSettings:dmFolioSettings;
		public static function set FolioSettings(va:dmFolioSettings){
			_FolioSettings = va;
		}
		[Bindable] public static function get FolioSettings():dmFolioSettings{
			if(!_FolioSettings){
				_FolioSettings = new dmFolioSettings();
			}
			return _FolioSettings;
		}
		/////////////////////////////////////////////////////////////////////////////////////////////// Movement Bay
		[Bindable] private static var _MovementCompanyBays:dmMovementCompanyBays;
		public static function set MovementCompanyBays(va:dmMovementCompanyBays){
			_MovementCompanyBays = va;
		}
		[Bindable] public static function get MovementCompanyBays():dmMovementCompanyBays{
			if(!_MovementCompanyBays){
				_MovementCompanyBays = new dmMovementCompanyBays();
			}
			return _MovementCompanyBays;
		}
		/////////////////////////////////////////////////////////////////////////////////////////////// Movement Reasons
		[Bindable] private static var _MovementReasons:dmMovementReasons;
		public static function set MovementReasons(va:dmMovementReasons){
			_MovementReasons = va;
		}
		[Bindable] public static function get MovementReasons():dmMovementReasons{			
			if(!_MovementReasons){
				_MovementReasons = new dmMovementReasons();
				trace("SHOULD ONLY SEE THIS ONCE");
				_MovementReasons.addEventListener(CollectionEvent.COLLECTION_CHANGE, function(e:Object = null):void{trace("_MovementReasons UPDATED!!!!!!!");});
			}
			
			
			return _MovementReasons;
		}
		/////////////////////////////////////////////////////////////////////////////////////////////// Special Movements
		[Bindable] private static var _SpecialMovements:dmSpecialMovements;
		public static function set SpecialMovements(va:dmSpecialMovements){
			_SpecialMovements = va;
		}
		[Bindable] public static function get SpecialMovements():dmSpecialMovements{
			if(!_SpecialMovements){
				_SpecialMovements = new dmSpecialMovements();
			}
			return _SpecialMovements;
		}
		
		/////////////////////////////////////////////////////////////////////////////////////////////// Host Messaging
		[Bindable] private static var _HostMessaging:dmMessagingHost;
		public static function set HostMessaging(va:dmMessagingHost){
			_HostMessaging = va;
		}
		[Bindable] public static function get HostMessaging():dmMessagingHost{
			if(!_HostMessaging){
				_HostMessaging = new dmMessagingHost();
			}
			return _HostMessaging;
		}
		/////////////////////////////////////////////////////////////////////////////////////////////// Movement Nominations
		[Bindable] private static var _MovementNominations:dmMovements;
		public static function set MovementNominations(va:dmMovements){
			_MovementNominations = va;
		}
		[Bindable] public static function get MovementNominations():dmMovements{
			if(!_MovementNominations){
				//_MovementNominations = new dmMovements({orders:{ field:'MV_ID', order:'DESC' }, autopopulate:false});
				_MovementNominations = new dmMovements({orders:{ field:'MV_ID', order:'DESC' }});
				//_MovementNominations = new dmMovements();
			}
			return _MovementNominations;
		}
		/////////////////////////////////////////////////////////////////////////////////////////////// Movement Items
		[Bindable] private static var _MovementItems:dmMovementItems;
		public static function set MovementItems(va:dmMovementItems){
			_MovementItems = va;
		}
		[Bindable] public static function get MovementItems():dmMovementItems{
			if(!_MovementItems){
				//_MovementItems = new dmMovementItems({autopopulate:false});
				_MovementItems = new dmMovementItems();
			}
			return _MovementItems;
		}
		
		/////////////////////////////////////////////////////////////////////////////////////////////// Manual Transactions
		[Bindable] private static var _ManualTransactions:dmManualTransactions;
		public static function set ManualTransactions(va:dmManualTransactions){
			_ManualTransactions = va;
		}
		[Bindable] public static function get ManualTransactions():dmManualTransactions{
			if(!_ManualTransactions){
				_ManualTransactions = new dmManualTransactions();
			}
			return _ManualTransactions;
		}

		/////////////////////////////////////////////////////////////////////////////////////////////// Manual Transactions Data
		[Bindable] private static var _ManualTransactionsData:dmManualTransactionsData;
		public static function set ManualTransactionsData(va:dmManualTransactionsData){
			_ManualTransactionsData = va;
		}
		[Bindable] public static function get ManualTransactionsData():dmManualTransactionsData{
			if(!_ManualTransactionsData){
				_ManualTransactionsData = new dmManualTransactionsData();
			}
			return _ManualTransactionsData;
		}
		
		/////////////////////////////////////////////////////////////////////////////////////////////// Movement Scheduless
		[Bindable] private static var _MovementSchedules:dmMovementSchedules;
		public static function set MovementSchedules(va:dmMovementSchedules){
			_MovementSchedules = va;
		}
		[Bindable] public static function get MovementSchedules():dmMovementSchedules{
			if(!_MovementSchedules){
				//_MovementSchedules = new dmMovementSchedules({orders:{ field:'SHLS_TRIP_NO', order:'DESC' }});
				_MovementSchedules = new dmMovementSchedules();
			}
			return _MovementSchedules;
		}
		/////////////////////////////////////////////////////////////////////////////////////////////// Movement Schedule Items
		[Bindable] private static var _MovementScheduleItems:dmMovementScheduleItems;
		public static function set MovementScheduleItems(va:dmMovementScheduleItems){
			_MovementScheduleItems = va;
		}
		[Bindable] public static function get MovementScheduleItems():dmMovementScheduleItems{
			if(!_MovementScheduleItems){
				_MovementScheduleItems = new dmMovementScheduleItems();
			}
			return _MovementScheduleItems;
		}
		
		
		public static function trimLeadingZeros(o:Object, c:GridColumn):String{
			var str:String = o[c.dataField]; 
			if(str==null)return '';				
			while(str.charAt(0) == '0')str = str.substr(1);
			return str;
		}
		/////////////////////////////////////////////////////////////////////////////////////////////// Manual Transactions
		
		public static function dateTrim(item:Object, col:GridColumn=null):String{
			var s:Array;
			if(col==null){
				s = item.toString().split(":");s.pop();return s.join(":");
			}else{
				if(item[col.dataField]==null)return "";
				s = item[col.dataField].toString().split(":");s.pop();return s.join(":");
			}
			return "";
		}

		
		// END //
		public function DM(){
			
			if(init){
				init = false;
				//gateway.connect("/amfservices/gateway/bamf/gateway.php");
				//gateway.connect("/amfservices/gateway/amf2/index.php");
				gateway.connect(global.gatewayURL);
				if(global.mcp2p){
					cumulus.client = this;
					cumulus.addEventListener(IOErrorEvent.IO_ERROR, cumulusError);
					cumulus.addEventListener(NetStatusEvent.NET_STATUS, cumulusStatus);
					cumulus.connect(global.mcp2pServer);
				}
				
				
				
				
			}
		}
		
		protected function cumulusStatus(event:NetStatusEvent):void{
			trace("CUMULUS STATUS: " + event.info.code);
			
			if(event.info.code == "NetConnection.Connect.Success"){
				cumulusGroupSpecifier = new GroupSpecifier(global.mcp2pGroupID);
				cumulusGroupSpecifier.multicastEnabled 		= true;
				cumulusGroupSpecifier.postingEnabled 		= true;
				cumulusGroupSpecifier.serverChannelEnabled 	= true;
				//cumulusGroupSpecifier.routingEnabled 		= true;
				cumulusGroup = new NetGroup(cumulus,cumulusGroupSpecifier.groupspecWithoutAuthorizations());
				cumulusGroup.addEventListener(NetStatusEvent.NET_STATUS, cumulusGroupStatus);
			}
			
			
		}
		
		public static function post(message:Object, dmClass:String, action:String):void{
			message.user    = global.user; 
			message.dmClass = dmClass;
			message.action  = action;
			message.time  = new Date().time;
			trace("CUMULUS POST:", dmClass, action );
			if(cumulusGroup)cumulusGroup.post(message);
		}
		
		
		protected function cumulusGroupStatus(event:NetStatusEvent):void{
			trace(event.info.code);
			switch(event.info.code){
				case "NetGroup.Neighbor.Connect":
					cumulusNeighbourCount++;
					break;
				case "NetGroup.Neighbor.Disconnect":
					cumulusNeighbourCount--;
					break;
				case "NetGroup.Posting.Notify":
					var message:Object = event.info.message;
					cumulusGroupNotifications.addItem(message);
					trace(ObjectUtil.toString(cumulusGroupNotifications));
					
					if(message.dmClass == "dm.models::dmFolioSchedule"){
						//FolioSchedullings.reload();
						global.msgSuccess("Closeout Scheduling data update from peer: "+message.user);
					}
					
					break;
			}
		}
		
		protected function cumulusError(event:IOErrorEvent):void{
			trace("CUMULUS Error: " + event.errorID);			
		}
	}
}