
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
internal class _PrintersLookupEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("cmpy", "cmpy_ld_rep_vp", "cmpy_drv_inst_vp", "cmpy_bol_vp_name", "prntr");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("cmpy", "cmpy_ld_rep_vp", "cmpy_drv_inst_vp", "cmpy_bol_vp_name", "prntr");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("cmpy", "cmpy_ld_rep_vp", "cmpy_drv_inst_vp", "cmpy_bol_vp_name", "prntr");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("cmpy", "cmpy_ld_rep_vp", "cmpy_drv_inst_vp", "cmpy_bol_vp_name", "prntr");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("cmpy", "cmpy_ld_rep_vp", "cmpy_drv_inst_vp", "cmpy_bol_vp_name", "prntr");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "PrintersLookup";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _cmpyIsValid:Boolean;
    model_internal var _cmpyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpyIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpyValidationFailureMessages:Array;
    
    model_internal var _cmpy_ld_rep_vpIsValid:Boolean;
    model_internal var _cmpy_ld_rep_vpValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_ld_rep_vpIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_ld_rep_vpValidationFailureMessages:Array;
    
    model_internal var _cmpy_drv_inst_vpIsValid:Boolean;
    model_internal var _cmpy_drv_inst_vpValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_drv_inst_vpIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_drv_inst_vpValidationFailureMessages:Array;
    
    model_internal var _cmpy_bol_vp_nameIsValid:Boolean;
    model_internal var _cmpy_bol_vp_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpy_bol_vp_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpy_bol_vp_nameValidationFailureMessages:Array;
    
    model_internal var _prntrIsValid:Boolean;
    model_internal var _prntrValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prntrIsValidCacheInitialized:Boolean = false;
    model_internal var _prntrValidationFailureMessages:Array;

    model_internal var _instance:_Super_PrintersLookup;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _PrintersLookupEntityMetadata(value : _Super_PrintersLookup)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["cmpy"] = new Array();
            model_internal::dependentsOnMap["cmpy_ld_rep_vp"] = new Array();
            model_internal::dependentsOnMap["cmpy_drv_inst_vp"] = new Array();
            model_internal::dependentsOnMap["cmpy_bol_vp_name"] = new Array();
            model_internal::dependentsOnMap["prntr"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["cmpy"] = "String";
        model_internal::propertyTypeMap["cmpy_ld_rep_vp"] = "String";
        model_internal::propertyTypeMap["cmpy_drv_inst_vp"] = "Object";
        model_internal::propertyTypeMap["cmpy_bol_vp_name"] = "Object";
        model_internal::propertyTypeMap["prntr"] = "String";

        model_internal::_instance = value;
        model_internal::_cmpyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy);
        model_internal::_cmpyValidator.required = true;
        model_internal::_cmpyValidator.requiredFieldError = "cmpy is required";
        //model_internal::_cmpyValidator.source = model_internal::_instance;
        //model_internal::_cmpyValidator.property = "cmpy";
        model_internal::_cmpy_ld_rep_vpValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_ld_rep_vp);
        model_internal::_cmpy_ld_rep_vpValidator.required = true;
        model_internal::_cmpy_ld_rep_vpValidator.requiredFieldError = "cmpy_ld_rep_vp is required";
        //model_internal::_cmpy_ld_rep_vpValidator.source = model_internal::_instance;
        //model_internal::_cmpy_ld_rep_vpValidator.property = "cmpy_ld_rep_vp";
        model_internal::_cmpy_drv_inst_vpValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_drv_inst_vp);
        model_internal::_cmpy_drv_inst_vpValidator.required = true;
        model_internal::_cmpy_drv_inst_vpValidator.requiredFieldError = "cmpy_drv_inst_vp is required";
        //model_internal::_cmpy_drv_inst_vpValidator.source = model_internal::_instance;
        //model_internal::_cmpy_drv_inst_vpValidator.property = "cmpy_drv_inst_vp";
        model_internal::_cmpy_bol_vp_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpy_bol_vp_name);
        model_internal::_cmpy_bol_vp_nameValidator.required = true;
        model_internal::_cmpy_bol_vp_nameValidator.requiredFieldError = "cmpy_bol_vp_name is required";
        //model_internal::_cmpy_bol_vp_nameValidator.source = model_internal::_instance;
        //model_internal::_cmpy_bol_vp_nameValidator.property = "cmpy_bol_vp_name";
        model_internal::_prntrValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPrntr);
        model_internal::_prntrValidator.required = true;
        model_internal::_prntrValidator.requiredFieldError = "prntr is required";
        //model_internal::_prntrValidator.source = model_internal::_instance;
        //model_internal::_prntrValidator.property = "prntr";
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
            throw new Error(propertyName + " is not a data property of entity PrintersLookup");
            
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
            throw new Error(propertyName + " is not a collection property of entity PrintersLookup");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of PrintersLookup");

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
            throw new Error(propertyName + " does not exist for entity PrintersLookup");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity PrintersLookup");
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
            throw new Error(propertyName + " does not exist for entity PrintersLookup");
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
    public function get isCmpyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_ld_rep_vpAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_drv_inst_vpAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpy_bol_vp_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPrntrAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnCmpy():void
    {
        if (model_internal::_cmpyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy = null;
            model_internal::calculateCmpyIsValid();
        }
    }
    public function invalidateDependentOnCmpy_ld_rep_vp():void
    {
        if (model_internal::_cmpy_ld_rep_vpIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_ld_rep_vp = null;
            model_internal::calculateCmpy_ld_rep_vpIsValid();
        }
    }
    public function invalidateDependentOnCmpy_drv_inst_vp():void
    {
        if (model_internal::_cmpy_drv_inst_vpIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_drv_inst_vp = null;
            model_internal::calculateCmpy_drv_inst_vpIsValid();
        }
    }
    public function invalidateDependentOnCmpy_bol_vp_name():void
    {
        if (model_internal::_cmpy_bol_vp_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpy_bol_vp_name = null;
            model_internal::calculateCmpy_bol_vp_nameIsValid();
        }
    }
    public function invalidateDependentOnPrntr():void
    {
        if (model_internal::_prntrIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPrntr = null;
            model_internal::calculatePrntrIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get cmpyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpyValidator() : StyleValidator
    {
        return model_internal::_cmpyValidator;
    }

    model_internal function set _cmpyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpyIsValid():Boolean
    {
        if (!model_internal::_cmpyIsValidCacheInitialized)
        {
            model_internal::calculateCmpyIsValid();
        }

        return model_internal::_cmpyIsValid;
    }

    model_internal function calculateCmpyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpyValidator.validate(model_internal::_instance.cmpy)
        model_internal::_cmpyIsValid_der = (valRes.results == null);
        model_internal::_cmpyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpyValidationFailureMessages():Array
    {
        if (model_internal::_cmpyValidationFailureMessages == null)
            model_internal::calculateCmpyIsValid();

        return _cmpyValidationFailureMessages;
    }

    model_internal function set cmpyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpyValidationFailureMessages;

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
            model_internal::_cmpyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_ld_rep_vpStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_ld_rep_vpValidator() : StyleValidator
    {
        return model_internal::_cmpy_ld_rep_vpValidator;
    }

    model_internal function set _cmpy_ld_rep_vpIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_ld_rep_vpIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_ld_rep_vpIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ld_rep_vpIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ld_rep_vpIsValid():Boolean
    {
        if (!model_internal::_cmpy_ld_rep_vpIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_ld_rep_vpIsValid();
        }

        return model_internal::_cmpy_ld_rep_vpIsValid;
    }

    model_internal function calculateCmpy_ld_rep_vpIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_ld_rep_vpValidator.validate(model_internal::_instance.cmpy_ld_rep_vp)
        model_internal::_cmpy_ld_rep_vpIsValid_der = (valRes.results == null);
        model_internal::_cmpy_ld_rep_vpIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_ld_rep_vpValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_ld_rep_vpValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_ld_rep_vpValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_ld_rep_vpValidationFailureMessages == null)
            model_internal::calculateCmpy_ld_rep_vpIsValid();

        return _cmpy_ld_rep_vpValidationFailureMessages;
    }

    model_internal function set cmpy_ld_rep_vpValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_ld_rep_vpValidationFailureMessages;

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
            model_internal::_cmpy_ld_rep_vpValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_ld_rep_vpValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_drv_inst_vpStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_drv_inst_vpValidator() : StyleValidator
    {
        return model_internal::_cmpy_drv_inst_vpValidator;
    }

    model_internal function set _cmpy_drv_inst_vpIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_drv_inst_vpIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_drv_inst_vpIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_drv_inst_vpIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_drv_inst_vpIsValid():Boolean
    {
        if (!model_internal::_cmpy_drv_inst_vpIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_drv_inst_vpIsValid();
        }

        return model_internal::_cmpy_drv_inst_vpIsValid;
    }

    model_internal function calculateCmpy_drv_inst_vpIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_drv_inst_vpValidator.validate(model_internal::_instance.cmpy_drv_inst_vp)
        model_internal::_cmpy_drv_inst_vpIsValid_der = (valRes.results == null);
        model_internal::_cmpy_drv_inst_vpIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_drv_inst_vpValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_drv_inst_vpValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_drv_inst_vpValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_drv_inst_vpValidationFailureMessages == null)
            model_internal::calculateCmpy_drv_inst_vpIsValid();

        return _cmpy_drv_inst_vpValidationFailureMessages;
    }

    model_internal function set cmpy_drv_inst_vpValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_drv_inst_vpValidationFailureMessages;

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
            model_internal::_cmpy_drv_inst_vpValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_drv_inst_vpValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpy_bol_vp_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpy_bol_vp_nameValidator() : StyleValidator
    {
        return model_internal::_cmpy_bol_vp_nameValidator;
    }

    model_internal function set _cmpy_bol_vp_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpy_bol_vp_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpy_bol_vp_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_bol_vp_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_bol_vp_nameIsValid():Boolean
    {
        if (!model_internal::_cmpy_bol_vp_nameIsValidCacheInitialized)
        {
            model_internal::calculateCmpy_bol_vp_nameIsValid();
        }

        return model_internal::_cmpy_bol_vp_nameIsValid;
    }

    model_internal function calculateCmpy_bol_vp_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpy_bol_vp_nameValidator.validate(model_internal::_instance.cmpy_bol_vp_name)
        model_internal::_cmpy_bol_vp_nameIsValid_der = (valRes.results == null);
        model_internal::_cmpy_bol_vp_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpy_bol_vp_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpy_bol_vp_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpy_bol_vp_nameValidationFailureMessages():Array
    {
        if (model_internal::_cmpy_bol_vp_nameValidationFailureMessages == null)
            model_internal::calculateCmpy_bol_vp_nameIsValid();

        return _cmpy_bol_vp_nameValidationFailureMessages;
    }

    model_internal function set cmpy_bol_vp_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpy_bol_vp_nameValidationFailureMessages;

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
            model_internal::_cmpy_bol_vp_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpy_bol_vp_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prntrStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prntrValidator() : StyleValidator
    {
        return model_internal::_prntrValidator;
    }

    model_internal function set _prntrIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prntrIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prntrIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prntrIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prntrIsValid():Boolean
    {
        if (!model_internal::_prntrIsValidCacheInitialized)
        {
            model_internal::calculatePrntrIsValid();
        }

        return model_internal::_prntrIsValid;
    }

    model_internal function calculatePrntrIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prntrValidator.validate(model_internal::_instance.prntr)
        model_internal::_prntrIsValid_der = (valRes.results == null);
        model_internal::_prntrIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prntrValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prntrValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prntrValidationFailureMessages():Array
    {
        if (model_internal::_prntrValidationFailureMessages == null)
            model_internal::calculatePrntrIsValid();

        return _prntrValidationFailureMessages;
    }

    model_internal function set prntrValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prntrValidationFailureMessages;

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
            model_internal::_prntrValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prntrValidationFailureMessages", oldValue, value));
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
            case("cmpy"):
            {
                return cmpyValidationFailureMessages;
            }
            case("cmpy_ld_rep_vp"):
            {
                return cmpy_ld_rep_vpValidationFailureMessages;
            }
            case("cmpy_drv_inst_vp"):
            {
                return cmpy_drv_inst_vpValidationFailureMessages;
            }
            case("cmpy_bol_vp_name"):
            {
                return cmpy_bol_vp_nameValidationFailureMessages;
            }
            case("prntr"):
            {
                return prntrValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
