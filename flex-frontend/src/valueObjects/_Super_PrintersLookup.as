/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - PrintersLookup.as.
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
public class _Super_PrintersLookup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("PrintersLookup") == null)
            {
                flash.net.registerClassAlias("PrintersLookup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("PrintersLookup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _PrintersLookupEntityMetadata;
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
    private var _internal_cmpy : String;
    private var _internal_cmpy_ld_rep_vp : String;
    private var _internal_cmpy_drv_inst_vp : Object;
    private var _internal_cmpy_bol_vp_name : Object;
    private var _internal_prntr : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_PrintersLookup()
    {
        _model = new _PrintersLookupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy", model_internal::setterListenerCmpy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_ld_rep_vp", model_internal::setterListenerCmpy_ld_rep_vp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_drv_inst_vp", model_internal::setterListenerCmpy_drv_inst_vp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmpy_bol_vp_name", model_internal::setterListenerCmpy_bol_vp_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prntr", model_internal::setterListenerPrntr));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get cmpy() : String
    {
        return _internal_cmpy;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ld_rep_vp() : String
    {
        return _internal_cmpy_ld_rep_vp;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_drv_inst_vp() : Object
    {
        return _internal_cmpy_drv_inst_vp;
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_bol_vp_name() : Object
    {
        return _internal_cmpy_bol_vp_name;
    }

    [Bindable(event="propertyChange")]
    public function get prntr() : String
    {
        return _internal_prntr;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set cmpy(value:String) : void
    {
        var oldValue:String = _internal_cmpy;
        if (oldValue !== value)
        {
            _internal_cmpy = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy", oldValue, _internal_cmpy));
        }
    }

    public function set cmpy_ld_rep_vp(value:String) : void
    {
        var oldValue:String = _internal_cmpy_ld_rep_vp;
        if (oldValue !== value)
        {
            _internal_cmpy_ld_rep_vp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ld_rep_vp", oldValue, _internal_cmpy_ld_rep_vp));
        }
    }

    public function set cmpy_drv_inst_vp(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_drv_inst_vp;
        if (oldValue !== value)
        {
            _internal_cmpy_drv_inst_vp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_drv_inst_vp", oldValue, _internal_cmpy_drv_inst_vp));
        }
    }

    public function set cmpy_bol_vp_name(value:Object) : void
    {
        var oldValue:Object = _internal_cmpy_bol_vp_name;
        if (oldValue !== value)
        {
            _internal_cmpy_bol_vp_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_bol_vp_name", oldValue, _internal_cmpy_bol_vp_name));
        }
    }

    public function set prntr(value:String) : void
    {
        var oldValue:String = _internal_prntr;
        if (oldValue !== value)
        {
            _internal_prntr = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prntr", oldValue, _internal_prntr));
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

    model_internal function setterListenerCmpy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy();
    }

    model_internal function setterListenerCmpy_ld_rep_vp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_ld_rep_vp();
    }

    model_internal function setterListenerCmpy_drv_inst_vp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_drv_inst_vp();
    }

    model_internal function setterListenerCmpy_bol_vp_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmpy_bol_vp_name();
    }

    model_internal function setterListenerPrntr(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPrntr();
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
        if (!_model.cmpyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpyValidationFailureMessages);
        }
        if (!_model.cmpy_ld_rep_vpIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_ld_rep_vpValidationFailureMessages);
        }
        if (!_model.cmpy_drv_inst_vpIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_drv_inst_vpValidationFailureMessages);
        }
        if (!_model.cmpy_bol_vp_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmpy_bol_vp_nameValidationFailureMessages);
        }
        if (!_model.prntrIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prntrValidationFailureMessages);
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
    public function get _model() : _PrintersLookupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _PrintersLookupEntityMetadata) : void
    {
        var oldValue : _PrintersLookupEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfCmpy : Array = null;
    model_internal var _doValidationLastValOfCmpy : String;

    model_internal function _doValidationForCmpy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy != null && model_internal::_doValidationLastValOfCmpy == value)
           return model_internal::_doValidationCacheOfCmpy ;

        _model.model_internal::_cmpyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpyAvailable && _internal_cmpy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy is required"));
        }

        model_internal::_doValidationCacheOfCmpy = validationFailures;
        model_internal::_doValidationLastValOfCmpy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_ld_rep_vp : Array = null;
    model_internal var _doValidationLastValOfCmpy_ld_rep_vp : String;

    model_internal function _doValidationForCmpy_ld_rep_vp(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmpy_ld_rep_vp != null && model_internal::_doValidationLastValOfCmpy_ld_rep_vp == value)
           return model_internal::_doValidationCacheOfCmpy_ld_rep_vp ;

        _model.model_internal::_cmpy_ld_rep_vpIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_ld_rep_vpAvailable && _internal_cmpy_ld_rep_vp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_ld_rep_vp is required"));
        }

        model_internal::_doValidationCacheOfCmpy_ld_rep_vp = validationFailures;
        model_internal::_doValidationLastValOfCmpy_ld_rep_vp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_drv_inst_vp : Array = null;
    model_internal var _doValidationLastValOfCmpy_drv_inst_vp : Object;

    model_internal function _doValidationForCmpy_drv_inst_vp(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfCmpy_drv_inst_vp != null && model_internal::_doValidationLastValOfCmpy_drv_inst_vp == value)
           return model_internal::_doValidationCacheOfCmpy_drv_inst_vp ;

        _model.model_internal::_cmpy_drv_inst_vpIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_drv_inst_vpAvailable && _internal_cmpy_drv_inst_vp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_drv_inst_vp is required"));
        }

        model_internal::_doValidationCacheOfCmpy_drv_inst_vp = validationFailures;
        model_internal::_doValidationLastValOfCmpy_drv_inst_vp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmpy_bol_vp_name : Array = null;
    model_internal var _doValidationLastValOfCmpy_bol_vp_name : Object;

    model_internal function _doValidationForCmpy_bol_vp_name(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfCmpy_bol_vp_name != null && model_internal::_doValidationLastValOfCmpy_bol_vp_name == value)
           return model_internal::_doValidationCacheOfCmpy_bol_vp_name ;

        _model.model_internal::_cmpy_bol_vp_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmpy_bol_vp_nameAvailable && _internal_cmpy_bol_vp_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmpy_bol_vp_name is required"));
        }

        model_internal::_doValidationCacheOfCmpy_bol_vp_name = validationFailures;
        model_internal::_doValidationLastValOfCmpy_bol_vp_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPrntr : Array = null;
    model_internal var _doValidationLastValOfPrntr : String;

    model_internal function _doValidationForPrntr(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPrntr != null && model_internal::_doValidationLastValOfPrntr == value)
           return model_internal::_doValidationCacheOfPrntr ;

        _model.model_internal::_prntrIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPrntrAvailable && _internal_prntr == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prntr is required"));
        }

        model_internal::_doValidationCacheOfPrntr = validationFailures;
        model_internal::_doValidationLastValOfPrntr = value;

        return validationFailures;
    }
    

}

}
