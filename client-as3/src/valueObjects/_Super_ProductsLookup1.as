/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - ProductsLookup1.as.
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
public class _Super_ProductsLookup1 extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("ProductsLookup") == null)
            {
                flash.net.registerClassAlias("ProductsLookup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("ProductsLookup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _ProductsLookup1EntityMetadata;
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
    private var _internal_unit : Object;
    private var _internal_schedule : Object;
    private var _internal_order_id : Object;
    private var _internal_prod_code : String;
    private var _internal_prod_name : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_ProductsLookup1()
    {
        _model = new _ProductsLookup1EntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "unit", model_internal::setterListenerUnit));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schedule", model_internal::setterListenerSchedule));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_id", model_internal::setterListenerOrder_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_code", model_internal::setterListenerProd_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_name", model_internal::setterListenerProd_name));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get unit() : Object
    {
        return _internal_unit;
    }

    [Bindable(event="propertyChange")]
    public function get schedule() : Object
    {
        return _internal_schedule;
    }

    [Bindable(event="propertyChange")]
    public function get order_id() : Object
    {
        return _internal_order_id;
    }

    [Bindable(event="propertyChange")]
    public function get prod_code() : String
    {
        return _internal_prod_code;
    }

    [Bindable(event="propertyChange")]
    public function get prod_name() : String
    {
        return _internal_prod_name;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set unit(value:Object) : void
    {
        var oldValue:Object = _internal_unit;
        if (oldValue !== value)
        {
            _internal_unit = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit", oldValue, _internal_unit));
        }
    }

    public function set schedule(value:Object) : void
    {
        var oldValue:Object = _internal_schedule;
        if (oldValue !== value)
        {
            _internal_schedule = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schedule", oldValue, _internal_schedule));
        }
    }

    public function set order_id(value:Object) : void
    {
        var oldValue:Object = _internal_order_id;
        if (oldValue !== value)
        {
            _internal_order_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_id", oldValue, _internal_order_id));
        }
    }

    public function set prod_code(value:String) : void
    {
        var oldValue:String = _internal_prod_code;
        if (oldValue !== value)
        {
            _internal_prod_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_code", oldValue, _internal_prod_code));
        }
    }

    public function set prod_name(value:String) : void
    {
        var oldValue:String = _internal_prod_name;
        if (oldValue !== value)
        {
            _internal_prod_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_name", oldValue, _internal_prod_name));
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

    model_internal function setterListenerUnit(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUnit();
    }

    model_internal function setterListenerSchedule(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchedule();
    }

    model_internal function setterListenerOrder_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_id();
    }

    model_internal function setterListenerProd_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProd_code();
    }

    model_internal function setterListenerProd_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProd_name();
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
        if (!_model.unitIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_unitValidationFailureMessages);
        }
        if (!_model.scheduleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_scheduleValidationFailureMessages);
        }
        if (!_model.order_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_idValidationFailureMessages);
        }
        if (!_model.prod_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prod_codeValidationFailureMessages);
        }
        if (!_model.prod_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prod_nameValidationFailureMessages);
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
    public function get _model() : _ProductsLookup1EntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _ProductsLookup1EntityMetadata) : void
    {
        var oldValue : _ProductsLookup1EntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfUnit : Array = null;
    model_internal var _doValidationLastValOfUnit : Object;

    model_internal function _doValidationForUnit(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfUnit != null && model_internal::_doValidationLastValOfUnit == value)
           return model_internal::_doValidationCacheOfUnit ;

        _model.model_internal::_unitIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isUnitAvailable && _internal_unit == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "unit is required"));
        }

        model_internal::_doValidationCacheOfUnit = validationFailures;
        model_internal::_doValidationLastValOfUnit = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchedule : Array = null;
    model_internal var _doValidationLastValOfSchedule : Object;

    model_internal function _doValidationForSchedule(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfSchedule != null && model_internal::_doValidationLastValOfSchedule == value)
           return model_internal::_doValidationCacheOfSchedule ;

        _model.model_internal::_scheduleIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isScheduleAvailable && _internal_schedule == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schedule is required"));
        }

        model_internal::_doValidationCacheOfSchedule = validationFailures;
        model_internal::_doValidationLastValOfSchedule = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_id : Array = null;
    model_internal var _doValidationLastValOfOrder_id : Object;

    model_internal function _doValidationForOrder_id(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOrder_id != null && model_internal::_doValidationLastValOfOrder_id == value)
           return model_internal::_doValidationCacheOfOrder_id ;

        _model.model_internal::_order_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_idAvailable && _internal_order_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_id is required"));
        }

        model_internal::_doValidationCacheOfOrder_id = validationFailures;
        model_internal::_doValidationLastValOfOrder_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProd_code : Array = null;
    model_internal var _doValidationLastValOfProd_code : String;

    model_internal function _doValidationForProd_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfProd_code != null && model_internal::_doValidationLastValOfProd_code == value)
           return model_internal::_doValidationCacheOfProd_code ;

        _model.model_internal::_prod_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProd_codeAvailable && _internal_prod_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prod_code is required"));
        }

        model_internal::_doValidationCacheOfProd_code = validationFailures;
        model_internal::_doValidationLastValOfProd_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProd_name : Array = null;
    model_internal var _doValidationLastValOfProd_name : String;

    model_internal function _doValidationForProd_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfProd_name != null && model_internal::_doValidationLastValOfProd_name == value)
           return model_internal::_doValidationCacheOfProd_name ;

        _model.model_internal::_prod_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProd_nameAvailable && _internal_prod_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prod_name is required"));
        }

        model_internal::_doValidationCacheOfProd_name = validationFailures;
        model_internal::_doValidationLastValOfProd_name = value;

        return validationFailures;
    }
    

}

}
