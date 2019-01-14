/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - ExpiryDateTitle.as.
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
public class _Super_ExpiryDateTitle extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("ExpiryDateTitle") == null)
            {
                flash.net.registerClassAlias("ExpiryDateTitle", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("ExpiryDateTitle", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _ExpiryDateTitleEntityMetadata;
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
    private var _internal_expiry_date_reja : String;
    private var _internal_expiry_date_no : String;
    private var _internal_expiry_date_desc : String;
    private var _internal_expiry_date_titl : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_ExpiryDateTitle()
    {
        _model = new _ExpiryDateTitleEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "expiry_date_reja", model_internal::setterListenerExpiry_date_reja));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "expiry_date_no", model_internal::setterListenerExpiry_date_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "expiry_date_desc", model_internal::setterListenerExpiry_date_desc));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "expiry_date_titl", model_internal::setterListenerExpiry_date_titl));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get expiry_date_reja() : String
    {
        return _internal_expiry_date_reja;
    }

    [Bindable(event="propertyChange")]
    public function get expiry_date_no() : String
    {
        return _internal_expiry_date_no;
    }

    [Bindable(event="propertyChange")]
    public function get expiry_date_desc() : String
    {
        return _internal_expiry_date_desc;
    }

    [Bindable(event="propertyChange")]
    public function get expiry_date_titl() : String
    {
        return _internal_expiry_date_titl;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set expiry_date_reja(value:String) : void
    {
        var oldValue:String = _internal_expiry_date_reja;
        if (oldValue !== value)
        {
            _internal_expiry_date_reja = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "expiry_date_reja", oldValue, _internal_expiry_date_reja));
        }
    }

    public function set expiry_date_no(value:String) : void
    {
        var oldValue:String = _internal_expiry_date_no;
        if (oldValue !== value)
        {
            _internal_expiry_date_no = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "expiry_date_no", oldValue, _internal_expiry_date_no));
        }
    }

    public function set expiry_date_desc(value:String) : void
    {
        var oldValue:String = _internal_expiry_date_desc;
        if (oldValue !== value)
        {
            _internal_expiry_date_desc = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "expiry_date_desc", oldValue, _internal_expiry_date_desc));
        }
    }

    public function set expiry_date_titl(value:String) : void
    {
        var oldValue:String = _internal_expiry_date_titl;
        if (oldValue !== value)
        {
            _internal_expiry_date_titl = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "expiry_date_titl", oldValue, _internal_expiry_date_titl));
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

    model_internal function setterListenerExpiry_date_reja(value:flash.events.Event):void
    {
        _model.invalidateDependentOnExpiry_date_reja();
    }

    model_internal function setterListenerExpiry_date_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnExpiry_date_no();
    }

    model_internal function setterListenerExpiry_date_desc(value:flash.events.Event):void
    {
        _model.invalidateDependentOnExpiry_date_desc();
    }

    model_internal function setterListenerExpiry_date_titl(value:flash.events.Event):void
    {
        _model.invalidateDependentOnExpiry_date_titl();
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
        if (!_model.expiry_date_rejaIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_expiry_date_rejaValidationFailureMessages);
        }
        if (!_model.expiry_date_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_expiry_date_noValidationFailureMessages);
        }
        if (!_model.expiry_date_descIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_expiry_date_descValidationFailureMessages);
        }
        if (!_model.expiry_date_titlIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_expiry_date_titlValidationFailureMessages);
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
    public function get _model() : _ExpiryDateTitleEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _ExpiryDateTitleEntityMetadata) : void
    {
        var oldValue : _ExpiryDateTitleEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfExpiry_date_reja : Array = null;
    model_internal var _doValidationLastValOfExpiry_date_reja : String;

    model_internal function _doValidationForExpiry_date_reja(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfExpiry_date_reja != null && model_internal::_doValidationLastValOfExpiry_date_reja == value)
           return model_internal::_doValidationCacheOfExpiry_date_reja ;

        _model.model_internal::_expiry_date_rejaIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isExpiry_date_rejaAvailable && _internal_expiry_date_reja == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "expiry_date_reja is required"));
        }

        model_internal::_doValidationCacheOfExpiry_date_reja = validationFailures;
        model_internal::_doValidationLastValOfExpiry_date_reja = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfExpiry_date_no : Array = null;
    model_internal var _doValidationLastValOfExpiry_date_no : String;

    model_internal function _doValidationForExpiry_date_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfExpiry_date_no != null && model_internal::_doValidationLastValOfExpiry_date_no == value)
           return model_internal::_doValidationCacheOfExpiry_date_no ;

        _model.model_internal::_expiry_date_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isExpiry_date_noAvailable && _internal_expiry_date_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "expiry_date_no is required"));
        }

        model_internal::_doValidationCacheOfExpiry_date_no = validationFailures;
        model_internal::_doValidationLastValOfExpiry_date_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfExpiry_date_desc : Array = null;
    model_internal var _doValidationLastValOfExpiry_date_desc : String;

    model_internal function _doValidationForExpiry_date_desc(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfExpiry_date_desc != null && model_internal::_doValidationLastValOfExpiry_date_desc == value)
           return model_internal::_doValidationCacheOfExpiry_date_desc ;

        _model.model_internal::_expiry_date_descIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isExpiry_date_descAvailable && _internal_expiry_date_desc == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "expiry_date_desc is required"));
        }

        model_internal::_doValidationCacheOfExpiry_date_desc = validationFailures;
        model_internal::_doValidationLastValOfExpiry_date_desc = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfExpiry_date_titl : Array = null;
    model_internal var _doValidationLastValOfExpiry_date_titl : String;

    model_internal function _doValidationForExpiry_date_titl(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfExpiry_date_titl != null && model_internal::_doValidationLastValOfExpiry_date_titl == value)
           return model_internal::_doValidationCacheOfExpiry_date_titl ;

        _model.model_internal::_expiry_date_titlIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isExpiry_date_titlAvailable && _internal_expiry_date_titl == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "expiry_date_titl is required"));
        }

        model_internal::_doValidationCacheOfExpiry_date_titl = validationFailures;
        model_internal::_doValidationLastValOfExpiry_date_titl = value;

        return validationFailures;
    }
    

}

}
