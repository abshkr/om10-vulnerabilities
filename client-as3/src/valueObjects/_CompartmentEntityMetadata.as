
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
internal class _CompartmentEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("sched_deliv_num", "sched_sold_to_num", "sched_ship_to_num", "cmpt_no", "cmpt_capacit", "product_name", "prev_product_code", "schd_deliv_num", "etyp_title", "order_id", "schd_ship_to_num", "cmpt_etyp", "cmpt_units", "unit", "cmpt_n_seals", "schedule", "prev_product_name", "schd_sold_to_num", "product_code", "seq", "qty_preload");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("sched_deliv_num", "sched_sold_to_num", "sched_ship_to_num", "cmpt_no", "cmpt_capacit", "product_name", "prev_product_code", "schd_deliv_num", "etyp_title", "order_id", "schd_ship_to_num", "cmpt_etyp", "cmpt_units", "unit", "cmpt_n_seals", "schedule", "prev_product_name", "schd_sold_to_num", "product_code", "seq", "qty_preload");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("sched_deliv_num", "sched_sold_to_num", "sched_ship_to_num", "cmpt_no", "cmpt_capacit", "product_name", "prev_product_code", "schd_deliv_num", "etyp_title", "order_id", "schd_ship_to_num", "cmpt_etyp", "cmpt_units", "unit", "cmpt_n_seals", "schedule", "prev_product_name", "schd_sold_to_num", "product_code", "seq", "qty_preload");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("sched_deliv_num", "sched_sold_to_num", "sched_ship_to_num", "cmpt_no", "cmpt_capacit", "product_name", "prev_product_code", "schd_deliv_num", "etyp_title", "order_id", "schd_ship_to_num", "cmpt_etyp", "cmpt_units", "unit", "cmpt_n_seals", "schedule", "prev_product_name", "schd_sold_to_num", "product_code", "seq", "qty_preload");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("sched_deliv_num", "sched_sold_to_num", "sched_ship_to_num", "cmpt_no", "cmpt_capacit", "product_name", "prev_product_code", "schd_deliv_num", "etyp_title", "order_id", "schd_ship_to_num", "cmpt_etyp", "cmpt_units", "unit", "cmpt_n_seals", "schedule", "prev_product_name", "schd_sold_to_num", "product_code", "seq", "qty_preload");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "Compartment";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _sched_deliv_numIsValid:Boolean;
    model_internal var _sched_deliv_numValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _sched_deliv_numIsValidCacheInitialized:Boolean = false;
    model_internal var _sched_deliv_numValidationFailureMessages:Array;
    
    model_internal var _sched_sold_to_numIsValid:Boolean;
    model_internal var _sched_sold_to_numValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _sched_sold_to_numIsValidCacheInitialized:Boolean = false;
    model_internal var _sched_sold_to_numValidationFailureMessages:Array;
    
    model_internal var _sched_ship_to_numIsValid:Boolean;
    model_internal var _sched_ship_to_numValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _sched_ship_to_numIsValidCacheInitialized:Boolean = false;
    model_internal var _sched_ship_to_numValidationFailureMessages:Array;
    
    model_internal var _cmpt_noIsValid:Boolean;
    model_internal var _cmpt_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpt_noIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpt_noValidationFailureMessages:Array;
    
    model_internal var _cmpt_capacitIsValid:Boolean;
    model_internal var _cmpt_capacitValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpt_capacitIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpt_capacitValidationFailureMessages:Array;
    
    model_internal var _product_nameIsValid:Boolean;
    model_internal var _product_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _product_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _product_nameValidationFailureMessages:Array;
    
    model_internal var _prev_product_codeIsValid:Boolean;
    model_internal var _prev_product_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prev_product_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _prev_product_codeValidationFailureMessages:Array;
    
    model_internal var _schd_deliv_numIsValid:Boolean;
    model_internal var _schd_deliv_numValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_deliv_numIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_deliv_numValidationFailureMessages:Array;
    
    model_internal var _etyp_titleIsValid:Boolean;
    model_internal var _etyp_titleValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _etyp_titleIsValidCacheInitialized:Boolean = false;
    model_internal var _etyp_titleValidationFailureMessages:Array;
    
    model_internal var _order_idIsValid:Boolean;
    model_internal var _order_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_idIsValidCacheInitialized:Boolean = false;
    model_internal var _order_idValidationFailureMessages:Array;
    
    model_internal var _schd_ship_to_numIsValid:Boolean;
    model_internal var _schd_ship_to_numValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_ship_to_numIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_ship_to_numValidationFailureMessages:Array;
    
    model_internal var _cmpt_etypIsValid:Boolean;
    model_internal var _cmpt_etypValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpt_etypIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpt_etypValidationFailureMessages:Array;
    
    model_internal var _cmpt_unitsIsValid:Boolean;
    model_internal var _cmpt_unitsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpt_unitsIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpt_unitsValidationFailureMessages:Array;
    
    model_internal var _unitIsValid:Boolean;
    model_internal var _unitValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _unitIsValidCacheInitialized:Boolean = false;
    model_internal var _unitValidationFailureMessages:Array;
    
    model_internal var _cmpt_n_sealsIsValid:Boolean;
    model_internal var _cmpt_n_sealsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpt_n_sealsIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpt_n_sealsValidationFailureMessages:Array;
    
    model_internal var _scheduleIsValid:Boolean;
    model_internal var _scheduleValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _scheduleIsValidCacheInitialized:Boolean = false;
    model_internal var _scheduleValidationFailureMessages:Array;
    
    model_internal var _prev_product_nameIsValid:Boolean;
    model_internal var _prev_product_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prev_product_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _prev_product_nameValidationFailureMessages:Array;
    
    model_internal var _schd_sold_to_numIsValid:Boolean;
    model_internal var _schd_sold_to_numValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_sold_to_numIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_sold_to_numValidationFailureMessages:Array;
    
    model_internal var _product_codeIsValid:Boolean;
    model_internal var _product_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _product_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _product_codeValidationFailureMessages:Array;
    
    model_internal var _seqIsValid:Boolean;
    model_internal var _seqValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _seqIsValidCacheInitialized:Boolean = false;
    model_internal var _seqValidationFailureMessages:Array;
    
    model_internal var _qty_preloadIsValid:Boolean;
    model_internal var _qty_preloadValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _qty_preloadIsValidCacheInitialized:Boolean = false;
    model_internal var _qty_preloadValidationFailureMessages:Array;

    model_internal var _instance:_Super_Compartment;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _CompartmentEntityMetadata(value : _Super_Compartment)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["sched_deliv_num"] = new Array();
            model_internal::dependentsOnMap["sched_sold_to_num"] = new Array();
            model_internal::dependentsOnMap["sched_ship_to_num"] = new Array();
            model_internal::dependentsOnMap["cmpt_no"] = new Array();
            model_internal::dependentsOnMap["cmpt_capacit"] = new Array();
            model_internal::dependentsOnMap["product_name"] = new Array();
            model_internal::dependentsOnMap["prev_product_code"] = new Array();
            model_internal::dependentsOnMap["schd_deliv_num"] = new Array();
            model_internal::dependentsOnMap["etyp_title"] = new Array();
            model_internal::dependentsOnMap["order_id"] = new Array();
            model_internal::dependentsOnMap["schd_ship_to_num"] = new Array();
            model_internal::dependentsOnMap["cmpt_etyp"] = new Array();
            model_internal::dependentsOnMap["cmpt_units"] = new Array();
            model_internal::dependentsOnMap["unit"] = new Array();
            model_internal::dependentsOnMap["cmpt_n_seals"] = new Array();
            model_internal::dependentsOnMap["schedule"] = new Array();
            model_internal::dependentsOnMap["prev_product_name"] = new Array();
            model_internal::dependentsOnMap["schd_sold_to_num"] = new Array();
            model_internal::dependentsOnMap["product_code"] = new Array();
            model_internal::dependentsOnMap["seq"] = new Array();
            model_internal::dependentsOnMap["qty_preload"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["sched_deliv_num"] = "Object";
        model_internal::propertyTypeMap["sched_sold_to_num"] = "Object";
        model_internal::propertyTypeMap["sched_ship_to_num"] = "Object";
        model_internal::propertyTypeMap["cmpt_no"] = "String";
        model_internal::propertyTypeMap["cmpt_capacit"] = "String";
        model_internal::propertyTypeMap["product_name"] = "Object";
        model_internal::propertyTypeMap["prev_product_code"] = "Object";
        model_internal::propertyTypeMap["schd_deliv_num"] = "Object";
        model_internal::propertyTypeMap["etyp_title"] = "Object";
        model_internal::propertyTypeMap["order_id"] = "Object";
        model_internal::propertyTypeMap["schd_ship_to_num"] = "Object";
        model_internal::propertyTypeMap["cmpt_etyp"] = "String";
        model_internal::propertyTypeMap["cmpt_units"] = "String";
        model_internal::propertyTypeMap["unit"] = "String";
        model_internal::propertyTypeMap["cmpt_n_seals"] = "String";
        model_internal::propertyTypeMap["schedule"] = "Object";
        model_internal::propertyTypeMap["prev_product_name"] = "Object";
        model_internal::propertyTypeMap["schd_sold_to_num"] = "Object";
        model_internal::propertyTypeMap["product_code"] = "Object";
        model_internal::propertyTypeMap["seq"] = "Object";
        model_internal::propertyTypeMap["qty_preload"] = "Object";

        model_internal::_instance = value;
        model_internal::_sched_deliv_numValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSched_deliv_num);
        model_internal::_sched_deliv_numValidator.required = true;
        model_internal::_sched_deliv_numValidator.requiredFieldError = "sched_deliv_num is required";
        //model_internal::_sched_deliv_numValidator.source = model_internal::_instance;
        //model_internal::_sched_deliv_numValidator.property = "sched_deliv_num";
        model_internal::_sched_sold_to_numValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSched_sold_to_num);
        model_internal::_sched_sold_to_numValidator.required = true;
        model_internal::_sched_sold_to_numValidator.requiredFieldError = "sched_sold_to_num is required";
        //model_internal::_sched_sold_to_numValidator.source = model_internal::_instance;
        //model_internal::_sched_sold_to_numValidator.property = "sched_sold_to_num";
        model_internal::_sched_ship_to_numValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSched_ship_to_num);
        model_internal::_sched_ship_to_numValidator.required = true;
        model_internal::_sched_ship_to_numValidator.requiredFieldError = "sched_ship_to_num is required";
        //model_internal::_sched_ship_to_numValidator.source = model_internal::_instance;
        //model_internal::_sched_ship_to_numValidator.property = "sched_ship_to_num";
        model_internal::_cmpt_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpt_no);
        model_internal::_cmpt_noValidator.required = true;
        model_internal::_cmpt_noValidator.requiredFieldError = "cmpt_no is required";
        //model_internal::_cmpt_noValidator.source = model_internal::_instance;
        //model_internal::_cmpt_noValidator.property = "cmpt_no";
        model_internal::_cmpt_capacitValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpt_capacit);
        model_internal::_cmpt_capacitValidator.required = true;
        model_internal::_cmpt_capacitValidator.requiredFieldError = "cmpt_capacit is required";
        //model_internal::_cmpt_capacitValidator.source = model_internal::_instance;
        //model_internal::_cmpt_capacitValidator.property = "cmpt_capacit";
        model_internal::_product_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProduct_name);
        model_internal::_product_nameValidator.required = true;
        model_internal::_product_nameValidator.requiredFieldError = "product_name is required";
        //model_internal::_product_nameValidator.source = model_internal::_instance;
        //model_internal::_product_nameValidator.property = "product_name";
        model_internal::_prev_product_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPrev_product_code);
        model_internal::_prev_product_codeValidator.required = true;
        model_internal::_prev_product_codeValidator.requiredFieldError = "prev_product_code is required";
        //model_internal::_prev_product_codeValidator.source = model_internal::_instance;
        //model_internal::_prev_product_codeValidator.property = "prev_product_code";
        model_internal::_schd_deliv_numValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_deliv_num);
        model_internal::_schd_deliv_numValidator.required = true;
        model_internal::_schd_deliv_numValidator.requiredFieldError = "schd_deliv_num is required";
        //model_internal::_schd_deliv_numValidator.source = model_internal::_instance;
        //model_internal::_schd_deliv_numValidator.property = "schd_deliv_num";
        model_internal::_etyp_titleValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEtyp_title);
        model_internal::_etyp_titleValidator.required = true;
        model_internal::_etyp_titleValidator.requiredFieldError = "etyp_title is required";
        //model_internal::_etyp_titleValidator.source = model_internal::_instance;
        //model_internal::_etyp_titleValidator.property = "etyp_title";
        model_internal::_order_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_id);
        model_internal::_order_idValidator.required = true;
        model_internal::_order_idValidator.requiredFieldError = "order_id is required";
        //model_internal::_order_idValidator.source = model_internal::_instance;
        //model_internal::_order_idValidator.property = "order_id";
        model_internal::_schd_ship_to_numValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_ship_to_num);
        model_internal::_schd_ship_to_numValidator.required = true;
        model_internal::_schd_ship_to_numValidator.requiredFieldError = "schd_ship_to_num is required";
        //model_internal::_schd_ship_to_numValidator.source = model_internal::_instance;
        //model_internal::_schd_ship_to_numValidator.property = "schd_ship_to_num";
        model_internal::_cmpt_etypValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpt_etyp);
        model_internal::_cmpt_etypValidator.required = true;
        model_internal::_cmpt_etypValidator.requiredFieldError = "cmpt_etyp is required";
        //model_internal::_cmpt_etypValidator.source = model_internal::_instance;
        //model_internal::_cmpt_etypValidator.property = "cmpt_etyp";
        model_internal::_cmpt_unitsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpt_units);
        model_internal::_cmpt_unitsValidator.required = true;
        model_internal::_cmpt_unitsValidator.requiredFieldError = "cmpt_units is required";
        //model_internal::_cmpt_unitsValidator.source = model_internal::_instance;
        //model_internal::_cmpt_unitsValidator.property = "cmpt_units";
        model_internal::_unitValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForUnit);
        model_internal::_unitValidator.required = true;
        model_internal::_unitValidator.requiredFieldError = "unit is required";
        //model_internal::_unitValidator.source = model_internal::_instance;
        //model_internal::_unitValidator.property = "unit";
        model_internal::_cmpt_n_sealsValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpt_n_seals);
        model_internal::_cmpt_n_sealsValidator.required = true;
        model_internal::_cmpt_n_sealsValidator.requiredFieldError = "cmpt_n_seals is required";
        //model_internal::_cmpt_n_sealsValidator.source = model_internal::_instance;
        //model_internal::_cmpt_n_sealsValidator.property = "cmpt_n_seals";
        model_internal::_scheduleValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchedule);
        model_internal::_scheduleValidator.required = true;
        model_internal::_scheduleValidator.requiredFieldError = "schedule is required";
        //model_internal::_scheduleValidator.source = model_internal::_instance;
        //model_internal::_scheduleValidator.property = "schedule";
        model_internal::_prev_product_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPrev_product_name);
        model_internal::_prev_product_nameValidator.required = true;
        model_internal::_prev_product_nameValidator.requiredFieldError = "prev_product_name is required";
        //model_internal::_prev_product_nameValidator.source = model_internal::_instance;
        //model_internal::_prev_product_nameValidator.property = "prev_product_name";
        model_internal::_schd_sold_to_numValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_sold_to_num);
        model_internal::_schd_sold_to_numValidator.required = true;
        model_internal::_schd_sold_to_numValidator.requiredFieldError = "schd_sold_to_num is required";
        //model_internal::_schd_sold_to_numValidator.source = model_internal::_instance;
        //model_internal::_schd_sold_to_numValidator.property = "schd_sold_to_num";
        model_internal::_product_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProduct_code);
        model_internal::_product_codeValidator.required = true;
        model_internal::_product_codeValidator.requiredFieldError = "product_code is required";
        //model_internal::_product_codeValidator.source = model_internal::_instance;
        //model_internal::_product_codeValidator.property = "product_code";
        model_internal::_seqValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSeq);
        model_internal::_seqValidator.required = true;
        model_internal::_seqValidator.requiredFieldError = "seq is required";
        //model_internal::_seqValidator.source = model_internal::_instance;
        //model_internal::_seqValidator.property = "seq";
        model_internal::_qty_preloadValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForQty_preload);
        model_internal::_qty_preloadValidator.required = true;
        model_internal::_qty_preloadValidator.requiredFieldError = "qty_preload is required";
        //model_internal::_qty_preloadValidator.source = model_internal::_instance;
        //model_internal::_qty_preloadValidator.property = "qty_preload";
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
            throw new Error(propertyName + " is not a data property of entity Compartment");
            
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
            throw new Error(propertyName + " is not a collection property of entity Compartment");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of Compartment");

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
            throw new Error(propertyName + " does not exist for entity Compartment");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity Compartment");
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
            throw new Error(propertyName + " does not exist for entity Compartment");
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
    public function get isSched_deliv_numAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSched_sold_to_numAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSched_ship_to_numAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpt_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpt_capacitAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProduct_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPrev_product_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_deliv_numAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEtyp_titleAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_ship_to_numAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpt_etypAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpt_unitsAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isUnitAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpt_n_sealsAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isScheduleAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPrev_product_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_sold_to_numAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProduct_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSeqAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isQty_preloadAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnSched_deliv_num():void
    {
        if (model_internal::_sched_deliv_numIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSched_deliv_num = null;
            model_internal::calculateSched_deliv_numIsValid();
        }
    }
    public function invalidateDependentOnSched_sold_to_num():void
    {
        if (model_internal::_sched_sold_to_numIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSched_sold_to_num = null;
            model_internal::calculateSched_sold_to_numIsValid();
        }
    }
    public function invalidateDependentOnSched_ship_to_num():void
    {
        if (model_internal::_sched_ship_to_numIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSched_ship_to_num = null;
            model_internal::calculateSched_ship_to_numIsValid();
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
    public function invalidateDependentOnCmpt_capacit():void
    {
        if (model_internal::_cmpt_capacitIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpt_capacit = null;
            model_internal::calculateCmpt_capacitIsValid();
        }
    }
    public function invalidateDependentOnProduct_name():void
    {
        if (model_internal::_product_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProduct_name = null;
            model_internal::calculateProduct_nameIsValid();
        }
    }
    public function invalidateDependentOnPrev_product_code():void
    {
        if (model_internal::_prev_product_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPrev_product_code = null;
            model_internal::calculatePrev_product_codeIsValid();
        }
    }
    public function invalidateDependentOnSchd_deliv_num():void
    {
        if (model_internal::_schd_deliv_numIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_deliv_num = null;
            model_internal::calculateSchd_deliv_numIsValid();
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
    public function invalidateDependentOnOrder_id():void
    {
        if (model_internal::_order_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_id = null;
            model_internal::calculateOrder_idIsValid();
        }
    }
    public function invalidateDependentOnSchd_ship_to_num():void
    {
        if (model_internal::_schd_ship_to_numIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_ship_to_num = null;
            model_internal::calculateSchd_ship_to_numIsValid();
        }
    }
    public function invalidateDependentOnCmpt_etyp():void
    {
        if (model_internal::_cmpt_etypIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpt_etyp = null;
            model_internal::calculateCmpt_etypIsValid();
        }
    }
    public function invalidateDependentOnCmpt_units():void
    {
        if (model_internal::_cmpt_unitsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpt_units = null;
            model_internal::calculateCmpt_unitsIsValid();
        }
    }
    public function invalidateDependentOnUnit():void
    {
        if (model_internal::_unitIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfUnit = null;
            model_internal::calculateUnitIsValid();
        }
    }
    public function invalidateDependentOnCmpt_n_seals():void
    {
        if (model_internal::_cmpt_n_sealsIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfCmpt_n_seals = null;
            model_internal::calculateCmpt_n_sealsIsValid();
        }
    }
    public function invalidateDependentOnSchedule():void
    {
        if (model_internal::_scheduleIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchedule = null;
            model_internal::calculateScheduleIsValid();
        }
    }
    public function invalidateDependentOnPrev_product_name():void
    {
        if (model_internal::_prev_product_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPrev_product_name = null;
            model_internal::calculatePrev_product_nameIsValid();
        }
    }
    public function invalidateDependentOnSchd_sold_to_num():void
    {
        if (model_internal::_schd_sold_to_numIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_sold_to_num = null;
            model_internal::calculateSchd_sold_to_numIsValid();
        }
    }
    public function invalidateDependentOnProduct_code():void
    {
        if (model_internal::_product_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProduct_code = null;
            model_internal::calculateProduct_codeIsValid();
        }
    }
    public function invalidateDependentOnSeq():void
    {
        if (model_internal::_seqIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSeq = null;
            model_internal::calculateSeqIsValid();
        }
    }
    public function invalidateDependentOnQty_preload():void
    {
        if (model_internal::_qty_preloadIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfQty_preload = null;
            model_internal::calculateQty_preloadIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get sched_deliv_numStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get sched_deliv_numValidator() : StyleValidator
    {
        return model_internal::_sched_deliv_numValidator;
    }

    model_internal function set _sched_deliv_numIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_sched_deliv_numIsValid;         
        if (oldValue !== value)
        {
            model_internal::_sched_deliv_numIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sched_deliv_numIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get sched_deliv_numIsValid():Boolean
    {
        if (!model_internal::_sched_deliv_numIsValidCacheInitialized)
        {
            model_internal::calculateSched_deliv_numIsValid();
        }

        return model_internal::_sched_deliv_numIsValid;
    }

    model_internal function calculateSched_deliv_numIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_sched_deliv_numValidator.validate(model_internal::_instance.sched_deliv_num)
        model_internal::_sched_deliv_numIsValid_der = (valRes.results == null);
        model_internal::_sched_deliv_numIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::sched_deliv_numValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::sched_deliv_numValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get sched_deliv_numValidationFailureMessages():Array
    {
        if (model_internal::_sched_deliv_numValidationFailureMessages == null)
            model_internal::calculateSched_deliv_numIsValid();

        return _sched_deliv_numValidationFailureMessages;
    }

    model_internal function set sched_deliv_numValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_sched_deliv_numValidationFailureMessages;

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
            model_internal::_sched_deliv_numValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sched_deliv_numValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get sched_sold_to_numStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get sched_sold_to_numValidator() : StyleValidator
    {
        return model_internal::_sched_sold_to_numValidator;
    }

    model_internal function set _sched_sold_to_numIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_sched_sold_to_numIsValid;         
        if (oldValue !== value)
        {
            model_internal::_sched_sold_to_numIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sched_sold_to_numIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get sched_sold_to_numIsValid():Boolean
    {
        if (!model_internal::_sched_sold_to_numIsValidCacheInitialized)
        {
            model_internal::calculateSched_sold_to_numIsValid();
        }

        return model_internal::_sched_sold_to_numIsValid;
    }

    model_internal function calculateSched_sold_to_numIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_sched_sold_to_numValidator.validate(model_internal::_instance.sched_sold_to_num)
        model_internal::_sched_sold_to_numIsValid_der = (valRes.results == null);
        model_internal::_sched_sold_to_numIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::sched_sold_to_numValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::sched_sold_to_numValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get sched_sold_to_numValidationFailureMessages():Array
    {
        if (model_internal::_sched_sold_to_numValidationFailureMessages == null)
            model_internal::calculateSched_sold_to_numIsValid();

        return _sched_sold_to_numValidationFailureMessages;
    }

    model_internal function set sched_sold_to_numValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_sched_sold_to_numValidationFailureMessages;

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
            model_internal::_sched_sold_to_numValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sched_sold_to_numValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get sched_ship_to_numStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get sched_ship_to_numValidator() : StyleValidator
    {
        return model_internal::_sched_ship_to_numValidator;
    }

    model_internal function set _sched_ship_to_numIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_sched_ship_to_numIsValid;         
        if (oldValue !== value)
        {
            model_internal::_sched_ship_to_numIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sched_ship_to_numIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get sched_ship_to_numIsValid():Boolean
    {
        if (!model_internal::_sched_ship_to_numIsValidCacheInitialized)
        {
            model_internal::calculateSched_ship_to_numIsValid();
        }

        return model_internal::_sched_ship_to_numIsValid;
    }

    model_internal function calculateSched_ship_to_numIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_sched_ship_to_numValidator.validate(model_internal::_instance.sched_ship_to_num)
        model_internal::_sched_ship_to_numIsValid_der = (valRes.results == null);
        model_internal::_sched_ship_to_numIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::sched_ship_to_numValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::sched_ship_to_numValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get sched_ship_to_numValidationFailureMessages():Array
    {
        if (model_internal::_sched_ship_to_numValidationFailureMessages == null)
            model_internal::calculateSched_ship_to_numIsValid();

        return _sched_ship_to_numValidationFailureMessages;
    }

    model_internal function set sched_ship_to_numValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_sched_ship_to_numValidationFailureMessages;

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
            model_internal::_sched_ship_to_numValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "sched_ship_to_numValidationFailureMessages", oldValue, value));
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
    public function get product_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get product_nameValidator() : StyleValidator
    {
        return model_internal::_product_nameValidator;
    }

    model_internal function set _product_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_product_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_product_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "product_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get product_nameIsValid():Boolean
    {
        if (!model_internal::_product_nameIsValidCacheInitialized)
        {
            model_internal::calculateProduct_nameIsValid();
        }

        return model_internal::_product_nameIsValid;
    }

    model_internal function calculateProduct_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_product_nameValidator.validate(model_internal::_instance.product_name)
        model_internal::_product_nameIsValid_der = (valRes.results == null);
        model_internal::_product_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::product_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::product_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get product_nameValidationFailureMessages():Array
    {
        if (model_internal::_product_nameValidationFailureMessages == null)
            model_internal::calculateProduct_nameIsValid();

        return _product_nameValidationFailureMessages;
    }

    model_internal function set product_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_product_nameValidationFailureMessages;

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
            model_internal::_product_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "product_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prev_product_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prev_product_codeValidator() : StyleValidator
    {
        return model_internal::_prev_product_codeValidator;
    }

    model_internal function set _prev_product_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prev_product_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prev_product_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prev_product_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prev_product_codeIsValid():Boolean
    {
        if (!model_internal::_prev_product_codeIsValidCacheInitialized)
        {
            model_internal::calculatePrev_product_codeIsValid();
        }

        return model_internal::_prev_product_codeIsValid;
    }

    model_internal function calculatePrev_product_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prev_product_codeValidator.validate(model_internal::_instance.prev_product_code)
        model_internal::_prev_product_codeIsValid_der = (valRes.results == null);
        model_internal::_prev_product_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prev_product_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prev_product_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prev_product_codeValidationFailureMessages():Array
    {
        if (model_internal::_prev_product_codeValidationFailureMessages == null)
            model_internal::calculatePrev_product_codeIsValid();

        return _prev_product_codeValidationFailureMessages;
    }

    model_internal function set prev_product_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prev_product_codeValidationFailureMessages;

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
            model_internal::_prev_product_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prev_product_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_deliv_numStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_deliv_numValidator() : StyleValidator
    {
        return model_internal::_schd_deliv_numValidator;
    }

    model_internal function set _schd_deliv_numIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_deliv_numIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_deliv_numIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_deliv_numIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_deliv_numIsValid():Boolean
    {
        if (!model_internal::_schd_deliv_numIsValidCacheInitialized)
        {
            model_internal::calculateSchd_deliv_numIsValid();
        }

        return model_internal::_schd_deliv_numIsValid;
    }

    model_internal function calculateSchd_deliv_numIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_deliv_numValidator.validate(model_internal::_instance.schd_deliv_num)
        model_internal::_schd_deliv_numIsValid_der = (valRes.results == null);
        model_internal::_schd_deliv_numIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_deliv_numValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_deliv_numValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_deliv_numValidationFailureMessages():Array
    {
        if (model_internal::_schd_deliv_numValidationFailureMessages == null)
            model_internal::calculateSchd_deliv_numIsValid();

        return _schd_deliv_numValidationFailureMessages;
    }

    model_internal function set schd_deliv_numValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_deliv_numValidationFailureMessages;

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
            model_internal::_schd_deliv_numValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_deliv_numValidationFailureMessages", oldValue, value));
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
    public function get order_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_idValidator() : StyleValidator
    {
        return model_internal::_order_idValidator;
    }

    model_internal function set _order_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_idIsValid():Boolean
    {
        if (!model_internal::_order_idIsValidCacheInitialized)
        {
            model_internal::calculateOrder_idIsValid();
        }

        return model_internal::_order_idIsValid;
    }

    model_internal function calculateOrder_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_idValidator.validate(model_internal::_instance.order_id)
        model_internal::_order_idIsValid_der = (valRes.results == null);
        model_internal::_order_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_idValidationFailureMessages():Array
    {
        if (model_internal::_order_idValidationFailureMessages == null)
            model_internal::calculateOrder_idIsValid();

        return _order_idValidationFailureMessages;
    }

    model_internal function set order_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_idValidationFailureMessages;

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
            model_internal::_order_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_ship_to_numStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_ship_to_numValidator() : StyleValidator
    {
        return model_internal::_schd_ship_to_numValidator;
    }

    model_internal function set _schd_ship_to_numIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_ship_to_numIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_ship_to_numIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_ship_to_numIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_ship_to_numIsValid():Boolean
    {
        if (!model_internal::_schd_ship_to_numIsValidCacheInitialized)
        {
            model_internal::calculateSchd_ship_to_numIsValid();
        }

        return model_internal::_schd_ship_to_numIsValid;
    }

    model_internal function calculateSchd_ship_to_numIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_ship_to_numValidator.validate(model_internal::_instance.schd_ship_to_num)
        model_internal::_schd_ship_to_numIsValid_der = (valRes.results == null);
        model_internal::_schd_ship_to_numIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_ship_to_numValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_ship_to_numValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_ship_to_numValidationFailureMessages():Array
    {
        if (model_internal::_schd_ship_to_numValidationFailureMessages == null)
            model_internal::calculateSchd_ship_to_numIsValid();

        return _schd_ship_to_numValidationFailureMessages;
    }

    model_internal function set schd_ship_to_numValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_ship_to_numValidationFailureMessages;

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
            model_internal::_schd_ship_to_numValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_ship_to_numValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpt_etypStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpt_etypValidator() : StyleValidator
    {
        return model_internal::_cmpt_etypValidator;
    }

    model_internal function set _cmpt_etypIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpt_etypIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpt_etypIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_etypIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_etypIsValid():Boolean
    {
        if (!model_internal::_cmpt_etypIsValidCacheInitialized)
        {
            model_internal::calculateCmpt_etypIsValid();
        }

        return model_internal::_cmpt_etypIsValid;
    }

    model_internal function calculateCmpt_etypIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpt_etypValidator.validate(model_internal::_instance.cmpt_etyp)
        model_internal::_cmpt_etypIsValid_der = (valRes.results == null);
        model_internal::_cmpt_etypIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpt_etypValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpt_etypValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_etypValidationFailureMessages():Array
    {
        if (model_internal::_cmpt_etypValidationFailureMessages == null)
            model_internal::calculateCmpt_etypIsValid();

        return _cmpt_etypValidationFailureMessages;
    }

    model_internal function set cmpt_etypValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpt_etypValidationFailureMessages;

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
            model_internal::_cmpt_etypValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_etypValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpt_unitsStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpt_unitsValidator() : StyleValidator
    {
        return model_internal::_cmpt_unitsValidator;
    }

    model_internal function set _cmpt_unitsIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpt_unitsIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpt_unitsIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_unitsIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_unitsIsValid():Boolean
    {
        if (!model_internal::_cmpt_unitsIsValidCacheInitialized)
        {
            model_internal::calculateCmpt_unitsIsValid();
        }

        return model_internal::_cmpt_unitsIsValid;
    }

    model_internal function calculateCmpt_unitsIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpt_unitsValidator.validate(model_internal::_instance.cmpt_units)
        model_internal::_cmpt_unitsIsValid_der = (valRes.results == null);
        model_internal::_cmpt_unitsIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpt_unitsValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpt_unitsValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_unitsValidationFailureMessages():Array
    {
        if (model_internal::_cmpt_unitsValidationFailureMessages == null)
            model_internal::calculateCmpt_unitsIsValid();

        return _cmpt_unitsValidationFailureMessages;
    }

    model_internal function set cmpt_unitsValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpt_unitsValidationFailureMessages;

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
            model_internal::_cmpt_unitsValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_unitsValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get unitStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get unitValidator() : StyleValidator
    {
        return model_internal::_unitValidator;
    }

    model_internal function set _unitIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_unitIsValid;         
        if (oldValue !== value)
        {
            model_internal::_unitIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unitIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get unitIsValid():Boolean
    {
        if (!model_internal::_unitIsValidCacheInitialized)
        {
            model_internal::calculateUnitIsValid();
        }

        return model_internal::_unitIsValid;
    }

    model_internal function calculateUnitIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_unitValidator.validate(model_internal::_instance.unit)
        model_internal::_unitIsValid_der = (valRes.results == null);
        model_internal::_unitIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::unitValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::unitValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get unitValidationFailureMessages():Array
    {
        if (model_internal::_unitValidationFailureMessages == null)
            model_internal::calculateUnitIsValid();

        return _unitValidationFailureMessages;
    }

    model_internal function set unitValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_unitValidationFailureMessages;

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
            model_internal::_unitValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "unitValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get cmpt_n_sealsStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get cmpt_n_sealsValidator() : StyleValidator
    {
        return model_internal::_cmpt_n_sealsValidator;
    }

    model_internal function set _cmpt_n_sealsIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_cmpt_n_sealsIsValid;         
        if (oldValue !== value)
        {
            model_internal::_cmpt_n_sealsIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_n_sealsIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_n_sealsIsValid():Boolean
    {
        if (!model_internal::_cmpt_n_sealsIsValidCacheInitialized)
        {
            model_internal::calculateCmpt_n_sealsIsValid();
        }

        return model_internal::_cmpt_n_sealsIsValid;
    }

    model_internal function calculateCmpt_n_sealsIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_cmpt_n_sealsValidator.validate(model_internal::_instance.cmpt_n_seals)
        model_internal::_cmpt_n_sealsIsValid_der = (valRes.results == null);
        model_internal::_cmpt_n_sealsIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::cmpt_n_sealsValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::cmpt_n_sealsValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get cmpt_n_sealsValidationFailureMessages():Array
    {
        if (model_internal::_cmpt_n_sealsValidationFailureMessages == null)
            model_internal::calculateCmpt_n_sealsIsValid();

        return _cmpt_n_sealsValidationFailureMessages;
    }

    model_internal function set cmpt_n_sealsValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_cmpt_n_sealsValidationFailureMessages;

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
            model_internal::_cmpt_n_sealsValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "cmpt_n_sealsValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get scheduleStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get scheduleValidator() : StyleValidator
    {
        return model_internal::_scheduleValidator;
    }

    model_internal function set _scheduleIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_scheduleIsValid;         
        if (oldValue !== value)
        {
            model_internal::_scheduleIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "scheduleIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get scheduleIsValid():Boolean
    {
        if (!model_internal::_scheduleIsValidCacheInitialized)
        {
            model_internal::calculateScheduleIsValid();
        }

        return model_internal::_scheduleIsValid;
    }

    model_internal function calculateScheduleIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_scheduleValidator.validate(model_internal::_instance.schedule)
        model_internal::_scheduleIsValid_der = (valRes.results == null);
        model_internal::_scheduleIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::scheduleValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::scheduleValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get scheduleValidationFailureMessages():Array
    {
        if (model_internal::_scheduleValidationFailureMessages == null)
            model_internal::calculateScheduleIsValid();

        return _scheduleValidationFailureMessages;
    }

    model_internal function set scheduleValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_scheduleValidationFailureMessages;

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
            model_internal::_scheduleValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "scheduleValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prev_product_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prev_product_nameValidator() : StyleValidator
    {
        return model_internal::_prev_product_nameValidator;
    }

    model_internal function set _prev_product_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prev_product_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prev_product_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prev_product_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prev_product_nameIsValid():Boolean
    {
        if (!model_internal::_prev_product_nameIsValidCacheInitialized)
        {
            model_internal::calculatePrev_product_nameIsValid();
        }

        return model_internal::_prev_product_nameIsValid;
    }

    model_internal function calculatePrev_product_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prev_product_nameValidator.validate(model_internal::_instance.prev_product_name)
        model_internal::_prev_product_nameIsValid_der = (valRes.results == null);
        model_internal::_prev_product_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prev_product_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prev_product_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prev_product_nameValidationFailureMessages():Array
    {
        if (model_internal::_prev_product_nameValidationFailureMessages == null)
            model_internal::calculatePrev_product_nameIsValid();

        return _prev_product_nameValidationFailureMessages;
    }

    model_internal function set prev_product_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prev_product_nameValidationFailureMessages;

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
            model_internal::_prev_product_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prev_product_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schd_sold_to_numStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schd_sold_to_numValidator() : StyleValidator
    {
        return model_internal::_schd_sold_to_numValidator;
    }

    model_internal function set _schd_sold_to_numIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schd_sold_to_numIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schd_sold_to_numIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_sold_to_numIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schd_sold_to_numIsValid():Boolean
    {
        if (!model_internal::_schd_sold_to_numIsValidCacheInitialized)
        {
            model_internal::calculateSchd_sold_to_numIsValid();
        }

        return model_internal::_schd_sold_to_numIsValid;
    }

    model_internal function calculateSchd_sold_to_numIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schd_sold_to_numValidator.validate(model_internal::_instance.schd_sold_to_num)
        model_internal::_schd_sold_to_numIsValid_der = (valRes.results == null);
        model_internal::_schd_sold_to_numIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schd_sold_to_numValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schd_sold_to_numValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schd_sold_to_numValidationFailureMessages():Array
    {
        if (model_internal::_schd_sold_to_numValidationFailureMessages == null)
            model_internal::calculateSchd_sold_to_numIsValid();

        return _schd_sold_to_numValidationFailureMessages;
    }

    model_internal function set schd_sold_to_numValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schd_sold_to_numValidationFailureMessages;

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
            model_internal::_schd_sold_to_numValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schd_sold_to_numValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get product_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get product_codeValidator() : StyleValidator
    {
        return model_internal::_product_codeValidator;
    }

    model_internal function set _product_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_product_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_product_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "product_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get product_codeIsValid():Boolean
    {
        if (!model_internal::_product_codeIsValidCacheInitialized)
        {
            model_internal::calculateProduct_codeIsValid();
        }

        return model_internal::_product_codeIsValid;
    }

    model_internal function calculateProduct_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_product_codeValidator.validate(model_internal::_instance.product_code)
        model_internal::_product_codeIsValid_der = (valRes.results == null);
        model_internal::_product_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::product_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::product_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get product_codeValidationFailureMessages():Array
    {
        if (model_internal::_product_codeValidationFailureMessages == null)
            model_internal::calculateProduct_codeIsValid();

        return _product_codeValidationFailureMessages;
    }

    model_internal function set product_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_product_codeValidationFailureMessages;

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
            model_internal::_product_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "product_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get seqStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get seqValidator() : StyleValidator
    {
        return model_internal::_seqValidator;
    }

    model_internal function set _seqIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_seqIsValid;         
        if (oldValue !== value)
        {
            model_internal::_seqIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "seqIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get seqIsValid():Boolean
    {
        if (!model_internal::_seqIsValidCacheInitialized)
        {
            model_internal::calculateSeqIsValid();
        }

        return model_internal::_seqIsValid;
    }

    model_internal function calculateSeqIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_seqValidator.validate(model_internal::_instance.seq)
        model_internal::_seqIsValid_der = (valRes.results == null);
        model_internal::_seqIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::seqValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::seqValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get seqValidationFailureMessages():Array
    {
        if (model_internal::_seqValidationFailureMessages == null)
            model_internal::calculateSeqIsValid();

        return _seqValidationFailureMessages;
    }

    model_internal function set seqValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_seqValidationFailureMessages;

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
            model_internal::_seqValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "seqValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get qty_preloadStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get qty_preloadValidator() : StyleValidator
    {
        return model_internal::_qty_preloadValidator;
    }

    model_internal function set _qty_preloadIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_qty_preloadIsValid;         
        if (oldValue !== value)
        {
            model_internal::_qty_preloadIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_preloadIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get qty_preloadIsValid():Boolean
    {
        if (!model_internal::_qty_preloadIsValidCacheInitialized)
        {
            model_internal::calculateQty_preloadIsValid();
        }

        return model_internal::_qty_preloadIsValid;
    }

    model_internal function calculateQty_preloadIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_qty_preloadValidator.validate(model_internal::_instance.qty_preload)
        model_internal::_qty_preloadIsValid_der = (valRes.results == null);
        model_internal::_qty_preloadIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::qty_preloadValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::qty_preloadValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get qty_preloadValidationFailureMessages():Array
    {
        if (model_internal::_qty_preloadValidationFailureMessages == null)
            model_internal::calculateQty_preloadIsValid();

        return _qty_preloadValidationFailureMessages;
    }

    model_internal function set qty_preloadValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_qty_preloadValidationFailureMessages;

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
            model_internal::_qty_preloadValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "qty_preloadValidationFailureMessages", oldValue, value));
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
            case("sched_deliv_num"):
            {
                return sched_deliv_numValidationFailureMessages;
            }
            case("sched_sold_to_num"):
            {
                return sched_sold_to_numValidationFailureMessages;
            }
            case("sched_ship_to_num"):
            {
                return sched_ship_to_numValidationFailureMessages;
            }
            case("cmpt_no"):
            {
                return cmpt_noValidationFailureMessages;
            }
            case("cmpt_capacit"):
            {
                return cmpt_capacitValidationFailureMessages;
            }
            case("product_name"):
            {
                return product_nameValidationFailureMessages;
            }
            case("prev_product_code"):
            {
                return prev_product_codeValidationFailureMessages;
            }
            case("schd_deliv_num"):
            {
                return schd_deliv_numValidationFailureMessages;
            }
            case("etyp_title"):
            {
                return etyp_titleValidationFailureMessages;
            }
            case("order_id"):
            {
                return order_idValidationFailureMessages;
            }
            case("schd_ship_to_num"):
            {
                return schd_ship_to_numValidationFailureMessages;
            }
            case("cmpt_etyp"):
            {
                return cmpt_etypValidationFailureMessages;
            }
            case("cmpt_units"):
            {
                return cmpt_unitsValidationFailureMessages;
            }
            case("unit"):
            {
                return unitValidationFailureMessages;
            }
            case("cmpt_n_seals"):
            {
                return cmpt_n_sealsValidationFailureMessages;
            }
            case("schedule"):
            {
                return scheduleValidationFailureMessages;
            }
            case("prev_product_name"):
            {
                return prev_product_nameValidationFailureMessages;
            }
            case("schd_sold_to_num"):
            {
                return schd_sold_to_numValidationFailureMessages;
            }
            case("product_code"):
            {
                return product_codeValidationFailureMessages;
            }
            case("seq"):
            {
                return seqValidationFailureMessages;
            }
            case("qty_preload"):
            {
                return qty_preloadValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
