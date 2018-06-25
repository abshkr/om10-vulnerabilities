/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - OrderInstructions.as.
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
public class _Super_OrderInstructions extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("OrderInstructions") == null)
            {
                flash.net.registerClassAlias("OrderInstructions", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("OrderInstructions", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _OrderInstructionsEntityMetadata;
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
    private var _internal_oinst_order : String;
    private var _internal_oinst_counter : String;
    private var _internal_oinst_text : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_OrderInstructions()
    {
        _model = new _OrderInstructionsEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oinst_order", model_internal::setterListenerOinst_order));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oinst_counter", model_internal::setterListenerOinst_counter));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "oinst_text", model_internal::setterListenerOinst_text));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get oinst_order() : String
    {
        return _internal_oinst_order;
    }

    [Bindable(event="propertyChange")]
    public function get oinst_counter() : String
    {
        return _internal_oinst_counter;
    }

    [Bindable(event="propertyChange")]
    public function get oinst_text() : String
    {
        return _internal_oinst_text;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set oinst_order(value:String) : void
    {
        var oldValue:String = _internal_oinst_order;
        if (oldValue !== value)
        {
            _internal_oinst_order = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oinst_order", oldValue, _internal_oinst_order));
        }
    }

    public function set oinst_counter(value:String) : void
    {
        var oldValue:String = _internal_oinst_counter;
        if (oldValue !== value)
        {
            _internal_oinst_counter = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oinst_counter", oldValue, _internal_oinst_counter));
        }
    }

    public function set oinst_text(value:String) : void
    {
        var oldValue:String = _internal_oinst_text;
        if (oldValue !== value)
        {
            _internal_oinst_text = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oinst_text", oldValue, _internal_oinst_text));
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

    model_internal function setterListenerOinst_order(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOinst_order();
    }

    model_internal function setterListenerOinst_counter(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOinst_counter();
    }

    model_internal function setterListenerOinst_text(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOinst_text();
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
        if (!_model.oinst_orderIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oinst_orderValidationFailureMessages);
        }
        if (!_model.oinst_counterIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oinst_counterValidationFailureMessages);
        }
        if (!_model.oinst_textIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_oinst_textValidationFailureMessages);
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
    public function get _model() : _OrderInstructionsEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _OrderInstructionsEntityMetadata) : void
    {
        var oldValue : _OrderInstructionsEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfOinst_order : Array = null;
    model_internal var _doValidationLastValOfOinst_order : String;

    model_internal function _doValidationForOinst_order(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOinst_order != null && model_internal::_doValidationLastValOfOinst_order == value)
           return model_internal::_doValidationCacheOfOinst_order ;

        _model.model_internal::_oinst_orderIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOinst_orderAvailable && _internal_oinst_order == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oinst_order is required"));
        }

        model_internal::_doValidationCacheOfOinst_order = validationFailures;
        model_internal::_doValidationLastValOfOinst_order = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOinst_counter : Array = null;
    model_internal var _doValidationLastValOfOinst_counter : String;

    model_internal function _doValidationForOinst_counter(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOinst_counter != null && model_internal::_doValidationLastValOfOinst_counter == value)
           return model_internal::_doValidationCacheOfOinst_counter ;

        _model.model_internal::_oinst_counterIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOinst_counterAvailable && _internal_oinst_counter == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oinst_counter is required"));
        }

        model_internal::_doValidationCacheOfOinst_counter = validationFailures;
        model_internal::_doValidationLastValOfOinst_counter = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOinst_text : Array = null;
    model_internal var _doValidationLastValOfOinst_text : String;

    model_internal function _doValidationForOinst_text(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOinst_text != null && model_internal::_doValidationLastValOfOinst_text == value)
           return model_internal::_doValidationCacheOfOinst_text ;

        _model.model_internal::_oinst_textIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOinst_textAvailable && _internal_oinst_text == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "oinst_text is required"));
        }

        model_internal::_doValidationCacheOfOinst_text = validationFailures;
        model_internal::_doValidationLastValOfOinst_text = value;

        return validationFailures;
    }
    

}

}
