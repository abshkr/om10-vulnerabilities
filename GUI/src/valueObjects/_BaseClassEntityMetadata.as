
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
internal class _BaseClassEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("bclass_desc", "bclass_no", "bclass_dens_hi", "bclass_vcf_alg", "bclass_dens_lo");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("bclass_desc", "bclass_no", "bclass_dens_hi", "bclass_vcf_alg", "bclass_dens_lo");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("bclass_desc", "bclass_no", "bclass_dens_hi", "bclass_vcf_alg", "bclass_dens_lo");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("bclass_desc", "bclass_no", "bclass_dens_hi", "bclass_vcf_alg", "bclass_dens_lo");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("bclass_desc", "bclass_no", "bclass_dens_hi", "bclass_vcf_alg", "bclass_dens_lo");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "BaseClass";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _bclass_descIsValid:Boolean;
    model_internal var _bclass_descValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bclass_descIsValidCacheInitialized:Boolean = false;
    model_internal var _bclass_descValidationFailureMessages:Array;
    
    model_internal var _bclass_noIsValid:Boolean;
    model_internal var _bclass_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bclass_noIsValidCacheInitialized:Boolean = false;
    model_internal var _bclass_noValidationFailureMessages:Array;
    
    model_internal var _bclass_dens_hiIsValid:Boolean;
    model_internal var _bclass_dens_hiValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bclass_dens_hiIsValidCacheInitialized:Boolean = false;
    model_internal var _bclass_dens_hiValidationFailureMessages:Array;
    
    model_internal var _bclass_vcf_algIsValid:Boolean;
    model_internal var _bclass_vcf_algValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bclass_vcf_algIsValidCacheInitialized:Boolean = false;
    model_internal var _bclass_vcf_algValidationFailureMessages:Array;
    
    model_internal var _bclass_dens_loIsValid:Boolean;
    model_internal var _bclass_dens_loValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _bclass_dens_loIsValidCacheInitialized:Boolean = false;
    model_internal var _bclass_dens_loValidationFailureMessages:Array;

    model_internal var _instance:_Super_BaseClass;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _BaseClassEntityMetadata(value : _Super_BaseClass)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["bclass_desc"] = new Array();
            model_internal::dependentsOnMap["bclass_no"] = new Array();
            model_internal::dependentsOnMap["bclass_dens_hi"] = new Array();
            model_internal::dependentsOnMap["bclass_vcf_alg"] = new Array();
            model_internal::dependentsOnMap["bclass_dens_lo"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["bclass_desc"] = "String";
        model_internal::propertyTypeMap["bclass_no"] = "String";
        model_internal::propertyTypeMap["bclass_dens_hi"] = "String";
        model_internal::propertyTypeMap["bclass_vcf_alg"] = "String";
        model_internal::propertyTypeMap["bclass_dens_lo"] = "String";

        model_internal::_instance = value;
        model_internal::_bclass_descValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBclass_desc);
        model_internal::_bclass_descValidator.required = true;
        model_internal::_bclass_descValidator.requiredFieldError = "bclass_desc is required";
        //model_internal::_bclass_descValidator.source = model_internal::_instance;
        //model_internal::_bclass_descValidator.property = "bclass_desc";
        model_internal::_bclass_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBclass_no);
        model_internal::_bclass_noValidator.required = true;
        model_internal::_bclass_noValidator.requiredFieldError = "bclass_no is required";
        //model_internal::_bclass_noValidator.source = model_internal::_instance;
        //model_internal::_bclass_noValidator.property = "bclass_no";
        model_internal::_bclass_dens_hiValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBclass_dens_hi);
        model_internal::_bclass_dens_hiValidator.required = true;
        model_internal::_bclass_dens_hiValidator.requiredFieldError = "bclass_dens_hi is required";
        //model_internal::_bclass_dens_hiValidator.source = model_internal::_instance;
        //model_internal::_bclass_dens_hiValidator.property = "bclass_dens_hi";
        model_internal::_bclass_vcf_algValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBclass_vcf_alg);
        model_internal::_bclass_vcf_algValidator.required = true;
        model_internal::_bclass_vcf_algValidator.requiredFieldError = "bclass_vcf_alg is required";
        //model_internal::_bclass_vcf_algValidator.source = model_internal::_instance;
        //model_internal::_bclass_vcf_algValidator.property = "bclass_vcf_alg";
        model_internal::_bclass_dens_loValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForBclass_dens_lo);
        model_internal::_bclass_dens_loValidator.required = true;
        model_internal::_bclass_dens_loValidator.requiredFieldError = "bclass_dens_lo is required";
        //model_internal::_bclass_dens_loValidator.source = model_internal::_instance;
        //model_internal::_bclass_dens_loValidator.property = "bclass_dens_lo";
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
            throw new Error(propertyName + " is not a data property of entity BaseClass");
            
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
            throw new Error(propertyName + " is not a collection property of entity BaseClass");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of BaseClass");

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
            throw new Error(propertyName + " does not exist for entity BaseClass");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity BaseClass");
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
            throw new Error(propertyName + " does not exist for entity BaseClass");
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
    public function get isBclass_descAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBclass_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBclass_dens_hiAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBclass_vcf_algAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isBclass_dens_loAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnBclass_desc():void
    {
        if (model_internal::_bclass_descIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBclass_desc = null;
            model_internal::calculateBclass_descIsValid();
        }
    }
    public function invalidateDependentOnBclass_no():void
    {
        if (model_internal::_bclass_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBclass_no = null;
            model_internal::calculateBclass_noIsValid();
        }
    }
    public function invalidateDependentOnBclass_dens_hi():void
    {
        if (model_internal::_bclass_dens_hiIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBclass_dens_hi = null;
            model_internal::calculateBclass_dens_hiIsValid();
        }
    }
    public function invalidateDependentOnBclass_vcf_alg():void
    {
        if (model_internal::_bclass_vcf_algIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBclass_vcf_alg = null;
            model_internal::calculateBclass_vcf_algIsValid();
        }
    }
    public function invalidateDependentOnBclass_dens_lo():void
    {
        if (model_internal::_bclass_dens_loIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfBclass_dens_lo = null;
            model_internal::calculateBclass_dens_loIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get bclass_descStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bclass_descValidator() : StyleValidator
    {
        return model_internal::_bclass_descValidator;
    }

    model_internal function set _bclass_descIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bclass_descIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bclass_descIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_descIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bclass_descIsValid():Boolean
    {
        if (!model_internal::_bclass_descIsValidCacheInitialized)
        {
            model_internal::calculateBclass_descIsValid();
        }

        return model_internal::_bclass_descIsValid;
    }

    model_internal function calculateBclass_descIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bclass_descValidator.validate(model_internal::_instance.bclass_desc)
        model_internal::_bclass_descIsValid_der = (valRes.results == null);
        model_internal::_bclass_descIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bclass_descValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bclass_descValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bclass_descValidationFailureMessages():Array
    {
        if (model_internal::_bclass_descValidationFailureMessages == null)
            model_internal::calculateBclass_descIsValid();

        return _bclass_descValidationFailureMessages;
    }

    model_internal function set bclass_descValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bclass_descValidationFailureMessages;

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
            model_internal::_bclass_descValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_descValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get bclass_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bclass_noValidator() : StyleValidator
    {
        return model_internal::_bclass_noValidator;
    }

    model_internal function set _bclass_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bclass_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bclass_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bclass_noIsValid():Boolean
    {
        if (!model_internal::_bclass_noIsValidCacheInitialized)
        {
            model_internal::calculateBclass_noIsValid();
        }

        return model_internal::_bclass_noIsValid;
    }

    model_internal function calculateBclass_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bclass_noValidator.validate(model_internal::_instance.bclass_no)
        model_internal::_bclass_noIsValid_der = (valRes.results == null);
        model_internal::_bclass_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bclass_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bclass_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bclass_noValidationFailureMessages():Array
    {
        if (model_internal::_bclass_noValidationFailureMessages == null)
            model_internal::calculateBclass_noIsValid();

        return _bclass_noValidationFailureMessages;
    }

    model_internal function set bclass_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bclass_noValidationFailureMessages;

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
            model_internal::_bclass_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get bclass_dens_hiStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bclass_dens_hiValidator() : StyleValidator
    {
        return model_internal::_bclass_dens_hiValidator;
    }

    model_internal function set _bclass_dens_hiIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bclass_dens_hiIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bclass_dens_hiIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_dens_hiIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bclass_dens_hiIsValid():Boolean
    {
        if (!model_internal::_bclass_dens_hiIsValidCacheInitialized)
        {
            model_internal::calculateBclass_dens_hiIsValid();
        }

        return model_internal::_bclass_dens_hiIsValid;
    }

    model_internal function calculateBclass_dens_hiIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bclass_dens_hiValidator.validate(model_internal::_instance.bclass_dens_hi)
        model_internal::_bclass_dens_hiIsValid_der = (valRes.results == null);
        model_internal::_bclass_dens_hiIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bclass_dens_hiValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bclass_dens_hiValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bclass_dens_hiValidationFailureMessages():Array
    {
        if (model_internal::_bclass_dens_hiValidationFailureMessages == null)
            model_internal::calculateBclass_dens_hiIsValid();

        return _bclass_dens_hiValidationFailureMessages;
    }

    model_internal function set bclass_dens_hiValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bclass_dens_hiValidationFailureMessages;

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
            model_internal::_bclass_dens_hiValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_dens_hiValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get bclass_vcf_algStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bclass_vcf_algValidator() : StyleValidator
    {
        return model_internal::_bclass_vcf_algValidator;
    }

    model_internal function set _bclass_vcf_algIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bclass_vcf_algIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bclass_vcf_algIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_vcf_algIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bclass_vcf_algIsValid():Boolean
    {
        if (!model_internal::_bclass_vcf_algIsValidCacheInitialized)
        {
            model_internal::calculateBclass_vcf_algIsValid();
        }

        return model_internal::_bclass_vcf_algIsValid;
    }

    model_internal function calculateBclass_vcf_algIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bclass_vcf_algValidator.validate(model_internal::_instance.bclass_vcf_alg)
        model_internal::_bclass_vcf_algIsValid_der = (valRes.results == null);
        model_internal::_bclass_vcf_algIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bclass_vcf_algValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bclass_vcf_algValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bclass_vcf_algValidationFailureMessages():Array
    {
        if (model_internal::_bclass_vcf_algValidationFailureMessages == null)
            model_internal::calculateBclass_vcf_algIsValid();

        return _bclass_vcf_algValidationFailureMessages;
    }

    model_internal function set bclass_vcf_algValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bclass_vcf_algValidationFailureMessages;

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
            model_internal::_bclass_vcf_algValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_vcf_algValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get bclass_dens_loStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get bclass_dens_loValidator() : StyleValidator
    {
        return model_internal::_bclass_dens_loValidator;
    }

    model_internal function set _bclass_dens_loIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_bclass_dens_loIsValid;         
        if (oldValue !== value)
        {
            model_internal::_bclass_dens_loIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_dens_loIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get bclass_dens_loIsValid():Boolean
    {
        if (!model_internal::_bclass_dens_loIsValidCacheInitialized)
        {
            model_internal::calculateBclass_dens_loIsValid();
        }

        return model_internal::_bclass_dens_loIsValid;
    }

    model_internal function calculateBclass_dens_loIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_bclass_dens_loValidator.validate(model_internal::_instance.bclass_dens_lo)
        model_internal::_bclass_dens_loIsValid_der = (valRes.results == null);
        model_internal::_bclass_dens_loIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::bclass_dens_loValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::bclass_dens_loValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get bclass_dens_loValidationFailureMessages():Array
    {
        if (model_internal::_bclass_dens_loValidationFailureMessages == null)
            model_internal::calculateBclass_dens_loIsValid();

        return _bclass_dens_loValidationFailureMessages;
    }

    model_internal function set bclass_dens_loValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_bclass_dens_loValidationFailureMessages;

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
            model_internal::_bclass_dens_loValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "bclass_dens_loValidationFailureMessages", oldValue, value));
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
            case("bclass_desc"):
            {
                return bclass_descValidationFailureMessages;
            }
            case("bclass_no"):
            {
                return bclass_noValidationFailureMessages;
            }
            case("bclass_dens_hi"):
            {
                return bclass_dens_hiValidationFailureMessages;
            }
            case("bclass_vcf_alg"):
            {
                return bclass_vcf_algValidationFailureMessages;
            }
            case("bclass_dens_lo"):
            {
                return bclass_dens_loValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
