package dm.models{
	import avmplus.getQualifiedClassName;
	
//	import dm.collections.dmMovementItems;
	
	import dm.DM;
	
	public dynamic class dmMovement extends dmModel{
		
//		public var movementItems:dmMovementItems;
		
		public function dmMovement( params : * = false ){
	
			
			super(params);
//			this.dmClass = 'dmMovement';
		
//			movementItems = new dmMovementItems({ autopopulate : false });
			
		}
/*		
		public function attachMovementItems( params : * = false ):void
		{
			Server.invoke(this, 'getMovementItems', false, attachMovementItemData);
		}
		
		public function attachMovementItemData( response : * = false ):void
		{
			movementItems.source = response.data.collection;
		}
*/		
		                                 
		// data representation
		public function get clnMovId():String
		{
			return payload.MV_ID;
		}
		public function get clnMovTerminal():String
		{
			for each (var o:Object in DM.MovementNominations.terminals)
			{
				if(payload.MV_TERMINAL == o.TERM_CODE)
				{
					return o.CODE_NAME;
					//return o.TERM_NAME;
				}
			}
			return payload.MV_TERMINAL;
		}
		public function get clnMovNumber():String
		{
			return payload.MV_NUMBER;
		}
		public function get clnMovKey():String
		{
			return payload.MV_KEY;
		}
		public function get clnMovStatus():String
		{
			return DM.MovementNominations.movStatus[payload.MV_STATUS];
			//return payload.MV_STATUS;
		}
		public function get clnMovSource():String
		{
			return DM.MovementNominations.movSourcesAll[payload.MV_SRCTYPE];
			//return payload.MV_SRCTYPE;
		}
		public function get clnMovDtimEffect():String
		{
			return payload.MV_DTIM_EFFECT;
		}
		public function get clnMovDtimExpiry():String
		{
			return payload.MV_DTIM_EXPIRY;
		}
		public function get clnMovDtimCreate():String
		{
			return payload.MV_DTIM_CREATE;
		}
		public function get clnMovDtimChange():String
		{
			return payload.MV_DTIM_CHANGE;
		}
		public function get clnMovOperChange():String
		{
			for each (var o:Object in DM.MovementNominations.operators)
			{
				if(payload.MV_OPER_CHANGE == o.PER_CODE)
				{
					//return o.PER_NAME;
					return o.CODE_NAME;
				}
			}
			return payload.MV_OPER_CHANGE;
		}
		
	}
		
}