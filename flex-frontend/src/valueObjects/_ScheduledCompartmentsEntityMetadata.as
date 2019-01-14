
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
internal class _ScheduledCompartmentsEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("preld_qty", "prev_prodcode", "eqpt_code", "tnkr_cmpt_no", "load_qty", "cmpt_capacit", "shlsload_load_id", "prev_prod", "schd_deliv_num", "schd_ship_to_num", "prod_code", "cmpt_units", "unit", "schd_sold_to_num", "tc_eqpt", "allowed_qty", "order_cust_ordno", "armcode", "arm_name", "schorder_qty", "order_ref_code", "tlr_cmpt", "prod_name");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("preld_qty", "prev_prodcode", "eqpt_code", "tnkr_cmpt_no", "load_qty", "cmpt_capacit", "shlsload_load_id", "prev_prod", "schd_deliv_num", "schd_ship_to_num", "prod_code", "cmpt_units", "unit", "schd_sold_to_num", "tc_eqpt", "allowed_qty", "order_cust_ordno", "armcode", "arm_name", "schorder_qty", "order_ref_code", "tlr_cmpt", "prod_name");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("preld_qty", "prev_prodcode", "eqpt_code", "tnkr_cmpt_no", "load_qty", "cmpt_capacit", "shlsload_load_id", "prev_prod", "schd_deliv_num", "schd_ship_to_num", "prod_code", "cmpt_units", "unit", "schd_sold_to_num", "tc_eqpt", "allowed_qty", "order_cust_ordno", "armcode", "arm_name", "schorder_qty", "order_ref_code", "tlr_cmpt", "prod_name");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("preld_qty", "prev_prodcode", "eqpt_code", "tnkr_cmpt_no", "load_qty", "cmpt_capacit", "shlsload_load_id", "prev_prod", "schd_deliv_num", "schd_ship_to_num", "prod_code", "cmpt_units", "unit", "schd_sold_to_num", "tc_eqpt", "allowed_qty", "order_cust_ordno", "armcode", "arm_name", "schorder_qty", "order_ref_code", "tlr_cmpt", "prod_name");
    model_internal static var sourceProperties:Array = emptyArray
    model_internal static var nonDerivedProperties:Array = new Array("preld_qty", "prev_prodcode", "eqpt_code", "tnkr_cmpt_no", "load_qty", "cmpt_capacit", "shlsload_load_id", "prev_prod", "schd_deliv_num", "schd_ship_to_num", "prod_code", "cmpt_units", "unit", "schd_sold_to_num", "tc_eqpt", "allowed_qty", "order_cust_ordno", "armcode", "arm_name", "schorder_qty", "order_ref_code", "tlr_cmpt", "prod_name");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "ScheduledCompartments";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();
    model_internal static var propertyTypeMap:Object;

    
    model_internal var _preld_qtyIsValid:Boolean;
    model_internal var _preld_qtyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _preld_qtyIsValidCacheInitialized:Boolean = false;
    model_internal var _preld_qtyValidationFailureMessages:Array;
    
    model_internal var _prev_prodcodeIsValid:Boolean;
    model_internal var _prev_prodcodeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prev_prodcodeIsValidCacheInitialized:Boolean = false;
    model_internal var _prev_prodcodeValidationFailureMessages:Array;
    
    model_internal var _eqpt_codeIsValid:Boolean;
    model_internal var _eqpt_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _eqpt_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _eqpt_codeValidationFailureMessages:Array;
    
    model_internal var _tnkr_cmpt_noIsValid:Boolean;
    model_internal var _tnkr_cmpt_noValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tnkr_cmpt_noIsValidCacheInitialized:Boolean = false;
    model_internal var _tnkr_cmpt_noValidationFailureMessages:Array;
    
    model_internal var _load_qtyIsValid:Boolean;
    model_internal var _load_qtyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _load_qtyIsValidCacheInitialized:Boolean = false;
    model_internal var _load_qtyValidationFailureMessages:Array;
    
    model_internal var _cmpt_capacitIsValid:Boolean;
    model_internal var _cmpt_capacitValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpt_capacitIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpt_capacitValidationFailureMessages:Array;
    
    model_internal var _shlsload_load_idIsValid:Boolean;
    model_internal var _shlsload_load_idValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _shlsload_load_idIsValidCacheInitialized:Boolean = false;
    model_internal var _shlsload_load_idValidationFailureMessages:Array;
    
    model_internal var _prev_prodIsValid:Boolean;
    model_internal var _prev_prodValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prev_prodIsValidCacheInitialized:Boolean = false;
    model_internal var _prev_prodValidationFailureMessages:Array;
    
    model_internal var _schd_deliv_numIsValid:Boolean;
    model_internal var _schd_deliv_numValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_deliv_numIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_deliv_numValidationFailureMessages:Array;
    
    model_internal var _schd_ship_to_numIsValid:Boolean;
    model_internal var _schd_ship_to_numValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_ship_to_numIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_ship_to_numValidationFailureMessages:Array;
    
    model_internal var _prod_codeIsValid:Boolean;
    model_internal var _prod_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_codeValidationFailureMessages:Array;
    
    model_internal var _cmpt_unitsIsValid:Boolean;
    model_internal var _cmpt_unitsValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _cmpt_unitsIsValidCacheInitialized:Boolean = false;
    model_internal var _cmpt_unitsValidationFailureMessages:Array;
    
    model_internal var _unitIsValid:Boolean;
    model_internal var _unitValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _unitIsValidCacheInitialized:Boolean = false;
    model_internal var _unitValidationFailureMessages:Array;
    
    model_internal var _schd_sold_to_numIsValid:Boolean;
    model_internal var _schd_sold_to_numValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schd_sold_to_numIsValidCacheInitialized:Boolean = false;
    model_internal var _schd_sold_to_numValidationFailureMessages:Array;
    
    model_internal var _tc_eqptIsValid:Boolean;
    model_internal var _tc_eqptValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tc_eqptIsValidCacheInitialized:Boolean = false;
    model_internal var _tc_eqptValidationFailureMessages:Array;
    
    model_internal var _allowed_qtyIsValid:Boolean;
    model_internal var _allowed_qtyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _allowed_qtyIsValidCacheInitialized:Boolean = false;
    model_internal var _allowed_qtyValidationFailureMessages:Array;
    
    model_internal var _order_cust_ordnoIsValid:Boolean;
    model_internal var _order_cust_ordnoValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_cust_ordnoIsValidCacheInitialized:Boolean = false;
    model_internal var _order_cust_ordnoValidationFailureMessages:Array;
    
    model_internal var _armcodeIsValid:Boolean;
    model_internal var _armcodeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _armcodeIsValidCacheInitialized:Boolean = false;
    model_internal var _armcodeValidationFailureMessages:Array;
    
    model_internal var _arm_nameIsValid:Boolean;
    model_internal var _arm_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _arm_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _arm_nameValidationFailureMessages:Array;
    
    model_internal var _schorder_qtyIsValid:Boolean;
    model_internal var _schorder_qtyValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _schorder_qtyIsValidCacheInitialized:Boolean = false;
    model_internal var _schorder_qtyValidationFailureMessages:Array;
    
    model_internal var _order_ref_codeIsValid:Boolean;
    model_internal var _order_ref_codeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _order_ref_codeIsValidCacheInitialized:Boolean = false;
    model_internal var _order_ref_codeValidationFailureMessages:Array;
    
    model_internal var _tlr_cmptIsValid:Boolean;
    model_internal var _tlr_cmptValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _tlr_cmptIsValidCacheInitialized:Boolean = false;
    model_internal var _tlr_cmptValidationFailureMessages:Array;
    
    model_internal var _prod_nameIsValid:Boolean;
    model_internal var _prod_nameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _prod_nameIsValidCacheInitialized:Boolean = false;
    model_internal var _prod_nameValidationFailureMessages:Array;

    model_internal var _instance:_Super_ScheduledCompartments;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _ScheduledCompartmentsEntityMetadata(value : _Super_ScheduledCompartments)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // dependents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["preld_qty"] = new Array();
            model_internal::dependentsOnMap["prev_prodcode"] = new Array();
            model_internal::dependentsOnMap["eqpt_code"] = new Array();
            model_internal::dependentsOnMap["tnkr_cmpt_no"] = new Array();
            model_internal::dependentsOnMap["load_qty"] = new Array();
            model_internal::dependentsOnMap["cmpt_capacit"] = new Array();
            model_internal::dependentsOnMap["shlsload_load_id"] = new Array();
            model_internal::dependentsOnMap["prev_prod"] = new Array();
            model_internal::dependentsOnMap["schd_deliv_num"] = new Array();
            model_internal::dependentsOnMap["schd_ship_to_num"] = new Array();
            model_internal::dependentsOnMap["prod_code"] = new Array();
            model_internal::dependentsOnMap["cmpt_units"] = new Array();
            model_internal::dependentsOnMap["unit"] = new Array();
            model_internal::dependentsOnMap["schd_sold_to_num"] = new Array();
            model_internal::dependentsOnMap["tc_eqpt"] = new Array();
            model_internal::dependentsOnMap["allowed_qty"] = new Array();
            model_internal::dependentsOnMap["order_cust_ordno"] = new Array();
            model_internal::dependentsOnMap["armcode"] = new Array();
            model_internal::dependentsOnMap["arm_name"] = new Array();
            model_internal::dependentsOnMap["schorder_qty"] = new Array();
            model_internal::dependentsOnMap["order_ref_code"] = new Array();
            model_internal::dependentsOnMap["tlr_cmpt"] = new Array();
            model_internal::dependentsOnMap["prod_name"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object();
        }

        // Property type Map
        model_internal::propertyTypeMap = new Object();
        model_internal::propertyTypeMap["preld_qty"] = "Object";
        model_internal::propertyTypeMap["prev_prodcode"] = "Object";
        model_internal::propertyTypeMap["eqpt_code"] = "String";
        model_internal::propertyTypeMap["tnkr_cmpt_no"] = "String";
        model_internal::propertyTypeMap["load_qty"] = "String";
        model_internal::propertyTypeMap["cmpt_capacit"] = "String";
        model_internal::propertyTypeMap["shlsload_load_id"] = "String";
        model_internal::propertyTypeMap["prev_prod"] = "Object";
        model_internal::propertyTypeMap["schd_deliv_num"] = "Object";
        model_internal::propertyTypeMap["schd_ship_to_num"] = "Object";
        model_internal::propertyTypeMap["prod_code"] = "String";
        model_internal::propertyTypeMap["cmpt_units"] = "String";
        model_internal::propertyTypeMap["unit"] = "String";
        model_internal::propertyTypeMap["schd_sold_to_num"] = "Object";
        model_internal::propertyTypeMap["tc_eqpt"] = "String";
        model_internal::propertyTypeMap["allowed_qty"] = "String";
        model_internal::propertyTypeMap["order_cust_ordno"] = "Object";
        model_internal::propertyTypeMap["armcode"] = "Object";
        model_internal::propertyTypeMap["arm_name"] = "Object";
        model_internal::propertyTypeMap["schorder_qty"] = "String";
        model_internal::propertyTypeMap["order_ref_code"] = "Object";
        model_internal::propertyTypeMap["tlr_cmpt"] = "String";
        model_internal::propertyTypeMap["prod_name"] = "String";

        model_internal::_instance = value;
        model_internal::_preld_qtyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPreld_qty);
        model_internal::_preld_qtyValidator.required = true;
        model_internal::_preld_qtyValidator.requiredFieldError = "preld_qty is required";
        //model_internal::_preld_qtyValidator.source = model_internal::_instance;
        //model_internal::_preld_qtyValidator.property = "preld_qty";
        model_internal::_prev_prodcodeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPrev_prodcode);
        model_internal::_prev_prodcodeValidator.required = true;
        model_internal::_prev_prodcodeValidator.requiredFieldError = "prev_prodcode is required";
        //model_internal::_prev_prodcodeValidator.source = model_internal::_instance;
        //model_internal::_prev_prodcodeValidator.property = "prev_prodcode";
        model_internal::_eqpt_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForEqpt_code);
        model_internal::_eqpt_codeValidator.required = true;
        model_internal::_eqpt_codeValidator.requiredFieldError = "eqpt_code is required";
        //model_internal::_eqpt_codeValidator.source = model_internal::_instance;
        //model_internal::_eqpt_codeValidator.property = "eqpt_code";
        model_internal::_tnkr_cmpt_noValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTnkr_cmpt_no);
        model_internal::_tnkr_cmpt_noValidator.required = true;
        model_internal::_tnkr_cmpt_noValidator.requiredFieldError = "tnkr_cmpt_no is required";
        //model_internal::_tnkr_cmpt_noValidator.source = model_internal::_instance;
        //model_internal::_tnkr_cmpt_noValidator.property = "tnkr_cmpt_no";
        model_internal::_load_qtyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForLoad_qty);
        model_internal::_load_qtyValidator.required = true;
        model_internal::_load_qtyValidator.requiredFieldError = "load_qty is required";
        //model_internal::_load_qtyValidator.source = model_internal::_instance;
        //model_internal::_load_qtyValidator.property = "load_qty";
        model_internal::_cmpt_capacitValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForCmpt_capacit);
        model_internal::_cmpt_capacitValidator.required = true;
        model_internal::_cmpt_capacitValidator.requiredFieldError = "cmpt_capacit is required";
        //model_internal::_cmpt_capacitValidator.source = model_internal::_instance;
        //model_internal::_cmpt_capacitValidator.property = "cmpt_capacit";
        model_internal::_shlsload_load_idValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForShlsload_load_id);
        model_internal::_shlsload_load_idValidator.required = true;
        model_internal::_shlsload_load_idValidator.requiredFieldError = "shlsload_load_id is required";
        //model_internal::_shlsload_load_idValidator.source = model_internal::_instance;
        //model_internal::_shlsload_load_idValidator.property = "shlsload_load_id";
        model_internal::_prev_prodValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPrev_prod);
        model_internal::_prev_prodValidator.required = true;
        model_internal::_prev_prodValidator.requiredFieldError = "prev_prod is required";
        //model_internal::_prev_prodValidator.source = model_internal::_instance;
        //model_internal::_prev_prodValidator.property = "prev_prod";
        model_internal::_schd_deliv_numValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_deliv_num);
        model_internal::_schd_deliv_numValidator.required = true;
        model_internal::_schd_deliv_numValidator.requiredFieldError = "schd_deliv_num is required";
        //model_internal::_schd_deliv_numValidator.source = model_internal::_instance;
        //model_internal::_schd_deliv_numValidator.property = "schd_deliv_num";
        model_internal::_schd_ship_to_numValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_ship_to_num);
        model_internal::_schd_ship_to_numValidator.required = true;
        model_internal::_schd_ship_to_numValidator.requiredFieldError = "schd_ship_to_num is required";
        //model_internal::_schd_ship_to_numValidator.source = model_internal::_instance;
        //model_internal::_schd_ship_to_numValidator.property = "schd_ship_to_num";
        model_internal::_prod_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_code);
        model_internal::_prod_codeValidator.required = true;
        model_internal::_prod_codeValidator.requiredFieldError = "prod_code is required";
        //model_internal::_prod_codeValidator.source = model_internal::_instance;
        //model_internal::_prod_codeValidator.property = "prod_code";
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
        model_internal::_schd_sold_to_numValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchd_sold_to_num);
        model_internal::_schd_sold_to_numValidator.required = true;
        model_internal::_schd_sold_to_numValidator.requiredFieldError = "schd_sold_to_num is required";
        //model_internal::_schd_sold_to_numValidator.source = model_internal::_instance;
        //model_internal::_schd_sold_to_numValidator.property = "schd_sold_to_num";
        model_internal::_tc_eqptValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTc_eqpt);
        model_internal::_tc_eqptValidator.required = true;
        model_internal::_tc_eqptValidator.requiredFieldError = "tc_eqpt is required";
        //model_internal::_tc_eqptValidator.source = model_internal::_instance;
        //model_internal::_tc_eqptValidator.property = "tc_eqpt";
        model_internal::_allowed_qtyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForAllowed_qty);
        model_internal::_allowed_qtyValidator.required = true;
        model_internal::_allowed_qtyValidator.requiredFieldError = "allowed_qty is required";
        //model_internal::_allowed_qtyValidator.source = model_internal::_instance;
        //model_internal::_allowed_qtyValidator.property = "allowed_qty";
        model_internal::_order_cust_ordnoValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_cust_ordno);
        model_internal::_order_cust_ordnoValidator.required = true;
        model_internal::_order_cust_ordnoValidator.requiredFieldError = "order_cust_ordno is required";
        //model_internal::_order_cust_ordnoValidator.source = model_internal::_instance;
        //model_internal::_order_cust_ordnoValidator.property = "order_cust_ordno";
        model_internal::_armcodeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForArmcode);
        model_internal::_armcodeValidator.required = true;
        model_internal::_armcodeValidator.requiredFieldError = "armcode is required";
        //model_internal::_armcodeValidator.source = model_internal::_instance;
        //model_internal::_armcodeValidator.property = "armcode";
        model_internal::_arm_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForArm_name);
        model_internal::_arm_nameValidator.required = true;
        model_internal::_arm_nameValidator.requiredFieldError = "arm_name is required";
        //model_internal::_arm_nameValidator.source = model_internal::_instance;
        //model_internal::_arm_nameValidator.property = "arm_name";
        model_internal::_schorder_qtyValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForSchorder_qty);
        model_internal::_schorder_qtyValidator.required = true;
        model_internal::_schorder_qtyValidator.requiredFieldError = "schorder_qty is required";
        //model_internal::_schorder_qtyValidator.source = model_internal::_instance;
        //model_internal::_schorder_qtyValidator.property = "schorder_qty";
        model_internal::_order_ref_codeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForOrder_ref_code);
        model_internal::_order_ref_codeValidator.required = true;
        model_internal::_order_ref_codeValidator.requiredFieldError = "order_ref_code is required";
        //model_internal::_order_ref_codeValidator.source = model_internal::_instance;
        //model_internal::_order_ref_codeValidator.property = "order_ref_code";
        model_internal::_tlr_cmptValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForTlr_cmpt);
        model_internal::_tlr_cmptValidator.required = true;
        model_internal::_tlr_cmptValidator.requiredFieldError = "tlr_cmpt is required";
        //model_internal::_tlr_cmptValidator.source = model_internal::_instance;
        //model_internal::_tlr_cmptValidator.property = "tlr_cmpt";
        model_internal::_prod_nameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForProd_name);
        model_internal::_prod_nameValidator.required = true;
        model_internal::_prod_nameValidator.requiredFieldError = "prod_name is required";
        //model_internal::_prod_nameValidator.source = model_internal::_instance;
        //model_internal::_prod_nameValidator.property = "prod_name";
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
            throw new Error(propertyName + " is not a data property of entity ScheduledCompartments");
            
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
            throw new Error(propertyName + " is not a collection property of entity ScheduledCompartments");

        return model_internal::collectionBaseMap[propertyName];
    }
    
    override public function getPropertyType(propertyName:String):String
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a property of ScheduledCompartments");

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
            throw new Error(propertyName + " does not exist for entity ScheduledCompartments");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::nonDerivedProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a modifiable property of entity ScheduledCompartments");
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
            throw new Error(propertyName + " does not exist for entity ScheduledCompartments");
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
    public function get isPreld_qtyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPrev_prodcodeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isEqpt_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTnkr_cmpt_noAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isLoad_qtyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isCmpt_capacitAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isShlsload_load_idAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPrev_prodAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_deliv_numAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchd_ship_to_numAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProd_codeAvailable():Boolean
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
    public function get isSchd_sold_to_numAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTc_eqptAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isAllowed_qtyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_cust_ordnoAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isArmcodeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isArm_nameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isSchorder_qtyAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isOrder_ref_codeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isTlr_cmptAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isProd_nameAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnPreld_qty():void
    {
        if (model_internal::_preld_qtyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPreld_qty = null;
            model_internal::calculatePreld_qtyIsValid();
        }
    }
    public function invalidateDependentOnPrev_prodcode():void
    {
        if (model_internal::_prev_prodcodeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPrev_prodcode = null;
            model_internal::calculatePrev_prodcodeIsValid();
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
    public function invalidateDependentOnTnkr_cmpt_no():void
    {
        if (model_internal::_tnkr_cmpt_noIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTnkr_cmpt_no = null;
            model_internal::calculateTnkr_cmpt_noIsValid();
        }
    }
    public function invalidateDependentOnLoad_qty():void
    {
        if (model_internal::_load_qtyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfLoad_qty = null;
            model_internal::calculateLoad_qtyIsValid();
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
    public function invalidateDependentOnShlsload_load_id():void
    {
        if (model_internal::_shlsload_load_idIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfShlsload_load_id = null;
            model_internal::calculateShlsload_load_idIsValid();
        }
    }
    public function invalidateDependentOnPrev_prod():void
    {
        if (model_internal::_prev_prodIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPrev_prod = null;
            model_internal::calculatePrev_prodIsValid();
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
    public function invalidateDependentOnSchd_ship_to_num():void
    {
        if (model_internal::_schd_ship_to_numIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_ship_to_num = null;
            model_internal::calculateSchd_ship_to_numIsValid();
        }
    }
    public function invalidateDependentOnProd_code():void
    {
        if (model_internal::_prod_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_code = null;
            model_internal::calculateProd_codeIsValid();
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
    public function invalidateDependentOnSchd_sold_to_num():void
    {
        if (model_internal::_schd_sold_to_numIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchd_sold_to_num = null;
            model_internal::calculateSchd_sold_to_numIsValid();
        }
    }
    public function invalidateDependentOnTc_eqpt():void
    {
        if (model_internal::_tc_eqptIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTc_eqpt = null;
            model_internal::calculateTc_eqptIsValid();
        }
    }
    public function invalidateDependentOnAllowed_qty():void
    {
        if (model_internal::_allowed_qtyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfAllowed_qty = null;
            model_internal::calculateAllowed_qtyIsValid();
        }
    }
    public function invalidateDependentOnOrder_cust_ordno():void
    {
        if (model_internal::_order_cust_ordnoIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_cust_ordno = null;
            model_internal::calculateOrder_cust_ordnoIsValid();
        }
    }
    public function invalidateDependentOnArmcode():void
    {
        if (model_internal::_armcodeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfArmcode = null;
            model_internal::calculateArmcodeIsValid();
        }
    }
    public function invalidateDependentOnArm_name():void
    {
        if (model_internal::_arm_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfArm_name = null;
            model_internal::calculateArm_nameIsValid();
        }
    }
    public function invalidateDependentOnSchorder_qty():void
    {
        if (model_internal::_schorder_qtyIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfSchorder_qty = null;
            model_internal::calculateSchorder_qtyIsValid();
        }
    }
    public function invalidateDependentOnOrder_ref_code():void
    {
        if (model_internal::_order_ref_codeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfOrder_ref_code = null;
            model_internal::calculateOrder_ref_codeIsValid();
        }
    }
    public function invalidateDependentOnTlr_cmpt():void
    {
        if (model_internal::_tlr_cmptIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfTlr_cmpt = null;
            model_internal::calculateTlr_cmptIsValid();
        }
    }
    public function invalidateDependentOnProd_name():void
    {
        if (model_internal::_prod_nameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfProd_name = null;
            model_internal::calculateProd_nameIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get preld_qtyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get preld_qtyValidator() : StyleValidator
    {
        return model_internal::_preld_qtyValidator;
    }

    model_internal function set _preld_qtyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_preld_qtyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_preld_qtyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "preld_qtyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get preld_qtyIsValid():Boolean
    {
        if (!model_internal::_preld_qtyIsValidCacheInitialized)
        {
            model_internal::calculatePreld_qtyIsValid();
        }

        return model_internal::_preld_qtyIsValid;
    }

    model_internal function calculatePreld_qtyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_preld_qtyValidator.validate(model_internal::_instance.preld_qty)
        model_internal::_preld_qtyIsValid_der = (valRes.results == null);
        model_internal::_preld_qtyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::preld_qtyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::preld_qtyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get preld_qtyValidationFailureMessages():Array
    {
        if (model_internal::_preld_qtyValidationFailureMessages == null)
            model_internal::calculatePreld_qtyIsValid();

        return _preld_qtyValidationFailureMessages;
    }

    model_internal function set preld_qtyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_preld_qtyValidationFailureMessages;

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
            model_internal::_preld_qtyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "preld_qtyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prev_prodcodeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prev_prodcodeValidator() : StyleValidator
    {
        return model_internal::_prev_prodcodeValidator;
    }

    model_internal function set _prev_prodcodeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prev_prodcodeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prev_prodcodeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prev_prodcodeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prev_prodcodeIsValid():Boolean
    {
        if (!model_internal::_prev_prodcodeIsValidCacheInitialized)
        {
            model_internal::calculatePrev_prodcodeIsValid();
        }

        return model_internal::_prev_prodcodeIsValid;
    }

    model_internal function calculatePrev_prodcodeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prev_prodcodeValidator.validate(model_internal::_instance.prev_prodcode)
        model_internal::_prev_prodcodeIsValid_der = (valRes.results == null);
        model_internal::_prev_prodcodeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prev_prodcodeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prev_prodcodeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prev_prodcodeValidationFailureMessages():Array
    {
        if (model_internal::_prev_prodcodeValidationFailureMessages == null)
            model_internal::calculatePrev_prodcodeIsValid();

        return _prev_prodcodeValidationFailureMessages;
    }

    model_internal function set prev_prodcodeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prev_prodcodeValidationFailureMessages;

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
            model_internal::_prev_prodcodeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prev_prodcodeValidationFailureMessages", oldValue, value));
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
    public function get tnkr_cmpt_noStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tnkr_cmpt_noValidator() : StyleValidator
    {
        return model_internal::_tnkr_cmpt_noValidator;
    }

    model_internal function set _tnkr_cmpt_noIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tnkr_cmpt_noIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tnkr_cmpt_noIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_cmpt_noIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_cmpt_noIsValid():Boolean
    {
        if (!model_internal::_tnkr_cmpt_noIsValidCacheInitialized)
        {
            model_internal::calculateTnkr_cmpt_noIsValid();
        }

        return model_internal::_tnkr_cmpt_noIsValid;
    }

    model_internal function calculateTnkr_cmpt_noIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tnkr_cmpt_noValidator.validate(model_internal::_instance.tnkr_cmpt_no)
        model_internal::_tnkr_cmpt_noIsValid_der = (valRes.results == null);
        model_internal::_tnkr_cmpt_noIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tnkr_cmpt_noValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tnkr_cmpt_noValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tnkr_cmpt_noValidationFailureMessages():Array
    {
        if (model_internal::_tnkr_cmpt_noValidationFailureMessages == null)
            model_internal::calculateTnkr_cmpt_noIsValid();

        return _tnkr_cmpt_noValidationFailureMessages;
    }

    model_internal function set tnkr_cmpt_noValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tnkr_cmpt_noValidationFailureMessages;

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
            model_internal::_tnkr_cmpt_noValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tnkr_cmpt_noValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get load_qtyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get load_qtyValidator() : StyleValidator
    {
        return model_internal::_load_qtyValidator;
    }

    model_internal function set _load_qtyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_load_qtyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_load_qtyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_qtyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get load_qtyIsValid():Boolean
    {
        if (!model_internal::_load_qtyIsValidCacheInitialized)
        {
            model_internal::calculateLoad_qtyIsValid();
        }

        return model_internal::_load_qtyIsValid;
    }

    model_internal function calculateLoad_qtyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_load_qtyValidator.validate(model_internal::_instance.load_qty)
        model_internal::_load_qtyIsValid_der = (valRes.results == null);
        model_internal::_load_qtyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::load_qtyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::load_qtyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get load_qtyValidationFailureMessages():Array
    {
        if (model_internal::_load_qtyValidationFailureMessages == null)
            model_internal::calculateLoad_qtyIsValid();

        return _load_qtyValidationFailureMessages;
    }

    model_internal function set load_qtyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_load_qtyValidationFailureMessages;

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
            model_internal::_load_qtyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "load_qtyValidationFailureMessages", oldValue, value));
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
    public function get shlsload_load_idStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get shlsload_load_idValidator() : StyleValidator
    {
        return model_internal::_shlsload_load_idValidator;
    }

    model_internal function set _shlsload_load_idIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_shlsload_load_idIsValid;         
        if (oldValue !== value)
        {
            model_internal::_shlsload_load_idIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shlsload_load_idIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get shlsload_load_idIsValid():Boolean
    {
        if (!model_internal::_shlsload_load_idIsValidCacheInitialized)
        {
            model_internal::calculateShlsload_load_idIsValid();
        }

        return model_internal::_shlsload_load_idIsValid;
    }

    model_internal function calculateShlsload_load_idIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_shlsload_load_idValidator.validate(model_internal::_instance.shlsload_load_id)
        model_internal::_shlsload_load_idIsValid_der = (valRes.results == null);
        model_internal::_shlsload_load_idIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::shlsload_load_idValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::shlsload_load_idValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get shlsload_load_idValidationFailureMessages():Array
    {
        if (model_internal::_shlsload_load_idValidationFailureMessages == null)
            model_internal::calculateShlsload_load_idIsValid();

        return _shlsload_load_idValidationFailureMessages;
    }

    model_internal function set shlsload_load_idValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_shlsload_load_idValidationFailureMessages;

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
            model_internal::_shlsload_load_idValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "shlsload_load_idValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prev_prodStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prev_prodValidator() : StyleValidator
    {
        return model_internal::_prev_prodValidator;
    }

    model_internal function set _prev_prodIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prev_prodIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prev_prodIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prev_prodIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prev_prodIsValid():Boolean
    {
        if (!model_internal::_prev_prodIsValidCacheInitialized)
        {
            model_internal::calculatePrev_prodIsValid();
        }

        return model_internal::_prev_prodIsValid;
    }

    model_internal function calculatePrev_prodIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prev_prodValidator.validate(model_internal::_instance.prev_prod)
        model_internal::_prev_prodIsValid_der = (valRes.results == null);
        model_internal::_prev_prodIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prev_prodValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prev_prodValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prev_prodValidationFailureMessages():Array
    {
        if (model_internal::_prev_prodValidationFailureMessages == null)
            model_internal::calculatePrev_prodIsValid();

        return _prev_prodValidationFailureMessages;
    }

    model_internal function set prev_prodValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prev_prodValidationFailureMessages;

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
            model_internal::_prev_prodValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prev_prodValidationFailureMessages", oldValue, value));
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
    public function get prod_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prod_codeValidator() : StyleValidator
    {
        return model_internal::_prod_codeValidator;
    }

    model_internal function set _prod_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prod_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prod_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prod_codeIsValid():Boolean
    {
        if (!model_internal::_prod_codeIsValidCacheInitialized)
        {
            model_internal::calculateProd_codeIsValid();
        }

        return model_internal::_prod_codeIsValid;
    }

    model_internal function calculateProd_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prod_codeValidator.validate(model_internal::_instance.prod_code)
        model_internal::_prod_codeIsValid_der = (valRes.results == null);
        model_internal::_prod_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prod_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prod_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prod_codeValidationFailureMessages():Array
    {
        if (model_internal::_prod_codeValidationFailureMessages == null)
            model_internal::calculateProd_codeIsValid();

        return _prod_codeValidationFailureMessages;
    }

    model_internal function set prod_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prod_codeValidationFailureMessages;

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
            model_internal::_prod_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_codeValidationFailureMessages", oldValue, value));
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
    public function get tc_eqptStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tc_eqptValidator() : StyleValidator
    {
        return model_internal::_tc_eqptValidator;
    }

    model_internal function set _tc_eqptIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tc_eqptIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tc_eqptIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tc_eqptIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tc_eqptIsValid():Boolean
    {
        if (!model_internal::_tc_eqptIsValidCacheInitialized)
        {
            model_internal::calculateTc_eqptIsValid();
        }

        return model_internal::_tc_eqptIsValid;
    }

    model_internal function calculateTc_eqptIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tc_eqptValidator.validate(model_internal::_instance.tc_eqpt)
        model_internal::_tc_eqptIsValid_der = (valRes.results == null);
        model_internal::_tc_eqptIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tc_eqptValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tc_eqptValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tc_eqptValidationFailureMessages():Array
    {
        if (model_internal::_tc_eqptValidationFailureMessages == null)
            model_internal::calculateTc_eqptIsValid();

        return _tc_eqptValidationFailureMessages;
    }

    model_internal function set tc_eqptValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tc_eqptValidationFailureMessages;

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
            model_internal::_tc_eqptValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tc_eqptValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get allowed_qtyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get allowed_qtyValidator() : StyleValidator
    {
        return model_internal::_allowed_qtyValidator;
    }

    model_internal function set _allowed_qtyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_allowed_qtyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_allowed_qtyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "allowed_qtyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get allowed_qtyIsValid():Boolean
    {
        if (!model_internal::_allowed_qtyIsValidCacheInitialized)
        {
            model_internal::calculateAllowed_qtyIsValid();
        }

        return model_internal::_allowed_qtyIsValid;
    }

    model_internal function calculateAllowed_qtyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_allowed_qtyValidator.validate(model_internal::_instance.allowed_qty)
        model_internal::_allowed_qtyIsValid_der = (valRes.results == null);
        model_internal::_allowed_qtyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::allowed_qtyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::allowed_qtyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get allowed_qtyValidationFailureMessages():Array
    {
        if (model_internal::_allowed_qtyValidationFailureMessages == null)
            model_internal::calculateAllowed_qtyIsValid();

        return _allowed_qtyValidationFailureMessages;
    }

    model_internal function set allowed_qtyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_allowed_qtyValidationFailureMessages;

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
            model_internal::_allowed_qtyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "allowed_qtyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_cust_ordnoStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_cust_ordnoValidator() : StyleValidator
    {
        return model_internal::_order_cust_ordnoValidator;
    }

    model_internal function set _order_cust_ordnoIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_cust_ordnoIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_cust_ordnoIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_ordnoIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_ordnoIsValid():Boolean
    {
        if (!model_internal::_order_cust_ordnoIsValidCacheInitialized)
        {
            model_internal::calculateOrder_cust_ordnoIsValid();
        }

        return model_internal::_order_cust_ordnoIsValid;
    }

    model_internal function calculateOrder_cust_ordnoIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_cust_ordnoValidator.validate(model_internal::_instance.order_cust_ordno)
        model_internal::_order_cust_ordnoIsValid_der = (valRes.results == null);
        model_internal::_order_cust_ordnoIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_cust_ordnoValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_cust_ordnoValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_cust_ordnoValidationFailureMessages():Array
    {
        if (model_internal::_order_cust_ordnoValidationFailureMessages == null)
            model_internal::calculateOrder_cust_ordnoIsValid();

        return _order_cust_ordnoValidationFailureMessages;
    }

    model_internal function set order_cust_ordnoValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_cust_ordnoValidationFailureMessages;

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
            model_internal::_order_cust_ordnoValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_cust_ordnoValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get armcodeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get armcodeValidator() : StyleValidator
    {
        return model_internal::_armcodeValidator;
    }

    model_internal function set _armcodeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_armcodeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_armcodeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "armcodeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get armcodeIsValid():Boolean
    {
        if (!model_internal::_armcodeIsValidCacheInitialized)
        {
            model_internal::calculateArmcodeIsValid();
        }

        return model_internal::_armcodeIsValid;
    }

    model_internal function calculateArmcodeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_armcodeValidator.validate(model_internal::_instance.armcode)
        model_internal::_armcodeIsValid_der = (valRes.results == null);
        model_internal::_armcodeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::armcodeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::armcodeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get armcodeValidationFailureMessages():Array
    {
        if (model_internal::_armcodeValidationFailureMessages == null)
            model_internal::calculateArmcodeIsValid();

        return _armcodeValidationFailureMessages;
    }

    model_internal function set armcodeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_armcodeValidationFailureMessages;

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
            model_internal::_armcodeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "armcodeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get arm_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get arm_nameValidator() : StyleValidator
    {
        return model_internal::_arm_nameValidator;
    }

    model_internal function set _arm_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_arm_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_arm_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "arm_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get arm_nameIsValid():Boolean
    {
        if (!model_internal::_arm_nameIsValidCacheInitialized)
        {
            model_internal::calculateArm_nameIsValid();
        }

        return model_internal::_arm_nameIsValid;
    }

    model_internal function calculateArm_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_arm_nameValidator.validate(model_internal::_instance.arm_name)
        model_internal::_arm_nameIsValid_der = (valRes.results == null);
        model_internal::_arm_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::arm_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::arm_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get arm_nameValidationFailureMessages():Array
    {
        if (model_internal::_arm_nameValidationFailureMessages == null)
            model_internal::calculateArm_nameIsValid();

        return _arm_nameValidationFailureMessages;
    }

    model_internal function set arm_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_arm_nameValidationFailureMessages;

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
            model_internal::_arm_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "arm_nameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get schorder_qtyStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get schorder_qtyValidator() : StyleValidator
    {
        return model_internal::_schorder_qtyValidator;
    }

    model_internal function set _schorder_qtyIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_schorder_qtyIsValid;         
        if (oldValue !== value)
        {
            model_internal::_schorder_qtyIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schorder_qtyIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get schorder_qtyIsValid():Boolean
    {
        if (!model_internal::_schorder_qtyIsValidCacheInitialized)
        {
            model_internal::calculateSchorder_qtyIsValid();
        }

        return model_internal::_schorder_qtyIsValid;
    }

    model_internal function calculateSchorder_qtyIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_schorder_qtyValidator.validate(model_internal::_instance.schorder_qty)
        model_internal::_schorder_qtyIsValid_der = (valRes.results == null);
        model_internal::_schorder_qtyIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::schorder_qtyValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::schorder_qtyValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get schorder_qtyValidationFailureMessages():Array
    {
        if (model_internal::_schorder_qtyValidationFailureMessages == null)
            model_internal::calculateSchorder_qtyIsValid();

        return _schorder_qtyValidationFailureMessages;
    }

    model_internal function set schorder_qtyValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_schorder_qtyValidationFailureMessages;

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
            model_internal::_schorder_qtyValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "schorder_qtyValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get order_ref_codeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get order_ref_codeValidator() : StyleValidator
    {
        return model_internal::_order_ref_codeValidator;
    }

    model_internal function set _order_ref_codeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_order_ref_codeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_order_ref_codeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_ref_codeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get order_ref_codeIsValid():Boolean
    {
        if (!model_internal::_order_ref_codeIsValidCacheInitialized)
        {
            model_internal::calculateOrder_ref_codeIsValid();
        }

        return model_internal::_order_ref_codeIsValid;
    }

    model_internal function calculateOrder_ref_codeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_order_ref_codeValidator.validate(model_internal::_instance.order_ref_code)
        model_internal::_order_ref_codeIsValid_der = (valRes.results == null);
        model_internal::_order_ref_codeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::order_ref_codeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::order_ref_codeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get order_ref_codeValidationFailureMessages():Array
    {
        if (model_internal::_order_ref_codeValidationFailureMessages == null)
            model_internal::calculateOrder_ref_codeIsValid();

        return _order_ref_codeValidationFailureMessages;
    }

    model_internal function set order_ref_codeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_order_ref_codeValidationFailureMessages;

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
            model_internal::_order_ref_codeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "order_ref_codeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get tlr_cmptStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get tlr_cmptValidator() : StyleValidator
    {
        return model_internal::_tlr_cmptValidator;
    }

    model_internal function set _tlr_cmptIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_tlr_cmptIsValid;         
        if (oldValue !== value)
        {
            model_internal::_tlr_cmptIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tlr_cmptIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get tlr_cmptIsValid():Boolean
    {
        if (!model_internal::_tlr_cmptIsValidCacheInitialized)
        {
            model_internal::calculateTlr_cmptIsValid();
        }

        return model_internal::_tlr_cmptIsValid;
    }

    model_internal function calculateTlr_cmptIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_tlr_cmptValidator.validate(model_internal::_instance.tlr_cmpt)
        model_internal::_tlr_cmptIsValid_der = (valRes.results == null);
        model_internal::_tlr_cmptIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::tlr_cmptValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::tlr_cmptValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get tlr_cmptValidationFailureMessages():Array
    {
        if (model_internal::_tlr_cmptValidationFailureMessages == null)
            model_internal::calculateTlr_cmptIsValid();

        return _tlr_cmptValidationFailureMessages;
    }

    model_internal function set tlr_cmptValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_tlr_cmptValidationFailureMessages;

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
            model_internal::_tlr_cmptValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "tlr_cmptValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get prod_nameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get prod_nameValidator() : StyleValidator
    {
        return model_internal::_prod_nameValidator;
    }

    model_internal function set _prod_nameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_prod_nameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_prod_nameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_nameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get prod_nameIsValid():Boolean
    {
        if (!model_internal::_prod_nameIsValidCacheInitialized)
        {
            model_internal::calculateProd_nameIsValid();
        }

        return model_internal::_prod_nameIsValid;
    }

    model_internal function calculateProd_nameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_prod_nameValidator.validate(model_internal::_instance.prod_name)
        model_internal::_prod_nameIsValid_der = (valRes.results == null);
        model_internal::_prod_nameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::prod_nameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::prod_nameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get prod_nameValidationFailureMessages():Array
    {
        if (model_internal::_prod_nameValidationFailureMessages == null)
            model_internal::calculateProd_nameIsValid();

        return _prod_nameValidationFailureMessages;
    }

    model_internal function set prod_nameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_prod_nameValidationFailureMessages;

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
            model_internal::_prod_nameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "prod_nameValidationFailureMessages", oldValue, value));
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
            case("preld_qty"):
            {
                return preld_qtyValidationFailureMessages;
            }
            case("prev_prodcode"):
            {
                return prev_prodcodeValidationFailureMessages;
            }
            case("eqpt_code"):
            {
                return eqpt_codeValidationFailureMessages;
            }
            case("tnkr_cmpt_no"):
            {
                return tnkr_cmpt_noValidationFailureMessages;
            }
            case("load_qty"):
            {
                return load_qtyValidationFailureMessages;
            }
            case("cmpt_capacit"):
            {
                return cmpt_capacitValidationFailureMessages;
            }
            case("shlsload_load_id"):
            {
                return shlsload_load_idValidationFailureMessages;
            }
            case("prev_prod"):
            {
                return prev_prodValidationFailureMessages;
            }
            case("schd_deliv_num"):
            {
                return schd_deliv_numValidationFailureMessages;
            }
            case("schd_ship_to_num"):
            {
                return schd_ship_to_numValidationFailureMessages;
            }
            case("prod_code"):
            {
                return prod_codeValidationFailureMessages;
            }
            case("cmpt_units"):
            {
                return cmpt_unitsValidationFailureMessages;
            }
            case("unit"):
            {
                return unitValidationFailureMessages;
            }
            case("schd_sold_to_num"):
            {
                return schd_sold_to_numValidationFailureMessages;
            }
            case("tc_eqpt"):
            {
                return tc_eqptValidationFailureMessages;
            }
            case("allowed_qty"):
            {
                return allowed_qtyValidationFailureMessages;
            }
            case("order_cust_ordno"):
            {
                return order_cust_ordnoValidationFailureMessages;
            }
            case("armcode"):
            {
                return armcodeValidationFailureMessages;
            }
            case("arm_name"):
            {
                return arm_nameValidationFailureMessages;
            }
            case("schorder_qty"):
            {
                return schorder_qtyValidationFailureMessages;
            }
            case("order_ref_code"):
            {
                return order_ref_codeValidationFailureMessages;
            }
            case("tlr_cmpt"):
            {
                return tlr_cmptValidationFailureMessages;
            }
            case("prod_name"):
            {
                return prod_nameValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
