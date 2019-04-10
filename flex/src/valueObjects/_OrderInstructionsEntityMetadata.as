
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
internal class _OrderInstructionsEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("oinst_order", "oinst_counter", "oinst_text");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("oinst_order", "oinst_counter", "oinst_text");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("oinst_order", "oinst_counter", "oinst_text");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("oinst_order", "oinst_counter", "oinst_text");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("oinst_order", "oinst_counter", "oinst_text");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "OrderInstructions";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _oinst_orderIsValid:Boolean;
    model_internal var _oinst_orderValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oinst_orderIsValidCacheInitialized:Boolean = false;
    model_internal var _oinst_orderValidationFailureMessages:Array;
    
    model_internal var _oinst_counterIsValid:Boolean;
    model_internal var _oinst_counterValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oinst_counterIsValidCacheInitialized:Boolean = false;
    model_internal var _oinst_counterValidationFailureMessages:Array;
    
    model_internal var _oinst_textIsValid:Boolean;
    model_internal var _oinst_textValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _oinst_textIsValidCacheInitialized:Boolean = false;
    model_internal var _oinst_textValidationFailureMessages:Array;

    model_internal var _instance:_Super_OrderInstructions;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _OrderInstructionsEntityMetadata(value : _Super_OrderInstructions)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["oinst_order"] = new Array();
            model_internal::dependentsOnMap["oinst_counter"] = new Array();
            model_internal::dependentsOnMap["oinst_text"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["oinst_order"] = "String";
        model_internal::propertyTypeMap["oinst_counter"] = "String";
        model_internal::propertyTypeMap["oinst_text"] = "String";

        model_internal::_instance = value;
        model_internal::_oinst_orderValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOinst_order);
        model_internal::_oinst_orderValidator.required = true;
        model_internal::_oinst_orderValidator.requiredFieldError = "oinst_order is required";
        //model_internal::_oinst_orderValidator.source = model_internal::_instance;
        //model_internal::_oinst_orderValidator.property = "oinst_order";
        model_internal::_oinst_counterValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOinst_counter);
        model_internal::_oinst_counterValidator.required = true;
        model_internal::_oinst_counterValidator.requiredFieldError = "oinst_counter is required";
        //model_internal::_oinst_counterValidator.source = model_internal::_instance;
        //model_internal::_oinst_counterValidator.property = "oinst_counter";
        model_internal::_oinst_textValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOinst_text);
        model_internal::_oinst_textValidator.required = true;
        model_internal::_oinst_textValidator.requiredFieldError = "oinst_text is required";
        //model_internal::_oinst_textValidator.source = model_internal::_instance;
        //model_internal::_oinst_textValidator.property = "oinst_text";
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
            throw new Error(propertyName + " is not a data property of entity OrderInstructions");
            
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
            throw new Error(propertyName + " is not a collection property of entity OrderInstructions");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of OrderInstructions");

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
            throw new Error(propertyName + " does not exist for entity OrderInstructions");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity OrderInstructions");
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
            throw new Error(propertyName + " does not exist for entity OrderInstructions");
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
    public function get isOinst_orderAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOinst_counterAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOinst_textAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnOinst_order():void
    {
        if (model_internal::_oinst_orderIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOinst_order = null;
            model_internal::calculateOinst_orderIsValid();
        }
    }
    public function invalidateDependentOnOinst_counter():void
    {
        if (model_internal::_oinst_counterIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOinst_counter = null;
            model_internal::calculateOinst_counterIsValid();
        }
    }
    public function invalidateDependentOnOinst_text():void
    {
        if (model_internal::_oinst_textIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOinst_text = null;
            model_internal::calculateOinst_textIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get oinst_orderStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oinst_orderValidator() : StyleValidator
    {
        return model_internal::_oinst_orderValidator;
    }

    model_internal function set _oinst_orderIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oinst_orderIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oinst_orderIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oinst_orderIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oinst_orderIsValid():Boolean
    {
        if (!model_internal::_oinst_orderIsValidCacheInitialized)
        {
            model_internal::calculateOinst_orderIsValid();
        }

        return model_internal::_oinst_orderIsValid;
    }

    model_internal function calculateOinst_orderIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oinst_orderValidator.validate(model_internal::_instance.oinst_order)
        model_internal::_oinst_orderIsValid_der = (valRes.results == null);
        model_internal::_oinst_orderIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oinst_orderValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oinst_orderValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oinst_orderValidationFailureMessages():Array
    {
        if (model_internal::_oinst_orderValidationFailureMessages == null)
            model_internal::calculateOinst_orderIsValid();

        return _oinst_orderValidationFailureMessages;
    }

    model_internal function set oinst_orderValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oinst_orderValidationFailureMessages;

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
            model_internal::_oinst_orderValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oinst_orderValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oinst_counterStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oinst_counterValidator() : StyleValidator
    {
        return model_internal::_oinst_counterValidator;
    }

    model_internal function set _oinst_counterIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oinst_counterIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oinst_counterIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oinst_counterIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oinst_counterIsValid():Boolean
    {
        if (!model_internal::_oinst_counterIsValidCacheInitialized)
        {
            model_internal::calculateOinst_counterIsValid();
        }

        return model_internal::_oinst_counterIsValid;
    }

    model_internal function calculateOinst_counterIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oinst_counterValidator.validate(model_internal::_instance.oinst_counter)
        model_internal::_oinst_counterIsValid_der = (valRes.results == null);
        model_internal::_oinst_counterIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oinst_counterValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oinst_counterValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oinst_counterValidationFailureMessages():Array
    {
        if (model_internal::_oinst_counterValidationFailureMessages == null)
            model_internal::calculateOinst_counterIsValid();

        return _oinst_counterValidationFailureMessages;
    }

    model_internal function set oinst_counterValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oinst_counterValidationFailureMessages;

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
            model_internal::_oinst_counterValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oinst_counterValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get oinst_textStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get oinst_textValidator() : StyleValidator
    {
        return model_internal::_oinst_textValidator;
    }

    model_internal function set _oinst_textIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_oinst_textIsValid;         
        if (oldValue !== value)
        {
            model_internal::_oinst_textIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oinst_textIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get oinst_textIsValid():Boolean
    {
        if (!model_internal::_oinst_textIsValidCacheInitialized)
        {
            model_internal::calculateOinst_textIsValid();
        }

        return model_internal::_oinst_textIsValid;
    }

    model_internal function calculateOinst_textIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_oinst_textValidator.validate(model_internal::_instance.oinst_text)
        model_internal::_oinst_textIsValid_der = (valRes.results == null);
        model_internal::_oinst_textIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::oinst_textValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::oinst_textValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get oinst_textValidationFailureMessages():Array
    {
        if (model_internal::_oinst_textValidationFailureMessages == null)
            model_internal::calculateOinst_textIsValid();

        return _oinst_textValidationFailureMessages;
    }

    model_internal function set oinst_textValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_oinst_textValidationFailureMessages;

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
            model_internal::_oinst_textValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "oinst_textValidationFailureMessages", oldValue, value));
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
            case("oinst_order"):
            {
                return oinst_orderValidationFailureMessages;
            }
            case("oinst_counter"):
            {
                return oinst_counterValidationFailureMessages;
            }
            case("oinst_text"):
            {
                return oinst_textValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
