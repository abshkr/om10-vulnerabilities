/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - GuiTransactionDetails.as.
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
public class _Super_GuiTransactionDetails extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("GuiTransactionDetails") == null)
            {
                flash.net.registerClassAlias("GuiTransactionDetails", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("GuiTransactionDetails", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _GuiTransactionDetailsEntityMetadata;
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
    private var _internal_trsfprod_prodcode : String;
    private var _internal_trsf_qty_amb : String;
    private var _internal_trsf_temp : String;
    private var _internal_trsf_qty_cor : String;
    private var _internal_eqpt_code : String;
    private var _internal_trsf_trailercomp : String;
    private var _internal_trsf_baa_code : String;
    private var _internal_baa_bay_seq : String;
    private var _internal_trsf_load_kg : String;
    private var _internal_trsf_id : String;
    private var _internal_trsf_qty_kg : Object;
    private var _internal_trsf_density : String;
    private var _internal_trsftrid_trsa_id : String;
    private var _internal_prod_name : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_GuiTransactionDetails()
    {
        _model = new _GuiTransactionDetailsEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsfprod_prodcode", model_internal::setterListenerTrsfprod_prodcode));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsf_qty_amb", model_internal::setterListenerTrsf_qty_amb));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsf_temp", model_internal::setterListenerTrsf_temp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsf_qty_cor", model_internal::setterListenerTrsf_qty_cor));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "eqpt_code", model_internal::setterListenerEqpt_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsf_trailercomp", model_internal::setterListenerTrsf_trailercomp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsf_baa_code", model_internal::setterListenerTrsf_baa_code));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "baa_bay_seq", model_internal::setterListenerBaa_bay_seq));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsf_load_kg", model_internal::setterListenerTrsf_load_kg));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsf_id", model_internal::setterListenerTrsf_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsf_qty_kg", model_internal::setterListenerTrsf_qty_kg));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsf_density", model_internal::setterListenerTrsf_density));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "trsftrid_trsa_id", model_internal::setterListenerTrsftrid_trsa_id));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "prod_name", model_internal::setterListenerProd_name));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get trsfprod_prodcode() : String
    {
        return _internal_trsfprod_prodcode;
    }

    [Bindable(event="propertyChange")]
    public function get trsf_qty_amb() : String
    {
        return _internal_trsf_qty_amb;
    }

    [Bindable(event="propertyChange")]
    public function get trsf_temp() : String
    {
        return _internal_trsf_temp;
    }

    [Bindable(event="propertyChange")]
    public function get trsf_qty_cor() : String
    {
        return _internal_trsf_qty_cor;
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_code() : String
    {
        return _internal_eqpt_code;
    }

    [Bindable(event="propertyChange")]
    public function get trsf_trailercomp() : String
    {
        return _internal_trsf_trailercomp;
    }

    [Bindable(event="propertyChange")]
    public function get trsf_baa_code() : String
    {
        return _internal_trsf_baa_code;
    }

    [Bindable(event="propertyChange")]
    public function get baa_bay_seq() : String
    {
        return _internal_baa_bay_seq;
    }

    [Bindable(event="propertyChange")]
    public function get trsf_load_kg() : String
    {
        return _internal_trsf_load_kg;
    }

    [Bindable(event="propertyChange")]
    public function get trsf_id() : String
    {
        return _internal_trsf_id;
    }

    [Bindable(event="propertyChange")]
    public function get trsf_qty_kg() : Object
    {
        return _internal_trsf_qty_kg;
    }

    [Bindable(event="propertyChange")]
    public function get trsf_density() : String
    {
        return _internal_trsf_density;
    }

    [Bindable(event="propertyChange")]
    public function get trsftrid_trsa_id() : String
    {
        return _internal_trsftrid_trsa_id;
    }

    [Bindable(event="propertyChange")]
    public function get prod_name() : String
    {
        return _internal_prod_name;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set trsfprod_prodcode(value:String) : void
    {
        var oldValue:String = _internal_trsfprod_prodcode;
        if (oldValue !== value)
        {
            _internal_trsfprod_prodcode = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsfprod_prodcode", oldValue, _internal_trsfprod_prodcode));
        }
    }

    public function set trsf_qty_amb(value:String) : void
    {
        var oldValue:String = _internal_trsf_qty_amb;
        if (oldValue !== value)
        {
            _internal_trsf_qty_amb = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_qty_amb", oldValue, _internal_trsf_qty_amb));
        }
    }

    public function set trsf_temp(value:String) : void
    {
        var oldValue:String = _internal_trsf_temp;
        if (oldValue !== value)
        {
            _internal_trsf_temp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_temp", oldValue, _internal_trsf_temp));
        }
    }

    public function set trsf_qty_cor(value:String) : void
    {
        var oldValue:String = _internal_trsf_qty_cor;
        if (oldValue !== value)
        {
            _internal_trsf_qty_cor = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_qty_cor", oldValue, _internal_trsf_qty_cor));
        }
    }

    public function set eqpt_code(value:String) : void
    {
        var oldValue:String = _internal_eqpt_code;
        if (oldValue !== value)
        {
            _internal_eqpt_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_code", oldValue, _internal_eqpt_code));
        }
    }

    public function set trsf_trailercomp(value:String) : void
    {
        var oldValue:String = _internal_trsf_trailercomp;
        if (oldValue !== value)
        {
            _internal_trsf_trailercomp = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_trailercomp", oldValue, _internal_trsf_trailercomp));
        }
    }

    public function set trsf_baa_code(value:String) : void
    {
        var oldValue:String = _internal_trsf_baa_code;
        if (oldValue !== value)
        {
            _internal_trsf_baa_code = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_baa_code", oldValue, _internal_trsf_baa_code));
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

    public function set trsf_load_kg(value:String) : void
    {
        var oldValue:String = _internal_trsf_load_kg;
        if (oldValue !== value)
        {
            _internal_trsf_load_kg = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_load_kg", oldValue, _internal_trsf_load_kg));
        }
    }

    public function set trsf_id(value:String) : void
    {
        var oldValue:String = _internal_trsf_id;
        if (oldValue !== value)
        {
            _internal_trsf_id = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_id", oldValue, _internal_trsf_id));
        }
    }

    public function set trsf_qty_kg(value:Object) : void
    {
        var oldValue:Object = _internal_trsf_qty_kg;
        if (oldValue !== value)
        {
            _internal_trsf_qty_kg = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_qty_kg", oldValue, _internal_trsf_qty_kg));
        }
    }

    public function set trsf_density(value:String) : void
    {
        var oldValue:String = _internal_trsf_density;
        if (oldValue !== value)
        {
            _internal_trsf_density = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_density", oldValue, _internal_trsf_density));
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

    public function set prod_name(value:String) : void
    {
        var oldValue:String = _internal_prod_name;
        if (oldValue !== value)
        {
            _internal_prod_name = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_name", oldValue, _internal_prod_name));
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

    model_internal function setterListenerTrsfprod_prodcode(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsfprod_prodcode();
    }

    model_internal function setterListenerTrsf_qty_amb(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsf_qty_amb();
    }

    model_internal function setterListenerTrsf_temp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsf_temp();
    }

    model_internal function setterListenerTrsf_qty_cor(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsf_qty_cor();
    }

    model_internal function setterListenerEqpt_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEqpt_code();
    }

    model_internal function setterListenerTrsf_trailercomp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsf_trailercomp();
    }

    model_internal function setterListenerTrsf_baa_code(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsf_baa_code();
    }

    model_internal function setterListenerBaa_bay_seq(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBaa_bay_seq();
    }

    model_internal function setterListenerTrsf_load_kg(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsf_load_kg();
    }

    model_internal function setterListenerTrsf_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsf_id();
    }

    model_internal function setterListenerTrsf_qty_kg(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsf_qty_kg();
    }

    model_internal function setterListenerTrsf_density(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsf_density();
    }

    model_internal function setterListenerTrsftrid_trsa_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnTrsftrid_trsa_id();
    }

    model_internal function setterListenerProd_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnProd_name();
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
        if (!_model.trsfprod_prodcodeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsfprod_prodcodeValidationFailureMessages);
        }
        if (!_model.trsf_qty_ambIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsf_qty_ambValidationFailureMessages);
        }
        if (!_model.trsf_tempIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsf_tempValidationFailureMessages);
        }
        if (!_model.trsf_qty_corIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsf_qty_corValidationFailureMessages);
        }
        if (!_model.eqpt_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_eqpt_codeValidationFailureMessages);
        }
        if (!_model.trsf_trailercompIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsf_trailercompValidationFailureMessages);
        }
        if (!_model.trsf_baa_codeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsf_baa_codeValidationFailureMessages);
        }
        if (!_model.baa_bay_seqIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_baa_bay_seqValidationFailureMessages);
        }
        if (!_model.trsf_load_kgIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsf_load_kgValidationFailureMessages);
        }
        if (!_model.trsf_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsf_idValidationFailureMessages);
        }
        if (!_model.trsf_qty_kgIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsf_qty_kgValidationFailureMessages);
        }
        if (!_model.trsf_densityIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsf_densityValidationFailureMessages);
        }
        if (!_model.trsftrid_trsa_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_trsftrid_trsa_idValidationFailureMessages);
        }
        if (!_model.prod_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_prod_nameValidationFailureMessages);
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
    public function get _model() : _GuiTransactionDetailsEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _GuiTransactionDetailsEntityMetadata) : void
    {
        var oldValue : _GuiTransactionDetailsEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfTrsfprod_prodcode : Array = null;
    model_internal var _doValidationLastValOfTrsfprod_prodcode : String;

    model_internal function _doValidationForTrsfprod_prodcode(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsfprod_prodcode != null && model_internal::_doValidationLastValOfTrsfprod_prodcode == value)
           return model_internal::_doValidationCacheOfTrsfprod_prodcode ;

        _model.model_internal::_trsfprod_prodcodeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsfprod_prodcodeAvailable && _internal_trsfprod_prodcode == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsfprod_prodcode is required"));
        }

        model_internal::_doValidationCacheOfTrsfprod_prodcode = validationFailures;
        model_internal::_doValidationLastValOfTrsfprod_prodcode = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsf_qty_amb : Array = null;
    model_internal var _doValidationLastValOfTrsf_qty_amb : String;

    model_internal function _doValidationForTrsf_qty_amb(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsf_qty_amb != null && model_internal::_doValidationLastValOfTrsf_qty_amb == value)
           return model_internal::_doValidationCacheOfTrsf_qty_amb ;

        _model.model_internal::_trsf_qty_ambIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsf_qty_ambAvailable && _internal_trsf_qty_amb == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsf_qty_amb is required"));
        }

        model_internal::_doValidationCacheOfTrsf_qty_amb = validationFailures;
        model_internal::_doValidationLastValOfTrsf_qty_amb = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsf_temp : Array = null;
    model_internal var _doValidationLastValOfTrsf_temp : String;

    model_internal function _doValidationForTrsf_temp(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsf_temp != null && model_internal::_doValidationLastValOfTrsf_temp == value)
           return model_internal::_doValidationCacheOfTrsf_temp ;

        _model.model_internal::_trsf_tempIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsf_tempAvailable && _internal_trsf_temp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsf_temp is required"));
        }

        model_internal::_doValidationCacheOfTrsf_temp = validationFailures;
        model_internal::_doValidationLastValOfTrsf_temp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsf_qty_cor : Array = null;
    model_internal var _doValidationLastValOfTrsf_qty_cor : String;

    model_internal function _doValidationForTrsf_qty_cor(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsf_qty_cor != null && model_internal::_doValidationLastValOfTrsf_qty_cor == value)
           return model_internal::_doValidationCacheOfTrsf_qty_cor ;

        _model.model_internal::_trsf_qty_corIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsf_qty_corAvailable && _internal_trsf_qty_cor == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsf_qty_cor is required"));
        }

        model_internal::_doValidationCacheOfTrsf_qty_cor = validationFailures;
        model_internal::_doValidationLastValOfTrsf_qty_cor = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEqpt_code : Array = null;
    model_internal var _doValidationLastValOfEqpt_code : String;

    model_internal function _doValidationForEqpt_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEqpt_code != null && model_internal::_doValidationLastValOfEqpt_code == value)
           return model_internal::_doValidationCacheOfEqpt_code ;

        _model.model_internal::_eqpt_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEqpt_codeAvailable && _internal_eqpt_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "eqpt_code is required"));
        }

        model_internal::_doValidationCacheOfEqpt_code = validationFailures;
        model_internal::_doValidationLastValOfEqpt_code = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsf_trailercomp : Array = null;
    model_internal var _doValidationLastValOfTrsf_trailercomp : String;

    model_internal function _doValidationForTrsf_trailercomp(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsf_trailercomp != null && model_internal::_doValidationLastValOfTrsf_trailercomp == value)
           return model_internal::_doValidationCacheOfTrsf_trailercomp ;

        _model.model_internal::_trsf_trailercompIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsf_trailercompAvailable && _internal_trsf_trailercomp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsf_trailercomp is required"));
        }

        model_internal::_doValidationCacheOfTrsf_trailercomp = validationFailures;
        model_internal::_doValidationLastValOfTrsf_trailercomp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsf_baa_code : Array = null;
    model_internal var _doValidationLastValOfTrsf_baa_code : String;

    model_internal function _doValidationForTrsf_baa_code(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsf_baa_code != null && model_internal::_doValidationLastValOfTrsf_baa_code == value)
           return model_internal::_doValidationCacheOfTrsf_baa_code ;

        _model.model_internal::_trsf_baa_codeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsf_baa_codeAvailable && _internal_trsf_baa_code == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsf_baa_code is required"));
        }

        model_internal::_doValidationCacheOfTrsf_baa_code = validationFailures;
        model_internal::_doValidationLastValOfTrsf_baa_code = value;

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
    
    model_internal var _doValidationCacheOfTrsf_load_kg : Array = null;
    model_internal var _doValidationLastValOfTrsf_load_kg : String;

    model_internal function _doValidationForTrsf_load_kg(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsf_load_kg != null && model_internal::_doValidationLastValOfTrsf_load_kg == value)
           return model_internal::_doValidationCacheOfTrsf_load_kg ;

        _model.model_internal::_trsf_load_kgIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsf_load_kgAvailable && _internal_trsf_load_kg == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsf_load_kg is required"));
        }

        model_internal::_doValidationCacheOfTrsf_load_kg = validationFailures;
        model_internal::_doValidationLastValOfTrsf_load_kg = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsf_id : Array = null;
    model_internal var _doValidationLastValOfTrsf_id : String;

    model_internal function _doValidationForTrsf_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsf_id != null && model_internal::_doValidationLastValOfTrsf_id == value)
           return model_internal::_doValidationCacheOfTrsf_id ;

        _model.model_internal::_trsf_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsf_idAvailable && _internal_trsf_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsf_id is required"));
        }

        model_internal::_doValidationCacheOfTrsf_id = validationFailures;
        model_internal::_doValidationLastValOfTrsf_id = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsf_qty_kg : Array = null;
    model_internal var _doValidationLastValOfTrsf_qty_kg : Object;

    model_internal function _doValidationForTrsf_qty_kg(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfTrsf_qty_kg != null && model_internal::_doValidationLastValOfTrsf_qty_kg == value)
           return model_internal::_doValidationCacheOfTrsf_qty_kg ;

        _model.model_internal::_trsf_qty_kgIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsf_qty_kgAvailable && _internal_trsf_qty_kg == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsf_qty_kg is required"));
        }

        model_internal::_doValidationCacheOfTrsf_qty_kg = validationFailures;
        model_internal::_doValidationLastValOfTrsf_qty_kg = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfTrsf_density : Array = null;
    model_internal var _doValidationLastValOfTrsf_density : String;

    model_internal function _doValidationForTrsf_density(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfTrsf_density != null && model_internal::_doValidationLastValOfTrsf_density == value)
           return model_internal::_doValidationCacheOfTrsf_density ;

        _model.model_internal::_trsf_densityIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isTrsf_densityAvailable && _internal_trsf_density == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "trsf_density is required"));
        }

        model_internal::_doValidationCacheOfTrsf_density = validationFailures;
        model_internal::_doValidationLastValOfTrsf_density = value;

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
    
    model_internal var _doValidationCacheOfProd_name : Array = null;
    model_internal var _doValidationLastValOfProd_name : String;

    model_internal function _doValidationForProd_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfProd_name != null && model_internal::_doValidationLastValOfProd_name == value)
           return model_internal::_doValidationCacheOfProd_name ;

        _model.model_internal::_prod_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isProd_nameAvailable && _internal_prod_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "prod_name is required"));
        }

        model_internal::_doValidationCacheOfProd_name = validationFailures;
        model_internal::_doValidationLastValOfProd_name = value;

        return validationFailures;
    }
    

}

}
