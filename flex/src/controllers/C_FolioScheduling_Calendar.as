package controllers{
	
	import dm.DM;
	import dm.collections.dmFolioScheduling;
	import dm.models.dmFolioSchedule;
	
	import views.v_FolioSchedulling_Calendar;
	
	public class C_FolioScheduling_Calendar{
		// the view
		[Bindable] public var view:v_FolioSchedulling_Calendar;
		// set on C_FolioScheduling
		[Bindable] public var toggleDate:Function;
		
		
		[Bindable] public static var SELECTED_YEAR:Number  = new Date().fullYear;
		[Bindable] public static var SELECTED_MONTH:Number = new Date().month;
		
		
		public function C_FolioScheduling_Calendar(){
		}		
	}
}