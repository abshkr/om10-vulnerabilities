/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - PersonnelRoles.as.
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
public class _Super_PersonnelRoles extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _PersonnelRolesEntityMetadata;
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
    private var _internal_AUTH_LEVEL_ID : String;
    private var _internal_AUTH_LEVEL_NAME : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_PersonnelRoles()
    {
        _model = new _PersonnelRolesEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "AUTH_LEVEL_ID", model_internal::setterListenerAUTH_LEVEL_ID));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "AUTH_LEVEL_NAME", model_internal::setterListenerAUTH_LEVEL_NAME));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get AUTH_LEVEL_ID() : String
    {
        return _internal_AUTH_LEVEL_ID;
    }

    [Bindable(event="propertyChange")]
    public function get AUTH_LEVEL_NAME() : String
    {
        return _internal_AUTH_LEVEL_NAME;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set AUTH_LEVEL_ID(value:String) : void
    {
        var oldValue:String = _internal_AUTH_LEVEL_ID;
        if (oldValue !== value)
        {
            _internal_AUTH_LEVEL_ID = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "AUTH_LEVEL_ID", oldValue, _internal_AUTH_LEVEL_ID));
        }
    }

    public function set AUTH_LEVEL_NAME(value:String) : void
    {
        var oldValue:String = _internal_AUTH_LEVEL_NAME;
        if (oldValue !== value)
        {
            _internal_AUTH_LEVEL_NAME = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "AUTH_LEVEL_NAME", oldValue, _internal_AUTH_LEVEL_NAME));
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

    model_internal function setterListenerAUTH_LEVEL_ID(value:flash.events.Event):void
    {
        _model.invalidateDependentOnAUTH_LEVEL_ID();
    }

    model_internal function setterListenerAUTH_LEVEL_NAME(value:flash.events.Event):void
    {
        _model.invalidateDependentOnAUTH_LEVEL_NAME();
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
        if (!_model.AUTH_LEVEL_IDIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_AUTH_LEVEL_IDValidationFailureMessages);
        }
        if (!_model.AUTH_LEVEL_NAMEIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_AUTH_LEVEL_NAMEValidationFailureMessages);
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
    public function get _model() : _PersonnelRolesEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _PersonnelRolesEntityMetadata) : void
    {
        var oldValue : _PersonnelRolesEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfAUTH_LEVEL_ID : Array = null;
    model_internal var _doValidationLastValOfAUTH_LEVEL_ID : String;

    model_internal function _doValidationForAUTH_LEVEL_ID(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfAUTH_LEVEL_ID != null && model_internal::_doValidationLastValOfAUTH_LEVEL_ID == value)
           return model_internal::_doValidationCacheOfAUTH_LEVEL_ID ;

        _model.model_internal::_AUTH_LEVEL_IDIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isAUTH_LEVEL_IDAvailable && _internal_AUTH_LEVEL_ID == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "AUTH_LEVEL_ID is required"));
        }

        model_internal::_doValidationCacheOfAUTH_LEVEL_ID = validationFailures;
        model_internal::_doValidationLastValOfAUTH_LEVEL_ID = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfAUTH_LEVEL_NAME : Array = null;
    model_internal var _doValidationLastValOfAUTH_LEVEL_NAME : String;

    model_internal function _doValidationForAUTH_LEVEL_NAME(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfAUTH_LEVEL_NAME != null && model_internal::_doValidationLastValOfAUTH_LEVEL_NAME == value)
           return model_internal::_doValidationCacheOfAUTH_LEVEL_NAME ;

        _model.model_internal::_AUTH_LEVEL_NAMEIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isAUTH_LEVEL_NAMEAvailable && _internal_AUTH_LEVEL_NAME == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "AUTH_LEVEL_NAME is required"));
        }

        model_internal::_doValidationCacheOfAUTH_LEVEL_NAME = validationFailures;
        model_internal::_doValidationLastValOfAUTH_LEVEL_NAME = value;

        return validationFailures;
    }
    

}

}
