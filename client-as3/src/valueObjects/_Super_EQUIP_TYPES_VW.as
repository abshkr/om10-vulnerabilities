/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - EQUIP_TYPES_VW.as.
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
import valueObjects.Composition;

import flash.net.registerClassAlias;
import flash.net.getClassByAlias;
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.valueobjects.IPropertyIterator;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;

use namespace model_internal;

[Managed]
[ExcludeClass]
public class _Super_EQUIP_TYPES_VW extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
        try
        {
            if (flash.net.getClassByAlias("EQUIP_TYPES_VW") == null)
            {
                flash.net.registerClassAlias("EQUIP_TYPES_VW", cz);
            }
        }
        catch (e:Error)
        {
            flash.net.registerClassAlias("EQUIP_TYPES_VW", cz);
        }
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
        valueObjects.Composition.initRemoteClassAliasSingleChild();
    }

    model_internal var _dminternal_model : _EQUIP_TYPES_VWEntityMetadata;
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
    private var _internal_etyp_category : Object;
    private var _internal_etyp_isrigid : String;
    private var _internal_rn : String;
    private var _internal_etyp_schedul : String;
    private var _internal_composition : ArrayCollection;
    model_internal var _internal_composition_leaf:valueObjects.Composition;
    private var _internal_etyp_is_drumfill : String;
    private var _internal_etyp_title : String;
    private var _internal_etyp_n_items : String;
    private var _internal_etyp_class : String;
    private var _internal_cmptnu : String;
    private var _internal_etyp_max_gross : String;
    private var _internal_etyp_id : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_EQUIP_TYPES_VW()
    {
        _model = new _EQUIP_TYPES_VWEntityMetadata(this);

        // Bind to own data or source properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_category", model_internal::setterListenerEtyp_category));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_isrigid", model_internal::setterListenerEtyp_isrigid));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_schedul", model_internal::setterListenerEtyp_schedul));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "composition", model_internal::setterListenerComposition));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_is_drumfill", model_internal::setterListenerEtyp_is_drumfill));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_title", model_internal::setterListenerEtyp_title));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_n_items", model_internal::setterListenerEtyp_n_items));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_class", model_internal::setterListenerEtyp_class));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "cmptnu", model_internal::setterListenerCmptnu));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_max_gross", model_internal::setterListenerEtyp_max_gross));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "etyp_id", model_internal::setterListenerEtyp_id));

    }

    /**
     * data/source property getters
     */

    [Bindable(event="propertyChange")]
    public function get etyp_category() : Object
    {
        return _internal_etyp_category;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_isrigid() : String
    {
        return _internal_etyp_isrigid;
    }

    [Bindable(event="propertyChange")]
    public function get rn() : String
    {
        return _internal_rn;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_schedul() : String
    {
        return _internal_etyp_schedul;
    }

    [Bindable(event="propertyChange")]
    public function get composition() : ArrayCollection
    {
        return _internal_composition;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_is_drumfill() : String
    {
        return _internal_etyp_is_drumfill;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_title() : String
    {
        return _internal_etyp_title;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_n_items() : String
    {
        return _internal_etyp_n_items;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_class() : String
    {
        return _internal_etyp_class;
    }

    [Bindable(event="propertyChange")]
    public function get cmptnu() : String
    {
        return _internal_cmptnu;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_max_gross() : String
    {
        return _internal_etyp_max_gross;
    }

    [Bindable(event="propertyChange")]
    public function get etyp_id() : String
    {
        return _internal_etyp_id;
    }

    public function clearAssociations() : void
    {
    }

    /**
     * data/source property setters
     */

    public function set etyp_category(value:Object) : void
    {
        var oldValue:Object = _internal_etyp_category;
        if (oldValue !== value)
        {
            _internal_etyp_category = value;
        }
    }

    public function set etyp_isrigid(value:String) : void
    {
        var oldValue:String = _internal_etyp_isrigid;
        if (oldValue !== value)
        {
            _internal_etyp_isrigid = value;
        }
    }

    public function set rn(value:String) : void
    {
        var oldValue:String = _internal_rn;
        if (oldValue !== value)
        {
            _internal_rn = value;
        }
    }

    public function set etyp_schedul(value:String) : void
    {
        var oldValue:String = _internal_etyp_schedul;
        if (oldValue !== value)
        {
            _internal_etyp_schedul = value;
        }
    }

    public function set composition(value:*) : void
    {
        var oldValue:ArrayCollection = _internal_composition;
        if (oldValue !== value)
        {
            if (value is ArrayCollection)
            {
                _internal_composition = value;
            }
            else if (value is Array)
            {
                _internal_composition = new ArrayCollection(value);
            }
            else if (value == null)
            {
                _internal_composition = null;
            }
            else
            {
                throw new Error("value of composition must be a collection");
            }
        }
    }

    public function set etyp_is_drumfill(value:String) : void
    {
        var oldValue:String = _internal_etyp_is_drumfill;
        if (oldValue !== value)
        {
            _internal_etyp_is_drumfill = value;
        }
    }

    public function set etyp_title(value:String) : void
    {
        var oldValue:String = _internal_etyp_title;
        if (oldValue !== value)
        {
            _internal_etyp_title = value;
        }
    }

    public function set etyp_n_items(value:String) : void
    {
        var oldValue:String = _internal_etyp_n_items;
        if (oldValue !== value)
        {
            _internal_etyp_n_items = value;
        }
    }

    public function set etyp_class(value:String) : void
    {
        var oldValue:String = _internal_etyp_class;
        if (oldValue !== value)
        {
            _internal_etyp_class = value;
        }
    }

    public function set cmptnu(value:String) : void
    {
        var oldValue:String = _internal_cmptnu;
        if (oldValue !== value)
        {
            _internal_cmptnu = value;
        }
    }

    public function set etyp_max_gross(value:String) : void
    {
        var oldValue:String = _internal_etyp_max_gross;
        if (oldValue !== value)
        {
            _internal_etyp_max_gross = value;
        }
    }

    public function set etyp_id(value:String) : void
    {
        var oldValue:String = _internal_etyp_id;
        if (oldValue !== value)
        {
            _internal_etyp_id = value;
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

    model_internal function setterListenerEtyp_category(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_category();
    }

    model_internal function setterListenerEtyp_isrigid(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_isrigid();
    }

    model_internal function setterListenerEtyp_schedul(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_schedul();
    }

    model_internal function setterListenerComposition(value:flash.events.Event):void
    {
        if (value is mx.events.PropertyChangeEvent)
        {
            if (mx.events.PropertyChangeEvent(value).newValue)
            {
                mx.events.PropertyChangeEvent(value).newValue.addEventListener(mx.events.CollectionEvent.COLLECTION_CHANGE, model_internal::setterListenerComposition);
            }
        }
        _model.invalidateDependentOnComposition();
    }

    model_internal function setterListenerEtyp_is_drumfill(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_is_drumfill();
    }

    model_internal function setterListenerEtyp_title(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_title();
    }

    model_internal function setterListenerEtyp_n_items(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_n_items();
    }

    model_internal function setterListenerEtyp_class(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_class();
    }

    model_internal function setterListenerCmptnu(value:flash.events.Event):void
    {
        _model.invalidateDependentOnCmptnu();
    }

    model_internal function setterListenerEtyp_max_gross(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_max_gross();
    }

    model_internal function setterListenerEtyp_id(value:flash.events.Event):void
    {
        _model.invalidateDependentOnEtyp_id();
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
        if (!_model.etyp_categoryIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_categoryValidationFailureMessages);
        }
        if (!_model.etyp_isrigidIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_isrigidValidationFailureMessages);
        }
        if (!_model.etyp_schedulIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_schedulValidationFailureMessages);
        }
        if (!_model.compositionIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_compositionValidationFailureMessages);
        }
        if (!_model.etyp_is_drumfillIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_is_drumfillValidationFailureMessages);
        }
        if (!_model.etyp_titleIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_titleValidationFailureMessages);
        }
        if (!_model.etyp_n_itemsIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_n_itemsValidationFailureMessages);
        }
        if (!_model.etyp_classIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_classValidationFailureMessages);
        }
        if (!_model.cmptnuIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_cmptnuValidationFailureMessages);
        }
        if (!_model.etyp_max_grossIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_max_grossValidationFailureMessages);
        }
        if (!_model.etyp_idIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_etyp_idValidationFailureMessages);
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
    public function get _model() : _EQUIP_TYPES_VWEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _EQUIP_TYPES_VWEntityMetadata) : void
    {
        var oldValue : _EQUIP_TYPES_VWEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfEtyp_category : Array = null;
    model_internal var _doValidationLastValOfEtyp_category : Object;

    model_internal function _doValidationForEtyp_category(valueIn:Object):Array
    {
        var value : Object = valueIn as Object;

        if (model_internal::_doValidationCacheOfEtyp_category != null && model_internal::_doValidationLastValOfEtyp_category == value)
           return model_internal::_doValidationCacheOfEtyp_category ;

        _model.model_internal::_etyp_categoryIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_categoryAvailable && _internal_etyp_category == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_category is required"));
        }

        model_internal::_doValidationCacheOfEtyp_category = validationFailures;
        model_internal::_doValidationLastValOfEtyp_category = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_isrigid : Array = null;
    model_internal var _doValidationLastValOfEtyp_isrigid : String;

    model_internal function _doValidationForEtyp_isrigid(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_isrigid != null && model_internal::_doValidationLastValOfEtyp_isrigid == value)
           return model_internal::_doValidationCacheOfEtyp_isrigid ;

        _model.model_internal::_etyp_isrigidIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_isrigidAvailable && _internal_etyp_isrigid == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_isrigid is required"));
        }

        model_internal::_doValidationCacheOfEtyp_isrigid = validationFailures;
        model_internal::_doValidationLastValOfEtyp_isrigid = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_schedul : Array = null;
    model_internal var _doValidationLastValOfEtyp_schedul : String;

    model_internal function _doValidationForEtyp_schedul(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_schedul != null && model_internal::_doValidationLastValOfEtyp_schedul == value)
           return model_internal::_doValidationCacheOfEtyp_schedul ;

        _model.model_internal::_etyp_schedulIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_schedulAvailable && _internal_etyp_schedul == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_schedul is required"));
        }

        model_internal::_doValidationCacheOfEtyp_schedul = validationFailures;
        model_internal::_doValidationLastValOfEtyp_schedul = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfComposition : Array = null;
    model_internal var _doValidationLastValOfComposition : ArrayCollection;

    model_internal function _doValidationForComposition(valueIn:Object):Array
    {
        var value : ArrayCollection = valueIn as ArrayCollection;

        if (model_internal::_doValidationCacheOfComposition != null && model_internal::_doValidationLastValOfComposition == value)
           return model_internal::_doValidationCacheOfComposition ;

        _model.model_internal::_compositionIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCompositionAvailable && _internal_composition == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "composition is required"));
        }

        model_internal::_doValidationCacheOfComposition = validationFailures;
        model_internal::_doValidationLastValOfComposition = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_is_drumfill : Array = null;
    model_internal var _doValidationLastValOfEtyp_is_drumfill : String;

    model_internal function _doValidationForEtyp_is_drumfill(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_is_drumfill != null && model_internal::_doValidationLastValOfEtyp_is_drumfill == value)
           return model_internal::_doValidationCacheOfEtyp_is_drumfill ;

        _model.model_internal::_etyp_is_drumfillIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_is_drumfillAvailable && _internal_etyp_is_drumfill == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_is_drumfill is required"));
        }

        model_internal::_doValidationCacheOfEtyp_is_drumfill = validationFailures;
        model_internal::_doValidationLastValOfEtyp_is_drumfill = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_title : Array = null;
    model_internal var _doValidationLastValOfEtyp_title : String;

    model_internal function _doValidationForEtyp_title(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_title != null && model_internal::_doValidationLastValOfEtyp_title == value)
           return model_internal::_doValidationCacheOfEtyp_title ;

        _model.model_internal::_etyp_titleIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_titleAvailable && _internal_etyp_title == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_title is required"));
        }

        model_internal::_doValidationCacheOfEtyp_title = validationFailures;
        model_internal::_doValidationLastValOfEtyp_title = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_n_items : Array = null;
    model_internal var _doValidationLastValOfEtyp_n_items : String;

    model_internal function _doValidationForEtyp_n_items(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_n_items != null && model_internal::_doValidationLastValOfEtyp_n_items == value)
           return model_internal::_doValidationCacheOfEtyp_n_items ;

        _model.model_internal::_etyp_n_itemsIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_n_itemsAvailable && _internal_etyp_n_items == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_n_items is required"));
        }

        model_internal::_doValidationCacheOfEtyp_n_items = validationFailures;
        model_internal::_doValidationLastValOfEtyp_n_items = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_class : Array = null;
    model_internal var _doValidationLastValOfEtyp_class : String;

    model_internal function _doValidationForEtyp_class(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_class != null && model_internal::_doValidationLastValOfEtyp_class == value)
           return model_internal::_doValidationCacheOfEtyp_class ;

        _model.model_internal::_etyp_classIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_classAvailable && _internal_etyp_class == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_class is required"));
        }

        model_internal::_doValidationCacheOfEtyp_class = validationFailures;
        model_internal::_doValidationLastValOfEtyp_class = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfCmptnu : Array = null;
    model_internal var _doValidationLastValOfCmptnu : String;

    model_internal function _doValidationForCmptnu(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfCmptnu != null && model_internal::_doValidationLastValOfCmptnu == value)
           return model_internal::_doValidationCacheOfCmptnu ;

        _model.model_internal::_cmptnuIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isCmptnuAvailable && _internal_cmptnu == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "cmptnu is required"));
        }

        model_internal::_doValidationCacheOfCmptnu = validationFailures;
        model_internal::_doValidationLastValOfCmptnu = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_max_gross : Array = null;
    model_internal var _doValidationLastValOfEtyp_max_gross : String;

    model_internal function _doValidationForEtyp_max_gross(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_max_gross != null && model_internal::_doValidationLastValOfEtyp_max_gross == value)
           return model_internal::_doValidationCacheOfEtyp_max_gross ;

        _model.model_internal::_etyp_max_grossIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_max_grossAvailable && _internal_etyp_max_gross == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_max_gross is required"));
        }

        model_internal::_doValidationCacheOfEtyp_max_gross = validationFailures;
        model_internal::_doValidationLastValOfEtyp_max_gross = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfEtyp_id : Array = null;
    model_internal var _doValidationLastValOfEtyp_id : String;

    model_internal function _doValidationForEtyp_id(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfEtyp_id != null && model_internal::_doValidationLastValOfEtyp_id == value)
           return model_internal::_doValidationCacheOfEtyp_id ;

        _model.model_internal::_etyp_idIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isEtyp_idAvailable && _internal_etyp_id == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "etyp_id is required"));
        }

        model_internal::_doValidationCacheOfEtyp_id = validationFailures;
        model_internal::_doValidationLastValOfEtyp_id = value;

        return validationFailures;
    }
    

}

}
