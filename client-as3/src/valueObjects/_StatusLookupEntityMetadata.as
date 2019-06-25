
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
internal class _StatusLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("STATUS_TEXT", "STATUS_ID", "STATUS_CODE");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("STATUS_TEXT", "STATUS_ID", "STATUS_CODE");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("STATUS_TEXT", "STATUS_ID", "STATUS_CODE");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("STATUS_TEXT", "STATUS_ID", "STATUS_CODE");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("STATUS_TEXT", "STATUS_ID", "STATUS_CODE");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "StatusLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _STATUS_TEXTIsValid:Boolean;
    model_internal var _STATUS_TEXTValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _STATUS_TEXTIsValidCacheInitialized:Boolean = false;
    model_internal var _STATUS_TEXTValidationFailureMessages:Array;
    
    model_internal var _STATUS_IDIsValid:Boolean;
    model_internal var _STATUS_IDValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _STATUS_IDIsValidCacheInitialized:Boolean = false;
    model_internal var _STATUS_IDValidationFailureMessages:Array;
    
    model_internal var _STATUS_CODEIsValid:Boolean;
    model_internal var _STATUS_CODEValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _STATUS_CODEIsValidCacheInitialized:Boolean = false;
    model_internal var _STATUS_CODEValidationFailureMessages:Array;

    model_internal var _instance:_Super_StatusLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _StatusLookupEntityMetadata(value : _Super_StatusLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["STATUS_TEXT"] = new Array();
            model_internal::dependentsOnMap["STATUS_ID"] = new Array();
            model_internal::dependentsOnMap["STATUS_CODE"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["STATUS_TEXT"] = "String";
        model_internal::propertyTypeMap["STATUS_ID"] = "String";
        model_internal::propertyTypeMap["STATUS_CODE"] = "String";

        model_internal::_instance = value;
        model_internal::_STATUS_TEXTValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSTATUS_TEXT);
        model_internal::_STATUS_TEXTValidator.required = true;
        model_internal::_STATUS_TEXTValidator.requiredFieldError = "STATUS_TEXT is required";
        //model_internal::_STATUS_TEXTValidator.source = model_internal::_instance;
        //model_internal::_STATUS_TEXTValidator.property = "STATUS_TEXT";
        model_internal::_STATUS_IDValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSTATUS_ID);
        model_internal::_STATUS_IDValidator.required = true;
        model_internal::_STATUS_IDValidator.requiredFieldError = "STATUS_ID is required";
        //model_internal::_STATUS_IDValidator.source = model_internal::_instance;
        //model_internal::_STATUS_IDValidator.property = "STATUS_ID";
        model_internal::_STATUS_CODEValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSTATUS_CODE);
        model_internal::_STATUS_CODEValidator.required = true;
        model_internal::_STATUS_CODEValidator.requiredFieldError = "STATUS_CODE is required";
        //model_internal::_STATUS_CODEValidator.source = model_internal::_instance;
        //model_internal::_STATUS_CODEValidator.property = "STATUS_CODE";
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
            throw new Error(propertyName + " is not a data property of entity StatusLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity StatusLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of StatusLookup");

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
            throw new Error(propertyName + " does not exist for entity StatusLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity StatusLookup");
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
            throw new Error(propertyName + " does not exist for entity StatusLookup");
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
    public function get isSTATUS_TEXTAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSTATUS_IDAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSTATUS_CODEAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnSTATUS_TEXT():void
    {
        if (model_internal::_STATUS_TEXTIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSTATUS_TEXT = null;
            model_internal::calculateSTATUS_TEXTIsValid();
        }
    }
    public function invalidateDependentOnSTATUS_ID():void
    {
        if (model_internal::_STATUS_IDIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSTATUS_ID = null;
            model_internal::calculateSTATUS_IDIsValid();
        }
    }
    public function invalidateDependentOnSTATUS_CODE():void
    {
        if (model_internal::_STATUS_CODEIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSTATUS_CODE = null;
            model_internal::calculateSTATUS_CODEIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get STATUS_TEXTStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get STATUS_TEXTValidator() : StyleValidator
    {
        return model_internal::_STATUS_TEXTValidator;
    }

    model_internal function set _STATUS_TEXTIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_STATUS_TEXTIsValid;         
        if (oldValue !== value)
        {
            model_internal::_STATUS_TEXTIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "STATUS_TEXTIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get STATUS_TEXTIsValid():Boolean
    {
        if (!model_internal::_STATUS_TEXTIsValidCacheInitialized)
        {
            model_internal::calculateSTATUS_TEXTIsValid();
        }

        return model_internal::_STATUS_TEXTIsValid;
    }

    model_internal function calculateSTATUS_TEXTIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_STATUS_TEXTValidator.validate(model_internal::_instance.STATUS_TEXT)
        model_internal::_STATUS_TEXTIsValid_der = (valRes.results == null);
        model_internal::_STATUS_TEXTIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::STATUS_TEXTValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::STATUS_TEXTValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get STATUS_TEXTValidationFailureMessages():Array
    {
        if (model_internal::_STATUS_TEXTValidationFailureMessages == null)
            model_internal::calculateSTATUS_TEXTIsValid();

        return _STATUS_TEXTValidationFailureMessages;
    }

    model_internal function set STATUS_TEXTValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_STATUS_TEXTValidationFailureMessages;

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
            model_internal::_STATUS_TEXTValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "STATUS_TEXTValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get STATUS_IDStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get STATUS_IDValidator() : StyleValidator
    {
        return model_internal::_STATUS_IDValidator;
    }

    model_internal function set _STATUS_IDIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_STATUS_IDIsValid;         
        if (oldValue !== value)
        {
            model_internal::_STATUS_IDIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "STATUS_IDIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get STATUS_IDIsValid():Boolean
    {
        if (!model_internal::_STATUS_IDIsValidCacheInitialized)
        {
            model_internal::calculateSTATUS_IDIsValid();
        }

        return model_internal::_STATUS_IDIsValid;
    }

    model_internal function calculateSTATUS_IDIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_STATUS_IDValidator.validate(model_internal::_instance.STATUS_ID)
        model_internal::_STATUS_IDIsValid_der = (valRes.results == null);
        model_internal::_STATUS_IDIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::STATUS_IDValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::STATUS_IDValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get STATUS_IDValidationFailureMessages():Array
    {
        if (model_internal::_STATUS_IDValidationFailureMessages == null)
            model_internal::calculateSTATUS_IDIsValid();

        return _STATUS_IDValidationFailureMessages;
    }

    model_internal function set STATUS_IDValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_STATUS_IDValidationFailureMessages;

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
            model_internal::_STATUS_IDValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "STATUS_IDValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get STATUS_CODEStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get STATUS_CODEValidator() : StyleValidator
    {
        return model_internal::_STATUS_CODEValidator;
    }

    model_internal function set _STATUS_CODEIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_STATUS_CODEIsValid;         
        if (oldValue !== value)
        {
            model_internal::_STATUS_CODEIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "STATUS_CODEIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get STATUS_CODEIsValid():Boolean
    {
        if (!model_internal::_STATUS_CODEIsValidCacheInitialized)
        {
            model_internal::calculateSTATUS_CODEIsValid();
        }

        return model_internal::_STATUS_CODEIsValid;
    }

    model_internal function calculateSTATUS_CODEIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_STATUS_CODEValidator.validate(model_internal::_instance.STATUS_CODE)
        model_internal::_STATUS_CODEIsValid_der = (valRes.results == null);
        model_internal::_STATUS_CODEIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::STATUS_CODEValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::STATUS_CODEValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get STATUS_CODEValidationFailureMessages():Array
    {
        if (model_internal::_STATUS_CODEValidationFailureMessages == null)
            model_internal::calculateSTATUS_CODEIsValid();

        return _STATUS_CODEValidationFailureMessages;
    }

    model_internal function set STATUS_CODEValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_STATUS_CODEValidationFailureMessages;

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
            model_internal::_STATUS_CODEValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "STATUS_CODEValidationFailureMessages", oldValue, value));
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
            case("STATUS_TEXT"):
            {
                return STATUS_TEXTValidationFailureMessages;
            }
            case("STATUS_ID"):
            {
                return STATUS_IDValidationFailureMessages;
            }
            case("STATUS_CODE"):
            {
                return STATUS_CODEValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
