
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
internal class _DomainPrivilege_voEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("priv_delete", "priv_protect", "needsCGI", "object_id", "domain_id", "priv_create", "priv_update", "priv_view");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("priv_delete", "priv_protect", "needsCGI", "object_id", "domain_id", "priv_create", "priv_update", "priv_view");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("priv_delete", "priv_protect", "needsCGI", "object_id", "domain_id", "priv_create", "priv_update", "priv_view");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("priv_delete", "priv_protect", "needsCGI", "object_id", "domain_id", "priv_create", "priv_update", "priv_view");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("priv_delete", "priv_protect", "needsCGI", "object_id", "domain_id", "priv_create", "priv_update", "priv_view");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "DomainPrivilege_vo";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _object_idIsValid:Boolean;
    model_internal var _object_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _object_idIsValidCacheInitialized:Boolean = false;
    model_internal var _object_idValidationFailureMessages:Array;
    
    model_internal var _domain_idIsValid:Boolean;
    model_internal var _domain_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _domain_idIsValidCacheInitialized:Boolean = false;
    model_internal var _domain_idValidationFailureMessages:Array;

    model_internal var _instance:_Super_DomainPrivilege_vo;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _DomainPrivilege_voEntityMetadata(value : _Super_DomainPrivilege_vo)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["priv_delete"] = new Array();
            model_internal::dependentsOnMap["priv_protect"] = new Array();
            model_internal::dependentsOnMap["needsCGI"] = new Array();
            model_internal::dependentsOnMap["object_id"] = new Array();
            model_internal::dependentsOnMap["domain_id"] = new Array();
            model_internal::dependentsOnMap["priv_create"] = new Array();
            model_internal::dependentsOnMap["priv_update"] = new Array();
            model_internal::dependentsOnMap["priv_view"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["priv_delete"] = "int";
        model_internal::propertyTypeMap["priv_protect"] = "int";
        model_internal::propertyTypeMap["needsCGI"] = "int";
        model_internal::propertyTypeMap["object_id"] = "String";
        model_internal::propertyTypeMap["domain_id"] = "String";
        model_internal::propertyTypeMap["priv_create"] = "int";
        model_internal::propertyTypeMap["priv_update"] = "int";
        model_internal::propertyTypeMap["priv_view"] = "int";

        model_internal::_instance = value;
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
            throw new Error(propertyName + " is not a data property of entity DomainPrivilege_vo");
            
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
            throw new Error(propertyName + " is not a collection property of entity DomainPrivilege_vo");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of DomainPrivilege_vo");

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
            throw new Error(propertyName + " does not exist for entity DomainPrivilege_vo");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity DomainPrivilege_vo");
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
            throw new Error(propertyName + " does not exist for entity DomainPrivilege_vo");
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
    public function get isPriv_deleteAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPriv_protectAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isNeedsCGIAvailable():Boolean
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
    public function get isPriv_createAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPriv_updateAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPriv_viewAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
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

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get priv_deleteStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    [Bindable(event="propertyChange")]   
    public function get priv_protectStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    [Bindable(event="propertyChange")]   
    public function get needsCGIStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
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
    public function get priv_createStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    [Bindable(event="propertyChange")]   
    public function get priv_updateStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    [Bindable(event="propertyChange")]   
    public function get priv_viewStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
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
            case("object_id"):
            {
                return object_idValidationFailureMessages;
            }
            case("domain_id"):
            {
                return domain_idValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
