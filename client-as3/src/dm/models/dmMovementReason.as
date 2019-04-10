package dm.models{
	
	
	import dm.DM;
	import mx.resources.ResourceManager;

	public dynamic class dmMovementReason extends dmModel{
		public function dmMovementReason(params:* = false){
			this.dmClass = "dmMovementReason";
			super(params);
		}
		
		
		public function get clnId():String{				return payload.MR_ID;}
		public function get clnAction():String{			return payload.MR_ACTION;}
		public function get clnMoveTypeOri():String{	return payload.MR_MOV_TYPE_ORI;}
		public function get clnReasonCodeOri():String{	return payload.MR_REASON_CODE_ORI;}
		public function get clnMoveTypeRev():String{	return payload.MR_MOV_TYPE_REV;}
		public function get clnReasonCodeRev():String{	return payload.MR_REASON_CODE_REV;}
		public function get clnFlag():Boolean{			return payload.MR_FLAG>=1;}
		public function get clnStatus():String{			
			if(payload.MR_FLAG==-1)return mx.resources.ResourceManager.getInstance().getString('default','MOVREASON.OPTION.MR_FLAG.DEL');
			if(payload.MR_FLAG==0) return mx.resources.ResourceManager.getInstance().getString('default','MOVREASON.OPTION.MR_FLAG.ADS');
			if(payload.MR_FLAG==1) return mx.resources.ResourceManager.getInstance().getString('default','MOVREASON.OPTION.MR_FLAG.AS');
			if(payload.MR_FLAG==2) return mx.resources.ResourceManager.getInstance().getString('default','MOVREASON.OPTION.MR_FLAG.ARS');
			return mx.resources.ResourceManager.getInstance().getString('default','MOVREASON.OPTION.MR_FLAG.UNKNOWN');
		}
		
		public function get guiReasonCode():String {	return clnReasonCodeOri +' - ' + clnAction;}
		
		// use the full type for better user experience
		private var useFullType:Boolean = true;
		public function get clnType():String{			
			if(useFullType){
				//for each (var type:String in DM.MovementReasons.types){
					//if(type.charAt(0) == payload.MR_TYPE.charAt(0))return type;
				for each (var type:Object in DM.MovementReasons.types){
					if(type.MOVITEM_TYPE_CODE == payload.MR_TYPE)
					{
						return type.MOVITEM_TYPE_NAME;
					}
				}
			}
			return payload.MR_TYPE;
		}
		public function get clnTypeID():Number{			
			for each (var type:Object in DM.MovementReasons.types){
				if(type.MOVITEM_TYPE_CODE == payload.MR_TYPE)
				{
					return type.MOVITEM_TYPE_ID;
				}
			}
			return -1;
		}
		
		public function toString():String{
			return clnReasonCodeOri;
		}
		
		
		
	}
}