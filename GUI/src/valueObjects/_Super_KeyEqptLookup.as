/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - KeyEqptLookup.as.
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
public class _Super_KeyEqptLookup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("KeyEqptLookup") == null)
            {
                flash.net.registerClassAlias("KeyEqptLookup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("KeyEqptLookup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _KeyEqptLookupEntityMetadata;
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
    private var _internal_eqpt_ownr_name : String;
    private var _internal_eqpt_desc : String;
    private var _internal_eqpt_code : String;
    private var _internal_eqpt_etyp_id : String;
    private var _internal_eqpt_etyp_name : String;
    private var _internal_eqpt_ownr_code : String;
    private var _internal_eqpt_name : Object;
    private var _internal_eqpt_id : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_KeyEqptLookup()
    {
        _model = new _KeyEqptLookupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_ownr_name", model_internal::setterListenerEqpt_ownr_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_desc", model_internal::setterListenerEqpt_desc));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_code", model_internal::setterListenerEqpt_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_etyp_id", model_internal::setterListenerEqpt_etyp_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_etyp_name", model_internal::setterListenerEqpt_etyp_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_ownr_code", model_internal::setterListenerEqpt_ownr_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_name", model_internal::setterListenerEqpt_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_id", model_internal::setterListenerEqpt_id));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get eqpt_ownr_name() : String
    {
        return _internal_eqpt_ownr_name;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_desc() : String
    {
        return _internal_eqpt_desc;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_code() : String
    {
        return _internal_eqpt_code;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etyp_id() : String
    {
        return _internal_eqpt_etyp_id;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etyp_name() : String
    {
        return _internal_eqpt_etyp_name;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_ownr_code() : String
    {
        return _internal_eqpt_ownr_code;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_name() : Object
    {
        return _internal_eqpt_name;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_id() : String
    {
        return _internal_eqpt_id;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set eqpt_ownr_name(value:String) : void
    {
        var oldValue:String = _internal_eqpt_ownr_name;
        if (oldValue !== value)
        {
            _internal_eqpt_ownr_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_ownr_name", oldValue, _internal_eqpt_ownr_name));
        }
    }

    public function set eqpt_desc(value:String) : void
    {
        var oldValue:String = _internal_eqpt_desc;
        if (oldValue !== value)
        {
            _internal_eqpt_desc = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_desc", oldValue, _internal_eqpt_desc));
        }
    }

    public function set eqpt_code(value:String) : void
    {
        var oldValue:String = _internal_eqpt_code;
        if (oldValue !== value)
        {
            _internal_eqpt_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_code", oldValue, _internal_eqpt_code));
        }
    }

    public function set eqpt_etyp_id(value:String) : void
    {
        var oldValue:String = _internal_eqpt_etyp_id;
        if (oldValue !== value)
        {
            _internal_eqpt_etyp_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etyp_id", oldValue, _internal_eqpt_etyp_id));
        }
    }

    public function set eqpt_etyp_name(value:String) : void
    {
        var oldValue:String = _internal_eqpt_etyp_name;
        if (oldValue !== value)
        {
            _internal_eqpt_etyp_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etyp_name", oldValue, _internal_eqpt_etyp_name));
        }
    }

    public function set eqpt_ownr_code(value:String) : void
    {
        var oldValue:String = _internal_eqpt_ownr_code;
        if (oldValue !== value)
        {
            _internal_eqpt_ownr_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_ownr_code", oldValue, _internal_eqpt_ownr_code));
        }
    }

    public function set eqpt_name(value:Object) : void
    {
        var oldValue:Object = _internal_eqpt_name;
        if (oldValue !== value)
        {
            _internal_eqpt_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_name", oldValue, _internal_eqpt_name));
        }
    }

    public function set eqpt_id(value:String) : void
    {
        var oldValue:String = _internal_eqpt_id;
        if (oldValue !== value)
        {
            _internal_eqpt_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_id", oldValue, _internal_eqpt_id));
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

    model_internal function setterListenerEqpt_ownr_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_ownr_name();
    }

    model_internal function setterListenerEqpt_desc(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_desc();
    }

    model_internal function setterListenerEqpt_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_code();
    }

    model_internal function setterListenerEqpt_etyp_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_etyp_id();
    }

    model_internal function setterListenerEqpt_etyp_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_etyp_name();
    }

    model_internal function setterListenerEqpt_ownr_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_ownr_code();
    }

    model_internal function setterListenerEqpt_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_name();
    }

    model_internal function setterListenerEqpt_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_id();
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
        if (!_model.eqpt_ownr_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_ownr_nameValidationFailureMessages);
        }
        if (!_model.eqpt_descIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_descValidationFailureMessages);
        }
        if (!_model.eqpt_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_codeValidationFailureMessages);
        }
        if (!_model.eqpt_etyp_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_etyp_idValidationFailureMessages);
        }
        if (!_model.eqpt_etyp_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_etyp_nameValidationFailureMessages);
        }
        if (!_model.eqpt_ownr_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_ownr_codeValidationFailureMessages);
        }
        if (!_model.eqpt_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_nameValidationFailureMessages);
        }
        if (!_model.eqpt_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_idValidationFailureMessages);
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
    public function get _model() : _KeyEqptLookupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _KeyEqptLookupEntityMetadata) : void
    {
        var oldValue : _KeyEqptLookupEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfEqpt_ownr_name : Array = null;
    model_internal var _doValidationLastValOfEqpt_ownr_name : String;

    model_internal function _doValidationForEqpt_ownr_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_ownr_name != null && model_internal::_doValidationLastValOfEqpt_ownr_name == value)
           return model_internal::_doValidationCacheOfEqpt_ownr_name ;

        _model.model_internal::_eqpt_ownr_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_ownr_nameAvailable && _internal_eqpt_ownr_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_ownr_name is required"));
        }

        model_internal::_doValidationCacheOfEqpt_ownr_name = validationFailures;
        model_internal::_doValidationLastValOfEqpt_ownr_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_desc : Array = null;
    model_internal var _doValidationLastValOfEqpt_desc : String;

    model_internal function _doValidationForEqpt_desc(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_desc != null && model_internal::_doValidationLastValOfEqpt_desc == value)
           return model_internal::_doValidationCacheOfEqpt_desc ;

        _model.model_internal::_eqpt_descIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_descAvailable && _internal_eqpt_desc == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_desc is required"));
        }

        model_internal::_doValidationCacheOfEqpt_desc = validationFailures;
        model_internal::_doValidationLastValOfEqpt_desc = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_code : Array = null;
    model_internal var _doValidationLastValOfEqpt_code : String;

    model_internal function _doValidationForEqpt_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_code != null && model_internal::_doValidationLastValOfEqpt_code == value)
           return model_internal::_doValidationCacheOfEqpt_code ;

        _model.model_internal::_eqpt_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_codeAvailable && _internal_eqpt_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_code is required"));
        }

        model_internal::_doValidationCacheOfEqpt_code = validationFailures;
        model_internal::_doValidationLastValOfEqpt_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_etyp_id : Array = null;
    model_internal var _doValidationLastValOfEqpt_etyp_id : String;

    model_internal function _doValidationForEqpt_etyp_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_etyp_id != null && model_internal::_doValidationLastValOfEqpt_etyp_id == value)
           return model_internal::_doValidationCacheOfEqpt_etyp_id ;

        _model.model_internal::_eqpt_etyp_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_etyp_idAvailable && _internal_eqpt_etyp_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_etyp_id is required"));
        }

        model_internal::_doValidationCacheOfEqpt_etyp_id = validationFailures;
        model_internal::_doValidationLastValOfEqpt_etyp_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_etyp_name : Array = null;
    model_internal var _doValidationLastValOfEqpt_etyp_name : String;

    model_internal function _doValidationForEqpt_etyp_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_etyp_name != null && model_internal::_doValidationLastValOfEqpt_etyp_name == value)
           return model_internal::_doValidationCacheOfEqpt_etyp_name ;

        _model.model_internal::_eqpt_etyp_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_etyp_nameAvailable && _internal_eqpt_etyp_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_etyp_name is required"));
        }

        model_internal::_doValidationCacheOfEqpt_etyp_name = validationFailures;
        model_internal::_doValidationLastValOfEqpt_etyp_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_ownr_code : Array = null;
    model_internal var _doValidationLastValOfEqpt_ownr_code : String;

    model_internal function _doValidationForEqpt_ownr_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_ownr_code != null && model_internal::_doValidationLastValOfEqpt_ownr_code == value)
           return model_internal::_doValidationCacheOfEqpt_ownr_code ;

        _model.model_internal::_eqpt_ownr_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_ownr_codeAvailable && _internal_eqpt_ownr_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_ownr_code is required"));
        }

        model_internal::_doValidationCacheOfEqpt_ownr_code = validationFailures;
        model_internal::_doValidationLastValOfEqpt_ownr_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_name : Array = null;
    model_internal var _doValidationLastValOfEqpt_name : Object;

    model_internal function _doValidationForEqpt_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfEqpt_name != null && model_internal::_doValidationLastValOfEqpt_name == value)
           return model_internal::_doValidationCacheOfEqpt_name ;

        _model.model_internal::_eqpt_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_nameAvailable && _internal_eqpt_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_name is required"));
        }

        model_internal::_doValidationCacheOfEqpt_name = validationFailures;
        model_internal::_doValidationLastValOfEqpt_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_id : Array = null;
    model_internal var _doValidationLastValOfEqpt_id : String;

    model_internal function _doValidationForEqpt_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_id != null && model_internal::_doValidationLastValOfEqpt_id == value)
           return model_internal::_doValidationCacheOfEqpt_id ;

        _model.model_internal::_eqpt_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_idAvailable && _internal_eqpt_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_id is required"));
        }

        model_internal::_doValidationCacheOfEqpt_id = validationFailures;
        model_internal::_doValidationLastValOfEqpt_id = value;

        return validationFailures;
    }
    

}

}
