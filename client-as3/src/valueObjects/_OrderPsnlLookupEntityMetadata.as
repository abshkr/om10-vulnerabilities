
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
internal class _OrderPsnlLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("psnl_cmpy_code", "psnl_role", "psnl_code", "psnl_dept", "psnl_name", "psnl_cmpy_name");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("psnl_cmpy_code", "psnl_role", "psnl_code", "psnl_dept", "psnl_name", "psnl_cmpy_name");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("psnl_cmpy_code", "psnl_role", "psnl_code", "psnl_dept", "psnl_name", "psnl_cmpy_name");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("psnl_cmpy_code", "psnl_role", "psnl_code", "psnl_dept", "psnl_name", "psnl_cmpy_name");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("psnl_cmpy_code", "psnl_role", "psnl_code", "psnl_dept", "psnl_name", "psnl_cmpy_name");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "OrderPsnlLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _psnl_cmpy_codeIsValid:Boolean;
    model_internal var _psnl_cmpy_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _psnl_cmpy_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _psnl_cmpy_codeValidationFailureMessages:Array;
    
    model_internal var _psnl_roleIsValid:Boolean;
    model_internal var _psnl_roleValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _psnl_roleIsValidCacheInitialized:Boolean = false;
    model_internal var _psnl_roleValidationFailureMessages:Array;
    
    model_internal var _psnl_codeIsValid:Boolean;
    model_internal var _psnl_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _psnl_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _psnl_codeValidationFailureMessages:Array;
    
    model_internal var _psnl_deptIsValid:Boolean;
    model_internal var _psnl_deptValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _psnl_deptIsValidCacheInitialized:Boolean = false;
    model_internal var _psnl_deptValidationFailureMessages:Array;
    
    model_internal var _psnl_nameIsValid:Boolean;
    model_internal var _psnl_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _psnl_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _psnl_nameValidationFailureMessages:Array;
    
    model_internal var _psnl_cmpy_nameIsValid:Boolean;
    model_internal var _psnl_cmpy_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _psnl_cmpy_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _psnl_cmpy_nameValidationFailureMessages:Array;

    model_internal var _instance:_Super_OrderPsnlLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _OrderPsnlLookupEntityMetadata(value : _Super_OrderPsnlLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["psnl_cmpy_code"] = new Array();
            model_internal::dependentsOnMap["psnl_role"] = new Array();
            model_internal::dependentsOnMap["psnl_code"] = new Array();
            model_internal::dependentsOnMap["psnl_dept"] = new Array();
            model_internal::dependentsOnMap["psnl_name"] = new Array();
            model_internal::dependentsOnMap["psnl_cmpy_name"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["psnl_cmpy_code"] = "String";
        model_internal::propertyTypeMap["psnl_role"] = "String";
        model_internal::propertyTypeMap["psnl_code"] = "String";
        model_internal::propertyTypeMap["psnl_dept"] = "String";
        model_internal::propertyTypeMap["psnl_name"] = "String";
        model_internal::propertyTypeMap["psnl_cmpy_name"] = "String";

        model_internal::_instance = value;
        model_internal::_psnl_cmpy_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPsnl_cmpy_code);
        model_internal::_psnl_cmpy_codeValidator.required = true;
        model_internal::_psnl_cmpy_codeValidator.requiredFieldError = "psnl_cmpy_code is required";
        //model_internal::_psnl_cmpy_codeValidator.source = model_internal::_instance;
        //model_internal::_psnl_cmpy_codeValidator.property = "psnl_cmpy_code";
        model_internal::_psnl_roleValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPsnl_role);
        model_internal::_psnl_roleValidator.required = true;
        model_internal::_psnl_roleValidator.requiredFieldError = "psnl_role is required";
        //model_internal::_psnl_roleValidator.source = model_internal::_instance;
        //model_internal::_psnl_roleValidator.property = "psnl_role";
        model_internal::_psnl_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPsnl_code);
        model_internal::_psnl_codeValidator.required = true;
        model_internal::_psnl_codeValidator.requiredFieldError = "psnl_code is required";
        //model_internal::_psnl_codeValidator.source = model_internal::_instance;
        //model_internal::_psnl_codeValidator.property = "psnl_code";
        model_internal::_psnl_deptValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPsnl_dept);
        model_internal::_psnl_deptValidator.required = true;
        model_internal::_psnl_deptValidator.requiredFieldError = "psnl_dept is required";
        //model_internal::_psnl_deptValidator.source = model_internal::_instance;
        //model_internal::_psnl_deptValidator.property = "psnl_dept";
        model_internal::_psnl_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPsnl_name);
        model_internal::_psnl_nameValidator.required = true;
        model_internal::_psnl_nameValidator.requiredFieldError = "psnl_name is required";
        //model_internal::_psnl_nameValidator.source = model_internal::_instance;
        //model_internal::_psnl_nameValidator.property = "psnl_name";
        model_internal::_psnl_cmpy_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPsnl_cmpy_name);
        model_internal::_psnl_cmpy_nameValidator.required = true;
        model_internal::_psnl_cmpy_nameValidator.requiredFieldError = "psnl_cmpy_name is required";
        //model_internal::_psnl_cmpy_nameValidator.source = model_internal::_instance;
        //model_internal::_psnl_cmpy_nameValidator.property = "psnl_cmpy_name";
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
            throw new Error(propertyName + " is not a data property of entity OrderPsnlLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity OrderPsnlLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of OrderPsnlLookup");

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
            throw new Error(propertyName + " does not exist for entity OrderPsnlLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity OrderPsnlLookup");
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
            throw new Error(propertyName + " does not exist for entity OrderPsnlLookup");
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
    public function get isPsnl_cmpy_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPsnl_roleAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPsnl_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPsnl_deptAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPsnl_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPsnl_cmpy_nameAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnPsnl_cmpy_code():void
    {
        if (model_internal::_psnl_cmpy_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPsnl_cmpy_code = null;
            model_internal::calculatePsnl_cmpy_codeIsValid();
        }
    }
    public function invalidateDependentOnPsnl_role():void
    {
        if (model_internal::_psnl_roleIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPsnl_role = null;
            model_internal::calculatePsnl_roleIsValid();
        }
    }
    public function invalidateDependentOnPsnl_code():void
    {
        if (model_internal::_psnl_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPsnl_code = null;
            model_internal::calculatePsnl_codeIsValid();
        }
    }
    public function invalidateDependentOnPsnl_dept():void
    {
        if (model_internal::_psnl_deptIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPsnl_dept = null;
            model_internal::calculatePsnl_deptIsValid();
        }
    }
    public function invalidateDependentOnPsnl_name():void
    {
        if (model_internal::_psnl_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPsnl_name = null;
            model_internal::calculatePsnl_nameIsValid();
        }
    }
    public function invalidateDependentOnPsnl_cmpy_name():void
    {
        if (model_internal::_psnl_cmpy_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPsnl_cmpy_name = null;
            model_internal::calculatePsnl_cmpy_nameIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get psnl_cmpy_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get psnl_cmpy_codeValidator() : StyleValidator
    {
        return model_internal::_psnl_cmpy_codeValidator;
    }

    model_internal function set _psnl_cmpy_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_psnl_cmpy_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_psnl_cmpy_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_cmpy_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get psnl_cmpy_codeIsValid():Boolean
    {
        if (!model_internal::_psnl_cmpy_codeIsValidCacheInitialized)
        {
            model_internal::calculatePsnl_cmpy_codeIsValid();
        }

        return model_internal::_psnl_cmpy_codeIsValid;
    }

    model_internal function calculatePsnl_cmpy_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_psnl_cmpy_codeValidator.validate(model_internal::_instance.psnl_cmpy_code)
        model_internal::_psnl_cmpy_codeIsValid_der = (valRes.results == null);
        model_internal::_psnl_cmpy_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::psnl_cmpy_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::psnl_cmpy_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get psnl_cmpy_codeValidationFailureMessages():Array
    {
        if (model_internal::_psnl_cmpy_codeValidationFailureMessages == null)
            model_internal::calculatePsnl_cmpy_codeIsValid();

        return _psnl_cmpy_codeValidationFailureMessages;
    }

    model_internal function set psnl_cmpy_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_psnl_cmpy_codeValidationFailureMessages;

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
            model_internal::_psnl_cmpy_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_cmpy_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get psnl_roleStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get psnl_roleValidator() : StyleValidator
    {
        return model_internal::_psnl_roleValidator;
    }

    model_internal function set _psnl_roleIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_psnl_roleIsValid;         
        if (oldValue !== value)
        {
            model_internal::_psnl_roleIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_roleIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get psnl_roleIsValid():Boolean
    {
        if (!model_internal::_psnl_roleIsValidCacheInitialized)
        {
            model_internal::calculatePsnl_roleIsValid();
        }

        return model_internal::_psnl_roleIsValid;
    }

    model_internal function calculatePsnl_roleIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_psnl_roleValidator.validate(model_internal::_instance.psnl_role)
        model_internal::_psnl_roleIsValid_der = (valRes.results == null);
        model_internal::_psnl_roleIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::psnl_roleValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::psnl_roleValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get psnl_roleValidationFailureMessages():Array
    {
        if (model_internal::_psnl_roleValidationFailureMessages == null)
            model_internal::calculatePsnl_roleIsValid();

        return _psnl_roleValidationFailureMessages;
    }

    model_internal function set psnl_roleValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_psnl_roleValidationFailureMessages;

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
            model_internal::_psnl_roleValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_roleValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get psnl_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get psnl_codeValidator() : StyleValidator
    {
        return model_internal::_psnl_codeValidator;
    }

    model_internal function set _psnl_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_psnl_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_psnl_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get psnl_codeIsValid():Boolean
    {
        if (!model_internal::_psnl_codeIsValidCacheInitialized)
        {
            model_internal::calculatePsnl_codeIsValid();
        }

        return model_internal::_psnl_codeIsValid;
    }

    model_internal function calculatePsnl_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_psnl_codeValidator.validate(model_internal::_instance.psnl_code)
        model_internal::_psnl_codeIsValid_der = (valRes.results == null);
        model_internal::_psnl_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::psnl_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::psnl_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get psnl_codeValidationFailureMessages():Array
    {
        if (model_internal::_psnl_codeValidationFailureMessages == null)
            model_internal::calculatePsnl_codeIsValid();

        return _psnl_codeValidationFailureMessages;
    }

    model_internal function set psnl_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_psnl_codeValidationFailureMessages;

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
            model_internal::_psnl_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get psnl_deptStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get psnl_deptValidator() : StyleValidator
    {
        return model_internal::_psnl_deptValidator;
    }

    model_internal function set _psnl_deptIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_psnl_deptIsValid;         
        if (oldValue !== value)
        {
            model_internal::_psnl_deptIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_deptIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get psnl_deptIsValid():Boolean
    {
        if (!model_internal::_psnl_deptIsValidCacheInitialized)
        {
            model_internal::calculatePsnl_deptIsValid();
        }

        return model_internal::_psnl_deptIsValid;
    }

    model_internal function calculatePsnl_deptIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_psnl_deptValidator.validate(model_internal::_instance.psnl_dept)
        model_internal::_psnl_deptIsValid_der = (valRes.results == null);
        model_internal::_psnl_deptIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::psnl_deptValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::psnl_deptValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get psnl_deptValidationFailureMessages():Array
    {
        if (model_internal::_psnl_deptValidationFailureMessages == null)
            model_internal::calculatePsnl_deptIsValid();

        return _psnl_deptValidationFailureMessages;
    }

    model_internal function set psnl_deptValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_psnl_deptValidationFailureMessages;

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
            model_internal::_psnl_deptValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_deptValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get psnl_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get psnl_nameValidator() : StyleValidator
    {
        return model_internal::_psnl_nameValidator;
    }

    model_internal function set _psnl_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_psnl_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_psnl_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get psnl_nameIsValid():Boolean
    {
        if (!model_internal::_psnl_nameIsValidCacheInitialized)
        {
            model_internal::calculatePsnl_nameIsValid();
        }

        return model_internal::_psnl_nameIsValid;
    }

    model_internal function calculatePsnl_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_psnl_nameValidator.validate(model_internal::_instance.psnl_name)
        model_internal::_psnl_nameIsValid_der = (valRes.results == null);
        model_internal::_psnl_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::psnl_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::psnl_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get psnl_nameValidationFailureMessages():Array
    {
        if (model_internal::_psnl_nameValidationFailureMessages == null)
            model_internal::calculatePsnl_nameIsValid();

        return _psnl_nameValidationFailureMessages;
    }

    model_internal function set psnl_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_psnl_nameValidationFailureMessages;

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
            model_internal::_psnl_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get psnl_cmpy_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get psnl_cmpy_nameValidator() : StyleValidator
    {
        return model_internal::_psnl_cmpy_nameValidator;
    }

    model_internal function set _psnl_cmpy_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_psnl_cmpy_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_psnl_cmpy_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_cmpy_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get psnl_cmpy_nameIsValid():Boolean
    {
        if (!model_internal::_psnl_cmpy_nameIsValidCacheInitialized)
        {
            model_internal::calculatePsnl_cmpy_nameIsValid();
        }

        return model_internal::_psnl_cmpy_nameIsValid;
    }

    model_internal function calculatePsnl_cmpy_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_psnl_cmpy_nameValidator.validate(model_internal::_instance.psnl_cmpy_name)
        model_internal::_psnl_cmpy_nameIsValid_der = (valRes.results == null);
        model_internal::_psnl_cmpy_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::psnl_cmpy_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::psnl_cmpy_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get psnl_cmpy_nameValidationFailureMessages():Array
    {
        if (model_internal::_psnl_cmpy_nameValidationFailureMessages == null)
            model_internal::calculatePsnl_cmpy_nameIsValid();

        return _psnl_cmpy_nameValidationFailureMessages;
    }

    model_internal function set psnl_cmpy_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_psnl_cmpy_nameValidationFailureMessages;

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
            model_internal::_psnl_cmpy_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "psnl_cmpy_nameValidationFailureMessages", oldValue, value));
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
            case("psnl_cmpy_code"):
            {
                return psnl_cmpy_codeValidationFailureMessages;
            }
            case("psnl_role"):
            {
                return psnl_roleValidationFailureMessages;
            }
            case("psnl_code"):
            {
                return psnl_codeValidationFailureMessages;
            }
            case("psnl_dept"):
            {
                return psnl_deptValidationFailureMessages;
            }
            case("psnl_name"):
            {
                return psnl_nameValidationFailureMessages;
            }
            case("psnl_cmpy_name"):
            {
                return psnl_cmpy_nameValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
