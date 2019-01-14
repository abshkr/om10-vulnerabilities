/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - ProductGroup.as.
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
public class _Super_ProductGroup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("ProductGroup") == null)
            {
                flash.net.registerClassAlias("ProductGroup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("ProductGroup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _ProductGroupEntityMetadata;
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
    private var _internal_pgr_description : String;
    private var _internal_pgr_unit : String;
    private var _internal_pgr_code : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_ProductGroup()
    {
        _model = new _ProductGroupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "pgr_description", model_internal::setterListenerPgr_description));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "pgr_unit", model_internal::setterListenerPgr_unit));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "pgr_code", model_internal::setterListenerPgr_code));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get pgr_description() : String
    {
        return _internal_pgr_description;
    }

    [Bindable(event="propertyChange")]
    public function get pgr_unit() : String
    {
        return _internal_pgr_unit;
    }

    [Bindable(event="propertyChange")]
    public function get pgr_code() : String
    {
        return _internal_pgr_code;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set pgr_description(value:String) : void
    {
        var oldValue:String = _internal_pgr_description;
        if (oldValue !== value)
        {
            _internal_pgr_description = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "pgr_description", oldValue, _internal_pgr_description));
        }
    }

    public function set pgr_unit(value:String) : void
    {
        var oldValue:String = _internal_pgr_unit;
        if (oldValue !== value)
        {
            _internal_pgr_unit = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "pgr_unit", oldValue, _internal_pgr_unit));
        }
    }

    public function set pgr_code(value:String) : void
    {
        var oldValue:String = _internal_pgr_code;
        if (oldValue !== value)
        {
            _internal_pgr_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "pgr_code", oldValue, _internal_pgr_code));
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

    model_internal function setterListenerPgr_description(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPgr_description();
    }

    model_internal function setterListenerPgr_unit(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPgr_unit();
    }

    model_internal function setterListenerPgr_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPgr_code();
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
        if (!_model.pgr_descriptionIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_pgr_descriptionValidationFailureMessages);
        }
        if (!_model.pgr_unitIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_pgr_unitValidationFailureMessages);
        }
        if (!_model.pgr_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_pgr_codeValidationFailureMessages);
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
    public function get _model() : _ProductGroupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _ProductGroupEntityMetadata) : void
    {
        var oldValue : _ProductGroupEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfPgr_description : Array = null;
    model_internal var _doValidationLastValOfPgr_description : String;

    model_internal function _doValidationForPgr_description(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPgr_description != null && model_internal::_doValidationLastValOfPgr_description == value)
           return model_internal::_doValidationCacheOfPgr_description ;

        _model.model_internal::_pgr_descriptionIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPgr_descriptionAvailable && _internal_pgr_description == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "pgr_description is required"));
        }

        model_internal::_doValidationCacheOfPgr_description = validationFailures;
        model_internal::_doValidationLastValOfPgr_description = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPgr_unit : Array = null;
    model_internal var _doValidationLastValOfPgr_unit : String;

    model_internal function _doValidationForPgr_unit(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPgr_unit != null && model_internal::_doValidationLastValOfPgr_unit == value)
           return model_internal::_doValidationCacheOfPgr_unit ;

        _model.model_internal::_pgr_unitIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPgr_unitAvailable && _internal_pgr_unit == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "pgr_unit is required"));
        }

        model_internal::_doValidationCacheOfPgr_unit = validationFailures;
        model_internal::_doValidationLastValOfPgr_unit = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPgr_code : Array = null;
    model_internal var _doValidationLastValOfPgr_code : String;

    model_internal function _doValidationForPgr_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPgr_code != null && model_internal::_doValidationLastValOfPgr_code == value)
           return model_internal::_doValidationCacheOfPgr_code ;

        _model.model_internal::_pgr_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPgr_codeAvailable && _internal_pgr_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "pgr_code is required"));
        }

        model_internal::_doValidationCacheOfPgr_code = validationFailures;
        model_internal::_doValidationLastValOfPgr_code = value;

        return validationFailures;
    }
    

}

}
