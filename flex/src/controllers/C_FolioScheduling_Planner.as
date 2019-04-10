package controllers
{
	
	import avmplus.getQualifiedClassName;
	
	import components.DKI_Button;
	import components.FlexiTimer;
	
	import dm.DM;
	import dm.collections.dmFolioScheduling;
	import dm.collections.dmFolioSettings;
	import dm.models.dmFolioExceptionDate;
	import dm.models.dmFolioSchedule;
	
	import flash.events.IEventDispatcher;
	import flash.events.MouseEvent;
	import flash.net.getClassByAlias;
	
	import mx.collections.ArrayCollection;
	import mx.events.CollectionEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	import mx.utils.ObjectUtil;
	
	import views.v_FolioSchedulling_Planner;
	
	public class C_FolioScheduling_Planner
	{
		
		[Bindable] public static var filterDescription:String = "";
		[Bindable] public static var filterRule:String        = "All";
		
		[Bindable] public var view:v_FolioSchedulling_Planner;
		[Bindable] public var dgExceptionData:ArrayCollection;
		[Bindable] public var dgOverrideData:ArrayCollection;
		
		[Bindable] public var dgSelectionRules:ArrayCollection;
		
		[Bindable] public var addModel:Function;
		
		
		public function removeModel(event:MouseEvent):void{
			var model:dmFolioSchedule = view.exceptionDG.selectedItem as dmFolioSchedule;
			if(model == null){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MSG.SEL2DEL'));
				return;
			}
			if(model.payload.WINDOW_NAME == "ONCE_WINDOW"){
				var dateData:Array = model.payload.REPEAT_INTERVAL.split("_");
				var date:Date = new Date(dateData[2],(dateData[1]-1),dateData[0]);
				var today:Date = new Date(
					global.serverTime.split(" ")[0].split("-")[0], 
					(global.serverTime.split(" ")[0].split("-")[1]-1), 
					global.serverTime.split(" ")[0].split("-")[2]);
				if(date.time < today.time){
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MSG.CANNOT_DEL_ONCE_OFF'));
					return;					
				}
			}
			if(model){
				model.remove({
					onSuccess : function():void{reloadAndGoToNormal();global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MSG.EXCEPT_REMOVED'))}
				});
			}else{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MSG.SEL_RULE2REMOVE'));
			}
		}
		
		public function updateModel(event:MouseEvent):void{
			var model:dmFolioSchedule = view.exceptionDG.selectedItem as dmFolioSchedule;
			if(model == null){
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MSG.SEL2UPD'));
				return;
			}
			if(model){
				model.update({
					onSuccess: function():void{reloadAndGoToNormal();global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MSG.DESC_UPD'))},
					payload:{
						DESCRIPTION: view.descriptionTextInput.text
					}
				});
			}else{
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MSG.SEL_RULE2UPD'));
			}			
		}
		
		
		
		public function createModel(event:MouseEvent):void{
			//
			var rInterval:String = "";
			switch(view.selectionRule.selectedItem.qualifier){
				case "ONCE_WINDOW":
					var hours:Number = Number(DM.FolioSettings.nextDailyReportHour);
					var minute:Number = Number(DM.FolioSettings.nextDailyReportMin);
					var seconds = (minute*60 + hours*60*60);
					if(global.serverDateTime.time >= (view.oodDC.selectedDate.time + seconds*1000)){
						global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MSG.CANNOT_ADD_EXP_PAST'));
						return;
					}
					rInterval = view.oodDC.selectedDate.date+"_"+(view.oodDC.selectedDate.month+1)+"_"+view.oodDC.selectedDate.fullYear;
					break;
				case "WEEK_WINDOW":
					rInterval = view.daysList.selectedItem.code;
					break;
				case "MONTH_WINDOW":
					rInterval = view.dateStepper.value+"";
					break;
				case "DATE_YEAR_WINDOW":
					rInterval = view.dateStepper.value+"_"+(view.monthList.selectedIndex+1);
					break;
				case "YEAR_WINDOW":
					rInterval = view.itterationList.selectedIndex+"_"+view.daysList.selectedItem.code+"_"+(view.monthList.selectedIndex+1);	
					break;
				default:
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MSG.UNKNOWN_SEL_RULE'));
					return;
			}
			addModel(view.selectionRule.selectedItem.qualifier,rInterval,view.descriptionTextInput.text, 
				function(o:Object):void{
					
					if(o)if(o.hasOwnProperty("resultOK")){
						if(!o.resultOK){
							//global.msgWarning(o.errorMessage);
							global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MSG.EXCEPT_CREATE_FAILED'));
							return;		
						}
					}
					reloadAndGoToNormal();global.msgSuccess(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MSG.EXCEPT_CREATED'));
			});
			
		}
		public function reloadAndGoToNormal(response:Object = null):void{
			DM.FolioSchedullings.reload();
			view.currentState="normal";
			if(view.selectionRule)view.selectionRule.selectedIndex = 0;
			if(view.descriptionTextInput)view.descriptionTextInput.text = "";
			trace("Reload: "+ObjectUtil.toString(response));
		}
		public function createCancel(event:MouseEvent):void{
			this.view.currentState = "normal";
		}
		public function newModel(event:MouseEvent):void{
			this.view.currentState = "new_exception";
		}
		public function editModel(event:MouseEvent):void{
			var model:dmFolioSchedule = view.exceptionDG.selectedItem as dmFolioSchedule;
			if(model){
				this.view.currentState = "edit_exception";
				view.descriptionTextInput.text = model.payload.DESCRIPTION;
				view.descriptionTextInput.setFocus();
			}else{
				//global.msgWarning("Select an exception rule to be removed.");
				global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.MSG.SEL_RULE2REMOVE'));
			}
		}
		
		public function C_FolioScheduling_Planner(){
			DM.FolioSchedullings.removeEventListener(CollectionEvent.COLLECTION_CHANGE, DMUpdated);
			DM.FolioSchedullings.addEventListener(CollectionEvent.COLLECTION_CHANGE, DMUpdated);
			DMUpdated(null);
			dgSelectionRules = new ArrayCollection();
			var s:Object = {mf:"dor", mn:"lol"};
			dgSelectionRules.addItem({label:mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.RULES.ONCE_WINDOW'), qualifier:"ONCE_WINDOW"});
			dgSelectionRules.addItem({label:mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.RULES.WEEK_WINDOW'),   qualifier:"WEEK_WINDOW"});
			dgSelectionRules.addItem({label:mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.RULES.MONTH_WINDOW'), qualifier:"MONTH_WINDOW"});
			dgSelectionRules.addItem({label:mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.RULES.DATE_YEAR_WINDOW'),  qualifier:"DATE_YEAR_WINDOW"});
			dgSelectionRules.addItem({label:mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.RULES.YEAR_WINDOW'),	 qualifier:"YEAR_WINDOW"});
			
		}
		
		
		private function DMUpdated(event:CollectionEvent):void{
			dgExceptionData = new ArrayCollection(DM.FolioSchedullings.source);
			dgOverrideData  = new ArrayCollection(DM.FolioSchedullings.source);
			dgExceptionData.filterFunction = dgExceptionDataFilter;
			dgOverrideData.filterFunction  = dgOverrideDataFilter;
			dgExceptionData.refresh();
			dgOverrideData.refresh();
			trace("DM UPDATED");
			
		}
		
		private function dgExceptionDataFilter(data:Object):Boolean
		{
			var allTxt:String=mx.resources.ResourceManager.getInstance().getString('default','FOLIO_SCHEDULING.PLANNER.RULES.ALL_WINDOW');
			// TODO Auto Generated method stub
			if(data){
				if((data as dmFolioSchedule).payload.STATUS == "1" &&
					(data as dmFolioSchedule).payload.WINDOW_NAME != "OVERRIDE"){
					if(((data as dmFolioSchedule).UIWindow) != filterRule && filterRule!=allTxt && filterRule != "" )return false;
					if(((data as dmFolioSchedule).payload.DESCRIPTION as String).toLowerCase().indexOf(filterDescription.toLowerCase())==-1)return false;
					return true;
				}
			}
			return false;
		}
		
		private function dgOverrideDataFilter(data:Object):Boolean
		{
			// TODO Auto Generated method stub
			if(data){
				if((data as dmFolioSchedule).payload.STATUS != "0" &&
					(data as dmFolioSchedule).payload.WINDOW_NAME == "OVERRIDE"){
					
					
					return true;
				}
			}
			return false;
			
		}
		
	}
}

