
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
internal class _AccessPermissions_voEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("perm_psn", "perm_area");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("perm_psn", "perm_area");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("perm_psn", "perm_area");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("perm_psn", "perm_area");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("perm_psn", "perm_area");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "AccessPermissions_vo";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _perm_psnIsValid:Boolean;
    model_internal var _perm_psnValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _perm_psnIsValidCacheInitialized:Boolean = false;
    model_internal var _perm_psnValidationFailureMessages:Array;
    
    model_internal var _perm_areaIsValid:Boolean;
    model_internal var _perm_areaValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _perm_areaIsValidCacheInitialized:Boolean = false;
    model_internal var _perm_areaValidationFailureMessages:Array;

    model_internal var _instance:_Super_AccessPermissions_vo;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _AccessPermissions_voEntityMetadata(value : _Super_AccessPermissions_vo)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["perm_psn"] = new Array();
            model_internal::dependentsOnMap["perm_area"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["perm_psn"] = "String";
        model_internal::propertyTypeMap["perm_area"] = "String";

        model_internal::_instance = value;
        model_internal::_perm_psnValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPerm_psn);
        model_internal::_perm_psnValidator.required = true;
        model_internal::_perm_psnValidator.requiredFieldError = "perm_psn is required";
        //model_internal::_perm_psnValidator.source = model_internal::_instance;
        //model_internal::_perm_psnValidator.property = "perm_psn";
        model_internal::_perm_areaValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPerm_area);
        model_internal::_perm_areaValidator.required = true;
        model_internal::_perm_areaValidator.requiredFieldError = "perm_area is required";
        //model_internal::_perm_areaValidator.source = model_internal::_instance;
        //model_internal::_perm_areaValidator.property = "perm_area";
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
            throw new Error(propertyName + " is not a data property of entity AccessPermissions_vo");
            
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
            throw new Error(propertyName + " is not a collection property of entity AccessPermissions_vo");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of AccessPermissions_vo");

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
            throw new Error(propertyName + " does not exist for entity AccessPermissions_vo");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity AccessPermissions_vo");
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
            throw new Error(propertyName + " does not exist for entity AccessPermissions_vo");
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
    public function get isPerm_psnAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPerm_areaAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnPerm_psn():void
    {
        if (model_internal::_perm_psnIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPerm_psn = null;
            model_internal::calculatePerm_psnIsValid();
        }
    }
    public function invalidateDependentOnPerm_area():void
    {
        if (model_internal::_perm_areaIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPerm_area = null;
            model_internal::calculatePerm_areaIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get perm_psnStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get perm_psnValidator() : StyleValidator
    {
        return model_internal::_perm_psnValidator;
    }

    model_internal function set _perm_psnIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_perm_psnIsValid;         
        if (oldValue !== value)
        {
            model_internal::_perm_psnIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "perm_psnIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get perm_psnIsValid():Boolean
    {
        if (!model_internal::_perm_psnIsValidCacheInitialized)
        {
            model_internal::calculatePerm_psnIsValid();
        }

        return model_internal::_perm_psnIsValid;
    }

    model_internal function calculatePerm_psnIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_perm_psnValidator.validate(model_internal::_instance.perm_psn)
        model_internal::_perm_psnIsValid_der = (valRes.results == null);
        model_internal::_perm_psnIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::perm_psnValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::perm_psnValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get perm_psnValidationFailureMessages():Array
    {
        if (model_internal::_perm_psnValidationFailureMessages == null)
            model_internal::calculatePerm_psnIsValid();

        return _perm_psnValidationFailureMessages;
    }

    model_internal function set perm_psnValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_perm_psnValidationFailureMessages;

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
            model_internal::_perm_psnValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "perm_psnValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get perm_areaStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get perm_areaValidator() : StyleValidator
    {
        return model_internal::_perm_areaValidator;
    }

    model_internal function set _perm_areaIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_perm_areaIsValid;         
        if (oldValue !== value)
        {
            model_internal::_perm_areaIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "perm_areaIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get perm_areaIsValid():Boolean
    {
        if (!model_internal::_perm_areaIsValidCacheInitialized)
        {
            model_internal::calculatePerm_areaIsValid();
        }

        return model_internal::_perm_areaIsValid;
    }

    model_internal function calculatePerm_areaIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_perm_areaValidator.validate(model_internal::_instance.perm_area)
        model_internal::_perm_areaIsValid_der = (valRes.results == null);
        model_internal::_perm_areaIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::perm_areaValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::perm_areaValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get perm_areaValidationFailureMessages():Array
    {
        if (model_internal::_perm_areaValidationFailureMessages == null)
            model_internal::calculatePerm_areaIsValid();

        return _perm_areaValidationFailureMessages;
    }

    model_internal function set perm_areaValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_perm_areaValidationFailureMessages;

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
            model_internal::_perm_areaValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "perm_areaValidationFailureMessages", oldValue, value));
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
            case("perm_psn"):
            {
                return perm_psnValidationFailureMessages;
            }
            case("perm_area"):
            {
                return perm_areaValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
