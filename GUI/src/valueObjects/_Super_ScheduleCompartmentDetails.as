/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - ScheduleCompartmentDetails.as.
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
public class _Super_ScheduleCompartmentDetails extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("ScheduleCompartmentDetails") == null)
            {
                flash.net.registerClassAlias("ScheduleCompartmentDetails", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("ScheduleCompartmentDetails", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _ScheduleCompartmentDetailsEntityMetadata;
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
    private var _internal_preloaded : Object;
    private var _internal_qty_loaded : String;
    private var _internal_schd_deliv_num : Object;
    private var _internal_qty_scheduled : Object;
    private var _internal_schd_ship_to_num : Object;
    private var _internal_prod_code : String;
    private var _internal_schdspec_shlstrip : String;
    private var _internal_qty_amb : String;
    private var _internal_prod_cmpy : String;
    private var _internal_qty_kg : String;
    private var _internal_schd_sold_to_num : Object;
    private var _internal_unit_name : String;
    private var _internal_qty_std : String;
    private var _internal_schdspec_shlssupp : String;
    private var _internal_compartment : String;
    private var _internal_prod_name : String;
    private var _internal_unit_code : String;
    private var _internal_qty_preload : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_ScheduleCompartmentDetails()
    {
        _model = new _ScheduleCompartmentDetailsEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "preloaded", model_internal::setterListenerPreloaded));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "qty_loaded", model_internal::setterListenerQty_loaded));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_deliv_num", model_internal::setterListenerSchd_deliv_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "qty_scheduled", model_internal::setterListenerQty_scheduled));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_ship_to_num", model_internal::setterListenerSchd_ship_to_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_code", model_internal::setterListenerProd_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schdspec_shlstrip", model_internal::setterListenerSchdspec_shlstrip));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "qty_amb", model_internal::setterListenerQty_amb));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_cmpy", model_internal::setterListenerProd_cmpy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "qty_kg", model_internal::setterListenerQty_kg));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_sold_to_num", model_internal::setterListenerSchd_sold_to_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "unit_name", model_internal::setterListenerUnit_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "qty_std", model_internal::setterListenerQty_std));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schdspec_shlssupp", model_internal::setterListenerSchdspec_shlssupp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "compartment", model_internal::setterListenerCompartment));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_name", model_internal::setterListenerProd_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "unit_code", model_internal::setterListenerUnit_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "qty_preload", model_internal::setterListenerQty_preload));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get preloaded() : Object
    {
        return _internal_preloaded;
    }

    [Bindable(event="propertyChange")]
    public function get qty_loaded() : String
    {
        return _internal_qty_loaded;
    }

    [Bindable(event="propertyChange")]
    public function get schd_deliv_num() : Object
    {
        return _internal_schd_deliv_num;
    }

    [Bindable(event="propertyChange")]
    public function get qty_scheduled() : Object
    {
        return _internal_qty_scheduled;
    }

    [Bindable(event="propertyChange")]
    public function get schd_ship_to_num() : Object
    {
        return _internal_schd_ship_to_num;
    }

    [Bindable(event="propertyChange")]
    public function get prod_code() : String
    {
        return _internal_prod_code;
    }

    [Bindable(event="propertyChange")]
    public function get schdspec_shlstrip() : String
    {
        return _internal_schdspec_shlstrip;
    }

    [Bindable(event="propertyChange")]
    public function get qty_amb() : String
    {
        return _internal_qty_amb;
    }

    [Bindable(event="propertyChange")]
    public function get prod_cmpy() : String
    {
        return _internal_prod_cmpy;
    }

    [Bindable(event="propertyChange")]
    public function get qty_kg() : String
    {
        return _internal_qty_kg;
    }

    [Bindable(event="propertyChange")]
    public function get schd_sold_to_num() : Object
    {
        return _internal_schd_sold_to_num;
    }

    [Bindable(event="propertyChange")]
    public function get unit_name() : String
    {
        return _internal_unit_name;
    }

    [Bindable(event="propertyChange")]
    public function get qty_std() : String
    {
        return _internal_qty_std;
    }

    [Bindable(event="propertyChange")]
    public function get schdspec_shlssupp() : String
    {
        return _internal_schdspec_shlssupp;
    }

    [Bindable(event="propertyChange")]
    public function get compartment() : String
    {
        return _internal_compartment;
    }

    [Bindable(event="propertyChange")]
    public function get prod_name() : String
    {
        return _internal_prod_name;
    }

    [Bindable(event="propertyChange")]
    public function get unit_code() : String
    {
        return _internal_unit_code;
    }

    [Bindable(event="propertyChange")]
    public function get qty_preload() : String
    {
        return _internal_qty_preload;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set preloaded(value:Object) : void
    {
        var oldValue:Object = _internal_preloaded;
        if (oldValue !== value)
        {
            _internal_preloaded = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "preloaded", oldValue, _internal_preloaded));
        }
    }

    public function set qty_loaded(value:String) : void
    {
        var oldValue:String = _internal_qty_loaded;
        if (oldValue !== value)
        {
            _internal_qty_loaded = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_loaded", oldValue, _internal_qty_loaded));
        }
    }

    public function set schd_deliv_num(value:Object) : void
    {
        var oldValue:Object = _internal_schd_deliv_num;
        if (oldValue !== value)
        {
            _internal_schd_deliv_num = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_deliv_num", oldValue, _internal_schd_deliv_num));
        }
    }

    public function set qty_scheduled(value:Object) : void
    {
        var oldValue:Object = _internal_qty_scheduled;
        if (oldValue !== value)
        {
            _internal_qty_scheduled = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_scheduled", oldValue, _internal_qty_scheduled));
        }
    }

    public function set schd_ship_to_num(value:Object) : void
    {
        var oldValue:Object = _internal_schd_ship_to_num;
        if (oldValue !== value)
        {
            _internal_schd_ship_to_num = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_ship_to_num", oldValue, _internal_schd_ship_to_num));
        }
    }

    public function set prod_code(value:String) : void
    {
        var oldValue:String = _internal_prod_code;
        if (oldValue !== value)
        {
            _internal_prod_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_code", oldValue, _internal_prod_code));
        }
    }

    public function set schdspec_shlstrip(value:String) : void
    {
        var oldValue:String = _internal_schdspec_shlstrip;
        if (oldValue !== value)
        {
            _internal_schdspec_shlstrip = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schdspec_shlstrip", oldValue, _internal_schdspec_shlstrip));
        }
    }

    public function set qty_amb(value:String) : void
    {
        var oldValue:String = _internal_qty_amb;
        if (oldValue !== value)
        {
            _internal_qty_amb = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_amb", oldValue, _internal_qty_amb));
        }
    }

    public function set prod_cmpy(value:String) : void
    {
        var oldValue:String = _internal_prod_cmpy;
        if (oldValue !== value)
        {
            _internal_prod_cmpy = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_cmpy", oldValue, _internal_prod_cmpy));
        }
    }

    public function set qty_kg(value:String) : void
    {
        var oldValue:String = _internal_qty_kg;
        if (oldValue !== value)
        {
            _internal_qty_kg = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_kg", oldValue, _internal_qty_kg));
        }
    }

    public function set schd_sold_to_num(value:Object) : void
    {
        var oldValue:Object = _internal_schd_sold_to_num;
        if (oldValue !== value)
        {
            _internal_schd_sold_to_num = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_sold_to_num", oldValue, _internal_schd_sold_to_num));
        }
    }

    public function set unit_name(value:String) : void
    {
        var oldValue:String = _internal_unit_name;
        if (oldValue !== value)
        {
            _internal_unit_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_name", oldValue, _internal_unit_name));
        }
    }

    public function set qty_std(value:String) : void
    {
        var oldValue:String = _internal_qty_std;
        if (oldValue !== value)
        {
            _internal_qty_std = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_std", oldValue, _internal_qty_std));
        }
    }

    public function set schdspec_shlssupp(value:String) : void
    {
        var oldValue:String = _internal_schdspec_shlssupp;
        if (oldValue !== value)
        {
            _internal_schdspec_shlssupp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schdspec_shlssupp", oldValue, _internal_schdspec_shlssupp));
        }
    }

    public function set compartment(value:String) : void
    {
        var oldValue:String = _internal_compartment;
        if (oldValue !== value)
        {
            _internal_compartment = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "compartment", oldValue, _internal_compartment));
        }
    }

    public function set prod_name(value:String) : void
    {
        var oldValue:String = _internal_prod_name;
        if (oldValue !== value)
        {
            _internal_prod_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_name", oldValue, _internal_prod_name));
        }
    }

    public function set unit_code(value:String) : void
    {
        var oldValue:String = _internal_unit_code;
        if (oldValue !== value)
        {
            _internal_unit_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_code", oldValue, _internal_unit_code));
        }
    }

    public function set qty_preload(value:String) : void
    {
        var oldValue:String = _internal_qty_preload;
        if (oldValue !== value)
        {
            _internal_qty_preload = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_preload", oldValue, _internal_qty_preload));
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

    model_internal function setterListenerPreloaded(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPreloaded();
    }

    model_internal function setterListenerQty_loaded(value:flash.events.Event):void
    {
        _model.invalidateDependentOnQty_loaded();
    }

    model_internal function setterListenerSchd_deliv_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_deliv_num();
    }

    model_internal function setterListenerQty_scheduled(value:flash.events.Event):void
    {
        _model.invalidateDependentOnQty_scheduled();
    }

    model_internal function setterListenerSchd_ship_to_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_ship_to_num();
    }

    model_internal function setterListenerProd_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProd_code();
    }

    model_internal function setterListenerSchdspec_shlstrip(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchdspec_shlstrip();
    }

    model_internal function setterListenerQty_amb(value:flash.events.Event):void
    {
        _model.invalidateDependentOnQty_amb();
    }

    model_internal function setterListenerProd_cmpy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProd_cmpy();
    }

    model_internal function setterListenerQty_kg(value:flash.events.Event):void
    {
        _model.invalidateDependentOnQty_kg();
    }

    model_internal function setterListenerSchd_sold_to_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_sold_to_num();
    }

    model_internal function setterListenerUnit_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUnit_name();
    }

    model_internal function setterListenerQty_std(value:flash.events.Event):void
    {
        _model.invalidateDependentOnQty_std();
    }

    model_internal function setterListenerSchdspec_shlssupp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchdspec_shlssupp();
    }

    model_internal function setterListenerCompartment(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCompartment();
    }

    model_internal function setterListenerProd_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProd_name();
    }

    model_internal function setterListenerUnit_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUnit_code();
    }

    model_internal function setterListenerQty_preload(value:flash.events.Event):void
    {
        _model.invalidateDependentOnQty_preload();
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
        if (!_model.preloadedIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_preloadedValidationFailureMessages);
        }
        if (!_model.qty_loadedIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_qty_loadedValidationFailureMessages);
        }
        if (!_model.schd_deliv_numIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_deliv_numValidationFailureMessages);
        }
        if (!_model.qty_scheduledIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_qty_scheduledValidationFailureMessages);
        }
        if (!_model.schd_ship_to_numIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_ship_to_numValidationFailureMessages);
        }
        if (!_model.prod_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prod_codeValidationFailureMessages);
        }
        if (!_model.schdspec_shlstripIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schdspec_shlstripValidationFailureMessages);
        }
        if (!_model.qty_ambIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_qty_ambValidationFailureMessages);
        }
        if (!_model.prod_cmpyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prod_cmpyValidationFailureMessages);
        }
        if (!_model.qty_kgIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_qty_kgValidationFailureMessages);
        }
        if (!_model.schd_sold_to_numIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_sold_to_numValidationFailureMessages);
        }
        if (!_model.unit_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_unit_nameValidationFailureMessages);
        }
        if (!_model.qty_stdIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_qty_stdValidationFailureMessages);
        }
        if (!_model.schdspec_shlssuppIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schdspec_shlssuppValidationFailureMessages);
        }
        if (!_model.compartmentIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_compartmentValidationFailureMessages);
        }
        if (!_model.prod_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prod_nameValidationFailureMessages);
        }
        if (!_model.unit_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_unit_codeValidationFailureMessages);
        }
        if (!_model.qty_preloadIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_qty_preloadValidationFailureMessages);
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
    public function get _model() : _ScheduleCompartmentDetailsEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _ScheduleCompartmentDetailsEntityMetadata) : void
    {
        var oldValue : _ScheduleCompartmentDetailsEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfPreloaded : Array = null;
    model_internal var _doValidationLastValOfPreloaded : Object;

    model_internal function _doValidationForPreloaded(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPreloaded != null && model_internal::_doValidationLastValOfPreloaded == value)
           return model_internal::_doValidationCacheOfPreloaded ;

        _model.model_internal::_preloadedIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPreloadedAvailable && _internal_preloaded == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "preloaded is required"));
        }

        model_internal::_doValidationCacheOfPreloaded = validationFailures;
        model_internal::_doValidationLastValOfPreloaded = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfQty_loaded : Array = null;
    model_internal var _doValidationLastValOfQty_loaded : String;

    model_internal function _doValidationForQty_loaded(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfQty_loaded != null && model_internal::_doValidationLastValOfQty_loaded == value)
           return model_internal::_doValidationCacheOfQty_loaded ;

        _model.model_internal::_qty_loadedIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isQty_loadedAvailable && _internal_qty_loaded == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "qty_loaded is required"));
        }

        model_internal::_doValidationCacheOfQty_loaded = validationFailures;
        model_internal::_doValidationLastValOfQty_loaded = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchd_deliv_num : Array = null;
    model_internal var _doValidationLastValOfSchd_deliv_num : Object;

    model_internal function _doValidationForSchd_deliv_num(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfSchd_deliv_num != null && model_internal::_doValidationLastValOfSchd_deliv_num == value)
           return model_internal::_doValidationCacheOfSchd_deliv_num ;

        _model.model_internal::_schd_deliv_numIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_deliv_numAvailable && _internal_schd_deliv_num == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_deliv_num is required"));
        }

        model_internal::_doValidationCacheOfSchd_deliv_num = validationFailures;
        model_internal::_doValidationLastValOfSchd_deliv_num = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfQty_scheduled : Array = null;
    model_internal var _doValidationLastValOfQty_scheduled : Object;

    model_internal function _doValidationForQty_scheduled(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfQty_scheduled != null && model_internal::_doValidationLastValOfQty_scheduled == value)
           return model_internal::_doValidationCacheOfQty_scheduled ;

        _model.model_internal::_qty_scheduledIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isQty_scheduledAvailable && _internal_qty_scheduled == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "qty_scheduled is required"));
        }

        model_internal::_doValidationCacheOfQty_scheduled = validationFailures;
        model_internal::_doValidationLastValOfQty_scheduled = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchd_ship_to_num : Array = null;
    model_internal var _doValidationLastValOfSchd_ship_to_num : Object;

    model_internal function _doValidationForSchd_ship_to_num(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfSchd_ship_to_num != null && model_internal::_doValidationLastValOfSchd_ship_to_num == value)
           return model_internal::_doValidationCacheOfSchd_ship_to_num ;

        _model.model_internal::_schd_ship_to_numIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_ship_to_numAvailable && _internal_schd_ship_to_num == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_ship_to_num is required"));
        }

        model_internal::_doValidationCacheOfSchd_ship_to_num = validationFailures;
        model_internal::_doValidationLastValOfSchd_ship_to_num = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProd_code : Array = null;
    model_internal var _doValidationLastValOfProd_code : String;

    model_internal function _doValidationForProd_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfProd_code != null && model_internal::_doValidationLastValOfProd_code == value)
           return model_internal::_doValidationCacheOfProd_code ;

        _model.model_internal::_prod_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProd_codeAvailable && _internal_prod_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prod_code is required"));
        }

        model_internal::_doValidationCacheOfProd_code = validationFailures;
        model_internal::_doValidationLastValOfProd_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchdspec_shlstrip : Array = null;
    model_internal var _doValidationLastValOfSchdspec_shlstrip : String;

    model_internal function _doValidationForSchdspec_shlstrip(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchdspec_shlstrip != null && model_internal::_doValidationLastValOfSchdspec_shlstrip == value)
           return model_internal::_doValidationCacheOfSchdspec_shlstrip ;

        _model.model_internal::_schdspec_shlstripIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchdspec_shlstripAvailable && _internal_schdspec_shlstrip == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schdspec_shlstrip is required"));
        }

        model_internal::_doValidationCacheOfSchdspec_shlstrip = validationFailures;
        model_internal::_doValidationLastValOfSchdspec_shlstrip = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfQty_amb : Array = null;
    model_internal var _doValidationLastValOfQty_amb : String;

    model_internal function _doValidationForQty_amb(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfQty_amb != null && model_internal::_doValidationLastValOfQty_amb == value)
           return model_internal::_doValidationCacheOfQty_amb ;

        _model.model_internal::_qty_ambIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isQty_ambAvailable && _internal_qty_amb == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "qty_amb is required"));
        }

        model_internal::_doValidationCacheOfQty_amb = validationFailures;
        model_internal::_doValidationLastValOfQty_amb = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProd_cmpy : Array = null;
    model_internal var _doValidationLastValOfProd_cmpy : String;

    model_internal function _doValidationForProd_cmpy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfProd_cmpy != null && model_internal::_doValidationLastValOfProd_cmpy == value)
           return model_internal::_doValidationCacheOfProd_cmpy ;

        _model.model_internal::_prod_cmpyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProd_cmpyAvailable && _internal_prod_cmpy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prod_cmpy is required"));
        }

        model_internal::_doValidationCacheOfProd_cmpy = validationFailures;
        model_internal::_doValidationLastValOfProd_cmpy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfQty_kg : Array = null;
    model_internal var _doValidationLastValOfQty_kg : String;

    model_internal function _doValidationForQty_kg(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfQty_kg != null && model_internal::_doValidationLastValOfQty_kg == value)
           return model_internal::_doValidationCacheOfQty_kg ;

        _model.model_internal::_qty_kgIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isQty_kgAvailable && _internal_qty_kg == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "qty_kg is required"));
        }

        model_internal::_doValidationCacheOfQty_kg = validationFailures;
        model_internal::_doValidationLastValOfQty_kg = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchd_sold_to_num : Array = null;
    model_internal var _doValidationLastValOfSchd_sold_to_num : Object;

    model_internal function _doValidationForSchd_sold_to_num(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfSchd_sold_to_num != null && model_internal::_doValidationLastValOfSchd_sold_to_num == value)
           return model_internal::_doValidationCacheOfSchd_sold_to_num ;

        _model.model_internal::_schd_sold_to_numIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchd_sold_to_numAvailable && _internal_schd_sold_to_num == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schd_sold_to_num is required"));
        }

        model_internal::_doValidationCacheOfSchd_sold_to_num = validationFailures;
        model_internal::_doValidationLastValOfSchd_sold_to_num = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfUnit_name : Array = null;
    model_internal var _doValidationLastValOfUnit_name : String;

    model_internal function _doValidationForUnit_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfUnit_name != null && model_internal::_doValidationLastValOfUnit_name == value)
           return model_internal::_doValidationCacheOfUnit_name ;

        _model.model_internal::_unit_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isUnit_nameAvailable && _internal_unit_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "unit_name is required"));
        }

        model_internal::_doValidationCacheOfUnit_name = validationFailures;
        model_internal::_doValidationLastValOfUnit_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfQty_std : Array = null;
    model_internal var _doValidationLastValOfQty_std : String;

    model_internal function _doValidationForQty_std(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfQty_std != null && model_internal::_doValidationLastValOfQty_std == value)
           return model_internal::_doValidationCacheOfQty_std ;

        _model.model_internal::_qty_stdIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isQty_stdAvailable && _internal_qty_std == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "qty_std is required"));
        }

        model_internal::_doValidationCacheOfQty_std = validationFailures;
        model_internal::_doValidationLastValOfQty_std = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchdspec_shlssupp : Array = null;
    model_internal var _doValidationLastValOfSchdspec_shlssupp : String;

    model_internal function _doValidationForSchdspec_shlssupp(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchdspec_shlssupp != null && model_internal::_doValidationLastValOfSchdspec_shlssupp == value)
           return model_internal::_doValidationCacheOfSchdspec_shlssupp ;

        _model.model_internal::_schdspec_shlssuppIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchdspec_shlssuppAvailable && _internal_schdspec_shlssupp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schdspec_shlssupp is required"));
        }

        model_internal::_doValidationCacheOfSchdspec_shlssupp = validationFailures;
        model_internal::_doValidationLastValOfSchdspec_shlssupp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCompartment : Array = null;
    model_internal var _doValidationLastValOfCompartment : String;

    model_internal function _doValidationForCompartment(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCompartment != null && model_internal::_doValidationLastValOfCompartment == value)
           return model_internal::_doValidationCacheOfCompartment ;

        _model.model_internal::_compartmentIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCompartmentAvailable && _internal_compartment == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "compartment is required"));
        }

        model_internal::_doValidationCacheOfCompartment = validationFailures;
        model_internal::_doValidationLastValOfCompartment = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProd_name : Array = null;
    model_internal var _doValidationLastValOfProd_name : String;

    model_internal function _doValidationForProd_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfProd_name != null && model_internal::_doValidationLastValOfProd_name == value)
           return model_internal::_doValidationCacheOfProd_name ;

        _model.model_internal::_prod_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProd_nameAvailable && _internal_prod_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prod_name is required"));
        }

        model_internal::_doValidationCacheOfProd_name = validationFailures;
        model_internal::_doValidationLastValOfProd_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfUnit_code : Array = null;
    model_internal var _doValidationLastValOfUnit_code : String;

    model_internal function _doValidationForUnit_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfUnit_code != null && model_internal::_doValidationLastValOfUnit_code == value)
           return model_internal::_doValidationCacheOfUnit_code ;

        _model.model_internal::_unit_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isUnit_codeAvailable && _internal_unit_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "unit_code is required"));
        }

        model_internal::_doValidationCacheOfUnit_code = validationFailures;
        model_internal::_doValidationLastValOfUnit_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfQty_preload : Array = null;
    model_internal var _doValidationLastValOfQty_preload : String;

    model_internal function _doValidationForQty_preload(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfQty_preload != null && model_internal::_doValidationLastValOfQty_preload == value)
           return model_internal::_doValidationCacheOfQty_preload ;

        _model.model_internal::_qty_preloadIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isQty_preloadAvailable && _internal_qty_preload == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "qty_preload is required"));
        }

        model_internal::_doValidationCacheOfQty_preload = validationFailures;
        model_internal::_doValidationLastValOfQty_preload = value;

        return validationFailures;
    }
    

}

}
