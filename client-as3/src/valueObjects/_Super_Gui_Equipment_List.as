/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - Gui_Equipment_List.as.
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
public class _Super_Gui_Equipment_List extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("Gui_Equipment_List") == null)
            {
                flash.net.registerClassAlias("Gui_Equipment_List", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("Gui_Equipment_List", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _Gui_Equipment_ListEntityMetadata;
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
    private var _internal_eqpt_owner : String;
    private var _internal_eqpt_etp : String;
    private var _internal_rn : String;
    private var _internal_eqpt_tanker : Object;
    private var _internal_eqpt_lock : String;
    private var _internal_eqpt_code : String;
    private var _internal_eqpt_empty_kg : String;
    private var _internal_eqpt_area_name : String;
    private var _internal_eqpt_load_type : String;
    private var _internal_eqpt_owner_name : String;
    private var _internal_eqpt_exp_d1_dmy : String;
    private var _internal_eqpt_exp_d3_dmy : String;
    private var _internal_eqpt_comments : String;
    private var _internal_eqpt_exp_d2_dmy : String;
    private var _internal_eqp_must_tare_in : String;
    private var _internal_eqpt_id : String;
    private var _internal_eqpt_load_type_name : String;
    private var _internal_etyp_category : Object;
    private var _internal_eqpt_title : String;
    private var _internal_composition : Object;
    private var _internal_eqpt_etp_title : String;
    private var _internal_eqpt_area : String;
    private var _internal_eqpt_max_gross : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_Gui_Equipment_List()
    {
        _model = new _Gui_Equipment_ListEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_owner", model_internal::setterListenerEqpt_owner));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_etp", model_internal::setterListenerEqpt_etp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "rn", model_internal::setterListenerRn));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_tanker", model_internal::setterListenerEqpt_tanker));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_lock", model_internal::setterListenerEqpt_lock));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_code", model_internal::setterListenerEqpt_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_empty_kg", model_internal::setterListenerEqpt_empty_kg));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_area_name", model_internal::setterListenerEqpt_area_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_load_type", model_internal::setterListenerEqpt_load_type));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_owner_name", model_internal::setterListenerEqpt_owner_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_exp_d1_dmy", model_internal::setterListenerEqpt_exp_d1_dmy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_exp_d3_dmy", model_internal::setterListenerEqpt_exp_d3_dmy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_comments", model_internal::setterListenerEqpt_comments));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_exp_d2_dmy", model_internal::setterListenerEqpt_exp_d2_dmy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqp_must_tare_in", model_internal::setterListenerEqp_must_tare_in));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_id", model_internal::setterListenerEqpt_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_load_type_name", model_internal::setterListenerEqpt_load_type_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_category", model_internal::setterListenerEtyp_category));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_title", model_internal::setterListenerEqpt_title));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "composition", model_internal::setterListenerComposition));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_etp_title", model_internal::setterListenerEqpt_etp_title));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_area", model_internal::setterListenerEqpt_area));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_max_gross", model_internal::setterListenerEqpt_max_gross));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get eqpt_owner() : String
    {
        return _internal_eqpt_owner;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etp() : String
    {
        return _internal_eqpt_etp;
    }

    [Bindable(event="propertyChange")]
    public function get rn() : String
    {
        return _internal_rn;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_tanker() : Object
    {
        return _internal_eqpt_tanker;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_lock() : String
    {
        return _internal_eqpt_lock;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_code() : String
    {
        return _internal_eqpt_code;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_empty_kg() : String
    {
        return _internal_eqpt_empty_kg;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_area_name() : String
    {
        return _internal_eqpt_area_name;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_load_type() : String
    {
        return _internal_eqpt_load_type;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_owner_name() : String
    {
        return _internal_eqpt_owner_name;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_exp_d1_dmy() : String
    {
        return _internal_eqpt_exp_d1_dmy;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_exp_d3_dmy() : String
    {
        return _internal_eqpt_exp_d3_dmy;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_comments() : String
    {
        return _internal_eqpt_comments;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_exp_d2_dmy() : String
    {
        return _internal_eqpt_exp_d2_dmy;
    }

    [Bindable(event="propertyChange")]
    public function get eqp_must_tare_in() : String
    {
        return _internal_eqp_must_tare_in;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_id() : String
    {
        return _internal_eqpt_id;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_load_type_name() : String
    {
        return _internal_eqpt_load_type_name;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_category() : Object
    {
        return _internal_etyp_category;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_title() : String
    {
        return _internal_eqpt_title;
    }

    [Bindable(event="propertyChange")]
    public function get composition() : Object
    {
        return _internal_composition;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etp_title() : String
    {
        return _internal_eqpt_etp_title;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_area() : String
    {
        return _internal_eqpt_area;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_max_gross() : String
    {
        return _internal_eqpt_max_gross;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set eqpt_owner(value:String) : void
    {
        var oldValue:String = _internal_eqpt_owner;
        if (oldValue !== value)
        {
            _internal_eqpt_owner = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_owner", oldValue, _internal_eqpt_owner));
        }
    }

    public function set eqpt_etp(value:String) : void
    {
        var oldValue:String = _internal_eqpt_etp;
        if (oldValue !== value)
        {
            _internal_eqpt_etp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etp", oldValue, _internal_eqpt_etp));
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

    public function set eqpt_tanker(value:Object) : void
    {
        var oldValue:Object = _internal_eqpt_tanker;
        if (oldValue !== value)
        {
            _internal_eqpt_tanker = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_tanker", oldValue, _internal_eqpt_tanker));
        }
    }

    public function set eqpt_lock(value:String) : void
    {
        var oldValue:String = _internal_eqpt_lock;
        if (oldValue !== value)
        {
            _internal_eqpt_lock = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_lock", oldValue, _internal_eqpt_lock));
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

    public function set eqpt_empty_kg(value:String) : void
    {
        var oldValue:String = _internal_eqpt_empty_kg;
        if (oldValue !== value)
        {
            _internal_eqpt_empty_kg = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_empty_kg", oldValue, _internal_eqpt_empty_kg));
        }
    }

    public function set eqpt_area_name(value:String) : void
    {
        var oldValue:String = _internal_eqpt_area_name;
        if (oldValue !== value)
        {
            _internal_eqpt_area_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_area_name", oldValue, _internal_eqpt_area_name));
        }
    }

    public function set eqpt_load_type(value:String) : void
    {
        var oldValue:String = _internal_eqpt_load_type;
        if (oldValue !== value)
        {
            _internal_eqpt_load_type = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_load_type", oldValue, _internal_eqpt_load_type));
        }
    }

    public function set eqpt_owner_name(value:String) : void
    {
        var oldValue:String = _internal_eqpt_owner_name;
        if (oldValue !== value)
        {
            _internal_eqpt_owner_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_owner_name", oldValue, _internal_eqpt_owner_name));
        }
    }

    public function set eqpt_exp_d1_dmy(value:String) : void
    {
        var oldValue:String = _internal_eqpt_exp_d1_dmy;
        if (oldValue !== value)
        {
            _internal_eqpt_exp_d1_dmy = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_exp_d1_dmy", oldValue, _internal_eqpt_exp_d1_dmy));
        }
    }

    public function set eqpt_exp_d3_dmy(value:String) : void
    {
        var oldValue:String = _internal_eqpt_exp_d3_dmy;
        if (oldValue !== value)
        {
            _internal_eqpt_exp_d3_dmy = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_exp_d3_dmy", oldValue, _internal_eqpt_exp_d3_dmy));
        }
    }

    public function set eqpt_comments(value:String) : void
    {
        var oldValue:String = _internal_eqpt_comments;
        if (oldValue !== value)
        {
            _internal_eqpt_comments = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_comments", oldValue, _internal_eqpt_comments));
        }
    }

    public function set eqpt_exp_d2_dmy(value:String) : void
    {
        var oldValue:String = _internal_eqpt_exp_d2_dmy;
        if (oldValue !== value)
        {
            _internal_eqpt_exp_d2_dmy = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_exp_d2_dmy", oldValue, _internal_eqpt_exp_d2_dmy));
        }
    }

    public function set eqp_must_tare_in(value:String) : void
    {
        var oldValue:String = _internal_eqp_must_tare_in;
        if (oldValue !== value)
        {
            _internal_eqp_must_tare_in = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqp_must_tare_in", oldValue, _internal_eqp_must_tare_in));
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

    public function set eqpt_load_type_name(value:String) : void
    {
        var oldValue:String = _internal_eqpt_load_type_name;
        if (oldValue !== value)
        {
            _internal_eqpt_load_type_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_load_type_name", oldValue, _internal_eqpt_load_type_name));
        }
    }

    public function set etyp_category(value:Object) : void
    {
        var oldValue:Object = _internal_etyp_category;
        if (oldValue !== value)
        {
            _internal_etyp_category = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_category", oldValue, _internal_etyp_category));
        }
    }

    public function set eqpt_title(value:String) : void
    {
        var oldValue:String = _internal_eqpt_title;
        if (oldValue !== value)
        {
            _internal_eqpt_title = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_title", oldValue, _internal_eqpt_title));
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

    public function set eqpt_etp_title(value:String) : void
    {
        var oldValue:String = _internal_eqpt_etp_title;
        if (oldValue !== value)
        {
            _internal_eqpt_etp_title = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etp_title", oldValue, _internal_eqpt_etp_title));
        }
    }

    public function set eqpt_area(value:String) : void
    {
        var oldValue:String = _internal_eqpt_area;
        if (oldValue !== value)
        {
            _internal_eqpt_area = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_area", oldValue, _internal_eqpt_area));
        }
    }

    public function set eqpt_max_gross(value:String) : void
    {
        var oldValue:String = _internal_eqpt_max_gross;
        if (oldValue !== value)
        {
            _internal_eqpt_max_gross = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_max_gross", oldValue, _internal_eqpt_max_gross));
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

    model_internal function setterListenerEqpt_owner(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_owner();
    }

    model_internal function setterListenerEqpt_etp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_etp();
    }

    model_internal function setterListenerRn(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRn();
    }

    model_internal function setterListenerEqpt_tanker(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_tanker();
    }

    model_internal function setterListenerEqpt_lock(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_lock();
    }

    model_internal function setterListenerEqpt_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_code();
    }

    model_internal function setterListenerEqpt_empty_kg(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_empty_kg();
    }

    model_internal function setterListenerEqpt_area_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_area_name();
    }

    model_internal function setterListenerEqpt_load_type(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_load_type();
    }

    model_internal function setterListenerEqpt_owner_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_owner_name();
    }

    model_internal function setterListenerEqpt_exp_d1_dmy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_exp_d1_dmy();
    }

    model_internal function setterListenerEqpt_exp_d3_dmy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_exp_d3_dmy();
    }

    model_internal function setterListenerEqpt_comments(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_comments();
    }

    model_internal function setterListenerEqpt_exp_d2_dmy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_exp_d2_dmy();
    }

    model_internal function setterListenerEqp_must_tare_in(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqp_must_tare_in();
    }

    model_internal function setterListenerEqpt_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_id();
    }

    model_internal function setterListenerEqpt_load_type_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_load_type_name();
    }

    model_internal function setterListenerEtyp_category(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_category();
    }

    model_internal function setterListenerEqpt_title(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_title();
    }

    model_internal function setterListenerComposition(value:flash.events.Event):void
    {
        _model.invalidateDependentOnComposition();
    }

    model_internal function setterListenerEqpt_etp_title(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_etp_title();
    }

    model_internal function setterListenerEqpt_area(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_area();
    }

    model_internal function setterListenerEqpt_max_gross(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_max_gross();
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
        if (!_model.eqpt_ownerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_ownerValidationFailureMessages);
        }
        if (!_model.eqpt_etpIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_etpValidationFailureMessages);
        }
        if (!_model.rnIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_rnValidationFailureMessages);
        }
        if (!_model.eqpt_tankerIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_tankerValidationFailureMessages);
        }
        if (!_model.eqpt_lockIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_lockValidationFailureMessages);
        }
        if (!_model.eqpt_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_codeValidationFailureMessages);
        }
        if (!_model.eqpt_empty_kgIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_empty_kgValidationFailureMessages);
        }
        if (!_model.eqpt_area_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_area_nameValidationFailureMessages);
        }
        if (!_model.eqpt_load_typeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_load_typeValidationFailureMessages);
        }
        if (!_model.eqpt_owner_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_owner_nameValidationFailureMessages);
        }
        if (!_model.eqpt_exp_d1_dmyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_exp_d1_dmyValidationFailureMessages);
        }
        if (!_model.eqpt_exp_d3_dmyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_exp_d3_dmyValidationFailureMessages);
        }
        if (!_model.eqpt_commentsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_commentsValidationFailureMessages);
        }
        if (!_model.eqpt_exp_d2_dmyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_exp_d2_dmyValidationFailureMessages);
        }
        if (!_model.eqp_must_tare_inIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqp_must_tare_inValidationFailureMessages);
        }
        if (!_model.eqpt_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_idValidationFailureMessages);
        }
        if (!_model.eqpt_load_type_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_load_type_nameValidationFailureMessages);
        }
        if (!_model.etyp_categoryIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_categoryValidationFailureMessages);
        }
        if (!_model.eqpt_titleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_titleValidationFailureMessages);
        }
        if (!_model.compositionIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_compositionValidationFailureMessages);
        }
        if (!_model.eqpt_etp_titleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_etp_titleValidationFailureMessages);
        }
        if (!_model.eqpt_areaIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_areaValidationFailureMessages);
        }
        if (!_model.eqpt_max_grossIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_max_grossValidationFailureMessages);
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
    public function get _model() : _Gui_Equipment_ListEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _Gui_Equipment_ListEntityMetadata) : void
    {
        var oldValue : _Gui_Equipment_ListEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfEqpt_owner : Array = null;
    model_internal var _doValidationLastValOfEqpt_owner : String;

    model_internal function _doValidationForEqpt_owner(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_owner != null && model_internal::_doValidationLastValOfEqpt_owner == value)
           return model_internal::_doValidationCacheOfEqpt_owner ;

        _model.model_internal::_eqpt_ownerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_ownerAvailable && _internal_eqpt_owner == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_owner is required"));
        }

        model_internal::_doValidationCacheOfEqpt_owner = validationFailures;
        model_internal::_doValidationLastValOfEqpt_owner = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_etp : Array = null;
    model_internal var _doValidationLastValOfEqpt_etp : String;

    model_internal function _doValidationForEqpt_etp(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_etp != null && model_internal::_doValidationLastValOfEqpt_etp == value)
           return model_internal::_doValidationCacheOfEqpt_etp ;

        _model.model_internal::_eqpt_etpIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_etpAvailable && _internal_eqpt_etp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_etp is required"));
        }

        model_internal::_doValidationCacheOfEqpt_etp = validationFailures;
        model_internal::_doValidationLastValOfEqpt_etp = value;

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
    
    model_internal var _doValidationCacheOfEqpt_tanker : Array = null;
    model_internal var _doValidationLastValOfEqpt_tanker : Object;

    model_internal function _doValidationForEqpt_tanker(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfEqpt_tanker != null && model_internal::_doValidationLastValOfEqpt_tanker == value)
           return model_internal::_doValidationCacheOfEqpt_tanker ;

        _model.model_internal::_eqpt_tankerIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_tankerAvailable && _internal_eqpt_tanker == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_tanker is required"));
        }

        model_internal::_doValidationCacheOfEqpt_tanker = validationFailures;
        model_internal::_doValidationLastValOfEqpt_tanker = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_lock : Array = null;
    model_internal var _doValidationLastValOfEqpt_lock : String;

    model_internal function _doValidationForEqpt_lock(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_lock != null && model_internal::_doValidationLastValOfEqpt_lock == value)
           return model_internal::_doValidationCacheOfEqpt_lock ;

        _model.model_internal::_eqpt_lockIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_lockAvailable && _internal_eqpt_lock == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_lock is required"));
        }

        model_internal::_doValidationCacheOfEqpt_lock = validationFailures;
        model_internal::_doValidationLastValOfEqpt_lock = value;

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
    
    model_internal var _doValidationCacheOfEqpt_empty_kg : Array = null;
    model_internal var _doValidationLastValOfEqpt_empty_kg : String;

    model_internal function _doValidationForEqpt_empty_kg(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_empty_kg != null && model_internal::_doValidationLastValOfEqpt_empty_kg == value)
           return model_internal::_doValidationCacheOfEqpt_empty_kg ;

        _model.model_internal::_eqpt_empty_kgIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_empty_kgAvailable && _internal_eqpt_empty_kg == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_empty_kg is required"));
        }

        model_internal::_doValidationCacheOfEqpt_empty_kg = validationFailures;
        model_internal::_doValidationLastValOfEqpt_empty_kg = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_area_name : Array = null;
    model_internal var _doValidationLastValOfEqpt_area_name : String;

    model_internal function _doValidationForEqpt_area_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_area_name != null && model_internal::_doValidationLastValOfEqpt_area_name == value)
           return model_internal::_doValidationCacheOfEqpt_area_name ;

        _model.model_internal::_eqpt_area_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_area_nameAvailable && _internal_eqpt_area_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_area_name is required"));
        }

        model_internal::_doValidationCacheOfEqpt_area_name = validationFailures;
        model_internal::_doValidationLastValOfEqpt_area_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_load_type : Array = null;
    model_internal var _doValidationLastValOfEqpt_load_type : String;

    model_internal function _doValidationForEqpt_load_type(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_load_type != null && model_internal::_doValidationLastValOfEqpt_load_type == value)
           return model_internal::_doValidationCacheOfEqpt_load_type ;

        _model.model_internal::_eqpt_load_typeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_load_typeAvailable && _internal_eqpt_load_type == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_load_type is required"));
        }

        model_internal::_doValidationCacheOfEqpt_load_type = validationFailures;
        model_internal::_doValidationLastValOfEqpt_load_type = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_owner_name : Array = null;
    model_internal var _doValidationLastValOfEqpt_owner_name : String;

    model_internal function _doValidationForEqpt_owner_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_owner_name != null && model_internal::_doValidationLastValOfEqpt_owner_name == value)
           return model_internal::_doValidationCacheOfEqpt_owner_name ;

        _model.model_internal::_eqpt_owner_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_owner_nameAvailable && _internal_eqpt_owner_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_owner_name is required"));
        }

        model_internal::_doValidationCacheOfEqpt_owner_name = validationFailures;
        model_internal::_doValidationLastValOfEqpt_owner_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_exp_d1_dmy : Array = null;
    model_internal var _doValidationLastValOfEqpt_exp_d1_dmy : String;

    model_internal function _doValidationForEqpt_exp_d1_dmy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_exp_d1_dmy != null && model_internal::_doValidationLastValOfEqpt_exp_d1_dmy == value)
           return model_internal::_doValidationCacheOfEqpt_exp_d1_dmy ;

        _model.model_internal::_eqpt_exp_d1_dmyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_exp_d1_dmyAvailable && _internal_eqpt_exp_d1_dmy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_exp_d1_dmy is required"));
        }

        model_internal::_doValidationCacheOfEqpt_exp_d1_dmy = validationFailures;
        model_internal::_doValidationLastValOfEqpt_exp_d1_dmy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_exp_d3_dmy : Array = null;
    model_internal var _doValidationLastValOfEqpt_exp_d3_dmy : String;

    model_internal function _doValidationForEqpt_exp_d3_dmy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_exp_d3_dmy != null && model_internal::_doValidationLastValOfEqpt_exp_d3_dmy == value)
           return model_internal::_doValidationCacheOfEqpt_exp_d3_dmy ;

        _model.model_internal::_eqpt_exp_d3_dmyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_exp_d3_dmyAvailable && _internal_eqpt_exp_d3_dmy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_exp_d3_dmy is required"));
        }

        model_internal::_doValidationCacheOfEqpt_exp_d3_dmy = validationFailures;
        model_internal::_doValidationLastValOfEqpt_exp_d3_dmy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_comments : Array = null;
    model_internal var _doValidationLastValOfEqpt_comments : String;

    model_internal function _doValidationForEqpt_comments(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_comments != null && model_internal::_doValidationLastValOfEqpt_comments == value)
           return model_internal::_doValidationCacheOfEqpt_comments ;

        _model.model_internal::_eqpt_commentsIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_commentsAvailable && _internal_eqpt_comments == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_comments is required"));
        }

        model_internal::_doValidationCacheOfEqpt_comments = validationFailures;
        model_internal::_doValidationLastValOfEqpt_comments = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_exp_d2_dmy : Array = null;
    model_internal var _doValidationLastValOfEqpt_exp_d2_dmy : String;

    model_internal function _doValidationForEqpt_exp_d2_dmy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_exp_d2_dmy != null && model_internal::_doValidationLastValOfEqpt_exp_d2_dmy == value)
           return model_internal::_doValidationCacheOfEqpt_exp_d2_dmy ;

        _model.model_internal::_eqpt_exp_d2_dmyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_exp_d2_dmyAvailable && _internal_eqpt_exp_d2_dmy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_exp_d2_dmy is required"));
        }

        model_internal::_doValidationCacheOfEqpt_exp_d2_dmy = validationFailures;
        model_internal::_doValidationLastValOfEqpt_exp_d2_dmy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqp_must_tare_in : Array = null;
    model_internal var _doValidationLastValOfEqp_must_tare_in : String;

    model_internal function _doValidationForEqp_must_tare_in(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqp_must_tare_in != null && model_internal::_doValidationLastValOfEqp_must_tare_in == value)
           return model_internal::_doValidationCacheOfEqp_must_tare_in ;

        _model.model_internal::_eqp_must_tare_inIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqp_must_tare_inAvailable && _internal_eqp_must_tare_in == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqp_must_tare_in is required"));
        }

        model_internal::_doValidationCacheOfEqp_must_tare_in = validationFailures;
        model_internal::_doValidationLastValOfEqp_must_tare_in = value;

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
    
    model_internal var _doValidationCacheOfEqpt_load_type_name : Array = null;
    model_internal var _doValidationLastValOfEqpt_load_type_name : String;

    model_internal function _doValidationForEqpt_load_type_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_load_type_name != null && model_internal::_doValidationLastValOfEqpt_load_type_name == value)
           return model_internal::_doValidationCacheOfEqpt_load_type_name ;

        _model.model_internal::_eqpt_load_type_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_load_type_nameAvailable && _internal_eqpt_load_type_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_load_type_name is required"));
        }

        model_internal::_doValidationCacheOfEqpt_load_type_name = validationFailures;
        model_internal::_doValidationLastValOfEqpt_load_type_name = value;

        return validationFailures;
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
    
    model_internal var _doValidationCacheOfEqpt_title : Array = null;
    model_internal var _doValidationLastValOfEqpt_title : String;

    model_internal function _doValidationForEqpt_title(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_title != null && model_internal::_doValidationLastValOfEqpt_title == value)
           return model_internal::_doValidationCacheOfEqpt_title ;

        _model.model_internal::_eqpt_titleIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_titleAvailable && _internal_eqpt_title == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_title is required"));
        }

        model_internal::_doValidationCacheOfEqpt_title = validationFailures;
        model_internal::_doValidationLastValOfEqpt_title = value;

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
    
    model_internal var _doValidationCacheOfEqpt_etp_title : Array = null;
    model_internal var _doValidationLastValOfEqpt_etp_title : String;

    model_internal function _doValidationForEqpt_etp_title(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_etp_title != null && model_internal::_doValidationLastValOfEqpt_etp_title == value)
           return model_internal::_doValidationCacheOfEqpt_etp_title ;

        _model.model_internal::_eqpt_etp_titleIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_etp_titleAvailable && _internal_eqpt_etp_title == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_etp_title is required"));
        }

        model_internal::_doValidationCacheOfEqpt_etp_title = validationFailures;
        model_internal::_doValidationLastValOfEqpt_etp_title = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_area : Array = null;
    model_internal var _doValidationLastValOfEqpt_area : String;

    model_internal function _doValidationForEqpt_area(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_area != null && model_internal::_doValidationLastValOfEqpt_area == value)
           return model_internal::_doValidationCacheOfEqpt_area ;

        _model.model_internal::_eqpt_areaIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_areaAvailable && _internal_eqpt_area == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_area is required"));
        }

        model_internal::_doValidationCacheOfEqpt_area = validationFailures;
        model_internal::_doValidationLastValOfEqpt_area = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_max_gross : Array = null;
    model_internal var _doValidationLastValOfEqpt_max_gross : String;

    model_internal function _doValidationForEqpt_max_gross(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_max_gross != null && model_internal::_doValidationLastValOfEqpt_max_gross == value)
           return model_internal::_doValidationCacheOfEqpt_max_gross ;

        _model.model_internal::_eqpt_max_grossIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_max_grossAvailable && _internal_eqpt_max_gross == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_max_gross is required"));
        }

        model_internal::_doValidationCacheOfEqpt_max_gross = validationFailures;
        model_internal::_doValidationLastValOfEqpt_max_gross = value;

        return validationFailures;
    }
    

}

}
