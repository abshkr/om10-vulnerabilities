/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this service wrapper you may modify the generated sub-class of this class - IdentificationAssignmentService.as.
 */
package services.identificationassignmentservice
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
import valueObjects.GUI_AccessKeys;
import valueObjects.KeyAllocTypeLookup;
import valueObjects.KeyCmpyLookup;
import valueObjects.KeyCustomerLookup;
import valueObjects.KeyEqptLookup;
import valueObjects.KeyOrderLookup;
import valueObjects.KeyPhysTypeLookup;
import valueObjects.KeyPsnlLookup;
import valueObjects.KeyRoleLookup;
import valueObjects.KeyTerminalLookup;
import valueObjects.KeyTimeCodeLookup;
import valueObjects.KeyTnkrLookup;
import valueObjects.KeyTripLookup;
import valueObjects.KeyTypeLookup;

import mx.collections.ItemResponder;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;

[ExcludeClass]
internal class _Super_IdentificationAssignmentService extends com.adobe.fiber.services.wrapper.RemoteObjectServiceWrapper
{
    private var _gUI_AccessKeysRPCDataManager : mx.data.RPCDataManager;
    private var managersArray : Array = new Array();

    public const DATA_MANAGER_GUI_ACCESSKEYS : String = "GUI_AccessKeys";

