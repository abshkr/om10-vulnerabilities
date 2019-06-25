
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
internal class _UserRolesEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("ROLE_TYPE", "ROLE_TEXT", "ROLE_STATUS", "RECORD_ORDER", "ROLE_RANK", "ROLE_NOTE", "RECORD_SWITCH", "ROLE_CODE", "ROLE_ID");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("ROLE_TYPE", "ROLE_TEXT", "ROLE_STATUS", "RECORD_ORDER", "ROLE_RANK", "ROLE_NOTE", "RECORD_SWITCH", "ROLE_CODE", "ROLE_ID");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("ROLE_TYPE", "ROLE_TEXT", "ROLE_STATUS", "RECORD_ORDER", "ROLE_RANK", "ROLE_NOTE", "RECORD_SWITCH", "ROLE_CODE", "ROLE_ID");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("ROLE_TYPE", "ROLE_TEXT", "ROLE_STATUS", "RECORD_ORDER", "ROLE_RANK", "ROLE_NOTE", "RECORD_SWITCH", "ROLE_CODE", "ROLE_ID");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("ROLE_TYPE", "ROLE_TEXT", "ROLE_STATUS", "RECORD_ORDER", "ROLE_RANK", "ROLE_NOTE", "RECORD_SWITCH", "ROLE_CODE", "ROLE_ID");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "UserRoles";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _ROLE_TYPEIsValid:Boolean;
    model_internal var _ROLE_TYPEValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _ROLE_TYPEIsValidCacheInitialized:Boolean = false;
    model_internal var _ROLE_TYPEValidationFailureMessages:Array;
    
    model_internal var _ROLE_TEXTIsValid:Boolean;
    model_internal var _ROLE_TEXTValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _ROLE_TEXTIsValidCacheInitialized:Boolean = false;
    model_internal var _ROLE_TEXTValidationFailureMessages:Array;
    
    model_internal var _ROLE_STATUSIsValid:Boolean;
    model_internal var _ROLE_STATUSValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _ROLE_STATUSIsValidCacheInitialized:Boolean = false;
    model_internal var _ROLE_STATUSValidationFailureMessages:Array;
    
    model_internal var _RECORD_ORDERIsValid:Boolean;
    model_internal var _RECORD_ORDERValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _RECORD_ORDERIsValidCacheInitialized:Boolean = false;
    model_internal var _RECORD_ORDERValidationFailureMessages:Array;
    
    model_internal var _ROLE_RANKIsValid:Boolean;
    model_internal var _ROLE_RANKValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _ROLE_RANKIsValidCacheInitialized:Boolean = false;
    model_internal var _ROLE_RANKValidationFailureMessages:Array;
    
    model_internal var _ROLE_NOTEIsValid:Boolean;
    model_internal var _ROLE_NOTEValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _ROLE_NOTEIsValidCacheInitialized:Boolean = false;
    model_internal var _ROLE_NOTEValidationFailureMessages:Array;
    
    model_internal var _RECORD_SWITCHIsValid:Boolean;
    model_internal var _RECORD_SWITCHValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _RECORD_SWITCHIsValidCacheInitialized:Boolean = false;
    model_internal var _RECORD_SWITCHValidationFailureMessages:Array;
    
    model_internal var _ROLE_CODEIsValid:Boolean;
    model_internal var _ROLE_CODEValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _ROLE_CODEIsValidCacheInitialized:Boolean = false;
    model_internal var _ROLE_CODEValidationFailureMessages:Array;
    
    model_internal var _ROLE_IDIsValid:Boolean;
    model_internal var _ROLE_IDValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _ROLE_IDIsValidCacheInitialized:Boolean = false;
    model_internal var _ROLE_IDValidationFailureMessages:Array;

    model_internal var _instance:_Super_UserRoles;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _UserRolesEntityMetadata(value : _Super_UserRoles)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["ROLE_TYPE"] = new Array();
            model_internal::dependentsOnMap["ROLE_TEXT"] = new Array();
            model_internal::dependentsOnMap["ROLE_STATUS"] = new Array();
            model_internal::dependentsOnMap["RECORD_ORDER"] = new Array();
            model_internal::dependentsOnMap["ROLE_RANK"] = new Array();
            model_internal::dependentsOnMap["ROLE_NOTE"] = new Array();
            model_internal::dependentsOnMap["RECORD_SWITCH"] = new Array();
            model_internal::dependentsOnMap["ROLE_CODE"] = new Array();
            model_internal::dependentsOnMap["ROLE_ID"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["ROLE_TYPE"] = "String";
        model_internal::propertyTypeMap["ROLE_TEXT"] = "String";
        model_internal::propertyTypeMap["ROLE_STATUS"] = "String";
        model_internal::propertyTypeMap["RECORD_ORDER"] = "String";
        model_internal::propertyTypeMap["ROLE_RANK"] = "String";
        model_internal::propertyTypeMap["ROLE_NOTE"] = "String";
        model_internal::propertyTypeMap["RECORD_SWITCH"] = "String";
        model_internal::propertyTypeMap["ROLE_CODE"] = "String";
        model_internal::propertyTypeMap["ROLE_ID"] = "String";

        model_internal::_instance = value;
        model_internal::_ROLE_TYPEValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForROLE_TYPE);
        model_internal::_ROLE_TYPEValidator.required = true;
        model_internal::_ROLE_TYPEValidator.requiredFieldError = "ROLE_TYPE is required";
        //model_internal::_ROLE_TYPEValidator.source = model_internal::_instance;
        //model_internal::_ROLE_TYPEValidator.property = "ROLE_TYPE";
        model_internal::_ROLE_TEXTValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForROLE_TEXT);
        model_internal::_ROLE_TEXTValidator.required = true;
        model_internal::_ROLE_TEXTValidator.requiredFieldError = "ROLE_TEXT is required";
        //model_internal::_ROLE_TEXTValidator.source = model_internal::_instance;
        //model_internal::_ROLE_TEXTValidator.property = "ROLE_TEXT";
        model_internal::_ROLE_STATUSValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForROLE_STATUS);
        model_internal::_ROLE_STATUSValidator.required = true;
        model_internal::_ROLE_STATUSValidator.requiredFieldError = "ROLE_STATUS is required";
        //model_internal::_ROLE_STATUSValidator.source = model_internal::_instance;
        //model_internal::_ROLE_STATUSValidator.property = "ROLE_STATUS";
        model_internal::_RECORD_ORDERValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRECORD_ORDER);
        model_internal::_RECORD_ORDERValidator.required = true;
        model_internal::_RECORD_ORDERValidator.requiredFieldError = "RECORD_ORDER is required";
        //model_internal::_RECORD_ORDERValidator.source = model_internal::_instance;
        //model_internal::_RECORD_ORDERValidator.property = "RECORD_ORDER";
        model_internal::_ROLE_RANKValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForROLE_RANK);
        model_internal::_ROLE_RANKValidator.required = true;
        model_internal::_ROLE_RANKValidator.requiredFieldError = "ROLE_RANK is required";
        //model_internal::_ROLE_RANKValidator.source = model_internal::_instance;
        //model_internal::_ROLE_RANKValidator.property = "ROLE_RANK";
        model_internal::_ROLE_NOTEValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForROLE_NOTE);
        model_internal::_ROLE_NOTEValidator.required = true;
        model_internal::_ROLE_NOTEValidator.requiredFieldError = "ROLE_NOTE is required";
        //model_internal::_ROLE_NOTEValidator.source = model_internal::_instance;
        //model_internal::_ROLE_NOTEValidator.property = "ROLE_NOTE";
        model_internal::_RECORD_SWITCHValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRECORD_SWITCH);
        model_internal::_RECORD_SWITCHValidator.required = true;
        model_internal::_RECORD_SWITCHValidator.requiredFieldError = "RECORD_SWITCH is required";
        //model_internal::_RECORD_SWITCHValidator.source = model_internal::_instance;
        //model_internal::_RECORD_SWITCHValidator.property = "RECORD_SWITCH";
        model_internal::_ROLE_CODEValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForROLE_CODE);
        model_internal::_ROLE_CODEValidator.required = true;
        model_internal::_ROLE_CODEValidator.requiredFieldError = "ROLE_CODE is required";
        //model_internal::_ROLE_CODEValidator.source = model_internal::_instance;
        //model_internal::_ROLE_CODEValidator.property = "ROLE_CODE";
        model_internal::_ROLE_IDValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForROLE_ID);
        model_internal::_ROLE_IDValidator.required = true;
        model_internal::_ROLE_IDValidator.requiredFieldError = "ROLE_ID is required";
        //model_internal::_ROLE_IDValidator.source = model_internal::_instance;
        //model_internal::_ROLE_IDValidator.property = "ROLE_ID";
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
            throw new Error(propertyName + " is not a data property of entity UserRoles");
            
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
            throw new Error(propertyName + " is not a collection property of entity UserRoles");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of UserRoles");

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
            throw new Error(propertyName + " does not exist for entity UserRoles");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity UserRoles");
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
            throw new Error(propertyName + " does not exist for entity UserRoles");
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
    public function get isROLE_TYPEAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isROLE_TEXTAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isROLE_STATUSAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRECORD_ORDERAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isROLE_RANKAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isROLE_NOTEAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRECORD_SWITCHAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isROLE_CODEAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isROLE_IDAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnROLE_TYPE():void
    {
        if (model_internal::_ROLE_TYPEIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfROLE_TYPE = null;
            model_internal::calculateROLE_TYPEIsValid();
        }
    }
    public function invalidateDependentOnROLE_TEXT():void
    {
        if (model_internal::_ROLE_TEXTIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfROLE_TEXT = null;
            model_internal::calculateROLE_TEXTIsValid();
        }
    }
    public function invalidateDependentOnROLE_STATUS():void
    {
        if (model_internal::_ROLE_STATUSIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfROLE_STATUS = null;
            model_internal::calculateROLE_STATUSIsValid();
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
    public function invalidateDependentOnROLE_RANK():void
    {
        if (model_internal::_ROLE_RANKIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfROLE_RANK = null;
            model_internal::calculateROLE_RANKIsValid();
        }
    }
    public function invalidateDependentOnROLE_NOTE():void
    {
        if (model_internal::_ROLE_NOTEIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfROLE_NOTE = null;
            model_internal::calculateROLE_NOTEIsValid();
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
    public function invalidateDependentOnROLE_CODE():void
    {
        if (model_internal::_ROLE_CODEIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfROLE_CODE = null;
            model_internal::calculateROLE_CODEIsValid();
        }
    }
    public function invalidateDependentOnROLE_ID():void
    {
        if (model_internal::_ROLE_IDIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfROLE_ID = null;
            model_internal::calculateROLE_IDIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get ROLE_TYPEStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get ROLE_TYPEValidator() : StyleValidator
    {
        return model_internal::_ROLE_TYPEValidator;
    }

    model_internal function set _ROLE_TYPEIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_ROLE_TYPEIsValid;         
        if (oldValue !== value)
        {
            model_internal::_ROLE_TYPEIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_TYPEIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_TYPEIsValid():Boolean
    {
        if (!model_internal::_ROLE_TYPEIsValidCacheInitialized)
        {
            model_internal::calculateROLE_TYPEIsValid();
        }

        return model_internal::_ROLE_TYPEIsValid;
    }

    model_internal function calculateROLE_TYPEIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_ROLE_TYPEValidator.validate(model_internal::_instance.ROLE_TYPE)
        model_internal::_ROLE_TYPEIsValid_der = (valRes.results == null);
        model_internal::_ROLE_TYPEIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::ROLE_TYPEValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::ROLE_TYPEValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_TYPEValidationFailureMessages():Array
    {
        if (model_internal::_ROLE_TYPEValidationFailureMessages == null)
            model_internal::calculateROLE_TYPEIsValid();

        return _ROLE_TYPEValidationFailureMessages;
    }

    model_internal function set ROLE_TYPEValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_ROLE_TYPEValidationFailureMessages;

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
            model_internal::_ROLE_TYPEValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_TYPEValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get ROLE_TEXTStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get ROLE_TEXTValidator() : StyleValidator
    {
        return model_internal::_ROLE_TEXTValidator;
    }

    model_internal function set _ROLE_TEXTIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_ROLE_TEXTIsValid;         
        if (oldValue !== value)
        {
            model_internal::_ROLE_TEXTIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_TEXTIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_TEXTIsValid():Boolean
    {
        if (!model_internal::_ROLE_TEXTIsValidCacheInitialized)
        {
            model_internal::calculateROLE_TEXTIsValid();
        }

        return model_internal::_ROLE_TEXTIsValid;
    }

    model_internal function calculateROLE_TEXTIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_ROLE_TEXTValidator.validate(model_internal::_instance.ROLE_TEXT)
        model_internal::_ROLE_TEXTIsValid_der = (valRes.results == null);
        model_internal::_ROLE_TEXTIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::ROLE_TEXTValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::ROLE_TEXTValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_TEXTValidationFailureMessages():Array
    {
        if (model_internal::_ROLE_TEXTValidationFailureMessages == null)
            model_internal::calculateROLE_TEXTIsValid();

        return _ROLE_TEXTValidationFailureMessages;
    }

    model_internal function set ROLE_TEXTValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_ROLE_TEXTValidationFailureMessages;

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
            model_internal::_ROLE_TEXTValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_TEXTValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get ROLE_STATUSStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get ROLE_STATUSValidator() : StyleValidator
    {
        return model_internal::_ROLE_STATUSValidator;
    }

    model_internal function set _ROLE_STATUSIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_ROLE_STATUSIsValid;         
        if (oldValue !== value)
        {
            model_internal::_ROLE_STATUSIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_STATUSIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_STATUSIsValid():Boolean
    {
        if (!model_internal::_ROLE_STATUSIsValidCacheInitialized)
        {
            model_internal::calculateROLE_STATUSIsValid();
        }

        return model_internal::_ROLE_STATUSIsValid;
    }

    model_internal function calculateROLE_STATUSIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_ROLE_STATUSValidator.validate(model_internal::_instance.ROLE_STATUS)
        model_internal::_ROLE_STATUSIsValid_der = (valRes.results == null);
        model_internal::_ROLE_STATUSIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::ROLE_STATUSValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::ROLE_STATUSValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_STATUSValidationFailureMessages():Array
    {
        if (model_internal::_ROLE_STATUSValidationFailureMessages == null)
            model_internal::calculateROLE_STATUSIsValid();

        return _ROLE_STATUSValidationFailureMessages;
    }

    model_internal function set ROLE_STATUSValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_ROLE_STATUSValidationFailureMessages;

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
            model_internal::_ROLE_STATUSValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_STATUSValidationFailureMessages", oldValue, value));
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
    public function get ROLE_RANKStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get ROLE_RANKValidator() : StyleValidator
    {
        return model_internal::_ROLE_RANKValidator;
    }

    model_internal function set _ROLE_RANKIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_ROLE_RANKIsValid;         
        if (oldValue !== value)
        {
            model_internal::_ROLE_RANKIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_RANKIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_RANKIsValid():Boolean
    {
        if (!model_internal::_ROLE_RANKIsValidCacheInitialized)
        {
            model_internal::calculateROLE_RANKIsValid();
        }

        return model_internal::_ROLE_RANKIsValid;
    }

    model_internal function calculateROLE_RANKIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_ROLE_RANKValidator.validate(model_internal::_instance.ROLE_RANK)
        model_internal::_ROLE_RANKIsValid_der = (valRes.results == null);
        model_internal::_ROLE_RANKIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::ROLE_RANKValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::ROLE_RANKValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_RANKValidationFailureMessages():Array
    {
        if (model_internal::_ROLE_RANKValidationFailureMessages == null)
            model_internal::calculateROLE_RANKIsValid();

        return _ROLE_RANKValidationFailureMessages;
    }

    model_internal function set ROLE_RANKValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_ROLE_RANKValidationFailureMessages;

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
            model_internal::_ROLE_RANKValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_RANKValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get ROLE_NOTEStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get ROLE_NOTEValidator() : StyleValidator
    {
        return model_internal::_ROLE_NOTEValidator;
    }

    model_internal function set _ROLE_NOTEIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_ROLE_NOTEIsValid;         
        if (oldValue !== value)
        {
            model_internal::_ROLE_NOTEIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_NOTEIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_NOTEIsValid():Boolean
    {
        if (!model_internal::_ROLE_NOTEIsValidCacheInitialized)
        {
            model_internal::calculateROLE_NOTEIsValid();
        }

        return model_internal::_ROLE_NOTEIsValid;
    }

    model_internal function calculateROLE_NOTEIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_ROLE_NOTEValidator.validate(model_internal::_instance.ROLE_NOTE)
        model_internal::_ROLE_NOTEIsValid_der = (valRes.results == null);
        model_internal::_ROLE_NOTEIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::ROLE_NOTEValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::ROLE_NOTEValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_NOTEValidationFailureMessages():Array
    {
        if (model_internal::_ROLE_NOTEValidationFailureMessages == null)
            model_internal::calculateROLE_NOTEIsValid();

        return _ROLE_NOTEValidationFailureMessages;
    }

    model_internal function set ROLE_NOTEValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_ROLE_NOTEValidationFailureMessages;

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
            model_internal::_ROLE_NOTEValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_NOTEValidationFailureMessages", oldValue, value));
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
    public function get ROLE_CODEStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get ROLE_CODEValidator() : StyleValidator
    {
        return model_internal::_ROLE_CODEValidator;
    }

    model_internal function set _ROLE_CODEIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_ROLE_CODEIsValid;         
        if (oldValue !== value)
        {
            model_internal::_ROLE_CODEIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_CODEIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_CODEIsValid():Boolean
    {
        if (!model_internal::_ROLE_CODEIsValidCacheInitialized)
        {
            model_internal::calculateROLE_CODEIsValid();
        }

        return model_internal::_ROLE_CODEIsValid;
    }

    model_internal function calculateROLE_CODEIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_ROLE_CODEValidator.validate(model_internal::_instance.ROLE_CODE)
        model_internal::_ROLE_CODEIsValid_der = (valRes.results == null);
        model_internal::_ROLE_CODEIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::ROLE_CODEValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::ROLE_CODEValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_CODEValidationFailureMessages():Array
    {
        if (model_internal::_ROLE_CODEValidationFailureMessages == null)
            model_internal::calculateROLE_CODEIsValid();

        return _ROLE_CODEValidationFailureMessages;
    }

    model_internal function set ROLE_CODEValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_ROLE_CODEValidationFailureMessages;

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
            model_internal::_ROLE_CODEValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_CODEValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get ROLE_IDStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get ROLE_IDValidator() : StyleValidator
    {
        return model_internal::_ROLE_IDValidator;
    }

    model_internal function set _ROLE_IDIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_ROLE_IDIsValid;         
        if (oldValue !== value)
        {
            model_internal::_ROLE_IDIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_IDIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_IDIsValid():Boolean
    {
        if (!model_internal::_ROLE_IDIsValidCacheInitialized)
        {
            model_internal::calculateROLE_IDIsValid();
        }

        return model_internal::_ROLE_IDIsValid;
    }

    model_internal function calculateROLE_IDIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_ROLE_IDValidator.validate(model_internal::_instance.ROLE_ID)
        model_internal::_ROLE_IDIsValid_der = (valRes.results == null);
        model_internal::_ROLE_IDIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::ROLE_IDValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::ROLE_IDValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get ROLE_IDValidationFailureMessages():Array
    {
        if (model_internal::_ROLE_IDValidationFailureMessages == null)
            model_internal::calculateROLE_IDIsValid();

        return _ROLE_IDValidationFailureMessages;
    }

    model_internal function set ROLE_IDValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_ROLE_IDValidationFailureMessages;

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
            model_internal::_ROLE_IDValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ROLE_IDValidationFailureMessages", oldValue, value));
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
            case("ROLE_TYPE"):
            {
                return ROLE_TYPEValidationFailureMessages;
            }
            case("ROLE_TEXT"):
            {
                return ROLE_TEXTValidationFailureMessages;
            }
            case("ROLE_STATUS"):
            {
                return ROLE_STATUSValidationFailureMessages;
            }
            case("RECORD_ORDER"):
            {
                return RECORD_ORDERValidationFailureMessages;
            }
            case("ROLE_RANK"):
            {
                return ROLE_RANKValidationFailureMessages;
            }
            case("ROLE_NOTE"):
            {
                return ROLE_NOTEValidationFailureMessages;
            }
            case("RECORD_SWITCH"):
            {
                return RECORD_SWITCHValidationFailureMessages;
            }
            case("ROLE_CODE"):
            {
                return ROLE_CODEValidationFailureMessages;
            }
            case("ROLE_ID"):
            {
                return ROLE_IDValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
