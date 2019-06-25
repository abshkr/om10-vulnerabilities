/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - KeyTnkrLookup.as.
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
public class _Super_KeyTnkrLookup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("KeyTnkrLookup") == null)
            {
                flash.net.registerClassAlias("KeyTnkrLookup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("KeyTnkrLookup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _KeyTnkrLookupEntityMetadata;
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
    private var _internal_tnkr_ownr_name : String;
    private var _internal_tnkr_etyp_name : String;
    private var _internal_tnkr_name : Object;
    private var _internal_tnkr_desc : String;
    private var _internal_tnkr_carr_code : String;
    private var _internal_tnkr_ownr_code : String;
    private var _internal_tnkr_code : String;
    private var _internal_tnkr_carr_name : String;
    private var _internal_tnkr_etyp_id : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_KeyTnkrLookup()
    {
        _model = new _KeyTnkrLookupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_ownr_name", model_internal::setterListenerTnkr_ownr_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_etyp_name", model_internal::setterListenerTnkr_etyp_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_name", model_internal::setterListenerTnkr_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_desc", model_internal::setterListenerTnkr_desc));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_carr_code", model_internal::setterListenerTnkr_carr_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_ownr_code", model_internal::setterListenerTnkr_ownr_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_code", model_internal::setterListenerTnkr_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_carr_name", model_internal::setterListenerTnkr_carr_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_etyp_id", model_internal::setterListenerTnkr_etyp_id));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get tnkr_ownr_name() : String
    {
        return _internal_tnkr_ownr_name;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_etyp_name() : String
    {
        return _internal_tnkr_etyp_name;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_name() : Object
    {
        return _internal_tnkr_name;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_desc() : String
    {
        return _internal_tnkr_desc;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_carr_code() : String
    {
        return _internal_tnkr_carr_code;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_ownr_code() : String
    {
        return _internal_tnkr_ownr_code;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_code() : String
    {
        return _internal_tnkr_code;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_carr_name() : String
    {
        return _internal_tnkr_carr_name;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_etyp_id() : String
    {
        return _internal_tnkr_etyp_id;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set tnkr_ownr_name(value:String) : void
    {
        var oldValue:String = _internal_tnkr_ownr_name;
        if (oldValue !== value)
        {
            _internal_tnkr_ownr_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_ownr_name", oldValue, _internal_tnkr_ownr_name));
        }
    }

    public function set tnkr_etyp_name(value:String) : void
    {
        var oldValue:String = _internal_tnkr_etyp_name;
        if (oldValue !== value)
        {
            _internal_tnkr_etyp_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_etyp_name", oldValue, _internal_tnkr_etyp_name));
        }
    }

    public function set tnkr_name(value:Object) : void
    {
        var oldValue:Object = _internal_tnkr_name;
        if (oldValue !== value)
        {
            _internal_tnkr_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_name", oldValue, _internal_tnkr_name));
        }
    }

    public function set tnkr_desc(value:String) : void
    {
        var oldValue:String = _internal_tnkr_desc;
        if (oldValue !== value)
        {
            _internal_tnkr_desc = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_desc", oldValue, _internal_tnkr_desc));
        }
    }

    public function set tnkr_carr_code(value:String) : void
    {
        var oldValue:String = _internal_tnkr_carr_code;
        if (oldValue !== value)
        {
            _internal_tnkr_carr_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_carr_code", oldValue, _internal_tnkr_carr_code));
        }
    }

    public function set tnkr_ownr_code(value:String) : void
    {
        var oldValue:String = _internal_tnkr_ownr_code;
        if (oldValue !== value)
        {
            _internal_tnkr_ownr_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_ownr_code", oldValue, _internal_tnkr_ownr_code));
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

    public function set tnkr_carr_name(value:String) : void
    {
        var oldValue:String = _internal_tnkr_carr_name;
        if (oldValue !== value)
        {
            _internal_tnkr_carr_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_carr_name", oldValue, _internal_tnkr_carr_name));
        }
    }

    public function set tnkr_etyp_id(value:String) : void
    {
        var oldValue:String = _internal_tnkr_etyp_id;
        if (oldValue !== value)
        {
            _internal_tnkr_etyp_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_etyp_id", oldValue, _internal_tnkr_etyp_id));
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

    model_internal function setterListenerTnkr_ownr_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_ownr_name();
    }

    model_internal function setterListenerTnkr_etyp_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_etyp_name();
    }

    model_internal function setterListenerTnkr_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_name();
    }

    model_internal function setterListenerTnkr_desc(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_desc();
    }

    model_internal function setterListenerTnkr_carr_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_carr_code();
    }

    model_internal function setterListenerTnkr_ownr_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_ownr_code();
    }

    model_internal function setterListenerTnkr_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_code();
    }

    model_internal function setterListenerTnkr_carr_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_carr_name();
    }

    model_internal function setterListenerTnkr_etyp_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_etyp_id();
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
        if (!_model.tnkr_ownr_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_ownr_nameValidationFailureMessages);
        }
        if (!_model.tnkr_etyp_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_etyp_nameValidationFailureMessages);
        }
        if (!_model.tnkr_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_nameValidationFailureMessages);
        }
        if (!_model.tnkr_descIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_descValidationFailureMessages);
        }
        if (!_model.tnkr_carr_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_carr_codeValidationFailureMessages);
        }
        if (!_model.tnkr_ownr_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_ownr_codeValidationFailureMessages);
        }
        if (!_model.tnkr_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_codeValidationFailureMessages);
        }
        if (!_model.tnkr_carr_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_carr_nameValidationFailureMessages);
        }
        if (!_model.tnkr_etyp_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_etyp_idValidationFailureMessages);
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
    public function get _model() : _KeyTnkrLookupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _KeyTnkrLookupEntityMetadata) : void
    {
        var oldValue : _KeyTnkrLookupEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfTnkr_ownr_name : Array = null;
    model_internal var _doValidationLastValOfTnkr_ownr_name : String;

    model_internal function _doValidationForTnkr_ownr_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_ownr_name != null && model_internal::_doValidationLastValOfTnkr_ownr_name == value)
           return model_internal::_doValidationCacheOfTnkr_ownr_name ;

        _model.model_internal::_tnkr_ownr_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_ownr_nameAvailable && _internal_tnkr_ownr_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_ownr_name is required"));
        }

        model_internal::_doValidationCacheOfTnkr_ownr_name = validationFailures;
        model_internal::_doValidationLastValOfTnkr_ownr_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_etyp_name : Array = null;
    model_internal var _doValidationLastValOfTnkr_etyp_name : String;

    model_internal function _doValidationForTnkr_etyp_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_etyp_name != null && model_internal::_doValidationLastValOfTnkr_etyp_name == value)
           return model_internal::_doValidationCacheOfTnkr_etyp_name ;

        _model.model_internal::_tnkr_etyp_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_etyp_nameAvailable && _internal_tnkr_etyp_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_etyp_name is required"));
        }

        model_internal::_doValidationCacheOfTnkr_etyp_name = validationFailures;
        model_internal::_doValidationLastValOfTnkr_etyp_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_name : Array = null;
    model_internal var _doValidationLastValOfTnkr_name : Object;

    model_internal function _doValidationForTnkr_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfTnkr_name != null && model_internal::_doValidationLastValOfTnkr_name == value)
           return model_internal::_doValidationCacheOfTnkr_name ;

        _model.model_internal::_tnkr_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_nameAvailable && _internal_tnkr_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_name is required"));
        }

        model_internal::_doValidationCacheOfTnkr_name = validationFailures;
        model_internal::_doValidationLastValOfTnkr_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_desc : Array = null;
    model_internal var _doValidationLastValOfTnkr_desc : String;

    model_internal function _doValidationForTnkr_desc(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_desc != null && model_internal::_doValidationLastValOfTnkr_desc == value)
           return model_internal::_doValidationCacheOfTnkr_desc ;

        _model.model_internal::_tnkr_descIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_descAvailable && _internal_tnkr_desc == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_desc is required"));
        }

        model_internal::_doValidationCacheOfTnkr_desc = validationFailures;
        model_internal::_doValidationLastValOfTnkr_desc = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_carr_code : Array = null;
    model_internal var _doValidationLastValOfTnkr_carr_code : String;

    model_internal function _doValidationForTnkr_carr_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_carr_code != null && model_internal::_doValidationLastValOfTnkr_carr_code == value)
           return model_internal::_doValidationCacheOfTnkr_carr_code ;

        _model.model_internal::_tnkr_carr_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_carr_codeAvailable && _internal_tnkr_carr_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_carr_code is required"));
        }

        model_internal::_doValidationCacheOfTnkr_carr_code = validationFailures;
        model_internal::_doValidationLastValOfTnkr_carr_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_ownr_code : Array = null;
    model_internal var _doValidationLastValOfTnkr_ownr_code : String;

    model_internal function _doValidationForTnkr_ownr_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_ownr_code != null && model_internal::_doValidationLastValOfTnkr_ownr_code == value)
           return model_internal::_doValidationCacheOfTnkr_ownr_code ;

        _model.model_internal::_tnkr_ownr_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_ownr_codeAvailable && _internal_tnkr_ownr_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_ownr_code is required"));
        }

        model_internal::_doValidationCacheOfTnkr_ownr_code = validationFailures;
        model_internal::_doValidationLastValOfTnkr_ownr_code = value;

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
    
    model_internal var _doValidationCacheOfTnkr_carr_name : Array = null;
    model_internal var _doValidationLastValOfTnkr_carr_name : String;

    model_internal function _doValidationForTnkr_carr_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_carr_name != null && model_internal::_doValidationLastValOfTnkr_carr_name == value)
           return model_internal::_doValidationCacheOfTnkr_carr_name ;

        _model.model_internal::_tnkr_carr_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_carr_nameAvailable && _internal_tnkr_carr_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_carr_name is required"));
        }

        model_internal::_doValidationCacheOfTnkr_carr_name = validationFailures;
        model_internal::_doValidationLastValOfTnkr_carr_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_etyp_id : Array = null;
    model_internal var _doValidationLastValOfTnkr_etyp_id : String;

    model_internal function _doValidationForTnkr_etyp_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_etyp_id != null && model_internal::_doValidationLastValOfTnkr_etyp_id == value)
           return model_internal::_doValidationCacheOfTnkr_etyp_id ;

        _model.model_internal::_tnkr_etyp_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_etyp_idAvailable && _internal_tnkr_etyp_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_etyp_id is required"));
        }

        model_internal::_doValidationCacheOfTnkr_etyp_id = validationFailures;
        model_internal::_doValidationLastValOfTnkr_etyp_id = value;

        return validationFailures;
    }
    

}

}
