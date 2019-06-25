/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this service wrapper you may modify the generated sub-class of this class - LoadSchedulesService.as.
 */
package services.loadschedulesservice
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
import valueObjects.AdhocKeys;
import valueObjects.CompanyLookup;
import valueObjects.Drawers;
import valueObjects.GuiSchedules;
import valueObjects.ProductsLookup1;
import valueObjects.ScheduleCompartmentDetails;
import valueObjects.ScheduleProductDetails;
import valueObjects.ScheduleTankersLookup;
import valueObjects.ScheduledCompartments;
import valueObjects.StatusLookup;
import valueObjects.TankersLookup;

import mx.collections.ItemResponder;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;

[ExcludeClass]
internal class _Super_LoadSchedulesService extends com.adobe.fiber.services.wrapper.RemoteObjectServiceWrapper
{
    private var _guiSchedulesRPCDataManager : mx.data.RPCDataManager;
    private var managersArray : Array = new Array();

    public const DATA_MANAGER_GUISCHEDULES : String = "GuiSchedules";

    public function getDataManager(dataManagerName:String) : mx.data.RPCDataManager
    {
        switch (dataManagerName)
        {
             case (DATA_MANAGER_GUISCHEDULES):
                return _guiSchedulesRPCDataManager;
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
        return _guiSchedulesRPCDataManager.dataStore.commit(itemsOrCollections, cascadeCommit);
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
            return _guiSchedulesRPCDataManager.dataStore.revertChanges();
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
                    anyChangeItemReverted ||= _guiSchedulesRPCDataManager.dataStore.revertChangesForCollection(mx.collections.ListCollectionView(changeItem));
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
    public function _Super_LoadSchedulesService()
    {
        // initialize service control
        _serviceControl = new mx.rpc.remoting.RemoteObject();

        // initialize RemoteClass alias for all entities returned by functions of this service
        valueObjects.AdhocKeys._initRemoteClassAlias();
        valueObjects.CompanyLookup._initRemoteClassAlias();
        valueObjects.Drawers._initRemoteClassAlias();
        valueObjects.ScheduleCompartmentDetails._initRemoteClassAlias();
        valueObjects.ScheduleProductDetails._initRemoteClassAlias();
        valueObjects.GuiSchedules._initRemoteClassAlias();
        valueObjects.StatusLookup._initRemoteClassAlias();
        valueObjects.ScheduledCompartments._initRemoteClassAlias();
        valueObjects.ProductsLookup1._initRemoteClassAlias();
        valueObjects.ScheduleTankersLookup._initRemoteClassAlias();
        valueObjects.TankersLookup._initRemoteClassAlias();

        var operations:Object = new Object();
        var operation:mx.rpc.remoting.Operation;

        operation = new mx.rpc.remoting.Operation(null, "adhocKeyLookup");
         operation.resultElementType = valueObjects.AdhocKeys;
        operations["adhocKeyLookup"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "carriersLookup");
         operation.resultElementType = valueObjects.CompanyLookup;
        operations["carriersLookup"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "checkTripNumber");
         operation.resultType = String;
        operations["checkTripNumber"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "count");
         operation.resultType = int;
        operations["count"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "create");
         operation.resultType = String;
        operations["create"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "delete");
         operation.resultType = String;
        operations["delete"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "drawersLookup");
         operation.resultElementType = valueObjects.Drawers;
        operations["drawersLookup"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getDetailsByCompartments");
         operation.resultElementType = valueObjects.ScheduleCompartmentDetails;
        operations["getDetailsByCompartments"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getDetailsByProducts");
         operation.resultElementType = valueObjects.ScheduleProductDetails;
        operations["getDetailsByProducts"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getLastCompartmentProducts");
         operation.resultType = Object;
        operations["getLastCompartmentProducts"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getOrderDetails");
         operation.resultType = Object;
        operations["getOrderDetails"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getOrders");
         operation.resultType = Object;
        operations["getOrders"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getPaged");
         operation.resultElementType = valueObjects.GuiSchedules;
        operations["getPaged"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getReport");
         operation.resultElementType = valueObjects.GuiSchedules;
        operations["getReport"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getSchedStatus");
         operation.resultElementType = valueObjects.StatusLookup;
        operations["getSchedStatus"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getScheduledCompartments");
         operation.resultElementType = valueObjects.ScheduledCompartments;
        operations["getScheduledCompartments"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getSeqNum");
         operation.resultType = String;
        operations["getSeqNum"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "productsLookup");
         operation.resultElementType = valueObjects.ProductsLookup1;
        operations["productsLookup"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "suppliersLookup");
         operation.resultElementType = valueObjects.CompanyLookup;
        operations["suppliersLookup"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "tankersLookup");
         operation.resultElementType = valueObjects.ScheduleTankersLookup;
        operations["tankersLookup"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "tankersLookupByCarrier");
         operation.resultElementType = valueObjects.TankersLookup;
        operations["tankersLookupByCarrier"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "update");
         operation.resultType = String;
        operations["update"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "updateAdhocKey");
         operation.resultType = Object;
        operations["updateAdhocKey"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getTrips");
         operation.resultType = String;
        operations["getTrips"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "setPrefix");
         operation.resultType = Object;
        operations["setPrefix"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "setSuffix");
         operation.resultType = Object;
        operations["setSuffix"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getSeals");
         operation.resultType = Object;
        operations["getSeals"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "allocateSeal");
         operation.resultType = Object;
        operations["allocateSeal"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "deallocateAllSeal");
         operation.resultType = Object;
        operations["deallocateAllSeal"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getNextSeal");
         operation.resultType = Object;
        operations["getNextSeal"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "setNextSeal");
         operation.resultType = Object;
        operations["setNextSeal"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "deleteSeal");
         operation.resultType = Object;
        operations["deleteSeal"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "reallocate");
         operation.resultType = Object;
        operations["reallocate"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "allocateOne");
         operation.resultType = Object;
        operations["allocateOne"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "resetScheduleDriver");
         operation.resultType = Object;
        operations["resetScheduleDriver"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupPSNListByCmpy");
         operation.resultType = Object;
        operations["lookupPSNListByCmpy"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupCmpyByDriver");
         operation.resultType = Object;
        operations["lookupCmpyByDriver"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getScheduleDriver");
         operation.resultType = Object;
        operations["getScheduleDriver"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getCompanyByDriver");
         operation.resultType = Object;
        operations["getCompanyByDriver"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "employerCmpyLookup");
         operation.resultType = Object;
        operations["employerCmpyLookup"] = operation;

        _serviceControl.operations = operations;
        _serviceControl.convertResultHandler = com.adobe.serializers.utility.TypeUtility.convertResultHandler;
        _serviceControl.source = "LoadSchedulesService";
        _serviceControl.endpoint = "gateway.php";
        var managedAssociation : mx.data.ManagedAssociation;
        var managedAssocsArray : Array;
        // initialize GuiSchedules data manager
        _guiSchedulesRPCDataManager = new mx.data.RPCDataManager();
        managersArray.push(_guiSchedulesRPCDataManager);

        managedAssocsArray = new Array();

        _guiSchedulesRPCDataManager.destination = "guiSchedulesRPCDataManager";
        _guiSchedulesRPCDataManager.service = _serviceControl;        
        _guiSchedulesRPCDataManager.identities =  "rn";      
        _guiSchedulesRPCDataManager.itemClass = valueObjects.GuiSchedules; 



        var dmOperation : mx.data.ManagedOperation;
        var dmQuery : mx.data.ManagedQuery;

        dmQuery = new mx.data.ManagedQuery("getPaged");
        dmQuery.propertySpecifier = "shls_ld_start,supplier_code,rn,drawer_code,shls_supp_org,shlsload_load_id,shls_ship_to_num,shls_ld_type,order_no,shls_sold_to_num,shls_terminal,shls_exp2,shls_trip_no_org,shls_trip_no,order_cust_ordno,carrier,driver,ld_type,supplier,order_ref_code,shls_caldate,tnkr_name,shls_status,status,last_chg_time,order_cust_cmpy_name,shl_ret_loc,order_cust,operator,shls_shift,order_cust_cmpy_code,load_reverse_flag,carrier_code,drawer_name,tnkr_code,cmpy_schd_archive,shedule_profile,cmpy_schd_rev_repost,shls_ld_end,shls_priority";
        dmQuery.countOperation = "count";
        dmQuery.pagingEnabled = true;
        dmQuery.positionalPagingParameters = true;
        dmQuery.pageSize = 80;
        dmQuery.parameters = "values,dtypes,sorts,orders,offset,tot";
        _guiSchedulesRPCDataManager.addManagedOperation(dmQuery);

        _serviceControl.managers = managersArray;

         preInitializeService();
         model_internal::initialize();
    }
    
    //init initialization routine here, child class to override
    protected function preInitializeService():void
    {
        destination = "LoadSchedulesService";
      
    }
    

    /**
      * This method is a generated wrapper used to call the 'adhocKeyLookup' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function adhocKeyLookup() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("adhocKeyLookup");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'carriersLookup' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function carriersLookup() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("carriersLookup");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'checkTripNumber' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function checkTripNumber(trip_no:int, supplier:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("checkTripNumber");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(trip_no,supplier) ;
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
      * This method is a generated wrapper used to call the 'delete_method' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function delete_method(data:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("delete");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(data) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'drawersLookup' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function drawersLookup() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("drawersLookup");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getDetailsByCompartments' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getDetailsByCompartments(supplier:String, trip_no:int) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getDetailsByCompartments");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supplier,trip_no) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getDetailsByProducts' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getDetailsByProducts(supplier:String, trip_no:int) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getDetailsByProducts");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supplier,trip_no) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getLastCompartmentProducts' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getLastCompartmentProducts(supplier:String, tanker:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getLastCompartmentProducts");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supplier,tanker) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getOrderDetails' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getOrderDetails(cmpy_code:Object, order_id:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getOrderDetails");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(cmpy_code,order_id) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getOrders' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getOrders(cmpy_code:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getOrders");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(cmpy_code) ;
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
      * This method is a generated wrapper used to call the 'getReport' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getReport(values:Object, dtypes:Object, sorts:Object, orders:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getReport");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(values,dtypes,sorts,orders) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getSchedStatus' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getSchedStatus() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getSchedStatus");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getScheduledCompartments' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getScheduledCompartments(supplier:String, trip_no:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getScheduledCompartments");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supplier,trip_no) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getSeqNum' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getSeqNum(sess_id:String, terminal:String, supplier:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getSeqNum");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(sess_id,terminal,supplier) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'productsLookup' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function productsLookup(cmpy_code:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("productsLookup");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(cmpy_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'suppliersLookup' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function suppliersLookup() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("suppliersLookup");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'tankersLookup' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function tankersLookup() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("tankersLookup");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'tankersLookupByCarrier' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function tankersLookupByCarrier(carrier:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("tankersLookupByCarrier");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(carrier) ;
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
      * This method is a generated wrapper used to call the 'updateAdhocKey' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function updateAdhocKey(data:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("updateAdhocKey");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(data) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getTrips' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getTrips(values:Object, dtypes:Object, sorts:Object, orders:Object, offset:int, tot:int) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getTrips");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(values,dtypes,sorts,orders,offset,tot) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'setPrefix' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function setPrefix(seal:Object, prefix:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("setPrefix");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(seal,prefix) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'setSuffix' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function setSuffix(seal:Object, suffix:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("setSuffix");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(seal,suffix) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getSeals' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getSeals(trip:Object, supplier:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getSeals");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(trip,supplier) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'allocateSeal' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function allocateSeal(trip:Object, supplier:Object, numSeal:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("allocateSeal");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(trip,supplier,numSeal) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'deallocateAllSeal' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function deallocateAllSeal(trip:Object, supplier:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("deallocateAllSeal");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(trip,supplier) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getNextSeal' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getNextSeal() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getNextSeal");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'setNextSeal' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function setNextSeal(seal:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("setNextSeal");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(seal) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'deleteSeal' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function deleteSeal(seal:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("deleteSeal");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(seal) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'reallocate' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function reallocate(seal:Object, trip:Object, supplier:Object, cmpt_nr:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("reallocate");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(seal,trip,supplier,cmpt_nr) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'allocateOne' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function allocateOne(trip:Object, supplier:Object, cmpt_nr:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("allocateOne");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(trip,supplier,cmpt_nr) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'resetScheduleDriver' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function resetScheduleDriver(trip:Object, supp:Object, driver:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("resetScheduleDriver");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(trip,supp,driver) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupPSNListByCmpy' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupPSNListByCmpy(cmpycode:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupPSNListByCmpy");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(cmpycode) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupCmpyByDriver' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupCmpyByDriver(drivercode:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupCmpyByDriver");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(drivercode) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getScheduleDriver' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getScheduleDriver(trip:Object, supplier:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getScheduleDriver");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(trip,supplier) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getCompanyByDriver' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getCompanyByDriver(driver:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getCompanyByDriver");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(driver) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'employerCmpyLookup' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function employerCmpyLookup() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("employerCmpyLookup");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
}

}
