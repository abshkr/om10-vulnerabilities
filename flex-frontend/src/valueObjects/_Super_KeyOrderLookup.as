/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - KeyOrderLookup.as.
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
public class _Super_KeyOrderLookup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("KeyOrderLookup") == null)
            {
                flash.net.registerClassAlias("KeyOrderLookup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("KeyOrderLookup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _KeyOrderLookupEntityMetadata;
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
    private var _internal_order_cust_code : String;
    private var _internal_order_cust_no : String;
    private var _internal_order_desc : String;
    private var _internal_order_cust_name : String;
    private var _internal_order_supp_name : String;
    private var _internal_order_supp_code : String;
    private var _internal_order_cust_acnt : String;
    private var _internal_order_id : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_KeyOrderLookup()
    {
        _model = new _KeyOrderLookupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_cust_code", model_internal::setterListenerOrder_cust_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_cust_no", model_internal::setterListenerOrder_cust_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_desc", model_internal::setterListenerOrder_desc));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_cust_name", model_internal::setterListenerOrder_cust_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_supp_name", model_internal::setterListenerOrder_supp_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_supp_code", model_internal::setterListenerOrder_supp_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_cust_acnt", model_internal::setterListenerOrder_cust_acnt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "order_id", model_internal::setterListenerOrder_id));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get order_cust_code() : String
    {
        return _internal_order_cust_code;
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_no() : String
    {
        return _internal_order_cust_no;
    }

    [Bindable(event="propertyChange")]
    public function get order_desc() : String
    {
        return _internal_order_desc;
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_name() : String
    {
        return _internal_order_cust_name;
    }

    [Bindable(event="propertyChange")]
    public function get order_supp_name() : String
    {
        return _internal_order_supp_name;
    }

    [Bindable(event="propertyChange")]
    public function get order_supp_code() : String
    {
        return _internal_order_supp_code;
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_acnt() : String
    {
        return _internal_order_cust_acnt;
    }

    [Bindable(event="propertyChange")]
    public function get order_id() : String
    {
        return _internal_order_id;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set order_cust_code(value:String) : void
    {
        var oldValue:String = _internal_order_cust_code;
        if (oldValue !== value)
        {
            _internal_order_cust_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_code", oldValue, _internal_order_cust_code));
        }
    }

    public function set order_cust_no(value:String) : void
    {
        var oldValue:String = _internal_order_cust_no;
        if (oldValue !== value)
        {
            _internal_order_cust_no = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_no", oldValue, _internal_order_cust_no));
        }
    }

    public function set order_desc(value:String) : void
    {
        var oldValue:String = _internal_order_desc;
        if (oldValue !== value)
        {
            _internal_order_desc = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_desc", oldValue, _internal_order_desc));
        }
    }

    public function set order_cust_name(value:String) : void
    {
        var oldValue:String = _internal_order_cust_name;
        if (oldValue !== value)
        {
            _internal_order_cust_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_name", oldValue, _internal_order_cust_name));
        }
    }

    public function set order_supp_name(value:String) : void
    {
        var oldValue:String = _internal_order_supp_name;
        if (oldValue !== value)
        {
            _internal_order_supp_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_supp_name", oldValue, _internal_order_supp_name));
        }
    }

    public function set order_supp_code(value:String) : void
    {
        var oldValue:String = _internal_order_supp_code;
        if (oldValue !== value)
        {
            _internal_order_supp_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_supp_code", oldValue, _internal_order_supp_code));
        }
    }

    public function set order_cust_acnt(value:String) : void
    {
        var oldValue:String = _internal_order_cust_acnt;
        if (oldValue !== value)
        {
            _internal_order_cust_acnt = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_acnt", oldValue, _internal_order_cust_acnt));
        }
    }

    public function set order_id(value:String) : void
    {
        var oldValue:String = _internal_order_id;
        if (oldValue !== value)
        {
            _internal_order_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_id", oldValue, _internal_order_id));
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

    model_internal function setterListenerOrder_cust_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_cust_code();
    }

    model_internal function setterListenerOrder_cust_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_cust_no();
    }

    model_internal function setterListenerOrder_desc(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_desc();
    }

    model_internal function setterListenerOrder_cust_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_cust_name();
    }

    model_internal function setterListenerOrder_supp_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_supp_name();
    }

    model_internal function setterListenerOrder_supp_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_supp_code();
    }

    model_internal function setterListenerOrder_cust_acnt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_cust_acnt();
    }

    model_internal function setterListenerOrder_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOrder_id();
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
        if (!_model.order_cust_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_cust_codeValidationFailureMessages);
        }
        if (!_model.order_cust_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_cust_noValidationFailureMessages);
        }
        if (!_model.order_descIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_descValidationFailureMessages);
        }
        if (!_model.order_cust_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_cust_nameValidationFailureMessages);
        }
        if (!_model.order_supp_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_supp_nameValidationFailureMessages);
        }
        if (!_model.order_supp_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_supp_codeValidationFailureMessages);
        }
        if (!_model.order_cust_acntIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_cust_acntValidationFailureMessages);
        }
        if (!_model.order_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_order_idValidationFailureMessages);
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
    public function get _model() : _KeyOrderLookupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _KeyOrderLookupEntityMetadata) : void
    {
        var oldValue : _KeyOrderLookupEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfOrder_cust_code : Array = null;
    model_internal var _doValidationLastValOfOrder_cust_code : String;

    model_internal function _doValidationForOrder_cust_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_cust_code != null && model_internal::_doValidationLastValOfOrder_cust_code == value)
           return model_internal::_doValidationCacheOfOrder_cust_code ;

        _model.model_internal::_order_cust_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_cust_codeAvailable && _internal_order_cust_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_cust_code is required"));
        }

        model_internal::_doValidationCacheOfOrder_cust_code = validationFailures;
        model_internal::_doValidationLastValOfOrder_cust_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_cust_no : Array = null;
    model_internal var _doValidationLastValOfOrder_cust_no : String;

    model_internal function _doValidationForOrder_cust_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_cust_no != null && model_internal::_doValidationLastValOfOrder_cust_no == value)
           return model_internal::_doValidationCacheOfOrder_cust_no ;

        _model.model_internal::_order_cust_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_cust_noAvailable && _internal_order_cust_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_cust_no is required"));
        }

        model_internal::_doValidationCacheOfOrder_cust_no = validationFailures;
        model_internal::_doValidationLastValOfOrder_cust_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_desc : Array = null;
    model_internal var _doValidationLastValOfOrder_desc : String;

    model_internal function _doValidationForOrder_desc(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_desc != null && model_internal::_doValidationLastValOfOrder_desc == value)
           return model_internal::_doValidationCacheOfOrder_desc ;

        _model.model_internal::_order_descIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_descAvailable && _internal_order_desc == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_desc is required"));
        }

        model_internal::_doValidationCacheOfOrder_desc = validationFailures;
        model_internal::_doValidationLastValOfOrder_desc = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_cust_name : Array = null;
    model_internal var _doValidationLastValOfOrder_cust_name : String;

    model_internal function _doValidationForOrder_cust_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_cust_name != null && model_internal::_doValidationLastValOfOrder_cust_name == value)
           return model_internal::_doValidationCacheOfOrder_cust_name ;

        _model.model_internal::_order_cust_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_cust_nameAvailable && _internal_order_cust_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_cust_name is required"));
        }

        model_internal::_doValidationCacheOfOrder_cust_name = validationFailures;
        model_internal::_doValidationLastValOfOrder_cust_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_supp_name : Array = null;
    model_internal var _doValidationLastValOfOrder_supp_name : String;

    model_internal function _doValidationForOrder_supp_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_supp_name != null && model_internal::_doValidationLastValOfOrder_supp_name == value)
           return model_internal::_doValidationCacheOfOrder_supp_name ;

        _model.model_internal::_order_supp_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_supp_nameAvailable && _internal_order_supp_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_supp_name is required"));
        }

        model_internal::_doValidationCacheOfOrder_supp_name = validationFailures;
        model_internal::_doValidationLastValOfOrder_supp_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_supp_code : Array = null;
    model_internal var _doValidationLastValOfOrder_supp_code : String;

    model_internal function _doValidationForOrder_supp_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_supp_code != null && model_internal::_doValidationLastValOfOrder_supp_code == value)
           return model_internal::_doValidationCacheOfOrder_supp_code ;

        _model.model_internal::_order_supp_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_supp_codeAvailable && _internal_order_supp_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_supp_code is required"));
        }

        model_internal::_doValidationCacheOfOrder_supp_code = validationFailures;
        model_internal::_doValidationLastValOfOrder_supp_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_cust_acnt : Array = null;
    model_internal var _doValidationLastValOfOrder_cust_acnt : String;

    model_internal function _doValidationForOrder_cust_acnt(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_cust_acnt != null && model_internal::_doValidationLastValOfOrder_cust_acnt == value)
           return model_internal::_doValidationCacheOfOrder_cust_acnt ;

        _model.model_internal::_order_cust_acntIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_cust_acntAvailable && _internal_order_cust_acnt == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_cust_acnt is required"));
        }

        model_internal::_doValidationCacheOfOrder_cust_acnt = validationFailures;
        model_internal::_doValidationLastValOfOrder_cust_acnt = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOrder_id : Array = null;
    model_internal var _doValidationLastValOfOrder_id : String;

    model_internal function _doValidationForOrder_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOrder_id != null && model_internal::_doValidationLastValOfOrder_id == value)
           return model_internal::_doValidationCacheOfOrder_id ;

        _model.model_internal::_order_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOrder_idAvailable && _internal_order_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "order_id is required"));
        }

        model_internal::_doValidationCacheOfOrder_id = validationFailures;
        model_internal::_doValidationLastValOfOrder_id = value;

        return validationFailures;
    }
    

}

}
