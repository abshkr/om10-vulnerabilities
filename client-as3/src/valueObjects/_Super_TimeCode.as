/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - TimeCode.as.
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
public class _Super_TimeCode extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _TimeCodeEntityMetadata;
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
    private var _internal_TCD_WED : String;
    private var _internal_TCD_SUN : String;
    private var _internal_TCD_SAT : String;
    private var _internal_TCD_FRI : String;
    private var _internal_TCD_TITLE : String;
    private var _internal_TCD_THU : String;
    private var _internal_TCD_TUE : String;
    private var _internal_TCD_MON : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_TimeCode()
    {
        _model = new _TimeCodeEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "TCD_WED", model_internal::setterListenerTCD_WED));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "TCD_SUN", model_internal::setterListenerTCD_SUN));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "TCD_SAT", model_internal::setterListenerTCD_SAT));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "TCD_FRI", model_internal::setterListenerTCD_FRI));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "TCD_TITLE", model_internal::setterListenerTCD_TITLE));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "TCD_THU", model_internal::setterListenerTCD_THU));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "TCD_TUE", model_internal::setterListenerTCD_TUE));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "TCD_MON", model_internal::setterListenerTCD_MON));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get TCD_WED() : String
    {
        return _internal_TCD_WED;
    }

    [Bindable(event="propertyChange")]
    public function get TCD_SUN() : String
    {
        return _internal_TCD_SUN;
    }

    [Bindable(event="propertyChange")]
    public function get TCD_SAT() : String
    {
        return _internal_TCD_SAT;
    }

    [Bindable(event="propertyChange")]
    public function get TCD_FRI() : String
    {
        return _internal_TCD_FRI;
    }

    [Bindable(event="propertyChange")]
    public function get TCD_TITLE() : String
    {
        return _internal_TCD_TITLE;
    }

    [Bindable(event="propertyChange")]
    public function get TCD_THU() : String
    {
        return _internal_TCD_THU;
    }

    [Bindable(event="propertyChange")]
    public function get TCD_TUE() : String
    {
        return _internal_TCD_TUE;
    }

    [Bindable(event="propertyChange")]
    public function get TCD_MON() : String
    {
        return _internal_TCD_MON;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set TCD_WED(value:String) : void
    {
        var oldValue:String = _internal_TCD_WED;
        if (oldValue !== value)
        {
            _internal_TCD_WED = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_WED", oldValue, _internal_TCD_WED));
        }
    }

    public function set TCD_SUN(value:String) : void
    {
        var oldValue:String = _internal_TCD_SUN;
        if (oldValue !== value)
        {
            _internal_TCD_SUN = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_SUN", oldValue, _internal_TCD_SUN));
        }
    }

    public function set TCD_SAT(value:String) : void
    {
        var oldValue:String = _internal_TCD_SAT;
        if (oldValue !== value)
        {
            _internal_TCD_SAT = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_SAT", oldValue, _internal_TCD_SAT));
        }
    }

    public function set TCD_FRI(value:String) : void
    {
        var oldValue:String = _internal_TCD_FRI;
        if (oldValue !== value)
        {
            _internal_TCD_FRI = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_FRI", oldValue, _internal_TCD_FRI));
        }
    }

    public function set TCD_TITLE(value:String) : void
    {
        var oldValue:String = _internal_TCD_TITLE;
        if (oldValue !== value)
        {
            _internal_TCD_TITLE = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_TITLE", oldValue, _internal_TCD_TITLE));
        }
    }

    public function set TCD_THU(value:String) : void
    {
        var oldValue:String = _internal_TCD_THU;
        if (oldValue !== value)
        {
            _internal_TCD_THU = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_THU", oldValue, _internal_TCD_THU));
        }
    }

    public function set TCD_TUE(value:String) : void
    {
        var oldValue:String = _internal_TCD_TUE;
        if (oldValue !== value)
        {
            _internal_TCD_TUE = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_TUE", oldValue, _internal_TCD_TUE));
        }
    }

    public function set TCD_MON(value:String) : void
    {
        var oldValue:String = _internal_TCD_MON;
        if (oldValue !== value)
        {
            _internal_TCD_MON = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "TCD_MON", oldValue, _internal_TCD_MON));
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

    model_internal function setterListenerTCD_WED(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTCD_WED();
    }

    model_internal function setterListenerTCD_SUN(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTCD_SUN();
    }

    model_internal function setterListenerTCD_SAT(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTCD_SAT();
    }

    model_internal function setterListenerTCD_FRI(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTCD_FRI();
    }

    model_internal function setterListenerTCD_TITLE(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTCD_TITLE();
    }

    model_internal function setterListenerTCD_THU(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTCD_THU();
    }

    model_internal function setterListenerTCD_TUE(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTCD_TUE();
    }

    model_internal function setterListenerTCD_MON(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTCD_MON();
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
        if (!_model.TCD_WEDIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_TCD_WEDValidationFailureMessages);
        }
        if (!_model.TCD_SUNIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_TCD_SUNValidationFailureMessages);
        }
        if (!_model.TCD_SATIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_TCD_SATValidationFailureMessages);
        }
        if (!_model.TCD_FRIIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_TCD_FRIValidationFailureMessages);
        }
        if (!_model.TCD_TITLEIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_TCD_TITLEValidationFailureMessages);
        }
        if (!_model.TCD_THUIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_TCD_THUValidationFailureMessages);
        }
        if (!_model.TCD_TUEIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_TCD_TUEValidationFailureMessages);
        }
        if (!_model.TCD_MONIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_TCD_MONValidationFailureMessages);
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
    public function get _model() : _TimeCodeEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _TimeCodeEntityMetadata) : void
    {
        var oldValue : _TimeCodeEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfTCD_WED : Array = null;
    model_internal var _doValidationLastValOfTCD_WED : String;

    model_internal function _doValidationForTCD_WED(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTCD_WED != null && model_internal::_doValidationLastValOfTCD_WED == value)
           return model_internal::_doValidationCacheOfTCD_WED ;

        _model.model_internal::_TCD_WEDIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTCD_WEDAvailable && _internal_TCD_WED == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "TCD_WED is required"));
        }

        model_internal::_doValidationCacheOfTCD_WED = validationFailures;
        model_internal::_doValidationLastValOfTCD_WED = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTCD_SUN : Array = null;
    model_internal var _doValidationLastValOfTCD_SUN : String;

    model_internal function _doValidationForTCD_SUN(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTCD_SUN != null && model_internal::_doValidationLastValOfTCD_SUN == value)
           return model_internal::_doValidationCacheOfTCD_SUN ;

        _model.model_internal::_TCD_SUNIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTCD_SUNAvailable && _internal_TCD_SUN == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "TCD_SUN is required"));
        }

        model_internal::_doValidationCacheOfTCD_SUN = validationFailures;
        model_internal::_doValidationLastValOfTCD_SUN = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTCD_SAT : Array = null;
    model_internal var _doValidationLastValOfTCD_SAT : String;

    model_internal function _doValidationForTCD_SAT(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTCD_SAT != null && model_internal::_doValidationLastValOfTCD_SAT == value)
           return model_internal::_doValidationCacheOfTCD_SAT ;

        _model.model_internal::_TCD_SATIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTCD_SATAvailable && _internal_TCD_SAT == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "TCD_SAT is required"));
        }

        model_internal::_doValidationCacheOfTCD_SAT = validationFailures;
        model_internal::_doValidationLastValOfTCD_SAT = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTCD_FRI : Array = null;
    model_internal var _doValidationLastValOfTCD_FRI : String;

    model_internal function _doValidationForTCD_FRI(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTCD_FRI != null && model_internal::_doValidationLastValOfTCD_FRI == value)
           return model_internal::_doValidationCacheOfTCD_FRI ;

        _model.model_internal::_TCD_FRIIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTCD_FRIAvailable && _internal_TCD_FRI == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "TCD_FRI is required"));
        }

        model_internal::_doValidationCacheOfTCD_FRI = validationFailures;
        model_internal::_doValidationLastValOfTCD_FRI = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTCD_TITLE : Array = null;
    model_internal var _doValidationLastValOfTCD_TITLE : String;

    model_internal function _doValidationForTCD_TITLE(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTCD_TITLE != null && model_internal::_doValidationLastValOfTCD_TITLE == value)
           return model_internal::_doValidationCacheOfTCD_TITLE ;

        _model.model_internal::_TCD_TITLEIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTCD_TITLEAvailable && _internal_TCD_TITLE == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "TCD_TITLE is required"));
        }

        model_internal::_doValidationCacheOfTCD_TITLE = validationFailures;
        model_internal::_doValidationLastValOfTCD_TITLE = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTCD_THU : Array = null;
    model_internal var _doValidationLastValOfTCD_THU : String;

    model_internal function _doValidationForTCD_THU(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTCD_THU != null && model_internal::_doValidationLastValOfTCD_THU == value)
           return model_internal::_doValidationCacheOfTCD_THU ;

        _model.model_internal::_TCD_THUIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTCD_THUAvailable && _internal_TCD_THU == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "TCD_THU is required"));
        }

        model_internal::_doValidationCacheOfTCD_THU = validationFailures;
        model_internal::_doValidationLastValOfTCD_THU = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTCD_TUE : Array = null;
    model_internal var _doValidationLastValOfTCD_TUE : String;

    model_internal function _doValidationForTCD_TUE(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTCD_TUE != null && model_internal::_doValidationLastValOfTCD_TUE == value)
           return model_internal::_doValidationCacheOfTCD_TUE ;

        _model.model_internal::_TCD_TUEIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTCD_TUEAvailable && _internal_TCD_TUE == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "TCD_TUE is required"));
        }

        model_internal::_doValidationCacheOfTCD_TUE = validationFailures;
        model_internal::_doValidationLastValOfTCD_TUE = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTCD_MON : Array = null;
    model_internal var _doValidationLastValOfTCD_MON : String;

    model_internal function _doValidationForTCD_MON(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTCD_MON != null && model_internal::_doValidationLastValOfTCD_MON == value)
           return model_internal::_doValidationCacheOfTCD_MON ;

        _model.model_internal::_TCD_MONIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTCD_MONAvailable && _internal_TCD_MON == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "TCD_MON is required"));
        }

        model_internal::_doValidationCacheOfTCD_MON = validationFailures;
        model_internal::_doValidationLastValOfTCD_MON = value;

        return validationFailures;
    }
    

}

}
