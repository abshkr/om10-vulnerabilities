
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
internal class _PersonnelRolesEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("AUTH_LEVEL_ID", "AUTH_LEVEL_NAME");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("AUTH_LEVEL_ID", "AUTH_LEVEL_NAME");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("AUTH_LEVEL_ID", "AUTH_LEVEL_NAME");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("AUTH_LEVEL_ID", "AUTH_LEVEL_NAME");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("AUTH_LEVEL_ID", "AUTH_LEVEL_NAME");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "PersonnelRoles";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _AUTH_LEVEL_IDIsValid:Boolean;
    model_internal var _AUTH_LEVEL_IDValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _AUTH_LEVEL_IDIsValidCacheInitialized:Boolean = false;
    model_internal var _AUTH_LEVEL_IDValidationFailureMessages:Array;
    
    model_internal var _AUTH_LEVEL_NAMEIsValid:Boolean;
    model_internal var _AUTH_LEVEL_NAMEValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _AUTH_LEVEL_NAMEIsValidCacheInitialized:Boolean = false;
    model_internal var _AUTH_LEVEL_NAMEValidationFailureMessages:Array;

    model_internal var _instance:_Super_PersonnelRoles;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _PersonnelRolesEntityMetadata(value : _Super_PersonnelRoles)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["AUTH_LEVEL_ID"] = new Array();
            model_internal::dependentsOnMap["AUTH_LEVEL_NAME"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["AUTH_LEVEL_ID"] = "String";
        model_internal::propertyTypeMap["AUTH_LEVEL_NAME"] = "String";

        model_internal::_instance = value;
        model_internal::_AUTH_LEVEL_IDValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForAUTH_LEVEL_ID);
        model_internal::_AUTH_LEVEL_IDValidator.required = true;
        model_internal::_AUTH_LEVEL_IDValidator.requiredFieldError = "AUTH_LEVEL_ID is required";
        //model_internal::_AUTH_LEVEL_IDValidator.source = model_internal::_instance;
        //model_internal::_AUTH_LEVEL_IDValidator.property = "AUTH_LEVEL_ID";
        model_internal::_AUTH_LEVEL_NAMEValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForAUTH_LEVEL_NAME);
        model_internal::_AUTH_LEVEL_NAMEValidator.required = true;
        model_internal::_AUTH_LEVEL_NAMEValidator.requiredFieldError = "AUTH_LEVEL_NAME is required";
        //model_internal::_AUTH_LEVEL_NAMEValidator.source = model_internal::_instance;
        //model_internal::_AUTH_LEVEL_NAMEValidator.property = "AUTH_LEVEL_NAME";
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
            throw new Error(propertyName + " is not a data property of entity PersonnelRoles");
            
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
            throw new Error(propertyName + " is not a collection property of entity PersonnelRoles");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of PersonnelRoles");

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
            throw new Error(propertyName + " does not exist for entity PersonnelRoles");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity PersonnelRoles");
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
            throw new Error(propertyName + " does not exist for entity PersonnelRoles");
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
    public function get isAUTH_LEVEL_IDAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isAUTH_LEVEL_NAMEAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnAUTH_LEVEL_ID():void
    {
        if (model_internal::_AUTH_LEVEL_IDIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfAUTH_LEVEL_ID = null;
            model_internal::calculateAUTH_LEVEL_IDIsValid();
        }
    }
    public function invalidateDependentOnAUTH_LEVEL_NAME():void
    {
        if (model_internal::_AUTH_LEVEL_NAMEIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfAUTH_LEVEL_NAME = null;
            model_internal::calculateAUTH_LEVEL_NAMEIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get AUTH_LEVEL_IDStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get AUTH_LEVEL_IDValidator() : StyleValidator
    {
        return model_internal::_AUTH_LEVEL_IDValidator;
    }

    model_internal function set _AUTH_LEVEL_IDIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_AUTH_LEVEL_IDIsValid;         
        if (oldValue !== value)
        {
            model_internal::_AUTH_LEVEL_IDIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "AUTH_LEVEL_IDIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get AUTH_LEVEL_IDIsValid():Boolean
    {
        if (!model_internal::_AUTH_LEVEL_IDIsValidCacheInitialized)
        {
            model_internal::calculateAUTH_LEVEL_IDIsValid();
        }

        return model_internal::_AUTH_LEVEL_IDIsValid;
    }

    model_internal function calculateAUTH_LEVEL_IDIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_AUTH_LEVEL_IDValidator.validate(model_internal::_instance.AUTH_LEVEL_ID)
        model_internal::_AUTH_LEVEL_IDIsValid_der = (valRes.results == null);
        model_internal::_AUTH_LEVEL_IDIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::AUTH_LEVEL_IDValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::AUTH_LEVEL_IDValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get AUTH_LEVEL_IDValidationFailureMessages():Array
    {
        if (model_internal::_AUTH_LEVEL_IDValidationFailureMessages == null)
            model_internal::calculateAUTH_LEVEL_IDIsValid();

        return _AUTH_LEVEL_IDValidationFailureMessages;
    }

    model_internal function set AUTH_LEVEL_IDValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_AUTH_LEVEL_IDValidationFailureMessages;

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
            model_internal::_AUTH_LEVEL_IDValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "AUTH_LEVEL_IDValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get AUTH_LEVEL_NAMEStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get AUTH_LEVEL_NAMEValidator() : StyleValidator
    {
        return model_internal::_AUTH_LEVEL_NAMEValidator;
    }

    model_internal function set _AUTH_LEVEL_NAMEIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_AUTH_LEVEL_NAMEIsValid;         
        if (oldValue !== value)
        {
            model_internal::_AUTH_LEVEL_NAMEIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "AUTH_LEVEL_NAMEIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get AUTH_LEVEL_NAMEIsValid():Boolean
    {
        if (!model_internal::_AUTH_LEVEL_NAMEIsValidCacheInitialized)
        {
            model_internal::calculateAUTH_LEVEL_NAMEIsValid();
        }

        return model_internal::_AUTH_LEVEL_NAMEIsValid;
    }

    model_internal function calculateAUTH_LEVEL_NAMEIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_AUTH_LEVEL_NAMEValidator.validate(model_internal::_instance.AUTH_LEVEL_NAME)
        model_internal::_AUTH_LEVEL_NAMEIsValid_der = (valRes.results == null);
        model_internal::_AUTH_LEVEL_NAMEIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::AUTH_LEVEL_NAMEValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::AUTH_LEVEL_NAMEValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get AUTH_LEVEL_NAMEValidationFailureMessages():Array
    {
        if (model_internal::_AUTH_LEVEL_NAMEValidationFailureMessages == null)
            model_internal::calculateAUTH_LEVEL_NAMEIsValid();

        return _AUTH_LEVEL_NAMEValidationFailureMessages;
    }

    model_internal function set AUTH_LEVEL_NAMEValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_AUTH_LEVEL_NAMEValidationFailureMessages;

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
            model_internal::_AUTH_LEVEL_NAMEValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "AUTH_LEVEL_NAMEValidationFailureMessages", oldValue, value));
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
            case("AUTH_LEVEL_ID"):
            {
                return AUTH_LEVEL_IDValidationFailureMessages;
            }
            case("AUTH_LEVEL_NAME"):
            {
                return AUTH_LEVEL_NAMEValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
