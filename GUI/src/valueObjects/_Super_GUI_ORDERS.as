/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - GUI_ORDERS.as.
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
public class _Super_GUI_ORDERS extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("GUI_ORDERS") == null)
            {
                flash.net.registerClassAlias("GUI_ORDERS", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("GUI_ORDERS", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _GUI_ORDERSEntityMetadata;
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
    private var _internal_order_ttyp_name : String;
    private var _internal_order_app_no : String;
    private var _internal_rn : String;
    private var _internal_order_dtrm_code : String;
    private var _internal_order_ship_to_num : Object;
    private var _internal_order_psnl_name : String;
    private var _internal_order_sold_to_num : Object;
    private var _internal_order_strm_code : String;
    private var _internal_order_carr_code : String;
    private var _internal_order_styp_id : String;
    private var _internal_order_dlv_time : String;
    private var _internal_order_drwr_code : String;
    private var _internal_order_sys_no : String;
    private var _internal_order_exp_time : String;
    private var _internal_order_items : Object;
    private var _internal_order_last_change : String;
    private var _internal_order_src_name : String;
    private var _internal_order_ref_code : Object;
    private var _internal_order_app_time : String;
    private var _internal_order_total : String;
    private var _internal_order_cust_code : String;
    private var _internal_order_approved : String;
    private var _internal_order_cust_no : String;
    private var _internal_order_carr_name : String;
    private var _internal_order_stat_name : String;
    private var _internal_order_dtrm_name : String;
    private var _internal_order_styp_name : String;
    private var _internal_order_ttyp_id : String;
    private var _internal_order_supp_name : String;
    private var _internal_order_supp_code : String;
    private var _internal_order_pay_note : Object;
    private var _internal_order_price_printed : String;
    private var _internal_order_dloc_name : String;
    private var _internal_order_src_id : String;
    private var _internal_order_limit : String;
    private var _internal_order_strm_name : String;
    private var _internal_order_stat_id : String;
    private var _internal_order_ord_time : String;
    private var _internal_order_trsf_type : Object;
    private var _internal_order_cust_name : String;
    private var _internal_order_dloc_code : String;
    private var _internal_order_drwr_name : String;
    private var _internal_order_schedules : Object;
    private var _internal_order_instructions : String;
    private var _internal_order_cust_acnt : String;
    private var _internal_order_inv_no : Object;
    private var _internal_order_expired : Object;
    private var _internal_order_psnl_code : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_GUI_ORDERS()
    {
        _model = new _GUI_ORDERSEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_ttyp_name", model_internal::setterListenerOrder_ttyp_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_app_no", model_internal::setterListenerOrder_app_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_dtrm_code", model_internal::setterListenerOrder_dtrm_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_ship_to_num", model_internal::setterListenerOrder_ship_to_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_psnl_name", model_internal::setterListenerOrder_psnl_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_sold_to_num", model_internal::setterListenerOrder_sold_to_num));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_strm_code", model_internal::setterListenerOrder_strm_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_carr_code", model_internal::setterListenerOrder_carr_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_styp_id", model_internal::setterListenerOrder_styp_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_dlv_time", model_internal::setterListenerOrder_dlv_time));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_drwr_code", model_internal::setterListenerOrder_drwr_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_sys_no", model_internal::setterListenerOrder_sys_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_exp_time", model_internal::setterListenerOrder_exp_time));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_items", model_internal::setterListenerOrder_items));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_last_change", model_internal::setterListenerOrder_last_change));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_src_name", model_internal::setterListenerOrder_src_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_ref_code", model_internal::setterListenerOrder_ref_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_app_time", model_internal::setterListenerOrder_app_time));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_total", model_internal::setterListenerOrder_total));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_cust_code", model_internal::setterListenerOrder_cust_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_approved", model_internal::setterListenerOrder_approved));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_cust_no", model_internal::setterListenerOrder_cust_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_carr_name", model_internal::setterListenerOrder_carr_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_stat_name", model_internal::setterListenerOrder_stat_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_dtrm_name", model_internal::setterListenerOrder_dtrm_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_styp_name", model_internal::setterListenerOrder_styp_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_ttyp_id", model_internal::setterListenerOrder_ttyp_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_supp_name", model_internal::setterListenerOrder_supp_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_supp_code", model_internal::setterListenerOrder_supp_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_pay_note", model_internal::setterListenerOrder_pay_note));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_price_printed", model_internal::setterListenerOrder_price_printed));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_dloc_name", model_internal::setterListenerOrder_dloc_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_src_id", model_internal::setterListenerOrder_src_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_limit", model_internal::setterListenerOrder_limit));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_strm_name", model_internal::setterListenerOrder_strm_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_stat_id", model_internal::setterListenerOrder_stat_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_ord_time", model_internal::setterListenerOrder_ord_time));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_trsf_type", model_internal::setterListenerOrder_trsf_type));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_cust_name", model_internal::setterListenerOrder_cust_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_dloc_code", model_internal::setterListenerOrder_dloc_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_drwr_name", model_internal::setterListenerOrder_drwr_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_schedules", model_internal::setterListenerOrder_schedules));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_instructions", model_internal::setterListenerOrder_instructions));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_cust_acnt", model_internal::setterListenerOrder_cust_acnt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_inv_no", model_internal::setterListenerOrder_inv_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_expired", model_internal::setterListenerOrder_expired));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_psnl_code", model_internal::setterListenerOrder_psnl_code));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get order_ttyp_name() : String
    {
        return _internal_order_ttyp_name;
    }

    [Bindable(event="propertyChange")]
    public function get order_app_no() : String
    {
        return _internal_order_app_no;
    }

    [Bindable(event="propertyChange")]
    public function get rn() : String
    {
        return _internal_rn;
    }

    [Bindable(event="propertyChange")]
    public function get order_dtrm_code() : String
    {
        return _internal_order_dtrm_code;
    }

    [Bindable(event="propertyChange")]
    public function get order_ship_to_num() : Object
    {
        return _internal_order_ship_to_num;
    }

    [Bindable(event="propertyChange")]
    public function get order_psnl_name() : String
    {
        return _internal_order_psnl_name;
    }

    [Bindable(event="propertyChange")]
    public function get order_sold_to_num() : Object
    {
        return _internal_order_sold_to_num;
    }

    [Bindable(event="propertyChange")]
    public function get order_strm_code() : String
    {
        return _internal_order_strm_code;
    }

    [Bindable(event="propertyChange")]
    public function get order_carr_code() : String
    {
        return _internal_order_carr_code;
    }

    [Bindable(event="propertyChange")]
    public function get order_styp_id() : String
    {
        return _internal_order_styp_id;
    }

    [Bindable(event="propertyChange")]
    public function get order_dlv_time() : String
    {
        return _internal_order_dlv_time;
    }

    [Bindable(event="propertyChange")]
    public function get order_drwr_code() : String
    {
        return _internal_order_drwr_code;
    }

    [Bindable(event="propertyChange")]
    public function get order_sys_no() : String
    {
        return _internal_order_sys_no;
    }

    [Bindable(event="propertyChange")]
    public function get order_exp_time() : String
    {
        return _internal_order_exp_time;
    }

    [Bindable(event="propertyChange")]
    public function get order_items() : Object
    {
        return _internal_order_items;
    }

    [Bindable(event="propertyChange")]
    public function get order_last_change() : String
    {
        return _internal_order_last_change;
    }

    [Bindable(event="propertyChange")]
    public function get order_src_name() : String
    {
        return _internal_order_src_name;
    }

    [Bindable(event="propertyChange")]
    public function get order_ref_code() : Object
    {
        return _internal_order_ref_code;
    }

    [Bindable(event="propertyChange")]
    public function get order_app_time() : String
    {
        return _internal_order_app_time;
    }

    [Bindable(event="propertyChange")]
    public function get order_total() : String
    {
        return _internal_order_total;
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_code() : String
    {
        return _internal_order_cust_code;
    }

    [Bindable(event="propertyChange")]
    public function get order_approved() : String
    {
        return _internal_order_approved;
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_no() : String
    {
        return _internal_order_cust_no;
    }

    [Bindable(event="propertyChange")]
    public function get order_carr_name() : String
    {
        return _internal_order_carr_name;
    }

    [Bindable(event="propertyChange")]
    public function get order_stat_name() : String
    {
        return _internal_order_stat_name;
    }

    [Bindable(event="propertyChange")]
    public function get order_dtrm_name() : String
    {
        return _internal_order_dtrm_name;
    }

    [Bindable(event="propertyChange")]
    public function get order_styp_name() : String
    {
        return _internal_order_styp_name;
    }

    [Bindable(event="propertyChange")]
    public function get order_ttyp_id() : String
    {
        return _internal_order_ttyp_id;
    }

    [Bindable(event="propertyChange")]
    public function get order_supp_name() : String
    {
        return _internal_order_supp_name;
    }

    [Bindable(event="propertyChange")]
    public function get order_supp_code() : String
    {
        return _internal_order_supp_code;
    }

    [Bindable(event="propertyChange")]
    public function get order_pay_note() : Object
    {
        return _internal_order_pay_note;
    }

    [Bindable(event="propertyChange")]
    public function get order_price_printed() : String
    {
        return _internal_order_price_printed;
    }

    [Bindable(event="propertyChange")]
    public function get order_dloc_name() : String
    {
        return _internal_order_dloc_name;
    }

    [Bindable(event="propertyChange")]
    public function get order_src_id() : String
    {
        return _internal_order_src_id;
    }

    [Bindable(event="propertyChange")]
    public function get order_limit() : String
    {
        return _internal_order_limit;
    }

    [Bindable(event="propertyChange")]
    public function get order_strm_name() : String
    {
        return _internal_order_strm_name;
    }

    [Bindable(event="propertyChange")]
    public function get order_stat_id() : String
    {
        return _internal_order_stat_id;
    }

    [Bindable(event="propertyChange")]
    public function get order_ord_time() : String
    {
        return _internal_order_ord_time;
    }

    [Bindable(event="propertyChange")]
    public function get order_trsf_type() : Object
    {
        return _internal_order_trsf_type;
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_name() : String
    {
        return _internal_order_cust_name;
    }

    [Bindable(event="propertyChange")]
    public function get order_dloc_code() : String
    {
        return _internal_order_dloc_code;
    }

    [Bindable(event="propertyChange")]
    public function get order_drwr_name() : String
    {
        return _internal_order_drwr_name;
    }

    [Bindable(event="propertyChange")]
    public function get order_schedules() : Object
    {
        return _internal_order_schedules;
    }

    [Bindable(event="propertyChange")]
    public function get order_instructions() : String
    {
        return _internal_order_instructions;
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_acnt() : String
    {
        return _internal_order_cust_acnt;
    }

    [Bindable(event="propertyChange")]
    public function get order_inv_no() : Object
    {
        return _internal_order_inv_no;
    }

    [Bindable(event="propertyChange")]
    public function get order_expired() : Object
    {
        return _internal_order_expired;
    }

    [Bindable(event="propertyChange")]
    public function get order_psnl_code() : String
    {
        return _internal_order_psnl_code;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set order_ttyp_name(value:String) : void
    {
        var oldValue:String = _internal_order_ttyp_name;
        if (oldValue !== value)
        {
            _internal_order_ttyp_name = value;
        }
    }

    public function set order_app_no(value:String) : void
    {
        var oldValue:String = _internal_order_app_no;
        if (oldValue !== value)
        {
            _internal_order_app_no = value;
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

    public function set order_dtrm_code(value:String) : void
    {
        var oldValue:String = _internal_order_dtrm_code;
        if (oldValue !== value)
        {
            _internal_order_dtrm_code = value;
        }
    }

    public function set order_ship_to_num(value:Object) : void
    {
        var oldValue:Object = _internal_order_ship_to_num;
        if (oldValue !== value)
        {
            _internal_order_ship_to_num = value;
        }
    }

    public function set order_psnl_name(value:String) : void
    {
        var oldValue:String = _internal_order_psnl_name;
        if (oldValue !== value)
        {
            _internal_order_psnl_name = value;
        }
    }

    public function set order_sold_to_num(value:Object) : void
    {
        var oldValue:Object = _internal_order_sold_to_num;
        if (oldValue !== value)
        {
            _internal_order_sold_to_num = value;
        }
    }

    public function set order_strm_code(value:String) : void
    {
        var oldValue:String = _internal_order_strm_code;
        if (oldValue !== value)
        {
            _internal_order_strm_code = value;
        }
    }

    public function set order_carr_code(value:String) : void
    {
        var oldValue:String = _internal_order_carr_code;
        if (oldValue !== value)
        {
            _internal_order_carr_code = value;
        }
    }

    public function set order_styp_id(value:String) : void
    {
        var oldValue:String = _internal_order_styp_id;
        if (oldValue !== value)
        {
            _internal_order_styp_id = value;
        }
    }

    public function set order_dlv_time(value:String) : void
    {
        var oldValue:String = _internal_order_dlv_time;
        if (oldValue !== value)
        {
            _internal_order_dlv_time = value;
        }
    }

    public function set order_drwr_code(value:String) : void
    {
        var oldValue:String = _internal_order_drwr_code;
        if (oldValue !== value)
        {
            _internal_order_drwr_code = value;
        }
    }

    public function set order_sys_no(value:String) : void
    {
        var oldValue:String = _internal_order_sys_no;
        if (oldValue !== value)
        {
            _internal_order_sys_no = value;
        }
    }

    public function set order_exp_time(value:String) : void
    {
        var oldValue:String = _internal_order_exp_time;
        if (oldValue !== value)
        {
            _internal_order_exp_time = value;
        }
    }

    public function set order_items(value:Object) : void
    {
        var oldValue:Object = _internal_order_items;
        if (oldValue !== value)
        {
            _internal_order_items = value;
        }
    }

    public function set order_last_change(value:String) : void
    {
        var oldValue:String = _internal_order_last_change;
        if (oldValue !== value)
        {
            _internal_order_last_change = value;
        }
    }

    public function set order_src_name(value:String) : void
    {
        var oldValue:String = _internal_order_src_name;
        if (oldValue !== value)
        {
            _internal_order_src_name = value;
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

    public function set order_app_time(value:String) : void
    {
        var oldValue:String = _internal_order_app_time;
        if (oldValue !== value)
        {
            _internal_order_app_time = value;
        }
    }

    public function set order_total(value:String) : void
    {
        var oldValue:String = _internal_order_total;
        if (oldValue !== value)
        {
            _internal_order_total = value;
        }
    }

    public function set order_cust_code(value:String) : void
    {
        var oldValue:String = _internal_order_cust_code;
        if (oldValue !== value)
        {
            _internal_order_cust_code = value;
        }
    }

    public function set order_approved(value:String) : void
    {
        var oldValue:String = _internal_order_approved;
        if (oldValue !== value)
        {
            _internal_order_approved = value;
        }
    }

    public function set order_cust_no(value:String) : void
    {
        var oldValue:String = _internal_order_cust_no;
        if (oldValue !== value)
        {
            _internal_order_cust_no = value;
        }
    }

    public function set order_carr_name(value:String) : void
    {
        var oldValue:String = _internal_order_carr_name;
        if (oldValue !== value)
        {
            _internal_order_carr_name = value;
        }
    }

    public function set order_stat_name(value:String) : void
    {
        var oldValue:String = _internal_order_stat_name;
        if (oldValue !== value)
        {
            _internal_order_stat_name = value;
        }
    }

    public function set order_dtrm_name(value:String) : void
    {
        var oldValue:String = _internal_order_dtrm_name;
        if (oldValue !== value)
        {
            _internal_order_dtrm_name = value;
        }
    }

    public function set order_styp_name(value:String) : void
    {
        var oldValue:String = _internal_order_styp_name;
        if (oldValue !== value)
        {
            _internal_order_styp_name = value;
        }
    }

    public function set order_ttyp_id(value:String) : void
    {
        var oldValue:String = _internal_order_ttyp_id;
        if (oldValue !== value)
        {
            _internal_order_ttyp_id = value;
        }
    }

    public function set order_supp_name(value:String) : void
    {
        var oldValue:String = _internal_order_supp_name;
        if (oldValue !== value)
        {
            _internal_order_supp_name = value;
        }
    }

    public function set order_supp_code(value:String) : void
    {
        var oldValue:String = _internal_order_supp_code;
        if (oldValue !== value)
        {
            _internal_order_supp_code = value;
        }
    }

    public function set order_pay_note(value:Object) : void
    {
        var oldValue:Object = _internal_order_pay_note;
        if (oldValue !== value)
        {
            _internal_order_pay_note = value;
        }
    }

    public function set order_price_printed(value:String) : void
    {
        var oldValue:String = _internal_order_price_printed;
        if (oldValue !== value)
        {
            _internal_order_price_printed = value;
        }
    }

    public function set order_dloc_name(value:String) : void
    {
        var oldValue:String = _internal_order_dloc_name;
        if (oldValue !== value)
        {
            _internal_order_dloc_name = value;
        }
    }

    public function set order_src_id(value:String) : void
    {
        var oldValue:String = _internal_order_src_id;
        if (oldValue !== value)
        {
            _internal_order_src_id = value;
        }
    }

    public function set order_limit(value:String) : void
    {
        var oldValue:String = _internal_order_limit;
        if (oldValue !== value)
        {
            _internal_order_limit = value;
        }
    }

    public function set order_strm_name(value:String) : void
    {
        var oldValue:String = _internal_order_strm_name;
        if (oldValue !== value)
        {
            _internal_order_strm_name = value;
        }
    }

    public function set order_stat_id(value:String) : void
    {
        var oldValue:String = _internal_order_stat_id;
        if (oldValue !== value)
        {
            _internal_order_stat_id = value;
        }
    }

    public function set order_ord_time(value:String) : void
    {
        var oldValue:String = _internal_order_ord_time;
        if (oldValue !== value)
        {
            _internal_order_ord_time = value;
        }
    }

    public function set order_trsf_type(value:Object) : void
    {
        var oldValue:Object = _internal_order_trsf_type;
        if (oldValue !== value)
        {
            _internal_order_trsf_type = value;
        }
    }

    public function set order_cust_name(value:String) : void
    {
        var oldValue:String = _internal_order_cust_name;
        if (oldValue !== value)
        {
            _internal_order_cust_name = value;
        }
    }

    public function set order_dloc_code(value:String) : void
    {
        var oldValue:String = _internal_order_dloc_code;
        if (oldValue !== value)
        {
            _internal_order_dloc_code = value;
        }
    }

    public function set order_drwr_name(value:String) : void
    {
        var oldValue:String = _internal_order_drwr_name;
        if (oldValue !== value)
        {
            _internal_order_drwr_name = value;
        }
    }

    public function set order_schedules(value:Object) : void
    {
        var oldValue:Object = _internal_order_schedules;
        if (oldValue !== value)
        {
            _internal_order_schedules = value;
        }
    }

    public function set order_instructions(value:String) : void
    {
        var oldValue:String = _internal_order_instructions;
        if (oldValue !== value)
        {
            _internal_order_instructions = value;
        }
    }

    public function set order_cust_acnt(value:String) : void
    {
        var oldValue:String = _internal_order_cust_acnt;
        if (oldValue !== value)
        {
            _internal_order_cust_acnt = value;
        }
    }

    public function set order_inv_no(value:Object) : void
    {
        var oldValue:Object = _internal_order_inv_no;
        if (oldValue !== value)
        {
            _internal_order_inv_no = value;
        }
    }

    public function set order_expired(value:Object) : void
    {
        var oldValue:Object = _internal_order_expired;
        if (oldValue !== value)
        {
            _internal_order_expired = value;
        }
    }

    public function set order_psnl_code(value:String) : void
    {
        var oldValue:String = _internal_order_psnl_code;
        if (oldValue !== value)
        {
            _internal_order_psnl_code = value;
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

    model_internal function setterListenerOrder_ttyp_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_ttyp_name();
    }

    model_internal function setterListenerOrder_app_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_app_no();
    }

    model_internal function setterListenerOrder_dtrm_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_dtrm_code();
    }

    model_internal function setterListenerOrder_ship_to_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_ship_to_num();
    }

    model_internal function setterListenerOrder_psnl_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_psnl_name();
    }

    model_internal function setterListenerOrder_sold_to_num(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_sold_to_num();
    }

    model_internal function setterListenerOrder_strm_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_strm_code();
    }

    model_internal function setterListenerOrder_carr_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_carr_code();
    }

    model_internal function setterListenerOrder_styp_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_styp_id();
    }

    model_internal function setterListenerOrder_dlv_time(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_dlv_time();
    }

    model_internal function setterListenerOrder_drwr_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_drwr_code();
    }

    model_internal function setterListenerOrder_sys_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_sys_no();
    }

    model_internal function setterListenerOrder_exp_time(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_exp_time();
    }

    model_internal function setterListenerOrder_items(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_items();
    }

    model_internal function setterListenerOrder_last_change(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_last_change();
    }

    model_internal function setterListenerOrder_src_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_src_name();
    }

    model_internal function setterListenerOrder_ref_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_ref_code();
    }

    model_internal function setterListenerOrder_app_time(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_app_time();
    }

    model_internal function setterListenerOrder_total(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_total();
    }

    model_internal function setterListenerOrder_cust_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_cust_code();
    }

    model_internal function setterListenerOrder_approved(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_approved();
    }

    model_internal function setterListenerOrder_cust_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_cust_no();
    }

    model_internal function setterListenerOrder_carr_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_carr_name();
    }

    model_internal function setterListenerOrder_stat_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_stat_name();
    }

    model_internal function setterListenerOrder_dtrm_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_dtrm_name();
    }

    model_internal function setterListenerOrder_styp_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_styp_name();
    }

    model_internal function setterListenerOrder_ttyp_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_ttyp_id();
    }

    model_internal function setterListenerOrder_supp_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_supp_name();
    }

    model_internal function setterListenerOrder_supp_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_supp_code();
    }

    model_internal function setterListenerOrder_pay_note(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_pay_note();
    }

    model_internal function setterListenerOrder_price_printed(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_price_printed();
    }

    model_internal function setterListenerOrder_dloc_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_dloc_name();
    }

    model_internal function setterListenerOrder_src_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_src_id();
    }

    model_internal function setterListenerOrder_limit(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_limit();
    }

    model_internal function setterListenerOrder_strm_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_strm_name();
    }

    model_internal function setterListenerOrder_stat_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_stat_id();
    }

    model_internal function setterListenerOrder_ord_time(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_ord_time();
    }

    model_internal function setterListenerOrder_trsf_type(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_trsf_type();
    }

    model_internal function setterListenerOrder_cust_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_cust_name();
    }

    model_internal function setterListenerOrder_dloc_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_dloc_code();
    }

    model_internal function setterListenerOrder_drwr_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_drwr_name();
    }

    model_internal function setterListenerOrder_schedules(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_schedules();
    }

    model_internal function setterListenerOrder_instructions(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_instructions();
    }

    model_internal function setterListenerOrder_cust_acnt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_cust_acnt();
    }

    model_internal function setterListenerOrder_inv_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_inv_no();
    }

    model_internal function setterListenerOrder_expired(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_expired();
    }

    model_internal function setterListenerOrder_psnl_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_psnl_code();
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
        if (!_model.order_ttyp_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_ttyp_nameValidationFailureMessages);
        }
        if (!_model.order_app_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_app_noValidationFailureMessages);
        }
        if (!_model.order_dtrm_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_dtrm_codeValidationFailureMessages);
        }
        if (!_model.order_ship_to_numIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_ship_to_numValidationFailureMessages);
        }
        if (!_model.order_psnl_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_psnl_nameValidationFailureMessages);
        }
        if (!_model.order_sold_to_numIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_sold_to_numValidationFailureMessages);
        }
        if (!_model.order_strm_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_strm_codeValidationFailureMessages);
        }
        if (!_model.order_carr_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_carr_codeValidationFailureMessages);
        }
        if (!_model.order_styp_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_styp_idValidationFailureMessages);
        }
        if (!_model.order_dlv_timeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_dlv_timeValidationFailureMessages);
        }
        if (!_model.order_drwr_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_drwr_codeValidationFailureMessages);
        }
        if (!_model.order_sys_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_sys_noValidationFailureMessages);
        }
        if (!_model.order_exp_timeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_exp_timeValidationFailureMessages);
        }
        if (!_model.order_itemsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_itemsValidationFailureMessages);
        }
        if (!_model.order_last_changeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_last_changeValidationFailureMessages);
        }
        if (!_model.order_src_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_src_nameValidationFailureMessages);
        }
        if (!_model.order_ref_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_ref_codeValidationFailureMessages);
        }
        if (!_model.order_app_timeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_app_timeValidationFailureMessages);
        }
        if (!_model.order_totalIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_totalValidationFailureMessages);
        }
        if (!_model.order_cust_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_cust_codeValidationFailureMessages);
        }
        if (!_model.order_approvedIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_approvedValidationFailureMessages);
        }
        if (!_model.order_cust_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_cust_noValidationFailureMessages);
        }
        if (!_model.order_carr_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_carr_nameValidationFailureMessages);
        }
        if (!_model.order_stat_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_stat_nameValidationFailureMessages);
        }
        if (!_model.order_dtrm_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_dtrm_nameValidationFailureMessages);
        }
        if (!_model.order_styp_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_styp_nameValidationFailureMessages);
        }
        if (!_model.order_ttyp_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_ttyp_idValidationFailureMessages);
        }
        if (!_model.order_supp_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_supp_nameValidationFailureMessages);
        }
        if (!_model.order_supp_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_supp_codeValidationFailureMessages);
        }
        if (!_model.order_pay_noteIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_pay_noteValidationFailureMessages);
        }
        if (!_model.order_price_printedIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_price_printedValidationFailureMessages);
        }
        if (!_model.order_dloc_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_dloc_nameValidationFailureMessages);
        }
        if (!_model.order_src_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_src_idValidationFailureMessages);
        }
        if (!_model.order_limitIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_limitValidationFailureMessages);
        }
        if (!_model.order_strm_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_strm_nameValidationFailureMessages);
        }
        if (!_model.order_stat_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_stat_idValidationFailureMessages);
        }
        if (!_model.order_ord_timeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_ord_timeValidationFailureMessages);
        }
        if (!_model.order_trsf_typeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_trsf_typeValidationFailureMessages);
        }
        if (!_model.order_cust_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_cust_nameValidationFailureMessages);
        }
        if (!_model.order_dloc_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_dloc_codeValidationFailureMessages);
        }
        if (!_model.order_drwr_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_drwr_nameValidationFailureMessages);
        }
        if (!_model.order_schedulesIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_schedulesValidationFailureMessages);
        }
        if (!_model.order_instructionsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_instructionsValidationFailureMessages);
        }
        if (!_model.order_cust_acntIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_cust_acntValidationFailureMessages);
        }
        if (!_model.order_inv_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_inv_noValidationFailureMessages);
        }
        if (!_model.order_expiredIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_expiredValidationFailureMessages);
        }
        if (!_model.order_psnl_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_psnl_codeValidationFailureMessages);
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
    public function get _model() : _GUI_ORDERSEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _GUI_ORDERSEntityMetadata) : void
    {
        var oldValue : _GUI_ORDERSEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfOrder_ttyp_name : Array = null;
    model_internal var _doValidationLastValOfOrder_ttyp_name : String;

    model_internal function _doValidationForOrder_ttyp_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_ttyp_name != null && model_internal::_doValidationLastValOfOrder_ttyp_name == value)
           return model_internal::_doValidationCacheOfOrder_ttyp_name ;

        _model.model_internal::_order_ttyp_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_ttyp_nameAvailable && _internal_order_ttyp_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_ttyp_name is required"));
        }

        model_internal::_doValidationCacheOfOrder_ttyp_name = validationFailures;
        model_internal::_doValidationLastValOfOrder_ttyp_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_app_no : Array = null;
    model_internal var _doValidationLastValOfOrder_app_no : String;

    model_internal function _doValidationForOrder_app_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_app_no != null && model_internal::_doValidationLastValOfOrder_app_no == value)
           return model_internal::_doValidationCacheOfOrder_app_no ;

        _model.model_internal::_order_app_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_app_noAvailable && _internal_order_app_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_app_no is required"));
        }

        model_internal::_doValidationCacheOfOrder_app_no = validationFailures;
        model_internal::_doValidationLastValOfOrder_app_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_dtrm_code : Array = null;
    model_internal var _doValidationLastValOfOrder_dtrm_code : String;

    model_internal function _doValidationForOrder_dtrm_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_dtrm_code != null && model_internal::_doValidationLastValOfOrder_dtrm_code == value)
           return model_internal::_doValidationCacheOfOrder_dtrm_code ;

        _model.model_internal::_order_dtrm_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_dtrm_codeAvailable && _internal_order_dtrm_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_dtrm_code is required"));
        }

        model_internal::_doValidationCacheOfOrder_dtrm_code = validationFailures;
        model_internal::_doValidationLastValOfOrder_dtrm_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_ship_to_num : Array = null;
    model_internal var _doValidationLastValOfOrder_ship_to_num : Object;

    model_internal function _doValidationForOrder_ship_to_num(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOrder_ship_to_num != null && model_internal::_doValidationLastValOfOrder_ship_to_num == value)
           return model_internal::_doValidationCacheOfOrder_ship_to_num ;

        _model.model_internal::_order_ship_to_numIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_ship_to_numAvailable && _internal_order_ship_to_num == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_ship_to_num is required"));
        }

        model_internal::_doValidationCacheOfOrder_ship_to_num = validationFailures;
        model_internal::_doValidationLastValOfOrder_ship_to_num = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_psnl_name : Array = null;
    model_internal var _doValidationLastValOfOrder_psnl_name : String;

    model_internal function _doValidationForOrder_psnl_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_psnl_name != null && model_internal::_doValidationLastValOfOrder_psnl_name == value)
           return model_internal::_doValidationCacheOfOrder_psnl_name ;

        _model.model_internal::_order_psnl_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_psnl_nameAvailable && _internal_order_psnl_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_psnl_name is required"));
        }

        model_internal::_doValidationCacheOfOrder_psnl_name = validationFailures;
        model_internal::_doValidationLastValOfOrder_psnl_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_sold_to_num : Array = null;
    model_internal var _doValidationLastValOfOrder_sold_to_num : Object;

    model_internal function _doValidationForOrder_sold_to_num(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOrder_sold_to_num != null && model_internal::_doValidationLastValOfOrder_sold_to_num == value)
           return model_internal::_doValidationCacheOfOrder_sold_to_num ;

        _model.model_internal::_order_sold_to_numIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_sold_to_numAvailable && _internal_order_sold_to_num == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_sold_to_num is required"));
        }

        model_internal::_doValidationCacheOfOrder_sold_to_num = validationFailures;
        model_internal::_doValidationLastValOfOrder_sold_to_num = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_strm_code : Array = null;
    model_internal var _doValidationLastValOfOrder_strm_code : String;

    model_internal function _doValidationForOrder_strm_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_strm_code != null && model_internal::_doValidationLastValOfOrder_strm_code == value)
           return model_internal::_doValidationCacheOfOrder_strm_code ;

        _model.model_internal::_order_strm_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_strm_codeAvailable && _internal_order_strm_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_strm_code is required"));
        }

        model_internal::_doValidationCacheOfOrder_strm_code = validationFailures;
        model_internal::_doValidationLastValOfOrder_strm_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_carr_code : Array = null;
    model_internal var _doValidationLastValOfOrder_carr_code : String;

    model_internal function _doValidationForOrder_carr_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_carr_code != null && model_internal::_doValidationLastValOfOrder_carr_code == value)
           return model_internal::_doValidationCacheOfOrder_carr_code ;

        _model.model_internal::_order_carr_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_carr_codeAvailable && _internal_order_carr_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_carr_code is required"));
        }

        model_internal::_doValidationCacheOfOrder_carr_code = validationFailures;
        model_internal::_doValidationLastValOfOrder_carr_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_styp_id : Array = null;
    model_internal var _doValidationLastValOfOrder_styp_id : String;

    model_internal function _doValidationForOrder_styp_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_styp_id != null && model_internal::_doValidationLastValOfOrder_styp_id == value)
           return model_internal::_doValidationCacheOfOrder_styp_id ;

        _model.model_internal::_order_styp_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_styp_idAvailable && _internal_order_styp_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_styp_id is required"));
        }

        model_internal::_doValidationCacheOfOrder_styp_id = validationFailures;
        model_internal::_doValidationLastValOfOrder_styp_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_dlv_time : Array = null;
    model_internal var _doValidationLastValOfOrder_dlv_time : String;

    model_internal function _doValidationForOrder_dlv_time(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_dlv_time != null && model_internal::_doValidationLastValOfOrder_dlv_time == value)
           return model_internal::_doValidationCacheOfOrder_dlv_time ;

        _model.model_internal::_order_dlv_timeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_dlv_timeAvailable && _internal_order_dlv_time == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_dlv_time is required"));
        }

        model_internal::_doValidationCacheOfOrder_dlv_time = validationFailures;
        model_internal::_doValidationLastValOfOrder_dlv_time = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_drwr_code : Array = null;
    model_internal var _doValidationLastValOfOrder_drwr_code : String;

    model_internal function _doValidationForOrder_drwr_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_drwr_code != null && model_internal::_doValidationLastValOfOrder_drwr_code == value)
           return model_internal::_doValidationCacheOfOrder_drwr_code ;

        _model.model_internal::_order_drwr_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_drwr_codeAvailable && _internal_order_drwr_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_drwr_code is required"));
        }

        model_internal::_doValidationCacheOfOrder_drwr_code = validationFailures;
        model_internal::_doValidationLastValOfOrder_drwr_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_sys_no : Array = null;
    model_internal var _doValidationLastValOfOrder_sys_no : String;

    model_internal function _doValidationForOrder_sys_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_sys_no != null && model_internal::_doValidationLastValOfOrder_sys_no == value)
           return model_internal::_doValidationCacheOfOrder_sys_no ;

        _model.model_internal::_order_sys_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_sys_noAvailable && _internal_order_sys_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_sys_no is required"));
        }

        model_internal::_doValidationCacheOfOrder_sys_no = validationFailures;
        model_internal::_doValidationLastValOfOrder_sys_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_exp_time : Array = null;
    model_internal var _doValidationLastValOfOrder_exp_time : String;

    model_internal function _doValidationForOrder_exp_time(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_exp_time != null && model_internal::_doValidationLastValOfOrder_exp_time == value)
           return model_internal::_doValidationCacheOfOrder_exp_time ;

        _model.model_internal::_order_exp_timeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_exp_timeAvailable && _internal_order_exp_time == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_exp_time is required"));
        }

        model_internal::_doValidationCacheOfOrder_exp_time = validationFailures;
        model_internal::_doValidationLastValOfOrder_exp_time = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_items : Array = null;
    model_internal var _doValidationLastValOfOrder_items : Object;

    model_internal function _doValidationForOrder_items(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOrder_items != null && model_internal::_doValidationLastValOfOrder_items == value)
           return model_internal::_doValidationCacheOfOrder_items ;

        _model.model_internal::_order_itemsIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_itemsAvailable && _internal_order_items == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_items is required"));
        }

        model_internal::_doValidationCacheOfOrder_items = validationFailures;
        model_internal::_doValidationLastValOfOrder_items = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_last_change : Array = null;
    model_internal var _doValidationLastValOfOrder_last_change : String;

    model_internal function _doValidationForOrder_last_change(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_last_change != null && model_internal::_doValidationLastValOfOrder_last_change == value)
           return model_internal::_doValidationCacheOfOrder_last_change ;

        _model.model_internal::_order_last_changeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_last_changeAvailable && _internal_order_last_change == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_last_change is required"));
        }

        model_internal::_doValidationCacheOfOrder_last_change = validationFailures;
        model_internal::_doValidationLastValOfOrder_last_change = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_src_name : Array = null;
    model_internal var _doValidationLastValOfOrder_src_name : String;

    model_internal function _doValidationForOrder_src_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_src_name != null && model_internal::_doValidationLastValOfOrder_src_name == value)
           return model_internal::_doValidationCacheOfOrder_src_name ;

        _model.model_internal::_order_src_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_src_nameAvailable && _internal_order_src_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_src_name is required"));
        }

        model_internal::_doValidationCacheOfOrder_src_name = validationFailures;
        model_internal::_doValidationLastValOfOrder_src_name = value;

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
    
    model_internal var _doValidationCacheOfOrder_app_time : Array = null;
    model_internal var _doValidationLastValOfOrder_app_time : String;

    model_internal function _doValidationForOrder_app_time(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_app_time != null && model_internal::_doValidationLastValOfOrder_app_time == value)
           return model_internal::_doValidationCacheOfOrder_app_time ;

        _model.model_internal::_order_app_timeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_app_timeAvailable && _internal_order_app_time == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_app_time is required"));
        }

        model_internal::_doValidationCacheOfOrder_app_time = validationFailures;
        model_internal::_doValidationLastValOfOrder_app_time = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_total : Array = null;
    model_internal var _doValidationLastValOfOrder_total : String;

    model_internal function _doValidationForOrder_total(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_total != null && model_internal::_doValidationLastValOfOrder_total == value)
           return model_internal::_doValidationCacheOfOrder_total ;

        _model.model_internal::_order_totalIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_totalAvailable && _internal_order_total == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_total is required"));
        }

        model_internal::_doValidationCacheOfOrder_total = validationFailures;
        model_internal::_doValidationLastValOfOrder_total = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_cust_code : Array = null;
    model_internal var _doValidationLastValOfOrder_cust_code : String;

    model_internal function _doValidationForOrder_cust_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_cust_code != null && model_internal::_doValidationLastValOfOrder_cust_code == value)
           return model_internal::_doValidationCacheOfOrder_cust_code ;

        _model.model_internal::_order_cust_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_cust_codeAvailable && _internal_order_cust_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_cust_code is required"));
        }

        model_internal::_doValidationCacheOfOrder_cust_code = validationFailures;
        model_internal::_doValidationLastValOfOrder_cust_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_approved : Array = null;
    model_internal var _doValidationLastValOfOrder_approved : String;

    model_internal function _doValidationForOrder_approved(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_approved != null && model_internal::_doValidationLastValOfOrder_approved == value)
           return model_internal::_doValidationCacheOfOrder_approved ;

        _model.model_internal::_order_approvedIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_approvedAvailable && _internal_order_approved == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_approved is required"));
        }

        model_internal::_doValidationCacheOfOrder_approved = validationFailures;
        model_internal::_doValidationLastValOfOrder_approved = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_cust_no : Array = null;
    model_internal var _doValidationLastValOfOrder_cust_no : String;

    model_internal function _doValidationForOrder_cust_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_cust_no != null && model_internal::_doValidationLastValOfOrder_cust_no == value)
           return model_internal::_doValidationCacheOfOrder_cust_no ;

        _model.model_internal::_order_cust_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_cust_noAvailable && _internal_order_cust_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_cust_no is required"));
        }

        model_internal::_doValidationCacheOfOrder_cust_no = validationFailures;
        model_internal::_doValidationLastValOfOrder_cust_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_carr_name : Array = null;
    model_internal var _doValidationLastValOfOrder_carr_name : String;

    model_internal function _doValidationForOrder_carr_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_carr_name != null && model_internal::_doValidationLastValOfOrder_carr_name == value)
           return model_internal::_doValidationCacheOfOrder_carr_name ;

        _model.model_internal::_order_carr_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_carr_nameAvailable && _internal_order_carr_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_carr_name is required"));
        }

        model_internal::_doValidationCacheOfOrder_carr_name = validationFailures;
        model_internal::_doValidationLastValOfOrder_carr_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_stat_name : Array = null;
    model_internal var _doValidationLastValOfOrder_stat_name : String;

    model_internal function _doValidationForOrder_stat_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_stat_name != null && model_internal::_doValidationLastValOfOrder_stat_name == value)
           return model_internal::_doValidationCacheOfOrder_stat_name ;

        _model.model_internal::_order_stat_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_stat_nameAvailable && _internal_order_stat_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_stat_name is required"));
        }

        model_internal::_doValidationCacheOfOrder_stat_name = validationFailures;
        model_internal::_doValidationLastValOfOrder_stat_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_dtrm_name : Array = null;
    model_internal var _doValidationLastValOfOrder_dtrm_name : String;

    model_internal function _doValidationForOrder_dtrm_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_dtrm_name != null && model_internal::_doValidationLastValOfOrder_dtrm_name == value)
           return model_internal::_doValidationCacheOfOrder_dtrm_name ;

        _model.model_internal::_order_dtrm_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_dtrm_nameAvailable && _internal_order_dtrm_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_dtrm_name is required"));
        }

        model_internal::_doValidationCacheOfOrder_dtrm_name = validationFailures;
        model_internal::_doValidationLastValOfOrder_dtrm_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_styp_name : Array = null;
    model_internal var _doValidationLastValOfOrder_styp_name : String;

    model_internal function _doValidationForOrder_styp_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_styp_name != null && model_internal::_doValidationLastValOfOrder_styp_name == value)
           return model_internal::_doValidationCacheOfOrder_styp_name ;

        _model.model_internal::_order_styp_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_styp_nameAvailable && _internal_order_styp_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_styp_name is required"));
        }

        model_internal::_doValidationCacheOfOrder_styp_name = validationFailures;
        model_internal::_doValidationLastValOfOrder_styp_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_ttyp_id : Array = null;
    model_internal var _doValidationLastValOfOrder_ttyp_id : String;

    model_internal function _doValidationForOrder_ttyp_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_ttyp_id != null && model_internal::_doValidationLastValOfOrder_ttyp_id == value)
           return model_internal::_doValidationCacheOfOrder_ttyp_id ;

        _model.model_internal::_order_ttyp_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_ttyp_idAvailable && _internal_order_ttyp_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_ttyp_id is required"));
        }

        model_internal::_doValidationCacheOfOrder_ttyp_id = validationFailures;
        model_internal::_doValidationLastValOfOrder_ttyp_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_supp_name : Array = null;
    model_internal var _doValidationLastValOfOrder_supp_name : String;

    model_internal function _doValidationForOrder_supp_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_supp_name != null && model_internal::_doValidationLastValOfOrder_supp_name == value)
           return model_internal::_doValidationCacheOfOrder_supp_name ;

        _model.model_internal::_order_supp_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_supp_nameAvailable && _internal_order_supp_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_supp_name is required"));
        }

        model_internal::_doValidationCacheOfOrder_supp_name = validationFailures;
        model_internal::_doValidationLastValOfOrder_supp_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_supp_code : Array = null;
    model_internal var _doValidationLastValOfOrder_supp_code : String;

    model_internal function _doValidationForOrder_supp_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_supp_code != null && model_internal::_doValidationLastValOfOrder_supp_code == value)
           return model_internal::_doValidationCacheOfOrder_supp_code ;

        _model.model_internal::_order_supp_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_supp_codeAvailable && _internal_order_supp_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_supp_code is required"));
        }

        model_internal::_doValidationCacheOfOrder_supp_code = validationFailures;
        model_internal::_doValidationLastValOfOrder_supp_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_pay_note : Array = null;
    model_internal var _doValidationLastValOfOrder_pay_note : Object;

    model_internal function _doValidationForOrder_pay_note(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOrder_pay_note != null && model_internal::_doValidationLastValOfOrder_pay_note == value)
           return model_internal::_doValidationCacheOfOrder_pay_note ;

        _model.model_internal::_order_pay_noteIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_pay_noteAvailable && _internal_order_pay_note == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_pay_note is required"));
        }

        model_internal::_doValidationCacheOfOrder_pay_note = validationFailures;
        model_internal::_doValidationLastValOfOrder_pay_note = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_price_printed : Array = null;
    model_internal var _doValidationLastValOfOrder_price_printed : String;

    model_internal function _doValidationForOrder_price_printed(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_price_printed != null && model_internal::_doValidationLastValOfOrder_price_printed == value)
           return model_internal::_doValidationCacheOfOrder_price_printed ;

        _model.model_internal::_order_price_printedIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_price_printedAvailable && _internal_order_price_printed == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_price_printed is required"));
        }

        model_internal::_doValidationCacheOfOrder_price_printed = validationFailures;
        model_internal::_doValidationLastValOfOrder_price_printed = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_dloc_name : Array = null;
    model_internal var _doValidationLastValOfOrder_dloc_name : String;

    model_internal function _doValidationForOrder_dloc_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_dloc_name != null && model_internal::_doValidationLastValOfOrder_dloc_name == value)
           return model_internal::_doValidationCacheOfOrder_dloc_name ;

        _model.model_internal::_order_dloc_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_dloc_nameAvailable && _internal_order_dloc_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_dloc_name is required"));
        }

        model_internal::_doValidationCacheOfOrder_dloc_name = validationFailures;
        model_internal::_doValidationLastValOfOrder_dloc_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_src_id : Array = null;
    model_internal var _doValidationLastValOfOrder_src_id : String;

    model_internal function _doValidationForOrder_src_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_src_id != null && model_internal::_doValidationLastValOfOrder_src_id == value)
           return model_internal::_doValidationCacheOfOrder_src_id ;

        _model.model_internal::_order_src_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_src_idAvailable && _internal_order_src_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_src_id is required"));
        }

        model_internal::_doValidationCacheOfOrder_src_id = validationFailures;
        model_internal::_doValidationLastValOfOrder_src_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_limit : Array = null;
    model_internal var _doValidationLastValOfOrder_limit : String;

    model_internal function _doValidationForOrder_limit(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_limit != null && model_internal::_doValidationLastValOfOrder_limit == value)
           return model_internal::_doValidationCacheOfOrder_limit ;

        _model.model_internal::_order_limitIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_limitAvailable && _internal_order_limit == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_limit is required"));
        }

        model_internal::_doValidationCacheOfOrder_limit = validationFailures;
        model_internal::_doValidationLastValOfOrder_limit = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_strm_name : Array = null;
    model_internal var _doValidationLastValOfOrder_strm_name : String;

    model_internal function _doValidationForOrder_strm_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_strm_name != null && model_internal::_doValidationLastValOfOrder_strm_name == value)
           return model_internal::_doValidationCacheOfOrder_strm_name ;

        _model.model_internal::_order_strm_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_strm_nameAvailable && _internal_order_strm_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_strm_name is required"));
        }

        model_internal::_doValidationCacheOfOrder_strm_name = validationFailures;
        model_internal::_doValidationLastValOfOrder_strm_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_stat_id : Array = null;
    model_internal var _doValidationLastValOfOrder_stat_id : String;

    model_internal function _doValidationForOrder_stat_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_stat_id != null && model_internal::_doValidationLastValOfOrder_stat_id == value)
           return model_internal::_doValidationCacheOfOrder_stat_id ;

        _model.model_internal::_order_stat_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_stat_idAvailable && _internal_order_stat_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_stat_id is required"));
        }

        model_internal::_doValidationCacheOfOrder_stat_id = validationFailures;
        model_internal::_doValidationLastValOfOrder_stat_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_ord_time : Array = null;
    model_internal var _doValidationLastValOfOrder_ord_time : String;

    model_internal function _doValidationForOrder_ord_time(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_ord_time != null && model_internal::_doValidationLastValOfOrder_ord_time == value)
           return model_internal::_doValidationCacheOfOrder_ord_time ;

        _model.model_internal::_order_ord_timeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_ord_timeAvailable && _internal_order_ord_time == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_ord_time is required"));
        }

        model_internal::_doValidationCacheOfOrder_ord_time = validationFailures;
        model_internal::_doValidationLastValOfOrder_ord_time = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_trsf_type : Array = null;
    model_internal var _doValidationLastValOfOrder_trsf_type : Object;

    model_internal function _doValidationForOrder_trsf_type(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOrder_trsf_type != null && model_internal::_doValidationLastValOfOrder_trsf_type == value)
           return model_internal::_doValidationCacheOfOrder_trsf_type ;

        _model.model_internal::_order_trsf_typeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_trsf_typeAvailable && _internal_order_trsf_type == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_trsf_type is required"));
        }

        model_internal::_doValidationCacheOfOrder_trsf_type = validationFailures;
        model_internal::_doValidationLastValOfOrder_trsf_type = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_cust_name : Array = null;
    model_internal var _doValidationLastValOfOrder_cust_name : String;

    model_internal function _doValidationForOrder_cust_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_cust_name != null && model_internal::_doValidationLastValOfOrder_cust_name == value)
           return model_internal::_doValidationCacheOfOrder_cust_name ;

        _model.model_internal::_order_cust_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_cust_nameAvailable && _internal_order_cust_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_cust_name is required"));
        }

        model_internal::_doValidationCacheOfOrder_cust_name = validationFailures;
        model_internal::_doValidationLastValOfOrder_cust_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_dloc_code : Array = null;
    model_internal var _doValidationLastValOfOrder_dloc_code : String;

    model_internal function _doValidationForOrder_dloc_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_dloc_code != null && model_internal::_doValidationLastValOfOrder_dloc_code == value)
           return model_internal::_doValidationCacheOfOrder_dloc_code ;

        _model.model_internal::_order_dloc_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_dloc_codeAvailable && _internal_order_dloc_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_dloc_code is required"));
        }

        model_internal::_doValidationCacheOfOrder_dloc_code = validationFailures;
        model_internal::_doValidationLastValOfOrder_dloc_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_drwr_name : Array = null;
    model_internal var _doValidationLastValOfOrder_drwr_name : String;

    model_internal function _doValidationForOrder_drwr_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_drwr_name != null && model_internal::_doValidationLastValOfOrder_drwr_name == value)
           return model_internal::_doValidationCacheOfOrder_drwr_name ;

        _model.model_internal::_order_drwr_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_drwr_nameAvailable && _internal_order_drwr_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_drwr_name is required"));
        }

        model_internal::_doValidationCacheOfOrder_drwr_name = validationFailures;
        model_internal::_doValidationLastValOfOrder_drwr_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_schedules : Array = null;
    model_internal var _doValidationLastValOfOrder_schedules : Object;

    model_internal function _doValidationForOrder_schedules(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOrder_schedules != null && model_internal::_doValidationLastValOfOrder_schedules == value)
           return model_internal::_doValidationCacheOfOrder_schedules ;

        _model.model_internal::_order_schedulesIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_schedulesAvailable && _internal_order_schedules == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_schedules is required"));
        }

        model_internal::_doValidationCacheOfOrder_schedules = validationFailures;
        model_internal::_doValidationLastValOfOrder_schedules = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_instructions : Array = null;
    model_internal var _doValidationLastValOfOrder_instructions : String;

    model_internal function _doValidationForOrder_instructions(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_instructions != null && model_internal::_doValidationLastValOfOrder_instructions == value)
           return model_internal::_doValidationCacheOfOrder_instructions ;

        _model.model_internal::_order_instructionsIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_instructionsAvailable && _internal_order_instructions == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_instructions is required"));
        }

        model_internal::_doValidationCacheOfOrder_instructions = validationFailures;
        model_internal::_doValidationLastValOfOrder_instructions = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_cust_acnt : Array = null;
    model_internal var _doValidationLastValOfOrder_cust_acnt : String;

    model_internal function _doValidationForOrder_cust_acnt(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_cust_acnt != null && model_internal::_doValidationLastValOfOrder_cust_acnt == value)
           return model_internal::_doValidationCacheOfOrder_cust_acnt ;

        _model.model_internal::_order_cust_acntIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_cust_acntAvailable && _internal_order_cust_acnt == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_cust_acnt is required"));
        }

        model_internal::_doValidationCacheOfOrder_cust_acnt = validationFailures;
        model_internal::_doValidationLastValOfOrder_cust_acnt = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_inv_no : Array = null;
    model_internal var _doValidationLastValOfOrder_inv_no : Object;

    model_internal function _doValidationForOrder_inv_no(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOrder_inv_no != null && model_internal::_doValidationLastValOfOrder_inv_no == value)
           return model_internal::_doValidationCacheOfOrder_inv_no ;

        _model.model_internal::_order_inv_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_inv_noAvailable && _internal_order_inv_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_inv_no is required"));
        }

        model_internal::_doValidationCacheOfOrder_inv_no = validationFailures;
        model_internal::_doValidationLastValOfOrder_inv_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_expired : Array = null;
    model_internal var _doValidationLastValOfOrder_expired : Object;

    model_internal function _doValidationForOrder_expired(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOrder_expired != null && model_internal::_doValidationLastValOfOrder_expired == value)
           return model_internal::_doValidationCacheOfOrder_expired ;

        _model.model_internal::_order_expiredIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_expiredAvailable && _internal_order_expired == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_expired is required"));
        }

        model_internal::_doValidationCacheOfOrder_expired = validationFailures;
        model_internal::_doValidationLastValOfOrder_expired = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_psnl_code : Array = null;
    model_internal var _doValidationLastValOfOrder_psnl_code : String;

    model_internal function _doValidationForOrder_psnl_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_psnl_code != null && model_internal::_doValidationLastValOfOrder_psnl_code == value)
           return model_internal::_doValidationCacheOfOrder_psnl_code ;

        _model.model_internal::_order_psnl_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_psnl_codeAvailable && _internal_order_psnl_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_psnl_code is required"));
        }

        model_internal::_doValidationCacheOfOrder_psnl_code = validationFailures;
        model_internal::_doValidationLastValOfOrder_psnl_code = value;

        return validationFailures;
    }
    

}

}
