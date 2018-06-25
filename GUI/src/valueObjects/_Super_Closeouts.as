/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - Closeouts.as.
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
public class _Super_Closeouts extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("Closeouts") == null)
            {
                flash.net.registerClassAlias("Closeouts", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("Closeouts", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _CloseoutsEntityMetadata;
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
    private var _internal_prev_closeout_date : String;
    private var _internal_status : String;
    private var _internal_closeout_date : String;
    private var _internal_closeout_nr : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_Closeouts()
    {
        _model = new _CloseoutsEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prev_closeout_date", model_internal::setterListenerPrev_closeout_date));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "status", model_internal::setterListenerStatus));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "closeout_date", model_internal::setterListenerCloseout_date));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "closeout_nr", model_internal::setterListenerCloseout_nr));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get prev_closeout_date() : String
    {
        return _internal_prev_closeout_date;
    }

    [Bindable(event="propertyChange")]
    public function get status() : String
    {
        return _internal_status;
    }

    [Bindable(event="propertyChange")]
    public function get closeout_date() : String
    {
        return _internal_closeout_date;
    }

    [Bindable(event="propertyChange")]
    public function get closeout_nr() : String
    {
        return _internal_closeout_nr;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set prev_closeout_date(value:String) : void
    {
        var oldValue:String = _internal_prev_closeout_date;
        if (oldValue !== value)
        {
            _internal_prev_closeout_date = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prev_closeout_date", oldValue, _internal_prev_closeout_date));
        }
    }

    public function set status(value:String) : void
    {
        var oldValue:String = _internal_status;
        if (oldValue !== value)
        {
            _internal_status = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "status", oldValue, _internal_status));
        }
    }

    public function set closeout_date(value:String) : void
    {
        var oldValue:String = _internal_closeout_date;
        if (oldValue !== value)
        {
            _internal_closeout_date = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "closeout_date", oldValue, _internal_closeout_date));
        }
    }

    public function set closeout_nr(value:String) : void
    {
        var oldValue:String = _internal_closeout_nr;
        if (oldValue !== value)
        {
            _internal_closeout_nr = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "closeout_nr", oldValue, _internal_closeout_nr));
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

    model_internal function setterListenerPrev_closeout_date(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPrev_closeout_date();
    }

    model_internal function setterListenerStatus(value:flash.events.Event):void
    {
        _model.invalidateDependentOnStatus();
    }

    model_internal function setterListenerCloseout_date(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCloseout_date();
    }

    model_internal function setterListenerCloseout_nr(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCloseout_nr();
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
        if (!_model.prev_closeout_dateIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prev_closeout_dateValidationFailureMessages);
        }
        if (!_model.statusIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_statusValidationFailureMessages);
        }
        if (!_model.closeout_dateIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_closeout_dateValidationFailureMessages);
        }
        if (!_model.closeout_nrIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_closeout_nrValidationFailureMessages);
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
    public function get _model() : _CloseoutsEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _CloseoutsEntityMetadata) : void
    {
        var oldValue : _CloseoutsEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfPrev_closeout_date : Array = null;
    model_internal var _doValidationLastValOfPrev_closeout_date : String;

    model_internal function _doValidationForPrev_closeout_date(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPrev_closeout_date != null && model_internal::_doValidationLastValOfPrev_closeout_date == value)
           return model_internal::_doValidationCacheOfPrev_closeout_date ;

        _model.model_internal::_prev_closeout_dateIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPrev_closeout_dateAvailable && _internal_prev_closeout_date == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prev_closeout_date is required"));
        }

        model_internal::_doValidationCacheOfPrev_closeout_date = validationFailures;
        model_internal::_doValidationLastValOfPrev_closeout_date = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfStatus : Array = null;
    model_internal var _doValidationLastValOfStatus : String;

    model_internal function _doValidationForStatus(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfStatus != null && model_internal::_doValidationLastValOfStatus == value)
           return model_internal::_doValidationCacheOfStatus ;

        _model.model_internal::_statusIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isStatusAvailable && _internal_status == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "status is required"));
        }

        model_internal::_doValidationCacheOfStatus = validationFailures;
        model_internal::_doValidationLastValOfStatus = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCloseout_date : Array = null;
    model_internal var _doValidationLastValOfCloseout_date : String;

    model_internal function _doValidationForCloseout_date(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCloseout_date != null && model_internal::_doValidationLastValOfCloseout_date == value)
           return model_internal::_doValidationCacheOfCloseout_date ;

        _model.model_internal::_closeout_dateIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCloseout_dateAvailable && _internal_closeout_date == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "closeout_date is required"));
        }

        model_internal::_doValidationCacheOfCloseout_date = validationFailures;
        model_internal::_doValidationLastValOfCloseout_date = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCloseout_nr : Array = null;
    model_internal var _doValidationLastValOfCloseout_nr : String;

    model_internal function _doValidationForCloseout_nr(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCloseout_nr != null && model_internal::_doValidationLastValOfCloseout_nr == value)
           return model_internal::_doValidationCacheOfCloseout_nr ;

        _model.model_internal::_closeout_nrIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCloseout_nrAvailable && _internal_closeout_nr == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "closeout_nr is required"));
        }

        model_internal::_doValidationCacheOfCloseout_nr = validationFailures;
        model_internal::_doValidationLastValOfCloseout_nr = value;

        return validationFailures;
    }
    

}

}
