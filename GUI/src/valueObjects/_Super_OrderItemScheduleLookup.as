/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - OrderItemScheduleLookup.as.
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
public class _Super_OrderItemScheduleLookup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("OrderItemScheduleLookup") == null)
            {
                flash.net.registerClassAlias("OrderItemScheduleLookup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("OrderItemScheduleLookup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _OrderItemScheduleLookupEntityMetadata;
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
    private var _internal_schd_cmpt_no : String;
    private var _internal_schd_prod_unit : String;
    private var _internal_schd_prod_cmpy : String;
    private var _internal_schd_unit_name : String;
    private var _internal_schd_trip_no : String;
    private var _internal_schd_prod_name : String;
    private var _internal_schd_supp_code : String;
    private var _internal_schd_prod_qty : String;
    private var _internal_schd_supplier : String;
    private var _internal_schd_prod_code : String;
    private var _internal_schd_order_id : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_OrderItemScheduleLookup()
    {
        _model = new _OrderItemScheduleLookupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_cmpt_no", model_internal::setterListenerSchd_cmpt_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_prod_unit", model_internal::setterListenerSchd_prod_unit));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_prod_cmpy", model_internal::setterListenerSchd_prod_cmpy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_unit_name", model_internal::setterListenerSchd_unit_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_trip_no", model_internal::setterListenerSchd_trip_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_prod_name", model_internal::setterListenerSchd_prod_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_supp_code", model_internal::setterListenerSchd_supp_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_prod_qty", model_internal::setterListenerSchd_prod_qty));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_supplier", model_internal::setterListenerSchd_supplier));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_prod_code", model_internal::setterListenerSchd_prod_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_order_id", model_internal::setterListenerSchd_order_id));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get schd_cmpt_no() : String
    {
        return _internal_schd_cmpt_no;
    }

    [Bindable(event="propertyChange")]
    public function get schd_prod_unit() : String
    {
        return _internal_schd_prod_unit;
    }

    [Bindable(event="propertyChange")]
    public function get schd_prod_cmpy() : String
    {
        return _internal_schd_prod_cmpy;
    }

    [Bindable(event="propertyChange")]
    public function get schd_unit_name() : String
    {
        return _internal_schd_unit_name;
    }

    [Bindable(event="propertyChange")]
    public function get schd_trip_no() : String
    {
        return _internal_schd_trip_no;
    }

    [Bindable(event="propertyChange")]
    public function get schd_prod_name() : String
    {
        return _internal_schd_prod_name;
    }

    [Bindable(event="propertyChange")]
    public function get schd_supp_code() : String
    {
        return _internal_schd_supp_code;
    }

    [Bindable(event="propertyChange")]
    public function get schd_prod_qty() : String
    {
        return _internal_schd_prod_qty;
    }

    [Bindable(event="propertyChange")]
    public function get schd_supplier() : String
    {
        return _internal_schd_supplier;
    }

    [Bindable(event="propertyChange")]
    public function get schd_prod_code() : String
    {
        return _internal_schd_prod_code;
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

    public function set schd_cmpt_no(value:String) : void
    {
        var oldValue:String = _internal_schd_cmpt_no;
        if (oldValue !== value)
        {
            _internal_schd_cmpt_no = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_cmpt_no", oldValue, _internal_schd_cmpt_no));
        }
    }

    public function set schd_prod_unit(value:String) : void
    {
        var oldValue:String = _internal_schd_prod_unit;
        if (oldValue !== value)
        {
            _internal_schd_prod_unit = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_prod_unit", oldValue, _internal_schd_prod_unit));
        }
    }

    public function set schd_prod_cmpy(value:String) : void
    {
        var oldValue:String = _internal_schd_prod_cmpy;
        if (oldValue !== value)
        {
            _internal_schd_prod_cmpy = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_prod_cmpy", oldValue, _internal_schd_prod_cmpy));
        }
    }

    public function set schd_unit_name(value:String) : void
    {
        var oldValue:String = _internal_schd_unit_name;
        if (oldValue !== value)
        {
            _internal_schd_unit_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_unit_name", oldValue, _internal_schd_unit_name));
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

    public function set schd_prod_name(value:String) : void
    {
        var oldValue:String = _internal_schd_prod_name;
        if (oldValue !== value)
        {
            _internal_schd_prod_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_prod_name", oldValue, _internal_schd_prod_name));
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

    public function set schd_prod_qty(value:String) : void
    {
        var oldValue:String = _internal_schd_prod_qty;
        if (oldValue !== value)
        {
            _internal_schd_prod_qty = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_prod_qty", oldValue, _internal_schd_prod_qty));
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

    public function set schd_prod_code(value:String) : void
    {
        var oldValue:String = _internal_schd_prod_code;
        if (oldValue !== value)
        {
            _internal_schd_prod_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_prod_code", oldValue, _internal_schd_prod_code));
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

    model_internal function setterListenerSchd_cmpt_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_cmpt_no();
    }

    model_internal function setterListenerSchd_prod_unit(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_prod_unit();
    }

    model_internal function setterListenerSchd_prod_cmpy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_prod_cmpy();
    }

    model_internal function setterListenerSchd_unit_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_unit_name();
    }

    model_internal function setterListenerSchd_trip_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_trip_no();
    }

    model_internal function setterListenerSchd_prod_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_prod_name();
    }

    model_internal function setterListenerSchd_supp_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_supp_code();
    }

    model_internal function setterListenerSchd_prod_qty(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_prod_qty();
    }

    model_internal function setterListenerSchd_supplier(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_supplier();
    }

    model_internal function setterListenerSchd_prod_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_prod_code();
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
        if (!_model.schd_cmpt_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_cmpt_noValidationFailureMessages);
        }
        if (!_model.schd_prod_unitIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_prod_unitValidationFailureMessages);
        }
        if (!_model.schd_prod_cmpyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_prod_cmpyValidationFailureMessages);
        }
        if (!_model.schd_unit_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_unit_nameValidationFailureMessages);
        }
        if (!_model.schd_trip_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_trip_noValidationFailureMessages);
        }
        if (!_model.schd_prod_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_prod_nameValidationFailureMessages);
        }
        if (!_model.schd_supp_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_supp_codeValidationFailureMessages);
        }
        if (!_model.schd_prod_qtyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_prod_qtyValidationFailureMessages);
        }
        if (!_model.schd_supplierIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_supplierValidationFailureMessages);
        }
        if (!_model.schd_prod_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_prod_codeValidationFailureMessages);
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
    public function get _model() : _OrderItemScheduleLookupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _OrderItemScheduleLookupEntityMetadata) : void
    {
        var oldValue : _OrderItemScheduleLookupEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfSchd_cmpt_no : Array = null;
    model_internal var _doValidationLastValOfSchd_cmpt_no : String;

    model_internal function _doValidationForSchd_cmpt_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_cmpt_no != null && model_internal::_doValidationLastValOfSchd_cmpt_no == value)
           return model_internal::_doValidationCacheOfSchd_cmpt_no ;

        _model.model_internal::_schd_cmpt_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_cmpt_noAvailable && _internal_schd_cmpt_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_cmpt_no is required"));
        }

        model_internal::_doValidationCacheOfSchd_cmpt_no = validationFailures;
        model_internal::_doValidationLastValOfSchd_cmpt_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchd_prod_unit : Array = null;
    model_internal var _doValidationLastValOfSchd_prod_unit : String;

    model_internal function _doValidationForSchd_prod_unit(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_prod_unit != null && model_internal::_doValidationLastValOfSchd_prod_unit == value)
           return model_internal::_doValidationCacheOfSchd_prod_unit ;

        _model.model_internal::_schd_prod_unitIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_prod_unitAvailable && _internal_schd_prod_unit == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_prod_unit is required"));
        }

        model_internal::_doValidationCacheOfSchd_prod_unit = validationFailures;
        model_internal::_doValidationLastValOfSchd_prod_unit = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchd_prod_cmpy : Array = null;
    model_internal var _doValidationLastValOfSchd_prod_cmpy : String;

    model_internal function _doValidationForSchd_prod_cmpy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_prod_cmpy != null && model_internal::_doValidationLastValOfSchd_prod_cmpy == value)
           return model_internal::_doValidationCacheOfSchd_prod_cmpy ;

        _model.model_internal::_schd_prod_cmpyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_prod_cmpyAvailable && _internal_schd_prod_cmpy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_prod_cmpy is required"));
        }

        model_internal::_doValidationCacheOfSchd_prod_cmpy = validationFailures;
        model_internal::_doValidationLastValOfSchd_prod_cmpy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchd_unit_name : Array = null;
    model_internal var _doValidationLastValOfSchd_unit_name : String;

    model_internal function _doValidationForSchd_unit_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_unit_name != null && model_internal::_doValidationLastValOfSchd_unit_name == value)
           return model_internal::_doValidationCacheOfSchd_unit_name ;

        _model.model_internal::_schd_unit_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_unit_nameAvailable && _internal_schd_unit_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_unit_name is required"));
        }

        model_internal::_doValidationCacheOfSchd_unit_name = validationFailures;
        model_internal::_doValidationLastValOfSchd_unit_name = value;

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
    
    model_internal var _doValidationCacheOfSchd_prod_name : Array = null;
    model_internal var _doValidationLastValOfSchd_prod_name : String;

    model_internal function _doValidationForSchd_prod_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_prod_name != null && model_internal::_doValidationLastValOfSchd_prod_name == value)
           return model_internal::_doValidationCacheOfSchd_prod_name ;

        _model.model_internal::_schd_prod_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_prod_nameAvailable && _internal_schd_prod_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_prod_name is required"));
        }

        model_internal::_doValidationCacheOfSchd_prod_name = validationFailures;
        model_internal::_doValidationLastValOfSchd_prod_name = value;

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
    
    model_internal var _doValidationCacheOfSchd_prod_qty : Array = null;
    model_internal var _doValidationLastValOfSchd_prod_qty : String;

    model_internal function _doValidationForSchd_prod_qty(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_prod_qty != null && model_internal::_doValidationLastValOfSchd_prod_qty == value)
           return model_internal::_doValidationCacheOfSchd_prod_qty ;

        _model.model_internal::_schd_prod_qtyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_prod_qtyAvailable && _internal_schd_prod_qty == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_prod_qty is required"));
        }

        model_internal::_doValidationCacheOfSchd_prod_qty = validationFailures;
        model_internal::_doValidationLastValOfSchd_prod_qty = value;

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
    
    model_internal var _doValidationCacheOfSchd_prod_code : Array = null;
    model_internal var _doValidationLastValOfSchd_prod_code : String;

    model_internal function _doValidationForSchd_prod_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchd_prod_code != null && model_internal::_doValidationLastValOfSchd_prod_code == value)
           return model_internal::_doValidationCacheOfSchd_prod_code ;

        _model.model_internal::_schd_prod_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_prod_codeAvailable && _internal_schd_prod_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_prod_code is required"));
        }

        model_internal::_doValidationCacheOfSchd_prod_code = validationFailures;
        model_internal::_doValidationLastValOfSchd_prod_code = value;

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
