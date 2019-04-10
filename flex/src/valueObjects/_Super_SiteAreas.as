/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - SiteAreas.as.
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
public class _Super_SiteAreas extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("SiteAreas") == null)
            {
                flash.net.registerClassAlias("SiteAreas", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("SiteAreas", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _SiteAreasEntityMetadata;
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
    private var _internal_area_cpcty : String;
    private var _internal_area_name : String;
    private var _internal_area_eqp_sft_lnk : String;
    private var _internal_area_k : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_SiteAreas()
    {
        _model = new _SiteAreasEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "area_cpcty", model_internal::setterListenerArea_cpcty));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "area_name", model_internal::setterListenerArea_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "area_eqp_sft_lnk", model_internal::setterListenerArea_eqp_sft_lnk));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "area_k", model_internal::setterListenerArea_k));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get area_cpcty() : String
    {
        return _internal_area_cpcty;
    }

    [Bindable(event="propertyChange")]
    public function get area_name() : String
    {
        return _internal_area_name;
    }

    [Bindable(event="propertyChange")]
    public function get area_eqp_sft_lnk() : String
    {
        return _internal_area_eqp_sft_lnk;
    }

    [Bindable(event="propertyChange")]
    public function get area_k() : String
    {
        return _internal_area_k;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set area_cpcty(value:String) : void
    {
        var oldValue:String = _internal_area_cpcty;
        if (oldValue !== value)
        {
            _internal_area_cpcty = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "area_cpcty", oldValue, _internal_area_cpcty));
        }
    }

    public function set area_name(value:String) : void
    {
        var oldValue:String = _internal_area_name;
        if (oldValue !== value)
        {
            _internal_area_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "area_name", oldValue, _internal_area_name));
        }
    }

    public function set area_eqp_sft_lnk(value:String) : void
    {
        var oldValue:String = _internal_area_eqp_sft_lnk;
        if (oldValue !== value)
        {
            _internal_area_eqp_sft_lnk = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "area_eqp_sft_lnk", oldValue, _internal_area_eqp_sft_lnk));
        }
    }

    public function set area_k(value:String) : void
    {
        var oldValue:String = _internal_area_k;
        if (oldValue !== value)
        {
            _internal_area_k = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "area_k", oldValue, _internal_area_k));
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

    model_internal function setterListenerArea_cpcty(value:flash.events.Event):void
    {
        _model.invalidateDependentOnArea_cpcty();
    }

    model_internal function setterListenerArea_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnArea_name();
    }

    model_internal function setterListenerArea_eqp_sft_lnk(value:flash.events.Event):void
    {
        _model.invalidateDependentOnArea_eqp_sft_lnk();
    }

    model_internal function setterListenerArea_k(value:flash.events.Event):void
    {
        _model.invalidateDependentOnArea_k();
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
        if (!_model.area_cpctyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_area_cpctyValidationFailureMessages);
        }
        if (!_model.area_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_area_nameValidationFailureMessages);
        }
        if (!_model.area_eqp_sft_lnkIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_area_eqp_sft_lnkValidationFailureMessages);
        }
        if (!_model.area_kIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_area_kValidationFailureMessages);
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
    public function get _model() : _SiteAreasEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _SiteAreasEntityMetadata) : void
    {
        var oldValue : _SiteAreasEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfArea_cpcty : Array = null;
    model_internal var _doValidationLastValOfArea_cpcty : String;

    model_internal function _doValidationForArea_cpcty(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfArea_cpcty != null && model_internal::_doValidationLastValOfArea_cpcty == value)
           return model_internal::_doValidationCacheOfArea_cpcty ;

        _model.model_internal::_area_cpctyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isArea_cpctyAvailable && _internal_area_cpcty == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "area_cpcty is required"));
        }

        model_internal::_doValidationCacheOfArea_cpcty = validationFailures;
        model_internal::_doValidationLastValOfArea_cpcty = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfArea_name : Array = null;
    model_internal var _doValidationLastValOfArea_name : String;

    model_internal function _doValidationForArea_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfArea_name != null && model_internal::_doValidationLastValOfArea_name == value)
           return model_internal::_doValidationCacheOfArea_name ;

        _model.model_internal::_area_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isArea_nameAvailable && _internal_area_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "area_name is required"));
        }

        model_internal::_doValidationCacheOfArea_name = validationFailures;
        model_internal::_doValidationLastValOfArea_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfArea_eqp_sft_lnk : Array = null;
    model_internal var _doValidationLastValOfArea_eqp_sft_lnk : String;

    model_internal function _doValidationForArea_eqp_sft_lnk(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfArea_eqp_sft_lnk != null && model_internal::_doValidationLastValOfArea_eqp_sft_lnk == value)
           return model_internal::_doValidationCacheOfArea_eqp_sft_lnk ;

        _model.model_internal::_area_eqp_sft_lnkIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isArea_eqp_sft_lnkAvailable && _internal_area_eqp_sft_lnk == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "area_eqp_sft_lnk is required"));
        }

        model_internal::_doValidationCacheOfArea_eqp_sft_lnk = validationFailures;
        model_internal::_doValidationLastValOfArea_eqp_sft_lnk = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfArea_k : Array = null;
    model_internal var _doValidationLastValOfArea_k : String;

    model_internal function _doValidationForArea_k(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfArea_k != null && model_internal::_doValidationLastValOfArea_k == value)
           return model_internal::_doValidationCacheOfArea_k ;

        _model.model_internal::_area_kIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isArea_kAvailable && _internal_area_k == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "area_k is required"));
        }

        model_internal::_doValidationCacheOfArea_k = validationFailures;
        model_internal::_doValidationLastValOfArea_k = value;

        return validationFailures;
    }
    

}

}
