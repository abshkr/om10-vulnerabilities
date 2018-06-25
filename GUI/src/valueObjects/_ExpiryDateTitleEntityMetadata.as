
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
internal class _ExpiryDateTitleEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("expiry_date_reja", "expiry_date_no", "expiry_date_desc", "expiry_date_titl");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("expiry_date_reja", "expiry_date_no", "expiry_date_desc", "expiry_date_titl");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("expiry_date_reja", "expiry_date_no", "expiry_date_desc", "expiry_date_titl");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("expiry_date_reja", "expiry_date_no", "expiry_date_desc", "expiry_date_titl");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("expiry_date_reja", "expiry_date_no", "expiry_date_desc", "expiry_date_titl");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "ExpiryDateTitle";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _expiry_date_rejaIsValid:Boolean;
    model_internal var _expiry_date_rejaValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _expiry_date_rejaIsValidCacheInitialized:Boolean = false;
    model_internal var _expiry_date_rejaValidationFailureMessages:Array;
    
    model_internal var _expiry_date_noIsValid:Boolean;
    model_internal var _expiry_date_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _expiry_date_noIsValidCacheInitialized:Boolean = false;
    model_internal var _expiry_date_noValidationFailureMessages:Array;
    
    model_internal var _expiry_date_descIsValid:Boolean;
    model_internal var _expiry_date_descValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _expiry_date_descIsValidCacheInitialized:Boolean = false;
    model_internal var _expiry_date_descValidationFailureMessages:Array;
    
    model_internal var _expiry_date_titlIsValid:Boolean;
    model_internal var _expiry_date_titlValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _expiry_date_titlIsValidCacheInitialized:Boolean = false;
    model_internal var _expiry_date_titlValidationFailureMessages:Array;

    model_internal var _instance:_Super_ExpiryDateTitle;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _ExpiryDateTitleEntityMetadata(value : _Super_ExpiryDateTitle)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["expiry_date_reja"] = new Array();
            model_internal::dependentsOnMap["expiry_date_no"] = new Array();
            model_internal::dependentsOnMap["expiry_date_desc"] = new Array();
            model_internal::dependentsOnMap["expiry_date_titl"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["expiry_date_reja"] = "String";
        model_internal::propertyTypeMap["expiry_date_no"] = "String";
        model_internal::propertyTypeMap["expiry_date_desc"] = "String";
        model_internal::propertyTypeMap["expiry_date_titl"] = "String";

        model_internal::_instance = value;
        model_internal::_expiry_date_rejaValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForExpiry_date_reja);
        model_internal::_expiry_date_rejaValidator.required = true;
        model_internal::_expiry_date_rejaValidator.requiredFieldError = "expiry_date_reja is required";
        //model_internal::_expiry_date_rejaValidator.source = model_internal::_instance;
        //model_internal::_expiry_date_rejaValidator.property = "expiry_date_reja";
        model_internal::_expiry_date_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForExpiry_date_no);
        model_internal::_expiry_date_noValidator.required = true;
        model_internal::_expiry_date_noValidator.requiredFieldError = "expiry_date_no is required";
        //model_internal::_expiry_date_noValidator.source = model_internal::_instance;
        //model_internal::_expiry_date_noValidator.property = "expiry_date_no";
        model_internal::_expiry_date_descValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForExpiry_date_desc);
        model_internal::_expiry_date_descValidator.required = true;
        model_internal::_expiry_date_descValidator.requiredFieldError = "expiry_date_desc is required";
        //model_internal::_expiry_date_descValidator.source = model_internal::_instance;
        //model_internal::_expiry_date_descValidator.property = "expiry_date_desc";
        model_internal::_expiry_date_titlValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForExpiry_date_titl);
        model_internal::_expiry_date_titlValidator.required = true;
        model_internal::_expiry_date_titlValidator.requiredFieldError = "expiry_date_titl is required";
        //model_internal::_expiry_date_titlValidator.source = model_internal::_instance;
        //model_internal::_expiry_date_titlValidator.property = "expiry_date_titl";
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
            throw new Error(propertyName + " is not a data property of entity ExpiryDateTitle");
            
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
            throw new Error(propertyName + " is not a collection property of entity ExpiryDateTitle");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of ExpiryDateTitle");

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
            throw new Error(propertyName + " does not exist for entity ExpiryDateTitle");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity ExpiryDateTitle");
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
            throw new Error(propertyName + " does not exist for entity ExpiryDateTitle");
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
    public function get isExpiry_date_rejaAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isExpiry_date_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isExpiry_date_descAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isExpiry_date_titlAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnExpiry_date_reja():void
    {
        if (model_internal::_expiry_date_rejaIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfExpiry_date_reja = null;
            model_internal::calculateExpiry_date_rejaIsValid();
        }
    }
    public function invalidateDependentOnExpiry_date_no():void
    {
        if (model_internal::_expiry_date_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfExpiry_date_no = null;
            model_internal::calculateExpiry_date_noIsValid();
        }
    }
    public function invalidateDependentOnExpiry_date_desc():void
    {
        if (model_internal::_expiry_date_descIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfExpiry_date_desc = null;
            model_internal::calculateExpiry_date_descIsValid();
        }
    }
    public function invalidateDependentOnExpiry_date_titl():void
    {
        if (model_internal::_expiry_date_titlIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfExpiry_date_titl = null;
            model_internal::calculateExpiry_date_titlIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get expiry_date_rejaStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get expiry_date_rejaValidator() : StyleValidator
    {
        return model_internal::_expiry_date_rejaValidator;
    }

    model_internal function set _expiry_date_rejaIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_expiry_date_rejaIsValid;         
        if (oldValue !== value)
        {
            model_internal::_expiry_date_rejaIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "expiry_date_rejaIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get expiry_date_rejaIsValid():Boolean
    {
        if (!model_internal::_expiry_date_rejaIsValidCacheInitialized)
        {
            model_internal::calculateExpiry_date_rejaIsValid();
        }

        return model_internal::_expiry_date_rejaIsValid;
    }

    model_internal function calculateExpiry_date_rejaIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_expiry_date_rejaValidator.validate(model_internal::_instance.expiry_date_reja)
        model_internal::_expiry_date_rejaIsValid_der = (valRes.results == null);
        model_internal::_expiry_date_rejaIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::expiry_date_rejaValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::expiry_date_rejaValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get expiry_date_rejaValidationFailureMessages():Array
    {
        if (model_internal::_expiry_date_rejaValidationFailureMessages == null)
            model_internal::calculateExpiry_date_rejaIsValid();

        return _expiry_date_rejaValidationFailureMessages;
    }

    model_internal function set expiry_date_rejaValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_expiry_date_rejaValidationFailureMessages;

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
            model_internal::_expiry_date_rejaValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "expiry_date_rejaValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get expiry_date_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get expiry_date_noValidator() : StyleValidator
    {
        return model_internal::_expiry_date_noValidator;
    }

    model_internal function set _expiry_date_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_expiry_date_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_expiry_date_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "expiry_date_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get expiry_date_noIsValid():Boolean
    {
        if (!model_internal::_expiry_date_noIsValidCacheInitialized)
        {
            model_internal::calculateExpiry_date_noIsValid();
        }

        return model_internal::_expiry_date_noIsValid;
    }

    model_internal function calculateExpiry_date_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_expiry_date_noValidator.validate(model_internal::_instance.expiry_date_no)
        model_internal::_expiry_date_noIsValid_der = (valRes.results == null);
        model_internal::_expiry_date_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::expiry_date_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::expiry_date_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get expiry_date_noValidationFailureMessages():Array
    {
        if (model_internal::_expiry_date_noValidationFailureMessages == null)
            model_internal::calculateExpiry_date_noIsValid();

        return _expiry_date_noValidationFailureMessages;
    }

    model_internal function set expiry_date_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_expiry_date_noValidationFailureMessages;

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
            model_internal::_expiry_date_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "expiry_date_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get expiry_date_descStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get expiry_date_descValidator() : StyleValidator
    {
        return model_internal::_expiry_date_descValidator;
    }

    model_internal function set _expiry_date_descIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_expiry_date_descIsValid;         
        if (oldValue !== value)
        {
            model_internal::_expiry_date_descIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "expiry_date_descIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get expiry_date_descIsValid():Boolean
    {
        if (!model_internal::_expiry_date_descIsValidCacheInitialized)
        {
            model_internal::calculateExpiry_date_descIsValid();
        }

        return model_internal::_expiry_date_descIsValid;
    }

    model_internal function calculateExpiry_date_descIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_expiry_date_descValidator.validate(model_internal::_instance.expiry_date_desc)
        model_internal::_expiry_date_descIsValid_der = (valRes.results == null);
        model_internal::_expiry_date_descIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::expiry_date_descValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::expiry_date_descValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get expiry_date_descValidationFailureMessages():Array
    {
        if (model_internal::_expiry_date_descValidationFailureMessages == null)
            model_internal::calculateExpiry_date_descIsValid();

        return _expiry_date_descValidationFailureMessages;
    }

    model_internal function set expiry_date_descValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_expiry_date_descValidationFailureMessages;

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
            model_internal::_expiry_date_descValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "expiry_date_descValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get expiry_date_titlStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get expiry_date_titlValidator() : StyleValidator
    {
        return model_internal::_expiry_date_titlValidator;
    }

    model_internal function set _expiry_date_titlIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_expiry_date_titlIsValid;         
        if (oldValue !== value)
        {
            model_internal::_expiry_date_titlIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "expiry_date_titlIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get expiry_date_titlIsValid():Boolean
    {
        if (!model_internal::_expiry_date_titlIsValidCacheInitialized)
        {
            model_internal::calculateExpiry_date_titlIsValid();
        }

        return model_internal::_expiry_date_titlIsValid;
    }

    model_internal function calculateExpiry_date_titlIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_expiry_date_titlValidator.validate(model_internal::_instance.expiry_date_titl)
        model_internal::_expiry_date_titlIsValid_der = (valRes.results == null);
        model_internal::_expiry_date_titlIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::expiry_date_titlValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::expiry_date_titlValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get expiry_date_titlValidationFailureMessages():Array
    {
        if (model_internal::_expiry_date_titlValidationFailureMessages == null)
            model_internal::calculateExpiry_date_titlIsValid();

        return _expiry_date_titlValidationFailureMessages;
    }

    model_internal function set expiry_date_titlValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_expiry_date_titlValidationFailureMessages;

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
            model_internal::_expiry_date_titlValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "expiry_date_titlValidationFailureMessages", oldValue, value));
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
            case("expiry_date_reja"):
            {
                return expiry_date_rejaValidationFailureMessages;
            }
            case("expiry_date_no"):
            {
                return expiry_date_noValidationFailureMessages;
            }
            case("expiry_date_desc"):
            {
                return expiry_date_descValidationFailureMessages;
            }
            case("expiry_date_titl"):
            {
                return expiry_date_titlValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
