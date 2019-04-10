package dm.models
{
	public dynamic class dmCloseoutMeter extends dmModel
	{	
		public function dmCloseoutMeter( params : * = false )
		{
			super(params);
			this.dmClass = 'dmCloseoutMeter';
		}
		
		public function get QTY_AMB():Number{
			return Number(this["CLOSE_AMB_TOT"]) - Number(this["OPEN_AMB_TOT"]);
		}
		public function get QTY_KG():Number{
			return Number(this["CLOSE_MASS_TOT"]) - Number(this["OPEN_MASS_TOT"]);
		}
		
	}		
}