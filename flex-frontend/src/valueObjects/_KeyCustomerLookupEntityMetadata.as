
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
internal class _KeyCustomerLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("cust_cmpy_name", "cust_supp_code", "cust_cmpy_code", "cust_acnt", "cust_supp_name");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("cust_cmpy_name", "cust_supp_code", "cust_cmpy_code", "cust_acnt", "cust_supp_name");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("cust_cmpy_name", "cust_supp_code", "cust_cmpy_code", "cust_acnt", "cust_supp_name");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("cust_cmpy_name", "cust_supp_code", "cust_cmpy_code", "cust_acnt", "cust_supp_name");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("cust_cmpy_name", "cust_supp_code", "cust_cmpy_code", "cust_acnt", "cust_supp_name");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "KeyCustomerLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _cust_cmpy_nameIsValid:Boolean;
    model_internal var _cust_cmpy_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cust_cmpy_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _cust_cmpy_nameValidationFailureMessages:Array;
    
    model_internal var _cust_supp_codeIsValid:Boolean;
    model_internal var _cust_supp_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cust_supp_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _cust_supp_codeValidationFailureMessages:Array;
    
    model_internal var _cust_cmpy_codeIsValid:Boolean;
    model_internal var _cust_cmpy_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cust_cmpy_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _cust_cmpy_codeValidationFailureMessages:Array;
    
    model_internal var _cust_acntIsValid:Boolean;
    model_internal var _cust_acntValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cust_acntIsValidCacheInitialized:Boolean = false;
    model_internal var _cust_acntValidationFailureMessages:Array;
    
    model_internal var _cust_supp_nameIsValid:Boolean;
    model_internal var _cust_supp_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cust_supp_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _cust_supp_nameValidationFailureMessages:Array;

    model_internal var _instance:_Super_KeyCustomerLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _KeyCustomerLookupEntityMetadata(value : _Super_KeyCustomerLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["cust_cmpy_name"] = new Array();
            model_internal::dependentsOnMap["cust_supp_code"] = new Array();
            model_internal::dependentsOnMap["cust_cmpy_code"] = new Array();
            model_internal::dependentsOnMap["cust_acnt"] = new Array();
            model_internal::dependentsOnMap["cust_supp_name"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["cust_cmpy_name"] = "String";
        model_internal::propertyTypeMap["cust_supp_code"] = "String";
        model_internal::propertyTypeMap["cust_cmpy_code"] = "String";
        model_internal::propertyTypeMap["cust_acnt"] = "String";
        model_internal::propertyTypeMap["cust_supp_name"] = "String";

        model_internal::_instance = value;
        model_internal::_cust_cmpy_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCust_cmpy_name);
        model_internal::_cust_cmpy_nameValidator.required = true;
        model_internal::_cust_cmpy_nameValidator.requiredFieldError = "cust_cmpy_name is required";
        //model_internal::_cust_cmpy_nameValidator.source = model_internal::_instance;
        //model_internal::_cust_cmpy_nameValidator.property = "cust_cmpy_name";
        model_internal::_cust_supp_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCust_supp_code);
        model_internal::_cust_supp_codeValidator.required = true;
        model_internal::_cust_supp_codeValidator.requiredFieldError = "cust_supp_code is required";
        //model_internal::_cust_supp_codeValidator.source = model_internal::_instance;
        //model_internal::_cust_supp_codeValidator.property = "cust_supp_code";
        model_internal::_cust_cmpy_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCust_cmpy_code);
        model_internal::_cust_cmpy_codeValidator.required = true;
        model_internal::_cust_cmpy_codeValidator.requiredFieldError = "cust_cmpy_code is required";
        //model_internal::_cust_cmpy_codeValidator.source = model_internal::_instance;
        //model_internal::_cust_cmpy_codeValidator.property = "cust_cmpy_code";
        model_internal::_cust_acntValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCust_acnt);
        model_internal::_cust_acntValidator.required = true;
        model_internal::_cust_acntValidator.requiredFieldError = "cust_acnt is required";
        //model_internal::_cust_acntValidator.source = model_internal::_instance;
        //model_internal::_cust_acntValidator.property = "cust_acnt";
        model_internal::_cust_supp_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCust_supp_name);
        model_internal::_cust_supp_nameValidator.required = true;
        model_internal::_cust_supp_nameValidator.requiredFieldError = "cust_supp_name is required";
        //model_internal::_cust_supp_nameValidator.source = model_internal::_instance;
        //model_internal::_cust_supp_nameValidator.property = "cust_supp_name";
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
            throw new Error(propertyName + " is not a data property of entity KeyCustomerLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity KeyCustomerLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of KeyCustomerLookup");

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
            throw new Error(propertyName + " does not exist for entity KeyCustomerLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity KeyCustomerLookup");
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
            throw new Error(propertyName + " does not exist for entity KeyCustomerLookup");
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
    public function get isCust_cmpy_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCust_supp_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCust_cmpy_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCust_acntAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCust_supp_nameAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnCust_cmpy_name():void
    {
        if (model_internal::_cust_cmpy_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCust_cmpy_name = null;
            model_internal::calculateCust_cmpy_nameIsValid();
        }
    }
    public function invalidateDependentOnCust_supp_code():void
    {
        if (model_internal::_cust_supp_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCust_supp_code = null;
            model_internal::calculateCust_supp_codeIsValid();
        }
    }
    public function invalidateDependentOnCust_cmpy_code():void
    {
        if (model_internal::_cust_cmpy_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCust_cmpy_code = null;
            model_internal::calculateCust_cmpy_codeIsValid();
        }
    }
    public function invalidateDependentOnCust_acnt():void
    {
        if (model_internal::_cust_acntIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCust_acnt = null;
            model_internal::calculateCust_acntIsValid();
        }
    }
    public function invalidateDependentOnCust_supp_name():void
    {
        if (model_internal::_cust_supp_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCust_supp_name = null;
            model_internal::calculateCust_supp_nameIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get cust_cmpy_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cust_cmpy_nameValidator() : StyleValidator
    {
        return model_internal::_cust_cmpy_nameValidator;
    }

    model_internal function set _cust_cmpy_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cust_cmpy_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cust_cmpy_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cust_cmpy_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cust_cmpy_nameIsValid():Boolean
    {
        if (!model_internal::_cust_cmpy_nameIsValidCacheInitialized)
        {
            model_internal::calculateCust_cmpy_nameIsValid();
        }

        return model_internal::_cust_cmpy_nameIsValid;
    }

    model_internal function calculateCust_cmpy_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cust_cmpy_nameValidator.validate(model_internal::_instance.cust_cmpy_name)
        model_internal::_cust_cmpy_nameIsValid_der = (valRes.results == null);
        model_internal::_cust_cmpy_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cust_cmpy_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cust_cmpy_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cust_cmpy_nameValidationFailureMessages():Array
    {
        if (model_internal::_cust_cmpy_nameValidationFailureMessages == null)
            model_internal::calculateCust_cmpy_nameIsValid();

        return _cust_cmpy_nameValidationFailureMessages;
    }

    model_internal function set cust_cmpy_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cust_cmpy_nameValidationFailureMessages;

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
            model_internal::_cust_cmpy_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cust_cmpy_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cust_supp_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cust_supp_codeValidator() : StyleValidator
    {
        return model_internal::_cust_supp_codeValidator;
    }

    model_internal function set _cust_supp_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cust_supp_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cust_supp_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cust_supp_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cust_supp_codeIsValid():Boolean
    {
        if (!model_internal::_cust_supp_codeIsValidCacheInitialized)
        {
            model_internal::calculateCust_supp_codeIsValid();
        }

        return model_internal::_cust_supp_codeIsValid;
    }

    model_internal function calculateCust_supp_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cust_supp_codeValidator.validate(model_internal::_instance.cust_supp_code)
        model_internal::_cust_supp_codeIsValid_der = (valRes.results == null);
        model_internal::_cust_supp_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cust_supp_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cust_supp_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cust_supp_codeValidationFailureMessages():Array
    {
        if (model_internal::_cust_supp_codeValidationFailureMessages == null)
            model_internal::calculateCust_supp_codeIsValid();

        return _cust_supp_codeValidationFailureMessages;
    }

    model_internal function set cust_supp_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cust_supp_codeValidationFailureMessages;

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
            model_internal::_cust_supp_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cust_supp_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cust_cmpy_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cust_cmpy_codeValidator() : StyleValidator
    {
        return model_internal::_cust_cmpy_codeValidator;
    }

    model_internal function set _cust_cmpy_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cust_cmpy_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cust_cmpy_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cust_cmpy_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cust_cmpy_codeIsValid():Boolean
    {
        if (!model_internal::_cust_cmpy_codeIsValidCacheInitialized)
        {
            model_internal::calculateCust_cmpy_codeIsValid();
        }

        return model_internal::_cust_cmpy_codeIsValid;
    }

    model_internal function calculateCust_cmpy_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cust_cmpy_codeValidator.validate(model_internal::_instance.cust_cmpy_code)
        model_internal::_cust_cmpy_codeIsValid_der = (valRes.results == null);
        model_internal::_cust_cmpy_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cust_cmpy_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cust_cmpy_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cust_cmpy_codeValidationFailureMessages():Array
    {
        if (model_internal::_cust_cmpy_codeValidationFailureMessages == null)
            model_internal::calculateCust_cmpy_codeIsValid();

        return _cust_cmpy_codeValidationFailureMessages;
    }

    model_internal function set cust_cmpy_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cust_cmpy_codeValidationFailureMessages;

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
            model_internal::_cust_cmpy_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cust_cmpy_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cust_acntStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cust_acntValidator() : StyleValidator
    {
        return model_internal::_cust_acntValidator;
    }

    model_internal function set _cust_acntIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cust_acntIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cust_acntIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cust_acntIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cust_acntIsValid():Boolean
    {
        if (!model_internal::_cust_acntIsValidCacheInitialized)
        {
            model_internal::calculateCust_acntIsValid();
        }

        return model_internal::_cust_acntIsValid;
    }

    model_internal function calculateCust_acntIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cust_acntValidator.validate(model_internal::_instance.cust_acnt)
        model_internal::_cust_acntIsValid_der = (valRes.results == null);
        model_internal::_cust_acntIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cust_acntValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cust_acntValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cust_acntValidationFailureMessages():Array
    {
        if (model_internal::_cust_acntValidationFailureMessages == null)
            model_internal::calculateCust_acntIsValid();

        return _cust_acntValidationFailureMessages;
    }

    model_internal function set cust_acntValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cust_acntValidationFailureMessages;

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
            model_internal::_cust_acntValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cust_acntValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cust_supp_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cust_supp_nameValidator() : StyleValidator
    {
        return model_internal::_cust_supp_nameValidator;
    }

    model_internal function set _cust_supp_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cust_supp_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cust_supp_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cust_supp_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cust_supp_nameIsValid():Boolean
    {
        if (!model_internal::_cust_supp_nameIsValidCacheInitialized)
        {
            model_internal::calculateCust_supp_nameIsValid();
        }

        return model_internal::_cust_supp_nameIsValid;
    }

    model_internal function calculateCust_supp_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cust_supp_nameValidator.validate(model_internal::_instance.cust_supp_name)
        model_internal::_cust_supp_nameIsValid_der = (valRes.results == null);
        model_internal::_cust_supp_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cust_supp_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cust_supp_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cust_supp_nameValidationFailureMessages():Array
    {
        if (model_internal::_cust_supp_nameValidationFailureMessages == null)
            model_internal::calculateCust_supp_nameIsValid();

        return _cust_supp_nameValidationFailureMessages;
    }

    model_internal function set cust_supp_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cust_supp_nameValidationFailureMessages;

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
            model_internal::_cust_supp_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cust_supp_nameValidationFailureMessages", oldValue, value));
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
            case("cust_cmpy_name"):
            {
                return cust_cmpy_nameValidationFailureMessages;
            }
            case("cust_supp_code"):
            {
                return cust_supp_codeValidationFailureMessages;
            }
            case("cust_cmpy_code"):
            {
                return cust_cmpy_codeValidationFailureMessages;
            }
            case("cust_acnt"):
            {
                return cust_acntValidationFailureMessages;
            }
            case("cust_supp_name"):
            {
                return cust_supp_nameValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
