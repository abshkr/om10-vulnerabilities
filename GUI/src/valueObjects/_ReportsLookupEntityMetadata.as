
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
internal class _ReportsLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("jasp_file", "rpt_cmpy", "rpt_additive", "rpt_active", "rpt_freq", "rpt_file", "rpt_is_closeout", "rpt_enable", "rpt_desc", "rpt_lang", "rpt_name");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("jasp_file", "rpt_cmpy", "rpt_additive", "rpt_active", "rpt_freq", "rpt_file", "rpt_is_closeout", "rpt_enable", "rpt_desc", "rpt_lang", "rpt_name");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("jasp_file", "rpt_cmpy", "rpt_additive", "rpt_active", "rpt_freq", "rpt_file", "rpt_is_closeout", "rpt_enable", "rpt_desc", "rpt_lang", "rpt_name");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("jasp_file", "rpt_cmpy", "rpt_additive", "rpt_active", "rpt_freq", "rpt_file", "rpt_is_closeout", "rpt_enable", "rpt_desc", "rpt_lang", "rpt_name");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("jasp_file", "rpt_cmpy", "rpt_additive", "rpt_active", "rpt_freq", "rpt_file", "rpt_is_closeout", "rpt_enable", "rpt_desc", "rpt_lang", "rpt_name");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "ReportsLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _jasp_fileIsValid:Boolean;
    model_internal var _jasp_fileValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _jasp_fileIsValidCacheInitialized:Boolean = false;
    model_internal var _jasp_fileValidationFailureMessages:Array;
    
    model_internal var _rpt_cmpyIsValid:Boolean;
    model_internal var _rpt_cmpyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _rpt_cmpyIsValidCacheInitialized:Boolean = false;
    model_internal var _rpt_cmpyValidationFailureMessages:Array;
    
    model_internal var _rpt_additiveIsValid:Boolean;
    model_internal var _rpt_additiveValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _rpt_additiveIsValidCacheInitialized:Boolean = false;
    model_internal var _rpt_additiveValidationFailureMessages:Array;
    
    model_internal var _rpt_activeIsValid:Boolean;
    model_internal var _rpt_activeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _rpt_activeIsValidCacheInitialized:Boolean = false;
    model_internal var _rpt_activeValidationFailureMessages:Array;
    
    model_internal var _rpt_freqIsValid:Boolean;
    model_internal var _rpt_freqValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _rpt_freqIsValidCacheInitialized:Boolean = false;
    model_internal var _rpt_freqValidationFailureMessages:Array;
    
    model_internal var _rpt_fileIsValid:Boolean;
    model_internal var _rpt_fileValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _rpt_fileIsValidCacheInitialized:Boolean = false;
    model_internal var _rpt_fileValidationFailureMessages:Array;
    
    model_internal var _rpt_is_closeoutIsValid:Boolean;
    model_internal var _rpt_is_closeoutValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _rpt_is_closeoutIsValidCacheInitialized:Boolean = false;
    model_internal var _rpt_is_closeoutValidationFailureMessages:Array;
    
    model_internal var _rpt_enableIsValid:Boolean;
    model_internal var _rpt_enableValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _rpt_enableIsValidCacheInitialized:Boolean = false;
    model_internal var _rpt_enableValidationFailureMessages:Array;
    
    model_internal var _rpt_descIsValid:Boolean;
    model_internal var _rpt_descValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _rpt_descIsValidCacheInitialized:Boolean = false;
    model_internal var _rpt_descValidationFailureMessages:Array;
    
    model_internal var _rpt_langIsValid:Boolean;
    model_internal var _rpt_langValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _rpt_langIsValidCacheInitialized:Boolean = false;
    model_internal var _rpt_langValidationFailureMessages:Array;
    
    model_internal var _rpt_nameIsValid:Boolean;
    model_internal var _rpt_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _rpt_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _rpt_nameValidationFailureMessages:Array;

    model_internal var _instance:_Super_ReportsLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _ReportsLookupEntityMetadata(value : _Super_ReportsLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["jasp_file"] = new Array();
            model_internal::dependentsOnMap["rpt_cmpy"] = new Array();
            model_internal::dependentsOnMap["rpt_additive"] = new Array();
            model_internal::dependentsOnMap["rpt_active"] = new Array();
            model_internal::dependentsOnMap["rpt_freq"] = new Array();
            model_internal::dependentsOnMap["rpt_file"] = new Array();
            model_internal::dependentsOnMap["rpt_is_closeout"] = new Array();
            model_internal::dependentsOnMap["rpt_enable"] = new Array();
            model_internal::dependentsOnMap["rpt_desc"] = new Array();
            model_internal::dependentsOnMap["rpt_lang"] = new Array();
            model_internal::dependentsOnMap["rpt_name"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["jasp_file"] = "String";
        model_internal::propertyTypeMap["rpt_cmpy"] = "String";
        model_internal::propertyTypeMap["rpt_additive"] = "String";
        model_internal::propertyTypeMap["rpt_active"] = "String";
        model_internal::propertyTypeMap["rpt_freq"] = "String";
        model_internal::propertyTypeMap["rpt_file"] = "String";
        model_internal::propertyTypeMap["rpt_is_closeout"] = "String";
        model_internal::propertyTypeMap["rpt_enable"] = "String";
        model_internal::propertyTypeMap["rpt_desc"] = "String";
        model_internal::propertyTypeMap["rpt_lang"] = "String";
        model_internal::propertyTypeMap["rpt_name"] = "String";

        model_internal::_instance = value;
        model_internal::_jasp_fileValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForJasp_file);
        model_internal::_jasp_fileValidator.required = true;
        model_internal::_jasp_fileValidator.requiredFieldError = "jasp_file is required";
        //model_internal::_jasp_fileValidator.source = model_internal::_instance;
        //model_internal::_jasp_fileValidator.property = "jasp_file";
        model_internal::_rpt_cmpyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRpt_cmpy);
        model_internal::_rpt_cmpyValidator.required = true;
        model_internal::_rpt_cmpyValidator.requiredFieldError = "rpt_cmpy is required";
        //model_internal::_rpt_cmpyValidator.source = model_internal::_instance;
        //model_internal::_rpt_cmpyValidator.property = "rpt_cmpy";
        model_internal::_rpt_additiveValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRpt_additive);
        model_internal::_rpt_additiveValidator.required = true;
        model_internal::_rpt_additiveValidator.requiredFieldError = "rpt_additive is required";
        //model_internal::_rpt_additiveValidator.source = model_internal::_instance;
        //model_internal::_rpt_additiveValidator.property = "rpt_additive";
        model_internal::_rpt_activeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRpt_active);
        model_internal::_rpt_activeValidator.required = true;
        model_internal::_rpt_activeValidator.requiredFieldError = "rpt_active is required";
        //model_internal::_rpt_activeValidator.source = model_internal::_instance;
        //model_internal::_rpt_activeValidator.property = "rpt_active";
        model_internal::_rpt_freqValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRpt_freq);
        model_internal::_rpt_freqValidator.required = true;
        model_internal::_rpt_freqValidator.requiredFieldError = "rpt_freq is required";
        //model_internal::_rpt_freqValidator.source = model_internal::_instance;
        //model_internal::_rpt_freqValidator.property = "rpt_freq";
        model_internal::_rpt_fileValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRpt_file);
        model_internal::_rpt_fileValidator.required = true;
        model_internal::_rpt_fileValidator.requiredFieldError = "rpt_file is required";
        //model_internal::_rpt_fileValidator.source = model_internal::_instance;
        //model_internal::_rpt_fileValidator.property = "rpt_file";
        model_internal::_rpt_is_closeoutValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRpt_is_closeout);
        model_internal::_rpt_is_closeoutValidator.required = true;
        model_internal::_rpt_is_closeoutValidator.requiredFieldError = "rpt_is_closeout is required";
        //model_internal::_rpt_is_closeoutValidator.source = model_internal::_instance;
        //model_internal::_rpt_is_closeoutValidator.property = "rpt_is_closeout";
        model_internal::_rpt_enableValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRpt_enable);
        model_internal::_rpt_enableValidator.required = true;
        model_internal::_rpt_enableValidator.requiredFieldError = "rpt_enable is required";
        //model_internal::_rpt_enableValidator.source = model_internal::_instance;
        //model_internal::_rpt_enableValidator.property = "rpt_enable";
        model_internal::_rpt_descValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRpt_desc);
        model_internal::_rpt_descValidator.required = true;
        model_internal::_rpt_descValidator.requiredFieldError = "rpt_desc is required";
        //model_internal::_rpt_descValidator.source = model_internal::_instance;
        //model_internal::_rpt_descValidator.property = "rpt_desc";
        model_internal::_rpt_langValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRpt_lang);
        model_internal::_rpt_langValidator.required = true;
        model_internal::_rpt_langValidator.requiredFieldError = "rpt_lang is required";
        //model_internal::_rpt_langValidator.source = model_internal::_instance;
        //model_internal::_rpt_langValidator.property = "rpt_lang";
        model_internal::_rpt_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForRpt_name);
        model_internal::_rpt_nameValidator.required = true;
        model_internal::_rpt_nameValidator.requiredFieldError = "rpt_name is required";
        //model_internal::_rpt_nameValidator.source = model_internal::_instance;
        //model_internal::_rpt_nameValidator.property = "rpt_name";
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
            throw new Error(propertyName + " is not a data property of entity ReportsLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity ReportsLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of ReportsLookup");

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
            throw new Error(propertyName + " does not exist for entity ReportsLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity ReportsLookup");
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
            throw new Error(propertyName + " does not exist for entity ReportsLookup");
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
    public function get isJasp_fileAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRpt_cmpyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRpt_additiveAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRpt_activeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRpt_freqAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRpt_fileAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRpt_is_closeoutAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRpt_enableAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRpt_descAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRpt_langAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isRpt_nameAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnJasp_file():void
    {
        if (model_internal::_jasp_fileIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfJasp_file = null;
            model_internal::calculateJasp_fileIsValid();
        }
    }
    public function invalidateDependentOnRpt_cmpy():void
    {
        if (model_internal::_rpt_cmpyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRpt_cmpy = null;
            model_internal::calculateRpt_cmpyIsValid();
        }
    }
    public function invalidateDependentOnRpt_additive():void
    {
        if (model_internal::_rpt_additiveIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRpt_additive = null;
            model_internal::calculateRpt_additiveIsValid();
        }
    }
    public function invalidateDependentOnRpt_active():void
    {
        if (model_internal::_rpt_activeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRpt_active = null;
            model_internal::calculateRpt_activeIsValid();
        }
    }
    public function invalidateDependentOnRpt_freq():void
    {
        if (model_internal::_rpt_freqIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRpt_freq = null;
            model_internal::calculateRpt_freqIsValid();
        }
    }
    public function invalidateDependentOnRpt_file():void
    {
        if (model_internal::_rpt_fileIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRpt_file = null;
            model_internal::calculateRpt_fileIsValid();
        }
    }
    public function invalidateDependentOnRpt_is_closeout():void
    {
        if (model_internal::_rpt_is_closeoutIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRpt_is_closeout = null;
            model_internal::calculateRpt_is_closeoutIsValid();
        }
    }
    public function invalidateDependentOnRpt_enable():void
    {
        if (model_internal::_rpt_enableIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRpt_enable = null;
            model_internal::calculateRpt_enableIsValid();
        }
    }
    public function invalidateDependentOnRpt_desc():void
    {
        if (model_internal::_rpt_descIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRpt_desc = null;
            model_internal::calculateRpt_descIsValid();
        }
    }
    public function invalidateDependentOnRpt_lang():void
    {
        if (model_internal::_rpt_langIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRpt_lang = null;
            model_internal::calculateRpt_langIsValid();
        }
    }
    public function invalidateDependentOnRpt_name():void
    {
        if (model_internal::_rpt_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfRpt_name = null;
            model_internal::calculateRpt_nameIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get jasp_fileStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get jasp_fileValidator() : StyleValidator
    {
        return model_internal::_jasp_fileValidator;
    }

    model_internal function set _jasp_fileIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_jasp_fileIsValid;         
        if (oldValue !== value)
        {
            model_internal::_jasp_fileIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "jasp_fileIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get jasp_fileIsValid():Boolean
    {
        if (!model_internal::_jasp_fileIsValidCacheInitialized)
        {
            model_internal::calculateJasp_fileIsValid();
        }

        return model_internal::_jasp_fileIsValid;
    }

    model_internal function calculateJasp_fileIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_jasp_fileValidator.validate(model_internal::_instance.jasp_file)
        model_internal::_jasp_fileIsValid_der = (valRes.results == null);
        model_internal::_jasp_fileIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::jasp_fileValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::jasp_fileValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get jasp_fileValidationFailureMessages():Array
    {
        if (model_internal::_jasp_fileValidationFailureMessages == null)
            model_internal::calculateJasp_fileIsValid();

        return _jasp_fileValidationFailureMessages;
    }

    model_internal function set jasp_fileValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_jasp_fileValidationFailureMessages;

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
            model_internal::_jasp_fileValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "jasp_fileValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get rpt_cmpyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get rpt_cmpyValidator() : StyleValidator
    {
        return model_internal::_rpt_cmpyValidator;
    }

    model_internal function set _rpt_cmpyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_rpt_cmpyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_rpt_cmpyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_cmpyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get rpt_cmpyIsValid():Boolean
    {
        if (!model_internal::_rpt_cmpyIsValidCacheInitialized)
        {
            model_internal::calculateRpt_cmpyIsValid();
        }

        return model_internal::_rpt_cmpyIsValid;
    }

    model_internal function calculateRpt_cmpyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_rpt_cmpyValidator.validate(model_internal::_instance.rpt_cmpy)
        model_internal::_rpt_cmpyIsValid_der = (valRes.results == null);
        model_internal::_rpt_cmpyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::rpt_cmpyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::rpt_cmpyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get rpt_cmpyValidationFailureMessages():Array
    {
        if (model_internal::_rpt_cmpyValidationFailureMessages == null)
            model_internal::calculateRpt_cmpyIsValid();

        return _rpt_cmpyValidationFailureMessages;
    }

    model_internal function set rpt_cmpyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_rpt_cmpyValidationFailureMessages;

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
            model_internal::_rpt_cmpyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_cmpyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get rpt_additiveStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get rpt_additiveValidator() : StyleValidator
    {
        return model_internal::_rpt_additiveValidator;
    }

    model_internal function set _rpt_additiveIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_rpt_additiveIsValid;         
        if (oldValue !== value)
        {
            model_internal::_rpt_additiveIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_additiveIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get rpt_additiveIsValid():Boolean
    {
        if (!model_internal::_rpt_additiveIsValidCacheInitialized)
        {
            model_internal::calculateRpt_additiveIsValid();
        }

        return model_internal::_rpt_additiveIsValid;
    }

    model_internal function calculateRpt_additiveIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_rpt_additiveValidator.validate(model_internal::_instance.rpt_additive)
        model_internal::_rpt_additiveIsValid_der = (valRes.results == null);
        model_internal::_rpt_additiveIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::rpt_additiveValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::rpt_additiveValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get rpt_additiveValidationFailureMessages():Array
    {
        if (model_internal::_rpt_additiveValidationFailureMessages == null)
            model_internal::calculateRpt_additiveIsValid();

        return _rpt_additiveValidationFailureMessages;
    }

    model_internal function set rpt_additiveValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_rpt_additiveValidationFailureMessages;

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
            model_internal::_rpt_additiveValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_additiveValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get rpt_activeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get rpt_activeValidator() : StyleValidator
    {
        return model_internal::_rpt_activeValidator;
    }

    model_internal function set _rpt_activeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_rpt_activeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_rpt_activeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_activeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get rpt_activeIsValid():Boolean
    {
        if (!model_internal::_rpt_activeIsValidCacheInitialized)
        {
            model_internal::calculateRpt_activeIsValid();
        }

        return model_internal::_rpt_activeIsValid;
    }

    model_internal function calculateRpt_activeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_rpt_activeValidator.validate(model_internal::_instance.rpt_active)
        model_internal::_rpt_activeIsValid_der = (valRes.results == null);
        model_internal::_rpt_activeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::rpt_activeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::rpt_activeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get rpt_activeValidationFailureMessages():Array
    {
        if (model_internal::_rpt_activeValidationFailureMessages == null)
            model_internal::calculateRpt_activeIsValid();

        return _rpt_activeValidationFailureMessages;
    }

    model_internal function set rpt_activeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_rpt_activeValidationFailureMessages;

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
            model_internal::_rpt_activeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_activeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get rpt_freqStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get rpt_freqValidator() : StyleValidator
    {
        return model_internal::_rpt_freqValidator;
    }

    model_internal function set _rpt_freqIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_rpt_freqIsValid;         
        if (oldValue !== value)
        {
            model_internal::_rpt_freqIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_freqIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get rpt_freqIsValid():Boolean
    {
        if (!model_internal::_rpt_freqIsValidCacheInitialized)
        {
            model_internal::calculateRpt_freqIsValid();
        }

        return model_internal::_rpt_freqIsValid;
    }

    model_internal function calculateRpt_freqIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_rpt_freqValidator.validate(model_internal::_instance.rpt_freq)
        model_internal::_rpt_freqIsValid_der = (valRes.results == null);
        model_internal::_rpt_freqIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::rpt_freqValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::rpt_freqValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get rpt_freqValidationFailureMessages():Array
    {
        if (model_internal::_rpt_freqValidationFailureMessages == null)
            model_internal::calculateRpt_freqIsValid();

        return _rpt_freqValidationFailureMessages;
    }

    model_internal function set rpt_freqValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_rpt_freqValidationFailureMessages;

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
            model_internal::_rpt_freqValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_freqValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get rpt_fileStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get rpt_fileValidator() : StyleValidator
    {
        return model_internal::_rpt_fileValidator;
    }

    model_internal function set _rpt_fileIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_rpt_fileIsValid;         
        if (oldValue !== value)
        {
            model_internal::_rpt_fileIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_fileIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get rpt_fileIsValid():Boolean
    {
        if (!model_internal::_rpt_fileIsValidCacheInitialized)
        {
            model_internal::calculateRpt_fileIsValid();
        }

        return model_internal::_rpt_fileIsValid;
    }

    model_internal function calculateRpt_fileIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_rpt_fileValidator.validate(model_internal::_instance.rpt_file)
        model_internal::_rpt_fileIsValid_der = (valRes.results == null);
        model_internal::_rpt_fileIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::rpt_fileValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::rpt_fileValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get rpt_fileValidationFailureMessages():Array
    {
        if (model_internal::_rpt_fileValidationFailureMessages == null)
            model_internal::calculateRpt_fileIsValid();

        return _rpt_fileValidationFailureMessages;
    }

    model_internal function set rpt_fileValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_rpt_fileValidationFailureMessages;

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
            model_internal::_rpt_fileValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_fileValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get rpt_is_closeoutStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get rpt_is_closeoutValidator() : StyleValidator
    {
        return model_internal::_rpt_is_closeoutValidator;
    }

    model_internal function set _rpt_is_closeoutIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_rpt_is_closeoutIsValid;         
        if (oldValue !== value)
        {
            model_internal::_rpt_is_closeoutIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_is_closeoutIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get rpt_is_closeoutIsValid():Boolean
    {
        if (!model_internal::_rpt_is_closeoutIsValidCacheInitialized)
        {
            model_internal::calculateRpt_is_closeoutIsValid();
        }

        return model_internal::_rpt_is_closeoutIsValid;
    }

    model_internal function calculateRpt_is_closeoutIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_rpt_is_closeoutValidator.validate(model_internal::_instance.rpt_is_closeout)
        model_internal::_rpt_is_closeoutIsValid_der = (valRes.results == null);
        model_internal::_rpt_is_closeoutIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::rpt_is_closeoutValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::rpt_is_closeoutValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get rpt_is_closeoutValidationFailureMessages():Array
    {
        if (model_internal::_rpt_is_closeoutValidationFailureMessages == null)
            model_internal::calculateRpt_is_closeoutIsValid();

        return _rpt_is_closeoutValidationFailureMessages;
    }

    model_internal function set rpt_is_closeoutValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_rpt_is_closeoutValidationFailureMessages;

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
            model_internal::_rpt_is_closeoutValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_is_closeoutValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get rpt_enableStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get rpt_enableValidator() : StyleValidator
    {
        return model_internal::_rpt_enableValidator;
    }

    model_internal function set _rpt_enableIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_rpt_enableIsValid;         
        if (oldValue !== value)
        {
            model_internal::_rpt_enableIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_enableIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get rpt_enableIsValid():Boolean
    {
        if (!model_internal::_rpt_enableIsValidCacheInitialized)
        {
            model_internal::calculateRpt_enableIsValid();
        }

        return model_internal::_rpt_enableIsValid;
    }

    model_internal function calculateRpt_enableIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_rpt_enableValidator.validate(model_internal::_instance.rpt_enable)
        model_internal::_rpt_enableIsValid_der = (valRes.results == null);
        model_internal::_rpt_enableIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::rpt_enableValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::rpt_enableValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get rpt_enableValidationFailureMessages():Array
    {
        if (model_internal::_rpt_enableValidationFailureMessages == null)
            model_internal::calculateRpt_enableIsValid();

        return _rpt_enableValidationFailureMessages;
    }

    model_internal function set rpt_enableValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_rpt_enableValidationFailureMessages;

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
            model_internal::_rpt_enableValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_enableValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get rpt_descStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get rpt_descValidator() : StyleValidator
    {
        return model_internal::_rpt_descValidator;
    }

    model_internal function set _rpt_descIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_rpt_descIsValid;         
        if (oldValue !== value)
        {
            model_internal::_rpt_descIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_descIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get rpt_descIsValid():Boolean
    {
        if (!model_internal::_rpt_descIsValidCacheInitialized)
        {
            model_internal::calculateRpt_descIsValid();
        }

        return model_internal::_rpt_descIsValid;
    }

    model_internal function calculateRpt_descIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_rpt_descValidator.validate(model_internal::_instance.rpt_desc)
        model_internal::_rpt_descIsValid_der = (valRes.results == null);
        model_internal::_rpt_descIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::rpt_descValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::rpt_descValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get rpt_descValidationFailureMessages():Array
    {
        if (model_internal::_rpt_descValidationFailureMessages == null)
            model_internal::calculateRpt_descIsValid();

        return _rpt_descValidationFailureMessages;
    }

    model_internal function set rpt_descValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_rpt_descValidationFailureMessages;

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
            model_internal::_rpt_descValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_descValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get rpt_langStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get rpt_langValidator() : StyleValidator
    {
        return model_internal::_rpt_langValidator;
    }

    model_internal function set _rpt_langIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_rpt_langIsValid;         
        if (oldValue !== value)
        {
            model_internal::_rpt_langIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_langIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get rpt_langIsValid():Boolean
    {
        if (!model_internal::_rpt_langIsValidCacheInitialized)
        {
            model_internal::calculateRpt_langIsValid();
        }

        return model_internal::_rpt_langIsValid;
    }

    model_internal function calculateRpt_langIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_rpt_langValidator.validate(model_internal::_instance.rpt_lang)
        model_internal::_rpt_langIsValid_der = (valRes.results == null);
        model_internal::_rpt_langIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::rpt_langValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::rpt_langValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get rpt_langValidationFailureMessages():Array
    {
        if (model_internal::_rpt_langValidationFailureMessages == null)
            model_internal::calculateRpt_langIsValid();

        return _rpt_langValidationFailureMessages;
    }

    model_internal function set rpt_langValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_rpt_langValidationFailureMessages;

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
            model_internal::_rpt_langValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_langValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get rpt_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get rpt_nameValidator() : StyleValidator
    {
        return model_internal::_rpt_nameValidator;
    }

    model_internal function set _rpt_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_rpt_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_rpt_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get rpt_nameIsValid():Boolean
    {
        if (!model_internal::_rpt_nameIsValidCacheInitialized)
        {
            model_internal::calculateRpt_nameIsValid();
        }

        return model_internal::_rpt_nameIsValid;
    }

    model_internal function calculateRpt_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_rpt_nameValidator.validate(model_internal::_instance.rpt_name)
        model_internal::_rpt_nameIsValid_der = (valRes.results == null);
        model_internal::_rpt_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::rpt_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::rpt_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get rpt_nameValidationFailureMessages():Array
    {
        if (model_internal::_rpt_nameValidationFailureMessages == null)
            model_internal::calculateRpt_nameIsValid();

        return _rpt_nameValidationFailureMessages;
    }

    model_internal function set rpt_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_rpt_nameValidationFailureMessages;

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
            model_internal::_rpt_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "rpt_nameValidationFailureMessages", oldValue, value));
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
            case("jasp_file"):
            {
                return jasp_fileValidationFailureMessages;
            }
            case("rpt_cmpy"):
            {
                return rpt_cmpyValidationFailureMessages;
            }
            case("rpt_additive"):
            {
                return rpt_additiveValidationFailureMessages;
            }
            case("rpt_active"):
            {
                return rpt_activeValidationFailureMessages;
            }
            case("rpt_freq"):
            {
                return rpt_freqValidationFailureMessages;
            }
            case("rpt_file"):
            {
                return rpt_fileValidationFailureMessages;
            }
            case("rpt_is_closeout"):
            {
                return rpt_is_closeoutValidationFailureMessages;
            }
            case("rpt_enable"):
            {
                return rpt_enableValidationFailureMessages;
            }
            case("rpt_desc"):
            {
                return rpt_descValidationFailureMessages;
            }
            case("rpt_lang"):
            {
                return rpt_langValidationFailureMessages;
            }
            case("rpt_name"):
            {
                return rpt_nameValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
