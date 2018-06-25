
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
internal class _TransactionsEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("trsa_trip", "trsa_ed_dmy", "trsa_drawer", "trsa_carrier", "trsa_st_dmy", "rn", "trsa_per_name", "trsa_crt_dmy", "trsa_reverse_flag", "trsa_reverse", "trsa_bay_cd", "trsa_supplier", "trsa_psn", "trsa_terminal", "trsa_id", "trsa_tanker");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("trsa_trip", "trsa_ed_dmy", "trsa_drawer", "trsa_carrier", "trsa_st_dmy", "rn", "trsa_per_name", "trsa_crt_dmy", "trsa_reverse_flag", "trsa_reverse", "trsa_bay_cd", "trsa_supplier", "trsa_psn", "trsa_terminal", "trsa_id", "trsa_tanker");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("trsa_trip", "trsa_ed_dmy", "trsa_drawer", "trsa_carrier", "trsa_st_dmy", "rn", "trsa_per_name", "trsa_crt_dmy", "trsa_reverse_flag", "trsa_reverse", "trsa_bay_cd", "trsa_supplier", "trsa_psn", "trsa_terminal", "trsa_id", "trsa_tanker");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("trsa_trip", "trsa_ed_dmy", "trsa_drawer", "trsa_carrier", "trsa_st_dmy", "rn", "trsa_per_name", "trsa_crt_dmy", "trsa_reverse_flag", "trsa_reverse", "trsa_bay_cd", "trsa_supplier", "trsa_psn", "trsa_terminal", "trsa_id", "trsa_tanker");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("trsa_trip", "trsa_ed_dmy", "trsa_drawer", "trsa_carrier", "trsa_st_dmy", "rn", "trsa_per_name", "trsa_crt_dmy", "trsa_reverse_flag", "trsa_reverse", "trsa_bay_cd", "trsa_supplier", "trsa_psn", "trsa_terminal", "trsa_id", "trsa_tanker");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "Transactions";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _trsa_tripIsValid:Boolean;
    model_internal var _trsa_tripValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsa_tripIsValidCacheInitialized:Boolean = false;
    model_internal var _trsa_tripValidationFailureMessages:Array;
    
    model_internal var _trsa_ed_dmyIsValid:Boolean;
    model_internal var _trsa_ed_dmyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsa_ed_dmyIsValidCacheInitialized:Boolean = false;
    model_internal var _trsa_ed_dmyValidationFailureMessages:Array;
    
    model_internal var _trsa_drawerIsValid:Boolean;
    model_internal var _trsa_drawerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsa_drawerIsValidCacheInitialized:Boolean = false;
    model_internal var _trsa_drawerValidationFailureMessages:Array;
    
    model_internal var _trsa_carrierIsValid:Boolean;
    model_internal var _trsa_carrierValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsa_carrierIsValidCacheInitialized:Boolean = false;
    model_internal var _trsa_carrierValidationFailureMessages:Array;
    
    model_internal var _trsa_st_dmyIsValid:Boolean;
    model_internal var _trsa_st_dmyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsa_st_dmyIsValidCacheInitialized:Boolean = false;
    model_internal var _trsa_st_dmyValidationFailureMessages:Array;
    
    model_internal var _trsa_per_nameIsValid:Boolean;
    model_internal var _trsa_per_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsa_per_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _trsa_per_nameValidationFailureMessages:Array;
    
    model_internal var _trsa_crt_dmyIsValid:Boolean;
    model_internal var _trsa_crt_dmyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsa_crt_dmyIsValidCacheInitialized:Boolean = false;
    model_internal var _trsa_crt_dmyValidationFailureMessages:Array;
    
    model_internal var _trsa_reverse_flagIsValid:Boolean;
    model_internal var _trsa_reverse_flagValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsa_reverse_flagIsValidCacheInitialized:Boolean = false;
    model_internal var _trsa_reverse_flagValidationFailureMessages:Array;
    
    model_internal var _trsa_reverseIsValid:Boolean;
    model_internal var _trsa_reverseValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsa_reverseIsValidCacheInitialized:Boolean = false;
    model_internal var _trsa_reverseValidationFailureMessages:Array;
    
    model_internal var _trsa_bay_cdIsValid:Boolean;
    model_internal var _trsa_bay_cdValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsa_bay_cdIsValidCacheInitialized:Boolean = false;
    model_internal var _trsa_bay_cdValidationFailureMessages:Array;
    
    model_internal var _trsa_supplierIsValid:Boolean;
    model_internal var _trsa_supplierValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsa_supplierIsValidCacheInitialized:Boolean = false;
    model_internal var _trsa_supplierValidationFailureMessages:Array;
    
    model_internal var _trsa_psnIsValid:Boolean;
    model_internal var _trsa_psnValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsa_psnIsValidCacheInitialized:Boolean = false;
    model_internal var _trsa_psnValidationFailureMessages:Array;
    
    model_internal var _trsa_terminalIsValid:Boolean;
    model_internal var _trsa_terminalValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsa_terminalIsValidCacheInitialized:Boolean = false;
    model_internal var _trsa_terminalValidationFailureMessages:Array;
    
    model_internal var _trsa_idIsValid:Boolean;
    model_internal var _trsa_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsa_idIsValidCacheInitialized:Boolean = false;
    model_internal var _trsa_idValidationFailureMessages:Array;
    
    model_internal var _trsa_tankerIsValid:Boolean;
    model_internal var _trsa_tankerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsa_tankerIsValidCacheInitialized:Boolean = false;
    model_internal var _trsa_tankerValidationFailureMessages:Array;

    model_internal var _instance:_Super_Transactions;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _TransactionsEntityMetadata(value : _Super_Transactions)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["trsa_trip"] = new Array();
            model_internal::dependentsOnMap["trsa_ed_dmy"] = new Array();
            model_internal::dependentsOnMap["trsa_drawer"] = new Array();
            model_internal::dependentsOnMap["trsa_carrier"] = new Array();
            model_internal::dependentsOnMap["trsa_st_dmy"] = new Array();
            model_internal::dependentsOnMap["rn"] = new Array();
            model_internal::dependentsOnMap["trsa_per_name"] = new Array();
            model_internal::dependentsOnMap["trsa_crt_dmy"] = new Array();
            model_internal::dependentsOnMap["trsa_reverse_flag"] = new Array();
            model_internal::dependentsOnMap["trsa_reverse"] = new Array();
            model_internal::dependentsOnMap["trsa_bay_cd"] = new Array();
            model_internal::dependentsOnMap["trsa_supplier"] = new Array();
            model_internal::dependentsOnMap["trsa_psn"] = new Array();
            model_internal::dependentsOnMap["trsa_terminal"] = new Array();
            model_internal::dependentsOnMap["trsa_id"] = new Array();
            model_internal::dependentsOnMap["trsa_tanker"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["trsa_trip"] = "String";
        model_internal::propertyTypeMap["trsa_ed_dmy"] = "String";
        model_internal::propertyTypeMap["trsa_drawer"] = "String";
        model_internal::propertyTypeMap["trsa_carrier"] = "String";
        model_internal::propertyTypeMap["trsa_st_dmy"] = "String";
        model_internal::propertyTypeMap["rn"] = "String";
        model_internal::propertyTypeMap["trsa_per_name"] = "String";
        model_internal::propertyTypeMap["trsa_crt_dmy"] = "String";
        model_internal::propertyTypeMap["trsa_reverse_flag"] = "String";
        model_internal::propertyTypeMap["trsa_reverse"] = "String";
        model_internal::propertyTypeMap["trsa_bay_cd"] = "String";
        model_internal::propertyTypeMap["trsa_supplier"] = "String";
        model_internal::propertyTypeMap["trsa_psn"] = "Object";
        model_internal::propertyTypeMap["trsa_terminal"] = "String";
        model_internal::propertyTypeMap["trsa_id"] = "String";
        model_internal::propertyTypeMap["trsa_tanker"] = "String";

        model_internal::_instance = value;
        model_internal::_trsa_tripValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsa_trip);
        model_internal::_trsa_tripValidator.required = true;
        model_internal::_trsa_tripValidator.requiredFieldError = "trsa_trip is required";
        //model_internal::_trsa_tripValidator.source = model_internal::_instance;
        //model_internal::_trsa_tripValidator.property = "trsa_trip";
        model_internal::_trsa_ed_dmyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsa_ed_dmy);
        model_internal::_trsa_ed_dmyValidator.required = true;
        model_internal::_trsa_ed_dmyValidator.requiredFieldError = "trsa_ed_dmy is required";
        //model_internal::_trsa_ed_dmyValidator.source = model_internal::_instance;
        //model_internal::_trsa_ed_dmyValidator.property = "trsa_ed_dmy";
        model_internal::_trsa_drawerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsa_drawer);
        model_internal::_trsa_drawerValidator.required = true;
        model_internal::_trsa_drawerValidator.requiredFieldError = "trsa_drawer is required";
        //model_internal::_trsa_drawerValidator.source = model_internal::_instance;
        //model_internal::_trsa_drawerValidator.property = "trsa_drawer";
        model_internal::_trsa_carrierValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsa_carrier);
        model_internal::_trsa_carrierValidator.required = true;
        model_internal::_trsa_carrierValidator.requiredFieldError = "trsa_carrier is required";
        //model_internal::_trsa_carrierValidator.source = model_internal::_instance;
        //model_internal::_trsa_carrierValidator.property = "trsa_carrier";
        model_internal::_trsa_st_dmyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsa_st_dmy);
        model_internal::_trsa_st_dmyValidator.required = true;
        model_internal::_trsa_st_dmyValidator.requiredFieldError = "trsa_st_dmy is required";
        //model_internal::_trsa_st_dmyValidator.source = model_internal::_instance;
        //model_internal::_trsa_st_dmyValidator.property = "trsa_st_dmy";
        model_internal::_trsa_per_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsa_per_name);
        model_internal::_trsa_per_nameValidator.required = true;
        model_internal::_trsa_per_nameValidator.requiredFieldError = "trsa_per_name is required";
        //model_internal::_trsa_per_nameValidator.source = model_internal::_instance;
        //model_internal::_trsa_per_nameValidator.property = "trsa_per_name";
        model_internal::_trsa_crt_dmyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsa_crt_dmy);
        model_internal::_trsa_crt_dmyValidator.required = true;
        model_internal::_trsa_crt_dmyValidator.requiredFieldError = "trsa_crt_dmy is required";
        //model_internal::_trsa_crt_dmyValidator.source = model_internal::_instance;
        //model_internal::_trsa_crt_dmyValidator.property = "trsa_crt_dmy";
        model_internal::_trsa_reverse_flagValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsa_reverse_flag);
        model_internal::_trsa_reverse_flagValidator.required = true;
        model_internal::_trsa_reverse_flagValidator.requiredFieldError = "trsa_reverse_flag is required";
        //model_internal::_trsa_reverse_flagValidator.source = model_internal::_instance;
        //model_internal::_trsa_reverse_flagValidator.property = "trsa_reverse_flag";
        model_internal::_trsa_reverseValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsa_reverse);
        model_internal::_trsa_reverseValidator.required = true;
        model_internal::_trsa_reverseValidator.requiredFieldError = "trsa_reverse is required";
        //model_internal::_trsa_reverseValidator.source = model_internal::_instance;
        //model_internal::_trsa_reverseValidator.property = "trsa_reverse";
        model_internal::_trsa_bay_cdValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsa_bay_cd);
        model_internal::_trsa_bay_cdValidator.required = true;
        model_internal::_trsa_bay_cdValidator.requiredFieldError = "trsa_bay_cd is required";
        //model_internal::_trsa_bay_cdValidator.source = model_internal::_instance;
        //model_internal::_trsa_bay_cdValidator.property = "trsa_bay_cd";
        model_internal::_trsa_supplierValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsa_supplier);
        model_internal::_trsa_supplierValidator.required = true;
        model_internal::_trsa_supplierValidator.requiredFieldError = "trsa_supplier is required";
        //model_internal::_trsa_supplierValidator.source = model_internal::_instance;
        //model_internal::_trsa_supplierValidator.property = "trsa_supplier";
        model_internal::_trsa_psnValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsa_psn);
        model_internal::_trsa_psnValidator.required = true;
        model_internal::_trsa_psnValidator.requiredFieldError = "trsa_psn is required";
        //model_internal::_trsa_psnValidator.source = model_internal::_instance;
        //model_internal::_trsa_psnValidator.property = "trsa_psn";
        model_internal::_trsa_terminalValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsa_terminal);
        model_internal::_trsa_terminalValidator.required = true;
        model_internal::_trsa_terminalValidator.requiredFieldError = "trsa_terminal is required";
        //model_internal::_trsa_terminalValidator.source = model_internal::_instance;
        //model_internal::_trsa_terminalValidator.property = "trsa_terminal";
        model_internal::_trsa_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsa_id);
        model_internal::_trsa_idValidator.required = true;
        model_internal::_trsa_idValidator.requiredFieldError = "trsa_id is required";
        //model_internal::_trsa_idValidator.source = model_internal::_instance;
        //model_internal::_trsa_idValidator.property = "trsa_id";
        model_internal::_trsa_tankerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsa_tanker);
        model_internal::_trsa_tankerValidator.required = true;
        model_internal::_trsa_tankerValidator.requiredFieldError = "trsa_tanker is required";
        //model_internal::_trsa_tankerValidator.source = model_internal::_instance;
        //model_internal::_trsa_tankerValidator.property = "trsa_tanker";
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
            throw new Error(propertyName + " is not a data property of entity Transactions");
            
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
            throw new Error(propertyName + " is not a collection property of entity Transactions");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of Transactions");

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
            throw new Error(propertyName + " does not exist for entity Transactions");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity Transactions");
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
            throw new Error(propertyName + " does not exist for entity Transactions");
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
    public function get isTrsa_tripAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsa_ed_dmyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsa_drawerAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsa_carrierAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsa_st_dmyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRnAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsa_per_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsa_crt_dmyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsa_reverse_flagAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsa_reverseAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsa_bay_cdAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsa_supplierAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsa_psnAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsa_terminalAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsa_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsa_tankerAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnTrsa_trip():void
    {
        if (model_internal::_trsa_tripIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsa_trip = null;
            model_internal::calculateTrsa_tripIsValid();
        }
    }
    public function invalidateDependentOnTrsa_ed_dmy():void
    {
        if (model_internal::_trsa_ed_dmyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsa_ed_dmy = null;
            model_internal::calculateTrsa_ed_dmyIsValid();
        }
    }
    public function invalidateDependentOnTrsa_drawer():void
    {
        if (model_internal::_trsa_drawerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsa_drawer = null;
            model_internal::calculateTrsa_drawerIsValid();
        }
    }
    public function invalidateDependentOnTrsa_carrier():void
    {
        if (model_internal::_trsa_carrierIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsa_carrier = null;
            model_internal::calculateTrsa_carrierIsValid();
        }
    }
    public function invalidateDependentOnTrsa_st_dmy():void
    {
        if (model_internal::_trsa_st_dmyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsa_st_dmy = null;
            model_internal::calculateTrsa_st_dmyIsValid();
        }
    }
    public function invalidateDependentOnTrsa_per_name():void
    {
        if (model_internal::_trsa_per_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsa_per_name = null;
            model_internal::calculateTrsa_per_nameIsValid();
        }
    }
    public function invalidateDependentOnTrsa_crt_dmy():void
    {
        if (model_internal::_trsa_crt_dmyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsa_crt_dmy = null;
            model_internal::calculateTrsa_crt_dmyIsValid();
        }
    }
    public function invalidateDependentOnTrsa_reverse_flag():void
    {
        if (model_internal::_trsa_reverse_flagIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsa_reverse_flag = null;
            model_internal::calculateTrsa_reverse_flagIsValid();
        }
    }
    public function invalidateDependentOnTrsa_reverse():void
    {
        if (model_internal::_trsa_reverseIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsa_reverse = null;
            model_internal::calculateTrsa_reverseIsValid();
        }
    }
    public function invalidateDependentOnTrsa_bay_cd():void
    {
        if (model_internal::_trsa_bay_cdIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsa_bay_cd = null;
            model_internal::calculateTrsa_bay_cdIsValid();
        }
    }
    public function invalidateDependentOnTrsa_supplier():void
    {
        if (model_internal::_trsa_supplierIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsa_supplier = null;
            model_internal::calculateTrsa_supplierIsValid();
        }
    }
    public function invalidateDependentOnTrsa_psn():void
    {
        if (model_internal::_trsa_psnIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsa_psn = null;
            model_internal::calculateTrsa_psnIsValid();
        }
    }
    public function invalidateDependentOnTrsa_terminal():void
    {
        if (model_internal::_trsa_terminalIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsa_terminal = null;
            model_internal::calculateTrsa_terminalIsValid();
        }
    }
    public function invalidateDependentOnTrsa_id():void
    {
        if (model_internal::_trsa_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsa_id = null;
            model_internal::calculateTrsa_idIsValid();
        }
    }
    public function invalidateDependentOnTrsa_tanker():void
    {
        if (model_internal::_trsa_tankerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsa_tanker = null;
            model_internal::calculateTrsa_tankerIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get trsa_tripStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsa_tripValidator() : StyleValidator
    {
        return model_internal::_trsa_tripValidator;
    }

    model_internal function set _trsa_tripIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsa_tripIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsa_tripIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_tripIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsa_tripIsValid():Boolean
    {
        if (!model_internal::_trsa_tripIsValidCacheInitialized)
        {
            model_internal::calculateTrsa_tripIsValid();
        }

        return model_internal::_trsa_tripIsValid;
    }

    model_internal function calculateTrsa_tripIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsa_tripValidator.validate(model_internal::_instance.trsa_trip)
        model_internal::_trsa_tripIsValid_der = (valRes.results == null);
        model_internal::_trsa_tripIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsa_tripValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsa_tripValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsa_tripValidationFailureMessages():Array
    {
        if (model_internal::_trsa_tripValidationFailureMessages == null)
            model_internal::calculateTrsa_tripIsValid();

        return _trsa_tripValidationFailureMessages;
    }

    model_internal function set trsa_tripValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsa_tripValidationFailureMessages;

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
            model_internal::_trsa_tripValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_tripValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsa_ed_dmyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsa_ed_dmyValidator() : StyleValidator
    {
        return model_internal::_trsa_ed_dmyValidator;
    }

    model_internal function set _trsa_ed_dmyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsa_ed_dmyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsa_ed_dmyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_ed_dmyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsa_ed_dmyIsValid():Boolean
    {
        if (!model_internal::_trsa_ed_dmyIsValidCacheInitialized)
        {
            model_internal::calculateTrsa_ed_dmyIsValid();
        }

        return model_internal::_trsa_ed_dmyIsValid;
    }

    model_internal function calculateTrsa_ed_dmyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsa_ed_dmyValidator.validate(model_internal::_instance.trsa_ed_dmy)
        model_internal::_trsa_ed_dmyIsValid_der = (valRes.results == null);
        model_internal::_trsa_ed_dmyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsa_ed_dmyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsa_ed_dmyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsa_ed_dmyValidationFailureMessages():Array
    {
        if (model_internal::_trsa_ed_dmyValidationFailureMessages == null)
            model_internal::calculateTrsa_ed_dmyIsValid();

        return _trsa_ed_dmyValidationFailureMessages;
    }

    model_internal function set trsa_ed_dmyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsa_ed_dmyValidationFailureMessages;

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
            model_internal::_trsa_ed_dmyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_ed_dmyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsa_drawerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsa_drawerValidator() : StyleValidator
    {
        return model_internal::_trsa_drawerValidator;
    }

    model_internal function set _trsa_drawerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsa_drawerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsa_drawerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_drawerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsa_drawerIsValid():Boolean
    {
        if (!model_internal::_trsa_drawerIsValidCacheInitialized)
        {
            model_internal::calculateTrsa_drawerIsValid();
        }

        return model_internal::_trsa_drawerIsValid;
    }

    model_internal function calculateTrsa_drawerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsa_drawerValidator.validate(model_internal::_instance.trsa_drawer)
        model_internal::_trsa_drawerIsValid_der = (valRes.results == null);
        model_internal::_trsa_drawerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsa_drawerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsa_drawerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsa_drawerValidationFailureMessages():Array
    {
        if (model_internal::_trsa_drawerValidationFailureMessages == null)
            model_internal::calculateTrsa_drawerIsValid();

        return _trsa_drawerValidationFailureMessages;
    }

    model_internal function set trsa_drawerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsa_drawerValidationFailureMessages;

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
            model_internal::_trsa_drawerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_drawerValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsa_carrierStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsa_carrierValidator() : StyleValidator
    {
        return model_internal::_trsa_carrierValidator;
    }

    model_internal function set _trsa_carrierIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsa_carrierIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsa_carrierIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_carrierIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsa_carrierIsValid():Boolean
    {
        if (!model_internal::_trsa_carrierIsValidCacheInitialized)
        {
            model_internal::calculateTrsa_carrierIsValid();
        }

        return model_internal::_trsa_carrierIsValid;
    }

    model_internal function calculateTrsa_carrierIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsa_carrierValidator.validate(model_internal::_instance.trsa_carrier)
        model_internal::_trsa_carrierIsValid_der = (valRes.results == null);
        model_internal::_trsa_carrierIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsa_carrierValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsa_carrierValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsa_carrierValidationFailureMessages():Array
    {
        if (model_internal::_trsa_carrierValidationFailureMessages == null)
            model_internal::calculateTrsa_carrierIsValid();

        return _trsa_carrierValidationFailureMessages;
    }

    model_internal function set trsa_carrierValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsa_carrierValidationFailureMessages;

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
            model_internal::_trsa_carrierValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_carrierValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsa_st_dmyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsa_st_dmyValidator() : StyleValidator
    {
        return model_internal::_trsa_st_dmyValidator;
    }

    model_internal function set _trsa_st_dmyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsa_st_dmyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsa_st_dmyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_st_dmyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsa_st_dmyIsValid():Boolean
    {
        if (!model_internal::_trsa_st_dmyIsValidCacheInitialized)
        {
            model_internal::calculateTrsa_st_dmyIsValid();
        }

        return model_internal::_trsa_st_dmyIsValid;
    }

    model_internal function calculateTrsa_st_dmyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsa_st_dmyValidator.validate(model_internal::_instance.trsa_st_dmy)
        model_internal::_trsa_st_dmyIsValid_der = (valRes.results == null);
        model_internal::_trsa_st_dmyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsa_st_dmyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsa_st_dmyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsa_st_dmyValidationFailureMessages():Array
    {
        if (model_internal::_trsa_st_dmyValidationFailureMessages == null)
            model_internal::calculateTrsa_st_dmyIsValid();

        return _trsa_st_dmyValidationFailureMessages;
    }

    model_internal function set trsa_st_dmyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsa_st_dmyValidationFailureMessages;

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
            model_internal::_trsa_st_dmyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_st_dmyValidationFailureMessages", oldValue, value));
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
    public function get trsa_per_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsa_per_nameValidator() : StyleValidator
    {
        return model_internal::_trsa_per_nameValidator;
    }

    model_internal function set _trsa_per_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsa_per_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsa_per_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_per_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsa_per_nameIsValid():Boolean
    {
        if (!model_internal::_trsa_per_nameIsValidCacheInitialized)
        {
            model_internal::calculateTrsa_per_nameIsValid();
        }

        return model_internal::_trsa_per_nameIsValid;
    }

    model_internal function calculateTrsa_per_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsa_per_nameValidator.validate(model_internal::_instance.trsa_per_name)
        model_internal::_trsa_per_nameIsValid_der = (valRes.results == null);
        model_internal::_trsa_per_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsa_per_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsa_per_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsa_per_nameValidationFailureMessages():Array
    {
        if (model_internal::_trsa_per_nameValidationFailureMessages == null)
            model_internal::calculateTrsa_per_nameIsValid();

        return _trsa_per_nameValidationFailureMessages;
    }

    model_internal function set trsa_per_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsa_per_nameValidationFailureMessages;

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
            model_internal::_trsa_per_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_per_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsa_crt_dmyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsa_crt_dmyValidator() : StyleValidator
    {
        return model_internal::_trsa_crt_dmyValidator;
    }

    model_internal function set _trsa_crt_dmyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsa_crt_dmyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsa_crt_dmyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_crt_dmyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsa_crt_dmyIsValid():Boolean
    {
        if (!model_internal::_trsa_crt_dmyIsValidCacheInitialized)
        {
            model_internal::calculateTrsa_crt_dmyIsValid();
        }

        return model_internal::_trsa_crt_dmyIsValid;
    }

    model_internal function calculateTrsa_crt_dmyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsa_crt_dmyValidator.validate(model_internal::_instance.trsa_crt_dmy)
        model_internal::_trsa_crt_dmyIsValid_der = (valRes.results == null);
        model_internal::_trsa_crt_dmyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsa_crt_dmyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsa_crt_dmyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsa_crt_dmyValidationFailureMessages():Array
    {
        if (model_internal::_trsa_crt_dmyValidationFailureMessages == null)
            model_internal::calculateTrsa_crt_dmyIsValid();

        return _trsa_crt_dmyValidationFailureMessages;
    }

    model_internal function set trsa_crt_dmyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsa_crt_dmyValidationFailureMessages;

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
            model_internal::_trsa_crt_dmyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_crt_dmyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsa_reverse_flagStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsa_reverse_flagValidator() : StyleValidator
    {
        return model_internal::_trsa_reverse_flagValidator;
    }

    model_internal function set _trsa_reverse_flagIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsa_reverse_flagIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsa_reverse_flagIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_reverse_flagIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsa_reverse_flagIsValid():Boolean
    {
        if (!model_internal::_trsa_reverse_flagIsValidCacheInitialized)
        {
            model_internal::calculateTrsa_reverse_flagIsValid();
        }

        return model_internal::_trsa_reverse_flagIsValid;
    }

    model_internal function calculateTrsa_reverse_flagIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsa_reverse_flagValidator.validate(model_internal::_instance.trsa_reverse_flag)
        model_internal::_trsa_reverse_flagIsValid_der = (valRes.results == null);
        model_internal::_trsa_reverse_flagIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsa_reverse_flagValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsa_reverse_flagValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsa_reverse_flagValidationFailureMessages():Array
    {
        if (model_internal::_trsa_reverse_flagValidationFailureMessages == null)
            model_internal::calculateTrsa_reverse_flagIsValid();

        return _trsa_reverse_flagValidationFailureMessages;
    }

    model_internal function set trsa_reverse_flagValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsa_reverse_flagValidationFailureMessages;

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
            model_internal::_trsa_reverse_flagValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_reverse_flagValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsa_reverseStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsa_reverseValidator() : StyleValidator
    {
        return model_internal::_trsa_reverseValidator;
    }

    model_internal function set _trsa_reverseIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsa_reverseIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsa_reverseIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_reverseIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsa_reverseIsValid():Boolean
    {
        if (!model_internal::_trsa_reverseIsValidCacheInitialized)
        {
            model_internal::calculateTrsa_reverseIsValid();
        }

        return model_internal::_trsa_reverseIsValid;
    }

    model_internal function calculateTrsa_reverseIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsa_reverseValidator.validate(model_internal::_instance.trsa_reverse)
        model_internal::_trsa_reverseIsValid_der = (valRes.results == null);
        model_internal::_trsa_reverseIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsa_reverseValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsa_reverseValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsa_reverseValidationFailureMessages():Array
    {
        if (model_internal::_trsa_reverseValidationFailureMessages == null)
            model_internal::calculateTrsa_reverseIsValid();

        return _trsa_reverseValidationFailureMessages;
    }

    model_internal function set trsa_reverseValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsa_reverseValidationFailureMessages;

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
            model_internal::_trsa_reverseValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_reverseValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsa_bay_cdStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsa_bay_cdValidator() : StyleValidator
    {
        return model_internal::_trsa_bay_cdValidator;
    }

    model_internal function set _trsa_bay_cdIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsa_bay_cdIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsa_bay_cdIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_bay_cdIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsa_bay_cdIsValid():Boolean
    {
        if (!model_internal::_trsa_bay_cdIsValidCacheInitialized)
        {
            model_internal::calculateTrsa_bay_cdIsValid();
        }

        return model_internal::_trsa_bay_cdIsValid;
    }

    model_internal function calculateTrsa_bay_cdIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsa_bay_cdValidator.validate(model_internal::_instance.trsa_bay_cd)
        model_internal::_trsa_bay_cdIsValid_der = (valRes.results == null);
        model_internal::_trsa_bay_cdIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsa_bay_cdValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsa_bay_cdValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsa_bay_cdValidationFailureMessages():Array
    {
        if (model_internal::_trsa_bay_cdValidationFailureMessages == null)
            model_internal::calculateTrsa_bay_cdIsValid();

        return _trsa_bay_cdValidationFailureMessages;
    }

    model_internal function set trsa_bay_cdValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsa_bay_cdValidationFailureMessages;

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
            model_internal::_trsa_bay_cdValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_bay_cdValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsa_supplierStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsa_supplierValidator() : StyleValidator
    {
        return model_internal::_trsa_supplierValidator;
    }

    model_internal function set _trsa_supplierIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsa_supplierIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsa_supplierIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_supplierIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsa_supplierIsValid():Boolean
    {
        if (!model_internal::_trsa_supplierIsValidCacheInitialized)
        {
            model_internal::calculateTrsa_supplierIsValid();
        }

        return model_internal::_trsa_supplierIsValid;
    }

    model_internal function calculateTrsa_supplierIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsa_supplierValidator.validate(model_internal::_instance.trsa_supplier)
        model_internal::_trsa_supplierIsValid_der = (valRes.results == null);
        model_internal::_trsa_supplierIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsa_supplierValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsa_supplierValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsa_supplierValidationFailureMessages():Array
    {
        if (model_internal::_trsa_supplierValidationFailureMessages == null)
            model_internal::calculateTrsa_supplierIsValid();

        return _trsa_supplierValidationFailureMessages;
    }

    model_internal function set trsa_supplierValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsa_supplierValidationFailureMessages;

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
            model_internal::_trsa_supplierValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_supplierValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsa_psnStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsa_psnValidator() : StyleValidator
    {
        return model_internal::_trsa_psnValidator;
    }

    model_internal function set _trsa_psnIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsa_psnIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsa_psnIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_psnIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsa_psnIsValid():Boolean
    {
        if (!model_internal::_trsa_psnIsValidCacheInitialized)
        {
            model_internal::calculateTrsa_psnIsValid();
        }

        return model_internal::_trsa_psnIsValid;
    }

    model_internal function calculateTrsa_psnIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsa_psnValidator.validate(model_internal::_instance.trsa_psn)
        model_internal::_trsa_psnIsValid_der = (valRes.results == null);
        model_internal::_trsa_psnIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsa_psnValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsa_psnValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsa_psnValidationFailureMessages():Array
    {
        if (model_internal::_trsa_psnValidationFailureMessages == null)
            model_internal::calculateTrsa_psnIsValid();

        return _trsa_psnValidationFailureMessages;
    }

    model_internal function set trsa_psnValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsa_psnValidationFailureMessages;

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
            model_internal::_trsa_psnValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_psnValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsa_terminalStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsa_terminalValidator() : StyleValidator
    {
        return model_internal::_trsa_terminalValidator;
    }

    model_internal function set _trsa_terminalIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsa_terminalIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsa_terminalIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_terminalIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsa_terminalIsValid():Boolean
    {
        if (!model_internal::_trsa_terminalIsValidCacheInitialized)
        {
            model_internal::calculateTrsa_terminalIsValid();
        }

        return model_internal::_trsa_terminalIsValid;
    }

    model_internal function calculateTrsa_terminalIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsa_terminalValidator.validate(model_internal::_instance.trsa_terminal)
        model_internal::_trsa_terminalIsValid_der = (valRes.results == null);
        model_internal::_trsa_terminalIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsa_terminalValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsa_terminalValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsa_terminalValidationFailureMessages():Array
    {
        if (model_internal::_trsa_terminalValidationFailureMessages == null)
            model_internal::calculateTrsa_terminalIsValid();

        return _trsa_terminalValidationFailureMessages;
    }

    model_internal function set trsa_terminalValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsa_terminalValidationFailureMessages;

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
            model_internal::_trsa_terminalValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_terminalValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsa_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsa_idValidator() : StyleValidator
    {
        return model_internal::_trsa_idValidator;
    }

    model_internal function set _trsa_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsa_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsa_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsa_idIsValid():Boolean
    {
        if (!model_internal::_trsa_idIsValidCacheInitialized)
        {
            model_internal::calculateTrsa_idIsValid();
        }

        return model_internal::_trsa_idIsValid;
    }

    model_internal function calculateTrsa_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsa_idValidator.validate(model_internal::_instance.trsa_id)
        model_internal::_trsa_idIsValid_der = (valRes.results == null);
        model_internal::_trsa_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsa_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsa_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsa_idValidationFailureMessages():Array
    {
        if (model_internal::_trsa_idValidationFailureMessages == null)
            model_internal::calculateTrsa_idIsValid();

        return _trsa_idValidationFailureMessages;
    }

    model_internal function set trsa_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsa_idValidationFailureMessages;

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
            model_internal::_trsa_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsa_tankerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsa_tankerValidator() : StyleValidator
    {
        return model_internal::_trsa_tankerValidator;
    }

    model_internal function set _trsa_tankerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsa_tankerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsa_tankerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_tankerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsa_tankerIsValid():Boolean
    {
        if (!model_internal::_trsa_tankerIsValidCacheInitialized)
        {
            model_internal::calculateTrsa_tankerIsValid();
        }

        return model_internal::_trsa_tankerIsValid;
    }

    model_internal function calculateTrsa_tankerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsa_tankerValidator.validate(model_internal::_instance.trsa_tanker)
        model_internal::_trsa_tankerIsValid_der = (valRes.results == null);
        model_internal::_trsa_tankerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsa_tankerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsa_tankerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsa_tankerValidationFailureMessages():Array
    {
        if (model_internal::_trsa_tankerValidationFailureMessages == null)
            model_internal::calculateTrsa_tankerIsValid();

        return _trsa_tankerValidationFailureMessages;
    }

    model_internal function set trsa_tankerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsa_tankerValidationFailureMessages;

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
            model_internal::_trsa_tankerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_tankerValidationFailureMessages", oldValue, value));
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
            case("trsa_trip"):
            {
                return trsa_tripValidationFailureMessages;
            }
            case("trsa_ed_dmy"):
            {
                return trsa_ed_dmyValidationFailureMessages;
            }
            case("trsa_drawer"):
            {
                return trsa_drawerValidationFailureMessages;
            }
            case("trsa_carrier"):
            {
                return trsa_carrierValidationFailureMessages;
            }
            case("trsa_st_dmy"):
            {
                return trsa_st_dmyValidationFailureMessages;
            }
            case("trsa_per_name"):
            {
                return trsa_per_nameValidationFailureMessages;
            }
            case("trsa_crt_dmy"):
            {
                return trsa_crt_dmyValidationFailureMessages;
            }
            case("trsa_reverse_flag"):
            {
                return trsa_reverse_flagValidationFailureMessages;
            }
            case("trsa_reverse"):
            {
                return trsa_reverseValidationFailureMessages;
            }
            case("trsa_bay_cd"):
            {
                return trsa_bay_cdValidationFailureMessages;
            }
            case("trsa_supplier"):
            {
                return trsa_supplierValidationFailureMessages;
            }
            case("trsa_psn"):
            {
                return trsa_psnValidationFailureMessages;
            }
            case("trsa_terminal"):
            {
                return trsa_terminalValidationFailureMessages;
            }
            case("trsa_id"):
            {
                return trsa_idValidationFailureMessages;
            }
            case("trsa_tanker"):
            {
                return trsa_tankerValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
