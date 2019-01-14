package events
{
	import flash.events.Event;
	
	public class CumulusEvent extends Event
	{
		private var _message:Object;
		
		public function CumulusEvent(type:String, data:Object=null, bubbles:Boolean=false, cancelable:Boolean=false)
		{
			super(type, bubbles, cancelable);
			_message = data;
		}
		
		override public function clone(): Event
		{
			return new ObjEvent(type, _message, bubbles, cancelable);
		}
		
		public function get message():Object
		{
			return _message;
		}
		
	}
}