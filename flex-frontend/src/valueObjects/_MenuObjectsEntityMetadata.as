
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
internal class _MenuObjectsEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("record_switch", "object_note", "object_source", "object_id", "domain_id", "record_order", "object_code", "domain_object_active", "object_type", "object_icon_id", "modules", "domain_object_id", "object_parent_id", "object_text", "object_module_id", "domain_text");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("record_switch", "object_note", "object_source", "object_id", "domain_id", "record_order", "object_code", "domain_object_active", "object_type", "object_icon_id", "modules", "domain_object_id", "object_parent_id", "object_text", "object_module_id", "domain_text");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("record_switch", "object_note", "object_source", "object_id", "domain_id", "record_order", "object_code", "domain_object_active", "object_type", "object_icon_id", "modules", "domain_object_id", "object_parent_id", "object_text", "object_module_id", "domain_text");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("record_switch", "object_note", "object_source", "object_id", "domain_id", "record_order", "object_code", "domain_object_active", "object_type", "object_icon_id", "modules", "domain_object_id", "object_parent_id", "object_text", "object_module_id", "domain_text");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("record_switch", "object_note", "object_source", "object_id", "domain_id", "record_order", "object_code", "domain_object_active", "object_type", "object_icon_id", "modules", "domain_object_id", "object_parent_id", "object_text", "object_module_id", "domain_text");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "MenuObjects";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _record_switchIsValid:Boolean;
    model_internal var _record_switchValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _record_switchIsValidCacheInitialized:Boolean = false;
    model_internal var _record_switchValidationFailureMessages:Array;
    
    model_internal var _object_noteIsValid:Boolean;
    model_internal var _object_noteValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _object_noteIsValidCacheInitialized:Boolean = false;
    model_internal var _object_noteValidationFailureMessages:Array;
    
    model_internal var _object_sourceIsValid:Boolean;
    model_internal var _object_sourceValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _object_sourceIsValidCacheInitialized:Boolean = false;
    model_internal var _object_sourceValidationFailureMessages:Array;
    
    model_internal var _object_idIsValid:Boolean;
    model_internal var _object_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _object_idIsValidCacheInitialized:Boolean = false;
    model_internal var _object_idValidationFailureMessages:Array;
    
    model_internal var _domain_idIsValid:Boolean;
    model_internal var _domain_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _domain_idIsValidCacheInitialized:Boolean = false;
    model_internal var _domain_idValidationFailureMessages:Array;
    
    model_internal var _record_orderIsValid:Boolean;
    model_internal var _record_orderValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _record_orderIsValidCacheInitialized:Boolean = false;
    model_internal var _record_orderValidationFailureMessages:Array;
    
    model_internal var _object_codeIsValid:Boolean;
    model_internal var _object_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _object_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _object_codeValidationFailureMessages:Array;
    
    model_internal var _domain_object_activeIsValid:Boolean;
    model_internal var _domain_object_activeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _domain_object_activeIsValidCacheInitialized:Boolean = false;
    model_internal var _domain_object_activeValidationFailureMessages:Array;
    
    model_internal var _object_typeIsValid:Boolean;
    model_internal var _object_typeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _object_typeIsValidCacheInitialized:Boolean = false;
    model_internal var _object_typeValidationFailureMessages:Array;
    
    model_internal var _object_icon_idIsValid:Boolean;
    model_internal var _object_icon_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _object_icon_idIsValidCacheInitialized:Boolean = false;
    model_internal var _object_icon_idValidationFailureMessages:Array;
    
    model_internal var _modulesIsValid:Boolean;
    model_internal var _modulesValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _modulesIsValidCacheInitialized:Boolean = false;
    model_internal var _modulesValidationFailureMessages:Array;
    
    model_internal var _domain_object_idIsValid:Boolean;
    model_internal var _domain_object_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _domain_object_idIsValidCacheInitialized:Boolean = false;
    model_internal var _domain_object_idValidationFailureMessages:Array;
    
    model_internal var _object_parent_idIsValid:Boolean;
    model_internal var _object_parent_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _object_parent_idIsValidCacheInitialized:Boolean = false;
    model_internal var _object_parent_idValidationFailureMessages:Array;
    
    model_internal var _object_textIsValid:Boolean;
    model_internal var _object_textValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _object_textIsValidCacheInitialized:Boolean = false;
    model_internal var _object_textValidationFailureMessages:Array;
    
    model_internal var _object_module_idIsValid:Boolean;
    model_internal var _object_module_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _object_module_idIsValidCacheInitialized:Boolean = false;
    model_internal var _object_module_idValidationFailureMessages:Array;
    
    model_internal var _domain_textIsValid:Boolean;
    model_internal var _domain_textValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _domain_textIsValidCacheInitialized:Boolean = false;
    model_internal var _domain_textValidationFailureMessages:Array;

    model_internal var _instance:_Super_MenuObjects;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _MenuObjectsEntityMetadata(value : _Super_MenuObjects)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["record_switch"] = new Array();
            model_internal::dependentsOnMap["object_note"] = new Array();
            model_internal::dependentsOnMap["object_source"] = new Array();
            model_internal::dependentsOnMap["object_id"] = new Array();
            model_internal::dependentsOnMap["domain_id"] = new Array();
            model_internal::dependentsOnMap["record_order"] = new Array();
            model_internal::dependentsOnMap["object_code"] = new Array();
            model_internal::dependentsOnMap["domain_object_active"] = new Array();
            model_internal::dependentsOnMap["object_type"] = new Array();
            model_internal::dependentsOnMap["object_icon_id"] = new Array();
            model_internal::dependentsOnMap["modules"] = new Array();
            model_internal::dependentsOnMap["domain_object_id"] = new Array();
            model_internal::dependentsOnMap["object_parent_id"] = new Array();
            model_internal::dependentsOnMap["object_text"] = new Array();
            model_internal::dependentsOnMap["object_module_id"] = new Array();
            model_internal::dependentsOnMap["domain_text"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["record_switch"] = "String";
        model_internal::propertyTypeMap["object_note"] = "Object";
        model_internal::propertyTypeMap["object_source"] = "Object";
        model_internal::propertyTypeMap["object_id"] = "String";
        model_internal::propertyTypeMap["domain_id"] = "String";
        model_internal::propertyTypeMap["record_order"] = "String";
        model_internal::propertyTypeMap["object_code"] = "String";
        model_internal::propertyTypeMap["domain_object_active"] = "String";
        model_internal::propertyTypeMap["object_type"] = "String";
        model_internal::propertyTypeMap["object_icon_id"] = "Object";
        model_internal::propertyTypeMap["modules"] = "Object";
        model_internal::propertyTypeMap["domain_object_id"] = "String";
        model_internal::propertyTypeMap["object_parent_id"] = "String";
        model_internal::propertyTypeMap["object_text"] = "String";
        model_internal::propertyTypeMap["object_module_id"] = "Object";
        model_internal::propertyTypeMap["domain_text"] = "String";

        model_internal::_instance = value;
        model_internal::_record_switchValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRecord_switch);
        model_internal::_record_switchValidator.required = true;
        model_internal::_record_switchValidator.requiredFieldError = "record_switch is required";
        //model_internal::_record_switchValidator.source = model_internal::_instance;
        //model_internal::_record_switchValidator.property = "record_switch";
        model_internal::_object_noteValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForObject_note);
        model_internal::_object_noteValidator.required = true;
        model_internal::_object_noteValidator.requiredFieldError = "object_note is required";
        //model_internal::_object_noteValidator.source = model_internal::_instance;
        //model_internal::_object_noteValidator.property = "object_note";
        model_internal::_object_sourceValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForObject_source);
        model_internal::_object_sourceValidator.required = true;
        model_internal::_object_sourceValidator.requiredFieldError = "object_source is required";
        //model_internal::_object_sourceValidator.source = model_internal::_instance;
        //model_internal::_object_sourceValidator.property = "object_source";
        model_internal::_object_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForObject_id);
        model_internal::_object_idValidator.required = true;
        model_internal::_object_idValidator.requiredFieldError = "object_id is required";
        //model_internal::_object_idValidator.source = model_internal::_instance;
        //model_internal::_object_idValidator.property = "object_id";
        model_internal::_domain_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDomain_id);
        model_internal::_domain_idValidator.required = true;
        model_internal::_domain_idValidator.requiredFieldError = "domain_id is required";
        //model_internal::_domain_idValidator.source = model_internal::_instance;
        //model_internal::_domain_idValidator.property = "domain_id";
        model_internal::_record_orderValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRecord_order);
        model_internal::_record_orderValidator.required = true;
        model_internal::_record_orderValidator.requiredFieldError = "record_order is required";
        //model_internal::_record_orderValidator.source = model_internal::_instance;
        //model_internal::_record_orderValidator.property = "record_order";
        model_internal::_object_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForObject_code);
        model_internal::_object_codeValidator.required = true;
        model_internal::_object_codeValidator.requiredFieldError = "object_code is required";
        //model_internal::_object_codeValidator.source = model_internal::_instance;
        //model_internal::_object_codeValidator.property = "object_code";
        model_internal::_domain_object_activeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDomain_object_active);
        model_internal::_domain_object_activeValidator.required = true;
        model_internal::_domain_object_activeValidator.requiredFieldError = "domain_object_active is required";
        //model_internal::_domain_object_activeValidator.source = model_internal::_instance;
        //model_internal::_domain_object_activeValidator.property = "domain_object_active";
        model_internal::_object_typeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForObject_type);
        model_internal::_object_typeValidator.required = true;
        model_internal::_object_typeValidator.requiredFieldError = "object_type is required";
        //model_internal::_object_typeValidator.source = model_internal::_instance;
        //model_internal::_object_typeValidator.property = "object_type";
        model_internal::_object_icon_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForObject_icon_id);
        model_internal::_object_icon_idValidator.required = true;
        model_internal::_object_icon_idValidator.requiredFieldError = "object_icon_id is required";
        //model_internal::_object_icon_idValidator.source = model_internal::_instance;
        //model_internal::_object_icon_idValidator.property = "object_icon_id";
        model_internal::_modulesValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForModules);
        model_internal::_modulesValidator.required = true;
        model_internal::_modulesValidator.requiredFieldError = "modules is required";
        //model_internal::_modulesValidator.source = model_internal::_instance;
        //model_internal::_modulesValidator.property = "modules";
        model_internal::_domain_object_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDomain_object_id);
        model_internal::_domain_object_idValidator.required = true;
        model_internal::_domain_object_idValidator.requiredFieldError = "domain_object_id is required";
        //model_internal::_domain_object_idValidator.source = model_internal::_instance;
        //model_internal::_domain_object_idValidator.property = "domain_object_id";
        model_internal::_object_parent_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForObject_parent_id);
        model_internal::_object_parent_idValidator.required = true;
        model_internal::_object_parent_idValidator.requiredFieldError = "object_parent_id is required";
        //model_internal::_object_parent_idValidator.source = model_internal::_instance;
        //model_internal::_object_parent_idValidator.property = "object_parent_id";
        model_internal::_object_textValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForObject_text);
        model_internal::_object_textValidator.required = true;
        model_internal::_object_textValidator.requiredFieldError = "object_text is required";
        //model_internal::_object_textValidator.source = model_internal::_instance;
        //model_internal::_object_textValidator.property = "object_text";
        model_internal::_object_module_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForObject_module_id);
        model_internal::_object_module_idValidator.required = true;
        model_internal::_object_module_idValidator.requiredFieldError = "object_module_id is required";
        //model_internal::_object_module_idValidator.source = model_internal::_instance;
        //model_internal::_object_module_idValidator.property = "object_module_id";
        model_internal::_domain_textValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForDomain_text);
        model_internal::_domain_textValidator.required = true;
        model_internal::_domain_textValidator.requiredFieldError = "domain_text is required";
        //model_internal::_domain_textValidator.source = model_internal::_instance;
        //model_internal::_domain_textValidator.property = "domain_text";
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
            throw new Error(propertyName + " is not a data property of entity MenuObjects");
            
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
            throw new Error(propertyName + " is not a collection property of entity MenuObjects");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of MenuObjects");

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
            throw new Error(propertyName + " does not exist for entity MenuObjects");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity MenuObjects");
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
            throw new Error(propertyName + " does not exist for entity MenuObjects");
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
    public function get isRecord_switchAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isObject_noteAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isObject_sourceAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isObject_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isDomain_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRecord_orderAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isObject_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isDomain_object_activeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isObject_typeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isObject_icon_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isModulesAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isDomain_object_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isObject_parent_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isObject_textAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isObject_module_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isDomain_textAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnRecord_switch():void
    {
        if (model_internal::_record_switchIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRecord_switch = null;
            model_internal::calculateRecord_switchIsValid();
        }
    }
    public function invalidateDependentOnObject_note():void
    {
        if (model_internal::_object_noteIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfObject_note = null;
            model_internal::calculateObject_noteIsValid();
        }
    }
    public function invalidateDependentOnObject_source():void
    {
        if (model_internal::_object_sourceIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfObject_source = null;
            model_internal::calculateObject_sourceIsValid();
        }
    }
    public function invalidateDependentOnObject_id():void
    {
        if (model_internal::_object_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfObject_id = null;
            model_internal::calculateObject_idIsValid();
        }
    }
    public function invalidateDependentOnDomain_id():void
    {
        if (model_internal::_domain_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDomain_id = null;
            model_internal::calculateDomain_idIsValid();
        }
    }
    public function invalidateDependentOnRecord_order():void
    {
        if (model_internal::_record_orderIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRecord_order = null;
            model_internal::calculateRecord_orderIsValid();
        }
    }
    public function invalidateDependentOnObject_code():void
    {
        if (model_internal::_object_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfObject_code = null;
            model_internal::calculateObject_codeIsValid();
        }
    }
    public function invalidateDependentOnDomain_object_active():void
    {
        if (model_internal::_domain_object_activeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDomain_object_active = null;
            model_internal::calculateDomain_object_activeIsValid();
        }
    }
    public function invalidateDependentOnObject_type():void
    {
        if (model_internal::_object_typeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfObject_type = null;
            model_internal::calculateObject_typeIsValid();
        }
    }
    public function invalidateDependentOnObject_icon_id():void
    {
        if (model_internal::_object_icon_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfObject_icon_id = null;
            model_internal::calculateObject_icon_idIsValid();
        }
    }
    public function invalidateDependentOnModules():void
    {
        if (model_internal::_modulesIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfModules = null;
            model_internal::calculateModulesIsValid();
        }
    }
    public function invalidateDependentOnDomain_object_id():void
    {
        if (model_internal::_domain_object_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDomain_object_id = null;
            model_internal::calculateDomain_object_idIsValid();
        }
    }
    public function invalidateDependentOnObject_parent_id():void
    {
        if (model_internal::_object_parent_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfObject_parent_id = null;
            model_internal::calculateObject_parent_idIsValid();
        }
    }
    public function invalidateDependentOnObject_text():void
    {
        if (model_internal::_object_textIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfObject_text = null;
            model_internal::calculateObject_textIsValid();
        }
    }
    public function invalidateDependentOnObject_module_id():void
    {
        if (model_internal::_object_module_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfObject_module_id = null;
            model_internal::calculateObject_module_idIsValid();
        }
    }
    public function invalidateDependentOnDomain_text():void
    {
        if (model_internal::_domain_textIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfDomain_text = null;
            model_internal::calculateDomain_textIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get record_switchStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get record_switchValidator() : StyleValidator
    {
        return model_internal::_record_switchValidator;
    }

    model_internal function set _record_switchIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_record_switchIsValid;         
        if (oldValue !== value)
        {
            model_internal::_record_switchIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "record_switchIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get record_switchIsValid():Boolean
    {
        if (!model_internal::_record_switchIsValidCacheInitialized)
        {
            model_internal::calculateRecord_switchIsValid();
        }

        return model_internal::_record_switchIsValid;
    }

    model_internal function calculateRecord_switchIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_record_switchValidator.validate(model_internal::_instance.record_switch)
        model_internal::_record_switchIsValid_der = (valRes.results == null);
        model_internal::_record_switchIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::record_switchValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::record_switchValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get record_switchValidationFailureMessages():Array
    {
        if (model_internal::_record_switchValidationFailureMessages == null)
            model_internal::calculateRecord_switchIsValid();

        return _record_switchValidationFailureMessages;
    }

    model_internal function set record_switchValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_record_switchValidationFailureMessages;

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
            model_internal::_record_switchValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "record_switchValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get object_noteStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get object_noteValidator() : StyleValidator
    {
        return model_internal::_object_noteValidator;
    }

    model_internal function set _object_noteIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_object_noteIsValid;         
        if (oldValue !== value)
        {
            model_internal::_object_noteIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_noteIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get object_noteIsValid():Boolean
    {
        if (!model_internal::_object_noteIsValidCacheInitialized)
        {
            model_internal::calculateObject_noteIsValid();
        }

        return model_internal::_object_noteIsValid;
    }

    model_internal function calculateObject_noteIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_object_noteValidator.validate(model_internal::_instance.object_note)
        model_internal::_object_noteIsValid_der = (valRes.results == null);
        model_internal::_object_noteIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::object_noteValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::object_noteValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get object_noteValidationFailureMessages():Array
    {
        if (model_internal::_object_noteValidationFailureMessages == null)
            model_internal::calculateObject_noteIsValid();

        return _object_noteValidationFailureMessages;
    }

    model_internal function set object_noteValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_object_noteValidationFailureMessages;

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
            model_internal::_object_noteValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_noteValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get object_sourceStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get object_sourceValidator() : StyleValidator
    {
        return model_internal::_object_sourceValidator;
    }

    model_internal function set _object_sourceIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_object_sourceIsValid;         
        if (oldValue !== value)
        {
            model_internal::_object_sourceIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_sourceIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get object_sourceIsValid():Boolean
    {
        if (!model_internal::_object_sourceIsValidCacheInitialized)
        {
            model_internal::calculateObject_sourceIsValid();
        }

        return model_internal::_object_sourceIsValid;
    }

    model_internal function calculateObject_sourceIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_object_sourceValidator.validate(model_internal::_instance.object_source)
        model_internal::_object_sourceIsValid_der = (valRes.results == null);
        model_internal::_object_sourceIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::object_sourceValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::object_sourceValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get object_sourceValidationFailureMessages():Array
    {
        if (model_internal::_object_sourceValidationFailureMessages == null)
            model_internal::calculateObject_sourceIsValid();

        return _object_sourceValidationFailureMessages;
    }

    model_internal function set object_sourceValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_object_sourceValidationFailureMessages;

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
            model_internal::_object_sourceValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_sourceValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get object_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get object_idValidator() : StyleValidator
    {
        return model_internal::_object_idValidator;
    }

    model_internal function set _object_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_object_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_object_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get object_idIsValid():Boolean
    {
        if (!model_internal::_object_idIsValidCacheInitialized)
        {
            model_internal::calculateObject_idIsValid();
        }

        return model_internal::_object_idIsValid;
    }

    model_internal function calculateObject_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_object_idValidator.validate(model_internal::_instance.object_id)
        model_internal::_object_idIsValid_der = (valRes.results == null);
        model_internal::_object_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::object_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::object_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get object_idValidationFailureMessages():Array
    {
        if (model_internal::_object_idValidationFailureMessages == null)
            model_internal::calculateObject_idIsValid();

        return _object_idValidationFailureMessages;
    }

    model_internal function set object_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_object_idValidationFailureMessages;

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
            model_internal::_object_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get domain_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get domain_idValidator() : StyleValidator
    {
        return model_internal::_domain_idValidator;
    }

    model_internal function set _domain_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_domain_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_domain_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "domain_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get domain_idIsValid():Boolean
    {
        if (!model_internal::_domain_idIsValidCacheInitialized)
        {
            model_internal::calculateDomain_idIsValid();
        }

        return model_internal::_domain_idIsValid;
    }

    model_internal function calculateDomain_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_domain_idValidator.validate(model_internal::_instance.domain_id)
        model_internal::_domain_idIsValid_der = (valRes.results == null);
        model_internal::_domain_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::domain_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::domain_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get domain_idValidationFailureMessages():Array
    {
        if (model_internal::_domain_idValidationFailureMessages == null)
            model_internal::calculateDomain_idIsValid();

        return _domain_idValidationFailureMessages;
    }

    model_internal function set domain_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_domain_idValidationFailureMessages;

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
            model_internal::_domain_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "domain_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get record_orderStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get record_orderValidator() : StyleValidator
    {
        return model_internal::_record_orderValidator;
    }

    model_internal function set _record_orderIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_record_orderIsValid;         
        if (oldValue !== value)
        {
            model_internal::_record_orderIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "record_orderIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get record_orderIsValid():Boolean
    {
        if (!model_internal::_record_orderIsValidCacheInitialized)
        {
            model_internal::calculateRecord_orderIsValid();
        }

        return model_internal::_record_orderIsValid;
    }

    model_internal function calculateRecord_orderIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_record_orderValidator.validate(model_internal::_instance.record_order)
        model_internal::_record_orderIsValid_der = (valRes.results == null);
        model_internal::_record_orderIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::record_orderValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::record_orderValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get record_orderValidationFailureMessages():Array
    {
        if (model_internal::_record_orderValidationFailureMessages == null)
            model_internal::calculateRecord_orderIsValid();

        return _record_orderValidationFailureMessages;
    }

    model_internal function set record_orderValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_record_orderValidationFailureMessages;

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
            model_internal::_record_orderValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "record_orderValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get object_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get object_codeValidator() : StyleValidator
    {
        return model_internal::_object_codeValidator;
    }

    model_internal function set _object_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_object_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_object_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get object_codeIsValid():Boolean
    {
        if (!model_internal::_object_codeIsValidCacheInitialized)
        {
            model_internal::calculateObject_codeIsValid();
        }

        return model_internal::_object_codeIsValid;
    }

    model_internal function calculateObject_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_object_codeValidator.validate(model_internal::_instance.object_code)
        model_internal::_object_codeIsValid_der = (valRes.results == null);
        model_internal::_object_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::object_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::object_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get object_codeValidationFailureMessages():Array
    {
        if (model_internal::_object_codeValidationFailureMessages == null)
            model_internal::calculateObject_codeIsValid();

        return _object_codeValidationFailureMessages;
    }

    model_internal function set object_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_object_codeValidationFailureMessages;

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
            model_internal::_object_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get domain_object_activeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get domain_object_activeValidator() : StyleValidator
    {
        return model_internal::_domain_object_activeValidator;
    }

    model_internal function set _domain_object_activeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_domain_object_activeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_domain_object_activeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "domain_object_activeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get domain_object_activeIsValid():Boolean
    {
        if (!model_internal::_domain_object_activeIsValidCacheInitialized)
        {
            model_internal::calculateDomain_object_activeIsValid();
        }

        return model_internal::_domain_object_activeIsValid;
    }

    model_internal function calculateDomain_object_activeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_domain_object_activeValidator.validate(model_internal::_instance.domain_object_active)
        model_internal::_domain_object_activeIsValid_der = (valRes.results == null);
        model_internal::_domain_object_activeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::domain_object_activeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::domain_object_activeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get domain_object_activeValidationFailureMessages():Array
    {
        if (model_internal::_domain_object_activeValidationFailureMessages == null)
            model_internal::calculateDomain_object_activeIsValid();

        return _domain_object_activeValidationFailureMessages;
    }

    model_internal function set domain_object_activeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_domain_object_activeValidationFailureMessages;

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
            model_internal::_domain_object_activeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "domain_object_activeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get object_typeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get object_typeValidator() : StyleValidator
    {
        return model_internal::_object_typeValidator;
    }

    model_internal function set _object_typeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_object_typeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_object_typeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_typeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get object_typeIsValid():Boolean
    {
        if (!model_internal::_object_typeIsValidCacheInitialized)
        {
            model_internal::calculateObject_typeIsValid();
        }

        return model_internal::_object_typeIsValid;
    }

    model_internal function calculateObject_typeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_object_typeValidator.validate(model_internal::_instance.object_type)
        model_internal::_object_typeIsValid_der = (valRes.results == null);
        model_internal::_object_typeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::object_typeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::object_typeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get object_typeValidationFailureMessages():Array
    {
        if (model_internal::_object_typeValidationFailureMessages == null)
            model_internal::calculateObject_typeIsValid();

        return _object_typeValidationFailureMessages;
    }

    model_internal function set object_typeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_object_typeValidationFailureMessages;

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
            model_internal::_object_typeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_typeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get object_icon_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get object_icon_idValidator() : StyleValidator
    {
        return model_internal::_object_icon_idValidator;
    }

    model_internal function set _object_icon_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_object_icon_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_object_icon_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_icon_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get object_icon_idIsValid():Boolean
    {
        if (!model_internal::_object_icon_idIsValidCacheInitialized)
        {
            model_internal::calculateObject_icon_idIsValid();
        }

        return model_internal::_object_icon_idIsValid;
    }

    model_internal function calculateObject_icon_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_object_icon_idValidator.validate(model_internal::_instance.object_icon_id)
        model_internal::_object_icon_idIsValid_der = (valRes.results == null);
        model_internal::_object_icon_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::object_icon_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::object_icon_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get object_icon_idValidationFailureMessages():Array
    {
        if (model_internal::_object_icon_idValidationFailureMessages == null)
            model_internal::calculateObject_icon_idIsValid();

        return _object_icon_idValidationFailureMessages;
    }

    model_internal function set object_icon_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_object_icon_idValidationFailureMessages;

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
            model_internal::_object_icon_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_icon_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get modulesStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get modulesValidator() : StyleValidator
    {
        return model_internal::_modulesValidator;
    }

    model_internal function set _modulesIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_modulesIsValid;         
        if (oldValue !== value)
        {
            model_internal::_modulesIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "modulesIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get modulesIsValid():Boolean
    {
        if (!model_internal::_modulesIsValidCacheInitialized)
        {
            model_internal::calculateModulesIsValid();
        }

        return model_internal::_modulesIsValid;
    }

    model_internal function calculateModulesIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_modulesValidator.validate(model_internal::_instance.modules)
        model_internal::_modulesIsValid_der = (valRes.results == null);
        model_internal::_modulesIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::modulesValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::modulesValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get modulesValidationFailureMessages():Array
    {
        if (model_internal::_modulesValidationFailureMessages == null)
            model_internal::calculateModulesIsValid();

        return _modulesValidationFailureMessages;
    }

    model_internal function set modulesValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_modulesValidationFailureMessages;

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
            model_internal::_modulesValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "modulesValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get domain_object_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get domain_object_idValidator() : StyleValidator
    {
        return model_internal::_domain_object_idValidator;
    }

    model_internal function set _domain_object_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_domain_object_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_domain_object_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "domain_object_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get domain_object_idIsValid():Boolean
    {
        if (!model_internal::_domain_object_idIsValidCacheInitialized)
        {
            model_internal::calculateDomain_object_idIsValid();
        }

        return model_internal::_domain_object_idIsValid;
    }

    model_internal function calculateDomain_object_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_domain_object_idValidator.validate(model_internal::_instance.domain_object_id)
        model_internal::_domain_object_idIsValid_der = (valRes.results == null);
        model_internal::_domain_object_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::domain_object_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::domain_object_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get domain_object_idValidationFailureMessages():Array
    {
        if (model_internal::_domain_object_idValidationFailureMessages == null)
            model_internal::calculateDomain_object_idIsValid();

        return _domain_object_idValidationFailureMessages;
    }

    model_internal function set domain_object_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_domain_object_idValidationFailureMessages;

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
            model_internal::_domain_object_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "domain_object_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get object_parent_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get object_parent_idValidator() : StyleValidator
    {
        return model_internal::_object_parent_idValidator;
    }

    model_internal function set _object_parent_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_object_parent_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_object_parent_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_parent_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get object_parent_idIsValid():Boolean
    {
        if (!model_internal::_object_parent_idIsValidCacheInitialized)
        {
            model_internal::calculateObject_parent_idIsValid();
        }

        return model_internal::_object_parent_idIsValid;
    }

    model_internal function calculateObject_parent_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_object_parent_idValidator.validate(model_internal::_instance.object_parent_id)
        model_internal::_object_parent_idIsValid_der = (valRes.results == null);
        model_internal::_object_parent_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::object_parent_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::object_parent_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get object_parent_idValidationFailureMessages():Array
    {
        if (model_internal::_object_parent_idValidationFailureMessages == null)
            model_internal::calculateObject_parent_idIsValid();

        return _object_parent_idValidationFailureMessages;
    }

    model_internal function set object_parent_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_object_parent_idValidationFailureMessages;

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
            model_internal::_object_parent_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_parent_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get object_textStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get object_textValidator() : StyleValidator
    {
        return model_internal::_object_textValidator;
    }

    model_internal function set _object_textIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_object_textIsValid;         
        if (oldValue !== value)
        {
            model_internal::_object_textIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_textIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get object_textIsValid():Boolean
    {
        if (!model_internal::_object_textIsValidCacheInitialized)
        {
            model_internal::calculateObject_textIsValid();
        }

        return model_internal::_object_textIsValid;
    }

    model_internal function calculateObject_textIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_object_textValidator.validate(model_internal::_instance.object_text)
        model_internal::_object_textIsValid_der = (valRes.results == null);
        model_internal::_object_textIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::object_textValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::object_textValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get object_textValidationFailureMessages():Array
    {
        if (model_internal::_object_textValidationFailureMessages == null)
            model_internal::calculateObject_textIsValid();

        return _object_textValidationFailureMessages;
    }

    model_internal function set object_textValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_object_textValidationFailureMessages;

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
            model_internal::_object_textValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_textValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get object_module_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get object_module_idValidator() : StyleValidator
    {
        return model_internal::_object_module_idValidator;
    }

    model_internal function set _object_module_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_object_module_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_object_module_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_module_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get object_module_idIsValid():Boolean
    {
        if (!model_internal::_object_module_idIsValidCacheInitialized)
        {
            model_internal::calculateObject_module_idIsValid();
        }

        return model_internal::_object_module_idIsValid;
    }

    model_internal function calculateObject_module_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_object_module_idValidator.validate(model_internal::_instance.object_module_id)
        model_internal::_object_module_idIsValid_der = (valRes.results == null);
        model_internal::_object_module_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::object_module_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::object_module_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get object_module_idValidationFailureMessages():Array
    {
        if (model_internal::_object_module_idValidationFailureMessages == null)
            model_internal::calculateObject_module_idIsValid();

        return _object_module_idValidationFailureMessages;
    }

    model_internal function set object_module_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_object_module_idValidationFailureMessages;

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
            model_internal::_object_module_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "object_module_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get domain_textStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get domain_textValidator() : StyleValidator
    {
        return model_internal::_domain_textValidator;
    }

    model_internal function set _domain_textIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_domain_textIsValid;         
        if (oldValue !== value)
        {
            model_internal::_domain_textIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "domain_textIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get domain_textIsValid():Boolean
    {
        if (!model_internal::_domain_textIsValidCacheInitialized)
        {
            model_internal::calculateDomain_textIsValid();
        }

        return model_internal::_domain_textIsValid;
    }

    model_internal function calculateDomain_textIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_domain_textValidator.validate(model_internal::_instance.domain_text)
        model_internal::_domain_textIsValid_der = (valRes.results == null);
        model_internal::_domain_textIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::domain_textValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::domain_textValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get domain_textValidationFailureMessages():Array
    {
        if (model_internal::_domain_textValidationFailureMessages == null)
            model_internal::calculateDomain_textIsValid();

        return _domain_textValidationFailureMessages;
    }

    model_internal function set domain_textValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_domain_textValidationFailureMessages;

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
            model_internal::_domain_textValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "domain_textValidationFailureMessages", oldValue, value));
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
            case("record_switch"):
            {
                return record_switchValidationFailureMessages;
            }
            case("object_note"):
            {
                return object_noteValidationFailureMessages;
            }
            case("object_source"):
            {
                return object_sourceValidationFailureMessages;
            }
            case("object_id"):
            {
                return object_idValidationFailureMessages;
            }
            case("domain_id"):
            {
                return domain_idValidationFailureMessages;
            }
            case("record_order"):
            {
                return record_orderValidationFailureMessages;
            }
            case("object_code"):
            {
                return object_codeValidationFailureMessages;
            }
            case("domain_object_active"):
            {
                return domain_object_activeValidationFailureMessages;
            }
            case("object_type"):
            {
                return object_typeValidationFailureMessages;
            }
            case("object_icon_id"):
            {
                return object_icon_idValidationFailureMessages;
            }
            case("modules"):
            {
                return modulesValidationFailureMessages;
            }
            case("domain_object_id"):
            {
                return domain_object_idValidationFailureMessages;
            }
            case("object_parent_id"):
            {
                return object_parent_idValidationFailureMessages;
            }
            case("object_text"):
            {
                return object_textValidationFailureMessages;
            }
            case("object_module_id"):
            {
                return object_module_idValidationFailureMessages;
            }
            case("domain_text"):
            {
                return domain_textValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
