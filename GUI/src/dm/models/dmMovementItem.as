package dm.models{

	import dm.DM;
	
	public dynamic class dmMovementItem extends dmModel{
		public var action:String;
		
		public function dmMovementItem( params : * = false ){
	
			this.dmClass = 'dmMovementItem';
			super(params);
			
			action = " ";
			trace( "=====================", "Here I am in the dmMovementItem.constructor");
		}
		
		
		// data representation
		public function get clnItemAction():String
		{
			return action;
		}
		public function get clnItemLine():String
		{
			return payload.MVITM_LINE_ID;
		}
		public function get clnItemId():String
		{
			return payload.MVITM_ITEM_ID;
		}
		public function get clnItemFlag():String
		{
			return payload.MVITM_COMPLETED;
		}
		public function get clnItemTerminal():String
		{
			for each (var o:Object in DM.MovementNominations.terminals)
			{
				if(payload.MVITM_TERMINAL == o.TERM_CODE)
				{
					return o.CODE_NAME;
					//return o.TERM_NAME;
				}
			}
			return payload.MVITM_TERMINAL;
		}
		public function get clnItemType():String
		{
			//trace ( "++++++++++++++", "Here I am in gggget clnItemType" );
			if (String(payload.MVITM_TYPE).length==0) {
				return "";
			}
			
			return DM.MovementNominations.movItemTypes[payload.MVITM_TYPE];
			//return payload.MVITM_TYPE;
		}
		public function get clnItemKey():String
		{
			return payload.MVITM_ITEM_KEY;
		}
		public function get clnItemStatus():String
		{
			return DM.MovementNominations.movStatus[payload.MVITM_STATUS];
			//return payload.MVITM_STATUS;
		}
		public function get clnItemProdQty():String
		{
			return payload.MVITM_PROD_QTY;
		}
		public function get clnItemProdUnit():String
		{
			//trace ( "++++++++++++++", "Here I am in gggget clnItemProdUnit" );
			for each (var o:Object in DM.MovementNominations.prodUnits)
			{
				if(payload.MVITM_PROD_UNIT == o.UNIT_ID)
				{
					return o.CODE_NAME;
				}
			}
			return payload.MVITM_PROD_UNIT;
		}
		public function get clnItemPlantFrom():String
		{
			for each (var o:Object in DM.MovementNominations.plantsFrom)
			{
				if(payload.MVITM_PLANT_FROM == o.TERM_CODE)
				{
					return o.CODE_NAME;
					//return o.TERM_NAME;
				}
			}
			return payload.MVITM_PLANT_FROM;
		}
		public function get clnItemSupplierFrom():String
		{
			for each (var o:Object in DM.MovementNominations.suppliersFrom)
			{
				if(payload.MVITM_PRODCMPY_FROM == o.CMPY_CODE)
				{
					return o.CODE_NAME;
				}
			}
			return payload.MVITM_PRODCMPY_FROM;
		}
		public function get clnItemProductFrom():String
		{
			for each (var o:Object in DM.MovementNominations.productsFrom)
			{
				if( payload.MVITM_PRODCODE_FROM == o.PROD_CODE && payload.MVITM_PRODCMPY_FROM == o.PROD_CMPY )
				{
					return o.CODE_NAME;
				}
			}
			return payload.MVITM_PRODNAME_FROM;
		}
		public function get clnItemTankFrom():String
		{
			//trace ( "++++++++++++++", "Here I am in gggget clnItemTankFrom" );
			for each (var o:Object in DM.MovementNominations.tanksFrom)
			{
				if(payload.MVITM_TANK_FROM == o.TANK_CODE)
				{
					return o.CODE_NAME;
				}
			}
			return payload.MVITM_TANK_FROM;
		}
		
		public function get clnItemPlantTo():String
		{
			for each (var o:Object in DM.MovementNominations.plantsTo)
			{
				if(payload.MVITM_PLANT_TO == o.TERM_CODE)
				{
					return o.CODE_NAME;
					//return o.TERM_NAME;
				}
			}
			return payload.MVITM_PLANT_TO;
		}
		public function get clnItemSupplierTo():String
		{
			for each (var o:Object in DM.MovementNominations.suppliersTo)
			{
				if(payload.MVITM_PRODCMPY_TO == o.CMPY_CODE)
				{
					return o.CODE_NAME;
				}
			}
			return payload.MVITM_PRODCMPY_TO;
		}
		public function get clnItemProductTo():String
		{
			for each (var o:Object in DM.MovementNominations.productsTo)
			{
				if( payload.MVITM_PRODCODE_TO == o.PROD_CODE && payload.MVITM_PRODCMPY_TO == o.PROD_CMPY )
				{
					return o.CODE_NAME;
				}
			}
			return payload.MVITM_PRODNAME_TO;
		}
		public function get clnItemTankTo():String
		{
			for each (var o:Object in DM.MovementNominations.tanksTo)
			{
				if(payload.MVITM_TANK_TO == o.TANK_CODE)
				{
					return o.CODE_NAME;
				}
			}
			return payload.MVITM_TANK_TO;
		}

		public function get clnItemComments():String
		{
			return payload.MVITM_COMMENTS;
		}
		public function get clnItemQtySchd():String
		{
			return payload.MVITM_QTY_SCHD;
		}
		public function get ClnItemQtyMove():String
		{
			return payload.MVITM_QTY_MOVE;
		}
		public function get ClnItemQtyDelv():String
		{
			return payload.MVITM_QTY_DELV;
		}
		public function get clnStoreLocCmpyFrom():String
		{
			for each (var o:Object in DM.MovementNominations.suppliersFrom)
			{
				if(payload.MVITM_SHIPLOC_FROM == o.CMPY_CODE)
				{
					return o.CODE_NAME;
				}
			}
			return payload.MVITM_SHIPLOC_FROM;
		}
		public function get clnStoreLocCmpyTo():String
		{
			for each (var o:Object in DM.MovementNominations.suppliersTo)
			{
				if(payload.MVITM_SHIPLOC_TO == o.CMPY_CODE)
				{
					return o.CODE_NAME;
				}
			}
			return payload.MVITM_SHIPLOC_TO;
		}
		
		
		// data modification
		public function set clnItemAction(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemAction" );
			action = value;
		}
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
		public function set clnItemFlag(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnItemFlag" );
			payload.MVITM_COMPLETED = value;
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
			else if ( payload.MVITM_TYPE == 2 )
			{
				clnItemTankFrom = "";
				trace("-------------4cb");
				clnItemTankTo = "";
				trace("-------------8cb");
			}
			else
			{
				clnItemPlantFrom = "";
				trace("-------------1cc");
				clnItemSupplierFrom = "";
				trace("-------------2cc");
				clnItemProductFrom = "";
				trace("-------------3cc");
				clnItemTankFrom = "";
				trace("-------------4cc");
				clnItemPlantTo = "";
				trace("-------------5cc");
				clnItemSupplierTo = "";
				trace("-------------6cc");
				clnItemProductTo = "";
				trace("-------------7cc");
				clnItemTankTo = "";
				trace("-------------8cc");
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
			for each (var o:Object in DM.MovementNominations.suppliersFrom)
			{
				if(value == o.CODE_NAME)
				{
					trace ( "++++++++++++++", "Here I am in the loop----", o.CODE_NAME );
					payload.MVITM_PRODCMPY_FROM = o.CMPY_CODE;
					break;
				}
			}
			
			//filterProductsFromList();
			//filterTanksFromList();
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
			//filterTanksFromList();
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
			for each (var o:Object in DM.MovementNominations.suppliersTo)
			{
				if(value == o.CODE_NAME)
				{
					trace ( "++++++++++++++", "Here I am in the loop----", o.CODE_NAME );
					payload.MVITM_PRODCMPY_TO = o.CMPY_CODE;
					break;
				}
			}
			
			//filterProductsToList();
			//filterTanksToList();
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
			
			//filterTanksToList();
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
		public function set clnStoreLocCmpyFrom(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnStoreLocCmpyFrom" );
			payload.MVITM_SHIPLOC_FROM = value;
			for each (var o:Object in DM.MovementNominations.suppliersFrom)
			{
				if(value == o.CODE_NAME)
				{
					trace ( "++++++++++++++", "Here I am in the loop----", o.CODE_NAME );
					payload.MVITM_SHIPLOC_FROM = o.CMPY_CODE;
					break;
				}
			}
		}
		public function set clnStoreLocCmpyTo(value:*):void
		{
			trace ( "++++++++++++++", "Here I am in set clnStoreLocCmpyTo" );
			payload.MVITM_SHIPLOC_TO = value;
			for each (var o:Object in DM.MovementNominations.suppliersTo)
			{
				if(value == o.CODE_NAME)
				{
					trace ( "++++++++++++++", "Here I am in the loop----", o.CODE_NAME );
					payload.MVITM_SHIPLOC_TO = o.CMPY_CODE;
					break;
				}
			}
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
				return true;     
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
		
	}
		
}