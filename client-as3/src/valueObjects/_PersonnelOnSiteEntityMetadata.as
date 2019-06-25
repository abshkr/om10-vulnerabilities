
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
internal class _PersonnelOnSiteEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("per_area", "per_name", "per_code", "per_enter_time", "cmpy_name");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("per_area", "per_name", "per_code", "per_enter_time", "cmpy_name");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("per_area", "per_name", "per_code", "per_enter_time", "cmpy_name");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("per_area", "per_name", "per_code", "per_enter_time", "cmpy_name");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("per_area", "per_name", "per_code", "per_enter_time", "cmpy_name");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "PersonnelOnSite";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _per_areaIsValid:Boolean;
    model_internal var _per_areaValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _per_areaIsValidCacheInitialized:Boolean = false;
    model_internal var _per_areaValidationFailureMessages:Array;
    
    model_internal var _per_nameIsValid:Boolean;
    model_internal var _per_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _per_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _per_nameValidationFailureMessages:Array;
    
    model_internal var _per_codeIsValid:Boolean;
    model_internal var _per_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _per_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _per_codeValidationFailureMessages:Array;
    
    model_internal var _per_enter_timeIsValid:Boolean;
    model_internal var _per_enter_timeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _per_enter_timeIsValidCacheInitialized:Boolean = false;
    model_internal var _per_enter_timeValidationFailureMessages:Array;
    
    model_internal var _cmpy_nameIsValid:Boolean;
    model_internal var _cmpy_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_nameValidationFailureMessages:Array;

    model_internal var _instance:_Super_PersonnelOnSite;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _PersonnelOnSiteEntityMetadata(value : _Super_PersonnelOnSite)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["per_area"] = new Array();
            model_internal::dependentsOnMap["per_name"] = new Array();
            model_internal::dependentsOnMap["per_code"] = new Array();
            model_internal::dependentsOnMap["per_enter_time"] = new Array();
            model_internal::dependentsOnMap["cmpy_name"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["per_area"] = "String";
        model_internal::propertyTypeMap["per_name"] = "String";
        model_internal::propertyTypeMap["per_code"] = "String";
        model_internal::propertyTypeMap["per_enter_time"] = "String";
        model_internal::propertyTypeMap["cmpy_name"] = "String";

        model_internal::_instance = value;
        model_internal::_per_areaValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPer_area);
        model_internal::_per_areaValidator.required = true;
        model_internal::_per_areaValidator.requiredFieldError = "per_area is required";
        //model_internal::_per_areaValidator.source = model_internal::_instance;
        //model_internal::_per_areaValidator.property = "per_area";
        model_internal::_per_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPer_name);
        model_internal::_per_nameValidator.required = true;
        model_internal::_per_nameValidator.requiredFieldError = "per_name is required";
        //model_internal::_per_nameValidator.source = model_internal::_instance;
        //model_internal::_per_nameValidator.property = "per_name";
        model_internal::_per_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPer_code);
        model_internal::_per_codeValidator.required = true;
        model_internal::_per_codeValidator.requiredFieldError = "per_code is required";
        //model_internal::_per_codeValidator.source = model_internal::_instance;
        //model_internal::_per_codeValidator.property = "per_code";
        model_internal::_per_enter_timeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPer_enter_time);
        model_internal::_per_enter_timeValidator.required = true;
        model_internal::_per_enter_timeValidator.requiredFieldError = "per_enter_time is required";
        //model_internal::_per_enter_timeValidator.source = model_internal::_instance;
        //model_internal::_per_enter_timeValidator.property = "per_enter_time";
        model_internal::_cmpy_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_name);
        model_internal::_cmpy_nameValidator.required = true;
        model_internal::_cmpy_nameValidator.requiredFieldError = "cmpy_name is required";
        //model_internal::_cmpy_nameValidator.source = model_internal::_instance;
        //model_internal::_cmpy_nameValidator.property = "cmpy_name";
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
            throw new Error(propertyName + " is not a data property of entity PersonnelOnSite");
            
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
            throw new Error(propertyName + " is not a collection property of entity PersonnelOnSite");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of PersonnelOnSite");

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
            throw new Error(propertyName + " does not exist for entity PersonnelOnSite");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity PersonnelOnSite");
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
            throw new Error(propertyName + " does not exist for entity PersonnelOnSite");
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
    public function get isPer_areaAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPer_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPer_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPer_enter_timeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_nameAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnPer_area():void
    {
        if (model_internal::_per_areaIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPer_area = null;
            model_internal::calculatePer_areaIsValid();
        }
    }
    public function invalidateDependentOnPer_name():void
    {
        if (model_internal::_per_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPer_name = null;
            model_internal::calculatePer_nameIsValid();
        }
    }
    public function invalidateDependentOnPer_code():void
    {
        if (model_internal::_per_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPer_code = null;
            model_internal::calculatePer_codeIsValid();
        }
    }
    public function invalidateDependentOnPer_enter_time():void
    {
        if (model_internal::_per_enter_timeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPer_enter_time = null;
            model_internal::calculatePer_enter_timeIsValid();
        }
    }
    public function invalidateDependentOnCmpy_name():void
    {
        if (model_internal::_cmpy_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_name = null;
            model_internal::calculateCmpy_nameIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get per_areaStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get per_areaValidator() : StyleValidator
    {
        return model_internal::_per_areaValidator;
    }

    model_internal function set _per_areaIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_per_areaIsValid;         
        if (oldValue !== value)
        {
            model_internal::_per_areaIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "per_areaIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get per_areaIsValid():Boolean
    {
        if (!model_internal::_per_areaIsValidCacheInitialized)
        {
            model_internal::calculatePer_areaIsValid();
        }

        return model_internal::_per_areaIsValid;
    }

    model_internal function calculatePer_areaIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_per_areaValidator.validate(model_internal::_instance.per_area)
        model_internal::_per_areaIsValid_der = (valRes.results == null);
        model_internal::_per_areaIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::per_areaValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::per_areaValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get per_areaValidationFailureMessages():Array
    {
        if (model_internal::_per_areaValidationFailureMessages == null)
            model_internal::calculatePer_areaIsValid();

        return _per_areaValidationFailureMessages;
    }

    model_internal function set per_areaValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_per_areaValidationFailureMessages;

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
            model_internal::_per_areaValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "per_areaValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get per_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get per_nameValidator() : StyleValidator
    {
        return model_internal::_per_nameValidator;
    }

    model_internal function set _per_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_per_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_per_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "per_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get per_nameIsValid():Boolean
    {
        if (!model_internal::_per_nameIsValidCacheInitialized)
        {
            model_internal::calculatePer_nameIsValid();
        }

        return model_internal::_per_nameIsValid;
    }

    model_internal function calculatePer_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_per_nameValidator.validate(model_internal::_instance.per_name)
        model_internal::_per_nameIsValid_der = (valRes.results == null);
        model_internal::_per_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::per_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::per_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get per_nameValidationFailureMessages():Array
    {
        if (model_internal::_per_nameValidationFailureMessages == null)
            model_internal::calculatePer_nameIsValid();

        return _per_nameValidationFailureMessages;
    }

    model_internal function set per_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_per_nameValidationFailureMessages;

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
            model_internal::_per_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "per_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get per_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get per_codeValidator() : StyleValidator
    {
        return model_internal::_per_codeValidator;
    }

    model_internal function set _per_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_per_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_per_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "per_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get per_codeIsValid():Boolean
    {
        if (!model_internal::_per_codeIsValidCacheInitialized)
        {
            model_internal::calculatePer_codeIsValid();
        }

        return model_internal::_per_codeIsValid;
    }

    model_internal function calculatePer_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_per_codeValidator.validate(model_internal::_instance.per_code)
        model_internal::_per_codeIsValid_der = (valRes.results == null);
        model_internal::_per_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::per_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::per_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get per_codeValidationFailureMessages():Array
    {
        if (model_internal::_per_codeValidationFailureMessages == null)
            model_internal::calculatePer_codeIsValid();

        return _per_codeValidationFailureMessages;
    }

    model_internal function set per_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_per_codeValidationFailureMessages;

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
            model_internal::_per_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "per_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get per_enter_timeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get per_enter_timeValidator() : StyleValidator
    {
        return model_internal::_per_enter_timeValidator;
    }

    model_internal function set _per_enter_timeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_per_enter_timeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_per_enter_timeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "per_enter_timeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get per_enter_timeIsValid():Boolean
    {
        if (!model_internal::_per_enter_timeIsValidCacheInitialized)
        {
            model_internal::calculatePer_enter_timeIsValid();
        }

        return model_internal::_per_enter_timeIsValid;
    }

    model_internal function calculatePer_enter_timeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_per_enter_timeValidator.validate(model_internal::_instance.per_enter_time)
        model_internal::_per_enter_timeIsValid_der = (valRes.results == null);
        model_internal::_per_enter_timeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::per_enter_timeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::per_enter_timeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get per_enter_timeValidationFailureMessages():Array
    {
        if (model_internal::_per_enter_timeValidationFailureMessages == null)
            model_internal::calculatePer_enter_timeIsValid();

        return _per_enter_timeValidationFailureMessages;
    }

    model_internal function set per_enter_timeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_per_enter_timeValidationFailureMessages;

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
            model_internal::_per_enter_timeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "per_enter_timeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_nameValidator() : StyleValidator
    {
        return model_internal::_cmpy_nameValidator;
    }

    model_internal function set _cmpy_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_nameIsValid():Boolean
    {
        if (!model_internal::_cmpy_nameIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_nameIsValid();
        }

        return model_internal::_cmpy_nameIsValid;
    }

    model_internal function calculateCmpy_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_nameValidator.validate(model_internal::_instance.cmpy_name)
        model_internal::_cmpy_nameIsValid_der = (valRes.results == null);
        model_internal::_cmpy_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_nameValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_nameValidationFailureMessages == null)
            model_internal::calculateCmpy_nameIsValid();

        return _cmpy_nameValidationFailureMessages;
    }

    model_internal function set cmpy_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_nameValidationFailureMessages;

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
            model_internal::_cmpy_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_nameValidationFailureMessages", oldValue, value));
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
            case("per_area"):
            {
                return per_areaValidationFailureMessages;
            }
            case("per_name"):
            {
                return per_nameValidationFailureMessages;
            }
            case("per_code"):
            {
                return per_codeValidationFailureMessages;
            }
            case("per_enter_time"):
            {
                return per_enter_timeValidationFailureMessages;
            }
            case("cmpy_name"):
            {
                return cmpy_nameValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
