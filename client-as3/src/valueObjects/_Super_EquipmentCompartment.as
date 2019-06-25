/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - EquipmentCompartment.as.
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
public class _Super_EquipmentCompartment extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("EquipmentCompartment") == null)
            {
                flash.net.registerClassAlias("EquipmentCompartment", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("EquipmentCompartment", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _EquipmentCompartmentEntityMetadata;
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
    private var _internal_adj_safefill : String;
    private var _internal_adj_capacity : String;
    private var _internal_adj_amnt : String;
    private var _internal_eqpt_code : String;
    private var _internal_cmpt_capacit : String;
    private var _internal_cmpt_no : String;
    private var _internal_adj_cmpt_lock : String;
    private var _internal_unit_title : String;
    private var _internal_etyp_title : String;
    private var _internal_unit_id : String;
    private var _internal_etyp_id : String;
    private var _internal_eqpt_id : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_EquipmentCompartment()
    {
        _model = new _EquipmentCompartmentEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "adj_safefill", model_internal::setterListenerAdj_safefill));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "adj_capacity", model_internal::setterListenerAdj_capacity));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "adj_amnt", model_internal::setterListenerAdj_amnt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_code", model_internal::setterListenerEqpt_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpt_capacit", model_internal::setterListenerCmpt_capacit));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpt_no", model_internal::setterListenerCmpt_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "adj_cmpt_lock", model_internal::setterListenerAdj_cmpt_lock));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "unit_title", model_internal::setterListenerUnit_title));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_title", model_internal::setterListenerEtyp_title));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "unit_id", model_internal::setterListenerUnit_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_id", model_internal::setterListenerEtyp_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_id", model_internal::setterListenerEqpt_id));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get adj_safefill() : String
    {
        return _internal_adj_safefill;
    }

    [Bindable(event="propertyChange")]
    public function get adj_capacity() : String
    {
        return _internal_adj_capacity;
    }

    [Bindable(event="propertyChange")]
    public function get adj_amnt() : String
    {
        return _internal_adj_amnt;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_code() : String
    {
        return _internal_eqpt_code;
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_capacit() : String
    {
        return _internal_cmpt_capacit;
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_no() : String
    {
        return _internal_cmpt_no;
    }

    [Bindable(event="propertyChange")]
    public function get adj_cmpt_lock() : String
    {
        return _internal_adj_cmpt_lock;
    }

    [Bindable(event="propertyChange")]
    public function get unit_title() : String
    {
        return _internal_unit_title;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_title() : String
    {
        return _internal_etyp_title;
    }

    [Bindable(event="propertyChange")]
    public function get unit_id() : String
    {
        return _internal_unit_id;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_id() : String
    {
        return _internal_etyp_id;
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

    public function set adj_safefill(value:String) : void
    {
        var oldValue:String = _internal_adj_safefill;
        if (oldValue !== value)
        {
            _internal_adj_safefill = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "adj_safefill", oldValue, _internal_adj_safefill));
        }
    }

    public function set adj_capacity(value:String) : void
    {
        var oldValue:String = _internal_adj_capacity;
        if (oldValue !== value)
        {
            _internal_adj_capacity = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "adj_capacity", oldValue, _internal_adj_capacity));
        }
    }

    public function set adj_amnt(value:String) : void
    {
        var oldValue:String = _internal_adj_amnt;
        if (oldValue !== value)
        {
            _internal_adj_amnt = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "adj_amnt", oldValue, _internal_adj_amnt));
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

    public function set cmpt_capacit(value:String) : void
    {
        var oldValue:String = _internal_cmpt_capacit;
        if (oldValue !== value)
        {
            _internal_cmpt_capacit = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_capacit", oldValue, _internal_cmpt_capacit));
        }
    }

    public function set cmpt_no(value:String) : void
    {
        var oldValue:String = _internal_cmpt_no;
        if (oldValue !== value)
        {
            _internal_cmpt_no = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_no", oldValue, _internal_cmpt_no));
        }
    }

    public function set adj_cmpt_lock(value:String) : void
    {
        var oldValue:String = _internal_adj_cmpt_lock;
        if (oldValue !== value)
        {
            _internal_adj_cmpt_lock = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "adj_cmpt_lock", oldValue, _internal_adj_cmpt_lock));
        }
    }

    public function set unit_title(value:String) : void
    {
        var oldValue:String = _internal_unit_title;
        if (oldValue !== value)
        {
            _internal_unit_title = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_title", oldValue, _internal_unit_title));
        }
    }

    public function set etyp_title(value:String) : void
    {
        var oldValue:String = _internal_etyp_title;
        if (oldValue !== value)
        {
            _internal_etyp_title = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_title", oldValue, _internal_etyp_title));
        }
    }

    public function set unit_id(value:String) : void
    {
        var oldValue:String = _internal_unit_id;
        if (oldValue !== value)
        {
            _internal_unit_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_id", oldValue, _internal_unit_id));
        }
    }

    public function set etyp_id(value:String) : void
    {
        var oldValue:String = _internal_etyp_id;
        if (oldValue !== value)
        {
            _internal_etyp_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_id", oldValue, _internal_etyp_id));
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

    model_internal function setterListenerAdj_safefill(value:flash.events.Event):void
    {
        _model.invalidateDependentOnAdj_safefill();
    }

    model_internal function setterListenerAdj_capacity(value:flash.events.Event):void
    {
        _model.invalidateDependentOnAdj_capacity();
    }

    model_internal function setterListenerAdj_amnt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnAdj_amnt();
    }

    model_internal function setterListenerEqpt_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_code();
    }

    model_internal function setterListenerCmpt_capacit(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpt_capacit();
    }

    model_internal function setterListenerCmpt_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpt_no();
    }

    model_internal function setterListenerAdj_cmpt_lock(value:flash.events.Event):void
    {
        _model.invalidateDependentOnAdj_cmpt_lock();
    }

    model_internal function setterListenerUnit_title(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUnit_title();
    }

    model_internal function setterListenerEtyp_title(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_title();
    }

    model_internal function setterListenerUnit_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUnit_id();
    }

    model_internal function setterListenerEtyp_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_id();
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
        if (!_model.adj_safefillIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_adj_safefillValidationFailureMessages);
        }
        if (!_model.adj_capacityIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_adj_capacityValidationFailureMessages);
        }
        if (!_model.adj_amntIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_adj_amntValidationFailureMessages);
        }
        if (!_model.eqpt_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_codeValidationFailureMessages);
        }
        if (!_model.cmpt_capacitIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpt_capacitValidationFailureMessages);
        }
        if (!_model.cmpt_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpt_noValidationFailureMessages);
        }
        if (!_model.adj_cmpt_lockIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_adj_cmpt_lockValidationFailureMessages);
        }
        if (!_model.unit_titleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_unit_titleValidationFailureMessages);
        }
        if (!_model.etyp_titleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_titleValidationFailureMessages);
        }
        if (!_model.unit_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_unit_idValidationFailureMessages);
        }
        if (!_model.etyp_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_idValidationFailureMessages);
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
    public function get _model() : _EquipmentCompartmentEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _EquipmentCompartmentEntityMetadata) : void
    {
        var oldValue : _EquipmentCompartmentEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfAdj_safefill : Array = null;
    model_internal var _doValidationLastValOfAdj_safefill : String;

    model_internal function _doValidationForAdj_safefill(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfAdj_safefill != null && model_internal::_doValidationLastValOfAdj_safefill == value)
           return model_internal::_doValidationCacheOfAdj_safefill ;

        _model.model_internal::_adj_safefillIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isAdj_safefillAvailable && _internal_adj_safefill == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "adj_safefill is required"));
        }

        model_internal::_doValidationCacheOfAdj_safefill = validationFailures;
        model_internal::_doValidationLastValOfAdj_safefill = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfAdj_capacity : Array = null;
    model_internal var _doValidationLastValOfAdj_capacity : String;

    model_internal function _doValidationForAdj_capacity(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfAdj_capacity != null && model_internal::_doValidationLastValOfAdj_capacity == value)
           return model_internal::_doValidationCacheOfAdj_capacity ;

        _model.model_internal::_adj_capacityIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isAdj_capacityAvailable && _internal_adj_capacity == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "adj_capacity is required"));
        }

        model_internal::_doValidationCacheOfAdj_capacity = validationFailures;
        model_internal::_doValidationLastValOfAdj_capacity = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfAdj_amnt : Array = null;
    model_internal var _doValidationLastValOfAdj_amnt : String;

    model_internal function _doValidationForAdj_amnt(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfAdj_amnt != null && model_internal::_doValidationLastValOfAdj_amnt == value)
           return model_internal::_doValidationCacheOfAdj_amnt ;

        _model.model_internal::_adj_amntIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isAdj_amntAvailable && _internal_adj_amnt == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "adj_amnt is required"));
        }

        model_internal::_doValidationCacheOfAdj_amnt = validationFailures;
        model_internal::_doValidationLastValOfAdj_amnt = value;

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
    
    model_internal var _doValidationCacheOfCmpt_capacit : Array = null;
    model_internal var _doValidationLastValOfCmpt_capacit : String;

    model_internal function _doValidationForCmpt_capacit(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpt_capacit != null && model_internal::_doValidationLastValOfCmpt_capacit == value)
           return model_internal::_doValidationCacheOfCmpt_capacit ;

        _model.model_internal::_cmpt_capacitIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpt_capacitAvailable && _internal_cmpt_capacit == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpt_capacit is required"));
        }

        model_internal::_doValidationCacheOfCmpt_capacit = validationFailures;
        model_internal::_doValidationLastValOfCmpt_capacit = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpt_no : Array = null;
    model_internal var _doValidationLastValOfCmpt_no : String;

    model_internal function _doValidationForCmpt_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpt_no != null && model_internal::_doValidationLastValOfCmpt_no == value)
           return model_internal::_doValidationCacheOfCmpt_no ;

        _model.model_internal::_cmpt_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpt_noAvailable && _internal_cmpt_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpt_no is required"));
        }

        model_internal::_doValidationCacheOfCmpt_no = validationFailures;
        model_internal::_doValidationLastValOfCmpt_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfAdj_cmpt_lock : Array = null;
    model_internal var _doValidationLastValOfAdj_cmpt_lock : String;

    model_internal function _doValidationForAdj_cmpt_lock(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfAdj_cmpt_lock != null && model_internal::_doValidationLastValOfAdj_cmpt_lock == value)
           return model_internal::_doValidationCacheOfAdj_cmpt_lock ;

        _model.model_internal::_adj_cmpt_lockIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isAdj_cmpt_lockAvailable && _internal_adj_cmpt_lock == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "adj_cmpt_lock is required"));
        }

        model_internal::_doValidationCacheOfAdj_cmpt_lock = validationFailures;
        model_internal::_doValidationLastValOfAdj_cmpt_lock = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfUnit_title : Array = null;
    model_internal var _doValidationLastValOfUnit_title : String;

    model_internal function _doValidationForUnit_title(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfUnit_title != null && model_internal::_doValidationLastValOfUnit_title == value)
           return model_internal::_doValidationCacheOfUnit_title ;

        _model.model_internal::_unit_titleIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isUnit_titleAvailable && _internal_unit_title == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "unit_title is required"));
        }

        model_internal::_doValidationCacheOfUnit_title = validationFailures;
        model_internal::_doValidationLastValOfUnit_title = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_title : Array = null;
    model_internal var _doValidationLastValOfEtyp_title : String;

    model_internal function _doValidationForEtyp_title(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_title != null && model_internal::_doValidationLastValOfEtyp_title == value)
           return model_internal::_doValidationCacheOfEtyp_title ;

        _model.model_internal::_etyp_titleIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_titleAvailable && _internal_etyp_title == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_title is required"));
        }

        model_internal::_doValidationCacheOfEtyp_title = validationFailures;
        model_internal::_doValidationLastValOfEtyp_title = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfUnit_id : Array = null;
    model_internal var _doValidationLastValOfUnit_id : String;

    model_internal function _doValidationForUnit_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfUnit_id != null && model_internal::_doValidationLastValOfUnit_id == value)
           return model_internal::_doValidationCacheOfUnit_id ;

        _model.model_internal::_unit_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isUnit_idAvailable && _internal_unit_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "unit_id is required"));
        }

        model_internal::_doValidationCacheOfUnit_id = validationFailures;
        model_internal::_doValidationLastValOfUnit_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_id : Array = null;
    model_internal var _doValidationLastValOfEtyp_id : String;

    model_internal function _doValidationForEtyp_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_id != null && model_internal::_doValidationLastValOfEtyp_id == value)
           return model_internal::_doValidationCacheOfEtyp_id ;

        _model.model_internal::_etyp_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_idAvailable && _internal_etyp_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_id is required"));
        }

        model_internal::_doValidationCacheOfEtyp_id = validationFailures;
        model_internal::_doValidationLastValOfEtyp_id = value;

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
