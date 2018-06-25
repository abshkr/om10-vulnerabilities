
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
import mx.collections.ArrayCollection;
import mx.events.ValidationResultEvent;
import valueObjects.DomainPrivilege_vo;
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.valueobjects.IModelType;
import mx.events.PropertyChangeEvent;

use namespace model_internal;

[ExcludeClass]
internal class _Urbac_RolesEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("role_note", "domainprivilege", "role_code_old", "role_code", "role_status", "role_rank", "role_text", "role_type");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("role_note", "domainprivilege", "role_code_old", "role_code", "role_status", "role_rank", "role_text", "role_type");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("role_note", "domainprivilege", "role_code_old", "role_code", "role_status", "role_rank", "role_text", "role_type");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("role_note", "domainprivilege", "role_code_old", "role_code", "role_status", "role_rank", "role_text", "role_type");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("role_note", "domainprivilege", "role_code_old", "role_code", "role_status", "role_rank", "role_text", "role_type");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array("domainprivilege");
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "Urbac_Roles";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _role_noteIsValid:Boolean;
    model_internal var _role_noteValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _role_noteIsValidCacheInitialized:Boolean = false;
    model_internal var _role_noteValidationFailureMessages:Array;
    
    model_internal var _domainprivilegeIsValid:Boolean;
    model_internal var _domainprivilegeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _domainprivilegeIsValidCacheInitialized:Boolean = false;
    model_internal var _domainprivilegeValidationFailureMessages:Array;
    
    model_internal var _role_code_oldIsValid:Boolean;
    model_internal var _role_code_oldValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _role_code_oldIsValidCacheInitialized:Boolean = false;
    model_internal var _role_code_oldValidationFailureMessages:Array;
    
    model_internal var _role_codeIsValid:Boolean;
    model_internal var _role_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _role_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _role_codeValidationFailureMessages:Array;
    
    model_internal var _role_statusIsValid:Boolean;
    model_internal var _role_statusValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _role_statusIsValidCacheInitialized:Boolean = false;
    model_internal var _role_statusValidationFailureMessages:Array;
    
    model_internal var _role_rankIsValid:Boolean;
    model_internal var _role_rankValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _role_rankIsValidCacheInitialized:Boolean = false;
    model_internal var _role_rankValidationFailureMessages:Array;
    
    model_internal var _role_textIsValid:Boolean;
    model_internal var _role_textValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _role_textIsValidCacheInitialized:Boolean = false;
    model_internal var _role_textValidationFailureMessages:Array;
    
    model_internal var _role_typeIsValid:Boolean;
    model_internal var _role_typeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _role_typeIsValidCacheInitialized:Boolean = false;
    model_internal var _role_typeValidationFailureMessages:Array;

    model_internal var _instance:_Super_Urbac_Roles;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _Urbac_RolesEntityMetadata(value : _Super_Urbac_Roles)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["role_note"] = new Array();
            model_internal::dependentsOnMap["domainprivilege"] = new Array();
            model_internal::dependentsOnMap["role_code_old"] = new Array();
            model_internal::dependentsOnMap["role_code"] = new Array();
            model_internal::dependentsOnMap["role_status"] = new Array();
            model_internal::dependentsOnMap["role_rank"] = new Array();
            model_internal::dependentsOnMap["role_text"] = new Array();
            model_internal::dependentsOnMap["role_type"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
            model_internal::collectionBaseMap["domainprivilege"] = "valueObjects.DomainPrivilege_vo";
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["role_note"] = "String";
        model_internal::propertyTypeMap["domainprivilege"] = "ArrayCollection";
        model_internal::propertyTypeMap["role_code_old"] = "Object";
        model_internal::propertyTypeMap["role_code"] = "String";
        model_internal::propertyTypeMap["role_status"] = "String";
        model_internal::propertyTypeMap["role_rank"] = "Object";
        model_internal::propertyTypeMap["role_text"] = "String";
        model_internal::propertyTypeMap["role_type"] = "Object";

        model_internal::_instance = value;
        model_internal::_role_noteValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRole_note);
        model_internal::_role_noteValidator.required = true;
        model_internal::_role_noteValidator.requiredFieldError = "role_note is required";
        //model_internal::_role_noteValidator.source = model_internal::_instance;
        //model_internal::_role_noteValidator.property = "role_note";
        model_internal::_domainprivilegeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDomainprivilege);
        model_internal::_domainprivilegeValidator.required = true;
        model_internal::_domainprivilegeValidator.requiredFieldError = "domainprivilege is required";
        //model_internal::_domainprivilegeValidator.source = model_internal::_instance;
        //model_internal::_domainprivilegeValidator.property = "domainprivilege";
        model_internal::_role_code_oldValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRole_code_old);
        model_internal::_role_code_oldValidator.required = true;
        model_internal::_role_code_oldValidator.requiredFieldError = "role_code_old is required";
        //model_internal::_role_code_oldValidator.source = model_internal::_instance;
        //model_internal::_role_code_oldValidator.property = "role_code_old";
        model_internal::_role_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRole_code);
        model_internal::_role_codeValidator.required = true;
        model_internal::_role_codeValidator.requiredFieldError = "role_code is required";
        //model_internal::_role_codeValidator.source = model_internal::_instance;
        //model_internal::_role_codeValidator.property = "role_code";
        model_internal::_role_statusValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRole_status);
        model_internal::_role_statusValidator.required = true;
        model_internal::_role_statusValidator.requiredFieldError = "role_status is required";
        //model_internal::_role_statusValidator.source = model_internal::_instance;
        //model_internal::_role_statusValidator.property = "role_status";
        model_internal::_role_rankValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRole_rank);
        model_internal::_role_rankValidator.required = true;
        model_internal::_role_rankValidator.requiredFieldError = "role_rank is required";
        //model_internal::_role_rankValidator.source = model_internal::_instance;
        //model_internal::_role_rankValidator.property = "role_rank";
        model_internal::_role_textValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRole_text);
        model_internal::_role_textValidator.required = true;
        model_internal::_role_textValidator.requiredFieldError = "role_text is required";
        //model_internal::_role_textValidator.source = model_internal::_instance;
        //model_internal::_role_textValidator.property = "role_text";
        model_internal::_role_typeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRole_type);
        model_internal::_role_typeValidator.required = true;
        model_internal::_role_typeValidator.requiredFieldError = "role_type is required";
        //model_internal::_role_typeValidator.source = model_internal::_instance;
        //model_internal::_role_typeValidator.property = "role_type";
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
            throw new Error(propertyName + " is not a data property of entity Urbac_Roles");
            
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
            throw new Error(propertyName + " is not a collection property of entity Urbac_Roles");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of Urbac_Roles");

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
            throw new Error(propertyName + " does not exist for entity Urbac_Roles");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity Urbac_Roles");
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
            throw new Error(propertyName + " does not exist for entity Urbac_Roles");
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
    public function get isRole_noteAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isDomainprivilegeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRole_code_oldAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRole_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRole_statusAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRole_rankAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRole_textAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRole_typeAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnRole_note():void
    {
        if (model_internal::_role_noteIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRole_note = null;
            model_internal::calculateRole_noteIsValid();
        }
    }
    public function invalidateDependentOnDomainprivilege():void
    {
        if (model_internal::_domainprivilegeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDomainprivilege = null;
            model_internal::calculateDomainprivilegeIsValid();
        }
    }
    public function invalidateDependentOnRole_code_old():void
    {
        if (model_internal::_role_code_oldIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRole_code_old = null;
            model_internal::calculateRole_code_oldIsValid();
        }
    }
    public function invalidateDependentOnRole_code():void
    {
        if (model_internal::_role_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRole_code = null;
            model_internal::calculateRole_codeIsValid();
        }
    }
    public function invalidateDependentOnRole_status():void
    {
        if (model_internal::_role_statusIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRole_status = null;
            model_internal::calculateRole_statusIsValid();
        }
    }
    public function invalidateDependentOnRole_rank():void
    {
        if (model_internal::_role_rankIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRole_rank = null;
            model_internal::calculateRole_rankIsValid();
        }
    }
    public function invalidateDependentOnRole_text():void
    {
        if (model_internal::_role_textIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRole_text = null;
            model_internal::calculateRole_textIsValid();
        }
    }
    public function invalidateDependentOnRole_type():void
    {
        if (model_internal::_role_typeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRole_type = null;
            model_internal::calculateRole_typeIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get role_noteStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get role_noteValidator() : StyleValidator
    {
        return model_internal::_role_noteValidator;
    }

    model_internal function set _role_noteIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_role_noteIsValid;         
        if (oldValue !== value)
        {
            model_internal::_role_noteIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_noteIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get role_noteIsValid():Boolean
    {
        if (!model_internal::_role_noteIsValidCacheInitialized)
        {
            model_internal::calculateRole_noteIsValid();
        }

        return model_internal::_role_noteIsValid;
    }

    model_internal function calculateRole_noteIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_role_noteValidator.validate(model_internal::_instance.role_note)
        model_internal::_role_noteIsValid_der = (valRes.results == null);
        model_internal::_role_noteIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::role_noteValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::role_noteValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get role_noteValidationFailureMessages():Array
    {
        if (model_internal::_role_noteValidationFailureMessages == null)
            model_internal::calculateRole_noteIsValid();

        return _role_noteValidationFailureMessages;
    }

    model_internal function set role_noteValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_role_noteValidationFailureMessages;

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
            model_internal::_role_noteValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_noteValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get domainprivilegeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get domainprivilegeValidator() : StyleValidator
    {
        return model_internal::_domainprivilegeValidator;
    }

    model_internal function set _domainprivilegeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_domainprivilegeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_domainprivilegeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "domainprivilegeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get domainprivilegeIsValid():Boolean
    {
        if (!model_internal::_domainprivilegeIsValidCacheInitialized)
        {
            model_internal::calculateDomainprivilegeIsValid();
        }

        return model_internal::_domainprivilegeIsValid;
    }

    model_internal function calculateDomainprivilegeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_domainprivilegeValidator.validate(model_internal::_instance.domainprivilege)
        model_internal::_domainprivilegeIsValid_der = (valRes.results == null);
        model_internal::_domainprivilegeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::domainprivilegeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::domainprivilegeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get domainprivilegeValidationFailureMessages():Array
    {
        if (model_internal::_domainprivilegeValidationFailureMessages == null)
            model_internal::calculateDomainprivilegeIsValid();

        return _domainprivilegeValidationFailureMessages;
    }

    model_internal function set domainprivilegeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_domainprivilegeValidationFailureMessages;

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
            model_internal::_domainprivilegeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "domainprivilegeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get role_code_oldStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get role_code_oldValidator() : StyleValidator
    {
        return model_internal::_role_code_oldValidator;
    }

    model_internal function set _role_code_oldIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_role_code_oldIsValid;         
        if (oldValue !== value)
        {
            model_internal::_role_code_oldIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_code_oldIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get role_code_oldIsValid():Boolean
    {
        if (!model_internal::_role_code_oldIsValidCacheInitialized)
        {
            model_internal::calculateRole_code_oldIsValid();
        }

        return model_internal::_role_code_oldIsValid;
    }

    model_internal function calculateRole_code_oldIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_role_code_oldValidator.validate(model_internal::_instance.role_code_old)
        model_internal::_role_code_oldIsValid_der = (valRes.results == null);
        model_internal::_role_code_oldIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::role_code_oldValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::role_code_oldValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get role_code_oldValidationFailureMessages():Array
    {
        if (model_internal::_role_code_oldValidationFailureMessages == null)
            model_internal::calculateRole_code_oldIsValid();

        return _role_code_oldValidationFailureMessages;
    }

    model_internal function set role_code_oldValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_role_code_oldValidationFailureMessages;

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
            model_internal::_role_code_oldValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_code_oldValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get role_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get role_codeValidator() : StyleValidator
    {
        return model_internal::_role_codeValidator;
    }

    model_internal function set _role_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_role_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_role_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get role_codeIsValid():Boolean
    {
        if (!model_internal::_role_codeIsValidCacheInitialized)
        {
            model_internal::calculateRole_codeIsValid();
        }

        return model_internal::_role_codeIsValid;
    }

    model_internal function calculateRole_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_role_codeValidator.validate(model_internal::_instance.role_code)
        model_internal::_role_codeIsValid_der = (valRes.results == null);
        model_internal::_role_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::role_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::role_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get role_codeValidationFailureMessages():Array
    {
        if (model_internal::_role_codeValidationFailureMessages == null)
            model_internal::calculateRole_codeIsValid();

        return _role_codeValidationFailureMessages;
    }

    model_internal function set role_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_role_codeValidationFailureMessages;

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
            model_internal::_role_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get role_statusStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get role_statusValidator() : StyleValidator
    {
        return model_internal::_role_statusValidator;
    }

    model_internal function set _role_statusIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_role_statusIsValid;         
        if (oldValue !== value)
        {
            model_internal::_role_statusIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_statusIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get role_statusIsValid():Boolean
    {
        if (!model_internal::_role_statusIsValidCacheInitialized)
        {
            model_internal::calculateRole_statusIsValid();
        }

        return model_internal::_role_statusIsValid;
    }

    model_internal function calculateRole_statusIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_role_statusValidator.validate(model_internal::_instance.role_status)
        model_internal::_role_statusIsValid_der = (valRes.results == null);
        model_internal::_role_statusIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::role_statusValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::role_statusValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get role_statusValidationFailureMessages():Array
    {
        if (model_internal::_role_statusValidationFailureMessages == null)
            model_internal::calculateRole_statusIsValid();

        return _role_statusValidationFailureMessages;
    }

    model_internal function set role_statusValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_role_statusValidationFailureMessages;

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
            model_internal::_role_statusValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_statusValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get role_rankStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get role_rankValidator() : StyleValidator
    {
        return model_internal::_role_rankValidator;
    }

    model_internal function set _role_rankIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_role_rankIsValid;         
        if (oldValue !== value)
        {
            model_internal::_role_rankIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_rankIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get role_rankIsValid():Boolean
    {
        if (!model_internal::_role_rankIsValidCacheInitialized)
        {
            model_internal::calculateRole_rankIsValid();
        }

        return model_internal::_role_rankIsValid;
    }

    model_internal function calculateRole_rankIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_role_rankValidator.validate(model_internal::_instance.role_rank)
        model_internal::_role_rankIsValid_der = (valRes.results == null);
        model_internal::_role_rankIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::role_rankValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::role_rankValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get role_rankValidationFailureMessages():Array
    {
        if (model_internal::_role_rankValidationFailureMessages == null)
            model_internal::calculateRole_rankIsValid();

        return _role_rankValidationFailureMessages;
    }

    model_internal function set role_rankValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_role_rankValidationFailureMessages;

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
            model_internal::_role_rankValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_rankValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get role_textStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get role_textValidator() : StyleValidator
    {
        return model_internal::_role_textValidator;
    }

    model_internal function set _role_textIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_role_textIsValid;         
        if (oldValue !== value)
        {
            model_internal::_role_textIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_textIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get role_textIsValid():Boolean
    {
        if (!model_internal::_role_textIsValidCacheInitialized)
        {
            model_internal::calculateRole_textIsValid();
        }

        return model_internal::_role_textIsValid;
    }

    model_internal function calculateRole_textIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_role_textValidator.validate(model_internal::_instance.role_text)
        model_internal::_role_textIsValid_der = (valRes.results == null);
        model_internal::_role_textIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::role_textValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::role_textValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get role_textValidationFailureMessages():Array
    {
        if (model_internal::_role_textValidationFailureMessages == null)
            model_internal::calculateRole_textIsValid();

        return _role_textValidationFailureMessages;
    }

    model_internal function set role_textValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_role_textValidationFailureMessages;

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
            model_internal::_role_textValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_textValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get role_typeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get role_typeValidator() : StyleValidator
    {
        return model_internal::_role_typeValidator;
    }

    model_internal function set _role_typeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_role_typeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_role_typeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_typeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get role_typeIsValid():Boolean
    {
        if (!model_internal::_role_typeIsValidCacheInitialized)
        {
            model_internal::calculateRole_typeIsValid();
        }

        return model_internal::_role_typeIsValid;
    }

    model_internal function calculateRole_typeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_role_typeValidator.validate(model_internal::_instance.role_type)
        model_internal::_role_typeIsValid_der = (valRes.results == null);
        model_internal::_role_typeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::role_typeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::role_typeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get role_typeValidationFailureMessages():Array
    {
        if (model_internal::_role_typeValidationFailureMessages == null)
            model_internal::calculateRole_typeIsValid();

        return _role_typeValidationFailureMessages;
    }

    model_internal function set role_typeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_role_typeValidationFailureMessages;

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
            model_internal::_role_typeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "role_typeValidationFailureMessages", oldValue, value));
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
            case("role_note"):
            {
                return role_noteValidationFailureMessages;
            }
            case("domainprivilege"):
            {
                return domainprivilegeValidationFailureMessages;
            }
            case("role_code_old"):
            {
                return role_code_oldValidationFailureMessages;
            }
            case("role_code"):
            {
                return role_codeValidationFailureMessages;
            }
            case("role_status"):
            {
                return role_statusValidationFailureMessages;
            }
            case("role_rank"):
            {
                return role_rankValidationFailureMessages;
            }
            case("role_text"):
            {
                return role_textValidationFailureMessages;
            }
            case("role_type"):
            {
                return role_typeValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
