/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - KeyCmpyLookup.as.
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
public class _Super_KeyCmpyLookup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("KeyCmpyLookup") == null)
            {
                flash.net.registerClassAlias("KeyCmpyLookup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("KeyCmpyLookup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _KeyCmpyLookupEntityMetadata;
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
    private var _internal_cmpy_type : String;
    private var _internal_cmpy_code : String;
    private var _internal_cmpy_name : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_KeyCmpyLookup()
    {
        _model = new _KeyCmpyLookupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_type", model_internal::setterListenerCmpy_type));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_code", model_internal::setterListenerCmpy_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_name", model_internal::setterListenerCmpy_name));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get cmpy_type() : String
    {
        return _internal_cmpy_type;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_code() : String
    {
        return _internal_cmpy_code;
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

    public function set cmpy_type(value:String) : void
    {
        var oldValue:String = _internal_cmpy_type;
        if (oldValue !== value)
        {
            _internal_cmpy_type = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_type", oldValue, _internal_cmpy_type));
        }
    }

    public function set cmpy_code(value:String) : void
    {
        var oldValue:String = _internal_cmpy_code;
        if (oldValue !== value)
        {
            _internal_cmpy_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_code", oldValue, _internal_cmpy_code));
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

    model_internal function setterListenerCmpy_type(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_type();
    }

    model_internal function setterListenerCmpy_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_code();
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
        if (!_model.cmpy_typeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_typeValidationFailureMessages);
        }
        if (!_model.cmpy_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_codeValidationFailureMessages);
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
    public function get _model() : _KeyCmpyLookupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _KeyCmpyLookupEntityMetadata) : void
    {
        var oldValue : _KeyCmpyLookupEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfCmpy_type : Array = null;
    model_internal var _doValidationLastValOfCmpy_type : String;

    model_internal function _doValidationForCmpy_type(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_type != null && model_internal::_doValidationLastValOfCmpy_type == value)
           return model_internal::_doValidationCacheOfCmpy_type ;

        _model.model_internal::_cmpy_typeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_typeAvailable && _internal_cmpy_type == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_type is required"));
        }

        model_internal::_doValidationCacheOfCmpy_type = validationFailures;
        model_internal::_doValidationLastValOfCmpy_type = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_code : Array = null;
    model_internal var _doValidationLastValOfCmpy_code : String;

    model_internal function _doValidationForCmpy_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_code != null && model_internal::_doValidationLastValOfCmpy_code == value)
           return model_internal::_doValidationCacheOfCmpy_code ;

        _model.model_internal::_cmpy_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_codeAvailable && _internal_cmpy_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_code is required"));
        }

        model_internal::_doValidationCacheOfCmpy_code = validationFailures;
        model_internal::_doValidationLastValOfCmpy_code = value;

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
