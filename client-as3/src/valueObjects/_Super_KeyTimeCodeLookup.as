/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - KeyTimeCodeLookup.as.
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
public class _Super_KeyTimeCodeLookup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("KeyTimeCodeLookup") == null)
            {
                flash.net.registerClassAlias("KeyTimeCodeLookup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("KeyTimeCodeLookup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _KeyTimeCodeLookupEntityMetadata;
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
    private var _internal_tcd_fri : String;
    private var _internal_tcd_sun : String;
    private var _internal_tcd_wed : String;
    private var _internal_tcd_sat : String;
    private var _internal_tcd_thu : String;
    private var _internal_tcd_tue : String;
    private var _internal_tcd_mon : String;
    private var _internal_tcd_title : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_KeyTimeCodeLookup()
    {
        _model = new _KeyTimeCodeLookupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tcd_fri", model_internal::setterListenerTcd_fri));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tcd_sun", model_internal::setterListenerTcd_sun));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tcd_wed", model_internal::setterListenerTcd_wed));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tcd_sat", model_internal::setterListenerTcd_sat));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tcd_thu", model_internal::setterListenerTcd_thu));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tcd_tue", model_internal::setterListenerTcd_tue));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tcd_mon", model_internal::setterListenerTcd_mon));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "tcd_title", model_internal::setterListenerTcd_title));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get tcd_fri() : String
    {
        return _internal_tcd_fri;
    }

    [Bindable(event="propertyChange")]
    public function get tcd_sun() : String
    {
        return _internal_tcd_sun;
    }

    [Bindable(event="propertyChange")]
    public function get tcd_wed() : String
    {
        return _internal_tcd_wed;
    }

    [Bindable(event="propertyChange")]
    public function get tcd_sat() : String
    {
        return _internal_tcd_sat;
    }

    [Bindable(event="propertyChange")]
    public function get tcd_thu() : String
    {
        return _internal_tcd_thu;
    }

    [Bindable(event="propertyChange")]
    public function get tcd_tue() : String
    {
        return _internal_tcd_tue;
    }

    [Bindable(event="propertyChange")]
    public function get tcd_mon() : String
    {
        return _internal_tcd_mon;
    }

    [Bindable(event="propertyChange")]
    public function get tcd_title() : String
    {
        return _internal_tcd_title;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set tcd_fri(value:String) : void
    {
        var oldValue:String = _internal_tcd_fri;
        if (oldValue !== value)
        {
            _internal_tcd_fri = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_fri", oldValue, _internal_tcd_fri));
        }
    }

    public function set tcd_sun(value:String) : void
    {
        var oldValue:String = _internal_tcd_sun;
        if (oldValue !== value)
        {
            _internal_tcd_sun = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_sun", oldValue, _internal_tcd_sun));
        }
    }

    public function set tcd_wed(value:String) : void
    {
        var oldValue:String = _internal_tcd_wed;
        if (oldValue !== value)
        {
            _internal_tcd_wed = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_wed", oldValue, _internal_tcd_wed));
        }
    }

    public function set tcd_sat(value:String) : void
    {
        var oldValue:String = _internal_tcd_sat;
        if (oldValue !== value)
        {
            _internal_tcd_sat = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_sat", oldValue, _internal_tcd_sat));
        }
    }

    public function set tcd_thu(value:String) : void
    {
        var oldValue:String = _internal_tcd_thu;
        if (oldValue !== value)
        {
            _internal_tcd_thu = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_thu", oldValue, _internal_tcd_thu));
        }
    }

    public function set tcd_tue(value:String) : void
    {
        var oldValue:String = _internal_tcd_tue;
        if (oldValue !== value)
        {
            _internal_tcd_tue = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_tue", oldValue, _internal_tcd_tue));
        }
    }

    public function set tcd_mon(value:String) : void
    {
        var oldValue:String = _internal_tcd_mon;
        if (oldValue !== value)
        {
            _internal_tcd_mon = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_mon", oldValue, _internal_tcd_mon));
        }
    }

    public function set tcd_title(value:String) : void
    {
        var oldValue:String = _internal_tcd_title;
        if (oldValue !== value)
        {
            _internal_tcd_title = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_title", oldValue, _internal_tcd_title));
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

    model_internal function setterListenerTcd_fri(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTcd_fri();
    }

    model_internal function setterListenerTcd_sun(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTcd_sun();
    }

    model_internal function setterListenerTcd_wed(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTcd_wed();
    }

    model_internal function setterListenerTcd_sat(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTcd_sat();
    }

    model_internal function setterListenerTcd_thu(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTcd_thu();
    }

    model_internal function setterListenerTcd_tue(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTcd_tue();
    }

    model_internal function setterListenerTcd_mon(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTcd_mon();
    }

    model_internal function setterListenerTcd_title(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTcd_title();
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
        if (!_model.tcd_friIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tcd_friValidationFailureMessages);
        }
        if (!_model.tcd_sunIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tcd_sunValidationFailureMessages);
        }
        if (!_model.tcd_wedIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tcd_wedValidationFailureMessages);
        }
        if (!_model.tcd_satIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tcd_satValidationFailureMessages);
        }
        if (!_model.tcd_thuIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tcd_thuValidationFailureMessages);
        }
        if (!_model.tcd_tueIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tcd_tueValidationFailureMessages);
        }
        if (!_model.tcd_monIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tcd_monValidationFailureMessages);
        }
        if (!_model.tcd_titleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_tcd_titleValidationFailureMessages);
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
    public function get _model() : _KeyTimeCodeLookupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _KeyTimeCodeLookupEntityMetadata) : void
    {
        var oldValue : _KeyTimeCodeLookupEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfTcd_fri : Array = null;
    model_internal var _doValidationLastValOfTcd_fri : String;

    model_internal function _doValidationForTcd_fri(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTcd_fri != null && model_internal::_doValidationLastValOfTcd_fri == value)
           return model_internal::_doValidationCacheOfTcd_fri ;

        _model.model_internal::_tcd_friIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTcd_friAvailable && _internal_tcd_fri == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tcd_fri is required"));
        }

        model_internal::_doValidationCacheOfTcd_fri = validationFailures;
        model_internal::_doValidationLastValOfTcd_fri = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTcd_sun : Array = null;
    model_internal var _doValidationLastValOfTcd_sun : String;

    model_internal function _doValidationForTcd_sun(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTcd_sun != null && model_internal::_doValidationLastValOfTcd_sun == value)
           return model_internal::_doValidationCacheOfTcd_sun ;

        _model.model_internal::_tcd_sunIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTcd_sunAvailable && _internal_tcd_sun == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tcd_sun is required"));
        }

        model_internal::_doValidationCacheOfTcd_sun = validationFailures;
        model_internal::_doValidationLastValOfTcd_sun = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTcd_wed : Array = null;
    model_internal var _doValidationLastValOfTcd_wed : String;

    model_internal function _doValidationForTcd_wed(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTcd_wed != null && model_internal::_doValidationLastValOfTcd_wed == value)
           return model_internal::_doValidationCacheOfTcd_wed ;

        _model.model_internal::_tcd_wedIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTcd_wedAvailable && _internal_tcd_wed == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tcd_wed is required"));
        }

        model_internal::_doValidationCacheOfTcd_wed = validationFailures;
        model_internal::_doValidationLastValOfTcd_wed = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTcd_sat : Array = null;
    model_internal var _doValidationLastValOfTcd_sat : String;

    model_internal function _doValidationForTcd_sat(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTcd_sat != null && model_internal::_doValidationLastValOfTcd_sat == value)
           return model_internal::_doValidationCacheOfTcd_sat ;

        _model.model_internal::_tcd_satIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTcd_satAvailable && _internal_tcd_sat == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tcd_sat is required"));
        }

        model_internal::_doValidationCacheOfTcd_sat = validationFailures;
        model_internal::_doValidationLastValOfTcd_sat = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTcd_thu : Array = null;
    model_internal var _doValidationLastValOfTcd_thu : String;

    model_internal function _doValidationForTcd_thu(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTcd_thu != null && model_internal::_doValidationLastValOfTcd_thu == value)
           return model_internal::_doValidationCacheOfTcd_thu ;

        _model.model_internal::_tcd_thuIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTcd_thuAvailable && _internal_tcd_thu == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tcd_thu is required"));
        }

        model_internal::_doValidationCacheOfTcd_thu = validationFailures;
        model_internal::_doValidationLastValOfTcd_thu = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTcd_tue : Array = null;
    model_internal var _doValidationLastValOfTcd_tue : String;

    model_internal function _doValidationForTcd_tue(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTcd_tue != null && model_internal::_doValidationLastValOfTcd_tue == value)
           return model_internal::_doValidationCacheOfTcd_tue ;

        _model.model_internal::_tcd_tueIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTcd_tueAvailable && _internal_tcd_tue == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tcd_tue is required"));
        }

        model_internal::_doValidationCacheOfTcd_tue = validationFailures;
        model_internal::_doValidationLastValOfTcd_tue = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTcd_mon : Array = null;
    model_internal var _doValidationLastValOfTcd_mon : String;

    model_internal function _doValidationForTcd_mon(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTcd_mon != null && model_internal::_doValidationLastValOfTcd_mon == value)
           return model_internal::_doValidationCacheOfTcd_mon ;

        _model.model_internal::_tcd_monIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTcd_monAvailable && _internal_tcd_mon == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tcd_mon is required"));
        }

        model_internal::_doValidationCacheOfTcd_mon = validationFailures;
        model_internal::_doValidationLastValOfTcd_mon = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTcd_title : Array = null;
    model_internal var _doValidationLastValOfTcd_title : String;

    model_internal function _doValidationForTcd_title(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTcd_title != null && model_internal::_doValidationLastValOfTcd_title == value)
           return model_internal::_doValidationCacheOfTcd_title ;

        _model.model_internal::_tcd_titleIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTcd_titleAvailable && _internal_tcd_title == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "tcd_title is required"));
        }

        model_internal::_doValidationCacheOfTcd_title = validationFailures;
        model_internal::_doValidationLastValOfTcd_title = value;

        return validationFailures;
    }
    

}

}
