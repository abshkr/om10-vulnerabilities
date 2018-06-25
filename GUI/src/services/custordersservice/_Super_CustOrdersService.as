/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this service wrapper you may modify the generated sub-class of this class - CustOrdersService.as.
 */
package services.custordersservice
{
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.services.wrapper.RemoteObjectServiceWrapper;
import com.adobe.fiber.valueobjects.IValueObject;
import com.adobe.serializers.utility.TypeUtility;
import mx.collections.ListCollectionView;
import mx.data.DataManager;
import mx.data.IManaged;
import mx.data.ManagedAssociation;
import mx.data.ManagedOperation;
import mx.data.ManagedQuery;
import mx.data.RPCDataManager;
import mx.data.errors.DataServiceError;
import mx.rpc.AbstractOperation;
import mx.rpc.AsyncToken;
import mx.rpc.remoting.Operation;
import mx.rpc.remoting.RemoteObject;
import valueObjects.GUI_ORDERS;
import valueObjects.GUI_ORDER_ITEMS;
import valueObjects.GUI_ORDER_PERIODS;
import valueObjects.OrderCmpyLookup;
import valueObjects.OrderDelvLocLookup;
import valueObjects.OrderErpTypeLookup;
import valueObjects.OrderItemScheduleLookup;
import valueObjects.OrderMethodTypeLookup;
import valueObjects.OrderPriceTypeLookup;
import valueObjects.OrderProductLookup;
import valueObjects.OrderSaleTypeLookup;
import valueObjects.OrderScheduleLookup;
import valueObjects.OrderStatusTypeLookup;
import valueObjects.OrderTerminalLookup;
import valueObjects.OrderTripLookup;
import valueObjects.OrderTrnsptTypeLookup;
import valueObjects.OrderUnitLookup;

import mx.collections.ItemResponder;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;

[ExcludeClass]
internal class _Super_CustOrdersService extends com.adobe.fiber.services.wrapper.RemoteObjectServiceWrapper
{
    private var _gUI_ORDERSRPCDataManager : mx.data.RPCDataManager;
    private var managersArray : Array = new Array();

    public const DATA_MANAGER_GUI_ORDERS : String = "GUI_ORDERS";

    public function getDataManager(dataManagerName:String) : mx.data.RPCDataManager
    {
        switch (dataManagerName)
        {
             case (DATA_MANAGER_GUI_ORDERS):
                return _gUI_ORDERSRPCDataManager;
            default:
                return null;
        }
    }

    /**
     * Commit all of the pending changes for this DataService, as well as all of the pending changes of all DataServices
     * sharing the same DataStore.  By default, a DataService shares the same DataStore with other DataServices if they have 
     * managed association properties and share the same set of channels. 
     *
     * @see mx.data.DataManager
     * @see mx.data.DataStore
     *
     * @param itemsOrCollections:Array This is an optional parameter which defaults to null when
     *  you want to commit all pending changes.  If you want to commit a subset of the pending
     *  changes use this argument to specify a list of managed ListCollectionView instances
     *  and/or managed items.  ListCollectionView objects are most typically ArrayCollections
     *  you have provided to your fill method.  The items appropriate for this method are
     *  any managed version of the item.  These are any items you retrieve from getItem, createItem
     *  or using the getItemAt method from a managed collection.  Only changes for the
     *  items defined by any of the values in this array will be committed.
     *
     * @param cascadeCommit if true, also commit changes made to any associated
     *  items supplied in this list.
     *
     *  @return AsyncToken that is returned in <code>call</code> property of
     *  either the <code>ResultEvent.RESULT</code> or in the
     *  <code>FaultEvent.FAULT</code>.
     *  Custom data can be attached to this object and inspected later
     *  during the event handling phase.  If no changes have been made
     *  to the relevant items, null is returned instead of an AsyncToken.
     */
    public function commit(itemsOrCollections:Array=null, cascadeCommit:Boolean=false):mx.rpc.AsyncToken
    {
        return _gUI_ORDERSRPCDataManager.dataStore.commit(itemsOrCollections, cascadeCommit);
    }

    /**
     * Reverts all pending (uncommitted) changes for this DataService, as well as all of the pending changes of all DataServics
     * sharing the same DataStore.  By default, a DataService shares the same DataStore with other DataServices if they have 
     * managed association properties and share the same set of channels. 
     *
     * In case you specify a value for itemsOrCollections:Array parameter, only pending (uncommitted) changes for the specified 
     * managed items or collections will be reverted.
     *
     * @see mx.data.DataManager
     * @see mx.data.DataStore
     * 
     * @param itemsOrCollections:Array This is an optional parameter which defaults to null 
     * when you want to revert all pending (uncommitted) changes for all DataServices
     * managed by this DataStore. If you want to revert a subset of the pending changes use 
     * this argument to specify a array of managed items or collections
     *
     * @return true if any changes were reverted.
     * @throws DataServiceError if the passed in array contains non-managed items or collections
     *  
     */
    public function revertChanges(itemsOrCollections:Array=null):Boolean
    {
        if (itemsOrCollections == null)
        {
            // Revert all changes
            return _gUI_ORDERSRPCDataManager.dataStore.revertChanges();
        }
        else
        {
            // Revert passed in items
            var anyChangeItemReverted:Boolean = false;

            // Iterate over array and revert managed item or collection as the case may be
            for each (var changeItem:Object in itemsOrCollections)
            {
                if (changeItem is com.adobe.fiber.valueobjects.IValueObject)
                {
                    var dataMgr:mx.data.DataManager = getDataManager(changeItem._model.getEntityName());
                    anyChangeItemReverted ||= dataMgr.revertChanges(mx.data.IManaged(changeItem))
                }
                else if (changeItem is mx.collections.ListCollectionView)
                {
                    anyChangeItemReverted ||= _gUI_ORDERSRPCDataManager.dataStore.revertChangesForCollection(mx.collections.ListCollectionView(changeItem));
                }
                else
                {
                    throw new mx.data.errors.DataServiceError("revertChanges called on array that contains non-managed items or collections");
                }
            }
            return anyChangeItemReverted;
        }
    }

    // Constructor
    public function _Super_CustOrdersService()
    {
        // initialize service control
        _serviceControl = new mx.rpc.remoting.RemoteObject();

        // initialize RemoteClass alias for all entities returned by functions of this service
        valueObjects.GUI_ORDER_ITEMS._initRemoteClassAlias();
        valueObjects.OrderItemScheduleLookup._initRemoteClassAlias();
        valueObjects.GUI_ORDER_PERIODS._initRemoteClassAlias();
        valueObjects.OrderScheduleLookup._initRemoteClassAlias();
        valueObjects.GUI_ORDERS._initRemoteClassAlias();
        valueObjects.OrderCmpyLookup._initRemoteClassAlias();
        valueObjects.OrderDelvLocLookup._initRemoteClassAlias();
        valueObjects.OrderErpTypeLookup._initRemoteClassAlias();
        valueObjects.OrderMethodTypeLookup._initRemoteClassAlias();
        valueObjects.OrderPriceTypeLookup._initRemoteClassAlias();
        valueObjects.OrderProductLookup._initRemoteClassAlias();
        valueObjects.OrderSaleTypeLookup._initRemoteClassAlias();
        valueObjects.OrderStatusTypeLookup._initRemoteClassAlias();
        valueObjects.OrderTerminalLookup._initRemoteClassAlias();
        valueObjects.OrderTripLookup._initRemoteClassAlias();
        valueObjects.OrderTrnsptTypeLookup._initRemoteClassAlias();
        valueObjects.OrderUnitLookup._initRemoteClassAlias();

        var operations:Object = new Object();
        var operation:mx.rpc.remoting.Operation;

        operation = new mx.rpc.remoting.Operation(null, "approve");
         operation.resultType = String;
        operations["approve"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "count");
         operation.resultType = int;
        operations["count"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "create");
         operation.resultType = String;
        operations["create"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getAll");
         operation.resultType = Object;
        operations["getAll"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getNextOrderCustNum");
         operation.resultType = int;
        operations["getNextOrderCustNum"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getOrderInstructions");
         operation.resultType = Object;
        operations["getOrderInstructions"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getOrderInstructionsAsString");
         operation.resultType = String;
        operations["getOrderInstructionsAsString"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getOrderItems");
         operation.resultElementType = valueObjects.GUI_ORDER_ITEMS;
        operations["getOrderItems"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getOrderItemSchedules");
         operation.resultElementType = valueObjects.OrderItemScheduleLookup;
        operations["getOrderItemSchedules"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getOrderPeriods");
         operation.resultElementType = valueObjects.GUI_ORDER_PERIODS;
        operations["getOrderPeriods"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getOrderSchedules");
         operation.resultElementType = valueObjects.OrderScheduleLookup;
        operations["getOrderSchedules"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getPaged");
         operation.resultElementType = valueObjects.GUI_ORDERS;
        operations["getPaged"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getReports");
         operation.resultType = Object;
        operations["getReports"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "initOrderItems");
         operation.resultElementType = valueObjects.GUI_ORDER_ITEMS;
        operations["initOrderItems"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "initOrderPeriods");
         operation.resultElementType = valueObjects.GUI_ORDER_PERIODS;
        operations["initOrderPeriods"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "isOrderCustNoUsed");
         operation.resultType = int;
        operations["isOrderCustNoUsed"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "isOrderNoUsed");
         operation.resultType = int;
        operations["isOrderNoUsed"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupCompatibleDrawer");
         operation.resultElementType = valueObjects.OrderCmpyLookup;
        operations["lookupCompatibleDrawer"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupOrderCompany");
         operation.resultElementType = valueObjects.OrderCmpyLookup;
        operations["lookupOrderCompany"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupOrderCustomer");
         operation.resultType = Object;
        operations["lookupOrderCustomer"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupOrderDelvLocation");
         operation.resultElementType = valueObjects.OrderDelvLocLookup;
        operations["lookupOrderDelvLocation"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupOrderErpType");
         operation.resultElementType = valueObjects.OrderErpTypeLookup;
        operations["lookupOrderErpType"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupOrderMethodType");
         operation.resultElementType = valueObjects.OrderMethodTypeLookup;
        operations["lookupOrderMethodType"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupOrderPriceOffset");
         operation.resultType = Object;
        operations["lookupOrderPriceOffset"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupOrderPriceType");
         operation.resultElementType = valueObjects.OrderPriceTypeLookup;
        operations["lookupOrderPriceType"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupOrderProduct");
         operation.resultElementType = valueObjects.OrderProductLookup;
        operations["lookupOrderProduct"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupOrderPsnl");
         operation.resultType = Object;
        operations["lookupOrderPsnl"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupOrderSaleType");
         operation.resultElementType = valueObjects.OrderSaleTypeLookup;
        operations["lookupOrderSaleType"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupOrderStatusType");
         operation.resultElementType = valueObjects.OrderStatusTypeLookup;
        operations["lookupOrderStatusType"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupOrderTerminal");
         operation.resultElementType = valueObjects.OrderTerminalLookup;
        operations["lookupOrderTerminal"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupOrderTrip");
         operation.resultElementType = valueObjects.OrderTripLookup;
        operations["lookupOrderTrip"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupOrderTrnsptType");
         operation.resultElementType = valueObjects.OrderTrnsptTypeLookup;
        operations["lookupOrderTrnsptType"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupOrderUnit");
         operation.resultElementType = valueObjects.OrderUnitLookup;
        operations["lookupOrderUnit"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "remove");
         operation.resultType = String;
        operations["remove"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "update");
         operation.resultType = String;
        operations["update"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getPagingReports");
         operation.resultType = Object;
        operations["getPagingReports"] = operation;

        _serviceControl.operations = operations;
        _serviceControl.convertResultHandler = com.adobe.serializers.utility.TypeUtility.convertResultHandler;
        _serviceControl.source = "CustOrdersService";
        _serviceControl.endpoint = "gateway.php";
        var managedAssociation : mx.data.ManagedAssociation;
        var managedAssocsArray : Array;
        // initialize GUI_ORDERS data manager
        _gUI_ORDERSRPCDataManager = new mx.data.RPCDataManager();
        managersArray.push(_gUI_ORDERSRPCDataManager);

        managedAssocsArray = new Array();

        _gUI_ORDERSRPCDataManager.destination = "gUI_ORDERSRPCDataManager";
        _gUI_ORDERSRPCDataManager.service = _serviceControl;        
        _gUI_ORDERSRPCDataManager.identities =  "rn";      
        _gUI_ORDERSRPCDataManager.itemClass = valueObjects.GUI_ORDERS; 



        var dmOperation : mx.data.ManagedOperation;
        var dmQuery : mx.data.ManagedQuery;

        dmQuery = new mx.data.ManagedQuery("getPaged");
        dmQuery.propertySpecifier = "order_ttyp_name,order_app_no,rn,order_dtrm_code,order_ship_to_num,order_psnl_name,order_sold_to_num,order_strm_code,order_carr_code,order_styp_id,order_dlv_time,order_drwr_code,order_sys_no,order_exp_time,order_items,order_last_change,order_src_name,order_ref_code,order_app_time,order_total,order_cust_code,order_approved,order_cust_no,order_carr_name,order_stat_name,order_dtrm_name,order_styp_name,order_ttyp_id,order_supp_name,order_supp_code,order_pay_note,order_price_printed,order_dloc_name,order_src_id,order_limit,order_strm_name,order_stat_id,order_ord_time,order_trsf_type,order_cust_name,order_dloc_code,order_drwr_name,order_schedules,order_instructions,order_cust_acnt,order_inv_no,order_expired,order_psnl_code";
        dmQuery.countOperation = "count";
        dmQuery.pagingEnabled = true;
        dmQuery.positionalPagingParameters = true;
        dmQuery.pageSize = 50;
        dmQuery.parameters = "values,dtypes,sorts,orders,offset,tot";
        _gUI_ORDERSRPCDataManager.addManagedOperation(dmQuery);

        _serviceControl.managers = managersArray;

         preInitializeService();
         model_internal::initialize();
    }
    
    //init initialization routine here, child class to override
    protected function preInitializeService():void
    {
        destination = "CustOrdersService";
      
    }
    

    /**
      * This method is a generated wrapper used to call the 'approve' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function approve(data:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("approve");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(data) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'count' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function count(values:Object, dtypes:Object, sorts:Object, orders:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("count");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(values,dtypes,sorts,orders) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'create' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function create(data:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("create");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(data) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getAll' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getAll() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getAll");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getNextOrderCustNum' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getNextOrderCustNum(data:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getNextOrderCustNum");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(data) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getOrderInstructions' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getOrderInstructions(order_id:int, counter:int) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getOrderInstructions");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(order_id,counter) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getOrderInstructionsAsString' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getOrderInstructionsAsString(order_id:int, counter:int) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getOrderInstructionsAsString");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(order_id,counter) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getOrderItems' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getOrderItems(order_id:int) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getOrderItems");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(order_id) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getOrderItemSchedules' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getOrderItemSchedules(order_id:int, prod_code:String, prod_cmpy:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getOrderItemSchedules");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(order_id,prod_code,prod_cmpy) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getOrderPeriods' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getOrderPeriods(order_id:int, prod_code:String, prod_cmpy:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getOrderPeriods");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(order_id,prod_code,prod_cmpy) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getOrderSchedules' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getOrderSchedules(order_id:int) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getOrderSchedules");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(order_id) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getPaged' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getPaged(values:Object, dtypes:Object, sorts:Object, orders:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getPaged");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(values,dtypes,sorts,orders) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getReports' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getReports(values:Object, dtypes:Object, sorts:Object, orders:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getReports");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(values,dtypes,sorts,orders) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'initOrderItems' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function initOrderItems(drawer:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("initOrderItems");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(drawer) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'initOrderPeriods' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function initOrderPeriods(prod_code:String, prod_cmpy:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("initOrderPeriods");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(prod_code,prod_cmpy) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'isOrderCustNoUsed' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function isOrderCustNoUsed(supplier:String, order_id:int) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("isOrderCustNoUsed");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supplier,order_id) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'isOrderNoUsed' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function isOrderNoUsed(order_id:int) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("isOrderNoUsed");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(order_id) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupCompatibleDrawer' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupCompatibleDrawer(cmpy:Object, prod:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupCompatibleDrawer");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(cmpy,prod) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupOrderCompany' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupOrderCompany(type:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupOrderCompany");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(type) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupOrderCustomer' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupOrderCustomer(supplier:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupOrderCustomer");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supplier) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupOrderDelvLocation' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupOrderDelvLocation() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupOrderDelvLocation");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupOrderErpType' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupOrderErpType() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupOrderErpType");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupOrderMethodType' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupOrderMethodType() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupOrderMethodType");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupOrderPriceOffset' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupOrderPriceOffset() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupOrderPriceOffset");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupOrderPriceType' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupOrderPriceType() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupOrderPriceType");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupOrderProduct' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupOrderProduct(drawer:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupOrderProduct");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(drawer) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupOrderPsnl' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupOrderPsnl(employer:Object, role:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupOrderPsnl");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(employer,role) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupOrderSaleType' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupOrderSaleType() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupOrderSaleType");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupOrderStatusType' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupOrderStatusType() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupOrderStatusType");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupOrderTerminal' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupOrderTerminal() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupOrderTerminal");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupOrderTrip' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupOrderTrip(supplier:Object, status:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupOrderTrip");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supplier,status) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupOrderTrnsptType' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupOrderTrnsptType(ord_mthd:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupOrderTrnsptType");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(ord_mthd) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupOrderUnit' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupOrderUnit() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupOrderUnit");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'remove' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function remove(data:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("remove");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(data) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'update' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function update(data:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("update");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(data) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getPagingReports' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getPagingReports(values:Object, dtypes:Object, sorts:Object, orders:Object, offset:Object, tot:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getPagingReports");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(values,dtypes,sorts,orders,offset,tot) ;
        return _internal_token;
    }
     
}

}
