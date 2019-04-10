
/**
 * This is a generated class and is not intended for modification.  
 */
package valueObjects
{
import com.adobe.fiber.styles.IStyle;
import com.adobe.fiber.styles.Style;
import com.adobe.fiber.styles.StyleValidator;
import com.adobe.fiber.valueobjects.AbstractEntityMetadata;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;
import com.adobe.fiber.valueobjects.IPropertyIterator;
import mx.events.ValidationResultEvent;
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.valueobjects.IModelType;
import mx.events.PropertyChangeEvent;

use namespace model_internal;

[ExcludeClass]
internal class _GuiMeterDetailsEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("trsf_cls_amb", "baa_bay_seq", "trsf_open_kg", "trsf_cls_cor", "trsf_opn_cor", "trsf_close_kg", "trsf_opn_amb", "trsb_injector", "trsb_meter", "is_injector", "trsftrid_trsa_id");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("trsf_cls_amb", "baa_bay_seq", "trsf_open_kg", "trsf_cls_cor", "trsf_opn_cor", "trsf_close_kg", "trsf_opn_amb", "trsb_injector", "trsb_meter", "is_injector", "trsftrid_trsa_id");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("trsf_cls_amb", "baa_bay_seq", "trsf_open_kg", "trsf_cls_cor", "trsf_opn_cor", "trsf_close_kg", "trsf_opn_amb", "trsb_injector", "trsb_meter", "is_injector", "trsftrid_trsa_id");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("trsf_cls_amb", "baa_bay_seq", "trsf_open_kg", "trsf_cls_cor", "trsf_opn_cor", "trsf_close_kg", "trsf_opn_amb", "trsb_injector", "trsb_meter", "is_injector", "trsftrid_trsa_id");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("trsf_cls_amb", "baa_bay_seq", "trsf_open_kg", "trsf_cls_cor", "trsf_opn_cor", "trsf_close_kg", "trsf_opn_amb", "trsb_injector", "trsb_meter", "is_injector", "trsftrid_trsa_id");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "GuiMeterDetails";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _trsf_cls_ambIsValid:Boolean;
    model_internal var _trsf_cls_ambValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsf_cls_ambIsValidCacheInitialized:Boolean = false;
    model_internal var _trsf_cls_ambValidationFailureMessages:Array;
    
    model_internal var _baa_bay_seqIsValid:Boolean;
    model_internal var _baa_bay_seqValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _baa_bay_seqIsValidCacheInitialized:Boolean = false;
    model_internal var _baa_bay_seqValidationFailureMessages:Array;
    
    model_internal var _trsf_open_kgIsValid:Boolean;
    model_internal var _trsf_open_kgValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsf_open_kgIsValidCacheInitialized:Boolean = false;
    model_internal var _trsf_open_kgValidationFailureMessages:Array;
    
    model_internal var _trsf_cls_corIsValid:Boolean;
    model_internal var _trsf_cls_corValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsf_cls_corIsValidCacheInitialized:Boolean = false;
    model_internal var _trsf_cls_corValidationFailureMessages:Array;
    
    model_internal var _trsf_opn_corIsValid:Boolean;
    model_internal var _trsf_opn_corValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsf_opn_corIsValidCacheInitialized:Boolean = false;
    model_internal var _trsf_opn_corValidationFailureMessages:Array;
    
    model_internal var _trsf_close_kgIsValid:Boolean;
    model_internal var _trsf_close_kgValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsf_close_kgIsValidCacheInitialized:Boolean = false;
    model_internal var _trsf_close_kgValidationFailureMessages:Array;
    
    model_internal var _trsf_opn_ambIsValid:Boolean;
    model_internal var _trsf_opn_ambValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsf_opn_ambIsValidCacheInitialized:Boolean = false;
    model_internal var _trsf_opn_ambValidationFailureMessages:Array;
    
    model_internal var _trsb_injectorIsValid:Boolean;
    model_internal var _trsb_injectorValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsb_injectorIsValidCacheInitialized:Boolean = false;
    model_internal var _trsb_injectorValidationFailureMessages:Array;
    
    model_internal var _trsb_meterIsValid:Boolean;
    model_internal var _trsb_meterValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsb_meterIsValidCacheInitialized:Boolean = false;
    model_internal var _trsb_meterValidationFailureMessages:Array;
    
    model_internal var _is_injectorIsValid:Boolean;
    model_internal var _is_injectorValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _is_injectorIsValidCacheInitialized:Boolean = false;
    model_internal var _is_injectorValidationFailureMessages:Array;
    
    model_internal var _trsftrid_trsa_idIsValid:Boolean;
    model_internal var _trsftrid_trsa_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsftrid_trsa_idIsValidCacheInitialized:Boolean = false;
    model_internal var _trsftrid_trsa_idValidationFailureMessages:Array;

    model_internal var _instance:_Super_GuiMeterDetails;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _GuiMeterDetailsEntityMetadata(value : _Super_GuiMeterDetails)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["trsf_cls_amb"] = new Array();
            model_internal::dependentsOnMap["baa_bay_seq"] = new Array();
            model_internal::dependentsOnMap["trsf_open_kg"] = new Array();
            model_internal::dependentsOnMap["trsf_cls_cor"] = new Array();
            model_internal::dependentsOnMap["trsf_opn_cor"] = new Array();
            model_internal::dependentsOnMap["trsf_close_kg"] = new Array();
            model_internal::dependentsOnMap["trsf_opn_amb"] = new Array();
            model_internal::dependentsOnMap["trsb_injector"] = new Array();
            model_internal::dependentsOnMap["trsb_meter"] = new Array();
            model_internal::dependentsOnMap["is_injector"] = new Array();
            model_internal::dependentsOnMap["trsftrid_trsa_id"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["trsf_cls_amb"] = "String";
        model_internal::propertyTypeMap["baa_bay_seq"] = "String";
        model_internal::propertyTypeMap["trsf_open_kg"] = "String";
        model_internal::propertyTypeMap["trsf_cls_cor"] = "String";
        model_internal::propertyTypeMap["trsf_opn_cor"] = "String";
        model_internal::propertyTypeMap["trsf_close_kg"] = "String";
        model_internal::propertyTypeMap["trsf_opn_amb"] = "String";
        model_internal::propertyTypeMap["trsb_injector"] = "String";
        model_internal::propertyTypeMap["trsb_meter"] = "String";
        model_internal::propertyTypeMap["is_injector"] = "String";
        model_internal::propertyTypeMap["trsftrid_trsa_id"] = "String";

        model_internal::_instance = value;
        model_internal::_trsf_cls_ambValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsf_cls_amb);
        model_internal::_trsf_cls_ambValidator.required = true;
        model_internal::_trsf_cls_ambValidator.requiredFieldError = "trsf_cls_amb is required";
        //model_internal::_trsf_cls_ambValidator.source = model_internal::_instance;
        //model_internal::_trsf_cls_ambValidator.property = "trsf_cls_amb";
        model_internal::_baa_bay_seqValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBaa_bay_seq);
        model_internal::_baa_bay_seqValidator.required = true;
        model_internal::_baa_bay_seqValidator.requiredFieldError = "baa_bay_seq is required";
        //model_internal::_baa_bay_seqValidator.source = model_internal::_instance;
        //model_internal::_baa_bay_seqValidator.property = "baa_bay_seq";
        model_internal::_trsf_open_kgValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsf_open_kg);
        model_internal::_trsf_open_kgValidator.required = true;
        model_internal::_trsf_open_kgValidator.requiredFieldError = "trsf_open_kg is required";
        //model_internal::_trsf_open_kgValidator.source = model_internal::_instance;
        //model_internal::_trsf_open_kgValidator.property = "trsf_open_kg";
        model_internal::_trsf_cls_corValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsf_cls_cor);
        model_internal::_trsf_cls_corValidator.required = true;
        model_internal::_trsf_cls_corValidator.requiredFieldError = "trsf_cls_cor is required";
        //model_internal::_trsf_cls_corValidator.source = model_internal::_instance;
        //model_internal::_trsf_cls_corValidator.property = "trsf_cls_cor";
        model_internal::_trsf_opn_corValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsf_opn_cor);
        model_internal::_trsf_opn_corValidator.required = true;
        model_internal::_trsf_opn_corValidator.requiredFieldError = "trsf_opn_cor is required";
        //model_internal::_trsf_opn_corValidator.source = model_internal::_instance;
        //model_internal::_trsf_opn_corValidator.property = "trsf_opn_cor";
        model_internal::_trsf_close_kgValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsf_close_kg);
        model_internal::_trsf_close_kgValidator.required = true;
        model_internal::_trsf_close_kgValidator.requiredFieldError = "trsf_close_kg is required";
        //model_internal::_trsf_close_kgValidator.source = model_internal::_instance;
        //model_internal::_trsf_close_kgValidator.property = "trsf_close_kg";
        model_internal::_trsf_opn_ambValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsf_opn_amb);
        model_internal::_trsf_opn_ambValidator.required = true;
        model_internal::_trsf_opn_ambValidator.requiredFieldError = "trsf_opn_amb is required";
        //model_internal::_trsf_opn_ambValidator.source = model_internal::_instance;
        //model_internal::_trsf_opn_ambValidator.property = "trsf_opn_amb";
        model_internal::_trsb_injectorValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsb_injector);
        model_internal::_trsb_injectorValidator.required = true;
        model_internal::_trsb_injectorValidator.requiredFieldError = "trsb_injector is required";
        //model_internal::_trsb_injectorValidator.source = model_internal::_instance;
        //model_internal::_trsb_injectorValidator.property = "trsb_injector";
        model_internal::_trsb_meterValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsb_meter);
        model_internal::_trsb_meterValidator.required = true;
        model_internal::_trsb_meterValidator.requiredFieldError = "trsb_meter is required";
        //model_internal::_trsb_meterValidator.source = model_internal::_instance;
        //model_internal::_trsb_meterValidator.property = "trsb_meter";
        model_internal::_is_injectorValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForIs_injector);
        model_internal::_is_injectorValidator.required = true;
        model_internal::_is_injectorValidator.requiredFieldError = "is_injector is required";
        //model_internal::_is_injectorValidator.source = model_internal::_instance;
        //model_internal::_is_injectorValidator.property = "is_injector";
        model_internal::_trsftrid_trsa_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsftrid_trsa_id);
        model_internal::_trsftrid_trsa_idValidator.required = true;
        model_internal::_trsftrid_trsa_idValidator.requiredFieldError = "trsftrid_trsa_id is required";
        //model_internal::_trsftrid_trsa_idValidator.source = model_internal::_instance;
        //model_internal::_trsftrid_trsa_idValidator.property = "trsftrid_trsa_id";
    }

    override public function getEntityName():String
    {
        return model_internal::entityName;
    }

    override public function getProperties():Array
    {
        return model_internal::allProperties;
    }

    override public function getAssociationProperties():Array
    {
        return model_internal::allAssociationProperties;
    }

    override public function getRequiredProperties():Array
    {
         return model_internal::allRequiredProperties;   
    }

    override public function getDataProperties():Array
    {
        return model_internal::dataProperties;
    }

    public function getSourceProperties():Array
    {
        return model_internal::sourceProperties;
    }

    public function getNonDerivedProperties():Array
    {
        return model_internal::nonDerivedProperties;
    }

    override public function getGuardedProperties():Array
    {
        return model_internal::guardedProperties;
    }

    override public function getUnguardedProperties():Array
    {
        return model_internal::allAlwaysAvailableProperties;
    }

    override public function getDependants(propertyName:String):Array
    {
       if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a data property of entity GuiMeterDetails");
            
       return model_internal::dependentsOnMap[propertyName] as Array;  
    }

    override public function getDependedOnServices():Array
    {
        return model_internal::dependedOnServices;
    }

    override public function getCollectionProperties():Array
    {
        return model_internal::collectionProperties;
    }

    override public function getCollectionBase(propertyName:String):String
    {
        if (model_internal::collectionProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a collection property of entity GuiMeterDetails");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of GuiMeterDetails");

        return model_internal::propertyTypeMap[propertyName];
    }

    override public function getAvailableProperties():com.adobe.fiber.valueobjects.IPropertyIterator
    {
        return new com.adobe.fiber.valueobjects.AvailablePropertyIterator(this);
    }

    override public function getValue(propertyName:String):*
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " does not exist for entity GuiMeterDetails");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity GuiMeterDetails");
        }

        model_internal::_instance[propertyName] = value;
    }

    override public function getMappedByProperty(associationProperty:String):String
    {
        switch(associationProperty)
        {
            default:
            {
                return null;
            }
        }
    }

    override public function getPropertyLength(propertyName:String):int
    {
        switch(propertyName)
        {
            default:
            {
                return 0;
            }
        }
    }

    override public function isAvailable(propertyName:String):Boolean
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " does not exist for entity GuiMeterDetails");
        }

        if (model_internal::allAlwaysAvailableProperties.indexOf(propertyName) != -1)
        {
            return true;
        }

        switch(propertyName)
        {
            default:
            {
                return true;
            }
        }
    }

    override public function getIdentityMap():Object
    {
        var returnMap:Object = new Object();

        return returnMap;
    }

    [Bindable(event="propertyChange")]
    override public function get invalidConstraints():Array
    {
        if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
        {
            return model_internal::_instance.model_internal::_invalidConstraints;
        }
        else
        {
            // recalculate isValid
            model_internal::_instance.model_internal::_isValid = model_internal::_instance.model_internal::calculateIsValid();
            return model_internal::_instance.model_internal::_invalidConstraints;        
        }
    }

    [Bindable(event="propertyChange")]
    override public function get validationFailureMessages():Array
    {
        if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
        {
            return model_internal::_instance.model_internal::_validationFailureMessages;
        }
        else
        {
            // recalculate isValid
            model_internal::_instance.model_internal::_isValid = model_internal::_instance.model_internal::calculateIsValid();
            return model_internal::_instance.model_internal::_validationFailureMessages;
        }
    }

    override public function getDependantInvalidConstraints(propertyName:String):Array
    {
        var dependants:Array = getDependants(propertyName);
        if (dependants.length == 0)
        {
            return emptyArray;
        }

        var currentlyInvalid:Array = invalidConstraints;
        if (currentlyInvalid.length == 0)
        {
            return emptyArray;
        }

        var filterFunc:Function = function(element:*, index:int, arr:Array):Boolean
        {
            return dependants.indexOf(element) > -1;
        }

        return currentlyInvalid.filter(filterFunc);
    }

    /**
     * isValid
     */
    [Bindable(event="propertyChange")] 
    public function get isValid() : Boolean
    {
        if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
        {
            return model_internal::_instance.model_internal::_isValid;
        }
        else
        {
            // recalculate isValid
            model_internal::_instance.model_internal::_isValid = model_internal::_instance.model_internal::calculateIsValid();
            return model_internal::_instance.model_internal::_isValid;
        }
    }

    [Bindable(event="propertyChange")]
    public function get isTrsf_cls_ambAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBaa_bay_seqAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsf_open_kgAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsf_cls_corAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsf_opn_corAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsf_close_kgAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsf_opn_ambAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsb_injectorAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsb_meterAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isIs_injectorAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsftrid_trsa_idAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnTrsf_cls_amb():void
    {
        if (model_internal::_trsf_cls_ambIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsf_cls_amb = null;
            model_internal::calculateTrsf_cls_ambIsValid();
        }
    }
    public function invalidateDependentOnBaa_bay_seq():void
    {
        if (model_internal::_baa_bay_seqIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBaa_bay_seq = null;
            model_internal::calculateBaa_bay_seqIsValid();
        }
    }
    public function invalidateDependentOnTrsf_open_kg():void
    {
        if (model_internal::_trsf_open_kgIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsf_open_kg = null;
            model_internal::calculateTrsf_open_kgIsValid();
        }
    }
    public function invalidateDependentOnTrsf_cls_cor():void
    {
        if (model_internal::_trsf_cls_corIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsf_cls_cor = null;
            model_internal::calculateTrsf_cls_corIsValid();
        }
    }
    public function invalidateDependentOnTrsf_opn_cor():void
    {
        if (model_internal::_trsf_opn_corIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsf_opn_cor = null;
            model_internal::calculateTrsf_opn_corIsValid();
        }
    }
    public function invalidateDependentOnTrsf_close_kg():void
    {
        if (model_internal::_trsf_close_kgIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsf_close_kg = null;
            model_internal::calculateTrsf_close_kgIsValid();
        }
    }
    public function invalidateDependentOnTrsf_opn_amb():void
    {
        if (model_internal::_trsf_opn_ambIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsf_opn_amb = null;
            model_internal::calculateTrsf_opn_ambIsValid();
        }
    }
    public function invalidateDependentOnTrsb_injector():void
    {
        if (model_internal::_trsb_injectorIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsb_injector = null;
            model_internal::calculateTrsb_injectorIsValid();
        }
    }
    public function invalidateDependentOnTrsb_meter():void
    {
        if (model_internal::_trsb_meterIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsb_meter = null;
            model_internal::calculateTrsb_meterIsValid();
        }
    }
    public function invalidateDependentOnIs_injector():void
    {
        if (model_internal::_is_injectorIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfIs_injector = null;
            model_internal::calculateIs_injectorIsValid();
        }
    }
    public function invalidateDependentOnTrsftrid_trsa_id():void
    {
        if (model_internal::_trsftrid_trsa_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsftrid_trsa_id = null;
            model_internal::calculateTrsftrid_trsa_idIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get trsf_cls_ambStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsf_cls_ambValidator() : StyleValidator
    {
        return model_internal::_trsf_cls_ambValidator;
    }

    model_internal function set _trsf_cls_ambIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsf_cls_ambIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsf_cls_ambIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_cls_ambIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsf_cls_ambIsValid():Boolean
    {
        if (!model_internal::_trsf_cls_ambIsValidCacheInitialized)
        {
            model_internal::calculateTrsf_cls_ambIsValid();
        }

        return model_internal::_trsf_cls_ambIsValid;
    }

    model_internal function calculateTrsf_cls_ambIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsf_cls_ambValidator.validate(model_internal::_instance.trsf_cls_amb)
        model_internal::_trsf_cls_ambIsValid_der = (valRes.results == null);
        model_internal::_trsf_cls_ambIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsf_cls_ambValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsf_cls_ambValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsf_cls_ambValidationFailureMessages():Array
    {
        if (model_internal::_trsf_cls_ambValidationFailureMessages == null)
            model_internal::calculateTrsf_cls_ambIsValid();

        return _trsf_cls_ambValidationFailureMessages;
    }

    model_internal function set trsf_cls_ambValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsf_cls_ambValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsf_cls_ambValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_cls_ambValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get baa_bay_seqStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get baa_bay_seqValidator() : StyleValidator
    {
        return model_internal::_baa_bay_seqValidator;
    }

    model_internal function set _baa_bay_seqIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_baa_bay_seqIsValid;         
        if (oldValue !== value)
        {
            model_internal::_baa_bay_seqIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "baa_bay_seqIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get baa_bay_seqIsValid():Boolean
    {
        if (!model_internal::_baa_bay_seqIsValidCacheInitialized)
        {
            model_internal::calculateBaa_bay_seqIsValid();
        }

        return model_internal::_baa_bay_seqIsValid;
    }

    model_internal function calculateBaa_bay_seqIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_baa_bay_seqValidator.validate(model_internal::_instance.baa_bay_seq)
        model_internal::_baa_bay_seqIsValid_der = (valRes.results == null);
        model_internal::_baa_bay_seqIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::baa_bay_seqValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::baa_bay_seqValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get baa_bay_seqValidationFailureMessages():Array
    {
        if (model_internal::_baa_bay_seqValidationFailureMessages == null)
            model_internal::calculateBaa_bay_seqIsValid();

        return _baa_bay_seqValidationFailureMessages;
    }

    model_internal function set baa_bay_seqValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_baa_bay_seqValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_baa_bay_seqValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "baa_bay_seqValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsf_open_kgStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsf_open_kgValidator() : StyleValidator
    {
        return model_internal::_trsf_open_kgValidator;
    }

    model_internal function set _trsf_open_kgIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsf_open_kgIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsf_open_kgIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_open_kgIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsf_open_kgIsValid():Boolean
    {
        if (!model_internal::_trsf_open_kgIsValidCacheInitialized)
        {
            model_internal::calculateTrsf_open_kgIsValid();
        }

        return model_internal::_trsf_open_kgIsValid;
    }

    model_internal function calculateTrsf_open_kgIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsf_open_kgValidator.validate(model_internal::_instance.trsf_open_kg)
        model_internal::_trsf_open_kgIsValid_der = (valRes.results == null);
        model_internal::_trsf_open_kgIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsf_open_kgValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsf_open_kgValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsf_open_kgValidationFailureMessages():Array
    {
        if (model_internal::_trsf_open_kgValidationFailureMessages == null)
            model_internal::calculateTrsf_open_kgIsValid();

        return _trsf_open_kgValidationFailureMessages;
    }

    model_internal function set trsf_open_kgValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsf_open_kgValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsf_open_kgValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_open_kgValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsf_cls_corStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsf_cls_corValidator() : StyleValidator
    {
        return model_internal::_trsf_cls_corValidator;
    }

    model_internal function set _trsf_cls_corIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsf_cls_corIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsf_cls_corIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_cls_corIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsf_cls_corIsValid():Boolean
    {
        if (!model_internal::_trsf_cls_corIsValidCacheInitialized)
        {
            model_internal::calculateTrsf_cls_corIsValid();
        }

        return model_internal::_trsf_cls_corIsValid;
    }

    model_internal function calculateTrsf_cls_corIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsf_cls_corValidator.validate(model_internal::_instance.trsf_cls_cor)
        model_internal::_trsf_cls_corIsValid_der = (valRes.results == null);
        model_internal::_trsf_cls_corIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsf_cls_corValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsf_cls_corValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsf_cls_corValidationFailureMessages():Array
    {
        if (model_internal::_trsf_cls_corValidationFailureMessages == null)
            model_internal::calculateTrsf_cls_corIsValid();

        return _trsf_cls_corValidationFailureMessages;
    }

    model_internal function set trsf_cls_corValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsf_cls_corValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsf_cls_corValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_cls_corValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsf_opn_corStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsf_opn_corValidator() : StyleValidator
    {
        return model_internal::_trsf_opn_corValidator;
    }

    model_internal function set _trsf_opn_corIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsf_opn_corIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsf_opn_corIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_opn_corIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsf_opn_corIsValid():Boolean
    {
        if (!model_internal::_trsf_opn_corIsValidCacheInitialized)
        {
            model_internal::calculateTrsf_opn_corIsValid();
        }

        return model_internal::_trsf_opn_corIsValid;
    }

    model_internal function calculateTrsf_opn_corIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsf_opn_corValidator.validate(model_internal::_instance.trsf_opn_cor)
        model_internal::_trsf_opn_corIsValid_der = (valRes.results == null);
        model_internal::_trsf_opn_corIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsf_opn_corValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsf_opn_corValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsf_opn_corValidationFailureMessages():Array
    {
        if (model_internal::_trsf_opn_corValidationFailureMessages == null)
            model_internal::calculateTrsf_opn_corIsValid();

        return _trsf_opn_corValidationFailureMessages;
    }

    model_internal function set trsf_opn_corValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsf_opn_corValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsf_opn_corValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_opn_corValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsf_close_kgStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsf_close_kgValidator() : StyleValidator
    {
        return model_internal::_trsf_close_kgValidator;
    }

    model_internal function set _trsf_close_kgIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsf_close_kgIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsf_close_kgIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_close_kgIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsf_close_kgIsValid():Boolean
    {
        if (!model_internal::_trsf_close_kgIsValidCacheInitialized)
        {
            model_internal::calculateTrsf_close_kgIsValid();
        }

        return model_internal::_trsf_close_kgIsValid;
    }

    model_internal function calculateTrsf_close_kgIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsf_close_kgValidator.validate(model_internal::_instance.trsf_close_kg)
        model_internal::_trsf_close_kgIsValid_der = (valRes.results == null);
        model_internal::_trsf_close_kgIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsf_close_kgValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsf_close_kgValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsf_close_kgValidationFailureMessages():Array
    {
        if (model_internal::_trsf_close_kgValidationFailureMessages == null)
            model_internal::calculateTrsf_close_kgIsValid();

        return _trsf_close_kgValidationFailureMessages;
    }

    model_internal function set trsf_close_kgValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsf_close_kgValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsf_close_kgValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_close_kgValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsf_opn_ambStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsf_opn_ambValidator() : StyleValidator
    {
        return model_internal::_trsf_opn_ambValidator;
    }

    model_internal function set _trsf_opn_ambIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsf_opn_ambIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsf_opn_ambIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_opn_ambIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsf_opn_ambIsValid():Boolean
    {
        if (!model_internal::_trsf_opn_ambIsValidCacheInitialized)
        {
            model_internal::calculateTrsf_opn_ambIsValid();
        }

        return model_internal::_trsf_opn_ambIsValid;
    }

    model_internal function calculateTrsf_opn_ambIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsf_opn_ambValidator.validate(model_internal::_instance.trsf_opn_amb)
        model_internal::_trsf_opn_ambIsValid_der = (valRes.results == null);
        model_internal::_trsf_opn_ambIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsf_opn_ambValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsf_opn_ambValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsf_opn_ambValidationFailureMessages():Array
    {
        if (model_internal::_trsf_opn_ambValidationFailureMessages == null)
            model_internal::calculateTrsf_opn_ambIsValid();

        return _trsf_opn_ambValidationFailureMessages;
    }

    model_internal function set trsf_opn_ambValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsf_opn_ambValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsf_opn_ambValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsf_opn_ambValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsb_injectorStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsb_injectorValidator() : StyleValidator
    {
        return model_internal::_trsb_injectorValidator;
    }

    model_internal function set _trsb_injectorIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsb_injectorIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsb_injectorIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsb_injectorIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsb_injectorIsValid():Boolean
    {
        if (!model_internal::_trsb_injectorIsValidCacheInitialized)
        {
            model_internal::calculateTrsb_injectorIsValid();
        }

        return model_internal::_trsb_injectorIsValid;
    }

    model_internal function calculateTrsb_injectorIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsb_injectorValidator.validate(model_internal::_instance.trsb_injector)
        model_internal::_trsb_injectorIsValid_der = (valRes.results == null);
        model_internal::_trsb_injectorIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsb_injectorValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsb_injectorValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsb_injectorValidationFailureMessages():Array
    {
        if (model_internal::_trsb_injectorValidationFailureMessages == null)
            model_internal::calculateTrsb_injectorIsValid();

        return _trsb_injectorValidationFailureMessages;
    }

    model_internal function set trsb_injectorValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsb_injectorValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsb_injectorValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsb_injectorValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsb_meterStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsb_meterValidator() : StyleValidator
    {
        return model_internal::_trsb_meterValidator;
    }

    model_internal function set _trsb_meterIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsb_meterIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsb_meterIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsb_meterIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsb_meterIsValid():Boolean
    {
        if (!model_internal::_trsb_meterIsValidCacheInitialized)
        {
            model_internal::calculateTrsb_meterIsValid();
        }

        return model_internal::_trsb_meterIsValid;
    }

    model_internal function calculateTrsb_meterIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsb_meterValidator.validate(model_internal::_instance.trsb_meter)
        model_internal::_trsb_meterIsValid_der = (valRes.results == null);
        model_internal::_trsb_meterIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsb_meterValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsb_meterValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsb_meterValidationFailureMessages():Array
    {
        if (model_internal::_trsb_meterValidationFailureMessages == null)
            model_internal::calculateTrsb_meterIsValid();

        return _trsb_meterValidationFailureMessages;
    }

    model_internal function set trsb_meterValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsb_meterValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsb_meterValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsb_meterValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get is_injectorStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get is_injectorValidator() : StyleValidator
    {
        return model_internal::_is_injectorValidator;
    }

    model_internal function set _is_injectorIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_is_injectorIsValid;         
        if (oldValue !== value)
        {
            model_internal::_is_injectorIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "is_injectorIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get is_injectorIsValid():Boolean
    {
        if (!model_internal::_is_injectorIsValidCacheInitialized)
        {
            model_internal::calculateIs_injectorIsValid();
        }

        return model_internal::_is_injectorIsValid;
    }

    model_internal function calculateIs_injectorIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_is_injectorValidator.validate(model_internal::_instance.is_injector)
        model_internal::_is_injectorIsValid_der = (valRes.results == null);
        model_internal::_is_injectorIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::is_injectorValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::is_injectorValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get is_injectorValidationFailureMessages():Array
    {
        if (model_internal::_is_injectorValidationFailureMessages == null)
            model_internal::calculateIs_injectorIsValid();

        return _is_injectorValidationFailureMessages;
    }

    model_internal function set is_injectorValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_is_injectorValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_is_injectorValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "is_injectorValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsftrid_trsa_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsftrid_trsa_idValidator() : StyleValidator
    {
        return model_internal::_trsftrid_trsa_idValidator;
    }

    model_internal function set _trsftrid_trsa_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsftrid_trsa_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsftrid_trsa_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsftrid_trsa_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsftrid_trsa_idIsValid():Boolean
    {
        if (!model_internal::_trsftrid_trsa_idIsValidCacheInitialized)
        {
            model_internal::calculateTrsftrid_trsa_idIsValid();
        }

        return model_internal::_trsftrid_trsa_idIsValid;
    }

    model_internal function calculateTrsftrid_trsa_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsftrid_trsa_idValidator.validate(model_internal::_instance.trsftrid_trsa_id)
        model_internal::_trsftrid_trsa_idIsValid_der = (valRes.results == null);
        model_internal::_trsftrid_trsa_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsftrid_trsa_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsftrid_trsa_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsftrid_trsa_idValidationFailureMessages():Array
    {
        if (model_internal::_trsftrid_trsa_idValidationFailureMessages == null)
            model_internal::calculateTrsftrid_trsa_idIsValid();

        return _trsftrid_trsa_idValidationFailureMessages;
    }

    model_internal function set trsftrid_trsa_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsftrid_trsa_idValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_trsftrid_trsa_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsftrid_trsa_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }


     /**
     * 
     * @inheritDoc 
     */ 
     override public function getStyle(propertyName:String):com.adobe.fiber.styles.IStyle
     {
         switch(propertyName)
         {
            default:
            {
                return null;
            }
         }
     }
     
     /**
     * 
     * @inheritDoc 
     *  
     */  
     override public function getPropertyValidationFailureMessages(propertyName:String):Array
     {
         switch(propertyName)
         {
            case("trsf_cls_amb"):
            {
                return trsf_cls_ambValidationFailureMessages;
            }
            case("baa_bay_seq"):
            {
                return baa_bay_seqValidationFailureMessages;
            }
            case("trsf_open_kg"):
            {
                return trsf_open_kgValidationFailureMessages;
            }
            case("trsf_cls_cor"):
            {
                return trsf_cls_corValidationFailureMessages;
            }
            case("trsf_opn_cor"):
            {
                return trsf_opn_corValidationFailureMessages;
            }
            case("trsf_close_kg"):
            {
                return trsf_close_kgValidationFailureMessages;
            }
            case("trsf_opn_amb"):
            {
                return trsf_opn_ambValidationFailureMessages;
            }
            case("trsb_injector"):
            {
                return trsb_injectorValidationFailureMessages;
            }
            case("trsb_meter"):
            {
                return trsb_meterValidationFailureMessages;
            }
            case("is_injector"):
            {
                return is_injectorValidationFailureMessages;
            }
            case("trsftrid_trsa_id"):
            {
                return trsftrid_trsa_idValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
