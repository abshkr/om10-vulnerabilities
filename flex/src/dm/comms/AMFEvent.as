package dm.comms.amf{

	import flash.events.Event;
	
	public class RESTEvent extends Event {
	
		public static const CUSTOM:String = "custom";
		public var arg:*;
		
		public function RESTEvent(type:String, customArg:* = null, bubbles:Boolean = false, cancelable:Boolean = false){
	
			super(type, bubbles, cancelable);
			this.arg = customArg;
			
		}
		
		public override function clone():Event {
			return new RESTEvent(type, arg, bubbles, cancelable);
		}
		
		public override function toString():String {
			return formatToString("CustomEvent", "type", "arg", "bubbles", "cancelable", "eventPhase");
		}
	
	}
	
}