
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
internal class _DomainLinksEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("DOMAIN_OBJECT_ACTIVE", "OBJECT_ID", "DOMAIN_OBJECT_ID", "DOMAIN_ID");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("DOMAIN_OBJECT_ACTIVE", "OBJECT_ID", "DOMAIN_OBJECT_ID", "DOMAIN_ID");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("DOMAIN_OBJECT_ACTIVE", "OBJECT_ID", "DOMAIN_OBJECT_ID", "DOMAIN_ID");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("DOMAIN_OBJECT_ACTIVE", "OBJECT_ID", "DOMAIN_OBJECT_ID", "DOMAIN_ID");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("DOMAIN_OBJECT_ACTIVE", "OBJECT_ID", "DOMAIN_OBJECT_ID", "DOMAIN_ID");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "DomainLinks";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _DOMAIN_OBJECT_ACTIVEIsValid:Boolean;
    model_internal var _DOMAIN_OBJECT_ACTIVEValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _DOMAIN_OBJECT_ACTIVEIsValidCacheInitialized:Boolean = false;
    model_internal var _DOMAIN_OBJECT_ACTIVEValidationFailureMessages:Array;
    
    model_internal var _OBJECT_IDIsValid:Boolean;
    model_internal var _OBJECT_IDValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _OBJECT_IDIsValidCacheInitialized:Boolean = false;
    model_internal var _OBJECT_IDValidationFailureMessages:Array;
    
    model_internal var _DOMAIN_OBJECT_IDIsValid:Boolean;
    model_internal var _DOMAIN_OBJECT_IDValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _DOMAIN_OBJECT_IDIsValidCacheInitialized:Boolean = false;
    model_internal var _DOMAIN_OBJECT_IDValidationFailureMessages:Array;
    
    model_internal var _DOMAIN_IDIsValid:Boolean;
    model_internal var _DOMAIN_IDValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _DOMAIN_IDIsValidCacheInitialized:Boolean = false;
    model_internal var _DOMAIN_IDValidationFailureMessages:Array;

    model_internal var _instance:_Super_DomainLinks;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _DomainLinksEntityMetadata(value : _Super_DomainLinks)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["DOMAIN_OBJECT_ACTIVE"] = new Array();
            model_internal::dependentsOnMap["OBJECT_ID"] = new Array();
            model_internal::dependentsOnMap["DOMAIN_OBJECT_ID"] = new Array();
            model_internal::dependentsOnMap["DOMAIN_ID"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["DOMAIN_OBJECT_ACTIVE"] = "String";
        model_internal::propertyTypeMap["OBJECT_ID"] = "String";
        model_internal::propertyTypeMap["DOMAIN_OBJECT_ID"] = "String";
        model_internal::propertyTypeMap["DOMAIN_ID"] = "String";

        model_internal::_instance = value;
        model_internal::_DOMAIN_OBJECT_ACTIVEValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDOMAIN_OBJECT_ACTIVE);
        model_internal::_DOMAIN_OBJECT_ACTIVEValidator.required = true;
        model_internal::_DOMAIN_OBJECT_ACTIVEValidator.requiredFieldError = "DOMAIN_OBJECT_ACTIVE is required";
        //model_internal::_DOMAIN_OBJECT_ACTIVEValidator.source = model_internal::_instance;
        //model_internal::_DOMAIN_OBJECT_ACTIVEValidator.property = "DOMAIN_OBJECT_ACTIVE";
        model_internal::_OBJECT_IDValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOBJECT_ID);
        model_internal::_OBJECT_IDValidator.required = true;
        model_internal::_OBJECT_IDValidator.requiredFieldError = "OBJECT_ID is required";
        //model_internal::_OBJECT_IDValidator.source = model_internal::_instance;
        //model_internal::_OBJECT_IDValidator.property = "OBJECT_ID";
        model_internal::_DOMAIN_OBJECT_IDValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDOMAIN_OBJECT_ID);
        model_internal::_DOMAIN_OBJECT_IDValidator.required = true;
        model_internal::_DOMAIN_OBJECT_IDValidator.requiredFieldError = "DOMAIN_OBJECT_ID is required";
        //model_internal::_DOMAIN_OBJECT_IDValidator.source = model_internal::_instance;
        //model_internal::_DOMAIN_OBJECT_IDValidator.property = "DOMAIN_OBJECT_ID";
        model_internal::_DOMAIN_IDValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDOMAIN_ID);
        model_internal::_DOMAIN_IDValidator.required = true;
        model_internal::_DOMAIN_IDValidator.requiredFieldError = "DOMAIN_ID is required";
        //model_internal::_DOMAIN_IDValidator.source = model_internal::_instance;
        //model_internal::_DOMAIN_IDValidator.property = "DOMAIN_ID";
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
            throw new Error(propertyName + " is not a data property of entity DomainLinks");
            
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
            throw new Error(propertyName + " is not a collection property of entity DomainLinks");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of DomainLinks");

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
            throw new Error(propertyName + " does not exist for entity DomainLinks");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity DomainLinks");
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
            throw new Error(propertyName + " does not exist for entity DomainLinks");
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
    public function get isDOMAIN_OBJECT_ACTIVEAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOBJECT_IDAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isDOMAIN_OBJECT_IDAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isDOMAIN_IDAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnDOMAIN_OBJECT_ACTIVE():void
    {
        if (model_internal::_DOMAIN_OBJECT_ACTIVEIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDOMAIN_OBJECT_ACTIVE = null;
            model_internal::calculateDOMAIN_OBJECT_ACTIVEIsValid();
        }
    }
    public function invalidateDependentOnOBJECT_ID():void
    {
        if (model_internal::_OBJECT_IDIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOBJECT_ID = null;
            model_internal::calculateOBJECT_IDIsValid();
        }
    }
    public function invalidateDependentOnDOMAIN_OBJECT_ID():void
    {
        if (model_internal::_DOMAIN_OBJECT_IDIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDOMAIN_OBJECT_ID = null;
            model_internal::calculateDOMAIN_OBJECT_IDIsValid();
        }
    }
    public function invalidateDependentOnDOMAIN_ID():void
    {
        if (model_internal::_DOMAIN_IDIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDOMAIN_ID = null;
            model_internal::calculateDOMAIN_IDIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get DOMAIN_OBJECT_ACTIVEStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get DOMAIN_OBJECT_ACTIVEValidator() : StyleValidator
    {
        return model_internal::_DOMAIN_OBJECT_ACTIVEValidator;
    }

    model_internal function set _DOMAIN_OBJECT_ACTIVEIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_DOMAIN_OBJECT_ACTIVEIsValid;         
        if (oldValue !== value)
        {
            model_internal::_DOMAIN_OBJECT_ACTIVEIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_OBJECT_ACTIVEIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_OBJECT_ACTIVEIsValid():Boolean
    {
        if (!model_internal::_DOMAIN_OBJECT_ACTIVEIsValidCacheInitialized)
        {
            model_internal::calculateDOMAIN_OBJECT_ACTIVEIsValid();
        }

        return model_internal::_DOMAIN_OBJECT_ACTIVEIsValid;
    }

    model_internal function calculateDOMAIN_OBJECT_ACTIVEIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_DOMAIN_OBJECT_ACTIVEValidator.validate(model_internal::_instance.DOMAIN_OBJECT_ACTIVE)
        model_internal::_DOMAIN_OBJECT_ACTIVEIsValid_der = (valRes.results == null);
        model_internal::_DOMAIN_OBJECT_ACTIVEIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::DOMAIN_OBJECT_ACTIVEValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::DOMAIN_OBJECT_ACTIVEValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_OBJECT_ACTIVEValidationFailureMessages():Array
    {
        if (model_internal::_DOMAIN_OBJECT_ACTIVEValidationFailureMessages == null)
            model_internal::calculateDOMAIN_OBJECT_ACTIVEIsValid();

        return _DOMAIN_OBJECT_ACTIVEValidationFailureMessages;
    }

    model_internal function set DOMAIN_OBJECT_ACTIVEValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_DOMAIN_OBJECT_ACTIVEValidationFailureMessages;

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
            model_internal::_DOMAIN_OBJECT_ACTIVEValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_OBJECT_ACTIVEValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get OBJECT_IDStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get OBJECT_IDValidator() : StyleValidator
    {
        return model_internal::_OBJECT_IDValidator;
    }

    model_internal function set _OBJECT_IDIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_OBJECT_IDIsValid;         
        if (oldValue !== value)
        {
            model_internal::_OBJECT_IDIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "OBJECT_IDIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get OBJECT_IDIsValid():Boolean
    {
        if (!model_internal::_OBJECT_IDIsValidCacheInitialized)
        {
            model_internal::calculateOBJECT_IDIsValid();
        }

        return model_internal::_OBJECT_IDIsValid;
    }

    model_internal function calculateOBJECT_IDIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_OBJECT_IDValidator.validate(model_internal::_instance.OBJECT_ID)
        model_internal::_OBJECT_IDIsValid_der = (valRes.results == null);
        model_internal::_OBJECT_IDIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::OBJECT_IDValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::OBJECT_IDValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get OBJECT_IDValidationFailureMessages():Array
    {
        if (model_internal::_OBJECT_IDValidationFailureMessages == null)
            model_internal::calculateOBJECT_IDIsValid();

        return _OBJECT_IDValidationFailureMessages;
    }

    model_internal function set OBJECT_IDValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_OBJECT_IDValidationFailureMessages;

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
            model_internal::_OBJECT_IDValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "OBJECT_IDValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get DOMAIN_OBJECT_IDStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get DOMAIN_OBJECT_IDValidator() : StyleValidator
    {
        return model_internal::_DOMAIN_OBJECT_IDValidator;
    }

    model_internal function set _DOMAIN_OBJECT_IDIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_DOMAIN_OBJECT_IDIsValid;         
        if (oldValue !== value)
        {
            model_internal::_DOMAIN_OBJECT_IDIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_OBJECT_IDIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_OBJECT_IDIsValid():Boolean
    {
        if (!model_internal::_DOMAIN_OBJECT_IDIsValidCacheInitialized)
        {
            model_internal::calculateDOMAIN_OBJECT_IDIsValid();
        }

        return model_internal::_DOMAIN_OBJECT_IDIsValid;
    }

    model_internal function calculateDOMAIN_OBJECT_IDIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_DOMAIN_OBJECT_IDValidator.validate(model_internal::_instance.DOMAIN_OBJECT_ID)
        model_internal::_DOMAIN_OBJECT_IDIsValid_der = (valRes.results == null);
        model_internal::_DOMAIN_OBJECT_IDIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::DOMAIN_OBJECT_IDValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::DOMAIN_OBJECT_IDValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_OBJECT_IDValidationFailureMessages():Array
    {
        if (model_internal::_DOMAIN_OBJECT_IDValidationFailureMessages == null)
            model_internal::calculateDOMAIN_OBJECT_IDIsValid();

        return _DOMAIN_OBJECT_IDValidationFailureMessages;
    }

    model_internal function set DOMAIN_OBJECT_IDValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_DOMAIN_OBJECT_IDValidationFailureMessages;

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
            model_internal::_DOMAIN_OBJECT_IDValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_OBJECT_IDValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get DOMAIN_IDStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get DOMAIN_IDValidator() : StyleValidator
    {
        return model_internal::_DOMAIN_IDValidator;
    }

    model_internal function set _DOMAIN_IDIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_DOMAIN_IDIsValid;         
        if (oldValue !== value)
        {
            model_internal::_DOMAIN_IDIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_IDIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_IDIsValid():Boolean
    {
        if (!model_internal::_DOMAIN_IDIsValidCacheInitialized)
        {
            model_internal::calculateDOMAIN_IDIsValid();
        }

        return model_internal::_DOMAIN_IDIsValid;
    }

    model_internal function calculateDOMAIN_IDIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_DOMAIN_IDValidator.validate(model_internal::_instance.DOMAIN_ID)
        model_internal::_DOMAIN_IDIsValid_der = (valRes.results == null);
        model_internal::_DOMAIN_IDIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::DOMAIN_IDValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::DOMAIN_IDValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_IDValidationFailureMessages():Array
    {
        if (model_internal::_DOMAIN_IDValidationFailureMessages == null)
            model_internal::calculateDOMAIN_IDIsValid();

        return _DOMAIN_IDValidationFailureMessages;
    }

    model_internal function set DOMAIN_IDValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_DOMAIN_IDValidationFailureMessages;

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
            model_internal::_DOMAIN_IDValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_IDValidationFailureMessages", oldValue, value));
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
            case("DOMAIN_OBJECT_ACTIVE"):
            {
                return DOMAIN_OBJECT_ACTIVEValidationFailureMessages;
            }
            case("OBJECT_ID"):
            {
                return OBJECT_IDValidationFailureMessages;
            }
            case("DOMAIN_OBJECT_ID"):
            {
                return DOMAIN_OBJECT_IDValidationFailureMessages;
            }
            case("DOMAIN_ID"):
            {
                return DOMAIN_IDValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
