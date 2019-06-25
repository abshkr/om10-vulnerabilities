/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - OrderScheduleLookup.as.
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
public class _Super_OrderScheduleLookup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("OrderScheduleLookup") == null)
            {
                flash.net.registerClassAlias("OrderScheduleLookup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("OrderScheduleLookup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _OrderScheduleLookupEntityMetadata;
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
    private var _internal_schd_status : String;
    private var _internal_schd_carrier : String;
    private var _internal_schd_trip_no : String;
    private var _internal_schd_tanker : Object;
    private var _internal_schd_supp_code : String;
    private var _internal_schd_carr_code : String;
    private var _internal_schd_supplier : String;
    private var _internal_schd_status_code : String;
    private var _internal_schd_date : String;
    private var _internal_schd_tnkr_code : String;
    private var _internal_schd_order_id : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_OrderScheduleLookup()
    {
        _model = new _OrderScheduleLookupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_status", model_internal::setterListenerSchd_status));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_carrier", model_internal::setterListenerSchd_carrier));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_trip_no", model_internal::setterListenerSchd_trip_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_tanker", model_internal::setterListenerSchd_tanker));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_supp_code", model_internal::setterListenerSchd_supp_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_carr_code", model_internal::setterListenerSchd_carr_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_supplier", model_internal::setterListenerSchd_supplier));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_status_code", model_internal::setterListenerSchd_status_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_date", model_internal::setterListenerSchd_date));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_tnkr_code", model_internal::setterListenerSchd_tnkr_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_order_id", model_internal::setterListenerSchd_order_id));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get schd_status() : String
    {
        return _internal_schd_status;
    }

    [Bindable(event="propertyChange")]
    public function get schd_carrier() : String
    {
        return _internal_schd_carrier;
    }

    [Bindable(event="propertyChange")]
    public function get schd_trip_no() : String
    {
        return _internal_schd_trip_no;
    }

    [Bindable(event="propertyChange")]
    public function get schd_tanker() : Object
    {
        return _internal_schd_tanker;
    }

    [Bindable(event="propertyChange")]
    public function get schd_supp_code() : String
    {
        return _internal_schd_supp_code;
    }

    [Bindable(event="propertyChange")]
    public function get schd_carr_code() : String
    {
        return _internal_schd_carr_code;
    }

    [Bindable(event="propertyChange")]
    public function get schd_supplier() : String
    {
        return _internal_schd_supplier;
    }

    [Bindable(event="propertyChange")]
    public function get schd_status_code() : String
    {
        return _internal_schd_status_code;
    }

    [Bindable(event="propertyChange")]
    public function get schd_date() : String
    {
        return _internal_schd_date;
    }

    [Bindable(event="propertyChange")]
    public function get schd_tnkr_code() : String
    {
        return _internal_schd_tnkr_code;
    }

    [Bindable(event="propertyChange")]
    public function get schd_order_id() : String
    {
        return _internal_schd_order_id;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set schd_status(value:String) : void
    {
        var oldValue:String = _internal_schd_status;
        if (oldValue !== value)
        {
            _internal_schd_status = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_status", oldValue, _internal_schd_status));
        }
    }

    public function set schd_carrier(value:String) : void
    {
        var oldValue:String = _internal_schd_carrier;
        if (oldValue !== value)
        {
            _internal_schd_carrier = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_carrier", oldValue, _internal_schd_carrier));
        }
    }

    public function set schd_trip_no(value:String) : void
    {
        var oldValue:String = _internal_schd_trip_no;
        if (oldValue !== value)
        {
            _internal_schd_trip_no = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_trip_no", oldValue, _internal_schd_trip_no));
        }
    }

    public function set schd_tanker(value:Object) : void
    {
        var oldValue:Object = _internal_schd_tanker;
        if (oldValue !== value)
        {
            _internal_schd_tanker = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_tanker", oldValue, _internal_schd_tanker));
        }
    }

    public function set schd_supp_code(value:String) : void
    {
        var oldValue:String = _internal_schd_supp_code;
        if (oldValue !== value)
        {
            _internal_schd_supp_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_supp_code", oldValue, _internal_schd_supp_code));
        }
    }

    public function set schd_carr_code(value:String) : void
    {
        var oldValue:String = _internal_schd_carr_code;
        if (oldValue !== value)
        {
            _internal_schd_carr_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_carr_code", oldValue, _internal_schd_carr_code));
        }
    }

    public function set schd_supplier(value:String) : void
    {
        var oldValue:String = _internal_schd_supplier;
        if (oldValue !== value)
        {
            _internal_schd_supplier = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_supplier", oldValue, _internal_schd_supplier));
        }
    }

    public function set schd_status_code(value:String) : void
    {
        var oldValue:String = _internal_schd_status_code;
        if (oldValue !== value)
        {
            _internal_schd_status_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_status_code", oldValue, _internal_schd_status_code));
        }
    }

    public function set schd_date(value:String) : void
    {
        var oldValue:String = _internal_schd_date;
        if (oldValue !== value)
        {
            _internal_schd_date = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_date", oldValue, _internal_schd_date));
        }
    }

    public function set schd_tnkr_code(value:String) : void
    {
        var oldValue:String = _internal_schd_tnkr_code;
        if (oldValue !== value)
        {
            _internal_schd_tnkr_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_tnkr_code", oldValue, _internal_schd_tnkr_code));
        }
    }

    public function set schd_order_id(value:String) : void
    {
        var oldValue:String = _internal_schd_order_id;
        if (oldValue !== value)
        {
            _internal_schd_order_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_order_id", oldValue, _internal_schd_order_id));
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

    model_internal function setterListenerSchd_status(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_status();
    }

    model_internal function setterListenerSchd_carrier(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_carrier();
    }

    model_internal function setterListenerSchd_trip_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_trip_no();
    }

    model_internal function setterListenerSchd_tanker(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_tanker();
    }

    model_internal function setterListenerSchd_supp_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_supp_code();
    }

    model_internal function setterListenerSchd_carr_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_carr_code();
    }

    model_internal function setterListenerSchd_supplier(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_supplier();
    }

    model_internal function setterListenerSchd_status_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_status_code();
    }

    model_internal function setterListenerSchd_date(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_date();
    }

    model_internal function setterListenerSchd_tnkr_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_tnkr_code();
    }

    model_internal function setterListenerSchd_order_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_order_id();
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
        if (!_model.schd_statusIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_statusValidationFailureMessages);
        }
        if (!_model.schd_carrierIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_carrierValidationFailureMessages);
        }
        if (!_model.schd_trip_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_trip_noValidationFailureMessages);
        }
        if (!_model.schd_tankerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_tankerValidationFailureMessages);
        }
        if (!_model.schd_supp_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_supp_codeValidationFailureMessages);
        }
        if (!_model.schd_carr_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_carr_codeValidationFailureMessages);
        }
        if (!_model.schd_supplierIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_supplierValidationFailureMessages);
        }
        if (!_model.schd_status_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_status_codeValidationFailureMessages);
        }
        if (!_model.schd_dateIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_dateValidationFailureMessages);
        }
        if (!_model.schd_tnkr_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_tnkr_codeValidationFailureMessages);
        }
        if (!_model.schd_order_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_order_idValidationFailureMessages);
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
    public function get _model() : _OrderScheduleLookupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _OrderScheduleLookupEntityMetadata) : void
    {
        var oldValue : _OrderScheduleLookupEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfSchd_status : Array = null;
    model_internal var _doValidationLastValOfSchd_status : String;

    model_internal function _doValidationForSchd_status(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_status != null && model_internal::_doValidationLastValOfSchd_status == value)
           return model_internal::_doValidationCacheOfSchd_status ;

        _model.model_internal::_schd_statusIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_statusAvailable && _internal_schd_status == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_status is required"));
        }

        model_internal::_doValidationCacheOfSchd_status = validationFailures;
        model_internal::_doValidationLastValOfSchd_status = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchd_carrier : Array = null;
    model_internal var _doValidationLastValOfSchd_carrier : String;

    model_internal function _doValidationForSchd_carrier(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_carrier != null && model_internal::_doValidationLastValOfSchd_carrier == value)
           return model_internal::_doValidationCacheOfSchd_carrier ;

        _model.model_internal::_schd_carrierIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_carrierAvailable && _internal_schd_carrier == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_carrier is required"));
        }

        model_internal::_doValidationCacheOfSchd_carrier = validationFailures;
        model_internal::_doValidationLastValOfSchd_carrier = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchd_trip_no : Array = null;
    model_internal var _doValidationLastValOfSchd_trip_no : String;

    model_internal function _doValidationForSchd_trip_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_trip_no != null && model_internal::_doValidationLastValOfSchd_trip_no == value)
           return model_internal::_doValidationCacheOfSchd_trip_no ;

        _model.model_internal::_schd_trip_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_trip_noAvailable && _internal_schd_trip_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_trip_no is required"));
        }

        model_internal::_doValidationCacheOfSchd_trip_no = validationFailures;
        model_internal::_doValidationLastValOfSchd_trip_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchd_tanker : Array = null;
    model_internal var _doValidationLastValOfSchd_tanker : Object;

    model_internal function _doValidationForSchd_tanker(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfSchd_tanker != null && model_internal::_doValidationLastValOfSchd_tanker == value)
           return model_internal::_doValidationCacheOfSchd_tanker ;

        _model.model_internal::_schd_tankerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_tankerAvailable && _internal_schd_tanker == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_tanker is required"));
        }

        model_internal::_doValidationCacheOfSchd_tanker = validationFailures;
        model_internal::_doValidationLastValOfSchd_tanker = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchd_supp_code : Array = null;
    model_internal var _doValidationLastValOfSchd_supp_code : String;

    model_internal function _doValidationForSchd_supp_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_supp_code != null && model_internal::_doValidationLastValOfSchd_supp_code == value)
           return model_internal::_doValidationCacheOfSchd_supp_code ;

        _model.model_internal::_schd_supp_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_supp_codeAvailable && _internal_schd_supp_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_supp_code is required"));
        }

        model_internal::_doValidationCacheOfSchd_supp_code = validationFailures;
        model_internal::_doValidationLastValOfSchd_supp_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchd_carr_code : Array = null;
    model_internal var _doValidationLastValOfSchd_carr_code : String;

    model_internal function _doValidationForSchd_carr_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_carr_code != null && model_internal::_doValidationLastValOfSchd_carr_code == value)
           return model_internal::_doValidationCacheOfSchd_carr_code ;

        _model.model_internal::_schd_carr_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_carr_codeAvailable && _internal_schd_carr_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_carr_code is required"));
        }

        model_internal::_doValidationCacheOfSchd_carr_code = validationFailures;
        model_internal::_doValidationLastValOfSchd_carr_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchd_supplier : Array = null;
    model_internal var _doValidationLastValOfSchd_supplier : String;

    model_internal function _doValidationForSchd_supplier(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_supplier != null && model_internal::_doValidationLastValOfSchd_supplier == value)
           return model_internal::_doValidationCacheOfSchd_supplier ;

        _model.model_internal::_schd_supplierIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_supplierAvailable && _internal_schd_supplier == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_supplier is required"));
        }

        model_internal::_doValidationCacheOfSchd_supplier = validationFailures;
        model_internal::_doValidationLastValOfSchd_supplier = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchd_status_code : Array = null;
    model_internal var _doValidationLastValOfSchd_status_code : String;

    model_internal function _doValidationForSchd_status_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_status_code != null && model_internal::_doValidationLastValOfSchd_status_code == value)
           return model_internal::_doValidationCacheOfSchd_status_code ;

        _model.model_internal::_schd_status_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_status_codeAvailable && _internal_schd_status_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_status_code is required"));
        }

        model_internal::_doValidationCacheOfSchd_status_code = validationFailures;
        model_internal::_doValidationLastValOfSchd_status_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchd_date : Array = null;
    model_internal var _doValidationLastValOfSchd_date : String;

    model_internal function _doValidationForSchd_date(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_date != null && model_internal::_doValidationLastValOfSchd_date == value)
           return model_internal::_doValidationCacheOfSchd_date ;

        _model.model_internal::_schd_dateIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_dateAvailable && _internal_schd_date == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_date is required"));
        }

        model_internal::_doValidationCacheOfSchd_date = validationFailures;
        model_internal::_doValidationLastValOfSchd_date = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchd_tnkr_code : Array = null;
    model_internal var _doValidationLastValOfSchd_tnkr_code : String;

    model_internal function _doValidationForSchd_tnkr_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_tnkr_code != null && model_internal::_doValidationLastValOfSchd_tnkr_code == value)
           return model_internal::_doValidationCacheOfSchd_tnkr_code ;

        _model.model_internal::_schd_tnkr_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_tnkr_codeAvailable && _internal_schd_tnkr_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_tnkr_code is required"));
        }

        model_internal::_doValidationCacheOfSchd_tnkr_code = validationFailures;
        model_internal::_doValidationLastValOfSchd_tnkr_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchd_order_id : Array = null;
    model_internal var _doValidationLastValOfSchd_order_id : String;

    model_internal function _doValidationForSchd_order_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_order_id != null && model_internal::_doValidationLastValOfSchd_order_id == value)
           return model_internal::_doValidationCacheOfSchd_order_id ;

        _model.model_internal::_schd_order_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_order_idAvailable && _internal_schd_order_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_order_id is required"));
        }

        model_internal::_doValidationCacheOfSchd_order_id = validationFailures;
        model_internal::_doValidationLastValOfSchd_order_id = value;

        return validationFailures;
    }
    

}

}
