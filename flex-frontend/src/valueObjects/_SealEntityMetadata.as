
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
internal class _SealEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("site_next_seal", "seal_cmpt_nr", "sealspec_shlssupp", "sealspec_shlstrip", "seal_suffix", "seal_prefix", "seal_nr");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("site_next_seal", "seal_cmpt_nr", "sealspec_shlssupp", "sealspec_shlstrip", "seal_suffix", "seal_prefix", "seal_nr");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("site_next_seal", "seal_cmpt_nr", "sealspec_shlssupp", "sealspec_shlstrip", "seal_suffix", "seal_prefix", "seal_nr");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("site_next_seal", "seal_cmpt_nr", "sealspec_shlssupp", "sealspec_shlstrip", "seal_suffix", "seal_prefix", "seal_nr");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("site_next_seal", "seal_cmpt_nr", "sealspec_shlssupp", "sealspec_shlstrip", "seal_suffix", "seal_prefix", "seal_nr");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "Seal";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _site_next_sealIsValid:Boolean;
    model_internal var _site_next_sealValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _site_next_sealIsValidCacheInitialized:Boolean = false;
    model_internal var _site_next_sealValidationFailureMessages:Array;
    
    model_internal var _seal_cmpt_nrIsValid:Boolean;
    model_internal var _seal_cmpt_nrValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _seal_cmpt_nrIsValidCacheInitialized:Boolean = false;
    model_internal var _seal_cmpt_nrValidationFailureMessages:Array;
    
    model_internal var _sealspec_shlssuppIsValid:Boolean;
    model_internal var _sealspec_shlssuppValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _sealspec_shlssuppIsValidCacheInitialized:Boolean = false;
    model_internal var _sealspec_shlssuppValidationFailureMessages:Array;
    
    model_internal var _sealspec_shlstripIsValid:Boolean;
    model_internal var _sealspec_shlstripValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _sealspec_shlstripIsValidCacheInitialized:Boolean = false;
    model_internal var _sealspec_shlstripValidationFailureMessages:Array;
    
    model_internal var _seal_suffixIsValid:Boolean;
    model_internal var _seal_suffixValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _seal_suffixIsValidCacheInitialized:Boolean = false;
    model_internal var _seal_suffixValidationFailureMessages:Array;
    
    model_internal var _seal_prefixIsValid:Boolean;
    model_internal var _seal_prefixValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _seal_prefixIsValidCacheInitialized:Boolean = false;
    model_internal var _seal_prefixValidationFailureMessages:Array;
    
    model_internal var _seal_nrIsValid:Boolean;
    model_internal var _seal_nrValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _seal_nrIsValidCacheInitialized:Boolean = false;
    model_internal var _seal_nrValidationFailureMessages:Array;

    model_internal var _instance:_Super_Seal;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _SealEntityMetadata(value : _Super_Seal)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["site_next_seal"] = new Array();
            model_internal::dependentsOnMap["seal_cmpt_nr"] = new Array();
            model_internal::dependentsOnMap["sealspec_shlssupp"] = new Array();
            model_internal::dependentsOnMap["sealspec_shlstrip"] = new Array();
            model_internal::dependentsOnMap["seal_suffix"] = new Array();
            model_internal::dependentsOnMap["seal_prefix"] = new Array();
            model_internal::dependentsOnMap["seal_nr"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["site_next_seal"] = "String";
        model_internal::propertyTypeMap["seal_cmpt_nr"] = "String";
        model_internal::propertyTypeMap["sealspec_shlssupp"] = "Object";
        model_internal::propertyTypeMap["sealspec_shlstrip"] = "Object";
        model_internal::propertyTypeMap["seal_suffix"] = "String";
        model_internal::propertyTypeMap["seal_prefix"] = "String";
        model_internal::propertyTypeMap["seal_nr"] = "String";

        model_internal::_instance = value;
        model_internal::_site_next_sealValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSite_next_seal);
        model_internal::_site_next_sealValidator.required = true;
        model_internal::_site_next_sealValidator.requiredFieldError = "site_next_seal is required";
        //model_internal::_site_next_sealValidator.source = model_internal::_instance;
        //model_internal::_site_next_sealValidator.property = "site_next_seal";
        model_internal::_seal_cmpt_nrValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSeal_cmpt_nr);
        model_internal::_seal_cmpt_nrValidator.required = true;
        model_internal::_seal_cmpt_nrValidator.requiredFieldError = "seal_cmpt_nr is required";
        //model_internal::_seal_cmpt_nrValidator.source = model_internal::_instance;
        //model_internal::_seal_cmpt_nrValidator.property = "seal_cmpt_nr";
        model_internal::_sealspec_shlssuppValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSealspec_shlssupp);
        model_internal::_sealspec_shlssuppValidator.required = true;
        model_internal::_sealspec_shlssuppValidator.requiredFieldError = "sealspec_shlssupp is required";
        //model_internal::_sealspec_shlssuppValidator.source = model_internal::_instance;
        //model_internal::_sealspec_shlssuppValidator.property = "sealspec_shlssupp";
        model_internal::_sealspec_shlstripValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSealspec_shlstrip);
        model_internal::_sealspec_shlstripValidator.required = true;
        model_internal::_sealspec_shlstripValidator.requiredFieldError = "sealspec_shlstrip is required";
        //model_internal::_sealspec_shlstripValidator.source = model_internal::_instance;
        //model_internal::_sealspec_shlstripValidator.property = "sealspec_shlstrip";
        model_internal::_seal_suffixValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSeal_suffix);
        model_internal::_seal_suffixValidator.required = true;
        model_internal::_seal_suffixValidator.requiredFieldError = "seal_suffix is required";
        //model_internal::_seal_suffixValidator.source = model_internal::_instance;
        //model_internal::_seal_suffixValidator.property = "seal_suffix";
        model_internal::_seal_prefixValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSeal_prefix);
        model_internal::_seal_prefixValidator.required = true;
        model_internal::_seal_prefixValidator.requiredFieldError = "seal_prefix is required";
        //model_internal::_seal_prefixValidator.source = model_internal::_instance;
        //model_internal::_seal_prefixValidator.property = "seal_prefix";
        model_internal::_seal_nrValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSeal_nr);
        model_internal::_seal_nrValidator.required = true;
        model_internal::_seal_nrValidator.requiredFieldError = "seal_nr is required";
        //model_internal::_seal_nrValidator.source = model_internal::_instance;
        //model_internal::_seal_nrValidator.property = "seal_nr";
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
            throw new Error(propertyName + " is not a data property of entity Seal");
            
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
            throw new Error(propertyName + " is not a collection property of entity Seal");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of Seal");

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
            throw new Error(propertyName + " does not exist for entity Seal");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity Seal");
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
            throw new Error(propertyName + " does not exist for entity Seal");
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
    public function get isSite_next_sealAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSeal_cmpt_nrAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSealspec_shlssuppAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSealspec_shlstripAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSeal_suffixAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSeal_prefixAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSeal_nrAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnSite_next_seal():void
    {
        if (model_internal::_site_next_sealIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSite_next_seal = null;
            model_internal::calculateSite_next_sealIsValid();
        }
    }
    public function invalidateDependentOnSeal_cmpt_nr():void
    {
        if (model_internal::_seal_cmpt_nrIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSeal_cmpt_nr = null;
            model_internal::calculateSeal_cmpt_nrIsValid();
        }
    }
    public function invalidateDependentOnSealspec_shlssupp():void
    {
        if (model_internal::_sealspec_shlssuppIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSealspec_shlssupp = null;
            model_internal::calculateSealspec_shlssuppIsValid();
        }
    }
    public function invalidateDependentOnSealspec_shlstrip():void
    {
        if (model_internal::_sealspec_shlstripIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSealspec_shlstrip = null;
            model_internal::calculateSealspec_shlstripIsValid();
        }
    }
    public function invalidateDependentOnSeal_suffix():void
    {
        if (model_internal::_seal_suffixIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSeal_suffix = null;
            model_internal::calculateSeal_suffixIsValid();
        }
    }
    public function invalidateDependentOnSeal_prefix():void
    {
        if (model_internal::_seal_prefixIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSeal_prefix = null;
            model_internal::calculateSeal_prefixIsValid();
        }
    }
    public function invalidateDependentOnSeal_nr():void
    {
        if (model_internal::_seal_nrIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSeal_nr = null;
            model_internal::calculateSeal_nrIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get site_next_sealStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get site_next_sealValidator() : StyleValidator
    {
        return model_internal::_site_next_sealValidator;
    }

    model_internal function set _site_next_sealIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_site_next_sealIsValid;         
        if (oldValue !== value)
        {
            model_internal::_site_next_sealIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "site_next_sealIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get site_next_sealIsValid():Boolean
    {
        if (!model_internal::_site_next_sealIsValidCacheInitialized)
        {
            model_internal::calculateSite_next_sealIsValid();
        }

        return model_internal::_site_next_sealIsValid;
    }

    model_internal function calculateSite_next_sealIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_site_next_sealValidator.validate(model_internal::_instance.site_next_seal)
        model_internal::_site_next_sealIsValid_der = (valRes.results == null);
        model_internal::_site_next_sealIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::site_next_sealValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::site_next_sealValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get site_next_sealValidationFailureMessages():Array
    {
        if (model_internal::_site_next_sealValidationFailureMessages == null)
            model_internal::calculateSite_next_sealIsValid();

        return _site_next_sealValidationFailureMessages;
    }

    model_internal function set site_next_sealValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_site_next_sealValidationFailureMessages;

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
            model_internal::_site_next_sealValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "site_next_sealValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get seal_cmpt_nrStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get seal_cmpt_nrValidator() : StyleValidator
    {
        return model_internal::_seal_cmpt_nrValidator;
    }

    model_internal function set _seal_cmpt_nrIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_seal_cmpt_nrIsValid;         
        if (oldValue !== value)
        {
            model_internal::_seal_cmpt_nrIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "seal_cmpt_nrIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get seal_cmpt_nrIsValid():Boolean
    {
        if (!model_internal::_seal_cmpt_nrIsValidCacheInitialized)
        {
            model_internal::calculateSeal_cmpt_nrIsValid();
        }

        return model_internal::_seal_cmpt_nrIsValid;
    }

    model_internal function calculateSeal_cmpt_nrIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_seal_cmpt_nrValidator.validate(model_internal::_instance.seal_cmpt_nr)
        model_internal::_seal_cmpt_nrIsValid_der = (valRes.results == null);
        model_internal::_seal_cmpt_nrIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::seal_cmpt_nrValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::seal_cmpt_nrValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get seal_cmpt_nrValidationFailureMessages():Array
    {
        if (model_internal::_seal_cmpt_nrValidationFailureMessages == null)
            model_internal::calculateSeal_cmpt_nrIsValid();

        return _seal_cmpt_nrValidationFailureMessages;
    }

    model_internal function set seal_cmpt_nrValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_seal_cmpt_nrValidationFailureMessages;

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
            model_internal::_seal_cmpt_nrValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "seal_cmpt_nrValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get sealspec_shlssuppStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get sealspec_shlssuppValidator() : StyleValidator
    {
        return model_internal::_sealspec_shlssuppValidator;
    }

    model_internal function set _sealspec_shlssuppIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_sealspec_shlssuppIsValid;         
        if (oldValue !== value)
        {
            model_internal::_sealspec_shlssuppIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sealspec_shlssuppIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get sealspec_shlssuppIsValid():Boolean
    {
        if (!model_internal::_sealspec_shlssuppIsValidCacheInitialized)
        {
            model_internal::calculateSealspec_shlssuppIsValid();
        }

        return model_internal::_sealspec_shlssuppIsValid;
    }

    model_internal function calculateSealspec_shlssuppIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_sealspec_shlssuppValidator.validate(model_internal::_instance.sealspec_shlssupp)
        model_internal::_sealspec_shlssuppIsValid_der = (valRes.results == null);
        model_internal::_sealspec_shlssuppIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::sealspec_shlssuppValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::sealspec_shlssuppValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get sealspec_shlssuppValidationFailureMessages():Array
    {
        if (model_internal::_sealspec_shlssuppValidationFailureMessages == null)
            model_internal::calculateSealspec_shlssuppIsValid();

        return _sealspec_shlssuppValidationFailureMessages;
    }

    model_internal function set sealspec_shlssuppValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_sealspec_shlssuppValidationFailureMessages;

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
            model_internal::_sealspec_shlssuppValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sealspec_shlssuppValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get sealspec_shlstripStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get sealspec_shlstripValidator() : StyleValidator
    {
        return model_internal::_sealspec_shlstripValidator;
    }

    model_internal function set _sealspec_shlstripIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_sealspec_shlstripIsValid;         
        if (oldValue !== value)
        {
            model_internal::_sealspec_shlstripIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sealspec_shlstripIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get sealspec_shlstripIsValid():Boolean
    {
        if (!model_internal::_sealspec_shlstripIsValidCacheInitialized)
        {
            model_internal::calculateSealspec_shlstripIsValid();
        }

        return model_internal::_sealspec_shlstripIsValid;
    }

    model_internal function calculateSealspec_shlstripIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_sealspec_shlstripValidator.validate(model_internal::_instance.sealspec_shlstrip)
        model_internal::_sealspec_shlstripIsValid_der = (valRes.results == null);
        model_internal::_sealspec_shlstripIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::sealspec_shlstripValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::sealspec_shlstripValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get sealspec_shlstripValidationFailureMessages():Array
    {
        if (model_internal::_sealspec_shlstripValidationFailureMessages == null)
            model_internal::calculateSealspec_shlstripIsValid();

        return _sealspec_shlstripValidationFailureMessages;
    }

    model_internal function set sealspec_shlstripValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_sealspec_shlstripValidationFailureMessages;

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
            model_internal::_sealspec_shlstripValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sealspec_shlstripValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get seal_suffixStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get seal_suffixValidator() : StyleValidator
    {
        return model_internal::_seal_suffixValidator;
    }

    model_internal function set _seal_suffixIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_seal_suffixIsValid;         
        if (oldValue !== value)
        {
            model_internal::_seal_suffixIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "seal_suffixIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get seal_suffixIsValid():Boolean
    {
        if (!model_internal::_seal_suffixIsValidCacheInitialized)
        {
            model_internal::calculateSeal_suffixIsValid();
        }

        return model_internal::_seal_suffixIsValid;
    }

    model_internal function calculateSeal_suffixIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_seal_suffixValidator.validate(model_internal::_instance.seal_suffix)
        model_internal::_seal_suffixIsValid_der = (valRes.results == null);
        model_internal::_seal_suffixIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::seal_suffixValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::seal_suffixValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get seal_suffixValidationFailureMessages():Array
    {
        if (model_internal::_seal_suffixValidationFailureMessages == null)
            model_internal::calculateSeal_suffixIsValid();

        return _seal_suffixValidationFailureMessages;
    }

    model_internal function set seal_suffixValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_seal_suffixValidationFailureMessages;

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
            model_internal::_seal_suffixValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "seal_suffixValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get seal_prefixStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get seal_prefixValidator() : StyleValidator
    {
        return model_internal::_seal_prefixValidator;
    }

    model_internal function set _seal_prefixIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_seal_prefixIsValid;         
        if (oldValue !== value)
        {
            model_internal::_seal_prefixIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "seal_prefixIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get seal_prefixIsValid():Boolean
    {
        if (!model_internal::_seal_prefixIsValidCacheInitialized)
        {
            model_internal::calculateSeal_prefixIsValid();
        }

        return model_internal::_seal_prefixIsValid;
    }

    model_internal function calculateSeal_prefixIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_seal_prefixValidator.validate(model_internal::_instance.seal_prefix)
        model_internal::_seal_prefixIsValid_der = (valRes.results == null);
        model_internal::_seal_prefixIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::seal_prefixValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::seal_prefixValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get seal_prefixValidationFailureMessages():Array
    {
        if (model_internal::_seal_prefixValidationFailureMessages == null)
            model_internal::calculateSeal_prefixIsValid();

        return _seal_prefixValidationFailureMessages;
    }

    model_internal function set seal_prefixValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_seal_prefixValidationFailureMessages;

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
            model_internal::_seal_prefixValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "seal_prefixValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get seal_nrStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get seal_nrValidator() : StyleValidator
    {
        return model_internal::_seal_nrValidator;
    }

    model_internal function set _seal_nrIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_seal_nrIsValid;         
        if (oldValue !== value)
        {
            model_internal::_seal_nrIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "seal_nrIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get seal_nrIsValid():Boolean
    {
        if (!model_internal::_seal_nrIsValidCacheInitialized)
        {
            model_internal::calculateSeal_nrIsValid();
        }

        return model_internal::_seal_nrIsValid;
    }

    model_internal function calculateSeal_nrIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_seal_nrValidator.validate(model_internal::_instance.seal_nr)
        model_internal::_seal_nrIsValid_der = (valRes.results == null);
        model_internal::_seal_nrIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::seal_nrValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::seal_nrValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get seal_nrValidationFailureMessages():Array
    {
        if (model_internal::_seal_nrValidationFailureMessages == null)
            model_internal::calculateSeal_nrIsValid();

        return _seal_nrValidationFailureMessages;
    }

    model_internal function set seal_nrValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_seal_nrValidationFailureMessages;

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
            model_internal::_seal_nrValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "seal_nrValidationFailureMessages", oldValue, value));
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
            case("site_next_seal"):
            {
                return site_next_sealValidationFailureMessages;
            }
            case("seal_cmpt_nr"):
            {
                return seal_cmpt_nrValidationFailureMessages;
            }
            case("sealspec_shlssupp"):
            {
                return sealspec_shlssuppValidationFailureMessages;
            }
            case("sealspec_shlstrip"):
            {
                return sealspec_shlstripValidationFailureMessages;
            }
            case("seal_suffix"):
            {
                return seal_suffixValidationFailureMessages;
            }
            case("seal_prefix"):
            {
                return seal_prefixValidationFailureMessages;
            }
            case("seal_nr"):
            {
                return seal_nrValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
