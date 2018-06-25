
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
internal class _OrderDelvLocLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("delv_desc", "delv_name", "delv_code");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("delv_desc", "delv_name", "delv_code");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("delv_desc", "delv_name", "delv_code");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("delv_desc", "delv_name", "delv_code");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("delv_desc", "delv_name", "delv_code");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "OrderDelvLocLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _delv_descIsValid:Boolean;
    model_internal var _delv_descValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _delv_descIsValidCacheInitialized:Boolean = false;
    model_internal var _delv_descValidationFailureMessages:Array;
    
    model_internal var _delv_nameIsValid:Boolean;
    model_internal var _delv_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _delv_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _delv_nameValidationFailureMessages:Array;
    
    model_internal var _delv_codeIsValid:Boolean;
    model_internal var _delv_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _delv_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _delv_codeValidationFailureMessages:Array;

    model_internal var _instance:_Super_OrderDelvLocLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _OrderDelvLocLookupEntityMetadata(value : _Super_OrderDelvLocLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["delv_desc"] = new Array();
            model_internal::dependentsOnMap["delv_name"] = new Array();
            model_internal::dependentsOnMap["delv_code"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["delv_desc"] = "String";
        model_internal::propertyTypeMap["delv_name"] = "String";
        model_internal::propertyTypeMap["delv_code"] = "String";

        model_internal::_instance = value;
        model_internal::_delv_descValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDelv_desc);
        model_internal::_delv_descValidator.required = true;
        model_internal::_delv_descValidator.requiredFieldError = "delv_desc is required";
        //model_internal::_delv_descValidator.source = model_internal::_instance;
        //model_internal::_delv_descValidator.property = "delv_desc";
        model_internal::_delv_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDelv_name);
        model_internal::_delv_nameValidator.required = true;
        model_internal::_delv_nameValidator.requiredFieldError = "delv_name is required";
        //model_internal::_delv_nameValidator.source = model_internal::_instance;
        //model_internal::_delv_nameValidator.property = "delv_name";
        model_internal::_delv_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDelv_code);
        model_internal::_delv_codeValidator.required = true;
        model_internal::_delv_codeValidator.requiredFieldError = "delv_code is required";
        //model_internal::_delv_codeValidator.source = model_internal::_instance;
        //model_internal::_delv_codeValidator.property = "delv_code";
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
            throw new Error(propertyName + " is not a data property of entity OrderDelvLocLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity OrderDelvLocLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of OrderDelvLocLookup");

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
            throw new Error(propertyName + " does not exist for entity OrderDelvLocLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity OrderDelvLocLookup");
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
            throw new Error(propertyName + " does not exist for entity OrderDelvLocLookup");
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
    public function get isDelv_descAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isDelv_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isDelv_codeAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnDelv_desc():void
    {
        if (model_internal::_delv_descIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDelv_desc = null;
            model_internal::calculateDelv_descIsValid();
        }
    }
    public function invalidateDependentOnDelv_name():void
    {
        if (model_internal::_delv_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDelv_name = null;
            model_internal::calculateDelv_nameIsValid();
        }
    }
    public function invalidateDependentOnDelv_code():void
    {
        if (model_internal::_delv_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDelv_code = null;
            model_internal::calculateDelv_codeIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get delv_descStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get delv_descValidator() : StyleValidator
    {
        return model_internal::_delv_descValidator;
    }

    model_internal function set _delv_descIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_delv_descIsValid;         
        if (oldValue !== value)
        {
            model_internal::_delv_descIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "delv_descIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get delv_descIsValid():Boolean
    {
        if (!model_internal::_delv_descIsValidCacheInitialized)
        {
            model_internal::calculateDelv_descIsValid();
        }

        return model_internal::_delv_descIsValid;
    }

    model_internal function calculateDelv_descIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_delv_descValidator.validate(model_internal::_instance.delv_desc)
        model_internal::_delv_descIsValid_der = (valRes.results == null);
        model_internal::_delv_descIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::delv_descValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::delv_descValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get delv_descValidationFailureMessages():Array
    {
        if (model_internal::_delv_descValidationFailureMessages == null)
            model_internal::calculateDelv_descIsValid();

        return _delv_descValidationFailureMessages;
    }

    model_internal function set delv_descValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_delv_descValidationFailureMessages;

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
            model_internal::_delv_descValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "delv_descValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get delv_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get delv_nameValidator() : StyleValidator
    {
        return model_internal::_delv_nameValidator;
    }

    model_internal function set _delv_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_delv_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_delv_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "delv_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get delv_nameIsValid():Boolean
    {
        if (!model_internal::_delv_nameIsValidCacheInitialized)
        {
            model_internal::calculateDelv_nameIsValid();
        }

        return model_internal::_delv_nameIsValid;
    }

    model_internal function calculateDelv_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_delv_nameValidator.validate(model_internal::_instance.delv_name)
        model_internal::_delv_nameIsValid_der = (valRes.results == null);
        model_internal::_delv_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::delv_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::delv_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get delv_nameValidationFailureMessages():Array
    {
        if (model_internal::_delv_nameValidationFailureMessages == null)
            model_internal::calculateDelv_nameIsValid();

        return _delv_nameValidationFailureMessages;
    }

    model_internal function set delv_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_delv_nameValidationFailureMessages;

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
            model_internal::_delv_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "delv_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get delv_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get delv_codeValidator() : StyleValidator
    {
        return model_internal::_delv_codeValidator;
    }

    model_internal function set _delv_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_delv_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_delv_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "delv_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get delv_codeIsValid():Boolean
    {
        if (!model_internal::_delv_codeIsValidCacheInitialized)
        {
            model_internal::calculateDelv_codeIsValid();
        }

        return model_internal::_delv_codeIsValid;
    }

    model_internal function calculateDelv_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_delv_codeValidator.validate(model_internal::_instance.delv_code)
        model_internal::_delv_codeIsValid_der = (valRes.results == null);
        model_internal::_delv_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::delv_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::delv_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get delv_codeValidationFailureMessages():Array
    {
        if (model_internal::_delv_codeValidationFailureMessages == null)
            model_internal::calculateDelv_codeIsValid();

        return _delv_codeValidationFailureMessages;
    }

    model_internal function set delv_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_delv_codeValidationFailureMessages;

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
            model_internal::_delv_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "delv_codeValidationFailureMessages", oldValue, value));
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
            case("delv_desc"):
            {
                return delv_descValidationFailureMessages;
            }
            case("delv_name"):
            {
                return delv_nameValidationFailureMessages;
            }
            case("delv_code"):
            {
                return delv_codeValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
