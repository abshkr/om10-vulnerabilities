package controllers
{
	import components.ConfirmDialog;
	import components.ExportData;
	
	import dm.DM;
	import dm.collections.dmMovementReasons;
	import dm.models.dmMovementReason;
	import dm.models.dmSpecialMovement;
	import dm.remoteDataService;
	import dm.utils.tools;
	
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.globalization.DateTimeFormatter;
	import flash.globalization.LocaleID;
	import flash.net.FileReference;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.utils.Timer;
	import flash.utils.setTimeout;
	
	import mx.collections.ArrayCollection;
	import mx.core.FlexGlobals;
	import mx.events.CollectionEvent;
	import mx.events.FlexEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	import mx.utils.ObjectUtil;
	import mx.utils.StringUtil;
	
	import spark.components.gridClasses.GridColumn;
	
	import views.v_ManualTransactionsMK2;
	import views.v_SpecialMovements;
	
	
	public class C_SpecialMovements extends EventDispatcher
	{
		// single bridge variable
		[Bindable] public static var MOV_TYPE_SID:Number      			=  -1;
		[Bindable] public static var PLANT_CODE_SID:Number				=  -1;
		[Bindable] public static var TERMINAL:String				=  "0";
		[Bindable] public static var PROD_CODE_FROM:String 			=  "0";
		[Bindable] public static var TANK_CODE_FROM:String  		=  "0";
		[Bindable] public static var MOV_NUM:Number  				=  DM.SpecialMovements.nextID;
		[Bindable] public static var DTIM_START:Date				=  new Date(global.serverDateTime.time);
		[Bindable] public static var DTIM_END:Date					=  new Date(global.serverDateTime.time);
		[Bindable] public static var REASON_CODE_SID:Number				=  -1;
		[Bindable] public static var PROD_CODE_TO:String			=  "";
		[Bindable] public static var TANK_CODE_TO:String			=  "";
		[Bindable] public static var STATUS_SID:Number					=  -1;
		[Bindable] public static var DTIM_POSTED:Date				=  new Date();
		[Bindable] public static var OPER_POSTED:String				=  "0";
		
		
		
		[Bindable] public static var DTIM_START_FLT:Date				=  new Date();
		[Bindable] public static var DTIM_END_FLT:Date					=  new Date();
		
		// Form Data Providers
		[Bindable] public static var FORM_PLANT_CODES:ArrayCollection	= new ArrayCollection();
		[Bindable] public static var FORM_FROM_TANKS:ArrayCollection 	= new ArrayCollection();
		[Bindable] public static var FORM_FROM_PRODS:ArrayCollection 	= new ArrayCollection();
		[Bindable] public static var FORM_TO_TANKS:ArrayCollection 		= new ArrayCollection();
		[Bindable] public static var FORM_TO_PRODS:ArrayCollection 		= new ArrayCollection();
		
		// Serialization on FORM Items
		[Bindable] public static var FORM_TERMINAL:Number  			=  0;
		[Bindable] public static var FORM_MOV_TYPE_SID:Number	  		=  -1;
		[Bindable] public static var FORM_REASON_CODE_SID:Number  		=  -1;
		// Tier 1
		[Bindable] public static var FORM_FROM_PLANT_CODE_SID:Number	=  -1;
		[Bindable] public static var FORM_FROM_TANK_CODE_SID:Number		=  -1;
		[Bindable] public static var FORM_FROM_PROD_CODE_SID:Number		=  -1;
		// Tier 2
		[Bindable] public static var FORM_TO_PLANT_CODE_SID:Number		=  -1;
		[Bindable] public static var FORM_TO_TANK_CODE_SID:Number		=  -1;
		[Bindable] public static var FORM_TO_PROD_CODE_SID:Number		=  -1;
		// Comments
		[Bindable] public static var COMMENT:String					=  "";
		
		[Bindable] public static var QTY_AMB_REAL:String                	=  "";
		[Bindable] public static var QTY_COR_REAL:String					=  "";
		[Bindable] public static var MASS_AMB_REAL:String				=  "";
		// Quantities 
		[Bindable] public static var QTY_AMB:String                	=  "";
		[Bindable] public static var TEMP_AMB:String       		    =  "";
		[Bindable] public static var DENS_COR:String		 		=  "";
		[Bindable] public static var QTY_COR:String					=  "";
		[Bindable] public static var MASS_AMB:String				=  "";
		[Bindable] public static var TEMP_COR:String				=  "";
		[Bindable] public static var ALTERNATE_QTY:String			=  "";
		[Bindable] public static var UNIT_ALT:Number				= -1;
		
		[Bindable] public static var DENS_COR_LO:Number		 		=  0;
		[Bindable] public static var DENS_COR_HI:Number		 		=  0;
		
		// 
		[Bindable] public static var SHOWUNITS:Boolean 		= false;
		
		[Bindable] public var readOnly:Boolean = false;
		[Bindable] public var canReset:Boolean = false;
		[Bindable] public var canUpdate:Boolean = false;
		[Bindable] public var canCreate:Boolean = false;
		[Bindable] public var canDelete:Boolean = false;
		[Bindable] public var hasPassword:Boolean = false;
		
		private var genReport:ExportData = new ExportData();
		private var confirmDlg:ConfirmDialog;
		
		public var mapObj:Object = { "movementDateTime":"MLITM_DTIM_START", "movementType":"MLITM_TYPE", "movementNumber":"MLITM_ID", "reasonCode":"MLITM_REASON_CODE", "movementStatus":"MLITM_STATUS", "lastModifiedDateTime":"MLITM_DTIM_POSTED", "lastModifiedUser":"MLITM_OPER_POSTED", "clnMovDtimCreate":"MV_DTIM_CREATE"}; 
		
		[Bindable] private var dtf:DateTimeFormatter = new DateTimeFormatter(LocaleID.DEFAULT, "short", "short");
		
		[Bindable] public var supplierList:remoteDataService = new remoteDataService( "ListLibraryService.lookupMovementSupplier", null, lookupSupplier_resultHandler );
		[Bindable] public var mvitemTypeList:remoteDataService = new remoteDataService( "ListLibraryService.lookupMovementItemType", null, lookupMovementItemType_resultHandler );
		
		private var QTY_AMB_TIME:Date = new Date();
		private var QTY_COR_TIME:Date = new Date();
		private var QTY_MASS_TIME:Date = new Date();
		
		
		public function creationCompleteHandler(event:FlexEvent):void
		{
			trace ("-------------start creationCompleteHandler");
			//this.supplierList.service( 'N' );
			//this.mvitemTypeList.service( 'N' );
			
		}
		
		private function lookupSupplier_resultHandler():void
		{
			
			DM.SpecialMovements.suppliers = supplierList;
			
			/*for each ( var row:Object in view.mainList.dataProvider )
			{
				var temp:String = row.clnCmpyName;
			}*/
		}
		
		private function lookupMovementItemType_resultHandler():void
		{
			DM.SpecialMovements.types = mvitemTypeList;
			
			for each ( var row:Object in view.mainList.dataProvider )
			{
				var temp:String = row.clnBay;
			}
		}

		
		public function bindPlantCode():void{			
			if(DM.SpecialMovements.terminalData[0]){
				FORM_PLANT_CODES = new ArrayCollection(DM.SpecialMovements.terminalData[0].suppliers);
			}else{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.NO_SELECT_TERMINAL_PLANT'));
			}
		}
		public function bindFromTank():void{
			if(FORM_FROM_PLANT_CODE_SID>=0){
				FORM_FROM_TANKS = new ArrayCollection(FORM_PLANT_CODES[FORM_FROM_PLANT_CODE_SID].tanks);					
			}else{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.NO_SELECT_PLANT_TANK'));
			}
		}
		public function bindToTank():void{
			if(FORM_TO_PLANT_CODE_SID>=0){
				FORM_TO_TANKS = new ArrayCollection(FORM_PLANT_CODES[FORM_TO_PLANT_CODE_SID].tanks);
			}else{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.NO_SELECT_PLANT_TANK'));
			}
		}
		public function bindFromProd():void{
			if(FORM_FROM_TANK_CODE_SID>=0){
				FORM_FROM_PRODS = new ArrayCollection(FORM_FROM_TANKS[FORM_FROM_TANK_CODE_SID].tankData);
				view.callLater(function():void{
					if ( FORM_FROM_PROD_CODE_SID >= 0 ) return;
					FORM_FROM_PROD_CODE_SID = 0;
					for (var i:int = 0; i < FORM_FROM_PRODS.length; i++) {
						if(FORM_FROM_PRODS[i].BASE_CODE == FORM_FROM_PRODS[i].PROD_CODE){
							FORM_FROM_PROD_CODE_SID = i;
						}
					}
				});
			}else{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.NO_SELECT_TANK_PRODUCT'));
			}
			TEMP_AMB = TEMP_COR = view.fromTank.selectedItem.tankTemp;
			DENS_COR = view.fromTank.selectedItem.tankDens;
			DENS_COR_LO = view.fromTank.selectedItem.BCLASS_DENS_LO;
			DENS_COR_HI = view.fromTank.selectedItem.BCLASS_DENS_HI;
		}
		public function bindToProd():void{
			if(FORM_TO_TANK_CODE_SID>=0){
				FORM_TO_PRODS = new ArrayCollection(FORM_TO_TANKS[FORM_TO_TANK_CODE_SID].tankData);
				view.callLater(function():void{
					if ( FORM_TO_PROD_CODE_SID >= 0 ) return;
					FORM_TO_PROD_CODE_SID = 0;
					for (var i:int = 0; i < FORM_TO_PRODS.length; i++) {
						if(FORM_TO_PRODS[i].BASE_CODE == FORM_TO_PRODS[i].PROD_CODE){
							FORM_TO_PROD_CODE_SID = i;
						}
					}
				});
			}else{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.NO_SELECT_TANK_PRODUCT'));
			}
			if(FORM_MOV_TYPE_SID==0){
				TEMP_AMB = TEMP_COR = view.toTank.selectedItem.tankTemp;
				DENS_COR = view.toTank.selectedItem.tankDens;
				DENS_COR_LO = view.toTank.selectedItem.BCLASS_DENS_LO;
				DENS_COR_HI = view.toTank.selectedItem.BCLASS_DENS_HI;
			}	
		}
		public function bindFromInputs():void{
			//TEMP_AMB = TEMP_COR = view.fromDrawer.selectedItem.TANK_TEMP;
			//DENS_COR = view.fromDrawer.selectedItem.TANK_DENSITY;
		}
		public function bindToInputs():void{
			//			if(FORM_MOV_TYPE==0){
			//				TEMP_AMB = TEMP_COR = view.toDrawer.selectedItem.TANK_TEMP;
			//				DENS_COR = view.toDrawer.selectedItem.TANK_DENSITY;
			//			}			
		}
		
		
		
		
		private var _view:v_SpecialMovements;
		public function C_SpecialMovements()
		{
		}
		
		public function AmbQtyChangedInForm():void
		{
			QTY_AMB_TIME = new Date();
			QTY_AMB_REAL = QTY_AMB;
		}
		
		public function StdQtyChangedInForm():void
		{
			QTY_COR_TIME = new Date();
			QTY_COR_REAL = QTY_COR;
		}
		
		public function MassQtyChangedInForm():void
		{
			QTY_MASS_TIME = new Date();
			MASS_AMB_REAL = MASS_AMB;
		}
		
		
		//-----------------------------------------------------------------------------------------------------
		public function movementReasonFilter(obj:dmMovementReason):Boolean{
			//if(obj.clnStatus == "Deleted")return false;
			//if(MOV_TYPE_SID>-1) if(obj.clnType != DM.SpecialMovements.types.getItemAt(MOV_TYPE_SID).MOVITEM_TYPE_NAME)	return false;
			if(MOV_TYPE_SID>-1) if(obj.clnTypeID != DM.SpecialMovements.types.getItemAt(MOV_TYPE_SID).MOVITEM_TYPE_ID)	return false;
			return true;
		}
		public function refreshMovementReasonFilter():void{
			DM.SpecialMovements.movementReasons.filterFunction = movementReasonFilter;
			DM.SpecialMovements.movementReasons.refresh();
			refreshMainFilter();
		}
		//-----------------------------------------------------------------------------------------------------
		public function movementReasonFilterSEL(obj:dmMovementReason):Boolean{
			if(obj.clnStatus == "Deleted")return false;
			if(FORM_MOV_TYPE_SID>-1) 
			{
				var mov_type:Object = DM.SpecialMovements.types.getItemAt(FORM_MOV_TYPE_SID);
				if ( mov_type == null )
				{
					return false;
				}
				trace("movementReasonFilterSEL......", obj.clnType, mov_type.MOVITEM_TYPE_NAME, obj.clnType, mov_type.MOVITEM_TYPE_CODE, obj.clnTypeID, mov_type.MOVITEM_TYPE_ID);
				if( obj.clnType != mov_type.MOVITEM_TYPE_NAME && obj.clnType != mov_type.MOVITEM_TYPE_CODE && obj.clnTypeID != mov_type.MOVITEM_TYPE_ID )	
				{
					return false;
				}
			}
			return true;
		}
		public function refreshMovementReasonFilterSEL():void{
			if(view){if(view.reasonDDL){view.reasonDDL.requireSelection = false;FORM_REASON_CODE_SID = -1;}}
			DM.SpecialMovements.movementReasonsSEL.filterFunction = movementReasonFilterSEL;
			DM.SpecialMovements.movementReasonsSEL.refresh();
		}
		//-----------------------------------------------------------------------------------------------------
		public function mainFilter(obj:dmSpecialMovement):Boolean{
			if(MOV_TYPE_SID>-1){
				//if(obj.movementType     != DM.SpecialMovements.types.getItemAt(MOV_TYPE_SID).MOVITEM_TYPE_NAME)	return false;
				if(obj.payload.MLITM_TYPE     != DM.SpecialMovements.types.getItemAt(MOV_TYPE_SID).MOVITEM_TYPE_ID)	return false;
			}
			if(view.statusDDL.selectedIndex>-1){
				if(obj.movementStatus   != DM.SpecialMovements.status[STATUS_SID].Name)	return false;
			}
			if(REASON_CODE_SID>-1){
				if(obj.reasonCodeString != DM.SpecialMovements.movementReasons.getItemAt(REASON_CODE_SID).clnAction) return false;
			}
			if(PLANT_CODE_SID > -1){
				if((obj.MLITM_TANKDEPO    != DM.SpecialMovements.suppliers[PLANT_CODE_SID].CMPY_PLANT)&&
					(obj.MLITM_TANKDEPO_TO != DM.SpecialMovements.suppliers[PLANT_CODE_SID].CMPY_PLANT))
					return false;
			}
			if(view.filterMN.selectedItem) {
				if(obj.MLITM_ID.toString().indexOf(view.filterMN.selectedItem.toString())!=0)return false;
			}
			else {
				if(obj.MLITM_ID.toString().indexOf(view.filterMN.textInput.text)!=0)return false;
			}
				
			
			return true;
		}
		public function refreshMainFilter():void{
			DM.SpecialMovements.filterFunction = mainFilter;
			DM.SpecialMovements.refresh();
			
			
			
			
			var filters:Object = new Object();
			if(STATUS_SID>-1) filters.status = view.statusDDL.selectedItem.ID;
			//if(MOV_TYPE>-1) filters.type = MOV_TYPE;
			if(MOV_TYPE_SID>-1) filters.type = view.typeFilter.selectedItem.MOVITEM_TYPE_ID;
			if(REASON_CODE_SID>-1) filters.reasoncode = (DM.SpecialMovements.movementReasons.getItemAt(REASON_CODE_SID) as dmMovementReason).clnId;
			if(view.filterMN.selectedItem){
				filters.movNumber = view.filterMN.selectedItem.toString();
			}
			else {
				filters.movNumber = view.filterMN.textInput.text;
			}
			
			
			
			DM.SpecialMovements.prepareCSV(filters);
			
			
		}
		//-----------------------------------------------------------------------------------------------------
		public function clearMainFilters():void{
			//reloadData(null);
			PLANT_CODE_SID = REASON_CODE_SID = MOV_TYPE_SID = -1;
			STATUS_SID = -1;
			//view.statusDDL.selectedIndex =-1;
			view.filterMN.selectedIndex = -1;
			view.filterMN.textInput.text = "";
			refreshMovementReasonFilter();
			refreshMovementReasonFilterSEL();
		}
		
		public function minimumValidationEntry():Boolean{
			
			//tools.pr( FORM_TO_TANKS );
			
			if(FORM_MOV_TYPE_SID == -1){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.REQUIRE_MOV_TYPE'));
				return false;
			}
			if(FORM_REASON_CODE_SID == -1){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.REQUIRE_REASON_CODE'));
				return false;
			}
			if(Number(TEMP_AMB) < global.MIN_TEMPERATURE || Number(TEMP_AMB) > global.MAX_TEMPERATURE ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.OUT_RANGE_OBS_TEMP')+ String(global.MIN_TEMPERATURE) + "~" + String(global.MAX_TEMPERATURE) + ".");
				return false;
			}			
			if(Number(DENS_COR) < DENS_COR_LO || Number(DENS_COR) > DENS_COR_HI ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.OUT_RANGE_STD_DENS')+ String(DENS_COR_LO) + "~" + String(DENS_COR_HI) + ".");
				return false;
			}			
/*			if(Number(DENS_COR) < global.MIN_DENSITY || Number(DENS_COR) > global.MAX_DENSITY ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.OUT_RANGE_STD_DENS')+ String(global.MIN_DENSITY) + "~" + String(global.MAX_DENSITY) + ".");
				return false;
			}			
*/			return true;
		}
		public function validateEntry():Boolean{
			//tools.pr( FORM_TO_TANKS );
			
			if(FORM_MOV_TYPE_SID == -1){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.PLS_SELECT_MOV_TYPE'));
				return false;
			}
			if(FORM_REASON_CODE_SID == -1){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.PLS_SELECT_REASON_CODE'));
				return false;
			}
			//			if(DTIM_START.time < view.fc.selectedItem.fromDate.time){
			//				global.msgFail("Start time is before selected Folio Start Time\nStart Time have to be after: "+dtf.format(view.fc.selectedItem.fromDate));
			//				return false;
			//			}
			//			if(DTIM_END.time > view.fc.selectedItem.toDate.time){
			//				global.msgFail("End time is after selected Folio End Time\nEnd Time have to be before: "+dtf.format(view.fc.selectedItem.toDate));
			//				return false;
			//			}
			
			//			if(DTIM_END.time <= DTIM_START.time){
			//				global.msgFail("Start time is after End time. ");
			//				return false;
			//			}
			
			
			if(FORM_MOV_TYPE_SID!=0){
				if(view.fromDrawer.selectedIndex == -1){
					global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.PLS_ENTER_FROM_ALL'));
					return false;
				}
			}
			if(FORM_MOV_TYPE_SID!=1){
				if(view.toDrawer.selectedIndex == -1){
					global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.PLS_ENTER_TO_ALL'));
					return false;
				}
			}
			
			
			if(Number(QTY_AMB) == 0 || Number(QTY_AMB) == NaN){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.PLS_ENTER_OBS_QTY'));
				return false;
			}
			if(Number(QTY_COR) == 0 || Number(QTY_COR) == NaN){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.PLS_ENTER_STD_QTY'));
				return false;
			}
			
			if(Number(MASS_AMB) == 0 || Number(MASS_AMB) == NaN){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.PLS_ENTER_MASS'));
				return false;
			}
			if(Number(TEMP_AMB) == NaN){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.PLS_ENTER_OBS_TEMP'));
				return false;
			}			
			if(Number(DENS_COR) == 0 || Number(DENS_COR) == NaN){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.PLS_ENTER_STD_DENS'));
				return false;
			}
			if(Number(TEMP_AMB) < global.MIN_TEMPERATURE || Number(TEMP_AMB) > global.MAX_TEMPERATURE ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.OUT_RANGE_OBS_TEMP')+ String(global.MIN_TEMPERATURE) + "~" + String(global.MAX_TEMPERATURE) + ".");
				return false;
			}			
			if(Number(DENS_COR) < DENS_COR_LO || Number(DENS_COR) > DENS_COR_HI ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.OUT_RANGE_STD_DENS')+ String(DENS_COR_LO) + "~" + String(DENS_COR_HI) + ".");
				return false;
			}			
/*			if(Number(DENS_COR) < global.MIN_DENSITY || Number(DENS_COR) > global.MAX_DENSITY ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.OUT_RANGE_STD_DENS')+ String(global.MIN_DENSITY) + "~" + String(global.MAX_DENSITY) + ".");
				return false;
			}			
*/			
			var max_number:Number=(Math.pow( 10, global.MAX_NUMBER_DIGITS ) - 1);
			if( Number(QTY_AMB) > max_number ){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.OBS_QTY_GT_MAX') + String(max_number)); return false;
			}
			if( Number(QTY_COR) > max_number ){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.STD_QTY_GT_MAX') + String(max_number)); return false;
			}
			if( Number(MASS_AMB) > max_number ){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.MASS_GT_MAX') + String(max_number)); return false;
			}
			if( Number(ALTERNATE_QTY) > max_number ){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.ALT_QTY_GT_MAX') + String(max_number)); return false;
			}
			
			if(view.uomcb.selectedIndex<0){
				//global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.INVALID_ALT_QTY_UNIT'));
				//return false;
			}
			//if(Number(ALTERNATE_QTY) == 0 || Number(ALTERNATE_QTY) == NaN){
			//	global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.PLS_ENTER_ALT_QTY'));
			//	return false;
			//}
			return true;
		}
		
		public function update(f:Function = null):void{
			if(!minimumValidationEntry())return;
			var test = "";
			var nd:Date = new Date();
			var mr:dmSpecialMovement = view.mainList.selectedItem as dmSpecialMovement;
			
			var fromDrawer:Object = view.fromDrawer.selectedIndex==-1?null:view.fromDrawer.selectedItem;
			var toDrawer:Object   = view.toDrawer.selectedIndex==-1?null:view.toDrawer.selectedItem;
			
			var FORM_MOV_TYPE:Number = DM.SpecialMovements.types.getItemAt(FORM_MOV_TYPE_SID).MOVITEM_TYPE_ID;
			//var MOV_NUM_STACK:Number = MOV_NUM;
			
			mr.update({
				payload:{
					MLITM_ID		   :MOV_NUM,
					MLITM_TERMINAL     :DM.SpecialMovements.terminalData[0].terminalCode,
					MLITM_MOV_NUM      :MOV_NUM,
					MLITM_TYPE         :FORM_MOV_TYPE,
					MLITM_TANKDEPO     :FORM_MOV_TYPE!=0?(fromDrawer?fromDrawer.PLANT_CODE:null):null,
					MLITM_PRODCODE     :FORM_MOV_TYPE!=0?(fromDrawer?fromDrawer.PROD_CODE:null):null,
					MLITM_TANKCODE     :FORM_MOV_TYPE!=0?(fromDrawer?fromDrawer.TANK_CODE:null):null,
					MLITM_PRODCMPY     :FORM_MOV_TYPE!=0?(fromDrawer?fromDrawer.PROD_CMPY:null):null,
					MLITM_QTY_AMB      :Number(QTY_AMB_REAL),
					MLITM_UNIT_AMB     :5,
					MLITM_TEMP_AMB     :Number(TEMP_AMB) ,
					MLITM_TMPUNIT_AMB  :0,
					MLITM_DENS_COR     :Number(DENS_COR),
					MLITM_DNSUNIT_COR  :23,
					MLITM_DTIM_START   :DTIM_START.fullYear+'-'+(DTIM_START.month+1)+'-'+(DTIM_START.date)+' '+DTIM_START.hours+':'+DTIM_START.minutes+':00',
					MLITM_DTIM_END     :DTIM_START.fullYear+'-'+(DTIM_START.month+1)+'-'+(DTIM_START.date)+' '+DTIM_START.hours+':'+DTIM_START.minutes+':00',
					MLITM_REASON_CODE  :FORM_REASON_CODE_SID==-1?null:view.reasonDDL.selectedItem.clnId,
					MLITM_TANKDEPO_TO  :FORM_MOV_TYPE!=1?(toDrawer?toDrawer.PLANT_CODE:null):null,
					MLITM_PRODCODE_TO  :FORM_MOV_TYPE!=1?(toDrawer?toDrawer.PROD_CODE:null):null,
					MLITM_TANKCODE_TO  :FORM_MOV_TYPE!=1?(toDrawer?toDrawer.TANK_CODE:null):null,
					MLITM_PRODCMPY_TO  :FORM_MOV_TYPE!=1?(toDrawer?toDrawer.PROD_CMPY:null):null,
					MLITM_QTY_COR      :Number(QTY_COR_REAL),
					MLITM_QTY_KG	   :Number(MASS_AMB_REAL),
					MLITM_UNIT_COR     :11,
					MLITM_TEMP_COR     :Number(TEMP_COR) ,
					MLITM_TMPUNIT_COR  :0,
					MLITM_QTY_RPT      :(StringUtil.trim(ALTERNATE_QTY).length > 0? Number(ALTERNATE_QTY) : ''),
					MLITM_UNIT_RPT     :(UNIT_ALT<0?'':DM.SpecialMovements.volumeUnitsAmb[UNIT_ALT].ID),
					MLITM_STATUS       :0,
					MLITM_DTIM_POSTED  :nd.fullYear+'-'+(nd.month+1)+'-'+(nd.date)+' '+nd.hours+':'+nd.minutes+':'+nd.seconds,
					MLITM_OPER_POSTED  :OPER_POSTED,
					MLITM_COMMENT      :COMMENT
				},
				onSuccess:f?f:function():void{
					global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.SUCCEED_UPDATE'));
					var MOV_NUM_STACK:Number = MOV_NUM;
					reloadData();
					clear(true);				
					view.filterMN.textInput.text = String(MOV_NUM_STACK);
					refreshMainFilter();
				}
				
			});
			
		}

		
		public function del(f:Function = null):void{
			
			var mr:dmSpecialMovement = view.mainList.selectedItem as dmSpecialMovement;
			mr.remove({
				onSuccess:f?f:function():void{
					global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.SUCCEED_REMOVE'));
					reloadData();
					clear(true);				
				}
			});
			
			
		}
		
		
		public function create(f:Function = null):void{
			if(!minimumValidationEntry())return;
			var test = "";
			var nd:Date = new Date();
			
			var fromDrawer:Object = view.fromDrawer.selectedIndex==-1?null:view.fromDrawer.selectedItem;
			var toDrawer:Object   = view.toDrawer.selectedIndex==-1?null:view.toDrawer.selectedItem;
			
			var FORM_MOV_TYPE:Number = DM.SpecialMovements.types.getItemAt(FORM_MOV_TYPE_SID).MOVITEM_TYPE_ID;
			//var MOV_NUM_STACK:Number = MOV_NUM;
			
			var mr:dmSpecialMovement = new dmSpecialMovement({
				create:true,
				payload:{
					MLITM_ID		   :MOV_NUM,
					MLITM_TERMINAL     :DM.SpecialMovements.terminalData[0].terminalCode,
					MLITM_MOV_NUM      :MOV_NUM,
					MLITM_TYPE         :FORM_MOV_TYPE,
					MLITM_TANKDEPO     :FORM_MOV_TYPE!=0?(fromDrawer?fromDrawer.PLANT_CODE:null):null,
					MLITM_PRODCODE     :FORM_MOV_TYPE!=0?(fromDrawer?fromDrawer.PROD_CODE:null):null,
					MLITM_TANKCODE     :FORM_MOV_TYPE!=0?(fromDrawer?fromDrawer.TANK_CODE:null):null,
					MLITM_PRODCMPY     :FORM_MOV_TYPE!=0?(fromDrawer?fromDrawer.PROD_CMPY:null):null,
					MLITM_QTY_AMB      :Number(QTY_AMB_REAL),
					MLITM_UNIT_AMB     :5,
					MLITM_TEMP_AMB     :Number(TEMP_AMB) ,
					MLITM_TMPUNIT_AMB  :0,
					MLITM_DENS_COR     :Number(DENS_COR),
					MLITM_DNSUNIT_COR  :23,
					MLITM_DTIM_START   :DTIM_START.fullYear+'-'+(DTIM_START.month+1)+'-'+(DTIM_START.date)+' '+DTIM_START.hours+':'+DTIM_START.minutes+':00',
					MLITM_DTIM_END     :DTIM_START.fullYear+'-'+(DTIM_START.month+1)+'-'+(DTIM_START.date)+' '+DTIM_START.hours+':'+DTIM_START.minutes+':00',
					MLITM_REASON_CODE  :FORM_REASON_CODE_SID==-1?null:view.reasonDDL.selectedItem.clnId,
					MLITM_TANKDEPO_TO  :FORM_MOV_TYPE!=1?(toDrawer?toDrawer.PLANT_CODE:null):null,
					MLITM_PRODCODE_TO  :FORM_MOV_TYPE!=1?(toDrawer?toDrawer.PROD_CODE:null):null,
					MLITM_TANKCODE_TO  :FORM_MOV_TYPE!=1?(toDrawer?toDrawer.TANK_CODE:null):null,
					MLITM_PRODCMPY_TO  :FORM_MOV_TYPE!=1?(toDrawer?toDrawer.PROD_CMPY:null):null,
					MLITM_QTY_COR      :Number(QTY_COR_REAL),
					MLITM_QTY_KG	   :Number(MASS_AMB_REAL),
					MLITM_UNIT_COR     :11,
					MLITM_TEMP_COR     :Number(TEMP_COR) ,
					MLITM_TMPUNIT_COR  :0,
					MLITM_QTY_RPT      :(StringUtil.trim(ALTERNATE_QTY).length > 0? Number(ALTERNATE_QTY) : ''),
					MLITM_UNIT_RPT     :(UNIT_ALT<0?'':DM.SpecialMovements.volumeUnitsAmb[UNIT_ALT].ID),
					MLITM_STATUS       :0,
					MLITM_DTIM_POSTED  :nd.fullYear+'-'+(nd.month+1)+'-'+(nd.date)+' '+nd.hours+':'+nd.minutes+':'+nd.seconds,
					MLITM_OPER_POSTED  :OPER_POSTED,
					MLITM_COMMENT      :COMMENT
				},
				onSuccess:f?f:function():void{
					global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.SUCCEED_SAVE'));
					var MOV_NUM_STACK:Number = MOV_NUM;
					reloadData();
					clear(true);				
					view.filterMN.textInput.text = String(MOV_NUM_STACK);
					refreshMainFilter();
				}
			});
		}
		
		public function clear(gotoNormal:Boolean = true):void{
			
			
			DTIM_START = new Date(global.serverDateTime);
			
			
			view.reasonDDL.requireSelection   =
				view.fromPlant.requireSelection   =
				view.toPlant.requireSelection     = 
				view.fromTank.requireSelection    =
				view.toTank.requireSelection      =  
				view.fromDrawer.requireSelection  =
				view.toDrawer.requireSelection    = false;
			
			MOV_TYPE_SID       = -1;
			TERMINAL       = "";
			PROD_CODE_FROM = "";
			TANK_CODE_FROM = "";
			REASON_CODE_SID    = -1;
			PROD_CODE_TO   = "";
			TANK_CODE_TO   = "";
			STATUS_SID         = -1;
			DTIM_POSTED    = new Date();
			OPER_POSTED    = "";
			MOV_NUM  	   =  DM.SpecialMovements.length+1;
			
			// Serialization on FORM Items
			FORM_TERMINAL  			=  -1;
			FORM_MOV_TYPE_SID	  		=  -1;
			FORM_REASON_CODE_SID  		=  -1;
			// Tier 1
			FORM_FROM_PLANT_CODE_SID	=  -1;
			FORM_FROM_TANK_CODE_SID		=  -1;
			FORM_FROM_PROD_CODE_SID		=  -1;
			// Tier 2
			FORM_TO_PLANT_CODE_SID		=  -1;
			FORM_TO_TANK_CODE_SID		=  -1;
			FORM_TO_PROD_CODE_SID		=  -1;
			// Comments
			COMMENT					=  "";
			// Quantities 
			QTY_AMB                	=  "";
			TEMP_AMB       		    =  "";
			DENS_COR		 		=  "";
			QTY_COR					=  "";
			TEMP_COR				=  "";
			ALTERNATE_QTY			=  "";
			MASS_AMB				=  "";
			
			QTY_AMB_REAL                	=  "";
			QTY_COR_REAL					=  "";
			MASS_AMB_REAL				=  "";
			
			
			if(gotoNormal)view.currentState = 'normal';
			
			refreshMovementReasonFilter();
			
			view.mainList.selectedIndex = -1;
		}
		
		public function streamLineDate():void{
			var MLITM_DTIM_START:String = view.mainList.selectedItem.MLITM_DTIM_START;
			var	MLITM_DTIM_END:String = view.mainList.selectedItem.MLITM_DTIM_END;
			if(MLITM_DTIM_START){
				var fromYear:int   = MLITM_DTIM_START.split(" ")[0].split("-")[0];
				var fromMonth:int  = MLITM_DTIM_START.split(" ")[0].split("-")[1];
				var fromDate:int   = MLITM_DTIM_START.split(" ")[0].split("-")[2];
				var fromMinute:int = MLITM_DTIM_START.split(" ")[1].split(":")[0];
				var fromSecond:int = MLITM_DTIM_START.split(" ")[1].split(":")[1];
				DTIM_START = new Date(fromYear,fromMonth-1,fromDate,fromMinute,fromSecond);
			}
			if(MLITM_DTIM_END){
				var toYear:int     = MLITM_DTIM_END.split(" ")[0].split("-")[0];
				var toMonth:int    = MLITM_DTIM_END.split(" ")[0].split("-")[1];
				var toDate:int     = MLITM_DTIM_END.split(" ")[0].split("-")[2];
				var toMinute:int   = MLITM_DTIM_END.split(" ")[1].split(":")[0];
				var toSecond:int   = MLITM_DTIM_END.split(" ")[1].split(":")[1];
				DTIM_END = new Date(toYear,toMonth-1,toDate,toMinute,toSecond);
			}
		}
		
		public function reloadData(data:Object = null):void{
			view.pb.mode='manual';
			view.pb.setProgress(0,100);
			view.pb.mode='polled';
			DM.SpecialMovements.std = DTIM_START_FLT;
			DM.SpecialMovements.etd = DTIM_END_FLT;
			DM.SpecialMovements.reload();
			trace("?>>>> here");
			
			clearMainFilters();			
		}
		
		public function prepareForEdit(){
			var mvStatusID:int = tools.getItemIndexFromCode( view.mainList.selectedItem.movementStatus, DM.SpecialMovements.status, 'Name' );
			//if(view.mainList.selectedItem.movementStatus=="Entering"){
			if( mvStatusID==0 ){
				view.currentState = 'edit';
				//view.fc.selectedIndex = DM.SpecialMovements.folios.length-1;
				//streamLineDate();
			}else{
				view.currentState = 'view';
				//view.fc.selectedIndex = -1;
			}
			view.callLater(function():void{
				
				MOV_NUM  	  = view.mainList.selectedItem.MLITM_ID;		   
				TERMINAL 	  = view.mainList.selectedItem.MLITM_TERMINAL;
				MOV_NUM  	  = view.mainList.selectedItem.MLITM_MOV_NUM;
				//FORM_MOV_TYPE_SID = view.mainList.selectedItem.MLITM_TYPE;
				FORM_MOV_TYPE_SID = tools.getItemIndexFromCode( view.mainList.selectedItem.MLITM_TYPE, DM.SpecialMovements.types, 'MOVITEM_TYPE_ID' );
				
				streamLineDate();
				
				
				refreshMovementReasonFilterSEL();
				
				// look for reason code
				for (var i:int = 0; i < DM.SpecialMovements.movementReasonsSEL.length; i++) 
				{
					trace("look for reason code ..............", DM.SpecialMovements.movementReasonsSEL[i].clnId, view.mainList.selectedItem.MLITM_REASON_CODE);
					if(DM.SpecialMovements.movementReasonsSEL[i].clnId == view.mainList.selectedItem.MLITM_REASON_CODE)
					{
						view.reasonDDL.requireSelection   = true;
						FORM_REASON_CODE_SID = i;
						bindPlantCode();
					}
				}
				// look for from Plant Code From and to
				for ( i = 0; i < FORM_PLANT_CODES.length; i++) 
				{
					if(FORM_PLANT_CODES[i].supplierPlant == view.mainList.selectedItem.MLITM_TANKDEPO &&
						FORM_PLANT_CODES[i].supplierCode  == view.mainList.selectedItem.MLITM_PRODCMPY){
						view.fromPlant.requireSelection   = true;
						FORM_FROM_PLANT_CODE_SID = i;
						bindFromTank();
					}
					if(FORM_PLANT_CODES[i].supplierPlant == view.mainList.selectedItem.MLITM_TANKDEPO_TO&&
						FORM_PLANT_CODES[i].supplierCode  == view.mainList.selectedItem.MLITM_PRODCMPY_TO){
						view.toPlant.requireSelection     = true;
						FORM_TO_PLANT_CODE_SID   = i;
						bindToTank();
					}
				}
				// look for from Tank Code From
				for ( i = 0; i < FORM_FROM_TANKS.length; i++) 
				{
					if(FORM_FROM_TANKS[i].tankCode == view.mainList.selectedItem.MLITM_TANKCODE){
						view.fromTank.requireSelection    = true;
						FORM_FROM_TANK_CODE_SID = i;
						bindFromProd();
					}
				}
				// look for from Tank Code To
				for ( i = 0; i < FORM_TO_TANKS.length; i++) 
				{
					if(FORM_TO_TANKS[i].tankCode == view.mainList.selectedItem.MLITM_TANKCODE_TO){
						view.toTank.requireSelection      =  true;
						FORM_TO_TANK_CODE_SID = i;
						bindToProd();
					}
				}
				// look for from Tank Code From
				for ( i = 0; i < FORM_FROM_PRODS.length; i++) 
				{
					if(FORM_FROM_PRODS[i].PROD_CODE == view.mainList.selectedItem.MLITM_PRODCODE){
						view.fromDrawer.requireSelection  = true;
						FORM_FROM_PROD_CODE_SID = i;
					}
				}
				// look for from Tank Code To
				for ( i = 0; i < FORM_TO_PRODS.length; i++) 
				{
					if(FORM_TO_PRODS[i].PROD_CODE == view.mainList.selectedItem.MLITM_PRODCODE_TO){
						view.toDrawer.requireSelection    = true;
						FORM_TO_PROD_CODE_SID = i;
					}
				}
				
				UNIT_ALT=-1;
				for(i = 0 ; i < DM.SpecialMovements.volumeUnitsAmb.length; i++){
					if(DM.SpecialMovements.volumeUnitsAmb[i].ID == view.mainList.selectedItem.MLITM_UNIT_RPT){
						UNIT_ALT = i;break;
					}
				}
				
				
				QTY_AMB                	=  tools.roundString( view.mainList.selectedItem.MLITM_QTY_AMB, 0 );
				TEMP_AMB       		    =  (Number(view.mainList.selectedItem.MLITM_TEMP_AMB)).toString();
				MASS_AMB				=  tools.roundString( view.mainList.selectedItem.MLITM_QTY_KG, 0 );
				DENS_COR		 		=  view.mainList.selectedItem.MLITM_DENS_COR;
				QTY_COR					=  tools.roundString( view.mainList.selectedItem.MLITM_QTY_COR, 0 );
				TEMP_COR				=  (Number(view.mainList.selectedItem.MLITM_TEMP_COR)).toString();
				ALTERNATE_QTY			=  view.mainList.selectedItem.MLITM_QTY_RPT;
				
				QTY_AMB_REAL  = view.mainList.selectedItem.MLITM_QTY_AMB;
				QTY_COR_REAL  = view.mainList.selectedItem.MLITM_QTY_COR;
				MASS_AMB_REAL = view.mainList.selectedItem.MLITM_QTY_KG;
				
				COMMENT = view.mainList.selectedItem.MLITM_COMMENT;
			});
		}
		
		[Bindable]public function get view():v_SpecialMovements
		{
			return _view;
		}
		public function set view(value:v_SpecialMovements):void
		{
			
			
			DTIM_START_FLT			  =  new Date();
			DTIM_START_FLT.date-=7;
			DTIM_START_FLT.hours        = 0;
			DTIM_START_FLT.minutes      = 0;
			DTIM_START_FLT.seconds      = 0;
			DTIM_START_FLT.milliseconds = 0;
			DTIM_END_FLT			  =  new Date();
			DTIM_END_FLT.date++;
			DTIM_END_FLT.hours        = 0;
			DTIM_END_FLT.minutes      = 0;
			DTIM_END_FLT.seconds      = 0;
			DTIM_END_FLT.milliseconds = 0;
			DTIM_END_FLT.milliseconds--;
			_view = value;
			
		}
		
		public function processSpecialMovement():void{
			if(!validateEntry())return;
			if(view.currentState == "create"){
				create(psm);
			}else{
				update(psm);
			}
		}
		public function psm(obj:Object):void{			
			if(!validateEntry())return;
			DM.SpecialMovements.processSpecialMovement(function(ob:Object):void{
				if(ob.data.result_code == 0 ){
					if ( String(ob.data.result_string).length > 0 ) {
						global.msgSuccess(ob.data.result_string);
					}
					else {
						global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','global.msg.opersuccess'));
					}
					var MOV_NUM_STACK:Number = MOV_NUM;
					reloadData();
					clear(true);
					view.filterMN.textInput.text = String(MOV_NUM_STACK);
					refreshMainFilter();
				}else{
					if ( String(ob.data.result_string).length > 0 ) {
						global.msgFail(ob.data.result_string);
					}
					else {
						global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','global.msg.operfailure'));
					}
				}
				
			}, MOV_NUM);
		}
		
		
		public function rsm(obj:Object):void
		{
			confirmDlg = new ConfirmDialog(callReverse,mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.CONFIRM_REVERSAL'));
		}
		
		private function callReverse(): void
		{
			DM.SpecialMovements.reverseSpecialMovement(function(ob:Object):void{
				if(ob.data.result_code == 0 ){
					if ( String(ob.data.result_string).length > 0 ) {
						global.msgSuccess(ob.data.result_string);
					}
					else {
						global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','global.msg.opersuccess'));
					}
					var MOV_NUM_STACK:Number = MOV_NUM;
					reloadData();
					clear(true);
					view.filterMN.textInput.text = String(MOV_NUM_STACK);
					refreshMainFilter();
				}else{
					if ( String(ob.data.result_string).length > 0 ) {
						global.msgFail(ob.data.result_string);
					}
					else {
						global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','global.msg.operfailure'));
					}
				}
			}, MOV_NUM);			
		}
		
		public function sortNumeric(obj1:Object, obj2:Object, gdc:GridColumn):Number{
			if(Number(obj1.movementNumber) == Number(obj2.movementNumber)) return 0;
			if(Number(obj1.movementNumber) <  Number(obj2.movementNumber)) return -1;
			return 1;
		}
		
		public function goToExportData(): void
		{
			var f:FileReference = new FileReference();
			f.save(DM.SpecialMovements.csv,"SpecialMovement.csv");
			//genReport.prepExportWithMappingColumns( view.mainList, "Special Movements.csv", this.mapObj );
		}
		
		public function calc():void{
			
			var found:Boolean   = false;
			var type:String     = "";
			var qty:Number      = 0;
			var baseCode:String = "";
			
			//tools.pr( FORM_TO_TANKS );
			
			if(Number(TEMP_AMB) < global.MIN_TEMPERATURE || Number(TEMP_AMB) > global.MAX_TEMPERATURE ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.OUT_RANGE_OBS_TEMP')+ String(global.MIN_TEMPERATURE) + "~" + String(global.MAX_TEMPERATURE) + ".");
				return;
			}			
			if(Number(DENS_COR) < DENS_COR_LO || Number(DENS_COR) > DENS_COR_HI ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.OUT_RANGE_STD_DENS')+ String(DENS_COR_LO) + "~" + String(DENS_COR_HI) + ".");
				return;
			}			
/*			if(Number(DENS_COR) < global.MIN_DENSITY || Number(DENS_COR) > global.MAX_DENSITY ){
				global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.OUT_RANGE_STD_DENS')+ String(global.MIN_DENSITY) + "~" + String(global.MAX_DENSITY) + ".");
				return;
			}			
*/			if(FORM_MOV_TYPE_SID==0){
				if(view.toDrawer.selectedIndex==-1){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.PLS_ENTER_TO_ALL2'));return;	
				}
				baseCode = view.toDrawer.selectedItem.BASE_CODE;
			}else{
				if(view.fromDrawer.selectedIndex==-1){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.PLS_ENTER_FROM_ALL2'));return;	
				}
				baseCode = view.fromDrawer.selectedItem.BASE_CODE;
			}

			var srcObj:Object = global.getQuantitySourceForCalculation(QTY_AMB_TIME, QTY_COR_TIME, QTY_MASS_TIME, QTY_AMB, QTY_COR, MASS_AMB, QTY_AMB, QTY_COR, MASS_AMB);
			type = srcObj.type;
			qty = srcObj.qty;
			
			/*
			if(Number(QTY_AMB)  !=  0){
				found = true;
				type  = "LT";
				qty   = Number(QTY_AMB);
			}else if(Number(QTY_COR)  !=  0){
				if(found){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.CALC_WITH_OBS_QTY'));
				}else{
					found = true;
					type  = "L15";
					qty   = Number(QTY_COR);
				}
			}else if(Number(MASS_AMB)  !=  0){
				if(found){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','SPECMOV.MESSAGE.CALC_WITH_COR_QTY'));
				}else{
					found = true;
					type  = "KG";
					qty   = Number(MASS_AMB);
				}
			}
			*/			
			var url:String = "../phpwrapper/calcvcf.php?frm_baseCd="+baseCode+"&frm_which_type="+type+"&frm_real_amount="+qty+"&frm_real_temp="+TEMP_AMB+"&frm_real_dens="+DENS_COR;
			
			var urlLoader:URLLoader = new URLLoader();
			urlLoader.addEventListener(Event.COMPLETE, function():void{
				var tmp:XML = XML(urlLoader.data);
				
				//QTY_AMB  = int(tmp.REAL_LITRE).toString();
				//QTY_COR  = int(tmp.REAL_LITRE15).toString();
				//MASS_AMB = int(tmp.REAL_KG).toString();
				QTY_AMB  = tools.roundString( tmp.REAL_LITRE, 0 );
				QTY_COR  = tools.roundString( tmp.REAL_LITRE15, 0 );
				MASS_AMB = tools.roundString( tmp.REAL_KG, 0 );
				QTY_AMB_REAL  = (tmp.REAL_LITRE).toString();
				QTY_COR_REAL  = (tmp.REAL_LITRE15).toString();
				MASS_AMB_REAL = (tmp.REAL_KG).toString();
				
			});
			try{urlLoader.load(new URLRequest(url));}catch(e:Error){}
		}
	}
}