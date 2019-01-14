package dm.models{
	import avmplus.getQualifiedClassName;
	
	//	import dm.collections.dmMovementItems;
	
	import dm.DM;
	
	public dynamic class dmMovementSchedule extends dmModel{
		
		public function dmMovementSchedule( params : * = false ){
			
			
			super(params);
			//			this.dmClass = 'dmMovement';
			
			//			movementItems = new dmMovementItems({ autopopulate : false });
			
		}

		
		// data representation
		public function get clnTripNumber():String
		{
			return payload.SHLS_TRIP_NO;
		}
		public function get clnTripVehicle():String
		{
			return payload.TNKR_CODE;
		}
		public function get clnTripSupplier():String
		{
			for each (var o:Object in DM.MovementSchedules.suppliers)
			{
				if(payload.SUPPLIER_CODE == o.CMPY_CODE)
				{
					return o.CODE_NAME;
				}
			}
			return payload.SUPPLIER_CODE;
		}
		public function get clnTripCarrier():String
		{
			for each (var o:Object in DM.MovementSchedules.carriers)
			{
				if(payload.CARRIER_CODE == o.CMPY_CODE)
				{
					return o.CODE_NAME;
				}
			}
			return payload.CARRIER_CODE;
		}
		public function get clnTripDate():String
		{
			return payload.SHLS_CALDATE;
		}
		public function get clnTripOperator():String
		{
			for each (var o:Object in DM.MovementSchedules.operators)
			{
				if(payload.OPERATOR == o.PER_NAME)
				{
					return o.CODE_NAME;
				}
			}
			return payload.OPERATOR;
		}
		public function get clnTripStatus():String
		{
			for each (var o:Object in DM.MovementSchedules.tripStatus)
			{
				if(payload.SHLS_STATUS == o.STATUS_TEXT)
				{
					return o.CODE_NAME;
				}
			}
			return payload.SHLS_STATUS;
		}
		public function get clnTripStart():String
		{
			return payload.SHLS_LD_START;
		}
		public function get clnTripEnd():String
		{
			return payload.SHLS_LD_END;
		}
		public function get clnTripType():String
		{
			return payload.LD_TYPE;
		}
		public function get clnTripUnload():String
		{
			return payload.SHLS_LD_TYPE;
		}
		public function get clnTripMovement():String
		{
			return payload.MV_KEY;
		}
		public function get clnTripReversed():String
		{
			return payload.LOAD_REVERSE_FLAG;
		}
		
		
	}
	
}