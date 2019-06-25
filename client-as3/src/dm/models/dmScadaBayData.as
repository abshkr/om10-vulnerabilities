package dm.models
{
	import flash.utils.ByteArray;
	
	import mx.collections.ArrayCollection;
	
	import dm.comms.Scada;
	
	import events.ScadaEvent;

	public class dmScadaBayData extends ArrayCollection
	{
		public function dmScadaBayData(scada:Scada){
			scada.addEventListener(ScadaEvent.REGISTER_UPDATE, function(e:ScadaEvent):void{
				removeAll();
				if(e.data){
					for (var i:int = 0; i < e.data.length; i = i+22){
						var bayData:Object = new Object();
						bayData["arm_obs_qty"]  = ints2float(e.data[i+0], e.data[i+1]).toFixed(2);
						bayData["arm_std_qty"]  = ints2float(e.data[i+2], e.data[i+3]).toFixed(2);
						bayData["arm_mass"]     = ints2float(e.data[i+4], e.data[i+5]).toFixed(2);
						bayData["arm_temp"]     = ints2float(e.data[i+6], e.data[i+7]).toFixed(2);
						bayData["arm_pre_qty"]  = ints2float(e.data[i+8], e.data[i+9]).toFixed(2);
						bayData["arm_mtr1_gv"] 	= ints2float(e.data[i+10],e.data[i+11]).toFixed(2);
						bayData["arm_mtr1_flo"] = ints2float(e.data[i+12],e.data[i+13]).toFixed(2);
						bayData["arm_mtr1_temp"]= ints2float(e.data[i+14],e.data[i+15]).toFixed(2);
						bayData["arm_mtr2_gv"] 	= ints2float(e.data[i+16],e.data[i+17]).toFixed(2);
						bayData["arm_mtr2_flo"] = ints2float(e.data[i+18],e.data[i+19]).toFixed(2);
						bayData["arm_mtr2_temp"]= ints2float(e.data[i+20],e.data[i+21]).toFixed(2);
						addItem(bayData);
					}					
				}
				refresh();
			});
		}
		
		
		private function ints2float(low:int, high:int):Number{
			var s:ByteArray = new ByteArray();
			s.writeByte(high>>8);
			s.writeByte(high&255);
			s.writeByte(low>>8);
			s.writeByte(low&255);
			s.position = 0;
			return s.readFloat();
		}
	}
}