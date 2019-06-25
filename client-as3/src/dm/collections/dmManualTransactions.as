package dm.collections
{
	import dm.DM;
	import dm.models.dmManualTransaction;
	import dm.utils.*;
	
	import flash.events.Event;
	import flash.events.IEventDispatcher;
	import flash.text.TextFormat;
	
	import flashx.textLayout.formats.Float;
	
	import mx.collections.ArrayCollection;
	import mx.events.CollectionEvent;
	import mx.events.FlexEvent;
	import mx.resources.ResourceManager;
	import mx.rpc.AsyncToken;
	import mx.rpc.CallResponder;
	import mx.rpc.events.FaultEvent;
	import mx.rpc.events.ResultEvent;
	import mx.utils.ObjectUtil;
	
	import spark.collections.Sort;
	import spark.collections.SortField;
	
	import views.v_ManualTransactions;
	
	public class dmManualTransactions extends dmCollection
	{
		public var dmClass                             : String  = "dmManualTransactions";
		public var model                               : dmManualTransaction;
		
		// Flex User Messages
		//public var FM_USER_DUMMY                     : String  = "DUMMY";
		//public var FM_USER_COMPARTMENTCHANGED        : String  = "COMPARTMENTCHANGED";
		
		public var DRAWERPROD_BASE_TOLERANCE           : int     = 1;
		public var TEXT_COLOR_RED                      : String  = "0xB60F11";
		public var TEXT_COLOR_BLACK                    : String  = "0x000000";
		
		// Timing control.
		public var TIMING_OPENORDER_TARGET             : int     = 3;      // Only do sth in the 3rd call 
		
		[Bindable] public var transactiontypes         : ArrayCollection;
		[Bindable] public var suppliers                : ArrayCollection;
		[Bindable] public var customers                : ArrayCollection;
		[Bindable] public var trips                    : ArrayCollection;
		[Bindable] public var openorders               : ArrayCollection;
		[Bindable] public var nomiitems                : ArrayCollection;
		[Bindable] public var carriers                 : ArrayCollection;
		[Bindable] public var tankers                  : ArrayCollection;
		[Bindable] public var operators                : ArrayCollection;
		[Bindable] public var arms                     : ArrayCollection;
		[Bindable] public var equipments               : ArrayCollection;
		[Bindable] public var compartments             : ArrayCollection;
		[Bindable] public var drawers                  : ArrayCollection;
		[Bindable] public var productscontainer        : ArrayCollection;
		[Bindable] public var products                 : ArrayCollection;
		[Bindable] public var productsrecipe           : ArrayCollection;
		[Bindable] public var metertypes               : ArrayCollection;
		[Bindable] public var metercodes               : ArrayCollection;
		[Bindable] public var tankcodes                : ArrayCollection;
		[Bindable] public var baseproducts             : ArrayCollection;
		[Bindable] public var baseproductclasses       : ArrayCollection;
		[Bindable] public var tankinfo                 : ArrayCollection;
		//[Bindable] public var transferIdx_tankinfo   : int;
		[Bindable] public var vcfinfo                  : ArrayCollection;
		
		[Bindable] public var transactionDataArr       : ArrayCollection;
		[Bindable] public var transferDataArr          : ArrayCollection;
		[Bindable] public var meterDataArr             : ArrayCollection;
		[Bindable] public var meterTotalDataArr        : ArrayCollection;
		[Bindable] public var baseprodDataArr          : ArrayCollection;
		[Bindable] public var baseprodTotalDataArr     : ArrayCollection;
		
		[Bindable] public var scheduleDetailsArr       : ArrayCollection;
		
		// NOTE  Member variables need to be initialized in initMemberValues() & initMemberValuesByLevel().
		[Bindable] public var base_obs_total           : Number;
		[Bindable] public var base_std_total           : Number;
		[Bindable] public var base_mass_total          : Number;
		[Bindable] public var base_std_total_disp      : String;
		[Bindable] public var base_mass_total_disp     : String;
		[Bindable] public var base_std_mass_total_disp : String;
		
		[Bindable] public var view                     : v_ManualTransactions;
		
		public var trans_drawer_cmpy                   : String;           // Ver2.9
		public var curr_trsf_ref                       : ArrayCollection;
		public var curr_selected_transfer              : int;
		public var schedule_type                       : String;
		public var schedule_sub_type                   : String;
		public var schedule_stat                       : String;           // Ver2.5
		public var schdbyprodlist                      : ArrayCollection;
		
		public var non_oo_carrier                      : String;           // Ver2.5
		public var oo_carrier                          : String;           // Ver2.5
		public var tanker                              : String;           // Ver2.6
		
		public var baseAdjCalculating                  : Boolean;          // ACC_BASE_ADJ the base adjustment calculating flag
		public var baseprodTotalDataArr_prev           : ArrayCollection;  // ACC_BASE_ADJ the previous values for base prod total
		public var needRefreshBaseprodTotalDataArr     : Boolean;          // ACC_BASE_ADJ the base prod total array collection needs refresh flag
		public var isAccBaseAdjusted                   : Boolean;          // ACC_BASE_ADJ the Acc Base adjusted flag
		public var vcf                                 : Number;           // Air Bouyancy
		
		// For REPOST
		public var repost_sold_to                      : String;
		public var repost_delv_loc                     : String;
		public var repost_delv_num                     : String;
		public var xmlBody                             : XML     = null;
		
		public var transferCallback                    : Function;
		
		public var _timing_openorder_count             : int     = -1;
		
		public var Lock_AutoPopBM                      : Boolean = false;
		public var effectiveRowIndex                   : int;              // Current effective row index in Transfer grid.
		public var Lock_RenderChange                   : Boolean = false;
		
		public var Lock_WorkRes                        : Boolean = false;
		
		public var IsSubmitSucceeded                   : Boolean = false;
		public var NeedSaveMsg                         : Boolean = true;

		//public var curr_trsf_drwr_cd;
		//public var curr_trsf_drwr_prod_cd;
		//public var curr_trsf_arm_cd;
		
		/**
		 * Initialize screen items data. 
		 *  
		 */	
		public function initialize(status:String)
		{
			trace("+++++Running into <collection>.initialize")
			
			// Init transfer data provider.
			transferDataArr = new ArrayCollection();
			transferDataArr.addEventListener(CollectionEvent.COLLECTION_CHANGE, transferChanged);
			
			// Init base prod data provider.
			baseprodDataArr = new ArrayCollection();
			baseprodDataArr.addEventListener(CollectionEvent.COLLECTION_CHANGE, baseChanged);
			
			// Init base prod total data provider.
			baseprodTotalDataArr      = new ArrayCollection();
			baseprodTotalDataArr_prev = new ArrayCollection();
			
			// Init meter data provider.
			meterDataArr = new ArrayCollection();
			
			// Init meter total data provider.
			meterTotalDataArr = new ArrayCollection();
			
			switch (status)
			{
				case "widget":
					break;
				
				case "normal":
					/*
					if (suppliers) 
					{
						suppliers.removeAll();
						suppliers.refresh();
					}
					if (trips) 
					{
						trips.removeAll();
						trips.refresh();
					}
					if (carriers) 
					{
						carriers.removeAll();
						carriers.refresh();
					}
					if (tankers) 
					{
						tankers.removeAll();
						tankers.refresh();
					}
					if (operators) 
					{
						operators.removeAll();
						operators.refresh();
					}
					if (arms) 
					{
						arms.removeAll();
						arms.refresh();
					}
					if (compartments) 
					{
						compartments.removeAll();
						compartments.refresh();
					}
					if (drawers) 
					{
						drawers.removeAll();
						drawers.refresh();
					}
					if (products) 
					{
						products.removeAll();
						products.refresh();
					}
					if (metertypes) 
					{
						metertypes.removeAll();
						metertypes.refresh();
					}
					if (metercodes) 
					{
						metercodes.removeAll();
						metercodes.refresh();
					}
					if (tankcodes) 
					{
						tankcodes.removeAll();
						tankcodes.refresh();
					}
					if (baseproducts) 
					{
						baseproducts.removeAll();
						baseproducts.refresh();
					}					
					if (baseproductclasses) 
					{
						baseproductclasses.removeAll();
						baseproductclasses.refresh();
					}	
					*/
					if (transferDataArr) 
					{
						transferDataArr.removeAll();
						transferDataArr.refresh();
					}
					if (meterDataArr) 
					{
						meterDataArr.removeAll();
						meterDataArr.refresh();
					}
					if (meterTotalDataArr) 
					{
						meterTotalDataArr.removeAll();
						meterTotalDataArr.refresh();
					}
					if (baseprodDataArr)
					{
						baseprodDataArr.removeAll();
						baseprodDataArr.refresh();
					}
					if (baseprodTotalDataArr) 
					{
						baseprodTotalDataArr.removeAll();
						baseprodTotalDataArr.refresh();
					}
					if (baseprodTotalDataArr_prev) 
					{
						baseprodTotalDataArr_prev.removeAll();
						baseprodTotalDataArr_prev.refresh();
					}
					if (transactionDataArr) 
					{
						transactionDataArr.removeAll();
						transactionDataArr.refresh();
					}
					if (curr_trsf_ref)
					{
						curr_trsf_ref.removeAll();
						curr_trsf_ref.refresh();
					}
					
					break;
				
				default:
					break;
			}
			
			initMemberValues();
		}
		
		/**
		 *  
		 *  
		 */
		public function initMemberValues():void
		{
			baseAdjCalculating              = false;
			needRefreshBaseprodTotalDataArr = true;
			isAccBaseAdjusted               = false;
			base_obs_total                  = 0;
			base_std_total                  = 0;
			base_mass_total                 = 0;
			base_std_total_disp             = "";
			base_mass_total_disp            = "";
			base_std_mass_total_disp        = "";
			
			trans_drawer_cmpy               = "";
			curr_selected_transfer          = -1;
			schedule_type                   = "";
			schedule_sub_type               = "";
			schedule_stat                   = "";
			
			non_oo_carrier                  = "";
			oo_carrier                      = "";
			tanker                          = "";
			
			// Init submit status.
			IsSubmitSucceeded = false;
			NeedSaveMsg       = true;
		}
		
		/**
		 *  
		 *  
		 */
		public function initMemberValuesByLevel(level:String):void
		{
			switch (level)
			{
				case 'SUPPLIER':
				case 'CUSTOMER':
				case 'TRIP':
				case 'OPEN_ORDER_NO':
					schedule_type                   = "";
					schedule_sub_type               = "";
					schedule_stat                   = "";
					
					non_oo_carrier                  = "";
					oo_carrier                      = "";
					break;
				case 'CARRIER':
					non_oo_carrier                  = "";
					oo_carrier                      = "";
					break;
				case 'TANKER':
					break;
			}
			
			tanker                          = "";
			
			////curr_selected_transfer          = -1;
			
			baseAdjCalculating              = false;
			needRefreshBaseprodTotalDataArr = true;
			isAccBaseAdjusted               = false;
			base_obs_total                  = 0;
			base_std_total                  = 0;
			base_mass_total                 = 0;
			base_std_total_disp             = "";
			base_mass_total_disp            = "";
			base_std_mass_total_disp        = "";
			
			// Init submit status.
			IsSubmitSucceeded = false;
			NeedSaveMsg       = true;
		}
		
		/**
		 *  
		 *  
		 */
		public function transferChanged(e:CollectionEvent):void
		{
			// do something here.
			if (transferCallback) 
				transferCallback();
		}
		
		/**
		 * Calc base totals.
		 *  
		 */		
		public function baseChanged(e:CollectionEvent):void
		{
			var bsobstot:Number = 0;
			var ret:Number = 0;
			if (baseprodDataArr)
			{
				for (var i:int = 0; i < baseprodDataArr.length; i++)
				{
					bsobstot += Number(baseprodDataArr[i].trsf_bs_qty_amb);
				}
				ret = bsobstot;
			}
			else
			{
				ret = 0;
			}
			base_obs_total = Math.round(ret);
			
			// Change text color if base total is out of range.
			if (view && view.transferDetailsGrid)
			{
				var currTsfIdx:int = view.transferDetailsGrid.selectedIndex;
				if (currTsfIdx != -1)
				{
					if (DM.ManualTransactions.transactionDataArr.getItemAt(currTsfIdx).transfer.trsf_qty_amb 
					&& Math.abs((Number(DM.ManualTransactions.transactionDataArr.getItemAt(currTsfIdx).transfer.trsf_qty_amb) - base_obs_total)) > DRAWERPROD_BASE_TOLERANCE
					&& (Number(DM.ManualTransactions.transactionDataArr.getItemAt(currTsfIdx).transfer.trsf_qty_amb) != 0 || base_obs_total != 0)
					)
					{
						if (view.bs_obs_tot) view.bs_obs_tot.setStyle("color", TEXT_COLOR_RED);
					}
					else
					{
						if (view.bs_obs_tot) view.bs_obs_tot.setStyle("color", TEXT_COLOR_BLACK);
					}
				}
			}
			trace("Calculating base totals :"+base_obs_total);
		}
		
		/**
		 *  
		 *  
		 */
		public function dmManualTransactions(params:* = false)
		{ 
			trace("+++++Running into <collection>.dmManualTransactions(constructor)")
			super(params);
		}
		
		/**
		 *  
		 *  
		 */
		override public function reload():void
		{
			trace("+++++Running into <collection>.reload")
			populate();
		}

		/**
		 *  
		 *  
		 */
		public function getNomiItemNumber(companyCode:String):void
		{
			trace("supp code -> "+companyCode)
			nomiitems = new ArrayCollection();
			Server.service('dmManualTransactions.getNomiItemNumberBySupplier', companyCode, populateNomiItems);
		}
		
		/**
		 *  
		 *  
		 */
		public function populateNomiItems(result:Object):void
		{
			nomiitems.source = result.data;
		}
		
		/**
		 *  
		 *  
		 */
		public function setDefaultUser():void
		{
			var len:int = operators.length; 
			if (len == 1)
			{
				// If only one driver in the list, select it.
				view.new_user.selectedIndex = 0;
			}
			else if (len > 1)
			{
				// Set the first user as default selected.
				view.new_user.selectedIndex = 0;
				
				// Find '8888' and select it.
				for (var idx:int =0; idx < len; idx++)
				{
					if (operators[idx].PER_CODE == '8888'
					|| operators[idx].PER_CODE == 'DKIDRV')
					{
						view.new_user.selectedIndex = idx;
						break;
					}
				}
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function getDefaultCarrier():int
		{
			var idx:int = -1;
			if (carriers.length == 1)
			{
				idx = 0;
			}
			return idx;
		}
		
		/**
		 *  
		 *  
		 */
		public function getSelectedCarrier(carrier_cd:String):int
		{
			for (var idx:int =0; idx < carriers.length; idx++)
			{
				if (carriers[idx].CMPY_CODE == carrier_cd)
				{
					return idx;
				}
			}
			return -1;
		}
		
		/**
		 *  
		 *  
		 */
		public function getDefaultTanker():int
		{
			var idx:int = -1;
			if (tankers.length == 1)
			{
				idx = 0;
			}
			return idx;
		}
		
		/**
		 *  
		 *  
		 */
		public function getSelectedTanker(tanker_cd:String):int
		{
			for (var idx:int =0; idx < tankers.length; idx++)
			{
				if (tankers[idx].TNKR_CODE == tanker_cd)
				{
					return idx;
				}
			}
			return -1;
		}
		
		/**
		 *  
		 *  
		 */
		public function getDrawersBySuppTrip(supplier: String, tripNo:String):void
		{
			trace("supplier -> "+supplier)
			trace("trip no -> "+tripNo)
			// Get default drawers list.
			drawers = new ArrayCollection();
			var param : Object = new Object();
			param.supp = supplier;
			param.trip_no = tripNo;
			Server.service('dmManualTransactions.getDrawersBySuppTrip', param, populateDrawers);
		}
		
		/**
		 *  
		 *  
		 */
		public function populateDrawers(result:Object):void
		{
			drawers.source = result.data;
			for each (var o:Object in drawers)
			{
				o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
			}
			
			// Set default selected Drawer.
			//view.new_tanker.selectedIndex = getDefaultDrawer();	
		}
		
		/**
		 *  
		 *  
		 */
		public function getDefaultDrawer():int
		{
			var idx:int = -1;
			if (drawers.length == 1)
			{
				idx = 0;
			}
			return idx;
		}
		
		/**
		 *  
		 *  
		 */
		public function getDrawerProductsBySuppTrip(supplier: String, tripNo:String):void
		{
			trace("supplier -> "+supplier)
			trace("trip no -> "+tripNo)
			
			// Get default products list.
			products = new ArrayCollection();
			var param : Object = new Object();
			param.supp = supplier;
			param.trip_no = tripNo;
			Server.service('dmManualTransactions.getDrawerProductsBySuppTrip', param, populateProductsBySuppTrip);
		}
		
		/**
		 *  
		 *  
		 */
		public function populateProductsBySuppTrip(result:Object):void
		{
			products.source = result.data;
			for each (var o:Object in products)
			{
				o.CODE_NAME = o.PROD_CODE + " - " + o.PROD_NAME;
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function getDrawerProductsSchdByProd(supplier: String, tripNo:String):void
		{
			trace("supplier -> "+supplier)
			trace("trip no -> "+tripNo)
			
			// Get default products list.
			products = new ArrayCollection();
			var param : Object = new Object();
			param.supp = supplier;
			param.trip_no = tripNo;
			Server.service('dmManualTransactions.getDrawerProdSchdByProd', param, populateProductsSchdByProd);
		}
		
		/**
		 *  
		 *  
		 */
		public function populateProductsSchdByProd(result:Object):void
		{
			products.source = result.data;
			for each (var o:Object in products)
			{
				o.CODE_NAME = o.PROD_CODE + " - " + o.PROD_NAME;
			}
		}

		/**
		 *  
		 *  
		 */
		public function getTankInfoByProdArm(drawerCode:String, drawerprodCode:String, armCode:String, trsfIdx:int = -1):void
		{
		
			var transferIdx_tankinfo:int;
			
			if (trsfIdx == -1)
			{
				// Store current selected transfer index,
				// otherwise selected transfer index could be updated as user clicks somewhere else.
				transferIdx_tankinfo = view.transferDetailsGrid.selectedIndex;
			}
			else
			{
				transferIdx_tankinfo = trsfIdx;
			}

			if (!tankinfo)
			{
				tankinfo = new ArrayCollection();
			}
			
			var param : Object = new Object();
			param.drawer = drawerCode;
			param.drawerprod = drawerprodCode;
			param.arm = armCode;
			Server.service('dmManualTransactions.getTankInfoByProdArm', param,
				function populateTankInfoByArm(result:Object){
					trace(" ");
					trace(">>>>CALLBACK =============> getTankInfoByProdArm");
					trace("transferIdx_tankinfo     ->"+transferIdx_tankinfo);
					trace(" ");
					tankinfo.source = result.data;
					
					var dmMT:dmManualTransactions = DM.ManualTransactions;
					
					//Ver3.0 added. Test case: Change the trip no very qucikly...
					if ((dmMT.transferDataArr != null && dmMT.transferDataArr.length == 0)
					  ||(dmMT.transactionDataArr != null && dmMT.transactionDataArr.length == 0)
					)
						return;
					
					// Update current selected tank's density & temp in transfer grid.
					if (tankinfo && tankinfo.length != 0)
					{
						// Cal drawer prod density
						// Drawer Den = (R1*BASEDEN1 + R2*BASEDEN2 + ... + Rn*BASEDENn)/(R1 + R2 + ... + Rn)
						var tot1:Number = 0.0;
						var tot2:Number = 0.0;
						var isAutoTankgauging:Boolean = true;
						var baseCnt:int = 0;
						for (var i:int = 0; i < tankinfo.length != 0; i++) 
						{
							tot1 += Number(tankinfo.getItemAt(i).RATIO_VALUE) * Number(tankinfo.getItemAt(i).STREAM_TANKDEN);
							tot2 += Number(tankinfo.getItemAt(i).RATIO_VALUE);
							
							if (tankinfo.getItemAt(i).BASE_CAT != 6 && tankinfo.getItemAt(i).TANK_GAUGINGMTHD != 1)  // If this is a base and tank gauging is MANUAL.
							{
								isAutoTankgauging = false;
							}
							
							if (tankinfo.getItemAt(i).BASE_CAT != 6)  // If not additive
							{
								baseCnt++;
							}
						}
						dmMT.transferDataArr[transferIdx_tankinfo].trsf_density = String(Math.round(tot1 / tot2 * 10) / 10);
						
						if (isAutoTankgauging && baseCnt == 1)  // If tank gauging is AUTO mode & Only has 1 base prod
						{
							for (var i:int = 0; i < tankinfo.length != 0; i++) 
							{
								if (tankinfo.getItemAt(i).BASE_CAT != 6)  // Get this base prod Temp.
								{
									// 20130723 As spec changed. Now leave the default drawer prod temp as BLANK.
									////dmMT.transferDataArr[transferIdx_tankinfo].trsf_temp = tankinfo.getItemAt(i).BASE_RPT_TEMP;
									break;
								}
							}
						}
						else if (isAutoTankgauging && baseCnt > 1)
						{
							// Get the average(rough) base prod Temp.
							var totTemp:Number = 0.0;
							for (var i:int = 0; i < tankinfo.length != 0; i++) 
							{
								if (tankinfo.getItemAt(i).BASE_CAT != 6)
								{
									totTemp += Number(tankinfo.getItemAt(i).BASE_RPT_TEMP);
								}
							}
							// 20130723 As spec changed. Now leave the default drawer prod temp as BLANK.
							////dmMT.transferDataArr[transferIdx_tankinfo].trsf_temp = String(Math.round(totTemp / baseCnt * 100) / 100);
						}
						else
						{
							// 20130723 As spec changed. Now leave the default drawer prod temp as BLANK.
							////dmMT.transferDataArr[transferIdx_tankinfo].trsf_temp = 15;  // default temp
						}
					}
					else
					{
						dmMT.transferDataArr[transferIdx_tankinfo].trsf_density = 700; // default density
						// 20130723 As spec changed. Now leave the default drawer prod temp as BLANK.
						////dmMT.transferDataArr[transferIdx_tankinfo].trsf_temp    = 15;  // default temp
					}
					
					// Update the transfer in transaction arraycollection.
					// Maybe no need to do this?
					dmMT.transactionDataArr[transferIdx_tankinfo].transfer = DM.ManualTransactions.transferDataArr[transferIdx_tankinfo];
					
					// Refresh transfer grid.
					dmMT.transferDataArr.refresh();
				}
			);
		}
/*	transferIdx_tankinfo issue, so moved into getTankInfoByProdArm()	
		public function populateTankInfoByArm(result:Object):void
		{
			tankinfo.source = result.data;
			
			var dmMT:dmManualTransactions = DM.ManualTransactions;
			
			// Update current selected tank's density & temp in transfer grid.
			if (tankinfo && tankinfo.length != 0)
			{
				// Cal drawer prod density
				// Drawer Den = (R1*BASEDEN1 + R2*BASEDEN2 + ... + Rn*BASEDENn)/(R1 + R2 + ... + Rn)
				var tot1:Number = 0.0;
				var tot2:Number = 0.0;
				var isAutoTankgauging:Boolean = true;
				var baseCnt:int = 0;
				for (var i:int = 0; i < tankinfo.length != 0; i++) 
				{
					tot1 += Number(tankinfo.getItemAt(i).RATIO_VALUE) * Number(tankinfo.getItemAt(i).STREAM_TANKDEN);
					tot2 += Number(tankinfo.getItemAt(i).RATIO_VALUE);
					
					if (tankinfo.getItemAt(i).BASE_CAT != 6 && tankinfo.getItemAt(i).TANK_GAUGINGMTHD != 1)  // If this is a base and tank gauging is MANUAL.
					{
						isAutoTankgauging = false;
					}
					
					if (tankinfo.getItemAt(i).BASE_CAT != 6)  // If not additive
					{
						baseCnt++;
					}
				}
				dmMT.transferDataArr[transferIdx_tankinfo].trsf_density = String(Math.round(tot1 / tot2 * 10) / 10);
				
				if (isAutoTankgauging && baseCnt == 1)  // If tank gauging is AUTO mode & Only has 1 base prod
				{
					for (var i:int = 0; i < tankinfo.length != 0; i++) 
					{
						if (tankinfo.getItemAt(i).BASE_CAT != 6)  // Get this base prod Temp.
						{
							dmMT.transferDataArr[transferIdx_tankinfo].trsf_temp = tankinfo.getItemAt(i).BASE_RPT_TEMP;
							break;
						}
					}
				}
				else if (isAutoTankgauging && baseCnt > 1)
				{
					// Get the average(rough) base prod Temp.
					var totTemp:Number = 0.0;
					for (var i:int = 0; i < tankinfo.length != 0; i++) 
					{
						if (tankinfo.getItemAt(i).BASE_CAT != 6)  
						{
							totTemp += Number(tankinfo.getItemAt(i).BASE_RPT_TEMP);
						}
					}
					dmMT.transferDataArr[transferIdx_tankinfo].trsf_temp = String(Math.round(totTemp / baseCnt * 100) / 100);
				}
				else
				{
					dmMT.transferDataArr[transferIdx_tankinfo].trsf_temp = 15;  // default temp
				}
			}
			else
			{
				dmMT.transferDataArr[transferIdx_tankinfo].trsf_density = 700; // default density
				dmMT.transferDataArr[transferIdx_tankinfo].trsf_temp    = 15;  // default temp
			}
			
			// Update the transfer in transaction arraycollection.
			// Maybe no need to do this?
			dmMT.transactionDataArr[transferIdx_tankinfo].transfer = DM.ManualTransactions.transferDataArr[transferIdx_tankinfo];
			
			// Refresh transfer grid.
			dmMT.transferDataArr.refresh();
		}		
*/
		/**
		 * Initialize Transfer data with schedule info.
		 *  
		 */
		public function initializeTransfer():void
		{
			
			trace("initializeTransfer() START");
			// Clear Transfer list.
			if (scheduleDetailsArr)
				deleteAllTransfer();
			
			// Set up the initial values for each Transfer.
			for each (var oSrc:Object in scheduleDetailsArr)
			{
				// Current schedule type.
				schedule_type = oSrc.SCHD_TYPE;
				
				// Only list the compartment which has drawer product assigned (Schd By Compartment).
				// or
				// List all the compartment (Sched By Product).
				if (
				   (oSrc.SCHD_TYPE == 'BY_COMPARTMENT' && oSrc.PROD_CODE)
				|| (oSrc.SCHD_TYPE == 'BY_PRODUCT')
				)
				{
					// Create one Transfer data.
					createTransfer();
					if (transactionDataArr)
					{
						var oDst:Object = transactionDataArr.getItemAt(transactionDataArr.length-1);
						if (oSrc.SCHD_TYPE == 'BY_COMPARTMENT')
						{
							oDst.transfer.trsf_sold_to          = oSrc.CUSTOMER_CODE;
							oDst.transfer.trsf_delv_loc         = oSrc.DELIVERY_LOCATION;
							oDst.transfer.trsf_delv_num         = oSrc.DELIVERY_NUMBER;
						}
						oDst.transfer.trsf_equip_id             = oSrc.EQPT_CODE;
						oDst.transfer.trsf_cmpt_no              = oSrc.TNKR_CMPT_NO;
						oDst.transfer.trsf_drwr_cd              = oSrc.SHLS_SUPP; // FIXED as SUPP ?? oSrc.SHLS_DRAWER;
						oDst.transfer.trsf_drwr_prod_cd         = oSrc.PROD_CODE;
						oDst.transfer.trsf_drwr_prod_plan_qty   = oSrc.ALLOWED_QTY;
						oDst.transfer.trsf_drwr_prod_loaded_qty = oSrc.QTY_LOADED;
						oDst.transfer.trsf_prev_prod_cd         = oSrc.PREV_PRODCODE;
						oDst.transfer.trsf_prev_prod            = oSrc.PREV_PROD;
					}
					
					// Create the refernece data for this Transfer item.
					createTransferDataRef();
					
					/* ideally achive it here
					// Auto pop Base & Meter
					autoPopulateBaseMeter(transactionDataArr.length-1, oSrc.SHLS_SUPP, oSrc.PROD_CODE ,ARMCD here);
					DM.ManualTransactions.curr_selected_transfer = -1;
					*/
					
					// Display additional fields - Customer Code/Delivery Location/Delivery Number
					if (view.new_trans_type.selectedItem.id != "O")  
					{
						// Non Open Order. For Open Order, the Customer Code and Delivery Location are set when Open Order No change event.
						view.new_customer_cd.text = oSrc.CUSTOMER_CODE;
						if (oSrc.SCHD_TYPE == 'BY_PRODUCT')
						{
							view.new_delv_loc.text = oSrc.DELIVERY_LOCATION;
							view.new_delv_num.text = oSrc.DELIVERY_NUMBER;
						}
					}
				}
			}
			trace("initializeTransfer() END");
			
			// Re-populate products as current selected trip could be different types.
			// For schd by compartment list all products.
			// For schd by product list scheduled products only.
			/* due to ASYNC, after draw prod render refreshing!!
			if (schedule_type == 'BY_PRODUCT')
			{
				// Schd by prod.
				getDrawerProductsSchdByProd(view.new_supplier.selectedItem.CMPY_CODE, view.new_trip.selectedItem.SHLS_TRIP_NO);
			}
			else
			{
				// Sche by compartment.
				getDrawerProductsBySuppTrip(view.new_supplier.selectedItem.CMPY_CODE, view.new_trip.selectedItem.SHLS_TRIP_NO);
			}*/
		}
		
		/**
		 * Initialize REPOST Transfer data with schedule info.
		 *  
		 */
		public function initializeTransfer_pre_repost():void
		{
			
			trace("initializeTransfer_pre_repost() START");
			// Clear Transfer list.
			if (scheduleDetailsArr)
				deleteAllTransfer();
			
			// Set up the initial values for each Transfer.
			for each (var oSrc:Object in scheduleDetailsArr)
			{
				// Current schedule type.
				schedule_type = oSrc.SCHD_TYPE;
				
				// Keep delv_loc and delv_num in memory.
				if (oSrc.SCHD_TYPE == 'BY_COMPARTMENT')
				{
					repost_sold_to = oSrc.CUSTOMER_CODE;
					repost_delv_loc = oSrc.DELIVERY_LOCATION;
					repost_delv_num = oSrc.DELIVERY_NUMBER;
				}
				
				// Display additional fields - Customer Code/Delivery Location/Delivery Number
				if (view.new_trans_type.selectedItem.id != "O")  
				{
					// Non Open Order. For Open Order, the Customer Code and Delivery Location are set when Open Order No change event.
					view.new_customer_cd.text = oSrc.CUSTOMER_CODE;
					if (oSrc.SCHD_TYPE == 'BY_PRODUCT')
					{
						view.new_delv_loc.text = oSrc.DELIVERY_LOCATION;
						view.new_delv_num.text = oSrc.DELIVERY_NUMBER;
					}
				}
			}
			trace("initializeTransfer_pre_repost() END");
		}
		
		/**
		 * Initialize REPOST Transfer data with repost info.
		 *  
		 */
		public function initializeTransfer_repost():void
		{
			
			trace("initializeTransfer_repost() START");
			
			// Set up the initial values for each Transfer.
			for each (var trsf:XML in xmlBody..TRANSFER)
			{
				
				// Create one Transfer data.
				createTransfer();
				if (transactionDataArr)
				{
					var oDst:Object = transactionDataArr.getItemAt(transactionDataArr.length-1);
					if (schedule_type == 'BY_COMPARTMENT')
					{
						oDst.transfer.trsf_sold_to          = repost_sold_to;
						oDst.transfer.trsf_delv_loc         = repost_delv_loc;
						oDst.transfer.trsf_delv_num         = repost_delv_num;
					}
					
					// Below items will be loaded from REPOST data - XML object.
					oDst.transfer.trsf_equip_id             = null;
					oDst.transfer.trsf_cmpt_no              = null;
					oDst.transfer.trsf_drwr_cd              = null;
					oDst.transfer.trsf_drwr_prod_cd         = null;
					oDst.transfer.trsf_drwr_prod_plan_qty   = null;
					oDst.transfer.trsf_drwr_prod_loaded_qty = null;
					oDst.transfer.trsf_prev_prod_cd         = null;
					oDst.transfer.trsf_prev_prod            = null;
				}
				
				// Create the refernece data for this Transfer item.
				createTransferDataRef();
			}
			trace("initializeTransfer_repost() END");
		}
		
		/**
		 *  
		 *  
		 */
		public function autoPopulateBaseMeter(trfIdx:int, drawerCd:String, drawerprodCd:String, armcd:String):void
		{
			var currTransferIndex:int;
			var oTmp:Object;
			
			// Automatically popolate base & meter data.
			////if (DM.ManualTransactions.transactionDataArr.getItemAt(currTransferIndex).baseprod.length == 0)
			{
				var tempBaseProd:ArrayCollection = new ArrayCollection();
				var call:CallResponder = new CallResponder();
				var oDst:Object;
				call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_BASE_DATA'));});
				call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
					
					for each (var oSrc:Object in obj.result)
					{
						
						// Create one base.
						createBaseProd(trfIdx, 1);
						if (DM.ManualTransactions.transactionDataArr)
						{
							oDst = DM.ManualTransactions.transactionDataArr.getItemAt(trfIdx);
							oDst.baseprod[oDst.baseprod.length-1].trsf_bs_prodcd = oSrc.STREAM_BASECODE;
							oDst.baseprod[oDst.baseprod.length-1].trsf_bs_ratio  = oSrc.RATIO_VALUE;
						}
						
						// Create one meter.
						////createMeter();
					}
					
					// DM.ManualTransactions.baseprodDataArr is a temporary object in AUTO mode, clear it.
					if (DM.ManualTransactions.baseprodDataArr)
					{
						DM.ManualTransactions.baseprodDataArr.removeAll();
					}

				});
				call.token = view.manualtransactionsservice.getBaseDetails(drawerCd, drawerprodCd, armcd);
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function createBaseProd(trfIdx:int = -1, auto:int = 0):void
		{
			// TODO Auto-generated method stub
			var currTransferIndex:int;
			var oTmp:Object;
			var obj:Object = new Object();
		
			// Init each properties of base prodcut. Ver1.8
			obj.trsf_bs_prodcd  = null;
			obj.trsf_bs_tk_cd   = null;
			obj.trsf_bs_prodcls = null;
			obj.trsf_bs_den     = null;
			obj.trsf_bs_temp    = null;
			obj.trsf_bs_qty_amb = null;
			obj.trsf_bs_qty_cor = null;
			obj.trsf_bs_load_kg = null;
			obj.trsf_bs_ratio   = null;
			
			if (!auto)  // Manual mode
			{
				currTransferIndex = view.transferDetailsGrid.selectedIndex;
			
				if (currTransferIndex == -1)
				{
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SELECT_ONE_TRSF_DATA'));
					return;
				}
				
				//if (!DM.ManualTransactions.baseprodDataArr) 
				//	DM.ManualTransactions.baseprodDataArr = new ArrayCollection();
				
				DM.ManualTransactions.baseprodDataArr.addItem(obj);
				
				// Store current selected transfer data to filter base data (when adding base).
				oTmp = DM.ManualTransactions.transferDataArr.getItemAt(currTransferIndex);
				DM.ManualTransactions.setTransferDataRef(currTransferIndex, 1, oTmp.trsf_drwr_cd);
				DM.ManualTransactions.setTransferDataRef(currTransferIndex, 2, oTmp.trsf_drwr_prod_cd);
				DM.ManualTransactions.setTransferDataRef(currTransferIndex, 3, oTmp.trsf_arm_cd);
				DM.ManualTransactions.curr_selected_transfer = currTransferIndex;
				
				validateBaseProdInTransfer(trfIdx, auto);
			}
			else  // Auto populate mode
			{
				currTransferIndex = trfIdx;
				
				if (currTransferIndex == -1)
				{
					global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SELECT_ONE_TRSF_DATA'));
					return;
				}
				
				//if (!DM.ManualTransactions.baseprodDataArr) 
				//	DM.ManualTransactions.baseprodDataArr = new ArrayCollection();
				
				DM.ManualTransactions.baseprodDataArr.addItem(obj);
				
				// Store current selected transfer data to filter base data (when adding base).
				///oTmp = DM.ManualTransactions.transferDataArr.getItemAt(currTransferIndex);
				///DM.ManualTransactions.setTransferDataRef(currTransferIndex, 1, oTmp.trsf_drwr_cd);
				///DM.ManualTransactions.setTransferDataRef(currTransferIndex, 2, oTmp.trsf_drwr_prod_cd);
				///DM.ManualTransactions.setTransferDataRef(currTransferIndex, 3, oTmp.trsf_arm_cd);
				///DM.ManualTransactions.curr_selected_transfer = currTransferIndex;
				
				validateBaseProdInTransfer(trfIdx, auto);
				
				// DM.ManualTransactions.baseprodDataArr is a temporary object in AUTO mode, clear it.
				///if (DM.ManualTransactions.baseprodDataArr)
				///{
				///	DM.ManualTransactions.baseprodDataArr.removeAll();
				///}
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function deleteBaseProd(trfIdx:int = -1, auto:int = 0):void
		{
			// TODO Auto-generated method stub
			if (!auto)
			{
				if (DM.ManualTransactions.baseprodDataArr)
				{
					if (view.transferDetailsGrid.selectedIndex != -1 && view.baseprodDataGrid.selectedIndex != -1)
					{
						DM.ManualTransactions.baseprodDataArr.removeItemAt(view.baseprodDataGrid.selectedIndex);
						
						// Update the the baseprod arraycollection in transfer.
						validateBaseProdInTransfer();
					}
					else
					{
						global.msgWarning(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.SELECT_ONE_BASE_DATA'));
					}
				}
			}
			else
			{
				
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function validateBaseProdInTransfer(trfIdx:int = -1, auto:int = 0)
		{
			if (!auto) // Manual mode
			{
				if (view.transferDetailsGrid.selectedIndex != -1)
				{
					DM.ManualTransactions.transactionDataArr.getItemAt(view.transferDetailsGrid.selectedIndex).baseprod.source = DM.ManualTransactions.baseprodDataArr.source;
				}
			}
			else  // Auto populate mode
			{
				if (trfIdx != -1)
				{
					DM.ManualTransactions.transactionDataArr.getItemAt(trfIdx).baseprod.source = DM.ManualTransactions.baseprodDataArr.source;
				}
			}
		}
		
		/**
		 * Set Base Prod grid data provider with Transaction data arraycollection.
		 * 
		 */
		public function validateBaseProd(rowIdx:int = -1)
		{
			trace("in validateBaseProd()");
			
			if (!view.transferDetailsGrid)
				return;
			
			var currSelectedIndex:int;// = view.transferDetailsGrid.selectedIndex;
			currSelectedIndex = view.transferDetailsGrid.selectedIndex == -1 ? view.transferDetailsGrid.selectedIndex : rowIdx;
			
			if (baseprodDataArr && transferDataArr.length > 0 && currSelectedIndex != -1)
			{
				baseprodDataArr.source = transactionDataArr.getItemAt(currSelectedIndex).baseprod.source;
			}
			else if (baseprodDataArr)
			{
				baseprodDataArr.removeAll();
			}
		}
		
		/**
		 * Set Meter grid data provider with Transaction data arraycollection.
		 *  
		 */
		public function validateMeter(rowIdx:int = -1)
		{
			trace("in validateMeter()");
			//0702
			if (!view.transferDetailsGrid)
				return;
			
			var currSelectedIndex:int;// = view.transferDetailsGrid.selectedIndex;
			currSelectedIndex = view.transferDetailsGrid.selectedIndex == -1 ? view.transferDetailsGrid.selectedIndex : rowIdx;
			
			if (meterDataArr && transferDataArr.length > 0 && currSelectedIndex != -1)
			{
				meterDataArr.source = transactionDataArr.getItemAt(currSelectedIndex).meter.source;
				
				/*
				debug S
				var mtr_no:int;
				mtr_no = 0;
				for ecah (var x11:Object in DM.ManualTransactions.transactionDataArr.getItemAt(view.transferDetailsGrid.selectedIndex).meter)
				{
				trace("SRC meter["+mtr_no+"]")
				trace("Injector_or_Meter  " + x11.trsf_mtr_typ)
				trace("Meter_Injector_Code" + x11.trsf_mtr_cd)
				trace("open_amb           " + x11.trsf_mtr_opn_amb)
				trace("open_cor           " + x11.trsf_mtr_opn_cor)
				trace("open_kg            " + x11.trsf_mtr_open_kg)
				trace("close_amb          " + x11.trsf_mtr_cls_amb)
				trace("close_cor          " + x11.trsf_mtr_cls_cor)
				trace("close_kg           " + x11.trsf_mtr_close_kg)
				
				mtr_no++;
				}
				
				mtr_no = 0;
				for ecah (var x111:Object in DM.ManualTransactions.meterDataArr)
				{
				trace("DEST meter["+mtr_no+"]")
				trace("Injector_or_Meter  " + x111.trsf_mtr_typ)
				trace("Meter_Injector_Code" + x111.trsf_mtr_cd)
				trace("open_amb           " + x111.trsf_mtr_opn_amb)
				trace("open_cor           " + x111.trsf_mtr_opn_cor)
				trace("open_kg            " + x111.trsf_mtr_open_kg)
				trace("close_amb          " + x111.trsf_mtr_cls_amb)
				trace("close_cor          " + x111.trsf_mtr_cls_cor)
				trace("close_kg           " + x111.trsf_mtr_close_kg)
				
				mtr_no++;
				}	
				debug E
				*/
				
			}
			else if (meterDataArr)
			{
				meterDataArr.removeAll();
			}
		}
		
		/**
		 * Clear Base Prod data at indicated position in Transaction arraycollection.
		 * 
		 */
		public function clearBaseProd(rowIdx:int):void
		{
			trace("in clearBaseProd()");
			
			if (transactionDataArr != null && transactionDataArr.length > 0
			 && rowIdx >= 0 && rowIdx < transactionDataArr.length)
			{
				transactionDataArr.getItemAt(rowIdx).baseprod.removeAll();
				
				// Sync Base Prod data provider with Transaction data arraycollection. Ver3.0 added
				validateBaseProd(rowIdx);
			}
		}
		
		/**
		 * Clear Meter data at indicated position in Transaction arraycollection.
		 * 
		 */
		public function clearMeter(rowIdx:int):void
		{
			trace("in clearMeter()");
			
			if (transactionDataArr != null && transactionDataArr.length > 0
			 && rowIdx >= 0 && rowIdx < transactionDataArr.length)
			{
				transactionDataArr.getItemAt(rowIdx).meter.removeAll();
				
				// Sync Meter data provider with Transaction data arraycollection. Ver3.0 added
				validateMeter(rowIdx);
			}
		}
		
		/**
		 * Clear Base Prod total data.
		 * 
		 */
		public function clearBaseProdTotal():void
		{
			trace("in clearBaseProdTotal()");
			
			if (baseprodTotalDataArr != null && baseprodTotalDataArr.length > 0)
			{
				baseprodTotalDataArr.removeAll();
			}
		}
		
		/**
		 * Clear Meter total data.
		 * 
		 */
		public function clearMeterTotal():void
		{
			trace("in clearMeterTotal()");
			
			if (meterTotalDataArr != null && meterTotalDataArr.length > 0)
			{
				meterTotalDataArr.removeAll();
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function getDrawerProducts(drawerCode:String):void
		{
			trace("drawer code -> "+drawerCode)
			
			// Get default products list.
			products = new ArrayCollection();
			//super.setServiceArgs(companyCode);
			Server.service('dmManualTransactions.getDrawerProductsByDrawer', drawerCode, populateProducts);
		}
	
		/**
		 *  
		 *  
		 */
		public function populateProducts(result:Object):void
		{
			products.source = result.data;
			for each (var o:Object in products)
			{
				o.CODE_NAME = o.PROD_CODE + " - " + o.PROD_NAME;
			}
		}
		
		/**
		 *  
		 *  
		 */
		override public function populate(params:* = false):void
		{
			//set the service arguments.
			super.setServiceArgs(params);
			
			//fire off the service request.
			Server.service('dmManualTransactions.getInstance', serviceArgs, populateSource);
		}

		/**
		 * Populate all items contents. 
		 *  
		 */
		override protected function populateSource(response : *):void
		{
			trace("+++++Running into <collection>.populateSource")
			
			transactiontypes = new ArrayCollection(
				[
					{id:"S", desc:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.OPTION.TRNSTYPE.LOAD_SCHEDULE')},
					{id:"O", desc:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.OPTION.TRNSTYPE.LOAD_ORDER')},
					{id:"N", desc:mx.resources.ResourceManager.getInstance().getString('default','MTRAN.OPTION.TRNSTYPE.LOAD_NOMINATION')}
				]
			);
			
			transactiontypes.removeItemAt(2);
			
			suppliers = new ArrayCollection(response.rawData.suppliers);
			for each (var o:Object in suppliers)
			{
				o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
			}
			
			trips = new ArrayCollection(response.rawData.trips);
			
			openorders = new ArrayCollection(response.rawData.openorders);
			
			nomiitems = new ArrayCollection(response.rawData.nomiitems);

			carriers = new ArrayCollection(response.rawData.carriers);
			//carriers.addItemAt( {CMPY_CODE:"ANY", CMPY_NAME:"ALL"}, 0 );
			carriers.addItem( {CMPY_CODE:"ANY", CMPY_NAME:"ALL"} );
			for each (var o:Object in carriers)
			{
				o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
			}
			
			tankers = new ArrayCollection(response.rawData.tankers);
			
			operators = new ArrayCollection(response.rawData.operators);
			
			arms = new ArrayCollection(response.rawData.arms);
			for each (var o:Object in arms)
			{
				o.BAY_ARM = o.STREAM_BAYCODE + " - " + o.STREAM_ARMCODE;
			}
			
			equipments = new ArrayCollection(response.rawData.equipments);
			
			compartments = new ArrayCollection(response.rawData.compartments);
			
			drawers = new ArrayCollection(response.rawData.drawers);
			for each (var o:Object in drawers)
			{
				o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
			}
			
			productscontainer = new ArrayCollection(response.rawData.productscontainer);
			for each (var o:Object in productscontainer)
			{
				o.CODE_NAME = o.PROD_CODE + " - " + o.PROD_NAME;
			}
			
			products = new ArrayCollection(response.rawData.products);
			for each (var o:Object in products)
			{
				o.CODE_NAME = o.PROD_CODE + " - " + o.PROD_NAME;
			}
			
			productsrecipe = new ArrayCollection(response.rawData.productsrecipe);

			metercodes = new ArrayCollection(response.rawData.metercodes);
			
			metertypes = new ArrayCollection(response.rawData.metertypes);
			for each (var o:Object in metertypes)
			{
				o.CODE_NAME = o.METER_TYPE_CODE + " - " + o.METER_TYPE_DESC;
			}
			
			tankcodes = new ArrayCollection(response.rawData.tankcodes);

			baseproducts = new ArrayCollection(response.rawData.baseproducts);
			for each (var o:Object in baseproducts)
			{
				o.CODE_NAME = o.STREAM_BASECODE + " - " + o.STREAM_BASENAME;
			}
			
			baseproductclasses = new ArrayCollection(response.rawData.baseproductclasses);
			
			vcfinfo = new ArrayCollection(response.rawData.vcfinfo);
			vcf = 1;
			for each (var o:Object in vcfinfo)
			{
				vcf = o.AIR_BOUYANCY;
			}

			super.populateSource(response);
		}

		/*
		public function populateSource2( params:* = false ):void
		{
			//set the service arguments.
			super.setServiceArgs(params);
			
			//fire off the service request.
			Server.service('dmManualTransactions.tripsLookup', serviceArgs, populateSource);
		}
		*/
		
		/**
		 * Create one Transfer data.
		 *  
		 */
		public function createTransfer() : void
		{
			if (!transactionDataArr) 
				transactionDataArr = new ArrayCollection();

			//0702 if (!transferDataArr) 
			//	transferDataArr = new ArrayCollection();
			
			var obj:Object = new Object();
			
			///obj.drawerProductSelection = new ArrayCollection(DM.ManualTransactions.products.source);
			
			// Init each properties of transfer. Ver1.6
			obj.trsf_arm_cd               = null;
			obj.trsf_cmpt_no              = null;
			obj.trsf_density              = null;
			obj.trsf_drwr_cd              = null;
			obj.trsf_drwr_prod_cd         = null;
			obj.trsf_drwr_prod_loaded_qty = null;
			obj.trsf_drwr_prod_plan_qty   = null;
			obj.trsf_equip_id             = null;
			obj.trsf_prev_prod            = null;
			obj.trsf_prev_prod_cd         = null;
			obj.trsf_qty_amb              = null;
			obj.trsf_qty_cor              = null;
			obj.trsf_load_kg              = null;
			obj.trsf_temp                 = null;
			obj.trsf_drawerprod_row       = "DRAWERPROD";  // Ver2.9 Special column for rounding
			
			transferDataArr.addItem(obj);
			
			var currTransferIndex:int = transferDataArr.length - 1;
			
			if (currTransferIndex >= 0)
			{
				transactionDataArr.addItem(
					{
						transfer: transferDataArr.getItemAt(currTransferIndex),
						meter: new ArrayCollection(),
						baseprod: new ArrayCollection()
					}
				);
			}
		}
		
		/**
		 * Delete all Transfers data.
		 *  
		 */
		public function deleteAllTransfer(): void
		{
			// Clear data in Transfer arraycollection.
			if (transferDataArr)
			{
				transferDataArr.removeAll();
			}

			// Clear data in Meter arraycollection.
			if (meterDataArr)
			{
				meterDataArr.removeAll();
			}
			
			// Clear data in Meter total arraycollection.
			if (meterTotalDataArr)
			{
				meterTotalDataArr.removeAll();
			}
			
			// Clear data in Baseprod arraycollection.
			if (baseprodDataArr)
			{
				baseprodDataArr.removeAll();
			}
			
			// Clear data in Baseprod total arraycollection.
			if (baseprodTotalDataArr)
			{
				baseprodTotalDataArr.removeAll();
			}
			if (baseprodTotalDataArr_prev)
			{
				baseprodTotalDataArr_prev.removeAll();
			}
			
			// Clear data in Transaction arraycollection.
			if (transactionDataArr)
			{
				transactionDataArr.removeAll();
			}
			
			// Clear data in Transfer reference arraycollection.
			if (curr_trsf_ref)
			{
				curr_trsf_ref.removeAll();
			}
		}
		
		/**
		 * Create the reference data for Transfer grid.
		 * It is used by adding BaseProd and Meter.
		 * 
		 */
		public function createTransferDataRef()
		{
			if (!curr_trsf_ref)
			{
				curr_trsf_ref = new ArrayCollection();
			}
			
			var obj:Object = new Object();
			
			obj.curr_trsf_drwr_cd = null;
			obj.curr_trsf_drwr_prod_cd = null;
			obj.curr_trsf_arm_cd = null;
			
			curr_trsf_ref.addItem(obj);
		}
		
		/**
		 * Clear the reference data arraycollection for Transfer grid.
		 *  
		 */
		public function deleteTransferDataRef(rowIdx:int)
		{
			if (curr_trsf_ref)
			{
				curr_trsf_ref.removeItemAt(rowIdx);
			}
			
		}
		
		/**
		 * Clear the current reference index for transfer grid.
		 *  
		 */
		public function clearTransferDataRefIndex():void
		{
			curr_selected_transfer = -1;
		}
		
		
		/**
		 * Set the reference data in Transfer grid.
		 *
		 * Param: rowIdx, pos, refCode
		 *   rowIdx  -> the row index in Transfer grid
		 *   pos     -> 1: set drawer code  2: set drawer prod code  3: set arm code
		 *   refCode -> the reference value
		 *   
		 */
		public function setTransferDataRef(rowIdx:int, pos:int, refCode:String)
		{
			if (curr_trsf_ref && rowIdx < curr_trsf_ref.length)
			{
				var o:Object = curr_trsf_ref.getItemAt(rowIdx);
				
				switch (pos)
				{
					case 1:
					{
						o.curr_trsf_drwr_cd = refCode;
					}
					break;
					
					case 2:
					{
						o.curr_trsf_drwr_prod_cd = refCode;
					}
					break;
					
					case 3:
					{
						o.curr_trsf_arm_cd = refCode;
					}
					break;
				}
				
				trace("setTransferDataRef ===================> ROW_INDEX ->"+rowIdx);
				trace("setTransferDataRef ====> Drawer Code              ->"+DM.ManualTransactions.curr_trsf_ref.getItemAt(rowIdx).curr_trsf_drwr_cd);
				trace("setTransferDataRef ====> Drawer Prod Code         ->"+DM.ManualTransactions.curr_trsf_ref.getItemAt(rowIdx).curr_trsf_drwr_prod_cd);
				trace("setTransferDataRef ====> Arm Code                 ->"+DM.ManualTransactions.curr_trsf_ref.getItemAt(rowIdx).curr_trsf_arm_cd);
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function refreshTransferGrid()
		{
			if (DM.ManualTransactions.transferDataArr)
			{
				// Refresh Base Grid.
				DM.ManualTransactions.transferDataArr.refresh();
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function refreshChildGrid()
		{
			if (DM.ManualTransactions.baseprodDataArr)
			{
				// Refresh Base Grid.
				DM.ManualTransactions.baseprodDataArr.refresh();
			}
			
			if (DM.ManualTransactions.meterDataArr)
			{
				// Refresh Meter Grid.
				DM.ManualTransactions.meterDataArr.refresh();
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function getValidSingleArm(drawer_code:String, drawerprod_code:String):String
		{
			var drawerprod_recipe:ArrayCollection;
			var armCodes_recipe:ArrayCollection;
			var armCodes_distinct:ArrayCollection;
			var armCodes:ArrayCollection;
			
			drawerprod_recipe = new ArrayCollection();
			armCodes_recipe = new ArrayCollection();
			armCodes_distinct = new ArrayCollection();
			armCodes = new ArrayCollection();
			for each (var obj:Object in DM.ManualTransactions.arms)
			{
				// Drawer + Drawer Product ==> Arm
				if (obj.RAT_PROD_PRODCMPY == drawer_code
					&& obj.RAT_PROD_PRODCODE == drawerprod_code)
				{
					// Only add the arms belong to this company+product.
					var found:int = 0;
					for each (var o:Object in armCodes_distinct)
					{
						if (obj.STREAM_ARMCODE == o.STREAM_ARMCODE)
						{
							found = 1;
							break;
						}
					}
					if (!found)
					{
						armCodes_distinct.addItem(obj);
					}
				}
			}
			
			// Check Drawer Prod recipe with Arms.
			// Only those Arms which have full Drawer Prod components can be listed.
			for each (var obj:Object in DM.ManualTransactions.productsrecipe)
			{
				// Prepare the drawer product's components.
				if (obj.PROD_CMPY == drawer_code
					&& obj.PROD_CODE == drawerprod_code)
				{
					drawerprod_recipe.addItem(obj);
				}
			}
			// Check each arm.
			for each (var oArmDist:Object in armCodes_distinct)
			{
				var componentFoundCnt:int = 0;
				var baseprodCnt:int       = 0;
				
				// Prepare each arm's components.
				armCodes_recipe.removeAll();
				for each (var o2:Object in DM.ManualTransactions.arms)
				{
					if (oArmDist.RAT_PROD_PRODCMPY == o2.RAT_PROD_PRODCMPY
						&& oArmDist.RAT_PROD_PRODCODE == o2.RAT_PROD_PRODCODE
						&& oArmDist.STREAM_ARMCODE == o2.STREAM_ARMCODE)
					{
						armCodes_recipe.addItem(o2);
					}
				}
				
				// Compare drawer product component and arm component.
				for each (var o3:Object in armCodes_recipe)
				{
					for each (var objDP:Object in drawerprod_recipe)
					{
						if (objDP.RATIO_BASE == o3.STREAM_BASECODE)
						{
							componentFoundCnt++; // This arm has this component.
						}
					}
					if (o3.STREAM_BCLASS_CODE != 6) // Class 6 is ADDITIVE
					{
						baseprodCnt++; // The base prod count in this arm.
					}
				}
				if (componentFoundCnt == drawerprod_recipe.length && baseprodCnt >= 1) // At leaset 1 base prod needed to list this arm. If all components are ADDITIVE, this arm is not valid.)
				{
					// This arm has all the Drawer Product components.
					// So it can be listed in arm list.
					armCodes.addItem(oArmDist);
				}
			}
			
			// If only 1 arm available return its code.
			if (armCodes.length == 1)
			{
				return armCodes.getItemAt(0).STREAM_ARMCODE;	
			}
			else
			{
				return null;
			}
		}
		
		/**
		 *  
		 *  
		 */
		public function invalidateBaseprodTotalArr():void
		{
			// Set to true means the Base prod total needs refreshing(calculate from Drawer prod).
			needRefreshBaseprodTotalDataArr = true;
		}
		
		/**
		 *  
		 *  
		 */
		public function validateBaseprodTotalArr():void
		{
			// Set to false means the Base prod total doesn't need refreshing(calculate from Drawer prod).
			needRefreshBaseprodTotalDataArr = false;
		}
		
		/**
		 *  
		 *  
		 */
		public function setAccBaseAdjusted():void
		{
			// Set to true means the Acc Base adjusted(by changing Acc Base Den or Obs).
			isAccBaseAdjusted = true;
		}
		
		/**
		 *  
		 *  
		 */
		public function unsetAccBaseAdjusted():void
		{
			// Set to false means the Acc Base NOT adjusted(by changing Acc Base Den or Obs).
			isAccBaseAdjusted = false;
		}
		
		/**
		 *  
		 *  
		 */
		public function setBaseAdjCalFlag():void
		{
			// Set to true means system is calculating.
			baseAdjCalculating = true;
		}
		
		/**
		 *  
		 *  
		 */
		public function unsetBaseAdjCalFlag():void
		{
			// Set to false means calculation has finished.
			baseAdjCalculating = false;
		}
		
		/**
		 * Clear TEMP and OBS/STD/MASS since Drawer product or Arm changed
		 *  
		 */
		public function prodarmChanged(trsfIdx:int):void
		{
			if (transactionDataArr != null && transactionDataArr.length > 0 && trsfIdx >= 0 && trsfIdx < transactionDataArr.length)
			{
				// Clear the relevant data in compartment(trasfer).
				if (transactionDataArr[trsfIdx].transfer.trsf_temp != null)
					transactionDataArr[trsfIdx].transfer.trsf_temp = null;
				if (transactionDataArr[trsfIdx].transfer.trsf_qty_amb != null)
					transactionDataArr[trsfIdx].transfer.trsf_qty_amb = null;
				if (transactionDataArr[trsfIdx].transfer.trsf_qty_cor != null)
					transactionDataArr[trsfIdx].transfer.trsf_qty_cor = null;
				if (transactionDataArr[trsfIdx].transfer.trsf_load_kg != null)
					transactionDataArr[trsfIdx].transfer.trsf_load_kg = null;
				
				// The following clean up should have be done in Drawer prod & Arm renderers
				// e.g 
				// Clear all base&meter. 
				// DM.ManualTransactions.clearBaseProd(rowIndex);
				for (var bsIdx:int =0; bsIdx < transactionDataArr[trsfIdx].baseprod.length; bsIdx++)
				{
					if (transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_temp != null)
						transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_temp    = null;
					if (transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb != null)
						transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb = null;
					if (transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_qty_cor != null)
						transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_qty_cor = null;
					if (transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_load_kg != null)
						transactionDataArr[trsfIdx].baseprod[bsIdx].trsf_bs_load_kg = null;
				}
			}
		}
		
		
		/**
		 * Lock control functions to prevent Transfer grid index changes accidentally.
		 * Such as user intentially clicks.
		 */
		public function isAutoPopBMLocked():Boolean
		{
			return Lock_AutoPopBM;
		}
		
		public function lockAutoPopBM():void
		{
			Lock_AutoPopBM = true;
		}
		
		public function unlockAutoPopBM():void
		{
			Lock_AutoPopBM = false;
		}
		
		public function resetLockAutoPopBM():void
		{
			Lock_AutoPopBM = false;
		}
		
		public function isRenderChangeLocked():Boolean
		{
			return Lock_RenderChange;
		}
		
		public function lockRenderChange():void
		{
			Lock_RenderChange = true;
		}
		
		public function unlockRenderChange():void
		{
			Lock_RenderChange = false;
		}
		
		public function isWorkResLocked():Boolean
		{
			return Lock_WorkRes;
		}
		
		public function lockWorkRes():void
		{
			Lock_WorkRes = true;
		}
		
		public function unlockWorkRes():void
		{
			Lock_WorkRes = false;
		}
		
		public function setTransferRowIndex(idx:int):void
		{
			effectiveRowIndex = idx;
		}
		
		public function getTransferRowIndex():int
		{
			return effectiveRowIndex;
		}
		
		public function resetTransferRowIndex():void
		{
			effectiveRowIndex = -1;
		}
		
		public function isCurrentEffectiveTransferRow(row:int):Boolean
		{
			if (row == effectiveRowIndex)
				return true;
			else
				return false;
		}
		
		
		/* replaced by php services Start */
		/////////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////
		public function getCustomersBySupplier(companyCode:String):void
		{
			trace("supp code -> "+companyCode)
			customers = new ArrayCollection();
			Server.service('dmManualTransactions.getCustomersBySupplier', companyCode, populateCustomers);
		}
		
		public function populateCustomers(result:Object):void
		{
			customers.source = result.data;
			for each (var o:Object in customers)
			{
				o.CODE_NAME = o.CUST_ACNT + " - " + o.CUST_CMPY_NAME;
			}
		}
		
		public function getOpenOrderNumberByCustomer(custAcct:String):void
		{
			trace("supp code -> "+custAcct)
			openorders = new ArrayCollection();
			Server.service('dmManualTransactions.getOpenOrderNumberByCustomer', custAcct, populateOpenOrders);
		}
		
		public function populateOpenOrders(result:Object):void
		{
			openorders.source = result.data;
		}
		
		public function getCarriersBySuppTrip(supplier: String, tripNo:String):void
		{
			trace("supplier -> "+supplier)
			trace("trip no -> "+tripNo)
			// Get default carriers list.
			carriers = new ArrayCollection();
			var param : Object = new Object();
			param.supp = supplier;
			param.trip_no = tripNo;
			Server.service('dmManualTransactions.getCarriersBySuppTrip', param, populateCarriersBySuppTrip);
		}
		
		public function populateCarriersBySuppTrip(result:Object):void
		{
			carriers.source = result.data;
			//carriers.addItemAt( {CMPY_CODE:"ANY", CMPY_NAME:"ALL"}, 0 );
			carriers.addItem( {CMPY_CODE:"ANY", CMPY_NAME:"ALL"} );
			for each (var o:Object in carriers)
			{
				o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
			}
			
			// Set default selected Carrier.
			view.new_carrier.selectedIndex = getDefaultCarrier();
		}
		
		public function getTankersBySuppTrip(supplier: String, tripNo:String):void
		{
			trace("supplier -> "+supplier)
			trace("trip no -> "+tripNo)
			// Get default tankers list.
			tankers = new ArrayCollection();
			var param : Object = new Object();
			param.supp = supplier;
			param.trip_no = tripNo;
			Server.service('dmManualTransactions.getTankersBySuppTrip', param, populateTankers2);
		}
		
		public function populateTankers2(result:Object):void
		{
			tankers.source = result.data;
			
			// Set default selected Tanker.
			view.new_tanker.selectedIndex = getDefaultTanker();
			
			// Refresh Equipment & Compartment list contents.
			if (view.new_tanker.selectedIndex > -1)
			{
				getCompartment(view.new_tanker.selectedItem.TNKR_CODE);
				getEquipment(view.new_tanker.selectedItem.TNKR_CODE);
			}
		}
		
		public function getEquipment(tankerCode:String):void
		{
			trace("tanker code -> "+tankerCode)
			
			if (!equipments) // Prevent the Equipments list from refreshing.
				equipments = new ArrayCollection();
			Server.service('dmManualTransactions.getEquipmentsByTanker', tankerCode, populateEquipments);
		}
		
		public function populateEquipments(result:Object):void
		{
			// Update equipments arraycollection with filtered equipment data.
			equipments.source = result.data;
			
			// As Equipment contents changed,
			// update the Equipment contents in Transfer grid.
			switch(view.new_trans_type.selectedItem.id)
			{
				case "S":  // Shipment(Non Open Order)
				case "N":  // Nomination
					if (view.new_supplier.selectedIndex > -1 && view.new_trip.selectedIndex > -1)
					{
						initializeTransfer();
					}
					break;
				case "O":  // Open Order
					if (_timing_openorder_count != -1)
					{
						_timing_openorder_count++;
						trace("_timing_openorder_count  ==> "+_timing_openorder_count);
					}
					if (_timing_openorder_count == TIMING_OPENORDER_TARGET)
					{
						if (view.new_supplier.selectedIndex > -1 && view.new_order.selectedIndex > -1)
						{
							initializeTransfer();
						}
					}
					break;
				default:
					break;
			}
		}
		
		public function getCompartment(tankerCode:String):void
		{
			trace("tanker code -> "+tankerCode)
			
			if (!compartments) // Prevent the Compartment list from refreshing.
				compartments = new ArrayCollection();
			Server.service('dmManualTransactions.getCompartmentsByTanker', tankerCode, populateCompartments);
		}
		
		public function populateCompartments(result:Object):void
		{
			// Update compartments arraycollection with filtered compartment data.
			compartments.source = result.data;
			
			// As Compartent contents changed,
			// update the Compartment contents in Transfer grid.
			switch(view.new_trans_type.selectedItem.id)
			{
				case "S":  // Shipment(Non Open Order)
				case "N":  // Nomination
					if (view.new_supplier.selectedIndex > -1 && view.new_trip.selectedIndex > -1)
					{
						/*
						var my_event:Event = new Event(FM_USER_COMPARTMENTCHANGED);
						compartments.addEventListener(FM_USER_COMPARTMENTCHANGED, initializeTransfer);
						trace("populateCompartments -> initializeTransfer()")
						compartments.dispatchEvent(my_event);
						*/
						/*
						view.callLater(function():void{
						initializeTransfer(my_event);
						});
						*/
						initializeTransfer();
					}
					break;
				case "O":  // Open Order
					if (_timing_openorder_count != -1)
					{
						_timing_openorder_count++;
						trace("_timing_openorder_count  ==> "+_timing_openorder_count);
					}
					if (_timing_openorder_count == TIMING_OPENORDER_TARGET)
					{
						if (view.new_supplier.selectedIndex > -1 && view.new_order.selectedIndex > -1)
						{
							initializeTransfer();
						}
					}
					break;
				default:
					break;
			}
		}
		
		public function getScheduleDetailsBySuppTrip(supplier: String, tripNo:String):void
		{
			trace("supplier -> "+supplier)
			trace("trip no -> "+tripNo)
			
			// Get default schedule details list.
			scheduleDetailsArr = new ArrayCollection();
			var param : Object = new Object();
			param.supp = supplier;
			param.trip_no = tripNo;
			Server.service('dmManualTransactions.getScheduleDetailsBySuppTrip', param, populateScheduleDetailsBySuppTrip);
		}
		
		public function populateScheduleDetailsBySuppTrip(result:Object):void
		{
			scheduleDetailsArr.source = result.data;
			
			// Populate Driver list.
			if (scheduleDetailsArr && scheduleDetailsArr.length > 0)
			{
				trace("populateScheduleDetailsBySuppTrip -> getDriverCodeBySuppDrawer()");
				for each (var oSrc:Object in scheduleDetailsArr)
				{
					// Only need to get the drawer from the schedule item(compartment) which has supplier filled. 
					if (oSrc.SHLS_SUPP == null)
					{
						continue;
					}
					getDriverCodeBySuppDrawer(oSrc.SHLS_SUPP/*Supplier*/, oSrc.SHLS_SUPP/*Drawer. Here use SHL_SUPP as drawer.*/);
					break;
				}
			}
			
			trace("populateScheduleDetailsBySuppTrip -> initializeTransfer()");
			initializeTransfer();
		}
		
		public function getOrderDetailsByTanker(suppCode:String, OpenOrderNo: String, tankerCode:String):void
		{
			trace("tanker code -> "+tankerCode)
			
			// Get default order details list.
			scheduleDetailsArr = new ArrayCollection();
			var param : Object = new Object();
			param.suppcode = suppCode;
			param.openorderno = OpenOrderNo;
			param.tankercode = tankerCode;
			Server.service('dmManualTransactions.getOrderDetailsByTanker', param, populateOrderDetailsByTanker);
		}
		
		public function populateOrderDetailsByTanker(result:Object):void
		{
			scheduleDetailsArr.source = result.data;
			
			// Populate Driver list.
			if (scheduleDetailsArr && scheduleDetailsArr.length > 0)
			{
				trace("populateOrderDetailsByTanker -> getDriverCodeBySuppDrawer()");
				for each (var oSrc:Object in scheduleDetailsArr)
				{
					// Only need to get the drawer from the schedule item(compartment) which has supplier filled. 
					if (oSrc.SHLS_SUPP == null)
					{
						continue;
					}
					getDriverCodeBySuppDrawer(oSrc.SHLS_SUPP/*Supplier*/, oSrc.SHLS_SUPP/*Drawer. Here use SHL_SUPP as drawer.*/);
					break;
				}
			}
			
			switch(view.new_trans_type.selectedItem.id)
			{
				case "S":  // Shipment(Non Open Order)
				case "N":  // Nomination
					trace("populateOrderDetailsByTanker S,N-> initializeTransfer()");
					initializeTransfer();
					break;
				case "O":  // Open Order
					if (_timing_openorder_count != -1)
					{
						_timing_openorder_count++;
						trace("_timing_openorder_count  ==> "+_timing_openorder_count);
					}
					if (_timing_openorder_count == TIMING_OPENORDER_TARGET)
					{
						trace("populateOrderDetailsByTanker OO-> initializeTransfer()");
						initializeTransfer();
					}
					break;
				default:
					break;
			}
		}
		
		public function getTanker_OO(companyCode:String):void
		{
			trace("carrier code -> "+companyCode)
			tankers = new ArrayCollection();
			Server.service('dmManualTransactions.getTankerByCarrier_OO', companyCode, populateTankers_OO);
		}
		
		public function populateTankers_OO(result:Object):void
		{
			tankers.source = result.data;
			view.new_tanker.selectedIndex = getDefaultTanker();
			if (view.new_tanker.selectedIndex > -1)
			{
				// Do the same thing as Tanker change event.(in controller)
				//if (view.new_supplier.selectedItem != -1 && view.new_order.selectedItem != -1 && view.new_tanker.selectedItem != -1)
				if (view.new_supplier.selectedIndex > -1 && view.new_order.selectedIndex > -1 && view.new_tanker.selectedIndex > -1)
				{
					DM.ManualTransactions._timing_openorder_count = 0;
					DM.ManualTransactions.getEquipment(view.new_tanker.selectedItem.TNKR_CODE);
					DM.ManualTransactions.getCompartment(view.new_tanker.selectedItem.TNKR_CODE);
					DM.ManualTransactions.getOrderDetailsByTanker(view.new_supplier.selectedItem.CMPY_CODE, view.new_order.selectedItem.ORDER_CUST_ORDNO, view.new_tanker.selectedItem.TNKR_CODE);
				}
			}
		}
		
		public function getCarriersByOpenOrder(custOrderNo:String):void
		{
			trace("cust order no -> "+custOrderNo)
			carriers = new ArrayCollection();
			Server.service('dmManualTransactions.getCarriersByOpenOrder', custOrderNo, populateCarriersByOpenOrder);
		}
		
		public function populateCarriersByOpenOrder(result:Object):void
		{
			carriers.source = result.data;
			//carriers.addItemAt( {CMPY_CODE:"ANY", CMPY_NAME:"ALL"}, 0 );
			carriers.addItem( {CMPY_CODE:"ANY", CMPY_NAME:"ALL"} );
			for each (var o:Object in carriers)
			{
				o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
			}
			
			if (carriers.length == 0) // Retrive carriar again.
			{
				trace("cust order has no carrier specified  -> now get all carriers")
				carriers = new ArrayCollection();
				Server.service('dmManualTransactions.getAllCarriers', null, populateAllCarriers);
			}
			else if (carriers.length == 1) // Set default selected Carrier.
			{
				view.new_carrier.selectedIndex = getDefaultCarrier();
				if (view.new_carrier.selectedIndex > -1)
				{
					getTanker_OO(view.new_carrier.selectedItem.CMPY_CODE);
				}
			}
		}
		
		public function populateAllCarriers(result:Object):void
		{
			carriers.source = result.data;
			//carriers.addItemAt( {CMPY_CODE:"ANY", CMPY_NAME:"ALL"}, 0 );
			carriers.addItem( {CMPY_CODE:"ANY", CMPY_NAME:"ALL"} );
			for each (var o:Object in carriers)
			{
				o.CODE_NAME = o.CMPY_CODE + " - " + o.CMPY_NAME;
			}
			
			// Set default selected Carrier.
			view.new_carrier.selectedIndex = getDefaultCarrier();
		}
		
		public function getOrderProductsByCustOrderNo(custOrderNo: String):void
		{
			trace("cust order no -> "+custOrderNo)
			
			// Get open order products list.
			schdbyprodlist = new ArrayCollection();
			var param : Object = new Object();
			param.custorderno = custOrderNo;
			Server.service('dmManualTransactions.getOrderProductsByCustOrderNo', param, populateOrderProductsByCustOrderNo);
		}
		
		public function populateOrderProductsByCustOrderNo(result:Object):void
		{
			schdbyprodlist.source = result.data;
			
			for each (var o:Object in schdbyprodlist)
			{
				o.CODE_NAME = o.PROD_CODE + '-' + o.PROD_NAME + ' (Planned:' + o.SCHP_SPECQTY + ' | Loaded:' + o.QTY_LOADED + ' | ' + o.UNIT_NAME + ')';
			}
		}
		
		public function getAdditionalInfoByCustOrderNo(custOrderNo:String):void
		{
			trace("cust order no -> "+custOrderNo)
			Server.service('dmManualTransactions.getAdditionalInfoByOpenOrder', custOrderNo, populateAdditionalInfoByOpenOrder);
		}
		
		public function populateAdditionalInfoByOpenOrder(result:Object):void
		{
			for each (var o:Object in result.data)
			{
				view.new_customer_cd.text = o.CUSTOMER_CODE;
				view.new_delv_loc.text = o.DELIVERY_LOCATION;
				break;
			}
		}
		
		public function getTanker(companyCode:String):void
		{
			trace("carrier code -> "+companyCode)
			tankers = new ArrayCollection();
			Server.service('dmManualTransactions.getTankerByCarrier', companyCode, populateTankers);
		}
		
		public function populateTankers(result:Object):void
		{
			tankers.source = result.data;
			view.new_tanker.selectedIndex = getDefaultTanker();
		}
		
		public function getDriverCodeBySuppDrawer(suppCode:String, drawerCode:String):void
		{
			trace("supp code -> "+suppCode)
			trace("drawer code -> "+drawerCode)
			operators = new ArrayCollection();
			var param : Object = new Object();
			param.supp = suppCode;
			param.drawer = drawerCode;
			Server.service('dmManualTransactions.getDriverCodeBySuppDrawer', param, populateDrivers);
		}
		
		public function populateDrivers(result:Object):void
		{
			operators.source = result.data;
			setDefaultUser();
		}
		
		public function getTripNumber(type:String, companyCode:String):void
		{
			trace("supp code -> "+companyCode)
			trips = new ArrayCollection();
			var param : Object = new Object();
			param.type = type;
			param.cmpy_code = companyCode;
			Server.service('dmManualTransactions.getTripNumberBySupplier', param, populateTrips);
		}
		
		public function populateTrips(result:Object):void
		{
			trips.source = result.data;
		}
		/////////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////
		/* replaced by php services End */

	}
}