/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this service wrapper you may modify the generated sub-class of this class - ProductOwnershipService.as.
 */
package services.productownershipservice
{
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.services.wrapper.RemoteObjectServiceWrapper;
import com.adobe.serializers.utility.TypeUtility;
import mx.rpc.AbstractOperation;
import mx.rpc.AsyncToken;
import mx.rpc.remoting.Operation;
import mx.rpc.remoting.RemoteObject;

import mx.collections.ItemResponder;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;

[ExcludeClass]
internal class _Super_ProductOwnershipService extends com.adobe.fiber.services.wrapper.RemoteObjectServiceWrapper
{

    // Constructor
    public function _Super_ProductOwnershipService()
    {
        // initialize service control
        _serviceControl = new mx.rpc.remoting.RemoteObject();

        // initialize RemoteClass alias for all entities returned by functions of this service

        var operations:Object = new Object();
        var operation:mx.rpc.remoting.Operation;

        operation = new mx.rpc.remoting.Operation(null, "getOwnershipByProdEx");
         operation.resultType = Object;
        operations["getOwnershipByProdEx"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getAmountByProd");
         operation.resultType = Object;
        operations["getAmountByProd"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "adjustOwnership");
         operation.resultType = Object;
        operations["adjustOwnership"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "giveAwayOwnership");
         operation.resultType = Object;
        operations["giveAwayOwnership"] = operation;

        _serviceControl.operations = operations;
        _serviceControl.convertResultHandler = com.adobe.serializers.utility.TypeUtility.convertResultHandler;
        _serviceControl.source = "ProductOwnershipService";
        _serviceControl.endpoint = "gateway.php";


         preInitializeService();
         model_internal::initialize();
    }
    
    //init initialization routine here, child class to override
    protected function preInitializeService():void
    {
        destination = "ProductOwnershipService";
      
    }
    

    /**
      * This method is a generated wrapper used to call the 'getOwnershipByProdEx' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getOwnershipByProdEx(base_code:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getOwnershipByProdEx");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(base_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getAmountByProd' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getAmountByProd(base_code:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getAmountByProd");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(base_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'adjustOwnership' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function adjustOwnership(quantity:int, company:String, base_code:Object, reason:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("adjustOwnership");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(quantity,company,base_code,reason) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'giveAwayOwnership' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function giveAwayOwnership(quantity:Object, src_cmpy:Object, dest_cmpy:Object, base_code:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("giveAwayOwnership");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(quantity,src_cmpy,dest_cmpy,base_code) ;
        return _internal_token;
    }
     
}

}
