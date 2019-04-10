
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
internal class _KeyTimeCodeLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("tcd_fri", "tcd_sun", "tcd_wed", "tcd_sat", "tcd_thu", "tcd_tue", "tcd_mon", "tcd_title");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("tcd_fri", "tcd_sun", "tcd_wed", "tcd_sat", "tcd_thu", "tcd_tue", "tcd_mon", "tcd_title");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("tcd_fri", "tcd_sun", "tcd_wed", "tcd_sat", "tcd_thu", "tcd_tue", "tcd_mon", "tcd_title");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("tcd_fri", "tcd_sun", "tcd_wed", "tcd_sat", "tcd_thu", "tcd_tue", "tcd_mon", "tcd_title");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("tcd_fri", "tcd_sun", "tcd_wed", "tcd_sat", "tcd_thu", "tcd_tue", "tcd_mon", "tcd_title");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "KeyTimeCodeLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _tcd_friIsValid:Boolean;
    model_internal var _tcd_friValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tcd_friIsValidCacheInitialized:Boolean = false;
    model_internal var _tcd_friValidationFailureMessages:Array;
    
    model_internal var _tcd_sunIsValid:Boolean;
    model_internal var _tcd_sunValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tcd_sunIsValidCacheInitialized:Boolean = false;
    model_internal var _tcd_sunValidationFailureMessages:Array;
    
    model_internal var _tcd_wedIsValid:Boolean;
    model_internal var _tcd_wedValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tcd_wedIsValidCacheInitialized:Boolean = false;
    model_internal var _tcd_wedValidationFailureMessages:Array;
    
    model_internal var _tcd_satIsValid:Boolean;
    model_internal var _tcd_satValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tcd_satIsValidCacheInitialized:Boolean = false;
    model_internal var _tcd_satValidationFailureMessages:Array;
    
    model_internal var _tcd_thuIsValid:Boolean;
    model_internal var _tcd_thuValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tcd_thuIsValidCacheInitialized:Boolean = false;
    model_internal var _tcd_thuValidationFailureMessages:Array;
    
    model_internal var _tcd_tueIsValid:Boolean;
    model_internal var _tcd_tueValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tcd_tueIsValidCacheInitialized:Boolean = false;
    model_internal var _tcd_tueValidationFailureMessages:Array;
    
    model_internal var _tcd_monIsValid:Boolean;
    model_internal var _tcd_monValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tcd_monIsValidCacheInitialized:Boolean = false;
    model_internal var _tcd_monValidationFailureMessages:Array;
    
    model_internal var _tcd_titleIsValid:Boolean;
    model_internal var _tcd_titleValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tcd_titleIsValidCacheInitialized:Boolean = false;
    model_internal var _tcd_titleValidationFailureMessages:Array;

    model_internal var _instance:_Super_KeyTimeCodeLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _KeyTimeCodeLookupEntityMetadata(value : _Super_KeyTimeCodeLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["tcd_fri"] = new Array();
            model_internal::dependentsOnMap["tcd_sun"] = new Array();
            model_internal::dependentsOnMap["tcd_wed"] = new Array();
            model_internal::dependentsOnMap["tcd_sat"] = new Array();
            model_internal::dependentsOnMap["tcd_thu"] = new Array();
            model_internal::dependentsOnMap["tcd_tue"] = new Array();
            model_internal::dependentsOnMap["tcd_mon"] = new Array();
            model_internal::dependentsOnMap["tcd_title"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["tcd_fri"] = "String";
        model_internal::propertyTypeMap["tcd_sun"] = "String";
        model_internal::propertyTypeMap["tcd_wed"] = "String";
        model_internal::propertyTypeMap["tcd_sat"] = "String";
        model_internal::propertyTypeMap["tcd_thu"] = "String";
        model_internal::propertyTypeMap["tcd_tue"] = "String";
        model_internal::propertyTypeMap["tcd_mon"] = "String";
        model_internal::propertyTypeMap["tcd_title"] = "String";

        model_internal::_instance = value;
        model_internal::_tcd_friValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTcd_fri);
        model_internal::_tcd_friValidator.required = true;
        model_internal::_tcd_friValidator.requiredFieldError = "tcd_fri is required";
        //model_internal::_tcd_friValidator.source = model_internal::_instance;
        //model_internal::_tcd_friValidator.property = "tcd_fri";
        model_internal::_tcd_sunValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTcd_sun);
        model_internal::_tcd_sunValidator.required = true;
        model_internal::_tcd_sunValidator.requiredFieldError = "tcd_sun is required";
        //model_internal::_tcd_sunValidator.source = model_internal::_instance;
        //model_internal::_tcd_sunValidator.property = "tcd_sun";
        model_internal::_tcd_wedValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTcd_wed);
        model_internal::_tcd_wedValidator.required = true;
        model_internal::_tcd_wedValidator.requiredFieldError = "tcd_wed is required";
        //model_internal::_tcd_wedValidator.source = model_internal::_instance;
        //model_internal::_tcd_wedValidator.property = "tcd_wed";
        model_internal::_tcd_satValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTcd_sat);
        model_internal::_tcd_satValidator.required = true;
        model_internal::_tcd_satValidator.requiredFieldError = "tcd_sat is required";
        //model_internal::_tcd_satValidator.source = model_internal::_instance;
        //model_internal::_tcd_satValidator.property = "tcd_sat";
        model_internal::_tcd_thuValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTcd_thu);
        model_internal::_tcd_thuValidator.required = true;
        model_internal::_tcd_thuValidator.requiredFieldError = "tcd_thu is required";
        //model_internal::_tcd_thuValidator.source = model_internal::_instance;
        //model_internal::_tcd_thuValidator.property = "tcd_thu";
        model_internal::_tcd_tueValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTcd_tue);
        model_internal::_tcd_tueValidator.required = true;
        model_internal::_tcd_tueValidator.requiredFieldError = "tcd_tue is required";
        //model_internal::_tcd_tueValidator.source = model_internal::_instance;
        //model_internal::_tcd_tueValidator.property = "tcd_tue";
        model_internal::_tcd_monValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTcd_mon);
        model_internal::_tcd_monValidator.required = true;
        model_internal::_tcd_monValidator.requiredFieldError = "tcd_mon is required";
        //model_internal::_tcd_monValidator.source = model_internal::_instance;
        //model_internal::_tcd_monValidator.property = "tcd_mon";
        model_internal::_tcd_titleValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTcd_title);
        model_internal::_tcd_titleValidator.required = true;
        model_internal::_tcd_titleValidator.requiredFieldError = "tcd_title is required";
        //model_internal::_tcd_titleValidator.source = model_internal::_instance;
        //model_internal::_tcd_titleValidator.property = "tcd_title";
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
            throw new Error(propertyName + " is not a data property of entity KeyTimeCodeLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity KeyTimeCodeLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of KeyTimeCodeLookup");

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
            throw new Error(propertyName + " does not exist for entity KeyTimeCodeLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity KeyTimeCodeLookup");
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
            throw new Error(propertyName + " does not exist for entity KeyTimeCodeLookup");
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
    public function get isTcd_friAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTcd_sunAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTcd_wedAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTcd_satAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTcd_thuAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTcd_tueAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTcd_monAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTcd_titleAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnTcd_fri():void
    {
        if (model_internal::_tcd_friIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTcd_fri = null;
            model_internal::calculateTcd_friIsValid();
        }
    }
    public function invalidateDependentOnTcd_sun():void
    {
        if (model_internal::_tcd_sunIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTcd_sun = null;
            model_internal::calculateTcd_sunIsValid();
        }
    }
    public function invalidateDependentOnTcd_wed():void
    {
        if (model_internal::_tcd_wedIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTcd_wed = null;
            model_internal::calculateTcd_wedIsValid();
        }
    }
    public function invalidateDependentOnTcd_sat():void
    {
        if (model_internal::_tcd_satIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTcd_sat = null;
            model_internal::calculateTcd_satIsValid();
        }
    }
    public function invalidateDependentOnTcd_thu():void
    {
        if (model_internal::_tcd_thuIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTcd_thu = null;
            model_internal::calculateTcd_thuIsValid();
        }
    }
    public function invalidateDependentOnTcd_tue():void
    {
        if (model_internal::_tcd_tueIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTcd_tue = null;
            model_internal::calculateTcd_tueIsValid();
        }
    }
    public function invalidateDependentOnTcd_mon():void
    {
        if (model_internal::_tcd_monIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTcd_mon = null;
            model_internal::calculateTcd_monIsValid();
        }
    }
    public function invalidateDependentOnTcd_title():void
    {
        if (model_internal::_tcd_titleIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTcd_title = null;
            model_internal::calculateTcd_titleIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get tcd_friStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tcd_friValidator() : StyleValidator
    {
        return model_internal::_tcd_friValidator;
    }

    model_internal function set _tcd_friIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tcd_friIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tcd_friIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_friIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tcd_friIsValid():Boolean
    {
        if (!model_internal::_tcd_friIsValidCacheInitialized)
        {
            model_internal::calculateTcd_friIsValid();
        }

        return model_internal::_tcd_friIsValid;
    }

    model_internal function calculateTcd_friIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tcd_friValidator.validate(model_internal::_instance.tcd_fri)
        model_internal::_tcd_friIsValid_der = (valRes.results == null);
        model_internal::_tcd_friIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tcd_friValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tcd_friValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tcd_friValidationFailureMessages():Array
    {
        if (model_internal::_tcd_friValidationFailureMessages == null)
            model_internal::calculateTcd_friIsValid();

        return _tcd_friValidationFailureMessages;
    }

    model_internal function set tcd_friValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tcd_friValidationFailureMessages;

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
            model_internal::_tcd_friValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_friValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tcd_sunStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tcd_sunValidator() : StyleValidator
    {
        return model_internal::_tcd_sunValidator;
    }

    model_internal function set _tcd_sunIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tcd_sunIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tcd_sunIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_sunIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tcd_sunIsValid():Boolean
    {
        if (!model_internal::_tcd_sunIsValidCacheInitialized)
        {
            model_internal::calculateTcd_sunIsValid();
        }

        return model_internal::_tcd_sunIsValid;
    }

    model_internal function calculateTcd_sunIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tcd_sunValidator.validate(model_internal::_instance.tcd_sun)
        model_internal::_tcd_sunIsValid_der = (valRes.results == null);
        model_internal::_tcd_sunIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tcd_sunValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tcd_sunValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tcd_sunValidationFailureMessages():Array
    {
        if (model_internal::_tcd_sunValidationFailureMessages == null)
            model_internal::calculateTcd_sunIsValid();

        return _tcd_sunValidationFailureMessages;
    }

    model_internal function set tcd_sunValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tcd_sunValidationFailureMessages;

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
            model_internal::_tcd_sunValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_sunValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tcd_wedStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tcd_wedValidator() : StyleValidator
    {
        return model_internal::_tcd_wedValidator;
    }

    model_internal function set _tcd_wedIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tcd_wedIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tcd_wedIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_wedIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tcd_wedIsValid():Boolean
    {
        if (!model_internal::_tcd_wedIsValidCacheInitialized)
        {
            model_internal::calculateTcd_wedIsValid();
        }

        return model_internal::_tcd_wedIsValid;
    }

    model_internal function calculateTcd_wedIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tcd_wedValidator.validate(model_internal::_instance.tcd_wed)
        model_internal::_tcd_wedIsValid_der = (valRes.results == null);
        model_internal::_tcd_wedIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tcd_wedValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tcd_wedValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tcd_wedValidationFailureMessages():Array
    {
        if (model_internal::_tcd_wedValidationFailureMessages == null)
            model_internal::calculateTcd_wedIsValid();

        return _tcd_wedValidationFailureMessages;
    }

    model_internal function set tcd_wedValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tcd_wedValidationFailureMessages;

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
            model_internal::_tcd_wedValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_wedValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tcd_satStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tcd_satValidator() : StyleValidator
    {
        return model_internal::_tcd_satValidator;
    }

    model_internal function set _tcd_satIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tcd_satIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tcd_satIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_satIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tcd_satIsValid():Boolean
    {
        if (!model_internal::_tcd_satIsValidCacheInitialized)
        {
            model_internal::calculateTcd_satIsValid();
        }

        return model_internal::_tcd_satIsValid;
    }

    model_internal function calculateTcd_satIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tcd_satValidator.validate(model_internal::_instance.tcd_sat)
        model_internal::_tcd_satIsValid_der = (valRes.results == null);
        model_internal::_tcd_satIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tcd_satValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tcd_satValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tcd_satValidationFailureMessages():Array
    {
        if (model_internal::_tcd_satValidationFailureMessages == null)
            model_internal::calculateTcd_satIsValid();

        return _tcd_satValidationFailureMessages;
    }

    model_internal function set tcd_satValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tcd_satValidationFailureMessages;

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
            model_internal::_tcd_satValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_satValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tcd_thuStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tcd_thuValidator() : StyleValidator
    {
        return model_internal::_tcd_thuValidator;
    }

    model_internal function set _tcd_thuIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tcd_thuIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tcd_thuIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_thuIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tcd_thuIsValid():Boolean
    {
        if (!model_internal::_tcd_thuIsValidCacheInitialized)
        {
            model_internal::calculateTcd_thuIsValid();
        }

        return model_internal::_tcd_thuIsValid;
    }

    model_internal function calculateTcd_thuIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tcd_thuValidator.validate(model_internal::_instance.tcd_thu)
        model_internal::_tcd_thuIsValid_der = (valRes.results == null);
        model_internal::_tcd_thuIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tcd_thuValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tcd_thuValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tcd_thuValidationFailureMessages():Array
    {
        if (model_internal::_tcd_thuValidationFailureMessages == null)
            model_internal::calculateTcd_thuIsValid();

        return _tcd_thuValidationFailureMessages;
    }

    model_internal function set tcd_thuValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tcd_thuValidationFailureMessages;

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
            model_internal::_tcd_thuValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_thuValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tcd_tueStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tcd_tueValidator() : StyleValidator
    {
        return model_internal::_tcd_tueValidator;
    }

    model_internal function set _tcd_tueIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tcd_tueIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tcd_tueIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_tueIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tcd_tueIsValid():Boolean
    {
        if (!model_internal::_tcd_tueIsValidCacheInitialized)
        {
            model_internal::calculateTcd_tueIsValid();
        }

        return model_internal::_tcd_tueIsValid;
    }

    model_internal function calculateTcd_tueIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tcd_tueValidator.validate(model_internal::_instance.tcd_tue)
        model_internal::_tcd_tueIsValid_der = (valRes.results == null);
        model_internal::_tcd_tueIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tcd_tueValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tcd_tueValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tcd_tueValidationFailureMessages():Array
    {
        if (model_internal::_tcd_tueValidationFailureMessages == null)
            model_internal::calculateTcd_tueIsValid();

        return _tcd_tueValidationFailureMessages;
    }

    model_internal function set tcd_tueValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tcd_tueValidationFailureMessages;

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
            model_internal::_tcd_tueValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_tueValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tcd_monStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tcd_monValidator() : StyleValidator
    {
        return model_internal::_tcd_monValidator;
    }

    model_internal function set _tcd_monIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tcd_monIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tcd_monIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_monIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tcd_monIsValid():Boolean
    {
        if (!model_internal::_tcd_monIsValidCacheInitialized)
        {
            model_internal::calculateTcd_monIsValid();
        }

        return model_internal::_tcd_monIsValid;
    }

    model_internal function calculateTcd_monIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tcd_monValidator.validate(model_internal::_instance.tcd_mon)
        model_internal::_tcd_monIsValid_der = (valRes.results == null);
        model_internal::_tcd_monIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tcd_monValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tcd_monValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tcd_monValidationFailureMessages():Array
    {
        if (model_internal::_tcd_monValidationFailureMessages == null)
            model_internal::calculateTcd_monIsValid();

        return _tcd_monValidationFailureMessages;
    }

    model_internal function set tcd_monValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tcd_monValidationFailureMessages;

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
            model_internal::_tcd_monValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_monValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tcd_titleStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tcd_titleValidator() : StyleValidator
    {
        return model_internal::_tcd_titleValidator;
    }

    model_internal function set _tcd_titleIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tcd_titleIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tcd_titleIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_titleIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tcd_titleIsValid():Boolean
    {
        if (!model_internal::_tcd_titleIsValidCacheInitialized)
        {
            model_internal::calculateTcd_titleIsValid();
        }

        return model_internal::_tcd_titleIsValid;
    }

    model_internal function calculateTcd_titleIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tcd_titleValidator.validate(model_internal::_instance.tcd_title)
        model_internal::_tcd_titleIsValid_der = (valRes.results == null);
        model_internal::_tcd_titleIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tcd_titleValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tcd_titleValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tcd_titleValidationFailureMessages():Array
    {
        if (model_internal::_tcd_titleValidationFailureMessages == null)
            model_internal::calculateTcd_titleIsValid();

        return _tcd_titleValidationFailureMessages;
    }

    model_internal function set tcd_titleValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tcd_titleValidationFailureMessages;

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
            model_internal::_tcd_titleValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tcd_titleValidationFailureMessages", oldValue, value));
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
            case("tcd_fri"):
            {
                return tcd_friValidationFailureMessages;
            }
            case("tcd_sun"):
            {
                return tcd_sunValidationFailureMessages;
            }
            case("tcd_wed"):
            {
                return tcd_wedValidationFailureMessages;
            }
            case("tcd_sat"):
            {
                return tcd_satValidationFailureMessages;
            }
            case("tcd_thu"):
            {
                return tcd_thuValidationFailureMessages;
            }
            case("tcd_tue"):
            {
                return tcd_tueValidationFailureMessages;
            }
            case("tcd_mon"):
            {
                return tcd_monValidationFailureMessages;
            }
            case("tcd_title"):
            {
                return tcd_titleValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
