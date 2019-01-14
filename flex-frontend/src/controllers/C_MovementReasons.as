package controllers
{
	import components.DKI_AlertBox;
	
	import dm.DM;
	import dm.models.dmMovementCompanyBay;
	import dm.models.dmMovementReason;
	import dm.utils.tools;
	
	import flash.display.DisplayObject;
	import flash.events.Event;
	
	import mx.core.FlexGlobals;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	
	import views.v_MovementReasons;
	
	
	public class C_MovementReasons
	{
		
		[Bindable] public static var ACTION_STRING:String     	 = "";
		[Bindable] public static var MOVETYPE_STRING:String   	 = "";
		[Bindable] public static var REASONCODE_STRING:String    = "";
		[Bindable] public static var TYPE_INDEX:Number     		 = -1;
		
		[Bindable] public var readOnly:Boolean = false;
		[Bindable] public var canReset:Boolean = false;
		[Bindable] public var canUpdate:Boolean = false;
		[Bindable] public var canCreate:Boolean = true;  //dev
		[Bindable] public var canDelete:Boolean = false;
		[Bindable] public var hasPassword:Boolean = false;

		[Bindable] public var view:v_MovementReasons;
		public function C_MovementReasons(){
			
			
		}
		// sorting code
		public function sortByID():void{
			//var columnIndexes:Vector.<int> = Vector.<int>([ 0 ]);
			//view.mainList.sortByColumns(columnIndexes, false);
		}
		// filtering code
		public function mainFilter(obj:dmMovementReason):Boolean{
			if(view.fltAction) 			if(ACTION_STRING!="")    	if(obj.clnAction.toUpperCase().indexOf(ACTION_STRING.toUpperCase())==-1)			return false;
			if(view.fltMoveType)		if(MOVETYPE_STRING!="")		if(obj.clnMoveTypeOri.toUpperCase().indexOf(MOVETYPE_STRING.toUpperCase())==-1)		return false;
			if(view.fltReasonCode)   	if(REASONCODE_STRING!="")   if(obj.clnReasonCodeOri.toUpperCase().indexOf(REASONCODE_STRING.toUpperCase())==-1)	return false;
			//if(view.fltType)   			if(TYPE_INDEX>-1)   		if(obj.clnType != view.fltType.selectedItem)										return false;
			if(view.fltType)   			if(TYPE_INDEX>-1)   		if(obj.MR_TYPE != view.fltType.selectedItem.MOVITEM_TYPE_CODE)										return false;
			return true;
		}
		public function refreshMainFilter():void{
			if(view.currentState!='widget')view.currentState = 'normal';
			DM.MovementReasons.filterFunction = mainFilter;
			DM.MovementReasons.refresh();
		}
		public function clearMainFilter():void{
			ACTION_STRING     	= "";
			MOVETYPE_STRING 	= "";
			REASONCODE_STRING   = "";
			TYPE_INDEX 			= -1;
			refreshMainFilter();
		}
		
		public function validateEntry():Boolean{
			if(!view.frmAction.text.split(' ').join('').length){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVREASON.MESSAGE.ENTER_ACTION'));
				view.frmAction.setFocus();
				return false;
			}
			if(view.frmType.selectedIndex==-1){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVREASON.MESSAGE.SELECT_TYPE'));
				view.frmType.setFocus();
				return false;
			}
			if(view.frmFlag.selected){
				if(!view.frmMoveTypeOri.text.split(' ').join('').length){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVREASON.MESSAGE.ENTER_ORIG_MOV_TYPE'));
					view.frmMoveTypeOri.setFocus();
					return false;
				}
				if(!view.frmReasonCodeOri.text.split(' ').join('').length){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVREASON.MESSAGE.ENTER_ORIG_REASON_CODE'));
					view.frmReasonCodeOri.setFocus();
					return false;
				}
				if(!view.frmMoveTypeRev.text.split(' ').join('').length){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVREASON.MESSAGE.ENTER_REVS_MOV_TYPE'));
					view.frmMoveTypeRev.setFocus();
					return false;
				}
				if(!view.frmReasonCodeRev.text.split(' ').join('').length){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MOVREASON.MESSAGE.ENTER_REVS_REASON_CODE'));
					view.frmReasonCodeRev.setFocus();
					return false;
				}
			}
			return true;
		}
		
		
		public function create():void{
			if(!validateEntry())return;
			var mr:dmMovementReason = new dmMovementReason({
				create:true,
				payload:{
					MR_ID                 :view.frmId.text,
					MR_ACTION             :view.frmAction.text,
					//MR_TYPE               :view.frmType.selectedItem.charAt(0),
					MR_TYPE               :view.frmType.selectedItem.MOVITEM_TYPE_CODE,
					MR_MOV_TYPE_ORI       :view.frmMoveTypeOri.text,
					MR_REASON_CODE_ORI    :view.frmReasonCodeOri.text,
					MR_MOV_TYPE_REV       :view.frmMoveTypeRev.text,
					MR_REASON_CODE_REV    :view.frmReasonCodeRev.text,
					MR_FLAG               :view.frmFlag.selected?1:0
				},
				onSuccess 	: successInModelAction 
				/*
				onSuccess:function():void{
					DM.MovementReasons.reload();
					view.currentState = 'normal';
				}
				*/
			});
			
		}
		public function remove():void{
			var selectedItem:dmMovementReason = view.mainList.selectedItem as dmMovementReason;
			var ad:DKI_AlertBox = new DKI_AlertBox();
			PopUpManager.addPopUp(ad,FlexGlobals.topLevelApplication  as DisplayObject,true);
			PopUpManager.centerPopUp(ad);
			ad.msg = mx.resources.ResourceManager.getInstance().getString('default','MOVREASON.MESSAGE.CONFIRM_DELETE') + " \r\n '"+selectedItem.clnAction+"' ?";
			ad.callBack = function():void{
				selectedItem.remove({
					//onSuccess 	: successInModelAction
					onSuccess:function():void{
						global.msgSuccess("'"+selectedItem.clnAction+"' " + mx.resources.ResourceManager.getInstance().getString('default','MOVREASON.MESSAGE.SUCCEED_DELETE'));
						DM.MovementReasons.reload();
						view.currentState = 'normal';
					}
				});	
			}
			
			
			
			
			
		}
		public function prepareForUpdate():void{
			var selectedItem:dmMovementReason = view.mainList.selectedItem as dmMovementReason;
			if(selectedItem.clnStatus == "Deleted")return;
			view.currentState = 'edit';
			view.callLater(function():void{
				view.frmId.text 						= selectedItem.clnId;
				view.frmAction.text						= selectedItem.clnAction;
				//view.frmType.selectedItem				= selectedItem.clnType;
				view.frmType.selectedIndex 				= tools.getItemIndexFromCode( selectedItem.payload.MR_TYPE, DM.MovementReasons.types, "MOVITEM_TYPE_CODE");
				view.frmMoveTypeOri.text				= selectedItem.clnMoveTypeOri;
				view.frmReasonCodeOri.text				= selectedItem.clnReasonCodeOri;
				view.frmMoveTypeRev.text				= selectedItem.clnMoveTypeRev;
				view.frmReasonCodeRev.text				= selectedItem.clnReasonCodeRev;
				view.frmFlag.selected					= selectedItem.clnFlag;			
			});
		}
		
		public function prepareForCreate():void{
			
			view.currentState = 'create';
			view.callLater(function():void{
				var selectedItem:dmMovementReason = view.mainList.selectedItem as dmMovementReason;
				view.frmId.text 						= DM.MovementReasons.nextID+"";
				view.frmAction.text						= "";
				view.frmType.selectedIndex				= -1;
				view.frmMoveTypeOri.text				= "";
				view.frmReasonCodeOri.text				= "";
				view.frmMoveTypeRev.text				= "";
				view.frmReasonCodeRev.text				= "";
				view.frmFlag.selected					= false;			
			});
		}
		public function update():void{
			if(!validateEntry())return;
			var selectedItem:dmMovementReason = view.mainList.selectedItem as dmMovementReason;
			selectedItem.update({
				payload:{
					MR_ID                 :view.frmId.text,
					MR_ACTION             :view.frmAction.text,
					//MR_TYPE               :view.frmType.selectedItem.charAt(0),
					MR_TYPE               :view.frmType.selectedItem.MOVITEM_TYPE_CODE,
					MR_MOV_TYPE_ORI       :String(view.frmMoveTypeOri.text),
					MR_REASON_CODE_ORI    :String(view.frmReasonCodeOri.text),
					MR_MOV_TYPE_REV       :String(view.frmMoveTypeRev.text),
					MR_REASON_CODE_REV    :String(view.frmReasonCodeRev.text),
					MR_FLAG               :view.frmFlag.selected?1:0
				},
				onSuccess 	: successInModelAction
			});
		}
		
		public function showOperationResult( response:*, showSuccess:Boolean=true ):void
		{
			var msg:String = "";
			if ( response.resultOK == true )
			{
				if ( showSuccess == false )
				{
					return;
				}
				msg = response.dev;
				if ( response.opType == "create" )
				{
					msg = mx.resources.ResourceManager.getInstance().getString('default','MSG_CREATE__SUCCESS');
				}
				if ( response.opType == "update" )
				{
					msg = mx.resources.ResourceManager.getInstance().getString('default','MSG_UPDATE__SUCCESS');
				}
				if ( response.opType == "delete" )
				{
					msg = mx.resources.ResourceManager.getInstance().getString('default','MSG_DELETE__SUCCESS');
				}
				global.msgSuccess( msg );
			}
			else
			{
				if ( response.opType == "create" )
				{
					msg = mx.resources.ResourceManager.getInstance().getString('default','ERROR_CREATE__FAILURE');
				}
				if ( response.opType == "update" )
				{
					msg = mx.resources.ResourceManager.getInstance().getString('default','ERROR_UPDATE__FAILURE');
				}
				if ( response.opType == "delete" )
				{
					msg = mx.resources.ResourceManager.getInstance().getString('default','ERROR_DELETE__FAILURE');
				}
				global.msgFail( msg );
				
				//var errorBox:MessageArea = new MessageArea( response.dev );
			}
			
		}
		
		public function successInModelAction(response:*):void
		{
			DM.MovementReasons.reload();
			view.currentState = 'normal';
			
			//trace("+++!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Success");
			//tools.pr ( response );
			//trace("+++!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Success");
			
			this.showOperationResult( response );
		}
	}
}