/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - EqptTypeLookupByFilter.as.
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
public class _Super_EqptTypeLookupByFilter extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("EqptTypeLookupByFilter") == null)
            {
                flash.net.registerClassAlias("EqptTypeLookupByFilter", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("EqptTypeLookupByFilter", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _EqptTypeLookupByFilterEntityMetadata;
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
    private var _internal_etyp_cmpts : Object;
    private var _internal_etyp_class : String;
    private var _internal_etyp_title : String;
    private var _internal_cmptnu : String;
    private var _internal_etyp_id : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_EqptTypeLookupByFilter()
    {
        _model = new _EqptTypeLookupByFilterEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_cmpts", model_internal::setterListenerEtyp_cmpts));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_class", model_internal::setterListenerEtyp_class));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_title", model_internal::setterListenerEtyp_title));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmptnu", model_internal::setterListenerCmptnu));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_id", model_internal::setterListenerEtyp_id));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get etyp_cmpts() : Object
    {
        return _internal_etyp_cmpts;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_class() : String
    {
        return _internal_etyp_class;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_title() : String
    {
        return _internal_etyp_title;
    }

    [Bindable(event="propertyChange")]
    public function get cmptnu() : String
    {
        return _internal_cmptnu;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_id() : String
    {
        return _internal_etyp_id;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set etyp_cmpts(value:Object) : void
    {
        var oldValue:Object = _internal_etyp_cmpts;
        if (oldValue !== value)
        {
            _internal_etyp_cmpts = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_cmpts", oldValue, _internal_etyp_cmpts));
        }
    }

    public function set etyp_class(value:String) : void
    {
        var oldValue:String = _internal_etyp_class;
        if (oldValue !== value)
        {
            _internal_etyp_class = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_class", oldValue, _internal_etyp_class));
        }
    }

    public function set etyp_title(value:String) : void
    {
        var oldValue:String = _internal_etyp_title;
        if (oldValue !== value)
        {
            _internal_etyp_title = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_title", oldValue, _internal_etyp_title));
        }
    }

    public function set cmptnu(value:String) : void
    {
        var oldValue:String = _internal_cmptnu;
        if (oldValue !== value)
        {
            _internal_cmptnu = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmptnu", oldValue, _internal_cmptnu));
        }
    }

    public function set etyp_id(value:String) : void
    {
        var oldValue:String = _internal_etyp_id;
        if (oldValue !== value)
        {
            _internal_etyp_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_id", oldValue, _internal_etyp_id));
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

    model_internal function setterListenerEtyp_cmpts(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_cmpts();
    }

    model_internal function setterListenerEtyp_class(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_class();
    }

    model_internal function setterListenerEtyp_title(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_title();
    }

    model_internal function setterListenerCmptnu(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmptnu();
    }

    model_internal function setterListenerEtyp_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_id();
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
        if (!_model.etyp_cmptsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_cmptsValidationFailureMessages);
        }
        if (!_model.etyp_classIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_classValidationFailureMessages);
        }
        if (!_model.etyp_titleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_titleValidationFailureMessages);
        }
        if (!_model.cmptnuIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmptnuValidationFailureMessages);
        }
        if (!_model.etyp_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_idValidationFailureMessages);
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
    public function get _model() : _EqptTypeLookupByFilterEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _EqptTypeLookupByFilterEntityMetadata) : void
    {
        var oldValue : _EqptTypeLookupByFilterEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfEtyp_cmpts : Array = null;
    model_internal var _doValidationLastValOfEtyp_cmpts : Object;

    model_internal function _doValidationForEtyp_cmpts(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfEtyp_cmpts != null && model_internal::_doValidationLastValOfEtyp_cmpts == value)
           return model_internal::_doValidationCacheOfEtyp_cmpts ;

        _model.model_internal::_etyp_cmptsIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_cmptsAvailable && _internal_etyp_cmpts == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_cmpts is required"));
        }

        model_internal::_doValidationCacheOfEtyp_cmpts = validationFailures;
        model_internal::_doValidationLastValOfEtyp_cmpts = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_class : Array = null;
    model_internal var _doValidationLastValOfEtyp_class : String;

    model_internal function _doValidationForEtyp_class(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_class != null && model_internal::_doValidationLastValOfEtyp_class == value)
           return model_internal::_doValidationCacheOfEtyp_class ;

        _model.model_internal::_etyp_classIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_classAvailable && _internal_etyp_class == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_class is required"));
        }

        model_internal::_doValidationCacheOfEtyp_class = validationFailures;
        model_internal::_doValidationLastValOfEtyp_class = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_title : Array = null;
    model_internal var _doValidationLastValOfEtyp_title : String;

    model_internal function _doValidationForEtyp_title(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_title != null && model_internal::_doValidationLastValOfEtyp_title == value)
           return model_internal::_doValidationCacheOfEtyp_title ;

        _model.model_internal::_etyp_titleIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_titleAvailable && _internal_etyp_title == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_title is required"));
        }

        model_internal::_doValidationCacheOfEtyp_title = validationFailures;
        model_internal::_doValidationLastValOfEtyp_title = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmptnu : Array = null;
    model_internal var _doValidationLastValOfCmptnu : String;

    model_internal function _doValidationForCmptnu(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmptnu != null && model_internal::_doValidationLastValOfCmptnu == value)
           return model_internal::_doValidationCacheOfCmptnu ;

        _model.model_internal::_cmptnuIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmptnuAvailable && _internal_cmptnu == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmptnu is required"));
        }

        model_internal::_doValidationCacheOfCmptnu = validationFailures;
        model_internal::_doValidationLastValOfCmptnu = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_id : Array = null;
    model_internal var _doValidationLastValOfEtyp_id : String;

    model_internal function _doValidationForEtyp_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_id != null && model_internal::_doValidationLastValOfEtyp_id == value)
           return model_internal::_doValidationCacheOfEtyp_id ;

        _model.model_internal::_etyp_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_idAvailable && _internal_etyp_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_id is required"));
        }

        model_internal::_doValidationCacheOfEtyp_id = validationFailures;
        model_internal::_doValidationLastValOfEtyp_id = value;

        return validationFailures;
    }
    

}

}