    public function getDataManager(dataManagerName:String) : mx.data.RPCDataManager
    {
        switch (dataManagerName)
        {
             case (DATA_MANAGER_GUI_ACCESSKEYS):
                return _gUI_AccessKeysRPCDataManager;
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
        return _gUI_AccessKeysRPCDataManager.dataStore.commit(itemsOrCollections, cascadeCommit);
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
            return _gUI_AccessKeysRPCDataManager.dataStore.revertChanges();
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
                    anyChangeItemReverted ||= _gUI_AccessKeysRPCDataManager.dataStore.revertChangesForCollection(mx.collections.ListCollectionView(changeItem));
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
    public function _Super_IdentificationAssignmentService()
    {
        // initialize service control
        _serviceControl = new mx.rpc.remoting.RemoteObject();

        // initialize RemoteClass alias for all entities returned by functions of this service
        valueObjects.GUI_AccessKeys._initRemoteClassAlias();
        valueObjects.KeyAllocTypeLookup._initRemoteClassAlias();
        valueObjects.KeyCmpyLookup._initRemoteClassAlias();
        valueObjects.KeyCustomerLookup._initRemoteClassAlias();
        valueObjects.KeyEqptLookup._initRemoteClassAlias();
        valueObjects.KeyOrderLookup._initRemoteClassAlias();
        valueObjects.KeyPhysTypeLookup._initRemoteClassAlias();
        valueObjects.KeyPsnlLookup._initRemoteClassAlias();
        valueObjects.KeyRoleLookup._initRemoteClassAlias();
        valueObjects.KeyTerminalLookup._initRemoteClassAlias();
        valueObjects.KeyTimeCodeLookup._initRemoteClassAlias();
        valueObjects.KeyTnkrLookup._initRemoteClassAlias();
        valueObjects.KeyTripLookup._initRemoteClassAlias();
        valueObjects.KeyTypeLookup._initRemoteClassAlias();

        var operations:Object = new Object();
        var operation:mx.rpc.remoting.Operation;

        operation = new mx.rpc.remoting.Operation(null, "count");
         operation.resultType = int;
        operations["count"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "create");
         operation.resultType = String;
        operations["create"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getAll");
         operation.resultType = Object;
        operations["getAll"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getPaged");
         operation.resultElementType = valueObjects.GUI_AccessKeys;
        operations["getPaged"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "isKeyExisted");
         operation.resultType = int;
        operations["isKeyExisted"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "isKeyIdExisted");
         operation.resultType = int;
        operations["isKeyIdExisted"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "isKeyIdTextExisted");
         operation.resultType = int;
        operations["isKeyIdTextExisted"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupKeyAllocType");
         operation.resultElementType = valueObjects.KeyAllocTypeLookup;
        operations["lookupKeyAllocType"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupKeyCompany");
         operation.resultElementType = valueObjects.KeyCmpyLookup;
        operations["lookupKeyCompany"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupKeyCustomer");
         operation.resultElementType = valueObjects.KeyCustomerLookup;
        operations["lookupKeyCustomer"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupKeyEqpt");
         operation.resultElementType = valueObjects.KeyEqptLookup;
        operations["lookupKeyEqpt"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupKeyOrder");
         operation.resultElementType = valueObjects.KeyOrderLookup;
        operations["lookupKeyOrder"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupKeyPhysType");
         operation.resultElementType = valueObjects.KeyPhysTypeLookup;
        operations["lookupKeyPhysType"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupKeyPsnl");
         operation.resultElementType = valueObjects.KeyPsnlLookup;
        operations["lookupKeyPsnl"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupKeyRole");
         operation.resultElementType = valueObjects.KeyRoleLookup;
        operations["lookupKeyRole"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupKeyTerminal");
         operation.resultElementType = valueObjects.KeyTerminalLookup;
        operations["lookupKeyTerminal"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupKeyTimeCode");
         operation.resultElementType = valueObjects.KeyTimeCodeLookup;
        operations["lookupKeyTimeCode"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupKeyTnkr");
         operation.resultElementType = valueObjects.KeyTnkrLookup;
        operations["lookupKeyTnkr"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupKeyTrip");
         operation.resultElementType = valueObjects.KeyTripLookup;
        operations["lookupKeyTrip"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupKeyType");
         operation.resultElementType = valueObjects.KeyTypeLookup;
        operations["lookupKeyType"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "remove");
         operation.resultType = String;
        operations["remove"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "update");
         operation.resultType = String;
        operations["update"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "updateAdhocKey");
         operation.resultType = Object;
        operations["updateAdhocKey"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "isCmpyPinRequired");
         operation.resultType = int;
        operations["isCmpyPinRequired"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getTotalRecords");
         operation.resultType = int;
        operations["getTotalRecords"] = operation;

        _serviceControl.operations = operations;
        _serviceControl.convertResultHandler = com.adobe.serializers.utility.TypeUtility.convertResultHandler;
        _serviceControl.source = "IdentificationAssignmentService";
        _serviceControl.endpoint = "gateway.php";
        var managedAssociation : mx.data.ManagedAssociation;
        var managedAssocsArray : Array;
        // initialize GUI_AccessKeys data manager
        _gUI_AccessKeysRPCDataManager = new mx.data.RPCDataManager();
        managersArray.push(_gUI_AccessKeysRPCDataManager);

        managedAssocsArray = new Array();

        _gUI_AccessKeysRPCDataManager.destination = "gUI_AccessKeysRPCDataManager";
        _gUI_AccessKeysRPCDataManager.service = _serviceControl;        
        _gUI_AccessKeysRPCDataManager.identities =  "rn";      
        _gUI_AccessKeysRPCDataManager.itemClass = valueObjects.GUI_AccessKeys; 



        var dmOperation : mx.data.ManagedOperation;
        var dmQuery : mx.data.ManagedQuery;

        dmQuery = new mx.data.ManagedQuery("getPaged");
        dmQuery.propertySpecifier = "kya_equipment,kya_key_issuer,rn,kya_type_name,kya_personnel,kya_psnl_name,kya_role,kya_tnkr_name,kya_alloc_type_name,kya_tanker,kya_cust_ordno,kya_tnkr_cmpy,kya_role_name,kya_drawer,kya_issuer_name,kya_key_created,kya_pin_changed,kya_eqpt_cmpy,kya_adhoc,kya_alloc_type,kya_etyp_name,kya_eqpt_cmpy_name,kya_draw_name,kya_cust_name,kya_alloc_cmpy,kya_eqpt_name,kya_phys_name,kya_order_no,kya_txt,kya_trip_no,kya_timecode,kya_psnl_cmpy,kya_load_id,kya_order_desc,kya_supp_name,kya_alloc_cmpy_name,kya_pin,kya_phys_type,kya_eqpt_desc,kya_tnkr_desc,kya_type,kya_psnl_cmpy_name,kya_lock,kya_key_no,kya_supplier,kya_site_name,kya_load_site,kya_tnkr_cmpy_name";
        dmQuery.countOperation = "count";
        dmQuery.pagingEnabled = true;
        dmQuery.positionalPagingParameters = true;
        dmQuery.pageSize = 40;
        dmQuery.parameters = "values,dtypes,sorts,orders,offset,tot";
        _gUI_AccessKeysRPCDataManager.addManagedOperation(dmQuery);

        _serviceControl.managers = managersArray;

         preInitializeService();
         model_internal::initialize();
    }
    
    //init initialization routine here, child class to override
    protected function preInitializeService():void
    {
        destination = "IdentificationAssignmentService";
      
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
      * This method is a generated wrapper used to call the 'isKeyExisted' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function isKeyExisted(key_txt:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("isKeyExisted");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(key_txt) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'isKeyIdExisted' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function isKeyIdExisted(id:int, issuer:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("isKeyIdExisted");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(id,issuer) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'isKeyIdTextExisted' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function isKeyIdTextExisted(id:int, issuer:String, key_txt:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("isKeyIdTextExisted");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(id,issuer,key_txt) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupKeyAllocType' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupKeyAllocType() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupKeyAllocType");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupKeyCompany' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupKeyCompany(type:int) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupKeyCompany");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(type) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupKeyCustomer' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupKeyCustomer(supplier:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupKeyCustomer");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supplier) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupKeyEqpt' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupKeyEqpt(owner:String, sched:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupKeyEqpt");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(owner,sched) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupKeyOrder' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupKeyOrder(customer:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupKeyOrder");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(customer) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupKeyPhysType' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupKeyPhysType() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupKeyPhysType");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupKeyPsnl' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupKeyPsnl(employer:String, role:int) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupKeyPsnl");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(employer,role) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupKeyRole' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupKeyRole() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupKeyRole");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupKeyTerminal' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupKeyTerminal() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupKeyTerminal");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupKeyTimeCode' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupKeyTimeCode() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupKeyTimeCode");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupKeyTnkr' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupKeyTnkr(owner:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupKeyTnkr");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(owner) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupKeyTrip' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupKeyTrip(supplier:String, status:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupKeyTrip");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supplier,status) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupKeyType' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupKeyType() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupKeyType");
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
      * This method is a generated wrapper used to call the 'isCmpyPinRequired' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function isCmpyPinRequired(issuer:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("isCmpyPinRequired");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(issuer) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getTotalRecords' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getTotalRecords() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getTotalRecords");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
}

}
