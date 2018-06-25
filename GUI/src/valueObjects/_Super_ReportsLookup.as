/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - ReportsLookup.as.
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
public class _Super_ReportsLookup extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("ReportsLookup") == null)
            {
                flash.net.registerClassAlias("ReportsLookup", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("ReportsLookup", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _ReportsLookupEntityMetadata;
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
    private var _internal_jasp_file : String;
    private var _internal_rpt_cmpy : String;
    private var _internal_rpt_additive : String;
    private var _internal_rpt_active : String;
    private var _internal_rpt_freq : String;
    private var _internal_rpt_file : String;
    private var _internal_rpt_is_closeout : String;
    private var _internal_rpt_enable : String;
    private var _internal_rpt_desc : String;
    private var _internal_rpt_lang : String;
    private var _internal_rpt_name : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_ReportsLookup()
    {
        _model = new _ReportsLookupEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "jasp_file", model_internal::setterListenerJasp_file));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "rpt_cmpy", model_internal::setterListenerRpt_cmpy));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "rpt_additive", model_internal::setterListenerRpt_additive));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "rpt_active", model_internal::setterListenerRpt_active));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "rpt_freq", model_internal::setterListenerRpt_freq));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "rpt_file", model_internal::setterListenerRpt_file));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "rpt_is_closeout", model_internal::setterListenerRpt_is_closeout));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "rpt_enable", model_internal::setterListenerRpt_enable));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "rpt_desc", model_internal::setterListenerRpt_desc));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "rpt_lang", model_internal::setterListenerRpt_lang));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "rpt_name", model_internal::setterListenerRpt_name));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get jasp_file() : String
    {
        return _internal_jasp_file;
    }

    [Bindable(event="propertyChange")]
    public function get rpt_cmpy() : String
    {
        return _internal_rpt_cmpy;
    }

    [Bindable(event="propertyChange")]
    public function get rpt_additive() : String
    {
        return _internal_rpt_additive;
    }

    [Bindable(event="propertyChange")]
    public function get rpt_active() : String
    {
        return _internal_rpt_active;
    }

    [Bindable(event="propertyChange")]
    public function get rpt_freq() : String
    {
        return _internal_rpt_freq;
    }

    [Bindable(event="propertyChange")]
    public function get rpt_file() : String
    {
        return _internal_rpt_file;
    }

    [Bindable(event="propertyChange")]
    public function get rpt_is_closeout() : String
    {
        return _internal_rpt_is_closeout;
    }

    [Bindable(event="propertyChange")]
    public function get rpt_enable() : String
    {
        return _internal_rpt_enable;
    }

    [Bindable(event="propertyChange")]
    public function get rpt_desc() : String
    {
        return _internal_rpt_desc;
    }

    [Bindable(event="propertyChange")]
    public function get rpt_lang() : String
    {
        return _internal_rpt_lang;
    }

    [Bindable(event="propertyChange")]
    public function get rpt_name() : String
    {
        return _internal_rpt_name;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set jasp_file(value:String) : void
    {
        var oldValue:String = _internal_jasp_file;
        if (oldValue !== value)
        {
            _internal_jasp_file = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "jasp_file", oldValue, _internal_jasp_file));
        }
    }

    public function set rpt_cmpy(value:String) : void
    {
        var oldValue:String = _internal_rpt_cmpy;
        if (oldValue !== value)
        {
            _internal_rpt_cmpy = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_cmpy", oldValue, _internal_rpt_cmpy));
        }
    }

    public function set rpt_additive(value:String) : void
    {
        var oldValue:String = _internal_rpt_additive;
        if (oldValue !== value)
        {
            _internal_rpt_additive = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_additive", oldValue, _internal_rpt_additive));
        }
    }

    public function set rpt_active(value:String) : void
    {
        var oldValue:String = _internal_rpt_active;
        if (oldValue !== value)
        {
            _internal_rpt_active = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_active", oldValue, _internal_rpt_active));
        }
    }

    public function set rpt_freq(value:String) : void
    {
        var oldValue:String = _internal_rpt_freq;
        if (oldValue !== value)
        {
            _internal_rpt_freq = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_freq", oldValue, _internal_rpt_freq));
        }
    }

    public function set rpt_file(value:String) : void
    {
        var oldValue:String = _internal_rpt_file;
        if (oldValue !== value)
        {
            _internal_rpt_file = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_file", oldValue, _internal_rpt_file));
        }
    }

    public function set rpt_is_closeout(value:String) : void
    {
        var oldValue:String = _internal_rpt_is_closeout;
        if (oldValue !== value)
        {
            _internal_rpt_is_closeout = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_is_closeout", oldValue, _internal_rpt_is_closeout));
        }
    }

    public function set rpt_enable(value:String) : void
    {
        var oldValue:String = _internal_rpt_enable;
        if (oldValue !== value)
        {
            _internal_rpt_enable = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_enable", oldValue, _internal_rpt_enable));
        }
    }

    public function set rpt_desc(value:String) : void
    {
        var oldValue:String = _internal_rpt_desc;
        if (oldValue !== value)
        {
            _internal_rpt_desc = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_desc", oldValue, _internal_rpt_desc));
        }
    }

    public function set rpt_lang(value:String) : void
    {
        var oldValue:String = _internal_rpt_lang;
        if (oldValue !== value)
        {
            _internal_rpt_lang = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_lang", oldValue, _internal_rpt_lang));
        }
    }

    public function set rpt_name(value:String) : void
    {
        var oldValue:String = _internal_rpt_name;
        if (oldValue !== value)
        {
            _internal_rpt_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_name", oldValue, _internal_rpt_name));
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

    model_internal function setterListenerJasp_file(value:flash.events.Event):void
    {
        _model.invalidateDependentOnJasp_file();
    }

    model_internal function setterListenerRpt_cmpy(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRpt_cmpy();
    }

    model_internal function setterListenerRpt_additive(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRpt_additive();
    }

    model_internal function setterListenerRpt_active(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRpt_active();
    }

    model_internal function setterListenerRpt_freq(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRpt_freq();
    }

    model_internal function setterListenerRpt_file(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRpt_file();
    }

    model_internal function setterListenerRpt_is_closeout(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRpt_is_closeout();
    }

    model_internal function setterListenerRpt_enable(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRpt_enable();
    }

    model_internal function setterListenerRpt_desc(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRpt_desc();
    }

    model_internal function setterListenerRpt_lang(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRpt_lang();
    }

    model_internal function setterListenerRpt_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnRpt_name();
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
        if (!_model.jasp_fileIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_jasp_fileValidationFailureMessages);
        }
        if (!_model.rpt_cmpyIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_rpt_cmpyValidationFailureMessages);
        }
        if (!_model.rpt_additiveIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_rpt_additiveValidationFailureMessages);
        }
        if (!_model.rpt_activeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_rpt_activeValidationFailureMessages);
        }
        if (!_model.rpt_freqIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_rpt_freqValidationFailureMessages);
        }
        if (!_model.rpt_fileIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_rpt_fileValidationFailureMessages);
        }
        if (!_model.rpt_is_closeoutIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_rpt_is_closeoutValidationFailureMessages);
        }
        if (!_model.rpt_enableIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_rpt_enableValidationFailureMessages);
        }
        if (!_model.rpt_descIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_rpt_descValidationFailureMessages);
        }
        if (!_model.rpt_langIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_rpt_langValidationFailureMessages);
        }
        if (!_model.rpt_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_rpt_nameValidationFailureMessages);
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
    public function get _model() : _ReportsLookupEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _ReportsLookupEntityMetadata) : void
    {
        var oldValue : _ReportsLookupEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfJasp_file : Array = null;
    model_internal var _doValidationLastValOfJasp_file : String;

    model_internal function _doValidationForJasp_file(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfJasp_file != null && model_internal::_doValidationLastValOfJasp_file == value)
           return model_internal::_doValidationCacheOfJasp_file ;

        _model.model_internal::_jasp_fileIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isJasp_fileAvailable && _internal_jasp_file == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "jasp_file is required"));
        }

        model_internal::_doValidationCacheOfJasp_file = validationFailures;
        model_internal::_doValidationLastValOfJasp_file = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRpt_cmpy : Array = null;
    model_internal var _doValidationLastValOfRpt_cmpy : String;

    model_internal function _doValidationForRpt_cmpy(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRpt_cmpy != null && model_internal::_doValidationLastValOfRpt_cmpy == value)
           return model_internal::_doValidationCacheOfRpt_cmpy ;

        _model.model_internal::_rpt_cmpyIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRpt_cmpyAvailable && _internal_rpt_cmpy == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "rpt_cmpy is required"));
        }

        model_internal::_doValidationCacheOfRpt_cmpy = validationFailures;
        model_internal::_doValidationLastValOfRpt_cmpy = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRpt_additive : Array = null;
    model_internal var _doValidationLastValOfRpt_additive : String;

    model_internal function _doValidationForRpt_additive(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRpt_additive != null && model_internal::_doValidationLastValOfRpt_additive == value)
           return model_internal::_doValidationCacheOfRpt_additive ;

        _model.model_internal::_rpt_additiveIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRpt_additiveAvailable && _internal_rpt_additive == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "rpt_additive is required"));
        }

        model_internal::_doValidationCacheOfRpt_additive = validationFailures;
        model_internal::_doValidationLastValOfRpt_additive = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRpt_active : Array = null;
    model_internal var _doValidationLastValOfRpt_active : String;

    model_internal function _doValidationForRpt_active(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRpt_active != null && model_internal::_doValidationLastValOfRpt_active == value)
           return model_internal::_doValidationCacheOfRpt_active ;

        _model.model_internal::_rpt_activeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRpt_activeAvailable && _internal_rpt_active == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "rpt_active is required"));
        }

        model_internal::_doValidationCacheOfRpt_active = validationFailures;
        model_internal::_doValidationLastValOfRpt_active = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRpt_freq : Array = null;
    model_internal var _doValidationLastValOfRpt_freq : String;

    model_internal function _doValidationForRpt_freq(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRpt_freq != null && model_internal::_doValidationLastValOfRpt_freq == value)
           return model_internal::_doValidationCacheOfRpt_freq ;

        _model.model_internal::_rpt_freqIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRpt_freqAvailable && _internal_rpt_freq == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "rpt_freq is required"));
        }

        model_internal::_doValidationCacheOfRpt_freq = validationFailures;
        model_internal::_doValidationLastValOfRpt_freq = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRpt_file : Array = null;
    model_internal var _doValidationLastValOfRpt_file : String;

    model_internal function _doValidationForRpt_file(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRpt_file != null && model_internal::_doValidationLastValOfRpt_file == value)
           return model_internal::_doValidationCacheOfRpt_file ;

        _model.model_internal::_rpt_fileIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRpt_fileAvailable && _internal_rpt_file == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "rpt_file is required"));
        }

        model_internal::_doValidationCacheOfRpt_file = validationFailures;
        model_internal::_doValidationLastValOfRpt_file = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRpt_is_closeout : Array = null;
    model_internal var _doValidationLastValOfRpt_is_closeout : String;

    model_internal function _doValidationForRpt_is_closeout(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRpt_is_closeout != null && model_internal::_doValidationLastValOfRpt_is_closeout == value)
           return model_internal::_doValidationCacheOfRpt_is_closeout ;

        _model.model_internal::_rpt_is_closeoutIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRpt_is_closeoutAvailable && _internal_rpt_is_closeout == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "rpt_is_closeout is required"));
        }

        model_internal::_doValidationCacheOfRpt_is_closeout = validationFailures;
        model_internal::_doValidationLastValOfRpt_is_closeout = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRpt_enable : Array = null;
    model_internal var _doValidationLastValOfRpt_enable : String;

    model_internal function _doValidationForRpt_enable(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRpt_enable != null && model_internal::_doValidationLastValOfRpt_enable == value)
           return model_internal::_doValidationCacheOfRpt_enable ;

        _model.model_internal::_rpt_enableIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRpt_enableAvailable && _internal_rpt_enable == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "rpt_enable is required"));
        }

        model_internal::_doValidationCacheOfRpt_enable = validationFailures;
        model_internal::_doValidationLastValOfRpt_enable = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRpt_desc : Array = null;
    model_internal var _doValidationLastValOfRpt_desc : String;

    model_internal function _doValidationForRpt_desc(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRpt_desc != null && model_internal::_doValidationLastValOfRpt_desc == value)
           return model_internal::_doValidationCacheOfRpt_desc ;

        _model.model_internal::_rpt_descIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRpt_descAvailable && _internal_rpt_desc == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "rpt_desc is required"));
        }

        model_internal::_doValidationCacheOfRpt_desc = validationFailures;
        model_internal::_doValidationLastValOfRpt_desc = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRpt_lang : Array = null;
    model_internal var _doValidationLastValOfRpt_lang : String;

    model_internal function _doValidationForRpt_lang(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRpt_lang != null && model_internal::_doValidationLastValOfRpt_lang == value)
           return model_internal::_doValidationCacheOfRpt_lang ;

        _model.model_internal::_rpt_langIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRpt_langAvailable && _internal_rpt_lang == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "rpt_lang is required"));
        }

        model_internal::_doValidationCacheOfRpt_lang = validationFailures;
        model_internal::_doValidationLastValOfRpt_lang = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfRpt_name : Array = null;
    model_internal var _doValidationLastValOfRpt_name : String;

    model_internal function _doValidationForRpt_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfRpt_name != null && model_internal::_doValidationLastValOfRpt_name == value)
           return model_internal::_doValidationCacheOfRpt_name ;

        _model.model_internal::_rpt_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isRpt_nameAvailable && _internal_rpt_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "rpt_name is required"));
        }

        model_internal::_doValidationCacheOfRpt_name = validationFailures;
        model_internal::_doValidationLastValOfRpt_name = value;

        return validationFailures;
    }
    

}

}
