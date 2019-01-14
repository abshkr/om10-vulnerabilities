
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
internal class _BA_UsageEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("bam_usage_name", "bam_usage_id");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("bam_usage_name", "bam_usage_id");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("bam_usage_name", "bam_usage_id");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("bam_usage_name", "bam_usage_id");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("bam_usage_name", "bam_usage_id");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "BA_Usage";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _bam_usage_nameIsValid:Boolean;
    model_internal var _bam_usage_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bam_usage_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _bam_usage_nameValidationFailureMessages:Array;
    
    model_internal var _bam_usage_idIsValid:Boolean;
    model_internal var _bam_usage_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bam_usage_idIsValidCacheInitialized:Boolean = false;
    model_internal var _bam_usage_idValidationFailureMessages:Array;

    model_internal var _instance:_Super_BA_Usage;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _BA_UsageEntityMetadata(value : _Super_BA_Usage)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["bam_usage_name"] = new Array();
            model_internal::dependentsOnMap["bam_usage_id"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["bam_usage_name"] = "String";
        model_internal::propertyTypeMap["bam_usage_id"] = "String";

        model_internal::_instance = value;
        model_internal::_bam_usage_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBam_usage_name);
        model_internal::_bam_usage_nameValidator.required = true;
        model_internal::_bam_usage_nameValidator.requiredFieldError = "bam_usage_name is required";
        //model_internal::_bam_usage_nameValidator.source = model_internal::_instance;
        //model_internal::_bam_usage_nameValidator.property = "bam_usage_name";
        model_internal::_bam_usage_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBam_usage_id);
        model_internal::_bam_usage_idValidator.required = true;
        model_internal::_bam_usage_idValidator.requiredFieldError = "bam_usage_id is required";
        //model_internal::_bam_usage_idValidator.source = model_internal::_instance;
        //model_internal::_bam_usage_idValidator.property = "bam_usage_id";
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
            throw new Error(propertyName + " is not a data property of entity BA_Usage");
            
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
            throw new Error(propertyName + " is not a collection property of entity BA_Usage");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of BA_Usage");

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
            throw new Error(propertyName + " does not exist for entity BA_Usage");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity BA_Usage");
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
            throw new Error(propertyName + " does not exist for entity BA_Usage");
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
    public function get isBam_usage_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBam_usage_idAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnBam_usage_name():void
    {
        if (model_internal::_bam_usage_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBam_usage_name = null;
            model_internal::calculateBam_usage_nameIsValid();
        }
    }
    public function invalidateDependentOnBam_usage_id():void
    {
        if (model_internal::_bam_usage_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBam_usage_id = null;
            model_internal::calculateBam_usage_idIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get bam_usage_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bam_usage_nameValidator() : StyleValidator
    {
        return model_internal::_bam_usage_nameValidator;
    }

    model_internal function set _bam_usage_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bam_usage_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bam_usage_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_usage_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bam_usage_nameIsValid():Boolean
    {
        if (!model_internal::_bam_usage_nameIsValidCacheInitialized)
        {
            model_internal::calculateBam_usage_nameIsValid();
        }

        return model_internal::_bam_usage_nameIsValid;
    }

    model_internal function calculateBam_usage_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bam_usage_nameValidator.validate(model_internal::_instance.bam_usage_name)
        model_internal::_bam_usage_nameIsValid_der = (valRes.results == null);
        model_internal::_bam_usage_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bam_usage_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bam_usage_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bam_usage_nameValidationFailureMessages():Array
    {
        if (model_internal::_bam_usage_nameValidationFailureMessages == null)
            model_internal::calculateBam_usage_nameIsValid();

        return _bam_usage_nameValidationFailureMessages;
    }

    model_internal function set bam_usage_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bam_usage_nameValidationFailureMessages;

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
            model_internal::_bam_usage_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_usage_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get bam_usage_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bam_usage_idValidator() : StyleValidator
    {
        return model_internal::_bam_usage_idValidator;
    }

    model_internal function set _bam_usage_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bam_usage_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bam_usage_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_usage_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bam_usage_idIsValid():Boolean
    {
        if (!model_internal::_bam_usage_idIsValidCacheInitialized)
        {
            model_internal::calculateBam_usage_idIsValid();
        }

        return model_internal::_bam_usage_idIsValid;
    }

    model_internal function calculateBam_usage_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bam_usage_idValidator.validate(model_internal::_instance.bam_usage_id)
        model_internal::_bam_usage_idIsValid_der = (valRes.results == null);
        model_internal::_bam_usage_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bam_usage_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bam_usage_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bam_usage_idValidationFailureMessages():Array
    {
        if (model_internal::_bam_usage_idValidationFailureMessages == null)
            model_internal::calculateBam_usage_idIsValid();

        return _bam_usage_idValidationFailureMessages;
    }

    model_internal function set bam_usage_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bam_usage_idValidationFailureMessages;

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
            model_internal::_bam_usage_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_usage_idValidationFailureMessages", oldValue, value));
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
            case("bam_usage_name"):
            {
                return bam_usage_nameValidationFailureMessages;
            }
            case("bam_usage_id"):
            {
                return bam_usage_idValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
