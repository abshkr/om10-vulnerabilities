package
{
	import flash.events.IEventDispatcher;
	
	import mx.core.IVisualElement;
	
	public interface IModuleInterface extends IEventDispatcher 
	{
		function setState(value:String): void;
		function setSecurity(isRead:Boolean=true, isUpdate:Boolean=false, isCreate:Boolean=false, isDelete:Boolean=false, isPassword:Boolean=false): void;
		function setSize(w:int, h:int): void;
		function setCallback(value:Function):void;
	}
	
}