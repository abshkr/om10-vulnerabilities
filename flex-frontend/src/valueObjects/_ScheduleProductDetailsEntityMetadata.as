
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
internal class _ScheduleProductDetailsEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("prod_cmpy", "preloaded", "qty_kg", "qty_preloaded", "qty_loaded", "qty_scheduled", "unit_name", "qty_std", "prod_code", "qty_amb", "unit_code", "prod_name");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("prod_cmpy", "preloaded", "qty_kg", "qty_preloaded", "qty_loaded", "qty_scheduled", "unit_name", "qty_std", "prod_code", "qty_amb", "unit_code", "prod_name");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("prod_cmpy", "preloaded", "qty_kg", "qty_preloaded", "qty_loaded", "qty_scheduled", "unit_name", "qty_std", "prod_code", "qty_amb", "unit_code", "prod_name");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("prod_cmpy", "preloaded", "qty_kg", "qty_preloaded", "qty_loaded", "qty_scheduled", "unit_name", "qty_std", "prod_code", "qty_amb", "unit_code", "prod_name");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("prod_cmpy", "preloaded", "qty_kg", "qty_preloaded", "qty_loaded", "qty_scheduled", "unit_name", "qty_std", "prod_code", "qty_amb", "unit_code", "prod_name");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "ScheduleProductDetails";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _prod_cmpyIsValid:Boolean;
    model_internal var _prod_cmpyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_cmpyIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_cmpyValidationFailureMessages:Array;
    
    model_internal var _preloadedIsValid:Boolean;
    model_internal var _preloadedValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _preloadedIsValidCacheInitialized:Boolean = false;
    model_internal var _preloadedValidationFailureMessages:Array;
    
    model_internal var _qty_kgIsValid:Boolean;
    model_internal var _qty_kgValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _qty_kgIsValidCacheInitialized:Boolean = false;
    model_internal var _qty_kgValidationFailureMessages:Array;
    
    model_internal var _qty_preloadedIsValid:Boolean;
    model_internal var _qty_preloadedValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _qty_preloadedIsValidCacheInitialized:Boolean = false;
    model_internal var _qty_preloadedValidationFailureMessages:Array;
    
    model_internal var _qty_loadedIsValid:Boolean;
    model_internal var _qty_loadedValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _qty_loadedIsValidCacheInitialized:Boolean = false;
    model_internal var _qty_loadedValidationFailureMessages:Array;
    
    model_internal var _qty_scheduledIsValid:Boolean;
    model_internal var _qty_scheduledValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _qty_scheduledIsValidCacheInitialized:Boolean = false;
    model_internal var _qty_scheduledValidationFailureMessages:Array;
    
    model_internal var _unit_nameIsValid:Boolean;
    model_internal var _unit_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _unit_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _unit_nameValidationFailureMessages:Array;
    
    model_internal var _qty_stdIsValid:Boolean;
    model_internal var _qty_stdValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _qty_stdIsValidCacheInitialized:Boolean = false;
    model_internal var _qty_stdValidationFailureMessages:Array;
    
    model_internal var _prod_codeIsValid:Boolean;
    model_internal var _prod_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_codeValidationFailureMessages:Array;
    
    model_internal var _qty_ambIsValid:Boolean;
    model_internal var _qty_ambValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _qty_ambIsValidCacheInitialized:Boolean = false;
    model_internal var _qty_ambValidationFailureMessages:Array;
    
    model_internal var _unit_codeIsValid:Boolean;
    model_internal var _unit_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _unit_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _unit_codeValidationFailureMessages:Array;
    
    model_internal var _prod_nameIsValid:Boolean;
    model_internal var _prod_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_nameValidationFailureMessages:Array;

    model_internal var _instance:_Super_ScheduleProductDetails;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _ScheduleProductDetailsEntityMetadata(value : _Super_ScheduleProductDetails)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["prod_cmpy"] = new Array();
            model_internal::dependentsOnMap["preloaded"] = new Array();
            model_internal::dependentsOnMap["qty_kg"] = new Array();
            model_internal::dependentsOnMap["qty_preloaded"] = new Array();
            model_internal::dependentsOnMap["qty_loaded"] = new Array();
            model_internal::dependentsOnMap["qty_scheduled"] = new Array();
            model_internal::dependentsOnMap["unit_name"] = new Array();
            model_internal::dependentsOnMap["qty_std"] = new Array();
            model_internal::dependentsOnMap["prod_code"] = new Array();
            model_internal::dependentsOnMap["qty_amb"] = new Array();
            model_internal::dependentsOnMap["unit_code"] = new Array();
            model_internal::dependentsOnMap["prod_name"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["prod_cmpy"] = "String";
        model_internal::propertyTypeMap["preloaded"] = "Object";
        model_internal::propertyTypeMap["qty_kg"] = "String";
        model_internal::propertyTypeMap["qty_preloaded"] = "String";
        model_internal::propertyTypeMap["qty_loaded"] = "String";
        model_internal::propertyTypeMap["qty_scheduled"] = "String";
        model_internal::propertyTypeMap["unit_name"] = "String";
        model_internal::propertyTypeMap["qty_std"] = "String";
        model_internal::propertyTypeMap["prod_code"] = "String";
        model_internal::propertyTypeMap["qty_amb"] = "String";
        model_internal::propertyTypeMap["unit_code"] = "String";
        model_internal::propertyTypeMap["prod_name"] = "String";

        model_internal::_instance = value;
        model_internal::_prod_cmpyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_cmpy);
        model_internal::_prod_cmpyValidator.required = true;
        model_internal::_prod_cmpyValidator.requiredFieldError = "prod_cmpy is required";
        //model_internal::_prod_cmpyValidator.source = model_internal::_instance;
        //model_internal::_prod_cmpyValidator.property = "prod_cmpy";
        model_internal::_preloadedValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPreloaded);
        model_internal::_preloadedValidator.required = true;
        model_internal::_preloadedValidator.requiredFieldError = "preloaded is required";
        //model_internal::_preloadedValidator.source = model_internal::_instance;
        //model_internal::_preloadedValidator.property = "preloaded";
        model_internal::_qty_kgValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForQty_kg);
        model_internal::_qty_kgValidator.required = true;
        model_internal::_qty_kgValidator.requiredFieldError = "qty_kg is required";
        //model_internal::_qty_kgValidator.source = model_internal::_instance;
        //model_internal::_qty_kgValidator.property = "qty_kg";
        model_internal::_qty_preloadedValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForQty_preloaded);
        model_internal::_qty_preloadedValidator.required = true;
        model_internal::_qty_preloadedValidator.requiredFieldError = "qty_preloaded is required";
        //model_internal::_qty_preloadedValidator.source = model_internal::_instance;
        //model_internal::_qty_preloadedValidator.property = "qty_preloaded";
        model_internal::_qty_loadedValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForQty_loaded);
        model_internal::_qty_loadedValidator.required = true;
        model_internal::_qty_loadedValidator.requiredFieldError = "qty_loaded is required";
        //model_internal::_qty_loadedValidator.source = model_internal::_instance;
        //model_internal::_qty_loadedValidator.property = "qty_loaded";
        model_internal::_qty_scheduledValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForQty_scheduled);
        model_internal::_qty_scheduledValidator.required = true;
        model_internal::_qty_scheduledValidator.requiredFieldError = "qty_scheduled is required";
        //model_internal::_qty_scheduledValidator.source = model_internal::_instance;
        //model_internal::_qty_scheduledValidator.property = "qty_scheduled";
        model_internal::_unit_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForUnit_name);
        model_internal::_unit_nameValidator.required = true;
        model_internal::_unit_nameValidator.requiredFieldError = "unit_name is required";
        //model_internal::_unit_nameValidator.source = model_internal::_instance;
        //model_internal::_unit_nameValidator.property = "unit_name";
        model_internal::_qty_stdValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForQty_std);
        model_internal::_qty_stdValidator.required = true;
        model_internal::_qty_stdValidator.requiredFieldError = "qty_std is required";
        //model_internal::_qty_stdValidator.source = model_internal::_instance;
        //model_internal::_qty_stdValidator.property = "qty_std";
        model_internal::_prod_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_code);
        model_internal::_prod_codeValidator.required = true;
        model_internal::_prod_codeValidator.requiredFieldError = "prod_code is required";
        //model_internal::_prod_codeValidator.source = model_internal::_instance;
        //model_internal::_prod_codeValidator.property = "prod_code";
        model_internal::_qty_ambValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForQty_amb);
        model_internal::_qty_ambValidator.required = true;
        model_internal::_qty_ambValidator.requiredFieldError = "qty_amb is required";
        //model_internal::_qty_ambValidator.source = model_internal::_instance;
        //model_internal::_qty_ambValidator.property = "qty_amb";
        model_internal::_unit_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForUnit_code);
        model_internal::_unit_codeValidator.required = true;
        model_internal::_unit_codeValidator.requiredFieldError = "unit_code is required";
        //model_internal::_unit_codeValidator.source = model_internal::_instance;
        //model_internal::_unit_codeValidator.property = "unit_code";
        model_internal::_prod_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_name);
        model_internal::_prod_nameValidator.required = true;
        model_internal::_prod_nameValidator.requiredFieldError = "prod_name is required";
        //model_internal::_prod_nameValidator.source = model_internal::_instance;
        //model_internal::_prod_nameValidator.property = "prod_name";
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
            throw new Error(propertyName + " is not a data property of entity ScheduleProductDetails");
            
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
            throw new Error(propertyName + " is not a collection property of entity ScheduleProductDetails");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of ScheduleProductDetails");

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
            throw new Error(propertyName + " does not exist for entity ScheduleProductDetails");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity ScheduleProductDetails");
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
            throw new Error(propertyName + " does not exist for entity ScheduleProductDetails");
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
    public function get isProd_cmpyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPreloadedAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isQty_kgAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isQty_preloadedAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isQty_loadedAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isQty_scheduledAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isUnit_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isQty_stdAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProd_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isQty_ambAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isUnit_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProd_nameAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnProd_cmpy():void
    {
        if (model_internal::_prod_cmpyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_cmpy = null;
            model_internal::calculateProd_cmpyIsValid();
        }
    }
    public function invalidateDependentOnPreloaded():void
    {
        if (model_internal::_preloadedIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPreloaded = null;
            model_internal::calculatePreloadedIsValid();
        }
    }
    public function invalidateDependentOnQty_kg():void
    {
        if (model_internal::_qty_kgIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfQty_kg = null;
            model_internal::calculateQty_kgIsValid();
        }
    }
    public function invalidateDependentOnQty_preloaded():void
    {
        if (model_internal::_qty_preloadedIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfQty_preloaded = null;
            model_internal::calculateQty_preloadedIsValid();
        }
    }
    public function invalidateDependentOnQty_loaded():void
    {
        if (model_internal::_qty_loadedIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfQty_loaded = null;
            model_internal::calculateQty_loadedIsValid();
        }
    }
    public function invalidateDependentOnQty_scheduled():void
    {
        if (model_internal::_qty_scheduledIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfQty_scheduled = null;
            model_internal::calculateQty_scheduledIsValid();
        }
    }
    public function invalidateDependentOnUnit_name():void
    {
        if (model_internal::_unit_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfUnit_name = null;
            model_internal::calculateUnit_nameIsValid();
        }
    }
    public function invalidateDependentOnQty_std():void
    {
        if (model_internal::_qty_stdIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfQty_std = null;
            model_internal::calculateQty_stdIsValid();
        }
    }
    public function invalidateDependentOnProd_code():void
    {
        if (model_internal::_prod_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_code = null;
            model_internal::calculateProd_codeIsValid();
        }
    }
    public function invalidateDependentOnQty_amb():void
    {
        if (model_internal::_qty_ambIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfQty_amb = null;
            model_internal::calculateQty_ambIsValid();
        }
    }
    public function invalidateDependentOnUnit_code():void
    {
        if (model_internal::_unit_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfUnit_code = null;
            model_internal::calculateUnit_codeIsValid();
        }
    }
    public function invalidateDependentOnProd_name():void
    {
        if (model_internal::_prod_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_name = null;
            model_internal::calculateProd_nameIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get prod_cmpyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prod_cmpyValidator() : StyleValidator
    {
        return model_internal::_prod_cmpyValidator;
    }

    model_internal function set _prod_cmpyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prod_cmpyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prod_cmpyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_cmpyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prod_cmpyIsValid():Boolean
    {
        if (!model_internal::_prod_cmpyIsValidCacheInitialized)
        {
            model_internal::calculateProd_cmpyIsValid();
        }

        return model_internal::_prod_cmpyIsValid;
    }

    model_internal function calculateProd_cmpyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prod_cmpyValidator.validate(model_internal::_instance.prod_cmpy)
        model_internal::_prod_cmpyIsValid_der = (valRes.results == null);
        model_internal::_prod_cmpyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prod_cmpyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prod_cmpyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prod_cmpyValidationFailureMessages():Array
    {
        if (model_internal::_prod_cmpyValidationFailureMessages == null)
            model_internal::calculateProd_cmpyIsValid();

        return _prod_cmpyValidationFailureMessages;
    }

    model_internal function set prod_cmpyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prod_cmpyValidationFailureMessages;

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
            model_internal::_prod_cmpyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_cmpyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get preloadedStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get preloadedValidator() : StyleValidator
    {
        return model_internal::_preloadedValidator;
    }

    model_internal function set _preloadedIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_preloadedIsValid;         
        if (oldValue !== value)
        {
            model_internal::_preloadedIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "preloadedIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get preloadedIsValid():Boolean
    {
        if (!model_internal::_preloadedIsValidCacheInitialized)
        {
            model_internal::calculatePreloadedIsValid();
        }

        return model_internal::_preloadedIsValid;
    }

    model_internal function calculatePreloadedIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_preloadedValidator.validate(model_internal::_instance.preloaded)
        model_internal::_preloadedIsValid_der = (valRes.results == null);
        model_internal::_preloadedIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::preloadedValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::preloadedValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get preloadedValidationFailureMessages():Array
    {
        if (model_internal::_preloadedValidationFailureMessages == null)
            model_internal::calculatePreloadedIsValid();

        return _preloadedValidationFailureMessages;
    }

    model_internal function set preloadedValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_preloadedValidationFailureMessages;

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
            model_internal::_preloadedValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "preloadedValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get qty_kgStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get qty_kgValidator() : StyleValidator
    {
        return model_internal::_qty_kgValidator;
    }

    model_internal function set _qty_kgIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_qty_kgIsValid;         
        if (oldValue !== value)
        {
            model_internal::_qty_kgIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_kgIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get qty_kgIsValid():Boolean
    {
        if (!model_internal::_qty_kgIsValidCacheInitialized)
        {
            model_internal::calculateQty_kgIsValid();
        }

        return model_internal::_qty_kgIsValid;
    }

    model_internal function calculateQty_kgIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_qty_kgValidator.validate(model_internal::_instance.qty_kg)
        model_internal::_qty_kgIsValid_der = (valRes.results == null);
        model_internal::_qty_kgIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::qty_kgValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::qty_kgValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get qty_kgValidationFailureMessages():Array
    {
        if (model_internal::_qty_kgValidationFailureMessages == null)
            model_internal::calculateQty_kgIsValid();

        return _qty_kgValidationFailureMessages;
    }

    model_internal function set qty_kgValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_qty_kgValidationFailureMessages;

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
            model_internal::_qty_kgValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_kgValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get qty_preloadedStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get qty_preloadedValidator() : StyleValidator
    {
        return model_internal::_qty_preloadedValidator;
    }

    model_internal function set _qty_preloadedIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_qty_preloadedIsValid;         
        if (oldValue !== value)
        {
            model_internal::_qty_preloadedIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_preloadedIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get qty_preloadedIsValid():Boolean
    {
        if (!model_internal::_qty_preloadedIsValidCacheInitialized)
        {
            model_internal::calculateQty_preloadedIsValid();
        }

        return model_internal::_qty_preloadedIsValid;
    }

    model_internal function calculateQty_preloadedIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_qty_preloadedValidator.validate(model_internal::_instance.qty_preloaded)
        model_internal::_qty_preloadedIsValid_der = (valRes.results == null);
        model_internal::_qty_preloadedIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::qty_preloadedValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::qty_preloadedValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get qty_preloadedValidationFailureMessages():Array
    {
        if (model_internal::_qty_preloadedValidationFailureMessages == null)
            model_internal::calculateQty_preloadedIsValid();

        return _qty_preloadedValidationFailureMessages;
    }

    model_internal function set qty_preloadedValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_qty_preloadedValidationFailureMessages;

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
            model_internal::_qty_preloadedValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_preloadedValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get qty_loadedStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get qty_loadedValidator() : StyleValidator
    {
        return model_internal::_qty_loadedValidator;
    }

    model_internal function set _qty_loadedIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_qty_loadedIsValid;         
        if (oldValue !== value)
        {
            model_internal::_qty_loadedIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_loadedIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get qty_loadedIsValid():Boolean
    {
        if (!model_internal::_qty_loadedIsValidCacheInitialized)
        {
            model_internal::calculateQty_loadedIsValid();
        }

        return model_internal::_qty_loadedIsValid;
    }

    model_internal function calculateQty_loadedIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_qty_loadedValidator.validate(model_internal::_instance.qty_loaded)
        model_internal::_qty_loadedIsValid_der = (valRes.results == null);
        model_internal::_qty_loadedIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::qty_loadedValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::qty_loadedValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get qty_loadedValidationFailureMessages():Array
    {
        if (model_internal::_qty_loadedValidationFailureMessages == null)
            model_internal::calculateQty_loadedIsValid();

        return _qty_loadedValidationFailureMessages;
    }

    model_internal function set qty_loadedValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_qty_loadedValidationFailureMessages;

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
            model_internal::_qty_loadedValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_loadedValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get qty_scheduledStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get qty_scheduledValidator() : StyleValidator
    {
        return model_internal::_qty_scheduledValidator;
    }

    model_internal function set _qty_scheduledIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_qty_scheduledIsValid;         
        if (oldValue !== value)
        {
            model_internal::_qty_scheduledIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_scheduledIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get qty_scheduledIsValid():Boolean
    {
        if (!model_internal::_qty_scheduledIsValidCacheInitialized)
        {
            model_internal::calculateQty_scheduledIsValid();
        }

        return model_internal::_qty_scheduledIsValid;
    }

    model_internal function calculateQty_scheduledIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_qty_scheduledValidator.validate(model_internal::_instance.qty_scheduled)
        model_internal::_qty_scheduledIsValid_der = (valRes.results == null);
        model_internal::_qty_scheduledIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::qty_scheduledValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::qty_scheduledValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get qty_scheduledValidationFailureMessages():Array
    {
        if (model_internal::_qty_scheduledValidationFailureMessages == null)
            model_internal::calculateQty_scheduledIsValid();

        return _qty_scheduledValidationFailureMessages;
    }

    model_internal function set qty_scheduledValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_qty_scheduledValidationFailureMessages;

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
            model_internal::_qty_scheduledValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_scheduledValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get unit_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get unit_nameValidator() : StyleValidator
    {
        return model_internal::_unit_nameValidator;
    }

    model_internal function set _unit_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_unit_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_unit_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get unit_nameIsValid():Boolean
    {
        if (!model_internal::_unit_nameIsValidCacheInitialized)
        {
            model_internal::calculateUnit_nameIsValid();
        }

        return model_internal::_unit_nameIsValid;
    }

    model_internal function calculateUnit_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_unit_nameValidator.validate(model_internal::_instance.unit_name)
        model_internal::_unit_nameIsValid_der = (valRes.results == null);
        model_internal::_unit_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::unit_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::unit_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get unit_nameValidationFailureMessages():Array
    {
        if (model_internal::_unit_nameValidationFailureMessages == null)
            model_internal::calculateUnit_nameIsValid();

        return _unit_nameValidationFailureMessages;
    }

    model_internal function set unit_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_unit_nameValidationFailureMessages;

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
            model_internal::_unit_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get qty_stdStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get qty_stdValidator() : StyleValidator
    {
        return model_internal::_qty_stdValidator;
    }

    model_internal function set _qty_stdIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_qty_stdIsValid;         
        if (oldValue !== value)
        {
            model_internal::_qty_stdIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_stdIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get qty_stdIsValid():Boolean
    {
        if (!model_internal::_qty_stdIsValidCacheInitialized)
        {
            model_internal::calculateQty_stdIsValid();
        }

        return model_internal::_qty_stdIsValid;
    }

    model_internal function calculateQty_stdIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_qty_stdValidator.validate(model_internal::_instance.qty_std)
        model_internal::_qty_stdIsValid_der = (valRes.results == null);
        model_internal::_qty_stdIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::qty_stdValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::qty_stdValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get qty_stdValidationFailureMessages():Array
    {
        if (model_internal::_qty_stdValidationFailureMessages == null)
            model_internal::calculateQty_stdIsValid();

        return _qty_stdValidationFailureMessages;
    }

    model_internal function set qty_stdValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_qty_stdValidationFailureMessages;

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
            model_internal::_qty_stdValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_stdValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prod_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prod_codeValidator() : StyleValidator
    {
        return model_internal::_prod_codeValidator;
    }

    model_internal function set _prod_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prod_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prod_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prod_codeIsValid():Boolean
    {
        if (!model_internal::_prod_codeIsValidCacheInitialized)
        {
            model_internal::calculateProd_codeIsValid();
        }

        return model_internal::_prod_codeIsValid;
    }

    model_internal function calculateProd_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prod_codeValidator.validate(model_internal::_instance.prod_code)
        model_internal::_prod_codeIsValid_der = (valRes.results == null);
        model_internal::_prod_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prod_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prod_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prod_codeValidationFailureMessages():Array
    {
        if (model_internal::_prod_codeValidationFailureMessages == null)
            model_internal::calculateProd_codeIsValid();

        return _prod_codeValidationFailureMessages;
    }

    model_internal function set prod_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prod_codeValidationFailureMessages;

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
            model_internal::_prod_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get qty_ambStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get qty_ambValidator() : StyleValidator
    {
        return model_internal::_qty_ambValidator;
    }

    model_internal function set _qty_ambIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_qty_ambIsValid;         
        if (oldValue !== value)
        {
            model_internal::_qty_ambIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_ambIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get qty_ambIsValid():Boolean
    {
        if (!model_internal::_qty_ambIsValidCacheInitialized)
        {
            model_internal::calculateQty_ambIsValid();
        }

        return model_internal::_qty_ambIsValid;
    }

    model_internal function calculateQty_ambIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_qty_ambValidator.validate(model_internal::_instance.qty_amb)
        model_internal::_qty_ambIsValid_der = (valRes.results == null);
        model_internal::_qty_ambIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::qty_ambValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::qty_ambValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get qty_ambValidationFailureMessages():Array
    {
        if (model_internal::_qty_ambValidationFailureMessages == null)
            model_internal::calculateQty_ambIsValid();

        return _qty_ambValidationFailureMessages;
    }

    model_internal function set qty_ambValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_qty_ambValidationFailureMessages;

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
            model_internal::_qty_ambValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_ambValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get unit_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get unit_codeValidator() : StyleValidator
    {
        return model_internal::_unit_codeValidator;
    }

    model_internal function set _unit_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_unit_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_unit_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get unit_codeIsValid():Boolean
    {
        if (!model_internal::_unit_codeIsValidCacheInitialized)
        {
            model_internal::calculateUnit_codeIsValid();
        }

        return model_internal::_unit_codeIsValid;
    }

    model_internal function calculateUnit_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_unit_codeValidator.validate(model_internal::_instance.unit_code)
        model_internal::_unit_codeIsValid_der = (valRes.results == null);
        model_internal::_unit_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::unit_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::unit_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get unit_codeValidationFailureMessages():Array
    {
        if (model_internal::_unit_codeValidationFailureMessages == null)
            model_internal::calculateUnit_codeIsValid();

        return _unit_codeValidationFailureMessages;
    }

    model_internal function set unit_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_unit_codeValidationFailureMessages;

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
            model_internal::_unit_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prod_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prod_nameValidator() : StyleValidator
    {
        return model_internal::_prod_nameValidator;
    }

    model_internal function set _prod_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prod_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prod_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prod_nameIsValid():Boolean
    {
        if (!model_internal::_prod_nameIsValidCacheInitialized)
        {
            model_internal::calculateProd_nameIsValid();
        }

        return model_internal::_prod_nameIsValid;
    }

    model_internal function calculateProd_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prod_nameValidator.validate(model_internal::_instance.prod_name)
        model_internal::_prod_nameIsValid_der = (valRes.results == null);
        model_internal::_prod_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prod_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prod_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prod_nameValidationFailureMessages():Array
    {
        if (model_internal::_prod_nameValidationFailureMessages == null)
            model_internal::calculateProd_nameIsValid();

        return _prod_nameValidationFailureMessages;
    }

    model_internal function set prod_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prod_nameValidationFailureMessages;

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
            model_internal::_prod_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_nameValidationFailureMessages", oldValue, value));
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
            case("prod_cmpy"):
            {
                return prod_cmpyValidationFailureMessages;
            }
            case("preloaded"):
            {
                return preloadedValidationFailureMessages;
            }
            case("qty_kg"):
            {
                return qty_kgValidationFailureMessages;
            }
            case("qty_preloaded"):
            {
                return qty_preloadedValidationFailureMessages;
            }
            case("qty_loaded"):
            {
                return qty_loadedValidationFailureMessages;
            }
            case("qty_scheduled"):
            {
                return qty_scheduledValidationFailureMessages;
            }
            case("unit_name"):
            {
                return unit_nameValidationFailureMessages;
            }
            case("qty_std"):
            {
                return qty_stdValidationFailureMessages;
            }
            case("prod_code"):
            {
                return prod_codeValidationFailureMessages;
            }
            case("qty_amb"):
            {
                return qty_ambValidationFailureMessages;
            }
            case("unit_code"):
            {
                return unit_codeValidationFailureMessages;
            }
            case("prod_name"):
            {
                return prod_nameValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
