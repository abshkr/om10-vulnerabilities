
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
import mx.collections.ArrayCollection;
import mx.events.ValidationResultEvent;
import valueObjects.Composition;
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.valueobjects.IModelType;
import mx.events.PropertyChangeEvent;

use namespace model_internal;

[ExcludeClass]
internal class _EQUIP_TYPES_VWEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("etyp_category", "etyp_isrigid", "rn", "etyp_schedul", "composition", "etyp_is_drumfill", "etyp_title", "etyp_n_items", "etyp_class", "cmptnu", "etyp_max_gross", "etyp_id");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("etyp_category", "etyp_isrigid", "rn", "etyp_schedul", "composition", "etyp_is_drumfill", "etyp_title", "etyp_n_items", "etyp_class", "cmptnu", "etyp_max_gross", "etyp_id");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("etyp_category", "etyp_isrigid", "rn", "etyp_schedul", "composition", "etyp_is_drumfill", "etyp_title", "etyp_n_items", "etyp_class", "cmptnu", "etyp_max_gross", "etyp_id");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("etyp_category", "etyp_isrigid", "rn", "etyp_schedul", "composition", "etyp_is_drumfill", "etyp_title", "etyp_n_items", "etyp_class", "cmptnu", "etyp_max_gross", "etyp_id");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("etyp_category", "etyp_isrigid", "rn", "etyp_schedul", "composition", "etyp_is_drumfill", "etyp_title", "etyp_n_items", "etyp_class", "cmptnu", "etyp_max_gross", "etyp_id");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array("composition");
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "EQUIP_TYPES_VW";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _etyp_categoryIsValid:Boolean;
    model_internal var _etyp_categoryValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_categoryIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_categoryValidationFailureMessages:Array;
    
    model_internal var _etyp_isrigidIsValid:Boolean;
    model_internal var _etyp_isrigidValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_isrigidIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_isrigidValidationFailureMessages:Array;
    
    model_internal var _etyp_schedulIsValid:Boolean;
    model_internal var _etyp_schedulValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_schedulIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_schedulValidationFailureMessages:Array;
    
    model_internal var _compositionIsValid:Boolean;
    model_internal var _compositionValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _compositionIsValidCacheInitialized:Boolean = false;
    model_internal var _compositionValidationFailureMessages:Array;
    
    model_internal var _etyp_is_drumfillIsValid:Boolean;
    model_internal var _etyp_is_drumfillValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_is_drumfillIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_is_drumfillValidationFailureMessages:Array;
    
    model_internal var _etyp_titleIsValid:Boolean;
    model_internal var _etyp_titleValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_titleIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_titleValidationFailureMessages:Array;
    
    model_internal var _etyp_n_itemsIsValid:Boolean;
    model_internal var _etyp_n_itemsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_n_itemsIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_n_itemsValidationFailureMessages:Array;
    
    model_internal var _etyp_classIsValid:Boolean;
    model_internal var _etyp_classValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_classIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_classValidationFailureMessages:Array;
    
    model_internal var _cmptnuIsValid:Boolean;
    model_internal var _cmptnuValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmptnuIsValidCacheInitialized:Boolean = false;
    model_internal var _cmptnuValidationFailureMessages:Array;
    
    model_internal var _etyp_max_grossIsValid:Boolean;
    model_internal var _etyp_max_grossValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_max_grossIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_max_grossValidationFailureMessages:Array;
    
    model_internal var _etyp_idIsValid:Boolean;
    model_internal var _etyp_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_idIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_idValidationFailureMessages:Array;

    model_internal var _instance:_Super_EQUIP_TYPES_VW;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _EQUIP_TYPES_VWEntityMetadata(value : _Super_EQUIP_TYPES_VW)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["etyp_category"] = new Array();
            model_internal::dependentsOnMap["etyp_isrigid"] = new Array();
            model_internal::dependentsOnMap["rn"] = new Array();
            model_internal::dependentsOnMap["etyp_schedul"] = new Array();
            model_internal::dependentsOnMap["composition"] = new Array();
            model_internal::dependentsOnMap["etyp_is_drumfill"] = new Array();
            model_internal::dependentsOnMap["etyp_title"] = new Array();
            model_internal::dependentsOnMap["etyp_n_items"] = new Array();
            model_internal::dependentsOnMap["etyp_class"] = new Array();
            model_internal::dependentsOnMap["cmptnu"] = new Array();
            model_internal::dependentsOnMap["etyp_max_gross"] = new Array();
            model_internal::dependentsOnMap["etyp_id"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
            model_internal::collectionBaseMap["composition"] = "valueObjects.Composition";
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["etyp_category"] = "Object";
        model_internal::propertyTypeMap["etyp_isrigid"] = "String";
        model_internal::propertyTypeMap["rn"] = "String";
        model_internal::propertyTypeMap["etyp_schedul"] = "String";
        model_internal::propertyTypeMap["composition"] = "ArrayCollection";
        model_internal::propertyTypeMap["etyp_is_drumfill"] = "String";
        model_internal::propertyTypeMap["etyp_title"] = "String";
        model_internal::propertyTypeMap["etyp_n_items"] = "String";
        model_internal::propertyTypeMap["etyp_class"] = "String";
        model_internal::propertyTypeMap["cmptnu"] = "String";
        model_internal::propertyTypeMap["etyp_max_gross"] = "String";
        model_internal::propertyTypeMap["etyp_id"] = "String";

        model_internal::_instance = value;
        model_internal::_etyp_categoryValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_category);
        model_internal::_etyp_categoryValidator.required = true;
        model_internal::_etyp_categoryValidator.requiredFieldError = "etyp_category is required";
        //model_internal::_etyp_categoryValidator.source = model_internal::_instance;
        //model_internal::_etyp_categoryValidator.property = "etyp_category";
        model_internal::_etyp_isrigidValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_isrigid);
        model_internal::_etyp_isrigidValidator.required = true;
        model_internal::_etyp_isrigidValidator.requiredFieldError = "etyp_isrigid is required";
        //model_internal::_etyp_isrigidValidator.source = model_internal::_instance;
        //model_internal::_etyp_isrigidValidator.property = "etyp_isrigid";
        model_internal::_etyp_schedulValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_schedul);
        model_internal::_etyp_schedulValidator.required = true;
        model_internal::_etyp_schedulValidator.requiredFieldError = "etyp_schedul is required";
        //model_internal::_etyp_schedulValidator.source = model_internal::_instance;
        //model_internal::_etyp_schedulValidator.property = "etyp_schedul";
        model_internal::_compositionValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForComposition);
        model_internal::_compositionValidator.required = true;
        model_internal::_compositionValidator.requiredFieldError = "composition is required";
        //model_internal::_compositionValidator.source = model_internal::_instance;
        //model_internal::_compositionValidator.property = "composition";
        model_internal::_etyp_is_drumfillValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_is_drumfill);
        model_internal::_etyp_is_drumfillValidator.required = true;
        model_internal::_etyp_is_drumfillValidator.requiredFieldError = "etyp_is_drumfill is required";
        //model_internal::_etyp_is_drumfillValidator.source = model_internal::_instance;
        //model_internal::_etyp_is_drumfillValidator.property = "etyp_is_drumfill";
        model_internal::_etyp_titleValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_title);
        model_internal::_etyp_titleValidator.required = true;
        model_internal::_etyp_titleValidator.requiredFieldError = "etyp_title is required";
        //model_internal::_etyp_titleValidator.source = model_internal::_instance;
        //model_internal::_etyp_titleValidator.property = "etyp_title";
        model_internal::_etyp_n_itemsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_n_items);
        model_internal::_etyp_n_itemsValidator.required = true;
        model_internal::_etyp_n_itemsValidator.requiredFieldError = "etyp_n_items is required";
        //model_internal::_etyp_n_itemsValidator.source = model_internal::_instance;
        //model_internal::_etyp_n_itemsValidator.property = "etyp_n_items";
        model_internal::_etyp_classValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_class);
        model_internal::_etyp_classValidator.required = true;
        model_internal::_etyp_classValidator.requiredFieldError = "etyp_class is required";
        //model_internal::_etyp_classValidator.source = model_internal::_instance;
        //model_internal::_etyp_classValidator.property = "etyp_class";
        model_internal::_cmptnuValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmptnu);
        model_internal::_cmptnuValidator.required = true;
        model_internal::_cmptnuValidator.requiredFieldError = "cmptnu is required";
        //model_internal::_cmptnuValidator.source = model_internal::_instance;
        //model_internal::_cmptnuValidator.property = "cmptnu";
        model_internal::_etyp_max_grossValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_max_gross);
        model_internal::_etyp_max_grossValidator.required = true;
        model_internal::_etyp_max_grossValidator.requiredFieldError = "etyp_max_gross is required";
        //model_internal::_etyp_max_grossValidator.source = model_internal::_instance;
        //model_internal::_etyp_max_grossValidator.property = "etyp_max_gross";
        model_internal::_etyp_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_id);
        model_internal::_etyp_idValidator.required = true;
        model_internal::_etyp_idValidator.requiredFieldError = "etyp_id is required";
        //model_internal::_etyp_idValidator.source = model_internal::_instance;
        //model_internal::_etyp_idValidator.property = "etyp_id";
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
            throw new Error(propertyName + " is not a data property of entity EQUIP_TYPES_VW");
            
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
            throw new Error(propertyName + " is not a collection property of entity EQUIP_TYPES_VW");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of EQUIP_TYPES_VW");

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
            throw new Error(propertyName + " does not exist for entity EQUIP_TYPES_VW");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity EQUIP_TYPES_VW");
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
            throw new Error(propertyName + " does not exist for entity EQUIP_TYPES_VW");
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
        returnMap["rn"] = model_internal::_instance.rn;

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
    public function get isEtyp_categoryAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_isrigidAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRnAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_schedulAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCompositionAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_is_drumfillAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_titleAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_n_itemsAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_classAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmptnuAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_max_grossAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_idAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnEtyp_category():void
    {
        if (model_internal::_etyp_categoryIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_category = null;
            model_internal::calculateEtyp_categoryIsValid();
        }
    }
    public function invalidateDependentOnEtyp_isrigid():void
    {
        if (model_internal::_etyp_isrigidIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_isrigid = null;
            model_internal::calculateEtyp_isrigidIsValid();
        }
    }
    public function invalidateDependentOnEtyp_schedul():void
    {
        if (model_internal::_etyp_schedulIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_schedul = null;
            model_internal::calculateEtyp_schedulIsValid();
        }
    }
    public function invalidateDependentOnComposition():void
    {
        if (model_internal::_compositionIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfComposition = null;
            model_internal::calculateCompositionIsValid();
        }
    }
    public function invalidateDependentOnEtyp_is_drumfill():void
    {
        if (model_internal::_etyp_is_drumfillIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_is_drumfill = null;
            model_internal::calculateEtyp_is_drumfillIsValid();
        }
    }
    public function invalidateDependentOnEtyp_title():void
    {
        if (model_internal::_etyp_titleIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_title = null;
            model_internal::calculateEtyp_titleIsValid();
        }
    }
    public function invalidateDependentOnEtyp_n_items():void
    {
        if (model_internal::_etyp_n_itemsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_n_items = null;
            model_internal::calculateEtyp_n_itemsIsValid();
        }
    }
    public function invalidateDependentOnEtyp_class():void
    {
        if (model_internal::_etyp_classIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_class = null;
            model_internal::calculateEtyp_classIsValid();
        }
    }
    public function invalidateDependentOnCmptnu():void
    {
        if (model_internal::_cmptnuIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmptnu = null;
            model_internal::calculateCmptnuIsValid();
        }
    }
    public function invalidateDependentOnEtyp_max_gross():void
    {
        if (model_internal::_etyp_max_grossIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_max_gross = null;
            model_internal::calculateEtyp_max_grossIsValid();
        }
    }
    public function invalidateDependentOnEtyp_id():void
    {
        if (model_internal::_etyp_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_id = null;
            model_internal::calculateEtyp_idIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_categoryStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_categoryValidator() : StyleValidator
    {
        return model_internal::_etyp_categoryValidator;
    }

    model_internal function set _etyp_categoryIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_categoryIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_categoryIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_categoryIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_categoryIsValid():Boolean
    {
        if (!model_internal::_etyp_categoryIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_categoryIsValid();
        }

        return model_internal::_etyp_categoryIsValid;
    }

    model_internal function calculateEtyp_categoryIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_categoryValidator.validate(model_internal::_instance.etyp_category)
        model_internal::_etyp_categoryIsValid_der = (valRes.results == null);
        model_internal::_etyp_categoryIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_categoryValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_categoryValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_categoryValidationFailureMessages():Array
    {
        if (model_internal::_etyp_categoryValidationFailureMessages == null)
            model_internal::calculateEtyp_categoryIsValid();

        return _etyp_categoryValidationFailureMessages;
    }

    model_internal function set etyp_categoryValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_categoryValidationFailureMessages;

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
            model_internal::_etyp_categoryValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_categoryValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_isrigidStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_isrigidValidator() : StyleValidator
    {
        return model_internal::_etyp_isrigidValidator;
    }

    model_internal function set _etyp_isrigidIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_isrigidIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_isrigidIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_isrigidIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_isrigidIsValid():Boolean
    {
        if (!model_internal::_etyp_isrigidIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_isrigidIsValid();
        }

        return model_internal::_etyp_isrigidIsValid;
    }

    model_internal function calculateEtyp_isrigidIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_isrigidValidator.validate(model_internal::_instance.etyp_isrigid)
        model_internal::_etyp_isrigidIsValid_der = (valRes.results == null);
        model_internal::_etyp_isrigidIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_isrigidValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_isrigidValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_isrigidValidationFailureMessages():Array
    {
        if (model_internal::_etyp_isrigidValidationFailureMessages == null)
            model_internal::calculateEtyp_isrigidIsValid();

        return _etyp_isrigidValidationFailureMessages;
    }

    model_internal function set etyp_isrigidValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_isrigidValidationFailureMessages;

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
            model_internal::_etyp_isrigidValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_isrigidValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get rnStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_schedulStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_schedulValidator() : StyleValidator
    {
        return model_internal::_etyp_schedulValidator;
    }

    model_internal function set _etyp_schedulIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_schedulIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_schedulIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_schedulIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_schedulIsValid():Boolean
    {
        if (!model_internal::_etyp_schedulIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_schedulIsValid();
        }

        return model_internal::_etyp_schedulIsValid;
    }

    model_internal function calculateEtyp_schedulIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_schedulValidator.validate(model_internal::_instance.etyp_schedul)
        model_internal::_etyp_schedulIsValid_der = (valRes.results == null);
        model_internal::_etyp_schedulIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_schedulValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_schedulValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_schedulValidationFailureMessages():Array
    {
        if (model_internal::_etyp_schedulValidationFailureMessages == null)
            model_internal::calculateEtyp_schedulIsValid();

        return _etyp_schedulValidationFailureMessages;
    }

    model_internal function set etyp_schedulValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_schedulValidationFailureMessages;

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
            model_internal::_etyp_schedulValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_schedulValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get compositionStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get compositionValidator() : StyleValidator
    {
        return model_internal::_compositionValidator;
    }

    model_internal function set _compositionIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_compositionIsValid;         
        if (oldValue !== value)
        {
            model_internal::_compositionIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "compositionIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get compositionIsValid():Boolean
    {
        if (!model_internal::_compositionIsValidCacheInitialized)
        {
            model_internal::calculateCompositionIsValid();
        }

        return model_internal::_compositionIsValid;
    }

    model_internal function calculateCompositionIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_compositionValidator.validate(model_internal::_instance.composition)
        model_internal::_compositionIsValid_der = (valRes.results == null);
        model_internal::_compositionIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::compositionValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::compositionValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get compositionValidationFailureMessages():Array
    {
        if (model_internal::_compositionValidationFailureMessages == null)
            model_internal::calculateCompositionIsValid();

        return _compositionValidationFailureMessages;
    }

    model_internal function set compositionValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_compositionValidationFailureMessages;

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
            model_internal::_compositionValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "compositionValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_is_drumfillStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_is_drumfillValidator() : StyleValidator
    {
        return model_internal::_etyp_is_drumfillValidator;
    }

    model_internal function set _etyp_is_drumfillIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_is_drumfillIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_is_drumfillIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_is_drumfillIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_is_drumfillIsValid():Boolean
    {
        if (!model_internal::_etyp_is_drumfillIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_is_drumfillIsValid();
        }

        return model_internal::_etyp_is_drumfillIsValid;
    }

    model_internal function calculateEtyp_is_drumfillIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_is_drumfillValidator.validate(model_internal::_instance.etyp_is_drumfill)
        model_internal::_etyp_is_drumfillIsValid_der = (valRes.results == null);
        model_internal::_etyp_is_drumfillIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_is_drumfillValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_is_drumfillValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_is_drumfillValidationFailureMessages():Array
    {
        if (model_internal::_etyp_is_drumfillValidationFailureMessages == null)
            model_internal::calculateEtyp_is_drumfillIsValid();

        return _etyp_is_drumfillValidationFailureMessages;
    }

    model_internal function set etyp_is_drumfillValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_is_drumfillValidationFailureMessages;

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
            model_internal::_etyp_is_drumfillValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_is_drumfillValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_titleStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_titleValidator() : StyleValidator
    {
        return model_internal::_etyp_titleValidator;
    }

    model_internal function set _etyp_titleIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_titleIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_titleIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_titleIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_titleIsValid():Boolean
    {
        if (!model_internal::_etyp_titleIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_titleIsValid();
        }

        return model_internal::_etyp_titleIsValid;
    }

    model_internal function calculateEtyp_titleIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_titleValidator.validate(model_internal::_instance.etyp_title)
        model_internal::_etyp_titleIsValid_der = (valRes.results == null);
        model_internal::_etyp_titleIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_titleValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_titleValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_titleValidationFailureMessages():Array
    {
        if (model_internal::_etyp_titleValidationFailureMessages == null)
            model_internal::calculateEtyp_titleIsValid();

        return _etyp_titleValidationFailureMessages;
    }

    model_internal function set etyp_titleValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_titleValidationFailureMessages;

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
            model_internal::_etyp_titleValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_titleValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_n_itemsStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_n_itemsValidator() : StyleValidator
    {
        return model_internal::_etyp_n_itemsValidator;
    }

    model_internal function set _etyp_n_itemsIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_n_itemsIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_n_itemsIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_n_itemsIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_n_itemsIsValid():Boolean
    {
        if (!model_internal::_etyp_n_itemsIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_n_itemsIsValid();
        }

        return model_internal::_etyp_n_itemsIsValid;
    }

    model_internal function calculateEtyp_n_itemsIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_n_itemsValidator.validate(model_internal::_instance.etyp_n_items)
        model_internal::_etyp_n_itemsIsValid_der = (valRes.results == null);
        model_internal::_etyp_n_itemsIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_n_itemsValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_n_itemsValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_n_itemsValidationFailureMessages():Array
    {
        if (model_internal::_etyp_n_itemsValidationFailureMessages == null)
            model_internal::calculateEtyp_n_itemsIsValid();

        return _etyp_n_itemsValidationFailureMessages;
    }

    model_internal function set etyp_n_itemsValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_n_itemsValidationFailureMessages;

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
            model_internal::_etyp_n_itemsValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_n_itemsValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_classStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_classValidator() : StyleValidator
    {
        return model_internal::_etyp_classValidator;
    }

    model_internal function set _etyp_classIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_classIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_classIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_classIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_classIsValid():Boolean
    {
        if (!model_internal::_etyp_classIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_classIsValid();
        }

        return model_internal::_etyp_classIsValid;
    }

    model_internal function calculateEtyp_classIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_classValidator.validate(model_internal::_instance.etyp_class)
        model_internal::_etyp_classIsValid_der = (valRes.results == null);
        model_internal::_etyp_classIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_classValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_classValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_classValidationFailureMessages():Array
    {
        if (model_internal::_etyp_classValidationFailureMessages == null)
            model_internal::calculateEtyp_classIsValid();

        return _etyp_classValidationFailureMessages;
    }

    model_internal function set etyp_classValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_classValidationFailureMessages;

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
            model_internal::_etyp_classValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_classValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmptnuStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmptnuValidator() : StyleValidator
    {
        return model_internal::_cmptnuValidator;
    }

    model_internal function set _cmptnuIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmptnuIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmptnuIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmptnuIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmptnuIsValid():Boolean
    {
        if (!model_internal::_cmptnuIsValidCacheInitialized)
        {
            model_internal::calculateCmptnuIsValid();
        }

        return model_internal::_cmptnuIsValid;
    }

    model_internal function calculateCmptnuIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmptnuValidator.validate(model_internal::_instance.cmptnu)
        model_internal::_cmptnuIsValid_der = (valRes.results == null);
        model_internal::_cmptnuIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmptnuValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmptnuValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmptnuValidationFailureMessages():Array
    {
        if (model_internal::_cmptnuValidationFailureMessages == null)
            model_internal::calculateCmptnuIsValid();

        return _cmptnuValidationFailureMessages;
    }

    model_internal function set cmptnuValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmptnuValidationFailureMessages;

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
            model_internal::_cmptnuValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmptnuValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_max_grossStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_max_grossValidator() : StyleValidator
    {
        return model_internal::_etyp_max_grossValidator;
    }

    model_internal function set _etyp_max_grossIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_max_grossIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_max_grossIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_max_grossIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_max_grossIsValid():Boolean
    {
        if (!model_internal::_etyp_max_grossIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_max_grossIsValid();
        }

        return model_internal::_etyp_max_grossIsValid;
    }

    model_internal function calculateEtyp_max_grossIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_max_grossValidator.validate(model_internal::_instance.etyp_max_gross)
        model_internal::_etyp_max_grossIsValid_der = (valRes.results == null);
        model_internal::_etyp_max_grossIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_max_grossValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_max_grossValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_max_grossValidationFailureMessages():Array
    {
        if (model_internal::_etyp_max_grossValidationFailureMessages == null)
            model_internal::calculateEtyp_max_grossIsValid();

        return _etyp_max_grossValidationFailureMessages;
    }

    model_internal function set etyp_max_grossValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_max_grossValidationFailureMessages;

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
            model_internal::_etyp_max_grossValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_max_grossValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_idValidator() : StyleValidator
    {
        return model_internal::_etyp_idValidator;
    }

    model_internal function set _etyp_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_idIsValid():Boolean
    {
        if (!model_internal::_etyp_idIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_idIsValid();
        }

        return model_internal::_etyp_idIsValid;
    }

    model_internal function calculateEtyp_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_idValidator.validate(model_internal::_instance.etyp_id)
        model_internal::_etyp_idIsValid_der = (valRes.results == null);
        model_internal::_etyp_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_idValidationFailureMessages():Array
    {
        if (model_internal::_etyp_idValidationFailureMessages == null)
            model_internal::calculateEtyp_idIsValid();

        return _etyp_idValidationFailureMessages;
    }

    model_internal function set etyp_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_idValidationFailureMessages;

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
            model_internal::_etyp_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_idValidationFailureMessages", oldValue, value));
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
            case("etyp_category"):
            {
                return etyp_categoryValidationFailureMessages;
            }
            case("etyp_isrigid"):
            {
                return etyp_isrigidValidationFailureMessages;
            }
            case("etyp_schedul"):
            {
                return etyp_schedulValidationFailureMessages;
            }
            case("composition"):
            {
                return compositionValidationFailureMessages;
            }
            case("etyp_is_drumfill"):
            {
                return etyp_is_drumfillValidationFailureMessages;
            }
            case("etyp_title"):
            {
                return etyp_titleValidationFailureMessages;
            }
            case("etyp_n_items"):
            {
                return etyp_n_itemsValidationFailureMessages;
            }
            case("etyp_class"):
            {
                return etyp_classValidationFailureMessages;
            }
            case("cmptnu"):
            {
                return cmptnuValidationFailureMessages;
            }
            case("etyp_max_gross"):
            {
                return etyp_max_grossValidationFailureMessages;
            }
            case("etyp_id"):
            {
                return etyp_idValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
