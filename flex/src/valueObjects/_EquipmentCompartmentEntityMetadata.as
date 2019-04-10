
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
internal class _EquipmentCompartmentEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("adj_safefill", "adj_capacity", "adj_amnt", "eqpt_code", "cmpt_capacit", "cmpt_no", "adj_cmpt_lock", "unit_title", "etyp_title", "unit_id", "etyp_id", "eqpt_id");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("adj_safefill", "adj_capacity", "adj_amnt", "eqpt_code", "cmpt_capacit", "cmpt_no", "adj_cmpt_lock", "unit_title", "etyp_title", "unit_id", "etyp_id", "eqpt_id");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("adj_safefill", "adj_capacity", "adj_amnt", "eqpt_code", "cmpt_capacit", "cmpt_no", "adj_cmpt_lock", "unit_title", "etyp_title", "unit_id", "etyp_id", "eqpt_id");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("adj_safefill", "adj_capacity", "adj_amnt", "eqpt_code", "cmpt_capacit", "cmpt_no", "adj_cmpt_lock", "unit_title", "etyp_title", "unit_id", "etyp_id", "eqpt_id");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("adj_safefill", "adj_capacity", "adj_amnt", "eqpt_code", "cmpt_capacit", "cmpt_no", "adj_cmpt_lock", "unit_title", "etyp_title", "unit_id", "etyp_id", "eqpt_id");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "EquipmentCompartment";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _adj_safefillIsValid:Boolean;
    model_internal var _adj_safefillValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _adj_safefillIsValidCacheInitialized:Boolean = false;
    model_internal var _adj_safefillValidationFailureMessages:Array;
    
    model_internal var _adj_capacityIsValid:Boolean;
    model_internal var _adj_capacityValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _adj_capacityIsValidCacheInitialized:Boolean = false;
    model_internal var _adj_capacityValidationFailureMessages:Array;
    
    model_internal var _adj_amntIsValid:Boolean;
    model_internal var _adj_amntValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _adj_amntIsValidCacheInitialized:Boolean = false;
    model_internal var _adj_amntValidationFailureMessages:Array;
    
    model_internal var _eqpt_codeIsValid:Boolean;
    model_internal var _eqpt_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_codeValidationFailureMessages:Array;
    
    model_internal var _cmpt_capacitIsValid:Boolean;
    model_internal var _cmpt_capacitValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpt_capacitIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpt_capacitValidationFailureMessages:Array;
    
    model_internal var _cmpt_noIsValid:Boolean;
    model_internal var _cmpt_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpt_noIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpt_noValidationFailureMessages:Array;
    
    model_internal var _adj_cmpt_lockIsValid:Boolean;
    model_internal var _adj_cmpt_lockValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _adj_cmpt_lockIsValidCacheInitialized:Boolean = false;
    model_internal var _adj_cmpt_lockValidationFailureMessages:Array;
    
    model_internal var _unit_titleIsValid:Boolean;
    model_internal var _unit_titleValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _unit_titleIsValidCacheInitialized:Boolean = false;
    model_internal var _unit_titleValidationFailureMessages:Array;
    
    model_internal var _etyp_titleIsValid:Boolean;
    model_internal var _etyp_titleValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_titleIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_titleValidationFailureMessages:Array;
    
    model_internal var _unit_idIsValid:Boolean;
    model_internal var _unit_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _unit_idIsValidCacheInitialized:Boolean = false;
    model_internal var _unit_idValidationFailureMessages:Array;
    
    model_internal var _etyp_idIsValid:Boolean;
    model_internal var _etyp_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_idIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_idValidationFailureMessages:Array;
    
    model_internal var _eqpt_idIsValid:Boolean;
    model_internal var _eqpt_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_idIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_idValidationFailureMessages:Array;

    model_internal var _instance:_Super_EquipmentCompartment;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _EquipmentCompartmentEntityMetadata(value : _Super_EquipmentCompartment)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["adj_safefill"] = new Array();
            model_internal::dependentsOnMap["adj_capacity"] = new Array();
            model_internal::dependentsOnMap["adj_amnt"] = new Array();
            model_internal::dependentsOnMap["eqpt_code"] = new Array();
            model_internal::dependentsOnMap["cmpt_capacit"] = new Array();
            model_internal::dependentsOnMap["cmpt_no"] = new Array();
            model_internal::dependentsOnMap["adj_cmpt_lock"] = new Array();
            model_internal::dependentsOnMap["unit_title"] = new Array();
            model_internal::dependentsOnMap["etyp_title"] = new Array();
            model_internal::dependentsOnMap["unit_id"] = new Array();
            model_internal::dependentsOnMap["etyp_id"] = new Array();
            model_internal::dependentsOnMap["eqpt_id"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["adj_safefill"] = "String";
        model_internal::propertyTypeMap["adj_capacity"] = "String";
        model_internal::propertyTypeMap["adj_amnt"] = "String";
        model_internal::propertyTypeMap["eqpt_code"] = "String";
        model_internal::propertyTypeMap["cmpt_capacit"] = "String";
        model_internal::propertyTypeMap["cmpt_no"] = "String";
        model_internal::propertyTypeMap["adj_cmpt_lock"] = "String";
        model_internal::propertyTypeMap["unit_title"] = "String";
        model_internal::propertyTypeMap["etyp_title"] = "String";
        model_internal::propertyTypeMap["unit_id"] = "String";
        model_internal::propertyTypeMap["etyp_id"] = "String";
        model_internal::propertyTypeMap["eqpt_id"] = "String";

        model_internal::_instance = value;
        model_internal::_adj_safefillValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForAdj_safefill);
        model_internal::_adj_safefillValidator.required = true;
        model_internal::_adj_safefillValidator.requiredFieldError = "adj_safefill is required";
        //model_internal::_adj_safefillValidator.source = model_internal::_instance;
        //model_internal::_adj_safefillValidator.property = "adj_safefill";
        model_internal::_adj_capacityValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForAdj_capacity);
        model_internal::_adj_capacityValidator.required = true;
        model_internal::_adj_capacityValidator.requiredFieldError = "adj_capacity is required";
        //model_internal::_adj_capacityValidator.source = model_internal::_instance;
        //model_internal::_adj_capacityValidator.property = "adj_capacity";
        model_internal::_adj_amntValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForAdj_amnt);
        model_internal::_adj_amntValidator.required = true;
        model_internal::_adj_amntValidator.requiredFieldError = "adj_amnt is required";
        //model_internal::_adj_amntValidator.source = model_internal::_instance;
        //model_internal::_adj_amntValidator.property = "adj_amnt";
        model_internal::_eqpt_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_code);
        model_internal::_eqpt_codeValidator.required = true;
        model_internal::_eqpt_codeValidator.requiredFieldError = "eqpt_code is required";
        //model_internal::_eqpt_codeValidator.source = model_internal::_instance;
        //model_internal::_eqpt_codeValidator.property = "eqpt_code";
        model_internal::_cmpt_capacitValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpt_capacit);
        model_internal::_cmpt_capacitValidator.required = true;
        model_internal::_cmpt_capacitValidator.requiredFieldError = "cmpt_capacit is required";
        //model_internal::_cmpt_capacitValidator.source = model_internal::_instance;
        //model_internal::_cmpt_capacitValidator.property = "cmpt_capacit";
        model_internal::_cmpt_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpt_no);
        model_internal::_cmpt_noValidator.required = true;
        model_internal::_cmpt_noValidator.requiredFieldError = "cmpt_no is required";
        //model_internal::_cmpt_noValidator.source = model_internal::_instance;
        //model_internal::_cmpt_noValidator.property = "cmpt_no";
        model_internal::_adj_cmpt_lockValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForAdj_cmpt_lock);
        model_internal::_adj_cmpt_lockValidator.required = true;
        model_internal::_adj_cmpt_lockValidator.requiredFieldError = "adj_cmpt_lock is required";
        //model_internal::_adj_cmpt_lockValidator.source = model_internal::_instance;
        //model_internal::_adj_cmpt_lockValidator.property = "adj_cmpt_lock";
        model_internal::_unit_titleValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForUnit_title);
        model_internal::_unit_titleValidator.required = true;
        model_internal::_unit_titleValidator.requiredFieldError = "unit_title is required";
        //model_internal::_unit_titleValidator.source = model_internal::_instance;
        //model_internal::_unit_titleValidator.property = "unit_title";
        model_internal::_etyp_titleValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_title);
        model_internal::_etyp_titleValidator.required = true;
        model_internal::_etyp_titleValidator.requiredFieldError = "etyp_title is required";
        //model_internal::_etyp_titleValidator.source = model_internal::_instance;
        //model_internal::_etyp_titleValidator.property = "etyp_title";
        model_internal::_unit_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForUnit_id);
        model_internal::_unit_idValidator.required = true;
        model_internal::_unit_idValidator.requiredFieldError = "unit_id is required";
        //model_internal::_unit_idValidator.source = model_internal::_instance;
        //model_internal::_unit_idValidator.property = "unit_id";
        model_internal::_etyp_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_id);
        model_internal::_etyp_idValidator.required = true;
        model_internal::_etyp_idValidator.requiredFieldError = "etyp_id is required";
        //model_internal::_etyp_idValidator.source = model_internal::_instance;
        //model_internal::_etyp_idValidator.property = "etyp_id";
        model_internal::_eqpt_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_id);
        model_internal::_eqpt_idValidator.required = true;
        model_internal::_eqpt_idValidator.requiredFieldError = "eqpt_id is required";
        //model_internal::_eqpt_idValidator.source = model_internal::_instance;
        //model_internal::_eqpt_idValidator.property = "eqpt_id";
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
            throw new Error(propertyName + " is not a data property of entity EquipmentCompartment");
            
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
            throw new Error(propertyName + " is not a collection property of entity EquipmentCompartment");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of EquipmentCompartment");

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
            throw new Error(propertyName + " does not exist for entity EquipmentCompartment");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity EquipmentCompartment");
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
            throw new Error(propertyName + " does not exist for entity EquipmentCompartment");
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
    public function get isAdj_safefillAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isAdj_capacityAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isAdj_amntAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpt_capacitAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpt_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isAdj_cmpt_lockAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isUnit_titleAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_titleAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isUnit_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_idAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnAdj_safefill():void
    {
        if (model_internal::_adj_safefillIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfAdj_safefill = null;
            model_internal::calculateAdj_safefillIsValid();
        }
    }
    public function invalidateDependentOnAdj_capacity():void
    {
        if (model_internal::_adj_capacityIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfAdj_capacity = null;
            model_internal::calculateAdj_capacityIsValid();
        }
    }
    public function invalidateDependentOnAdj_amnt():void
    {
        if (model_internal::_adj_amntIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfAdj_amnt = null;
            model_internal::calculateAdj_amntIsValid();
        }
    }
    public function invalidateDependentOnEqpt_code():void
    {
        if (model_internal::_eqpt_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_code = null;
            model_internal::calculateEqpt_codeIsValid();
        }
    }
    public function invalidateDependentOnCmpt_capacit():void
    {
        if (model_internal::_cmpt_capacitIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpt_capacit = null;
            model_internal::calculateCmpt_capacitIsValid();
        }
    }
    public function invalidateDependentOnCmpt_no():void
    {
        if (model_internal::_cmpt_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpt_no = null;
            model_internal::calculateCmpt_noIsValid();
        }
    }
    public function invalidateDependentOnAdj_cmpt_lock():void
    {
        if (model_internal::_adj_cmpt_lockIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfAdj_cmpt_lock = null;
            model_internal::calculateAdj_cmpt_lockIsValid();
        }
    }
    public function invalidateDependentOnUnit_title():void
    {
        if (model_internal::_unit_titleIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfUnit_title = null;
            model_internal::calculateUnit_titleIsValid();
        }
    }
    public function invalidateDependentOnEtyp_title():void
    {
        if (model_internal::_etyp_titleIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_title = null;
            model_internal::calculateEtyp_titleIsValid();
        }
    }
    public function invalidateDependentOnUnit_id():void
    {
        if (model_internal::_unit_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfUnit_id = null;
            model_internal::calculateUnit_idIsValid();
        }
    }
    public function invalidateDependentOnEtyp_id():void
    {
        if (model_internal::_etyp_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEtyp_id = null;
            model_internal::calculateEtyp_idIsValid();
        }
    }
    public function invalidateDependentOnEqpt_id():void
    {
        if (model_internal::_eqpt_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfEqpt_id = null;
            model_internal::calculateEqpt_idIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get adj_safefillStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get adj_safefillValidator() : StyleValidator
    {
        return model_internal::_adj_safefillValidator;
    }

    model_internal function set _adj_safefillIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_adj_safefillIsValid;         
        if (oldValue !== value)
        {
            model_internal::_adj_safefillIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "adj_safefillIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get adj_safefillIsValid():Boolean
    {
        if (!model_internal::_adj_safefillIsValidCacheInitialized)
        {
            model_internal::calculateAdj_safefillIsValid();
        }

        return model_internal::_adj_safefillIsValid;
    }

    model_internal function calculateAdj_safefillIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_adj_safefillValidator.validate(model_internal::_instance.adj_safefill)
        model_internal::_adj_safefillIsValid_der = (valRes.results == null);
        model_internal::_adj_safefillIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::adj_safefillValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::adj_safefillValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get adj_safefillValidationFailureMessages():Array
    {
        if (model_internal::_adj_safefillValidationFailureMessages == null)
            model_internal::calculateAdj_safefillIsValid();

        return _adj_safefillValidationFailureMessages;
    }

    model_internal function set adj_safefillValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_adj_safefillValidationFailureMessages;

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
            model_internal::_adj_safefillValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "adj_safefillValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get adj_capacityStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get adj_capacityValidator() : StyleValidator
    {
        return model_internal::_adj_capacityValidator;
    }

    model_internal function set _adj_capacityIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_adj_capacityIsValid;         
        if (oldValue !== value)
        {
            model_internal::_adj_capacityIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "adj_capacityIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get adj_capacityIsValid():Boolean
    {
        if (!model_internal::_adj_capacityIsValidCacheInitialized)
        {
            model_internal::calculateAdj_capacityIsValid();
        }

        return model_internal::_adj_capacityIsValid;
    }

    model_internal function calculateAdj_capacityIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_adj_capacityValidator.validate(model_internal::_instance.adj_capacity)
        model_internal::_adj_capacityIsValid_der = (valRes.results == null);
        model_internal::_adj_capacityIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::adj_capacityValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::adj_capacityValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get adj_capacityValidationFailureMessages():Array
    {
        if (model_internal::_adj_capacityValidationFailureMessages == null)
            model_internal::calculateAdj_capacityIsValid();

        return _adj_capacityValidationFailureMessages;
    }

    model_internal function set adj_capacityValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_adj_capacityValidationFailureMessages;

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
            model_internal::_adj_capacityValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "adj_capacityValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get adj_amntStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get adj_amntValidator() : StyleValidator
    {
        return model_internal::_adj_amntValidator;
    }

    model_internal function set _adj_amntIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_adj_amntIsValid;         
        if (oldValue !== value)
        {
            model_internal::_adj_amntIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "adj_amntIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get adj_amntIsValid():Boolean
    {
        if (!model_internal::_adj_amntIsValidCacheInitialized)
        {
            model_internal::calculateAdj_amntIsValid();
        }

        return model_internal::_adj_amntIsValid;
    }

    model_internal function calculateAdj_amntIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_adj_amntValidator.validate(model_internal::_instance.adj_amnt)
        model_internal::_adj_amntIsValid_der = (valRes.results == null);
        model_internal::_adj_amntIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::adj_amntValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::adj_amntValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get adj_amntValidationFailureMessages():Array
    {
        if (model_internal::_adj_amntValidationFailureMessages == null)
            model_internal::calculateAdj_amntIsValid();

        return _adj_amntValidationFailureMessages;
    }

    model_internal function set adj_amntValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_adj_amntValidationFailureMessages;

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
            model_internal::_adj_amntValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "adj_amntValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_codeValidator() : StyleValidator
    {
        return model_internal::_eqpt_codeValidator;
    }

    model_internal function set _eqpt_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_codeIsValid():Boolean
    {
        if (!model_internal::_eqpt_codeIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_codeIsValid();
        }

        return model_internal::_eqpt_codeIsValid;
    }

    model_internal function calculateEqpt_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_codeValidator.validate(model_internal::_instance.eqpt_code)
        model_internal::_eqpt_codeIsValid_der = (valRes.results == null);
        model_internal::_eqpt_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_codeValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_codeValidationFailureMessages == null)
            model_internal::calculateEqpt_codeIsValid();

        return _eqpt_codeValidationFailureMessages;
    }

    model_internal function set eqpt_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_codeValidationFailureMessages;

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
            model_internal::_eqpt_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpt_capacitStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpt_capacitValidator() : StyleValidator
    {
        return model_internal::_cmpt_capacitValidator;
    }

    model_internal function set _cmpt_capacitIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpt_capacitIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpt_capacitIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_capacitIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_capacitIsValid():Boolean
    {
        if (!model_internal::_cmpt_capacitIsValidCacheInitialized)
        {
            model_internal::calculateCmpt_capacitIsValid();
        }

        return model_internal::_cmpt_capacitIsValid;
    }

    model_internal function calculateCmpt_capacitIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpt_capacitValidator.validate(model_internal::_instance.cmpt_capacit)
        model_internal::_cmpt_capacitIsValid_der = (valRes.results == null);
        model_internal::_cmpt_capacitIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpt_capacitValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpt_capacitValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_capacitValidationFailureMessages():Array
    {
        if (model_internal::_cmpt_capacitValidationFailureMessages == null)
            model_internal::calculateCmpt_capacitIsValid();

        return _cmpt_capacitValidationFailureMessages;
    }

    model_internal function set cmpt_capacitValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpt_capacitValidationFailureMessages;

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
            model_internal::_cmpt_capacitValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_capacitValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpt_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpt_noValidator() : StyleValidator
    {
        return model_internal::_cmpt_noValidator;
    }

    model_internal function set _cmpt_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpt_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpt_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_noIsValid():Boolean
    {
        if (!model_internal::_cmpt_noIsValidCacheInitialized)
        {
            model_internal::calculateCmpt_noIsValid();
        }

        return model_internal::_cmpt_noIsValid;
    }

    model_internal function calculateCmpt_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpt_noValidator.validate(model_internal::_instance.cmpt_no)
        model_internal::_cmpt_noIsValid_der = (valRes.results == null);
        model_internal::_cmpt_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpt_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpt_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_noValidationFailureMessages():Array
    {
        if (model_internal::_cmpt_noValidationFailureMessages == null)
            model_internal::calculateCmpt_noIsValid();

        return _cmpt_noValidationFailureMessages;
    }

    model_internal function set cmpt_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpt_noValidationFailureMessages;

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
            model_internal::_cmpt_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get adj_cmpt_lockStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get adj_cmpt_lockValidator() : StyleValidator
    {
        return model_internal::_adj_cmpt_lockValidator;
    }

    model_internal function set _adj_cmpt_lockIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_adj_cmpt_lockIsValid;         
        if (oldValue !== value)
        {
            model_internal::_adj_cmpt_lockIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "adj_cmpt_lockIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get adj_cmpt_lockIsValid():Boolean
    {
        if (!model_internal::_adj_cmpt_lockIsValidCacheInitialized)
        {
            model_internal::calculateAdj_cmpt_lockIsValid();
        }

        return model_internal::_adj_cmpt_lockIsValid;
    }

    model_internal function calculateAdj_cmpt_lockIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_adj_cmpt_lockValidator.validate(model_internal::_instance.adj_cmpt_lock)
        model_internal::_adj_cmpt_lockIsValid_der = (valRes.results == null);
        model_internal::_adj_cmpt_lockIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::adj_cmpt_lockValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::adj_cmpt_lockValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get adj_cmpt_lockValidationFailureMessages():Array
    {
        if (model_internal::_adj_cmpt_lockValidationFailureMessages == null)
            model_internal::calculateAdj_cmpt_lockIsValid();

        return _adj_cmpt_lockValidationFailureMessages;
    }

    model_internal function set adj_cmpt_lockValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_adj_cmpt_lockValidationFailureMessages;

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
            model_internal::_adj_cmpt_lockValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "adj_cmpt_lockValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get unit_titleStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get unit_titleValidator() : StyleValidator
    {
        return model_internal::_unit_titleValidator;
    }

    model_internal function set _unit_titleIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_unit_titleIsValid;         
        if (oldValue !== value)
        {
            model_internal::_unit_titleIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_titleIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get unit_titleIsValid():Boolean
    {
        if (!model_internal::_unit_titleIsValidCacheInitialized)
        {
            model_internal::calculateUnit_titleIsValid();
        }

        return model_internal::_unit_titleIsValid;
    }

    model_internal function calculateUnit_titleIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_unit_titleValidator.validate(model_internal::_instance.unit_title)
        model_internal::_unit_titleIsValid_der = (valRes.results == null);
        model_internal::_unit_titleIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::unit_titleValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::unit_titleValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get unit_titleValidationFailureMessages():Array
    {
        if (model_internal::_unit_titleValidationFailureMessages == null)
            model_internal::calculateUnit_titleIsValid();

        return _unit_titleValidationFailureMessages;
    }

    model_internal function set unit_titleValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_unit_titleValidationFailureMessages;

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
            model_internal::_unit_titleValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_titleValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_titleStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_titleValidator() : StyleValidator
    {
        return model_internal::_etyp_titleValidator;
    }

    model_internal function set _etyp_titleIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_titleIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_titleIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_titleIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_titleIsValid():Boolean
    {
        if (!model_internal::_etyp_titleIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_titleIsValid();
        }

        return model_internal::_etyp_titleIsValid;
    }

    model_internal function calculateEtyp_titleIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_titleValidator.validate(model_internal::_instance.etyp_title)
        model_internal::_etyp_titleIsValid_der = (valRes.results == null);
        model_internal::_etyp_titleIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_titleValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_titleValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_titleValidationFailureMessages():Array
    {
        if (model_internal::_etyp_titleValidationFailureMessages == null)
            model_internal::calculateEtyp_titleIsValid();

        return _etyp_titleValidationFailureMessages;
    }

    model_internal function set etyp_titleValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_titleValidationFailureMessages;

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
            model_internal::_etyp_titleValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_titleValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get unit_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get unit_idValidator() : StyleValidator
    {
        return model_internal::_unit_idValidator;
    }

    model_internal function set _unit_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_unit_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_unit_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get unit_idIsValid():Boolean
    {
        if (!model_internal::_unit_idIsValidCacheInitialized)
        {
            model_internal::calculateUnit_idIsValid();
        }

        return model_internal::_unit_idIsValid;
    }

    model_internal function calculateUnit_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_unit_idValidator.validate(model_internal::_instance.unit_id)
        model_internal::_unit_idIsValid_der = (valRes.results == null);
        model_internal::_unit_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::unit_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::unit_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get unit_idValidationFailureMessages():Array
    {
        if (model_internal::_unit_idValidationFailureMessages == null)
            model_internal::calculateUnit_idIsValid();

        return _unit_idValidationFailureMessages;
    }

    model_internal function set unit_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_unit_idValidationFailureMessages;

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
            model_internal::_unit_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unit_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get etyp_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get etyp_idValidator() : StyleValidator
    {
        return model_internal::_etyp_idValidator;
    }

    model_internal function set _etyp_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_etyp_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_etyp_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get etyp_idIsValid():Boolean
    {
        if (!model_internal::_etyp_idIsValidCacheInitialized)
        {
            model_internal::calculateEtyp_idIsValid();
        }

        return model_internal::_etyp_idIsValid;
    }

    model_internal function calculateEtyp_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_etyp_idValidator.validate(model_internal::_instance.etyp_id)
        model_internal::_etyp_idIsValid_der = (valRes.results == null);
        model_internal::_etyp_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::etyp_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::etyp_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get etyp_idValidationFailureMessages():Array
    {
        if (model_internal::_etyp_idValidationFailureMessages == null)
            model_internal::calculateEtyp_idIsValid();

        return _etyp_idValidationFailureMessages;
    }

    model_internal function set etyp_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_etyp_idValidationFailureMessages;

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
            model_internal::_etyp_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "etyp_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get eqpt_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get eqpt_idValidator() : StyleValidator
    {
        return model_internal::_eqpt_idValidator;
    }

    model_internal function set _eqpt_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_eqpt_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_eqpt_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_idIsValid():Boolean
    {
        if (!model_internal::_eqpt_idIsValidCacheInitialized)
        {
            model_internal::calculateEqpt_idIsValid();
        }

        return model_internal::_eqpt_idIsValid;
    }

    model_internal function calculateEqpt_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_eqpt_idValidator.validate(model_internal::_instance.eqpt_id)
        model_internal::_eqpt_idIsValid_der = (valRes.results == null);
        model_internal::_eqpt_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::eqpt_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::eqpt_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get eqpt_idValidationFailureMessages():Array
    {
        if (model_internal::_eqpt_idValidationFailureMessages == null)
            model_internal::calculateEqpt_idIsValid();

        return _eqpt_idValidationFailureMessages;
    }

    model_internal function set eqpt_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_eqpt_idValidationFailureMessages;

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
            model_internal::_eqpt_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "eqpt_idValidationFailureMessages", oldValue, value));
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
            case("adj_safefill"):
            {
                return adj_safefillValidationFailureMessages;
            }
            case("adj_capacity"):
            {
                return adj_capacityValidationFailureMessages;
            }
            case("adj_amnt"):
            {
                return adj_amntValidationFailureMessages;
            }
            case("eqpt_code"):
            {
                return eqpt_codeValidationFailureMessages;
            }
            case("cmpt_capacit"):
            {
                return cmpt_capacitValidationFailureMessages;
            }
            case("cmpt_no"):
            {
                return cmpt_noValidationFailureMessages;
            }
            case("adj_cmpt_lock"):
            {
                return adj_cmpt_lockValidationFailureMessages;
            }
            case("unit_title"):
            {
                return unit_titleValidationFailureMessages;
            }
            case("etyp_title"):
            {
                return etyp_titleValidationFailureMessages;
            }
            case("unit_id"):
            {
                return unit_idValidationFailureMessages;
            }
            case("etyp_id"):
            {
                return etyp_idValidationFailureMessages;
            }
            case("eqpt_id"):
            {
                return eqpt_idValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
