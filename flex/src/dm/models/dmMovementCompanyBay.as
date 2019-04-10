package dm.models{
	import avmplus.getQualifiedClassName;
	
	import dm.DM;

	public dynamic class dmMovementCompanyBay extends dmModel{
		
		public function dmMovementCompanyBay(params:* = false){
			super(params);
		}
		
		
		// data representation
		public function get clnBay():String{
			return payload.BACL_BAY_CODE;
		}
		public function get clnCmpyCode():String{
			return payload.BACL_CMPY_CODE;
		}
		public function get clnCmpyName():String{
			for each (var o:Object in DM.MovementCompanyBays.companys){
				if(payload.BACL_CMPY_CODE == o.CMPY_CODE)return o.CMPY_NAME;
			}
			return payload.BACL_CMPY_CODE;
		}
		public function get clnBayType():String{
			//return DM.MovementCompanyBays.types[payload.BACL_BAY_TYPE];
			for each (var o:Object in DM.MovementCompanyBays.types){
				if(payload.BACL_BAY_TYPE == o.BAY_TYPE_ID)return o.BAY_TYPE_NAME;
			}
			return payload.BACL_BAY_TYPE;
		}
	}
}