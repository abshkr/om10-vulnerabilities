
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
internal class _GUI_ORDER_PERIODSEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("oprd_order_id", "oprd_period_end", "oprd_prod_used", "oprd_prod_code", "oprd_period_no", "oprd_drwr_name", "oprd_prod_qty", "oprd_prod_cmpy", "oprd_unit_name", "oprd_prod_price", "oprd_period_start", "oprd_price_fixed", "oprd_prod_unit", "oprd_prod_name");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("oprd_order_id", "oprd_period_end", "oprd_prod_used", "oprd_prod_code", "oprd_period_no", "oprd_drwr_name", "oprd_prod_qty", "oprd_prod_cmpy", "oprd_unit_name", "oprd_prod_price", "oprd_period_start", "oprd_price_fixed", "oprd_prod_unit", "oprd_prod_name");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("oprd_order_id", "oprd_period_end", "oprd_prod_used", "oprd_prod_code", "oprd_period_no", "oprd_drwr_name", "oprd_prod_qty", "oprd_prod_cmpy", "oprd_unit_name", "oprd_prod_price", "oprd_period_start", "oprd_price_fixed", "oprd_prod_unit", "oprd_prod_name");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("oprd_order_id", "oprd_period_end", "oprd_prod_used", "oprd_prod_code", "oprd_period_no", "oprd_drwr_name", "oprd_prod_qty", "oprd_prod_cmpy", "oprd_unit_name", "oprd_prod_price", "oprd_period_start", "oprd_price_fixed", "oprd_prod_unit", "oprd_prod_name");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("oprd_order_id", "oprd_period_end", "oprd_prod_used", "oprd_prod_code", "oprd_period_no", "oprd_drwr_name", "oprd_prod_qty", "oprd_prod_cmpy", "oprd_unit_name", "oprd_prod_price", "oprd_period_start", "oprd_price_fixed", "oprd_prod_unit", "oprd_prod_name");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "GUI_ORDER_PERIODS";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _oprd_order_idIsValid:Boolean;
    model_internal var _oprd_order_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oprd_order_idIsValidCacheInitialized:Boolean = false;
    model_internal var _oprd_order_idValidationFailureMessages:Array;
    
    model_internal var _oprd_period_endIsValid:Boolean;
    model_internal var _oprd_period_endValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oprd_period_endIsValidCacheInitialized:Boolean = false;
    model_internal var _oprd_period_endValidationFailureMessages:Array;
    
    model_internal var _oprd_prod_usedIsValid:Boolean;
    model_internal var _oprd_prod_usedValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oprd_prod_usedIsValidCacheInitialized:Boolean = false;
    model_internal var _oprd_prod_usedValidationFailureMessages:Array;
    
    model_internal var _oprd_prod_codeIsValid:Boolean;
    model_internal var _oprd_prod_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oprd_prod_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _oprd_prod_codeValidationFailureMessages:Array;
    
    model_internal var _oprd_period_noIsValid:Boolean;
    model_internal var _oprd_period_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oprd_period_noIsValidCacheInitialized:Boolean = false;
    model_internal var _oprd_period_noValidationFailureMessages:Array;
    
    model_internal var _oprd_drwr_nameIsValid:Boolean;
    model_internal var _oprd_drwr_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oprd_drwr_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _oprd_drwr_nameValidationFailureMessages:Array;
    
    model_internal var _oprd_prod_qtyIsValid:Boolean;
    model_internal var _oprd_prod_qtyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oprd_prod_qtyIsValidCacheInitialized:Boolean = false;
    model_internal var _oprd_prod_qtyValidationFailureMessages:Array;
    
    model_internal var _oprd_prod_cmpyIsValid:Boolean;
    model_internal var _oprd_prod_cmpyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oprd_prod_cmpyIsValidCacheInitialized:Boolean = false;
    model_internal var _oprd_prod_cmpyValidationFailureMessages:Array;
    
    model_internal var _oprd_unit_nameIsValid:Boolean;
    model_internal var _oprd_unit_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oprd_unit_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _oprd_unit_nameValidationFailureMessages:Array;
    
    model_internal var _oprd_prod_priceIsValid:Boolean;
    model_internal var _oprd_prod_priceValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oprd_prod_priceIsValidCacheInitialized:Boolean = false;
    model_internal var _oprd_prod_priceValidationFailureMessages:Array;
    
    model_internal var _oprd_period_startIsValid:Boolean;
    model_internal var _oprd_period_startValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oprd_period_startIsValidCacheInitialized:Boolean = false;
    model_internal var _oprd_period_startValidationFailureMessages:Array;
    
    model_internal var _oprd_price_fixedIsValid:Boolean;
    model_internal var _oprd_price_fixedValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oprd_price_fixedIsValidCacheInitialized:Boolean = false;
    model_internal var _oprd_price_fixedValidationFailureMessages:Array;
    
    model_internal var _oprd_prod_unitIsValid:Boolean;
    model_internal var _oprd_prod_unitValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oprd_prod_unitIsValidCacheInitialized:Boolean = false;
    model_internal var _oprd_prod_unitValidationFailureMessages:Array;
    
    model_internal var _oprd_prod_nameIsValid:Boolean;
    model_internal var _oprd_prod_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oprd_prod_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _oprd_prod_nameValidationFailureMessages:Array;

    model_internal var _instance:_Super_GUI_ORDER_PERIODS;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _GUI_ORDER_PERIODSEntityMetadata(value : _Super_GUI_ORDER_PERIODS)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["oprd_order_id"] = new Array();
            model_internal::dependentsOnMap["oprd_period_end"] = new Array();
            model_internal::dependentsOnMap["oprd_prod_used"] = new Array();
            model_internal::dependentsOnMap["oprd_prod_code"] = new Array();
            model_internal::dependentsOnMap["oprd_period_no"] = new Array();
            model_internal::dependentsOnMap["oprd_drwr_name"] = new Array();
            model_internal::dependentsOnMap["oprd_prod_qty"] = new Array();
            model_internal::dependentsOnMap["oprd_prod_cmpy"] = new Array();
            model_internal::dependentsOnMap["oprd_unit_name"] = new Array();
            model_internal::dependentsOnMap["oprd_prod_price"] = new Array();
            model_internal::dependentsOnMap["oprd_period_start"] = new Array();
            model_internal::dependentsOnMap["oprd_price_fixed"] = new Array();
            model_internal::dependentsOnMap["oprd_prod_unit"] = new Array();
            model_internal::dependentsOnMap["oprd_prod_name"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["oprd_order_id"] = "String";
        model_internal::propertyTypeMap["oprd_period_end"] = "String";
        model_internal::propertyTypeMap["oprd_prod_used"] = "Object";
        model_internal::propertyTypeMap["oprd_prod_code"] = "String";
        model_internal::propertyTypeMap["oprd_period_no"] = "String";
        model_internal::propertyTypeMap["oprd_drwr_name"] = "String";
        model_internal::propertyTypeMap["oprd_prod_qty"] = "String";
        model_internal::propertyTypeMap["oprd_prod_cmpy"] = "String";
        model_internal::propertyTypeMap["oprd_unit_name"] = "String";
        model_internal::propertyTypeMap["oprd_prod_price"] = "Object";
        model_internal::propertyTypeMap["oprd_period_start"] = "String";
        model_internal::propertyTypeMap["oprd_price_fixed"] = "String";
        model_internal::propertyTypeMap["oprd_prod_unit"] = "String";
        model_internal::propertyTypeMap["oprd_prod_name"] = "String";

        model_internal::_instance = value;
        model_internal::_oprd_order_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOprd_order_id);
        model_internal::_oprd_order_idValidator.required = true;
        model_internal::_oprd_order_idValidator.requiredFieldError = "oprd_order_id is required";
        //model_internal::_oprd_order_idValidator.source = model_internal::_instance;
        //model_internal::_oprd_order_idValidator.property = "oprd_order_id";
        model_internal::_oprd_period_endValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOprd_period_end);
        model_internal::_oprd_period_endValidator.required = true;
        model_internal::_oprd_period_endValidator.requiredFieldError = "oprd_period_end is required";
        //model_internal::_oprd_period_endValidator.source = model_internal::_instance;
        //model_internal::_oprd_period_endValidator.property = "oprd_period_end";
        model_internal::_oprd_prod_usedValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOprd_prod_used);
        model_internal::_oprd_prod_usedValidator.required = true;
        model_internal::_oprd_prod_usedValidator.requiredFieldError = "oprd_prod_used is required";
        //model_internal::_oprd_prod_usedValidator.source = model_internal::_instance;
        //model_internal::_oprd_prod_usedValidator.property = "oprd_prod_used";
        model_internal::_oprd_prod_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOprd_prod_code);
        model_internal::_oprd_prod_codeValidator.required = true;
        model_internal::_oprd_prod_codeValidator.requiredFieldError = "oprd_prod_code is required";
        //model_internal::_oprd_prod_codeValidator.source = model_internal::_instance;
        //model_internal::_oprd_prod_codeValidator.property = "oprd_prod_code";
        model_internal::_oprd_period_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOprd_period_no);
        model_internal::_oprd_period_noValidator.required = true;
        model_internal::_oprd_period_noValidator.requiredFieldError = "oprd_period_no is required";
        //model_internal::_oprd_period_noValidator.source = model_internal::_instance;
        //model_internal::_oprd_period_noValidator.property = "oprd_period_no";
        model_internal::_oprd_drwr_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOprd_drwr_name);
        model_internal::_oprd_drwr_nameValidator.required = true;
        model_internal::_oprd_drwr_nameValidator.requiredFieldError = "oprd_drwr_name is required";
        //model_internal::_oprd_drwr_nameValidator.source = model_internal::_instance;
        //model_internal::_oprd_drwr_nameValidator.property = "oprd_drwr_name";
        model_internal::_oprd_prod_qtyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOprd_prod_qty);
        model_internal::_oprd_prod_qtyValidator.required = true;
        model_internal::_oprd_prod_qtyValidator.requiredFieldError = "oprd_prod_qty is required";
        //model_internal::_oprd_prod_qtyValidator.source = model_internal::_instance;
        //model_internal::_oprd_prod_qtyValidator.property = "oprd_prod_qty";
        model_internal::_oprd_prod_cmpyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOprd_prod_cmpy);
        model_internal::_oprd_prod_cmpyValidator.required = true;
        model_internal::_oprd_prod_cmpyValidator.requiredFieldError = "oprd_prod_cmpy is required";
        //model_internal::_oprd_prod_cmpyValidator.source = model_internal::_instance;
        //model_internal::_oprd_prod_cmpyValidator.property = "oprd_prod_cmpy";
        model_internal::_oprd_unit_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOprd_unit_name);
        model_internal::_oprd_unit_nameValidator.required = true;
        model_internal::_oprd_unit_nameValidator.requiredFieldError = "oprd_unit_name is required";
        //model_internal::_oprd_unit_nameValidator.source = model_internal::_instance;
        //model_internal::_oprd_unit_nameValidator.property = "oprd_unit_name";
        model_internal::_oprd_prod_priceValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOprd_prod_price);
        model_internal::_oprd_prod_priceValidator.required = true;
        model_internal::_oprd_prod_priceValidator.requiredFieldError = "oprd_prod_price is required";
        //model_internal::_oprd_prod_priceValidator.source = model_internal::_instance;
        //model_internal::_oprd_prod_priceValidator.property = "oprd_prod_price";
        model_internal::_oprd_period_startValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOprd_period_start);
        model_internal::_oprd_period_startValidator.required = true;
        model_internal::_oprd_period_startValidator.requiredFieldError = "oprd_period_start is required";
        //model_internal::_oprd_period_startValidator.source = model_internal::_instance;
        //model_internal::_oprd_period_startValidator.property = "oprd_period_start";
        model_internal::_oprd_price_fixedValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOprd_price_fixed);
        model_internal::_oprd_price_fixedValidator.required = true;
        model_internal::_oprd_price_fixedValidator.requiredFieldError = "oprd_price_fixed is required";
        //model_internal::_oprd_price_fixedValidator.source = model_internal::_instance;
        //model_internal::_oprd_price_fixedValidator.property = "oprd_price_fixed";
        model_internal::_oprd_prod_unitValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOprd_prod_unit);
        model_internal::_oprd_prod_unitValidator.required = true;
        model_internal::_oprd_prod_unitValidator.requiredFieldError = "oprd_prod_unit is required";
        //model_internal::_oprd_prod_unitValidator.source = model_internal::_instance;
        //model_internal::_oprd_prod_unitValidator.property = "oprd_prod_unit";
        model_internal::_oprd_prod_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOprd_prod_name);
        model_internal::_oprd_prod_nameValidator.required = true;
        model_internal::_oprd_prod_nameValidator.requiredFieldError = "oprd_prod_name is required";
        //model_internal::_oprd_prod_nameValidator.source = model_internal::_instance;
        //model_internal::_oprd_prod_nameValidator.property = "oprd_prod_name";
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
            throw new Error(propertyName + " is not a data property of entity GUI_ORDER_PERIODS");
            
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
            throw new Error(propertyName + " is not a collection property of entity GUI_ORDER_PERIODS");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of GUI_ORDER_PERIODS");

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
            throw new Error(propertyName + " does not exist for entity GUI_ORDER_PERIODS");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity GUI_ORDER_PERIODS");
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
            throw new Error(propertyName + " does not exist for entity GUI_ORDER_PERIODS");
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
    public function get isOprd_order_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOprd_period_endAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOprd_prod_usedAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOprd_prod_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOprd_period_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOprd_drwr_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOprd_prod_qtyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOprd_prod_cmpyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOprd_unit_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOprd_prod_priceAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOprd_period_startAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOprd_price_fixedAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOprd_prod_unitAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOprd_prod_nameAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnOprd_order_id():void
    {
        if (model_internal::_oprd_order_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOprd_order_id = null;
            model_internal::calculateOprd_order_idIsValid();
        }
    }
    public function invalidateDependentOnOprd_period_end():void
    {
        if (model_internal::_oprd_period_endIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOprd_period_end = null;
            model_internal::calculateOprd_period_endIsValid();
        }
    }
    public function invalidateDependentOnOprd_prod_used():void
    {
        if (model_internal::_oprd_prod_usedIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOprd_prod_used = null;
            model_internal::calculateOprd_prod_usedIsValid();
        }
    }
    public function invalidateDependentOnOprd_prod_code():void
    {
        if (model_internal::_oprd_prod_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOprd_prod_code = null;
            model_internal::calculateOprd_prod_codeIsValid();
        }
    }
    public function invalidateDependentOnOprd_period_no():void
    {
        if (model_internal::_oprd_period_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOprd_period_no = null;
            model_internal::calculateOprd_period_noIsValid();
        }
    }
    public function invalidateDependentOnOprd_drwr_name():void
    {
        if (model_internal::_oprd_drwr_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOprd_drwr_name = null;
            model_internal::calculateOprd_drwr_nameIsValid();
        }
    }
    public function invalidateDependentOnOprd_prod_qty():void
    {
        if (model_internal::_oprd_prod_qtyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOprd_prod_qty = null;
            model_internal::calculateOprd_prod_qtyIsValid();
        }
    }
    public function invalidateDependentOnOprd_prod_cmpy():void
    {
        if (model_internal::_oprd_prod_cmpyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOprd_prod_cmpy = null;
            model_internal::calculateOprd_prod_cmpyIsValid();
        }
    }
    public function invalidateDependentOnOprd_unit_name():void
    {
        if (model_internal::_oprd_unit_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOprd_unit_name = null;
            model_internal::calculateOprd_unit_nameIsValid();
        }
    }
    public function invalidateDependentOnOprd_prod_price():void
    {
        if (model_internal::_oprd_prod_priceIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOprd_prod_price = null;
            model_internal::calculateOprd_prod_priceIsValid();
        }
    }
    public function invalidateDependentOnOprd_period_start():void
    {
        if (model_internal::_oprd_period_startIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOprd_period_start = null;
            model_internal::calculateOprd_period_startIsValid();
        }
    }
    public function invalidateDependentOnOprd_price_fixed():void
    {
        if (model_internal::_oprd_price_fixedIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOprd_price_fixed = null;
            model_internal::calculateOprd_price_fixedIsValid();
        }
    }
    public function invalidateDependentOnOprd_prod_unit():void
    {
        if (model_internal::_oprd_prod_unitIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOprd_prod_unit = null;
            model_internal::calculateOprd_prod_unitIsValid();
        }
    }
    public function invalidateDependentOnOprd_prod_name():void
    {
        if (model_internal::_oprd_prod_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOprd_prod_name = null;
            model_internal::calculateOprd_prod_nameIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get oprd_order_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oprd_order_idValidator() : StyleValidator
    {
        return model_internal::_oprd_order_idValidator;
    }

    model_internal function set _oprd_order_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oprd_order_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oprd_order_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_order_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oprd_order_idIsValid():Boolean
    {
        if (!model_internal::_oprd_order_idIsValidCacheInitialized)
        {
            model_internal::calculateOprd_order_idIsValid();
        }

        return model_internal::_oprd_order_idIsValid;
    }

    model_internal function calculateOprd_order_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oprd_order_idValidator.validate(model_internal::_instance.oprd_order_id)
        model_internal::_oprd_order_idIsValid_der = (valRes.results == null);
        model_internal::_oprd_order_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oprd_order_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oprd_order_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oprd_order_idValidationFailureMessages():Array
    {
        if (model_internal::_oprd_order_idValidationFailureMessages == null)
            model_internal::calculateOprd_order_idIsValid();

        return _oprd_order_idValidationFailureMessages;
    }

    model_internal function set oprd_order_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oprd_order_idValidationFailureMessages;

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
            model_internal::_oprd_order_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_order_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oprd_period_endStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oprd_period_endValidator() : StyleValidator
    {
        return model_internal::_oprd_period_endValidator;
    }

    model_internal function set _oprd_period_endIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oprd_period_endIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oprd_period_endIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_period_endIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oprd_period_endIsValid():Boolean
    {
        if (!model_internal::_oprd_period_endIsValidCacheInitialized)
        {
            model_internal::calculateOprd_period_endIsValid();
        }

        return model_internal::_oprd_period_endIsValid;
    }

    model_internal function calculateOprd_period_endIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oprd_period_endValidator.validate(model_internal::_instance.oprd_period_end)
        model_internal::_oprd_period_endIsValid_der = (valRes.results == null);
        model_internal::_oprd_period_endIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oprd_period_endValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oprd_period_endValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oprd_period_endValidationFailureMessages():Array
    {
        if (model_internal::_oprd_period_endValidationFailureMessages == null)
            model_internal::calculateOprd_period_endIsValid();

        return _oprd_period_endValidationFailureMessages;
    }

    model_internal function set oprd_period_endValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oprd_period_endValidationFailureMessages;

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
            model_internal::_oprd_period_endValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_period_endValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oprd_prod_usedStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oprd_prod_usedValidator() : StyleValidator
    {
        return model_internal::_oprd_prod_usedValidator;
    }

    model_internal function set _oprd_prod_usedIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oprd_prod_usedIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oprd_prod_usedIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_usedIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_usedIsValid():Boolean
    {
        if (!model_internal::_oprd_prod_usedIsValidCacheInitialized)
        {
            model_internal::calculateOprd_prod_usedIsValid();
        }

        return model_internal::_oprd_prod_usedIsValid;
    }

    model_internal function calculateOprd_prod_usedIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oprd_prod_usedValidator.validate(model_internal::_instance.oprd_prod_used)
        model_internal::_oprd_prod_usedIsValid_der = (valRes.results == null);
        model_internal::_oprd_prod_usedIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oprd_prod_usedValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oprd_prod_usedValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_usedValidationFailureMessages():Array
    {
        if (model_internal::_oprd_prod_usedValidationFailureMessages == null)
            model_internal::calculateOprd_prod_usedIsValid();

        return _oprd_prod_usedValidationFailureMessages;
    }

    model_internal function set oprd_prod_usedValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oprd_prod_usedValidationFailureMessages;

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
            model_internal::_oprd_prod_usedValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_usedValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oprd_prod_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oprd_prod_codeValidator() : StyleValidator
    {
        return model_internal::_oprd_prod_codeValidator;
    }

    model_internal function set _oprd_prod_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oprd_prod_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oprd_prod_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_codeIsValid():Boolean
    {
        if (!model_internal::_oprd_prod_codeIsValidCacheInitialized)
        {
            model_internal::calculateOprd_prod_codeIsValid();
        }

        return model_internal::_oprd_prod_codeIsValid;
    }

    model_internal function calculateOprd_prod_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oprd_prod_codeValidator.validate(model_internal::_instance.oprd_prod_code)
        model_internal::_oprd_prod_codeIsValid_der = (valRes.results == null);
        model_internal::_oprd_prod_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oprd_prod_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oprd_prod_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_codeValidationFailureMessages():Array
    {
        if (model_internal::_oprd_prod_codeValidationFailureMessages == null)
            model_internal::calculateOprd_prod_codeIsValid();

        return _oprd_prod_codeValidationFailureMessages;
    }

    model_internal function set oprd_prod_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oprd_prod_codeValidationFailureMessages;

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
            model_internal::_oprd_prod_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oprd_period_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oprd_period_noValidator() : StyleValidator
    {
        return model_internal::_oprd_period_noValidator;
    }

    model_internal function set _oprd_period_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oprd_period_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oprd_period_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_period_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oprd_period_noIsValid():Boolean
    {
        if (!model_internal::_oprd_period_noIsValidCacheInitialized)
        {
            model_internal::calculateOprd_period_noIsValid();
        }

        return model_internal::_oprd_period_noIsValid;
    }

    model_internal function calculateOprd_period_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oprd_period_noValidator.validate(model_internal::_instance.oprd_period_no)
        model_internal::_oprd_period_noIsValid_der = (valRes.results == null);
        model_internal::_oprd_period_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oprd_period_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oprd_period_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oprd_period_noValidationFailureMessages():Array
    {
        if (model_internal::_oprd_period_noValidationFailureMessages == null)
            model_internal::calculateOprd_period_noIsValid();

        return _oprd_period_noValidationFailureMessages;
    }

    model_internal function set oprd_period_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oprd_period_noValidationFailureMessages;

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
            model_internal::_oprd_period_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_period_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oprd_drwr_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oprd_drwr_nameValidator() : StyleValidator
    {
        return model_internal::_oprd_drwr_nameValidator;
    }

    model_internal function set _oprd_drwr_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oprd_drwr_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oprd_drwr_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_drwr_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oprd_drwr_nameIsValid():Boolean
    {
        if (!model_internal::_oprd_drwr_nameIsValidCacheInitialized)
        {
            model_internal::calculateOprd_drwr_nameIsValid();
        }

        return model_internal::_oprd_drwr_nameIsValid;
    }

    model_internal function calculateOprd_drwr_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oprd_drwr_nameValidator.validate(model_internal::_instance.oprd_drwr_name)
        model_internal::_oprd_drwr_nameIsValid_der = (valRes.results == null);
        model_internal::_oprd_drwr_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oprd_drwr_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oprd_drwr_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oprd_drwr_nameValidationFailureMessages():Array
    {
        if (model_internal::_oprd_drwr_nameValidationFailureMessages == null)
            model_internal::calculateOprd_drwr_nameIsValid();

        return _oprd_drwr_nameValidationFailureMessages;
    }

    model_internal function set oprd_drwr_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oprd_drwr_nameValidationFailureMessages;

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
            model_internal::_oprd_drwr_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_drwr_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oprd_prod_qtyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oprd_prod_qtyValidator() : StyleValidator
    {
        return model_internal::_oprd_prod_qtyValidator;
    }

    model_internal function set _oprd_prod_qtyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oprd_prod_qtyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oprd_prod_qtyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_qtyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_qtyIsValid():Boolean
    {
        if (!model_internal::_oprd_prod_qtyIsValidCacheInitialized)
        {
            model_internal::calculateOprd_prod_qtyIsValid();
        }

        return model_internal::_oprd_prod_qtyIsValid;
    }

    model_internal function calculateOprd_prod_qtyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oprd_prod_qtyValidator.validate(model_internal::_instance.oprd_prod_qty)
        model_internal::_oprd_prod_qtyIsValid_der = (valRes.results == null);
        model_internal::_oprd_prod_qtyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oprd_prod_qtyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oprd_prod_qtyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_qtyValidationFailureMessages():Array
    {
        if (model_internal::_oprd_prod_qtyValidationFailureMessages == null)
            model_internal::calculateOprd_prod_qtyIsValid();

        return _oprd_prod_qtyValidationFailureMessages;
    }

    model_internal function set oprd_prod_qtyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oprd_prod_qtyValidationFailureMessages;

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
            model_internal::_oprd_prod_qtyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_qtyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oprd_prod_cmpyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oprd_prod_cmpyValidator() : StyleValidator
    {
        return model_internal::_oprd_prod_cmpyValidator;
    }

    model_internal function set _oprd_prod_cmpyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oprd_prod_cmpyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oprd_prod_cmpyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_cmpyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_cmpyIsValid():Boolean
    {
        if (!model_internal::_oprd_prod_cmpyIsValidCacheInitialized)
        {
            model_internal::calculateOprd_prod_cmpyIsValid();
        }

        return model_internal::_oprd_prod_cmpyIsValid;
    }

    model_internal function calculateOprd_prod_cmpyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oprd_prod_cmpyValidator.validate(model_internal::_instance.oprd_prod_cmpy)
        model_internal::_oprd_prod_cmpyIsValid_der = (valRes.results == null);
        model_internal::_oprd_prod_cmpyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oprd_prod_cmpyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oprd_prod_cmpyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_cmpyValidationFailureMessages():Array
    {
        if (model_internal::_oprd_prod_cmpyValidationFailureMessages == null)
            model_internal::calculateOprd_prod_cmpyIsValid();

        return _oprd_prod_cmpyValidationFailureMessages;
    }

    model_internal function set oprd_prod_cmpyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oprd_prod_cmpyValidationFailureMessages;

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
            model_internal::_oprd_prod_cmpyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_cmpyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oprd_unit_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oprd_unit_nameValidator() : StyleValidator
    {
        return model_internal::_oprd_unit_nameValidator;
    }

    model_internal function set _oprd_unit_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oprd_unit_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oprd_unit_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_unit_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oprd_unit_nameIsValid():Boolean
    {
        if (!model_internal::_oprd_unit_nameIsValidCacheInitialized)
        {
            model_internal::calculateOprd_unit_nameIsValid();
        }

        return model_internal::_oprd_unit_nameIsValid;
    }

    model_internal function calculateOprd_unit_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oprd_unit_nameValidator.validate(model_internal::_instance.oprd_unit_name)
        model_internal::_oprd_unit_nameIsValid_der = (valRes.results == null);
        model_internal::_oprd_unit_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oprd_unit_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oprd_unit_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oprd_unit_nameValidationFailureMessages():Array
    {
        if (model_internal::_oprd_unit_nameValidationFailureMessages == null)
            model_internal::calculateOprd_unit_nameIsValid();

        return _oprd_unit_nameValidationFailureMessages;
    }

    model_internal function set oprd_unit_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oprd_unit_nameValidationFailureMessages;

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
            model_internal::_oprd_unit_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_unit_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oprd_prod_priceStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oprd_prod_priceValidator() : StyleValidator
    {
        return model_internal::_oprd_prod_priceValidator;
    }

    model_internal function set _oprd_prod_priceIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oprd_prod_priceIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oprd_prod_priceIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_priceIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_priceIsValid():Boolean
    {
        if (!model_internal::_oprd_prod_priceIsValidCacheInitialized)
        {
            model_internal::calculateOprd_prod_priceIsValid();
        }

        return model_internal::_oprd_prod_priceIsValid;
    }

    model_internal function calculateOprd_prod_priceIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oprd_prod_priceValidator.validate(model_internal::_instance.oprd_prod_price)
        model_internal::_oprd_prod_priceIsValid_der = (valRes.results == null);
        model_internal::_oprd_prod_priceIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oprd_prod_priceValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oprd_prod_priceValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_priceValidationFailureMessages():Array
    {
        if (model_internal::_oprd_prod_priceValidationFailureMessages == null)
            model_internal::calculateOprd_prod_priceIsValid();

        return _oprd_prod_priceValidationFailureMessages;
    }

    model_internal function set oprd_prod_priceValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oprd_prod_priceValidationFailureMessages;

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
            model_internal::_oprd_prod_priceValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_priceValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oprd_period_startStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oprd_period_startValidator() : StyleValidator
    {
        return model_internal::_oprd_period_startValidator;
    }

    model_internal function set _oprd_period_startIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oprd_period_startIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oprd_period_startIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_period_startIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oprd_period_startIsValid():Boolean
    {
        if (!model_internal::_oprd_period_startIsValidCacheInitialized)
        {
            model_internal::calculateOprd_period_startIsValid();
        }

        return model_internal::_oprd_period_startIsValid;
    }

    model_internal function calculateOprd_period_startIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oprd_period_startValidator.validate(model_internal::_instance.oprd_period_start)
        model_internal::_oprd_period_startIsValid_der = (valRes.results == null);
        model_internal::_oprd_period_startIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oprd_period_startValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oprd_period_startValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oprd_period_startValidationFailureMessages():Array
    {
        if (model_internal::_oprd_period_startValidationFailureMessages == null)
            model_internal::calculateOprd_period_startIsValid();

        return _oprd_period_startValidationFailureMessages;
    }

    model_internal function set oprd_period_startValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oprd_period_startValidationFailureMessages;

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
            model_internal::_oprd_period_startValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_period_startValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oprd_price_fixedStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oprd_price_fixedValidator() : StyleValidator
    {
        return model_internal::_oprd_price_fixedValidator;
    }

    model_internal function set _oprd_price_fixedIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oprd_price_fixedIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oprd_price_fixedIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_price_fixedIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oprd_price_fixedIsValid():Boolean
    {
        if (!model_internal::_oprd_price_fixedIsValidCacheInitialized)
        {
            model_internal::calculateOprd_price_fixedIsValid();
        }

        return model_internal::_oprd_price_fixedIsValid;
    }

    model_internal function calculateOprd_price_fixedIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oprd_price_fixedValidator.validate(model_internal::_instance.oprd_price_fixed)
        model_internal::_oprd_price_fixedIsValid_der = (valRes.results == null);
        model_internal::_oprd_price_fixedIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oprd_price_fixedValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oprd_price_fixedValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oprd_price_fixedValidationFailureMessages():Array
    {
        if (model_internal::_oprd_price_fixedValidationFailureMessages == null)
            model_internal::calculateOprd_price_fixedIsValid();

        return _oprd_price_fixedValidationFailureMessages;
    }

    model_internal function set oprd_price_fixedValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oprd_price_fixedValidationFailureMessages;

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
            model_internal::_oprd_price_fixedValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_price_fixedValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oprd_prod_unitStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oprd_prod_unitValidator() : StyleValidator
    {
        return model_internal::_oprd_prod_unitValidator;
    }

    model_internal function set _oprd_prod_unitIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oprd_prod_unitIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oprd_prod_unitIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_unitIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_unitIsValid():Boolean
    {
        if (!model_internal::_oprd_prod_unitIsValidCacheInitialized)
        {
            model_internal::calculateOprd_prod_unitIsValid();
        }

        return model_internal::_oprd_prod_unitIsValid;
    }

    model_internal function calculateOprd_prod_unitIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oprd_prod_unitValidator.validate(model_internal::_instance.oprd_prod_unit)
        model_internal::_oprd_prod_unitIsValid_der = (valRes.results == null);
        model_internal::_oprd_prod_unitIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oprd_prod_unitValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oprd_prod_unitValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_unitValidationFailureMessages():Array
    {
        if (model_internal::_oprd_prod_unitValidationFailureMessages == null)
            model_internal::calculateOprd_prod_unitIsValid();

        return _oprd_prod_unitValidationFailureMessages;
    }

    model_internal function set oprd_prod_unitValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oprd_prod_unitValidationFailureMessages;

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
            model_internal::_oprd_prod_unitValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_unitValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oprd_prod_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oprd_prod_nameValidator() : StyleValidator
    {
        return model_internal::_oprd_prod_nameValidator;
    }

    model_internal function set _oprd_prod_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oprd_prod_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oprd_prod_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_nameIsValid():Boolean
    {
        if (!model_internal::_oprd_prod_nameIsValidCacheInitialized)
        {
            model_internal::calculateOprd_prod_nameIsValid();
        }

        return model_internal::_oprd_prod_nameIsValid;
    }

    model_internal function calculateOprd_prod_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oprd_prod_nameValidator.validate(model_internal::_instance.oprd_prod_name)
        model_internal::_oprd_prod_nameIsValid_der = (valRes.results == null);
        model_internal::_oprd_prod_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oprd_prod_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oprd_prod_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oprd_prod_nameValidationFailureMessages():Array
    {
        if (model_internal::_oprd_prod_nameValidationFailureMessages == null)
            model_internal::calculateOprd_prod_nameIsValid();

        return _oprd_prod_nameValidationFailureMessages;
    }

    model_internal function set oprd_prod_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oprd_prod_nameValidationFailureMessages;

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
            model_internal::_oprd_prod_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oprd_prod_nameValidationFailureMessages", oldValue, value));
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
            case("oprd_order_id"):
            {
                return oprd_order_idValidationFailureMessages;
            }
            case("oprd_period_end"):
            {
                return oprd_period_endValidationFailureMessages;
            }
            case("oprd_prod_used"):
            {
                return oprd_prod_usedValidationFailureMessages;
            }
            case("oprd_prod_code"):
            {
                return oprd_prod_codeValidationFailureMessages;
            }
            case("oprd_period_no"):
            {
                return oprd_period_noValidationFailureMessages;
            }
            case("oprd_drwr_name"):
            {
                return oprd_drwr_nameValidationFailureMessages;
            }
            case("oprd_prod_qty"):
            {
                return oprd_prod_qtyValidationFailureMessages;
            }
            case("oprd_prod_cmpy"):
            {
                return oprd_prod_cmpyValidationFailureMessages;
            }
            case("oprd_unit_name"):
            {
                return oprd_unit_nameValidationFailureMessages;
            }
            case("oprd_prod_price"):
            {
                return oprd_prod_priceValidationFailureMessages;
            }
            case("oprd_period_start"):
            {
                return oprd_period_startValidationFailureMessages;
            }
            case("oprd_price_fixed"):
            {
                return oprd_price_fixedValidationFailureMessages;
            }
            case("oprd_prod_unit"):
            {
                return oprd_prod_unitValidationFailureMessages;
            }
            case("oprd_prod_name"):
            {
                return oprd_prod_nameValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
