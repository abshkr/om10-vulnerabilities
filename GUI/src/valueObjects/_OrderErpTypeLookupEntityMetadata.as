
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
internal class _OrderErpTypeLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("erp_type_id", "erp_type_name");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("erp_type_id", "erp_type_name");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("erp_type_id", "erp_type_name");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("erp_type_id", "erp_type_name");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("erp_type_id", "erp_type_name");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "OrderErpTypeLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _erp_type_idIsValid:Boolean;
    model_internal var _erp_type_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _erp_type_idIsValidCacheInitialized:Boolean = false;
    model_internal var _erp_type_idValidationFailureMessages:Array;
    
    model_internal var _erp_type_nameIsValid:Boolean;
    model_internal var _erp_type_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _erp_type_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _erp_type_nameValidationFailureMessages:Array;

    model_internal var _instance:_Super_OrderErpTypeLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _OrderErpTypeLookupEntityMetadata(value : _Super_OrderErpTypeLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["erp_type_id"] = new Array();
            model_internal::dependentsOnMap["erp_type_name"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["erp_type_id"] = "String";
        model_internal::propertyTypeMap["erp_type_name"] = "String";

        model_internal::_instance = value;
        model_internal::_erp_type_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForErp_type_id);
        model_internal::_erp_type_idValidator.required = true;
        model_internal::_erp_type_idValidator.requiredFieldError = "erp_type_id is required";
        //model_internal::_erp_type_idValidator.source = model_internal::_instance;
        //model_internal::_erp_type_idValidator.property = "erp_type_id";
        model_internal::_erp_type_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForErp_type_name);
        model_internal::_erp_type_nameValidator.required = true;
        model_internal::_erp_type_nameValidator.requiredFieldError = "erp_type_name is required";
        //model_internal::_erp_type_nameValidator.source = model_internal::_instance;
        //model_internal::_erp_type_nameValidator.property = "erp_type_name";
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
            throw new Error(propertyName + " is not a data property of entity OrderErpTypeLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity OrderErpTypeLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of OrderErpTypeLookup");

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
            throw new Error(propertyName + " does not exist for entity OrderErpTypeLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity OrderErpTypeLookup");
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
            throw new Error(propertyName + " does not exist for entity OrderErpTypeLookup");
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
    public function get isErp_type_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isErp_type_nameAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnErp_type_id():void
    {
        if (model_internal::_erp_type_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfErp_type_id = null;
            model_internal::calculateErp_type_idIsValid();
        }
    }
    public function invalidateDependentOnErp_type_name():void
    {
        if (model_internal::_erp_type_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfErp_type_name = null;
            model_internal::calculateErp_type_nameIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get erp_type_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get erp_type_idValidator() : StyleValidator
    {
        return model_internal::_erp_type_idValidator;
    }

    model_internal function set _erp_type_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_erp_type_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_erp_type_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "erp_type_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get erp_type_idIsValid():Boolean
    {
        if (!model_internal::_erp_type_idIsValidCacheInitialized)
        {
            model_internal::calculateErp_type_idIsValid();
        }

        return model_internal::_erp_type_idIsValid;
    }

    model_internal function calculateErp_type_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_erp_type_idValidator.validate(model_internal::_instance.erp_type_id)
        model_internal::_erp_type_idIsValid_der = (valRes.results == null);
        model_internal::_erp_type_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::erp_type_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::erp_type_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get erp_type_idValidationFailureMessages():Array
    {
        if (model_internal::_erp_type_idValidationFailureMessages == null)
            model_internal::calculateErp_type_idIsValid();

        return _erp_type_idValidationFailureMessages;
    }

    model_internal function set erp_type_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_erp_type_idValidationFailureMessages;

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
            model_internal::_erp_type_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "erp_type_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get erp_type_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get erp_type_nameValidator() : StyleValidator
    {
        return model_internal::_erp_type_nameValidator;
    }

    model_internal function set _erp_type_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_erp_type_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_erp_type_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "erp_type_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get erp_type_nameIsValid():Boolean
    {
        if (!model_internal::_erp_type_nameIsValidCacheInitialized)
        {
            model_internal::calculateErp_type_nameIsValid();
        }

        return model_internal::_erp_type_nameIsValid;
    }

    model_internal function calculateErp_type_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_erp_type_nameValidator.validate(model_internal::_instance.erp_type_name)
        model_internal::_erp_type_nameIsValid_der = (valRes.results == null);
        model_internal::_erp_type_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::erp_type_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::erp_type_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get erp_type_nameValidationFailureMessages():Array
    {
        if (model_internal::_erp_type_nameValidationFailureMessages == null)
            model_internal::calculateErp_type_nameIsValid();

        return _erp_type_nameValidationFailureMessages;
    }

    model_internal function set erp_type_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_erp_type_nameValidationFailureMessages;

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
            model_internal::_erp_type_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "erp_type_nameValidationFailureMessages", oldValue, value));
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
            case("erp_type_id"):
            {
                return erp_type_idValidationFailureMessages;
            }
            case("erp_type_name"):
            {
                return erp_type_nameValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
