/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - GUI_AccessKeys.as.
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
public class _Super_GUI_AccessKeys extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("GUI_AccessKeys") == null)
            {
                flash.net.registerClassAlias("GUI_AccessKeys", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("GUI_AccessKeys", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _GUI_AccessKeysEntityMetadata;
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
    private var _internal_kya_equipment : Object;
    private var _internal_kya_key_issuer : String;
    private var _internal_rn : String;
    private var _internal_kya_type_name : String;
    private var _internal_kya_personnel : String;
    private var _internal_kya_psnl_name : String;
    private var _internal_kya_role : String;
    private var _internal_kya_tnkr_name : Object;
    private var _internal_kya_alloc_type_name : Object;
    private var _internal_kya_tanker : String;
    private var _internal_kya_cust_ordno : Object;
    private var _internal_kya_tnkr_cmpy : String;
    private var _internal_kya_role_name : String;
    private var _internal_kya_drawer : String;
    private var _internal_kya_issuer_name : String;
    private var _internal_kya_key_created : String;
    private var _internal_kya_pin_changed : Object;
    private var _internal_kya_eqpt_cmpy : Object;
    private var _internal_kya_adhoc : String;
    private var _internal_kya_alloc_type : Object;
    private var _internal_kya_etyp_name : Object;
    private var _internal_kya_eqpt_cmpy_name : Object;
    private var _internal_kya_draw_name : String;
    private var _internal_kya_cust_name : Object;
    private var _internal_kya_alloc_cmpy : Object;
    private var _internal_kya_eqpt_name : Object;
    private var _internal_kya_phys_name : String;
    private var _internal_kya_order_no : Object;
    private var _internal_kya_txt : String;
    private var _internal_kya_trip_no : Object;
    private var _internal_kya_timecode : String;
    private var _internal_kya_psnl_cmpy : String;
    private var _internal_kya_load_id : Object;
    private var _internal_kya_order_desc : String;
    private var _internal_kya_supp_name : String;
    private var _internal_kya_alloc_cmpy_name : Object;
    private var _internal_kya_pin : Object;
    private var _internal_kya_phys_type : String;
    private var _internal_kya_eqpt_desc : Object;
    private var _internal_kya_tnkr_desc : String;
    private var _internal_kya_type : String;
    private var _internal_kya_psnl_cmpy_name : String;
    private var _internal_kya_lock : String;
    private var _internal_kya_key_no : String;
    private var _internal_kya_supplier : String;
    private var _internal_kya_site_name : Object;
    private var _internal_kya_load_site : Object;
    private var _internal_kya_tnkr_cmpy_name : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_GUI_AccessKeys()
    {
        _model = new _GUI_AccessKeysEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_equipment", model_internal::setterListenerKya_equipment));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_key_issuer", model_internal::setterListenerKya_key_issuer));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_type_name", model_internal::setterListenerKya_type_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_personnel", model_internal::setterListenerKya_personnel));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_psnl_name", model_internal::setterListenerKya_psnl_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_role", model_internal::setterListenerKya_role));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_tnkr_name", model_internal::setterListenerKya_tnkr_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_alloc_type_name", model_internal::setterListenerKya_alloc_type_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_tanker", model_internal::setterListenerKya_tanker));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_cust_ordno", model_internal::setterListenerKya_cust_ordno));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_tnkr_cmpy", model_internal::setterListenerKya_tnkr_cmpy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_role_name", model_internal::setterListenerKya_role_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_drawer", model_internal::setterListenerKya_drawer));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_issuer_name", model_internal::setterListenerKya_issuer_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_key_created", model_internal::setterListenerKya_key_created));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_pin_changed", model_internal::setterListenerKya_pin_changed));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_eqpt_cmpy", model_internal::setterListenerKya_eqpt_cmpy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_adhoc", model_internal::setterListenerKya_adhoc));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_alloc_type", model_internal::setterListenerKya_alloc_type));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_etyp_name", model_internal::setterListenerKya_etyp_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_eqpt_cmpy_name", model_internal::setterListenerKya_eqpt_cmpy_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_draw_name", model_internal::setterListenerKya_draw_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_cust_name", model_internal::setterListenerKya_cust_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_alloc_cmpy", model_internal::setterListenerKya_alloc_cmpy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_eqpt_name", model_internal::setterListenerKya_eqpt_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_phys_name", model_internal::setterListenerKya_phys_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_order_no", model_internal::setterListenerKya_order_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_txt", model_internal::setterListenerKya_txt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_trip_no", model_internal::setterListenerKya_trip_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_timecode", model_internal::setterListenerKya_timecode));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_psnl_cmpy", model_internal::setterListenerKya_psnl_cmpy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_load_id", model_internal::setterListenerKya_load_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_order_desc", model_internal::setterListenerKya_order_desc));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_supp_name", model_internal::setterListenerKya_supp_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_alloc_cmpy_name", model_internal::setterListenerKya_alloc_cmpy_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_pin", model_internal::setterListenerKya_pin));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_phys_type", model_internal::setterListenerKya_phys_type));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_eqpt_desc", model_internal::setterListenerKya_eqpt_desc));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_tnkr_desc", model_internal::setterListenerKya_tnkr_desc));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_type", model_internal::setterListenerKya_type));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_psnl_cmpy_name", model_internal::setterListenerKya_psnl_cmpy_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_lock", model_internal::setterListenerKya_lock));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_key_no", model_internal::setterListenerKya_key_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_supplier", model_internal::setterListenerKya_supplier));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_site_name", model_internal::setterListenerKya_site_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_load_site", model_internal::setterListenerKya_load_site));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "kya_tnkr_cmpy_name", model_internal::setterListenerKya_tnkr_cmpy_name));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get kya_equipment() : Object
    {
        return _internal_kya_equipment;
    }

    [Bindable(event="propertyChange")]
    public function get kya_key_issuer() : String
    {
        return _internal_kya_key_issuer;
    }

    [Bindable(event="propertyChange")]
    public function get rn() : String
    {
        return _internal_rn;
    }

    [Bindable(event="propertyChange")]
    public function get kya_type_name() : String
    {
        return _internal_kya_type_name;
    }

    [Bindable(event="propertyChange")]
    public function get kya_personnel() : String
    {
        return _internal_kya_personnel;
    }

    [Bindable(event="propertyChange")]
    public function get kya_psnl_name() : String
    {
        return _internal_kya_psnl_name;
    }

    [Bindable(event="propertyChange")]
    public function get kya_role() : String
    {
        return _internal_kya_role;
    }

    [Bindable(event="propertyChange")]
    public function get kya_tnkr_name() : Object
    {
        return _internal_kya_tnkr_name;
    }

    [Bindable(event="propertyChange")]
    public function get kya_alloc_type_name() : Object
    {
        return _internal_kya_alloc_type_name;
    }

    [Bindable(event="propertyChange")]
    public function get kya_tanker() : String
    {
        return _internal_kya_tanker;
    }

    [Bindable(event="propertyChange")]
    public function get kya_cust_ordno() : Object
    {
        return _internal_kya_cust_ordno;
    }

    [Bindable(event="propertyChange")]
    public function get kya_tnkr_cmpy() : String
    {
        return _internal_kya_tnkr_cmpy;
    }

    [Bindable(event="propertyChange")]
    public function get kya_role_name() : String
    {
        return _internal_kya_role_name;
    }

    [Bindable(event="propertyChange")]
    public function get kya_drawer() : String
    {
        return _internal_kya_drawer;
    }

    [Bindable(event="propertyChange")]
    public function get kya_issuer_name() : String
    {
        return _internal_kya_issuer_name;
    }

    [Bindable(event="propertyChange")]
    public function get kya_key_created() : String
    {
        return _internal_kya_key_created;
    }

    [Bindable(event="propertyChange")]
    public function get kya_pin_changed() : Object
    {
        return _internal_kya_pin_changed;
    }

    [Bindable(event="propertyChange")]
    public function get kya_eqpt_cmpy() : Object
    {
        return _internal_kya_eqpt_cmpy;
    }

    [Bindable(event="propertyChange")]
    public function get kya_adhoc() : String
    {
        return _internal_kya_adhoc;
    }

    [Bindable(event="propertyChange")]
    public function get kya_alloc_type() : Object
    {
        return _internal_kya_alloc_type;
    }

    [Bindable(event="propertyChange")]
    public function get kya_etyp_name() : Object
    {
        return _internal_kya_etyp_name;
    }

    [Bindable(event="propertyChange")]
    public function get kya_eqpt_cmpy_name() : Object
    {
        return _internal_kya_eqpt_cmpy_name;
    }

    [Bindable(event="propertyChange")]
    public function get kya_draw_name() : String
    {
        return _internal_kya_draw_name;
    }

    [Bindable(event="propertyChange")]
    public function get kya_cust_name() : Object
    {
        return _internal_kya_cust_name;
    }

    [Bindable(event="propertyChange")]
    public function get kya_alloc_cmpy() : Object
    {
        return _internal_kya_alloc_cmpy;
    }

    [Bindable(event="propertyChange")]
    public function get kya_eqpt_name() : Object
    {
        return _internal_kya_eqpt_name;
    }

    [Bindable(event="propertyChange")]
    public function get kya_phys_name() : String
    {
        return _internal_kya_phys_name;
    }

    [Bindable(event="propertyChange")]
    public function get kya_order_no() : Object
    {
        return _internal_kya_order_no;
    }

    [Bindable(event="propertyChange")]
    public function get kya_txt() : String
    {
        return _internal_kya_txt;
    }

    [Bindable(event="propertyChange")]
    public function get kya_trip_no() : Object
    {
        return _internal_kya_trip_no;
    }

    [Bindable(event="propertyChange")]
    public function get kya_timecode() : String
    {
        return _internal_kya_timecode;
    }

    [Bindable(event="propertyChange")]
    public function get kya_psnl_cmpy() : String
    {
        return _internal_kya_psnl_cmpy;
    }

    [Bindable(event="propertyChange")]
    public function get kya_load_id() : Object
    {
        return _internal_kya_load_id;
    }

    [Bindable(event="propertyChange")]
    public function get kya_order_desc() : String
    {
        return _internal_kya_order_desc;
    }

    [Bindable(event="propertyChange")]
    public function get kya_supp_name() : String
    {
        return _internal_kya_supp_name;
    }

    [Bindable(event="propertyChange")]
    public function get kya_alloc_cmpy_name() : Object
    {
        return _internal_kya_alloc_cmpy_name;
    }

    [Bindable(event="propertyChange")]
    public function get kya_pin() : Object
    {
        return _internal_kya_pin;
    }

    [Bindable(event="propertyChange")]
    public function get kya_phys_type() : String
    {
        return _internal_kya_phys_type;
    }

    [Bindable(event="propertyChange")]
    public function get kya_eqpt_desc() : Object
    {
        return _internal_kya_eqpt_desc;
    }

    [Bindable(event="propertyChange")]
    public function get kya_tnkr_desc() : String
    {
        return _internal_kya_tnkr_desc;
    }

    [Bindable(event="propertyChange")]
    public function get kya_type() : String
    {
        return _internal_kya_type;
    }

    [Bindable(event="propertyChange")]
    public function get kya_psnl_cmpy_name() : String
    {
        return _internal_kya_psnl_cmpy_name;
    }

    [Bindable(event="propertyChange")]
    public function get kya_lock() : String
    {
        return _internal_kya_lock;
    }

    [Bindable(event="propertyChange")]
    public function get kya_key_no() : String
    {
        return _internal_kya_key_no;
    }

    [Bindable(event="propertyChange")]
    public function get kya_supplier() : String
    {
        return _internal_kya_supplier;
    }

    [Bindable(event="propertyChange")]
    public function get kya_site_name() : Object
    {
        return _internal_kya_site_name;
    }

    [Bindable(event="propertyChange")]
    public function get kya_load_site() : Object
    {
        return _internal_kya_load_site;
    }

    [Bindable(event="propertyChange")]
    public function get kya_tnkr_cmpy_name() : String
    {
        return _internal_kya_tnkr_cmpy_name;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set kya_equipment(value:Object) : void
    {
        var oldValue:Object = _internal_kya_equipment;
        if (oldValue !== value)
        {
            _internal_kya_equipment = value;
        }
    }

    public function set kya_key_issuer(value:String) : void
    {
        var oldValue:String = _internal_kya_key_issuer;
        if (oldValue !== value)
        {
            _internal_kya_key_issuer = value;
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

    public function set kya_type_name(value:String) : void
    {
        var oldValue:String = _internal_kya_type_name;
        if (oldValue !== value)
        {
            _internal_kya_type_name = value;
        }
    }

    public function set kya_personnel(value:String) : void
    {
        var oldValue:String = _internal_kya_personnel;
        if (oldValue !== value)
        {
            _internal_kya_personnel = value;
        }
    }

    public function set kya_psnl_name(value:String) : void
    {
        var oldValue:String = _internal_kya_psnl_name;
        if (oldValue !== value)
        {
            _internal_kya_psnl_name = value;
        }
    }

    public function set kya_role(value:String) : void
    {
        var oldValue:String = _internal_kya_role;
        if (oldValue !== value)
        {
            _internal_kya_role = value;
        }
    }

    public function set kya_tnkr_name(value:Object) : void
    {
        var oldValue:Object = _internal_kya_tnkr_name;
        if (oldValue !== value)
        {
            _internal_kya_tnkr_name = value;
        }
    }

    public function set kya_alloc_type_name(value:Object) : void
    {
        var oldValue:Object = _internal_kya_alloc_type_name;
        if (oldValue !== value)
        {
            _internal_kya_alloc_type_name = value;
        }
    }

    public function set kya_tanker(value:String) : void
    {
        var oldValue:String = _internal_kya_tanker;
        if (oldValue !== value)
        {
            _internal_kya_tanker = value;
        }
    }

    public function set kya_cust_ordno(value:Object) : void
    {
        var oldValue:Object = _internal_kya_cust_ordno;
        if (oldValue !== value)
        {
            _internal_kya_cust_ordno = value;
        }
    }

    public function set kya_tnkr_cmpy(value:String) : void
    {
        var oldValue:String = _internal_kya_tnkr_cmpy;
        if (oldValue !== value)
        {
            _internal_kya_tnkr_cmpy = value;
        }
    }

    public function set kya_role_name(value:String) : void
    {
        var oldValue:String = _internal_kya_role_name;
        if (oldValue !== value)
        {
            _internal_kya_role_name = value;
        }
    }

    public function set kya_drawer(value:String) : void
    {
        var oldValue:String = _internal_kya_drawer;
        if (oldValue !== value)
        {
            _internal_kya_drawer = value;
        }
    }

    public function set kya_issuer_name(value:String) : void
    {
        var oldValue:String = _internal_kya_issuer_name;
        if (oldValue !== value)
        {
            _internal_kya_issuer_name = value;
        }
    }

    public function set kya_key_created(value:String) : void
    {
        var oldValue:String = _internal_kya_key_created;
        if (oldValue !== value)
        {
            _internal_kya_key_created = value;
        }
    }

    public function set kya_pin_changed(value:Object) : void
    {
        var oldValue:Object = _internal_kya_pin_changed;
        if (oldValue !== value)
        {
            _internal_kya_pin_changed = value;
        }
    }

    public function set kya_eqpt_cmpy(value:Object) : void
    {
        var oldValue:Object = _internal_kya_eqpt_cmpy;
        if (oldValue !== value)
        {
            _internal_kya_eqpt_cmpy = value;
        }
    }

    public function set kya_adhoc(value:String) : void
    {
        var oldValue:String = _internal_kya_adhoc;
        if (oldValue !== value)
        {
            _internal_kya_adhoc = value;
        }
    }

    public function set kya_alloc_type(value:Object) : void
    {
        var oldValue:Object = _internal_kya_alloc_type;
        if (oldValue !== value)
        {
            _internal_kya_alloc_type = value;
        }
    }

    public function set kya_etyp_name(value:Object) : void
    {
        var oldValue:Object = _internal_kya_etyp_name;
        if (oldValue !== value)
        {
            _internal_kya_etyp_name = value;
        }
    }

    public function set kya_eqpt_cmpy_name(value:Object) : void
    {
        var oldValue:Object = _internal_kya_eqpt_cmpy_name;
        if (oldValue !== value)
        {
            _internal_kya_eqpt_cmpy_name = value;
        }
    }

    public function set kya_draw_name(value:String) : void
    {
        var oldValue:String = _internal_kya_draw_name;
        if (oldValue !== value)
        {
            _internal_kya_draw_name = value;
        }
    }

    public function set kya_cust_name(value:Object) : void
    {
        var oldValue:Object = _internal_kya_cust_name;
        if (oldValue !== value)
        {
            _internal_kya_cust_name = value;
        }
    }

    public function set kya_alloc_cmpy(value:Object) : void
    {
        var oldValue:Object = _internal_kya_alloc_cmpy;
        if (oldValue !== value)
        {
            _internal_kya_alloc_cmpy = value;
        }
    }

    public function set kya_eqpt_name(value:Object) : void
    {
        var oldValue:Object = _internal_kya_eqpt_name;
        if (oldValue !== value)
        {
            _internal_kya_eqpt_name = value;
        }
    }

    public function set kya_phys_name(value:String) : void
    {
        var oldValue:String = _internal_kya_phys_name;
        if (oldValue !== value)
        {
            _internal_kya_phys_name = value;
        }
    }

    public function set kya_order_no(value:Object) : void
    {
        var oldValue:Object = _internal_kya_order_no;
        if (oldValue !== value)
        {
            _internal_kya_order_no = value;
        }
    }

    public function set kya_txt(value:String) : void
    {
        var oldValue:String = _internal_kya_txt;
        if (oldValue !== value)
        {
            _internal_kya_txt = value;
        }
    }

    public function set kya_trip_no(value:Object) : void
    {
        var oldValue:Object = _internal_kya_trip_no;
        if (oldValue !== value)
        {
            _internal_kya_trip_no = value;
        }
    }

    public function set kya_timecode(value:String) : void
    {
        var oldValue:String = _internal_kya_timecode;
        if (oldValue !== value)
        {
            _internal_kya_timecode = value;
        }
    }

    public function set kya_psnl_cmpy(value:String) : void
    {
        var oldValue:String = _internal_kya_psnl_cmpy;
        if (oldValue !== value)
        {
            _internal_kya_psnl_cmpy = value;
        }
    }

    public function set kya_load_id(value:Object) : void
    {
        var oldValue:Object = _internal_kya_load_id;
        if (oldValue !== value)
        {
            _internal_kya_load_id = value;
        }
    }

    public function set kya_order_desc(value:String) : void
    {
        var oldValue:String = _internal_kya_order_desc;
        if (oldValue !== value)
        {
            _internal_kya_order_desc = value;
        }
    }

    public function set kya_supp_name(value:String) : void
    {
        var oldValue:String = _internal_kya_supp_name;
        if (oldValue !== value)
        {
            _internal_kya_supp_name = value;
        }
    }

    public function set kya_alloc_cmpy_name(value:Object) : void
    {
        var oldValue:Object = _internal_kya_alloc_cmpy_name;
        if (oldValue !== value)
        {
            _internal_kya_alloc_cmpy_name = value;
        }
    }

    public function set kya_pin(value:Object) : void
    {
        var oldValue:Object = _internal_kya_pin;
        if (oldValue !== value)
        {
            _internal_kya_pin = value;
        }
    }

    public function set kya_phys_type(value:String) : void
    {
        var oldValue:String = _internal_kya_phys_type;
        if (oldValue !== value)
        {
            _internal_kya_phys_type = value;
        }
    }

    public function set kya_eqpt_desc(value:Object) : void
    {
        var oldValue:Object = _internal_kya_eqpt_desc;
        if (oldValue !== value)
        {
            _internal_kya_eqpt_desc = value;
        }
    }

    public function set kya_tnkr_desc(value:String) : void
    {
        var oldValue:String = _internal_kya_tnkr_desc;
        if (oldValue !== value)
        {
            _internal_kya_tnkr_desc = value;
        }
    }

    public function set kya_type(value:String) : void
    {
        var oldValue:String = _internal_kya_type;
        if (oldValue !== value)
        {
            _internal_kya_type = value;
        }
    }

    public function set kya_psnl_cmpy_name(value:String) : void
    {
        var oldValue:String = _internal_kya_psnl_cmpy_name;
        if (oldValue !== value)
        {
            _internal_kya_psnl_cmpy_name = value;
        }
    }

    public function set kya_lock(value:String) : void
    {
        var oldValue:String = _internal_kya_lock;
        if (oldValue !== value)
        {
            _internal_kya_lock = value;
        }
    }

    public function set kya_key_no(value:String) : void
    {
        var oldValue:String = _internal_kya_key_no;
        if (oldValue !== value)
        {
            _internal_kya_key_no = value;
        }
    }

    public function set kya_supplier(value:String) : void
    {
        var oldValue:String = _internal_kya_supplier;
        if (oldValue !== value)
        {
            _internal_kya_supplier = value;
        }
    }

    public function set kya_site_name(value:Object) : void
    {
        var oldValue:Object = _internal_kya_site_name;
        if (oldValue !== value)
        {
            _internal_kya_site_name = value;
        }
    }

    public function set kya_load_site(value:Object) : void
    {
        var oldValue:Object = _internal_kya_load_site;
        if (oldValue !== value)
        {
            _internal_kya_load_site = value;
        }
    }

    public function set kya_tnkr_cmpy_name(value:String) : void
    {
        var oldValue:String = _internal_kya_tnkr_cmpy_name;
        if (oldValue !== value)
        {
            _internal_kya_tnkr_cmpy_name = value;
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

    model_internal function setterListenerKya_equipment(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_equipment();
    }

    model_internal function setterListenerKya_key_issuer(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_key_issuer();
    }

    model_internal function setterListenerKya_type_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_type_name();
    }

    model_internal function setterListenerKya_personnel(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_personnel();
    }

    model_internal function setterListenerKya_psnl_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_psnl_name();
    }

    model_internal function setterListenerKya_role(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_role();
    }

    model_internal function setterListenerKya_tnkr_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_tnkr_name();
    }

    model_internal function setterListenerKya_alloc_type_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_alloc_type_name();
    }

    model_internal function setterListenerKya_tanker(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_tanker();
    }

    model_internal function setterListenerKya_cust_ordno(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_cust_ordno();
    }

    model_internal function setterListenerKya_tnkr_cmpy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_tnkr_cmpy();
    }

    model_internal function setterListenerKya_role_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_role_name();
    }

    model_internal function setterListenerKya_drawer(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_drawer();
    }

    model_internal function setterListenerKya_issuer_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_issuer_name();
    }

    model_internal function setterListenerKya_key_created(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_key_created();
    }

    model_internal function setterListenerKya_pin_changed(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_pin_changed();
    }

    model_internal function setterListenerKya_eqpt_cmpy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_eqpt_cmpy();
    }

    model_internal function setterListenerKya_adhoc(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_adhoc();
    }

    model_internal function setterListenerKya_alloc_type(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_alloc_type();
    }

    model_internal function setterListenerKya_etyp_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_etyp_name();
    }

    model_internal function setterListenerKya_eqpt_cmpy_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_eqpt_cmpy_name();
    }

    model_internal function setterListenerKya_draw_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_draw_name();
    }

    model_internal function setterListenerKya_cust_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_cust_name();
    }

    model_internal function setterListenerKya_alloc_cmpy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_alloc_cmpy();
    }

    model_internal function setterListenerKya_eqpt_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_eqpt_name();
    }

    model_internal function setterListenerKya_phys_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_phys_name();
    }

    model_internal function setterListenerKya_order_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_order_no();
    }

    model_internal function setterListenerKya_txt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_txt();
    }

    model_internal function setterListenerKya_trip_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_trip_no();
    }

    model_internal function setterListenerKya_timecode(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_timecode();
    }

    model_internal function setterListenerKya_psnl_cmpy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_psnl_cmpy();
    }

    model_internal function setterListenerKya_load_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_load_id();
    }

    model_internal function setterListenerKya_order_desc(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_order_desc();
    }

    model_internal function setterListenerKya_supp_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_supp_name();
    }

    model_internal function setterListenerKya_alloc_cmpy_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_alloc_cmpy_name();
    }

    model_internal function setterListenerKya_pin(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_pin();
    }

    model_internal function setterListenerKya_phys_type(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_phys_type();
    }

    model_internal function setterListenerKya_eqpt_desc(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_eqpt_desc();
    }

    model_internal function setterListenerKya_tnkr_desc(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_tnkr_desc();
    }

    model_internal function setterListenerKya_type(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_type();
    }

    model_internal function setterListenerKya_psnl_cmpy_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_psnl_cmpy_name();
    }

    model_internal function setterListenerKya_lock(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_lock();
    }

    model_internal function setterListenerKya_key_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_key_no();
    }

    model_internal function setterListenerKya_supplier(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_supplier();
    }

    model_internal function setterListenerKya_site_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_site_name();
    }

    model_internal function setterListenerKya_load_site(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_load_site();
    }

    model_internal function setterListenerKya_tnkr_cmpy_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnKya_tnkr_cmpy_name();
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
        if (!_model.kya_equipmentIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_equipmentValidationFailureMessages);
        }
        if (!_model.kya_key_issuerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_key_issuerValidationFailureMessages);
        }
        if (!_model.kya_type_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_type_nameValidationFailureMessages);
        }
        if (!_model.kya_personnelIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_personnelValidationFailureMessages);
        }
        if (!_model.kya_psnl_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_psnl_nameValidationFailureMessages);
        }
        if (!_model.kya_roleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_roleValidationFailureMessages);
        }
        if (!_model.kya_tnkr_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_tnkr_nameValidationFailureMessages);
        }
        if (!_model.kya_alloc_type_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_alloc_type_nameValidationFailureMessages);
        }
        if (!_model.kya_tankerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_tankerValidationFailureMessages);
        }
        if (!_model.kya_cust_ordnoIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_cust_ordnoValidationFailureMessages);
        }
        if (!_model.kya_tnkr_cmpyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_tnkr_cmpyValidationFailureMessages);
        }
        if (!_model.kya_role_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_role_nameValidationFailureMessages);
        }
        if (!_model.kya_drawerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_drawerValidationFailureMessages);
        }
        if (!_model.kya_issuer_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_issuer_nameValidationFailureMessages);
        }
        if (!_model.kya_key_createdIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_key_createdValidationFailureMessages);
        }
        if (!_model.kya_pin_changedIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_pin_changedValidationFailureMessages);
        }
        if (!_model.kya_eqpt_cmpyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_eqpt_cmpyValidationFailureMessages);
        }
        if (!_model.kya_adhocIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_adhocValidationFailureMessages);
        }
        if (!_model.kya_alloc_typeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_alloc_typeValidationFailureMessages);
        }
        if (!_model.kya_etyp_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_etyp_nameValidationFailureMessages);
        }
        if (!_model.kya_eqpt_cmpy_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_eqpt_cmpy_nameValidationFailureMessages);
        }
        if (!_model.kya_draw_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_draw_nameValidationFailureMessages);
        }
        if (!_model.kya_cust_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_cust_nameValidationFailureMessages);
        }
        if (!_model.kya_alloc_cmpyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_alloc_cmpyValidationFailureMessages);
        }
        if (!_model.kya_eqpt_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_eqpt_nameValidationFailureMessages);
        }
        if (!_model.kya_phys_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_phys_nameValidationFailureMessages);
        }
        if (!_model.kya_order_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_order_noValidationFailureMessages);
        }
        if (!_model.kya_txtIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_txtValidationFailureMessages);
        }
        if (!_model.kya_trip_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_trip_noValidationFailureMessages);
        }
        if (!_model.kya_timecodeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_timecodeValidationFailureMessages);
        }
        if (!_model.kya_psnl_cmpyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_psnl_cmpyValidationFailureMessages);
        }
        if (!_model.kya_load_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_load_idValidationFailureMessages);
        }
        if (!_model.kya_order_descIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_order_descValidationFailureMessages);
        }
        if (!_model.kya_supp_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_supp_nameValidationFailureMessages);
        }
        if (!_model.kya_alloc_cmpy_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_alloc_cmpy_nameValidationFailureMessages);
        }
        if (!_model.kya_pinIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_pinValidationFailureMessages);
        }
        if (!_model.kya_phys_typeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_phys_typeValidationFailureMessages);
        }
        if (!_model.kya_eqpt_descIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_eqpt_descValidationFailureMessages);
        }
        if (!_model.kya_tnkr_descIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_tnkr_descValidationFailureMessages);
        }
        if (!_model.kya_typeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_typeValidationFailureMessages);
        }
        if (!_model.kya_psnl_cmpy_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_psnl_cmpy_nameValidationFailureMessages);
        }
        if (!_model.kya_lockIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_lockValidationFailureMessages);
        }
        if (!_model.kya_key_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_key_noValidationFailureMessages);
        }
        if (!_model.kya_supplierIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_supplierValidationFailureMessages);
        }
        if (!_model.kya_site_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_site_nameValidationFailureMessages);
        }
        if (!_model.kya_load_siteIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_load_siteValidationFailureMessages);
        }
        if (!_model.kya_tnkr_cmpy_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_kya_tnkr_cmpy_nameValidationFailureMessages);
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
    public function get _model() : _GUI_AccessKeysEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _GUI_AccessKeysEntityMetadata) : void
    {
        var oldValue : _GUI_AccessKeysEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfKya_equipment : Array = null;
    model_internal var _doValidationLastValOfKya_equipment : Object;

    model_internal function _doValidationForKya_equipment(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_equipment != null && model_internal::_doValidationLastValOfKya_equipment == value)
           return model_internal::_doValidationCacheOfKya_equipment ;

        _model.model_internal::_kya_equipmentIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_equipmentAvailable && _internal_kya_equipment == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_equipment is required"));
        }

        model_internal::_doValidationCacheOfKya_equipment = validationFailures;
        model_internal::_doValidationLastValOfKya_equipment = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_key_issuer : Array = null;
    model_internal var _doValidationLastValOfKya_key_issuer : String;

    model_internal function _doValidationForKya_key_issuer(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_key_issuer != null && model_internal::_doValidationLastValOfKya_key_issuer == value)
           return model_internal::_doValidationCacheOfKya_key_issuer ;

        _model.model_internal::_kya_key_issuerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_key_issuerAvailable && _internal_kya_key_issuer == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_key_issuer is required"));
        }

        model_internal::_doValidationCacheOfKya_key_issuer = validationFailures;
        model_internal::_doValidationLastValOfKya_key_issuer = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_type_name : Array = null;
    model_internal var _doValidationLastValOfKya_type_name : String;

    model_internal function _doValidationForKya_type_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_type_name != null && model_internal::_doValidationLastValOfKya_type_name == value)
           return model_internal::_doValidationCacheOfKya_type_name ;

        _model.model_internal::_kya_type_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_type_nameAvailable && _internal_kya_type_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_type_name is required"));
        }

        model_internal::_doValidationCacheOfKya_type_name = validationFailures;
        model_internal::_doValidationLastValOfKya_type_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_personnel : Array = null;
    model_internal var _doValidationLastValOfKya_personnel : String;

    model_internal function _doValidationForKya_personnel(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_personnel != null && model_internal::_doValidationLastValOfKya_personnel == value)
           return model_internal::_doValidationCacheOfKya_personnel ;

        _model.model_internal::_kya_personnelIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_personnelAvailable && _internal_kya_personnel == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_personnel is required"));
        }

        model_internal::_doValidationCacheOfKya_personnel = validationFailures;
        model_internal::_doValidationLastValOfKya_personnel = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_psnl_name : Array = null;
    model_internal var _doValidationLastValOfKya_psnl_name : String;

    model_internal function _doValidationForKya_psnl_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_psnl_name != null && model_internal::_doValidationLastValOfKya_psnl_name == value)
           return model_internal::_doValidationCacheOfKya_psnl_name ;

        _model.model_internal::_kya_psnl_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_psnl_nameAvailable && _internal_kya_psnl_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_psnl_name is required"));
        }

        model_internal::_doValidationCacheOfKya_psnl_name = validationFailures;
        model_internal::_doValidationLastValOfKya_psnl_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_role : Array = null;
    model_internal var _doValidationLastValOfKya_role : String;

    model_internal function _doValidationForKya_role(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_role != null && model_internal::_doValidationLastValOfKya_role == value)
           return model_internal::_doValidationCacheOfKya_role ;

        _model.model_internal::_kya_roleIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_roleAvailable && _internal_kya_role == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_role is required"));
        }

        model_internal::_doValidationCacheOfKya_role = validationFailures;
        model_internal::_doValidationLastValOfKya_role = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_tnkr_name : Array = null;
    model_internal var _doValidationLastValOfKya_tnkr_name : Object;

    model_internal function _doValidationForKya_tnkr_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_tnkr_name != null && model_internal::_doValidationLastValOfKya_tnkr_name == value)
           return model_internal::_doValidationCacheOfKya_tnkr_name ;

        _model.model_internal::_kya_tnkr_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_tnkr_nameAvailable && _internal_kya_tnkr_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_tnkr_name is required"));
        }

        model_internal::_doValidationCacheOfKya_tnkr_name = validationFailures;
        model_internal::_doValidationLastValOfKya_tnkr_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_alloc_type_name : Array = null;
    model_internal var _doValidationLastValOfKya_alloc_type_name : Object;

    model_internal function _doValidationForKya_alloc_type_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_alloc_type_name != null && model_internal::_doValidationLastValOfKya_alloc_type_name == value)
           return model_internal::_doValidationCacheOfKya_alloc_type_name ;

        _model.model_internal::_kya_alloc_type_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_alloc_type_nameAvailable && _internal_kya_alloc_type_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_alloc_type_name is required"));
        }

        model_internal::_doValidationCacheOfKya_alloc_type_name = validationFailures;
        model_internal::_doValidationLastValOfKya_alloc_type_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_tanker : Array = null;
    model_internal var _doValidationLastValOfKya_tanker : String;

    model_internal function _doValidationForKya_tanker(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_tanker != null && model_internal::_doValidationLastValOfKya_tanker == value)
           return model_internal::_doValidationCacheOfKya_tanker ;

        _model.model_internal::_kya_tankerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_tankerAvailable && _internal_kya_tanker == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_tanker is required"));
        }

        model_internal::_doValidationCacheOfKya_tanker = validationFailures;
        model_internal::_doValidationLastValOfKya_tanker = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_cust_ordno : Array = null;
    model_internal var _doValidationLastValOfKya_cust_ordno : Object;

    model_internal function _doValidationForKya_cust_ordno(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_cust_ordno != null && model_internal::_doValidationLastValOfKya_cust_ordno == value)
           return model_internal::_doValidationCacheOfKya_cust_ordno ;

        _model.model_internal::_kya_cust_ordnoIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_cust_ordnoAvailable && _internal_kya_cust_ordno == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_cust_ordno is required"));
        }

        model_internal::_doValidationCacheOfKya_cust_ordno = validationFailures;
        model_internal::_doValidationLastValOfKya_cust_ordno = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_tnkr_cmpy : Array = null;
    model_internal var _doValidationLastValOfKya_tnkr_cmpy : String;

    model_internal function _doValidationForKya_tnkr_cmpy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_tnkr_cmpy != null && model_internal::_doValidationLastValOfKya_tnkr_cmpy == value)
           return model_internal::_doValidationCacheOfKya_tnkr_cmpy ;

        _model.model_internal::_kya_tnkr_cmpyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_tnkr_cmpyAvailable && _internal_kya_tnkr_cmpy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_tnkr_cmpy is required"));
        }

        model_internal::_doValidationCacheOfKya_tnkr_cmpy = validationFailures;
        model_internal::_doValidationLastValOfKya_tnkr_cmpy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_role_name : Array = null;
    model_internal var _doValidationLastValOfKya_role_name : String;

    model_internal function _doValidationForKya_role_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_role_name != null && model_internal::_doValidationLastValOfKya_role_name == value)
           return model_internal::_doValidationCacheOfKya_role_name ;

        _model.model_internal::_kya_role_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_role_nameAvailable && _internal_kya_role_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_role_name is required"));
        }

        model_internal::_doValidationCacheOfKya_role_name = validationFailures;
        model_internal::_doValidationLastValOfKya_role_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_drawer : Array = null;
    model_internal var _doValidationLastValOfKya_drawer : String;

    model_internal function _doValidationForKya_drawer(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_drawer != null && model_internal::_doValidationLastValOfKya_drawer == value)
           return model_internal::_doValidationCacheOfKya_drawer ;

        _model.model_internal::_kya_drawerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_drawerAvailable && _internal_kya_drawer == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_drawer is required"));
        }

        model_internal::_doValidationCacheOfKya_drawer = validationFailures;
        model_internal::_doValidationLastValOfKya_drawer = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_issuer_name : Array = null;
    model_internal var _doValidationLastValOfKya_issuer_name : String;

    model_internal function _doValidationForKya_issuer_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_issuer_name != null && model_internal::_doValidationLastValOfKya_issuer_name == value)
           return model_internal::_doValidationCacheOfKya_issuer_name ;

        _model.model_internal::_kya_issuer_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_issuer_nameAvailable && _internal_kya_issuer_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_issuer_name is required"));
        }

        model_internal::_doValidationCacheOfKya_issuer_name = validationFailures;
        model_internal::_doValidationLastValOfKya_issuer_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_key_created : Array = null;
    model_internal var _doValidationLastValOfKya_key_created : String;

    model_internal function _doValidationForKya_key_created(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_key_created != null && model_internal::_doValidationLastValOfKya_key_created == value)
           return model_internal::_doValidationCacheOfKya_key_created ;

        _model.model_internal::_kya_key_createdIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_key_createdAvailable && _internal_kya_key_created == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_key_created is required"));
        }

        model_internal::_doValidationCacheOfKya_key_created = validationFailures;
        model_internal::_doValidationLastValOfKya_key_created = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_pin_changed : Array = null;
    model_internal var _doValidationLastValOfKya_pin_changed : Object;

    model_internal function _doValidationForKya_pin_changed(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_pin_changed != null && model_internal::_doValidationLastValOfKya_pin_changed == value)
           return model_internal::_doValidationCacheOfKya_pin_changed ;

        _model.model_internal::_kya_pin_changedIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_pin_changedAvailable && _internal_kya_pin_changed == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_pin_changed is required"));
        }

        model_internal::_doValidationCacheOfKya_pin_changed = validationFailures;
        model_internal::_doValidationLastValOfKya_pin_changed = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_eqpt_cmpy : Array = null;
    model_internal var _doValidationLastValOfKya_eqpt_cmpy : Object;

    model_internal function _doValidationForKya_eqpt_cmpy(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_eqpt_cmpy != null && model_internal::_doValidationLastValOfKya_eqpt_cmpy == value)
           return model_internal::_doValidationCacheOfKya_eqpt_cmpy ;

        _model.model_internal::_kya_eqpt_cmpyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_eqpt_cmpyAvailable && _internal_kya_eqpt_cmpy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_eqpt_cmpy is required"));
        }

        model_internal::_doValidationCacheOfKya_eqpt_cmpy = validationFailures;
        model_internal::_doValidationLastValOfKya_eqpt_cmpy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_adhoc : Array = null;
    model_internal var _doValidationLastValOfKya_adhoc : String;

    model_internal function _doValidationForKya_adhoc(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_adhoc != null && model_internal::_doValidationLastValOfKya_adhoc == value)
           return model_internal::_doValidationCacheOfKya_adhoc ;

        _model.model_internal::_kya_adhocIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_adhocAvailable && _internal_kya_adhoc == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_adhoc is required"));
        }

        model_internal::_doValidationCacheOfKya_adhoc = validationFailures;
        model_internal::_doValidationLastValOfKya_adhoc = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_alloc_type : Array = null;
    model_internal var _doValidationLastValOfKya_alloc_type : Object;

    model_internal function _doValidationForKya_alloc_type(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_alloc_type != null && model_internal::_doValidationLastValOfKya_alloc_type == value)
           return model_internal::_doValidationCacheOfKya_alloc_type ;

        _model.model_internal::_kya_alloc_typeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_alloc_typeAvailable && _internal_kya_alloc_type == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_alloc_type is required"));
        }

        model_internal::_doValidationCacheOfKya_alloc_type = validationFailures;
        model_internal::_doValidationLastValOfKya_alloc_type = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_etyp_name : Array = null;
    model_internal var _doValidationLastValOfKya_etyp_name : Object;

    model_internal function _doValidationForKya_etyp_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_etyp_name != null && model_internal::_doValidationLastValOfKya_etyp_name == value)
           return model_internal::_doValidationCacheOfKya_etyp_name ;

        _model.model_internal::_kya_etyp_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_etyp_nameAvailable && _internal_kya_etyp_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_etyp_name is required"));
        }

        model_internal::_doValidationCacheOfKya_etyp_name = validationFailures;
        model_internal::_doValidationLastValOfKya_etyp_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_eqpt_cmpy_name : Array = null;
    model_internal var _doValidationLastValOfKya_eqpt_cmpy_name : Object;

    model_internal function _doValidationForKya_eqpt_cmpy_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_eqpt_cmpy_name != null && model_internal::_doValidationLastValOfKya_eqpt_cmpy_name == value)
           return model_internal::_doValidationCacheOfKya_eqpt_cmpy_name ;

        _model.model_internal::_kya_eqpt_cmpy_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_eqpt_cmpy_nameAvailable && _internal_kya_eqpt_cmpy_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_eqpt_cmpy_name is required"));
        }

        model_internal::_doValidationCacheOfKya_eqpt_cmpy_name = validationFailures;
        model_internal::_doValidationLastValOfKya_eqpt_cmpy_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_draw_name : Array = null;
    model_internal var _doValidationLastValOfKya_draw_name : String;

    model_internal function _doValidationForKya_draw_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_draw_name != null && model_internal::_doValidationLastValOfKya_draw_name == value)
           return model_internal::_doValidationCacheOfKya_draw_name ;

        _model.model_internal::_kya_draw_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_draw_nameAvailable && _internal_kya_draw_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_draw_name is required"));
        }

        model_internal::_doValidationCacheOfKya_draw_name = validationFailures;
        model_internal::_doValidationLastValOfKya_draw_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_cust_name : Array = null;
    model_internal var _doValidationLastValOfKya_cust_name : Object;

    model_internal function _doValidationForKya_cust_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_cust_name != null && model_internal::_doValidationLastValOfKya_cust_name == value)
           return model_internal::_doValidationCacheOfKya_cust_name ;

        _model.model_internal::_kya_cust_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_cust_nameAvailable && _internal_kya_cust_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_cust_name is required"));
        }

        model_internal::_doValidationCacheOfKya_cust_name = validationFailures;
        model_internal::_doValidationLastValOfKya_cust_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_alloc_cmpy : Array = null;
    model_internal var _doValidationLastValOfKya_alloc_cmpy : Object;

    model_internal function _doValidationForKya_alloc_cmpy(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_alloc_cmpy != null && model_internal::_doValidationLastValOfKya_alloc_cmpy == value)
           return model_internal::_doValidationCacheOfKya_alloc_cmpy ;

        _model.model_internal::_kya_alloc_cmpyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_alloc_cmpyAvailable && _internal_kya_alloc_cmpy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_alloc_cmpy is required"));
        }

        model_internal::_doValidationCacheOfKya_alloc_cmpy = validationFailures;
        model_internal::_doValidationLastValOfKya_alloc_cmpy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_eqpt_name : Array = null;
    model_internal var _doValidationLastValOfKya_eqpt_name : Object;

    model_internal function _doValidationForKya_eqpt_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_eqpt_name != null && model_internal::_doValidationLastValOfKya_eqpt_name == value)
           return model_internal::_doValidationCacheOfKya_eqpt_name ;

        _model.model_internal::_kya_eqpt_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_eqpt_nameAvailable && _internal_kya_eqpt_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_eqpt_name is required"));
        }

        model_internal::_doValidationCacheOfKya_eqpt_name = validationFailures;
        model_internal::_doValidationLastValOfKya_eqpt_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_phys_name : Array = null;
    model_internal var _doValidationLastValOfKya_phys_name : String;

    model_internal function _doValidationForKya_phys_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_phys_name != null && model_internal::_doValidationLastValOfKya_phys_name == value)
           return model_internal::_doValidationCacheOfKya_phys_name ;

        _model.model_internal::_kya_phys_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_phys_nameAvailable && _internal_kya_phys_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_phys_name is required"));
        }

        model_internal::_doValidationCacheOfKya_phys_name = validationFailures;
        model_internal::_doValidationLastValOfKya_phys_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_order_no : Array = null;
    model_internal var _doValidationLastValOfKya_order_no : Object;

    model_internal function _doValidationForKya_order_no(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_order_no != null && model_internal::_doValidationLastValOfKya_order_no == value)
           return model_internal::_doValidationCacheOfKya_order_no ;

        _model.model_internal::_kya_order_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_order_noAvailable && _internal_kya_order_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_order_no is required"));
        }

        model_internal::_doValidationCacheOfKya_order_no = validationFailures;
        model_internal::_doValidationLastValOfKya_order_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_txt : Array = null;
    model_internal var _doValidationLastValOfKya_txt : String;

    model_internal function _doValidationForKya_txt(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_txt != null && model_internal::_doValidationLastValOfKya_txt == value)
           return model_internal::_doValidationCacheOfKya_txt ;

        _model.model_internal::_kya_txtIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_txtAvailable && _internal_kya_txt == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_txt is required"));
        }

        model_internal::_doValidationCacheOfKya_txt = validationFailures;
        model_internal::_doValidationLastValOfKya_txt = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_trip_no : Array = null;
    model_internal var _doValidationLastValOfKya_trip_no : Object;

    model_internal function _doValidationForKya_trip_no(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_trip_no != null && model_internal::_doValidationLastValOfKya_trip_no == value)
           return model_internal::_doValidationCacheOfKya_trip_no ;

        _model.model_internal::_kya_trip_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_trip_noAvailable && _internal_kya_trip_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_trip_no is required"));
        }

        model_internal::_doValidationCacheOfKya_trip_no = validationFailures;
        model_internal::_doValidationLastValOfKya_trip_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_timecode : Array = null;
    model_internal var _doValidationLastValOfKya_timecode : String;

    model_internal function _doValidationForKya_timecode(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_timecode != null && model_internal::_doValidationLastValOfKya_timecode == value)
           return model_internal::_doValidationCacheOfKya_timecode ;

        _model.model_internal::_kya_timecodeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_timecodeAvailable && _internal_kya_timecode == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_timecode is required"));
        }

        model_internal::_doValidationCacheOfKya_timecode = validationFailures;
        model_internal::_doValidationLastValOfKya_timecode = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_psnl_cmpy : Array = null;
    model_internal var _doValidationLastValOfKya_psnl_cmpy : String;

    model_internal function _doValidationForKya_psnl_cmpy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_psnl_cmpy != null && model_internal::_doValidationLastValOfKya_psnl_cmpy == value)
           return model_internal::_doValidationCacheOfKya_psnl_cmpy ;

        _model.model_internal::_kya_psnl_cmpyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_psnl_cmpyAvailable && _internal_kya_psnl_cmpy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_psnl_cmpy is required"));
        }

        model_internal::_doValidationCacheOfKya_psnl_cmpy = validationFailures;
        model_internal::_doValidationLastValOfKya_psnl_cmpy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_load_id : Array = null;
    model_internal var _doValidationLastValOfKya_load_id : Object;

    model_internal function _doValidationForKya_load_id(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_load_id != null && model_internal::_doValidationLastValOfKya_load_id == value)
           return model_internal::_doValidationCacheOfKya_load_id ;

        _model.model_internal::_kya_load_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_load_idAvailable && _internal_kya_load_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_load_id is required"));
        }

        model_internal::_doValidationCacheOfKya_load_id = validationFailures;
        model_internal::_doValidationLastValOfKya_load_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_order_desc : Array = null;
    model_internal var _doValidationLastValOfKya_order_desc : String;

    model_internal function _doValidationForKya_order_desc(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_order_desc != null && model_internal::_doValidationLastValOfKya_order_desc == value)
           return model_internal::_doValidationCacheOfKya_order_desc ;

        _model.model_internal::_kya_order_descIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_order_descAvailable && _internal_kya_order_desc == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_order_desc is required"));
        }

        model_internal::_doValidationCacheOfKya_order_desc = validationFailures;
        model_internal::_doValidationLastValOfKya_order_desc = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_supp_name : Array = null;
    model_internal var _doValidationLastValOfKya_supp_name : String;

    model_internal function _doValidationForKya_supp_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_supp_name != null && model_internal::_doValidationLastValOfKya_supp_name == value)
           return model_internal::_doValidationCacheOfKya_supp_name ;

        _model.model_internal::_kya_supp_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_supp_nameAvailable && _internal_kya_supp_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_supp_name is required"));
        }

        model_internal::_doValidationCacheOfKya_supp_name = validationFailures;
        model_internal::_doValidationLastValOfKya_supp_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_alloc_cmpy_name : Array = null;
    model_internal var _doValidationLastValOfKya_alloc_cmpy_name : Object;

    model_internal function _doValidationForKya_alloc_cmpy_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_alloc_cmpy_name != null && model_internal::_doValidationLastValOfKya_alloc_cmpy_name == value)
           return model_internal::_doValidationCacheOfKya_alloc_cmpy_name ;

        _model.model_internal::_kya_alloc_cmpy_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_alloc_cmpy_nameAvailable && _internal_kya_alloc_cmpy_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_alloc_cmpy_name is required"));
        }

        model_internal::_doValidationCacheOfKya_alloc_cmpy_name = validationFailures;
        model_internal::_doValidationLastValOfKya_alloc_cmpy_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_pin : Array = null;
    model_internal var _doValidationLastValOfKya_pin : Object;

    model_internal function _doValidationForKya_pin(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_pin != null && model_internal::_doValidationLastValOfKya_pin == value)
           return model_internal::_doValidationCacheOfKya_pin ;

        _model.model_internal::_kya_pinIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_pinAvailable && _internal_kya_pin == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_pin is required"));
        }

        model_internal::_doValidationCacheOfKya_pin = validationFailures;
        model_internal::_doValidationLastValOfKya_pin = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_phys_type : Array = null;
    model_internal var _doValidationLastValOfKya_phys_type : String;

    model_internal function _doValidationForKya_phys_type(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_phys_type != null && model_internal::_doValidationLastValOfKya_phys_type == value)
           return model_internal::_doValidationCacheOfKya_phys_type ;

        _model.model_internal::_kya_phys_typeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_phys_typeAvailable && _internal_kya_phys_type == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_phys_type is required"));
        }

        model_internal::_doValidationCacheOfKya_phys_type = validationFailures;
        model_internal::_doValidationLastValOfKya_phys_type = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_eqpt_desc : Array = null;
    model_internal var _doValidationLastValOfKya_eqpt_desc : Object;

    model_internal function _doValidationForKya_eqpt_desc(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_eqpt_desc != null && model_internal::_doValidationLastValOfKya_eqpt_desc == value)
           return model_internal::_doValidationCacheOfKya_eqpt_desc ;

        _model.model_internal::_kya_eqpt_descIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_eqpt_descAvailable && _internal_kya_eqpt_desc == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_eqpt_desc is required"));
        }

        model_internal::_doValidationCacheOfKya_eqpt_desc = validationFailures;
        model_internal::_doValidationLastValOfKya_eqpt_desc = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_tnkr_desc : Array = null;
    model_internal var _doValidationLastValOfKya_tnkr_desc : String;

    model_internal function _doValidationForKya_tnkr_desc(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_tnkr_desc != null && model_internal::_doValidationLastValOfKya_tnkr_desc == value)
           return model_internal::_doValidationCacheOfKya_tnkr_desc ;

        _model.model_internal::_kya_tnkr_descIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_tnkr_descAvailable && _internal_kya_tnkr_desc == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_tnkr_desc is required"));
        }

        model_internal::_doValidationCacheOfKya_tnkr_desc = validationFailures;
        model_internal::_doValidationLastValOfKya_tnkr_desc = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_type : Array = null;
    model_internal var _doValidationLastValOfKya_type : String;

    model_internal function _doValidationForKya_type(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_type != null && model_internal::_doValidationLastValOfKya_type == value)
           return model_internal::_doValidationCacheOfKya_type ;

        _model.model_internal::_kya_typeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_typeAvailable && _internal_kya_type == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_type is required"));
        }

        model_internal::_doValidationCacheOfKya_type = validationFailures;
        model_internal::_doValidationLastValOfKya_type = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_psnl_cmpy_name : Array = null;
    model_internal var _doValidationLastValOfKya_psnl_cmpy_name : String;

    model_internal function _doValidationForKya_psnl_cmpy_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_psnl_cmpy_name != null && model_internal::_doValidationLastValOfKya_psnl_cmpy_name == value)
           return model_internal::_doValidationCacheOfKya_psnl_cmpy_name ;

        _model.model_internal::_kya_psnl_cmpy_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_psnl_cmpy_nameAvailable && _internal_kya_psnl_cmpy_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_psnl_cmpy_name is required"));
        }

        model_internal::_doValidationCacheOfKya_psnl_cmpy_name = validationFailures;
        model_internal::_doValidationLastValOfKya_psnl_cmpy_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_lock : Array = null;
    model_internal var _doValidationLastValOfKya_lock : String;

    model_internal function _doValidationForKya_lock(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_lock != null && model_internal::_doValidationLastValOfKya_lock == value)
           return model_internal::_doValidationCacheOfKya_lock ;

        _model.model_internal::_kya_lockIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_lockAvailable && _internal_kya_lock == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_lock is required"));
        }

        model_internal::_doValidationCacheOfKya_lock = validationFailures;
        model_internal::_doValidationLastValOfKya_lock = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_key_no : Array = null;
    model_internal var _doValidationLastValOfKya_key_no : String;

    model_internal function _doValidationForKya_key_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_key_no != null && model_internal::_doValidationLastValOfKya_key_no == value)
           return model_internal::_doValidationCacheOfKya_key_no ;

        _model.model_internal::_kya_key_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_key_noAvailable && _internal_kya_key_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_key_no is required"));
        }

        model_internal::_doValidationCacheOfKya_key_no = validationFailures;
        model_internal::_doValidationLastValOfKya_key_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_supplier : Array = null;
    model_internal var _doValidationLastValOfKya_supplier : String;

    model_internal function _doValidationForKya_supplier(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_supplier != null && model_internal::_doValidationLastValOfKya_supplier == value)
           return model_internal::_doValidationCacheOfKya_supplier ;

        _model.model_internal::_kya_supplierIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_supplierAvailable && _internal_kya_supplier == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_supplier is required"));
        }

        model_internal::_doValidationCacheOfKya_supplier = validationFailures;
        model_internal::_doValidationLastValOfKya_supplier = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_site_name : Array = null;
    model_internal var _doValidationLastValOfKya_site_name : Object;

    model_internal function _doValidationForKya_site_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_site_name != null && model_internal::_doValidationLastValOfKya_site_name == value)
           return model_internal::_doValidationCacheOfKya_site_name ;

        _model.model_internal::_kya_site_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_site_nameAvailable && _internal_kya_site_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_site_name is required"));
        }

        model_internal::_doValidationCacheOfKya_site_name = validationFailures;
        model_internal::_doValidationLastValOfKya_site_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_load_site : Array = null;
    model_internal var _doValidationLastValOfKya_load_site : Object;

    model_internal function _doValidationForKya_load_site(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfKya_load_site != null && model_internal::_doValidationLastValOfKya_load_site == value)
           return model_internal::_doValidationCacheOfKya_load_site ;

        _model.model_internal::_kya_load_siteIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_load_siteAvailable && _internal_kya_load_site == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_load_site is required"));
        }

        model_internal::_doValidationCacheOfKya_load_site = validationFailures;
        model_internal::_doValidationLastValOfKya_load_site = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfKya_tnkr_cmpy_name : Array = null;
    model_internal var _doValidationLastValOfKya_tnkr_cmpy_name : String;

    model_internal function _doValidationForKya_tnkr_cmpy_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfKya_tnkr_cmpy_name != null && model_internal::_doValidationLastValOfKya_tnkr_cmpy_name == value)
           return model_internal::_doValidationCacheOfKya_tnkr_cmpy_name ;

        _model.model_internal::_kya_tnkr_cmpy_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isKya_tnkr_cmpy_nameAvailable && _internal_kya_tnkr_cmpy_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "kya_tnkr_cmpy_name is required"));
        }

        model_internal::_doValidationCacheOfKya_tnkr_cmpy_name = validationFailures;
        model_internal::_doValidationLastValOfKya_tnkr_cmpy_name = value;

        return validationFailures;
    }
    

}

}
