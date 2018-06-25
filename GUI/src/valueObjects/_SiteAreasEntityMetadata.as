
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
internal class _SiteAreasEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("area_cpcty", "area_name", "area_eqp_sft_lnk", "area_k");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("area_cpcty", "area_name", "area_eqp_sft_lnk", "area_k");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("area_cpcty", "area_name", "area_eqp_sft_lnk", "area_k");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("area_cpcty", "area_name", "area_eqp_sft_lnk", "area_k");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("area_cpcty", "area_name", "area_eqp_sft_lnk", "area_k");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "SiteAreas";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _area_cpctyIsValid:Boolean;
    model_internal var _area_cpctyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _area_cpctyIsValidCacheInitialized:Boolean = false;
    model_internal var _area_cpctyValidationFailureMessages:Array;
    
    model_internal var _area_nameIsValid:Boolean;
    model_internal var _area_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _area_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _area_nameValidationFailureMessages:Array;
    
    model_internal var _area_eqp_sft_lnkIsValid:Boolean;
    model_internal var _area_eqp_sft_lnkValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _area_eqp_sft_lnkIsValidCacheInitialized:Boolean = false;
    model_internal var _area_eqp_sft_lnkValidationFailureMessages:Array;
    
    model_internal var _area_kIsValid:Boolean;
    model_internal var _area_kValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _area_kIsValidCacheInitialized:Boolean = false;
    model_internal var _area_kValidationFailureMessages:Array;

    model_internal var _instance:_Super_SiteAreas;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _SiteAreasEntityMetadata(value : _Super_SiteAreas)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["area_cpcty"] = new Array();
            model_internal::dependentsOnMap["area_name"] = new Array();
            model_internal::dependentsOnMap["area_eqp_sft_lnk"] = new Array();
            model_internal::dependentsOnMap["area_k"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["area_cpcty"] = "String";
        model_internal::propertyTypeMap["area_name"] = "String";
        model_internal::propertyTypeMap["area_eqp_sft_lnk"] = "String";
        model_internal::propertyTypeMap["area_k"] = "String";

        model_internal::_instance = value;
        model_internal::_area_cpctyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForArea_cpcty);
        model_internal::_area_cpctyValidator.required = true;
        model_internal::_area_cpctyValidator.requiredFieldError = "area_cpcty is required";
        //model_internal::_area_cpctyValidator.source = model_internal::_instance;
        //model_internal::_area_cpctyValidator.property = "area_cpcty";
        model_internal::_area_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForArea_name);
        model_internal::_area_nameValidator.required = true;
        model_internal::_area_nameValidator.requiredFieldError = "area_name is required";
        //model_internal::_area_nameValidator.source = model_internal::_instance;
        //model_internal::_area_nameValidator.property = "area_name";
        model_internal::_area_eqp_sft_lnkValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForArea_eqp_sft_lnk);
        model_internal::_area_eqp_sft_lnkValidator.required = true;
        model_internal::_area_eqp_sft_lnkValidator.requiredFieldError = "area_eqp_sft_lnk is required";
        //model_internal::_area_eqp_sft_lnkValidator.source = model_internal::_instance;
        //model_internal::_area_eqp_sft_lnkValidator.property = "area_eqp_sft_lnk";
        model_internal::_area_kValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForArea_k);
        model_internal::_area_kValidator.required = true;
        model_internal::_area_kValidator.requiredFieldError = "area_k is required";
        //model_internal::_area_kValidator.source = model_internal::_instance;
        //model_internal::_area_kValidator.property = "area_k";
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
            throw new Error(propertyName + " is not a data property of entity SiteAreas");
            
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
            throw new Error(propertyName + " is not a collection property of entity SiteAreas");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of SiteAreas");

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
            throw new Error(propertyName + " does not exist for entity SiteAreas");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity SiteAreas");
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
            throw new Error(propertyName + " does not exist for entity SiteAreas");
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
    public function get isArea_cpctyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isArea_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isArea_eqp_sft_lnkAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isArea_kAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnArea_cpcty():void
    {
        if (model_internal::_area_cpctyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfArea_cpcty = null;
            model_internal::calculateArea_cpctyIsValid();
        }
    }
    public function invalidateDependentOnArea_name():void
    {
        if (model_internal::_area_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfArea_name = null;
            model_internal::calculateArea_nameIsValid();
        }
    }
    public function invalidateDependentOnArea_eqp_sft_lnk():void
    {
        if (model_internal::_area_eqp_sft_lnkIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfArea_eqp_sft_lnk = null;
            model_internal::calculateArea_eqp_sft_lnkIsValid();
        }
    }
    public function invalidateDependentOnArea_k():void
    {
        if (model_internal::_area_kIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfArea_k = null;
            model_internal::calculateArea_kIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get area_cpctyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get area_cpctyValidator() : StyleValidator
    {
        return model_internal::_area_cpctyValidator;
    }

    model_internal function set _area_cpctyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_area_cpctyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_area_cpctyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "area_cpctyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get area_cpctyIsValid():Boolean
    {
        if (!model_internal::_area_cpctyIsValidCacheInitialized)
        {
            model_internal::calculateArea_cpctyIsValid();
        }

        return model_internal::_area_cpctyIsValid;
    }

    model_internal function calculateArea_cpctyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_area_cpctyValidator.validate(model_internal::_instance.area_cpcty)
        model_internal::_area_cpctyIsValid_der = (valRes.results == null);
        model_internal::_area_cpctyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::area_cpctyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::area_cpctyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get area_cpctyValidationFailureMessages():Array
    {
        if (model_internal::_area_cpctyValidationFailureMessages == null)
            model_internal::calculateArea_cpctyIsValid();

        return _area_cpctyValidationFailureMessages;
    }

    model_internal function set area_cpctyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_area_cpctyValidationFailureMessages;

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
            model_internal::_area_cpctyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "area_cpctyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get area_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get area_nameValidator() : StyleValidator
    {
        return model_internal::_area_nameValidator;
    }

    model_internal function set _area_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_area_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_area_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "area_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get area_nameIsValid():Boolean
    {
        if (!model_internal::_area_nameIsValidCacheInitialized)
        {
            model_internal::calculateArea_nameIsValid();
        }

        return model_internal::_area_nameIsValid;
    }

    model_internal function calculateArea_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_area_nameValidator.validate(model_internal::_instance.area_name)
        model_internal::_area_nameIsValid_der = (valRes.results == null);
        model_internal::_area_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::area_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::area_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get area_nameValidationFailureMessages():Array
    {
        if (model_internal::_area_nameValidationFailureMessages == null)
            model_internal::calculateArea_nameIsValid();

        return _area_nameValidationFailureMessages;
    }

    model_internal function set area_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_area_nameValidationFailureMessages;

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
            model_internal::_area_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "area_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get area_eqp_sft_lnkStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get area_eqp_sft_lnkValidator() : StyleValidator
    {
        return model_internal::_area_eqp_sft_lnkValidator;
    }

    model_internal function set _area_eqp_sft_lnkIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_area_eqp_sft_lnkIsValid;         
        if (oldValue !== value)
        {
            model_internal::_area_eqp_sft_lnkIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "area_eqp_sft_lnkIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get area_eqp_sft_lnkIsValid():Boolean
    {
        if (!model_internal::_area_eqp_sft_lnkIsValidCacheInitialized)
        {
            model_internal::calculateArea_eqp_sft_lnkIsValid();
        }

        return model_internal::_area_eqp_sft_lnkIsValid;
    }

    model_internal function calculateArea_eqp_sft_lnkIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_area_eqp_sft_lnkValidator.validate(model_internal::_instance.area_eqp_sft_lnk)
        model_internal::_area_eqp_sft_lnkIsValid_der = (valRes.results == null);
        model_internal::_area_eqp_sft_lnkIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::area_eqp_sft_lnkValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::area_eqp_sft_lnkValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get area_eqp_sft_lnkValidationFailureMessages():Array
    {
        if (model_internal::_area_eqp_sft_lnkValidationFailureMessages == null)
            model_internal::calculateArea_eqp_sft_lnkIsValid();

        return _area_eqp_sft_lnkValidationFailureMessages;
    }

    model_internal function set area_eqp_sft_lnkValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_area_eqp_sft_lnkValidationFailureMessages;

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
            model_internal::_area_eqp_sft_lnkValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "area_eqp_sft_lnkValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get area_kStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get area_kValidator() : StyleValidator
    {
        return model_internal::_area_kValidator;
    }

    model_internal function set _area_kIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_area_kIsValid;         
        if (oldValue !== value)
        {
            model_internal::_area_kIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "area_kIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get area_kIsValid():Boolean
    {
        if (!model_internal::_area_kIsValidCacheInitialized)
        {
            model_internal::calculateArea_kIsValid();
        }

        return model_internal::_area_kIsValid;
    }

    model_internal function calculateArea_kIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_area_kValidator.validate(model_internal::_instance.area_k)
        model_internal::_area_kIsValid_der = (valRes.results == null);
        model_internal::_area_kIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::area_kValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::area_kValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get area_kValidationFailureMessages():Array
    {
        if (model_internal::_area_kValidationFailureMessages == null)
            model_internal::calculateArea_kIsValid();

        return _area_kValidationFailureMessages;
    }

    model_internal function set area_kValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_area_kValidationFailureMessages;

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
            model_internal::_area_kValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "area_kValidationFailureMessages", oldValue, value));
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
            case("area_cpcty"):
            {
                return area_cpctyValidationFailureMessages;
            }
            case("area_name"):
            {
                return area_nameValidationFailureMessages;
            }
            case("area_eqp_sft_lnk"):
            {
                return area_eqp_sft_lnkValidationFailureMessages;
            }
            case("area_k"):
            {
                return area_kValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
