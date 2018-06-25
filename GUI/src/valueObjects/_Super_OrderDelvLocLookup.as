/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - OrderDelvLocLookup.as.
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
public class _Super_OrderDelvLocLookup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("OrderDelvLocLookup") == null)
            {
                flash.net.registerClassAlias("OrderDelvLocLookup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("OrderDelvLocLookup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _OrderDelvLocLookupEntityMetadata;
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
    private var _internal_delv_desc : String;
    private var _internal_delv_name : String;
    private var _internal_delv_code : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_OrderDelvLocLookup()
    {
        _model = new _OrderDelvLocLookupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "delv_desc", model_internal::setterListenerDelv_desc));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "delv_name", model_internal::setterListenerDelv_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "delv_code", model_internal::setterListenerDelv_code));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get delv_desc() : String
    {
        return _internal_delv_desc;
    }

    [Bindable(event="propertyChange")]
    public function get delv_name() : String
    {
        return _internal_delv_name;
    }

    [Bindable(event="propertyChange")]
    public function get delv_code() : String
    {
        return _internal_delv_code;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set delv_desc(value:String) : void
    {
        var oldValue:String = _internal_delv_desc;
        if (oldValue !== value)
        {
            _internal_delv_desc = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "delv_desc", oldValue, _internal_delv_desc));
        }
    }

    public function set delv_name(value:String) : void
    {
        var oldValue:String = _internal_delv_name;
        if (oldValue !== value)
        {
            _internal_delv_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "delv_name", oldValue, _internal_delv_name));
        }
    }

    public function set delv_code(value:String) : void
    {
        var oldValue:String = _internal_delv_code;
        if (oldValue !== value)
        {
            _internal_delv_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "delv_code", oldValue, _internal_delv_code));
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

    model_internal function setterListenerDelv_desc(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDelv_desc();
    }

    model_internal function setterListenerDelv_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDelv_name();
    }

    model_internal function setterListenerDelv_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDelv_code();
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
        if (!_model.delv_descIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_delv_descValidationFailureMessages);
        }
        if (!_model.delv_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_delv_nameValidationFailureMessages);
        }
        if (!_model.delv_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_delv_codeValidationFailureMessages);
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
    public function get _model() : _OrderDelvLocLookupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _OrderDelvLocLookupEntityMetadata) : void
    {
        var oldValue : _OrderDelvLocLookupEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfDelv_desc : Array = null;
    model_internal var _doValidationLastValOfDelv_desc : String;

    model_internal function _doValidationForDelv_desc(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDelv_desc != null && model_internal::_doValidationLastValOfDelv_desc == value)
           return model_internal::_doValidationCacheOfDelv_desc ;

        _model.model_internal::_delv_descIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDelv_descAvailable && _internal_delv_desc == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "delv_desc is required"));
        }

        model_internal::_doValidationCacheOfDelv_desc = validationFailures;
        model_internal::_doValidationLastValOfDelv_desc = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDelv_name : Array = null;
    model_internal var _doValidationLastValOfDelv_name : String;

    model_internal function _doValidationForDelv_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDelv_name != null && model_internal::_doValidationLastValOfDelv_name == value)
           return model_internal::_doValidationCacheOfDelv_name ;

        _model.model_internal::_delv_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDelv_nameAvailable && _internal_delv_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "delv_name is required"));
        }

        model_internal::_doValidationCacheOfDelv_name = validationFailures;
        model_internal::_doValidationLastValOfDelv_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDelv_code : Array = null;
    model_internal var _doValidationLastValOfDelv_code : String;

    model_internal function _doValidationForDelv_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDelv_code != null && model_internal::_doValidationLastValOfDelv_code == value)
           return model_internal::_doValidationCacheOfDelv_code ;

        _model.model_internal::_delv_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDelv_codeAvailable && _internal_delv_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "delv_code is required"));
        }

        model_internal::_doValidationCacheOfDelv_code = validationFailures;
        model_internal::_doValidationLastValOfDelv_code = value;

        return validationFailures;
    }
    

}

}
