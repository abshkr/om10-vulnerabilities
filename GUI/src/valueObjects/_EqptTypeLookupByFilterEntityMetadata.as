
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
internal class _EqptTypeLookupByFilterEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("etyp_cmpts", "etyp_class", "etyp_title", "cmptnu", "etyp_id");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("etyp_cmpts", "etyp_class", "etyp_title", "cmptnu", "etyp_id");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("etyp_cmpts", "etyp_class", "etyp_title", "cmptnu", "etyp_id");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("etyp_cmpts", "etyp_class", "etyp_title", "cmptnu", "etyp_id");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("etyp_cmpts", "etyp_class", "etyp_title", "cmptnu", "etyp_id");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "EqptTypeLookupByFilter";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _etyp_cmptsIsValid:Boolean;
    model_internal var _etyp_cmptsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_cmptsIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_cmptsValidationFailureMessages:Array;
    
    model_internal var _etyp_classIsValid:Boolean;
    model_internal var _etyp_classValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_classIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_classValidationFailureMessages:Array;
    
    model_internal var _etyp_titleIsValid:Boolean;
    model_internal var _etyp_titleValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_titleIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_titleValidationFailureMessages:Array;
    
    model_internal var _cmptnuIsValid:Boolean;
    model_internal var _cmptnuValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmptnuIsValidCacheInitialized:Boolean = false;
    model_internal var _cmptnuValidationFailureMessages:Array;
    
    model_internal var _etyp_idIsValid:Boolean;
    model_internal var _etyp_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_idIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_idValidationFailureMessages:Array;

    model_internal var _instance:_Super_EqptTypeLookupByFilter;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _EqptTypeLookupByFilterEntityMetadata(value : _Super_EqptTypeLookupByFilter)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["etyp_cmpts"] = new Array();
            model_internal::dependentsOnMap["etyp_class"] = new Array();
            model_internal::dependentsOnMap["etyp_title"] = new Array();
            model_internal::dependentsOnMap["cmptnu"] = new Array();
            model_internal::dependentsOnMap["etyp_id"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["etyp_cmpts"] = "Object";
        model_internal::propertyTypeMap["etyp_class"] = "String";
        model_internal::propertyTypeMap["etyp_title"] = "String";
        model_internal::propertyTypeMap["cmptnu"] = "String";
        model_internal::propertyTypeMap["etyp_id"] = "String";

        model_internal::_instance = value;
        model_internal::_etyp_cmptsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_cmpts);
        model_internal::_etyp_cmptsValidator.required = true;
        model_internal::_etyp_cmptsValidator.requiredFieldError = "etyp_cmpts is required";
        //model_internal::_etyp_cmptsValidator.source = model_internal::_instance;
        //model_internal::_etyp_cmptsValidator.property = "etyp_cmpts";
        model_internal::_etyp_classValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_class);
        model_internal::_etyp_classValidator.required = true;
        model_internal::_etyp_classValidator.requiredFieldError = "etyp_class is required";
        //model_internal::_etyp_classValidator.source = model_internal::_instance;
        //model_internal::_etyp_classValidator.property = "etyp_class";
        model_internal::_etyp_titleValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_title);
        model_internal::_etyp_titleValidator.required = true;
        model_internal::_etyp_titleValidator.requiredFieldError = "etyp_title is required";
        //model_internal::_etyp_titleValidator.source = model_internal::_instance;
        //model_internal::_etyp_titleValidator.property = "etyp_title";
        model_internal::_cmptnuValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmptnu);
        model_internal::_cmptnuValidator.required = true;
        model_internal::_cmptnuValidator.requiredFieldError = "cmptnu is required";
        //model_internal::_cmptnuValidator.source = model_internal::_instance;
        //model_internal::_cmptnuValidator.property = "cmptnu";
        model_internal::_etyp_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_id);
        model_internal::_etyp_idValidator.required = true;
        model_internal::_etyp_idValidator.requiredFieldError = "etyp_id is required";
        //model_internal::_etyp_idValidator.source = model_internal::_instance;
        //model_internal::_etyp_idValidator.property = "etyp_id";
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
            throw new Error(propertyName + " is not a data property of entity EqptTypeLookupByFilter");
            
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
            throw new Error(propertyName + " is not a collection property of entity EqptTypeLookupByFilter");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of EqptTypeLookupByFilter");

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
            throw new Error(propertyName + " does not exist for entity EqptTypeLookupByFilter");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity EqptTypeLookupByFilter");
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
            throw new Error(propertyName + " does not exist for entity EqptTypeLookupByFilter");
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
    public function get isEtyp_cmptsAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_classAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_titleAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmptnuAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_idAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnEtyp_cmpts():void
    {
        if (model_internal::_etyp_cmptsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_cmpts = null;
            model_internal::calculateEtyp_cmptsIsValid();
        }
    }
    public function invalidateDependentOnEtyp_class():void
    {
        if (model_internal::_etyp_classIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_class = null;
            model_internal::calculateEtyp_classIsValid();
        }
    }
    public function invalidateDependentOnEtyp_title():void
    {
        if (model_internal::_etyp_titleIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_title = null;
            model_internal::calculateEtyp_titleIsValid();
        }
    }
    public function invalidateDependentOnCmptnu():void
    {
        if (model_internal::_cmptnuIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmptnu = null;
            model_internal::calculateCmptnuIsValid();
        }
    }
    public function invalidateDependentOnEtyp_id():void
    {
        if (model_internal::_etyp_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_id = null;
            model_internal::calculateEtyp_idIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_cmptsStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_cmptsValidator() : StyleValidator
    {
        return model_internal::_etyp_cmptsValidator;
    }

    model_internal function set _etyp_cmptsIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_cmptsIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_cmptsIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_cmptsIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_cmptsIsValid():Boolean
    {
        if (!model_internal::_etyp_cmptsIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_cmptsIsValid();
        }

        return model_internal::_etyp_cmptsIsValid;
    }

    model_internal function calculateEtyp_cmptsIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_cmptsValidator.validate(model_internal::_instance.etyp_cmpts)
        model_internal::_etyp_cmptsIsValid_der = (valRes.results == null);
        model_internal::_etyp_cmptsIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_cmptsValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_cmptsValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_cmptsValidationFailureMessages():Array
    {
        if (model_internal::_etyp_cmptsValidationFailureMessages == null)
            model_internal::calculateEtyp_cmptsIsValid();

        return _etyp_cmptsValidationFailureMessages;
    }

    model_internal function set etyp_cmptsValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_cmptsValidationFailureMessages;

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
            model_internal::_etyp_cmptsValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_cmptsValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_classStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_classValidator() : StyleValidator
    {
        return model_internal::_etyp_classValidator;
    }

    model_internal function set _etyp_classIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_classIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_classIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_classIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_classIsValid():Boolean
    {
        if (!model_internal::_etyp_classIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_classIsValid();
        }

        return model_internal::_etyp_classIsValid;
    }

    model_internal function calculateEtyp_classIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_classValidator.validate(model_internal::_instance.etyp_class)
        model_internal::_etyp_classIsValid_der = (valRes.results == null);
        model_internal::_etyp_classIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_classValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_classValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_classValidationFailureMessages():Array
    {
        if (model_internal::_etyp_classValidationFailureMessages == null)
            model_internal::calculateEtyp_classIsValid();

        return _etyp_classValidationFailureMessages;
    }

    model_internal function set etyp_classValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_classValidationFailureMessages;

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
            model_internal::_etyp_classValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_classValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_titleStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_titleValidator() : StyleValidator
    {
        return model_internal::_etyp_titleValidator;
    }

    model_internal function set _etyp_titleIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_titleIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_titleIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_titleIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_titleIsValid():Boolean
    {
        if (!model_internal::_etyp_titleIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_titleIsValid();
        }

        return model_internal::_etyp_titleIsValid;
    }

    model_internal function calculateEtyp_titleIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_titleValidator.validate(model_internal::_instance.etyp_title)
        model_internal::_etyp_titleIsValid_der = (valRes.results == null);
        model_internal::_etyp_titleIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_titleValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_titleValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_titleValidationFailureMessages():Array
    {
        if (model_internal::_etyp_titleValidationFailureMessages == null)
            model_internal::calculateEtyp_titleIsValid();

        return _etyp_titleValidationFailureMessages;
    }

    model_internal function set etyp_titleValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_titleValidationFailureMessages;

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
            model_internal::_etyp_titleValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_titleValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmptnuStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmptnuValidator() : StyleValidator
    {
        return model_internal::_cmptnuValidator;
    }

    model_internal function set _cmptnuIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmptnuIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmptnuIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmptnuIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmptnuIsValid():Boolean
    {
        if (!model_internal::_cmptnuIsValidCacheInitialized)
        {
            model_internal::calculateCmptnuIsValid();
        }

        return model_internal::_cmptnuIsValid;
    }

    model_internal function calculateCmptnuIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmptnuValidator.validate(model_internal::_instance.cmptnu)
        model_internal::_cmptnuIsValid_der = (valRes.results == null);
        model_internal::_cmptnuIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmptnuValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmptnuValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmptnuValidationFailureMessages():Array
    {
        if (model_internal::_cmptnuValidationFailureMessages == null)
            model_internal::calculateCmptnuIsValid();

        return _cmptnuValidationFailureMessages;
    }

    model_internal function set cmptnuValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmptnuValidationFailureMessages;

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
            model_internal::_cmptnuValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmptnuValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_idValidator() : StyleValidator
    {
        return model_internal::_etyp_idValidator;
    }

    model_internal function set _etyp_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_idIsValid():Boolean
    {
        if (!model_internal::_etyp_idIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_idIsValid();
        }

        return model_internal::_etyp_idIsValid;
    }

    model_internal function calculateEtyp_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_idValidator.validate(model_internal::_instance.etyp_id)
        model_internal::_etyp_idIsValid_der = (valRes.results == null);
        model_internal::_etyp_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_idValidationFailureMessages():Array
    {
        if (model_internal::_etyp_idValidationFailureMessages == null)
            model_internal::calculateEtyp_idIsValid();

        return _etyp_idValidationFailureMessages;
    }

    model_internal function set etyp_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_idValidationFailureMessages;

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
            model_internal::_etyp_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_idValidationFailureMessages", oldValue, value));
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
            case("etyp_cmpts"):
            {
                return etyp_cmptsValidationFailureMessages;
            }
            case("etyp_class"):
            {
                return etyp_classValidationFailureMessages;
            }
            case("etyp_title"):
            {
                return etyp_titleValidationFailureMessages;
            }
            case("cmptnu"):
            {
                return cmptnuValidationFailureMessages;
            }
            case("etyp_id"):
            {
                return etyp_idValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
