/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - PersonnelOnSite.as.
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
public class _Super_PersonnelOnSite extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("PersonnelOnSite") == null)
            {
                flash.net.registerClassAlias("PersonnelOnSite", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("PersonnelOnSite", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _PersonnelOnSiteEntityMetadata;
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
    private var _internal_per_area : String;
    private var _internal_per_name : String;
    private var _internal_per_code : String;
    private var _internal_per_enter_time : String;
    private var _internal_cmpy_name : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_PersonnelOnSite()
    {
        _model = new _PersonnelOnSiteEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_area", model_internal::setterListenerPer_area));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_name", model_internal::setterListenerPer_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_code", model_internal::setterListenerPer_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "per_enter_time", model_internal::setterListenerPer_enter_time));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_name", model_internal::setterListenerCmpy_name));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get per_area() : String
    {
        return _internal_per_area;
    }

    [Bindable(event="propertyChange")]
    public function get per_name() : String
    {
        return _internal_per_name;
    }

    [Bindable(event="propertyChange")]
    public function get per_code() : String
    {
        return _internal_per_code;
    }

    [Bindable(event="propertyChange")]
    public function get per_enter_time() : String
    {
        return _internal_per_enter_time;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_name() : String
    {
        return _internal_cmpy_name;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set per_area(value:String) : void
    {
        var oldValue:String = _internal_per_area;
        if (oldValue !== value)
        {
            _internal_per_area = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "per_area", oldValue, _internal_per_area));
        }
    }

    public function set per_name(value:String) : void
    {
        var oldValue:String = _internal_per_name;
        if (oldValue !== value)
        {
            _internal_per_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "per_name", oldValue, _internal_per_name));
        }
    }

    public function set per_code(value:String) : void
    {
        var oldValue:String = _internal_per_code;
        if (oldValue !== value)
        {
            _internal_per_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "per_code", oldValue, _internal_per_code));
        }
    }

    public function set per_enter_time(value:String) : void
    {
        var oldValue:String = _internal_per_enter_time;
        if (oldValue !== value)
        {
            _internal_per_enter_time = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "per_enter_time", oldValue, _internal_per_enter_time));
        }
    }

    public function set cmpy_name(value:String) : void
    {
        var oldValue:String = _internal_cmpy_name;
        if (oldValue !== value)
        {
            _internal_cmpy_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_name", oldValue, _internal_cmpy_name));
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

    model_internal function setterListenerPer_area(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_area();
    }

    model_internal function setterListenerPer_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_name();
    }

    model_internal function setterListenerPer_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_code();
    }

    model_internal function setterListenerPer_enter_time(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPer_enter_time();
    }

    model_internal function setterListenerCmpy_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_name();
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
        if (!_model.per_areaIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_areaValidationFailureMessages);
        }
        if (!_model.per_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_nameValidationFailureMessages);
        }
        if (!_model.per_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_codeValidationFailureMessages);
        }
        if (!_model.per_enter_timeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_per_enter_timeValidationFailureMessages);
        }
        if (!_model.cmpy_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_nameValidationFailureMessages);
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
    public function get _model() : _PersonnelOnSiteEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _PersonnelOnSiteEntityMetadata) : void
    {
        var oldValue : _PersonnelOnSiteEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfPer_area : Array = null;
    model_internal var _doValidationLastValOfPer_area : String;

    model_internal function _doValidationForPer_area(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_area != null && model_internal::_doValidationLastValOfPer_area == value)
           return model_internal::_doValidationCacheOfPer_area ;

        _model.model_internal::_per_areaIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_areaAvailable && _internal_per_area == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_area is required"));
        }

        model_internal::_doValidationCacheOfPer_area = validationFailures;
        model_internal::_doValidationLastValOfPer_area = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_name : Array = null;
    model_internal var _doValidationLastValOfPer_name : String;

    model_internal function _doValidationForPer_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_name != null && model_internal::_doValidationLastValOfPer_name == value)
           return model_internal::_doValidationCacheOfPer_name ;

        _model.model_internal::_per_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_nameAvailable && _internal_per_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_name is required"));
        }

        model_internal::_doValidationCacheOfPer_name = validationFailures;
        model_internal::_doValidationLastValOfPer_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_code : Array = null;
    model_internal var _doValidationLastValOfPer_code : String;

    model_internal function _doValidationForPer_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_code != null && model_internal::_doValidationLastValOfPer_code == value)
           return model_internal::_doValidationCacheOfPer_code ;

        _model.model_internal::_per_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_codeAvailable && _internal_per_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_code is required"));
        }

        model_internal::_doValidationCacheOfPer_code = validationFailures;
        model_internal::_doValidationLastValOfPer_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPer_enter_time : Array = null;
    model_internal var _doValidationLastValOfPer_enter_time : String;

    model_internal function _doValidationForPer_enter_time(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPer_enter_time != null && model_internal::_doValidationLastValOfPer_enter_time == value)
           return model_internal::_doValidationCacheOfPer_enter_time ;

        _model.model_internal::_per_enter_timeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPer_enter_timeAvailable && _internal_per_enter_time == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "per_enter_time is required"));
        }

        model_internal::_doValidationCacheOfPer_enter_time = validationFailures;
        model_internal::_doValidationLastValOfPer_enter_time = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_name : Array = null;
    model_internal var _doValidationLastValOfCmpy_name : String;

    model_internal function _doValidationForCmpy_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_name != null && model_internal::_doValidationLastValOfCmpy_name == value)
           return model_internal::_doValidationCacheOfCmpy_name ;

        _model.model_internal::_cmpy_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_nameAvailable && _internal_cmpy_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_name is required"));
        }

        model_internal::_doValidationCacheOfCmpy_name = validationFailures;
        model_internal::_doValidationLastValOfCmpy_name = value;

        return validationFailures;
    }
    

}

}
