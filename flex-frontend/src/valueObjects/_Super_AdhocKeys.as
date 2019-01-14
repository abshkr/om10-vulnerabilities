/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - AdhocKeys.as.
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
public class _Super_AdhocKeys extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _AdhocKeysEntityMetadata;
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
    private var _internal_KYA_TANKER : String;
    private var _internal_KYA_TXT : String;
    private var _internal_KYA_KEY_NO : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_AdhocKeys()
    {
        _model = new _AdhocKeysEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "KYA_TANKER", model_internal::setterListenerKYA_TANKER));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "KYA_TXT", model_internal::setterListenerKYA_TXT));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "KYA_KEY_NO", model_internal::setterListenerKYA_KEY_NO));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get KYA_TANKER() : String
    {
        return _internal_KYA_TANKER;
    }

    [Bindable(event="propertyChange")]
    public function get KYA_TXT() : String
    {
        return _internal_KYA_TXT;
    }

    [Bindable(event="propertyChange")]
    public function get KYA_KEY_NO() : String
    {
        return _internal_KYA_KEY_NO;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set KYA_TANKER(value:String) : void
    {
        var oldValue:String = _internal_KYA_TANKER;
        if (oldValue !== value)
        {
            _internal_KYA_TANKER = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "KYA_TANKER", oldValue, _internal_KYA_TANKER));
        }
    }

    public function set KYA_TXT(value:String) : void
    {
        var oldValue:String = _internal_KYA_TXT;
        if (oldValue !== value)
        {
            _internal_KYA_TXT = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "KYA_TXT", oldValue, _internal_KYA_TXT));
        }
    }

    public function set KYA_KEY_NO(value:String) : void
    {
        var oldValue:String = _internal_KYA_KEY_NO;
        if (oldValue !== value)
        {
            _internal_KYA_KEY_NO = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "KYA_KEY_NO", oldValue, _internal_KYA_KEY_NO));
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

    model_internal function setterListenerKYA_TANKER(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKYA_TANKER();
    }

    model_internal function setterListenerKYA_TXT(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKYA_TXT();
    }

    model_internal function setterListenerKYA_KEY_NO(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKYA_KEY_NO();
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
        if (!_model.KYA_TANKERIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_KYA_TANKERValidationFailureMessages);
        }
        if (!_model.KYA_TXTIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_KYA_TXTValidationFailureMessages);
        }
        if (!_model.KYA_KEY_NOIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_KYA_KEY_NOValidationFailureMessages);
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
    public function get _model() : _AdhocKeysEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _AdhocKeysEntityMetadata) : void
    {
        var oldValue : _AdhocKeysEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfKYA_TANKER : Array = null;
    model_internal var _doValidationLastValOfKYA_TANKER : String;

    model_internal function _doValidationForKYA_TANKER(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKYA_TANKER != null && model_internal::_doValidationLastValOfKYA_TANKER == value)
           return model_internal::_doValidationCacheOfKYA_TANKER ;

        _model.model_internal::_KYA_TANKERIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKYA_TANKERAvailable && _internal_KYA_TANKER == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "KYA_TANKER is required"));
        }

        model_internal::_doValidationCacheOfKYA_TANKER = validationFailures;
        model_internal::_doValidationLastValOfKYA_TANKER = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKYA_TXT : Array = null;
    model_internal var _doValidationLastValOfKYA_TXT : String;

    model_internal function _doValidationForKYA_TXT(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKYA_TXT != null && model_internal::_doValidationLastValOfKYA_TXT == value)
           return model_internal::_doValidationCacheOfKYA_TXT ;

        _model.model_internal::_KYA_TXTIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKYA_TXTAvailable && _internal_KYA_TXT == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "KYA_TXT is required"));
        }

        model_internal::_doValidationCacheOfKYA_TXT = validationFailures;
        model_internal::_doValidationLastValOfKYA_TXT = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKYA_KEY_NO : Array = null;
    model_internal var _doValidationLastValOfKYA_KEY_NO : String;

    model_internal function _doValidationForKYA_KEY_NO(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKYA_KEY_NO != null && model_internal::_doValidationLastValOfKYA_KEY_NO == value)
           return model_internal::_doValidationCacheOfKYA_KEY_NO ;

        _model.model_internal::_KYA_KEY_NOIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKYA_KEY_NOAvailable && _internal_KYA_KEY_NO == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "KYA_KEY_NO is required"));
        }

        model_internal::_doValidationCacheOfKYA_KEY_NO = validationFailures;
        model_internal::_doValidationLastValOfKYA_KEY_NO = value;

        return validationFailures;
    }
    

}

}
