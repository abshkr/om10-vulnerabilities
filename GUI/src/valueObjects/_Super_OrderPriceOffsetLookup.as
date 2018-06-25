/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - OrderPriceOffsetLookup.as.
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
public class _Super_OrderPriceOffsetLookup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("OrderPriceOffsetLookup") == null)
            {
                flash.net.registerClassAlias("OrderPriceOffsetLookup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("OrderPriceOffsetLookup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _OrderPriceOffsetLookupEntityMetadata;
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
    private var _internal_proff_deb_type : String;
    private var _internal_proff_name : String;
    private var _internal_proff_to_print : String;
    private var _internal_proff_deb_name : String;
    private var _internal_proff_apply_name : String;
    private var _internal_proff_code : String;
    private var _internal_proff_apply : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_OrderPriceOffsetLookup()
    {
        _model = new _OrderPriceOffsetLookupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "proff_deb_type", model_internal::setterListenerProff_deb_type));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "proff_name", model_internal::setterListenerProff_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "proff_to_print", model_internal::setterListenerProff_to_print));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "proff_deb_name", model_internal::setterListenerProff_deb_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "proff_apply_name", model_internal::setterListenerProff_apply_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "proff_code", model_internal::setterListenerProff_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "proff_apply", model_internal::setterListenerProff_apply));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get proff_deb_type() : String
    {
        return _internal_proff_deb_type;
    }

    [Bindable(event="propertyChange")]
    public function get proff_name() : String
    {
        return _internal_proff_name;
    }

    [Bindable(event="propertyChange")]
    public function get proff_to_print() : String
    {
        return _internal_proff_to_print;
    }

    [Bindable(event="propertyChange")]
    public function get proff_deb_name() : String
    {
        return _internal_proff_deb_name;
    }

    [Bindable(event="propertyChange")]
    public function get proff_apply_name() : String
    {
        return _internal_proff_apply_name;
    }

    [Bindable(event="propertyChange")]
    public function get proff_code() : String
    {
        return _internal_proff_code;
    }

    [Bindable(event="propertyChange")]
    public function get proff_apply() : String
    {
        return _internal_proff_apply;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set proff_deb_type(value:String) : void
    {
        var oldValue:String = _internal_proff_deb_type;
        if (oldValue !== value)
        {
            _internal_proff_deb_type = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_deb_type", oldValue, _internal_proff_deb_type));
        }
    }

    public function set proff_name(value:String) : void
    {
        var oldValue:String = _internal_proff_name;
        if (oldValue !== value)
        {
            _internal_proff_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_name", oldValue, _internal_proff_name));
        }
    }

    public function set proff_to_print(value:String) : void
    {
        var oldValue:String = _internal_proff_to_print;
        if (oldValue !== value)
        {
            _internal_proff_to_print = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_to_print", oldValue, _internal_proff_to_print));
        }
    }

    public function set proff_deb_name(value:String) : void
    {
        var oldValue:String = _internal_proff_deb_name;
        if (oldValue !== value)
        {
            _internal_proff_deb_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_deb_name", oldValue, _internal_proff_deb_name));
        }
    }

    public function set proff_apply_name(value:String) : void
    {
        var oldValue:String = _internal_proff_apply_name;
        if (oldValue !== value)
        {
            _internal_proff_apply_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_apply_name", oldValue, _internal_proff_apply_name));
        }
    }

    public function set proff_code(value:String) : void
    {
        var oldValue:String = _internal_proff_code;
        if (oldValue !== value)
        {
            _internal_proff_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_code", oldValue, _internal_proff_code));
        }
    }

    public function set proff_apply(value:String) : void
    {
        var oldValue:String = _internal_proff_apply;
        if (oldValue !== value)
        {
            _internal_proff_apply = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_apply", oldValue, _internal_proff_apply));
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

    model_internal function setterListenerProff_deb_type(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProff_deb_type();
    }

    model_internal function setterListenerProff_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProff_name();
    }

    model_internal function setterListenerProff_to_print(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProff_to_print();
    }

    model_internal function setterListenerProff_deb_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProff_deb_name();
    }

    model_internal function setterListenerProff_apply_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProff_apply_name();
    }

    model_internal function setterListenerProff_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProff_code();
    }

    model_internal function setterListenerProff_apply(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProff_apply();
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
        if (!_model.proff_deb_typeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_proff_deb_typeValidationFailureMessages);
        }
        if (!_model.proff_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_proff_nameValidationFailureMessages);
        }
        if (!_model.proff_to_printIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_proff_to_printValidationFailureMessages);
        }
        if (!_model.proff_deb_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_proff_deb_nameValidationFailureMessages);
        }
        if (!_model.proff_apply_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_proff_apply_nameValidationFailureMessages);
        }
        if (!_model.proff_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_proff_codeValidationFailureMessages);
        }
        if (!_model.proff_applyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_proff_applyValidationFailureMessages);
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
    public function get _model() : _OrderPriceOffsetLookupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _OrderPriceOffsetLookupEntityMetadata) : void
    {
        var oldValue : _OrderPriceOffsetLookupEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfProff_deb_type : Array = null;
    model_internal var _doValidationLastValOfProff_deb_type : String;

    model_internal function _doValidationForProff_deb_type(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfProff_deb_type != null && model_internal::_doValidationLastValOfProff_deb_type == value)
           return model_internal::_doValidationCacheOfProff_deb_type ;

        _model.model_internal::_proff_deb_typeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProff_deb_typeAvailable && _internal_proff_deb_type == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "proff_deb_type is required"));
        }

        model_internal::_doValidationCacheOfProff_deb_type = validationFailures;
        model_internal::_doValidationLastValOfProff_deb_type = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProff_name : Array = null;
    model_internal var _doValidationLastValOfProff_name : String;

    model_internal function _doValidationForProff_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfProff_name != null && model_internal::_doValidationLastValOfProff_name == value)
           return model_internal::_doValidationCacheOfProff_name ;

        _model.model_internal::_proff_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProff_nameAvailable && _internal_proff_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "proff_name is required"));
        }

        model_internal::_doValidationCacheOfProff_name = validationFailures;
        model_internal::_doValidationLastValOfProff_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProff_to_print : Array = null;
    model_internal var _doValidationLastValOfProff_to_print : String;

    model_internal function _doValidationForProff_to_print(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfProff_to_print != null && model_internal::_doValidationLastValOfProff_to_print == value)
           return model_internal::_doValidationCacheOfProff_to_print ;

        _model.model_internal::_proff_to_printIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProff_to_printAvailable && _internal_proff_to_print == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "proff_to_print is required"));
        }

        model_internal::_doValidationCacheOfProff_to_print = validationFailures;
        model_internal::_doValidationLastValOfProff_to_print = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProff_deb_name : Array = null;
    model_internal var _doValidationLastValOfProff_deb_name : String;

    model_internal function _doValidationForProff_deb_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfProff_deb_name != null && model_internal::_doValidationLastValOfProff_deb_name == value)
           return model_internal::_doValidationCacheOfProff_deb_name ;

        _model.model_internal::_proff_deb_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProff_deb_nameAvailable && _internal_proff_deb_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "proff_deb_name is required"));
        }

        model_internal::_doValidationCacheOfProff_deb_name = validationFailures;
        model_internal::_doValidationLastValOfProff_deb_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProff_apply_name : Array = null;
    model_internal var _doValidationLastValOfProff_apply_name : String;

    model_internal function _doValidationForProff_apply_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfProff_apply_name != null && model_internal::_doValidationLastValOfProff_apply_name == value)
           return model_internal::_doValidationCacheOfProff_apply_name ;

        _model.model_internal::_proff_apply_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProff_apply_nameAvailable && _internal_proff_apply_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "proff_apply_name is required"));
        }

        model_internal::_doValidationCacheOfProff_apply_name = validationFailures;
        model_internal::_doValidationLastValOfProff_apply_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProff_code : Array = null;
    model_internal var _doValidationLastValOfProff_code : String;

    model_internal function _doValidationForProff_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfProff_code != null && model_internal::_doValidationLastValOfProff_code == value)
           return model_internal::_doValidationCacheOfProff_code ;

        _model.model_internal::_proff_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProff_codeAvailable && _internal_proff_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "proff_code is required"));
        }

        model_internal::_doValidationCacheOfProff_code = validationFailures;
        model_internal::_doValidationLastValOfProff_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfProff_apply : Array = null;
    model_internal var _doValidationLastValOfProff_apply : String;

    model_internal function _doValidationForProff_apply(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfProff_apply != null && model_internal::_doValidationLastValOfProff_apply == value)
           return model_internal::_doValidationCacheOfProff_apply ;

        _model.model_internal::_proff_applyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProff_applyAvailable && _internal_proff_apply == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "proff_apply is required"));
        }

        model_internal::_doValidationCacheOfProff_apply = validationFailures;
        model_internal::_doValidationLastValOfProff_apply = value;

        return validationFailures;
    }
    

}

}
