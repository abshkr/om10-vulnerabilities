
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
internal class _KeyTnkrLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("tnkr_ownr_name", "tnkr_etyp_name", "tnkr_name", "tnkr_desc", "tnkr_carr_code", "tnkr_ownr_code", "tnkr_code", "tnkr_carr_name", "tnkr_etyp_id");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("tnkr_ownr_name", "tnkr_etyp_name", "tnkr_name", "tnkr_desc", "tnkr_carr_code", "tnkr_ownr_code", "tnkr_code", "tnkr_carr_name", "tnkr_etyp_id");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("tnkr_ownr_name", "tnkr_etyp_name", "tnkr_name", "tnkr_desc", "tnkr_carr_code", "tnkr_ownr_code", "tnkr_code", "tnkr_carr_name", "tnkr_etyp_id");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("tnkr_ownr_name", "tnkr_etyp_name", "tnkr_name", "tnkr_desc", "tnkr_carr_code", "tnkr_ownr_code", "tnkr_code", "tnkr_carr_name", "tnkr_etyp_id");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("tnkr_ownr_name", "tnkr_etyp_name", "tnkr_name", "tnkr_desc", "tnkr_carr_code", "tnkr_ownr_code", "tnkr_code", "tnkr_carr_name", "tnkr_etyp_id");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "KeyTnkrLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _tnkr_ownr_nameIsValid:Boolean;
    model_internal var _tnkr_ownr_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_ownr_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_ownr_nameValidationFailureMessages:Array;
    
    model_internal var _tnkr_etyp_nameIsValid:Boolean;
    model_internal var _tnkr_etyp_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_etyp_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_etyp_nameValidationFailureMessages:Array;
    
    model_internal var _tnkr_nameIsValid:Boolean;
    model_internal var _tnkr_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_nameValidationFailureMessages:Array;
    
    model_internal var _tnkr_descIsValid:Boolean;
    model_internal var _tnkr_descValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_descIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_descValidationFailureMessages:Array;
    
    model_internal var _tnkr_carr_codeIsValid:Boolean;
    model_internal var _tnkr_carr_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_carr_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_carr_codeValidationFailureMessages:Array;
    
    model_internal var _tnkr_ownr_codeIsValid:Boolean;
    model_internal var _tnkr_ownr_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_ownr_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_ownr_codeValidationFailureMessages:Array;
    
    model_internal var _tnkr_codeIsValid:Boolean;
    model_internal var _tnkr_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_codeValidationFailureMessages:Array;
    
    model_internal var _tnkr_carr_nameIsValid:Boolean;
    model_internal var _tnkr_carr_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_carr_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_carr_nameValidationFailureMessages:Array;
    
    model_internal var _tnkr_etyp_idIsValid:Boolean;
    model_internal var _tnkr_etyp_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_etyp_idIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_etyp_idValidationFailureMessages:Array;

    model_internal var _instance:_Super_KeyTnkrLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _KeyTnkrLookupEntityMetadata(value : _Super_KeyTnkrLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["tnkr_ownr_name"] = new Array();
            model_internal::dependentsOnMap["tnkr_etyp_name"] = new Array();
            model_internal::dependentsOnMap["tnkr_name"] = new Array();
            model_internal::dependentsOnMap["tnkr_desc"] = new Array();
            model_internal::dependentsOnMap["tnkr_carr_code"] = new Array();
            model_internal::dependentsOnMap["tnkr_ownr_code"] = new Array();
            model_internal::dependentsOnMap["tnkr_code"] = new Array();
            model_internal::dependentsOnMap["tnkr_carr_name"] = new Array();
            model_internal::dependentsOnMap["tnkr_etyp_id"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["tnkr_ownr_name"] = "String";
        model_internal::propertyTypeMap["tnkr_etyp_name"] = "String";
        model_internal::propertyTypeMap["tnkr_name"] = "Object";
        model_internal::propertyTypeMap["tnkr_desc"] = "String";
        model_internal::propertyTypeMap["tnkr_carr_code"] = "String";
        model_internal::propertyTypeMap["tnkr_ownr_code"] = "String";
        model_internal::propertyTypeMap["tnkr_code"] = "String";
        model_internal::propertyTypeMap["tnkr_carr_name"] = "String";
        model_internal::propertyTypeMap["tnkr_etyp_id"] = "String";

        model_internal::_instance = value;
        model_internal::_tnkr_ownr_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_ownr_name);
        model_internal::_tnkr_ownr_nameValidator.required = true;
        model_internal::_tnkr_ownr_nameValidator.requiredFieldError = "tnkr_ownr_name is required";
        //model_internal::_tnkr_ownr_nameValidator.source = model_internal::_instance;
        //model_internal::_tnkr_ownr_nameValidator.property = "tnkr_ownr_name";
        model_internal::_tnkr_etyp_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_etyp_name);
        model_internal::_tnkr_etyp_nameValidator.required = true;
        model_internal::_tnkr_etyp_nameValidator.requiredFieldError = "tnkr_etyp_name is required";
        //model_internal::_tnkr_etyp_nameValidator.source = model_internal::_instance;
        //model_internal::_tnkr_etyp_nameValidator.property = "tnkr_etyp_name";
        model_internal::_tnkr_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_name);
        model_internal::_tnkr_nameValidator.required = true;
        model_internal::_tnkr_nameValidator.requiredFieldError = "tnkr_name is required";
        //model_internal::_tnkr_nameValidator.source = model_internal::_instance;
        //model_internal::_tnkr_nameValidator.property = "tnkr_name";
        model_internal::_tnkr_descValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_desc);
        model_internal::_tnkr_descValidator.required = true;
        model_internal::_tnkr_descValidator.requiredFieldError = "tnkr_desc is required";
        //model_internal::_tnkr_descValidator.source = model_internal::_instance;
        //model_internal::_tnkr_descValidator.property = "tnkr_desc";
        model_internal::_tnkr_carr_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_carr_code);
        model_internal::_tnkr_carr_codeValidator.required = true;
        model_internal::_tnkr_carr_codeValidator.requiredFieldError = "tnkr_carr_code is required";
        //model_internal::_tnkr_carr_codeValidator.source = model_internal::_instance;
        //model_internal::_tnkr_carr_codeValidator.property = "tnkr_carr_code";
        model_internal::_tnkr_ownr_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_ownr_code);
        model_internal::_tnkr_ownr_codeValidator.required = true;
        model_internal::_tnkr_ownr_codeValidator.requiredFieldError = "tnkr_ownr_code is required";
        //model_internal::_tnkr_ownr_codeValidator.source = model_internal::_instance;
        //model_internal::_tnkr_ownr_codeValidator.property = "tnkr_ownr_code";
        model_internal::_tnkr_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_code);
        model_internal::_tnkr_codeValidator.required = true;
        model_internal::_tnkr_codeValidator.requiredFieldError = "tnkr_code is required";
        //model_internal::_tnkr_codeValidator.source = model_internal::_instance;
        //model_internal::_tnkr_codeValidator.property = "tnkr_code";
        model_internal::_tnkr_carr_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_carr_name);
        model_internal::_tnkr_carr_nameValidator.required = true;
        model_internal::_tnkr_carr_nameValidator.requiredFieldError = "tnkr_carr_name is required";
        //model_internal::_tnkr_carr_nameValidator.source = model_internal::_instance;
        //model_internal::_tnkr_carr_nameValidator.property = "tnkr_carr_name";
        model_internal::_tnkr_etyp_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_etyp_id);
        model_internal::_tnkr_etyp_idValidator.required = true;
        model_internal::_tnkr_etyp_idValidator.requiredFieldError = "tnkr_etyp_id is required";
        //model_internal::_tnkr_etyp_idValidator.source = model_internal::_instance;
        //model_internal::_tnkr_etyp_idValidator.property = "tnkr_etyp_id";
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
            throw new Error(propertyName + " is not a data property of entity KeyTnkrLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity KeyTnkrLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of KeyTnkrLookup");

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
            throw new Error(propertyName + " does not exist for entity KeyTnkrLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity KeyTnkrLookup");
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
            throw new Error(propertyName + " does not exist for entity KeyTnkrLookup");
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
    public function get isTnkr_ownr_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_etyp_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_descAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_carr_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_ownr_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_carr_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_etyp_idAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnTnkr_ownr_name():void
    {
        if (model_internal::_tnkr_ownr_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_ownr_name = null;
            model_internal::calculateTnkr_ownr_nameIsValid();
        }
    }
    public function invalidateDependentOnTnkr_etyp_name():void
    {
        if (model_internal::_tnkr_etyp_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_etyp_name = null;
            model_internal::calculateTnkr_etyp_nameIsValid();
        }
    }
    public function invalidateDependentOnTnkr_name():void
    {
        if (model_internal::_tnkr_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_name = null;
            model_internal::calculateTnkr_nameIsValid();
        }
    }
    public function invalidateDependentOnTnkr_desc():void
    {
        if (model_internal::_tnkr_descIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_desc = null;
            model_internal::calculateTnkr_descIsValid();
        }
    }
    public function invalidateDependentOnTnkr_carr_code():void
    {
        if (model_internal::_tnkr_carr_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_carr_code = null;
            model_internal::calculateTnkr_carr_codeIsValid();
        }
    }
    public function invalidateDependentOnTnkr_ownr_code():void
    {
        if (model_internal::_tnkr_ownr_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_ownr_code = null;
            model_internal::calculateTnkr_ownr_codeIsValid();
        }
    }
    public function invalidateDependentOnTnkr_code():void
    {
        if (model_internal::_tnkr_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_code = null;
            model_internal::calculateTnkr_codeIsValid();
        }
    }
    public function invalidateDependentOnTnkr_carr_name():void
    {
        if (model_internal::_tnkr_carr_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_carr_name = null;
            model_internal::calculateTnkr_carr_nameIsValid();
        }
    }
    public function invalidateDependentOnTnkr_etyp_id():void
    {
        if (model_internal::_tnkr_etyp_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_etyp_id = null;
            model_internal::calculateTnkr_etyp_idIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_ownr_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_ownr_nameValidator() : StyleValidator
    {
        return model_internal::_tnkr_ownr_nameValidator;
    }

    model_internal function set _tnkr_ownr_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_ownr_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_ownr_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_ownr_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_ownr_nameIsValid():Boolean
    {
        if (!model_internal::_tnkr_ownr_nameIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_ownr_nameIsValid();
        }

        return model_internal::_tnkr_ownr_nameIsValid;
    }

    model_internal function calculateTnkr_ownr_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_ownr_nameValidator.validate(model_internal::_instance.tnkr_ownr_name)
        model_internal::_tnkr_ownr_nameIsValid_der = (valRes.results == null);
        model_internal::_tnkr_ownr_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_ownr_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_ownr_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_ownr_nameValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_ownr_nameValidationFailureMessages == null)
            model_internal::calculateTnkr_ownr_nameIsValid();

        return _tnkr_ownr_nameValidationFailureMessages;
    }

    model_internal function set tnkr_ownr_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_ownr_nameValidationFailureMessages;

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
            model_internal::_tnkr_ownr_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_ownr_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_etyp_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_etyp_nameValidator() : StyleValidator
    {
        return model_internal::_tnkr_etyp_nameValidator;
    }

    model_internal function set _tnkr_etyp_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_etyp_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_etyp_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_etyp_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_etyp_nameIsValid():Boolean
    {
        if (!model_internal::_tnkr_etyp_nameIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_etyp_nameIsValid();
        }

        return model_internal::_tnkr_etyp_nameIsValid;
    }

    model_internal function calculateTnkr_etyp_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_etyp_nameValidator.validate(model_internal::_instance.tnkr_etyp_name)
        model_internal::_tnkr_etyp_nameIsValid_der = (valRes.results == null);
        model_internal::_tnkr_etyp_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_etyp_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_etyp_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_etyp_nameValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_etyp_nameValidationFailureMessages == null)
            model_internal::calculateTnkr_etyp_nameIsValid();

        return _tnkr_etyp_nameValidationFailureMessages;
    }

    model_internal function set tnkr_etyp_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_etyp_nameValidationFailureMessages;

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
            model_internal::_tnkr_etyp_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_etyp_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_nameValidator() : StyleValidator
    {
        return model_internal::_tnkr_nameValidator;
    }

    model_internal function set _tnkr_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_nameIsValid():Boolean
    {
        if (!model_internal::_tnkr_nameIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_nameIsValid();
        }

        return model_internal::_tnkr_nameIsValid;
    }

    model_internal function calculateTnkr_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_nameValidator.validate(model_internal::_instance.tnkr_name)
        model_internal::_tnkr_nameIsValid_der = (valRes.results == null);
        model_internal::_tnkr_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_nameValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_nameValidationFailureMessages == null)
            model_internal::calculateTnkr_nameIsValid();

        return _tnkr_nameValidationFailureMessages;
    }

    model_internal function set tnkr_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_nameValidationFailureMessages;

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
            model_internal::_tnkr_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_descStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_descValidator() : StyleValidator
    {
        return model_internal::_tnkr_descValidator;
    }

    model_internal function set _tnkr_descIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_descIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_descIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_descIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_descIsValid():Boolean
    {
        if (!model_internal::_tnkr_descIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_descIsValid();
        }

        return model_internal::_tnkr_descIsValid;
    }

    model_internal function calculateTnkr_descIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_descValidator.validate(model_internal::_instance.tnkr_desc)
        model_internal::_tnkr_descIsValid_der = (valRes.results == null);
        model_internal::_tnkr_descIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_descValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_descValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_descValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_descValidationFailureMessages == null)
            model_internal::calculateTnkr_descIsValid();

        return _tnkr_descValidationFailureMessages;
    }

    model_internal function set tnkr_descValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_descValidationFailureMessages;

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
            model_internal::_tnkr_descValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_descValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_carr_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_carr_codeValidator() : StyleValidator
    {
        return model_internal::_tnkr_carr_codeValidator;
    }

    model_internal function set _tnkr_carr_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_carr_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_carr_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_carr_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_carr_codeIsValid():Boolean
    {
        if (!model_internal::_tnkr_carr_codeIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_carr_codeIsValid();
        }

        return model_internal::_tnkr_carr_codeIsValid;
    }

    model_internal function calculateTnkr_carr_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_carr_codeValidator.validate(model_internal::_instance.tnkr_carr_code)
        model_internal::_tnkr_carr_codeIsValid_der = (valRes.results == null);
        model_internal::_tnkr_carr_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_carr_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_carr_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_carr_codeValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_carr_codeValidationFailureMessages == null)
            model_internal::calculateTnkr_carr_codeIsValid();

        return _tnkr_carr_codeValidationFailureMessages;
    }

    model_internal function set tnkr_carr_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_carr_codeValidationFailureMessages;

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
            model_internal::_tnkr_carr_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_carr_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_ownr_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_ownr_codeValidator() : StyleValidator
    {
        return model_internal::_tnkr_ownr_codeValidator;
    }

    model_internal function set _tnkr_ownr_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_ownr_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_ownr_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_ownr_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_ownr_codeIsValid():Boolean
    {
        if (!model_internal::_tnkr_ownr_codeIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_ownr_codeIsValid();
        }

        return model_internal::_tnkr_ownr_codeIsValid;
    }

    model_internal function calculateTnkr_ownr_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_ownr_codeValidator.validate(model_internal::_instance.tnkr_ownr_code)
        model_internal::_tnkr_ownr_codeIsValid_der = (valRes.results == null);
        model_internal::_tnkr_ownr_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_ownr_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_ownr_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_ownr_codeValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_ownr_codeValidationFailureMessages == null)
            model_internal::calculateTnkr_ownr_codeIsValid();

        return _tnkr_ownr_codeValidationFailureMessages;
    }

    model_internal function set tnkr_ownr_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_ownr_codeValidationFailureMessages;

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
            model_internal::_tnkr_ownr_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_ownr_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_codeValidator() : StyleValidator
    {
        return model_internal::_tnkr_codeValidator;
    }

    model_internal function set _tnkr_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_codeIsValid():Boolean
    {
        if (!model_internal::_tnkr_codeIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_codeIsValid();
        }

        return model_internal::_tnkr_codeIsValid;
    }

    model_internal function calculateTnkr_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_codeValidator.validate(model_internal::_instance.tnkr_code)
        model_internal::_tnkr_codeIsValid_der = (valRes.results == null);
        model_internal::_tnkr_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_codeValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_codeValidationFailureMessages == null)
            model_internal::calculateTnkr_codeIsValid();

        return _tnkr_codeValidationFailureMessages;
    }

    model_internal function set tnkr_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_codeValidationFailureMessages;

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
            model_internal::_tnkr_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_carr_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_carr_nameValidator() : StyleValidator
    {
        return model_internal::_tnkr_carr_nameValidator;
    }

    model_internal function set _tnkr_carr_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_carr_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_carr_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_carr_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_carr_nameIsValid():Boolean
    {
        if (!model_internal::_tnkr_carr_nameIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_carr_nameIsValid();
        }

        return model_internal::_tnkr_carr_nameIsValid;
    }

    model_internal function calculateTnkr_carr_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_carr_nameValidator.validate(model_internal::_instance.tnkr_carr_name)
        model_internal::_tnkr_carr_nameIsValid_der = (valRes.results == null);
        model_internal::_tnkr_carr_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_carr_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_carr_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_carr_nameValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_carr_nameValidationFailureMessages == null)
            model_internal::calculateTnkr_carr_nameIsValid();

        return _tnkr_carr_nameValidationFailureMessages;
    }

    model_internal function set tnkr_carr_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_carr_nameValidationFailureMessages;

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
            model_internal::_tnkr_carr_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_carr_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_etyp_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_etyp_idValidator() : StyleValidator
    {
        return model_internal::_tnkr_etyp_idValidator;
    }

    model_internal function set _tnkr_etyp_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_etyp_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_etyp_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_etyp_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_etyp_idIsValid():Boolean
    {
        if (!model_internal::_tnkr_etyp_idIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_etyp_idIsValid();
        }

        return model_internal::_tnkr_etyp_idIsValid;
    }

    model_internal function calculateTnkr_etyp_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_etyp_idValidator.validate(model_internal::_instance.tnkr_etyp_id)
        model_internal::_tnkr_etyp_idIsValid_der = (valRes.results == null);
        model_internal::_tnkr_etyp_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_etyp_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_etyp_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_etyp_idValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_etyp_idValidationFailureMessages == null)
            model_internal::calculateTnkr_etyp_idIsValid();

        return _tnkr_etyp_idValidationFailureMessages;
    }

    model_internal function set tnkr_etyp_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_etyp_idValidationFailureMessages;

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
            model_internal::_tnkr_etyp_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_etyp_idValidationFailureMessages", oldValue, value));
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
            case("tnkr_ownr_name"):
            {
                return tnkr_ownr_nameValidationFailureMessages;
            }
            case("tnkr_etyp_name"):
            {
                return tnkr_etyp_nameValidationFailureMessages;
            }
            case("tnkr_name"):
            {
                return tnkr_nameValidationFailureMessages;
            }
            case("tnkr_desc"):
            {
                return tnkr_descValidationFailureMessages;
            }
            case("tnkr_carr_code"):
            {
                return tnkr_carr_codeValidationFailureMessages;
            }
            case("tnkr_ownr_code"):
            {
                return tnkr_ownr_codeValidationFailureMessages;
            }
            case("tnkr_code"):
            {
                return tnkr_codeValidationFailureMessages;
            }
            case("tnkr_carr_name"):
            {
                return tnkr_carr_nameValidationFailureMessages;
            }
            case("tnkr_etyp_id"):
            {
                return tnkr_etyp_idValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
