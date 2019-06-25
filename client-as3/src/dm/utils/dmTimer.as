package dm.utils
{
	
	import flash.events.TimerEvent;
	import flash.utils.Timer;
	
	public class dmTimer{
		
		private var callList:Array;
		private var params:Array;
		private var pulse:Timer;
		
		public function dmTimer( delay : int ){
			
			pulse = new Timer(delay);
			pulse.addEventListener(TimerEvent.TIMER, beacon);
			callList = new Array();
			params = new Array();
			
		}
		
		public function start():void{
			pulse.start();
		}
		
		private function beacon(e:TimerEvent):void{
			
			
			for(var i:int = 0; i < callList.length; i ++){
				
				(callList[i] as Function)();
				
			}
			
		}
		
		public function addEvent( func:Function, params : * = false ):void{
			
			callList.push(func);
			this.params.push(params);
			
		}
		
		public function removeEvent( call:String):void{
			
		}
		
		public function stop():void{
			pulse.stop();
			
		}
		
	}
	
}