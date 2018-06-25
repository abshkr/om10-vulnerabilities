package dm.models
{
	import dm.comms.Scada;
	
	import events.ScadaEvent;

	public class dmScadaInterlocks
	{
		[Bindable] public var interlock1:Boolean = false;
		[Bindable] public var interlock2:Boolean = false;
		[Bindable] public var interlock3:Boolean = false;
		[Bindable] public var interlock4:Boolean = false;
		
		public function dmScadaInterlocks(scada:Scada){
			scada.addEventListener(ScadaEvent.COIL_UPDATE, function(e:ScadaEvent):void{
				if(e.data){
					interlock1 = !e.data[0];
					interlock2 = e.data[3];
					interlock3 = e.data[4];
					interlock4 = e.data[5];
				}
			});
		}
	}
}