
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
internal class _KeyTripLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("trip_carrier", "load_operator", "trip_owner", "trip_no", "trip_supplier", "load_terminal", "trip_status", "load_number", "load_id", "trip_tanker");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("trip_carrier", "load_operator", "trip_owner", "trip_no", "trip_supplier", "load_terminal", "trip_status", "load_number", "load_id", "trip_tanker");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("trip_carrier", "load_operator", "trip_owner", "trip_no", "trip_supplier", "load_terminal", "trip_status", "load_number", "load_id", "trip_tanker");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("trip_carrier", "load_operator", "trip_owner", "trip_no", "trip_supplier", "load_terminal", "trip_status", "load_number", "load_id", "trip_tanker");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("trip_carrier", "load_operator", "trip_owner", "trip_no", "trip_supplier", "load_terminal", "trip_status", "load_number", "load_id", "trip_tanker");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "KeyTripLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _trip_carrierIsValid:Boolean;
    model_internal var _trip_carrierValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trip_carrierIsValidCacheInitialized:Boolean = false;
    model_internal var _trip_carrierValidationFailureMessages:Array;
    
    model_internal var _load_operatorIsValid:Boolean;
    model_internal var _load_operatorValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _load_operatorIsValidCacheInitialized:Boolean = false;
    model_internal var _load_operatorValidationFailureMessages:Array;
    
    model_internal var _trip_ownerIsValid:Boolean;
    model_internal var _trip_ownerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trip_ownerIsValidCacheInitialized:Boolean = false;
    model_internal var _trip_ownerValidationFailureMessages:Array;
    
    model_internal var _trip_noIsValid:Boolean;
    model_internal var _trip_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trip_noIsValidCacheInitialized:Boolean = false;
    model_internal var _trip_noValidationFailureMessages:Array;
    
    model_internal var _trip_supplierIsValid:Boolean;
    model_internal var _trip_supplierValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trip_supplierIsValidCacheInitialized:Boolean = false;
    model_internal var _trip_supplierValidationFailureMessages:Array;
    
    model_internal var _load_terminalIsValid:Boolean;
    model_internal var _load_terminalValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _load_terminalIsValidCacheInitialized:Boolean = false;
    model_internal var _load_terminalValidationFailureMessages:Array;
    
    model_internal var _trip_statusIsValid:Boolean;
    model_internal var _trip_statusValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trip_statusIsValidCacheInitialized:Boolean = false;
    model_internal var _trip_statusValidationFailureMessages:Array;
    
    model_internal var _load_numberIsValid:Boolean;
    model_internal var _load_numberValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _load_numberIsValidCacheInitialized:Boolean = false;
    model_internal var _load_numberValidationFailureMessages:Array;
    
    model_internal var _load_idIsValid:Boolean;
    model_internal var _load_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _load_idIsValidCacheInitialized:Boolean = false;
    model_internal var _load_idValidationFailureMessages:Array;
    
    model_internal var _trip_tankerIsValid:Boolean;
    model_internal var _trip_tankerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trip_tankerIsValidCacheInitialized:Boolean = false;
    model_internal var _trip_tankerValidationFailureMessages:Array;

    model_internal var _instance:_Super_KeyTripLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _KeyTripLookupEntityMetadata(value : _Super_KeyTripLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["trip_carrier"] = new Array();
            model_internal::dependentsOnMap["load_operator"] = new Array();
            model_internal::dependentsOnMap["trip_owner"] = new Array();
            model_internal::dependentsOnMap["trip_no"] = new Array();
            model_internal::dependentsOnMap["trip_supplier"] = new Array();
            model_internal::dependentsOnMap["load_terminal"] = new Array();
            model_internal::dependentsOnMap["trip_status"] = new Array();
            model_internal::dependentsOnMap["load_number"] = new Array();
            model_internal::dependentsOnMap["load_id"] = new Array();
            model_internal::dependentsOnMap["trip_tanker"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["trip_carrier"] = "String";
        model_internal::propertyTypeMap["load_operator"] = "String";
        model_internal::propertyTypeMap["trip_owner"] = "String";
        model_internal::propertyTypeMap["trip_no"] = "String";
        model_internal::propertyTypeMap["trip_supplier"] = "String";
        model_internal::propertyTypeMap["load_terminal"] = "String";
        model_internal::propertyTypeMap["trip_status"] = "String";
        model_internal::propertyTypeMap["load_number"] = "String";
        model_internal::propertyTypeMap["load_id"] = "String";
        model_internal::propertyTypeMap["trip_tanker"] = "String";

        model_internal::_instance = value;
        model_internal::_trip_carrierValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrip_carrier);
        model_internal::_trip_carrierValidator.required = true;
        model_internal::_trip_carrierValidator.requiredFieldError = "trip_carrier is required";
        //model_internal::_trip_carrierValidator.source = model_internal::_instance;
        //model_internal::_trip_carrierValidator.property = "trip_carrier";
        model_internal::_load_operatorValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForLoad_operator);
        model_internal::_load_operatorValidator.required = true;
        model_internal::_load_operatorValidator.requiredFieldError = "load_operator is required";
        //model_internal::_load_operatorValidator.source = model_internal::_instance;
        //model_internal::_load_operatorValidator.property = "load_operator";
        model_internal::_trip_ownerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrip_owner);
        model_internal::_trip_ownerValidator.required = true;
        model_internal::_trip_ownerValidator.requiredFieldError = "trip_owner is required";
        //model_internal::_trip_ownerValidator.source = model_internal::_instance;
        //model_internal::_trip_ownerValidator.property = "trip_owner";
        model_internal::_trip_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrip_no);
        model_internal::_trip_noValidator.required = true;
        model_internal::_trip_noValidator.requiredFieldError = "trip_no is required";
        //model_internal::_trip_noValidator.source = model_internal::_instance;
        //model_internal::_trip_noValidator.property = "trip_no";
        model_internal::_trip_supplierValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrip_supplier);
        model_internal::_trip_supplierValidator.required = true;
        model_internal::_trip_supplierValidator.requiredFieldError = "trip_supplier is required";
        //model_internal::_trip_supplierValidator.source = model_internal::_instance;
        //model_internal::_trip_supplierValidator.property = "trip_supplier";
        model_internal::_load_terminalValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForLoad_terminal);
        model_internal::_load_terminalValidator.required = true;
        model_internal::_load_terminalValidator.requiredFieldError = "load_terminal is required";
        //model_internal::_load_terminalValidator.source = model_internal::_instance;
        //model_internal::_load_terminalValidator.property = "load_terminal";
        model_internal::_trip_statusValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrip_status);
        model_internal::_trip_statusValidator.required = true;
        model_internal::_trip_statusValidator.requiredFieldError = "trip_status is required";
        //model_internal::_trip_statusValidator.source = model_internal::_instance;
        //model_internal::_trip_statusValidator.property = "trip_status";
        model_internal::_load_numberValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForLoad_number);
        model_internal::_load_numberValidator.required = true;
        model_internal::_load_numberValidator.requiredFieldError = "load_number is required";
        //model_internal::_load_numberValidator.source = model_internal::_instance;
        //model_internal::_load_numberValidator.property = "load_number";
        model_internal::_load_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForLoad_id);
        model_internal::_load_idValidator.required = true;
        model_internal::_load_idValidator.requiredFieldError = "load_id is required";
        //model_internal::_load_idValidator.source = model_internal::_instance;
        //model_internal::_load_idValidator.property = "load_id";
        model_internal::_trip_tankerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrip_tanker);
        model_internal::_trip_tankerValidator.required = true;
        model_internal::_trip_tankerValidator.requiredFieldError = "trip_tanker is required";
        //model_internal::_trip_tankerValidator.source = model_internal::_instance;
        //model_internal::_trip_tankerValidator.property = "trip_tanker";
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
            throw new Error(propertyName + " is not a data property of entity KeyTripLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity KeyTripLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of KeyTripLookup");

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
            throw new Error(propertyName + " does not exist for entity KeyTripLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity KeyTripLookup");
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
            throw new Error(propertyName + " does not exist for entity KeyTripLookup");
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
    public function get isTrip_carrierAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isLoad_operatorAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrip_ownerAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrip_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrip_supplierAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isLoad_terminalAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrip_statusAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isLoad_numberAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isLoad_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrip_tankerAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnTrip_carrier():void
    {
        if (model_internal::_trip_carrierIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrip_carrier = null;
            model_internal::calculateTrip_carrierIsValid();
        }
    }
    public function invalidateDependentOnLoad_operator():void
    {
        if (model_internal::_load_operatorIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfLoad_operator = null;
            model_internal::calculateLoad_operatorIsValid();
        }
    }
    public function invalidateDependentOnTrip_owner():void
    {
        if (model_internal::_trip_ownerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrip_owner = null;
            model_internal::calculateTrip_ownerIsValid();
        }
    }
    public function invalidateDependentOnTrip_no():void
    {
        if (model_internal::_trip_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrip_no = null;
            model_internal::calculateTrip_noIsValid();
        }
    }
    public function invalidateDependentOnTrip_supplier():void
    {
        if (model_internal::_trip_supplierIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrip_supplier = null;
            model_internal::calculateTrip_supplierIsValid();
        }
    }
    public function invalidateDependentOnLoad_terminal():void
    {
        if (model_internal::_load_terminalIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfLoad_terminal = null;
            model_internal::calculateLoad_terminalIsValid();
        }
    }
    public function invalidateDependentOnTrip_status():void
    {
        if (model_internal::_trip_statusIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrip_status = null;
            model_internal::calculateTrip_statusIsValid();
        }
    }
    public function invalidateDependentOnLoad_number():void
    {
        if (model_internal::_load_numberIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfLoad_number = null;
            model_internal::calculateLoad_numberIsValid();
        }
    }
    public function invalidateDependentOnLoad_id():void
    {
        if (model_internal::_load_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfLoad_id = null;
            model_internal::calculateLoad_idIsValid();
        }
    }
    public function invalidateDependentOnTrip_tanker():void
    {
        if (model_internal::_trip_tankerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrip_tanker = null;
            model_internal::calculateTrip_tankerIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get trip_carrierStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trip_carrierValidator() : StyleValidator
    {
        return model_internal::_trip_carrierValidator;
    }

    model_internal function set _trip_carrierIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trip_carrierIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trip_carrierIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_carrierIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trip_carrierIsValid():Boolean
    {
        if (!model_internal::_trip_carrierIsValidCacheInitialized)
        {
            model_internal::calculateTrip_carrierIsValid();
        }

        return model_internal::_trip_carrierIsValid;
    }

    model_internal function calculateTrip_carrierIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trip_carrierValidator.validate(model_internal::_instance.trip_carrier)
        model_internal::_trip_carrierIsValid_der = (valRes.results == null);
        model_internal::_trip_carrierIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trip_carrierValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trip_carrierValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trip_carrierValidationFailureMessages():Array
    {
        if (model_internal::_trip_carrierValidationFailureMessages == null)
            model_internal::calculateTrip_carrierIsValid();

        return _trip_carrierValidationFailureMessages;
    }

    model_internal function set trip_carrierValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trip_carrierValidationFailureMessages;

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
            model_internal::_trip_carrierValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_carrierValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get load_operatorStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get load_operatorValidator() : StyleValidator
    {
        return model_internal::_load_operatorValidator;
    }

    model_internal function set _load_operatorIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_load_operatorIsValid;         
        if (oldValue !== value)
        {
            model_internal::_load_operatorIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_operatorIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get load_operatorIsValid():Boolean
    {
        if (!model_internal::_load_operatorIsValidCacheInitialized)
        {
            model_internal::calculateLoad_operatorIsValid();
        }

        return model_internal::_load_operatorIsValid;
    }

    model_internal function calculateLoad_operatorIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_load_operatorValidator.validate(model_internal::_instance.load_operator)
        model_internal::_load_operatorIsValid_der = (valRes.results == null);
        model_internal::_load_operatorIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::load_operatorValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::load_operatorValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get load_operatorValidationFailureMessages():Array
    {
        if (model_internal::_load_operatorValidationFailureMessages == null)
            model_internal::calculateLoad_operatorIsValid();

        return _load_operatorValidationFailureMessages;
    }

    model_internal function set load_operatorValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_load_operatorValidationFailureMessages;

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
            model_internal::_load_operatorValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_operatorValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trip_ownerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trip_ownerValidator() : StyleValidator
    {
        return model_internal::_trip_ownerValidator;
    }

    model_internal function set _trip_ownerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trip_ownerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trip_ownerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_ownerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trip_ownerIsValid():Boolean
    {
        if (!model_internal::_trip_ownerIsValidCacheInitialized)
        {
            model_internal::calculateTrip_ownerIsValid();
        }

        return model_internal::_trip_ownerIsValid;
    }

    model_internal function calculateTrip_ownerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trip_ownerValidator.validate(model_internal::_instance.trip_owner)
        model_internal::_trip_ownerIsValid_der = (valRes.results == null);
        model_internal::_trip_ownerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trip_ownerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trip_ownerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trip_ownerValidationFailureMessages():Array
    {
        if (model_internal::_trip_ownerValidationFailureMessages == null)
            model_internal::calculateTrip_ownerIsValid();

        return _trip_ownerValidationFailureMessages;
    }

    model_internal function set trip_ownerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trip_ownerValidationFailureMessages;

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
            model_internal::_trip_ownerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_ownerValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trip_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trip_noValidator() : StyleValidator
    {
        return model_internal::_trip_noValidator;
    }

    model_internal function set _trip_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trip_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trip_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trip_noIsValid():Boolean
    {
        if (!model_internal::_trip_noIsValidCacheInitialized)
        {
            model_internal::calculateTrip_noIsValid();
        }

        return model_internal::_trip_noIsValid;
    }

    model_internal function calculateTrip_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trip_noValidator.validate(model_internal::_instance.trip_no)
        model_internal::_trip_noIsValid_der = (valRes.results == null);
        model_internal::_trip_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trip_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trip_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trip_noValidationFailureMessages():Array
    {
        if (model_internal::_trip_noValidationFailureMessages == null)
            model_internal::calculateTrip_noIsValid();

        return _trip_noValidationFailureMessages;
    }

    model_internal function set trip_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trip_noValidationFailureMessages;

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
            model_internal::_trip_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trip_supplierStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trip_supplierValidator() : StyleValidator
    {
        return model_internal::_trip_supplierValidator;
    }

    model_internal function set _trip_supplierIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trip_supplierIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trip_supplierIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_supplierIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trip_supplierIsValid():Boolean
    {
        if (!model_internal::_trip_supplierIsValidCacheInitialized)
        {
            model_internal::calculateTrip_supplierIsValid();
        }

        return model_internal::_trip_supplierIsValid;
    }

    model_internal function calculateTrip_supplierIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trip_supplierValidator.validate(model_internal::_instance.trip_supplier)
        model_internal::_trip_supplierIsValid_der = (valRes.results == null);
        model_internal::_trip_supplierIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trip_supplierValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trip_supplierValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trip_supplierValidationFailureMessages():Array
    {
        if (model_internal::_trip_supplierValidationFailureMessages == null)
            model_internal::calculateTrip_supplierIsValid();

        return _trip_supplierValidationFailureMessages;
    }

    model_internal function set trip_supplierValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trip_supplierValidationFailureMessages;

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
            model_internal::_trip_supplierValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_supplierValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get load_terminalStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get load_terminalValidator() : StyleValidator
    {
        return model_internal::_load_terminalValidator;
    }

    model_internal function set _load_terminalIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_load_terminalIsValid;         
        if (oldValue !== value)
        {
            model_internal::_load_terminalIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_terminalIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get load_terminalIsValid():Boolean
    {
        if (!model_internal::_load_terminalIsValidCacheInitialized)
        {
            model_internal::calculateLoad_terminalIsValid();
        }

        return model_internal::_load_terminalIsValid;
    }

    model_internal function calculateLoad_terminalIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_load_terminalValidator.validate(model_internal::_instance.load_terminal)
        model_internal::_load_terminalIsValid_der = (valRes.results == null);
        model_internal::_load_terminalIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::load_terminalValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::load_terminalValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get load_terminalValidationFailureMessages():Array
    {
        if (model_internal::_load_terminalValidationFailureMessages == null)
            model_internal::calculateLoad_terminalIsValid();

        return _load_terminalValidationFailureMessages;
    }

    model_internal function set load_terminalValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_load_terminalValidationFailureMessages;

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
            model_internal::_load_terminalValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_terminalValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trip_statusStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trip_statusValidator() : StyleValidator
    {
        return model_internal::_trip_statusValidator;
    }

    model_internal function set _trip_statusIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trip_statusIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trip_statusIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_statusIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trip_statusIsValid():Boolean
    {
        if (!model_internal::_trip_statusIsValidCacheInitialized)
        {
            model_internal::calculateTrip_statusIsValid();
        }

        return model_internal::_trip_statusIsValid;
    }

    model_internal function calculateTrip_statusIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trip_statusValidator.validate(model_internal::_instance.trip_status)
        model_internal::_trip_statusIsValid_der = (valRes.results == null);
        model_internal::_trip_statusIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trip_statusValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trip_statusValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trip_statusValidationFailureMessages():Array
    {
        if (model_internal::_trip_statusValidationFailureMessages == null)
            model_internal::calculateTrip_statusIsValid();

        return _trip_statusValidationFailureMessages;
    }

    model_internal function set trip_statusValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trip_statusValidationFailureMessages;

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
            model_internal::_trip_statusValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_statusValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get load_numberStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get load_numberValidator() : StyleValidator
    {
        return model_internal::_load_numberValidator;
    }

    model_internal function set _load_numberIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_load_numberIsValid;         
        if (oldValue !== value)
        {
            model_internal::_load_numberIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_numberIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get load_numberIsValid():Boolean
    {
        if (!model_internal::_load_numberIsValidCacheInitialized)
        {
            model_internal::calculateLoad_numberIsValid();
        }

        return model_internal::_load_numberIsValid;
    }

    model_internal function calculateLoad_numberIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_load_numberValidator.validate(model_internal::_instance.load_number)
        model_internal::_load_numberIsValid_der = (valRes.results == null);
        model_internal::_load_numberIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::load_numberValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::load_numberValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get load_numberValidationFailureMessages():Array
    {
        if (model_internal::_load_numberValidationFailureMessages == null)
            model_internal::calculateLoad_numberIsValid();

        return _load_numberValidationFailureMessages;
    }

    model_internal function set load_numberValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_load_numberValidationFailureMessages;

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
            model_internal::_load_numberValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_numberValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get load_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get load_idValidator() : StyleValidator
    {
        return model_internal::_load_idValidator;
    }

    model_internal function set _load_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_load_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_load_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get load_idIsValid():Boolean
    {
        if (!model_internal::_load_idIsValidCacheInitialized)
        {
            model_internal::calculateLoad_idIsValid();
        }

        return model_internal::_load_idIsValid;
    }

    model_internal function calculateLoad_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_load_idValidator.validate(model_internal::_instance.load_id)
        model_internal::_load_idIsValid_der = (valRes.results == null);
        model_internal::_load_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::load_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::load_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get load_idValidationFailureMessages():Array
    {
        if (model_internal::_load_idValidationFailureMessages == null)
            model_internal::calculateLoad_idIsValid();

        return _load_idValidationFailureMessages;
    }

    model_internal function set load_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_load_idValidationFailureMessages;

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
            model_internal::_load_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trip_tankerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trip_tankerValidator() : StyleValidator
    {
        return model_internal::_trip_tankerValidator;
    }

    model_internal function set _trip_tankerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trip_tankerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trip_tankerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_tankerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trip_tankerIsValid():Boolean
    {
        if (!model_internal::_trip_tankerIsValidCacheInitialized)
        {
            model_internal::calculateTrip_tankerIsValid();
        }

        return model_internal::_trip_tankerIsValid;
    }

    model_internal function calculateTrip_tankerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trip_tankerValidator.validate(model_internal::_instance.trip_tanker)
        model_internal::_trip_tankerIsValid_der = (valRes.results == null);
        model_internal::_trip_tankerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trip_tankerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trip_tankerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trip_tankerValidationFailureMessages():Array
    {
        if (model_internal::_trip_tankerValidationFailureMessages == null)
            model_internal::calculateTrip_tankerIsValid();

        return _trip_tankerValidationFailureMessages;
    }

    model_internal function set trip_tankerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trip_tankerValidationFailureMessages;

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
            model_internal::_trip_tankerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trip_tankerValidationFailureMessages", oldValue, value));
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
            case("trip_carrier"):
            {
                return trip_carrierValidationFailureMessages;
            }
            case("load_operator"):
            {
                return load_operatorValidationFailureMessages;
            }
            case("trip_owner"):
            {
                return trip_ownerValidationFailureMessages;
            }
            case("trip_no"):
            {
                return trip_noValidationFailureMessages;
            }
            case("trip_supplier"):
            {
                return trip_supplierValidationFailureMessages;
            }
            case("load_terminal"):
            {
                return load_terminalValidationFailureMessages;
            }
            case("trip_status"):
            {
                return trip_statusValidationFailureMessages;
            }
            case("load_number"):
            {
                return load_numberValidationFailureMessages;
            }
            case("load_id"):
            {
                return load_idValidationFailureMessages;
            }
            case("trip_tanker"):
            {
                return trip_tankerValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
