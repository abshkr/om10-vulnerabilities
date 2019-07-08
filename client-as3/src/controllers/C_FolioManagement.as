package controllers
{
	import com.adobe.fiber.runtime.lib.DateTimeFunc;
	
	import components.ExportData;
	import components.FolioReports;
	import components.ResultDialog;
	
	import dm.DM;
	import dm.collections.dmFolioManagement;
	import dm.collections.dmSiteConfig;
	import dm.comms.amf;
	import dm.remoteDataService;
	
	import events.ObjEvent;
	
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.utils.Timer;
	import flash.utils.setTimeout;
	
	import mx.binding.utils.BindingUtils;
	import mx.collections.ArrayCollection;
	import mx.core.FlexGlobals;
	import mx.effects.IAbstractEffect;
	import mx.events.FlexEvent;
	import mx.events.IndexChangedEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	import mx.rpc.events.FaultEvent;
	import mx.rpc.events.ResultEvent;
	import mx.rpc.http.HTTPService;
	import mx.utils.ObjectUtil;
	
	import spark.components.DataGrid;
	import spark.components.NavigatorContent;
	import spark.components.gridClasses.GridColumn;
	import spark.events.GridSelectionEvent;
	import spark.events.IndexChangeEvent;
	import spark.formatters.DateTimeFormatter;
	
	import views.v_FolioManagement;
	
	public class C_FolioManagement extends EventDispatcher
	{
		private var errorDialog:ResultDialog;
		private var errGrid:ArrayCollection=new ArrayCollection();
		
		[Bindable] public var readOnly:Boolean = false;
		[Bindable] public var canReset:Boolean = false;
		[Bindable] public var canUpdate:Boolean = false;
		[Bindable] public var canCreate:Boolean = false;
		[Bindable] public var canDelete:Boolean = false;
		[Bindable] public var hasPassword:Boolean = false;
		[Bindable] public var coll:dmFolioManagement;
		[Bindable] public var hdr_details:ArrayCollection=new ArrayCollection([{id:'Meters'},{id:'Tanks'},{id:'Product Ownership'}]);
		private var _view:v_FolioManagement;
		
		[Bindable] public var closeoutMeters: ArrayCollection = new ArrayCollection();
		[Bindable] public var closeoutTanks: ArrayCollection = new ArrayCollection();
		[Bindable] public var closeoutProductOwners: ArrayCollection = new ArrayCollection();
		[Bindable] public var vo_tanks:Array;
		[Bindable] public var vo_meters:Array;
		
		public var gridCalcTypes:Array = new Array();
		public var gridCalcSources:Array = new Array();
		
		//[Bindable] public var startRange:Date = new Date();
		[Bindable] public var startRange:Date = DateTimeFunc.dateAdd( "d", -90, new Date() );
		[Bindable] public var endRange:Date = new Date();
		
		[Bindable] public var lblWidth:int = 80;
		
		[Bindable] public var canCloseFolio:Boolean=false;
		
		
		[Bindable] public var selectedFolioFrozen:Boolean = false;
		
		public var form_calc_status:Boolean=false;
		public var grid_calc_status:Boolean= false;
		public var valueStore:Object = {global_qty_obs_rnd:"-1", global_qty_std_rnd:"-1", global_qty_mass_rnd:"-1", global_qty_obs:"-1", global_qty_std:"-1", global_qty_mass:"-1"};
		
		private var _curStatus:Boolean = false;
		
		private var _service:amf ;
		
		private var PDSService:HTTPService = new HTTPService();
		
		[Bindable] public var updateLabel: String="Update Meters";
		
		private var frozenFolioList:remoteDataService = new remoteDataService( "ListLibraryService.lookupFolios", null, frozenFolioList_resultHandler );
		private var openFrozenFolioList:remoteDataService = new remoteDataService( "ListLibraryService.lookupOpenFrozenFolios", null, openFrozenFolioList_resultHandler );
		private var openFolioList:remoteDataService = new remoteDataService( "ListLibraryService.lookupFolios", null, openFolioList_resultHandler );
		
		private var QTY_AMB_TIME:Date = new Date();
		private var QTY_COR_TIME:Date = new Date();
		private var QTY_MASS_TIME:Date = new Date();
		
		
		public function adjustKeyTime():void
		{
			QTY_COR_TIME = new Date();
			QTY_MASS_TIME = new Date();
			QTY_AMB_TIME = new Date();
			QTY_AMB_TIME.time += 1; 
		}
		
		public function adjustButtonQtyCalc(): Boolean
		{
			//	if view.dgFolios.selectedItem.STATUS != 2;
			//	((detailNavigator.selectedIndex==0)?(dgMeters.selectedIndex !=-1):(dgTanks.selectedIndex !=-1))   &amp;&amp; 
			//	dgFolios.selectedIndex != -1  &amp;&amp;  dgFolios.selectedItem.STATUS != 2 &amp;&amp; controller.canUpdate == true &amp;&amp; (detailNavigator.selectedIndex == 1)
			
			var isEnabled:Boolean = false;
			
			if ( view.dgFolios.selectedIndex != -1 && view.dgFolios.selectedItem.STATUS != 2)
			{
				if ( view.detailNavigator.selectedIndex == 0 )
				{
					// Tab Meters 
					if ( view.dgMeters != null && view.dgMeters.selectedIndex !=-1 )
					{
						isEnabled = false; //this.canUpdate;
					}
					else
					{
						isEnabled = false;
					}
				}
				else
				{
					// Tab Tanks
					if ( view.dgTanks != null && view.dgTanks.selectedIndex !=-1 )
					{
						isEnabled = this.canUpdate;
					}
					else
					{
						isEnabled = false;
					}
				}
			}
			else
			{
				isEnabled = false;
			}
			
			return isEnabled;
		}
		
		
		public function adjustButtonBatchUpdate():Boolean
		{
			//{	((detailNavigator.selectedIndex==0)?(dgMeters.selectedIndex !=-1):(dgTanks.selectedIndex !=-1))   &amp;&amp; 
			//	dgFolios.selectedIndex != -1  &amp;&amp;  dgFolios.selectedItem.STATUS != 2 &amp;&amp; controller.canUpdate == true}	
			
			var isEnabled:Boolean = false;
			
			if ( view.dgFolios.selectedIndex != -1 && view.dgFolios.selectedItem.STATUS != 2)
			{
				if ( view.detailNavigator.selectedIndex == 0 )
				{
					// Tab Meters 
					if ( view.dgMeters != null && view.dgMeters.selectedIndex !=-1 )
					{
						isEnabled = this.canUpdate;
					}
					else
					{
						isEnabled = false;
					}
				}
				else
				{
					// Tab Tanks
					if ( view.dgTanks != null && view.dgTanks.selectedIndex !=-1 )
					{
						isEnabled = this.canUpdate;
					}
					else
					{
						isEnabled = false;
					}
				}
			}
			else
			{
				isEnabled = false;
			}
			
			return isEnabled;
		}
		
		
		public function adjustButtonDetailUpdate():Boolean
		{
			//((detailNavigator.selectedIndex==0)?(dgMeters.selectedIndex !=-1):(dgTanks.selectedIndex !=-1))   &amp;&amp; 
			// dgFolios.selectedIndex != -1
			
			var isEnabled:Boolean = false;
			
			if ( view.dgFolios.selectedIndex != -1 )
			{
				if ( view.detailNavigator.selectedIndex == 0 )
				{
					// Tab Meters 
					if ( view.dgMeters != null && view.dgMeters.selectedIndex !=-1 )
					{
						isEnabled = this.canUpdate;
					}
					else
					{
						isEnabled = false;
					}
				}
				else
				{
					// Tab Tanks
					if ( view.dgTanks != null && view.dgTanks.selectedIndex !=-1 )
					{
						isEnabled = this.canUpdate;
					}
					else
					{
						isEnabled = false;
					}
				}
			}
			else
			{
				isEnabled = false;
			}
			
			return isEnabled;
		}
		
		
		[Bindable ("updated")] public function get curStatus():Boolean
		{
			return _curStatus&&selectedFolioFrozen;
		}
		
		public function set curStatus(a:Boolean):void
		{
			_curStatus = a;
			dispatchEvent(new Event("upated"));
		}
		
		private var dateConvert:DateTimeFormatter=new DateTimeFormatter();
		private var reportPopup:FolioReports = new FolioReports();
		private var meterCount:int = 0;
		private var tankCount:int = 0;
		
		private var custMeters:ArrayCollection = new ArrayCollection([
			{field:'myfield1',title:'mytitle1'},
			{field:'myfield2',title:'mytitle2'},
			{field:'myfield3',title:'mytitle3'}
		]);
		
		private var genReport:ExportData = new ExportData();
		
		public function C_FolioManagement()
		{
			dateConvert.dateTimePattern="yyyy-MM-dd HH:mm:ss";
			//startRange.date = startRange.date-90;
			startRange = DateTimeFunc.dateAdd( "d", -90, new Date() );
			var sDate:String = dateConvert.format(startRange);
			var eDate:String = dateConvert.format(endRange);
			trace("what");
			//view.pb.values( 0, 0 );
			coll = new dmFolioManagement({
				order:{
					field:'CLOSEOUT_NR',
					order:'DESC'
				},
				resultHandler: foliosLoaded,
				range:{
					field:'PREV_CLOSEOUT_DATE',
					range:{
						start:sDate,
						end:eDate
					}
				}				
			});	
			_service = new amf(global.AppServicesConfig.gatewayURL);
			_service.service('dmsSiteConfigService.getCloseoutStatus',false, onLoad);
		}
		
		public function creationCompleteHandler(event:FlexEvent):void
		{
			this.refreshData(true);
		}
		
		public function onLoad(response:*):void
		{	
			// this will check the value of 'CLOSEOUT_AUTO_CLOSE' in SITE_CONFIG
			var obj:String = response.data[0].CONFIG_VALUE;
			canCloseFolio = (obj == "N") ? true : false;
			if (canCloseFolio == true) canCloseFolio = global.app.getUserPriv('89'); 
		}
		
		
		[Bindable]
		public function get view():v_FolioManagement
		{
			return _view;
		}
		
		public function set view(value:v_FolioManagement):void
		{
			_view = value;
			view.addEventListener('doReports',onDoReports);
			//view.addEventListener('dateChanged',dateRangeChanged);
		}
		
		private function onDoReports(event:Event):void
		{
			coll[view.dgFolios.selectedIndex].attachFolioReports();
			reportPopup.reports = coll[view.dgFolios.selectedIndex].folioReports;
			reportPopup.callback = generateReports;
			PopUpManager.addPopUp(reportPopup,FlexGlobals.topLevelApplication.main.widgetList,true);
			PopUpManager.centerPopUp(reportPopup);
			if (coll[view.dgFolios.selectedIndex].STATUS == "2")
				reportPopup.btn_generate.enabled= false
			else
				reportPopup.btn_generate.enabled = true;
		}
		
		private function generateReports(value:Object):void
		{
			coll[view.dgFolios.selectedIndex].generateFolioReports(value);
		}
		
		public function sortNumeric(obj1:Object, obj2:Object, gdc:GridColumn):Number{
			if(Number(obj1.payload.CLOSEOUT_NR) == Number(obj2.payload.CLOSEOUT_NR)) return 0;
			if(Number(obj1.payload.CLOSEOUT_NR) <  Number(obj2.payload.CLOSEOUT_NR)) return -1;
			return 1;
		}
		
		public function folioClicked(): void
		{
			if (view.currentState != 'widget' && view.dgFolios.selectedIndex > -1)
			{
				coll[view.dgFolios.selectedIndex].attachTanks(false, initCalcTank);
				closeoutTanks = coll[view.dgFolios.selectedIndex].getTanks();
				for ( var i:int=0; i<closeoutTanks.length;i++ )
				{
					gridCalcTypes[i] = "";
					gridCalcSources[i] = "";
				}
				coll[view.dgFolios.selectedIndex].attachMeters();
				closeoutMeters = coll[view.dgFolios.selectedIndex].getMeters();
				if (coll[view.dgFolios.selectedIndex].payload.STATUS!="2") selectedFolioFrozen=true else selectedFolioFrozen=false;
				view.currentState='details';
				if(view.dgMeters) view.dgMeters.selectedIndex=-1; 
				if(view.dgTanks) view.dgTanks.selectedIndex=-1;
				
				this.curStatus = curStatus&&selectedFolioFrozen;
				view.btn_batchUpdate.enabled = this.adjustButtonBatchUpdate();
				view.btn_detailUpdate.enabled = this.adjustButtonDetailUpdate();
				view.btn_qtyCalc.enabled = this.adjustButtonQtyCalc();
			}
			
		}
		
		public function folioSelected(event:GridSelectionEvent):void
		{
			if (view.currentState != 'widget')
			{
				
				coll[view.dgFolios.selectedIndex].attachTanks();
				closeoutTanks = coll[view.dgFolios.selectedIndex].getTanks();
				for ( var i:int=0; i<closeoutTanks.length;i++ )
				{
					gridCalcTypes[i] = "";
					gridCalcSources[i] = "";
				}
				coll[view.dgFolios.selectedIndex].attachMeters();
				closeoutMeters = coll[view.dgFolios.selectedIndex].getMeters();
				if (coll[view.dgFolios.selectedIndex].payload.STATUS=="2") selectedFolioFrozen=true else selectedFolioFrozen=false;
				view.currentState='details';
				if(view.dgMeters)view.dgMeters.selectedIndex=-1; 
				if(view.dgTanks) view.dgTanks.selectedIndex=-1;
			}
		}
		
		public function meterChangeHandler(event:GridSelectionEvent):void
		{
			curStatus=true;
			view.btn_batchUpdate.enabled = this.adjustButtonBatchUpdate();
			view.btn_detailUpdate.enabled = this.adjustButtonDetailUpdate();
			view.btn_qtyCalc.enabled = this.adjustButtonQtyCalc();
		}
		
		public function tankChangeHandler(event:GridSelectionEvent):void
		{
			curStatus=true;
			view.btn_batchUpdate.enabled = this.adjustButtonBatchUpdate();
			view.btn_detailUpdate.enabled = this.adjustButtonDetailUpdate();
			view.btn_qtyCalc.enabled = this.adjustButtonQtyCalc();
			
			if ( view.dgTanks.hasEventListener( "GRID_NUMBER_HAS_CHANGED" ) )
			{
				view.dgTanks.removeEventListener( "GRID_NUMBER_HAS_CHANGED", onGridNumberHasChanged );
			}
			view.dgTanks.addEventListener( "GRID_NUMBER_HAS_CHANGED", onGridNumberHasChanged );
			
		}
		
		public function onGridNumberHasChanged( event:ObjEvent ):void
		{
			var i;
			i = view.dgTanks.selectedIndex;
			
			trace("....................in onGridNumberHasChanged", i, event.data['cln']);
			
			if ( event.data['cln'] == "CLOSE_AMB_TOT_RND" )
			{
				closeoutTanks[i]["CLOSE_AMB_TOT"]  		 	= view.dgTanks.selectedItem.CLOSE_AMB_TOT_RND;
				closeoutTanks[i]["CLOSE_AMB_TOT_RND"]  		= view.dgTanks.selectedItem.CLOSE_AMB_TOT_RND;
				gridCalcTypes[i] = "LT";
				gridCalcSources[i] = "LT";
			}
			if ( event.data['cln'] == "CLOSE_STD_TOT_RND" )
			{
				closeoutTanks[i]["CLOSE_STD_TOT"]  		 	= view.dgTanks.selectedItem.CLOSE_STD_TOT_RND;
				closeoutTanks[i]["CLOSE_STD_TOT_RND"]  		= view.dgTanks.selectedItem.CLOSE_STD_TOT_RND;
				gridCalcTypes[i] = "L15";
				gridCalcSources[i] = "L15";
			}
			if ( event.data['cln'] == "CLOSE_MASS_TOT_RND" )
			{
				closeoutTanks[i]["CLOSE_MASS_TOT"] 		 	= view.dgTanks.selectedItem.CLOSE_MASS_TOT_RND;
				closeoutTanks[i]["CLOSE_MASS_TOT_RND"] 		= view.dgTanks.selectedItem.CLOSE_MASS_TOT_RND;
				gridCalcTypes[i] = "KG";
				gridCalcSources[i] = "KG";
			}
			trace("....................in onGridNumberHasChanged", i, closeoutTanks[i]["CLOSE_STD_TOT"], closeoutTanks[i]["CLOSE_STD_TOT_RND"]);
			trace("....................in onGridNumberHasChanged", i, closeoutTanks[i]["CLOSE_MASS_TOT"], closeoutTanks[i]["CLOSE_MASS_TOT_RND"]);
			
			// user may just changed temperature or density
			if ( event.data['cln'] == "CLOSE_TEMP" )
			{
				//closeoutTanks[i]["CLOSE_TEMP"] 		 	= view.dgTanks.selectedItem.CLOSE_TEMP;
				gridCalcSources[i] = "TEMP";
			}
			if ( event.data['cln'] == "CLOSE_DENSITY" )
			{
				//closeoutTanks[i]["CLOSE_DENSITY"] 		 	= view.dgTanks.selectedItem.CLOSE_DENSITY;
				gridCalcSources[i] = "DENS";
			}
			
		}
		
		public function closefolio(): void
		{	
			
			this.frozenFolioList.service( 1 );
			//DM.FolioSettings.manualCloseoutClose(function(response:*):void{global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.CLS_1ST_FRZ_FOLIO_REQ'));});
		}
		
		protected function frozenFolioList_resultHandler():void
		{	
			if ( frozenFolioList.length > 0 ) {
				DM.FolioSettings.manualCloseoutClose(function(response:*):void{global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.CLS_1ST_FRZ_FOLIO_REQ'));});
			}
			else {
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','global.msg.nofrozenfolios'));
			}
		}
		
		public function viewReport(): void
		{			
			PopUpManager.addPopUp(reportPopup,FlexGlobals.topLevelApplication.main.widgetList,true);
			PopUpManager.centerPopUp(reportPopup);
		}
		
		public function getStatusType(item:Object, col:GridColumn):String
		{
			switch(item.STATUS)
			{
				case "0" : return mx.resources.ResourceManager.getInstance().getString('default','global.msg.folio_open');
					break;
				case "1" : return mx.resources.ResourceManager.getInstance().getString('default','global.msg.folio_frozen');
					break;
				case "2" : return mx.resources.ResourceManager.getInstance().getString('default','global.msg.folio_closed');
					break;
				default : return mx.resources.ResourceManager.getInstance().getString('default','global.msg.folio_closed');
			}
		}

		public function getFolioName(item:Object, col:GridColumn): String
		{
			var fn:String = item.payload.PREV_CLOSEOUT_DATE;
			fn = item.payload.CLOSEOUT_NR+"_"+fn.substr(2,8);
			return fn;
			
		}
		
		public function refreshData(value:Boolean): void
		{
			if (value)
			{	
				startRange = new Date();
				endRange = new Date();
				//startRange.date = endRange.date-90;
				startRange = DateTimeFunc.dateAdd( "d", -90, new Date() );
				view.sd.selectedDate = startRange;
				view.sd.currentDate = global.getDateString(startRange);
				view.ed.selectedDate = endRange;
			}
			reloadFolios();
			
		}
		
		public function dateRangeChanged():void
		{
			if (view.sd.selectedDate < view.ed.selectedDate)
			{	
				reloadFolios();
			}
			else
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.DATE_RANGE_INVALID'));
		}
		
		private function reloadFolios():void
		{
			view.dgFolios.sortableColumns=false;
			view.pb.values( 0, 0 );
			coll = new dmFolioManagement({
				order:{
					field:'CLOSEOUT_NR',
					order:'DESC'
				},
				resultHandler: foliosLoaded,
				range:
				{
					field:'PREV_CLOSEOUT_DATE',
					range:
					{
						start:dateConvert.format(view.sd.selectedDate),
						end:dateConvert.format(view.ed.selectedDate)
					}
				}				
			});
			coll.refresh();
			view.dgFolios.sortableColumns=true;
		}
		
		protected function foliosLoaded():void
		{
			view.pb.values( coll.length, coll.totalCount, true);
		}
		
		public function setEdit(): void
		{
			if (view.detailNavigator.selectedIndex == 0)
			{
				view.currentState = 'editmeters';
			}
			else
			{
				view.currentState = 'edittanks';
				view.tnk_density.text = view.dgTanks.selectedItem.CLOSE_DENSITY;
				view.tnk_temp.text = view.dgTanks.selectedItem.CLOSE_TEMP;
				view.tnk_desc.text = view.dgTanks.selectedItem.DESCRIPTION;
				view.tnk_mass.text = view.dgTanks.selectedItem.CLOSE_MASS_TOT_RND;
				view.tnk_tot.text = view.dgTanks.selectedItem.CLOSE_STD_TOT_RND;
				//view.tnk_tot_obs.text = String(int(Number(view.dgTanks.selectedItem.CLOSE_AMB_TOT)+0.5));
				view.tnk_tot_obs.text = view.dgTanks.selectedItem.CLOSE_AMB_TOT_RND;
				
				valueStore.global_qty_mass_rnd = "-1";
				valueStore.global_qty_std_rnd = "-1";
				valueStore.global_qty_mass = view.dgTanks.selectedItem.CLOSE_MASS_TOT;
				valueStore.global_qty_std = view.dgTanks.selectedItem.CLOSE_STD_TOT;
				
				valueStore.global_qty_obs_rnd = "-1";
				valueStore.global_qty_obs = view.dgTanks.selectedItem.CLOSE_AMB_TOT;
			}
		}
		
		public function saveMeters(): void
		{
			var Folio:int = int(coll[view.dgFolios.selectedIndex].CLOSEOUT_NR)+1;
			
			closeoutMeters[view.dgMeters.selectedIndex].payload.FOLIO = Folio;
			closeoutMeters[view.dgMeters.selectedIndex].payload.CLOSE_AMB_TOT = view.stdInp.text;
			closeoutMeters[view.dgMeters.selectedIndex].payload.CLOSE_MASS_TOT = view.massInp.text;
			closeoutMeters[view.dgMeters.selectedIndex].payload.DESCRIPTION = view.meterdesc.text;
			closeoutMeters[view.dgMeters.selectedIndex].payload.ADJ_AMB_TOT = view.ltrInp.text;
			closeoutMeters[view.dgMeters.selectedIndex].payload.ADJ_MASS_TOT = view.kgInp.text;
			closeoutMeters[view.dgMeters.selectedIndex].payload.ADJ_DESCRIPTION = view.adjReason.text;
			
			closeoutMeters[view.dgMeters.selectedIndex].payload.USER_CODE = global.user;
			closeoutMeters[view.dgMeters.selectedIndex].payload.LAST_CHG_TIME = dateConvert.format(new Date());
			closeoutMeters[view.dgMeters.selectedIndex].update({onSuccess:updateMeterResult});
		}
		
		protected function updateMeterResult(params:*): void
		{
			if (params.resultOK==true)
				global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.MTR_UPD_SUCC'));
			else
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.MTR_UPD_FAIL'));
			view.currentState="details";
			folioClicked()
		}
		
		
		public function cancelTanks(): void
		{
			view.currentState='details';
			trace(".............................cancelTanks", valueStore.global_qty_std_rnd, valueStore.global_qty_mass_rnd, valueStore.global_qty_std, valueStore.global_qty_mass);
		}		
		
		public function saveTanks(): void
		{
			if( view.tnk_temp.text && (Number(view.tnk_temp.text) < global.MIN_TEMPERATURE || Number(view.tnk_temp.text) > global.MAX_TEMPERATURE) ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.OBS_TEMP_OUTRANGE')+ String(global.MIN_TEMPERATURE) + "~" + String(global.MAX_TEMPERATURE) + ".");
				return;
			}			
			if( view.tnk_density.text!="" && (Number(view.tnk_density.text) < closeoutTanks[view.dgTanks.selectedIndex]["BCLASS_DENS_LO"] || Number(view.tnk_density.text) > closeoutTanks[view.dgTanks.selectedIndex]["BCLASS_DENS_HI"]) ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.STD_DENS_OUTRANGE')+ String(closeoutTanks[view.dgTanks.selectedIndex]["BCLASS_DENS_LO"]) + "~" + String(closeoutTanks[view.dgTanks.selectedIndex]["BCLASS_DENS_HI"]) + ".");
				return;
			}			
/*			if(Number(view.tnk_density.text) < global.MIN_DENSITY || Number(view.tnk_density.text) > global.MAX_DENSITY ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.STD_DENS_OUTRANGE')+ String(global.MIN_DENSITY) + "~" + String(global.MAX_DENSITY) + ".");
				return;
			}			
*/			
			trace(".............................saveTanks", valueStore.global_qty_std_rnd, valueStore.global_qty_mass_rnd, valueStore.global_qty_std, valueStore.global_qty_mass);
			if ( valueStore.global_qty_std_rnd != "-1" )
			{
				closeoutTanks[view.dgTanks.selectedIndex]["CLOSE_STD_TOT"]  		 	= valueStore.global_qty_std_rnd;
				closeoutTanks[view.dgTanks.selectedIndex]["CLOSE_STD_TOT_RND"]  		= valueStore.global_qty_std_rnd;
			}
			if ( valueStore.global_qty_mass_rnd != "-1" )
			{
				closeoutTanks[view.dgTanks.selectedIndex]["CLOSE_MASS_TOT"]  		 	= valueStore.global_qty_mass_rnd;
				closeoutTanks[view.dgTanks.selectedIndex]["CLOSE_MASS_TOT_RND"]  		= valueStore.global_qty_mass_rnd;
			}
			if ( valueStore.global_qty_std != "-1" )
			{
				closeoutTanks[view.dgTanks.selectedIndex]["CLOSE_STD_TOT"]  		 	= valueStore.global_qty_std;
				closeoutTanks[view.dgTanks.selectedIndex]["CLOSE_STD_TOT_RND"]  		= String(int(Number(valueStore.global_qty_std)+0.5));
			}
			if ( valueStore.global_qty_mass != "-1" )
			{
				closeoutTanks[view.dgTanks.selectedIndex]["CLOSE_MASS_TOT"]  		 	= valueStore.global_qty_mass;
				closeoutTanks[view.dgTanks.selectedIndex]["CLOSE_MASS_TOT_RND"]  		= String(int(Number(valueStore.global_qty_mass)+0.5));
			}
			
			if ( valueStore.global_qty_obs_rnd != "-1" )
			{
				closeoutTanks[view.dgTanks.selectedIndex]["CLOSE_AMB_TOT"]  		 	= valueStore.global_qty_obs_rnd;
				closeoutTanks[view.dgTanks.selectedIndex]["CLOSE_AMB_TOT_RND"]  		= valueStore.global_qty_obs_rnd;
			}
			if ( valueStore.global_qty_obs != "-1" )
			{
				closeoutTanks[view.dgTanks.selectedIndex]["CLOSE_AMB_TOT"]  		 	= valueStore.global_qty_obs;
				closeoutTanks[view.dgTanks.selectedIndex]["CLOSE_AMB_TOT_RND"]  		= String(int(Number(valueStore.global_qty_obs)+0.5));
			}
			
			
			var Folio:int = int(coll[view.dgFolios.selectedIndex].CLOSEOUT_NR)+1;
			closeoutTanks[view.dgTanks.selectedIndex].payload.FOLIO = Folio;
			//closeoutTanks[view.dgTanks.selectedIndex].payload.CLOSE_STD_TOT = view.tnk_tot.text;
			//closeoutTanks[view.dgTanks.selectedIndex].payload.CLOSE_MASS_TOT = view.tnk_mass.text;
			closeoutTanks[view.dgTanks.selectedIndex].payload.CLOSE_STD_TOT = closeoutTanks[view.dgTanks.selectedIndex].CLOSE_STD_TOT;
			closeoutTanks[view.dgTanks.selectedIndex].payload.CLOSE_MASS_TOT = closeoutTanks[view.dgTanks.selectedIndex].CLOSE_MASS_TOT;
			closeoutTanks[view.dgTanks.selectedIndex].payload.CLOSE_AMB_TOT = closeoutTanks[view.dgTanks.selectedIndex].CLOSE_AMB_TOT;
			
			closeoutTanks[view.dgTanks.selectedIndex].payload.CLOSE_DENSITY = view.tnk_density.text;
			closeoutTanks[view.dgTanks.selectedIndex].payload.CLOSE_TEMP = view.tnk_temp.text;
			closeoutTanks[view.dgTanks.selectedIndex].payload.DESCRIPTION = view.tnk_desc.text;
			closeoutTanks[view.dgTanks.selectedIndex].payload.USER_CODE = global.user;
			closeoutTanks[view.dgTanks.selectedIndex].payload.LAST_CHG_TIME = dateConvert.format(new Date());
			closeoutTanks[view.dgTanks.selectedIndex].update({onSuccess:updateTankResult});
			initCalcTank();
		}
		
		protected function updateTankResult(params:*): void
		{
			if (params.resultOK==true)
				global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.TANK_UPD_SUCC'));
			else
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.TANK_UPD_FAIL'));
			view.currentState="details";
			coll[view.dgFolios.selectedIndex].attachTanks();
			folioClicked()
		}
		
		public function getMeterType(item:Object, col:GridColumn):String
		{
			var fn:String =(item.BAM_QTY_TYPE == "1")?'mass':'vol.';
			return fn;
		}
		
		public function getMassInfo(item:Object, col:GridColumn): String
		{
			if (item.BAM_QTY_TYPE == "1")
			{
				if (item.CLOSE_MASS_TOT == null) return "" else return item.CLOSE_MASS_TOT;
			}
			else
				return "";
		}
		
		public function getVolInfo(item:Object, col:GridColumn): String
		{
			if (item.BAM_QTY_TYPE != "1")
			{
				if (item.CLOSE_AMB_TOT == null) return "" else return item.CLOSE_AMB_TOT;
			}
			else
				return "";
		}
		
		public function  calculate():void
		{
			if( view.tnk_temp.text!="" && (Number(view.tnk_temp.text) < global.MIN_TEMPERATURE || Number(view.tnk_temp.text) > global.MAX_TEMPERATURE) ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.OBS_TEMP_OUTRANGE')+ String(global.MIN_TEMPERATURE) + "~" + String(global.MAX_TEMPERATURE) + ".");
				return;
			}			
			if( view.tnk_density.text!="" && (Number(view.tnk_density.text) < closeoutTanks[view.dgTanks.selectedIndex]["BCLASS_DENS_LO"] || Number(view.tnk_density.text) > closeoutTanks[view.dgTanks.selectedIndex]["BCLASS_DENS_HI"]) ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.STD_DENS_OUTRANGE')+ String(closeoutTanks[view.dgTanks.selectedIndex]["BCLASS_DENS_LO"]) + "~" + String(closeoutTanks[view.dgTanks.selectedIndex]["BCLASS_DENS_HI"]) + ".");
				return;
			}			

			this.form_calc_status = true;
			valueStore.global_qty_std_rnd="-1";
			valueStore.global_qty_mass_rnd="-1";
			valueStore.global_qty_std="-1";
			valueStore.global_qty_mass="-1";
			valueStore.global_qty_obs_rnd="-1";
			valueStore.global_qty_obs="-1";
			
			var k:int;
			k = view.dgTanks.selectedIndex;
			if ( view.tnk_density.text.length==0 && view.tnk_temp.text.length>0 && (view.tnk_tot_obs.text.length > 0 || view.tnk_tot.text.length > 0 || view.tnk_mass.text.length > 0) )
			{
				view.tnk_density.text = closeoutTanks[k].TANK_DENSITY;
			}
			
			var baseCode:String = view.dgTanks.selectedItem.payload.TANK_BASE;
			var TEMP_AMB:String = view.tnk_temp.text;
			var DENS_COR:String = view.tnk_density.text;
			var QTY_AMB:String = view.tnk_tot_obs.text;
			var QTY_COR:String = view.tnk_tot.text;
			var MASS_AMB:String = view.tnk_mass.text;
			var type:String     = "LT";
			var qty:Number      = Number(QTY_AMB);
			
			var srcObj:Object = global.getQuantitySourceForCalculation(QTY_AMB_TIME, QTY_COR_TIME, QTY_MASS_TIME, QTY_AMB, QTY_COR, MASS_AMB, QTY_AMB, QTY_COR, MASS_AMB);
			type = srcObj.type;
			qty = srcObj.qty;
			
			var url:String = "../phpwrapper/calcvcf.php?frm_baseCd="+baseCode+"&frm_which_type="+type+"&frm_real_amount="+qty+"&frm_real_temp="+TEMP_AMB+"&frm_real_dens="+DENS_COR;
			//var url:String = "../phpwrapper/calcvcf.php?frm_baseCd="+view.dgTanks.selectedItem.payload.TANK_BASE+"&frm_which_type=LT&frm_real_amount="+view.tnk_tot_obs.text+"&frm_real_temp="+view.tnk_temp.text+"&frm_real_dens="+view.tnk_density.text;
			
			var urlLoader:URLLoader = new URLLoader();
			urlLoader.addEventListener(Event.COMPLETE, function():void{
				var tmp:XML = XML(urlLoader.data);
				trace("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV", tmp.REAL_LITRE, tmp.REAL_LITRE15, tmp.REAL_KG);
				
				var i;
				i = view.dgTanks.selectedIndex;
				//closeoutTanks[i]["CLOSE_AMB_TOT"]  		 = String((tmp.REAL_LITRE));
				valueStore.global_qty_obs  		 = String((tmp.REAL_LITRE));
				valueStore.global_qty_std  		 = String((tmp.REAL_LITRE15));
				valueStore.global_qty_mass 		 = String((tmp.REAL_KG));
				view.tnk_tot_obs.text  		 = String(int(Number(tmp.REAL_LITRE)+0.5));
				view.tnk_tot.text  		 = String(int(Number(tmp.REAL_LITRE15)+0.5));
				view.tnk_mass.text 		 = String(int(Number(tmp.REAL_KG)+0.5));
				trace("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV", valueStore.global_qty_std, valueStore.global_qty_mass);

/*				closeoutTanks[i]["CLOSE_AMB_TOT"]  		 = String((tmp.REAL_LITRE));
				closeoutTanks[i]["CLOSE_STD_TOT"]  		 = String((tmp.REAL_LITRE15));
				closeoutTanks[i]["CLOSE_MASS_TOT"] 		 = String((tmp.REAL_KG));
				closeoutTanks[i]["CLOSE_AMB_TOT_RND"]  		 = String(int(Number(tmp.REAL_LITRE)+0.5));
				closeoutTanks[i]["CLOSE_STD_TOT_RND"]  		 = String(int(Number(tmp.REAL_LITRE15)+0.5));
				closeoutTanks[i]["CLOSE_MASS_TOT_RND"] 		 = String(int(Number(tmp.REAL_KG)+0.5));
				view.tnk_tot_obs.text  	= closeoutTanks[i]["CLOSE_AMB_TOT_RND"];
				view.tnk_tot.text  		= closeoutTanks[i]["CLOSE_STD_TOT_RND"];
				view.tnk_mass.text 		= closeoutTanks[i]["CLOSE_MASS_TOT_RND"];	
*/				
				
				/*				closeoutTanks[i].payload["CLOSE_AMB_TOT"]  		 = String((tmp.REAL_LITRE));
				closeoutTanks[i].payload["CLOSE_STD_TOT"]  		 = String((tmp.REAL_LITRE15));
				closeoutTanks[i].payload["CLOSE_MASS_TOT"] 		 = String((tmp.REAL_KG));
				closeoutTanks[i].payload["CLOSE_AMB_TOT_RND"]  		 = String(int(tmp.REAL_LITRE));
				closeoutTanks[i].payload["CLOSE_STD_TOT_RND"]  		 = String(int(tmp.REAL_LITRE15));
				closeoutTanks[i].payload["CLOSE_MASS_TOT_RND"] 		 = String(int(tmp.REAL_KG));
				*/				
			});
			try{urlLoader.load(new URLRequest(url));}catch(e:Error){}
		}
		
		public function tankAmbQtyChangedInForm():void
		{
			var i;
			
			i = view.dgTanks.selectedIndex;
			//closeoutTanks[i]["CLOSE_AMB_TOT"]  		 	= view.tnk_tot_obs.text;
			//closeoutTanks[i]["CLOSE_AMB_TOT_RND"]  		= view.tnk_tot_obs.text;
			valueStore.global_qty_obs_rnd = view.tnk_tot_obs.text;
			trace("........................ in tankAmbQtyChangedInForm", valueStore.global_qty_obs);
			valueStore.global_qty_obs = "-1";
			
			trace("........................ in tankAmbQtyChangedInForm", valueStore.global_qty_obs);
			QTY_AMB_TIME = new Date();
		}
		
		public function tankMassQtyChangedInForm():void
		{
			var i;
			
			i = view.dgTanks.selectedIndex;
			//closeoutTanks[i]["CLOSE_MASS_TOT"]  		 	= view.tnk_mass.text;
			//closeoutTanks[i]["CLOSE_MASS_TOT_RND"]  		= view.tnk_mass.text;
			valueStore.global_qty_mass_rnd = view.tnk_mass.text;
			trace("........................ in tankMassQtyChangedInForm", valueStore.global_qty_mass);
			valueStore.global_qty_mass = "-1";
			
			trace("........................ in tankMassQtyChangedInForm", valueStore.global_qty_mass);
			QTY_MASS_TIME = new Date();
		}
		
		public function tankStdQtyChangedInForm():void
		{
			var i;
			
			i = view.dgTanks.selectedIndex;
			//closeoutTanks[i]["CLOSE_STD_TOT"]  		 	= view.tnk_tot.text;
			//closeoutTanks[i]["CLOSE_STD_TOT_RND"]  		= view.tnk_tot.text;
			valueStore.global_qty_std_rnd = view.tnk_tot.text;
			trace("........................ in tankStdQtyChangedInForm", valueStore.global_qty_std);
			valueStore.global_qty_std = "-1";
			trace("........................ in tankStdQtyChangedInForm", valueStore.global_qty_std);
			QTY_COR_TIME = new Date();
		}
		
		public function navigator_changeHandler(event:IndexChangedEvent):void
		{
			curStatus=false; 
			view.dgMeters.selectedIndex=-1; 
			view.dgTanks.selectedIndex=-1;
			
			view.btn_qtyCalc.enabled = false;
			if ( event.newIndex == 1 )
			{
				if ( view.dgTanks.selectedIndex >= 0 )
				{
					view.btn_qtyCalc.enabled = true;
				}
			}
			view.btn_detailUpdate.enabled = false;
			if ( (event.newIndex == 1 && view.dgTanks.selectedIndex >= 0) || (event.newIndex == 0 && view.dgMeters.selectedIndex >= 0) )
			{
				view.btn_detailUpdate.enabled = true;
			}
			
			updateLabel = 'Update ' + (view.detailNavigator.getChildAt(event.newIndex) as NavigatorContent).label;
			initCalcTank();
		}
		
		public function doUpdate(): void
		{
			trace('updating meter');
			if (view.detailNavigator.selectedIndex == 0)
			{
				meterCount=0;
				errGrid.removeAll();
				if ( checkGroupMeters() )
				{
					updateMeters();
				}
			}
			if (view.detailNavigator.selectedIndex == 1)
			{
				tankCount=0;
				errGrid.removeAll();
				if ( checkGroupTanks() )
				{
					updateTanks();
				}
			}
		}
		
		private function checkGroupMeters():Boolean
		{
			var i:int=0;
			
			
			for ( i=0; i<closeoutMeters.length; i++ )
			{
				if (closeoutMeters[i].payload.CLOSE_MASS_TOT != closeoutMeters[i].CLOSE_MASS_TOT ||
					closeoutMeters[i].payload.CLOSE_STD_TOT  != closeoutMeters[i].CLOSE_STD_TOT ||
					closeoutMeters[i].payload.CLOSE_AMB_TOT  != closeoutMeters[i].CLOSE_AMB_TOT)
				{
					return true;
				}
			}
			
			global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','global.msg.allmeterdatanotchanged') );
			return false;
		}
		
		private function checkGroupTanks():Boolean
		{
			var i:int=0;
			
			for ( i=0; i<closeoutTanks.length; i++ )
			{
				if (Number(closeoutTanks[i].payload.CLOSE_MASS_TOT) != Number(closeoutTanks[i].CLOSE_MASS_TOT) ||
					Number(closeoutTanks[i].payload.CLOSE_STD_TOT)  != Number(closeoutTanks[i].CLOSE_STD_TOT)  ||
					//Number(closeoutTanks[i].payload.CLOSE_AMB_TOT)  != Number(closeoutTanks[i].CLOSE_AMB_TOT)  ||
					Number(closeoutTanks[i].payload.CLOSE_DENSITY)  != Number(closeoutTanks[i].CLOSE_DENSITY)  ||
					Number(closeoutTanks[i].payload.CLOSE_TEMP)     != Number(closeoutTanks[i].CLOSE_TEMP)	 ||
					closeoutTanks[i].payload.DESCRIPTION    		 != closeoutTanks[i].DESCRIPTION )
				{
					return true;
				}
			}
			
			global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','global.msg.alltankdatanotchanged') );
			return false;
		}
		
		private function updateMeters():void
		{
			if (closeoutMeters.length > meterCount)
			{				
				var Folio:int = int(coll[view.dgFolios.selectedIndex].CLOSEOUT_NR)+1;
				if (closeoutMeters[meterCount].payload.CLOSE_MASS_TOT != closeoutMeters[meterCount].CLOSE_MASS_TOT ||
					closeoutMeters[meterCount].payload.CLOSE_STD_TOT  != closeoutMeters[meterCount].CLOSE_STD_TOT ||
					closeoutMeters[meterCount].payload.CLOSE_AMB_TOT  != closeoutMeters[meterCount].CLOSE_AMB_TOT)
				{
					closeoutMeters[meterCount].payload.FOLIO 			= Folio;
					closeoutMeters[meterCount].payload.CLOSE_AMB_TOT 	= closeoutMeters[meterCount].CLOSE_AMB_TOT;
					closeoutMeters[meterCount].payload.CLOSE_MASS_TOT 	= closeoutMeters[meterCount].CLOSE_MASS_TOT;
					closeoutMeters[meterCount].payload.CLOSE_STD_TOT 	= closeoutMeters[meterCount].CLOSE_STD_TOT;
					closeoutMeters[meterCount].payload.DESCRIPTION 		= "";
					closeoutMeters[meterCount].payload.USER_CODE		= global.user;
					closeoutMeters[meterCount].payload.LAST_CHG_TIME 	= dateConvert.format(new Date());
					closeoutMeters[meterCount].update({onSuccess:updateGroupMeterResult});
					
					var obj:Object=new Object();
					obj['name'] = closeoutMeters[meterCount].payload.METER_CODE;
					obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','global.msg.meterdatachanged') + closeoutMeters[meterCount].payload.METER_CODE;
					errGrid.addItem( obj );
				}
				else
				{
					var obj:Object=new Object();
					obj['name'] = closeoutMeters[meterCount].payload.METER_CODE;
					obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','global.msg.meterdatanotchanged') + closeoutMeters[meterCount].payload.METER_CODE;
					errGrid.addItem( obj );
				}
			}
			meterCount +=1;
			if (closeoutMeters.length > meterCount){
				updateMeters();
			}else {
				coll[view.dgFolios.selectedIndex].attachMeters();
				closeoutMeters = coll[view.dgFolios.selectedIndex].getMeters();
				trace("BLEH");
				if ( errGrid.length > 0 && closeoutMeters.length == meterCount)
				{
					errorDialog = new ResultDialog( function():void{errGrid.removeAll();}, "", errGrid, mx.resources.ResourceManager.getInstance().getString('default','global.msg.operresult'), "LOADMETER.LABEL.BAM_CODE");
				}
			}
		}
		
		private function updateTanks(): void
		{
			if (closeoutTanks.length > tankCount)
			{
				trace( "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", closeoutTanks[tankCount].CLOSE_DENSITY );
				if( ( closeoutTanks[tankCount].CLOSE_TEMP!=null && closeoutTanks[tankCount].CLOSE_TEMP!="") && (Number(closeoutTanks[tankCount].CLOSE_TEMP) < global.MIN_TEMPERATURE || Number(closeoutTanks[tankCount].CLOSE_TEMP) > global.MAX_TEMPERATURE) ){
					global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.OBS_TEMP_OUTRANGE')+ String(global.MIN_TEMPERATURE) + "~" + String(global.MAX_TEMPERATURE) + mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.IN_TANK') + closeoutTanks[tankCount]["TANK_CODE"] +".");
					return;
				}		
				
				if( ( closeoutTanks[tankCount].CLOSE_DENSITY!=null && closeoutTanks[tankCount].CLOSE_DENSITY!="") && (Number(closeoutTanks[tankCount].CLOSE_DENSITY) < closeoutTanks[tankCount]["BCLASS_DENS_LO"] || Number(closeoutTanks[tankCount].CLOSE_DENSITY) > closeoutTanks[tankCount]["BCLASS_DENS_HI"]) ){
					global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.STD_DENS_OUTRANGE')+ String(closeoutTanks[tankCount]["BCLASS_DENS_LO"]) + "~" + String(closeoutTanks[tankCount]["BCLASS_DENS_HI"]) + mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.IN_TANK') + closeoutTanks[tankCount]["TANK_CODE"] +".");
					return;
				}	
				
			
				
				trace (".......................in updateTanks", closeoutTanks[tankCount].payload.CLOSE_MASS_TOT, closeoutTanks[tankCount].CLOSE_MASS_TOT);
				trace (".......................in updateTanks", closeoutTanks[tankCount].payload.CLOSE_STD_TOT, closeoutTanks[tankCount].CLOSE_STD_TOT);
				var Folio:int = int(coll[view.dgFolios.selectedIndex].CLOSEOUT_NR)+1;
				if (Number(closeoutTanks[tankCount].payload.CLOSE_MASS_TOT) != Number(closeoutTanks[tankCount].CLOSE_MASS_TOT) ||
					Number(closeoutTanks[tankCount].payload.CLOSE_STD_TOT)  != Number(closeoutTanks[tankCount].CLOSE_STD_TOT)  ||
					//Number(closeoutTanks[tankCount].payload.CLOSE_AMB_TOT)  != Number(closeoutTanks[tankCount].CLOSE_AMB_TOT)  ||
					Number(closeoutTanks[tankCount].payload.CLOSE_DENSITY)  != Number(closeoutTanks[tankCount].CLOSE_DENSITY)  ||
					Number(closeoutTanks[tankCount].payload.CLOSE_TEMP)     != Number(closeoutTanks[tankCount].CLOSE_TEMP)	 ||
					closeoutTanks[tankCount].payload.DESCRIPTION    		 != closeoutTanks[tankCount].DESCRIPTION )
				{
					closeoutTanks[tankCount].payload.FOLIO            = Folio;
					closeoutTanks[tankCount].payload.CLOSE_STD_TOT    = closeoutTanks[tankCount].CLOSE_STD_TOT;
					closeoutTanks[tankCount].payload.CLOSE_MASS_TOT   = closeoutTanks[tankCount].CLOSE_MASS_TOT;
					closeoutTanks[tankCount].payload.CLOSE_DENSITY    = closeoutTanks[tankCount].CLOSE_DENSITY;
					closeoutTanks[tankCount].payload.CLOSE_TEMP       = closeoutTanks[tankCount].CLOSE_TEMP;
					closeoutTanks[tankCount].payload.DESCRIPTION      = closeoutTanks[tankCount].DESCRIPTION;
					closeoutTanks[tankCount].payload.USER_CODE        = global.user;
					closeoutTanks[tankCount].payload.LAST_CHG_TIME    = dateConvert.format(new Date());
					closeoutTanks[tankCount].update({onSuccess:updateGroupTankResult});
					
					var obj:Object=new Object();
					obj['name'] = closeoutTanks[tankCount].payload.TANK_CODE;
					obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','global.msg.tankdatachanged') + closeoutTanks[tankCount].payload.TANK_CODE;
					errGrid.addItem( obj );
				}
				else
				{
					var obj:Object=new Object();
					obj['name'] = closeoutTanks[tankCount].payload.TANK_CODE;
					obj['description'] = mx.resources.ResourceManager.getInstance().getString('default','global.msg.tankdatanotchanged') + closeoutTanks[tankCount].payload.TANK_CODE;
					errGrid.addItem( obj );
				}
				
			}
			tankCount += 1;
			if (closeoutTanks.length > tankCount) {
				updateTanks();
			}
			else {
				if ( errGrid.length > 0 && closeoutTanks.length == tankCount )
				{
					errorDialog = new ResultDialog( function():void{errGrid.removeAll();}, "", errGrid, mx.resources.ResourceManager.getInstance().getString('default','global.msg.operresult'), "TANK_CODE");
				}
			}
				
		}
		
		protected function updateGroupMeterResult(params:*): void
		{
			if (params.resultOK==true)
				global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.MTRS_UPD_SUCC'));
			else
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.MTRS_UPD_FAIL'));
			updateMeters();
		}
		
		protected function updateGroupTankResult(params:*): void
		{
			if (params.resultOK==true)
				global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.TANKS_UPD_SUCC'));
			else
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.TANKS_UPD_FAIL'));
			updateTanks();
		}
		
		public function generatePDS(): void
		{
			//this.openFrozenFolioList.service( );
			this.openFolioList.service( 0 );
		}
		
		protected function openFrozenFolioList_resultHandler():void
		{
			if ( openFrozenFolioList.length > 0 ) {
				doGeneratePDS();
			}
			else {
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','global.msg.nofrozenandopenfolios'));
			}
		}
		
		protected function openFolioList_resultHandler():void
		{
			if ( openFolioList.length > 0 ) {
				doGeneratePDS();
			}
			else {
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','global.msg.noopenfolios'));
			}
		}
		
		public function doGeneratePDS(): void
		{
			PDSService.url = "/phpwrapper/pds.php";
			PDSService.resultFormat="e4x";
			PDSService.method="POST";
			PDSService.addEventListener(FaultEvent.FAULT,onPDSFault);
			PDSService.addEventListener(ResultEvent.RESULT,onPDSResult);
			PDSService.send();
		}
		
		protected function onPDSResult(event:ResultEvent):void
		{
			var tmpRes:int = -1;
			if ( (event.result as XML) != null )
			{
				tmpRes = int((event.result as XML).Result);
			}
			if (tmpRes==0)
				global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.PDS_ADD_SUCC'));
			else
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.PDS_ADD_FAIL'));
			PDSService.removeEventListener(ResultEvent.RESULT,onPDSResult);
			PDSService.removeEventListener(FaultEvent.FAULT,onPDSFault);
		}
		
		protected function onPDSFault(event:FaultEvent):void
		{
			global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.NETWORK_ERR'));
			PDSService.removeEventListener(ResultEvent.RESULT,onPDSResult);
			PDSService.removeEventListener(FaultEvent.FAULT,onPDSFault);
		}
		
		
		public function calcMeter():void{			
			
			var calcBase:Function = function(i:int = 0):void{
				if(i>=closeoutMeters.length){
					trace("done calc");
					closeoutMeters.refresh();
					trace(ObjectUtil.toString(closeoutMeters));
					return;
				}
				var obs:String  = (closeoutMeters[i].CLOSE_AMB_TOT 		== null)?"":closeoutMeters[i].CLOSE_AMB_TOT;
				var std:String  = (closeoutMeters[i].CLOSE_STD_TOT 		== null)?"":closeoutMeters[i].CLOSE_STD_TOT;
				var mass:String = (closeoutMeters[i].CLOSE_MASS_TOT 	== null)?"":closeoutMeters[i].CLOSE_MASS_TOT;
				var temp:String = (closeoutMeters[i].STREAM_TANKTEMP 	== null)?"":closeoutMeters[i].STREAM_TANKTEMP;
				var dens:String = (closeoutMeters[i].STREAM_TANKDEN 	== null)?"":closeoutMeters[i].STREAM_TANKDEN;
				var base:String = (closeoutMeters[i].STREAM_BASECODE 	== null)?"":closeoutMeters[i].STREAM_BASECODE;
				if(temp.length == 0 || dens.length == 0 || isNaN(Number(temp)) || isNaN(Number(dens)) || Number(dens) == 0){
					trace("line "+i+" invalid line due to temp, density");calcBase(i+1);return;
				}
				var type:String = "";
				if(obs.length != 0 && std.length == 0 && mass.length == 0)type = "LT";
				if(obs.length == 0 && std.length != 0 && mass.length == 0)type = "L15";
				if(obs.length == 0 && std.length == 0 && mass.length != 0)type = "KG";
				trace(obs, std, mass, temp, dens, base, type);
				if(type == ""){
					trace("line "+i+" invalid line due to obs, std, mass");calcBase(i+1);return;
				}
				var url:String = "../phpwrapper/calcvcf.php?frm_baseCd="+base+"&frm_which_type="+type+"&frm_real_amount="+(obs+std+mass)+"&frm_real_temp="+temp+"&frm_real_dens="+dens;
				var urlLoader:URLLoader = new URLLoader();
				urlLoader.addEventListener(Event.COMPLETE, function():void{
					var tmp:XML = XML(urlLoader.data);
					trace(ObjectUtil.toString(tmp));
					closeoutMeters[i]["CLOSE_AMB_TOT"]  		 = String(int(tmp.REAL_LITRE));
					closeoutMeters[i]["CLOSE_STD_TOT"]  		 = String(int(tmp.REAL_LITRE15));
					closeoutMeters[i]["CLOSE_MASS_TOT"] 		 = String((tmp.REAL_KG));
					calcBase(i+1);
				});
				try{urlLoader.load(new URLRequest(url));}catch(e:Error){}
			}
			calcBase();
			
		}
		
		public function initCalcTank():void{
			var calcBase:Function = function(i:int = 0):void
			{
				if(i>=closeoutTanks.length)
				{
					trace("done initCalcTank.....");
					closeoutTanks.refresh();
					//trace(ObjectUtil.toString(closeoutTanks));
					return;
				}
				
				// both obs and mass values are blank, leave std as the qty aanf L15 as the type for calculation
				var obs:String  = "";
				var std:String  = (closeoutTanks[i].CLOSE_STD_TOT 	== null)?"":closeoutTanks[i].CLOSE_STD_TOT;
				var mass:String = "";
				var temp:String = (closeoutTanks[i].CLOSE_TEMP 		== null)?"":closeoutTanks[i].CLOSE_TEMP;
				var dens:String = (closeoutTanks[i].CLOSE_DENSITY 	== null)?"":closeoutTanks[i].CLOSE_DENSITY;
				var base:String = (closeoutTanks[i].TANK_BASE 		== null)?"":closeoutTanks[i].TANK_BASE;
				if (dens == null || temp == null) return;
				if(temp.length == 0 || dens.length == 0 || isNaN(Number(temp)) || isNaN(Number(dens)) || Number(dens) == 0)
				{
					trace("line "+i+" invalid line due to temp, density");calcBase(i+1);return;
				}
				var type:String = "";
				if(obs.length != 0 && std.length == 0 && mass.length == 0)type = "LT";
				if(obs.length == 0 && std.length != 0 && mass.length == 0)type = "L15";
				if(obs.length == 0 && std.length == 0 && mass.length != 0)type = "KG";
				trace(obs, std, mass, temp, dens, base, type);
				if(type == "")
				{
					trace("line "+i+" invalid line due to obs, std, mass");calcBase(i+1);return;
				}
				gridCalcTypes[i] = "";
				gridCalcSources[i] = "";
				var url:String = "../phpwrapper/calcvcf.php?frm_baseCd="+base+"&frm_which_type="+type+"&frm_real_amount="+(obs+std+mass)+"&frm_real_temp="+temp+"&frm_real_dens="+dens;
				var urlLoader:URLLoader = new URLLoader();
				urlLoader.addEventListener(Event.COMPLETE, function():void
				{
					trace("doing ---- initCalcTank urlLoader .....", i, closeoutTanks.length);
					if(i>=closeoutTanks.length)
					{
						trace("done initCalcTank urlLoader .....", i, closeoutTanks.length);
						return;
					}
					var tmp:XML = XML(urlLoader.data);
					trace(ObjectUtil.toString(tmp));
					closeoutTanks[i]["CLOSE_AMB_TOT"]  		 = String((tmp.REAL_LITRE));
					closeoutTanks[i]["CLOSE_STD_TOT"]  		 = String((tmp.REAL_LITRE15));
					//closeoutTanks[i]["CLOSE_MASS_TOT"] 		 = String((tmp.REAL_KG));
					closeoutTanks[i]["CLOSE_AMB_TOT_RND"]  		 = String(int(Number(tmp.REAL_LITRE)+0.5));
					closeoutTanks[i]["CLOSE_STD_TOT_RND"]  		 = String(int(Number(tmp.REAL_LITRE15)+0.5));
					//closeoutTanks[i]["CLOSE_MASS_TOT_RND"] 		 = String(int(Number(tmp.REAL_KG)+0.5));
					calcBase(i+1);
				});
				try{urlLoader.load(new URLRequest(url));}catch(e:Error){}
			}
			calcBase();
		}
		
		
		public function getTankDensityForCalculation(i:int):void
		{
			if ( i < 0 ) return;
			
			var obs:String  = (view.dgTanks.selectedItem.CLOSE_AMB_TOT_RND 	== null)?"":Number(view.dgTanks.selectedItem.CLOSE_AMB_TOT_RND  == 0 )?"":view.dgTanks.selectedItem.CLOSE_AMB_TOT_RND;
			var std:String  = (view.dgTanks.selectedItem.CLOSE_STD_TOT_RND  	== null)?"":Number(view.dgTanks.selectedItem.CLOSE_STD_TOT_RND  == 0 )?"":view.dgTanks.selectedItem.CLOSE_STD_TOT_RND;
			var mass:String = (view.dgTanks.selectedItem.CLOSE_MASS_TOT_RND  == null)?"":Number(view.dgTanks.selectedItem.CLOSE_MASS_TOT_RND == 0 )?"":view.dgTanks.selectedItem.CLOSE_MASS_TOT_RND;
			var temp:String = (view.dgTanks.selectedItem.CLOSE_TEMP  	== null)?"":view.dgTanks.selectedItem.CLOSE_TEMP;
			
			//var obs:String  = (closeoutTanks[i].CLOSE_AMB_TOT_RND 	== null)?"":Number(closeoutTanks[i].CLOSE_AMB_TOT_RND  == 0 )?"":closeoutTanks[i].CLOSE_AMB_TOT_RND;
			//var std:String  = (closeoutTanks[i].CLOSE_STD_TOT_RND  	== null)?"":Number(closeoutTanks[i].CLOSE_STD_TOT_RND  == 0 )?"":closeoutTanks[i].CLOSE_STD_TOT_RND;
			//var mass:String = (closeoutTanks[i].CLOSE_MASS_TOT_RND  == null)?"":Number(closeoutTanks[i].CLOSE_MASS_TOT_RND == 0 )?"":closeoutTanks[i].CLOSE_MASS_TOT_RND;
			//var temp:String = (closeoutTanks[i].CLOSE_TEMP  	== null)?"":closeoutTanks[i].CLOSE_TEMP;
			
			//if ( closeoutTanks[i].CLOSE_DENSITY == null && temp.length>0 && (obs.length != 0 || std.length != 0 || mass.length != 0) && i == view.dgTanks.selectedIndex)
			if ( (view.dgTanks.selectedItem.CLOSE_DENSITY == null || view.dgTanks.selectedItem.CLOSE_DENSITY=="" ) && temp.length>0 && (obs.length != 0 || std.length != 0 || mass.length != 0) && i == view.dgTanks.selectedIndex)
			{
				closeoutTanks[i].CLOSE_DENSITY = closeoutTanks[i].TANK_DENSITY;
			}
		}
		
		public function calcTank():void{			
			this.grid_calc_status = true;
			//this.getTankDensityForCalculation( view.dgTanks.selectedIndex );
			
			var calcBase:Function = function(i:int = 0):void{
				if(i>=closeoutTanks.length){
					trace("done calc");
					closeoutTanks.refresh();
					trace(ObjectUtil.toString(closeoutTanks));
					return;
				}
				
				if( (closeoutTanks[i].CLOSE_TEMP!=null && closeoutTanks[i].CLOSE_TEMP!="")  && (Number(closeoutTanks[i].CLOSE_TEMP) < global.MIN_TEMPERATURE || Number(closeoutTanks[i].CLOSE_TEMP) > global.MAX_TEMPERATURE) ){
					global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.OBS_TEMP_OUTRANGE')+ String(global.MIN_TEMPERATURE) + "~" + String(global.MAX_TEMPERATURE) + mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.IN_TANK') + closeoutTanks[i]["TANK_CODE"] +".");
					return;
				}			
				if( (closeoutTanks[i].CLOSE_DENSITY!=null && closeoutTanks[i].CLOSE_DENSITY!="") && (Number(closeoutTanks[i].CLOSE_DENSITY) < closeoutTanks[i]["BCLASS_DENS_LO"] || Number(closeoutTanks[i].CLOSE_DENSITY) > closeoutTanks[i]["BCLASS_DENS_HI"]) ){
					//global.msgFail("Std density out of range "+ String(closeoutTanks[i]["BCLASS_DENS_LO"]) + "~" + String(closeoutTanks[i]["BCLASS_DENS_HI"]) + " in line " + String(i+1) +".");
					global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.STD_DENS_OUTRANGE')+ String(closeoutTanks[i]["BCLASS_DENS_LO"]) + "~" + String(closeoutTanks[i]["BCLASS_DENS_HI"]) + mx.resources.ResourceManager.getInstance().getString('default','FOLIO_MANAGER.MSG.IN_TANK') + closeoutTanks[i]["TANK_CODE"] +".");
					return;
				}
				
				var obs:String  = (closeoutTanks[i].CLOSE_AMB_TOT_RND 	== null)?"":Number(closeoutTanks[i].CLOSE_AMB_TOT_RND  == 0 )?"":closeoutTanks[i].CLOSE_AMB_TOT_RND;
				var std:String  = (closeoutTanks[i].CLOSE_STD_TOT_RND  	== null)?"":Number(closeoutTanks[i].CLOSE_STD_TOT_RND  == 0 )?"":closeoutTanks[i].CLOSE_STD_TOT_RND;
				var mass:String = (closeoutTanks[i].CLOSE_MASS_TOT_RND  == null)?"":Number(closeoutTanks[i].CLOSE_MASS_TOT_RND == 0 )?"":closeoutTanks[i].CLOSE_MASS_TOT_RND;
				var temp:String = (closeoutTanks[i].CLOSE_TEMP  	== null)?"":closeoutTanks[i].CLOSE_TEMP;
				//if ( i == view.dgTanks.selectedIndex )
				{
					if ( (closeoutTanks[i].CLOSE_DENSITY == null || closeoutTanks[i].CLOSE_DENSITY == "") && temp.length>0 && (obs.length != 0 || std.length != 0 || mass.length != 0) )
					{
						closeoutTanks[i].CLOSE_DENSITY = closeoutTanks[i].TANK_DENSITY;
					}
				}
				var dens:String = (closeoutTanks[i].CLOSE_DENSITY 	== null)?"":closeoutTanks[i].CLOSE_DENSITY;
				var base:String = (closeoutTanks[i].TANK_BASE  		== null)?"":closeoutTanks[i].TANK_BASE;
				if(temp.length == 0 || dens.length == 0 || isNaN(Number(temp)) || isNaN(Number(dens)) || Number(dens) == 0){
					trace("line "+i+" invalid line due to temp, density");calcBase(i+1);return;
				}
				var type:String = "";
				var qty:String = "";
				if( gridCalcTypes[i] == "LT" ){type = "LT"; qty=obs;};
				if( gridCalcTypes[i] == "L15" ){type = "L15"; qty=std; };
				if( gridCalcTypes[i] == "KG" ){type = "KG"; qty=mass; };
				//if(obs.length != 0 && std.length == 0 && mass.length == 0){type = "LT"; qty=obs;};
				//if(obs.length == 0 && std.length != 0 && mass.length == 0){type = "L15"; qty=std; };
				//if(obs.length == 0 && std.length == 0 && mass.length != 0){type = "KG"; qty=mass; };
				
				trace(obs, std, mass, temp, dens, base, type);
				if(type == "" && gridCalcSources[i] == ""){
					trace("line "+i+" invalid line due to obs, std, mass");calcBase(i+1);return;
				}
				else
				{
					if ( gridCalcTypes[i] == "" ) {
						gridCalcTypes[i] = "LT";
					}
				}
				
				var QTY_AMB_TIME:Date = new Date();
				var QTY_COR_TIME:Date = new Date();
				var QTY_MASS_TIME:Date = new Date();
				QTY_COR_TIME.time = QTY_AMB_TIME.time;
				QTY_MASS_TIME.time = QTY_AMB_TIME.time;
				if( gridCalcTypes[i] == "LT" && obs!="" ){QTY_AMB_TIME.time += 1000;}
				if( gridCalcTypes[i] == "L15" && std!="" ){QTY_COR_TIME.time += 1000;}
				if( gridCalcTypes[i] == "KG" && mass!="" ){QTY_MASS_TIME.time += 1000;}
				var srcObj:Object = global.getQuantitySourceForCalculation(QTY_AMB_TIME, QTY_COR_TIME, QTY_MASS_TIME, obs, std, mass, obs, std, mass);
				type = srcObj.type;
				var nqty:Number = srcObj.qty;
				
				gridCalcTypes[i] = "";
				gridCalcSources[i] = "";
				var url:String = "../phpwrapper/calcvcf.php?frm_baseCd="+base+"&frm_which_type="+type+"&frm_real_amount="+(nqty)+"&frm_real_temp="+temp+"&frm_real_dens="+dens;
				
				var urlLoader:URLLoader = new URLLoader();
				urlLoader.addEventListener(Event.COMPLETE, function():void{
					var tmp:XML = XML(urlLoader.data);
					trace(ObjectUtil.toString(tmp));
					closeoutTanks[i]["CLOSE_AMB_TOT"]  		 = String((tmp.REAL_LITRE));
					closeoutTanks[i]["CLOSE_STD_TOT"]  		 = String((tmp.REAL_LITRE15));
					closeoutTanks[i]["CLOSE_MASS_TOT"] 		 = String((tmp.REAL_KG));
					closeoutTanks[i]["CLOSE_AMB_TOT_RND"]  		 = String(int(Number(tmp.REAL_LITRE)+0.5));
					closeoutTanks[i]["CLOSE_STD_TOT_RND"]  		 = String(int(Number(tmp.REAL_LITRE15)+0.5));
					closeoutTanks[i]["CLOSE_MASS_TOT_RND"] 		 = String(int(Number(tmp.REAL_KG)+0.5));
					calcBase(i+1);
				});
				try{urlLoader.load(new URLRequest(url));}catch(e:Error){}
			}
			calcBase();
			
		}
		
		public function genReports(): void
		{
			//PopUpManager.addPopUp(genReport,FlexGlobals.topLevelApplication.main,true);
			//PopUpManager.centerPopUp(genReport);
			if (view.detailNavigator.selectedIndex == 0)
				genReport.prepExport(view.dgMeters,'meter details.csv')
			else
				genReport.prepExport(view.dgTanks,'tank details.csv');
		}
		
	}
}