/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this service wrapper you may modify the generated sub-class of this class - CompaniesService.as.
 */
package services.companiesservice
{
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.services.wrapper.RemoteObjectServiceWrapper;
import com.adobe.serializers.utility.TypeUtility;
import mx.rpc.AbstractOperation;
import mx.rpc.AsyncToken;
import mx.rpc.remoting.Operation;
import mx.rpc.remoting.RemoteObject;
import valueObjects.CompanyLookup;
import valueObjects.Companys;
import valueObjects.CustomDatatype1;
import valueObjects.PrintersLookup;

import mx.collections.ItemResponder;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;

[ExcludeClass]
internal class _Super_CompaniesService extends com.adobe.fiber.services.wrapper.RemoteObjectServiceWrapper
{

    // Constructor
    public function _Super_CompaniesService()
    {
        // initialize service control
        _serviceControl = new mx.rpc.remoting.RemoteObject();

        // initialize RemoteClass alias for all entities returned by functions of this service
        valueObjects.Companys._initRemoteClassAlias();
        valueObjects.CustomDatatype1._initRemoteClassAlias();
        valueObjects.CompanyLookup._initRemoteClassAlias();
        valueObjects.PrintersLookup._initRemoteClassAlias();

        var operations:Object = new Object();
        var operation:mx.rpc.remoting.Operation;

        operation = new mx.rpc.remoting.Operation(null, "count");
         operation.resultType = int;
        operations["count"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "create");
         operation.resultType = String;
        operations["create"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "delete");
         operation.resultType = String;
        operations["delete"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getCompanyTypes");
         operation.resultType = Object;
        operations["getCompanyTypes"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getPaged");
         operation.resultType = Object;
        operations["getPaged"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getRecord");
         operation.resultElementType = valueObjects.Companys;
        operations["getRecord"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getTypes");
         operation.resultElementType = valueObjects.CustomDatatype1;
        operations["getTypes"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookup");
         operation.resultElementType = valueObjects.CompanyLookup;
        operations["lookup"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupByType");
         operation.resultElementType = valueObjects.CompanyLookup;
        operations["lookupByType"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupCarriers");
         operation.resultElementType = valueObjects.CompanyLookup;
        operations["lookupCarriers"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "update");
         operation.resultType = String;
        operations["update"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupDocumentsPrinterLookup");
         operation.resultElementType = valueObjects.PrintersLookup;
        operations["lookupDocumentsPrinterLookup"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupLoadReportPrinter");
         operation.resultElementType = valueObjects.PrintersLookup;
        operations["lookupLoadReportPrinter"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "lookupDriverInstructions");
         operation.resultElementType = valueObjects.PrintersLookup;
        operations["lookupDriverInstructions"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getCompanies");
         operation.resultElementType = valueObjects.Companys;
        operations["getCompanies"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getTransactionCompanyTypes");
         operation.resultType = Object;
        operations["getTransactionCompanyTypes"] = operation;

        _serviceControl.operations = operations;
        _serviceControl.convertResultHandler = com.adobe.serializers.utility.TypeUtility.convertResultHandler;
        _serviceControl.source = "CompaniesService";
        _serviceControl.endpoint = "gateway.php";


         preInitializeService();
         model_internal::initialize();
    }
    
    //init initialization routine here, child class to override
    protected function preInitializeService():void
    {
        destination = "CompaniesService";
      
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
    public function count(filter:Object, order:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("count");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(filter,order) ;
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
    public function delete_method(code:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("delete");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getCompanyTypes' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getCompanyTypes() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getCompanyTypes");
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
    public function getPaged(filter:Object, order:Object, offset:int, tot:int) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getPaged");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(filter,order,offset,tot) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getRecord' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getRecord(code:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getRecord");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getTypes' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getTypes() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getTypes");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookup' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookup() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookup");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupByType' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupByType(type:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupByType");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(type) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupCarriers' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupCarriers(type:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupCarriers");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(type) ;
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
    public function update(code:String, data:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("update");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(code,data) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupDocumentsPrinterLookup' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupDocumentsPrinterLookup(cmpy_code:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupDocumentsPrinterLookup");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(cmpy_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupLoadReportPrinter' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupLoadReportPrinter(cmpy_code:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupLoadReportPrinter");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(cmpy_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'lookupDriverInstructions' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function lookupDriverInstructions(cmpy_code:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("lookupDriverInstructions");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(cmpy_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getCompanies' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getCompanies(filter:String, order:String) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getCompanies");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(filter,order) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getTransactionCompanyTypes' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getTransactionCompanyTypes() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getTransactionCompanyTypes");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
}

}
