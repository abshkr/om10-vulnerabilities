
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
internal class _OrderProductLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("prod_cmpy", "prod_class", "prod_cmpy_name", "prod_is_blend", "prod_rpt_unit", "prod_rpt_temp", "prod_prod_group", "prod_code", "prod_name");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("prod_cmpy", "prod_class", "prod_cmpy_name", "prod_is_blend", "prod_rpt_unit", "prod_rpt_temp", "prod_prod_group", "prod_code", "prod_name");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("prod_cmpy", "prod_class", "prod_cmpy_name", "prod_is_blend", "prod_rpt_unit", "prod_rpt_temp", "prod_prod_group", "prod_code", "prod_name");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("prod_cmpy", "prod_class", "prod_cmpy_name", "prod_is_blend", "prod_rpt_unit", "prod_rpt_temp", "prod_prod_group", "prod_code", "prod_name");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("prod_cmpy", "prod_class", "prod_cmpy_name", "prod_is_blend", "prod_rpt_unit", "prod_rpt_temp", "prod_prod_group", "prod_code", "prod_name");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "OrderProductLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _prod_cmpyIsValid:Boolean;
    model_internal var _prod_cmpyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_cmpyIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_cmpyValidationFailureMessages:Array;
    
    model_internal var _prod_classIsValid:Boolean;
    model_internal var _prod_classValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_classIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_classValidationFailureMessages:Array;
    
    model_internal var _prod_cmpy_nameIsValid:Boolean;
    model_internal var _prod_cmpy_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_cmpy_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_cmpy_nameValidationFailureMessages:Array;
    
    model_internal var _prod_is_blendIsValid:Boolean;
    model_internal var _prod_is_blendValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_is_blendIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_is_blendValidationFailureMessages:Array;
    
    model_internal var _prod_rpt_unitIsValid:Boolean;
    model_internal var _prod_rpt_unitValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_rpt_unitIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_rpt_unitValidationFailureMessages:Array;
    
    model_internal var _prod_rpt_tempIsValid:Boolean;
    model_internal var _prod_rpt_tempValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_rpt_tempIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_rpt_tempValidationFailureMessages:Array;
    
    model_internal var _prod_prod_groupIsValid:Boolean;
    model_internal var _prod_prod_groupValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_prod_groupIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_prod_groupValidationFailureMessages:Array;
    
    model_internal var _prod_codeIsValid:Boolean;
    model_internal var _prod_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_codeValidationFailureMessages:Array;
    
    model_internal var _prod_nameIsValid:Boolean;
    model_internal var _prod_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_nameValidationFailureMessages:Array;

    model_internal var _instance:_Super_OrderProductLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _OrderProductLookupEntityMetadata(value : _Super_OrderProductLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["prod_cmpy"] = new Array();
            model_internal::dependentsOnMap["prod_class"] = new Array();
            model_internal::dependentsOnMap["prod_cmpy_name"] = new Array();
            model_internal::dependentsOnMap["prod_is_blend"] = new Array();
            model_internal::dependentsOnMap["prod_rpt_unit"] = new Array();
            model_internal::dependentsOnMap["prod_rpt_temp"] = new Array();
            model_internal::dependentsOnMap["prod_prod_group"] = new Array();
            model_internal::dependentsOnMap["prod_code"] = new Array();
            model_internal::dependentsOnMap["prod_name"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["prod_cmpy"] = "String";
        model_internal::propertyTypeMap["prod_class"] = "String";
        model_internal::propertyTypeMap["prod_cmpy_name"] = "String";
        model_internal::propertyTypeMap["prod_is_blend"] = "Object";
        model_internal::propertyTypeMap["prod_rpt_unit"] = "Object";
        model_internal::propertyTypeMap["prod_rpt_temp"] = "Object";
        model_internal::propertyTypeMap["prod_prod_group"] = "Object";
        model_internal::propertyTypeMap["prod_code"] = "String";
        model_internal::propertyTypeMap["prod_name"] = "String";

        model_internal::_instance = value;
        model_internal::_prod_cmpyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_cmpy);
        model_internal::_prod_cmpyValidator.required = true;
        model_internal::_prod_cmpyValidator.requiredFieldError = "prod_cmpy is required";
        //model_internal::_prod_cmpyValidator.source = model_internal::_instance;
        //model_internal::_prod_cmpyValidator.property = "prod_cmpy";
        model_internal::_prod_classValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_class);
        model_internal::_prod_classValidator.required = true;
        model_internal::_prod_classValidator.requiredFieldError = "prod_class is required";
        //model_internal::_prod_classValidator.source = model_internal::_instance;
        //model_internal::_prod_classValidator.property = "prod_class";
        model_internal::_prod_cmpy_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_cmpy_name);
        model_internal::_prod_cmpy_nameValidator.required = true;
        model_internal::_prod_cmpy_nameValidator.requiredFieldError = "prod_cmpy_name is required";
        //model_internal::_prod_cmpy_nameValidator.source = model_internal::_instance;
        //model_internal::_prod_cmpy_nameValidator.property = "prod_cmpy_name";
        model_internal::_prod_is_blendValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_is_blend);
        model_internal::_prod_is_blendValidator.required = true;
        model_internal::_prod_is_blendValidator.requiredFieldError = "prod_is_blend is required";
        //model_internal::_prod_is_blendValidator.source = model_internal::_instance;
        //model_internal::_prod_is_blendValidator.property = "prod_is_blend";
        model_internal::_prod_rpt_unitValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_rpt_unit);
        model_internal::_prod_rpt_unitValidator.required = true;
        model_internal::_prod_rpt_unitValidator.requiredFieldError = "prod_rpt_unit is required";
        //model_internal::_prod_rpt_unitValidator.source = model_internal::_instance;
        //model_internal::_prod_rpt_unitValidator.property = "prod_rpt_unit";
        model_internal::_prod_rpt_tempValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_rpt_temp);
        model_internal::_prod_rpt_tempValidator.required = true;
        model_internal::_prod_rpt_tempValidator.requiredFieldError = "prod_rpt_temp is required";
        //model_internal::_prod_rpt_tempValidator.source = model_internal::_instance;
        //model_internal::_prod_rpt_tempValidator.property = "prod_rpt_temp";
        model_internal::_prod_prod_groupValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_prod_group);
        model_internal::_prod_prod_groupValidator.required = true;
        model_internal::_prod_prod_groupValidator.requiredFieldError = "prod_prod_group is required";
        //model_internal::_prod_prod_groupValidator.source = model_internal::_instance;
        //model_internal::_prod_prod_groupValidator.property = "prod_prod_group";
        model_internal::_prod_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_code);
        model_internal::_prod_codeValidator.required = true;
        model_internal::_prod_codeValidator.requiredFieldError = "prod_code is required";
        //model_internal::_prod_codeValidator.source = model_internal::_instance;
        //model_internal::_prod_codeValidator.property = "prod_code";
        model_internal::_prod_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_name);
        model_internal::_prod_nameValidator.required = true;
        model_internal::_prod_nameValidator.requiredFieldError = "prod_name is required";
        //model_internal::_prod_nameValidator.source = model_internal::_instance;
        //model_internal::_prod_nameValidator.property = "prod_name";
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
            throw new Error(propertyName + " is not a data property of entity OrderProductLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity OrderProductLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of OrderProductLookup");

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
            throw new Error(propertyName + " does not exist for entity OrderProductLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity OrderProductLookup");
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
            throw new Error(propertyName + " does not exist for entity OrderProductLookup");
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
    public function get isProd_cmpyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProd_classAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProd_cmpy_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProd_is_blendAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProd_rpt_unitAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProd_rpt_tempAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProd_prod_groupAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProd_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProd_nameAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnProd_cmpy():void
    {
        if (model_internal::_prod_cmpyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_cmpy = null;
            model_internal::calculateProd_cmpyIsValid();
        }
    }
    public function invalidateDependentOnProd_class():void
    {
        if (model_internal::_prod_classIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_class = null;
            model_internal::calculateProd_classIsValid();
        }
    }
    public function invalidateDependentOnProd_cmpy_name():void
    {
        if (model_internal::_prod_cmpy_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_cmpy_name = null;
            model_internal::calculateProd_cmpy_nameIsValid();
        }
    }
    public function invalidateDependentOnProd_is_blend():void
    {
        if (model_internal::_prod_is_blendIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_is_blend = null;
            model_internal::calculateProd_is_blendIsValid();
        }
    }
    public function invalidateDependentOnProd_rpt_unit():void
    {
        if (model_internal::_prod_rpt_unitIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_rpt_unit = null;
            model_internal::calculateProd_rpt_unitIsValid();
        }
    }
    public function invalidateDependentOnProd_rpt_temp():void
    {
        if (model_internal::_prod_rpt_tempIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_rpt_temp = null;
            model_internal::calculateProd_rpt_tempIsValid();
        }
    }
    public function invalidateDependentOnProd_prod_group():void
    {
        if (model_internal::_prod_prod_groupIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_prod_group = null;
            model_internal::calculateProd_prod_groupIsValid();
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
    public function invalidateDependentOnProd_name():void
    {
        if (model_internal::_prod_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_name = null;
            model_internal::calculateProd_nameIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
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
    public function get prod_classStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prod_classValidator() : StyleValidator
    {
        return model_internal::_prod_classValidator;
    }

    model_internal function set _prod_classIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prod_classIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prod_classIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_classIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prod_classIsValid():Boolean
    {
        if (!model_internal::_prod_classIsValidCacheInitialized)
        {
            model_internal::calculateProd_classIsValid();
        }

        return model_internal::_prod_classIsValid;
    }

    model_internal function calculateProd_classIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prod_classValidator.validate(model_internal::_instance.prod_class)
        model_internal::_prod_classIsValid_der = (valRes.results == null);
        model_internal::_prod_classIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prod_classValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prod_classValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prod_classValidationFailureMessages():Array
    {
        if (model_internal::_prod_classValidationFailureMessages == null)
            model_internal::calculateProd_classIsValid();

        return _prod_classValidationFailureMessages;
    }

    model_internal function set prod_classValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prod_classValidationFailureMessages;

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
            model_internal::_prod_classValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_classValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prod_cmpy_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prod_cmpy_nameValidator() : StyleValidator
    {
        return model_internal::_prod_cmpy_nameValidator;
    }

    model_internal function set _prod_cmpy_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prod_cmpy_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prod_cmpy_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_cmpy_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prod_cmpy_nameIsValid():Boolean
    {
        if (!model_internal::_prod_cmpy_nameIsValidCacheInitialized)
        {
            model_internal::calculateProd_cmpy_nameIsValid();
        }

        return model_internal::_prod_cmpy_nameIsValid;
    }

    model_internal function calculateProd_cmpy_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prod_cmpy_nameValidator.validate(model_internal::_instance.prod_cmpy_name)
        model_internal::_prod_cmpy_nameIsValid_der = (valRes.results == null);
        model_internal::_prod_cmpy_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prod_cmpy_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prod_cmpy_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prod_cmpy_nameValidationFailureMessages():Array
    {
        if (model_internal::_prod_cmpy_nameValidationFailureMessages == null)
            model_internal::calculateProd_cmpy_nameIsValid();

        return _prod_cmpy_nameValidationFailureMessages;
    }

    model_internal function set prod_cmpy_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prod_cmpy_nameValidationFailureMessages;

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
            model_internal::_prod_cmpy_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_cmpy_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prod_is_blendStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prod_is_blendValidator() : StyleValidator
    {
        return model_internal::_prod_is_blendValidator;
    }

    model_internal function set _prod_is_blendIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prod_is_blendIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prod_is_blendIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_is_blendIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prod_is_blendIsValid():Boolean
    {
        if (!model_internal::_prod_is_blendIsValidCacheInitialized)
        {
            model_internal::calculateProd_is_blendIsValid();
        }

        return model_internal::_prod_is_blendIsValid;
    }

    model_internal function calculateProd_is_blendIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prod_is_blendValidator.validate(model_internal::_instance.prod_is_blend)
        model_internal::_prod_is_blendIsValid_der = (valRes.results == null);
        model_internal::_prod_is_blendIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prod_is_blendValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prod_is_blendValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prod_is_blendValidationFailureMessages():Array
    {
        if (model_internal::_prod_is_blendValidationFailureMessages == null)
            model_internal::calculateProd_is_blendIsValid();

        return _prod_is_blendValidationFailureMessages;
    }

    model_internal function set prod_is_blendValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prod_is_blendValidationFailureMessages;

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
            model_internal::_prod_is_blendValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_is_blendValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prod_rpt_unitStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prod_rpt_unitValidator() : StyleValidator
    {
        return model_internal::_prod_rpt_unitValidator;
    }

    model_internal function set _prod_rpt_unitIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prod_rpt_unitIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prod_rpt_unitIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_rpt_unitIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prod_rpt_unitIsValid():Boolean
    {
        if (!model_internal::_prod_rpt_unitIsValidCacheInitialized)
        {
            model_internal::calculateProd_rpt_unitIsValid();
        }

        return model_internal::_prod_rpt_unitIsValid;
    }

    model_internal function calculateProd_rpt_unitIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prod_rpt_unitValidator.validate(model_internal::_instance.prod_rpt_unit)
        model_internal::_prod_rpt_unitIsValid_der = (valRes.results == null);
        model_internal::_prod_rpt_unitIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prod_rpt_unitValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prod_rpt_unitValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prod_rpt_unitValidationFailureMessages():Array
    {
        if (model_internal::_prod_rpt_unitValidationFailureMessages == null)
            model_internal::calculateProd_rpt_unitIsValid();

        return _prod_rpt_unitValidationFailureMessages;
    }

    model_internal function set prod_rpt_unitValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prod_rpt_unitValidationFailureMessages;

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
            model_internal::_prod_rpt_unitValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_rpt_unitValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prod_rpt_tempStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prod_rpt_tempValidator() : StyleValidator
    {
        return model_internal::_prod_rpt_tempValidator;
    }

    model_internal function set _prod_rpt_tempIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prod_rpt_tempIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prod_rpt_tempIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_rpt_tempIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prod_rpt_tempIsValid():Boolean
    {
        if (!model_internal::_prod_rpt_tempIsValidCacheInitialized)
        {
            model_internal::calculateProd_rpt_tempIsValid();
        }

        return model_internal::_prod_rpt_tempIsValid;
    }

    model_internal function calculateProd_rpt_tempIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prod_rpt_tempValidator.validate(model_internal::_instance.prod_rpt_temp)
        model_internal::_prod_rpt_tempIsValid_der = (valRes.results == null);
        model_internal::_prod_rpt_tempIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prod_rpt_tempValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prod_rpt_tempValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prod_rpt_tempValidationFailureMessages():Array
    {
        if (model_internal::_prod_rpt_tempValidationFailureMessages == null)
            model_internal::calculateProd_rpt_tempIsValid();

        return _prod_rpt_tempValidationFailureMessages;
    }

    model_internal function set prod_rpt_tempValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prod_rpt_tempValidationFailureMessages;

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
            model_internal::_prod_rpt_tempValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_rpt_tempValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prod_prod_groupStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prod_prod_groupValidator() : StyleValidator
    {
        return model_internal::_prod_prod_groupValidator;
    }

    model_internal function set _prod_prod_groupIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prod_prod_groupIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prod_prod_groupIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_prod_groupIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prod_prod_groupIsValid():Boolean
    {
        if (!model_internal::_prod_prod_groupIsValidCacheInitialized)
        {
            model_internal::calculateProd_prod_groupIsValid();
        }

        return model_internal::_prod_prod_groupIsValid;
    }

    model_internal function calculateProd_prod_groupIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prod_prod_groupValidator.validate(model_internal::_instance.prod_prod_group)
        model_internal::_prod_prod_groupIsValid_der = (valRes.results == null);
        model_internal::_prod_prod_groupIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prod_prod_groupValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prod_prod_groupValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prod_prod_groupValidationFailureMessages():Array
    {
        if (model_internal::_prod_prod_groupValidationFailureMessages == null)
            model_internal::calculateProd_prod_groupIsValid();

        return _prod_prod_groupValidationFailureMessages;
    }

    model_internal function set prod_prod_groupValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prod_prod_groupValidationFailureMessages;

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
            model_internal::_prod_prod_groupValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_prod_groupValidationFailureMessages", oldValue, value));
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
            case("prod_cmpy"):
            {
                return prod_cmpyValidationFailureMessages;
            }
            case("prod_class"):
            {
                return prod_classValidationFailureMessages;
            }
            case("prod_cmpy_name"):
            {
                return prod_cmpy_nameValidationFailureMessages;
            }
            case("prod_is_blend"):
            {
                return prod_is_blendValidationFailureMessages;
            }
            case("prod_rpt_unit"):
            {
                return prod_rpt_unitValidationFailureMessages;
            }
            case("prod_rpt_temp"):
            {
                return prod_rpt_tempValidationFailureMessages;
            }
            case("prod_prod_group"):
            {
                return prod_prod_groupValidationFailureMessages;
            }
            case("prod_code"):
            {
                return prod_codeValidationFailureMessages;
            }
            case("prod_name"):
            {
                return prod_nameValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
