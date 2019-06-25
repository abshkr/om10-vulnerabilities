/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - OwnershipTrans.as.
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
public class _Super_OwnershipTrans extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("OwnershipTrans") == null)
            {
                flash.net.registerClassAlias("OwnershipTrans", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("OwnershipTrans", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _OwnershipTransEntityMetadata;
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
    private var _internal_base_prod_code : String;
    private var _internal_trsa_time : String;
    private var _internal_ownship_trsa_no : String;
    private var _internal_reason : String;
    private var _internal_supp_cmpy : String;
    private var _internal_qty : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_OwnershipTrans()
    {
        _model = new _OwnershipTransEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "base_prod_code", model_internal::setterListenerBase_prod_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsa_time", model_internal::setterListenerTrsa_time));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "ownship_trsa_no", model_internal::setterListenerOwnship_trsa_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "reason", model_internal::setterListenerReason));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "supp_cmpy", model_internal::setterListenerSupp_cmpy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "qty", model_internal::setterListenerQty));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get base_prod_code() : String
    {
        return _internal_base_prod_code;
    }

    [Bindable(event="propertyChange")]
    public function get trsa_time() : String
    {
        return _internal_trsa_time;
    }

    [Bindable(event="propertyChange")]
    public function get ownship_trsa_no() : String
    {
        return _internal_ownship_trsa_no;
    }

    [Bindable(event="propertyChange")]
    public function get reason() : String
    {
        return _internal_reason;
    }

    [Bindable(event="propertyChange")]
    public function get supp_cmpy() : String
    {
        return _internal_supp_cmpy;
    }

    [Bindable(event="propertyChange")]
    public function get qty() : String
    {
        return _internal_qty;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set base_prod_code(value:String) : void
    {
        var oldValue:String = _internal_base_prod_code;
        if (oldValue !== value)
        {
            _internal_base_prod_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_prod_code", oldValue, _internal_base_prod_code));
        }
    }

    public function set trsa_time(value:String) : void
    {
        var oldValue:String = _internal_trsa_time;
        if (oldValue !== value)
        {
            _internal_trsa_time = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_time", oldValue, _internal_trsa_time));
        }
    }

    public function set ownship_trsa_no(value:String) : void
    {
        var oldValue:String = _internal_ownship_trsa_no;
        if (oldValue !== value)
        {
            _internal_ownship_trsa_no = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ownship_trsa_no", oldValue, _internal_ownship_trsa_no));
        }
    }

    public function set reason(value:String) : void
    {
        var oldValue:String = _internal_reason;
        if (oldValue !== value)
        {
            _internal_reason = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "reason", oldValue, _internal_reason));
        }
    }

    public function set supp_cmpy(value:String) : void
    {
        var oldValue:String = _internal_supp_cmpy;
        if (oldValue !== value)
        {
            _internal_supp_cmpy = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "supp_cmpy", oldValue, _internal_supp_cmpy));
        }
    }

    public function set qty(value:String) : void
    {
        var oldValue:String = _internal_qty;
        if (oldValue !== value)
        {
            _internal_qty = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty", oldValue, _internal_qty));
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

    model_internal function setterListenerBase_prod_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBase_prod_code();
    }

    model_internal function setterListenerTrsa_time(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsa_time();
    }

    model_internal function setterListenerOwnship_trsa_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnOwnship_trsa_no();
    }

    model_internal function setterListenerReason(value:flash.events.Event):void
    {
        _model.invalidateDependentOnReason();
    }

    model_internal function setterListenerSupp_cmpy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSupp_cmpy();
    }

    model_internal function setterListenerQty(value:flash.events.Event):void
    {
        _model.invalidateDependentOnQty();
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
        if (!_model.base_prod_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_base_prod_codeValidationFailureMessages);
        }
        if (!_model.trsa_timeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsa_timeValidationFailureMessages);
        }
        if (!_model.ownship_trsa_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_ownship_trsa_noValidationFailureMessages);
        }
        if (!_model.reasonIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_reasonValidationFailureMessages);
        }
        if (!_model.supp_cmpyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_supp_cmpyValidationFailureMessages);
        }
        if (!_model.qtyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_qtyValidationFailureMessages);
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
    public function get _model() : _OwnershipTransEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _OwnershipTransEntityMetadata) : void
    {
        var oldValue : _OwnershipTransEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfBase_prod_code : Array = null;
    model_internal var _doValidationLastValOfBase_prod_code : String;

    model_internal function _doValidationForBase_prod_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBase_prod_code != null && model_internal::_doValidationLastValOfBase_prod_code == value)
           return model_internal::_doValidationCacheOfBase_prod_code ;

        _model.model_internal::_base_prod_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBase_prod_codeAvailable && _internal_base_prod_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "base_prod_code is required"));
        }

        model_internal::_doValidationCacheOfBase_prod_code = validationFailures;
        model_internal::_doValidationLastValOfBase_prod_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsa_time : Array = null;
    model_internal var _doValidationLastValOfTrsa_time : String;

    model_internal function _doValidationForTrsa_time(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsa_time != null && model_internal::_doValidationLastValOfTrsa_time == value)
           return model_internal::_doValidationCacheOfTrsa_time ;

        _model.model_internal::_trsa_timeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsa_timeAvailable && _internal_trsa_time == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsa_time is required"));
        }

        model_internal::_doValidationCacheOfTrsa_time = validationFailures;
        model_internal::_doValidationLastValOfTrsa_time = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfOwnship_trsa_no : Array = null;
    model_internal var _doValidationLastValOfOwnship_trsa_no : String;

    model_internal function _doValidationForOwnship_trsa_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfOwnship_trsa_no != null && model_internal::_doValidationLastValOfOwnship_trsa_no == value)
           return model_internal::_doValidationCacheOfOwnship_trsa_no ;

        _model.model_internal::_ownship_trsa_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isOwnship_trsa_noAvailable && _internal_ownship_trsa_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "ownship_trsa_no is required"));
        }

        model_internal::_doValidationCacheOfOwnship_trsa_no = validationFailures;
        model_internal::_doValidationLastValOfOwnship_trsa_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfReason : Array = null;
    model_internal var _doValidationLastValOfReason : String;

    model_internal function _doValidationForReason(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfReason != null && model_internal::_doValidationLastValOfReason == value)
           return model_internal::_doValidationCacheOfReason ;

        _model.model_internal::_reasonIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isReasonAvailable && _internal_reason == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "reason is required"));
        }

        model_internal::_doValidationCacheOfReason = validationFailures;
        model_internal::_doValidationLastValOfReason = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSupp_cmpy : Array = null;
    model_internal var _doValidationLastValOfSupp_cmpy : String;

    model_internal function _doValidationForSupp_cmpy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSupp_cmpy != null && model_internal::_doValidationLastValOfSupp_cmpy == value)
           return model_internal::_doValidationCacheOfSupp_cmpy ;

        _model.model_internal::_supp_cmpyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSupp_cmpyAvailable && _internal_supp_cmpy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "supp_cmpy is required"));
        }

        model_internal::_doValidationCacheOfSupp_cmpy = validationFailures;
        model_internal::_doValidationLastValOfSupp_cmpy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfQty : Array = null;
    model_internal var _doValidationLastValOfQty : String;

    model_internal function _doValidationForQty(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfQty != null && model_internal::_doValidationLastValOfQty == value)
           return model_internal::_doValidationCacheOfQty ;

        _model.model_internal::_qtyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isQtyAvailable && _internal_qty == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "qty is required"));
        }

        model_internal::_doValidationCacheOfQty = validationFailures;
        model_internal::_doValidationLastValOfQty = value;

        return validationFailures;
    }
    

}

}
