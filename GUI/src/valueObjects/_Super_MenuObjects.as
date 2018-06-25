/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - MenuObjects.as.
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
public class _Super_MenuObjects extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("MenuObjects") == null)
            {
                flash.net.registerClassAlias("MenuObjects", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("MenuObjects", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _MenuObjectsEntityMetadata;
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
    private var _internal_record_switch : String;
    private var _internal_object_note : Object;
    private var _internal_object_source : Object;
    private var _internal_object_id : String;
    private var _internal_domain_id : String;
    private var _internal_record_order : String;
    private var _internal_object_code : String;
    private var _internal_domain_object_active : String;
    private var _internal_object_type : String;
    private var _internal_object_icon_id : Object;
    private var _internal_modules : Object;
    private var _internal_domain_object_id : String;
    private var _internal_object_parent_id : String;
    private var _internal_object_text : String;
    private var _internal_object_module_id : Object;
    private var _internal_domain_text : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_MenuObjects()
    {
        _model = new _MenuObjectsEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "record_switch", model_internal::setterListenerRecord_switch));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "object_note", model_internal::setterListenerObject_note));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "object_source", model_internal::setterListenerObject_source));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "object_id", model_internal::setterListenerObject_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "domain_id", model_internal::setterListenerDomain_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "record_order", model_internal::setterListenerRecord_order));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "object_code", model_internal::setterListenerObject_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "domain_object_active", model_internal::setterListenerDomain_object_active));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "object_type", model_internal::setterListenerObject_type));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "object_icon_id", model_internal::setterListenerObject_icon_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "modules", model_internal::setterListenerModules));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "domain_object_id", model_internal::setterListenerDomain_object_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "object_parent_id", model_internal::setterListenerObject_parent_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "object_text", model_internal::setterListenerObject_text));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "object_module_id", model_internal::setterListenerObject_module_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "domain_text", model_internal::setterListenerDomain_text));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get record_switch() : String
    {
        return _internal_record_switch;
    }

    [Bindable(event="propertyChange")]
    public function get object_note() : Object
    {
        return _internal_object_note;
    }

    [Bindable(event="propertyChange")]
    public function get object_source() : Object
    {
        return _internal_object_source;
    }

    [Bindable(event="propertyChange")]
    public function get object_id() : String
    {
        return _internal_object_id;
    }

    [Bindable(event="propertyChange")]
    public function get domain_id() : String
    {
        return _internal_domain_id;
    }

    [Bindable(event="propertyChange")]
    public function get record_order() : String
    {
        return _internal_record_order;
    }

    [Bindable(event="propertyChange")]
    public function get object_code() : String
    {
        return _internal_object_code;
    }

    [Bindable(event="propertyChange")]
    public function get domain_object_active() : String
    {
        return _internal_domain_object_active;
    }

    [Bindable(event="propertyChange")]
    public function get object_type() : String
    {
        return _internal_object_type;
    }

    [Bindable(event="propertyChange")]
    public function get object_icon_id() : Object
    {
        return _internal_object_icon_id;
    }

    [Bindable(event="propertyChange")]
    public function get modules() : Object
    {
        return _internal_modules;
    }

    [Bindable(event="propertyChange")]
    public function get domain_object_id() : String
    {
        return _internal_domain_object_id;
    }

    [Bindable(event="propertyChange")]
    public function get object_parent_id() : String
    {
        return _internal_object_parent_id;
    }

    [Bindable(event="propertyChange")]
    public function get object_text() : String
    {
        return _internal_object_text;
    }

    [Bindable(event="propertyChange")]
    public function get object_module_id() : Object
    {
        return _internal_object_module_id;
    }

    [Bindable(event="propertyChange")]
    public function get domain_text() : String
    {
        return _internal_domain_text;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set record_switch(value:String) : void
    {
        var oldValue:String = _internal_record_switch;
        if (oldValue !== value)
        {
            _internal_record_switch = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "record_switch", oldValue, _internal_record_switch));
        }
    }

    public function set object_note(value:Object) : void
    {
        var oldValue:Object = _internal_object_note;
        if (oldValue !== value)
        {
            _internal_object_note = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_note", oldValue, _internal_object_note));
        }
    }

    public function set object_source(value:Object) : void
    {
        var oldValue:Object = _internal_object_source;
        if (oldValue !== value)
        {
            _internal_object_source = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_source", oldValue, _internal_object_source));
        }
    }

    public function set object_id(value:String) : void
    {
        var oldValue:String = _internal_object_id;
        if (oldValue !== value)
        {
            _internal_object_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_id", oldValue, _internal_object_id));
        }
    }

    public function set domain_id(value:String) : void
    {
        var oldValue:String = _internal_domain_id;
        if (oldValue !== value)
        {
            _internal_domain_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "domain_id", oldValue, _internal_domain_id));
        }
    }

    public function set record_order(value:String) : void
    {
        var oldValue:String = _internal_record_order;
        if (oldValue !== value)
        {
            _internal_record_order = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "record_order", oldValue, _internal_record_order));
        }
    }

    public function set object_code(value:String) : void
    {
        var oldValue:String = _internal_object_code;
        if (oldValue !== value)
        {
            _internal_object_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_code", oldValue, _internal_object_code));
        }
    }

    public function set domain_object_active(value:String) : void
    {
        var oldValue:String = _internal_domain_object_active;
        if (oldValue !== value)
        {
            _internal_domain_object_active = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "domain_object_active", oldValue, _internal_domain_object_active));
        }
    }

    public function set object_type(value:String) : void
    {
        var oldValue:String = _internal_object_type;
        if (oldValue !== value)
        {
            _internal_object_type = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_type", oldValue, _internal_object_type));
        }
    }

    public function set object_icon_id(value:Object) : void
    {
        var oldValue:Object = _internal_object_icon_id;
        if (oldValue !== value)
        {
            _internal_object_icon_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_icon_id", oldValue, _internal_object_icon_id));
        }
    }

    public function set modules(value:Object) : void
    {
        var oldValue:Object = _internal_modules;
        if (oldValue !== value)
        {
            _internal_modules = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "modules", oldValue, _internal_modules));
        }
    }

    public function set domain_object_id(value:String) : void
    {
        var oldValue:String = _internal_domain_object_id;
        if (oldValue !== value)
        {
            _internal_domain_object_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "domain_object_id", oldValue, _internal_domain_object_id));
        }
    }

    public function set object_parent_id(value:String) : void
    {
        var oldValue:String = _internal_object_parent_id;
        if (oldValue !== value)
        {
            _internal_object_parent_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_parent_id", oldValue, _internal_object_parent_id));
        }
    }

    public function set object_text(value:String) : void
    {
        var oldValue:String = _internal_object_text;
        if (oldValue !== value)
        {
            _internal_object_text = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_text", oldValue, _internal_object_text));
        }
    }

    public function set object_module_id(value:Object) : void
    {
        var oldValue:Object = _internal_object_module_id;
        if (oldValue !== value)
        {
            _internal_object_module_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_module_id", oldValue, _internal_object_module_id));
        }
    }

    public function set domain_text(value:String) : void
    {
        var oldValue:String = _internal_domain_text;
        if (oldValue !== value)
        {
            _internal_domain_text = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "domain_text", oldValue, _internal_domain_text));
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

    model_internal function setterListenerRecord_switch(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRecord_switch();
    }

    model_internal function setterListenerObject_note(value:flash.events.Event):void
    {
        _model.invalidateDependentOnObject_note();
    }

    model_internal function setterListenerObject_source(value:flash.events.Event):void
    {
        _model.invalidateDependentOnObject_source();
    }

    model_internal function setterListenerObject_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnObject_id();
    }

    model_internal function setterListenerDomain_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDomain_id();
    }

    model_internal function setterListenerRecord_order(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRecord_order();
    }

    model_internal function setterListenerObject_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnObject_code();
    }

    model_internal function setterListenerDomain_object_active(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDomain_object_active();
    }

    model_internal function setterListenerObject_type(value:flash.events.Event):void
    {
        _model.invalidateDependentOnObject_type();
    }

    model_internal function setterListenerObject_icon_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnObject_icon_id();
    }

    model_internal function setterListenerModules(value:flash.events.Event):void
    {
        _model.invalidateDependentOnModules();
    }

    model_internal function setterListenerDomain_object_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDomain_object_id();
    }

    model_internal function setterListenerObject_parent_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnObject_parent_id();
    }

    model_internal function setterListenerObject_text(value:flash.events.Event):void
    {
        _model.invalidateDependentOnObject_text();
    }

    model_internal function setterListenerObject_module_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnObject_module_id();
    }

    model_internal function setterListenerDomain_text(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDomain_text();
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
        if (!_model.record_switchIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_record_switchValidationFailureMessages);
        }
        if (!_model.object_noteIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_object_noteValidationFailureMessages);
        }
        if (!_model.object_sourceIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_object_sourceValidationFailureMessages);
        }
        if (!_model.object_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_object_idValidationFailureMessages);
        }
        if (!_model.domain_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_domain_idValidationFailureMessages);
        }
        if (!_model.record_orderIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_record_orderValidationFailureMessages);
        }
        if (!_model.object_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_object_codeValidationFailureMessages);
        }
        if (!_model.domain_object_activeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_domain_object_activeValidationFailureMessages);
        }
        if (!_model.object_typeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_object_typeValidationFailureMessages);
        }
        if (!_model.object_icon_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_object_icon_idValidationFailureMessages);
        }
        if (!_model.modulesIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_modulesValidationFailureMessages);
        }
        if (!_model.domain_object_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_domain_object_idValidationFailureMessages);
        }
        if (!_model.object_parent_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_object_parent_idValidationFailureMessages);
        }
        if (!_model.object_textIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_object_textValidationFailureMessages);
        }
        if (!_model.object_module_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_object_module_idValidationFailureMessages);
        }
        if (!_model.domain_textIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_domain_textValidationFailureMessages);
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
    public function get _model() : _MenuObjectsEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _MenuObjectsEntityMetadata) : void
    {
        var oldValue : _MenuObjectsEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfRecord_switch : Array = null;
    model_internal var _doValidationLastValOfRecord_switch : String;

    model_internal function _doValidationForRecord_switch(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRecord_switch != null && model_internal::_doValidationLastValOfRecord_switch == value)
           return model_internal::_doValidationCacheOfRecord_switch ;

        _model.model_internal::_record_switchIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRecord_switchAvailable && _internal_record_switch == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "record_switch is required"));
        }

        model_internal::_doValidationCacheOfRecord_switch = validationFailures;
        model_internal::_doValidationLastValOfRecord_switch = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfObject_note : Array = null;
    model_internal var _doValidationLastValOfObject_note : Object;

    model_internal function _doValidationForObject_note(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfObject_note != null && model_internal::_doValidationLastValOfObject_note == value)
           return model_internal::_doValidationCacheOfObject_note ;

        _model.model_internal::_object_noteIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isObject_noteAvailable && _internal_object_note == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "object_note is required"));
        }

        model_internal::_doValidationCacheOfObject_note = validationFailures;
        model_internal::_doValidationLastValOfObject_note = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfObject_source : Array = null;
    model_internal var _doValidationLastValOfObject_source : Object;

    model_internal function _doValidationForObject_source(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfObject_source != null && model_internal::_doValidationLastValOfObject_source == value)
           return model_internal::_doValidationCacheOfObject_source ;

        _model.model_internal::_object_sourceIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isObject_sourceAvailable && _internal_object_source == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "object_source is required"));
        }

        model_internal::_doValidationCacheOfObject_source = validationFailures;
        model_internal::_doValidationLastValOfObject_source = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfObject_id : Array = null;
    model_internal var _doValidationLastValOfObject_id : String;

    model_internal function _doValidationForObject_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfObject_id != null && model_internal::_doValidationLastValOfObject_id == value)
           return model_internal::_doValidationCacheOfObject_id ;

        _model.model_internal::_object_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isObject_idAvailable && _internal_object_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "object_id is required"));
        }

        model_internal::_doValidationCacheOfObject_id = validationFailures;
        model_internal::_doValidationLastValOfObject_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDomain_id : Array = null;
    model_internal var _doValidationLastValOfDomain_id : String;

    model_internal function _doValidationForDomain_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDomain_id != null && model_internal::_doValidationLastValOfDomain_id == value)
           return model_internal::_doValidationCacheOfDomain_id ;

        _model.model_internal::_domain_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDomain_idAvailable && _internal_domain_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "domain_id is required"));
        }

        model_internal::_doValidationCacheOfDomain_id = validationFailures;
        model_internal::_doValidationLastValOfDomain_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRecord_order : Array = null;
    model_internal var _doValidationLastValOfRecord_order : String;

    model_internal function _doValidationForRecord_order(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRecord_order != null && model_internal::_doValidationLastValOfRecord_order == value)
           return model_internal::_doValidationCacheOfRecord_order ;

        _model.model_internal::_record_orderIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRecord_orderAvailable && _internal_record_order == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "record_order is required"));
        }

        model_internal::_doValidationCacheOfRecord_order = validationFailures;
        model_internal::_doValidationLastValOfRecord_order = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfObject_code : Array = null;
    model_internal var _doValidationLastValOfObject_code : String;

    model_internal function _doValidationForObject_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfObject_code != null && model_internal::_doValidationLastValOfObject_code == value)
           return model_internal::_doValidationCacheOfObject_code ;

        _model.model_internal::_object_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isObject_codeAvailable && _internal_object_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "object_code is required"));
        }

        model_internal::_doValidationCacheOfObject_code = validationFailures;
        model_internal::_doValidationLastValOfObject_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDomain_object_active : Array = null;
    model_internal var _doValidationLastValOfDomain_object_active : String;

    model_internal function _doValidationForDomain_object_active(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDomain_object_active != null && model_internal::_doValidationLastValOfDomain_object_active == value)
           return model_internal::_doValidationCacheOfDomain_object_active ;

        _model.model_internal::_domain_object_activeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDomain_object_activeAvailable && _internal_domain_object_active == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "domain_object_active is required"));
        }

        model_internal::_doValidationCacheOfDomain_object_active = validationFailures;
        model_internal::_doValidationLastValOfDomain_object_active = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfObject_type : Array = null;
    model_internal var _doValidationLastValOfObject_type : String;

    model_internal function _doValidationForObject_type(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfObject_type != null && model_internal::_doValidationLastValOfObject_type == value)
           return model_internal::_doValidationCacheOfObject_type ;

        _model.model_internal::_object_typeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isObject_typeAvailable && _internal_object_type == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "object_type is required"));
        }

        model_internal::_doValidationCacheOfObject_type = validationFailures;
        model_internal::_doValidationLastValOfObject_type = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfObject_icon_id : Array = null;
    model_internal var _doValidationLastValOfObject_icon_id : Object;

    model_internal function _doValidationForObject_icon_id(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfObject_icon_id != null && model_internal::_doValidationLastValOfObject_icon_id == value)
           return model_internal::_doValidationCacheOfObject_icon_id ;

        _model.model_internal::_object_icon_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isObject_icon_idAvailable && _internal_object_icon_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "object_icon_id is required"));
        }

        model_internal::_doValidationCacheOfObject_icon_id = validationFailures;
        model_internal::_doValidationLastValOfObject_icon_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfModules : Array = null;
    model_internal var _doValidationLastValOfModules : Object;

    model_internal function _doValidationForModules(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfModules != null && model_internal::_doValidationLastValOfModules == value)
           return model_internal::_doValidationCacheOfModules ;

        _model.model_internal::_modulesIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isModulesAvailable && _internal_modules == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "modules is required"));
        }

        model_internal::_doValidationCacheOfModules = validationFailures;
        model_internal::_doValidationLastValOfModules = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDomain_object_id : Array = null;
    model_internal var _doValidationLastValOfDomain_object_id : String;

    model_internal function _doValidationForDomain_object_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDomain_object_id != null && model_internal::_doValidationLastValOfDomain_object_id == value)
           return model_internal::_doValidationCacheOfDomain_object_id ;

        _model.model_internal::_domain_object_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDomain_object_idAvailable && _internal_domain_object_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "domain_object_id is required"));
        }

        model_internal::_doValidationCacheOfDomain_object_id = validationFailures;
        model_internal::_doValidationLastValOfDomain_object_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfObject_parent_id : Array = null;
    model_internal var _doValidationLastValOfObject_parent_id : String;

    model_internal function _doValidationForObject_parent_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfObject_parent_id != null && model_internal::_doValidationLastValOfObject_parent_id == value)
           return model_internal::_doValidationCacheOfObject_parent_id ;

        _model.model_internal::_object_parent_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isObject_parent_idAvailable && _internal_object_parent_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "object_parent_id is required"));
        }

        model_internal::_doValidationCacheOfObject_parent_id = validationFailures;
        model_internal::_doValidationLastValOfObject_parent_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfObject_text : Array = null;
    model_internal var _doValidationLastValOfObject_text : String;

    model_internal function _doValidationForObject_text(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfObject_text != null && model_internal::_doValidationLastValOfObject_text == value)
           return model_internal::_doValidationCacheOfObject_text ;

        _model.model_internal::_object_textIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isObject_textAvailable && _internal_object_text == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "object_text is required"));
        }

        model_internal::_doValidationCacheOfObject_text = validationFailures;
        model_internal::_doValidationLastValOfObject_text = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfObject_module_id : Array = null;
    model_internal var _doValidationLastValOfObject_module_id : Object;

    model_internal function _doValidationForObject_module_id(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfObject_module_id != null && model_internal::_doValidationLastValOfObject_module_id == value)
           return model_internal::_doValidationCacheOfObject_module_id ;

        _model.model_internal::_object_module_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isObject_module_idAvailable && _internal_object_module_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "object_module_id is required"));
        }

        model_internal::_doValidationCacheOfObject_module_id = validationFailures;
        model_internal::_doValidationLastValOfObject_module_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDomain_text : Array = null;
    model_internal var _doValidationLastValOfDomain_text : String;

    model_internal function _doValidationForDomain_text(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDomain_text != null && model_internal::_doValidationLastValOfDomain_text == value)
           return model_internal::_doValidationCacheOfDomain_text ;

        _model.model_internal::_domain_textIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDomain_textAvailable && _internal_domain_text == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "domain_text is required"));
        }

        model_internal::_doValidationCacheOfDomain_text = validationFailures;
        model_internal::_doValidationLastValOfDomain_text = value;

        return validationFailures;
    }
    

}

}
