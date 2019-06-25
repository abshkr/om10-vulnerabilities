
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
internal class _OrderPriceOffsetLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("proff_deb_type", "proff_name", "proff_to_print", "proff_deb_name", "proff_apply_name", "proff_code", "proff_apply");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("proff_deb_type", "proff_name", "proff_to_print", "proff_deb_name", "proff_apply_name", "proff_code", "proff_apply");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("proff_deb_type", "proff_name", "proff_to_print", "proff_deb_name", "proff_apply_name", "proff_code", "proff_apply");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("proff_deb_type", "proff_name", "proff_to_print", "proff_deb_name", "proff_apply_name", "proff_code", "proff_apply");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("proff_deb_type", "proff_name", "proff_to_print", "proff_deb_name", "proff_apply_name", "proff_code", "proff_apply");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "OrderPriceOffsetLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _proff_deb_typeIsValid:Boolean;
    model_internal var _proff_deb_typeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _proff_deb_typeIsValidCacheInitialized:Boolean = false;
    model_internal var _proff_deb_typeValidationFailureMessages:Array;
    
    model_internal var _proff_nameIsValid:Boolean;
    model_internal var _proff_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _proff_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _proff_nameValidationFailureMessages:Array;
    
    model_internal var _proff_to_printIsValid:Boolean;
    model_internal var _proff_to_printValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _proff_to_printIsValidCacheInitialized:Boolean = false;
    model_internal var _proff_to_printValidationFailureMessages:Array;
    
    model_internal var _proff_deb_nameIsValid:Boolean;
    model_internal var _proff_deb_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _proff_deb_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _proff_deb_nameValidationFailureMessages:Array;
    
    model_internal var _proff_apply_nameIsValid:Boolean;
    model_internal var _proff_apply_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _proff_apply_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _proff_apply_nameValidationFailureMessages:Array;
    
    model_internal var _proff_codeIsValid:Boolean;
    model_internal var _proff_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _proff_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _proff_codeValidationFailureMessages:Array;
    
    model_internal var _proff_applyIsValid:Boolean;
    model_internal var _proff_applyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _proff_applyIsValidCacheInitialized:Boolean = false;
    model_internal var _proff_applyValidationFailureMessages:Array;

    model_internal var _instance:_Super_OrderPriceOffsetLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _OrderPriceOffsetLookupEntityMetadata(value : _Super_OrderPriceOffsetLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["proff_deb_type"] = new Array();
            model_internal::dependentsOnMap["proff_name"] = new Array();
            model_internal::dependentsOnMap["proff_to_print"] = new Array();
            model_internal::dependentsOnMap["proff_deb_name"] = new Array();
            model_internal::dependentsOnMap["proff_apply_name"] = new Array();
            model_internal::dependentsOnMap["proff_code"] = new Array();
            model_internal::dependentsOnMap["proff_apply"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["proff_deb_type"] = "String";
        model_internal::propertyTypeMap["proff_name"] = "String";
        model_internal::propertyTypeMap["proff_to_print"] = "String";
        model_internal::propertyTypeMap["proff_deb_name"] = "String";
        model_internal::propertyTypeMap["proff_apply_name"] = "String";
        model_internal::propertyTypeMap["proff_code"] = "String";
        model_internal::propertyTypeMap["proff_apply"] = "String";

        model_internal::_instance = value;
        model_internal::_proff_deb_typeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProff_deb_type);
        model_internal::_proff_deb_typeValidator.required = true;
        model_internal::_proff_deb_typeValidator.requiredFieldError = "proff_deb_type is required";
        //model_internal::_proff_deb_typeValidator.source = model_internal::_instance;
        //model_internal::_proff_deb_typeValidator.property = "proff_deb_type";
        model_internal::_proff_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProff_name);
        model_internal::_proff_nameValidator.required = true;
        model_internal::_proff_nameValidator.requiredFieldError = "proff_name is required";
        //model_internal::_proff_nameValidator.source = model_internal::_instance;
        //model_internal::_proff_nameValidator.property = "proff_name";
        model_internal::_proff_to_printValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProff_to_print);
        model_internal::_proff_to_printValidator.required = true;
        model_internal::_proff_to_printValidator.requiredFieldError = "proff_to_print is required";
        //model_internal::_proff_to_printValidator.source = model_internal::_instance;
        //model_internal::_proff_to_printValidator.property = "proff_to_print";
        model_internal::_proff_deb_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProff_deb_name);
        model_internal::_proff_deb_nameValidator.required = true;
        model_internal::_proff_deb_nameValidator.requiredFieldError = "proff_deb_name is required";
        //model_internal::_proff_deb_nameValidator.source = model_internal::_instance;
        //model_internal::_proff_deb_nameValidator.property = "proff_deb_name";
        model_internal::_proff_apply_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProff_apply_name);
        model_internal::_proff_apply_nameValidator.required = true;
        model_internal::_proff_apply_nameValidator.requiredFieldError = "proff_apply_name is required";
        //model_internal::_proff_apply_nameValidator.source = model_internal::_instance;
        //model_internal::_proff_apply_nameValidator.property = "proff_apply_name";
        model_internal::_proff_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProff_code);
        model_internal::_proff_codeValidator.required = true;
        model_internal::_proff_codeValidator.requiredFieldError = "proff_code is required";
        //model_internal::_proff_codeValidator.source = model_internal::_instance;
        //model_internal::_proff_codeValidator.property = "proff_code";
        model_internal::_proff_applyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProff_apply);
        model_internal::_proff_applyValidator.required = true;
        model_internal::_proff_applyValidator.requiredFieldError = "proff_apply is required";
        //model_internal::_proff_applyValidator.source = model_internal::_instance;
        //model_internal::_proff_applyValidator.property = "proff_apply";
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
            throw new Error(propertyName + " is not a data property of entity OrderPriceOffsetLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity OrderPriceOffsetLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of OrderPriceOffsetLookup");

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
            throw new Error(propertyName + " does not exist for entity OrderPriceOffsetLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity OrderPriceOffsetLookup");
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
            throw new Error(propertyName + " does not exist for entity OrderPriceOffsetLookup");
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
    public function get isProff_deb_typeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProff_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProff_to_printAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProff_deb_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProff_apply_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProff_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProff_applyAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnProff_deb_type():void
    {
        if (model_internal::_proff_deb_typeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProff_deb_type = null;
            model_internal::calculateProff_deb_typeIsValid();
        }
    }
    public function invalidateDependentOnProff_name():void
    {
        if (model_internal::_proff_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProff_name = null;
            model_internal::calculateProff_nameIsValid();
        }
    }
    public function invalidateDependentOnProff_to_print():void
    {
        if (model_internal::_proff_to_printIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProff_to_print = null;
            model_internal::calculateProff_to_printIsValid();
        }
    }
    public function invalidateDependentOnProff_deb_name():void
    {
        if (model_internal::_proff_deb_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProff_deb_name = null;
            model_internal::calculateProff_deb_nameIsValid();
        }
    }
    public function invalidateDependentOnProff_apply_name():void
    {
        if (model_internal::_proff_apply_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProff_apply_name = null;
            model_internal::calculateProff_apply_nameIsValid();
        }
    }
    public function invalidateDependentOnProff_code():void
    {
        if (model_internal::_proff_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProff_code = null;
            model_internal::calculateProff_codeIsValid();
        }
    }
    public function invalidateDependentOnProff_apply():void
    {
        if (model_internal::_proff_applyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProff_apply = null;
            model_internal::calculateProff_applyIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get proff_deb_typeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get proff_deb_typeValidator() : StyleValidator
    {
        return model_internal::_proff_deb_typeValidator;
    }

    model_internal function set _proff_deb_typeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_proff_deb_typeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_proff_deb_typeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_deb_typeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get proff_deb_typeIsValid():Boolean
    {
        if (!model_internal::_proff_deb_typeIsValidCacheInitialized)
        {
            model_internal::calculateProff_deb_typeIsValid();
        }

        return model_internal::_proff_deb_typeIsValid;
    }

    model_internal function calculateProff_deb_typeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_proff_deb_typeValidator.validate(model_internal::_instance.proff_deb_type)
        model_internal::_proff_deb_typeIsValid_der = (valRes.results == null);
        model_internal::_proff_deb_typeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::proff_deb_typeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::proff_deb_typeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get proff_deb_typeValidationFailureMessages():Array
    {
        if (model_internal::_proff_deb_typeValidationFailureMessages == null)
            model_internal::calculateProff_deb_typeIsValid();

        return _proff_deb_typeValidationFailureMessages;
    }

    model_internal function set proff_deb_typeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_proff_deb_typeValidationFailureMessages;

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
            model_internal::_proff_deb_typeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_deb_typeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get proff_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get proff_nameValidator() : StyleValidator
    {
        return model_internal::_proff_nameValidator;
    }

    model_internal function set _proff_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_proff_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_proff_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get proff_nameIsValid():Boolean
    {
        if (!model_internal::_proff_nameIsValidCacheInitialized)
        {
            model_internal::calculateProff_nameIsValid();
        }

        return model_internal::_proff_nameIsValid;
    }

    model_internal function calculateProff_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_proff_nameValidator.validate(model_internal::_instance.proff_name)
        model_internal::_proff_nameIsValid_der = (valRes.results == null);
        model_internal::_proff_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::proff_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::proff_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get proff_nameValidationFailureMessages():Array
    {
        if (model_internal::_proff_nameValidationFailureMessages == null)
            model_internal::calculateProff_nameIsValid();

        return _proff_nameValidationFailureMessages;
    }

    model_internal function set proff_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_proff_nameValidationFailureMessages;

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
            model_internal::_proff_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get proff_to_printStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get proff_to_printValidator() : StyleValidator
    {
        return model_internal::_proff_to_printValidator;
    }

    model_internal function set _proff_to_printIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_proff_to_printIsValid;         
        if (oldValue !== value)
        {
            model_internal::_proff_to_printIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_to_printIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get proff_to_printIsValid():Boolean
    {
        if (!model_internal::_proff_to_printIsValidCacheInitialized)
        {
            model_internal::calculateProff_to_printIsValid();
        }

        return model_internal::_proff_to_printIsValid;
    }

    model_internal function calculateProff_to_printIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_proff_to_printValidator.validate(model_internal::_instance.proff_to_print)
        model_internal::_proff_to_printIsValid_der = (valRes.results == null);
        model_internal::_proff_to_printIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::proff_to_printValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::proff_to_printValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get proff_to_printValidationFailureMessages():Array
    {
        if (model_internal::_proff_to_printValidationFailureMessages == null)
            model_internal::calculateProff_to_printIsValid();

        return _proff_to_printValidationFailureMessages;
    }

    model_internal function set proff_to_printValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_proff_to_printValidationFailureMessages;

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
            model_internal::_proff_to_printValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_to_printValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get proff_deb_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get proff_deb_nameValidator() : StyleValidator
    {
        return model_internal::_proff_deb_nameValidator;
    }

    model_internal function set _proff_deb_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_proff_deb_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_proff_deb_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_deb_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get proff_deb_nameIsValid():Boolean
    {
        if (!model_internal::_proff_deb_nameIsValidCacheInitialized)
        {
            model_internal::calculateProff_deb_nameIsValid();
        }

        return model_internal::_proff_deb_nameIsValid;
    }

    model_internal function calculateProff_deb_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_proff_deb_nameValidator.validate(model_internal::_instance.proff_deb_name)
        model_internal::_proff_deb_nameIsValid_der = (valRes.results == null);
        model_internal::_proff_deb_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::proff_deb_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::proff_deb_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get proff_deb_nameValidationFailureMessages():Array
    {
        if (model_internal::_proff_deb_nameValidationFailureMessages == null)
            model_internal::calculateProff_deb_nameIsValid();

        return _proff_deb_nameValidationFailureMessages;
    }

    model_internal function set proff_deb_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_proff_deb_nameValidationFailureMessages;

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
            model_internal::_proff_deb_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_deb_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get proff_apply_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get proff_apply_nameValidator() : StyleValidator
    {
        return model_internal::_proff_apply_nameValidator;
    }

    model_internal function set _proff_apply_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_proff_apply_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_proff_apply_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_apply_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get proff_apply_nameIsValid():Boolean
    {
        if (!model_internal::_proff_apply_nameIsValidCacheInitialized)
        {
            model_internal::calculateProff_apply_nameIsValid();
        }

        return model_internal::_proff_apply_nameIsValid;
    }

    model_internal function calculateProff_apply_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_proff_apply_nameValidator.validate(model_internal::_instance.proff_apply_name)
        model_internal::_proff_apply_nameIsValid_der = (valRes.results == null);
        model_internal::_proff_apply_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::proff_apply_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::proff_apply_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get proff_apply_nameValidationFailureMessages():Array
    {
        if (model_internal::_proff_apply_nameValidationFailureMessages == null)
            model_internal::calculateProff_apply_nameIsValid();

        return _proff_apply_nameValidationFailureMessages;
    }

    model_internal function set proff_apply_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_proff_apply_nameValidationFailureMessages;

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
            model_internal::_proff_apply_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_apply_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get proff_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get proff_codeValidator() : StyleValidator
    {
        return model_internal::_proff_codeValidator;
    }

    model_internal function set _proff_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_proff_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_proff_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get proff_codeIsValid():Boolean
    {
        if (!model_internal::_proff_codeIsValidCacheInitialized)
        {
            model_internal::calculateProff_codeIsValid();
        }

        return model_internal::_proff_codeIsValid;
    }

    model_internal function calculateProff_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_proff_codeValidator.validate(model_internal::_instance.proff_code)
        model_internal::_proff_codeIsValid_der = (valRes.results == null);
        model_internal::_proff_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::proff_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::proff_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get proff_codeValidationFailureMessages():Array
    {
        if (model_internal::_proff_codeValidationFailureMessages == null)
            model_internal::calculateProff_codeIsValid();

        return _proff_codeValidationFailureMessages;
    }

    model_internal function set proff_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_proff_codeValidationFailureMessages;

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
            model_internal::_proff_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get proff_applyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get proff_applyValidator() : StyleValidator
    {
        return model_internal::_proff_applyValidator;
    }

    model_internal function set _proff_applyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_proff_applyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_proff_applyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_applyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get proff_applyIsValid():Boolean
    {
        if (!model_internal::_proff_applyIsValidCacheInitialized)
        {
            model_internal::calculateProff_applyIsValid();
        }

        return model_internal::_proff_applyIsValid;
    }

    model_internal function calculateProff_applyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_proff_applyValidator.validate(model_internal::_instance.proff_apply)
        model_internal::_proff_applyIsValid_der = (valRes.results == null);
        model_internal::_proff_applyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::proff_applyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::proff_applyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get proff_applyValidationFailureMessages():Array
    {
        if (model_internal::_proff_applyValidationFailureMessages == null)
            model_internal::calculateProff_applyIsValid();

        return _proff_applyValidationFailureMessages;
    }

    model_internal function set proff_applyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_proff_applyValidationFailureMessages;

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
            model_internal::_proff_applyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "proff_applyValidationFailureMessages", oldValue, value));
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
            case("proff_deb_type"):
            {
                return proff_deb_typeValidationFailureMessages;
            }
            case("proff_name"):
            {
                return proff_nameValidationFailureMessages;
            }
            case("proff_to_print"):
            {
                return proff_to_printValidationFailureMessages;
            }
            case("proff_deb_name"):
            {
                return proff_deb_nameValidationFailureMessages;
            }
            case("proff_apply_name"):
            {
                return proff_apply_nameValidationFailureMessages;
            }
            case("proff_code"):
            {
                return proff_codeValidationFailureMessages;
            }
            case("proff_apply"):
            {
                return proff_applyValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
