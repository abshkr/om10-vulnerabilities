/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - UserRoles.as.
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
public class _Super_UserRoles extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _UserRolesEntityMetadata;
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
    private var _internal_ROLE_TYPE : String;
    private var _internal_ROLE_TEXT : String;
    private var _internal_ROLE_STATUS : String;
    private var _internal_RECORD_ORDER : String;
    private var _internal_ROLE_RANK : String;
    private var _internal_ROLE_NOTE : String;
    private var _internal_RECORD_SWITCH : String;
    private var _internal_ROLE_CODE : String;
    private var _internal_ROLE_ID : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_UserRoles()
    {
        _model = new _UserRolesEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "ROLE_TYPE", model_internal::setterListenerROLE_TYPE));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "ROLE_TEXT", model_internal::setterListenerROLE_TEXT));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "ROLE_STATUS", model_internal::setterListenerROLE_STATUS));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "RECORD_ORDER", model_internal::setterListenerRECORD_ORDER));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "ROLE_RANK", model_internal::setterListenerROLE_RANK));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "ROLE_NOTE", model_internal::setterListenerROLE_NOTE));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "RECORD_SWITCH", model_internal::setterListenerRECORD_SWITCH));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "ROLE_CODE", model_internal::setterListenerROLE_CODE));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "ROLE_ID", model_internal::setterListenerROLE_ID));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get ROLE_TYPE() : String
    {
        return _internal_ROLE_TYPE;
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_TEXT() : String
    {
        return _internal_ROLE_TEXT;
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_STATUS() : String
    {
        return _internal_ROLE_STATUS;
    }

    [Bindable(event="propertyChange")]
    public function get RECORD_ORDER() : String
    {
        return _internal_RECORD_ORDER;
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_RANK() : String
    {
        return _internal_ROLE_RANK;
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_NOTE() : String
    {
        return _internal_ROLE_NOTE;
    }

    [Bindable(event="propertyChange")]
    public function get RECORD_SWITCH() : String
    {
        return _internal_RECORD_SWITCH;
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_CODE() : String
    {
        return _internal_ROLE_CODE;
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_ID() : String
    {
        return _internal_ROLE_ID;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set ROLE_TYPE(value:String) : void
    {
        var oldValue:String = _internal_ROLE_TYPE;
        if (oldValue !== value)
        {
            _internal_ROLE_TYPE = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_TYPE", oldValue, _internal_ROLE_TYPE));
        }
    }

    public function set ROLE_TEXT(value:String) : void
    {
        var oldValue:String = _internal_ROLE_TEXT;
        if (oldValue !== value)
        {
            _internal_ROLE_TEXT = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_TEXT", oldValue, _internal_ROLE_TEXT));
        }
    }

    public function set ROLE_STATUS(value:String) : void
    {
        var oldValue:String = _internal_ROLE_STATUS;
        if (oldValue !== value)
        {
            _internal_ROLE_STATUS = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_STATUS", oldValue, _internal_ROLE_STATUS));
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

    public function set ROLE_RANK(value:String) : void
    {
        var oldValue:String = _internal_ROLE_RANK;
        if (oldValue !== value)
        {
            _internal_ROLE_RANK = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_RANK", oldValue, _internal_ROLE_RANK));
        }
    }

    public function set ROLE_NOTE(value:String) : void
    {
        var oldValue:String = _internal_ROLE_NOTE;
        if (oldValue !== value)
        {
            _internal_ROLE_NOTE = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_NOTE", oldValue, _internal_ROLE_NOTE));
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

    public function set ROLE_CODE(value:String) : void
    {
        var oldValue:String = _internal_ROLE_CODE;
        if (oldValue !== value)
        {
            _internal_ROLE_CODE = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_CODE", oldValue, _internal_ROLE_CODE));
        }
    }

    public function set ROLE_ID(value:String) : void
    {
        var oldValue:String = _internal_ROLE_ID;
        if (oldValue !== value)
        {
            _internal_ROLE_ID = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_ID", oldValue, _internal_ROLE_ID));
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

    model_internal function setterListenerROLE_TYPE(value:flash.events.Event):void
    {
        _model.invalidateDependentOnROLE_TYPE();
    }

    model_internal function setterListenerROLE_TEXT(value:flash.events.Event):void
    {
        _model.invalidateDependentOnROLE_TEXT();
    }

    model_internal function setterListenerROLE_STATUS(value:flash.events.Event):void
    {
        _model.invalidateDependentOnROLE_STATUS();
    }

    model_internal function setterListenerRECORD_ORDER(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRECORD_ORDER();
    }

    model_internal function setterListenerROLE_RANK(value:flash.events.Event):void
    {
        _model.invalidateDependentOnROLE_RANK();
    }

    model_internal function setterListenerROLE_NOTE(value:flash.events.Event):void
    {
        _model.invalidateDependentOnROLE_NOTE();
    }

    model_internal function setterListenerRECORD_SWITCH(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRECORD_SWITCH();
    }

    model_internal function setterListenerROLE_CODE(value:flash.events.Event):void
    {
        _model.invalidateDependentOnROLE_CODE();
    }

    model_internal function setterListenerROLE_ID(value:flash.events.Event):void
    {
        _model.invalidateDependentOnROLE_ID();
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
        if (!_model.ROLE_TYPEIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_ROLE_TYPEValidationFailureMessages);
        }
        if (!_model.ROLE_TEXTIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_ROLE_TEXTValidationFailureMessages);
        }
        if (!_model.ROLE_STATUSIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_ROLE_STATUSValidationFailureMessages);
        }
        if (!_model.RECORD_ORDERIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_RECORD_ORDERValidationFailureMessages);
        }
        if (!_model.ROLE_RANKIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_ROLE_RANKValidationFailureMessages);
        }
        if (!_model.ROLE_NOTEIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_ROLE_NOTEValidationFailureMessages);
        }
        if (!_model.RECORD_SWITCHIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_RECORD_SWITCHValidationFailureMessages);
        }
        if (!_model.ROLE_CODEIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_ROLE_CODEValidationFailureMessages);
        }
        if (!_model.ROLE_IDIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_ROLE_IDValidationFailureMessages);
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
    public function get _model() : _UserRolesEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _UserRolesEntityMetadata) : void
    {
        var oldValue : _UserRolesEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfROLE_TYPE : Array = null;
    model_internal var _doValidationLastValOfROLE_TYPE : String;

    model_internal function _doValidationForROLE_TYPE(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfROLE_TYPE != null && model_internal::_doValidationLastValOfROLE_TYPE == value)
           return model_internal::_doValidationCacheOfROLE_TYPE ;

        _model.model_internal::_ROLE_TYPEIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isROLE_TYPEAvailable && _internal_ROLE_TYPE == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "ROLE_TYPE is required"));
        }

        model_internal::_doValidationCacheOfROLE_TYPE = validationFailures;
        model_internal::_doValidationLastValOfROLE_TYPE = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfROLE_TEXT : Array = null;
    model_internal var _doValidationLastValOfROLE_TEXT : String;

    model_internal function _doValidationForROLE_TEXT(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfROLE_TEXT != null && model_internal::_doValidationLastValOfROLE_TEXT == value)
           return model_internal::_doValidationCacheOfROLE_TEXT ;

        _model.model_internal::_ROLE_TEXTIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isROLE_TEXTAvailable && _internal_ROLE_TEXT == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "ROLE_TEXT is required"));
        }

        model_internal::_doValidationCacheOfROLE_TEXT = validationFailures;
        model_internal::_doValidationLastValOfROLE_TEXT = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfROLE_STATUS : Array = null;
    model_internal var _doValidationLastValOfROLE_STATUS : String;

    model_internal function _doValidationForROLE_STATUS(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfROLE_STATUS != null && model_internal::_doValidationLastValOfROLE_STATUS == value)
           return model_internal::_doValidationCacheOfROLE_STATUS ;

        _model.model_internal::_ROLE_STATUSIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isROLE_STATUSAvailable && _internal_ROLE_STATUS == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "ROLE_STATUS is required"));
        }

        model_internal::_doValidationCacheOfROLE_STATUS = validationFailures;
        model_internal::_doValidationLastValOfROLE_STATUS = value;

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
    
    model_internal var _doValidationCacheOfROLE_RANK : Array = null;
    model_internal var _doValidationLastValOfROLE_RANK : String;

    model_internal function _doValidationForROLE_RANK(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfROLE_RANK != null && model_internal::_doValidationLastValOfROLE_RANK == value)
           return model_internal::_doValidationCacheOfROLE_RANK ;

        _model.model_internal::_ROLE_RANKIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isROLE_RANKAvailable && _internal_ROLE_RANK == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "ROLE_RANK is required"));
        }

        model_internal::_doValidationCacheOfROLE_RANK = validationFailures;
        model_internal::_doValidationLastValOfROLE_RANK = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfROLE_NOTE : Array = null;
    model_internal var _doValidationLastValOfROLE_NOTE : String;

    model_internal function _doValidationForROLE_NOTE(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfROLE_NOTE != null && model_internal::_doValidationLastValOfROLE_NOTE == value)
           return model_internal::_doValidationCacheOfROLE_NOTE ;

        _model.model_internal::_ROLE_NOTEIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isROLE_NOTEAvailable && _internal_ROLE_NOTE == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "ROLE_NOTE is required"));
        }

        model_internal::_doValidationCacheOfROLE_NOTE = validationFailures;
        model_internal::_doValidationLastValOfROLE_NOTE = value;

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
    
    model_internal var _doValidationCacheOfROLE_CODE : Array = null;
    model_internal var _doValidationLastValOfROLE_CODE : String;

    model_internal function _doValidationForROLE_CODE(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfROLE_CODE != null && model_internal::_doValidationLastValOfROLE_CODE == value)
           return model_internal::_doValidationCacheOfROLE_CODE ;

        _model.model_internal::_ROLE_CODEIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isROLE_CODEAvailable && _internal_ROLE_CODE == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "ROLE_CODE is required"));
        }

        model_internal::_doValidationCacheOfROLE_CODE = validationFailures;
        model_internal::_doValidationLastValOfROLE_CODE = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfROLE_ID : Array = null;
    model_internal var _doValidationLastValOfROLE_ID : String;

    model_internal function _doValidationForROLE_ID(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfROLE_ID != null && model_internal::_doValidationLastValOfROLE_ID == value)
           return model_internal::_doValidationCacheOfROLE_ID ;

        _model.model_internal::_ROLE_IDIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isROLE_IDAvailable && _internal_ROLE_ID == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "ROLE_ID is required"));
        }

        model_internal::_doValidationCacheOfROLE_ID = validationFailures;
        model_internal::_doValidationLastValOfROLE_ID = value;

        return validationFailures;
    }
    

}

}
