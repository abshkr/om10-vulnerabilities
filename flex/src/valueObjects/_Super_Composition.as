/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - Composition.as.
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
public class _Super_Composition extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("Composition") == null)
            {
                flash.net.registerClassAlias("Composition", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("Composition", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _CompositionEntityMetadata;
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
    private var _internal_etyp_isrigid : String;
    private var _internal_etyp_schedul : String;
    private var _internal_equip_isleaf : String;
    private var _internal_eqc_count : int;
    private var _internal_eqc_sub_item_path : String;
    private var _internal_sub_item_etyp_isrigid : String;
    private var _internal_sub_item_sched_type : String;
    private var _internal_etyp_category : String;
    private var _internal_eqc_count_rt : int;
    private var _internal_etyp_title_path : String;
    private var _internal_ecnct_etyp : String;
    private var _internal_eqc_sub_item_title : Object;
    private var _internal_etyp_is_drumfill : String;
    private var _internal_etyp_n_items : String;
    private var _internal_eqc_sub_item : Object;
    private var _internal_idx : String;
    private var _internal_etyp_id_path : String;
    private var _internal_eqc_sub_item_rt : Object;
    private var _internal_etyp_title : String;
    private var _internal_etyp_class : String;
    private var _internal_etyp_title_rt : String;
    private var _internal_etyp_id : String;
    private var _internal_cmpt_units : Object;
    private var _internal_etyp_id_rt : String;
    private var _internal_lvl : String;
    private var _internal_eqc_path : String;
    private var _internal_cmptnu : String;
    private var _internal_compartments : Object;
    private var _internal_etyp_max_gross : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_Composition()
    {
        _model = new _CompositionEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_isrigid", model_internal::setterListenerEtyp_isrigid));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_schedul", model_internal::setterListenerEtyp_schedul));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "equip_isleaf", model_internal::setterListenerEquip_isleaf));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqc_sub_item_path", model_internal::setterListenerEqc_sub_item_path));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "sub_item_etyp_isrigid", model_internal::setterListenerSub_item_etyp_isrigid));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "sub_item_sched_type", model_internal::setterListenerSub_item_sched_type));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_category", model_internal::setterListenerEtyp_category));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_title_path", model_internal::setterListenerEtyp_title_path));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "ecnct_etyp", model_internal::setterListenerEcnct_etyp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqc_sub_item_title", model_internal::setterListenerEqc_sub_item_title));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_is_drumfill", model_internal::setterListenerEtyp_is_drumfill));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_n_items", model_internal::setterListenerEtyp_n_items));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqc_sub_item", model_internal::setterListenerEqc_sub_item));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "idx", model_internal::setterListenerIdx));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_id_path", model_internal::setterListenerEtyp_id_path));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqc_sub_item_rt", model_internal::setterListenerEqc_sub_item_rt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_title", model_internal::setterListenerEtyp_title));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_class", model_internal::setterListenerEtyp_class));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_title_rt", model_internal::setterListenerEtyp_title_rt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_id", model_internal::setterListenerEtyp_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpt_units", model_internal::setterListenerCmpt_units));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_id_rt", model_internal::setterListenerEtyp_id_rt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "lvl", model_internal::setterListenerLvl));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqc_path", model_internal::setterListenerEqc_path));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmptnu", model_internal::setterListenerCmptnu));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "compartments", model_internal::setterListenerCompartments));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_max_gross", model_internal::setterListenerEtyp_max_gross));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get etyp_isrigid() : String
    {
        return _internal_etyp_isrigid;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_schedul() : String
    {
        return _internal_etyp_schedul;
    }

    [Bindable(event="propertyChange")]
    public function get equip_isleaf() : String
    {
        return _internal_equip_isleaf;
    }

    [Bindable(event="propertyChange")]
    public function get eqc_count() : int
    {
        return _internal_eqc_count;
    }

    [Bindable(event="propertyChange")]
    public function get eqc_sub_item_path() : String
    {
        return _internal_eqc_sub_item_path;
    }

    [Bindable(event="propertyChange")]
    public function get sub_item_etyp_isrigid() : String
    {
        return _internal_sub_item_etyp_isrigid;
    }

    [Bindable(event="propertyChange")]
    public function get sub_item_sched_type() : String
    {
        return _internal_sub_item_sched_type;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_category() : String
    {
        return _internal_etyp_category;
    }

    [Bindable(event="propertyChange")]
    public function get eqc_count_rt() : int
    {
        return _internal_eqc_count_rt;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_title_path() : String
    {
        return _internal_etyp_title_path;
    }

    [Bindable(event="propertyChange")]
    public function get ecnct_etyp() : String
    {
        return _internal_ecnct_etyp;
    }

    [Bindable(event="propertyChange")]
    public function get eqc_sub_item_title() : Object
    {
        return _internal_eqc_sub_item_title;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_is_drumfill() : String
    {
        return _internal_etyp_is_drumfill;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_n_items() : String
    {
        return _internal_etyp_n_items;
    }

    [Bindable(event="propertyChange")]
    public function get eqc_sub_item() : Object
    {
        return _internal_eqc_sub_item;
    }

    [Bindable(event="propertyChange")]
    public function get idx() : String
    {
        return _internal_idx;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_id_path() : String
    {
        return _internal_etyp_id_path;
    }

    [Bindable(event="propertyChange")]
    public function get eqc_sub_item_rt() : Object
    {
        return _internal_eqc_sub_item_rt;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_title() : String
    {
        return _internal_etyp_title;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_class() : String
    {
        return _internal_etyp_class;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_title_rt() : String
    {
        return _internal_etyp_title_rt;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_id() : String
    {
        return _internal_etyp_id;
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_units() : Object
    {
        return _internal_cmpt_units;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_id_rt() : String
    {
        return _internal_etyp_id_rt;
    }

    [Bindable(event="propertyChange")]
    public function get lvl() : String
    {
        return _internal_lvl;
    }

    [Bindable(event="propertyChange")]
    public function get eqc_path() : String
    {
        return _internal_eqc_path;
    }

    [Bindable(event="propertyChange")]
    public function get cmptnu() : String
    {
        return _internal_cmptnu;
    }

    [Bindable(event="propertyChange")]
    public function get compartments() : Object
    {
        return _internal_compartments;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_max_gross() : String
    {
        return _internal_etyp_max_gross;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set etyp_isrigid(value:String) : void
    {
        var oldValue:String = _internal_etyp_isrigid;
        if (oldValue !== value)
        {
            _internal_etyp_isrigid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_isrigid", oldValue, _internal_etyp_isrigid));
        }
    }

    public function set etyp_schedul(value:String) : void
    {
        var oldValue:String = _internal_etyp_schedul;
        if (oldValue !== value)
        {
            _internal_etyp_schedul = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_schedul", oldValue, _internal_etyp_schedul));
        }
    }

    public function set equip_isleaf(value:String) : void
    {
        var oldValue:String = _internal_equip_isleaf;
        if (oldValue !== value)
        {
            _internal_equip_isleaf = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "equip_isleaf", oldValue, _internal_equip_isleaf));
        }
    }

    public function set eqc_count(value:int) : void
    {
        var oldValue:int = _internal_eqc_count;
        if (oldValue !== value)
        {
            _internal_eqc_count = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_count", oldValue, _internal_eqc_count));
        }
    }

    public function set eqc_sub_item_path(value:String) : void
    {
        var oldValue:String = _internal_eqc_sub_item_path;
        if (oldValue !== value)
        {
            _internal_eqc_sub_item_path = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_sub_item_path", oldValue, _internal_eqc_sub_item_path));
        }
    }

    public function set sub_item_etyp_isrigid(value:String) : void
    {
        var oldValue:String = _internal_sub_item_etyp_isrigid;
        if (oldValue !== value)
        {
            _internal_sub_item_etyp_isrigid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sub_item_etyp_isrigid", oldValue, _internal_sub_item_etyp_isrigid));
        }
    }

    public function set sub_item_sched_type(value:String) : void
    {
        var oldValue:String = _internal_sub_item_sched_type;
        if (oldValue !== value)
        {
            _internal_sub_item_sched_type = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sub_item_sched_type", oldValue, _internal_sub_item_sched_type));
        }
    }

    public function set etyp_category(value:String) : void
    {
        var oldValue:String = _internal_etyp_category;
        if (oldValue !== value)
        {
            _internal_etyp_category = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_category", oldValue, _internal_etyp_category));
        }
    }

    public function set eqc_count_rt(value:int) : void
    {
        var oldValue:int = _internal_eqc_count_rt;
        if (oldValue !== value)
        {
            _internal_eqc_count_rt = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_count_rt", oldValue, _internal_eqc_count_rt));
        }
    }

    public function set etyp_title_path(value:String) : void
    {
        var oldValue:String = _internal_etyp_title_path;
        if (oldValue !== value)
        {
            _internal_etyp_title_path = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_title_path", oldValue, _internal_etyp_title_path));
        }
    }

    public function set ecnct_etyp(value:String) : void
    {
        var oldValue:String = _internal_ecnct_etyp;
        if (oldValue !== value)
        {
            _internal_ecnct_etyp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ecnct_etyp", oldValue, _internal_ecnct_etyp));
        }
    }

    public function set eqc_sub_item_title(value:Object) : void
    {
        var oldValue:Object = _internal_eqc_sub_item_title;
        if (oldValue !== value)
        {
            _internal_eqc_sub_item_title = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_sub_item_title", oldValue, _internal_eqc_sub_item_title));
        }
    }

    public function set etyp_is_drumfill(value:String) : void
    {
        var oldValue:String = _internal_etyp_is_drumfill;
        if (oldValue !== value)
        {
            _internal_etyp_is_drumfill = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_is_drumfill", oldValue, _internal_etyp_is_drumfill));
        }
    }

    public function set etyp_n_items(value:String) : void
    {
        var oldValue:String = _internal_etyp_n_items;
        if (oldValue !== value)
        {
            _internal_etyp_n_items = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_n_items", oldValue, _internal_etyp_n_items));
        }
    }

    public function set eqc_sub_item(value:Object) : void
    {
        var oldValue:Object = _internal_eqc_sub_item;
        if (oldValue !== value)
        {
            _internal_eqc_sub_item = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_sub_item", oldValue, _internal_eqc_sub_item));
        }
    }

    public function set idx(value:String) : void
    {
        var oldValue:String = _internal_idx;
        if (oldValue !== value)
        {
            _internal_idx = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "idx", oldValue, _internal_idx));
        }
    }

    public function set etyp_id_path(value:String) : void
    {
        var oldValue:String = _internal_etyp_id_path;
        if (oldValue !== value)
        {
            _internal_etyp_id_path = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_id_path", oldValue, _internal_etyp_id_path));
        }
    }

    public function set eqc_sub_item_rt(value:Object) : void
    {
        var oldValue:Object = _internal_eqc_sub_item_rt;
        if (oldValue !== value)
        {
            _internal_eqc_sub_item_rt = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_sub_item_rt", oldValue, _internal_eqc_sub_item_rt));
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

    public function set etyp_class(value:String) : void
    {
        var oldValue:String = _internal_etyp_class;
        if (oldValue !== value)
        {
            _internal_etyp_class = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_class", oldValue, _internal_etyp_class));
        }
    }

    public function set etyp_title_rt(value:String) : void
    {
        var oldValue:String = _internal_etyp_title_rt;
        if (oldValue !== value)
        {
            _internal_etyp_title_rt = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_title_rt", oldValue, _internal_etyp_title_rt));
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

    public function set cmpt_units(value:Object) : void
    {
        var oldValue:Object = _internal_cmpt_units;
        if (oldValue !== value)
        {
            _internal_cmpt_units = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_units", oldValue, _internal_cmpt_units));
        }
    }

    public function set etyp_id_rt(value:String) : void
    {
        var oldValue:String = _internal_etyp_id_rt;
        if (oldValue !== value)
        {
            _internal_etyp_id_rt = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_id_rt", oldValue, _internal_etyp_id_rt));
        }
    }

    public function set lvl(value:String) : void
    {
        var oldValue:String = _internal_lvl;
        if (oldValue !== value)
        {
            _internal_lvl = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "lvl", oldValue, _internal_lvl));
        }
    }

    public function set eqc_path(value:String) : void
    {
        var oldValue:String = _internal_eqc_path;
        if (oldValue !== value)
        {
            _internal_eqc_path = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqc_path", oldValue, _internal_eqc_path));
        }
    }

    public function set cmptnu(value:String) : void
    {
        var oldValue:String = _internal_cmptnu;
        if (oldValue !== value)
        {
            _internal_cmptnu = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmptnu", oldValue, _internal_cmptnu));
        }
    }

    public function set compartments(value:Object) : void
    {
        var oldValue:Object = _internal_compartments;
        if (oldValue !== value)
        {
            _internal_compartments = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "compartments", oldValue, _internal_compartments));
        }
    }

    public function set etyp_max_gross(value:String) : void
    {
        var oldValue:String = _internal_etyp_max_gross;
        if (oldValue !== value)
        {
            _internal_etyp_max_gross = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_max_gross", oldValue, _internal_etyp_max_gross));
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

    model_internal function setterListenerEtyp_isrigid(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_isrigid();
    }

    model_internal function setterListenerEtyp_schedul(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_schedul();
    }

    model_internal function setterListenerEquip_isleaf(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEquip_isleaf();
    }

    model_internal function setterListenerEqc_sub_item_path(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqc_sub_item_path();
    }

    model_internal function setterListenerSub_item_etyp_isrigid(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSub_item_etyp_isrigid();
    }

    model_internal function setterListenerSub_item_sched_type(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSub_item_sched_type();
    }

    model_internal function setterListenerEtyp_category(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_category();
    }

    model_internal function setterListenerEtyp_title_path(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_title_path();
    }

    model_internal function setterListenerEcnct_etyp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEcnct_etyp();
    }

    model_internal function setterListenerEqc_sub_item_title(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqc_sub_item_title();
    }

    model_internal function setterListenerEtyp_is_drumfill(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_is_drumfill();
    }

    model_internal function setterListenerEtyp_n_items(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_n_items();
    }

    model_internal function setterListenerEqc_sub_item(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqc_sub_item();
    }

    model_internal function setterListenerIdx(value:flash.events.Event):void
    {
        _model.invalidateDependentOnIdx();
    }

    model_internal function setterListenerEtyp_id_path(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_id_path();
    }

    model_internal function setterListenerEqc_sub_item_rt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqc_sub_item_rt();
    }

    model_internal function setterListenerEtyp_title(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_title();
    }

    model_internal function setterListenerEtyp_class(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_class();
    }

    model_internal function setterListenerEtyp_title_rt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_title_rt();
    }

    model_internal function setterListenerEtyp_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_id();
    }

    model_internal function setterListenerCmpt_units(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpt_units();
    }

    model_internal function setterListenerEtyp_id_rt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_id_rt();
    }

    model_internal function setterListenerLvl(value:flash.events.Event):void
    {
        _model.invalidateDependentOnLvl();
    }

    model_internal function setterListenerEqc_path(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqc_path();
    }

    model_internal function setterListenerCmptnu(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmptnu();
    }

    model_internal function setterListenerCompartments(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCompartments();
    }

    model_internal function setterListenerEtyp_max_gross(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_max_gross();
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
        if (!_model.etyp_isrigidIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_isrigidValidationFailureMessages);
        }
        if (!_model.etyp_schedulIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_schedulValidationFailureMessages);
        }
        if (!_model.equip_isleafIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_equip_isleafValidationFailureMessages);
        }
        if (!_model.eqc_sub_item_pathIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqc_sub_item_pathValidationFailureMessages);
        }
        if (!_model.sub_item_etyp_isrigidIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_sub_item_etyp_isrigidValidationFailureMessages);
        }
        if (!_model.sub_item_sched_typeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_sub_item_sched_typeValidationFailureMessages);
        }
        if (!_model.etyp_categoryIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_categoryValidationFailureMessages);
        }
        if (!_model.etyp_title_pathIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_title_pathValidationFailureMessages);
        }
        if (!_model.ecnct_etypIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_ecnct_etypValidationFailureMessages);
        }
        if (!_model.eqc_sub_item_titleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqc_sub_item_titleValidationFailureMessages);
        }
        if (!_model.etyp_is_drumfillIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_is_drumfillValidationFailureMessages);
        }
        if (!_model.etyp_n_itemsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_n_itemsValidationFailureMessages);
        }
        if (!_model.eqc_sub_itemIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqc_sub_itemValidationFailureMessages);
        }
        if (!_model.idxIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_idxValidationFailureMessages);
        }
        if (!_model.etyp_id_pathIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_id_pathValidationFailureMessages);
        }
        if (!_model.eqc_sub_item_rtIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqc_sub_item_rtValidationFailureMessages);
        }
        if (!_model.etyp_titleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_titleValidationFailureMessages);
        }
        if (!_model.etyp_classIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_classValidationFailureMessages);
        }
        if (!_model.etyp_title_rtIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_title_rtValidationFailureMessages);
        }
        if (!_model.etyp_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_idValidationFailureMessages);
        }
        if (!_model.cmpt_unitsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpt_unitsValidationFailureMessages);
        }
        if (!_model.etyp_id_rtIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_id_rtValidationFailureMessages);
        }
        if (!_model.lvlIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_lvlValidationFailureMessages);
        }
        if (!_model.eqc_pathIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqc_pathValidationFailureMessages);
        }
        if (!_model.cmptnuIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmptnuValidationFailureMessages);
        }
        if (!_model.compartmentsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_compartmentsValidationFailureMessages);
        }
        if (!_model.etyp_max_grossIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_max_grossValidationFailureMessages);
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
    public function get _model() : _CompositionEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _CompositionEntityMetadata) : void
    {
        var oldValue : _CompositionEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfEtyp_isrigid : Array = null;
    model_internal var _doValidationLastValOfEtyp_isrigid : String;

    model_internal function _doValidationForEtyp_isrigid(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_isrigid != null && model_internal::_doValidationLastValOfEtyp_isrigid == value)
           return model_internal::_doValidationCacheOfEtyp_isrigid ;

        _model.model_internal::_etyp_isrigidIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_isrigidAvailable && _internal_etyp_isrigid == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_isrigid is required"));
        }

        model_internal::_doValidationCacheOfEtyp_isrigid = validationFailures;
        model_internal::_doValidationLastValOfEtyp_isrigid = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_schedul : Array = null;
    model_internal var _doValidationLastValOfEtyp_schedul : String;

    model_internal function _doValidationForEtyp_schedul(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_schedul != null && model_internal::_doValidationLastValOfEtyp_schedul == value)
           return model_internal::_doValidationCacheOfEtyp_schedul ;

        _model.model_internal::_etyp_schedulIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_schedulAvailable && _internal_etyp_schedul == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_schedul is required"));
        }

        model_internal::_doValidationCacheOfEtyp_schedul = validationFailures;
        model_internal::_doValidationLastValOfEtyp_schedul = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEquip_isleaf : Array = null;
    model_internal var _doValidationLastValOfEquip_isleaf : String;

    model_internal function _doValidationForEquip_isleaf(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEquip_isleaf != null && model_internal::_doValidationLastValOfEquip_isleaf == value)
           return model_internal::_doValidationCacheOfEquip_isleaf ;

        _model.model_internal::_equip_isleafIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEquip_isleafAvailable && _internal_equip_isleaf == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "equip_isleaf is required"));
        }

        model_internal::_doValidationCacheOfEquip_isleaf = validationFailures;
        model_internal::_doValidationLastValOfEquip_isleaf = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqc_sub_item_path : Array = null;
    model_internal var _doValidationLastValOfEqc_sub_item_path : String;

    model_internal function _doValidationForEqc_sub_item_path(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqc_sub_item_path != null && model_internal::_doValidationLastValOfEqc_sub_item_path == value)
           return model_internal::_doValidationCacheOfEqc_sub_item_path ;

        _model.model_internal::_eqc_sub_item_pathIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqc_sub_item_pathAvailable && _internal_eqc_sub_item_path == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqc_sub_item_path is required"));
        }

        model_internal::_doValidationCacheOfEqc_sub_item_path = validationFailures;
        model_internal::_doValidationLastValOfEqc_sub_item_path = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSub_item_etyp_isrigid : Array = null;
    model_internal var _doValidationLastValOfSub_item_etyp_isrigid : String;

    model_internal function _doValidationForSub_item_etyp_isrigid(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSub_item_etyp_isrigid != null && model_internal::_doValidationLastValOfSub_item_etyp_isrigid == value)
           return model_internal::_doValidationCacheOfSub_item_etyp_isrigid ;

        _model.model_internal::_sub_item_etyp_isrigidIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSub_item_etyp_isrigidAvailable && _internal_sub_item_etyp_isrigid == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "sub_item_etyp_isrigid is required"));
        }

        model_internal::_doValidationCacheOfSub_item_etyp_isrigid = validationFailures;
        model_internal::_doValidationLastValOfSub_item_etyp_isrigid = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSub_item_sched_type : Array = null;
    model_internal var _doValidationLastValOfSub_item_sched_type : String;

    model_internal function _doValidationForSub_item_sched_type(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSub_item_sched_type != null && model_internal::_doValidationLastValOfSub_item_sched_type == value)
           return model_internal::_doValidationCacheOfSub_item_sched_type ;

        _model.model_internal::_sub_item_sched_typeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSub_item_sched_typeAvailable && _internal_sub_item_sched_type == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "sub_item_sched_type is required"));
        }

        model_internal::_doValidationCacheOfSub_item_sched_type = validationFailures;
        model_internal::_doValidationLastValOfSub_item_sched_type = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_category : Array = null;
    model_internal var _doValidationLastValOfEtyp_category : String;

    model_internal function _doValidationForEtyp_category(valueIn:Object):Array
    {
        var value : String = valueIn as String;

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
    
    model_internal var _doValidationCacheOfEtyp_title_path : Array = null;
    model_internal var _doValidationLastValOfEtyp_title_path : String;

    model_internal function _doValidationForEtyp_title_path(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_title_path != null && model_internal::_doValidationLastValOfEtyp_title_path == value)
           return model_internal::_doValidationCacheOfEtyp_title_path ;

        _model.model_internal::_etyp_title_pathIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_title_pathAvailable && _internal_etyp_title_path == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_title_path is required"));
        }

        model_internal::_doValidationCacheOfEtyp_title_path = validationFailures;
        model_internal::_doValidationLastValOfEtyp_title_path = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEcnct_etyp : Array = null;
    model_internal var _doValidationLastValOfEcnct_etyp : String;

    model_internal function _doValidationForEcnct_etyp(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEcnct_etyp != null && model_internal::_doValidationLastValOfEcnct_etyp == value)
           return model_internal::_doValidationCacheOfEcnct_etyp ;

        _model.model_internal::_ecnct_etypIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEcnct_etypAvailable && _internal_ecnct_etyp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "ecnct_etyp is required"));
        }

        model_internal::_doValidationCacheOfEcnct_etyp = validationFailures;
        model_internal::_doValidationLastValOfEcnct_etyp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqc_sub_item_title : Array = null;
    model_internal var _doValidationLastValOfEqc_sub_item_title : Object;

    model_internal function _doValidationForEqc_sub_item_title(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfEqc_sub_item_title != null && model_internal::_doValidationLastValOfEqc_sub_item_title == value)
           return model_internal::_doValidationCacheOfEqc_sub_item_title ;

        _model.model_internal::_eqc_sub_item_titleIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqc_sub_item_titleAvailable && _internal_eqc_sub_item_title == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqc_sub_item_title is required"));
        }

        model_internal::_doValidationCacheOfEqc_sub_item_title = validationFailures;
        model_internal::_doValidationLastValOfEqc_sub_item_title = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_is_drumfill : Array = null;
    model_internal var _doValidationLastValOfEtyp_is_drumfill : String;

    model_internal function _doValidationForEtyp_is_drumfill(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_is_drumfill != null && model_internal::_doValidationLastValOfEtyp_is_drumfill == value)
           return model_internal::_doValidationCacheOfEtyp_is_drumfill ;

        _model.model_internal::_etyp_is_drumfillIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_is_drumfillAvailable && _internal_etyp_is_drumfill == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_is_drumfill is required"));
        }

        model_internal::_doValidationCacheOfEtyp_is_drumfill = validationFailures;
        model_internal::_doValidationLastValOfEtyp_is_drumfill = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_n_items : Array = null;
    model_internal var _doValidationLastValOfEtyp_n_items : String;

    model_internal function _doValidationForEtyp_n_items(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_n_items != null && model_internal::_doValidationLastValOfEtyp_n_items == value)
           return model_internal::_doValidationCacheOfEtyp_n_items ;

        _model.model_internal::_etyp_n_itemsIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_n_itemsAvailable && _internal_etyp_n_items == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_n_items is required"));
        }

        model_internal::_doValidationCacheOfEtyp_n_items = validationFailures;
        model_internal::_doValidationLastValOfEtyp_n_items = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqc_sub_item : Array = null;
    model_internal var _doValidationLastValOfEqc_sub_item : Object;

    model_internal function _doValidationForEqc_sub_item(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfEqc_sub_item != null && model_internal::_doValidationLastValOfEqc_sub_item == value)
           return model_internal::_doValidationCacheOfEqc_sub_item ;

        _model.model_internal::_eqc_sub_itemIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqc_sub_itemAvailable && _internal_eqc_sub_item == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqc_sub_item is required"));
        }

        model_internal::_doValidationCacheOfEqc_sub_item = validationFailures;
        model_internal::_doValidationLastValOfEqc_sub_item = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfIdx : Array = null;
    model_internal var _doValidationLastValOfIdx : String;

    model_internal function _doValidationForIdx(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfIdx != null && model_internal::_doValidationLastValOfIdx == value)
           return model_internal::_doValidationCacheOfIdx ;

        _model.model_internal::_idxIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isIdxAvailable && _internal_idx == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "idx is required"));
        }

        model_internal::_doValidationCacheOfIdx = validationFailures;
        model_internal::_doValidationLastValOfIdx = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_id_path : Array = null;
    model_internal var _doValidationLastValOfEtyp_id_path : String;

    model_internal function _doValidationForEtyp_id_path(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_id_path != null && model_internal::_doValidationLastValOfEtyp_id_path == value)
           return model_internal::_doValidationCacheOfEtyp_id_path ;

        _model.model_internal::_etyp_id_pathIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_id_pathAvailable && _internal_etyp_id_path == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_id_path is required"));
        }

        model_internal::_doValidationCacheOfEtyp_id_path = validationFailures;
        model_internal::_doValidationLastValOfEtyp_id_path = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqc_sub_item_rt : Array = null;
    model_internal var _doValidationLastValOfEqc_sub_item_rt : Object;

    model_internal function _doValidationForEqc_sub_item_rt(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfEqc_sub_item_rt != null && model_internal::_doValidationLastValOfEqc_sub_item_rt == value)
           return model_internal::_doValidationCacheOfEqc_sub_item_rt ;

        _model.model_internal::_eqc_sub_item_rtIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqc_sub_item_rtAvailable && _internal_eqc_sub_item_rt == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqc_sub_item_rt is required"));
        }

        model_internal::_doValidationCacheOfEqc_sub_item_rt = validationFailures;
        model_internal::_doValidationLastValOfEqc_sub_item_rt = value;

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
    
    model_internal var _doValidationCacheOfEtyp_class : Array = null;
    model_internal var _doValidationLastValOfEtyp_class : String;

    model_internal function _doValidationForEtyp_class(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_class != null && model_internal::_doValidationLastValOfEtyp_class == value)
           return model_internal::_doValidationCacheOfEtyp_class ;

        _model.model_internal::_etyp_classIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_classAvailable && _internal_etyp_class == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_class is required"));
        }

        model_internal::_doValidationCacheOfEtyp_class = validationFailures;
        model_internal::_doValidationLastValOfEtyp_class = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_title_rt : Array = null;
    model_internal var _doValidationLastValOfEtyp_title_rt : String;

    model_internal function _doValidationForEtyp_title_rt(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_title_rt != null && model_internal::_doValidationLastValOfEtyp_title_rt == value)
           return model_internal::_doValidationCacheOfEtyp_title_rt ;

        _model.model_internal::_etyp_title_rtIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_title_rtAvailable && _internal_etyp_title_rt == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_title_rt is required"));
        }

        model_internal::_doValidationCacheOfEtyp_title_rt = validationFailures;
        model_internal::_doValidationLastValOfEtyp_title_rt = value;

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
    
    model_internal var _doValidationCacheOfCmpt_units : Array = null;
    model_internal var _doValidationLastValOfCmpt_units : Object;

    model_internal function _doValidationForCmpt_units(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfEtyp_id_rt : Array = null;
    model_internal var _doValidationLastValOfEtyp_id_rt : String;

    model_internal function _doValidationForEtyp_id_rt(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_id_rt != null && model_internal::_doValidationLastValOfEtyp_id_rt == value)
           return model_internal::_doValidationCacheOfEtyp_id_rt ;

        _model.model_internal::_etyp_id_rtIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_id_rtAvailable && _internal_etyp_id_rt == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_id_rt is required"));
        }

        model_internal::_doValidationCacheOfEtyp_id_rt = validationFailures;
        model_internal::_doValidationLastValOfEtyp_id_rt = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfLvl : Array = null;
    model_internal var _doValidationLastValOfLvl : String;

    model_internal function _doValidationForLvl(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfLvl != null && model_internal::_doValidationLastValOfLvl == value)
           return model_internal::_doValidationCacheOfLvl ;

        _model.model_internal::_lvlIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isLvlAvailable && _internal_lvl == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "lvl is required"));
        }

        model_internal::_doValidationCacheOfLvl = validationFailures;
        model_internal::_doValidationLastValOfLvl = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqc_path : Array = null;
    model_internal var _doValidationLastValOfEqc_path : String;

    model_internal function _doValidationForEqc_path(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqc_path != null && model_internal::_doValidationLastValOfEqc_path == value)
           return model_internal::_doValidationCacheOfEqc_path ;

        _model.model_internal::_eqc_pathIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqc_pathAvailable && _internal_eqc_path == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqc_path is required"));
        }

        model_internal::_doValidationCacheOfEqc_path = validationFailures;
        model_internal::_doValidationLastValOfEqc_path = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmptnu : Array = null;
    model_internal var _doValidationLastValOfCmptnu : String;

    model_internal function _doValidationForCmptnu(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmptnu != null && model_internal::_doValidationLastValOfCmptnu == value)
           return model_internal::_doValidationCacheOfCmptnu ;

        _model.model_internal::_cmptnuIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmptnuAvailable && _internal_cmptnu == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmptnu is required"));
        }

        model_internal::_doValidationCacheOfCmptnu = validationFailures;
        model_internal::_doValidationLastValOfCmptnu = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCompartments : Array = null;
    model_internal var _doValidationLastValOfCompartments : Object;

    model_internal function _doValidationForCompartments(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfEtyp_max_gross : Array = null;
    model_internal var _doValidationLastValOfEtyp_max_gross : String;

    model_internal function _doValidationForEtyp_max_gross(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_max_gross != null && model_internal::_doValidationLastValOfEtyp_max_gross == value)
           return model_internal::_doValidationCacheOfEtyp_max_gross ;

        _model.model_internal::_etyp_max_grossIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_max_grossAvailable && _internal_etyp_max_gross == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_max_gross is required"));
        }

        model_internal::_doValidationCacheOfEtyp_max_gross = validationFailures;
        model_internal::_doValidationLastValOfEtyp_max_gross = value;

        return validationFailures;
    }
    

}

}
