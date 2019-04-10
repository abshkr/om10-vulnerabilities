
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
internal class _CustomDatatype1EntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("COMPANY_ID", "COMPANY_NAME");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("COMPANY_ID", "COMPANY_NAME");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("COMPANY_ID", "COMPANY_NAME");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("COMPANY_ID", "COMPANY_NAME");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("COMPANY_ID", "COMPANY_NAME");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "CustomDatatype1";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _COMPANY_IDIsValid:Boolean;
    model_internal var _COMPANY_IDValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _COMPANY_IDIsValidCacheInitialized:Boolean = false;
    model_internal var _COMPANY_IDValidationFailureMessages:Array;
    
    model_internal var _COMPANY_NAMEIsValid:Boolean;
    model_internal var _COMPANY_NAMEValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _COMPANY_NAMEIsValidCacheInitialized:Boolean = false;
    model_internal var _COMPANY_NAMEValidationFailureMessages:Array;

    model_internal var _instance:_Super_CustomDatatype1;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _CustomDatatype1EntityMetadata(value : _Super_CustomDatatype1)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["COMPANY_ID"] = new Array();
            model_internal::dependentsOnMap["COMPANY_NAME"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["COMPANY_ID"] = "String";
        model_internal::propertyTypeMap["COMPANY_NAME"] = "String";

        model_internal::_instance = value;
        model_internal::_COMPANY_IDValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCOMPANY_ID);
        model_internal::_COMPANY_IDValidator.required = true;
        model_internal::_COMPANY_IDValidator.requiredFieldError = "COMPANY_ID is required";
        //model_internal::_COMPANY_IDValidator.source = model_internal::_instance;
        //model_internal::_COMPANY_IDValidator.property = "COMPANY_ID";
        model_internal::_COMPANY_NAMEValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCOMPANY_NAME);
        model_internal::_COMPANY_NAMEValidator.required = true;
        model_internal::_COMPANY_NAMEValidator.requiredFieldError = "COMPANY_NAME is required";
        //model_internal::_COMPANY_NAMEValidator.source = model_internal::_instance;
        //model_internal::_COMPANY_NAMEValidator.property = "COMPANY_NAME";
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
            throw new Error(propertyName + " is not a data property of entity CustomDatatype1");
            
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
            throw new Error(propertyName + " is not a collection property of entity CustomDatatype1");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of CustomDatatype1");

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
            throw new Error(propertyName + " does not exist for entity CustomDatatype1");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity CustomDatatype1");
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
            throw new Error(propertyName + " does not exist for entity CustomDatatype1");
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
    public function get isCOMPANY_IDAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCOMPANY_NAMEAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnCOMPANY_ID():void
    {
        if (model_internal::_COMPANY_IDIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCOMPANY_ID = null;
            model_internal::calculateCOMPANY_IDIsValid();
        }
    }
    public function invalidateDependentOnCOMPANY_NAME():void
    {
        if (model_internal::_COMPANY_NAMEIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCOMPANY_NAME = null;
            model_internal::calculateCOMPANY_NAMEIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get COMPANY_IDStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get COMPANY_IDValidator() : StyleValidator
    {
        return model_internal::_COMPANY_IDValidator;
    }

    model_internal function set _COMPANY_IDIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_COMPANY_IDIsValid;         
        if (oldValue !== value)
        {
            model_internal::_COMPANY_IDIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "COMPANY_IDIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get COMPANY_IDIsValid():Boolean
    {
        if (!model_internal::_COMPANY_IDIsValidCacheInitialized)
        {
            model_internal::calculateCOMPANY_IDIsValid();
        }

        return model_internal::_COMPANY_IDIsValid;
    }

    model_internal function calculateCOMPANY_IDIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_COMPANY_IDValidator.validate(model_internal::_instance.COMPANY_ID)
        model_internal::_COMPANY_IDIsValid_der = (valRes.results == null);
        model_internal::_COMPANY_IDIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::COMPANY_IDValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::COMPANY_IDValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get COMPANY_IDValidationFailureMessages():Array
    {
        if (model_internal::_COMPANY_IDValidationFailureMessages == null)
            model_internal::calculateCOMPANY_IDIsValid();

        return _COMPANY_IDValidationFailureMessages;
    }

    model_internal function set COMPANY_IDValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_COMPANY_IDValidationFailureMessages;

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
            model_internal::_COMPANY_IDValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "COMPANY_IDValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get COMPANY_NAMEStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get COMPANY_NAMEValidator() : StyleValidator
    {
        return model_internal::_COMPANY_NAMEValidator;
    }

    model_internal function set _COMPANY_NAMEIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_COMPANY_NAMEIsValid;         
        if (oldValue !== value)
        {
            model_internal::_COMPANY_NAMEIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "COMPANY_NAMEIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get COMPANY_NAMEIsValid():Boolean
    {
        if (!model_internal::_COMPANY_NAMEIsValidCacheInitialized)
        {
            model_internal::calculateCOMPANY_NAMEIsValid();
        }

        return model_internal::_COMPANY_NAMEIsValid;
    }

    model_internal function calculateCOMPANY_NAMEIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_COMPANY_NAMEValidator.validate(model_internal::_instance.COMPANY_NAME)
        model_internal::_COMPANY_NAMEIsValid_der = (valRes.results == null);
        model_internal::_COMPANY_NAMEIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::COMPANY_NAMEValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::COMPANY_NAMEValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get COMPANY_NAMEValidationFailureMessages():Array
    {
        if (model_internal::_COMPANY_NAMEValidationFailureMessages == null)
            model_internal::calculateCOMPANY_NAMEIsValid();

        return _COMPANY_NAMEValidationFailureMessages;
    }

    model_internal function set COMPANY_NAMEValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_COMPANY_NAMEValidationFailureMessages;

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
            model_internal::_COMPANY_NAMEValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "COMPANY_NAMEValidationFailureMessages", oldValue, value));
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
            case("COMPANY_ID"):
            {
                return COMPANY_IDValidationFailureMessages;
            }
            case("COMPANY_NAME"):
            {
                return COMPANY_NAMEValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
