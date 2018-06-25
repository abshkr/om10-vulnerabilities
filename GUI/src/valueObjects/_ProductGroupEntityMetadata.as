
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
internal class _ProductGroupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("pgr_description", "pgr_unit", "pgr_code");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("pgr_description", "pgr_unit", "pgr_code");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("pgr_description", "pgr_unit", "pgr_code");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("pgr_description", "pgr_unit", "pgr_code");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("pgr_description", "pgr_unit", "pgr_code");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "ProductGroup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _pgr_descriptionIsValid:Boolean;
    model_internal var _pgr_descriptionValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _pgr_descriptionIsValidCacheInitialized:Boolean = false;
    model_internal var _pgr_descriptionValidationFailureMessages:Array;
    
    model_internal var _pgr_unitIsValid:Boolean;
    model_internal var _pgr_unitValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _pgr_unitIsValidCacheInitialized:Boolean = false;
    model_internal var _pgr_unitValidationFailureMessages:Array;
    
    model_internal var _pgr_codeIsValid:Boolean;
    model_internal var _pgr_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _pgr_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _pgr_codeValidationFailureMessages:Array;

    model_internal var _instance:_Super_ProductGroup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _ProductGroupEntityMetadata(value : _Super_ProductGroup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["pgr_description"] = new Array();
            model_internal::dependentsOnMap["pgr_unit"] = new Array();
            model_internal::dependentsOnMap["pgr_code"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["pgr_description"] = "String";
        model_internal::propertyTypeMap["pgr_unit"] = "String";
        model_internal::propertyTypeMap["pgr_code"] = "String";

        model_internal::_instance = value;
        model_internal::_pgr_descriptionValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPgr_description);
        model_internal::_pgr_descriptionValidator.required = true;
        model_internal::_pgr_descriptionValidator.requiredFieldError = "pgr_description is required";
        //model_internal::_pgr_descriptionValidator.source = model_internal::_instance;
        //model_internal::_pgr_descriptionValidator.property = "pgr_description";
        model_internal::_pgr_unitValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPgr_unit);
        model_internal::_pgr_unitValidator.required = true;
        model_internal::_pgr_unitValidator.requiredFieldError = "pgr_unit is required";
        //model_internal::_pgr_unitValidator.source = model_internal::_instance;
        //model_internal::_pgr_unitValidator.property = "pgr_unit";
        model_internal::_pgr_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPgr_code);
        model_internal::_pgr_codeValidator.required = true;
        model_internal::_pgr_codeValidator.requiredFieldError = "pgr_code is required";
        //model_internal::_pgr_codeValidator.source = model_internal::_instance;
        //model_internal::_pgr_codeValidator.property = "pgr_code";
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
            throw new Error(propertyName + " is not a data property of entity ProductGroup");
            
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
            throw new Error(propertyName + " is not a collection property of entity ProductGroup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of ProductGroup");

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
            throw new Error(propertyName + " does not exist for entity ProductGroup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity ProductGroup");
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
            throw new Error(propertyName + " does not exist for entity ProductGroup");
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
    public function get isPgr_descriptionAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPgr_unitAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPgr_codeAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnPgr_description():void
    {
        if (model_internal::_pgr_descriptionIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPgr_description = null;
            model_internal::calculatePgr_descriptionIsValid();
        }
    }
    public function invalidateDependentOnPgr_unit():void
    {
        if (model_internal::_pgr_unitIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPgr_unit = null;
            model_internal::calculatePgr_unitIsValid();
        }
    }
    public function invalidateDependentOnPgr_code():void
    {
        if (model_internal::_pgr_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPgr_code = null;
            model_internal::calculatePgr_codeIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get pgr_descriptionStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get pgr_descriptionValidator() : StyleValidator
    {
        return model_internal::_pgr_descriptionValidator;
    }

    model_internal function set _pgr_descriptionIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_pgr_descriptionIsValid;         
        if (oldValue !== value)
        {
            model_internal::_pgr_descriptionIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "pgr_descriptionIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get pgr_descriptionIsValid():Boolean
    {
        if (!model_internal::_pgr_descriptionIsValidCacheInitialized)
        {
            model_internal::calculatePgr_descriptionIsValid();
        }

        return model_internal::_pgr_descriptionIsValid;
    }

    model_internal function calculatePgr_descriptionIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_pgr_descriptionValidator.validate(model_internal::_instance.pgr_description)
        model_internal::_pgr_descriptionIsValid_der = (valRes.results == null);
        model_internal::_pgr_descriptionIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::pgr_descriptionValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::pgr_descriptionValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get pgr_descriptionValidationFailureMessages():Array
    {
        if (model_internal::_pgr_descriptionValidationFailureMessages == null)
            model_internal::calculatePgr_descriptionIsValid();

        return _pgr_descriptionValidationFailureMessages;
    }

    model_internal function set pgr_descriptionValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_pgr_descriptionValidationFailureMessages;

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
            model_internal::_pgr_descriptionValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "pgr_descriptionValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get pgr_unitStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get pgr_unitValidator() : StyleValidator
    {
        return model_internal::_pgr_unitValidator;
    }

    model_internal function set _pgr_unitIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_pgr_unitIsValid;         
        if (oldValue !== value)
        {
            model_internal::_pgr_unitIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "pgr_unitIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get pgr_unitIsValid():Boolean
    {
        if (!model_internal::_pgr_unitIsValidCacheInitialized)
        {
            model_internal::calculatePgr_unitIsValid();
        }

        return model_internal::_pgr_unitIsValid;
    }

    model_internal function calculatePgr_unitIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_pgr_unitValidator.validate(model_internal::_instance.pgr_unit)
        model_internal::_pgr_unitIsValid_der = (valRes.results == null);
        model_internal::_pgr_unitIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::pgr_unitValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::pgr_unitValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get pgr_unitValidationFailureMessages():Array
    {
        if (model_internal::_pgr_unitValidationFailureMessages == null)
            model_internal::calculatePgr_unitIsValid();

        return _pgr_unitValidationFailureMessages;
    }

    model_internal function set pgr_unitValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_pgr_unitValidationFailureMessages;

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
            model_internal::_pgr_unitValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "pgr_unitValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get pgr_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get pgr_codeValidator() : StyleValidator
    {
        return model_internal::_pgr_codeValidator;
    }

    model_internal function set _pgr_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_pgr_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_pgr_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "pgr_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get pgr_codeIsValid():Boolean
    {
        if (!model_internal::_pgr_codeIsValidCacheInitialized)
        {
            model_internal::calculatePgr_codeIsValid();
        }

        return model_internal::_pgr_codeIsValid;
    }

    model_internal function calculatePgr_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_pgr_codeValidator.validate(model_internal::_instance.pgr_code)
        model_internal::_pgr_codeIsValid_der = (valRes.results == null);
        model_internal::_pgr_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::pgr_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::pgr_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get pgr_codeValidationFailureMessages():Array
    {
        if (model_internal::_pgr_codeValidationFailureMessages == null)
            model_internal::calculatePgr_codeIsValid();

        return _pgr_codeValidationFailureMessages;
    }

    model_internal function set pgr_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_pgr_codeValidationFailureMessages;

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
            model_internal::_pgr_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "pgr_codeValidationFailureMessages", oldValue, value));
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
            case("pgr_description"):
            {
                return pgr_descriptionValidationFailureMessages;
            }
            case("pgr_unit"):
            {
                return pgr_unitValidationFailureMessages;
            }
            case("pgr_code"):
            {
                return pgr_codeValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
