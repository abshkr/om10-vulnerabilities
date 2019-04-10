
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
import mx.collections.ArrayCollection;
import mx.events.ValidationResultEvent;
import valueObjects.EquipmentCompartment;
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.valueobjects.IModelType;
import mx.events.PropertyChangeEvent;

use namespace model_internal;

[ExcludeClass]
internal class _EquipmentStructureEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("eqpt_etp", "eqpt_owner", "eqpt_lock", "eqpt_title", "eqpt_code", "eqpt_owner_name", "eqpt_etp_title", "eqpt_name", "compartments", "eqpt_id");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("eqpt_etp", "eqpt_owner", "eqpt_lock", "eqpt_title", "eqpt_code", "eqpt_owner_name", "eqpt_etp_title", "eqpt_name", "compartments", "eqpt_id");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("eqpt_etp", "eqpt_owner", "eqpt_lock", "eqpt_title", "eqpt_code", "eqpt_owner_name", "eqpt_etp_title", "eqpt_name", "compartments", "eqpt_id");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("eqpt_etp", "eqpt_owner", "eqpt_lock", "eqpt_title", "eqpt_code", "eqpt_owner_name", "eqpt_etp_title", "eqpt_name", "compartments", "eqpt_id");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("eqpt_etp", "eqpt_owner", "eqpt_lock", "eqpt_title", "eqpt_code", "eqpt_owner_name", "eqpt_etp_title", "eqpt_name", "compartments", "eqpt_id");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array("compartments");
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "EquipmentStructure";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _eqpt_etpIsValid:Boolean;
    model_internal var _eqpt_etpValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_etpIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_etpValidationFailureMessages:Array;
    
    model_internal var _eqpt_ownerIsValid:Boolean;
    model_internal var _eqpt_ownerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_ownerIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_ownerValidationFailureMessages:Array;
    
    model_internal var _eqpt_lockIsValid:Boolean;
    model_internal var _eqpt_lockValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_lockIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_lockValidationFailureMessages:Array;
    
    model_internal var _eqpt_titleIsValid:Boolean;
    model_internal var _eqpt_titleValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_titleIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_titleValidationFailureMessages:Array;
    
    model_internal var _eqpt_codeIsValid:Boolean;
    model_internal var _eqpt_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_codeValidationFailureMessages:Array;
    
    model_internal var _eqpt_owner_nameIsValid:Boolean;
    model_internal var _eqpt_owner_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_owner_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_owner_nameValidationFailureMessages:Array;
    
    model_internal var _eqpt_etp_titleIsValid:Boolean;
    model_internal var _eqpt_etp_titleValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_etp_titleIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_etp_titleValidationFailureMessages:Array;
    
    model_internal var _eqpt_nameIsValid:Boolean;
    model_internal var _eqpt_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_nameValidationFailureMessages:Array;
    
    model_internal var _compartmentsIsValid:Boolean;
    model_internal var _compartmentsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _compartmentsIsValidCacheInitialized:Boolean = false;
    model_internal var _compartmentsValidationFailureMessages:Array;
    
    model_internal var _eqpt_idIsValid:Boolean;
    model_internal var _eqpt_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_idIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_idValidationFailureMessages:Array;

    model_internal var _instance:_Super_EquipmentStructure;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _EquipmentStructureEntityMetadata(value : _Super_EquipmentStructure)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["eqpt_etp"] = new Array();
            model_internal::dependentsOnMap["eqpt_owner"] = new Array();
            model_internal::dependentsOnMap["eqpt_lock"] = new Array();
            model_internal::dependentsOnMap["eqpt_title"] = new Array();
            model_internal::dependentsOnMap["eqpt_code"] = new Array();
            model_internal::dependentsOnMap["eqpt_owner_name"] = new Array();
            model_internal::dependentsOnMap["eqpt_etp_title"] = new Array();
            model_internal::dependentsOnMap["eqpt_name"] = new Array();
            model_internal::dependentsOnMap["compartments"] = new Array();
            model_internal::dependentsOnMap["eqpt_id"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
            model_internal::collectionBaseMap["compartments"] = "valueObjects.EquipmentCompartment";
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["eqpt_etp"] = "String";
        model_internal::propertyTypeMap["eqpt_owner"] = "String";
        model_internal::propertyTypeMap["eqpt_lock"] = "String";
        model_internal::propertyTypeMap["eqpt_title"] = "String";
        model_internal::propertyTypeMap["eqpt_code"] = "String";
        model_internal::propertyTypeMap["eqpt_owner_name"] = "String";
        model_internal::propertyTypeMap["eqpt_etp_title"] = "String";
        model_internal::propertyTypeMap["eqpt_name"] = "String";
        model_internal::propertyTypeMap["compartments"] = "ArrayCollection";
        model_internal::propertyTypeMap["eqpt_id"] = "String";

        model_internal::_instance = value;
        model_internal::_eqpt_etpValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_etp);
        model_internal::_eqpt_etpValidator.required = true;
        model_internal::_eqpt_etpValidator.requiredFieldError = "eqpt_etp is required";
        //model_internal::_eqpt_etpValidator.source = model_internal::_instance;
        //model_internal::_eqpt_etpValidator.property = "eqpt_etp";
        model_internal::_eqpt_ownerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_owner);
        model_internal::_eqpt_ownerValidator.required = true;
        model_internal::_eqpt_ownerValidator.requiredFieldError = "eqpt_owner is required";
        //model_internal::_eqpt_ownerValidator.source = model_internal::_instance;
        //model_internal::_eqpt_ownerValidator.property = "eqpt_owner";
        model_internal::_eqpt_lockValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_lock);
        model_internal::_eqpt_lockValidator.required = true;
        model_internal::_eqpt_lockValidator.requiredFieldError = "eqpt_lock is required";
        //model_internal::_eqpt_lockValidator.source = model_internal::_instance;
        //model_internal::_eqpt_lockValidator.property = "eqpt_lock";
        model_internal::_eqpt_titleValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_title);
        model_internal::_eqpt_titleValidator.required = true;
        model_internal::_eqpt_titleValidator.requiredFieldError = "eqpt_title is required";
        //model_internal::_eqpt_titleValidator.source = model_internal::_instance;
        //model_internal::_eqpt_titleValidator.property = "eqpt_title";
        model_internal::_eqpt_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_code);
        model_internal::_eqpt_codeValidator.required = true;
        model_internal::_eqpt_codeValidator.requiredFieldError = "eqpt_code is required";
        //model_internal::_eqpt_codeValidator.source = model_internal::_instance;
        //model_internal::_eqpt_codeValidator.property = "eqpt_code";
        model_internal::_eqpt_owner_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_owner_name);
        model_internal::_eqpt_owner_nameValidator.required = true;
        model_internal::_eqpt_owner_nameValidator.requiredFieldError = "eqpt_owner_name is required";
        //model_internal::_eqpt_owner_nameValidator.source = model_internal::_instance;
        //model_internal::_eqpt_owner_nameValidator.property = "eqpt_owner_name";
        model_internal::_eqpt_etp_titleValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_etp_title);
        model_internal::_eqpt_etp_titleValidator.required = true;
        model_internal::_eqpt_etp_titleValidator.requiredFieldError = "eqpt_etp_title is required";
        //model_internal::_eqpt_etp_titleValidator.source = model_internal::_instance;
        //model_internal::_eqpt_etp_titleValidator.property = "eqpt_etp_title";
        model_internal::_eqpt_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_name);
        model_internal::_eqpt_nameValidator.required = true;
        model_internal::_eqpt_nameValidator.requiredFieldError = "eqpt_name is required";
        //model_internal::_eqpt_nameValidator.source = model_internal::_instance;
        //model_internal::_eqpt_nameValidator.property = "eqpt_name";
        model_internal::_compartmentsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCompartments);
        model_internal::_compartmentsValidator.required = true;
        model_internal::_compartmentsValidator.requiredFieldError = "compartments is required";
        //model_internal::_compartmentsValidator.source = model_internal::_instance;
        //model_internal::_compartmentsValidator.property = "compartments";
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
            throw new Error(propertyName + " is not a data property of entity EquipmentStructure");
            
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
            throw new Error(propertyName + " is not a collection property of entity EquipmentStructure");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of EquipmentStructure");

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
            throw new Error(propertyName + " does not exist for entity EquipmentStructure");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity EquipmentStructure");
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
            throw new Error(propertyName + " does not exist for entity EquipmentStructure");
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
    public function get isEqpt_etpAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_ownerAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_lockAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_titleAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_owner_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_etp_titleAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCompartmentsAvailable():Boolean
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
    public function invalidateDependentOnEqpt_etp():void
    {
        if (model_internal::_eqpt_etpIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_etp = null;
            model_internal::calculateEqpt_etpIsValid();
        }
    }
    public function invalidateDependentOnEqpt_owner():void
    {
        if (model_internal::_eqpt_ownerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_owner = null;
            model_internal::calculateEqpt_ownerIsValid();
        }
    }
    public function invalidateDependentOnEqpt_lock():void
    {
        if (model_internal::_eqpt_lockIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_lock = null;
            model_internal::calculateEqpt_lockIsValid();
        }
    }
    public function invalidateDependentOnEqpt_title():void
    {
        if (model_internal::_eqpt_titleIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_title = null;
            model_internal::calculateEqpt_titleIsValid();
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
    public function invalidateDependentOnEqpt_owner_name():void
    {
        if (model_internal::_eqpt_owner_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_owner_name = null;
            model_internal::calculateEqpt_owner_nameIsValid();
        }
    }
    public function invalidateDependentOnEqpt_etp_title():void
    {
        if (model_internal::_eqpt_etp_titleIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_etp_title = null;
            model_internal::calculateEqpt_etp_titleIsValid();
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
    public function invalidateDependentOnCompartments():void
    {
        if (model_internal::_compartmentsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCompartments = null;
            model_internal::calculateCompartmentsIsValid();
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
    public function get eqpt_etpStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_etpValidator() : StyleValidator
    {
        return model_internal::_eqpt_etpValidator;
    }

    model_internal function set _eqpt_etpIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_etpIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_etpIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etpIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etpIsValid():Boolean
    {
        if (!model_internal::_eqpt_etpIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_etpIsValid();
        }

        return model_internal::_eqpt_etpIsValid;
    }

    model_internal function calculateEqpt_etpIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_etpValidator.validate(model_internal::_instance.eqpt_etp)
        model_internal::_eqpt_etpIsValid_der = (valRes.results == null);
        model_internal::_eqpt_etpIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_etpValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_etpValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etpValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_etpValidationFailureMessages == null)
            model_internal::calculateEqpt_etpIsValid();

        return _eqpt_etpValidationFailureMessages;
    }

    model_internal function set eqpt_etpValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_etpValidationFailureMessages;

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
            model_internal::_eqpt_etpValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etpValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_ownerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_ownerValidator() : StyleValidator
    {
        return model_internal::_eqpt_ownerValidator;
    }

    model_internal function set _eqpt_ownerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_ownerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_ownerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_ownerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_ownerIsValid():Boolean
    {
        if (!model_internal::_eqpt_ownerIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_ownerIsValid();
        }

        return model_internal::_eqpt_ownerIsValid;
    }

    model_internal function calculateEqpt_ownerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_ownerValidator.validate(model_internal::_instance.eqpt_owner)
        model_internal::_eqpt_ownerIsValid_der = (valRes.results == null);
        model_internal::_eqpt_ownerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_ownerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_ownerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_ownerValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_ownerValidationFailureMessages == null)
            model_internal::calculateEqpt_ownerIsValid();

        return _eqpt_ownerValidationFailureMessages;
    }

    model_internal function set eqpt_ownerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_ownerValidationFailureMessages;

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
            model_internal::_eqpt_ownerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_ownerValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_lockStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_lockValidator() : StyleValidator
    {
        return model_internal::_eqpt_lockValidator;
    }

    model_internal function set _eqpt_lockIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_lockIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_lockIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_lockIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_lockIsValid():Boolean
    {
        if (!model_internal::_eqpt_lockIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_lockIsValid();
        }

        return model_internal::_eqpt_lockIsValid;
    }

    model_internal function calculateEqpt_lockIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_lockValidator.validate(model_internal::_instance.eqpt_lock)
        model_internal::_eqpt_lockIsValid_der = (valRes.results == null);
        model_internal::_eqpt_lockIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_lockValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_lockValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_lockValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_lockValidationFailureMessages == null)
            model_internal::calculateEqpt_lockIsValid();

        return _eqpt_lockValidationFailureMessages;
    }

    model_internal function set eqpt_lockValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_lockValidationFailureMessages;

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
            model_internal::_eqpt_lockValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_lockValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_titleStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_titleValidator() : StyleValidator
    {
        return model_internal::_eqpt_titleValidator;
    }

    model_internal function set _eqpt_titleIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_titleIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_titleIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_titleIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_titleIsValid():Boolean
    {
        if (!model_internal::_eqpt_titleIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_titleIsValid();
        }

        return model_internal::_eqpt_titleIsValid;
    }

    model_internal function calculateEqpt_titleIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_titleValidator.validate(model_internal::_instance.eqpt_title)
        model_internal::_eqpt_titleIsValid_der = (valRes.results == null);
        model_internal::_eqpt_titleIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_titleValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_titleValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_titleValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_titleValidationFailureMessages == null)
            model_internal::calculateEqpt_titleIsValid();

        return _eqpt_titleValidationFailureMessages;
    }

    model_internal function set eqpt_titleValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_titleValidationFailureMessages;

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
            model_internal::_eqpt_titleValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_titleValidationFailureMessages", oldValue, value));
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
    public function get eqpt_owner_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_owner_nameValidator() : StyleValidator
    {
        return model_internal::_eqpt_owner_nameValidator;
    }

    model_internal function set _eqpt_owner_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_owner_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_owner_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_owner_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_owner_nameIsValid():Boolean
    {
        if (!model_internal::_eqpt_owner_nameIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_owner_nameIsValid();
        }

        return model_internal::_eqpt_owner_nameIsValid;
    }

    model_internal function calculateEqpt_owner_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_owner_nameValidator.validate(model_internal::_instance.eqpt_owner_name)
        model_internal::_eqpt_owner_nameIsValid_der = (valRes.results == null);
        model_internal::_eqpt_owner_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_owner_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_owner_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_owner_nameValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_owner_nameValidationFailureMessages == null)
            model_internal::calculateEqpt_owner_nameIsValid();

        return _eqpt_owner_nameValidationFailureMessages;
    }

    model_internal function set eqpt_owner_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_owner_nameValidationFailureMessages;

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
            model_internal::_eqpt_owner_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_owner_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_etp_titleStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_etp_titleValidator() : StyleValidator
    {
        return model_internal::_eqpt_etp_titleValidator;
    }

    model_internal function set _eqpt_etp_titleIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_etp_titleIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_etp_titleIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etp_titleIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etp_titleIsValid():Boolean
    {
        if (!model_internal::_eqpt_etp_titleIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_etp_titleIsValid();
        }

        return model_internal::_eqpt_etp_titleIsValid;
    }

    model_internal function calculateEqpt_etp_titleIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_etp_titleValidator.validate(model_internal::_instance.eqpt_etp_title)
        model_internal::_eqpt_etp_titleIsValid_der = (valRes.results == null);
        model_internal::_eqpt_etp_titleIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_etp_titleValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_etp_titleValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_etp_titleValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_etp_titleValidationFailureMessages == null)
            model_internal::calculateEqpt_etp_titleIsValid();

        return _eqpt_etp_titleValidationFailureMessages;
    }

    model_internal function set eqpt_etp_titleValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_etp_titleValidationFailureMessages;

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
            model_internal::_eqpt_etp_titleValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_etp_titleValidationFailureMessages", oldValue, value));
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
    public function get compartmentsStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get compartmentsValidator() : StyleValidator
    {
        return model_internal::_compartmentsValidator;
    }

    model_internal function set _compartmentsIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_compartmentsIsValid;         
        if (oldValue !== value)
        {
            model_internal::_compartmentsIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "compartmentsIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get compartmentsIsValid():Boolean
    {
        if (!model_internal::_compartmentsIsValidCacheInitialized)
        {
            model_internal::calculateCompartmentsIsValid();
        }

        return model_internal::_compartmentsIsValid;
    }

    model_internal function calculateCompartmentsIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_compartmentsValidator.validate(model_internal::_instance.compartments)
        model_internal::_compartmentsIsValid_der = (valRes.results == null);
        model_internal::_compartmentsIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::compartmentsValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::compartmentsValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get compartmentsValidationFailureMessages():Array
    {
        if (model_internal::_compartmentsValidationFailureMessages == null)
            model_internal::calculateCompartmentsIsValid();

        return _compartmentsValidationFailureMessages;
    }

    model_internal function set compartmentsValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_compartmentsValidationFailureMessages;

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
            model_internal::_compartmentsValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "compartmentsValidationFailureMessages", oldValue, value));
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
            case("eqpt_etp"):
            {
                return eqpt_etpValidationFailureMessages;
            }
            case("eqpt_owner"):
            {
                return eqpt_ownerValidationFailureMessages;
            }
            case("eqpt_lock"):
            {
                return eqpt_lockValidationFailureMessages;
            }
            case("eqpt_title"):
            {
                return eqpt_titleValidationFailureMessages;
            }
            case("eqpt_code"):
            {
                return eqpt_codeValidationFailureMessages;
            }
            case("eqpt_owner_name"):
            {
                return eqpt_owner_nameValidationFailureMessages;
            }
            case("eqpt_etp_title"):
            {
                return eqpt_etp_titleValidationFailureMessages;
            }
            case("eqpt_name"):
            {
                return eqpt_nameValidationFailureMessages;
            }
            case("compartments"):
            {
                return compartmentsValidationFailureMessages;
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
