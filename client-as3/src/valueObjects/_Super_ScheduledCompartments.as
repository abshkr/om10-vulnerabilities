/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - ScheduledCompartments.as.
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
public class _Super_ScheduledCompartments extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("ScheduledCompartments") == null)
            {
                flash.net.registerClassAlias("ScheduledCompartments", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("ScheduledCompartments", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _ScheduledCompartmentsEntityMetadata;
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
    private var _internal_preld_qty : Object;
    private var _internal_prev_prodcode : Object;
    private var _internal_eqpt_code : String;
    private var _internal_tnkr_cmpt_no : String;
    private var _internal_load_qty : String;
    private var _internal_cmpt_capacit : String;
    private var _internal_shlsload_load_id : String;
    private var _internal_prev_prod : Object;
    private var _internal_schd_deliv_num : Object;
    private var _internal_schd_ship_to_num : Object;
    private var _internal_prod_code : String;
    private var _internal_cmpt_units : String;
    private var _internal_unit : String;
    private var _internal_schd_sold_to_num : Object;
    private var _internal_tc_eqpt : String;
    private var _internal_allowed_qty : String;
    private var _internal_order_cust_ordno : Object;
    private var _internal_armcode : Object;
    private var _internal_arm_name : Object;
    private var _internal_schorder_qty : String;
    private var _internal_order_ref_code : Object;
    private var _internal_tlr_cmpt : String;
    private var _internal_prod_name : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_ScheduledCompartments()
    {
        _model = new _ScheduledCompartmentsEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "preld_qty", model_internal::setterListenerPreld_qty));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prev_prodcode", model_internal::setterListenerPrev_prodcode));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_code", model_internal::setterListenerEqpt_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_cmpt_no", model_internal::setterListenerTnkr_cmpt_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "load_qty", model_internal::setterListenerLoad_qty));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpt_capacit", model_internal::setterListenerCmpt_capacit));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shlsload_load_id", model_internal::setterListenerShlsload_load_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prev_prod", model_internal::setterListenerPrev_prod));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_deliv_num", model_internal::setterListenerSchd_deliv_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_ship_to_num", model_internal::setterListenerSchd_ship_to_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_code", model_internal::setterListenerProd_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpt_units", model_internal::setterListenerCmpt_units));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "unit", model_internal::setterListenerUnit));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schd_sold_to_num", model_internal::setterListenerSchd_sold_to_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tc_eqpt", model_internal::setterListenerTc_eqpt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "allowed_qty", model_internal::setterListenerAllowed_qty));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_cust_ordno", model_internal::setterListenerOrder_cust_ordno));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "armcode", model_internal::setterListenerArmcode));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "arm_name", model_internal::setterListenerArm_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "schorder_qty", model_internal::setterListenerSchorder_qty));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_ref_code", model_internal::setterListenerOrder_ref_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tlr_cmpt", model_internal::setterListenerTlr_cmpt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_name", model_internal::setterListenerProd_name));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get preld_qty() : Object
    {
        return _internal_preld_qty;
    }

    [Bindable(event="propertyChange")]
    public function get prev_prodcode() : Object
    {
        return _internal_prev_prodcode;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_code() : String
    {
        return _internal_eqpt_code;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_cmpt_no() : String
    {
        return _internal_tnkr_cmpt_no;
    }

    [Bindable(event="propertyChange")]
    public function get load_qty() : String
    {
        return _internal_load_qty;
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_capacit() : String
    {
        return _internal_cmpt_capacit;
    }

    [Bindable(event="propertyChange")]
    public function get shlsload_load_id() : String
    {
        return _internal_shlsload_load_id;
    }

    [Bindable(event="propertyChange")]
    public function get prev_prod() : Object
    {
        return _internal_prev_prod;
    }

    [Bindable(event="propertyChange")]
    public function get schd_deliv_num() : Object
    {
        return _internal_schd_deliv_num;
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
    public function get schd_sold_to_num() : Object
    {
        return _internal_schd_sold_to_num;
    }

    [Bindable(event="propertyChange")]
    public function get tc_eqpt() : String
    {
        return _internal_tc_eqpt;
    }

    [Bindable(event="propertyChange")]
    public function get allowed_qty() : String
    {
        return _internal_allowed_qty;
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_ordno() : Object
    {
        return _internal_order_cust_ordno;
    }

    [Bindable(event="propertyChange")]
    public function get armcode() : Object
    {
        return _internal_armcode;
    }

    [Bindable(event="propertyChange")]
    public function get arm_name() : Object
    {
        return _internal_arm_name;
    }

    [Bindable(event="propertyChange")]
    public function get schorder_qty() : String
    {
        return _internal_schorder_qty;
    }

    [Bindable(event="propertyChange")]
    public function get order_ref_code() : Object
    {
        return _internal_order_ref_code;
    }

    [Bindable(event="propertyChange")]
    public function get tlr_cmpt() : String
    {
        return _internal_tlr_cmpt;
    }

    [Bindable(event="propertyChange")]
    public function get prod_name() : String
    {
        return _internal_prod_name;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set preld_qty(value:Object) : void
    {
        var oldValue:Object = _internal_preld_qty;
        if (oldValue !== value)
        {
            _internal_preld_qty = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "preld_qty", oldValue, _internal_preld_qty));
        }
    }

    public function set prev_prodcode(value:Object) : void
    {
        var oldValue:Object = _internal_prev_prodcode;
        if (oldValue !== value)
        {
            _internal_prev_prodcode = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prev_prodcode", oldValue, _internal_prev_prodcode));
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

    public function set tnkr_cmpt_no(value:String) : void
    {
        var oldValue:String = _internal_tnkr_cmpt_no;
        if (oldValue !== value)
        {
            _internal_tnkr_cmpt_no = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_cmpt_no", oldValue, _internal_tnkr_cmpt_no));
        }
    }

    public function set load_qty(value:String) : void
    {
        var oldValue:String = _internal_load_qty;
        if (oldValue !== value)
        {
            _internal_load_qty = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_qty", oldValue, _internal_load_qty));
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

    public function set shlsload_load_id(value:String) : void
    {
        var oldValue:String = _internal_shlsload_load_id;
        if (oldValue !== value)
        {
            _internal_shlsload_load_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shlsload_load_id", oldValue, _internal_shlsload_load_id));
        }
    }

    public function set prev_prod(value:Object) : void
    {
        var oldValue:Object = _internal_prev_prod;
        if (oldValue !== value)
        {
            _internal_prev_prod = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prev_prod", oldValue, _internal_prev_prod));
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

    public function set schd_sold_to_num(value:Object) : void
    {
        var oldValue:Object = _internal_schd_sold_to_num;
        if (oldValue !== value)
        {
            _internal_schd_sold_to_num = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_sold_to_num", oldValue, _internal_schd_sold_to_num));
        }
    }

    public function set tc_eqpt(value:String) : void
    {
        var oldValue:String = _internal_tc_eqpt;
        if (oldValue !== value)
        {
            _internal_tc_eqpt = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tc_eqpt", oldValue, _internal_tc_eqpt));
        }
    }

    public function set allowed_qty(value:String) : void
    {
        var oldValue:String = _internal_allowed_qty;
        if (oldValue !== value)
        {
            _internal_allowed_qty = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "allowed_qty", oldValue, _internal_allowed_qty));
        }
    }

    public function set order_cust_ordno(value:Object) : void
    {
        var oldValue:Object = _internal_order_cust_ordno;
        if (oldValue !== value)
        {
            _internal_order_cust_ordno = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_ordno", oldValue, _internal_order_cust_ordno));
        }
    }

    public function set armcode(value:Object) : void
    {
        var oldValue:Object = _internal_armcode;
        if (oldValue !== value)
        {
            _internal_armcode = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "armcode", oldValue, _internal_armcode));
        }
    }

    public function set arm_name(value:Object) : void
    {
        var oldValue:Object = _internal_arm_name;
        if (oldValue !== value)
        {
            _internal_arm_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "arm_name", oldValue, _internal_arm_name));
        }
    }

    public function set schorder_qty(value:String) : void
    {
        var oldValue:String = _internal_schorder_qty;
        if (oldValue !== value)
        {
            _internal_schorder_qty = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schorder_qty", oldValue, _internal_schorder_qty));
        }
    }

    public function set order_ref_code(value:Object) : void
    {
        var oldValue:Object = _internal_order_ref_code;
        if (oldValue !== value)
        {
            _internal_order_ref_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_ref_code", oldValue, _internal_order_ref_code));
        }
    }

    public function set tlr_cmpt(value:String) : void
    {
        var oldValue:String = _internal_tlr_cmpt;
        if (oldValue !== value)
        {
            _internal_tlr_cmpt = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tlr_cmpt", oldValue, _internal_tlr_cmpt));
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

    model_internal function setterListenerPreld_qty(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPreld_qty();
    }

    model_internal function setterListenerPrev_prodcode(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPrev_prodcode();
    }

    model_internal function setterListenerEqpt_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_code();
    }

    model_internal function setterListenerTnkr_cmpt_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_cmpt_no();
    }

    model_internal function setterListenerLoad_qty(value:flash.events.Event):void
    {
        _model.invalidateDependentOnLoad_qty();
    }

    model_internal function setterListenerCmpt_capacit(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpt_capacit();
    }

    model_internal function setterListenerShlsload_load_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShlsload_load_id();
    }

    model_internal function setterListenerPrev_prod(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPrev_prod();
    }

    model_internal function setterListenerSchd_deliv_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_deliv_num();
    }

    model_internal function setterListenerSchd_ship_to_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_ship_to_num();
    }

    model_internal function setterListenerProd_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProd_code();
    }

    model_internal function setterListenerCmpt_units(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpt_units();
    }

    model_internal function setterListenerUnit(value:flash.events.Event):void
    {
        _model.invalidateDependentOnUnit();
    }

    model_internal function setterListenerSchd_sold_to_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchd_sold_to_num();
    }

    model_internal function setterListenerTc_eqpt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTc_eqpt();
    }

    model_internal function setterListenerAllowed_qty(value:flash.events.Event):void
    {
        _model.invalidateDependentOnAllowed_qty();
    }

    model_internal function setterListenerOrder_cust_ordno(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_cust_ordno();
    }

    model_internal function setterListenerArmcode(value:flash.events.Event):void
    {
        _model.invalidateDependentOnArmcode();
    }

    model_internal function setterListenerArm_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnArm_name();
    }

    model_internal function setterListenerSchorder_qty(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSchorder_qty();
    }

    model_internal function setterListenerOrder_ref_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_ref_code();
    }

    model_internal function setterListenerTlr_cmpt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTlr_cmpt();
    }

    model_internal function setterListenerProd_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProd_name();
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
        if (!_model.preld_qtyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_preld_qtyValidationFailureMessages);
        }
        if (!_model.prev_prodcodeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prev_prodcodeValidationFailureMessages);
        }
        if (!_model.eqpt_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_codeValidationFailureMessages);
        }
        if (!_model.tnkr_cmpt_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_cmpt_noValidationFailureMessages);
        }
        if (!_model.load_qtyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_load_qtyValidationFailureMessages);
        }
        if (!_model.cmpt_capacitIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpt_capacitValidationFailureMessages);
        }
        if (!_model.shlsload_load_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shlsload_load_idValidationFailureMessages);
        }
        if (!_model.prev_prodIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prev_prodValidationFailureMessages);
        }
        if (!_model.schd_deliv_numIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_deliv_numValidationFailureMessages);
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
        if (!_model.schd_sold_to_numIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schd_sold_to_numValidationFailureMessages);
        }
        if (!_model.tc_eqptIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tc_eqptValidationFailureMessages);
        }
        if (!_model.allowed_qtyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_allowed_qtyValidationFailureMessages);
        }
        if (!_model.order_cust_ordnoIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_cust_ordnoValidationFailureMessages);
        }
        if (!_model.armcodeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_armcodeValidationFailureMessages);
        }
        if (!_model.arm_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_arm_nameValidationFailureMessages);
        }
        if (!_model.schorder_qtyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_schorder_qtyValidationFailureMessages);
        }
        if (!_model.order_ref_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_ref_codeValidationFailureMessages);
        }
        if (!_model.tlr_cmptIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tlr_cmptValidationFailureMessages);
        }
        if (!_model.prod_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prod_nameValidationFailureMessages);
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
    public function get _model() : _ScheduledCompartmentsEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _ScheduledCompartmentsEntityMetadata) : void
    {
        var oldValue : _ScheduledCompartmentsEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfPreld_qty : Array = null;
    model_internal var _doValidationLastValOfPreld_qty : Object;

    model_internal function _doValidationForPreld_qty(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPreld_qty != null && model_internal::_doValidationLastValOfPreld_qty == value)
           return model_internal::_doValidationCacheOfPreld_qty ;

        _model.model_internal::_preld_qtyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPreld_qtyAvailable && _internal_preld_qty == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "preld_qty is required"));
        }

        model_internal::_doValidationCacheOfPreld_qty = validationFailures;
        model_internal::_doValidationLastValOfPreld_qty = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPrev_prodcode : Array = null;
    model_internal var _doValidationLastValOfPrev_prodcode : Object;

    model_internal function _doValidationForPrev_prodcode(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPrev_prodcode != null && model_internal::_doValidationLastValOfPrev_prodcode == value)
           return model_internal::_doValidationCacheOfPrev_prodcode ;

        _model.model_internal::_prev_prodcodeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPrev_prodcodeAvailable && _internal_prev_prodcode == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prev_prodcode is required"));
        }

        model_internal::_doValidationCacheOfPrev_prodcode = validationFailures;
        model_internal::_doValidationLastValOfPrev_prodcode = value;

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
    
    model_internal var _doValidationCacheOfTnkr_cmpt_no : Array = null;
    model_internal var _doValidationLastValOfTnkr_cmpt_no : String;

    model_internal function _doValidationForTnkr_cmpt_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_cmpt_no != null && model_internal::_doValidationLastValOfTnkr_cmpt_no == value)
           return model_internal::_doValidationCacheOfTnkr_cmpt_no ;

        _model.model_internal::_tnkr_cmpt_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_cmpt_noAvailable && _internal_tnkr_cmpt_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_cmpt_no is required"));
        }

        model_internal::_doValidationCacheOfTnkr_cmpt_no = validationFailures;
        model_internal::_doValidationLastValOfTnkr_cmpt_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfLoad_qty : Array = null;
    model_internal var _doValidationLastValOfLoad_qty : String;

    model_internal function _doValidationForLoad_qty(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfLoad_qty != null && model_internal::_doValidationLastValOfLoad_qty == value)
           return model_internal::_doValidationCacheOfLoad_qty ;

        _model.model_internal::_load_qtyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isLoad_qtyAvailable && _internal_load_qty == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "load_qty is required"));
        }

        model_internal::_doValidationCacheOfLoad_qty = validationFailures;
        model_internal::_doValidationLastValOfLoad_qty = value;

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
    
    model_internal var _doValidationCacheOfShlsload_load_id : Array = null;
    model_internal var _doValidationLastValOfShlsload_load_id : String;

    model_internal function _doValidationForShlsload_load_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfShlsload_load_id != null && model_internal::_doValidationLastValOfShlsload_load_id == value)
           return model_internal::_doValidationCacheOfShlsload_load_id ;

        _model.model_internal::_shlsload_load_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShlsload_load_idAvailable && _internal_shlsload_load_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shlsload_load_id is required"));
        }

        model_internal::_doValidationCacheOfShlsload_load_id = validationFailures;
        model_internal::_doValidationLastValOfShlsload_load_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPrev_prod : Array = null;
    model_internal var _doValidationLastValOfPrev_prod : Object;

    model_internal function _doValidationForPrev_prod(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPrev_prod != null && model_internal::_doValidationLastValOfPrev_prod == value)
           return model_internal::_doValidationCacheOfPrev_prod ;

        _model.model_internal::_prev_prodIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPrev_prodAvailable && _internal_prev_prod == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prev_prod is required"));
        }

        model_internal::_doValidationCacheOfPrev_prod = validationFailures;
        model_internal::_doValidationLastValOfPrev_prod = value;

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
    
    model_internal var _doValidationCacheOfTc_eqpt : Array = null;
    model_internal var _doValidationLastValOfTc_eqpt : String;

    model_internal function _doValidationForTc_eqpt(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTc_eqpt != null && model_internal::_doValidationLastValOfTc_eqpt == value)
           return model_internal::_doValidationCacheOfTc_eqpt ;

        _model.model_internal::_tc_eqptIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTc_eqptAvailable && _internal_tc_eqpt == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tc_eqpt is required"));
        }

        model_internal::_doValidationCacheOfTc_eqpt = validationFailures;
        model_internal::_doValidationLastValOfTc_eqpt = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfAllowed_qty : Array = null;
    model_internal var _doValidationLastValOfAllowed_qty : String;

    model_internal function _doValidationForAllowed_qty(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfAllowed_qty != null && model_internal::_doValidationLastValOfAllowed_qty == value)
           return model_internal::_doValidationCacheOfAllowed_qty ;

        _model.model_internal::_allowed_qtyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isAllowed_qtyAvailable && _internal_allowed_qty == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "allowed_qty is required"));
        }

        model_internal::_doValidationCacheOfAllowed_qty = validationFailures;
        model_internal::_doValidationLastValOfAllowed_qty = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_cust_ordno : Array = null;
    model_internal var _doValidationLastValOfOrder_cust_ordno : Object;

    model_internal function _doValidationForOrder_cust_ordno(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOrder_cust_ordno != null && model_internal::_doValidationLastValOfOrder_cust_ordno == value)
           return model_internal::_doValidationCacheOfOrder_cust_ordno ;

        _model.model_internal::_order_cust_ordnoIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_cust_ordnoAvailable && _internal_order_cust_ordno == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_cust_ordno is required"));
        }

        model_internal::_doValidationCacheOfOrder_cust_ordno = validationFailures;
        model_internal::_doValidationLastValOfOrder_cust_ordno = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfArmcode : Array = null;
    model_internal var _doValidationLastValOfArmcode : Object;

    model_internal function _doValidationForArmcode(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfArmcode != null && model_internal::_doValidationLastValOfArmcode == value)
           return model_internal::_doValidationCacheOfArmcode ;

        _model.model_internal::_armcodeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isArmcodeAvailable && _internal_armcode == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "armcode is required"));
        }

        model_internal::_doValidationCacheOfArmcode = validationFailures;
        model_internal::_doValidationLastValOfArmcode = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfArm_name : Array = null;
    model_internal var _doValidationLastValOfArm_name : Object;

    model_internal function _doValidationForArm_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfArm_name != null && model_internal::_doValidationLastValOfArm_name == value)
           return model_internal::_doValidationCacheOfArm_name ;

        _model.model_internal::_arm_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isArm_nameAvailable && _internal_arm_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "arm_name is required"));
        }

        model_internal::_doValidationCacheOfArm_name = validationFailures;
        model_internal::_doValidationLastValOfArm_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSchorder_qty : Array = null;
    model_internal var _doValidationLastValOfSchorder_qty : String;

    model_internal function _doValidationForSchorder_qty(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSchorder_qty != null && model_internal::_doValidationLastValOfSchorder_qty == value)
           return model_internal::_doValidationCacheOfSchorder_qty ;

        _model.model_internal::_schorder_qtyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSchorder_qtyAvailable && _internal_schorder_qty == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "schorder_qty is required"));
        }

        model_internal::_doValidationCacheOfSchorder_qty = validationFailures;
        model_internal::_doValidationLastValOfSchorder_qty = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_ref_code : Array = null;
    model_internal var _doValidationLastValOfOrder_ref_code : Object;

    model_internal function _doValidationForOrder_ref_code(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOrder_ref_code != null && model_internal::_doValidationLastValOfOrder_ref_code == value)
           return model_internal::_doValidationCacheOfOrder_ref_code ;

        _model.model_internal::_order_ref_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_ref_codeAvailable && _internal_order_ref_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_ref_code is required"));
        }

        model_internal::_doValidationCacheOfOrder_ref_code = validationFailures;
        model_internal::_doValidationLastValOfOrder_ref_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTlr_cmpt : Array = null;
    model_internal var _doValidationLastValOfTlr_cmpt : String;

    model_internal function _doValidationForTlr_cmpt(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTlr_cmpt != null && model_internal::_doValidationLastValOfTlr_cmpt == value)
           return model_internal::_doValidationCacheOfTlr_cmpt ;

        _model.model_internal::_tlr_cmptIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTlr_cmptAvailable && _internal_tlr_cmpt == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tlr_cmpt is required"));
        }

        model_internal::_doValidationCacheOfTlr_cmpt = validationFailures;
        model_internal::_doValidationLastValOfTlr_cmpt = value;

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
    

}

}
