/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - Seal.as.
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
public class _Super_Seal extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("Seal") == null)
            {
                flash.net.registerClassAlias("Seal", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("Seal", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _SealEntityMetadata;
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
    private var _internal_site_next_seal : String;
    private var _internal_seal_cmpt_nr : String;
    private var _internal_sealspec_shlssupp : Object;
    private var _internal_sealspec_shlstrip : Object;
    private var _internal_seal_suffix : String;
    private var _internal_seal_prefix : String;
    private var _internal_seal_nr : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_Seal()
    {
        _model = new _SealEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "site_next_seal", model_internal::setterListenerSite_next_seal));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "seal_cmpt_nr", model_internal::setterListenerSeal_cmpt_nr));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "sealspec_shlssupp", model_internal::setterListenerSealspec_shlssupp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "sealspec_shlstrip", model_internal::setterListenerSealspec_shlstrip));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "seal_suffix", model_internal::setterListenerSeal_suffix));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "seal_prefix", model_internal::setterListenerSeal_prefix));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "seal_nr", model_internal::setterListenerSeal_nr));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get site_next_seal() : String
    {
        return _internal_site_next_seal;
    }

    [Bindable(event="propertyChange")]
    public function get seal_cmpt_nr() : String
    {
        return _internal_seal_cmpt_nr;
    }

    [Bindable(event="propertyChange")]
    public function get sealspec_shlssupp() : Object
    {
        return _internal_sealspec_shlssupp;
    }

    [Bindable(event="propertyChange")]
    public function get sealspec_shlstrip() : Object
    {
        return _internal_sealspec_shlstrip;
    }

    [Bindable(event="propertyChange")]
    public function get seal_suffix() : String
    {
        return _internal_seal_suffix;
    }

    [Bindable(event="propertyChange")]
    public function get seal_prefix() : String
    {
        return _internal_seal_prefix;
    }

    [Bindable(event="propertyChange")]
    public function get seal_nr() : String
    {
        return _internal_seal_nr;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set site_next_seal(value:String) : void
    {
        var oldValue:String = _internal_site_next_seal;
        if (oldValue !== value)
        {
            _internal_site_next_seal = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "site_next_seal", oldValue, _internal_site_next_seal));
        }
    }

    public function set seal_cmpt_nr(value:String) : void
    {
        var oldValue:String = _internal_seal_cmpt_nr;
        if (oldValue !== value)
        {
            _internal_seal_cmpt_nr = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "seal_cmpt_nr", oldValue, _internal_seal_cmpt_nr));
        }
    }

    public function set sealspec_shlssupp(value:Object) : void
    {
        var oldValue:Object = _internal_sealspec_shlssupp;
        if (oldValue !== value)
        {
            _internal_sealspec_shlssupp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sealspec_shlssupp", oldValue, _internal_sealspec_shlssupp));
        }
    }

    public function set sealspec_shlstrip(value:Object) : void
    {
        var oldValue:Object = _internal_sealspec_shlstrip;
        if (oldValue !== value)
        {
            _internal_sealspec_shlstrip = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sealspec_shlstrip", oldValue, _internal_sealspec_shlstrip));
        }
    }

    public function set seal_suffix(value:String) : void
    {
        var oldValue:String = _internal_seal_suffix;
        if (oldValue !== value)
        {
            _internal_seal_suffix = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "seal_suffix", oldValue, _internal_seal_suffix));
        }
    }

    public function set seal_prefix(value:String) : void
    {
        var oldValue:String = _internal_seal_prefix;
        if (oldValue !== value)
        {
            _internal_seal_prefix = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "seal_prefix", oldValue, _internal_seal_prefix));
        }
    }

    public function set seal_nr(value:String) : void
    {
        var oldValue:String = _internal_seal_nr;
        if (oldValue !== value)
        {
            _internal_seal_nr = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "seal_nr", oldValue, _internal_seal_nr));
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

    model_internal function setterListenerSite_next_seal(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSite_next_seal();
    }

    model_internal function setterListenerSeal_cmpt_nr(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSeal_cmpt_nr();
    }

    model_internal function setterListenerSealspec_shlssupp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSealspec_shlssupp();
    }

    model_internal function setterListenerSealspec_shlstrip(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSealspec_shlstrip();
    }

    model_internal function setterListenerSeal_suffix(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSeal_suffix();
    }

    model_internal function setterListenerSeal_prefix(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSeal_prefix();
    }

    model_internal function setterListenerSeal_nr(value:flash.events.Event):void
    {
        _model.invalidateDependentOnSeal_nr();
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
        if (!_model.site_next_sealIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_site_next_sealValidationFailureMessages);
        }
        if (!_model.seal_cmpt_nrIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_seal_cmpt_nrValidationFailureMessages);
        }
        if (!_model.sealspec_shlssuppIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_sealspec_shlssuppValidationFailureMessages);
        }
        if (!_model.sealspec_shlstripIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_sealspec_shlstripValidationFailureMessages);
        }
        if (!_model.seal_suffixIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_seal_suffixValidationFailureMessages);
        }
        if (!_model.seal_prefixIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_seal_prefixValidationFailureMessages);
        }
        if (!_model.seal_nrIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_seal_nrValidationFailureMessages);
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
    public function get _model() : _SealEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _SealEntityMetadata) : void
    {
        var oldValue : _SealEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfSite_next_seal : Array = null;
    model_internal var _doValidationLastValOfSite_next_seal : String;

    model_internal function _doValidationForSite_next_seal(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSite_next_seal != null && model_internal::_doValidationLastValOfSite_next_seal == value)
           return model_internal::_doValidationCacheOfSite_next_seal ;

        _model.model_internal::_site_next_sealIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSite_next_sealAvailable && _internal_site_next_seal == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "site_next_seal is required"));
        }

        model_internal::_doValidationCacheOfSite_next_seal = validationFailures;
        model_internal::_doValidationLastValOfSite_next_seal = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSeal_cmpt_nr : Array = null;
    model_internal var _doValidationLastValOfSeal_cmpt_nr : String;

    model_internal function _doValidationForSeal_cmpt_nr(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSeal_cmpt_nr != null && model_internal::_doValidationLastValOfSeal_cmpt_nr == value)
           return model_internal::_doValidationCacheOfSeal_cmpt_nr ;

        _model.model_internal::_seal_cmpt_nrIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSeal_cmpt_nrAvailable && _internal_seal_cmpt_nr == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "seal_cmpt_nr is required"));
        }

        model_internal::_doValidationCacheOfSeal_cmpt_nr = validationFailures;
        model_internal::_doValidationLastValOfSeal_cmpt_nr = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSealspec_shlssupp : Array = null;
    model_internal var _doValidationLastValOfSealspec_shlssupp : Object;

    model_internal function _doValidationForSealspec_shlssupp(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfSealspec_shlssupp != null && model_internal::_doValidationLastValOfSealspec_shlssupp == value)
           return model_internal::_doValidationCacheOfSealspec_shlssupp ;

        _model.model_internal::_sealspec_shlssuppIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSealspec_shlssuppAvailable && _internal_sealspec_shlssupp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "sealspec_shlssupp is required"));
        }

        model_internal::_doValidationCacheOfSealspec_shlssupp = validationFailures;
        model_internal::_doValidationLastValOfSealspec_shlssupp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSealspec_shlstrip : Array = null;
    model_internal var _doValidationLastValOfSealspec_shlstrip : Object;

    model_internal function _doValidationForSealspec_shlstrip(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfSealspec_shlstrip != null && model_internal::_doValidationLastValOfSealspec_shlstrip == value)
           return model_internal::_doValidationCacheOfSealspec_shlstrip ;

        _model.model_internal::_sealspec_shlstripIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSealspec_shlstripAvailable && _internal_sealspec_shlstrip == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "sealspec_shlstrip is required"));
        }

        model_internal::_doValidationCacheOfSealspec_shlstrip = validationFailures;
        model_internal::_doValidationLastValOfSealspec_shlstrip = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSeal_suffix : Array = null;
    model_internal var _doValidationLastValOfSeal_suffix : String;

    model_internal function _doValidationForSeal_suffix(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSeal_suffix != null && model_internal::_doValidationLastValOfSeal_suffix == value)
           return model_internal::_doValidationCacheOfSeal_suffix ;

        _model.model_internal::_seal_suffixIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSeal_suffixAvailable && _internal_seal_suffix == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "seal_suffix is required"));
        }

        model_internal::_doValidationCacheOfSeal_suffix = validationFailures;
        model_internal::_doValidationLastValOfSeal_suffix = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSeal_prefix : Array = null;
    model_internal var _doValidationLastValOfSeal_prefix : String;

    model_internal function _doValidationForSeal_prefix(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSeal_prefix != null && model_internal::_doValidationLastValOfSeal_prefix == value)
           return model_internal::_doValidationCacheOfSeal_prefix ;

        _model.model_internal::_seal_prefixIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSeal_prefixAvailable && _internal_seal_prefix == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "seal_prefix is required"));
        }

        model_internal::_doValidationCacheOfSeal_prefix = validationFailures;
        model_internal::_doValidationLastValOfSeal_prefix = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfSeal_nr : Array = null;
    model_internal var _doValidationLastValOfSeal_nr : String;

    model_internal function _doValidationForSeal_nr(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfSeal_nr != null && model_internal::_doValidationLastValOfSeal_nr == value)
           return model_internal::_doValidationCacheOfSeal_nr ;

        _model.model_internal::_seal_nrIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isSeal_nrAvailable && _internal_seal_nr == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "seal_nr is required"));
        }

        model_internal::_doValidationCacheOfSeal_nr = validationFailures;
        model_internal::_doValidationLastValOfSeal_nr = value;

        return validationFailures;
    }
    

}

}
