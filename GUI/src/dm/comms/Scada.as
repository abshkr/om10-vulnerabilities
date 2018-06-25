package dm.comms{
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.IOErrorEvent;
	import flash.events.ProgressEvent;
	import flash.events.SecurityErrorEvent;
	import flash.events.TimerEvent;
	import flash.net.Socket;
	import flash.utils.Timer;
	
	import events.ScadaEvent;

	public class Scada extends EventDispatcher{
			
		// status strings
		public static var STATUS_NOT_CONNECTED:String 	= "not connected";
		public static var STATUS_CONNECTED:String 		= "connected";
		public static var STATUS_CONNECTING:String 		= "connecting...";
		// status variable
		[Bindable] public var status:String = STATUS_NOT_CONNECTED;
		// socket variable - private
		private var socket:Socket 			= new Socket();
		private var ip:String				= "";
		private var port:int 				= 80;
		// Modbus Values
		private var register_bytes:Array    = new Array();
		private var coil_bits:Array 		= new Array();
		public function Scada(ip:String, port:int){
			this.ip 	= ip;
			this.port 	= port;
			//suppress errors
			socket.addEventListener(IOErrorEvent.IO_ERROR, function (e:*):void{
				status = "not connected";
				var timer:Timer = new Timer(5000,1);
				timer.addEventListener(TimerEvent.TIMER_COMPLETE, function(e:TimerEvent){
					status = "connecting...";
					if(!socket.connected)socket.connect(this.ip, this.port);
				});
				timer.start();
			});
			socket.addEventListener(SecurityErrorEvent.SECURITY_ERROR, function (e:*):void{
				status = "not connected";
				var timer:Timer = new Timer(5000,1);
				timer.addEventListener(TimerEvent.TIMER_COMPLETE, function(e:TimerEvent){
					status = "connecting...";
					if(!socket.connected)socket.connect(this.ip, this.port);
				});
				timer.start();
			});
			socket.addEventListener(Event.CLOSE, function (e:*):void{
				status = "not connected";
				var timer:Timer = new Timer(5000,1);
				timer.addEventListener(TimerEvent.TIMER_COMPLETE, function(e:TimerEvent){
					status = "connecting...";
					if(!socket.connected)socket.connect(this.ip, this.port);
				});
				timer.start();
			});
			socket.addEventListener(Event.CONNECT, function (e:*):void{
				status = "connected";
			});
			socket.addEventListener(ProgressEvent.SOCKET_DATA, function():void{
				var sc:String = socket.readUTFBytes(socket.bytesAvailable);
				var points:Array = sc.split("\n");
				
				var coil_update:Boolean     = false;
				var register_update:Boolean = false;
				
				for each (var point:String in points){
					if(point.indexOf(":")>-1){
						var d:String = point.split("|")[0];
						var p:int = int(point.split("|")[1].split(":")[0]);
						var v:int = int(point.split("|")[1].split(":")[1]);			
						if(d == 'i'){
							coil_bits[p] = v;
							coil_update = true;
						}else{
							register_bytes[p] = v;
							register_update = true;
						}
					} 
				}
				if(coil_update){
					dispatchEvent(new ScadaEvent(ScadaEvent.COIL_UPDATE,coil_bits,true)); 
				}
				if(register_update){
					dispatchEvent(new ScadaEvent(ScadaEvent.REGISTER_UPDATE,register_bytes,true));
				}
			});
			status = "connecting...";
			socket.connect(this.ip, this.port);
		}
	}
}