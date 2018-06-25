
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
internal class _OrderScheduleLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("schd_status", "schd_carrier", "schd_trip_no", "schd_tanker", "schd_supp_code", "schd_carr_code", "schd_supplier", "schd_status_code", "schd_date", "schd_tnkr_code", "schd_order_id");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("schd_status", "schd_carrier", "schd_trip_no", "schd_tanker", "schd_supp_code", "schd_carr_code", "schd_supplier", "schd_status_code", "schd_date", "schd_tnkr_code", "schd_order_id");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("schd_status", "schd_carrier", "schd_trip_no", "schd_tanker", "schd_supp_code", "schd_carr_code", "schd_supplier", "schd_status_code", "schd_date", "schd_tnkr_code", "schd_order_id");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("schd_status", "schd_carrier", "schd_trip_no", "schd_tanker", "schd_supp_code", "schd_carr_code", "schd_supplier", "schd_status_code", "schd_date", "schd_tnkr_code", "schd_order_id");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("schd_status", "schd_carrier", "schd_trip_no", "schd_tanker", "schd_supp_code", "schd_carr_code", "schd_supplier", "schd_status_code", "schd_date", "schd_tnkr_code", "schd_order_id");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "OrderScheduleLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _schd_statusIsValid:Boolean;
    model_internal var _schd_statusValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_statusIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_statusValidationFailureMessages:Array;
    
    model_internal var _schd_carrierIsValid:Boolean;
    model_internal var _schd_carrierValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_carrierIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_carrierValidationFailureMessages:Array;
    
    model_internal var _schd_trip_noIsValid:Boolean;
    model_internal var _schd_trip_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_trip_noIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_trip_noValidationFailureMessages:Array;
    
    model_internal var _schd_tankerIsValid:Boolean;
    model_internal var _schd_tankerValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_tankerIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_tankerValidationFailureMessages:Array;
    
    model_internal var _schd_supp_codeIsValid:Boolean;
    model_internal var _schd_supp_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_supp_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_supp_codeValidationFailureMessages:Array;
    
    model_internal var _schd_carr_codeIsValid:Boolean;
    model_internal var _schd_carr_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_carr_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_carr_codeValidationFailureMessages:Array;
    
    model_internal var _schd_supplierIsValid:Boolean;
    model_internal var _schd_supplierValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_supplierIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_supplierValidationFailureMessages:Array;
    
    model_internal var _schd_status_codeIsValid:Boolean;
    model_internal var _schd_status_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_status_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_status_codeValidationFailureMessages:Array;
    
    model_internal var _schd_dateIsValid:Boolean;
    model_internal var _schd_dateValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_dateIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_dateValidationFailureMessages:Array;
    
    model_internal var _schd_tnkr_codeIsValid:Boolean;
    model_internal var _schd_tnkr_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_tnkr_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_tnkr_codeValidationFailureMessages:Array;
    
    model_internal var _schd_order_idIsValid:Boolean;
    model_internal var _schd_order_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_order_idIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_order_idValidationFailureMessages:Array;

    model_internal var _instance:_Super_OrderScheduleLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _OrderScheduleLookupEntityMetadata(value : _Super_OrderScheduleLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["schd_status"] = new Array();
            model_internal::dependentsOnMap["schd_carrier"] = new Array();
            model_internal::dependentsOnMap["schd_trip_no"] = new Array();
            model_internal::dependentsOnMap["schd_tanker"] = new Array();
            model_internal::dependentsOnMap["schd_supp_code"] = new Array();
            model_internal::dependentsOnMap["schd_carr_code"] = new Array();
            model_internal::dependentsOnMap["schd_supplier"] = new Array();
            model_internal::dependentsOnMap["schd_status_code"] = new Array();
            model_internal::dependentsOnMap["schd_date"] = new Array();
            model_internal::dependentsOnMap["schd_tnkr_code"] = new Array();
            model_internal::dependentsOnMap["schd_order_id"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["schd_status"] = "String";
        model_internal::propertyTypeMap["schd_carrier"] = "String";
        model_internal::propertyTypeMap["schd_trip_no"] = "String";
        model_internal::propertyTypeMap["schd_tanker"] = "Object";
        model_internal::propertyTypeMap["schd_supp_code"] = "String";
        model_internal::propertyTypeMap["schd_carr_code"] = "String";
        model_internal::propertyTypeMap["schd_supplier"] = "String";
        model_internal::propertyTypeMap["schd_status_code"] = "String";
        model_internal::propertyTypeMap["schd_date"] = "String";
        model_internal::propertyTypeMap["schd_tnkr_code"] = "String";
        model_internal::propertyTypeMap["schd_order_id"] = "String";

        model_internal::_instance = value;
        model_internal::_schd_statusValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_status);
        model_internal::_schd_statusValidator.required = true;
        model_internal::_schd_statusValidator.requiredFieldError = "schd_status is required";
        //model_internal::_schd_statusValidator.source = model_internal::_instance;
        //model_internal::_schd_statusValidator.property = "schd_status";
        model_internal::_schd_carrierValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_carrier);
        model_internal::_schd_carrierValidator.required = true;
        model_internal::_schd_carrierValidator.requiredFieldError = "schd_carrier is required";
        //model_internal::_schd_carrierValidator.source = model_internal::_instance;
        //model_internal::_schd_carrierValidator.property = "schd_carrier";
        model_internal::_schd_trip_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_trip_no);
        model_internal::_schd_trip_noValidator.required = true;
        model_internal::_schd_trip_noValidator.requiredFieldError = "schd_trip_no is required";
        //model_internal::_schd_trip_noValidator.source = model_internal::_instance;
        //model_internal::_schd_trip_noValidator.property = "schd_trip_no";
        model_internal::_schd_tankerValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_tanker);
        model_internal::_schd_tankerValidator.required = true;
        model_internal::_schd_tankerValidator.requiredFieldError = "schd_tanker is required";
        //model_internal::_schd_tankerValidator.source = model_internal::_instance;
        //model_internal::_schd_tankerValidator.property = "schd_tanker";
        model_internal::_schd_supp_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_supp_code);
        model_internal::_schd_supp_codeValidator.required = true;
        model_internal::_schd_supp_codeValidator.requiredFieldError = "schd_supp_code is required";
        //model_internal::_schd_supp_codeValidator.source = model_internal::_instance;
        //model_internal::_schd_supp_codeValidator.property = "schd_supp_code";
        model_internal::_schd_carr_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_carr_code);
        model_internal::_schd_carr_codeValidator.required = true;
        model_internal::_schd_carr_codeValidator.requiredFieldError = "schd_carr_code is required";
        //model_internal::_schd_carr_codeValidator.source = model_internal::_instance;
        //model_internal::_schd_carr_codeValidator.property = "schd_carr_code";
        model_internal::_schd_supplierValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_supplier);
        model_internal::_schd_supplierValidator.required = true;
        model_internal::_schd_supplierValidator.requiredFieldError = "schd_supplier is required";
        //model_internal::_schd_supplierValidator.source = model_internal::_instance;
        //model_internal::_schd_supplierValidator.property = "schd_supplier";
        model_internal::_schd_status_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_status_code);
        model_internal::_schd_status_codeValidator.required = true;
        model_internal::_schd_status_codeValidator.requiredFieldError = "schd_status_code is required";
        //model_internal::_schd_status_codeValidator.source = model_internal::_instance;
        //model_internal::_schd_status_codeValidator.property = "schd_status_code";
        model_internal::_schd_dateValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_date);
        model_internal::_schd_dateValidator.required = true;
        model_internal::_schd_dateValidator.requiredFieldError = "schd_date is required";
        //model_internal::_schd_dateValidator.source = model_internal::_instance;
        //model_internal::_schd_dateValidator.property = "schd_date";
        model_internal::_schd_tnkr_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_tnkr_code);
        model_internal::_schd_tnkr_codeValidator.required = true;
        model_internal::_schd_tnkr_codeValidator.requiredFieldError = "schd_tnkr_code is required";
        //model_internal::_schd_tnkr_codeValidator.source = model_internal::_instance;
        //model_internal::_schd_tnkr_codeValidator.property = "schd_tnkr_code";
        model_internal::_schd_order_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_order_id);
        model_internal::_schd_order_idValidator.required = true;
        model_internal::_schd_order_idValidator.requiredFieldError = "schd_order_id is required";
        //model_internal::_schd_order_idValidator.source = model_internal::_instance;
        //model_internal::_schd_order_idValidator.property = "schd_order_id";
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
            throw new Error(propertyName + " is not a data property of entity OrderScheduleLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity OrderScheduleLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of OrderScheduleLookup");

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
            throw new Error(propertyName + " does not exist for entity OrderScheduleLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity OrderScheduleLookup");
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
            throw new Error(propertyName + " does not exist for entity OrderScheduleLookup");
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
    public function get isSchd_statusAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_carrierAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_trip_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_tankerAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_supp_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_carr_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_supplierAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_status_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_dateAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_tnkr_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_order_idAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnSchd_status():void
    {
        if (model_internal::_schd_statusIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_status = null;
            model_internal::calculateSchd_statusIsValid();
        }
    }
    public function invalidateDependentOnSchd_carrier():void
    {
        if (model_internal::_schd_carrierIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_carrier = null;
            model_internal::calculateSchd_carrierIsValid();
        }
    }
    public function invalidateDependentOnSchd_trip_no():void
    {
        if (model_internal::_schd_trip_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_trip_no = null;
            model_internal::calculateSchd_trip_noIsValid();
        }
    }
    public function invalidateDependentOnSchd_tanker():void
    {
        if (model_internal::_schd_tankerIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_tanker = null;
            model_internal::calculateSchd_tankerIsValid();
        }
    }
    public function invalidateDependentOnSchd_supp_code():void
    {
        if (model_internal::_schd_supp_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_supp_code = null;
            model_internal::calculateSchd_supp_codeIsValid();
        }
    }
    public function invalidateDependentOnSchd_carr_code():void
    {
        if (model_internal::_schd_carr_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_carr_code = null;
            model_internal::calculateSchd_carr_codeIsValid();
        }
    }
    public function invalidateDependentOnSchd_supplier():void
    {
        if (model_internal::_schd_supplierIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_supplier = null;
            model_internal::calculateSchd_supplierIsValid();
        }
    }
    public function invalidateDependentOnSchd_status_code():void
    {
        if (model_internal::_schd_status_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_status_code = null;
            model_internal::calculateSchd_status_codeIsValid();
        }
    }
    public function invalidateDependentOnSchd_date():void
    {
        if (model_internal::_schd_dateIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_date = null;
            model_internal::calculateSchd_dateIsValid();
        }
    }
    public function invalidateDependentOnSchd_tnkr_code():void
    {
        if (model_internal::_schd_tnkr_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_tnkr_code = null;
            model_internal::calculateSchd_tnkr_codeIsValid();
        }
    }
    public function invalidateDependentOnSchd_order_id():void
    {
        if (model_internal::_schd_order_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_order_id = null;
            model_internal::calculateSchd_order_idIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get schd_statusStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_statusValidator() : StyleValidator
    {
        return model_internal::_schd_statusValidator;
    }

    model_internal function set _schd_statusIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_statusIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_statusIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_statusIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_statusIsValid():Boolean
    {
        if (!model_internal::_schd_statusIsValidCacheInitialized)
        {
            model_internal::calculateSchd_statusIsValid();
        }

        return model_internal::_schd_statusIsValid;
    }

    model_internal function calculateSchd_statusIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_statusValidator.validate(model_internal::_instance.schd_status)
        model_internal::_schd_statusIsValid_der = (valRes.results == null);
        model_internal::_schd_statusIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_statusValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_statusValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_statusValidationFailureMessages():Array
    {
        if (model_internal::_schd_statusValidationFailureMessages == null)
            model_internal::calculateSchd_statusIsValid();

        return _schd_statusValidationFailureMessages;
    }

    model_internal function set schd_statusValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_statusValidationFailureMessages;

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
            model_internal::_schd_statusValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_statusValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_carrierStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_carrierValidator() : StyleValidator
    {
        return model_internal::_schd_carrierValidator;
    }

    model_internal function set _schd_carrierIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_carrierIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_carrierIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_carrierIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_carrierIsValid():Boolean
    {
        if (!model_internal::_schd_carrierIsValidCacheInitialized)
        {
            model_internal::calculateSchd_carrierIsValid();
        }

        return model_internal::_schd_carrierIsValid;
    }

    model_internal function calculateSchd_carrierIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_carrierValidator.validate(model_internal::_instance.schd_carrier)
        model_internal::_schd_carrierIsValid_der = (valRes.results == null);
        model_internal::_schd_carrierIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_carrierValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_carrierValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_carrierValidationFailureMessages():Array
    {
        if (model_internal::_schd_carrierValidationFailureMessages == null)
            model_internal::calculateSchd_carrierIsValid();

        return _schd_carrierValidationFailureMessages;
    }

    model_internal function set schd_carrierValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_carrierValidationFailureMessages;

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
            model_internal::_schd_carrierValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_carrierValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_trip_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_trip_noValidator() : StyleValidator
    {
        return model_internal::_schd_trip_noValidator;
    }

    model_internal function set _schd_trip_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_trip_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_trip_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_trip_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_trip_noIsValid():Boolean
    {
        if (!model_internal::_schd_trip_noIsValidCacheInitialized)
        {
            model_internal::calculateSchd_trip_noIsValid();
        }

        return model_internal::_schd_trip_noIsValid;
    }

    model_internal function calculateSchd_trip_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_trip_noValidator.validate(model_internal::_instance.schd_trip_no)
        model_internal::_schd_trip_noIsValid_der = (valRes.results == null);
        model_internal::_schd_trip_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_trip_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_trip_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_trip_noValidationFailureMessages():Array
    {
        if (model_internal::_schd_trip_noValidationFailureMessages == null)
            model_internal::calculateSchd_trip_noIsValid();

        return _schd_trip_noValidationFailureMessages;
    }

    model_internal function set schd_trip_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_trip_noValidationFailureMessages;

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
            model_internal::_schd_trip_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_trip_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_tankerStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_tankerValidator() : StyleValidator
    {
        return model_internal::_schd_tankerValidator;
    }

    model_internal function set _schd_tankerIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_tankerIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_tankerIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_tankerIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_tankerIsValid():Boolean
    {
        if (!model_internal::_schd_tankerIsValidCacheInitialized)
        {
            model_internal::calculateSchd_tankerIsValid();
        }

        return model_internal::_schd_tankerIsValid;
    }

    model_internal function calculateSchd_tankerIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_tankerValidator.validate(model_internal::_instance.schd_tanker)
        model_internal::_schd_tankerIsValid_der = (valRes.results == null);
        model_internal::_schd_tankerIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_tankerValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_tankerValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_tankerValidationFailureMessages():Array
    {
        if (model_internal::_schd_tankerValidationFailureMessages == null)
            model_internal::calculateSchd_tankerIsValid();

        return _schd_tankerValidationFailureMessages;
    }

    model_internal function set schd_tankerValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_tankerValidationFailureMessages;

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
            model_internal::_schd_tankerValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_tankerValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_supp_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_supp_codeValidator() : StyleValidator
    {
        return model_internal::_schd_supp_codeValidator;
    }

    model_internal function set _schd_supp_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_supp_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_supp_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_supp_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_supp_codeIsValid():Boolean
    {
        if (!model_internal::_schd_supp_codeIsValidCacheInitialized)
        {
            model_internal::calculateSchd_supp_codeIsValid();
        }

        return model_internal::_schd_supp_codeIsValid;
    }

    model_internal function calculateSchd_supp_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_supp_codeValidator.validate(model_internal::_instance.schd_supp_code)
        model_internal::_schd_supp_codeIsValid_der = (valRes.results == null);
        model_internal::_schd_supp_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_supp_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_supp_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_supp_codeValidationFailureMessages():Array
    {
        if (model_internal::_schd_supp_codeValidationFailureMessages == null)
            model_internal::calculateSchd_supp_codeIsValid();

        return _schd_supp_codeValidationFailureMessages;
    }

    model_internal function set schd_supp_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_supp_codeValidationFailureMessages;

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
            model_internal::_schd_supp_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_supp_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_carr_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_carr_codeValidator() : StyleValidator
    {
        return model_internal::_schd_carr_codeValidator;
    }

    model_internal function set _schd_carr_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_carr_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_carr_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_carr_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_carr_codeIsValid():Boolean
    {
        if (!model_internal::_schd_carr_codeIsValidCacheInitialized)
        {
            model_internal::calculateSchd_carr_codeIsValid();
        }

        return model_internal::_schd_carr_codeIsValid;
    }

    model_internal function calculateSchd_carr_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_carr_codeValidator.validate(model_internal::_instance.schd_carr_code)
        model_internal::_schd_carr_codeIsValid_der = (valRes.results == null);
        model_internal::_schd_carr_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_carr_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_carr_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_carr_codeValidationFailureMessages():Array
    {
        if (model_internal::_schd_carr_codeValidationFailureMessages == null)
            model_internal::calculateSchd_carr_codeIsValid();

        return _schd_carr_codeValidationFailureMessages;
    }

    model_internal function set schd_carr_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_carr_codeValidationFailureMessages;

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
            model_internal::_schd_carr_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_carr_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_supplierStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_supplierValidator() : StyleValidator
    {
        return model_internal::_schd_supplierValidator;
    }

    model_internal function set _schd_supplierIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_supplierIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_supplierIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_supplierIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_supplierIsValid():Boolean
    {
        if (!model_internal::_schd_supplierIsValidCacheInitialized)
        {
            model_internal::calculateSchd_supplierIsValid();
        }

        return model_internal::_schd_supplierIsValid;
    }

    model_internal function calculateSchd_supplierIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_supplierValidator.validate(model_internal::_instance.schd_supplier)
        model_internal::_schd_supplierIsValid_der = (valRes.results == null);
        model_internal::_schd_supplierIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_supplierValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_supplierValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_supplierValidationFailureMessages():Array
    {
        if (model_internal::_schd_supplierValidationFailureMessages == null)
            model_internal::calculateSchd_supplierIsValid();

        return _schd_supplierValidationFailureMessages;
    }

    model_internal function set schd_supplierValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_supplierValidationFailureMessages;

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
            model_internal::_schd_supplierValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_supplierValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_status_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_status_codeValidator() : StyleValidator
    {
        return model_internal::_schd_status_codeValidator;
    }

    model_internal function set _schd_status_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_status_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_status_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_status_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_status_codeIsValid():Boolean
    {
        if (!model_internal::_schd_status_codeIsValidCacheInitialized)
        {
            model_internal::calculateSchd_status_codeIsValid();
        }

        return model_internal::_schd_status_codeIsValid;
    }

    model_internal function calculateSchd_status_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_status_codeValidator.validate(model_internal::_instance.schd_status_code)
        model_internal::_schd_status_codeIsValid_der = (valRes.results == null);
        model_internal::_schd_status_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_status_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_status_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_status_codeValidationFailureMessages():Array
    {
        if (model_internal::_schd_status_codeValidationFailureMessages == null)
            model_internal::calculateSchd_status_codeIsValid();

        return _schd_status_codeValidationFailureMessages;
    }

    model_internal function set schd_status_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_status_codeValidationFailureMessages;

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
            model_internal::_schd_status_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_status_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_dateStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_dateValidator() : StyleValidator
    {
        return model_internal::_schd_dateValidator;
    }

    model_internal function set _schd_dateIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_dateIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_dateIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_dateIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_dateIsValid():Boolean
    {
        if (!model_internal::_schd_dateIsValidCacheInitialized)
        {
            model_internal::calculateSchd_dateIsValid();
        }

        return model_internal::_schd_dateIsValid;
    }

    model_internal function calculateSchd_dateIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_dateValidator.validate(model_internal::_instance.schd_date)
        model_internal::_schd_dateIsValid_der = (valRes.results == null);
        model_internal::_schd_dateIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_dateValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_dateValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_dateValidationFailureMessages():Array
    {
        if (model_internal::_schd_dateValidationFailureMessages == null)
            model_internal::calculateSchd_dateIsValid();

        return _schd_dateValidationFailureMessages;
    }

    model_internal function set schd_dateValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_dateValidationFailureMessages;

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
            model_internal::_schd_dateValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_dateValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_tnkr_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_tnkr_codeValidator() : StyleValidator
    {
        return model_internal::_schd_tnkr_codeValidator;
    }

    model_internal function set _schd_tnkr_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_tnkr_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_tnkr_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_tnkr_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_tnkr_codeIsValid():Boolean
    {
        if (!model_internal::_schd_tnkr_codeIsValidCacheInitialized)
        {
            model_internal::calculateSchd_tnkr_codeIsValid();
        }

        return model_internal::_schd_tnkr_codeIsValid;
    }

    model_internal function calculateSchd_tnkr_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_tnkr_codeValidator.validate(model_internal::_instance.schd_tnkr_code)
        model_internal::_schd_tnkr_codeIsValid_der = (valRes.results == null);
        model_internal::_schd_tnkr_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_tnkr_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_tnkr_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_tnkr_codeValidationFailureMessages():Array
    {
        if (model_internal::_schd_tnkr_codeValidationFailureMessages == null)
            model_internal::calculateSchd_tnkr_codeIsValid();

        return _schd_tnkr_codeValidationFailureMessages;
    }

    model_internal function set schd_tnkr_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_tnkr_codeValidationFailureMessages;

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
            model_internal::_schd_tnkr_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_tnkr_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_order_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_order_idValidator() : StyleValidator
    {
        return model_internal::_schd_order_idValidator;
    }

    model_internal function set _schd_order_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_order_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_order_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_order_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_order_idIsValid():Boolean
    {
        if (!model_internal::_schd_order_idIsValidCacheInitialized)
        {
            model_internal::calculateSchd_order_idIsValid();
        }

        return model_internal::_schd_order_idIsValid;
    }

    model_internal function calculateSchd_order_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_order_idValidator.validate(model_internal::_instance.schd_order_id)
        model_internal::_schd_order_idIsValid_der = (valRes.results == null);
        model_internal::_schd_order_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_order_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_order_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_order_idValidationFailureMessages():Array
    {
        if (model_internal::_schd_order_idValidationFailureMessages == null)
            model_internal::calculateSchd_order_idIsValid();

        return _schd_order_idValidationFailureMessages;
    }

    model_internal function set schd_order_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_order_idValidationFailureMessages;

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
            model_internal::_schd_order_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_order_idValidationFailureMessages", oldValue, value));
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
            case("schd_status"):
            {
                return schd_statusValidationFailureMessages;
            }
            case("schd_carrier"):
            {
                return schd_carrierValidationFailureMessages;
            }
            case("schd_trip_no"):
            {
                return schd_trip_noValidationFailureMessages;
            }
            case("schd_tanker"):
            {
                return schd_tankerValidationFailureMessages;
            }
            case("schd_supp_code"):
            {
                return schd_supp_codeValidationFailureMessages;
            }
            case("schd_carr_code"):
            {
                return schd_carr_codeValidationFailureMessages;
            }
            case("schd_supplier"):
            {
                return schd_supplierValidationFailureMessages;
            }
            case("schd_status_code"):
            {
                return schd_status_codeValidationFailureMessages;
            }
            case("schd_date"):
            {
                return schd_dateValidationFailureMessages;
            }
            case("schd_tnkr_code"):
            {
                return schd_tnkr_codeValidationFailureMessages;
            }
            case("schd_order_id"):
            {
                return schd_order_idValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
