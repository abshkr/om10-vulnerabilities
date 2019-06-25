
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
internal class _TerminalEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("term_remsite", "term_contact", "term_comms_avail", "term_addr", "term_phoneno", "term_code", "term_name");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("term_remsite", "term_contact", "term_comms_avail", "term_addr", "term_phoneno", "term_code", "term_name");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("term_remsite", "term_contact", "term_comms_avail", "term_addr", "term_phoneno", "term_code", "term_name");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("term_remsite", "term_contact", "term_comms_avail", "term_addr", "term_phoneno", "term_code", "term_name");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("term_remsite", "term_contact", "term_comms_avail", "term_addr", "term_phoneno", "term_code", "term_name");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "Terminal";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _term_remsiteIsValid:Boolean;
    model_internal var _term_remsiteValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _term_remsiteIsValidCacheInitialized:Boolean = false;
    model_internal var _term_remsiteValidationFailureMessages:Array;
    
    model_internal var _term_contactIsValid:Boolean;
    model_internal var _term_contactValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _term_contactIsValidCacheInitialized:Boolean = false;
    model_internal var _term_contactValidationFailureMessages:Array;
    
    model_internal var _term_comms_availIsValid:Boolean;
    model_internal var _term_comms_availValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _term_comms_availIsValidCacheInitialized:Boolean = false;
    model_internal var _term_comms_availValidationFailureMessages:Array;
    
    model_internal var _term_addrIsValid:Boolean;
    model_internal var _term_addrValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _term_addrIsValidCacheInitialized:Boolean = false;
    model_internal var _term_addrValidationFailureMessages:Array;
    
    model_internal var _term_phonenoIsValid:Boolean;
    model_internal var _term_phonenoValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _term_phonenoIsValidCacheInitialized:Boolean = false;
    model_internal var _term_phonenoValidationFailureMessages:Array;
    
    model_internal var _term_codeIsValid:Boolean;
    model_internal var _term_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _term_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _term_codeValidationFailureMessages:Array;
    
    model_internal var _term_nameIsValid:Boolean;
    model_internal var _term_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _term_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _term_nameValidationFailureMessages:Array;

    model_internal var _instance:_Super_Terminal;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _TerminalEntityMetadata(value : _Super_Terminal)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["term_remsite"] = new Array();
            model_internal::dependentsOnMap["term_contact"] = new Array();
            model_internal::dependentsOnMap["term_comms_avail"] = new Array();
            model_internal::dependentsOnMap["term_addr"] = new Array();
            model_internal::dependentsOnMap["term_phoneno"] = new Array();
            model_internal::dependentsOnMap["term_code"] = new Array();
            model_internal::dependentsOnMap["term_name"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["term_remsite"] = "Object";
        model_internal::propertyTypeMap["term_contact"] = "Object";
        model_internal::propertyTypeMap["term_comms_avail"] = "Object";
        model_internal::propertyTypeMap["term_addr"] = "String";
        model_internal::propertyTypeMap["term_phoneno"] = "Object";
        model_internal::propertyTypeMap["term_code"] = "String";
        model_internal::propertyTypeMap["term_name"] = "String";

        model_internal::_instance = value;
        model_internal::_term_remsiteValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTerm_remsite);
        model_internal::_term_remsiteValidator.required = true;
        model_internal::_term_remsiteValidator.requiredFieldError = "term_remsite is required";
        //model_internal::_term_remsiteValidator.source = model_internal::_instance;
        //model_internal::_term_remsiteValidator.property = "term_remsite";
        model_internal::_term_contactValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTerm_contact);
        model_internal::_term_contactValidator.required = true;
        model_internal::_term_contactValidator.requiredFieldError = "term_contact is required";
        //model_internal::_term_contactValidator.source = model_internal::_instance;
        //model_internal::_term_contactValidator.property = "term_contact";
        model_internal::_term_comms_availValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTerm_comms_avail);
        model_internal::_term_comms_availValidator.required = true;
        model_internal::_term_comms_availValidator.requiredFieldError = "term_comms_avail is required";
        //model_internal::_term_comms_availValidator.source = model_internal::_instance;
        //model_internal::_term_comms_availValidator.property = "term_comms_avail";
        model_internal::_term_addrValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTerm_addr);
        model_internal::_term_addrValidator.required = true;
        model_internal::_term_addrValidator.requiredFieldError = "term_addr is required";
        //model_internal::_term_addrValidator.source = model_internal::_instance;
        //model_internal::_term_addrValidator.property = "term_addr";
        model_internal::_term_phonenoValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTerm_phoneno);
        model_internal::_term_phonenoValidator.required = true;
        model_internal::_term_phonenoValidator.requiredFieldError = "term_phoneno is required";
        //model_internal::_term_phonenoValidator.source = model_internal::_instance;
        //model_internal::_term_phonenoValidator.property = "term_phoneno";
        model_internal::_term_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTerm_code);
        model_internal::_term_codeValidator.required = true;
        model_internal::_term_codeValidator.requiredFieldError = "term_code is required";
        //model_internal::_term_codeValidator.source = model_internal::_instance;
        //model_internal::_term_codeValidator.property = "term_code";
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
            throw new Error(propertyName + " is not a data property of entity Terminal");
            
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
            throw new Error(propertyName + " is not a collection property of entity Terminal");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of Terminal");

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
            throw new Error(propertyName + " does not exist for entity Terminal");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity Terminal");
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
            throw new Error(propertyName + " does not exist for entity Terminal");
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
    public function get isTerm_remsiteAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTerm_contactAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTerm_comms_availAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTerm_addrAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTerm_phonenoAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTerm_codeAvailable():Boolean
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
    public function invalidateDependentOnTerm_remsite():void
    {
        if (model_internal::_term_remsiteIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTerm_remsite = null;
            model_internal::calculateTerm_remsiteIsValid();
        }
    }
    public function invalidateDependentOnTerm_contact():void
    {
        if (model_internal::_term_contactIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTerm_contact = null;
            model_internal::calculateTerm_contactIsValid();
        }
    }
    public function invalidateDependentOnTerm_comms_avail():void
    {
        if (model_internal::_term_comms_availIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTerm_comms_avail = null;
            model_internal::calculateTerm_comms_availIsValid();
        }
    }
    public function invalidateDependentOnTerm_addr():void
    {
        if (model_internal::_term_addrIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTerm_addr = null;
            model_internal::calculateTerm_addrIsValid();
        }
    }
    public function invalidateDependentOnTerm_phoneno():void
    {
        if (model_internal::_term_phonenoIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTerm_phoneno = null;
            model_internal::calculateTerm_phonenoIsValid();
        }
    }
    public function invalidateDependentOnTerm_code():void
    {
        if (model_internal::_term_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTerm_code = null;
            model_internal::calculateTerm_codeIsValid();
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
    public function get term_remsiteStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get term_remsiteValidator() : StyleValidator
    {
        return model_internal::_term_remsiteValidator;
    }

    model_internal function set _term_remsiteIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_term_remsiteIsValid;         
        if (oldValue !== value)
        {
            model_internal::_term_remsiteIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_remsiteIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get term_remsiteIsValid():Boolean
    {
        if (!model_internal::_term_remsiteIsValidCacheInitialized)
        {
            model_internal::calculateTerm_remsiteIsValid();
        }

        return model_internal::_term_remsiteIsValid;
    }

    model_internal function calculateTerm_remsiteIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_term_remsiteValidator.validate(model_internal::_instance.term_remsite)
        model_internal::_term_remsiteIsValid_der = (valRes.results == null);
        model_internal::_term_remsiteIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::term_remsiteValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::term_remsiteValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get term_remsiteValidationFailureMessages():Array
    {
        if (model_internal::_term_remsiteValidationFailureMessages == null)
            model_internal::calculateTerm_remsiteIsValid();

        return _term_remsiteValidationFailureMessages;
    }

    model_internal function set term_remsiteValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_term_remsiteValidationFailureMessages;

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
            model_internal::_term_remsiteValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_remsiteValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get term_contactStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get term_contactValidator() : StyleValidator
    {
        return model_internal::_term_contactValidator;
    }

    model_internal function set _term_contactIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_term_contactIsValid;         
        if (oldValue !== value)
        {
            model_internal::_term_contactIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_contactIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get term_contactIsValid():Boolean
    {
        if (!model_internal::_term_contactIsValidCacheInitialized)
        {
            model_internal::calculateTerm_contactIsValid();
        }

        return model_internal::_term_contactIsValid;
    }

    model_internal function calculateTerm_contactIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_term_contactValidator.validate(model_internal::_instance.term_contact)
        model_internal::_term_contactIsValid_der = (valRes.results == null);
        model_internal::_term_contactIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::term_contactValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::term_contactValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get term_contactValidationFailureMessages():Array
    {
        if (model_internal::_term_contactValidationFailureMessages == null)
            model_internal::calculateTerm_contactIsValid();

        return _term_contactValidationFailureMessages;
    }

    model_internal function set term_contactValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_term_contactValidationFailureMessages;

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
            model_internal::_term_contactValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_contactValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get term_comms_availStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get term_comms_availValidator() : StyleValidator
    {
        return model_internal::_term_comms_availValidator;
    }

    model_internal function set _term_comms_availIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_term_comms_availIsValid;         
        if (oldValue !== value)
        {
            model_internal::_term_comms_availIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_comms_availIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get term_comms_availIsValid():Boolean
    {
        if (!model_internal::_term_comms_availIsValidCacheInitialized)
        {
            model_internal::calculateTerm_comms_availIsValid();
        }

        return model_internal::_term_comms_availIsValid;
    }

    model_internal function calculateTerm_comms_availIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_term_comms_availValidator.validate(model_internal::_instance.term_comms_avail)
        model_internal::_term_comms_availIsValid_der = (valRes.results == null);
        model_internal::_term_comms_availIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::term_comms_availValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::term_comms_availValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get term_comms_availValidationFailureMessages():Array
    {
        if (model_internal::_term_comms_availValidationFailureMessages == null)
            model_internal::calculateTerm_comms_availIsValid();

        return _term_comms_availValidationFailureMessages;
    }

    model_internal function set term_comms_availValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_term_comms_availValidationFailureMessages;

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
            model_internal::_term_comms_availValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_comms_availValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get term_addrStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get term_addrValidator() : StyleValidator
    {
        return model_internal::_term_addrValidator;
    }

    model_internal function set _term_addrIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_term_addrIsValid;         
        if (oldValue !== value)
        {
            model_internal::_term_addrIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_addrIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get term_addrIsValid():Boolean
    {
        if (!model_internal::_term_addrIsValidCacheInitialized)
        {
            model_internal::calculateTerm_addrIsValid();
        }

        return model_internal::_term_addrIsValid;
    }

    model_internal function calculateTerm_addrIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_term_addrValidator.validate(model_internal::_instance.term_addr)
        model_internal::_term_addrIsValid_der = (valRes.results == null);
        model_internal::_term_addrIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::term_addrValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::term_addrValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get term_addrValidationFailureMessages():Array
    {
        if (model_internal::_term_addrValidationFailureMessages == null)
            model_internal::calculateTerm_addrIsValid();

        return _term_addrValidationFailureMessages;
    }

    model_internal function set term_addrValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_term_addrValidationFailureMessages;

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
            model_internal::_term_addrValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_addrValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get term_phonenoStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get term_phonenoValidator() : StyleValidator
    {
        return model_internal::_term_phonenoValidator;
    }

    model_internal function set _term_phonenoIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_term_phonenoIsValid;         
        if (oldValue !== value)
        {
            model_internal::_term_phonenoIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_phonenoIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get term_phonenoIsValid():Boolean
    {
        if (!model_internal::_term_phonenoIsValidCacheInitialized)
        {
            model_internal::calculateTerm_phonenoIsValid();
        }

        return model_internal::_term_phonenoIsValid;
    }

    model_internal function calculateTerm_phonenoIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_term_phonenoValidator.validate(model_internal::_instance.term_phoneno)
        model_internal::_term_phonenoIsValid_der = (valRes.results == null);
        model_internal::_term_phonenoIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::term_phonenoValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::term_phonenoValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get term_phonenoValidationFailureMessages():Array
    {
        if (model_internal::_term_phonenoValidationFailureMessages == null)
            model_internal::calculateTerm_phonenoIsValid();

        return _term_phonenoValidationFailureMessages;
    }

    model_internal function set term_phonenoValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_term_phonenoValidationFailureMessages;

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
            model_internal::_term_phonenoValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "term_phonenoValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
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
            case("term_remsite"):
            {
                return term_remsiteValidationFailureMessages;
            }
            case("term_contact"):
            {
                return term_contactValidationFailureMessages;
            }
            case("term_comms_avail"):
            {
                return term_comms_availValidationFailureMessages;
            }
            case("term_addr"):
            {
                return term_addrValidationFailureMessages;
            }
            case("term_phoneno"):
            {
                return term_phonenoValidationFailureMessages;
            }
            case("term_code"):
            {
                return term_codeValidationFailureMessages;
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
