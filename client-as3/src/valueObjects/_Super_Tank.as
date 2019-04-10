/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - Tank.as.
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
public class _Super_Tank extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("Tank") == null)
            {
                flash.net.registerClassAlias("Tank", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("Tank", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _TankEntityMetadata;
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
    private var _internal_tank_base : String;
    private var _internal_quantity : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_Tank()
    {
        _model = new _TankEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tank_base", model_internal::setterListenerTank_base));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "quantity", model_internal::setterListenerQuantity));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get tank_base() : String
    {
        return _internal_tank_base;
    }

    [Bindable(event="propertyChange")]
    public function get quantity() : String
    {
        return _internal_quantity;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set tank_base(value:String) : void
    {
        var oldValue:String = _internal_tank_base;
        if (oldValue !== value)
        {
            _internal_tank_base = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tank_base", oldValue, _internal_tank_base));
        }
    }

    public function set quantity(value:String) : void
    {
        var oldValue:String = _internal_quantity;
        if (oldValue !== value)
        {
            _internal_quantity = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "quantity", oldValue, _internal_quantity));
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

    model_internal function setterListenerTank_base(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTank_base();
    }

    model_internal function setterListenerQuantity(value:flash.events.Event):void
    {
        _model.invalidateDependentOnQuantity();
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
        if (!_model.tank_baseIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tank_baseValidationFailureMessages);
        }
        if (!_model.quantityIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_quantityValidationFailureMessages);
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
    public function get _model() : _TankEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _TankEntityMetadata) : void
    {
        var oldValue : _TankEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfTank_base : Array = null;
    model_internal var _doValidationLastValOfTank_base : String;

    model_internal function _doValidationForTank_base(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTank_base != null && model_internal::_doValidationLastValOfTank_base == value)
           return model_internal::_doValidationCacheOfTank_base ;

        _model.model_internal::_tank_baseIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTank_baseAvailable && _internal_tank_base == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tank_base is required"));
        }

        model_internal::_doValidationCacheOfTank_base = validationFailures;
        model_internal::_doValidationLastValOfTank_base = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfQuantity : Array = null;
    model_internal var _doValidationLastValOfQuantity : String;

    model_internal function _doValidationForQuantity(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfQuantity != null && model_internal::_doValidationLastValOfQuantity == value)
           return model_internal::_doValidationCacheOfQuantity ;

        _model.model_internal::_quantityIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isQuantityAvailable && _internal_quantity == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "quantity is required"));
        }

        model_internal::_doValidationCacheOfQuantity = validationFailures;
        model_internal::_doValidationLastValOfQuantity = value;

        return validationFailures;
    }
    

}

}
