/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - TankersLookup.as.
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
public class _Super_TankersLookup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("TankersLookup") == null)
            {
                flash.net.registerClassAlias("TankersLookup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("TankersLookup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _TankersLookupEntityMetadata;
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
    private var _internal_equipment_name : Object;
    private var _internal_tnkr_eqpt_name : String;
    private var _internal_tnkr_code : String;
    private var _internal_carrier_name : Object;
    private var _internal_tnkr_carrier_name : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_TankersLookup()
    {
        _model = new _TankersLookupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "equipment_name", model_internal::setterListenerEquipment_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_eqpt_name", model_internal::setterListenerTnkr_eqpt_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_code", model_internal::setterListenerTnkr_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "carrier_name", model_internal::setterListenerCarrier_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_carrier_name", model_internal::setterListenerTnkr_carrier_name));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get equipment_name() : Object
    {
        return _internal_equipment_name;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_eqpt_name() : String
    {
        return _internal_tnkr_eqpt_name;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_code() : String
    {
        return _internal_tnkr_code;
    }

    [Bindable(event="propertyChange")]
    public function get carrier_name() : Object
    {
        return _internal_carrier_name;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_carrier_name() : String
    {
        return _internal_tnkr_carrier_name;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set equipment_name(value:Object) : void
    {
        var oldValue:Object = _internal_equipment_name;
        if (oldValue !== value)
        {
            _internal_equipment_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "equipment_name", oldValue, _internal_equipment_name));
        }
    }

    public function set tnkr_eqpt_name(value:String) : void
    {
        var oldValue:String = _internal_tnkr_eqpt_name;
        if (oldValue !== value)
        {
            _internal_tnkr_eqpt_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_eqpt_name", oldValue, _internal_tnkr_eqpt_name));
        }
    }

    public function set tnkr_code(value:String) : void
    {
        var oldValue:String = _internal_tnkr_code;
        if (oldValue !== value)
        {
            _internal_tnkr_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_code", oldValue, _internal_tnkr_code));
        }
    }

    public function set carrier_name(value:Object) : void
    {
        var oldValue:Object = _internal_carrier_name;
        if (oldValue !== value)
        {
            _internal_carrier_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "carrier_name", oldValue, _internal_carrier_name));
        }
    }

    public function set tnkr_carrier_name(value:String) : void
    {
        var oldValue:String = _internal_tnkr_carrier_name;
        if (oldValue !== value)
        {
            _internal_tnkr_carrier_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_carrier_name", oldValue, _internal_tnkr_carrier_name));
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

    model_internal function setterListenerEquipment_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEquipment_name();
    }

    model_internal function setterListenerTnkr_eqpt_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_eqpt_name();
    }

    model_internal function setterListenerTnkr_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_code();
    }

    model_internal function setterListenerCarrier_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCarrier_name();
    }

    model_internal function setterListenerTnkr_carrier_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_carrier_name();
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
        if (!_model.equipment_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_equipment_nameValidationFailureMessages);
        }
        if (!_model.tnkr_eqpt_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_eqpt_nameValidationFailureMessages);
        }
        if (!_model.tnkr_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_codeValidationFailureMessages);
        }
        if (!_model.carrier_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_carrier_nameValidationFailureMessages);
        }
        if (!_model.tnkr_carrier_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_carrier_nameValidationFailureMessages);
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
    public function get _model() : _TankersLookupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _TankersLookupEntityMetadata) : void
    {
        var oldValue : _TankersLookupEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfEquipment_name : Array = null;
    model_internal var _doValidationLastValOfEquipment_name : Object;

    model_internal function _doValidationForEquipment_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfEquipment_name != null && model_internal::_doValidationLastValOfEquipment_name == value)
           return model_internal::_doValidationCacheOfEquipment_name ;

        _model.model_internal::_equipment_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEquipment_nameAvailable && _internal_equipment_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "equipment_name is required"));
        }

        model_internal::_doValidationCacheOfEquipment_name = validationFailures;
        model_internal::_doValidationLastValOfEquipment_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_eqpt_name : Array = null;
    model_internal var _doValidationLastValOfTnkr_eqpt_name : String;

    model_internal function _doValidationForTnkr_eqpt_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_eqpt_name != null && model_internal::_doValidationLastValOfTnkr_eqpt_name == value)
           return model_internal::_doValidationCacheOfTnkr_eqpt_name ;

        _model.model_internal::_tnkr_eqpt_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_eqpt_nameAvailable && _internal_tnkr_eqpt_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_eqpt_name is required"));
        }

        model_internal::_doValidationCacheOfTnkr_eqpt_name = validationFailures;
        model_internal::_doValidationLastValOfTnkr_eqpt_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_code : Array = null;
    model_internal var _doValidationLastValOfTnkr_code : String;

    model_internal function _doValidationForTnkr_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_code != null && model_internal::_doValidationLastValOfTnkr_code == value)
           return model_internal::_doValidationCacheOfTnkr_code ;

        _model.model_internal::_tnkr_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_codeAvailable && _internal_tnkr_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_code is required"));
        }

        model_internal::_doValidationCacheOfTnkr_code = validationFailures;
        model_internal::_doValidationLastValOfTnkr_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCarrier_name : Array = null;
    model_internal var _doValidationLastValOfCarrier_name : Object;

    model_internal function _doValidationForCarrier_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfCarrier_name != null && model_internal::_doValidationLastValOfCarrier_name == value)
           return model_internal::_doValidationCacheOfCarrier_name ;

        _model.model_internal::_carrier_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCarrier_nameAvailable && _internal_carrier_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "carrier_name is required"));
        }

        model_internal::_doValidationCacheOfCarrier_name = validationFailures;
        model_internal::_doValidationLastValOfCarrier_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_carrier_name : Array = null;
    model_internal var _doValidationLastValOfTnkr_carrier_name : String;

    model_internal function _doValidationForTnkr_carrier_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_carrier_name != null && model_internal::_doValidationLastValOfTnkr_carrier_name == value)
           return model_internal::_doValidationCacheOfTnkr_carrier_name ;

        _model.model_internal::_tnkr_carrier_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_carrier_nameAvailable && _internal_tnkr_carrier_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_carrier_name is required"));
        }

        model_internal::_doValidationCacheOfTnkr_carrier_name = validationFailures;
        model_internal::_doValidationLastValOfTnkr_carrier_name = value;

        return validationFailures;
    }
    

}

}
