
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
internal class _DomainsEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("DOMAIN_TEXT", "DOMAIN_CODE", "RECORD_ORDER", "DOMAIN_NOTE", "RECORD_SWITCH", "IS_SINGULAR", "DOMAIN_ID");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("DOMAIN_TEXT", "DOMAIN_CODE", "RECORD_ORDER", "DOMAIN_NOTE", "RECORD_SWITCH", "IS_SINGULAR", "DOMAIN_ID");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("DOMAIN_TEXT", "DOMAIN_CODE", "RECORD_ORDER", "DOMAIN_NOTE", "RECORD_SWITCH", "IS_SINGULAR", "DOMAIN_ID");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("DOMAIN_TEXT", "DOMAIN_CODE", "RECORD_ORDER", "DOMAIN_NOTE", "RECORD_SWITCH", "IS_SINGULAR", "DOMAIN_ID");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("DOMAIN_TEXT", "DOMAIN_CODE", "RECORD_ORDER", "DOMAIN_NOTE", "RECORD_SWITCH", "IS_SINGULAR", "DOMAIN_ID");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "Domains";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _DOMAIN_TEXTIsValid:Boolean;
    model_internal var _DOMAIN_TEXTValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _DOMAIN_TEXTIsValidCacheInitialized:Boolean = false;
    model_internal var _DOMAIN_TEXTValidationFailureMessages:Array;
    
    model_internal var _DOMAIN_CODEIsValid:Boolean;
    model_internal var _DOMAIN_CODEValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _DOMAIN_CODEIsValidCacheInitialized:Boolean = false;
    model_internal var _DOMAIN_CODEValidationFailureMessages:Array;
    
    model_internal var _RECORD_ORDERIsValid:Boolean;
    model_internal var _RECORD_ORDERValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _RECORD_ORDERIsValidCacheInitialized:Boolean = false;
    model_internal var _RECORD_ORDERValidationFailureMessages:Array;
    
    model_internal var _DOMAIN_NOTEIsValid:Boolean;
    model_internal var _DOMAIN_NOTEValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _DOMAIN_NOTEIsValidCacheInitialized:Boolean = false;
    model_internal var _DOMAIN_NOTEValidationFailureMessages:Array;
    
    model_internal var _RECORD_SWITCHIsValid:Boolean;
    model_internal var _RECORD_SWITCHValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _RECORD_SWITCHIsValidCacheInitialized:Boolean = false;
    model_internal var _RECORD_SWITCHValidationFailureMessages:Array;
    
    model_internal var _IS_SINGULARIsValid:Boolean;
    model_internal var _IS_SINGULARValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _IS_SINGULARIsValidCacheInitialized:Boolean = false;
    model_internal var _IS_SINGULARValidationFailureMessages:Array;
    
    model_internal var _DOMAIN_IDIsValid:Boolean;
    model_internal var _DOMAIN_IDValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _DOMAIN_IDIsValidCacheInitialized:Boolean = false;
    model_internal var _DOMAIN_IDValidationFailureMessages:Array;

    model_internal var _instance:_Super_Domains;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _DomainsEntityMetadata(value : _Super_Domains)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["DOMAIN_TEXT"] = new Array();
            model_internal::dependentsOnMap["DOMAIN_CODE"] = new Array();
            model_internal::dependentsOnMap["RECORD_ORDER"] = new Array();
            model_internal::dependentsOnMap["DOMAIN_NOTE"] = new Array();
            model_internal::dependentsOnMap["RECORD_SWITCH"] = new Array();
            model_internal::dependentsOnMap["IS_SINGULAR"] = new Array();
            model_internal::dependentsOnMap["DOMAIN_ID"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["DOMAIN_TEXT"] = "String";
        model_internal::propertyTypeMap["DOMAIN_CODE"] = "String";
        model_internal::propertyTypeMap["RECORD_ORDER"] = "String";
        model_internal::propertyTypeMap["DOMAIN_NOTE"] = "String";
        model_internal::propertyTypeMap["RECORD_SWITCH"] = "String";
        model_internal::propertyTypeMap["IS_SINGULAR"] = "String";
        model_internal::propertyTypeMap["DOMAIN_ID"] = "String";

        model_internal::_instance = value;
        model_internal::_DOMAIN_TEXTValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDOMAIN_TEXT);
        model_internal::_DOMAIN_TEXTValidator.required = true;
        model_internal::_DOMAIN_TEXTValidator.requiredFieldError = "DOMAIN_TEXT is required";
        //model_internal::_DOMAIN_TEXTValidator.source = model_internal::_instance;
        //model_internal::_DOMAIN_TEXTValidator.property = "DOMAIN_TEXT";
        model_internal::_DOMAIN_CODEValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDOMAIN_CODE);
        model_internal::_DOMAIN_CODEValidator.required = true;
        model_internal::_DOMAIN_CODEValidator.requiredFieldError = "DOMAIN_CODE is required";
        //model_internal::_DOMAIN_CODEValidator.source = model_internal::_instance;
        //model_internal::_DOMAIN_CODEValidator.property = "DOMAIN_CODE";
        model_internal::_RECORD_ORDERValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRECORD_ORDER);
        model_internal::_RECORD_ORDERValidator.required = true;
        model_internal::_RECORD_ORDERValidator.requiredFieldError = "RECORD_ORDER is required";
        //model_internal::_RECORD_ORDERValidator.source = model_internal::_instance;
        //model_internal::_RECORD_ORDERValidator.property = "RECORD_ORDER";
        model_internal::_DOMAIN_NOTEValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDOMAIN_NOTE);
        model_internal::_DOMAIN_NOTEValidator.required = true;
        model_internal::_DOMAIN_NOTEValidator.requiredFieldError = "DOMAIN_NOTE is required";
        //model_internal::_DOMAIN_NOTEValidator.source = model_internal::_instance;
        //model_internal::_DOMAIN_NOTEValidator.property = "DOMAIN_NOTE";
        model_internal::_RECORD_SWITCHValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRECORD_SWITCH);
        model_internal::_RECORD_SWITCHValidator.required = true;
        model_internal::_RECORD_SWITCHValidator.requiredFieldError = "RECORD_SWITCH is required";
        //model_internal::_RECORD_SWITCHValidator.source = model_internal::_instance;
        //model_internal::_RECORD_SWITCHValidator.property = "RECORD_SWITCH";
        model_internal::_IS_SINGULARValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForIS_SINGULAR);
        model_internal::_IS_SINGULARValidator.required = true;
        model_internal::_IS_SINGULARValidator.requiredFieldError = "IS_SINGULAR is required";
        //model_internal::_IS_SINGULARValidator.source = model_internal::_instance;
        //model_internal::_IS_SINGULARValidator.property = "IS_SINGULAR";
        model_internal::_DOMAIN_IDValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDOMAIN_ID);
        model_internal::_DOMAIN_IDValidator.required = true;
        model_internal::_DOMAIN_IDValidator.requiredFieldError = "DOMAIN_ID is required";
        //model_internal::_DOMAIN_IDValidator.source = model_internal::_instance;
        //model_internal::_DOMAIN_IDValidator.property = "DOMAIN_ID";
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
            throw new Error(propertyName + " is not a data property of entity Domains");
            
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
            throw new Error(propertyName + " is not a collection property of entity Domains");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of Domains");

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
            throw new Error(propertyName + " does not exist for entity Domains");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity Domains");
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
            throw new Error(propertyName + " does not exist for entity Domains");
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
    public function get isDOMAIN_TEXTAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isDOMAIN_CODEAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRECORD_ORDERAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isDOMAIN_NOTEAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRECORD_SWITCHAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isIS_SINGULARAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isDOMAIN_IDAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnDOMAIN_TEXT():void
    {
        if (model_internal::_DOMAIN_TEXTIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDOMAIN_TEXT = null;
            model_internal::calculateDOMAIN_TEXTIsValid();
        }
    }
    public function invalidateDependentOnDOMAIN_CODE():void
    {
        if (model_internal::_DOMAIN_CODEIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDOMAIN_CODE = null;
            model_internal::calculateDOMAIN_CODEIsValid();
        }
    }
    public function invalidateDependentOnRECORD_ORDER():void
    {
        if (model_internal::_RECORD_ORDERIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRECORD_ORDER = null;
            model_internal::calculateRECORD_ORDERIsValid();
        }
    }
    public function invalidateDependentOnDOMAIN_NOTE():void
    {
        if (model_internal::_DOMAIN_NOTEIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDOMAIN_NOTE = null;
            model_internal::calculateDOMAIN_NOTEIsValid();
        }
    }
    public function invalidateDependentOnRECORD_SWITCH():void
    {
        if (model_internal::_RECORD_SWITCHIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRECORD_SWITCH = null;
            model_internal::calculateRECORD_SWITCHIsValid();
        }
    }
    public function invalidateDependentOnIS_SINGULAR():void
    {
        if (model_internal::_IS_SINGULARIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfIS_SINGULAR = null;
            model_internal::calculateIS_SINGULARIsValid();
        }
    }
    public function invalidateDependentOnDOMAIN_ID():void
    {
        if (model_internal::_DOMAIN_IDIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDOMAIN_ID = null;
            model_internal::calculateDOMAIN_IDIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get DOMAIN_TEXTStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get DOMAIN_TEXTValidator() : StyleValidator
    {
        return model_internal::_DOMAIN_TEXTValidator;
    }

    model_internal function set _DOMAIN_TEXTIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_DOMAIN_TEXTIsValid;         
        if (oldValue !== value)
        {
            model_internal::_DOMAIN_TEXTIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_TEXTIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_TEXTIsValid():Boolean
    {
        if (!model_internal::_DOMAIN_TEXTIsValidCacheInitialized)
        {
            model_internal::calculateDOMAIN_TEXTIsValid();
        }

        return model_internal::_DOMAIN_TEXTIsValid;
    }

    model_internal function calculateDOMAIN_TEXTIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_DOMAIN_TEXTValidator.validate(model_internal::_instance.DOMAIN_TEXT)
        model_internal::_DOMAIN_TEXTIsValid_der = (valRes.results == null);
        model_internal::_DOMAIN_TEXTIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::DOMAIN_TEXTValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::DOMAIN_TEXTValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_TEXTValidationFailureMessages():Array
    {
        if (model_internal::_DOMAIN_TEXTValidationFailureMessages == null)
            model_internal::calculateDOMAIN_TEXTIsValid();

        return _DOMAIN_TEXTValidationFailureMessages;
    }

    model_internal function set DOMAIN_TEXTValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_DOMAIN_TEXTValidationFailureMessages;

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
            model_internal::_DOMAIN_TEXTValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_TEXTValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get DOMAIN_CODEStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get DOMAIN_CODEValidator() : StyleValidator
    {
        return model_internal::_DOMAIN_CODEValidator;
    }

    model_internal function set _DOMAIN_CODEIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_DOMAIN_CODEIsValid;         
        if (oldValue !== value)
        {
            model_internal::_DOMAIN_CODEIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_CODEIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_CODEIsValid():Boolean
    {
        if (!model_internal::_DOMAIN_CODEIsValidCacheInitialized)
        {
            model_internal::calculateDOMAIN_CODEIsValid();
        }

        return model_internal::_DOMAIN_CODEIsValid;
    }

    model_internal function calculateDOMAIN_CODEIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_DOMAIN_CODEValidator.validate(model_internal::_instance.DOMAIN_CODE)
        model_internal::_DOMAIN_CODEIsValid_der = (valRes.results == null);
        model_internal::_DOMAIN_CODEIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::DOMAIN_CODEValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::DOMAIN_CODEValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_CODEValidationFailureMessages():Array
    {
        if (model_internal::_DOMAIN_CODEValidationFailureMessages == null)
            model_internal::calculateDOMAIN_CODEIsValid();

        return _DOMAIN_CODEValidationFailureMessages;
    }

    model_internal function set DOMAIN_CODEValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_DOMAIN_CODEValidationFailureMessages;

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
            model_internal::_DOMAIN_CODEValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_CODEValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get RECORD_ORDERStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get RECORD_ORDERValidator() : StyleValidator
    {
        return model_internal::_RECORD_ORDERValidator;
    }

    model_internal function set _RECORD_ORDERIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_RECORD_ORDERIsValid;         
        if (oldValue !== value)
        {
            model_internal::_RECORD_ORDERIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "RECORD_ORDERIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get RECORD_ORDERIsValid():Boolean
    {
        if (!model_internal::_RECORD_ORDERIsValidCacheInitialized)
        {
            model_internal::calculateRECORD_ORDERIsValid();
        }

        return model_internal::_RECORD_ORDERIsValid;
    }

    model_internal function calculateRECORD_ORDERIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_RECORD_ORDERValidator.validate(model_internal::_instance.RECORD_ORDER)
        model_internal::_RECORD_ORDERIsValid_der = (valRes.results == null);
        model_internal::_RECORD_ORDERIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::RECORD_ORDERValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::RECORD_ORDERValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get RECORD_ORDERValidationFailureMessages():Array
    {
        if (model_internal::_RECORD_ORDERValidationFailureMessages == null)
            model_internal::calculateRECORD_ORDERIsValid();

        return _RECORD_ORDERValidationFailureMessages;
    }

    model_internal function set RECORD_ORDERValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_RECORD_ORDERValidationFailureMessages;

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
            model_internal::_RECORD_ORDERValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "RECORD_ORDERValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get DOMAIN_NOTEStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get DOMAIN_NOTEValidator() : StyleValidator
    {
        return model_internal::_DOMAIN_NOTEValidator;
    }

    model_internal function set _DOMAIN_NOTEIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_DOMAIN_NOTEIsValid;         
        if (oldValue !== value)
        {
            model_internal::_DOMAIN_NOTEIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_NOTEIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_NOTEIsValid():Boolean
    {
        if (!model_internal::_DOMAIN_NOTEIsValidCacheInitialized)
        {
            model_internal::calculateDOMAIN_NOTEIsValid();
        }

        return model_internal::_DOMAIN_NOTEIsValid;
    }

    model_internal function calculateDOMAIN_NOTEIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_DOMAIN_NOTEValidator.validate(model_internal::_instance.DOMAIN_NOTE)
        model_internal::_DOMAIN_NOTEIsValid_der = (valRes.results == null);
        model_internal::_DOMAIN_NOTEIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::DOMAIN_NOTEValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::DOMAIN_NOTEValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_NOTEValidationFailureMessages():Array
    {
        if (model_internal::_DOMAIN_NOTEValidationFailureMessages == null)
            model_internal::calculateDOMAIN_NOTEIsValid();

        return _DOMAIN_NOTEValidationFailureMessages;
    }

    model_internal function set DOMAIN_NOTEValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_DOMAIN_NOTEValidationFailureMessages;

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
            model_internal::_DOMAIN_NOTEValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_NOTEValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get RECORD_SWITCHStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get RECORD_SWITCHValidator() : StyleValidator
    {
        return model_internal::_RECORD_SWITCHValidator;
    }

    model_internal function set _RECORD_SWITCHIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_RECORD_SWITCHIsValid;         
        if (oldValue !== value)
        {
            model_internal::_RECORD_SWITCHIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "RECORD_SWITCHIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get RECORD_SWITCHIsValid():Boolean
    {
        if (!model_internal::_RECORD_SWITCHIsValidCacheInitialized)
        {
            model_internal::calculateRECORD_SWITCHIsValid();
        }

        return model_internal::_RECORD_SWITCHIsValid;
    }

    model_internal function calculateRECORD_SWITCHIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_RECORD_SWITCHValidator.validate(model_internal::_instance.RECORD_SWITCH)
        model_internal::_RECORD_SWITCHIsValid_der = (valRes.results == null);
        model_internal::_RECORD_SWITCHIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::RECORD_SWITCHValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::RECORD_SWITCHValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get RECORD_SWITCHValidationFailureMessages():Array
    {
        if (model_internal::_RECORD_SWITCHValidationFailureMessages == null)
            model_internal::calculateRECORD_SWITCHIsValid();

        return _RECORD_SWITCHValidationFailureMessages;
    }

    model_internal function set RECORD_SWITCHValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_RECORD_SWITCHValidationFailureMessages;

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
            model_internal::_RECORD_SWITCHValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "RECORD_SWITCHValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get IS_SINGULARStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get IS_SINGULARValidator() : StyleValidator
    {
        return model_internal::_IS_SINGULARValidator;
    }

    model_internal function set _IS_SINGULARIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_IS_SINGULARIsValid;         
        if (oldValue !== value)
        {
            model_internal::_IS_SINGULARIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "IS_SINGULARIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get IS_SINGULARIsValid():Boolean
    {
        if (!model_internal::_IS_SINGULARIsValidCacheInitialized)
        {
            model_internal::calculateIS_SINGULARIsValid();
        }

        return model_internal::_IS_SINGULARIsValid;
    }

    model_internal function calculateIS_SINGULARIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_IS_SINGULARValidator.validate(model_internal::_instance.IS_SINGULAR)
        model_internal::_IS_SINGULARIsValid_der = (valRes.results == null);
        model_internal::_IS_SINGULARIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::IS_SINGULARValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::IS_SINGULARValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get IS_SINGULARValidationFailureMessages():Array
    {
        if (model_internal::_IS_SINGULARValidationFailureMessages == null)
            model_internal::calculateIS_SINGULARIsValid();

        return _IS_SINGULARValidationFailureMessages;
    }

    model_internal function set IS_SINGULARValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_IS_SINGULARValidationFailureMessages;

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
            model_internal::_IS_SINGULARValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "IS_SINGULARValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get DOMAIN_IDStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get DOMAIN_IDValidator() : StyleValidator
    {
        return model_internal::_DOMAIN_IDValidator;
    }

    model_internal function set _DOMAIN_IDIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_DOMAIN_IDIsValid;         
        if (oldValue !== value)
        {
            model_internal::_DOMAIN_IDIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_IDIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_IDIsValid():Boolean
    {
        if (!model_internal::_DOMAIN_IDIsValidCacheInitialized)
        {
            model_internal::calculateDOMAIN_IDIsValid();
        }

        return model_internal::_DOMAIN_IDIsValid;
    }

    model_internal function calculateDOMAIN_IDIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_DOMAIN_IDValidator.validate(model_internal::_instance.DOMAIN_ID)
        model_internal::_DOMAIN_IDIsValid_der = (valRes.results == null);
        model_internal::_DOMAIN_IDIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::DOMAIN_IDValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::DOMAIN_IDValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get DOMAIN_IDValidationFailureMessages():Array
    {
        if (model_internal::_DOMAIN_IDValidationFailureMessages == null)
            model_internal::calculateDOMAIN_IDIsValid();

        return _DOMAIN_IDValidationFailureMessages;
    }

    model_internal function set DOMAIN_IDValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_DOMAIN_IDValidationFailureMessages;

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
            model_internal::_DOMAIN_IDValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "DOMAIN_IDValidationFailureMessages", oldValue, value));
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
            case("DOMAIN_TEXT"):
            {
                return DOMAIN_TEXTValidationFailureMessages;
            }
            case("DOMAIN_CODE"):
            {
                return DOMAIN_CODEValidationFailureMessages;
            }
            case("RECORD_ORDER"):
            {
                return RECORD_ORDERValidationFailureMessages;
            }
            case("DOMAIN_NOTE"):
            {
                return DOMAIN_NOTEValidationFailureMessages;
            }
            case("RECORD_SWITCH"):
            {
                return RECORD_SWITCHValidationFailureMessages;
            }
            case("IS_SINGULAR"):
            {
                return IS_SINGULARValidationFailureMessages;
            }
            case("DOMAIN_ID"):
            {
                return DOMAIN_IDValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
