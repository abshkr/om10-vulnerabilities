/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - Compartment.as.
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
public class _Super_Compartment extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("Compartment") == null)
            {
                flash.net.registerClassAlias("Compartment", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("Compartment", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _CompartmentEntityMetadata;
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
    private var _internal_sched_deliv_num : Object;
    private var _internal_sched_sold_to_num : Object;
    private var _internal_sched_ship_to_num : Object;
    private var _internal_cmpt_no : String;
    private var _internal_cmpt_capacit : String;
    private var _internal_product_name : Object;
    private var _internal_prev_product_code : Object;
    private var _internal_schd_deliv_num : Object;
    private var _internal_etyp_title : Object;
    private var _internal_order_id : Object;
    private var _internal_schd_ship_to_num : Object;
    private var _internal_cmpt_etyp : String;
    private var _internal_cmpt_units : String;
    private var _internal_unit : String;
    private var _internal_cmpt_n_seals : String;
    private var _internal_schedule : Object;
    private var _internal_prev_product_name : Object;
    private var _internal_schd_sold_to_num : Object;
    private var _internal_product_code : Object;
    private var _internal_seq : Object;
    private var _internal_qty_preload : Object;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_Compartment()
    {
        _model = new _CompartmentEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "sched_deliv_num", model_internal::setterListenerSched_deliv_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "sched_sold_to_num", model_internal::setterListenerSched_sold_to_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "sched_ship_to_num", model_internal::setterListenerSched_ship_to_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpt_no", model_internal::setterListenerCmpt_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpt_capacit", model_internal::setterListenerCmpt_capacit));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "product_name", model_internal::setterListenerProduct_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prev_product_code", model_internal::setterListenerPrev_product_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_deliv_num", model_internal::setterListenerSchd_deliv_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_title", model_internal::setterListenerEtyp_title));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_id", model_internal::setterListenerOrder_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_ship_to_num", model_internal::setterListenerSchd_ship_to_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpt_etyp", model_internal::setterListenerCmpt_etyp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpt_units", model_internal::setterListenerCmpt_units));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "unit", model_internal::setterListenerUnit));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpt_n_seals", model_internal::setterListenerCmpt_n_seals));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schedule", model_internal::setterListenerSchedule));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prev_product_name", model_internal::setterListenerPrev_product_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_sold_to_num", model_internal::setterListenerSchd_sold_to_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "product_code", model_internal::setterListenerProduct_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "seq", model_internal::setterListenerSeq));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "qty_preload", model_internal::setterListenerQty_preload));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get sched_deliv_num() : Object
    {
        return _internal_sched_deliv_num;
    }

    [Bindable(event="propertyChange")]
    public function get sched_sold_to_num() : Object
    {
        return _internal_sched_sold_to_num;
    }

    [Bindable(event="propertyChange")]
    public function get sched_ship_to_num() : Object
    {
        return _internal_sched_ship_to_num;
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_no() : String
    {
        return _internal_cmpt_no;
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_capacit() : String
    {
        return _internal_cmpt_capacit;
    }

    [Bindable(event="propertyChange")]
    public function get product_name() : Object
    {
        return _internal_product_name;
    }

    [Bindable(event="propertyChange")]
    public function get prev_product_code() : Object
    {
        return _internal_prev_product_code;
    }

    [Bindable(event="propertyChange")]
    public function get schd_deliv_num() : Object
    {
        return _internal_schd_deliv_num;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_title() : Object
    {
        return _internal_etyp_title;
    }

    [Bindable(event="propertyChange")]
    public function get order_id() : Object
    {
        return _internal_order_id;
    }

    [Bindable(event="propertyChange")]
    public function get schd_ship_to_num() : Object
    {
        return _internal_schd_ship_to_num;
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_etyp() : String
    {
        return _internal_cmpt_etyp;
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_units() : String
    {
        return _internal_cmpt_units;
    }

    [Bindable(event="propertyChange")]
    public function get unit() : String
    {
        return _internal_unit;
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_n_seals() : String
    {
        return _internal_cmpt_n_seals;
    }

    [Bindable(event="propertyChange")]
    public function get schedule() : Object
    {
        return _internal_schedule;
    }

    [Bindable(event="propertyChange")]
    public function get prev_product_name() : Object
    {
        return _internal_prev_product_name;
    }

    [Bindable(event="propertyChange")]
    public function get schd_sold_to_num() : Object
    {
        return _internal_schd_sold_to_num;
    }

    [Bindable(event="propertyChange")]
    public function get product_code() : Object
    {
        return _internal_product_code;
    }

    [Bindable(event="propertyChange")]
    public function get seq() : Object
    {
        return _internal_seq;
    }

    [Bindable(event="propertyChange")]
    public function get qty_preload() : Object
    {
        return _internal_qty_preload;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set sched_deliv_num(value:Object) : void
    {
        var oldValue:Object = _internal_sched_deliv_num;
        if (oldValue !== value)
        {
            _internal_sched_deliv_num = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sched_deliv_num", oldValue, _internal_sched_deliv_num));
        }
    }

    public function set sched_sold_to_num(value:Object) : void
    {
        var oldValue:Object = _internal_sched_sold_to_num;
        if (oldValue !== value)
        {
            _internal_sched_sold_to_num = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sched_sold_to_num", oldValue, _internal_sched_sold_to_num));
        }
    }

    public function set sched_ship_to_num(value:Object) : void
    {
        var oldValue:Object = _internal_sched_ship_to_num;
        if (oldValue !== value)
        {
            _internal_sched_ship_to_num = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sched_ship_to_num", oldValue, _internal_sched_ship_to_num));
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

    public function set cmpt_capacit(value:String) : void
    {
        var oldValue:String = _internal_cmpt_capacit;
        if (oldValue !== value)
        {
            _internal_cmpt_capacit = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_capacit", oldValue, _internal_cmpt_capacit));
        }
    }

    public function set product_name(value:Object) : void
    {
        var oldValue:Object = _internal_product_name;
        if (oldValue !== value)
        {
            _internal_product_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "product_name", oldValue, _internal_product_name));
        }
    }

    public function set prev_product_code(value:Object) : void
    {
        var oldValue:Object = _internal_prev_product_code;
        if (oldValue !== value)
        {
            _internal_prev_product_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prev_product_code", oldValue, _internal_prev_product_code));
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

    public function set etyp_title(value:Object) : void
    {
        var oldValue:Object = _internal_etyp_title;
        if (oldValue !== value)
        {
            _internal_etyp_title = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_title", oldValue, _internal_etyp_title));
        }
    }

    public function set order_id(value:Object) : void
    {
        var oldValue:Object = _internal_order_id;
        if (oldValue !== value)
        {
            _internal_order_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_id", oldValue, _internal_order_id));
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

    public function set cmpt_etyp(value:String) : void
    {
        var oldValue:String = _internal_cmpt_etyp;
        if (oldValue !== value)
        {
            _internal_cmpt_etyp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_etyp", oldValue, _internal_cmpt_etyp));
        }
    }

    public function set cmpt_units(value:String) : void
    {
        var oldValue:String = _internal_cmpt_units;
        if (oldValue !== value)
        {
            _internal_cmpt_units = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_units", oldValue, _internal_cmpt_units));
        }
    }

    public function set unit(value:String) : void
    {
        var oldValue:String = _internal_unit;
        if (oldValue !== value)
        {
            _internal_unit = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit", oldValue, _internal_unit));
        }
    }

    public function set cmpt_n_seals(value:String) : void
    {
        var oldValue:String = _internal_cmpt_n_seals;
        if (oldValue !== value)
        {
            _internal_cmpt_n_seals = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_n_seals", oldValue, _internal_cmpt_n_seals));
        }
    }

    public function set schedule(value:Object) : void
    {
        var oldValue:Object = _internal_schedule;
        if (oldValue !== value)
        {
            _internal_schedule = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schedule", oldValue, _internal_schedule));
        }
    }

    public function set prev_product_name(value:Object) : void
    {
        var oldValue:Object = _internal_prev_product_name;
        if (oldValue !== value)
        {
            _internal_prev_product_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prev_product_name", oldValue, _internal_prev_product_name));
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

    public function set product_code(value:Object) : void
    {
        var oldValue:Object = _internal_product_code;
        if (oldValue !== value)
        {
            _internal_product_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "product_code", oldValue, _internal_product_code));
        }
    }

    public function set seq(value:Object) : void
    {
        var oldValue:Object = _internal_seq;
        if (oldValue !== value)
        {
            _internal_seq = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "seq", oldValue, _internal_seq));
        }
    }

    public function set qty_preload(value:Object) : void
    {
        var oldValue:Object = _internal_qty_preload;
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

    model_internal function setterListenerSched_deliv_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSched_deliv_num();
    }

    model_internal function setterListenerSched_sold_to_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSched_sold_to_num();
    }

    model_internal function setterListenerSched_ship_to_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSched_ship_to_num();
    }

    model_internal function setterListenerCmpt_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpt_no();
    }

    model_internal function setterListenerCmpt_capacit(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpt_capacit();
    }

    model_internal function setterListenerProduct_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProduct_name();
    }

    model_internal function setterListenerPrev_product_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPrev_product_code();
    }

    model_internal function setterListenerSchd_deliv_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_deliv_num();
    }

    model_internal function setterListenerEtyp_title(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_title();
    }

    model_internal function setterListenerOrder_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_id();
    }

    model_internal function setterListenerSchd_ship_to_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_ship_to_num();
    }

    model_internal function setterListenerCmpt_etyp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpt_etyp();
    }

    model_internal function setterListenerCmpt_units(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpt_units();
    }

    model_internal function setterListenerUnit(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUnit();
    }

    model_internal function setterListenerCmpt_n_seals(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpt_n_seals();
    }

    model_internal function setterListenerSchedule(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchedule();
    }

    model_internal function setterListenerPrev_product_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPrev_product_name();
    }

    model_internal function setterListenerSchd_sold_to_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_sold_to_num();
    }

    model_internal function setterListenerProduct_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProduct_code();
    }

    model_internal function setterListenerSeq(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSeq();
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
        if (!_model.sched_deliv_numIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_sched_deliv_numValidationFailureMessages);
        }
        if (!_model.sched_sold_to_numIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_sched_sold_to_numValidationFailureMessages);
        }
        if (!_model.sched_ship_to_numIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_sched_ship_to_numValidationFailureMessages);
        }
        if (!_model.cmpt_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpt_noValidationFailureMessages);
        }
        if (!_model.cmpt_capacitIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpt_capacitValidationFailureMessages);
        }
        if (!_model.product_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_product_nameValidationFailureMessages);
        }
        if (!_model.prev_product_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prev_product_codeValidationFailureMessages);
        }
        if (!_model.schd_deliv_numIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_deliv_numValidationFailureMessages);
        }
        if (!_model.etyp_titleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_titleValidationFailureMessages);
        }
        if (!_model.order_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_idValidationFailureMessages);
        }
        if (!_model.schd_ship_to_numIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_ship_to_numValidationFailureMessages);
        }
        if (!_model.cmpt_etypIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpt_etypValidationFailureMessages);
        }
        if (!_model.cmpt_unitsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpt_unitsValidationFailureMessages);
        }
        if (!_model.unitIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_unitValidationFailureMessages);
        }
        if (!_model.cmpt_n_sealsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpt_n_sealsValidationFailureMessages);
        }
        if (!_model.scheduleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_scheduleValidationFailureMessages);
        }
        if (!_model.prev_product_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prev_product_nameValidationFailureMessages);
        }
        if (!_model.schd_sold_to_numIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_sold_to_numValidationFailureMessages);
        }
        if (!_model.product_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_product_codeValidationFailureMessages);
        }
        if (!_model.seqIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_seqValidationFailureMessages);
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
    public function get _model() : _CompartmentEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _CompartmentEntityMetadata) : void
    {
        var oldValue : _CompartmentEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfSched_deliv_num : Array = null;
    model_internal var _doValidationLastValOfSched_deliv_num : Object;

    model_internal function _doValidationForSched_deliv_num(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfSched_deliv_num != null && model_internal::_doValidationLastValOfSched_deliv_num == value)
           return model_internal::_doValidationCacheOfSched_deliv_num ;

        _model.model_internal::_sched_deliv_numIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSched_deliv_numAvailable && _internal_sched_deliv_num == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "sched_deliv_num is required"));
        }

        model_internal::_doValidationCacheOfSched_deliv_num = validationFailures;
        model_internal::_doValidationLastValOfSched_deliv_num = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSched_sold_to_num : Array = null;
    model_internal var _doValidationLastValOfSched_sold_to_num : Object;

    model_internal function _doValidationForSched_sold_to_num(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfSched_sold_to_num != null && model_internal::_doValidationLastValOfSched_sold_to_num == value)
           return model_internal::_doValidationCacheOfSched_sold_to_num ;

        _model.model_internal::_sched_sold_to_numIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSched_sold_to_numAvailable && _internal_sched_sold_to_num == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "sched_sold_to_num is required"));
        }

        model_internal::_doValidationCacheOfSched_sold_to_num = validationFailures;
        model_internal::_doValidationLastValOfSched_sold_to_num = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSched_ship_to_num : Array = null;
    model_internal var _doValidationLastValOfSched_ship_to_num : Object;

    model_internal function _doValidationForSched_ship_to_num(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfSched_ship_to_num != null && model_internal::_doValidationLastValOfSched_ship_to_num == value)
           return model_internal::_doValidationCacheOfSched_ship_to_num ;

        _model.model_internal::_sched_ship_to_numIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSched_ship_to_numAvailable && _internal_sched_ship_to_num == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "sched_ship_to_num is required"));
        }

        model_internal::_doValidationCacheOfSched_ship_to_num = validationFailures;
        model_internal::_doValidationLastValOfSched_ship_to_num = value;

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
    
    model_internal var _doValidationCacheOfProduct_name : Array = null;
    model_internal var _doValidationLastValOfProduct_name : Object;

    model_internal function _doValidationForProduct_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfProduct_name != null && model_internal::_doValidationLastValOfProduct_name == value)
           return model_internal::_doValidationCacheOfProduct_name ;

        _model.model_internal::_product_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProduct_nameAvailable && _internal_product_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "product_name is required"));
        }

        model_internal::_doValidationCacheOfProduct_name = validationFailures;
        model_internal::_doValidationLastValOfProduct_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPrev_product_code : Array = null;
    model_internal var _doValidationLastValOfPrev_product_code : Object;

    model_internal function _doValidationForPrev_product_code(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPrev_product_code != null && model_internal::_doValidationLastValOfPrev_product_code == value)
           return model_internal::_doValidationCacheOfPrev_product_code ;

        _model.model_internal::_prev_product_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPrev_product_codeAvailable && _internal_prev_product_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prev_product_code is required"));
        }

        model_internal::_doValidationCacheOfPrev_product_code = validationFailures;
        model_internal::_doValidationLastValOfPrev_product_code = value;

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
    
    model_internal var _doValidationCacheOfEtyp_title : Array = null;
    model_internal var _doValidationLastValOfEtyp_title : Object;

    model_internal function _doValidationForEtyp_title(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfOrder_id : Array = null;
    model_internal var _doValidationLastValOfOrder_id : Object;

    model_internal function _doValidationForOrder_id(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOrder_id != null && model_internal::_doValidationLastValOfOrder_id == value)
           return model_internal::_doValidationCacheOfOrder_id ;

        _model.model_internal::_order_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_idAvailable && _internal_order_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_id is required"));
        }

        model_internal::_doValidationCacheOfOrder_id = validationFailures;
        model_internal::_doValidationLastValOfOrder_id = value;

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
    
    model_internal var _doValidationCacheOfCmpt_etyp : Array = null;
    model_internal var _doValidationLastValOfCmpt_etyp : String;

    model_internal function _doValidationForCmpt_etyp(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpt_etyp != null && model_internal::_doValidationLastValOfCmpt_etyp == value)
           return model_internal::_doValidationCacheOfCmpt_etyp ;

        _model.model_internal::_cmpt_etypIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpt_etypAvailable && _internal_cmpt_etyp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpt_etyp is required"));
        }

        model_internal::_doValidationCacheOfCmpt_etyp = validationFailures;
        model_internal::_doValidationLastValOfCmpt_etyp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpt_units : Array = null;
    model_internal var _doValidationLastValOfCmpt_units : String;

    model_internal function _doValidationForCmpt_units(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpt_units != null && model_internal::_doValidationLastValOfCmpt_units == value)
           return model_internal::_doValidationCacheOfCmpt_units ;

        _model.model_internal::_cmpt_unitsIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpt_unitsAvailable && _internal_cmpt_units == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpt_units is required"));
        }

        model_internal::_doValidationCacheOfCmpt_units = validationFailures;
        model_internal::_doValidationLastValOfCmpt_units = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfUnit : Array = null;
    model_internal var _doValidationLastValOfUnit : String;

    model_internal function _doValidationForUnit(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfUnit != null && model_internal::_doValidationLastValOfUnit == value)
           return model_internal::_doValidationCacheOfUnit ;

        _model.model_internal::_unitIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isUnitAvailable && _internal_unit == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "unit is required"));
        }

        model_internal::_doValidationCacheOfUnit = validationFailures;
        model_internal::_doValidationLastValOfUnit = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpt_n_seals : Array = null;
    model_internal var _doValidationLastValOfCmpt_n_seals : String;

    model_internal function _doValidationForCmpt_n_seals(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpt_n_seals != null && model_internal::_doValidationLastValOfCmpt_n_seals == value)
           return model_internal::_doValidationCacheOfCmpt_n_seals ;

        _model.model_internal::_cmpt_n_sealsIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpt_n_sealsAvailable && _internal_cmpt_n_seals == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpt_n_seals is required"));
        }

        model_internal::_doValidationCacheOfCmpt_n_seals = validationFailures;
        model_internal::_doValidationLastValOfCmpt_n_seals = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchedule : Array = null;
    model_internal var _doValidationLastValOfSchedule : Object;

    model_internal function _doValidationForSchedule(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfSchedule != null && model_internal::_doValidationLastValOfSchedule == value)
           return model_internal::_doValidationCacheOfSchedule ;

        _model.model_internal::_scheduleIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isScheduleAvailable && _internal_schedule == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schedule is required"));
        }

        model_internal::_doValidationCacheOfSchedule = validationFailures;
        model_internal::_doValidationLastValOfSchedule = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPrev_product_name : Array = null;
    model_internal var _doValidationLastValOfPrev_product_name : Object;

    model_internal function _doValidationForPrev_product_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPrev_product_name != null && model_internal::_doValidationLastValOfPrev_product_name == value)
           return model_internal::_doValidationCacheOfPrev_product_name ;

        _model.model_internal::_prev_product_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPrev_product_nameAvailable && _internal_prev_product_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prev_product_name is required"));
        }

        model_internal::_doValidationCacheOfPrev_product_name = validationFailures;
        model_internal::_doValidationLastValOfPrev_product_name = value;

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
    
    model_internal var _doValidationCacheOfProduct_code : Array = null;
    model_internal var _doValidationLastValOfProduct_code : Object;

    model_internal function _doValidationForProduct_code(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfProduct_code != null && model_internal::_doValidationLastValOfProduct_code == value)
           return model_internal::_doValidationCacheOfProduct_code ;

        _model.model_internal::_product_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProduct_codeAvailable && _internal_product_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "product_code is required"));
        }

        model_internal::_doValidationCacheOfProduct_code = validationFailures;
        model_internal::_doValidationLastValOfProduct_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSeq : Array = null;
    model_internal var _doValidationLastValOfSeq : Object;

    model_internal function _doValidationForSeq(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfSeq != null && model_internal::_doValidationLastValOfSeq == value)
           return model_internal::_doValidationCacheOfSeq ;

        _model.model_internal::_seqIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSeqAvailable && _internal_seq == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "seq is required"));
        }

        model_internal::_doValidationCacheOfSeq = validationFailures;
        model_internal::_doValidationLastValOfSeq = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfQty_preload : Array = null;
    model_internal var _doValidationLastValOfQty_preload : Object;

    model_internal function _doValidationForQty_preload(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
