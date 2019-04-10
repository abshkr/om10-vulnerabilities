
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
internal class _TankersLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("equipment_name", "tnkr_eqpt_name", "tnkr_code", "carrier_name", "tnkr_carrier_name");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("equipment_name", "tnkr_eqpt_name", "tnkr_code", "carrier_name", "tnkr_carrier_name");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("equipment_name", "tnkr_eqpt_name", "tnkr_code", "carrier_name", "tnkr_carrier_name");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("equipment_name", "tnkr_eqpt_name", "tnkr_code", "carrier_name", "tnkr_carrier_name");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("equipment_name", "tnkr_eqpt_name", "tnkr_code", "carrier_name", "tnkr_carrier_name");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "TankersLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _equipment_nameIsValid:Boolean;
    model_internal var _equipment_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _equipment_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _equipment_nameValidationFailureMessages:Array;
    
    model_internal var _tnkr_eqpt_nameIsValid:Boolean;
    model_internal var _tnkr_eqpt_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_eqpt_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_eqpt_nameValidationFailureMessages:Array;
    
    model_internal var _tnkr_codeIsValid:Boolean;
    model_internal var _tnkr_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_codeValidationFailureMessages:Array;
    
    model_internal var _carrier_nameIsValid:Boolean;
    model_internal var _carrier_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _carrier_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _carrier_nameValidationFailureMessages:Array;
    
    model_internal var _tnkr_carrier_nameIsValid:Boolean;
    model_internal var _tnkr_carrier_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_carrier_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_carrier_nameValidationFailureMessages:Array;

    model_internal var _instance:_Super_TankersLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _TankersLookupEntityMetadata(value : _Super_TankersLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["equipment_name"] = new Array();
            model_internal::dependentsOnMap["tnkr_eqpt_name"] = new Array();
            model_internal::dependentsOnMap["tnkr_code"] = new Array();
            model_internal::dependentsOnMap["carrier_name"] = new Array();
            model_internal::dependentsOnMap["tnkr_carrier_name"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["equipment_name"] = "Object";
        model_internal::propertyTypeMap["tnkr_eqpt_name"] = "String";
        model_internal::propertyTypeMap["tnkr_code"] = "String";
        model_internal::propertyTypeMap["carrier_name"] = "Object";
        model_internal::propertyTypeMap["tnkr_carrier_name"] = "String";

        model_internal::_instance = value;
        model_internal::_equipment_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEquipment_name);
        model_internal::_equipment_nameValidator.required = true;
        model_internal::_equipment_nameValidator.requiredFieldError = "equipment_name is required";
        //model_internal::_equipment_nameValidator.source = model_internal::_instance;
        //model_internal::_equipment_nameValidator.property = "equipment_name";
        model_internal::_tnkr_eqpt_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_eqpt_name);
        model_internal::_tnkr_eqpt_nameValidator.required = true;
        model_internal::_tnkr_eqpt_nameValidator.requiredFieldError = "tnkr_eqpt_name is required";
        //model_internal::_tnkr_eqpt_nameValidator.source = model_internal::_instance;
        //model_internal::_tnkr_eqpt_nameValidator.property = "tnkr_eqpt_name";
        model_internal::_tnkr_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_code);
        model_internal::_tnkr_codeValidator.required = true;
        model_internal::_tnkr_codeValidator.requiredFieldError = "tnkr_code is required";
        //model_internal::_tnkr_codeValidator.source = model_internal::_instance;
        //model_internal::_tnkr_codeValidator.property = "tnkr_code";
        model_internal::_carrier_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCarrier_name);
        model_internal::_carrier_nameValidator.required = true;
        model_internal::_carrier_nameValidator.requiredFieldError = "carrier_name is required";
        //model_internal::_carrier_nameValidator.source = model_internal::_instance;
        //model_internal::_carrier_nameValidator.property = "carrier_name";
        model_internal::_tnkr_carrier_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_carrier_name);
        model_internal::_tnkr_carrier_nameValidator.required = true;
        model_internal::_tnkr_carrier_nameValidator.requiredFieldError = "tnkr_carrier_name is required";
        //model_internal::_tnkr_carrier_nameValidator.source = model_internal::_instance;
        //model_internal::_tnkr_carrier_nameValidator.property = "tnkr_carrier_name";
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
            throw new Error(propertyName + " is not a data property of entity TankersLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity TankersLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of TankersLookup");

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
            throw new Error(propertyName + " does not exist for entity TankersLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity TankersLookup");
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
            throw new Error(propertyName + " does not exist for entity TankersLookup");
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
    public function get isEquipment_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_eqpt_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCarrier_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_carrier_nameAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnEquipment_name():void
    {
        if (model_internal::_equipment_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEquipment_name = null;
            model_internal::calculateEquipment_nameIsValid();
        }
    }
    public function invalidateDependentOnTnkr_eqpt_name():void
    {
        if (model_internal::_tnkr_eqpt_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_eqpt_name = null;
            model_internal::calculateTnkr_eqpt_nameIsValid();
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
    public function invalidateDependentOnCarrier_name():void
    {
        if (model_internal::_carrier_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCarrier_name = null;
            model_internal::calculateCarrier_nameIsValid();
        }
    }
    public function invalidateDependentOnTnkr_carrier_name():void
    {
        if (model_internal::_tnkr_carrier_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_carrier_name = null;
            model_internal::calculateTnkr_carrier_nameIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get equipment_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get equipment_nameValidator() : StyleValidator
    {
        return model_internal::_equipment_nameValidator;
    }

    model_internal function set _equipment_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_equipment_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_equipment_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "equipment_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get equipment_nameIsValid():Boolean
    {
        if (!model_internal::_equipment_nameIsValidCacheInitialized)
        {
            model_internal::calculateEquipment_nameIsValid();
        }

        return model_internal::_equipment_nameIsValid;
    }

    model_internal function calculateEquipment_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_equipment_nameValidator.validate(model_internal::_instance.equipment_name)
        model_internal::_equipment_nameIsValid_der = (valRes.results == null);
        model_internal::_equipment_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::equipment_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::equipment_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get equipment_nameValidationFailureMessages():Array
    {
        if (model_internal::_equipment_nameValidationFailureMessages == null)
            model_internal::calculateEquipment_nameIsValid();

        return _equipment_nameValidationFailureMessages;
    }

    model_internal function set equipment_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_equipment_nameValidationFailureMessages;

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
            model_internal::_equipment_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "equipment_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_eqpt_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_eqpt_nameValidator() : StyleValidator
    {
        return model_internal::_tnkr_eqpt_nameValidator;
    }

    model_internal function set _tnkr_eqpt_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_eqpt_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_eqpt_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_eqpt_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_eqpt_nameIsValid():Boolean
    {
        if (!model_internal::_tnkr_eqpt_nameIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_eqpt_nameIsValid();
        }

        return model_internal::_tnkr_eqpt_nameIsValid;
    }

    model_internal function calculateTnkr_eqpt_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_eqpt_nameValidator.validate(model_internal::_instance.tnkr_eqpt_name)
        model_internal::_tnkr_eqpt_nameIsValid_der = (valRes.results == null);
        model_internal::_tnkr_eqpt_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_eqpt_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_eqpt_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_eqpt_nameValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_eqpt_nameValidationFailureMessages == null)
            model_internal::calculateTnkr_eqpt_nameIsValid();

        return _tnkr_eqpt_nameValidationFailureMessages;
    }

    model_internal function set tnkr_eqpt_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_eqpt_nameValidationFailureMessages;

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
            model_internal::_tnkr_eqpt_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_eqpt_nameValidationFailureMessages", oldValue, value));
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
    public function get carrier_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get carrier_nameValidator() : StyleValidator
    {
        return model_internal::_carrier_nameValidator;
    }

    model_internal function set _carrier_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_carrier_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_carrier_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "carrier_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get carrier_nameIsValid():Boolean
    {
        if (!model_internal::_carrier_nameIsValidCacheInitialized)
        {
            model_internal::calculateCarrier_nameIsValid();
        }

        return model_internal::_carrier_nameIsValid;
    }

    model_internal function calculateCarrier_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_carrier_nameValidator.validate(model_internal::_instance.carrier_name)
        model_internal::_carrier_nameIsValid_der = (valRes.results == null);
        model_internal::_carrier_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::carrier_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::carrier_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get carrier_nameValidationFailureMessages():Array
    {
        if (model_internal::_carrier_nameValidationFailureMessages == null)
            model_internal::calculateCarrier_nameIsValid();

        return _carrier_nameValidationFailureMessages;
    }

    model_internal function set carrier_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_carrier_nameValidationFailureMessages;

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
            model_internal::_carrier_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "carrier_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tnkr_carrier_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_carrier_nameValidator() : StyleValidator
    {
        return model_internal::_tnkr_carrier_nameValidator;
    }

    model_internal function set _tnkr_carrier_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_carrier_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_carrier_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_carrier_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_carrier_nameIsValid():Boolean
    {
        if (!model_internal::_tnkr_carrier_nameIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_carrier_nameIsValid();
        }

        return model_internal::_tnkr_carrier_nameIsValid;
    }

    model_internal function calculateTnkr_carrier_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_carrier_nameValidator.validate(model_internal::_instance.tnkr_carrier_name)
        model_internal::_tnkr_carrier_nameIsValid_der = (valRes.results == null);
        model_internal::_tnkr_carrier_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_carrier_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_carrier_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_carrier_nameValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_carrier_nameValidationFailureMessages == null)
            model_internal::calculateTnkr_carrier_nameIsValid();

        return _tnkr_carrier_nameValidationFailureMessages;
    }

    model_internal function set tnkr_carrier_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_carrier_nameValidationFailureMessages;

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
            model_internal::_tnkr_carrier_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_carrier_nameValidationFailureMessages", oldValue, value));
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
            case("equipment_name"):
            {
                return equipment_nameValidationFailureMessages;
            }
            case("tnkr_eqpt_name"):
            {
                return tnkr_eqpt_nameValidationFailureMessages;
            }
            case("tnkr_code"):
            {
                return tnkr_codeValidationFailureMessages;
            }
            case("carrier_name"):
            {
                return carrier_nameValidationFailureMessages;
            }
            case("tnkr_carrier_name"):
            {
                return tnkr_carrier_nameValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
