/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - KeyPsnlLookup.as.
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
public class _Super_KeyPsnlLookup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("KeyPsnlLookup") == null)
            {
                flash.net.registerClassAlias("KeyPsnlLookup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("KeyPsnlLookup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _KeyPsnlLookupEntityMetadata;
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
    private var _internal_psnl_cmpy_code : String;
    private var _internal_psnl_role : String;
    private var _internal_psnl_code : String;
    private var _internal_psnl_dept : String;
    private var _internal_psnl_name : String;
    private var _internal_psnl_cmpy_name : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_KeyPsnlLookup()
    {
        _model = new _KeyPsnlLookupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "psnl_cmpy_code", model_internal::setterListenerPsnl_cmpy_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "psnl_role", model_internal::setterListenerPsnl_role));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "psnl_code", model_internal::setterListenerPsnl_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "psnl_dept", model_internal::setterListenerPsnl_dept));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "psnl_name", model_internal::setterListenerPsnl_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "psnl_cmpy_name", model_internal::setterListenerPsnl_cmpy_name));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get psnl_cmpy_code() : String
    {
        return _internal_psnl_cmpy_code;
    }

    [Bindable(event="propertyChange")]
    public function get psnl_role() : String
    {
        return _internal_psnl_role;
    }

    [Bindable(event="propertyChange")]
    public function get psnl_code() : String
    {
        return _internal_psnl_code;
    }

    [Bindable(event="propertyChange")]
    public function get psnl_dept() : String
    {
        return _internal_psnl_dept;
    }

    [Bindable(event="propertyChange")]
    public function get psnl_name() : String
    {
        return _internal_psnl_name;
    }

    [Bindable(event="propertyChange")]
    public function get psnl_cmpy_name() : String
    {
        return _internal_psnl_cmpy_name;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set psnl_cmpy_code(value:String) : void
    {
        var oldValue:String = _internal_psnl_cmpy_code;
        if (oldValue !== value)
        {
            _internal_psnl_cmpy_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_cmpy_code", oldValue, _internal_psnl_cmpy_code));
        }
    }

    public function set psnl_role(value:String) : void
    {
        var oldValue:String = _internal_psnl_role;
        if (oldValue !== value)
        {
            _internal_psnl_role = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_role", oldValue, _internal_psnl_role));
        }
    }

    public function set psnl_code(value:String) : void
    {
        var oldValue:String = _internal_psnl_code;
        if (oldValue !== value)
        {
            _internal_psnl_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_code", oldValue, _internal_psnl_code));
        }
    }

    public function set psnl_dept(value:String) : void
    {
        var oldValue:String = _internal_psnl_dept;
        if (oldValue !== value)
        {
            _internal_psnl_dept = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_dept", oldValue, _internal_psnl_dept));
        }
    }

    public function set psnl_name(value:String) : void
    {
        var oldValue:String = _internal_psnl_name;
        if (oldValue !== value)
        {
            _internal_psnl_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_name", oldValue, _internal_psnl_name));
        }
    }

    public function set psnl_cmpy_name(value:String) : void
    {
        var oldValue:String = _internal_psnl_cmpy_name;
        if (oldValue !== value)
        {
            _internal_psnl_cmpy_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_cmpy_name", oldValue, _internal_psnl_cmpy_name));
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

    model_internal function setterListenerPsnl_cmpy_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPsnl_cmpy_code();
    }

    model_internal function setterListenerPsnl_role(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPsnl_role();
    }

    model_internal function setterListenerPsnl_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPsnl_code();
    }

    model_internal function setterListenerPsnl_dept(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPsnl_dept();
    }

    model_internal function setterListenerPsnl_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPsnl_name();
    }

    model_internal function setterListenerPsnl_cmpy_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPsnl_cmpy_name();
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
        if (!_model.psnl_cmpy_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_psnl_cmpy_codeValidationFailureMessages);
        }
        if (!_model.psnl_roleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_psnl_roleValidationFailureMessages);
        }
        if (!_model.psnl_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_psnl_codeValidationFailureMessages);
        }
        if (!_model.psnl_deptIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_psnl_deptValidationFailureMessages);
        }
        if (!_model.psnl_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_psnl_nameValidationFailureMessages);
        }
        if (!_model.psnl_cmpy_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_psnl_cmpy_nameValidationFailureMessages);
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
    public function get _model() : _KeyPsnlLookupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _KeyPsnlLookupEntityMetadata) : void
    {
        var oldValue : _KeyPsnlLookupEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfPsnl_cmpy_code : Array = null;
    model_internal var _doValidationLastValOfPsnl_cmpy_code : String;

    model_internal function _doValidationForPsnl_cmpy_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPsnl_cmpy_code != null && model_internal::_doValidationLastValOfPsnl_cmpy_code == value)
           return model_internal::_doValidationCacheOfPsnl_cmpy_code ;

        _model.model_internal::_psnl_cmpy_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPsnl_cmpy_codeAvailable && _internal_psnl_cmpy_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "psnl_cmpy_code is required"));
        }

        model_internal::_doValidationCacheOfPsnl_cmpy_code = validationFailures;
        model_internal::_doValidationLastValOfPsnl_cmpy_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPsnl_role : Array = null;
    model_internal var _doValidationLastValOfPsnl_role : String;

    model_internal function _doValidationForPsnl_role(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPsnl_role != null && model_internal::_doValidationLastValOfPsnl_role == value)
           return model_internal::_doValidationCacheOfPsnl_role ;

        _model.model_internal::_psnl_roleIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPsnl_roleAvailable && _internal_psnl_role == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "psnl_role is required"));
        }

        model_internal::_doValidationCacheOfPsnl_role = validationFailures;
        model_internal::_doValidationLastValOfPsnl_role = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPsnl_code : Array = null;
    model_internal var _doValidationLastValOfPsnl_code : String;

    model_internal function _doValidationForPsnl_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPsnl_code != null && model_internal::_doValidationLastValOfPsnl_code == value)
           return model_internal::_doValidationCacheOfPsnl_code ;

        _model.model_internal::_psnl_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPsnl_codeAvailable && _internal_psnl_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "psnl_code is required"));
        }

        model_internal::_doValidationCacheOfPsnl_code = validationFailures;
        model_internal::_doValidationLastValOfPsnl_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPsnl_dept : Array = null;
    model_internal var _doValidationLastValOfPsnl_dept : String;

    model_internal function _doValidationForPsnl_dept(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPsnl_dept != null && model_internal::_doValidationLastValOfPsnl_dept == value)
           return model_internal::_doValidationCacheOfPsnl_dept ;

        _model.model_internal::_psnl_deptIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPsnl_deptAvailable && _internal_psnl_dept == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "psnl_dept is required"));
        }

        model_internal::_doValidationCacheOfPsnl_dept = validationFailures;
        model_internal::_doValidationLastValOfPsnl_dept = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPsnl_name : Array = null;
    model_internal var _doValidationLastValOfPsnl_name : String;

    model_internal function _doValidationForPsnl_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPsnl_name != null && model_internal::_doValidationLastValOfPsnl_name == value)
           return model_internal::_doValidationCacheOfPsnl_name ;

        _model.model_internal::_psnl_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPsnl_nameAvailable && _internal_psnl_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "psnl_name is required"));
        }

        model_internal::_doValidationCacheOfPsnl_name = validationFailures;
        model_internal::_doValidationLastValOfPsnl_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPsnl_cmpy_name : Array = null;
    model_internal var _doValidationLastValOfPsnl_cmpy_name : String;

    model_internal function _doValidationForPsnl_cmpy_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPsnl_cmpy_name != null && model_internal::_doValidationLastValOfPsnl_cmpy_name == value)
           return model_internal::_doValidationCacheOfPsnl_cmpy_name ;

        _model.model_internal::_psnl_cmpy_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPsnl_cmpy_nameAvailable && _internal_psnl_cmpy_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "psnl_cmpy_name is required"));
        }

        model_internal::_doValidationCacheOfPsnl_cmpy_name = validationFailures;
        model_internal::_doValidationLastValOfPsnl_cmpy_name = value;

        return validationFailures;
    }
    

}

}
