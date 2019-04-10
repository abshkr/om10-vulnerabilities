/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - CustomDatatype1.as.
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
public class _Super_CustomDatatype1 extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _CustomDatatype1EntityMetadata;
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
    private var _internal_COMPANY_ID : String;
    private var _internal_COMPANY_NAME : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_CustomDatatype1()
    {
        _model = new _CustomDatatype1EntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "COMPANY_ID", model_internal::setterListenerCOMPANY_ID));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "COMPANY_NAME", model_internal::setterListenerCOMPANY_NAME));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get COMPANY_ID() : String
    {
        return _internal_COMPANY_ID;
    }

    [Bindable(event="propertyChange")]
    public function get COMPANY_NAME() : String
    {
        return _internal_COMPANY_NAME;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set COMPANY_ID(value:String) : void
    {
        var oldValue:String = _internal_COMPANY_ID;
        if (oldValue !== value)
        {
            _internal_COMPANY_ID = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "COMPANY_ID", oldValue, _internal_COMPANY_ID));
        }
    }

    public function set COMPANY_NAME(value:String) : void
    {
        var oldValue:String = _internal_COMPANY_NAME;
        if (oldValue !== value)
        {
            _internal_COMPANY_NAME = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "COMPANY_NAME", oldValue, _internal_COMPANY_NAME));
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

    model_internal function setterListenerCOMPANY_ID(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCOMPANY_ID();
    }

    model_internal function setterListenerCOMPANY_NAME(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCOMPANY_NAME();
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
        if (!_model.COMPANY_IDIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_COMPANY_IDValidationFailureMessages);
        }
        if (!_model.COMPANY_NAMEIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_COMPANY_NAMEValidationFailureMessages);
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
    public function get _model() : _CustomDatatype1EntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _CustomDatatype1EntityMetadata) : void
    {
        var oldValue : _CustomDatatype1EntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfCOMPANY_ID : Array = null;
    model_internal var _doValidationLastValOfCOMPANY_ID : String;

    model_internal function _doValidationForCOMPANY_ID(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCOMPANY_ID != null && model_internal::_doValidationLastValOfCOMPANY_ID == value)
           return model_internal::_doValidationCacheOfCOMPANY_ID ;

        _model.model_internal::_COMPANY_IDIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCOMPANY_IDAvailable && _internal_COMPANY_ID == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "COMPANY_ID is required"));
        }

        model_internal::_doValidationCacheOfCOMPANY_ID = validationFailures;
        model_internal::_doValidationLastValOfCOMPANY_ID = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCOMPANY_NAME : Array = null;
    model_internal var _doValidationLastValOfCOMPANY_NAME : String;

    model_internal function _doValidationForCOMPANY_NAME(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCOMPANY_NAME != null && model_internal::_doValidationLastValOfCOMPANY_NAME == value)
           return model_internal::_doValidationCacheOfCOMPANY_NAME ;

        _model.model_internal::_COMPANY_NAMEIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCOMPANY_NAMEAvailable && _internal_COMPANY_NAME == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "COMPANY_NAME is required"));
        }

        model_internal::_doValidationCacheOfCOMPANY_NAME = validationFailures;
        model_internal::_doValidationLastValOfCOMPANY_NAME = value;

        return validationFailures;
    }
    

}

}
