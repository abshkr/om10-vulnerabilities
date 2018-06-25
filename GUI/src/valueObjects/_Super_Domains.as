/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - Domains.as.
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
public class _Super_Domains extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _DomainsEntityMetadata;
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
    private var _internal_DOMAIN_TEXT : String;
    private var _internal_DOMAIN_CODE : String;
    private var _internal_RECORD_ORDER : String;
    private var _internal_DOMAIN_NOTE : String;
    private var _internal_RECORD_SWITCH : String;
    private var _internal_IS_SINGULAR : String;
    private var _internal_DOMAIN_ID : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_Domains()
    {
        _model = new _DomainsEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "DOMAIN_TEXT", model_internal::setterListenerDOMAIN_TEXT));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "DOMAIN_CODE", model_internal::setterListenerDOMAIN_CODE));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "RECORD_ORDER", model_internal::setterListenerRECORD_ORDER));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "DOMAIN_NOTE", model_internal::setterListenerDOMAIN_NOTE));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "RECORD_SWITCH", model_internal::setterListenerRECORD_SWITCH));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "IS_SINGULAR", model_internal::setterListenerIS_SINGULAR));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "DOMAIN_ID", model_internal::setterListenerDOMAIN_ID));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get DOMAIN_TEXT() : String
    {
        return _internal_DOMAIN_TEXT;
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_CODE() : String
    {
        return _internal_DOMAIN_CODE;
    }

    [Bindable(event="propertyChange")]
    public function get RECORD_ORDER() : String
    {
        return _internal_RECORD_ORDER;
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_NOTE() : String
    {
        return _internal_DOMAIN_NOTE;
    }

    [Bindable(event="propertyChange")]
    public function get RECORD_SWITCH() : String
    {
        return _internal_RECORD_SWITCH;
    }

    [Bindable(event="propertyChange")]
    public function get IS_SINGULAR() : String
    {
        return _internal_IS_SINGULAR;
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_ID() : String
    {
        return _internal_DOMAIN_ID;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set DOMAIN_TEXT(value:String) : void
    {
        var oldValue:String = _internal_DOMAIN_TEXT;
        if (oldValue !== value)
        {
            _internal_DOMAIN_TEXT = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_TEXT", oldValue, _internal_DOMAIN_TEXT));
        }
    }

    public function set DOMAIN_CODE(value:String) : void
    {
        var oldValue:String = _internal_DOMAIN_CODE;
        if (oldValue !== value)
        {
            _internal_DOMAIN_CODE = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_CODE", oldValue, _internal_DOMAIN_CODE));
        }
    }

    public function set RECORD_ORDER(value:String) : void
    {
        var oldValue:String = _internal_RECORD_ORDER;
        if (oldValue !== value)
        {
            _internal_RECORD_ORDER = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "RECORD_ORDER", oldValue, _internal_RECORD_ORDER));
        }
    }

    public function set DOMAIN_NOTE(value:String) : void
    {
        var oldValue:String = _internal_DOMAIN_NOTE;
        if (oldValue !== value)
        {
            _internal_DOMAIN_NOTE = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_NOTE", oldValue, _internal_DOMAIN_NOTE));
        }
    }

    public function set RECORD_SWITCH(value:String) : void
    {
        var oldValue:String = _internal_RECORD_SWITCH;
        if (oldValue !== value)
        {
            _internal_RECORD_SWITCH = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "RECORD_SWITCH", oldValue, _internal_RECORD_SWITCH));
        }
    }

    public function set IS_SINGULAR(value:String) : void
    {
        var oldValue:String = _internal_IS_SINGULAR;
        if (oldValue !== value)
        {
            _internal_IS_SINGULAR = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "IS_SINGULAR", oldValue, _internal_IS_SINGULAR));
        }
    }

    public function set DOMAIN_ID(value:String) : void
    {
        var oldValue:String = _internal_DOMAIN_ID;
        if (oldValue !== value)
        {
            _internal_DOMAIN_ID = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_ID", oldValue, _internal_DOMAIN_ID));
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

    model_internal function setterListenerDOMAIN_TEXT(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDOMAIN_TEXT();
    }

    model_internal function setterListenerDOMAIN_CODE(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDOMAIN_CODE();
    }

    model_internal function setterListenerRECORD_ORDER(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRECORD_ORDER();
    }

    model_internal function setterListenerDOMAIN_NOTE(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDOMAIN_NOTE();
    }

    model_internal function setterListenerRECORD_SWITCH(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRECORD_SWITCH();
    }

    model_internal function setterListenerIS_SINGULAR(value:flash.events.Event):void
    {
        _model.invalidateDependentOnIS_SINGULAR();
    }

    model_internal function setterListenerDOMAIN_ID(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDOMAIN_ID();
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
        if (!_model.DOMAIN_TEXTIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_DOMAIN_TEXTValidationFailureMessages);
        }
        if (!_model.DOMAIN_CODEIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_DOMAIN_CODEValidationFailureMessages);
        }
        if (!_model.RECORD_ORDERIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_RECORD_ORDERValidationFailureMessages);
        }
        if (!_model.DOMAIN_NOTEIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_DOMAIN_NOTEValidationFailureMessages);
        }
        if (!_model.RECORD_SWITCHIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_RECORD_SWITCHValidationFailureMessages);
        }
        if (!_model.IS_SINGULARIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_IS_SINGULARValidationFailureMessages);
        }
        if (!_model.DOMAIN_IDIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_DOMAIN_IDValidationFailureMessages);
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
    public function get _model() : _DomainsEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _DomainsEntityMetadata) : void
    {
        var oldValue : _DomainsEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfDOMAIN_TEXT : Array = null;
    model_internal var _doValidationLastValOfDOMAIN_TEXT : String;

    model_internal function _doValidationForDOMAIN_TEXT(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDOMAIN_TEXT != null && model_internal::_doValidationLastValOfDOMAIN_TEXT == value)
           return model_internal::_doValidationCacheOfDOMAIN_TEXT ;

        _model.model_internal::_DOMAIN_TEXTIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDOMAIN_TEXTAvailable && _internal_DOMAIN_TEXT == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "DOMAIN_TEXT is required"));
        }

        model_internal::_doValidationCacheOfDOMAIN_TEXT = validationFailures;
        model_internal::_doValidationLastValOfDOMAIN_TEXT = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDOMAIN_CODE : Array = null;
    model_internal var _doValidationLastValOfDOMAIN_CODE : String;

    model_internal function _doValidationForDOMAIN_CODE(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDOMAIN_CODE != null && model_internal::_doValidationLastValOfDOMAIN_CODE == value)
           return model_internal::_doValidationCacheOfDOMAIN_CODE ;

        _model.model_internal::_DOMAIN_CODEIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDOMAIN_CODEAvailable && _internal_DOMAIN_CODE == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "DOMAIN_CODE is required"));
        }

        model_internal::_doValidationCacheOfDOMAIN_CODE = validationFailures;
        model_internal::_doValidationLastValOfDOMAIN_CODE = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRECORD_ORDER : Array = null;
    model_internal var _doValidationLastValOfRECORD_ORDER : String;

    model_internal function _doValidationForRECORD_ORDER(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRECORD_ORDER != null && model_internal::_doValidationLastValOfRECORD_ORDER == value)
           return model_internal::_doValidationCacheOfRECORD_ORDER ;

        _model.model_internal::_RECORD_ORDERIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRECORD_ORDERAvailable && _internal_RECORD_ORDER == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "RECORD_ORDER is required"));
        }

        model_internal::_doValidationCacheOfRECORD_ORDER = validationFailures;
        model_internal::_doValidationLastValOfRECORD_ORDER = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDOMAIN_NOTE : Array = null;
    model_internal var _doValidationLastValOfDOMAIN_NOTE : String;

    model_internal function _doValidationForDOMAIN_NOTE(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDOMAIN_NOTE != null && model_internal::_doValidationLastValOfDOMAIN_NOTE == value)
           return model_internal::_doValidationCacheOfDOMAIN_NOTE ;

        _model.model_internal::_DOMAIN_NOTEIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDOMAIN_NOTEAvailable && _internal_DOMAIN_NOTE == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "DOMAIN_NOTE is required"));
        }

        model_internal::_doValidationCacheOfDOMAIN_NOTE = validationFailures;
        model_internal::_doValidationLastValOfDOMAIN_NOTE = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRECORD_SWITCH : Array = null;
    model_internal var _doValidationLastValOfRECORD_SWITCH : String;

    model_internal function _doValidationForRECORD_SWITCH(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRECORD_SWITCH != null && model_internal::_doValidationLastValOfRECORD_SWITCH == value)
           return model_internal::_doValidationCacheOfRECORD_SWITCH ;

        _model.model_internal::_RECORD_SWITCHIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRECORD_SWITCHAvailable && _internal_RECORD_SWITCH == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "RECORD_SWITCH is required"));
        }

        model_internal::_doValidationCacheOfRECORD_SWITCH = validationFailures;
        model_internal::_doValidationLastValOfRECORD_SWITCH = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfIS_SINGULAR : Array = null;
    model_internal var _doValidationLastValOfIS_SINGULAR : String;

    model_internal function _doValidationForIS_SINGULAR(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfIS_SINGULAR != null && model_internal::_doValidationLastValOfIS_SINGULAR == value)
           return model_internal::_doValidationCacheOfIS_SINGULAR ;

        _model.model_internal::_IS_SINGULARIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isIS_SINGULARAvailable && _internal_IS_SINGULAR == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "IS_SINGULAR is required"));
        }

        model_internal::_doValidationCacheOfIS_SINGULAR = validationFailures;
        model_internal::_doValidationLastValOfIS_SINGULAR = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDOMAIN_ID : Array = null;
    model_internal var _doValidationLastValOfDOMAIN_ID : String;

    model_internal function _doValidationForDOMAIN_ID(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDOMAIN_ID != null && model_internal::_doValidationLastValOfDOMAIN_ID == value)
           return model_internal::_doValidationCacheOfDOMAIN_ID ;

        _model.model_internal::_DOMAIN_IDIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDOMAIN_IDAvailable && _internal_DOMAIN_ID == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "DOMAIN_ID is required"));
        }

        model_internal::_doValidationCacheOfDOMAIN_ID = validationFailures;
        model_internal::_doValidationLastValOfDOMAIN_ID = value;

        return validationFailures;
    }
    

}

}
