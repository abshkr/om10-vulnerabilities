
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
internal class _TankEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("tank_base", "quantity");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("tank_base", "quantity");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("tank_base", "quantity");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("tank_base", "quantity");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("tank_base", "quantity");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "Tank";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _tank_baseIsValid:Boolean;
    model_internal var _tank_baseValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tank_baseIsValidCacheInitialized:Boolean = false;
    model_internal var _tank_baseValidationFailureMessages:Array;
    
    model_internal var _quantityIsValid:Boolean;
    model_internal var _quantityValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _quantityIsValidCacheInitialized:Boolean = false;
    model_internal var _quantityValidationFailureMessages:Array;

    model_internal var _instance:_Super_Tank;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _TankEntityMetadata(value : _Super_Tank)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["tank_base"] = new Array();
            model_internal::dependentsOnMap["quantity"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["tank_base"] = "String";
        model_internal::propertyTypeMap["quantity"] = "String";

        model_internal::_instance = value;
        model_internal::_tank_baseValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTank_base);
        model_internal::_tank_baseValidator.required = true;
        model_internal::_tank_baseValidator.requiredFieldError = "tank_base is required";
        //model_internal::_tank_baseValidator.source = model_internal::_instance;
        //model_internal::_tank_baseValidator.property = "tank_base";
        model_internal::_quantityValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForQuantity);
        model_internal::_quantityValidator.required = true;
        model_internal::_quantityValidator.requiredFieldError = "quantity is required";
        //model_internal::_quantityValidator.source = model_internal::_instance;
        //model_internal::_quantityValidator.property = "quantity";
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
            throw new Error(propertyName + " is not a data property of entity Tank");
            
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
            throw new Error(propertyName + " is not a collection property of entity Tank");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of Tank");

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
            throw new Error(propertyName + " does not exist for entity Tank");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity Tank");
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
            throw new Error(propertyName + " does not exist for entity Tank");
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
    public function get isTank_baseAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isQuantityAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnTank_base():void
    {
        if (model_internal::_tank_baseIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTank_base = null;
            model_internal::calculateTank_baseIsValid();
        }
    }
    public function invalidateDependentOnQuantity():void
    {
        if (model_internal::_quantityIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfQuantity = null;
            model_internal::calculateQuantityIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get tank_baseStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tank_baseValidator() : StyleValidator
    {
        return model_internal::_tank_baseValidator;
    }

    model_internal function set _tank_baseIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tank_baseIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tank_baseIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tank_baseIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tank_baseIsValid():Boolean
    {
        if (!model_internal::_tank_baseIsValidCacheInitialized)
        {
            model_internal::calculateTank_baseIsValid();
        }

        return model_internal::_tank_baseIsValid;
    }

    model_internal function calculateTank_baseIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tank_baseValidator.validate(model_internal::_instance.tank_base)
        model_internal::_tank_baseIsValid_der = (valRes.results == null);
        model_internal::_tank_baseIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tank_baseValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tank_baseValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tank_baseValidationFailureMessages():Array
    {
        if (model_internal::_tank_baseValidationFailureMessages == null)
            model_internal::calculateTank_baseIsValid();

        return _tank_baseValidationFailureMessages;
    }

    model_internal function set tank_baseValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tank_baseValidationFailureMessages;

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
            model_internal::_tank_baseValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tank_baseValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get quantityStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get quantityValidator() : StyleValidator
    {
        return model_internal::_quantityValidator;
    }

    model_internal function set _quantityIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_quantityIsValid;         
        if (oldValue !== value)
        {
            model_internal::_quantityIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "quantityIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get quantityIsValid():Boolean
    {
        if (!model_internal::_quantityIsValidCacheInitialized)
        {
            model_internal::calculateQuantityIsValid();
        }

        return model_internal::_quantityIsValid;
    }

    model_internal function calculateQuantityIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_quantityValidator.validate(model_internal::_instance.quantity)
        model_internal::_quantityIsValid_der = (valRes.results == null);
        model_internal::_quantityIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::quantityValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::quantityValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get quantityValidationFailureMessages():Array
    {
        if (model_internal::_quantityValidationFailureMessages == null)
            model_internal::calculateQuantityIsValid();

        return _quantityValidationFailureMessages;
    }

    model_internal function set quantityValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_quantityValidationFailureMessages;

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
            model_internal::_quantityValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "quantityValidationFailureMessages", oldValue, value));
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
            case("tank_base"):
            {
                return tank_baseValidationFailureMessages;
            }
            case("quantity"):
            {
                return quantityValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
