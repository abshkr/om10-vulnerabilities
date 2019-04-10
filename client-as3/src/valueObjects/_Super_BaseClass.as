/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - BaseClass.as.
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
public class _Super_BaseClass extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("BaseClass") == null)
            {
                flash.net.registerClassAlias("BaseClass", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("BaseClass", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _BaseClassEntityMetadata;
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
    private var _internal_bclass_desc : String;
    private var _internal_bclass_no : String;
    private var _internal_bclass_dens_hi : String;
    private var _internal_bclass_vcf_alg : String;
    private var _internal_bclass_dens_lo : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_BaseClass()
    {
        _model = new _BaseClassEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "bclass_desc", model_internal::setterListenerBclass_desc));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "bclass_no", model_internal::setterListenerBclass_no));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "bclass_dens_hi", model_internal::setterListenerBclass_dens_hi));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "bclass_vcf_alg", model_internal::setterListenerBclass_vcf_alg));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "bclass_dens_lo", model_internal::setterListenerBclass_dens_lo));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get bclass_desc() : String
    {
        return _internal_bclass_desc;
    }

    [Bindable(event="propertyChange")]
    public function get bclass_no() : String
    {
        return _internal_bclass_no;
    }

    [Bindable(event="propertyChange")]
    public function get bclass_dens_hi() : String
    {
        return _internal_bclass_dens_hi;
    }

    [Bindable(event="propertyChange")]
    public function get bclass_vcf_alg() : String
    {
        return _internal_bclass_vcf_alg;
    }

    [Bindable(event="propertyChange")]
    public function get bclass_dens_lo() : String
    {
        return _internal_bclass_dens_lo;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set bclass_desc(value:String) : void
    {
        var oldValue:String = _internal_bclass_desc;
        if (oldValue !== value)
        {
            _internal_bclass_desc = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_desc", oldValue, _internal_bclass_desc));
        }
    }

    public function set bclass_no(value:String) : void
    {
        var oldValue:String = _internal_bclass_no;
        if (oldValue !== value)
        {
            _internal_bclass_no = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_no", oldValue, _internal_bclass_no));
        }
    }

    public function set bclass_dens_hi(value:String) : void
    {
        var oldValue:String = _internal_bclass_dens_hi;
        if (oldValue !== value)
        {
            _internal_bclass_dens_hi = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_dens_hi", oldValue, _internal_bclass_dens_hi));
        }
    }

    public function set bclass_vcf_alg(value:String) : void
    {
        var oldValue:String = _internal_bclass_vcf_alg;
        if (oldValue !== value)
        {
            _internal_bclass_vcf_alg = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_vcf_alg", oldValue, _internal_bclass_vcf_alg));
        }
    }

    public function set bclass_dens_lo(value:String) : void
    {
        var oldValue:String = _internal_bclass_dens_lo;
        if (oldValue !== value)
        {
            _internal_bclass_dens_lo = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_dens_lo", oldValue, _internal_bclass_dens_lo));
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

    model_internal function setterListenerBclass_desc(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBclass_desc();
    }

    model_internal function setterListenerBclass_no(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBclass_no();
    }

    model_internal function setterListenerBclass_dens_hi(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBclass_dens_hi();
    }

    model_internal function setterListenerBclass_vcf_alg(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBclass_vcf_alg();
    }

    model_internal function setterListenerBclass_dens_lo(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBclass_dens_lo();
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
        if (!_model.bclass_descIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_bclass_descValidationFailureMessages);
        }
        if (!_model.bclass_noIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_bclass_noValidationFailureMessages);
        }
        if (!_model.bclass_dens_hiIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_bclass_dens_hiValidationFailureMessages);
        }
        if (!_model.bclass_vcf_algIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_bclass_vcf_algValidationFailureMessages);
        }
        if (!_model.bclass_dens_loIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_bclass_dens_loValidationFailureMessages);
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
    public function get _model() : _BaseClassEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _BaseClassEntityMetadata) : void
    {
        var oldValue : _BaseClassEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfBclass_desc : Array = null;
    model_internal var _doValidationLastValOfBclass_desc : String;

    model_internal function _doValidationForBclass_desc(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBclass_desc != null && model_internal::_doValidationLastValOfBclass_desc == value)
           return model_internal::_doValidationCacheOfBclass_desc ;

        _model.model_internal::_bclass_descIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBclass_descAvailable && _internal_bclass_desc == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "bclass_desc is required"));
        }

        model_internal::_doValidationCacheOfBclass_desc = validationFailures;
        model_internal::_doValidationLastValOfBclass_desc = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBclass_no : Array = null;
    model_internal var _doValidationLastValOfBclass_no : String;

    model_internal function _doValidationForBclass_no(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBclass_no != null && model_internal::_doValidationLastValOfBclass_no == value)
           return model_internal::_doValidationCacheOfBclass_no ;

        _model.model_internal::_bclass_noIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBclass_noAvailable && _internal_bclass_no == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "bclass_no is required"));
        }

        model_internal::_doValidationCacheOfBclass_no = validationFailures;
        model_internal::_doValidationLastValOfBclass_no = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBclass_dens_hi : Array = null;
    model_internal var _doValidationLastValOfBclass_dens_hi : String;

    model_internal function _doValidationForBclass_dens_hi(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBclass_dens_hi != null && model_internal::_doValidationLastValOfBclass_dens_hi == value)
           return model_internal::_doValidationCacheOfBclass_dens_hi ;

        _model.model_internal::_bclass_dens_hiIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBclass_dens_hiAvailable && _internal_bclass_dens_hi == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "bclass_dens_hi is required"));
        }

        model_internal::_doValidationCacheOfBclass_dens_hi = validationFailures;
        model_internal::_doValidationLastValOfBclass_dens_hi = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBclass_vcf_alg : Array = null;
    model_internal var _doValidationLastValOfBclass_vcf_alg : String;

    model_internal function _doValidationForBclass_vcf_alg(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBclass_vcf_alg != null && model_internal::_doValidationLastValOfBclass_vcf_alg == value)
           return model_internal::_doValidationCacheOfBclass_vcf_alg ;

        _model.model_internal::_bclass_vcf_algIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBclass_vcf_algAvailable && _internal_bclass_vcf_alg == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "bclass_vcf_alg is required"));
        }

        model_internal::_doValidationCacheOfBclass_vcf_alg = validationFailures;
        model_internal::_doValidationLastValOfBclass_vcf_alg = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBclass_dens_lo : Array = null;
    model_internal var _doValidationLastValOfBclass_dens_lo : String;

    model_internal function _doValidationForBclass_dens_lo(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBclass_dens_lo != null && model_internal::_doValidationLastValOfBclass_dens_lo == value)
           return model_internal::_doValidationCacheOfBclass_dens_lo ;

        _model.model_internal::_bclass_dens_loIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBclass_dens_loAvailable && _internal_bclass_dens_lo == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "bclass_dens_lo is required"));
        }

        model_internal::_doValidationCacheOfBclass_dens_lo = validationFailures;
        model_internal::_doValidationLastValOfBclass_dens_lo = value;

        return validationFailures;
    }
    

}

}
