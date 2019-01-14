/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this service wrapper you may modify the generated sub-class of this class - ManualTransactionsService.as.
 */
package services.manualtransactionsservice
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
internal class _Super_ManualTransactionsService extends com.adobe.fiber.services.wrapper.RemoteObjectServiceWrapper
{

    // Constructor
    public function _Super_ManualTransactionsService()
    {
        // initialize service control
        _serviceControl = new mx.rpc.remoting.RemoteObject();

        // initialize RemoteClass alias for all entities returned by functions of this service

        var operations:Object = new Object();
        var operation:mx.rpc.remoting.Operation;

        operation = new mx.rpc.remoting.Operation(null, "do_create");
         operation.resultType = Object;
        operations["do_create"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "createSchedule");
         operation.resultType = Object;
        operations["createSchedule"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getBaseDetails");
         operation.resultType = Object;
        operations["getBaseDetails"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getSchdTypeBySuppTrip");
         operation.resultType = Object;
        operations["getSchdTypeBySuppTrip"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getDrawerProdSchdByProd");
         operation.resultType = Object;
        operations["getDrawerProdSchdByProd"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getAllBaseDetails");
         operation.resultType = Object;
        operations["getAllBaseDetails"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "finalCheck_Submit");
         operation.resultType = Object;
        operations["finalCheck_Submit"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "saveMTData");
         operation.resultType = Object;
        operations["saveMTData"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "readMTData");
         operation.resultType = Object;
        operations["readMTData"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getCustomersBySupplier");
         operation.resultType = Object;
        operations["getCustomersBySupplier"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getOpenOrderNumberByCustomer");
         operation.resultType = Object;
        operations["getOpenOrderNumberByCustomer"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getCarriersBySuppTrip");
         operation.resultType = Object;
        operations["getCarriersBySuppTrip"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getTankersBySuppTrip");
         operation.resultType = Object;
        operations["getTankersBySuppTrip"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getEquipmentsByTanker");
         operation.resultType = Object;
        operations["getEquipmentsByTanker"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getCompartmentsByTanker");
         operation.resultType = Object;
        operations["getCompartmentsByTanker"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getOrderDetailsByTanker");
         operation.resultType = Object;
        operations["getOrderDetailsByTanker"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getScheduleDetailsBySuppTrip");
         operation.resultType = Object;
        operations["getScheduleDetailsBySuppTrip"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getTankerByCarrier_OO");
         operation.resultType = Object;
        operations["getTankerByCarrier_OO"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getCarriersByOpenOrder");
         operation.resultType = Object;
        operations["getCarriersByOpenOrder"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getAllCarriers");
         operation.resultType = Object;
        operations["getAllCarriers"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getOrderProductsByCustOrderNo");
         operation.resultType = Object;
        operations["getOrderProductsByCustOrderNo"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getAdditionalInfoByOpenOrder");
         operation.resultType = Object;
        operations["getAdditionalInfoByOpenOrder"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getTankerByCarrier");
         operation.resultType = Object;
        operations["getTankerByCarrier"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getDriverCodeBySuppDrawer");
         operation.resultType = Object;
        operations["getDriverCodeBySuppDrawer"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getTripNumberBySupplier");
         operation.resultType = Object;
        operations["getTripNumberBySupplier"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "readMTHeadData");
         operation.resultType = Object;
        operations["readMTHeadData"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "deleteMTData");
         operation.resultType = Object;
        operations["deleteMTData"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getScheduleDetailsBySuppTrip_sub1");
         operation.resultType = Object;
        operations["getScheduleDetailsBySuppTrip_sub1"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getRevTrsfBySuppTrip");
         operation.resultType = Object;
        operations["getRevTrsfBySuppTrip"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "preCheck_StartupMT");
         operation.resultType = Object;
        operations["preCheck_StartupMT"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getRevBasesBySuppProd");
         operation.resultType = Object;
        operations["getRevBasesBySuppProd"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getRevBasesTolByLoadID");
         operation.resultType = Object;
        operations["getRevBasesTolByLoadID"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getRevMetersTolByLoadID");
         operation.resultType = Object;
        operations["getRevMetersTolByLoadID"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getPreOrderDetailsByTanker");
         operation.resultType = Object;
        operations["getPreOrderDetailsByTanker"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getTankInfoByProdArm");
         operation.resultType = Object;
        operations["getTankInfoByProdArm"] = operation;
        operation = new mx.rpc.remoting.Operation(null, "getBasesVCFInfo");
         operation.resultType = Object;
        operations["getBasesVCFInfo"] = operation;

        _serviceControl.operations = operations;
        _serviceControl.convertResultHandler = com.adobe.serializers.utility.TypeUtility.convertResultHandler;
        _serviceControl.source = "ManualTransactionsService";
        _serviceControl.endpoint = "gateway.php";


         preInitializeService();
         model_internal::initialize();
    }
    
    //init initialization routine here, child class to override
    protected function preInitializeService():void
    {
        destination = "ManualTransactionsService";
      
    }
    

    /**
      * This method is a generated wrapper used to call the 'do_create' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function do_create(order_trip_ind:Object, trans:Object, num_of_transfers:Object, transfer:Object, isnomi:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("do_create");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(order_trip_ind,trans,num_of_transfers,transfer,isnomi) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'createSchedule' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function createSchedule(item_id:Object, per_code:Object, tank_code:Object, schd_qty:Object, drawer1:Object, prod1:Object, drawer2:Object, prod2:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("createSchedule");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(item_id,per_code,tank_code,schd_qty,drawer1,prod1,drawer2,prod2) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getBaseDetails' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getBaseDetails(drawer:Object, drawerprod:Object, arm:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getBaseDetails");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(drawer,drawerprod,arm) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getSchdTypeBySuppTrip' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getSchdTypeBySuppTrip(supp:Object, trip_no:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getSchdTypeBySuppTrip");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supp,trip_no) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getDrawerProdSchdByProd' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getDrawerProdSchdByProd(supp:Object, trip_no:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getDrawerProdSchdByProd");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supp,trip_no) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getAllBaseDetails' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getAllBaseDetails(drawer:Object, drawerprod:Object, arms:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getAllBaseDetails");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(drawer,drawerprod,arms) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'finalCheck_Submit' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function finalCheck_Submit(supp:Object, trip_no:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("finalCheck_Submit");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supp,trip_no) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'saveMTData' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function saveMTData(module_id:Object, module_name:Object, head_data:Object, body_data:Object, user:Object, status:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("saveMTData");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(module_id,module_name,head_data,body_data,user,status) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'readMTData' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function readMTData(seq_id:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("readMTData");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(seq_id) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getCustomersBySupplier' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getCustomersBySupplier(cmpy_code:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getCustomersBySupplier");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(cmpy_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getOpenOrderNumberByCustomer' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getOpenOrderNumberByCustomer(order_cust:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getOpenOrderNumberByCustomer");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(order_cust) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getCarriersBySuppTrip' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getCarriersBySuppTrip(supp:Object, trip_no:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getCarriersBySuppTrip");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supp,trip_no) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getTankersBySuppTrip' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getTankersBySuppTrip(supp:Object, trip_no:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getTankersBySuppTrip");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supp,trip_no) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getEquipmentsByTanker' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getEquipmentsByTanker(tanker_code:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getEquipmentsByTanker");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(tanker_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getCompartmentsByTanker' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getCompartmentsByTanker(tanker_code:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getCompartmentsByTanker");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(tanker_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getOrderDetailsByTanker' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getOrderDetailsByTanker(supp:Object, openorder_no:Object, tanker_code:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getOrderDetailsByTanker");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supp,openorder_no,tanker_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getScheduleDetailsBySuppTrip' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getScheduleDetailsBySuppTrip(supp:Object, trip_no:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getScheduleDetailsBySuppTrip");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supp,trip_no) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getTankerByCarrier_OO' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getTankerByCarrier_OO(carrier_code:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getTankerByCarrier_OO");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(carrier_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getCarriersByOpenOrder' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getCarriersByOpenOrder(open_order:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getCarriersByOpenOrder");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(open_order) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getAllCarriers' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getAllCarriers() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getAllCarriers");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getOrderProductsByCustOrderNo' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getOrderProductsByCustOrderNo(custorderno:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getOrderProductsByCustOrderNo");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(custorderno) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getAdditionalInfoByOpenOrder' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getAdditionalInfoByOpenOrder(open_order:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getAdditionalInfoByOpenOrder");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(open_order) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getTankerByCarrier' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getTankerByCarrier(carrier_code:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getTankerByCarrier");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(carrier_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getDriverCodeBySuppDrawer' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getDriverCodeBySuppDrawer(supp:Object, drawer:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getDriverCodeBySuppDrawer");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supp,drawer) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getTripNumberBySupplier' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getTripNumberBySupplier(type:Object, cmpy_code:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getTripNumberBySupplier");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(type,cmpy_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'readMTHeadData' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function readMTHeadData(seq_id:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("readMTHeadData");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(seq_id) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'deleteMTData' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function deleteMTData(seq_id:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("deleteMTData");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(seq_id) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getScheduleDetailsBySuppTrip_sub1' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getScheduleDetailsBySuppTrip_sub1(supp:Object, trip_no:Object, tanker_cd:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getScheduleDetailsBySuppTrip_sub1");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supp,trip_no,tanker_cd) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getRevTrsfBySuppTrip' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getRevTrsfBySuppTrip(supp:Object, trip_no:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getRevTrsfBySuppTrip");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supp,trip_no) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'preCheck_StartupMT' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function preCheck_StartupMT(supp:Object, trip_no:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("preCheck_StartupMT");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supp,trip_no) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getRevBasesBySuppProd' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getRevBasesBySuppProd(trsfer_id:Object, trsa_ver:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getRevBasesBySuppProd");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(trsfer_id,trsa_ver) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getRevBasesTolByLoadID' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getRevBasesTolByLoadID(load_id:Object, trsa_ver:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getRevBasesTolByLoadID");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(load_id,trsa_ver) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getRevMetersTolByLoadID' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getRevMetersTolByLoadID(load_id:Object, trsa_ver:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getRevMetersTolByLoadID");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(load_id,trsa_ver) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getPreOrderDetailsByTanker' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getPreOrderDetailsByTanker(supp:Object, trip_no:Object, tanker_code:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getPreOrderDetailsByTanker");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(supp,trip_no,tanker_code) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getTankInfoByProdArm' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getTankInfoByProdArm(drawer:Object, drawerprod:Object, arm:Object) : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getTankInfoByProdArm");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send(drawer,drawerprod,arm) ;
        return _internal_token;
    }
     
    /**
      * This method is a generated wrapper used to call the 'getBasesVCFInfo' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getBasesVCFInfo() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getBasesVCFInfo");
		var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;
        return _internal_token;
    }
     
}

}
