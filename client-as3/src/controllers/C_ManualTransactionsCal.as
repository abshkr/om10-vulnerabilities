package controllers
{
	import com.adobe.fiber.runtime.lib.DateTimeFunc;
	
	import components.DKI_AlertBox;
	import components.DKI_PassBox;
	import components.MessageDialog;
	import components.ModalEquipmentType;
	import components.PasswordCheckDlg;
	
	import dm.DM;
	import dm.collections.dmManualTransactions;
	import dm.models.dmManualTransactionData;
	import dm.models.dmModel;
	import dm.utils.tools;
	
	import flash.display.DisplayObject;
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.MouseEvent;
	import flash.globalization.LocaleID;
	import flash.text.TextFormat;
	import flash.utils.Timer;
	import flash.utils.setTimeout;
	
	import mx.collections.ArrayCollection;
	import mx.collections.errors.ItemPendingError;
	import mx.controls.Alert;
	import mx.controls.Button;
	import mx.controls.DateField;
	import mx.core.FlexGlobals;
	import mx.events.CloseEvent;
	import mx.events.DataGridEvent;
	import mx.events.EffectEvent;
	import mx.events.FlexEvent;
	import mx.events.ListEvent;
	import mx.events.ValidationResultEvent;
	import mx.managers.PopUpManager;
	import mx.resources.ResourceManager;
	import mx.rpc.CallResponder;
	import mx.rpc.events.FaultEvent;
	import mx.rpc.events.ResultEvent;
	import mx.rpc.http.HTTPService;
	import mx.utils.ObjectUtil;
	import mx.utils.StringUtil;
	import mx.validators.NumberValidatorDomainType;
	
	import renderers.DKI_HeaderColumn_Renderer;
	
	import spark.components.gridClasses.GridColumn;
	import spark.components.gridClasses.IGridItemRenderer;
	import spark.core.NavigationUnit;
	import spark.events.GridEvent;
	import spark.events.GridItemEditorEvent;
	import spark.events.GridSelectionEvent;
	import spark.events.IndexChangeEvent;
	import spark.formatters.DateTimeFormatter;
	
	import views.v_ManualTransactions;
	
	public class C_ManualTransactionsCal extends EventDispatcher
	{
		[Bindable] public var view:v_ManualTransactions;
		
		[Bindable] public var readOnly:   Boolean = false;
		[Bindable] public var canReset:   Boolean = false;
		[Bindable] public var canUpdate:  Boolean = false;
		[Bindable] public var canCreate:  Boolean = false;
		[Bindable] public var canDelete:  Boolean = false;
		[Bindable] public var hasPassword:Boolean = false;

		private static const PRIORITY_AUTO = -1;         // The priority of AUTO
		private static const PRIORITY_NONE = 0;          // The priority of NONE
		private static const PRIORITY_AMB  = 1;          // The priority of AMB
		private static const PRIORITY_STD  = 2;          // The priority of STD
		private static const PRIORITY_KG   = 3;          // The priority of KG
		
		private var DENSITY_DECIMAL: int = 10;
		private var TEMP_DECIMAL:    int = 100;
		private var ADDITIVE_DECIMAL:int = 1000;
		private var QTY_DECIMAL:     int = 1000;
		
		private var DEN_MAX:Number = 1075;
		private var DEN_MIN:Number = 653;
		private var OBS_MAX:Number = 999999999;
		private var OBS_MIN:Number = 0;
		
		private var RESULT_OK:int = 0;                   // Result OK.
		private var RESULT_01:int = 1;                   // Negative values found in OBS fields.
		private var RESULT_02:int = 2;                   // Adjustable Base AMB total is ZERO. Can't perform recalculation.
		private var RESULT_03:int = 3;                   // No adjustable Bases.
		private var RESULT_04:int = 4;                   // No valid compartment(s) data for calculation.
		private var RESULT_N1:int = -1;                  // Parameters wrong.
		
		private var Result:  Object;                     // Result object.
		private var res_code:int;                        // Result code.
		
		private var dmMT:dmManualTransactions;           // dmMT needs to be replaced by new class memebers(arraycollections),
														 // which are clone of baseprodTotalDataArr and transactionDataArr.
														 // currently to simplify the programming just reuse DM.ManualTransactions.
		
		private var accBaseSelectedIdx:int;              // Acc base prod selected index.
		private var OBS_adjust:        Number;           // Acc base prod adjustment qty.
		private var vcf:               Number;           // Air Bouyancy factor.
		private var transDataClone:    ArrayCollection;  // The copy of the transaction data arraycollection.
		private var bsTotalDataClone:  ArrayCollection;  // The copy of the base total data arraycollection.
		
		private var transDataBsTotalCnt:Number;          // The total bases count in a transaction.
		private var transDataBsIndex:   ArrayCollection; // The bases index.
		
		private var changedAccBaseCode          : String; // The acc base code of which qty user has changed.
		private var changedAccBaseDen           : Number; // The acc base density which user has changed.
		private var adjustableBaseCount         : int;    // The count of adjustable bases.
		private var adjustableBaseAMBtotal      : Number  // The sum of base original qty, of which code matches the acc base user changed.
		private var otherMostSignificantBaseCode: String; // The other most significant base code in a drawer prod.
		
		private var baseVCFInfo                 : ArrayCollection; // The VCF factor for each Base.
		
		private var succeedTransInfo            : ArrayCollection; // The transfers calculated successfully. (for message show)
		
		public function C_ManualTransactionsCal(param:Object)
		{
			Result              = new Object;
			transDataClone      = new ArrayCollection;
			bsTotalDataClone    = new ArrayCollection;
			
			transDataBsTotalCnt = 0;
			transDataBsIndex    = new ArrayCollection;
			
			baseVCFInfo         = new ArrayCollection;
			
			succeedTransInfo    = new ArrayCollection;
			
			view                = param.view;
			dmMT                = DM.ManualTransactions;
			accBaseSelectedIdx  = param.accBaseSelectedIdx;
			OBS_adjust          = param.OBS_adjust;
			vcf                 = param.vcf;
			
			tools.acCopy(dmMT.transactionDataArr, transDataClone);
			tools.acCopy(dmMT.baseprodTotalDataArr, bsTotalDataClone);
			
			adjustableBaseCount          = 0;
			adjustableBaseAMBtotal       = 0;
			otherMostSignificantBaseCode = "";
		}
		
		public function initialize():void
		{
		
		}
		
		/**
		 * Get the result object.
		 *  
		 */
		public function getResult():Object
		{
			Result.code             = res_code;
			Result.transDataClone   = transDataClone;
			Result.bsTotalDataClone = bsTotalDataClone;
			Result.succeedTransInfo = succeedTransInfo;
			
			return Result;
		}
		
		/**
		 * Calculate all Drawer products(including Base products).
		 *  
		 */
		public function calDrawers(callback:Function = null):void
		{
			// Ver2.0
			// Firstly sync Drawer Prod Temp to its all bases.
			// Since the bases temp could be null when user changes the arm,
			// (which is a previous requirment - pop base temp as blank and only when user changes the temp in drawer prod then auto pop its bases temp),
			// but when we do the ondemand cal qty, the bases temp is one of compulsory parameters,
			// if it is left as blank, there could be a warning message which is annoying.
			// So force to update bases temp in this transfer.
			// The temp in base total tab may also need update?!
			refreshBaseTemp();
			
			// Dispatch Drawer QTY to Bases.
			dispatchDrawerQty();
			
			// Go through every compartment(transfer) to numerate all base indexes and total count.
			numBaseIndex();
			
			// Get Bases VCF factors.
			getBasesVCFInfo(function():void{
				
				var bsIndex:int = 1;
				calBaseBySiganificantQty(bsIndex, PRIORITY_AUTO, function():void{
					// Calculate each transfer's other quantities.
					calOtherQty();
					
					// Calculate base total.
					calBaseTotals();
					
					if (succeedTransInfo != null && succeedTransInfo.length > 0)
						res_code = RESULT_OK;
					else
						res_code = RESULT_04;
					
					if (callback != null)
						callback();
				});
			});  // end of getBasesVCFInfo
			
		}
		
		/**
		 * Dispatch Drawer QTY to Bases according to each Base's ratio.
		 *  
		 */
		public function dispatchDrawerQty():void
		{
			var priority: int;
			
			for (var trsfIdx:int = 0; trsfIdx < transDataClone.length; trsfIdx++)
			{
				var trsf: Object       = transDataClone[trsfIdx];
				var ratio_total:Number = 0;
				
				// Get the most siganificant qty.
				priority = getPriorityQty(trsfIdx);
				
				// Cal the bases ratio total.
				for (var bsIdx:int = 0; bsIdx < trsf.baseprod.length; bsIdx++)
				{
					ratio_total += Number(trsf.baseprod[bsIdx].trsf_bs_ratio);
				}
				
				for (var bsIdx:int = 0; bsIdx < trsf.baseprod.length; bsIdx++)
				{
					var tmpStr:String = trsf.baseprod[bsIdx].trsf_bs_prodcls;
					
					switch(priority){
						case PRIORITY_NONE:
							// Ver3.1
							// Bug 4092 fix.
							// In this compartment(transfer), there is no any quantities(Obs/Std/Mass),
							// all its Bases quantities should be cleared.
							trsf.baseprod[bsIdx].trsf_bs_qty_amb = null;
							trsf.baseprod[bsIdx].trsf_bs_qty_cor = null;
							trsf.baseprod[bsIdx].trsf_bs_load_kg = null;
							break;
						case PRIORITY_AMB:  // Dispatch Drawer AMB into Bases.
							if (tmpStr.toUpperCase() != "ADDITIVE")
							{
								// non-additive: no decimals --> 3 decimals
								trsf.baseprod[bsIdx].trsf_bs_qty_amb = 
									Math.round(Number(trsf.baseprod[bsIdx].trsf_bs_ratio) / ratio_total * trsf.transfer.trsf_qty_amb * QTY_DECIMAL) / QTY_DECIMAL; //Ver2.7 added QTY_DECIMAL
							}
							else
							{
								// additive: 3 decimals
								trsf.baseprod[bsIdx].trsf_bs_qty_amb = 
									Math.round(Number(trsf.baseprod[bsIdx].trsf_bs_ratio) / ratio_total * trsf.transfer.trsf_qty_amb * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
							}
							trsf.baseprod[bsIdx].trsf_bs_qty_cor = null;
							trsf.baseprod[bsIdx].trsf_bs_load_kg = null;
							break;
						case PRIORITY_STD:  // Dispatch Drawer STD into Bases.
							if (tmpStr.toUpperCase() != "ADDITIVE")
							{
								// non-additive: no decimals --> 3 decimals
								trsf.baseprod[bsIdx].trsf_bs_qty_cor = 
									Math.round(Number(trsf.baseprod[bsIdx].trsf_bs_ratio) / ratio_total * trsf.transfer.trsf_qty_cor * QTY_DECIMAL) / QTY_DECIMAL; //Ver2.7 added QTY_DECIMAL
							}
							else
							{
								// additive: 3 decimals
								trsf.baseprod[bsIdx].trsf_bs_qty_cor = 
									Math.round(Number(trsf.baseprod[bsIdx].trsf_bs_ratio) / ratio_total * trsf.transfer.trsf_qty_cor * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
							}
							trsf.baseprod[bsIdx].trsf_bs_qty_amb = null;
							trsf.baseprod[bsIdx].trsf_bs_load_kg = null;
							break;
						case PRIORITY_KG:   // Dispatch Drawer KG into Bases.
							if (tmpStr.toUpperCase() != "ADDITIVE")
							{
								// non-additive: no decimals --> 3 decimals
								trsf.baseprod[bsIdx].trsf_bs_load_kg = 
									Math.round(Number(trsf.baseprod[bsIdx].trsf_bs_ratio) / ratio_total * trsf.transfer.trsf_load_kg * QTY_DECIMAL) / QTY_DECIMAL; //Ver2.7 added QTY_DECIMAL
							}
							else
							{
								// additive: 3 decimals
								trsf.baseprod[bsIdx].trsf_bs_load_kg = 
									Math.round(Number(trsf.baseprod[bsIdx].trsf_bs_ratio) / ratio_total * trsf.transfer.trsf_load_kg * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
							}
							trsf.baseprod[bsIdx].trsf_bs_qty_amb = null;
							trsf.baseprod[bsIdx].trsf_bs_qty_cor = null;
							break;
						default:
							break;
					}
				}
			}
		}
		
		
		/**
		 *  
		 *  
		 */
		public function getBasesVCFInfo(callback: Function = null):void
		{
			var call:CallResponder = new CallResponder();
			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_BASE_VCF'));});
			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
				for each (var o:Object in obj.result)
				{
					baseVCFInfo.addItem(o);
				}
				
				if (callback != null)
					callback();
				
			});
			call.token = view.manualtransactionsservice.getBasesVCFInfo();
		}
		
		/**
		 * Re-calculate all Base products and Drawer products.
		 *  
		 */
		public function adjBases(field:String = "", callback:Function = null):void
		{
			
			// test.
//			var call:CallResponder = new CallResponder();
//			call.addEventListener(FaultEvent.FAULT,function():void{global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_GET_ALL_CARR'));});
//			call.addEventListener(ResultEvent.RESULT, function(obj:ResultEvent):void{
//				var tmp:Object = new ArrayCollection();
//				for each (var o:Object in obj.result)
//				{
//					tmp.addItem(o);
//				}
//				
//				transDataClone[0].baseprod[0].trsf_bs_den=9999;
//				transDataClone[0].baseprod[0].trsf_bs_adjustable=true;
//				transDataClone[0].baseprod[0].trsf_bs_temp=1000;
//				transDataClone[0].baseprod[0].trsf_bs_prodcd="12345678900";
//				
//				if (callback != null)
//					callback();
//				
//			});
//			call.token = view.manualtransactionsservice.getAllCarriers();
			
			// Get the acc base code & acc base density for reference.
			changedAccBaseCode = dmMT.baseprodTotalDataArr[accBaseSelectedIdx].trsf_bs_prodcd;
			changedAccBaseDen  = dmMT.baseprodTotalDataArr[accBaseSelectedIdx].trsf_bs_den;
			
			//------------------------------------------------------------------------------------------//
			// 1. Go through every compartment(transfer) to find out which base prod is adjustable.     //
			//------------------------------------------------------------------------------------------//
			for (var trsfIdx:int = 0; trsfIdx < transDataClone.length; trsfIdx++)
			{
				// Only those compartments which contain the product that has changed ( ie the additive in this case) 
				// so only those compartments that are adjustable (so have more than 1 product)
				// as any adjustment can ONLY be applied to a compartment if there is more than 1 product.
				if (transDataClone[trsfIdx].baseprod != null && transDataClone[trsfIdx].baseprod.length > 1)
				{
					// Go through each base in this compartment(drawer prod).
					for (var bsIdx:int = 0; bsIdx < transDataClone[trsfIdx].baseprod.length; bsIdx++)
					{
						// If the base code matches the acc base code, mark this base as 'adjustable'.
						if (transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_prodcd == changedAccBaseCode)
						{
							adjustableBaseCount++;
							transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_adjustable = true;
							adjustableBaseAMBtotal += Number(transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb);
						}
						else
						{
							transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_adjustable = false;
						}
					}
				}
			}
			
			// If there is no adjustable base(s).
			if (adjustableBaseCount == 0)
			{
				res_code = RESULT_03;
				
				// coz adjBases has async calls, simply 'return Result' will not work properly.
				if (callback != null)
				{
					callback(field);
					return;  // return to terminate all processes followed.
				}
			}
			
			// If the adjustable base AMB total is ZERO, which could mean the Bases haven't been
			// calculated (by clicking 'Calc Drawer' button), or user entered ZERO in compartments.
			// In this circumstance, the recalculation should not be carriered out.
			// User needs to click 'Calc Drawer' button to cal Bases or double check the quantities
			// entered in compartments.
			if (adjustableBaseAMBtotal <= 0)
			{
				res_code = RESULT_02;
				
				// coz adjBases has async calls, simply 'return Result' will not work properly.
				if (callback != null)
				{
					callback(field);
					return;  // return to terminate all processes followed.
				}
			}
			
			//------------------------------------------------------------------------------------------//
			// 2. Go through every compartment(transfer) to refresh relevant base's density.            //
			//------------------------------------------------------------------------------------------//
			// Copy the current Reference Density (which may have been overwritten by the user) into
			// the Base Product details against every compartment that contains this Base Product.
			for (var trsfIdx:int = 0; trsfIdx < transDataClone.length; trsfIdx++)
			{
				// Go through each base in this compartment(drawer prod).
				for (var bsIdx:int = 0; bsIdx < transDataClone[trsfIdx].baseprod.length; bsIdx++)
				{
					// If the base code matches the acc base code, refresh this base's density to acc base density.
					if (transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_prodcd == changedAccBaseCode)
					{
						transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_den = changedAccBaseDen;
					}
					else
					{
						// nothing to do
					}
				}
			}
			
			//------------------------------------------------------------------------------------------//
			// 3. Go through every compartment(transfer) to distribute the changed acc base quantity.   //
			// 4. Adjust the Other Most Significant Base product in each compartment equal to           //
			//    the negative of the quantity adjusted in 3.                                           //
			//    This means that the adjustment that was made to the selected Base Product will cause  //
			//    an equal and opposite change to the other Base Product that has the greatest OBS      //
			//    quantity.                                                                             //
			//------------------------------------------------------------------------------------------//
			// For each compartment that is Adjustable (means that it contains more than 1 Base Product)
			// AND contains the Base Product that has changed, distribute OBS_adjust across those
			// compartments based on the proportion of the that Base product that exists in that
			// compartment compared with the total of that Base Product in adjustable compartments.
			for (var trsfIdx:int = 0; trsfIdx < transDataClone.length; trsfIdx++)
			{
				// Go through each base in this compartment(drawer prod).
				for (var bsIdx:int = 0; bsIdx < transDataClone[trsfIdx].baseprod.length; bsIdx++)
				{
					// If the base code matches the acc base code AND the base is adjustable,
					// distribute the changed acc base quantity based on the proportion of the base prod.
					if (transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_prodcd     == changedAccBaseCode
					 && transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_adjustable == true)
					{
						if (adjustableBaseAMBtotal != 0)
						{
							// Distribute the changed acc base quantity.
							transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb += OBS_adjust * transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb / adjustableBaseAMBtotal;
							
							// All OBS quantities must be positive. If negtive found, reject process.
							if (isNegative(transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb))
							{
								res_code = RESULT_01;
								
								// coz adjBases has async calls, simply 'return Result' will not work properly.
								if (callback != null)
								{
									callback(field);
									return;  // return to terminate all processes followed.
								}
							}
						}
					}
					else
					{
						// nothing to do
					}
				}
				
				// Find out the other most significant base.
				otherMostSignificantBaseCode = findTheOtherMostSignificantBase(trsfIdx);
				
				// Adjust the other most significant base quantity.[4]
				var res:int = 0;
				res = adjustTheOtherMostSignificantBase(trsfIdx);
				if (res == RESULT_01)
				{
					res_code = RESULT_01;
					
					// coz adjBases has async calls, simply 'return Result' will not work properly.
					if (callback != null)
					{
						callback(field);
						return;  // return to terminate all processes followed.
					}
				}
				
			}
			
			//------------------------------------------------------------------------------------------//
			// 5. Recalculate the STD and Mass quantities for each Base Product in all compartments     //
			//    based on new OBS quantities and Reference Densities.                                  //
			//------------------------------------------------------------------------------------------//
			// Go through every compartment(transfer) to numerate all base indexes and total count.
//			for (var trsfIdx:int = 0; trsfIdx < transDataClone.length; trsfIdx++)
//			{
//				// Go through each base in this compartment(drawer prod).
//				for (var bsIdx:int = 0; bsIdx < transDataClone[trsfIdx].baseprod.length; bsIdx++)
//				{
//					var oTmp:Object = new Object;
//					
//					transDataBsTotalCnt++;
//					oTmp.trsfIdx = trsfIdx;
//					oTmp.bsIdx   = bsIdx;
//					transDataBsIndex.addItem(oTmp);
//				}
//			}
			numBaseIndex();
			
			// Get Bases VCF factors.
			getBasesVCFInfo(function():void{
				
				var bsIndex:int = 1;
				//calBaseByAMB(bsIndex, function():void{
				calBaseBySiganificantQty(bsIndex, PRIORITY_AMB, function():void{
					
					// NOTE: Processes below is callback.
					
					//------------------------------------------------------------------------------------------//
					// 6. Recalculate all the STD and Mass quantities for each Compartment                      //
					//    by summing the Base Products in the compartment.                                      //
					//    Note OBS will not change.                                                             //
					// 7. Recalculate the Mass weighted average Density for each compartment.                   //
					//------------------------------------------------------------------------------------------//
					// Go through every compartment(transfer) to sum its bases quantities(COR and KG).
					for (var trsfIdx:int = 0; trsfIdx < transDataClone.length; trsfIdx++)
					{
						var bs_cor_tot:Number = 0;
						var bs_kg_tot: Number = 0;
						
						// Go through each base in this compartment(drawer prod).
						for (var bsIdx:int = 0; bsIdx < transDataClone[trsfIdx].baseprod.length; bsIdx++)
						{
							bs_cor_tot += transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_cor;
							bs_kg_tot  += transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_load_kg;
						}
						
						// If this compartment(transfer) has no bases or the base total cor is zero, skip the density update.
						if ((transDataClone[trsfIdx].baseprod != null && transDataClone[trsfIdx].baseprod.length == 0)
							|| bs_cor_tot == 0)
						{
							continue;
						}
						
						// Update the cor and kg in this compartment(transfer) with its bases totals.[6]
						transDataClone[trsfIdx].transfer.trsf_qty_cor = Math.round(bs_cor_tot * QTY_DECIMAL) / QTY_DECIMAL;
						transDataClone[trsfIdx].transfer.trsf_load_kg = Math.round(bs_kg_tot * QTY_DECIMAL) / QTY_DECIMAL;  // NOTE: the KG here is KGair
						
						// Update the drawer density in this compartment(transfer).[7]
						// NOTE: the density here is DENvac
						//                                |- KGair                     -|          |- drawer prod new KGair        -|
						// drawer prod new density(vac) = |------- + AIR_BUOYANCY_FACTOR| * 1000 = |----------------------- + 0.0011| * 1000
						//                                |- L15                       -|          |-  drawer prod new STD         -|
						// NOTE: AIR_BUOYANCY_FACTOR should be read from SITE_CONFIG.
						transDataClone[trsfIdx].transfer.trsf_density = Math.round((transDataClone[trsfIdx].transfer.trsf_load_kg/transDataClone[trsfIdx].transfer.trsf_qty_cor + vcf) * 1000 * DENSITY_DECIMAL) / DENSITY_DECIMAL;
					}
					
					//------------------------------------------------------------------------------------------//
					// 8. Recalculate Accumulated Base Product Details by summing the Values for                //
					//    OBS, STD & Mass in the Base Product compartment details.                              //
					//------------------------------------------------------------------------------------------//
					calBaseTotals();
					
					// If the adjustment cal can go here, that means it succeeded.
					res_code = RESULT_OK;
					
					if (callback != null)
					{
						callback(field);
					}
				});
			});  // end of getBasesVCFInfo
			
			// check process flow.
			return;
		}
		
		/**
		 * Numerate all base indexes and total count.(in all compartments)
		 * Only numerate those valid bases, which has all compulsory fileds - code,density,temp and one of Obs/Std/Mass for calculation.
		 *  
		 */
		private function numBaseIndex():void
		{
			// Go through every compartment(transfer) to numerate all base indexes and total count.
			// And mark the flag - trsf_bs_sufficent_field of each Bases. If all compulsory fileds to calculate a Base
			// have values, trsf_bs_sufficent_field will be marked as 'true'.
			// This flag must be checked in the later calculation of Bases.  
			for (var trsfIdx:int = 0; trsfIdx < transDataClone.length; trsfIdx++)
			{
				// Go through each base in this compartment(drawer prod).
				for (var bsIdx:int = 0; bsIdx < transDataClone[trsfIdx].baseprod.length; bsIdx++)
				{
					var oTmp:Object = new Object;
					
					if (
						 transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_prodcd != ""
					 && (transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_den != null && transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_den != "")
					 && (transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_temp != null && transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_temp != "")
					 && (
						   (transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb != null && transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb != "")
						|| (transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_cor != null && transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_cor != "")
						|| (transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_load_kg != null && transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_load_kg != "")
						)
					) // Ver3.1 added. Only numerate those valid bases, which has all compulsory fileds - base code,density,temp and one of Obs/Std/Mass for calculation.
					  // Since the Acc Base tab is designed to show all VALID compartment(s) totals.
					{
						transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_sufficent_field = true;
						transDataBsTotalCnt++;
						oTmp.trsfIdx = trsfIdx;
						oTmp.bsIdx   = bsIdx;
						transDataBsIndex.addItem(oTmp);
					}
					else
					{
						transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_sufficent_field = false;
					}
				}
			}
		}
		
		/**
		 * Find the other most significant base code in a compartment(transfer).
		 * (excluding user changed base)
		 *  
		 */
		private function findTheOtherMostSignificantBase(trsfIdx:int):String
		{
			if (trsfIdx < 0 || trsfIdx >= transDataClone.length)
				return "";
			
			var maxBsRatio:int   = 0;
			var maxBsCode:String = "";
			
			// Go through each base in this compartment(drawer prod).
			for (var bsIdx:int = 0; bsIdx < transDataClone[trsfIdx].baseprod.length; bsIdx++)
			{
				// The other most significant base is excluding user changed base code. 
				if (transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_prodcd != changedAccBaseCode && Number(transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_ratio) > maxBsRatio)
				{
					maxBsRatio = Number(transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_ratio);
					maxBsCode  = transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_prodcd;
				}
			}
			
			return maxBsCode;
		}
		
		/**
		 * Adjust the other most significant base AMB in a compartment(transfer).
		 * (excluding user changed base)
		 *  
		 */
		private function adjustTheOtherMostSignificantBase(trsfIdx:int):int
		{
			if (otherMostSignificantBaseCode == "" || trsfIdx < 0 || trsfIdx >= transDataClone.length)
				return RESULT_N1;;
			
			var maxBsRatio:       int    = 0;
			var maxBsCode:        String = "";
			var adjustedBaseTotal:Number = 0;
			var otherBasesTotal:  Number = 0; // The total excluding the other most significant Base. 
			
			// Go through each base in this compartment(drawer prod) to cal the total of adjustable base qty.
			for (var bsIdx:int = 0; bsIdx < transDataClone[trsfIdx].baseprod.length; bsIdx++)
			{
				if (transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_prodcd     == changedAccBaseCode // <-- NOTE here. It is the user changed acc base code.
				 && transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_adjustable == true)
				{
					adjustedBaseTotal += Number(transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb);
				}
			}
			
			// Go through each base in this compartment(drawer prod) to cal the other base(s) qty.(excluding the other most significant Base)
			for (var bsIdx:int = 0; bsIdx < transDataClone[trsfIdx].baseprod.length; bsIdx++)
			{
				if (transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_prodcd == changedAccBaseCode            // <-- NOTE here. It is the user changed acc base code.
				||  transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_prodcd == otherMostSignificantBaseCode) // <-- NOTE here. It is the other most significant base code.
				{
					continue; // Not the target we want, so move to next.
				}
				else
				{
					otherBasesTotal += Number(transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb);
				}
			}
			
			// Go through each base in this compartment(drawer prod) to adjust the other most significant base AMB.
			for (var bsIdx:int = 0; bsIdx < transDataClone[trsfIdx].baseprod.length; bsIdx++)
			{
				if (transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_prodcd == otherMostSignificantBaseCode)
				{
					//---------------------------------------------------------------------------------------------------------------------------------//
					// the other most significant base AMB = that drawer prod AMB(in this compartment(transfer)) - otherBasesTotal - adjustedBaseTotal //
					//---------------------------------------------------------------------------------------------------------------------------------//
					transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb = transDataClone[trsfIdx].transfer.trsf_qty_amb - otherBasesTotal - adjustedBaseTotal;
					
					// All OBS quantities must be positive. If negative found, reject process.
					if (isNegative(transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb))
					{
						return RESULT_01;
					}
					// As we only need to adjust the other most significant base, it is just one base product.
					break;
				}
			}
			
			return RESULT_OK;
		}
		
//		/**
//		 * Call CGI to cal Base product quantities.
//		 *  
//		 */
//		private function calBaseByAMB(bsIndex:int, callback:Function = null):void
//		{
//			var pri:int = 1;
//			
//			if (bsIndex <= transDataBsTotalCnt)
//			{
//				var trsfIdx:    int    = transDataBsIndex[bsIndex-1].trsfIdx;
//				var bsIdx:      int    = transDataBsIndex[bsIndex-1].bsIdx;
//				var bs_prod_cd: String = transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_prodcd;
//				var bs_prod_cls:String = transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_prodcls;
//				var bs_amb:     Number = transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb;
//				var bs_temp:    Number = transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_temp;
//				var bs_den:     Number = transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_den;
//				
//				var type:String   = "LT";
//				var value:Number  = bs_amb;
//				var urlStr:String = "/phpwrapper/calcvcf.php?frm_baseCd="+ Number(bs_prod_cd) +"&";
//				urlStr += "frm_which_type=" + type + "&";
//				urlStr += "frm_real_amount=" + value + "&";
//				urlStr += "frm_real_temp=" + Number(bs_temp) + "&";
//				urlStr += "frm_real_dens=" + Number(bs_den);
//				
//				var viewService:HTTPService = new HTTPService();
//				viewService.url = urlStr;
//				viewService.resultFormat="object";
//				viewService.method="POST";
//				viewService.addEventListener(FaultEvent.FAULT,function onCalFault(event:FaultEvent):void
//				{
//					global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_CALC_BASE_QTY'));
//				});
//				viewService.addEventListener(ResultEvent.RESULT,function onCalResult(event:ResultEvent):void
//				{
//					var res:Object = new Object;// = event.result as Object; Somehow Flex complier doesn't like it anymore?
//					res = event.result as Object;
//					var oTmp:Object = transDataClone[trsfIdx].baseprod[bsIdx];
//					
//					if (res.OMEGA_XML)
//					{
//						if (bs_prod_cls.toUpperCase() != "ADDITIVE")
//						{
//							// non-additive: still needs 3 decimals?
//							oTmp.trsf_bs_qty_amb = Math.round(Number(res.OMEGA_XML.REAL_LITRE) * QTY_DECIMAL) / QTY_DECIMAL;
//							oTmp.trsf_bs_qty_cor = Math.round(Number(res.OMEGA_XML.REAL_LITRE15) * QTY_DECIMAL) / QTY_DECIMAL;
//							oTmp.trsf_bs_load_kg = Math.round(Number(res.OMEGA_XML.REAL_KG) * QTY_DECIMAL) / QTY_DECIMAL;
//						}
//						else
//						{
//							// additive: 3 decimals
//							oTmp.trsf_bs_qty_amb = Math.round(Number(res.OMEGA_XML.REAL_LITRE) * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
//							oTmp.trsf_bs_qty_cor = Math.round(Number(res.OMEGA_XML.REAL_LITRE15) * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
//							oTmp.trsf_bs_load_kg = Math.round(Number(res.OMEGA_XML.REAL_KG) * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
//						}
//					}
//					
//					bsIndex++;
//					calBaseByAMB(bsIndex, callback);
//				});
//				viewService.send();
//			}
//			else
//			{
//				if (callback != null)
//					callback();
//			}
//			
//		}
		
		/**
		 * Call CGI to cal Base product quantities by significant qantity.
		 *  
		 */
		private function calBaseBySiganificantQty(bsIndex:int, fixPriority:int = PRIORITY_AUTO, callback:Function = null):void
		{
			var priority: int;
			
			if (bsIndex <= transDataBsTotalCnt)
			{
				var trsfIdx: int = transDataBsIndex[bsIndex-1].trsfIdx;
				var bsIdx:   int = transDataBsIndex[bsIndex-1].bsIdx;
				
				// Transfer and Base data validaity check.
				var res: int;
				res = preCheck_CalQty(trsfIdx);
				if (res != 0)
				{
					// Move to next Base.
					bsIndex++;
					calBaseBySiganificantQty(bsIndex, fixPriority, callback);
					return;
				}
				
				// Data range check.
				// If not all data range valid, this Base cannot be calculated by CGI.
				// Contiune to process the next compartment.
//				if (
//					....
//				)
//				{
//					// Move to next compartent.
//					bsIndex++;
//					calBaseBySiganificantQty(bsIndex, fixPriority, callback);
//					return;
//				}
				
				var bs_prod_cd: String = transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_prodcd;
				var bs_prod_cls:String = transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_prodcls;
				var bs_tk_cd:   String = transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_tk_cd;
				var bs_amb:     Number = transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb;
				var bs_std:     Number = transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_cor;
				var bs_kg :     Number = transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_load_kg;
				var bs_temp:    Number = transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_temp;
				var bs_den:     Number = transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_den;
				
				// Get the most siganificant qty which needs to be passed to CGI.
				if (fixPriority != PRIORITY_AUTO)
					priority = fixPriority;
				else
					priority = getPriorityQty(trsfIdx);

				var type :String = "";
				var value:Number = 0;
				switch(priority){
					case PRIORITY_NONE:
						bsIndex++;
						calBaseBySiganificantQty(bsIndex, fixPriority, callback);
						return;
					case PRIORITY_AMB:
						type = "LT";
						value = bs_amb;
						break;
					case PRIORITY_STD:
						type = "L15";
						value = bs_std;
						break;
					case PRIORITY_KG:
						type = "KG";
						value = bs_kg;
						break;
					default:
						bsIndex++;
						calBaseBySiganificantQty(bsIndex, fixPriority, callback);
						return;
				}
				
				// Prepare vcf values.
				var vcf:  Number = 0;
				if (bs_prod_cls.toUpperCase() != "ADDITIVE")  // For non-additives, VCF is set to 0.00
				{
					vcf = 0.00;
				}
				else  // For additives
				{
					var temp:String;
					temp = getVCF(bs_prod_cd, bs_tk_cd);
					if (temp == null)
					{
						// If there is no VCF set in TANKS table, set VCF to 0.00.
						vcf = 0.00;
					}
					else
					{
						// If VCF is set in TANKS table, set VCF to the corresponding value.
						vcf = Number(temp);
					}
				}
				
				var urlStr:String = "/phpwrapper/calcvcf.php?frm_baseCd="+ Number(bs_prod_cd) +"&";
				urlStr += "frm_which_type=" + type + "&";
				urlStr += "frm_real_amount=" + value + "&";
				urlStr += "frm_real_temp=" + Number(bs_temp) + "&";
				urlStr += "frm_real_dens=" + Number(bs_den) + "&";
				urlStr += "base_prod_c_of_e=" + Number(vcf);
				
				var viewService:HTTPService = new HTTPService();
				viewService.url = urlStr;
				viewService.resultFormat="object";
				viewService.method="POST";
				viewService.addEventListener(FaultEvent.FAULT,function onCalFault(event:FaultEvent):void
				{
					global.msgFail(mx.resources.ResourceManager.getInstance().getString('default','MTRAN.MESSAGE.FAIL_CALC_BASE_QTY'));
				});
				viewService.addEventListener(ResultEvent.RESULT,function onCalResult(event:ResultEvent):void
				{
					var res:Object = new Object;// = event.result as Object; Somehow Flex complier doesn't like it anymore?
					res = event.result as Object;
					var oTmp:Object = transDataClone[trsfIdx].baseprod[bsIdx];
					
					if (res.OMEGA_XML)
					{
						if (bs_prod_cls.toUpperCase() != "ADDITIVE")
						{
							// non-additive: still needs 3 decimals?
							oTmp.trsf_bs_qty_amb = Math.round(Number(res.OMEGA_XML.REAL_LITRE) * QTY_DECIMAL) / QTY_DECIMAL;
							oTmp.trsf_bs_qty_cor = Math.round(Number(res.OMEGA_XML.REAL_LITRE15) * QTY_DECIMAL) / QTY_DECIMAL;
							oTmp.trsf_bs_load_kg = Math.round(Number(res.OMEGA_XML.REAL_KG) * QTY_DECIMAL) / QTY_DECIMAL;
						}
						else
						{
							// additive: 3 decimals
							oTmp.trsf_bs_qty_amb = Math.round(Number(res.OMEGA_XML.REAL_LITRE) * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
							oTmp.trsf_bs_qty_cor = Math.round(Number(res.OMEGA_XML.REAL_LITRE15) * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
							oTmp.trsf_bs_load_kg = Math.round(Number(res.OMEGA_XML.REAL_KG) * ADDITIVE_DECIMAL) / ADDITIVE_DECIMAL;
						}
					}
					
					// Prepare the message resource. Put its compartment no in msg.
					var found: Boolean = false;
					for each (var o: Object in succeedTransInfo)
					{
						if (o.cmpt_no == transDataClone[trsfIdx].transfer.trsf_cmpt_no)
						{
							found = true;
							break;
						}
					}
					if (!found)
					{
						succeedTransInfo.addItem({cmpt_no:transDataClone[trsfIdx].transfer.trsf_cmpt_no});
					}
					
					// Increase the base index and process the next base.
					bsIndex++;
					calBaseBySiganificantQty(bsIndex, fixPriority, callback);
				});
				viewService.send();
			}
			else
			{
				if (callback != null)
					callback();
			}
			
		}
		
		/**
		 *  
		 * 
		 */
		public function getVCF(bsCode:String, tkCode:String):String
		{
			var ret: String = null;
			if (baseVCFInfo != null)
			{
				for (var idx: int = 0; idx < baseVCFInfo.length; idx++)
				{
					if (baseVCFInfo[idx].TANK_BASE == bsCode && baseVCFInfo[idx].TANK_CODE == tkCode)
					{
						ret = baseVCFInfo[idx].TANK_PROD_C_OF_E;
						break;
					}
				}
			}
			
			return ret;
		}
		
		/**
		 * Refresh the base prod temp in base array according to drawer product.
		 * 
		 */
		public function refreshBaseTemp():int
		{
			// Transfer data range check. 
			// Need to add later or check it in the caller.
			for (var trsfIdx:int = 0; trsfIdx < transDataClone.length; trsfIdx++)
			{
//				if (dataRangeCheck('TRSF_TEMP', Number(dmMT.transactionDataArr[trsfIdx].transfer.trsf_temp)) != 0)
//				{
//					trace("Some transfer data are out of range.");
//					return RESULT_04;
//				}
			}
			
			// Refresh base temp accoring to drawer prod temp.
			for (var trsfIdx:int = 0; trsfIdx < transDataClone.length; trsfIdx++)
			{
				for (var bsIdx:int = 0; bsIdx < transDataClone[trsfIdx].baseprod.length; bsIdx++)
				{
					if (transDataClone[trsfIdx].transfer.trsf_temp != null)  // Only set the Base temp when the Drawer temp is set.
						transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_temp = String(Math.round(Number(transDataClone[trsfIdx].transfer.trsf_temp) * TEMP_DECIMAL) / TEMP_DECIMAL);
				}
			}
			
			return 0;
		}
		
		/**
		 *  
		 *  
		 */
		public function preCheck_CalQty(trsfIdx:int = -1):int
		{
			var ret:int      = 0;
			var trans:Object = transDataClone.getItemAt(trsfIdx);
			
			// Check the drawer product data.
			if (!trans.transfer.trsf_qty_amb && !trans.transfer.trsf_qty_cor && !trans.transfer.trsf_load_kg
			 || !trans.transfer.trsf_temp
			 || !trans.transfer.trsf_density
			 || (trans.transfer.trsf_density && !trans.transfer.trsf_arm_cd) 
				// Ver2.0 Added. When startup MT screen from REPOST(or other screens?),
				// the arm code could be null, in this case, the density is NOT acceptable.
				// NOTE: Regarding the Arm Code check,
				//       maybe add some check here to distinguish NORAML/REPOST/other cases...
				//       which depends on what the requirement is...
			)
			{
				ret = 1;
				return ret;
			}
			
			// Check the base products data.
			for (var bsIdx:int = 0; bsIdx < trans.baseprod.length; bsIdx++)
			{
//				if (!trans.baseprod[bsIdx].trsf_bs_den
//				|| (trans.baseprod[bsIdx].trsf_bs_den && trans.baseprod[bsIdx].trsf_bs_den == 0)
//				|| !trans.baseprod[bsIdx].trsf_bs_temp
//				)
				if (trans.baseprod[bsIdx].trsf_bs_sufficent_field == false) // Ver3.1 added. Not enough data provided to cal a Base.
				{
					ret = 1;
					break;
				}
			}
			
			return ret;
		}
		
		/**
		 * Get the QTY which should be as the input for CGI call.
		 * 
		 */
		public function getPriorityQty(trsfIdx:int):int
		{
			var ret:int; // 0: no need cal  1:obs  2:cor  3:kg
			var oTmp:Object;
			
			oTmp = transDataClone[trsfIdx].transfer;
			
//			// Priority is KG > AMB > COR
//			/*
//			if (oTmp.trsf_load_kg!=null)return 3;
//			if (oTmp.trsf_qty_amb!=null)return 2;
//			if (oTmp.trsf_qty_cor!=null)return 1;
//			return 0;
//			*/
//			
//			if (oTmp.trsf_qty_amb == null
//				&& oTmp.trsf_qty_cor == null
//				&& oTmp.trsf_load_kg == null)
//			{
//				ret = PRIORITY_NONE;
//			}
//			else if (oTmp.trsf_qty_amb == null
//				&& oTmp.trsf_qty_cor != null
//				&& oTmp.trsf_load_kg != null)
//			{
//				ret = PRIORITY_KG;
//			}
//			else if (oTmp.trsf_qty_amb != null
//				&& oTmp.trsf_qty_cor == null
//				&& oTmp.trsf_load_kg != null)
//			{
//				ret = PRIORITY_KG;
//			}
//			else if (oTmp.trsf_qty_amb != null
//				&& oTmp.trsf_qty_cor != null
//				&& oTmp.trsf_load_kg == null)
//			{
//				ret = PRIORITY_AMB;
//			}
//			else if (oTmp.trsf_qty_amb != null
//				&& oTmp.trsf_qty_cor == null
//				&& oTmp.trsf_load_kg == null)
//			{
//				ret = PRIORITY_AMB;
//			}
//			else if (oTmp.trsf_qty_amb == null
//				&& oTmp.trsf_qty_cor != null
//				&& oTmp.trsf_load_kg == null)
//			{
//				ret = PRIORITY_STD;
//			}
//			else if (oTmp.trsf_qty_amb == null
//				&& oTmp.trsf_qty_cor == null
//				&& oTmp.trsf_load_kg != null)
//			{
//				ret = PRIORITY_KG;
//			}
//			else  // all != null
//			{
//				ret = PRIORITY_KG;
//			}
			
			// Priority is AMB > KG > COR
			/*
			if (oTmp.trsf_qty_amb!=null)return 1;
			if (oTmp.trsf_load_kg!=null)return 3;
			if (oTmp.trsf_qty_cor!=null)return 2;
			return 0;
			*/
			
			if (oTmp.trsf_qty_amb == null
				&& oTmp.trsf_qty_cor == null
				&& oTmp.trsf_load_kg == null)
			{
				ret = PRIORITY_NONE;
			}
			else if (oTmp.trsf_qty_amb == null
				&& oTmp.trsf_qty_cor != null
				&& oTmp.trsf_load_kg != null)
			{
				ret = PRIORITY_KG;
			}
			else if (oTmp.trsf_qty_amb != null
				&& oTmp.trsf_qty_cor == null
				&& oTmp.trsf_load_kg != null)
			{
				ret = PRIORITY_AMB;
			}
			else if (oTmp.trsf_qty_amb != null
				&& oTmp.trsf_qty_cor != null
				&& oTmp.trsf_load_kg == null)
			{
				ret = PRIORITY_AMB;
			}
			else if (oTmp.trsf_qty_amb != null
				&& oTmp.trsf_qty_cor == null
				&& oTmp.trsf_load_kg == null)
			{
				ret = PRIORITY_AMB;
			}
			else if (oTmp.trsf_qty_amb == null
				&& oTmp.trsf_qty_cor != null
				&& oTmp.trsf_load_kg == null)
			{
				ret = PRIORITY_STD;
			}
			else if (oTmp.trsf_qty_amb == null
				&& oTmp.trsf_qty_cor == null
				&& oTmp.trsf_load_kg != null)
			{
				ret = PRIORITY_KG;
			}
			else  // all != null
			{
				ret = PRIORITY_AMB;
			}
			
			return ret;
		}
		
		/**
		 * Calculate other quantities in a compartment(transfer).
		 *  
		 */
		private function calOtherQty():void
		{
			var priority:int;
		
			// Go through every compartment(transfer) to sum its other bases quantities.
			for (var trsfIdx:int = 0; trsfIdx < transDataClone.length; trsfIdx++)
			{
				var bs_amb_tot:          Number = 0;
				var bs_cor_tot:          Number = 0;
				var bs_kg_tot:           Number = 0;
				var atLeastOneBaseValid: Boolean;   // Indicate the if the Base has all compulsory fields for calculation.
				
				// Get the most siganificant qty.
				priority = getPriorityQty(trsfIdx);
				
				// Go through each base in this compartment(drawer prod).
				atLeastOneBaseValid = false;
				for (var bsIdx:int = 0; bsIdx < transDataClone[trsfIdx].baseprod.length; bsIdx++)
				{
					if (transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_sufficent_field == true)  // Ver3.1 added. 
																								  // Only cal those valid bases, which has all compulsory fileds - base code,density,temp and one of Obs/Std/Mass for calculation.
																								  // Since the Acc Base tab is designed to show all VALID compartment(s) totals.
					{
						switch(priority)
						{
							case PRIORITY_NONE:
								break;
							case PRIORITY_AMB:  // Sum STD & KG in Bases.
								bs_cor_tot += transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_cor;
								bs_kg_tot  += transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_load_kg;
								break;
							case PRIORITY_STD:  // Sum AMB & KG in Bases.
								bs_amb_tot += transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb;
								bs_kg_tot  += transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_load_kg;
								break;
							case PRIORITY_KG:  // Sum AMB & STD in Bases.
								bs_amb_tot += transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb;
								bs_cor_tot += transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_cor;
								break;
							default:
								break;
						}
						atLeastOneBaseValid = true;
					}
				}
				
				if (atLeastOneBaseValid == true)  // Ver3.1 added.
												  // Only when valid Base(s) summarized, then refresh the compartment data.
												  // Otherwise do not touch(update) compartment data,
												  // the quantities in compartment could be NULL, you could update NULL to 0, which is incorrect.
				{
					switch(priority)
					{
						case PRIORITY_NONE:
							break;
						case PRIORITY_AMB:  // Set STD & KG in Drawer.
							// Update the cor and kg in this compartment(transfer) with its bases totals.
							transDataClone[trsfIdx].transfer.trsf_qty_cor = Math.round(bs_cor_tot * QTY_DECIMAL) / QTY_DECIMAL;
							transDataClone[trsfIdx].transfer.trsf_load_kg = Math.round(bs_kg_tot * QTY_DECIMAL) / QTY_DECIMAL;  // NOTE: the KG here is KGair
							break;
						case PRIORITY_STD:  // Set AMB & KG in Drawer.
							// Update the amb and kg in this compartment(transfer) with its bases totals.
							transDataClone[trsfIdx].transfer.trsf_qty_amb = Math.round(bs_amb_tot * QTY_DECIMAL) / QTY_DECIMAL;
							transDataClone[trsfIdx].transfer.trsf_load_kg = Math.round(bs_kg_tot * QTY_DECIMAL) / QTY_DECIMAL;  // NOTE: the KG here is KGair
							break;
						case PRIORITY_KG:  // Set AMB & STD in Drawer.
							// Update the amb and cor in this compartment(transfer) with its bases totals.
							transDataClone[trsfIdx].transfer.trsf_qty_amb = Math.round(bs_amb_tot * QTY_DECIMAL) / QTY_DECIMAL;
							transDataClone[trsfIdx].transfer.trsf_qty_cor = Math.round(bs_cor_tot * QTY_DECIMAL) / QTY_DECIMAL;
							break;
						default:
							break;
					}
				}
			}
		}
		
		/**
		 * Calculate the Bases totals.
		 *  
		 */
		private function calBaseTotals():void
		{
			// Go through every base to sum its quantities in all transfers.
			var bs_amb_tot:  Number;
			var bs_cor_tot:  Number;
			var bs_kg_tot:   Number;
			var matchBsFound:Boolean;
			for (var bsTotIdx:int = 0; bsTotIdx < bsTotalDataClone.length; bsTotIdx++)
			{
				bs_amb_tot   = 0;
				bs_cor_tot   = 0;
				bs_kg_tot    = 0;
				matchBsFound = false;
				
				// Go through every compartment(transfer) to find out the matching bases.
				for (var trsfIdx:int = 0; trsfIdx < transDataClone.length; trsfIdx++)
				{
					// Go through each base in this compartment(drawer prod).
					for (var bsIdx:int = 0; bsIdx < transDataClone[trsfIdx].baseprod.length; bsIdx++)
					{
						if (bsTotalDataClone[bsTotIdx].trsf_bs_prodcd == transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_prodcd
						 && transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_sufficent_field == true  // Ver3.1 added. 
						 																			 // Only sum those valid Bases in ths compartment,
						 																			 // which means Base Total tab only shows the summary of valid comparment(s).
						)
						{
							matchBsFound = true;
							bs_amb_tot += transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_amb;
							bs_cor_tot += transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_qty_cor;
							bs_kg_tot  += transDataClone[trsfIdx].baseprod[bsIdx].trsf_bs_load_kg;
						}
					}
				}
				
				// If this acc base qty has been changed above, update its quantities.
				if (matchBsFound == true)
				{
					bsTotalDataClone[bsTotIdx].trsf_bs_qty_amb = Math.round(bs_amb_tot * QTY_DECIMAL) / QTY_DECIMAL;
					bsTotalDataClone[bsTotIdx].trsf_bs_qty_cor = Math.round(bs_cor_tot * QTY_DECIMAL) / QTY_DECIMAL;
					bsTotalDataClone[bsTotIdx].trsf_bs_load_kg = Math.round(bs_kg_tot * QTY_DECIMAL) / QTY_DECIMAL;
				}
			}
		}
		
		/**
		 * Check if a number is negative.
		 *  
		 */
		private function isNegative(val:Number):Boolean
		{
			if (Number(val) < 0)
				return true;
			else
				return false;
		}

	}
}