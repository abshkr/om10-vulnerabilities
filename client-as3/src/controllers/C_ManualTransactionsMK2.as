package controllers
{
	
	import dm.DM;
	import dm.models.dmManualTransaction;
	import dm.models.dmModel;
	
	import flash.events.EventDispatcher;
	
	import views.v_ManualTransactionsMK2;
	
	//import valueObjects.Transactions;	
	
	
	
	/////////////////////////
	/////////////////////////
	public class C_ManualTransactionsMK2 extends EventDispatcher
	{
		
		[Bindable] public var readOnly:Boolean = false;
		[Bindable] public var canReset:Boolean = false;
		[Bindable] public var canUpdate:Boolean = false;
		[Bindable] public var canCreate:Boolean = true;  //dev
		[Bindable] public var canDelete:Boolean = false;
		[Bindable] public var hasPassword:Boolean = false;
		
		[Bindable] public var view:v_ManualTransactionsMK2;
		
		public function C_ManualTransactions()
		{
			
		}
		
		
	}
}