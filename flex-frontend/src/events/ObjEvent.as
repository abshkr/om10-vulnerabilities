package events
{
	import flash.events.Event;
	
	public class ObjEvent extends Event
	{
		private var _data:Object;
		
		public function ObjEvent(type:String, bubbles:Boolean=false, cancelable:Boolean=false, data:Object=null)
		{
			super(type, bubbles, cancelable);
			_data = data;
		}
		
		override public function clone(): Event
		{
			return new ObjEvent(type, bubbles, cancelable, data);
		}
		
		public function get data():Object
		{
			return _data;
		}
		
	}
}