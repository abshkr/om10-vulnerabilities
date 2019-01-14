
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
internal class _BA_MetersEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("ba_meter_name", "bam_kfa", "bam_max_flow", "bam_min_flow", "bam_usage", "bam_name", "bam_code", "bam_kdate_dmy");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("ba_meter_name", "bam_kfa", "bam_max_flow", "bam_min_flow", "bam_usage", "bam_name", "bam_code", "bam_kdate_dmy");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("ba_meter_name", "bam_kfa", "bam_max_flow", "bam_min_flow", "bam_usage", "bam_name", "bam_code", "bam_kdate_dmy");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("ba_meter_name", "bam_kfa", "bam_max_flow", "bam_min_flow", "bam_usage", "bam_name", "bam_code", "bam_kdate_dmy");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("ba_meter_name", "bam_kfa", "bam_max_flow", "bam_min_flow", "bam_usage", "bam_name", "bam_code", "bam_kdate_dmy");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "BA_Meters";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _ba_meter_nameIsValid:Boolean;
    model_internal var _ba_meter_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _ba_meter_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _ba_meter_nameValidationFailureMessages:Array;
    
    model_internal var _bam_kfaIsValid:Boolean;
    model_internal var _bam_kfaValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bam_kfaIsValidCacheInitialized:Boolean = false;
    model_internal var _bam_kfaValidationFailureMessages:Array;
    
    model_internal var _bam_max_flowIsValid:Boolean;
    model_internal var _bam_max_flowValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bam_max_flowIsValidCacheInitialized:Boolean = false;
    model_internal var _bam_max_flowValidationFailureMessages:Array;
    
    model_internal var _bam_min_flowIsValid:Boolean;
    model_internal var _bam_min_flowValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bam_min_flowIsValidCacheInitialized:Boolean = false;
    model_internal var _bam_min_flowValidationFailureMessages:Array;
    
    model_internal var _bam_usageIsValid:Boolean;
    model_internal var _bam_usageValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bam_usageIsValidCacheInitialized:Boolean = false;
    model_internal var _bam_usageValidationFailureMessages:Array;
    
    model_internal var _bam_nameIsValid:Boolean;
    model_internal var _bam_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bam_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _bam_nameValidationFailureMessages:Array;
    
    model_internal var _bam_codeIsValid:Boolean;
    model_internal var _bam_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bam_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _bam_codeValidationFailureMessages:Array;
    
    model_internal var _bam_kdate_dmyIsValid:Boolean;
    model_internal var _bam_kdate_dmyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bam_kdate_dmyIsValidCacheInitialized:Boolean = false;
    model_internal var _bam_kdate_dmyValidationFailureMessages:Array;

    model_internal var _instance:_Super_BA_Meters;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _BA_MetersEntityMetadata(value : _Super_BA_Meters)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["ba_meter_name"] = new Array();
            model_internal::dependentsOnMap["bam_kfa"] = new Array();
            model_internal::dependentsOnMap["bam_max_flow"] = new Array();
            model_internal::dependentsOnMap["bam_min_flow"] = new Array();
            model_internal::dependentsOnMap["bam_usage"] = new Array();
            model_internal::dependentsOnMap["bam_name"] = new Array();
            model_internal::dependentsOnMap["bam_code"] = new Array();
            model_internal::dependentsOnMap["bam_kdate_dmy"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["ba_meter_name"] = "String";
        model_internal::propertyTypeMap["bam_kfa"] = "String";
        model_internal::propertyTypeMap["bam_max_flow"] = "String";
        model_internal::propertyTypeMap["bam_min_flow"] = "String";
        model_internal::propertyTypeMap["bam_usage"] = "String";
        model_internal::propertyTypeMap["bam_name"] = "String";
        model_internal::propertyTypeMap["bam_code"] = "String";
        model_internal::propertyTypeMap["bam_kdate_dmy"] = "String";

        model_internal::_instance = value;
        model_internal::_ba_meter_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBa_meter_name);
        model_internal::_ba_meter_nameValidator.required = true;
        model_internal::_ba_meter_nameValidator.requiredFieldError = "ba_meter_name is required";
        //model_internal::_ba_meter_nameValidator.source = model_internal::_instance;
        //model_internal::_ba_meter_nameValidator.property = "ba_meter_name";
        model_internal::_bam_kfaValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBam_kfa);
        model_internal::_bam_kfaValidator.required = true;
        model_internal::_bam_kfaValidator.requiredFieldError = "bam_kfa is required";
        //model_internal::_bam_kfaValidator.source = model_internal::_instance;
        //model_internal::_bam_kfaValidator.property = "bam_kfa";
        model_internal::_bam_max_flowValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBam_max_flow);
        model_internal::_bam_max_flowValidator.required = true;
        model_internal::_bam_max_flowValidator.requiredFieldError = "bam_max_flow is required";
        //model_internal::_bam_max_flowValidator.source = model_internal::_instance;
        //model_internal::_bam_max_flowValidator.property = "bam_max_flow";
        model_internal::_bam_min_flowValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBam_min_flow);
        model_internal::_bam_min_flowValidator.required = true;
        model_internal::_bam_min_flowValidator.requiredFieldError = "bam_min_flow is required";
        //model_internal::_bam_min_flowValidator.source = model_internal::_instance;
        //model_internal::_bam_min_flowValidator.property = "bam_min_flow";
        model_internal::_bam_usageValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBam_usage);
        model_internal::_bam_usageValidator.required = true;
        model_internal::_bam_usageValidator.requiredFieldError = "bam_usage is required";
        //model_internal::_bam_usageValidator.source = model_internal::_instance;
        //model_internal::_bam_usageValidator.property = "bam_usage";
        model_internal::_bam_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBam_name);
        model_internal::_bam_nameValidator.required = true;
        model_internal::_bam_nameValidator.requiredFieldError = "bam_name is required";
        //model_internal::_bam_nameValidator.source = model_internal::_instance;
        //model_internal::_bam_nameValidator.property = "bam_name";
        model_internal::_bam_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBam_code);
        model_internal::_bam_codeValidator.required = true;
        model_internal::_bam_codeValidator.requiredFieldError = "bam_code is required";
        //model_internal::_bam_codeValidator.source = model_internal::_instance;
        //model_internal::_bam_codeValidator.property = "bam_code";
        model_internal::_bam_kdate_dmyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBam_kdate_dmy);
        model_internal::_bam_kdate_dmyValidator.required = true;
        model_internal::_bam_kdate_dmyValidator.requiredFieldError = "bam_kdate_dmy is required";
        //model_internal::_bam_kdate_dmyValidator.source = model_internal::_instance;
        //model_internal::_bam_kdate_dmyValidator.property = "bam_kdate_dmy";
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
            throw new Error(propertyName + " is not a data property of entity BA_Meters");
            
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
            throw new Error(propertyName + " is not a collection property of entity BA_Meters");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of BA_Meters");

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
            throw new Error(propertyName + " does not exist for entity BA_Meters");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity BA_Meters");
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
            throw new Error(propertyName + " does not exist for entity BA_Meters");
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
    public function get isBa_meter_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBam_kfaAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBam_max_flowAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBam_min_flowAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBam_usageAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBam_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBam_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBam_kdate_dmyAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnBa_meter_name():void
    {
        if (model_internal::_ba_meter_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBa_meter_name = null;
            model_internal::calculateBa_meter_nameIsValid();
        }
    }
    public function invalidateDependentOnBam_kfa():void
    {
        if (model_internal::_bam_kfaIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBam_kfa = null;
            model_internal::calculateBam_kfaIsValid();
        }
    }
    public function invalidateDependentOnBam_max_flow():void
    {
        if (model_internal::_bam_max_flowIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBam_max_flow = null;
            model_internal::calculateBam_max_flowIsValid();
        }
    }
    public function invalidateDependentOnBam_min_flow():void
    {
        if (model_internal::_bam_min_flowIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBam_min_flow = null;
            model_internal::calculateBam_min_flowIsValid();
        }
    }
    public function invalidateDependentOnBam_usage():void
    {
        if (model_internal::_bam_usageIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBam_usage = null;
            model_internal::calculateBam_usageIsValid();
        }
    }
    public function invalidateDependentOnBam_name():void
    {
        if (model_internal::_bam_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBam_name = null;
            model_internal::calculateBam_nameIsValid();
        }
    }
    public function invalidateDependentOnBam_code():void
    {
        if (model_internal::_bam_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBam_code = null;
            model_internal::calculateBam_codeIsValid();
        }
    }
    public function invalidateDependentOnBam_kdate_dmy():void
    {
        if (model_internal::_bam_kdate_dmyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBam_kdate_dmy = null;
            model_internal::calculateBam_kdate_dmyIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get ba_meter_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get ba_meter_nameValidator() : StyleValidator
    {
        return model_internal::_ba_meter_nameValidator;
    }

    model_internal function set _ba_meter_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_ba_meter_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_ba_meter_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ba_meter_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get ba_meter_nameIsValid():Boolean
    {
        if (!model_internal::_ba_meter_nameIsValidCacheInitialized)
        {
            model_internal::calculateBa_meter_nameIsValid();
        }

        return model_internal::_ba_meter_nameIsValid;
    }

    model_internal function calculateBa_meter_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_ba_meter_nameValidator.validate(model_internal::_instance.ba_meter_name)
        model_internal::_ba_meter_nameIsValid_der = (valRes.results == null);
        model_internal::_ba_meter_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::ba_meter_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::ba_meter_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get ba_meter_nameValidationFailureMessages():Array
    {
        if (model_internal::_ba_meter_nameValidationFailureMessages == null)
            model_internal::calculateBa_meter_nameIsValid();

        return _ba_meter_nameValidationFailureMessages;
    }

    model_internal function set ba_meter_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_ba_meter_nameValidationFailureMessages;

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
            model_internal::_ba_meter_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ba_meter_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get bam_kfaStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bam_kfaValidator() : StyleValidator
    {
        return model_internal::_bam_kfaValidator;
    }

    model_internal function set _bam_kfaIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bam_kfaIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bam_kfaIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_kfaIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bam_kfaIsValid():Boolean
    {
        if (!model_internal::_bam_kfaIsValidCacheInitialized)
        {
            model_internal::calculateBam_kfaIsValid();
        }

        return model_internal::_bam_kfaIsValid;
    }

    model_internal function calculateBam_kfaIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bam_kfaValidator.validate(model_internal::_instance.bam_kfa)
        model_internal::_bam_kfaIsValid_der = (valRes.results == null);
        model_internal::_bam_kfaIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bam_kfaValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bam_kfaValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bam_kfaValidationFailureMessages():Array
    {
        if (model_internal::_bam_kfaValidationFailureMessages == null)
            model_internal::calculateBam_kfaIsValid();

        return _bam_kfaValidationFailureMessages;
    }

    model_internal function set bam_kfaValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bam_kfaValidationFailureMessages;

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
            model_internal::_bam_kfaValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_kfaValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get bam_max_flowStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bam_max_flowValidator() : StyleValidator
    {
        return model_internal::_bam_max_flowValidator;
    }

    model_internal function set _bam_max_flowIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bam_max_flowIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bam_max_flowIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_max_flowIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bam_max_flowIsValid():Boolean
    {
        if (!model_internal::_bam_max_flowIsValidCacheInitialized)
        {
            model_internal::calculateBam_max_flowIsValid();
        }

        return model_internal::_bam_max_flowIsValid;
    }

    model_internal function calculateBam_max_flowIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bam_max_flowValidator.validate(model_internal::_instance.bam_max_flow)
        model_internal::_bam_max_flowIsValid_der = (valRes.results == null);
        model_internal::_bam_max_flowIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bam_max_flowValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bam_max_flowValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bam_max_flowValidationFailureMessages():Array
    {
        if (model_internal::_bam_max_flowValidationFailureMessages == null)
            model_internal::calculateBam_max_flowIsValid();

        return _bam_max_flowValidationFailureMessages;
    }

    model_internal function set bam_max_flowValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bam_max_flowValidationFailureMessages;

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
            model_internal::_bam_max_flowValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_max_flowValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get bam_min_flowStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bam_min_flowValidator() : StyleValidator
    {
        return model_internal::_bam_min_flowValidator;
    }

    model_internal function set _bam_min_flowIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bam_min_flowIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bam_min_flowIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_min_flowIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bam_min_flowIsValid():Boolean
    {
        if (!model_internal::_bam_min_flowIsValidCacheInitialized)
        {
            model_internal::calculateBam_min_flowIsValid();
        }

        return model_internal::_bam_min_flowIsValid;
    }

    model_internal function calculateBam_min_flowIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bam_min_flowValidator.validate(model_internal::_instance.bam_min_flow)
        model_internal::_bam_min_flowIsValid_der = (valRes.results == null);
        model_internal::_bam_min_flowIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bam_min_flowValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bam_min_flowValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bam_min_flowValidationFailureMessages():Array
    {
        if (model_internal::_bam_min_flowValidationFailureMessages == null)
            model_internal::calculateBam_min_flowIsValid();

        return _bam_min_flowValidationFailureMessages;
    }

    model_internal function set bam_min_flowValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bam_min_flowValidationFailureMessages;

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
            model_internal::_bam_min_flowValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_min_flowValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get bam_usageStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bam_usageValidator() : StyleValidator
    {
        return model_internal::_bam_usageValidator;
    }

    model_internal function set _bam_usageIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bam_usageIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bam_usageIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_usageIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bam_usageIsValid():Boolean
    {
        if (!model_internal::_bam_usageIsValidCacheInitialized)
        {
            model_internal::calculateBam_usageIsValid();
        }

        return model_internal::_bam_usageIsValid;
    }

    model_internal function calculateBam_usageIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bam_usageValidator.validate(model_internal::_instance.bam_usage)
        model_internal::_bam_usageIsValid_der = (valRes.results == null);
        model_internal::_bam_usageIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bam_usageValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bam_usageValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bam_usageValidationFailureMessages():Array
    {
        if (model_internal::_bam_usageValidationFailureMessages == null)
            model_internal::calculateBam_usageIsValid();

        return _bam_usageValidationFailureMessages;
    }

    model_internal function set bam_usageValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bam_usageValidationFailureMessages;

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
            model_internal::_bam_usageValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_usageValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get bam_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bam_nameValidator() : StyleValidator
    {
        return model_internal::_bam_nameValidator;
    }

    model_internal function set _bam_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bam_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bam_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bam_nameIsValid():Boolean
    {
        if (!model_internal::_bam_nameIsValidCacheInitialized)
        {
            model_internal::calculateBam_nameIsValid();
        }

        return model_internal::_bam_nameIsValid;
    }

    model_internal function calculateBam_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bam_nameValidator.validate(model_internal::_instance.bam_name)
        model_internal::_bam_nameIsValid_der = (valRes.results == null);
        model_internal::_bam_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bam_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bam_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bam_nameValidationFailureMessages():Array
    {
        if (model_internal::_bam_nameValidationFailureMessages == null)
            model_internal::calculateBam_nameIsValid();

        return _bam_nameValidationFailureMessages;
    }

    model_internal function set bam_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bam_nameValidationFailureMessages;

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
            model_internal::_bam_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get bam_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bam_codeValidator() : StyleValidator
    {
        return model_internal::_bam_codeValidator;
    }

    model_internal function set _bam_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bam_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bam_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bam_codeIsValid():Boolean
    {
        if (!model_internal::_bam_codeIsValidCacheInitialized)
        {
            model_internal::calculateBam_codeIsValid();
        }

        return model_internal::_bam_codeIsValid;
    }

    model_internal function calculateBam_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bam_codeValidator.validate(model_internal::_instance.bam_code)
        model_internal::_bam_codeIsValid_der = (valRes.results == null);
        model_internal::_bam_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bam_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bam_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bam_codeValidationFailureMessages():Array
    {
        if (model_internal::_bam_codeValidationFailureMessages == null)
            model_internal::calculateBam_codeIsValid();

        return _bam_codeValidationFailureMessages;
    }

    model_internal function set bam_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bam_codeValidationFailureMessages;

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
            model_internal::_bam_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get bam_kdate_dmyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bam_kdate_dmyValidator() : StyleValidator
    {
        return model_internal::_bam_kdate_dmyValidator;
    }

    model_internal function set _bam_kdate_dmyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bam_kdate_dmyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bam_kdate_dmyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_kdate_dmyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bam_kdate_dmyIsValid():Boolean
    {
        if (!model_internal::_bam_kdate_dmyIsValidCacheInitialized)
        {
            model_internal::calculateBam_kdate_dmyIsValid();
        }

        return model_internal::_bam_kdate_dmyIsValid;
    }

    model_internal function calculateBam_kdate_dmyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bam_kdate_dmyValidator.validate(model_internal::_instance.bam_kdate_dmy)
        model_internal::_bam_kdate_dmyIsValid_der = (valRes.results == null);
        model_internal::_bam_kdate_dmyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bam_kdate_dmyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bam_kdate_dmyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bam_kdate_dmyValidationFailureMessages():Array
    {
        if (model_internal::_bam_kdate_dmyValidationFailureMessages == null)
            model_internal::calculateBam_kdate_dmyIsValid();

        return _bam_kdate_dmyValidationFailureMessages;
    }

    model_internal function set bam_kdate_dmyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bam_kdate_dmyValidationFailureMessages;

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
            model_internal::_bam_kdate_dmyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bam_kdate_dmyValidationFailureMessages", oldValue, value));
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
            case("ba_meter_name"):
            {
                return ba_meter_nameValidationFailureMessages;
            }
            case("bam_kfa"):
            {
                return bam_kfaValidationFailureMessages;
            }
            case("bam_max_flow"):
            {
                return bam_max_flowValidationFailureMessages;
            }
            case("bam_min_flow"):
            {
                return bam_min_flowValidationFailureMessages;
            }
            case("bam_usage"):
            {
                return bam_usageValidationFailureMessages;
            }
            case("bam_name"):
            {
                return bam_nameValidationFailureMessages;
            }
            case("bam_code"):
            {
                return bam_codeValidationFailureMessages;
            }
            case("bam_kdate_dmy"):
            {
                return bam_kdate_dmyValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
