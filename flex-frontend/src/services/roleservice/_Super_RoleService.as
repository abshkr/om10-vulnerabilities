/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this service wrapper you may modify the generated sub-class of this class - RoleService.as.
 */
package services.roleservice
{
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.services.wrapper.RemoteObjectServiceWrapper;
import com.adobe.serializers.utility.TypeUtility;
import mx.rpc.AbstractOperation;
import mx.rpc.AsyncToken;
import mx.rpc.remoting.Operation;
import mx.rpc.remoting.RemoteObject;
import valueObjects.Urbac_Roles;
import valueObjects.UserRoles;

import mx.collections.ItemResponder;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;

[ExcludeClass]
internal class _Super_RoleService extends com.adobe.fiber.services.wrapper.RemoteObjectServiceWrapper
{

    // Constructor
    public function _Super_RoleService()
    {
        // initialize service control
        _serviceControl = new mx.rpc.remoting.RemoteObject();

        // initialize RemoteClass alias for all entities returned by functions of this service
        valueObjects.UserRoles._initRemoteClassAlias();

        var operations:Object = new Object();
        var operation:mx.rpc.remoting.Operation;

        operation = new mx.rpc.remoting.Operation(null, "createRole");
         operation.resultType = String;
        operations["createRole"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "deleteRole");
         operation.resultType = String;
        operations["deleteRole"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getRoleData");
         operation.resultType = valueObjects.Urbac_Roles;
        operations["getRoleData"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "_createRole_dyn");
         operation.resultType = Object;
        operations["_createRole_dyn"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "updateRole");
         operation.resultType = String;
        operations["updateRole"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "copyRole");
         operation.resultType = String;
        operations["copyRole"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getRoles");
         operation.resultElementType = valueObjects.UserRoles;
        operations["getRoles"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getUserRole");
         operation.resultType = valueObjects.Urbac_Roles;
        operations["getUserRole"] = operation;

        _serviceControl.operations = operations;
        _serviceControl.convertResultHandler = com.adobe.serializers.utility.TypeUtility.convertResultHandler;
        _serviceControl.source = "RoleService";
        _serviceControl.endpoint = "gateway.php";


         preInitializeService();
         model_internal::initialize();
    }
    
    //init initialization routine here, child class to override
    protected function preInitializeService():void
    {
        destination = "RoleService";
      
    }
    

    /**
      * This method is a generated wrapper used to call the 'createRole' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function createRole(role_code:String, role_text:String, role_note:String, domprivl:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("createRole");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(role_code,role_text,role_note,domprivl) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'deleteRole' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function deleteRole(role_code:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("deleteRole");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(role_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getRoleData' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getRoleData(role_code:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getRoleData");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(role_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the '_createRole_dyn' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function _createRole_dyn(roleData:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("_createRole_dyn");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(roleData) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'updateRole' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function updateRole(role_code_old:String, role_code:String, role_text:String, role_note:String, domprivl:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("updateRole");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(role_code_old,role_code,role_text,role_note,domprivl) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'copyRole' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function copyRole(roleData:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("copyRole");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(roleData) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getRoles' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getRoles() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getRoles");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getUserRole' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getUserRole(user_cd:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getUserRole");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(user_cd) ;
        return _internal_token;
    }
     
}

}
