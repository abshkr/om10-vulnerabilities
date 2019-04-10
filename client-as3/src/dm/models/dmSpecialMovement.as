package dm.models{
	
	
	import dm.DM;
	
	import mx.utils.ObjectUtil;

	public dynamic class dmSpecialMovement extends dmModel{
		
		
		
		public function get movementDateTime():String{
			return payload.MLITM_DTIM_START;
		}
		public function get movementType():String{
			try{
				for each(var o:Object in DM.SpecialMovements.types){
					if(Number(o.MOVITEM_TYPE_ID) == payload.MLITM_TYPE){
						return o.MOVITEM_TYPE_NAME;
					}
				}
				return "Unknown Type";
				//return DM.SpecialMovements.types[Number(payload.MLITM_TYPE)];
			}catch(e:Error){
				trace(ObjectUtil.toString(payload));	
			}
			return "Unknown Type";
		}
		public function get movementNumber():String{
			return payload.MLITM_ID;
		}
		public function get reasonCode():String{
			return payload.MLITM_REASON_CODE;
		}
		public function get movementStatus():String{
			try{
				for each(var o:Object in DM.SpecialMovements.status){
					if(Number(o.ID) == payload.MLITM_STATUS){
						return o.Name;
					}
				}
				return "Unknown Status";	
			}catch(e:Error){
				
			}
			return "Unknown Status";
		}
		public function get reasonCodeString():String{
			for each (var rc:dmMovementReason in DM.MovementReasons){
				//if(rc.clnId == reasonCode)return rc.clnAction;
				if(rc.clnId == payload.MLITM_REASON_CODE)return rc.clnAction;
			}
			//return reasonCode;
			return payload.MLITM_REASON_CODE;
			
		}		
		public function get lastModifiedDateTime():String{
			// kill off the millisecond
			return payload.MLITM_DTIM_POSTED;
		}
		public function get lastModifiedUser():String{
			return payload.MLITM_OPER_POSTED;
		}
		
		

		public function dmSpecialMovement(params:* = false){
			super(params);
		}		
	}
}