
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
internal class _JournalEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("message", "company_code", "rn", "region_code", "seq", "gen_date", "jnl_cat", "msg_class", "msg_event", "print_date");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("message", "company_code", "rn", "region_code", "seq", "gen_date", "jnl_cat", "msg_class", "msg_event", "print_date");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("message", "company_code", "rn", "region_code", "seq", "gen_date", "jnl_cat", "msg_class", "msg_event", "print_date");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("message", "company_code", "rn", "region_code", "seq", "gen_date", "jnl_cat", "msg_class", "msg_event", "print_date");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("message", "company_code", "rn", "region_code", "seq", "gen_date", "jnl_cat", "msg_class", "msg_event", "print_date");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "Journal";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _messageIsValid:Boolean;
    model_internal var _messageValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _messageIsValidCacheInitialized:Boolean = false;
    model_internal var _messageValidationFailureMessages:Array;
    
    model_internal var _company_codeIsValid:Boolean;
    model_internal var _company_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _company_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _company_codeValidationFailureMessages:Array;
    
    model_internal var _rnIsValid:Boolean;
    model_internal var _rnValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _rnIsValidCacheInitialized:Boolean = false;
    model_internal var _rnValidationFailureMessages:Array;
    
    model_internal var _region_codeIsValid:Boolean;
    model_internal var _region_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _region_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _region_codeValidationFailureMessages:Array;
    
    model_internal var _gen_dateIsValid:Boolean;
    model_internal var _gen_dateValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _gen_dateIsValidCacheInitialized:Boolean = false;
    model_internal var _gen_dateValidationFailureMessages:Array;
    
    model_internal var _jnl_catIsValid:Boolean;
    model_internal var _jnl_catValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _jnl_catIsValidCacheInitialized:Boolean = false;
    model_internal var _jnl_catValidationFailureMessages:Array;
    
    model_internal var _msg_classIsValid:Boolean;
    model_internal var _msg_classValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _msg_classIsValidCacheInitialized:Boolean = false;
    model_internal var _msg_classValidationFailureMessages:Array;
    
    model_internal var _msg_eventIsValid:Boolean;
    model_internal var _msg_eventValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _msg_eventIsValidCacheInitialized:Boolean = false;
    model_internal var _msg_eventValidationFailureMessages:Array;
    
    model_internal var _print_dateIsValid:Boolean;
    model_internal var _print_dateValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _print_dateIsValidCacheInitialized:Boolean = false;
    model_internal var _print_dateValidationFailureMessages:Array;

    model_internal var _instance:_Super_Journal;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _JournalEntityMetadata(value : _Super_Journal)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["message"] = new Array();
            model_internal::dependentsOnMap["company_code"] = new Array();
            model_internal::dependentsOnMap["rn"] = new Array();
            model_internal::dependentsOnMap["region_code"] = new Array();
            model_internal::dependentsOnMap["seq"] = new Array();
            model_internal::dependentsOnMap["gen_date"] = new Array();
            model_internal::dependentsOnMap["jnl_cat"] = new Array();
            model_internal::dependentsOnMap["msg_class"] = new Array();
            model_internal::dependentsOnMap["msg_event"] = new Array();
            model_internal::dependentsOnMap["print_date"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["message"] = "String";
        model_internal::propertyTypeMap["company_code"] = "String";
        model_internal::propertyTypeMap["rn"] = "String";
        model_internal::propertyTypeMap["region_code"] = "String";
        model_internal::propertyTypeMap["seq"] = "String";
        model_internal::propertyTypeMap["gen_date"] = "String";
        model_internal::propertyTypeMap["jnl_cat"] = "Object";
        model_internal::propertyTypeMap["msg_class"] = "String";
        model_internal::propertyTypeMap["msg_event"] = "String";
        model_internal::propertyTypeMap["print_date"] = "Object";

        model_internal::_instance = value;
        model_internal::_messageValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForMessage);
        model_internal::_messageValidator.required = true;
        model_internal::_messageValidator.requiredFieldError = "message is required";
        //model_internal::_messageValidator.source = model_internal::_instance;
        //model_internal::_messageValidator.property = "message";
        model_internal::_company_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCompany_code);
        model_internal::_company_codeValidator.required = true;
        model_internal::_company_codeValidator.requiredFieldError = "company_code is required";
        //model_internal::_company_codeValidator.source = model_internal::_instance;
        //model_internal::_company_codeValidator.property = "company_code";
        model_internal::_rnValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRn);
        model_internal::_rnValidator.required = true;
        model_internal::_rnValidator.requiredFieldError = "rn is required";
        //model_internal::_rnValidator.source = model_internal::_instance;
        //model_internal::_rnValidator.property = "rn";
        model_internal::_region_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRegion_code);
        model_internal::_region_codeValidator.required = true;
        model_internal::_region_codeValidator.requiredFieldError = "region_code is required";
        //model_internal::_region_codeValidator.source = model_internal::_instance;
        //model_internal::_region_codeValidator.property = "region_code";
        model_internal::_gen_dateValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForGen_date);
        model_internal::_gen_dateValidator.required = true;
        model_internal::_gen_dateValidator.requiredFieldError = "gen_date is required";
        //model_internal::_gen_dateValidator.source = model_internal::_instance;
        //model_internal::_gen_dateValidator.property = "gen_date";
        model_internal::_jnl_catValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForJnl_cat);
        model_internal::_jnl_catValidator.required = true;
        model_internal::_jnl_catValidator.requiredFieldError = "jnl_cat is required";
        //model_internal::_jnl_catValidator.source = model_internal::_instance;
        //model_internal::_jnl_catValidator.property = "jnl_cat";
        model_internal::_msg_classValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForMsg_class);
        model_internal::_msg_classValidator.required = true;
        model_internal::_msg_classValidator.requiredFieldError = "msg_class is required";
        //model_internal::_msg_classValidator.source = model_internal::_instance;
        //model_internal::_msg_classValidator.property = "msg_class";
        model_internal::_msg_eventValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForMsg_event);
        model_internal::_msg_eventValidator.required = true;
        model_internal::_msg_eventValidator.requiredFieldError = "msg_event is required";
        //model_internal::_msg_eventValidator.source = model_internal::_instance;
        //model_internal::_msg_eventValidator.property = "msg_event";
        model_internal::_print_dateValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPrint_date);
        model_internal::_print_dateValidator.required = true;
        model_internal::_print_dateValidator.requiredFieldError = "print_date is required";
        //model_internal::_print_dateValidator.source = model_internal::_instance;
        //model_internal::_print_dateValidator.property = "print_date";
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
            throw new Error(propertyName + " is not a data property of entity Journal");
            
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
            throw new Error(propertyName + " is not a collection property of entity Journal");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of Journal");

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
            throw new Error(propertyName + " does not exist for entity Journal");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity Journal");
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
            throw new Error(propertyName + " does not exist for entity Journal");
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
        returnMap["seq"] = model_internal::_instance.seq;

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
    public function get isMessageAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCompany_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRnAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRegion_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSeqAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isGen_dateAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isJnl_catAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isMsg_classAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isMsg_eventAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPrint_dateAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnMessage():void
    {
        if (model_internal::_messageIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfMessage = null;
            model_internal::calculateMessageIsValid();
        }
    }
    public function invalidateDependentOnCompany_code():void
    {
        if (model_internal::_company_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCompany_code = null;
            model_internal::calculateCompany_codeIsValid();
        }
    }
    public function invalidateDependentOnRn():void
    {
        if (model_internal::_rnIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRn = null;
            model_internal::calculateRnIsValid();
        }
    }
    public function invalidateDependentOnRegion_code():void
    {
        if (model_internal::_region_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRegion_code = null;
            model_internal::calculateRegion_codeIsValid();
        }
    }
    public function invalidateDependentOnGen_date():void
    {
        if (model_internal::_gen_dateIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfGen_date = null;
            model_internal::calculateGen_dateIsValid();
        }
    }
    public function invalidateDependentOnJnl_cat():void
    {
        if (model_internal::_jnl_catIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfJnl_cat = null;
            model_internal::calculateJnl_catIsValid();
        }
    }
    public function invalidateDependentOnMsg_class():void
    {
        if (model_internal::_msg_classIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfMsg_class = null;
            model_internal::calculateMsg_classIsValid();
        }
    }
    public function invalidateDependentOnMsg_event():void
    {
        if (model_internal::_msg_eventIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfMsg_event = null;
            model_internal::calculateMsg_eventIsValid();
        }
    }
    public function invalidateDependentOnPrint_date():void
    {
        if (model_internal::_print_dateIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPrint_date = null;
            model_internal::calculatePrint_dateIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get messageStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get messageValidator() : StyleValidator
    {
        return model_internal::_messageValidator;
    }

    model_internal function set _messageIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_messageIsValid;         
        if (oldValue !== value)
        {
            model_internal::_messageIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "messageIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get messageIsValid():Boolean
    {
        if (!model_internal::_messageIsValidCacheInitialized)
        {
            model_internal::calculateMessageIsValid();
        }

        return model_internal::_messageIsValid;
    }

    model_internal function calculateMessageIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_messageValidator.validate(model_internal::_instance.message)
        model_internal::_messageIsValid_der = (valRes.results == null);
        model_internal::_messageIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::messageValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::messageValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get messageValidationFailureMessages():Array
    {
        if (model_internal::_messageValidationFailureMessages == null)
            model_internal::calculateMessageIsValid();

        return _messageValidationFailureMessages;
    }

    model_internal function set messageValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_messageValidationFailureMessages;

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
            model_internal::_messageValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "messageValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get company_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get company_codeValidator() : StyleValidator
    {
        return model_internal::_company_codeValidator;
    }

    model_internal function set _company_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_company_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_company_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "company_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get company_codeIsValid():Boolean
    {
        if (!model_internal::_company_codeIsValidCacheInitialized)
        {
            model_internal::calculateCompany_codeIsValid();
        }

        return model_internal::_company_codeIsValid;
    }

    model_internal function calculateCompany_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_company_codeValidator.validate(model_internal::_instance.company_code)
        model_internal::_company_codeIsValid_der = (valRes.results == null);
        model_internal::_company_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::company_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::company_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get company_codeValidationFailureMessages():Array
    {
        if (model_internal::_company_codeValidationFailureMessages == null)
            model_internal::calculateCompany_codeIsValid();

        return _company_codeValidationFailureMessages;
    }

    model_internal function set company_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_company_codeValidationFailureMessages;

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
            model_internal::_company_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "company_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get rnStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get rnValidator() : StyleValidator
    {
        return model_internal::_rnValidator;
    }

    model_internal function set _rnIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_rnIsValid;         
        if (oldValue !== value)
        {
            model_internal::_rnIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rnIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get rnIsValid():Boolean
    {
        if (!model_internal::_rnIsValidCacheInitialized)
        {
            model_internal::calculateRnIsValid();
        }

        return model_internal::_rnIsValid;
    }

    model_internal function calculateRnIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_rnValidator.validate(model_internal::_instance.rn)
        model_internal::_rnIsValid_der = (valRes.results == null);
        model_internal::_rnIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::rnValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::rnValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get rnValidationFailureMessages():Array
    {
        if (model_internal::_rnValidationFailureMessages == null)
            model_internal::calculateRnIsValid();

        return _rnValidationFailureMessages;
    }

    model_internal function set rnValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_rnValidationFailureMessages;

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
            model_internal::_rnValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rnValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get region_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get region_codeValidator() : StyleValidator
    {
        return model_internal::_region_codeValidator;
    }

    model_internal function set _region_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_region_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_region_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "region_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get region_codeIsValid():Boolean
    {
        if (!model_internal::_region_codeIsValidCacheInitialized)
        {
            model_internal::calculateRegion_codeIsValid();
        }

        return model_internal::_region_codeIsValid;
    }

    model_internal function calculateRegion_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_region_codeValidator.validate(model_internal::_instance.region_code)
        model_internal::_region_codeIsValid_der = (valRes.results == null);
        model_internal::_region_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::region_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::region_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get region_codeValidationFailureMessages():Array
    {
        if (model_internal::_region_codeValidationFailureMessages == null)
            model_internal::calculateRegion_codeIsValid();

        return _region_codeValidationFailureMessages;
    }

    model_internal function set region_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_region_codeValidationFailureMessages;

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
            model_internal::_region_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "region_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get seqStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    [Bindable(event="propertyChange")]   
    public function get gen_dateStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get gen_dateValidator() : StyleValidator
    {
        return model_internal::_gen_dateValidator;
    }

    model_internal function set _gen_dateIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_gen_dateIsValid;         
        if (oldValue !== value)
        {
            model_internal::_gen_dateIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "gen_dateIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get gen_dateIsValid():Boolean
    {
        if (!model_internal::_gen_dateIsValidCacheInitialized)
        {
            model_internal::calculateGen_dateIsValid();
        }

        return model_internal::_gen_dateIsValid;
    }

    model_internal function calculateGen_dateIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_gen_dateValidator.validate(model_internal::_instance.gen_date)
        model_internal::_gen_dateIsValid_der = (valRes.results == null);
        model_internal::_gen_dateIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::gen_dateValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::gen_dateValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get gen_dateValidationFailureMessages():Array
    {
        if (model_internal::_gen_dateValidationFailureMessages == null)
            model_internal::calculateGen_dateIsValid();

        return _gen_dateValidationFailureMessages;
    }

    model_internal function set gen_dateValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_gen_dateValidationFailureMessages;

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
            model_internal::_gen_dateValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "gen_dateValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get jnl_catStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get jnl_catValidator() : StyleValidator
    {
        return model_internal::_jnl_catValidator;
    }

    model_internal function set _jnl_catIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_jnl_catIsValid;         
        if (oldValue !== value)
        {
            model_internal::_jnl_catIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "jnl_catIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get jnl_catIsValid():Boolean
    {
        if (!model_internal::_jnl_catIsValidCacheInitialized)
        {
            model_internal::calculateJnl_catIsValid();
        }

        return model_internal::_jnl_catIsValid;
    }

    model_internal function calculateJnl_catIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_jnl_catValidator.validate(model_internal::_instance.jnl_cat)
        model_internal::_jnl_catIsValid_der = (valRes.results == null);
        model_internal::_jnl_catIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::jnl_catValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::jnl_catValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get jnl_catValidationFailureMessages():Array
    {
        if (model_internal::_jnl_catValidationFailureMessages == null)
            model_internal::calculateJnl_catIsValid();

        return _jnl_catValidationFailureMessages;
    }

    model_internal function set jnl_catValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_jnl_catValidationFailureMessages;

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
            model_internal::_jnl_catValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "jnl_catValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get msg_classStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get msg_classValidator() : StyleValidator
    {
        return model_internal::_msg_classValidator;
    }

    model_internal function set _msg_classIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_msg_classIsValid;         
        if (oldValue !== value)
        {
            model_internal::_msg_classIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "msg_classIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get msg_classIsValid():Boolean
    {
        if (!model_internal::_msg_classIsValidCacheInitialized)
        {
            model_internal::calculateMsg_classIsValid();
        }

        return model_internal::_msg_classIsValid;
    }

    model_internal function calculateMsg_classIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_msg_classValidator.validate(model_internal::_instance.msg_class)
        model_internal::_msg_classIsValid_der = (valRes.results == null);
        model_internal::_msg_classIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::msg_classValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::msg_classValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get msg_classValidationFailureMessages():Array
    {
        if (model_internal::_msg_classValidationFailureMessages == null)
            model_internal::calculateMsg_classIsValid();

        return _msg_classValidationFailureMessages;
    }

    model_internal function set msg_classValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_msg_classValidationFailureMessages;

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
            model_internal::_msg_classValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "msg_classValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get msg_eventStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get msg_eventValidator() : StyleValidator
    {
        return model_internal::_msg_eventValidator;
    }

    model_internal function set _msg_eventIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_msg_eventIsValid;         
        if (oldValue !== value)
        {
            model_internal::_msg_eventIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "msg_eventIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get msg_eventIsValid():Boolean
    {
        if (!model_internal::_msg_eventIsValidCacheInitialized)
        {
            model_internal::calculateMsg_eventIsValid();
        }

        return model_internal::_msg_eventIsValid;
    }

    model_internal function calculateMsg_eventIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_msg_eventValidator.validate(model_internal::_instance.msg_event)
        model_internal::_msg_eventIsValid_der = (valRes.results == null);
        model_internal::_msg_eventIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::msg_eventValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::msg_eventValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get msg_eventValidationFailureMessages():Array
    {
        if (model_internal::_msg_eventValidationFailureMessages == null)
            model_internal::calculateMsg_eventIsValid();

        return _msg_eventValidationFailureMessages;
    }

    model_internal function set msg_eventValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_msg_eventValidationFailureMessages;

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
            model_internal::_msg_eventValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "msg_eventValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get print_dateStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get print_dateValidator() : StyleValidator
    {
        return model_internal::_print_dateValidator;
    }

    model_internal function set _print_dateIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_print_dateIsValid;         
        if (oldValue !== value)
        {
            model_internal::_print_dateIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "print_dateIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get print_dateIsValid():Boolean
    {
        if (!model_internal::_print_dateIsValidCacheInitialized)
        {
            model_internal::calculatePrint_dateIsValid();
        }

        return model_internal::_print_dateIsValid;
    }

    model_internal function calculatePrint_dateIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_print_dateValidator.validate(model_internal::_instance.print_date)
        model_internal::_print_dateIsValid_der = (valRes.results == null);
        model_internal::_print_dateIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::print_dateValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::print_dateValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get print_dateValidationFailureMessages():Array
    {
        if (model_internal::_print_dateValidationFailureMessages == null)
            model_internal::calculatePrint_dateIsValid();

        return _print_dateValidationFailureMessages;
    }

    model_internal function set print_dateValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_print_dateValidationFailureMessages;

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
            model_internal::_print_dateValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "print_dateValidationFailureMessages", oldValue, value));
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
            case("message"):
            {
                return messageValidationFailureMessages;
            }
            case("company_code"):
            {
                return company_codeValidationFailureMessages;
            }
            case("rn"):
            {
                return rnValidationFailureMessages;
            }
            case("region_code"):
            {
                return region_codeValidationFailureMessages;
            }
            case("gen_date"):
            {
                return gen_dateValidationFailureMessages;
            }
            case("jnl_cat"):
            {
                return jnl_catValidationFailureMessages;
            }
            case("msg_class"):
            {
                return msg_classValidationFailureMessages;
            }
            case("msg_event"):
            {
                return msg_eventValidationFailureMessages;
            }
            case("print_date"):
            {
                return print_dateValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
