package events
{
	import flash.events.Event;
	
	public class ScadaEvent extends Event
	{
		private var _data:Object;
		
		public static var COIL_UPDATE:String 	 = "coil_update";
		public static var REGISTER_UPDATE:String = "register_update";
		
		public function ScadaEvent(type:String, data:Object=null, bubbles:Boolean=false, cancelable:Boolean=false)
		{
			super(type, bubbles, cancelable);
			_data = data;
		}
		
		override public function clone(): Event
		{
			return new ObjEvent(type, _data, bubbles, cancelable);
		}
		
		public function get data():Object
		{
			return _data;
		}
		
	}
}