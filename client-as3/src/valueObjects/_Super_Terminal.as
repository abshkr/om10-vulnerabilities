/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - Terminal.as.
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
public class _Super_Terminal extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("Terminal") == null)
            {
                flash.net.registerClassAlias("Terminal", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("Terminal", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _TerminalEntityMetadata;
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
    private var _internal_term_remsite : Object;
    private var _internal_term_contact : Object;
    private var _internal_term_comms_avail : Object;
    private var _internal_term_addr : String;
    private var _internal_term_phoneno : Object;
    private var _internal_term_code : String;
    private var _internal_term_name : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_Terminal()
    {
        _model = new _TerminalEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "term_remsite", model_internal::setterListenerTerm_remsite));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "term_contact", model_internal::setterListenerTerm_contact));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "term_comms_avail", model_internal::setterListenerTerm_comms_avail));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "term_addr", model_internal::setterListenerTerm_addr));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "term_phoneno", model_internal::setterListenerTerm_phoneno));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "term_code", model_internal::setterListenerTerm_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "term_name", model_internal::setterListenerTerm_name));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get term_remsite() : Object
    {
        return _internal_term_remsite;
    }

    [Bindable(event="propertyChange")]
    public function get term_contact() : Object
    {
        return _internal_term_contact;
    }

    [Bindable(event="propertyChange")]
    public function get term_comms_avail() : Object
    {
        return _internal_term_comms_avail;
    }

    [Bindable(event="propertyChange")]
    public function get term_addr() : String
    {
        return _internal_term_addr;
    }

    [Bindable(event="propertyChange")]
    public function get term_phoneno() : Object
    {
        return _internal_term_phoneno;
    }

    [Bindable(event="propertyChange")]
    public function get term_code() : String
    {
        return _internal_term_code;
    }

    [Bindable(event="propertyChange")]
    public function get term_name() : String
    {
        return _internal_term_name;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set term_remsite(value:Object) : void
    {
        var oldValue:Object = _internal_term_remsite;
        if (oldValue !== value)
        {
            _internal_term_remsite = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_remsite", oldValue, _internal_term_remsite));
        }
    }

    public function set term_contact(value:Object) : void
    {
        var oldValue:Object = _internal_term_contact;
        if (oldValue !== value)
        {
            _internal_term_contact = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_contact", oldValue, _internal_term_contact));
        }
    }

    public function set term_comms_avail(value:Object) : void
    {
        var oldValue:Object = _internal_term_comms_avail;
        if (oldValue !== value)
        {
            _internal_term_comms_avail = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_comms_avail", oldValue, _internal_term_comms_avail));
        }
    }

    public function set term_addr(value:String) : void
    {
        var oldValue:String = _internal_term_addr;
        if (oldValue !== value)
        {
            _internal_term_addr = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_addr", oldValue, _internal_term_addr));
        }
    }

    public function set term_phoneno(value:Object) : void
    {
        var oldValue:Object = _internal_term_phoneno;
        if (oldValue !== value)
        {
            _internal_term_phoneno = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_phoneno", oldValue, _internal_term_phoneno));
        }
    }

    public function set term_code(value:String) : void
    {
        var oldValue:String = _internal_term_code;
        if (oldValue !== value)
        {
            _internal_term_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_code", oldValue, _internal_term_code));
        }
    }

    public function set term_name(value:String) : void
    {
        var oldValue:String = _internal_term_name;
        if (oldValue !== value)
        {
            _internal_term_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_name", oldValue, _internal_term_name));
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

    model_internal function setterListenerTerm_remsite(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTerm_remsite();
    }

    model_internal function setterListenerTerm_contact(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTerm_contact();
    }

    model_internal function setterListenerTerm_comms_avail(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTerm_comms_avail();
    }

    model_internal function setterListenerTerm_addr(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTerm_addr();
    }

    model_internal function setterListenerTerm_phoneno(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTerm_phoneno();
    }

    model_internal function setterListenerTerm_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTerm_code();
    }

    model_internal function setterListenerTerm_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTerm_name();
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
        if (!_model.term_remsiteIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_term_remsiteValidationFailureMessages);
        }
        if (!_model.term_contactIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_term_contactValidationFailureMessages);
        }
        if (!_model.term_comms_availIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_term_comms_availValidationFailureMessages);
        }
        if (!_model.term_addrIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_term_addrValidationFailureMessages);
        }
        if (!_model.term_phonenoIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_term_phonenoValidationFailureMessages);
        }
        if (!_model.term_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_term_codeValidationFailureMessages);
        }
        if (!_model.term_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_term_nameValidationFailureMessages);
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
    public function get _model() : _TerminalEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _TerminalEntityMetadata) : void
    {
        var oldValue : _TerminalEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfTerm_remsite : Array = null;
    model_internal var _doValidationLastValOfTerm_remsite : Object;

    model_internal function _doValidationForTerm_remsite(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfTerm_remsite != null && model_internal::_doValidationLastValOfTerm_remsite == value)
           return model_internal::_doValidationCacheOfTerm_remsite ;

        _model.model_internal::_term_remsiteIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTerm_remsiteAvailable && _internal_term_remsite == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "term_remsite is required"));
        }

        model_internal::_doValidationCacheOfTerm_remsite = validationFailures;
        model_internal::_doValidationLastValOfTerm_remsite = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTerm_contact : Array = null;
    model_internal var _doValidationLastValOfTerm_contact : Object;

    model_internal function _doValidationForTerm_contact(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfTerm_contact != null && model_internal::_doValidationLastValOfTerm_contact == value)
           return model_internal::_doValidationCacheOfTerm_contact ;

        _model.model_internal::_term_contactIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTerm_contactAvailable && _internal_term_contact == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "term_contact is required"));
        }

        model_internal::_doValidationCacheOfTerm_contact = validationFailures;
        model_internal::_doValidationLastValOfTerm_contact = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTerm_comms_avail : Array = null;
    model_internal var _doValidationLastValOfTerm_comms_avail : Object;

    model_internal function _doValidationForTerm_comms_avail(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfTerm_comms_avail != null && model_internal::_doValidationLastValOfTerm_comms_avail == value)
           return model_internal::_doValidationCacheOfTerm_comms_avail ;

        _model.model_internal::_term_comms_availIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTerm_comms_availAvailable && _internal_term_comms_avail == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "term_comms_avail is required"));
        }

        model_internal::_doValidationCacheOfTerm_comms_avail = validationFailures;
        model_internal::_doValidationLastValOfTerm_comms_avail = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTerm_addr : Array = null;
    model_internal var _doValidationLastValOfTerm_addr : String;

    model_internal function _doValidationForTerm_addr(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTerm_addr != null && model_internal::_doValidationLastValOfTerm_addr == value)
           return model_internal::_doValidationCacheOfTerm_addr ;

        _model.model_internal::_term_addrIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTerm_addrAvailable && _internal_term_addr == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "term_addr is required"));
        }

        model_internal::_doValidationCacheOfTerm_addr = validationFailures;
        model_internal::_doValidationLastValOfTerm_addr = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTerm_phoneno : Array = null;
    model_internal var _doValidationLastValOfTerm_phoneno : Object;

    model_internal function _doValidationForTerm_phoneno(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfTerm_phoneno != null && model_internal::_doValidationLastValOfTerm_phoneno == value)
           return model_internal::_doValidationCacheOfTerm_phoneno ;

        _model.model_internal::_term_phonenoIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTerm_phonenoAvailable && _internal_term_phoneno == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "term_phoneno is required"));
        }

        model_internal::_doValidationCacheOfTerm_phoneno = validationFailures;
        model_internal::_doValidationLastValOfTerm_phoneno = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTerm_code : Array = null;
    model_internal var _doValidationLastValOfTerm_code : String;

    model_internal function _doValidationForTerm_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTerm_code != null && model_internal::_doValidationLastValOfTerm_code == value)
           return model_internal::_doValidationCacheOfTerm_code ;

        _model.model_internal::_term_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTerm_codeAvailable && _internal_term_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "term_code is required"));
        }

        model_internal::_doValidationCacheOfTerm_code = validationFailures;
        model_internal::_doValidationLastValOfTerm_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTerm_name : Array = null;
    model_internal var _doValidationLastValOfTerm_name : String;

    model_internal function _doValidationForTerm_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTerm_name != null && model_internal::_doValidationLastValOfTerm_name == value)
           return model_internal::_doValidationCacheOfTerm_name ;

        _model.model_internal::_term_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTerm_nameAvailable && _internal_term_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "term_name is required"));
        }

        model_internal::_doValidationCacheOfTerm_name = validationFailures;
        model_internal::_doValidationLastValOfTerm_name = value;

        return validationFailures;
    }
    

}

}
