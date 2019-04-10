/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - GUI_ORDER_PERIODS.as.
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
public class _Super_GUI_ORDER_PERIODS extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("GUI_ORDER_PERIODS") == null)
            {
                flash.net.registerClassAlias("GUI_ORDER_PERIODS", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("GUI_ORDER_PERIODS", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _GUI_ORDER_PERIODSEntityMetadata;
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
    private var _internal_oprd_order_id : String;
    private var _internal_oprd_period_end : String;
    private var _internal_oprd_prod_used : Object;
    private var _internal_oprd_prod_code : String;
    private var _internal_oprd_period_no : String;
    private var _internal_oprd_drwr_name : String;
    private var _internal_oprd_prod_qty : String;
    private var _internal_oprd_prod_cmpy : String;
    private var _internal_oprd_unit_name : String;
    private var _internal_oprd_prod_price : Object;
    private var _internal_oprd_period_start : String;
    private var _internal_oprd_price_fixed : String;
    private var _internal_oprd_prod_unit : String;
    private var _internal_oprd_prod_name : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_GUI_ORDER_PERIODS()
    {
        _model = new _GUI_ORDER_PERIODSEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oprd_order_id", model_internal::setterListenerOprd_order_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oprd_period_end", model_internal::setterListenerOprd_period_end));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oprd_prod_used", model_internal::setterListenerOprd_prod_used));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oprd_prod_code", model_internal::setterListenerOprd_prod_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oprd_period_no", model_internal::setterListenerOprd_period_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oprd_drwr_name", model_internal::setterListenerOprd_drwr_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oprd_prod_qty", model_internal::setterListenerOprd_prod_qty));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oprd_prod_cmpy", model_internal::setterListenerOprd_prod_cmpy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oprd_unit_name", model_internal::setterListenerOprd_unit_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oprd_prod_price", model_internal::setterListenerOprd_prod_price));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oprd_period_start", model_internal::setterListenerOprd_period_start));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oprd_price_fixed", model_internal::setterListenerOprd_price_fixed));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oprd_prod_unit", model_internal::setterListenerOprd_prod_unit));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oprd_prod_name", model_internal::setterListenerOprd_prod_name));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get oprd_order_id() : String
    {
        return _internal_oprd_order_id;
    }

    [Bindable(event="propertyChange")]
    public function get oprd_period_end() : String
    {
        return _internal_oprd_period_end;
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_used() : Object
    {
        return _internal_oprd_prod_used;
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_code() : String
    {
        return _internal_oprd_prod_code;
    }

    [Bindable(event="propertyChange")]
    public function get oprd_period_no() : String
    {
        return _internal_oprd_period_no;
    }

    [Bindable(event="propertyChange")]
    public function get oprd_drwr_name() : String
    {
        return _internal_oprd_drwr_name;
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_qty() : String
    {
        return _internal_oprd_prod_qty;
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_cmpy() : String
    {
        return _internal_oprd_prod_cmpy;
    }

    [Bindable(event="propertyChange")]
    public function get oprd_unit_name() : String
    {
        return _internal_oprd_unit_name;
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_price() : Object
    {
        return _internal_oprd_prod_price;
    }

    [Bindable(event="propertyChange")]
    public function get oprd_period_start() : String
    {
        return _internal_oprd_period_start;
    }

    [Bindable(event="propertyChange")]
    public function get oprd_price_fixed() : String
    {
        return _internal_oprd_price_fixed;
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_unit() : String
    {
        return _internal_oprd_prod_unit;
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_name() : String
    {
        return _internal_oprd_prod_name;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set oprd_order_id(value:String) : void
    {
        var oldValue:String = _internal_oprd_order_id;
        if (oldValue !== value)
        {
            _internal_oprd_order_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_order_id", oldValue, _internal_oprd_order_id));
        }
    }

    public function set oprd_period_end(value:String) : void
    {
        var oldValue:String = _internal_oprd_period_end;
        if (oldValue !== value)
        {
            _internal_oprd_period_end = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_period_end", oldValue, _internal_oprd_period_end));
        }
    }

    public function set oprd_prod_used(value:Object) : void
    {
        var oldValue:Object = _internal_oprd_prod_used;
        if (oldValue !== value)
        {
            _internal_oprd_prod_used = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_used", oldValue, _internal_oprd_prod_used));
        }
    }

    public function set oprd_prod_code(value:String) : void
    {
        var oldValue:String = _internal_oprd_prod_code;
        if (oldValue !== value)
        {
            _internal_oprd_prod_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_code", oldValue, _internal_oprd_prod_code));
        }
    }

    public function set oprd_period_no(value:String) : void
    {
        var oldValue:String = _internal_oprd_period_no;
        if (oldValue !== value)
        {
            _internal_oprd_period_no = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_period_no", oldValue, _internal_oprd_period_no));
        }
    }

    public function set oprd_drwr_name(value:String) : void
    {
        var oldValue:String = _internal_oprd_drwr_name;
        if (oldValue !== value)
        {
            _internal_oprd_drwr_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_drwr_name", oldValue, _internal_oprd_drwr_name));
        }
    }

    public function set oprd_prod_qty(value:String) : void
    {
        var oldValue:String = _internal_oprd_prod_qty;
        if (oldValue !== value)
        {
            _internal_oprd_prod_qty = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_qty", oldValue, _internal_oprd_prod_qty));
        }
    }

    public function set oprd_prod_cmpy(value:String) : void
    {
        var oldValue:String = _internal_oprd_prod_cmpy;
        if (oldValue !== value)
        {
            _internal_oprd_prod_cmpy = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_cmpy", oldValue, _internal_oprd_prod_cmpy));
        }
    }

    public function set oprd_unit_name(value:String) : void
    {
        var oldValue:String = _internal_oprd_unit_name;
        if (oldValue !== value)
        {
            _internal_oprd_unit_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_unit_name", oldValue, _internal_oprd_unit_name));
        }
    }

    public function set oprd_prod_price(value:Object) : void
    {
        var oldValue:Object = _internal_oprd_prod_price;
        if (oldValue !== value)
        {
            _internal_oprd_prod_price = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_price", oldValue, _internal_oprd_prod_price));
        }
    }

    public function set oprd_period_start(value:String) : void
    {
        var oldValue:String = _internal_oprd_period_start;
        if (oldValue !== value)
        {
            _internal_oprd_period_start = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_period_start", oldValue, _internal_oprd_period_start));
        }
    }

    public function set oprd_price_fixed(value:String) : void
    {
        var oldValue:String = _internal_oprd_price_fixed;
        if (oldValue !== value)
        {
            _internal_oprd_price_fixed = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_price_fixed", oldValue, _internal_oprd_price_fixed));
        }
    }

    public function set oprd_prod_unit(value:String) : void
    {
        var oldValue:String = _internal_oprd_prod_unit;
        if (oldValue !== value)
        {
            _internal_oprd_prod_unit = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_unit", oldValue, _internal_oprd_prod_unit));
        }
    }

    public function set oprd_prod_name(value:String) : void
    {
        var oldValue:String = _internal_oprd_prod_name;
        if (oldValue !== value)
        {
            _internal_oprd_prod_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_name", oldValue, _internal_oprd_prod_name));
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

    model_internal function setterListenerOprd_order_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOprd_order_id();
    }

    model_internal function setterListenerOprd_period_end(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOprd_period_end();
    }

    model_internal function setterListenerOprd_prod_used(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOprd_prod_used();
    }

    model_internal function setterListenerOprd_prod_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOprd_prod_code();
    }

    model_internal function setterListenerOprd_period_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOprd_period_no();
    }

    model_internal function setterListenerOprd_drwr_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOprd_drwr_name();
    }

    model_internal function setterListenerOprd_prod_qty(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOprd_prod_qty();
    }

    model_internal function setterListenerOprd_prod_cmpy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOprd_prod_cmpy();
    }

    model_internal function setterListenerOprd_unit_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOprd_unit_name();
    }

    model_internal function setterListenerOprd_prod_price(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOprd_prod_price();
    }

    model_internal function setterListenerOprd_period_start(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOprd_period_start();
    }

    model_internal function setterListenerOprd_price_fixed(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOprd_price_fixed();
    }

    model_internal function setterListenerOprd_prod_unit(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOprd_prod_unit();
    }

    model_internal function setterListenerOprd_prod_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOprd_prod_name();
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
        if (!_model.oprd_order_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oprd_order_idValidationFailureMessages);
        }
        if (!_model.oprd_period_endIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oprd_period_endValidationFailureMessages);
        }
        if (!_model.oprd_prod_usedIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oprd_prod_usedValidationFailureMessages);
        }
        if (!_model.oprd_prod_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oprd_prod_codeValidationFailureMessages);
        }
        if (!_model.oprd_period_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oprd_period_noValidationFailureMessages);
        }
        if (!_model.oprd_drwr_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oprd_drwr_nameValidationFailureMessages);
        }
        if (!_model.oprd_prod_qtyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oprd_prod_qtyValidationFailureMessages);
        }
        if (!_model.oprd_prod_cmpyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oprd_prod_cmpyValidationFailureMessages);
        }
        if (!_model.oprd_unit_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oprd_unit_nameValidationFailureMessages);
        }
        if (!_model.oprd_prod_priceIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oprd_prod_priceValidationFailureMessages);
        }
        if (!_model.oprd_period_startIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oprd_period_startValidationFailureMessages);
        }
        if (!_model.oprd_price_fixedIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oprd_price_fixedValidationFailureMessages);
        }
        if (!_model.oprd_prod_unitIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oprd_prod_unitValidationFailureMessages);
        }
        if (!_model.oprd_prod_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oprd_prod_nameValidationFailureMessages);
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
    public function get _model() : _GUI_ORDER_PERIODSEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _GUI_ORDER_PERIODSEntityMetadata) : void
    {
        var oldValue : _GUI_ORDER_PERIODSEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfOprd_order_id : Array = null;
    model_internal var _doValidationLastValOfOprd_order_id : String;

    model_internal function _doValidationForOprd_order_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOprd_order_id != null && model_internal::_doValidationLastValOfOprd_order_id == value)
           return model_internal::_doValidationCacheOfOprd_order_id ;

        _model.model_internal::_oprd_order_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOprd_order_idAvailable && _internal_oprd_order_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oprd_order_id is required"));
        }

        model_internal::_doValidationCacheOfOprd_order_id = validationFailures;
        model_internal::_doValidationLastValOfOprd_order_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOprd_period_end : Array = null;
    model_internal var _doValidationLastValOfOprd_period_end : String;

    model_internal function _doValidationForOprd_period_end(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOprd_period_end != null && model_internal::_doValidationLastValOfOprd_period_end == value)
           return model_internal::_doValidationCacheOfOprd_period_end ;

        _model.model_internal::_oprd_period_endIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOprd_period_endAvailable && _internal_oprd_period_end == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oprd_period_end is required"));
        }

        model_internal::_doValidationCacheOfOprd_period_end = validationFailures;
        model_internal::_doValidationLastValOfOprd_period_end = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOprd_prod_used : Array = null;
    model_internal var _doValidationLastValOfOprd_prod_used : Object;

    model_internal function _doValidationForOprd_prod_used(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOprd_prod_used != null && model_internal::_doValidationLastValOfOprd_prod_used == value)
           return model_internal::_doValidationCacheOfOprd_prod_used ;

        _model.model_internal::_oprd_prod_usedIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOprd_prod_usedAvailable && _internal_oprd_prod_used == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oprd_prod_used is required"));
        }

        model_internal::_doValidationCacheOfOprd_prod_used = validationFailures;
        model_internal::_doValidationLastValOfOprd_prod_used = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOprd_prod_code : Array = null;
    model_internal var _doValidationLastValOfOprd_prod_code : String;

    model_internal function _doValidationForOprd_prod_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOprd_prod_code != null && model_internal::_doValidationLastValOfOprd_prod_code == value)
           return model_internal::_doValidationCacheOfOprd_prod_code ;

        _model.model_internal::_oprd_prod_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOprd_prod_codeAvailable && _internal_oprd_prod_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oprd_prod_code is required"));
        }

        model_internal::_doValidationCacheOfOprd_prod_code = validationFailures;
        model_internal::_doValidationLastValOfOprd_prod_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOprd_period_no : Array = null;
    model_internal var _doValidationLastValOfOprd_period_no : String;

    model_internal function _doValidationForOprd_period_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOprd_period_no != null && model_internal::_doValidationLastValOfOprd_period_no == value)
           return model_internal::_doValidationCacheOfOprd_period_no ;

        _model.model_internal::_oprd_period_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOprd_period_noAvailable && _internal_oprd_period_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oprd_period_no is required"));
        }

        model_internal::_doValidationCacheOfOprd_period_no = validationFailures;
        model_internal::_doValidationLastValOfOprd_period_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOprd_drwr_name : Array = null;
    model_internal var _doValidationLastValOfOprd_drwr_name : String;

    model_internal function _doValidationForOprd_drwr_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOprd_drwr_name != null && model_internal::_doValidationLastValOfOprd_drwr_name == value)
           return model_internal::_doValidationCacheOfOprd_drwr_name ;

        _model.model_internal::_oprd_drwr_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOprd_drwr_nameAvailable && _internal_oprd_drwr_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oprd_drwr_name is required"));
        }

        model_internal::_doValidationCacheOfOprd_drwr_name = validationFailures;
        model_internal::_doValidationLastValOfOprd_drwr_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOprd_prod_qty : Array = null;
    model_internal var _doValidationLastValOfOprd_prod_qty : String;

    model_internal function _doValidationForOprd_prod_qty(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOprd_prod_qty != null && model_internal::_doValidationLastValOfOprd_prod_qty == value)
           return model_internal::_doValidationCacheOfOprd_prod_qty ;

        _model.model_internal::_oprd_prod_qtyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOprd_prod_qtyAvailable && _internal_oprd_prod_qty == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oprd_prod_qty is required"));
        }

        model_internal::_doValidationCacheOfOprd_prod_qty = validationFailures;
        model_internal::_doValidationLastValOfOprd_prod_qty = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOprd_prod_cmpy : Array = null;
    model_internal var _doValidationLastValOfOprd_prod_cmpy : String;

    model_internal function _doValidationForOprd_prod_cmpy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOprd_prod_cmpy != null && model_internal::_doValidationLastValOfOprd_prod_cmpy == value)
           return model_internal::_doValidationCacheOfOprd_prod_cmpy ;

        _model.model_internal::_oprd_prod_cmpyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOprd_prod_cmpyAvailable && _internal_oprd_prod_cmpy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oprd_prod_cmpy is required"));
        }

        model_internal::_doValidationCacheOfOprd_prod_cmpy = validationFailures;
        model_internal::_doValidationLastValOfOprd_prod_cmpy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOprd_unit_name : Array = null;
    model_internal var _doValidationLastValOfOprd_unit_name : String;

    model_internal function _doValidationForOprd_unit_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOprd_unit_name != null && model_internal::_doValidationLastValOfOprd_unit_name == value)
           return model_internal::_doValidationCacheOfOprd_unit_name ;

        _model.model_internal::_oprd_unit_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOprd_unit_nameAvailable && _internal_oprd_unit_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oprd_unit_name is required"));
        }

        model_internal::_doValidationCacheOfOprd_unit_name = validationFailures;
        model_internal::_doValidationLastValOfOprd_unit_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOprd_prod_price : Array = null;
    model_internal var _doValidationLastValOfOprd_prod_price : Object;

    model_internal function _doValidationForOprd_prod_price(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfOprd_prod_price != null && model_internal::_doValidationLastValOfOprd_prod_price == value)
           return model_internal::_doValidationCacheOfOprd_prod_price ;

        _model.model_internal::_oprd_prod_priceIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOprd_prod_priceAvailable && _internal_oprd_prod_price == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oprd_prod_price is required"));
        }

        model_internal::_doValidationCacheOfOprd_prod_price = validationFailures;
        model_internal::_doValidationLastValOfOprd_prod_price = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOprd_period_start : Array = null;
    model_internal var _doValidationLastValOfOprd_period_start : String;

    model_internal function _doValidationForOprd_period_start(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOprd_period_start != null && model_internal::_doValidationLastValOfOprd_period_start == value)
           return model_internal::_doValidationCacheOfOprd_period_start ;

        _model.model_internal::_oprd_period_startIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOprd_period_startAvailable && _internal_oprd_period_start == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oprd_period_start is required"));
        }

        model_internal::_doValidationCacheOfOprd_period_start = validationFailures;
        model_internal::_doValidationLastValOfOprd_period_start = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOprd_price_fixed : Array = null;
    model_internal var _doValidationLastValOfOprd_price_fixed : String;

    model_internal function _doValidationForOprd_price_fixed(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOprd_price_fixed != null && model_internal::_doValidationLastValOfOprd_price_fixed == value)
           return model_internal::_doValidationCacheOfOprd_price_fixed ;

        _model.model_internal::_oprd_price_fixedIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOprd_price_fixedAvailable && _internal_oprd_price_fixed == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oprd_price_fixed is required"));
        }

        model_internal::_doValidationCacheOfOprd_price_fixed = validationFailures;
        model_internal::_doValidationLastValOfOprd_price_fixed = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOprd_prod_unit : Array = null;
    model_internal var _doValidationLastValOfOprd_prod_unit : String;

    model_internal function _doValidationForOprd_prod_unit(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOprd_prod_unit != null && model_internal::_doValidationLastValOfOprd_prod_unit == value)
           return model_internal::_doValidationCacheOfOprd_prod_unit ;

        _model.model_internal::_oprd_prod_unitIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOprd_prod_unitAvailable && _internal_oprd_prod_unit == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oprd_prod_unit is required"));
        }

        model_internal::_doValidationCacheOfOprd_prod_unit = validationFailures;
        model_internal::_doValidationLastValOfOprd_prod_unit = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOprd_prod_name : Array = null;
    model_internal var _doValidationLastValOfOprd_prod_name : String;

    model_internal function _doValidationForOprd_prod_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOprd_prod_name != null && model_internal::_doValidationLastValOfOprd_prod_name == value)
           return model_internal::_doValidationCacheOfOprd_prod_name ;

        _model.model_internal::_oprd_prod_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOprd_prod_nameAvailable && _internal_oprd_prod_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oprd_prod_name is required"));
        }

        model_internal::_doValidationCacheOfOprd_prod_name = validationFailures;
        model_internal::_doValidationLastValOfOprd_prod_name = value;

        return validationFailures;
    }
    

}

}
