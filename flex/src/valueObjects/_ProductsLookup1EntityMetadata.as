
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
internal class _ProductsLookup1EntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("unit", "schedule", "order_id", "prod_code", "prod_name");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("unit", "schedule", "order_id", "prod_code", "prod_name");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("unit", "schedule", "order_id", "prod_code", "prod_name");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("unit", "schedule", "order_id", "prod_code", "prod_name");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("unit", "schedule", "order_id", "prod_code", "prod_name");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "ProductsLookup1";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _unitIsValid:Boolean;
    model_internal var _unitValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _unitIsValidCacheInitialized:Boolean = false;
    model_internal var _unitValidationFailureMessages:Array;
    
    model_internal var _scheduleIsValid:Boolean;
    model_internal var _scheduleValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _scheduleIsValidCacheInitialized:Boolean = false;
    model_internal var _scheduleValidationFailureMessages:Array;
    
    model_internal var _order_idIsValid:Boolean;
    model_internal var _order_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_idIsValidCacheInitialized:Boolean = false;
    model_internal var _order_idValidationFailureMessages:Array;
    
    model_internal var _prod_codeIsValid:Boolean;
    model_internal var _prod_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_codeValidationFailureMessages:Array;
    
    model_internal var _prod_nameIsValid:Boolean;
    model_internal var _prod_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_nameValidationFailureMessages:Array;

    model_internal var _instance:_Super_ProductsLookup1;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _ProductsLookup1EntityMetadata(value : _Super_ProductsLookup1)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["unit"] = new Array();
            model_internal::dependentsOnMap["schedule"] = new Array();
            model_internal::dependentsOnMap["order_id"] = new Array();
            model_internal::dependentsOnMap["prod_code"] = new Array();
            model_internal::dependentsOnMap["prod_name"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["unit"] = "Object";
        model_internal::propertyTypeMap["schedule"] = "Object";
        model_internal::propertyTypeMap["order_id"] = "Object";
        model_internal::propertyTypeMap["prod_code"] = "String";
        model_internal::propertyTypeMap["prod_name"] = "String";

        model_internal::_instance = value;
        model_internal::_unitValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForUnit);
        model_internal::_unitValidator.required = true;
        model_internal::_unitValidator.requiredFieldError = "unit is required";
        //model_internal::_unitValidator.source = model_internal::_instance;
        //model_internal::_unitValidator.property = "unit";
        model_internal::_scheduleValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchedule);
        model_internal::_scheduleValidator.required = true;
        model_internal::_scheduleValidator.requiredFieldError = "schedule is required";
        //model_internal::_scheduleValidator.source = model_internal::_instance;
        //model_internal::_scheduleValidator.property = "schedule";
        model_internal::_order_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_id);
        model_internal::_order_idValidator.required = true;
        model_internal::_order_idValidator.requiredFieldError = "order_id is required";
        //model_internal::_order_idValidator.source = model_internal::_instance;
        //model_internal::_order_idValidator.property = "order_id";
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
            throw new Error(propertyName + " is not a data property of entity ProductsLookup1");
            
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
            throw new Error(propertyName + " is not a collection property of entity ProductsLookup1");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of ProductsLookup1");

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
            throw new Error(propertyName + " does not exist for entity ProductsLookup1");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity ProductsLookup1");
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
            throw new Error(propertyName + " does not exist for entity ProductsLookup1");
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
    public function get isUnitAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isScheduleAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_idAvailable():Boolean
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
    public function invalidateDependentOnUnit():void
    {
        if (model_internal::_unitIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfUnit = null;
            model_internal::calculateUnitIsValid();
        }
    }
    public function invalidateDependentOnSchedule():void
    {
        if (model_internal::_scheduleIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchedule = null;
            model_internal::calculateScheduleIsValid();
        }
    }
    public function invalidateDependentOnOrder_id():void
    {
        if (model_internal::_order_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_id = null;
            model_internal::calculateOrder_idIsValid();
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
    public function get unitStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get unitValidator() : StyleValidator
    {
        return model_internal::_unitValidator;
    }

    model_internal function set _unitIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_unitIsValid;         
        if (oldValue !== value)
        {
            model_internal::_unitIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unitIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get unitIsValid():Boolean
    {
        if (!model_internal::_unitIsValidCacheInitialized)
        {
            model_internal::calculateUnitIsValid();
        }

        return model_internal::_unitIsValid;
    }

    model_internal function calculateUnitIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_unitValidator.validate(model_internal::_instance.unit)
        model_internal::_unitIsValid_der = (valRes.results == null);
        model_internal::_unitIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::unitValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::unitValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get unitValidationFailureMessages():Array
    {
        if (model_internal::_unitValidationFailureMessages == null)
            model_internal::calculateUnitIsValid();

        return _unitValidationFailureMessages;
    }

    model_internal function set unitValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_unitValidationFailureMessages;

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
            model_internal::_unitValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unitValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get scheduleStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get scheduleValidator() : StyleValidator
    {
        return model_internal::_scheduleValidator;
    }

    model_internal function set _scheduleIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_scheduleIsValid;         
        if (oldValue !== value)
        {
            model_internal::_scheduleIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "scheduleIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get scheduleIsValid():Boolean
    {
        if (!model_internal::_scheduleIsValidCacheInitialized)
        {
            model_internal::calculateScheduleIsValid();
        }

        return model_internal::_scheduleIsValid;
    }

    model_internal function calculateScheduleIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_scheduleValidator.validate(model_internal::_instance.schedule)
        model_internal::_scheduleIsValid_der = (valRes.results == null);
        model_internal::_scheduleIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::scheduleValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::scheduleValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get scheduleValidationFailureMessages():Array
    {
        if (model_internal::_scheduleValidationFailureMessages == null)
            model_internal::calculateScheduleIsValid();

        return _scheduleValidationFailureMessages;
    }

    model_internal function set scheduleValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_scheduleValidationFailureMessages;

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
            model_internal::_scheduleValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "scheduleValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_idValidator() : StyleValidator
    {
        return model_internal::_order_idValidator;
    }

    model_internal function set _order_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_idIsValid():Boolean
    {
        if (!model_internal::_order_idIsValidCacheInitialized)
        {
            model_internal::calculateOrder_idIsValid();
        }

        return model_internal::_order_idIsValid;
    }

    model_internal function calculateOrder_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_idValidator.validate(model_internal::_instance.order_id)
        model_internal::_order_idIsValid_der = (valRes.results == null);
        model_internal::_order_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_idValidationFailureMessages():Array
    {
        if (model_internal::_order_idValidationFailureMessages == null)
            model_internal::calculateOrder_idIsValid();

        return _order_idValidationFailureMessages;
    }

    model_internal function set order_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_idValidationFailureMessages;

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
            model_internal::_order_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_idValidationFailureMessages", oldValue, value));
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
            case("unit"):
            {
                return unitValidationFailureMessages;
            }
            case("schedule"):
            {
                return scheduleValidationFailureMessages;
            }
            case("order_id"):
            {
                return order_idValidationFailureMessages;
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
