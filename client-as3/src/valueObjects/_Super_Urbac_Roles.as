/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - Urbac_Roles.as.
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
import mx.events.CollectionEvent;
import mx.events.PropertyChangeEvent;
import mx.validators.ValidationResult;
import valueObjects.DomainPrivilege_vo;

import flash.net.registerClassAlias;
import flash.net.getClassByAlias;
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.valueobjects.IPropertyIterator;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;

use namespace model_internal;

[ExcludeClass]
public class _Super_Urbac_Roles extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("Urbac_Roles") == null)
            {
                flash.net.registerClassAlias("Urbac_Roles", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("Urbac_Roles", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
        valueObjects.DomainPrivilege_vo.initRemoteClassAliasSingleChild();
    }

    model_internal var _dminternal_model : _Urbac_RolesEntityMetadata;
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
    private var _internal_role_note : String;
    private var _internal_domainprivilege : ArrayCollection;
    model_internal var _internal_domainprivilege_leaf:valueObjects.DomainPrivilege_vo;
    private var _internal_role_code_old : Object;
    private var _internal_role_code : String;
    private var _internal_role_status : String;
    private var _internal_role_rank : Object;
    private var _internal_role_text : String;
    private var _internal_role_type : Object;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_Urbac_Roles()
    {
        _model = new _Urbac_RolesEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "role_note", model_internal::setterListenerRole_note));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "domainprivilege", model_internal::setterListenerDomainprivilege));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "role_code_old", model_internal::setterListenerRole_code_old));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "role_code", model_internal::setterListenerRole_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "role_status", model_internal::setterListenerRole_status));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "role_rank", model_internal::setterListenerRole_rank));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "role_text", model_internal::setterListenerRole_text));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "role_type", model_internal::setterListenerRole_type));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get role_note() : String
    {
        return _internal_role_note;
    }

    [Bindable(event="propertyChange")]
    public function get domainprivilege() : ArrayCollection
    {
        return _internal_domainprivilege;
    }

    [Bindable(event="propertyChange")]
    public function get role_code_old() : Object
    {
        return _internal_role_code_old;
    }

    [Bindable(event="propertyChange")]
    public function get role_code() : String
    {
        return _internal_role_code;
    }

    [Bindable(event="propertyChange")]
    public function get role_status() : String
    {
        return _internal_role_status;
    }

    [Bindable(event="propertyChange")]
    public function get role_rank() : Object
    {
        return _internal_role_rank;
    }

    [Bindable(event="propertyChange")]
    public function get role_text() : String
    {
        return _internal_role_text;
    }

    [Bindable(event="propertyChange")]
    public function get role_type() : Object
    {
        return _internal_role_type;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set role_note(value:String) : void
    {
        var oldValue:String = _internal_role_note;
        if (oldValue !== value)
        {
            _internal_role_note = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_note", oldValue, _internal_role_note));
        }
    }

    public function set domainprivilege(value:*) : void
    {
        var oldValue:ArrayCollection = _internal_domainprivilege;
        if (oldValue !== value)
        {
            if (value is ArrayCollection)
            {
                _internal_domainprivilege = value;
            }
            else if (value is Array)
            {
                _internal_domainprivilege = new ArrayCollection(value);
            }
            else if (value == null)
            {
                _internal_domainprivilege = null;
            }
            else
            {
                throw new Error("value of domainprivilege must be a collection");
            }
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "domainprivilege", oldValue, _internal_domainprivilege));
        }
    }

    public function set role_code_old(value:Object) : void
    {
        var oldValue:Object = _internal_role_code_old;
        if (oldValue !== value)
        {
            _internal_role_code_old = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_code_old", oldValue, _internal_role_code_old));
        }
    }

    public function set role_code(value:String) : void
    {
        var oldValue:String = _internal_role_code;
        if (oldValue !== value)
        {
            _internal_role_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_code", oldValue, _internal_role_code));
        }
    }

    public function set role_status(value:String) : void
    {
        var oldValue:String = _internal_role_status;
        if (oldValue !== value)
        {
            _internal_role_status = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_status", oldValue, _internal_role_status));
        }
    }

    public function set role_rank(value:Object) : void
    {
        var oldValue:Object = _internal_role_rank;
        if (oldValue !== value)
        {
            _internal_role_rank = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_rank", oldValue, _internal_role_rank));
        }
    }

    public function set role_text(value:String) : void
    {
        var oldValue:String = _internal_role_text;
        if (oldValue !== value)
        {
            _internal_role_text = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_text", oldValue, _internal_role_text));
        }
    }

    public function set role_type(value:Object) : void
    {
        var oldValue:Object = _internal_role_type;
        if (oldValue !== value)
        {
            _internal_role_type = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_type", oldValue, _internal_role_type));
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

    model_internal function setterListenerRole_note(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRole_note();
    }

    model_internal function setterListenerDomainprivilege(value:flash.events.Event):void
    {
        if (value is mx.events.PropertyChangeEvent)
        {
            if (mx.events.PropertyChangeEvent(value).newValue)
            {
                mx.events.PropertyChangeEvent(value).newValue.addEventListener(mx.events.CollectionEvent.COLLECTION_CHANGE, model_internal::setterListenerDomainprivilege);
            }
        }
        _model.invalidateDependentOnDomainprivilege();
    }

    model_internal function setterListenerRole_code_old(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRole_code_old();
    }

    model_internal function setterListenerRole_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRole_code();
    }

    model_internal function setterListenerRole_status(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRole_status();
    }

    model_internal function setterListenerRole_rank(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRole_rank();
    }

    model_internal function setterListenerRole_text(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRole_text();
    }

    model_internal function setterListenerRole_type(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRole_type();
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
        if (!_model.role_noteIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_role_noteValidationFailureMessages);
        }
        if (!_model.domainprivilegeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_domainprivilegeValidationFailureMessages);
        }
        if (!_model.role_code_oldIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_role_code_oldValidationFailureMessages);
        }
        if (!_model.role_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_role_codeValidationFailureMessages);
        }
        if (!_model.role_statusIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_role_statusValidationFailureMessages);
        }
        if (!_model.role_rankIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_role_rankValidationFailureMessages);
        }
        if (!_model.role_textIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_role_textValidationFailureMessages);
        }
        if (!_model.role_typeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_role_typeValidationFailureMessages);
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
    public function get _model() : _Urbac_RolesEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _Urbac_RolesEntityMetadata) : void
    {
        var oldValue : _Urbac_RolesEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfRole_note : Array = null;
    model_internal var _doValidationLastValOfRole_note : String;

    model_internal function _doValidationForRole_note(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRole_note != null && model_internal::_doValidationLastValOfRole_note == value)
           return model_internal::_doValidationCacheOfRole_note ;

        _model.model_internal::_role_noteIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRole_noteAvailable && _internal_role_note == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "role_note is required"));
        }

        model_internal::_doValidationCacheOfRole_note = validationFailures;
        model_internal::_doValidationLastValOfRole_note = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDomainprivilege : Array = null;
    model_internal var _doValidationLastValOfDomainprivilege : ArrayCollection;

    model_internal function _doValidationForDomainprivilege(valueIn:Object):Array
    {
        var value : ArrayCollection = valueIn as ArrayCollection;

        if (model_internal::_doValidationCacheOfDomainprivilege != null && model_internal::_doValidationLastValOfDomainprivilege == value)
           return model_internal::_doValidationCacheOfDomainprivilege ;

        _model.model_internal::_domainprivilegeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDomainprivilegeAvailable && _internal_domainprivilege == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "domainprivilege is required"));
        }

        model_internal::_doValidationCacheOfDomainprivilege = validationFailures;
        model_internal::_doValidationLastValOfDomainprivilege = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRole_code_old : Array = null;
    model_internal var _doValidationLastValOfRole_code_old : Object;

    model_internal function _doValidationForRole_code_old(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfRole_code_old != null && model_internal::_doValidationLastValOfRole_code_old == value)
           return model_internal::_doValidationCacheOfRole_code_old ;

        _model.model_internal::_role_code_oldIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRole_code_oldAvailable && _internal_role_code_old == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "role_code_old is required"));
        }

        model_internal::_doValidationCacheOfRole_code_old = validationFailures;
        model_internal::_doValidationLastValOfRole_code_old = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRole_code : Array = null;
    model_internal var _doValidationLastValOfRole_code : String;

    model_internal function _doValidationForRole_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRole_code != null && model_internal::_doValidationLastValOfRole_code == value)
           return model_internal::_doValidationCacheOfRole_code ;

        _model.model_internal::_role_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRole_codeAvailable && _internal_role_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "role_code is required"));
        }

        model_internal::_doValidationCacheOfRole_code = validationFailures;
        model_internal::_doValidationLastValOfRole_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRole_status : Array = null;
    model_internal var _doValidationLastValOfRole_status : String;

    model_internal function _doValidationForRole_status(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRole_status != null && model_internal::_doValidationLastValOfRole_status == value)
           return model_internal::_doValidationCacheOfRole_status ;

        _model.model_internal::_role_statusIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRole_statusAvailable && _internal_role_status == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "role_status is required"));
        }

        model_internal::_doValidationCacheOfRole_status = validationFailures;
        model_internal::_doValidationLastValOfRole_status = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRole_rank : Array = null;
    model_internal var _doValidationLastValOfRole_rank : Object;

    model_internal function _doValidationForRole_rank(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfRole_rank != null && model_internal::_doValidationLastValOfRole_rank == value)
           return model_internal::_doValidationCacheOfRole_rank ;

        _model.model_internal::_role_rankIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRole_rankAvailable && _internal_role_rank == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "role_rank is required"));
        }

        model_internal::_doValidationCacheOfRole_rank = validationFailures;
        model_internal::_doValidationLastValOfRole_rank = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRole_text : Array = null;
    model_internal var _doValidationLastValOfRole_text : String;

    model_internal function _doValidationForRole_text(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRole_text != null && model_internal::_doValidationLastValOfRole_text == value)
           return model_internal::_doValidationCacheOfRole_text ;

        _model.model_internal::_role_textIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRole_textAvailable && _internal_role_text == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "role_text is required"));
        }

        model_internal::_doValidationCacheOfRole_text = validationFailures;
        model_internal::_doValidationLastValOfRole_text = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRole_type : Array = null;
    model_internal var _doValidationLastValOfRole_type : Object;

    model_internal function _doValidationForRole_type(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfRole_type != null && model_internal::_doValidationLastValOfRole_type == value)
           return model_internal::_doValidationCacheOfRole_type ;

        _model.model_internal::_role_typeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRole_typeAvailable && _internal_role_type == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "role_type is required"));
        }

        model_internal::_doValidationCacheOfRole_type = validationFailures;
        model_internal::_doValidationLastValOfRole_type = value;

        return validationFailures;
    }
    

}

}
