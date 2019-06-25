/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - OrderTripLookup.as.
 */

package valueObjects
{
import com.adobe.fiber.services.IFiberManagingService;
import com.adobe.fiber.util.FiberUtils;
import com.adobe.fiber.valueobjects.IValueObject;
import flash.events.Event;
import flash.events.EventDispatcher;
import mx.binding.utils.ChangeWatcher;
import mx.collections.ArrayCollection;
import mx.events.PropertyChangeEvent;
import mx.validators.ValidationResult;

import flash.net.registerClassAlias;
import flash.net.getClassByAlias;
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.valueobjects.IPropertyIterator;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;

use namespace model_internal;

[ExcludeClass]
public class _Super_OrderTripLookup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("OrderTripLookup") == null)
            {
                flash.net.registerClassAlias("OrderTripLookup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("OrderTripLookup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _OrderTripLookupEntityMetadata;
    model_internal var _changedObjects:mx.collections.ArrayCollection = new ArrayCollection();

    public function getChangedObjects() : Array
    {
        _changedObjects.addItemAt(this,0);
        return _changedObjects.source;
    }

    public function clearChangedObjects() : void
    {
        _changedObjects.removeAll();
    }

    /**
     * properties
     */
    private var _internal_trip_carrier : String;
    private var _internal_load_operator : String;
    private var _internal_trip_owner : String;
    private var _internal_trip_no : String;
    private var _internal_trip_supplier : String;
    private var _internal_load_terminal : String;
    private var _internal_trip_status : String;
    private var _internal_load_number : String;
    private var _internal_load_id : String;
    private var _internal_trip_tanker : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_OrderTripLookup()
    {
        _model = new _OrderTripLookupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trip_carrier", model_internal::setterListenerTrip_carrier));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "load_operator", model_internal::setterListenerLoad_operator));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trip_owner", model_internal::setterListenerTrip_owner));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trip_no", model_internal::setterListenerTrip_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trip_supplier", model_internal::setterListenerTrip_supplier));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "load_terminal", model_internal::setterListenerLoad_terminal));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trip_status", model_internal::setterListenerTrip_status));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "load_number", model_internal::setterListenerLoad_number));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "load_id", model_internal::setterListenerLoad_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trip_tanker", model_internal::setterListenerTrip_tanker));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get trip_carrier() : String
    {
        return _internal_trip_carrier;
    }

    [Bindable(event="propertyChange")]
    public function get load_operator() : String
    {
        return _internal_load_operator;
    }

    [Bindable(event="propertyChange")]
    public function get trip_owner() : String
    {
        return _internal_trip_owner;
    }

    [Bindable(event="propertyChange")]
    public function get trip_no() : String
    {
        return _internal_trip_no;
    }

    [Bindable(event="propertyChange")]
    public function get trip_supplier() : String
    {
        return _internal_trip_supplier;
    }

    [Bindable(event="propertyChange")]
    public function get load_terminal() : String
    {
        return _internal_load_terminal;
    }

    [Bindable(event="propertyChange")]
    public function get trip_status() : String
    {
        return _internal_trip_status;
    }

    [Bindable(event="propertyChange")]
    public function get load_number() : String
    {
        return _internal_load_number;
    }

    [Bindable(event="propertyChange")]
    public function get load_id() : String
    {
        return _internal_load_id;
    }

    [Bindable(event="propertyChange")]
    public function get trip_tanker() : String
    {
        return _internal_trip_tanker;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set trip_carrier(value:String) : void
    {
        var oldValue:String = _internal_trip_carrier;
        if (oldValue !== value)
        {
            _internal_trip_carrier = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_carrier", oldValue, _internal_trip_carrier));
        }
    }

    public function set load_operator(value:String) : void
    {
        var oldValue:String = _internal_load_operator;
        if (oldValue !== value)
        {
            _internal_load_operator = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_operator", oldValue, _internal_load_operator));
        }
    }

    public function set trip_owner(value:String) : void
    {
        var oldValue:String = _internal_trip_owner;
        if (oldValue !== value)
        {
            _internal_trip_owner = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_owner", oldValue, _internal_trip_owner));
        }
    }

    public function set trip_no(value:String) : void
    {
        var oldValue:String = _internal_trip_no;
        if (oldValue !== value)
        {
            _internal_trip_no = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_no", oldValue, _internal_trip_no));
        }
    }

    public function set trip_supplier(value:String) : void
    {
        var oldValue:String = _internal_trip_supplier;
        if (oldValue !== value)
        {
            _internal_trip_supplier = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_supplier", oldValue, _internal_trip_supplier));
        }
    }

    public function set load_terminal(value:String) : void
    {
        var oldValue:String = _internal_load_terminal;
        if (oldValue !== value)
        {
            _internal_load_terminal = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_terminal", oldValue, _internal_load_terminal));
        }
    }

    public function set trip_status(value:String) : void
    {
        var oldValue:String = _internal_trip_status;
        if (oldValue !== value)
        {
            _internal_trip_status = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_status", oldValue, _internal_trip_status));
        }
    }

    public function set load_number(value:String) : void
    {
        var oldValue:String = _internal_load_number;
        if (oldValue !== value)
        {
            _internal_load_number = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_number", oldValue, _internal_load_number));
        }
    }

    public function set load_id(value:String) : void
    {
        var oldValue:String = _internal_load_id;
        if (oldValue !== value)
        {
            _internal_load_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_id", oldValue, _internal_load_id));
        }
    }

    public function set trip_tanker(value:String) : void
    {
        var oldValue:String = _internal_trip_tanker;
        if (oldValue !== value)
        {
            _internal_trip_tanker = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_tanker", oldValue, _internal_trip_tanker));
        }
    }

    /**
     * Data/source property setter listeners
     *
     * Each data property whose value affects other properties or the validity of the entity
     * needs to invalidate all previously calculated artifacts. These include:
     *  - any derived properties or constraints that reference the given data property.
     *  - any availability guards (variant expressions) that reference the given data property.
     *  - any style validations, message tokens or guards that reference the given data property.
     *  - the validity of the property (and the containing entity) if the given data property has a length restriction.
     *  - the validity of the property (and the containing entity) if the given data property is required.
     */

    model_internal function setterListenerTrip_carrier(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrip_carrier();
    }

    model_internal function setterListenerLoad_operator(value:flash.events.Event):void
    {
        _model.invalidateDependentOnLoad_operator();
    }

    model_internal function setterListenerTrip_owner(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrip_owner();
    }

    model_internal function setterListenerTrip_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrip_no();
    }

    model_internal function setterListenerTrip_supplier(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrip_supplier();
    }

    model_internal function setterListenerLoad_terminal(value:flash.events.Event):void
    {
        _model.invalidateDependentOnLoad_terminal();
    }

    model_internal function setterListenerTrip_status(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrip_status();
    }

    model_internal function setterListenerLoad_number(value:flash.events.Event):void
    {
        _model.invalidateDependentOnLoad_number();
    }

    model_internal function setterListenerLoad_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnLoad_id();
    }

    model_internal function setterListenerTrip_tanker(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrip_tanker();
    }


    /**
     * valid related derived properties
     */
    model_internal var _isValid : Boolean;
    model_internal var _invalidConstraints:Array = new Array();
    model_internal var _validationFailureMessages:Array = new Array();

    /**
     * derived property calculators
     */

    /**
     * isValid calculator
     */
    model_internal function calculateIsValid():Boolean
    {
        var violatedConsts:Array = new Array();
        var validationFailureMessages:Array = new Array();

        var propertyValidity:Boolean = true;
        if (!_model.trip_carrierIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trip_carrierValidationFailureMessages);
        }
        if (!_model.load_operatorIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_load_operatorValidationFailureMessages);
        }
        if (!_model.trip_ownerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trip_ownerValidationFailureMessages);
        }
        if (!_model.trip_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trip_noValidationFailureMessages);
        }
        if (!_model.trip_supplierIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trip_supplierValidationFailureMessages);
        }
        if (!_model.load_terminalIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_load_terminalValidationFailureMessages);
        }
        if (!_model.trip_statusIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trip_statusValidationFailureMessages);
        }
        if (!_model.load_numberIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_load_numberValidationFailureMessages);
        }
        if (!_model.load_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_load_idValidationFailureMessages);
        }
        if (!_model.trip_tankerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trip_tankerValidationFailureMessages);
        }

        model_internal::_cacheInitialized_isValid = true;
        model_internal::invalidConstraints_der = violatedConsts;
        model_internal::validationFailureMessages_der = validationFailureMessages;
        return violatedConsts.length == 0 && propertyValidity;
    }

    /**
     * derived property setters
     */

    model_internal function set isValid_der(value:Boolean) : void
    {
        var oldValue:Boolean = model_internal::_isValid;
        if (oldValue !== value)
        {
            model_internal::_isValid = value;
            _model.model_internal::fireChangeEvent("isValid", oldValue, model_internal::_isValid);
        }
    }

    /**
     * derived property getters
     */

    [Transient]
    [Bindable(event="propertyChange")]
    public function get _model() : _OrderTripLookupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _OrderTripLookupEntityMetadata) : void
    {
        var oldValue : _OrderTripLookupEntityMetadata = model_internal::_dminternal_model;
        if (oldValue !== value)
        {
            model_internal::_dminternal_model = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "_model", oldValue, model_internal::_dminternal_model));
        }
    }

    /**
     * methods
     */


    /**
     *  services
     */
    private var _managingService:com.adobe.fiber.services.IFiberManagingService;

    public function set managingService(managingService:com.adobe.fiber.services.IFiberManagingService):void
    {
        _managingService = managingService;
    }

    model_internal function set invalidConstraints_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_invalidConstraints;
        // avoid firing the event when old and new value are different empty arrays
        if (oldValue !== value && (oldValue.length > 0 || value.length > 0))
        {
            model_internal::_invalidConstraints = value;
            _model.model_internal::fireChangeEvent("invalidConstraints", oldValue, model_internal::_invalidConstraints);
        }
    }

    model_internal function set validationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_validationFailureMessages;
        // avoid firing the event when old and new value are different empty arrays
        if (oldValue !== value && (oldValue.length > 0 || value.length > 0))
        {
            model_internal::_validationFailureMessages = value;
            _model.model_internal::fireChangeEvent("validationFailureMessages", oldValue, model_internal::_validationFailureMessages);
        }
    }

    model_internal var _doValidationCacheOfTrip_carrier : Array = null;
    model_internal var _doValidationLastValOfTrip_carrier : String;

    model_internal function _doValidationForTrip_carrier(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrip_carrier != null && model_internal::_doValidationLastValOfTrip_carrier == value)
           return model_internal::_doValidationCacheOfTrip_carrier ;

        _model.model_internal::_trip_carrierIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrip_carrierAvailable && _internal_trip_carrier == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trip_carrier is required"));
        }

        model_internal::_doValidationCacheOfTrip_carrier = validationFailures;
        model_internal::_doValidationLastValOfTrip_carrier = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfLoad_operator : Array = null;
    model_internal var _doValidationLastValOfLoad_operator : String;

    model_internal function _doValidationForLoad_operator(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfLoad_operator != null && model_internal::_doValidationLastValOfLoad_operator == value)
           return model_internal::_doValidationCacheOfLoad_operator ;

        _model.model_internal::_load_operatorIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isLoad_operatorAvailable && _internal_load_operator == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "load_operator is required"));
        }

        model_internal::_doValidationCacheOfLoad_operator = validationFailures;
        model_internal::_doValidationLastValOfLoad_operator = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrip_owner : Array = null;
    model_internal var _doValidationLastValOfTrip_owner : String;

    model_internal function _doValidationForTrip_owner(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrip_owner != null && model_internal::_doValidationLastValOfTrip_owner == value)
           return model_internal::_doValidationCacheOfTrip_owner ;

        _model.model_internal::_trip_ownerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrip_ownerAvailable && _internal_trip_owner == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trip_owner is required"));
        }

        model_internal::_doValidationCacheOfTrip_owner = validationFailures;
        model_internal::_doValidationLastValOfTrip_owner = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrip_no : Array = null;
    model_internal var _doValidationLastValOfTrip_no : String;

    model_internal function _doValidationForTrip_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrip_no != null && model_internal::_doValidationLastValOfTrip_no == value)
           return model_internal::_doValidationCacheOfTrip_no ;

        _model.model_internal::_trip_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrip_noAvailable && _internal_trip_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trip_no is required"));
        }

        model_internal::_doValidationCacheOfTrip_no = validationFailures;
        model_internal::_doValidationLastValOfTrip_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrip_supplier : Array = null;
    model_internal var _doValidationLastValOfTrip_supplier : String;

    model_internal function _doValidationForTrip_supplier(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrip_supplier != null && model_internal::_doValidationLastValOfTrip_supplier == value)
           return model_internal::_doValidationCacheOfTrip_supplier ;

        _model.model_internal::_trip_supplierIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrip_supplierAvailable && _internal_trip_supplier == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trip_supplier is required"));
        }

        model_internal::_doValidationCacheOfTrip_supplier = validationFailures;
        model_internal::_doValidationLastValOfTrip_supplier = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfLoad_terminal : Array = null;
    model_internal var _doValidationLastValOfLoad_terminal : String;

    model_internal function _doValidationForLoad_terminal(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfLoad_terminal != null && model_internal::_doValidationLastValOfLoad_terminal == value)
           return model_internal::_doValidationCacheOfLoad_terminal ;

        _model.model_internal::_load_terminalIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isLoad_terminalAvailable && _internal_load_terminal == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "load_terminal is required"));
        }

        model_internal::_doValidationCacheOfLoad_terminal = validationFailures;
        model_internal::_doValidationLastValOfLoad_terminal = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrip_status : Array = null;
    model_internal var _doValidationLastValOfTrip_status : String;

    model_internal function _doValidationForTrip_status(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrip_status != null && model_internal::_doValidationLastValOfTrip_status == value)
           return model_internal::_doValidationCacheOfTrip_status ;

        _model.model_internal::_trip_statusIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrip_statusAvailable && _internal_trip_status == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trip_status is required"));
        }

        model_internal::_doValidationCacheOfTrip_status = validationFailures;
        model_internal::_doValidationLastValOfTrip_status = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfLoad_number : Array = null;
    model_internal var _doValidationLastValOfLoad_number : String;

    model_internal function _doValidationForLoad_number(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfLoad_number != null && model_internal::_doValidationLastValOfLoad_number == value)
           return model_internal::_doValidationCacheOfLoad_number ;

        _model.model_internal::_load_numberIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isLoad_numberAvailable && _internal_load_number == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "load_number is required"));
        }

        model_internal::_doValidationCacheOfLoad_number = validationFailures;
        model_internal::_doValidationLastValOfLoad_number = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfLoad_id : Array = null;
    model_internal var _doValidationLastValOfLoad_id : String;

    model_internal function _doValidationForLoad_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfLoad_id != null && model_internal::_doValidationLastValOfLoad_id == value)
           return model_internal::_doValidationCacheOfLoad_id ;

        _model.model_internal::_load_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isLoad_idAvailable && _internal_load_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "load_id is required"));
        }

        model_internal::_doValidationCacheOfLoad_id = validationFailures;
        model_internal::_doValidationLastValOfLoad_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrip_tanker : Array = null;
    model_internal var _doValidationLastValOfTrip_tanker : String;

    model_internal function _doValidationForTrip_tanker(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrip_tanker != null && model_internal::_doValidationLastValOfTrip_tanker == value)
           return model_internal::_doValidationCacheOfTrip_tanker ;

        _model.model_internal::_trip_tankerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrip_tankerAvailable && _internal_trip_tanker == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trip_tanker is required"));
        }

        model_internal::_doValidationCacheOfTrip_tanker = validationFailures;
        model_internal::_doValidationLastValOfTrip_tanker = value;

        return validationFailures;
    }
    

}

}
