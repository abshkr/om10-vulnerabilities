
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
internal class _CustomDatatypeEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("LD_TYPE_TEXT", "LD_TYPE_ID", "LD_TYPE_CODE");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("LD_TYPE_TEXT", "LD_TYPE_ID", "LD_TYPE_CODE");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("LD_TYPE_TEXT", "LD_TYPE_ID", "LD_TYPE_CODE");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("LD_TYPE_TEXT", "LD_TYPE_ID", "LD_TYPE_CODE");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("LD_TYPE_TEXT", "LD_TYPE_ID", "LD_TYPE_CODE");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "CustomDatatype";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _LD_TYPE_TEXTIsValid:Boolean;
    model_internal var _LD_TYPE_TEXTValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _LD_TYPE_TEXTIsValidCacheInitialized:Boolean = false;
    model_internal var _LD_TYPE_TEXTValidationFailureMessages:Array;
    
    model_internal var _LD_TYPE_IDIsValid:Boolean;
    model_internal var _LD_TYPE_IDValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _LD_TYPE_IDIsValidCacheInitialized:Boolean = false;
    model_internal var _LD_TYPE_IDValidationFailureMessages:Array;
    
    model_internal var _LD_TYPE_CODEIsValid:Boolean;
    model_internal var _LD_TYPE_CODEValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _LD_TYPE_CODEIsValidCacheInitialized:Boolean = false;
    model_internal var _LD_TYPE_CODEValidationFailureMessages:Array;

    model_internal var _instance:_Super_CustomDatatype;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _CustomDatatypeEntityMetadata(value : _Super_CustomDatatype)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["LD_TYPE_TEXT"] = new Array();
            model_internal::dependentsOnMap["LD_TYPE_ID"] = new Array();
            model_internal::dependentsOnMap["LD_TYPE_CODE"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["LD_TYPE_TEXT"] = "String";
        model_internal::propertyTypeMap["LD_TYPE_ID"] = "String";
        model_internal::propertyTypeMap["LD_TYPE_CODE"] = "String";

        model_internal::_instance = value;
        model_internal::_LD_TYPE_TEXTValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForLD_TYPE_TEXT);
        model_internal::_LD_TYPE_TEXTValidator.required = true;
        model_internal::_LD_TYPE_TEXTValidator.requiredFieldError = "LD_TYPE_TEXT is required";
        //model_internal::_LD_TYPE_TEXTValidator.source = model_internal::_instance;
        //model_internal::_LD_TYPE_TEXTValidator.property = "LD_TYPE_TEXT";
        model_internal::_LD_TYPE_IDValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForLD_TYPE_ID);
        model_internal::_LD_TYPE_IDValidator.required = true;
        model_internal::_LD_TYPE_IDValidator.requiredFieldError = "LD_TYPE_ID is required";
        //model_internal::_LD_TYPE_IDValidator.source = model_internal::_instance;
        //model_internal::_LD_TYPE_IDValidator.property = "LD_TYPE_ID";
        model_internal::_LD_TYPE_CODEValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForLD_TYPE_CODE);
        model_internal::_LD_TYPE_CODEValidator.required = true;
        model_internal::_LD_TYPE_CODEValidator.requiredFieldError = "LD_TYPE_CODE is required";
        //model_internal::_LD_TYPE_CODEValidator.source = model_internal::_instance;
        //model_internal::_LD_TYPE_CODEValidator.property = "LD_TYPE_CODE";
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
            throw new Error(propertyName + " is not a data property of entity CustomDatatype");
            
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
            throw new Error(propertyName + " is not a collection property of entity CustomDatatype");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of CustomDatatype");

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
            throw new Error(propertyName + " does not exist for entity CustomDatatype");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity CustomDatatype");
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
            throw new Error(propertyName + " does not exist for entity CustomDatatype");
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
    public function get isLD_TYPE_TEXTAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isLD_TYPE_IDAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isLD_TYPE_CODEAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnLD_TYPE_TEXT():void
    {
        if (model_internal::_LD_TYPE_TEXTIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfLD_TYPE_TEXT = null;
            model_internal::calculateLD_TYPE_TEXTIsValid();
        }
    }
    public function invalidateDependentOnLD_TYPE_ID():void
    {
        if (model_internal::_LD_TYPE_IDIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfLD_TYPE_ID = null;
            model_internal::calculateLD_TYPE_IDIsValid();
        }
    }
    public function invalidateDependentOnLD_TYPE_CODE():void
    {
        if (model_internal::_LD_TYPE_CODEIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfLD_TYPE_CODE = null;
            model_internal::calculateLD_TYPE_CODEIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get LD_TYPE_TEXTStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get LD_TYPE_TEXTValidator() : StyleValidator
    {
        return model_internal::_LD_TYPE_TEXTValidator;
    }

    model_internal function set _LD_TYPE_TEXTIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_LD_TYPE_TEXTIsValid;         
        if (oldValue !== value)
        {
            model_internal::_LD_TYPE_TEXTIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "LD_TYPE_TEXTIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get LD_TYPE_TEXTIsValid():Boolean
    {
        if (!model_internal::_LD_TYPE_TEXTIsValidCacheInitialized)
        {
            model_internal::calculateLD_TYPE_TEXTIsValid();
        }

        return model_internal::_LD_TYPE_TEXTIsValid;
    }

    model_internal function calculateLD_TYPE_TEXTIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_LD_TYPE_TEXTValidator.validate(model_internal::_instance.LD_TYPE_TEXT)
        model_internal::_LD_TYPE_TEXTIsValid_der = (valRes.results == null);
        model_internal::_LD_TYPE_TEXTIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::LD_TYPE_TEXTValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::LD_TYPE_TEXTValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get LD_TYPE_TEXTValidationFailureMessages():Array
    {
        if (model_internal::_LD_TYPE_TEXTValidationFailureMessages == null)
            model_internal::calculateLD_TYPE_TEXTIsValid();

        return _LD_TYPE_TEXTValidationFailureMessages;
    }

    model_internal function set LD_TYPE_TEXTValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_LD_TYPE_TEXTValidationFailureMessages;

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
            model_internal::_LD_TYPE_TEXTValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "LD_TYPE_TEXTValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get LD_TYPE_IDStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get LD_TYPE_IDValidator() : StyleValidator
    {
        return model_internal::_LD_TYPE_IDValidator;
    }

    model_internal function set _LD_TYPE_IDIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_LD_TYPE_IDIsValid;         
        if (oldValue !== value)
        {
            model_internal::_LD_TYPE_IDIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "LD_TYPE_IDIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get LD_TYPE_IDIsValid():Boolean
    {
        if (!model_internal::_LD_TYPE_IDIsValidCacheInitialized)
        {
            model_internal::calculateLD_TYPE_IDIsValid();
        }

        return model_internal::_LD_TYPE_IDIsValid;
    }

    model_internal function calculateLD_TYPE_IDIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_LD_TYPE_IDValidator.validate(model_internal::_instance.LD_TYPE_ID)
        model_internal::_LD_TYPE_IDIsValid_der = (valRes.results == null);
        model_internal::_LD_TYPE_IDIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::LD_TYPE_IDValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::LD_TYPE_IDValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get LD_TYPE_IDValidationFailureMessages():Array
    {
        if (model_internal::_LD_TYPE_IDValidationFailureMessages == null)
            model_internal::calculateLD_TYPE_IDIsValid();

        return _LD_TYPE_IDValidationFailureMessages;
    }

    model_internal function set LD_TYPE_IDValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_LD_TYPE_IDValidationFailureMessages;

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
            model_internal::_LD_TYPE_IDValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "LD_TYPE_IDValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get LD_TYPE_CODEStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get LD_TYPE_CODEValidator() : StyleValidator
    {
        return model_internal::_LD_TYPE_CODEValidator;
    }

    model_internal function set _LD_TYPE_CODEIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_LD_TYPE_CODEIsValid;         
        if (oldValue !== value)
        {
            model_internal::_LD_TYPE_CODEIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "LD_TYPE_CODEIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get LD_TYPE_CODEIsValid():Boolean
    {
        if (!model_internal::_LD_TYPE_CODEIsValidCacheInitialized)
        {
            model_internal::calculateLD_TYPE_CODEIsValid();
        }

        return model_internal::_LD_TYPE_CODEIsValid;
    }

    model_internal function calculateLD_TYPE_CODEIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_LD_TYPE_CODEValidator.validate(model_internal::_instance.LD_TYPE_CODE)
        model_internal::_LD_TYPE_CODEIsValid_der = (valRes.results == null);
        model_internal::_LD_TYPE_CODEIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::LD_TYPE_CODEValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::LD_TYPE_CODEValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get LD_TYPE_CODEValidationFailureMessages():Array
    {
        if (model_internal::_LD_TYPE_CODEValidationFailureMessages == null)
            model_internal::calculateLD_TYPE_CODEIsValid();

        return _LD_TYPE_CODEValidationFailureMessages;
    }

    model_internal function set LD_TYPE_CODEValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_LD_TYPE_CODEValidationFailureMessages;

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
            model_internal::_LD_TYPE_CODEValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "LD_TYPE_CODEValidationFailureMessages", oldValue, value));
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
            case("LD_TYPE_TEXT"):
            {
                return LD_TYPE_TEXTValidationFailureMessages;
            }
            case("LD_TYPE_ID"):
            {
                return LD_TYPE_IDValidationFailureMessages;
            }
            case("LD_TYPE_CODE"):
            {
                return LD_TYPE_CODEValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
