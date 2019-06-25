/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - OrderProductLookup.as.
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
public class _Super_OrderProductLookup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("OrderProductLookup") == null)
            {
                flash.net.registerClassAlias("OrderProductLookup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("OrderProductLookup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _OrderProductLookupEntityMetadata;
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
    private var _internal_prod_cmpy : String;
    private var _internal_prod_class : String;
    private var _internal_prod_cmpy_name : String;
    private var _internal_prod_is_blend : Object;
    private var _internal_prod_rpt_unit : Object;
    private var _internal_prod_rpt_temp : Object;
    private var _internal_prod_prod_group : Object;
    private var _internal_prod_code : String;
    private var _internal_prod_name : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_OrderProductLookup()
    {
        _model = new _OrderProductLookupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_cmpy", model_internal::setterListenerProd_cmpy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_class", model_internal::setterListenerProd_class));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_cmpy_name", model_internal::setterListenerProd_cmpy_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_is_blend", model_internal::setterListenerProd_is_blend));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_rpt_unit", model_internal::setterListenerProd_rpt_unit));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_rpt_temp", model_internal::setterListenerProd_rpt_temp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_prod_group", model_internal::setterListenerProd_prod_group));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_code", model_internal::setterListenerProd_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_name", model_internal::setterListenerProd_name));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get prod_cmpy() : String
    {
        return _internal_prod_cmpy;
    }

    [Bindable(event="propertyChange")]
    public function get prod_class() : String
    {
        return _internal_prod_class;
    }

    [Bindable(event="propertyChange")]
    public function get prod_cmpy_name() : String
    {
        return _internal_prod_cmpy_name;
    }

    [Bindable(event="propertyChange")]
    public function get prod_is_blend() : Object
    {
        return _internal_prod_is_blend;
    }

    [Bindable(event="propertyChange")]
    public function get prod_rpt_unit() : Object
    {
        return _internal_prod_rpt_unit;
    }

    [Bindable(event="propertyChange")]
    public function get prod_rpt_temp() : Object
    {
        return _internal_prod_rpt_temp;
    }

    [Bindable(event="propertyChange")]
    public function get prod_prod_group() : Object
    {
        return _internal_prod_prod_group;
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

    public function set prod_cmpy(value:String) : void
    {
        var oldValue:String = _internal_prod_cmpy;
        if (oldValue !== value)
        {
            _internal_prod_cmpy = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_cmpy", oldValue, _internal_prod_cmpy));
        }
    }

    public function set prod_class(value:String) : void
    {
        var oldValue:String = _internal_prod_class;
        if (oldValue !== value)
        {
            _internal_prod_class = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_class", oldValue, _internal_prod_class));
        }
    }

    public function set prod_cmpy_name(value:String) : void
    {
        var oldValue:String = _internal_prod_cmpy_name;
        if (oldValue !== value)
        {
            _internal_prod_cmpy_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_cmpy_name", oldValue, _internal_prod_cmpy_name));
        }
    }

    public function set prod_is_blend(value:Object) : void
    {
        var oldValue:Object = _internal_prod_is_blend;
        if (oldValue !== value)
        {
            _internal_prod_is_blend = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_is_blend", oldValue, _internal_prod_is_blend));
        }
    }

    public function set prod_rpt_unit(value:Object) : void
    {
        var oldValue:Object = _internal_prod_rpt_unit;
        if (oldValue !== value)
        {
            _internal_prod_rpt_unit = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_rpt_unit", oldValue, _internal_prod_rpt_unit));
        }
    }

    public function set prod_rpt_temp(value:Object) : void
    {
        var oldValue:Object = _internal_prod_rpt_temp;
        if (oldValue !== value)
        {
            _internal_prod_rpt_temp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_rpt_temp", oldValue, _internal_prod_rpt_temp));
        }
    }

    public function set prod_prod_group(value:Object) : void
    {
        var oldValue:Object = _internal_prod_prod_group;
        if (oldValue !== value)
        {
            _internal_prod_prod_group = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_prod_group", oldValue, _internal_prod_prod_group));
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

    model_internal function setterListenerProd_cmpy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProd_cmpy();
    }

    model_internal function setterListenerProd_class(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProd_class();
    }

    model_internal function setterListenerProd_cmpy_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProd_cmpy_name();
    }

    model_internal function setterListenerProd_is_blend(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProd_is_blend();
    }

    model_internal function setterListenerProd_rpt_unit(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProd_rpt_unit();
    }

    model_internal function setterListenerProd_rpt_temp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProd_rpt_temp();
    }

    model_internal function setterListenerProd_prod_group(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProd_prod_group();
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
        if (!_model.prod_cmpyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prod_cmpyValidationFailureMessages);
        }
        if (!_model.prod_classIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prod_classValidationFailureMessages);
        }
        if (!_model.prod_cmpy_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prod_cmpy_nameValidationFailureMessages);
        }
        if (!_model.prod_is_blendIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prod_is_blendValidationFailureMessages);
        }
        if (!_model.prod_rpt_unitIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prod_rpt_unitValidationFailureMessages);
        }
        if (!_model.prod_rpt_tempIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prod_rpt_tempValidationFailureMessages);
        }
        if (!_model.prod_prod_groupIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prod_prod_groupValidationFailureMessages);
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
    public function get _model() : _OrderProductLookupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _OrderProductLookupEntityMetadata) : void
    {
        var oldValue : _OrderProductLookupEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfProd_cmpy : Array = null;
    model_internal var _doValidationLastValOfProd_cmpy : String;

    model_internal function _doValidationForProd_cmpy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfProd_cmpy != null && model_internal::_doValidationLastValOfProd_cmpy == value)
           return model_internal::_doValidationCacheOfProd_cmpy ;

        _model.model_internal::_prod_cmpyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProd_cmpyAvailable && _internal_prod_cmpy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prod_cmpy is required"));
        }

        model_internal::_doValidationCacheOfProd_cmpy = validationFailures;
        model_internal::_doValidationLastValOfProd_cmpy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProd_class : Array = null;
    model_internal var _doValidationLastValOfProd_class : String;

    model_internal function _doValidationForProd_class(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfProd_class != null && model_internal::_doValidationLastValOfProd_class == value)
           return model_internal::_doValidationCacheOfProd_class ;

        _model.model_internal::_prod_classIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProd_classAvailable && _internal_prod_class == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prod_class is required"));
        }

        model_internal::_doValidationCacheOfProd_class = validationFailures;
        model_internal::_doValidationLastValOfProd_class = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProd_cmpy_name : Array = null;
    model_internal var _doValidationLastValOfProd_cmpy_name : String;

    model_internal function _doValidationForProd_cmpy_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfProd_cmpy_name != null && model_internal::_doValidationLastValOfProd_cmpy_name == value)
           return model_internal::_doValidationCacheOfProd_cmpy_name ;

        _model.model_internal::_prod_cmpy_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProd_cmpy_nameAvailable && _internal_prod_cmpy_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prod_cmpy_name is required"));
        }

        model_internal::_doValidationCacheOfProd_cmpy_name = validationFailures;
        model_internal::_doValidationLastValOfProd_cmpy_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProd_is_blend : Array = null;
    model_internal var _doValidationLastValOfProd_is_blend : Object;

    model_internal function _doValidationForProd_is_blend(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfProd_is_blend != null && model_internal::_doValidationLastValOfProd_is_blend == value)
           return model_internal::_doValidationCacheOfProd_is_blend ;

        _model.model_internal::_prod_is_blendIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProd_is_blendAvailable && _internal_prod_is_blend == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prod_is_blend is required"));
        }

        model_internal::_doValidationCacheOfProd_is_blend = validationFailures;
        model_internal::_doValidationLastValOfProd_is_blend = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProd_rpt_unit : Array = null;
    model_internal var _doValidationLastValOfProd_rpt_unit : Object;

    model_internal function _doValidationForProd_rpt_unit(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfProd_rpt_unit != null && model_internal::_doValidationLastValOfProd_rpt_unit == value)
           return model_internal::_doValidationCacheOfProd_rpt_unit ;

        _model.model_internal::_prod_rpt_unitIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProd_rpt_unitAvailable && _internal_prod_rpt_unit == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prod_rpt_unit is required"));
        }

        model_internal::_doValidationCacheOfProd_rpt_unit = validationFailures;
        model_internal::_doValidationLastValOfProd_rpt_unit = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProd_rpt_temp : Array = null;
    model_internal var _doValidationLastValOfProd_rpt_temp : Object;

    model_internal function _doValidationForProd_rpt_temp(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfProd_rpt_temp != null && model_internal::_doValidationLastValOfProd_rpt_temp == value)
           return model_internal::_doValidationCacheOfProd_rpt_temp ;

        _model.model_internal::_prod_rpt_tempIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProd_rpt_tempAvailable && _internal_prod_rpt_temp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prod_rpt_temp is required"));
        }

        model_internal::_doValidationCacheOfProd_rpt_temp = validationFailures;
        model_internal::_doValidationLastValOfProd_rpt_temp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProd_prod_group : Array = null;
    model_internal var _doValidationLastValOfProd_prod_group : Object;

    model_internal function _doValidationForProd_prod_group(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfProd_prod_group != null && model_internal::_doValidationLastValOfProd_prod_group == value)
           return model_internal::_doValidationCacheOfProd_prod_group ;

        _model.model_internal::_prod_prod_groupIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProd_prod_groupAvailable && _internal_prod_prod_group == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prod_prod_group is required"));
        }

        model_internal::_doValidationCacheOfProd_prod_group = validationFailures;
        model_internal::_doValidationLastValOfProd_prod_group = value;

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
