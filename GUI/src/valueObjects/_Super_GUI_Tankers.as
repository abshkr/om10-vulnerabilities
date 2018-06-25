/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - GUI_Tankers.as.
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
public class _Super_GUI_Tankers extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("GUI_Tankers") == null)
            {
                flash.net.registerClassAlias("GUI_Tankers", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("GUI_Tankers", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _GUI_TankersEntityMetadata;
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
    private var _internal_etyp_category : Object;
    private var _internal_tnkr_base_site_name : String;
    private var _internal_tnkr_stats : String;
    private var _internal_tnkr_cur_depot_name : String;
    private var _internal_rn : String;
    private var _internal_tnkr_eqpt_name : String;
    private var _internal_tnkr_owner : String;
    private var _internal_tnkr_last_trip : String;
    private var _internal_tnkr_base_site : String;
    private var _internal_tnkr_dglic_exp : Object;
    private var _internal_remarks : Object;
    private var _internal_tnkr_pin : Object;
    private var _internal_tnkr_ntrips : String;
    private var _internal_tnkr_max_kg : Object;
    private var _internal_tnkr_carrier_name : String;
    private var _internal_tnkr_ins_exp : Object;
    private var _internal_tnkr_dest_depot : Object;
    private var _internal_tnkr_cur_depot : String;
    private var _internal_tnkr_last_depot : String;
    private var _internal_composition : Object;
    private var _internal_tnkr_archive : String;
    private var _internal_tnkr_name : Object;
    private var _internal_tnkr_etp : String;
    private var _internal_tnkr_last_depot_name : String;
    private var _internal_tnkr_lic_exp : Object;
    private var _internal_tnkr_lock : String;
    private var _internal_tnkr_code : String;
    private var _internal_tnkr_bay_loop_ch : String;
    private var _internal_tnkr_own_txt : String;
    private var _internal_tnkr_dest_depot_name : Object;
    private var _internal_tnkr_owner_name : String;
    private var _internal_tnkr_carrier : String;
    private var _internal_tnkr_active : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_GUI_Tankers()
    {
        _model = new _GUI_TankersEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_category", model_internal::setterListenerEtyp_category));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_base_site_name", model_internal::setterListenerTnkr_base_site_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_stats", model_internal::setterListenerTnkr_stats));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_cur_depot_name", model_internal::setterListenerTnkr_cur_depot_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "rn", model_internal::setterListenerRn));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_eqpt_name", model_internal::setterListenerTnkr_eqpt_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_owner", model_internal::setterListenerTnkr_owner));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_last_trip", model_internal::setterListenerTnkr_last_trip));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_base_site", model_internal::setterListenerTnkr_base_site));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_dglic_exp", model_internal::setterListenerTnkr_dglic_exp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "remarks", model_internal::setterListenerRemarks));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_pin", model_internal::setterListenerTnkr_pin));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_ntrips", model_internal::setterListenerTnkr_ntrips));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_max_kg", model_internal::setterListenerTnkr_max_kg));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_carrier_name", model_internal::setterListenerTnkr_carrier_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_ins_exp", model_internal::setterListenerTnkr_ins_exp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_dest_depot", model_internal::setterListenerTnkr_dest_depot));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_cur_depot", model_internal::setterListenerTnkr_cur_depot));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_last_depot", model_internal::setterListenerTnkr_last_depot));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "composition", model_internal::setterListenerComposition));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_archive", model_internal::setterListenerTnkr_archive));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_name", model_internal::setterListenerTnkr_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_etp", model_internal::setterListenerTnkr_etp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_last_depot_name", model_internal::setterListenerTnkr_last_depot_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_lic_exp", model_internal::setterListenerTnkr_lic_exp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_lock", model_internal::setterListenerTnkr_lock));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_code", model_internal::setterListenerTnkr_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_bay_loop_ch", model_internal::setterListenerTnkr_bay_loop_ch));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_own_txt", model_internal::setterListenerTnkr_own_txt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_dest_depot_name", model_internal::setterListenerTnkr_dest_depot_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_owner_name", model_internal::setterListenerTnkr_owner_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_carrier", model_internal::setterListenerTnkr_carrier));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tnkr_active", model_internal::setterListenerTnkr_active));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get etyp_category() : Object
    {
        return _internal_etyp_category;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_base_site_name() : String
    {
        return _internal_tnkr_base_site_name;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_stats() : String
    {
        return _internal_tnkr_stats;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_cur_depot_name() : String
    {
        return _internal_tnkr_cur_depot_name;
    }

    [Bindable(event="propertyChange")]
    public function get rn() : String
    {
        return _internal_rn;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_eqpt_name() : String
    {
        return _internal_tnkr_eqpt_name;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_owner() : String
    {
        return _internal_tnkr_owner;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_last_trip() : String
    {
        return _internal_tnkr_last_trip;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_base_site() : String
    {
        return _internal_tnkr_base_site;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_dglic_exp() : Object
    {
        return _internal_tnkr_dglic_exp;
    }

    [Bindable(event="propertyChange")]
    public function get remarks() : Object
    {
        return _internal_remarks;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_pin() : Object
    {
        return _internal_tnkr_pin;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_ntrips() : String
    {
        return _internal_tnkr_ntrips;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_max_kg() : Object
    {
        return _internal_tnkr_max_kg;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_carrier_name() : String
    {
        return _internal_tnkr_carrier_name;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_ins_exp() : Object
    {
        return _internal_tnkr_ins_exp;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_dest_depot() : Object
    {
        return _internal_tnkr_dest_depot;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_cur_depot() : String
    {
        return _internal_tnkr_cur_depot;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_last_depot() : String
    {
        return _internal_tnkr_last_depot;
    }

    [Bindable(event="propertyChange")]
    public function get composition() : Object
    {
        return _internal_composition;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_archive() : String
    {
        return _internal_tnkr_archive;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_name() : Object
    {
        return _internal_tnkr_name;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_etp() : String
    {
        return _internal_tnkr_etp;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_last_depot_name() : String
    {
        return _internal_tnkr_last_depot_name;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_lic_exp() : Object
    {
        return _internal_tnkr_lic_exp;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_lock() : String
    {
        return _internal_tnkr_lock;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_code() : String
    {
        return _internal_tnkr_code;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_bay_loop_ch() : String
    {
        return _internal_tnkr_bay_loop_ch;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_own_txt() : String
    {
        return _internal_tnkr_own_txt;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_dest_depot_name() : Object
    {
        return _internal_tnkr_dest_depot_name;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_owner_name() : String
    {
        return _internal_tnkr_owner_name;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_carrier() : String
    {
        return _internal_tnkr_carrier;
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_active() : String
    {
        return _internal_tnkr_active;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set etyp_category(value:Object) : void
    {
        var oldValue:Object = _internal_etyp_category;
        if (oldValue !== value)
        {
            _internal_etyp_category = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_category", oldValue, _internal_etyp_category));
        }
    }

    public function set tnkr_base_site_name(value:String) : void
    {
        var oldValue:String = _internal_tnkr_base_site_name;
        if (oldValue !== value)
        {
            _internal_tnkr_base_site_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_base_site_name", oldValue, _internal_tnkr_base_site_name));
        }
    }

    public function set tnkr_stats(value:String) : void
    {
        var oldValue:String = _internal_tnkr_stats;
        if (oldValue !== value)
        {
            _internal_tnkr_stats = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_stats", oldValue, _internal_tnkr_stats));
        }
    }

    public function set tnkr_cur_depot_name(value:String) : void
    {
        var oldValue:String = _internal_tnkr_cur_depot_name;
        if (oldValue !== value)
        {
            _internal_tnkr_cur_depot_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_cur_depot_name", oldValue, _internal_tnkr_cur_depot_name));
        }
    }

    public function set rn(value:String) : void
    {
        var oldValue:String = _internal_rn;
        if (oldValue !== value)
        {
            _internal_rn = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rn", oldValue, _internal_rn));
        }
    }

    public function set tnkr_eqpt_name(value:String) : void
    {
        var oldValue:String = _internal_tnkr_eqpt_name;
        if (oldValue !== value)
        {
            _internal_tnkr_eqpt_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_eqpt_name", oldValue, _internal_tnkr_eqpt_name));
        }
    }

    public function set tnkr_owner(value:String) : void
    {
        var oldValue:String = _internal_tnkr_owner;
        if (oldValue !== value)
        {
            _internal_tnkr_owner = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_owner", oldValue, _internal_tnkr_owner));
        }
    }

    public function set tnkr_last_trip(value:String) : void
    {
        var oldValue:String = _internal_tnkr_last_trip;
        if (oldValue !== value)
        {
            _internal_tnkr_last_trip = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_last_trip", oldValue, _internal_tnkr_last_trip));
        }
    }

    public function set tnkr_base_site(value:String) : void
    {
        var oldValue:String = _internal_tnkr_base_site;
        if (oldValue !== value)
        {
            _internal_tnkr_base_site = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_base_site", oldValue, _internal_tnkr_base_site));
        }
    }

    public function set tnkr_dglic_exp(value:Object) : void
    {
        var oldValue:Object = _internal_tnkr_dglic_exp;
        if (oldValue !== value)
        {
            _internal_tnkr_dglic_exp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_dglic_exp", oldValue, _internal_tnkr_dglic_exp));
        }
    }

    public function set remarks(value:Object) : void
    {
        var oldValue:Object = _internal_remarks;
        if (oldValue !== value)
        {
            _internal_remarks = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "remarks", oldValue, _internal_remarks));
        }
    }

    public function set tnkr_pin(value:Object) : void
    {
        var oldValue:Object = _internal_tnkr_pin;
        if (oldValue !== value)
        {
            _internal_tnkr_pin = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_pin", oldValue, _internal_tnkr_pin));
        }
    }

    public function set tnkr_ntrips(value:String) : void
    {
        var oldValue:String = _internal_tnkr_ntrips;
        if (oldValue !== value)
        {
            _internal_tnkr_ntrips = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_ntrips", oldValue, _internal_tnkr_ntrips));
        }
    }

    public function set tnkr_max_kg(value:Object) : void
    {
        var oldValue:Object = _internal_tnkr_max_kg;
        if (oldValue !== value)
        {
            _internal_tnkr_max_kg = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_max_kg", oldValue, _internal_tnkr_max_kg));
        }
    }

    public function set tnkr_carrier_name(value:String) : void
    {
        var oldValue:String = _internal_tnkr_carrier_name;
        if (oldValue !== value)
        {
            _internal_tnkr_carrier_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_carrier_name", oldValue, _internal_tnkr_carrier_name));
        }
    }

    public function set tnkr_ins_exp(value:Object) : void
    {
        var oldValue:Object = _internal_tnkr_ins_exp;
        if (oldValue !== value)
        {
            _internal_tnkr_ins_exp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_ins_exp", oldValue, _internal_tnkr_ins_exp));
        }
    }

    public function set tnkr_dest_depot(value:Object) : void
    {
        var oldValue:Object = _internal_tnkr_dest_depot;
        if (oldValue !== value)
        {
            _internal_tnkr_dest_depot = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_dest_depot", oldValue, _internal_tnkr_dest_depot));
        }
    }

    public function set tnkr_cur_depot(value:String) : void
    {
        var oldValue:String = _internal_tnkr_cur_depot;
        if (oldValue !== value)
        {
            _internal_tnkr_cur_depot = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_cur_depot", oldValue, _internal_tnkr_cur_depot));
        }
    }

    public function set tnkr_last_depot(value:String) : void
    {
        var oldValue:String = _internal_tnkr_last_depot;
        if (oldValue !== value)
        {
            _internal_tnkr_last_depot = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_last_depot", oldValue, _internal_tnkr_last_depot));
        }
    }

    public function set composition(value:Object) : void
    {
        var oldValue:Object = _internal_composition;
        if (oldValue !== value)
        {
            _internal_composition = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "composition", oldValue, _internal_composition));
        }
    }

    public function set tnkr_archive(value:String) : void
    {
        var oldValue:String = _internal_tnkr_archive;
        if (oldValue !== value)
        {
            _internal_tnkr_archive = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_archive", oldValue, _internal_tnkr_archive));
        }
    }

    public function set tnkr_name(value:Object) : void
    {
        var oldValue:Object = _internal_tnkr_name;
        if (oldValue !== value)
        {
            _internal_tnkr_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_name", oldValue, _internal_tnkr_name));
        }
    }

    public function set tnkr_etp(value:String) : void
    {
        var oldValue:String = _internal_tnkr_etp;
        if (oldValue !== value)
        {
            _internal_tnkr_etp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_etp", oldValue, _internal_tnkr_etp));
        }
    }

    public function set tnkr_last_depot_name(value:String) : void
    {
        var oldValue:String = _internal_tnkr_last_depot_name;
        if (oldValue !== value)
        {
            _internal_tnkr_last_depot_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_last_depot_name", oldValue, _internal_tnkr_last_depot_name));
        }
    }

    public function set tnkr_lic_exp(value:Object) : void
    {
        var oldValue:Object = _internal_tnkr_lic_exp;
        if (oldValue !== value)
        {
            _internal_tnkr_lic_exp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_lic_exp", oldValue, _internal_tnkr_lic_exp));
        }
    }

    public function set tnkr_lock(value:String) : void
    {
        var oldValue:String = _internal_tnkr_lock;
        if (oldValue !== value)
        {
            _internal_tnkr_lock = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_lock", oldValue, _internal_tnkr_lock));
        }
    }

    public function set tnkr_code(value:String) : void
    {
        var oldValue:String = _internal_tnkr_code;
        if (oldValue !== value)
        {
            _internal_tnkr_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_code", oldValue, _internal_tnkr_code));
        }
    }

    public function set tnkr_bay_loop_ch(value:String) : void
    {
        var oldValue:String = _internal_tnkr_bay_loop_ch;
        if (oldValue !== value)
        {
            _internal_tnkr_bay_loop_ch = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_bay_loop_ch", oldValue, _internal_tnkr_bay_loop_ch));
        }
    }

    public function set tnkr_own_txt(value:String) : void
    {
        var oldValue:String = _internal_tnkr_own_txt;
        if (oldValue !== value)
        {
            _internal_tnkr_own_txt = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_own_txt", oldValue, _internal_tnkr_own_txt));
        }
    }

    public function set tnkr_dest_depot_name(value:Object) : void
    {
        var oldValue:Object = _internal_tnkr_dest_depot_name;
        if (oldValue !== value)
        {
            _internal_tnkr_dest_depot_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_dest_depot_name", oldValue, _internal_tnkr_dest_depot_name));
        }
    }

    public function set tnkr_owner_name(value:String) : void
    {
        var oldValue:String = _internal_tnkr_owner_name;
        if (oldValue !== value)
        {
            _internal_tnkr_owner_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_owner_name", oldValue, _internal_tnkr_owner_name));
        }
    }

    public function set tnkr_carrier(value:String) : void
    {
        var oldValue:String = _internal_tnkr_carrier;
        if (oldValue !== value)
        {
            _internal_tnkr_carrier = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_carrier", oldValue, _internal_tnkr_carrier));
        }
    }

    public function set tnkr_active(value:String) : void
    {
        var oldValue:String = _internal_tnkr_active;
        if (oldValue !== value)
        {
            _internal_tnkr_active = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_active", oldValue, _internal_tnkr_active));
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

    model_internal function setterListenerEtyp_category(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_category();
    }

    model_internal function setterListenerTnkr_base_site_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_base_site_name();
    }

    model_internal function setterListenerTnkr_stats(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_stats();
    }

    model_internal function setterListenerTnkr_cur_depot_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_cur_depot_name();
    }

    model_internal function setterListenerRn(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRn();
    }

    model_internal function setterListenerTnkr_eqpt_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_eqpt_name();
    }

    model_internal function setterListenerTnkr_owner(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_owner();
    }

    model_internal function setterListenerTnkr_last_trip(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_last_trip();
    }

    model_internal function setterListenerTnkr_base_site(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_base_site();
    }

    model_internal function setterListenerTnkr_dglic_exp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_dglic_exp();
    }

    model_internal function setterListenerRemarks(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRemarks();
    }

    model_internal function setterListenerTnkr_pin(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_pin();
    }

    model_internal function setterListenerTnkr_ntrips(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_ntrips();
    }

    model_internal function setterListenerTnkr_max_kg(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_max_kg();
    }

    model_internal function setterListenerTnkr_carrier_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_carrier_name();
    }

    model_internal function setterListenerTnkr_ins_exp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_ins_exp();
    }

    model_internal function setterListenerTnkr_dest_depot(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_dest_depot();
    }

    model_internal function setterListenerTnkr_cur_depot(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_cur_depot();
    }

    model_internal function setterListenerTnkr_last_depot(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_last_depot();
    }

    model_internal function setterListenerComposition(value:flash.events.Event):void
    {
        _model.invalidateDependentOnComposition();
    }

    model_internal function setterListenerTnkr_archive(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_archive();
    }

    model_internal function setterListenerTnkr_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_name();
    }

    model_internal function setterListenerTnkr_etp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_etp();
    }

    model_internal function setterListenerTnkr_last_depot_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_last_depot_name();
    }

    model_internal function setterListenerTnkr_lic_exp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_lic_exp();
    }

    model_internal function setterListenerTnkr_lock(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_lock();
    }

    model_internal function setterListenerTnkr_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_code();
    }

    model_internal function setterListenerTnkr_bay_loop_ch(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_bay_loop_ch();
    }

    model_internal function setterListenerTnkr_own_txt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_own_txt();
    }

    model_internal function setterListenerTnkr_dest_depot_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_dest_depot_name();
    }

    model_internal function setterListenerTnkr_owner_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_owner_name();
    }

    model_internal function setterListenerTnkr_carrier(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_carrier();
    }

    model_internal function setterListenerTnkr_active(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTnkr_active();
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
        if (!_model.etyp_categoryIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_categoryValidationFailureMessages);
        }
        if (!_model.tnkr_base_site_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_base_site_nameValidationFailureMessages);
        }
        if (!_model.tnkr_statsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_statsValidationFailureMessages);
        }
        if (!_model.tnkr_cur_depot_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_cur_depot_nameValidationFailureMessages);
        }
        if (!_model.rnIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_rnValidationFailureMessages);
        }
        if (!_model.tnkr_eqpt_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_eqpt_nameValidationFailureMessages);
        }
        if (!_model.tnkr_ownerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_ownerValidationFailureMessages);
        }
        if (!_model.tnkr_last_tripIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_last_tripValidationFailureMessages);
        }
        if (!_model.tnkr_base_siteIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_base_siteValidationFailureMessages);
        }
        if (!_model.tnkr_dglic_expIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_dglic_expValidationFailureMessages);
        }
        if (!_model.remarksIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_remarksValidationFailureMessages);
        }
        if (!_model.tnkr_pinIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_pinValidationFailureMessages);
        }
        if (!_model.tnkr_ntripsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_ntripsValidationFailureMessages);
        }
        if (!_model.tnkr_max_kgIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_max_kgValidationFailureMessages);
        }
        if (!_model.tnkr_carrier_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_carrier_nameValidationFailureMessages);
        }
        if (!_model.tnkr_ins_expIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_ins_expValidationFailureMessages);
        }
        if (!_model.tnkr_dest_depotIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_dest_depotValidationFailureMessages);
        }
        if (!_model.tnkr_cur_depotIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_cur_depotValidationFailureMessages);
        }
        if (!_model.tnkr_last_depotIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_last_depotValidationFailureMessages);
        }
        if (!_model.compositionIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_compositionValidationFailureMessages);
        }
        if (!_model.tnkr_archiveIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_archiveValidationFailureMessages);
        }
        if (!_model.tnkr_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_nameValidationFailureMessages);
        }
        if (!_model.tnkr_etpIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_etpValidationFailureMessages);
        }
        if (!_model.tnkr_last_depot_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_last_depot_nameValidationFailureMessages);
        }
        if (!_model.tnkr_lic_expIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_lic_expValidationFailureMessages);
        }
        if (!_model.tnkr_lockIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_lockValidationFailureMessages);
        }
        if (!_model.tnkr_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_codeValidationFailureMessages);
        }
        if (!_model.tnkr_bay_loop_chIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_bay_loop_chValidationFailureMessages);
        }
        if (!_model.tnkr_own_txtIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_own_txtValidationFailureMessages);
        }
        if (!_model.tnkr_dest_depot_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_dest_depot_nameValidationFailureMessages);
        }
        if (!_model.tnkr_owner_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_owner_nameValidationFailureMessages);
        }
        if (!_model.tnkr_carrierIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_carrierValidationFailureMessages);
        }
        if (!_model.tnkr_activeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tnkr_activeValidationFailureMessages);
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
    public function get _model() : _GUI_TankersEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _GUI_TankersEntityMetadata) : void
    {
        var oldValue : _GUI_TankersEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfEtyp_category : Array = null;
    model_internal var _doValidationLastValOfEtyp_category : Object;

    model_internal function _doValidationForEtyp_category(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfEtyp_category != null && model_internal::_doValidationLastValOfEtyp_category == value)
           return model_internal::_doValidationCacheOfEtyp_category ;

        _model.model_internal::_etyp_categoryIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_categoryAvailable && _internal_etyp_category == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_category is required"));
        }

        model_internal::_doValidationCacheOfEtyp_category = validationFailures;
        model_internal::_doValidationLastValOfEtyp_category = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_base_site_name : Array = null;
    model_internal var _doValidationLastValOfTnkr_base_site_name : String;

    model_internal function _doValidationForTnkr_base_site_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_base_site_name != null && model_internal::_doValidationLastValOfTnkr_base_site_name == value)
           return model_internal::_doValidationCacheOfTnkr_base_site_name ;

        _model.model_internal::_tnkr_base_site_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_base_site_nameAvailable && _internal_tnkr_base_site_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_base_site_name is required"));
        }

        model_internal::_doValidationCacheOfTnkr_base_site_name = validationFailures;
        model_internal::_doValidationLastValOfTnkr_base_site_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_stats : Array = null;
    model_internal var _doValidationLastValOfTnkr_stats : String;

    model_internal function _doValidationForTnkr_stats(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_stats != null && model_internal::_doValidationLastValOfTnkr_stats == value)
           return model_internal::_doValidationCacheOfTnkr_stats ;

        _model.model_internal::_tnkr_statsIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_statsAvailable && _internal_tnkr_stats == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_stats is required"));
        }

        model_internal::_doValidationCacheOfTnkr_stats = validationFailures;
        model_internal::_doValidationLastValOfTnkr_stats = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_cur_depot_name : Array = null;
    model_internal var _doValidationLastValOfTnkr_cur_depot_name : String;

    model_internal function _doValidationForTnkr_cur_depot_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_cur_depot_name != null && model_internal::_doValidationLastValOfTnkr_cur_depot_name == value)
           return model_internal::_doValidationCacheOfTnkr_cur_depot_name ;

        _model.model_internal::_tnkr_cur_depot_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_cur_depot_nameAvailable && _internal_tnkr_cur_depot_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_cur_depot_name is required"));
        }

        model_internal::_doValidationCacheOfTnkr_cur_depot_name = validationFailures;
        model_internal::_doValidationLastValOfTnkr_cur_depot_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRn : Array = null;
    model_internal var _doValidationLastValOfRn : String;

    model_internal function _doValidationForRn(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRn != null && model_internal::_doValidationLastValOfRn == value)
           return model_internal::_doValidationCacheOfRn ;

        _model.model_internal::_rnIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRnAvailable && _internal_rn == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "rn is required"));
        }

        model_internal::_doValidationCacheOfRn = validationFailures;
        model_internal::_doValidationLastValOfRn = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_eqpt_name : Array = null;
    model_internal var _doValidationLastValOfTnkr_eqpt_name : String;

    model_internal function _doValidationForTnkr_eqpt_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_eqpt_name != null && model_internal::_doValidationLastValOfTnkr_eqpt_name == value)
           return model_internal::_doValidationCacheOfTnkr_eqpt_name ;

        _model.model_internal::_tnkr_eqpt_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_eqpt_nameAvailable && _internal_tnkr_eqpt_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_eqpt_name is required"));
        }

        model_internal::_doValidationCacheOfTnkr_eqpt_name = validationFailures;
        model_internal::_doValidationLastValOfTnkr_eqpt_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_owner : Array = null;
    model_internal var _doValidationLastValOfTnkr_owner : String;

    model_internal function _doValidationForTnkr_owner(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_owner != null && model_internal::_doValidationLastValOfTnkr_owner == value)
           return model_internal::_doValidationCacheOfTnkr_owner ;

        _model.model_internal::_tnkr_ownerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_ownerAvailable && _internal_tnkr_owner == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_owner is required"));
        }

        model_internal::_doValidationCacheOfTnkr_owner = validationFailures;
        model_internal::_doValidationLastValOfTnkr_owner = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_last_trip : Array = null;
    model_internal var _doValidationLastValOfTnkr_last_trip : String;

    model_internal function _doValidationForTnkr_last_trip(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_last_trip != null && model_internal::_doValidationLastValOfTnkr_last_trip == value)
           return model_internal::_doValidationCacheOfTnkr_last_trip ;

        _model.model_internal::_tnkr_last_tripIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_last_tripAvailable && _internal_tnkr_last_trip == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_last_trip is required"));
        }

        model_internal::_doValidationCacheOfTnkr_last_trip = validationFailures;
        model_internal::_doValidationLastValOfTnkr_last_trip = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_base_site : Array = null;
    model_internal var _doValidationLastValOfTnkr_base_site : String;

    model_internal function _doValidationForTnkr_base_site(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_base_site != null && model_internal::_doValidationLastValOfTnkr_base_site == value)
           return model_internal::_doValidationCacheOfTnkr_base_site ;

        _model.model_internal::_tnkr_base_siteIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_base_siteAvailable && _internal_tnkr_base_site == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_base_site is required"));
        }

        model_internal::_doValidationCacheOfTnkr_base_site = validationFailures;
        model_internal::_doValidationLastValOfTnkr_base_site = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_dglic_exp : Array = null;
    model_internal var _doValidationLastValOfTnkr_dglic_exp : Object;

    model_internal function _doValidationForTnkr_dglic_exp(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfTnkr_dglic_exp != null && model_internal::_doValidationLastValOfTnkr_dglic_exp == value)
           return model_internal::_doValidationCacheOfTnkr_dglic_exp ;

        _model.model_internal::_tnkr_dglic_expIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_dglic_expAvailable && _internal_tnkr_dglic_exp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_dglic_exp is required"));
        }

        model_internal::_doValidationCacheOfTnkr_dglic_exp = validationFailures;
        model_internal::_doValidationLastValOfTnkr_dglic_exp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRemarks : Array = null;
    model_internal var _doValidationLastValOfRemarks : Object;

    model_internal function _doValidationForRemarks(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfRemarks != null && model_internal::_doValidationLastValOfRemarks == value)
           return model_internal::_doValidationCacheOfRemarks ;

        _model.model_internal::_remarksIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRemarksAvailable && _internal_remarks == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "remarks is required"));
        }

        model_internal::_doValidationCacheOfRemarks = validationFailures;
        model_internal::_doValidationLastValOfRemarks = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_pin : Array = null;
    model_internal var _doValidationLastValOfTnkr_pin : Object;

    model_internal function _doValidationForTnkr_pin(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfTnkr_pin != null && model_internal::_doValidationLastValOfTnkr_pin == value)
           return model_internal::_doValidationCacheOfTnkr_pin ;

        _model.model_internal::_tnkr_pinIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_pinAvailable && _internal_tnkr_pin == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_pin is required"));
        }

        model_internal::_doValidationCacheOfTnkr_pin = validationFailures;
        model_internal::_doValidationLastValOfTnkr_pin = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_ntrips : Array = null;
    model_internal var _doValidationLastValOfTnkr_ntrips : String;

    model_internal function _doValidationForTnkr_ntrips(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_ntrips != null && model_internal::_doValidationLastValOfTnkr_ntrips == value)
           return model_internal::_doValidationCacheOfTnkr_ntrips ;

        _model.model_internal::_tnkr_ntripsIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_ntripsAvailable && _internal_tnkr_ntrips == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_ntrips is required"));
        }

        model_internal::_doValidationCacheOfTnkr_ntrips = validationFailures;
        model_internal::_doValidationLastValOfTnkr_ntrips = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_max_kg : Array = null;
    model_internal var _doValidationLastValOfTnkr_max_kg : Object;

    model_internal function _doValidationForTnkr_max_kg(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfTnkr_max_kg != null && model_internal::_doValidationLastValOfTnkr_max_kg == value)
           return model_internal::_doValidationCacheOfTnkr_max_kg ;

        _model.model_internal::_tnkr_max_kgIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_max_kgAvailable && _internal_tnkr_max_kg == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_max_kg is required"));
        }

        model_internal::_doValidationCacheOfTnkr_max_kg = validationFailures;
        model_internal::_doValidationLastValOfTnkr_max_kg = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_carrier_name : Array = null;
    model_internal var _doValidationLastValOfTnkr_carrier_name : String;

    model_internal function _doValidationForTnkr_carrier_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_carrier_name != null && model_internal::_doValidationLastValOfTnkr_carrier_name == value)
           return model_internal::_doValidationCacheOfTnkr_carrier_name ;

        _model.model_internal::_tnkr_carrier_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_carrier_nameAvailable && _internal_tnkr_carrier_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_carrier_name is required"));
        }

        model_internal::_doValidationCacheOfTnkr_carrier_name = validationFailures;
        model_internal::_doValidationLastValOfTnkr_carrier_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_ins_exp : Array = null;
    model_internal var _doValidationLastValOfTnkr_ins_exp : Object;

    model_internal function _doValidationForTnkr_ins_exp(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfTnkr_ins_exp != null && model_internal::_doValidationLastValOfTnkr_ins_exp == value)
           return model_internal::_doValidationCacheOfTnkr_ins_exp ;

        _model.model_internal::_tnkr_ins_expIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_ins_expAvailable && _internal_tnkr_ins_exp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_ins_exp is required"));
        }

        model_internal::_doValidationCacheOfTnkr_ins_exp = validationFailures;
        model_internal::_doValidationLastValOfTnkr_ins_exp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_dest_depot : Array = null;
    model_internal var _doValidationLastValOfTnkr_dest_depot : Object;

    model_internal function _doValidationForTnkr_dest_depot(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfTnkr_dest_depot != null && model_internal::_doValidationLastValOfTnkr_dest_depot == value)
           return model_internal::_doValidationCacheOfTnkr_dest_depot ;

        _model.model_internal::_tnkr_dest_depotIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_dest_depotAvailable && _internal_tnkr_dest_depot == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_dest_depot is required"));
        }

        model_internal::_doValidationCacheOfTnkr_dest_depot = validationFailures;
        model_internal::_doValidationLastValOfTnkr_dest_depot = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_cur_depot : Array = null;
    model_internal var _doValidationLastValOfTnkr_cur_depot : String;

    model_internal function _doValidationForTnkr_cur_depot(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_cur_depot != null && model_internal::_doValidationLastValOfTnkr_cur_depot == value)
           return model_internal::_doValidationCacheOfTnkr_cur_depot ;

        _model.model_internal::_tnkr_cur_depotIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_cur_depotAvailable && _internal_tnkr_cur_depot == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_cur_depot is required"));
        }

        model_internal::_doValidationCacheOfTnkr_cur_depot = validationFailures;
        model_internal::_doValidationLastValOfTnkr_cur_depot = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_last_depot : Array = null;
    model_internal var _doValidationLastValOfTnkr_last_depot : String;

    model_internal function _doValidationForTnkr_last_depot(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_last_depot != null && model_internal::_doValidationLastValOfTnkr_last_depot == value)
           return model_internal::_doValidationCacheOfTnkr_last_depot ;

        _model.model_internal::_tnkr_last_depotIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_last_depotAvailable && _internal_tnkr_last_depot == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_last_depot is required"));
        }

        model_internal::_doValidationCacheOfTnkr_last_depot = validationFailures;
        model_internal::_doValidationLastValOfTnkr_last_depot = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfComposition : Array = null;
    model_internal var _doValidationLastValOfComposition : Object;

    model_internal function _doValidationForComposition(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfComposition != null && model_internal::_doValidationLastValOfComposition == value)
           return model_internal::_doValidationCacheOfComposition ;

        _model.model_internal::_compositionIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCompositionAvailable && _internal_composition == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "composition is required"));
        }

        model_internal::_doValidationCacheOfComposition = validationFailures;
        model_internal::_doValidationLastValOfComposition = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_archive : Array = null;
    model_internal var _doValidationLastValOfTnkr_archive : String;

    model_internal function _doValidationForTnkr_archive(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_archive != null && model_internal::_doValidationLastValOfTnkr_archive == value)
           return model_internal::_doValidationCacheOfTnkr_archive ;

        _model.model_internal::_tnkr_archiveIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_archiveAvailable && _internal_tnkr_archive == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_archive is required"));
        }

        model_internal::_doValidationCacheOfTnkr_archive = validationFailures;
        model_internal::_doValidationLastValOfTnkr_archive = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_name : Array = null;
    model_internal var _doValidationLastValOfTnkr_name : Object;

    model_internal function _doValidationForTnkr_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfTnkr_etp : Array = null;
    model_internal var _doValidationLastValOfTnkr_etp : String;

    model_internal function _doValidationForTnkr_etp(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_etp != null && model_internal::_doValidationLastValOfTnkr_etp == value)
           return model_internal::_doValidationCacheOfTnkr_etp ;

        _model.model_internal::_tnkr_etpIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_etpAvailable && _internal_tnkr_etp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_etp is required"));
        }

        model_internal::_doValidationCacheOfTnkr_etp = validationFailures;
        model_internal::_doValidationLastValOfTnkr_etp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_last_depot_name : Array = null;
    model_internal var _doValidationLastValOfTnkr_last_depot_name : String;

    model_internal function _doValidationForTnkr_last_depot_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_last_depot_name != null && model_internal::_doValidationLastValOfTnkr_last_depot_name == value)
           return model_internal::_doValidationCacheOfTnkr_last_depot_name ;

        _model.model_internal::_tnkr_last_depot_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_last_depot_nameAvailable && _internal_tnkr_last_depot_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_last_depot_name is required"));
        }

        model_internal::_doValidationCacheOfTnkr_last_depot_name = validationFailures;
        model_internal::_doValidationLastValOfTnkr_last_depot_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_lic_exp : Array = null;
    model_internal var _doValidationLastValOfTnkr_lic_exp : Object;

    model_internal function _doValidationForTnkr_lic_exp(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfTnkr_lic_exp != null && model_internal::_doValidationLastValOfTnkr_lic_exp == value)
           return model_internal::_doValidationCacheOfTnkr_lic_exp ;

        _model.model_internal::_tnkr_lic_expIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_lic_expAvailable && _internal_tnkr_lic_exp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_lic_exp is required"));
        }

        model_internal::_doValidationCacheOfTnkr_lic_exp = validationFailures;
        model_internal::_doValidationLastValOfTnkr_lic_exp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_lock : Array = null;
    model_internal var _doValidationLastValOfTnkr_lock : String;

    model_internal function _doValidationForTnkr_lock(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_lock != null && model_internal::_doValidationLastValOfTnkr_lock == value)
           return model_internal::_doValidationCacheOfTnkr_lock ;

        _model.model_internal::_tnkr_lockIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_lockAvailable && _internal_tnkr_lock == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_lock is required"));
        }

        model_internal::_doValidationCacheOfTnkr_lock = validationFailures;
        model_internal::_doValidationLastValOfTnkr_lock = value;

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
    
    model_internal var _doValidationCacheOfTnkr_bay_loop_ch : Array = null;
    model_internal var _doValidationLastValOfTnkr_bay_loop_ch : String;

    model_internal function _doValidationForTnkr_bay_loop_ch(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_bay_loop_ch != null && model_internal::_doValidationLastValOfTnkr_bay_loop_ch == value)
           return model_internal::_doValidationCacheOfTnkr_bay_loop_ch ;

        _model.model_internal::_tnkr_bay_loop_chIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_bay_loop_chAvailable && _internal_tnkr_bay_loop_ch == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_bay_loop_ch is required"));
        }

        model_internal::_doValidationCacheOfTnkr_bay_loop_ch = validationFailures;
        model_internal::_doValidationLastValOfTnkr_bay_loop_ch = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_own_txt : Array = null;
    model_internal var _doValidationLastValOfTnkr_own_txt : String;

    model_internal function _doValidationForTnkr_own_txt(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_own_txt != null && model_internal::_doValidationLastValOfTnkr_own_txt == value)
           return model_internal::_doValidationCacheOfTnkr_own_txt ;

        _model.model_internal::_tnkr_own_txtIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_own_txtAvailable && _internal_tnkr_own_txt == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_own_txt is required"));
        }

        model_internal::_doValidationCacheOfTnkr_own_txt = validationFailures;
        model_internal::_doValidationLastValOfTnkr_own_txt = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_dest_depot_name : Array = null;
    model_internal var _doValidationLastValOfTnkr_dest_depot_name : Object;

    model_internal function _doValidationForTnkr_dest_depot_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfTnkr_dest_depot_name != null && model_internal::_doValidationLastValOfTnkr_dest_depot_name == value)
           return model_internal::_doValidationCacheOfTnkr_dest_depot_name ;

        _model.model_internal::_tnkr_dest_depot_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_dest_depot_nameAvailable && _internal_tnkr_dest_depot_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_dest_depot_name is required"));
        }

        model_internal::_doValidationCacheOfTnkr_dest_depot_name = validationFailures;
        model_internal::_doValidationLastValOfTnkr_dest_depot_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_owner_name : Array = null;
    model_internal var _doValidationLastValOfTnkr_owner_name : String;

    model_internal function _doValidationForTnkr_owner_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_owner_name != null && model_internal::_doValidationLastValOfTnkr_owner_name == value)
           return model_internal::_doValidationCacheOfTnkr_owner_name ;

        _model.model_internal::_tnkr_owner_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_owner_nameAvailable && _internal_tnkr_owner_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_owner_name is required"));
        }

        model_internal::_doValidationCacheOfTnkr_owner_name = validationFailures;
        model_internal::_doValidationLastValOfTnkr_owner_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_carrier : Array = null;
    model_internal var _doValidationLastValOfTnkr_carrier : String;

    model_internal function _doValidationForTnkr_carrier(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_carrier != null && model_internal::_doValidationLastValOfTnkr_carrier == value)
           return model_internal::_doValidationCacheOfTnkr_carrier ;

        _model.model_internal::_tnkr_carrierIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_carrierAvailable && _internal_tnkr_carrier == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_carrier is required"));
        }

        model_internal::_doValidationCacheOfTnkr_carrier = validationFailures;
        model_internal::_doValidationLastValOfTnkr_carrier = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTnkr_active : Array = null;
    model_internal var _doValidationLastValOfTnkr_active : String;

    model_internal function _doValidationForTnkr_active(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTnkr_active != null && model_internal::_doValidationLastValOfTnkr_active == value)
           return model_internal::_doValidationCacheOfTnkr_active ;

        _model.model_internal::_tnkr_activeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTnkr_activeAvailable && _internal_tnkr_active == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tnkr_active is required"));
        }

        model_internal::_doValidationCacheOfTnkr_active = validationFailures;
        model_internal::_doValidationLastValOfTnkr_active = value;

        return validationFailures;
    }
    

}

}
