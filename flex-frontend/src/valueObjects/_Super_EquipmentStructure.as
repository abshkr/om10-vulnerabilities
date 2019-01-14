/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - EquipmentStructure.as.
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
import mx.events.CollectionEvent;
import mx.events.PropertyChangeEvent;
import mx.validators.ValidationResult;
import valueObjects.EquipmentCompartment;

import flash.net.registerClassAlias;
import flash.net.getClassByAlias;
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.valueobjects.IPropertyIterator;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;

use namespace model_internal;

[ExcludeClass]
public class _Super_EquipmentStructure extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("EquipmentStructure") == null)
            {
                flash.net.registerClassAlias("EquipmentStructure", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("EquipmentStructure", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
        valueObjects.EquipmentCompartment.initRemoteClassAliasSingleChild();
    }

    model_internal var _dminternal_model : _EquipmentStructureEntityMetadata;
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
    private var _internal_eqpt_etp : String;
    private var _internal_eqpt_owner : String;
    private var _internal_eqpt_lock : String;
    private var _internal_eqpt_title : String;
    private var _internal_eqpt_code : String;
    private var _internal_eqpt_owner_name : String;
    private var _internal_eqpt_etp_title : String;
    private var _internal_eqpt_name : String;
    private var _internal_compartments : ArrayCollection;
    model_internal var _internal_compartments_leaf:valueObjects.EquipmentCompartment;
    private var _internal_eqpt_id : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_EquipmentStructure()
    {
        _model = new _EquipmentStructureEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_etp", model_internal::setterListenerEqpt_etp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_owner", model_internal::setterListenerEqpt_owner));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_lock", model_internal::setterListenerEqpt_lock));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_title", model_internal::setterListenerEqpt_title));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_code", model_internal::setterListenerEqpt_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_owner_name", model_internal::setterListenerEqpt_owner_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_etp_title", model_internal::setterListenerEqpt_etp_title));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_name", model_internal::setterListenerEqpt_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "compartments", model_internal::setterListenerCompartments));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_id", model_internal::setterListenerEqpt_id));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get eqpt_etp() : String
    {
        return _internal_eqpt_etp;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_owner() : String
    {
        return _internal_eqpt_owner;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_lock() : String
    {
        return _internal_eqpt_lock;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_title() : String
    {
        return _internal_eqpt_title;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_code() : String
    {
        return _internal_eqpt_code;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_owner_name() : String
    {
        return _internal_eqpt_owner_name;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etp_title() : String
    {
        return _internal_eqpt_etp_title;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_name() : String
    {
        return _internal_eqpt_name;
    }

    [Bindable(event="propertyChange")]
    public function get compartments() : ArrayCollection
    {
        return _internal_compartments;
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

    public function set eqpt_etp(value:String) : void
    {
        var oldValue:String = _internal_eqpt_etp;
        if (oldValue !== value)
        {
            _internal_eqpt_etp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etp", oldValue, _internal_eqpt_etp));
        }
    }

    public function set eqpt_owner(value:String) : void
    {
        var oldValue:String = _internal_eqpt_owner;
        if (oldValue !== value)
        {
            _internal_eqpt_owner = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_owner", oldValue, _internal_eqpt_owner));
        }
    }

    public function set eqpt_lock(value:String) : void
    {
        var oldValue:String = _internal_eqpt_lock;
        if (oldValue !== value)
        {
            _internal_eqpt_lock = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_lock", oldValue, _internal_eqpt_lock));
        }
    }

    public function set eqpt_title(value:String) : void
    {
        var oldValue:String = _internal_eqpt_title;
        if (oldValue !== value)
        {
            _internal_eqpt_title = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_title", oldValue, _internal_eqpt_title));
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

    public function set eqpt_owner_name(value:String) : void
    {
        var oldValue:String = _internal_eqpt_owner_name;
        if (oldValue !== value)
        {
            _internal_eqpt_owner_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_owner_name", oldValue, _internal_eqpt_owner_name));
        }
    }

    public function set eqpt_etp_title(value:String) : void
    {
        var oldValue:String = _internal_eqpt_etp_title;
        if (oldValue !== value)
        {
            _internal_eqpt_etp_title = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etp_title", oldValue, _internal_eqpt_etp_title));
        }
    }

    public function set eqpt_name(value:String) : void
    {
        var oldValue:String = _internal_eqpt_name;
        if (oldValue !== value)
        {
            _internal_eqpt_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_name", oldValue, _internal_eqpt_name));
        }
    }

    public function set compartments(value:*) : void
    {
        var oldValue:ArrayCollection = _internal_compartments;
        if (oldValue !== value)
        {
            if (value is ArrayCollection)
            {
                _internal_compartments = value;
            }
            else if (value is Array)
            {
                _internal_compartments = new ArrayCollection(value);
            }
            else if (value == null)
            {
                _internal_compartments = null;
            }
            else
            {
                throw new Error("value of compartments must be a collection");
            }
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "compartments", oldValue, _internal_compartments));
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

    model_internal function setterListenerEqpt_etp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_etp();
    }

    model_internal function setterListenerEqpt_owner(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_owner();
    }

    model_internal function setterListenerEqpt_lock(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_lock();
    }

    model_internal function setterListenerEqpt_title(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_title();
    }

    model_internal function setterListenerEqpt_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_code();
    }

    model_internal function setterListenerEqpt_owner_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_owner_name();
    }

    model_internal function setterListenerEqpt_etp_title(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_etp_title();
    }

    model_internal function setterListenerEqpt_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_name();
    }

    model_internal function setterListenerCompartments(value:flash.events.Event):void
    {
        if (value is mx.events.PropertyChangeEvent)
        {
            if (mx.events.PropertyChangeEvent(value).newValue)
            {
                mx.events.PropertyChangeEvent(value).newValue.addEventListener(mx.events.CollectionEvent.COLLECTION_CHANGE, model_internal::setterListenerCompartments);
            }
        }
        _model.invalidateDependentOnCompartments();
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
        if (!_model.eqpt_etpIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_etpValidationFailureMessages);
        }
        if (!_model.eqpt_ownerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_ownerValidationFailureMessages);
        }
        if (!_model.eqpt_lockIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_lockValidationFailureMessages);
        }
        if (!_model.eqpt_titleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_titleValidationFailureMessages);
        }
        if (!_model.eqpt_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_codeValidationFailureMessages);
        }
        if (!_model.eqpt_owner_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_owner_nameValidationFailureMessages);
        }
        if (!_model.eqpt_etp_titleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_etp_titleValidationFailureMessages);
        }
        if (!_model.eqpt_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_nameValidationFailureMessages);
        }
        if (!_model.compartmentsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_compartmentsValidationFailureMessages);
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
    public function get _model() : _EquipmentStructureEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _EquipmentStructureEntityMetadata) : void
    {
        var oldValue : _EquipmentStructureEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfEqpt_etp : Array = null;
    model_internal var _doValidationLastValOfEqpt_etp : String;

    model_internal function _doValidationForEqpt_etp(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_etp != null && model_internal::_doValidationLastValOfEqpt_etp == value)
           return model_internal::_doValidationCacheOfEqpt_etp ;

        _model.model_internal::_eqpt_etpIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_etpAvailable && _internal_eqpt_etp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_etp is required"));
        }

        model_internal::_doValidationCacheOfEqpt_etp = validationFailures;
        model_internal::_doValidationLastValOfEqpt_etp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_owner : Array = null;
    model_internal var _doValidationLastValOfEqpt_owner : String;

    model_internal function _doValidationForEqpt_owner(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_owner != null && model_internal::_doValidationLastValOfEqpt_owner == value)
           return model_internal::_doValidationCacheOfEqpt_owner ;

        _model.model_internal::_eqpt_ownerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_ownerAvailable && _internal_eqpt_owner == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_owner is required"));
        }

        model_internal::_doValidationCacheOfEqpt_owner = validationFailures;
        model_internal::_doValidationLastValOfEqpt_owner = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_lock : Array = null;
    model_internal var _doValidationLastValOfEqpt_lock : String;

    model_internal function _doValidationForEqpt_lock(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_lock != null && model_internal::_doValidationLastValOfEqpt_lock == value)
           return model_internal::_doValidationCacheOfEqpt_lock ;

        _model.model_internal::_eqpt_lockIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_lockAvailable && _internal_eqpt_lock == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_lock is required"));
        }

        model_internal::_doValidationCacheOfEqpt_lock = validationFailures;
        model_internal::_doValidationLastValOfEqpt_lock = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_title : Array = null;
    model_internal var _doValidationLastValOfEqpt_title : String;

    model_internal function _doValidationForEqpt_title(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_title != null && model_internal::_doValidationLastValOfEqpt_title == value)
           return model_internal::_doValidationCacheOfEqpt_title ;

        _model.model_internal::_eqpt_titleIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_titleAvailable && _internal_eqpt_title == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_title is required"));
        }

        model_internal::_doValidationCacheOfEqpt_title = validationFailures;
        model_internal::_doValidationLastValOfEqpt_title = value;

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
    
    model_internal var _doValidationCacheOfEqpt_owner_name : Array = null;
    model_internal var _doValidationLastValOfEqpt_owner_name : String;

    model_internal function _doValidationForEqpt_owner_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_owner_name != null && model_internal::_doValidationLastValOfEqpt_owner_name == value)
           return model_internal::_doValidationCacheOfEqpt_owner_name ;

        _model.model_internal::_eqpt_owner_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_owner_nameAvailable && _internal_eqpt_owner_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_owner_name is required"));
        }

        model_internal::_doValidationCacheOfEqpt_owner_name = validationFailures;
        model_internal::_doValidationLastValOfEqpt_owner_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_etp_title : Array = null;
    model_internal var _doValidationLastValOfEqpt_etp_title : String;

    model_internal function _doValidationForEqpt_etp_title(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_etp_title != null && model_internal::_doValidationLastValOfEqpt_etp_title == value)
           return model_internal::_doValidationCacheOfEqpt_etp_title ;

        _model.model_internal::_eqpt_etp_titleIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_etp_titleAvailable && _internal_eqpt_etp_title == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_etp_title is required"));
        }

        model_internal::_doValidationCacheOfEqpt_etp_title = validationFailures;
        model_internal::_doValidationLastValOfEqpt_etp_title = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_name : Array = null;
    model_internal var _doValidationLastValOfEqpt_name : String;

    model_internal function _doValidationForEqpt_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

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
    
    model_internal var _doValidationCacheOfCompartments : Array = null;
    model_internal var _doValidationLastValOfCompartments : ArrayCollection;

    model_internal function _doValidationForCompartments(valueIn:Object):Array
    {
        var value : ArrayCollection = valueIn as ArrayCollection;

        if (model_internal::_doValidationCacheOfCompartments != null && model_internal::_doValidationLastValOfCompartments == value)
           return model_internal::_doValidationCacheOfCompartments ;

        _model.model_internal::_compartmentsIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCompartmentsAvailable && _internal_compartments == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "compartments is required"));
        }

        model_internal::_doValidationCacheOfCompartments = validationFailures;
        model_internal::_doValidationLastValOfCompartments = value;

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
