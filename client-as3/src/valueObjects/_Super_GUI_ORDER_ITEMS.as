/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - GUI_ORDER_ITEMS.as.
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
import mx.events.CollectionEvent;
import mx.events.PropertyChangeEvent;
import mx.validators.ValidationResult;
import valueObjects.GUI_ORDER_PERIODS;
import valueObjects.OrderItemScheduleLookup;

import flash.net.registerClassAlias;
import flash.net.getClassByAlias;
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.valueobjects.IPropertyIterator;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;

use namespace model_internal;

[ExcludeClass]
public class _Super_GUI_ORDER_ITEMS extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("GUI_ORDER_ITEMS") == null)
            {
                flash.net.registerClassAlias("GUI_ORDER_ITEMS", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("GUI_ORDER_ITEMS", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
        valueObjects.GUI_ORDER_PERIODS.initRemoteClassAliasSingleChild();
        valueObjects.OrderItemScheduleLookup.initRemoteClassAliasSingleChild();
    }

    model_internal var _dminternal_model : _GUI_ORDER_ITEMSEntityMetadata;
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
    private var _internal_oitem_unit_name : String;
    private var _internal_oitem_prod_price : String;
    private var _internal_oitem_prod_unit : String;
    private var _internal_oitem_by_packs : String;
    private var _internal_oitem_prod_name : String;
    private var _internal_oitem_line_no : String;
    private var _internal_oitem_schd_qty : String;
    private var _internal_oitem_price_name : String;
    private var _internal_oitem_prod_qty : String;
    private var _internal_oitem_period_no : String;
    private var _internal_oitem_prod_code : String;
    private var _internal_oitem_periods : ArrayCollection;
    model_internal var _internal_oitem_periods_leaf:valueObjects.GUI_ORDER_PERIODS;
    private var _internal_oitem_padj_code : Object;
    private var _internal_oitem_order_id : String;
    private var _internal_oitem_drwr_name : String;
    private var _internal_oitem_pack_size : String;
    private var _internal_oitem_price_type : String;
    private var _internal_oitem_delv_qty : String;
    private var _internal_oitem_padj_name : Object;
    private var _internal_oitem_schedules : ArrayCollection;
    model_internal var _internal_oitem_schedules_leaf:valueObjects.OrderItemScheduleLookup;
    private var _internal_oitem_load_qty : String;
    private var _internal_oitem_exempt_no : Object;
    private var _internal_oitem_prod_cmpy : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_GUI_ORDER_ITEMS()
    {
        _model = new _GUI_ORDER_ITEMSEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_unit_name", model_internal::setterListenerOitem_unit_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_prod_price", model_internal::setterListenerOitem_prod_price));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_prod_unit", model_internal::setterListenerOitem_prod_unit));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_by_packs", model_internal::setterListenerOitem_by_packs));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_prod_name", model_internal::setterListenerOitem_prod_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_line_no", model_internal::setterListenerOitem_line_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_schd_qty", model_internal::setterListenerOitem_schd_qty));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_price_name", model_internal::setterListenerOitem_price_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_prod_qty", model_internal::setterListenerOitem_prod_qty));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_period_no", model_internal::setterListenerOitem_period_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_prod_code", model_internal::setterListenerOitem_prod_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_periods", model_internal::setterListenerOitem_periods));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_padj_code", model_internal::setterListenerOitem_padj_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_order_id", model_internal::setterListenerOitem_order_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_drwr_name", model_internal::setterListenerOitem_drwr_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_pack_size", model_internal::setterListenerOitem_pack_size));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_price_type", model_internal::setterListenerOitem_price_type));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_delv_qty", model_internal::setterListenerOitem_delv_qty));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_padj_name", model_internal::setterListenerOitem_padj_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_schedules", model_internal::setterListenerOitem_schedules));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_load_qty", model_internal::setterListenerOitem_load_qty));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_exempt_no", model_internal::setterListenerOitem_exempt_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oitem_prod_cmpy", model_internal::setterListenerOitem_prod_cmpy));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get oitem_unit_name() : String
    {
        return _internal_oitem_unit_name;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_price() : String
    {
        return _internal_oitem_prod_price;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_unit() : String
    {
        return _internal_oitem_prod_unit;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_by_packs() : String
    {
        return _internal_oitem_by_packs;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_name() : String
    {
        return _internal_oitem_prod_name;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_line_no() : String
    {
        return _internal_oitem_line_no;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_schd_qty() : String
    {
        return _internal_oitem_schd_qty;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_price_name() : String
    {
        return _internal_oitem_price_name;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_qty() : String
    {
        return _internal_oitem_prod_qty;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_period_no() : String
    {
        return _internal_oitem_period_no;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_code() : String
    {
        return _internal_oitem_prod_code;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_periods() : ArrayCollection
    {
        return _internal_oitem_periods;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_padj_code() : Object
    {
        return _internal_oitem_padj_code;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_order_id() : String
    {
        return _internal_oitem_order_id;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_drwr_name() : String
    {
        return _internal_oitem_drwr_name;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_pack_size() : String
    {
        return _internal_oitem_pack_size;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_price_type() : String
    {
        return _internal_oitem_price_type;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_delv_qty() : String
    {
        return _internal_oitem_delv_qty;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_padj_name() : Object
    {
        return _internal_oitem_padj_name;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_schedules() : ArrayCollection
    {
        return _internal_oitem_schedules;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_load_qty() : String
    {
        return _internal_oitem_load_qty;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_exempt_no() : Object
    {
        return _internal_oitem_exempt_no;
    }

    [Bindable(event="propertyChange")]
    public function get oitem_prod_cmpy() : String
    {
        return _internal_oitem_prod_cmpy;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set oitem_unit_name(value:String) : void
    {
        var oldValue:String = _internal_oitem_unit_name;
        if (oldValue !== value)
        {
            _internal_oitem_unit_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_unit_name", oldValue, _internal_oitem_unit_name));
        }
    }

    public function set oitem_prod_price(value:String) : void
    {
        var oldValue:String = _internal_oitem_prod_price;
        if (oldValue !== value)
        {
            _internal_oitem_prod_price = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_price", oldValue, _internal_oitem_prod_price));
        }
    }

    public function set oitem_prod_unit(value:String) : void
    {
        var oldValue:String = _internal_oitem_prod_unit;
        if (oldValue !== value)
        {
            _internal_oitem_prod_unit = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_unit", oldValue, _internal_oitem_prod_unit));
        }
    }

    public function set oitem_by_packs(value:String) : void
    {
        var oldValue:String = _internal_oitem_by_packs;
        if (oldValue !== value)
        {
            _internal_oitem_by_packs = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_by_packs", oldValue, _internal_oitem_by_packs));
        }
    }

    public function set oitem_prod_name(value:String) : void
    {
        var oldValue:String = _internal_oitem_prod_name;
        if (oldValue !== value)
        {
            _internal_oitem_prod_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_name", oldValue, _internal_oitem_prod_name));
        }
    }

    public function set oitem_line_no(value:String) : void
    {
        var oldValue:String = _internal_oitem_line_no;
        if (oldValue !== value)
        {
            _internal_oitem_line_no = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_line_no", oldValue, _internal_oitem_line_no));
        }
    }

    public function set oitem_schd_qty(value:String) : void
    {
        var oldValue:String = _internal_oitem_schd_qty;
        if (oldValue !== value)
        {
            _internal_oitem_schd_qty = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_schd_qty", oldValue, _internal_oitem_schd_qty));
        }
    }

    public function set oitem_price_name(value:String) : void
    {
        var oldValue:String = _internal_oitem_price_name;
        if (oldValue !== value)
        {
            _internal_oitem_price_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_price_name", oldValue, _internal_oitem_price_name));
        }
    }

    public function set oitem_prod_qty(value:String) : void
    {
        var oldValue:String = _internal_oitem_prod_qty;
        if (oldValue !== value)
        {
            _internal_oitem_prod_qty = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_qty", oldValue, _internal_oitem_prod_qty));
        }
    }

    public function set oitem_period_no(value:String) : void
    {
        var oldValue:String = _internal_oitem_period_no;
        if (oldValue !== value)
        {
            _internal_oitem_period_no = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_period_no", oldValue, _internal_oitem_period_no));
        }
    }

    public function set oitem_prod_code(value:String) : void
    {
        var oldValue:String = _internal_oitem_prod_code;
        if (oldValue !== value)
        {
            _internal_oitem_prod_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_code", oldValue, _internal_oitem_prod_code));
        }
    }

    public function set oitem_periods(value:*) : void
    {
        var oldValue:ArrayCollection = _internal_oitem_periods;
        if (oldValue !== value)
        {
            if (value is ArrayCollection)
            {
                _internal_oitem_periods = value;
            }
            else if (value is Array)
            {
                _internal_oitem_periods = new ArrayCollection(value);
            }
            else if (value == null)
            {
                _internal_oitem_periods = null;
            }
            else
            {
                throw new Error("value of oitem_periods must be a collection");
            }
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_periods", oldValue, _internal_oitem_periods));
        }
    }

    public function set oitem_padj_code(value:Object) : void
    {
        var oldValue:Object = _internal_oitem_padj_code;
        if (oldValue !== value)
        {
            _internal_oitem_padj_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_padj_code", oldValue, _internal_oitem_padj_code));
        }
    }

    public function set oitem_order_id(value:String) : void
    {
        var oldValue:String = _internal_oitem_order_id;
        if (oldValue !== value)
        {
            _internal_oitem_order_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_order_id", oldValue, _internal_oitem_order_id));
        }
    }

    public function set oitem_drwr_name(value:String) : void
    {
        var oldValue:String = _internal_oitem_drwr_name;
        if (oldValue !== value)
        {
            _internal_oitem_drwr_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_drwr_name", oldValue, _internal_oitem_drwr_name));
        }
    }

    public function set oitem_pack_size(value:String) : void
    {
        var oldValue:String = _internal_oitem_pack_size;
        if (oldValue !== value)
        {
            _internal_oitem_pack_size = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_pack_size", oldValue, _internal_oitem_pack_size));
        }
    }

    public function set oitem_price_type(value:String) : void
    {
        var oldValue:String = _internal_oitem_price_type;
        if (oldValue !== value)
        {
            _internal_oitem_price_type = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_price_type", oldValue, _internal_oitem_price_type));
        }
    }

    public function set oitem_delv_qty(value:String) : void
    {
        var oldValue:String = _internal_oitem_delv_qty;
        if (oldValue !== value)
        {
            _internal_oitem_delv_qty = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_delv_qty", oldValue, _internal_oitem_delv_qty));
        }
    }

    public function set oitem_padj_name(value:Object) : void
    {
        var oldValue:Object = _internal_oitem_padj_name;
        if (oldValue !== value)
        {
            _internal_oitem_padj_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_padj_name", oldValue, _internal_oitem_padj_name));
        }
    }

    public function set oitem_schedules(value:*) : void
    {
        var oldValue:ArrayCollection = _internal_oitem_schedules;
        if (oldValue !== value)
        {
            if (value is ArrayCollection)
            {
                _internal_oitem_schedules = value;
            }
            else if (value is Array)
            {
                _internal_oitem_schedules = new ArrayCollection(value);
            }
            else if (value == null)
            {
                _internal_oitem_schedules = null;
            }
            else
            {
                throw new Error("value of oitem_schedules must be a collection");
            }
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_schedules", oldValue, _internal_oitem_schedules));
        }
    }

    public function set oitem_load_qty(value:String) : void
    {
        var oldValue:String = _internal_oitem_load_qty;
        if (oldValue !== value)
        {
            _internal_oitem_load_qty = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_load_qty", oldValue, _internal_oitem_load_qty));
        }
    }

    public function set oitem_exempt_no(value:Object) : void
    {
        var oldValue:Object = _internal_oitem_exempt_no;
        if (oldValue !== value)
        {
            _internal_oitem_exempt_no = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_exempt_no", oldValue, _internal_oitem_exempt_no));
        }
    }

    public function set oitem_prod_cmpy(value:String) : void
    {
        var oldValue:String = _internal_oitem_prod_cmpy;
        if (oldValue !== value)
        {
            _internal_oitem_prod_cmpy = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oitem_prod_cmpy", oldValue, _internal_oitem_prod_cmpy));
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

    model_internal function setterListenerOitem_unit_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_unit_name();
    }

    model_internal function setterListenerOitem_prod_price(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_prod_price();
    }

    model_internal function setterListenerOitem_prod_unit(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_prod_unit();
    }

    model_internal function setterListenerOitem_by_packs(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_by_packs();
    }

    model_internal function setterListenerOitem_prod_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_prod_name();
    }

    model_internal function setterListenerOitem_line_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_line_no();
    }

    model_internal function setterListenerOitem_schd_qty(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_schd_qty();
    }

    model_internal function setterListenerOitem_price_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_price_name();
    }

    model_internal function setterListenerOitem_prod_qty(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_prod_qty();
    }

    model_internal function setterListenerOitem_period_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_period_no();
    }

    model_internal function setterListenerOitem_prod_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_prod_code();
    }

    model_internal function setterListenerOitem_periods(value:flash.events.Event):void
    {
        if (value is mx.events.PropertyChangeEvent)
        {
            if (mx.events.PropertyChangeEvent(value).newValue)
            {
                mx.events.PropertyChangeEvent(value).newValue.addEventListener(mx.events.CollectionEvent.COLLECTION_CHANGE, model_internal::setterListenerOitem_periods);
            }
        }
        _model.invalidateDependentOnOitem_periods();
    }

    model_internal function setterListenerOitem_padj_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_padj_code();
    }

    model_internal function setterListenerOitem_order_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_order_id();
    }

    model_internal function setterListenerOitem_drwr_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_drwr_name();
    }

    model_internal function setterListenerOitem_pack_size(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_pack_size();
    }

    model_internal function setterListenerOitem_price_type(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_price_type();
    }

    model_internal function setterListenerOitem_delv_qty(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_delv_qty();
    }

    model_internal function setterListenerOitem_padj_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_padj_name();
    }

    model_internal function setterListenerOitem_schedules(value:flash.events.Event):void
    {
        if (value is mx.events.PropertyChangeEvent)
        {
            if (mx.events.PropertyChangeEvent(value).newValue)
            {
                mx.events.PropertyChangeEvent(value).newValue.addEventListener(mx.events.CollectionEvent.COLLECTION_CHANGE, model_internal::setterListenerOitem_schedules);
            }
        }
        _model.invalidateDependentOnOitem_schedules();
    }

    model_internal function setterListenerOitem_load_qty(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_load_qty();
    }

    model_internal function setterListenerOitem_exempt_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_exempt_no();
    }

    model_internal function setterListenerOitem_prod_cmpy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOitem_prod_cmpy();
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
        if (!_model.oitem_unit_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_unit_nameValidationFailureMessages);
        }
        if (!_model.oitem_prod_priceIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_prod_priceValidationFailureMessages);
        }
        if (!_model.oitem_prod_unitIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_prod_unitValidationFailureMessages);
        }
        if (!_model.oitem_by_packsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_by_packsValidationFailureMessages);
        }
        if (!_model.oitem_prod_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_prod_nameValidationFailureMessages);
        }
        if (!_model.oitem_line_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_line_noValidationFailureMessages);
        }
        if (!_model.oitem_schd_qtyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_schd_qtyValidationFailureMessages);
        }
        if (!_model.oitem_price_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_price_nameValidationFailureMessages);
        }
        if (!_model.oitem_prod_qtyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_prod_qtyValidationFailureMessages);
        }
        if (!_model.oitem_period_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_period_noValidationFailureMessages);
        }
        if (!_model.oitem_prod_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_prod_codeValidationFailureMessages);
        }
        if (!_model.oitem_periodsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_periodsValidationFailureMessages);
        }
        if (!_model.oitem_padj_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_padj_codeValidationFailureMessages);
        }
        if (!_model.oitem_order_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_order_idValidationFailureMessages);
        }
        if (!_model.oitem_drwr_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_drwr_nameValidationFailureMessages);
        }
        if (!_model.oitem_pack_sizeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_pack_sizeValidationFailureMessages);
        }
        if (!_model.oitem_price_typeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_price_typeValidationFailureMessages);
        }
        if (!_model.oitem_delv_qtyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_delv_qtyValidationFailureMessages);
        }
        if (!_model.oitem_padj_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_padj_nameValidationFailureMessages);
        }
        if (!_model.oitem_schedulesIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_schedulesValidationFailureMessages);
        }
        if (!_model.oitem_load_qtyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_load_qtyValidationFailureMessages);
        }
        if (!_model.oitem_exempt_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_exempt_noValidationFailureMessages);
        }
        if (!_model.oitem_prod_cmpyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oitem_prod_cmpyValidationFailureMessages);
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
    public function get _model() : _GUI_ORDER_ITEMSEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _GUI_ORDER_ITEMSEntityMetadata) : void
    {
        var oldValue : _GUI_ORDER_ITEMSEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfOitem_unit_name : Array = null;
    model_internal var _doValidationLastValOfOitem_unit_name : String;

    model_internal function _doValidationForOitem_unit_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_unit_name != null && model_internal::_doValidationLastValOfOitem_unit_name == value)
           return model_internal::_doValidationCacheOfOitem_unit_name ;

        _model.model_internal::_oitem_unit_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_unit_nameAvailable && _internal_oitem_unit_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_unit_name is required"));
        }

        model_internal::_doValidationCacheOfOitem_unit_name = validationFailures;
        model_internal::_doValidationLastValOfOitem_unit_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_prod_price : Array = null;
    model_internal var _doValidationLastValOfOitem_prod_price : String;

    model_internal function _doValidationForOitem_prod_price(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_prod_price != null && model_internal::_doValidationLastValOfOitem_prod_price == value)
           return model_internal::_doValidationCacheOfOitem_prod_price ;

        _model.model_internal::_oitem_prod_priceIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_prod_priceAvailable && _internal_oitem_prod_price == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_prod_price is required"));
        }

        model_internal::_doValidationCacheOfOitem_prod_price = validationFailures;
        model_internal::_doValidationLastValOfOitem_prod_price = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_prod_unit : Array = null;
    model_internal var _doValidationLastValOfOitem_prod_unit : String;

    model_internal function _doValidationForOitem_prod_unit(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_prod_unit != null && model_internal::_doValidationLastValOfOitem_prod_unit == value)
           return model_internal::_doValidationCacheOfOitem_prod_unit ;

        _model.model_internal::_oitem_prod_unitIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_prod_unitAvailable && _internal_oitem_prod_unit == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_prod_unit is required"));
        }

        model_internal::_doValidationCacheOfOitem_prod_unit = validationFailures;
        model_internal::_doValidationLastValOfOitem_prod_unit = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_by_packs : Array = null;
    model_internal var _doValidationLastValOfOitem_by_packs : String;

    model_internal function _doValidationForOitem_by_packs(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_by_packs != null && model_internal::_doValidationLastValOfOitem_by_packs == value)
           return model_internal::_doValidationCacheOfOitem_by_packs ;

        _model.model_internal::_oitem_by_packsIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_by_packsAvailable && _internal_oitem_by_packs == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_by_packs is required"));
        }

        model_internal::_doValidationCacheOfOitem_by_packs = validationFailures;
        model_internal::_doValidationLastValOfOitem_by_packs = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_prod_name : Array = null;
    model_internal var _doValidationLastValOfOitem_prod_name : String;

    model_internal function _doValidationForOitem_prod_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_prod_name != null && model_internal::_doValidationLastValOfOitem_prod_name == value)
           return model_internal::_doValidationCacheOfOitem_prod_name ;

        _model.model_internal::_oitem_prod_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_prod_nameAvailable && _internal_oitem_prod_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_prod_name is required"));
        }

        model_internal::_doValidationCacheOfOitem_prod_name = validationFailures;
        model_internal::_doValidationLastValOfOitem_prod_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_line_no : Array = null;
    model_internal var _doValidationLastValOfOitem_line_no : String;

    model_internal function _doValidationForOitem_line_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_line_no != null && model_internal::_doValidationLastValOfOitem_line_no == value)
           return model_internal::_doValidationCacheOfOitem_line_no ;

        _model.model_internal::_oitem_line_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_line_noAvailable && _internal_oitem_line_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_line_no is required"));
        }

        model_internal::_doValidationCacheOfOitem_line_no = validationFailures;
        model_internal::_doValidationLastValOfOitem_line_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_schd_qty : Array = null;
    model_internal var _doValidationLastValOfOitem_schd_qty : String;

    model_internal function _doValidationForOitem_schd_qty(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_schd_qty != null && model_internal::_doValidationLastValOfOitem_schd_qty == value)
           return model_internal::_doValidationCacheOfOitem_schd_qty ;

        _model.model_internal::_oitem_schd_qtyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_schd_qtyAvailable && _internal_oitem_schd_qty == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_schd_qty is required"));
        }

        model_internal::_doValidationCacheOfOitem_schd_qty = validationFailures;
        model_internal::_doValidationLastValOfOitem_schd_qty = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_price_name : Array = null;
    model_internal var _doValidationLastValOfOitem_price_name : String;

    model_internal function _doValidationForOitem_price_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_price_name != null && model_internal::_doValidationLastValOfOitem_price_name == value)
           return model_internal::_doValidationCacheOfOitem_price_name ;

        _model.model_internal::_oitem_price_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_price_nameAvailable && _internal_oitem_price_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_price_name is required"));
        }

        model_internal::_doValidationCacheOfOitem_price_name = validationFailures;
        model_internal::_doValidationLastValOfOitem_price_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_prod_qty : Array = null;
    model_internal var _doValidationLastValOfOitem_prod_qty : String;

    model_internal function _doValidationForOitem_prod_qty(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_prod_qty != null && model_internal::_doValidationLastValOfOitem_prod_qty == value)
           return model_internal::_doValidationCacheOfOitem_prod_qty ;

        _model.model_internal::_oitem_prod_qtyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_prod_qtyAvailable && _internal_oitem_prod_qty == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_prod_qty is required"));
        }

        model_internal::_doValidationCacheOfOitem_prod_qty = validationFailures;
        model_internal::_doValidationLastValOfOitem_prod_qty = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_period_no : Array = null;
    model_internal var _doValidationLastValOfOitem_period_no : String;

    model_internal function _doValidationForOitem_period_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_period_no != null && model_internal::_doValidationLastValOfOitem_period_no == value)
           return model_internal::_doValidationCacheOfOitem_period_no ;

        _model.model_internal::_oitem_period_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_period_noAvailable && _internal_oitem_period_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_period_no is required"));
        }

        model_internal::_doValidationCacheOfOitem_period_no = validationFailures;
        model_internal::_doValidationLastValOfOitem_period_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_prod_code : Array = null;
    model_internal var _doValidationLastValOfOitem_prod_code : String;

    model_internal function _doValidationForOitem_prod_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_prod_code != null && model_internal::_doValidationLastValOfOitem_prod_code == value)
           return model_internal::_doValidationCacheOfOitem_prod_code ;

        _model.model_internal::_oitem_prod_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_prod_codeAvailable && _internal_oitem_prod_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_prod_code is required"));
        }

        model_internal::_doValidationCacheOfOitem_prod_code = validationFailures;
        model_internal::_doValidationLastValOfOitem_prod_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_periods : Array = null;
    model_internal var _doValidationLastValOfOitem_periods : ArrayCollection;

    model_internal function _doValidationForOitem_periods(valueIn:Object):Array
    {
        var value : ArrayCollection = valueIn as ArrayCollection;

        if (model_internal::_doValidationCacheOfOitem_periods != null && model_internal::_doValidationLastValOfOitem_periods == value)
           return model_internal::_doValidationCacheOfOitem_periods ;

        _model.model_internal::_oitem_periodsIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_periodsAvailable && _internal_oitem_periods == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_periods is required"));
        }

        model_internal::_doValidationCacheOfOitem_periods = validationFailures;
        model_internal::_doValidationLastValOfOitem_periods = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_padj_code : Array = null;
    model_internal var _doValidationLastValOfOitem_padj_code : Object;

    model_internal function _doValidationForOitem_padj_code(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOitem_padj_code != null && model_internal::_doValidationLastValOfOitem_padj_code == value)
           return model_internal::_doValidationCacheOfOitem_padj_code ;

        _model.model_internal::_oitem_padj_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_padj_codeAvailable && _internal_oitem_padj_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_padj_code is required"));
        }

        model_internal::_doValidationCacheOfOitem_padj_code = validationFailures;
        model_internal::_doValidationLastValOfOitem_padj_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_order_id : Array = null;
    model_internal var _doValidationLastValOfOitem_order_id : String;

    model_internal function _doValidationForOitem_order_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_order_id != null && model_internal::_doValidationLastValOfOitem_order_id == value)
           return model_internal::_doValidationCacheOfOitem_order_id ;

        _model.model_internal::_oitem_order_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_order_idAvailable && _internal_oitem_order_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_order_id is required"));
        }

        model_internal::_doValidationCacheOfOitem_order_id = validationFailures;
        model_internal::_doValidationLastValOfOitem_order_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_drwr_name : Array = null;
    model_internal var _doValidationLastValOfOitem_drwr_name : String;

    model_internal function _doValidationForOitem_drwr_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_drwr_name != null && model_internal::_doValidationLastValOfOitem_drwr_name == value)
           return model_internal::_doValidationCacheOfOitem_drwr_name ;

        _model.model_internal::_oitem_drwr_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_drwr_nameAvailable && _internal_oitem_drwr_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_drwr_name is required"));
        }

        model_internal::_doValidationCacheOfOitem_drwr_name = validationFailures;
        model_internal::_doValidationLastValOfOitem_drwr_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_pack_size : Array = null;
    model_internal var _doValidationLastValOfOitem_pack_size : String;

    model_internal function _doValidationForOitem_pack_size(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_pack_size != null && model_internal::_doValidationLastValOfOitem_pack_size == value)
           return model_internal::_doValidationCacheOfOitem_pack_size ;

        _model.model_internal::_oitem_pack_sizeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_pack_sizeAvailable && _internal_oitem_pack_size == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_pack_size is required"));
        }

        model_internal::_doValidationCacheOfOitem_pack_size = validationFailures;
        model_internal::_doValidationLastValOfOitem_pack_size = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_price_type : Array = null;
    model_internal var _doValidationLastValOfOitem_price_type : String;

    model_internal function _doValidationForOitem_price_type(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_price_type != null && model_internal::_doValidationLastValOfOitem_price_type == value)
           return model_internal::_doValidationCacheOfOitem_price_type ;

        _model.model_internal::_oitem_price_typeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_price_typeAvailable && _internal_oitem_price_type == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_price_type is required"));
        }

        model_internal::_doValidationCacheOfOitem_price_type = validationFailures;
        model_internal::_doValidationLastValOfOitem_price_type = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_delv_qty : Array = null;
    model_internal var _doValidationLastValOfOitem_delv_qty : String;

    model_internal function _doValidationForOitem_delv_qty(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_delv_qty != null && model_internal::_doValidationLastValOfOitem_delv_qty == value)
           return model_internal::_doValidationCacheOfOitem_delv_qty ;

        _model.model_internal::_oitem_delv_qtyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_delv_qtyAvailable && _internal_oitem_delv_qty == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_delv_qty is required"));
        }

        model_internal::_doValidationCacheOfOitem_delv_qty = validationFailures;
        model_internal::_doValidationLastValOfOitem_delv_qty = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_padj_name : Array = null;
    model_internal var _doValidationLastValOfOitem_padj_name : Object;

    model_internal function _doValidationForOitem_padj_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOitem_padj_name != null && model_internal::_doValidationLastValOfOitem_padj_name == value)
           return model_internal::_doValidationCacheOfOitem_padj_name ;

        _model.model_internal::_oitem_padj_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_padj_nameAvailable && _internal_oitem_padj_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_padj_name is required"));
        }

        model_internal::_doValidationCacheOfOitem_padj_name = validationFailures;
        model_internal::_doValidationLastValOfOitem_padj_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_schedules : Array = null;
    model_internal var _doValidationLastValOfOitem_schedules : ArrayCollection;

    model_internal function _doValidationForOitem_schedules(valueIn:Object):Array
    {
        var value : ArrayCollection = valueIn as ArrayCollection;

        if (model_internal::_doValidationCacheOfOitem_schedules != null && model_internal::_doValidationLastValOfOitem_schedules == value)
           return model_internal::_doValidationCacheOfOitem_schedules ;

        _model.model_internal::_oitem_schedulesIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_schedulesAvailable && _internal_oitem_schedules == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_schedules is required"));
        }

        model_internal::_doValidationCacheOfOitem_schedules = validationFailures;
        model_internal::_doValidationLastValOfOitem_schedules = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_load_qty : Array = null;
    model_internal var _doValidationLastValOfOitem_load_qty : String;

    model_internal function _doValidationForOitem_load_qty(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_load_qty != null && model_internal::_doValidationLastValOfOitem_load_qty == value)
           return model_internal::_doValidationCacheOfOitem_load_qty ;

        _model.model_internal::_oitem_load_qtyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_load_qtyAvailable && _internal_oitem_load_qty == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_load_qty is required"));
        }

        model_internal::_doValidationCacheOfOitem_load_qty = validationFailures;
        model_internal::_doValidationLastValOfOitem_load_qty = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_exempt_no : Array = null;
    model_internal var _doValidationLastValOfOitem_exempt_no : Object;

    model_internal function _doValidationForOitem_exempt_no(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOitem_exempt_no != null && model_internal::_doValidationLastValOfOitem_exempt_no == value)
           return model_internal::_doValidationCacheOfOitem_exempt_no ;

        _model.model_internal::_oitem_exempt_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_exempt_noAvailable && _internal_oitem_exempt_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_exempt_no is required"));
        }

        model_internal::_doValidationCacheOfOitem_exempt_no = validationFailures;
        model_internal::_doValidationLastValOfOitem_exempt_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOitem_prod_cmpy : Array = null;
    model_internal var _doValidationLastValOfOitem_prod_cmpy : String;

    model_internal function _doValidationForOitem_prod_cmpy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOitem_prod_cmpy != null && model_internal::_doValidationLastValOfOitem_prod_cmpy == value)
           return model_internal::_doValidationCacheOfOitem_prod_cmpy ;

        _model.model_internal::_oitem_prod_cmpyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOitem_prod_cmpyAvailable && _internal_oitem_prod_cmpy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oitem_prod_cmpy is required"));
        }

        model_internal::_doValidationCacheOfOitem_prod_cmpy = validationFailures;
        model_internal::_doValidationLastValOfOitem_prod_cmpy = value;

        return validationFailures;
    }
    

}

}
