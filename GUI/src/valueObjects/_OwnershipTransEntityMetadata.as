
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
internal class _OwnershipTransEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("base_prod_code", "trsa_time", "ownship_trsa_no", "reason", "supp_cmpy", "qty");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("base_prod_code", "trsa_time", "ownship_trsa_no", "reason", "supp_cmpy", "qty");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("base_prod_code", "trsa_time", "ownship_trsa_no", "reason", "supp_cmpy", "qty");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("base_prod_code", "trsa_time", "ownship_trsa_no", "reason", "supp_cmpy", "qty");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("base_prod_code", "trsa_time", "ownship_trsa_no", "reason", "supp_cmpy", "qty");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "OwnershipTrans";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _base_prod_codeIsValid:Boolean;
    model_internal var _base_prod_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _base_prod_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _base_prod_codeValidationFailureMessages:Array;
    
    model_internal var _trsa_timeIsValid:Boolean;
    model_internal var _trsa_timeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _trsa_timeIsValidCacheInitialized:Boolean = false;
    model_internal var _trsa_timeValidationFailureMessages:Array;
    
    model_internal var _ownship_trsa_noIsValid:Boolean;
    model_internal var _ownship_trsa_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _ownship_trsa_noIsValidCacheInitialized:Boolean = false;
    model_internal var _ownship_trsa_noValidationFailureMessages:Array;
    
    model_internal var _reasonIsValid:Boolean;
    model_internal var _reasonValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _reasonIsValidCacheInitialized:Boolean = false;
    model_internal var _reasonValidationFailureMessages:Array;
    
    model_internal var _supp_cmpyIsValid:Boolean;
    model_internal var _supp_cmpyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _supp_cmpyIsValidCacheInitialized:Boolean = false;
    model_internal var _supp_cmpyValidationFailureMessages:Array;
    
    model_internal var _qtyIsValid:Boolean;
    model_internal var _qtyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _qtyIsValidCacheInitialized:Boolean = false;
    model_internal var _qtyValidationFailureMessages:Array;

    model_internal var _instance:_Super_OwnershipTrans;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _OwnershipTransEntityMetadata(value : _Super_OwnershipTrans)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["base_prod_code"] = new Array();
            model_internal::dependentsOnMap["trsa_time"] = new Array();
            model_internal::dependentsOnMap["ownship_trsa_no"] = new Array();
            model_internal::dependentsOnMap["reason"] = new Array();
            model_internal::dependentsOnMap["supp_cmpy"] = new Array();
            model_internal::dependentsOnMap["qty"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["base_prod_code"] = "String";
        model_internal::propertyTypeMap["trsa_time"] = "String";
        model_internal::propertyTypeMap["ownship_trsa_no"] = "String";
        model_internal::propertyTypeMap["reason"] = "String";
        model_internal::propertyTypeMap["supp_cmpy"] = "String";
        model_internal::propertyTypeMap["qty"] = "String";

        model_internal::_instance = value;
        model_internal::_base_prod_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBase_prod_code);
        model_internal::_base_prod_codeValidator.required = true;
        model_internal::_base_prod_codeValidator.requiredFieldError = "base_prod_code is required";
        //model_internal::_base_prod_codeValidator.source = model_internal::_instance;
        //model_internal::_base_prod_codeValidator.property = "base_prod_code";
        model_internal::_trsa_timeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTrsa_time);
        model_internal::_trsa_timeValidator.required = true;
        model_internal::_trsa_timeValidator.requiredFieldError = "trsa_time is required";
        //model_internal::_trsa_timeValidator.source = model_internal::_instance;
        //model_internal::_trsa_timeValidator.property = "trsa_time";
        model_internal::_ownship_trsa_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOwnship_trsa_no);
        model_internal::_ownship_trsa_noValidator.required = true;
        model_internal::_ownship_trsa_noValidator.requiredFieldError = "ownship_trsa_no is required";
        //model_internal::_ownship_trsa_noValidator.source = model_internal::_instance;
        //model_internal::_ownship_trsa_noValidator.property = "ownship_trsa_no";
        model_internal::_reasonValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForReason);
        model_internal::_reasonValidator.required = true;
        model_internal::_reasonValidator.requiredFieldError = "reason is required";
        //model_internal::_reasonValidator.source = model_internal::_instance;
        //model_internal::_reasonValidator.property = "reason";
        model_internal::_supp_cmpyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSupp_cmpy);
        model_internal::_supp_cmpyValidator.required = true;
        model_internal::_supp_cmpyValidator.requiredFieldError = "supp_cmpy is required";
        //model_internal::_supp_cmpyValidator.source = model_internal::_instance;
        //model_internal::_supp_cmpyValidator.property = "supp_cmpy";
        model_internal::_qtyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForQty);
        model_internal::_qtyValidator.required = true;
        model_internal::_qtyValidator.requiredFieldError = "qty is required";
        //model_internal::_qtyValidator.source = model_internal::_instance;
        //model_internal::_qtyValidator.property = "qty";
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
            throw new Error(propertyName + " is not a data property of entity OwnershipTrans");
            
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
            throw new Error(propertyName + " is not a collection property of entity OwnershipTrans");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of OwnershipTrans");

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
            throw new Error(propertyName + " does not exist for entity OwnershipTrans");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity OwnershipTrans");
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
            throw new Error(propertyName + " does not exist for entity OwnershipTrans");
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
    public function get isBase_prod_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTrsa_timeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOwnship_trsa_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isReasonAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSupp_cmpyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isQtyAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnBase_prod_code():void
    {
        if (model_internal::_base_prod_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBase_prod_code = null;
            model_internal::calculateBase_prod_codeIsValid();
        }
    }
    public function invalidateDependentOnTrsa_time():void
    {
        if (model_internal::_trsa_timeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTrsa_time = null;
            model_internal::calculateTrsa_timeIsValid();
        }
    }
    public function invalidateDependentOnOwnship_trsa_no():void
    {
        if (model_internal::_ownship_trsa_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOwnship_trsa_no = null;
            model_internal::calculateOwnship_trsa_noIsValid();
        }
    }
    public function invalidateDependentOnReason():void
    {
        if (model_internal::_reasonIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfReason = null;
            model_internal::calculateReasonIsValid();
        }
    }
    public function invalidateDependentOnSupp_cmpy():void
    {
        if (model_internal::_supp_cmpyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSupp_cmpy = null;
            model_internal::calculateSupp_cmpyIsValid();
        }
    }
    public function invalidateDependentOnQty():void
    {
        if (model_internal::_qtyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfQty = null;
            model_internal::calculateQtyIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get base_prod_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get base_prod_codeValidator() : StyleValidator
    {
        return model_internal::_base_prod_codeValidator;
    }

    model_internal function set _base_prod_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_base_prod_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_base_prod_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_prod_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get base_prod_codeIsValid():Boolean
    {
        if (!model_internal::_base_prod_codeIsValidCacheInitialized)
        {
            model_internal::calculateBase_prod_codeIsValid();
        }

        return model_internal::_base_prod_codeIsValid;
    }

    model_internal function calculateBase_prod_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_base_prod_codeValidator.validate(model_internal::_instance.base_prod_code)
        model_internal::_base_prod_codeIsValid_der = (valRes.results == null);
        model_internal::_base_prod_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::base_prod_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::base_prod_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get base_prod_codeValidationFailureMessages():Array
    {
        if (model_internal::_base_prod_codeValidationFailureMessages == null)
            model_internal::calculateBase_prod_codeIsValid();

        return _base_prod_codeValidationFailureMessages;
    }

    model_internal function set base_prod_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_base_prod_codeValidationFailureMessages;

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
            model_internal::_base_prod_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "base_prod_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get trsa_timeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get trsa_timeValidator() : StyleValidator
    {
        return model_internal::_trsa_timeValidator;
    }

    model_internal function set _trsa_timeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_trsa_timeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_trsa_timeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_timeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get trsa_timeIsValid():Boolean
    {
        if (!model_internal::_trsa_timeIsValidCacheInitialized)
        {
            model_internal::calculateTrsa_timeIsValid();
        }

        return model_internal::_trsa_timeIsValid;
    }

    model_internal function calculateTrsa_timeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_trsa_timeValidator.validate(model_internal::_instance.trsa_time)
        model_internal::_trsa_timeIsValid_der = (valRes.results == null);
        model_internal::_trsa_timeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::trsa_timeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::trsa_timeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get trsa_timeValidationFailureMessages():Array
    {
        if (model_internal::_trsa_timeValidationFailureMessages == null)
            model_internal::calculateTrsa_timeIsValid();

        return _trsa_timeValidationFailureMessages;
    }

    model_internal function set trsa_timeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_trsa_timeValidationFailureMessages;

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
            model_internal::_trsa_timeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "trsa_timeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get ownship_trsa_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get ownship_trsa_noValidator() : StyleValidator
    {
        return model_internal::_ownship_trsa_noValidator;
    }

    model_internal function set _ownship_trsa_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_ownship_trsa_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_ownship_trsa_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ownship_trsa_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get ownship_trsa_noIsValid():Boolean
    {
        if (!model_internal::_ownship_trsa_noIsValidCacheInitialized)
        {
            model_internal::calculateOwnship_trsa_noIsValid();
        }

        return model_internal::_ownship_trsa_noIsValid;
    }

    model_internal function calculateOwnship_trsa_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_ownship_trsa_noValidator.validate(model_internal::_instance.ownship_trsa_no)
        model_internal::_ownship_trsa_noIsValid_der = (valRes.results == null);
        model_internal::_ownship_trsa_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::ownship_trsa_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::ownship_trsa_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get ownship_trsa_noValidationFailureMessages():Array
    {
        if (model_internal::_ownship_trsa_noValidationFailureMessages == null)
            model_internal::calculateOwnship_trsa_noIsValid();

        return _ownship_trsa_noValidationFailureMessages;
    }

    model_internal function set ownship_trsa_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_ownship_trsa_noValidationFailureMessages;

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
            model_internal::_ownship_trsa_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ownship_trsa_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get reasonStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get reasonValidator() : StyleValidator
    {
        return model_internal::_reasonValidator;
    }

    model_internal function set _reasonIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_reasonIsValid;         
        if (oldValue !== value)
        {
            model_internal::_reasonIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "reasonIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get reasonIsValid():Boolean
    {
        if (!model_internal::_reasonIsValidCacheInitialized)
        {
            model_internal::calculateReasonIsValid();
        }

        return model_internal::_reasonIsValid;
    }

    model_internal function calculateReasonIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_reasonValidator.validate(model_internal::_instance.reason)
        model_internal::_reasonIsValid_der = (valRes.results == null);
        model_internal::_reasonIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::reasonValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::reasonValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get reasonValidationFailureMessages():Array
    {
        if (model_internal::_reasonValidationFailureMessages == null)
            model_internal::calculateReasonIsValid();

        return _reasonValidationFailureMessages;
    }

    model_internal function set reasonValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_reasonValidationFailureMessages;

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
            model_internal::_reasonValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "reasonValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get supp_cmpyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get supp_cmpyValidator() : StyleValidator
    {
        return model_internal::_supp_cmpyValidator;
    }

    model_internal function set _supp_cmpyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_supp_cmpyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_supp_cmpyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "supp_cmpyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get supp_cmpyIsValid():Boolean
    {
        if (!model_internal::_supp_cmpyIsValidCacheInitialized)
        {
            model_internal::calculateSupp_cmpyIsValid();
        }

        return model_internal::_supp_cmpyIsValid;
    }

    model_internal function calculateSupp_cmpyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_supp_cmpyValidator.validate(model_internal::_instance.supp_cmpy)
        model_internal::_supp_cmpyIsValid_der = (valRes.results == null);
        model_internal::_supp_cmpyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::supp_cmpyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::supp_cmpyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get supp_cmpyValidationFailureMessages():Array
    {
        if (model_internal::_supp_cmpyValidationFailureMessages == null)
            model_internal::calculateSupp_cmpyIsValid();

        return _supp_cmpyValidationFailureMessages;
    }

    model_internal function set supp_cmpyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_supp_cmpyValidationFailureMessages;

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
            model_internal::_supp_cmpyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "supp_cmpyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get qtyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get qtyValidator() : StyleValidator
    {
        return model_internal::_qtyValidator;
    }

    model_internal function set _qtyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_qtyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_qtyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qtyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get qtyIsValid():Boolean
    {
        if (!model_internal::_qtyIsValidCacheInitialized)
        {
            model_internal::calculateQtyIsValid();
        }

        return model_internal::_qtyIsValid;
    }

    model_internal function calculateQtyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_qtyValidator.validate(model_internal::_instance.qty)
        model_internal::_qtyIsValid_der = (valRes.results == null);
        model_internal::_qtyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::qtyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::qtyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get qtyValidationFailureMessages():Array
    {
        if (model_internal::_qtyValidationFailureMessages == null)
            model_internal::calculateQtyIsValid();

        return _qtyValidationFailureMessages;
    }

    model_internal function set qtyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_qtyValidationFailureMessages;

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
            model_internal::_qtyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qtyValidationFailureMessages", oldValue, value));
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
            case("base_prod_code"):
            {
                return base_prod_codeValidationFailureMessages;
            }
            case("trsa_time"):
            {
                return trsa_timeValidationFailureMessages;
            }
            case("ownship_trsa_no"):
            {
                return ownship_trsa_noValidationFailureMessages;
            }
            case("reason"):
            {
                return reasonValidationFailureMessages;
            }
            case("supp_cmpy"):
            {
                return supp_cmpyValidationFailureMessages;
            }
            case("qty"):
            {
                return qtyValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
