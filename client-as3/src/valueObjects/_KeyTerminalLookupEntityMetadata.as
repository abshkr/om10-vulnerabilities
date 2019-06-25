
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
internal class _KeyTerminalLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("term_code", "term_desc", "term_name");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("term_code", "term_desc", "term_name");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("term_code", "term_desc", "term_name");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("term_code", "term_desc", "term_name");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("term_code", "term_desc", "term_name");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "KeyTerminalLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _term_codeIsValid:Boolean;
    model_internal var _term_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _term_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _term_codeValidationFailureMessages:Array;
    
    model_internal var _term_descIsValid:Boolean;
    model_internal var _term_descValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _term_descIsValidCacheInitialized:Boolean = false;
    model_internal var _term_descValidationFailureMessages:Array;
    
    model_internal var _term_nameIsValid:Boolean;
    model_internal var _term_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _term_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _term_nameValidationFailureMessages:Array;

    model_internal var _instance:_Super_KeyTerminalLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _KeyTerminalLookupEntityMetadata(value : _Super_KeyTerminalLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["term_code"] = new Array();
            model_internal::dependentsOnMap["term_desc"] = new Array();
            model_internal::dependentsOnMap["term_name"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["term_code"] = "String";
        model_internal::propertyTypeMap["term_desc"] = "String";
        model_internal::propertyTypeMap["term_name"] = "String";

        model_internal::_instance = value;
        model_internal::_term_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTerm_code);
        model_internal::_term_codeValidator.required = true;
        model_internal::_term_codeValidator.requiredFieldError = "term_code is required";
        //model_internal::_term_codeValidator.source = model_internal::_instance;
        //model_internal::_term_codeValidator.property = "term_code";
        model_internal::_term_descValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTerm_desc);
        model_internal::_term_descValidator.required = true;
        model_internal::_term_descValidator.requiredFieldError = "term_desc is required";
        //model_internal::_term_descValidator.source = model_internal::_instance;
        //model_internal::_term_descValidator.property = "term_desc";
        model_internal::_term_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTerm_name);
        model_internal::_term_nameValidator.required = true;
        model_internal::_term_nameValidator.requiredFieldError = "term_name is required";
        //model_internal::_term_nameValidator.source = model_internal::_instance;
        //model_internal::_term_nameValidator.property = "term_name";
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
            throw new Error(propertyName + " is not a data property of entity KeyTerminalLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity KeyTerminalLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of KeyTerminalLookup");

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
            throw new Error(propertyName + " does not exist for entity KeyTerminalLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity KeyTerminalLookup");
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
            throw new Error(propertyName + " does not exist for entity KeyTerminalLookup");
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
    public function get isTerm_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTerm_descAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTerm_nameAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnTerm_code():void
    {
        if (model_internal::_term_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTerm_code = null;
            model_internal::calculateTerm_codeIsValid();
        }
    }
    public function invalidateDependentOnTerm_desc():void
    {
        if (model_internal::_term_descIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTerm_desc = null;
            model_internal::calculateTerm_descIsValid();
        }
    }
    public function invalidateDependentOnTerm_name():void
    {
        if (model_internal::_term_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTerm_name = null;
            model_internal::calculateTerm_nameIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get term_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get term_codeValidator() : StyleValidator
    {
        return model_internal::_term_codeValidator;
    }

    model_internal function set _term_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_term_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_term_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get term_codeIsValid():Boolean
    {
        if (!model_internal::_term_codeIsValidCacheInitialized)
        {
            model_internal::calculateTerm_codeIsValid();
        }

        return model_internal::_term_codeIsValid;
    }

    model_internal function calculateTerm_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_term_codeValidator.validate(model_internal::_instance.term_code)
        model_internal::_term_codeIsValid_der = (valRes.results == null);
        model_internal::_term_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::term_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::term_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get term_codeValidationFailureMessages():Array
    {
        if (model_internal::_term_codeValidationFailureMessages == null)
            model_internal::calculateTerm_codeIsValid();

        return _term_codeValidationFailureMessages;
    }

    model_internal function set term_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_term_codeValidationFailureMessages;

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
            model_internal::_term_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get term_descStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get term_descValidator() : StyleValidator
    {
        return model_internal::_term_descValidator;
    }

    model_internal function set _term_descIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_term_descIsValid;         
        if (oldValue !== value)
        {
            model_internal::_term_descIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_descIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get term_descIsValid():Boolean
    {
        if (!model_internal::_term_descIsValidCacheInitialized)
        {
            model_internal::calculateTerm_descIsValid();
        }

        return model_internal::_term_descIsValid;
    }

    model_internal function calculateTerm_descIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_term_descValidator.validate(model_internal::_instance.term_desc)
        model_internal::_term_descIsValid_der = (valRes.results == null);
        model_internal::_term_descIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::term_descValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::term_descValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get term_descValidationFailureMessages():Array
    {
        if (model_internal::_term_descValidationFailureMessages == null)
            model_internal::calculateTerm_descIsValid();

        return _term_descValidationFailureMessages;
    }

    model_internal function set term_descValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_term_descValidationFailureMessages;

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
            model_internal::_term_descValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_descValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get term_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get term_nameValidator() : StyleValidator
    {
        return model_internal::_term_nameValidator;
    }

    model_internal function set _term_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_term_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_term_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get term_nameIsValid():Boolean
    {
        if (!model_internal::_term_nameIsValidCacheInitialized)
        {
            model_internal::calculateTerm_nameIsValid();
        }

        return model_internal::_term_nameIsValid;
    }

    model_internal function calculateTerm_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_term_nameValidator.validate(model_internal::_instance.term_name)
        model_internal::_term_nameIsValid_der = (valRes.results == null);
        model_internal::_term_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::term_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::term_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get term_nameValidationFailureMessages():Array
    {
        if (model_internal::_term_nameValidationFailureMessages == null)
            model_internal::calculateTerm_nameIsValid();

        return _term_nameValidationFailureMessages;
    }

    model_internal function set term_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_term_nameValidationFailureMessages;

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
            model_internal::_term_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_nameValidationFailureMessages", oldValue, value));
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
            case("term_code"):
            {
                return term_codeValidationFailureMessages;
            }
            case("term_desc"):
            {
                return term_descValidationFailureMessages;
            }
            case("term_name"):
            {
                return term_nameValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
