package controllers{
	
	import dm.DM;
	import dm.collections.dmCollection;
	import dm.models.dmFolioSchedule;
	
	import flash.events.EventDispatcher;
	
	import mx.utils.ObjectUtil;
	
	import views.v_FolioScheduling;
	
	public class C_FolioScheduling extends EventDispatcher{
		// variables
		[Bindable] public var readOnly:Boolean = false;
		[Bindable] public var canReset:Boolean = false;
		[Bindable] public var canUpdate:Boolean = false;
		[Bindable] public var canCreate:Boolean = false;
		[Bindable] public var canDelete:Boolean = false;
		[Bindable] public var hasPassword:Boolean = false;
		// the view
		[Bindable] public var view:v_FolioScheduling;
		
		[Bindable] public var setUpdate: Boolean = false;
		
		public function C_FolioScheduling()
		{
			setUpdate = global.app.getUserPriv('90'); 
		}
		
		public function setToggleDateFunction():void{
			view.calendar.controller.toggleDate = toggleDate;
		}
		public function setPlannerFunctions():void{
			view.planner.controller.addModel = addModel;
			view.settings.controller.addModel = addModel;
		}
		
		
		private function addModel(window:String, interval:String, description:String, sucess:Function):String{
			trace(window,interval,description,sucess)
			// check existing values.
			for each(var d:dmFolioSchedule in DM.FolioSchedullings){
				if(d.payload.WINDOW_NAME 	  == window &&
					d.payload.REPEAT_INTERVAL == interval){
					if(d.payload.STATUS == "1"){
						global.msgWarning("This exception rule already exists!");
						return "ALREADY EXIST";	
					}else{
						d.update({
							onSuccess: sucess,
							payload:{
								STATUS 		: "1",
								DESCRIPTION	: description
							}
						});
						return "UPDATE";
					}
				}
			}
			// does not exist, create new.
			var newModel:dmFolioSchedule = new dmFolioSchedule({
				create 		: true,
				onSuccess 	: sucess,
				payload		:{
					WINDOW_NAME     : window,
					START_TIME      : "",
					END_TIME        : "",
					STATUS          : "1",
					REPEAT_INTERVAL : interval,
					DESCRIPTION     : description
				}					
			});
			return "NEW";
			
		}
		
		public function toggleDate(t:Boolean, d:Date, e:Object){
			trace(canUpdate);
			var rInterval:String = d.date+"_"+(d.month+1)+"_"+d.fullYear;
			if(!t){
				addModel("ONCE_WINDOW",rInterval,"Set From Calendar", DMReload);
			}else{
				if(e){
					if(e.payload.ONCE_WINDOW == "1"){
						for each (var a:dmFolioSchedule in DM.FolioSchedullings){
							if(a.payload.REPEAT_INTERVAL == rInterval && 
								a.payload.WINDOW_NAME    == "ONCE_WINDOW" && 
								a.payload.STATUS         == 1){
								a.remove({
									onSuccess 	: DMReload
								});
							}
						}
					}else{
						
						DM.FolioSchedullings.addSchedulingOverride({
							payload: {
								REPEAT_INTERVAL : rInterval
							}
						});
						
					}
				}
			}
		}
		
		private function DMReload(o:Object):void{
			DM.FolioSchedullings.reload();
		}
	}
}