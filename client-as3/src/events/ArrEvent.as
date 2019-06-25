package events
{
	import flash.events.Event;
	
	public class ArrEvent extends Event
	{
		private var _data:Array;
		
		public function ArrEvent(type:String, bubbles:Boolean=false, cancelable:Boolean=false, data:Array=null)
		{
			super(type, bubbles, cancelable);
			_data = data;
		}
		
		override public function clone(): Event
		{
			return new ArrEvent(type, bubbles, cancelable, data);
		}
		
		public function get data():Array
		{
			return _data;
		}
		
	}
}