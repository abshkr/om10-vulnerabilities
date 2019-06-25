/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this service wrapper you may modify the generated sub-class of this class - EquipmentListService.as.
 */
package services.equipmentlistservice
{
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.services.wrapper.RemoteObjectServiceWrapper;
import com.adobe.serializers.utility.TypeUtility;
import mx.rpc.AbstractOperation;
import mx.rpc.AsyncToken;
import mx.rpc.remoting.Operation;
import mx.rpc.remoting.RemoteObject;
import valueObjects.CustomDatatype;
import valueObjects.EqptTypeLookupByFilter;
import valueObjects.EquipmentCompartment;
import valueObjects.EquipmentComposition;
import valueObjects.EquipmentStructure;

import mx.collections.ItemResponder;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;

[ExcludeClass]
internal class _Super_EquipmentListService extends com.adobe.fiber.services.wrapper.RemoteObjectServiceWrapper
{

    // Constructor
    public function _Super_EquipmentListService()
    {
        // initialize service control
        _serviceControl = new mx.rpc.remoting.RemoteObject();

        // initialize RemoteClass alias for all entities returned by functions of this service
        valueObjects.CustomDatatype._initRemoteClassAlias();
        valueObjects.EquipmentCompartment._initRemoteClassAlias();
        valueObjects.EquipmentComposition._initRemoteClassAlias();
        valueObjects.EquipmentStructure._initRemoteClassAlias();
        valueObjects.EqptTypeLookupByFilter._initRemoteClassAlias();

        var operations:Object = new Object();
        var operation:mx.rpc.remoting.Operation;

        operation = new mx.rpc.remoting.Operation(null, "count");
         operation.resultType = int;
        operations["count"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "create");
         operation.resultType = String;
        operations["create"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getAll");
         operation.resultElementType = Object;
        operations["getAll"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getEquipLoadTypes");
         operation.resultElementType = valueObjects.CustomDatatype;
        operations["getEquipLoadTypes"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getEquipmentCompartments");
         operation.resultElementType = valueObjects.EquipmentCompartment;
        operations["getEquipmentCompartments"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getEquipmentComposition");
         operation.resultElementType = valueObjects.EquipmentComposition;
        operations["getEquipmentComposition"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getEquipmentsByTypeAndCode");
         operation.resultElementType = valueObjects.EquipmentStructure;
        operations["getEquipmentsByTypeAndCode"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getEquipmentsByTypeAndOwner");
         operation.resultElementType = valueObjects.EquipmentStructure;
        operations["getEquipmentsByTypeAndOwner"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getPaged");
         operation.resultElementType = Object;
        operations["getPaged"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getSchdType");
         operation.resultType = String;
        operations["getSchdType"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "isEqptExisted");
         operation.resultType = int;
        operations["isEqptExisted"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "isEqptUsedByTanker");
         operation.resultType = int;
        operations["isEqptUsedByTanker"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "remove");
         operation.resultType = String;
        operations["remove"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "transpEqptTypeLookup");
         operation.resultElementType = valueObjects.EqptTypeLookupByFilter;
        operations["transpEqptTypeLookup"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "update");
         operation.resultType = String;
        operations["update"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getEquipmentList");
         operation.resultElementType = Object;
        operations["getEquipmentList"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "toggleCompartmentLock");
         operation.resultType = String;
        operations["toggleCompartmentLock"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "unlockEquipmentCompartments");
         operation.resultType = String;
        operations["unlockEquipmentCompartments"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "unlockTankerCompartments");
         operation.resultType = String;
        operations["unlockTankerCompartments"] = operation;

        _serviceControl.operations = operations;
        _serviceControl.convertResultHandler = com.adobe.serializers.utility.TypeUtility.convertResultHandler;
        _serviceControl.source = "EquipmentListService";
        _serviceControl.endpoint = "gateway.php";


         preInitializeService();
         model_internal::initialize();
    }
    
    //init initialization routine here, child class to override
    protected function preInitializeService():void
    {
        destination = "EquipmentListService";
      
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
      * This method is a generated wrapper used to call the 'getEquipLoadTypes' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getEquipLoadTypes() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getEquipLoadTypes");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getEquipmentCompartments' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getEquipmentCompartments(id:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getEquipmentCompartments");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(id) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getEquipmentComposition' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getEquipmentComposition(id:Object, owner:Object, code:Object, option:int) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getEquipmentComposition");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(id,owner,code,option) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getEquipmentsByTypeAndCode' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getEquipmentsByTypeAndCode(id:Object, owner:Object, code:Object, option:int) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getEquipmentsByTypeAndCode");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(id,owner,code,option) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getEquipmentsByTypeAndOwner' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getEquipmentsByTypeAndOwner(id:Object, owner:Object, option:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getEquipmentsByTypeAndOwner");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(id,owner,option) ;
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
    public function getPaged(values:Object, dtypes:Object, sorts:Object, orders:Object, offset:int, tot:int) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getPaged");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(values,dtypes,sorts,orders,offset,tot) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getSchdType' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getSchdType(supplier:String, trip_no:int) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getSchdType");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supplier,trip_no) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'isEqptExisted' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function isEqptExisted(eqpt_code:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("isEqptExisted");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(eqpt_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'isEqptUsedByTanker' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function isEqptUsedByTanker(eqpt_code:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("isEqptUsedByTanker");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(eqpt_code) ;
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
      * This method is a generated wrapper used to call the 'transpEqptTypeLookup' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function transpEqptTypeLookup(etype:Object, cmpts:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("transpEqptTypeLookup");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(etype,cmpts) ;
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
      * This method is a generated wrapper used to call the 'getEquipmentList' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getEquipmentList(values:Object, dtypes:Object, sorts:Object, orders:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getEquipmentList");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(values,dtypes,sorts,orders) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'toggleCompartmentLock' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function toggleCompartmentLock(eqpt:Object, cmpt:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("toggleCompartmentLock");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(eqpt,cmpt) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'unlockEquipmentCompartments' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function unlockEquipmentCompartments(eqpt:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("unlockEquipmentCompartments");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(eqpt) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'unlockTankerCompartments' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function unlockTankerCompartments(tnkr:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("unlockTankerCompartments");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(tnkr) ;
        return _internal_token;
    }
     
}

}
