/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - DomainPrivilege_vo.as.
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
public class _Super_DomainPrivilege_vo extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("DomainPrivilege_vo") == null)
            {
                flash.net.registerClassAlias("DomainPrivilege_vo", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("DomainPrivilege_vo", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _DomainPrivilege_voEntityMetadata;
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
    private var _internal_priv_delete : int;
    private var _internal_priv_protect : int;
    private var _internal_needsCGI : int;
    private var _internal_object_id : String;
    private var _internal_domain_id : String;
    private var _internal_priv_create : int;
    private var _internal_priv_update : int;
    private var _internal_priv_view : int;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_DomainPrivilege_vo()
    {
        _model = new _DomainPrivilege_voEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "object_id", model_internal::setterListenerObject_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "domain_id", model_internal::setterListenerDomain_id));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get priv_delete() : int
    {
        return _internal_priv_delete;
    }

    [Bindable(event="propertyChange")]
    public function get priv_protect() : int
    {
        return _internal_priv_protect;
    }

    [Bindable(event="propertyChange")]
    public function get needsCGI() : int
    {
        return _internal_needsCGI;
    }

    [Bindable(event="propertyChange")]
    public function get object_id() : String
    {
        return _internal_object_id;
    }

    [Bindable(event="propertyChange")]
    public function get domain_id() : String
    {
        return _internal_domain_id;
    }

    [Bindable(event="propertyChange")]
    public function get priv_create() : int
    {
        return _internal_priv_create;
    }

    [Bindable(event="propertyChange")]
    public function get priv_update() : int
    {
        return _internal_priv_update;
    }

    [Bindable(event="propertyChange")]
    public function get priv_view() : int
    {
        return _internal_priv_view;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set priv_delete(value:int) : void
    {
        var oldValue:int = _internal_priv_delete;
        if (oldValue !== value)
        {
            _internal_priv_delete = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "priv_delete", oldValue, _internal_priv_delete));
        }
    }

    public function set priv_protect(value:int) : void
    {
        var oldValue:int = _internal_priv_protect;
        if (oldValue !== value)
        {
            _internal_priv_protect = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "priv_protect", oldValue, _internal_priv_protect));
        }
    }

    public function set needsCGI(value:int) : void
    {
        var oldValue:int = _internal_needsCGI;
        if (oldValue !== value)
        {
            _internal_needsCGI = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "needsCGI", oldValue, _internal_needsCGI));
        }
    }

    public function set object_id(value:String) : void
    {
        var oldValue:String = _internal_object_id;
        if (oldValue !== value)
        {
            _internal_object_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_id", oldValue, _internal_object_id));
        }
    }

    public function set domain_id(value:String) : void
    {
        var oldValue:String = _internal_domain_id;
        if (oldValue !== value)
        {
            _internal_domain_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "domain_id", oldValue, _internal_domain_id));
        }
    }

    public function set priv_create(value:int) : void
    {
        var oldValue:int = _internal_priv_create;
        if (oldValue !== value)
        {
            _internal_priv_create = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "priv_create", oldValue, _internal_priv_create));
        }
    }

    public function set priv_update(value:int) : void
    {
        var oldValue:int = _internal_priv_update;
        if (oldValue !== value)
        {
            _internal_priv_update = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "priv_update", oldValue, _internal_priv_update));
        }
    }

    public function set priv_view(value:int) : void
    {
        var oldValue:int = _internal_priv_view;
        if (oldValue !== value)
        {
            _internal_priv_view = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "priv_view", oldValue, _internal_priv_view));
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

    model_internal function setterListenerObject_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnObject_id();
    }

    model_internal function setterListenerDomain_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnDomain_id();
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
        if (!_model.object_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_object_idValidationFailureMessages);
        }
        if (!_model.domain_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_domain_idValidationFailureMessages);
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
    public function get _model() : _DomainPrivilege_voEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _DomainPrivilege_voEntityMetadata) : void
    {
        var oldValue : _DomainPrivilege_voEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfObject_id : Array = null;
    model_internal var _doValidationLastValOfObject_id : String;

    model_internal function _doValidationForObject_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfObject_id != null && model_internal::_doValidationLastValOfObject_id == value)
           return model_internal::_doValidationCacheOfObject_id ;

        _model.model_internal::_object_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isObject_idAvailable && _internal_object_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "object_id is required"));
        }

        model_internal::_doValidationCacheOfObject_id = validationFailures;
        model_internal::_doValidationLastValOfObject_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfDomain_id : Array = null;
    model_internal var _doValidationLastValOfDomain_id : String;

    model_internal function _doValidationForDomain_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfDomain_id != null && model_internal::_doValidationLastValOfDomain_id == value)
           return model_internal::_doValidationCacheOfDomain_id ;

        _model.model_internal::_domain_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isDomain_idAvailable && _internal_domain_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "domain_id is required"));
        }

        model_internal::_doValidationCacheOfDomain_id = validationFailures;
        model_internal::_doValidationLastValOfDomain_id = value;

        return validationFailures;
    }
    

}

}
