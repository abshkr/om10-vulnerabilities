/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - Transactions.as.
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

[Managed]
[ExcludeClass]
public class _Super_Transactions extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("Transactions") == null)
            {
                flash.net.registerClassAlias("Transactions", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("Transactions", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _TransactionsEntityMetadata;
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
    private var _internal_trsa_trip : String;
    private var _internal_trsa_ed_dmy : String;
    private var _internal_trsa_drawer : String;
    private var _internal_trsa_carrier : String;
    private var _internal_trsa_st_dmy : String;
    private var _internal_rn : String;
    private var _internal_trsa_per_name : String;
    private var _internal_trsa_crt_dmy : String;
    private var _internal_trsa_reverse_flag : String;
    private var _internal_trsa_reverse : String;
    private var _internal_trsa_bay_cd : String;
    private var _internal_trsa_supplier : String;
    private var _internal_trsa_psn : Object;
    private var _internal_trsa_terminal : String;
    private var _internal_trsa_id : String;
    private var _internal_trsa_tanker : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_Transactions()
    {
        _model = new _TransactionsEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsa_trip", model_internal::setterListenerTrsa_trip));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsa_ed_dmy", model_internal::setterListenerTrsa_ed_dmy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsa_drawer", model_internal::setterListenerTrsa_drawer));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsa_carrier", model_internal::setterListenerTrsa_carrier));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsa_st_dmy", model_internal::setterListenerTrsa_st_dmy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsa_per_name", model_internal::setterListenerTrsa_per_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsa_crt_dmy", model_internal::setterListenerTrsa_crt_dmy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsa_reverse_flag", model_internal::setterListenerTrsa_reverse_flag));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsa_reverse", model_internal::setterListenerTrsa_reverse));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsa_bay_cd", model_internal::setterListenerTrsa_bay_cd));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsa_supplier", model_internal::setterListenerTrsa_supplier));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsa_psn", model_internal::setterListenerTrsa_psn));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsa_terminal", model_internal::setterListenerTrsa_terminal));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsa_id", model_internal::setterListenerTrsa_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsa_tanker", model_internal::setterListenerTrsa_tanker));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get trsa_trip() : String
    {
        return _internal_trsa_trip;
    }

    [Bindable(event="propertyChange")]
    public function get trsa_ed_dmy() : String
    {
        return _internal_trsa_ed_dmy;
    }

    [Bindable(event="propertyChange")]
    public function get trsa_drawer() : String
    {
        return _internal_trsa_drawer;
    }

    [Bindable(event="propertyChange")]
    public function get trsa_carrier() : String
    {
        return _internal_trsa_carrier;
    }

    [Bindable(event="propertyChange")]
    public function get trsa_st_dmy() : String
    {
        return _internal_trsa_st_dmy;
    }

    [Bindable(event="propertyChange")]
    public function get rn() : String
    {
        return _internal_rn;
    }

    [Bindable(event="propertyChange")]
    public function get trsa_per_name() : String
    {
        return _internal_trsa_per_name;
    }

    [Bindable(event="propertyChange")]
    public function get trsa_crt_dmy() : String
    {
        return _internal_trsa_crt_dmy;
    }

    [Bindable(event="propertyChange")]
    public function get trsa_reverse_flag() : String
    {
        return _internal_trsa_reverse_flag;
    }

    [Bindable(event="propertyChange")]
    public function get trsa_reverse() : String
    {
        return _internal_trsa_reverse;
    }

    [Bindable(event="propertyChange")]
    public function get trsa_bay_cd() : String
    {
        return _internal_trsa_bay_cd;
    }

    [Bindable(event="propertyChange")]
    public function get trsa_supplier() : String
    {
        return _internal_trsa_supplier;
    }

    [Bindable(event="propertyChange")]
    public function get trsa_psn() : Object
    {
        return _internal_trsa_psn;
    }

    [Bindable(event="propertyChange")]
    public function get trsa_terminal() : String
    {
        return _internal_trsa_terminal;
    }

    [Bindable(event="propertyChange")]
    public function get trsa_id() : String
    {
        return _internal_trsa_id;
    }

    [Bindable(event="propertyChange")]
    public function get trsa_tanker() : String
    {
        return _internal_trsa_tanker;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set trsa_trip(value:String) : void
    {
        var oldValue:String = _internal_trsa_trip;
        if (oldValue !== value)
        {
            _internal_trsa_trip = value;
        }
    }

    public function set trsa_ed_dmy(value:String) : void
    {
        var oldValue:String = _internal_trsa_ed_dmy;
        if (oldValue !== value)
        {
            _internal_trsa_ed_dmy = value;
        }
    }

    public function set trsa_drawer(value:String) : void
    {
        var oldValue:String = _internal_trsa_drawer;
        if (oldValue !== value)
        {
            _internal_trsa_drawer = value;
        }
    }

    public function set trsa_carrier(value:String) : void
    {
        var oldValue:String = _internal_trsa_carrier;
        if (oldValue !== value)
        {
            _internal_trsa_carrier = value;
        }
    }

    public function set trsa_st_dmy(value:String) : void
    {
        var oldValue:String = _internal_trsa_st_dmy;
        if (oldValue !== value)
        {
            _internal_trsa_st_dmy = value;
        }
    }

    public function set rn(value:String) : void
    {
        var oldValue:String = _internal_rn;
        if (oldValue !== value)
        {
            _internal_rn = value;
        }
    }

    public function set trsa_per_name(value:String) : void
    {
        var oldValue:String = _internal_trsa_per_name;
        if (oldValue !== value)
        {
            _internal_trsa_per_name = value;
        }
    }

    public function set trsa_crt_dmy(value:String) : void
    {
        var oldValue:String = _internal_trsa_crt_dmy;
        if (oldValue !== value)
        {
            _internal_trsa_crt_dmy = value;
        }
    }

    public function set trsa_reverse_flag(value:String) : void
    {
        var oldValue:String = _internal_trsa_reverse_flag;
        if (oldValue !== value)
        {
            _internal_trsa_reverse_flag = value;
        }
    }

    public function set trsa_reverse(value:String) : void
    {
        var oldValue:String = _internal_trsa_reverse;
        if (oldValue !== value)
        {
            _internal_trsa_reverse = value;
        }
    }

    public function set trsa_bay_cd(value:String) : void
    {
        var oldValue:String = _internal_trsa_bay_cd;
        if (oldValue !== value)
        {
            _internal_trsa_bay_cd = value;
        }
    }

    public function set trsa_supplier(value:String) : void
    {
        var oldValue:String = _internal_trsa_supplier;
        if (oldValue !== value)
        {
            _internal_trsa_supplier = value;
        }
    }

    public function set trsa_psn(value:Object) : void
    {
        var oldValue:Object = _internal_trsa_psn;
        if (oldValue !== value)
        {
            _internal_trsa_psn = value;
        }
    }

    public function set trsa_terminal(value:String) : void
    {
        var oldValue:String = _internal_trsa_terminal;
        if (oldValue !== value)
        {
            _internal_trsa_terminal = value;
        }
    }

    public function set trsa_id(value:String) : void
    {
        var oldValue:String = _internal_trsa_id;
        if (oldValue !== value)
        {
            _internal_trsa_id = value;
        }
    }

    public function set trsa_tanker(value:String) : void
    {
        var oldValue:String = _internal_trsa_tanker;
        if (oldValue !== value)
        {
            _internal_trsa_tanker = value;
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

    model_internal function setterListenerTrsa_trip(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsa_trip();
    }

    model_internal function setterListenerTrsa_ed_dmy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsa_ed_dmy();
    }

    model_internal function setterListenerTrsa_drawer(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsa_drawer();
    }

    model_internal function setterListenerTrsa_carrier(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsa_carrier();
    }

    model_internal function setterListenerTrsa_st_dmy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsa_st_dmy();
    }

    model_internal function setterListenerTrsa_per_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsa_per_name();
    }

    model_internal function setterListenerTrsa_crt_dmy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsa_crt_dmy();
    }

    model_internal function setterListenerTrsa_reverse_flag(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsa_reverse_flag();
    }

    model_internal function setterListenerTrsa_reverse(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsa_reverse();
    }

    model_internal function setterListenerTrsa_bay_cd(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsa_bay_cd();
    }

    model_internal function setterListenerTrsa_supplier(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsa_supplier();
    }

    model_internal function setterListenerTrsa_psn(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsa_psn();
    }

    model_internal function setterListenerTrsa_terminal(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsa_terminal();
    }

    model_internal function setterListenerTrsa_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsa_id();
    }

    model_internal function setterListenerTrsa_tanker(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsa_tanker();
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
        if (!_model.trsa_tripIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsa_tripValidationFailureMessages);
        }
        if (!_model.trsa_ed_dmyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsa_ed_dmyValidationFailureMessages);
        }
        if (!_model.trsa_drawerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsa_drawerValidationFailureMessages);
        }
        if (!_model.trsa_carrierIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsa_carrierValidationFailureMessages);
        }
        if (!_model.trsa_st_dmyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsa_st_dmyValidationFailureMessages);
        }
        if (!_model.trsa_per_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsa_per_nameValidationFailureMessages);
        }
        if (!_model.trsa_crt_dmyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsa_crt_dmyValidationFailureMessages);
        }
        if (!_model.trsa_reverse_flagIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsa_reverse_flagValidationFailureMessages);
        }
        if (!_model.trsa_reverseIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsa_reverseValidationFailureMessages);
        }
        if (!_model.trsa_bay_cdIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsa_bay_cdValidationFailureMessages);
        }
        if (!_model.trsa_supplierIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsa_supplierValidationFailureMessages);
        }
        if (!_model.trsa_psnIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsa_psnValidationFailureMessages);
        }
        if (!_model.trsa_terminalIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsa_terminalValidationFailureMessages);
        }
        if (!_model.trsa_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsa_idValidationFailureMessages);
        }
        if (!_model.trsa_tankerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsa_tankerValidationFailureMessages);
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
    public function get _model() : _TransactionsEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _TransactionsEntityMetadata) : void
    {
        var oldValue : _TransactionsEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfTrsa_trip : Array = null;
    model_internal var _doValidationLastValOfTrsa_trip : String;

    model_internal function _doValidationForTrsa_trip(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsa_trip != null && model_internal::_doValidationLastValOfTrsa_trip == value)
           return model_internal::_doValidationCacheOfTrsa_trip ;

        _model.model_internal::_trsa_tripIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsa_tripAvailable && _internal_trsa_trip == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsa_trip is required"));
        }

        model_internal::_doValidationCacheOfTrsa_trip = validationFailures;
        model_internal::_doValidationLastValOfTrsa_trip = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsa_ed_dmy : Array = null;
    model_internal var _doValidationLastValOfTrsa_ed_dmy : String;

    model_internal function _doValidationForTrsa_ed_dmy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsa_ed_dmy != null && model_internal::_doValidationLastValOfTrsa_ed_dmy == value)
           return model_internal::_doValidationCacheOfTrsa_ed_dmy ;

        _model.model_internal::_trsa_ed_dmyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsa_ed_dmyAvailable && _internal_trsa_ed_dmy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsa_ed_dmy is required"));
        }

        model_internal::_doValidationCacheOfTrsa_ed_dmy = validationFailures;
        model_internal::_doValidationLastValOfTrsa_ed_dmy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsa_drawer : Array = null;
    model_internal var _doValidationLastValOfTrsa_drawer : String;

    model_internal function _doValidationForTrsa_drawer(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsa_drawer != null && model_internal::_doValidationLastValOfTrsa_drawer == value)
           return model_internal::_doValidationCacheOfTrsa_drawer ;

        _model.model_internal::_trsa_drawerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsa_drawerAvailable && _internal_trsa_drawer == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsa_drawer is required"));
        }

        model_internal::_doValidationCacheOfTrsa_drawer = validationFailures;
        model_internal::_doValidationLastValOfTrsa_drawer = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsa_carrier : Array = null;
    model_internal var _doValidationLastValOfTrsa_carrier : String;

    model_internal function _doValidationForTrsa_carrier(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsa_carrier != null && model_internal::_doValidationLastValOfTrsa_carrier == value)
           return model_internal::_doValidationCacheOfTrsa_carrier ;

        _model.model_internal::_trsa_carrierIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsa_carrierAvailable && _internal_trsa_carrier == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsa_carrier is required"));
        }

        model_internal::_doValidationCacheOfTrsa_carrier = validationFailures;
        model_internal::_doValidationLastValOfTrsa_carrier = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsa_st_dmy : Array = null;
    model_internal var _doValidationLastValOfTrsa_st_dmy : String;

    model_internal function _doValidationForTrsa_st_dmy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsa_st_dmy != null && model_internal::_doValidationLastValOfTrsa_st_dmy == value)
           return model_internal::_doValidationCacheOfTrsa_st_dmy ;

        _model.model_internal::_trsa_st_dmyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsa_st_dmyAvailable && _internal_trsa_st_dmy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsa_st_dmy is required"));
        }

        model_internal::_doValidationCacheOfTrsa_st_dmy = validationFailures;
        model_internal::_doValidationLastValOfTrsa_st_dmy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsa_per_name : Array = null;
    model_internal var _doValidationLastValOfTrsa_per_name : String;

    model_internal function _doValidationForTrsa_per_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsa_per_name != null && model_internal::_doValidationLastValOfTrsa_per_name == value)
           return model_internal::_doValidationCacheOfTrsa_per_name ;

        _model.model_internal::_trsa_per_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsa_per_nameAvailable && _internal_trsa_per_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsa_per_name is required"));
        }

        model_internal::_doValidationCacheOfTrsa_per_name = validationFailures;
        model_internal::_doValidationLastValOfTrsa_per_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsa_crt_dmy : Array = null;
    model_internal var _doValidationLastValOfTrsa_crt_dmy : String;

    model_internal function _doValidationForTrsa_crt_dmy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsa_crt_dmy != null && model_internal::_doValidationLastValOfTrsa_crt_dmy == value)
           return model_internal::_doValidationCacheOfTrsa_crt_dmy ;

        _model.model_internal::_trsa_crt_dmyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsa_crt_dmyAvailable && _internal_trsa_crt_dmy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsa_crt_dmy is required"));
        }

        model_internal::_doValidationCacheOfTrsa_crt_dmy = validationFailures;
        model_internal::_doValidationLastValOfTrsa_crt_dmy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsa_reverse_flag : Array = null;
    model_internal var _doValidationLastValOfTrsa_reverse_flag : String;

    model_internal function _doValidationForTrsa_reverse_flag(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsa_reverse_flag != null && model_internal::_doValidationLastValOfTrsa_reverse_flag == value)
           return model_internal::_doValidationCacheOfTrsa_reverse_flag ;

        _model.model_internal::_trsa_reverse_flagIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsa_reverse_flagAvailable && _internal_trsa_reverse_flag == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsa_reverse_flag is required"));
        }

        model_internal::_doValidationCacheOfTrsa_reverse_flag = validationFailures;
        model_internal::_doValidationLastValOfTrsa_reverse_flag = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsa_reverse : Array = null;
    model_internal var _doValidationLastValOfTrsa_reverse : String;

    model_internal function _doValidationForTrsa_reverse(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsa_reverse != null && model_internal::_doValidationLastValOfTrsa_reverse == value)
           return model_internal::_doValidationCacheOfTrsa_reverse ;

        _model.model_internal::_trsa_reverseIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsa_reverseAvailable && _internal_trsa_reverse == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsa_reverse is required"));
        }

        model_internal::_doValidationCacheOfTrsa_reverse = validationFailures;
        model_internal::_doValidationLastValOfTrsa_reverse = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsa_bay_cd : Array = null;
    model_internal var _doValidationLastValOfTrsa_bay_cd : String;

    model_internal function _doValidationForTrsa_bay_cd(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsa_bay_cd != null && model_internal::_doValidationLastValOfTrsa_bay_cd == value)
           return model_internal::_doValidationCacheOfTrsa_bay_cd ;

        _model.model_internal::_trsa_bay_cdIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsa_bay_cdAvailable && _internal_trsa_bay_cd == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsa_bay_cd is required"));
        }

        model_internal::_doValidationCacheOfTrsa_bay_cd = validationFailures;
        model_internal::_doValidationLastValOfTrsa_bay_cd = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsa_supplier : Array = null;
    model_internal var _doValidationLastValOfTrsa_supplier : String;

    model_internal function _doValidationForTrsa_supplier(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsa_supplier != null && model_internal::_doValidationLastValOfTrsa_supplier == value)
           return model_internal::_doValidationCacheOfTrsa_supplier ;

        _model.model_internal::_trsa_supplierIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsa_supplierAvailable && _internal_trsa_supplier == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsa_supplier is required"));
        }

        model_internal::_doValidationCacheOfTrsa_supplier = validationFailures;
        model_internal::_doValidationLastValOfTrsa_supplier = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsa_psn : Array = null;
    model_internal var _doValidationLastValOfTrsa_psn : Object;

    model_internal function _doValidationForTrsa_psn(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfTrsa_psn != null && model_internal::_doValidationLastValOfTrsa_psn == value)
           return model_internal::_doValidationCacheOfTrsa_psn ;

        _model.model_internal::_trsa_psnIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsa_psnAvailable && _internal_trsa_psn == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsa_psn is required"));
        }

        model_internal::_doValidationCacheOfTrsa_psn = validationFailures;
        model_internal::_doValidationLastValOfTrsa_psn = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsa_terminal : Array = null;
    model_internal var _doValidationLastValOfTrsa_terminal : String;

    model_internal function _doValidationForTrsa_terminal(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsa_terminal != null && model_internal::_doValidationLastValOfTrsa_terminal == value)
           return model_internal::_doValidationCacheOfTrsa_terminal ;

        _model.model_internal::_trsa_terminalIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsa_terminalAvailable && _internal_trsa_terminal == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsa_terminal is required"));
        }

        model_internal::_doValidationCacheOfTrsa_terminal = validationFailures;
        model_internal::_doValidationLastValOfTrsa_terminal = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsa_id : Array = null;
    model_internal var _doValidationLastValOfTrsa_id : String;

    model_internal function _doValidationForTrsa_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsa_id != null && model_internal::_doValidationLastValOfTrsa_id == value)
           return model_internal::_doValidationCacheOfTrsa_id ;

        _model.model_internal::_trsa_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsa_idAvailable && _internal_trsa_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsa_id is required"));
        }

        model_internal::_doValidationCacheOfTrsa_id = validationFailures;
        model_internal::_doValidationLastValOfTrsa_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsa_tanker : Array = null;
    model_internal var _doValidationLastValOfTrsa_tanker : String;

    model_internal function _doValidationForTrsa_tanker(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsa_tanker != null && model_internal::_doValidationLastValOfTrsa_tanker == value)
           return model_internal::_doValidationCacheOfTrsa_tanker ;

        _model.model_internal::_trsa_tankerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsa_tankerAvailable && _internal_trsa_tanker == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsa_tanker is required"));
        }

        model_internal::_doValidationCacheOfTrsa_tanker = validationFailures;
        model_internal::_doValidationLastValOfTrsa_tanker = value;

        return validationFailures;
    }
    

}

}
