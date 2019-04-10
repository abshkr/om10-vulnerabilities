package components{
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.TimerEvent;
	import flash.utils.Timer;

	public class FlexiTimer extends EventDispatcher{
		private var _timer:Timer;
		private var _splits:Number;
		private var _count:uint;
		private var _functions:Array;
		private var _currentFunctions:Array;
		private var _paused:Boolean; 
		
		[Bindable ("update")] public function get iteration():int{return _count%_splits+1;}
		[Bindable ("update")] public function get count():int{return _count;}
		
		public function pause():void{_paused = true;}
		public function resume():void{_paused = false;}
				
		public function FlexiTimer(duration:int = 60, splits:int = 4, paused:Boolean = false){
			_timer = new Timer(duration*1000,0);
			_timer.addEventListener(TimerEvent.TIMER, onTimer);
			_timer.start();
			_count = 0;
			_paused = paused;
			_splits = splits;
			_functions = new Array();
			for (var i:int = 0; i < splits; i++){
				_functions[i] = new Array();
			}			
		}
		
		public function attachFunction(f:Function, s:int = 1, run_at_once:int=0):Boolean{
			if(s > _splits || s <= 0)return false;
			_functions[s-1].push(f);
			if ( run_at_once > 0 )
			{
				f();
			}
			return true;
		}
		public function removeFunction(f:Function, s:int = 1):Boolean{
			if(s > _splits || s <= 0)return false;
			var x = _functions[s-1].indexOf(f);
			if(x == -1)return false;
			_functions[s-1].splice(x,1);
			return true;
		}
		
		protected function onTimer(event:TimerEvent):void{
			_count++;dispatchEvent(new Event("update"));
			if(!_paused){
				for (var i:int = 1; i <= _splits; i++) {	
					if(_count%i==0){
						_currentFunctions = _functions[i-1];
						for each(var f:Function in _currentFunctions){
							f();
						}
					}
				}	
				
			}
			
		}
	}
}