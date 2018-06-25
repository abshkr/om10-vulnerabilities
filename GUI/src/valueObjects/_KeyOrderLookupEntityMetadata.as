
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
internal class _KeyOrderLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("order_cust_code", "order_cust_no", "order_desc", "order_cust_name", "order_supp_name", "order_supp_code", "order_cust_acnt", "order_id");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("order_cust_code", "order_cust_no", "order_desc", "order_cust_name", "order_supp_name", "order_supp_code", "order_cust_acnt", "order_id");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("order_cust_code", "order_cust_no", "order_desc", "order_cust_name", "order_supp_name", "order_supp_code", "order_cust_acnt", "order_id");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("order_cust_code", "order_cust_no", "order_desc", "order_cust_name", "order_supp_name", "order_supp_code", "order_cust_acnt", "order_id");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("order_cust_code", "order_cust_no", "order_desc", "order_cust_name", "order_supp_name", "order_supp_code", "order_cust_acnt", "order_id");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "KeyOrderLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _order_cust_codeIsValid:Boolean;
    model_internal var _order_cust_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_cust_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_cust_codeValidationFailureMessages:Array;
    
    model_internal var _order_cust_noIsValid:Boolean;
    model_internal var _order_cust_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_cust_noIsValidCacheInitialized:Boolean = false;
    model_internal var _order_cust_noValidationFailureMessages:Array;
    
    model_internal var _order_descIsValid:Boolean;
    model_internal var _order_descValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_descIsValidCacheInitialized:Boolean = false;
    model_internal var _order_descValidationFailureMessages:Array;
    
    model_internal var _order_cust_nameIsValid:Boolean;
    model_internal var _order_cust_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_cust_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _order_cust_nameValidationFailureMessages:Array;
    
    model_internal var _order_supp_nameIsValid:Boolean;
    model_internal var _order_supp_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_supp_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _order_supp_nameValidationFailureMessages:Array;
    
    model_internal var _order_supp_codeIsValid:Boolean;
    model_internal var _order_supp_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_supp_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_supp_codeValidationFailureMessages:Array;
    
    model_internal var _order_cust_acntIsValid:Boolean;
    model_internal var _order_cust_acntValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_cust_acntIsValidCacheInitialized:Boolean = false;
    model_internal var _order_cust_acntValidationFailureMessages:Array;
    
    model_internal var _order_idIsValid:Boolean;
    model_internal var _order_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_idIsValidCacheInitialized:Boolean = false;
    model_internal var _order_idValidationFailureMessages:Array;

    model_internal var _instance:_Super_KeyOrderLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _KeyOrderLookupEntityMetadata(value : _Super_KeyOrderLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["order_cust_code"] = new Array();
            model_internal::dependentsOnMap["order_cust_no"] = new Array();
            model_internal::dependentsOnMap["order_desc"] = new Array();
            model_internal::dependentsOnMap["order_cust_name"] = new Array();
            model_internal::dependentsOnMap["order_supp_name"] = new Array();
            model_internal::dependentsOnMap["order_supp_code"] = new Array();
            model_internal::dependentsOnMap["order_cust_acnt"] = new Array();
            model_internal::dependentsOnMap["order_id"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["order_cust_code"] = "String";
        model_internal::propertyTypeMap["order_cust_no"] = "String";
        model_internal::propertyTypeMap["order_desc"] = "String";
        model_internal::propertyTypeMap["order_cust_name"] = "String";
        model_internal::propertyTypeMap["order_supp_name"] = "String";
        model_internal::propertyTypeMap["order_supp_code"] = "String";
        model_internal::propertyTypeMap["order_cust_acnt"] = "String";
        model_internal::propertyTypeMap["order_id"] = "String";

        model_internal::_instance = value;
        model_internal::_order_cust_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_cust_code);
        model_internal::_order_cust_codeValidator.required = true;
        model_internal::_order_cust_codeValidator.requiredFieldError = "order_cust_code is required";
        //model_internal::_order_cust_codeValidator.source = model_internal::_instance;
        //model_internal::_order_cust_codeValidator.property = "order_cust_code";
        model_internal::_order_cust_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_cust_no);
        model_internal::_order_cust_noValidator.required = true;
        model_internal::_order_cust_noValidator.requiredFieldError = "order_cust_no is required";
        //model_internal::_order_cust_noValidator.source = model_internal::_instance;
        //model_internal::_order_cust_noValidator.property = "order_cust_no";
        model_internal::_order_descValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_desc);
        model_internal::_order_descValidator.required = true;
        model_internal::_order_descValidator.requiredFieldError = "order_desc is required";
        //model_internal::_order_descValidator.source = model_internal::_instance;
        //model_internal::_order_descValidator.property = "order_desc";
        model_internal::_order_cust_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_cust_name);
        model_internal::_order_cust_nameValidator.required = true;
        model_internal::_order_cust_nameValidator.requiredFieldError = "order_cust_name is required";
        //model_internal::_order_cust_nameValidator.source = model_internal::_instance;
        //model_internal::_order_cust_nameValidator.property = "order_cust_name";
        model_internal::_order_supp_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_supp_name);
        model_internal::_order_supp_nameValidator.required = true;
        model_internal::_order_supp_nameValidator.requiredFieldError = "order_supp_name is required";
        //model_internal::_order_supp_nameValidator.source = model_internal::_instance;
        //model_internal::_order_supp_nameValidator.property = "order_supp_name";
        model_internal::_order_supp_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_supp_code);
        model_internal::_order_supp_codeValidator.required = true;
        model_internal::_order_supp_codeValidator.requiredFieldError = "order_supp_code is required";
        //model_internal::_order_supp_codeValidator.source = model_internal::_instance;
        //model_internal::_order_supp_codeValidator.property = "order_supp_code";
        model_internal::_order_cust_acntValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_cust_acnt);
        model_internal::_order_cust_acntValidator.required = true;
        model_internal::_order_cust_acntValidator.requiredFieldError = "order_cust_acnt is required";
        //model_internal::_order_cust_acntValidator.source = model_internal::_instance;
        //model_internal::_order_cust_acntValidator.property = "order_cust_acnt";
        model_internal::_order_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_id);
        model_internal::_order_idValidator.required = true;
        model_internal::_order_idValidator.requiredFieldError = "order_id is required";
        //model_internal::_order_idValidator.source = model_internal::_instance;
        //model_internal::_order_idValidator.property = "order_id";
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
            throw new Error(propertyName + " is not a data property of entity KeyOrderLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity KeyOrderLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of KeyOrderLookup");

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
            throw new Error(propertyName + " does not exist for entity KeyOrderLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity KeyOrderLookup");
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
            throw new Error(propertyName + " does not exist for entity KeyOrderLookup");
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
    public function get isOrder_cust_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_cust_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_descAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_cust_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_supp_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_supp_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_cust_acntAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_idAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnOrder_cust_code():void
    {
        if (model_internal::_order_cust_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_cust_code = null;
            model_internal::calculateOrder_cust_codeIsValid();
        }
    }
    public function invalidateDependentOnOrder_cust_no():void
    {
        if (model_internal::_order_cust_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_cust_no = null;
            model_internal::calculateOrder_cust_noIsValid();
        }
    }
    public function invalidateDependentOnOrder_desc():void
    {
        if (model_internal::_order_descIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_desc = null;
            model_internal::calculateOrder_descIsValid();
        }
    }
    public function invalidateDependentOnOrder_cust_name():void
    {
        if (model_internal::_order_cust_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_cust_name = null;
            model_internal::calculateOrder_cust_nameIsValid();
        }
    }
    public function invalidateDependentOnOrder_supp_name():void
    {
        if (model_internal::_order_supp_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_supp_name = null;
            model_internal::calculateOrder_supp_nameIsValid();
        }
    }
    public function invalidateDependentOnOrder_supp_code():void
    {
        if (model_internal::_order_supp_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_supp_code = null;
            model_internal::calculateOrder_supp_codeIsValid();
        }
    }
    public function invalidateDependentOnOrder_cust_acnt():void
    {
        if (model_internal::_order_cust_acntIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_cust_acnt = null;
            model_internal::calculateOrder_cust_acntIsValid();
        }
    }
    public function invalidateDependentOnOrder_id():void
    {
        if (model_internal::_order_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_id = null;
            model_internal::calculateOrder_idIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get order_cust_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_cust_codeValidator() : StyleValidator
    {
        return model_internal::_order_cust_codeValidator;
    }

    model_internal function set _order_cust_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_cust_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_cust_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_codeIsValid():Boolean
    {
        if (!model_internal::_order_cust_codeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_cust_codeIsValid();
        }

        return model_internal::_order_cust_codeIsValid;
    }

    model_internal function calculateOrder_cust_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_cust_codeValidator.validate(model_internal::_instance.order_cust_code)
        model_internal::_order_cust_codeIsValid_der = (valRes.results == null);
        model_internal::_order_cust_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_cust_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_cust_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_codeValidationFailureMessages():Array
    {
        if (model_internal::_order_cust_codeValidationFailureMessages == null)
            model_internal::calculateOrder_cust_codeIsValid();

        return _order_cust_codeValidationFailureMessages;
    }

    model_internal function set order_cust_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_cust_codeValidationFailureMessages;

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
            model_internal::_order_cust_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_cust_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_cust_noValidator() : StyleValidator
    {
        return model_internal::_order_cust_noValidator;
    }

    model_internal function set _order_cust_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_cust_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_cust_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_noIsValid():Boolean
    {
        if (!model_internal::_order_cust_noIsValidCacheInitialized)
        {
            model_internal::calculateOrder_cust_noIsValid();
        }

        return model_internal::_order_cust_noIsValid;
    }

    model_internal function calculateOrder_cust_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_cust_noValidator.validate(model_internal::_instance.order_cust_no)
        model_internal::_order_cust_noIsValid_der = (valRes.results == null);
        model_internal::_order_cust_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_cust_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_cust_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_noValidationFailureMessages():Array
    {
        if (model_internal::_order_cust_noValidationFailureMessages == null)
            model_internal::calculateOrder_cust_noIsValid();

        return _order_cust_noValidationFailureMessages;
    }

    model_internal function set order_cust_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_cust_noValidationFailureMessages;

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
            model_internal::_order_cust_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_descStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_descValidator() : StyleValidator
    {
        return model_internal::_order_descValidator;
    }

    model_internal function set _order_descIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_descIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_descIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_descIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_descIsValid():Boolean
    {
        if (!model_internal::_order_descIsValidCacheInitialized)
        {
            model_internal::calculateOrder_descIsValid();
        }

        return model_internal::_order_descIsValid;
    }

    model_internal function calculateOrder_descIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_descValidator.validate(model_internal::_instance.order_desc)
        model_internal::_order_descIsValid_der = (valRes.results == null);
        model_internal::_order_descIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_descValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_descValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_descValidationFailureMessages():Array
    {
        if (model_internal::_order_descValidationFailureMessages == null)
            model_internal::calculateOrder_descIsValid();

        return _order_descValidationFailureMessages;
    }

    model_internal function set order_descValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_descValidationFailureMessages;

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
            model_internal::_order_descValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_descValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_cust_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_cust_nameValidator() : StyleValidator
    {
        return model_internal::_order_cust_nameValidator;
    }

    model_internal function set _order_cust_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_cust_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_cust_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_nameIsValid():Boolean
    {
        if (!model_internal::_order_cust_nameIsValidCacheInitialized)
        {
            model_internal::calculateOrder_cust_nameIsValid();
        }

        return model_internal::_order_cust_nameIsValid;
    }

    model_internal function calculateOrder_cust_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_cust_nameValidator.validate(model_internal::_instance.order_cust_name)
        model_internal::_order_cust_nameIsValid_der = (valRes.results == null);
        model_internal::_order_cust_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_cust_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_cust_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_nameValidationFailureMessages():Array
    {
        if (model_internal::_order_cust_nameValidationFailureMessages == null)
            model_internal::calculateOrder_cust_nameIsValid();

        return _order_cust_nameValidationFailureMessages;
    }

    model_internal function set order_cust_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_cust_nameValidationFailureMessages;

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
            model_internal::_order_cust_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_supp_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_supp_nameValidator() : StyleValidator
    {
        return model_internal::_order_supp_nameValidator;
    }

    model_internal function set _order_supp_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_supp_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_supp_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_supp_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_supp_nameIsValid():Boolean
    {
        if (!model_internal::_order_supp_nameIsValidCacheInitialized)
        {
            model_internal::calculateOrder_supp_nameIsValid();
        }

        return model_internal::_order_supp_nameIsValid;
    }

    model_internal function calculateOrder_supp_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_supp_nameValidator.validate(model_internal::_instance.order_supp_name)
        model_internal::_order_supp_nameIsValid_der = (valRes.results == null);
        model_internal::_order_supp_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_supp_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_supp_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_supp_nameValidationFailureMessages():Array
    {
        if (model_internal::_order_supp_nameValidationFailureMessages == null)
            model_internal::calculateOrder_supp_nameIsValid();

        return _order_supp_nameValidationFailureMessages;
    }

    model_internal function set order_supp_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_supp_nameValidationFailureMessages;

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
            model_internal::_order_supp_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_supp_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_supp_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_supp_codeValidator() : StyleValidator
    {
        return model_internal::_order_supp_codeValidator;
    }

    model_internal function set _order_supp_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_supp_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_supp_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_supp_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_supp_codeIsValid():Boolean
    {
        if (!model_internal::_order_supp_codeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_supp_codeIsValid();
        }

        return model_internal::_order_supp_codeIsValid;
    }

    model_internal function calculateOrder_supp_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_supp_codeValidator.validate(model_internal::_instance.order_supp_code)
        model_internal::_order_supp_codeIsValid_der = (valRes.results == null);
        model_internal::_order_supp_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_supp_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_supp_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_supp_codeValidationFailureMessages():Array
    {
        if (model_internal::_order_supp_codeValidationFailureMessages == null)
            model_internal::calculateOrder_supp_codeIsValid();

        return _order_supp_codeValidationFailureMessages;
    }

    model_internal function set order_supp_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_supp_codeValidationFailureMessages;

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
            model_internal::_order_supp_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_supp_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_cust_acntStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_cust_acntValidator() : StyleValidator
    {
        return model_internal::_order_cust_acntValidator;
    }

    model_internal function set _order_cust_acntIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_cust_acntIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_cust_acntIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_acntIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_acntIsValid():Boolean
    {
        if (!model_internal::_order_cust_acntIsValidCacheInitialized)
        {
            model_internal::calculateOrder_cust_acntIsValid();
        }

        return model_internal::_order_cust_acntIsValid;
    }

    model_internal function calculateOrder_cust_acntIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_cust_acntValidator.validate(model_internal::_instance.order_cust_acnt)
        model_internal::_order_cust_acntIsValid_der = (valRes.results == null);
        model_internal::_order_cust_acntIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_cust_acntValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_cust_acntValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_acntValidationFailureMessages():Array
    {
        if (model_internal::_order_cust_acntValidationFailureMessages == null)
            model_internal::calculateOrder_cust_acntIsValid();

        return _order_cust_acntValidationFailureMessages;
    }

    model_internal function set order_cust_acntValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_cust_acntValidationFailureMessages;

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
            model_internal::_order_cust_acntValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_acntValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_idValidator() : StyleValidator
    {
        return model_internal::_order_idValidator;
    }

    model_internal function set _order_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_idIsValid():Boolean
    {
        if (!model_internal::_order_idIsValidCacheInitialized)
        {
            model_internal::calculateOrder_idIsValid();
        }

        return model_internal::_order_idIsValid;
    }

    model_internal function calculateOrder_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_idValidator.validate(model_internal::_instance.order_id)
        model_internal::_order_idIsValid_der = (valRes.results == null);
        model_internal::_order_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_idValidationFailureMessages():Array
    {
        if (model_internal::_order_idValidationFailureMessages == null)
            model_internal::calculateOrder_idIsValid();

        return _order_idValidationFailureMessages;
    }

    model_internal function set order_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_idValidationFailureMessages;

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
            model_internal::_order_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_idValidationFailureMessages", oldValue, value));
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
            case("order_cust_code"):
            {
                return order_cust_codeValidationFailureMessages;
            }
            case("order_cust_no"):
            {
                return order_cust_noValidationFailureMessages;
            }
            case("order_desc"):
            {
                return order_descValidationFailureMessages;
            }
            case("order_cust_name"):
            {
                return order_cust_nameValidationFailureMessages;
            }
            case("order_supp_name"):
            {
                return order_supp_nameValidationFailureMessages;
            }
            case("order_supp_code"):
            {
                return order_supp_codeValidationFailureMessages;
            }
            case("order_cust_acnt"):
            {
                return order_cust_acntValidationFailureMessages;
            }
            case("order_id"):
            {
                return order_idValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
