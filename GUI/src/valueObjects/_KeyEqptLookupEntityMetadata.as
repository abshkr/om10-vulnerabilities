
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
internal class _KeyEqptLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("eqpt_ownr_name", "eqpt_desc", "eqpt_code", "eqpt_etyp_id", "eqpt_etyp_name", "eqpt_ownr_code", "eqpt_name", "eqpt_id");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("eqpt_ownr_name", "eqpt_desc", "eqpt_code", "eqpt_etyp_id", "eqpt_etyp_name", "eqpt_ownr_code", "eqpt_name", "eqpt_id");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("eqpt_ownr_name", "eqpt_desc", "eqpt_code", "eqpt_etyp_id", "eqpt_etyp_name", "eqpt_ownr_code", "eqpt_name", "eqpt_id");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("eqpt_ownr_name", "eqpt_desc", "eqpt_code", "eqpt_etyp_id", "eqpt_etyp_name", "eqpt_ownr_code", "eqpt_name", "eqpt_id");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("eqpt_ownr_name", "eqpt_desc", "eqpt_code", "eqpt_etyp_id", "eqpt_etyp_name", "eqpt_ownr_code", "eqpt_name", "eqpt_id");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "KeyEqptLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _eqpt_ownr_nameIsValid:Boolean;
    model_internal var _eqpt_ownr_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_ownr_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_ownr_nameValidationFailureMessages:Array;
    
    model_internal var _eqpt_descIsValid:Boolean;
    model_internal var _eqpt_descValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_descIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_descValidationFailureMessages:Array;
    
    model_internal var _eqpt_codeIsValid:Boolean;
    model_internal var _eqpt_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_codeValidationFailureMessages:Array;
    
    model_internal var _eqpt_etyp_idIsValid:Boolean;
    model_internal var _eqpt_etyp_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_etyp_idIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_etyp_idValidationFailureMessages:Array;
    
    model_internal var _eqpt_etyp_nameIsValid:Boolean;
    model_internal var _eqpt_etyp_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_etyp_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_etyp_nameValidationFailureMessages:Array;
    
    model_internal var _eqpt_ownr_codeIsValid:Boolean;
    model_internal var _eqpt_ownr_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_ownr_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_ownr_codeValidationFailureMessages:Array;
    
    model_internal var _eqpt_nameIsValid:Boolean;
    model_internal var _eqpt_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_nameValidationFailureMessages:Array;
    
    model_internal var _eqpt_idIsValid:Boolean;
    model_internal var _eqpt_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_idIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_idValidationFailureMessages:Array;

    model_internal var _instance:_Super_KeyEqptLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _KeyEqptLookupEntityMetadata(value : _Super_KeyEqptLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["eqpt_ownr_name"] = new Array();
            model_internal::dependentsOnMap["eqpt_desc"] = new Array();
            model_internal::dependentsOnMap["eqpt_code"] = new Array();
            model_internal::dependentsOnMap["eqpt_etyp_id"] = new Array();
            model_internal::dependentsOnMap["eqpt_etyp_name"] = new Array();
            model_internal::dependentsOnMap["eqpt_ownr_code"] = new Array();
            model_internal::dependentsOnMap["eqpt_name"] = new Array();
            model_internal::dependentsOnMap["eqpt_id"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["eqpt_ownr_name"] = "String";
        model_internal::propertyTypeMap["eqpt_desc"] = "String";
        model_internal::propertyTypeMap["eqpt_code"] = "String";
        model_internal::propertyTypeMap["eqpt_etyp_id"] = "String";
        model_internal::propertyTypeMap["eqpt_etyp_name"] = "String";
        model_internal::propertyTypeMap["eqpt_ownr_code"] = "String";
        model_internal::propertyTypeMap["eqpt_name"] = "Object";
        model_internal::propertyTypeMap["eqpt_id"] = "String";

        model_internal::_instance = value;
        model_internal::_eqpt_ownr_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_ownr_name);
        model_internal::_eqpt_ownr_nameValidator.required = true;
        model_internal::_eqpt_ownr_nameValidator.requiredFieldError = "eqpt_ownr_name is required";
        //model_internal::_eqpt_ownr_nameValidator.source = model_internal::_instance;
        //model_internal::_eqpt_ownr_nameValidator.property = "eqpt_ownr_name";
        model_internal::_eqpt_descValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_desc);
        model_internal::_eqpt_descValidator.required = true;
        model_internal::_eqpt_descValidator.requiredFieldError = "eqpt_desc is required";
        //model_internal::_eqpt_descValidator.source = model_internal::_instance;
        //model_internal::_eqpt_descValidator.property = "eqpt_desc";
        model_internal::_eqpt_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_code);
        model_internal::_eqpt_codeValidator.required = true;
        model_internal::_eqpt_codeValidator.requiredFieldError = "eqpt_code is required";
        //model_internal::_eqpt_codeValidator.source = model_internal::_instance;
        //model_internal::_eqpt_codeValidator.property = "eqpt_code";
        model_internal::_eqpt_etyp_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_etyp_id);
        model_internal::_eqpt_etyp_idValidator.required = true;
        model_internal::_eqpt_etyp_idValidator.requiredFieldError = "eqpt_etyp_id is required";
        //model_internal::_eqpt_etyp_idValidator.source = model_internal::_instance;
        //model_internal::_eqpt_etyp_idValidator.property = "eqpt_etyp_id";
        model_internal::_eqpt_etyp_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_etyp_name);
        model_internal::_eqpt_etyp_nameValidator.required = true;
        model_internal::_eqpt_etyp_nameValidator.requiredFieldError = "eqpt_etyp_name is required";
        //model_internal::_eqpt_etyp_nameValidator.source = model_internal::_instance;
        //model_internal::_eqpt_etyp_nameValidator.property = "eqpt_etyp_name";
        model_internal::_eqpt_ownr_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_ownr_code);
        model_internal::_eqpt_ownr_codeValidator.required = true;
        model_internal::_eqpt_ownr_codeValidator.requiredFieldError = "eqpt_ownr_code is required";
        //model_internal::_eqpt_ownr_codeValidator.source = model_internal::_instance;
        //model_internal::_eqpt_ownr_codeValidator.property = "eqpt_ownr_code";
        model_internal::_eqpt_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_name);
        model_internal::_eqpt_nameValidator.required = true;
        model_internal::_eqpt_nameValidator.requiredFieldError = "eqpt_name is required";
        //model_internal::_eqpt_nameValidator.source = model_internal::_instance;
        //model_internal::_eqpt_nameValidator.property = "eqpt_name";
        model_internal::_eqpt_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_id);
        model_internal::_eqpt_idValidator.required = true;
        model_internal::_eqpt_idValidator.requiredFieldError = "eqpt_id is required";
        //model_internal::_eqpt_idValidator.source = model_internal::_instance;
        //model_internal::_eqpt_idValidator.property = "eqpt_id";
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
            throw new Error(propertyName + " is not a data property of entity KeyEqptLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity KeyEqptLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of KeyEqptLookup");

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
            throw new Error(propertyName + " does not exist for entity KeyEqptLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity KeyEqptLookup");
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
            throw new Error(propertyName + " does not exist for entity KeyEqptLookup");
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
    public function get isEqpt_ownr_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_descAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_etyp_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_etyp_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_ownr_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_idAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnEqpt_ownr_name():void
    {
        if (model_internal::_eqpt_ownr_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_ownr_name = null;
            model_internal::calculateEqpt_ownr_nameIsValid();
        }
    }
    public function invalidateDependentOnEqpt_desc():void
    {
        if (model_internal::_eqpt_descIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_desc = null;
            model_internal::calculateEqpt_descIsValid();
        }
    }
    public function invalidateDependentOnEqpt_code():void
    {
        if (model_internal::_eqpt_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_code = null;
            model_internal::calculateEqpt_codeIsValid();
        }
    }
    public function invalidateDependentOnEqpt_etyp_id():void
    {
        if (model_internal::_eqpt_etyp_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_etyp_id = null;
            model_internal::calculateEqpt_etyp_idIsValid();
        }
    }
    public function invalidateDependentOnEqpt_etyp_name():void
    {
        if (model_internal::_eqpt_etyp_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_etyp_name = null;
            model_internal::calculateEqpt_etyp_nameIsValid();
        }
    }
    public function invalidateDependentOnEqpt_ownr_code():void
    {
        if (model_internal::_eqpt_ownr_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_ownr_code = null;
            model_internal::calculateEqpt_ownr_codeIsValid();
        }
    }
    public function invalidateDependentOnEqpt_name():void
    {
        if (model_internal::_eqpt_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_name = null;
            model_internal::calculateEqpt_nameIsValid();
        }
    }
    public function invalidateDependentOnEqpt_id():void
    {
        if (model_internal::_eqpt_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_id = null;
            model_internal::calculateEqpt_idIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_ownr_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_ownr_nameValidator() : StyleValidator
    {
        return model_internal::_eqpt_ownr_nameValidator;
    }

    model_internal function set _eqpt_ownr_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_ownr_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_ownr_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_ownr_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_ownr_nameIsValid():Boolean
    {
        if (!model_internal::_eqpt_ownr_nameIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_ownr_nameIsValid();
        }

        return model_internal::_eqpt_ownr_nameIsValid;
    }

    model_internal function calculateEqpt_ownr_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_ownr_nameValidator.validate(model_internal::_instance.eqpt_ownr_name)
        model_internal::_eqpt_ownr_nameIsValid_der = (valRes.results == null);
        model_internal::_eqpt_ownr_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_ownr_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_ownr_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_ownr_nameValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_ownr_nameValidationFailureMessages == null)
            model_internal::calculateEqpt_ownr_nameIsValid();

        return _eqpt_ownr_nameValidationFailureMessages;
    }

    model_internal function set eqpt_ownr_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_ownr_nameValidationFailureMessages;

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
            model_internal::_eqpt_ownr_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_ownr_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_descStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_descValidator() : StyleValidator
    {
        return model_internal::_eqpt_descValidator;
    }

    model_internal function set _eqpt_descIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_descIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_descIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_descIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_descIsValid():Boolean
    {
        if (!model_internal::_eqpt_descIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_descIsValid();
        }

        return model_internal::_eqpt_descIsValid;
    }

    model_internal function calculateEqpt_descIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_descValidator.validate(model_internal::_instance.eqpt_desc)
        model_internal::_eqpt_descIsValid_der = (valRes.results == null);
        model_internal::_eqpt_descIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_descValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_descValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_descValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_descValidationFailureMessages == null)
            model_internal::calculateEqpt_descIsValid();

        return _eqpt_descValidationFailureMessages;
    }

    model_internal function set eqpt_descValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_descValidationFailureMessages;

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
            model_internal::_eqpt_descValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_descValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_codeValidator() : StyleValidator
    {
        return model_internal::_eqpt_codeValidator;
    }

    model_internal function set _eqpt_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_codeIsValid():Boolean
    {
        if (!model_internal::_eqpt_codeIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_codeIsValid();
        }

        return model_internal::_eqpt_codeIsValid;
    }

    model_internal function calculateEqpt_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_codeValidator.validate(model_internal::_instance.eqpt_code)
        model_internal::_eqpt_codeIsValid_der = (valRes.results == null);
        model_internal::_eqpt_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_codeValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_codeValidationFailureMessages == null)
            model_internal::calculateEqpt_codeIsValid();

        return _eqpt_codeValidationFailureMessages;
    }

    model_internal function set eqpt_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_codeValidationFailureMessages;

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
            model_internal::_eqpt_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_etyp_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_etyp_idValidator() : StyleValidator
    {
        return model_internal::_eqpt_etyp_idValidator;
    }

    model_internal function set _eqpt_etyp_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_etyp_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_etyp_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etyp_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etyp_idIsValid():Boolean
    {
        if (!model_internal::_eqpt_etyp_idIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_etyp_idIsValid();
        }

        return model_internal::_eqpt_etyp_idIsValid;
    }

    model_internal function calculateEqpt_etyp_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_etyp_idValidator.validate(model_internal::_instance.eqpt_etyp_id)
        model_internal::_eqpt_etyp_idIsValid_der = (valRes.results == null);
        model_internal::_eqpt_etyp_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_etyp_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_etyp_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etyp_idValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_etyp_idValidationFailureMessages == null)
            model_internal::calculateEqpt_etyp_idIsValid();

        return _eqpt_etyp_idValidationFailureMessages;
    }

    model_internal function set eqpt_etyp_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_etyp_idValidationFailureMessages;

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
            model_internal::_eqpt_etyp_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etyp_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_etyp_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_etyp_nameValidator() : StyleValidator
    {
        return model_internal::_eqpt_etyp_nameValidator;
    }

    model_internal function set _eqpt_etyp_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_etyp_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_etyp_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etyp_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etyp_nameIsValid():Boolean
    {
        if (!model_internal::_eqpt_etyp_nameIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_etyp_nameIsValid();
        }

        return model_internal::_eqpt_etyp_nameIsValid;
    }

    model_internal function calculateEqpt_etyp_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_etyp_nameValidator.validate(model_internal::_instance.eqpt_etyp_name)
        model_internal::_eqpt_etyp_nameIsValid_der = (valRes.results == null);
        model_internal::_eqpt_etyp_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_etyp_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_etyp_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etyp_nameValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_etyp_nameValidationFailureMessages == null)
            model_internal::calculateEqpt_etyp_nameIsValid();

        return _eqpt_etyp_nameValidationFailureMessages;
    }

    model_internal function set eqpt_etyp_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_etyp_nameValidationFailureMessages;

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
            model_internal::_eqpt_etyp_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etyp_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_ownr_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_ownr_codeValidator() : StyleValidator
    {
        return model_internal::_eqpt_ownr_codeValidator;
    }

    model_internal function set _eqpt_ownr_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_ownr_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_ownr_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_ownr_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_ownr_codeIsValid():Boolean
    {
        if (!model_internal::_eqpt_ownr_codeIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_ownr_codeIsValid();
        }

        return model_internal::_eqpt_ownr_codeIsValid;
    }

    model_internal function calculateEqpt_ownr_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_ownr_codeValidator.validate(model_internal::_instance.eqpt_ownr_code)
        model_internal::_eqpt_ownr_codeIsValid_der = (valRes.results == null);
        model_internal::_eqpt_ownr_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_ownr_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_ownr_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_ownr_codeValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_ownr_codeValidationFailureMessages == null)
            model_internal::calculateEqpt_ownr_codeIsValid();

        return _eqpt_ownr_codeValidationFailureMessages;
    }

    model_internal function set eqpt_ownr_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_ownr_codeValidationFailureMessages;

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
            model_internal::_eqpt_ownr_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_ownr_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_nameValidator() : StyleValidator
    {
        return model_internal::_eqpt_nameValidator;
    }

    model_internal function set _eqpt_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_nameIsValid():Boolean
    {
        if (!model_internal::_eqpt_nameIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_nameIsValid();
        }

        return model_internal::_eqpt_nameIsValid;
    }

    model_internal function calculateEqpt_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_nameValidator.validate(model_internal::_instance.eqpt_name)
        model_internal::_eqpt_nameIsValid_der = (valRes.results == null);
        model_internal::_eqpt_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_nameValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_nameValidationFailureMessages == null)
            model_internal::calculateEqpt_nameIsValid();

        return _eqpt_nameValidationFailureMessages;
    }

    model_internal function set eqpt_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_nameValidationFailureMessages;

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
            model_internal::_eqpt_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_idValidator() : StyleValidator
    {
        return model_internal::_eqpt_idValidator;
    }

    model_internal function set _eqpt_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_idIsValid():Boolean
    {
        if (!model_internal::_eqpt_idIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_idIsValid();
        }

        return model_internal::_eqpt_idIsValid;
    }

    model_internal function calculateEqpt_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_idValidator.validate(model_internal::_instance.eqpt_id)
        model_internal::_eqpt_idIsValid_der = (valRes.results == null);
        model_internal::_eqpt_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_idValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_idValidationFailureMessages == null)
            model_internal::calculateEqpt_idIsValid();

        return _eqpt_idValidationFailureMessages;
    }

    model_internal function set eqpt_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_idValidationFailureMessages;

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
            model_internal::_eqpt_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_idValidationFailureMessages", oldValue, value));
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
            case("eqpt_ownr_name"):
            {
                return eqpt_ownr_nameValidationFailureMessages;
            }
            case("eqpt_desc"):
            {
                return eqpt_descValidationFailureMessages;
            }
            case("eqpt_code"):
            {
                return eqpt_codeValidationFailureMessages;
            }
            case("eqpt_etyp_id"):
            {
                return eqpt_etyp_idValidationFailureMessages;
            }
            case("eqpt_etyp_name"):
            {
                return eqpt_etyp_nameValidationFailureMessages;
            }
            case("eqpt_ownr_code"):
            {
                return eqpt_ownr_codeValidationFailureMessages;
            }
            case("eqpt_name"):
            {
                return eqpt_nameValidationFailureMessages;
            }
            case("eqpt_id"):
            {
                return eqpt_idValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
