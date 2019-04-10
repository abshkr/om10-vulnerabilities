
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
internal class _ScheduleCompartmentDetailsEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("preloaded", "qty_loaded", "schd_deliv_num", "qty_scheduled", "schd_ship_to_num", "prod_code", "schdspec_shlstrip", "qty_amb", "prod_cmpy", "qty_kg", "schd_sold_to_num", "unit_name", "qty_std", "schdspec_shlssupp", "compartment", "prod_name", "unit_code", "qty_preload");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("preloaded", "qty_loaded", "schd_deliv_num", "qty_scheduled", "schd_ship_to_num", "prod_code", "schdspec_shlstrip", "qty_amb", "prod_cmpy", "qty_kg", "schd_sold_to_num", "unit_name", "qty_std", "schdspec_shlssupp", "compartment", "prod_name", "unit_code", "qty_preload");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("preloaded", "qty_loaded", "schd_deliv_num", "qty_scheduled", "schd_ship_to_num", "prod_code", "schdspec_shlstrip", "qty_amb", "prod_cmpy", "qty_kg", "schd_sold_to_num", "unit_name", "qty_std", "schdspec_shlssupp", "compartment", "prod_name", "unit_code", "qty_preload");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("preloaded", "qty_loaded", "schd_deliv_num", "qty_scheduled", "schd_ship_to_num", "prod_code", "schdspec_shlstrip", "qty_amb", "prod_cmpy", "qty_kg", "schd_sold_to_num", "unit_name", "qty_std", "schdspec_shlssupp", "compartment", "prod_name", "unit_code", "qty_preload");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("preloaded", "qty_loaded", "schd_deliv_num", "qty_scheduled", "schd_ship_to_num", "prod_code", "schdspec_shlstrip", "qty_amb", "prod_cmpy", "qty_kg", "schd_sold_to_num", "unit_name", "qty_std", "schdspec_shlssupp", "compartment", "prod_name", "unit_code", "qty_preload");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "ScheduleCompartmentDetails";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _preloadedIsValid:Boolean;
    model_internal var _preloadedValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _preloadedIsValidCacheInitialized:Boolean = false;
    model_internal var _preloadedValidationFailureMessages:Array;
    
    model_internal var _qty_loadedIsValid:Boolean;
    model_internal var _qty_loadedValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _qty_loadedIsValidCacheInitialized:Boolean = false;
    model_internal var _qty_loadedValidationFailureMessages:Array;
    
    model_internal var _schd_deliv_numIsValid:Boolean;
    model_internal var _schd_deliv_numValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_deliv_numIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_deliv_numValidationFailureMessages:Array;
    
    model_internal var _qty_scheduledIsValid:Boolean;
    model_internal var _qty_scheduledValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _qty_scheduledIsValidCacheInitialized:Boolean = false;
    model_internal var _qty_scheduledValidationFailureMessages:Array;
    
    model_internal var _schd_ship_to_numIsValid:Boolean;
    model_internal var _schd_ship_to_numValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_ship_to_numIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_ship_to_numValidationFailureMessages:Array;
    
    model_internal var _prod_codeIsValid:Boolean;
    model_internal var _prod_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_codeValidationFailureMessages:Array;
    
    model_internal var _schdspec_shlstripIsValid:Boolean;
    model_internal var _schdspec_shlstripValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schdspec_shlstripIsValidCacheInitialized:Boolean = false;
    model_internal var _schdspec_shlstripValidationFailureMessages:Array;
    
    model_internal var _qty_ambIsValid:Boolean;
    model_internal var _qty_ambValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _qty_ambIsValidCacheInitialized:Boolean = false;
    model_internal var _qty_ambValidationFailureMessages:Array;
    
    model_internal var _prod_cmpyIsValid:Boolean;
    model_internal var _prod_cmpyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_cmpyIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_cmpyValidationFailureMessages:Array;
    
    model_internal var _qty_kgIsValid:Boolean;
    model_internal var _qty_kgValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _qty_kgIsValidCacheInitialized:Boolean = false;
    model_internal var _qty_kgValidationFailureMessages:Array;
    
    model_internal var _schd_sold_to_numIsValid:Boolean;
    model_internal var _schd_sold_to_numValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_sold_to_numIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_sold_to_numValidationFailureMessages:Array;
    
    model_internal var _unit_nameIsValid:Boolean;
    model_internal var _unit_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _unit_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _unit_nameValidationFailureMessages:Array;
    
    model_internal var _qty_stdIsValid:Boolean;
    model_internal var _qty_stdValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _qty_stdIsValidCacheInitialized:Boolean = false;
    model_internal var _qty_stdValidationFailureMessages:Array;
    
    model_internal var _schdspec_shlssuppIsValid:Boolean;
    model_internal var _schdspec_shlssuppValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schdspec_shlssuppIsValidCacheInitialized:Boolean = false;
    model_internal var _schdspec_shlssuppValidationFailureMessages:Array;
    
    model_internal var _compartmentIsValid:Boolean;
    model_internal var _compartmentValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _compartmentIsValidCacheInitialized:Boolean = false;
    model_internal var _compartmentValidationFailureMessages:Array;
    
    model_internal var _prod_nameIsValid:Boolean;
    model_internal var _prod_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_nameValidationFailureMessages:Array;
    
    model_internal var _unit_codeIsValid:Boolean;
    model_internal var _unit_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _unit_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _unit_codeValidationFailureMessages:Array;
    
    model_internal var _qty_preloadIsValid:Boolean;
    model_internal var _qty_preloadValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _qty_preloadIsValidCacheInitialized:Boolean = false;
    model_internal var _qty_preloadValidationFailureMessages:Array;

    model_internal var _instance:_Super_ScheduleCompartmentDetails;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _ScheduleCompartmentDetailsEntityMetadata(value : _Super_ScheduleCompartmentDetails)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["preloaded"] = new Array();
            model_internal::dependentsOnMap["qty_loaded"] = new Array();
            model_internal::dependentsOnMap["schd_deliv_num"] = new Array();
            model_internal::dependentsOnMap["qty_scheduled"] = new Array();
            model_internal::dependentsOnMap["schd_ship_to_num"] = new Array();
            model_internal::dependentsOnMap["prod_code"] = new Array();
            model_internal::dependentsOnMap["schdspec_shlstrip"] = new Array();
            model_internal::dependentsOnMap["qty_amb"] = new Array();
            model_internal::dependentsOnMap["prod_cmpy"] = new Array();
            model_internal::dependentsOnMap["qty_kg"] = new Array();
            model_internal::dependentsOnMap["schd_sold_to_num"] = new Array();
            model_internal::dependentsOnMap["unit_name"] = new Array();
            model_internal::dependentsOnMap["qty_std"] = new Array();
            model_internal::dependentsOnMap["schdspec_shlssupp"] = new Array();
            model_internal::dependentsOnMap["compartment"] = new Array();
            model_internal::dependentsOnMap["prod_name"] = new Array();
            model_internal::dependentsOnMap["unit_code"] = new Array();
            model_internal::dependentsOnMap["qty_preload"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["preloaded"] = "Object";
        model_internal::propertyTypeMap["qty_loaded"] = "String";
        model_internal::propertyTypeMap["schd_deliv_num"] = "Object";
        model_internal::propertyTypeMap["qty_scheduled"] = "Object";
        model_internal::propertyTypeMap["schd_ship_to_num"] = "Object";
        model_internal::propertyTypeMap["prod_code"] = "String";
        model_internal::propertyTypeMap["schdspec_shlstrip"] = "String";
        model_internal::propertyTypeMap["qty_amb"] = "String";
        model_internal::propertyTypeMap["prod_cmpy"] = "String";
        model_internal::propertyTypeMap["qty_kg"] = "String";
        model_internal::propertyTypeMap["schd_sold_to_num"] = "Object";
        model_internal::propertyTypeMap["unit_name"] = "String";
        model_internal::propertyTypeMap["qty_std"] = "String";
        model_internal::propertyTypeMap["schdspec_shlssupp"] = "String";
        model_internal::propertyTypeMap["compartment"] = "String";
        model_internal::propertyTypeMap["prod_name"] = "String";
        model_internal::propertyTypeMap["unit_code"] = "String";
        model_internal::propertyTypeMap["qty_preload"] = "String";

        model_internal::_instance = value;
        model_internal::_preloadedValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPreloaded);
        model_internal::_preloadedValidator.required = true;
        model_internal::_preloadedValidator.requiredFieldError = "preloaded is required";
        //model_internal::_preloadedValidator.source = model_internal::_instance;
        //model_internal::_preloadedValidator.property = "preloaded";
        model_internal::_qty_loadedValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForQty_loaded);
        model_internal::_qty_loadedValidator.required = true;
        model_internal::_qty_loadedValidator.requiredFieldError = "qty_loaded is required";
        //model_internal::_qty_loadedValidator.source = model_internal::_instance;
        //model_internal::_qty_loadedValidator.property = "qty_loaded";
        model_internal::_schd_deliv_numValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_deliv_num);
        model_internal::_schd_deliv_numValidator.required = true;
        model_internal::_schd_deliv_numValidator.requiredFieldError = "schd_deliv_num is required";
        //model_internal::_schd_deliv_numValidator.source = model_internal::_instance;
        //model_internal::_schd_deliv_numValidator.property = "schd_deliv_num";
        model_internal::_qty_scheduledValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForQty_scheduled);
        model_internal::_qty_scheduledValidator.required = true;
        model_internal::_qty_scheduledValidator.requiredFieldError = "qty_scheduled is required";
        //model_internal::_qty_scheduledValidator.source = model_internal::_instance;
        //model_internal::_qty_scheduledValidator.property = "qty_scheduled";
        model_internal::_schd_ship_to_numValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_ship_to_num);
        model_internal::_schd_ship_to_numValidator.required = true;
        model_internal::_schd_ship_to_numValidator.requiredFieldError = "schd_ship_to_num is required";
        //model_internal::_schd_ship_to_numValidator.source = model_internal::_instance;
        //model_internal::_schd_ship_to_numValidator.property = "schd_ship_to_num";
        model_internal::_prod_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_code);
        model_internal::_prod_codeValidator.required = true;
        model_internal::_prod_codeValidator.requiredFieldError = "prod_code is required";
        //model_internal::_prod_codeValidator.source = model_internal::_instance;
        //model_internal::_prod_codeValidator.property = "prod_code";
        model_internal::_schdspec_shlstripValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchdspec_shlstrip);
        model_internal::_schdspec_shlstripValidator.required = true;
        model_internal::_schdspec_shlstripValidator.requiredFieldError = "schdspec_shlstrip is required";
        //model_internal::_schdspec_shlstripValidator.source = model_internal::_instance;
        //model_internal::_schdspec_shlstripValidator.property = "schdspec_shlstrip";
        model_internal::_qty_ambValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForQty_amb);
        model_internal::_qty_ambValidator.required = true;
        model_internal::_qty_ambValidator.requiredFieldError = "qty_amb is required";
        //model_internal::_qty_ambValidator.source = model_internal::_instance;
        //model_internal::_qty_ambValidator.property = "qty_amb";
        model_internal::_prod_cmpyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_cmpy);
        model_internal::_prod_cmpyValidator.required = true;
        model_internal::_prod_cmpyValidator.requiredFieldError = "prod_cmpy is required";
        //model_internal::_prod_cmpyValidator.source = model_internal::_instance;
        //model_internal::_prod_cmpyValidator.property = "prod_cmpy";
        model_internal::_qty_kgValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForQty_kg);
        model_internal::_qty_kgValidator.required = true;
        model_internal::_qty_kgValidator.requiredFieldError = "qty_kg is required";
        //model_internal::_qty_kgValidator.source = model_internal::_instance;
        //model_internal::_qty_kgValidator.property = "qty_kg";
        model_internal::_schd_sold_to_numValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_sold_to_num);
        model_internal::_schd_sold_to_numValidator.required = true;
        model_internal::_schd_sold_to_numValidator.requiredFieldError = "schd_sold_to_num is required";
        //model_internal::_schd_sold_to_numValidator.source = model_internal::_instance;
        //model_internal::_schd_sold_to_numValidator.property = "schd_sold_to_num";
        model_internal::_unit_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForUnit_name);
        model_internal::_unit_nameValidator.required = true;
        model_internal::_unit_nameValidator.requiredFieldError = "unit_name is required";
        //model_internal::_unit_nameValidator.source = model_internal::_instance;
        //model_internal::_unit_nameValidator.property = "unit_name";
        model_internal::_qty_stdValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForQty_std);
        model_internal::_qty_stdValidator.required = true;
        model_internal::_qty_stdValidator.requiredFieldError = "qty_std is required";
        //model_internal::_qty_stdValidator.source = model_internal::_instance;
        //model_internal::_qty_stdValidator.property = "qty_std";
        model_internal::_schdspec_shlssuppValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchdspec_shlssupp);
        model_internal::_schdspec_shlssuppValidator.required = true;
        model_internal::_schdspec_shlssuppValidator.requiredFieldError = "schdspec_shlssupp is required";
        //model_internal::_schdspec_shlssuppValidator.source = model_internal::_instance;
        //model_internal::_schdspec_shlssuppValidator.property = "schdspec_shlssupp";
        model_internal::_compartmentValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCompartment);
        model_internal::_compartmentValidator.required = true;
        model_internal::_compartmentValidator.requiredFieldError = "compartment is required";
        //model_internal::_compartmentValidator.source = model_internal::_instance;
        //model_internal::_compartmentValidator.property = "compartment";
        model_internal::_prod_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_name);
        model_internal::_prod_nameValidator.required = true;
        model_internal::_prod_nameValidator.requiredFieldError = "prod_name is required";
        //model_internal::_prod_nameValidator.source = model_internal::_instance;
        //model_internal::_prod_nameValidator.property = "prod_name";
        model_internal::_unit_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForUnit_code);
        model_internal::_unit_codeValidator.required = true;
        model_internal::_unit_codeValidator.requiredFieldError = "unit_code is required";
        //model_internal::_unit_codeValidator.source = model_internal::_instance;
        //model_internal::_unit_codeValidator.property = "unit_code";
        model_internal::_qty_preloadValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForQty_preload);
        model_internal::_qty_preloadValidator.required = true;
        model_internal::_qty_preloadValidator.requiredFieldError = "qty_preload is required";
        //model_internal::_qty_preloadValidator.source = model_internal::_instance;
        //model_internal::_qty_preloadValidator.property = "qty_preload";
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
            throw new Error(propertyName + " is not a data property of entity ScheduleCompartmentDetails");
            
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
            throw new Error(propertyName + " is not a collection property of entity ScheduleCompartmentDetails");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of ScheduleCompartmentDetails");

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
            throw new Error(propertyName + " does not exist for entity ScheduleCompartmentDetails");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity ScheduleCompartmentDetails");
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
            throw new Error(propertyName + " does not exist for entity ScheduleCompartmentDetails");
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
    public function get isPreloadedAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isQty_loadedAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_deliv_numAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isQty_scheduledAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_ship_to_numAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProd_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchdspec_shlstripAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isQty_ambAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProd_cmpyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isQty_kgAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_sold_to_numAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isUnit_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isQty_stdAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchdspec_shlssuppAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCompartmentAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProd_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isUnit_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isQty_preloadAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnPreloaded():void
    {
        if (model_internal::_preloadedIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPreloaded = null;
            model_internal::calculatePreloadedIsValid();
        }
    }
    public function invalidateDependentOnQty_loaded():void
    {
        if (model_internal::_qty_loadedIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfQty_loaded = null;
            model_internal::calculateQty_loadedIsValid();
        }
    }
    public function invalidateDependentOnSchd_deliv_num():void
    {
        if (model_internal::_schd_deliv_numIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_deliv_num = null;
            model_internal::calculateSchd_deliv_numIsValid();
        }
    }
    public function invalidateDependentOnQty_scheduled():void
    {
        if (model_internal::_qty_scheduledIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfQty_scheduled = null;
            model_internal::calculateQty_scheduledIsValid();
        }
    }
    public function invalidateDependentOnSchd_ship_to_num():void
    {
        if (model_internal::_schd_ship_to_numIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_ship_to_num = null;
            model_internal::calculateSchd_ship_to_numIsValid();
        }
    }
    public function invalidateDependentOnProd_code():void
    {
        if (model_internal::_prod_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_code = null;
            model_internal::calculateProd_codeIsValid();
        }
    }
    public function invalidateDependentOnSchdspec_shlstrip():void
    {
        if (model_internal::_schdspec_shlstripIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchdspec_shlstrip = null;
            model_internal::calculateSchdspec_shlstripIsValid();
        }
    }
    public function invalidateDependentOnQty_amb():void
    {
        if (model_internal::_qty_ambIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfQty_amb = null;
            model_internal::calculateQty_ambIsValid();
        }
    }
    public function invalidateDependentOnProd_cmpy():void
    {
        if (model_internal::_prod_cmpyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_cmpy = null;
            model_internal::calculateProd_cmpyIsValid();
        }
    }
    public function invalidateDependentOnQty_kg():void
    {
        if (model_internal::_qty_kgIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfQty_kg = null;
            model_internal::calculateQty_kgIsValid();
        }
    }
    public function invalidateDependentOnSchd_sold_to_num():void
    {
        if (model_internal::_schd_sold_to_numIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_sold_to_num = null;
            model_internal::calculateSchd_sold_to_numIsValid();
        }
    }
    public function invalidateDependentOnUnit_name():void
    {
        if (model_internal::_unit_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfUnit_name = null;
            model_internal::calculateUnit_nameIsValid();
        }
    }
    public function invalidateDependentOnQty_std():void
    {
        if (model_internal::_qty_stdIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfQty_std = null;
            model_internal::calculateQty_stdIsValid();
        }
    }
    public function invalidateDependentOnSchdspec_shlssupp():void
    {
        if (model_internal::_schdspec_shlssuppIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchdspec_shlssupp = null;
            model_internal::calculateSchdspec_shlssuppIsValid();
        }
    }
    public function invalidateDependentOnCompartment():void
    {
        if (model_internal::_compartmentIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCompartment = null;
            model_internal::calculateCompartmentIsValid();
        }
    }
    public function invalidateDependentOnProd_name():void
    {
        if (model_internal::_prod_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_name = null;
            model_internal::calculateProd_nameIsValid();
        }
    }
    public function invalidateDependentOnUnit_code():void
    {
        if (model_internal::_unit_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfUnit_code = null;
            model_internal::calculateUnit_codeIsValid();
        }
    }
    public function invalidateDependentOnQty_preload():void
    {
        if (model_internal::_qty_preloadIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfQty_preload = null;
            model_internal::calculateQty_preloadIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get preloadedStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get preloadedValidator() : StyleValidator
    {
        return model_internal::_preloadedValidator;
    }

    model_internal function set _preloadedIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_preloadedIsValid;         
        if (oldValue !== value)
        {
            model_internal::_preloadedIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "preloadedIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get preloadedIsValid():Boolean
    {
        if (!model_internal::_preloadedIsValidCacheInitialized)
        {
            model_internal::calculatePreloadedIsValid();
        }

        return model_internal::_preloadedIsValid;
    }

    model_internal function calculatePreloadedIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_preloadedValidator.validate(model_internal::_instance.preloaded)
        model_internal::_preloadedIsValid_der = (valRes.results == null);
        model_internal::_preloadedIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::preloadedValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::preloadedValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get preloadedValidationFailureMessages():Array
    {
        if (model_internal::_preloadedValidationFailureMessages == null)
            model_internal::calculatePreloadedIsValid();

        return _preloadedValidationFailureMessages;
    }

    model_internal function set preloadedValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_preloadedValidationFailureMessages;

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
            model_internal::_preloadedValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "preloadedValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get qty_loadedStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get qty_loadedValidator() : StyleValidator
    {
        return model_internal::_qty_loadedValidator;
    }

    model_internal function set _qty_loadedIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_qty_loadedIsValid;         
        if (oldValue !== value)
        {
            model_internal::_qty_loadedIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_loadedIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get qty_loadedIsValid():Boolean
    {
        if (!model_internal::_qty_loadedIsValidCacheInitialized)
        {
            model_internal::calculateQty_loadedIsValid();
        }

        return model_internal::_qty_loadedIsValid;
    }

    model_internal function calculateQty_loadedIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_qty_loadedValidator.validate(model_internal::_instance.qty_loaded)
        model_internal::_qty_loadedIsValid_der = (valRes.results == null);
        model_internal::_qty_loadedIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::qty_loadedValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::qty_loadedValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get qty_loadedValidationFailureMessages():Array
    {
        if (model_internal::_qty_loadedValidationFailureMessages == null)
            model_internal::calculateQty_loadedIsValid();

        return _qty_loadedValidationFailureMessages;
    }

    model_internal function set qty_loadedValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_qty_loadedValidationFailureMessages;

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
            model_internal::_qty_loadedValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_loadedValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_deliv_numStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_deliv_numValidator() : StyleValidator
    {
        return model_internal::_schd_deliv_numValidator;
    }

    model_internal function set _schd_deliv_numIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_deliv_numIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_deliv_numIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_deliv_numIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_deliv_numIsValid():Boolean
    {
        if (!model_internal::_schd_deliv_numIsValidCacheInitialized)
        {
            model_internal::calculateSchd_deliv_numIsValid();
        }

        return model_internal::_schd_deliv_numIsValid;
    }

    model_internal function calculateSchd_deliv_numIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_deliv_numValidator.validate(model_internal::_instance.schd_deliv_num)
        model_internal::_schd_deliv_numIsValid_der = (valRes.results == null);
        model_internal::_schd_deliv_numIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_deliv_numValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_deliv_numValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_deliv_numValidationFailureMessages():Array
    {
        if (model_internal::_schd_deliv_numValidationFailureMessages == null)
            model_internal::calculateSchd_deliv_numIsValid();

        return _schd_deliv_numValidationFailureMessages;
    }

    model_internal function set schd_deliv_numValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_deliv_numValidationFailureMessages;

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
            model_internal::_schd_deliv_numValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_deliv_numValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get qty_scheduledStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get qty_scheduledValidator() : StyleValidator
    {
        return model_internal::_qty_scheduledValidator;
    }

    model_internal function set _qty_scheduledIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_qty_scheduledIsValid;         
        if (oldValue !== value)
        {
            model_internal::_qty_scheduledIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_scheduledIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get qty_scheduledIsValid():Boolean
    {
        if (!model_internal::_qty_scheduledIsValidCacheInitialized)
        {
            model_internal::calculateQty_scheduledIsValid();
        }

        return model_internal::_qty_scheduledIsValid;
    }

    model_internal function calculateQty_scheduledIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_qty_scheduledValidator.validate(model_internal::_instance.qty_scheduled)
        model_internal::_qty_scheduledIsValid_der = (valRes.results == null);
        model_internal::_qty_scheduledIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::qty_scheduledValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::qty_scheduledValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get qty_scheduledValidationFailureMessages():Array
    {
        if (model_internal::_qty_scheduledValidationFailureMessages == null)
            model_internal::calculateQty_scheduledIsValid();

        return _qty_scheduledValidationFailureMessages;
    }

    model_internal function set qty_scheduledValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_qty_scheduledValidationFailureMessages;

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
            model_internal::_qty_scheduledValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_scheduledValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_ship_to_numStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_ship_to_numValidator() : StyleValidator
    {
        return model_internal::_schd_ship_to_numValidator;
    }

    model_internal function set _schd_ship_to_numIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_ship_to_numIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_ship_to_numIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_ship_to_numIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_ship_to_numIsValid():Boolean
    {
        if (!model_internal::_schd_ship_to_numIsValidCacheInitialized)
        {
            model_internal::calculateSchd_ship_to_numIsValid();
        }

        return model_internal::_schd_ship_to_numIsValid;
    }

    model_internal function calculateSchd_ship_to_numIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_ship_to_numValidator.validate(model_internal::_instance.schd_ship_to_num)
        model_internal::_schd_ship_to_numIsValid_der = (valRes.results == null);
        model_internal::_schd_ship_to_numIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_ship_to_numValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_ship_to_numValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_ship_to_numValidationFailureMessages():Array
    {
        if (model_internal::_schd_ship_to_numValidationFailureMessages == null)
            model_internal::calculateSchd_ship_to_numIsValid();

        return _schd_ship_to_numValidationFailureMessages;
    }

    model_internal function set schd_ship_to_numValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_ship_to_numValidationFailureMessages;

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
            model_internal::_schd_ship_to_numValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_ship_to_numValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prod_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prod_codeValidator() : StyleValidator
    {
        return model_internal::_prod_codeValidator;
    }

    model_internal function set _prod_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prod_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prod_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prod_codeIsValid():Boolean
    {
        if (!model_internal::_prod_codeIsValidCacheInitialized)
        {
            model_internal::calculateProd_codeIsValid();
        }

        return model_internal::_prod_codeIsValid;
    }

    model_internal function calculateProd_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prod_codeValidator.validate(model_internal::_instance.prod_code)
        model_internal::_prod_codeIsValid_der = (valRes.results == null);
        model_internal::_prod_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prod_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prod_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prod_codeValidationFailureMessages():Array
    {
        if (model_internal::_prod_codeValidationFailureMessages == null)
            model_internal::calculateProd_codeIsValid();

        return _prod_codeValidationFailureMessages;
    }

    model_internal function set prod_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prod_codeValidationFailureMessages;

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
            model_internal::_prod_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schdspec_shlstripStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schdspec_shlstripValidator() : StyleValidator
    {
        return model_internal::_schdspec_shlstripValidator;
    }

    model_internal function set _schdspec_shlstripIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schdspec_shlstripIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schdspec_shlstripIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schdspec_shlstripIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schdspec_shlstripIsValid():Boolean
    {
        if (!model_internal::_schdspec_shlstripIsValidCacheInitialized)
        {
            model_internal::calculateSchdspec_shlstripIsValid();
        }

        return model_internal::_schdspec_shlstripIsValid;
    }

    model_internal function calculateSchdspec_shlstripIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schdspec_shlstripValidator.validate(model_internal::_instance.schdspec_shlstrip)
        model_internal::_schdspec_shlstripIsValid_der = (valRes.results == null);
        model_internal::_schdspec_shlstripIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schdspec_shlstripValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schdspec_shlstripValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schdspec_shlstripValidationFailureMessages():Array
    {
        if (model_internal::_schdspec_shlstripValidationFailureMessages == null)
            model_internal::calculateSchdspec_shlstripIsValid();

        return _schdspec_shlstripValidationFailureMessages;
    }

    model_internal function set schdspec_shlstripValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schdspec_shlstripValidationFailureMessages;

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
            model_internal::_schdspec_shlstripValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schdspec_shlstripValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get qty_ambStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get qty_ambValidator() : StyleValidator
    {
        return model_internal::_qty_ambValidator;
    }

    model_internal function set _qty_ambIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_qty_ambIsValid;         
        if (oldValue !== value)
        {
            model_internal::_qty_ambIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_ambIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get qty_ambIsValid():Boolean
    {
        if (!model_internal::_qty_ambIsValidCacheInitialized)
        {
            model_internal::calculateQty_ambIsValid();
        }

        return model_internal::_qty_ambIsValid;
    }

    model_internal function calculateQty_ambIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_qty_ambValidator.validate(model_internal::_instance.qty_amb)
        model_internal::_qty_ambIsValid_der = (valRes.results == null);
        model_internal::_qty_ambIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::qty_ambValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::qty_ambValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get qty_ambValidationFailureMessages():Array
    {
        if (model_internal::_qty_ambValidationFailureMessages == null)
            model_internal::calculateQty_ambIsValid();

        return _qty_ambValidationFailureMessages;
    }

    model_internal function set qty_ambValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_qty_ambValidationFailureMessages;

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
            model_internal::_qty_ambValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_ambValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prod_cmpyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prod_cmpyValidator() : StyleValidator
    {
        return model_internal::_prod_cmpyValidator;
    }

    model_internal function set _prod_cmpyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prod_cmpyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prod_cmpyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_cmpyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prod_cmpyIsValid():Boolean
    {
        if (!model_internal::_prod_cmpyIsValidCacheInitialized)
        {
            model_internal::calculateProd_cmpyIsValid();
        }

        return model_internal::_prod_cmpyIsValid;
    }

    model_internal function calculateProd_cmpyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prod_cmpyValidator.validate(model_internal::_instance.prod_cmpy)
        model_internal::_prod_cmpyIsValid_der = (valRes.results == null);
        model_internal::_prod_cmpyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prod_cmpyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prod_cmpyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prod_cmpyValidationFailureMessages():Array
    {
        if (model_internal::_prod_cmpyValidationFailureMessages == null)
            model_internal::calculateProd_cmpyIsValid();

        return _prod_cmpyValidationFailureMessages;
    }

    model_internal function set prod_cmpyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prod_cmpyValidationFailureMessages;

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
            model_internal::_prod_cmpyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_cmpyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get qty_kgStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get qty_kgValidator() : StyleValidator
    {
        return model_internal::_qty_kgValidator;
    }

    model_internal function set _qty_kgIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_qty_kgIsValid;         
        if (oldValue !== value)
        {
            model_internal::_qty_kgIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_kgIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get qty_kgIsValid():Boolean
    {
        if (!model_internal::_qty_kgIsValidCacheInitialized)
        {
            model_internal::calculateQty_kgIsValid();
        }

        return model_internal::_qty_kgIsValid;
    }

    model_internal function calculateQty_kgIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_qty_kgValidator.validate(model_internal::_instance.qty_kg)
        model_internal::_qty_kgIsValid_der = (valRes.results == null);
        model_internal::_qty_kgIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::qty_kgValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::qty_kgValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get qty_kgValidationFailureMessages():Array
    {
        if (model_internal::_qty_kgValidationFailureMessages == null)
            model_internal::calculateQty_kgIsValid();

        return _qty_kgValidationFailureMessages;
    }

    model_internal function set qty_kgValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_qty_kgValidationFailureMessages;

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
            model_internal::_qty_kgValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_kgValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_sold_to_numStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_sold_to_numValidator() : StyleValidator
    {
        return model_internal::_schd_sold_to_numValidator;
    }

    model_internal function set _schd_sold_to_numIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_sold_to_numIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_sold_to_numIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_sold_to_numIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_sold_to_numIsValid():Boolean
    {
        if (!model_internal::_schd_sold_to_numIsValidCacheInitialized)
        {
            model_internal::calculateSchd_sold_to_numIsValid();
        }

        return model_internal::_schd_sold_to_numIsValid;
    }

    model_internal function calculateSchd_sold_to_numIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_sold_to_numValidator.validate(model_internal::_instance.schd_sold_to_num)
        model_internal::_schd_sold_to_numIsValid_der = (valRes.results == null);
        model_internal::_schd_sold_to_numIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_sold_to_numValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_sold_to_numValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_sold_to_numValidationFailureMessages():Array
    {
        if (model_internal::_schd_sold_to_numValidationFailureMessages == null)
            model_internal::calculateSchd_sold_to_numIsValid();

        return _schd_sold_to_numValidationFailureMessages;
    }

    model_internal function set schd_sold_to_numValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_sold_to_numValidationFailureMessages;

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
            model_internal::_schd_sold_to_numValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_sold_to_numValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get unit_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get unit_nameValidator() : StyleValidator
    {
        return model_internal::_unit_nameValidator;
    }

    model_internal function set _unit_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_unit_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_unit_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get unit_nameIsValid():Boolean
    {
        if (!model_internal::_unit_nameIsValidCacheInitialized)
        {
            model_internal::calculateUnit_nameIsValid();
        }

        return model_internal::_unit_nameIsValid;
    }

    model_internal function calculateUnit_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_unit_nameValidator.validate(model_internal::_instance.unit_name)
        model_internal::_unit_nameIsValid_der = (valRes.results == null);
        model_internal::_unit_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::unit_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::unit_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get unit_nameValidationFailureMessages():Array
    {
        if (model_internal::_unit_nameValidationFailureMessages == null)
            model_internal::calculateUnit_nameIsValid();

        return _unit_nameValidationFailureMessages;
    }

    model_internal function set unit_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_unit_nameValidationFailureMessages;

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
            model_internal::_unit_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get qty_stdStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get qty_stdValidator() : StyleValidator
    {
        return model_internal::_qty_stdValidator;
    }

    model_internal function set _qty_stdIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_qty_stdIsValid;         
        if (oldValue !== value)
        {
            model_internal::_qty_stdIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_stdIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get qty_stdIsValid():Boolean
    {
        if (!model_internal::_qty_stdIsValidCacheInitialized)
        {
            model_internal::calculateQty_stdIsValid();
        }

        return model_internal::_qty_stdIsValid;
    }

    model_internal function calculateQty_stdIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_qty_stdValidator.validate(model_internal::_instance.qty_std)
        model_internal::_qty_stdIsValid_der = (valRes.results == null);
        model_internal::_qty_stdIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::qty_stdValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::qty_stdValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get qty_stdValidationFailureMessages():Array
    {
        if (model_internal::_qty_stdValidationFailureMessages == null)
            model_internal::calculateQty_stdIsValid();

        return _qty_stdValidationFailureMessages;
    }

    model_internal function set qty_stdValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_qty_stdValidationFailureMessages;

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
            model_internal::_qty_stdValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_stdValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schdspec_shlssuppStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schdspec_shlssuppValidator() : StyleValidator
    {
        return model_internal::_schdspec_shlssuppValidator;
    }

    model_internal function set _schdspec_shlssuppIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schdspec_shlssuppIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schdspec_shlssuppIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schdspec_shlssuppIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schdspec_shlssuppIsValid():Boolean
    {
        if (!model_internal::_schdspec_shlssuppIsValidCacheInitialized)
        {
            model_internal::calculateSchdspec_shlssuppIsValid();
        }

        return model_internal::_schdspec_shlssuppIsValid;
    }

    model_internal function calculateSchdspec_shlssuppIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schdspec_shlssuppValidator.validate(model_internal::_instance.schdspec_shlssupp)
        model_internal::_schdspec_shlssuppIsValid_der = (valRes.results == null);
        model_internal::_schdspec_shlssuppIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schdspec_shlssuppValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schdspec_shlssuppValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schdspec_shlssuppValidationFailureMessages():Array
    {
        if (model_internal::_schdspec_shlssuppValidationFailureMessages == null)
            model_internal::calculateSchdspec_shlssuppIsValid();

        return _schdspec_shlssuppValidationFailureMessages;
    }

    model_internal function set schdspec_shlssuppValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schdspec_shlssuppValidationFailureMessages;

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
            model_internal::_schdspec_shlssuppValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schdspec_shlssuppValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get compartmentStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get compartmentValidator() : StyleValidator
    {
        return model_internal::_compartmentValidator;
    }

    model_internal function set _compartmentIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_compartmentIsValid;         
        if (oldValue !== value)
        {
            model_internal::_compartmentIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "compartmentIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get compartmentIsValid():Boolean
    {
        if (!model_internal::_compartmentIsValidCacheInitialized)
        {
            model_internal::calculateCompartmentIsValid();
        }

        return model_internal::_compartmentIsValid;
    }

    model_internal function calculateCompartmentIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_compartmentValidator.validate(model_internal::_instance.compartment)
        model_internal::_compartmentIsValid_der = (valRes.results == null);
        model_internal::_compartmentIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::compartmentValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::compartmentValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get compartmentValidationFailureMessages():Array
    {
        if (model_internal::_compartmentValidationFailureMessages == null)
            model_internal::calculateCompartmentIsValid();

        return _compartmentValidationFailureMessages;
    }

    model_internal function set compartmentValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_compartmentValidationFailureMessages;

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
            model_internal::_compartmentValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "compartmentValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prod_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prod_nameValidator() : StyleValidator
    {
        return model_internal::_prod_nameValidator;
    }

    model_internal function set _prod_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prod_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prod_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prod_nameIsValid():Boolean
    {
        if (!model_internal::_prod_nameIsValidCacheInitialized)
        {
            model_internal::calculateProd_nameIsValid();
        }

        return model_internal::_prod_nameIsValid;
    }

    model_internal function calculateProd_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prod_nameValidator.validate(model_internal::_instance.prod_name)
        model_internal::_prod_nameIsValid_der = (valRes.results == null);
        model_internal::_prod_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prod_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prod_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prod_nameValidationFailureMessages():Array
    {
        if (model_internal::_prod_nameValidationFailureMessages == null)
            model_internal::calculateProd_nameIsValid();

        return _prod_nameValidationFailureMessages;
    }

    model_internal function set prod_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prod_nameValidationFailureMessages;

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
            model_internal::_prod_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get unit_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get unit_codeValidator() : StyleValidator
    {
        return model_internal::_unit_codeValidator;
    }

    model_internal function set _unit_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_unit_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_unit_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get unit_codeIsValid():Boolean
    {
        if (!model_internal::_unit_codeIsValidCacheInitialized)
        {
            model_internal::calculateUnit_codeIsValid();
        }

        return model_internal::_unit_codeIsValid;
    }

    model_internal function calculateUnit_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_unit_codeValidator.validate(model_internal::_instance.unit_code)
        model_internal::_unit_codeIsValid_der = (valRes.results == null);
        model_internal::_unit_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::unit_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::unit_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get unit_codeValidationFailureMessages():Array
    {
        if (model_internal::_unit_codeValidationFailureMessages == null)
            model_internal::calculateUnit_codeIsValid();

        return _unit_codeValidationFailureMessages;
    }

    model_internal function set unit_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_unit_codeValidationFailureMessages;

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
            model_internal::_unit_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get qty_preloadStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get qty_preloadValidator() : StyleValidator
    {
        return model_internal::_qty_preloadValidator;
    }

    model_internal function set _qty_preloadIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_qty_preloadIsValid;         
        if (oldValue !== value)
        {
            model_internal::_qty_preloadIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_preloadIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get qty_preloadIsValid():Boolean
    {
        if (!model_internal::_qty_preloadIsValidCacheInitialized)
        {
            model_internal::calculateQty_preloadIsValid();
        }

        return model_internal::_qty_preloadIsValid;
    }

    model_internal function calculateQty_preloadIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_qty_preloadValidator.validate(model_internal::_instance.qty_preload)
        model_internal::_qty_preloadIsValid_der = (valRes.results == null);
        model_internal::_qty_preloadIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::qty_preloadValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::qty_preloadValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get qty_preloadValidationFailureMessages():Array
    {
        if (model_internal::_qty_preloadValidationFailureMessages == null)
            model_internal::calculateQty_preloadIsValid();

        return _qty_preloadValidationFailureMessages;
    }

    model_internal function set qty_preloadValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_qty_preloadValidationFailureMessages;

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
            model_internal::_qty_preloadValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_preloadValidationFailureMessages", oldValue, value));
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
            case("preloaded"):
            {
                return preloadedValidationFailureMessages;
            }
            case("qty_loaded"):
            {
                return qty_loadedValidationFailureMessages;
            }
            case("schd_deliv_num"):
            {
                return schd_deliv_numValidationFailureMessages;
            }
            case("qty_scheduled"):
            {
                return qty_scheduledValidationFailureMessages;
            }
            case("schd_ship_to_num"):
            {
                return schd_ship_to_numValidationFailureMessages;
            }
            case("prod_code"):
            {
                return prod_codeValidationFailureMessages;
            }
            case("schdspec_shlstrip"):
            {
                return schdspec_shlstripValidationFailureMessages;
            }
            case("qty_amb"):
            {
                return qty_ambValidationFailureMessages;
            }
            case("prod_cmpy"):
            {
                return prod_cmpyValidationFailureMessages;
            }
            case("qty_kg"):
            {
                return qty_kgValidationFailureMessages;
            }
            case("schd_sold_to_num"):
            {
                return schd_sold_to_numValidationFailureMessages;
            }
            case("unit_name"):
            {
                return unit_nameValidationFailureMessages;
            }
            case("qty_std"):
            {
                return qty_stdValidationFailureMessages;
            }
            case("schdspec_shlssupp"):
            {
                return schdspec_shlssuppValidationFailureMessages;
            }
            case("compartment"):
            {
                return compartmentValidationFailureMessages;
            }
            case("prod_name"):
            {
                return prod_nameValidationFailureMessages;
            }
            case("unit_code"):
            {
                return unit_codeValidationFailureMessages;
            }
            case("qty_preload"):
            {
                return qty_preloadValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
