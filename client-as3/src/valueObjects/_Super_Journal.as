/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - Journal.as.
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

[Managed]
[ExcludeClass]
public class _Super_Journal extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("Journal") == null)
            {
                flash.net.registerClassAlias("Journal", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("Journal", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _JournalEntityMetadata;
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
    private var _internal_message : String;
    private var _internal_company_code : String;
    private var _internal_rn : String;
    private var _internal_region_code : String;
    private var _internal_seq : String;
    private var _internal_gen_date : String;
    private var _internal_jnl_cat : Object;
    private var _internal_msg_class : String;
    private var _internal_msg_event : String;
    private var _internal_print_date : Object;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_Journal()
    {
        _model = new _JournalEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "message", model_internal::setterListenerMessage));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "company_code", model_internal::setterListenerCompany_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "rn", model_internal::setterListenerRn));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "region_code", model_internal::setterListenerRegion_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "gen_date", model_internal::setterListenerGen_date));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "jnl_cat", model_internal::setterListenerJnl_cat));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "msg_class", model_internal::setterListenerMsg_class));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "msg_event", model_internal::setterListenerMsg_event));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "print_date", model_internal::setterListenerPrint_date));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get message() : String
    {
        return _internal_message;
    }

    [Bindable(event="propertyChange")]
    public function get company_code() : String
    {
        return _internal_company_code;
    }

    [Bindable(event="propertyChange")]
    public function get rn() : String
    {
        return _internal_rn;
    }

    [Bindable(event="propertyChange")]
    public function get region_code() : String
    {
        return _internal_region_code;
    }

    [Bindable(event="propertyChange")]
    public function get seq() : String
    {
        return _internal_seq;
    }

    [Bindable(event="propertyChange")]
    public function get gen_date() : String
    {
        return _internal_gen_date;
    }

    [Bindable(event="propertyChange")]
    public function get jnl_cat() : Object
    {
        return _internal_jnl_cat;
    }

    [Bindable(event="propertyChange")]
    public function get msg_class() : String
    {
        return _internal_msg_class;
    }

    [Bindable(event="propertyChange")]
    public function get msg_event() : String
    {
        return _internal_msg_event;
    }

    [Bindable(event="propertyChange")]
    public function get print_date() : Object
    {
        return _internal_print_date;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set message(value:String) : void
    {
        var oldValue:String = _internal_message;
        if (oldValue !== value)
        {
            _internal_message = value;
        }
    }

    public function set company_code(value:String) : void
    {
        var oldValue:String = _internal_company_code;
        if (oldValue !== value)
        {
            _internal_company_code = value;
        }
    }

    public function set rn(value:String) : void
    {
        var oldValue:String = _internal_rn;
        if (oldValue !== value)
        {
            _internal_rn = value;
        }
    }

    public function set region_code(value:String) : void
    {
        var oldValue:String = _internal_region_code;
        if (oldValue !== value)
        {
            _internal_region_code = value;
        }
    }

    public function set seq(value:String) : void
    {
        var oldValue:String = _internal_seq;
        if (oldValue !== value)
        {
            _internal_seq = value;
        }
    }

    public function set gen_date(value:String) : void
    {
        var oldValue:String = _internal_gen_date;
        if (oldValue !== value)
        {
            _internal_gen_date = value;
        }
    }

    public function set jnl_cat(value:Object) : void
    {
        var oldValue:Object = _internal_jnl_cat;
        if (oldValue !== value)
        {
            _internal_jnl_cat = value;
        }
    }

    public function set msg_class(value:String) : void
    {
        var oldValue:String = _internal_msg_class;
        if (oldValue !== value)
        {
            _internal_msg_class = value;
        }
    }

    public function set msg_event(value:String) : void
    {
        var oldValue:String = _internal_msg_event;
        if (oldValue !== value)
        {
            _internal_msg_event = value;
        }
    }

    public function set print_date(value:Object) : void
    {
        var oldValue:Object = _internal_print_date;
        if (oldValue !== value)
        {
            _internal_print_date = value;
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

    model_internal function setterListenerMessage(value:flash.events.Event):void
    {
        _model.invalidateDependentOnMessage();
    }

    model_internal function setterListenerCompany_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCompany_code();
    }

    model_internal function setterListenerRn(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRn();
    }

    model_internal function setterListenerRegion_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRegion_code();
    }

    model_internal function setterListenerGen_date(value:flash.events.Event):void
    {
        _model.invalidateDependentOnGen_date();
    }

    model_internal function setterListenerJnl_cat(value:flash.events.Event):void
    {
        _model.invalidateDependentOnJnl_cat();
    }

    model_internal function setterListenerMsg_class(value:flash.events.Event):void
    {
        _model.invalidateDependentOnMsg_class();
    }

    model_internal function setterListenerMsg_event(value:flash.events.Event):void
    {
        _model.invalidateDependentOnMsg_event();
    }

    model_internal function setterListenerPrint_date(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPrint_date();
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
        if (!_model.messageIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_messageValidationFailureMessages);
        }
        if (!_model.company_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_company_codeValidationFailureMessages);
        }
        if (!_model.rnIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_rnValidationFailureMessages);
        }
        if (!_model.region_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_region_codeValidationFailureMessages);
        }
        if (!_model.gen_dateIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_gen_dateValidationFailureMessages);
        }
        if (!_model.jnl_catIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_jnl_catValidationFailureMessages);
        }
        if (!_model.msg_classIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_msg_classValidationFailureMessages);
        }
        if (!_model.msg_eventIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_msg_eventValidationFailureMessages);
        }
        if (!_model.print_dateIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_print_dateValidationFailureMessages);
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
    public function get _model() : _JournalEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _JournalEntityMetadata) : void
    {
        var oldValue : _JournalEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfMessage : Array = null;
    model_internal var _doValidationLastValOfMessage : String;

    model_internal function _doValidationForMessage(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfMessage != null && model_internal::_doValidationLastValOfMessage == value)
           return model_internal::_doValidationCacheOfMessage ;

        _model.model_internal::_messageIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isMessageAvailable && _internal_message == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "message is required"));
        }

        model_internal::_doValidationCacheOfMessage = validationFailures;
        model_internal::_doValidationLastValOfMessage = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCompany_code : Array = null;
    model_internal var _doValidationLastValOfCompany_code : String;

    model_internal function _doValidationForCompany_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCompany_code != null && model_internal::_doValidationLastValOfCompany_code == value)
           return model_internal::_doValidationCacheOfCompany_code ;

        _model.model_internal::_company_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCompany_codeAvailable && _internal_company_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "company_code is required"));
        }

        model_internal::_doValidationCacheOfCompany_code = validationFailures;
        model_internal::_doValidationLastValOfCompany_code = value;

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
    
    model_internal var _doValidationCacheOfRegion_code : Array = null;
    model_internal var _doValidationLastValOfRegion_code : String;

    model_internal function _doValidationForRegion_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRegion_code != null && model_internal::_doValidationLastValOfRegion_code == value)
           return model_internal::_doValidationCacheOfRegion_code ;

        _model.model_internal::_region_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRegion_codeAvailable && _internal_region_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "region_code is required"));
        }

        model_internal::_doValidationCacheOfRegion_code = validationFailures;
        model_internal::_doValidationLastValOfRegion_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfGen_date : Array = null;
    model_internal var _doValidationLastValOfGen_date : String;

    model_internal function _doValidationForGen_date(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfGen_date != null && model_internal::_doValidationLastValOfGen_date == value)
           return model_internal::_doValidationCacheOfGen_date ;

        _model.model_internal::_gen_dateIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isGen_dateAvailable && _internal_gen_date == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "gen_date is required"));
        }

        model_internal::_doValidationCacheOfGen_date = validationFailures;
        model_internal::_doValidationLastValOfGen_date = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfJnl_cat : Array = null;
    model_internal var _doValidationLastValOfJnl_cat : Object;

    model_internal function _doValidationForJnl_cat(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfJnl_cat != null && model_internal::_doValidationLastValOfJnl_cat == value)
           return model_internal::_doValidationCacheOfJnl_cat ;

        _model.model_internal::_jnl_catIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isJnl_catAvailable && _internal_jnl_cat == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "jnl_cat is required"));
        }

        model_internal::_doValidationCacheOfJnl_cat = validationFailures;
        model_internal::_doValidationLastValOfJnl_cat = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfMsg_class : Array = null;
    model_internal var _doValidationLastValOfMsg_class : String;

    model_internal function _doValidationForMsg_class(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfMsg_class != null && model_internal::_doValidationLastValOfMsg_class == value)
           return model_internal::_doValidationCacheOfMsg_class ;

        _model.model_internal::_msg_classIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isMsg_classAvailable && _internal_msg_class == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "msg_class is required"));
        }

        model_internal::_doValidationCacheOfMsg_class = validationFailures;
        model_internal::_doValidationLastValOfMsg_class = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfMsg_event : Array = null;
    model_internal var _doValidationLastValOfMsg_event : String;

    model_internal function _doValidationForMsg_event(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfMsg_event != null && model_internal::_doValidationLastValOfMsg_event == value)
           return model_internal::_doValidationCacheOfMsg_event ;

        _model.model_internal::_msg_eventIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isMsg_eventAvailable && _internal_msg_event == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "msg_event is required"));
        }

        model_internal::_doValidationCacheOfMsg_event = validationFailures;
        model_internal::_doValidationLastValOfMsg_event = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPrint_date : Array = null;
    model_internal var _doValidationLastValOfPrint_date : Object;

    model_internal function _doValidationForPrint_date(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfPrint_date != null && model_internal::_doValidationLastValOfPrint_date == value)
           return model_internal::_doValidationCacheOfPrint_date ;

        _model.model_internal::_print_dateIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPrint_dateAvailable && _internal_print_date == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "print_date is required"));
        }

        model_internal::_doValidationCacheOfPrint_date = validationFailures;
        model_internal::_doValidationLastValOfPrint_date = value;

        return validationFailures;
    }
    

}

}
