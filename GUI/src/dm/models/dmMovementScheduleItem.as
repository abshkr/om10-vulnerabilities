package dm.models{
	
	import dm.DM;
	import dm.utils.tools;
	
	public dynamic class dmMovementScheduleItem extends dmModel{
		public var action:String;
		
		public function dmMovementScheduleItem( params : * = false ){
			
			this.dmClass = 'dmMovementScheduleItem';
			super(params);
			
			action = " ";
			trace( "=====================", "Here I am in the dmMovementScheduleItem.constructor");
		}
		
		
		// data representation
		public function get clnItemAction():String
		{
			return action;
		}
		public function get clnItemLine():String
		{
			return payload.MSITM_LINEID;
		}
		public function get clnItemMovement():String
		{
			return payload.MSITM_MOVEID;
		}
		public function get clnItemMoveitem():String
		{
			var item_id:int;
			item_id = int(payload.MSITM_MOVEID) * 1000 + int(payload.MSITM_MOVITEM);
			return String(item_id);
			//return payload.MSITM_MOVITEM;
		}
		public function get clnItemTrailer():String
		{
			for each (var o:Object in DM.MovementSchedules.trailers)
			{
				if(payload.MSITM_TRAILER == o.EQPT_ID)
				{
					return o.CODE_NAME;
					//return o.TERM_NAME;
				}
			}
			return payload.MSITM_TRAILER;
		}
		public function get clnItemTrailerComp():String
		{
			return payload.MSITM_TRAILERCOMP;
		}
		public function get clnItemCompartment():String
		{
			return payload.MSITM_CMPTID;
		}
		public function get clnItemProduct():String
		{
			for each (var o:Object in DM.MovementSchedules.products)
			{
				if(payload.MSITM_PRODCODE == o.PROD_CODE)
				{
					return o.CODE_NAME;
				}
			}
			return payload.MSITM_PRODCODE;
		}
		public function get clnItemQtyScheduled():String
		{
			return payload.MSITM_SPECQTY;
		}
		public function get clnItemQtyDelivered():String
		{
			//return String(int(Number(payload.MSITM_DELVQTY)+0.5));
			return tools.roundString( payload.MSITM_DELVQTY, 0);
		}
		public function get clnItemQtyPreloaded():String
		{
			return payload.MSITM_PRLDQTY;
		}
		public function get clnItemQtyPreset():String
		{
			return payload.MSITM_PRSTQTY;
		}
		public function get clnItemProdUnit():String
		{
			//trace ( "++++++++++++++", "Here I am in gggget clnItemProdUnit" );
			for each (var o:Object in DM.MovementSchedules.prodUnits)
			{
				if(payload.MSITM_UNITID == o.UNIT_ID)
				{
					return o.CODE_NAME;
				}
			}
			return payload.MSITM_UNITID;
		}
		public function get clnItemBayarm():String
		{
			for each (var o:Object in DM.MovementSchedules.bayarms)
			{
				if(payload.MSITM_BAYARM == o.BAA_CODE)
				{
					return o.CODE_NAME;
				}
			}
			return payload.MSITM_BAYARM;
		}

		public function get clnItemTrip():String
		{
			return payload.MSITM_SHLSTRIP;
		}
		
		public function get clnItemSupplier():String
		{
			for each (var o:Object in DM.MovementSchedules.suppliers)
			{
				if(payload.MSITM_SHLSSUPP == o.CMPY_CODE)
				{
					return o.CODE_NAME;
				}
			}
			return payload.MSITM_SHLSSUPP;
		}
		public function get clnItemDrawer():String
		{
			for each (var o:Object in DM.MovementSchedules.drawers)
			{
				if(payload.MSITM_PRODCMPY == o.CMPY_CODE)
				{
					return o.CODE_NAME;
				}
			}
			return payload.MSITM_PRODCMPY;
		}
		
		
		
		// data modification
		public function set clnItemAction(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemAction" );
			action = value;
		}
		/*
		public function set clnItemLine(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemLine" );
			payload.MVITM_LINE_ID = value;
		}
		public function set clnItemId(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemId" );
			payload.MVITM_ITEM_ID = value;
		}
		public function set clnItemTerminal(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemTerminal" );
			payload.MVITM_TERMINAL = value;
			for each (var o:Object in DM.MovementNominations.terminals)
			{
				if(value == o.CODE_NAME)
				{
					trace ( "++++++++++++++", "Here I am in the loop----", o.CODE_NAME );
					payload.MVITM_TERMINAL = o.TERM_CODE;
					break;
				}
			}
		}
		public function set clnItemType(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemType" );
			trace ( "++++++++++++++", value, payload.MVITM_TYPE );
			payload.MVITM_TYPE = value;
			trace ( "++++++++++++++", value, payload.MVITM_TYPE );
			for (var i:int=0; i<DM.MovementNominations.movItemTypes.length; i++)
			{
				if(value == DM.MovementNominations.movItemTypes[i])
				{
					trace ( "++++++++++++++", "Here I am in the loop----", i );
					payload.MVITM_TYPE = i;
					break;
				}
			}
			trace ( "++++++++++++++", value, payload.MVITM_TYPE );
			
			if ( payload.MVITM_TYPE == 0 )
			{
				clnItemPlantFrom = "";
				trace("-------------1c");
				clnItemSupplierFrom = "";
				trace("-------------2c");
				clnItemProductFrom = "";
				trace("-------------3c");
				clnItemTankFrom = "";
				trace("-------------4c");
			}
			else if ( payload.MVITM_TYPE == 1 )
			{
				clnItemPlantTo = "";
				trace("-------------5c");
				clnItemSupplierTo = "";
				trace("-------------6c");
				clnItemProductTo = "";
				trace("-------------7c");
				clnItemTankTo = "";
				trace("-------------8c");
			}
			else
			{
			}
			
		}
		public function set clnItemKey(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemKey" );
			payload.MVITM_ITEM_KEY = value;
		}
		public function set clnItemStatus(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemStatus" );
			payload.MVITM_STATUS = value;
			for (var i:int=0; i<DM.MovementNominations.movStatus.length; i++)
			{
				if(value == DM.MovementNominations.movStatus[i])
				{
					trace ( "++++++++++++++", "Here I am in the loop----", i );
					payload.MVITM_STATUS = i;
					break;
				}
			}
		}
		public function set clnItemProdQty(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemProdQty" );
			payload.MVITM_PROD_QTY = value;
		}
		
		public function set clnItemProdUnit(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemProdUnit" );
			payload.MVITM_PROD_UNIT = value;
			for each (var o:Object in DM.MovementNominations.prodUnits)
			{
				if(value == o.CODE_NAME)
				{
					trace ( "++++++++++++++", "Here I am in the loop----", o.CODE_NAME );
					payload.MVITM_PROD_UNIT = o.UNIT_ID;
					break;
				}
			}
		}
		
		public function set clnItemPlantFrom(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemPlantFrom" );
			//trace ( "++++++++++++++", value, payload.MVITM_PLANT_FROM );
			payload.MVITM_PLANT_FROM = value;
			for each (var o:Object in DM.MovementNominations.plantsFrom)
			{
				if(value == o.CODE_NAME)
				{
					trace ( "++++++++++++++", "Here I am in the loop----", o.CODE_NAME );
					payload.MVITM_PLANT_FROM = o.TERM_CODE;
					break;
				}
			}
			//trace ( "++++++++++++++", value, payload.MVITM_PLANT_FROM );
		}
		public function set clnItemSupplierFrom(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemSupplierFrom" );
			payload.MVITM_PRODCMPY_FROM = value;
			for each (var o:Object in DM.MovementNominations.drawersFrom)
			{
				if(value == o.CODE_NAME)
				{
					trace ( "++++++++++++++", "Here I am in the loop----", o.CODE_NAME );
					payload.MVITM_PRODCMPY_FROM = o.CMPY_CODE;
					break;
				}
			}
			
			filterProductsFromList();
			filterTanksFromList();
		}
		public function set clnItemProductFrom(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemProductFrom" );
			payload.MVITM_PRODNAME_FROM = value;
			payload.MVITM_PRODCODE_FROM = value;
			for each (var o:Object in DM.MovementNominations.productsFrom)
			{
				if(value == o.CODE_NAME)
				{
					trace ( "++++++++++++++", "Here I am in the loop----", o.CODE_NAME );
					payload.MVITM_PRODCODE_FROM = o.PROD_CODE;
					break;
				}
			}
			filterTanksFromList();
		}
		public function set clnItemTankFrom(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemTankFrom" );
			payload.MVITM_TANK_FROM = value;
			for each (var o:Object in DM.MovementNominations.tanksFrom)
			{
				if(value == o.CODE_NAME)
				{
					trace ( "++++++++++++++", "Here I am in the loop----", o.CODE_NAME );
					payload.MVITM_TANK_FROM = o.TANK_CODE;
					break;
				}
			}
		}
		public function set clnItemPlantTo(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemPlantTo" );
			payload.MVITM_PLANT_TO = value;
			for each (var o:Object in DM.MovementNominations.plantsTo)
			{
				if(value == o.CODE_NAME)
				{
					trace ( "++++++++++++++", "Here I am in the loop----", o.CODE_NAME );
					payload.MVITM_PLANT_TO = o.TERM_CODE;
					break;
				}
			}
		}
		public function set clnItemSupplierTo(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemSupplierTo" );
			payload.MVITM_PRODCMPY_TO = value;
			for each (var o:Object in DM.MovementNominations.drawersTo)
			{
				if(value == o.CODE_NAME)
				{
					trace ( "++++++++++++++", "Here I am in the loop----", o.CODE_NAME );
					payload.MVITM_PRODCMPY_TO = o.CMPY_CODE;
					break;
				}
			}
			
			filterProductsToList();
			filterTanksToList();
		}
		public function set clnItemProductTo(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemProductTo" );
			payload.MVITM_PRODNAME_TO = value;
			payload.MVITM_PRODCODE_TO = value;
			for each (var o:Object in DM.MovementNominations.productsTo)
			{
				if(value == o.CODE_NAME)
				{
					trace ( "++++++++++++++", "Here I am in the loop----", o.CODE_NAME );
					payload.MVITM_PRODCODE_TO = o.PROD_CODE;
					break;
				}
			}
			
			filterTanksToList();
		}
		public function set clnItemTankTo(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemTankTo" );
			trace ( "++++++++++++++", value, payload.MVITM_TANK_TO );
			payload.MVITM_TANK_TO = value;
			trace ( "++++++++++++++", value, payload.MVITM_TANK_TO );
			for each (var o:Object in DM.MovementNominations.tanksTo)
			{
				if(value == o.CODE_NAME)
				{
					trace ( "++++++++++++++", "Here I am in the loop----", o.CODE_NAME );
					payload.MVITM_TANK_TO = o.TANK_CODE;
					break;
				}
			}
			trace ( "++++++++++++++", value, payload.MVITM_TANK_TO );
		}
		
		public function set clnItemComments(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemComments" );
			payload.MVITM_COMMENTS = value;
		}
		public function set clnItemQtySchd(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemQtySchd" );
			payload.MVITM_QTY_SCHD = value;
		}
		public function set ClnItemQtyMove(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set ClnItemQtyMove" );
			payload.MVITM_QTY_MOVE = value;
		}
		public function set ClnItemQtyDelv(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set ClnItemQtyDelv" );
			payload.MVITM_QTY_DELV = value;
		}
		
		
		// filters
		protected function productsFrom_filterFunc(item:Object):Boolean
		{
			if (item.PROD_CMPY == payload.MVITM_PRODCMPY_FROM )                
			{ 
				return true     
			}
			else
			{
				return false;
			}
		}
		public function filterProductsFromList():void
		{
			DM.MovementNominations.productsFrom.filterFunction = productsFrom_filterFunc;
			DM.MovementNominations.productsFrom.refresh();
		}
		protected function productsTo_filterFunc(item:Object):Boolean
		{
			if (item.PROD_CMPY == payload.MVITM_PRODCMPY_TO )                
			{ 
				return true     
			}
			else
			{
				return false;
			}
		}
		public function filterProductsToList():void
		{
			DM.MovementNominations.productsTo.filterFunction = productsTo_filterFunc;
			DM.MovementNominations.productsTo.refresh();
		}
		
		protected function isBaseInProduct(prod_cmpy:String, prod_code:String, base:String):Boolean
		{
			for each (var o:Object in DM.MovementNominations.ratios)
			{
				if( prod_cmpy == o.RAT_PROD_PRODCMPY && prod_code == o.RAT_PROD_PRODCODE && base == o.RATIO_BASE )
				{
					trace("****************found it --- [para]: ", prod_cmpy, prod_code, base, "[ratio]:", o.RAT_PROD_PRODCMPY, o.RAT_PROD_PRODCODE, o.RATIO_BASE);
					return true;
				}
				//trace("****************not found yet --- [para]: ", prod_cmpy, prod_code, base, "[ratio]:", o.RAT_PROD_PRODCMPY, o.RAT_PROD_PRODCODE, o.RATIO_BASE);
			}
			trace("****************found nothing: ", base, prod_cmpy, prod_code);
			
			return false;
		}
		protected function tanksFrom_filterFunc(item:Object):Boolean
		{
			return isBaseInProduct( payload.MVITM_PRODCMPY_FROM, payload.MVITM_PRODCODE_FROM, item.TANK_BASE );
		}
		public function filterTanksFromList():void
		{
			DM.MovementNominations.tanksFrom.filterFunction = tanksFrom_filterFunc;
			DM.MovementNominations.tanksFrom.refresh();
		}
		protected function tanksTo_filterFunc(item:Object):Boolean
		{
			return isBaseInProduct( payload.MVITM_PRODCMPY_TO, payload.MVITM_PRODCODE_TO, item.TANK_BASE );
		}
		public function filterTanksToList():void
		{
			DM.MovementNominations.tanksTo.filterFunction = tanksTo_filterFunc;
			DM.MovementNominations.tanksTo.refresh();
		}
*/		
	}
	
}