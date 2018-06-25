/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - Base_Prods.as.
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

[Managed]
[ExcludeClass]
public class _Super_Base_Prods extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("Base_Prods") == null)
            {
                flash.net.registerClassAlias("Base_Prods", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("Base_Prods", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _Base_ProdsEntityMetadata;
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
    private var _internal_base_pub_dens_std : Object;
    private var _internal_bclass_desc : Object;
    private var _internal_last_upd_time : String;
    private var _internal_base_cat : String;
    private var _internal_bclass_dens_hi : Object;
    private var _internal_base_pub_temp : Object;
    private var _internal_base_real_vcf : Object;
    private var _internal_base_code : String;
    private var _internal_bclass_vcf_alg : Object;
    private var _internal_base_compensate_priority : Object;
    private var _internal_base_compensate_mode : Object;
    private var _internal_base_real_dens : Object;
    private var _internal_pgr_description : Object;
    private var _internal_pgr_unit : Object;
    private var _internal_base_pub_vcf : Object;
    private var _internal_base_prod_group : String;
    private var _internal_base_real_dens_std : Object;
    private var _internal_base_rpt_temp : Object;
    private var _internal_base_pub_dens : Object;
    private var _internal_base_real_temp : Object;
    private var _internal_base_name : String;
    private var _internal_base_rpt_tunt : Object;
    private var _internal_bclass_dens_lo : Object;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_Base_Prods()
    {
        _model = new _Base_ProdsEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "base_pub_dens_std", model_internal::setterListenerBase_pub_dens_std));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "bclass_desc", model_internal::setterListenerBclass_desc));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "last_upd_time", model_internal::setterListenerLast_upd_time));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "base_cat", model_internal::setterListenerBase_cat));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "bclass_dens_hi", model_internal::setterListenerBclass_dens_hi));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "base_pub_temp", model_internal::setterListenerBase_pub_temp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "base_real_vcf", model_internal::setterListenerBase_real_vcf));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "bclass_vcf_alg", model_internal::setterListenerBclass_vcf_alg));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "base_compensate_priority", model_internal::setterListenerBase_compensate_priority));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "base_compensate_mode", model_internal::setterListenerBase_compensate_mode));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "base_real_dens", model_internal::setterListenerBase_real_dens));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "pgr_description", model_internal::setterListenerPgr_description));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "pgr_unit", model_internal::setterListenerPgr_unit));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "base_pub_vcf", model_internal::setterListenerBase_pub_vcf));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "base_prod_group", model_internal::setterListenerBase_prod_group));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "base_real_dens_std", model_internal::setterListenerBase_real_dens_std));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "base_rpt_temp", model_internal::setterListenerBase_rpt_temp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "base_pub_dens", model_internal::setterListenerBase_pub_dens));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "base_real_temp", model_internal::setterListenerBase_real_temp));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "base_name", model_internal::setterListenerBase_name));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "base_rpt_tunt", model_internal::setterListenerBase_rpt_tunt));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "bclass_dens_lo", model_internal::setterListenerBclass_dens_lo));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get base_pub_dens_std() : Object
    {
        return _internal_base_pub_dens_std;
    }

    [Bindable(event="propertyChange")]
    public function get bclass_desc() : Object
    {
        return _internal_bclass_desc;
    }

    [Bindable(event="propertyChange")]
    public function get last_upd_time() : String
    {
        return _internal_last_upd_time;
    }

    [Bindable(event="propertyChange")]
    public function get base_cat() : String
    {
        return _internal_base_cat;
    }

    [Bindable(event="propertyChange")]
    public function get bclass_dens_hi() : Object
    {
        return _internal_bclass_dens_hi;
    }

    [Bindable(event="propertyChange")]
    public function get base_pub_temp() : Object
    {
        return _internal_base_pub_temp;
    }

    [Bindable(event="propertyChange")]
    public function get base_real_vcf() : Object
    {
        return _internal_base_real_vcf;
    }

    [Bindable(event="propertyChange")]
    public function get base_code() : String
    {
        return _internal_base_code;
    }

    [Bindable(event="propertyChange")]
    public function get bclass_vcf_alg() : Object
    {
        return _internal_bclass_vcf_alg;
    }

    [Bindable(event="propertyChange")]
    public function get base_compensate_priority() : Object
    {
        return _internal_base_compensate_priority;
    }

    [Bindable(event="propertyChange")]
    public function get base_compensate_mode() : Object
    {
        return _internal_base_compensate_mode;
    }

    [Bindable(event="propertyChange")]
    public function get base_real_dens() : Object
    {
        return _internal_base_real_dens;
    }

    [Bindable(event="propertyChange")]
    public function get pgr_description() : Object
    {
        return _internal_pgr_description;
    }

    [Bindable(event="propertyChange")]
    public function get pgr_unit() : Object
    {
        return _internal_pgr_unit;
    }

    [Bindable(event="propertyChange")]
    public function get base_pub_vcf() : Object
    {
        return _internal_base_pub_vcf;
    }

    [Bindable(event="propertyChange")]
    public function get base_prod_group() : String
    {
        return _internal_base_prod_group;
    }

    [Bindable(event="propertyChange")]
    public function get base_real_dens_std() : Object
    {
        return _internal_base_real_dens_std;
    }

    [Bindable(event="propertyChange")]
    public function get base_rpt_temp() : Object
    {
        return _internal_base_rpt_temp;
    }

    [Bindable(event="propertyChange")]
    public function get base_pub_dens() : Object
    {
        return _internal_base_pub_dens;
    }

    [Bindable(event="propertyChange")]
    public function get base_real_temp() : Object
    {
        return _internal_base_real_temp;
    }

    [Bindable(event="propertyChange")]
    public function get base_name() : String
    {
        return _internal_base_name;
    }

    [Bindable(event="propertyChange")]
    public function get base_rpt_tunt() : Object
    {
        return _internal_base_rpt_tunt;
    }

    [Bindable(event="propertyChange")]
    public function get bclass_dens_lo() : Object
    {
        return _internal_bclass_dens_lo;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set base_pub_dens_std(value:Object) : void
    {
        var oldValue:Object = _internal_base_pub_dens_std;
        if (oldValue !== value)
        {
            _internal_base_pub_dens_std = value;
        }
    }

    public function set bclass_desc(value:Object) : void
    {
        var oldValue:Object = _internal_bclass_desc;
        if (oldValue !== value)
        {
            _internal_bclass_desc = value;
        }
    }

    public function set last_upd_time(value:String) : void
    {
        var oldValue:String = _internal_last_upd_time;
        if (oldValue !== value)
        {
            _internal_last_upd_time = value;
        }
    }

    public function set base_cat(value:String) : void
    {
        var oldValue:String = _internal_base_cat;
        if (oldValue !== value)
        {
            _internal_base_cat = value;
        }
    }

    public function set bclass_dens_hi(value:Object) : void
    {
        var oldValue:Object = _internal_bclass_dens_hi;
        if (oldValue !== value)
        {
            _internal_bclass_dens_hi = value;
        }
    }

    public function set base_pub_temp(value:Object) : void
    {
        var oldValue:Object = _internal_base_pub_temp;
        if (oldValue !== value)
        {
            _internal_base_pub_temp = value;
        }
    }

    public function set base_real_vcf(value:Object) : void
    {
        var oldValue:Object = _internal_base_real_vcf;
        if (oldValue !== value)
        {
            _internal_base_real_vcf = value;
        }
    }

    public function set base_code(value:String) : void
    {
        var oldValue:String = _internal_base_code;
        if (oldValue !== value)
        {
            _internal_base_code = value;
        }
    }

    public function set bclass_vcf_alg(value:Object) : void
    {
        var oldValue:Object = _internal_bclass_vcf_alg;
        if (oldValue !== value)
        {
            _internal_bclass_vcf_alg = value;
        }
    }

    public function set base_compensate_priority(value:Object) : void
    {
        var oldValue:Object = _internal_base_compensate_priority;
        if (oldValue !== value)
        {
            _internal_base_compensate_priority = value;
        }
    }

    public function set base_compensate_mode(value:Object) : void
    {
        var oldValue:Object = _internal_base_compensate_mode;
        if (oldValue !== value)
        {
            _internal_base_compensate_mode = value;
        }
    }

    public function set base_real_dens(value:Object) : void
    {
        var oldValue:Object = _internal_base_real_dens;
        if (oldValue !== value)
        {
            _internal_base_real_dens = value;
        }
    }

    public function set pgr_description(value:Object) : void
    {
        var oldValue:Object = _internal_pgr_description;
        if (oldValue !== value)
        {
            _internal_pgr_description = value;
        }
    }

    public function set pgr_unit(value:Object) : void
    {
        var oldValue:Object = _internal_pgr_unit;
        if (oldValue !== value)
        {
            _internal_pgr_unit = value;
        }
    }

    public function set base_pub_vcf(value:Object) : void
    {
        var oldValue:Object = _internal_base_pub_vcf;
        if (oldValue !== value)
        {
            _internal_base_pub_vcf = value;
        }
    }

    public function set base_prod_group(value:String) : void
    {
        var oldValue:String = _internal_base_prod_group;
        if (oldValue !== value)
        {
            _internal_base_prod_group = value;
        }
    }

    public function set base_real_dens_std(value:Object) : void
    {
        var oldValue:Object = _internal_base_real_dens_std;
        if (oldValue !== value)
        {
            _internal_base_real_dens_std = value;
        }
    }

    public function set base_rpt_temp(value:Object) : void
    {
        var oldValue:Object = _internal_base_rpt_temp;
        if (oldValue !== value)
        {
            _internal_base_rpt_temp = value;
        }
    }

    public function set base_pub_dens(value:Object) : void
    {
        var oldValue:Object = _internal_base_pub_dens;
        if (oldValue !== value)
        {
            _internal_base_pub_dens = value;
        }
    }

    public function set base_real_temp(value:Object) : void
    {
        var oldValue:Object = _internal_base_real_temp;
        if (oldValue !== value)
        {
            _internal_base_real_temp = value;
        }
    }

    public function set base_name(value:String) : void
    {
        var oldValue:String = _internal_base_name;
        if (oldValue !== value)
        {
            _internal_base_name = value;
        }
    }

    public function set base_rpt_tunt(value:Object) : void
    {
        var oldValue:Object = _internal_base_rpt_tunt;
        if (oldValue !== value)
        {
            _internal_base_rpt_tunt = value;
        }
    }

    public function set bclass_dens_lo(value:Object) : void
    {
        var oldValue:Object = _internal_bclass_dens_lo;
        if (oldValue !== value)
        {
            _internal_bclass_dens_lo = value;
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

    model_internal function setterListenerBase_pub_dens_std(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBase_pub_dens_std();
    }

    model_internal function setterListenerBclass_desc(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBclass_desc();
    }

    model_internal function setterListenerLast_upd_time(value:flash.events.Event):void
    {
        _model.invalidateDependentOnLast_upd_time();
    }

    model_internal function setterListenerBase_cat(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBase_cat();
    }

    model_internal function setterListenerBclass_dens_hi(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBclass_dens_hi();
    }

    model_internal function setterListenerBase_pub_temp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBase_pub_temp();
    }

    model_internal function setterListenerBase_real_vcf(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBase_real_vcf();
    }

    model_internal function setterListenerBclass_vcf_alg(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBclass_vcf_alg();
    }

    model_internal function setterListenerBase_compensate_priority(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBase_compensate_priority();
    }

    model_internal function setterListenerBase_compensate_mode(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBase_compensate_mode();
    }

    model_internal function setterListenerBase_real_dens(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBase_real_dens();
    }

    model_internal function setterListenerPgr_description(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPgr_description();
    }

    model_internal function setterListenerPgr_unit(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPgr_unit();
    }

    model_internal function setterListenerBase_pub_vcf(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBase_pub_vcf();
    }

    model_internal function setterListenerBase_prod_group(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBase_prod_group();
    }

    model_internal function setterListenerBase_real_dens_std(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBase_real_dens_std();
    }

    model_internal function setterListenerBase_rpt_temp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBase_rpt_temp();
    }

    model_internal function setterListenerBase_pub_dens(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBase_pub_dens();
    }

    model_internal function setterListenerBase_real_temp(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBase_real_temp();
    }

    model_internal function setterListenerBase_name(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBase_name();
    }

    model_internal function setterListenerBase_rpt_tunt(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBase_rpt_tunt();
    }

    model_internal function setterListenerBclass_dens_lo(value:flash.events.Event):void
    {
        _model.invalidateDependentOnBclass_dens_lo();
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
        if (!_model.base_pub_dens_stdIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_base_pub_dens_stdValidationFailureMessages);
        }
        if (!_model.bclass_descIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_bclass_descValidationFailureMessages);
        }
        if (!_model.last_upd_timeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_last_upd_timeValidationFailureMessages);
        }
        if (!_model.base_catIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_base_catValidationFailureMessages);
        }
        if (!_model.bclass_dens_hiIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_bclass_dens_hiValidationFailureMessages);
        }
        if (!_model.base_pub_tempIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_base_pub_tempValidationFailureMessages);
        }
        if (!_model.base_real_vcfIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_base_real_vcfValidationFailureMessages);
        }
        if (!_model.bclass_vcf_algIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_bclass_vcf_algValidationFailureMessages);
        }
        if (!_model.base_compensate_priorityIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_base_compensate_priorityValidationFailureMessages);
        }
        if (!_model.base_compensate_modeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_base_compensate_modeValidationFailureMessages);
        }
        if (!_model.base_real_densIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_base_real_densValidationFailureMessages);
        }
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
        if (!_model.base_pub_vcfIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_base_pub_vcfValidationFailureMessages);
        }
        if (!_model.base_prod_groupIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_base_prod_groupValidationFailureMessages);
        }
        if (!_model.base_real_dens_stdIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_base_real_dens_stdValidationFailureMessages);
        }
        if (!_model.base_rpt_tempIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_base_rpt_tempValidationFailureMessages);
        }
        if (!_model.base_pub_densIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_base_pub_densValidationFailureMessages);
        }
        if (!_model.base_real_tempIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_base_real_tempValidationFailureMessages);
        }
        if (!_model.base_nameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_base_nameValidationFailureMessages);
        }
        if (!_model.base_rpt_tuntIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_base_rpt_tuntValidationFailureMessages);
        }
        if (!_model.bclass_dens_loIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_bclass_dens_loValidationFailureMessages);
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
    public function get _model() : _Base_ProdsEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _Base_ProdsEntityMetadata) : void
    {
        var oldValue : _Base_ProdsEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfBase_pub_dens_std : Array = null;
    model_internal var _doValidationLastValOfBase_pub_dens_std : Object;

    model_internal function _doValidationForBase_pub_dens_std(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfBase_pub_dens_std != null && model_internal::_doValidationLastValOfBase_pub_dens_std == value)
           return model_internal::_doValidationCacheOfBase_pub_dens_std ;

        _model.model_internal::_base_pub_dens_stdIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBase_pub_dens_stdAvailable && _internal_base_pub_dens_std == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "base_pub_dens_std is required"));
        }

        model_internal::_doValidationCacheOfBase_pub_dens_std = validationFailures;
        model_internal::_doValidationLastValOfBase_pub_dens_std = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBclass_desc : Array = null;
    model_internal var _doValidationLastValOfBclass_desc : Object;

    model_internal function _doValidationForBclass_desc(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfBclass_desc != null && model_internal::_doValidationLastValOfBclass_desc == value)
           return model_internal::_doValidationCacheOfBclass_desc ;

        _model.model_internal::_bclass_descIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBclass_descAvailable && _internal_bclass_desc == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "bclass_desc is required"));
        }

        model_internal::_doValidationCacheOfBclass_desc = validationFailures;
        model_internal::_doValidationLastValOfBclass_desc = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfLast_upd_time : Array = null;
    model_internal var _doValidationLastValOfLast_upd_time : String;

    model_internal function _doValidationForLast_upd_time(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfLast_upd_time != null && model_internal::_doValidationLastValOfLast_upd_time == value)
           return model_internal::_doValidationCacheOfLast_upd_time ;

        _model.model_internal::_last_upd_timeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isLast_upd_timeAvailable && _internal_last_upd_time == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "last_upd_time is required"));
        }

        model_internal::_doValidationCacheOfLast_upd_time = validationFailures;
        model_internal::_doValidationLastValOfLast_upd_time = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBase_cat : Array = null;
    model_internal var _doValidationLastValOfBase_cat : String;

    model_internal function _doValidationForBase_cat(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBase_cat != null && model_internal::_doValidationLastValOfBase_cat == value)
           return model_internal::_doValidationCacheOfBase_cat ;

        _model.model_internal::_base_catIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBase_catAvailable && _internal_base_cat == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "base_cat is required"));
        }

        model_internal::_doValidationCacheOfBase_cat = validationFailures;
        model_internal::_doValidationLastValOfBase_cat = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBclass_dens_hi : Array = null;
    model_internal var _doValidationLastValOfBclass_dens_hi : Object;

    model_internal function _doValidationForBclass_dens_hi(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfBclass_dens_hi != null && model_internal::_doValidationLastValOfBclass_dens_hi == value)
           return model_internal::_doValidationCacheOfBclass_dens_hi ;

        _model.model_internal::_bclass_dens_hiIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBclass_dens_hiAvailable && _internal_bclass_dens_hi == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "bclass_dens_hi is required"));
        }

        model_internal::_doValidationCacheOfBclass_dens_hi = validationFailures;
        model_internal::_doValidationLastValOfBclass_dens_hi = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBase_pub_temp : Array = null;
    model_internal var _doValidationLastValOfBase_pub_temp : Object;

    model_internal function _doValidationForBase_pub_temp(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfBase_pub_temp != null && model_internal::_doValidationLastValOfBase_pub_temp == value)
           return model_internal::_doValidationCacheOfBase_pub_temp ;

        _model.model_internal::_base_pub_tempIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBase_pub_tempAvailable && _internal_base_pub_temp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "base_pub_temp is required"));
        }

        model_internal::_doValidationCacheOfBase_pub_temp = validationFailures;
        model_internal::_doValidationLastValOfBase_pub_temp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBase_real_vcf : Array = null;
    model_internal var _doValidationLastValOfBase_real_vcf : Object;

    model_internal function _doValidationForBase_real_vcf(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfBase_real_vcf != null && model_internal::_doValidationLastValOfBase_real_vcf == value)
           return model_internal::_doValidationCacheOfBase_real_vcf ;

        _model.model_internal::_base_real_vcfIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBase_real_vcfAvailable && _internal_base_real_vcf == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "base_real_vcf is required"));
        }

        model_internal::_doValidationCacheOfBase_real_vcf = validationFailures;
        model_internal::_doValidationLastValOfBase_real_vcf = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBclass_vcf_alg : Array = null;
    model_internal var _doValidationLastValOfBclass_vcf_alg : Object;

    model_internal function _doValidationForBclass_vcf_alg(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfBclass_vcf_alg != null && model_internal::_doValidationLastValOfBclass_vcf_alg == value)
           return model_internal::_doValidationCacheOfBclass_vcf_alg ;

        _model.model_internal::_bclass_vcf_algIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBclass_vcf_algAvailable && _internal_bclass_vcf_alg == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "bclass_vcf_alg is required"));
        }

        model_internal::_doValidationCacheOfBclass_vcf_alg = validationFailures;
        model_internal::_doValidationLastValOfBclass_vcf_alg = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBase_compensate_priority : Array = null;
    model_internal var _doValidationLastValOfBase_compensate_priority : Object;

    model_internal function _doValidationForBase_compensate_priority(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfBase_compensate_priority != null && model_internal::_doValidationLastValOfBase_compensate_priority == value)
           return model_internal::_doValidationCacheOfBase_compensate_priority ;

        _model.model_internal::_base_compensate_priorityIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBase_compensate_priorityAvailable && _internal_base_compensate_priority == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "base_compensate_priority is required"));
        }

        model_internal::_doValidationCacheOfBase_compensate_priority = validationFailures;
        model_internal::_doValidationLastValOfBase_compensate_priority = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBase_compensate_mode : Array = null;
    model_internal var _doValidationLastValOfBase_compensate_mode : Object;

    model_internal function _doValidationForBase_compensate_mode(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfBase_compensate_mode != null && model_internal::_doValidationLastValOfBase_compensate_mode == value)
           return model_internal::_doValidationCacheOfBase_compensate_mode ;

        _model.model_internal::_base_compensate_modeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBase_compensate_modeAvailable && _internal_base_compensate_mode == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "base_compensate_mode is required"));
        }

        model_internal::_doValidationCacheOfBase_compensate_mode = validationFailures;
        model_internal::_doValidationLastValOfBase_compensate_mode = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBase_real_dens : Array = null;
    model_internal var _doValidationLastValOfBase_real_dens : Object;

    model_internal function _doValidationForBase_real_dens(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfBase_real_dens != null && model_internal::_doValidationLastValOfBase_real_dens == value)
           return model_internal::_doValidationCacheOfBase_real_dens ;

        _model.model_internal::_base_real_densIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBase_real_densAvailable && _internal_base_real_dens == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "base_real_dens is required"));
        }

        model_internal::_doValidationCacheOfBase_real_dens = validationFailures;
        model_internal::_doValidationLastValOfBase_real_dens = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPgr_description : Array = null;
    model_internal var _doValidationLastValOfPgr_description : Object;

    model_internal function _doValidationForPgr_description(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    model_internal var _doValidationLastValOfPgr_unit : Object;

    model_internal function _doValidationForPgr_unit(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

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
    
    model_internal var _doValidationCacheOfBase_pub_vcf : Array = null;
    model_internal var _doValidationLastValOfBase_pub_vcf : Object;

    model_internal function _doValidationForBase_pub_vcf(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfBase_pub_vcf != null && model_internal::_doValidationLastValOfBase_pub_vcf == value)
           return model_internal::_doValidationCacheOfBase_pub_vcf ;

        _model.model_internal::_base_pub_vcfIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBase_pub_vcfAvailable && _internal_base_pub_vcf == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "base_pub_vcf is required"));
        }

        model_internal::_doValidationCacheOfBase_pub_vcf = validationFailures;
        model_internal::_doValidationLastValOfBase_pub_vcf = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBase_prod_group : Array = null;
    model_internal var _doValidationLastValOfBase_prod_group : String;

    model_internal function _doValidationForBase_prod_group(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBase_prod_group != null && model_internal::_doValidationLastValOfBase_prod_group == value)
           return model_internal::_doValidationCacheOfBase_prod_group ;

        _model.model_internal::_base_prod_groupIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBase_prod_groupAvailable && _internal_base_prod_group == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "base_prod_group is required"));
        }

        model_internal::_doValidationCacheOfBase_prod_group = validationFailures;
        model_internal::_doValidationLastValOfBase_prod_group = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBase_real_dens_std : Array = null;
    model_internal var _doValidationLastValOfBase_real_dens_std : Object;

    model_internal function _doValidationForBase_real_dens_std(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfBase_real_dens_std != null && model_internal::_doValidationLastValOfBase_real_dens_std == value)
           return model_internal::_doValidationCacheOfBase_real_dens_std ;

        _model.model_internal::_base_real_dens_stdIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBase_real_dens_stdAvailable && _internal_base_real_dens_std == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "base_real_dens_std is required"));
        }

        model_internal::_doValidationCacheOfBase_real_dens_std = validationFailures;
        model_internal::_doValidationLastValOfBase_real_dens_std = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBase_rpt_temp : Array = null;
    model_internal var _doValidationLastValOfBase_rpt_temp : Object;

    model_internal function _doValidationForBase_rpt_temp(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfBase_rpt_temp != null && model_internal::_doValidationLastValOfBase_rpt_temp == value)
           return model_internal::_doValidationCacheOfBase_rpt_temp ;

        _model.model_internal::_base_rpt_tempIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBase_rpt_tempAvailable && _internal_base_rpt_temp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "base_rpt_temp is required"));
        }

        model_internal::_doValidationCacheOfBase_rpt_temp = validationFailures;
        model_internal::_doValidationLastValOfBase_rpt_temp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBase_pub_dens : Array = null;
    model_internal var _doValidationLastValOfBase_pub_dens : Object;

    model_internal function _doValidationForBase_pub_dens(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfBase_pub_dens != null && model_internal::_doValidationLastValOfBase_pub_dens == value)
           return model_internal::_doValidationCacheOfBase_pub_dens ;

        _model.model_internal::_base_pub_densIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBase_pub_densAvailable && _internal_base_pub_dens == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "base_pub_dens is required"));
        }

        model_internal::_doValidationCacheOfBase_pub_dens = validationFailures;
        model_internal::_doValidationLastValOfBase_pub_dens = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBase_real_temp : Array = null;
    model_internal var _doValidationLastValOfBase_real_temp : Object;

    model_internal function _doValidationForBase_real_temp(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfBase_real_temp != null && model_internal::_doValidationLastValOfBase_real_temp == value)
           return model_internal::_doValidationCacheOfBase_real_temp ;

        _model.model_internal::_base_real_tempIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBase_real_tempAvailable && _internal_base_real_temp == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "base_real_temp is required"));
        }

        model_internal::_doValidationCacheOfBase_real_temp = validationFailures;
        model_internal::_doValidationLastValOfBase_real_temp = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBase_name : Array = null;
    model_internal var _doValidationLastValOfBase_name : String;

    model_internal function _doValidationForBase_name(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfBase_name != null && model_internal::_doValidationLastValOfBase_name == value)
           return model_internal::_doValidationCacheOfBase_name ;

        _model.model_internal::_base_nameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBase_nameAvailable && _internal_base_name == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "base_name is required"));
        }

        model_internal::_doValidationCacheOfBase_name = validationFailures;
        model_internal::_doValidationLastValOfBase_name = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBase_rpt_tunt : Array = null;
    model_internal var _doValidationLastValOfBase_rpt_tunt : Object;

    model_internal function _doValidationForBase_rpt_tunt(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfBase_rpt_tunt != null && model_internal::_doValidationLastValOfBase_rpt_tunt == value)
           return model_internal::_doValidationCacheOfBase_rpt_tunt ;

        _model.model_internal::_base_rpt_tuntIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBase_rpt_tuntAvailable && _internal_base_rpt_tunt == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "base_rpt_tunt is required"));
        }

        model_internal::_doValidationCacheOfBase_rpt_tunt = validationFailures;
        model_internal::_doValidationLastValOfBase_rpt_tunt = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfBclass_dens_lo : Array = null;
    model_internal var _doValidationLastValOfBclass_dens_lo : Object;

    model_internal function _doValidationForBclass_dens_lo(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfBclass_dens_lo != null && model_internal::_doValidationLastValOfBclass_dens_lo == value)
           return model_internal::_doValidationCacheOfBclass_dens_lo ;

        _model.model_internal::_bclass_dens_loIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isBclass_dens_loAvailable && _internal_bclass_dens_lo == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "bclass_dens_lo is required"));
        }

        model_internal::_doValidationCacheOfBclass_dens_lo = validationFailures;
        model_internal::_doValidationLastValOfBclass_dens_lo = value;

        return validationFailures;
    }
    

}

}
