/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - ScheduleProductDetails.as.
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
public class _Super_ScheduleProductDetails extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("ScheduleProductDetails") == null)
            {
                flash.net.registerClassAlias("ScheduleProductDetails", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("ScheduleProductDetails", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _ScheduleProductDetailsEntityMetadata;
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
    private var _internal_preloaded : Object;
    private var _internal_qty_kg : String;
    private var _internal_qty_preloaded : String;
    private var _internal_qty_loaded : String;
    private var _internal_qty_scheduled : String;
    private var _internal_unit_name : String;
    private var _internal_qty_std : String;
    private var _internal_prod_code : String;
    private var _internal_qty_amb : String;
    private var _internal_unit_code : String;
    private var _internal_prod_name : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_ScheduleProductDetails()
    {
        _model = new _ScheduleProductDetailsEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_cmpy", model_internal::setterListenerProd_cmpy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "preloaded", model_internal::setterListenerPreloaded));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "qty_kg", model_internal::setterListenerQty_kg));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "qty_preloaded", model_internal::setterListenerQty_preloaded));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "qty_loaded", model_internal::setterListenerQty_loaded));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "qty_scheduled", model_internal::setterListenerQty_scheduled));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "unit_name", model_internal::setterListenerUnit_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "qty_std", model_internal::setterListenerQty_std));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_code", model_internal::setterListenerProd_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "qty_amb", model_internal::setterListenerQty_amb));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "unit_code", model_internal::setterListenerUnit_code));
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
    public function get preloaded() : Object
    {
        return _internal_preloaded;
    }

    [Bindable(event="propertyChange")]
    public function get qty_kg() : String
    {
        return _internal_qty_kg;
    }

    [Bindable(event="propertyChange")]
    public function get qty_preloaded() : String
    {
        return _internal_qty_preloaded;
    }

    [Bindable(event="propertyChange")]
    public function get qty_loaded() : String
    {
        return _internal_qty_loaded;
    }

    [Bindable(event="propertyChange")]
    public function get qty_scheduled() : String
    {
        return _internal_qty_scheduled;
    }

    [Bindable(event="propertyChange")]
    public function get unit_name() : String
    {
        return _internal_unit_name;
    }

    [Bindable(event="propertyChange")]
    public function get qty_std() : String
    {
        return _internal_qty_std;
    }

    [Bindable(event="propertyChange")]
    public function get prod_code() : String
    {
        return _internal_prod_code;
    }

    [Bindable(event="propertyChange")]
    public function get qty_amb() : String
    {
        return _internal_qty_amb;
    }

    [Bindable(event="propertyChange")]
    public function get unit_code() : String
    {
        return _internal_unit_code;
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

    public function set preloaded(value:Object) : void
    {
        var oldValue:Object = _internal_preloaded;
        if (oldValue !== value)
        {
            _internal_preloaded = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "preloaded", oldValue, _internal_preloaded));
        }
    }

    public function set qty_kg(value:String) : void
    {
        var oldValue:String = _internal_qty_kg;
        if (oldValue !== value)
        {
            _internal_qty_kg = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_kg", oldValue, _internal_qty_kg));
        }
    }

    public function set qty_preloaded(value:String) : void
    {
        var oldValue:String = _internal_qty_preloaded;
        if (oldValue !== value)
        {
            _internal_qty_preloaded = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_preloaded", oldValue, _internal_qty_preloaded));
        }
    }

    public function set qty_loaded(value:String) : void
    {
        var oldValue:String = _internal_qty_loaded;
        if (oldValue !== value)
        {
            _internal_qty_loaded = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_loaded", oldValue, _internal_qty_loaded));
        }
    }

    public function set qty_scheduled(value:String) : void
    {
        var oldValue:String = _internal_qty_scheduled;
        if (oldValue !== value)
        {
            _internal_qty_scheduled = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_scheduled", oldValue, _internal_qty_scheduled));
        }
    }

    public function set unit_name(value:String) : void
    {
        var oldValue:String = _internal_unit_name;
        if (oldValue !== value)
        {
            _internal_unit_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_name", oldValue, _internal_unit_name));
        }
    }

    public function set qty_std(value:String) : void
    {
        var oldValue:String = _internal_qty_std;
        if (oldValue !== value)
        {
            _internal_qty_std = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_std", oldValue, _internal_qty_std));
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

    public function set qty_amb(value:String) : void
    {
        var oldValue:String = _internal_qty_amb;
        if (oldValue !== value)
        {
            _internal_qty_amb = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_amb", oldValue, _internal_qty_amb));
        }
    }

    public function set unit_code(value:String) : void
    {
        var oldValue:String = _internal_unit_code;
        if (oldValue !== value)
        {
            _internal_unit_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_code", oldValue, _internal_unit_code));
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

    model_internal function setterListenerPreloaded(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPreloaded();
    }

    model_internal function setterListenerQty_kg(value:flash.events.Event):void
    {
        _model.invalidateDependentOnQty_kg();
    }

    model_internal function setterListenerQty_preloaded(value:flash.events.Event):void
    {
        _model.invalidateDependentOnQty_preloaded();
    }

    model_internal function setterListenerQty_loaded(value:flash.events.Event):void
    {
        _model.invalidateDependentOnQty_loaded();
    }

    model_internal function setterListenerQty_scheduled(value:flash.events.Event):void
    {
        _model.invalidateDependentOnQty_scheduled();
    }

    model_internal function setterListenerUnit_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUnit_name();
    }

    model_internal function setterListenerQty_std(value:flash.events.Event):void
    {
        _model.invalidateDependentOnQty_std();
    }

    model_internal function setterListenerProd_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProd_code();
    }

    model_internal function setterListenerQty_amb(value:flash.events.Event):void
    {
        _model.invalidateDependentOnQty_amb();
    }

    model_internal function setterListenerUnit_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUnit_code();
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
        if (!_model.preloadedIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_preloadedValidationFailureMessages);
        }
        if (!_model.qty_kgIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_qty_kgValidationFailureMessages);
        }
        if (!_model.qty_preloadedIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_qty_preloadedValidationFailureMessages);
        }
        if (!_model.qty_loadedIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_qty_loadedValidationFailureMessages);
        }
        if (!_model.qty_scheduledIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_qty_scheduledValidationFailureMessages);
        }
        if (!_model.unit_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_unit_nameValidationFailureMessages);
        }
        if (!_model.qty_stdIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_qty_stdValidationFailureMessages);
        }
        if (!_model.prod_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prod_codeValidationFailureMessages);
        }
        if (!_model.qty_ambIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_qty_ambValidationFailureMessages);
        }
        if (!_model.unit_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_unit_codeValidationFailureMessages);
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
    public function get _model() : _ScheduleProductDetailsEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _ScheduleProductDetailsEntityMetadata) : void
    {
        var oldValue : _ScheduleProductDetailsEntityMetadata = model_internal::_dminternal_model;
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
    
    model_internal var _doValidationCacheOfPreloaded : Array = null;
    model_internal var _doValidationLastValOfPreloaded : Object;

    model_internal function _doValidationForPreloaded(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPreloaded != null && model_internal::_doValidationLastValOfPreloaded == value)
           return model_internal::_doValidationCacheOfPreloaded ;

        _model.model_internal::_preloadedIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPreloadedAvailable && _internal_preloaded == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "preloaded is required"));
        }

        model_internal::_doValidationCacheOfPreloaded = validationFailures;
        model_internal::_doValidationLastValOfPreloaded = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfQty_kg : Array = null;
    model_internal var _doValidationLastValOfQty_kg : String;

    model_internal function _doValidationForQty_kg(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfQty_kg != null && model_internal::_doValidationLastValOfQty_kg == value)
           return model_internal::_doValidationCacheOfQty_kg ;

        _model.model_internal::_qty_kgIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isQty_kgAvailable && _internal_qty_kg == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "qty_kg is required"));
        }

        model_internal::_doValidationCacheOfQty_kg = validationFailures;
        model_internal::_doValidationLastValOfQty_kg = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfQty_preloaded : Array = null;
    model_internal var _doValidationLastValOfQty_preloaded : String;

    model_internal function _doValidationForQty_preloaded(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfQty_preloaded != null && model_internal::_doValidationLastValOfQty_preloaded == value)
           return model_internal::_doValidationCacheOfQty_preloaded ;

        _model.model_internal::_qty_preloadedIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isQty_preloadedAvailable && _internal_qty_preloaded == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "qty_preloaded is required"));
        }

        model_internal::_doValidationCacheOfQty_preloaded = validationFailures;
        model_internal::_doValidationLastValOfQty_preloaded = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfQty_loaded : Array = null;
    model_internal var _doValidationLastValOfQty_loaded : String;

    model_internal function _doValidationForQty_loaded(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfQty_loaded != null && model_internal::_doValidationLastValOfQty_loaded == value)
           return model_internal::_doValidationCacheOfQty_loaded ;

        _model.model_internal::_qty_loadedIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isQty_loadedAvailable && _internal_qty_loaded == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "qty_loaded is required"));
        }

        model_internal::_doValidationCacheOfQty_loaded = validationFailures;
        model_internal::_doValidationLastValOfQty_loaded = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfQty_scheduled : Array = null;
    model_internal var _doValidationLastValOfQty_scheduled : String;

    model_internal function _doValidationForQty_scheduled(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfQty_scheduled != null && model_internal::_doValidationLastValOfQty_scheduled == value)
           return model_internal::_doValidationCacheOfQty_scheduled ;

        _model.model_internal::_qty_scheduledIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isQty_scheduledAvailable && _internal_qty_scheduled == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "qty_scheduled is required"));
        }

        model_internal::_doValidationCacheOfQty_scheduled = validationFailures;
        model_internal::_doValidationLastValOfQty_scheduled = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfUnit_name : Array = null;
    model_internal var _doValidationLastValOfUnit_name : String;

    model_internal function _doValidationForUnit_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfUnit_name != null && model_internal::_doValidationLastValOfUnit_name == value)
           return model_internal::_doValidationCacheOfUnit_name ;

        _model.model_internal::_unit_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isUnit_nameAvailable && _internal_unit_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "unit_name is required"));
        }

        model_internal::_doValidationCacheOfUnit_name = validationFailures;
        model_internal::_doValidationLastValOfUnit_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfQty_std : Array = null;
    model_internal var _doValidationLastValOfQty_std : String;

    model_internal function _doValidationForQty_std(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfQty_std != null && model_internal::_doValidationLastValOfQty_std == value)
           return model_internal::_doValidationCacheOfQty_std ;

        _model.model_internal::_qty_stdIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isQty_stdAvailable && _internal_qty_std == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "qty_std is required"));
        }

        model_internal::_doValidationCacheOfQty_std = validationFailures;
        model_internal::_doValidationLastValOfQty_std = value;

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
    
    model_internal var _doValidationCacheOfQty_amb : Array = null;
    model_internal var _doValidationLastValOfQty_amb : String;

    model_internal function _doValidationForQty_amb(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfQty_amb != null && model_internal::_doValidationLastValOfQty_amb == value)
           return model_internal::_doValidationCacheOfQty_amb ;

        _model.model_internal::_qty_ambIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isQty_ambAvailable && _internal_qty_amb == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "qty_amb is required"));
        }

        model_internal::_doValidationCacheOfQty_amb = validationFailures;
        model_internal::_doValidationLastValOfQty_amb = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfUnit_code : Array = null;
    model_internal var _doValidationLastValOfUnit_code : String;

    model_internal function _doValidationForUnit_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfUnit_code != null && model_internal::_doValidationLastValOfUnit_code == value)
           return model_internal::_doValidationCacheOfUnit_code ;

        _model.model_internal::_unit_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isUnit_codeAvailable && _internal_unit_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "unit_code is required"));
        }

        model_internal::_doValidationCacheOfUnit_code = validationFailures;
        model_internal::_doValidationLastValOfUnit_code = value;

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
