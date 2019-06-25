/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - BA_Meters.as.
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
public class _Super_BA_Meters extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("BA_Meters") == null)
            {
                flash.net.registerClassAlias("BA_Meters", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("BA_Meters", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _BA_MetersEntityMetadata;
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
    private var _internal_ba_meter_name : String;
    private var _internal_bam_kfa : String;
    private var _internal_bam_max_flow : String;
    private var _internal_bam_min_flow : String;
    private var _internal_bam_usage : String;
    private var _internal_bam_name : String;
    private var _internal_bam_code : String;
    private var _internal_bam_kdate_dmy : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_BA_Meters()
    {
        _model = new _BA_MetersEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "ba_meter_name", model_internal::setterListenerBa_meter_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "bam_kfa", model_internal::setterListenerBam_kfa));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "bam_max_flow", model_internal::setterListenerBam_max_flow));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "bam_min_flow", model_internal::setterListenerBam_min_flow));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "bam_usage", model_internal::setterListenerBam_usage));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "bam_name", model_internal::setterListenerBam_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "bam_code", model_internal::setterListenerBam_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "bam_kdate_dmy", model_internal::setterListenerBam_kdate_dmy));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get ba_meter_name() : String
    {
        return _internal_ba_meter_name;
    }

    [Bindable(event="propertyChange")]
    public function get bam_kfa() : String
    {
        return _internal_bam_kfa;
    }

    [Bindable(event="propertyChange")]
    public function get bam_max_flow() : String
    {
        return _internal_bam_max_flow;
    }

    [Bindable(event="propertyChange")]
    public function get bam_min_flow() : String
    {
        return _internal_bam_min_flow;
    }

    [Bindable(event="propertyChange")]
    public function get bam_usage() : String
    {
        return _internal_bam_usage;
    }

    [Bindable(event="propertyChange")]
    public function get bam_name() : String
    {
        return _internal_bam_name;
    }

    [Bindable(event="propertyChange")]
    public function get bam_code() : String
    {
        return _internal_bam_code;
    }

    [Bindable(event="propertyChange")]
    public function get bam_kdate_dmy() : String
    {
        return _internal_bam_kdate_dmy;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set ba_meter_name(value:String) : void
    {
        var oldValue:String = _internal_ba_meter_name;
        if (oldValue !== value)
        {
            _internal_ba_meter_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ba_meter_name", oldValue, _internal_ba_meter_name));
        }
    }

    public function set bam_kfa(value:String) : void
    {
        var oldValue:String = _internal_bam_kfa;
        if (oldValue !== value)
        {
            _internal_bam_kfa = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_kfa", oldValue, _internal_bam_kfa));
        }
    }

    public function set bam_max_flow(value:String) : void
    {
        var oldValue:String = _internal_bam_max_flow;
        if (oldValue !== value)
        {
            _internal_bam_max_flow = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_max_flow", oldValue, _internal_bam_max_flow));
        }
    }

    public function set bam_min_flow(value:String) : void
    {
        var oldValue:String = _internal_bam_min_flow;
        if (oldValue !== value)
        {
            _internal_bam_min_flow = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_min_flow", oldValue, _internal_bam_min_flow));
        }
    }

    public function set bam_usage(value:String) : void
    {
        var oldValue:String = _internal_bam_usage;
        if (oldValue !== value)
        {
            _internal_bam_usage = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_usage", oldValue, _internal_bam_usage));
        }
    }

    public function set bam_name(value:String) : void
    {
        var oldValue:String = _internal_bam_name;
        if (oldValue !== value)
        {
            _internal_bam_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_name", oldValue, _internal_bam_name));
        }
    }

    public function set bam_code(value:String) : void
    {
        var oldValue:String = _internal_bam_code;
        if (oldValue !== value)
        {
            _internal_bam_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_code", oldValue, _internal_bam_code));
        }
    }

    public function set bam_kdate_dmy(value:String) : void
    {
        var oldValue:String = _internal_bam_kdate_dmy;
        if (oldValue !== value)
        {
            _internal_bam_kdate_dmy = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_kdate_dmy", oldValue, _internal_bam_kdate_dmy));
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

    model_internal function setterListenerBa_meter_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBa_meter_name();
    }

    model_internal function setterListenerBam_kfa(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBam_kfa();
    }

    model_internal function setterListenerBam_max_flow(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBam_max_flow();
    }

    model_internal function setterListenerBam_min_flow(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBam_min_flow();
    }

    model_internal function setterListenerBam_usage(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBam_usage();
    }

    model_internal function setterListenerBam_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBam_name();
    }

    model_internal function setterListenerBam_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBam_code();
    }

    model_internal function setterListenerBam_kdate_dmy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBam_kdate_dmy();
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
        if (!_model.ba_meter_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_ba_meter_nameValidationFailureMessages);
        }
        if (!_model.bam_kfaIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_bam_kfaValidationFailureMessages);
        }
        if (!_model.bam_max_flowIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_bam_max_flowValidationFailureMessages);
        }
        if (!_model.bam_min_flowIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_bam_min_flowValidationFailureMessages);
        }
        if (!_model.bam_usageIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_bam_usageValidationFailureMessages);
        }
        if (!_model.bam_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_bam_nameValidationFailureMessages);
        }
        if (!_model.bam_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_bam_codeValidationFailureMessages);
        }
        if (!_model.bam_kdate_dmyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_bam_kdate_dmyValidationFailureMessages);
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
    public function get _model() : _BA_MetersEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _BA_MetersEntityMetadata) : void
    {
        var oldValue : _BA_MetersEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfBa_meter_name : Array = null;
    model_internal var _doValidationLastValOfBa_meter_name : String;

    model_internal function _doValidationForBa_meter_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBa_meter_name != null && model_internal::_doValidationLastValOfBa_meter_name == value)
           return model_internal::_doValidationCacheOfBa_meter_name ;

        _model.model_internal::_ba_meter_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBa_meter_nameAvailable && _internal_ba_meter_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "ba_meter_name is required"));
        }

        model_internal::_doValidationCacheOfBa_meter_name = validationFailures;
        model_internal::_doValidationLastValOfBa_meter_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBam_kfa : Array = null;
    model_internal var _doValidationLastValOfBam_kfa : String;

    model_internal function _doValidationForBam_kfa(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBam_kfa != null && model_internal::_doValidationLastValOfBam_kfa == value)
           return model_internal::_doValidationCacheOfBam_kfa ;

        _model.model_internal::_bam_kfaIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBam_kfaAvailable && _internal_bam_kfa == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "bam_kfa is required"));
        }

        model_internal::_doValidationCacheOfBam_kfa = validationFailures;
        model_internal::_doValidationLastValOfBam_kfa = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBam_max_flow : Array = null;
    model_internal var _doValidationLastValOfBam_max_flow : String;

    model_internal function _doValidationForBam_max_flow(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBam_max_flow != null && model_internal::_doValidationLastValOfBam_max_flow == value)
           return model_internal::_doValidationCacheOfBam_max_flow ;

        _model.model_internal::_bam_max_flowIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBam_max_flowAvailable && _internal_bam_max_flow == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "bam_max_flow is required"));
        }

        model_internal::_doValidationCacheOfBam_max_flow = validationFailures;
        model_internal::_doValidationLastValOfBam_max_flow = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBam_min_flow : Array = null;
    model_internal var _doValidationLastValOfBam_min_flow : String;

    model_internal function _doValidationForBam_min_flow(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBam_min_flow != null && model_internal::_doValidationLastValOfBam_min_flow == value)
           return model_internal::_doValidationCacheOfBam_min_flow ;

        _model.model_internal::_bam_min_flowIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBam_min_flowAvailable && _internal_bam_min_flow == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "bam_min_flow is required"));
        }

        model_internal::_doValidationCacheOfBam_min_flow = validationFailures;
        model_internal::_doValidationLastValOfBam_min_flow = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBam_usage : Array = null;
    model_internal var _doValidationLastValOfBam_usage : String;

    model_internal function _doValidationForBam_usage(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBam_usage != null && model_internal::_doValidationLastValOfBam_usage == value)
           return model_internal::_doValidationCacheOfBam_usage ;

        _model.model_internal::_bam_usageIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBam_usageAvailable && _internal_bam_usage == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "bam_usage is required"));
        }

        model_internal::_doValidationCacheOfBam_usage = validationFailures;
        model_internal::_doValidationLastValOfBam_usage = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBam_name : Array = null;
    model_internal var _doValidationLastValOfBam_name : String;

    model_internal function _doValidationForBam_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBam_name != null && model_internal::_doValidationLastValOfBam_name == value)
           return model_internal::_doValidationCacheOfBam_name ;

        _model.model_internal::_bam_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBam_nameAvailable && _internal_bam_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "bam_name is required"));
        }

        model_internal::_doValidationCacheOfBam_name = validationFailures;
        model_internal::_doValidationLastValOfBam_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBam_code : Array = null;
    model_internal var _doValidationLastValOfBam_code : String;

    model_internal function _doValidationForBam_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBam_code != null && model_internal::_doValidationLastValOfBam_code == value)
           return model_internal::_doValidationCacheOfBam_code ;

        _model.model_internal::_bam_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBam_codeAvailable && _internal_bam_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "bam_code is required"));
        }

        model_internal::_doValidationCacheOfBam_code = validationFailures;
        model_internal::_doValidationLastValOfBam_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBam_kdate_dmy : Array = null;
    model_internal var _doValidationLastValOfBam_kdate_dmy : String;

    model_internal function _doValidationForBam_kdate_dmy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBam_kdate_dmy != null && model_internal::_doValidationLastValOfBam_kdate_dmy == value)
           return model_internal::_doValidationCacheOfBam_kdate_dmy ;

        _model.model_internal::_bam_kdate_dmyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBam_kdate_dmyAvailable && _internal_bam_kdate_dmy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "bam_kdate_dmy is required"));
        }

        model_internal::_doValidationCacheOfBam_kdate_dmy = validationFailures;
        model_internal::_doValidationLastValOfBam_kdate_dmy = value;

        return validationFailures;
    }
    

}

}
