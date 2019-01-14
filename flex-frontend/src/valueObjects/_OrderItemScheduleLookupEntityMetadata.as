
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
internal class _OrderItemScheduleLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("schd_cmpt_no", "schd_prod_unit", "schd_prod_cmpy", "schd_unit_name", "schd_trip_no", "schd_prod_name", "schd_supp_code", "schd_prod_qty", "schd_supplier", "schd_prod_code", "schd_order_id");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("schd_cmpt_no", "schd_prod_unit", "schd_prod_cmpy", "schd_unit_name", "schd_trip_no", "schd_prod_name", "schd_supp_code", "schd_prod_qty", "schd_supplier", "schd_prod_code", "schd_order_id");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("schd_cmpt_no", "schd_prod_unit", "schd_prod_cmpy", "schd_unit_name", "schd_trip_no", "schd_prod_name", "schd_supp_code", "schd_prod_qty", "schd_supplier", "schd_prod_code", "schd_order_id");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("schd_cmpt_no", "schd_prod_unit", "schd_prod_cmpy", "schd_unit_name", "schd_trip_no", "schd_prod_name", "schd_supp_code", "schd_prod_qty", "schd_supplier", "schd_prod_code", "schd_order_id");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("schd_cmpt_no", "schd_prod_unit", "schd_prod_cmpy", "schd_unit_name", "schd_trip_no", "schd_prod_name", "schd_supp_code", "schd_prod_qty", "schd_supplier", "schd_prod_code", "schd_order_id");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "OrderItemScheduleLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _schd_cmpt_noIsValid:Boolean;
    model_internal var _schd_cmpt_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_cmpt_noIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_cmpt_noValidationFailureMessages:Array;
    
    model_internal var _schd_prod_unitIsValid:Boolean;
    model_internal var _schd_prod_unitValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_prod_unitIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_prod_unitValidationFailureMessages:Array;
    
    model_internal var _schd_prod_cmpyIsValid:Boolean;
    model_internal var _schd_prod_cmpyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_prod_cmpyIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_prod_cmpyValidationFailureMessages:Array;
    
    model_internal var _schd_unit_nameIsValid:Boolean;
    model_internal var _schd_unit_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_unit_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_unit_nameValidationFailureMessages:Array;
    
    model_internal var _schd_trip_noIsValid:Boolean;
    model_internal var _schd_trip_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_trip_noIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_trip_noValidationFailureMessages:Array;
    
    model_internal var _schd_prod_nameIsValid:Boolean;
    model_internal var _schd_prod_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_prod_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_prod_nameValidationFailureMessages:Array;
    
    model_internal var _schd_supp_codeIsValid:Boolean;
    model_internal var _schd_supp_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_supp_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_supp_codeValidationFailureMessages:Array;
    
    model_internal var _schd_prod_qtyIsValid:Boolean;
    model_internal var _schd_prod_qtyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_prod_qtyIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_prod_qtyValidationFailureMessages:Array;
    
    model_internal var _schd_supplierIsValid:Boolean;
    model_internal var _schd_supplierValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_supplierIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_supplierValidationFailureMessages:Array;
    
    model_internal var _schd_prod_codeIsValid:Boolean;
    model_internal var _schd_prod_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_prod_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_prod_codeValidationFailureMessages:Array;
    
    model_internal var _schd_order_idIsValid:Boolean;
    model_internal var _schd_order_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_order_idIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_order_idValidationFailureMessages:Array;

    model_internal var _instance:_Super_OrderItemScheduleLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _OrderItemScheduleLookupEntityMetadata(value : _Super_OrderItemScheduleLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["schd_cmpt_no"] = new Array();
            model_internal::dependentsOnMap["schd_prod_unit"] = new Array();
            model_internal::dependentsOnMap["schd_prod_cmpy"] = new Array();
            model_internal::dependentsOnMap["schd_unit_name"] = new Array();
            model_internal::dependentsOnMap["schd_trip_no"] = new Array();
            model_internal::dependentsOnMap["schd_prod_name"] = new Array();
            model_internal::dependentsOnMap["schd_supp_code"] = new Array();
            model_internal::dependentsOnMap["schd_prod_qty"] = new Array();
            model_internal::dependentsOnMap["schd_supplier"] = new Array();
            model_internal::dependentsOnMap["schd_prod_code"] = new Array();
            model_internal::dependentsOnMap["schd_order_id"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["schd_cmpt_no"] = "String";
        model_internal::propertyTypeMap["schd_prod_unit"] = "String";
        model_internal::propertyTypeMap["schd_prod_cmpy"] = "String";
        model_internal::propertyTypeMap["schd_unit_name"] = "String";
        model_internal::propertyTypeMap["schd_trip_no"] = "String";
        model_internal::propertyTypeMap["schd_prod_name"] = "String";
        model_internal::propertyTypeMap["schd_supp_code"] = "String";
        model_internal::propertyTypeMap["schd_prod_qty"] = "String";
        model_internal::propertyTypeMap["schd_supplier"] = "String";
        model_internal::propertyTypeMap["schd_prod_code"] = "String";
        model_internal::propertyTypeMap["schd_order_id"] = "String";

        model_internal::_instance = value;
        model_internal::_schd_cmpt_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_cmpt_no);
        model_internal::_schd_cmpt_noValidator.required = true;
        model_internal::_schd_cmpt_noValidator.requiredFieldError = "schd_cmpt_no is required";
        //model_internal::_schd_cmpt_noValidator.source = model_internal::_instance;
        //model_internal::_schd_cmpt_noValidator.property = "schd_cmpt_no";
        model_internal::_schd_prod_unitValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_prod_unit);
        model_internal::_schd_prod_unitValidator.required = true;
        model_internal::_schd_prod_unitValidator.requiredFieldError = "schd_prod_unit is required";
        //model_internal::_schd_prod_unitValidator.source = model_internal::_instance;
        //model_internal::_schd_prod_unitValidator.property = "schd_prod_unit";
        model_internal::_schd_prod_cmpyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_prod_cmpy);
        model_internal::_schd_prod_cmpyValidator.required = true;
        model_internal::_schd_prod_cmpyValidator.requiredFieldError = "schd_prod_cmpy is required";
        //model_internal::_schd_prod_cmpyValidator.source = model_internal::_instance;
        //model_internal::_schd_prod_cmpyValidator.property = "schd_prod_cmpy";
        model_internal::_schd_unit_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_unit_name);
        model_internal::_schd_unit_nameValidator.required = true;
        model_internal::_schd_unit_nameValidator.requiredFieldError = "schd_unit_name is required";
        //model_internal::_schd_unit_nameValidator.source = model_internal::_instance;
        //model_internal::_schd_unit_nameValidator.property = "schd_unit_name";
        model_internal::_schd_trip_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_trip_no);
        model_internal::_schd_trip_noValidator.required = true;
        model_internal::_schd_trip_noValidator.requiredFieldError = "schd_trip_no is required";
        //model_internal::_schd_trip_noValidator.source = model_internal::_instance;
        //model_internal::_schd_trip_noValidator.property = "schd_trip_no";
        model_internal::_schd_prod_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_prod_name);
        model_internal::_schd_prod_nameValidator.required = true;
        model_internal::_schd_prod_nameValidator.requiredFieldError = "schd_prod_name is required";
        //model_internal::_schd_prod_nameValidator.source = model_internal::_instance;
        //model_internal::_schd_prod_nameValidator.property = "schd_prod_name";
        model_internal::_schd_supp_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_supp_code);
        model_internal::_schd_supp_codeValidator.required = true;
        model_internal::_schd_supp_codeValidator.requiredFieldError = "schd_supp_code is required";
        //model_internal::_schd_supp_codeValidator.source = model_internal::_instance;
        //model_internal::_schd_supp_codeValidator.property = "schd_supp_code";
        model_internal::_schd_prod_qtyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_prod_qty);
        model_internal::_schd_prod_qtyValidator.required = true;
        model_internal::_schd_prod_qtyValidator.requiredFieldError = "schd_prod_qty is required";
        //model_internal::_schd_prod_qtyValidator.source = model_internal::_instance;
        //model_internal::_schd_prod_qtyValidator.property = "schd_prod_qty";
        model_internal::_schd_supplierValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_supplier);
        model_internal::_schd_supplierValidator.required = true;
        model_internal::_schd_supplierValidator.requiredFieldError = "schd_supplier is required";
        //model_internal::_schd_supplierValidator.source = model_internal::_instance;
        //model_internal::_schd_supplierValidator.property = "schd_supplier";
        model_internal::_schd_prod_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_prod_code);
        model_internal::_schd_prod_codeValidator.required = true;
        model_internal::_schd_prod_codeValidator.requiredFieldError = "schd_prod_code is required";
        //model_internal::_schd_prod_codeValidator.source = model_internal::_instance;
        //model_internal::_schd_prod_codeValidator.property = "schd_prod_code";
        model_internal::_schd_order_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_order_id);
        model_internal::_schd_order_idValidator.required = true;
        model_internal::_schd_order_idValidator.requiredFieldError = "schd_order_id is required";
        //model_internal::_schd_order_idValidator.source = model_internal::_instance;
        //model_internal::_schd_order_idValidator.property = "schd_order_id";
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
            throw new Error(propertyName + " is not a data property of entity OrderItemScheduleLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity OrderItemScheduleLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of OrderItemScheduleLookup");

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
            throw new Error(propertyName + " does not exist for entity OrderItemScheduleLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity OrderItemScheduleLookup");
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
            throw new Error(propertyName + " does not exist for entity OrderItemScheduleLookup");
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
    public function get isSchd_cmpt_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_prod_unitAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_prod_cmpyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_unit_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_trip_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_prod_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_supp_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_prod_qtyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_supplierAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_prod_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_order_idAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnSchd_cmpt_no():void
    {
        if (model_internal::_schd_cmpt_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_cmpt_no = null;
            model_internal::calculateSchd_cmpt_noIsValid();
        }
    }
    public function invalidateDependentOnSchd_prod_unit():void
    {
        if (model_internal::_schd_prod_unitIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_prod_unit = null;
            model_internal::calculateSchd_prod_unitIsValid();
        }
    }
    public function invalidateDependentOnSchd_prod_cmpy():void
    {
        if (model_internal::_schd_prod_cmpyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_prod_cmpy = null;
            model_internal::calculateSchd_prod_cmpyIsValid();
        }
    }
    public function invalidateDependentOnSchd_unit_name():void
    {
        if (model_internal::_schd_unit_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_unit_name = null;
            model_internal::calculateSchd_unit_nameIsValid();
        }
    }
    public function invalidateDependentOnSchd_trip_no():void
    {
        if (model_internal::_schd_trip_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_trip_no = null;
            model_internal::calculateSchd_trip_noIsValid();
        }
    }
    public function invalidateDependentOnSchd_prod_name():void
    {
        if (model_internal::_schd_prod_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_prod_name = null;
            model_internal::calculateSchd_prod_nameIsValid();
        }
    }
    public function invalidateDependentOnSchd_supp_code():void
    {
        if (model_internal::_schd_supp_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_supp_code = null;
            model_internal::calculateSchd_supp_codeIsValid();
        }
    }
    public function invalidateDependentOnSchd_prod_qty():void
    {
        if (model_internal::_schd_prod_qtyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_prod_qty = null;
            model_internal::calculateSchd_prod_qtyIsValid();
        }
    }
    public function invalidateDependentOnSchd_supplier():void
    {
        if (model_internal::_schd_supplierIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_supplier = null;
            model_internal::calculateSchd_supplierIsValid();
        }
    }
    public function invalidateDependentOnSchd_prod_code():void
    {
        if (model_internal::_schd_prod_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_prod_code = null;
            model_internal::calculateSchd_prod_codeIsValid();
        }
    }
    public function invalidateDependentOnSchd_order_id():void
    {
        if (model_internal::_schd_order_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_order_id = null;
            model_internal::calculateSchd_order_idIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get schd_cmpt_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_cmpt_noValidator() : StyleValidator
    {
        return model_internal::_schd_cmpt_noValidator;
    }

    model_internal function set _schd_cmpt_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_cmpt_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_cmpt_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_cmpt_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_cmpt_noIsValid():Boolean
    {
        if (!model_internal::_schd_cmpt_noIsValidCacheInitialized)
        {
            model_internal::calculateSchd_cmpt_noIsValid();
        }

        return model_internal::_schd_cmpt_noIsValid;
    }

    model_internal function calculateSchd_cmpt_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_cmpt_noValidator.validate(model_internal::_instance.schd_cmpt_no)
        model_internal::_schd_cmpt_noIsValid_der = (valRes.results == null);
        model_internal::_schd_cmpt_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_cmpt_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_cmpt_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_cmpt_noValidationFailureMessages():Array
    {
        if (model_internal::_schd_cmpt_noValidationFailureMessages == null)
            model_internal::calculateSchd_cmpt_noIsValid();

        return _schd_cmpt_noValidationFailureMessages;
    }

    model_internal function set schd_cmpt_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_cmpt_noValidationFailureMessages;

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
            model_internal::_schd_cmpt_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_cmpt_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_prod_unitStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_prod_unitValidator() : StyleValidator
    {
        return model_internal::_schd_prod_unitValidator;
    }

    model_internal function set _schd_prod_unitIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_prod_unitIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_prod_unitIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_prod_unitIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_prod_unitIsValid():Boolean
    {
        if (!model_internal::_schd_prod_unitIsValidCacheInitialized)
        {
            model_internal::calculateSchd_prod_unitIsValid();
        }

        return model_internal::_schd_prod_unitIsValid;
    }

    model_internal function calculateSchd_prod_unitIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_prod_unitValidator.validate(model_internal::_instance.schd_prod_unit)
        model_internal::_schd_prod_unitIsValid_der = (valRes.results == null);
        model_internal::_schd_prod_unitIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_prod_unitValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_prod_unitValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_prod_unitValidationFailureMessages():Array
    {
        if (model_internal::_schd_prod_unitValidationFailureMessages == null)
            model_internal::calculateSchd_prod_unitIsValid();

        return _schd_prod_unitValidationFailureMessages;
    }

    model_internal function set schd_prod_unitValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_prod_unitValidationFailureMessages;

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
            model_internal::_schd_prod_unitValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_prod_unitValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_prod_cmpyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_prod_cmpyValidator() : StyleValidator
    {
        return model_internal::_schd_prod_cmpyValidator;
    }

    model_internal function set _schd_prod_cmpyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_prod_cmpyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_prod_cmpyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_prod_cmpyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_prod_cmpyIsValid():Boolean
    {
        if (!model_internal::_schd_prod_cmpyIsValidCacheInitialized)
        {
            model_internal::calculateSchd_prod_cmpyIsValid();
        }

        return model_internal::_schd_prod_cmpyIsValid;
    }

    model_internal function calculateSchd_prod_cmpyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_prod_cmpyValidator.validate(model_internal::_instance.schd_prod_cmpy)
        model_internal::_schd_prod_cmpyIsValid_der = (valRes.results == null);
        model_internal::_schd_prod_cmpyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_prod_cmpyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_prod_cmpyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_prod_cmpyValidationFailureMessages():Array
    {
        if (model_internal::_schd_prod_cmpyValidationFailureMessages == null)
            model_internal::calculateSchd_prod_cmpyIsValid();

        return _schd_prod_cmpyValidationFailureMessages;
    }

    model_internal function set schd_prod_cmpyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_prod_cmpyValidationFailureMessages;

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
            model_internal::_schd_prod_cmpyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_prod_cmpyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_unit_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_unit_nameValidator() : StyleValidator
    {
        return model_internal::_schd_unit_nameValidator;
    }

    model_internal function set _schd_unit_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_unit_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_unit_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_unit_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_unit_nameIsValid():Boolean
    {
        if (!model_internal::_schd_unit_nameIsValidCacheInitialized)
        {
            model_internal::calculateSchd_unit_nameIsValid();
        }

        return model_internal::_schd_unit_nameIsValid;
    }

    model_internal function calculateSchd_unit_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_unit_nameValidator.validate(model_internal::_instance.schd_unit_name)
        model_internal::_schd_unit_nameIsValid_der = (valRes.results == null);
        model_internal::_schd_unit_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_unit_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_unit_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_unit_nameValidationFailureMessages():Array
    {
        if (model_internal::_schd_unit_nameValidationFailureMessages == null)
            model_internal::calculateSchd_unit_nameIsValid();

        return _schd_unit_nameValidationFailureMessages;
    }

    model_internal function set schd_unit_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_unit_nameValidationFailureMessages;

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
            model_internal::_schd_unit_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_unit_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_trip_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_trip_noValidator() : StyleValidator
    {
        return model_internal::_schd_trip_noValidator;
    }

    model_internal function set _schd_trip_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_trip_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_trip_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_trip_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_trip_noIsValid():Boolean
    {
        if (!model_internal::_schd_trip_noIsValidCacheInitialized)
        {
            model_internal::calculateSchd_trip_noIsValid();
        }

        return model_internal::_schd_trip_noIsValid;
    }

    model_internal function calculateSchd_trip_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_trip_noValidator.validate(model_internal::_instance.schd_trip_no)
        model_internal::_schd_trip_noIsValid_der = (valRes.results == null);
        model_internal::_schd_trip_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_trip_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_trip_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_trip_noValidationFailureMessages():Array
    {
        if (model_internal::_schd_trip_noValidationFailureMessages == null)
            model_internal::calculateSchd_trip_noIsValid();

        return _schd_trip_noValidationFailureMessages;
    }

    model_internal function set schd_trip_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_trip_noValidationFailureMessages;

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
            model_internal::_schd_trip_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_trip_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_prod_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_prod_nameValidator() : StyleValidator
    {
        return model_internal::_schd_prod_nameValidator;
    }

    model_internal function set _schd_prod_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_prod_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_prod_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_prod_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_prod_nameIsValid():Boolean
    {
        if (!model_internal::_schd_prod_nameIsValidCacheInitialized)
        {
            model_internal::calculateSchd_prod_nameIsValid();
        }

        return model_internal::_schd_prod_nameIsValid;
    }

    model_internal function calculateSchd_prod_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_prod_nameValidator.validate(model_internal::_instance.schd_prod_name)
        model_internal::_schd_prod_nameIsValid_der = (valRes.results == null);
        model_internal::_schd_prod_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_prod_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_prod_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_prod_nameValidationFailureMessages():Array
    {
        if (model_internal::_schd_prod_nameValidationFailureMessages == null)
            model_internal::calculateSchd_prod_nameIsValid();

        return _schd_prod_nameValidationFailureMessages;
    }

    model_internal function set schd_prod_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_prod_nameValidationFailureMessages;

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
            model_internal::_schd_prod_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_prod_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_supp_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_supp_codeValidator() : StyleValidator
    {
        return model_internal::_schd_supp_codeValidator;
    }

    model_internal function set _schd_supp_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_supp_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_supp_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_supp_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_supp_codeIsValid():Boolean
    {
        if (!model_internal::_schd_supp_codeIsValidCacheInitialized)
        {
            model_internal::calculateSchd_supp_codeIsValid();
        }

        return model_internal::_schd_supp_codeIsValid;
    }

    model_internal function calculateSchd_supp_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_supp_codeValidator.validate(model_internal::_instance.schd_supp_code)
        model_internal::_schd_supp_codeIsValid_der = (valRes.results == null);
        model_internal::_schd_supp_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_supp_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_supp_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_supp_codeValidationFailureMessages():Array
    {
        if (model_internal::_schd_supp_codeValidationFailureMessages == null)
            model_internal::calculateSchd_supp_codeIsValid();

        return _schd_supp_codeValidationFailureMessages;
    }

    model_internal function set schd_supp_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_supp_codeValidationFailureMessages;

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
            model_internal::_schd_supp_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_supp_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_prod_qtyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_prod_qtyValidator() : StyleValidator
    {
        return model_internal::_schd_prod_qtyValidator;
    }

    model_internal function set _schd_prod_qtyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_prod_qtyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_prod_qtyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_prod_qtyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_prod_qtyIsValid():Boolean
    {
        if (!model_internal::_schd_prod_qtyIsValidCacheInitialized)
        {
            model_internal::calculateSchd_prod_qtyIsValid();
        }

        return model_internal::_schd_prod_qtyIsValid;
    }

    model_internal function calculateSchd_prod_qtyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_prod_qtyValidator.validate(model_internal::_instance.schd_prod_qty)
        model_internal::_schd_prod_qtyIsValid_der = (valRes.results == null);
        model_internal::_schd_prod_qtyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_prod_qtyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_prod_qtyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_prod_qtyValidationFailureMessages():Array
    {
        if (model_internal::_schd_prod_qtyValidationFailureMessages == null)
            model_internal::calculateSchd_prod_qtyIsValid();

        return _schd_prod_qtyValidationFailureMessages;
    }

    model_internal function set schd_prod_qtyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_prod_qtyValidationFailureMessages;

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
            model_internal::_schd_prod_qtyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_prod_qtyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_supplierStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_supplierValidator() : StyleValidator
    {
        return model_internal::_schd_supplierValidator;
    }

    model_internal function set _schd_supplierIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_supplierIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_supplierIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_supplierIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_supplierIsValid():Boolean
    {
        if (!model_internal::_schd_supplierIsValidCacheInitialized)
        {
            model_internal::calculateSchd_supplierIsValid();
        }

        return model_internal::_schd_supplierIsValid;
    }

    model_internal function calculateSchd_supplierIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_supplierValidator.validate(model_internal::_instance.schd_supplier)
        model_internal::_schd_supplierIsValid_der = (valRes.results == null);
        model_internal::_schd_supplierIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_supplierValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_supplierValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_supplierValidationFailureMessages():Array
    {
        if (model_internal::_schd_supplierValidationFailureMessages == null)
            model_internal::calculateSchd_supplierIsValid();

        return _schd_supplierValidationFailureMessages;
    }

    model_internal function set schd_supplierValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_supplierValidationFailureMessages;

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
            model_internal::_schd_supplierValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_supplierValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_prod_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_prod_codeValidator() : StyleValidator
    {
        return model_internal::_schd_prod_codeValidator;
    }

    model_internal function set _schd_prod_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_prod_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_prod_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_prod_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_prod_codeIsValid():Boolean
    {
        if (!model_internal::_schd_prod_codeIsValidCacheInitialized)
        {
            model_internal::calculateSchd_prod_codeIsValid();
        }

        return model_internal::_schd_prod_codeIsValid;
    }

    model_internal function calculateSchd_prod_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_prod_codeValidator.validate(model_internal::_instance.schd_prod_code)
        model_internal::_schd_prod_codeIsValid_der = (valRes.results == null);
        model_internal::_schd_prod_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_prod_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_prod_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_prod_codeValidationFailureMessages():Array
    {
        if (model_internal::_schd_prod_codeValidationFailureMessages == null)
            model_internal::calculateSchd_prod_codeIsValid();

        return _schd_prod_codeValidationFailureMessages;
    }

    model_internal function set schd_prod_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_prod_codeValidationFailureMessages;

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
            model_internal::_schd_prod_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_prod_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_order_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_order_idValidator() : StyleValidator
    {
        return model_internal::_schd_order_idValidator;
    }

    model_internal function set _schd_order_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_order_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_order_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_order_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_order_idIsValid():Boolean
    {
        if (!model_internal::_schd_order_idIsValidCacheInitialized)
        {
            model_internal::calculateSchd_order_idIsValid();
        }

        return model_internal::_schd_order_idIsValid;
    }

    model_internal function calculateSchd_order_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_order_idValidator.validate(model_internal::_instance.schd_order_id)
        model_internal::_schd_order_idIsValid_der = (valRes.results == null);
        model_internal::_schd_order_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_order_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_order_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_order_idValidationFailureMessages():Array
    {
        if (model_internal::_schd_order_idValidationFailureMessages == null)
            model_internal::calculateSchd_order_idIsValid();

        return _schd_order_idValidationFailureMessages;
    }

    model_internal function set schd_order_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_order_idValidationFailureMessages;

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
            model_internal::_schd_order_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_order_idValidationFailureMessages", oldValue, value));
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
            case("schd_cmpt_no"):
            {
                return schd_cmpt_noValidationFailureMessages;
            }
            case("schd_prod_unit"):
            {
                return schd_prod_unitValidationFailureMessages;
            }
            case("schd_prod_cmpy"):
            {
                return schd_prod_cmpyValidationFailureMessages;
            }
            case("schd_unit_name"):
            {
                return schd_unit_nameValidationFailureMessages;
            }
            case("schd_trip_no"):
            {
                return schd_trip_noValidationFailureMessages;
            }
            case("schd_prod_name"):
            {
                return schd_prod_nameValidationFailureMessages;
            }
            case("schd_supp_code"):
            {
                return schd_supp_codeValidationFailureMessages;
            }
            case("schd_prod_qty"):
            {
                return schd_prod_qtyValidationFailureMessages;
            }
            case("schd_supplier"):
            {
                return schd_supplierValidationFailureMessages;
            }
            case("schd_prod_code"):
            {
                return schd_prod_codeValidationFailureMessages;
            }
            case("schd_order_id"):
            {
                return schd_order_idValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
