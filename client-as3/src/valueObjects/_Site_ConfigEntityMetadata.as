
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
internal class _Site_ConfigEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("config_val_last_chg", "config_comment", "config_value", "config_key", "config_required_by_gui");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("config_val_last_chg", "config_comment", "config_value", "config_key", "config_required_by_gui");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("config_val_last_chg", "config_comment", "config_value", "config_key", "config_required_by_gui");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("config_val_last_chg", "config_comment", "config_value", "config_key", "config_required_by_gui");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("config_val_last_chg", "config_comment", "config_value", "config_key", "config_required_by_gui");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "Site_Config";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _config_val_last_chgIsValid:Boolean;
    model_internal var _config_val_last_chgValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _config_val_last_chgIsValidCacheInitialized:Boolean = false;
    model_internal var _config_val_last_chgValidationFailureMessages:Array;
    
    model_internal var _config_commentIsValid:Boolean;
    model_internal var _config_commentValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _config_commentIsValidCacheInitialized:Boolean = false;
    model_internal var _config_commentValidationFailureMessages:Array;
    
    model_internal var _config_valueIsValid:Boolean;
    model_internal var _config_valueValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _config_valueIsValidCacheInitialized:Boolean = false;
    model_internal var _config_valueValidationFailureMessages:Array;
    
    model_internal var _config_keyIsValid:Boolean;
    model_internal var _config_keyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _config_keyIsValidCacheInitialized:Boolean = false;
    model_internal var _config_keyValidationFailureMessages:Array;
    
    model_internal var _config_required_by_guiIsValid:Boolean;
    model_internal var _config_required_by_guiValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _config_required_by_guiIsValidCacheInitialized:Boolean = false;
    model_internal var _config_required_by_guiValidationFailureMessages:Array;

    model_internal var _instance:_Super_Site_Config;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _Site_ConfigEntityMetadata(value : _Super_Site_Config)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["config_val_last_chg"] = new Array();
            model_internal::dependentsOnMap["config_comment"] = new Array();
            model_internal::dependentsOnMap["config_value"] = new Array();
            model_internal::dependentsOnMap["config_key"] = new Array();
            model_internal::dependentsOnMap["config_required_by_gui"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["config_val_last_chg"] = "String";
        model_internal::propertyTypeMap["config_comment"] = "String";
        model_internal::propertyTypeMap["config_value"] = "String";
        model_internal::propertyTypeMap["config_key"] = "String";
        model_internal::propertyTypeMap["config_required_by_gui"] = "String";

        model_internal::_instance = value;
        model_internal::_config_val_last_chgValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForConfig_val_last_chg);
        model_internal::_config_val_last_chgValidator.required = true;
        model_internal::_config_val_last_chgValidator.requiredFieldError = "config_val_last_chg is required";
        //model_internal::_config_val_last_chgValidator.source = model_internal::_instance;
        //model_internal::_config_val_last_chgValidator.property = "config_val_last_chg";
        model_internal::_config_commentValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForConfig_comment);
        model_internal::_config_commentValidator.required = true;
        model_internal::_config_commentValidator.requiredFieldError = "config_comment is required";
        //model_internal::_config_commentValidator.source = model_internal::_instance;
        //model_internal::_config_commentValidator.property = "config_comment";
        model_internal::_config_valueValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForConfig_value);
        model_internal::_config_valueValidator.required = true;
        model_internal::_config_valueValidator.requiredFieldError = "config_value is required";
        //model_internal::_config_valueValidator.source = model_internal::_instance;
        //model_internal::_config_valueValidator.property = "config_value";
        model_internal::_config_keyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForConfig_key);
        model_internal::_config_keyValidator.required = true;
        model_internal::_config_keyValidator.requiredFieldError = "config_key is required";
        //model_internal::_config_keyValidator.source = model_internal::_instance;
        //model_internal::_config_keyValidator.property = "config_key";
        model_internal::_config_required_by_guiValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForConfig_required_by_gui);
        model_internal::_config_required_by_guiValidator.required = true;
        model_internal::_config_required_by_guiValidator.requiredFieldError = "config_required_by_gui is required";
        //model_internal::_config_required_by_guiValidator.source = model_internal::_instance;
        //model_internal::_config_required_by_guiValidator.property = "config_required_by_gui";
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
            throw new Error(propertyName + " is not a data property of entity Site_Config");
            
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
            throw new Error(propertyName + " is not a collection property of entity Site_Config");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of Site_Config");

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
            throw new Error(propertyName + " does not exist for entity Site_Config");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity Site_Config");
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
            throw new Error(propertyName + " does not exist for entity Site_Config");
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
    public function get isConfig_val_last_chgAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isConfig_commentAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isConfig_valueAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isConfig_keyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isConfig_required_by_guiAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnConfig_val_last_chg():void
    {
        if (model_internal::_config_val_last_chgIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfConfig_val_last_chg = null;
            model_internal::calculateConfig_val_last_chgIsValid();
        }
    }
    public function invalidateDependentOnConfig_comment():void
    {
        if (model_internal::_config_commentIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfConfig_comment = null;
            model_internal::calculateConfig_commentIsValid();
        }
    }
    public function invalidateDependentOnConfig_value():void
    {
        if (model_internal::_config_valueIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfConfig_value = null;
            model_internal::calculateConfig_valueIsValid();
        }
    }
    public function invalidateDependentOnConfig_key():void
    {
        if (model_internal::_config_keyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfConfig_key = null;
            model_internal::calculateConfig_keyIsValid();
        }
    }
    public function invalidateDependentOnConfig_required_by_gui():void
    {
        if (model_internal::_config_required_by_guiIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfConfig_required_by_gui = null;
            model_internal::calculateConfig_required_by_guiIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get config_val_last_chgStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get config_val_last_chgValidator() : StyleValidator
    {
        return model_internal::_config_val_last_chgValidator;
    }

    model_internal function set _config_val_last_chgIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_config_val_last_chgIsValid;         
        if (oldValue !== value)
        {
            model_internal::_config_val_last_chgIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "config_val_last_chgIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get config_val_last_chgIsValid():Boolean
    {
        if (!model_internal::_config_val_last_chgIsValidCacheInitialized)
        {
            model_internal::calculateConfig_val_last_chgIsValid();
        }

        return model_internal::_config_val_last_chgIsValid;
    }

    model_internal function calculateConfig_val_last_chgIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_config_val_last_chgValidator.validate(model_internal::_instance.config_val_last_chg)
        model_internal::_config_val_last_chgIsValid_der = (valRes.results == null);
        model_internal::_config_val_last_chgIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::config_val_last_chgValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::config_val_last_chgValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get config_val_last_chgValidationFailureMessages():Array
    {
        if (model_internal::_config_val_last_chgValidationFailureMessages == null)
            model_internal::calculateConfig_val_last_chgIsValid();

        return _config_val_last_chgValidationFailureMessages;
    }

    model_internal function set config_val_last_chgValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_config_val_last_chgValidationFailureMessages;

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
            model_internal::_config_val_last_chgValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "config_val_last_chgValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get config_commentStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get config_commentValidator() : StyleValidator
    {
        return model_internal::_config_commentValidator;
    }

    model_internal function set _config_commentIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_config_commentIsValid;         
        if (oldValue !== value)
        {
            model_internal::_config_commentIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "config_commentIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get config_commentIsValid():Boolean
    {
        if (!model_internal::_config_commentIsValidCacheInitialized)
        {
            model_internal::calculateConfig_commentIsValid();
        }

        return model_internal::_config_commentIsValid;
    }

    model_internal function calculateConfig_commentIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_config_commentValidator.validate(model_internal::_instance.config_comment)
        model_internal::_config_commentIsValid_der = (valRes.results == null);
        model_internal::_config_commentIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::config_commentValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::config_commentValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get config_commentValidationFailureMessages():Array
    {
        if (model_internal::_config_commentValidationFailureMessages == null)
            model_internal::calculateConfig_commentIsValid();

        return _config_commentValidationFailureMessages;
    }

    model_internal function set config_commentValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_config_commentValidationFailureMessages;

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
            model_internal::_config_commentValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "config_commentValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get config_valueStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get config_valueValidator() : StyleValidator
    {
        return model_internal::_config_valueValidator;
    }

    model_internal function set _config_valueIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_config_valueIsValid;         
        if (oldValue !== value)
        {
            model_internal::_config_valueIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "config_valueIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get config_valueIsValid():Boolean
    {
        if (!model_internal::_config_valueIsValidCacheInitialized)
        {
            model_internal::calculateConfig_valueIsValid();
        }

        return model_internal::_config_valueIsValid;
    }

    model_internal function calculateConfig_valueIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_config_valueValidator.validate(model_internal::_instance.config_value)
        model_internal::_config_valueIsValid_der = (valRes.results == null);
        model_internal::_config_valueIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::config_valueValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::config_valueValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get config_valueValidationFailureMessages():Array
    {
        if (model_internal::_config_valueValidationFailureMessages == null)
            model_internal::calculateConfig_valueIsValid();

        return _config_valueValidationFailureMessages;
    }

    model_internal function set config_valueValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_config_valueValidationFailureMessages;

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
            model_internal::_config_valueValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "config_valueValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get config_keyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get config_keyValidator() : StyleValidator
    {
        return model_internal::_config_keyValidator;
    }

    model_internal function set _config_keyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_config_keyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_config_keyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "config_keyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get config_keyIsValid():Boolean
    {
        if (!model_internal::_config_keyIsValidCacheInitialized)
        {
            model_internal::calculateConfig_keyIsValid();
        }

        return model_internal::_config_keyIsValid;
    }

    model_internal function calculateConfig_keyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_config_keyValidator.validate(model_internal::_instance.config_key)
        model_internal::_config_keyIsValid_der = (valRes.results == null);
        model_internal::_config_keyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::config_keyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::config_keyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get config_keyValidationFailureMessages():Array
    {
        if (model_internal::_config_keyValidationFailureMessages == null)
            model_internal::calculateConfig_keyIsValid();

        return _config_keyValidationFailureMessages;
    }

    model_internal function set config_keyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_config_keyValidationFailureMessages;

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
            model_internal::_config_keyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "config_keyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get config_required_by_guiStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get config_required_by_guiValidator() : StyleValidator
    {
        return model_internal::_config_required_by_guiValidator;
    }

    model_internal function set _config_required_by_guiIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_config_required_by_guiIsValid;         
        if (oldValue !== value)
        {
            model_internal::_config_required_by_guiIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "config_required_by_guiIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get config_required_by_guiIsValid():Boolean
    {
        if (!model_internal::_config_required_by_guiIsValidCacheInitialized)
        {
            model_internal::calculateConfig_required_by_guiIsValid();
        }

        return model_internal::_config_required_by_guiIsValid;
    }

    model_internal function calculateConfig_required_by_guiIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_config_required_by_guiValidator.validate(model_internal::_instance.config_required_by_gui)
        model_internal::_config_required_by_guiIsValid_der = (valRes.results == null);
        model_internal::_config_required_by_guiIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::config_required_by_guiValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::config_required_by_guiValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get config_required_by_guiValidationFailureMessages():Array
    {
        if (model_internal::_config_required_by_guiValidationFailureMessages == null)
            model_internal::calculateConfig_required_by_guiIsValid();

        return _config_required_by_guiValidationFailureMessages;
    }

    model_internal function set config_required_by_guiValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_config_required_by_guiValidationFailureMessages;

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
            model_internal::_config_required_by_guiValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "config_required_by_guiValidationFailureMessages", oldValue, value));
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
            case("config_val_last_chg"):
            {
                return config_val_last_chgValidationFailureMessages;
            }
            case("config_comment"):
            {
                return config_commentValidationFailureMessages;
            }
            case("config_value"):
            {
                return config_valueValidationFailureMessages;
            }
            case("config_key"):
            {
                return config_keyValidationFailureMessages;
            }
            case("config_required_by_gui"):
            {
                return config_required_by_guiValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
