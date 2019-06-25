/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - GuiMeterDetails.as.
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
public class _Super_GuiMeterDetails extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("GuiMeterDetails") == null)
            {
                flash.net.registerClassAlias("GuiMeterDetails", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("GuiMeterDetails", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _GuiMeterDetailsEntityMetadata;
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
    private var _internal_trsf_cls_amb : String;
    private var _internal_baa_bay_seq : String;
    private var _internal_trsf_open_kg : String;
    private var _internal_trsf_cls_cor : String;
    private var _internal_trsf_opn_cor : String;
    private var _internal_trsf_close_kg : String;
    private var _internal_trsf_opn_amb : String;
    private var _internal_trsb_injector : String;
    private var _internal_trsb_meter : String;
    private var _internal_is_injector : String;
    private var _internal_trsftrid_trsa_id : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_GuiMeterDetails()
    {
        _model = new _GuiMeterDetailsEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsf_cls_amb", model_internal::setterListenerTrsf_cls_amb));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "baa_bay_seq", model_internal::setterListenerBaa_bay_seq));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsf_open_kg", model_internal::setterListenerTrsf_open_kg));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsf_cls_cor", model_internal::setterListenerTrsf_cls_cor));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsf_opn_cor", model_internal::setterListenerTrsf_opn_cor));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsf_close_kg", model_internal::setterListenerTrsf_close_kg));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsf_opn_amb", model_internal::setterListenerTrsf_opn_amb));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsb_injector", model_internal::setterListenerTrsb_injector));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsb_meter", model_internal::setterListenerTrsb_meter));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "is_injector", model_internal::setterListenerIs_injector));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsftrid_trsa_id", model_internal::setterListenerTrsftrid_trsa_id));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get trsf_cls_amb() : String
    {
        return _internal_trsf_cls_amb;
    }

    [Bindable(event="propertyChange")]
    public function get baa_bay_seq() : String
    {
        return _internal_baa_bay_seq;
    }

    [Bindable(event="propertyChange")]
    public function get trsf_open_kg() : String
    {
        return _internal_trsf_open_kg;
    }

    [Bindable(event="propertyChange")]
    public function get trsf_cls_cor() : String
    {
        return _internal_trsf_cls_cor;
    }

    [Bindable(event="propertyChange")]
    public function get trsf_opn_cor() : String
    {
        return _internal_trsf_opn_cor;
    }

    [Bindable(event="propertyChange")]
    public function get trsf_close_kg() : String
    {
        return _internal_trsf_close_kg;
    }

    [Bindable(event="propertyChange")]
    public function get trsf_opn_amb() : String
    {
        return _internal_trsf_opn_amb;
    }

    [Bindable(event="propertyChange")]
    public function get trsb_injector() : String
    {
        return _internal_trsb_injector;
    }

    [Bindable(event="propertyChange")]
    public function get trsb_meter() : String
    {
        return _internal_trsb_meter;
    }

    [Bindable(event="propertyChange")]
    public function get is_injector() : String
    {
        return _internal_is_injector;
    }

    [Bindable(event="propertyChange")]
    public function get trsftrid_trsa_id() : String
    {
        return _internal_trsftrid_trsa_id;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set trsf_cls_amb(value:String) : void
    {
        var oldValue:String = _internal_trsf_cls_amb;
        if (oldValue !== value)
        {
            _internal_trsf_cls_amb = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_cls_amb", oldValue, _internal_trsf_cls_amb));
        }
    }

    public function set baa_bay_seq(value:String) : void
    {
        var oldValue:String = _internal_baa_bay_seq;
        if (oldValue !== value)
        {
            _internal_baa_bay_seq = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "baa_bay_seq", oldValue, _internal_baa_bay_seq));
        }
    }

    public function set trsf_open_kg(value:String) : void
    {
        var oldValue:String = _internal_trsf_open_kg;
        if (oldValue !== value)
        {
            _internal_trsf_open_kg = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_open_kg", oldValue, _internal_trsf_open_kg));
        }
    }

    public function set trsf_cls_cor(value:String) : void
    {
        var oldValue:String = _internal_trsf_cls_cor;
        if (oldValue !== value)
        {
            _internal_trsf_cls_cor = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_cls_cor", oldValue, _internal_trsf_cls_cor));
        }
    }

    public function set trsf_opn_cor(value:String) : void
    {
        var oldValue:String = _internal_trsf_opn_cor;
        if (oldValue !== value)
        {
            _internal_trsf_opn_cor = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_opn_cor", oldValue, _internal_trsf_opn_cor));
        }
    }

    public function set trsf_close_kg(value:String) : void
    {
        var oldValue:String = _internal_trsf_close_kg;
        if (oldValue !== value)
        {
            _internal_trsf_close_kg = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_close_kg", oldValue, _internal_trsf_close_kg));
        }
    }

    public function set trsf_opn_amb(value:String) : void
    {
        var oldValue:String = _internal_trsf_opn_amb;
        if (oldValue !== value)
        {
            _internal_trsf_opn_amb = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_opn_amb", oldValue, _internal_trsf_opn_amb));
        }
    }

    public function set trsb_injector(value:String) : void
    {
        var oldValue:String = _internal_trsb_injector;
        if (oldValue !== value)
        {
            _internal_trsb_injector = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsb_injector", oldValue, _internal_trsb_injector));
        }
    }

    public function set trsb_meter(value:String) : void
    {
        var oldValue:String = _internal_trsb_meter;
        if (oldValue !== value)
        {
            _internal_trsb_meter = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsb_meter", oldValue, _internal_trsb_meter));
        }
    }

    public function set is_injector(value:String) : void
    {
        var oldValue:String = _internal_is_injector;
        if (oldValue !== value)
        {
            _internal_is_injector = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "is_injector", oldValue, _internal_is_injector));
        }
    }

    public function set trsftrid_trsa_id(value:String) : void
    {
        var oldValue:String = _internal_trsftrid_trsa_id;
        if (oldValue !== value)
        {
            _internal_trsftrid_trsa_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsftrid_trsa_id", oldValue, _internal_trsftrid_trsa_id));
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

    model_internal function setterListenerTrsf_cls_amb(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsf_cls_amb();
    }

    model_internal function setterListenerBaa_bay_seq(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBaa_bay_seq();
    }

    model_internal function setterListenerTrsf_open_kg(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsf_open_kg();
    }

    model_internal function setterListenerTrsf_cls_cor(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsf_cls_cor();
    }

    model_internal function setterListenerTrsf_opn_cor(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsf_opn_cor();
    }

    model_internal function setterListenerTrsf_close_kg(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsf_close_kg();
    }

    model_internal function setterListenerTrsf_opn_amb(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsf_opn_amb();
    }

    model_internal function setterListenerTrsb_injector(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsb_injector();
    }

    model_internal function setterListenerTrsb_meter(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsb_meter();
    }

    model_internal function setterListenerIs_injector(value:flash.events.Event):void
    {
        _model.invalidateDependentOnIs_injector();
    }

    model_internal function setterListenerTrsftrid_trsa_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsftrid_trsa_id();
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
        if (!_model.trsf_cls_ambIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsf_cls_ambValidationFailureMessages);
        }
        if (!_model.baa_bay_seqIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_baa_bay_seqValidationFailureMessages);
        }
        if (!_model.trsf_open_kgIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsf_open_kgValidationFailureMessages);
        }
        if (!_model.trsf_cls_corIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsf_cls_corValidationFailureMessages);
        }
        if (!_model.trsf_opn_corIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsf_opn_corValidationFailureMessages);
        }
        if (!_model.trsf_close_kgIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsf_close_kgValidationFailureMessages);
        }
        if (!_model.trsf_opn_ambIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsf_opn_ambValidationFailureMessages);
        }
        if (!_model.trsb_injectorIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsb_injectorValidationFailureMessages);
        }
        if (!_model.trsb_meterIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsb_meterValidationFailureMessages);
        }
        if (!_model.is_injectorIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_is_injectorValidationFailureMessages);
        }
        if (!_model.trsftrid_trsa_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsftrid_trsa_idValidationFailureMessages);
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
    public function get _model() : _GuiMeterDetailsEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _GuiMeterDetailsEntityMetadata) : void
    {
        var oldValue : _GuiMeterDetailsEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfTrsf_cls_amb : Array = null;
    model_internal var _doValidationLastValOfTrsf_cls_amb : String;

    model_internal function _doValidationForTrsf_cls_amb(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsf_cls_amb != null && model_internal::_doValidationLastValOfTrsf_cls_amb == value)
           return model_internal::_doValidationCacheOfTrsf_cls_amb ;

        _model.model_internal::_trsf_cls_ambIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsf_cls_ambAvailable && _internal_trsf_cls_amb == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsf_cls_amb is required"));
        }

        model_internal::_doValidationCacheOfTrsf_cls_amb = validationFailures;
        model_internal::_doValidationLastValOfTrsf_cls_amb = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBaa_bay_seq : Array = null;
    model_internal var _doValidationLastValOfBaa_bay_seq : String;

    model_internal function _doValidationForBaa_bay_seq(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBaa_bay_seq != null && model_internal::_doValidationLastValOfBaa_bay_seq == value)
           return model_internal::_doValidationCacheOfBaa_bay_seq ;

        _model.model_internal::_baa_bay_seqIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBaa_bay_seqAvailable && _internal_baa_bay_seq == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "baa_bay_seq is required"));
        }

        model_internal::_doValidationCacheOfBaa_bay_seq = validationFailures;
        model_internal::_doValidationLastValOfBaa_bay_seq = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsf_open_kg : Array = null;
    model_internal var _doValidationLastValOfTrsf_open_kg : String;

    model_internal function _doValidationForTrsf_open_kg(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsf_open_kg != null && model_internal::_doValidationLastValOfTrsf_open_kg == value)
           return model_internal::_doValidationCacheOfTrsf_open_kg ;

        _model.model_internal::_trsf_open_kgIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsf_open_kgAvailable && _internal_trsf_open_kg == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsf_open_kg is required"));
        }

        model_internal::_doValidationCacheOfTrsf_open_kg = validationFailures;
        model_internal::_doValidationLastValOfTrsf_open_kg = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsf_cls_cor : Array = null;
    model_internal var _doValidationLastValOfTrsf_cls_cor : String;

    model_internal function _doValidationForTrsf_cls_cor(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsf_cls_cor != null && model_internal::_doValidationLastValOfTrsf_cls_cor == value)
           return model_internal::_doValidationCacheOfTrsf_cls_cor ;

        _model.model_internal::_trsf_cls_corIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsf_cls_corAvailable && _internal_trsf_cls_cor == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsf_cls_cor is required"));
        }

        model_internal::_doValidationCacheOfTrsf_cls_cor = validationFailures;
        model_internal::_doValidationLastValOfTrsf_cls_cor = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsf_opn_cor : Array = null;
    model_internal var _doValidationLastValOfTrsf_opn_cor : String;

    model_internal function _doValidationForTrsf_opn_cor(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsf_opn_cor != null && model_internal::_doValidationLastValOfTrsf_opn_cor == value)
           return model_internal::_doValidationCacheOfTrsf_opn_cor ;

        _model.model_internal::_trsf_opn_corIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsf_opn_corAvailable && _internal_trsf_opn_cor == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsf_opn_cor is required"));
        }

        model_internal::_doValidationCacheOfTrsf_opn_cor = validationFailures;
        model_internal::_doValidationLastValOfTrsf_opn_cor = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsf_close_kg : Array = null;
    model_internal var _doValidationLastValOfTrsf_close_kg : String;

    model_internal function _doValidationForTrsf_close_kg(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsf_close_kg != null && model_internal::_doValidationLastValOfTrsf_close_kg == value)
           return model_internal::_doValidationCacheOfTrsf_close_kg ;

        _model.model_internal::_trsf_close_kgIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsf_close_kgAvailable && _internal_trsf_close_kg == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsf_close_kg is required"));
        }

        model_internal::_doValidationCacheOfTrsf_close_kg = validationFailures;
        model_internal::_doValidationLastValOfTrsf_close_kg = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsf_opn_amb : Array = null;
    model_internal var _doValidationLastValOfTrsf_opn_amb : String;

    model_internal function _doValidationForTrsf_opn_amb(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsf_opn_amb != null && model_internal::_doValidationLastValOfTrsf_opn_amb == value)
           return model_internal::_doValidationCacheOfTrsf_opn_amb ;

        _model.model_internal::_trsf_opn_ambIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsf_opn_ambAvailable && _internal_trsf_opn_amb == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsf_opn_amb is required"));
        }

        model_internal::_doValidationCacheOfTrsf_opn_amb = validationFailures;
        model_internal::_doValidationLastValOfTrsf_opn_amb = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsb_injector : Array = null;
    model_internal var _doValidationLastValOfTrsb_injector : String;

    model_internal function _doValidationForTrsb_injector(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsb_injector != null && model_internal::_doValidationLastValOfTrsb_injector == value)
           return model_internal::_doValidationCacheOfTrsb_injector ;

        _model.model_internal::_trsb_injectorIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsb_injectorAvailable && _internal_trsb_injector == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsb_injector is required"));
        }

        model_internal::_doValidationCacheOfTrsb_injector = validationFailures;
        model_internal::_doValidationLastValOfTrsb_injector = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsb_meter : Array = null;
    model_internal var _doValidationLastValOfTrsb_meter : String;

    model_internal function _doValidationForTrsb_meter(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsb_meter != null && model_internal::_doValidationLastValOfTrsb_meter == value)
           return model_internal::_doValidationCacheOfTrsb_meter ;

        _model.model_internal::_trsb_meterIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsb_meterAvailable && _internal_trsb_meter == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsb_meter is required"));
        }

        model_internal::_doValidationCacheOfTrsb_meter = validationFailures;
        model_internal::_doValidationLastValOfTrsb_meter = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfIs_injector : Array = null;
    model_internal var _doValidationLastValOfIs_injector : String;

    model_internal function _doValidationForIs_injector(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfIs_injector != null && model_internal::_doValidationLastValOfIs_injector == value)
           return model_internal::_doValidationCacheOfIs_injector ;

        _model.model_internal::_is_injectorIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isIs_injectorAvailable && _internal_is_injector == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "is_injector is required"));
        }

        model_internal::_doValidationCacheOfIs_injector = validationFailures;
        model_internal::_doValidationLastValOfIs_injector = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsftrid_trsa_id : Array = null;
    model_internal var _doValidationLastValOfTrsftrid_trsa_id : String;

    model_internal function _doValidationForTrsftrid_trsa_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsftrid_trsa_id != null && model_internal::_doValidationLastValOfTrsftrid_trsa_id == value)
           return model_internal::_doValidationCacheOfTrsftrid_trsa_id ;

        _model.model_internal::_trsftrid_trsa_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsftrid_trsa_idAvailable && _internal_trsftrid_trsa_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsftrid_trsa_id is required"));
        }

        model_internal::_doValidationCacheOfTrsftrid_trsa_id = validationFailures;
        model_internal::_doValidationLastValOfTrsftrid_trsa_id = value;

        return validationFailures;
    }
    

}

}
