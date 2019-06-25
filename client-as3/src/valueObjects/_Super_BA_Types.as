/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - BA_Types.as.
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
public class _Super_BA_Types extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("BA_Types") == null)
            {
                flash.net.registerClassAlias("BA_Types", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("BA_Types", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _BA_TypesEntityMetadata;
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
    private var _internal_ba_meter_id : String;
    private var _internal_ba_meter_name : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_BA_Types()
    {
        _model = new _BA_TypesEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "ba_meter_id", model_internal::setterListenerBa_meter_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "ba_meter_name", model_internal::setterListenerBa_meter_name));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get ba_meter_id() : String
    {
        return _internal_ba_meter_id;
    }

    [Bindable(event="propertyChange")]
    public function get ba_meter_name() : String
    {
        return _internal_ba_meter_name;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set ba_meter_id(value:String) : void
    {
        var oldValue:String = _internal_ba_meter_id;
        if (oldValue !== value)
        {
            _internal_ba_meter_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ba_meter_id", oldValue, _internal_ba_meter_id));
        }
    }

    public function set ba_meter_name(value:String) : void
    {
        var oldValue:String = _internal_ba_meter_name;
        if (oldValue !== value)
        {
            _internal_ba_meter_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ba_meter_name", oldValue, _internal_ba_meter_name));
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

    model_internal function setterListenerBa_meter_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBa_meter_id();
    }

    model_internal function setterListenerBa_meter_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBa_meter_name();
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
        if (!_model.ba_meter_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_ba_meter_idValidationFailureMessages);
        }
        if (!_model.ba_meter_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_ba_meter_nameValidationFailureMessages);
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
    public function get _model() : _BA_TypesEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _BA_TypesEntityMetadata) : void
    {
        var oldValue : _BA_TypesEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfBa_meter_id : Array = null;
    model_internal var _doValidationLastValOfBa_meter_id : String;

    model_internal function _doValidationForBa_meter_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBa_meter_id != null && model_internal::_doValidationLastValOfBa_meter_id == value)
           return model_internal::_doValidationCacheOfBa_meter_id ;

        _model.model_internal::_ba_meter_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBa_meter_idAvailable && _internal_ba_meter_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "ba_meter_id is required"));
        }

        model_internal::_doValidationCacheOfBa_meter_id = validationFailures;
        model_internal::_doValidationLastValOfBa_meter_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBa_meter_name : Array = null;
    model_internal var _doValidationLastValOfBa_meter_name : String;

    model_internal function _doValidationForBa_meter_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBa_meter_name != null && model_internal::_doValidationLastValOfBa_meter_name == value)
           return model_internal::_doValidationCacheOfBa_meter_name ;

        _model.model_internal::_ba_meter_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBa_meter_nameAvailable && _internal_ba_meter_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "ba_meter_name is required"));
        }

        model_internal::_doValidationCacheOfBa_meter_name = validationFailures;
        model_internal::_doValidationLastValOfBa_meter_name = value;

        return validationFailures;
    }
    

}

}
