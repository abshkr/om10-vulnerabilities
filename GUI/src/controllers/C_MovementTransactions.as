package controllers
{
	import dm.DM;
	
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.utils.Timer;
	import flash.utils.setTimeout;
	
	import mx.collections.ArrayCollection;
	import mx.core.FlexGlobals;
	import mx.managers.PopUpManager;
	import mx.utils.ObjectUtil;
	
	import views.v_MovementTransactions;
	
	public class C_MovementTransactions extends EventDispatcher
	{
		
		[Bindable] public var readOnly:Boolean = false;
		[Bindable] public var canReset:Boolean = false;
		[Bindable] public var canUpdate:Boolean = false;
		[Bindable] public var canCreate:Boolean = false;
		[Bindable] public var canDelete:Boolean = false;
		[Bindable] public var hasPassword:Boolean = false;
		
		private var _view:v_MovementTransactions;
		
		public function C_MovementTransactions()
		{
			
		}
		
		[Bindable]
		public function get view():v_MovementTransactions
		{
			return _view;
		}
		
		public function set view(value:v_MovementTransactions):void
		{
			_view = value;
		}
	}
}