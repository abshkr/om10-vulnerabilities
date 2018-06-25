/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - Site_Config.as.
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
public class _Super_Site_Config extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("Site_Config") == null)
            {
                flash.net.registerClassAlias("Site_Config", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("Site_Config", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _Site_ConfigEntityMetadata;
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
    private var _internal_config_val_last_chg : String;
    private var _internal_config_comment : String;
    private var _internal_config_value : String;
    private var _internal_config_key : String;
    private var _internal_config_required_by_gui : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_Site_Config()
    {
        _model = new _Site_ConfigEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "config_val_last_chg", model_internal::setterListenerConfig_val_last_chg));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "config_comment", model_internal::setterListenerConfig_comment));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "config_value", model_internal::setterListenerConfig_value));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "config_key", model_internal::setterListenerConfig_key));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "config_required_by_gui", model_internal::setterListenerConfig_required_by_gui));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get config_val_last_chg() : String
    {
        return _internal_config_val_last_chg;
    }

    [Bindable(event="propertyChange")]
    public function get config_comment() : String
    {
        return _internal_config_comment;
    }

    [Bindable(event="propertyChange")]
    public function get config_value() : String
    {
        return _internal_config_value;
    }

    [Bindable(event="propertyChange")]
    public function get config_key() : String
    {
        return _internal_config_key;
    }

    [Bindable(event="propertyChange")]
    public function get config_required_by_gui() : String
    {
        return _internal_config_required_by_gui;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set config_val_last_chg(value:String) : void
    {
        var oldValue:String = _internal_config_val_last_chg;
        if (oldValue !== value)
        {
            _internal_config_val_last_chg = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "config_val_last_chg", oldValue, _internal_config_val_last_chg));
        }
    }

    public function set config_comment(value:String) : void
    {
        var oldValue:String = _internal_config_comment;
        if (oldValue !== value)
        {
            _internal_config_comment = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "config_comment", oldValue, _internal_config_comment));
        }
    }

    public function set config_value(value:String) : void
    {
        var oldValue:String = _internal_config_value;
        if (oldValue !== value)
        {
            _internal_config_value = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "config_value", oldValue, _internal_config_value));
        }
    }

    public function set config_key(value:String) : void
    {
        var oldValue:String = _internal_config_key;
        if (oldValue !== value)
        {
            _internal_config_key = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "config_key", oldValue, _internal_config_key));
        }
    }

    public function set config_required_by_gui(value:String) : void
    {
        var oldValue:String = _internal_config_required_by_gui;
        if (oldValue !== value)
        {
            _internal_config_required_by_gui = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "config_required_by_gui", oldValue, _internal_config_required_by_gui));
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

    model_internal function setterListenerConfig_val_last_chg(value:flash.events.Event):void
    {
        _model.invalidateDependentOnConfig_val_last_chg();
    }

    model_internal function setterListenerConfig_comment(value:flash.events.Event):void
    {
        _model.invalidateDependentOnConfig_comment();
    }

    model_internal function setterListenerConfig_value(value:flash.events.Event):void
    {
        _model.invalidateDependentOnConfig_value();
    }

    model_internal function setterListenerConfig_key(value:flash.events.Event):void
    {
        _model.invalidateDependentOnConfig_key();
    }

    model_internal function setterListenerConfig_required_by_gui(value:flash.events.Event):void
    {
        _model.invalidateDependentOnConfig_required_by_gui();
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
        if (!_model.config_val_last_chgIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_config_val_last_chgValidationFailureMessages);
        }
        if (!_model.config_commentIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_config_commentValidationFailureMessages);
        }
        if (!_model.config_valueIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_config_valueValidationFailureMessages);
        }
        if (!_model.config_keyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_config_keyValidationFailureMessages);
        }
        if (!_model.config_required_by_guiIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_config_required_by_guiValidationFailureMessages);
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
    public function get _model() : _Site_ConfigEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _Site_ConfigEntityMetadata) : void
    {
        var oldValue : _Site_ConfigEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfConfig_val_last_chg : Array = null;
    model_internal var _doValidationLastValOfConfig_val_last_chg : String;

    model_internal function _doValidationForConfig_val_last_chg(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfConfig_val_last_chg != null && model_internal::_doValidationLastValOfConfig_val_last_chg == value)
           return model_internal::_doValidationCacheOfConfig_val_last_chg ;

        _model.model_internal::_config_val_last_chgIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isConfig_val_last_chgAvailable && _internal_config_val_last_chg == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "config_val_last_chg is required"));
        }

        model_internal::_doValidationCacheOfConfig_val_last_chg = validationFailures;
        model_internal::_doValidationLastValOfConfig_val_last_chg = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfConfig_comment : Array = null;
    model_internal var _doValidationLastValOfConfig_comment : String;

    model_internal function _doValidationForConfig_comment(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfConfig_comment != null && model_internal::_doValidationLastValOfConfig_comment == value)
           return model_internal::_doValidationCacheOfConfig_comment ;

        _model.model_internal::_config_commentIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isConfig_commentAvailable && _internal_config_comment == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "config_comment is required"));
        }

        model_internal::_doValidationCacheOfConfig_comment = validationFailures;
        model_internal::_doValidationLastValOfConfig_comment = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfConfig_value : Array = null;
    model_internal var _doValidationLastValOfConfig_value : String;

    model_internal function _doValidationForConfig_value(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfConfig_value != null && model_internal::_doValidationLastValOfConfig_value == value)
           return model_internal::_doValidationCacheOfConfig_value ;

        _model.model_internal::_config_valueIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isConfig_valueAvailable && _internal_config_value == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "config_value is required"));
        }

        model_internal::_doValidationCacheOfConfig_value = validationFailures;
        model_internal::_doValidationLastValOfConfig_value = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfConfig_key : Array = null;
    model_internal var _doValidationLastValOfConfig_key : String;

    model_internal function _doValidationForConfig_key(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfConfig_key != null && model_internal::_doValidationLastValOfConfig_key == value)
           return model_internal::_doValidationCacheOfConfig_key ;

        _model.model_internal::_config_keyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isConfig_keyAvailable && _internal_config_key == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "config_key is required"));
        }

        model_internal::_doValidationCacheOfConfig_key = validationFailures;
        model_internal::_doValidationLastValOfConfig_key = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfConfig_required_by_gui : Array = null;
    model_internal var _doValidationLastValOfConfig_required_by_gui : String;

    model_internal function _doValidationForConfig_required_by_gui(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfConfig_required_by_gui != null && model_internal::_doValidationLastValOfConfig_required_by_gui == value)
           return model_internal::_doValidationCacheOfConfig_required_by_gui ;

        _model.model_internal::_config_required_by_guiIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isConfig_required_by_guiAvailable && _internal_config_required_by_gui == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "config_required_by_gui is required"));
        }

        model_internal::_doValidationCacheOfConfig_required_by_gui = validationFailures;
        model_internal::_doValidationLastValOfConfig_required_by_gui = value;

        return validationFailures;
    }
    

}

}
