/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - AccessPermissions_vo.as.
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
public class _Super_AccessPermissions_vo extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("AccessPermissions_vo") == null)
            {
                flash.net.registerClassAlias("AccessPermissions_vo", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("AccessPermissions_vo", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _AccessPermissions_voEntityMetadata;
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
    private var _internal_perm_psn : String;
    private var _internal_perm_area : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_AccessPermissions_vo()
    {
        _model = new _AccessPermissions_voEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "perm_psn", model_internal::setterListenerPerm_psn));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "perm_area", model_internal::setterListenerPerm_area));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get perm_psn() : String
    {
        return _internal_perm_psn;
    }

    [Bindable(event="propertyChange")]
    public function get perm_area() : String
    {
        return _internal_perm_area;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set perm_psn(value:String) : void
    {
        var oldValue:String = _internal_perm_psn;
        if (oldValue !== value)
        {
            _internal_perm_psn = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "perm_psn", oldValue, _internal_perm_psn));
        }
    }

    public function set perm_area(value:String) : void
    {
        var oldValue:String = _internal_perm_area;
        if (oldValue !== value)
        {
            _internal_perm_area = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "perm_area", oldValue, _internal_perm_area));
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

    model_internal function setterListenerPerm_psn(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPerm_psn();
    }

    model_internal function setterListenerPerm_area(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPerm_area();
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
        if (!_model.perm_psnIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_perm_psnValidationFailureMessages);
        }
        if (!_model.perm_areaIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_perm_areaValidationFailureMessages);
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
    public function get _model() : _AccessPermissions_voEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _AccessPermissions_voEntityMetadata) : void
    {
        var oldValue : _AccessPermissions_voEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfPerm_psn : Array = null;
    model_internal var _doValidationLastValOfPerm_psn : String;

    model_internal function _doValidationForPerm_psn(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPerm_psn != null && model_internal::_doValidationLastValOfPerm_psn == value)
           return model_internal::_doValidationCacheOfPerm_psn ;

        _model.model_internal::_perm_psnIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPerm_psnAvailable && _internal_perm_psn == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "perm_psn is required"));
        }

        model_internal::_doValidationCacheOfPerm_psn = validationFailures;
        model_internal::_doValidationLastValOfPerm_psn = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPerm_area : Array = null;
    model_internal var _doValidationLastValOfPerm_area : String;

    model_internal function _doValidationForPerm_area(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPerm_area != null && model_internal::_doValidationLastValOfPerm_area == value)
           return model_internal::_doValidationCacheOfPerm_area ;

        _model.model_internal::_perm_areaIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPerm_areaAvailable && _internal_perm_area == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "perm_area is required"));
        }

        model_internal::_doValidationCacheOfPerm_area = validationFailures;
        model_internal::_doValidationLastValOfPerm_area = value;

        return validationFailures;
    }
    

}

}
