/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - GuiSchedules.as.
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
public class _Super_GuiSchedules extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("GuiSchedules") == null)
            {
                flash.net.registerClassAlias("GuiSchedules", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("GuiSchedules", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _GuiSchedulesEntityMetadata;
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
    private var _internal_shls_ld_start : Object;
    private var _internal_supplier_code : String;
    private var _internal_rn : String;
    private var _internal_drawer_code : String;
    private var _internal_shls_supp_org : Object;
    private var _internal_shlsload_load_id : String;
    private var _internal_shls_ship_to_num : String;
    private var _internal_shls_ld_type : String;
    private var _internal_order_no : Object;
    private var _internal_shls_sold_to_num : String;
    private var _internal_shls_terminal : String;
    private var _internal_shls_exp2 : String;
    private var _internal_shls_trip_no_org : Object;
    private var _internal_shls_trip_no : String;
    private var _internal_order_cust_ordno : Object;
    private var _internal_carrier : String;
    private var _internal_driver : Object;
    private var _internal_ld_type : String;
    private var _internal_supplier : String;
    private var _internal_order_ref_code : Object;
    private var _internal_shls_caldate : String;
    private var _internal_tnkr_name : String;
    private var _internal_shls_status : String;
    private var _internal_status : String;
    private var _internal_last_chg_time : String;
    private var _internal_order_cust_cmpy_name : Object;
    private var _internal_shl_ret_loc : String;
    private var _internal_order_cust : Object;
    private var _internal_operator : String;
    private var _internal_shls_shift : String;
    private var _internal_order_cust_cmpy_code : Object;
    private var _internal_load_reverse_flag : Object;
    private var _internal_carrier_code : String;
    private var _internal_drawer_name : String;
    private var _internal_tnkr_code : String;
    private var _internal_cmpy_schd_archive : String;
    private var _internal_shedule_profile : String;
    private var _internal_cmpy_schd_rev_repost : String;
    private var _internal_shls_ld_end : Object;
    private var _internal_shls_priority : Object;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_GuiSchedules()
    {
        _model = new _GuiSchedulesEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shls_ld_start", model_internal::setterListenerShls_ld_start));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "supplier_code", model_internal::setterListenerSupplier_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "drawer_code", model_internal::setterListenerDrawer_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shls_supp_org", model_internal::setterListenerShls_supp_org));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shlsload_load_id", model_internal::setterListenerShlsload_load_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shls_ship_to_num", model_internal::setterListenerShls_ship_to_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shls_ld_type", model_internal::setterListenerShls_ld_type));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_no", model_internal::setterListenerOrder_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shls_sold_to_num", model_internal::setterListenerShls_sold_to_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shls_terminal", model_internal::setterListenerShls_terminal));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shls_exp2", model_internal::setterListenerShls_exp2));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shls_trip_no_org", model_internal::setterListenerShls_trip_no_org));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shls_trip_no", model_internal::setterListenerShls_trip_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_cust_ordno", model_internal::setterListenerOrder_cust_ordno));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "carrier", model_internal::setterListenerCarrier));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "driver", model_internal::setterListenerDriver));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "ld_type", model_internal::setterListenerLd_type));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "supplier", model_internal::setterListenerSupplier));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_ref_code", model_internal::setterListenerOrder_ref_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shls_caldate", model_internal::setterListenerShls_caldate));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_name", model_internal::setterListenerTnkr_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shls_status", model_internal::setterListenerShls_status));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "status", model_internal::setterListenerStatus));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "last_chg_time", model_internal::setterListenerLast_chg_time));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_cust_cmpy_name", model_internal::setterListenerOrder_cust_cmpy_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shl_ret_loc", model_internal::setterListenerShl_ret_loc));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_cust", model_internal::setterListenerOrder_cust));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "operator", model_internal::setterListenerOperator));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shls_shift", model_internal::setterListenerShls_shift));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_cust_cmpy_code", model_internal::setterListenerOrder_cust_cmpy_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "load_reverse_flag", model_internal::setterListenerLoad_reverse_flag));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "carrier_code", model_internal::setterListenerCarrier_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "drawer_name", model_internal::setterListenerDrawer_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_code", model_internal::setterListenerTnkr_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_schd_archive", model_internal::setterListenerCmpy_schd_archive));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shedule_profile", model_internal::setterListenerShedule_profile));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_schd_rev_repost", model_internal::setterListenerCmpy_schd_rev_repost));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shls_ld_end", model_internal::setterListenerShls_ld_end));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "shls_priority", model_internal::setterListenerShls_priority));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get shls_ld_start() : Object
    {
        return _internal_shls_ld_start;
    }

    [Bindable(event="propertyChange")]
    public function get supplier_code() : String
    {
        return _internal_supplier_code;
    }

    [Bindable(event="propertyChange")]
    public function get rn() : String
    {
        return _internal_rn;
    }

    [Bindable(event="propertyChange")]
    public function get drawer_code() : String
    {
        return _internal_drawer_code;
    }

    [Bindable(event="propertyChange")]
    public function get shls_supp_org() : Object
    {
        return _internal_shls_supp_org;
    }

    [Bindable(event="propertyChange")]
    public function get shlsload_load_id() : String
    {
        return _internal_shlsload_load_id;
    }

    [Bindable(event="propertyChange")]
    public function get shls_ship_to_num() : String
    {
        return _internal_shls_ship_to_num;
    }

    [Bindable(event="propertyChange")]
    public function get shls_ld_type() : String
    {
        return _internal_shls_ld_type;
    }

    [Bindable(event="propertyChange")]
    public function get order_no() : Object
    {
        return _internal_order_no;
    }

    [Bindable(event="propertyChange")]
    public function get shls_sold_to_num() : String
    {
        return _internal_shls_sold_to_num;
    }

    [Bindable(event="propertyChange")]
    public function get shls_terminal() : String
    {
        return _internal_shls_terminal;
    }

    [Bindable(event="propertyChange")]
    public function get shls_exp2() : String
    {
        return _internal_shls_exp2;
    }

    [Bindable(event="propertyChange")]
    public function get shls_trip_no_org() : Object
    {
        return _internal_shls_trip_no_org;
    }

    [Bindable(event="propertyChange")]
    public function get shls_trip_no() : String
    {
        return _internal_shls_trip_no;
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_ordno() : Object
    {
        return _internal_order_cust_ordno;
    }

    [Bindable(event="propertyChange")]
    public function get carrier() : String
    {
        return _internal_carrier;
    }

    [Bindable(event="propertyChange")]
    public function get driver() : Object
    {
        return _internal_driver;
    }

    [Bindable(event="propertyChange")]
    public function get ld_type() : String
    {
        return _internal_ld_type;
    }

    [Bindable(event="propertyChange")]
    public function get supplier() : String
    {
        return _internal_supplier;
    }

    [Bindable(event="propertyChange")]
    public function get order_ref_code() : Object
    {
        return _internal_order_ref_code;
    }

    [Bindable(event="propertyChange")]
    public function get shls_caldate() : String
    {
        return _internal_shls_caldate;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_name() : String
    {
        return _internal_tnkr_name;
    }

    [Bindable(event="propertyChange")]
    public function get shls_status() : String
    {
        return _internal_shls_status;
    }

    [Bindable(event="propertyChange")]
    public function get status() : String
    {
        return _internal_status;
    }

    [Bindable(event="propertyChange")]
    public function get last_chg_time() : String
    {
        return _internal_last_chg_time;
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_cmpy_name() : Object
    {
        return _internal_order_cust_cmpy_name;
    }

    [Bindable(event="propertyChange")]
    public function get shl_ret_loc() : String
    {
        return _internal_shl_ret_loc;
    }

    [Bindable(event="propertyChange")]
    public function get order_cust() : Object
    {
        return _internal_order_cust;
    }

    [Bindable(event="propertyChange")]
    public function get operator() : String
    {
        return _internal_operator;
    }

    [Bindable(event="propertyChange")]
    public function get shls_shift() : String
    {
        return _internal_shls_shift;
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_cmpy_code() : Object
    {
        return _internal_order_cust_cmpy_code;
    }

    [Bindable(event="propertyChange")]
    public function get load_reverse_flag() : Object
    {
        return _internal_load_reverse_flag;
    }

    [Bindable(event="propertyChange")]
    public function get carrier_code() : String
    {
        return _internal_carrier_code;
    }

    [Bindable(event="propertyChange")]
    public function get drawer_name() : String
    {
        return _internal_drawer_name;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_code() : String
    {
        return _internal_tnkr_code;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_schd_archive() : String
    {
        return _internal_cmpy_schd_archive;
    }

    [Bindable(event="propertyChange")]
    public function get shedule_profile() : String
    {
        return _internal_shedule_profile;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_schd_rev_repost() : String
    {
        return _internal_cmpy_schd_rev_repost;
    }

    [Bindable(event="propertyChange")]
    public function get shls_ld_end() : Object
    {
        return _internal_shls_ld_end;
    }

    [Bindable(event="propertyChange")]
    public function get shls_priority() : Object
    {
        return _internal_shls_priority;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set shls_ld_start(value:Object) : void
    {
        var oldValue:Object = _internal_shls_ld_start;
        if (oldValue !== value)
        {
            _internal_shls_ld_start = value;
        }
    }

    public function set supplier_code(value:String) : void
    {
        var oldValue:String = _internal_supplier_code;
        if (oldValue !== value)
        {
            _internal_supplier_code = value;
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

    public function set drawer_code(value:String) : void
    {
        var oldValue:String = _internal_drawer_code;
        if (oldValue !== value)
        {
            _internal_drawer_code = value;
        }
    }

    public function set shls_supp_org(value:Object) : void
    {
        var oldValue:Object = _internal_shls_supp_org;
        if (oldValue !== value)
        {
            _internal_shls_supp_org = value;
        }
    }

    public function set shlsload_load_id(value:String) : void
    {
        var oldValue:String = _internal_shlsload_load_id;
        if (oldValue !== value)
        {
            _internal_shlsload_load_id = value;
        }
    }

    public function set shls_ship_to_num(value:String) : void
    {
        var oldValue:String = _internal_shls_ship_to_num;
        if (oldValue !== value)
        {
            _internal_shls_ship_to_num = value;
        }
    }

    public function set shls_ld_type(value:String) : void
    {
        var oldValue:String = _internal_shls_ld_type;
        if (oldValue !== value)
        {
            _internal_shls_ld_type = value;
        }
    }

    public function set order_no(value:Object) : void
    {
        var oldValue:Object = _internal_order_no;
        if (oldValue !== value)
        {
            _internal_order_no = value;
        }
    }

    public function set shls_sold_to_num(value:String) : void
    {
        var oldValue:String = _internal_shls_sold_to_num;
        if (oldValue !== value)
        {
            _internal_shls_sold_to_num = value;
        }
    }

    public function set shls_terminal(value:String) : void
    {
        var oldValue:String = _internal_shls_terminal;
        if (oldValue !== value)
        {
            _internal_shls_terminal = value;
        }
    }

    public function set shls_exp2(value:String) : void
    {
        var oldValue:String = _internal_shls_exp2;
        if (oldValue !== value)
        {
            _internal_shls_exp2 = value;
        }
    }

    public function set shls_trip_no_org(value:Object) : void
    {
        var oldValue:Object = _internal_shls_trip_no_org;
        if (oldValue !== value)
        {
            _internal_shls_trip_no_org = value;
        }
    }

    public function set shls_trip_no(value:String) : void
    {
        var oldValue:String = _internal_shls_trip_no;
        if (oldValue !== value)
        {
            _internal_shls_trip_no = value;
        }
    }

    public function set order_cust_ordno(value:Object) : void
    {
        var oldValue:Object = _internal_order_cust_ordno;
        if (oldValue !== value)
        {
            _internal_order_cust_ordno = value;
        }
    }

    public function set carrier(value:String) : void
    {
        var oldValue:String = _internal_carrier;
        if (oldValue !== value)
        {
            _internal_carrier = value;
        }
    }

    public function set driver(value:Object) : void
    {
        var oldValue:Object = _internal_driver;
        if (oldValue !== value)
        {
            _internal_driver = value;
        }
    }

    public function set ld_type(value:String) : void
    {
        var oldValue:String = _internal_ld_type;
        if (oldValue !== value)
        {
            _internal_ld_type = value;
        }
    }

    public function set supplier(value:String) : void
    {
        var oldValue:String = _internal_supplier;
        if (oldValue !== value)
        {
            _internal_supplier = value;
        }
    }

    public function set order_ref_code(value:Object) : void
    {
        var oldValue:Object = _internal_order_ref_code;
        if (oldValue !== value)
        {
            _internal_order_ref_code = value;
        }
    }

    public function set shls_caldate(value:String) : void
    {
        var oldValue:String = _internal_shls_caldate;
        if (oldValue !== value)
        {
            _internal_shls_caldate = value;
        }
    }

    public function set tnkr_name(value:String) : void
    {
        var oldValue:String = _internal_tnkr_name;
        if (oldValue !== value)
        {
            _internal_tnkr_name = value;
        }
    }

    public function set shls_status(value:String) : void
    {
        var oldValue:String = _internal_shls_status;
        if (oldValue !== value)
        {
            _internal_shls_status = value;
        }
    }

    public function set status(value:String) : void
    {
        var oldValue:String = _internal_status;
        if (oldValue !== value)
        {
            _internal_status = value;
        }
    }

    public function set last_chg_time(value:String) : void
    {
        var oldValue:String = _internal_last_chg_time;
        if (oldValue !== value)
        {
            _internal_last_chg_time = value;
        }
    }

    public function set order_cust_cmpy_name(value:Object) : void
    {
        var oldValue:Object = _internal_order_cust_cmpy_name;
        if (oldValue !== value)
        {
            _internal_order_cust_cmpy_name = value;
        }
    }

    public function set shl_ret_loc(value:String) : void
    {
        var oldValue:String = _internal_shl_ret_loc;
        if (oldValue !== value)
        {
            _internal_shl_ret_loc = value;
        }
    }

    public function set order_cust(value:Object) : void
    {
        var oldValue:Object = _internal_order_cust;
        if (oldValue !== value)
        {
            _internal_order_cust = value;
        }
    }

    public function set operator(value:String) : void
    {
        var oldValue:String = _internal_operator;
        if (oldValue !== value)
        {
            _internal_operator = value;
        }
    }

    public function set shls_shift(value:String) : void
    {
        var oldValue:String = _internal_shls_shift;
        if (oldValue !== value)
        {
            _internal_shls_shift = value;
        }
    }

    public function set order_cust_cmpy_code(value:Object) : void
    {
        var oldValue:Object = _internal_order_cust_cmpy_code;
        if (oldValue !== value)
        {
            _internal_order_cust_cmpy_code = value;
        }
    }

    public function set load_reverse_flag(value:Object) : void
    {
        var oldValue:Object = _internal_load_reverse_flag;
        if (oldValue !== value)
        {
            _internal_load_reverse_flag = value;
        }
    }

    public function set carrier_code(value:String) : void
    {
        var oldValue:String = _internal_carrier_code;
        if (oldValue !== value)
        {
            _internal_carrier_code = value;
        }
    }

    public function set drawer_name(value:String) : void
    {
        var oldValue:String = _internal_drawer_name;
        if (oldValue !== value)
        {
            _internal_drawer_name = value;
        }
    }

    public function set tnkr_code(value:String) : void
    {
        var oldValue:String = _internal_tnkr_code;
        if (oldValue !== value)
        {
            _internal_tnkr_code = value;
        }
    }

    public function set cmpy_schd_archive(value:String) : void
    {
        var oldValue:String = _internal_cmpy_schd_archive;
        if (oldValue !== value)
        {
            _internal_cmpy_schd_archive = value;
        }
    }

    public function set shedule_profile(value:String) : void
    {
        var oldValue:String = _internal_shedule_profile;
        if (oldValue !== value)
        {
            _internal_shedule_profile = value;
        }
    }

    public function set cmpy_schd_rev_repost(value:String) : void
    {
        var oldValue:String = _internal_cmpy_schd_rev_repost;
        if (oldValue !== value)
        {
            _internal_cmpy_schd_rev_repost = value;
        }
    }

    public function set shls_ld_end(value:Object) : void
    {
        var oldValue:Object = _internal_shls_ld_end;
        if (oldValue !== value)
        {
            _internal_shls_ld_end = value;
        }
    }

    public function set shls_priority(value:Object) : void
    {
        var oldValue:Object = _internal_shls_priority;
        if (oldValue !== value)
        {
            _internal_shls_priority = value;
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

    model_internal function setterListenerShls_ld_start(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShls_ld_start();
    }

    model_internal function setterListenerSupplier_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSupplier_code();
    }

    model_internal function setterListenerDrawer_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDrawer_code();
    }

    model_internal function setterListenerShls_supp_org(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShls_supp_org();
    }

    model_internal function setterListenerShlsload_load_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShlsload_load_id();
    }

    model_internal function setterListenerShls_ship_to_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShls_ship_to_num();
    }

    model_internal function setterListenerShls_ld_type(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShls_ld_type();
    }

    model_internal function setterListenerOrder_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_no();
    }

    model_internal function setterListenerShls_sold_to_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShls_sold_to_num();
    }

    model_internal function setterListenerShls_terminal(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShls_terminal();
    }

    model_internal function setterListenerShls_exp2(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShls_exp2();
    }

    model_internal function setterListenerShls_trip_no_org(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShls_trip_no_org();
    }

    model_internal function setterListenerShls_trip_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShls_trip_no();
    }

    model_internal function setterListenerOrder_cust_ordno(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_cust_ordno();
    }

    model_internal function setterListenerCarrier(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCarrier();
    }

    model_internal function setterListenerDriver(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDriver();
    }

    model_internal function setterListenerLd_type(value:flash.events.Event):void
    {
        _model.invalidateDependentOnLd_type();
    }

    model_internal function setterListenerSupplier(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSupplier();
    }

    model_internal function setterListenerOrder_ref_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_ref_code();
    }

    model_internal function setterListenerShls_caldate(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShls_caldate();
    }

    model_internal function setterListenerTnkr_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_name();
    }

    model_internal function setterListenerShls_status(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShls_status();
    }

    model_internal function setterListenerStatus(value:flash.events.Event):void
    {
        _model.invalidateDependentOnStatus();
    }

    model_internal function setterListenerLast_chg_time(value:flash.events.Event):void
    {
        _model.invalidateDependentOnLast_chg_time();
    }

    model_internal function setterListenerOrder_cust_cmpy_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_cust_cmpy_name();
    }

    model_internal function setterListenerShl_ret_loc(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShl_ret_loc();
    }

    model_internal function setterListenerOrder_cust(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_cust();
    }

    model_internal function setterListenerOperator(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOperator();
    }

    model_internal function setterListenerShls_shift(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShls_shift();
    }

    model_internal function setterListenerOrder_cust_cmpy_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_cust_cmpy_code();
    }

    model_internal function setterListenerLoad_reverse_flag(value:flash.events.Event):void
    {
        _model.invalidateDependentOnLoad_reverse_flag();
    }

    model_internal function setterListenerCarrier_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCarrier_code();
    }

    model_internal function setterListenerDrawer_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDrawer_name();
    }

    model_internal function setterListenerTnkr_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_code();
    }

    model_internal function setterListenerCmpy_schd_archive(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_schd_archive();
    }

    model_internal function setterListenerShedule_profile(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShedule_profile();
    }

    model_internal function setterListenerCmpy_schd_rev_repost(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_schd_rev_repost();
    }

    model_internal function setterListenerShls_ld_end(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShls_ld_end();
    }

    model_internal function setterListenerShls_priority(value:flash.events.Event):void
    {
        _model.invalidateDependentOnShls_priority();
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
        if (!_model.shls_ld_startIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shls_ld_startValidationFailureMessages);
        }
        if (!_model.supplier_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_supplier_codeValidationFailureMessages);
        }
        if (!_model.drawer_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_drawer_codeValidationFailureMessages);
        }
        if (!_model.shls_supp_orgIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shls_supp_orgValidationFailureMessages);
        }
        if (!_model.shlsload_load_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shlsload_load_idValidationFailureMessages);
        }
        if (!_model.shls_ship_to_numIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shls_ship_to_numValidationFailureMessages);
        }
        if (!_model.shls_ld_typeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shls_ld_typeValidationFailureMessages);
        }
        if (!_model.order_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_noValidationFailureMessages);
        }
        if (!_model.shls_sold_to_numIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shls_sold_to_numValidationFailureMessages);
        }
        if (!_model.shls_terminalIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shls_terminalValidationFailureMessages);
        }
        if (!_model.shls_exp2IsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shls_exp2ValidationFailureMessages);
        }
        if (!_model.shls_trip_no_orgIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shls_trip_no_orgValidationFailureMessages);
        }
        if (!_model.shls_trip_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shls_trip_noValidationFailureMessages);
        }
        if (!_model.order_cust_ordnoIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_cust_ordnoValidationFailureMessages);
        }
        if (!_model.carrierIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_carrierValidationFailureMessages);
        }
        if (!_model.driverIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_driverValidationFailureMessages);
        }
        if (!_model.ld_typeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_ld_typeValidationFailureMessages);
        }
        if (!_model.supplierIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_supplierValidationFailureMessages);
        }
        if (!_model.order_ref_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_ref_codeValidationFailureMessages);
        }
        if (!_model.shls_caldateIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shls_caldateValidationFailureMessages);
        }
        if (!_model.tnkr_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_nameValidationFailureMessages);
        }
        if (!_model.shls_statusIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shls_statusValidationFailureMessages);
        }
        if (!_model.statusIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_statusValidationFailureMessages);
        }
        if (!_model.last_chg_timeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_last_chg_timeValidationFailureMessages);
        }
        if (!_model.order_cust_cmpy_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_cust_cmpy_nameValidationFailureMessages);
        }
        if (!_model.shl_ret_locIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shl_ret_locValidationFailureMessages);
        }
        if (!_model.order_custIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_custValidationFailureMessages);
        }
        if (!_model.operatorIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_operatorValidationFailureMessages);
        }
        if (!_model.shls_shiftIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shls_shiftValidationFailureMessages);
        }
        if (!_model.order_cust_cmpy_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_cust_cmpy_codeValidationFailureMessages);
        }
        if (!_model.load_reverse_flagIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_load_reverse_flagValidationFailureMessages);
        }
        if (!_model.carrier_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_carrier_codeValidationFailureMessages);
        }
        if (!_model.drawer_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_drawer_nameValidationFailureMessages);
        }
        if (!_model.tnkr_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_codeValidationFailureMessages);
        }
        if (!_model.cmpy_schd_archiveIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_schd_archiveValidationFailureMessages);
        }
        if (!_model.shedule_profileIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shedule_profileValidationFailureMessages);
        }
        if (!_model.cmpy_schd_rev_repostIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_schd_rev_repostValidationFailureMessages);
        }
        if (!_model.shls_ld_endIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shls_ld_endValidationFailureMessages);
        }
        if (!_model.shls_priorityIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_shls_priorityValidationFailureMessages);
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
    public function get _model() : _GuiSchedulesEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _GuiSchedulesEntityMetadata) : void
    {
        var oldValue : _GuiSchedulesEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfShls_ld_start : Array = null;
    model_internal var _doValidationLastValOfShls_ld_start : Object;

    model_internal function _doValidationForShls_ld_start(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfShls_ld_start != null && model_internal::_doValidationLastValOfShls_ld_start == value)
           return model_internal::_doValidationCacheOfShls_ld_start ;

        _model.model_internal::_shls_ld_startIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShls_ld_startAvailable && _internal_shls_ld_start == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shls_ld_start is required"));
        }

        model_internal::_doValidationCacheOfShls_ld_start = validationFailures;
        model_internal::_doValidationLastValOfShls_ld_start = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSupplier_code : Array = null;
    model_internal var _doValidationLastValOfSupplier_code : String;

    model_internal function _doValidationForSupplier_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSupplier_code != null && model_internal::_doValidationLastValOfSupplier_code == value)
           return model_internal::_doValidationCacheOfSupplier_code ;

        _model.model_internal::_supplier_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSupplier_codeAvailable && _internal_supplier_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "supplier_code is required"));
        }

        model_internal::_doValidationCacheOfSupplier_code = validationFailures;
        model_internal::_doValidationLastValOfSupplier_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDrawer_code : Array = null;
    model_internal var _doValidationLastValOfDrawer_code : String;

    model_internal function _doValidationForDrawer_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDrawer_code != null && model_internal::_doValidationLastValOfDrawer_code == value)
           return model_internal::_doValidationCacheOfDrawer_code ;

        _model.model_internal::_drawer_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDrawer_codeAvailable && _internal_drawer_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "drawer_code is required"));
        }

        model_internal::_doValidationCacheOfDrawer_code = validationFailures;
        model_internal::_doValidationLastValOfDrawer_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfShls_supp_org : Array = null;
    model_internal var _doValidationLastValOfShls_supp_org : Object;

    model_internal function _doValidationForShls_supp_org(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfShls_supp_org != null && model_internal::_doValidationLastValOfShls_supp_org == value)
           return model_internal::_doValidationCacheOfShls_supp_org ;

        _model.model_internal::_shls_supp_orgIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShls_supp_orgAvailable && _internal_shls_supp_org == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shls_supp_org is required"));
        }

        model_internal::_doValidationCacheOfShls_supp_org = validationFailures;
        model_internal::_doValidationLastValOfShls_supp_org = value;

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
    
    model_internal var _doValidationCacheOfShls_ship_to_num : Array = null;
    model_internal var _doValidationLastValOfShls_ship_to_num : String;

    model_internal function _doValidationForShls_ship_to_num(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfShls_ship_to_num != null && model_internal::_doValidationLastValOfShls_ship_to_num == value)
           return model_internal::_doValidationCacheOfShls_ship_to_num ;

        _model.model_internal::_shls_ship_to_numIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShls_ship_to_numAvailable && _internal_shls_ship_to_num == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shls_ship_to_num is required"));
        }

        model_internal::_doValidationCacheOfShls_ship_to_num = validationFailures;
        model_internal::_doValidationLastValOfShls_ship_to_num = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfShls_ld_type : Array = null;
    model_internal var _doValidationLastValOfShls_ld_type : String;

    model_internal function _doValidationForShls_ld_type(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfShls_ld_type != null && model_internal::_doValidationLastValOfShls_ld_type == value)
           return model_internal::_doValidationCacheOfShls_ld_type ;

        _model.model_internal::_shls_ld_typeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShls_ld_typeAvailable && _internal_shls_ld_type == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shls_ld_type is required"));
        }

        model_internal::_doValidationCacheOfShls_ld_type = validationFailures;
        model_internal::_doValidationLastValOfShls_ld_type = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_no : Array = null;
    model_internal var _doValidationLastValOfOrder_no : Object;

    model_internal function _doValidationForOrder_no(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOrder_no != null && model_internal::_doValidationLastValOfOrder_no == value)
           return model_internal::_doValidationCacheOfOrder_no ;

        _model.model_internal::_order_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_noAvailable && _internal_order_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_no is required"));
        }

        model_internal::_doValidationCacheOfOrder_no = validationFailures;
        model_internal::_doValidationLastValOfOrder_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfShls_sold_to_num : Array = null;
    model_internal var _doValidationLastValOfShls_sold_to_num : String;

    model_internal function _doValidationForShls_sold_to_num(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfShls_sold_to_num != null && model_internal::_doValidationLastValOfShls_sold_to_num == value)
           return model_internal::_doValidationCacheOfShls_sold_to_num ;

        _model.model_internal::_shls_sold_to_numIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShls_sold_to_numAvailable && _internal_shls_sold_to_num == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shls_sold_to_num is required"));
        }

        model_internal::_doValidationCacheOfShls_sold_to_num = validationFailures;
        model_internal::_doValidationLastValOfShls_sold_to_num = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfShls_terminal : Array = null;
    model_internal var _doValidationLastValOfShls_terminal : String;

    model_internal function _doValidationForShls_terminal(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfShls_terminal != null && model_internal::_doValidationLastValOfShls_terminal == value)
           return model_internal::_doValidationCacheOfShls_terminal ;

        _model.model_internal::_shls_terminalIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShls_terminalAvailable && _internal_shls_terminal == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shls_terminal is required"));
        }

        model_internal::_doValidationCacheOfShls_terminal = validationFailures;
        model_internal::_doValidationLastValOfShls_terminal = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfShls_exp2 : Array = null;
    model_internal var _doValidationLastValOfShls_exp2 : String;

    model_internal function _doValidationForShls_exp2(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfShls_exp2 != null && model_internal::_doValidationLastValOfShls_exp2 == value)
           return model_internal::_doValidationCacheOfShls_exp2 ;

        _model.model_internal::_shls_exp2IsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShls_exp2Available && _internal_shls_exp2 == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shls_exp2 is required"));
        }

        model_internal::_doValidationCacheOfShls_exp2 = validationFailures;
        model_internal::_doValidationLastValOfShls_exp2 = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfShls_trip_no_org : Array = null;
    model_internal var _doValidationLastValOfShls_trip_no_org : Object;

    model_internal function _doValidationForShls_trip_no_org(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfShls_trip_no_org != null && model_internal::_doValidationLastValOfShls_trip_no_org == value)
           return model_internal::_doValidationCacheOfShls_trip_no_org ;

        _model.model_internal::_shls_trip_no_orgIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShls_trip_no_orgAvailable && _internal_shls_trip_no_org == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shls_trip_no_org is required"));
        }

        model_internal::_doValidationCacheOfShls_trip_no_org = validationFailures;
        model_internal::_doValidationLastValOfShls_trip_no_org = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfShls_trip_no : Array = null;
    model_internal var _doValidationLastValOfShls_trip_no : String;

    model_internal function _doValidationForShls_trip_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfShls_trip_no != null && model_internal::_doValidationLastValOfShls_trip_no == value)
           return model_internal::_doValidationCacheOfShls_trip_no ;

        _model.model_internal::_shls_trip_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShls_trip_noAvailable && _internal_shls_trip_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shls_trip_no is required"));
        }

        model_internal::_doValidationCacheOfShls_trip_no = validationFailures;
        model_internal::_doValidationLastValOfShls_trip_no = value;

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
    
    model_internal var _doValidationCacheOfCarrier : Array = null;
    model_internal var _doValidationLastValOfCarrier : String;

    model_internal function _doValidationForCarrier(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCarrier != null && model_internal::_doValidationLastValOfCarrier == value)
           return model_internal::_doValidationCacheOfCarrier ;

        _model.model_internal::_carrierIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCarrierAvailable && _internal_carrier == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "carrier is required"));
        }

        model_internal::_doValidationCacheOfCarrier = validationFailures;
        model_internal::_doValidationLastValOfCarrier = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDriver : Array = null;
    model_internal var _doValidationLastValOfDriver : Object;

    model_internal function _doValidationForDriver(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfDriver != null && model_internal::_doValidationLastValOfDriver == value)
           return model_internal::_doValidationCacheOfDriver ;

        _model.model_internal::_driverIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDriverAvailable && _internal_driver == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "driver is required"));
        }

        model_internal::_doValidationCacheOfDriver = validationFailures;
        model_internal::_doValidationLastValOfDriver = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfLd_type : Array = null;
    model_internal var _doValidationLastValOfLd_type : String;

    model_internal function _doValidationForLd_type(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfLd_type != null && model_internal::_doValidationLastValOfLd_type == value)
           return model_internal::_doValidationCacheOfLd_type ;

        _model.model_internal::_ld_typeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isLd_typeAvailable && _internal_ld_type == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "ld_type is required"));
        }

        model_internal::_doValidationCacheOfLd_type = validationFailures;
        model_internal::_doValidationLastValOfLd_type = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSupplier : Array = null;
    model_internal var _doValidationLastValOfSupplier : String;

    model_internal function _doValidationForSupplier(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSupplier != null && model_internal::_doValidationLastValOfSupplier == value)
           return model_internal::_doValidationCacheOfSupplier ;

        _model.model_internal::_supplierIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSupplierAvailable && _internal_supplier == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "supplier is required"));
        }

        model_internal::_doValidationCacheOfSupplier = validationFailures;
        model_internal::_doValidationLastValOfSupplier = value;

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
    
    model_internal var _doValidationCacheOfShls_caldate : Array = null;
    model_internal var _doValidationLastValOfShls_caldate : String;

    model_internal function _doValidationForShls_caldate(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfShls_caldate != null && model_internal::_doValidationLastValOfShls_caldate == value)
           return model_internal::_doValidationCacheOfShls_caldate ;

        _model.model_internal::_shls_caldateIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShls_caldateAvailable && _internal_shls_caldate == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shls_caldate is required"));
        }

        model_internal::_doValidationCacheOfShls_caldate = validationFailures;
        model_internal::_doValidationLastValOfShls_caldate = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_name : Array = null;
    model_internal var _doValidationLastValOfTnkr_name : String;

    model_internal function _doValidationForTnkr_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

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
    
    model_internal var _doValidationCacheOfShls_status : Array = null;
    model_internal var _doValidationLastValOfShls_status : String;

    model_internal function _doValidationForShls_status(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfShls_status != null && model_internal::_doValidationLastValOfShls_status == value)
           return model_internal::_doValidationCacheOfShls_status ;

        _model.model_internal::_shls_statusIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShls_statusAvailable && _internal_shls_status == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shls_status is required"));
        }

        model_internal::_doValidationCacheOfShls_status = validationFailures;
        model_internal::_doValidationLastValOfShls_status = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfStatus : Array = null;
    model_internal var _doValidationLastValOfStatus : String;

    model_internal function _doValidationForStatus(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfStatus != null && model_internal::_doValidationLastValOfStatus == value)
           return model_internal::_doValidationCacheOfStatus ;

        _model.model_internal::_statusIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isStatusAvailable && _internal_status == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "status is required"));
        }

        model_internal::_doValidationCacheOfStatus = validationFailures;
        model_internal::_doValidationLastValOfStatus = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfLast_chg_time : Array = null;
    model_internal var _doValidationLastValOfLast_chg_time : String;

    model_internal function _doValidationForLast_chg_time(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfLast_chg_time != null && model_internal::_doValidationLastValOfLast_chg_time == value)
           return model_internal::_doValidationCacheOfLast_chg_time ;

        _model.model_internal::_last_chg_timeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isLast_chg_timeAvailable && _internal_last_chg_time == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "last_chg_time is required"));
        }

        model_internal::_doValidationCacheOfLast_chg_time = validationFailures;
        model_internal::_doValidationLastValOfLast_chg_time = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_cust_cmpy_name : Array = null;
    model_internal var _doValidationLastValOfOrder_cust_cmpy_name : Object;

    model_internal function _doValidationForOrder_cust_cmpy_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOrder_cust_cmpy_name != null && model_internal::_doValidationLastValOfOrder_cust_cmpy_name == value)
           return model_internal::_doValidationCacheOfOrder_cust_cmpy_name ;

        _model.model_internal::_order_cust_cmpy_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_cust_cmpy_nameAvailable && _internal_order_cust_cmpy_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_cust_cmpy_name is required"));
        }

        model_internal::_doValidationCacheOfOrder_cust_cmpy_name = validationFailures;
        model_internal::_doValidationLastValOfOrder_cust_cmpy_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfShl_ret_loc : Array = null;
    model_internal var _doValidationLastValOfShl_ret_loc : String;

    model_internal function _doValidationForShl_ret_loc(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfShl_ret_loc != null && model_internal::_doValidationLastValOfShl_ret_loc == value)
           return model_internal::_doValidationCacheOfShl_ret_loc ;

        _model.model_internal::_shl_ret_locIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShl_ret_locAvailable && _internal_shl_ret_loc == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shl_ret_loc is required"));
        }

        model_internal::_doValidationCacheOfShl_ret_loc = validationFailures;
        model_internal::_doValidationLastValOfShl_ret_loc = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_cust : Array = null;
    model_internal var _doValidationLastValOfOrder_cust : Object;

    model_internal function _doValidationForOrder_cust(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOrder_cust != null && model_internal::_doValidationLastValOfOrder_cust == value)
           return model_internal::_doValidationCacheOfOrder_cust ;

        _model.model_internal::_order_custIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_custAvailable && _internal_order_cust == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_cust is required"));
        }

        model_internal::_doValidationCacheOfOrder_cust = validationFailures;
        model_internal::_doValidationLastValOfOrder_cust = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOperator : Array = null;
    model_internal var _doValidationLastValOfOperator : String;

    model_internal function _doValidationForOperator(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOperator != null && model_internal::_doValidationLastValOfOperator == value)
           return model_internal::_doValidationCacheOfOperator ;

        _model.model_internal::_operatorIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOperatorAvailable && _internal_operator == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "operator is required"));
        }

        model_internal::_doValidationCacheOfOperator = validationFailures;
        model_internal::_doValidationLastValOfOperator = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfShls_shift : Array = null;
    model_internal var _doValidationLastValOfShls_shift : String;

    model_internal function _doValidationForShls_shift(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfShls_shift != null && model_internal::_doValidationLastValOfShls_shift == value)
           return model_internal::_doValidationCacheOfShls_shift ;

        _model.model_internal::_shls_shiftIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShls_shiftAvailable && _internal_shls_shift == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shls_shift is required"));
        }

        model_internal::_doValidationCacheOfShls_shift = validationFailures;
        model_internal::_doValidationLastValOfShls_shift = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_cust_cmpy_code : Array = null;
    model_internal var _doValidationLastValOfOrder_cust_cmpy_code : Object;

    model_internal function _doValidationForOrder_cust_cmpy_code(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOrder_cust_cmpy_code != null && model_internal::_doValidationLastValOfOrder_cust_cmpy_code == value)
           return model_internal::_doValidationCacheOfOrder_cust_cmpy_code ;

        _model.model_internal::_order_cust_cmpy_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_cust_cmpy_codeAvailable && _internal_order_cust_cmpy_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_cust_cmpy_code is required"));
        }

        model_internal::_doValidationCacheOfOrder_cust_cmpy_code = validationFailures;
        model_internal::_doValidationLastValOfOrder_cust_cmpy_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfLoad_reverse_flag : Array = null;
    model_internal var _doValidationLastValOfLoad_reverse_flag : Object;

    model_internal function _doValidationForLoad_reverse_flag(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfLoad_reverse_flag != null && model_internal::_doValidationLastValOfLoad_reverse_flag == value)
           return model_internal::_doValidationCacheOfLoad_reverse_flag ;

        _model.model_internal::_load_reverse_flagIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isLoad_reverse_flagAvailable && _internal_load_reverse_flag == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "load_reverse_flag is required"));
        }

        model_internal::_doValidationCacheOfLoad_reverse_flag = validationFailures;
        model_internal::_doValidationLastValOfLoad_reverse_flag = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCarrier_code : Array = null;
    model_internal var _doValidationLastValOfCarrier_code : String;

    model_internal function _doValidationForCarrier_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCarrier_code != null && model_internal::_doValidationLastValOfCarrier_code == value)
           return model_internal::_doValidationCacheOfCarrier_code ;

        _model.model_internal::_carrier_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCarrier_codeAvailable && _internal_carrier_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "carrier_code is required"));
        }

        model_internal::_doValidationCacheOfCarrier_code = validationFailures;
        model_internal::_doValidationLastValOfCarrier_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDrawer_name : Array = null;
    model_internal var _doValidationLastValOfDrawer_name : String;

    model_internal function _doValidationForDrawer_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDrawer_name != null && model_internal::_doValidationLastValOfDrawer_name == value)
           return model_internal::_doValidationCacheOfDrawer_name ;

        _model.model_internal::_drawer_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDrawer_nameAvailable && _internal_drawer_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "drawer_name is required"));
        }

        model_internal::_doValidationCacheOfDrawer_name = validationFailures;
        model_internal::_doValidationLastValOfDrawer_name = value;

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
    
    model_internal var _doValidationCacheOfCmpy_schd_archive : Array = null;
    model_internal var _doValidationLastValOfCmpy_schd_archive : String;

    model_internal function _doValidationForCmpy_schd_archive(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_schd_archive != null && model_internal::_doValidationLastValOfCmpy_schd_archive == value)
           return model_internal::_doValidationCacheOfCmpy_schd_archive ;

        _model.model_internal::_cmpy_schd_archiveIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_schd_archiveAvailable && _internal_cmpy_schd_archive == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_schd_archive is required"));
        }

        model_internal::_doValidationCacheOfCmpy_schd_archive = validationFailures;
        model_internal::_doValidationLastValOfCmpy_schd_archive = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfShedule_profile : Array = null;
    model_internal var _doValidationLastValOfShedule_profile : String;

    model_internal function _doValidationForShedule_profile(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfShedule_profile != null && model_internal::_doValidationLastValOfShedule_profile == value)
           return model_internal::_doValidationCacheOfShedule_profile ;

        _model.model_internal::_shedule_profileIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShedule_profileAvailable && _internal_shedule_profile == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shedule_profile is required"));
        }

        model_internal::_doValidationCacheOfShedule_profile = validationFailures;
        model_internal::_doValidationLastValOfShedule_profile = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_schd_rev_repost : Array = null;
    model_internal var _doValidationLastValOfCmpy_schd_rev_repost : String;

    model_internal function _doValidationForCmpy_schd_rev_repost(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_schd_rev_repost != null && model_internal::_doValidationLastValOfCmpy_schd_rev_repost == value)
           return model_internal::_doValidationCacheOfCmpy_schd_rev_repost ;

        _model.model_internal::_cmpy_schd_rev_repostIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_schd_rev_repostAvailable && _internal_cmpy_schd_rev_repost == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_schd_rev_repost is required"));
        }

        model_internal::_doValidationCacheOfCmpy_schd_rev_repost = validationFailures;
        model_internal::_doValidationLastValOfCmpy_schd_rev_repost = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfShls_ld_end : Array = null;
    model_internal var _doValidationLastValOfShls_ld_end : Object;

    model_internal function _doValidationForShls_ld_end(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfShls_ld_end != null && model_internal::_doValidationLastValOfShls_ld_end == value)
           return model_internal::_doValidationCacheOfShls_ld_end ;

        _model.model_internal::_shls_ld_endIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShls_ld_endAvailable && _internal_shls_ld_end == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shls_ld_end is required"));
        }

        model_internal::_doValidationCacheOfShls_ld_end = validationFailures;
        model_internal::_doValidationLastValOfShls_ld_end = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfShls_priority : Array = null;
    model_internal var _doValidationLastValOfShls_priority : Object;

    model_internal function _doValidationForShls_priority(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfShls_priority != null && model_internal::_doValidationLastValOfShls_priority == value)
           return model_internal::_doValidationCacheOfShls_priority ;

        _model.model_internal::_shls_priorityIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isShls_priorityAvailable && _internal_shls_priority == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "shls_priority is required"));
        }

        model_internal::_doValidationCacheOfShls_priority = validationFailures;
        model_internal::_doValidationLastValOfShls_priority = value;

        return validationFailures;
    }
    

}

}
