/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - DomainLinks.as.
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
public class _Super_DomainLinks extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _DomainLinksEntityMetadata;
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
    private var _internal_DOMAIN_OBJECT_ACTIVE : String;
    private var _internal_OBJECT_ID : String;
    private var _internal_DOMAIN_OBJECT_ID : String;
    private var _internal_DOMAIN_ID : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_DomainLinks()
    {
        _model = new _DomainLinksEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "DOMAIN_OBJECT_ACTIVE", model_internal::setterListenerDOMAIN_OBJECT_ACTIVE));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "OBJECT_ID", model_internal::setterListenerOBJECT_ID));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "DOMAIN_OBJECT_ID", model_internal::setterListenerDOMAIN_OBJECT_ID));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "DOMAIN_ID", model_internal::setterListenerDOMAIN_ID));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get DOMAIN_OBJECT_ACTIVE() : String
    {
        return _internal_DOMAIN_OBJECT_ACTIVE;
    }

    [Bindable(event="propertyChange")]
    public function get OBJECT_ID() : String
    {
        return _internal_OBJECT_ID;
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_OBJECT_ID() : String
    {
        return _internal_DOMAIN_OBJECT_ID;
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_ID() : String
    {
        return _internal_DOMAIN_ID;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set DOMAIN_OBJECT_ACTIVE(value:String) : void
    {
        var oldValue:String = _internal_DOMAIN_OBJECT_ACTIVE;
        if (oldValue !== value)
        {
            _internal_DOMAIN_OBJECT_ACTIVE = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_OBJECT_ACTIVE", oldValue, _internal_DOMAIN_OBJECT_ACTIVE));
        }
    }

    public function set OBJECT_ID(value:String) : void
    {
        var oldValue:String = _internal_OBJECT_ID;
        if (oldValue !== value)
        {
            _internal_OBJECT_ID = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "OBJECT_ID", oldValue, _internal_OBJECT_ID));
        }
    }

    public function set DOMAIN_OBJECT_ID(value:String) : void
    {
        var oldValue:String = _internal_DOMAIN_OBJECT_ID;
        if (oldValue !== value)
        {
            _internal_DOMAIN_OBJECT_ID = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_OBJECT_ID", oldValue, _internal_DOMAIN_OBJECT_ID));
        }
    }

    public function set DOMAIN_ID(value:String) : void
    {
        var oldValue:String = _internal_DOMAIN_ID;
        if (oldValue !== value)
        {
            _internal_DOMAIN_ID = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_ID", oldValue, _internal_DOMAIN_ID));
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

    model_internal function setterListenerDOMAIN_OBJECT_ACTIVE(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDOMAIN_OBJECT_ACTIVE();
    }

    model_internal function setterListenerOBJECT_ID(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOBJECT_ID();
    }

    model_internal function setterListenerDOMAIN_OBJECT_ID(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDOMAIN_OBJECT_ID();
    }

    model_internal function setterListenerDOMAIN_ID(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDOMAIN_ID();
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
        if (!_model.DOMAIN_OBJECT_ACTIVEIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_DOMAIN_OBJECT_ACTIVEValidationFailureMessages);
        }
        if (!_model.OBJECT_IDIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_OBJECT_IDValidationFailureMessages);
        }
        if (!_model.DOMAIN_OBJECT_IDIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_DOMAIN_OBJECT_IDValidationFailureMessages);
        }
        if (!_model.DOMAIN_IDIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_DOMAIN_IDValidationFailureMessages);
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
    public function get _model() : _DomainLinksEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _DomainLinksEntityMetadata) : void
    {
        var oldValue : _DomainLinksEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfDOMAIN_OBJECT_ACTIVE : Array = null;
    model_internal var _doValidationLastValOfDOMAIN_OBJECT_ACTIVE : String;

    model_internal function _doValidationForDOMAIN_OBJECT_ACTIVE(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDOMAIN_OBJECT_ACTIVE != null && model_internal::_doValidationLastValOfDOMAIN_OBJECT_ACTIVE == value)
           return model_internal::_doValidationCacheOfDOMAIN_OBJECT_ACTIVE ;

        _model.model_internal::_DOMAIN_OBJECT_ACTIVEIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDOMAIN_OBJECT_ACTIVEAvailable && _internal_DOMAIN_OBJECT_ACTIVE == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "DOMAIN_OBJECT_ACTIVE is required"));
        }

        model_internal::_doValidationCacheOfDOMAIN_OBJECT_ACTIVE = validationFailures;
        model_internal::_doValidationLastValOfDOMAIN_OBJECT_ACTIVE = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOBJECT_ID : Array = null;
    model_internal var _doValidationLastValOfOBJECT_ID : String;

    model_internal function _doValidationForOBJECT_ID(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOBJECT_ID != null && model_internal::_doValidationLastValOfOBJECT_ID == value)
           return model_internal::_doValidationCacheOfOBJECT_ID ;

        _model.model_internal::_OBJECT_IDIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOBJECT_IDAvailable && _internal_OBJECT_ID == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "OBJECT_ID is required"));
        }

        model_internal::_doValidationCacheOfOBJECT_ID = validationFailures;
        model_internal::_doValidationLastValOfOBJECT_ID = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDOMAIN_OBJECT_ID : Array = null;
    model_internal var _doValidationLastValOfDOMAIN_OBJECT_ID : String;

    model_internal function _doValidationForDOMAIN_OBJECT_ID(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDOMAIN_OBJECT_ID != null && model_internal::_doValidationLastValOfDOMAIN_OBJECT_ID == value)
           return model_internal::_doValidationCacheOfDOMAIN_OBJECT_ID ;

        _model.model_internal::_DOMAIN_OBJECT_IDIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDOMAIN_OBJECT_IDAvailable && _internal_DOMAIN_OBJECT_ID == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "DOMAIN_OBJECT_ID is required"));
        }

        model_internal::_doValidationCacheOfDOMAIN_OBJECT_ID = validationFailures;
        model_internal::_doValidationLastValOfDOMAIN_OBJECT_ID = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDOMAIN_ID : Array = null;
    model_internal var _doValidationLastValOfDOMAIN_ID : String;

    model_internal function _doValidationForDOMAIN_ID(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDOMAIN_ID != null && model_internal::_doValidationLastValOfDOMAIN_ID == value)
           return model_internal::_doValidationCacheOfDOMAIN_ID ;

        _model.model_internal::_DOMAIN_IDIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDOMAIN_IDAvailable && _internal_DOMAIN_ID == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "DOMAIN_ID is required"));
        }

        model_internal::_doValidationCacheOfDOMAIN_ID = validationFailures;
        model_internal::_doValidationLastValOfDOMAIN_ID = value;

        return validationFailures;
    }
    

}

}
