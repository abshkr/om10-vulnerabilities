/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - StatusLookup.as.
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
public class _Super_StatusLookup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _StatusLookupEntityMetadata;
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
    private var _internal_STATUS_TEXT : String;
    private var _internal_STATUS_ID : String;
    private var _internal_STATUS_CODE : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_StatusLookup()
    {
        _model = new _StatusLookupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "STATUS_TEXT", model_internal::setterListenerSTATUS_TEXT));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "STATUS_ID", model_internal::setterListenerSTATUS_ID));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "STATUS_CODE", model_internal::setterListenerSTATUS_CODE));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get STATUS_TEXT() : String
    {
        return _internal_STATUS_TEXT;
    }

    [Bindable(event="propertyChange")]
    public function get STATUS_ID() : String
    {
        return _internal_STATUS_ID;
    }

    [Bindable(event="propertyChange")]
    public function get STATUS_CODE() : String
    {
        return _internal_STATUS_CODE;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set STATUS_TEXT(value:String) : void
    {
        var oldValue:String = _internal_STATUS_TEXT;
        if (oldValue !== value)
        {
            _internal_STATUS_TEXT = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "STATUS_TEXT", oldValue, _internal_STATUS_TEXT));
        }
    }

    public function set STATUS_ID(value:String) : void
    {
        var oldValue:String = _internal_STATUS_ID;
        if (oldValue !== value)
        {
            _internal_STATUS_ID = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "STATUS_ID", oldValue, _internal_STATUS_ID));
        }
    }

    public function set STATUS_CODE(value:String) : void
    {
        var oldValue:String = _internal_STATUS_CODE;
        if (oldValue !== value)
        {
            _internal_STATUS_CODE = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "STATUS_CODE", oldValue, _internal_STATUS_CODE));
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

    model_internal function setterListenerSTATUS_TEXT(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSTATUS_TEXT();
    }

    model_internal function setterListenerSTATUS_ID(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSTATUS_ID();
    }

    model_internal function setterListenerSTATUS_CODE(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSTATUS_CODE();
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
        if (!_model.STATUS_TEXTIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_STATUS_TEXTValidationFailureMessages);
        }
        if (!_model.STATUS_IDIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_STATUS_IDValidationFailureMessages);
        }
        if (!_model.STATUS_CODEIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_STATUS_CODEValidationFailureMessages);
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
    public function get _model() : _StatusLookupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _StatusLookupEntityMetadata) : void
    {
        var oldValue : _StatusLookupEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfSTATUS_TEXT : Array = null;
    model_internal var _doValidationLastValOfSTATUS_TEXT : String;

    model_internal function _doValidationForSTATUS_TEXT(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSTATUS_TEXT != null && model_internal::_doValidationLastValOfSTATUS_TEXT == value)
           return model_internal::_doValidationCacheOfSTATUS_TEXT ;

        _model.model_internal::_STATUS_TEXTIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSTATUS_TEXTAvailable && _internal_STATUS_TEXT == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "STATUS_TEXT is required"));
        }

        model_internal::_doValidationCacheOfSTATUS_TEXT = validationFailures;
        model_internal::_doValidationLastValOfSTATUS_TEXT = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSTATUS_ID : Array = null;
    model_internal var _doValidationLastValOfSTATUS_ID : String;

    model_internal function _doValidationForSTATUS_ID(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSTATUS_ID != null && model_internal::_doValidationLastValOfSTATUS_ID == value)
           return model_internal::_doValidationCacheOfSTATUS_ID ;

        _model.model_internal::_STATUS_IDIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSTATUS_IDAvailable && _internal_STATUS_ID == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "STATUS_ID is required"));
        }

        model_internal::_doValidationCacheOfSTATUS_ID = validationFailures;
        model_internal::_doValidationLastValOfSTATUS_ID = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSTATUS_CODE : Array = null;
    model_internal var _doValidationLastValOfSTATUS_CODE : String;

    model_internal function _doValidationForSTATUS_CODE(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSTATUS_CODE != null && model_internal::_doValidationLastValOfSTATUS_CODE == value)
           return model_internal::_doValidationCacheOfSTATUS_CODE ;

        _model.model_internal::_STATUS_CODEIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSTATUS_CODEAvailable && _internal_STATUS_CODE == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "STATUS_CODE is required"));
        }

        model_internal::_doValidationCacheOfSTATUS_CODE = validationFailures;
        model_internal::_doValidationLastValOfSTATUS_CODE = value;

        return validationFailures;
    }
    

}

}
