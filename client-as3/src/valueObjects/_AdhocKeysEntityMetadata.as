
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
internal class _AdhocKeysEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("KYA_TANKER", "KYA_TXT", "KYA_KEY_NO");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("KYA_TANKER", "KYA_TXT", "KYA_KEY_NO");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("KYA_TANKER", "KYA_TXT", "KYA_KEY_NO");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("KYA_TANKER", "KYA_TXT", "KYA_KEY_NO");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("KYA_TANKER", "KYA_TXT", "KYA_KEY_NO");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "AdhocKeys";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _KYA_TANKERIsValid:Boolean;
    model_internal var _KYA_TANKERValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _KYA_TANKERIsValidCacheInitialized:Boolean = false;
    model_internal var _KYA_TANKERValidationFailureMessages:Array;
    
    model_internal var _KYA_TXTIsValid:Boolean;
    model_internal var _KYA_TXTValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _KYA_TXTIsValidCacheInitialized:Boolean = false;
    model_internal var _KYA_TXTValidationFailureMessages:Array;
    
    model_internal var _KYA_KEY_NOIsValid:Boolean;
    model_internal var _KYA_KEY_NOValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _KYA_KEY_NOIsValidCacheInitialized:Boolean = false;
    model_internal var _KYA_KEY_NOValidationFailureMessages:Array;

    model_internal var _instance:_Super_AdhocKeys;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _AdhocKeysEntityMetadata(value : _Super_AdhocKeys)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["KYA_TANKER"] = new Array();
            model_internal::dependentsOnMap["KYA_TXT"] = new Array();
            model_internal::dependentsOnMap["KYA_KEY_NO"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["KYA_TANKER"] = "String";
        model_internal::propertyTypeMap["KYA_TXT"] = "String";
        model_internal::propertyTypeMap["KYA_KEY_NO"] = "String";

        model_internal::_instance = value;
        model_internal::_KYA_TANKERValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKYA_TANKER);
        model_internal::_KYA_TANKERValidator.required = true;
        model_internal::_KYA_TANKERValidator.requiredFieldError = "KYA_TANKER is required";
        //model_internal::_KYA_TANKERValidator.source = model_internal::_instance;
        //model_internal::_KYA_TANKERValidator.property = "KYA_TANKER";
        model_internal::_KYA_TXTValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKYA_TXT);
        model_internal::_KYA_TXTValidator.required = true;
        model_internal::_KYA_TXTValidator.requiredFieldError = "KYA_TXT is required";
        //model_internal::_KYA_TXTValidator.source = model_internal::_instance;
        //model_internal::_KYA_TXTValidator.property = "KYA_TXT";
        model_internal::_KYA_KEY_NOValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForKYA_KEY_NO);
        model_internal::_KYA_KEY_NOValidator.required = true;
        model_internal::_KYA_KEY_NOValidator.requiredFieldError = "KYA_KEY_NO is required";
        //model_internal::_KYA_KEY_NOValidator.source = model_internal::_instance;
        //model_internal::_KYA_KEY_NOValidator.property = "KYA_KEY_NO";
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
            throw new Error(propertyName + " is not a data property of entity AdhocKeys");
            
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
            throw new Error(propertyName + " is not a collection property of entity AdhocKeys");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of AdhocKeys");

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
            throw new Error(propertyName + " does not exist for entity AdhocKeys");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity AdhocKeys");
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
            throw new Error(propertyName + " does not exist for entity AdhocKeys");
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
    public function get isKYA_TANKERAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKYA_TXTAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isKYA_KEY_NOAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnKYA_TANKER():void
    {
        if (model_internal::_KYA_TANKERIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKYA_TANKER = null;
            model_internal::calculateKYA_TANKERIsValid();
        }
    }
    public function invalidateDependentOnKYA_TXT():void
    {
        if (model_internal::_KYA_TXTIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKYA_TXT = null;
            model_internal::calculateKYA_TXTIsValid();
        }
    }
    public function invalidateDependentOnKYA_KEY_NO():void
    {
        if (model_internal::_KYA_KEY_NOIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfKYA_KEY_NO = null;
            model_internal::calculateKYA_KEY_NOIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get KYA_TANKERStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get KYA_TANKERValidator() : StyleValidator
    {
        return model_internal::_KYA_TANKERValidator;
    }

    model_internal function set _KYA_TANKERIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_KYA_TANKERIsValid;         
        if (oldValue !== value)
        {
            model_internal::_KYA_TANKERIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "KYA_TANKERIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get KYA_TANKERIsValid():Boolean
    {
        if (!model_internal::_KYA_TANKERIsValidCacheInitialized)
        {
            model_internal::calculateKYA_TANKERIsValid();
        }

        return model_internal::_KYA_TANKERIsValid;
    }

    model_internal function calculateKYA_TANKERIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_KYA_TANKERValidator.validate(model_internal::_instance.KYA_TANKER)
        model_internal::_KYA_TANKERIsValid_der = (valRes.results == null);
        model_internal::_KYA_TANKERIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::KYA_TANKERValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::KYA_TANKERValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get KYA_TANKERValidationFailureMessages():Array
    {
        if (model_internal::_KYA_TANKERValidationFailureMessages == null)
            model_internal::calculateKYA_TANKERIsValid();

        return _KYA_TANKERValidationFailureMessages;
    }

    model_internal function set KYA_TANKERValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_KYA_TANKERValidationFailureMessages;

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
            model_internal::_KYA_TANKERValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "KYA_TANKERValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get KYA_TXTStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get KYA_TXTValidator() : StyleValidator
    {
        return model_internal::_KYA_TXTValidator;
    }

    model_internal function set _KYA_TXTIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_KYA_TXTIsValid;         
        if (oldValue !== value)
        {
            model_internal::_KYA_TXTIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "KYA_TXTIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get KYA_TXTIsValid():Boolean
    {
        if (!model_internal::_KYA_TXTIsValidCacheInitialized)
        {
            model_internal::calculateKYA_TXTIsValid();
        }

        return model_internal::_KYA_TXTIsValid;
    }

    model_internal function calculateKYA_TXTIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_KYA_TXTValidator.validate(model_internal::_instance.KYA_TXT)
        model_internal::_KYA_TXTIsValid_der = (valRes.results == null);
        model_internal::_KYA_TXTIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::KYA_TXTValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::KYA_TXTValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get KYA_TXTValidationFailureMessages():Array
    {
        if (model_internal::_KYA_TXTValidationFailureMessages == null)
            model_internal::calculateKYA_TXTIsValid();

        return _KYA_TXTValidationFailureMessages;
    }

    model_internal function set KYA_TXTValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_KYA_TXTValidationFailureMessages;

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
            model_internal::_KYA_TXTValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "KYA_TXTValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get KYA_KEY_NOStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get KYA_KEY_NOValidator() : StyleValidator
    {
        return model_internal::_KYA_KEY_NOValidator;
    }

    model_internal function set _KYA_KEY_NOIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_KYA_KEY_NOIsValid;         
        if (oldValue !== value)
        {
            model_internal::_KYA_KEY_NOIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "KYA_KEY_NOIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get KYA_KEY_NOIsValid():Boolean
    {
        if (!model_internal::_KYA_KEY_NOIsValidCacheInitialized)
        {
            model_internal::calculateKYA_KEY_NOIsValid();
        }

        return model_internal::_KYA_KEY_NOIsValid;
    }

    model_internal function calculateKYA_KEY_NOIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_KYA_KEY_NOValidator.validate(model_internal::_instance.KYA_KEY_NO)
        model_internal::_KYA_KEY_NOIsValid_der = (valRes.results == null);
        model_internal::_KYA_KEY_NOIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::KYA_KEY_NOValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::KYA_KEY_NOValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get KYA_KEY_NOValidationFailureMessages():Array
    {
        if (model_internal::_KYA_KEY_NOValidationFailureMessages == null)
            model_internal::calculateKYA_KEY_NOIsValid();

        return _KYA_KEY_NOValidationFailureMessages;
    }

    model_internal function set KYA_KEY_NOValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_KYA_KEY_NOValidationFailureMessages;

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
            model_internal::_KYA_KEY_NOValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "KYA_KEY_NOValidationFailureMessages", oldValue, value));
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
            case("KYA_TANKER"):
            {
                return KYA_TANKERValidationFailureMessages;
            }
            case("KYA_TXT"):
            {
                return KYA_TXTValidationFailureMessages;
            }
            case("KYA_KEY_NO"):
            {
                return KYA_KEY_NOValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
